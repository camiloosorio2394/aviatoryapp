-- =============================================================================
-- LOS AVISOS QUE LA BASE PROMETÍA Y NADIE ESCRIBÍA
-- =============================================================================
--
-- `notification_type` tiene seis valores desde mayo y el cliente los tipa todos,
-- pero solo dos se escriben: `achievement` y `expiry_warning`. `streak_at_risk`
-- y `milestone_close` estaban declarados y secos.
--
-- Y el de vencimientos, que es el más útil de todos porque las fechas son
-- reales, solo corre `check_my_expiries()` cuando el piloto abre el panel. O
-- sea: al que dejó de entrar, que es justo a quien hay que avisarle, no le
-- llega nunca. Aquí quedan las versiones que corren solas; la migración
-- siguiente las agenda.
--
-- Todas viven en `private`: nadie las llama desde el cliente, ni con sesión.
-- El único camino desde el navegador sigue siendo `check_my_expiries()`.
--
-- OJO AL APLICAR: esta migración usa 'plan_reminder', que agrega la migración
-- anterior. Córrelas en dos ejecuciones distintas del editor SQL; en la misma
-- transacción, Postgres no deja usar un valor de enum recién agregado.

-- ─── El cuerpo de los avisos de vencimiento, una sola vez ───────────────────
-- Estaba escrito dentro de check_my_expiries(). Se saca a una función con el
-- piloto por parámetro para que la versión de todos y la de uno no sean dos
-- copias de la misma regla, que es como empiezan a divergir.

create or replace function private.crear_avisos_de_vencimiento(p_user_id uuid)
returns int
language plpgsql
security definer
set search_path = ''
as $vencimientos$
declare
  v_today date;
  v_created int := 0;
  r record;
  v_days_left int;
  v_label text;
  v_already_today bool;
begin
  if p_user_id is null then return 0; end if;

  v_today := (now() at time zone 'America/Bogota')::date;

  for r in
    select id, license_type, custom_name, expires_date
    from public.licenses_held
    where user_id = p_user_id
      and expires_date is not null
      and expires_date >= v_today
      and expires_date <= v_today + interval '30 days'
  loop
    v_days_left := (r.expires_date - v_today);

    -- Solo en los hitos exactos (30/15/7/1).
    if v_days_left not in (30, 15, 7, 1) then
      continue;
    end if;

    select exists (
      select 1 from public.notifications
      where user_id = p_user_id
        and type = 'expiry_warning'
        and action_url = '/app/vencimientos'
        and body like '%' || r.id::text || '%'
        and created_at::date = v_today
    ) into v_already_today;

    if v_already_today then continue; end if;

    v_label := case r.license_type
      when 'medical_class_1' then 'Médico clase 1'
      when 'medical_class_2' then 'Médico clase 2'
      when 'medical_class_3' then 'Médico clase 3'
      when 'ppl' then 'PPL'
      when 'cpl' then 'CPL'
      when 'atpl' then 'ATPL'
      when 'ifr' then 'Habilitación IFR'
      when 'multi_engine' then 'Habilitación multi-engine'
      when 'flight_instructor' then 'Instructor de vuelo'
      when 'type_rating' then coalesce('Type Rating ' || r.custom_name, 'Type Rating')
      when 'icao_english' then 'Inglés ICAO'
      when 'recurrent_check' then 'Recurrent check'
      else coalesce(r.custom_name, 'Certificación')
    end;

    insert into public.notifications (user_id, type, title, body, icon, action_url)
    values (
      p_user_id,
      'expiry_warning',
      case
        when v_days_left = 1 then '⚠️ Vence MAÑANA'
        when v_days_left <= 7 then '⚠️ Vence en ' || v_days_left || ' días'
        else 'Vence en ' || v_days_left || ' días'
      end,
      v_label || ' vence el ' ||
        to_char(r.expires_date, 'DD/MM/YYYY') ||
        ' (id:' || r.id::text || ')',
      '📅',
      '/app/vencimientos'
    );
    v_created := v_created + 1;
  end loop;

  return v_created;
end;
$vencimientos$;

-- El camino de siempre, ahora delegando. Mismo nombre, mismo permiso, misma
-- respuesta: el panel no se entera del cambio.
create or replace function public.check_my_expiries()
returns int
language plpgsql
security definer
set search_path = ''
as $mios$
declare
  v_user_id uuid;
begin
  v_user_id := auth.uid();
  if v_user_id is null then return 0; end if;
  return private.crear_avisos_de_vencimiento(v_user_id);
end;
$mios$;

grant execute on function public.check_my_expiries() to authenticated;

-- ─── Vencimientos de todos, sin que nadie abra la app ───────────────────────

create or replace function private.avisar_vencimientos_de_todos()
returns int
language plpgsql
security definer
set search_path = ''
as $todos$
declare
  v_today date;
  v_total int := 0;
  r record;
begin
  v_today := (now() at time zone 'America/Bogota')::date;

  -- Solo los pilotos con algo por vencer en la ventana: no se recorre la tabla
  -- de usuarios entera todas las noches.
  for r in
    select distinct user_id
    from public.licenses_held
    where expires_date is not null
      and expires_date >= v_today
      and expires_date <= v_today + interval '30 days'
  loop
    v_total := v_total + private.crear_avisos_de_vencimiento(r.user_id);
  end loop;

  return v_total;
end;
$todos$;

-- ─── La racha en riesgo ─────────────────────────────────────────────────────
-- Desde tres días: antes de eso no hay nada que proteger y el aviso sería ruido.

create or replace function private.avisar_racha_en_riesgo()
returns int
language plpgsql
security definer
set search_path = ''
as $racha$
declare
  v_today date;
  v_total int := 0;
  r record;
begin
  v_today := (now() at time zone 'America/Bogota')::date;

  for r in
    select s.user_id, s.current_streak
    from public.streaks s
    where s.current_streak >= 3
      and (s.last_activity_date is null or s.last_activity_date < v_today)
      and not exists (
        select 1 from public.notifications n
        where n.user_id = s.user_id
          and n.type = 'streak_at_risk'
          and n.created_at::date = v_today
      )
  loop
    insert into public.notifications (user_id, type, title, body, icon, action_url)
    values (
      r.user_id,
      'streak_at_risk',
      'Tu racha de ' || r.current_streak || ' días',
      'Hoy no has estudiado. Diez minutos la mantienen viva.',
      '🔥',
      '/app'
    );
    v_total := v_total + 1;
  end loop;

  return v_total;
end;
$racha$;

-- ─── El recordatorio del plan ───────────────────────────────────────────────
-- Corre cada hora y manda solo a quien puso ESTE día y ESTA hora. El día y la
-- hora salen de la zona del piloto; «si ya estudió hoy» se mide contra el día
-- de Bogotá, que es con el que la base cierra la racha.

create or replace function private.recordar_plan_de_estudio()
returns int
language plpgsql
security definer
set search_path = ''
as $plan$
declare
  v_hoy_bogota date;
  v_total int := 0;
  v_dia text;
  r record;
  c_dias constant text[] := array['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
begin
  v_hoy_bogota := (now() at time zone 'America/Bogota')::date;

  for r in
    select p.user_id, p.hora, p.minutos_meta,
           extract(dow from (now() at time zone p.zona))::int as dow
    from public.plan_de_estudio p
    left join public.streaks s on s.user_id = p.user_id
    where extract(dow from (now() at time zone p.zona))::smallint = any(p.dias)
      and extract(hour from (now() at time zone p.zona))::int = extract(hour from p.hora)::int
      and (s.last_activity_date is null or s.last_activity_date < v_hoy_bogota)
      and not exists (
        select 1 from public.notifications n
        where n.user_id = p.user_id
          and n.type = 'plan_reminder'
          and n.created_at::date = v_hoy_bogota
      )
  loop
    v_dia := c_dias[r.dow + 1];
    insert into public.notifications (user_id, type, title, body, icon, action_url)
    values (
      r.user_id,
      'plan_reminder',
      'Hoy es día de estudio',
      'Te lo pusiste tú: ' || v_dia || ' a las ' || to_char(r.hora, 'HH24:MI') ||
        '. Son ' || r.minutos_meta || ' minutos.',
      '🎯',
      '/app'
    );
    v_total := v_total + 1;
  end loop;

  return v_total;
end;
$plan$;

-- ─── La meta que ya está cerca ──────────────────────────────────────────────
-- El empujón más fuerte no es «llevas el 40% del curso», que no es de nadie:
-- es «te faltan 45 h para el mínimo de Wingo», que tiene nombre de aerolínea.
--
-- Solo a quien registró un vuelo hace poco: así es un premio por anotar, y no
-- un recordatorio mensual de lo lejos que está. Y una vez por aerolínea cada
-- 30 días, para que no se vuelva ruido.

create or replace function private.avisar_meta_de_horas_cerca()
returns int
language plpgsql
security definer
set search_path = ''
as $meta$
declare
  v_today date;
  v_total int := 0;
  r record;
  -- A cuántas horas del mínimo se considera «cerca». Es la distancia que un
  -- piloto que vuela seguido cubre en pocas semanas.
  c_margen constant numeric := 50;
  -- Cuánto hace que voló para que el aviso sea consecuencia de anotar.
  c_dias_desde_el_vuelo constant int := 7;
begin
  v_today := (now() at time zone 'America/Bogota')::date;

  for r in
    select distinct on (ps.user_id)
           ps.user_id,
           ps.total_hours,
           a.name as aerolinea,
           (a.requirements->>'min_hours_total')::numeric - ps.total_hours as faltan
    from public.pilot_state ps
    join public.airlines a
      on a.requirements ? 'min_hours_total'
     and (a.requirements->>'min_hours_total')::numeric > ps.total_hours
     and (a.requirements->>'min_hours_total')::numeric - ps.total_hours <= c_margen
    where ps.total_hours is not null
      and exists (
        select 1 from public.flights f
        where f.user_id = ps.user_id
          and f.flight_date >= v_today - c_dias_desde_el_vuelo
      )
      and not exists (
        select 1 from public.notifications n
        where n.user_id = ps.user_id
          and n.type = 'milestone_close'
          and n.body like '%' || a.name || '%'
          and n.created_at >= now() - interval '30 days'
      )
    order by ps.user_id, faltan
  loop
    insert into public.notifications (user_id, type, title, body, icon, action_url)
    values (
      r.user_id,
      'milestone_close',
      'Te faltan ' || to_char(r.faltan, 'FM999990.0') || ' h para ' || r.aerolinea,
      'Con ' || to_char(r.total_hours, 'FM999990.0') || ' h de carrera ya estás a ' ||
        to_char(r.faltan, 'FM999990.0') || ' h del mínimo de ' || r.aerolinea || '.',
      '✈️',
      '/app/match'
    );
    v_total := v_total + 1;
  end loop;

  return v_total;
end;
$meta$;

-- Ninguna de las de `private` se concede a nadie: las llama el agendador.
