-- =============================================================================
-- PLAN DE ESTUDIO: qué días y a qué hora
-- =============================================================================
--
-- Preguntarle a alguien «¿vas a estudiar?» sirve mucho menos que preguntarle
-- «¿qué días y a qué hora?». Con la meta sola, el recordatorio no tiene de
-- dónde agarrarse y termina siendo un empujón genérico; con el día y la hora
-- puestos por el piloto, el recordatorio le devuelve su propio compromiso.
--
-- Por eso esto es una tabla y no una preferencia en localStorage: el que manda
-- los recordatorios es el servidor, de noche, cuando el piloto no tiene la app
-- abierta. Si vive en el navegador, no hay a quién recordarle nada.
--
-- El plan es del piloto y solo lo toca él: no cambia puntaje, logro, racha ni
-- acceso, así que no necesita función `security definer`. RLS y permisos por
-- tabla alcanzan.

create table if not exists public.plan_de_estudio (
  user_id uuid primary key references auth.users(id) on delete cascade,
  -- 0 = domingo … 6 = sábado, igual que extract(dow).
  dias smallint[] not null,
  -- Hora local del piloto, no del servidor: un piloto en Lima no estudia a la
  -- hora de Bogotá.
  hora time not null,
  zona text not null default 'America/Bogota',
  minutos_meta smallint not null default 20,
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now(),
  constraint plan_dias_no_vacio check (cardinality(dias) between 1 and 7),
  constraint plan_dias_en_rango check (dias <@ array[0,1,2,3,4,5,6]::smallint[]),
  constraint plan_minutos_razonables check (minutos_meta between 5 and 240)
);

comment on table public.plan_de_estudio is
  'Qué días y a qué hora dijo el piloto que iba a estudiar. Lo usa el recordatorio nocturno.';
comment on column public.plan_de_estudio.dias is
  'Días de la semana, 0 = domingo. El disparador los ordena y les quita repetidos.';
comment on column public.plan_de_estudio.zona is
  'Zona horaria IANA del piloto. El disparador falla si no existe.';

-- Normaliza los días y valida la zona en el mismo sitio, para que la tabla no
-- pueda guardar `{3,3,1}` ni una zona inventada. Un CHECK no puede hacer
-- ninguna de las dos cosas (la primera necesita subconsulta, la segunda
-- necesita pg_timezone_names).
create or replace function private.normalizar_plan_de_estudio()
returns trigger
language plpgsql
security definer
set search_path = ''
as $normaliza$
declare
  v_prueba timestamptz;
begin
  new.dias := (select array_agg(distinct d order by d) from unnest(new.dias) as d);

  -- Referenciar la zona ya la valida: Postgres levanta invalid_parameter_value
  -- si no existe. Se hace aquí para que el error salga al guardar y no de noche,
  -- cuando el recordatorio intente calcular la hora local.
  v_prueba := now() at time zone new.zona;
  perform v_prueba;

  new.actualizado_en := now();
  return new;
end;
$normaliza$;

drop trigger if exists trg_normalizar_plan_de_estudio on public.plan_de_estudio;
create trigger trg_normalizar_plan_de_estudio
  before insert or update on public.plan_de_estudio
  for each row execute function private.normalizar_plan_de_estudio();

alter table public.plan_de_estudio enable row level security;

create policy "plan_de_estudio_select_own"
  on public.plan_de_estudio for select
  using ((select auth.uid()) = user_id);

create policy "plan_de_estudio_insert_own"
  on public.plan_de_estudio for insert
  with check ((select auth.uid()) = user_id);

create policy "plan_de_estudio_update_own"
  on public.plan_de_estudio for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Solo lo que usan esas políticas. Sin delete: quitar el plan es dejarlo en un
-- solo día, no borrar la fila.
grant select, insert, update on table public.plan_de_estudio to authenticated;
