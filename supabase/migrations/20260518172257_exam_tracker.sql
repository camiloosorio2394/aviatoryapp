-- AviatorYapp Fase 3 — Real Exam Tracker ("Waze altruista")
--
-- Pilotos que ya tomaron el examen Aerocivil reportan qué cayó.
-- La comunidad ve heatmap de temas + tasa de aprobación + tips.
--
-- Modelo:
--   exam_reports: 1 reporte por intento de examen
--   subject_topics: catálogo de temas por subject (seeded)
--   exam_report_topics: many-to-many entre report y topics que cayeron

-- =============================================================================
-- ENUM región Aerocivil
-- =============================================================================

create type public.aerocivil_region as enum (
  'bogota',
  'medellin',
  'cali',
  'barranquilla',
  'cartagena',
  'cucuta',
  'pereira',
  'bucaramanga',
  'otra'
);

-- =============================================================================
-- TABLE: subject_topics (catálogo)
-- =============================================================================

create table public.subject_topics (
  id bigserial primary key,
  subject_id bigint not null references public.subjects(id) on delete cascade,
  key text not null,                       -- estable, ej "weather_minima"
  label text not null,                     -- humano, ej "Mínimos meteorológicos"
  order_index int not null default 0,
  unique (subject_id, key)
);

create index subject_topics_subject_idx on public.subject_topics(subject_id, order_index);

alter table public.subject_topics enable row level security;

create policy "topics_public_read"
  on public.subject_topics for select
  using (true);

-- =============================================================================
-- TABLE: exam_reports
-- =============================================================================

create table public.exam_reports (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id bigint not null references public.subjects(id) on delete cascade,
  exam_date date not null,
  region public.aerocivil_region not null default 'bogota',
  passed boolean not null,
  score smallint,                                 -- nullable, si recuerdan
  difficulty smallint check (difficulty between 1 and 5),
  recalled_questions text,                        -- free text con preguntas
  tips text,                                      -- tips para los demás
  is_anonymous boolean not null default false,
  created_at timestamptz not null default now()
);

create index exam_reports_subject_recent_idx on public.exam_reports(subject_id, exam_date desc);
create index exam_reports_user_idx on public.exam_reports(user_id);

alter table public.exam_reports enable row level security;

-- Read: todos los authenticated pueden leer reportes (es la gracia del Waze altruista)
create policy "exam_reports_read_all"
  on public.exam_reports for select
  to authenticated
  using (true);

-- Insert: solo propio
create policy "exam_reports_insert_own"
  on public.exam_reports for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Update/delete: solo propio
create policy "exam_reports_update_own"
  on public.exam_reports for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "exam_reports_delete_own"
  on public.exam_reports for delete
  to authenticated
  using (auth.uid() = user_id);

-- =============================================================================
-- TABLE: exam_report_topics
-- =============================================================================

create table public.exam_report_topics (
  report_id bigint not null references public.exam_reports(id) on delete cascade,
  topic_id bigint not null references public.subject_topics(id) on delete cascade,
  primary key (report_id, topic_id)
);

create index exam_report_topics_topic_idx on public.exam_report_topics(topic_id);

alter table public.exam_report_topics enable row level security;

create policy "report_topics_read_all"
  on public.exam_report_topics for select
  to authenticated
  using (true);

create policy "report_topics_insert_own"
  on public.exam_report_topics for insert
  to authenticated
  with check (
    exists (
      select 1 from public.exam_reports r
      where r.id = report_id and r.user_id = auth.uid()
    )
  );

create policy "report_topics_delete_own"
  on public.exam_report_topics for delete
  to authenticated
  using (
    exists (
      select 1 from public.exam_reports r
      where r.id = report_id and r.user_id = auth.uid()
    )
  );

-- =============================================================================
-- RPC: get_subject_intel — agregados por subject (últimos 90 días)
-- =============================================================================

create or replace function public.get_subject_intel(p_subject_slug text)
returns table (
  subject_id bigint,
  subject_name text,
  total_reports int,
  pass_rate numeric,
  avg_difficulty numeric,
  top_topics jsonb,                      -- [{key, label, count, frequency_pct}]
  recent_reports jsonb                   -- últimos 5 reportes anónimos
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_subject_id bigint;
  v_subject_name text;
  v_total int;
  v_cutoff date;
begin
  v_cutoff := (now() at time zone 'America/Bogota')::date - interval '90 days';

  select id, name into v_subject_id, v_subject_name
  from public.subjects where slug = p_subject_slug;

  if v_subject_id is null then return; end if;

  select count(*) into v_total
  from public.exam_reports
  where subject_id = v_subject_id and exam_date >= v_cutoff;

  return query
  select
    v_subject_id,
    v_subject_name,
    v_total,
    case when v_total > 0 then
      round(100.0 * (
        select count(*)::numeric from public.exam_reports
        where subject_id = v_subject_id and exam_date >= v_cutoff and passed = true
      ) / v_total, 0)
    else null end,
    (
      select round(avg(difficulty)::numeric, 1)
      from public.exam_reports
      where subject_id = v_subject_id and exam_date >= v_cutoff and difficulty is not null
    ),
    -- Top temas con count + frequency
    coalesce((
      select jsonb_agg(t order by t.count desc)
      from (
        select
          st.key,
          st.label,
          count(rt.report_id) as count,
          round(100.0 * count(rt.report_id) / nullif(v_total, 0), 0) as frequency_pct
        from public.subject_topics st
        left join public.exam_report_topics rt on rt.topic_id = st.id
        left join public.exam_reports r on r.id = rt.report_id and r.exam_date >= v_cutoff
        where st.subject_id = v_subject_id
        group by st.id, st.key, st.label, st.order_index
        having count(rt.report_id) > 0
        order by count desc
        limit 8
      ) t
    ), '[]'::jsonb),
    -- Recent reports (anonymized)
    coalesce((
      select jsonb_agg(r2)
      from (
        select
          jsonb_build_object(
            'exam_date', er.exam_date,
            'region', er.region,
            'passed', er.passed,
            'difficulty', er.difficulty,
            'tips', case when er.tips is not null and length(er.tips) > 0 then er.tips else null end
          ) as r2
        from public.exam_reports er
        where er.subject_id = v_subject_id and er.exam_date >= v_cutoff
        order by er.exam_date desc, er.id desc
        limit 6
      ) recent
    ), '[]'::jsonb);
end;
$$;

grant execute on function public.get_subject_intel(text) to authenticated;

-- =============================================================================
-- RPC: get_all_subjects_intel — resumen para la página principal del tracker
-- =============================================================================

create or replace function public.get_all_subjects_intel()
returns table (
  subject_id bigint,
  subject_name text,
  subject_slug text,
  total_reports int,
  pass_rate numeric,
  hottest_topic text
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_cutoff date;
begin
  v_cutoff := (now() at time zone 'America/Bogota')::date - interval '90 days';

  return query
  with reports_by_subj as (
    select
      s.id as subject_id,
      s.name,
      s.slug,
      coalesce(count(er.id), 0)::int as total,
      case when count(er.id) > 0 then
        round(100.0 * sum(case when er.passed then 1 else 0 end) / count(er.id), 0)
      else null end as pass_rate
    from public.subjects s
    left join public.exam_reports er on er.subject_id = s.id and er.exam_date >= v_cutoff
    group by s.id, s.name, s.slug
  ),
  hottest as (
    select distinct on (st.subject_id)
      st.subject_id,
      st.label
    from public.subject_topics st
    join public.exam_report_topics rt on rt.topic_id = st.id
    join public.exam_reports er on er.id = rt.report_id and er.exam_date >= v_cutoff
    group by st.subject_id, st.label
    order by st.subject_id, count(rt.report_id) desc
  )
  select
    r.subject_id,
    r.name,
    r.slug,
    r.total,
    r.pass_rate,
    h.label
  from reports_by_subj r
  left join hottest h on h.subject_id = r.subject_id
  order by r.subject_id;
end;
$$;

grant execute on function public.get_all_subjects_intel() to authenticated;

-- =============================================================================
-- SEED: temas por materia (basado en sílabo Aerocivil PCA)
-- =============================================================================

with s as (select id from public.subjects where slug = 'meteorologia')
insert into public.subject_topics (subject_id, key, label, order_index)
select s.id, t.k, t.l, t.idx from s, (values
  ('frentes', 'Frentes y masas de aire', 1),
  ('vientos', 'Vientos y cizalladura', 2),
  ('visibilidad', 'Visibilidad y nubes', 3),
  ('precipitacion', 'Precipitación y tormentas', 4),
  ('engelamiento', 'Engelamiento y turbulencia', 5),
  ('metar_taf', 'METAR / TAF / NOTAM', 6),
  ('altimetria', 'Altimetría y QNH', 7),
  ('mar', 'Masas de aire / inversión térmica', 8)
) as t(k, l, idx);

with s as (select id from public.subjects where slug = 'navegacion')
insert into public.subject_topics (subject_id, key, label, order_index)
select s.id, t.k, t.l, t.idx from s, (values
  ('cartas', 'Lectura de cartas aeronáuticas', 1),
  ('rumbo_curso', 'Rumbo, curso, deriva', 2),
  ('gps_rnav', 'GPS, RNAV, RNP', 3),
  ('vor_ils', 'VOR / ILS / NDB', 4),
  ('estima', 'Navegación a estima', 5),
  ('combustible', 'Cálculos de combustible', 6),
  ('tiempo_distancia', 'Tiempo, velocidad y distancia', 7),
  ('declinacion', 'Declinación magnética', 8)
) as t(k, l, idx);

with s as (select id from public.subjects where slug = 'reglamento')
insert into public.subject_topics (subject_id, key, label, order_index)
select s.id, t.k, t.l, t.idx from s, (values
  ('rac_91', 'RAC 91 — Reglas de vuelo', 1),
  ('rac_61', 'RAC 61 — Licencias', 2),
  ('rac_67', 'RAC 67 — Aptitud psicofísica', 3),
  ('espacio_aereo', 'Espacios aéreos y clasificación', 4),
  ('prioridades', 'Prioridades y derecho de paso', 5),
  ('luces', 'Luces de aeronaves y aeropuertos', 6),
  ('comunicaciones', 'Comunicaciones y radiofonía', 7),
  ('icao_annex', 'Anexos ICAO relevantes', 8)
) as t(k, l, idx);

with s as (select id from public.subjects where slug = 'motores')
insert into public.subject_topics (subject_id, key, label, order_index)
select s.id, t.k, t.l, t.idx from s, (values
  ('ciclos', 'Ciclos del motor de pistón', 1),
  ('encendido', 'Sistema de encendido dual', 2),
  ('mezcla', 'Mezcla aire-combustible', 3),
  ('helices', 'Hélices y RPM', 4),
  ('refrigeracion', 'Refrigeración y aceite', 5),
  ('detonacion', 'Detonación e ignición prematura', 6),
  ('carb_ice', 'Carburator icing', 7),
  ('sistemas', 'Sistema eléctrico y vacío', 8)
) as t(k, l, idx);

with s as (select id from public.subjects where slug = 'aerodinamica')
insert into public.subject_topics (subject_id, key, label, order_index)
select s.id, t.k, t.l, t.idx from s, (values
  ('sustentacion', 'Sustentación y perfil alar', 1),
  ('arrastre', 'Arrastre inducido y parásito', 2),
  ('perdida', 'Pérdida (stall) y spin', 3),
  ('ground_effect', 'Efecto suelo', 4),
  ('performance', 'Performance de vuelo', 5),
  ('despegue', 'Velocidades de despegue', 6),
  ('aterrizaje', 'Aterrizaje y go-around', 7),
  ('center_grav', 'Centro de gravedad y estabilidad', 8)
) as t(k, l, idx);

with s as (select id from public.subjects where slug = 'weight-balance')
insert into public.subject_topics (subject_id, key, label, order_index)
select s.id, t.k, t.l, t.idx from s, (values
  ('cg_limits', 'Límites de CG (fwd / aft)', 1),
  ('moments', 'Cálculo de momentos', 2),
  ('mtow', 'MTOW / MLW / MZFW', 3),
  ('arm', 'Arm y datum', 4),
  ('shifting', 'Shifting de carga', 5),
  ('density_alt', 'Density altitude impacto', 6),
  ('payload', 'Payload vs combustible', 7),
  ('limits_charts', 'Lectura de gráficos del POH', 8)
) as t(k, l, idx);
