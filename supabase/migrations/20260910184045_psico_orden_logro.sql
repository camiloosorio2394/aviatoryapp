-- ============================================================================
-- El logro de psicotécnicas deja de empatar con el de mercancías
--
-- `20260908010000_modulo_psicotecnicas.sql` le dio a `psico_simulacro` el
-- order_index 18. Cuando se escribió estaba libre: los cuatro logros de
-- mercancías (18 a 21) entraron con `20260909230000_mercancias_rediseno.sql`,
-- que se aplicó al día siguiente. Nadie hizo nada mal, se cruzaron las fechas.
--
-- El empate no rompe nada —no hay índice único sobre order_index— pero deja el
-- orden de esos dos logros a merced del planificador, que es exactamente lo que
-- la columna existe para evitar.
--
-- Va al 22 y no al 18: psicotécnicas es el módulo que llegó después.
--
-- No se toca la migración original. Ya está aplicada en producción, y una
-- migración aplicada no se reescribe: se corrige con otra.
-- ============================================================================

update public.achievements
   set order_index = 22
 where code = 'psico_simulacro'
   and order_index <> 22;
