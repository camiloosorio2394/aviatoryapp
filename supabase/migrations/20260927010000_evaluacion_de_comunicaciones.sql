-- ============================================================================
-- Evaluación del módulo Comunicaciones aeronáuticas y gestión ATC.
--
-- NO SE HA APLICADO. Se le entrega a Camilo para que la corra él, y después
-- el archivo se renombra con la versión que registró la base:
--   select version from supabase_migrations.schema_migrations
--   where name = 'evaluacion_de_comunicaciones';
--
-- Es el recorrido de 20260915230000_evaluacion_de_aeropuertos.sql:
--   1. La tabla de intentos del módulo, solo con select para el cliente.
--   2. Las reglas de la evaluación en `evaluaciones`: 25 preguntas por
--      intento de un banco de 80, se aprueba con 80, la corrección se ve al
--      final y no durante el intento, las opciones se barajan y la sesión
--      vence a las 3 horas. Y el umbral `comunicaciones_pass`, que documenta
--      la constante del front y contra el que se comparan los logros.
--   3. De qué banco sale, en `evaluacion_fuentes`: del banco
--      `comunicaciones_evaluacion` y de ninguno más.
--   4. evaluacion_terminar entera, copiada de la versión más reciente del
--      repo (20260915230000), con la rama `when 'comunicaciones'` añadida.
--      Sin esa rama el CASE no encuentra el destino y el intento se cae al
--      terminar.
--   5. La puerta: `modulo_leccion = 'comunicaciones'`, así que
--      evaluacion_iniciar no abre la evaluación a quien no tenga las 69
--      lecciones en la base. Para que eso se pueda contar, private.secciones_leidas
--      (copiada de 20260916000000) gana la rama de user_comunicaciones_progress.
--
-- Diferencia con Aeropuertos, a propósito: allá la puerta la puso la
-- migración de progreso porque la evaluación llegó primero. Aquí el progreso
-- (20260927000000) ya existe, así que la puerta va con la evaluación.
--
-- Las preguntas NO van aquí: el banco se edita en
-- contenido/bancos/comunicaciones_evaluacion.json y se carga con
-- supabase/seeds/comunicaciones_evaluacion.sql (la salida de
--   node scripts/bancos/sembrar.mjs comunicaciones_evaluacion).
--
-- Lo que esta migración NO hace:
--   - No toca simulacro_aerolinea: meter este banco en el simulacro cambia
--     otro producto y esa decisión es de Camilo.
--   - No crea logros ni toca el panel: van en
--     20260927020000_panel_y_logros_de_comunicaciones.sql, que lee la tabla
--     de intentos que nace aquí.
--
-- ORDEN: DESPUÉS de 20260927000000_progreso_de_comunicaciones.sql, que crea
-- user_comunicaciones_progress (la nombra secciones_leidas) y la fila
-- 'comunicaciones' de modulos_contenido (modulo_leccion es clave foránea a
-- ella). Corrida antes, falla en el insert de `evaluaciones` y no queda nada.
-- Y después de los siete pasos de Aeropuertos: secciones_leidas y
-- evaluacion_terminar se copian de sus versiones.
--
-- Se puede correr dos veces: todo es `if not exists`, `on conflict` o
-- `create or replace`.
--
-- Prueba: supabase/tests/comunicaciones_evaluacion.sql, con el banco sembrado.
-- ============================================================================

-- ── 1 · Intentos de la evaluación ──────────────────────────────────────────
--
-- Mismas columnas que Mercancías, Aerodinámica y Aeropuertos, que es lo que el
-- historial de la pantalla sabe leer.

create table if not exists public.user_comunicaciones_exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  score smallint not null,
  correct smallint not null default 0,
  total smallint not null default 0,
  taken_at timestamptz not null default now()
);

-- El índice de la clave foránea, que además sirve al historial (lo último
-- primero).
create index if not exists user_comunicaciones_exam_attempts_user_idx
  on public.user_comunicaciones_exam_attempts (user_id, taken_at desc);

alter table public.user_comunicaciones_exam_attempts enable row level security;

drop policy if exists comunicaciones_exam_select_own on public.user_comunicaciones_exam_attempts;
create policy comunicaciones_exam_select_own
  on public.user_comunicaciones_exam_attempts
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- Quien inserta es evaluacion_terminar, que es SECURITY DEFINER. El cliente
-- solo lee lo suyo: sin política de insert no hay grant de insert.
revoke all on table public.user_comunicaciones_exam_attempts from anon, authenticated;
grant select on table public.user_comunicaciones_exam_attempts to authenticated;

-- ── 2 · Las reglas de la evaluación ────────────────────────────────────────
--
-- El CHECK de destino se amplía antes de insertar: sin esto la fila no entra.
-- La lista es la de 20260915230000 más 'comunicaciones'.

alter table public.evaluaciones drop constraint if exists evaluaciones_destino_check;
alter table public.evaluaciones add constraint evaluaciones_destino_check
  check (destino in ('notam', 'metar', 'mercancias', 'aerodinamica', 'aeropuertos', 'performance', 'comunicaciones', 'simulacro_aerolinea'));

insert into public.evaluaciones
  (clave, titulo, retroalimentacion, preguntas_por_intento, aprobacion,
   barajar_opciones, minutos_vigencia, destino, activa, modulo_leccion)
values
  ('comunicaciones_evaluacion', 'Comunicaciones ATC · Evaluación', 'al_final', 25, 80,
   true, 180, 'comunicaciones', true, 'comunicaciones')
on conflict (clave) do update set
  titulo = excluded.titulo,
  retroalimentacion = excluded.retroalimentacion,
  preguntas_por_intento = excluded.preguntas_por_intento,
  aprobacion = excluded.aprobacion,
  barajar_opciones = excluded.barajar_opciones,
  minutos_vigencia = excluded.minutos_vigencia,
  destino = excluded.destino,
  activa = excluded.activa,
  modulo_leccion = excluded.modulo_leccion;

-- De qué banco sale: de uno solo y sin cupo, así que el intento se sortea
-- entero sobre las 80 preguntas. La etiqueta va en null porque es lo que el
-- cliente recibe como «tema», y con un único banco no hay tema que distinguir.

insert into public.evaluacion_fuentes (evaluacion, banco, etiqueta, cupo)
values ('comunicaciones_evaluacion', 'comunicaciones_evaluacion', null, null)
on conflict (evaluacion, banco) do update set
  etiqueta = excluded.etiqueta,
  cupo = excluded.cupo;

-- El aprobado, que documenta CM_PASS_SCORE de src/lib/comunicaciones.ts. Los
-- logros (20260927020000) comparan contra esto y no contra un 80 a mano.

insert into public.module_thresholds (code, total, nota) values
  ('comunicaciones_pass', 80, 'CM_PASS_SCORE: 25 preguntas al azar de 80, apruebas con 80')
on conflict (code) do update set total = excluded.total, nota = excluded.nota;

-- ── 3 · evaluacion_terminar, con la rama nueva ─────────────────────────────
--
-- La función entera, idéntica a la de 20260915230000, más el
-- `when 'comunicaciones'`. No cambia nada más.

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
      when 'performance' then
        insert into public.user_performance_exam_attempts (user_id, score, correct, total)
        values (v_user, v_puntaje, v_s.correctas, v_total);
      when 'comunicaciones' then
        insert into public.user_comunicaciones_exam_attempts (user_id, score, correct, total)
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

-- ── 4 · Contar lo leído, para la puerta ────────────────────────────────────
--
-- La de 20260916000000 con una rama más. evaluacion_iniciar compara esto con
-- las lecciones del catálogo; sin la rama, contaría cero y la evaluación no
-- abriría nunca.

create or replace function private.secciones_leidas(p_user uuid, p_modulo text)
returns integer
language sql
stable security definer
set search_path to ''
as $function$
  select count(distinct s)::int
  from (
    select unnest(lesson_screens) as s from public.user_notam_progress where p_modulo = 'notam' and user_id = p_user
    union all
    select unnest(lesson_screens) from public.user_metar_progress where p_modulo = 'metar' and user_id = p_user
    union all
    select unnest(lesson_screens) from public.user_mercancias_progress where p_modulo = 'mercancias' and user_id = p_user
    union all
    select unnest(lesson_screens) from public.user_aerodinamica_progress where p_modulo = 'aerodinamica' and user_id = p_user
    union all
    select unnest(lesson_screens) from public.user_aeropuertos_progress where p_modulo = 'aeropuertos' and user_id = p_user
    union all
    select unnest(lesson_screens) from public.user_performance_progress where p_modulo = 'performance' and user_id = p_user
    union all
    select unnest(lesson_screens) from public.user_comunicaciones_progress where p_modulo = 'comunicaciones' and user_id = p_user
  ) as leidas
  where s between 1 and (select c.lecciones from public.modulos_contenido c where c.modulo = p_modulo)
$function$;
