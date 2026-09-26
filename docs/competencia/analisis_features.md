# Aviatory: features comunes y diferenciadores de la competencia

**Fecha:** 26-sep-2026. **Base:** análisis profundo de los 15 competidores de `analisis_top15.md`.

**Premisas de Aviatory:**
- El idioma del competidor no importa: todo lo bueno se trae.
- El producto va enfocado al inglés, que es el idioma por defecto.
- La meta es ser la plataforma más robusta en español para Latinoamérica.

> **Pricing y SEO:** pendientes para la FASE FINAL. Este documento es solo de producto.

## Los 15 analizados

| Código | Plataforma | Foco |
|---|---|---|
| Rotate | [rotatepilot.com](https://rotatepilot.com) | Todo en uno: teórico, TAE/ICAO, entrevista, aptitud y tutor IA |
| FDF | [flightdeckfriend.com](https://www.flightdeckfriend.com) | Hub de contenido, PDFs de entrevista, ADAPT oficial vía Symbiotics, coaching y simulador |
| ASP | [airlineselectionprogramme.com](https://online.airlineselectionprogramme.com) | Curso de selección con 16PF, inglés FCL.055 en vivo y preparación de simulador |
| FDIQ | [flightdeckiq.com](https://flightdeckiq.com) | Rutas por etapas (Emirates, Riyadh Air) y video con IA que califica ICAO + STAR |
| YPI | [yourpilotinterview.com](https://yourpilotinterview.com) | Banco de entrevista técnica A320/B737 y entrevista one-way con IA |
| PAT | [pilotaptitudetest.com](https://pilotaptitudetest.com) | Líder en aptitud: 190 actividades, 150+ aerolíneas, analítica y ejercicio grupal |
| SkyT | [skytest.com](https://www.skytest.com) | Software por batería (DLR y otras), hardware propio y B2B |
| PTT | [pilotentest.training](https://pilotentest.training) | Especialista DLR con la mejor UX: Clearance Score, IA y garantía |
| VTH | [vectorstohired.com](https://vectorstohired.com) | Flashcards de entrevista en EE. UU., Voice Coach y gouge pagado |
| AeroS | [aeroscout.net](https://aeroscout.net) | Empleo: matching por elegibilidad, auto-aplicación y entrevistadora IA (cabina) |
| CaptP | [captainpilot.com](https://www.captainpilot.com) | LMS de inglés ICAO con IA de speaking, 13 exámenes y app |
| L6A | [level6aviation.com](https://www.level6aviation.com) | Evaluador ICAO oficial online (LTB): examen, simulación y banco |
| SkyS | [skystudyatpl.com](https://skystudyatpl.com) | Bundle adaptativo gratis en beta: aptitud, ATPL, ICAO, ATC y carrera |
| Loop | [loopaviation.com.br](https://loopaviation.com.br) | Brasil: ANAC, ICAO SDEA, psicotécnicos y tablero por aerolínea |
| AeroT | [aerotest.cl](https://aerotest.cl) | Chile, en español: 42+ licencias DGAC, bancos por tipo de avión, IA y B2B |

## 1. Resumen

1. **Nadie tiene los 3 pilares con profundidad.** El más completo, Rotate, cubre ~61 % de las 32 features, pero es amplio y poco profundo. Le siguen SkyStudy (58 %) y PilotAptitudeTest (50 %). Los demás son especialistas.
2. **El inglés ICAO es el pilar más huérfano entre los que preparan selección.** Solo 4,5 de 15 tienen un curso ICAO estructurado. Los líderes de aptitud y entrevista (PAT, SkyTest, PTT, VTH y AeroScout) no tienen nada de inglés. Como Aviatory va enfocado al inglés, ese es su eje natural.
3. **El puente inglés + entrevista con IA casi no existe.** Solo FlightDeckIQ califica el nivel ICAO dentro de la entrevista en video, y solo para 2 aerolíneas. Ahí está la feature estrella para Aviatory.
4. **Las rutas por aerolínea son estándar, pero hechas a medias.** 9 de 15 las tienen, aunque casi siempre son fichas de venta o PDFs viejos. Nadie tiene rutas reales por etapas para Avianca, LATAM, Copa, Aeroméxico, Volaris, JetSMART o Wingo. Rotate mete LATAM, Avianca y Copa en un solo pack de 100 preguntas, y Loop solo cubre Brasil.
5. **La confianza es un flanco débil de todos.** Hay cifras que se contradicen (Rotate, ASP, AeroTest, VTH), equipos anónimos (FDIQ, YPI), cero reseñas externas y "4,9★" sin fuente. Un producto con datos consistentes, autores con nombre y reseñas verificadas se diferencia solo con eso.

## 2. Matriz de features (15 competidores × 32 features)

✅ tiene · ⚠️ parcial · ❌ no tiene · ? no verificable (sitio bloqueado; ver `REVISION_MANUAL.md`). En la columna Cobertura, ✅ vale 1 y ⚠️ vale 0,5.

| Código | Feature | Rotate | FDF | ASP | FDIQ | YPI | PAT | SkyT | PTT | VTH | AeroS | CaptP | L6A | SkyS | Loop | AeroT | **Aviatory** | Cobertura |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| F01 | Curso de inglés aeronáutico ICAO estructurado | ⚠️ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ⚠️ | ✅ | ⚠️ | ❌ | ⚠️ `/app/icao` | 4.5/15 |
| F02 | Simulacro de examen ICAO (TEA/ELPAC/SDEA/etc.) | ✅ | ❌ | ? | ⚠️ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ `/app/icao/simulacro` | 5.5/15 |
| F03 | Speaking con IA / reconocimiento de voz | ⚠️ | ❌ | ❌ | ✅ | ? | ⚠️ | ❌ | ❌ | ✅ | ⚠️ | ✅ | ❌ | ⚠️ | ? | ❌ | ⚠️ `useSpeechToText.ts` | 5/15 |
| F04 | Radiotelefonía / fraseología ATC | ⚠️ | ❌ | ? | ❌ | ❌ | ⚠️ | ❌ | ❌ | ❌ | ❌ | ✅ | ⚠️ | ✅ | ⚠️ | ? | ✅ `/app/aerolinea/comunicaciones` | 4/15 |
| F05 | Tutor humano / clases en vivo de inglés | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | 3/15 |
| F06 | Pruebas cognitivas (mate mental, razonamiento, memoria, espacial) | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ⚠️ | ❌ | ⚠️ `/app/aerolinea/psicotecnicas` | 7.5/15 |
| F07 | Pruebas psicomotoras / multitarea (joystick) | ⚠️ | ✅ | ❌ | ⚠️ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ⚠️ | ❌ | ❌ | 6.5/15 |
| F08 | Réplicas de baterías oficiales (DLR, COMPASS, cut-e, PILAPT, Mollymawk, ADAPT) | ❌ | ✅ | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ⚠️ | ⚠️ | ❌ | ❌ | 6/15 |
| F09 | Test de personalidad | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ | ? | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ | ? | ❌ | ❌ | 4.5/15 |
| F10 | Rutas/perfiles por aerolínea | ✅ | ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ❌ | ✅ | ⚠️ | ❌ | ❌ | ⚠️ | ✅ | ⚠️ | ⚠️ `/app/match` | 9/15 |
| F11 | Comparación con norma / percentiles / stanine | ❌ | ? | ? | ❌ | ? | ✅ | ✅ | ? | ❌ | ❌ | ❌ | ❌ | ❌ | ? | ❌ | ❌ | 2/15 |
| F12 | Banco de preguntas técnicas (ATPL/licencia) | ✅ | ⚠️ | ❌ | ✅ | ⚠️ | ⚠️ | ❌ | ❌ | ⚠️ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ `/app/pca` | 7/15 |
| F13 | Cursos en video | ? | ⚠️ | ✅ | ❌ | ? | ⚠️ | ❌ | ❌ | ❌ | ❌ | ⚠️ | ❌ | ⚠️ | ⚠️ | ✅ | ⚠️ `public/modulos/*/intro.mp4` | 4.5/15 |
| F14 | Preguntas técnicas por tipo de avión (A320/B737) | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ❌ | ❌ | ❌ | ? | ❌ | ❌ | ❌ | ❌ | ? | ✅ | ❌ | 4.5/15 |
| F15 | Preparación de simulador (sim check) | ⚠️ | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ❌ | ❌ | ⚠️ | ❌ | ❌ | ❌ | ⚠️ | ? | ❌ | ❌ | 5/15 |
| F16 | Banco de preguntas de entrevista HR/competencias | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ❌ | ✅ | ⚠️ | ❌ | ❌ | ⚠️ | ? | ❌ | ⚠️ `/app/entrevistas/speaking` | 8/15 |
| F17 | Entrevista simulada con IA (video/voz) | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ⚠️ | ❌ | ❌ | ⚠️ | ? | ❌ | ❌ | 6/15 |
| F18 | Mock interview / coaching con humano | ❌ | ✅ | ✅ | ? | ? | ❌ | ⚠️ | ❌ | ❌ | ❌ | ⚠️ | ❌ | ❌ | ? | ❌ | ❌ | 3/15 |
| F19 | Guías por aerolínea / gouge / reportes de candidatos | ✅ | ✅ | ✅ | ✅ | ⚠️ | ⚠️ | ❌ | ⚠️ | ✅ | ⚠️ | ❌ | ❌ | ⚠️ | ✅ | ⚠️ | ⚠️ `/app/examenes` | 9/15 |
| F20 | Ejercicios grupales / dinámicas | ❌ | ⚠️ | ✅ | ❌ | ? | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ? | ❌ | ❌ | 2.5/15 |
| F21 | CV / carta / aplicación | ✅ | ✅ | ✅ | ❌ | ? | ❌ | ❌ | ❌ | ✅ | ⚠️ | ❌ | ❌ | ✅ | ? | ❌ | ⚠️ `PilotCv.tsx` | 5.5/15 |
| F22 | App móvil nativa | ❌ | ❌ | ⚠️ | ❌ | ? | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ⚠️ | ? | ? | ❌ | 4/15 |
| F23 | Tutor IA / chatbot de estudio | ✅ | ❌ | ❌ | ❌ | ? | ❌ | ❌ | ⚠️ | ❌ | ❌ | ⚠️ | ❌ | ❌ | ? | ⚠️ | ✅ `functions/wingman` | 2.5/15 |
| F24 | Plan de estudio personalizado/adaptativo | ✅ | ❌ | ❌ | ❌ | ? | ✅ | ⚠️ | ✅ | ? | ❌ | ⚠️ | ❌ | ✅ | ⚠️ | ✅ | ⚠️ `/app/test-inicial` | 6.5/15 |
| F25 | Analytics de progreso / readiness score | ✅ | ❌ | ❌ | ✅ | ? | ✅ | ✅ | ✅ | ? | ❌ | ⚠️ | ❌ | ✅ | ⚠️ | ✅ | ⚠️ `panel_tarjetas()` | 8/15 |
| F26 | Gamificación | ✅ | ❌ | ❌ | ❌ | ? | ⚠️ | ❌ | ✅ | ? | ❌ | ? | ❌ | ✅ | ? | ⚠️ | ✅ `/app/logros` | 4/15 |
| F27 | Comunidad / foro | ⚠️ | ❌ | ⚠️ | ❌ | ? | ✅ | ❌ | ⚠️ | ⚠️ | ❌ | ⚠️ | ❌ | ✅ | ? | ❌ | ✅ `/app/comunidad` | 4.5/15 |
| F28 | Bolsa de empleo / alertas de vacantes | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ⚠️ | ❌ | ⚠️ | ✅ | ❌ | ❌ | ✅ | ? | ❌ | ✅ `/app/match` | 6/15 |
| F29 | Prueba gratis / freemium | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ❌ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ `/pricing` | 12.5/15 |
| F30 | Garantía (aprobación / reembolso) | ✅ | ❌ | ❌ | ⚠️ | ? | ⚠️ | ❌ | ✅ | ❌ | ❌ | ❌ | ? | ❌ | ❌ | ⚠️ | ❌ | 3.5/15 |
| F31 | Multi-idioma | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ⚠️ | ✅ | ❌ | ❌ | ❌ | ❌ | 4.5/15 |
| F32 | B2B (escuelas / aerolíneas) | ✅ | ⚠️ | ❌ | ❌ | ? | ❌ | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ | ⚠️ | ? | ✅ | ❌ | 7/15 |

**Notas de criterio de la matriz:**
- **FlightDeckFriend F06-F09:** la aptitud es la práctica ADAPT oficial de Symbiotics, vendida vía partnership.
- **ASP F22:** app solo iOS/iPadOS/Mac, sin Android.
- **ASP F31:** EN/FR.
- **Rotate F02:** mock de TAE 2.0 (Perú).
- **Rotate F03:** voz IA en drills de pronunciación TAE; no se confirmó que el mock de entrevista use reconocimiento de voz.
- **Rotate F27:** el "community access" aparece en /pro, pero otros documentos dicen que no existe.
- **FlightDeckIQ F02:** califica ICAO ELP dentro del video de entrevista; no es un simulacro completo.
- **FlightDeckIQ F07:** simuladores con teclado y mouse, sin joystick.
- **FlightDeckIQ F30:** no reembolsa; la cuenta se pausa si no te seleccionan.
- **YourPilotInterview:** el sitio no fue accesible, así que los "?" son no verificables.
- **F03 (voz con IA):**
  - VTH es ✅ porque califica respuestas habladas.
  - PAT es ⚠️ porque su feedback con IA es sobre video-entrevista y comunicación, no inglés.
  - AeroScout es ⚠️ porque Avienne es solo para cabina.
  - Ninguno de PAT, SkyTest, PTT, VTH ni AeroScout evalúa el inglés ICAO.
- **F04:** PAT tiene una actividad de atención sobre transmisiones ATC, pero no un curso de fraseología.
- **F17:** AeroScout es ⚠️ porque su entrevista con IA es solo para cabina.
- **F30:**
  - PilotentestTraining da 3 meses gratis si no apruebas; no devuelve dinero.
  - PAT hace reembolsos a discreción.
- **F29 (SkyTest):** existe una versión "BU/GU Lite", pero su precio no es visible.
- **CaptainPilot:**
  - F18 ⚠️ = "ICAO mock interview" del coaching, que es la entrevista del examen ICAO, no la de aerolínea.
  - F23 ⚠️ = el AI Instructor es solo para speaking.
  - F27 ⚠️ = grupos de comunidad dentro del app.
  - F31 ⚠️ = la UI iOS está en 27 idiomas, pero el contenido solo en inglés.
- **SkyStudy:**
  - F03, F16, F17 y F15 ⚠️ = planeados en ICAO Pro / Interview Room, sin lanzar; el speaking actual usa dictado del navegador.
  - F07 ✅ = psicomotor en el navegador, sin joystick.
  - F08 ⚠️ = ejercicios originales mapeados a PILAPT, DLR y otros, no réplicas.
  - F22 ⚠️ = PWA offline.
- **Loop:** los "?" corresponden a páginas cuyo detalle no se renderizó (ver revisión manual).
- **AeroTest:**
  - F23 ⚠️ = "Profesor online 24h", sin saber si es IA.
  - F30 ⚠️ = "garantía de estudio" más reembolso caso a caso.

**Cobertura total por competidor**, sobre 32:

| Competidor | Puntaje |
|---|---|
| Rotate | 19,5 |
| SkyStudy | 18,5 |
| PilotAptitudeTest | 16 |
| FlightDeckIQ | 14 |
| FlightDeckFriend | 13,5 |
| ASP | 13,5 |
| **Aviatory (hoy, 26-sep-2026)** | **13** |
| PilotentestTraining | 11,5 |
| CaptainPilot | 11,5 |
| SkyTest | 11 |
| AeroTest Chile | 9,5 |
| Vectors to Hired | 9 |
| Loop | 9 |
| YPI | 7 |
| AeroScout | 6 |
| Level6Aviation | 6 |

Loop y YPI salen subestimados porque sus sitios no se pudieron leer completos.

### La columna Aviatory

**Cómo se hizo.** Se agregó el 26-sep-2026 leyendo el código de `main` (commit `4dfa584`, PR #324). Vale lo que un piloto puede usar hoy, con el mismo criterio que para los demás: ✅ vale 1 y ⚠️ vale 0,5. Una tarjeta «Pronto», una tabla vacía o una migración sin aplicar no cuenta como ✅. El foro de la comunidad (PR #323) y las migraciones de autorizaciones y topes están en el código, pero no aplicados, así que no cuentan.

**Resultado.** 8 ✅, 10 ⚠️ y 14 ❌, que suman **13 / 32 (41 %)**:
- 6,5 puntos menos que Rotate (19,5).
- 5,5 menos que SkyStudy (18,5).
- 3 menos que PilotAptitudeTest (16).
- A medio punto de FlightDeckFriend y ASP (13,5).

**Lectura.** La cobertura es media, pero la profundidad no está pareja:
- **Donde es profundo:**
  - banco técnico PCA;
  - 12 módulos de Ingreso a aerolínea con lección, práctica y evaluación en servidor;
  - radiotelefonía ATC con 69 lecciones y 126 prácticas;
  - gamificación.
- **Hay dos pilares a medias:**
  - Inglés: práctica TEA, sin curso por niveles ni IA que califique el habla.
  - Psicotécnicos: 224 ejercicios de 3 familias, sin memoria, psicomotor, personalidad ni normas.
- **La entrevista está casi vacía:** placeholder, 15 preguntas de solo lectura y cero IA.

**Evidencia de cada celda:**

| Código | Aviatory | Evidencia en el código |
|---|---|---|
| F01 | ⚠️ | `/app/icao` (`src/pages/Icao.tsx`): práctica organizada por partes del TEA. Glosario (~351 términos), quiz corregido en servidor (30), Parte 1 (32 preguntas), Parte 2 (67 audios cortos, 16 largos y 6 interactivos, reales) y Parte 3 (14 pares de imágenes). Prepara el examen, pero no es un curso por niveles |
| F02 | ✅ | `/app/icao/simulacro` (`src/pages/IcaoMockExam.tsx`, `src/lib/icaoMockExam.ts`): TEA completo al azar, cronometrado, cada audio máximo 2 veces, historial en `user_icao_mock_results`. El nivel final es **autoevaluado** con los 6 descriptores (como SkyStudy). Solo TEA |
| F03 | ⚠️ | Dictado con Web Speech API (`src/hooks/useSpeechToText.ts`) en TEA Parte 1: muestra transcripción, segundos y palabras, sin nota. Readback hablado en Comunicaciones (`src/components/comunicaciones/practica/ReadbackVoz.tsx`) corregido por reglas. Ninguna IA califica el habla |
| F04 | ✅ | `/app/aerolinea/comunicaciones`: 69 lecciones, 126 prácticas con radio VHF simulada (readback, hearback, ráfaga de números, vuelo completo) y evaluación de 80 preguntas en servidor. Todavía suena con la voz del navegador: no hay audios grabados |
| F05 | ❌ | No hay tutor humano. «Sesiones 1-a-1» solo aparece en el plan Founder, que no se vende |
| F06 | ⚠️ | `/app/aerolinea/psicotecnicas` (aprende, práctica, evaluación y simulacro): 224 ejercicios cronometrados y corregidos en servidor (`contenido/bancos/psicotecnicas.json`): 186 numéricos (casi todos sucesiones), 20 abstractos y 18 espaciales. No hay memoria ni cálculo mental rápido |
| F07 | ❌ | Atención dividida, multitarea y coordinación figuran como «Pronto» (`src/pages/PsychTests.tsx`, fuera del menú) |
| F08 | ❌ | Ninguna réplica de batería oficial. La página vieja dice «vamos a replicar» COMPASS, cut-e y PILAPT |
| F09 | ❌ | Personalidad figura como «Pronto»; la tabla `psych_personality_tests` está vacía |
| F10 | ⚠️ | Elegibilidad `/app/match` (`src/pages/Airlines.tsx`): 14 aerolíneas por país, con lo que pide cada convocatoria frente a las horas y el inglés del piloto («Te falta… para lo que pide su convocatoria») y registro de postulaciones con etapa. No hay ruta de preparación por etapas de cada aerolínea |
| F11 | ❌ | Solo resultados absolutos (70 % precisión + 30 % velocidad, `src/lib/psicotecnicas.ts`). No se compara contra otros |
| F12 | ✅ | `/app/pca`: banco cifrado (`vault_questions`), sesiones con token, corrección en servidor y estadísticas (`pca_stats()`), con cuenta atrás al examen |
| F13 | ⚠️ | Solo 4 videos de apertura de ~1 min (NOTAM, Meteorología, Mercancías y Aerodinámica, en `public/modulos/*/intro.mp4`). Las lecciones son texto e imagen |
| F14 | ❌ | No hay banco por tipo de avión. A320 y B737 aparecen solo como ejemplos dentro de MEL |
| F15 | ❌ | Nada de preparación de simulador; solo existe «simulador» como etapa de una postulación |
| F16 | ⚠️ | `/app/entrevistas/speaking`: 15 preguntas con intención, temas y repreguntas, de solo lectura. Preguntas abiertas de entrevista técnica al cierre de los niveles de algunos módulos. «Entrevista HR y CRM» figura «en camino» |
| F17 | ❌ | `/app/entrevistas` (`src/pages/InterviewSim.tsx`) es una portada con tres categorías en «Pronto», fuera del menú |
| F18 | ❌ | No hay coaching humano |
| F19 | ⚠️ | «Qué cayó en el examen» (`/app/examenes`, tabla `exam_reports`): reportes de pilotos sobre el examen de la Aerocivil. No hay guías ni reportes por aerolínea |
| F20 | ❌ | «Dinámicas grupales» figura como «Pronto» |
| F21 | ⚠️ | Hoja de vida que se arma sola desde el perfil (`src/components/perfil/PilotCv.tsx`, privada y sin exportar) y registro de postulaciones. No hay carta de presentación |
| F22 | ❌ | Solo PWA (`vite-plugin-pwa`); no hay app nativa |
| F23 | ✅ | Wingman (`supabase/functions/wingman/index.ts`): tutor con Claude y límites en servidor. Solo modo general: no se abre con el contexto de la pregunta fallada |
| F24 | ⚠️ | Test inicial (`/app/test-inicial`) que estima el nivel ICAO y la materia más floja; `plan_de_estudio` (días, hora y meta) con recordatorios; Mi ruta (`/app/ruta`). Nada se adapta con los resultados |
| F25 | ⚠️ | El avance se mide (`panel_tarjetas()`, `pca_stats()`, `icao_progreso()`), pero **no hay readiness score que funcione**: `user_pca_readiness` lee una tabla que nadie escribe |
| F26 | ✅ | `/app/logros`: 57 logros disparados en servidor, XP y nivel, misiones, racha con día de gracia y avisos por Realtime |
| F27 | ✅ | `/app/comunidad`: salas de chat en vivo con reacciones y topes (`src/pages/Community.tsx`). La auditoría del 3-ago contó 0 mensajes. El foro nuevo (PR #323) espera su migración |
| F28 | ✅ | Elegibilidad `/app/match` lista las convocatorias abiertas de 14 aerolíneas, por país y con los requisitos tal como se publicaron. 11 portales se leen solos cada 6 h (`supabase/functions/revisar-convocatorias`); LATAM, Aeroméxico y Aerolíneas Argentinas van a mano. Aviso `milestone_close` cuando al piloto le faltan pocas horas para una convocatoria abierta (migración `20261001060000`, aplicada). No avisa cuando se abre una nueva |
| F29 | ✅ | `/pricing`: hoy todo es gratis durante el lanzamiento, sin tarjeta. Los planes pagos están en «Próximamente» |
| F30 | ❌ | No hay garantía |
| F31 | ❌ | Español fijo en el código; no hay i18n. **Choque con la visión:** el producto debe ir en inglés por defecto |
| F32 | ❌ | Solo un correo de contacto para aliados; el esquema no tiene escuelas ni organizaciones |

## 3. Features comunes (table stakes)

Son lo que el piloto ya espera encontrar. Si Aviatory no las tiene, se ve incompleta.

| Feature | Cobertura | Quién lo hace mejor |
|---|---|---|
| F29 Prueba gratis / freemium | 12,5/15 | **Rotate**: plan gratis para siempre con límites diarios y test de 10 preguntas sin registro. **FDIQ**: trial de 7 días sin tarjeta con 1 entrevista IA gratis. **SkyStudy**: aptitud sin cuenta |
| F10 Rutas por aerolínea | 9/15 | **FDIQ**: organizado por las etapas reales de cada aerolínea, con la herramienta que usa cada etapa (HireVue, Maki, COMPASS, FAST). **Loop**: tablero "mi proceso" con checklist y progreso por aerolínea |
| F19 Guías, gouge y reportes | 9/15 | **VTH**: paga US$25 por reporte de candidato (297 reunidos). **FDIQ**: 2.711 reportes verificados de Riyadh Air, con bancos actualizados cada semana |
| F16 Banco de preguntas de entrevista HR | 8/15 | **Rotate**: cada pregunta trae 4 capas (pista, respuesta modelo, red flags y repreguntas probables). **VTH**: 11–14 mil tarjetas de 56 operadores |
| F25 Analytics / readiness score | 8/15 | **PAT**: percentil contra la cohorte, leaderboard y predicción de puntaje a 14 días. **PTT**: "Clearance Score" único. **FDIQ**: "probabilidad de contratación" |
| F06 Pruebas cognitivas | 7,5/15 | **PAT**: 190 actividades y 100+ baterías. **PTT**: las 10 pruebas DLR con simulación del día del examen. **SkyStudy**: 74 ejercicios gratis |
| F12 Banco técnico | 7/15 | **SkyStudy**: 31 mil preguntas con motor adaptativo. **AeroTest**: 42+ licencias DGAC más bancos por tipo de avión |
| F32 B2B | 7/15 | **SkyTest**: CATE para escuelas y CASE para screening de aerolíneas. **Rotate**: panel escolar con alertas de alumnos en riesgo. **AeroTest**: 30+ escuelas |

## 4. Features intermedias (5–7 de 15)

Estas diferencian hoy, pero en 12–18 meses van a ser estándar:
- F24 plan adaptativo
- F07 psicomotor con joystick
- F08 réplicas de baterías oficiales
- F17 entrevista con IA
- F28 bolsa de empleo
- F21 CV y carta
- F02 simulacro ICAO
- F15 preparación de simulador
- F03 speaking con IA

## 5. Features raras (menos de 5 de 15): donde está el espacio

| Feature | Cobertura | Lectura |
|---|---|---|
| F11 Normas / percentiles / stanine | 2/15 | Solo PAT y SkyTest comparan contra otros candidatos. Es clave en psicotécnicos, porque el piloto quiere saber si está en el top 25 %, no solo su puntaje |
| F20 Ejercicios grupales | 2,5/15 | PAT tiene un simulador con más de 50 escenarios y candidatos virtuales. ASP hace práctica semanal en vivo. Nadie más |
| F23 Tutor IA | 2,5/15 | Solo Rotate lo tiene completo (sobre Claude Haiku 4.5, con cuota por plan) |
| F05 Tutor humano de inglés | 3/15 | ASP (15 clases en vivo), CaptainPilot (coaching) y Level6Aviation (1:1) |
| F18 Coaching humano de entrevista | 3/15 | FDF (formato "2-on-1": piloto + HR, con answer key y segundo mock) y ASP |
| F30 Garantía | 3,5/15 | **PTT**: "si completas 100 simulacros y no pasas, 3 meses gratis". Es condicionada al uso, protege el margen y empuja la práctica. Rotate también ofrece reembolso, pero sus condiciones se contradicen entre páginas |
| F04 Radiotelefonía / ATC | 4/15 | **SkyStudy**: simulador ATC de 100 escenarios. **CaptainPilot**: módulos de RT. **Rotate**: audio ATC con acentos, incluido el hispano |
| F22 App nativa | 4/15 | Solo SkyTest, PTT y CaptainPilot tienen app nativa completa; ASP solo en iOS y SkyStudy como PWA. La mayoría es solo web. **PTT** tiene apps con modo offline |
| F26 Gamificación | 4/15 | **Rotate**: rachas, badges, reto diario de 60 s y leaderboards. **PTT**: logros y clases Economy, Business y First |
| F09 Personalidad | 4,5/15 | **ASP**: 16PF con debrief de 45 min con psicóloga. **FDF**: cuestionario oficial ADAPT. **PAT**: 700+ ítems |
| F01 Curso ICAO estructurado | 4,5/15 | CaptainPilot (331 lecciones), SkyStudy (187 ejercicios) y ASP (16 módulos + clases en vivo) |
| F14 Preguntas técnicas por tipo de avión | 4,5/15 | **AeroTest** (A320, B737, B787), **YPI** (A320, B737) y **FDIQ** (B777, A350, A380, B787) |
| F27 Comunidad | 4,5/15 | **PTT**: grupos "Crew" con la misma fecha de examen. **PAT**: foro. **SkyStudy**: foro (9 hilos) |

## 6. Diferenciadores clave: lo mejor de cada uno

Estas son las 20 ideas más fuertes vistas en el mercado, agrupadas por pilar. Todas son candidatas para Aviatory.

### Inglés (eje del producto)
1. **Mock ICAO calificado con los 6 descriptores y la regla "lowest-of-6".** Lo hacen Rotate (TAE Perú) y CaptainPilot (13 exámenes). Ninguno publica rúbrica ni reporte de muestra, y ahí Aviatory puede ser transparente.
2. **Audio ATC con acentos variados**, incluido el hispano (Rotate), y **simulador ATC de readback** con 100 escenarios (SkyStudy). Para LATAM: frecuencias y acentos de BOG, SCL, LIM, PTY, GRU y MEX.
3. **Test de proficiencia o muestra gratis sin registro** (Level6Aviation, CaptainPilot) que haga el placement y asigne el plan.
4. **Simulación con examinador humano como upsell** del mock con IA (Level6Aviation, €59).

### Entrevista y selección
5. **Entrevista en video o voz con IA que califica a la vez el inglés ICAO y las competencias (STAR)** (FlightDeckIQ). Es el puente entre los dos pilares y la feature estrella a construir. AeroScout le suma repreguntas dinámicas y lenguaje corporal (más de 400 puntos), pero solo para tripulantes de cabina.
6. **Rutas por aerolínea organizadas por etapas reales**, con el simulador de la herramienta que usa cada etapa (FlightDeckIQ), y un **tablero "Mi proceso"** con checklist y progreso (Loop).
7. **Pregunta de 4 capas**: pista, respuesta modelo, red flags y repreguntas (Rotate).
8. **"Experience sheet"**: una matriz que cruza tus anécdotas reales con las 8 competencias no técnicas, para armar respuestas STAR propias (ASP).
9. **Gouge pagado o con crédito**: el candidato reporta su proceso y recibe dinero o meses gratis (Vectors to Hired). Es el foso de contenido más barato posible para las aerolíneas de LATAM.
10. **Simulador de ejercicio grupal con candidatos virtuales** (PAT) y **práctica grupal semanal en vivo** (ASP).
11. **Coaching "2-on-1"**, piloto + psicólogo o HR, con answer key escrito y segundo mock (FDF). Es el upsell premium.

### Psicotécnicos
12. **Percentil o stanine contra la cohorte de la misma aerolínea**, con leaderboard y **predicción de puntaje a N días** (PAT).
13. **Diagnóstico inicial + readiness score único** (el "Cockpit Readiness Check" y el "Clearance Score" de PTT) con **IA que reajusta el plan** después de cada sesión (FlightBrain de PTT).
14. **Réplicas de baterías oficiales** (DLR, COMPASS, cut-e, PILAPT, Mollymawk, ADAPT), o mejor, **alianza con el editor oficial** (FDF revende ADAPT de Symbiotics).
15. **Joystick USB plug-and-play** (PAT, PTT) y afiliado de hardware (SkyTest vende el suyo).
16. **"Selection Day Simulation"**: una jornada cronometrada de varios bloques con pausas y reporte escrito (SkyStudy).

### Plataforma y retención
17. **Garantía condicionada al uso** (PTT) y **cuenta pausable por ciclo de selección** (FDIQ).
18. **Grupos "Crew"** con candidatos de la misma aerolínea y la misma convocatoria (PTT).
19. **Matching de elegibilidad con "brecha de horas"** y alertas de convocatorias (AeroScout), conectado a la ruta de preparación de cada aerolínea.
20. **Señales de producto vivo:**
    - Changelog público semanal (PAT).
    - Soporte humano en vivo dentro de la app, de 9 a 21 h los 7 días (PAT). En LATAM lo equivalente es WhatsApp integrado.
    - Contenido con fecha ("actualizado el…"), justo lo que le falta a FDF, que tiene guías de 2017.

## 7. Qué significa para Aviatory

**Tesis de producto.** Aviatory sería la única plataforma que junta los tres pilares con profundidad de especialista. El inglés es el eje, y un solo motor lo conecta todo: diagnóstico → plan por aerolínea y fecha → práctica con IA → readiness score. Está hecha para las aerolíneas de LATAM, con el producto en inglés y la capa de soporte en español.

**Capa 1: mínimo para ser creíble.** Son los table stakes:
- Freemium o trial sin tarjeta.
- Rutas y guías por aerolínea.
- Banco de preguntas HR con respuestas modelo.
- Readiness score y analítica.
- Pruebas cognitivas.
- Banco técnico.

**Capa 2: diferenciadores para salir.** Estas features se pueden defender:
- Entrevista con IA que califica ICAO + STAR (#5).
- Mock ICAO con los 6 descriptores y rúbrica pública (#1).
- Tablero "Mi proceso" por etapas de aerolíneas LATAM (#6).
- Percentiles contra la cohorte (#12).
- Diagnóstico + plan adaptativo (#13).
- Audio ATC con acentos LATAM (#2).

**Capa 3: fosos a mediano plazo.**
- Gouge de LATAM con créditos (#9).
- Alianza con un editor oficial de pruebas o con un LTB (#14 y #4).
- Grupos por convocatoria (#18).
- Simulador de ejercicio grupal (#10).
- Coaching 2-on-1 (#11).
- Canal B2B con escuelas de LATAM (ver SkyTest CATE y AeroTest).
- Matching de vacantes (#19).

**Confianza como feature.** Cifras consistentes en todo el sitio, autores con nombre (capitanes, examinadores, psicólogos), metodología del readiness score publicada y reseñas verificadas. Los competidores fallan ahí.

---
**Pendiente para la FASE FINAL (no trabajar todavía):** pricing y SEO. Las notas de referencia están en `README.md`, secciones 3 y 4. Hoy Aviatory **no quiere ser encontrado**.
