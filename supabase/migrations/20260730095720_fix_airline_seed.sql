-- ============================================================================
-- Correccion del seed de aerolineas (auditoria 2026-07-30).
--
-- Dos datos que un piloto colombiano detecta al instante y que hacen dudar de
-- todo el resto del contenido:
--
-- 1) Viva Air ceso operaciones en febrero de 2023. Seguir ofreciendola como
--    objetivo de postulacion es el error mas delator del catalogo.
--    Se reemplaza por SATENA, que si opera y ya aparece en la landing.
-- 2) Avianca pedia la licencia "ME", pero el Perfil solo puede guardar "MEP",
--    asi que ese requisito era IMPOSIBLE de cumplir: el match de Avianca nunca
--    podia llegar a 100 por un problema de nomenclatura, no del piloto.
-- ============================================================================

-- 1) Requisito imposible: ME no existe como opcion en el Perfil, MEP si.
update public.airlines
set requirements = jsonb_set(
      requirements,
      '{licenses}',
      '["CPL","IFR","MEP"]'::jsonb
    )
where code = 'AVA'
  and requirements->'licenses' ? 'ME';

-- 2) Viva Air fuera del catalogo. Se limpian primero las referencias de
--    usuarios (con 4 usuarios hoy no deberia haber ninguna, pero la migracion
--    tiene que ser segura si la corren mas adelante en otro entorno).
delete from public.airline_targets
where airline_id in (select id from public.airlines where code = 'VIV');

delete from public.airlines where code = 'VIV';

-- 3) SATENA ocupa el lugar libre. Requisitos conservadores: es la puerta de
--    entrada mas realista para un piloto comercial colombiano recien salido.
-- La tabla airlines no tiene constraint unico en code, asi que el guard va con
-- NOT EXISTS para que la migracion sea idempotente.
insert into public.airlines (name, code, country, brand_color, requirements, order_index)
select 'SATENA', 'NSE', 'Colombia', '#004B87',
       '{"min_hours_total":500,"icao_english":4,"licenses":["CPL","IFR"]}'::jsonb, 6
where not exists (select 1 from public.airlines where code = 'NSE');
