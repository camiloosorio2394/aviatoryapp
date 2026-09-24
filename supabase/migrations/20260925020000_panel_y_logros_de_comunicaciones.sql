-- ============================================================================
-- Módulo Comunicaciones ATC: práctica en el catálogo, panel y logros.
--
-- NO SE HA APLICADO. Se le entrega a Camilo para que la corra él, y después
-- el archivo se renombra con la versión que registró la base:
--   select version from supabase_migrations.schema_migrations
--   where name = 'panel_y_logros_de_comunicaciones';
--
-- Es la segunda mitad de 20260916000000_progreso_de_aeropuertos.sql, la que
-- 20260925000000_progreso_de_comunicaciones.sql dejó fuera a propósito porque
-- el módulo todavía no tenía práctica ni evaluación:
--
--   1. (Las claves de práctica NO: van por scripts/catalogo, ver la sección 1.)
--   2. private.practicas_hechas con la rama de comunicaciones.
--   3. Los cuatro logros del módulo, su grupo en private.desbloquear_logros,
--      los dos disparadores y el grupo en check_and_unlock_achievements.
--   4. panel_tarjetas con la tarjeta del módulo.
--
-- Las funciones compartidas se reemplazan enteras: se copiaron de su versión
-- más reciente en el repo (todas de 20260916000000, que Camilo aplica en el
-- paso 6 de docs/AEROPUERTOS_ESTADO.md) y lo único que cambia en cada una es
-- la rama de 'comunicaciones'. panel_tarjetas conserva 'plan',
-- 'postulaciones' y los cinco módulos de antes.
--
-- ORDEN: DESPUÉS de 20260925010000_evaluacion_de_comunicaciones.sql, porque
-- el panel y los logros leen user_comunicaciones_exam_attempts, que nace allí,
-- y comparan contra el umbral comunicaciones_pass. Y después de los siete
-- pasos de Aeropuertos, por lo mismo que dice su documento: si esta corre y
-- después una versión vieja de panel_tarjetas, el panel pierde la tarjeta.
--
-- Se puede correr dos veces: todo es `on conflict`, `drop … if exists` o
-- `create or replace`.
--
-- Prueba: supabase/tests/comunicaciones.sql (progreso, puerta, panel y
-- logros) y el caso de Comunicaciones en supabase/tests/logros.sql.
-- ============================================================================

-- ── 1 · Catálogo: la práctica ──────────────────────────────────────────────
--
-- Esta migración NO escribe las claves de práctica, a diferencia de la de
-- Aeropuertos: el guion de la práctica se está escribiendo todavía y una lista
-- copiada aquí quedaría vieja antes de aplicarse. Las claves las carga el paso
-- que sigue a esta migración (docs/COMUNICACIONES_ESTADO.md), con la salida de
--   node scripts/catalogo/sembrar.mjs comunicaciones
-- que sale de contenido/catalogo/modulos.json (claveEjercicioCm sobre el
-- guion; scripts/catalogo/catalogo.test.ts falla si no está al día).
--
-- Mientras tanto la fila sigue con 69 lecciones y ninguna práctica, como la
-- dejó 20260925000000: la RPC rechaza toda clave y el logro de práctica no se
-- puede ganar (ver la guarda en desbloquear_logros). Nada se rompe.
--
-- Tampoco va el umbral `comunicaciones_practice` en module_thresholds: es
-- solo documentación de un número que todavía cambia, y nadie lo lee.

-- ── 2 · Contar lo practicado ───────────────────────────────────────────────
--
-- La de 20260916000000 con una rama más. (secciones_leidas ya la ganó en
-- 20260925010000, para la puerta de la evaluación.)

create or replace function private.practicas_hechas(p_user uuid, p_modulo text)
returns integer
language sql
stable security definer
set search_path to ''
as $function$
  select count(distinct p)::int
  from (
    select unnest(practice_done) as p from public.user_notam_progress where p_modulo = 'notam' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_metar_progress where p_modulo = 'metar' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_mercancias_progress where p_modulo = 'mercancias' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_aerodinamica_progress where p_modulo = 'aerodinamica' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_aeropuertos_progress where p_modulo = 'aeropuertos' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_comunicaciones_progress where p_modulo = 'comunicaciones' and user_id = p_user
  ) as hechas
  where exists (
    select 1 from public.modulos_contenido c
    where c.modulo = p_modulo and hechas.p = any (c.practicas)
  )
$function$;

-- ── 3 · Los cuatro logros del módulo ───────────────────────────────────────

insert into public.achievements (code, name, description, icon, tier, order_index) values
  ('comunicaciones_lesson', 'Comunicaciones leído', 'Leíste las sesenta y nueve lecciones del módulo de comunicaciones ATC', '📖', 'bronze', 30),
  ('comunicaciones_practice', 'Comunicaciones practicado', 'Resolviste todos los ejercicios de la práctica con radio', '🎧', 'silver', 31),
  ('comunicaciones_exam', 'Evaluación de comunicaciones superada', 'Aprobaste la evaluación de comunicaciones ATC', '✅', 'silver', 32),
  ('comunicaciones_master', 'Comunicaciones dominado', 'Terminaste el módulo entero: lección, práctica y evaluación', '📻', 'gold', 33)
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon,
  tier = excluded.tier,
  order_index = excluded.order_index;

-- ── 4 · Desbloquear los logros ─────────────────────────────────────────────
--
-- La de 20260916000000 con el grupo 'comunicaciones' agregado. La práctica
-- exige además que el catálogo tenga alguna: con cero claves, «todas» se
-- cumpliría sin hacer nada.

create or replace function private.desbloquear_logros(p_user uuid, p_grupo text)
returns integer
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_codigos text[];
  v_new int := 0;
  v_n int;
  v_bool bool;
  v_lecciones bool;
  v_practicas bool;
  v_aprobado bool;
begin
  if p_user is null then return 0; end if;

  v_codigos := case p_grupo
    when 'quiz' then array['first_quiz', 'first_100', 'subject_master']
    when 'racha' then array['streak_3', 'streak_7', 'streak_30']
    when 'comunidad' then array['community_hello']
    when 'piloto' then array['first_step', 'icao_climb']
    when 'suscripcion' then array['founder_badge']
    when 'notam' then array['notam_lesson', 'notam_practice', 'notam_exam', 'notam_master']
    when 'metar' then array['metar_lesson', 'metar_master']
    when 'mercancias' then array['mercancias_lesson', 'mercancias_practice', 'mercancias_exam', 'mercancias_master']
    when 'aerodinamica' then array['aerodinamica_lesson', 'aerodinamica_practice', 'aerodinamica_exam', 'aerodinamica_master']
    when 'aeropuertos' then array['aeropuertos_lesson', 'aeropuertos_practice', 'aeropuertos_exam', 'aeropuertos_master']
    when 'comunicaciones' then array['comunicaciones_lesson', 'comunicaciones_practice', 'comunicaciones_exam', 'comunicaciones_master']
    when 'aerolinea' then array['airline_mock_passed']
  end;
  if v_codigos is null then
    raise exception 'grupo_de_logros_desconocido: %', p_grupo using errcode = '22023';
  end if;

  -- Con todos los logros del grupo ya ganados no hay nada que contar: es el caso
  -- de cada sección leída después del logro de la lección.
  if not exists (
    select 1 from public.achievements a
    where a.code = any (v_codigos)
      and not exists (
        select 1 from public.user_achievements ua
        where ua.user_id = p_user and ua.achievement_id = a.id
      )
  ) then
    return 0;
  end if;

  case p_grupo
  when 'quiz' then
    -- vault_sessions es donde escribe el quiz actual; en quiz_attempts quedaron
    -- intentos previos a la migración al vault. Nadie pierde lo que ya hizo.
    select coalesce(sum(preguntas), 0)::int, count(*) > 0
      into v_n, v_bool
      from (
        select coalesce(array_length(question_ids, 1), 0) as preguntas
          from public.vault_sessions
          where user_id = p_user and completed_at is not null
        union all
        select coalesce(total_questions, 0)
          from public.quiz_attempts
          where user_id = p_user and finished_at is not null
      ) as intentos;
    if v_bool then v_new := v_new + public._try_unlock(p_user, 'first_quiz'); end if;
    if v_n >= 100 then v_new := v_new + public._try_unlock(p_user, 'first_100'); end if;

    -- subject_master va solo contra vault_sessions: la materia de la tabla vieja
    -- es un id numérico y la nueva un slug; mezclarlas daría rachas falsas.
    with last5 as (
      select subject_slug,
             case
               when coalesce(array_length(question_ids, 1), 0) = 0 then 0
               else round(coalesce(correct_count, 0)::numeric * 100 / array_length(question_ids, 1))
             end as score
      from public.vault_sessions
      where user_id = p_user and completed_at is not null and subject_slug is not null
      order by completed_at desc
      limit 5
    )
    select count(*)::int into v_n
    from last5
    where score >= 80 and subject_slug = (select subject_slug from last5 limit 1);
    if v_n = 5 then v_new := v_new + public._try_unlock(p_user, 'subject_master'); end if;

  when 'racha' then
    select coalesce(current_streak, 0) into v_n from public.streaks where user_id = p_user;
    if coalesce(v_n, 0) >= 3 then v_new := v_new + public._try_unlock(p_user, 'streak_3'); end if;
    if coalesce(v_n, 0) >= 7 then v_new := v_new + public._try_unlock(p_user, 'streak_7'); end if;
    if coalesce(v_n, 0) >= 30 then v_new := v_new + public._try_unlock(p_user, 'streak_30'); end if;

  when 'comunidad' then
    if exists (select 1 from public.community_messages where user_id = p_user) then
      v_new := v_new + public._try_unlock(p_user, 'community_hello');
    end if;

  when 'piloto' then
    select (stage is not null), coalesce(icao_english_level, 0)
      into v_bool, v_n
      from public.pilot_state where user_id = p_user;
    if coalesce(v_bool, false) then v_new := v_new + public._try_unlock(p_user, 'first_step'); end if;
    if coalesce(v_n, 0) >= 4 then v_new := v_new + public._try_unlock(p_user, 'icao_climb'); end if;

  when 'suscripcion' then
    if (
      select plan::text from public.subscriptions
      where user_id = p_user order by created_at desc limit 1
    ) = 'founder_lifetime' then
      v_new := v_new + public._try_unlock(p_user, 'founder_badge');
    end if;

  when 'notam' then
    v_lecciones := private.secciones_leidas(p_user, 'notam')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'notam');
    v_practicas := private.practicas_hechas(p_user, 'notam')
      >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'notam');
    v_aprobado := exists (
      select 1 from public.user_notam_exam_attempts where user_id = p_user and coalesce(score, 0) >= 80
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'notam_lesson'); end if;
    if v_practicas then v_new := v_new + public._try_unlock(p_user, 'notam_practice'); end if;
    if v_aprobado then v_new := v_new + public._try_unlock(p_user, 'notam_exam'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'notam_master');
    end if;

  when 'metar' then
    v_lecciones := private.secciones_leidas(p_user, 'metar')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'metar');
    v_practicas := private.practicas_hechas(p_user, 'metar')
      >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'metar');
    v_aprobado := exists (
      select 1 from public.user_metar_exam_attempts where user_id = p_user and coalesce(score, 0) >= 80
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'metar_lesson'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'metar_master');
    end if;

  when 'mercancias' then
    v_lecciones := private.secciones_leidas(p_user, 'mercancias')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'mercancias');
    v_practicas := private.practicas_hechas(p_user, 'mercancias')
      >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'mercancias');
    v_aprobado := exists (
      select 1 from public.user_mercancias_exam_attempts
      where user_id = p_user
        and coalesce(score, 0) >= coalesce((select total from public.module_thresholds where code = 'mercancias_pass'), 80)
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'mercancias_lesson'); end if;
    if v_practicas then v_new := v_new + public._try_unlock(p_user, 'mercancias_practice'); end if;
    if v_aprobado then v_new := v_new + public._try_unlock(p_user, 'mercancias_exam'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'mercancias_master');
    end if;

  when 'aerodinamica' then
    v_lecciones := private.secciones_leidas(p_user, 'aerodinamica')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'aerodinamica');
    v_practicas := private.practicas_hechas(p_user, 'aerodinamica')
      >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'aerodinamica');
    v_aprobado := exists (
      select 1 from public.user_aerodinamica_exam_attempts
      where user_id = p_user
        and coalesce(score, 0) >= coalesce((select total from public.module_thresholds where code = 'aerodinamica_pass'), 80)
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'aerodinamica_lesson'); end if;
    if v_practicas then v_new := v_new + public._try_unlock(p_user, 'aerodinamica_practice'); end if;
    if v_aprobado then v_new := v_new + public._try_unlock(p_user, 'aerodinamica_exam'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'aerodinamica_master');
    end if;

  when 'aeropuertos' then
    v_lecciones := private.secciones_leidas(p_user, 'aeropuertos')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'aeropuertos');
    v_practicas := private.practicas_hechas(p_user, 'aeropuertos')
      >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'aeropuertos');
    v_aprobado := exists (
      select 1 from public.user_aeropuertos_exam_attempts
      where user_id = p_user
        and coalesce(score, 0) >= coalesce((select total from public.module_thresholds where code = 'aeropuertos_pass'), 80)
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'aeropuertos_lesson'); end if;
    if v_practicas then v_new := v_new + public._try_unlock(p_user, 'aeropuertos_practice'); end if;
    if v_aprobado then v_new := v_new + public._try_unlock(p_user, 'aeropuertos_exam'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'aeropuertos_master');
    end if;

  when 'comunicaciones' then
    v_lecciones := private.secciones_leidas(p_user, 'comunicaciones')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'comunicaciones');
    -- Sin práctica en el catálogo no hay logro de práctica: cardinality de un
    -- arreglo vacío es 0 y cualquiera lo cumpliría.
    v_practicas := (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'comunicaciones') > 0
      and private.practicas_hechas(p_user, 'comunicaciones')
        >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'comunicaciones');
    v_aprobado := exists (
      select 1 from public.user_comunicaciones_exam_attempts
      where user_id = p_user
        and coalesce(score, 0) >= coalesce((select total from public.module_thresholds where code = 'comunicaciones_pass'), 80)
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'comunicaciones_lesson'); end if;
    if v_practicas then v_new := v_new + public._try_unlock(p_user, 'comunicaciones_practice'); end if;
    if v_aprobado then v_new := v_new + public._try_unlock(p_user, 'comunicaciones_exam'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'comunicaciones_master');
    end if;

  when 'aerolinea' then
    if exists (
      select 1 from public.user_airline_mock_attempts
      where user_id = p_user
        and coalesce(score, 0) >= coalesce((select total from public.module_thresholds where code = 'airline_mock_pass'), 85)
    ) then
      v_new := v_new + public._try_unlock(p_user, 'airline_mock_passed');
    end if;
  end case;

  return v_new;
end
$function$;

-- ── 5 · Los disparadores que desbloquean ──────────────────────────────────
--
-- Cada vez que el piloto marca progreso o termina un intento, el disparador
-- llama a desbloquear_logros con el grupo del módulo.

drop trigger if exists trg_check_achievements_comunicaciones on public.user_comunicaciones_progress;
create trigger trg_check_achievements_comunicaciones
  after insert or update on public.user_comunicaciones_progress
  for each row execute function private.trigger_logros('comunicaciones');

drop trigger if exists trg_check_achievements_comunicaciones_exam on public.user_comunicaciones_exam_attempts;
create trigger trg_check_achievements_comunicaciones_exam
  after insert or update on public.user_comunicaciones_exam_attempts
  for each row execute function private.trigger_logros('comunicaciones');

-- ── 6 · Los grupos del repaso manual ──────────────────────────────────────

create or replace function public.check_and_unlock_achievements(p_user_id uuid)
returns integer
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_grupo text;
  v_new int := 0;
begin
  if p_user_id is null then return 0; end if;
  -- Con sesión de usuario, solo sobre sí mismo. El service role no trae
  -- auth.uid() y puede revisar a cualquiera.
  if auth.uid() is not null and p_user_id is distinct from auth.uid() then return 0; end if;

  foreach v_grupo in array array[
    'piloto', 'quiz', 'racha', 'comunidad', 'suscripcion',
    'notam', 'metar', 'aerolinea', 'mercancias', 'aerodinamica', 'aeropuertos', 'comunicaciones'
  ] loop
    v_new := v_new + private.desbloquear_logros(p_user_id, v_grupo);
  end loop;
  return v_new;
end
$function$;

-- ── 7 · El panel, con la tarjeta del módulo ──────────────────────────────
--
-- La de 20260916000000 (que ya es la de 20260915140000_panel_completo más
-- Aeropuertos) con la tarjeta de 'comunicaciones'. Conserva el plan y las
-- postulaciones.

create or replace function public.panel_tarjetas()
returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_user uuid := auth.uid();
begin
  if v_user is null then
    raise exception 'sin_sesion' using errcode = '42501';
  end if;

  return jsonb_build_object(
    'logros', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'id', a.id, 'code', a.code, 'name', a.name, 'description', a.description,
          'icon', a.icon, 'tier', a.tier, 'unlocked_at', ua.unlocked_at
        )
        order by a.order_index
      )
      from public.achievements a
      left join public.user_achievements ua on ua.achievement_id = a.id and ua.user_id = v_user
    ), '[]'::jsonb),
    'actividad', coalesce((
      select jsonb_agg(
        jsonb_build_object('date', d.date, 'activities_count', d.activities_count, 'questions_answered', d.questions_answered)
        order by d.date
      )
      from public.daily_activity d
      where d.user_id = v_user and d.date >= current_date - 90
    ), '[]'::jsonb),
    'companeros', coalesce((
      select jsonb_agg(jsonb_build_object('username', c.username, 'current_streak', c.current_streak))
      from public.get_peers_in_stage(5) c
    ), '[]'::jsonb),
    'quiz_diario', coalesce((
      select jsonb_agg(jsonb_build_object('question_id', q.question_id, 'statement', q.statement, 'subject_name', q.subject_name))
      from public.get_daily_quiz() q
    ), '[]'::jsonb),
    'dominio', coalesce((
      select jsonb_agg(to_jsonb(m)) from public.get_subject_mastery() m
    ), '[]'::jsonb),
    'notam', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'notam'),
      'practicas', private.practicas_hechas(v_user, 'notam'),
      'mejor', (select max(e.score) from public.user_notam_exam_attempts e where e.user_id = v_user)
    ),
    'metar', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'metar'),
      'practicas', private.practicas_hechas(v_user, 'metar'),
      'mejor', (select max(e.score) from public.user_metar_exam_attempts e where e.user_id = v_user)
    ),
    'mercancias', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'mercancias'),
      'practicas', private.practicas_hechas(v_user, 'mercancias'),
      'mejor', (select max(e.score) from public.user_mercancias_exam_attempts e where e.user_id = v_user)
    ),
    'aerodinamica', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'aerodinamica'),
      'practicas', private.practicas_hechas(v_user, 'aerodinamica'),
      'mejor', (select max(e.score) from public.user_aerodinamica_exam_attempts e where e.user_id = v_user)
    ),
    'aeropuertos', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'aeropuertos'),
      'practicas', private.practicas_hechas(v_user, 'aeropuertos'),
      'mejor', (select max(e.score) from public.user_aeropuertos_exam_attempts e where e.user_id = v_user)
    ),
    'comunicaciones', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'comunicaciones'),
      'practicas', private.practicas_hechas(v_user, 'comunicaciones'),
      'mejor', (select max(e.score) from public.user_comunicaciones_exam_attempts e where e.user_id = v_user)
    ),
    -- Lo que el piloto se comprometió a hacer: igual que en 20260915140000.
    'plan', (
      select jsonb_build_object(
        'dias', pe.dias, 'hora', pe.hora, 'zona', pe.zona, 'minutos_meta', pe.minutos_meta
      )
      from public.plan_de_estudio pe where pe.user_id = v_user
    ),
    'postulaciones', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'aerolinea', coalesce(a.name, po.aerolinea),
          'estado', po.estado,
          'dias', current_date - po.postulada_en
        )
        order by po.postulada_en
      )
      from public.postulaciones po
      left join public.airlines a on a.id = po.airline_id
      where po.user_id = v_user and po.estado in ('postulada', 'en_proceso')
    ), '[]'::jsonb),
    'licencias', coalesce((
      select jsonb_agg(
        jsonb_build_object('id', l.id, 'license_type', l.license_type, 'custom_name', l.custom_name, 'expires_date', l.expires_date)
        order by l.expires_date
      )
      from public.licenses_held l
      where l.user_id = v_user and l.expires_date is not null
    ), '[]'::jsonb),
    'preparacion', (
      select jsonb_build_object(
        'attempts_60d', r.attempts_60d, 'avg_score_60d', r.avg_score_60d, 'best_score', r.best_score,
        'passed_recently', r.passed_recently, 'readiness_color', r.readiness_color
      )
      from public.user_pca_readiness r where r.user_id = v_user
    )
  );
end
$function$;
