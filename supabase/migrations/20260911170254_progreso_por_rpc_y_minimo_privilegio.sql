-- ============================================================================
-- Progreso de módulo solo por su función, con límites, y permisos que ninguna
-- política usa fuera del cliente.
--
-- 1. user_notam_progress, user_metar_progress y user_mercancias_progress tenían
--    políticas de INSERT y UPDATE propias, además de las funciones
--    *_mark_progress. La app solo usa las funciones, pero con las políticas
--    cualquiera podía escribir directo sus arreglos: marcar lecciones que no
--    existen, o crecerlos sin fin. Se quitan; la escritura queda en las
--    funciones (security definer), que ahora validan lo que reciben.
--
-- 2. Las funciones *_mark_progress aceptaban cualquier número de lección y
--    cualquier texto como práctica. Ahora: lección de 1 a 60, id de práctica de
--    1 a 80 caracteres y como mucho 500 prácticas por piloto. Los datos de hoy
--    están muy por debajo (lección 18, 2 prácticas, ids de 5 caracteres).
--
-- 3. Permisos sin política detrás: la tabla concedía INSERT, UPDATE o DELETE
--    que ninguna política permite. RLS ya los bloqueaba; se retiran para que
--    lo concedido diga lo mismo que las políticas. anon no escribe en ninguna
--    tabla (todas las políticas de escritura exigen auth.uid()), así que pierde
--    INSERT, UPDATE y DELETE en todas, hoy y en las que se creen.
--
-- No toca filas.
-- ============================================================================


-- ─── 1. Progreso: sin escritura directa ─────────────────────────────────────
drop policy if exists notam_progress_insert_own on public.user_notam_progress;
drop policy if exists notam_progress_update_own on public.user_notam_progress;
drop policy if exists metar_progress_insert_own on public.user_metar_progress;
drop policy if exists metar_progress_update_own on public.user_metar_progress;
drop policy if exists mercancias_progress_insert_own on public.user_mercancias_progress;
drop policy if exists mercancias_progress_update_own on public.user_mercancias_progress;

revoke insert, update, delete on table
  public.user_notam_progress,
  public.user_metar_progress,
  public.user_mercancias_progress
from anon, authenticated;


-- ─── 2. Funciones de progreso con límites ───────────────────────────────────
create or replace function public.notam_mark_progress(p_lesson_screen smallint default null, p_practice_id text default null)
returns public.user_notam_progress
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.user_notam_progress;
begin
  if auth.uid() is null then
    raise exception 'no authenticated user';
  end if;
  if p_lesson_screen is not null and p_lesson_screen not between 1 and 60 then
    raise exception 'leccion_invalida' using errcode = '22023';
  end if;
  if p_practice_id is not null and char_length(p_practice_id) not between 1 and 80 then
    raise exception 'practica_invalida' using errcode = '22023';
  end if;
  if p_practice_id is not null and exists (
    select 1 from public.user_notam_progress
    where user_id = auth.uid() and cardinality(practice_done) >= 500 and not (p_practice_id = any (practice_done))
  ) then
    raise exception 'limite_practicas' using errcode = 'P0001';
  end if;

  insert into public.user_notam_progress (user_id, lesson_screens, practice_done, updated_at)
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
        public.user_notam_progress.lesson_screens ||
        case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end
      ) as s
    ),
    practice_done = (
      select coalesce(array_agg(distinct p order by p), '{}'::text[])
      from unnest(
        public.user_notam_progress.practice_done ||
        case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end
      ) as p
    ),
    updated_at = now()
  returning * into v_row;

  return v_row;
end
$$;

create or replace function public.metar_mark_progress(p_lesson_screen smallint default null, p_practice_id text default null)
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
  if p_lesson_screen is not null and p_lesson_screen not between 1 and 60 then
    raise exception 'leccion_invalida' using errcode = '22023';
  end if;
  if p_practice_id is not null and char_length(p_practice_id) not between 1 and 80 then
    raise exception 'practica_invalida' using errcode = '22023';
  end if;
  if p_practice_id is not null and exists (
    select 1 from public.user_metar_progress
    where user_id = auth.uid() and cardinality(practice_done) >= 500 and not (p_practice_id = any (practice_done))
  ) then
    raise exception 'limite_practicas' using errcode = 'P0001';
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
end
$$;

create or replace function public.mercancias_mark_progress(p_lesson_screen smallint default null, p_practice_id text default null)
returns public.user_mercancias_progress
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.user_mercancias_progress;
begin
  if auth.uid() is null then
    raise exception 'no authenticated user';
  end if;
  if p_lesson_screen is not null and p_lesson_screen not between 1 and 60 then
    raise exception 'leccion_invalida' using errcode = '22023';
  end if;
  if p_practice_id is not null and char_length(p_practice_id) not between 1 and 80 then
    raise exception 'practica_invalida' using errcode = '22023';
  end if;
  if p_practice_id is not null and exists (
    select 1 from public.user_mercancias_progress
    where user_id = auth.uid() and cardinality(practice_done) >= 500 and not (p_practice_id = any (practice_done))
  ) then
    raise exception 'limite_practicas' using errcode = 'P0001';
  end if;

  insert into public.user_mercancias_progress (user_id, lesson_screens, practice_done, updated_at)
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
        public.user_mercancias_progress.lesson_screens ||
        case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end
      ) as s
    ),
    practice_done = (
      select coalesce(array_agg(distinct p order by p), '{}'::text[])
      from unnest(
        public.user_mercancias_progress.practice_done ||
        case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end
      ) as p
    ),
    updated_at = now()
  returning * into v_row;

  return v_row;
end
$$;


-- ─── 3. Permisos que ninguna política usa ───────────────────────────────────
revoke update on table public.community_reactions from authenticated;
revoke update, delete on table public.content_reports from authenticated;
revoke update on table public.exam_report_topics from authenticated;
revoke delete on table public.pilot_state from authenticated;
revoke delete on table public.profiles from authenticated;
revoke insert, delete on table public.user_achievements from authenticated;
revoke update on table public.user_icao_speaking from authenticated;
revoke update on table public.checklist_progress from authenticated;
revoke delete on table public.airline_prep_real_cases from authenticated;

revoke insert, update, delete on all tables in schema public from anon;
alter default privileges for role postgres in schema public
  revoke insert, update, delete on tables from anon;
