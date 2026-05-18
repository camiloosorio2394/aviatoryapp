-- AviatorYapp — Comunidad + Achievements + Notifications + Activity log
--
-- Diseñado con psicología conductual:
-- - achievements + user_achievements    → variable rewards (Hooked model)
-- - daily_activity                       → heatmap visible para loss-aversion
-- - notifications                        → progress reminders + urgency ethical
-- - community_channels + messages        → social proof + identity reinforcement

-- =============================================================================
-- ENUMS
-- =============================================================================

create type public.channel_type as enum ('general', 'stage', 'subject', 'airline');

create type public.notification_type as enum (
  'achievement',
  'streak_at_risk',
  'milestone_close',
  'expiry_warning',
  'community_mention',
  'wingman_insight'
);

-- =============================================================================
-- TABLE: achievements (catalog)
-- =============================================================================

create table public.achievements (
  id bigserial primary key,
  code text not null unique,         -- 'first_quiz', 'streak_7', etc.
  name text not null,
  description text not null,
  icon text not null,                -- lucide icon name OR emoji
  tier text not null default 'bronze' check (tier in ('bronze', 'silver', 'gold', 'platinum')),
  order_index int not null default 0
);

alter table public.achievements enable row level security;

create policy "achievements_public_read"
  on public.achievements for select
  using (true);

-- =============================================================================
-- TABLE: user_achievements
-- =============================================================================

create table public.user_achievements (
  user_id uuid not null references auth.users(id) on delete cascade,
  achievement_id bigint not null references public.achievements(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  seen boolean not null default false,
  primary key (user_id, achievement_id)
);

create index user_achievements_user_id_idx on public.user_achievements(user_id);

alter table public.user_achievements enable row level security;

create policy "user_achievements_select_own"
  on public.user_achievements for select
  using (auth.uid() = user_id);

create policy "user_achievements_update_own"
  on public.user_achievements for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =============================================================================
-- TABLE: daily_activity (granular log for heatmap)
-- =============================================================================

create table public.daily_activity (
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  activities_count int not null default 0,
  questions_answered int not null default 0,
  correct_answers int not null default 0,
  minutes_studied int not null default 0,
  primary key (user_id, date)
);

create index daily_activity_user_date_idx on public.daily_activity(user_id, date desc);

alter table public.daily_activity enable row level security;

create policy "daily_activity_select_own"
  on public.daily_activity for select
  using (auth.uid() = user_id);

-- =============================================================================
-- TABLE: notifications
-- =============================================================================

create table public.notifications (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  type public.notification_type not null,
  title text not null,
  body text,
  action_url text,
  icon text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index notifications_user_unread_idx on public.notifications(user_id, read_at);
create index notifications_user_created_idx on public.notifications(user_id, created_at desc);

alter table public.notifications enable row level security;

create policy "notifications_select_own"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "notifications_update_own"
  on public.notifications for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =============================================================================
-- TABLE: community_channels (pre-seeded, public read)
-- =============================================================================

create table public.community_channels (
  id bigserial primary key,
  slug text not null unique,
  name text not null,
  description text,
  type public.channel_type not null default 'general',
  emoji text,
  order_index int not null default 0,
  member_count int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.community_channels enable row level security;

create policy "channels_public_read"
  on public.community_channels for select
  using (true);

-- =============================================================================
-- TABLE: community_messages
-- =============================================================================

create table public.community_messages (
  id bigserial primary key,
  channel_id bigint not null references public.community_channels(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null check (length(content) > 0 and length(content) <= 2000),
  parent_id bigint references public.community_messages(id) on delete set null,
  edited_at timestamptz,
  created_at timestamptz not null default now()
);

create index community_messages_channel_id_idx on public.community_messages(channel_id, created_at desc);
create index community_messages_user_id_idx on public.community_messages(user_id);

alter table public.community_messages enable row level security;

-- Read: any authenticated user
create policy "messages_authenticated_read"
  on public.community_messages for select
  to authenticated
  using (true);

-- Insert: only own messages
create policy "messages_insert_own"
  on public.community_messages for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Update/delete: only own messages
create policy "messages_update_own"
  on public.community_messages for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "messages_delete_own"
  on public.community_messages for delete
  to authenticated
  using (auth.uid() = user_id);

-- =============================================================================
-- TABLE: community_reactions
-- =============================================================================

create table public.community_reactions (
  message_id bigint not null references public.community_messages(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  emoji text not null,
  created_at timestamptz not null default now(),
  primary key (message_id, user_id, emoji)
);

create index community_reactions_message_id_idx on public.community_reactions(message_id);

alter table public.community_reactions enable row level security;

create policy "reactions_authenticated_read"
  on public.community_reactions for select
  to authenticated
  using (true);

create policy "reactions_insert_own"
  on public.community_reactions for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "reactions_delete_own"
  on public.community_reactions for delete
  to authenticated
  using (auth.uid() = user_id);

-- =============================================================================
-- FUNCTION: record_daily_activity — called from increment_streak
-- =============================================================================

create or replace function public.record_daily_activity(
  p_questions int default 0,
  p_correct int default 0,
  p_minutes int default 0
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
  v_today date;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise exception 'auth required';
  end if;

  v_today := (now() at time zone 'America/Bogota')::date;

  insert into public.daily_activity (user_id, date, activities_count, questions_answered, correct_answers, minutes_studied)
  values (v_user_id, v_today, 1, p_questions, p_correct, p_minutes)
  on conflict (user_id, date) do update set
    activities_count   = public.daily_activity.activities_count + 1,
    questions_answered = public.daily_activity.questions_answered + p_questions,
    correct_answers    = public.daily_activity.correct_answers + p_correct,
    minutes_studied    = public.daily_activity.minutes_studied + p_minutes;
end;
$$;

grant execute on function public.record_daily_activity(int, int, int) to authenticated;

-- =============================================================================
-- FUNCTION: get_activity_heatmap — last 84 days (12 weeks) for dashboard
-- =============================================================================

create or replace function public.get_activity_heatmap()
returns table (date date, activities_count int, questions_answered int)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    return;
  end if;

  return query
    select d.date, coalesce(da.activities_count, 0), coalesce(da.questions_answered, 0)
    from generate_series(
      ((now() at time zone 'America/Bogota')::date - interval '83 days')::date,
      (now() at time zone 'America/Bogota')::date,
      '1 day'::interval
    ) as d(date)
    left join public.daily_activity da
      on da.user_id = v_user_id and da.date = d.date::date
    order by d.date;
end;
$$;

grant execute on function public.get_activity_heatmap() to authenticated;

-- =============================================================================
-- FUNCTION: get_peers_in_stage — community sidebar widget
-- =============================================================================

create or replace function public.get_peers_in_stage(p_limit int default 6)
returns table (user_id uuid, username text, stage text, current_streak int)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
  v_stage text;
begin
  v_user_id := auth.uid();
  if v_user_id is null then return; end if;

  select stage::text into v_stage
    from public.pilot_state
    where pilot_state.user_id = v_user_id;

  if v_stage is null then return; end if;

  return query
    select ps.user_id, p.username, ps.stage::text, coalesce(s.current_streak, 0)
    from public.pilot_state ps
    join public.profiles p on p.id = ps.user_id
    left join public.streaks s on s.user_id = ps.user_id
    where ps.stage::text = v_stage
      and ps.user_id <> v_user_id
      and p.username is not null
    order by coalesce(s.current_streak, 0) desc, ps.updated_at desc
    limit p_limit;
end;
$$;

grant execute on function public.get_peers_in_stage(int) to authenticated;

-- =============================================================================
-- SEED: achievements catalog
-- =============================================================================

insert into public.achievements (code, name, description, icon, tier, order_index) values
  ('first_step',     'Primer paso',               'Completaste tu onboarding',                       '🛫', 'bronze',   1),
  ('first_quiz',     'Primer simulacro',          'Completaste tu primer quiz Aerocivil',            '📝', 'bronze',   2),
  ('streak_3',       'Tres días seguidos',        'Estudiaste 3 días sin parar',                     '🔥', 'bronze',   3),
  ('streak_7',       'Una semana de fuego',       'Estudiaste 7 días seguidos',                      '🔥', 'silver',   4),
  ('streak_30',      'Mes de hierro',             'Estudiaste 30 días seguidos',                     '⚡', 'gold',     5),
  ('subject_master', 'Materia dominada',          'Aprobaste 5 quizzes seguidos en una materia',     '🎓', 'silver',   6),
  ('icao_climb',     'Tu inglés despega',         'Subiste tu nivel ICAO autoevaluado',              '🌐', 'silver',   7),
  ('first_100',      'Primeras 100 preguntas',    'Respondiste 100 preguntas Aerocivil',             '💯', 'silver',   8),
  ('community_hello','Hola comunidad',            'Tu primer mensaje en la comunidad de pilotos',    '👋', 'bronze',   9),
  ('founder_badge',  'Fundador Aviatory',         'Estuviste desde el día uno (plan Founder)',       '👑', 'platinum', 10);

-- =============================================================================
-- SEED: community channels
-- =============================================================================

insert into public.community_channels (slug, name, description, type, emoji, order_index) values
  ('general',          'general',          'Bienvenida y conversación abierta',                    'general', '👋', 1),
  ('logros',           'logros',           'Compartí tus aprobados, hitos y horas nuevas',         'general', '🏆', 2),
  ('preguntas',        'preguntas',        'Dudas técnicas que la comunidad puede responder',      'general', '❓', 3),
  ('empleos',          'empleos',          'Convocatorias de aerolíneas y oportunidades',          'general', '💼', 4),
  -- Por etapa
  ('etapa-ppl',        'estudiantes-ppl',  'Pilotos cursando o preparando PPL',                    'stage',   '🛩️', 10),
  ('etapa-cpl',        'estudiantes-cpl',  'Pilotos cursando o preparando CPL',                    'stage',   '✈️', 11),
  ('etapa-horas',      'hour-building',    'Pilotos sumando horas hacia aerolínea',                'stage',   '⏱️', 12),
  ('etapa-candidatos', 'candidatos',       'Pilotos postulando o entrevistando con aerolíneas',    'stage',   '🎯', 13),
  -- Por materia
  ('mat-meteorologia', 'meteorología',     'Dudas y tips de Meteorología',                         'subject', '🌦️', 20),
  ('mat-reglamento',   'reglamento',       'RAC, FAR, ICAO',                                       'subject', '📜', 21),
  ('mat-icao-english', 'inglés-icao',      'Práctica y vocabulario aeronáutico',                   'subject', '🌐', 22),
  -- Por aerolínea
  ('aero-avianca',     'avianca',          'Preparación específica para Avianca',                  'airline', '🟥', 30),
  ('aero-latam',       'latam',            'Preparación específica para LATAM',                    'airline', '⬛', 31),
  ('aero-copa',        'copa',             'Preparación específica para Copa Airlines',            'airline', '🟦', 32);
