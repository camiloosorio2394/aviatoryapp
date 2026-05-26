-- ============================================================================
-- Módulo: INGRESO A AEROLÍNEA (core comercial)
-- ============================================================================
-- 14 topics base (technical/hr/crm/met-op/performance/nav/aero/sops/jet/turbines/
-- flight-planning/factores-humanos/psico-op/cases).
-- 7 submódulos: banco de preguntas, mock interviews, simulaciones, exámenes,
-- flashcards, casos reales, perfil por aerolínea.
-- ============================================================================

-- TOPICS ---------------------------------------------------------------------
create table if not exists public.airline_prep_topics (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  category text not null check (category in ('interview','technical','behavioral','operations','psychology','case')),
  description text,
  icon_name text,
  color text default 'cyan',
  order_index int default 0,
  created_at timestamptz default now()
);

comment on table public.airline_prep_topics is '14 categorías base que las aerolíneas evalúan. Catálogo, no se modifica seguido.';

-- QUESTIONS bank -------------------------------------------------------------
create table if not exists public.airline_prep_questions (
  id bigint generated always as identity primary key,
  topic_id bigint not null references public.airline_prep_topics(id) on delete cascade,
  type text not null check (type in ('multiple_choice','open','scenario','case_study','technical_short')),
  question text not null,
  options jsonb,                                -- [{key:'a',text:'...'}, ...] para multiple_choice
  correct_answer text,                          -- key (a/b/c/d) para MC, texto para open
  explanation text,                             -- por qué la respuesta es correcta
  difficulty smallint default 2 check (difficulty between 1 and 5),
  tags text[] default '{}',
  source_airline_id bigint references public.airlines(id) on delete set null,
  metadata jsonb default '{}'::jsonb,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_airline_prep_questions_topic on public.airline_prep_questions(topic_id) where is_active;
create index if not exists idx_airline_prep_questions_airline on public.airline_prep_questions(source_airline_id) where is_active;
create index if not exists idx_airline_prep_questions_tags on public.airline_prep_questions using gin(tags);

-- MOCK INTERVIEWS ------------------------------------------------------------
create table if not exists public.airline_prep_mocks (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  description text,
  type text not null check (type in ('hr','technical','mixed','captain_interview','video_ai')),
  difficulty smallint default 2 check (difficulty between 1 and 5),
  duration_minutes int default 30,
  airline_id bigint references public.airlines(id) on delete set null,
  icon_name text,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.airline_prep_mock_questions (
  id bigint generated always as identity primary key,
  mock_id bigint not null references public.airline_prep_mocks(id) on delete cascade,
  question_text text not null,
  expected_topics jsonb default '[]'::jsonb,    -- ['leadership','crm','decision_making']
  follow_ups jsonb default '[]'::jsonb,         -- ["¿Qué harías si...?", ...]
  ideal_duration_seconds int default 120,
  order_index int default 0,
  notes text                                    -- guía para el usuario / coaching tip
);

create index if not exists idx_mock_questions_mock on public.airline_prep_mock_questions(mock_id, order_index);

-- SIMULATIONS (escenarios técnico-operacionales) -----------------------------
create table if not exists public.airline_prep_simulations (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  description text,
  scenario jsonb not null,                      -- {context, aircraft, weather, decision_points}
  type text check (type in ('emergency','weather','fuel','alternate','crm_conflict','tem')),
  difficulty smallint default 3,
  duration_minutes int default 20,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- EXAMS (simulacros completos) -----------------------------------------------
create table if not exists public.airline_prep_exams (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  description text,
  duration_minutes int default 60,
  total_questions int default 30,
  passing_score int default 70,
  airline_id bigint references public.airlines(id) on delete set null,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.airline_prep_exam_questions (
  exam_id bigint not null references public.airline_prep_exams(id) on delete cascade,
  question_id bigint not null references public.airline_prep_questions(id) on delete cascade,
  order_index int default 0,
  primary key (exam_id, question_id)
);

-- FLASHCARDS -----------------------------------------------------------------
create table if not exists public.airline_prep_flashcards (
  id bigint generated always as identity primary key,
  topic_id bigint not null references public.airline_prep_topics(id) on delete cascade,
  front text not null,
  back text not null,
  difficulty smallint default 2,
  image_url text,
  tags text[] default '{}',
  is_active boolean default true,
  created_at timestamptz default now()
);

create index if not exists idx_flashcards_topic on public.airline_prep_flashcards(topic_id) where is_active;

-- REAL CASES (entrevistas reales reportadas por usuarios) --------------------
create table if not exists public.airline_prep_real_cases (
  id bigint generated always as identity primary key,
  airline_id bigint not null references public.airlines(id) on delete cascade,
  position text,                                -- 'first_officer','captain','cadet','intern'
  year_month text,                              -- '2026-04'
  topics_asked jsonb default '[]'::jsonb,
  questions_asked jsonb default '[]'::jsonb,    -- [{q:'...',  topic:'crm'}, ...]
  notes text,
  duration_minutes int,
  result text check (result in ('passed','rejected','pending','withdrew')),
  reported_by_user_id uuid references auth.users(id) on delete set null,
  is_verified boolean default false,
  is_anonymous boolean default true,
  created_at timestamptz default now()
);

create index if not exists idx_real_cases_airline on public.airline_prep_real_cases(airline_id, year_month desc);

-- AIRLINE PROFILES EXTRA (prep info por aerolínea) ---------------------------
create table if not exists public.airline_profiles_prep (
  airline_id bigint primary key references public.airlines(id) on delete cascade,
  prep_summary text,
  common_topics jsonb default '[]'::jsonb,
  typical_process_weeks int,
  salary_range_local text,
  salary_range_usd text,
  application_url text,
  recommended_prep_weeks int default 8,
  recruiter_tips jsonb default '[]'::jsonb,
  updated_at timestamptz default now()
);

-- USER PROGRESS --------------------------------------------------------------
create table if not exists public.user_airline_prep_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id bigint references public.airline_prep_questions(id) on delete set null,
  flashcard_id bigint references public.airline_prep_flashcards(id) on delete set null,
  mock_id bigint references public.airline_prep_mocks(id) on delete set null,
  exam_id bigint references public.airline_prep_exams(id) on delete set null,
  answer_given text,
  is_correct boolean,
  time_taken_sec int,
  audio_recording_url text,                     -- para mock video/audio responses
  ai_feedback_jsonb jsonb,                      -- score, comentarios IA
  attempted_at timestamptz default now()
);

create index if not exists idx_airline_prep_attempts_user on public.user_airline_prep_attempts(user_id, attempted_at desc);

create table if not exists public.user_airline_prep_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_id bigint not null references public.airline_prep_topics(id) on delete cascade,
  questions_attempted int default 0,
  questions_correct int default 0,
  flashcards_reviewed int default 0,
  last_activity_at timestamptz default now(),
  mastery_level smallint default 0 check (mastery_level between 0 and 5),
  primary key (user_id, topic_id)
);

-- RLS ------------------------------------------------------------------------
alter table public.airline_prep_topics enable row level security;
alter table public.airline_prep_questions enable row level security;
alter table public.airline_prep_mocks enable row level security;
alter table public.airline_prep_mock_questions enable row level security;
alter table public.airline_prep_simulations enable row level security;
alter table public.airline_prep_exams enable row level security;
alter table public.airline_prep_exam_questions enable row level security;
alter table public.airline_prep_flashcards enable row level security;
alter table public.airline_prep_real_cases enable row level security;
alter table public.airline_profiles_prep enable row level security;
alter table public.user_airline_prep_attempts enable row level security;
alter table public.user_airline_prep_progress enable row level security;

-- Content: SELECT público para usuarios autenticados
create policy "airline_prep_topics_read" on public.airline_prep_topics for select to authenticated using (true);
create policy "airline_prep_questions_read" on public.airline_prep_questions for select to authenticated using (is_active);
create policy "airline_prep_mocks_read" on public.airline_prep_mocks for select to authenticated using (is_active);
create policy "airline_prep_mock_questions_read" on public.airline_prep_mock_questions for select to authenticated using (true);
create policy "airline_prep_simulations_read" on public.airline_prep_simulations for select to authenticated using (is_active);
create policy "airline_prep_exams_read" on public.airline_prep_exams for select to authenticated using (is_active);
create policy "airline_prep_exam_questions_read" on public.airline_prep_exam_questions for select to authenticated using (true);
create policy "airline_prep_flashcards_read" on public.airline_prep_flashcards for select to authenticated using (is_active);
create policy "airline_profiles_prep_read" on public.airline_profiles_prep for select to authenticated using (true);

-- Real cases: SELECT verified=true a todos; los anónimos los ven todos
create policy "airline_prep_real_cases_read" on public.airline_prep_real_cases for select to authenticated using (is_verified);
create policy "airline_prep_real_cases_insert_own" on public.airline_prep_real_cases for insert to authenticated with check (reported_by_user_id = auth.uid());
create policy "airline_prep_real_cases_update_own" on public.airline_prep_real_cases for update to authenticated using (reported_by_user_id = auth.uid());

-- User progress: solo del usuario
create policy "user_airline_prep_attempts_own" on public.user_airline_prep_attempts for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "user_airline_prep_progress_own" on public.user_airline_prep_progress for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- SEED: 14 topics base ---------------------------------------------------------
insert into public.airline_prep_topics (slug, name, category, description, icon_name, color, order_index) values
  ('technical_interview', 'Technical Interview', 'interview', 'Preguntas técnicas estilo entrevista de aerolínea', 'Wrench', 'blue', 10),
  ('hr_interview', 'HR Interview', 'interview', 'Behavioral, motivación, fit cultural', 'Users', 'cyan', 20),
  ('crm_tem', 'CRM / TEM', 'behavioral', 'Crew Resource Management y Threat & Error Management', 'Network', 'violet', 30),
  ('meteorologia_op', 'Meteorología Operacional', 'operations', 'Briefing meteo aplicado a operación real', 'CloudSun', 'cyan', 40),
  ('performance', 'Performance', 'technical', 'Cálculos de despegue, aterrizaje, ascenso, crucero', 'TrendingUp', 'amber', 50),
  ('navegacion', 'Navegación', 'technical', 'RNAV, RNP, ATC routing, alternate planning', 'Compass', 'blue', 60),
  ('aerodinamica', 'Aerodinámica', 'technical', 'Sustentación, drag, swept wing, high-speed', 'Plane', 'cyan', 70),
  ('sops', 'SOPs', 'operations', 'Standard Operating Procedures, flow patterns', 'ListChecks', 'green', 80),
  ('jet_orientation', 'Jet Orientation', 'technical', 'Sistemas avanzados, high-altitude, FMS', 'Rocket', 'violet', 90),
  ('turbine_systems', 'Turbine Systems', 'technical', 'Motor a reacción, APU, hydraulics, electrical', 'Cog', 'amber', 100),
  ('flight_planning', 'Flight Planning', 'operations', 'Fuel planning, route, NOTAMs, MEL', 'Map', 'blue', 110),
  ('factores_humanos', 'Factores Humanos', 'psychology', 'Fatigue, stress, decision-making bias', 'Brain', 'violet', 120),
  ('psicologia_operacional', 'Psicología Operacional', 'psychology', 'Manejo de crisis, comunicación, liderazgo', 'HeartPulse', 'red', 130),
  ('assessment_cases', 'Casos tipo Assessment', 'case', 'Mini-cases tipo group exercise / individual case study', 'ClipboardList', 'green', 140)
on conflict (slug) do nothing;
