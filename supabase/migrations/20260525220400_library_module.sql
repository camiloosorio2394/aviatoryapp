-- ============================================================================
-- Módulo: BIBLIOTECA OPERACIONAL
-- ============================================================================
-- Manuales, SOPs, quick references, performance tools, W&B, briefings,
-- checklist philosophy, CRM/TEM cases, accident case studies.
-- Engagement secundario: app útil incluso fuera de estudio activo.
-- ============================================================================

create table if not exists public.library_categories (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  description text,
  icon_name text,
  color text default 'cyan',
  order_index int default 0
);

create table if not exists public.library_items (
  id bigint generated always as identity primary key,
  category_id bigint not null references public.library_categories(id) on delete cascade,
  slug text unique not null,
  title text not null,
  type text not null check (type in ('manual','sop','quick_ref','performance_tool','w_and_b_calc','briefing_template','checklist','crm_case','tem_case','accident_study','article')),
  description text,
  file_url text,                                -- PDF / doc storage URL
  embed_url text,                               -- video / interactive
  content_md text,                              -- inline markdown si no es file
  source text,                                  -- 'Boeing 737 FCOM Vol 1', 'NTSB Report AAR-94/06'
  authors text,
  version text,
  language text default 'es',
  aircraft_type text,                           -- 'A320', 'B737NG', 'genérico'
  tags text[] default '{}',
  is_premium boolean default false,             -- solo Pro / Pro+
  is_published boolean default false,
  views_count int default 0,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_library_items_category on public.library_items(category_id, order_index) where is_published;
create index if not exists idx_library_items_tags on public.library_items using gin(tags) where is_published;
create index if not exists idx_library_items_type on public.library_items(type) where is_published;

create table if not exists public.user_library_bookmarks (
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id bigint not null references public.library_items(id) on delete cascade,
  note text,
  bookmarked_at timestamptz default now(),
  primary key (user_id, item_id)
);

create table if not exists public.user_library_views (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id bigint not null references public.library_items(id) on delete cascade,
  viewed_at timestamptz default now(),
  duration_seconds int
);

create index if not exists idx_user_library_views_user on public.user_library_views(user_id, viewed_at desc);

-- RLS ------------------------------------------------------------------------
alter table public.library_categories enable row level security;
alter table public.library_items enable row level security;
alter table public.user_library_bookmarks enable row level security;
alter table public.user_library_views enable row level security;

create policy "library_categories_read" on public.library_categories for select to authenticated using (true);
create policy "library_items_read" on public.library_items for select to authenticated using (is_published);

create policy "user_library_bookmarks_own" on public.user_library_bookmarks for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "user_library_views_own" on public.user_library_views for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- SEED: 9 categorías ---------------------------------------------------------
insert into public.library_categories (slug, name, description, icon_name, color, order_index) values
  ('manuales', 'Manuales', 'FCOM, AFM, manuales operacionales por aeronave', 'BookOpen', 'cyan', 10),
  ('sops', 'SOPs', 'Standard Operating Procedures de aerolíneas', 'ListChecks', 'blue', 20),
  ('quick_refs', 'Quick References', 'QRH, emergency checklists, abnormal procedures', 'FileText', 'amber', 30),
  ('performance', 'Performance Tools', 'Calculadoras de despegue, aterrizaje, ascenso', 'TrendingUp', 'green', 40),
  ('w_and_b', 'Weight & Balance', 'Tools de cálculo W&B por aeronave', 'Scale', 'violet', 50),
  ('briefings', 'Briefings', 'Templates de briefing pre-vuelo, takeoff, approach', 'Mic', 'cyan', 60),
  ('checklist_philosophy', 'Checklist Philosophy', 'Por qué se hacen los checks como se hacen — flow patterns', 'Lightbulb', 'blue', 70),
  ('crm_tem_cases', 'CRM / TEM Cases', 'Casos reales de CRM y TEM para discusión', 'Users', 'violet', 80),
  ('accident_studies', 'Accident Case Studies', 'NTSB, BEA, AAIB — qué aprender de cada accidente', 'AlertTriangle', 'red', 90)
on conflict (slug) do nothing;

-- TRIGGER para incrementar views_count cuando se inserta una view -----------
create or replace function public.bump_library_item_views()
returns trigger language plpgsql security definer as $$
begin
  update public.library_items set views_count = views_count + 1 where id = new.item_id;
  return new;
end $$;

drop trigger if exists trg_bump_library_views on public.user_library_views;
create trigger trg_bump_library_views
  after insert on public.user_library_views
  for each row execute function public.bump_library_item_views();
