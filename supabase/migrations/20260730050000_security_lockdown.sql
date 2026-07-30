-- ============================================================================
-- Blindaje de seguridad (advisors 2026-07-30). YA APLICADA en produccion via
-- MCP apply_migration el 2026-07-30; este archivo la deja versionada.
-- 1) user_pca_readiness exponia auth.users a anon via SECURITY DEFINER.
--    Se recrea como security_invoker sobre user_pca_exam_attempts (RLS:
--    cada usuario ve solo sus intentos) y sin acceso anon.
-- 2) vault_insert habia recuperado EXECUTE para PUBLIC (default de Postgres
--    tras un create or replace posterior). Vuelve a ser solo service_role.
-- 3) Todas las funciones SECURITY DEFINER post-login pierden EXECUTE de
--    anon/PUBLIC. Unica excepcion: check_username_available (signup pre-auth).
--    Las funciones de trigger no necesitan EXECUTE de roles de sesion.
-- ============================================================================

drop view if exists public.user_pca_readiness;

create view public.user_pca_readiness
with (security_invoker = true) as
select
  a.user_id,
  coalesce(avg(a.score) filter (where a.finished_at > now() - interval '60 days'), 0::numeric) as avg_score_60d,
  count(a.id) filter (where a.finished_at > now() - interval '60 days') as attempts_60d,
  max(a.score) as best_score,
  bool_or(a.passed) filter (where a.finished_at > now() - interval '14 days') as passed_recently,
  case
    when avg(a.score) filter (where a.finished_at > now() - interval '30 days') >= 80::numeric then 'green'
    when avg(a.score) filter (where a.finished_at > now() - interval '30 days') >= 65::numeric then 'amber'
    else 'red'
  end as readiness_color
from public.user_pca_exam_attempts a
where a.finished_at is not null
group by a.user_id;

comment on view public.user_pca_readiness is
  'Readiness PCA del usuario. security_invoker + RLS de user_pca_exam_attempts: cada usuario solo ve su propia fila. Usuarios sin intentos no tienen fila (tratar como cero).';

revoke all on public.user_pca_readiness from public, anon;
grant select on public.user_pca_readiness to authenticated, service_role;

revoke execute on function public.vault_insert(text, text, text, jsonb, text, text, text, integer, smallint, text[], integer, text, text) from public, anon, authenticated;
grant execute on function public.vault_insert(text, text, text, jsonb, text, text, text, integer, smallint, text[], integer, text, text) to service_role;

do $$
declare
  fn record;
begin
  for fn in
    select p.oid::regprocedure as sig
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.prosecdef
      and p.proname in (
        '_gen_referral_code','ai_usage_this_month','bump_library_item_views',
        'check_and_unlock_achievements','check_my_expiries','get_activity_heatmap',
        'get_all_subjects_intel','get_daily_quiz','get_peers_in_stage',
        'get_profile_avatars','get_referral_stats','get_subject_intel',
        'get_subject_mastery','increment_streak','mark_all_notifications_read',
        'recalc_pilot_hours','record_daily_activity','unread_notifications_count',
        'vault_cleanup_expired_sessions','vault_list_subjects','vault_start_quiz',
        'vault_submit_answer'
      )
  loop
    execute format('revoke execute on function %s from public, anon', fn.sig);
    execute format('grant execute on function %s to authenticated, service_role', fn.sig);
  end loop;

  for fn in
    select p.oid::regprocedure as sig
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.prosecdef
      and p.proname in (
        'trigger_check_achievements','trigger_check_achievements_pilot',
        'trigger_notify_achievement','trigger_recalc_pilot_hours'
      )
  loop
    execute format('revoke execute on function %s from public, anon, authenticated', fn.sig);
  end loop;
end $$;
