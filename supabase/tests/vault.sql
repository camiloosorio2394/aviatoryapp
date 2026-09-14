-- ============================================================================
-- Bóveda (PCA): el banco va cifrado y la respuesta solo sale al responder.
--
-- Escribe filas de prueba y las deshace: termina en PRUEBA_DESHECHA con la
-- lista de lo verificado, o en FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid;
  x_b uuid;
  x_token uuid;
  x_total int;
  x_q jsonb;
  x_correcta text;
  x_n int;
  x_qid uuid;
  x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;
  select id into x_b from auth.users where id <> x_a order by created_at limit 1;
  if x_b is null then raise exception 'FALLO hace falta un segundo usuario para la prueba'; end if;

  -- El tope por hora se mide sobre este log; se limpia para que la prueba no
  -- dependa de lo que el piloto haya hecho hoy.
  delete from public.vault_access_log where user_id = x_a;

  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;

  select v.token, v.question_count, v.questions into x_token, x_total, x_q
  from public.vault_start_quiz(null, 'pca', 3, null) v;

  if x_total <> 3 or jsonb_array_length(x_q) <> 3 then
    raise exception 'FALLO la tanda no trae 3 preguntas: % / %', x_total, x_q;
  end if;
  x_log := x_log || ' tanda_del_tamano_pedido';

  -- Lo que viaja al cliente es enunciado y opciones. Nada más.
  if exists (
    select 1 from jsonb_array_elements(x_q) e
    where e ? 'correct_answer' or e ? 'explanation' or e ? 'answer' or e ? 'pedagogical_note'
  ) then
    raise exception 'FALLO la tanda viaja con la respuesta: %', x_q;
  end if;
  x_log := x_log || ' tanda_sin_respuestas';

  -- El tamaño lo acota el servidor, no la pantalla.
  begin
    perform public.vault_start_quiz(null, 'pca', 0, null);
    raise exception 'FALLO aceptó pedir 0 preguntas';
  exception when raise_exception then
    if sqlerrm <> 'invalid_count' then raise; end if;
  end;
  begin
    perform public.vault_start_quiz(null, 'pca', 21, null);
    raise exception 'FALLO aceptó pedir 21 preguntas';
  exception when raise_exception then
    if sqlerrm <> 'invalid_count' then raise; end if;
  end;
  begin
    perform public.vault_start_quiz(null, 'pca', null, null);
    raise exception 'FALLO aceptó pedir null preguntas';
  exception when raise_exception then
    if sqlerrm <> 'invalid_count' then raise; end if;
  end;
  x_log := x_log || ' tamano_acotado';

  begin
    perform 1 from public.vault_questions limit 1;
    raise exception 'FALLO el cliente lee el banco cifrado';
  exception when insufficient_privilege then null;
  end;
  x_log := x_log || ' banco_cerrado';

  begin
    perform public.vault_submit_answer(x_token, 0, 'x');
    raise exception 'FALLO aceptó la posición 0';
  exception when raise_exception then
    if sqlerrm <> 'invalid_position' then raise; end if;
  end;
  begin
    perform public.vault_submit_answer(x_token, 99, 'x');
    raise exception 'FALLO aceptó una posición fuera de la tanda';
  exception when raise_exception then
    if sqlerrm <> 'invalid_position' then raise; end if;
  end;
  x_log := x_log || ' posicion_acotada';

  -- Responder sí corrige: ahí es donde aparece la respuesta, y no antes.
  select s.correct_answer into x_correcta from public.vault_submit_answer(x_token, 1, 'respuesta-inventada') s;
  if x_correcta is null then raise exception 'FALLO responder no devolvió la correcta'; end if;
  x_log := x_log || ' responder_corrige';
  reset role;

  select correct_count into x_n from public.vault_sessions where token = x_token;
  if x_n <> 0 then raise exception 'FALLO una respuesta mala sumó: %', x_n; end if;

  -- Reenviar la misma posición no vuelve a sumar.
  set local role authenticated;
  perform public.vault_submit_answer(x_token, 2, x_correcta);
  perform public.vault_submit_answer(x_token, 2, x_correcta);
  perform public.vault_submit_answer(x_token, 2, x_correcta);
  reset role;
  select correct_count into x_n from public.vault_sessions where token = x_token;
  if x_n > 1 then raise exception 'FALLO repetir la misma posición sumó de más: %', x_n; end if;
  x_log := x_log || ' repetir_no_suma';

  -- La tanda es de quien la pidió.
  perform set_config('request.jwt.claims', json_build_object('sub', x_b, 'role', 'authenticated')::text, true);
  set local role authenticated;
  begin
    perform public.vault_submit_answer(x_token, 1, 'x');
    raise exception 'FALLO otro piloto respondió una tanda ajena';
  exception when raise_exception then
    if sqlerrm <> 'session_not_found' then raise; end if;
  end;
  reset role;
  x_log := x_log || ' tanda_ajena_cerrada';

  -- Cien preguntas pedidas en la hora y se acabó: es lo único que separa el
  -- banco de un raspado automático, así que vale una prueba.
  select id into x_qid from public.vault_questions where is_active limit 1;
  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  insert into public.vault_access_log (user_id, question_id, access_type, session_token)
  select x_a, x_qid, 'request', x_token from generate_series(1, 100);
  set local role authenticated;
  begin
    perform public.vault_start_quiz(null, 'pca', 1, null);
    raise exception 'FALLO el tope por hora no frenó nada';
  exception when raise_exception then
    if sqlerrm <> 'rate_limit_exceeded' then raise; end if;
  end;
  reset role;
  x_log := x_log || ' tope_por_hora';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
