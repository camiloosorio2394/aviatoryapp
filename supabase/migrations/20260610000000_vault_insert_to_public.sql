-- ============================================================================
-- Mueve vault_insert del schema `private` al `public` para que PostgREST
-- lo pueda exponer al script de seed (supabase-js → /rpc/vault_insert).
-- ============================================================================
-- PostgREST por default expone funciones del schema `public`. La función
-- en `private` era inalcanzable desde supabase-js. El error era:
--   Could not find the function public.vault_insert(...) in the schema cache
--
-- Seguridad:
--   - La función queda `security definer` → ejecuta con permisos del owner
--   - REVOKE de PUBLIC para evitar exposición accidental
--   - GRANT solo a service_role (el script local usa service_role JWT)
--   - authenticated/anon NO pueden llamarla
-- ============================================================================

-- Re-crear en public (idéntica a la de private).
create or replace function public.vault_insert(
  p_subject_slug text,
  p_module text,
  p_question text,
  p_options jsonb,
  p_correct_answer text,
  p_explanation text,
  p_pedagogical_note text default null,
  p_external_id int default null,
  p_difficulty smallint default 2,
  p_tags text[] default '{}'::text[],
  p_exam_year int default null,
  p_source text default 'uaeac_pca',
  p_batch_name text default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_key text := private.get_master_key();
  v_id uuid;
begin
  insert into public.vault_questions (
    subject_slug, module, external_id, difficulty, tags, exam_year,
    question_enc, options_enc, correct_answer_enc, explanation_enc,
    pedagogical_note_enc, source, batch_name
  )
  values (
    p_subject_slug, p_module, p_external_id, p_difficulty, p_tags, p_exam_year,
    extensions.pgp_sym_encrypt(p_question, v_key),
    extensions.pgp_sym_encrypt(p_options::text, v_key),
    extensions.pgp_sym_encrypt(lower(p_correct_answer), v_key),
    extensions.pgp_sym_encrypt(p_explanation, v_key),
    case when p_pedagogical_note is null then null
         else extensions.pgp_sym_encrypt(p_pedagogical_note, v_key) end,
    p_source, p_batch_name
  )
  returning id into v_id;

  return v_id;
end $$;

-- Cleanup: revoke público (por las dudas) y grant solo a service_role.
revoke all on function public.vault_insert(
  text, text, text, jsonb, text, text, text, int, smallint, text[], int, text, text
) from public;

grant execute on function public.vault_insert(
  text, text, text, jsonb, text, text, text, int, smallint, text[], int, text, text
) to service_role;

-- Borrar la versión en `private` (redundante).
drop function if exists private.vault_insert(
  text, text, text, jsonb, text, text, text, int, smallint, text[], int, text, text
);

comment on function public.vault_insert(
  text, text, text, jsonb, text, text, text, int, smallint, text[], int, text, text
) is 'Inserta una pregunta encriptando server-side con la master key del Vault. Callable solo por service_role. Usado por scripts/seed-questions.mjs.';
