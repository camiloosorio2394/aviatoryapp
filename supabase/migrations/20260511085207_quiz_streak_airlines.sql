-- AviatorYapp — second migration
-- Adds: answer_options, streaks, quiz_attempts, quiz_attempt_answers,
--       airlines, airline_targets
-- Updates: handle_new_user trigger to also create a streak row
-- Adds: increment_streak() function (idempotent daily activity)
-- Seed:  6 LATAM airlines + 1 example question with 4 options (template for Camilo)

-- =============================================================================
-- TABLE: answer_options
-- =============================================================================

create table public.answer_options (
  id bigserial primary key,
  question_id bigint not null references public.questions(id) on delete cascade,
  text text not null,
  is_correct boolean not null default false,
  order_index int not null default 0
);

create index answer_options_question_id_idx on public.answer_options(question_id);

alter table public.answer_options enable row level security;

-- Same gate as questions: only paid/trialing/founder can read options
create policy "answer_options_paid_read"
  on public.answer_options for select
  using (
    exists (
      select 1
      from public.subscriptions s
      where s.user_id = auth.uid()
        and (
          s.status in ('trialing', 'active')
          or s.plan = 'founder_lifetime'
        )
    )
  );

-- =============================================================================
-- TABLE: streaks
-- =============================================================================

create table public.streaks (
  user_id uuid primary key references auth.users(id) on delete cascade,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  last_activity_date date,
  updated_at timestamptz not null default now()
);

alter table public.streaks enable row level security;

create policy "streaks_select_own"
  on public.streaks for select
  using (auth.uid() = user_id);

create policy "streaks_update_own"
  on public.streaks for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =============================================================================
-- TABLE: quiz_attempts
-- =============================================================================

create type public.quiz_mode as enum ('practice', 'simulacrum');

create table public.quiz_attempts (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id bigint references public.subjects(id) on delete set null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  total_questions int not null default 0,
  correct_answers int not null default 0,
  score numeric,
  mode public.quiz_mode not null default 'practice'
);

create index quiz_attempts_user_id_idx on public.quiz_attempts(user_id);
create index quiz_attempts_subject_id_idx on public.quiz_attempts(subject_id);

alter table public.quiz_attempts enable row level security;

create policy "quiz_attempts_select_own"
  on public.quiz_attempts for select
  using (auth.uid() = user_id);

create policy "quiz_attempts_insert_own"
  on public.quiz_attempts for insert
  with check (auth.uid() = user_id);

create policy "quiz_attempts_update_own"
  on public.quiz_attempts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =============================================================================
-- TABLE: quiz_attempt_answers
-- =============================================================================

create table public.quiz_attempt_answers (
  id bigserial primary key,
  attempt_id bigint not null references public.quiz_attempts(id) on delete cascade,
  question_id bigint not null references public.questions(id) on delete cascade,
  selected_option_id bigint references public.answer_options(id) on delete set null,
  is_correct boolean not null default false,
  created_at timestamptz not null default now()
);

create index quiz_attempt_answers_attempt_id_idx on public.quiz_attempt_answers(attempt_id);

alter table public.quiz_attempt_answers enable row level security;

create policy "quiz_attempt_answers_select_own"
  on public.quiz_attempt_answers for select
  using (
    exists (
      select 1 from public.quiz_attempts a
      where a.id = quiz_attempt_answers.attempt_id and a.user_id = auth.uid()
    )
  );

create policy "quiz_attempt_answers_insert_own"
  on public.quiz_attempt_answers for insert
  with check (
    exists (
      select 1 from public.quiz_attempts a
      where a.id = quiz_attempt_answers.attempt_id and a.user_id = auth.uid()
    )
  );

-- =============================================================================
-- TABLE: airlines
-- =============================================================================

create table public.airlines (
  id bigserial primary key,
  name text not null,
  code text,                      -- IATA o ICAO code
  country text not null,
  logo_url text,
  brand_color text,               -- hex tipo "#E32327"
  requirements jsonb not null default '{}'::jsonb,
  order_index int not null default 0
);

alter table public.airlines enable row level security;

create policy "airlines_public_read"
  on public.airlines for select
  using (true);

-- =============================================================================
-- TABLE: airline_targets
-- =============================================================================

create table public.airline_targets (
  user_id uuid not null references auth.users(id) on delete cascade,
  airline_id bigint not null references public.airlines(id) on delete cascade,
  priority int not null default 1,
  created_at timestamptz not null default now(),
  primary key (user_id, airline_id)
);

alter table public.airline_targets enable row level security;

create policy "airline_targets_select_own"
  on public.airline_targets for select
  using (auth.uid() = user_id);

create policy "airline_targets_insert_own"
  on public.airline_targets for insert
  with check (auth.uid() = user_id);

create policy "airline_targets_delete_own"
  on public.airline_targets for delete
  using (auth.uid() = user_id);

-- =============================================================================
-- TRIGGER UPDATE: handle_new_user (now also seeds a streak)
-- =============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id)
    values (new.id);

  insert into public.pilot_state (user_id)
    values (new.id);

  insert into public.subscriptions (user_id, status, plan, current_period_end)
    values (new.id, 'trialing', 'free', now() + interval '7 days');

  insert into public.streaks (user_id)
    values (new.id);

  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- Backfill: ensure all existing users have a streak row
insert into public.streaks (user_id)
select id from auth.users
where id not in (select user_id from public.streaks);

-- =============================================================================
-- FUNCTION: increment_streak (idempotent, daily-aware)
-- Call from any user-facing action (quiz attempt, etc.) to bump streak once per day.
-- =============================================================================

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
  v_today date;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise exception 'auth required';
  end if;

  v_today := (now() at time zone 'America/Bogota')::date;

  select last_activity_date, current_streak
    into v_last, v_current
    from public.streaks
    where user_id = v_user_id
    for update;

  if v_last = v_today then
    -- already counted today
    return;
  end if;

  if v_last = v_today - interval '1 day' then
    v_current := v_current + 1;
  else
    v_current := 1;
  end if;

  update public.streaks
    set current_streak = v_current,
        longest_streak = greatest(longest_streak, v_current),
        last_activity_date = v_today,
        updated_at = now()
    where user_id = v_user_id;
end;
$$;

grant execute on function public.increment_streak() to authenticated;

-- =============================================================================
-- SEED: 6 LATAM airlines
-- =============================================================================

insert into public.airlines (name, code, country, brand_color, requirements, order_index) values
  ('Avianca',  'AVA', 'Colombia',  '#E32327', '{"min_hours_total":1500,"min_hours_pic":500,"icao_english":4,"licenses":["CPL","IFR","ME"],"age_max":58}'::jsonb, 1),
  ('LATAM Colombia', 'LAN', 'Colombia',  '#1A1A1A', '{"min_hours_total":1500,"icao_english":4,"licenses":["CPL","IFR"]}'::jsonb, 2),
  ('Copa Airlines','CMP', 'Panamá',     '#005DAA', '{"min_hours_total":1000,"icao_english":4,"licenses":["CPL","IFR"]}'::jsonb, 3),
  ('Wingo',    'GCO', 'Colombia',  '#FF005A', '{"min_hours_total":750,"icao_english":4,"licenses":["CPL","IFR"]}'::jsonb, 4),
  ('JetSmart', 'JES', 'Chile',     '#FF6600', '{"min_hours_total":1000,"icao_english":4,"licenses":["CPL","IFR"]}'::jsonb, 5),
  ('Viva Air', 'VIV', 'Colombia',  '#3DB54A', '{"min_hours_total":1000,"icao_english":4,"licenses":["CPL","IFR"]}'::jsonb, 6);

-- =============================================================================
-- SEED: 1 example question (Meteorología) — template for Camilo
-- Camilo can copy this pattern to load the rest of the bank.
-- =============================================================================

with q as (
  insert into public.questions (subject_id, statement, explanation, difficulty, source)
  select id, 'En condiciones de inversión térmica, ¿qué fenómeno es más probable encontrar al volar a baja altitud?', 'En una inversión térmica el aire frío queda atrapado cerca del suelo. La humedad no puede ascender y se condensa, produciendo niebla o estratos bajos. Es una limitación común de visibilidad en madrugadas claras y frías.', 1, 'Aerocivil PCA — Meteorología'
  from public.subjects where slug = 'meteorologia'
  returning id
)
insert into public.answer_options (question_id, text, is_correct, order_index)
select q.id, t.text, t.is_correct, t.idx
from q,
     (values
       ('Turbulencia severa generalizada', false, 1),
       ('Niebla o estratos bajos', true,  2),
       ('Cizalladura a nivel medio',     false, 3),
       ('Engelamiento en altura',        false, 4)
     ) as t(text, is_correct, idx);
