-- ============================================================================
-- Módulo de pruebas psicotécnicas
--
-- Entra como tema de Ingreso a aerolínea, al lado de NOTAM, Meteorología y
-- Mercancías peligrosas: razonamiento abstracto, espacial y numérico, con
-- ejercicios cronometrados en tres modos y tres niveles.
--
-- Lo que hay que persistir es el marcador de cada tanda, no las respuestas: el
-- banco se sortea distinto en cada intento, así que un answers[] no sería
-- comparable entre intentos. Es la misma decisión que se tomó para el simulacro
-- de entrevista técnica en 20260801040000.
--
-- La lección de metar_master sigue vigente —el logro y su disparador van en la
-- misma migración que la tabla, o el logro nace inerte— pero aquí se cumple sin
-- tocar check_and_unlock_achievements.
--
-- Por qué: el historial de migraciones del repositorio y el de la base están
-- desincronizados. La base tiene migraciones aplicadas a mano que no existen
-- como archivo (20260802221108 hasta 20260803191653, posteriores a las últimas
-- de aquí). Recrear esa función con `create or replace` sobre la versión que
-- guarda el repositorio revertiría en silencio cualquier logro que se le haya
-- añadido en esas migraciones sueltas.
--
-- Así que el desbloqueo vive en su propio disparador, sobre su propia tabla, y
-- llama a _try_unlock directamente. Es aditivo de punta a punta: esta migración
-- no modifica ni un objeto que ya exista.
-- ============================================================================

-- ─── La tabla ───────────────────────────────────────────────────────────────
-- Una fila por tanda terminada, de cualquiera de los tres modos. `modo`,
-- `categoria` y `nivel` viajan como texto con check en vez de como enum: los
-- filtros de la pantalla incluyen 'todas' y 'todos', que no son valores del
-- dominio sino la ausencia de filtro, y un enum obligaría a inventarlos.
create table if not exists public.user_psico_attempts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  modo        text not null check (modo in ('entrenamiento', 'evaluacion', 'simulacion')),
  categoria   text not null check (categoria in ('abstracto', 'espacial', 'numerico', 'todas')),
  nivel       text not null check (nivel in ('basico', 'intermedio', 'avanzado', 'todos')),
  total       int  not null check (total >= 0),
  correctas   int  not null default 0 check (correctas >= 0),
  -- Precisión: porcentaje de acierto sobre el total de la tanda.
  score       int  not null check (score between 0 and 100),
  -- Velocidad: cuánto del tiempo disponible sobró, en promedio.
  velocidad   int  not null default 0 check (velocidad between 0 and 100),
  -- Global: 70% precisión, 30% velocidad. Es el número del simulacro.
  global      int  not null default 0 check (global between 0 and 100),
  taken_at    timestamptz not null default now(),
  constraint psico_correctas_cabe check (correctas <= total)
);

comment on table public.user_psico_attempts is
  'Tandas terminadas del módulo de pruebas psicotécnicas (Ingreso a aerolínea). Una fila por sesión; el detalle de respuestas no se guarda porque cada tanda se sortea distinta.';

create index if not exists idx_psico_user_modo_global
  on public.user_psico_attempts (user_id, modo, global desc);

alter table public.user_psico_attempts enable row level security;

drop policy if exists "psico_select_own" on public.user_psico_attempts;
create policy "psico_select_own" on public.user_psico_attempts
  for select using (auth.uid() = user_id);

drop policy if exists "psico_insert_own" on public.user_psico_attempts;
create policy "psico_insert_own" on public.user_psico_attempts
  for insert with check (auth.uid() = user_id);

-- ─── El logro ───────────────────────────────────────────────────────────────
-- 80 sobre 100 en el simulacro completo. Va cinco puntos por debajo del
-- simulacro de entrevista técnica a propósito: aquí el global ya castiga la
-- lentitud aparte del acierto, así que exigir 85 sería exigir dos cosas a la vez.
insert into public.module_thresholds (code, total, nota) values
  ('psico_simulacro_pass', 80, 'Umbral del Simulacro Psicotécnico; el global pesa 70% precisión y 30% velocidad')
on conflict (code) do update set total = excluded.total, nota = excluded.nota;

insert into public.achievements (code, name, description, icon, tier, order_index) values
  ('psico_simulacro', 'Psicotécnicas superadas', 'Aprobaste el Simulacro Psicotécnico de 30 ejercicios', '🧠', 'gold', 18)
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon,
  tier = excluded.tier,
  order_index = excluded.order_index;

-- ─── El desbloqueo, en su propia función ────────────────────────────────────
-- Solo el simulacro cuenta: una tanda de entrenamiento de diez ejercicios
-- filtrada por la familia que mejor se te da no prueba nada.
create or replace function public.check_psico_achievement()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_umbral int;
begin
  if new.modo <> 'simulacion' then
    return new;
  end if;

  select total into v_umbral
    from public.module_thresholds
    where code = 'psico_simulacro_pass';

  if coalesce(new.global, 0) >= coalesce(v_umbral, 80) then
    perform public._try_unlock(new.user_id, 'psico_simulacro');
  end if;

  return new;
end;
$$;

-- Trampa de Postgres: `create or replace function` devuelve EXECUTE a PUBLIC.
revoke all on function public.check_psico_achievement() from public, anon;

-- ─── El disparador ──────────────────────────────────────────────────────────
drop trigger if exists trg_check_achievements_psico on public.user_psico_attempts;
create trigger trg_check_achievements_psico
  after insert or update on public.user_psico_attempts
  for each row
  execute function public.check_psico_achievement();
