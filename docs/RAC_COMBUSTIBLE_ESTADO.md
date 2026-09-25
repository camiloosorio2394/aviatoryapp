# Módulos «RAC» y «Gestión del combustible» · estado del trabajo

**Para quien retome esto** (incluida una sesión futura de Claude Code): qué está
hecho, qué falta correr en la base y qué queda pendiente. Actualízalo al
terminar cada paso.

## Qué son

Dos temas nuevos de «Ingreso a aerolínea», con la misma casa que los demás:
hub con tres puertas (Aprende, Practica, Evalúate), el lector compartido
(`LectorLeccion`), la práctica con corrección inmediata y la evaluación con el
banco en el servidor.

| | RAC | Gestión del combustible |
|---|---|---|
| Ruta | `/app/aerolinea/rac` | `/app/aerolinea/combustible` |
| Lección | 19 unidades en 5 bloques, 140 min | 23 capítulos en 3 partes, 151 min |
| Práctica | 54 preguntas (`u05-q2`) | 66 preguntas (`c06-q1`) y 10 escenarios (`esc-03`) |
| Evaluación | 20 al azar de 50, aprueba con 80 | 20 al azar de 40, aprueba con 80 |
| Acento | grafito pizarra `#3D4958` (`--av-rac-*`, `.lector-rac`) | azul queroseno `#005071` (`--av-cb-*`, `.lector-cb`) |
| Fuente editorial | `docs/contenido/rac.md` | `docs/contenido/gestion-combustible.md` |

## De dónde sale cada cosa

Los documentos de `docs/contenido/` son la fuente. Todo lo demás se genera:

```
node scripts/rac/convertir.mjs          # racLeccion.ts, racPractica.ts, contenido/bancos/rac_evaluacion.json
node scripts/combustible/convertir.mjs  # combustibleLeccion.ts, combustiblePractica.ts, contenido/bancos/combustible_evaluacion.json
```

Si cambia el contenido: se corre el convertidor, luego
`ACTUALIZAR_CATALOGO=1 npx vitest run scripts/catalogo` si cambiaron las claves
de práctica, y `node scripts/bancos/sembrar.mjs <banco>` si cambió el banco.
`src/lib/racContenido.test.ts` y `src/lib/combustibleContenido.test.ts` fallan
si lo generado ya no cuadra con el documento.

**Las preguntas no van en las lecciones** (regla de Camilo): el quiz de cada
unidad o capítulo es la práctica, y el quiz final es la evaluación del servidor.
Los diez escenarios del capítulo 23 son `piensaComoPiloto` con `clave`: abrir
la respuesta cuenta como práctica hecha.

## Qué se hizo

- **Contenido** auditado contra los RAC de la Aerocivil (descargados el
  24-sep-2026) y contra RAC 121, OACI (Anexo 6, Doc 9976), EASA y FAA para
  combustible. Las claves de las 210 preguntas (54 y 50 de RAC, 66 y 40 de
  combustible) las revisaron agentes independientes: cero errores de clave. Las explicaciones no nombran letras,
  porque el servidor baraja las opciones.
- **App**: `src/lib/rac.ts` y `src/lib/combustible.ts` (rutas, conteos,
  resumen), sus `*Progress.ts` sobre el progreso común, las pantallas
  (`Rac*.tsx`, `Combustible*.tsx`), las rutas en `App.tsx`, las tarjetas en
  `AirlinePrep.tsx` (con su hueco de portada), los temas del lector en
  `index.css` y las reglas de contenido pesado en `eslint.config.js`.
- **`PracticaQuiz`** (`src/components/modulo/PracticaQuiz.tsx`): la pantalla de
  práctica de opción múltiple, compartida. Filtro por unidad, avance, salto a
  cualquier pregunta, corrección al instante con la explicación, el numeral y
  el enlace para repasar la unidad. Un módulo nuevo con preguntas de práctica
  la configura; no escribe otra.
- **Dos arreglos al lector compartido**, que también le sirven a Performance:
  - Sin portada automática, el primer bloque solo sale de la columna si es una
    imagen (`figura` o `hueco`). Un párrafo de entrada salía más ancho que el
    resto del texto; pasaba también en las 40 lecciones de Performance.
  - En la ficha «Piensa como piloto», la pestaña le deja su sitio a la píldora
    («Escenario de práctica»): un momento largo pasaba por debajo de ella.
- **Base**: una sola migración para los dos,
  `supabase/migrations/20260928000000_modulos_rac_y_combustible.sql`
  (por qué una sola: en su cabecera). Semillas de los bancos en
  `supabase/seeds/`. Prueba en `supabase/tests/rac_y_combustible.sql` y casos
  nuevos en `logros.sql`.

## Lo que falta correr en la base

**Nada de esto está aplicado.** Va **después de los pasos de Comunicaciones**
(`docs/COMUNICACIONES_ESTADO.md`, «Lo que le queda por correr a Camilo»),
porque copia las funciones compartidas de sus migraciones. Cada paso en **su
propia ejecución** del SQL Editor:

| # | Qué se pega en el SQL Editor | Resultado esperado |
|---|---|---|
| 1 | `supabase/migrations/20260928000000_modulos_rac_y_combustible.sql` | Sin error (avisos de «does not exist, skipping» por políticas y disparadores, normales) |
| 2 | `supabase/seeds/rac_evaluacion.sql` (50 preguntas) | Sin error |
| 3 | `supabase/seeds/combustible_evaluacion.sql` (40 preguntas) | Sin error |
| 4 | Las pruebas, una por ejecución: `supabase/tests/rac_y_combustible.sql`, `logros.sql`, `permisos.sql`, `panel.sql` | Cada una termina en el error `PRUEBA_DESHECHA …` (eso es pasar) |

El catálogo de la práctica (las 54 y las 76 claves) ya va dentro de la
migración; no hace falta `scripts/catalogo/sembrar.mjs` salvo que el contenido
cambie después.

Lo que tiene que decir `rac_y_combustible.sql`, por cada módulo (`rac:` y
`combustible:`): `catalogo_N_y_umbrales reglas_20_y_80 banco_N_bien_formado
permisos leccion_fuera leccion_cero practica_inventada clave_ajena
rpc_idempotente sin_update_directo sin_intento_a_mano puerta_cerrada_con_N-1
puerta_abierta_con_N terminar_escribe_en_su_tabla sin_sesion conteos
logros_los_cuatro`, y al final `modulos_de_antes terminar_enruta_a_todos
panel_con_los_nueve grupos_de_logros`. `logros.sql`: la lista de antes con
`rac_con_catalogo combustible_con_catalogo` después de
`comunicaciones_con_catalogo`.

**La prueba se escribió sin base donde correrla**: sigue línea por línea la de
Comunicaciones. Si falla por un nombre o un tipo, se corrige la prueba; si falla
por una regla, la migración.

Qué pasa si se cambia el orden:

- La migración antes que las de Comunicaciones: las funciones se crean igual,
  pero nombran tablas de Comunicaciones que todavía no existen y el panel de
  todos se caería al usarlas. **El orden no es opcional.**
- Una migración de Comunicaciones (o de Aeropuertos) corrida **después** de
  esta: republica las funciones compartidas sin las ramas de RAC y Combustible,
  y el panel y los logros los pierden. Se arregla corriendo esta otra vez (se
  puede: todo es `if not exists`, `on conflict` o `create or replace`).
- Semillas antes que la migración: funcionan (el banco no depende de ella), pero
  la evaluación no abre hasta que existan sus reglas.
- Mientras no se aplique: las pantallas funcionan, el progreso se guarda en el
  navegador y la evaluación no abre.

Después de aplicar:

```sql
select version, name from supabase_migrations.schema_migrations
where name = 'modulos_rac_y_combustible';
```

El archivo se renombra con esa versión (y las dos menciones en
`src/lib/racProgress.ts` y `src/lib/combustibleProgress.ts`, y las de
`supabase/tests/`), y `ULTIMA_APLICADA` sube en
`supabase/HISTORIAL_DE_MIGRACIONES.md`.

## Pendiente

- [ ] **Imágenes.** Las tarjetas y el hub muestran sus huecos rotulados:
      `RAC-TEMA`, `RAC-HUB-01..03`, `CB-TEMA`, `CB-HUB-01..03`. Las lecciones
      no tienen portada (`portadaAuto: false`); cuando existan, van a
      `public/modulos/rac/leccion-NN.webp` y
      `public/modulos/combustible/leccion-NN.webp` y se quita ese `false`.
      Combustible tiene además 15 figuras con hueco rotulado dentro de los
      capítulos (`CB_FIGURAS_PENDIENTES`).
- [ ] **Video de apertura** de cada módulo, con la serie de HyperFrames (ver
      CLAUDE.md, «Trampa del idioma de la voz»).
- [ ] **Los temas a repasar de la evaluación.** `evaluacion_iniciar` entrega el
      tema de cada pregunta desde `evaluacion_fuentes.etiqueta`, no desde
      `metadatos.tema`. Con un solo banco y etiqueta nula, el resultado no dice
      qué unidades repasar (pasa también con Performance). Propuesta:
      `coalesce(ef.etiqueta, bp.metadatos ->> 'tema')` en `evaluacion_iniciar`.
      Es un cambio que toca a todos los módulos: va aparte, con su prueba.
- [ ] **Performance no tiene tarjeta en «Ingreso a aerolínea»**: sigue en
      `TEMAS_EN_CAMINO` («Performance y planificación») aunque el módulo ya
      existe en `/app/aerolinea/performance`. Va aparte.

## Lo que el convertidor simplifica

Para revisar si alguna vez se nota en pantalla:

- `renderInline` no tiene itálicas: las del documento se quitan.
- Las referencias al «Anexo B» del documento quedan como texto; el anexo de
  fuentes no está en la app.
- Las sublistas se aplanan en una sola lista.
- Las unidades largas (RAC 121, RAC 91) van en una sola lección; no se
  partieron en dos.
