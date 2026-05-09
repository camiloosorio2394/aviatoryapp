-- AviatorYapp — MVP foundation schema
-- 5 tablas + RLS + trigger on_auth_user_created + seed de 6 subjects

-- =============================================================================
-- ENUMS
-- =============================================================================

create type public.pilot_stage as enum (
  'student_ppl',
  'ppl',
  'cpl_in_progress',
  'cpl_ready',
  'hour_building',
  'airline_candidate'
);

create type public.subscription_status as enum (
  'trialing',
  'active',
  'past_due',
  'canceled'
);

create type public.subscription_plan as enum (
  'free',
  'pro_monthly',
  'pro_annual',
  'founder_lifetime'
);

-- =============================================================================
-- TABLE: profiles
-- =============================================================================

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  photo_url text,
  country text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- =============================================================================
-- TABLE: pilot_state
-- =============================================================================

create table public.pilot_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  stage public.pilot_stage,
  total_hours numeric,
  hours_pic numeric,
  licenses jsonb,
  icao_english_level smallint,
  target_airline text,
  target_date date,
  updated_at timestamptz not null default now()
);

alter table public.pilot_state enable row level security;

create policy "pilot_state_select_own"
  on public.pilot_state for select
  using (auth.uid() = user_id);

create policy "pilot_state_insert_own"
  on public.pilot_state for insert
  with check (auth.uid() = user_id);

create policy "pilot_state_update_own"
  on public.pilot_state for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =============================================================================
-- TABLE: subjects
-- =============================================================================

create table public.subjects (
  id bigserial primary key,
  name text not null,
  slug text not null unique,
  order_index int not null
);

alter table public.subjects enable row level security;

create policy "subjects_public_read"
  on public.subjects for select
  using (true);

-- =============================================================================
-- TABLE: subscriptions
-- =============================================================================

create table public.subscriptions (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  status public.subscription_status not null default 'trialing',
  plan public.subscription_plan not null default 'free',
  current_period_end timestamptz,
  payment_provider_id text,
  created_at timestamptz not null default now()
);

create index subscriptions_user_id_idx on public.subscriptions(user_id);

alter table public.subscriptions enable row level security;

create policy "subscriptions_select_own"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- =============================================================================
-- TABLE: questions
-- (creada después de subscriptions porque la policy referencia subscriptions)
-- =============================================================================

create table public.questions (
  id bigserial primary key,
  subject_id bigint not null references public.subjects(id) on delete cascade,
  statement text not null,
  explanation text,
  difficulty smallint,
  source text
);

create index questions_subject_id_idx on public.questions(subject_id);

alter table public.questions enable row level security;

create policy "questions_paid_read"
  on public.questions for select
  using (
    exists (
      select 1
      from public.subscriptions s
      where s.user_id = auth.uid()
        and (
          s.status in ('trialing', 'active')
          or s.plan = 'founder_lifetime'
        )
    )
  );

-- =============================================================================
-- TRIGGER: on_auth_user_created
-- Crea filas iniciales en profiles, pilot_state y subscriptions cuando se
-- registra un nuevo usuario en auth.users.
-- =============================================================================

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id)
    values (new.id);

  insert into public.pilot_state (user_id)
    values (new.id);

  insert into public.subscriptions (user_id, status, plan, current_period_end)
    values (new.id, 'trialing', 'free', now() + interval '7 days');

  return new;
end;
$$;

-- Solo el trigger debe invocar esta función; nadie via API.
revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- =============================================================================
-- SEED: subjects (PPL/CPL Colombia — materias core)
-- =============================================================================

insert into public.subjects (name, slug, order_index) values
  ('Meteorología',     'meteorologia',     1),
  ('Navegación',       'navegacion',       2),
  ('Reglamento',       'reglamento',       3),
  ('Motores',          'motores',          4),
  ('Aerodinámica',     'aerodinamica',     5),
  ('Weight & Balance', 'weight-balance',   6);
