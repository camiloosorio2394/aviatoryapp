-- AviatorYapp — Achievements auto-unlock + Avatars storage bucket
--
-- 1) Function check_and_unlock_achievements(uuid) que evalúa cada criterio y
--    inserta en user_achievements si corresponde (idempotente: on conflict do nothing).
-- 2) Triggers en quiz_attempts, streaks, community_messages, pilot_state,
--    subscriptions para llamar check_and_unlock después de cambios relevantes.
-- 3) Storage bucket "avatars" público + policies para que cada user pueda
--    subir/actualizar su propio avatar.

-- =============================================================================
-- HELPER: _try_unlock — atomic unlock (returns 1 if newly unlocked, 0 otherwise)
-- =============================================================================

create or replace function public._try_unlock(p_user_id uuid, p_code text)
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_ach_id bigint;
  v_count int;
begin
  select id into v_ach_id from public.achievements where code = p_code;
  if v_ach_id is null then return 0; end if;

  insert into public.user_achievements (user_id, achievement_id)
    values (p_user_id, v_ach_id)
    on conflict (user_id, achievement_id) do nothing;

  get diagnostics v_count = ROW_COUNT;
  return v_count;
end;
$$;

revoke execute on function public._try_unlock(uuid, text) from public, anon, authenticated;

-- =============================================================================
-- FUNCTION: check_and_unlock_achievements
-- =============================================================================

create or replace function public.check_and_unlock_achievements(p_user_id uuid)
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_new int := 0;
  v_total_questions int;
  v_streak int;
  v_message_count int;
  v_has_stage bool;
  v_icao int;
  v_plan text;
  v_quiz_done bool;
  v_subject_master_count int;
begin
  if p_user_id is null then return 0; end if;

  -- Aggregate stats
  select coalesce(sum(total_questions), 0)::int,
         exists(select 1 from public.quiz_attempts
                where user_id = p_user_id and finished_at is not null)
    into v_total_questions, v_quiz_done
    from public.quiz_attempts
    where user_id = p_user_id and finished_at is not null;

  select coalesce(current_streak, 0)
    into v_streak
    from public.streaks where user_id = p_user_id;

  select count(*)::int into v_message_count
    from public.community_messages where user_id = p_user_id;

  select (stage is not null), coalesce(icao_english_level, 0)
    into v_has_stage, v_icao
    from public.pilot_state where user_id = p_user_id;

  select plan::text into v_plan
    from public.subscriptions
    where user_id = p_user_id
    order by created_at desc
    limit 1;

  -- subject_master: 5 quiz attempts seguidos del mismo subject_id con score >= 80
  -- Lookup: last 5 attempts del user, if all same subject and score >= 80
  with last5 as (
    select subject_id, score
    from public.quiz_attempts
    where user_id = p_user_id and finished_at is not null and subject_id is not null
    order by finished_at desc
    limit 5
  )
  select count(*) into v_subject_master_count
  from last5
  where score >= 80
    and subject_id = (select subject_id from last5 limit 1);

  -- Try each achievement (idempotent)
  if v_has_stage then
    v_new := v_new + public._try_unlock(p_user_id, 'first_step');
  end if;
  if v_quiz_done then
    v_new := v_new + public._try_unlock(p_user_id, 'first_quiz');
  end if;
  if v_streak >= 3  then v_new := v_new + public._try_unlock(p_user_id, 'streak_3');  end if;
  if v_streak >= 7  then v_new := v_new + public._try_unlock(p_user_id, 'streak_7');  end if;
  if v_streak >= 30 then v_new := v_new + public._try_unlock(p_user_id, 'streak_30'); end if;
  if v_total_questions >= 100 then v_new := v_new + public._try_unlock(p_user_id, 'first_100'); end if;
  if v_message_count >= 1 then v_new := v_new + public._try_unlock(p_user_id, 'community_hello'); end if;
  if v_icao >= 4 then v_new := v_new + public._try_unlock(p_user_id, 'icao_climb'); end if;
  if v_plan = 'founder_lifetime' then v_new := v_new + public._try_unlock(p_user_id, 'founder_badge'); end if;
  if v_subject_master_count = 5 then v_new := v_new + public._try_unlock(p_user_id, 'subject_master'); end if;

  return v_new;
end;
$$;

grant execute on function public.check_and_unlock_achievements(uuid) to authenticated;

-- =============================================================================
-- TRIGGER FUNCTION: invoke check after relevant table changes
-- =============================================================================

create or replace function public.trigger_check_achievements()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.check_and_unlock_achievements(NEW.user_id);
  return NEW;
end;
$$;

-- pilot_state uses user_id as primary key (no INSERT trigger needed because
-- a profile row is created when handle_new_user runs; we trigger on UPDATE
-- because the stage changes from null to something at onboarding completion)

create or replace function public.trigger_check_achievements_pilot()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.check_and_unlock_achievements(NEW.user_id);
  return NEW;
end;
$$;

-- =============================================================================
-- TRIGGERS
-- =============================================================================

drop trigger if exists trg_check_achievements_quiz on public.quiz_attempts;
create trigger trg_check_achievements_quiz
  after insert or update of finished_at, score on public.quiz_attempts
  for each row
  when (NEW.finished_at is not null)
  execute function public.trigger_check_achievements();

drop trigger if exists trg_check_achievements_streak on public.streaks;
create trigger trg_check_achievements_streak
  after update of current_streak on public.streaks
  for each row
  execute function public.trigger_check_achievements();

drop trigger if exists trg_check_achievements_message on public.community_messages;
create trigger trg_check_achievements_message
  after insert on public.community_messages
  for each row
  execute function public.trigger_check_achievements();

drop trigger if exists trg_check_achievements_pilot on public.pilot_state;
create trigger trg_check_achievements_pilot
  after insert or update of stage, icao_english_level on public.pilot_state
  for each row
  execute function public.trigger_check_achievements_pilot();

drop trigger if exists trg_check_achievements_sub on public.subscriptions;
create trigger trg_check_achievements_sub
  after insert or update of plan on public.subscriptions
  for each row
  execute function public.trigger_check_achievements();

-- =============================================================================
-- BACKFILL: check achievements for existing users
-- =============================================================================

do $$
declare
  v_user_id uuid;
begin
  for v_user_id in (select id from auth.users) loop
    perform public.check_and_unlock_achievements(v_user_id);
  end loop;
end;
$$;

-- =============================================================================
-- STORAGE BUCKET: avatars (public read, owner write)
-- =============================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  values ('avatars', 'avatars', true, 5242880, array['image/png','image/jpeg','image/jpg','image/webp'])
  on conflict (id) do update
    set public = excluded.public,
        file_size_limit = excluded.file_size_limit,
        allowed_mime_types = excluded.allowed_mime_types;

-- Storage policies: file path convention {user_id}/avatar.{ext}
-- so storage.foldername(name)[1] = user_id

drop policy if exists "avatars_public_read" on storage.objects;
create policy "avatars_public_read"
  on storage.objects for select
  using (bucket_id = 'avatars');

drop policy if exists "avatars_authenticated_upload" on storage.objects;
create policy "avatars_authenticated_upload"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "avatars_owner_update" on storage.objects;
create policy "avatars_owner_update"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "avatars_owner_delete" on storage.objects;
create policy "avatars_owner_delete"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Profiles already has photo_url column from initial migration. Make sure
-- everyone can READ photo_url of any user (so we can show avatars in
-- community messages). We use a dedicated read policy that exposes only
-- the columns we want as a separate view.

-- For simplicity right now we'll allow public read of (id, username, photo_url)
-- via an RPC instead of opening profiles RLS.

create or replace function public.get_profile_avatars(p_user_ids uuid[])
returns table (id uuid, username text, photo_url text)
language sql
security definer
set search_path = ''
as $$
  select id, username, photo_url
  from public.profiles
  where id = any(p_user_ids);
$$;

grant execute on function public.get_profile_avatars(uuid[]) to authenticated;
