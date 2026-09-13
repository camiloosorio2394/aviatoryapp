-- =============================================================================
-- UN TIPO DE AVISO MÁS: EL RECORDATORIO DEL PLAN
-- =============================================================================
--
-- Va solo en su migración porque `alter type … add value` no puede usarse en la
-- misma transacción en la que se agrega: las funciones que lo escriben están en
-- la migración siguiente.
--
-- Los seis tipos que ya existían no cubren esto. `streak_at_risk` es «se te cae
-- la racha», que es una pérdida; este es «hoy es uno de los días que elegiste»,
-- que es un acuerdo. No son lo mismo y no deben leerse igual.

alter type public.notification_type add value if not exists 'plan_reminder';
