# Errores del cliente: revisión del 2026-09-24

Ventana: últimos 30 días de `errores_cliente` (desde el 2026-08-25). Leída en solo lectura
con SQL que reproduce `scripts/errores/agrupar.mjs`: contexto más primera línea del mensaje
(tope de 400 caracteres), quitando ids, URLs, fechas ISO y números, y ordenado por pilotos
distintos y luego por reportes.

## Resultado: la tabla está casi vacía

**6 filas, 2 grupos, 1 solo piloto.** Todas entre el 13 y el 15 de septiembre, ninguna en
los últimos nueve días, y todas con `version_app` vacía (el cliente que las mandó no traía
`VITE_VERCEL_GIT_COMMIT_SHA`, así que lo más probable es que fuera `npm run dev` y no un
build de Vercel). No hay cinco grupos que revisar ni un fallo que afecte a varios pilotos.

| # | Contexto | Mensaje normalizado | Pilotos | Reportes | Primera vez (UTC) | Última vez (UTC) | Ruta |
|---|---|---|---|---|---|---|---|
| 1 | `bitácora: cargar` | `<n>: column bitacora_resumen.minutos_ultimos_90_dias does not exist` | 1 | 4 | 2026-09-13 13:57 | 2026-09-13 14:53 | `/app/logbook` |
| 2 | `dashboard: tarjetas` | `panel: postulaciones no es una lista` | 1 | 2 | 2026-09-15 13:25 | 2026-09-15 13:42 | `/app` |

## Causa y estado

### 1. `bitácora: cargar`: columna que no existía

- **Dónde**: `src/services/bitacora.ts` pide `minutos_ultimos_90_dias` (y las demás columnas
  de horas de carrera) a la vista `bitacora_resumen`.
- **Causa**: el cliente corrió antes de que la base tuviera la migración
  `horas_de_carrera` (que agrega esas columnas). Desfase entre cliente y base durante el
  desarrollo.
- **Hoy**: la columna existe en producción (`information_schema.columns` la lista junto con
  `minutos_ultimos_365_dias` y `aterrizajes_ultimos_90_dias`) y el fallo no se repitió
  después del 13 de septiembre.
- **Estado**: resuelto solo, sin cambio de código.

### 2. `dashboard: tarjetas`: `postulaciones` no era una lista

- **Dónde**: `leerTarjetasPanel` en `src/services/panel.ts`, que valida la respuesta de
  `panel_tarjetas`.
- **Causa**: la versión del lector que se estaba probando exigía una lista en
  `postulaciones` y la función de producción no trae ese campo. La guarda
  `d.postulaciones === undefined ? []` entró con #219 (commit `2aa07b7`, 13:46 UTC del 15 de
  septiembre), cuatro minutos después del último reporte.
- **Hoy**: el lector trata la ausencia del campo como «ninguna postulación», y ya lo cubre
  `src/services/panel.test.ts`. Sin reportes desde entonces.
- **Estado**: arreglado antes de esta revisión (en #219), sin cambio en este commit.

## Hallazgo aparte: el historial de migraciones no calza con producción

Revisando el grupo 2 salió esto, que no es un error reportado pero sí explica por qué el
panel de producción no trae postulaciones:

- La última fila de `supabase_migrations.schema_migrations` es `20260914125703`
  (`latido_para_que_el_proyecto_no_se_duerma`).
- En el repo hay siete migraciones posteriores: `20260914230000_modulo_aerodinamica`,
  `20260915120000_postulaciones`, `20260915120500_aviso_de_postulacion`,
  `20260915121000_seguimiento_de_postulaciones`, `20260915140000_panel_completo`,
  `20260915230000_evaluacion_de_aeropuertos` y `20260916000000_progreso_de_aeropuertos`.
- **Aerodinámica sí está aplicada pero no registrada**: existe
  `public.user_aerodinamica_exam_attempts` y `panel_tarjetas` ya devuelve `aerodinamica`.
- **Postulaciones no está aplicada**: `to_regclass('public.postulaciones')` da nulo, y
  `panel_tarjetas` no tiene `plan` ni `postulaciones`.

Consecuencia: en producción `src/services/postulaciones.ts` (pantalla `MisPostulaciones`,
tira de `CompromisosDeHoy`) consulta una tabla que no existe. Si un piloto entra ahí, el
error llegará como `postulaciones: …` a `errores_cliente`; en esta ventana no hay ninguno.
Las de aeropuertos no se revisaron objeto por objeto.

**Propuesta (no ejecutada, la corre Camilo)**:

1. Ver qué quedó aplicado de cada una, sin tocar nada:

   ```sql
   select to_regclass('public.postulaciones')              as postulaciones,
          to_regclass('public.user_aerodinamica_exam_attempts') as aerodinamica;
   select version, name from supabase_migrations.schema_migrations
   where version >= '20260914' order by version;
   ```

2. Aplicar en orden las que falten (`20260915120000` en adelante) desde sus archivos, con la
   prueba en bloque `do` de siempre, y correr `supabase/tests/permisos.sql` después.
3. Para la de aerodinámica, que ya está en la base, registrar la fila o anotar la
   diferencia en `supabase/HISTORIAL_DE_MIGRACIONES.md`, como se hizo con las anteriores.

## Cómo se leyó

```sql
with f as (
  select user_id, creado_en, ruta, version_app,
         coalesce(contexto, 'sin contexto') as ctx,
         btrim(split_part(coalesce(mensaje, ''), E'\n', 1)) as l
  from public.errores_cliente
  where creado_en >= now() - interval '30 days'
), n as (
  select *, btrim(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(
           case when length(l) > 400 then left(l, 399) || '…' else l end,
           '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', '<id>', 'gi'),
           'https?://\S+', '<url>', 'gi'),
           '\d{4}-\d{2}-\d{2}T[\d:.]+Z?', '<fecha>', 'g'),
           '\y\d+\y', '<n>', 'g'),
           '\s+', ' ', 'g')) as norm
  from f
)
select ctx as contexto, norm as mensaje,
       count(distinct user_id) as pilotos, count(*) as reportes,
       min(creado_en) as primero, max(creado_en) as ultimo
from n
group by ctx, norm
order by pilotos desc, reportes desc;
```

Comprobaciones del árbol en este commit: `npx tsc -b`, `npx eslint src` y `npx vitest run`
(54 archivos, 544 pruebas) en verde.
