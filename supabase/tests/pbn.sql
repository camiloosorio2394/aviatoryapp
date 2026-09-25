-- ============================================================================
-- Módulo PBN: catálogo, evaluación y banco, permisos, progreso, puerta de la
-- evaluación, conteos, panel y logros. Migración 20260929120000_modulo_pbn.
--
-- Corre esto con la migración aplicada y el banco sembrado: la puerta abre una
-- evaluación de verdad y la termina. Comprueba que el catálogo trae sus 48
-- lecciones y claves con la forma que da el conversor, las reglas de la
-- evaluación (20 al azar de 66, 80 para aprobar, corrección al final, un solo
-- banco, lección exigida), que el banco esté completo y cada pregunta tenga su
-- tema, que la RPC valida contra el catálogo y no duplica, que cada piloto ve
-- solo lo suyo, que nadie escribe las tablas directo ni sin sesión, la puerta
-- (47 de 48 no abre), que el intento llega a su tabla y los cuatro logros. Al
-- final, que los módulos de antes siguen contando y que el panel los trae todos.
--
-- Es el recorrido de supabase/tests/rvsm.sql con los números de PBN. Si falla por algo que no sea una regla (un nombre, un tipo), es la
-- prueba la que hay que corregir.
--
-- No borra filas: el punto de partida se fija con upsert y todo lo escrito se
-- deshace. Termina en PRUEBA_DESHECHA con la lista de lo verificado, o en
-- FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid; x_b_user uuid; x_n int; x_m int; x_r jsonb; x_t text; x_b boolean;
  x_log text := ''; x_i int; x_sesion uuid; x_master_antes boolean; x_practicas text[];
begin
  select id into x_a from auth.users order by created_at limit 1;
  select id into x_b_user from auth.users order by created_at offset 1 limit 1;
  if x_a is null or x_b_user is null then raise exception 'FALLO hacen falta dos usuarios'; end if;

  -- Dos evaluaciones abren en esta prueba: con ocho o más sesiones de A en la
  -- última hora, evaluacion_iniciar diría demasiados_intentos y no sería la regla.
  select count(*) into x_n from public.evaluacion_sesiones
  where user_id = x_a and iniciada_en > now() - interval '1 hour';
  if x_n > 8 then raise exception 'FALLO A abrió % evaluaciones en la última hora: espera y repite', x_n; end if;

  -- ════════════════════════════════════════════════════════════════════════
  -- PBN (48 lecciones, 144 prácticas, banco de 66)
  -- ════════════════════════════════════════════════════════════════════════

  -- ── Catálogo y umbrales ───────────────────────────────────────────────────
  select lecciones, cardinality(practicas), practicas into x_n, x_m, x_practicas
  from public.modulos_contenido where modulo = 'pbn';
  if x_n is null then raise exception 'FALLO no hay catálogo de pbn'; end if;
  -- El número lo manda contenido/catalogo/modulos.json (144 hoy); aquí
  -- basta con que las lecciones sean 48, que haya práctica y que todas las
  -- claves salgan del conversor: «p28-q1», capítulo y número.
  if x_n <> 48 or x_m < 1 then raise exception 'FALLO catalogo pbn % %', x_n, x_m; end if;
  if exists (select 1 from unnest(x_practicas) p where p !~ '^p[0-9]{2}-q[0-9]$') then
    raise exception 'FALLO hay claves de práctica de pbn con otra forma';
  end if;
  if (select total from public.module_thresholds where code = 'pbn_lesson') is distinct from 48 then
    raise exception 'FALLO el umbral de lección de pbn no es 48';
  end if;
  if (select total from public.module_thresholds where code = 'pbn_pass') is distinct from 80 then
    raise exception 'FALLO el umbral de aprobación de pbn no es 80';
  end if;
  x_log := x_log || ' pbn:catalogo_48_y_umbrales';

  -- ── La evaluación: 20 al azar, 80 para aprobar, corrección al final ──────
  select preguntas_por_intento, aprobacion, retroalimentacion, barajar_opciones
  into x_n, x_m, x_t, x_b
  from public.evaluaciones
  where clave = 'pbn_evaluacion' and activa and destino = 'pbn' and modulo_leccion = 'pbn';
  if x_n is null then raise exception 'FALLO no existe la evaluación de pbn con su destino y su lección'; end if;
  if x_n <> 20 or x_m <> 80 or x_t <> 'al_final' or not x_b then
    raise exception 'FALLO reglas de pbn: % % % %', x_n, x_m, x_t, x_b;
  end if;
  select count(*) into x_n from public.evaluacion_fuentes
  where evaluacion = 'pbn_evaluacion';
  select count(*) into x_m from public.evaluacion_fuentes
  where evaluacion = 'pbn_evaluacion' and banco = 'pbn_evaluacion' and etiqueta is null and cupo is null;
  if x_n <> 1 or x_m <> 1 then raise exception 'FALLO pbn no sale de su banco solo, sin cupo'; end if;
  x_log := x_log || ' pbn:reglas_20_y_80';

  -- ── El banco (contenido/bancos/pbn_evaluacion.json) ───────────────────────
  select count(*) into x_n from public.banco_preguntas
  where banco = 'pbn_evaluacion' and activa;
  if x_n <> 66 then raise exception 'FALLO el banco de pbn tiene % preguntas activas', x_n; end if;
  select count(*) into x_n from public.banco_preguntas
  where banco = 'pbn_evaluacion' and activa
    and (jsonb_array_length(opciones) <> 4
      or correcta < 0 or correcta >= jsonb_array_length(opciones)
      or coalesce(explicacion, '') = ''
      or case when coalesce(metadatos ->> 'tema', '') ~ '^P[0-9]{2}$'
              then substr(metadatos ->> 'tema', 2)::int not between 1 and 48
              else true end);
  if x_n <> 0 then raise exception 'FALLO % preguntas de pbn mal formadas o sin tema', x_n; end if;
  x_log := x_log || ' pbn:banco_66_bien_formado';

  -- ── Permisos: lectura para authenticated, nada para anon, RLS encendida ──
  if not (select relrowsecurity from pg_class where oid = 'public.user_pbn_progress'::regclass)
     or not (select relrowsecurity from pg_class where oid = 'public.user_pbn_exam_attempts'::regclass) then
    raise exception 'FALLO una tabla de pbn no tiene RLS';
  end if;
  if has_table_privilege('anon', 'public.user_pbn_progress', 'select')
     or has_table_privilege('authenticated', 'public.user_pbn_progress', 'insert')
     or has_table_privilege('authenticated', 'public.user_pbn_progress', 'update')
     or has_table_privilege('authenticated', 'public.user_pbn_progress', 'delete')
     or not has_table_privilege('authenticated', 'public.user_pbn_progress', 'select') then
    raise exception 'FALLO permisos de user_pbn_progress';
  end if;
  if has_table_privilege('anon', 'public.user_pbn_exam_attempts', 'select')
     or has_table_privilege('authenticated', 'public.user_pbn_exam_attempts', 'insert')
     or has_table_privilege('authenticated', 'public.user_pbn_exam_attempts', 'update')
     or has_table_privilege('authenticated', 'public.user_pbn_exam_attempts', 'delete')
     or not has_table_privilege('authenticated', 'public.user_pbn_exam_attempts', 'select') then
    raise exception 'FALLO permisos de user_pbn_exam_attempts';
  end if;
  if has_function_privilege('anon', 'public.pbn_mark_progress(smallint, text)', 'execute')
     or not has_function_privilege('authenticated', 'public.pbn_mark_progress(smallint, text)', 'execute') then
    raise exception 'FALLO permisos de pbn_mark_progress';
  end if;
  select count(*) into x_n from pg_proc p
  where p.oid = 'public.pbn_mark_progress(smallint, text)'::regprocedure
    and p.prosecdef and p.proconfig @> array['search_path=""'];
  if x_n <> 1 then raise exception 'FALLO pbn_mark_progress no es security definer con search_path vacío'; end if;
  x_log := x_log || ' pbn:permisos';

  -- ── Punto de partida conocido, sin borrar ────────────────────────────────
  insert into public.user_pbn_progress (user_id, lesson_screens, practice_done)
  values (x_a, '{}', '{}')
  on conflict (user_id) do update set lesson_screens = '{}', practice_done = '{}';
  insert into public.user_pbn_progress (user_id, lesson_screens, practice_done)
  values (x_b_user, '{1,2,3}', array[x_practicas[1]])
  on conflict (user_id) do update set lesson_screens = '{1,2,3}', practice_done = array[x_practicas[1]];

  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;

  -- ── Marcar progreso: solo lo que existe en el catálogo ────────────────────
  perform public.pbn_mark_progress(1::smallint, null);
  perform public.pbn_mark_progress(null, x_practicas[1]);
  perform public.pbn_mark_progress(48::smallint, x_practicas[cardinality(x_practicas)]);
  -- Repetir no duplica.
  perform public.pbn_mark_progress(1::smallint, x_practicas[1]);

  begin
    perform public.pbn_mark_progress((48 + 1)::smallint, null);
    raise exception 'FALLO pbn aceptó la lección 48 + 1';
  exception when invalid_parameter_value then x_log := x_log || ' pbn:leccion_fuera';
  end;
  begin
    perform public.pbn_mark_progress(0::smallint, null);
    raise exception 'FALLO pbn aceptó la lección 0';
  exception when invalid_parameter_value then x_log := x_log || ' pbn:leccion_cero';
  end;
  -- Una clave que no está en el catálogo no entra; tampoco la del otro módulo.
  begin
    perform public.pbn_mark_progress(null, 'p99-q9-inventada');
    raise exception 'FALLO pbn aceptó una práctica inventada';
  exception when invalid_parameter_value then x_log := x_log || ' pbn:practica_inventada';
  end;
  begin
    perform public.pbn_mark_progress(null, 'r01-q1');
    raise exception 'FALLO pbn aceptó una clave de otro módulo';
  exception when invalid_parameter_value then x_log := x_log || ' pbn:clave_ajena';
  end;

  select array_length(lesson_screens, 1), coalesce(array_length(practice_done, 1), 0)
  into x_n, x_m from public.user_pbn_progress where user_id = x_a;
  if x_n <> 2 or x_m <> 2 then
    raise exception 'FALLO progreso de A en pbn: % lecciones, % prácticas', x_n, x_m;
  end if;
  x_log := x_log || ' pbn:rpc_idempotente';

  -- ── RLS: cada uno ve lo suyo, y nadie escribe directo ────────────────────
  select count(*) into x_n from public.user_pbn_progress where user_id <> x_a;
  if x_n <> 0 then raise exception 'FALLO A ve % filas de progreso ajenas en pbn', x_n; end if;
  select count(*) into x_n from public.user_pbn_progress where user_id = x_a;
  if x_n <> 1 then raise exception 'FALLO A no ve su progreso de pbn'; end if;
  begin
    update public.user_pbn_progress
    set lesson_screens = (select array_agg(i::smallint) from generate_series(1, 48) i)
    where user_id = x_a;
    raise exception 'FALLO update directo aceptado en pbn';
  exception when insufficient_privilege then x_log := x_log || ' pbn:sin_update_directo';
  end;
  begin
    insert into public.user_pbn_exam_attempts (user_id, score, correct, total)
    values (x_a, 100, 20, 20);
    raise exception 'FALLO intento de pbn escrito a mano';
  exception when insufficient_privilege then x_log := x_log || ' pbn:sin_intento_a_mano';
  end;

  -- ── La puerta: sin las 48 lecciones en la base no abre ─────────────────────
  -- A ya tiene la 1 y la 48; con 2 a 46 son 47 de 48.
  for x_i in 2..46 loop
    perform public.pbn_mark_progress(x_i::smallint, null);
  end loop;
  begin
    perform public.evaluacion_iniciar('pbn_evaluacion');
    raise exception 'FALLO pbn abrió con 47 lecciones';
  exception when others then if sqlerrm <> 'leccion_incompleta' then raise; end if;
  end;
  x_log := x_log || ' pbn:puerta_cerrada_con_47';

  perform public.pbn_mark_progress(51::smallint, null);
  x_r := public.evaluacion_iniciar('pbn_evaluacion');
  x_sesion := (x_r ->> 'sesion')::uuid;
  if x_sesion is null then raise exception 'FALLO la evaluación de pbn no devolvió sesión: %', x_r; end if;
  if jsonb_array_length(x_r -> 'preguntas') <> 20 then
    raise exception 'FALLO el intento de pbn trae % preguntas', jsonb_array_length(x_r -> 'preguntas');
  end if;
  if exists (select 1 from jsonb_array_elements(x_r -> 'preguntas') e
             where e ? 'correcta' or e ? 'explicacion') then
    raise exception 'FALLO el intento de pbn entrega la corrección al abrir';
  end if;
  x_log := x_log || ' pbn:puerta_abierta_con_48';

  -- Terminar escribe en la tabla del módulo, con la corrección solo de lo
  -- respondido.
  perform public.evaluacion_responder(x_sesion, 1, 0);
  x_r := public.evaluacion_terminar(x_sesion);
  if (x_r -> 'revision' -> 0 ->> 'explicacion') is null then
    raise exception 'FALLO respondida sin corrección en pbn';
  end if;
  select count(*) into x_n from jsonb_array_elements(x_r -> 'revision') e
  where (e ->> 'posicion')::int > 1 and (e ? 'explicacion') and e ->> 'explicacion' is not null;
  if x_n <> 0 then raise exception 'FALLO % sin responder de pbn traen explicación', x_n; end if;
  select count(*) into x_n from public.user_pbn_exam_attempts where user_id = x_a;
  if x_n < 1 then raise exception 'FALLO el intento no llegó a user_pbn_exam_attempts'; end if;
  x_log := x_log || ' pbn:terminar_escribe_en_su_tabla';

  reset role;

  -- Sin sesión, la RPC no escribe.
  perform set_config('request.jwt.claims', '', true);
  begin
    perform public.pbn_mark_progress(2::smallint, null);
    raise exception 'FALLO pbn marcó sin sesión';
  exception when others then
    if sqlerrm <> 'no authenticated user' then raise; end if;
    x_log := x_log || ' pbn:sin_sesion';
  end;

  -- ── Conteos compartidos ───────────────────────────────────────────────────
  if private.secciones_leidas(x_a, 'pbn') <> 48 then
    raise exception 'FALLO secciones_leidas pbn: %', private.secciones_leidas(x_a, 'pbn');
  end if;
  if private.practicas_hechas(x_a, 'pbn') <> 2 then
    raise exception 'FALLO practicas_hechas pbn: %', private.practicas_hechas(x_a, 'pbn');
  end if;
  if private.secciones_leidas(x_b_user, 'pbn') <> 3 then
    raise exception 'FALLO secciones_leidas de B en pbn';
  end if;
  x_log := x_log || ' pbn:conteos';

  -- ── Logros: la lección, la práctica y, con un aprobado, los cuatro ───────
  select count(*) into x_n from public.achievements
  where code in ('pbn_lesson', 'pbn_practice', 'pbn_exam', 'pbn_master');
  if x_n <> 4 then raise exception 'FALLO logros de pbn: %', x_n; end if;
  select count(*) into x_n from pg_trigger
  where tgname in ('trg_check_achievements_pbn', 'trg_check_achievements_pbn_exam')
    and not tgisinternal;
  if x_n <> 2 then raise exception 'FALLO faltan disparadores de logros de pbn: %', x_n; end if;

  -- Las 48 lecciones ya desbloquearon el de lección (por el disparador de la RPC).
  if not exists (select 1 from public.user_achievements ua join public.achievements a on a.id = ua.achievement_id
                 where ua.user_id = x_a and a.code = 'pbn_lesson') then
    raise exception 'FALLO la lección completa de pbn no desbloqueó su logro';
  end if;

  select exists (
    select 1 from public.user_achievements ua join public.achievements a on a.id = ua.achievement_id
    where ua.user_id = x_a and a.code = 'pbn_master'
  ) into x_master_antes;
  update public.user_pbn_progress set practice_done = x_practicas where user_id = x_a;
  if not exists (select 1 from public.user_achievements ua join public.achievements a on a.id = ua.achievement_id
                 where ua.user_id = x_a and a.code = 'pbn_practice') then
    raise exception 'FALLO la práctica completa de pbn no desbloqueó su logro';
  end if;
  if not x_master_antes and not exists (
    select 1 from public.user_pbn_exam_attempts where user_id = x_a and score >= 80
  ) and exists (
    select 1 from public.user_achievements ua join public.achievements a on a.id = ua.achievement_id
    where ua.user_id = x_a and a.code = 'pbn_master'
  ) then
    raise exception 'FALLO pbn dominado sin aprobar la evaluación';
  end if;

  insert into public.user_pbn_exam_attempts (user_id, score, correct, total)
  values (x_a, 85, 17, 20);
  select count(*) into x_n from public.user_achievements ua
  join public.achievements a on a.id = ua.achievement_id
  where ua.user_id = x_a and a.code in ('pbn_lesson', 'pbn_practice', 'pbn_exam', 'pbn_master');
  if x_n <> 4 then raise exception 'FALLO con la evaluación de pbn aprobada hay % logros de 4', x_n; end if;
  x_log := x_log || ' pbn:logros_los_cuatro';

  -- ════════════════════════════════════════════════════════════════════════
  -- LO COMPARTIDO
  -- ════════════════════════════════════════════════════════════════════════

  -- ── Los otros módulos siguen en su catálogo y contando ────────────────────
  select count(*) into x_n from public.modulos_contenido
  where modulo in ('notam', 'metar', 'mercancias', 'aerodinamica', 'aeropuertos', 'performance', 'comunicaciones', 'rac', 'combustible', 'rvsm');
  if x_n <> 10 then raise exception 'FALLO un módulo de antes perdió su catálogo: %', x_n; end if;
  if private.secciones_leidas(x_b_user, 'notam') is null or private.secciones_leidas(x_b_user, 'metar') is null
     or private.secciones_leidas(x_b_user, 'mercancias') is null or private.secciones_leidas(x_b_user, 'aerodinamica') is null
     or private.secciones_leidas(x_b_user, 'aeropuertos') is null or private.secciones_leidas(x_b_user, 'comunicaciones') is null
     or private.secciones_leidas(x_b_user, 'performance') is null
     or private.practicas_hechas(x_b_user, 'aeropuertos') is null or private.practicas_hechas(x_b_user, 'comunicaciones') is null then
    raise exception 'FALLO un módulo de antes dejó de contar';
  end if;
  if private.practicas_hechas(x_b_user, 'inventado') <> 0 then
    raise exception 'FALLO un módulo que no existe cuenta algo';
  end if;
  x_log := x_log || ' modulos_de_antes';

  -- evaluacion_terminar sigue enrutando a los destinos de antes.
  x_t := pg_get_functiondef('public.evaluacion_terminar(uuid)'::regprocedure);
  if x_t not like '%user_comunicaciones_exam_attempts%' or x_t not like '%user_aeropuertos_exam_attempts%'
     or x_t not like '%user_performance_exam_attempts%'
     or x_t not like '%user_rac_exam_attempts%' or x_t not like '%user_combustible_exam_attempts%'
     or x_t not like '%user_rvsm_exam_attempts%' or x_t not like '%user_pbn_exam_attempts%' then
    raise exception 'FALLO evaluacion_terminar perdió un destino';
  end if;
  x_log := x_log || ' terminar_enruta_a_todos';

  -- ── Panel: los once módulos, el plan y las postulaciones ──────────────────
  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;
  x_r := public.panel_tarjetas();
  reset role;

  if (x_r -> 'pbn' ->> 'lecciones')::int <> 48 or x_r -> 'pbn' ->> 'mejor' is null then
    raise exception 'FALLO el panel dice de pbn: %', x_r -> 'pbn';
  end if;
  if x_r -> 'notam' is null or x_r -> 'metar' is null or x_r -> 'mercancias' is null
     or x_r -> 'aerodinamica' is null or x_r -> 'aeropuertos' is null or x_r -> 'comunicaciones' is null
     or x_r -> 'performance' is null or x_r -> 'rac' is null or x_r -> 'combustible' is null
     or x_r -> 'rvsm' is null then
    raise exception 'FALLO el panel perdió un módulo';
  end if;
  if not (x_r ? 'plan') or jsonb_typeof(x_r -> 'postulaciones') <> 'array' then
    raise exception 'FALLO el panel perdió el plan o las postulaciones';
  end if;
  x_log := x_log || ' panel_con_los_once';

  -- ── Los grupos de logros ──────────────────────────────────────────────────
  x_t := pg_get_functiondef('public.check_and_unlock_achievements(uuid)'::regprocedure);
  if x_t not like '%''pbn''%' or x_t not like '%''rvsm''%' or x_t not like '%''rac''%' or x_t not like '%''combustible''%'
     or x_t not like '%''comunicaciones''%' or x_t not like '%''aeropuertos''%' then
    raise exception 'FALLO check_and_unlock_achievements no repasa todos los módulos';
  end if;
  perform private.desbloquear_logros(x_a, 'pbn');
  perform private.desbloquear_logros(x_a, 'rvsm');
  perform private.desbloquear_logros(x_a, 'rac');
  perform private.desbloquear_logros(x_a, 'combustible');
  perform private.desbloquear_logros(x_a, 'comunicaciones');
  perform private.desbloquear_logros(x_a, 'performance');
  perform private.desbloquear_logros(x_a, 'aeropuertos');
  perform private.desbloquear_logros(x_a, 'aerodinamica');
  perform private.desbloquear_logros(x_a, 'mercancias');
  perform private.desbloquear_logros(x_a, 'notam');
  perform private.desbloquear_logros(x_a, 'metar');
  perform private.desbloquear_logros(x_a, 'aerolinea');
  x_log := x_log || ' grupos_de_logros';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
