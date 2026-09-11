-- Intentos de psicotécnicas: solo el servidor los escribe.
--
-- Desde 20260911140000 la nota la calcula psico_terminar (security definer),
-- que es la única que inserta en user_psico_attempts. Si el cliente conservara
-- el INSERT, cualquiera podría seguir guardándose un simulacro aprobado con una
-- llamada directa a la API. Queda la lectura de los intentos propios.
-- No se tocan filas.

drop policy if exists psico_insert_own on public.user_psico_attempts;

revoke all on table public.user_psico_attempts from anon, authenticated;
grant select on table public.user_psico_attempts to authenticated;
