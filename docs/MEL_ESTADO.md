# Módulo «Minimum Equipment List (MEL)» · estado del trabajo

**Para quien retome esto** (incluida una sesión futura de Claude Code que
arranque sola): este archivo dice qué está hecho y qué sigue. Actualízalo al
terminar cada paso.

## Qué es

Duodécimo y último módulo de «Ingreso a aerolínea» (va después de RAC,
Combustible, RVSM y PBN): **40 lecciones en 5 niveles**, una por
capítulo de la especificación (`docs/mel/nivel-1.md` a `nivel-5.md`), con el
lector compartido (`LectorLeccion`).

El objetivo: que el piloto, con algo inoperativo en el avión, sepa **leer la
entrada, cumplir lo que pide y decidir si sale**, y que lo pueda defender en
una entrevista sin confundir MEL con MMEL ni alivio con obligación de salir.

**Las fuentes**: las entradas reales salen de las MMEL públicas de la FAA
(A318-A321 Rev 32 y B-737 Rev 63a), que son la lista del tipo y no la MEL de
un operador; lo de Colombia se cita por RAC (121, 91); lo que depende del
operador se dice como tal. Las entradas inventadas van sobre la «Aeronave de
ejemplo» y rotuladas.

### Lección no es capítulo

Las lecciones van de 1 a 40 **en el orden en que aparecen en los archivos**, y
los niveles 3 y 5 no traen los capítulos en orden. El avance, la base y las
portadas (`leccion-NN.webp`) usan el número de lección; el capítulo solo sirve
para encontrar el texto y está en `MEL_CAPITULOS` (`src/lib/melLeccion/index.ts`).
`src/lib/leccionesConteo.test.ts` lee los `## N.` de `docs/mel/` y falla si
alguien reordena un archivo.

| Nivel | Nombre | Lecciones | Capítulos |
|---|---|---|---|
| 1 | Qué es la MEL | 01 a 03 | 1 a 3 |
| 2 | Leer una entrada | 04 a 15 | 4 a 15 |
| 3 | Del defecto al despacho | 16 a 25 | 16 a 21, 33 a 36 |
| 4 | Impacto operacional | 26 a 33 | 22 a 29 |
| 5 | Práctica y entrevista | 34 a 40 | 30 a 32, 37 a 40 |

OJO con los huecos de imagen: los documentos ya traen códigos `MEL-NN-MM`
donde **NN es el capítulo**, no la lección. Se conservan tal cual, para que
Camilo encuentre la imagen en el documento.

## Plan, en orden

- [x] **1. Infraestructura** (24-sep-2026). Ver «Qué se hizo» abajo.
- [x] **2. Contenido**, nivel por nivel, desde `docs/mel/nivel-N.md` hacia
      `src/lib/melLeccion/nivelN.ts`. Ninguna lección sigue con el marcador
      `EN_REDACCION`.
- [ ] **3. Portadas** de lección (`public/modulos/mel/leccion-NN.webp`, 16:9)
      y las imágenes de cada lección.
- [x] **4. Práctica** (25-sep-2026), conectada. Ver «Qué se hizo (pasos 4
      y 5)». El motor está en `docs/MEL_PRACTICA.md`.
- [x] **5. Evaluación** (25-sep-2026), con el banco de 70 en el servidor.
      **SQL escrito y no aplicado**: ver «Lo que le queda por correr a
      Camilo».
- [ ] **6. Video de apertura** (`MEL-VID-01`), con la serie de HyperFrames.
      Antes de generar voz: `"lang": "es"` en `audio_request.json` (ver
      CLAUDE.md, «Trampa del idioma de la voz»).

## Qué se hizo (paso 1)

- `src/lib/mel.ts`: rutas (`/app/aerolinea/mel` y `/aprende`), niveles, total
  fijo (`MEL_LECTURA_TOTAL = 40`), acento (`MEL_ACENTO`), resumen para Ingreso
  a aerolínea y respaldo local (`aviatory.mel.progress`).
- `src/lib/melLeccion/`: `index.ts` junta los cinco niveles, comprueba la
  numeración, exporta `MEL_CAPITULOS` y **documenta al inicio el formato de
  todos los bloques** y cómo va un hueco de imagen. `nivel1.ts` a `nivel5.ts`
  traen cada lección con su título, su bajada y un solo bloque, el marcador
  `EN_REDACCION` (`enRedaccion.ts`).
- **Las lecciones en redacción no cuentan**, con el mismo `cuenta(n)` del
  lector que estrenó Comunicaciones: llegar al pie de una lección que es solo
  el marcador no la marca leída ni registra estudio del día.
- `src/pages/MelLeccion.tsx`: el lector, con el tema `lector-mel`. Sin
  entrevistas de nivel ni práctica: el pie de la última lección vuelve al hub.
- `src/pages/Mel.tsx`: el hub, como el de Comunicaciones, con el espacio del
  video (`MEL-VID-01`) y una sola puerta, «1. Aprende» (portada
  `MEL-POR-01`). Práctica y evaluación **no se anuncian**.
- `src/App.tsx`: el hub dentro de `AppLayout`, el lector en el grupo a
  pantalla completa.
- `src/pages/AirlinePrep.tsx`: la tarjeta del tema (portada `MEL-TEM-01`),
  con el avance de la lección, que por ahora es el avance del tema.
- `src/index.css`: tokens `--av-mel-*` y el tema `.lector-notam.lector-mel`.
- `src/lib/melProgress.ts` sobre el progreso común (`progresoModulo.ts` ganó
  la tabla y la RPC), y la tabla y la RPC en
  `src/integrations/supabase/types.ts`, escritas a mano con la forma de la
  migración.
- `eslint.config.js`: `@/lib/melLeccion` solo lo importa su lector.
- `src/lib/leccionesConteo.test.ts`: el total fijo contra el contenido, los
  cortes de nivel, el catálogo y el umbral de la migración, y la
  correspondencia lección y capítulo contra `docs/mel/`.
- `supabase/migrations/20261001000000_progreso_de_mel.sql` (nació como
  `20260928000000`; ver «Renumeradas») y su prueba
  `supabase/tests/mel.sql`.

### Lo que el paso 1 dejó fuera, y ya entró

`ClaveModulo`, `MODULOS_AEROLINEA`, `CARA_DE_MODULO`, el catálogo y las seis
funciones compartidas no podían tener MEL sin práctica (el catálogo exige al
menos una por módulo, y meter el módulo al catálogo obliga a republicar las
funciones con su rama). Entraron juntos en los pasos 4 y 5.

## Qué se hizo (pasos 4 y 5)

### Práctica

- `src/pages/MelPractice.tsx`, ruta `/app/aerolinea/mel/practica` (hija de
  `AppLayout`, junto a las de Comunicaciones). Misma casa que
  `ComunicacionesPractice`: cabecera (hueco `MEL-PRA-01`), pestañas, barra de
  avance, tira de saltos y el ejercicio. Los seis tipos van en el orden del
  defecto al despacho: **Encontrar y leer** (busca el ítem, lee la entrada),
  **Plazo** (calcula el plazo), **Decidir el despacho** (¿podemos salir?,
  ítems combinados) e **Impacto en el vuelo** (impacto operacional).
- La raíz de la página re-ancla `--av-blue-500` a `MEL_ACENTO`: los
  componentes del motor toman el grafito sin tocarlos. Verde, ámbar y rojo
  siguen siendo solo semánticos.
- `src/lib/melPracticaGrupos.ts`: el orden de la pantalla y
  `MEL_PRACTICA_CLAVES` (todas con `claveEjercicioMel`, nunca a mano). Es el
  único que importa `melPracticaDatos.ts`; la página importa este. Los dos
  están en `CONTENIDO` de `eslint.config.js`.
- `src/lib/melConteo.ts` (`MEL_PRACTICA_CONTEO = 68`), el conteo liviano para
  el hub, el panel e Ingreso a aerolínea; `leccionesConteo.test.ts` lo compara
  con los ejercicios.
- Progreso: `markMelProgress({ practiceId })`, respaldo local y base. Un
  ejercicio queda resuelto al terminarlo, acertado o no, como en
  Comunicaciones y Aeropuertos (`docs/MEL_PRACTICA.md` sugería contar solo el
  acierto completo; se prefirió la regla de los demás módulos).
- Catálogo: el módulo entró a `contenido/catalogo/modulos.json` (40 lecciones
  y 68 claves), a `scripts/catalogo/catalogo.test.ts`, a `MODULOS_AEROLINEA`
  (token `var(--av-mel-500)`) y a `CARA_DE_MODULO` (icono `ListChecks`, color
  `var(--av-mel-700)`, hueco `MEL-TEM-01`).

### Evaluación

- Banco `contenido/bancos/mel_evaluacion.json` (70 preguntas, ya existía) y
  su siembra `supabase/seeds/mel_evaluacion.sql`.
- `src/lib/melEvaluacion.ts` (total 70, 25 por intento, 80 para aprobar),
  `src/pages/MelExam.tsx` sobre `ExamenModulo`, ruta
  `/app/aerolinea/mel/evaluacion`, historial en `services/intentosExamen.ts`,
  la clave en `services/evaluaciones.ts` y el tipo de la tabla en
  `integrations/supabase/types.ts`, escrito a mano con la forma de la
  migración.
- La mejor nota entra al avance (`melProgress.ts` y el respaldo local):
  lección, práctica y evaluación pesan igual, como en Comunicaciones.
- El hub tiene ahora «1. Aprende», «2. Practica» (hueco `MEL-POR-02`) y
  «3. Evaluación» (hueco `MEL-POR-03`).
- El servidor abre la evaluación solo con las 40 lecciones en la base
  (`modulo_leccion = 'mel'`).
- **La práctica no copia la evaluación**: `melPractica.test.ts` compara cada
  enunciado y cada opción de seis palabras o más del banco con los ejercicios
  y con las lecciones. Salió una coincidencia: una opción de `mel-ev-057`
  citaba literal el RAC 121.995(d)(1) que la lección 30 también cita. Se
  reescribió la opción del banco («Mantener de forma automática el nivel de
  vuelo elegido»), sin cambiar la respuesta.

### Dos migraciones más

- `20261001010000_evaluacion_de_mel.sql`: tabla de intentos, CHECK de destino
  con los doce módulos y el simulacro, reglas (25, 80, al final, 3 h), fuente,
  umbral `mel_pass`, `evaluacion_terminar` y `secciones_leidas` (copiadas de
  20260929120000_modulo_pbn) con su rama, y `modulo_leccion = 'mel'`.
- `20261001020000_panel_y_logros_de_mel.sql`: `practicas_hechas`, los cuatro
  logros (orden 50 a 53), `desbloquear_logros` (con la guarda del catálogo
  vacío), los dos disparadores, `check_and_unlock_achievements` y
  `panel_tarjetas` (copiadas de 20260929120000_modulo_pbn, con plan,
  postulaciones, licencias, preparación y los once módulos, más MEL). **No
  escribe las claves de práctica**: van por `scripts/catalogo`.
- Pruebas: `supabase/tests/mel_evaluacion.sql` (nueva), `mel.sql` (ahora con
  catálogo con práctica, puerta, panel y logros, como `comunicaciones.sql`) y
  el caso de MEL en `logros.sql`.

### Renumeradas (25-sep-2026, segundo merge de main)

Las tres nacieron como `20260928000000`, `010000` y `020000`. Mientras
tanto main trajo RAC y Combustible (`20260928000000`, la misma versión),
RVSM (`20260929000000`), PBN (`20260929120000`) y
`20260930000000_evaluacion_entrega_el_tema_del_banco`, que está en main y no
aplicada. Por eso pasaron a `20261001000000`, `20261001010000` y
`20261001020000`, por encima de todo, y sus funciones compartidas se
rehicieron desde la última que las publica:

| Función | Sale de |
|---|---|
| `private.secciones_leidas` | `20260929120000_modulo_pbn` |
| `private.practicas_hechas` | `20260929120000_modulo_pbn` |
| `private.desbloquear_logros` | `20260929120000_modulo_pbn` |
| `public.check_and_unlock_achievements` | `20260929120000_modulo_pbn` |
| `public.evaluacion_terminar` | `20260929120000_modulo_pbn` |
| `public.panel_tarjetas` | `20260929120000_modulo_pbn` |

`20260930000000` solo republica `evaluacion_iniciar`, que MEL no toca.

La copia lleva dos arreglos sobre el archivo de PBN, que tal cual no sirve:
`panel_tarjetas` tiene una coma de más después de la tarjeta de rvsm (`),,`,
no compila) y la rama de pbn de `evaluacion_terminar` usa `v_sesion.user_id`
y `v_correctas`, que la función no declara (el intento de PBN se cae al
terminar con «missing FROM-clause entry for table v_sesion»). En producción
PBN se aplicó por anclas, así que lo que corre allí puede no tener esos
defectos; con las de MEL aplicadas, queda la versión buena en todo caso.

Los logros de MEL pasaron de 34 a 37 (que ahora son de RAC) a **50 a 53**,
después de PBN (46 a 49).

## El color: grafito de bitácora

Acento `#50453D` = `oklch(0.40 0.020 60)`.

Se sugirió un gris pizarra azulado o un cobre apagado. El cobre y la terracota
ya son de Performance (bronce, matiz 45). El pizarra azulado (matiz 230,
croma 0,035) quedaba a **ΔE 0,03** (OKLab) de Aerodinámica (250) y de
Meteorología (205): casi indistinguible, tres tarjetas del mismo azul
apagado.

Este se separa **por croma y no por matiz**: 0,02, la cuarta parte del más
apagado de los otros siete, con un tinte cálido (60) que lo aleja del azul de
NOTAM, del navy del índice y del pizarra de Aerodinámica. Queda a ΔE 0,08 o
más de todos los acentos (Aerodinámica 0,080, Meteorología 0,080, Performance
0,082, Comunicaciones 0,100, NOTAM 0,122, Mercancías 0,129, menta de
Aeropuertos 0,148, psicotécnicas 0,218). Con ese croma no se lee como el
ámbar (70) de alerta, ni se acerca al rojo (25) ni al verde de correcto (155).
Es el lápiz sobre el papel del tech log, que es donde vive un defecto.

| Uso | Valor | Contraste medido |
|---|---|---|
| Primario del lector, texto sobre papel `#FBFAF8` | `#50453D` | 8,9:1 (blanco encima: 9,3:1) |
| Foco sobre papel | `#7C6F65` | 4,7:1 (4,2:1 sobre `--ln-sunk`) |
| Foco sobre el índice navy | `#D4C8BF` | 10:1 (4,4:1 sobre la pastilla) |
| Pastilla de la lección abierta, sobre navy | `#61564D` | 2,3:1 contra el navy, 7,2:1 con blanco |
| `--av-mel-500` claro sobre papel | `oklch(0.55 0.022 60)` | 4,7:1 |
| `--av-mel-700` oscuro, blanco encima | `oklch(0.50 0.020 60)` | 6,0:1 |
| `--av-mel-fg` oscuro sobre tarjeta oscura | `oklch(0.80 0.018 60)` | 9,6:1 |

El riesgo de un acento casi gris es que se lea como «deshabilitado». Por eso
el primario es oscuro (8,9:1, casi el de la tinta) y no un gris medio: las
pastillas, los rótulos y los números del lector siguen leyéndose como
activos. Si Camilo lo ve apagado en pantalla, el ajuste es subir el croma a
0,03 sin mover el matiz.

## Cómo se carga el contenido de una lección

Todo está en el comentario de `src/lib/melLeccion/index.ts`. Lo esencial:

- No se cambian `n` ni `title`. `blocks` se reemplaza entero; `minutes` pasa
  del 1 provisional a la lectura real.
- Hueco de imagen:

  ```ts
  {
    kind: "hueco",
    rotulo: "MEL-07-01 · Diagrama · 16:9 · 1600×900",
    descripcion: "Qué tiene que mostrar y por qué.",
    alto: 280,
  }
  ```

- Imágenes a `public/modulos/mel/`, nunca a `src/assets`.
- Nada de rayas largas; nada de entradas de MEL, accidentes, cifras ni
  artículos inventados. Una entrada real se cita con MMEL, revisión, página y
  revisión de página; una inventada va sobre la «Aeronave de ejemplo» y
  rotulada. Lo que no tenga fuente cargada va con `callout` de tono
  `verificar`.
- Un «pon a prueba» de lección no copia una pregunta de evaluación.

## Lo que le queda por correr a Camilo

**Todo lo anterior a MEL ya está aplicado y no se repite**: producción está en
`20260929120000_modulo_pbn` (RAC, Combustible, RVSM y PBN incluidos,
verificado el 25-sep-2026). Correr otra vez una migración vieja después de las
de MEL dejaría las funciones compartidas sin MEL.

**Antes de empezar: `20260930000000` va antes que MEL.** Es de otro PR
(`20260930000000_evaluacion_entrega_el_tema_del_banco`, el tema de la
evaluación y el catálogo de Combustible con los diez escenarios), está en main
y, al 25-sep-2026, **no está aplicada**. Se comprueba así:

```sql
select version, name from supabase_migrations.schema_migrations
where version >= '20260929120000' order by version;
```

Si no aparece `20260930000000`, se corre primero ese archivo, con su prueba
(`supabase/tests/evaluacion_temas.sql`) y su registro, como diga su PR. No
choca con MEL (no toca ninguna de las seis funciones compartidas), pero su
versión es menor y tiene que quedar antes en el historial.

Solo lo de MEL, en este orden y cada paso en **su propia ejecución** del SQL
Editor:

| # | Qué se pega en el SQL Editor | Resultado esperado |
|---|---|---|
| 1 | `supabase/migrations/20261001000000_progreso_de_mel.sql` | Sin error (un aviso de «does not exist, skipping» por la política, normal) |
| 2 | `supabase/migrations/20261001010000_evaluacion_de_mel.sql` | Sin error (mismo tipo de aviso) |
| 3 | `supabase/migrations/20261001020000_panel_y_logros_de_mel.sql` | Sin error (avisos de «does not exist, skipping» por los disparadores) |
| 4 | La salida de `node scripts/catalogo/sembrar.mjs mel` (solo este módulo) | `INSERT 0 1` |
| 5 | `supabase/seeds/mel_evaluacion.sql` (el banco, 70 preguntas) | `UPDATE 0` |
| 6 | Las pruebas, una por ejecución: `supabase/tests/mel_evaluacion.sql`, `mel.sql`, `logros.sql`, `permisos.sql`, `panel.sql` | Cada una termina en el error `PRUEBA_DESHECHA …` (eso es pasar) |
| 7 | El registro de las tres, con la versión de su archivo (abajo) | `INSERT 0 3` |

El paso 7, en el SQL Editor (`supabase db push` no sirve en este proyecto; ver
`supabase/HISTORIAL_DE_MIGRACIONES.md`):

```sql
insert into supabase_migrations.schema_migrations (version, name) values
  ('20261001000000', 'progreso_de_mel'),
  ('20261001010000', 'evaluacion_de_mel'),
  ('20261001020000', 'panel_y_logros_de_mel')
on conflict (version) do nothing;
```

Lo que tiene que decir cada prueba del paso 6:

- `mel_evaluacion.sql`: `PRUEBA_DESHECHA reglas_25_de_70_y_80 destino_y_leccion_gobernada un_solo_banco_sin_cupo banco_70_bien_formado reparto_por_nivel intentos_cerrados sin_intento_a_mano terminar_enruta_los_trece secciones_leidas_los_doce`
- `mel.sql`: `PRUEBA_DESHECHA catalogo_40_y_practica umbrales permisos leccion_fuera leccion_cero practica_inventada clave_ajena rpc_idempotente rls_progreso sin_update_directo sin_insert_directo sin_intento_a_mano puerta_cerrada_con_39 puerta_abierta_con_40 terminar_escribe_en_mel sin_sesion conteos_y_modulos_viejos panel_con_plan_y_postulaciones grupos_y_disparadores logros_leccion_y_practica logros_los_cuatro`
- `logros.sql`: `PRUEBA_DESHECHA leccion_con_catalogo practica_con_catalogo claves_viejas_no_cuentan aeropuertos_con_catalogo comunicaciones_con_catalogo rac_con_catalogo combustible_con_catalogo mel_con_catalogo grupo_por_tabla ponerse_al_dia grupo_completo_y_cerrado`
- `permisos.sql` y `panel.sql`: como antes. La tabla de intentos nueva solo da `select`.

Qué pasa si se cambia el orden:

- 2 antes que 1: falla en el insert de `evaluaciones` (`modulo_leccion` es
  clave foránea a la fila `mel` de `modulos_contenido`, que nace en 1) y no
  queda nada aplicado.
- 3 antes que 2: falla en el disparador sobre `user_mel_exam_attempts`, que
  nace en 2.
- 4 antes que 1: el upsert crea la fila igual, pero 1 corrida después la deja
  sin práctica: entonces se repite 4.
- Sin 4: la práctica funciona en el navegador pero la base rechaza cada clave
  (el progreso queda local), el logro de práctica no se puede ganar y
  `mel.sql` falla en el catálogo.
- Sin 5: la evaluación abre y se cae al sortear; `mel_evaluacion.sql` falla
  en el conteo del banco.
- Una migración de RAC, Combustible, RVSM o PBN corrida otra vez después de
  2 o 3: sus funciones compartidas no conocen MEL y la evaluación de MEL se
  cae al terminar. Se vuelven a correr 2 y 3.

Después del paso 7, y **solo si `20260930000000` también está aplicada**, se
sube la marca `ULTIMA_APLICADA` de `supabase/HISTORIAL_DE_MIGRACIONES.md` a
`20261001020000`. Si no, la marca no se mueve: dejaría la de `20260930000000`
pendiente por debajo.

**Cuando cambien los ejercicios**: `ACTUALIZAR_CATALOGO=1 npx vitest run
scripts/catalogo`, ajustar `MEL_PRACTICA_CONTEO` en `src/lib/melConteo.ts`
(la prueba dice el número) y volver a pegar la salida de
`node scripts/catalogo/sembrar.mjs mel`.

### Lo que se probó y lo que no

Nada se corrió contra producción. Sí contra un Postgres 16 local: una copia
de la base con las migraciones hasta Aeropuertos, más todas las de después
en orden (Performance, Comunicaciones, RAC y Combustible, RVSM, PBN con su
`),,` corregido en la copia local, `20260930000000` y las tres de MEL), con el
catálogo entero y los bancos sembrados. Así pasaron `mel_evaluacion.sql`,
`mel.sql`, `logros.sql`, `permisos.sql`, `panel.sql`, `rvsm.sql`,
`rac_y_combustible.sql` y `comunicaciones.sql`, y `pbn.sql` con la rama de
pbn de `evaluacion_terminar` ya arreglada (`pbn:terminar_escribe_en_su_tabla`).
Con la función tal como está en el archivo de PBN, esa misma prueba se cae con
«missing FROM-clause entry for table v_sesion».

`scripts/migraciones/funciones-compartidas.test.ts` confirma que las seis
conocen los doce módulos y que el panel conserva sus claves fijas.

### Mientras no las corra

Nada se rompe. Las consultas a las tablas que aún no existen fallan y el
módulo se queda con el respaldo local: el hub, la práctica y el lector leen y
escriben en `localStorage`, y el panel lee el módulo como «sin empezar». La
evaluación no abre (no hay reglas en el servidor).

## Decisiones que tiene que confirmar Camilo

1. **El color** (grafito `#50453D` en vez del pizarra azulado sugerido), por
   el choque con Aerodinámica y Meteorología. Si se confirma, falta su fila en
   la tabla de acentos de `CLAUDE.md`.
2. **Los títulos de las 40 lecciones**, cortos y en español con las siglas en
   inglés (MEL, MMEL, (M), (O), RVSM, EDTO). Algunos conservan el rótulo en
   inglés porque es como aparece en la MEL y como lo preguntan: «Day of
   discovery», «Number installed», «Number required for dispatch», «Remarks
   or exceptions», «Placarding», «Revision status». Una vez hechas las
   portadas, no se cambian.
3. **El módulo ya está en el panel y en el catálogo**, con la práctica y la
   evaluación: su tarjeta del panel usa `var(--av-mel-500)` e icono
   `ListChecks`, y el tema de Ingreso a aerolínea suma ejercicios.
4. Visto de paso, no es de este módulo: Performance tiene hub y lección pero
   no tarjeta en Ingreso a aerolínea, y `TEMAS_EN_CAMINO` todavía anuncia
   «Performance y planificación» como futuro.
5. Visto de paso: los logros de Performance y de Comunicaciones usan los dos
   el orden 30 a 33 en `achievements`. Los de MEL iban en 34 a 37, que
   después tomó RAC (Combustible 38 a 41, RVSM 42 a 45, PBN 46 a 49); ahora
   van en 50 a 53, sin empate.
6. **El grafito queda cerca de dos acentos que llegaron después** (no se
   cambió). Con la misma medida de arriba (ΔE OKLab entre primarios del
   lector), MEL `#50453D` queda a 0,049 del grafito pizarra de RAC
   (`#3D4958`) y a 0,044 del bronce de PBN (`#5C4520`), debajo del 0,08 que
   se usó para elegirlo. Con RAC se parece por lo mismo que lo eligió (croma
   casi nulo; se separan solo por la temperatura, cálido contra frío); con
   PBN, por el matiz (60 contra 55). Entre tokens `--av-*-500` claros: RAC
   0,053 y PBN 0,073. Con RVSM (0,077) queda en el límite. Si Camilo lo
   ve igual en las tarjetas, el ajuste es suyo.
