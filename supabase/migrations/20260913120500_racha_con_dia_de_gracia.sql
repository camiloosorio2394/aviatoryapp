-- =============================================================================
-- LA RACHA SOBREVIVE A UN DÍA POR MES
-- =============================================================================
--
-- Hasta hoy, faltar un día mandaba la racha a cero. Ese es justo el punto
-- donde la gente suelta: perdida la racha, el día siguiente ya no cuesta nada
-- no volver. Un día recuperable al mes no regala constancia (hay que volver
-- para usarlo) y quita el momento en que abandonar sale gratis.
--
-- El día que no estudió NO suma: la gracia solo evita que la racha se rompa.
-- Y se gasta: una por mes calendario, y la siguiente ausencia sí la rompe.

alter table public.streaks
  add column if not exists gracia_usada_en date;

comment on column public.streaks.gracia_usada_en is
  'Último día en que la racha sobrevivió a una ausencia. Una gracia por mes calendario.';

create or replace function public.increment_streak()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
  v_last date;
  v_current int;
  v_gracia date;
  v_today date;
  v_usa_gracia boolean := false;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise exception 'auth required';
  end if;

  v_today := (now() at time zone 'America/Bogota')::date;

  select last_activity_date, current_streak, gracia_usada_en
    into v_last, v_current, v_gracia
    from public.streaks
    where user_id = v_user_id
    for update;

  if v_last = v_today then
    -- already counted today
    return;
  end if;

  if v_last = v_today - 1 then
    v_current := v_current + 1;
  elsif v_last = v_today - 2
        and coalesce(v_current, 0) > 0
        and (v_gracia is null
             or date_trunc('month', v_gracia::timestamp)
                <> date_trunc('month', v_today::timestamp)) then
    -- Faltó exactamente un día y le quedaba la gracia del mes. La racha sigue
    -- viva y hoy suma; el día que faltó no suma, solo deja de romperla.
    v_current := v_current + 1;
    v_usa_gracia := true;
  else
    v_current := 1;
  end if;

  update public.streaks
    set current_streak = v_current,
        longest_streak = greatest(longest_streak, v_current),
        last_activity_date = v_today,
        gracia_usada_en = case when v_usa_gracia then v_today else gracia_usada_en end,
        updated_at = now()
    where user_id = v_user_id;
end;
$$;

grant execute on function public.increment_streak() to authenticated;
