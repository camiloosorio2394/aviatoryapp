-- ============================================================================
-- vault_list_subjects — RPC para que el frontend descubra qué materias tienen
-- contenido cargado (sin exponer el contenido en sí).
-- ============================================================================
-- Devuelve subject_slug + count por módulo. Permite a la página /app/pca
-- (y futuro /app/airline-prep, /app/icao, etc.) mostrar las materias
-- disponibles con su número de preguntas, sin tocar `vault_questions`
-- directamente (RLS-blocked para authenticated).
-- ============================================================================

create or replace function public.vault_list_subjects(
  p_module text default 'pca'
)
returns table (
  subject_slug text,
  question_count int
)
language plpgsql
security definer
set search_path = ''
as $$
begin
  return query
  select
    vq.subject_slug,
    count(*)::int as question_count
  from public.vault_questions vq
  where vq.module = p_module and vq.is_active
  group by vq.subject_slug
  order by vq.subject_slug;
end $$;

revoke all on function public.vault_list_subjects(text) from public;
grant execute on function public.vault_list_subjects(text) to authenticated;

comment on function public.vault_list_subjects(text) is
  'Lista materias disponibles + count para un módulo. No expone contenido. Callable por authenticated.';
