-- ============================================================================
-- Seguridad: el banco del PCA, la limpieza de sesiones, los logros y las rachas
--
-- Sale de la auditoría técnica del 2026-09-11. NO TOCA FILAS: cambia funciones y
-- permisos, y agrega a vault_sessions una columna que nace vacía.
--
-- 1. vault_start_quiz. Con p_count nulo, `p_count < 1 or p_count > 20` da NULL,
--    el `if` no salta, el límite por hora suma NULL y `limit NULL` no limita:
--    una sola llamada devolvía el banco entero, las 459 preguntas. Ahora el nulo
--    es inválido. Y las llamadas simultáneas de un mismo usuario pasan en fila,
--    porque cada una contaba el registro sin ver lo que las otras aún no habían
--    confirmado, y disparando varias a la vez el tope de 100 por hora no las veía.
--
-- 2. vault_submit_answer. La misma posición se podía responder una y otra vez y
--    cada envío sumaba: contestando diez veces la pregunta cuya respuesta ya
--    habías visto, la sesión cerraba con 10/10 y contaba para los logros. Ahora
--    cada posición cuenta una sola vez. Repetirla devuelve el resultado de la
--    primera vez sin sumar nada, para que un reintento por red caída no deje al
--    piloto trabado. Y la sesión de una sola pregunta, que nunca se cerraba,
--    ahora se cierra.
--
-- 3. vault_cleanup_expired_sessions. Cualquier usuario con sesión podía
--    ejecutarla, y borraba las sesiones vencidas de TODOS, también las
--    terminadas, que son el historial del PCA y la base de varios logros. Sale
--    del alcance de los usuarios y ya no toca las terminadas.
--
-- 4. recalc_pilot_hours y check_and_unlock_achievements recibían cualquier
--    user_id. recalc_pilot_hours(otro) le ponía a otro piloto las horas de su
--    bitácora, y a quien declaró horas sin cargar vuelos se las dejaba en 0. Con
--    sesión de usuario, ahora solo actúan sobre el propio.
--
-- 5. user_achievements. La política de UPDATE dejaba cambiar achievement_id: el
--    usuario podía convertir un logro suyo en cualquier otro. La app solo marca
--    `seen`, así que solo `seen` queda editable.
--
-- 6. streaks. La política de UPDATE dejaba escribirse una racha de 300 días (y
--    con ella los logros de racha). La racha la lleva increment_streak(); la
--    app solo la lee.
--
-- 7. airline_prep_real_cases. Al insertar o editar se podía poner
--    is_verified = true y publicar un caso sin revisión, visible para todos.
--    Hoy está vacía y la app no la usa; se cierra igual.
--
-- 8. private.get_master_key y private.vault_decrypt tenían EXECUTE para PUBLIC.
--    Nadie tiene USAGE sobre el esquema `private`, así que hoy no eran
--    alcanzables; se cierra para que un GRANT futuro no las destape. Las
--    funciones del banco las llaman como su dueño y no cambian.
--
-- Se probó entera antes de aplicarla, como usuario y dentro de una transacción
-- que se deshizo. La consulta de control está al final, comentada.
-- ============================================================================


-- ─── 1. vault_start_quiz ────────────────────────────────────────────────────
create or replace function public.vault_start_quiz(
  p_subject_slug text default null,
  p_module text default 'pca',
  p_count int default 10,
  p_difficulty smallint default null
)
returns table (
  token uuid,
  question_count int,
  expires_at timestamptz,
  questions jsonb
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_recent_count int;
  v_token uuid := gen_random_uuid();
  v_question_ids uuid[];
  v_questions jsonb;
  v_expires_at timestamptz := now() + interval '20 minutes';
begin
  if v_user_id is null then
    raise exception 'unauthorized';
  end if;

  -- El nulo va primero: `null < 1` no es verdadero y pasaba de largo.
  if p_count is null or p_count < 1 or p_count > 20 then
    raise exception 'invalid_count';
  end if;

  -- Una llamada a la vez por usuario, hasta que confirme. Sin esto, varias
  -- simultáneas cuentan el registro antes de que las otras escriban el suyo.
  perform pg_advisory_xact_lock(hashtextextended('vault_start_quiz:' || v_user_id::text, 0));

  -- Rate limit: max 100 preguntas pedidas en la última hora
  select count(*) into v_recent_count
  from public.vault_access_log
  where user_id = v_user_id
    and access_type = 'request'
    and accessed_at > now() - interval '1 hour';

  if v_recent_count + p_count > 100 then
    raise exception 'rate_limit_exceeded'
      using hint = 'Máximo 100 preguntas por hora. Esperá unos minutos y probá de nuevo.';
  end if;

  -- Selección random de preguntas activas
  select array_agg(id) into v_question_ids
  from (
    select id from public.vault_questions
    where is_active
      and (p_subject_slug is null or subject_slug = p_subject_slug)
      and module = p_module
      and (p_difficulty is null or difficulty = p_difficulty)
    order by random()
    limit p_count
  ) q;

  if v_question_ids is null or array_length(v_question_ids, 1) = 0 then
    raise exception 'no_questions_available';
  end if;

  -- Crear la sesión
  insert into public.vault_sessions (token, user_id, subject_slug, module, question_ids, expires_at)
  values (v_token, v_user_id, p_subject_slug, p_module, v_question_ids, v_expires_at);

  -- Armar el payload SIN respuesta correcta ni explicación.
  -- El cliente solo ve: posición (1..N), texto, opciones. Y el token.
  select jsonb_agg(
    jsonb_build_object(
      'position', q.idx,
      'question', d.question,
      'options', d.options
    ) order by q.idx
  )
  into v_questions
  from unnest(v_question_ids) with ordinality as q(qid, idx)
  cross join lateral private.vault_decrypt(q.qid) d;

  -- Log de access para rate limiting
  insert into public.vault_access_log (user_id, question_id, access_type, session_token)
  select v_user_id, qid, 'request', v_token from unnest(v_question_ids) as qid;

  return query select v_token, array_length(v_question_ids, 1), v_expires_at, v_questions;
end $$;

revoke all on function public.vault_start_quiz(text, text, int, smallint) from public, anon;
grant execute on function public.vault_start_quiz(text, text, int, smallint) to authenticated, service_role;


-- ─── 2. vault_submit_answer ─────────────────────────────────────────────────
alter table public.vault_sessions
  add column if not exists answered_positions int[] not null default '{}';

comment on column public.vault_sessions.answered_positions is
  'Posiciones ya respondidas, en el orden en que se respondieron. Cada una cuenta una sola vez. Va alineada con el final de answers_given: las sesiones abiertas antes de 20260911040000 tienen respuestas sin posición al principio.';

create or replace function public.vault_submit_answer(
  p_token uuid,
  p_position int,
  p_answer text
)
returns table (
  is_correct boolean,
  correct_answer text,
  explanation text,
  pedagogical_note text,
  questions_remaining int
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_session public.vault_sessions%rowtype;
  v_question_id uuid;
  v_correct text;
  v_explanation text;
  v_note text;
  v_is_correct boolean;
  v_total int;
  v_answered int;
  v_previa int;
begin
  if v_user_id is null then
    raise exception 'unauthorized';
  end if;

  -- FOR UPDATE: dos envíos simultáneos de la misma posición no cuentan doble.
  select * into v_session
  from public.vault_sessions
  where token = p_token and user_id = v_user_id
  for update;

  if v_session.token is null then raise exception 'session_not_found'; end if;

  v_total := coalesce(array_length(v_session.question_ids, 1), 0);
  if p_position is null or p_position < 1 or p_position > v_total then
    raise exception 'invalid_position';
  end if;

  v_question_id := v_session.question_ids[p_position];

  -- Descifrar SOLO los campos sensibles. La respuesta correcta nunca viajó al cliente antes.
  select d.correct_answer, d.explanation, d.pedagogical_note
  into v_correct, v_explanation, v_note
  from private.vault_decrypt(v_question_id) d;

  v_answered := coalesce(array_length(v_session.answers_given, 1), 0);
  v_previa := array_position(v_session.answered_positions, p_position);

  -- Ya respondida: lo mismo que la primera vez, sin sumar. No revela nada que
  -- el piloto no haya visto ya al responderla.
  if v_previa is not null then
    v_is_correct := lower(trim(v_session.answers_given[
      v_answered - cardinality(v_session.answered_positions) + v_previa
    ])) = lower(trim(v_correct));
    return query select v_is_correct, v_correct, v_explanation, v_note, greatest(v_total - v_answered, 0);
    return;
  end if;

  if v_session.expires_at < now() then raise exception 'session_expired'; end if;
  if v_session.completed_at is not null then raise exception 'session_completed'; end if;

  v_is_correct := lower(trim(p_answer)) = lower(trim(v_correct));

  update public.vault_sessions
  set answers_given = coalesce(answers_given, '{}') || lower(trim(p_answer)),
      answered_positions = answered_positions || p_position,
      correct_count = coalesce(correct_count, 0) + case when v_is_correct then 1 else 0 end,
      completed_at = case when v_answered + 1 >= v_total then now() else null end
  where token = p_token;

  -- Log
  insert into public.vault_access_log (user_id, question_id, access_type, session_token)
  values (v_user_id, v_question_id, 'submit', p_token);

  return query select v_is_correct, v_correct, v_explanation, v_note, greatest(v_total - (v_answered + 1), 0);
end $$;

revoke all on function public.vault_submit_answer(uuid, int, text) from public, anon;
grant execute on function public.vault_submit_answer(uuid, int, text) to authenticated, service_role;


-- ─── 3. vault_cleanup_expired_sessions ──────────────────────────────────────
create or replace function public.vault_cleanup_expired_sessions()
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_deleted int;
begin
  -- Solo las que nunca se terminaron: las terminadas son el historial.
  delete from public.vault_sessions
  where completed_at is null
    and expires_at < now() - interval '7 days';
  get diagnostics v_deleted = row_count;
  return v_deleted;
end $$;

comment on function public.vault_cleanup_expired_sessions() is
  'Borra las sesiones que nunca se terminaron y vencieron hace más de 7 días. Las terminadas no se tocan. Solo service_role.';

revoke all on function public.vault_cleanup_expired_sessions() from public, anon, authenticated;
grant execute on function public.vault_cleanup_expired_sessions() to service_role;


-- ─── 4. recalc_pilot_hours y check_and_unlock_achievements ──────────────────
create or replace function public.recalc_pilot_hours(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_total_min int;
  v_pic_min int;
begin
  -- Con sesión de usuario, solo sus propias horas. El disparador de flights
  -- pasa el user_id de la fila, que es el de quien escribe.
  if auth.uid() is not null and p_user_id is distinct from auth.uid() then
    return;
  end if;

  select
    coalesce(sum(total_minutes), 0),
    coalesce(sum(pic_minutes), 0)
  into v_total_min, v_pic_min
  from public.flights
  where user_id = p_user_id;

  update public.pilot_state
  set
    total_hours = round((v_total_min / 60.0)::numeric, 1),
    hours_pic = round((v_pic_min / 60.0)::numeric, 1),
    updated_at = now()
  where user_id = p_user_id;
end;
$$;

revoke all on function public.recalc_pilot_hours(uuid) from public, anon;
grant execute on function public.recalc_pilot_hours(uuid) to authenticated, service_role;

-- Se recrea entera sobre la versión de 20260802010000. Solo cambia la guarda.
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
  -- Con sesión de usuario, solo sobre sí mismo. Los disparadores pasan el
  -- user_id de la fila, que es el de quien escribe, y el service role no
  -- trae auth.uid(): ninguno de los dos cambia.
  if auth.uid() is not null and p_user_id is distinct from auth.uid() then return 0; end if;

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

revoke all on function public.check_and_unlock_achievements(uuid) from public, anon;
grant execute on function public.check_and_unlock_achievements(uuid) to authenticated, service_role;


-- ─── 5. user_achievements: solo `seen` ──────────────────────────────────────
revoke update on table public.user_achievements from anon, authenticated;
grant update (seen) on table public.user_achievements to authenticated;


-- ─── 6. streaks: solo lectura para el usuario ───────────────────────────────
drop policy if exists "streaks_update_own" on public.streaks;
revoke insert, update, delete on table public.streaks from anon, authenticated;


-- ─── 7. airline_prep_real_cases: is_verified no lo pone quien reporta ───────
revoke insert, update on table public.airline_prep_real_cases from anon, authenticated;
grant insert (airline_id, "position", year_month, topics_asked, questions_asked, notes,
              duration_minutes, result, reported_by_user_id, is_anonymous)
  on table public.airline_prep_real_cases to authenticated;
grant update (airline_id, "position", year_month, topics_asked, questions_asked, notes,
              duration_minutes, result, is_anonymous)
  on table public.airline_prep_real_cases to authenticated;
alter policy "airline_prep_real_cases_update_own" on public.airline_prep_real_cases
  with check (reported_by_user_id = (select auth.uid()));


-- ─── 8. esquema private ─────────────────────────────────────────────────────
revoke all on function private.get_master_key() from public, anon, authenticated, service_role;
revoke all on function private.vault_decrypt(uuid) from public, anon, authenticated, service_role;


-- ─── Consulta de control ────────────────────────────────────────────────────
-- select
--   has_function_privilege('authenticated', 'public.vault_cleanup_expired_sessions()', 'EXECUTE') as limpieza_usuario,   -- false
--   has_function_privilege('authenticated', 'private.get_master_key()', 'EXECUTE')                as llave_usuario,       -- false
--   has_column_privilege('authenticated', 'public.user_achievements', 'achievement_id', 'UPDATE')  as cambiar_logro,       -- false
--   has_column_privilege('authenticated', 'public.user_achievements', 'seen', 'UPDATE')            as marcar_visto,        -- true
--   has_table_privilege('authenticated', 'public.streaks', 'UPDATE')                              as editar_racha,        -- false
--   has_column_privilege('authenticated', 'public.airline_prep_real_cases', 'is_verified', 'INSERT') as autoverificar,    -- false
--   (select count(*) from public.vault_sessions where answered_positions <> '{}')                 as sesiones_con_posiciones;
