-- ============================================================================
-- Errores del cliente: solo con sesión, recortados, con tope por hora y sin
-- acceso directo a la tabla.
--
-- Escribe filas de prueba y las deshace: termina en PRUEBA_DESHECHA con la
-- lista de lo verificado, o en FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid;
  x_n int;
  x_ok boolean;
  x_fila record;
  x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;
  delete from public.errores_cliente where user_id = x_a;

  -- Sin sesión no se guarda.
  perform set_config('request.jwt.claims', '', true);
  begin
    perform public.reportar_error_cliente('prueba', 'sin sesion');
    raise exception 'FALLO guardó sin sesión';
  exception when insufficient_privilege then x_log := x_log || ' sin_sesion';
  end;
  if has_function_privilege('anon', 'public.reportar_error_cliente(text, text, text, text, text, text)', 'execute') then
    raise exception 'FALLO anon ejecuta reportar_error_cliente';
  end if;

  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;

  -- Guarda y recorta.
  x_ok := public.reportar_error_cliente(
    'pantalla', repeat('m', 1500), repeat('d', 5000), '/dashboard', repeat('v', 60), 'Mozilla/5.0'
  );
  if not x_ok then raise exception 'FALLO no guardó el primer reporte'; end if;
  x_log := x_log || ' guarda';

  begin
    perform public.reportar_error_cliente('pantalla', '   ');
    raise exception 'FALLO aceptó un mensaje vacío';
  exception when invalid_parameter_value then x_log := x_log || ' vacio_rechazado';
  end;

  -- El cliente no lee ni escribe la tabla.
  begin
    perform 1 from public.errores_cliente;
    raise exception 'FALLO el cliente lee errores_cliente';
  exception when insufficient_privilege then null;
  end;
  begin
    insert into public.errores_cliente (user_id, contexto, mensaje) values (x_a, 'directo', 'directo');
    raise exception 'FALLO el cliente escribe errores_cliente';
  exception when insufficient_privilege then x_log := x_log || ' tabla_cerrada';
  end;
  reset role;

  select * into x_fila from public.errores_cliente where user_id = x_a;
  if char_length(x_fila.mensaje) <> 1000 or char_length(x_fila.detalle) <> 4000 or char_length(x_fila.version_app) <> 40 then
    raise exception 'FALLO no recortó: % % %', char_length(x_fila.mensaje), char_length(x_fila.detalle), char_length(x_fila.version_app);
  end if;
  x_log := x_log || ' recorta';

  -- Tope: 30 por hora; el 31 no escribe y responde false.
  insert into public.errores_cliente (user_id, contexto, mensaje)
  select x_a, 'prueba', 'relleno ' || g from generate_series(1, 29) as g;
  set local role authenticated;
  x_ok := public.reportar_error_cliente('pantalla', 'el 31');
  reset role;
  select count(*) into x_n from public.errores_cliente where user_id = x_a;
  if x_ok or x_n <> 30 then raise exception 'FALLO tope: respuesta % con % filas', x_ok, x_n; end if;
  x_log := x_log || ' tope_30';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
