-- ============================================================================
-- UN TIPO DE AVISO MÁS: RESPONDIERON EN EL FORO
-- ============================================================================
--
-- Va solo en su migración porque `alter type … add value` no puede usarse en la
-- misma transacción en la que se agrega: las funciones del foro que lo
-- escriben están en la migración siguiente (20261003010000).
--
-- Es el aviso de «comentaron tu publicación» o «respondieron tu comentario».
-- Ninguno de los que hay le sirve: community_mention habla de menciones, que
-- el foro no tiene.
--
-- NO SE HA APLICADO. No toca filas.
-- ============================================================================

alter type public.notification_type add value if not exists 'foro_respuesta';
