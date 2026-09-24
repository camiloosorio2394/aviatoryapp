# Revisión de pendientes (24 de septiembre de 2026)

Revisión de `docs/PENDIENTES_CAMILO.md` (última actualización: 10 de septiembre de
2026) contra el repo en `main` (`94c3105`, PR #255) y contra producción
(`gvwqmfxphsbmbrhyjcmk`), consultada **solo en lectura** (`list_migrations` y
`select`). No se tocó `PENDIENTES_CAMILO.md`, ni código, ni la base: esta lista es
para que Camilo decida qué se borra de allá.

Estados:

- **CERRADO**: hay evidencia en el repo o en la base de que ya no hace falta nada.
- **ABIERTO**: falta algo; se dice qué y de quién depende.
- **NO VERIFICABLE**: no se puede comprobar desde el repo ni con `select` (consola de
  Auth, un teléfono, papel, una persona).

Limitación: el clon tiene solo los últimos 50 commits (desde el 14 de septiembre), así
que la evidencia de git más vieja sale del contenido de los archivos, no del log.

---

## Parte A · Estado por sección

### URGENTE · Recuperación de contraseña

| Punto | Estado | Evidencia / qué falta |
|---|---|---|
| Flujo `/recuperar` y `/nueva-clave` | CERRADO (código) | Rutas en `src/App.tsx:162-163`. |
| 1 · Redirect URLs en Supabase Auth | NO VERIFICABLE | Es configuración de Auth; no se lee con SQL ni con las herramientas disponibles. Depende de Camilo (consola). |
| 2 · SMTP propio | ABIERTO | Sigue sin dominio: `aviatory.app` y `aviatoryapp.com` no resuelven desde este contenedor (control: `github.com` sí resuelve). La config SMTP en sí no es verificable desde aquí. Depende de conseguir dominio (Camilo). |
| 3 · Plantilla del correo en español | NO VERIFICABLE | Consola de Auth. Camilo. |
| Relacionado | ABIERTO | `hola@aviatory.app` sigue impreso en `src/pages/Contact.tsx`, `Privacy.tsx` y `Community.tsx`, y esa dirección no puede recibir correo mientras no haya dominio. |

### 0 · Tanda del 2 de agosto

| Punto | Estado | Evidencia / qué falta |
|---|---|---|
| 0.1 · Migración `paginas_biblioteca` | **ABIERTO (anomalía)** | La fila `20260802050000 paginas_biblioteca` está en `schema_migrations` (3 sentencias, que sí nombran `set_library_item_pages`), pero **la función no existe en producción** (ninguna función con «page» o «pagina» en `pg_proc`). Ninguna otra migración la borra. El cliente la sigue llamando (`src/lib/biblioteca.ts:233`) y falla en silencio con `console.warn`. Coincide con que RAC 2, RAC 61, RAC 67 y RAC 121 siguen con `paginas = null`. No se pudo averiguar cuándo desapareció. Camilo: volver a correr el archivo (es `create or replace` + `revoke` + `grant`). |
| 0.2 · Los cinco destacados | ABIERTO | Hoy hay 5 con `destacado = true`: RAC 175, LAR 175, Banco PCA, RAC 2 y RAC 61. Decisión de curaduría de Camilo. |
| 0.3 · Aviso de vigencia solo en la ficha | CERRADO (informativo) | Sigue en `src/pages/BibliotecaDocumento.tsx`. No pedía acción salvo que Camilo lo quiera también en el estante. |
| 0.4 · Bloque de imagen | CERRADO | `kind: "figura"` existe en `src/lib/docBlocks.ts:28`; los módulos ya usan imágenes. |
| 0.5 · ICAO Parte 2 y Parte 3 sin avance | ABIERTO | `src/lib/icaoProgress.ts` sigue diciendo que no guardan nada. Decisión de contenido (qué cuenta como hecho), Camilo. |
| 0.6 · Tarjeta «3x más rápido» en la landing | ABIERTO | Sigue en `src/components/landing/Stats.tsx` (`value: 3, suffix: "x"`) y la landing la monta (`src/pages/Landing.tsx:42`). Camilo decide: respaldarla o quitarla. |
| 0.7 · Lector en celular | NO VERIFICABLE | Falta prueba en Android Chrome e iOS Safari reales. Requiere un teléfono. |
| 0.8 · `min-w-0` en `AppLayout` | CERRADO | `src/components/layout/AppLayout.tsx:150` y `:158`, con su comentario en `:134`. |

### 1 · Estado de las migraciones del 1 y 2 de agosto

| Punto | Estado | Evidencia |
|---|---|---|
| `metar_master_condicion`, `simulacro_aerolinea`, `icao_speaking` | CERRADO | Registradas (`20260802004819`, `20260802023239`, `20260802030000` y `20260802221133`). |
| `modulo_mercancias` aplicada a medias | CERRADO | Reaplicada como `20260802221108`. Hoy hay 4 logros (`mercancias_lesson`, `_practice`, `_exam`, `_master`) y los umbrales `mercancias_lesson=14`, `mercancias_practice=49`, `mercancias_pass=80`. |
| `biblioteca_por_modulos` sin aplicar | CERRADO | Registrada (`20260802020000` y `20260802221339`); existen las categorías por módulo y `bump_library_item_views`. |
| `paginas_biblioteca` | ABIERTO | Ver 0.1: registrada pero la función no está. |
| Orden de `check_and_unlock_achievements` | CERRADO (superado) | Los logros se evalúan ahora por grupo (`20260911204915_logros_por_grupo_y_catalogo`). |
| Regenerar tipos | NO VERIFICABLE | No se regeneraron aquí para comparar. |

### 1bis · PDF de la Biblioteca

| Punto | Estado | Evidencia |
|---|---|---|
| Subir RAC 175 y LAR 175 | CERRADO | Los dos están en `storage.objects` del bucket `documentos-oficiales` con el nombre exacto que espera `file_url`. |
| Edición del banco PCA | ABIERTO | `library_items.version` sigue en «Edición sin numerar. Confirmar la vigente con la Aerocivil». Depende de Camilo. |
| Otros (informativo) | ABIERTO | RAC 91 tiene archivo en `file_url` pero no está en el bucket y sigue `is_published = false`. Anexo 18, Doc 9284 e IATA DGR sin archivo ni publicar. |

### 1ter · Tres cosas del brief de la Biblioteca

CERRADO (informativo). Las categorías genéricas ya no están (hoy: Examen PCA, Inglés
ICAO, Meteorología operacional, Mercancías peligrosas, NOTAM, General) y
`bump_library_item_views` existe. La política de storage no se revisó.

### 1quater · Medir el dictado del TEA

ABIERTO. `user_icao_speaking` tiene 2 filas y 1 con `confianza`; el protocolo pide
seis respuestas medidas. No hay en `docs/` un registro de resultados. Requiere una
persona hablando al micrófono (Camilo o Nico). iOS Safari con pantalla apagada: NO
VERIFICABLE sin dispositivo.

### 2 · Diseño de Mercancías no accesible

NO VERIFICABLE desde aquí (acceso al proyecto de claude.ai/design). Además, en buena
parte **superado**: el módulo se rediseñó (`20260909235155_mercancias_rediseno`, PR
#210, #212, #218, #220, #221, #223, #224, #226, #230, #232 y #233) y hoy tiene 14 lecciones en
`src/lib/mercanciasLeccion/` en vez de las 11 secciones de las que habla este punto. Lo
que sigue vigente: el contraste contra el texto del RAC 175. Hay 7 archivos de lección
que citan «RAC 175» y el PDF ya está en el bucket, pero no hay registro de que alguien
haya contrastado el contenido contra él. Camilo decide si el punto se cierra.

### 3 · Color de clase

ABIERTO (decisión). `src/lib/mercanciasClases.ts` sigue con el color real del rombo
(`#E87722` para la clase 1). Nadie dejó por escrito una respuesta de Camilo.

### 4 · Desviaciones del brief (11 secciones, tira de números, «Recuerda»)

CERRADO (superado). Hablan de la estructura de 11 secciones del lector viejo de
Mercancías; el módulo ahora usa el lector compartido `LectorLeccion` con 14 lecciones.

### 5 · La sección se marca leída al entrar

NO VERIFICABLE en esta pasada: no se revisó cómo marca el lector compartido hoy. Era
informativo; no pedía acción.

### 6 · Revisión experta de Mercancías

ABIERTO. El contenido cambió mucho con el rediseño, así que los tres puntos citados
(grupos de embalaje, mercancías ocultas, 4 casos) ya no describen lo que hay. Lo que
sigue haciendo falta es una revisión experta del módulo actual. Camilo.

### 6bis · Alcance del visor

CERRADO (informativo). No pedía acción.

### 7 · Decisiones de antes

| Punto | Estado | Evidencia |
|---|---|---|
| Entrevista técnica, HR y CRM, Psicotécnicos | ABIERTO a medias | Psicotécnicos quedó como tema (ver §8). «Entrevista técnica» y «Entrevista HR y CRM» siguen en `TEMAS_EN_CAMINO` (`src/components/aerolinea/carasDeModulo.ts:43`) y `/app/entrevistas` sigue en la barra con `soon: true` (`src/components/layout/AppSidebar.tsx:78`). Decisión de Camilo. |
| Repetición espaciada | ABIERTO | No hay nada en `src/` que lo implemente. Decisión de plataforma, Camilo. |

### 8 · Pruebas psicotécnicas

| Punto | Estado | Evidencia |
|---|---|---|
| 8.1 · Derechos sobre el material | ABIERTO | Decisión de negocio. Las láminas del A1 ya no llevan logotipo (§12), pero siguen siendo material de terceros. Camilo. |
| 8.2 · ~120 ejercicios sin clave (A2, A3) | ABIERTO | `contenido/bancos/psicotecnicas.json` sigue con 238; producción tiene 238 activos en el banco `psicotecnicas`. Ver también la propuesta de §9.3. |
| 8.3 · Ejercicio 11 (N1) | ABIERTO | `src/data/psicotecnicas/FUENTES.md:100` lo sigue listando fuera. Camilo decide si se rescata con la D corregida a 12. |
| 8.4 · Distractores generados | CERRADO (informativo) | Decisión opcional sobre campo de texto. |
| 8.5 · Visuales del tema | CERRADO (informativo) | |

### 9 · Figuras dibujadas

| Punto | Estado | Evidencia |
|---|---|---|
| 9.1 a 9.3 · Orden y qué hacer con `AB-A2` | ABIERTO | Decisión de Camilo entre los tres caminos. `AB-A2` no está cargado. |
| 9.4 · Motor y verificadores | CERRADO | `psicotecnicasFiguras.ts`, `psicotecnicasSolucionador.ts` y `verificar-figuras.mjs` existen. |
| 9.5 · Matrices del A1 | ABIERTO | `src/data/psicotecnicas/figurasA1.ts` tiene 13: 01, 02, 03, 04, 05, 06, 07, 09, 11, 12, 17, 19, 20. Faltan 08, 10, 13, 14, 15, 16 y 18. |
| 9.5.3 · Matriz 18 | ABIERTO | Necesita que alguien mire el cuadernillo en papel. Camilo o Nico. |
| AB-A1-02 sin refrendo | ABIERTO | `figurasAprobadas.ts:57` sigue con `faltaRefrendo: true`: la aprobó el mismo que la dibujó. Falta una persona. |
| 9.6 · Logotipo de Facebook | CERRADO | Superado por §12. |
| 9.7.1 · Foto del hero prestada | ABIERTO | `src/pages/PsicoHub.tsx:4` sigue usando `psicotecnicas-mano-panel.webp`. Camilo. |
| 9.7.2 · Franja con último acierto | ABIERTO | `PsicoHub.tsx` sigue leyendo `ultimoPorCategoria`. La premisa cambió: los intentos ya se guardan en el servidor (`20260911161250_psicotecnicas_en_el_servidor`), así que el dato de resueltos ya podría salir de la base. Es trabajo de código, no de Camilo. |
| 9.8 · Hexadecimales de la celda de NOTAM | CERRADO (superado) | El subcomponente `Celda` ya no existe en `src/pages/Notam.tsx`. |
| 9.9 · Movimiento | CERRADO (informativo) | El comparador de espaciales queda atado a que se dibujen. |

### 10 · Verificación de respuestas

| Punto | Estado | Evidencia |
|---|---|---|
| 10.1 a 10.3 | CERRADO | Verificadores en `scripts/psicotecnicas/`. |
| 10.4 · Series ambiguas `NU-N2-08-04` y `NU-N2-08-13` | ABIERTO | Siguen en `contenido/bancos/psicotecnicas.json`. Decisión de Camilo. |

### 11 · Historial de migraciones desincronizado

ABIERTO otra vez. Lo que describe (veintiuna aplicadas sin archivo, tres psicotécnicas
con otra versión) **se cerró el 14 de septiembre**: los archivos se renombraron a la
versión de la base (ver `supabase/HISTORIAL_DE_MIGRACIONES.md`, 92 y 92). Pero desde
entonces entraron **7 archivos sin fila en producción**. Detalle y propuesta en la
Parte B.

### 12 · Las veinte láminas del A1

CERRADO en lo que arregla (letras enteras y sin logotipo). Queda abierto lo mismo de
9.5 (dibujar las siete).

### 13 · Damero de las láminas espaciales

| Punto | Estado | Evidencia |
|---|---|---|
| 13, 13.1, 13.2 | CERRADO | `limpiar-espacial.mjs` y `laminasEspacialLimpias.ts` existen. |
| 13.3 · Ocho ejemplos mordidos | NO VERIFICABLE en esta pasada | No se abrieron las imágenes. Según el texto, requieren volver al PDF a mano. |

### 14 · Reportar un fallo desde la app

CERRADO. `content_reports` existe en producción (migración `20260910183616`). Hoy tiene
**0 filas**: no hay reportes que leer. (`errores_cliente` tiene 6 filas; no es de esta
sección, pero conviene correr `node scripts/errores/resumen.mjs`.)

### 15 · Cinco matrices más del A1

CERRADO (lo hecho). Lo pendiente es 9.5 y el refrendo de la 02.

### 16 · Meteorología

| Punto | Estado | Evidencia |
|---|---|---|
| 16.1 · Migración `teoria_del_clima` | CERRADO | Registrada `20260911015546`; `metar_lesson = 30` en `module_thresholds`. |
| 16.3 · Veinte huecos de imagen | CERRADO en lo principal | PR #227 y #228 («todas las figuras en código»): no queda ningún bloque `hueco` en `src/lib/meteorologiaLeccion/`. Las tres fotos de nubes existen (`public/modulos/meteorologia/mt-t08-02/03/04-*.webp`). Ojo: #241 dice que **ocho portadas son provisionales**; eso queda abierto para Camilo. |
| 16.4 · Video sin audio | CERRADO | `public/modulos/meteorologia/intro.mp4` (3,8 MB) entró en #210 y trae pista de audio (el contenedor tiene la marca `mp4a`; no hay `ffprobe` para más). `audio_request.json` lleva `"lang": "es"`. **Pero** `videos/meteorologia-modulo-intro/PENDIENTE-AUDIO.md` sigue diciendo que falta el audio: está desactualizado. No se verificó si se regeneró con los tokens turquesa de `main`. |
| 16.5 · Decisión sobre las figuras | CERRADO (superado) | Se dibujaron en código. |
| 16.6 · `orden_por_niveles` | CERRADO | Registrada `20260911030000`. |

### Pendientes nuevos que no están en el documento

- **Aerodinámica, Postulaciones, Panel y Aeropuertos**: migraciones sin registrar o sin
  aplicar. Ver Parte B.
- **Conflicto de orden entre dos migraciones sin aplicar** (Parte B, punto B.3): si se
  aplican tal como están, el panel pierde el plan de estudio y las postulaciones.
- `docs/AEROPUERTOS_ESTADO.md` tiene su propia lista «Lo que le queda por correr a
  Camilo» que no está enlazada desde `PENDIENTES_CAMILO.md`.

---

## Parte B · Historial de migraciones contra producción

Producción (`list_migrations`, 24 de septiembre de 2026): **92 filas**, la última
`20260914125703_latido_para_que_el_proyecto_no_se_duerma`.
Repo (`supabase/migrations/`): **99 archivos**.

### B.1 · Cruce

| Caso | Resultado |
|---|---|
| Filas de producción sin archivo | **Ninguna.** Las 92 tienen archivo con la misma versión y el mismo nombre. |
| Archivos sin fila en producción | **7** (tabla de abajo). |
| Nombres repetidos | 3: `modulo_mercancias`, `icao_speaking` y `biblioteca_por_modulos`. Cada uno tiene **dos filas en producción y dos archivos**, con las mismas versiones. |

Los 7 archivos sin fila, con lo que se comprobó en la base de cada uno:

| Archivo | ¿Está aplicado? | Evidencia en producción |
|---|---|---|
| `20260914230000_modulo_aerodinamica.sql` | **Sí, sin registrar** | Existen `user_aerodinamica_progress`, `user_aerodinamica_exam_attempts`, `aerodinamica_mark_progress`, los 4 logros `aerodinamica_*`, los umbrales, la fila en `modulos_contenido` y en `evaluaciones`, 40 preguntas activas en `aerodinamica_evaluacion`, el CHECK de `destino` con `aerodinamica`, y `evaluacion_terminar` y `panel_tarjetas` mencionan `aerodinamica`. |
| `20260915120000_postulaciones.sql` | No | No existe la tabla `postulaciones`. |
| `20260915120500_aviso_de_postulacion.sql` | No | `notification_type` no tiene `postulacion_seguimiento`. |
| `20260915121000_seguimiento_de_postulaciones.sql` | No | No existe `private.preguntar_por_postulaciones`. |
| `20260915140000_panel_completo.sql` | No | `panel_tarjetas` no menciona `postulaciones` (sí `aerodinamica`, que viene de la migración anterior). |
| `20260915230000_evaluacion_de_aeropuertos.sql` | No | No existe `user_aeropuertos_exam_attempts`; el CHECK de `destino` no incluye `aeropuertos`; `evaluacion_terminar` no lo menciona. |
| `20260916000000_progreso_de_aeropuertos.sql` | No | No existe `user_aeropuertos_progress` ni `aeropuertos_mark_progress`; `modulos_contenido` tiene solo notam, metar, mercancias y aerodinamica. |

Que Aerodinámica esté aplicada sin fila quiere decir que se corrió en el SQL Editor. La
versión real de su aplicación no se puede saber desde la base (el editor no deja
marca), así que se registra con la del archivo.

### B.2 · Dos notas sobre `HISTORIAL_DE_MIGRACIONES.md`

1. **Cifra desactualizada.** Dice «92 y 92» y que «el repo tiene un archivo por fila»;
   hoy son 92 filas y 99 archivos. CLAUDE.md repite la regla.
2. **Una afirmación que no cuadra con la base.** Dice que
   `20260802221500_fix_search_path_bump_library_views` «aparece dos veces en la base».
   No: su otra fila es `20260802040000_fix_search_path_bump_views`, con **otro nombre**.
   Los repetidos por nombre son `modulo_mercancias`, `icao_speaking` y
   `biblioteca_por_modulos`. No se volvió a comparar aquí el contenido de las dos filas
   de cada par (el `md5` de `statements` difiere, pero están partidas distinto: 30
   sentencias contra 1, 10 contra 1, 14 contra 1, así que esa comparación no dice nada).

Los nombres repetidos **no hay que alinearlos**: son dos filas reales en producción, y
el repo ya tiene un archivo por fila, con la versión de cada una. Renombrarlos
rompería el cruce.

### B.3 · Conflicto entre `panel_completo` y `progreso_de_aeropuertos`

Las dos hacen `create or replace function public.panel_tarjetas()`:

- `20260915140000_panel_completo.sql` agrega al panel `plan` (de `plan_de_estudio`) y
  `postulaciones`, que el cliente ya espera (`src/services/panel.ts:64-66` y `:153-157`).
- `20260916000000_progreso_de_aeropuertos.sql` se escribió leyendo la función de
  producción el 16 de septiembre, cuando `panel_completo` no estaba aplicada: **su
  versión no tiene ni `plan` ni `postulaciones`** (0 menciones de `postulaciones`).

Aplicadas en orden de versión, la de Aeropuertos pisa a la de `panel_completo` y el
panel vuelve a quedar sin plan ni postulaciones. Antes de aplicar hay que regenerar la
función de `20260916000000` sobre la de `20260915140000` (sumar la rama de
`aeropuertos` a la versión con plan y postulaciones). Es un cambio de código en una
migración, fuera del alcance de esta revisión.

### B.4 · Propuesta para alinear (no ejecutada)

Nada de esto se corrió. Va en orden:

1. **Registrar Aerodinámica**, que ya está aplicada. Con el CLI enlazado:
   ```bash
   supabase migration repair --status applied 20260914230000
   ```
   o insertar la fila `('20260914230000', 'modulo_aerodinamica')` en
   `supabase_migrations.schema_migrations`. El archivo no se renombra.
2. **Arreglar B.3** en el archivo `20260916000000_progreso_de_aeropuertos.sql` antes de
   aplicar nada de Aeropuertos.
3. **Aplicar las otras seis** (Camilo, SQL Editor o MCP), en este orden y cada una en su
   propia ejecución (`aviso_de_postulacion` agrega un valor de enum que no se puede
   usar en la misma transacción):
   1. `20260915120000_postulaciones`
   2. `20260915120500_aviso_de_postulacion`
   3. `20260915121000_seguimiento_de_postulaciones`
   4. `20260915140000_panel_completo`
   5. `20260915230000_evaluacion_de_aeropuertos` y después la siembra
      `node scripts/bancos/sembrar.mjs aeropuertos_evaluacion`
   6. `20260916000000_progreso_de_aeropuertos` (ya corregida)
4. **Renombrar cada archivo con la versión que registre la base**, como manda CLAUDE.md:
   ```sql
   select version, name from supabase_migrations.schema_migrations
   where name in ('postulaciones','aviso_de_postulacion','seguimiento_de_postulaciones',
                  'panel_completo','evaluacion_de_aeropuertos','progreso_de_aeropuertos');
   ```
   Si se aplican por MCP la versión será la hora de aplicación, así que los seis
   archivos cambian de nombre (`git mv 20260915120000_postulaciones.sql
   <version>_postulaciones.sql`, etc.) y se agregan a la tabla «Versiones renombradas»
   de `HISTORIAL_DE_MIGRACIONES.md`. Si se aplican con `supabase db push`, conservan la
   versión del archivo y no hay renombre.
5. **Correr las pruebas** que ya están en el repo contra la base migrada:
   `supabase/tests/postulaciones.sql`, `panel.sql`, `aeropuertos_evaluacion.sql`,
   `aerodinamica.sql`, `logros.sql` y `permisos.sql`.
6. **Reparar 0.1** volviendo a correr `20260802050000_paginas_biblioteca.sql` (ya
   registrada, así que no cambia el historial).
7. **Actualizar `HISTORIAL_DE_MIGRACIONES.md`**: la cifra final (99 y 99 si todo sale
   bien), la corrección de B.2 y una línea sobre Aerodinámica registrada a posteriori.
