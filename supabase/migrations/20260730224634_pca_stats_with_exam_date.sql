-- Se añade la fecha de examen y la materia por donde retomar.
--
-- La fecha organiza todo el estudio: no es lo mismo presentar en tres semanas
-- que en un año, y hasta ahora la app trataba los dos casos igual.
--
-- "Retomar" sale de la última sesión completada: sin ella la pantalla no puede
-- ofrecer continuar y tiene que decir por dónde empezar.
create or replace function public.pca_stats()
returns json
language plpgsql
security definer
set search_path = public
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
  from vault_questions where module = 'pca' and is_active;

  select count(distinct q) into v_answered
  from vault_sessions s, unnest(s.question_ids) as q
  where s.user_id = v_user and s.module = 'pca' and s.completed_at is not null;

  select
    coalesce(sum(s.correct_count), 0),
    count(*),
    round(avg(extract(epoch from (s.completed_at - s.started_at)) / 60)::numeric, 0)
  into v_correct, v_sessions, v_avg_minutes
  from vault_sessions s
  where s.user_id = v_user and s.module = 'pca' and s.completed_at is not null;

  select current_streak into v_streak from streaks where user_id = v_user;
  select target_date into v_target_date from pilot_state where user_id = v_user;

  -- Última materia trabajada, para poder ofrecer retomarla.
  select s.subject_slug into v_resume_slug
  from vault_sessions s
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
        from vault_sessions s, unnest(s.question_ids) as q
        where s.user_id = v_user and s.subject_slug = vq.subject_slug
          and s.completed_at is not null
      ), 0) as answered
    from vault_questions vq
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
end;
$$;

-- Postgres devuelve EXECUTE a PUBLIC en cada create or replace.
revoke all on function public.pca_stats() from public, anon;
grant execute on function public.pca_stats() to authenticated;
