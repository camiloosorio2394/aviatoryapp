-- ============================================================================
-- RAC y Gestión del combustible: los dos módulos, de punta a punta
--
-- El contenido lo escribió Nico y entró en los PR #262 y #268, pero solo como
-- documento y banco: no había módulo. Esto lo monta.
--
-- Qué trae, por módulo: la tabla de progreso con su RPC, la fila del catálogo
-- (que es lo que la base acepta como sección y como práctica), los umbrales,
-- la tabla de intentos, las reglas de la evaluación con su banco, los cuatro
-- logros y sus disparadores.
--
-- Y republica las SEIS funciones compartidas. No están copiadas a mano: salen
-- enteras de 20260927010000 y 20260927020000, que es exactamente lo que hoy
-- tiene producción, con las ramas nuevas insertadas encima. Republicarlas a ojo
-- fue lo que se llevó por delante `plan` y `postulaciones` en septiembre.
--
-- Nada se borra: todo es create if not exists, create or replace y
-- on conflict do update.
-- ============================================================================


-- ── Progreso de RAC ──
create table if not exists public.user_rac_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  lesson_screens smallint[] not null default '{}',
  practice_done text[] not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.user_rac_progress enable row level security;

-- Solo lectura de lo propio. Escribir es exclusivo de la RPC, que valida
-- contra el catálogo: sin esto, cualquiera se marcaría el módulo entero y
-- abriría la evaluación sin haber leído nada.
drop policy if exists rac_progress_select_own on public.user_rac_progress;
create policy rac_progress_select_own
  on public.user_rac_progress
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

revoke all on table public.user_rac_progress from anon, authenticated;
grant select on table public.user_rac_progress to authenticated;

-- Copia de performance_mark_progress: valida contra el catálogo con
-- private.validar_marca_progreso y agrega sin duplicar, así que repetir la
-- llamada no cambia nada.
create or replace function public.rac_mark_progress(
  p_lesson_screen smallint default null,
  p_practice_id text default null
)
returns public.user_rac_progress
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_row public.user_rac_progress;
begin
  if auth.uid() is null then
    raise exception 'no authenticated user';
  end if;
  perform private.validar_marca_progreso('rac', p_lesson_screen, p_practice_id);

  insert into public.user_rac_progress (user_id, lesson_screens, practice_done, updated_at)
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
        public.user_rac_progress.lesson_screens ||
        case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end
      ) as s
    ),
    practice_done = (
      select coalesce(array_agg(distinct p order by p), '{}'::text[])
      from unnest(
        public.user_rac_progress.practice_done ||
        case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end
      ) as p
    ),
    updated_at = now()
  returning * into v_row;

  return v_row;
end
$function$;

revoke all on function public.rac_mark_progress(smallint, text) from public, anon;
grant execute on function public.rac_mark_progress(smallint, text) to authenticated;

-- ── Intentos de la evaluación de RAC ──
-- Mismas columnas que Mercancías, Aerodinámica, Aeropuertos y Performance, que
-- es lo que el historial de la pantalla sabe leer.
create table if not exists public.user_rac_exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  score smallint not null,
  correct smallint not null default 0,
  total smallint not null default 0,
  taken_at timestamptz not null default now()
);

create index if not exists user_rac_exam_attempts_user_idx
  on public.user_rac_exam_attempts (user_id, taken_at desc);

alter table public.user_rac_exam_attempts enable row level security;

drop policy if exists rac_exam_select_own on public.user_rac_exam_attempts;
create policy rac_exam_select_own
  on public.user_rac_exam_attempts
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- Quien inserta es evaluacion_terminar, que es SECURITY DEFINER. El cliente
-- solo lee lo suyo: sin política de insert no hay grant de insert, y por eso
-- nadie puede escribirse un 100.
revoke all on table public.user_rac_exam_attempts from anon, authenticated;
grant select on table public.user_rac_exam_attempts to authenticated;


-- ── Progreso de Gestión del combustible ──
create table if not exists public.user_combustible_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  lesson_screens smallint[] not null default '{}',
  practice_done text[] not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.user_combustible_progress enable row level security;

-- Solo lectura de lo propio. Escribir es exclusivo de la RPC, que valida
-- contra el catálogo: sin esto, cualquiera se marcaría el módulo entero y
-- abriría la evaluación sin haber leído nada.
drop policy if exists combustible_progress_select_own on public.user_combustible_progress;
create policy combustible_progress_select_own
  on public.user_combustible_progress
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

revoke all on table public.user_combustible_progress from anon, authenticated;
grant select on table public.user_combustible_progress to authenticated;

-- Copia de performance_mark_progress: valida contra el catálogo con
-- private.validar_marca_progreso y agrega sin duplicar, así que repetir la
-- llamada no cambia nada.
create or replace function public.combustible_mark_progress(
  p_lesson_screen smallint default null,
  p_practice_id text default null
)
returns public.user_combustible_progress
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_row public.user_combustible_progress;
begin
  if auth.uid() is null then
    raise exception 'no authenticated user';
  end if;
  perform private.validar_marca_progreso('combustible', p_lesson_screen, p_practice_id);

  insert into public.user_combustible_progress (user_id, lesson_screens, practice_done, updated_at)
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
        public.user_combustible_progress.lesson_screens ||
        case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end
      ) as s
    ),
    practice_done = (
      select coalesce(array_agg(distinct p order by p), '{}'::text[])
      from unnest(
        public.user_combustible_progress.practice_done ||
        case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end
      ) as p
    ),
    updated_at = now()
  returning * into v_row;

  return v_row;
end
$function$;

revoke all on function public.combustible_mark_progress(smallint, text) from public, anon;
grant execute on function public.combustible_mark_progress(smallint, text) to authenticated;

-- ── Intentos de la evaluación de Gestión del combustible ──
-- Mismas columnas que Mercancías, Aerodinámica, Aeropuertos y Performance, que
-- es lo que el historial de la pantalla sabe leer.
create table if not exists public.user_combustible_exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  score smallint not null,
  correct smallint not null default 0,
  total smallint not null default 0,
  taken_at timestamptz not null default now()
);

create index if not exists user_combustible_exam_attempts_user_idx
  on public.user_combustible_exam_attempts (user_id, taken_at desc);

alter table public.user_combustible_exam_attempts enable row level security;

drop policy if exists combustible_exam_select_own on public.user_combustible_exam_attempts;
create policy combustible_exam_select_own
  on public.user_combustible_exam_attempts
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- Quien inserta es evaluacion_terminar, que es SECURITY DEFINER. El cliente
-- solo lee lo suyo: sin política de insert no hay grant de insert, y por eso
-- nadie puede escribirse un 100.
revoke all on table public.user_combustible_exam_attempts from anon, authenticated;
grant select on table public.user_combustible_exam_attempts to authenticated;


-- ── El catálogo de contenido ──
-- Las claves salen de los archivos generados por
-- scripts/modulos/convertir-unidades.mjs, no de una lista escrita a mano.
insert into public.modulos_contenido (modulo, lecciones, practicas) values
  ('rac', 19, array['u01-q1', 'u01-q2', 'u01-q3', 'u01-q4', 'u02-q1', 'u02-q2', 'u02-q3', 'u03-q1', 'u03-q2', 'u03-q3', 'u04-q1', 'u04-q2', 'u04-q3', 'u05-q1', 'u05-q2', 'u05-q3', 'u05-q4', 'u06-q1', 'u06-q2', 'u06-q3', 'u07-q1', 'u07-q2', 'u07-q3', 'u08-q1', 'u08-q2', 'u09-q1', 'u09-q2', 'u10-q1', 'u10-q2', 'u10-q3', 'u10-q4', 'u11-q1', 'u11-q2', 'u12-q1', 'u12-q2', 'u12-q3', 'u13-q1', 'u13-q2', 'u13-q3', 'u14-q1', 'u14-q2', 'u15-q1', 'u15-q2', 'u15-q3', 'u16-q1', 'u16-q2', 'u16-q3', 'u17-q1', 'u17-q2', 'u17-q3', 'u18-q1', 'u18-q2', 'u19-q1', 'u19-q2']),
  ('combustible', 23, array['c01-q1', 'c01-q2', 'c01-q3', 'c02-q1', 'c02-q2', 'c02-q3', 'c03-q1', 'c03-q2', 'c03-q3', 'c04-q1', 'c04-q2', 'c04-q3', 'c05-q1', 'c05-q2', 'c05-q3', 'c06-q1', 'c06-q2', 'c06-q3', 'c07-q1', 'c07-q2', 'c07-q3', 'c08-q1', 'c08-q2', 'c08-q3', 'c09-q1', 'c09-q2', 'c09-q3', 'c10-q1', 'c10-q2', 'c10-q3', 'c11-q1', 'c11-q2', 'c11-q3', 'c12-q1', 'c12-q2', 'c12-q3', 'c13-q1', 'c13-q2', 'c13-q3', 'c14-q1', 'c14-q2', 'c14-q3', 'c15-q1', 'c15-q2', 'c15-q3', 'c16-q1', 'c16-q2', 'c16-q3', 'c17-q1', 'c17-q2', 'c17-q3', 'c18-q1', 'c18-q2', 'c18-q3', 'c19-q1', 'c19-q2', 'c19-q3', 'c20-q1', 'c20-q2', 'c20-q3', 'c21-q1', 'c21-q2', 'c21-q3', 'c22-q1', 'c22-q2', 'c22-q3'])
on conflict (modulo) do update set
  lecciones = excluded.lecciones,
  practicas = excluded.practicas;

-- ── Umbrales, que documentan las constantes del front ──
insert into public.module_thresholds (code, total, nota) values
  ('rac_pass', 80, 'Mínimo de la evaluación de RAC, sobre 100'),
  ('combustible_pass', 80, 'Mínimo de la evaluación de Gestión del combustible, sobre 100')
on conflict (code) do update set total = excluded.total, nota = excluded.nota;

-- ── Las seis funciones compartidas, republicadas enteras ──

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
    union all
    select unnest(lesson_screens) from public.user_rac_progress where p_modulo = 'rac' and user_id = p_user
    union all
    select unnest(lesson_screens) from public.user_combustible_progress where p_modulo = 'combustible' and user_id = p_user
  ) as leidas
  where s between 1 and (select c.lecciones from public.modulos_contenido c where c.modulo = p_modulo)
$function$;

create or replace function private.practicas_hechas(p_user uuid, p_modulo text)
returns integer
language sql
stable security definer
set search_path to ''
as $function$
  select count(distinct p)::int
  from (
    select unnest(practice_done) as p from public.user_notam_progress where p_modulo = 'notam' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_metar_progress where p_modulo = 'metar' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_mercancias_progress where p_modulo = 'mercancias' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_aerodinamica_progress where p_modulo = 'aerodinamica' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_aeropuertos_progress where p_modulo = 'aeropuertos' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_performance_progress where p_modulo = 'performance' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_comunicaciones_progress where p_modulo = 'comunicaciones' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_rac_progress where p_modulo = 'rac' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_combustible_progress where p_modulo = 'combustible' and user_id = p_user
  ) as hechas
  where exists (
    select 1 from public.modulos_contenido c
    where c.modulo = p_modulo and hechas.p = any (c.practicas)
  )
$function$;

-- ── Las reglas de las dos evaluaciones ──
-- El CHECK de destino crece; no se sustituye por uno más corto.
alter table public.evaluaciones drop constraint if exists evaluaciones_destino_check;
alter table public.evaluaciones add constraint evaluaciones_destino_check
  check (destino = any (array[
    'notam', 'metar', 'mercancias', 'aerodinamica', 'aeropuertos',
    'performance', 'comunicaciones', 'rac', 'combustible', 'simulacro_aerolinea'
  ]));

insert into public.evaluaciones
  (clave, titulo, retroalimentacion, preguntas_por_intento, aprobacion,
   barajar_opciones, minutos_vigencia, destino, activa, modulo_leccion)
values
  ('rac_evaluacion', 'RAC · Evaluación', 'al_final', 20, 80,
   true, 180, 'rac', true, null),
  ('combustible_evaluacion', 'Gestión del combustible · Evaluación', 'al_final', 20, 80,
   true, 180, 'combustible', true, null)
on conflict (clave) do update set
  titulo = excluded.titulo,
  retroalimentacion = excluded.retroalimentacion,
  preguntas_por_intento = excluded.preguntas_por_intento,
  aprobacion = excluded.aprobacion,
  barajar_opciones = excluded.barajar_opciones,
  minutos_vigencia = excluded.minutos_vigencia,
  destino = excluded.destino,
  activa = excluded.activa;

-- De qué banco sale cada una: de uno solo y sin cupo, así que el intento se
-- sortea entero. La etiqueta va en null porque es lo que el cliente recibe
-- como «tema», y con un único banco no hay tema que distinguir.
insert into public.evaluacion_fuentes (evaluacion, banco, etiqueta, cupo) values
  ('rac_evaluacion', 'rac_evaluacion', null, null),
  ('combustible_evaluacion', 'combustible_evaluacion', null, null)
on conflict (evaluacion, banco) do update set
  etiqueta = excluded.etiqueta,
  cupo = excluded.cupo;

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
      when 'rac' then
        insert into public.user_rac_exam_attempts (user_id, score, correct, total)
        values (v_user, v_puntaje, v_s.correctas, v_total);
      when 'combustible' then
        insert into public.user_combustible_exam_attempts (user_id, score, correct, total)
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

-- ── Los ocho logros ──
-- 34 a 41: Performance y Comunicaciones comparten el 30 al 33 (se cruzaron al
-- entrar el mismo día), así que estos arrancan después del cruce.
insert into public.achievements (code, name, description, icon, tier, order_index) values
  ('rac_lesson', 'RAC leído', 'Leíste las diecinueve unidades del módulo de RAC', 'book-open', 'bronze', 34),
  ('rac_practice', 'RAC practicado', 'Respondiste las preguntas de todas las unidades del RAC', 'target', 'silver', 35),
  ('rac_exam', 'RAC aprobado', 'Aprobaste la evaluación de RAC', 'graduation-cap', 'silver', 36),
  ('rac_master', 'Maestro del RAC', 'Lección, preguntas y evaluación del RAC, completas', 'trophy', 'gold', 37),
  ('combustible_lesson', 'Combustible leído', 'Leíste los veintitrés capítulos de Gestión del combustible', 'book-open', 'bronze', 38),
  ('combustible_practice', 'Combustible practicado', 'Respondiste las preguntas de todos los capítulos', 'target', 'silver', 39),
  ('combustible_exam', 'Combustible aprobado', 'Aprobaste la evaluación de Gestión del combustible', 'graduation-cap', 'silver', 40),
  ('combustible_master', 'Maestro del combustible', 'Lección, preguntas y evaluación del combustible, completas', 'trophy', 'gold', 41)
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon,
  tier = excluded.tier,
  order_index = excluded.order_index;

create or replace function private.desbloquear_logros(p_user uuid, p_grupo text)
returns integer
language plpgsql
security definer
set search_path to ''
as $function$
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
    when 'aeropuertos' then array['aeropuertos_lesson', 'aeropuertos_practice', 'aeropuertos_exam', 'aeropuertos_master']
    when 'performance' then array['performance_lesson', 'performance_practice', 'performance_exam', 'performance_master']
    when 'comunicaciones' then array['comunicaciones_lesson', 'comunicaciones_practice', 'comunicaciones_exam', 'comunicaciones_master']
    when 'rac' then array['rac_lesson', 'rac_practice', 'rac_exam', 'rac_master']
    when 'combustible' then array['combustible_lesson', 'combustible_practice', 'combustible_exam', 'combustible_master']
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

  when 'aeropuertos' then
    v_lecciones := private.secciones_leidas(p_user, 'aeropuertos')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'aeropuertos');
    v_practicas := private.practicas_hechas(p_user, 'aeropuertos')
      >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'aeropuertos');
    v_aprobado := exists (
      select 1 from public.user_aeropuertos_exam_attempts
      where user_id = p_user
        and coalesce(score, 0) >= coalesce((select total from public.module_thresholds where code = 'aeropuertos_pass'), 80)
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'aeropuertos_lesson'); end if;
    if v_practicas then v_new := v_new + public._try_unlock(p_user, 'aeropuertos_practice'); end if;
    if v_aprobado then v_new := v_new + public._try_unlock(p_user, 'aeropuertos_exam'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'aeropuertos_master');
    end if;

  when 'performance' then
    v_lecciones := private.secciones_leidas(p_user, 'performance')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'performance');
    v_practicas := private.practicas_hechas(p_user, 'performance')
      >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'performance');
    v_aprobado := exists (
      select 1 from public.user_performance_exam_attempts
      where user_id = p_user
        and coalesce(score, 0) >= coalesce((select total from public.module_thresholds where code = 'performance_pass'), 80)
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'performance_lesson'); end if;
    if v_practicas then v_new := v_new + public._try_unlock(p_user, 'performance_practice'); end if;
    if v_aprobado then v_new := v_new + public._try_unlock(p_user, 'performance_exam'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'performance_master');
    end if;

  when 'comunicaciones' then
    v_lecciones := private.secciones_leidas(p_user, 'comunicaciones')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'comunicaciones');
    -- Sin práctica en el catálogo no hay logro de práctica: cardinality de un
    -- arreglo vacío es 0 y cualquiera lo cumpliría.
    v_practicas := (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'comunicaciones') > 0
      and private.practicas_hechas(p_user, 'comunicaciones')
        >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'comunicaciones');
    v_aprobado := exists (
      select 1 from public.user_comunicaciones_exam_attempts
      where user_id = p_user
        and coalesce(score, 0) >= coalesce((select total from public.module_thresholds where code = 'comunicaciones_pass'), 80)
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'comunicaciones_lesson'); end if;
    if v_practicas then v_new := v_new + public._try_unlock(p_user, 'comunicaciones_practice'); end if;
    if v_aprobado then v_new := v_new + public._try_unlock(p_user, 'comunicaciones_exam'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'comunicaciones_master');
    end if;

  when 'rac' then
    v_lecciones := private.secciones_leidas(p_user, 'rac')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'rac');
    v_practicas := (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'rac') > 0
      and private.practicas_hechas(p_user, 'rac')
        >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'rac');
    v_aprobado := exists (
      select 1 from public.user_rac_exam_attempts
      where user_id = p_user
        and coalesce(score, 0) >= coalesce((select total from public.module_thresholds where code = 'rac_pass'), 80)
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'rac_lesson'); end if;
    if v_practicas then v_new := v_new + public._try_unlock(p_user, 'rac_practice'); end if;
    if v_aprobado then v_new := v_new + public._try_unlock(p_user, 'rac_exam'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'rac_master');
    end if;

  when 'combustible' then
    v_lecciones := private.secciones_leidas(p_user, 'combustible')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'combustible');
    v_practicas := (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'combustible') > 0
      and private.practicas_hechas(p_user, 'combustible')
        >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'combustible');
    v_aprobado := exists (
      select 1 from public.user_combustible_exam_attempts
      where user_id = p_user
        and coalesce(score, 0) >= coalesce((select total from public.module_thresholds where code = 'combustible_pass'), 80)
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'combustible_lesson'); end if;
    if v_practicas then v_new := v_new + public._try_unlock(p_user, 'combustible_practice'); end if;
    if v_aprobado then v_new := v_new + public._try_unlock(p_user, 'combustible_exam'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'combustible_master');
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
$function$;

-- ── Los disparadores que desbloquean ──
drop trigger if exists trg_check_achievements_rac on public.user_rac_progress;
create trigger trg_check_achievements_rac
  after insert or update on public.user_rac_progress
  for each row execute function private.trigger_logros('rac');

drop trigger if exists trg_check_achievements_rac_exam on public.user_rac_exam_attempts;
create trigger trg_check_achievements_rac_exam
  after insert on public.user_rac_exam_attempts
  for each row execute function private.trigger_logros('rac');

drop trigger if exists trg_check_achievements_combustible on public.user_combustible_progress;
create trigger trg_check_achievements_combustible
  after insert or update on public.user_combustible_progress
  for each row execute function private.trigger_logros('combustible');

drop trigger if exists trg_check_achievements_combustible_exam on public.user_combustible_exam_attempts;
create trigger trg_check_achievements_combustible_exam
  after insert on public.user_combustible_exam_attempts
  for each row execute function private.trigger_logros('combustible');

create or replace function public.check_and_unlock_achievements(p_user_id uuid)
returns integer
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_grupo text;
  v_new int := 0;
begin
  if p_user_id is null then return 0; end if;
  -- Con sesión de usuario, solo sobre sí mismo. El service role no trae
  -- auth.uid() y puede revisar a cualquiera.
  if auth.uid() is not null and p_user_id is distinct from auth.uid() then return 0; end if;

  foreach v_grupo in array array[
    'piloto', 'quiz', 'racha', 'comunidad', 'suscripcion',
    'notam', 'metar', 'aerolinea', 'mercancias', 'aerodinamica', 'aeropuertos', 'performance', 'comunicaciones', 'rac', 'combustible'
  ] loop
    v_new := v_new + private.desbloquear_logros(p_user_id, v_grupo);
  end loop;
  return v_new;
end
$function$;

grant execute on function public.check_and_unlock_achievements(uuid) to authenticated;

create or replace function public.panel_tarjetas()
returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
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
    'aeropuertos', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'aeropuertos'),
      'practicas', private.practicas_hechas(v_user, 'aeropuertos'),
      'mejor', (select max(e.score) from public.user_aeropuertos_exam_attempts e where e.user_id = v_user)
    ),
    'performance', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'performance'),
      'practicas', private.practicas_hechas(v_user, 'performance'),
      'mejor', (select max(e.score) from public.user_performance_exam_attempts e where e.user_id = v_user)
    ),
    'comunicaciones', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'comunicaciones'),
      'practicas', private.practicas_hechas(v_user, 'comunicaciones'),
      'mejor', (select max(e.score) from public.user_comunicaciones_exam_attempts e where e.user_id = v_user)
    ),
    'rac', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'rac'),
      'practicas', private.practicas_hechas(v_user, 'rac'),
      'mejor', (select max(e.score) from public.user_rac_exam_attempts e where e.user_id = v_user)
    ),
    'combustible', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'combustible'),
      'practicas', private.practicas_hechas(v_user, 'combustible'),
      'mejor', (select max(e.score) from public.user_combustible_exam_attempts e where e.user_id = v_user)
    ),
    -- Lo que el piloto se comprometió a hacer: igual que en 20260915140000.
    'plan', (
      select jsonb_build_object(
        'dias', pe.dias, 'hora', pe.hora, 'zona', pe.zona, 'minutos_meta', pe.minutos_meta
      )
      from public.plan_de_estudio pe where pe.user_id = v_user
    ),
    'postulaciones', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'aerolinea', coalesce(a.name, po.aerolinea),
          'estado', po.estado,
          'dias', current_date - po.postulada_en
        )
        order by po.postulada_en
      )
      from public.postulaciones po
      left join public.airlines a on a.id = po.airline_id
      where po.user_id = v_user and po.estado in ('postulada', 'en_proceso')
    ), '[]'::jsonb),
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
$function$;

grant execute on function public.panel_tarjetas() to authenticated;
