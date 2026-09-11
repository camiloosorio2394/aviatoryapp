-- ============================================================================
-- Quiz de inglés ICAO: el cliente deja de ver la clave y de escribir intentos.
--
-- Va después de 20260911190000 y de que la app publicada corrija por
-- icao_quiz_responder (src/services/icaoQuiz.ts). Desde aquí:
--   - icao_quiz_questions: el cliente autenticado lee todo menos correct_answer
--     y explanation (permisos por columna). anon no lee nada.
--   - user_icao_quiz_attempts: solo lectura de lo propio. Los intentos los
--     escribe icao_quiz_responder.
--
-- Nada más usa estas columnas ni escribe esa tabla: ni funciones, ni vistas, ni
-- edge functions. No toca filas.
-- ============================================================================

-- ─── Preguntas: sin la clave para el cliente ────────────────────────────────
revoke all on table public.icao_quiz_questions from anon, authenticated;
grant select (id, topic, prompt, context, options, difficulty, related_vocab, is_active, created_at)
  on table public.icao_quiz_questions to authenticated;

-- ─── Intentos: solo lectura propia ──────────────────────────────────────────
drop policy if exists user_icao_quiz_own on public.user_icao_quiz_attempts;
drop policy if exists user_icao_quiz_select_own on public.user_icao_quiz_attempts;
create policy user_icao_quiz_select_own on public.user_icao_quiz_attempts
  for select to authenticated
  using ((select auth.uid()) = user_id);

revoke all on table public.user_icao_quiz_attempts from anon, authenticated;
grant select on table public.user_icao_quiz_attempts to authenticated;
