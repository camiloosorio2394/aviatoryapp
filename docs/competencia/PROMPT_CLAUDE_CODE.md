Estás trabajando en el repo de **Aviatory**. Es una plataforma para pilotos que buscan entrar a una aerolínea, con tres pilares: inglés aeronáutico ICAO, cursos técnicos completos y pruebas psicotécnicas. La meta es ser la plataforma más robusta en español para Latinoamérica, con el inglés como idioma por defecto y eje del producto.

En `docs/competencia/` dejé un benchmark de competencia hecho el 26-sep-2026. Tu trabajo es guardarlo en tu memoria y convertirlo en decisiones de producto.

## Paso 1: Guardar en memoria
1. Lee `docs/competencia/CLAUDE_MEMORIA.md` y pega su contenido en `CLAUDE.md` en la raíz del repo, en una sección "Contexto de producto: Aviatory".
   - Si `CLAUDE.md` no existe, créalo.
   - Si ya existe, agrega la sección sin borrar lo que hay.
2. Lee completos `docs/competencia/analisis_features.md` y `docs/competencia/analisis_top15.md`. Revisa por encima `README.md` y `competidores.csv`.
3. **Regla clave:** pricing y SEO son la **FASE FINAL**. No los trabajes. Todavía no queremos ser encontrados.
   - Revisa si el sitio es indexable hoy: robots.txt, meta robots/noindex, sitemap y los headers X-Robots-Tag.
   - Repórtame lo que encuentres, pero **no cambies nada sin mi OK**.

## Paso 2: Mapear Aviatory contra la competencia
1. Explora el código: rutas, modelos de datos, módulos de inglés, cursos y psicotécnicos, IA, analítica, i18n y onboarding. Resume en 10 líneas qué existe hoy.
2. Agrega una columna **"Aviatory"** a la matriz F01–F32 de `analisis_features.md`.
   - Usa ✅, ⚠️ o ❌ según el código real.
   - Cita el archivo o la ruta que respalda cada ✅ y ⚠️.
   - Recalcula la cobertura de Aviatory sobre 32 y compárala con Rotate (19,5), SkyStudy (18,5) y PilotAptitudeTest (16).

## Paso 3: Entregables en `docs/competencia/`
1. **`gap_analysis.md`:** por cada feature de las capas 1 y 2 de la sección 7 de `analisis_features.md`, anota qué tiene Aviatory, qué le falta y el esfuerzo estimado (S, M o L). Referencia al competidor que lo hace mejor.
2. **`roadmap_producto.md`:** las 15 features priorizadas por impacto × esfuerzo, en 3 olas.
   - Ola 1: mínimo creíble.
   - Ola 2: diferenciadores.
   - Ola 3: fosos.
   - Para cada feature: descripción, criterio de "listo", dependencias técnicas y cómo se conecta con el motor diagnóstico → plan → práctica → readiness score.
   - **Sin pricing y sin SEO.**
3. **`spec_entrevista_ia.md`:** especificación técnica de la feature estrella, la entrevista en voz o video con IA que califica a la vez el inglés ICAO (6 descriptores, regla lowest-of-6) y las competencias STAR.
   - Flujo de usuario, prompts y rúbricas.
   - Modelo de datos, stack de voz (STT y TTS) y cómo encaja en la arquitectura actual.
   - Riesgos de validez de la calificación y cómo mitigarlos.

## Reglas
- Escribe en español. El contenido de producto para el piloto va en inglés por defecto.
- No inventes datos de competidores. Si necesitas algo nuevo, verifícalo en la web, cita el link y pon la fecha. Si un sitio no se puede leer, agrégalo a `REVISION_MANUAL.md` en vez de suponer.
- En esta tarea no modifiques código de producción, solo `docs/` y `CLAUDE.md`.
- Al final, dame un resumen de 10 líneas:
  - La cobertura actual de Aviatory.
  - Los 3 huecos más urgentes.
  - Qué construirías primero.
  - El estado de indexación del sitio.
