-- ============================================================================
-- TEA Parte 1: lo que el piloto dice, en texto
--
-- Guarda la transcripción de las respuestas habladas de la Parte 1 del TEA.
--
-- NO GUARDA AUDIO, y no es un descuido: el reconocimiento lo hace el navegador
-- mandando el audio a Google o a Apple, y a Aviatory solo llega el texto. Es lo
-- que se le promete al piloto en el consentimiento y es lo que hay que cumplir.
--
-- Tabla propia y no `interview_sim_recordings`: esa es del módulo Simulador de
-- entrevistas (/app/entrevistas), que es otro producto.
-- ============================================================================

create table if not exists public.user_icao_speaking (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  -- Parte del TEA. Hoy siempre 1; queda abierto para cuando entren las otras.
  parte       smallint not null default 1,
  -- El id de la pregunta dentro de TEA_PART1_SETS, con la forma "s1-q3".
  question_id text not null,
  transcript  text not null,
  palabras    int  not null default 0,
  segundos    int  not null default 0,
  -- Media de la confianza que reporta el reconocedor, de 0 a 1.
  confianza   numeric,
  -- Qué motor lo transcribió. Es lo que va a permitir comparar Web Speech
  -- contra Whisper el día que se pruebe, sin migrar nada.
  motor       text not null default 'webspeech',
  created_at  timestamptz not null default now()
);

comment on table public.user_icao_speaking is
  'Transcripciones de las respuestas habladas del TEA. Solo texto: el audio no se almacena en ninguna parte.';

create index if not exists idx_icao_speaking_user
  on public.user_icao_speaking (user_id, created_at desc);

alter table public.user_icao_speaking enable row level security;

drop policy if exists "icao_speaking_select_own" on public.user_icao_speaking;
create policy "icao_speaking_select_own" on public.user_icao_speaking
  for select using (auth.uid() = user_id);

drop policy if exists "icao_speaking_insert_own" on public.user_icao_speaking;
create policy "icao_speaking_insert_own" on public.user_icao_speaking
  for insert with check (auth.uid() = user_id);

-- El borrado propio es a propósito: si el piloto quiere retirar lo que dijo,
-- tiene que poder hacerlo.
drop policy if exists "icao_speaking_delete_own" on public.user_icao_speaking;
create policy "icao_speaking_delete_own" on public.user_icao_speaking
  for delete using (auth.uid() = user_id);
