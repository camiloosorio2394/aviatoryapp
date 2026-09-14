-- ============================================================================
-- Wingman: el cupo lo cuenta la base, por conversación y por mes.
--
-- El costo del tutor sale de acá: si el cupo se contara en la pantalla o por
-- mensaje en vez de por conversación, la factura de Anthropic la pondría el
-- usuario. Escribe filas de prueba y las deshace: termina en PRUEBA_DESHECHA
-- con la lista de lo verificado, o en FALLO. Cómo se corre:
-- supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid;
  x_b uuid;
  x_estado jsonb;
  x_antes int;
  x_conv1 uuid := gen_random_uuid();
  x_conv2 uuid := gen_random_uuid();
  x_n int;
  x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;
  select id into x_b from auth.users where id <> x_a order by created_at limit 1;

  -- Sin sesión no hay estado: el cupo no se le pregunta a un desconocido.
  perform set_config('request.jwt.claims', '', true);
  set local role authenticated;
  begin
    perform public.wingman_estado();
    raise exception 'FALLO contestó sin sesión';
  exception when insufficient_privilege then null;
  end;
  reset role;
  x_log := x_log || ' sin_sesion_no_contesta';

  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;
  x_estado := public.wingman_estado();
  reset role;

  if (x_estado ->> 'limite')::int <> 5 then
    raise exception 'FALLO el límite gratis cambió sin actualizar la prueba: %', x_estado;
  end if;
  if jsonb_typeof(x_estado -> 'pro') <> 'boolean' or jsonb_typeof(x_estado -> 'usadas') <> 'number' then
    raise exception 'FALLO el estado no tiene la forma esperada: %', x_estado;
  end if;
  x_antes := (x_estado ->> 'usadas')::int;
  x_log := x_log || ' estado_con_limite_y_plan';

  -- Dos conversaciones nuevas cuentan una vez cada una, no una por mensaje.
  insert into public.ai_interactions (user_id, conversation_id, kind, role, content)
  values
    (x_a, x_conv1, 'wingman', 'user', 'hola'),
    (x_a, x_conv1, 'wingman', 'assistant', 'hola piloto'),
    (x_a, x_conv1, 'wingman', 'user', 'otra más'),
    (x_a, x_conv2, 'wingman', 'user', 'segunda conversación');

  set local role authenticated;
  x_estado := public.wingman_estado();
  reset role;
  if (x_estado ->> 'usadas')::int <> x_antes + 2 then
    raise exception 'FALLO contó mal las conversaciones: antes % ahora %', x_antes, x_estado ->> 'usadas';
  end if;
  x_log := x_log || ' cuenta_conversaciones_no_mensajes';

  -- Lo que falló no se le cobra al piloto, y lo del mes pasado ya no cuenta.
  insert into public.ai_interactions (user_id, conversation_id, kind, role, content, failed)
  values (x_a, gen_random_uuid(), 'wingman', 'user', 'se cayó', true);
  insert into public.ai_interactions (user_id, conversation_id, kind, role, content, created_at)
  values (x_a, gen_random_uuid(), 'wingman', 'user', 'del mes pasado',
          date_trunc('month', now() at time zone 'America/Bogota') - interval '2 days');

  set local role authenticated;
  x_estado := public.wingman_estado();
  reset role;
  if (x_estado ->> 'usadas')::int <> x_antes + 2 then
    raise exception 'FALLO contó lo fallido o lo del mes pasado: %', x_estado;
  end if;
  x_log := x_log || ' fallidas_y_mes_pasado_no_cuentan';

  -- El historial es de cada quien.
  if x_b is not null then
    perform set_config('request.jwt.claims', json_build_object('sub', x_b, 'role', 'authenticated')::text, true);
    set local role authenticated;
    select count(*) into x_n from public.ai_interactions where user_id = x_a;
    reset role;
    if x_n <> 0 then raise exception 'FALLO otro piloto lee el historial ajeno: % filas', x_n; end if;
    x_log := x_log || ' historial_ajeno_cerrado';
  end if;

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
