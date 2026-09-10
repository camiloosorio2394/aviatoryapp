-- ============================================================================
-- Reportes de contenido
--
-- Los tres últimos fallos del módulo de psicotécnicas —la fila de letras
-- cortada, el damero de fondo, el dado sin su cara de arriba— los encontró Nico
-- mirando la pantalla, no ninguno de los seis verificadores. Y no es mala
-- suerte: los verificadores comprueban que la respuesta sea la correcta y que
-- el archivo exista, y ninguno puede mirar si la imagen se ve bien.
--
-- Quien sí mira todas las pantallas, todos los días, es el piloto. Esto es
-- darle dónde decirlo.
--
-- El valor no está en el botón sino en el `ejercicio_id`: un aviso que diga
-- «la imagen se ve mal» no sirve para nada, y uno que diga «ES-E2-10, la figura
-- está cortada» lleva directo a la ficha, al recorte y a la página del
-- cuadernillo del que salió.
--
-- Aditiva de punta a punta: crea su tabla, su índice y sus políticas, y no toca
-- ni un objeto que ya exista. En particular no roza
-- `check_and_unlock_achievements`, por el desfase de historial que explica
-- 20260908010000.
-- ============================================================================

create table if not exists public.content_reports (
  id           uuid primary key default gen_random_uuid(),
  -- Se borra la cuenta y el reporte se queda: el fallo del contenido sigue
  -- existiendo aunque quien lo vio ya no esté.
  user_id      uuid references auth.users(id) on delete set null,
  -- Qué módulo. Texto y no enum: entra uno nuevo cada pocas semanas y no
  -- merece una migración para poder reportarlo.
  modulo       text not null check (char_length(modulo) between 1 and 40),
  -- La pieza que hace útil el reporte. Nulo solo si se reporta la pantalla
  -- entera y no un ejercicio.
  ejercicio_id text check (char_length(ejercicio_id) <= 60),
  motivo       text not null check (motivo in ('imagen', 'respuesta', 'enunciado', 'otro')),
  detalle      text check (char_length(detalle) <= 1000),
  -- Ruta, ancho de pantalla, tema y qué opción había elegido. Va en jsonb
  -- porque lo que hace falta saber cambia según el fallo, y añadir una columna
  -- cada vez que aparece un dato nuevo es una migración por curiosidad.
  contexto     jsonb not null default '{}'::jsonb,
  estado       text not null default 'nuevo'
               check (estado in ('nuevo', 'revisado', 'arreglado', 'descartado')),
  created_at   timestamptz not null default now()
);

comment on table public.content_reports is
  'Fallos de contenido que reportan los pilotos desde la app: imagen ilegible, respuesta que no cuadra, enunciado confuso. El ejercicio_id es lo que hace el reporte accionable.';

-- Se consulta de dos maneras: «qué hay sin revisar» y «qué pasa con este
-- ejercicio». El índice cubre las dos.
create index if not exists idx_reports_estado_fecha
  on public.content_reports (estado, created_at desc);
create index if not exists idx_reports_ejercicio
  on public.content_reports (ejercicio_id) where ejercicio_id is not null;

alter table public.content_reports enable row level security;

-- Cualquiera con sesión puede reportar, y solo a su nombre.
drop policy if exists "reports_insert_own" on public.content_reports;
create policy "reports_insert_own" on public.content_reports
  for insert to authenticated with check (auth.uid() = user_id);

-- Y puede ver los suyos, para saber que se envió. Los reportes de los demás no:
-- llevan texto libre y no hay razón para que un piloto lea lo que escribió otro.
drop policy if exists "reports_select_own" on public.content_reports;
create policy "reports_select_own" on public.content_reports
  for select to authenticated using (auth.uid() = user_id);

-- No hay política de update ni de delete a propósito. Marcar un reporte como
-- revisado es cosa de quien lo atiende, desde la consola con la clave de
-- servicio, no del piloto que lo mandó.
