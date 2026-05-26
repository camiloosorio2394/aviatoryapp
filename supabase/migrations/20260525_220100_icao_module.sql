-- ============================================================================
-- Módulo: ICAO ENGLISH (separado completamente)
-- ============================================================================
-- Niveles 3/4/5, skills (listening/speaking/pronunciation/radiotelephony/
-- unexpected), ejercicios, frases, emergencias, roleplays, evaluación con IA.
-- ============================================================================

-- LEVELS ---------------------------------------------------------------------
create table if not exists public.icao_levels (
  id smallint primary key,                  -- 3, 4, 5
  title text not null,
  description text,
  exit_criteria jsonb default '[]'::jsonb,
  color text default 'blue'
);

-- SKILLS ---------------------------------------------------------------------
create table if not exists public.icao_skills (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  description text,
  icao_descriptor text,
  icon_name text,
  order_index int default 0
);

-- EXERCISES ------------------------------------------------------------------
create table if not exists public.icao_exercises (
  id bigint generated always as identity primary key,
  skill_id bigint not null references public.icao_skills(id) on delete cascade,
  level_id smallint not null references public.icao_levels(id) on delete cascade,
  slug text unique not null,
  title text not null,
  type text not null check (type in ('audio_mc','speaking_open','listening_transcript','roleplay','pronunciation_drill','vocabulary_drill','radiotelephony_drill')),
  prompt_text text,
  prompt_audio_url text,
  expected_response text,
  options jsonb,                            -- para MC
  correct_answer text,
  reference_audio_url text,
  difficulty smallint default 2 check (difficulty between 1 and 5),
  estimated_seconds int default 60,
  metadata jsonb default '{}'::jsonb,
  is_active boolean default true,
  created_at timestamptz default now()
);

create index if not exists idx_icao_exercises_skill_level on public.icao_exercises(skill_id, level_id) where is_active;

-- PHRASES (frases ICAO oficiales) --------------------------------------------
create table if not exists public.icao_phrases (
  id bigint generated always as identity primary key,
  category text not null check (category in ('taxi','takeoff','climb','cruise','descent','approach','landing','emergency','ground','weather','traffic')),
  phrase_en text not null,
  phrase_es text,
  context text,
  audio_url text,
  doc_reference text,                       -- 'OACI Doc 9432 §3.2.1'
  variant text check (variant in ('icao_standard','faa','caa_uk','easa')),
  is_active boolean default true,
  created_at timestamptz default now()
);

create index if not exists idx_icao_phrases_category on public.icao_phrases(category) where is_active;

-- EMERGENCIES (situaciones inesperadas) --------------------------------------
create table if not exists public.icao_emergencies (
  id bigint generated always as identity primary key,
  slug text unique not null,
  scenario_title text not null,
  scenario_description text not null,
  scenario_audio_url text,                  -- audio del ATC dando la situación
  expected_pilot_response text,
  key_vocabulary text[] default '{}',
  difficulty smallint default 3,
  level_id smallint references public.icao_levels(id),
  created_at timestamptz default now()
);

-- ROLEPLAYS ATC-PILOT --------------------------------------------------------
create table if not exists public.icao_roleplays (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  scenario text not null,
  difficulty smallint default 3,
  level_id smallint references public.icao_levels(id),
  duration_minutes int default 5,
  atc_script jsonb not null,                -- [{turn:1,speaker:'atc',text:'...',audio_url:'...'}, ...]
  pilot_script jsonb,                       -- expected/reference responses
  is_active boolean default true,
  created_at timestamptz default now()
);

-- USER PROGRESS --------------------------------------------------------------
create table if not exists public.user_icao_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  exercise_id bigint references public.icao_exercises(id) on delete set null,
  emergency_id bigint references public.icao_emergencies(id) on delete set null,
  roleplay_id bigint references public.icao_roleplays(id) on delete set null,
  audio_recording_url text,
  transcript text,
  ai_score jsonb,                           -- {pronunciation, fluency, vocabulary, comprehension, structure, interactions}
  feedback_text text,
  duration_seconds int,
  attempted_at timestamptz default now()
);

create index if not exists idx_user_icao_attempts_user on public.user_icao_attempts(user_id, attempted_at desc);

create table if not exists public.user_icao_level (
  user_id uuid primary key references auth.users(id) on delete cascade,
  current_level smallint default 3 check (current_level between 3 and 6),
  target_level smallint default 4 check (target_level between 3 and 6),
  last_assessment_at timestamptz,
  last_assessment_score jsonb,              -- desglose por descriptor
  exam_scheduled_for date,
  updated_at timestamptz default now()
);

-- RLS ------------------------------------------------------------------------
alter table public.icao_levels enable row level security;
alter table public.icao_skills enable row level security;
alter table public.icao_exercises enable row level security;
alter table public.icao_phrases enable row level security;
alter table public.icao_emergencies enable row level security;
alter table public.icao_roleplays enable row level security;
alter table public.user_icao_attempts enable row level security;
alter table public.user_icao_level enable row level security;

create policy "icao_levels_read" on public.icao_levels for select to authenticated using (true);
create policy "icao_skills_read" on public.icao_skills for select to authenticated using (true);
create policy "icao_exercises_read" on public.icao_exercises for select to authenticated using (is_active);
create policy "icao_phrases_read" on public.icao_phrases for select to authenticated using (is_active);
create policy "icao_emergencies_read" on public.icao_emergencies for select to authenticated using (true);
create policy "icao_roleplays_read" on public.icao_roleplays for select to authenticated using (is_active);

create policy "user_icao_attempts_own" on public.user_icao_attempts for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "user_icao_level_own" on public.user_icao_level for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- SEED levels + skills ---------------------------------------------------------
insert into public.icao_levels (id, title, description, color, exit_criteria) values
  (3, 'ICAO 3 — Pre-Operational', 'Comunicación básica, no apto para operación internacional', 'amber', '["Necesita verificación periódica","Vocabulario limitado a fraseología","Comprende pero responde lento"]'::jsonb),
  (4, 'ICAO 4 — Operational', 'Mínimo legal para volar internacional comercial', 'cyan', '["Vocabulario aviation completo","Fluidez en interacciones de rutina","Maneja eventos inesperados básicos","Vigencia 3 años"]'::jsonb),
  (5, 'ICAO 5 — Extended', 'Nivel objetivo para carrera de aerolínea', 'green', '["Vocabulario amplio aviation y general","Fluidez sostenida","Maneja eventos complejos","Vigencia 6 años"]'::jsonb)
on conflict (id) do nothing;

insert into public.icao_skills (slug, name, description, icao_descriptor, icon_name, order_index) values
  ('listening', 'Listening', 'Comprensión auditiva en condiciones de cabina y ruido', 'Comprehension', 'Headphones', 10),
  ('speaking', 'Speaking', 'Producción oral fluida y comprensible', 'Fluency', 'Mic', 20),
  ('pronunciation', 'Pronunciation', 'Acento, ritmo, entonación inteligibles para hablantes internacionales', 'Pronunciation', 'Volume2', 30),
  ('radiotelephony', 'Radiotelephony', 'Manejo de fraseología OACI estándar', 'Vocabulary', 'Radio', 40),
  ('unexpected', 'Unexpected Situations', 'Manejo lingüístico de emergencias y situaciones no rutinarias', 'Interactions', 'AlertTriangle', 50)
on conflict (slug) do nothing;
