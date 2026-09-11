-- ============================================================================
-- Cierre del tema METAR: intentos de evaluación
--
-- La práctica ya tenía dónde guardarse: user_metar_progress.practice_done se
-- creó en la migración del 31 jul justamente previendo esto. Lo que falta es
-- el espejo de user_notam_exam_attempts para la evaluación.
--
-- Mientras esta migración no esté aplicada, la evaluación guarda el mejor
-- puntaje en el respaldo local del navegador y la pantalla funciona igual: lo
-- único que no viaja es el intento entre dispositivos.
-- ============================================================================

create table if not exists public.user_metar_exam_attempts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  score       int  not null check (score between 0 and 100),
  correct     int  not null default 0,
  total       int  not null default 0,
  taken_at    timestamptz not null default now()
);

comment on table public.user_metar_exam_attempts is
  'Intentos de la evaluación del tema METAR. Espejo de user_notam_exam_attempts.';

create index if not exists idx_metar_exam_user_score
  on public.user_metar_exam_attempts (user_id, score desc);

alter table public.user_metar_exam_attempts enable row level security;

drop policy if exists "metar_exam_select_own" on public.user_metar_exam_attempts;
create policy "metar_exam_select_own" on public.user_metar_exam_attempts
  for select using (auth.uid() = user_id);

drop policy if exists "metar_exam_insert_own" on public.user_metar_exam_attempts;
create policy "metar_exam_insert_own" on public.user_metar_exam_attempts
  for insert with check (auth.uid() = user_id);

-- El logro del tema METAR completo necesita saber si aprobó la evaluación, y
-- los umbrales de contenido crecen con cada tanda: se registran donde el resto.
insert into public.module_thresholds (code, total, nota) values
  ('metar_practice', 10, 'METAR_PRACTICE_TOTAL de src/lib/metar.ts')
on conflict (code) do update set total = excluded.total, nota = excluded.nota;

insert into public.achievements (code, name, description, icon, tier, order_index) values
  ('metar_master', 'METAR dominado', 'Terminaste el tema entero: lección, práctica y evaluación', '🌦️', 'gold', 16)
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon,
  tier = excluded.tier,
  order_index = excluded.order_index;

drop trigger if exists trg_check_achievements_metar_exam on public.user_metar_exam_attempts;
create trigger trg_check_achievements_metar_exam
  after insert or update on public.user_metar_exam_attempts
  for each row
  execute function public.trigger_check_achievements();

-- Nota: la lógica de metar_master se añade a check_and_unlock_achievements en
-- la misma pasada en que se aplique la migración 20260801010000, que es la que
-- crea module_thresholds. Aplicar esta sin aquella falla, y debe fallar: son
-- dependientes y el orden importa.
