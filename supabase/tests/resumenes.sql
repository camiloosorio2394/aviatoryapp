-- ============================================================================
-- Resúmenes calculados en la base: bitacora_resumen e icao_progreso() cuentan
-- todas las filas (más de las 1000 que corta PostgREST) y solo las del piloto.
--
-- Escribe filas de prueba y las deshace: termina en PRUEBA_DESHECHA con la
-- lista de lo verificado, o en FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid;
  x_b uuid;
  x_esperado record;
  x_visto record;
  x_r jsonb;
  x_n int;
  x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;
  select id into x_b from auth.users order by created_at offset 1 limit 1;

  -- Más vuelos de los que PostgREST devuelve en una respuesta.
  insert into public.flights (user_id, flight_date, total_minutes, pic_minutes, sic_minutes, dual_minutes,
    night_minutes, instrument_real_minutes, instrument_sim_minutes, cross_country_minutes, landings_day, landings_night)
  select x_a, current_date - (g % 400), 90, 60, 30, 0, 15, 10, 5, 45, 1, g % 2
  from generate_series(1, 1100) as g;

  select count(*)::int as vuelos, sum(total_minutes)::int as total, sum(pic_minutes)::int as pic,
         sum(instrument_real_minutes + instrument_sim_minutes)::int as ifr,
         sum(landings_day + landings_night)::int as aterrizajes,
         coalesce(sum(total_minutes) filter (where flight_date >= (now() at time zone 'America/Bogota')::date - 30), 0)::int as ult30,
         max(flight_date) as ultimo
    into x_esperado
  from public.flights where user_id = x_a;

  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;
  select vuelos, minutos_total, minutos_pic, minutos_ifr, aterrizajes, minutos_ultimos_30_dias, ultimo_vuelo
    into x_visto
  from public.bitacora_resumen where user_id = x_a;
  if x_visto.vuelos <> x_esperado.vuelos or x_visto.vuelos <= 1000
     or x_visto.minutos_total <> x_esperado.total or x_visto.minutos_pic <> x_esperado.pic
     or x_visto.minutos_ifr <> x_esperado.ifr or x_visto.aterrizajes <> x_esperado.aterrizajes
     or x_visto.minutos_ultimos_30_dias <> x_esperado.ult30 or x_visto.ultimo_vuelo <> x_esperado.ultimo then
    raise exception 'FALLO bitacora_resumen % contra %', row_to_json(x_visto), row_to_json(x_esperado);
  end if;
  x_log := x_log || ' bitacora_completa';

  -- Cada piloto ve solo su fila.
  select count(*) into x_n from public.bitacora_resumen where user_id <> x_a;
  if x_n > 0 then raise exception 'FALLO se ven % resúmenes ajenos', x_n; end if;
  reset role;
  perform set_config('request.jwt.claims', json_build_object('sub', x_b, 'role', 'authenticated')::text, true);
  set local role authenticated;
  select count(*) into x_n from public.bitacora_resumen where user_id = x_a;
  if x_n > 0 then raise exception 'FALLO B ve el resumen de A'; end if;
  reset role;
  if has_table_privilege('anon', 'public.bitacora_resumen', 'select') then
    raise exception 'FALLO anon lee bitacora_resumen';
  end if;
  x_log := x_log || ' solo_la_propia';

  -- ICAO: más intentos que el corte, sobre pocas preguntas distintas.
  insert into public.user_icao_quiz_attempts (user_id, question_id, answer, is_correct)
  select x_a, q.id, q.correct_answer, true
  from (select id, correct_answer from public.icao_quiz_questions order by id limit 7) as q
  cross join generate_series(1, 215);

  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;
  x_r := public.icao_progreso();
  reset role;
  select count(distinct question_id) into x_n from public.user_icao_quiz_attempts where user_id = x_a;
  if (x_r ->> 'quiz_respondidas')::int <> x_n then
    raise exception 'FALLO icao_progreso quiz_respondidas % contra %', x_r ->> 'quiz_respondidas', x_n;
  end if;
  if (x_r ->> 'quiz_total')::int <= 0 or (x_r ->> 'vocabulario_total')::int <= 0 then
    raise exception 'FALLO icao_progreso totales %', x_r;
  end if;

  -- B no suma los intentos de A.
  perform set_config('request.jwt.claims', json_build_object('sub', x_b, 'role', 'authenticated')::text, true);
  set local role authenticated;
  x_r := public.icao_progreso();
  reset role;
  select count(distinct question_id) into x_n from public.user_icao_quiz_attempts where user_id = x_b;
  if (x_r ->> 'quiz_respondidas')::int <> x_n then raise exception 'FALLO icao_progreso mezcla pilotos'; end if;
  if has_function_privilege('anon', 'public.icao_progreso()', 'execute') then
    raise exception 'FALLO anon ejecuta icao_progreso';
  end if;
  x_log := x_log || ' icao_distintas';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
