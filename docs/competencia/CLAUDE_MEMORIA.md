## Contexto de producto: Aviatory (pegar en CLAUDE.md del repo)

**Qué es.** Plataforma que prepara pilotos para conseguir trabajo en aerolíneas. Tiene tres pilares:
1. Inglés aeronáutico ICAO.
2. Cursos técnicos completos de varias materias.
3. Pruebas psicotécnicas.

**Visión.** Ser la plataforma más robusta en español para Latinoamérica.
- El producto va enfocado en el **inglés, que es el idioma por defecto**. El español es la capa de soporte para LATAM.
- El idioma de un competidor no importa: si algo es bueno, se trae.

**Prioridades (orden obligatorio):**
1. **AHORA:** producto y features. Los tres pilares con profundidad de especialista, conectados por un solo motor: diagnóstico → plan por aerolínea y fecha → práctica con IA → readiness score.
2. **FASE FINAL, NO trabajar todavía:** pricing y SEO. Aviatory **todavía no quiere ser encontrado**.
   - No crear páginas públicas indexables.
   - No agregar sitemap, schema ni contenido SEO programático.
   - No quitar noindex ni bloqueos de robots.
   - Si ves que el sitio es indexable, avísale al usuario antes de cambiar nada.

**Benchmark de competencia** (sep-2026) en `docs/competencia/`:
- `analisis_features.md`: matriz de 15 × 32 features y los 20 diferenciadores. **Es el documento guía para decisiones de producto.**
- `analisis_top15.md`: fichas profundas de Rotate, FlightDeckFriend, ASP, FlightDeckIQ, Your Pilot Interview, PilotAptitudeTest, SkyTest, PilotentestTraining, Vectors to Hired, AeroScout, CaptainPilot, Level6Aviation, SkyStudy, Loop Aviation y AeroTest Chile.
- `README.md` y `competidores.csv`: mapa de ~110 plataformas. Las secciones de precios y SEO son solo referencia para la fase final.
- `REVISION_MANUAL.md`: URLs que el usuario revisa a mano. Si él agrega hallazgos, actualiza la matriz.

**Diferenciadores objetivo** (ver `analisis_features.md`, sección 6):
- Entrevista con IA que califica a la vez el inglés ICAO (6 descriptores) y las competencias STAR.
- Mock ICAO con rúbrica pública.
- Rutas por etapas reales de las aerolíneas de LATAM (Avianca, LATAM, Copa, Aeroméxico, Volaris, JetSMART, Wingo, Azul).
- Percentiles contra la cohorte.
- Plan adaptativo con readiness score.
- Audio ATC con acentos de LATAM.
- Confianza: cifras consistentes y autores con nombre.

**Regla de datos.** Nunca inventar cifras de competidores. Si no está verificado, se escribe "no verificado" con la fecha.
