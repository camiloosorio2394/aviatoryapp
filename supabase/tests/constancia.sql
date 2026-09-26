-- ============================================================================
-- Constancia: el plan de estudio es del piloto, la racha sobrevive a un día por
-- mes, y los avisos que corren de noche salen cuando deben y una sola vez.
--
-- Escribe filas de prueba y las deshace: termina en PRUEBA_DESHECHA con la
-- lista de lo verificado, o en FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid;
  x_b uuid;
  x_hoy date;
  x_hora_ahora int;
  x_dow_hoy smallint;
  x_dias smallint[];
  x_racha int;
  x_gracia date;
  x_n int;
  x_aerolinea text;
  x_minimo numeric;
  x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;
  select id into x_b from auth.users order by created_at offset 1 limit 1;

  x_hoy := (now() at time zone 'America/Bogota')::date;
  x_hora_ahora := extract(hour from (now() at time zone 'America/Bogota'))::int;
  x_dow_hoy := extract(dow from (now() at time zone 'America/Bogota'))::smallint;

  -- Punto de partida conocido para A, dentro de la transacción.
  delete from public.plan_de_estudio where user_id in (x_a, x_b);
  delete from public.notifications where user_id in (x_a, x_b);

  -- ── 1. El plan es del piloto y solo suyo ──────────────────────────────────
  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;

  insert into public.plan_de_estudio (user_id, dias, hora, minutos_meta)
  values (x_a, array[4,2,2]::smallint[], '20:00', 25);

  reset role;
  select dias into x_dias from public.plan_de_estudio where user_id = x_a;
  if x_dias <> array[2,4]::smallint[] then
    raise exception 'FALLO los días no se ordenaron ni se limpiaron: %', x_dias;
  end if;
  x_log := x_log || ' plan_dias_normalizados';

  -- Una zona inventada no entra: si entrara, el recordatorio fallaría de noche.
  begin
    set local role authenticated;
    update public.plan_de_estudio set zona = 'America/Macondo' where user_id = x_a;
    reset role;
    raise exception 'FALLO se guardó una zona horaria que no existe';
  exception
    when invalid_parameter_value or undefined_object then
      reset role;
      x_log := x_log || ' plan_zona_validada';
  end;

  -- B no ve el plan de A, y no puede escribirle uno.
  perform set_config('request.jwt.claims', json_build_object('sub', x_b, 'role', 'authenticated')::text, true);
  set local role authenticated;
  select count(*) into x_n from public.plan_de_estudio where user_id = x_a;
  if x_n <> 0 then
    raise exception 'FALLO B lee el plan de A';
  end if;
  begin
    insert into public.plan_de_estudio (user_id, dias, hora) values (x_a, array[1]::smallint[], '07:00');
    reset role;
    raise exception 'FALLO B le escribió un plan a A';
  exception
    when insufficient_privilege then
      reset role;
      x_log := x_log || ' plan_solo_del_dueno';
  end;

  -- Nadie borra filas de esta tabla desde el cliente.
  if has_table_privilege('authenticated', 'public.plan_de_estudio', 'DELETE') then
    raise exception 'FALLO el cliente puede borrar planes';
  end if;
  x_log := x_log || ' plan_sin_delete';

  -- ── 2. La racha sobrevive a un día, una vez al mes ────────────────────────
  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);

  -- Faltó exactamente un día, con la gracia del mes sin usar: no se cae.
  update public.streaks
    set current_streak = 9, longest_streak = 9,
        last_activity_date = x_hoy - 2, gracia_usada_en = null
    where user_id = x_a;
  perform public.increment_streak();
  select current_streak, gracia_usada_en into x_racha, x_gracia
    from public.streaks where user_id = x_a;
  if x_racha <> 10 then
    raise exception 'FALLO la racha no sobrevivió al día de gracia: %', x_racha;
  end if;
  if x_gracia <> x_hoy then
    raise exception 'FALLO no quedó anotado el día de gracia: %', x_gracia;
  end if;
  x_log := x_log || ' racha_con_gracia';

  -- Segunda ausencia el mismo mes: ya no queda gracia y vuelve a uno.
  update public.streaks
    set current_streak = 10, last_activity_date = x_hoy - 2
    where user_id = x_a;
  perform public.increment_streak();
  select current_streak into x_racha from public.streaks where user_id = x_a;
  if x_racha <> 1 then
    raise exception 'FALLO la gracia se usó dos veces en el mismo mes: %', x_racha;
  end if;
  x_log := x_log || ' gracia_una_por_mes';

  -- Dos días seguidos sin estudiar rompen la racha aunque quede gracia.
  update public.streaks
    set current_streak = 12, last_activity_date = x_hoy - 3, gracia_usada_en = null
    where user_id = x_a;
  perform public.increment_streak();
  select current_streak, gracia_usada_en into x_racha, x_gracia
    from public.streaks where user_id = x_a;
  if x_racha <> 1 then
    raise exception 'FALLO la gracia tapó dos días de ausencia: %', x_racha;
  end if;
  if x_gracia is not null then
    raise exception 'FALLO se gastó la gracia sin salvar nada';
  end if;
  x_log := x_log || ' gracia_no_tapa_dos_dias';

  -- Estudiar dos veces el mismo día no suma.
  update public.streaks
    set current_streak = 4, last_activity_date = x_hoy
    where user_id = x_a;
  perform public.increment_streak();
  select current_streak into x_racha from public.streaks where user_id = x_a;
  if x_racha <> 4 then
    raise exception 'FALLO el mismo día contó dos veces: %', x_racha;
  end if;
  x_log := x_log || ' un_dia_cuenta_una_vez';

  reset role;

  -- ── 3. El recordatorio del plan ───────────────────────────────────────────
  -- Se pone el plan en el día y la hora de ahora: así la prueba no depende de
  -- cuándo se corra.
  update public.plan_de_estudio
    set dias = array[x_dow_hoy]::smallint[],
        hora = make_time(x_hora_ahora, 0, 0),
        zona = 'America/Bogota'
    where user_id = x_a;
  update public.streaks set last_activity_date = x_hoy - 1 where user_id = x_a;

  perform private.recordar_plan_de_estudio();
  select count(*) into x_n from public.notifications
    where user_id = x_a and type = 'plan_reminder' and created_at::date = x_hoy;
  if x_n <> 1 then
    raise exception 'FALLO el recordatorio del plan no salió una vez: %', x_n;
  end if;

  -- Segunda pasada de la misma hora: no duplica.
  perform private.recordar_plan_de_estudio();
  select count(*) into x_n from public.notifications
    where user_id = x_a and type = 'plan_reminder' and created_at::date = x_hoy;
  if x_n <> 1 then
    raise exception 'FALLO el recordatorio del plan se repitió: %', x_n;
  end if;
  x_log := x_log || ' plan_recuerda_una_vez';

  -- Si ya estudió hoy, no se le recuerda nada.
  delete from public.notifications where user_id = x_a and type = 'plan_reminder';
  update public.streaks set last_activity_date = x_hoy where user_id = x_a;
  perform private.recordar_plan_de_estudio();
  select count(*) into x_n from public.notifications
    where user_id = x_a and type = 'plan_reminder';
  if x_n <> 0 then
    raise exception 'FALLO le recordó el plan a quien ya estudió hoy';
  end if;

  -- Y en un día que no eligió, tampoco.
  update public.plan_de_estudio
    set dias = array[(x_dow_hoy + 3) % 7]::smallint[]
    where user_id = x_a;
  update public.streaks set last_activity_date = x_hoy - 1 where user_id = x_a;
  perform private.recordar_plan_de_estudio();
  select count(*) into x_n from public.notifications
    where user_id = x_a and type = 'plan_reminder';
  if x_n <> 0 then
    raise exception 'FALLO le recordó el plan un día que no eligió';
  end if;
  x_log := x_log || ' plan_solo_su_dia';

  -- ── 4. La racha en riesgo ─────────────────────────────────────────────────
  delete from public.notifications where user_id = x_a;
  update public.streaks
    set current_streak = 2, last_activity_date = x_hoy - 1
    where user_id = x_a;
  perform private.avisar_racha_en_riesgo();
  select count(*) into x_n from public.notifications
    where user_id = x_a and type = 'streak_at_risk';
  if x_n <> 0 then
    raise exception 'FALLO avisó por una racha de dos días';
  end if;

  update public.streaks set current_streak = 5 where user_id = x_a;
  perform private.avisar_racha_en_riesgo();
  perform private.avisar_racha_en_riesgo();
  select count(*) into x_n from public.notifications
    where user_id = x_a and type = 'streak_at_risk';
  if x_n <> 1 then
    raise exception 'FALLO la racha en riesgo no avisó una sola vez: %', x_n;
  end if;

  update public.streaks set last_activity_date = x_hoy where user_id = x_a;
  delete from public.notifications where user_id = x_a;
  perform private.avisar_racha_en_riesgo();
  select count(*) into x_n from public.notifications
    where user_id = x_a and type = 'streak_at_risk';
  if x_n <> 0 then
    raise exception 'FALLO avisó de racha en riesgo a quien ya estudió hoy';
  end if;
  x_log := x_log || ' racha_en_riesgo_desde_tres';

  -- ── 5. Los vencimientos salen sin que el piloto abra la app ───────────────
  delete from public.notifications where user_id = x_a;
  insert into public.licenses_held (user_id, license_type, expires_date)
  values (x_a, 'medical_class_1', x_hoy + 7);

  perform private.avisar_vencimientos_de_todos();
  select count(*) into x_n from public.notifications
    where user_id = x_a and type = 'expiry_warning';
  if x_n <> 1 then
    raise exception 'FALLO el vencimiento no avisó solo: %', x_n;
  end if;

  -- Y el camino de siempre sigue sin duplicar lo que ya salió.
  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;
  perform public.check_my_expiries();
  reset role;
  select count(*) into x_n from public.notifications
    where user_id = x_a and type = 'expiry_warning';
  if x_n <> 1 then
    raise exception 'FALLO el panel duplicó el aviso de vencimiento: %', x_n;
  end if;
  x_log := x_log || ' vencimientos_sin_abrir_la_app';

  -- ── 6. La meta de horas, solo tras volar y una vez por aerolínea ──────────
  -- Desde 20261001050000 la meta sale de una convocatoria abierta, no de una
  -- tabla nuestra (y desde 20261001060000, de sus horas ya leídas). Se abre una
  -- de prueba con un mínimo que ninguna real tiene cerca, para que las de
  -- verdad no se crucen con la prueba.
  delete from public.notifications where user_id = x_a;
  perform private.convocatoria_manual('CMP', 'Primer oficial (prueba)', 'https://ejemplo.com/prueba-meta', true,
    array['Haber acumulado 9.990 horas de vuelo o más'], null, 'primer_oficial', 'prueba-meta', p_horas => 9990);
  select a.name, 9990 into x_aerolinea, x_minimo from public.airlines a where a.code = 'CMP';

  -- total_hours ya no se escribe a mano: desde las horas de carrera sale de
  -- horas_previas_total más la bitácora, y un update directo no pega (lo
  -- comprueba horas_de_carrera.sql). Se declara lo previo, con la bitácora
  -- vacía, y así el total queda donde la prueba lo necesita.
  delete from public.flights where user_id = x_a;
  insert into public.pilot_state (user_id, horas_previas_total)
  values (x_a, x_minimo - 20)
  on conflict (user_id) do update set horas_previas_total = excluded.horas_previas_total;

  -- Sin vuelo reciente no hay aviso: es premio por anotar, no recordatorio.
  perform private.avisar_meta_de_horas_cerca();
  select count(*) into x_n from public.notifications
    where user_id = x_a and type = 'milestone_close';
  if x_n <> 0 then
    raise exception 'FALLO avisó de la meta sin vuelos recientes';
  end if;

  insert into public.flights (user_id, flight_date, total_minutes)
  values (x_a, x_hoy - 1, 60);

  perform private.avisar_meta_de_horas_cerca();
  perform private.avisar_meta_de_horas_cerca();
  select count(*) into x_n from public.notifications
    where user_id = x_a and type = 'milestone_close';
  if x_n <> 1 then
    raise exception 'FALLO la meta de horas no avisó una sola vez: %', x_n;
  end if;
  x_log := x_log || ' meta_de_horas_tras_volar';

  -- ── 7. Nada de esto lo llama el cliente ───────────────────────────────────
  if has_function_privilege('authenticated', 'private.recordar_plan_de_estudio()', 'execute')
     or has_function_privilege('authenticated', 'private.avisar_racha_en_riesgo()', 'execute')
     or has_function_privilege('authenticated', 'private.avisar_vencimientos_de_todos()', 'execute')
     or has_function_privilege('authenticated', 'private.avisar_meta_de_horas_cerca()', 'execute')
     or has_function_privilege('authenticated', 'private.crear_avisos_de_vencimiento(uuid)', 'execute') then
    raise exception 'FALLO el cliente ejecuta los productores de avisos';
  end if;
  if has_table_privilege('authenticated', 'public.notifications', 'INSERT') then
    raise exception 'FALLO el cliente puede escribirse avisos';
  end if;
  x_log := x_log || ' productores_cerrados';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
