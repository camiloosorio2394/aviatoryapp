# Módulo «Comunicaciones aeronáuticas y gestión ATC» · estado del trabajo

**Para quien retome esto** (incluida una sesión futura de Claude Code que
arranque sola): este archivo dice qué está hecho y qué sigue. Actualízalo al
terminar cada paso.

## Qué es

Módulo nuevo de «Ingreso a aerolínea»: **69 lecciones en 8 niveles** (los 68
capítulos de la especificación de Camilo y el repaso «50 frases» como lección
69), con el lector compartido (`LectorLeccion`).

El objetivo, en palabras de la especificación: que el piloto termine capaz de
**escuchar, interpretar, confirmar y responder** correctamente a una
comunicación ATC. No es un curso de inglés general ni una lista de fraseología.

**La norma es OACI** (Anexo 10 Vol. II, Doc 4444, Doc 9432). Lo que sea de un
Estado o de un explotador se dice como tal; lo que no tenga fuente cargada va
con un callout `verificar`.

| Nivel | Nombre | Lecciones |
|---|---|---|
| 1 | Fundamentos | 01 a 07 |
| 2 | El idioma | 08 a 11 |
| 3 | Autorizaciones y superficie | 12 a 18 |
| 4 | En ruta y llegada | 19 a 30 |
| 5 | Vigilancia, contingencias y emergencias | 31 a 40 |
| 6 | Data link y operación oceánica | 41 a 50 |
| 7 | Situaciones no normales y factores humanos | 51 a 61 |
| 8 | Práctica y repaso | 62 a 69 |

## Plan, en orden

- [x] **1. Infraestructura** (25-sep-2026). Ver «Qué se hizo» abajo.
- [ ] **2. Contenido**, nivel por nivel, desde `docs/comunicaciones/nivel-N.md`
      hacia `src/lib/comunicacionesLeccion/nivelN.ts`. Una cosa a la vez: un
      nivel por sesión.
- [ ] **3. Portadas** de lección (`public/modulos/comunicaciones/leccion-NN.webp`,
      16:9) y las imágenes de cada lección (huecos `CM-NN-MM`).
- [x] **4. Práctica** (24-sep-2026), conectada. Ver «Qué se hizo (pasos 4 y
      5)». El motor está en `docs/COMUNICACIONES_PRACTICA.md`; el guion
      completo se sigue escribiendo en `comunicacionesPracticaEjemplos.ts`.
- [x] **5. Evaluación** (24-sep-2026), con el banco de 80 en el servidor.
      **SQL escrito y no aplicado**: ver «Lo que le queda por correr a
      Camilo».
- [ ] **6. Video de apertura** (`CM-VID-01`), con la serie de HyperFrames. Antes
      de generar voz: `"lang": "es"` en `audio_request.json` (ver CLAUDE.md,
      «Trampa del idioma de la voz»).

## Qué se hizo (paso 1)

- `src/lib/comunicaciones.ts`: rutas (`/app/aerolinea/comunicaciones` y
  `/aprende`), niveles, total fijo (`CM_LECTURA_TOTAL = 69`), acento
  (`CM_ACENTO`), resumen para Ingreso a aerolínea y respaldo local
  (`aviatory.comunicaciones.progress`).
- `src/lib/comunicacionesLeccion/`: `index.ts` junta los ocho niveles, comprueba
  la numeración y **documenta al inicio el formato de todos los bloques**
  (genéricos, de curso y de piloto) y cómo va un hueco de imagen. `nivel1.ts` a
  `nivel8.ts` traen cada lección con su título y un solo bloque, el marcador
  `EN_REDACCION` (`enRedaccion.ts`).
- **Las lecciones en redacción no cuentan.** El lector compartido ganó un
  campo opcional, `cuenta(n)`: si devuelve false, llegar al pie no marca la
  lección como leída ni registra estudio del día (si no, 69 páginas vacías
  darían el módulo por leído y una racha gratis). Los demás módulos no lo usan
  y no cambian. En cuanto una lección deja de ser solo el marcador, cuenta sola.
- `src/pages/ComunicacionesLeccion.tsx`: el lector, con el tema `lector-cm`.
  Sin entrevistas de nivel ni práctica: el pie de la última lección vuelve al hub.
- `src/pages/Comunicaciones.tsx`: el hub, como el de Aeropuertos, con el espacio
  del video (`CM-VID-01`) y una sola puerta, «1. Aprende» (portada
  `CM-POR-01`). Práctica y evaluación **no se anuncian**: Aeropuertos no tiene
  patrón de «próximamente».
- `src/App.tsx`: el hub dentro de `AppLayout`, el lector en el grupo a pantalla
  completa, junto a los de Aeropuertos.
- `src/pages/AirlinePrep.tsx`: la tarjeta del tema (portada `CM-TEM-01`), con
  el avance de la lección, que por ahora es el avance del tema.
- `src/index.css`: tokens `--av-cm-*` y el tema `.lector-notam.lector-cm`.
- `src/lib/comunicacionesProgress.ts` sobre el progreso común, y la tabla y la
  RPC en `src/integrations/supabase/types.ts`, escritas a mano con la forma de
  la migración.
- `eslint.config.js`: `@/lib/comunicacionesLeccion` solo lo importa su lector.
- `src/lib/leccionesConteo.test.ts`: el total fijo contra el contenido, los
  cortes de nivel de la especificación y el número de lecciones de la migración.

## Qué se hizo (pasos 4 y 5)

### Práctica

- `src/pages/ComunicacionesPractice.tsx`, ruta
  `/app/aerolinea/comunicaciones/practica` (hija de `AppLayout`, junto a las de
  Aeropuertos). Misma casa que `AeropuertosPractice`: cabecera (hueco
  `CM-PRA-01`), pestañas, barra de avance, tira de saltos y el ejercicio. Los
  diez tipos van en los cuatro verbos del módulo más el vuelo completo:
  **Escuchar** (¿es para mí?, ráfaga, copia), **Interpretar** (desármala,
  panel), **Confirmar** (readback, hearback), **Responder** (¿qué respondes?,
  ¿estándar o plain?) y **Vuelo completo**.
- La raíz de la página re-ancla `--av-blue-500` a `CM_ACENTO`: los
  componentes del motor toman la ciruela sin tocarlos. Verde, ámbar y rojo
  siguen siendo solo semánticos.
- **Selector de radio**: «la del ejercicio», limpia, normal o con
  interferencia (el `perfil` que exponen los componentes). En el vuelo
  completo no se ofrece: ahí la radio la pone cada tramo.
- **Aviso de voz sintética**: antes de escuchar, la página pide la cabecera
  (HEAD) de los mp3 del ejercicio (`src/lib/comunicacionesAudio.ts`, misma
  regla de `Content-Type` que el reproductor). Si falta alguno, dice cuántos y
  que suenan con la voz del navegador, en inglés y sin el filtro de banda.
  Sin red no avisa (no se sabe, y el mp3 puede estar en caché). El control de
  radio de cada ejercicio además lo repite al sonar.
- `src/lib/comunicacionesPracticaGrupos.ts`: el orden de la pantalla y
  `CM_PRACTICA_CLAVES` (todas con `claveEjercicioCm`, nunca a mano). Es el
  único que importa el guion; la página importa este. Los dos están en
  `CONTENIDO` de `eslint.config.js`.
- `src/lib/comunicacionesConteo.ts` (`CM_PRACTICA_CONTEO`), el conteo liviano
  para el hub, el panel e Ingreso a aerolínea; `leccionesConteo.test.ts` lo
  compara con el guion.
- Progreso: `markComunicacionesProgress({ practiceId })`, respaldo local y
  base, como Aeropuertos. Un ejercicio queda resuelto al terminarlo, acertado o
  no.
- Catálogo: el módulo entró a `contenido/catalogo/modulos.json` (69 lecciones
  y las claves de la práctica), a `MODULOS_AEROLINEA` (token
  `var(--av-cm-500)`) y a `CARA_DE_MODULO`. `scripts/catalogo/sembrar.mjs`
  acepta ahora nombres de módulo (`… sembrar.mjs comunicaciones`) para cargar
  uno solo sin pisar los demás.
- `vite.config.ts`: regla `comunicaciones-audio-v1` (StaleWhileRevalidate,
  solo `audio/mpeg`) para `/modulos/comunicaciones/audio/*.mp3`. Fuera del
  precache (`modulos/**` ya estaba en `globIgnores`).

### Evaluación

- Banco `contenido/bancos/comunicaciones_evaluacion.json` (80 preguntas, ya
  existía) y su siembra `supabase/seeds/comunicaciones_evaluacion.sql`.
- `src/lib/comunicacionesEvaluacion.ts` (total 80, 25 por intento, 80 para
  aprobar), `src/pages/ComunicacionesExam.tsx` sobre `ExamenModulo`, ruta
  `/app/aerolinea/comunicaciones/evaluacion`, historial en
  `services/intentosExamen.ts` y el tipo de la tabla en
  `integrations/supabase/types.ts`, escrito a mano con la forma de la
  migración.
- La mejor nota entra al avance (`comunicacionesProgress.ts` y el respaldo
  local): lección, práctica y evaluación pesan igual, como en Aeropuertos.
- El hub tiene ahora «1. Aprende», «2. Practica» (hueco `CM-POR-02`) y
  «3. Evaluación» (hueco `CM-POR-03`).
- **La evaluación queda cerrada mientras las lecciones sigan en redacción**:
  el servidor pide las 69 en la base y una lección que es solo el marcador
  no se marca. Es a propósito.

### Tres migraciones y no dos

Aeropuertos hizo la evaluación (230000) y después el progreso con todo lo
compartido (0916). Aquí el progreso ya estaba (000000, mínimo a propósito),
así que:

- `20260925010000_evaluacion_de_comunicaciones.sql`: tabla de intentos, CHECK
  de destino, reglas (25, 80, al final, 3 h), fuente, umbral
  `comunicaciones_pass`, `evaluacion_terminar` (copiada de 20260915230000) y
  `secciones_leidas` (copiada de 20260916000000) con su rama, y
  `modulo_leccion = 'comunicaciones'`.
- `20260925020000_panel_y_logros_de_comunicaciones.sql`: `practicas_hechas`,
  los cuatro logros (orden 30 a 33), `desbloquear_logros`, los dos
  disparadores, `check_and_unlock_achievements` y `panel_tarjetas` (la de
  20260916000000, con plan, postulaciones y los cinco módulos, más
  Comunicaciones). **No escribe las claves de práctica**: el guion todavía
  cambia, así que van por `scripts/catalogo` (paso 11 de abajo). El logro de
  práctica no se puede ganar con el catálogo vacío.

## El color: ciruela de radio

Acento `#5E3567` = `oklch(0.40 0.095 320)`.

Se propuso un índigo violeta `#4A3B7A`, que es el matiz **292**. En la pantalla
de Ingreso a aerolínea la tarjeta de este módulo va al lado de la de
psicotécnicas, que es violeta **295** (`oklch(0.45 0.2 295)`), y el token
`--av-ap-*` también es violeta (287): habrían sido tres violetas casi iguales.
Se corrió al **320** (ciruela): misma familia, separada por matiz y por croma
(la mitad que psicotécnicas), y lejos del rojo de error (25), del ámbar (70) y
del verde de correcto (155).

| Uso | Valor | Contraste medido |
|---|---|---|
| Primario del lector, texto sobre papel `#FBFAF8` | `#5E3567` | 9,2:1 (blanco encima: 9,6:1) |
| Foco sobre papel | `#8B5D96` | 4,9:1 |
| Foco sobre el índice navy | `#D9B6E1` | 9,2:1 |
| `--av-cm-500` claro sobre papel | `oklch(0.56 0.10 320)` | 4,7:1 |
| `--av-cm-700` oscuro, blanco encima | `oklch(0.50 0.09 320)` | 6,2:1 |
| `--av-cm-fg` oscuro sobre tarjeta oscura | `oklch(0.80 0.075 320)` | 8,6:1 |

## Cómo se carga el contenido de una lección

Todo está en el comentario de `src/lib/comunicacionesLeccion/index.ts`. Lo
esencial:

- No se cambian `n` ni `title`. `blocks` se reemplaza entero; `minutes` pasa
  del 1 provisional a la lectura real.
- Hueco de imagen:

  ```ts
  {
    kind: "hueco",
    rotulo: "CM-16-01 · Diagrama · 16:9 · 1600×900",
    descripcion: "Qué tiene que mostrar y por qué.",
    alto: 280,
  }
  ```

- Imágenes a `public/modulos/comunicaciones/`, nunca a `src/assets`.
- Nada de rayas largas, nada de fraseología, accidentes, cifras ni artículos
  inventados; lo que no tenga fuente cargada (Doc 4444 cap. 14, Doc 10037…) va
  con `callout` de tono `verificar`.
- Un «pon a prueba» de lección no copia una pregunta de evaluación.

## Lo que le queda por correr a Camilo

Nada de esto está aplicado. Va **después de los siete pasos de Aeropuertos**
(ver `docs/AEROPUERTOS_ESTADO.md`, «Lo que le queda por correr a Camilo»):
las funciones compartidas se copiaron de sus versiones. Cada paso en **su
propia ejecución** del SQL Editor:

| # | Qué se pega en el SQL Editor | Resultado esperado |
|---|---|---|
| 8 | `supabase/migrations/20260925000000_progreso_de_comunicaciones.sql` | Sin error (un aviso de «does not exist, skipping» por la política, normal) |
| 9 | `supabase/migrations/20260925010000_evaluacion_de_comunicaciones.sql` | Sin error (mismo tipo de aviso) |
| 10 | `supabase/migrations/20260925020000_panel_y_logros_de_comunicaciones.sql` | Sin error (avisos de «does not exist, skipping» por los disparadores) |
| 11 | La salida de `node scripts/catalogo/sembrar.mjs comunicaciones` (solo este módulo: el catálogo de Mercancías y Aerodinámica en producción está en otra versión a propósito, ver el doc de Aeropuertos) | `INSERT 0 1` |
| 12 | `supabase/seeds/comunicaciones_evaluacion.sql` (el banco, 80 preguntas) | `UPDATE 0` |
| 13 | Las pruebas, una por ejecución: `supabase/tests/comunicaciones_evaluacion.sql`, `comunicaciones.sql`, `logros.sql`, `permisos.sql`, `panel.sql` | Cada una termina en el error `PRUEBA_DESHECHA …` (eso es pasar) |

Lo que tiene que decir cada prueba del paso 13:

- `comunicaciones_evaluacion.sql`: `PRUEBA_DESHECHA reglas_25_de_80_y_80 destino_y_leccion_gobernada un_solo_banco_sin_cupo banco_80_bien_formado reparto_por_nivel intentos_cerrados sin_intento_a_mano terminar_enruta_los_siete secciones_leidas_los_seis`
- `comunicaciones.sql`: `PRUEBA_DESHECHA catalogo_69_y_practica umbrales permisos leccion_fuera leccion_cero practica_inventada clave_ajena rpc_idempotente rls_progreso sin_update_directo sin_insert_directo sin_intento_a_mano puerta_cerrada_con_68 puerta_abierta_con_69 terminar_escribe_en_comunicaciones sin_sesion conteos_y_modulos_viejos panel_con_plan_y_postulaciones grupos_y_disparadores logros_leccion_y_practica logros_los_cuatro`
- `logros.sql`: la lista de antes con `comunicaciones_con_catalogo` después de `aeropuertos_con_catalogo`.
- `permisos.sql` y `panel.sql`: como antes. La tabla nueva solo da `select`.

Qué pasa si se cambia el orden:

- 9 antes que 8: falla en el insert de `evaluaciones` (`modulo_leccion` es
  clave foránea a la fila `comunicaciones` de `modulos_contenido`, que nace
  en 8) y no queda nada aplicado.
- 10 antes que 9: falla en el disparador sobre
  `user_comunicaciones_exam_attempts`, que nace en 9.
- 8, 9 o 10 antes de los pasos de Aeropuertos: `secciones_leidas`,
  `evaluacion_terminar` y `panel_tarjetas` nombran tablas de Aeropuertos y de
  postulaciones. Las funciones se crean igual (PL/pgSQL no las revisa), pero
  se caen al usarlas: el panel de todos se quedaría sin tarjetas. **El orden
  no es opcional.** Y si después de 10 se vuelve a correr 6 (la de
  Aeropuertos), el panel pierde la tarjeta de Comunicaciones.
- 11 antes que 10 funciona (es solo el catálogo), pero 8 corrida después
  vuelve a dejar la práctica vacía: entonces se repite 11.
- Sin 11: la práctica funciona en el navegador pero la base rechaza cada
  clave (el progreso queda local) y `comunicaciones.sql` falla en el catálogo.

**Cuando el guion de la práctica cambie** (lo está escribiendo otro):
`ACTUALIZAR_CATALOGO=1 npx vitest run scripts/catalogo`, ajustar
`CM_PRACTICA_CONTEO` en `src/lib/comunicacionesConteo.ts` (la prueba dice el
número) y volver a pegar la salida de `node scripts/catalogo/sembrar.mjs
comunicaciones`. Lo que el piloto ya resolvió no se pierde: una clave que
sale del catálogo deja de contar, pero no se borra.

Después de aplicar, si se aplicó con `apply_migration` o la CLI:

```sql
select version, name from supabase_migrations.schema_migrations
where name in ('progreso_de_comunicaciones', 'evaluacion_de_comunicaciones',
               'panel_y_logros_de_comunicaciones');
```

y los archivos se renombran con esa versión (y la ruta de la primera en
`src/lib/leccionesConteo.test.ts`, que la lee).

### Lo que no se pudo probar

Las migraciones y sus pruebas **no se corrieron** contra ninguna base: esta
sesión no tenía escritura y no se debía. Están escritas sobre el patrón ya
probado de Aeropuertos: las funciones compartidas son copia de las de
20260915230000 y 20260916000000 con una rama más (la única diferencia de
fondo es la guarda del logro de práctica con el catálogo vacío), y las
pruebas siguen línea por línea `aeropuertos_evaluacion.sql` y
`aeropuertos.sql`. Si una prueba falla por un nombre o un tipo y no por una
regla, lo que hay que corregir es la prueba.

### Mientras no las corra

Nada se rompe. Las consultas a las tablas que aún no existen fallan y el
módulo se queda con el respaldo local: el hub, la práctica y el lector leen y
escriben en `localStorage`, y el panel lee el módulo como «sin empezar». La
evaluación no abre (no hay reglas en el servidor) y el historial deja una
fila en `errores_cliente` por pestaña, que es el aviso de que falta el SQL.

## Decisiones que tiene que confirmar Camilo

1. **El color** (ciruela `#5E3567` en vez del índigo `#4A3B7A` propuesto), por
   el choque con psicotécnicas. Si se confirma, falta su fila en la tabla de
   acentos de `CLAUDE.md`.
2. **El módulo ya está en el panel y en el catálogo** (24-sep-2026), con la
   práctica. Su tarjeta del panel usa `var(--av-cm-500)` e icono de
   auriculares; el tema de Ingreso a aerolínea sumó práctica y evaluación.
3. **La tarjeta ya se ve** en Ingreso a aerolínea, con 69 lecciones en
   redacción. Si se prefiere esconderla hasta que haya contenido, es quitar
   un bloque de `temas` en `AirlinePrep.tsx`.
4. **El repaso «50 frases» es la lección 69** del nivel 8 y no una pantalla
   aparte.
5. Visto de paso, no es de este módulo: el token `--av-ap-*` de Aeropuertos
   sigue siendo violeta (287) mientras el lector y `AP_ACENTO` son verde menta
   `#2F766A`. El panel pinta Aeropuertos con `var(--av-ap-500)`, o sea en
   violeta.
