-- ============================================================================
-- Módulo: SIMULADOR DE ENTREVISTAS (separado de Ingreso a Aerolínea)
-- ============================================================================
-- HR Interview, Technical Interview, Video Interview AI.
-- Grabación audio/video + feedback IA (claridad, muletillas, pace, contenido).
-- ============================================================================

create table if not exists public.interview_sim_categories (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  description text,
  type text not null check (type in ('hr','technical','video_ai','captain','custom')),
  icon_name text,
  color text default 'cyan',
  order_index int default 0
);

create table if not exists public.interview_sim_questions (
  id bigint generated always as identity primary key,
  category_id bigint not null references public.interview_sim_categories(id) on delete cascade,
  slug text unique not null,
  question_text text not null,
  question_audio_url text,                      -- voz natural haciendo la pregunta
  intent text,                                  -- '¿Por qué hacen esta pregunta?' coaching note
  expected_topics jsonb default '[]'::jsonb,
  follow_ups jsonb default '[]'::jsonb,
  ideal_duration_seconds int default 120,
  difficulty smallint default 2,
  airline_id bigint references public.airlines(id) on delete set null,
  is_active boolean default true,
  order_index int default 0,
  created_at timestamptz default now()
);

create index if not exists idx_interview_sim_questions_category on public.interview_sim_questions(category_id, order_index) where is_active;

-- SESSIONS (cada vez que el usuario hace una sesión completa) ---------------
create table if not exists public.interview_sim_sessions (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id bigint references public.interview_sim_categories(id) on delete set null,
  airline_id bigint references public.airlines(id) on delete set null,
  started_at timestamptz default now(),
  ended_at timestamptz,
  total_questions int default 0,
  status text default 'in_progress' check (status in ('in_progress','completed','abandoned'))
);

create index if not exists idx_interview_sim_sessions_user on public.interview_sim_sessions(user_id, started_at desc);

-- RECORDINGS (audio/video por pregunta dentro de una session) ---------------
create table if not exists public.interview_sim_recordings (
  id bigint generated always as identity primary key,
  session_id bigint not null references public.interview_sim_sessions(id) on delete cascade,
  question_id bigint references public.interview_sim_questions(id) on delete set null,
  audio_url text,
  video_url text,
  transcript text,
  duration_seconds int,
  recorded_at timestamptz default now()
);

create index if not exists idx_interview_sim_recordings_session on public.interview_sim_recordings(session_id);

-- AI FEEDBACK ----------------------------------------------------------------
create table if not exists public.interview_sim_feedback (
  id bigint generated always as identity primary key,
  recording_id bigint not null references public.interview_sim_recordings(id) on delete cascade,
  score_overall numeric(5,2),                   -- 0-100
  score_clarity numeric(5,2),
  score_communication numeric(5,2),
  score_content numeric(5,2),
  score_confidence numeric(5,2),
  filler_words_count int default 0,             -- "uh", "este", "como que"
  filler_words_list jsonb default '[]'::jsonb,
  pace_wpm int,                                 -- words per minute
  pace_assessment text check (pace_assessment in ('too_slow','optimal','too_fast')),
  silences_count int default 0,
  feedback_text text,
  strengths jsonb default '[]'::jsonb,
  improvements jsonb default '[]'::jsonb,
  generated_at timestamptz default now()
);

-- RLS ------------------------------------------------------------------------
alter table public.interview_sim_categories enable row level security;
alter table public.interview_sim_questions enable row level security;
alter table public.interview_sim_sessions enable row level security;
alter table public.interview_sim_recordings enable row level security;
alter table public.interview_sim_feedback enable row level security;

create policy "interview_sim_categories_read" on public.interview_sim_categories for select to authenticated using (true);
create policy "interview_sim_questions_read" on public.interview_sim_questions for select to authenticated using (is_active);

create policy "interview_sim_sessions_own" on public.interview_sim_sessions for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Recordings & feedback: por session ownership
create policy "interview_sim_recordings_own" on public.interview_sim_recordings for all to authenticated
  using (exists (select 1 from public.interview_sim_sessions s where s.id = session_id and s.user_id = auth.uid()))
  with check (exists (select 1 from public.interview_sim_sessions s where s.id = session_id and s.user_id = auth.uid()));

create policy "interview_sim_feedback_own" on public.interview_sim_feedback for all to authenticated
  using (exists (select 1 from public.interview_sim_recordings r join public.interview_sim_sessions s on s.id = r.session_id where r.id = recording_id and s.user_id = auth.uid()))
  with check (exists (select 1 from public.interview_sim_recordings r join public.interview_sim_sessions s on s.id = r.session_id where r.id = recording_id and s.user_id = auth.uid()));

-- SEED: 3 categorías base ----------------------------------------------------
insert into public.interview_sim_categories (slug, name, type, description, icon_name, color, order_index) values
  ('hr_interview', 'HR Interview', 'hr', 'Behavioral, leadership, CRM, decision making, failure management', 'Users', 'cyan', 10),
  ('technical_interview', 'Technical Interview', 'technical', 'Emergencias, meteo, performance, TEM, fuel, alternate planning', 'Wrench', 'blue', 20),
  ('video_interview_ai', 'Video Interview AI', 'video_ai', 'Grabación + feedback IA: claridad, comunicación, muletillas, pace', 'Video', 'violet', 30)
on conflict (slug) do nothing;
