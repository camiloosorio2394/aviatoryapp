-- ============================================================================
-- Módulo Comunicaciones ATC: progreso, catálogo, permisos, puerta de la
-- evaluación, panel y logros. Migraciones 20260925000000, 20260925010000 y
-- 20260925020000.
--
-- Corre esto con las tres migraciones aplicadas, el catálogo de la práctica
-- cargado (node scripts/catalogo/sembrar.mjs comunicaciones) y el banco
-- sembrado (supabase/seeds/comunicaciones_evaluacion.sql): la puerta abre una
-- evaluación de verdad y la termina. Comprueba que la RPC valida contra el
-- catálogo (69 lecciones y las claves de práctica de contenido/catalogo),
-- que repetir no duplica, que cada piloto ve solo lo suyo, que nadie escribe
-- las tablas directo, que anon no tiene nada, la puerta (68 lecciones no
-- abren, 69 sí), que el intento llega a su tabla, que los otros módulos
-- siguen contando, que el panel no perdió nada y los cuatro logros. Es el
-- recorrido de supabase/tests/aeropuertos.sql.
--
-- ESCRITA SIN BASE DONDE CORRERLA (24-sep-2026): la parte del progreso es la
-- de antes; lo demás sigue línea por línea la prueba de Aeropuertos, que sí se
-- corrió en la réplica. Si falla por algo que no sea una regla (un nombre, un
-- tipo), es la prueba la que hay que corregir.
--
-- No borra filas: el punto de partida se fija con upsert y todo lo escrito se
-- deshace. Termina en PRUEBA_DESHECHA con la lista de lo verificado, o en
-- FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid; x_b uuid; x_n int; x_m int; x_r jsonb; x_t text; x_log text := '';
  x_i int; x_sesion uuid; x_master_antes boolean; x_practicas text[];
begin
  select id into x_a from auth.users order by created_at limit 1;
  select id into x_b from auth.users order by created_at offset 1 limit 1;
  if x_a is null or x_b is null then raise exception 'FALLO hacen falta dos usuarios'; end if;

  -- ── Catálogo y umbral ─────────────────────────────────────────────────────
  select lecciones, cardinality(practicas), practicas into x_n, x_m, x_practicas
  from public.modulos_contenido where modulo = 'comunicaciones';
  if x_n is null then raise exception 'FALLO no hay catálogo de comunicaciones'; end if;
  -- Las claves las carga `node scripts/catalogo/sembrar.mjs comunicaciones`
  -- (sin eso falla aquí, que es lo que se quiere). El número lo manda
  -- contenido/catalogo/modulos.json; aquí basta con que haya y con que todas
  -- sean de este módulo (claveEjercicioCm).
  if x_n <> 69 or x_m < 1 then raise exception 'FALLO catalogo comunicaciones % %', x_n, x_m; end if;
  if exists (select 1 from unnest(x_practicas) p where p !~ '^cm-[A-Za-z]+-') then
    raise exception 'FALLO hay claves de práctica que no salen de claveEjercicioCm';
  end if;
  x_log := x_log || ' catalogo_69_y_practica';

  if (select total from public.module_thresholds where code = 'comunicaciones_lesson') is distinct from 69 then
    raise exception 'FALLO el umbral de lección no es 69';
  end if;
  if (select total from public.module_thresholds where code = 'comunicaciones_pass') is distinct from 80 then
    raise exception 'FALLO el umbral de aprobación no es 80';
  end if;
  x_log := x_log || ' umbrales';

  -- ── Permisos: lectura para authenticated, nada para anon, RLS encendida ──
  if not (select relrowsecurity from pg_class where oid = 'public.user_comunicaciones_progress'::regclass) then
    raise exception 'FALLO la tabla no tiene RLS';
  end if;
  if has_table_privilege('anon', 'public.user_comunicaciones_progress', 'select')
     or has_table_privilege('authenticated', 'public.user_comunicaciones_progress', 'insert')
     or has_table_privilege('authenticated', 'public.user_comunicaciones_progress', 'update')
     or has_table_privilege('authenticated', 'public.user_comunicaciones_progress', 'delete')
     or not has_table_privilege('authenticated', 'public.user_comunicaciones_progress', 'select') then
    raise exception 'FALLO permisos de la tabla';
  end if;
  if has_function_privilege('anon', 'public.comunicaciones_mark_progress(smallint, text)', 'execute')
     or not has_function_privilege('authenticated', 'public.comunicaciones_mark_progress(smallint, text)', 'execute') then
    raise exception 'FALLO permisos de la RPC';
  end if;
  select count(*) into x_n from pg_proc p
  where p.oid = 'public.comunicaciones_mark_progress(smallint, text)'::regprocedure
    and p.prosecdef and p.proconfig @> array['search_path=""'];
  if x_n <> 1 then raise exception 'FALLO la RPC no es security definer con search_path vacío'; end if;
  x_log := x_log || ' permisos';

  -- ── Punto de partida conocido, sin borrar ────────────────────────────────
  insert into public.user_comunicaciones_progress (user_id, lesson_screens, practice_done)
  values (x_a, '{}', '{}')
  on conflict (user_id) do update set lesson_screens = '{}', practice_done = '{}';
  insert into public.user_comunicaciones_progress (user_id, lesson_screens, practice_done)
  values (x_b, '{1,2,3}', array[x_practicas[1]])
  on conflict (user_id) do update set lesson_screens = '{1,2,3}', practice_done = array[x_practicas[1]];

  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;

  -- ── Marcar progreso: solo lo que existe en el catálogo ────────────────────
  perform public.comunicaciones_mark_progress(1::smallint, null);
  perform public.comunicaciones_mark_progress(null, x_practicas[1]);
  perform public.comunicaciones_mark_progress(69::smallint, x_practicas[x_m]);
  -- Repetir no duplica.
  perform public.comunicaciones_mark_progress(1::smallint, x_practicas[1]);

  begin
    perform public.comunicaciones_mark_progress(70::smallint, null);
    raise exception 'FALLO leccion 70 aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' leccion_fuera';
  end;
  begin
    perform public.comunicaciones_mark_progress(0::smallint, null);
    raise exception 'FALLO leccion 0 aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' leccion_cero';
  end;
  -- Una clave que no está en el catálogo no entra; tampoco una de otro módulo.
  begin
    perform public.comunicaciones_mark_progress(null, 'cm-copia-inventada');
    raise exception 'FALLO practica inventada aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' practica_inventada';
  end;
  begin
    perform public.comunicaciones_mark_progress(null, 'ap-rec-r01');
    raise exception 'FALLO clave de aeropuertos aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' clave_ajena';
  end;

  select array_length(lesson_screens, 1), coalesce(array_length(practice_done, 1), 0)
  into x_n, x_m from public.user_comunicaciones_progress where user_id = x_a;
  if x_n <> 2 or x_m <> (case when cardinality(x_practicas) = 1 then 1 else 2 end) then
    raise exception 'FALLO progreso de A: % lecciones, % practicas', x_n, x_m;
  end if;
  x_log := x_log || ' rpc_idempotente';

  -- ── RLS: cada uno ve lo suyo, y nadie escribe directo ────────────────────
  select count(*) into x_n from public.user_comunicaciones_progress where user_id <> x_a;
  if x_n <> 0 then raise exception 'FALLO A ve % filas de progreso ajenas', x_n; end if;
  select count(*) into x_n from public.user_comunicaciones_progress where user_id = x_a;
  if x_n <> 1 then raise exception 'FALLO A no ve su progreso'; end if;
  x_log := x_log || ' rls_progreso';

  begin
    update public.user_comunicaciones_progress
    set lesson_screens = (select array_agg(i::smallint) from generate_series(1, 69) i)
    where user_id = x_a;
    raise exception 'FALLO update directo aceptado';
  exception when insufficient_privilege then x_log := x_log || ' sin_update_directo';
  end;
  begin
    insert into public.user_comunicaciones_progress (user_id, lesson_screens)
    values (x_b, '{1}');
    raise exception 'FALLO insert directo aceptado';
  exception when insufficient_privilege then x_log := x_log || ' sin_insert_directo';
  end;
  begin
    insert into public.user_comunicaciones_exam_attempts (user_id, score, correct, total)
    values (x_a, 100, 25, 25);
    raise exception 'FALLO intento escrito a mano';
  exception when insufficient_privilege then x_log := x_log || ' sin_intento_a_mano';
  end;

  -- ── La puerta: sin las 69 lecciones en la base no abre ────────────────────
  -- A ya tiene la 1 y la 69; con 2 a 67 son 68 de 69.
  for x_i in 2..67 loop
    perform public.comunicaciones_mark_progress(x_i::smallint, null);
  end loop;
  begin
    perform public.evaluacion_iniciar('comunicaciones_evaluacion');
    raise exception 'FALLO abrio con 68 lecciones';
  exception when others then if sqlerrm <> 'leccion_incompleta' then raise; end if;
  end;
  x_log := x_log || ' puerta_cerrada_con_68';

  perform public.comunicaciones_mark_progress(68::smallint, null);
  x_r := public.evaluacion_iniciar('comunicaciones_evaluacion');
  x_sesion := (x_r ->> 'sesion')::uuid;
  if x_sesion is null then raise exception 'FALLO la evaluación no devolvió sesión: %', x_r; end if;
  if jsonb_array_length(x_r -> 'preguntas') <> 25 then
    raise exception 'FALLO el intento trae % preguntas', jsonb_array_length(x_r -> 'preguntas');
  end if;
  if exists (select 1 from jsonb_array_elements(x_r -> 'preguntas') e
             where e ? 'correcta' or e ? 'explicacion') then
    raise exception 'FALLO el intento entrega la corrección al abrir';
  end if;
  x_log := x_log || ' puerta_abierta_con_69';

  -- Terminar escribe en la tabla del módulo, con la corrección solo de lo
  -- respondido.
  perform public.evaluacion_responder(x_sesion, 1, 0);
  x_r := public.evaluacion_terminar(x_sesion);
  if (x_r -> 'revision' -> 0 ->> 'explicacion') is null then
    raise exception 'FALLO respondida sin corrección';
  end if;
  select count(*) into x_n from jsonb_array_elements(x_r -> 'revision') e
  where (e ->> 'posicion')::int > 1 and (e ? 'explicacion') and e ->> 'explicacion' is not null;
  if x_n <> 0 then raise exception 'FALLO % sin responder traen explicación', x_n; end if;
  select count(*) into x_n from public.user_comunicaciones_exam_attempts where user_id = x_a;
  if x_n < 1 then raise exception 'FALLO el intento no llegó a user_comunicaciones_exam_attempts'; end if;
  x_log := x_log || ' terminar_escribe_en_comunicaciones';

  reset role;

  -- Sin sesión, la RPC no escribe.
  perform set_config('request.jwt.claims', '', true);
  begin
    perform public.comunicaciones_mark_progress(2::smallint, null);
    raise exception 'FALLO marca sin sesión aceptada';
  exception when others then
    if sqlerrm <> 'no authenticated user' then raise; end if;
    x_log := x_log || ' sin_sesion';
  end;

  -- ── Los otros módulos siguen en su catálogo y contando ────────────────────
  select count(*) into x_n from public.modulos_contenido
  where modulo in ('notam', 'metar', 'mercancias', 'aerodinamica', 'aeropuertos');
  if x_n <> 5 then raise exception 'FALLO un módulo viejo perdió su catálogo: %', x_n; end if;
  if private.secciones_leidas(x_a, 'comunicaciones') <> 69 then
    raise exception 'FALLO secciones_leidas comunicaciones: %', private.secciones_leidas(x_a, 'comunicaciones');
  end if;
  if private.practicas_hechas(x_a, 'comunicaciones') <> (case when cardinality(x_practicas) = 1 then 1 else 2 end) then
    raise exception 'FALLO practicas_hechas comunicaciones';
  end if;
  if private.secciones_leidas(x_b, 'comunicaciones') <> 3 then
    raise exception 'FALLO secciones_leidas de B';
  end if;
  if private.secciones_leidas(x_b, 'notam') is null or private.secciones_leidas(x_b, 'metar') is null
     or private.secciones_leidas(x_b, 'mercancias') is null or private.secciones_leidas(x_b, 'aerodinamica') is null
     or private.secciones_leidas(x_b, 'aeropuertos') is null
     or private.practicas_hechas(x_b, 'aeropuertos') is null then
    raise exception 'FALLO un módulo viejo dejó de contar';
  end if;
  if private.practicas_hechas(x_b, 'inventado') <> 0 then
    raise exception 'FALLO un módulo que no existe cuenta algo';
  end if;
  x_log := x_log || ' conteos_y_modulos_viejos';

  -- ── Panel: los seis módulos, el plan y las postulaciones ─────────────────
  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;
  x_r := public.panel_tarjetas();
  reset role;

  if x_r -> 'comunicaciones' is null then raise exception 'FALLO el panel no trae comunicaciones'; end if;
  if (x_r -> 'comunicaciones' ->> 'lecciones')::int <> 69 then
    raise exception 'FALLO el panel dice %', x_r -> 'comunicaciones';
  end if;
  if x_r -> 'comunicaciones' ->> 'mejor' is null then
    raise exception 'FALLO el panel no ve el intento terminado';
  end if;
  if x_r -> 'notam' is null or x_r -> 'metar' is null or x_r -> 'mercancias' is null
     or x_r -> 'aerodinamica' is null or x_r -> 'aeropuertos' is null then
    raise exception 'FALLO el panel perdió un módulo';
  end if;
  if not (x_r ? 'plan') or jsonb_typeof(x_r -> 'postulaciones') <> 'array' then
    raise exception 'FALLO el panel perdió el plan o las postulaciones';
  end if;
  x_log := x_log || ' panel_con_plan_y_postulaciones';

  -- ── Logros ────────────────────────────────────────────────────────────────
  select count(*) into x_n from public.achievements
  where code in ('comunicaciones_lesson', 'comunicaciones_practice', 'comunicaciones_exam', 'comunicaciones_master');
  if x_n <> 4 then raise exception 'FALLO logros de comunicaciones: %', x_n; end if;

  select count(*) into x_n from pg_trigger
  where tgname in ('trg_check_achievements_comunicaciones', 'trg_check_achievements_comunicaciones_exam')
    and not tgisinternal;
  if x_n <> 2 then raise exception 'FALLO faltan disparadores de logros: %', x_n; end if;

  x_t := pg_get_functiondef('public.check_and_unlock_achievements(uuid)'::regprocedure);
  if x_t not like '%''comunicaciones''%' or x_t not like '%''aeropuertos''%' or x_t not like '%''aerodinamica''%' then
    raise exception 'FALLO check_and_unlock_achievements no repasa todos los módulos';
  end if;
  perform private.desbloquear_logros(x_a, 'comunicaciones');
  perform private.desbloquear_logros(x_a, 'aeropuertos');
  perform private.desbloquear_logros(x_a, 'aerodinamica');
  perform private.desbloquear_logros(x_a, 'mercancias');
  perform private.desbloquear_logros(x_a, 'notam');
  perform private.desbloquear_logros(x_a, 'metar');
  perform private.desbloquear_logros(x_a, 'aerolinea');
  x_log := x_log || ' grupos_y_disparadores';

  -- Las 69 lecciones ya desbloquearon el de lección (por el disparador de la RPC).
  select count(*) into x_n from public.user_achievements ua
  join public.achievements a on a.id = ua.achievement_id
  where ua.user_id = x_a and a.code = 'comunicaciones_lesson';
  if x_n <> 1 then raise exception 'FALLO la lección completa no desbloqueó su logro'; end if;

  -- Con toda la práctica, el de práctica; sin aprobar, no el de dominado.
  select exists (
    select 1 from public.user_achievements ua join public.achievements a on a.id = ua.achievement_id
    where ua.user_id = x_a and a.code = 'comunicaciones_master'
  ) into x_master_antes;
  update public.user_comunicaciones_progress
  set practice_done = x_practicas
  where user_id = x_a;
  select count(*) into x_n from public.user_achievements ua
  join public.achievements a on a.id = ua.achievement_id
  where ua.user_id = x_a and a.code = 'comunicaciones_practice';
  if x_n <> 1 then raise exception 'FALLO la práctica completa no desbloqueó su logro'; end if;
  if not x_master_antes and not exists (
    select 1 from public.user_comunicaciones_exam_attempts where user_id = x_a and score >= 80
  ) and exists (
    select 1 from public.user_achievements ua join public.achievements a on a.id = ua.achievement_id
    where ua.user_id = x_a and a.code = 'comunicaciones_master'
  ) then
    raise exception 'FALLO módulo dominado sin aprobar la evaluación';
  end if;
  x_log := x_log || ' logros_leccion_y_practica';

  -- Y con un intento aprobado, los cuatro.
  insert into public.user_comunicaciones_exam_attempts (user_id, score, correct, total)
  values (x_a, 84, 21, 25);
  select count(*) into x_n from public.user_achievements ua
  join public.achievements a on a.id = ua.achievement_id
  where ua.user_id = x_a and a.code like 'comunicaciones%';
  if x_n <> 4 then raise exception 'FALLO con la evaluación aprobada hay % logros de 4', x_n; end if;
  x_log := x_log || ' logros_los_cuatro';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
