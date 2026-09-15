#!/usr/bin/env node
/**
 * Escribe la migración del módulo Aerodinámica.
 *
 *   node scripts/aerodinamica/migracion.mjs
 *
 * La parte del banco (40 preguntas) no se teclea: sale del mismo generador que
 * usan los demás bancos, scripts/bancos/banco.mjs, leyendo
 * contenido/bancos/aerodinamica_evaluacion.json. Así la migración y el archivo
 * del repo no pueden divergir.
 *
 * El resto es el patrón de Mercancías, leído de la base el 14 de septiembre de
 * 2026 con pg_get_functiondef: las funciones que se tocan se reemplazan enteras
 * y lo único que cambia es la rama nueva.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { sqlDeBanco, validarBanco } from "../bancos/banco.mjs"

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const SALIDA = path.join(RAIZ, "supabase/migrations/20260914230000_modulo_aerodinamica.sql")

const banco = validarBanco(
  JSON.parse(fs.readFileSync(path.join(RAIZ, "contenido/bancos/aerodinamica_evaluacion.json"), "utf8")),
)

const sql = `-- Módulo Aerodinámica: progreso, quiz final, catálogo, panel y logros.
--
-- Todo es el patrón que ya usa Mercancías peligrosas, leído de la base con
-- pg_get_functiondef el 14 de septiembre de 2026. Las funciones compartidas
-- (evaluacion_terminar, secciones_leidas, practicas_hechas, panel_tarjetas,
-- desbloquear_logros) se reemplazan enteras conservando todo lo demás igual:
-- lo único que cambia en cada una es la rama de 'aerodinamica'.
--
-- El contenido sale de docs/contenido/aerodinamica.md por
-- scripts/aerodinamica/convertir.mjs. Esta migración la escribe
-- scripts/aerodinamica/migracion.mjs.
--
-- NO toca simulacro_aerolinea: meter el banco de Aerodinámica en el simulacro
-- cambia otro producto, y esa decisión es de Camilo.

-- ── 1 · Progreso del módulo ────────────────────────────────────────────────

create table if not exists public.user_aerodinamica_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  lesson_screens smallint[] not null default '{}',
  practice_done text[] not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.user_aerodinamica_progress enable row level security;

-- Solo lectura de lo propio. Escribir es exclusivo de la RPC, que valida
-- contra el catálogo: sin esto, cualquiera podría marcarse el módulo entero.
drop policy if exists aerodinamica_progress_select_own on public.user_aerodinamica_progress;
create policy aerodinamica_progress_select_own
  on public.user_aerodinamica_progress
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

revoke all on public.user_aerodinamica_progress from anon, authenticated;
grant select on public.user_aerodinamica_progress to authenticated;

-- ── 2 · Intentos del quiz final ────────────────────────────────────────────

create table if not exists public.user_aerodinamica_exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  score smallint not null,
  correct smallint not null default 0,
  total smallint not null default 0,
  taken_at timestamptz not null default now()
);

create index if not exists user_aerodinamica_exam_attempts_user_idx
  on public.user_aerodinamica_exam_attempts (user_id, taken_at desc);

alter table public.user_aerodinamica_exam_attempts enable row level security;

drop policy if exists aerodinamica_exam_select_own on public.user_aerodinamica_exam_attempts;
create policy aerodinamica_exam_select_own
  on public.user_aerodinamica_exam_attempts
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- Quien inserta es evaluacion_terminar, que es SECURITY DEFINER.
revoke all on public.user_aerodinamica_exam_attempts from anon, authenticated;
grant select on public.user_aerodinamica_exam_attempts to authenticated;

-- ── 3 · Catálogo de contenido ──────────────────────────────────────────────
--
-- Doce secciones y sesenta y dos claves de práctica: trece escenarios de
-- aplicación y cuarenta y nueve preguntas de entrevista. Es contra esto que
-- valida la RPC. De aquí en adelante lo mantiene al día
-- scripts/catalogo/sembrar.mjs, como el de los demás módulos.

insert into public.modulos_contenido (modulo, lecciones, practicas)
values (
  'aerodinamica',
  12,
  (
    select array_agg(clave order by clave)
    from (
      select 'esc-' || lpad(i::text, 2, '0') as clave from generate_series(1, 13) as i
      union all
      select 'ent-' || lpad(i::text, 2, '0') from generate_series(1, 49) as i
    ) as claves
  )
)
on conflict (modulo) do update set
  lecciones = excluded.lecciones,
  practicas = excluded.practicas,
  actualizado_en = now();

-- ── 4 · Umbrales, que documentan las constantes del front ──────────────────

insert into public.module_thresholds (code, total, nota) values
  ('aerodinamica_lesson', 12, 'AERO_LECTURA_TOTAL de src/lib/aerodinamica.ts (12 secciones, S01 a S12)'),
  ('aerodinamica_practice', 62, 'AERO_PRACTICA_TOTAL de src/lib/aerodinamica.ts (13 escenarios + 49 preguntas de entrevista)'),
  ('aerodinamica_pass', 80, 'AERO_PASS_SCORE: 20 preguntas al azar de 40, apruebas con 80')
on conflict (code) do update set total = excluded.total, nota = excluded.nota;

-- Y de paso, dos filas de Mercancías que quedaron desfasadas al quitar el
-- nivel 3 del módulo (PR #207): el umbral decía dieciocho lecciones y el logro
-- las describe igual. Son documentación, no gobiernan nada, pero mentían.
update public.module_thresholds
set total = 14,
    nota = 'MP_LECTURA_TOTAL de src/lib/mercancias.ts (14 lecciones en 4 niveles)'
where code = 'mercancias_lesson';

update public.achievements
set description = 'Leíste las catorce lecciones del módulo de mercancías peligrosas'
where code = 'mercancias_lesson';

-- ── 5 · Marcar progreso ────────────────────────────────────────────────────
--
-- Copia fiel de mercancias_mark_progress: valida contra el catálogo y agrega
-- sin duplicar, así que repetir la llamada no cambia nada.

create or replace function public.aerodinamica_mark_progress(
  p_lesson_screen smallint default null,
  p_practice_id text default null
)
returns public.user_aerodinamica_progress
language plpgsql
security definer
set search_path to ''
as $$
declare
  v_row public.user_aerodinamica_progress;
begin
  if auth.uid() is null then
    raise exception 'no authenticated user';
  end if;
  perform private.validar_marca_progreso('aerodinamica', p_lesson_screen, p_practice_id);

  insert into public.user_aerodinamica_progress (user_id, lesson_screens, practice_done, updated_at)
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
        public.user_aerodinamica_progress.lesson_screens ||
        case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end
      ) as s
    ),
    practice_done = (
      select coalesce(array_agg(distinct p order by p), '{}'::text[])
      from unnest(
        public.user_aerodinamica_progress.practice_done ||
        case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end
      ) as p
    ),
    updated_at = now()
  returning * into v_row;

  return v_row;
end
$$;

revoke all on function public.aerodinamica_mark_progress(smallint, text) from public, anon;
grant execute on function public.aerodinamica_mark_progress(smallint, text) to authenticated;

-- ── 6 · Conteos por módulo ─────────────────────────────────────────────────
--
-- Las dos son la función que ya existe con una rama más.

create or replace function private.secciones_leidas(p_user uuid, p_modulo text)
returns integer
language sql
stable security definer
set search_path to ''
as $$
  select count(distinct s)::int
  from (
    select unnest(lesson_screens) as s from public.user_notam_progress where p_modulo = 'notam' and user_id = p_user
    union all
    select unnest(lesson_screens) from public.user_metar_progress where p_modulo = 'metar' and user_id = p_user
    union all
    select unnest(lesson_screens) from public.user_mercancias_progress where p_modulo = 'mercancias' and user_id = p_user
    union all
    select unnest(lesson_screens) from public.user_aerodinamica_progress where p_modulo = 'aerodinamica' and user_id = p_user
  ) as leidas
  where s between 1 and (select c.lecciones from public.modulos_contenido c where c.modulo = p_modulo)
$$;

create or replace function private.practicas_hechas(p_user uuid, p_modulo text)
returns integer
language sql
stable security definer
set search_path to ''
as $$
  select count(distinct p)::int
  from (
    select unnest(practice_done) as p from public.user_notam_progress where p_modulo = 'notam' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_metar_progress where p_modulo = 'metar' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_mercancias_progress where p_modulo = 'mercancias' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_aerodinamica_progress where p_modulo = 'aerodinamica' and user_id = p_user
  ) as hechas
  where exists (
    select 1 from public.modulos_contenido c
    where c.modulo = p_modulo and hechas.p = any (c.practicas)
  )
$$;

-- ── 7 · El quiz final ──────────────────────────────────────────────────────

insert into public.evaluaciones
  (clave, titulo, retroalimentacion, preguntas_por_intento, aprobacion,
   barajar_opciones, minutos_vigencia, destino, activa, modulo_leccion)
values
  ('aerodinamica_evaluacion', 'Aerodinámica · Evaluación', 'al_final', 20, 80,
   true, 180, 'aerodinamica', true, 'aerodinamica')
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

insert into public.evaluacion_fuentes (evaluacion, banco, etiqueta, cupo)
values ('aerodinamica_evaluacion', 'aerodinamica_evaluacion', null, null)
on conflict do nothing;

-- ── 8 · El banco: 40 preguntas, ev-01 a ev-40 ──────────────────────────────
--
-- Generado por scripts/bancos/banco.mjs desde
-- contenido/bancos/aerodinamica_evaluacion.json. Cada pregunta lleva su
-- sección en los metadatos ({"tema": "S04"}): es lo que permite que el
-- resultado diga qué secciones repasar. \`correcta\` es índice desde 0.
-- El SQL no borra: desactiva lo que salga del archivo, porque las sesiones
-- ya jugadas referencian sus preguntas.

${sqlDeBanco(banco)}

-- ── 9 · evaluacion_terminar, con la rama nueva ─────────────────────────────
--
-- La función entera, idéntica a la que había, más el \`when 'aerodinamica'\`.

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

-- ── 10 · Logros ────────────────────────────────────────────────────────────

insert into public.achievements (code, name, description, icon, tier, order_index) values
  ('aerodinamica_lesson', 'Aerodinámica leída', 'Leíste las doce secciones del módulo de aerodinámica', '📖', 'bronze', 22),
  ('aerodinamica_practice', 'Aerodinámica practicada', 'Resolviste los 62 ejercicios: trece escenarios de aplicación y cuarenta y nueve preguntas de entrevista', '🎯', 'silver', 23),
  ('aerodinamica_exam', 'Quiz de aerodinámica superado', 'Aprobaste el quiz final de aerodinámica', '✅', 'silver', 24),
  ('aerodinamica_master', 'Aerodinámica dominada', 'Terminaste el módulo entero: lección, práctica y quiz final', '🛫', 'gold', 25)
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon,
  tier = excluded.tier,
  order_index = excluded.order_index;

drop trigger if exists trg_check_achievements_aerodinamica on public.user_aerodinamica_progress;
create trigger trg_check_achievements_aerodinamica
  after insert or update on public.user_aerodinamica_progress
  for each row execute function private.trigger_logros('aerodinamica');

drop trigger if exists trg_check_achievements_aerodinamica_exam on public.user_aerodinamica_exam_attempts;
create trigger trg_check_achievements_aerodinamica_exam
  after insert or update on public.user_aerodinamica_exam_attempts
  for each row execute function private.trigger_logros('aerodinamica');

-- El grupo de logros: la rama de 'aerodinamica' es la de 'mercancias' con sus
-- tablas. La función va entera porque el grupo desconocido levanta excepción,
-- y sin esto el primer trigger rompería el marcado de progreso.

create or replace function private.desbloquear_logros(p_user uuid, p_grupo text)
returns integer
language plpgsql
security definer
set search_path to ''
as $$
declare
  v_codigos text[];
  v_new int := 0;
  v_n int;
  v_bool bool;
  v_lecciones bool;
  v_practicas bool;
  v_aprobado bool;
begin
  if p_user is null then return 0; end if;

  v_codigos := case p_grupo
    when 'quiz' then array['first_quiz', 'first_100', 'subject_master']
    when 'racha' then array['streak_3', 'streak_7', 'streak_30']
    when 'comunidad' then array['community_hello']
    when 'piloto' then array['first_step', 'icao_climb']
    when 'suscripcion' then array['founder_badge']
    when 'notam' then array['notam_lesson', 'notam_practice', 'notam_exam', 'notam_master']
    when 'metar' then array['metar_lesson', 'metar_master']
    when 'mercancias' then array['mercancias_lesson', 'mercancias_practice', 'mercancias_exam', 'mercancias_master']
    when 'aerodinamica' then array['aerodinamica_lesson', 'aerodinamica_practice', 'aerodinamica_exam', 'aerodinamica_master']
    when 'aerolinea' then array['airline_mock_passed']
  end;
  if v_codigos is null then
    raise exception 'grupo_de_logros_desconocido: %', p_grupo using errcode = '22023';
  end if;

  -- Con todos los logros del grupo ya ganados no hay nada que contar: es el caso
  -- de cada sección leída después del logro de la lección.
  if not exists (
    select 1 from public.achievements a
    where a.code = any (v_codigos)
      and not exists (
        select 1 from public.user_achievements ua
        where ua.user_id = p_user and ua.achievement_id = a.id
      )
  ) then
    return 0;
  end if;

  case p_grupo
  when 'quiz' then
    -- vault_sessions es donde escribe el quiz actual; en quiz_attempts quedaron
    -- intentos previos a la migración al vault. Nadie pierde lo que ya hizo.
    select coalesce(sum(preguntas), 0)::int, count(*) > 0
      into v_n, v_bool
      from (
        select coalesce(array_length(question_ids, 1), 0) as preguntas
          from public.vault_sessions
          where user_id = p_user and completed_at is not null
        union all
        select coalesce(total_questions, 0)
          from public.quiz_attempts
          where user_id = p_user and finished_at is not null
      ) as intentos;
    if v_bool then v_new := v_new + public._try_unlock(p_user, 'first_quiz'); end if;
    if v_n >= 100 then v_new := v_new + public._try_unlock(p_user, 'first_100'); end if;

    -- subject_master va solo contra vault_sessions: la materia de la tabla vieja
    -- es un id numérico y la nueva un slug; mezclarlas daría rachas falsas.
    with last5 as (
      select subject_slug,
             case
               when coalesce(array_length(question_ids, 1), 0) = 0 then 0
               else round(coalesce(correct_count, 0)::numeric * 100 / array_length(question_ids, 1))
             end as score
      from public.vault_sessions
      where user_id = p_user and completed_at is not null and subject_slug is not null
      order by completed_at desc
      limit 5
    )
    select count(*)::int into v_n
    from last5
    where score >= 80 and subject_slug = (select subject_slug from last5 limit 1);
    if v_n = 5 then v_new := v_new + public._try_unlock(p_user, 'subject_master'); end if;

  when 'racha' then
    select coalesce(current_streak, 0) into v_n from public.streaks where user_id = p_user;
    if coalesce(v_n, 0) >= 3 then v_new := v_new + public._try_unlock(p_user, 'streak_3'); end if;
    if coalesce(v_n, 0) >= 7 then v_new := v_new + public._try_unlock(p_user, 'streak_7'); end if;
    if coalesce(v_n, 0) >= 30 then v_new := v_new + public._try_unlock(p_user, 'streak_30'); end if;

  when 'comunidad' then
    if exists (select 1 from public.community_messages where user_id = p_user) then
      v_new := v_new + public._try_unlock(p_user, 'community_hello');
    end if;

  when 'piloto' then
    select (stage is not null), coalesce(icao_english_level, 0)
      into v_bool, v_n
      from public.pilot_state where user_id = p_user;
    if coalesce(v_bool, false) then v_new := v_new + public._try_unlock(p_user, 'first_step'); end if;
    if coalesce(v_n, 0) >= 4 then v_new := v_new + public._try_unlock(p_user, 'icao_climb'); end if;

  when 'suscripcion' then
    if (
      select plan::text from public.subscriptions
      where user_id = p_user order by created_at desc limit 1
    ) = 'founder_lifetime' then
      v_new := v_new + public._try_unlock(p_user, 'founder_badge');
    end if;

  when 'notam' then
    v_lecciones := private.secciones_leidas(p_user, 'notam')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'notam');
    v_practicas := private.practicas_hechas(p_user, 'notam')
      >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'notam');
    v_aprobado := exists (
      select 1 from public.user_notam_exam_attempts where user_id = p_user and coalesce(score, 0) >= 80
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'notam_lesson'); end if;
    if v_practicas then v_new := v_new + public._try_unlock(p_user, 'notam_practice'); end if;
    if v_aprobado then v_new := v_new + public._try_unlock(p_user, 'notam_exam'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'notam_master');
    end if;

  when 'metar' then
    v_lecciones := private.secciones_leidas(p_user, 'metar')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'metar');
    v_practicas := private.practicas_hechas(p_user, 'metar')
      >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'metar');
    v_aprobado := exists (
      select 1 from public.user_metar_exam_attempts where user_id = p_user and coalesce(score, 0) >= 80
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'metar_lesson'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'metar_master');
    end if;

  when 'mercancias' then
    v_lecciones := private.secciones_leidas(p_user, 'mercancias')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'mercancias');
    v_practicas := private.practicas_hechas(p_user, 'mercancias')
      >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'mercancias');
    v_aprobado := exists (
      select 1 from public.user_mercancias_exam_attempts
      where user_id = p_user
        and coalesce(score, 0) >= coalesce((select total from public.module_thresholds where code = 'mercancias_pass'), 80)
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'mercancias_lesson'); end if;
    if v_practicas then v_new := v_new + public._try_unlock(p_user, 'mercancias_practice'); end if;
    if v_aprobado then v_new := v_new + public._try_unlock(p_user, 'mercancias_exam'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'mercancias_master');
    end if;

  when 'aerodinamica' then
    v_lecciones := private.secciones_leidas(p_user, 'aerodinamica')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'aerodinamica');
    v_practicas := private.practicas_hechas(p_user, 'aerodinamica')
      >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'aerodinamica');
    v_aprobado := exists (
      select 1 from public.user_aerodinamica_exam_attempts
      where user_id = p_user
        and coalesce(score, 0) >= coalesce((select total from public.module_thresholds where code = 'aerodinamica_pass'), 80)
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'aerodinamica_lesson'); end if;
    if v_practicas then v_new := v_new + public._try_unlock(p_user, 'aerodinamica_practice'); end if;
    if v_aprobado then v_new := v_new + public._try_unlock(p_user, 'aerodinamica_exam'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'aerodinamica_master');
    end if;

  when 'aerolinea' then
    if exists (
      select 1 from public.user_airline_mock_attempts
      where user_id = p_user
        and coalesce(score, 0) >= coalesce((select total from public.module_thresholds where code = 'airline_mock_pass'), 85)
    ) then
      v_new := v_new + public._try_unlock(p_user, 'airline_mock_passed');
    end if;
  end case;

  return v_new;
end
$$;

-- ── 11 · El panel ──────────────────────────────────────────────────────────
--
-- La función entera con un bloque más. El panel ya trae los tres módulos; este
-- es el cuarto.

create or replace function public.panel_tarjetas()
returns jsonb
language plpgsql
security definer
set search_path to ''
as $$
declare
  v_user uuid := auth.uid();
begin
  if v_user is null then
    raise exception 'sin_sesion' using errcode = '42501';
  end if;

  return jsonb_build_object(
    'logros', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'id', a.id, 'code', a.code, 'name', a.name, 'description', a.description,
          'icon', a.icon, 'tier', a.tier, 'unlocked_at', ua.unlocked_at
        )
        order by a.order_index
      )
      from public.achievements a
      left join public.user_achievements ua on ua.achievement_id = a.id and ua.user_id = v_user
    ), '[]'::jsonb),
    'actividad', coalesce((
      select jsonb_agg(
        jsonb_build_object('date', d.date, 'activities_count', d.activities_count, 'questions_answered', d.questions_answered)
        order by d.date
      )
      from public.daily_activity d
      where d.user_id = v_user and d.date >= current_date - 90
    ), '[]'::jsonb),
    'companeros', coalesce((
      select jsonb_agg(jsonb_build_object('username', c.username, 'current_streak', c.current_streak))
      from public.get_peers_in_stage(5) c
    ), '[]'::jsonb),
    'quiz_diario', coalesce((
      select jsonb_agg(jsonb_build_object('question_id', q.question_id, 'statement', q.statement, 'subject_name', q.subject_name))
      from public.get_daily_quiz() q
    ), '[]'::jsonb),
    'dominio', coalesce((
      select jsonb_agg(to_jsonb(m)) from public.get_subject_mastery() m
    ), '[]'::jsonb),
    'notam', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'notam'),
      'practicas', private.practicas_hechas(v_user, 'notam'),
      'mejor', (select max(e.score) from public.user_notam_exam_attempts e where e.user_id = v_user)
    ),
    'metar', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'metar'),
      'practicas', private.practicas_hechas(v_user, 'metar'),
      'mejor', (select max(e.score) from public.user_metar_exam_attempts e where e.user_id = v_user)
    ),
    'mercancias', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'mercancias'),
      'practicas', private.practicas_hechas(v_user, 'mercancias'),
      'mejor', (select max(e.score) from public.user_mercancias_exam_attempts e where e.user_id = v_user)
    ),
    'aerodinamica', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'aerodinamica'),
      'practicas', private.practicas_hechas(v_user, 'aerodinamica'),
      'mejor', (select max(e.score) from public.user_aerodinamica_exam_attempts e where e.user_id = v_user)
    ),
    'licencias', coalesce((
      select jsonb_agg(
        jsonb_build_object('id', l.id, 'license_type', l.license_type, 'custom_name', l.custom_name, 'expires_date', l.expires_date)
        order by l.expires_date
      )
      from public.licenses_held l
      where l.user_id = v_user and l.expires_date is not null
    ), '[]'::jsonb),
    'preparacion', (
      select jsonb_build_object(
        'attempts_60d', r.attempts_60d, 'avg_score_60d', r.avg_score_60d, 'best_score', r.best_score,
        'passed_recently', r.passed_recently, 'readiness_color', r.readiness_color
      )
      from public.user_pca_readiness r where r.user_id = v_user
    )
  );
end
$$;
`

fs.writeFileSync(SALIDA, sql, "utf8")
console.log(`migración escrita: ${path.relative(RAIZ, SALIDA)} (${Math.round(sql.length / 1024)} kB, ${banco.preguntas.length} preguntas)`)
