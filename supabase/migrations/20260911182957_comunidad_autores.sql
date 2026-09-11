-- ============================================================================
-- Comunidad: nombre, foto y racha de los autores de una página de mensajes.
--
-- El canal pedía la racha de cada autor directo a `streaks`, pero su política
-- solo deja leer la propia: las demás volvían vacías, quedaban «pendientes» y
-- el efecto las volvía a pedir sin parar. Y el chip de racha nunca salía.
--
-- La racha ya es información de comunidad (get_peers_in_stage la muestra), así
-- que se entrega igual que el nombre y la foto: por una función definer que
-- pide sesión, con un tope de 100 autores por llamada. `streaks` sigue
-- legible solo por su dueño.
--
-- Reemplaza a get_profile_avatars, que se quita cuando la app publicada ya
-- use esta. No toca filas.
-- ============================================================================

create or replace function public.comunidad_autores(p_user_ids uuid[])
returns table(id uuid, username text, photo_url text, current_streak integer)
language sql
stable
security definer
set search_path = ''
as $$
  select p.id, p.username, p.photo_url, coalesce(s.current_streak, 0)
  from public.profiles p
  left join public.streaks s on s.user_id = p.id
  where (select auth.uid()) is not null
    and p.id = any (p_user_ids[1:100])
$$;

revoke all on function public.comunidad_autores(uuid[]) from public, anon;
grant execute on function public.comunidad_autores(uuid[]) to authenticated;
