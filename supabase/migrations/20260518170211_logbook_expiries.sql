-- AviatorYapp — Logbook digital + Licencias con vencimientos
--
-- 1) Tabla flights: cada vuelo registrado por el piloto
-- 2) Trigger: recalcula pilot_state.total_hours + hours_pic al insert/update/delete
-- 3) Tabla licenses_held: licencias y certificaciones con vencimientos
-- 4) Función check_my_expiries(): crea notifs faltantes cuando vencimiento <= 30/15/7/1 días

-- =============================================================================
-- ENUM: license_type
-- =============================================================================

create type public.license_type as enum (
  'medical_class_1',
  'medical_class_2',
  'medical_class_3',
  'ppl',
  'cpl',
  'atpl',
  'ifr',
  'multi_engine',
  'flight_instructor',
  'type_rating',
  'icao_english',
  'recurrent_check',
  'other'
);

-- =============================================================================
-- TABLE: flights — logbook digital
-- =============================================================================

create table public.flights (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  flight_date date not null,
  aircraft_registration text,         -- ej HK-1234
  aircraft_type text,                  -- ej C172, PA28, A320
  from_airport text,                   -- ICAO 4 letters, ej SKBO
  to_airport text,                     -- ej SKMD
  total_minutes int not null check (total_minutes >= 0),
  pic_minutes int not null default 0 check (pic_minutes >= 0),
  sic_minutes int not null default 0 check (sic_minutes >= 0),
  dual_minutes int not null default 0 check (dual_minutes >= 0),
  instrument_real_minutes int not null default 0 check (instrument_real_minutes >= 0),
  instrument_sim_minutes int not null default 0 check (instrument_sim_minutes >= 0),
  night_minutes int not null default 0 check (night_minutes >= 0),
  cross_country_minutes int not null default 0 check (cross_country_minutes >= 0),
  landings_day int not null default 0 check (landings_day >= 0),
  landings_night int not null default 0 check (landings_night >= 0),
  remarks text,
  created_at timestamptz not null default now()
);

create index flights_user_date_idx on public.flights(user_id, flight_date desc);

alter table public.flights enable row level security;

create policy "flights_select_own"
  on public.flights for select
  using (auth.uid() = user_id);

create policy "flights_insert_own"
  on public.flights for insert
  with check (auth.uid() = user_id);

create policy "flights_update_own"
  on public.flights for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "flights_delete_own"
  on public.flights for delete
  using (auth.uid() = user_id);

-- =============================================================================
-- TRIGGER: recalcular pilot_state.total_hours + hours_pic al cambiar flights
-- =============================================================================

create or replace function public.recalc_pilot_hours(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_total_min int;
  v_pic_min int;
begin
  select
    coalesce(sum(total_minutes), 0),
    coalesce(sum(pic_minutes), 0)
  into v_total_min, v_pic_min
  from public.flights
  where user_id = p_user_id;

  update public.pilot_state
  set
    total_hours = round((v_total_min / 60.0)::numeric, 1),
    hours_pic = round((v_pic_min / 60.0)::numeric, 1),
    updated_at = now()
  where user_id = p_user_id;
end;
$$;

create or replace function public.trigger_recalc_pilot_hours()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if TG_OP = 'DELETE' then
    perform public.recalc_pilot_hours(OLD.user_id);
    return OLD;
  else
    perform public.recalc_pilot_hours(NEW.user_id);
    return NEW;
  end if;
end;
$$;

drop trigger if exists trg_recalc_hours on public.flights;
create trigger trg_recalc_hours
  after insert or update or delete on public.flights
  for each row
  execute function public.trigger_recalc_pilot_hours();

-- =============================================================================
-- TABLE: licenses_held — licencias y certificaciones con vencimientos
-- =============================================================================

create table public.licenses_held (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  license_type public.license_type not null,
  custom_name text,                         -- útil cuando type = 'other' o 'type_rating'
  issued_date date,
  expires_date date,
  document_url text,
  notes text,
  created_at timestamptz not null default now()
);

create index licenses_held_user_idx on public.licenses_held(user_id);
create index licenses_held_expires_idx on public.licenses_held(expires_date) where expires_date is not null;

alter table public.licenses_held enable row level security;

create policy "licenses_select_own"
  on public.licenses_held for select
  using (auth.uid() = user_id);

create policy "licenses_insert_own"
  on public.licenses_held for insert
  with check (auth.uid() = user_id);

create policy "licenses_update_own"
  on public.licenses_held for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "licenses_delete_own"
  on public.licenses_held for delete
  using (auth.uid() = user_id);

-- =============================================================================
-- FUNCTION: check_my_expiries — crea notifs idempotentes
-- Se llama on-demand desde el dashboard (no requiere cron).
-- Crea notif tipo 'expiry_warning' por cada license que venza en
-- 30/15/7/1 días, si no existe ya una notif igual hoy.
-- =============================================================================

create or replace function public.check_my_expiries()
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
  v_today date;
  v_created int := 0;
  r record;
  v_days_left int;
  v_label text;
  v_already_today bool;
begin
  v_user_id := auth.uid();
  if v_user_id is null then return 0; end if;

  v_today := (now() at time zone 'America/Bogota')::date;

  for r in
    select id, license_type, custom_name, expires_date
    from public.licenses_held
    where user_id = v_user_id
      and expires_date is not null
      and expires_date >= v_today
      and expires_date <= v_today + interval '30 days'
  loop
    v_days_left := (r.expires_date - v_today);

    -- Only fire on exact thresholds (30/15/7/1)
    if v_days_left not in (30, 15, 7, 1) then
      continue;
    end if;

    -- Check if we already created a notif for this license today (idempotent)
    select exists (
      select 1 from public.notifications
      where user_id = v_user_id
        and type = 'expiry_warning'
        and action_url = '/app/vencimientos'
        and body like '%' || r.id::text || '%'
        and created_at::date = v_today
    ) into v_already_today;

    if v_already_today then continue; end if;

    -- Build human label
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
      v_user_id,
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
$$;

grant execute on function public.check_my_expiries() to authenticated;

-- =============================================================================
-- Backfill: recalc pilot_state hours para users que ya tengan flights (none yet)
-- =============================================================================

-- (no flights existentes — skip)
