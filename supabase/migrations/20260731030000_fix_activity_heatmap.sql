-- ============================================================================
-- Repara get_activity_heatmap.
--
-- PENDIENTE DE APLICAR (tercera en la cola; sesion de Nico, 31 jul 2026).
--
-- Bug encontrado en produccion: la funcion declara devolver date y su query
-- devuelve timestamp with time zone (error 42804, "structure of query does
-- not match function result type"). Con la tabla daily_activity vacia nunca
-- se notaba; con la primera fila real, la RPC explota y el dashboard se
-- tragaba el error mostrando el heatmap en cero.
--
-- El frontend ya NO depende de esta RPC (lee daily_activity directo con RLS
-- propio, ver src/lib/activity.ts), asi que aplicarla no es urgente, pero
-- deja la funcion sana para cualquier uso futuro.
-- ============================================================================

create or replace function public.get_activity_heatmap()
returns table (date date, activities_count integer, questions_answered integer)
language sql
security definer
set search_path = ''
as $$
  select
    d.d::date as date,
    coalesce(a.activities_count, 0)::integer as activities_count,
    coalesce(a.questions_answered, 0)::integer as questions_answered
  from generate_series(
    (current_date - interval '11 weeks')::date
      - ((extract(isodow from (current_date - interval '11 weeks'))::integer - 1)),
    current_date,
    interval '1 day'
  ) as d(d)
  left join public.daily_activity a
    on a.date = d.d::date
   and a.user_id = auth.uid()
  order by 1
$$;

comment on function public.get_activity_heatmap() is
  'Serie diaria de actividad de las ultimas 12 semanas del usuario autenticado, con ceros en los dias sin actividad.';

-- Trampa conocida: create or replace restaura EXECUTE a PUBLIC.
revoke all on function public.get_activity_heatmap() from public, anon;
grant execute on function public.get_activity_heatmap() to authenticated, service_role;
