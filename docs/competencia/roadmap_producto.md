# Roadmap de producto: 15 features en 3 olas

**Fecha:** 26-sep-2026
**Base:** `gap_analysis.md`, la columna Aviatory de `analisis_features.md` (13 / 32) y `spec_entrevista_ia.md`.

> **Sin pricing y sin SEO.** Son la fase final. Nada de esto crea páginas públicas: la metodología y las rúbricas se publican **dentro de la app**, con sesión.

## El motor

Todo cuelga de un mismo circuito:

**diagnóstico → plan por aerolínea y fecha → práctica → readiness score**, y el readiness vuelve a alimentar el plan.

Hoy Aviatory tiene la práctica (profunda en técnico y ATC) pero **le faltan las otras tres piezas**:
- El test inicial no alimenta ningún plan.
- `plan_de_estudio` guarda días y hora, pero no se reajusta.
- El readiness no funciona: `user_pca_readiness` lee una tabla que nadie escribe.

Por eso la Ola 1 empieza por el motor, no por contenido nuevo.

**Cómo se ordenó.** Impacto × esfuerzo, con dos correcciones:
- Lo que otra feature necesita va antes.
- Lo que depende de tener muchos pilotos (percentiles, reportes de candidatos) no puede ir antes del lanzamiento, aunque sea barato.

| # | Feature | Pieza del motor | Impacto | Esfuerzo | Ola |
|---|---|---|---|---|---|
| 1 | Readiness score por aerolínea | Readiness | Alto | M | 1 |
| 2 | Diagnóstico inicial en el onboarding | Diagnóstico | Alto | M | 1 |
| 3 | Plan por aerolínea y fecha | Plan | Alto | M | 1 |
| 4 | Rutas por etapas de las aerolíneas de LATAM | Plan (qué se evalúa) | Alto | M | 1 |
| 5 | Banco de entrevista en 4 capas | Práctica | Alto | M | 1 |
| 6 | Psicotécnicos: memoria, cálculo mental y atención | Práctica | Alto | L | 1 |
| 7 | Entrevista con IA que califica ICAO + STAR | Diagnóstico, práctica y readiness | Muy alto | L | 2 |
| 8 | Mock ICAO calificado con rúbrica pública | Práctica y readiness | Alto | M (sobre la 7) | 2 |
| 9 | Tablero «Mi proceso» por aerolínea | Plan y readiness | Medio-alto | M | 2 |
| 10 | Percentiles contra la cohorte | Readiness | Medio | S | 2 |
| 11 | Experience sheet | Práctica | Medio | S | 2 |
| 12 | Audio ATC con acentos de LATAM | Práctica | Medio | M | 2 |
| 13 | Reportes de candidatos por aerolínea | Alimenta rutas y banco | Alto a largo plazo | M | 3 |
| 14 | Grupos por convocatoria | Retención | Medio | S | 3 |
| 15 | Jornada de selección simulada | Readiness (ensayo general) | Medio | M | 3 |

**Esfuerzo**, para el equipo de hoy: **S** es hasta 1 semana, **M** de 2 a 4 semanas y **L** más de un mes.

## Antes de la Ola 1: una decisión y cuatro arreglos (no cuentan entre las 15)

### La decisión: el idioma
La visión dice «inglés por defecto, español de soporte», pero la app está en español fijo, sin i18n. Hay dos caminos:

- **(a) Interfaz bilingüe con inglés por defecto.** L grande: hay 12 módulos de contenido escritos en español.
- **(b) Interfaz en español y práctica en inglés.** La entrevista, el mock ICAO, el banco de entrevista y ATC van en inglés, con ayudas en español.

**Recomendación: (b) ahora**, con los textos nuevos preparados para traducirse, y (a) cuando haya pilotos fuera de LATAM. **Sin esta decisión, cada feature de abajo se escribe dos veces.**

### Los cuatro arreglos (todos S)
1. **Wingman:**
   - Hablar con tuteo: hoy sale con voseo («Sos», «Podés»).
   - Pasar a un modelo de la familia 5: hoy usa `claude-sonnet-4-5`.
   - Arreglar la caché del prompt, que no funciona: el prompt de sistema tiene unos 500 tokens y el mínimo son 1024.
   - Abrirlo con el contexto de la pregunta fallada, como Rotate.
2. **Renombrar el simulacro técnico.** `/app/aerolinea/simulacro` se llama «Simulacro de entrevista técnica» y es de opción múltiple. Va a confundirse con la entrevista con IA.
3. **Aplicar las migraciones pendientes**, en orden: `20261002000000` (autorizaciones y eliminar cuenta), `20261002010000` (topes), `20261003000000` y `20261003010000` (foro). La 7 necesita la primera.
4. **Empezar ya la calibración de la entrevista con IA** (ver la 7). Es la ruta crítica: conseguir evaluadores y grabar 100 respuestas toma semanas y no depende del código.

---

## Ola 1: mínimo creíble

### 1. Readiness score por aerolínea
- **Descripción.** Un número de 0 a 100 por aerolínea objetivo, con cuatro componentes: inglés, técnico, psicotécnico y entrevista.
  - Cada componente dice de dónde sale: qué intentos y de cuándo.
  - Muestra la tendencia de las últimas 4 semanas y «qué subir primero».
  - **La metodología se publica dentro de la app**: pesos, fórmula y límites. Ningún competidor lo hace (FlightDeckIQ da una «probabilidad de contratación» sin explicar cómo) y es la confianza como feature.
- **Listo cuando:**
  - Se calcula en el servidor (función `security definer`), nunca en el cliente.
  - Un componente sin datos dice «sin datos», no 0.
  - El inglés autoevaluado (mock actual) entra marcado y pesa menos, hasta que exista la 8.
  - El panel lo muestra y la página de metodología existe.
  - `user_pca_readiness` deja de leerse (no se borra).
  - Hay una prueba SQL en `supabase/tests/`.
- **Dependencias:** `panel_tarjetas()`, `pca_stats()`, `icao_progreso()`, `psico_sesiones`, `evaluacion_sesiones`, y los requisitos de cada aerolínea que ya usa Elegibilidad. Los pesos por aerolínea salen de la 4; mientras tanto se usan pesos genéricos, publicados como tales.
- **Motor:** es la última pieza del circuito y la que vuelve a alimentar el plan (3).

### 2. Diagnóstico inicial en el onboarding
- **Descripción.**
  - El onboarding completa el perfil que falta: nombre, país, aerolínea objetivo y fecha, horas, licencias, nivel ICAO declarado con su vencimiento, y el certificado médico con su consentimiento.
  - Cierra con un diagnóstico de unos 15 min de los tres pilares:
    - una respuesta hablada en inglés (con dictado del navegador hasta que exista la 7; después la califica la IA);
    - 10 preguntas de inglés;
    - 3 mini psicotécnicas cronometradas;
    - 10 preguntas técnicas del banco.
  - Resultado: el primer readiness, las 3 debilidades más grandes y el primer plan.
- **Listo cuando:**
  - Todo lo corrige el servidor.
  - Se puede saltar y retomar.
  - Se midió que dura 15 min o menos.
  - El resultado queda guardado como «diagnóstico» y el readiness lo usa.
  - Nada del banco entra al bundle (`verificar-dist.mjs`).
- **Dependencias:**
  - el onboarding actual (6 pasos) y el test inicial (`/app/test-inicial`);
  - `evaluacion_iniciar` y `psico_iniciar`;
  - la 1;
  - la migración de autorizaciones, para el certificado médico.
- **Motor:** es el diagnóstico.

### 3. Plan por aerolínea y fecha (v1 con reglas)
- **Descripción.** Con las semanas que faltan para la fecha objetivo y los días y la hora que el piloto dio, arma **tareas del día** («Hoy: 20 min de Meteorología nivel 2, 1 psicotécnica de memoria y 1 pregunta de entrevista»).
  - Prioriza el componente del readiness más lejos del umbral de la aerolínea y la etapa más próxima.
  - Se recalcula al terminar cada sesión.
- **Listo cuando:**
  - Está en el panel y cada tarea abre su práctica.
  - Dice «actualizado tras tu sesión de…».
  - El piloto puede mover días.
  - Las reglas viven en un archivo con pruebas de unidad; sin IA en v1.
  - Los recordatorios usan `plan_de_estudio`, que ya existe.
- **Dependencias:** `plan_de_estudio`, Mi ruta (`/app/ruta`), `contenido/catalogo/modulos.json` (qué se puede asignar), la 1 y la 2.
- **Motor:** es el plan. La v2 (IA que reajusta, como FlightBrain de PilotentestTraining) se decide cuando haya datos de uso.

### 4. Rutas por etapas de las aerolíneas de LATAM
- **Descripción.** Por aerolínea: las etapas del proceso y, en cada una, qué se evalúa, en qué idioma, con qué herramienta y cuánto dura.
  - Cada dato va **con fuente y fecha, o marcado «no verificado»**. Nunca inventado.
  - Cada etapa enlaza a la práctica de Aviatory que la prepara.
  - Primero las que contratan en Colombia: Avianca, LATAM, Copa, Wingo, JetSMART, SATENA y Clic. Después, el resto de las 14 de Elegibilidad, por país, y Azul, que la visión nombra y todavía no está.
- **Listo cuando:**
  - Las 7 primeras tienen todas sus etapas, con la fecha de revisión visible y el autor con nombre.
  - El contenido vive en un archivo versionado, y una prueba falla si una etapa no tiene fuente ni la marca «no verificado».
- **Dependencias:**
  - tabla `airlines`;
  - Elegibilidad;
  - `convocatorias`, con los requisitos tal como los publica la aerolínea;
  - la investigación, que es la mayor parte del trabajo. Cami con fuentes, y después los reportes de la 13.
- **Motor:** dice qué evalúa cada aerolínea. De ahí salen los pesos del readiness (1) y el orden del plan (3).

### 5. Banco de entrevista en 4 capas
- **Descripción.** Preguntas en inglés por competencia (COM, LTW, PSD, SAW, WLM), más motivación y aerolínea.
  - Cada una trae **pista, respuesta modelo, red flags y repreguntas probables**, el formato de Rotate.
  - Se practican por escrito o hablando (dictado).
  - El español queda como ayuda, no como versión.
- **Listo cuando:**
  - Hay al menos 120 preguntas (20 por competencia y 20 de motivación y aerolínea), revisadas por alguien con experiencia en selección y firmadas con su nombre.
  - Viven en el servidor como las evaluaciones (`contenido/bancos/`, `sembrar.mjs`) y no aparecen en `dist/`.
- **Dependencias:** `contenido/bancos`, `useSpeechToText` y las 15 preguntas de `/app/entrevistas/speaking`, que se migran.
- **Motor:** práctica. Hasta que exista la 7, alimenta el componente «entrevista» del readiness con una autoevaluación STAR marcada como tal.

### 6. Psicotécnicos: memoria, cálculo mental y atención
- **Descripción.** Tres familias nuevas: memoria visual y de trabajo, cálculo mental contra reloj, y atención y concentración.
  - Los ítems **se generan** con semilla, así que no se memorizan.
  - Sirven para aprender, practicar, evaluar y en el simulacro, como las familias actuales.
  - Psicomotor, personalidad y réplicas de baterías oficiales quedan fuera (ver el backlog).
- **Listo cuando:**
  - Cada familia tiene aprende, práctica, evaluación y simulacro.
  - El servidor genera, cronometra y corrige: la semilla queda en el servidor y los tiempos en `private.psico_limite()`.
  - Hay verificadores en `scripts/psicotecnicas/`.
  - Los conteos de `psicotecnicasConteo.ts` están al día.
- **Dependencias:** `psico_iniciar`, `psico_responder` y `psico_terminar`; `src/data/psicotecnicas/`; `exportar-psicotecnicas.mjs`.
- **Motor:** práctica y componente psicotécnico del readiness. El diagnóstico (2) usa una mini prueba de cada familia.

---

## Ola 2: diferenciadores

### 7. Entrevista con IA que califica ICAO + STAR
- **Descripción.** La feature estrella, especificada en `spec_entrevista_ia.md`:
  - entrevista en inglés por voz, en formato one-way;
  - nivel ICAO **estimado** con los 6 descriptores (el más bajo manda), con rango y confianza;
  - nota STAR y competencias con evidencia citada;
  - respuesta modelo hecha con las palabras del piloto.
- **Listo cuando:**
  - La calibración pasa el umbral de la spec §8: kappa ponderada ≥ 0,7 y ≥ 90 % de acuerdo exacto o adyacente con dos evaluadores ICAO.
  - Corrió una beta cerrada de 20 a 50 pilotos, con el costo por sesión medido y los topes fijados con esa cifra.
  - El consentimiento `grabacion_de_voz` está en `autorizaciones`.
  - `supabase/tests/entrevista.sql` y `permisos.sql` pasan.
  - «Estimado» aparece en la pantalla, en el reporte y en los textos.
- **Dependencias:**
  - la migración de autorizaciones aplicada;
  - los buckets privados;
  - las funciones de borde `entrevista` y `entrevista-calificar`;
  - el banco (5);
  - el transcriptor elegido con la prueba de WER por acento;
  - Azure para pronunciación;
  - `ANTHROPIC_API_KEY`.
- **Motor:** toca las cuatro piezas:
  - Diagnóstico: 3 preguntas en el onboarding (2).
  - Plan: los descriptores y las competencias bajas asignan práctica (3).
  - Práctica: la entrevista misma.
  - Readiness: componentes de inglés y de entrevista (1).

### 8. Mock ICAO calificado con rúbrica pública
- **Descripción.** El simulacro TEA que ya existe (`/app/icao/simulacro`) pasa de autoevaluado a calificado por descriptor con el mismo pipeline de la 7.
  - La **rúbrica y un reporte de muestra se publican dentro de la app**. Rotate y CaptainPilot califican, pero ninguno la publica.
  - Se agrega el formato del examen colombiano si la Aerocivil confirma cuál es el vigente.
- **Listo cuando:**
  - Cada descriptor lleva su evidencia y el nivel es el mínimo, calculado en SQL.
  - El nivel autoevaluado se conserva aparte.
  - La página de rúbrica y el reporte de muestra existen.
  - La redacción de la escala se verificó contra el Doc 9835 vigente.
- **Dependencias:** la 7 (pipeline y calibración), los audios TEA actuales y `user_icao_mock_results`.
- **Motor:** reemplaza al autoevaluado en el componente de inglés del readiness.

### 9. Tablero «Mi proceso» por aerolínea
- **Descripción.** Una pantalla por aerolínea objetivo con:
  - las etapas (de la 4) como checklist;
  - en cada etapa, el avance de su práctica y la siguiente tarea;
  - la brecha de requisitos (Elegibilidad);
  - la etapa de la postulación;
  - el aviso de convocatoria abierta.

  Es el formato de Loop, con las etapas reales de FlightDeckIQ.
- **Listo cuando:**
  - Cada etapa muestra su porcentaje y su siguiente tarea.
  - La convocatoria abierta llega como aviso por Realtime, no por sondeo.
  - Los datos vienen de `src/services/`.
- **Dependencias:** la 4, la 1, `convocatorias` y `postulaciones`.
- **Motor:** es la vista del plan y del readiness por etapa.

### 10. Percentiles contra la cohorte
- **Descripción.** «Estás en el top 30 % de los que practicaron esta prueba en este nivel», y opcionalmente de los que apuntan a la misma aerolínea. Solo PilotAptitudeTest y SkyTest lo hacen.
- **Listo cuando:**
  - Una función del servidor calcula el percentil por prueba y nivel.
  - No se muestra con menos de 30 pilotos en la cohorte, y no expone a nadie.
  - Aparece en los resultados y en el readiness.
  - Hay prueba SQL.
- **Dependencias:** los resultados que ya guarda el servidor (`psico_sesiones`, `evaluacion_sesiones`) y la 6. **Necesita cohorte**: por eso va después del lanzamiento, aunque sea barata.
- **Motor:** le da al readiness una referencia relativa, no solo absoluta.

### 11. Experience sheet
- **Descripción.** Una matriz privada que cruza las historias reales del piloto con las competencias, cada historia con sus campos STAR (como la de ASP). De ahí salen respuestas propias, no aprendidas.
- **Listo cuando:**
  - El piloto crea y edita historias.
  - Ve qué competencias no tienen historia.
  - Cada historia enlaza a preguntas del banco (5).
  - La entrevista con IA (7) puede usarla para la respuesta modelo, solo si el piloto lo autoriza.
  - Es de escritura propia con RLS: no cambia puntaje.
- **Dependencias:** la 5, y la 7 si se usa ahí.
- **Motor:** práctica. El plan asigna «escribe una historia de liderazgo» cuando falta.

### 12. Audio ATC con acentos de LATAM
- **Descripción.** Las 126 prácticas de Comunicaciones dejan la voz del navegador:
  - audios generados con voces y acentos de BOG, MDE, CLO, PTY, LIM, SCL y MEX;
  - ruido de radio;
  - un simulador de readback por aeropuerto.
- **Listo cuando:**
  - Ninguna práctica usa `speechSynthesis`.
  - El acento se puede elegir.
  - Los audios están en `public/modulos/`, no en `assets`, para no entrar al precache.
  - Cualquier grabación ATC real tiene licencia verificada.
- **Dependencias:** el proveedor de voz (el mismo de las preguntas de la 7) y el módulo de Comunicaciones.
- **Motor:** práctica del pilar de inglés, como listening del componente de inglés.

---

## Ola 3: fosos

### 13. Reportes de candidatos por aerolínea
- **Descripción.** Un formulario estructurado para contar un proceso real: aerolínea, etapa, fecha, formato, preguntas que salieron y consejos. Se publica en la categoría «Entrevistas» del foro.
  - Es el foso de contenido más barato: Vectors to Hired paga por reporte.
  - Aquí se reconoce con XP y un logro. El dinero o los meses gratis son pricing y esperan a la fase final.
- **Listo cuando:**
  - El formulario tiene campos obligatorios.
  - Hay moderación antes de publicar.
  - Se ve el agregado por aerolínea y etapa, con «reportado por candidatos» y la fecha.
  - No se publican nombres de evaluadores ni datos de terceros.
- **Dependencias:** el foro (PR #323, migración sin aplicar), logros y la 4.
- **Motor:** mantiene al día las rutas (4) y el banco (5) con lo que de verdad se pregunta.

### 14. Grupos por convocatoria
- **Descripción.** Cuando se abre una convocatoria, se crea un grupo para los pilotos que se postularon a ella, con el calendario de etapas y práctica entre pares. Son los grupos «Crew» de PilotentestTraining.
- **Listo cuando:**
  - El grupo nace solo con la convocatoria y se cierra con ella.
  - Entran solo los que registraron la postulación.
  - Tiene la misma moderación y los mismos topes que el foro.
- **Dependencias:** `convocatorias`, `postulaciones` y el foro.
- **Motor:** retención. Además, alimenta los reportes (13) en caliente.

### 15. Jornada de selección simulada
- **Descripción.** Un día cronometrado que encadena los bloques de una aerolínea (psicotécnicos, inglés, técnico y entrevista con IA), con pausas y un reporte escrito. Es el «Selection Day Simulation» de SkyStudy, con el formato de cada aerolínea.
- **Listo cuando:**
  - Existe el formato de al menos una aerolínea.
  - Los bloques los cronometra el servidor.
  - Sale un solo reporte al final y el readiness lo registra como ensayo general.
- **Dependencias:** la 4, la 6, la 7 y la 8.
- **Motor:** es la prueba final del plan antes de la fecha.

---

## Fuera de las 15, en orden

| Qué | Por qué espera |
|---|---|
| Banco técnico por tipo de avión (A320, B737) | Pesa más para pilotos con habilitación de tipo que para el piloto que entra a su primera aerolínea. Se revisa con los reportes de la 13 |
| Psicomotor con joystick y personalidad (F07, F09) | Necesitan hardware o validación psicométrica. Mejor una **alianza con un editor oficial** (como FlightDeckFriend con ADAPT) que una réplica propia |
| Plan con IA que reajusta | Se decide con datos de uso de la 3 |
| Entrevista en tiempo real (v3 de la spec) | Solo si la v2 demuestra validez |
| Canal B2B con escuelas | Tiene precio de por medio: fase final |
| Coaching humano 2-on-1 y examinador humano | Son servicios pagos: fase final |
| Simulador de ejercicio grupal | Esfuerzo L y poca evidencia de que las aerolíneas de LATAM lo usen. Verificar con los reportes de la 13 |
| Freemium con límites por plan | Es pricing: fase final. Hoy todo es gratis durante el lanzamiento |

## Lo que tiene que ser verdad en todas

- **Confianza como feature:**
  - autores con nombre en el contenido nuevo;
  - fecha de actualización visible;
  - metodología y rúbricas publicadas dentro de la app;
  - cifras que cuadran en todas las pantallas.
- **El servidor manda** en todo lo que da nota, nivel, percentil o readiness: nada de eso se escribe desde el cliente.
- **«Estimado», nunca «certificado»**, en todo lo que dé un nivel ICAO.
- **Sin páginas públicas indexables** hasta la fase final.
