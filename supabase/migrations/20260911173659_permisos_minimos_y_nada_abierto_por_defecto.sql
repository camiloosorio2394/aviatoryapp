-- ============================================================================
-- Permisos mínimos para el cliente, y nada abierto por defecto.
--
-- La base conservaba los permisos que Supabase le da a cada tabla nueva: anon
-- podía leer todas y authenticated insertar, actualizar y borrar en todas. Lo
-- único que frenaba era RLS. Una tabla creada sin `enable row level security`
-- quedaba legible para cualquiera y escribible para cualquier cuenta.
--
-- 1. Se quitan los permisos que ninguna política deja usar: anon leyendo tablas
--    sin política para anon, y authenticated escribiendo tablas de solo lectura.
--    RLS ya rechazaba esas operaciones y ningún archivo de src/ ni función de
--    borde las hace, así que la app no cambia.
-- 2. Tablas que el cliente no toca:
--    - questions y answer_options (quiz diario de la primera versión): solo las
--      lee get_daily_quiz, que es security definer y no entrega is_correct. La
--      lectura directa, abierta a suscriptores, sí lo entregaba.
--    - vault_questions: el banco cifrado, solo lo leen las funciones del vault.
-- 3. MAINTAIN (VACUUM, LOCK TABLE…) sobre tablas y setval sobre secuencias: el
--    cliente no los necesita. anon no inserta en ninguna tabla, así que tampoco
--    necesita secuencias.
-- 4. Lo que se cree desde aquí no se le abre a anon ni a authenticated (tablas,
--    secuencias y funciones en public; funciones en cualquier esquema): cada
--    migración concede lo que su tabla o función necesita (ver CLAUDE.md).
--
-- Se mantiene: check_username_available abierta a anon (el registro revisa el
-- nombre antes de que exista la sesión).
-- No toca filas.
-- ============================================================================

-- ─── 1. Permisos que ninguna política deja usar ─────────────────────────────
revoke select on table public.airline_prep_exam_questions from anon;
revoke select on table public.airline_prep_exams from anon;
revoke select on table public.airline_prep_flashcards from anon;
revoke select on table public.airline_prep_mock_questions from anon;
revoke select on table public.airline_prep_mocks from anon;
revoke select on table public.airline_prep_questions from anon;
revoke select on table public.airline_prep_real_cases from anon;
revoke select on table public.airline_prep_simulations from anon;
revoke select on table public.airline_prep_topics from anon;
revoke select on table public.airline_profiles_prep from anon;
revoke select on table public.community_messages from anon;
revoke select on table public.community_reactions from anon;
revoke select on table public.content_reports from anon;
revoke select on table public.exam_report_topics from anon;
revoke select on table public.exam_reports from anon;
revoke select on table public.icao_emergencies from anon;
revoke select on table public.icao_exercises from anon;
revoke select on table public.icao_levels from anon;
revoke select on table public.icao_phrases from anon;
revoke select on table public.icao_roleplays from anon;
revoke select on table public.icao_skills from anon;
revoke select on table public.icao_vocabulary from anon;
revoke select on table public.interview_sim_categories from anon;
revoke select on table public.interview_sim_feedback from anon;
revoke select on table public.interview_sim_questions from anon;
revoke select on table public.interview_sim_recordings from anon;
revoke select on table public.interview_sim_sessions from anon;
revoke select on table public.library_categories from anon;
revoke select on table public.library_items from anon;
revoke select on table public.pca_exam_questions from anon;
revoke select on table public.pca_exams from anon;
revoke select on table public.pca_lessons from anon;
revoke select on table public.psych_categories from anon;
revoke select on table public.psych_group_dynamics from anon;
revoke select on table public.psych_personality_tests from anon;
revoke select on table public.psych_tests from anon;
revoke select on table public.user_airline_prep_attempts from anon;
revoke select on table public.user_airline_prep_progress from anon;
revoke select on table public.user_icao_attempts from anon;
revoke select on table public.user_icao_level from anon;
revoke select on table public.user_icao_mock_results from anon;
revoke select on table public.user_library_bookmarks from anon;
revoke select on table public.user_library_views from anon;
revoke select on table public.user_pca_exam_attempts from anon;
revoke select on table public.user_pca_lesson_progress from anon;
revoke select on table public.user_psych_attempts from anon;
revoke select on table public.vault_access_log from anon;
revoke select on table public.vault_sessions from anon;

revoke insert, update, delete on table public.achievements from authenticated;
revoke insert, update, delete on table public.airline_prep_exam_questions from authenticated;
revoke insert, update, delete on table public.airline_prep_exams from authenticated;
revoke insert, update, delete on table public.airline_prep_flashcards from authenticated;
revoke insert, update, delete on table public.airline_prep_mock_questions from authenticated;
revoke insert, update, delete on table public.airline_prep_mocks from authenticated;
revoke insert, update, delete on table public.airline_prep_questions from authenticated;
revoke insert, update, delete on table public.airline_prep_simulations from authenticated;
revoke insert, update, delete on table public.airline_prep_topics from authenticated;
revoke insert, update, delete on table public.airline_profiles_prep from authenticated;
revoke insert, update, delete on table public.airlines from authenticated;
revoke insert, update, delete on table public.checklist_items from authenticated;
revoke insert, update, delete on table public.checklists from authenticated;
revoke insert, update, delete on table public.community_channels from authenticated;
revoke insert, update, delete on table public.daily_activity from authenticated;
revoke insert, update, delete on table public.icao_emergencies from authenticated;
revoke insert, update, delete on table public.icao_exercises from authenticated;
revoke insert, update, delete on table public.icao_levels from authenticated;
revoke insert, update, delete on table public.icao_phrases from authenticated;
revoke insert, update, delete on table public.icao_roleplays from authenticated;
revoke insert, update, delete on table public.icao_skills from authenticated;
revoke insert, update, delete on table public.icao_vocabulary from authenticated;
revoke insert, update, delete on table public.interview_sim_categories from authenticated;
revoke insert, update, delete on table public.interview_sim_questions from authenticated;
revoke insert, update, delete on table public.library_categories from authenticated;
revoke insert, update, delete on table public.library_items from authenticated;
revoke insert, update, delete on table public.module_thresholds from authenticated;
revoke insert, update, delete on table public.pca_exam_questions from authenticated;
revoke insert, update, delete on table public.pca_exams from authenticated;
revoke insert, update, delete on table public.pca_lessons from authenticated;
revoke insert, update, delete on table public.psych_categories from authenticated;
revoke insert, update, delete on table public.psych_group_dynamics from authenticated;
revoke insert, update, delete on table public.psych_personality_tests from authenticated;
revoke insert, update, delete on table public.psych_tests from authenticated;
revoke insert, update, delete on table public.subject_topics from authenticated;
revoke insert, update, delete on table public.subjects from authenticated;
revoke insert, update, delete on table public.subscriptions from authenticated;
revoke insert, update, delete on table public.vault_access_log from authenticated;
revoke insert, update, delete on table public.vault_sessions from authenticated;

-- ─── 2. Tablas que el cliente no toca ───────────────────────────────────────
revoke all on table public.questions, public.answer_options, public.vault_questions from anon, authenticated;
-- Sin permisos, estas políticas ya no deciden nada; se quitan para que nadie
-- lea en ellas un acceso que no existe.
drop policy if exists questions_paid_read on public.questions;
drop policy if exists answer_options_paid_read on public.answer_options;

-- ─── 3. Privilegios de sistema ──────────────────────────────────────────────
revoke maintain on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon;
revoke update on all sequences in schema public from authenticated;

-- ─── 4. Nada abierto por defecto ────────────────────────────────────────────
alter default privileges for role postgres in schema public revoke all on tables from anon, authenticated;
alter default privileges for role postgres in schema public revoke all on sequences from anon, authenticated;
alter default privileges for role postgres in schema public revoke all on functions from anon, authenticated;
-- Postgres además da EXECUTE a PUBLIC en toda función nueva, en cualquier esquema.
-- Ese valor es global: se quita sin `in schema`. Las funciones que ya existen no cambian.
alter default privileges for role postgres revoke execute on functions from public;
