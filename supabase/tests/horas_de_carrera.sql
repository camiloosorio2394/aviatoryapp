-- ============================================================================
-- Las horas de carrera suman previas más bitácora, no se pisan; y el piloto no
-- puede escribir su propio total ni darse por verificado.
--
-- Escribe filas de prueba y las deshace: termina en PRUEBA_DESHECHA con la
-- lista de lo verificado, o en FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid;
  x_total numeric;
  x_pic numeric;
  x_vuelo bigint;
  x_id bigint;
  x_ok boolean;
  x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;

  -- Punto de partida limpio para este piloto.
  delete from public.flights where user_id = x_a;
  delete from public.verificaciones_horas where user_id = x_a;
  update public.pilot_state set horas_previas_total = 240, horas_previas_pic = 120 where user_id = x_a;

  -- ─── 1. Lo declarado se respeta ───────────────────────────────────────────
  select total_hours, hours_pic into x_total, x_pic from public.pilot_state where user_id = x_a;
  if x_total <> 240 or x_pic <> 120 then
    raise exception 'FALLO las horas previas no se reflejan: % / %', x_total, x_pic;
  end if;
  x_log := x_log || ' previas_se_respetan';

  -- ─── 2. Un vuelo SUMA, no reemplaza ───────────────────────────────────────
  insert into public.flights (user_id, flight_date, total_minutes, pic_minutes, landings_day)
  values (x_a, current_date, 60, 60, 1)
  returning id into x_vuelo;

  select total_hours, hours_pic into x_total, x_pic from public.pilot_state where user_id = x_a;
  if x_total <> 241 or x_pic <> 121 then
    raise exception 'FALLO el vuelo no sumó a la carrera previa: % / % (esperaba 241 / 121)', x_total, x_pic;
  end if;
  x_log := x_log || ' vuelo_suma';

  -- ─── 3. Borrar el vuelo devuelve lo declarado, no lo borra ────────────────
  delete from public.flights where id = x_vuelo;
  select total_hours into x_total from public.pilot_state where user_id = x_a;
  if x_total <> 240 then
    raise exception 'FALLO borrar el vuelo se llevó las horas previas: %', x_total;
  end if;
  x_log := x_log || ' borrar_no_destruye';

  -- ─── 4. El piloto no puede escribir su propio total ───────────────────────
  update public.pilot_state set total_hours = 9999, hours_pic = 9999 where user_id = x_a;
  select total_hours into x_total from public.pilot_state where user_id = x_a;
  if x_total <> 240 then
    raise exception 'FALLO se pudo escribir total_hours a mano: %', x_total;
  end if;
  x_log := x_log || ' total_no_se_escribe';

  -- ─── 5. Sin declarar nada ni volar, se queda en null ──────────────────────
  update public.pilot_state set horas_previas_total = null, horas_previas_pic = null where user_id = x_a;
  select total_hours into x_total from public.pilot_state where user_id = x_a;
  if x_total is not null then
    raise exception 'FALLO un piloto sin nada debería quedar en null, no en %', x_total;
  end if;
  x_log := x_log || ' vacio_es_null';
  update public.pilot_state set horas_previas_total = 240, horas_previas_pic = 120 where user_id = x_a;

  -- ─── 6. Las ventanas por período ──────────────────────────────────────────
  insert into public.flights (user_id, flight_date, total_minutes, pic_minutes, landings_day)
  values (x_a, current_date, 120, 120, 2),
         (x_a, current_date - 100, 60, 60, 1),
         (x_a, current_date - 400, 60, 60, 1);

  select minutos_ultimos_90_dias, aterrizajes_ultimos_90_dias
    into x_total, x_pic
  from public.bitacora_resumen where user_id = x_a;
  if x_total <> 120 or x_pic <> 2 then
    raise exception 'FALLO ventana de 90 días: % min / % aterrizajes (esperaba 120 / 2)', x_total, x_pic;
  end if;
  select minutos_ultimos_365_dias into x_total from public.bitacora_resumen where user_id = x_a;
  if x_total <> 180 then
    raise exception 'FALLO ventana de 365 días: % (esperaba 180)', x_total;
  end if;
  x_log := x_log || ' ventanas_90_y_365';

  -- ─── 7. Verificación: el piloto pide, no se aprueba ───────────────────────
  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;

  insert into public.verificaciones_horas (user_id, horas_total, horas_pic, evidencia)
  values (x_a, 240, 120, x_a::text || '/bitacora.pdf')
  returning id into x_id;
  x_log := x_log || ' pide_revision';

  -- Dos pendientes a la vez, no.
  begin
    insert into public.verificaciones_horas (user_id, horas_total, horas_pic, evidencia)
    values (x_a, 250, 130, x_a::text || '/otra.pdf');
    raise exception 'FALLO permitió dos solicitudes pendientes';
  exception when unique_violation then x_log := x_log || ' una_sola_pendiente';
  end;

  -- Y no puede darse por verificado.
  begin
    update public.verificaciones_horas set estado = 'verificada' where id = x_id;
    if (select estado from public.verificaciones_horas where id = x_id) = 'verificada' then
      raise exception 'FALLO el piloto se verificó a sí mismo';
    end if;
    x_log := x_log || ' no_se_autoverifica';
  exception when insufficient_privilege then x_log := x_log || ' no_se_autoverifica';
  end;

  -- Retirar la suya sí.
  x_ok := public.retirar_verificacion_horas();
  if not x_ok or (select estado from public.verificaciones_horas where id = x_id) <> 'retirada' then
    raise exception 'FALLO no pudo retirar su propia solicitud';
  end if;
  x_log := x_log || ' retira_la_suya';

  reset role;
  perform set_config('request.jwt.claims', '', true);

  -- ─── 8. Aprobada, el sello solo cubre lo que cubría ───────────────────────
  insert into public.verificaciones_horas (user_id, horas_total, horas_pic, evidencia)
  values (x_a, 240, 120, x_a::text || '/bitacora.pdf')
  returning id into x_id;
  perform public.revisar_verificacion_horas(x_id, true, 'ok');

  if not (select cubre_lo_declarado from public.horas_verificadas where user_id = x_a) then
    raise exception 'FALLO el sello no cubre las 240 que se verificaron';
  end if;

  update public.pilot_state set horas_previas_total = 300 where user_id = x_a;
  if (select cubre_lo_declarado from public.horas_verificadas where user_id = x_a) then
    raise exception 'FALLO el sello siguió valiendo tras subirse las horas a 300';
  end if;
  x_log := x_log || ' sello_no_cubre_lo_nuevo';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
