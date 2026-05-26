-- ============================================================================
-- Módulo: PSICOTÉCNICOS Y ASSESSMENT (separado de entrevistas)
-- ============================================================================
-- 9 categorías: atención dividida, memoria operacional, multitasking,
-- razonamiento lógico, spatial awareness, coordinación, tests cognitivos,
-- dinámicas grupales, personality tests. Plus simulaciones COMPASS/CUT-E/PILAPT.
-- ============================================================================

create table if not exists public.psych_categories (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  description text,
  family text not null check (family in ('attention','memory','reasoning','spatial','coordination','cognitive','dynamics','personality')),
  test_engine text check (test_engine in ('compass','cute','pilapt','custom','external')),
  icon_name text,
  color text default 'cyan',
  order_index int default 0
);

create table if not exists public.psych_tests (
  id bigint generated always as identity primary key,
  category_id bigint not null references public.psych_categories(id) on delete cascade,
  slug text unique not null,
  title text not null,
  description text,
  type text not null check (type in ('timed_response','multi_task','spatial_rotation','sequence_recall','memory_span','reasoning_mc','personality_q','group_scenario','reaction_time')),
  config jsonb not null default '{}'::jsonb,    -- {item_count, time_limit_sec, stimulus_type, etc.}
  duration_seconds int default 300,
  difficulty smallint default 3,
  instructions text,
  is_active boolean default true,
  created_at timestamptz default now()
);

create index if not exists idx_psych_tests_category on public.psych_tests(category_id) where is_active;

-- USER ATTEMPTS --------------------------------------------------------------
create table if not exists public.user_psych_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  test_id bigint not null references public.psych_tests(id) on delete cascade,
  score numeric(5,2),                          -- score normalizado 0-100
  raw_results jsonb,                           -- detalle por ítem
  percentile smallint,                         -- vs pilotos contratados
  duration_seconds int,
  attempted_at timestamptz default now()
);

create index if not exists idx_user_psych_attempts_user on public.user_psych_attempts(user_id, attempted_at desc);

-- GROUP DYNAMICS (escenarios grupales) ---------------------------------------
create table if not exists public.psych_group_dynamics (
  id bigint generated always as identity primary key,
  slug text unique not null,
  scenario_title text not null,
  scenario_description text not null,
  roles jsonb default '[]'::jsonb,             -- [{role:'CEO', brief:'...'}, ...]
  evaluation_criteria jsonb default '[]'::jsonb,
  duration_minutes int default 30,
  participant_count int default 4,
  created_at timestamptz default now()
);

-- PERSONALITY TESTS ----------------------------------------------------------
create table if not exists public.psych_personality_tests (
  id bigint generated always as identity primary key,
  slug text unique not null,
  test_name text not null,                     -- 'Big5', 'DISC', 'Hogan HDS'
  description text,
  questions jsonb not null,                    -- [{id, text, scale:'likert_1_5', dimension:'O|C|E|A|N'}, ...]
  scoring_logic jsonb,                         -- cómo computar el resultado
  created_at timestamptz default now()
);

-- RLS ------------------------------------------------------------------------
alter table public.psych_categories enable row level security;
alter table public.psych_tests enable row level security;
alter table public.user_psych_attempts enable row level security;
alter table public.psych_group_dynamics enable row level security;
alter table public.psych_personality_tests enable row level security;

create policy "psych_categories_read" on public.psych_categories for select to authenticated using (true);
create policy "psych_tests_read" on public.psych_tests for select to authenticated using (is_active);
create policy "psych_group_dynamics_read" on public.psych_group_dynamics for select to authenticated using (true);
create policy "psych_personality_tests_read" on public.psych_personality_tests for select to authenticated using (true);
create policy "user_psych_attempts_own" on public.user_psych_attempts for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- SEED: 9 categorías ---------------------------------------------------------
insert into public.psych_categories (slug, name, family, description, test_engine, icon_name, color, order_index) values
  ('atencion_dividida', 'Atención dividida', 'attention', 'Atender múltiples estímulos simultáneamente (ATC + instrumentos + nav)', 'custom', 'Eye', 'cyan', 10),
  ('memoria_operacional', 'Memoria operacional', 'memory', 'Working memory aplicada a clearances ATC y secuencias', 'custom', 'Brain', 'violet', 20),
  ('multitasking', 'Multitasking', 'attention', 'Cambio rápido de tarea sin perder calidad', 'custom', 'Layers', 'blue', 30),
  ('razonamiento_logico', 'Razonamiento lógico', 'reasoning', 'Inferencia y resolución de problemas bajo tiempo', 'cute', 'Sigma', 'amber', 40),
  ('spatial_awareness', 'Spatial awareness', 'spatial', 'Orientación espacial 3D, compass, mental rotation', 'pilapt', 'Compass', 'cyan', 50),
  ('coordinacion', 'Coordinación psicomotriz', 'coordination', 'Hand-eye coordination, reaction time bajo presión', 'pilapt', 'Activity', 'green', 60),
  ('cognitivos_generales', 'Tests cognitivos generales', 'cognitive', 'IQ, verbal, numeric, abstract reasoning', 'compass', 'Cpu', 'blue', 70),
  ('dinamicas_grupales', 'Dinámicas grupales', 'dynamics', 'Group assessment center, role-plays, panel discussions', 'external', 'Users', 'violet', 80),
  ('personality', 'Personality tests', 'personality', 'Big5, DISC, Hogan — fit cultural para aerolínea', 'external', 'UserCheck', 'red', 90)
on conflict (slug) do nothing;
