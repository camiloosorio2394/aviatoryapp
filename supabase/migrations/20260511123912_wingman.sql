-- AviatorYapp — Wingman (AI tutor) telemetry + usage
-- ai_interactions stores every user prompt + assistant response with cost data
-- ai_usage_this_month RPC returns how many conversations the user started this month
-- (used to enforce free-tier limit; pro users skip the check at app layer)

-- =============================================================================
-- TABLE: ai_interactions
-- =============================================================================

create table public.ai_interactions (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  conversation_id uuid not null default gen_random_uuid(),
  kind text not null,                       -- 'quiz_explain' | 'study_help' | 'general'
  question_id bigint references public.questions(id) on delete set null,
  attempt_id bigint references public.quiz_attempts(id) on delete set null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  tokens_input int,
  tokens_output int,
  model text,
  feedback text check (feedback in ('thumbs_up', 'thumbs_down')),
  feedback_at timestamptz,
  created_at timestamptz not null default now()
);

create index ai_interactions_user_id_idx       on public.ai_interactions(user_id);
create index ai_interactions_conversation_id_idx on public.ai_interactions(conversation_id);
create index ai_interactions_user_month_idx    on public.ai_interactions(user_id, created_at);

alter table public.ai_interactions enable row level security;

-- Users can read their own AI history
create policy "ai_interactions_select_own"
  on public.ai_interactions for select
  using (auth.uid() = user_id);

-- Users can rate their own assistant messages (👍 / 👎)
create policy "ai_interactions_feedback_own"
  on public.ai_interactions for update
  using (auth.uid() = user_id and role = 'assistant')
  with check (auth.uid() = user_id and role = 'assistant');

-- No insert policy for authenticated/anon: only the edge function (using
-- service role) inserts. Keeps tokens_input/output trustworthy for billing math.

-- =============================================================================
-- RPC: ai_usage_this_month — counts distinct conversations started this month
-- =============================================================================

create or replace function public.ai_usage_this_month()
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
  v_count int;
  v_month_start timestamptz;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    return 0;
  end if;

  v_month_start := date_trunc('month', now() at time zone 'America/Bogota');

  select count(distinct conversation_id) into v_count
    from public.ai_interactions
    where user_id = v_user_id
      and role = 'user'
      and created_at >= v_month_start;

  return coalesce(v_count, 0);
end;
$$;

grant execute on function public.ai_usage_this_month() to authenticated;
