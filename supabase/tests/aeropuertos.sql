-- ============================================================================
-- Módulo Aeropuertos: progreso, catálogo, permisos, puerta de la evaluación,
-- panel y logros. Migración 20260916000000.
--
-- Corre esto con las dos migraciones de Aeropuertos aplicadas (20260915230000
-- y 20260916000000) y el banco sembrado: la puerta abre una evaluación de
-- verdad y la termina. Además de lo nuevo, comprueba que los otros módulos
-- siguen contando igual y que el panel no perdió el plan ni las postulaciones:
-- la migración reemplaza enteras secciones_leidas, practicas_hechas,
-- desbloquear_logros, check_and_unlock_achievements y panel_tarjetas, y una
-- función compartida mal copiada se nota aquí y no en producción.
--
-- No borra filas: el punto de partida se fija con upsert y todo lo escrito se
-- deshace. Termina en PRUEBA_DESHECHA con la lista de lo verificado, o en
-- FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid; x_b uuid; x_n int; x_m int; x_r jsonb; x_t text; x_log text := '';
  x_i int; x_sesion uuid; x_master_antes boolean;
begin
  select id into x_a from auth.users order by created_at limit 1;
  select id into x_b from auth.users order by created_at offset 1 limit 1;
  if x_a is null or x_b is null then raise exception 'FALLO hacen falta dos usuarios'; end if;

  -- ── Catálogo y umbrales ───────────────────────────────────────────────────
  select lecciones, cardinality(practicas) into x_n, x_m
  from public.modulos_contenido where modulo = 'aeropuertos';
  if x_n is null then raise exception 'FALLO no hay catálogo de aeropuertos'; end if;
  if x_n <> 22 or x_m <> 30 then raise exception 'FALLO catalogo aeropuertos % %', x_n, x_m; end if;
  select count(*) into x_n from public.modulos_contenido
  where modulo = 'aeropuertos' and 'ap-rec-r01' = any (practicas)
    and 'ap-dec-d10' = any (practicas) and 'ap-cam-c08' = any (practicas);
  if x_n <> 1 then raise exception 'FALLO faltan claves de práctica'; end if;
  x_log := x_log || ' catalogo_22_y_30';

  select count(*) into x_n from public.module_thresholds
  where code in ('aeropuertos_lesson', 'aeropuertos_practice', 'aeropuertos_pass');
  if x_n <> 3 then raise exception 'FALLO umbrales de aeropuertos: %', x_n; end if;
  if (select total from public.module_thresholds where code = 'aeropuertos_pass') <> 80 then
    raise exception 'FALLO el umbral de aprobación no es 80';
  end if;
  x_log := x_log || ' umbrales';

  -- ── Punto de partida conocido, sin borrar ────────────────────────────────
  insert into public.user_aeropuertos_progress (user_id, lesson_screens, practice_done)
  values (x_a, '{}', '{}')
  on conflict (user_id) do update set lesson_screens = '{}', practice_done = '{}';
  insert into public.user_aeropuertos_progress (user_id, lesson_screens, practice_done)
  values (x_b, '{1,2,3}', '{ap-rec-r01}')
  on conflict (user_id) do update set lesson_screens = '{1,2,3}', practice_done = '{ap-rec-r01}';

  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;

  -- ── Marcar progreso: solo lo que existe en el catálogo ────────────────────
  perform public.aeropuertos_mark_progress(1::smallint, null);
  perform public.aeropuertos_mark_progress(null, 'ap-rec-r01');
  perform public.aeropuertos_mark_progress(2::smallint, 'ap-cam-c08');
  -- Repetir no duplica.
  perform public.aeropuertos_mark_progress(1::smallint, 'ap-rec-r01');

  begin
    perform public.aeropuertos_mark_progress(23::smallint, null);
    raise exception 'FALLO leccion 23 aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' leccion_fuera';
  end;
  begin
    perform public.aeropuertos_mark_progress(0::smallint, null);
    raise exception 'FALLO leccion 0 aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' leccion_cero';
  end;
  begin
    perform public.aeropuertos_mark_progress(null, 'ap-rec-r13');
    raise exception 'FALLO practica inventada aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' practica_inventada';
  end;
  -- Una clave de otro módulo tampoco entra.
  begin
    perform public.aeropuertos_mark_progress(null, 'esc-01');
    raise exception 'FALLO clave de aerodinámica aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' clave_ajena';
  end;

  select array_length(lesson_screens, 1), array_length(practice_done, 1)
  into x_n, x_m from public.user_aeropuertos_progress where user_id = x_a;
  if x_n <> 2 or x_m <> 2 then raise exception 'FALLO progreso de A: % lecciones, % practicas', x_n, x_m; end if;
  x_log := x_log || ' rpc_idempotente';

  -- ── RLS: cada uno ve lo suyo, y nadie escribe directo ────────────────────
  select count(*) into x_n from public.user_aeropuertos_progress where user_id <> x_a;
  if x_n <> 0 then raise exception 'FALLO A ve % filas de progreso ajenas', x_n; end if;
  select count(*) into x_n from public.user_aeropuertos_progress where user_id = x_a;
  if x_n <> 1 then raise exception 'FALLO A no ve su progreso'; end if;
  x_log := x_log || ' rls_progreso';

  begin
    update public.user_aeropuertos_progress
    set lesson_screens = (select array_agg(i::smallint) from generate_series(1, 22) i)
    where user_id = x_a;
    raise exception 'FALLO update directo aceptado';
  exception when insufficient_privilege then x_log := x_log || ' sin_update_directo';
  end;
  begin
    insert into public.user_aeropuertos_exam_attempts (user_id, score, correct, total)
    values (x_a, 100, 25, 25);
    raise exception 'FALLO intento escrito a mano';
  exception when insufficient_privilege then x_log := x_log || ' sin_intento_a_mano';
  end;

  -- ── La puerta: sin las 22 lecciones en la base no abre ────────────────────
  for x_i in 3..21 loop
    perform public.aeropuertos_mark_progress(x_i::smallint, null);
  end loop;
  begin
    perform public.evaluacion_iniciar('aeropuertos_evaluacion');
    raise exception 'FALLO abrio con 21 lecciones';
  exception when others then if sqlerrm <> 'leccion_incompleta' then raise; end if;
  end;
  x_log := x_log || ' puerta_cerrada_con_21';

  perform public.aeropuertos_mark_progress(22::smallint, null);
  x_r := public.evaluacion_iniciar('aeropuertos_evaluacion');
  x_sesion := (x_r ->> 'sesion')::uuid;
  if x_sesion is null then raise exception 'FALLO la evaluación no devolvió sesión: %', x_r; end if;
  if jsonb_array_length(x_r -> 'preguntas') <> 25 then
    raise exception 'FALLO el intento trae % preguntas', jsonb_array_length(x_r -> 'preguntas');
  end if;
  if exists (select 1 from jsonb_array_elements(x_r -> 'preguntas') e
             where e ? 'correcta' or e ? 'explicacion') then
    raise exception 'FALLO el intento entrega la corrección al abrir';
  end if;
  x_log := x_log || ' puerta_abierta_con_22';

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
  select count(*) into x_n from public.user_aeropuertos_exam_attempts where user_id = x_a;
  if x_n < 1 then raise exception 'FALLO el intento no llegó a user_aeropuertos_exam_attempts'; end if;
  x_log := x_log || ' terminar_escribe_en_aeropuertos';

  reset role;

  -- ── Conteos: el módulo nuevo y los de siempre ─────────────────────────────
  if private.secciones_leidas(x_a, 'aeropuertos') <> 22 then
    raise exception 'FALLO secciones_leidas aeropuertos: %', private.secciones_leidas(x_a, 'aeropuertos');
  end if;
  if private.practicas_hechas(x_a, 'aeropuertos') <> 2 then
    raise exception 'FALLO practicas_hechas aeropuertos';
  end if;
  if private.secciones_leidas(x_b, 'aeropuertos') <> 3 then
    raise exception 'FALLO secciones_leidas de B';
  end if;
  if private.secciones_leidas(x_b, 'notam') is null or private.secciones_leidas(x_b, 'metar') is null
     or private.secciones_leidas(x_b, 'mercancias') is null or private.secciones_leidas(x_b, 'aerodinamica') is null then
    raise exception 'FALLO un módulo viejo dejó de contar';
  end if;
  if private.secciones_leidas(x_b, 'inventado') <> 0 then
    raise exception 'FALLO un módulo que no existe cuenta algo';
  end if;
  x_log := x_log || ' conteos_y_modulos_viejos';

  -- ── Panel: los cinco módulos, el plan y las postulaciones ────────────────
  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;
  x_r := public.panel_tarjetas();
  reset role;

  if x_r -> 'aeropuertos' is null then raise exception 'FALLO el panel no trae aeropuertos'; end if;
  if (x_r -> 'aeropuertos' ->> 'lecciones')::int <> 22 or (x_r -> 'aeropuertos' ->> 'practicas')::int <> 2 then
    raise exception 'FALLO el panel dice %', x_r -> 'aeropuertos';
  end if;
  if x_r -> 'aeropuertos' ->> 'mejor' is null then
    raise exception 'FALLO el panel no ve el intento terminado';
  end if;
  if x_r -> 'notam' is null or x_r -> 'metar' is null or x_r -> 'mercancias' is null
     or x_r -> 'aerodinamica' is null then
    raise exception 'FALLO el panel perdió un módulo';
  end if;
  if not (x_r ? 'plan') or jsonb_typeof(x_r -> 'postulaciones') <> 'array' then
    raise exception 'FALLO el panel perdió el plan o las postulaciones';
  end if;
  x_log := x_log || ' panel_con_plan_y_postulaciones';

  -- ── Logros ────────────────────────────────────────────────────────────────
  select count(*) into x_n from public.achievements
  where code in ('aeropuertos_lesson', 'aeropuertos_practice', 'aeropuertos_exam', 'aeropuertos_master');
  if x_n <> 4 then raise exception 'FALLO logros de aeropuertos: %', x_n; end if;

  select count(*) into x_n from pg_trigger
  where tgname in ('trg_check_achievements_aeropuertos', 'trg_check_achievements_aeropuertos_exam')
    and not tgisinternal;
  if x_n <> 2 then raise exception 'FALLO faltan disparadores de logros: %', x_n; end if;

  -- El repaso manual recorre también aerodinámica y aeropuertos.
  x_t := pg_get_functiondef('public.check_and_unlock_achievements(uuid)'::regprocedure);
  if x_t not like '%''aerodinamica''%' or x_t not like '%''aeropuertos''%' then
    raise exception 'FALLO check_and_unlock_achievements no repasa los módulos nuevos';
  end if;
  -- Y los grupos de siempre siguen existiendo en desbloquear_logros.
  perform private.desbloquear_logros(x_a, 'aeropuertos');
  perform private.desbloquear_logros(x_a, 'aerodinamica');
  perform private.desbloquear_logros(x_a, 'mercancias');
  perform private.desbloquear_logros(x_a, 'notam');
  perform private.desbloquear_logros(x_a, 'metar');
  perform private.desbloquear_logros(x_a, 'aerolinea');
  x_log := x_log || ' grupos_y_disparadores';

  -- Las 22 lecciones ya desbloquearon el de lección (por el disparador de la RPC).
  select count(*) into x_n from public.user_achievements ua
  join public.achievements a on a.id = ua.achievement_id
  where ua.user_id = x_a and a.code = 'aeropuertos_lesson';
  if x_n <> 1 then raise exception 'FALLO la lección completa no desbloqueó su logro'; end if;

  -- Con las 30 prácticas, el de práctica; sin aprobar, no el de dominado.
  select exists (
    select 1 from public.user_achievements ua join public.achievements a on a.id = ua.achievement_id
    where ua.user_id = x_a and a.code = 'aeropuertos_master'
  ) into x_master_antes;
  update public.user_aeropuertos_progress
  set practice_done = (select practicas from public.modulos_contenido where modulo = 'aeropuertos')
  where user_id = x_a;
  select count(*) into x_n from public.user_achievements ua
  join public.achievements a on a.id = ua.achievement_id
  where ua.user_id = x_a and a.code = 'aeropuertos_practice';
  if x_n <> 1 then raise exception 'FALLO la práctica completa no desbloqueó su logro'; end if;
  if not x_master_antes and not exists (
    select 1 from public.user_aeropuertos_exam_attempts where user_id = x_a and score >= 80
  ) and exists (
    select 1 from public.user_achievements ua join public.achievements a on a.id = ua.achievement_id
    where ua.user_id = x_a and a.code = 'aeropuertos_master'
  ) then
    raise exception 'FALLO módulo dominado sin aprobar la evaluación';
  end if;
  x_log := x_log || ' logros_leccion_y_practica';

  -- Y con un intento aprobado, los cuatro.
  insert into public.user_aeropuertos_exam_attempts (user_id, score, correct, total)
  values (x_a, 84, 21, 25);
  select count(*) into x_n from public.user_achievements ua
  join public.achievements a on a.id = ua.achievement_id
  where ua.user_id = x_a and a.code like 'aeropuertos%';
  if x_n <> 4 then raise exception 'FALLO con la evaluación aprobada hay % logros de 4', x_n; end if;
  x_log := x_log || ' logros_los_cuatro';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
