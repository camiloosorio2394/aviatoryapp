-- ============================================================================
-- El panel conoce Aerodinámica, y lo que el piloto se comprometió a hacer.
--
-- Dos cosas en la misma función porque es la misma función:
--
-- 1. Aerodinámica entró el 14 de septiembre y `panel_tarjetas()` seguía
--    devolviendo tres módulos: el panel anunciaba tres de los cuatro que la app
--    ya tiene. Es el mismo fallo que arregló `20260913180000` dos días antes,
--    porque la lista del cliente estaba escrita a mano en dos sitios. Eso ya no
--    puede repetirse: la lista quedó en un archivo y `scripts/catalogo` falla si
--    el catálogo tiene un módulo que la lista no.
--
-- 2. El plan de estudio y las postulaciones abiertas. La pantalla de inicio no
--    sabía nada de lo que el piloto se comprometió a hacer: ni qué días dijo
--    que iba a estudiar, ni que lleva tres semanas esperando respuesta de una
--    aerolínea. Van dentro de esta función y no en consultas aparte porque el
--    panel se bajó a tres peticiones a propósito y eso no se deshace por dos
--    datos.
--
-- Necesita la tabla `postulaciones` (migración 20260915120000).
--
-- No toca filas.
-- ============================================================================

create or replace function public.panel_tarjetas()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
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
    -- Los módulos de Ingreso a aerolínea, todos con la misma forma. Cada uno
    -- necesita su bloque porque cada uno tiene su propia tabla de intentos; del
    -- lado del cliente ya se recorren desde una sola lista.
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
    -- Lo que el piloto se comprometió a hacer, para que su pantalla de inicio
    -- pueda responder «¿hoy me toca?» sin una petición más. Van aquí y no en
    -- consultas sueltas porque el panel se bajó a tres peticiones a propósito
    -- (20260911210250) y eso no se deshace por dos datos.
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
$$;

revoke all on function public.panel_tarjetas() from public, anon;
grant execute on function public.panel_tarjetas() to authenticated;
