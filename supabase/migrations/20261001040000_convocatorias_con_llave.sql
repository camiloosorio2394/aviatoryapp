-- ============================================================================
-- La llave de revisar-convocatorias.
--
-- La función de borde no pide JWT (la llama pg_cron, que no tiene sesión), así
-- que se protege con una llave propia: pg_cron la manda en el encabezado
-- `x-llave` y la función la valida con convocatorias_llave_valida() antes de
-- descargar nada. La llave nace y vive en el Vault: nadie la escribe ni la
-- copia, ni en el repo ni en los secretos de las funciones.
-- ============================================================================

do $llave$
begin
  if not exists (select 1 from vault.secrets where name = 'convocatorias_llave') then
    perform vault.create_secret(
      encode(extensions.gen_random_bytes(32), 'hex'),
      'convocatorias_llave',
      'Con esta llave pg_cron llama a la función revisar-convocatorias.'
    );
  end if;
end;
$llave$;

-- Solo la función de borde (service_role) la puede consultar, y solo responde
-- sí o no: la llave no sale de la base.
create or replace function public.convocatorias_llave_valida(p_llave text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(p_llave, '') <> ''
     and exists (
       select 1 from vault.decrypted_secrets
       where name = 'convocatorias_llave' and decrypted_secret = p_llave
     );
$$;

revoke all on function public.convocatorias_llave_valida(text) from public, anon, authenticated;
grant execute on function public.convocatorias_llave_valida(text) to service_role;

-- La tarea de cada 6 horas, ahora con la llave.
do $agenda$
begin
  if exists (select 1 from cron.job where jobname = 'aviatory_convocatorias') then
    perform cron.unschedule('aviatory_convocatorias');
  end if;
  perform cron.schedule(
    'aviatory_convocatorias', '17 */6 * * *',
    $cron$select net.http_post(
      url := 'https://gvwqmfxphsbmbrhyjcmk.supabase.co/functions/v1/revisar-convocatorias',
      body := '{}'::jsonb,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-llave', (select decrypted_secret from vault.decrypted_secrets where name = 'convocatorias_llave')
      ),
      timeout_milliseconds := 120000
    )$cron$
  );
end;
$agenda$;
