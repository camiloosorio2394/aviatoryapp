-- ============================================================================
-- RLS evaluado una vez por consulta, índices de claves foráneas y permisos de
-- sistema fuera del cliente.
--
-- 1. Políticas. `auth.uid()` escrito a secas dentro de una política se evalúa
--    fila por fila. Envuelto en `(select auth.uid())`, Postgres lo calcula una
--    sola vez por consulta (initplan). Con pocas filas no se nota; con miles de
--    filas por tabla es la diferencia entre un índice y un recorrido completo.
--    Lo marcaba el asesor de rendimiento de Supabase en 82 políticas. La
--    condición de cada política no cambia: solo cómo se evalúa. Las políticas
--    nuevas se escriben ya con `(select auth.uid())`.
--
-- 2. Índices. 41 claves foráneas sin índice que las cubra. Cada borrado o
--    actualización en la tabla referida recorre la tabla hija entera para
--    comprobar la clave, y los joins por esa columna no tienen índice.
--
-- 3. Permisos. Supabase concede por defecto TRUNCATE, TRIGGER y REFERENCES a
--    anon y authenticated en cada tabla. La API no expone esas operaciones,
--    pero TRUNCATE no pasa por RLS: si algún día se abre otra vía de acceso,
--    vaciaría una tabla entera. Se retiran de las tablas existentes y de las
--    que se creen después.
--
-- No toca filas.
-- ============================================================================


-- ─── 1. Políticas con (select auth.uid()) ───────────────────────────────────
do $politicas$
declare
  p record;
  v_usando text;
  v_chequeo text;
  v_sentencia text;
  v_cambiadas int := 0;
begin
  for p in
    select pol.polname, n.nspname as esquema, cl.relname as tabla,
           pg_get_expr(pol.polqual, pol.polrelid) as usando,
           pg_get_expr(pol.polwithcheck, pol.polrelid) as chequeo
    from pg_policy pol
    join pg_class cl on cl.oid = pol.polrelid
    join pg_namespace n on n.oid = cl.relnamespace
    where n.nspname in ('public', 'storage')
  loop
    -- Solo las llamadas que no están ya dentro de un SELECT.
    v_usando := regexp_replace(p.usando, '(?<!SELECT )auth\.uid\(\)', '(select auth.uid())', 'g');
    v_chequeo := regexp_replace(p.chequeo, '(?<!SELECT )auth\.uid\(\)', '(select auth.uid())', 'g');
    if v_usando is not distinct from p.usando and v_chequeo is not distinct from p.chequeo then
      continue;
    end if;

    v_sentencia := format('alter policy %I on %I.%I', p.polname, p.esquema, p.tabla);
    if p.usando is not null then v_sentencia := v_sentencia || ' using (' || v_usando || ')'; end if;
    if p.chequeo is not null then v_sentencia := v_sentencia || ' with check (' || v_chequeo || ')'; end if;
    execute v_sentencia;
    v_cambiadas := v_cambiadas + 1;
  end loop;

  raise notice 'políticas reescritas con (select auth.uid()): %', v_cambiadas;
end
$politicas$;


-- ─── 2. Índices de claves foráneas ──────────────────────────────────────────
create index if not exists ai_interactions_attempt_id_fk_idx on public.ai_interactions (attempt_id);
create index if not exists ai_interactions_question_id_fk_idx on public.ai_interactions (question_id);
create index if not exists airline_prep_exam_questions_question_id_fk_idx on public.airline_prep_exam_questions (question_id);
create index if not exists airline_prep_exams_airline_id_fk_idx on public.airline_prep_exams (airline_id);
create index if not exists airline_prep_mocks_airline_id_fk_idx on public.airline_prep_mocks (airline_id);
create index if not exists airline_prep_real_cases_reported_by_user_id_fk_idx on public.airline_prep_real_cases (reported_by_user_id);
create index if not exists airline_targets_airline_id_fk_idx on public.airline_targets (airline_id);
create index if not exists checklist_progress_item_id_fk_idx on public.checklist_progress (item_id);
create index if not exists community_messages_parent_id_fk_idx on public.community_messages (parent_id);
create index if not exists community_reactions_user_id_fk_idx on public.community_reactions (user_id);
create index if not exists content_reports_user_id_fk_idx on public.content_reports (user_id);
create index if not exists evaluacion_sesiones_evaluacion_fk_idx on public.evaluacion_sesiones (evaluacion);
create index if not exists icao_emergencies_level_id_fk_idx on public.icao_emergencies (level_id);
create index if not exists icao_exercises_level_id_fk_idx on public.icao_exercises (level_id);
create index if not exists icao_roleplays_level_id_fk_idx on public.icao_roleplays (level_id);
create index if not exists interview_sim_feedback_recording_id_fk_idx on public.interview_sim_feedback (recording_id);
create index if not exists interview_sim_questions_airline_id_fk_idx on public.interview_sim_questions (airline_id);
create index if not exists interview_sim_recordings_question_id_fk_idx on public.interview_sim_recordings (question_id);
create index if not exists interview_sim_sessions_airline_id_fk_idx on public.interview_sim_sessions (airline_id);
create index if not exists interview_sim_sessions_category_id_fk_idx on public.interview_sim_sessions (category_id);
create index if not exists pca_exam_questions_question_id_fk_idx on public.pca_exam_questions (question_id);
create index if not exists pca_lessons_prerequisite_lesson_id_fk_idx on public.pca_lessons (prerequisite_lesson_id);
create index if not exists profiles_referred_by_fk_idx on public.profiles (referred_by);
create index if not exists quiz_attempt_answers_question_id_fk_idx on public.quiz_attempt_answers (question_id);
create index if not exists quiz_attempt_answers_selected_option_id_fk_idx on public.quiz_attempt_answers (selected_option_id);
create index if not exists user_achievements_achievement_id_fk_idx on public.user_achievements (achievement_id);
create index if not exists user_airline_prep_attempts_exam_id_fk_idx on public.user_airline_prep_attempts (exam_id);
create index if not exists user_airline_prep_attempts_flashcard_id_fk_idx on public.user_airline_prep_attempts (flashcard_id);
create index if not exists user_airline_prep_attempts_mock_id_fk_idx on public.user_airline_prep_attempts (mock_id);
create index if not exists user_airline_prep_attempts_question_id_fk_idx on public.user_airline_prep_attempts (question_id);
create index if not exists user_airline_prep_progress_topic_id_fk_idx on public.user_airline_prep_progress (topic_id);
create index if not exists user_icao_attempts_emergency_id_fk_idx on public.user_icao_attempts (emergency_id);
create index if not exists user_icao_attempts_exercise_id_fk_idx on public.user_icao_attempts (exercise_id);
create index if not exists user_icao_attempts_roleplay_id_fk_idx on public.user_icao_attempts (roleplay_id);
create index if not exists user_icao_quiz_attempts_question_id_fk_idx on public.user_icao_quiz_attempts (question_id);
create index if not exists user_library_bookmarks_item_id_fk_idx on public.user_library_bookmarks (item_id);
create index if not exists user_library_views_item_id_fk_idx on public.user_library_views (item_id);
create index if not exists user_pca_exam_attempts_exam_id_fk_idx on public.user_pca_exam_attempts (exam_id);
create index if not exists user_pca_lesson_progress_lesson_id_fk_idx on public.user_pca_lesson_progress (lesson_id);
create index if not exists user_psych_attempts_test_id_fk_idx on public.user_psych_attempts (test_id);
create index if not exists vault_questions_inserted_by_fk_idx on public.vault_questions (inserted_by);


-- ─── 3. Permisos de sistema fuera del cliente ───────────────────────────────
revoke truncate, trigger, references on all tables in schema public from anon, authenticated;
alter default privileges for role postgres in schema public
  revoke truncate, trigger, references on tables from anon, authenticated;
