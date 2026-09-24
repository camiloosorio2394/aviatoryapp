# Módulo «Minimum Equipment List (MEL)» · estado del trabajo

**Para quien retome esto** (incluida una sesión futura de Claude Code que
arranque sola): este archivo dice qué está hecho y qué sigue. Actualízalo al
terminar cada paso.

## Qué es

Octavo módulo de «Ingreso a aerolínea»: **40 lecciones en 5 niveles**, una por
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
- [ ] **2. Contenido**, nivel por nivel, desde `docs/mel/nivel-N.md` hacia
      `src/lib/melLeccion/nivelN.ts`. Una cosa a la vez: un nivel por sesión.
- [ ] **3. Portadas** de lección (`public/modulos/mel/leccion-NN.webp`, 16:9)
      y las imágenes de cada lección.
- [ ] **4. Práctica**. Al conectarla: el módulo entra a
      `contenido/catalogo/modulos.json`, a `MODULOS_AEROLINEA` y a
      `CARA_DE_MODULO` (ver «Lo que no entró todavía»).
- [ ] **5. Evaluación**, con el banco en el servidor.
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
- `supabase/migrations/20260928000000_progreso_de_mel.sql` y su prueba
  `supabase/tests/mel.sql`.

### Lo que no entró todavía, y por qué

`ClaveModulo`, `MODULOS_AEROLINEA` (`src/lib/modulosAerolinea.ts`) y
`CARA_DE_MODULO` (`src/components/aerolinea/carasDeModulo.ts`) **no tienen
MEL**, igual que Comunicaciones en su paso 1. Las tres cosas van juntas con el
catálogo y no se pueden separar:

- `scripts/catalogo/catalogo.test.ts` exige que `MODULOS_AEROLINEA` tenga las
  mismas claves que `contenido/catalogo/modulos.json`, y que cada módulo de
  esa lista tenga **al menos una práctica**. MEL no tiene práctica.
- `CARA_DE_MODULO` es `Record<ClaveModulo, …>`: agregar la clave obliga a
  tener la cara, y agregarla sin el módulo en la lista haría que el tipo del
  panel prometiera una tarjeta que la base no manda.
- Meter MEL al catálogo obliga (`scripts/migraciones/funciones-compartidas.test.ts`)
  a republicar las seis funciones compartidas con su rama. Eso es de la
  migración de evaluación y logros, no de esta.

Cuando llegue la práctica: el módulo entra a `catalogo.test.ts` y al
catálogo, a `MODULOS_AEROLINEA` (token `var(--av-mel-500)`), a
`CARA_DE_MODULO` (icono `ListChecks`, color `var(--av-mel-700)`, hueco
`MEL-TEM-01`), y `node scripts/catalogo/sembrar.mjs mel` carga la fila.

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

Nada de esto está aplicado. Producción está en `20260927020000` (las tres de
Comunicaciones aplicadas, verificado en `schema_migrations` el 24-sep-2026).

| # | Qué se pega en el SQL Editor | Resultado esperado |
|---|---|---|
| 1 | `supabase/migrations/20260928000000_progreso_de_mel.sql` | Sin error (un aviso de «does not exist, skipping» por la política, normal) |
| 2 | `supabase/tests/mel.sql` | Termina en `PRUEBA_DESHECHA catalogo_40_y_0 umbral permisos leccion_fuera leccion_cero practica_inventada clave_ajena rpc_idempotente rls_progreso sin_update_directo sin_insert_directo sin_sesion modulos_viejos` (eso es pasar) |
| 3 | `supabase/tests/permisos.sql` | Como antes. La tabla nueva solo da `select`. |

No toca ninguna función compartida, así que no hay orden que respetar con
otras migraciones fuera de ir después de `20260927020000`.

Después de aplicar, si se aplicó con `apply_migration` o la CLI:

```sql
select version, name from supabase_migrations.schema_migrations
where name = 'progreso_de_mel';
```

y el archivo se renombra con esa versión (y la ruta en
`src/lib/leccionesConteo.test.ts`, que lo lee), y se sube la marca
`ULTIMA_APLICADA` de `supabase/HISTORIAL_DE_MIGRACIONES.md`.

### Lo que no se pudo probar

La migración y su prueba **no se corrieron** contra ninguna base: esta sesión
no debía escribir en producción. Son copia de la parte de progreso de
Comunicaciones (`20260927000000` y la primera versión de
`supabase/tests/comunicaciones.sql`) con el nombre del módulo y los números
cambiados.

### Mientras no la corra

Nada se rompe. La consulta a la tabla que aún no existe falla y el módulo se
queda con el respaldo local: el hub y el lector leen y escriben en
`localStorage`. Y como las 40 lecciones están en redacción, tampoco hay nada
que marcar todavía.

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
3. **La tarjeta ya se ve** en Ingreso a aerolínea, con 40 lecciones en
   redacción. Si se prefiere esconderla hasta que haya contenido, es quitar un
   bloque de `temas` en `AirlinePrep.tsx`.
4. Visto de paso, no es de este módulo: Performance tiene hub y lección pero
   no tarjeta en Ingreso a aerolínea, y `TEMAS_EN_CAMINO` todavía anuncia
   «Performance y planificación» como futuro.
