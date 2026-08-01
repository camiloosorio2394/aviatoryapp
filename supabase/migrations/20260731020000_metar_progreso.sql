-- ============================================================================
-- Progreso del tema METAR (Meteorología operacional, modulo Ingreso a
-- Aerolinea). Espejo exacto del esquema de NOTAM.
--
-- APLICADA en produccion el 31 jul 2026 desde la sesion de Camilo (MCP).
-- La leccion METAR puede pasar ya de progreso local a local + base, con el
-- mismo puente que usa NOTAM (hidratacion y backfill).
-- ============================================================================

create table if not exists public.user_metar_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  -- indices (1..N) de las secciones de la leccion ya leidas
  lesson_screens smallint[] not null default '{}',
  -- ids de practica resuelta, para cuando la practica exista
  practice_done text[] not null default '{}',
  updated_at timestamptz not null default now()
);

comment on table public.user_metar_progress is
  'Progreso del usuario en el tema METAR: secciones de leccion leidas y practica resuelta.';

alter table public.user_metar_progress enable row level security;

drop policy if exists "metar_progress_select_own" on public.user_metar_progress;
create policy "metar_progress_select_own" on public.user_metar_progress
  for select using (auth.uid() = user_id);

drop policy if exists "metar_progress_insert_own" on public.user_metar_progress;
create policy "metar_progress_insert_own" on public.user_metar_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "metar_progress_update_own" on public.user_metar_progress;
create policy "metar_progress_update_own" on public.user_metar_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.metar_mark_progress(
  p_lesson_screen smallint default null,
  p_practice_id text default null
)
returns public.user_metar_progress
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.user_metar_progress;
begin
  if auth.uid() is null then
    raise exception 'no authenticated user';
  end if;

  insert into public.user_metar_progress (user_id, lesson_screens, practice_done, updated_at)
  values (
    auth.uid(),
    case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end,
    case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end,
    now()
  )
  on conflict (user_id) do update set
    lesson_screens = (
      select coalesce(array_agg(distinct s order by s), '{}'::smallint[])
      from unnest(
        public.user_metar_progress.lesson_screens ||
        case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end
      ) as s
    ),
    practice_done = (
      select coalesce(array_agg(distinct p order by p), '{}'::text[])
      from unnest(
        public.user_metar_progress.practice_done ||
        case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end
      ) as p
    ),
    updated_at = now()
  returning * into v_row;

  return v_row;
end $$;

comment on function public.metar_mark_progress(smallint, text) is
  'Marca una seccion de la leccion METAR o un ejercicio como completado. Idempotente.';

-- Trampa conocida: create or replace restaura EXECUTE a PUBLIC.
revoke all on function public.metar_mark_progress(smallint, text) from public, anon;
grant execute on function public.metar_mark_progress(smallint, text) to authenticated, service_role;
