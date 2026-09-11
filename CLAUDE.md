# Aviatory

App de preparación para pilotos que quieren ingresar a una aerolínea en Latinoamérica.
Vite + React 19 + TypeScript estricto + Tailwind v4 + react-router v7 + Supabase + Vercel. PWA con Workbox.

## Reglas de trabajo que fijó Camilo

- **Una cosa a la vez.** Si dice «sección 1», se trabaja solo la sección 1.
- **Verificar antes de afirmar.** No gastar tokens por gastar.
- **Nunca borrar filas de la base de datos del usuario.** Se le entrega el SQL para que lo corra él.
- **No cambiar títulos de lección ni portadas** sin pedirlo: las imágenes ya están hechas y numeradas por módulo.
- **No convertir ni recomprimir** las capturas reales de NOTAM.

## Cómo se edita este repo

El árbol de trabajo está en CRLF y los heredocs de bash se comen las barras invertidas.
**Las ediciones van por scripts `.mjs` en el scratchpad**, usando el ayudante `_ed.mjs`
(`rx()` une con `\r?\n`; `editor(path).rep(a, b).cut().save()`). Escribir esos scripts con
la herramienta Write, no con heredoc.

Comprobar siempre con `npx tsc -b` (no `--noEmit`). No hay Prettier: la indentación es a mano.

`deepPlain()` en `src/lib/notam.ts` reescribe la raya larga `—` como `: `. **No usar rayas
largas en el contenido**; van paréntesis o comillas angulares.

**Pantallas con sesión**: `AppLayout` es la ruta de layout de `App.tsx` y se monta una sola vez
(barra, Wingman, avisos y su suscripción). Una pantalla nueva con barra va como ruta hija ahí y
**no se envuelve en `<AppLayout>`**; las de pantalla completa (lecciones, onboarding) van en el
grupo sin layout. El chip de racha de la barra se publica con `useRachaEnBarra()`. Los avisos y
los toasts de logros llegan por Realtime (`NotificacionesProvider`): nada se consulta por sondeo.

## Sistema de diseño

El lector de lecciones es **uno solo y compartido**: `src/components/lesson/LectorLeccion.tsx`.
NOTAM, Mercancías y Meteorología son envoltorios de configuración (`LectorModulo`). Si un
módulo nuevo necesita lector, se configura, no se escribe otro.

Papel y tinta comunes: `--ln-paper #FBFAF8`, `--ln-ink #16191D`, `--ln-navy #14202E` (el índice
lateral). Titulares en **Archivo**. Rótulos en mono, mayúsculas, `tracking 0.16em`.

Cada módulo cambia solo el acento, re-anclando `--av-blue-500`:

| Módulo | Tema | Acento |
|---|---|---|
| NOTAM | `.lector-notam` | `#123A6B` azul carta |
| Mercancías | `.lector-notam .lector-mp` | `#7A5C12` mostaza (tokens `--av-dg-*`) |
| Meteorología | `.lector-notam .lector-mt` | `#1A4A52` turquesa petróleo (tokens `--av-mt-*`) |

**El ámbar y el rojo no son identidad, son semántica**: significan alerta y error en toda la
app. No usarlos como color de módulo. Y `--av-green-400` es el verde de «correcto»: por eso
Meteorología dejó de ser verde. Aunque el del módulo fuera más oscuro seguía
siendo la misma familia, y un módulo entero teñido del color del acierto se lee
como si todo estuviera validado.

## Bloques de contenido

Los genéricos están en `src/lib/docBlocks.ts` y los pinta `DocBlock` en
`src/components/DocLessonBlocks.tsx`. Los de curso, en `src/components/lesson/`:

- **`BloquesModulo.tsx`**: `norma`, `casoReal`, `enLaOperacion`, `escenario`, `ponAPrueba`, `fichas`.
- **`BloquesPiloto.tsx`**: `reconoce` (imagen real con puntos numerados: qué es / qué significa /
  qué te importa), `piensaComoPiloto` (situación con la respuesta tras un botón),
  `entrevista` (tres niveles sin opciones, con respuesta esperada y conceptos clave),
  `detalleTecnico` (la norma completa, plegada).

Todos toman el acento del lector en el que estén. Sirven para cualquier módulo.

## Evaluaciones: el banco vive en el servidor

Las evaluaciones que dan nota (NOTAM, Meteorología, Mercancías y el simulacro de
aerolínea) **no traen sus preguntas en el bundle**. El servidor sortea, corrige y guarda
el intento (`evaluacion_iniciar`, `evaluacion_responder`, `evaluacion_terminar`); el
cliente solo recibe enunciados y opciones, y la corrección cuando la evaluación la da.
Así nadie ve las respuestas abriendo DevTools ni se inventa un puntaje.

- **Bancos**: `contenido/bancos/<banco>.json` (fuera de `src/`). Se editan ahí.
- **Cargarlos**: `node scripts/bancos/sembrar.mjs <banco>` (o sin argumento, todos) imprime el
  SQL (upsert por `id`; lo que se quita del archivo queda inactivo, nunca se borra).
  Se corre en Supabase.
- **Reglas de cada evaluación** (preguntas por intento, aprobación, cuándo se ve la
  corrección, de qué bancos sale): tabla `evaluaciones` y `evaluacion_fuentes`, por migración.
- **Pantallas**: `ExamenModulo` (corrección al final) y `QuizEngine` (corrección inmediata),
  ambos sobre `useEvaluacion` y `src/services/evaluaciones.ts`.
- `src/lib/evaluacionesContenido.test.ts` falla si un archivo de `src/` vuelve a traer
  preguntas de un banco, o si los conteos que anuncia la app no cuadran con los bancos.
  **Un «pon a prueba» de lección no debe copiar una pregunta de evaluación.**
- En CI, `scripts/bancos/verificar-dist.mjs` revisa el build: si un texto de un banco
  aparece en `dist/`, falla.
- **Progreso de módulo** (NOTAM, Meteorología, Mercancías): la base solo acepta secciones y
  prácticas que existen, según `contenido/catalogo/modulos.json`, y la evaluación de NOTAM y
  Mercancías se abre con la lección completa en la base. Las claves de práctica salen de sus
  funciones (`claveEjercicioNotam`, `claveEjercicioMetar`, `claveCaso`…), nunca escritas a mano.
  Si cambia el contenido, `scripts/catalogo` falla: `ACTUALIZAR_CATALOGO=1 npx vitest run
  scripts/catalogo` y luego `node scripts/catalogo/sembrar.mjs` (SQL para Supabase).
- Al terminar un intento, el servidor entrega la correcta y la explicación **solo de lo
  respondido**; la revisión tiene que funcionar sin ellas en las preguntas sin responder.

**Psicotécnicas** van igual (entrenamiento, evaluación y simulacro): el servidor sortea la
tanda, lleva el reloj y calcula precisión, velocidad y global (`psico_iniciar`,
`psico_responder`, `psico_aplazar`, `psico_terminar`). Diferencias:

- La fuente editorial sigue siendo `src/data/psicotecnicas/` (la usan los verificadores
  de `scripts/psicotecnicas/`), pero **la app no la importa**: ESLint lo prohíbe salvo
  `@/data/psicotecnicas/aprende` (resueltos y teoría del cubo).
- Después de editar ejercicios: `node scripts/bancos/exportar-psicotecnicas.mjs` (escribe
  `contenido/bancos/psicotecnicas.json`) y `node scripts/bancos/sembrar.mjs psicotecnicas`.
  Si se olvida, `src/lib/psicotecnicasBanco.test.ts` falla; también si cambian los conteos
  de `src/lib/psicotecnicasConteo.ts`.
- Los tiempos que cuentan son los de `private.psico_limite()`; `TIEMPOS` y `FACTOR_NIVEL`
  en `src/lib/psicotecnicas.ts` son su espejo para los textos.

**Quiz de inglés ICAO** (y la lectura ICAO del test inicial): las preguntas están en
`icao_quiz_questions` y el cliente las lee sin `correct_answer` ni `explanation`. Cada
respuesta pasa por `icao_quiz_responder`, que corrige, guarda el intento y devuelve la
correcta y la explicación. Todo va por `src/services/icaoQuiz.ts`.

## Base de datos: cómo se escribe una migración

- **Políticas RLS con `(select auth.uid())`**, nunca `auth.uid()` a secas: así Postgres lo
  calcula una vez por consulta y no una vez por fila.
- Toda clave foránea lleva su índice.
- Lo que cambia puntaje, logro, racha o acceso **no se escribe desde el cliente**: va por una
  función `security definer` con `set search_path = ''` que valida `auth.uid()`. Las tablas
  de intentos solo dan `select` al cliente.
- **Nada nace abierto.** Una tabla, secuencia o función nueva no tiene permisos para `anon`
  ni `authenticated` (migración `20260911200000`). La migración que la crea hace
  `enable row level security`, escribe sus políticas y concede solo lo que esas políticas usan
  (`grant select on table public.x to authenticated`). Sin política para una operación, no
  hay `grant` para ella. Ids con `generated by default as identity`, que no pide permiso sobre
  la secuencia. Funciones: `grant execute … to authenticated` solo si el cliente la llama;
  a `anon`, ninguna (la única excepción es `check_username_available`, que usa el registro).
- Antes de aplicar, se prueba dentro de un bloque `do` que termina en excepción (todo se
  deshace), simulando al piloto con `set_config('request.jwt.claims', …)` y
  `set local role authenticated`. Nunca se borran filas.

## Cabeceras de seguridad (vercel.json)

La app sale con una **Content-Security-Policy estricta**: scripts solo del propio dominio (y el
script del tema de `index.html`, autorizado por hash), conexiones solo a Supabase, fuentes
de Google Fonts, sin iframes. Si algo nuevo carga de otro dominio (un video embebido, una
librería por CDN, otra API), **hay que agregar ese dominio a la directiva que toque en
`vercel.json`**; si no, el navegador lo bloquea en producción aunque en `npm run dev` funcione.
Si se cambia el script en línea de `index.html`, cambia su hash: `src/cabecerasHttp.test.ts`
falla y dice cuál poner.

## Cómo se enseña aquí

El alumno es **un piloto que prepara entrevista de aerolínea**, no personal de tierra ni
estudiante de la materia. Cada concepto responde: qué necesita saber un piloto, cómo se lo
encuentra en operación, cómo se lo pueden preguntar, qué debe reconocer de vista y qué
decisión implica.

- **Ver → identificar → interpretar → decidir**, no leer y pasar de página.
- La norma completa no desaparece: baja a `detalleTecnico` para que no compita con la enseñanza.
- **Nunca inventar accidentes, cifras ni artículos.** Lo que no tenga fuente cargada va como
  `escenario de práctica` o con un callout `verificar` diciendo qué documento consultar.
- Los huecos de imagen van rotulados con su medida y con qué imagen hace falta y por qué.

## Imágenes

Van a `public/modulos/<modulo>/` y **no** a `assets`: bajo `assets` entrarían al precache del
service worker y cada piloto se las descargaría al instalar. Portadas por nombre de archivo:
`leccion-NN.webp`. Conversión con `node scripts/optimizar-imagenes.mjs <origen> <destino> <ancho>`.

## Videos de módulo

Cada módulo abre con un video de ~1 minuto hecho con HyperFrames (`videos/<modulo>-modulo-intro/`).
Se versiona la fuente y no lo generado; el mp4 va comprimido a `public/modulos/<modulo>/intro.mp4`
y lo muestra `src/components/modulo/VideoIntro.tsx`.

**TRAMPA DEL IDIOMA DE LA VOZ.** El flujo `faceless-explainer` NO le pasa el idioma al motor de
audio, que cae en `"en"`. Con eso HeyGen pronuncia el español con fonética inglesa («pintiura»,
«contenedour») y los tiempos de los subtítulos salen del modelo de transcripción solo-inglés. Pasó
en los dos primeros videos y hubo que rehacerlos. Antes de generar voz, comprueba que
`audio_request.json` lleve `"lang": "es"`. La voz de la serie es **William Shanks**
(`001248bb63f847888d37b766ee8b3a47`, velocidad 0.92), que HeyGen registra como española: el
problema nunca fue la voz, fue el idioma.

En la máquina de Camilo la skill está parcheada para leer `language:` del `BRIEF.md`, pero las
skills no se versionan, así que **ese parche no llega a otra máquina** y un `skills update` lo borra.

Las demás reglas de la serie: 8 escenas, tope de 60 s, un remanso de silencio al final de cada
escena, y **todos los clips de una escena cubren su duración entera** (el cierre de NOTAM se quedó
1,6 s en blanco porque sus capas terminaban antes que la escena).

## Skills instaladas

52 skills de terceros en `.agents/skills` (36 MB), enlazadas en `.claude/skills`. **El contenido
está ignorado por git; lo que se versiona es `skills-lock.json`** para que la instalación sea
reproducible. Ver `docs/SKILLS.md` para cuáles sirven y cuáles no.

**Ojo con impeccable**: instaló hooks en `.claude/settings.local.json` que ejecutan un binario
tras cada `Edit`/`Write` y al cerrar cada turno. Es la única skill que opina sin que la llamen.
