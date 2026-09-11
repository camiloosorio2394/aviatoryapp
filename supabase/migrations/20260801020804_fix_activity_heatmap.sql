-- ============================================================================
-- Repara get_activity_heatmap.
--
-- APLICADA en produccion el 31 jul 2026 desde la sesion de Camilo (MCP).
--
-- Bug: generate_series con interval devuelve timestamp, y el select no
-- casteaba a date mientras la funcion declara `returns table (date date, ...)`.
-- Error 42804. Con daily_activity vacia nunca se notaba; con la primera fila
-- real la RPC explota y el dashboard se tragaba el error mostrando ceros.
--
-- Verificado insertando una fila real: 82 filas devueltas sin error.
--
-- DIFERENCIA respecto al borrador de la sesion de Nico: aquel calculaba el
-- rango con current_date a secas, y eso reintroduce el desfase de zona horaria
-- que se acababa de corregir en la racha y en Vencimientos. En Colombia, "hoy"
-- en UTC ya es manana desde las 19:00 local. Se conserva America/Bogota, que
-- es lo que hacia la version original de la funcion.
--
-- El rango arranca en lunes para que la rejilla del heatmap cuadre por semanas
-- completas, que era la mejora que traia el borrador.
-- ============================================================================

create or replace function public.get_activity_heatmap()
returns table (date date, activities_count integer, questions_answered integer)
language sql
security definer
set search_path = ''
as $$
  with hoy as (
    select (now() at time zone 'America/Bogota')::date as d
  ),
  inicio as (
    select (h.d - interval '11 weeks')::date
           - (extract(isodow from (h.d - interval '11 weeks'))::integer - 1) as d
    from hoy h
  )
  select
    g.g::date as date,
    coalesce(a.activities_count, 0)::integer as activities_count,
    coalesce(a.questions_answered, 0)::integer as questions_answered
  from inicio i, hoy h,
       generate_series(i.d::timestamp, h.d::timestamp, interval '1 day') as g(g)
  left join public.daily_activity a
    on a.date = g.g::date
   and a.user_id = auth.uid()
  order by 1
$$;

comment on function public.get_activity_heatmap() is
  'Serie diaria de actividad de las ultimas 12 semanas del usuario autenticado, en hora de Colombia, con ceros en los dias sin actividad.';

-- Trampa conocida: create or replace restaura EXECUTE a PUBLIC.
revoke all on function public.get_activity_heatmap() from public, anon;
grant execute on function public.get_activity_heatmap() to authenticated, service_role;
