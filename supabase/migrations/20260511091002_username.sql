-- AviatorYapp — username support
-- Adds unique username column to profiles + availability RPC + trigger update

-- =============================================================================
-- ALTER: profiles
-- =============================================================================

alter table public.profiles
  add column username text;

-- Citext-style uniqueness: enforce on lowercased value via expression index
create unique index profiles_username_unique on public.profiles (lower(username))
  where username is not null;

-- Format constraint: 3–30 chars, lowercase letters/digits/underscore
alter table public.profiles
  add constraint username_format
  check (
    username is null
    or username ~ '^[a-z0-9_]{3,30}$'
  );

-- Allow public read of username (so the community can see usernames)
-- but only the username column, no other PII
create policy "profiles_username_public_read"
  on public.profiles for select
  using (true);

-- Hmm: the above gives full row read. We want to keep other fields private.
-- Postgres RLS is row-level, not column-level. So either:
--   - Use a view with only (id, username) public
--   - Use an RPC for username lookups
-- We'll go the RPC route below and drop the public read policy.
drop policy "profiles_username_public_read" on public.profiles;

-- =============================================================================
-- RPC: check_username_available
-- Used pre-signup to validate uniqueness without exposing the profiles table.
-- =============================================================================

create or replace function public.check_username_available(p_username text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count int;
begin
  -- Validate format first (cheap)
  if p_username is null or p_username !~ '^[a-z0-9_]{3,30}$' then
    return false;
  end if;

  -- Reserved usernames we never want anyone to take
  if lower(p_username) in (
    'admin', 'administrator', 'root', 'support', 'help', 'team', 'aviatory',
    'staff', 'official', 'security', 'moderator', 'mod', 'system', 'api',
    'null', 'undefined', 'user', 'me', 'you'
  ) then
    return false;
  end if;

  select count(*) into v_count
    from public.profiles
    where lower(username) = lower(p_username);

  return v_count = 0;
end;
$$;

grant execute on function public.check_username_available(text) to anon, authenticated;

-- =============================================================================
-- TRIGGER UPDATE: handle_new_user (now reads username from user_metadata)
-- =============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_username text;
begin
  -- Pull username from user_metadata if provided at signup
  v_username := lower(nullif(trim(new.raw_user_meta_data->>'username'), ''));

  -- Defensive: if username invalid or already taken, save null (user can pick later)
  if v_username is not null then
    if v_username !~ '^[a-z0-9_]{3,30}$'
       or exists (select 1 from public.profiles where lower(username) = v_username) then
      v_username := null;
    end if;
  end if;

  insert into public.profiles (id, username, full_name)
    values (
      new.id,
      v_username,
      nullif(trim(new.raw_user_meta_data->>'full_name'), '')
    );

  insert into public.pilot_state (user_id)
    values (new.id);

  insert into public.subscriptions (user_id, status, plan, current_period_end)
    values (new.id, 'trialing', 'free', now() + interval '7 days');

  insert into public.streaks (user_id)
    values (new.id);

  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;
