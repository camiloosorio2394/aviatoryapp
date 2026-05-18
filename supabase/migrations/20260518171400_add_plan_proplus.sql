-- AviatorYapp — Agregar valores Pro+ al enum subscription_plan
-- (Postgres no permite usar nuevos valores enum en la misma transacción donde
-- se agregan, así que esto va en una migración propia que se commitea antes.)

alter type public.subscription_plan add value if not exists 'pro_plus_monthly';
alter type public.subscription_plan add value if not exists 'pro_plus_annual';
