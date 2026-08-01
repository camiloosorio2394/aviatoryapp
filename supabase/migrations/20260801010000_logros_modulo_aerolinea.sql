-- ============================================================================
-- Logros: arreglo de integridad + los del módulo Ingreso a aerolínea
--
-- Dos cosas en una migración, porque tocan la misma función.
--
-- 1) ARREGLO DE INTEGRIDAD (hallazgo C6 de la auditoría del 1 ago 2026).
--    check_and_unlock_achievements calculaba first_quiz, first_100 y
--    subject_master leyendo public.quiz_attempts. Esa tabla es del sistema
--    anterior al vault: NINGUNA línea de la aplicación la escribe desde la
--    migración. Resultado: los tres logros eran imposibles de desbloquear para
--    cualquier usuario nuevo, y el sistema de recompensas aparentaba funcionar
--    estando detenido. Se repunta a public.vault_sessions, que es donde escribe
--    el quiz actual.
--
--    Es el mismo error que tenía get_subject_mastery antes del 31 jul: lógica
--    nueva apuntando a tablas legadas.
--
-- 2) LOGROS DEL MÓDULO (hallazgo C3). Terminar el tema NOTAM entero (lección,
--    práctica y evaluación aprobada) no desbloqueaba absolutamente nada.
--
-- Nada de esto borra datos: los logros ya desbloqueados siguen desbloqueados,
-- porque _try_unlock inserta con on conflict do nothing.
-- ============================================================================

-- ─── Umbrales de contenido ──────────────────────────────────────────────────
-- El contenido del módulo vive en TypeScript y crece con cada tanda. Si el
-- umbral se escribe a mano dentro de la función, el día que la lección pase de
-- 13 a 14 secciones el logro se otorga antes de tiempo y nadie se entera: es
-- exactamente la clase de desincronización que arregla el punto 1.
-- Con esta tabla el acoplamiento queda en un solo sitio y a la vista.
create table if not exists public.module_thresholds (
  code  text primary key,
  total int  not null check (total > 0),
  nota  text
);

comment on table public.module_thresholds is
  'Cuántas piezas tiene cada parte del módulo. Debe seguir a las constantes de src/lib (LESSON_TOTAL, NOTAM_PRACTICE_TOTAL, METAR_LESSON_TOTAL).';

alter table public.module_thresholds enable row level security;

drop policy if exists "module_thresholds_read" on public.module_thresholds;
create policy "module_thresholds_read" on public.module_thresholds
  for select using (true);

insert into public.module_thresholds (code, total, nota) values
  ('notam_lesson',   13, 'LESSON_TOTAL de src/lib/notamLesson.ts'),
  ('notam_practice', 40, 'NOTAM_PRACTICE_TOTAL de src/lib/notam.ts (16 ejercicios + 24 NOTAM reales)'),
  ('metar_lesson',    9, 'METAR_LESSON_TOTAL de src/lib/metarLesson.ts')
on conflict (code) do update set total = excluded.total, nota = excluded.nota;

-- ─── Logros nuevos ──────────────────────────────────────────────────────────
insert into public.achievements (code, name, description, icon, tier, order_index) values
  ('notam_lesson',   'NOTAM leído',          'Leíste la lección de NOTAM completa',                  '📖', 'bronze', 11),
  ('notam_practice', 'NOTAM practicado',     'Resolviste toda la práctica de NOTAM',                 '🎯', 'silver', 12),
  ('notam_exam',     'NOTAM aprobado',       'Aprobaste la evaluación de NOTAM',                     '✅', 'silver', 13),
  ('metar_lesson',   'METAR leído',          'Leíste la lección de METAR completa',                  '🌤️', 'bronze', 14),
  ('notam_master',   'NOTAM dominado',       'Terminaste el tema entero: lección, práctica y evaluación', '🏆', 'gold', 15)
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon,
  tier = excluded.tier,
  order_index = excluded.order_index;

-- ─── La función ─────────────────────────────────────────────────────────────
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
  -- Módulo Ingreso a aerolínea
  v_notam_lesson int;
  v_notam_practice int;
  v_notam_passed bool;
  v_metar_lesson int;
  v_t_notam_lesson int;
  v_t_notam_practice int;
  v_t_metar_lesson int;
begin
  if p_user_id is null then return 0; end if;

  -- Preguntas respondidas y "hizo al menos un quiz": ahora desde vault_sessions,
  -- que es donde escribe VaultQuizPlayer. question_ids es el array de preguntas
  -- servidas en la sesión, así que su longitud es el total de esa sesión.
  select coalesce(sum(coalesce(array_length(question_ids, 1), 0)), 0)::int,
         count(*) > 0
    into v_total_questions, v_quiz_done
    from public.vault_sessions
    where user_id = p_user_id and completed_at is not null;

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

  -- subject_master: las 5 últimas sesiones completadas son de la misma materia
  -- y todas con 80 o más sobre 100. El puntaje se calcula, porque vault_sessions
  -- guarda aciertos y preguntas, no la nota.
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

  -- ── Módulo Ingreso a aerolínea ──
  select total into v_t_notam_lesson   from public.module_thresholds where code = 'notam_lesson';
  select total into v_t_notam_practice from public.module_thresholds where code = 'notam_practice';
  select total into v_t_metar_lesson   from public.module_thresholds where code = 'metar_lesson';

  select coalesce(array_length(lesson_screens, 1), 0),
         coalesce(array_length(practice_done, 1), 0)
    into v_notam_lesson, v_notam_practice
    from public.user_notam_progress where user_id = p_user_id;

  select coalesce(array_length(lesson_screens, 1), 0)
    into v_metar_lesson
    from public.user_metar_progress where user_id = p_user_id;

  select exists(
    select 1 from public.user_notam_exam_attempts
    where user_id = p_user_id and coalesce(score, 0) >= 80
  ) into v_notam_passed;

  -- ── Otorgar (idempotente) ──
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

  if coalesce(v_notam_lesson, 0)   >= coalesce(v_t_notam_lesson, 13) then
    v_new := v_new + public._try_unlock(p_user_id, 'notam_lesson');
  end if;
  if coalesce(v_notam_practice, 0) >= coalesce(v_t_notam_practice, 40) then
    v_new := v_new + public._try_unlock(p_user_id, 'notam_practice');
  end if;
  if v_notam_passed then
    v_new := v_new + public._try_unlock(p_user_id, 'notam_exam');
  end if;
  if coalesce(v_metar_lesson, 0)   >= coalesce(v_t_metar_lesson, 9) then
    v_new := v_new + public._try_unlock(p_user_id, 'metar_lesson');
  end if;
  -- El de tema entero exige las tres partes, no solo haber entrado.
  if coalesce(v_notam_lesson, 0)   >= coalesce(v_t_notam_lesson, 13)
     and coalesce(v_notam_practice, 0) >= coalesce(v_t_notam_practice, 40)
     and v_notam_passed then
    v_new := v_new + public._try_unlock(p_user_id, 'notam_master');
  end if;

  return v_new;
end;
$$;

grant execute on function public.check_and_unlock_achievements(uuid) to authenticated;

-- ─── Disparadores del módulo ────────────────────────────────────────────────
-- Sin esto los logros nuevos existirían y no se otorgarían nunca: la función
-- solo corre cuando algo la dispara.

drop trigger if exists trg_check_achievements_notam on public.user_notam_progress;
create trigger trg_check_achievements_notam
  after insert or update on public.user_notam_progress
  for each row
  execute function public.trigger_check_achievements();

drop trigger if exists trg_check_achievements_metar on public.user_metar_progress;
create trigger trg_check_achievements_metar
  after insert or update on public.user_metar_progress
  for each row
  execute function public.trigger_check_achievements();

drop trigger if exists trg_check_achievements_notam_exam on public.user_notam_exam_attempts;
create trigger trg_check_achievements_notam_exam
  after insert or update on public.user_notam_exam_attempts
  for each row
  execute function public.trigger_check_achievements();

-- El quiz actual escribe en vault_sessions: sin disparador aquí, first_quiz y
-- first_100 solo se otorgarían de rebote cuando otra tabla mueva la función.
drop trigger if exists trg_check_achievements_vault on public.vault_sessions;
create trigger trg_check_achievements_vault
  after insert or update of completed_at on public.vault_sessions
  for each row
  when (NEW.completed_at is not null)
  execute function public.trigger_check_achievements();

-- El disparador viejo sobre quiz_attempts se queda: la tabla ya no se escribe,
-- así que no cuesta nada, y si algún día se reactiva sigue funcionando.
