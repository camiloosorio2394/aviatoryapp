# Imágenes y videos de RAC y Gestión del combustible · prompt para Codex

Este archivo es el encargo completo. Si eres Codex: léelo entero, luego
`CLAUDE.md` y `docs/RAC_COMBUSTIBLE_ESTADO.md`, y trabaja **una fase por PR**,
en el orden de abajo. Si eres Cami: la primera parte te cuenta qué se hizo.

---

## 1. Lo que ya está hecho (para Cami)

**Dos módulos nuevos en «Ingreso a aerolínea», ya en main** (PR #262, #268 y
#274). Salen a producción en cuanto Vercel recupere la cuota diaria de
despliegues, que se agotó el 24-sep; si no se publica solo, un «Redeploy» de
main en el panel de Vercel.

- **RAC** (`/app/aerolinea/rac`): 19 unidades en 5 bloques, una por
  reglamento, del RAC 2 y el RAC 61 (tu licencia) al RAC 121 (la aerolínea) y
  el RAC 13 (las sanciones). Cada unidad sigue la misma forma: «¿De qué trata?»,
  «Lo que debe saber un piloto», «Datos importantes» y «En pocas palabras».
  Hay 54 preguntas de práctica y una evaluación de 20 al azar sobre un banco de
  50.
  - El contenido sale de los RAC oficiales de la Aerocivil, descargados el
    24-sep-2026, con el numeral de cada dato.
  - Hoy las licencias siguen por el RAC 2. El RAC 61 aplica desde el
    **31-ago-2027** (Res. 02543/2026): el PDF del RAC 61 todavía dice
    31-jul-2026, pero esa fecha se aplazó.
- **Gestión del combustible** (`/app/aerolinea/combustible`): 23 capítulos,
  del block fuel y sus componentes a la reserva final, el fuel check, la
  predicción, el combustible mínimo, el MAYDAY y el punto de decisión.
  - Práctica: 66 preguntas y 10 escenarios de «piensa como piloto». La
    evaluación saca 20 al azar de un banco de 40.
  - Anclado en el RAC 121 y la OACI (Anexo 6, Doc 9976), con EASA y la FAA
    para comparar.
  - Las cifras de los ejemplos son ilustrativas y lo dicen.
- **Fuente editorial**: `docs/contenido/rac.md` y
  `docs/contenido/gestion-combustible.md`. Lo de la app se genera de ahí con
  `scripts/rac/convertir.mjs` y `scripts/combustible/convertir.mjs`.
- **Auditoría**:
  - Las claves de las 210 preguntas las revisaron agentes independientes: cero
    errores de clave.
  - Las explicaciones no nombran letras, porque el servidor baraja las
    opciones.
- **En la app**:
  - Cada módulo tiene su hub con tres puertas y el lector compartido. Acentos:
    RAC grafito `#3D4958`, Combustible azul queroseno `#005071`.
  - Una pantalla de práctica nueva y compartida, `PracticaQuiz`, que sirve
    para cualquier módulo con preguntas de práctica.
  - La evaluación usa el banco en el servidor.
  - De paso se arreglaron dos cosas del lector compartido que también le
    sirven a Performance: el primer párrafo salía más ancho que el texto, y un
    título largo de escenario quedaba debajo de la píldora.
- **Base**: la migración y los bancos ya están aplicados (comprobado contra la
  base el 24-sep). **Falta correr una migración más**, que va aparte de este
  encargo: `supabase/migrations/20260930000000_evaluacion_entrega_el_tema_del_banco.sql`.
  Hace tres cosas:
  1. El resultado de la evaluación dice qué unidades repasar, con su enlace.
     Arregla RAC, Combustible, Aerodinámica y Performance, y también RVSM. Hasta
     hoy el servidor mandaba el tema en nulo.
  2. RAC y Combustible exigen la lección completa también en el servidor.
  3. El catálogo de Combustible recibe los 10 escenarios que le faltaban. Sin
     ellos, la base rechaza ese avance.

  Se corre en el SQL Editor y luego `supabase/tests/evaluacion_temas.sql`.
  Todo está en `docs/RAC_COMBUSTIBLE_ESTADO.md`, «La base».
- **Dos alertas** (detalle en `supabase/HISTORIAL_DE_MIGRACIONES.md`):
  - El módulo **RVSM** ya está en el repo con su migración (rama `modulo-rvsm`),
    que es la que tiene registrada la versión `20260929000000`. Por eso la
    migración de arriba pasó a `20260930000000`.
  - La rama `claude/modulo-mel` usa la versión `20260928000000`, la misma de
    RAC y Combustible. Hay que renumerarla.

**Lo que falta, y es este encargo**: las imágenes y los dos videos de
apertura. Hoy los dos módulos muestran huecos rotulados en su lugar.

---

## 2. El encargo (para Codex)

### Reglas que no se negocian

Están en `CLAUDE.md`; estas son las que más muerden aquí:

- **Una fase por PR.** No mezcles imágenes de los dos módulos, ni imágenes con
  video.
- Las imágenes van en `public/modulos/rac/` y `public/modulos/combustible/`,
  **nunca** en `src/assets/`: ahí entrarían al precache de la PWA. Se pasan a
  WebP con `node scripts/optimizar-imagenes.mjs <origen> public/modulos/<modulo> <ancho>`.
  Ancho: 1600 para portadas de lección y figuras; los demás, a su medida (abajo).
- **No cambies títulos de lección ni el contenido.** Si una imagen pide un dato,
  sale del texto de su lección, con su numeral. **Nunca inventes cifras,
  numerales, fraseología ni accidentes.**
- **Sin texto dentro de las fotos**: ni rótulos, ni logos, ni matrículas, ni
  libreas de aerolíneas reales, ni personas reconocibles. El título lo pone la
  app. Una foto con texto generado por IA sale con letras rotas y un lector de
  pantalla no la lee.
- Contexto latinoamericano, sobrio y documental, como el resto del curso: luz
  natural, cabina y rampa reales, nada de ciencia ficción, neón ni degradados.
  El ámbar y el rojo son semántica en la app (alerta, error): que no dominen
  una foto.
- En textos, `alt` y pies: **sin raya larga** (`—`); van paréntesis o comillas
  angulares.
- Si usas una foto de Unsplash en vez de generarla, anótala en
  `docs/PHOTO_CREDITS.md` con su enlace.
- Antes de cada PR:
  - `npx tsc -b`, `npx vitest run` y `npm run build`;
  - mira la pantalla en el navegador, en escritorio y a 375 px;
  - adjunta capturas al PR.

### Fase 1 · RAC: tarjeta del tema y hub (5 imágenes)

| Rótulo que se ve hoy | Archivo | Medida | Qué muestra |
|---|---|---|---|
| `RAC-TEMA` | `public/modulos/rac/tema-rac.webp` | 1200×600 (2:1) | Licencia de piloto y certificado médico sobre el manual de operaciones, en cabina. Sin nombres ni números legibles |
| (hero del hub) | `public/modulos/rac/hub-hero.webp` | 2432×860 | Cabina de un avión de transporte en tierra, de día, con documentos sobre el pedestal. Espacio oscuro a la izquierda para el texto |
| `RAC-HUB-01` | `public/modulos/rac/hub-aprende.webp` | 1200×480 (5:2) | Manual de operaciones y RAC impresos sobre el pedestal |
| `RAC-HUB-02` | `public/modulos/rac/hub-practica.webp` | 1200×480 | Piloto estudiando con la tableta en el briefing, antes del vuelo (de espaldas o sin rostro reconocible) |
| `RAC-HUB-03` | `public/modulos/rac/hub-evaluacion.webp` | 1200×480 | Licencia y certificado médico sobre la mesa de un examen |

La foto del tema va a 1200×600, como las cinco que ya existen
(`public/modulos/aerodinamica/tema-aerodinamica-ala.webp`). El rótulo del
hueco dice 3:2, pero la tarjeta recorta y las demás son 2:1.

**Cómo se conectan**, copiando lo que ya hace Aerodinámica:

- La foto del tema se declara en **dos sitios**: la tarjeta de
  `src/pages/AirlinePrep.tsx` y la entrada del módulo en
  `src/components/aerolinea/carasDeModulo.ts`. Busca con grep
  `tema-aerodinamica-ala.webp` y haz lo mismo en cada sitio: `foto:` en lugar
  de `fotoHueco:`.
- En `src/pages/Rac.tsx`:
  - Las tres tarjetas llevan `photo:` con su archivo; el `photoHueco` se queda.
  - El hero pasa del navy liso a la foto con el mismo `<img>` y el mismo velo
    que Aerodinámica. Borra el comentario «Sin foto todavía».

### Fase 2 · Combustible: tarjeta del tema y hub (5 imágenes)

Igual que la fase 1, en `public/modulos/combustible/`, `src/pages/Combustible.tsx`
y los dos sitios de la foto del tema (`AirlinePrep.tsx` y `carasDeModulo.ts`):

| Rótulo | Archivo | Medida | Qué muestra |
|---|---|---|---|
| `CB-TEMA` | `tema-combustible.webp` | 1200×600 | Página de combustible del FMS con la predicción al destino y al alterno. Cifras ilegibles o desenfocadas: no pongas números inventados a la vista |
| (hero) | `hub-hero.webp` | 2432×860 | Camión cisterna repostando un avión de transporte en la rampa, al amanecer |
| `CB-HUB-01` | `hub-aprende.webp` | 1200×480 | Plan operacional de vuelo (OFP) con la tabla de combustible, sobre el pedestal |
| `CB-HUB-02` | `hub-practica.webp` | 1200×480 | Página de combustible del FMS durante un fuel check en crucero |
| `CB-HUB-03` | `hub-evaluacion.webp` | 1200×480 | Indicador de combustible de cabina con la reserva final marcada |

### Fase 3 · Video de apertura de RAC

Sigue **al pie de la letra** «Videos de módulo» en `CLAUDE.md`, y calca la
carpeta `videos/aerodinamica-modulo-intro/` (su `BRIEF.md`, `AGENTS.md`,
`SCRIPT.md` y `STORYBOARD.md` son el modelo): mismo preset, misma voz, mismo
ritmo, mismos subtítulos y mismo cierre. Solo cambian el acento y el contenido.

- Carpeta: `videos/rac-modulo-intro/`. Se versiona la fuente, no lo generado.
- **Antes de generar voz**: `audio_request.json` con `"lang": "es"`. Si no, la
  voz sale con fonética inglesa y hay que rehacer el video (ya pasó dos veces).
  Voz William Shanks, `001248bb63f847888d37b766ee8b3a47`, velocidad 0.92.
- 8 escenas, 60 s como tope, un remanso de silencio al final de cada escena, y
  **todos los clips de una escena cubren su duración entera**.
- Salida:
  - `public/modulos/rac/intro.mp4`, comprimido como los demás (el de
    Aerodinámica es la referencia de peso);
  - su primer cuadro, `public/modulos/rac/intro-poster.webp`, a 1280×720.
- En cuanto estén los dos archivos, el reproductor aparece solo
  (`EspacioVideo`). **No toques código.**
- Título ya puesto en el hub: «Los reglamentos que te van a preguntar».
  Acento `#3D4958` (grafito), con `#A9BBD4` como claro.
- La idea: qué RAC le tocan a un piloto y por qué se pregunta por el numeral.
  - Datos que puede decir sin inventar: hoy las licencias van por el RAC 2 y el
    RAC 61 aplica desde el 31 de agosto de 2027. La aerolínea opera bajo el
    RAC 121 *además* del RAC 91, no en lugar de él.
  - Cualquier otro dato sale de `docs/contenido/rac.md` con su numeral.

### Fase 4 · Video de apertura de Combustible

Igual que la fase 3, en `videos/combustible-modulo-intro/`, con salida
`public/modulos/combustible/intro.mp4` e `intro-poster.webp`.

- Título ya puesto: «Con cuánto aterrizo, y dónde». Acento `#005071`, claro
  `#8FD4CE`.
- La idea: la pregunta no es cuánto combustible llevas, sino con cuánto vas a
  aterrizar, y la decisión se toma mientras todavía hay opciones.
- Toda cifra en pantalla es ilustrativa y va marcada como tal. **Ningún valor
  normativo** (minutos de reserva, porcentajes de contingencia) que no esté en
  `docs/contenido/gestion-combustible.md` con su referencia.
- La fraseología, exacta y como está en los capítulos 16 y 17:
  - en español: «COMBUSTIBLE MÍNIMO» y «MAYDAY, MAYDAY, MAYDAY, COMBUSTIBLE»
    (RAC 121);
  - en inglés: «MINIMUM FUEL» y «MAYDAY MAYDAY MAYDAY FUEL» (OACI).

  Nada de «estamos bajos de combustible»: el capítulo explica por qué.

### Fase 5 · Portadas de lección (19 + 23)

- Archivos: `public/modulos/rac/leccion-01.webp` a `leccion-19.webp` y
  `public/modulos/combustible/leccion-01.webp` a `leccion-23.webp`.
- Medida: 1600×900 (16:9), **foto sin texto**, como las de Aerodinámica
  (`public/modulos/aerodinamica/leccion-01.webp`). El lector pone encima el
  número y el título.
- Una escena por lección que se entienda sin leer. Los títulos están en
  `src/lib/racLeccion.ts` y `src/lib/combustibleLeccion.ts` (campo `title`), y
  el contenido de cada una, en los dos documentos de `docs/contenido/`. Ideas:
  - RAC 67 (certificado médico): consultorio de medicina aeronáutica.
  - RAC 212 (búsqueda y salvamento): helicóptero sobre la cordillera.
  - RAC 114 (investigación): hangar con restos cubiertos, sin dramatismo.
  - Combustible 11 (tankering): repostaje en un aeropuerto de montaña.
  - Combustible 18 (esperas): patrón de espera visto en el ND.
- Cuando estén **todas** las de un módulo:
  - quita `portadaAuto: false` de `src/pages/RacLeccion.tsx` o
    `src/pages/CombustibleLeccion.tsx`, y su comentario;
  - revisa que la primera lección y una del medio se vean bien.

  Con una sola que falte, el lector pinta el hueco en esa lección: no lo quites
  a medias.
- Un PR por módulo.

### Fase 6 · Las 15 figuras de Combustible

Son **diagramas técnicos**, no fotos: la lista con su medida está en el Anexo A
de `docs/contenido/gestion-combustible.md` (IMG-C01 a IMG-C20), y la descripción
completa de cada una («IMAGEN SUGERIDA» y «OBJETIVO»), en su capítulo.

- **Dibújalas como vector** (SVG a mano o con código) y expórtalas a WebP a la
  medida del anexo.
  - Tipografía Archivo para títulos y mono para rótulos; papel `#FBFAF8`,
    tinta `#16191D`, acento `#005071`.
  - El verde es «correcto» y el ámbar y el rojo son alerta: úsalos solo con
    ese sentido (la reserva final como barrera, por ejemplo).
  - **No las generes con IA de imágenes**: saca los números mal y el texto
    ilegible.
- **Cada número que aparezca sale del texto de su capítulo.** Si el capítulo
  no da cifra, la figura no la da.
- Destino: `public/modulos/combustible/figuras/img-c01.webp`, etc.
- **Para conectarlas hay que tocar el convertidor**: hoy
  `scripts/combustible/convertir.mjs` convierte cada `[ESPACIO PARA IMAGEN]`
  en un bloque `hueco`.
  - Haz que, si existe `public/modulos/combustible/figuras/<código en
    minúsculas>.webp`, emita un bloque `figura`
    (`src/lib/docBlocks.ts`, `FiguraBlock`) con `src`, `alt` (de «IMAGEN
    SUGERIDA», resumido a una frase), `ancho`, `alto` y `pie` (de
    «OBJETIVO»).
  - Si el archivo no existe, sigue emitiendo el hueco.
  - `CB_FIGURAS_PENDIENTES` lista solo las que faltan, y las pruebas
    (`src/lib/combustibleContenido.test.ts`, `src/lib/leccionesConteo.test.ts`)
    cuentan huecos más figuras = 15.
  - Luego `node scripts/combustible/convertir.mjs`, y comprueba que el
    catálogo no cambió: `npx vitest run scripts/catalogo`.

### Al terminar cada fase

- Actualiza la lista «Pendiente» de `docs/RAC_COMBUSTIBLE_ESTADO.md`.
- En el PR, pon capturas del antes y el después.
- No toques los bancos (`contenido/bancos/`), las migraciones ni `vercel.json`.
