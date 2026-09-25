-- ============================================================================
-- La evaluación entrega el tema de cada pregunta, y RAC y Combustible quedan
-- como dice el repo.
--
-- 1. evaluacion_iniciar entrega como tema la etiqueta de la fuente y, si no hay,
--    el tema que la pregunta trae en sus metadatos. Hasta ahora solo entregaba
--    la etiqueta, que solo tiene el simulacro, así que en los módulos de un solo
--    banco el resultado nunca decía qué repasar aunque la pantalla supiera
--    hacerlo: Aerodinámica («S04»), Performance («12»), RAC («U05») y Combustible
--    («C16»). También RVSM («R07»), que ya está en la base.
--    No cambia nada para los demás: los bancos de NOTAM, Meteorología,
--    Mercancías, Aeropuertos y Comunicaciones no traen tema, y el simulacro
--    conserva su etiqueta. Es la única línea que cambia en la función; el resto
--    es copia de 20260911194440, su única definición.
--
-- 2. rac_evaluacion y combustible_evaluacion exigen la lección completa
--    (modulo_leccion). La migración que se aplicó en la base las dejó en null
--    y la de 20260928000000 del repo no: sin esto la puerta la cuida solo la
--    pantalla.
--
-- 3. El catálogo de Combustible pasa de 66 a 76 prácticas: le faltaban los diez
--    escenarios del capítulo 23 (esc-01 a esc-10), que la app marca al abrir la
--    respuesta. Sin ellos la base rechaza esas marcas y el avance queda solo en
--    el navegador. Las claves salen de contenido/catalogo/modulos.json.
--
-- Antes de reemplazar la función se comprueba que la de la base es la que se
-- copió (o esta misma, si se corre dos veces): si alguien la cambió, se detiene
-- sin tocar nada y hay que comparar.
--
-- No depende de ninguna migración de módulo ni republica las funciones
-- compartidas: se puede correr en cualquier momento después de 20260911194440.
-- Prueba: supabase/tests/evaluacion_temas.sql.
--
-- GENERADO por el script de la sesión a partir de 20260911194440 y del catálogo.
-- ============================================================================

do $comprobar$
declare
  v_def text := pg_get_functiondef('public.evaluacion_iniciar(text)'::regprocedure);
begin
  if v_def not like '%''tema'', ef.etiqueta%'
     and v_def not like '%''tema'', coalesce(ef.etiqueta, bp.metadatos ->> ''tema'')%' then
    raise exception 'evaluacion_iniciar en la base no es la de 20260911194440: compárala antes de aplicar esto';
  end if;
end
$comprobar$;

-- ── 1 · evaluacion_iniciar ──────────────────────────────────────────────────

create or replace function public.evaluacion_iniciar(p_evaluacion text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_eval public.evaluaciones%rowtype;
  v_recientes int;
  v_ids uuid[] := '{}';
  v_fuente record;
  v_orden jsonb;
  v_sesion uuid;
  v_vence timestamptz;
  v_preguntas jsonb;
begin
  if v_user is null then
    raise exception 'unauthorized' using errcode = '28000';
  end if;

  select * into v_eval from public.evaluaciones where clave = p_evaluacion and activa;
  if not found then
    raise exception 'evaluacion_no_disponible' using errcode = 'P0002';
  end if;

  -- La lección antes de la evaluación, donde se pide: con lo que la base tiene
  -- registrado y existe en el catálogo, no con lo que diga la pantalla.
  if v_eval.modulo_leccion is not null
     and private.secciones_leidas(v_user, v_eval.modulo_leccion)
       < (select c.lecciones from public.modulos_contenido c where c.modulo = v_eval.modulo_leccion) then
    raise exception 'leccion_incompleta' using errcode = 'P0001';
  end if;

  -- Un intento nuevo a la vez por usuario, y un tope por hora: cada intento
  -- entrega preguntas, y al terminar, las correctas de lo respondido.
  perform pg_advisory_xact_lock(hashtextextended('evaluacion_iniciar:' || v_user::text, 0));
  select count(*) into v_recientes
  from public.evaluacion_sesiones
  where user_id = v_user and iniciada_en > now() - interval '1 hour';
  if v_recientes >= 10 then
    raise exception 'demasiados_intentos'
      using errcode = 'P0001', hint = 'Máximo 10 intentos por hora.';
  end if;

  -- Bancos con cupo: exactamente su cupo.
  for v_fuente in
    select banco, cupo from public.evaluacion_fuentes
    where evaluacion = p_evaluacion and cupo is not null
    order by banco
  loop
    v_ids := v_ids || array(
      select bp.id from public.banco_preguntas bp
      where bp.banco = v_fuente.banco and bp.activa
      order by random()
      limit v_fuente.cupo
    );
  end loop;

  -- Bancos sin cupo: se sortean juntos para completar el intento.
  v_ids := v_ids || array(
    select bp.id from public.banco_preguntas bp
    where bp.activa
      and bp.banco in (
        select ef.banco from public.evaluacion_fuentes ef
        where ef.evaluacion = p_evaluacion and ef.cupo is null
      )
    order by random()
    limit greatest(v_eval.preguntas_por_intento - cardinality(v_ids), 0)
  );

  if cardinality(v_ids) = 0 then
    raise exception 'banco_vacio' using errcode = 'P0002';
  end if;

  -- Orden final al azar, para que los bancos con cupo no queden en bloque.
  select array_agg(q order by random()) into v_ids from unnest(v_ids) as q;

  -- Orden de opciones de cada pregunta, calculado una sola vez y guardado.
  select jsonb_agg(
    case when v_eval.barajar_opciones
      then (select jsonb_agg(i order by random()) from generate_series(0, jsonb_array_length(bp.opciones) - 1) as i)
      else (select jsonb_agg(i order by i) from generate_series(0, jsonb_array_length(bp.opciones) - 1) as i)
    end
    order by s.pos
  )
  into v_orden
  from unnest(v_ids) with ordinality as s(qid, pos)
  join public.banco_preguntas bp on bp.id = s.qid;

  v_vence := now() + make_interval(mins => v_eval.minutos_vigencia);

  insert into public.evaluacion_sesiones (user_id, evaluacion, preguntas, orden_opciones, vence_en)
  values (v_user, p_evaluacion, v_ids, v_orden, v_vence)
  returning id into v_sesion;

  -- Lo que ve el piloto: enunciado y opciones en el orden de la sesión. Sin la
  -- correcta, sin la explicación y sin el id interno de la pregunta.
  --
  -- El tema es la etiqueta de la fuente cuando la hay (el simulacro: «NOTAM»,
  -- «Meteorología»), y si no, el que trae la pregunta en sus metadatos («U05»,
  -- «C16», «S04», «12»). Con eso el resultado dice qué repasar en los módulos de
  -- un solo banco; antes el tema salía nulo en todos ellos.
  select jsonb_agg(
    jsonb_build_object(
      'posicion', s.pos,
      'enunciado', bp.enunciado,
      'opciones', (
        select jsonb_agg(bp.opciones -> (o.indice)::int order by o.ord)
        from jsonb_array_elements_text(v_orden -> (s.pos - 1)::int) with ordinality as o(indice, ord)
      ),
      'tema', coalesce(ef.etiqueta, bp.metadatos ->> 'tema')
    )
    order by s.pos
  )
  into v_preguntas
  from unnest(v_ids) with ordinality as s(qid, pos)
  join public.banco_preguntas bp on bp.id = s.qid
  left join public.evaluacion_fuentes ef on ef.evaluacion = p_evaluacion and ef.banco = bp.banco;

  return jsonb_build_object(
    'sesion', v_sesion,
    'vence_en', v_vence,
    'retroalimentacion', v_eval.retroalimentacion,
    'aprobacion', v_eval.aprobacion,
    'total', cardinality(v_ids),
    'preguntas', v_preguntas
  );
end
$$;

revoke all on function public.evaluacion_iniciar(text) from public, anon;
grant execute on function public.evaluacion_iniciar(text) to authenticated, service_role;

-- ── 2 · La lección antes de la evaluación, en el servidor ──────────────────

update public.evaluaciones set modulo_leccion = 'rac'
where clave = 'rac_evaluacion' and modulo_leccion is distinct from 'rac';

update public.evaluaciones set modulo_leccion = 'combustible'
where clave = 'combustible_evaluacion' and modulo_leccion is distinct from 'combustible';

-- ── 3 · El catálogo de Combustible, con los diez escenarios ────────────────

update public.modulos_contenido
set lecciones = 23,
    practicas = array['c01-q1', 'c01-q2', 'c01-q3', 'c02-q1', 'c02-q2', 'c02-q3', 'c03-q1', 'c03-q2', 'c03-q3', 'c04-q1', 'c04-q2', 'c04-q3', 'c05-q1', 'c05-q2', 'c05-q3', 'c06-q1', 'c06-q2', 'c06-q3', 'c07-q1', 'c07-q2', 'c07-q3', 'c08-q1', 'c08-q2', 'c08-q3', 'c09-q1', 'c09-q2', 'c09-q3', 'c10-q1', 'c10-q2', 'c10-q3', 'c11-q1', 'c11-q2', 'c11-q3', 'c12-q1', 'c12-q2', 'c12-q3', 'c13-q1', 'c13-q2', 'c13-q3', 'c14-q1', 'c14-q2', 'c14-q3', 'c15-q1', 'c15-q2', 'c15-q3', 'c16-q1', 'c16-q2', 'c16-q3', 'c17-q1', 'c17-q2', 'c17-q3', 'c18-q1', 'c18-q2', 'c18-q3', 'c19-q1', 'c19-q2', 'c19-q3', 'c20-q1', 'c20-q2', 'c20-q3', 'c21-q1', 'c21-q2', 'c21-q3', 'c22-q1', 'c22-q2', 'c22-q3', 'esc-01', 'esc-02', 'esc-03', 'esc-04', 'esc-05', 'esc-06', 'esc-07', 'esc-08', 'esc-09', 'esc-10']::text[],
    actualizado_en = now()
where modulo = 'combustible';
