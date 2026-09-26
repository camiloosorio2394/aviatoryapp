-- ============================================================================
-- Autorización con constancia, consentimiento del certificado médico y
-- eliminación de la cuenta. Migración 20261002000000.
--
-- Comprueba que:
--   · registrar_autorizacion guarda una fila por documento y versión, sin
--     duplicar, y cada piloto solo lee las suyas;
--   · un certificado médico no se guarda sin la autorización de dato sensible,
--     y con ella sí;
--   · eliminar_mi_cuenta exige la palabra, no la ejecuta anon, y al llamarla
--     borra la cuenta del que llama con todo lo suyo, incluido el registro de
--     acceso al banco, sin tocar a nadie más;
--   · las funciones son security definer con search_path vacío.
--
-- ESCRITA SIN BASE DONDE CORRERLA (26-sep-2026). Borra la cuenta del segundo
-- usuario DENTRO de la transacción, que se deshace al final: no queda nada
-- borrado. Termina en PRUEBA_DESHECHA o en FALLO. Cómo se corre:
-- supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid; x_b uuid; x_n int; x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;
  select id into x_b from auth.users order by created_at offset 1 limit 1;
  if x_a is null or x_b is null then raise exception 'FALLO hacen falta dos usuarios'; end if;

  -- ── Permisos y forma de las funciones ─────────────────────────────────────
  if has_function_privilege('anon', 'public.eliminar_mi_cuenta(text)', 'execute')
     or has_function_privilege('anon', 'public.registrar_autorizacion(text, text)', 'execute')
     or not has_function_privilege('authenticated', 'public.eliminar_mi_cuenta(text)', 'execute')
     or not has_function_privilege('authenticated', 'public.registrar_autorizacion(text, text)', 'execute') then
    raise exception 'FALLO permisos de las funciones';
  end if;
  select count(*) into x_n from pg_proc p
  where p.oid in ('public.eliminar_mi_cuenta(text)'::regprocedure, 'public.registrar_autorizacion(text, text)'::regprocedure)
    and p.prosecdef and p.proconfig @> array['search_path=""'];
  if x_n <> 2 then raise exception 'FALLO funciones sin security definer o sin search_path vacío'; end if;
  if has_table_privilege('authenticated', 'public.autorizaciones', 'insert')
     or has_table_privilege('authenticated', 'public.autorizaciones', 'update')
     or has_table_privilege('authenticated', 'public.autorizaciones', 'delete')
     or has_table_privilege('anon', 'public.autorizaciones', 'select') then
    raise exception 'FALLO la tabla autorizaciones se escribe directo o la lee anon';
  end if;
  x_log := x_log || ' permisos';

  -- Un registro de acceso al banco de A y otro de B, para ver que solo se va el de B.
  insert into public.vault_access_log (user_id, access_type) values (x_a, 'request'), (x_b, 'request');

  -- ── Autorizaciones ────────────────────────────────────────────────────────
  perform set_config('request.jwt.claims', json_build_object('sub', x_b, 'role', 'authenticated')::text, true);
  set local role authenticated;

  perform public.registrar_autorizacion('terminos_y_privacidad', '2026-09-26');
  perform public.registrar_autorizacion('terminos_y_privacidad', '2026-09-26');
  select count(*) into x_n from public.autorizaciones where documento = 'terminos_y_privacidad' and version = '2026-09-26';
  if x_n <> 1 then raise exception 'FALLO la autorización se duplicó o no se guardó: %', x_n; end if;
  select count(*) into x_n from public.autorizaciones where user_id <> x_b;
  if x_n <> 0 then raise exception 'FALLO B lee autorizaciones ajenas'; end if;
  begin
    perform public.registrar_autorizacion('otra_cosa', '1');
    raise exception 'FALLO aceptó un documento inventado';
  exception when invalid_parameter_value then x_log := x_log || ' documento_invalido';
  end;
  begin
    insert into public.autorizaciones (user_id, documento, version) values (x_b, 'dato_sensible_medico', 'x');
    raise exception 'FALLO se escribió la autorización a mano';
  exception when insufficient_privilege then x_log := x_log || ' sin_escritura_directa';
  end;
  x_log := x_log || ' autorizacion_idempotente';

  -- ── Certificado médico ────────────────────────────────────────────────────
  begin
    insert into public.licenses_held (user_id, license_type, expires_date)
    values (x_b, 'medical_class_1', current_date + 200);
    raise exception 'FALLO se guardó un médico sin autorización';
  exception when others then
    if sqlerrm <> 'falta_autorizacion_medica' then raise; end if;
    x_log := x_log || ' medico_sin_autorizacion_no';
  end;
  perform public.registrar_autorizacion('dato_sensible_medico', '2026-09-26');
  insert into public.licenses_held (user_id, license_type, expires_date)
  values (x_b, 'medical_class_1', current_date + 200);
  x_log := x_log || ' medico_con_autorizacion_si';

  -- ── Eliminar la cuenta ────────────────────────────────────────────────────
  begin
    perform public.eliminar_mi_cuenta('eliminar');
    raise exception 'FALLO eliminó sin la palabra exacta';
  exception when others then
    if sqlerrm <> 'confirmacion_invalida' then raise; end if;
    x_log := x_log || ' pide_la_palabra';
  end;

  perform public.eliminar_mi_cuenta('ELIMINAR');
  reset role;

  if exists (select 1 from auth.users where id = x_b) then raise exception 'FALLO la cuenta sigue ahí'; end if;
  if exists (select 1 from public.profiles where id = x_b) then raise exception 'FALLO quedó el perfil'; end if;
  if exists (select 1 from public.licenses_held where user_id = x_b) then raise exception 'FALLO quedaron licencias'; end if;
  if exists (select 1 from public.autorizaciones where user_id = x_b) then raise exception 'FALLO quedaron autorizaciones'; end if;
  if exists (select 1 from public.vault_access_log where user_id = x_b) then raise exception 'FALLO quedó el registro del banco'; end if;
  if not exists (select 1 from auth.users where id = x_a)
     or not exists (select 1 from public.vault_access_log where user_id = x_a) then
    raise exception 'FALLO se tocó a otro usuario';
  end if;
  x_log := x_log || ' cuenta_eliminada_solo_la_propia';

  -- Sin sesión, no hay a quién eliminar.
  perform set_config('request.jwt.claims', '', true);
  begin
    perform public.eliminar_mi_cuenta('ELIMINAR');
    raise exception 'FALLO eliminó sin sesión';
  exception when others then
    if sqlerrm <> 'no authenticated user' then raise; end if;
    x_log := x_log || ' sin_sesion';
  end;

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
