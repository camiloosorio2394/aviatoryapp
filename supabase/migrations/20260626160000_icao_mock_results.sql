-- ============================================================================
-- Resultados históricos del Simulacro TEA (Inglés ICAO)
-- ============================================================================
-- Cada vez que el usuario completa un simulacro y se autoevalúa en los 6
-- descriptores, puede guardar el resultado. RLS: cada usuario ve solo lo suyo.
-- ============================================================================

create table if not exists public.user_icao_mock_results (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  taken_at timestamptz not null default now(),
  duration_seconds int not null default 0,
  total_items int not null default 0,
  -- { "pronunciation":4, "structure":5, "vocabulary":4, "fluency":5, "comprehension":4, "interactions":5 }
  scores jsonb not null default '{}'::jsonb,
  final_level smallint check (final_level between 3 and 6),
  recorded boolean default false,
  created_at timestamptz default now()
);

create index if not exists idx_user_icao_mock_user
  on public.user_icao_mock_results(user_id, taken_at desc);

alter table public.user_icao_mock_results enable row level security;

create policy "user_icao_mock_own" on public.user_icao_mock_results
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
