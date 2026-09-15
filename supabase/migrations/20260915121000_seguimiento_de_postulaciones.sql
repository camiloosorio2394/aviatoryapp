-- ============================================================================
-- Preguntar en qué quedó una postulación que lleva semanas quieta.
--
-- Es la razón de volver que no es estudiar. Un piloto que mandó la hoja de vida
-- y está esperando no tiene nada que hacer en la app; esto le da algo, y de
-- paso le da a Aviatory lo único que nunca ha sabido: si sirvió.
--
-- Tres semanas, no una: un proceso de aerolínea se demora, y preguntar cada
-- semana convierte una pregunta útil en ruido. Y una sola vez cada tres
-- semanas por postulación, para que una que se queda abierta meses no se
-- vuelva un goteo.
--
-- OJO AL APLICAR: usa 'postulacion_seguimiento', que agrega la migración
-- anterior. Córrelas en dos ejecuciones distintas del editor SQL.
-- ============================================================================

create or replace function private.preguntar_por_postulaciones()
returns int
language plpgsql
security definer
set search_path = ''
as $seguimiento$
declare
  v_total int := 0;
  r record;
  -- Lo que se demora un proceso de aerolínea antes de que valga la pena
  -- preguntar. Es también cada cuánto se vuelve a preguntar.
  c_dias_quieta constant int := 21;
begin
  for r in
    select p.id,
           p.user_id,
           coalesce(a.name, p.aerolinea) as aerolinea,
           (current_date - p.postulada_en) as dias
    from public.postulaciones p
    left join public.airlines a on a.id = p.airline_id
    where p.estado in ('postulada', 'en_proceso')
      and p.actualizada_en < now() - make_interval(days => c_dias_quieta)
      and not exists (
        select 1 from public.notifications n
        where n.user_id = p.user_id
          and n.type = 'postulacion_seguimiento'
          and n.body like '%(pos:' || p.id::text || ')%'
          and n.created_at >= now() - make_interval(days => c_dias_quieta)
      )
  loop
    insert into public.notifications (user_id, type, title, body, icon, action_url)
    values (
      r.user_id,
      'postulacion_seguimiento',
      '¿Cómo va lo de ' || r.aerolinea || '?',
      'La registraste hace ' || r.dias || ' días. Cuéntanos en qué quedó. (pos:' || r.id::text || ')',
      '📮',
      '/app/match'
    );
    v_total := v_total + 1;
  end loop;

  return v_total;
end;
$seguimiento$;

-- Como el resto de los productores: nadie la llama desde el cliente.

do $agenda$
begin
  perform cron.unschedule('aviatory_postulaciones')
  from cron.job where jobname = 'aviatory_postulaciones';

  -- 10:00 en Bogotá (UTC-5). Una pregunta sobre trabajo se lee de día.
  perform cron.schedule(
    'aviatory_postulaciones', '0 15 * * *',
    'select private.preguntar_por_postulaciones()'
  );
end;
$agenda$;
