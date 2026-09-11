-- ============================================================================
-- Resúmenes que se calculan en la base, no leyendo todas las filas.
--
-- Hallazgo de la segunda auditoría: tres pantallas traían todas las filas de un
-- piloto para sumarlas en el navegador. PostgREST corta cada respuesta en 1000
-- filas, así que pasado ese número los totales salían mal sin avisar:
--   - Perfil y Aerolíneas sumaban las horas de la bitácora con todos los vuelos.
--   - La Bitácora calculaba sus totales con los 500 vuelos que lista.
--   - El hub de Inglés ICAO contaba preguntas distintas con todos los intentos
--     del quiz (hasta 600 por hora).
--
-- Cambios:
--   1. bitacora_resumen: una fila por piloto con sus totales. security_invoker:
--      cada piloto ve solo la suya, con el RLS de flights.
--   2. icao_progreso(): el avance del hub en una llamada, también con el RLS de
--      quien consulta.
--
-- No toca filas.
-- ============================================================================

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
  -- Últimos 30 días contados en la hora de Colombia, la misma con la que la
  -- base cierra el día de estudio.
  coalesce(sum(f.total_minutes) filter (
    where f.flight_date >= (now() at time zone 'America/Bogota')::date - 30
  ), 0)::int as minutos_ultimos_30_dias,
  max(f.flight_date) as ultimo_vuelo
from public.flights f
group by f.user_id;

comment on view public.bitacora_resumen is
  'Totales de la bitácora por piloto. security_invoker: cada piloto ve solo su fila (RLS de flights).';

grant select on table public.bitacora_resumen to authenticated;

create or replace function public.icao_progreso()
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  select jsonb_build_object(
    'quiz_respondidas', (
      select count(distinct a.question_id) from public.user_icao_quiz_attempts a
      where a.user_id = (select auth.uid())
    ),
    'quiz_total', (select count(*) from public.icao_quiz_questions),
    'vocabulario_total', (select count(*) from public.icao_vocabulary),
    'interview_respondidas', (
      select count(distinct s.question_id) from public.user_icao_speaking s
      where s.user_id = (select auth.uid()) and s.parte = 1
    ),
    'simulacros', (
      select count(*) from public.user_icao_mock_results m
      where m.user_id = (select auth.uid())
    ),
    'mejor_nivel', (
      select max(m.final_level) from public.user_icao_mock_results m
      where m.user_id = (select auth.uid())
    )
  )
$$;

revoke all on function public.icao_progreso() from public, anon;
grant execute on function public.icao_progreso() to authenticated;
