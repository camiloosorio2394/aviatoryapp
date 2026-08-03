# Auditoría completa de Aviatory · 3 de agosto de 2026

Auditoría crítica de producto, UX, UI, contenido, arquitectura y conversión.
Encargo: actuar como consultoría externa sin amabilidad. Todo hallazgo lleva
evidencia observable, impacto, severidad y arreglo concreto.

## Método y límites, para que nada se lea de más

Todo lo que sigue se **midió sobre la app corriendo** (`localhost:5173`, commit
`30cd20a`) y sobre la base de producción, no sobre capturas ni memoria:

- Recorrido en vivo: landing, login, PCA, ICAO, Ingreso a aerolínea, Biblioteca,
  Exam Tracker, Match, Mercancías, NOTAM (hub, lección, práctica), a 1280 y 390 px.
- Consultas reales a la base: 4 perfiles, 459 preguntas en 11 slugs, 5 documentos
  publicados, 14 canales con **0 mensajes**, **0 reportes** de examen, 21 logros
  con 11 otorgados.
- Barridos de código para consistencia: alturas de botón, radios, escala
  tipográfica, duraciones, estados de error, foco de teclado.

Límites declarados:

- **Sin sesión.** Dashboard, Mi ruta, Logbook, Vencimientos, Comunidad y Perfil
  no renderizan sin auth; se auditaron por código. Lo demás se vio en su estado
  de día 1, que es el que este proyecto declara como el que importa.
- **Sin animaciones.** En el entorno de auditoría `requestAnimationFrame` e
  `IntersectionObserver` no corren (panel sin componer). Nada de motion se
  evaluó en vivo; el hallazgo del contador es de robustez, no un bug reproducido.
- Los códigos de aerolínea se marcan **VERIFICAR**, no se afirman: eso lo
  confirma un piloto, no un auditor.

---

## 1 · Resumen ejecutivo: la contradicción central

Aviatory tiene una virtud rara: **honestidad quirúrgica en el producto**.
Estados vacíos que dicen la verdad ("Sin presentar", "Sin registrar", "Ed.
original 2016, confirma la edición en vigor"), material real de la Aerocivil,
un aviso que reconoce que el banco oficial tiene errores y te da las dos
respuestas. Eso es exactamente lo que un piloto respeta y casi nadie hace.

Y esa virtud convive con **mentiras de marketing baratas** que la dinamitan:

| Dónde | Qué dice | Qué es verdad |
|---|---|---|
| Login | "Cientos de pilotos LATAM ya están adentro" | **4 perfiles** en la base |
| Landing, stats | "3x más rápido que estudiar solo" | No existe ese estudio |
| Landing, plan Founder | "Solo 100 cupos" (dos veces) | Sin contador real, con 4 usuarios |

La regla del propio proyecto dice "cero mentiras en pantalla". El equipo ya
borró los testimonios inventados de la landing (commit `bcab86d`); estas tres
son la misma enfermedad y sobrevivieron. **Un piloto que descubre una cifra
inflada deja de creer las mil que sí son verdad.** Es el hallazgo número uno y
se arregla en una tarde.

Los otros cuatro estructurales:

1. 🔴 **El Rastreador de exámenes está roto por dentro.** Sus RPC leen
   `subjects` (6 materias) y el banco vive en 11 slugs: **260 de 459 preguntas
   (57%) quedan bajo materias que la pantalla no conoce**, y `motores` y
   `reglamento` existen en pantalla con 0 preguntas. Hoy no se ve porque hay 0
   reportes; el primer reporte real cae en un esquema equivocado.
2. 🔴 **Las lecciones se declaran documentos.** "Para leer de corrido como un
   PDF" sigue vivo en el header de la lección NOTAM (líneas 172, 184, 256, 260
   de `NotamLesson.tsx`) y el framing "de corrido" ya se copió a **7 archivos**,
   Mercancías incluido (dos veces en su hub). El diagnóstico que Camilo hizo el
   2 de agosto está en el contexto del proyecto y la app lo sigue contradiciendo.
3. 🟠 **El sistema de diseño escrito y el código se contradicen.** Regla: botones
   solo md/lg, radios 8/12, escala 12/13/15/17/20/24/32. Medido: **5 alturas de
   botón** en uso, **5 radios**, ~27 tamaños fuera de escala, **6 duraciones**
   de transición distintas (150 a 1000 ms).
4. 🟠 **Sin foco de teclado** en los botones escritos a mano (solo las
   primitivas shadcn lo tienen). WCAG 2.4.7, y es una clase CSS global.

---

## 2 · UX, calificado

| Aspecto | Nota | Evidencia |
|---|---|---|
| Arquitectura de información | 7 | Sidebar clara (Módulos / Herramientas / Cuenta), pero una misma feature tiene 3 nombres y "próximamente" vive en 2 sitios |
| Jerarquía | 7 | Hubs nuevos bien; la lección compite consigo misma (índice + hoja + metadatos duplicados arriba y dentro) |
| Carga cognitiva | 6 | Landing de 9.278 px (10,3 pantallas, 923 palabras); hubs en 1.100-1.500 px, correctos |
| Facilidad de uso | 7 | Flujos lineales, CTAs claros; 3 CTAs a la misma ruta en el hub NOTAM vacío |
| Tiempo a la información | 7 | Los hubs anuncian contenido con números concretos (89 audios, 24 NOTAM); el Decodificador quedó discreto |
| Claridad | 8 | El copy es de lo mejor del producto, con manchas puntuales (abajo) |
| Consistencia | 4 | Sección 10, medido |
| Descubribilidad | 6 | Wingman flota sin explicarse; la Biblioteca aparece solo si sabes qué es |
| Accesibilidad | 5 | Base buena (lang=es, alt 100%, reduced-motion, labels en login), foco de teclado ausente, sin skip-link |
| Onboarding | s/n | No ejecutable sin auth; promesa medible: "6 preguntas, 90 segundos" |
| Fricción | 7 | Login con Google + email correcto; onboarding gate antes del dashboard |
| Puntos muertos | 6 | Botón "Empezar" apuntando a nada en el estado de error del PCA; Dashboard sin sesión deja un "?" flotante huérfano |
| Estados vacío/carga/error | 7,5 | Vacíos excelentes casi siempre; **8 páginas con fetch sin estado de error** |
| Pantallas innecesarias | 8 | No sobran pantallas; sobran bloques dentro de algunas |

**Los puntos muertos concretos:**

- `Pca.tsx`: cuando las materias fallan, la tarjeta "Empieza por la materia más
  grande" sigue mostrando su botón "Empezar" hacia nada. En error, esa tarjeta
  debe degradarse con la lista.
- Páginas con `supabase.` y ningún error visible (caen a vacío silencioso):
  `AirlinePrep`, `IcaoInterview`, `IcaoVocabulary`, `InterviewSpeakingIntro`,
  `Login`, `Metar`, `MetarExam`, `Notam`. Un fallo de red se disfraza de "no
  tienes progreso", que es peor que un error.

---

## 3 · UI y sistema visual

**Lo que está bien y no hay que tocar:** tokens oklch, panel navy del dashboard
como convención de cabina (documentado), `.surface` con sombra de 1px, el rail
claro nuevo con contraste AA medido (7.96 / 6.47 / 5.66 / 7.02 / 17.03 en
claro), tres superficies con reglas propias (doc-sheet, mod-shell, infografías).

**Lo que está mal, medido:**

| Regla escrita | Realidad en el código |
|---|---|
| Botones solo md y lg | h-8 (3), h-9 (11), h-10 (28), h-11 (36), h-12 (14) |
| Radios: 8px controles, 12px superficies | rounded-md 27 · lg 73 · xl 270 · 2xl 160 · full 112 |
| Escala 12/13/15/17/20/24/32 | 16× `14px`, 6× `16px`, 3× `28px`, 2× `19px`, 13× `11px` |
| Sin criterio escrito de motion | duration-150/200/300/500/700/1000 conviven; surface-lift a 300 |

El de radios merece decisión, no barrido: la práctica real convergió en
`rounded-xl` controles y `rounded-2xl` superficies. **O se reescribe la regla o
se reescribe el código**, pero hoy el documento de diseño describe otra app.

**Amateur flags concretos:**

- El botón flotante de Wingman: 60px, degradado cian→azul, con halo, presente
  en todas las pantallas. Es el único elemento con estética de app de consumo
  dentro del tono instrumento. En celular tapa contenido en la esquina donde
  las lecciones ponen su navegación.
- `.halo-pulse` (blur 8px animado) vive solo en Pricing: una pantalla con un
  lenguaje que el resto ya abandonó.
- Fotos stock de Unsplash en las 4 carátulas NOTAM y en las cards de la landing:
  el propio rediseño aprobado las condena ("imagen funcional, no stock de
  cabinas") y la lista de encargo (IMG 01-06 con medidas) ya existe.

---

## 4 · Contenido, texto por texto

Veredictos sobre los textos que importan. Lo no listado está bien.

| # | Texto actual | Veredicto | Propuesta |
|---|---|---|---|
| 1 | "Cientos de pilotos LATAM ya están adentro" (login) | **ELIMINAR HOY** | "Construido sobre el banco oficial: 459 preguntas verificadas contra Aerocivil." |
| 2 | "3x más rápido que estudiar solo" (stats landing) | **REESCRIBIR** | Cifras reales con el mismo punch: "459 preguntas oficiales · 89 audios reales · 24 NOTAM de la Aerocivil · 6 aerolíneas comparadas" |
| 3 | "Solo 100 cupos" ×2 (Founder) | **CONDICIONAR** | Solo con contador real de BD ("Quedan 97 de 100"); sin contador, fuera |
| 4 | "Documento de estudio en 13 secciones, para leer de corrido como un PDF" (lección NOTAM) | **REESCRIBIR** | "13 secciones cortas: el código, las casillas y práctica con avisos reales de la Aerocivil." |
| 5 | "Se lee de corrido…" / "se estudia de corrido" (hub Mercancías, ×2) | **REESCRIBIR** | "Con lector propio: índice, práctica y chequeo sin salir del tema." |
| 6 | "El Waze de los exámenes Aerocivil" (H1) | **DEGRADAR** | H1: "Qué cayó en el examen". El Waze baja a frase de apoyo. Un H1 no puede ser una metáfora de otra marca |
| 7 | "EXAM TRACKER · INTELIGENCIA COLECTIVA" (eyebrow) | **REESCRIBIR** | "Inteligencia colectiva". El nombre en inglés no existe en ningún otro lugar de la app |
| 8 | "Mastery por dimensión" (perfil) | **REESCRIBIR** | "Tu dominio por habilidad". Spanglish de desarrollador |
| 9 | "Banco de preguntas Aerocivil PPL/CPL" (login) y meta description "PPL/CPL" | **CORREGIR** | "PCA". Toda la app dice PCA; la nomenclatura Aerocivil es PPA/PCA |
| 10 | "Bienvenido de vuelta a tu próximo vuelo" (login) | **SIMPLIFICAR** | "Bienvenido de vuelta." La frase se pisa con el subtítulo siguiente |
| 11 | "El banco oficial tiene errores. Te damos la respuesta técnica correcta y cuál marcar para aprobar." (PCA) | **MANTENER Y ASCENDER** | Es el mejor copy del producto. Súbelo a la landing como diferenciador |
| 12 | "¿Te suena familiar? Ser piloto en LATAM es una carrera de obstáculos invisibles" | **MANTENER** | Funciona |
| 13 | Signos de admiración (2: `IcaoComprehension.tsx:320`, `VaultQuizPlayer.tsx:210`) | **CORREGIR** | Regla propia: sin tono de juego |
| 14 | CTA principal en 5 variantes ("Empieza gratis", "Comenzar gratis", "Comenzar 7 días gratis", "Comenzar mi prueba gratis", "Empezar gratis") | **UNIFICAR** | Una sola: "Empieza gratis". El botón es un ancla, no una redacción |

---

## 5 · Arquitectura de información

**Bien:** la separación Módulos (lo que se estudia) / Herramientas (lo que se
usa) / Cuenta es correcta y está razonada en el código. La Biblioteca por
familias es la decisión correcta y está cerrada.

**Mal:**

1. **Una feature, tres nombres.** Sidebar: "Qué cayó en el examen". Eyebrow:
   "EXAM TRACKER". H1: "El Waze de los exámenes". El usuario que llega desde el
   sidebar aterriza en una pantalla que se llama distinto dos veces.
2. **"Próximamente" vive en dos sitios y promete distinto.** El sidebar tiene un
   bloque colapsado (Entrevistas, Psicotécnicas) y además "Materias generales ·
   Pronto" dentro de Módulos; el hub de aerolínea promete "Entrevista técnica,
   Entrevista HR y CRM y Psicotécnicos" como temas. Es la decisión pendiente
   desde el 1 de agosto, visible en producción. Mientras no se decida, la app
   promete lo mismo en dos taxonomías.
3. **14 canales de comunidad con 0 mensajes y 4 usuarios.** La arquitectura le
   dice al primer usuario "esto está muerto" catorce veces. Tres canales
   (general, PCA, ICAO) concentran la poca conversación posible; los otros 11
   se abren cuando haya masa.
4. **El Dashboard tiene 1.590 líneas y 13 fetches.** No es un problema de
   usuario todavía, es un problema de que nadie va a querer tocarlo. Partirlo
   por secciones.

---

## 6 · Experiencia de piloto (errores conceptuales)

- **VERIFICAR códigos ICAO del Match, con un piloto o el AIP.** En pantalla:
  Wingo "GCO" (Wingo opera bajo el AOC de AeroRepública, RPB), "LATAM Colombia ·
  LAN" (LAN es el código de LATAM Chile; el AOC colombiano histórico es ARE),
  "JetSmart · Chile · JES" (JES corresponde a JetSMART Argentina; Chile es JAT).
  Avianca AVA, Copa CMP y SATENA NSE están bien. **Para la audiencia de esta
  app, un código ICAO equivocado es la forma más rápida de perder autoridad.**
- "Edad máxima cadete: 58 años" (Avianca): verificar, huele a error de captura.
- "PPL/CPL" en login y meta description contra "PCA" en todo el producto.
- Lo bueno: horas UTC por todas partes, ediciones citadas con año, el aviso de
  vigencia en cada NOTAM real, la advertencia de "no aplicar límites en línea
  de vuelo" en Mercancías. Eso es precisión aeronáutica de verdad.

## 7 · Diseño emocional y marca

**Lo que transmite hoy:** ingeniería honesta con manchas de startup genérica.
Las manchas: gradientes de consumo (Wingman, halo de Pricing), stock de cabinas
al atardecer, "Waze", métricas infladas.

**La identidad real ya existe y no se está usando como marca:** los recortes
del resumen Aerocivil, los rombos de mercancías, el panel navy, JetBrains Mono
para códigos, los estados honestos. Eso no lo tiene nadie más en LATAM.
ForeFlight no se ve "moderno": se ve **inevitable**. Aviatory tiene los
materiales para eso.

**Qué falta de marca:** un sello visual de verificación ("verificado contra el
documento oficial") usado consistentemente; un sistema de diagramas propio (un
trazo, el azul del sistema) que reemplace el stock; y matar los tres elementos
de consumo (gradiente Wingman, halo Pricing, contadores animados con spring).

## 8 · Benchmark

| Referencia | Qué hace mejor | Qué adaptar sin copiar |
|---|---|---|
| ForeFlight / Garmin / Jeppesen | Densidad de datos sin decoración; monocromo + un acento; nada se anima si no informa | Los hubs ya van ahí. Falta: matar gradientes decorativos y spring easing; la lección como instrumento, no como documento |
| Linear | Consistencia radical: un botón, un radio, una duración | Tokens de motion (140/240 ms) y barrido; appButtonClass como única fuente |
| Stripe | Escala tipográfica cerrada, copy técnico impecable | Eliminar los 27 tamaños fuera de escala; el copy ya está a ese nivel en sus mejores pantallas |
| Notion | Estados vacíos que enseñan el siguiente paso | Ya lo hacen bien; falta solo en errores |
| Apple | Reducción: un CTA por pantalla | Hub NOTAM vacío tiene 3 CTAs a la misma ruta; el estado vacío puede vivir sin dos de ellos |

## 9 · Consistencia: la lista completa

1. 5 alturas de botón (regla: 2). 2. 5 radios activos (regla: 2). 3. ~27 usos
fuera de la escala tipográfica. 4. 6 duraciones de transición. 5. 5 variantes
del CTA principal. 6. 3 nombres para el Rastreador. 7. "PPL/CPL" vs "PCA".
8. Inglés de feature sin política: Logbook (ok, jerga aeronáutica), Match,
Pilot ID, Wingman (ok, nombres propios), "Mastery por dimensión" y "EXAM
TRACKER" (no ok, descripciones). 9. Foco de teclado solo en shadcn. 10. Dos
signos de admiración. 11. Fotos JPG en assets con regla WebP para public.
12. El bloque "Próximamente" duplicado. 13. `.card`/`.card-hover` como alias de
compatibilidad conviviendo con `.surface`. 14. El doc de sistema de diseño
describe radios y botones que el código no cumple.

## 10 · Funcionalidades

**Sobran hoy:** 11 de los 14 canales; el bloque de stats inventadas; la doble
promesa de próximos módulos.

**Faltan, por valor:**

1. 🔴 **Repetición espaciada.** 22 preguntas intercaladas + 50 ejercicios + 60
   de evaluación + 45 del simulacro y **nada te devuelve lo que fallaste**. Para
   un examen que se prepara durante meses es la ausencia más cara del producto
   (ya estaba diagnosticada; sigue sin dueño).
2. 🟠 **Siembra del Exam Tracker.** El valor es red y la red tiene 0 nodos. O se
   siembra con reportes históricos reales etiquetados como tales, o el vacío
   se reencuadra a "sé el fundador del dato" con recompensa (badge, mes Pro).
3. 🟡 Buscador global (Ctrl+K) cuando los módulos pasen de ~6.
4. 🟡 Alertas de vencimientos reales (el plan Pro las vende; verificar que el
   motor existe más allá de la tabla de notificaciones).

**Premium bien elegido:** el gate del banco (30 preguntas/mes free) es el
paywall correcto porque el valor es acumulativo.

## 11 · Conversión

- El funnel tiene una sola promesa fuerte y es verdadera (banco oficial +
  material real). Las tres mentiras chicas compiten contra ella.
- 10,3 pantallas de landing: recortable un 30% fusionando "Cómo funciona" con
  la comparación.
- Prueba social imposible con 4 usuarios: no la finjas, reemplázala por prueba
  de material (contadores reales de contenido, que además ya existen en los
  hubs).
- El hero con el player del simulacro TEA es la mejor decisión de conversión de
  la página: muestra el producto de verdad.

## 12 · Rendimiento

- `index.js` 649 KB tras el split de rutas (vendor pesado); precache PWA
  **4,4 MB / 201 entradas**: la primera instalación descarga 4,4 MB. Auditar
  qué está entrando al precache que no debería.
- Fotos de landing: ~1,2 MB en JPG (247, 239, 183, 149 KB…). El script WebP del
  repo las bajaría 60-70%.
- `Invalid hook call` ×4 en `/login` (preexistente, verificado contra main
  limpio). Error real en pantalla pública.
- CountUp arranca en 0 y depende de rAF: cualquier contexto sin animación
  (lector, crawler, ahorro de energía) ve "0x más rápido". Arreglo: renderizar
  el valor final por defecto y animar solo cuando IO dispare.

---

## 13 · Hallazgos clasificados

| Sev. | Hallazgo | Evidencia |
|---|---|---|
| 🔴 | "Cientos de pilotos" en login | 4 perfiles en BD |
| 🔴 | subjects (6) vs vault (11): 57% del banco invisible para el Rastreador | Consulta BD, `get_subject_intel` |
| 🔴 | Lecciones declaradas documento; framing copiado a 7 archivos | `NotamLesson.tsx:172,184,256,260`, hub Mercancías ×2 |
| 🔴 | Sin repetición espaciada | 177 ítems de práctica sin cola de repaso |
| 🟠 | "3x más rápido" + "Solo 100 cupos" inventados | `Stats.tsx:15`, pricing |
| 🟠 | Sistema de diseño incumplido (botones, radios, escala, motion) | Sección 9, medido |
| 🟠 | Sin foco de teclado fuera de shadcn | grep focus-visible: 9 páginas |
| 🟠 | 8 páginas sin estado de error | Lista en sección 2 |
| 🟠 | Códigos de aerolínea a verificar (GCO, LAN, JES) | Pantalla Match |
| 🟠 | Exam Tracker: 3 nombres y arranque en frío sin plan | Live + BD (0 reportes) |
| 🟡 | 14 canales muertos | BD: 0 mensajes |
| 🟡 | Wingman flotante con gradiente de consumo | Live, todas las pantallas |
| 🟡 | 4,4 MB de precache; 1,2 MB de JPG en landing | Build + assets |
| 🟡 | Invalid hook call en /login | Consola, preexistente |
| 🟡 | Stock Unsplash contra la regla de imagen funcional | PHOTO_CREDITS.md |
| 🟡 | Doble promesa de módulos próximos | Sidebar + hub aerolínea |
| 🟢 | 2 signos de admiración; "PPL/CPL"; CTA ×5; "?" huérfano sin sesión | Greps + live |

## 14 · Roadmap

**Quick wins (1-2 días):**
quitar las 3 mentiras (login, stats con cifras reales, cupos condicionados) ·
CTA unificado · PPL/CPL→PCA · quitar "como un PDF" de la lección y "de corrido"
de Mercancías · clase global de focus-visible · WebP en fotos de landing ·
degradar el botón muerto del error PCA · arreglar CountUp · borrar la rama
`redesign/` ya portada y la sección 1 desactualizada de PENDIENTES_CAMILO.

**Mejoras (1-2 semanas):**
migración subjects↔vault con las 11 materias reales + iconos · consolidar
botones en appButtonClass y matar h-8/h-12 · barrido de escala tipográfica ·
tokens de motion (140/240 ms) y barrido · estados de error en las 8 páginas ·
un solo nombre para el Rastreador + plan de siembra · comunidad a 3 canales ·
casillas decodificadas en N8/N4/N24 (contenido) · decidir Entrevistas/Psico en
una sola taxonomía.

**Rediseño (1-2 meses):**
lección como instrumento (riel derecho, figuras funcionales por sección, matar
la hoja-documento) siguiendo la maqueta ya aprobada · repetición espaciada
sobre todos los bancos · sistema de diagramas propio que jubile el stock ·
sello de verificación como elemento de marca · partir Dashboard · onboarding
medido a "primera pregunta respondida en menos de 90 segundos".

**Visión:**
la fosa competitiva no es "plataforma de cursos": es **el único sitio donde el
material aeronáutico colombiano real está vivo** (banco oficial verificado,
NOTAM/METAR reales del mes, requisitos de aerolínea al día, y con masa crítica,
la inteligencia colectiva de qué cayó). Cada decisión que refuerce "esto es
material real y verificado" ensancha la fosa; cada gradiente, métrica inflada
o metáfora de consumo la rellena.
