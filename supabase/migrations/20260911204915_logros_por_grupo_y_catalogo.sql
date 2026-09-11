-- ============================================================================
-- Logros por grupo y contra el catálogo.
--
-- Hallazgos de la segunda auditoría:
--   - check_and_unlock_achievements corría unas 25 consultas en cada uno de 13
--     disparadores: marcar una sección leída, publicar un mensaje o terminar un
--     quiz recalculaba todos los logros del piloto, también los que ya tenía.
--   - Lecciones y prácticas se contaban con array_length (entraban claves de
--     versiones viejas del contenido) contra module_thresholds, que para NOTAM
--     quedó viejo: 13 secciones y 40 prácticas, contra 9 y 131 del contenido.
--     Desde que las marcas se validan contra el catálogo (20260911194440) nadie
--     puede tener más de 9 secciones de NOTAM: el logro de la lección no se
--     podía ganar.
--
-- Cambios:
--   1. private.desbloquear_logros(piloto, grupo): cada disparador evalúa solo
--      los logros de su tabla, y si el piloto ya los tiene todos no cuenta nada.
--   2. Lección y práctica cuentan lo que existe en modulos_contenido
--      (private.secciones_leidas, private.practicas_hechas) y la meta es el
--      catálogo completo, lo mismo que muestra la app.
--   3. check_and_unlock_achievements(piloto) evalúa todos los grupos; lo usa la
--      app para ponerse al día. Mismas reglas de acceso.
--   4. Los 13 disparadores pasan a private.trigger_logros('<grupo>').
--      trigger_check_achievements y trigger_check_achievements_pilot dejan de
--      usarse y se eliminan.
--
-- No quita logros ya ganados ni toca filas. Las filas de lección y práctica de
-- module_thresholds dejan de leerse; las de aprobación (airline_mock_pass,
-- mercancias_pass, psico_simulacro_pass) siguen igual.
-- ============================================================================

-- ─── Prácticas que existen en el catálogo ───────────────────────────────────
create or replace function private.practicas_hechas(p_user uuid, p_modulo text)
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select count(distinct p)::int
  from (
    select unnest(practice_done) as p from public.user_notam_progress where p_modulo = 'notam' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_metar_progress where p_modulo = 'metar' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_mercancias_progress where p_modulo = 'mercancias' and user_id = p_user
  ) as hechas
  where exists (
    select 1 from public.modulos_contenido c
    where c.modulo = p_modulo and hechas.p = any (c.practicas)
  )
$$;
revoke all on function private.practicas_hechas(uuid, text) from public;

-- ─── Un grupo de logros ─────────────────────────────────────────────────────
create or replace function private.desbloquear_logros(p_user uuid, p_grupo text)
returns integer
language plpgsql
security definer
set search_path = ''
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
revoke all on function private.desbloquear_logros(uuid, text) from public;

-- ─── Todos los grupos: la app se pone al día ────────────────────────────────
create or replace function public.check_and_unlock_achievements(p_user_id uuid)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_grupo text;
  v_new int := 0;
begin
  if p_user_id is null then return 0; end if;
  -- Con sesión de usuario, solo sobre sí mismo. El service role no trae
  -- auth.uid() y puede revisar a cualquiera.
  if auth.uid() is not null and p_user_id is distinct from auth.uid() then return 0; end if;

  foreach v_grupo in array array['piloto', 'quiz', 'racha', 'comunidad', 'suscripcion', 'notam', 'metar', 'aerolinea', 'mercancias'] loop
    v_new := v_new + private.desbloquear_logros(p_user_id, v_grupo);
  end loop;
  return v_new;
end
$$;
revoke all on function public.check_and_unlock_achievements(uuid) from public, anon;
grant execute on function public.check_and_unlock_achievements(uuid) to authenticated;

-- ─── Disparadores: cada tabla, su grupo ─────────────────────────────────────
create or replace function private.trigger_logros()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform private.desbloquear_logros(new.user_id, tg_argv[0]);
  return new;
end
$$;
revoke all on function private.trigger_logros() from public;

drop trigger if exists trg_check_achievements_quiz on public.quiz_attempts;
create trigger trg_check_achievements_quiz
  after insert or update of finished_at, score on public.quiz_attempts
  for each row when (new.finished_at is not null)
  execute function private.trigger_logros('quiz');

drop trigger if exists trg_check_achievements_vault on public.vault_sessions;
create trigger trg_check_achievements_vault
  after insert or update of completed_at on public.vault_sessions
  for each row when (new.completed_at is not null)
  execute function private.trigger_logros('quiz');

drop trigger if exists trg_check_achievements_streak on public.streaks;
create trigger trg_check_achievements_streak
  after update of current_streak on public.streaks
  for each row execute function private.trigger_logros('racha');

drop trigger if exists trg_check_achievements_message on public.community_messages;
create trigger trg_check_achievements_message
  after insert on public.community_messages
  for each row execute function private.trigger_logros('comunidad');

drop trigger if exists trg_check_achievements_pilot on public.pilot_state;
create trigger trg_check_achievements_pilot
  after insert or update of stage, icao_english_level on public.pilot_state
  for each row execute function private.trigger_logros('piloto');

drop trigger if exists trg_check_achievements_sub on public.subscriptions;
create trigger trg_check_achievements_sub
  after insert or update of plan on public.subscriptions
  for each row execute function private.trigger_logros('suscripcion');

drop trigger if exists trg_check_achievements_notam on public.user_notam_progress;
create trigger trg_check_achievements_notam
  after insert or update on public.user_notam_progress
  for each row execute function private.trigger_logros('notam');

drop trigger if exists trg_check_achievements_notam_exam on public.user_notam_exam_attempts;
create trigger trg_check_achievements_notam_exam
  after insert or update on public.user_notam_exam_attempts
  for each row execute function private.trigger_logros('notam');

drop trigger if exists trg_check_achievements_metar on public.user_metar_progress;
create trigger trg_check_achievements_metar
  after insert or update on public.user_metar_progress
  for each row execute function private.trigger_logros('metar');

drop trigger if exists trg_check_achievements_metar_exam on public.user_metar_exam_attempts;
create trigger trg_check_achievements_metar_exam
  after insert or update on public.user_metar_exam_attempts
  for each row execute function private.trigger_logros('metar');

drop trigger if exists trg_check_achievements_mercancias on public.user_mercancias_progress;
create trigger trg_check_achievements_mercancias
  after insert or update on public.user_mercancias_progress
  for each row execute function private.trigger_logros('mercancias');

drop trigger if exists trg_check_achievements_mercancias_exam on public.user_mercancias_exam_attempts;
create trigger trg_check_achievements_mercancias_exam
  after insert or update on public.user_mercancias_exam_attempts
  for each row execute function private.trigger_logros('mercancias');

drop trigger if exists trg_check_achievements_airline_mock on public.user_airline_mock_attempts;
create trigger trg_check_achievements_airline_mock
  after insert or update on public.user_airline_mock_attempts
  for each row execute function private.trigger_logros('aerolinea');

drop function if exists public.trigger_check_achievements();
drop function if exists public.trigger_check_achievements_pilot();
