-- =============================================================================
-- EL AGENDADOR: lo que hace que los avisos salgan sin que nadie abra la app
-- =============================================================================
--
-- Va en su propia migración a propósito. `pg_cron` puede no estar habilitado en
-- el proyecto, y si eso falla no debe arrastrar a las funciones de la migración
-- anterior, que sirven igual llamadas a mano.
--
-- pg_cron corre en UTC. Bogotá es UTC-5, así que las horas de abajo están
-- corridas cinco: 13:00 UTC son las 08:00 en Bogotá.
--
-- Si el proyecto no tiene pg_cron: Dashboard → Database → Extensions → pg_cron.

create extension if not exists pg_cron;

do $agenda$
declare
  r record;
begin
  -- Volver a agendar con el mismo nombre falla, así que primero se quitan las
  -- versiones anteriores. Hace la migración repetible.
  for r in
    select jobname from cron.job
    where jobname in (
      'aviatory_vencimientos',
      'aviatory_racha_en_riesgo',
      'aviatory_plan_de_estudio',
      'aviatory_meta_de_horas'
    )
  loop
    perform cron.unschedule(r.jobname);
  end loop;

  -- 08:00 en Bogotá. Un vencimiento se mira en la mañana, no de noche.
  perform cron.schedule(
    'aviatory_vencimientos', '0 13 * * *',
    'select private.avisar_vencimientos_de_todos()'
  );

  -- 19:00 en Bogotá: queda tarde para hacer algo al respecto, y no tan tarde
  -- como para llegar cuando el piloto ya está dormido.
  perform cron.schedule(
    'aviatory_racha_en_riesgo', '0 0 * * *',
    'select private.avisar_racha_en_riesgo()'
  );

  -- Cada hora: la función manda solo a quien puso esta hora en su plan.
  perform cron.schedule(
    'aviatory_plan_de_estudio', '0 * * * *',
    'select private.recordar_plan_de_estudio()'
  );

  -- 09:00 en Bogotá, un día después de que registre vuelos.
  perform cron.schedule(
    'aviatory_meta_de_horas', '0 14 * * *',
    'select private.avisar_meta_de_horas_cerca()'
  );
end;
$agenda$;

-- Para ver qué quedó agendado:
--   select jobname, schedule, command, active from cron.job
--   where jobname like 'aviatory_%';
-- Para ver si corrieron:
--   select jobname, status, return_message, start_time
--   from cron.job_run_details order by start_time desc limit 20;
