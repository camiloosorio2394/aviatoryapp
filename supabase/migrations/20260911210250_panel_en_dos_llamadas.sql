-- ============================================================================
-- Panel del piloto en dos llamadas.
--
-- Hallazgo de la segunda auditoría: abrir el Dashboard hacía 16 peticiones a la
-- base (cinco para el encabezado y once para las tarjetas), cada una con su
-- viaje de red, su verificación de sesión y su RLS. Además la tarjeta de NOTAM
-- contaba lección y práctica con lo que hubiera guardado, también claves de
-- versiones viejas, y mezclaba el mejor puntaje con el del navegador.
--
-- Cambios:
--   1. panel_inicio(): perfil, estado del piloto, racha, suscripción y quizzes
--      terminados. Es lo que necesita el encabezado para pintarse.
--   2. panel_tarjetas(): logros, actividad de los últimos 90 días, pilotos en la
--      misma etapa, quiz del día (sin explicación ni opciones: el panel no las
--      muestra), dominio por materia, NOTAM contado contra el catálogo,
--      documentos con vencimiento y preparación para el PCA.
--   Las dos filtran por auth.uid() en cada consulta: son security definer y no
--   dependen del RLS para acotar al piloto.
--
-- No toca filas.
-- ============================================================================

create or replace function public.panel_inicio()
returns jsonb
language plpgsql
stable
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
    'perfil', (
      select jsonb_build_object('full_name', p.full_name, 'username', p.username, 'photo_url', p.photo_url)
      from public.profiles p where p.id = v_user
    ),
    'piloto', (
      select jsonb_build_object(
        'stage', ps.stage, 'total_hours', ps.total_hours, 'hours_pic', ps.hours_pic, 'licenses', ps.licenses,
        'icao_english_level', ps.icao_english_level, 'target_airline', ps.target_airline, 'target_date', ps.target_date
      )
      from public.pilot_state ps where ps.user_id = v_user
    ),
    'racha', (
      select jsonb_build_object(
        'current_streak', s.current_streak, 'longest_streak', s.longest_streak, 'last_activity_date', s.last_activity_date
      )
      from public.streaks s where s.user_id = v_user
    ),
    'suscripcion', (
      select jsonb_build_object('status', su.status, 'plan', su.plan, 'current_period_end', su.current_period_end)
      from public.subscriptions su where su.user_id = v_user
      order by su.created_at desc limit 1
    ),
    'quizzes_completados', (
      select count(*) from public.vault_sessions vs
      where vs.user_id = v_user and vs.completed_at is not null
    )
  );
end
$$;

revoke all on function public.panel_inicio() from public, anon;
grant execute on function public.panel_inicio() to authenticated;

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
    'notam', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'notam'),
      'practicas', private.practicas_hechas(v_user, 'notam'),
      'mejor', (select max(e.score) from public.user_notam_exam_attempts e where e.user_id = v_user)
    ),
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
