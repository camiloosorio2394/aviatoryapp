-- ============================================================================
-- VAULT QUESTION BANK — 5 capas de defensa contra exfiltración de contenido
-- ============================================================================
-- Filosofía: el banco de preguntas es el activo competitivo principal. Es
-- imposible impedir que un usuario individual vea preguntas (las paga). El
-- objetivo es subir DRASTICAMENTE el costo de scraping/exfiltración masiva.
--
-- Capa 1 — Encriptación at-rest con pgcrypto + master key en Supabase Vault.
-- Capa 2 — RLS bloquea SELECT directo. Solo RPCs definidas pueden tocar.
-- Capa 3 — La respuesta correcta jamás sale al cliente antes del submit.
-- Capa 4 — Sessions con tokens efímeros (15 min). El cliente nunca ve los
--           question_id reales — solo posiciones dentro de la sesión.
-- Capa 5 — Rate limiting + audit log para detección de patrones de scraping.
-- ============================================================================

-- pgcrypto para encriptación simétrica AES + funciones de PGP
create extension if not exists pgcrypto;

-- Schema privado para funciones internas que NO deben ser callable por el cliente.
-- Postgres por default deja schemas privados con USAGE solo para postgres role.
create schema if not exists private;

-- ============================================================================
-- TABLAS
-- ============================================================================

-- Banco principal: textos encriptados, metadata en claro para filtrado.
create table if not exists public.vault_questions (
  id uuid primary key default gen_random_uuid(),         -- UUID, no secuencial
  subject_slug text not null,                             -- 'aerodinamica', 'meteorologia', etc.
  module text not null default 'pca'                      -- 'pca' | 'airline_prep' | 'icao' | ...
    check (module in ('pca','airline_prep','icao','psych','interview_sim','library')),
  external_id int,                                        -- número original del banco oficial (referencia)
  difficulty smallint default 2 check (difficulty between 1 and 5),
  tags text[] default '{}',                               -- ej: ['factor-de-carga','giros']
  exam_year int,                                          -- año del examen oficial si aplica

  -- Campos encriptados (bytea). Nunca se exponen sin pasar por private.vault_decrypt
  question_enc bytea not null,
  options_enc bytea not null,                              -- jsonb encriptado
  correct_answer_enc bytea not null,                       -- 'a'|'b'|'c'|'d'
  explanation_enc bytea not null,
  pedagogical_note_enc bytea,                              -- nota opcional (ej: "el banco oficial tiene un error técnico, pero usa esta respuesta")

  -- Metadata
  is_active boolean default true,
  source text default 'uaeac_pca',                         -- origen para auditar
  batch_name text,                                         -- 'aerodinamica-batch1'
  inserted_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_vault_questions_subject on public.vault_questions(subject_slug, module) where is_active;
create index if not exists idx_vault_questions_tags on public.vault_questions using gin(tags) where is_active;
create index if not exists idx_vault_questions_external on public.vault_questions(subject_slug, external_id);

-- Sesiones de quiz: cada call a start_quiz_session crea una con su token.
-- Cliente solo ve el token + N preguntas ordenadas por posición. Nunca los IDs.
create table if not exists public.vault_sessions (
  token uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_slug text,
  module text,
  question_ids uuid[] not null,                            -- internal, no expuesto al cliente
  answers_given text[] default '{}'::text[],
  correct_count int default 0,
  started_at timestamptz default now(),
  expires_at timestamptz default now() + interval '20 minutes',
  completed_at timestamptz
);

create index if not exists idx_vault_sessions_user on public.vault_sessions(user_id, started_at desc);
create index if not exists idx_vault_sessions_expires on public.vault_sessions(expires_at) where completed_at is null;

-- Audit log para rate limiting y detección de scraping.
create table if not exists public.vault_access_log (
  id bigint generated always as identity primary key,
  user_id uuid not null,
  question_id uuid,
  access_type text not null check (access_type in ('request','submit','retry')),
  session_token uuid,
  accessed_at timestamptz default now(),
  ip_hint text                                             -- opcional, lo puede pasar la edge function
);

create index if not exists idx_vault_access_user_time on public.vault_access_log(user_id, accessed_at desc);

-- ============================================================================
-- FUNCIONES PRIVADAS (security definer, no callable por authenticated)
-- ============================================================================

-- Devuelve la master key. Vive en Supabase Vault, NO en código.
-- Si no existe en vault, la función falla — Cami/Nico deben crear el secret
-- antes de aplicar la migración: Settings → Vault → New Secret
--   name:  vault_questions_master_key
--   value: <hex string de 256 bits aleatorios>
create or replace function private.get_master_key()
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_key text;
begin
  select decrypted_secret into v_key
  from vault.decrypted_secrets
  where name = 'vault_questions_master_key'
  limit 1;

  if v_key is null then
    raise exception 'vault_questions_master_key no está configurada en Supabase Vault'
      using hint = 'Settings → Vault → Add new secret → name: vault_questions_master_key';
  end if;

  return v_key;
end $$;

-- Descifra una pregunta completa. SOLO callable desde funciones privadas
-- u otras RPCs security definer.
create or replace function private.vault_decrypt(p_question_id uuid)
returns table (
  question text,
  options jsonb,
  correct_answer text,
  explanation text,
  pedagogical_note text
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_key text := private.get_master_key();
begin
  return query
  select
    extensions.pgp_sym_decrypt(question_enc, v_key),
    extensions.pgp_sym_decrypt(options_enc, v_key)::jsonb,
    extensions.pgp_sym_decrypt(correct_answer_enc, v_key),
    extensions.pgp_sym_decrypt(explanation_enc, v_key),
    case when pedagogical_note_enc is null then null
         else extensions.pgp_sym_decrypt(pedagogical_note_enc, v_key) end
  from public.vault_questions
  where id = p_question_id and is_active;
end $$;

-- Inserta una pregunta encriptando inline. Para el script de seed.
-- Callable por service_role (script local) o por admin con role adecuado.
create or replace function private.vault_insert(
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

-- ============================================================================
-- RPCs PÚBLICAS — el único contrato que el cliente puede tocar
-- ============================================================================

-- Inicia una sesión de quiz. Devuelve token + preguntas SIN respuesta correcta.
-- Rate-limited a 100 preguntas/hora/usuario.
create or replace function public.vault_start_quiz(
  p_subject_slug text default null,
  p_module text default 'pca',
  p_count int default 10,
  p_difficulty smallint default null
)
returns table (
  token uuid,
  question_count int,
  expires_at timestamptz,
  questions jsonb
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_recent_count int;
  v_token uuid := gen_random_uuid();
  v_question_ids uuid[];
  v_questions jsonb;
  v_expires_at timestamptz := now() + interval '20 minutes';
begin
  if v_user_id is null then
    raise exception 'unauthorized';
  end if;

  if p_count < 1 or p_count > 20 then
    raise exception 'invalid_count';
  end if;

  -- Rate limit: max 100 preguntas pedidas en la última hora
  select count(*) into v_recent_count
  from public.vault_access_log
  where user_id = v_user_id
    and access_type = 'request'
    and accessed_at > now() - interval '1 hour';

  if v_recent_count + p_count > 100 then
    raise exception 'rate_limit_exceeded'
      using hint = 'Máximo 100 preguntas por hora. Esperá unos minutos y probá de nuevo.';
  end if;

  -- Selección random de preguntas activas
  select array_agg(id) into v_question_ids
  from (
    select id from public.vault_questions
    where is_active
      and (p_subject_slug is null or subject_slug = p_subject_slug)
      and module = p_module
      and (p_difficulty is null or difficulty = p_difficulty)
    order by random()
    limit p_count
  ) q;

  if v_question_ids is null or array_length(v_question_ids, 1) = 0 then
    raise exception 'no_questions_available';
  end if;

  -- Crear la sesión
  insert into public.vault_sessions (token, user_id, subject_slug, module, question_ids, expires_at)
  values (v_token, v_user_id, p_subject_slug, p_module, v_question_ids, v_expires_at);

  -- Armar el payload SIN respuesta correcta ni explicación.
  -- El cliente solo ve: posición (1..N), texto, opciones. Y el token.
  select jsonb_agg(
    jsonb_build_object(
      'position', q.idx,
      'question', d.question,
      'options', d.options
    ) order by q.idx
  )
  into v_questions
  from unnest(v_question_ids) with ordinality as q(qid, idx)
  cross join lateral private.vault_decrypt(q.qid) d;

  -- Log de access para rate limiting
  insert into public.vault_access_log (user_id, question_id, access_type, session_token)
  select v_user_id, qid, 'request', v_token from unnest(v_question_ids) as qid;

  return query select v_token, array_length(v_question_ids, 1), v_expires_at, v_questions;
end $$;

-- Submit de una respuesta para una posición dada. Valida server-side.
-- Devuelve si fue correcta + la respuesta correcta + explicación.
create or replace function public.vault_submit_answer(
  p_token uuid,
  p_position int,
  p_answer text
)
returns table (
  is_correct boolean,
  correct_answer text,
  explanation text,
  pedagogical_note text,
  questions_remaining int
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_session public.vault_sessions%rowtype;
  v_question_id uuid;
  v_correct text;
  v_explanation text;
  v_note text;
  v_is_correct boolean;
  v_remaining int;
begin
  if v_user_id is null then
    raise exception 'unauthorized';
  end if;

  select * into v_session
  from public.vault_sessions
  where token = p_token and user_id = v_user_id;

  if v_session.token is null then raise exception 'session_not_found'; end if;
  if v_session.expires_at < now() then raise exception 'session_expired'; end if;
  if v_session.completed_at is not null then raise exception 'session_completed'; end if;
  if p_position < 1 or p_position > array_length(v_session.question_ids, 1) then
    raise exception 'invalid_position';
  end if;

  v_question_id := v_session.question_ids[p_position];

  -- Descifrar SOLO los campos sensibles. La respuesta correcta nunca viajó al cliente antes.
  select d.correct_answer, d.explanation, d.pedagogical_note
  into v_correct, v_explanation, v_note
  from private.vault_decrypt(v_question_id) d;

  v_is_correct := lower(trim(p_answer)) = lower(trim(v_correct));

  -- Append answer al array de la sesión (acumula histórico)
  update public.vault_sessions
  set answers_given = answers_given || lower(trim(p_answer)),
      correct_count = correct_count + case when v_is_correct then 1 else 0 end,
      completed_at = case
        when array_length(answers_given, 1) is null then null
        when array_length(answers_given, 1) + 1 >= array_length(question_ids, 1) then now()
        else null
      end
  where token = p_token;

  -- Log
  insert into public.vault_access_log (user_id, question_id, access_type, session_token)
  values (v_user_id, v_question_id, 'submit', p_token);

  v_remaining := array_length(v_session.question_ids, 1) - (coalesce(array_length(v_session.answers_given, 1), 0) + 1);

  return query select v_is_correct, v_correct, v_explanation, v_note, greatest(v_remaining, 0);
end $$;

-- ============================================================================
-- RLS
-- ============================================================================
alter table public.vault_questions enable row level security;
alter table public.vault_sessions enable row level security;
alter table public.vault_access_log enable row level security;

-- vault_questions: SIN policies = nadie puede SELECT/INSERT/UPDATE/DELETE
-- desde el cliente. Solo las funciones security definer en `private` pueden
-- tocar la tabla. Esto significa que aunque un atacante tenga el anon key,
-- no puede hacer `select * from vault_questions`.

-- vault_sessions: el usuario solo puede ver SUS sesiones.
create policy "vault_sessions_own_select" on public.vault_sessions
  for select to authenticated using (user_id = auth.uid());

-- vault_access_log: el usuario solo puede ver SU log.
create policy "vault_access_log_own_select" on public.vault_access_log
  for select to authenticated using (user_id = auth.uid());

-- ============================================================================
-- LIMPIEZA AUTOMATICA: sesiones expiradas
-- ============================================================================
-- Función para borrar sesiones expiradas (puede correr en cron de Supabase).
create or replace function public.vault_cleanup_expired_sessions()
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_deleted int;
begin
  delete from public.vault_sessions
  where expires_at < now() - interval '7 days';
  get diagnostics v_deleted = row_count;
  return v_deleted;
end $$;

comment on function public.vault_cleanup_expired_sessions() is
  'Borra sesiones expiradas hace más de 7 días. Sugerido correr diario via pg_cron.';

-- ============================================================================
-- GRANTS
-- ============================================================================
-- Las RPCs públicas son callables por authenticated.
grant execute on function public.vault_start_quiz(text, text, int, smallint) to authenticated;
grant execute on function public.vault_submit_answer(uuid, int, text) to authenticated;

-- Las funciones privadas NO tienen grant para authenticated — solo service_role
-- (que la usa el script de seed local) puede llamarlas.
grant execute on function private.vault_insert(
  text, text, text, jsonb, text, text, text, int, smallint, text[], int, text, text
) to service_role;
grant execute on function private.vault_decrypt(uuid) to service_role;
grant execute on function private.get_master_key() to service_role;

-- Service role también puede manipular vault_questions directamente para mantenimiento.
grant all on public.vault_questions to service_role;
grant all on public.vault_sessions to service_role;
grant all on public.vault_access_log to service_role;
