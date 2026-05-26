-- ============================================================================
-- Módulo: PCA AEROCIVIL — extensión sobre `subjects` y `questions` existentes
-- ============================================================================
-- Agrega: resumen teórico (pca_lessons), exámenes simulados (pca_exams) y
-- estadísticas por materia.
-- Aprovecha las tablas existentes `subjects` (8 materias Aerocivil) y
-- `questions` (banco general) — solo se agrega un flag `module` opcional
-- para filtrar por módulo (PCA / Aerolínea / Materias genérico).
-- ============================================================================

-- LESSONS (resumen teórico por materia) --------------------------------------
create table if not exists public.pca_lessons (
  id bigint generated always as identity primary key,
  subject_id bigint not null references public.subjects(id) on delete cascade,
  slug text unique not null,
  title text not null,
  summary text,                                 -- 1-2 línea resumen
  content_md text not null,                     -- markdown rico
  estimated_minutes int default 15,
  order_index int default 0,
  difficulty smallint default 2,
  prerequisite_lesson_id bigint references public.pca_lessons(id) on delete set null,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_pca_lessons_subject on public.pca_lessons(subject_id, order_index) where is_published;

-- EXAMS (simulacros completos del examen oficial) ----------------------------
create table if not exists public.pca_exams (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  description text,
  duration_minutes int default 120,             -- examen oficial Aerocivil ~2h
  total_questions int default 100,
  passing_score int default 70,
  exam_type text default 'pca_full' check (exam_type in ('pca_full','pca_subject','pca_mini')),
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.pca_exam_questions (
  exam_id bigint not null references public.pca_exams(id) on delete cascade,
  question_id bigint not null references public.questions(id) on delete cascade,
  order_index int default 0,
  primary key (exam_id, question_id)
);

-- ATTEMPTS (intentos en exámenes simulados) ----------------------------------
create table if not exists public.user_pca_exam_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  exam_id bigint not null references public.pca_exams(id) on delete cascade,
  started_at timestamptz default now(),
  finished_at timestamptz,
  total_questions int,
  correct_count int default 0,
  score numeric(5,2),
  passed boolean,
  subject_breakdown jsonb default '{}'::jsonb,  -- {meteorologia:85, navegacion:60, ...}
  time_taken_seconds int
);

create index if not exists idx_user_pca_attempts_user on public.user_pca_exam_attempts(user_id, started_at desc);

-- LESSON PROGRESS ------------------------------------------------------------
create table if not exists public.user_pca_lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id bigint not null references public.pca_lessons(id) on delete cascade,
  status text default 'not_started' check (status in ('not_started','in_progress','completed')),
  completed_at timestamptz,
  time_spent_seconds int default 0,
  primary key (user_id, lesson_id)
);

-- READINESS SCORE (predicción de aprobación) ---------------------------------
create or replace view public.user_pca_readiness as
  select
    u.id as user_id,
    coalesce(avg(a.score) filter (where a.finished_at > now() - interval '60 days'), 0) as avg_score_60d,
    count(a.id) filter (where a.finished_at > now() - interval '60 days') as attempts_60d,
    max(a.score) as best_score,
    bool_or(a.passed) filter (where a.finished_at > now() - interval '14 days') as passed_recently,
    case
      when avg(a.score) filter (where a.finished_at > now() - interval '30 days') >= 80 then 'green'
      when avg(a.score) filter (where a.finished_at > now() - interval '30 days') >= 65 then 'amber'
      else 'red'
    end as readiness_color
  from auth.users u
  left join public.user_pca_exam_attempts a on a.user_id = u.id and a.finished_at is not null
  group by u.id;

-- RLS ------------------------------------------------------------------------
alter table public.pca_lessons enable row level security;
alter table public.pca_exams enable row level security;
alter table public.pca_exam_questions enable row level security;
alter table public.user_pca_exam_attempts enable row level security;
alter table public.user_pca_lesson_progress enable row level security;

create policy "pca_lessons_read" on public.pca_lessons for select to authenticated using (is_published);
create policy "pca_exams_read" on public.pca_exams for select to authenticated using (is_active);
create policy "pca_exam_questions_read" on public.pca_exam_questions for select to authenticated using (true);

create policy "user_pca_exam_attempts_own" on public.user_pca_exam_attempts for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "user_pca_lesson_progress_own" on public.user_pca_lesson_progress for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- View grants
grant select on public.user_pca_readiness to authenticated;

-- Optional: flag en `questions` para etiquetar a qué módulo pertenece -------
-- (no rompe el banco actual; las preguntas existentes quedan sin tag)
alter table public.questions add column if not exists modules text[] default array['pca']::text[];
create index if not exists idx_questions_modules on public.questions using gin(modules);
