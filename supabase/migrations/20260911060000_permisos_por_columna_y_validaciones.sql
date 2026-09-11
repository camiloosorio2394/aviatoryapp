-- ============================================================================
-- Permisos por columna, datos validados en la base y dos funciones reparadas
--
-- Segunda tanda de la remediación técnica. NO TOCA FILAS de usuarios: cambia
-- permisos, políticas, funciones y agrega restricciones que los datos actuales ya
-- cumplen (comprobado antes de aplicarla).
--
-- La idea que ordena todo: cada rol puede escribir exactamente lo que la app
-- escribe, y la base valida lo que guarda. Lo que la app no hace desde el
-- navegador, el navegador no lo puede hacer.
--
--  1. Nombres de usuario reservados en un solo sitio (antes solo los revisaba
--     check_username_available, y un update directo los aceptaba).
--  2. profiles: se editan nombre, foto, país, usuario y hoja de vida pública. El
--     código de referido y quién te refirió ya no. El perfil lo crea
--     handle_new_user, que además deja de fallar el registro con un nombre de
--     Google de más de 120 caracteres.
--  3. ai_interactions: de las respuestas de Wingman solo se marca la valoración.
--  4. notifications y community_messages: sin UPDATE desde el cliente. Las
--     notificaciones se marcan con mark_all_notifications_read y los mensajes no
--     tienen edición.
--  5. exam_reports y exam_report_topics: cada piloto lee los suyos. Los números
--     de la comunidad salen de get_subject_intel y get_all_subjects_intel, que
--     ya los agregan sin datos personales.
--  6. Tablas heredadas que la app no usa: de solo lectura para el cliente.
--  7. Biblioteca: «Seguir leyendo» leía user_library_views, pero nada escribía
--     ahí. bump_library_item_views ahora registra la apertura del piloto (una
--     fila por documento) y sigue sumando al contador del documento.
--  8. record_daily_activity acota lo que suma; pca_stats pasa a search_path
--     vacío y queda versionada (no estaba en ninguna migración);
--     get_profile_avatars acota el arreglo.
--  9. get_peers_in_stage fallaba siempre (`column reference "stage" is
--     ambiguous`), por eso la tarjeta de pilotos de tu etapa mostraba cero.
--     Reparada, con tope de 20 y sin devolver el id de los demás pilotos.
--     get_subject_intel fallaba igual (`subject_id`): el detalle de cada
--     materia del Exam Tracker nunca cargaba. Reparada, y los temas más
--     preguntados cuentan solo reportes de los últimos 90 días, como el resto.
-- 10. Funciones de disparador e internas fuera de la API.
-- 11. Storage: los avatares se siguen viendo por su URL pública, pero la lista
--     del bucket solo la ve cada dueño de su carpeta. Se quita la política
--     duplicada de documentos oficiales.
-- 12. Restricciones de datos: horas, minutos, nivel ICAO, largos de texto.
-- ============================================================================


-- ─── 1. Nombres de usuario reservados ───────────────────────────────────────
create or replace function private.username_reservado(p_username text)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select lower(coalesce(p_username, '')) = any (array[
    'admin', 'administrator', 'root', 'support', 'help', 'team', 'aviatory',
    'staff', 'official', 'security', 'moderator', 'mod', 'system', 'api',
    'null', 'undefined', 'user', 'me', 'you'
  ])
$$;

revoke all on function private.username_reservado(text) from public, anon, authenticated, service_role;

create or replace function private.validar_username()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.username is not null and private.username_reservado(new.username) then
    raise exception 'username_reservado' using errcode = 'check_violation';
  end if;
  return new;
end
$$;

revoke all on function private.validar_username() from public, anon, authenticated, service_role;

drop trigger if exists trg_profiles_username_reservado on public.profiles;
create trigger trg_profiles_username_reservado
  before insert or update of username on public.profiles
  for each row execute function private.validar_username();

create or replace function public.check_username_available(p_username text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- El formato es el mismo de la restricción username_format de profiles.
  if p_username is null or p_username !~ '^[a-z0-9_]{3,30}$' then
    return false;
  end if;

  if private.username_reservado(p_username) then
    return false;
  end if;

  return not exists (
    select 1 from public.profiles where lower(username) = lower(p_username)
  );
end
$$;

revoke all on function public.check_username_available(text) from public;
grant execute on function public.check_username_available(text) to anon, authenticated, service_role;


-- ─── 2. profiles ────────────────────────────────────────────────────────────
revoke insert, update on table public.profiles from anon, authenticated;
grant update (full_name, photo_url, country, username, cv_public) on table public.profiles to authenticated;
drop policy if exists "profiles_insert_own" on public.profiles;

alter table public.profiles
  add constraint profiles_full_name_largo check (full_name is null or char_length(full_name) <= 120),
  add constraint profiles_country_largo check (country is null or char_length(country) <= 60),
  add constraint profiles_photo_url_largo check (photo_url is null or char_length(photo_url) <= 1000);

-- Se recrea entera sobre la versión en producción. Cambian dos cosas: un nombre
-- reservado en los metadatos queda en null (antes el insert habría fallado con
-- la nueva guarda y el registro entero con él) y el nombre completo se recorta
-- a 120 caracteres.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_username text;
  v_referred_by uuid;
  v_input_code text;
begin
  v_username := lower(nullif(trim(new.raw_user_meta_data->>'username'), ''));
  if v_username is not null then
    if v_username !~ '^[a-z0-9_]{3,30}$'
       or private.username_reservado(v_username)
       or exists (select 1 from public.profiles where lower(username) = v_username) then
      v_username := null;
    end if;
  end if;

  v_input_code := upper(nullif(trim(new.raw_user_meta_data->>'referral_code'), ''));
  if v_input_code is not null then
    select id into v_referred_by
    from public.profiles
    where referral_code = v_input_code
    limit 1;
  end if;

  insert into public.profiles (id, username, full_name, referral_code, referred_by)
    values (
      new.id,
      v_username,
      left(nullif(trim(new.raw_user_meta_data->>'full_name'), ''), 120),
      public._gen_referral_code(),
      v_referred_by
    );

  insert into public.pilot_state (user_id) values (new.id);

  insert into public.subscriptions (user_id, status, plan, current_period_end)
    values (new.id, 'trialing', 'free', now() + interval '7 days');

  insert into public.streaks (user_id) values (new.id);

  -- Quien llega referido suma 7 días de prueba (14 en total).
  if v_referred_by is not null then
    update public.subscriptions
    set current_period_end = current_period_end + interval '7 days'
    where user_id = new.id;
  end if;

  return new;
end
$$;

revoke all on function public.handle_new_user() from public, anon, authenticated;


-- ─── 3. ai_interactions: solo la valoración ─────────────────────────────────
revoke insert, update, delete on table public.ai_interactions from anon, authenticated;
grant update (feedback, feedback_at) on table public.ai_interactions to authenticated;


-- ─── 4. notifications y community_messages ──────────────────────────────────
revoke insert, update, delete on table public.notifications from anon, authenticated;
drop policy if exists "notifications_update_own" on public.notifications;

revoke update on table public.community_messages from anon, authenticated;
drop policy if exists "messages_update_own" on public.community_messages;


-- ─── 5. exam_reports y exam_report_topics ───────────────────────────────────
drop policy if exists "exam_reports_read_all" on public.exam_reports;
create policy "exam_reports_select_own" on public.exam_reports
  for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "report_topics_read_all" on public.exam_report_topics;
create policy "report_topics_select_own" on public.exam_report_topics
  for select to authenticated
  using (exists (
    select 1 from public.exam_reports r
    where r.id = report_id and r.user_id = (select auth.uid())
  ));

alter table public.exam_reports
  add constraint exam_reports_score_rango check (score is null or score between 0 and 100),
  add constraint exam_reports_tips_largo check (tips is null or char_length(tips) <= 2000),
  add constraint exam_reports_recalled_largo check (recalled_questions is null or char_length(recalled_questions) <= 4000);


-- ─── 6. Tablas heredadas que la app no usa ──────────────────────────────────
-- Comprobado con búsqueda en src/ y supabase/functions: ninguna lectura ni
-- escritura desde el cliente (salvo user_pca_exam_attempts, solo lectura). Las
-- funciones SECURITY DEFINER que las leen corren como su dueño y no cambian.
revoke insert, update, delete on table
  public.quiz_attempts,
  public.quiz_attempt_answers,
  public.user_airline_prep_attempts,
  public.user_airline_prep_progress,
  public.user_icao_attempts,
  public.user_icao_level,
  public.user_pca_exam_attempts,
  public.user_pca_lesson_progress,
  public.user_psych_attempts,
  public.user_library_bookmarks,
  public.interview_sim_feedback,
  public.interview_sim_recordings,
  public.interview_sim_sessions,
  public.airline_targets
from anon, authenticated;


-- ─── 7. Biblioteca: aperturas por piloto ────────────────────────────────────
-- Una fila por piloto y documento: «Seguir leyendo» necesita la última apertura,
-- no el historial entero, y así la tabla crece con los documentos y no con los
-- clics. La tabla está vacía, así que el índice único no choca con nada.
create unique index if not exists user_library_views_usuario_documento
  on public.user_library_views (user_id, item_id);

revoke insert, update, delete on table public.user_library_views from anon, authenticated;
drop policy if exists "user_library_views_own" on public.user_library_views;
create policy "user_library_views_select_own" on public.user_library_views
  for select to authenticated
  using (user_id = (select auth.uid()));

-- El contador lo suma la RPC: el disparador que lo sumaba al insertar contaría
-- cada documento una sola vez por piloto con el índice único de arriba.
drop trigger if exists trg_bump_library_views on public.user_library_views;
drop function if exists public.bump_library_item_views();

create or replace function public.bump_library_item_views(p_item_id bigint)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.library_items
     set views_count = coalesce(views_count, 0) + 1
   where id = p_item_id and is_published = true;

  if not found or auth.uid() is null then
    return;
  end if;

  insert into public.user_library_views (user_id, item_id, viewed_at)
  values (auth.uid(), p_item_id, now())
  on conflict (user_id, item_id) do update set viewed_at = excluded.viewed_at;
end
$$;

revoke all on function public.bump_library_item_views(bigint) from public, anon;
grant execute on function public.bump_library_item_views(bigint) to authenticated, service_role;


-- ─── 8. record_daily_activity, pca_stats, get_profile_avatars ───────────────
create or replace function public.record_daily_activity(
  p_questions integer default 0,
  p_correct integer default 0,
  p_minutes integer default 0
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_today date;
  -- Topes por llamada: un simulacro completo no pasa de 200 preguntas ni de
  -- cuatro horas. Lo que llegue fuera de rango se acota, no se rechaza: el
  -- registro de actividad no puede tumbar el cierre de un quiz.
  v_questions int := least(greatest(coalesce(p_questions, 0), 0), 500);
  v_correct int;
  v_minutes int := least(greatest(coalesce(p_minutes, 0), 0), 600);
begin
  if v_user_id is null then
    raise exception 'auth required';
  end if;

  v_correct := least(greatest(coalesce(p_correct, 0), 0), v_questions);
  v_today := (now() at time zone 'America/Bogota')::date;

  insert into public.daily_activity (user_id, date, activities_count, questions_answered, correct_answers, minutes_studied)
  values (v_user_id, v_today, 1, v_questions, v_correct, v_minutes)
  on conflict (user_id, date) do update set
    activities_count   = public.daily_activity.activities_count + 1,
    questions_answered = public.daily_activity.questions_answered + v_questions,
    correct_answers    = public.daily_activity.correct_answers + v_correct,
    minutes_studied    = public.daily_activity.minutes_studied + v_minutes;
end
$$;

revoke all on function public.record_daily_activity(integer, integer, integer) from public, anon;
grant execute on function public.record_daily_activity(integer, integer, integer) to authenticated, service_role;

create or replace function public.pca_stats()
returns json
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_bank_total int;
  v_answered int;
  v_correct int;
  v_sessions int;
  v_avg_minutes numeric;
  v_streak int;
  v_by_subject json;
  v_target_date date;
  v_resume_slug text;
begin
  if v_user is null then
    raise exception 'auth required';
  end if;

  select count(*) into v_bank_total
  from public.vault_questions where module = 'pca' and is_active;

  select count(distinct q) into v_answered
  from public.vault_sessions s, unnest(s.question_ids) as q
  where s.user_id = v_user and s.module = 'pca' and s.completed_at is not null;

  select
    coalesce(sum(s.correct_count), 0),
    count(*),
    round(avg(extract(epoch from (s.completed_at - s.started_at)) / 60)::numeric, 0)
  into v_correct, v_sessions, v_avg_minutes
  from public.vault_sessions s
  where s.user_id = v_user and s.module = 'pca' and s.completed_at is not null;

  select current_streak into v_streak from public.streaks where user_id = v_user;
  select target_date into v_target_date from public.pilot_state where user_id = v_user;

  -- Última materia trabajada, para poder ofrecer retomarla.
  select s.subject_slug into v_resume_slug
  from public.vault_sessions s
  where s.user_id = v_user and s.module = 'pca'
    and s.completed_at is not null and s.subject_slug is not null
    and s.subject_slug <> 'examen'
  order by s.completed_at desc
  limit 1;

  select json_agg(x order by x.total desc, x.slug)
  into v_by_subject
  from (
    select
      vq.subject_slug as slug,
      count(*) as total,
      coalesce((
        select count(distinct q)
        from public.vault_sessions s, unnest(s.question_ids) as q
        where s.user_id = v_user and s.subject_slug = vq.subject_slug
          and s.completed_at is not null
      ), 0) as answered
    from public.vault_questions vq
    where vq.module = 'pca' and vq.is_active
    group by vq.subject_slug
  ) x;

  return json_build_object(
    'bank_total', v_bank_total,
    'answered', v_answered,
    'pending', greatest(v_bank_total - v_answered, 0),
    'mastery_pct', case when v_answered > 0 and v_sessions > 0
                        then round((v_correct::numeric / nullif(v_answered, 0)) * 100)
                        else null end,
    'sessions', v_sessions,
    'avg_minutes', case when v_sessions > 0 then v_avg_minutes else null end,
    'streak_days', coalesce(v_streak, 0),
    'target_date', v_target_date,
    'days_to_exam', case when v_target_date is not null
                         then (v_target_date - current_date) end,
    'resume_slug', v_resume_slug,
    'by_subject', coalesce(v_by_subject, '[]'::json)
  );
end
$$;

revoke all on function public.pca_stats() from public, anon;
grant execute on function public.pca_stats() to authenticated, service_role;

create or replace function public.get_profile_avatars(p_user_ids uuid[])
returns table (id uuid, username text, photo_url text)
language sql
stable
security definer
set search_path = ''
as $$
  -- La comunidad pide los autores de una página de mensajes: 200 sobra.
  select p.id, p.username, p.photo_url
  from public.profiles p
  where p.id = any (p_user_ids[1:200])
$$;

revoke all on function public.get_profile_avatars(uuid[]) from public, anon;
grant execute on function public.get_profile_avatars(uuid[]) to authenticated, service_role;


-- ─── 9. get_peers_in_stage ──────────────────────────────────────────────────
-- Cambia lo que devuelve (sin user_id), así que se borra y se crea.
drop function if exists public.get_peers_in_stage(integer);

create function public.get_peers_in_stage(p_limit integer default 6)
returns table (username text, stage text, current_streak integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_stage text;
begin
  if v_user_id is null then
    return;
  end if;

  -- Todo calificado: las columnas de salida (username, stage, current_streak)
  -- son variables en PL/pgSQL y chocaban con las de las tablas.
  select ps.stage::text into v_stage
  from public.pilot_state ps
  where ps.user_id = v_user_id;

  if v_stage is null then
    return;
  end if;

  return query
    select p.username, ps.stage::text, coalesce(s.current_streak, 0)
    from public.pilot_state ps
    join public.profiles p on p.id = ps.user_id
    left join public.streaks s on s.user_id = ps.user_id
    where ps.stage::text = v_stage
      and ps.user_id <> v_user_id
      and p.username is not null
    order by coalesce(s.current_streak, 0) desc, ps.updated_at desc
    limit least(greatest(coalesce(p_limit, 6), 1), 20);
end
$$;

revoke all on function public.get_peers_in_stage(integer) from public, anon;
grant execute on function public.get_peers_in_stage(integer) to authenticated, service_role;

create or replace function public.get_subject_intel(p_subject_slug text)
returns table (
  subject_id bigint,
  subject_name text,
  total_reports integer,
  pass_rate numeric,
  avg_difficulty numeric,
  top_topics jsonb,
  recent_reports jsonb
)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_subject_id bigint;
  v_subject_name text;
  v_total int;
  v_cutoff date := ((now() at time zone 'America/Bogota')::date - interval '90 days')::date;
begin
  -- Todo calificado: subject_id es a la vez columna de salida y de las tablas.
  select s.id, s.name into v_subject_id, v_subject_name
  from public.subjects s
  where s.slug = p_subject_slug;

  if v_subject_id is null then
    return;
  end if;

  select count(*) into v_total
  from public.exam_reports er
  where er.subject_id = v_subject_id and er.exam_date >= v_cutoff;

  return query
  select
    v_subject_id,
    v_subject_name,
    v_total,
    case when v_total > 0 then
      round(100.0 * (
        select count(*)::numeric from public.exam_reports er
        where er.subject_id = v_subject_id and er.exam_date >= v_cutoff and er.passed
      ) / v_total, 0)
    end,
    (
      select round(avg(er.difficulty)::numeric, 1)
      from public.exam_reports er
      where er.subject_id = v_subject_id and er.exam_date >= v_cutoff and er.difficulty is not null
    ),
    -- Temas más preguntados: solo reportes dentro de la ventana de 90 días.
    coalesce((
      select jsonb_agg(t order by t.count desc)
      from (
        select
          st.key,
          st.label,
          count(r.id) as count,
          round(100.0 * count(r.id) / nullif(v_total, 0), 0) as frequency_pct
        from public.subject_topics st
        left join public.exam_report_topics rt on rt.topic_id = st.id
        left join public.exam_reports r on r.id = rt.report_id and r.exam_date >= v_cutoff
        where st.subject_id = v_subject_id
        group by st.id, st.key, st.label, st.order_index
        having count(r.id) > 0
        order by count(r.id) desc
        limit 8
      ) t
    ), '[]'::jsonb),
    -- Reportes recientes, sin datos de quien reporta.
    coalesce((
      select jsonb_agg(recent.r2)
      from (
        select jsonb_build_object(
          'exam_date', er.exam_date,
          'region', er.region,
          'passed', er.passed,
          'difficulty', er.difficulty,
          'tips', nullif(er.tips, '')
        ) as r2
        from public.exam_reports er
        where er.subject_id = v_subject_id and er.exam_date >= v_cutoff
        order by er.exam_date desc, er.id desc
        limit 6
      ) recent
    ), '[]'::jsonb);
end
$$;

revoke all on function public.get_subject_intel(text) from public, anon;
grant execute on function public.get_subject_intel(text) to authenticated, service_role;


-- ─── 10. Funciones internas fuera de la API ─────────────────────────────────
revoke all on function public.check_psico_achievement() from public, anon, authenticated;
revoke all on function public._gen_referral_code() from public, anon, authenticated;


-- ─── 11. Storage ────────────────────────────────────────────────────────────
-- El bucket es público: la URL de cada avatar se sigue sirviendo sin sesión.
-- Esta política solo gobierna listar y leer por la API, y la subida con upsert
-- necesita leer el archivo propio.
drop policy if exists "avatars_public_read" on storage.objects;
create policy "avatars_owner_read" on storage.objects
  for select to authenticated
  using (bucket_id = 'avatars' and (select auth.uid())::text = (storage.foldername(name))[1]);

drop policy if exists "documentos oficiales lectura autenticada" on storage.objects;


-- ─── 12. Restricciones de datos ─────────────────────────────────────────────
alter table public.pilot_state
  add constraint pilot_state_total_hours_rango check (total_hours is null or total_hours between 0 and 50000),
  add constraint pilot_state_hours_pic_rango check (
    hours_pic is null or (hours_pic >= 0 and (total_hours is null or hours_pic <= total_hours))
  ),
  add constraint pilot_state_icao_rango check (icao_english_level is null or icao_english_level between 1 and 6),
  add constraint pilot_state_target_airline_largo check (target_airline is null or char_length(target_airline) <= 120);

-- Un registro de bitácora es un vuelo: no pasa de 24 horas, y cada casilla es
-- parte del total. El instrumento simulado queda fuera: una sesión de simulador
-- se registra sin tiempo de vuelo.
alter table public.flights
  add constraint flights_total_minutes_tope check (total_minutes <= 1440),
  add constraint flights_partes_del_total check (
    pic_minutes <= total_minutes
    and sic_minutes <= total_minutes
    and dual_minutes <= total_minutes
    and night_minutes <= total_minutes
    and instrument_real_minutes <= total_minutes
    and cross_country_minutes <= total_minutes
  ),
  add constraint flights_textos_largo check (
    coalesce(char_length(aircraft_registration), 0) <= 20
    and coalesce(char_length(aircraft_type), 0) <= 60
    and coalesce(char_length(from_airport), 0) <= 10
    and coalesce(char_length(to_airport), 0) <= 10
    and coalesce(char_length(remarks), 0) <= 1000
  );

alter table public.licenses_held
  add constraint licenses_held_textos_largo check (
    coalesce(char_length(custom_name), 0) <= 120
    and coalesce(char_length(notes), 0) <= 1000
    and coalesce(char_length(document_url), 0) <= 1000
  ),
  add constraint licenses_held_fechas check (
    issued_date is null or expires_date is null or expires_date >= issued_date
  );


-- ─── Consulta de control ────────────────────────────────────────────────────
-- select
--   has_column_privilege('authenticated', 'public.profiles', 'referral_code', 'UPDATE') as referido,        -- false
--   has_column_privilege('authenticated', 'public.profiles', 'full_name', 'UPDATE')     as nombre,          -- true
--   has_table_privilege('authenticated', 'public.notifications', 'UPDATE')              as notificaciones,  -- false
--   has_table_privilege('authenticated', 'public.quiz_attempts', 'INSERT')              as heredada,        -- false
--   (select count(*) from pg_policies where tablename = 'exam_reports' and qual = 'true') as reportes_abiertos; -- 0
