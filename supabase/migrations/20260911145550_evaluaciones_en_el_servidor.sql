-- ============================================================================
-- Evaluaciones calificadas en el servidor
--
-- Hasta hoy las evaluaciones de NOTAM, Meteorología, Mercancías peligrosas y el
-- simulacro de aerolínea viajaban enteras al navegador, con la respuesta
-- correcta de cada pregunta, y el navegador calculaba el puntaje y lo insertaba
-- en la tabla de intentos. Cualquiera podía leer las respuestas o guardarse un
-- 100, y con él los logros.
--
-- Ahora:
--   - Las preguntas viven en banco_preguntas, que el navegador no puede leer.
--   - evaluacion_iniciar sortea las preguntas y devuelve enunciado y opciones,
--     sin la correcta. Las opciones se barajan en el servidor.
--   - evaluacion_responder registra cada respuesta una sola vez. Si la
--     evaluación es de retroalimentación inmediata, devuelve si acertó y la
--     explicación; si es al final, solo confirma.
--   - evaluacion_terminar calcula el puntaje, lo guarda en la tabla de intentos
--     del módulo (sus disparadores de logros siguen igual), registra el día de
--     estudio y devuelve la revisión completa.
--
-- Esta migración crea la estructura y la configuración de las cuatro
-- evaluaciones. Las preguntas se cargan aparte con scripts/bancos/sembrar.mjs
-- desde contenido/bancos/, que es donde se editan.
--
-- No toca filas de usuarios. Retirar el INSERT directo sobre las tablas de
-- intentos va en una migración posterior, cuando la app ya use estas funciones.
-- ============================================================================


-- ─── Catálogo de evaluaciones ───────────────────────────────────────────────
create table public.evaluaciones (
  clave text primary key check (clave ~ '^[a-z0-9_]{3,40}$'),
  titulo text not null check (char_length(titulo) between 1 and 120),
  -- 'inmediata': cada respuesta dice si acertó. 'al_final': nada hasta terminar.
  retroalimentacion text not null check (retroalimentacion in ('inmediata', 'al_final')),
  preguntas_por_intento smallint not null check (preguntas_por_intento between 1 and 100),
  aprobacion smallint not null check (aprobacion between 0 and 100),
  barajar_opciones boolean not null default true,
  -- Tiempo para terminar un intento antes de que la sesión venza.
  minutos_vigencia smallint not null default 180 check (minutos_vigencia between 5 and 600),
  -- Tabla de intentos donde evaluacion_terminar deja el resultado.
  destino text not null check (destino in ('notam', 'metar', 'mercancias', 'simulacro_aerolinea')),
  activa boolean not null default true,
  creada_en timestamptz not null default now()
);

comment on table public.evaluaciones is
  'Qué evaluaciones existen y con qué reglas. Se lee solo desde las funciones evaluacion_*.';

-- De qué bancos sale cada evaluación. Con cupo, ese banco aporta exactamente
-- ese número; sin cupo, los bancos se sortean juntos para completar el intento.
create table public.evaluacion_fuentes (
  evaluacion text not null references public.evaluaciones (clave) on delete cascade,
  banco text not null check (banco ~ '^[a-z0-9_]{3,40}$'),
  -- Tema que se muestra junto a la pregunta en las evaluaciones mezcladas.
  etiqueta text check (etiqueta is null or char_length(etiqueta) between 1 and 60),
  cupo smallint check (cupo is null or cupo between 1 and 100),
  primary key (evaluacion, banco)
);


-- ─── Banco de preguntas ─────────────────────────────────────────────────────
create table public.banco_preguntas (
  id uuid primary key default gen_random_uuid(),
  banco text not null check (banco ~ '^[a-z0-9_]{3,40}$'),
  -- Id estable de la pregunta en su archivo de contenido.
  clave_externa text not null check (char_length(clave_externa) between 1 and 60),
  enunciado text not null check (char_length(enunciado) between 1 and 4000),
  opciones jsonb not null check (
    jsonb_typeof(opciones) = 'array' and jsonb_array_length(opciones) between 2 and 6
  ),
  -- Índice de la correcta en `opciones`, antes de barajar.
  correcta smallint not null,
  explicacion text not null default '' check (char_length(explicacion) <= 4000),
  referencia text check (referencia is null or char_length(referencia) <= 300),
  metadatos jsonb not null default '{}'::jsonb check (jsonb_typeof(metadatos) = 'object'),
  activa boolean not null default true,
  actualizada_en timestamptz not null default now(),
  unique (banco, clave_externa),
  check (correcta >= 0 and correcta < jsonb_array_length(opciones))
);

create index banco_preguntas_banco_activa on public.banco_preguntas (banco) where activa;

comment on table public.banco_preguntas is
  'Preguntas con su respuesta. Sin permisos para anon ni authenticated: se leen solo desde evaluacion_*. Se cargan con scripts/bancos/sembrar.mjs.';


-- ─── Sesiones de evaluación ─────────────────────────────────────────────────
create table public.evaluacion_sesiones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  evaluacion text not null references public.evaluaciones (clave),
  preguntas uuid[] not null check (cardinality(preguntas) between 1 and 100),
  -- Por posición, el índice original de cada opción en el orden mostrado.
  orden_opciones jsonb not null check (jsonb_typeof(orden_opciones) = 'array'),
  -- {"3": {"opcion": 1, "correcta": true, "en": "..."}}: la opción es la mostrada.
  respuestas jsonb not null default '{}'::jsonb check (jsonb_typeof(respuestas) = 'object'),
  correctas smallint not null default 0,
  iniciada_en timestamptz not null default now(),
  vence_en timestamptz not null,
  terminada_en timestamptz,
  puntaje smallint check (puntaje is null or puntaje between 0 and 100),
  aprobada boolean
);

create index evaluacion_sesiones_usuario_inicio on public.evaluacion_sesiones (user_id, iniciada_en desc);

comment on table public.evaluacion_sesiones is
  'Un intento en curso o terminado. Sin permisos para el cliente: todo pasa por evaluacion_*.';


-- ─── Sin acceso directo desde el cliente ────────────────────────────────────
alter table public.evaluaciones enable row level security;
alter table public.evaluacion_fuentes enable row level security;
alter table public.banco_preguntas enable row level security;
alter table public.evaluacion_sesiones enable row level security;

revoke all on table
  public.evaluaciones,
  public.evaluacion_fuentes,
  public.banco_preguntas,
  public.evaluacion_sesiones
from anon, authenticated;


-- ─── Posición mostrada de la correcta ───────────────────────────────────────
create or replace function private.opcion_correcta_mostrada(p_orden jsonb, p_correcta smallint)
returns smallint
language sql
immutable
set search_path = ''
as $$
  select (o.ord - 1)::smallint
  from jsonb_array_elements_text(p_orden) with ordinality as o(indice, ord)
  where o.indice::int = p_correcta
$$;

revoke all on function private.opcion_correcta_mostrada(jsonb, smallint) from public, anon, authenticated, service_role;


-- ─── evaluacion_iniciar ─────────────────────────────────────────────────────
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

  -- Un intento nuevo a la vez por usuario, y un tope por hora: cada intento
  -- entrega preguntas, y al terminar, sus respuestas.
  perform pg_advisory_xact_lock(hashtextextended('evaluacion_iniciar:' || v_user::text, 0));
  select count(*) into v_recientes
  from public.evaluacion_sesiones
  where user_id = v_user and iniciada_en > now() - interval '1 hour';
  if v_recientes >= 30 then
    raise exception 'demasiados_intentos'
      using errcode = 'P0001', hint = 'Máximo 30 intentos por hora.';
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


-- ─── evaluacion_responder ───────────────────────────────────────────────────
create or replace function public.evaluacion_responder(p_sesion uuid, p_posicion integer, p_opcion integer)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_s public.evaluacion_sesiones%rowtype;
  v_retro text;
  v_bp public.banco_preguntas%rowtype;
  v_correcta smallint;
  v_previa jsonb;
  v_opcion int;
  v_acierto boolean;
begin
  if v_user is null then
    raise exception 'unauthorized' using errcode = '28000';
  end if;

  -- FOR UPDATE: dos envíos simultáneos de la misma posición no cuentan doble.
  select * into v_s
  from public.evaluacion_sesiones
  where id = p_sesion and user_id = v_user
  for update;
  if not found then
    raise exception 'sesion_no_encontrada' using errcode = 'P0002';
  end if;

  if p_posicion is null or p_posicion < 1 or p_posicion > cardinality(v_s.preguntas) then
    raise exception 'posicion_invalida' using errcode = '22023';
  end if;

  select e.retroalimentacion into v_retro from public.evaluaciones e where e.clave = v_s.evaluacion;
  select * into v_bp from public.banco_preguntas where id = v_s.preguntas[p_posicion];
  v_correcta := private.opcion_correcta_mostrada(v_s.orden_opciones -> (p_posicion - 1), v_bp.correcta);

  -- Ya respondida: cuenta la primera respuesta. Un reintento por red caída
  -- recibe lo mismo que la primera vez y no suma nada.
  v_previa := v_s.respuestas -> p_posicion::text;
  if v_previa is not null then
    v_opcion := (v_previa ->> 'opcion')::int;
    v_acierto := (v_previa ->> 'correcta')::boolean;
  else
    if v_s.terminada_en is not null then
      raise exception 'sesion_terminada' using errcode = 'P0001';
    end if;
    if v_s.vence_en < now() then
      raise exception 'sesion_vencida' using errcode = 'P0001';
    end if;
    if p_opcion is null or p_opcion < 0 or p_opcion >= jsonb_array_length(v_bp.opciones) then
      raise exception 'opcion_invalida' using errcode = '22023';
    end if;

    v_opcion := p_opcion;
    v_acierto := p_opcion = v_correcta;

    update public.evaluacion_sesiones
    set respuestas = respuestas || jsonb_build_object(
          p_posicion::text,
          jsonb_build_object('opcion', p_opcion, 'correcta', v_acierto, 'en', now())
        ),
        correctas = correctas + case when v_acierto then 1 else 0 end
    where id = p_sesion;
  end if;

  if v_retro = 'inmediata' then
    return jsonb_build_object(
      'posicion', p_posicion,
      'opcion', v_opcion,
      'correcta', v_acierto,
      'opcion_correcta', v_correcta,
      'explicacion', v_bp.explicacion,
      'referencia', v_bp.referencia
    );
  end if;

  return jsonb_build_object('posicion', p_posicion, 'opcion', v_opcion);
end
$$;


-- ─── evaluacion_terminar ────────────────────────────────────────────────────
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

  -- Revisión: por posición, lo elegido, la correcta en el orden mostrado y la
  -- explicación. Las preguntas sin responder cuentan como incorrectas.
  select
    jsonb_agg(
      jsonb_build_object(
        'posicion', s.pos,
        'opcion', (v_s.respuestas -> s.pos::text ->> 'opcion')::int,
        'correcta', coalesce((v_s.respuestas -> s.pos::text ->> 'correcta')::boolean, false),
        'opcion_correcta', private.opcion_correcta_mostrada(v_s.orden_opciones -> (s.pos - 1)::int, bp.correcta),
        'explicacion', bp.explicacion,
        'referencia', bp.referencia
      )
      order by s.pos
    ),
    -- El detalle que la tabla de NOTAM ya guardaba: texto elegido y correcto.
    jsonb_agg(
      jsonb_build_object(
        'id', bp.clave_externa,
        'elegida', coalesce(
          bp.opciones ->> ((v_s.orden_opciones -> (s.pos - 1)::int ->> ((v_s.respuestas -> s.pos::text ->> 'opcion')::int))::int),
          ''
        ),
        'correcta', bp.opciones ->> bp.correcta,
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


-- ─── Permisos de las funciones ──────────────────────────────────────────────
revoke all on function public.evaluacion_iniciar(text) from public, anon;
revoke all on function public.evaluacion_responder(uuid, integer, integer) from public, anon;
revoke all on function public.evaluacion_terminar(uuid) from public, anon;
grant execute on function public.evaluacion_iniciar(text) to authenticated, service_role;
grant execute on function public.evaluacion_responder(uuid, integer, integer) to authenticated, service_role;
grant execute on function public.evaluacion_terminar(uuid) to authenticated, service_role;


-- ─── Configuración de las cuatro evaluaciones ───────────────────────────────
-- Las reglas son las que ya tenía cada pantalla: NOTAM y Mercancías, 25 al azar
-- y nada hasta el final; Meteorología, las 20 con explicación al momento; el
-- simulacro, 25 de todos los temas abiertos, al momento y con 85 para aprobar.
insert into public.evaluaciones (clave, titulo, retroalimentacion, preguntas_por_intento, aprobacion, destino) values
  ('notam_evaluacion', 'NOTAM · Evaluación', 'al_final', 25, 80, 'notam'),
  ('metar_evaluacion', 'Meteorología · Evaluación de METAR', 'inmediata', 20, 80, 'metar'),
  ('mercancias_evaluacion', 'Mercancías peligrosas · Evaluación', 'al_final', 25, 80, 'mercancias'),
  ('simulacro_aerolinea', 'Ingreso a aerolínea · Simulacro', 'inmediata', 25, 85, 'simulacro_aerolinea');

insert into public.evaluacion_fuentes (evaluacion, banco, etiqueta, cupo) values
  ('notam_evaluacion', 'notam_evaluacion', null, null),
  ('metar_evaluacion', 'metar_evaluacion', null, null),
  ('mercancias_evaluacion', 'mercancias_evaluacion', null, null),
  ('simulacro_aerolinea', 'notam_evaluacion', 'NOTAM', null),
  ('simulacro_aerolinea', 'metar_evaluacion', 'Meteorología', null),
  ('simulacro_aerolinea', 'mercancias_chequeo', 'Mercancías peligrosas', null);
