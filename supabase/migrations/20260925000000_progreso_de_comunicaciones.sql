-- Módulo Comunicaciones aeronáuticas y gestión ATC: progreso y catálogo.
--
-- Es la parte de progreso de 20260916000000_progreso_de_aeropuertos.sql, y
-- solo esa: la tabla, su RPC, la fila del catálogo y el umbral de lección.
--
-- Lo que NO hace, a propósito:
--
-- - No toca panel_tarjetas. El módulo todavía no está en la lista del panel
--   (src/lib/modulosAerolinea.ts) porque no tiene práctica ni evaluación, y
--   reescribir esa función entera para una tarjeta que el cliente no pinta
--   sería el mismo riesgo que ya pasó con Aeropuertos (la que corre última
--   borra lo de la otra).
-- - No toca private.secciones_leidas, private.practicas_hechas,
--   private.desbloquear_logros ni check_and_unlock_achievements. Sin logros del
--   módulo nadie cuenta sus lecciones del lado del servidor todavía; la rama de
--   'comunicaciones' entra en esas funciones con la migración que traiga los
--   logros, partiendo de la versión que esté corriendo en la base.
-- - No toca modulos.json del lado del cliente: la fila del catálogo nace aquí.
--   Ver docs/COMUNICACIONES_ESTADO.md.
--
-- ORDEN: va DESPUÉS de los siete pasos de Aeropuertos
-- (docs/AEROPUERTOS_ESTADO.md). No depende de ellos (solo usa
-- modulos_contenido, module_thresholds y private.validar_marca_progreso, que
-- existen desde agosto y septiembre), pero así el historial queda en el orden
-- de los archivos.
--
-- Se puede correr dos veces: todo es `if not exists`, `on conflict` o
-- `create or replace`.

-- ── 1 · Progreso del módulo ────────────────────────────────────────────────

create table if not exists public.user_comunicaciones_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  lesson_screens smallint[] not null default '{}',
  practice_done text[] not null default '{}',
  updated_at timestamptz not null default now()
);

-- La clave foránea es la primaria: su índice ya está.

alter table public.user_comunicaciones_progress enable row level security;

-- Solo lectura de lo propio. Escribir es exclusivo de la RPC, que valida
-- contra el catálogo: sin esto, cualquiera podría marcarse el módulo entero.
drop policy if exists comunicaciones_progress_select_own on public.user_comunicaciones_progress;
create policy comunicaciones_progress_select_own
  on public.user_comunicaciones_progress
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

revoke all on table public.user_comunicaciones_progress from anon, authenticated;
grant select on table public.user_comunicaciones_progress to authenticated;

-- ── 2 · Catálogo de contenido ──────────────────────────────────────────────
--
-- Sesenta y nueve lecciones (los 68 capítulos y el repaso de las 50 frases) y
-- ninguna clave de práctica, porque la práctica no existe todavía: la RPC
-- rechaza cualquier practice_id hasta que la haya. Es contra esto que valida.
--
-- La fila nace aquí sin práctica. Desde que el módulo entró a
-- contenido/catalogo/modulos.json (con la práctica, 24-sep-2026), la mantiene
-- al día `node scripts/catalogo/sembrar.mjs comunicaciones`, que es upsert: el
-- `on conflict` de abajo solo importa si esto se vuelve a correr después (y
-- entonces hay que volver a sembrar el catálogo). El número de lecciones lo
-- vigila src/lib/leccionesConteo.test.ts contra el contenido.

insert into public.modulos_contenido (modulo, lecciones, practicas)
values ('comunicaciones', 69, '{}'::text[])
on conflict (modulo) do update set
  lecciones = excluded.lecciones,
  practicas = excluded.practicas,
  actualizado_en = now();

-- ── 3 · Umbral, que documenta la constante del front ──────────────────────

insert into public.module_thresholds (code, total, nota) values
  ('comunicaciones_lesson', 69, 'CM_LECTURA_TOTAL de src/lib/comunicaciones.ts (68 capítulos y el repaso, en 8 niveles)')
on conflict (code) do update set total = excluded.total, nota = excluded.nota;

-- ── 4 · Marcar progreso ────────────────────────────────────────────────────
--
-- Copia fiel de aeropuertos_mark_progress: valida contra el catálogo y agrega
-- sin duplicar, así que repetir la llamada no cambia nada.

create or replace function public.comunicaciones_mark_progress(
  p_lesson_screen smallint default null,
  p_practice_id text default null
)
returns public.user_comunicaciones_progress
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_row public.user_comunicaciones_progress;
begin
  if auth.uid() is null then
    raise exception 'no authenticated user';
  end if;
  perform private.validar_marca_progreso('comunicaciones', p_lesson_screen, p_practice_id);

  insert into public.user_comunicaciones_progress (user_id, lesson_screens, practice_done, updated_at)
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
        public.user_comunicaciones_progress.lesson_screens ||
        case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end
      ) as s
    ),
    practice_done = (
      select coalesce(array_agg(distinct p order by p), '{}'::text[])
      from unnest(
        public.user_comunicaciones_progress.practice_done ||
        case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end
      ) as p
    ),
    updated_at = now()
  returning * into v_row;

  return v_row;
end
$function$;

revoke all on function public.comunicaciones_mark_progress(smallint, text) from public, anon;
grant execute on function public.comunicaciones_mark_progress(smallint, text) to authenticated;
