# Auditoría: módulo "Preparación Ingreso a Aerolínea"

**Fecha**: 1 de agosto de 2026
**Commit auditado**: `3190a6d` (producción)
**Alcance**: `/app/aerolinea` y todo su árbol, comparado contra `/app/icao` (TEA) y `/app/pca` (Examen PCA)
**Método**: lectura del código fuente, conteo de contenido en los archivos de datos, y consulta directa a la base de datos de producción. Nada de esto se afirma de memoria: cada hallazgo cita archivo y línea.

---

## 1. Resumen ejecutivo

El módulo tiene un esqueleto curricular correcto y un tema (NOTAM) que es, sin exagerar, lo mejor construido de toda la aplicación. El problema no es lo que hay: es cuánto falta, y sobre todo que **lo que el piloto estudia aquí no cuenta para nada en el resto del producto**.

### Fortalezas

- **El tema NOTAM es material de curso real.** 12 secciones citadas contra Doc 8400 de la OACI y Anexo 15, decodificador con 168 asuntos y 78 estados, 30 ejercicios de práctica (16 de interpretación + 14 NOTAM reales publicados por la Aerocivil) y una evaluación de 20 preguntas con explicación y referencia por pregunta.
- **`Notam.tsx` es la mejor página del módulo**: progreso remoto con respaldo local y fusión de ambos, skeleton de carga, estado vacío honesto y tres indicadores por parte.
- **Trazabilidad de fuentes ejemplar.** `CODE_META.fuente`, `DISCLAIMERS`, `docs/PHOTO_CREDITS.md` y `src/data/metar/FUENTES.md`. Muy pocos productos EdTech citan de dónde sacaron cada tabla.
- **Cero mentiras en pantalla.** Ningún contador inventado, ningún 0% falso. Los temas sin contenido dicen "Pronto" y no fingen.

### Debilidades

- **Seis de ocho temas están vacíos** y el hub los muestra todos en la portada. El 75% de la pantalla es promesa.
- **Estudiar aquí no cuenta.** La racha, el heatmap y los logros ignoran casi todo el módulo (detalle en el hallazgo C2).
- **El progreso de METAR se pierde al cambiar de dispositivo**, mientras el de NOTAM sí se guarda. Dos temas del mismo módulo se comportan distinto.
- **La portada se contradice a sí misma**: anuncia "Requisitos por aerolínea · Pronto" y 40 píxeles más abajo enlaza a la herramienta que ya hace exactamente eso.
- **Deuda de sistema de diseño concentrada**: es la página que más se aleja del sistema fijado el 30 y 31 de julio.

### Riesgos

1. **Riesgo de abandono silencioso.** Un piloto estudia dos horas la lección de NOTAM, vuelve al Dashboard y ve racha 0 y el heatmap vacío. La conclusión razonable es que la app no funciona. Es el riesgo número uno del informe.
2. **Riesgo de trabajo perdido.** La tabla `user_metar_progress` y la RPC `metar_mark_progress` existen, están aseguradas y tipadas, y ninguna línea de la aplicación las llama. Ese trabajo ya se pagó y hoy no rinde.
3. **Riesgo de gamificación congelada.** Tres de los diez logros se calculan contra una tabla que ya nadie escribe: son inalcanzables para cualquier usuario nuevo (C6). El sistema de recompensas aparenta funcionar y está detenido.

> **Sobre el alcance del módulo.** Que hoy solo estén NOTAM y METAR es una decisión de producto tomada: el contenido se carga por tandas y el nombre del módulo es el definitivo. Este informe no la cuestiona. La asume, y evalúa dos cosas distintas: si la pantalla presenta bien un módulo en carga progresiva (H1) y si lo que ya está cargado funciona de verdad (C2 a C6). Los hallazgos críticos no son sobre lo que falta: son sobre lo que ya está construido y no está conectado.

### Oportunidades

- Conectar el módulo a los sistemas de actividad y logros que **ya existen y ya funcionan** es trabajo de horas, no de semanas, y cambia por completo la sensación de progreso.
- El tema NOTAM ya es una plantilla probada de cuatro partes (aprende, decodificador, práctica, evaluación). Replicarla es un problema de contenido, no de producto.
- `Pca.tsx` ya resolvió el hub dirigido por datos. Copiar ese patrón al hub de aerolínea es un refactor acotado con un modelo a la vista.

---

## 2. Hallazgos

### 📋 Fuera de clasificación: cómo se cuenta lo que falta

**H1. La carga progresiva se presenta como seis huecos, no como un plan**
`src/pages/AirlinePrep.tsx:41-105`
*Va aparte porque no es un defecto: el alcance es una decisión tomada.* Que solo estén NOTAM y METAR es lo esperado en una carga por tandas. Lo que sí se puede mejorar es cómo se muestra: los seis temas pendientes se renderizan como tarjetas "Pronto" en una rejilla de tres columnas bajo el título "Los que siguen", y ese bloque ocupa más superficie que el contenido real. Seis tarjetas grises idénticas, sin orden, sin fecha y sin diferencia entre "el próximo" y "el último".
**Impacto**: la primera impresión es una lista de cosas que no puedes hacer, cuando la misma información contada como ruta ("vas por el tema 2 de 8, sigue Performance") sería un argumento de venta. Un temario que avanza es exactamente lo que un piloto quiere ver.
**Qué hacer**: convertir el bloque en una línea de ruta compacta, con el próximo tema destacado y los demás como una lista de una línea. Ganan aire los dos temas que sí existen y lo pendiente pasa de deuda a promesa ordenada.

---

### 🔴 Críticos

Los cinco son sobre contenido **ya construido y en producción** que no está conectado. Ninguno se resuelve cargando material nuevo.

**C2. Estudiar en este módulo no alimenta la racha ni el heatmap**
`src/lib/activity.ts:30` y sus dos únicos consumidores.
`registrarActividadDeEstudio()` (que dispara `record_daily_activity` + `increment_streak`) se llama exclusivamente desde `src/pages/NotamExam.tsx:30` y `src/pages/VaultQuizPlayer.tsx:20`.
No la llaman: la lección de NOTAM (12 secciones), los 30 ejercicios de práctica, el decodificador de NOTAM, la lección de METAR, el decodificador de METAR, ni **ninguna** de las cinco pantallas del módulo ICAO.
**Impacto**: un piloto puede estudiar tres horas seguidas en este módulo y el Dashboard le dice que no estudió. Es el hallazgo más grave del informe porque destruye la percepción de progreso en toda la app, no solo aquí.

**C3. Cero logros asociados al módulo**
Consulta a `public.achievements` en producción: 10 logros, ninguno del módulo.
Son: onboarding, primer quiz Aerocivil, rachas de 3/7/30 días, materia dominada (PCA), nivel ICAO autoevaluado, 100 preguntas Aerocivil, primer mensaje en comunidad y Founder.
**Impacto**: terminar el tema NOTAM completo (12 secciones + 30 ejercicios + evaluación aprobada) no desbloquea absolutamente nada. El único tema terminado del módulo no tiene recompensa.

**C4. El progreso de METAR se pierde al cambiar de dispositivo**
`src/pages/Metar.tsx:8,34` lee de `readMetarProgress()`, que es `localStorage` (`src/lib/metar.ts:431`).
La migración `metar_progreso` ya creó `user_metar_progress` y la RPC `metar_mark_progress`: ambas aparecen en `src/integrations/supabase/types.ts:2798,3244`. **Ninguna línea de la aplicación las invoca.** El comentario de `src/pages/Metar.tsx:17-18` todavía dice "pendiente de aplicar", que era cierto el 30 de julio y dejó de serlo el 31.
NOTAM sí persiste correctamente vía `src/lib/notamProgress.ts`.
**Impacto**: dentro del mismo módulo, un tema te recuerda entre dispositivos y el otro te olvida al cambiar de teléfono. Además hay backend pagado y asegurado que no rinde nada.

**C5. La portada se contradice a sí misma**
`src/pages/AirlinePrep.tsx:98-104` muestra "Requisitos por aerolínea · Pronto" ("Qué pide cada aerolínea y qué te falta a ti para postular").
`src/pages/AirlinePrep.tsx:153-158`, en la misma pantalla, enlaza a `/app/match` con el texto "Ver mi match".
`/app/match` es `src/pages/Airlines.tsx`, que consulta `airlines`, `flights` y perfil, y calcula exactamente ese match. Funciona y está en el menú lateral como "Para cuál calificas".
**Impacto**: la pantalla anuncia como futuro algo que el usuario puede usar hoy, y en el mismo scroll le ofrece el enlace. Lee como descoordinación interna.

**C6. Tres de los diez logros son inalcanzables: el sistema mira una tabla que ya nadie escribe**
*Hallazgo transversal, encontrado auditando la gamificación del módulo. Excede su alcance y es el más grave de todos.*

`check_and_unlock_achievements()` calcula `first_quiz`, `first_100` y `subject_master` leyendo `public.quiz_attempts`:

```sql
select coalesce(sum(total_questions),0)::int,
       exists(select 1 from public.quiz_attempts where user_id=p_user_id and finished_at is not null)
  into v_total_questions, v_quiz_done
  from public.quiz_attempts where user_id = p_user_id and finished_at is not null;
```

Datos de producción: `quiz_attempts` tiene **11 filas, 4 terminadas**, todas del sistema viejo. `vault_sessions`, que es donde escribe el quiz actual, tiene **14 filas, 2 completadas**.
**Ningún código de la aplicación inserta en `quiz_attempts`.** `VaultQuizPlayer.tsx` pasa por `vault_submit_answer` y llama `registrarActividadDeEstudio()`, pero nunca escribe esa tabla. Las dos únicas referencias que quedan son lecturas de conteo en `Dashboard.tsx:309` y `Profile.tsx:130`.

Consecuencias:
- `first_quiz`, `first_100` y `subject_master` **no se pueden desbloquear nunca** para un usuario nuevo. Solo los tiene quien usó el quiz anterior a la migración del vault.
- El contador de quizzes que el piloto ve en su Dashboard y en su perfil sale de esa misma tabla congelada: **estudia, y el número no se mueve**. Es una mentira en pantalla en el sentido estricto de la regla de la casa, y de las difíciles de detectar porque el número es real, solo que de otra época.

Es exactamente el mismo error que tenía `get_subject_mastery` antes del 31 de julio: lógica nueva apuntando a las tablas legadas. Conviene revisar de una vez toda función que siga nombrando `quiz_attempts`, `questions` o `subjects`.

---

### 🟠 Importantes

**I1. La misma promesa aparece dos veces como dos cosas distintas**
`AirlinePrep.tsx` lista como temas "Pronto": Entrevista técnica, Entrevista HR y CRM, Psicotécnicos y assessment.
`src/components/layout/AppSidebar.tsx:104-108` lista como módulos "Pronto": `/app/entrevistas` y `/app/psicotecnicas`.
Ambas rutas existen y son placeholders (`InterviewSim.tsx:181,259` y `PsychTests.tsx:25-27`, que dice explícitamente "Hoy no hay ni una batería cargada").
**Impacto**: el piloto no sabe si las entrevistas son parte del módulo de aerolínea o un módulo aparte. La arquitectura de información promete lo mismo dos veces y no cumple ninguna.

**I2. El ancho del contenedor salta en cada clic**
Recorrido real del tema NOTAM: hub `1480px` (`Notam.tsx:225`) → lección `1180px` (`NotamLesson.tsx:172`) → práctica `1480px` y `1200px` (`NotamPractice.tsx:244,771`) → evaluación `1100px` (`NotamExam.tsx:394`).
El módulo usa cuatro anchos distintos. La app entera usa siete (1080, 1100, 1180, 1200, 1240, 1280, 1480) y el sistema fija **1280**.
**Impacto**: el texto cambia de medida en cada pantalla. Se percibe como inestabilidad aunque el usuario no sepa nombrarla.

**I3. Es el único módulo sin hero fotográfico**
`Pca.tsx:58-72` abre con `pca-flightdeck.jpg`. `Icao.tsx:39-72` abre con `icao-night-cockpit.jpg`. `AirlinePrep.tsx:114-122` abre con un `PageHeader` de texto plano.
**Impacto**: el módulo con la promesa comercial más fuerte es el único sin identidad visual en la entrada. El sistema permite foto en el hero de cada módulo: aquí falta.

**I4. Deuda de sistema de diseño concentrada en el hub**
En `AirlinePrep.tsx`: `max-w-[1180px]` (sistema: 1280), `rounded-2xl` (sistema: 12px en superficies), `card-apple` combinado con `border bg-card` en la línea 177 (el sistema prohíbe expresamente `border border-border bg-card` y exige `.surface`), botones construidos a mano en las líneas 153, 159 y 201 con altura `h-10` (el sistema define 36px secundario y 44px principal vía `appButtonClass()`), y **color por tema** en las líneas 41-105.
El color por tema fue eliminado del sistema a propósito: "el color solo cuando informa".
**Impacto**: es la página que más se aleja del sistema fijado hace dos días. `Pca.tsx` cumple el sistema entero y sirve de contraejemplo dentro del mismo repositorio.

**I5. Dos botones primarios de distinto color, apilados**
`AirlinePrep.tsx:201-207` pinta el botón "Abrir tema" con `TILE_COLOR[tema.color]`: azul para NOTAM, cian para METAR. Quedan uno debajo del otro.
**Impacto**: dos llamados a la acción del mismo peso compiten y ninguno gana. El color no informa nada: solo distingue tarjetas.

**I6. METAR entrega la mitad del tema y se queda sin cierre evaluativo**
`src/lib/metarLesson.ts` tiene 17 títulos frente a los 34 de `notamLesson.ts`. Práctica y Evaluación están en "Pronto" (`Metar.tsx:64-81`).
**Impacto**: el piloto lee y decodifica, pero nunca comprueba si aprendió. Sin evaluación no hay cierre ni sensación de logro, y el tema no puede marcarse como completo.

**I7. No hay recuperación activa dentro de la lección**
El sistema de bloques de `src/lib/notamLesson.ts:27-34` admite `p`, `quote`, `list`, `table`, `code`, `callout` y `kv`. **No existe un tipo de bloque de pregunta.**
La lección se lee de corrido y la práctica vive en otra pantalla, a la que hay que decidir ir.
**Impacto**: es el hallazgo instruccional de fondo. Leer 12 secciones seguidas sin recuperar nada produce fluidez ilusoria: el piloto siente que entendió y no retiene. Es exactamente lo que Duolingo, Brilliant y Khan Academy resuelven intercalando la pregunta dentro de la explicación.

**I8. No hay repetición espaciada en ninguna parte de la aplicación**
Verificado: cero coincidencias de `spaced`, `srs`, `leitner` o `interval_days` en todo `src/`.
**Impacto**: nada trae de vuelta lo que fallaste. Cada sesión empieza de cero y el olvido no se combate. Para un examen que se prepara durante meses, es la ausencia más costosa.

---

### 🟡 Medios

**M1. `Sparkles` sigue vivo en 16 usos repartidos en 19 archivos**, incluido `Notam.tsx:248`, dentro del módulo auditado. El sistema lo rechazó por leerse "hecho con IA / infantil". Se daba por erradicado salvo en la landing: no lo está.

**M2. El módulo no usa ni un símbolo aeronáutico propio.** Los ocho temas llevan iconos genéricos de lucide (`Briefcase`, `Wrench`, `Cog`, `Brain`, `ClipboardList`). `src/components/icons/aero.tsx` existe con VOR, NDB, waypoint, aeródromo, circuito de espera y localizador, y solo aparece el `HoldingIcon` en las tarjetas "Pronto".

**M3. El hub no dice cuánto cuesta cada tema.** `LessonScreen` ya guarda `minutes` por sección: el dato existe y no se agrega ni se muestra. El piloto no puede planear una sesión de estudio.

**M4. No hay ruta pedagógica declarada.** Ocho tarjetas sin orden recomendado ni prerrequisitos. `Notam.tsx:410` sí dice "el orden recomendado es de arriba abajo": el hub padre no dice nada equivalente.

**M5. El hub no conoce al piloto.** `AirlinePrep.tsx` no importa Supabase. No sabe que ya terminaste NOTAM, no ofrece retomar y no muestra avance. `Pca.tsx` resuelve esto con `usePcaStats()` y una tarjeta "Continuar donde quedaste" con la materia real.

---

### 🟢 Menores

**m1.** `Metar.tsx:17-18` dice que la migración está "pendiente de aplicar". Se aplicó el 31 de julio.
**m2.** El nombre del módulo cambia según dónde estés: "Prep aerolínea" en el botón volver de `Metar.tsx:96`, "Ingreso a aerolínea" en `Notam.tsx:230` y en el menú.
**m3.** `Metar.tsx:92-98` usa `border border-border bg-card` y `rounded-full` con `h-10` en el botón volver, mientras el equivalente de `Notam.tsx:226-231` es un enlace de texto. Dos soluciones para el mismo control en dos pantallas hermanas.

---

## 3. Comparación con TEA y PCA

### Contra el módulo TEA (`/app/icao`)

**Qué hace mejor el TEA**

1. **Está completo.** Cuatro secciones, las cuatro "Listo", más un simulacro de examen completo. No hay una sola tarjeta "Pronto".
2. **La estructura del módulo es la estructura del examen.** Las secciones se llaman "TEA · Parte 1", "Parte 2", "Parte 3". El piloto sabe exactamente qué está entrenando y para qué pregunta del examen sirve.
3. **Hay un cierre.** El simulacro TEA reúne las tres partes cronometradas. El módulo de aerolínea no tiene equivalente: no existe "simulacro de entrevista técnica".
4. **Enseña cómo se califica.** El bloque de referencia colapsable explica los 6 descriptores ICAO y la regla dura de que tu nota es tu descriptor más bajo. El piloto sabe contra qué lo miden.
5. **Hero fotográfico** y jerarquía resuelta: hero, navegación, simulacro, consejo, referencia colapsada.

**Qué copiar del TEA, en orden**

- El **cierre evaluativo por módulo**: un simulacro de entrevista técnica que mezcle NOTAM, METAR y lo que se vaya abriendo.
- El **bloque de referencia colapsable**: "qué evalúan Avianca, LATAM y Copa, y en qué orden", sin competir con la navegación.
- **Nombrar cada parte por su lugar en el proceso real** ("Prueba técnica", "Entrevista HR", "Assessment"), igual que el TEA nombra sus partes.

**En qué el TEA también falla** (para no idealizarlo)

- Tampoco alimenta la racha ni el heatmap: cero llamadas a `registrarActividadDeEstudio`.
- Tampoco lee Supabase en su hub: `Icao.tsx` no importa el cliente, así que no muestra tu avance.
- Comparte la deuda: `card-apple`, `rounded-2xl`, color por sección, `Sparkles` en la línea 135, contenedor `1240px`.
- El logro `icao_climb` depende de un nivel **autoevaluado**, no de desempeño medido.

### Contra el módulo PCA (`/app/pca`)

`Pca.tsx` es el patrón de calidad de la aplicación y la distancia es medible:

| | Examen PCA | Ingreso a aerolínea |
|---|---|---|
| Contenedor | `1280px` (sistema) | `1180px`, y 1480/1200/1100 adentro |
| Botones | `appButtonClass()` + `appButtonStyle()` | tres botones a mano |
| Superficies | `.surface`, `rounded-xl` | `border bg-card` + `card-apple`, `rounded-2xl` |
| Datos del piloto | `usePcaStats()` + `useVaultSubjects()` | ninguno |
| Estados | carga, error con reintento, vacío | ninguno (no hay nada que cargar) |
| Continuidad | "Continuar donde quedaste" con la materia real | no existe |
| Indicadores | 4 (cobertura, dominio, simulacros, racha) | ninguno |
| Componentes | `StatTile`, `ModuleCard`, `ExamCountdown`, `SubjectTable` | dos funciones locales |
| Color | solo semántico (`warn` / `success`) | uno por tema, decorativo |
| Medida de lectura | `max-w-[52ch]` | sin limitar |

Lo más importante de esa tabla no es el estilo: es la columna de datos. **`Pca.tsx` sabe quién eres, dónde quedaste y cuánto te falta. `AirlinePrep.tsx` no sabe nada.** Esa es la diferencia entre un módulo y un índice.

Y hay una decisión de producto de `Pca.tsx` que este módulo debería copiar tal cual: el estado vacío no miente ni deprime. En vez de indicadores en cero muestra "Tus indicadores aparecen cuando termines tu primer simulacro" y, al lado, cuántas preguntas hay disponibles. Convierte el vacío en una invitación con una cifra real detrás.

### ¿Se perciben los tres como la misma plataforma?

Parcialmente. Comparten `AppLayout`, tipografía, chips y paleta, así que a primera vista sí. Pero se rompe en tres puntos concretos: el ancho del contenedor cambia entre módulos y dentro del mismo módulo (I2), solo uno de los tres carece de hero fotográfico (I3), y sobre todo **la profundidad es incomparable**: PCA sabe quién eres, TEA está completo pero es estático, y aerolínea ni sabe quién eres ni está completo.

---

## 4. Nivel aerolínea: ¿prepara para una entrevista técnica?

**No.** Y la distancia no es de matices.

NOTAM y METAR son dos bloques de una prueba técnica que en Avianca, LATAM o Copa cubre del orden de diez. Lo que hay está bien enseñado, pero es una fracción del temario.

**Falta, todo:**

- **Performance y limitaciones**: distancias declaradas (TORA, TODA, ASDA, LDA), V1/VR/V2, peso y balance, contaminación de pista, performance en despegue y aterrizaje, planificación de combustible y alternos.
- **Sistemas de turbina**: ciclo termodinámico, tipos de motor, FADEC, neumático, hidráulico, eléctrico, presurización, protección de hielo, combustible, tren y frenos.
- **Meteorología avanzada**: cizalladura y microrráfagas, engelamiento, tormentas y CB, turbulencia, corriente en chorro, masas de aire y frentes, altimetría y QNH/QFE/temperatura, TAF y su interpretación operacional.
- **Procedimientos IFR y cartas**: SID, STAR, aproximaciones de precisión y no precisión, mínimos, alternos, PBN y RNP, holding, cartas Jeppesen.
- **Regulación**: RAC de Colombia, Anexos OACI relevantes, tiempos de vuelo y servicio, MEL y CDL, ETOPS, RVSM.
- **CRM y factores humanos**: TEM, toma de decisiones, gestión de la carga de trabajo, comunicación en cabina, fatiga, aserción.
- **Entrevista HR conductual**: método STAR, preguntas de motivación, manejo de conflicto, historial laboral, preguntas sobre errores propios.
- **Psicotécnicos**: los declara el módulo y no existe uno solo (`PsychTests.tsx:25-27`).
- **La entrevista en inglés**: el TEA prepara para el examen ICAO, no para una entrevista de selección en inglés, que es otra cosa.

**Por aerolínea, hoy:**

| Aerolínea | ¿Aprobaría con este módulo? | Falta principal |
|---|---|---|
| Avianca | No | Performance, sistemas, RAC, HR conductual, psicotécnicos |
| LATAM | No | Todo lo anterior más assessment tipo cut-e |
| Copa | No | Todo lo anterior más énfasis fuerte en inglés operacional |
| Wingo | No | Igual que Copa, con proceso más corto |
| Emirates / Qatar | No, y ni cerca | Assessment completo, inglés de entrevista, group exercises, sim evaluation |
| American / Delta | No, y ni cerca | HR conductual muy estructurado, TMAAT, sim evaluation, requisitos de horas |

Dicho con justicia: **como curso de NOTAM sí sirve, y sirve bien.** El problema es el nombre del módulo, no la calidad de lo que contiene.

---

## 5. Comparación con las aplicaciones líderes

| | Qué hacen ellos | Qué hace el módulo hoy |
|---|---|---|
| **Duolingo** | Lección corta con pregunta cada 20 segundos, racha visible, repaso automático de lo fallado | Lección de lectura corrida, racha que ni se entera, sin repaso |
| **Brilliant** | El concepto se descubre resolviendo, no leyendo | Se lee la explicación y la práctica está en otra pantalla |
| **Khan Academy** | Dominio por objetivo, no puedes avanzar sin demostrarlo | Marca "leído" por visitar la sección |
| **Coursera** | Ruta con prerrequisitos y certificado al cierre | Ocho tarjetas sin orden ni cierre |
| **Sporty's / King Schools** | Vídeo + banco alineado al examen real, con seguimiento por tema | Texto + banco solo en NOTAM |
| **Pilot Institute** | Lección corta con quiz al final de cada una, siempre | Sin quiz por sección |
| **Aviation Exam / BGS** | Banco enorme con estadística por tema y modo examen real | 20 preguntas en un solo tema |

El patrón que comparten los siete y que aquí falta es el mismo: **la unidad de aprendizaje termina en una comprobación**. Aquí la unidad termina en "seguir leyendo".

Y hay una segunda cosa que hacen todos: la sensación de avance es continua y visible. Aviatory tiene la maquinaria construida (racha, heatmap, logros) y este módulo no está enchufado a ella.

---

## 6. Plan de mejoras priorizado

### Alto impacto / Bajo esfuerzo (empezar por aquí)

**Q1. Enchufar el módulo a la actividad de estudio**
*Descripción*: llamar `registrarActividadDeEstudio()` al terminar una sección de lección, un bloque de práctica y una sesión de decodificador, en NOTAM y en METAR. Extender después a las cinco pantallas de ICAO.
*Motivo*: hoy tres horas de estudio marcan cero (C2).
*Beneficio*: la racha y el heatmap empiezan a reflejar la realidad. Arregla la percepción de progreso en toda la app, no solo aquí.
*Prioridad*: máxima. *Complejidad*: baja, la función ya existe y está probada.

**Q2. Conectar el progreso de METAR a la base de datos**
*Descripción*: crear `src/lib/metarProgress.ts` calcado de `notamProgress.ts` y llamar `metar_mark_progress`. Actualizar el comentario obsoleto de `Metar.tsx:17-18`.
*Motivo*: la tabla y la RPC ya existen y nadie las llama (C4).
*Beneficio*: el progreso deja de perderse al cambiar de dispositivo y los dos temas se comportan igual.
*Prioridad*: máxima. *Complejidad*: baja, hay un archivo modelo de 139 líneas.

**Q3. Quitar la contradicción de la portada**
*Descripción*: eliminar el tema "Requisitos por aerolínea" de la lista de "Pronto" y presentar `/app/match` como parte disponible del módulo.
*Motivo*: la pantalla anuncia como futuro algo que ya funciona (C5).
*Beneficio*: un tema menos en "Pronto" y una herramienta real ganada. El módulo pasa de 2 a 3 partes disponibles sin escribir contenido.
*Prioridad*: alta. *Complejidad*: muy baja.

**Q4. Descongelar los logros y añadir los del módulo**
*Descripción*: dos partes en la misma migración. Primero, reapuntar `check_and_unlock_achievements` de `quiz_attempts` a `vault_sessions`, para que `first_quiz`, `first_100` y `subject_master` vuelvan a ser alcanzables, y corregir los contadores de `Dashboard.tsx:309` y `Profile.tsx:130` que leen la tabla congelada. Segundo, insertar los logros del módulo: lección de NOTAM completa, 30 ejercicios resueltos, evaluación aprobada, lección de METAR completa y uno de tier alto por el tema NOTAM entero.
*Motivo*: hoy tres de diez logros no se pueden desbloquear (C6) y el único tema completo del módulo no da ninguna recompensa (C3).
*Beneficio*: el sistema de recompensas vuelve a funcionar para todos los módulos, no solo para este. La maquinaria de toasts (`useAchievementToasts`) ya está construida y probada.
*Prioridad*: máxima. La primera parte es un arreglo de integridad, no una mejora.
*Complejidad*: baja-media. Es una migración con el patrón `_try_unlock` ya establecido, más dos lecturas de conteo. Ojo: `Dashboard.tsx` y `Profile.tsx` son archivos de coordinación con Nico.

**Q5. Unificar el ancho del contenedor a 1280px en las nueve pantallas del módulo**
*Motivo*: hoy son cuatro anchos distintos en cuatro clics (I2).
*Beneficio*: el contenido deja de saltar. Es la mejora de percepción más barata del informe.
*Prioridad*: alta. *Complejidad*: muy baja, es buscar y reemplazar con revisión visual.

**Q6. Pagar la deuda de sistema del hub**
*Descripción*: `.surface` en vez de `border bg-card`, `appButtonClass()` en los tres botones, `rounded-xl`, y quitar el color por tema.
*Motivo*: es la página más alejada del sistema (I4, I5).
*Beneficio*: el módulo deja de verse de otra generación que PCA.
*Prioridad*: alta. *Complejidad*: baja, con `Pca.tsx` como modelo en el mismo repositorio.

---

### Alto impacto / Alto esfuerzo (la agenda real del trimestre)

**A1. Preguntas dentro de la lección**
*Descripción*: añadir un tipo de bloque `check` a `LessonBlock` (pregunta, opciones, explicación) e intercalar dos o tres por sección, en NOTAM y METAR.
*Motivo*: hoy se lee de corrido sin recuperar nada (I7).
*Beneficio*: es el cambio pedagógico de mayor retorno del informe. Convierte lectura en aprendizaje y da señal por sección.
*Prioridad*: máxima entre las de esfuerzo alto. *Complejidad*: media, el sistema de bloques es tipado y extensible; el trabajo es escribir las preguntas.

**A2. Cerrar el tema METAR**
*Descripción*: práctica con informes reales y respuesta modelo, y evaluación de 20 preguntas, replicando la plantilla de NOTAM.
*Motivo*: el tema no tiene cierre evaluativo (I6).
*Beneficio*: el segundo tema pasa de medio a completo y el módulo tiene dos temas terminados de verdad.
*Prioridad*: alta. *Complejidad*: media-alta, es sobre todo producción de contenido.

**A3. Simulacro de entrevista técnica**
*Descripción*: el equivalente del simulacro TEA: preguntas mezcladas de todos los temas abiertos, cronometrado, con informe final por tema.
*Motivo*: el módulo no tiene cierre (comparación con TEA).
*Beneficio*: da una razón para volver cuando ya leíste todo, y es lo que el piloto realmente quiere comprar.
*Prioridad*: alta. *Complejidad*: media, `IcaoMockExam` y `NotamExam` son modelos.

**A4. Repetición espaciada transversal**
*Descripción*: cola de repaso con lo fallado en práctica y evaluaciones, con intervalos crecientes, alimentando el módulo y el banco PCA.
*Motivo*: no existe nada parecido en la app (I8).
*Beneficio*: retención real en una preparación de meses, y una razón diaria para abrir la app.
*Prioridad*: media-alta, pero es decisión de plataforma, no del módulo. *Complejidad*: alta.

**A5. Abrir el tercer tema por valor de entrevista**
*Descripción*: siguiente tema recomendado, **Performance y planificación** (distancias declaradas, despegue y aterrizaje, peso y balance).
*Motivo*: es lo que más cae en prueba técnica después de meteorología, y conecta con la materia más débil del banco PCA (Performance 14 preguntas, W&B 12).
*Beneficio*: cubre dos huecos con un solo esfuerzo de contenido.
*Prioridad*: media-alta. *Complejidad*: alta.

---

### Bajo impacto / Bajo esfuerzo (de paso)

- **B1.** Mostrar minutos estimados por tema en el hub: el dato ya está en `LessonScreen.minutes` (M3).
- **B2.** Unificar el nombre del módulo a "Ingreso a aerolínea" en todos los botones de volver (m2).
- **B3.** Quitar `Sparkles` de `Notam.tsx:248` y del resto del módulo (M1).
- **B4.** Corregir el comentario obsoleto de `Metar.tsx:17-18` (m1).
- **B5.** Usar los símbolos de `aero.tsx` donde signifiquen algo, en lugar de `Briefcase`/`Cog`/`Brain` (M2).
- **B6.** Unificar el control de volver entre `Notam.tsx` y `Metar.tsx` (m3).

### Bajo impacto / Alto esfuerzo (no ahora)

- **N1.** Hero fotográfico del módulo: hace falta foto nueva y no arregla ningún problema de fondo. Va cuando se toque el hub por Q6.
- **N2.** Rankings y tablas de clasificación: con 4 usuarios, una tabla de posiciones es contraproducente.
- **N3.** Extraer un `CourseCard` compartido: es la tarea 1 de Nico y no debe duplicarse desde aquí.

---

## 7. Gamificación: qué implementar y qué no

**Sí, y pronto:**

1. **Logros del módulo** (Q4): el cierre que hoy falta por completo.
2. **La racha, de verdad** (Q1): la racha ya existe y es lo más motivador que tiene la app. Solo hay que dejar que este módulo la alimente.
3. **Progreso por tema en el hub**: `Notam.tsx` ya calcula un porcentaje general excelente. Súbelo al hub padre.
4. **Insignia de tema completo**: distinta del logro genérico, visible en el perfil. El piloto que termina NOTAM debería poder mostrarlo.

**Con reservas:**

5. **Reto diario**: funciona, pero solo cuando haya suficiente contenido para no repetir. Hoy se agotaría en una semana.
6. **Niveles**: la lección ya tiene el campo `level` (`basico`, etc.) sin explotar. Es una base natural, pero primero hay que tener temas.

**No, no todavía:**

7. **Rankings**: con 4 usuarios, un ranking expone que casi no hay nadie. Es un riesgo, no un incentivo.
8. **Recompensas por moneda o puntos**: añade una economía que no hace falta cuando el problema es que falta contenido.

---

## 8. Calificación final

| Categoría | Nota | Justificación en una línea |
|---|---|---|
| Contenido técnico | **5** | Lo que existe es excelente y está citado a fuente; cubre 2 de ~10 bloques del temario real |
| Diseño instruccional | **5** | Buena secuencia y práctica con respuesta modelo; sin recuperación en la lección y sin repaso espaciado |
| Experiencia de usuario | **4** | Portada contradictoria, cuatro anchos en cuatro clics, 75% de la pantalla en "Pronto" |
| Diseño visual | **4** | La página más alejada del sistema: color por tema, superficies prohibidas, botones a mano, sin hero |
| Engagement | **2** | No alimenta la racha ni el heatmap, cero logros, sin cierre ni razón para volver |
| Preparación para entrevistas | **3** | No aprueba una técnica en ninguna de las siete aerolíneas evaluadas |
| Gamificación | **1** | Literalmente ninguna dentro del módulo |
| Coherencia con TEA | **5** | Comparten estilo; el TEA está completo, tiene simulacro y explica cómo se califica |
| Coherencia con PCA | **4** | PCA sabe quién eres y cumple el sistema; este módulo ni lo uno ni lo otro |
| Calidad general | **4** | Un tema sobresaliente dentro de un módulo incompleto y desconectado |

### **Nota global: 3,7 / 10**

**Justificación.** La media aritmética es 3,7 y no la voy a maquillar, pero hay que leerla bien.

Primero, **el tema NOTAM aislado sacaría del orden de 7,5**. Está bien investigado, bien citado, bien secuenciado y su hub es la mejor página de la aplicación.

Segundo, y más importante: **la nota baja no la produce que falte contenido.** Que hoy estén NOTAM y METAR y el resto venga por tandas es una decisión de producto tomada, y este informe la respeta. Si el módulo se evaluara solo por cobertura, la nota sería simplemente "incompleto" y no habría mucho que hacer salvo seguir cargando.

Lo que hunde la nota es otra cosa, y son tres hechos medibles sobre lo que **ya está construido**:

1. Lo que el piloto estudia aquí no toca la racha ni el heatmap (C2).
2. Terminar el único tema completo del módulo no desbloquea ni un logro (C3), y tres de los diez logros que existen son imposibles de desbloquear para cualquier usuario nuevo porque miran una tabla que ya nadie escribe (C6).
3. El progreso de METAR se pierde al cambiar de dispositivo teniendo la tabla y la RPC ya creadas y aseguradas (C4).

Las tres tienen algo en común, y es la mejor noticia del informe: **ninguna es un problema de diseño, de concepto ni de contenido.** Son cables sueltos entre piezas que ya están construidas y funcionando por separado. Q1 a Q6 son seis tareas de complejidad baja que suben esta nota más que meses de material nuevo, y varias de ellas arreglan la app entera, no solo este módulo.

---

## 9. La pregunta

> Si fueras el Director Académico de Aviatory, ¿aprobarías este módulo para su lanzamiento?

## **Sí, pero únicamente después de implementar las mejoras críticas.**

Las cinco críticas (C2 a C6) se resuelven con los seis quick wins Q1 a Q6, y **ninguno exige escribir una línea de contenido nuevo.** Con eso el módulo deja de tener errores de integridad: el estudio cuenta, el progreso no se pierde, los logros vuelven a otorgarse y terminar un tema significa algo.

Dicho de otro modo: lo que hoy impide aprobarlo no es que falten seis temas. Es que los dos que ya están cargados no están enchufados a la app. Eso se arregla esta semana.

Y una recomendación que no es condición, pero que rinde mucho por lo poco que cuesta (H1): **el bloque de temas pendientes contado como ruta en vez de como huecos.** Un piloto que ve "vas por el tema 2 de 8, sigue Performance" está viendo un temario que avanza, que es exactamente lo que quiere comprar. Hoy ve seis tarjetas grises iguales, sin orden y sin próximo. Es la misma información, y en un caso juega a favor y en el otro en contra.
