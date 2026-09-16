-- ============================================================================
-- Evaluación del módulo Aeropuertos. Migración 20260915230000.
--
-- Corre esto JUSTO DESPUÉS de aplicar la migración y de sembrar el banco con
--   node scripts/bancos/sembrar.mjs aeropuertos_evaluacion
-- Sin el banco cargado falla en el conteo de preguntas, que es lo que se quiere:
-- una evaluación sin banco se cae en el primer intento de un piloto.
--
-- Comprueba las reglas (25 de 60, aprueba con 80, corrección al final, un solo
-- banco), que el banco esté completo y bien formado, que la tabla de intentos
-- nazca cerrada y que evaluacion_terminar siga sabiendo enrutar a los otros
-- módulos: la migración la reemplaza entera y una copia mal hecha se nota aquí
-- y no en producción.
--
-- No escribe nada: solo lee e intenta una escritura que tiene que fallar.
-- Termina en PRUEBA_DESHECHA con la lista de lo verificado, o en FALLO.
-- Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid; x_n int; x_m int; x_t text; x_b boolean; x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;
  if x_a is null then raise exception 'FALLO hace falta un usuario'; end if;

  -- ── Las reglas ────────────────────────────────────────────────────────────
  select preguntas_por_intento, aprobacion, retroalimentacion, barajar_opciones
  into x_n, x_m, x_t, x_b
  from public.evaluaciones where clave = 'aeropuertos_evaluacion' and activa;
  if x_n is null then raise exception 'FALLO no existe la evaluación de aeropuertos'; end if;
  if x_n <> 25 or x_m <> 80 then raise exception 'FALLO reglas % %', x_n, x_m; end if;
  if x_t <> 'al_final' then raise exception 'FALLO la corrección se ve %', x_t; end if;
  if not x_b then raise exception 'FALLO las opciones no se barajan'; end if;
  x_log := x_log || ' reglas_25_de_60_y_80';

  -- El destino manda el intento a la tabla del módulo, y la lección todavía no
  -- se exige en el servidor porque el módulo no tiene tabla de progreso.
  select destino into x_t from public.evaluaciones where clave = 'aeropuertos_evaluacion';
  if x_t <> 'aeropuertos' then raise exception 'FALLO destino %', x_t; end if;
  select count(*) into x_n from public.evaluaciones
  where clave = 'aeropuertos_evaluacion' and modulo_leccion is null;
  if x_n <> 1 then raise exception 'FALLO modulo_leccion no está en null'; end if;
  x_log := x_log || ' destino_y_leccion_sin_gobernar';

  -- ── De qué banco sale ─────────────────────────────────────────────────────
  select count(*) into x_n from public.evaluacion_fuentes
  where evaluacion = 'aeropuertos_evaluacion';
  if x_n <> 1 then raise exception 'FALLO la evaluación sale de % bancos', x_n; end if;
  select count(*) into x_n from public.evaluacion_fuentes
  where evaluacion = 'aeropuertos_evaluacion' and banco = 'aeropuertos_evaluacion'
    and etiqueta is null and cupo is null;
  if x_n <> 1 then raise exception 'FALLO la fuente no es el banco de aeropuertos sin cupo'; end if;
  x_log := x_log || ' un_solo_banco_sin_cupo';

  -- ── El banco ──────────────────────────────────────────────────────────────
  select count(*) into x_n from public.banco_preguntas
  where banco = 'aeropuertos_evaluacion' and activa;
  if x_n <> 60 then raise exception 'FALLO el banco tiene % preguntas activas', x_n; end if;

  -- Cuatro opciones y la correcta dentro del rango, en índice desde 0.
  select count(*) into x_n from public.banco_preguntas
  where banco = 'aeropuertos_evaluacion' and activa
    and (jsonb_array_length(opciones) <> 4
      or correcta < 0 or correcta >= jsonb_array_length(opciones));
  if x_n <> 0 then raise exception 'FALLO % preguntas mal formadas', x_n; end if;

  -- Todas explican. Una evaluación que corrige sin explicar no enseña nada.
  select count(*) into x_n from public.banco_preguntas
  where banco = 'aeropuertos_evaluacion' and activa and coalesce(explicacion, '') = '';
  if x_n <> 0 then raise exception 'FALLO % preguntas sin explicación', x_n; end if;
  x_log := x_log || ' banco_60_bien_formado';

  -- El reparto por nivel, que es lo que hace que un intento de 25 al azar toque
  -- los cinco: 11, 11, 11, 14 y 13, en proporción al peso de cada nivel.
  select count(*) into x_n from public.banco_preguntas
  where banco = 'aeropuertos_evaluacion' and activa
    and (metadatos ->> 'nivel') ~ '^[1-5]$'
    and (metadatos ->> 'leccion')::int between 1 and 22;
  if x_n <> 60 then raise exception 'FALLO % preguntas sin nivel o lección válidos', 60 - x_n; end if;

  select count(*) into x_n from (
    select metadatos ->> 'nivel' as nivel, count(*) as cuantas
    from public.banco_preguntas
    where banco = 'aeropuertos_evaluacion' and activa
    group by 1
  ) as por_nivel
  where (nivel, cuantas::int) in (('1', 11), ('2', 11), ('3', 11), ('4', 14), ('5', 13));
  if x_n <> 5 then raise exception 'FALLO el reparto por nivel no es 11/11/11/14/13'; end if;
  x_log := x_log || ' reparto_por_nivel';

  -- ── La tabla de intentos nace cerrada ─────────────────────────────────────
  select relrowsecurity into x_b from pg_class
  where oid = 'public.user_aeropuertos_exam_attempts'::regclass;
  if not coalesce(x_b, false) then raise exception 'FALLO la tabla de intentos sin RLS'; end if;

  select count(*) into x_n from information_schema.role_table_grants
  where table_schema = 'public' and table_name = 'user_aeropuertos_exam_attempts'
    and grantee = 'anon';
  if x_n <> 0 then raise exception 'FALLO anon tiene % permisos sobre los intentos', x_n; end if;

  select count(*) into x_n from information_schema.role_table_grants
  where table_schema = 'public' and table_name = 'user_aeropuertos_exam_attempts'
    and grantee = 'authenticated' and privilege_type <> 'SELECT';
  if x_n <> 0 then raise exception 'FALLO authenticated puede algo más que leer'; end if;
  x_log := x_log || ' intentos_cerrados';

  -- Y el piloto no se escribe su propio puntaje.
  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;
  begin
    insert into public.user_aeropuertos_exam_attempts (user_id, score, correct, total)
    values (x_a, 100, 25, 25);
    raise exception 'FALLO intento escrito a mano';
  exception when insufficient_privilege then x_log := x_log || ' sin_intento_a_mano';
  end;
  reset role;

  -- ── evaluacion_terminar sigue sabiendo enrutar a todos ────────────────────
  -- La migración la reemplaza entera: si al copiarla se perdió una rama, el
  -- CASE se cae al terminar un intento de ese otro módulo.
  select count(*) into x_n from (
    select unnest(array[
      'user_notam_exam_attempts', 'user_metar_exam_attempts',
      'user_mercancias_exam_attempts', 'user_aerodinamica_exam_attempts',
      'user_aeropuertos_exam_attempts', 'user_airline_mock_attempts'
    ]) as tabla
  ) as t
  where pg_get_functiondef('public.evaluacion_terminar(uuid)'::regprocedure) like '%' || t.tabla || '%';
  if x_n <> 6 then raise exception 'FALLO evaluacion_terminar solo enruta % destinos de 6', x_n; end if;

  -- Y el CHECK de destino los admite a todos.
  select pg_get_constraintdef(oid) into x_t from pg_constraint
  where conname = 'evaluaciones_destino_check' and conrelid = 'public.evaluaciones'::regclass;
  if x_t not like '%aeropuertos%' or x_t not like '%aerodinamica%' or x_t not like '%simulacro_aerolinea%' then
    raise exception 'FALLO el CHECK de destino dice %', x_t;
  end if;
  x_log := x_log || ' terminar_enruta_los_seis';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
