-- ============================================================================
-- Comunidad y reportes con tope y fecha del servidor; sin acceso a lo que el
-- cliente no usa.
--
-- Hallazgos de la segunda auditoría:
--   - community_messages, community_reactions, exam_reports y content_reports
--     aceptaban inserciones sin tope, y el cliente podía fijar created_at (un
--     mensaje con fecha futura quedaba arriba del canal), id y edited_at; en
--     content_reports, también el estado («arreglado»).
--   - 26 tablas daban SELECT a anon (RLS lo anulaba, pero sobraba).
--   - La vista user_pca_readiness daba INSERT/UPDATE/DELETE a authenticated.
--   - Tablas que la app no usa (legado de módulos anteriores) seguían legibles,
--     algunas con columnas de respuesta (airline_prep_questions.correct_answer,
--     icao_exercises.correct_answer).
--   - bump_library_item_views sumaba una visita por llamada, sin tope.
--
-- Cambios:
--   1. Insertar solo las columnas que manda la app. created_at lo pone un
--      disparador con la hora del servidor, que además aplica un tope por
--      piloto: 30 mensajes y 120 reacciones cada 10 minutos, 5 reportes de
--      examen y 20 reportes de contenido por día.
--   2. anon sin SELECT en ninguna tabla; la vista, solo lectura.
--   3. Las tablas que ningún archivo de src/ usa quedan sin permisos para el
--      cliente. Las funciones del servidor que las leen no cambian.
--   4. Una visita a un documento de la biblioteca suma al contador una vez por
--      piloto al día; la fecha de última apertura se sigue actualizando.
--
-- No toca filas.
-- ============================================================================

-- ─── 1. Tope y fecha del servidor ───────────────────────────────────────────
create or replace function private.insercion_con_tope()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_maximo int := tg_argv[0]::int;
  v_ventana interval := tg_argv[1]::interval;
  v_recientes int;
begin
  -- La fecha la pone el servidor: nada de mensajes fechados en el futuro.
  new.created_at := now();

  -- Sin sesión de usuario (service role, tareas del servidor) no hay tope.
  if auth.uid() is null then
    return new;
  end if;

  -- El candado serializa las inserciones del mismo piloto en la misma tabla:
  -- sin él, varias en paralelo leerían el mismo conteo.
  perform pg_advisory_xact_lock(hashtextextended(tg_table_name || ':' || new.user_id::text, 0));
  execute format(
    'select count(*) from %I.%I where user_id = $1 and created_at > now() - $2',
    tg_table_schema, tg_table_name
  ) into v_recientes using new.user_id, v_ventana;

  if v_recientes >= v_maximo then
    raise exception 'demasiadas_publicaciones'
      using errcode = 'P0001', hint = format('Máximo %s cada %s.', v_maximo, v_ventana);
  end if;
  return new;
end
$$;
revoke all on function private.insercion_con_tope() from public;

drop trigger if exists trg_tope_community_messages on public.community_messages;
create trigger trg_tope_community_messages before insert on public.community_messages
  for each row execute function private.insercion_con_tope('30', '10 minutes');
drop trigger if exists trg_tope_community_reactions on public.community_reactions;
create trigger trg_tope_community_reactions before insert on public.community_reactions
  for each row execute function private.insercion_con_tope('120', '10 minutes');
drop trigger if exists trg_tope_exam_reports on public.exam_reports;
create trigger trg_tope_exam_reports before insert on public.exam_reports
  for each row execute function private.insercion_con_tope('5', '1 day');
drop trigger if exists trg_tope_content_reports on public.content_reports;
create trigger trg_tope_content_reports before insert on public.content_reports
  for each row execute function private.insercion_con_tope('20', '1 day');

-- El conteo del tope va por piloto y fecha. El índice con user_id adelante
-- también sirve a la clave foránea, así que reemplaza al de solo user_id.
create index if not exists community_messages_user_created_idx on public.community_messages (user_id, created_at desc);
drop index if exists public.community_messages_user_id_idx;
create index if not exists community_reactions_user_created_idx on public.community_reactions (user_id, created_at desc);
drop index if exists public.community_reactions_user_id_fk_idx;
create index if not exists exam_reports_user_created_idx on public.exam_reports (user_id, created_at desc);
drop index if exists public.exam_reports_user_idx;
create index if not exists content_reports_user_created_idx on public.content_reports (user_id, created_at desc);
drop index if exists public.content_reports_user_id_fk_idx;

-- Solo las columnas que manda la app.
revoke insert on table public.community_messages from authenticated;
grant insert (channel_id, content, parent_id, user_id) on table public.community_messages to authenticated;
revoke insert on table public.community_reactions from authenticated;
grant insert (emoji, message_id, user_id) on table public.community_reactions to authenticated;
revoke insert on table public.content_reports from authenticated;
grant insert (contexto, detalle, ejercicio_id, modulo, motivo, user_id) on table public.content_reports to authenticated;
-- exam_reports: la app crea reportes, no los edita ni los borra.
revoke insert, update, delete on table public.exam_reports from authenticated;
grant insert (difficulty, exam_date, is_anonymous, passed, recalled_questions, region, score, subject_id, tips, user_id)
  on table public.exam_reports to authenticated;

-- ─── 2. anon sin tablas; la vista, solo lectura ─────────────────────────────
revoke select on all tables in schema public from anon;
revoke insert, update, delete on table public.user_pca_readiness from authenticated;

-- ─── 3. Tablas que el cliente no usa ────────────────────────────────────────
revoke all on table
  public.airline_prep_exam_questions, public.airline_prep_exams, public.airline_prep_flashcards,
  public.airline_prep_mock_questions, public.airline_prep_mocks, public.airline_prep_questions,
  public.airline_prep_real_cases, public.airline_prep_simulations, public.airline_prep_topics,
  public.airline_profiles_prep, public.airline_targets,
  public.icao_emergencies, public.icao_exercises, public.icao_levels, public.icao_phrases,
  public.icao_roleplays, public.icao_skills,
  public.interview_sim_feedback, public.interview_sim_recordings, public.interview_sim_sessions,
  public.module_thresholds,
  public.pca_exam_questions, public.pca_exams, public.pca_lessons,
  public.psych_categories, public.psych_group_dynamics, public.psych_personality_tests, public.psych_tests,
  public.quiz_attempt_answers, public.quiz_attempts,
  public.user_airline_prep_attempts, public.user_airline_prep_progress,
  public.user_icao_attempts, public.user_icao_level,
  public.user_library_bookmarks, public.user_pca_lesson_progress, public.user_psych_attempts,
  public.vault_access_log
from anon, authenticated;

-- ─── 4. Visitas de la biblioteca ────────────────────────────────────────────
create or replace function public.bump_library_item_views(p_item_id bigint)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_ultima timestamptz;
begin
  if auth.uid() is null then
    return;
  end if;
  if not exists (select 1 from public.library_items where id = p_item_id and is_published) then
    return;
  end if;

  -- La fecha de la última apertura se actualiza siempre (ordena «seguir
  -- leyendo»), pero el contador suma una sola visita por piloto al día.
  perform pg_advisory_xact_lock(hashtextextended('biblioteca:' || auth.uid()::text || ':' || p_item_id::text, 0));
  select viewed_at into v_ultima from public.user_library_views where user_id = auth.uid() and item_id = p_item_id;

  insert into public.user_library_views (user_id, item_id, viewed_at)
  values (auth.uid(), p_item_id, now())
  on conflict (user_id, item_id) do update set viewed_at = excluded.viewed_at;

  if v_ultima is null or v_ultima < date_trunc('day', now()) then
    update public.library_items
       set views_count = coalesce(views_count, 0) + 1
     where id = p_item_id;
  end if;
end
$$;
