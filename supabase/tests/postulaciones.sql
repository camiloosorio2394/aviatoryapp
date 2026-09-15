-- ============================================================================
-- Postulaciones: son del piloto y solo suyas, la fecha no se inventa, y el
-- seguimiento pregunta una vez cada tres semanas por las que siguen abiertas.
--
-- Escribe filas de prueba y las deshace: termina en PRUEBA_DESHECHA con la
-- lista de lo verificado, o en FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid;
  x_b uuid;
  x_aerolinea bigint;
  x_id bigint;
  x_tocada timestamptz;
  x_n int;
  x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;
  select id into x_b from auth.users order by created_at offset 1 limit 1;
  select id into x_aerolinea from public.airlines order by order_index limit 1;

  delete from public.postulaciones where user_id in (x_a, x_b);
  delete from public.notifications where user_id in (x_a, x_b) and type = 'postulacion_seguimiento';

  -- ── 1. El piloto registra la suya ─────────────────────────────────────────
  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;

  insert into public.postulaciones (user_id, airline_id, postulada_en)
  values (x_a, x_aerolinea, current_date - 40)
  returning id into x_id;

  reset role;
  select actualizada_en into x_tocada from public.postulaciones where id = x_id;
  if x_tocada is null or x_tocada < now() - interval '1 minute' then
    raise exception 'FALLO el disparador no puso actualizada_en';
  end if;
  x_log := x_log || ' postulacion_propia';

  -- Una fecha del futuro no entra: un dedazo en el año se ve aquí.
  begin
    set local role authenticated;
    insert into public.postulaciones (user_id, airline_id, postulada_en)
    values (x_a, x_aerolinea, current_date + 1);
    reset role;
    raise exception 'FALLO se guardó una postulación con fecha del futuro';
  exception
    when check_violation then
      reset role;
      x_log := x_log || ' fecha_no_del_futuro';
  end;

  -- Y sin aerolínea tampoco: la fila no diría a dónde se postuló.
  begin
    set local role authenticated;
    insert into public.postulaciones (user_id, postulada_en) values (x_a, current_date);
    reset role;
    raise exception 'FALLO se guardó una postulación sin aerolínea';
  exception
    when check_violation then
      reset role;
      x_log := x_log || ' siempre_con_aerolinea';
  end;

  -- ── 2. Solo suyas ─────────────────────────────────────────────────────────
  perform set_config('request.jwt.claims', json_build_object('sub', x_b, 'role', 'authenticated')::text, true);
  set local role authenticated;
  select count(*) into x_n from public.postulaciones where user_id = x_a;
  if x_n <> 0 then
    raise exception 'FALLO B ve las postulaciones de A';
  end if;
  begin
    insert into public.postulaciones (user_id, airline_id, postulada_en)
    values (x_a, x_aerolinea, current_date);
    reset role;
    raise exception 'FALLO B le registró una postulación a A';
  exception
    when insufficient_privilege then
      reset role;
      x_log := x_log || ' solo_las_suyas';
  end;

  -- ── 3. Lo que el cliente no puede tocar ───────────────────────────────────
  if has_table_privilege('authenticated', 'public.postulaciones', 'DELETE') then
    raise exception 'FALLO el cliente puede borrar postulaciones';
  end if;
  if has_column_privilege('authenticated', 'public.postulaciones', 'actualizada_en', 'UPDATE')
     or has_column_privilege('authenticated', 'public.postulaciones', 'creada_en', 'UPDATE') then
    raise exception 'FALLO el cliente escribe las fechas que mide el recordatorio';
  end if;
  if has_column_privilege('authenticated', 'public.postulaciones', 'user_id', 'UPDATE') then
    raise exception 'FALLO el cliente puede pasarle su postulación a otro';
  end if;
  x_log := x_log || ' columnas_cerradas';

  -- ── 4. El seguimiento ─────────────────────────────────────────────────────
  -- Una recién registrada no se pregunta: lleva minutos, no tres semanas.
  perform private.preguntar_por_postulaciones();
  select count(*) into x_n from public.notifications
    where user_id = x_a and type = 'postulacion_seguimiento';
  if x_n <> 0 then
    raise exception 'FALLO preguntó por una postulación recién registrada';
  end if;

  -- Se envejece a mano: el disparador pone `actualizada_en` en cada escritura,
  -- así que dentro de la prueba se apaga un momento. Todo se deshace igual.
  alter table public.postulaciones disable trigger trg_tocar_postulacion;
  update public.postulaciones set actualizada_en = now() - interval '30 days' where id = x_id;
  alter table public.postulaciones enable trigger trg_tocar_postulacion;

  perform private.preguntar_por_postulaciones();
  perform private.preguntar_por_postulaciones();
  select count(*) into x_n from public.notifications
    where user_id = x_a and type = 'postulacion_seguimiento';
  if x_n <> 1 then
    raise exception 'FALLO el seguimiento no preguntó una sola vez: %', x_n;
  end if;
  x_log := x_log || ' pregunta_una_vez';

  -- Y una cerrada deja de preguntarse, aunque siga vieja.
  delete from public.notifications where user_id = x_a and type = 'postulacion_seguimiento';
  update public.postulaciones set estado = 'contratado' where id = x_id;
  alter table public.postulaciones disable trigger trg_tocar_postulacion;
  update public.postulaciones set actualizada_en = now() - interval '30 days' where id = x_id;
  alter table public.postulaciones enable trigger trg_tocar_postulacion;

  perform private.preguntar_por_postulaciones();
  select count(*) into x_n from public.notifications
    where user_id = x_a and type = 'postulacion_seguimiento';
  if x_n <> 0 then
    raise exception 'FALLO siguió preguntando por una postulación cerrada';
  end if;
  x_log := x_log || ' cerrada_no_se_pregunta';

  -- ── 5. El productor no lo llama el cliente ────────────────────────────────
  if has_function_privilege('authenticated', 'private.preguntar_por_postulaciones()', 'execute') then
    raise exception 'FALLO el cliente ejecuta el seguimiento';
  end if;
  x_log := x_log || ' productor_cerrado';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
