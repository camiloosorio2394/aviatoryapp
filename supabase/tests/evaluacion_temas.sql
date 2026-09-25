-- ============================================================================
-- La evaluación entrega el tema de cada pregunta: el de la fuente si lo tiene
-- (el simulacro) y si no, el de los metadatos de la pregunta. Y RAC y
-- Combustible quedan como dice el repo. Migración 20260930000000_evaluacion_entrega_el_tema_del_banco.
--
-- Comprueba que:
--   · Aerodinámica, Performance, RAC y Combustible entregan tema en cada
--     pregunta, con la forma que sus pantallas convierten en enlace;
--   · NOTAM sigue sin tema (su banco no lo trae) y el simulacro conserva su
--     etiqueta: la línea nueva no cambia nada a los demás;
--   · RAC y Combustible exigen la lección completa en el servidor (con una
--     lección menos no abren);
--   · el catálogo de Combustible trae los diez escenarios.
--
-- Abre seis evaluaciones: con cinco o más sesiones de A en la última hora
-- evaluacion_iniciar diría demasiados_intentos; entonces se espera y se repite.
--
-- ESCRITA SIN BASE DONDE CORRERLA (24-sep-2026): sigue la forma de
-- supabase/tests/rac_y_combustible.sql. GENERADA con la migración.
--
-- No borra filas: el punto de partida se fija con upsert y todo lo escrito se
-- deshace. Termina en PRUEBA_DESHECHA con la lista de lo verificado, o en
-- FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid; x_n int; x_r jsonb; x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;
  if x_a is null then raise exception 'FALLO hace falta un usuario'; end if;
  select count(*) into x_n from public.evaluacion_sesiones
  where user_id = x_a and iniciada_en > now() - interval '1 hour';
  if x_n > 4 then raise exception 'FALLO A abrió % evaluaciones en la última hora: espera y repite', x_n; end if;

  -- ── La función ────────────────────────────────────────────────────────────
  if pg_get_functiondef('public.evaluacion_iniciar(text)'::regprocedure)
     not like '%''tema'', coalesce(ef.etiqueta, bp.metadatos ->> ''tema'')%' then
    raise exception 'FALLO evaluacion_iniciar no entrega el tema del banco';
  end if;
  if has_function_privilege('anon', 'public.evaluacion_iniciar(text)', 'execute')
     or not has_function_privilege('authenticated', 'public.evaluacion_iniciar(text)', 'execute') then
    raise exception 'FALLO permisos de evaluacion_iniciar';
  end if;
  x_log := x_log || ' funcion_y_permisos';

  -- ── Lo alineado con el repo ───────────────────────────────────────────────
  select count(*) into x_n from public.evaluaciones
  where (clave, modulo_leccion) in (('rac_evaluacion', 'rac'), ('combustible_evaluacion', 'combustible'));
  if x_n <> 2 then raise exception 'FALLO RAC o Combustible no exigen su lección'; end if;
  select cardinality(practicas) into x_n from public.modulos_contenido where modulo = 'combustible';
  if x_n <> 76 then raise exception 'FALLO el catálogo de combustible tiene % prácticas', x_n; end if;
  select count(*) into x_n from public.modulos_contenido, unnest(practicas) p
  where modulo = 'combustible' and p ~ '^esc-(0[1-9]|10)$';
  if x_n <> 10 then raise exception 'FALLO faltan escenarios en el catálogo de combustible: %', x_n; end if;
  x_log := x_log || ' rac_y_combustible_como_el_repo';

  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);

  -- ── La puerta de RAC, ahora en el servidor ────────────────────────────────
  insert into public.user_rac_progress (user_id, lesson_screens, practice_done)
  values (x_a, (select array_agg(i::smallint) from generate_series(1, 18) i), '{}')
  on conflict (user_id) do update set lesson_screens = excluded.lesson_screens;
  set local role authenticated;
  begin
    perform public.evaluacion_iniciar('rac_evaluacion');
    raise exception 'FALLO rac abrió con 18 lecciones';
  exception when others then if sqlerrm <> 'leccion_incompleta' then raise; end if;
  end;
  reset role;
  x_log := x_log || ' rac_cerrada_con_18';

  -- rac: con la lección completa abre, y cada pregunta trae su tema.
  select lecciones into x_n from public.modulos_contenido where modulo = 'rac';
  insert into public.user_rac_progress (user_id, lesson_screens, practice_done)
  values (x_a, (select array_agg(i::smallint) from generate_series(1, x_n) i), '{}')
  on conflict (user_id) do update set lesson_screens = excluded.lesson_screens;
  set local role authenticated;
  x_r := public.evaluacion_iniciar('rac_evaluacion');
  reset role;
  select count(*) into x_n from jsonb_array_elements(x_r -> 'preguntas') e
  where coalesce(e ->> 'tema', '') !~ '^U[0-9]{2}$';
  if x_n <> 0 or jsonb_array_length(x_r -> 'preguntas') = 0 then
    raise exception 'FALLO rac: % preguntas sin tema de la forma ^U[0-9]{2}$', x_n;
  end if;
  x_log := x_log || ' rac_con_tema';

  -- combustible: con la lección completa abre, y cada pregunta trae su tema.
  select lecciones into x_n from public.modulos_contenido where modulo = 'combustible';
  insert into public.user_combustible_progress (user_id, lesson_screens, practice_done)
  values (x_a, (select array_agg(i::smallint) from generate_series(1, x_n) i), '{}')
  on conflict (user_id) do update set lesson_screens = excluded.lesson_screens;
  set local role authenticated;
  x_r := public.evaluacion_iniciar('combustible_evaluacion');
  reset role;
  select count(*) into x_n from jsonb_array_elements(x_r -> 'preguntas') e
  where coalesce(e ->> 'tema', '') !~ '^C[0-9]{2}$';
  if x_n <> 0 or jsonb_array_length(x_r -> 'preguntas') = 0 then
    raise exception 'FALLO combustible: % preguntas sin tema de la forma ^C[0-9]{2}$', x_n;
  end if;
  x_log := x_log || ' combustible_con_tema';

  -- aerodinamica: con la lección completa abre, y cada pregunta trae su tema.
  select lecciones into x_n from public.modulos_contenido where modulo = 'aerodinamica';
  insert into public.user_aerodinamica_progress (user_id, lesson_screens, practice_done)
  values (x_a, (select array_agg(i::smallint) from generate_series(1, x_n) i), '{}')
  on conflict (user_id) do update set lesson_screens = excluded.lesson_screens;
  set local role authenticated;
  x_r := public.evaluacion_iniciar('aerodinamica_evaluacion');
  reset role;
  select count(*) into x_n from jsonb_array_elements(x_r -> 'preguntas') e
  where coalesce(e ->> 'tema', '') !~ '^S[0-9]{2}$';
  if x_n <> 0 or jsonb_array_length(x_r -> 'preguntas') = 0 then
    raise exception 'FALLO aerodinamica: % preguntas sin tema de la forma ^S[0-9]{2}$', x_n;
  end if;
  x_log := x_log || ' aerodinamica_con_tema';

  -- performance: con la lección completa abre, y cada pregunta trae su tema.
  select lecciones into x_n from public.modulos_contenido where modulo = 'performance';
  insert into public.user_performance_progress (user_id, lesson_screens, practice_done)
  values (x_a, (select array_agg(i::smallint) from generate_series(1, x_n) i), '{}')
  on conflict (user_id) do update set lesson_screens = excluded.lesson_screens;
  set local role authenticated;
  x_r := public.evaluacion_iniciar('performance_evaluacion');
  reset role;
  select count(*) into x_n from jsonb_array_elements(x_r -> 'preguntas') e
  where coalesce(e ->> 'tema', '') !~ '^[0-9]+$';
  if x_n <> 0 or jsonb_array_length(x_r -> 'preguntas') = 0 then
    raise exception 'FALLO performance: % preguntas sin tema de la forma ^[0-9]+$', x_n;
  end if;
  x_log := x_log || ' performance_con_tema';

  -- ── Los demás, como estaban ───────────────────────────────────────────────
  -- NOTAM: su banco no trae tema, así que sigue sin tema.
  select lecciones into x_n from public.modulos_contenido where modulo = 'notam';
  insert into public.user_notam_progress (user_id, lesson_screens, practice_done)
  values (x_a, (select array_agg(i::smallint) from generate_series(1, x_n) i), '{}')
  on conflict (user_id) do update set lesson_screens = excluded.lesson_screens;
  set local role authenticated;
  x_r := public.evaluacion_iniciar('notam_evaluacion');
  reset role;
  select count(*) into x_n from jsonb_array_elements(x_r -> 'preguntas') e where e ->> 'tema' is not null;
  if x_n <> 0 then raise exception 'FALLO notam ahora trae tema en % preguntas', x_n; end if;
  x_log := x_log || ' notam_sin_tema';

  -- El simulacro: la etiqueta de la fuente, como antes.
  set local role authenticated;
  x_r := public.evaluacion_iniciar('simulacro_aerolinea');
  reset role;
  select count(*) into x_n from jsonb_array_elements(x_r -> 'preguntas') e
  where e ->> 'tema' is null
     or e ->> 'tema' not in (select etiqueta from public.evaluacion_fuentes where evaluacion = 'simulacro_aerolinea');
  if x_n <> 0 then raise exception 'FALLO el simulacro perdió la etiqueta en % preguntas', x_n; end if;
  x_log := x_log || ' simulacro_con_etiqueta';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
