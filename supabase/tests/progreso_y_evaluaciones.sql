-- ============================================================================
-- Progreso de módulo y evaluaciones: solo cuenta lo que existe en el catálogo,
-- la lección completa abre la evaluación y la corrección llega solo de lo
-- respondido. Migración 20260911194440.
--
-- Escribe filas de prueba y las deshace: termina en PRUEBA_DESHECHA con la
-- lista de lo verificado, o en FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid; x_b uuid; x_n int; x_m int; x_i int; x_clave text; x_r jsonb; x_sesion uuid; x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;
  select id into x_b from auth.users order by created_at offset 1 limit 1;

  select lecciones, cardinality(practicas) into x_n, x_m from public.modulos_contenido where modulo = 'notam';
  if x_n <> 9 or x_m <> 131 then raise exception 'FALLO catalogo notam % %', x_n, x_m; end if;
  select practicas[1] into x_clave from public.modulos_contenido where modulo = 'notam';

  -- Punto de partida conocido para A y B (dentro de la transacción). B tiene
  -- ocho secciones válidas y una 13 de una versión vieja de la lección.
  delete from public.user_notam_progress where user_id in (x_a, x_b);
  insert into public.user_notam_progress (user_id, lesson_screens, practice_done) values (x_b, '{1,2,3,4,5,6,7,8,13}', '{ex-1}');
  delete from public.evaluacion_sesiones where user_id in (x_a, x_b);

  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;

  -- Marcas: solo lo que existe en el catálogo del módulo.
  perform public.notam_mark_progress(1::smallint, null);
  perform public.notam_mark_progress(null, x_clave);
  begin
    perform public.notam_mark_progress(10::smallint, null);
    raise exception 'FALLO seccion 10 aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' seccion_fuera';
  end;
  begin
    perform public.notam_mark_progress(null, 'inventada-999');
    raise exception 'FALLO practica inventada aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' practica_inventada';
  end;
  begin
    perform public.metar_mark_progress(null, 'txt-1');
    raise exception 'FALLO clave de otro modulo aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' clave_ajena';
  end;
  perform public.metar_mark_progress(30::smallint, 'ex-10');
  perform public.mercancias_mark_progress(18::smallint, 'etq-reconoce');

  -- La evaluación de NOTAM se abre con las nueve secciones.
  begin
    perform public.evaluacion_iniciar('notam_evaluacion');
    raise exception 'FALLO abrio sin leccion';
  exception when others then if sqlerrm <> 'leccion_incompleta' then raise; end if;
  end;
  for x_i in 2..9 loop
    perform public.notam_mark_progress(x_i::smallint, null);
  end loop;
  x_r := public.evaluacion_iniciar('notam_evaluacion');
  x_sesion := (x_r ->> 'sesion')::uuid;
  x_log := x_log || ' puerta_ok';

  -- Terminar: la corrección solo de lo respondido, también al pedirla de nuevo.
  perform public.evaluacion_responder(x_sesion, 1, 0);
  x_r := public.evaluacion_terminar(x_sesion);
  if (x_r -> 'revision' -> 0 ->> 'opcion_correcta') is null or (x_r -> 'revision' -> 0 ->> 'explicacion') is null then
    raise exception 'FALLO respondida sin correccion %', x_r -> 'revision' -> 0;
  end if;
  select count(*) into x_n from jsonb_array_elements(x_r -> 'revision') e
  where (e ->> 'opcion') is null and ((e ->> 'opcion_correcta') is not null or (e ->> 'explicacion') is not null or (e ->> 'referencia') is not null);
  if x_n > 0 then raise exception 'FALLO % sin responder con clave', x_n; end if;
  x_r := public.evaluacion_terminar(x_sesion);
  select count(*) into x_n from jsonb_array_elements(x_r -> 'revision') e where (e ->> 'opcion') is null and (e ->> 'opcion_correcta') is not null;
  if x_n > 0 then raise exception 'FALLO repetir terminar entrega clave'; end if;
  x_log := x_log || ' clave_solo_respondidas';

  -- El detalle guardado del intento no lo lee el cliente, ni el catálogo.
  begin
    perform answers from public.user_notam_exam_attempts where user_id = x_a;
    raise exception 'FALLO answers legible';
  exception when insufficient_privilege then x_log := x_log || ' answers_oculto';
  end;
  perform score, correct_count, total_questions, passed, duration_seconds, created_at from public.user_notam_exam_attempts where user_id = x_a;
  begin
    perform 1 from public.modulos_contenido;
    raise exception 'FALLO catalogo legible';
  exception when insufficient_privilege then x_log := x_log || ' catalogo_privado';
  end;
  reset role;

  select count(*) into x_n from public.user_notam_exam_attempts a, jsonb_array_elements(a.answers) d
  where a.user_id = x_a and (d ->> 'elegida') = '' and (d ->> 'correcta') is not null;
  if x_n > 0 then raise exception 'FALLO detalle guarda % correctas sin responder', x_n; end if;

  -- La sección 13 vieja de B no cuenta; METAR no pide lección.
  perform set_config('request.jwt.claims', json_build_object('sub', x_b, 'role', 'authenticated')::text, true);
  set local role authenticated;
  begin
    perform public.evaluacion_iniciar('notam_evaluacion');
    raise exception 'FALLO la seccion 13 vieja conto';
  exception when others then if sqlerrm <> 'leccion_incompleta' then raise; end if;
  end;
  perform public.evaluacion_iniciar('metar_evaluacion');
  x_log := x_log || ' viejo_no_cuenta metar_sin_puerta';
  reset role;

  -- Tope: 10 intentos por hora.
  insert into public.evaluacion_sesiones (user_id, evaluacion, preguntas, orden_opciones, vence_en)
  select s.user_id, s.evaluacion, s.preguntas, s.orden_opciones, s.vence_en
  from (select * from public.evaluacion_sesiones where user_id = x_b and evaluacion = 'metar_evaluacion' limit 1) s
  cross join generate_series(1, 9);
  set local role authenticated;
  begin
    perform public.evaluacion_iniciar('metar_evaluacion');
    raise exception 'FALLO tope 10';
  exception when others then if sqlerrm <> 'demasiados_intentos' then raise; end if;
  end;
  x_log := x_log || ' tope_10';
  reset role;

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;
