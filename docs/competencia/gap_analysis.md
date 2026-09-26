# Aviatory frente a la competencia: brechas de las capas 1 y 2

**Fecha:** 26-sep-2026 · **Base:** la columna «Aviatory» de `analisis_features.md` (código de `main` en `4dfa584`, con el #324 de convocatorias) y las fichas de `analisis_top15.md`.

> Sin pricing y sin SEO: son de la fase final.

**Esfuerzo**, para el equipo de hoy (dos personas con agentes):

| Talla | Duración | Qué suele implicar |
|---|---|---|
| **S** | Hasta 1 semana | Reusa lo que existe |
| **M** | 2 a 4 semanas | Tabla nueva, pantalla nueva o contenido propio |
| **L** | Más de un mes | Motor nuevo, proveedor externo o contenido que hay que investigar y validar |

## Resumen

| # | Feature (capa) | Aviatory hoy | Esfuerzo | Quién lo hace mejor |
|---|---|---|---|---|
| 1 | Freemium sin tarjeta (1) | ✅ | S | Rotate |
| 2 | Rutas y guías por aerolínea (1) | ⚠️ | M | FlightDeckIQ, Loop |
| 3 | Banco de entrevista HR con respuestas modelo (1) | ⚠️ | M | Rotate, Vectors to Hired |
| 4 | Readiness score y analítica (1) | ⚠️ (el readiness no funciona) | M | PilotentestTraining, PilotAptitudeTest |
| 5 | Pruebas cognitivas (1) | ⚠️ | L | PilotAptitudeTest, PilotentestTraining |
| 6 | Banco técnico (1) | ✅ (falta por tipo de avión) | M | SkyStudy, AeroTest |
| 7 | Entrevista con IA que califica ICAO + STAR (2) | ❌ | L | FlightDeckIQ |
| 8 | Mock ICAO con 6 descriptores y rúbrica pública (2) | ⚠️ (autoevaluado) | M, sobre la 7 | Rotate, CaptainPilot |
| 9 | Tablero «Mi proceso» por etapas de aerolíneas LATAM (2) | ⚠️ | M | Loop, FlightDeckIQ |
| 10 | Percentiles contra la cohorte (2) | ❌ | S | PilotAptitudeTest |
| 11 | Diagnóstico + plan adaptativo (2) | ⚠️ | L | PilotentestTraining, Rotate |
| 12 | Audio ATC con acentos LATAM (2) | ⚠️ (voz del navegador) | M | Rotate, SkyStudy |

**Lo que sale de acá:**
- **Los huecos más caros** son la entrevista con IA (7), el diagnóstico con plan adaptativo (11) y las cognitivas (5).
- **Los más baratos con impacto** son percentiles (10), porque los datos ya se corrigen en el servidor, y el readiness (4), porque las métricas existen y solo falta juntarlas bien.

## Capa 1: mínimo para ser creíble

### 1. Freemium o trial sin tarjeta (F29)
- **Qué tiene:**
  - Hoy todo es gratis durante el lanzamiento, sin tarjeta, y los planes pagos dicen «Próximamente» (`/pricing`).
  - Existe la tabla `subscriptions`, pero solo Wingman la lee: 5 conversaciones al mes sin Pro.
- **Qué le falta:**
  - Un mecanismo de límites por plan que cualquier módulo pueda consultar, en vez de uno por módulo como Wingman.
  - Una muestra sin registro, como la de Rotate o Level6. Hoy **no se hace**: sería una página pública indexable.
- **Esfuerzo:** S para dejar el mecanismo listo. Los límites concretos son pricing: fase final.
- **Quién lo hace mejor:** Rotate (gratis para siempre con límites diarios y test de 10 preguntas sin registro), FlightDeckIQ (7 días con 1 entrevista IA gratis) y SkyStudy (aptitud sin cuenta).

### 2. Rutas y guías por aerolínea (F10, F19)
- **Qué tiene:**
  - Elegibilidad (`/app/match`): las convocatorias abiertas de 14 aerolíneas, por país, frente a las horas y el inglés del piloto («Te falta… para lo que pide su convocatoria»).
  - `convocatorias`: 11 portales se leen solos cada 6 h y 3 van a mano. Avisa cuando al piloto le faltan pocas horas para una.
  - `postulaciones` con su etapa (incluye «simulador» y «entrevista»).
  - «Qué cayó en el examen», que es de la Aerocivil y no de aerolínea.
- **Qué le falta:**
  - Las **etapas reales de cada aerolínea** (primero las que contratan en Colombia: Avianca, LATAM, Copa, Wingo, JetSMART, SATENA y Clic): qué prueba usa cada una, en qué idioma, cuánto dura y qué se evalúa.
  - En cada etapa, un enlace a la práctica de Aviatory que la prepara.
  - Guías con fecha de actualización y fuente.
  - Hay que investigarlas con fuente: **no se inventan**. Donde no haya fuente, se marca «no verificado» y se completa con los reportes de candidatos (roadmap 13).
- **Esfuerzo:** M. La interfaz es sencilla; el trabajo es la investigación por aerolínea.
- **Quién lo hace mejor:**
  - FlightDeckIQ: etapas con la herramienta de cada una (HireVue, Maki, COMPASS, FAST).
  - Loop: tablero «mi proceso» por aerolínea con checklist.
  - PAT tiene páginas de Copa y Aeroméxico, pero son fichas de venta.

### 3. Banco de preguntas de entrevista HR/competencias con respuestas modelo (F16)
- **Qué tiene:**
  - 15 preguntas de «intro speaking» con intención, temas y repreguntas, de solo lectura (`/app/entrevistas/speaking`).
  - Preguntas técnicas abiertas al cierre de los niveles de algunos módulos (Aeropuertos, Mercancías, Meteorología, MEL).
  - «Entrevista HR y CRM» figura como «en camino».
- **Qué le falta:**
  - Un banco en el servidor, igual que las evaluaciones (`contenido/bancos`), por aerolínea y por competencia.
  - Cada pregunta con 4 capas: pista, respuesta modelo, red flags y repreguntas probables.
  - Práctica escrita y hablada (el dictado del navegador ya existe).
  - Conexión con el experience sheet (roadmap 11).
  - Contenido en inglés por defecto.
- **Esfuerzo:** M.
- **Quién lo hace mejor:** Rotate (4 capas por pregunta, 9 packs de 100) y Vectors to Hired (miles de tarjetas por operador; práctica hablada con nota STAR incluso gratis).

### 4. Readiness score y analítica (F25)
- **Qué tiene:**
  - El avance se mide bien: `panel_tarjetas()` (12 módulos, mapa de actividad, dominio por materia), `pca_stats()`, `icao_progreso()` y el radar del perfil.
  - **Pero el readiness no funciona:** `user_pca_readiness` lee `user_pca_exam_attempts`, que nadie escribe, y `computeAirlineProgress()` no se usa.
- **Qué le falta:**
  - **Un solo número por aerolínea objetivo** que combine inglés, técnico, psicotécnico y entrevista.
  - Tendencia y «qué subir primero».
  - **La metodología publicada** dentro de la app (la confianza como feature).
- **Esfuerzo:** M. Los datos ya están en el servidor.
- **Quién lo hace mejor:**
  - PilotentestTraining: Clearance Score con diagnóstico inicial.
  - PAT: percentil, leaderboard y predicción a 14 días.
  - FlightDeckIQ: «probabilidad de contratación», aunque sin metodología publicada; ese es su punto débil.

### 5. Pruebas cognitivas (F06)
- **Qué tiene:** 224 ejercicios corregidos y cronometrados en el servidor, en `/app/aerolinea/psicotecnicas` (aprende, práctica, evaluación y simulacro): 186 numéricos (casi todos sucesiones), 20 abstractos y 18 espaciales.
- **Qué le falta:**
  - Memoria (visual y de trabajo), cálculo mental con reloj, atención y concentración, y tiempo de reacción.
  - Más variedad fuera de las sucesiones.
  - Ítems generados, para que no se memoricen.
  - Psicomotor y personalidad (F07 y F09) están fuera de la capa 1; van en el backlog del roadmap.
- **Esfuerzo:** L. Cada familia nueva es un motor de prueba, no solo contenido.
- **Quién lo hace mejor:** PAT (~190 actividades, réplicas COMPASS y PILAPT), PilotentestTraining (las 10 pruebas DLR y simulación del día) y SkyStudy (74 ejercicios gratis en 13 áreas).

### 6. Banco técnico (F12)
- **Qué tiene:**
  - El banco del Examen PCA de la Aerocivil (cifrado, corrección en el servidor, estadísticas y cuenta atrás).
  - 12 módulos de Ingreso a aerolínea con evaluación en el servidor.
  - Es la parte más profunda de Aviatory.
- **Qué le falta:**
  - **Bancos por tipo de avión** (A320 y B737, las familias que vuela la mayoría de las aerolíneas de Elegibilidad) para la entrevista técnica y el sim check. Hoy no hay (F14).
  - Repetición espaciada sobre las falladas.
- **Esfuerzo:** M, sobre todo contenido técnico que se debe revisar con un piloto habilitado.
- **Quién lo hace mejor:** SkyStudy (31.032 preguntas con motor adaptativo) y AeroTest (bancos por tipo: A320, B737, B787…).

## Capa 2: diferenciadores

### 7. Entrevista con IA que califica ICAO + STAR (F17, F03)
- **Qué tiene:**
  - Nada que califique. `/app/entrevistas` es una portada con «Pronto».
  - El dictado del navegador (`useSpeechToText`) transcribe sin nota.
  - Wingman ya resolvió llamar a Claude con límites en el servidor, y hay tablas `interview_sim_*` sin uso y sin permisos.
- **Qué le falta:**
  - Todo el pipeline: grabación que se sube, transcripción en el servidor, evaluación de pronunciación, calificación con rúbrica, reporte y conexión con el plan.
  - La calibración contra evaluadores humanos.
  - Ver `spec_entrevista_ia.md`.
- **Esfuerzo:** L.
- **Quién lo hace mejor:**
  - FlightDeckIQ: video con IA que califica ICAO ELP y STAR, solo para Emirates y Riyadh Air.
  - AeroScout (Avienne) tiene repreguntas dinámicas, pero solo para cabina.
  - Nadie lo hace para pilotos de LATAM.

### 8. Mock ICAO con los 6 descriptores y rúbrica pública (F02)
- **Qué tiene:** simulacro TEA completo (`/app/icao/simulacro`), cronometrado y con audios reales. El nivel es **autoevaluado** con los 6 descriptores. La grabación queda solo en el navegador.
- **Qué le falta:**
  - Calificación automática por descriptor, con el mismo pipeline de la entrevista.
  - **Rúbrica pública y reporte de muestra.**
  - Verificar con la Aerocivil el formato vigente del examen colombiano y agregarlo junto al TEA.
- **Esfuerzo:** M una vez exista el pipeline de la 7; L si se hace sola.
- **Quién lo hace mejor:** Rotate (TAE Perú con 6 descriptores y el más bajo manda) y CaptainPilot (13 exámenes con IA de pronunciación). **Ninguno publica rúbrica**: ahí se gana.

### 9. Tablero «Mi proceso» por etapas de aerolíneas LATAM (F10)
- **Qué tiene:** las piezas sueltas: postulaciones con etapa, convocatorias, elegibilidad con brecha y módulos con progreso.
- **Qué le falta:**
  - Un tablero por aerolínea objetivo con las etapas (de la feature 2) como checklist.
  - En cada etapa, la práctica que la prepara y su avance.
  - La brecha de requisitos.
  - La convocatoria abierta, con aviso por Realtime y no por correo.
- **Esfuerzo:** M, después de la feature 2.
- **Quién lo hace mejor:** Loop (checklist por aerolínea con progreso en un solo tablero) y FlightDeckIQ (etapas reales).

### 10. Percentiles contra la cohorte (F11)
- **Qué tiene:** los resultados ya se corrigen y guardan en el servidor (`psico_sesiones`, `evaluacion_sesiones`, `vault`). La columna `user_psych_attempts.percentile` existe, pero sin uso.
- **Qué le falta:**
  - Una función que calcule el percentil por prueba y nivel, y opcionalmente por aerolínea objetivo.
  - Un mínimo de cohorte (por ejemplo, 30 pilotos) antes de mostrarlo, para no mostrar ruido ni identificar a nadie.
  - Mostrarlo en los resultados.
- **Esfuerzo:** S.
- **Quién lo hace mejor:** PilotAptitudeTest (percentil contra la cohorte de la misma evaluación, leaderboard y predicción a 14 días) y SkyTest (comparación con datos anónimos de otros usuarios).

### 11. Diagnóstico inicial + plan adaptativo (F24)
- **Qué tiene:**
  - El onboarding pide etapa, horas, licencias, aerolínea objetivo y fecha, y días y hora de estudio.
  - El test inicial estima el nivel ICAO y la materia más floja.
  - Existen `plan_de_estudio` (con recordatorios) y Mi ruta.
  - **Nada se reajusta con los resultados.**
- **Qué le falta:**
  - Un diagnóstico corto de los tres pilares: una respuesta hablada, 3 mini psicotécnicas y una muestra técnica.
  - Un plan semanal por aerolínea y fecha que se recalcule después de cada sesión (primero con reglas, después con IA).
  - Tareas del día.
- **Esfuerzo:** L.
- **Quién lo hace mejor:**
  - PilotentestTraining: Cockpit Readiness Check de 6 pruebas, más FlightBrain, que reajusta el plan.
  - Rotate: plan día a día según la fecha del examen.
  - PAT: CoPilot Wizard, con recomendaciones priorizadas.

### 12. Audio ATC con acentos LATAM (F04)
- **Qué tiene:** Comunicaciones ATC completo (69 lecciones, 126 prácticas con radio VHF simulada, readback por voz corregido por reglas), pero **suena con la voz del navegador**, sin audios grabados.
- **Qué le falta:**
  - Audios generados con voces de calidad y acentos de BOG, MDE, CLO, PTY, LIM, SCL y MEX.
  - Ruido de radio.
  - Un simulador de readback con escenarios por aeropuerto.
  - Grabaciones ATC reales, solo si se verifica que la licencia lo permite.
- **Esfuerzo:** M.
- **Quién lo hace mejor:** Rotate (audio ATC con acentos, incluido el hispano), SkyStudy (simulador ATC de 100 escenarios) y CaptainPilot (Aviation Listeners con ATC real).

## Brechas transversales que no están en las capas pero pesan

- **Idioma (F31).** La visión dice que el producto va en **inglés por defecto** y el español es la capa de soporte, pero hoy todo está en español fijo en el código, sin i18n. **Decisión previa:**
  - (a) la interfaz se vuelve bilingüe con inglés por defecto (L grande: 12 módulos de contenido en español); o
  - (b) la interfaz sigue en español y la práctica de inglés (entrevista, ICAO, ATC) va en inglés.

  Sin esa decisión, cada feature nueva duplica trabajo.
- **Confianza.** Los competidores fallan en cifras que se contradicen, autores anónimos y reseñas sin fuente. Aviatory ya limpió sus textos (PR #320). Falta:
  - autores con nombre en el contenido;
  - metodología pública del readiness;
  - la rúbrica del mock.
- **Arreglos rápidos que salieron al mapear el código:**
  - Wingman sale con voseo («Sos», «Podés») y el proyecto usa tuteo.
  - Su caché de prompt no funciona: el prompt de sistema tiene unos 500 tokens y el mínimo para cachear es 1024.
  - Usa `claude-sonnet-4-5` por defecto.
  - `/app/aerolinea/simulacro` se llama «Simulacro de entrevista técnica», pero es opción múltiple: va a chocar con la entrevista con IA.
