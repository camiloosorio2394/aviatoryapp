-- ============================================================================
-- El cliente pierde acceso a lo que ya no usa.
--
-- Desde el panel en dos llamadas (20260911210250), el Dashboard no llama a
-- get_daily_quiz, get_peers_in_stage ni get_subject_mastery, ni lee
-- user_pca_readiness ni daily_activity: todo eso lo arma panel_tarjetas() del
-- lado del servidor. Y cinco funciones más no las llama ningún archivo de la app
-- (verificado con grep en src/ y supabase/functions): ai_usage_this_month,
-- get_activity_heatmap, get_pilot_cv, recalc_pilot_hours y
-- unread_notifications_count.
--
-- Todas filtran por auth.uid(), así que no había fuga entre pilotos; el cambio
-- quita superficie que nadie usa ("Nada nace abierto", CLAUDE.md).
--
-- - Las funciones siguen existiendo: las usan panel_tarjetas() y los
--   disparadores, que corren como su dueño.
-- - get_pilot_cv es la hoja de vida pública, que la app todavía no muestra. La
--   migración que la publique le devuelve el permiso.
-- - Se aplica después de que el deploy con el panel nuevo está en producción.
--
-- No toca filas.
-- ============================================================================

revoke execute on function public.get_daily_quiz() from authenticated;
revoke execute on function public.get_peers_in_stage(integer) from authenticated;
revoke execute on function public.get_subject_mastery() from authenticated;
revoke select on table public.user_pca_readiness from authenticated;
revoke select on table public.daily_activity from authenticated;

revoke execute on function public.ai_usage_this_month() from authenticated;
revoke execute on function public.get_activity_heatmap() from authenticated;
revoke execute on function public.get_pilot_cv(text) from authenticated;
revoke execute on function public.recalc_pilot_hours(uuid) from authenticated;
revoke execute on function public.unread_notifications_count() from authenticated;
