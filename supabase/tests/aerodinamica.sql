-- ============================================================================
-- Módulo Aerodinámica: progreso, catálogo, permisos, panel, logros y quiz
-- final. Migración 20260914230000.
--
-- Corre esto JUSTO DESPUÉS de aplicar la migración. Además de lo nuevo,
-- comprueba que los otros tres módulos siguen contando igual: la migración
-- reemplaza entera secciones_leidas, practicas_hechas, panel_tarjetas,
-- desbloquear_logros y evaluacion_terminar, y una función compartida mal
-- copiada se nota aquí y no en producción.
--
-- Escribe filas de prueba y las deshace: termina en PRUEBA_DESHECHA con la
-- lista de lo verificado, o en FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid; x_b uuid; x_n int; x_m int; x_r jsonb; x_log text := '';
  x_notam int; x_metar int; x_mp int;
begin
  select id into x_a from auth.users order by created_at limit 1;
  select id into x_b from auth.users order by created_at offset 1 limit 1;
  if x_a is null or x_b is null then raise exception 'FALLO hacen falta dos usuarios'; end if;

  -- ── Catálogo ──────────────────────────────────────────────────────────────
  select lecciones, cardinality(practicas) into x_n, x_m
  from public.modulos_contenido where modulo = 'aerodinamica';
  if x_n is null then raise exception 'FALLO no hay catálogo de aerodinamica'; end if;
  if x_n <> 12 or x_m <> 62 then raise exception 'FALLO catalogo aerodinamica % %', x_n, x_m; end if;
  x_log := x_log || ' catalogo_12_y_62';

  select count(*) into x_n from public.modulos_contenido
  where modulo = 'aerodinamica' and 'esc-01' = any (practicas) and 'ent-49' = any (practicas);
  if x_n <> 1 then raise exception 'FALLO faltan claves de práctica'; end if;

  -- ── Umbrales ──────────────────────────────────────────────────────────────
  select count(*) into x_n from public.module_thresholds
  where code in ('aerodinamica_lesson', 'aerodinamica_practice', 'aerodinamica_pass');
  if x_n <> 3 then raise exception 'FALLO umbrales de aerodinamica: %', x_n; end if;
  x_log := x_log || ' umbrales';

  -- ── El quiz final y su banco ──────────────────────────────────────────────
  select preguntas_por_intento, aprobacion into x_n, x_m
  from public.evaluaciones where clave = 'aerodinamica_evaluacion' and activa;
  if x_n <> 20 or x_m <> 80 then raise exception 'FALLO evaluacion % %', x_n, x_m; end if;

  select count(*) into x_n from public.banco_preguntas
  where banco = 'aerodinamica_evaluacion' and activa;
  if x_n <> 40 then raise exception 'FALLO banco de aerodinamica: %', x_n; end if;

  -- Las cuarenta declaran su sección, y están las doce: sin esto, el resultado
  -- no puede decir qué repasar.
  select count(*) into x_n from public.banco_preguntas
  where banco = 'aerodinamica_evaluacion' and activa
    and (metadatos ->> 'tema') ~ '^S(0[1-9]|1[0-2])$';
  if x_n <> 40 then raise exception 'FALLO hay preguntas sin sección válida: %', 40 - x_n; end if;
  select count(distinct metadatos ->> 'tema') into x_n from public.banco_preguntas
  where banco = 'aerodinamica_evaluacion' and activa;
  if x_n <> 12 then raise exception 'FALLO el banco cubre % secciones de 12', x_n; end if;

  -- Y la correcta está dentro del rango de opciones, en índice desde 0.
  select count(*) into x_n from public.banco_preguntas
  where banco = 'aerodinamica_evaluacion' and activa
    and (correcta < 0 or correcta >= jsonb_array_length(opciones));
  if x_n <> 0 then raise exception 'FALLO % preguntas con la correcta fuera de rango', x_n; end if;
  x_log := x_log || ' banco_40_con_seccion';

  -- ── Punto de partida conocido ─────────────────────────────────────────────
  delete from public.user_aerodinamica_progress where user_id in (x_a, x_b);
  delete from public.user_aerodinamica_exam_attempts where user_id in (x_a, x_b);
  insert into public.user_aerodinamica_progress (user_id, lesson_screens, practice_done)
  values (x_b, '{1,2,3}', '{esc-01}');

  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;

  -- ── Marcar progreso: solo lo que existe en el catálogo ────────────────────
  perform public.aerodinamica_mark_progress(1::smallint, null);
  perform public.aerodinamica_mark_progress(null, 'esc-01');
  perform public.aerodinamica_mark_progress(12::smallint, 'ent-49');
  -- Repetir no duplica: la RPC es idempotente.
  perform public.aerodinamica_mark_progress(1::smallint, 'esc-01');

  begin
    perform public.aerodinamica_mark_progress(13::smallint, null);
    raise exception 'FALLO seccion 13 aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' seccion_fuera';
  end;
  begin
    perform public.aerodinamica_mark_progress(0::smallint, null);
    raise exception 'FALLO seccion 0 aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' seccion_cero';
  end;
  begin
    perform public.aerodinamica_mark_progress(null, 'esc-99');
    raise exception 'FALLO practica inventada aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' practica_inventada';
  end;
  -- Una clave de otro módulo tampoco entra.
  begin
    perform public.aerodinamica_mark_progress(null, 'etq-reconoce');
    raise exception 'FALLO clave de mercancías aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' clave_ajena';
  end;

  select array_length(lesson_screens, 1), array_length(practice_done, 1)
  into x_n, x_m from public.user_aerodinamica_progress where user_id = x_a;
  if x_n <> 2 or x_m <> 2 then raise exception 'FALLO progreso de A: % secciones, % practicas', x_n, x_m; end if;
  x_log := x_log || ' rpc_idempotente';

  -- ── RLS: cada uno ve lo suyo ──────────────────────────────────────────────
  select count(*) into x_n from public.user_aerodinamica_progress;
  if x_n <> 1 then raise exception 'FALLO A ve % filas de progreso', x_n; end if;
  select count(*) into x_n from public.user_aerodinamica_progress where user_id = x_b;
  if x_n <> 0 then raise exception 'FALLO A ve el progreso de B'; end if;
  x_log := x_log || ' rls_progreso';

  -- Escribir directo no se puede: para eso está la RPC, que valida.
  begin
    insert into public.user_aerodinamica_progress (user_id, lesson_screens) values (x_a, '{9}');
    raise exception 'FALLO insert directo aceptado';
  exception when insufficient_privilege then x_log := x_log || ' sin_insert_directo';
  end;
  begin
    insert into public.user_aerodinamica_exam_attempts (user_id, score, correct, total)
    values (x_a, 100, 20, 20);
    raise exception 'FALLO insert directo de intento aceptado';
  exception when insufficient_privilege then x_log := x_log || ' sin_intento_a_mano';
  end;

  reset role;

  -- ── Conteos: el módulo nuevo y los tres de siempre ────────────────────────
  if private.secciones_leidas(x_a, 'aerodinamica') <> 2 then
    raise exception 'FALLO secciones_leidas aerodinamica';
  end if;
  if private.practicas_hechas(x_a, 'aerodinamica') <> 2 then
    raise exception 'FALLO practicas_hechas aerodinamica';
  end if;
  -- B tiene tres secciones y una práctica, y A no las ve como suyas.
  if private.secciones_leidas(x_b, 'aerodinamica') <> 3 then
    raise exception 'FALLO secciones_leidas de B';
  end if;
  x_log := x_log || ' conteos';

  -- Las funciones compartidas se reemplazaron enteras: que los otros módulos
  -- sigan contando lo suyo es lo que dice si la copia salió bien.
  x_notam := private.secciones_leidas(x_b, 'notam');
  x_metar := private.secciones_leidas(x_b, 'metar');
  x_mp := private.secciones_leidas(x_b, 'mercancias');
  if x_notam is null or x_metar is null or x_mp is null then
    raise exception 'FALLO un módulo viejo dejó de contar';
  end if;
  if private.secciones_leidas(x_b, 'inventado') <> 0 then
    raise exception 'FALLO un módulo que no existe cuenta algo';
  end if;
  x_log := x_log || ' modulos_viejos_intactos';

  -- ── Panel ─────────────────────────────────────────────────────────────────
  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;
  x_r := public.panel_tarjetas();
  reset role;

  if x_r -> 'aerodinamica' is null then raise exception 'FALLO el panel no trae aerodinamica'; end if;
  if (x_r -> 'aerodinamica' ->> 'lecciones')::int <> 2 then
    raise exception 'FALLO el panel dice % lecciones', x_r -> 'aerodinamica' ->> 'lecciones';
  end if;
  if (x_r -> 'aerodinamica' ->> 'practicas')::int <> 2 then
    raise exception 'FALLO el panel dice % practicas', x_r -> 'aerodinamica' ->> 'practicas';
  end if;
  if x_r -> 'aerodinamica' ->> 'mejor' is not null then
    raise exception 'FALLO el panel inventa un mejor puntaje';
  end if;
  -- Y los tres de antes siguen ahí.
  if x_r -> 'notam' is null or x_r -> 'metar' is null or x_r -> 'mercancias' is null then
    raise exception 'FALLO el panel perdió un módulo';
  end if;
  x_log := x_log || ' panel_cuatro_modulos';

  -- ── Logros ────────────────────────────────────────────────────────────────
  select count(*) into x_n from public.achievements
  where code in ('aerodinamica_lesson', 'aerodinamica_practice', 'aerodinamica_exam', 'aerodinamica_master');
  if x_n <> 4 then raise exception 'FALLO logros de aerodinamica: %', x_n; end if;

  -- El grupo tiene que existir: un grupo desconocido levanta excepción dentro
  -- del disparador y rompería el marcado de progreso.
  perform private.desbloquear_logros(x_a, 'aerodinamica');
  perform private.desbloquear_logros(x_a, 'mercancias');
  perform private.desbloquear_logros(x_a, 'notam');
  perform private.desbloquear_logros(x_a, 'metar');
  perform private.desbloquear_logros(x_a, 'aerolinea');

  -- Con las doce secciones y las 62 prácticas, se gana el de lección y el de
  -- práctica; sin quiz aprobado, no el de módulo dominado.
  delete from public.user_achievements
  where user_id = x_a and achievement_id in (
    select id from public.achievements where code like 'aerodinamica%'
  );
  update public.user_aerodinamica_progress
  set lesson_screens = (select array_agg(i::smallint) from generate_series(1, 12) i),
      practice_done = (select array_agg(clave) from (
        select 'esc-' || lpad(i::text, 2, '0') as clave from generate_series(1, 13) i
        union all
        select 'ent-' || lpad(i::text, 2, '0') from generate_series(1, 49) i
      ) c)
  where user_id = x_a;

  select count(*) into x_n from public.user_achievements ua
  join public.achievements a on a.id = ua.achievement_id
  where ua.user_id = x_a and a.code in ('aerodinamica_lesson', 'aerodinamica_practice');
  if x_n <> 2 then raise exception 'FALLO lección y práctica no desbloquearon: %', x_n; end if;

  select count(*) into x_n from public.user_achievements ua
  join public.achievements a on a.id = ua.achievement_id
  where ua.user_id = x_a and a.code = 'aerodinamica_master';
  if x_n <> 0 then raise exception 'FALLO módulo dominado sin aprobar el quiz'; end if;
  x_log := x_log || ' logros_leccion_y_practica';

  -- Y con un intento aprobado, los cuatro.
  insert into public.user_aerodinamica_exam_attempts (user_id, score, correct, total)
  values (x_a, 85, 17, 20);

  select count(*) into x_n from public.user_achievements ua
  join public.achievements a on a.id = ua.achievement_id
  where ua.user_id = x_a and a.code like 'aerodinamica%';
  if x_n <> 4 then raise exception 'FALLO con el quiz aprobado hay % logros de 4', x_n; end if;
  x_log := x_log || ' logros_los_cuatro';

  -- Un intento por debajo del umbral no habría bastado.
  if 79 >= (select total from public.module_thresholds where code = 'aerodinamica_pass') then
    raise exception 'FALLO el umbral de aprobación no es 80';
  end if;

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
