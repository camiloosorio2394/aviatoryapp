-- ============================================================================
-- Quiz de inglés ICAO: la corrección la hace el servidor.
--
-- icao_quiz_questions se leía entera desde el navegador, con correct_answer y
-- explanation, y el navegador decidía si la respuesta estaba bien e insertaba
-- el intento en user_icao_quiz_attempts (lo que cuenta como avance del quiz).
--
-- icao_quiz_responder corrige, guarda el intento y devuelve si acertó, la
-- opción correcta y la explicación. Tope: 600 respuestas por hora por piloto,
-- holgado para quien estudia y suficiente para frenar a quien recorre el banco
-- o llena la tabla. El test inicial usa la misma función para su parte de
-- lectura ICAO, así que esas respuestas también cuentan como práctica.
--
-- Esta migración solo agrega la función. Quitarle al cliente la clave y la
-- escritura de intentos va en 20260911193000, que se aplica cuando la app
-- publicada ya corrige por aquí.
-- ============================================================================

create or replace function public.icao_quiz_responder(p_pregunta bigint, p_respuesta text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_pregunta public.icao_quiz_questions%rowtype;
  v_correcta boolean;
begin
  if v_user is null then
    raise exception 'sin_sesion' using errcode = '42501';
  end if;

  select * into v_pregunta from public.icao_quiz_questions where id = p_pregunta and is_active;
  if not found then
    raise exception 'pregunta_no_encontrada' using errcode = 'P0001';
  end if;
  if p_respuesta is null or not (v_pregunta.options ? p_respuesta) then
    raise exception 'opcion_invalida' using errcode = '22023';
  end if;

  -- El candado serializa las respuestas del mismo piloto: sin él, varias en
  -- paralelo leerían el mismo conteo y pasarían el tope juntas.
  perform pg_advisory_xact_lock(hashtextextended('icao_quiz:' || v_user::text, 0));
  if (
    select count(*) from public.user_icao_quiz_attempts a
    where a.user_id = v_user and a.attempted_at > now() - interval '1 hour'
  ) >= 600 then
    raise exception 'demasiados_intentos' using errcode = 'P0001';
  end if;

  v_correcta := p_respuesta = v_pregunta.correct_answer;
  insert into public.user_icao_quiz_attempts (user_id, question_id, answer, is_correct)
  values (v_user, v_pregunta.id, p_respuesta, v_correcta);

  return jsonb_build_object(
    'correcta', v_correcta,
    'respuesta_correcta', v_pregunta.correct_answer,
    'explicacion', v_pregunta.explanation
  );
end;
$$;

revoke all on function public.icao_quiz_responder(bigint, text) from public, anon;
grant execute on function public.icao_quiz_responder(bigint, text) to authenticated;
