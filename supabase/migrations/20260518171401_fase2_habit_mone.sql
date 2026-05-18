-- AviatorYapp Fase 2 — habit + monetización
--
-- 1) Subject mastery — RPC que devuelve score y nivel por materia
-- 2) Quiz of the Day — RPC que devuelve 5 preguntas consistentes por día/user
-- 3) Refer-a-friend — referral_code + referred_by en profiles, RPC apply_referral_code
-- 4) Plan Pro+ — agregar valores al enum subscription_plan

-- =============================================================================
-- 1) SUBJECT MASTERY
-- =============================================================================

create or replace function public.get_subject_mastery()
returns table (
  subject_id bigint,
  subject_name text,
  subject_slug text,
  total_questions int,
  total_attempted int,
  avg_score numeric,
  mastery_level text,
  attempts_count int
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
begin
  v_user_id := auth.uid();
  if v_user_id is null then return; end if;

  return query
  with subj_questions as (
    select s.id, s.name, s.slug, count(q.id) as total_q
    from public.subjects s
    left join public.questions q on q.subject_id = s.id
    group by s.id, s.name, s.slug
  ),
  user_attempts as (
    select qa.subject_id,
           count(qa.id) as attempts,
           avg(qa.score) as avg_s,
           sum(qa.correct_answers) as correct_total,
           sum(qa.total_questions) as questions_total
    from public.quiz_attempts qa
    where qa.user_id = v_user_id
      and qa.finished_at is not null
      and qa.subject_id is not null
    group by qa.subject_id
  )
  select
    sq.id,
    sq.name,
    sq.slug,
    sq.total_q::int,
    coalesce(ua.questions_total, 0)::int,
    coalesce(round(ua.avg_s, 0), 0),
    case
      when ua.attempts is null or ua.avg_s is null then 'novice'
      when ua.avg_s < 30 then 'novice'
      when ua.avg_s < 50 then 'learning'
      when ua.avg_s < 70 then 'proficient'
      when ua.avg_s < 85 then 'advanced'
      else 'expert'
    end,
    coalesce(ua.attempts, 0)::int
  from subj_questions sq
  left join user_attempts ua on ua.subject_id = sq.id
  order by sq.id;
end;
$$;

grant execute on function public.get_subject_mastery() to authenticated;

-- =============================================================================
-- 2) QUIZ OF THE DAY — 5 preguntas consistentes por día y user
-- =============================================================================

create or replace function public.get_daily_quiz()
returns table (
  question_id bigint,
  statement text,
  explanation text,
  subject_id bigint,
  subject_name text,
  options jsonb
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
  v_seed bigint;
  v_today date;
begin
  v_user_id := auth.uid();
  if v_user_id is null then return; end if;

  v_today := (now() at time zone 'America/Bogota')::date;

  -- Deterministic seed: hash(user_id || date) reduced to bigint
  v_seed := ('x' || substr(md5(v_user_id::text || v_today::text), 1, 15))::bit(60)::bigint;

  return query
  with picked as (
    select q.id
    from public.questions q
    order by hashtextextended(q.id::text, v_seed)
    limit 5
  )
  select
    q.id,
    q.statement,
    q.explanation,
    q.subject_id,
    s.name,
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'id', ao.id,
            'text', ao.text,
            'order_index', ao.order_index
          ) order by ao.order_index
        )
        from public.answer_options ao
        where ao.question_id = q.id
      ),
      '[]'::jsonb
    )
  from public.questions q
  join picked p on p.id = q.id
  left join public.subjects s on s.id = q.subject_id;
end;
$$;

grant execute on function public.get_daily_quiz() to authenticated;

-- Check si el user completó el quiz del día (3 attempts hoy del subject 'daily' o
-- attempt con question_ids matching el daily). Simplificación: lo trackeamos
-- al cliente mediante events. Para una primera versión basta con marcar manual.

-- =============================================================================
-- 3) REFER-A-FRIEND
-- =============================================================================

alter table public.profiles
  add column if not exists referral_code text,
  add column if not exists referred_by uuid references auth.users(id) on delete set null;

create unique index if not exists profiles_referral_code_idx on public.profiles(referral_code) where referral_code is not null;

-- Generate random 8-char code
create or replace function public._gen_referral_code()
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_code text;
  v_chars text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';   -- sin 0/O/1/I/L
  v_exists bool;
begin
  loop
    v_code := '';
    for i in 1..8 loop
      v_code := v_code || substr(v_chars, 1 + (floor(random() * length(v_chars)))::int, 1);
    end loop;
    select exists(select 1 from public.profiles where referral_code = v_code) into v_exists;
    exit when not v_exists;
  end loop;
  return v_code;
end;
$$;

-- Backfill referral codes for existing users
update public.profiles
set referral_code = public._gen_referral_code()
where referral_code is null;

-- Update handle_new_user trigger para generar referral_code + capturar referred_by
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_username text;
  v_referred_by uuid;
  v_ref_code text;
begin
  v_username := lower(nullif(trim(new.raw_user_meta_data->>'username'), ''));
  if v_username is not null then
    if v_username !~ '^[a-z0-9_]{3,30}$'
       or exists (select 1 from public.profiles where lower(username) = v_username) then
      v_username := null;
    end if;
  end if;

  -- Look up referred_by from raw_user_meta_data->>'referral_code' if provided
  declare
    v_input_code text;
  begin
    v_input_code := upper(nullif(trim(new.raw_user_meta_data->>'referral_code'), ''));
    if v_input_code is not null then
      select id into v_referred_by
      from public.profiles
      where referral_code = v_input_code
      limit 1;
    end if;
  end;

  insert into public.profiles (id, username, full_name, referral_code, referred_by)
    values (
      new.id,
      v_username,
      nullif(trim(new.raw_user_meta_data->>'full_name'), ''),
      public._gen_referral_code(),
      v_referred_by
    );

  insert into public.pilot_state (user_id) values (new.id);

  insert into public.subscriptions (user_id, status, plan, current_period_end)
    values (new.id, 'trialing', 'free', now() + interval '7 days');

  insert into public.streaks (user_id) values (new.id);

  -- Bonus: referred user gets +7 días de trial (total 14)
  if v_referred_by is not null then
    update public.subscriptions
    set current_period_end = current_period_end + interval '7 days'
    where user_id = new.id;
  end if;

  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- RPC: get referral stats (my code + count of referrals + their status)
create or replace function public.get_referral_stats()
returns table (
  my_code text,
  total_referred int,
  active_referred int
)
language sql
security definer
set search_path = ''
as $$
  select
    (select referral_code from public.profiles where id = auth.uid()),
    coalesce((select count(*) from public.profiles where referred_by = auth.uid()), 0)::int,
    coalesce((
      select count(*)
      from public.profiles p
      join public.subscriptions s on s.user_id = p.id
      where p.referred_by = auth.uid()
        and s.plan in ('pro_monthly', 'pro_annual', 'founder_lifetime', 'pro_plus_monthly', 'pro_plus_annual')
    ), 0)::int;
$$;

-- (Plan Pro+ values added in previous migration 20260518171400_add_plan_proplus.sql)
