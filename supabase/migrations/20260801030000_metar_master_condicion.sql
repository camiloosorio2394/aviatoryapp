-- ============================================================================
-- La condición que faltaba: metar_master
--
-- La migración 20260801020000 inserta el logro `metar_master` en la tabla
-- achievements y le cuelga su disparador, pero NINGUNA rama de
-- check_and_unlock_achievements lo otorga: no existe un
-- _try_unlock(p_user_id, 'metar_master') en ninguna de las dos migraciones del
-- 1 de agosto. Su comentario de cierre dice que la lógica "se añade en la misma
-- pasada en que se aplique la 20260801010000", y esa migración no la trae.
--
-- O sea: es exactamente el defecto del hallazgo C6 de la auditoría, reintroducido
-- el mismo día que se arreglaba. Un logro que existe en el catálogo, se le ve el
-- hueco al piloto en su perfil, y es imposible de desbloquear.
--
-- Aquí se añade la condición, espejo exacta de notam_master: lección completa,
-- práctica completa y evaluación aprobada.
--
-- OJO, queda inerte hasta que el frontend persista, y son dos cosas:
--   1. src/pages/MetarPractice.tsx:91 llama writeMetarProgress (localStorage) y
--      no markMetarProgress, así que user_metar_progress.practice_done nunca se
--      llena. NotamPractice.tsx sí lo hace bien y sirve de modelo.
--   2. src/pages/MetarExam.tsx:43 guarda el puntaje solo en localStorage. Nada
--      inserta en user_metar_exam_attempts, que es la tabla que crea la
--      migración 20260801020000.
-- Mientras esas dos sigan así, metar_master no se puede desbloquear aunque la
-- lógica ya esté. La lección sí persiste bien (MetarLesson.tsx usa metarProgress).
-- ============================================================================

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
  v_t_notam_lesson int;
  v_t_notam_practice int;
  v_t_metar_lesson int;
  v_t_metar_practice int;
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
  -- El que faltaba.
  if coalesce(v_metar_lesson, 0) >= coalesce(v_t_metar_lesson, 9)
     and coalesce(v_metar_practice, 0) >= coalesce(v_t_metar_practice, 10)
     and v_metar_passed then
    v_new := v_new + public._try_unlock(p_user_id, 'metar_master');
  end if;

  return v_new;
end;
$$;

-- Trampa de Postgres: `create or replace function` devuelve EXECUTE a PUBLIC.
revoke all on function public.check_and_unlock_achievements(uuid) from public, anon;
grant execute on function public.check_and_unlock_achievements(uuid) to authenticated;
