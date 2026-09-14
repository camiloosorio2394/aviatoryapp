-- ============================================================================
-- Un latido para que Supabase no duerma el proyecto.
--
-- El plan gratis pausa los proyectos sin actividad. Antes del lanzamiento la
-- app tiene días enteros sin nadie dentro, así que hace falta un pedido
-- periódico que toque la base de verdad. Lo hace un cron de GitHub Actions
-- (.github/workflows/latido-supabase.yml) llamando a este RPC.
--
-- Por qué una función propia y no reutilizar otra: la única función abierta a
-- anon es check_username_available, y esa consulta profiles y puede quedar
-- restringida más adelante. Colgar de ella el latido lo dejaría roto en
-- silencio. Esta no lee ninguna tabla y no revela nada: devuelve la hora del
-- servidor, que es justamente lo que se quiere comprobar.
--
-- security invoker a propósito: no necesita privilegios de nadie.
-- ============================================================================

create or replace function public.latido()
returns timestamptz
language sql
stable
security invoker
set search_path = ''
as $$
  select now()
$$;

comment on function public.latido() is
  'Devuelve la hora del servidor. Existe para que el cron de GitHub Actions genere actividad y Supabase no pause el proyecto por inactividad.';

revoke all on function public.latido() from public;
grant execute on function public.latido() to anon, authenticated;
