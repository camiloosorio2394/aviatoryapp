-- ============================================================================
-- Psicotécnicas: el reloj lo lleva el servidor y aplazar no regala tiempo.
--
-- Escribe filas de prueba y las deshace: termina en PRUEBA_DESHECHA con la
-- lista de lo verificado, o en FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid;
  x_sesion uuid;
  x_r jsonb;
  x_n int;
  x_limite int;
  x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;
  delete from public.psico_sesiones where user_id = x_a;

  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;

  -- Una tanda de evaluación: el servidor sortea y pone los límites.
  x_r := public.psico_iniciar('evaluacion', 'todas', 'todos', 3);
  x_sesion := (x_r ->> 'sesion')::uuid;
  if jsonb_array_length(x_r -> 'ejercicios') <> 3 then raise exception 'FALLO la tanda no trae 3 ejercicios'; end if;
  if exists (
    select 1 from jsonb_array_elements(x_r -> 'ejercicios') e
    where e ? 'respuesta' or e ? 'explicacion' or e ? 'correcta'
  ) then
    raise exception 'FALLO la tanda trae la respuesta';
  end if;
  x_log := x_log || ' tanda_sin_respuestas';
  reset role;

  -- Diez segundos en el ejercicio 1 y se aplaza: el tiempo queda guardado.
  update public.psico_sesiones set reloj_desde = now() - interval '10 seconds' where id = x_sesion;
  set local role authenticated;
  perform public.psico_aplazar(x_sesion, 1);
  reset role;
  select coalesce((acumulado ->> '1')::int, -1) into x_n from public.psico_sesiones where id = x_sesion;
  if x_n < 9 or x_n > 12 then raise exception 'FALLO aplazar no acumuló el tiempo: %', x_n; end if;
  x_log := x_log || ' aplazar_acumula';

  -- Se vuelve al 1 y se responde tres segundos después: cuenta lo acumulado.
  update public.psico_sesiones set reloj_desde = now() - interval '3 seconds' where id = x_sesion;
  set local role authenticated;
  x_r := public.psico_responder(x_sesion, 1, 0, null);
  reset role;
  if (x_r ->> 'segundos')::int < 12 then
    raise exception 'FALLO responder tras aplazar contó solo %, no lo acumulado', x_r ->> 'segundos';
  end if;
  x_log := x_log || ' responder_suma_lo_aplazado';

  -- Aplazar muchas veces tampoco borra el reloj.
  select limites[2] into x_limite from public.psico_sesiones where id = x_sesion;
  for x_n in 1..5 loop
    update public.psico_sesiones set reloj_desde = now() - make_interval(secs => x_limite) where id = x_sesion;
    set local role authenticated;
    perform public.psico_aplazar(x_sesion, 2);
    reset role;
  end loop;
  set local role authenticated;
  x_r := public.psico_responder(x_sesion, 2, 0, null);
  reset role;
  if (x_r -> 'opcion') <> 'null'::jsonb then
    raise exception 'FALLO con el tiempo agotado la respuesta contó igual: %', x_r;
  end if;
  x_log := x_log || ' tiempo_agotado_no_cuenta';

  -- La evaluación no corrige al momento.
  if x_r ? 'respuesta' or x_r ? 'explicacion' or x_r ? 'correcta' then
    raise exception 'FALLO la evaluación corrigió al momento: %', x_r;
  end if;
  x_log := x_log || ' sin_correccion_inmediata';

  -- Lo que el piloto no puede tocar por su cuenta.
  set local role authenticated;
  begin
    perform 1 from public.psico_sesiones where id = x_sesion;
    raise exception 'FALLO el cliente lee psico_sesiones';
  exception when insufficient_privilege then null;
  end;
  begin
    perform 1 from public.banco_preguntas limit 1;
    raise exception 'FALLO el cliente lee el banco';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.psico_aplazar(x_sesion, 99);
    raise exception 'FALLO aceptó una posición inventada';
  exception when invalid_parameter_value then null;
  end;
  reset role;
  x_log := x_log || ' banco_y_sesion_cerrados';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
