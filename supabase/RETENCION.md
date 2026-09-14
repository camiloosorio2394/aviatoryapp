# Retención de datos

Hoy la base entera cabe en unos pocos megas: la tabla más grande es
`vault_questions` con 816 kB, y es contenido, no acumulación. El problema no es
el tamaño actual sino el ritmo: hay tablas que crecen una fila por cada cosa que
hace cada piloto y ninguna las poda.

**Este documento no está aplicado.** El SQL de abajo borra filas, y eso lo corre
Camilo cuando decida las ventanas. Hasta entonces nada se borra.

## Qué crece y a qué ritmo

Con 1.000 pilotos activos estudiando 20 preguntas al día:

| Tabla | Una fila por | Al año, estimado | Para qué se guarda |
| --- | --- | --- | --- |
| `vault_access_log` | pregunta pedida **y** pregunta respondida | ~14 M filas | Tope de 100 por hora (mira 1 hora) y rastro de un raspado |
| `ai_interactions` | mensaje del Wingman | ~600 k filas | Historial del chat y cupo del mes |
| `vault_sessions` | tanda del PCA | ~700 k filas | La tanda en curso |
| `psico_sesiones` | tanda de psicotécnicas | ~350 k filas | La tanda en curso y su repaso |
| `evaluacion_sesiones` | intento de evaluación | ~200 k filas | El intento en curso |
| `errores_cliente` | error reportado | acotado por el tope por hora | Ver qué se está rompiendo |
| `notifications` | aviso | ~500 k filas | La campana |
| `daily_activity` | piloto y día | ~365 k filas | El mapa de constancia. **No se poda** |

El único que preocupa de verdad es `vault_access_log`: dos filas por pregunta,
y su razón de existir —el tope por hora— mira una hora hacia atrás. Todo lo
demás es orden, no urgencia.

## Ventanas propuestas

Ninguna toca puntajes ni progreso: los intentos viven en `user_psico_attempts`,
`user_icao_quiz_attempts`, `user_notam_exam_attempts` y compañía, y esas tablas
no se tocan.

| Tabla | Ventana | Por qué esa |
| --- | --- | --- |
| `vault_access_log` | 30 días | El tope mira 1 hora; 30 días deja margen de sobra para revisar un abuso |
| `vault_sessions` | 90 días desde que terminó o venció | Nadie vuelve a una tanda de hace tres meses; el puntaje ya está guardado aparte |
| `psico_sesiones` | 90 días desde `terminada_en` | Igual: el repaso se mira al terminar, no un trimestre después |
| `evaluacion_sesiones` | 90 días desde que terminó | Igual |
| `errores_cliente` | 90 días | Un error de hace tres meses o ya se arregló o ya no importa |
| `notifications` | 90 días **solo las leídas** | Las no leídas se quedan hasta que el piloto las vea |
| `ai_interactions` | 12 meses | Es el historial que el piloto ve. Doce meses es una decisión de producto, no técnica |

## El SQL

Crea la función y la programa con `pg_cron`, que ya está instalado (1.6.4) y ya
corre los cuatro avisos de constancia. Corre a las 3:30 de la mañana en Bogotá
(8:30 UTC), cuando no hay nadie.

```sql
-- ── La función ──────────────────────────────────────────────────────────────
create or replace function private.limpieza_de_retencion()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_log jsonb := '{}'::jsonb;
  v_n bigint;
begin
  delete from public.vault_access_log where accessed_at < now() - interval '30 days';
  get diagnostics v_n = row_count;
  v_log := v_log || jsonb_build_object('vault_access_log', v_n);

  delete from public.vault_sessions
  where coalesce(completed_at, expires_at) < now() - interval '90 days';
  get diagnostics v_n = row_count;
  v_log := v_log || jsonb_build_object('vault_sessions', v_n);

  delete from public.psico_sesiones where terminada_en < now() - interval '90 days';
  get diagnostics v_n = row_count;
  v_log := v_log || jsonb_build_object('psico_sesiones', v_n);

  delete from public.evaluacion_sesiones where terminada_en < now() - interval '90 days';
  get diagnostics v_n = row_count;
  v_log := v_log || jsonb_build_object('evaluacion_sesiones', v_n);

  delete from public.errores_cliente where creado_en < now() - interval '90 days';
  get diagnostics v_n = row_count;
  v_log := v_log || jsonb_build_object('errores_cliente', v_n);

  -- Solo las leídas: un aviso sin leer se queda hasta que lo vean.
  delete from public.notifications
  where read_at is not null and read_at < now() - interval '90 days';
  get diagnostics v_n = row_count;
  v_log := v_log || jsonb_build_object('notifications', v_n);

  delete from public.ai_interactions where created_at < now() - interval '12 months';
  get diagnostics v_n = row_count;
  v_log := v_log || jsonb_build_object('ai_interactions', v_n);

  return v_log;
end;
$$;

revoke all on function private.limpieza_de_retencion() from public;

-- ── El horario ──────────────────────────────────────────────────────────────
select cron.schedule('limpieza-de-retencion', '30 8 * * *',
                     'select private.limpieza_de_retencion()');
```

## Antes de correrlo

Vale la pena ver cuánto se llevaría. Corrido el 14 de septiembre de 2026 daba
182 filas de `vault_access_log`, 2 de `vault_sessions` y cero de todo lo demás:

```sql
select
  (select count(*) from public.vault_access_log where accessed_at < now() - interval '30 days') as vault_access_log,
  (select count(*) from public.vault_sessions where coalesce(completed_at, expires_at) < now() - interval '90 days') as vault_sessions,
  (select count(*) from public.psico_sesiones where terminada_en < now() - interval '90 days') as psico_sesiones,
  (select count(*) from public.evaluacion_sesiones where terminada_en < now() - interval '90 days') as evaluacion_sesiones,
  (select count(*) from public.errores_cliente where creado_en < now() - interval '90 days') as errores_cliente,
  (select count(*) from public.notifications where read_at is not null and read_at < now() - interval '90 days') as notifications,
  (select count(*) from public.ai_interactions where created_at < now() - interval '12 months') as ai_interactions;
```

## Cómo se apaga

```sql
select cron.unschedule('limpieza-de-retencion');
```

Y para ver qué hizo la última vez:

```sql
select start_time, status, return_message
from cron.job_run_details
where jobid = (select jobid from cron.job where jobname = 'limpieza-de-retencion')
order by start_time desc limit 7;
```
