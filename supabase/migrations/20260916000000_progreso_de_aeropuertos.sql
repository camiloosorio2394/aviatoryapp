-- Módulo Aeropuertos: progreso, catálogo de contenido, panel y logros.
--
-- Es el patrón de Aerodinámica, que a su vez es el de Mercancías. Las funciones
-- compartidas (private.secciones_leidas, private.practicas_hechas,
-- private.desbloquear_logros, public.check_and_unlock_achievements y
-- public.panel_tarjetas) se reemplazan enteras: se leyeron de la base con
-- pg_get_functiondef el 16 de septiembre de 2026 y lo único que cambia en cada
-- una es la rama de 'aeropuertos'.
--
-- ORDEN: va DESPUÉS de 20260915230000_evaluacion_de_aeropuertos.sql, porque el
-- panel y los logros leen user_aeropuertos_exam_attempts, que nace allí.
-- Corrida al revés, falla en la primera función que la nombra.
--
-- Una cosa más, que no es de este módulo y se explica en su sección: la lista
-- de grupos de check_and_unlock_achievements nunca recibió 'aerodinamica'. Sus
-- logros sí se desbloquean, porque de eso viven los disparadores de sus tablas,
-- pero el repaso manual saltaba el módulo. Se agrega aquí porque esta migración
-- reescribe esa función entera y no tiene sentido volver a publicarla con la
-- lista incompleta.

-- ── 1 · Progreso del módulo ────────────────────────────────────────────────

create table if not exists public.user_aeropuertos_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  lesson_screens smallint[] not null default '{}',
  practice_done text[] not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.user_aeropuertos_progress enable row level security;

-- Solo lectura de lo propio. Escribir es exclusivo de la RPC, que valida
-- contra el catálogo: sin esto, cualquiera podría marcarse el módulo entero.
drop policy if exists aeropuertos_progress_select_own on public.user_aeropuertos_progress;
create policy aeropuertos_progress_select_own
  on public.user_aeropuertos_progress
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

revoke all on table public.user_aeropuertos_progress from anon, authenticated;
grant select on table public.user_aeropuertos_progress to authenticated;

-- ── 2 · Catálogo de contenido ──────────────────────────────────────────────
--
-- Veintidós lecciones y treinta claves de práctica: doce de reconocer, diez de
-- decidir y ocho de lo que cambió con la Enmienda 18. Es contra esto que valida
-- la RPC. De aquí en adelante lo mantiene al día scripts/catalogo/sembrar.mjs,
-- como el de los demás módulos.
--
-- Las entrevistas de nivel no entran: son pantallas de lectura dentro del
-- lector, no ejercicios, y no se marcan.

insert into public.modulos_contenido (modulo, lecciones, practicas)
values (
  'aeropuertos',
  22,
  array[
    'ap-rec-r01', 'ap-rec-r02', 'ap-rec-r03', 'ap-rec-r04', 'ap-rec-r05', 'ap-rec-r06',
    'ap-rec-r07', 'ap-rec-r08', 'ap-rec-r09', 'ap-rec-r10', 'ap-rec-r11', 'ap-rec-r12',
    'ap-dec-d01', 'ap-dec-d02', 'ap-dec-d03', 'ap-dec-d04', 'ap-dec-d05',
    'ap-dec-d06', 'ap-dec-d07', 'ap-dec-d08', 'ap-dec-d09', 'ap-dec-d10',
    'ap-cam-c01', 'ap-cam-c02', 'ap-cam-c03', 'ap-cam-c04',
    'ap-cam-c05', 'ap-cam-c06', 'ap-cam-c07', 'ap-cam-c08'
  ]::text[]
)
on conflict (modulo) do update set
  lecciones = excluded.lecciones,
  practicas = excluded.practicas,
  actualizado_en = now();

-- ── 3 · Umbrales, que documentan las constantes del front ──────────────────

insert into public.module_thresholds (code, total, nota) values
  ('aeropuertos_lesson', 22, 'AP_LECTURA_TOTAL de src/lib/aeropuertos.ts (22 lecciones en 5 niveles)'),
  ('aeropuertos_practice', 30, 'AP_PRACTICA_TOTAL de src/lib/aeropuertosPractica.ts (12 reconocer + 10 decidir + 8 cambios)'),
  ('aeropuertos_pass', 80, 'AP_PASS_SCORE: 25 preguntas al azar de 60, apruebas con 80')
on conflict (code) do update set total = excluded.total, nota = excluded.nota;

-- ── 4 · Marcar progreso ────────────────────────────────────────────────────
--
-- Copia fiel de aerodinamica_mark_progress: valida contra el catálogo y agrega
-- sin duplicar, así que repetir la llamada no cambia nada.

create or replace function public.aeropuertos_mark_progress(
  p_lesson_screen smallint default null,
  p_practice_id text default null
)
returns public.user_aeropuertos_progress
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_row public.user_aeropuertos_progress;
begin
  if auth.uid() is null then
    raise exception 'no authenticated user';
  end if;
  perform private.validar_marca_progreso('aeropuertos', p_lesson_screen, p_practice_id);

  insert into public.user_aeropuertos_progress (user_id, lesson_screens, practice_done, updated_at)
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
        public.user_aeropuertos_progress.lesson_screens ||
        case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end
      ) as s
    ),
    practice_done = (
      select coalesce(array_agg(distinct p order by p), '{}'::text[])
      from unnest(
        public.user_aeropuertos_progress.practice_done ||
        case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end
      ) as p
    ),
    updated_at = now()
  returning * into v_row;

  return v_row;
end
$function$;

revoke all on function public.aeropuertos_mark_progress(smallint, text) from public, anon;
grant execute on function public.aeropuertos_mark_progress(smallint, text) to authenticated;

-- ── 5 · Contar lo leído y lo practicado ────────────────────────────────────
--
-- Las dos de siempre con una rama más. Cada módulo tiene su tabla, así que la
-- unión crece con cada módulo nuevo; el filtro por p_modulo deja fuera las que
-- no son suyas antes de contar.

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
  ) as hechas
  where exists (
    select 1 from public.modulos_contenido c
    where c.modulo = p_modulo and hechas.p = any (c.practicas)
  )
$function$;

-- ── 6 · Los cuatro logros del módulo ───────────────────────────────────────

insert into public.achievements (code, name, description, icon, tier, order_index) values
  ('aeropuertos_lesson', 'Aeropuertos leído', 'Leíste las veintidós lecciones del módulo de aeropuertos', '📖', 'bronze', 26),
  ('aeropuertos_practice', 'Aeropuertos practicado', 'Resolviste los 30 ejercicios de la práctica: reconocer, decidir y lo que cambió', '🎯', 'silver', 27),
  ('aeropuertos_exam', 'Evaluación de aeropuertos superada', 'Aprobaste la evaluación de aeropuertos', '✅', 'silver', 28),
  ('aeropuertos_master', 'Aeropuertos dominado', 'Terminaste el módulo entero: lección, práctica y evaluación', '🛬', 'gold', 29)
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon,
  tier = excluded.tier,
  order_index = excluded.order_index;

-- ── 7 · Desbloquear los logros ─────────────────────────────────────────────
--
-- La de la base con el grupo 'aeropuertos' agregado. El aprobado se compara
-- contra module_thresholds y no contra un 80 escrito a mano, que es como quedó
-- desde Mercancías.

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

-- ── 8 · Los disparadores que desbloquean ──────────────────────────────────
--
-- Quien desbloquea de verdad es esto: cada vez que el piloto marca progreso o
-- termina un intento, el disparador llama a desbloquear_logros con el grupo del
-- módulo. Sin estas dos líneas el módulo cuenta pero no premia.

drop trigger if exists trg_check_achievements_aeropuertos on public.user_aeropuertos_progress;
create trigger trg_check_achievements_aeropuertos
  after insert or update on public.user_aeropuertos_progress
  for each row execute function private.trigger_logros('aeropuertos');

drop trigger if exists trg_check_achievements_aeropuertos_exam on public.user_aeropuertos_exam_attempts;
create trigger trg_check_achievements_aeropuertos_exam
  after insert or update on public.user_aeropuertos_exam_attempts
  for each row execute function private.trigger_logros('aeropuertos');

-- ── 9 · Los grupos del repaso manual ──────────────────────────────────────
--
-- Esta función es el repaso completo, el que se llama a mano para revisar a un
-- piloto de una sentada. Aquí entra 'aeropuertos', y también 'aerodinamica',
-- que faltaba desde el 14 de septiembre: la rama existía en desbloquear_logros
-- y sus disparadores funcionaban, pero el repaso saltaba el módulo. Repasar de
-- más no cuesta nada: _try_unlock es idempotente y solo mira lo ya guardado.

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
    'notam', 'metar', 'aerolinea', 'mercancias', 'aerodinamica', 'aeropuertos'
  ] loop
    v_new := v_new + private.desbloquear_logros(p_user_id, v_grupo);
  end loop;
  return v_new;
end
$function$;

-- ── 10 · El panel, con la tarjeta del módulo ──────────────────────────────

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

-- ── 11 · La puerta de la evaluación ───────────────────────────────────────
--
-- Hasta ahora la lección completa la exigía solo el navegador, porque no había
-- dónde mirarla del lado del servidor. Con la tabla de progreso creada,
-- evaluacion_iniciar ya puede negarse a abrir la evaluación de quien no la
-- terminó, como en NOTAM y Mercancías.

update public.evaluaciones
set modulo_leccion = 'aeropuertos'
where clave = 'aeropuertos_evaluacion';
