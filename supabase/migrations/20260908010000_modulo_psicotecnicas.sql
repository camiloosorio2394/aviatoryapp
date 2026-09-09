-- ============================================================================
-- Módulo de pruebas psicotécnicas
--
-- Entra como tema de Ingreso a aerolínea, al lado de NOTAM, Meteorología y
-- Mercancías peligrosas: razonamiento abstracto, espacial y numérico, con
-- ejercicios cronometrados en tres modos y tres niveles.
--
-- Lo que hay que persistir es el marcador de cada tanda, no las respuestas: el
-- banco se sortea distinto en cada intento, así que un answers[] no sería
-- comparable entre intentos. Es la misma decisión que se tomó para el simulacro
-- de entrevista técnica en 20260801040000.
--
-- Y como allí, las tres piezas van juntas: tabla, logro CON su condición dentro
-- de check_and_unlock_achievements, y disparador. Separarlas es lo que dejó
-- metar_master inerte en su día.
-- ============================================================================

-- ─── La tabla ───────────────────────────────────────────────────────────────
-- Una fila por tanda terminada, de cualquiera de los tres modos. `modo`,
-- `categoria` y `nivel` viajan como texto con check en vez de como enum: los
-- filtros de la pantalla incluyen 'todas' y 'todos', que no son valores del
-- dominio sino la ausencia de filtro, y un enum obligaría a inventarlos.
create table if not exists public.user_psico_attempts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  modo        text not null check (modo in ('entrenamiento', 'evaluacion', 'simulacion')),
  categoria   text not null check (categoria in ('abstracto', 'espacial', 'numerico', 'todas')),
  nivel       text not null check (nivel in ('basico', 'intermedio', 'avanzado', 'todos')),
  total       int  not null check (total >= 0),
  correctas   int  not null default 0 check (correctas >= 0),
  -- Precisión: porcentaje de acierto sobre el total de la tanda.
  score       int  not null check (score between 0 and 100),
  -- Velocidad: cuánto del tiempo disponible sobró, en promedio.
  velocidad   int  not null default 0 check (velocidad between 0 and 100),
  -- Global: 70% precisión, 30% velocidad. Es el número del simulacro.
  global      int  not null default 0 check (global between 0 and 100),
  taken_at    timestamptz not null default now(),
  constraint psico_correctas_cabe check (correctas <= total)
);

comment on table public.user_psico_attempts is
  'Tandas terminadas del módulo de pruebas psicotécnicas (Ingreso a aerolínea). Una fila por sesión; el detalle de respuestas no se guarda porque cada tanda se sortea distinta.';

create index if not exists idx_psico_user_modo_global
  on public.user_psico_attempts (user_id, modo, global desc);

alter table public.user_psico_attempts enable row level security;

drop policy if exists "psico_select_own" on public.user_psico_attempts;
create policy "psico_select_own" on public.user_psico_attempts
  for select using (auth.uid() = user_id);

drop policy if exists "psico_insert_own" on public.user_psico_attempts;
create policy "psico_insert_own" on public.user_psico_attempts
  for insert with check (auth.uid() = user_id);

-- ─── El logro ───────────────────────────────────────────────────────────────
-- 80 sobre 100 en el simulacro completo. Va cinco puntos por debajo del
-- simulacro de entrevista técnica a propósito: aquí el global ya castiga la
-- lentitud aparte del acierto, así que exigir 85 sería exigir dos cosas a la vez.
insert into public.module_thresholds (code, total, nota) values
  ('psico_simulacro_pass', 80, 'Umbral del Simulacro Psicotécnico; el global pesa 70% precisión y 30% velocidad')
on conflict (code) do update set total = excluded.total, nota = excluded.nota;

insert into public.achievements (code, name, description, icon, tier, order_index) values
  ('psico_simulacro', 'Psicotécnicas superadas', 'Aprobaste el Simulacro Psicotécnico de 30 ejercicios', '🧠', 'gold', 18)
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon,
  tier = excluded.tier,
  order_index = excluded.order_index;

-- ─── La función ─────────────────────────────────────────────────────────────
-- Se recrea entera sobre la versión de 20260801040000, sumando la rama del
-- simulacro psicotécnico. Nada de lo anterior cambia.
create or replace function public.check_and_unlock_achievements(p_user_id uuid)
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_new int := 0;
  v_total_questions int;
  v_streak int;
  v_message_count int;
  v_has_stage bool;
  v_icao int;
  v_plan text;
  v_quiz_done bool;
  v_subject_master_count int;
  v_notam_lesson int;
  v_notam_practice int;
  v_notam_passed bool;
  v_metar_lesson int;
  v_metar_practice int;
  v_metar_passed bool;
  v_mock_passed bool;
  v_psico_passed bool;
  v_t_notam_lesson int;
  v_t_notam_practice int;
  v_t_metar_lesson int;
  v_t_metar_practice int;
  v_t_mock_pass int;
  v_t_psico_pass int;
begin
  if p_user_id is null then return 0; end if;

  select coalesce(sum(preguntas), 0)::int, count(*) > 0
    into v_total_questions, v_quiz_done
    from (
      select coalesce(array_length(question_ids, 1), 0) as preguntas
        from public.vault_sessions
        where user_id = p_user_id and completed_at is not null
      union all
      select coalesce(total_questions, 0) as preguntas
        from public.quiz_attempts
        where user_id = p_user_id and finished_at is not null
    ) as intentos;

  select coalesce(current_streak, 0)
    into v_streak
    from public.streaks where user_id = p_user_id;

  select count(*)::int into v_message_count
    from public.community_messages where user_id = p_user_id;

  select (stage is not null), coalesce(icao_english_level, 0)
    into v_has_stage, v_icao
    from public.pilot_state where user_id = p_user_id;

  select plan::text into v_plan
    from public.subscriptions
    where user_id = p_user_id
    order by created_at desc
    limit 1;

  with last5 as (
    select subject_slug,
           case
             when coalesce(array_length(question_ids, 1), 0) = 0 then 0
             else round(coalesce(correct_count, 0)::numeric * 100
                        / array_length(question_ids, 1))
           end as score
    from public.vault_sessions
    where user_id = p_user_id
      and completed_at is not null
      and subject_slug is not null
    order by completed_at desc
    limit 5
  )
  select count(*)::int into v_subject_master_count
  from last5
  where score >= 80
    and subject_slug = (select subject_slug from last5 limit 1);

  select total into v_t_notam_lesson   from public.module_thresholds where code = 'notam_lesson';
  select total into v_t_notam_practice from public.module_thresholds where code = 'notam_practice';
  select total into v_t_metar_lesson   from public.module_thresholds where code = 'metar_lesson';
  select total into v_t_metar_practice from public.module_thresholds where code = 'metar_practice';
  select total into v_t_mock_pass      from public.module_thresholds where code = 'airline_mock_pass';
  select total into v_t_psico_pass     from public.module_thresholds where code = 'psico_simulacro_pass';

  select coalesce(array_length(lesson_screens, 1), 0),
         coalesce(array_length(practice_done, 1), 0)
    into v_notam_lesson, v_notam_practice
    from public.user_notam_progress where user_id = p_user_id;

  select coalesce(array_length(lesson_screens, 1), 0),
         coalesce(array_length(practice_done, 1), 0)
    into v_metar_lesson, v_metar_practice
    from public.user_metar_progress where user_id = p_user_id;

  select exists(
    select 1 from public.user_notam_exam_attempts
    where user_id = p_user_id and coalesce(score, 0) >= 80
  ) into v_notam_passed;

  select exists(
    select 1 from public.user_metar_exam_attempts
    where user_id = p_user_id and coalesce(score, 0) >= 80
  ) into v_metar_passed;

  select exists(
    select 1 from public.user_airline_mock_attempts
    where user_id = p_user_id and coalesce(score, 0) >= coalesce(v_t_mock_pass, 85)
  ) into v_mock_passed;

  -- Solo el simulacro cuenta para el logro: una tanda de entrenamiento de diez
  -- ejercicios filtrada por la familia que mejor se te da no prueba nada.
  select exists(
    select 1 from public.user_psico_attempts
    where user_id = p_user_id
      and modo = 'simulacion'
      and coalesce(global, 0) >= coalesce(v_t_psico_pass, 80)
  ) into v_psico_passed;

  if v_has_stage then
    v_new := v_new + public._try_unlock(p_user_id, 'first_step');
  end if;
  if v_quiz_done then
    v_new := v_new + public._try_unlock(p_user_id, 'first_quiz');
  end if;
  if v_streak >= 3  then v_new := v_new + public._try_unlock(p_user_id, 'streak_3');  end if;
  if v_streak >= 7  then v_new := v_new + public._try_unlock(p_user_id, 'streak_7');  end if;
  if v_streak >= 30 then v_new := v_new + public._try_unlock(p_user_id, 'streak_30'); end if;
  if v_total_questions >= 100 then v_new := v_new + public._try_unlock(p_user_id, 'first_100'); end if;
  if v_message_count >= 1 then v_new := v_new + public._try_unlock(p_user_id, 'community_hello'); end if;
  if v_icao >= 4 then v_new := v_new + public._try_unlock(p_user_id, 'icao_climb'); end if;
  if v_plan = 'founder_lifetime' then v_new := v_new + public._try_unlock(p_user_id, 'founder_badge'); end if;
  if v_subject_master_count = 5 then v_new := v_new + public._try_unlock(p_user_id, 'subject_master'); end if;

  if coalesce(v_notam_lesson, 0) >= coalesce(v_t_notam_lesson, 13) then
    v_new := v_new + public._try_unlock(p_user_id, 'notam_lesson');
  end if;
  if coalesce(v_notam_practice, 0) >= coalesce(v_t_notam_practice, 40) then
    v_new := v_new + public._try_unlock(p_user_id, 'notam_practice');
  end if;
  if v_notam_passed then
    v_new := v_new + public._try_unlock(p_user_id, 'notam_exam');
  end if;
  if coalesce(v_metar_lesson, 0) >= coalesce(v_t_metar_lesson, 9) then
    v_new := v_new + public._try_unlock(p_user_id, 'metar_lesson');
  end if;
  if coalesce(v_notam_lesson, 0) >= coalesce(v_t_notam_lesson, 13)
     and coalesce(v_notam_practice, 0) >= coalesce(v_t_notam_practice, 40)
     and v_notam_passed then
    v_new := v_new + public._try_unlock(p_user_id, 'notam_master');
  end if;
  if coalesce(v_metar_lesson, 0) >= coalesce(v_t_metar_lesson, 9)
     and coalesce(v_metar_practice, 0) >= coalesce(v_t_metar_practice, 10)
     and v_metar_passed then
    v_new := v_new + public._try_unlock(p_user_id, 'metar_master');
  end if;
  if v_mock_passed then
    v_new := v_new + public._try_unlock(p_user_id, 'airline_mock_passed');
  end if;
  if v_psico_passed then
    v_new := v_new + public._try_unlock(p_user_id, 'psico_simulacro');
  end if;

  return v_new;
end;
$$;

-- Trampa de Postgres: `create or replace function` devuelve EXECUTE a PUBLIC.
revoke all on function public.check_and_unlock_achievements(uuid) from public, anon;
grant execute on function public.check_and_unlock_achievements(uuid) to authenticated;

-- ─── El disparador ──────────────────────────────────────────────────────────
drop trigger if exists trg_check_achievements_psico on public.user_psico_attempts;
create trigger trg_check_achievements_psico
  after insert or update on public.user_psico_attempts
  for each row
  execute function public.trigger_check_achievements();
