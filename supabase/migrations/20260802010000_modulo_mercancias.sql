-- ============================================================================
-- Módulo Mercancías Peligrosas: progreso, intentos y logros
--
-- Espejo de lo que ya existe para NOTAM y METAR, con una diferencia: aquí la
-- lección, la práctica y el chequeo son pasos del MISMO lector, así que el
-- progreso de lectura y el de práctica viven en la misma tabla y el chequeo
-- lleva su propia tabla de intentos.
--
-- Las tres cosas van juntas y a propósito: la tabla, el logro CON su condición
-- dentro de check_and_unlock_achievements, y el disparador. Separarlas es lo
-- que dejó a metar_master existiendo en el catálogo y siendo imposible de
-- desbloquear.
-- ============================================================================

-- ─── Progreso de lectura y práctica ─────────────────────────────────────────
create table if not exists public.user_mercancias_progress (
  user_id        uuid primary key references auth.users(id) on delete cascade,
  -- Números de sección leída: 0 a 8.
  lesson_screens smallint[] not null default '{}',
  -- Ids de los casos de práctica resueltos: "c1", "c2"…
  practice_done  text[]     not null default '{}',
  updated_at     timestamptz not null default now()
);

comment on table public.user_mercancias_progress is
  'Progreso del módulo Mercancías Peligrosas: secciones leídas y casos de práctica resueltos. Espejo de user_notam_progress.';

alter table public.user_mercancias_progress enable row level security;

drop policy if exists "mercancias_progress_select_own" on public.user_mercancias_progress;
create policy "mercancias_progress_select_own" on public.user_mercancias_progress
  for select using (auth.uid() = user_id);

drop policy if exists "mercancias_progress_insert_own" on public.user_mercancias_progress;
create policy "mercancias_progress_insert_own" on public.user_mercancias_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "mercancias_progress_update_own" on public.user_mercancias_progress;
create policy "mercancias_progress_update_own" on public.user_mercancias_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─── Intentos del chequeo final ─────────────────────────────────────────────
create table if not exists public.user_mercancias_exam_attempts (
  id       uuid primary key default gen_random_uuid(),
  user_id  uuid not null references auth.users(id) on delete cascade,
  score    int  not null check (score between 0 and 100),
  correct  int  not null default 0,
  total    int  not null default 0,
  taken_at timestamptz not null default now()
);

comment on table public.user_mercancias_exam_attempts is
  'Intentos del chequeo final de Mercancías Peligrosas. Espejo de user_metar_exam_attempts.';

create index if not exists idx_mercancias_exam_user_score
  on public.user_mercancias_exam_attempts (user_id, score desc);

alter table public.user_mercancias_exam_attempts enable row level security;

drop policy if exists "mercancias_exam_select_own" on public.user_mercancias_exam_attempts;
create policy "mercancias_exam_select_own" on public.user_mercancias_exam_attempts
  for select using (auth.uid() = user_id);

drop policy if exists "mercancias_exam_insert_own" on public.user_mercancias_exam_attempts;
create policy "mercancias_exam_insert_own" on public.user_mercancias_exam_attempts
  for insert with check (auth.uid() = user_id);

-- ─── Upsert de progreso, idempotente ────────────────────────────────────────
create or replace function public.mercancias_mark_progress(
  p_lesson_screen smallint default null,
  p_practice_id   text     default null
)
returns public.user_mercancias_progress
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.user_mercancias_progress;
begin
  if auth.uid() is null then
    raise exception 'no authenticated user';
  end if;

  insert into public.user_mercancias_progress (user_id, lesson_screens, practice_done, updated_at)
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
        public.user_mercancias_progress.lesson_screens ||
        case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end
      ) as s
    ),
    practice_done = (
      select coalesce(array_agg(distinct p order by p), '{}'::text[])
      from unnest(
        public.user_mercancias_progress.practice_done ||
        case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end
      ) as p
    ),
    updated_at = now()
  returning * into v_row;

  return v_row;
end $$;

comment on function public.mercancias_mark_progress(smallint, text) is
  'Marca una sección leída y/o un caso de práctica resuelto para el usuario autenticado. Idempotente.';

revoke all on function public.mercancias_mark_progress(smallint, text) from public, anon;
grant execute on function public.mercancias_mark_progress(smallint, text) to authenticated, service_role;

-- ─── Umbrales de contenido ──────────────────────────────────────────────────
-- El contenido vive en TypeScript y crece. Si el umbral se escribe a mano
-- dentro de la función, el día que el módulo pase de 9 a 10 secciones el logro
-- se otorga antes de tiempo y nadie se entera.
insert into public.module_thresholds (code, total, nota) values
  ('mercancias_lesson',   9, 'MP_LECTURA_TOTAL de src/lib/mercancias.ts'),
  ('mercancias_practice', 4, 'CASOS.length de src/lib/mercanciasPractica.ts'),
  ('mercancias_pass',    80, 'Mínimo del chequeo final, 4 de 5')
on conflict (code) do update set total = excluded.total, nota = excluded.nota;

-- ─── Logros ─────────────────────────────────────────────────────────────────
insert into public.achievements (code, name, description, icon, tier, order_index) values
  ('mercancias_lesson',   'Mercancías leído',    'Leíste las nueve secciones del módulo de mercancías peligrosas', '📖', 'bronze', 18),
  ('mercancias_practice', 'Mercancías clasificadas', 'Resolviste los cuatro casos de clasificación',                '🎯', 'silver', 19),
  ('mercancias_exam',     'Chequeo superado',    'Aprobaste el chequeo final de mercancías peligrosas',             '✅', 'silver', 20),
  ('mercancias_master',   'Mercancías dominadas','Terminaste el módulo entero: lectura, práctica y chequeo',        '☣️', 'gold',   21)
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon,
  tier = excluded.tier,
  order_index = excluded.order_index;

-- ─── La función ─────────────────────────────────────────────────────────────
-- Se recrea entera sobre la versión de 20260801040000, sumando las cuatro
-- ramas del módulo. Nada de lo anterior cambia.
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
  v_notam_lesson int;
  v_notam_practice int;
  v_notam_passed bool;
  v_metar_lesson int;
  v_metar_practice int;
  v_metar_passed bool;
  v_mock_passed bool;
  v_mp_lesson int;
  v_mp_practice int;
  v_mp_passed bool;
  v_t_notam_lesson int;
  v_t_notam_practice int;
  v_t_metar_lesson int;
  v_t_metar_practice int;
  v_t_mock_pass int;
  v_t_mp_lesson int;
  v_t_mp_practice int;
  v_t_mp_pass int;
begin
  if p_user_id is null then return 0; end if;

  -- Las dos fuentes se suman: vault_sessions es donde escribe el quiz actual,
  -- pero en quiz_attempts quedaron intentos reales previos a la migración al
  -- vault. Nadie pierde lo que ya hizo.
  select coalesce(sum(preguntas), 0)::int, count(*) > 0
    into v_total_questions, v_quiz_done
    from (
      select coalesce(array_length(question_ids, 1), 0) as preguntas
        from public.vault_sessions
        where user_id = p_user_id and completed_at is not null
      union all
      select coalesce(total_questions, 0) as preguntas
        from public.quiz_attempts
        where user_id = p_user_id and finished_at is not null
    ) as intentos;

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

  -- subject_master va solo contra vault_sessions: la materia de la tabla vieja
  -- es un id numérico y la nueva un slug de texto; mezclarlas daría rachas falsas.
  with last5 as (
    select subject_slug,
           case
             when coalesce(array_length(question_ids, 1), 0) = 0 then 0
             else round(coalesce(correct_count, 0)::numeric * 100
                        / array_length(question_ids, 1))
           end as score
    from public.vault_sessions
    where user_id = p_user_id
      and completed_at is not null
      and subject_slug is not null
    order by completed_at desc
    limit 5
  )
  select count(*)::int into v_subject_master_count
  from last5
  where score >= 80
    and subject_slug = (select subject_slug from last5 limit 1);

  select total into v_t_notam_lesson   from public.module_thresholds where code = 'notam_lesson';
  select total into v_t_notam_practice from public.module_thresholds where code = 'notam_practice';
  select total into v_t_metar_lesson   from public.module_thresholds where code = 'metar_lesson';
  select total into v_t_metar_practice from public.module_thresholds where code = 'metar_practice';
  select total into v_t_mock_pass      from public.module_thresholds where code = 'airline_mock_pass';
  select total into v_t_mp_lesson      from public.module_thresholds where code = 'mercancias_lesson';
  select total into v_t_mp_practice    from public.module_thresholds where code = 'mercancias_practice';
  select total into v_t_mp_pass        from public.module_thresholds where code = 'mercancias_pass';

  select coalesce(array_length(lesson_screens, 1), 0),
         coalesce(array_length(practice_done, 1), 0)
    into v_notam_lesson, v_notam_practice
    from public.user_notam_progress where user_id = p_user_id;

  select coalesce(array_length(lesson_screens, 1), 0),
         coalesce(array_length(practice_done, 1), 0)
    into v_metar_lesson, v_metar_practice
    from public.user_metar_progress where user_id = p_user_id;

  select coalesce(array_length(lesson_screens, 1), 0),
         coalesce(array_length(practice_done, 1), 0)
    into v_mp_lesson, v_mp_practice
    from public.user_mercancias_progress where user_id = p_user_id;

  select exists(
    select 1 from public.user_notam_exam_attempts
    where user_id = p_user_id and coalesce(score, 0) >= 80
  ) into v_notam_passed;

  select exists(
    select 1 from public.user_metar_exam_attempts
    where user_id = p_user_id and coalesce(score, 0) >= 80
  ) into v_metar_passed;

  select exists(
    select 1 from public.user_airline_mock_attempts
    where user_id = p_user_id and coalesce(score, 0) >= coalesce(v_t_mock_pass, 85)
  ) into v_mock_passed;

  select exists(
    select 1 from public.user_mercancias_exam_attempts
    where user_id = p_user_id and coalesce(score, 0) >= coalesce(v_t_mp_pass, 80)
  ) into v_mp_passed;

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

  if coalesce(v_notam_lesson, 0) >= coalesce(v_t_notam_lesson, 13) then
    v_new := v_new + public._try_unlock(p_user_id, 'notam_lesson');
  end if;
  if coalesce(v_notam_practice, 0) >= coalesce(v_t_notam_practice, 40) then
    v_new := v_new + public._try_unlock(p_user_id, 'notam_practice');
  end if;
  if v_notam_passed then
    v_new := v_new + public._try_unlock(p_user_id, 'notam_exam');
  end if;
  if coalesce(v_metar_lesson, 0) >= coalesce(v_t_metar_lesson, 9) then
    v_new := v_new + public._try_unlock(p_user_id, 'metar_lesson');
  end if;
  if coalesce(v_notam_lesson, 0) >= coalesce(v_t_notam_lesson, 13)
     and coalesce(v_notam_practice, 0) >= coalesce(v_t_notam_practice, 40)
     and v_notam_passed then
    v_new := v_new + public._try_unlock(p_user_id, 'notam_master');
  end if;
  if coalesce(v_metar_lesson, 0) >= coalesce(v_t_metar_lesson, 9)
     and coalesce(v_metar_practice, 0) >= coalesce(v_t_metar_practice, 10)
     and v_metar_passed then
    v_new := v_new + public._try_unlock(p_user_id, 'metar_master');
  end if;
  if v_mock_passed then
    v_new := v_new + public._try_unlock(p_user_id, 'airline_mock_passed');
  end if;

  -- ── Mercancías Peligrosas ──
  if coalesce(v_mp_lesson, 0) >= coalesce(v_t_mp_lesson, 9) then
    v_new := v_new + public._try_unlock(p_user_id, 'mercancias_lesson');
  end if;
  if coalesce(v_mp_practice, 0) >= coalesce(v_t_mp_practice, 4) then
    v_new := v_new + public._try_unlock(p_user_id, 'mercancias_practice');
  end if;
  if v_mp_passed then
    v_new := v_new + public._try_unlock(p_user_id, 'mercancias_exam');
  end if;
  if coalesce(v_mp_lesson, 0) >= coalesce(v_t_mp_lesson, 9)
     and coalesce(v_mp_practice, 0) >= coalesce(v_t_mp_practice, 4)
     and v_mp_passed then
    v_new := v_new + public._try_unlock(p_user_id, 'mercancias_master');
  end if;

  return v_new;
end;
$$;

-- Trampa de Postgres: `create or replace function` devuelve EXECUTE a PUBLIC.
revoke all on function public.check_and_unlock_achievements(uuid) from public, anon;
grant execute on function public.check_and_unlock_achievements(uuid) to authenticated;

-- ─── Disparadores ───────────────────────────────────────────────────────────
-- Sin esto los cuatro logros existirían y no se otorgarían nunca.
drop trigger if exists trg_check_achievements_mercancias on public.user_mercancias_progress;
create trigger trg_check_achievements_mercancias
  after insert or update on public.user_mercancias_progress
  for each row
  execute function public.trigger_check_achievements();

drop trigger if exists trg_check_achievements_mercancias_exam on public.user_mercancias_exam_attempts;
create trigger trg_check_achievements_mercancias_exam
  after insert or update on public.user_mercancias_exam_attempts
  for each row
  execute function public.trigger_check_achievements();
