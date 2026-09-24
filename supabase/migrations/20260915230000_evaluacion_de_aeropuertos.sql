-- ============================================================================
-- Evaluación del módulo Aeropuertos.
--
-- NO SE HA APLICADO. Se le entrega a Camilo para que la corra él, y después
-- el archivo se renombra con la versión que registró la base:
--   select version from supabase_migrations.schema_migrations
--   where name = 'evaluacion_de_aeropuertos';
--
-- Qué trae, y nada más que esto:
--   1. La tabla de intentos del módulo.
--   2. Las reglas de la evaluación en `evaluaciones`: 25 preguntas por
--      intento de un banco de 60, se aprueba con 80, la corrección se ve al
--      final y no durante el intento, las opciones se barajan y la sesión
--      vence a las 3 horas.
--   3. De qué banco sale, en `evaluacion_fuentes`: del banco
--      `aeropuertos_evaluacion` y de ninguno más.
--   4. evaluacion_terminar entera, idéntica a la que había, con la rama
--      `when 'aeropuertos'` añadida. Sin esa rama el CASE no encuentra el
--      destino y el intento se cae al terminar.
--
-- Las preguntas NO van aquí: el banco se edita en
-- contenido/bancos/aeropuertos_evaluacion.json y se carga aparte con
--   node scripts/bancos/sembrar.mjs aeropuertos_evaluacion
-- que imprime el SQL para pegarlo en Supabase. Se puede repetir cuantas veces
-- se quiera: hace upsert por id y lo que salga del archivo queda inactivo,
-- nunca borrado, porque las sesiones ya jugadas referencian sus preguntas.
--
-- Lo que esta migración NO hace, a propósito:
--   - `modulo_leccion` queda en null. Esa columna hace que el servidor exija
--     la lección completa en la base antes de abrir la evaluación, y para eso
--     hace falta la tabla de progreso del módulo, que todavía no existe (paso
--     2 de docs/AEROPUERTOS_ESTADO.md). Mientras tanto la puerta la decide lo
--     leído en el navegador. Cuando llegue la migración de progreso, ahí se
--     inserta la fila de 'aeropuertos' en modulos_contenido, se añade la rama
--     de aeropuertos a private.secciones_leidas y se corre:
--       update public.evaluaciones set modulo_leccion = 'aeropuertos'
--       where clave = 'aeropuertos_evaluacion';
--   - No toca simulacro_aerolinea: meter el banco de Aeropuertos en el
--     simulacro cambia otro producto y esa decisión es de Camilo.
--   - No crea logros: van con el progreso del módulo, en su migración, para
--     que el disparador y su caso en supabase/tests/logros.sql lleguen juntos.
--
-- Prueba: supabase/tests/aeropuertos_evaluacion.sql, que se corre después de
-- aplicar esto y 20260916000000_progreso_de_aeropuertos.sql (que pone
-- modulo_leccion) y de sembrar el banco. Orden completo, con las migraciones
-- de postulaciones que van antes: docs/AEROPUERTOS_ESTADO.md.
-- ============================================================================

-- ── 1 · Intentos de la evaluación ──────────────────────────────────────────
--
-- Mismas columnas que Mercancías y Aerodinámica, que es lo que el historial
-- de la pantalla sabe leer.

create table if not exists public.user_aeropuertos_exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  score smallint not null,
  correct smallint not null default 0,
  total smallint not null default 0,
  taken_at timestamptz not null default now()
);

create index if not exists user_aeropuertos_exam_attempts_user_idx
  on public.user_aeropuertos_exam_attempts (user_id, taken_at desc);

alter table public.user_aeropuertos_exam_attempts enable row level security;

drop policy if exists aeropuertos_exam_select_own on public.user_aeropuertos_exam_attempts;
create policy aeropuertos_exam_select_own
  on public.user_aeropuertos_exam_attempts
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- Quien inserta es evaluacion_terminar, que es SECURITY DEFINER. El cliente
-- solo lee lo suyo: sin política de insert no hay grant de insert.
revoke all on table public.user_aeropuertos_exam_attempts from anon, authenticated;
grant select on table public.user_aeropuertos_exam_attempts to authenticated;

-- ── 2 · Las reglas de la evaluación ────────────────────────────────────────
--
-- La columna destino lleva un CHECK con la lista de módulos que pueden
-- recibir un intento. Se amplía antes de insertar: sin esto la fila no entra,
-- y como el editor de Supabase corre el archivo en una sola transacción, se
-- cae la migración entera. La lista incluye 'aerodinamica' para que este
-- archivo pueda correrse antes o después del de Aerodinámica, sin orden.

alter table public.evaluaciones drop constraint if exists evaluaciones_destino_check;
alter table public.evaluaciones add constraint evaluaciones_destino_check
  check (destino in ('notam', 'metar', 'mercancias', 'aerodinamica', 'aeropuertos', 'simulacro_aerolinea'));

insert into public.evaluaciones
  (clave, titulo, retroalimentacion, preguntas_por_intento, aprobacion,
   barajar_opciones, minutos_vigencia, destino, activa, modulo_leccion)
values
  ('aeropuertos_evaluacion', 'Aeropuertos · Evaluación', 'al_final', 25, 80,
   true, 180, 'aeropuertos', true, null)
on conflict (clave) do update set
  titulo = excluded.titulo,
  retroalimentacion = excluded.retroalimentacion,
  preguntas_por_intento = excluded.preguntas_por_intento,
  aprobacion = excluded.aprobacion,
  barajar_opciones = excluded.barajar_opciones,
  minutos_vigencia = excluded.minutos_vigencia,
  destino = excluded.destino,
  activa = excluded.activa;

-- De qué banco sale: de uno solo y sin cupo, así que el intento se sortea
-- entero sobre las 60 preguntas. La etiqueta va en null porque es lo que el
-- cliente recibe como «tema», y con un único banco no hay tema que distinguir.

insert into public.evaluacion_fuentes (evaluacion, banco, etiqueta, cupo)
values ('aeropuertos_evaluacion', 'aeropuertos_evaluacion', null, null)
on conflict (evaluacion, banco) do update set
  etiqueta = excluded.etiqueta,
  cupo = excluded.cupo;

-- ── 3 · evaluacion_terminar, con la rama nueva ─────────────────────────────
--
-- La función entera, idéntica a la que hay en el repo, más el
-- `when 'aeropuertos'`. No cambia nada más.

create or replace function public.evaluacion_terminar(p_sesion uuid)
returns jsonb
language plpgsql
security definer
set search_path to ''
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
      when 'aerodinamica' then
        insert into public.user_aerodinamica_exam_attempts (user_id, score, correct, total)
        values (v_user, v_puntaje, v_s.correctas, v_total);
      when 'aeropuertos' then
        insert into public.user_aeropuertos_exam_attempts (user_id, score, correct, total)
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

