# Aviatory: benchmark de competencia global

**Fecha:** 26-sep-2026 · **Alcance:** ~110 plataformas en 4 categorías, 15 de ellas analizadas a fondo · **Precios:** solo los que se vieron publicados en cada sitio ese día.

> **Prioridades de Aviatory:**
> - **Meta:** la plataforma más robusta en español para LATAM, con el inglés como idioma por defecto y eje del producto. El idioma de un competidor no importa: lo bueno se trae.
> - **Ahora:** producto y features.
> - **FASE FINAL (no trabajar todavía):** pricing y SEO. Aviatory todavía **no quiere ser encontrado**. Las secciones 3 y 4 son solo referencia guardada.

## Estructura de esta carpeta

| Archivo | Qué tiene |
|---|---|
| `analisis_top15.md` | **Nuevo.** Análisis profundo de los 15 competidores más relevantes: producto, IA, UX, confianza, fortalezas y debilidades, y qué copiar |
| `analisis_features.md` | **Nuevo.** Matriz de 15 × 32 features, features comunes, raras y los 20 diferenciadores clave, más lo que significa para Aviatory |
| `REVISION_MANUAL.md` | **Nuevo.** Las URLs que no se pudieron leer y que Nicolas revisa a mano |
| `CLAUDE_MEMORIA.md` | **Nuevo.** Bloque para pegar en el `CLAUDE.md` del repo, para que Claude Code recuerde el contexto y las prioridades |
| `README.md` | Este resumen: el mapa competitivo, los precios y el SEO de referencia (fase final) y los huecos de mercado |
| `competidores.csv` | La base completa: categoría, nombre, URL, país, idiomas, precios, features, SEO y estado del link |
| `detalle/interview_prep.md` | 26 plataformas de preparación para entrevistas y selección en aerolínea |
| `detalle/aptitude_tests.md` | 22 plataformas de psicotécnicos y pruebas de aptitud (DLR, COMPASS, cut-e, Mollymawk, PILAPT, ADAPT) |
| `detalle/aviation_english.md` | 31 plataformas de inglés aeronáutico ICAO (TEA, ELPAC, RELTA, SDEA, EPLIS) |
| `detalle/ground_school_careers.md` | 33 plataformas: ATPL y bancos de preguntas, más portales de carrera y empleo |

**Limitaciones de los datos:**
- **Tráfico:** no hay datos de terceros (Similarweb y Semrush bloquearon las consultas). El SEO se evaluó por on-page: title, meta description, hreflang, tamaño del sitemap y blog.
- **Bloqueos:** algunos sitios no dejaron leer su contenido (FlightDeckFriend, ATPL Questions, Bristol GS, Pilot Career Center). Los datos de esos salen de snippets o de otras páginas del mismo sitio.

---

## 1. Conclusión

1. **Nadie combina los tres pilares de Aviatory en español.** Inglés ICAO, cursos técnicos y psicotécnicos, orientados a conseguir aerolínea, no existen juntos en español. El que más se parece es **Loop Aviation**, que está solo en portugués y solo para Brasil.
2. **El mercado en inglés sí está peleado.** Hay jugadores fuertes en cada vertical:
   - **Entrevistas:** Rotate y FlightDeckFriend.
   - **Psicotécnicos:** PilotAptitudeTest.com y SkyTest.
   - **Inglés ICAO:** Level6Aviation y CaptainPilot.
   - **ATPL:** Aviationexam, ATPL Questions y Airhead.
3. **Las simulaciones de entrevista con IA ya son estándar.** Las tienen Rotate, FlightDeckIQ, PilotAptitudeTest, Your Pilot Interview, Vectors to Hired, Spitfire Elite, AeroScout y SkyStudy.
4. **El SEO que gana es programático.** Los líderes tienen cientos o miles de páginas del tipo "[aerolínea] pilot interview / assessment / psicotécnico":
   - PilotAptitudeTest: ~709 páginas.
   - Rotate: ~2.500.
   - AeroScout: ~2.280.
   - Level6Aviation: ~826 posts en 19 idiomas, pero **sin versión es-CO ni es-MX**.
5. **Colombia y LATAM hispana están casi vacíos.** No hay banco ATPL colombiano (Aerocivil), ni psicotécnicos con perfiles de Avianca, LATAM, Copa, JetSMART o Aeroméxico, ni un portal de empleo para pilotos.

## 2. Los competidores que más importan

| # | Plataforma | Por qué importa | Precio visto |
|---|---|---|---|
| 1 | [Rotate](https://rotatepilot.com) (EE. UU.) | Todo en uno: exámenes, tutor IA, 9 packs de aerolíneas (incluye uno de LATAM, Avianca y Copa), entrevista simulada con IA y aptitud. ~2.500 URLs programáticas | $14,99–29,99/mes; pack $29; entrevista IA $79–399 |
| 2 | [Loop Aviation](https://loopaviation.com.br) (Brasil) | El más parecido a Aviatory: simulados ANAC, ICAO/SDEA, psicotécnicos y guías de selección de LATAM, Azul y GOL | VIP desde R$49,90/mes |
| 3 | [PilotAptitudeTest.com](https://pilotaptitudetest.com) (Reino Unido) | Líder global en aptitud: más de 100 assessments, más de 150 aerolíneas, joystick, entrevista en video con IA | £29 (7 días) / £49 (1 mes) / £69 (3 meses) |
| 4 | [FlightDeckFriend](https://www.flightdeckfriend.com) (Reino Unido) | La marca de referencia en UK y Europa; hub de contenido muy grande | Base de preguntas £39,99; pack £59,99; preparación de simulador £690 |
| 5 | [Airline Selection Programme](https://online.airlineselectionprogramme.com) (Francia) | Paquete de selección completo con 16PF, simulador e inglés FCL.055 | Entrevista €1.290–1.500; simulador €490; inglés €299 |
| 6 | [CaptainPilot](https://captainpilot.com) | Inglés ICAO con IA (pronunciación y fluidez), 331 lecciones, app y 13 exámenes, incluido SDEA | $50/mes a $300 por 6 meses |
| 7 | [Level6Aviation](https://level6aviation.com) (Estonia) | Domina el SEO del examen ICAO online: 19 idiomas, ~826 posts | Examen €169–199; simulación €59 |
| 8 | [SkyStudy ATPL](https://skystudyatpl.com) | Concepto casi igual al de Aviatory (aptitud + ATPL + ICAO con IA + CV + empleos). Gratis en beta | Planeado: €29,99/mes ATPL; ICAO €59–89 |
| 9 | [FlightDeckIQ](https://flightdeckiq.com) | Entrevista con IA que califica el inglés ICAO, más psicométricos. Valida la tesis de Aviatory | €179 pago único |
| 10 | [AeroScout](https://aeroscout.net) | Portal de carrera moderno: empleos de ~1.100 aerolíneas, auto-apply, simulador de entrevista con IA | Pro $19,99/mes |
| 11 | [SkyTest](https://www.skytest.com) (Alemania) | Marca histórica de psicotécnicos; también vende hardware (joysticks, pedales, yokes) | €49,95–99,95 por paquete |
| 12 | [Vectors to Hired](https://vectorstohired.com) (EE. UU.) | 11.431 flashcards de entrevista para 56 operadores y simulación de voz con IA | Gratis / $39/mes / $99 por 90 días |

### Jugadores en español, portugués y LATAM

| Plataforma | Qué hace | Precio visto |
|---|---|---|
| [AeroTest Chile](https://aerotest.cl) (ES) | 3.500+ tests DGAC, 50+ cursos, tutor 24/7, blog de selección LATAM, SKY y JetSMART. Es el más fuerte en español | No público |
| [Waypoint](https://waypoint-program.com) (ES, LATAM) | Libro interactivo de inglés aeronáutico con 550+ actividades | No público |
| [Psicotecnica.lat](https://psicotecnica.lat) (MX) | PDFs y simuladores psicométricos, con páginas de Aeroméxico y LATAM | No público |
| [WASIM](https://wasim.es) (España) | Coaching presencial: entrevista, dinámicas, psicotécnicos y simulador A320 | Cotización |
| [Cinetic Plus](https://cineticplus.com) (España) | Curso ICAO nivel 4 autoguiado; ATPL online | €115 (inglés); €4.700 (ATPL) |
| [Aviation English Colombia](http://aviationenglishcolombia.com) (CO) | Escuela B2B con examinadores TEA; dice ser proveedor de LATAM Colombia. **El sitio no respondió el 26-sep**, así que es un posible aliado | No público |
| [English For Aviation AR](https://englishforaviation.com.ar) / [Alas Educa](https://alaseduca.com) (AR) | Escuelas locales de inglés OACI | No público |
| [Lift Aviation](https://liftaviation.com.br) (BR) | Biblioteca de cursos más preparación para selección de copiloto | R$89/mes |
| [Espaço Aéreo](https://espacoaereo.com/preparatoriolinhaaerea) (BR) | Curso de selección de ~100 horas con pruebas pasadas de aerolíneas y chatbot IA | R$872 (lista R$1.284) |
| [Ico Aviation English](https://icoaviationenglish.com) (BR) | Preparación SDEA más inglés para entrevista de aerolínea | R$950–2.959; entrevista R$1.550 |
| [Piloto Brasil](https://pilotobrasil.com.br) (BR) | 22.000+ preguntas ANAC con IA adaptativa | R$199,90 |

## 3. Rangos de precios: ⏸️ PENDIENTE, FASE FINAL (solo referencia)

| Tipo de producto | Rango |
|---|---|
| Suscripción autoservicio (entrevista, aptitud o todo en uno) | **$15–40 USD/mes**; £29–69 por acceso de 7 días a 3 meses |
| Pago único por ciclo de selección | **$55–180 USD** (Airmappr €49,90–79,90; FlightDeckIQ €179; Your Pilot Interview €55–79) |
| Pack por aerolínea | $9–30 USD |
| Inglés ICAO: app con IA | $60/año (Going Around) a $50/mes (CaptainPilot) |
| Inglés ICAO: examen online | €159–239 |
| Inglés ICAO: simulación de examen | €59–69 |
| Coaching humano | ~$200–250/hora; paquetes en EE. UU. de $700–3.300 |
| Banco ATPL | Gratis a ~€250/año en Europa; $90–299 en EE. UU. |
| Referencia de disposición a pagar en LATAM (Brasil) | R$49–89/mes, o ~R$900–2.000 por curso intensivo (US$160–370) |

## 4. SEO: ⏸️ PENDIENTE, FASE FINAL (solo referencia; hoy no queremos ser encontrados)

**Lo que funciona:**
- **Páginas programáticas por aerolínea:** "Avianca pilot interview questions", "[aerolínea] psicotécnico", "[aerolínea] assessment". PilotAptitudeTest, Rotate, AeroScout y Airmappr crecen así.
- **Una página por tipo de examen o prueba:** TEA, ELPAC, SDEA, DLR, COMPASS, cut-e, PILAPT. Así lo hacen CaptainPilot, Pilotest e ICAO Exam Practice.
- **Blog constante con comparativas:** Airhead (~136 posts, incluidas comparaciones con competidores), Pilot Institute (~800) y Spitfire Elite (~261).
- **Hreflang multi-idioma:** Level6Aviation tiene 19 idiomas, pero solo es-ES en español.

**Dónde está el hueco:**
- Las búsquedas en español como "inglés aeronáutico", "inglés OACI nivel 4", "psicotécnicos piloto", "entrevista piloto Avianca" y "prueba LATAM cadete" no tienen un sitio dominante. Hoy las reparten JobTestPrep (su página en español vende material en inglés), directorios tipo Emagister, PDFs y blogs de escuelas de vuelo.
- Hay espacio para Aviatory con **es-CO, es-MX, es-AR, es-CL, es-ES y pt-BR**.

**Debilidades de los incumbentes que se pueden aprovechar:**
- Varios no tienen meta description: SkyTest, Gleim, CAE, Airmappr, Aviator Intelligence y Pilot Careers Live.
- FlightDeckFriend tiene guías de 2017 a 2022, algunas desactualizadas.
- La mayoría de los productos son PDFs, no plataformas interactivas.

## 5. Oportunidades y recomendaciones

1. **Posicionarse como "la primera plataforma en español para conseguir aerolínea".** Los tres pilares más IA, con perfiles de Avianca, LATAM, Copa, JetSMART, Aeroméxico, Volaris, Viva, Iberia y Vueling.
2. **Hacer la entrevista simulada con IA en inglés, calificada con los 6 criterios ICAO.** Nadie la ofrece para hispanohablantes, y une dos pilares en un solo producto (inglés y entrevista).
3. **Psicotécnicos interactivos con perfiles por aerolínea de LATAM.** No existe ninguno en español. Hay que copiar el modelo de AvioTest en Turquía: mobile-first, precio en moneda local y aerolíneas locales.
4. ⏸️ *(Fase final)* **Precio de entrada sugerido:** ~$15–25 USD/mes o un plan por ciclo de selección de ~$99–149, en COP, MXN y demás monedas locales. Coaching humano como upsell.
5. ⏸️ *(Fase final)* **SEO:** plantilla programática para cada aerolínea × tipo de prueba en cada país, más un hub por examen (TEA, SDEA, ELPAC, EPLIS). Aparte, evaluar a Aviation English Colombia como aliado B2B.
6. **Aliados posibles, no competidores:**
   - Symbiotics (ADAPT) y Mollymawk: creadores de las pruebas oficiales.
   - Airline Pilot Central, PilotsGlobal y Pilot Careers Live (que tiene evento en Madrid en may-2027): distribución y audiencia.
