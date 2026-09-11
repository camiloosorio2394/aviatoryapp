-- ============================================================================
-- El simulacro de entrevista técnica deja de olvidar
--
-- AirlineMockExam.tsx no tenía una sola línea de persistencia: ni Supabase ni
-- respaldo local. El piloto presentaba 25 preguntas, veía su nota, salía de la
-- pantalla y el intento desaparecía. Sin mejor puntaje, sin historial, sin
-- logro, y el hub del módulo no se enteraba de que lo había presentado.
--
-- Es justo la pieza construida para dar una razón para volver cuando ya leíste
-- todo, y era la única del módulo con amnesia total: NotamExam persiste en base
-- y MetarExam al menos en local.
--
-- Aquí van las tres cosas que hacen falta y que en la tanda anterior se
-- separaron con el resultado conocido (metar_master quedó inerte):
--   1. la tabla,
--   2. el logro Y su condición dentro de check_and_unlock_achievements,
--   3. el disparador, sin el cual la función nunca corre.
-- ============================================================================

-- ─── La tabla ───────────────────────────────────────────────────────────────
-- Espejo de user_metar_exam_attempts: el simulacro no necesita guardar el
-- detalle de respuestas (la revisión se ve en pantalla y el banco se sortea
-- distinto en cada intento, así que un answers[] no sería comparable entre
-- intentos). Lo que sí importa entre dispositivos es el mejor puntaje.
create table if not exists public.user_airline_mock_attempts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  score       int  not null check (score between 0 and 100),
  correct     int  not null default 0,
  total       int  not null default 0,
  taken_at    timestamptz not null default now()
);

comment on table public.user_airline_mock_attempts is
  'Intentos del simulacro de entrevista técnica del módulo Ingreso a aerolínea. Espejo de user_metar_exam_attempts.';

create index if not exists idx_airline_mock_user_score
  on public.user_airline_mock_attempts (user_id, score desc);

alter table public.user_airline_mock_attempts enable row level security;

drop policy if exists "airline_mock_select_own" on public.user_airline_mock_attempts;
create policy "airline_mock_select_own" on public.user_airline_mock_attempts
  for select using (auth.uid() = user_id);

drop policy if exists "airline_mock_insert_own" on public.user_airline_mock_attempts;
create policy "airline_mock_insert_own" on public.user_airline_mock_attempts
  for insert with check (auth.uid() = user_id);

-- ─── El logro ───────────────────────────────────────────────────────────────
-- El mínimo del simulacro es 85, no los 80 de una evaluación de tema: es
-- PASS_SCORE de src/pages/AirlineMockExam.tsx y está más alto a propósito,
-- porque en una prueba técnica de aerolínea no se aprueba raspando. El umbral
-- va a module_thresholds por la misma razón que los demás: si mañana cambia en
-- el TypeScript, el acoplamiento está en un solo sitio y a la vista.
insert into public.module_thresholds (code, total, nota) values
  ('airline_mock_pass', 85, 'PASS_SCORE de src/pages/AirlineMockExam.tsx')
on conflict (code) do update set total = excluded.total, nota = excluded.nota;

insert into public.achievements (code, name, description, icon, tier, order_index) values
  ('airline_mock_passed', 'Simulacro superado', 'Aprobaste el simulacro de entrevista técnica', '🎖️', 'gold', 17)
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon,
  tier = excluded.tier,
  order_index = excluded.order_index;

-- ─── La función ─────────────────────────────────────────────────────────────
-- Se recrea entera sobre la versión de 20260801030000, sumando la rama del
-- simulacro. Nada de lo anterior cambia.
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
  v_t_notam_lesson int;
  v_t_notam_practice int;
  v_t_metar_lesson int;
  v_t_metar_practice int;
  v_t_mock_pass int;
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

  select coalesce(array_length(lesson_screens, 1), 0),
         coalesce(array_length(practice_done, 1), 0)
    into v_notam_lesson, v_notam_practice
    from public.user_notam_progress where user_id = p_user_id;

  select coalesce(array_length(lesson_screens, 1), 0),
         coalesce(array_length(practice_done, 1), 0)
    into v_metar_lesson, v_metar_practice
    from public.user_metar_progress where user_id = p_user_id;

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
  -- El cierre del módulo. No exige haber terminado los temas: el simulacro
  -- mezcla el banco entero y aprobarlo con 85 ya prueba que los sabes.
  if v_mock_passed then
    v_new := v_new + public._try_unlock(p_user_id, 'airline_mock_passed');
  end if;

  return v_new;
end;
$$;

-- Trampa de Postgres: `create or replace function` devuelve EXECUTE a PUBLIC.
revoke all on function public.check_and_unlock_achievements(uuid) from public, anon;
grant execute on function public.check_and_unlock_achievements(uuid) to authenticated;

-- ─── El disparador ──────────────────────────────────────────────────────────
-- Sin esto el logro existiría en el catálogo y no se otorgaría nunca. Es el
-- error exacto que dejó a metar_master inerte, y no se repite.
drop trigger if exists trg_check_achievements_airline_mock on public.user_airline_mock_attempts;
create trigger trg_check_achievements_airline_mock
  after insert or update on public.user_airline_mock_attempts
  for each row
  execute function public.trigger_check_achievements();
