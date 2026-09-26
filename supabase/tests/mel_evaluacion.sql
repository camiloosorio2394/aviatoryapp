-- ============================================================================
-- Evaluación del módulo MEL. Migración 20261001010000.
--
-- Corre esto DESPUÉS de aplicar las tres migraciones de MEL (20261001000000,
-- 20261001010000 y 20261001020000) y de sembrar el banco con
-- supabase/seeds/mel_evaluacion.sql (la salida de
--   node scripts/bancos/sembrar.mjs mel_evaluacion).
-- Sin el banco cargado falla en el conteo de preguntas, que es lo que se quiere:
-- una evaluación sin banco se cae en el primer intento de un piloto.
--
-- Comprueba las reglas (25 de 70, aprueba con 80, corrección al final, un solo
-- banco, lección exigida), que el banco esté completo y bien formado, que la
-- tabla de intentos nazca cerrada, que evaluacion_terminar siga sabiendo
-- enrutar a los otros once módulos y al simulacro, y que secciones_leidas
-- siga contando los de antes: la migración reemplaza las dos enteras y una
-- copia mal hecha se nota aquí y no en producción.
--
-- ESCRITA SIN BASE DONDE CORRERLA (25-sep-2026): sigue línea por línea la de
-- Comunicaciones. Si falla por algo que no sea una regla (un nombre, un tipo),
-- es la prueba la que hay que corregir.
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
  from public.evaluaciones where clave = 'mel_evaluacion' and activa;
  if x_n is null then raise exception 'FALLO no existe la evaluación de mel'; end if;
  if x_n <> 25 or x_m <> 80 then raise exception 'FALLO reglas % %', x_n, x_m; end if;
  if x_t <> 'al_final' then raise exception 'FALLO la corrección se ve %', x_t; end if;
  if not x_b then raise exception 'FALLO las opciones no se barajan'; end if;
  x_log := x_log || ' reglas_25_de_70_y_80';

  -- El destino manda el intento a la tabla del módulo, y la lección completa
  -- la exige el servidor desde esta misma migración. La puerta en sí se prueba
  -- en supabase/tests/mel.sql.
  select destino into x_t from public.evaluaciones where clave = 'mel_evaluacion';
  if x_t <> 'mel' then raise exception 'FALLO destino %', x_t; end if;
  select count(*) into x_n from public.evaluaciones
  where clave = 'mel_evaluacion' and modulo_leccion = 'mel';
  if x_n <> 1 then raise exception 'FALLO la evaluación no exige la lección de mel'; end if;
  if (select total from public.module_thresholds where code = 'mel_pass') is distinct from 80 then
    raise exception 'FALLO el umbral de aprobación no es 80';
  end if;
  x_log := x_log || ' destino_y_leccion_gobernada';

  -- ── De qué banco sale ─────────────────────────────────────────────────────
  select count(*) into x_n from public.evaluacion_fuentes
  where evaluacion = 'mel_evaluacion';
  if x_n <> 1 then raise exception 'FALLO la evaluación sale de % bancos', x_n; end if;
  select count(*) into x_n from public.evaluacion_fuentes
  where evaluacion = 'mel_evaluacion' and banco = 'mel_evaluacion'
    and etiqueta is null and cupo is null;
  if x_n <> 1 then raise exception 'FALLO la fuente no es el banco de mel sin cupo'; end if;
  x_log := x_log || ' un_solo_banco_sin_cupo';

  -- ── El banco ──────────────────────────────────────────────────────────────
  select count(*) into x_n from public.banco_preguntas
  where banco = 'mel_evaluacion' and activa;
  if x_n <> 70 then raise exception 'FALLO el banco tiene % preguntas activas', x_n; end if;

  -- Cuatro opciones y la correcta dentro del rango, en índice desde 0.
  select count(*) into x_n from public.banco_preguntas
  where banco = 'mel_evaluacion' and activa
    and (jsonb_array_length(opciones) <> 4
      or correcta < 0 or correcta >= jsonb_array_length(opciones));
  if x_n <> 0 then raise exception 'FALLO % preguntas mal formadas', x_n; end if;

  -- Todas explican. Una evaluación que corrige sin explicar no enseña nada.
  select count(*) into x_n from public.banco_preguntas
  where banco = 'mel_evaluacion' and activa and coalesce(explicacion, '') = '';
  if x_n <> 0 then raise exception 'FALLO % preguntas sin explicación', x_n; end if;
  x_log := x_log || ' banco_70_bien_formado';

  -- El reparto por nivel, con más peso en leer una entrada, del defecto al
  -- despacho e impacto operacional: 8, 22, 18, 16 y 6, como lo trae
  -- contenido/bancos/mel_evaluacion.json. Cada pregunta dice su capítulo de
  -- la especificación (1 a 40; no es el número de lección, ver
  -- docs/MEL_ESTADO.md).
  select count(*) into x_n from public.banco_preguntas
  where banco = 'mel_evaluacion' and activa
    and (metadatos ->> 'nivel') ~ '^[1-5]$'
    and (metadatos ->> 'capitulo') ~ '^[0-9]+$'
    and (metadatos ->> 'capitulo')::int between 1 and 40;
  if x_n <> 70 then raise exception 'FALLO % preguntas sin nivel o capítulo válidos', 70 - x_n; end if;

  select count(*) into x_n from (
    select metadatos ->> 'nivel' as nivel, count(*) as cuantas
    from public.banco_preguntas
    where banco = 'mel_evaluacion' and activa
    group by 1
  ) as por_nivel
  where (nivel, cuantas::int) in
    (('1', 8), ('2', 22), ('3', 18), ('4', 16), ('5', 6));
  if x_n <> 5 then raise exception 'FALLO el reparto por nivel no es 8/22/18/16/6'; end if;
  x_log := x_log || ' reparto_por_nivel';

  -- ── La tabla de intentos nace cerrada ─────────────────────────────────────
  select relrowsecurity into x_b from pg_class
  where oid = 'public.user_mel_exam_attempts'::regclass;
  if not coalesce(x_b, false) then raise exception 'FALLO la tabla de intentos sin RLS'; end if;

  select count(*) into x_n from information_schema.role_table_grants
  where table_schema = 'public' and table_name = 'user_mel_exam_attempts'
    and grantee = 'anon';
  if x_n <> 0 then raise exception 'FALLO anon tiene % permisos sobre los intentos', x_n; end if;

  select count(*) into x_n from information_schema.role_table_grants
  where table_schema = 'public' and table_name = 'user_mel_exam_attempts'
    and grantee = 'authenticated' and privilege_type <> 'SELECT';
  if x_n <> 0 then raise exception 'FALLO authenticated puede algo más que leer'; end if;
  x_log := x_log || ' intentos_cerrados';

  -- Y el piloto no se escribe su propio puntaje.
  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;
  begin
    insert into public.user_mel_exam_attempts (user_id, score, correct, total)
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
      'user_aeropuertos_exam_attempts', 'user_performance_exam_attempts',
      'user_comunicaciones_exam_attempts', 'user_rac_exam_attempts',
      'user_combustible_exam_attempts', 'user_rvsm_exam_attempts',
      'user_pbn_exam_attempts', 'user_mel_exam_attempts',
      'user_airline_mock_attempts'
    ]) as tabla
  ) as t
  where pg_get_functiondef('public.evaluacion_terminar(uuid)'::regprocedure) like '%' || t.tabla || '%';
  if x_n <> 13 then raise exception 'FALLO evaluacion_terminar solo enruta % destinos de 13', x_n; end if;

  -- Y el CHECK de destino los admite a todos.
  select pg_get_constraintdef(oid) into x_t from pg_constraint
  where conname = 'evaluaciones_destino_check' and conrelid = 'public.evaluaciones'::regclass;
  if x_t not like '%''mel''%' or x_t not like '%comunicaciones%' or x_t not like '%performance%'
     or x_t not like '%aeropuertos%' or x_t not like '%aerodinamica%'
     or x_t not like '%''rac''%' or x_t not like '%combustible%'
     or x_t not like '%rvsm%' or x_t not like '%''pbn''%'
     or x_t not like '%simulacro_aerolinea%' then
    raise exception 'FALLO el CHECK de destino dice %', x_t;
  end if;
  x_log := x_log || ' terminar_enruta_los_trece';

  -- ── secciones_leidas sigue contando todos los módulos ─────────────────────
  -- También se reemplaza entera. Cada tabla de progreso tiene que seguir
  -- nombrada en ella.
  select count(*) into x_n from (
    select unnest(array[
      'user_notam_progress', 'user_metar_progress', 'user_mercancias_progress',
      'user_aerodinamica_progress', 'user_aeropuertos_progress', 'user_performance_progress',
      'user_comunicaciones_progress', 'user_rac_progress', 'user_combustible_progress',
      'user_rvsm_progress', 'user_pbn_progress', 'user_mel_progress'
    ]) as tabla
  ) as t
  where pg_get_functiondef('private.secciones_leidas(uuid, text)'::regprocedure) like '%' || t.tabla || '%';
  if x_n <> 12 then raise exception 'FALLO secciones_leidas solo cuenta % módulos de 12', x_n; end if;
  if private.secciones_leidas(x_a, 'inventado') <> 0 then
    raise exception 'FALLO un módulo que no existe cuenta algo';
  end if;
  x_log := x_log || ' secciones_leidas_los_doce';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
