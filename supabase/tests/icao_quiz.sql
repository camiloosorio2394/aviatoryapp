-- ============================================================================
-- Quiz ICAO: la corrección la hace el servidor, que guarda el intento y aplica
-- un tope. Migraciones 20260911190000 y 20260911193000.
--
-- Escribe filas de prueba y las deshace: termina en PRUEBA_DESHECHA con la
-- lista de lo verificado, o en FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid;
  x_q public.icao_quiz_questions%rowtype;
  x_mala text;
  x_r jsonb;
  x_antes int;
  x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;
  select * into x_q from public.icao_quiz_questions where is_active order by id limit 1;
  select k into x_mala from jsonb_object_keys(x_q.options) as k where k <> x_q.correct_answer limit 1;
  delete from public.user_icao_quiz_attempts where user_id = x_a and attempted_at > now() - interval '1 hour';
  select count(*) into x_antes from public.user_icao_quiz_attempts where user_id = x_a;

  -- Sin sesión no corrige.
  perform set_config('request.jwt.claims', '', true);
  begin
    perform public.icao_quiz_responder(x_q.id, x_q.correct_answer);
    raise exception 'FALLO corrigió sin sesión';
  exception when insufficient_privilege then x_log := x_log || ' sin_sesion';
  end;

  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;

  -- Corrige y entrega la explicación de lo que se respondió.
  x_r := public.icao_quiz_responder(x_q.id, x_q.correct_answer);
  if not (x_r ->> 'correcta')::boolean or x_r ->> 'respuesta_correcta' <> x_q.correct_answer then
    raise exception 'FALLO respuesta correcta mal corregida %', x_r;
  end if;
  x_r := public.icao_quiz_responder(x_q.id, x_mala);
  if (x_r ->> 'correcta')::boolean then raise exception 'FALLO respuesta mala aceptada'; end if;
  x_log := x_log || ' corrige';

  -- Solo opciones y preguntas que existen.
  begin
    perform public.icao_quiz_responder(x_q.id, 'Z-no-existe');
    raise exception 'FALLO opción inventada aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' opcion_invalida';
  end;
  begin
    perform public.icao_quiz_responder(-1, 'A');
    raise exception 'FALLO pregunta inventada aceptada';
  exception when others then if sqlerrm <> 'pregunta_no_encontrada' then raise; end if;
  end;
  x_log := x_log || ' pregunta_invalida';

  -- El intento lo guarda la función; el cliente no escribe la tabla.
  reset role;
  if (select count(*) from public.user_icao_quiz_attempts where user_id = x_a) <> x_antes + 2 then
    raise exception 'FALLO no guardó los dos intentos';
  end if;
  set local role authenticated;
  begin
    insert into public.user_icao_quiz_attempts (user_id, question_id, answer, is_correct)
    values (x_a, x_q.id, x_q.correct_answer, true);
    raise exception 'FALLO el cliente escribió un intento';
  exception when insufficient_privilege then x_log := x_log || ' intentos_solo_servidor';
  end;

  -- Tope: 600 respuestas por hora.
  reset role;
  insert into public.user_icao_quiz_attempts (user_id, question_id, answer, is_correct)
  select x_a, x_q.id, x_q.correct_answer, true from generate_series(1, 598);
  set local role authenticated;
  begin
    perform public.icao_quiz_responder(x_q.id, x_q.correct_answer);
    raise exception 'FALLO pasó el tope de 600';
  exception when others then if sqlerrm <> 'demasiados_intentos' then raise; end if;
  end;
  x_log := x_log || ' tope_600';
  reset role;

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
