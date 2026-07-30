-- ============================================================================
-- Hoja de vida publica (opt-in).
--
-- PENDIENTE DE APLICAR: esta migracion la escribio la sesion de Nico del
-- 30 jul 2026 y NO se ha corrido contra produccion (esa sesion no tiene
-- credenciales de CLI). Aplicar con `npx supabase db push --linked` y despues
-- regenerar types. La UI del toggle en Perfil se activa cuando esto exista.
--
-- Diseno: el piloto decide si su hoja de vida se puede ver desde comunidad.
-- Por defecto NO. La lectura ajena pasa solo por la RPC, que devuelve un
-- subconjunto curado (nunca full_name si no quiere, nunca document_url de los
-- certificados, que es un archivo privado).
-- ============================================================================

alter table public.profiles
  add column if not exists cv_public boolean not null default false;

comment on column public.profiles.cv_public is
  'Si es true, la hoja de vida del piloto puede consultarse via get_pilot_cv desde comunidad.';

create or replace function public.get_pilot_cv(p_username text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_profile record;
  v_pilot record;
  v_certs jsonb;
  v_ach_count integer;
begin
  if auth.uid() is null then
    raise exception 'requiere sesion';
  end if;

  select id, username, country, photo_url, cv_public
    into v_profile
    from public.profiles
   where username = p_username;

  if v_profile is null or not v_profile.cv_public then
    -- Mismo mensaje si no existe o si es privada: no filtramos existencia.
    return null;
  end if;

  select stage, total_hours, hours_pic, licenses, target_airline
    into v_pilot
    from public.pilot_state
   where user_id = v_profile.id;

  -- Certificados sin document_url: el archivo es privado siempre.
  select coalesce(jsonb_agg(jsonb_build_object(
           'nombre', coalesce(custom_name, license_type),
           'emitido', issued_date,
           'vence', expires_date
         ) order by expires_date nulls last), '[]'::jsonb)
    into v_certs
    from public.licenses_held
   where user_id = v_profile.id;

  select count(*) into v_ach_count
    from public.user_achievements
   where user_id = v_profile.id;

  return jsonb_build_object(
    'username', v_profile.username,
    'country', v_profile.country,
    'photo_url', v_profile.photo_url,
    'stage', v_pilot.stage,
    'total_hours', v_pilot.total_hours,
    'hours_pic', v_pilot.hours_pic,
    'licenses', to_jsonb(coalesce(v_pilot.licenses, '{}'::text[])),
    'target_airline', v_pilot.target_airline,
    'certificados', v_certs,
    'logros', v_ach_count
  );
end $$;

comment on function public.get_pilot_cv(text) is
  'Hoja de vida publica de un piloto por username. Devuelve null si no existe o no la comparte.';

-- Trampa conocida: create or replace restaura EXECUTE a PUBLIC.
revoke all on function public.get_pilot_cv(text) from public, anon;
grant execute on function public.get_pilot_cv(text) to authenticated, service_role;
