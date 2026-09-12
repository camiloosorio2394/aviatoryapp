-- ============================================================================
-- Las horas de carrera son las de antes de Aviatory MÁS las de la bitácora.
--
-- Hallazgo de la auditoría con una cuenta de piloto de verdad: el disparador
-- `trg_recalc_hours` **sobrescribía** `pilot_state.total_hours` con la suma de
-- la bitácora. Un piloto que declaraba 240 horas en el onboarding y registraba
-- su primer vuelo de una hora pasaba a tener 2,5 horas totales, y las 240 no
-- volvían nunca. Para el piloto de esta app, que llega con carrera hecha y
-- quiere llegar a los mínimos de una aerolínea, eso es el dato que más importa:
-- su Pilot ID, su match de aerolíneas y su hoja de vida quedaban en 2,5 horas.
--
-- El modelo que queda:
--   horas_previas_*  lo que voló antes de Aviatory. Lo escribe el piloto.
--   flights          lo que registra dentro de Aviatory, vuelo a vuelo.
--   total_hours      la carrera completa: previas + bitácora. Ya NO se escribe
--                    a mano, la calcula la base.
--
-- Así la bitácora sirve para lo suyo (ir sumando y comparar por períodos) sin
-- dejar de contar la carrera profesional entera.
--
-- No borra filas. En producción hay un solo vuelo y es de la cuenta de QA, así
-- que ningún piloto real había perdido horas todavía.
-- ============================================================================

-- ─── 1. La carrera previa a Aviatory ────────────────────────────────────────

alter table public.pilot_state
  add column if not exists horas_previas_total numeric(7,1),
  add column if not exists horas_previas_pic numeric(7,1);

comment on column public.pilot_state.horas_previas_total is
  'Horas de vuelo anteriores a Aviatory, declaradas por el piloto. total_hours = esto + la bitácora.';

alter table public.pilot_state
  drop constraint if exists pilot_state_horas_previas_rango;
alter table public.pilot_state
  add constraint pilot_state_horas_previas_rango check (
    (horas_previas_total is null or horas_previas_total between 0 and 50000)
    and (horas_previas_pic is null or horas_previas_pic >= 0)
    and (horas_previas_pic is null or horas_previas_total is null or horas_previas_pic <= horas_previas_total)
  );

-- ─── 2. Lo que ya había declarado cada piloto pasa a ser su carrera previa ───

-- Sin vuelos en la bitácora, lo declarado es íntegramente carrera previa.
update public.pilot_state ps
set horas_previas_total = ps.total_hours,
    horas_previas_pic = ps.hours_pic
where ps.horas_previas_total is null
  and ps.total_hours is not null
  and not exists (select 1 from public.flights f where f.user_id = ps.user_id);

-- Con vuelos, el disparador viejo ya había pisado lo declarado con la suma de
-- la bitácora: la parte previa es lo que sobra, y nunca negativa.
update public.pilot_state ps
set horas_previas_total = greatest(coalesce(ps.total_hours, 0) - v.horas, 0),
    horas_previas_pic = greatest(coalesce(ps.hours_pic, 0) - v.pic, 0)
from (
  select f.user_id,
         round((coalesce(sum(f.total_minutes), 0) / 60.0)::numeric, 1) as horas,
         round((coalesce(sum(f.pic_minutes), 0) / 60.0)::numeric, 1) as pic
  from public.flights f
  group by f.user_id
) v
where v.user_id = ps.user_id
  and ps.horas_previas_total is null;

-- ─── 3. total_hours pasa a ser un dato calculado ────────────────────────────

-- Va en un disparador BEFORE: así el valor correcto se impone pase lo que pase,
-- también si un cliente viejo (o alguien desde la consola del navegador) manda
-- su propio total_hours. Antes eso se guardaba tal cual.
create or replace function public.pilot_state_horas_derivadas()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_total numeric;
  v_pic numeric;
begin
  select round((coalesce(sum(total_minutes), 0) / 60.0)::numeric, 1),
         round((coalesce(sum(pic_minutes), 0) / 60.0)::numeric, 1)
    into v_total, v_pic
  from public.flights
  where user_id = new.user_id;

  -- Un piloto que todavía no declaró nada ni registró vuelos se queda en null,
  -- no en cero: la pantalla distingue «sin registrar» de «cero horas».
  if new.horas_previas_total is null and v_total = 0 then
    new.total_hours := null;
    new.hours_pic := null;
  else
    new.total_hours := coalesce(new.horas_previas_total, 0) + v_total;
    new.hours_pic := coalesce(new.horas_previas_pic, 0) + v_pic;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_pilot_state_horas on public.pilot_state;
create trigger trg_pilot_state_horas
  before insert or update on public.pilot_state
  for each row
  execute function public.pilot_state_horas_derivadas();

-- El disparador de la bitácora ya no calcula: solo toca la fila para que el
-- BEFORE de arriba recalcule con el mismo criterio, en un solo sitio.
create or replace function public.recalc_pilot_hours(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.pilot_state
  set updated_at = now()
  where user_id = p_user_id;
end;
$$;

-- ─── 4. Las horas por período ───────────────────────────────────────────────

-- 90 días no es un número redondo: es la ventana de la que dependen los
-- despegues y aterrizajes recientes para llevar pasajeros. Los 12 meses son la
-- ventana con la que las aerolíneas miran actividad reciente.
create or replace view public.bitacora_resumen
with (security_invoker = true) as
select
  f.user_id,
  count(*)::int as vuelos,
  coalesce(sum(f.total_minutes), 0)::int as minutos_total,
  coalesce(sum(f.pic_minutes), 0)::int as minutos_pic,
  coalesce(sum(f.sic_minutes), 0)::int as minutos_sic,
  coalesce(sum(f.instrument_real_minutes + f.instrument_sim_minutes), 0)::int as minutos_ifr,
  coalesce(sum(f.night_minutes), 0)::int as minutos_noche,
  coalesce(sum(f.cross_country_minutes), 0)::int as minutos_travesia,
  coalesce(sum(f.landings_day + f.landings_night), 0)::int as aterrizajes,
  coalesce(sum(f.total_minutes) filter (
    where f.flight_date >= (now() at time zone 'America/Bogota')::date - 30
  ), 0)::int as minutos_ultimos_30_dias,
  coalesce(sum(f.total_minutes) filter (
    where f.flight_date >= (now() at time zone 'America/Bogota')::date - 90
  ), 0)::int as minutos_ultimos_90_dias,
  coalesce(sum(f.total_minutes) filter (
    where f.flight_date >= (now() at time zone 'America/Bogota')::date - 365
  ), 0)::int as minutos_ultimos_365_dias,
  coalesce(sum(f.landings_day + f.landings_night) filter (
    where f.flight_date >= (now() at time zone 'America/Bogota')::date - 90
  ), 0)::int as aterrizajes_ultimos_90_dias,
  max(f.flight_date) as ultimo_vuelo
from public.flights f
group by f.user_id;

comment on view public.bitacora_resumen is
  'Totales de la bitácora por piloto, con ventanas de 30, 90 y 365 días. security_invoker: cada piloto ve solo su fila (RLS de flights).';

grant select on table public.bitacora_resumen to authenticated;
