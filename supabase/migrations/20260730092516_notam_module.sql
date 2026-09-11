-- ============================================================================
-- Modulo NOTAM (seccion del modulo Ingreso a Aerolinea).
-- Guarda progreso de la leccion, practica resuelta y resultados de evaluacion.
-- Todo el contenido (lecciones, codigos, ejercicios, preguntas) vive en el
-- bundle del front: aqui solo va el progreso del usuario.
-- ============================================================================

-- ── Progreso: una fila por usuario ──────────────────────────────────────────
create table if not exists public.user_notam_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  -- indices (1..9) de las pantallas de la leccion ya leidas
  lesson_screens smallint[] not null default '{}',
  -- ids de ejercicios de practica resueltos: "ex-1", "nat-N3", ...
  practice_done text[] not null default '{}',
  updated_at timestamptz not null default now()
);

comment on table public.user_notam_progress is
  'Progreso del usuario en la seccion NOTAM: pantallas de leccion leidas y ejercicios de practica resueltos.';

alter table public.user_notam_progress enable row level security;

drop policy if exists "notam_progress_select_own" on public.user_notam_progress;
create policy "notam_progress_select_own" on public.user_notam_progress
  for select using (auth.uid() = user_id);

drop policy if exists "notam_progress_insert_own" on public.user_notam_progress;
create policy "notam_progress_insert_own" on public.user_notam_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "notam_progress_update_own" on public.user_notam_progress;
create policy "notam_progress_update_own" on public.user_notam_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── Intentos de evaluacion: historial ───────────────────────────────────────
create table if not exists public.user_notam_exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  -- puntaje 0..100 (5 puntos por pregunta sobre 20 preguntas)
  score smallint not null check (score between 0 and 100),
  correct_count smallint not null check (correct_count >= 0),
  total_questions smallint not null check (total_questions > 0),
  passed boolean not null,
  -- detalle por pregunta: [{ id, elegida, correcta, ok }]
  answers jsonb,
  duration_seconds integer,
  created_at timestamptz not null default now()
);

comment on table public.user_notam_exam_attempts is
  'Historial de intentos de la evaluacion NOTAM (20 preguntas, aprueba con 80).';

create index if not exists user_notam_exam_attempts_user_created_idx
  on public.user_notam_exam_attempts (user_id, created_at desc);

alter table public.user_notam_exam_attempts enable row level security;

drop policy if exists "notam_exam_select_own" on public.user_notam_exam_attempts;
create policy "notam_exam_select_own" on public.user_notam_exam_attempts
  for select using (auth.uid() = user_id);

drop policy if exists "notam_exam_insert_own" on public.user_notam_exam_attempts;
create policy "notam_exam_insert_own" on public.user_notam_exam_attempts
  for insert with check (auth.uid() = user_id);

-- ── Upsert de progreso (idempotente, agrega sin duplicar) ───────────────────
create or replace function public.notam_mark_progress(
  p_lesson_screen smallint default null,
  p_practice_id text default null
)
returns public.user_notam_progress
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.user_notam_progress;
begin
  if auth.uid() is null then
    raise exception 'no authenticated user';
  end if;

  insert into public.user_notam_progress (user_id, lesson_screens, practice_done, updated_at)
  values (
    auth.uid(),
    case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end,
    case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end,
    now()
  )
  on conflict (user_id) do update set
    lesson_screens = (
      select coalesce(array_agg(distinct s order by s), '{}'::smallint[])
      from unnest(
        public.user_notam_progress.lesson_screens ||
        case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end
      ) as s
    ),
    practice_done = (
      select coalesce(array_agg(distinct p order by p), '{}'::text[])
      from unnest(
        public.user_notam_progress.practice_done ||
        case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end
      ) as p
    ),
    updated_at = now()
  returning * into v_row;

  return v_row;
end $$;

comment on function public.notam_mark_progress(smallint, text) is
  'Marca una pantalla de leccion y/o un ejercicio de practica como completado para el usuario autenticado. Idempotente.';

-- Sin anon: la seccion NOTAM requiere sesion (leccion aparte, el progreso no).
revoke all on function public.notam_mark_progress(smallint, text) from public, anon;
grant execute on function public.notam_mark_progress(smallint, text) to authenticated, service_role;
