-- ============================================================================
-- Convocatorias: las leen los pilotos con sesión, nadie las escribe desde el
-- cliente, anon no ve nada, las revisiones están cerradas, la función manual
-- solo corre desde el editor SQL (conserva los requisitos al cerrar), la
-- llave del Vault solo la valida la función de borde y la tarea de pg_cron la
-- manda; las horas que le aplican a un piloto se eligen igual que en la app;
-- la manual guarda los números y no los pierde al cerrar; y las aerolíneas
-- nuevas están. Con 20261001030000 a 20261001060000 aplicadas.
--
-- Escribe filas de prueba y las deshace: termina en PRUEBA_DESHECHA con la
-- lista de lo verificado, o en FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid;
  x_n int;
  x_fila record;
  x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;

  -- La página de pilotos de LATAM quedó cargada, cerrada y con sus requisitos.
  select * into x_fila from public.convocatorias c
  where c.airline_id = (select id from public.airlines where code = 'LAN') and c.clave_externa = 'pagina-pilotos';
  if x_fila.id is null or x_fila.abierta or x_fila.tipo <> 'pagina' or cardinality(x_fila.requisitos) <> 8
     or x_fila.horas_minimas <> 150 or x_fila.nivel_icao <> 4 then
    raise exception 'FALLO la página de LATAM no quedó como se esperaba';
  end if;
  x_log := x_log || ' latam_cargada';

  -- Las horas que le aplican a un piloto, igual que horasQueAplican() en la app.
  if private.horas_que_aplican(150, null, null, 'Colombia', 'Colombia') <> 150
    or private.horas_que_aplican(null, 250, 1000, 'Colombia', 'Panamá') <> 1000
    or private.horas_que_aplican(null, 250, 1000, 'Panamá', 'Panama') <> 250
    or private.horas_que_aplican(null, 250, 1000, null, 'Panamá') <> 1000
    or private.horas_que_aplican(1500, 1000, null, 'Colombia', 'República Dominicana') <> 1500
    or private.horas_que_aplican(1500, 1000, null, 'República Dominicana', 'Republica Dominicana') <> 1000
    or private.horas_que_aplican(null, null, null, 'Colombia', 'Colombia') is not null then
    raise exception 'FALLO horas_que_aplican no elige como la app';
  end if;
  if has_function_privilege('authenticated', 'private.horas_que_aplican(integer, integer, integer, text, text)', 'execute') then
    raise exception 'FALLO el cliente ejecuta horas_que_aplican';
  end if;
  x_log := x_log || ' horas_como_la_app';

  -- Las aerolíneas que entraron con 20261001060000, sin mínimos nuestros.
  select count(*) into x_n from public.airlines
  where code in ('EFY', 'DWI', 'SKU', 'BOV', 'VOI', 'VIV', 'AMX', 'ARG') and requirements = '{}'::jsonb;
  if x_n <> 8 then raise exception 'FALLO faltan aerolíneas nuevas (%)', x_n; end if;
  x_log := x_log || ' aerolineas_nuevas';

  -- A mano: abre, y al cerrar sin repetir requisitos los conserva.
  perform private.convocatoria_manual('CMP', 'Primer oficial (prueba)', 'https://ejemplo.com/vacante', true,
    array['Uno', 'Dos'], 'Panamá', 'primer_oficial', 'prueba-1', p_horas => 300, p_nivel_icao => 4::smallint);
  select * into x_fila from public.convocatorias where clave_externa = 'prueba-1';
  if not x_fila.abierta or x_fila.fuente <> 'manual' or x_fila.requisitos <> array['Uno', 'Dos'] or x_fila.cerrada_en is not null
     or x_fila.horas_minimas <> 300 or x_fila.nivel_icao <> 4 then
    raise exception 'FALLO la función manual no abrió bien';
  end if;
  perform private.convocatoria_manual('CMP', 'Primer oficial (prueba)', 'https://ejemplo.com/vacante', false, p_clave => 'prueba-1');
  select * into x_fila from public.convocatorias where clave_externa = 'prueba-1';
  if x_fila.abierta or x_fila.cerrada_en is null or x_fila.requisitos <> array['Uno', 'Dos'] or x_fila.pais <> 'Panamá'
     or x_fila.horas_minimas <> 300 or x_fila.nivel_icao <> 4 then
    raise exception 'FALLO cerrar a mano perdió los requisitos, los números, el país o la fecha';
  end if;
  x_log := x_log || ' manual_abre_y_cierra';

  begin
    perform private.convocatoria_manual('XXX', 'x', 'https://ejemplo.com', true);
    raise exception 'FALLO aceptó una aerolínea que no existe';
  exception when invalid_parameter_value then x_log := x_log || ' codigo_invalido';
  end;

  begin
    insert into public.convocatorias (airline_id, clave_externa, cargo, titulo, url, fuente)
    select id, 'con espacios', 'piloto', 'x', 'https://ejemplo.com', 'manual' from public.airlines where code = 'CMP';
    raise exception 'FALLO aceptó una clave con espacios';
  exception when check_violation then x_log := x_log || ' clave_limpia';
  end;

  begin
    insert into public.convocatorias (airline_id, clave_externa, cargo, titulo, url, fuente)
    select id, 'http', 'piloto', 'x', 'http://ejemplo.com', 'manual' from public.airlines where code = 'CMP';
    raise exception 'FALLO aceptó un enlace sin https';
  exception when check_violation then x_log := x_log || ' solo_https';
  end;

  -- Un piloto con sesión lee, y nada más.
  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;

  select count(*) into x_n from public.convocatorias where clave_externa in ('prueba-1', 'pagina-pilotos');
  if x_n <> 2 then raise exception 'FALLO el piloto no ve las convocatorias (%)', x_n; end if;
  x_log := x_log || ' piloto_lee';

  begin
    insert into public.convocatorias (airline_id, clave_externa, cargo, titulo, url, fuente)
    select id, 'desde-el-cliente', 'piloto', 'x', 'https://ejemplo.com', 'manual' from public.airlines where code = 'CMP';
    raise exception 'FALLO el piloto escribe convocatorias';
  exception when insufficient_privilege then null;
  end;
  begin
    update public.convocatorias set abierta = true where clave_externa = 'prueba-1';
    raise exception 'FALLO el piloto cambia convocatorias';
  exception when insufficient_privilege then null;
  end;
  begin
    perform 1 from public.convocatorias_revisiones;
    raise exception 'FALLO el piloto lee las revisiones';
  exception when insufficient_privilege then null;
  end;
  begin
    perform private.convocatoria_manual('CMP', 'x', 'https://ejemplo.com', true);
    raise exception 'FALLO el piloto llama la función manual';
  exception when insufficient_privilege then null;
  end;
  x_log := x_log || ' cliente_no_escribe';
  reset role;

  -- Sin sesión, nada.
  if has_table_privilege('anon', 'public.convocatorias', 'select')
    or has_table_privilege('anon', 'public.convocatorias_revisiones', 'select')
    or has_table_privilege('authenticated', 'public.convocatorias_revisiones', 'select') then
    raise exception 'FALLO anon o authenticated con permisos de más';
  end if;
  x_log := x_log || ' anon_nada';

  -- La llave: la valida la base, solo para service_role, y no acepta vacío.
  if has_function_privilege('anon', 'public.convocatorias_llave_valida(text)', 'execute')
    or has_function_privilege('authenticated', 'public.convocatorias_llave_valida(text)', 'execute')
    or not has_function_privilege('service_role', 'public.convocatorias_llave_valida(text)', 'execute') then
    raise exception 'FALLO la llave la puede consultar quien no debe';
  end if;
  if public.convocatorias_llave_valida('') or public.convocatorias_llave_valida(null)
    or public.convocatorias_llave_valida('no-es-la-llave')
    or not public.convocatorias_llave_valida((select decrypted_secret from vault.decrypted_secrets where name = 'convocatorias_llave')) then
    raise exception 'FALLO la llave no se valida bien';
  end if;
  x_log := x_log || ' llave';

  -- La tarea de cada 6 horas llama a la función con la llave.
  if not exists (
    select 1 from cron.job
    where jobname = 'aviatory_convocatorias' and schedule = '17 */6 * * *'
      and command like '%/functions/v1/revisar-convocatorias%'
      and command like '%x-llave%'
  ) then
    raise exception 'FALLO falta la tarea aviatory_convocatorias con su llave';
  end if;
  x_log := x_log || ' agenda';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
