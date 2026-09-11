-- ============================================================================
-- Comunidad: se quita get_profile_avatars.
--
-- La reemplazó comunidad_autores (20260911210000), que además trae la racha.
-- Se aplica con la app publicada ya usando la nueva (verificado en el trozo
-- CommunityChannel de producción). Ninguna función ni vista la usa. No toca filas.
-- ============================================================================

drop function if exists public.get_profile_avatars(uuid[]);
