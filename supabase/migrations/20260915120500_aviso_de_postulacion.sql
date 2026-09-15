-- ============================================================================
-- UN TIPO DE AVISO MÁS: EL SEGUIMIENTO DE UNA POSTULACIÓN
-- ============================================================================
--
-- Va solo en su migración porque `alter type … add value` no puede usarse en la
-- misma transacción en la que se agrega: la función que lo escribe está en la
-- migración siguiente.
--
-- No encaja en ninguno de los que hay. No es una racha en riesgo ni una meta
-- cerca: es «registraste esto hace tres semanas, ¿en qué quedó?».
-- ============================================================================

alter type public.notification_type add value if not exists 'postulacion_seguimiento';
