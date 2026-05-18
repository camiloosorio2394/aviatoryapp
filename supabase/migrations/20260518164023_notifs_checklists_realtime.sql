-- AviatorYapp — Notifications trigger + Checklists + Realtime
--
-- 1) Trigger en user_achievements para crear notification cuando se desbloquea
-- 2) Tablas checklists + checklist_items + checklist_progress + seeds por etapa
-- 3) Habilitar Realtime para community_messages y community_reactions

-- =============================================================================
-- NOTIFICATIONS — trigger on achievement unlock
-- =============================================================================

create or replace function public.trigger_notify_achievement()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_name text;
  v_description text;
  v_icon text;
begin
  select name, description, icon into v_name, v_description, v_icon
  from public.achievements
  where id = NEW.achievement_id;

  if v_name is null then return NEW; end if;

  insert into public.notifications (user_id, type, title, body, icon, action_url)
  values (
    NEW.user_id,
    'achievement',
    '¡Logro desbloqueado!',
    v_name || ' — ' || v_description,
    v_icon,
    '/app'
  );

  return NEW;
end;
$$;

drop trigger if exists trg_notify_achievement on public.user_achievements;
create trigger trg_notify_achievement
  after insert on public.user_achievements
  for each row
  execute function public.trigger_notify_achievement();

-- =============================================================================
-- NOTIFICATIONS — helper RPCs
-- =============================================================================

create or replace function public.unread_notifications_count()
returns int
language sql
security definer
set search_path = ''
as $$
  select count(*)::int
  from public.notifications
  where user_id = auth.uid() and read_at is null;
$$;

grant execute on function public.unread_notifications_count() to authenticated;

create or replace function public.mark_all_notifications_read()
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count int;
begin
  update public.notifications
    set read_at = now()
    where user_id = auth.uid() and read_at is null;
  get diagnostics v_count = ROW_COUNT;
  return v_count;
end;
$$;

grant execute on function public.mark_all_notifications_read() to authenticated;

-- =============================================================================
-- CHECKLISTS — table + items + progress
-- =============================================================================

create table public.checklists (
  id bigserial primary key,
  stage public.pilot_stage not null,
  name text not null,
  description text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.checklists enable row level security;

create policy "checklists_public_read"
  on public.checklists for select
  using (true);

create table public.checklist_items (
  id bigserial primary key,
  checklist_id bigint not null references public.checklists(id) on delete cascade,
  key text not null,                  -- estable, usado en checklist_progress
  title text not null,
  description text,
  category text,                       -- ej: "Examen", "Salud", "Documentación"
  order_index int not null default 0,
  unique (checklist_id, key)
);

create index checklist_items_checklist_id_idx on public.checklist_items(checklist_id, order_index);

alter table public.checklist_items enable row level security;

create policy "checklist_items_public_read"
  on public.checklist_items for select
  using (true);

create table public.checklist_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id bigint not null references public.checklist_items(id) on delete cascade,
  completed_at timestamptz not null default now(),
  primary key (user_id, item_id)
);

create index checklist_progress_user_id_idx on public.checklist_progress(user_id);

alter table public.checklist_progress enable row level security;

create policy "progress_select_own"
  on public.checklist_progress for select
  using (auth.uid() = user_id);

create policy "progress_insert_own"
  on public.checklist_progress for insert
  with check (auth.uid() = user_id);

create policy "progress_delete_own"
  on public.checklist_progress for delete
  using (auth.uid() = user_id);

-- =============================================================================
-- SEED: 5 checklists (una por etapa, ~10-12 items cada una)
-- =============================================================================

-- student_ppl
with c as (
  insert into public.checklists (stage, name, description, order_index)
  values ('student_ppl', 'Camino al PPL', 'Lo que tienes que conseguir antes de tu licencia privada', 1)
  returning id
)
insert into public.checklist_items (checklist_id, key, title, description, category, order_index)
select c.id, t.k, t.title, t.dsc, t.cat, t.idx from c, (values
  ('med_class2',   'Examen psicofísico clase 2', 'Apto médico vigente Aerocivil clase 2', 'Salud', 1),
  ('school_141',   'Inscripción en escuela CAA-141', 'Matriculado en escuela aprobada por Aerocivil', 'Escuela', 2),
  ('ground_school','Ground school PPL aprobado', 'Curso teórico aprobado en escuela', 'Teoría', 3),
  ('hours_40',     'Mín. 40 horas de vuelo', '40h totales con instrucción + solo según RAC', 'Horas', 4),
  ('solo_10',      'Mín. 10 horas solo', 'Vuelo en solitario supervisado', 'Horas', 5),
  ('xc_5',         'Mín. 5 horas cross-country', 'Vuelos a otros aeródromos', 'Horas', 6),
  ('exam_meteo',   'Examen Aerocivil Meteorología', 'Aprobado en plataforma ELITE', 'Teoría', 7),
  ('exam_regl',    'Examen Aerocivil Reglamento', 'Aprobado en plataforma ELITE', 'Teoría', 8),
  ('exam_nav',     'Examen Aerocivil Navegación', 'Aprobado en plataforma ELITE', 'Teoría', 9),
  ('exam_motores', 'Examen Aerocivil Motores y W&B', 'Aprobado en plataforma ELITE', 'Teoría', 10),
  ('checkride',    'Chequeo con inspector Aerocivil', 'Vuelo final + oral', 'Examen', 11),
  ('license',      'Recibir tu licencia PPL', '🎉 Eres piloto privado', 'Hito', 12)
) as t(k, title, dsc, cat, idx);

-- ppl
with c as (
  insert into public.checklists (stage, name, description, order_index)
  values ('ppl', 'Próximos pasos con tu PPL', 'Mantén la vigencia y prepara el camino al CPL', 2)
  returning id
)
insert into public.checklist_items (checklist_id, key, title, description, category, order_index)
select c.id, t.k, t.title, t.dsc, t.cat, t.idx from c, (values
  ('keep_med',     'Mantener médico clase 2 vigente', 'Renuévalo antes del vencimiento', 'Salud', 1),
  ('hours_log',    'Lleva tu logbook al día', 'Cada vuelo registrado y firmado', 'Horas', 2),
  ('school_cpl',   'Inscríbete a programa CPL', 'Escuela aprobada para licencia comercial', 'Escuela', 3),
  ('med_class1',   'Programar médico clase 1', 'Necesario para iniciar CPL', 'Salud', 4),
  ('icao_start',   'Comenzar inglés ICAO', 'Apuntar a nivel 4+', 'Inglés', 5),
  ('time_build',   'Plan de hour building', 'Cómo vas a sumar horas hacia el CPL', 'Horas', 6),
  ('savings',      'Plan financiero CPL', 'CPL en Colombia: $80-150M COP — define cómo lo costeas', 'Carrera', 7),
  ('cpl_start',    'Iniciar curso CPL', 'Primer día de clases', 'Hito', 8)
) as t(k, title, dsc, cat, idx);

-- cpl_in_progress
with c as (
  insert into public.checklists (stage, name, description, order_index)
  values ('cpl_in_progress', 'Curso CPL en marcha', 'Materias, horas y exámenes hasta obtener el comercial', 3)
  returning id
)
insert into public.checklist_items (checklist_id, key, title, description, category, order_index)
select c.id, t.k, t.title, t.dsc, t.cat, t.idx from c, (values
  ('med_class1_ok','Médico clase 1 obtenido', 'Vigente y archivado', 'Salud', 1),
  ('icao_4',       'Inglés ICAO nivel 4', 'Aprobado y certificado', 'Inglés', 2),
  ('hours_200',    '200h totales', 'Mínima para CPL Aerocivil', 'Horas', 3),
  ('hours_pic_50', '50h PIC', 'Tiempo como Piloto al Mando', 'Horas', 4),
  ('hours_xc_20',  '20h cross-country', 'Vuelos a otros aeródromos', 'Horas', 5),
  ('hours_night',  '10h nocturnas', 'Vuelo en horario nocturno', 'Horas', 6),
  ('hours_inst',   '40h instrumentos', 'Sim + vuelo real bajo capucha', 'Horas', 7),
  ('exam_cpl_meteo','Examen CPL Meteorología', 'Aprobado ELITE', 'Teoría', 8),
  ('exam_cpl_regl','Examen CPL Reglamento', 'Aprobado ELITE', 'Teoría', 9),
  ('exam_cpl_nav', 'Examen CPL Navegación + Performance', 'Aprobado ELITE', 'Teoría', 10),
  ('exam_cpl_others','Resto de exámenes CPL', 'Motores, Sistemas, AGK', 'Teoría', 11),
  ('checkride_cpl','Chequeo final CPL', 'Vuelo + oral con inspector', 'Examen', 12),
  ('cpl_license',  'Recibir tu CPL', '🎉 Eres piloto comercial', 'Hito', 13)
) as t(k, title, dsc, cat, idx);

-- hour_building
with c as (
  insert into public.checklists (stage, name, description, order_index)
  values ('hour_building', 'Hour building hacia aerolínea', 'Sumar horas estratégicas mientras te preparas para postular', 4)
  returning id
)
insert into public.checklist_items (checklist_id, key, title, description, category, order_index)
select c.id, t.k, t.title, t.dsc, t.cat, t.idx from c, (values
  ('icao_5',       'Subir ICAO a nivel 5+', 'Más competitivo para aerolíneas internacionales', 'Inglés', 1),
  ('me_rating',    'Multi-engine rating', 'Habilitación bimotor', 'Habilitaciones', 2),
  ('ifr_rating',   'IFR / Instruments rating', 'Habilitación de vuelo por instrumentos', 'Habilitaciones', 3),
  ('cv_built',     'CV piloto pulido', 'Una página, formato aerolínea, fonts limpias', 'Carrera', 4),
  ('photo_pro',    'Foto profesional con uniforme', 'Importante para postulaciones', 'Carrera', 5),
  ('linkedin',     'LinkedIn al día', 'Hours, ratings, idiomas, foto pro', 'Carrera', 6),
  ('hours_total_500','500h totales', 'Umbral típico de selectores', 'Horas', 7),
  ('hours_pic_100','100h PIC', 'Crítico para postular', 'Horas', 8),
  ('interview_prep','Prep entrevista', 'Mock interview técnico + HR', 'Carrera', 9),
  ('first_apply',  'Primera postulación', 'Inicia el embudo de aerolíneas', 'Hito', 10)
) as t(k, title, dsc, cat, idx);

-- airline_candidate
with c as (
  insert into public.checklists (stage, name, description, order_index)
  values ('airline_candidate', 'Candidato a aerolínea', 'Postulaciones, entrevistas y assessments', 5)
  returning id
)
insert into public.checklist_items (checklist_id, key, title, description, category, order_index)
select c.id, t.k, t.title, t.dsc, t.cat, t.idx from c, (values
  ('docs_ready',   'Documentación lista', 'CV, licencias scaneadas, logbook digital, ICAO cert', 'Documentación', 1),
  ('apply_avianca','Postular a Avianca cadetes', 'Si tienes los mínimos', 'Postulación', 2),
  ('apply_latam',  'Postular a LATAM', 'Programa cadetes o lateral', 'Postulación', 3),
  ('apply_copa',   'Postular a Copa', 'Programa cadetes o lateral', 'Postulación', 4),
  ('apply_wingo',  'Postular a Wingo', 'Lateral entry common', 'Postulación', 5),
  ('compass',      'Estudiar COMPASS / SkyTest', 'Test psicotécnico común', 'Assessment', 6),
  ('mock_sim',     'Mock sim evaluation', 'Práctica de SIM check', 'Assessment', 7),
  ('interview_tech','Entrevista técnica preparada', 'Preguntas frecuentes ATR/A320/B737', 'Entrevista', 8),
  ('interview_hr', 'Entrevista HR preparada', 'STAR method, motivación, planes', 'Entrevista', 9),
  ('first_offer',  '¡Primera oferta!', '🎉 Eres First Officer', 'Hito', 10)
) as t(k, title, dsc, cat, idx);

-- =============================================================================
-- REALTIME — habilitar replication para community tables
-- =============================================================================

alter publication supabase_realtime add table public.community_messages;
alter publication supabase_realtime add table public.community_reactions;
alter publication supabase_realtime add table public.notifications;
