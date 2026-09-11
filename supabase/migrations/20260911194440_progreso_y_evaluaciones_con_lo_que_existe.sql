-- ============================================================================
-- Progreso y evaluaciones con lo que existe.
--
-- Hallazgos de la segunda auditoría:
--   - *_mark_progress aceptaba cualquier texto como práctica y cualquier número
--     de sección entre 1 y 60: con claves inventadas se llegaba a los umbrales de
--     los logros de práctica y de lección sin hacer nada.
--   - La regla «la evaluación se abre con la lección completa» solo existía en
--     la pantalla (ExamenModulo).
--   - evaluacion_terminar devolvía la correcta y la explicación de TODAS las
--     preguntas, también las no respondidas: empezar un intento y terminarlo en
--     seguida entregaba el banco de ese intento. Con 30 intentos por hora.
--   - user_notam_exam_attempts.answers guardaba el texto correcto de todas las
--     preguntas y el cliente podía leerlo.
--
-- Cambios:
--   1. modulos_contenido: cuántas secciones tiene cada lección y qué claves de
--      práctica existen. Sale de contenido/catalogo/modulos.json, que una prueba
--      compara con el contenido (scripts/catalogo). Solo lo leen funciones.
--   2. Las tres *_mark_progress validan contra ese catálogo.
--   3. evaluaciones.modulo_leccion: NOTAM y Mercancías piden la lección completa
--      en la base para abrir la evaluación. Tope de intentos: 10 por hora.
--   4. evaluacion_terminar entrega la correcta, la explicación y la referencia
--      solo de lo respondido.
--   5. El cliente deja de leer user_notam_exam_attempts.answers.
--
-- No borra ni cambia filas de usuarios: el progreso viejo con claves que ya no
-- existen se queda, y lo que cuenta lo decide el catálogo.
-- ============================================================================

-- ─── 1. Catálogo de contenido ───────────────────────────────────────────────
create table if not exists public.modulos_contenido (
  modulo text primary key check (modulo ~ '^[a-z_]+$'),
  lecciones smallint not null check (lecciones > 0),
  practicas text[] not null default '{}',
  actualizado_en timestamptz not null default now()
);
alter table public.modulos_contenido enable row level security;
revoke all on table public.modulos_contenido from anon, authenticated;

insert into public.modulos_contenido (modulo, lecciones, practicas) values
  ('notam', 9, array['real-R01', 'real-R02', 'real-R03', 'real-R04', 'real-R05', 'real-R06', 'real-R07', 'real-R08', 'real-R09', 'real-R10', 'real-R11', 'real-R12', 'real-R13', 'real-R14', 'real-R15', 'real-R16', 'real-R17', 'real-R18', 'real-R19', 'real-R20', 'real-R21', 'real-R22', 'real-R23', 'real-R24', 'real-R25', 'real-R26', 'real-R27', 'real-R28', 'real-R29', 'real-R30', 'real-R31', 'txt-1', 'txt-2', 'txt-3', 'txt-4', 'txt-5', 'txt-6', 'txt-7', 'txt-8', 'txt-9', 'txt-10', 'txt-11', 'txt-12', 'txt-13', 'txt-14', 'txt-15', 'txt-16', 'txt-17', 'txt-18', 'txt-19', 'txt-20', 'txt-21', 'txt-22', 'txt-23', 'txt-24', 'txt-25', 'txt-26', 'txt-27', 'txt-28', 'txt-29', 'txt-30', 'txt-31', 'txt-32', 'txt-33', 'txt-34', 'txt-35', 'txt-36', 'txt-37', 'txt-38', 'txt-39', 'txt-40', 'txt-41', 'txt-42', 'txt-43', 'txt-44', 'txt-45', 'txt-46', 'txt-47', 'txt-48', 'txt-49', 'txt-50', 'txt-51', 'txt-52', 'txt-53', 'txt-54', 'txt-55', 'txt-56', 'txt-57', 'txt-58', 'txt-59', 'txt-60', 'txt-61', 'txt-62', 'txt-63', 'txt-64', 'txt-65', 'txt-66', 'txt-67', 'txt-68', 'txt-69', 'txt-70', 'txt-71', 'txt-72', 'txt-73', 'txt-74', 'txt-75', 'txt-76', 'txt-77', 'txt-78', 'txt-79', 'txt-80', 'txt-81', 'txt-82', 'txt-83', 'txt-84', 'txt-85', 'txt-86', 'txt-87', 'txt-88', 'txt-89', 'txt-90', 'txt-91', 'txt-92', 'txt-93', 'txt-94', 'txt-95', 'txt-96', 'txt-97', 'txt-98', 'txt-99', 'txt-100']::text[]),
  ('metar', 30, array['ex-1', 'ex-2', 'ex-3', 'ex-4', 'ex-5', 'ex-6', 'ex-7', 'ex-8', 'ex-9', 'ex-10']::text[]),
  ('mercancias', 18, array['etq-reconoce', 'etq-criterio', 'etq-trampas', 'etq-familia', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'esc-puerta', 'esc-grupo', 'esc-cao', 'esc-humo', 'esc-comat', 'esc-etiqueta', 'esc-monomotor', 'esc-silla', 'esc-averia', 'esc-dispensa', 'ent-1', 'ent-2', 'ent-3', 'ent-4', 'ent-5', 'ent-6', 'ent-7', 'ent-8', 'ent-9', 'ent-10', 'ent-11', 'ent-12', 'ent-13', 'ent-14', 'ent-15', 'ent-16', 'ent-17', 'ent-18', 'ent-19', 'ent-20', 'ent-21', 'ent-22', 'ent-23', 'ent-24', 'ent-25']::text[])
on conflict (modulo) do update set
  lecciones = excluded.lecciones,
  practicas = excluded.practicas,
  actualizado_en = now();

-- ─── 2. Lo que cuenta de un módulo ──────────────────────────────────────────
create or replace function private.validar_marca_progreso(p_modulo text, p_lesson_screen smallint, p_practice_id text)
returns void
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_catalogo public.modulos_contenido%rowtype;
begin
  select * into v_catalogo from public.modulos_contenido where modulo = p_modulo;
  if not found then
    raise exception 'catalogo_no_disponible' using errcode = 'P0002';
  end if;
  if p_lesson_screen is not null and p_lesson_screen not between 1 and v_catalogo.lecciones then
    raise exception 'leccion_invalida' using errcode = '22023';
  end if;
  if p_practice_id is not null and not (p_practice_id = any (v_catalogo.practicas)) then
    raise exception 'practica_invalida' using errcode = '22023';
  end if;
end
$$;

/** Secciones de la lección que el piloto tiene en la base y existen en el catálogo. */
create or replace function private.secciones_leidas(p_user uuid, p_modulo text)
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select count(distinct s)::int
  from (
    select unnest(lesson_screens) as s from public.user_notam_progress where p_modulo = 'notam' and user_id = p_user
    union all
    select unnest(lesson_screens) from public.user_metar_progress where p_modulo = 'metar' and user_id = p_user
    union all
    select unnest(lesson_screens) from public.user_mercancias_progress where p_modulo = 'mercancias' and user_id = p_user
  ) as leidas
  where s between 1 and (select c.lecciones from public.modulos_contenido c where c.modulo = p_modulo)
$$;

revoke all on function private.validar_marca_progreso(text, smallint, text) from public;
revoke all on function private.secciones_leidas(uuid, text) from public;

-- ─── 3. Marcas de progreso ──────────────────────────────────────────────────
create or replace function public.notam_mark_progress(p_lesson_screen smallint default null, p_practice_id text default null)
returns public.user_notam_progress
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.user_notam_progress;
begin
  if auth.uid() is null then
    raise exception 'no authenticated user';
  end if;
  perform private.validar_marca_progreso('notam', p_lesson_screen, p_practice_id);

  insert into public.user_notam_progress (user_id, lesson_screens, practice_done, updated_at)
  values (
    auth.uid(),
    case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end,
    case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end,
    now()
  )
  on conflict (user_id) do update set
    lesson_screens = (
      select coalesce(array_agg(distinct s order by s), '{}'::smallint[])
      from unnest(
        public.user_notam_progress.lesson_screens ||
        case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end
      ) as s
    ),
    practice_done = (
      select coalesce(array_agg(distinct p order by p), '{}'::text[])
      from unnest(
        public.user_notam_progress.practice_done ||
        case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end
      ) as p
    ),
    updated_at = now()
  returning * into v_row;

  return v_row;
end
$$;

create or replace function public.metar_mark_progress(p_lesson_screen smallint default null, p_practice_id text default null)
returns public.user_metar_progress
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.user_metar_progress;
begin
  if auth.uid() is null then
    raise exception 'no authenticated user';
  end if;
  perform private.validar_marca_progreso('metar', p_lesson_screen, p_practice_id);

  insert into public.user_metar_progress (user_id, lesson_screens, practice_done, updated_at)
  values (
    auth.uid(),
    case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end,
    case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end,
    now()
  )
  on conflict (user_id) do update set
    lesson_screens = (
      select coalesce(array_agg(distinct s order by s), '{}'::smallint[])
      from unnest(
        public.user_metar_progress.lesson_screens ||
        case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end
      ) as s
    ),
    practice_done = (
      select coalesce(array_agg(distinct p order by p), '{}'::text[])
      from unnest(
        public.user_metar_progress.practice_done ||
        case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end
      ) as p
    ),
    updated_at = now()
  returning * into v_row;

  return v_row;
end
$$;

create or replace function public.mercancias_mark_progress(p_lesson_screen smallint default null, p_practice_id text default null)
returns public.user_mercancias_progress
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.user_mercancias_progress;
begin
  if auth.uid() is null then
    raise exception 'no authenticated user';
  end if;
  perform private.validar_marca_progreso('mercancias', p_lesson_screen, p_practice_id);

  insert into public.user_mercancias_progress (user_id, lesson_screens, practice_done, updated_at)
  values (
    auth.uid(),
    case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end,
    case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end,
    now()
  )
  on conflict (user_id) do update set
    lesson_screens = (
      select coalesce(array_agg(distinct s order by s), '{}'::smallint[])
      from unnest(
        public.user_mercancias_progress.lesson_screens ||
        case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end
      ) as s
    ),
    practice_done = (
      select coalesce(array_agg(distinct p order by p), '{}'::text[])
      from unnest(
        public.user_mercancias_progress.practice_done ||
        case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end
      ) as p
    ),
    updated_at = now()
  returning * into v_row;

  return v_row;
end
$$;

-- ─── 4. Evaluaciones ────────────────────────────────────────────────────────
alter table public.evaluaciones add column if not exists modulo_leccion text references public.modulos_contenido (modulo);
create index if not exists evaluaciones_modulo_leccion_fk_idx on public.evaluaciones (modulo_leccion);
update public.evaluaciones set modulo_leccion = 'notam' where clave = 'notam_evaluacion' and modulo_leccion is null;
update public.evaluaciones set modulo_leccion = 'mercancias' where clave = 'mercancias_evaluacion' and modulo_leccion is null;

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
  select jsonb_agg(
    jsonb_build_object(
      'posicion', s.pos,
      'enunciado', bp.enunciado,
      'opciones', (
        select jsonb_agg(bp.opciones -> (o.indice)::int order by o.ord)
        from jsonb_array_elements_text(v_orden -> (s.pos - 1)::int) with ordinality as o(indice, ord)
      ),
      'tema', ef.etiqueta
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

create or replace function public.evaluacion_terminar(p_sesion uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_s public.evaluacion_sesiones%rowtype;
  v_eval public.evaluaciones%rowtype;
  v_total int;
  v_puntaje smallint;
  v_aprobada boolean;
  v_duracion int;
  v_revision jsonb;
  v_detalle jsonb;
begin
  if v_user is null then
    raise exception 'unauthorized' using errcode = '28000';
  end if;

  select * into v_s
  from public.evaluacion_sesiones
  where id = p_sesion and user_id = v_user
  for update;
  if not found then
    raise exception 'sesion_no_encontrada' using errcode = 'P0002';
  end if;

  select * into v_eval from public.evaluaciones where clave = v_s.evaluacion;
  v_total := cardinality(v_s.preguntas);

  -- Revisión: por posición, lo elegido y si acertó. La correcta, la explicación
  -- y la referencia van solo en lo respondido: terminar un intento sin responder
  -- no entrega el banco. Las preguntas sin responder cuentan como incorrectas.
  select
    jsonb_agg(
      jsonb_build_object(
        'posicion', s.pos,
        'opcion', (v_s.respuestas -> s.pos::text ->> 'opcion')::int,
        'correcta', coalesce((v_s.respuestas -> s.pos::text ->> 'correcta')::boolean, false),
        'opcion_correcta', case when v_s.respuestas ? s.pos::text
          then private.opcion_correcta_mostrada(v_s.orden_opciones -> (s.pos - 1)::int, bp.correcta) end,
        'explicacion', case when v_s.respuestas ? s.pos::text then bp.explicacion end,
        'referencia', case when v_s.respuestas ? s.pos::text then bp.referencia end
      )
      order by s.pos
    ),
    -- El detalle que la tabla de NOTAM ya guardaba: texto elegido y, si se
    -- respondió, el correcto.
    jsonb_agg(
      jsonb_build_object(
        'id', bp.clave_externa,
        'elegida', coalesce(
          bp.opciones ->> ((v_s.orden_opciones -> (s.pos - 1)::int ->> ((v_s.respuestas -> s.pos::text ->> 'opcion')::int))::int),
          ''
        ),
        'correcta', case when v_s.respuestas ? s.pos::text then bp.opciones ->> bp.correcta end,
        'ok', coalesce((v_s.respuestas -> s.pos::text ->> 'correcta')::boolean, false)
      )
      order by s.pos
    )
  into v_revision, v_detalle
  from unnest(v_s.preguntas) with ordinality as s(qid, pos)
  join public.banco_preguntas bp on bp.id = s.qid;

  if v_s.terminada_en is null then
    v_puntaje := round(100.0 * v_s.correctas / v_total);
    v_aprobada := v_puntaje >= v_eval.aprobacion;
    v_duracion := least(extract(epoch from now() - v_s.iniciada_en), 86400)::int;

    update public.evaluacion_sesiones
    set terminada_en = now(), puntaje = v_puntaje, aprobada = v_aprobada
    where id = p_sesion;

    -- El resultado va a la tabla de intentos del módulo: su historial y sus
    -- disparadores de logros siguen funcionando igual.
    case v_eval.destino
      when 'notam' then
        insert into public.user_notam_exam_attempts
          (user_id, score, correct_count, total_questions, passed, answers, duration_seconds)
        values (v_user, v_puntaje, v_s.correctas, v_total, v_aprobada, v_detalle, v_duracion);
      when 'metar' then
        insert into public.user_metar_exam_attempts (user_id, score, correct, total)
        values (v_user, v_puntaje, v_s.correctas, v_total);
      when 'mercancias' then
        insert into public.user_mercancias_exam_attempts (user_id, score, correct, total)
        values (v_user, v_puntaje, v_s.correctas, v_total);
      when 'simulacro_aerolinea' then
        insert into public.user_airline_mock_attempts (user_id, score, correct, total)
        values (v_user, v_puntaje, v_s.correctas, v_total);
    end case;

    -- Terminar una evaluación es un día de estudio.
    perform public.record_daily_activity(v_total, v_s.correctas, ceil(v_duracion / 60.0)::int);
    perform public.increment_streak();
  else
    v_puntaje := v_s.puntaje;
    v_aprobada := v_s.aprobada;
    v_duracion := least(extract(epoch from v_s.terminada_en - v_s.iniciada_en), 86400)::int;
  end if;

  return jsonb_build_object(
    'puntaje', v_puntaje,
    'correctas', v_s.correctas,
    'total', v_total,
    'aprobada', v_aprobada,
    'aprobacion', v_eval.aprobacion,
    'duracion_segundos', v_duracion,
    'revision', v_revision
  );
end
$$;

-- ─── 5. Intentos de NOTAM: el cliente no lee el detalle ─────────────────────
revoke select on table public.user_notam_exam_attempts from authenticated;
grant select (id, user_id, score, correct_count, total_questions, passed, duration_seconds, created_at)
  on table public.user_notam_exam_attempts to authenticated;
