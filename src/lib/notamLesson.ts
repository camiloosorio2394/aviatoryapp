/**
 * Contenido estructurado de la lección "Qué es un NOTAM y cómo leerlo".
 *
 * Fuente: src/data/notam/leccion_notam.md, reordenado al temario del curso.
 * Verificado contra el Doc 8400 de la OACI (PANS-ABC, 6ª ed., 2004), el Anexo 15
 * y la bibliografía de curso citada en LESSON_SOURCES.
 *
 * Orden del temario (cada punto es una sección de este documento):
 *   1. Qué es un NOTAM                    → 1
 *   2. Tipos NOTAMN / NOTAMR / NOTAMC     → 3
 *   3. Estructura: serie, número/año      → 4
 *   4. La línea Q                         → 5
 *   5. Ítems A) a G), uno por uno         → 7
 *   6. Abreviaturas OACI                  → 9
 *   7. Lectura paso a paso de un NOTAM    → 10 (y Colombia en 11)
 *   8. SNOWTAM y ASHTAM                   → 12
 *   9. Ejercicios de práctica             → cierre del documento (NextSteps)
 *  10. Examen final                       → cierre del documento (NextSteps)
 *
 * Las tablas completas de códigos (168 asuntos + 78 estados) y el glosario de 48
 * abreviaturas NO se duplican aquí: viven en src/lib/notam.ts y se muestran en el
 * Decodificador. La sección 9 trae solo el subconjunto mínimo para leer la casilla E).
 */

import type { NotamLevel } from "@/lib/notam"

/** Una pieza del desglose visual: el trozo de código y qué significa. */
export interface BreakdownPart {
  /** El trozo tal cual aparece en el mensaje: `SKBO`, `18008KT`, `QRALW`. */
  token: string
  /** Qué es, en dos o tres palabras: "estación", "viento", "código NOTAM". */
  label: string
  /** La lectura completa, si hace falta: "del sur (180°) a 8 nudos". */
  detail?: string
}

export type LessonBlock =
  | { kind: "p"; text: string }
  | { kind: "quote"; text: string; source?: string }
  | { kind: "list"; items: string[]; ordered?: boolean }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "code"; text: string }
  | { kind: "callout"; tone: "info" | "warn" | "tip"; title?: string; text: string }
  | { kind: "kv"; items: { k: string; v: string }[] }
  /**
   * Desglose visual de un código: la línea entera arriba, cada trozo con su
   * color, y la leyenda numerada debajo. Un METAR o un NOTAM explicado en
   * párrafo no se entiende; desarmado, sí.
   */
  | { kind: "breakdown"; caption?: string; parts: BreakdownPart[] }
  /**
   * Un NOTAM colombiano real, dentro de la lección.
   *
   * Solo lleva el `id` de la ficha en `notams_nacionales.json`: de ahí salen la
   * imagen, la transcripción (que es el `alt` de verdad, no uno decorativo), el
   * código, el aeródromo y el aviso de vigencia obligatorio. Si la ficha cambia
   * de nombre de archivo o de formato, la lección se entera sola.
   *
   * Ponlo solo donde la imagen enseñe lo que dice el párrafo de al lado.
   * Colocarlas de adorno entre párrafos es el problema que esto viene a
   * arreglar, no la solución.
   */
  | { kind: "notam"; id: string; caption?: string }
  /** Ejemplo resuelto, en caja aparte: el enunciado, los pasos y la lectura final. */
  | {
      kind: "example"
      title: string
      /** El mensaje a interpretar, tal cual. */
      code: string
      steps: string[]
      /** La lectura en una frase, que es a lo que hay que llegar. */
      answer: string
    }
  /** Resumen al cierre de una sección: lo que hay que llevarse. */
  | { kind: "summary"; title?: string; items: string[] }

export interface LessonScreen {
  /** Número de sección, correlativo desde 1. Es el índice que se guarda como leído. */
  n: number
  /** Título de la sección, sin el prefijo "Pantalla N" del documento fuente */
  title: string
  /** Resumen de 3 a 6 palabras */
  kicker: string
  /** Lectura estimada en minutos */
  minutes: number
  blocks: LessonBlock[]
  level: NotamLevel
}

export const LESSON_SCREENS: LessonScreen[] = [
  // ── 1 ──────────────────────────────────────────────────────────────────────
  {
    n: 1,
    title: "¿Qué es un NOTAM?",
    kicker: "Definición y por qué importa",
    minutes: 2,
    level: "basico",
    blocks: [
      { kind: "p", text: "**Definición oficial** (Doc 8400, pág. 3-3):" },
      {
        kind: "quote",
        text: "Aviso distribuido por medios de telecomunicaciones que contiene información relativa al establecimiento, condición o modificación de cualquier instalación aeronáutica, servicio, procedimiento o peligro, cuyo conocimiento oportuno es esencial para el personal encargado de las operaciones de vuelo.",
        source: "OACI, Doc 8400 (PANS-ABC), 6ª ed., pág. 3-3",
      },
      {
        kind: "p",
        text: "**En la práctica:** pistas cerradas, radioayudas fuera de servicio, obras en el área de movimiento, drones (UAS), fauna en pista, obstáculos nuevos, cambios de horario o de procedimientos. Si algo cambia y afecta tu vuelo antes de que lo publique el AIP, se difunde por NOTAM.",
      },
      {
        kind: "p",
        text: "**Por qué te lo preguntan en entrevistas y en el PCA:** leer NOTAM es parte del planeamiento de vuelo. Un piloto que no decodifica la línea Q depende de que otro le explique lo que va a encontrar en ruta o en destino.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Cómo aprovechar este documento",
        text: "Está pensado para leerse de corrido, en orden: cada sección usa lo de la anterior. Al terminar tienes el modo práctica con NOTAM colombianos reales y una evaluación de 20 preguntas. El índice te devuelve a cualquier punto.",
      },
    ],
  },

  // ── 2 ──────────────────────────────────────────────────────────────────────
  {
    n: 2,
    title: "De dónde sale y dónde vive",
    kicker: "Normas y fuentes oficiales",
    minutes: 2,
    level: "basico",
    blocks: [
      {
        kind: "list",
        items: [
          "El contenido y el formato de los NOTAM los fija el **Anexo 15 de la OACI** (§5.2.1, §5.3.2 y Apéndice 6). Su transmisión por el servicio fijo aeronáutico (AFS) la fija el **Anexo 10, Vol. II** (Doc 8400, pág. 7-1, §2).",
          "Los criterios de selección y las tablas de calificativos están en el **Doc 8126**, Manual para los servicios de información aeronáutica (Doc 8400, pág. 7-3, nota).",
          "El **código NOTAM** de cinco letras está normalizado en el **Doc 8400, sección 7**. Lo tienes completo en el Decodificador de esta sección.",
          "En Colombia, la **Aeronáutica Civil** publica los NOTAM vigentes. Su Dirección de Informática (DRT) emite el **resumen mensual de NOTAM vigentes** por series, que trabajas más adelante en este documento.",
        ],
      },
      {
        kind: "p",
        text: "Además de la serie ordinaria existen dos series especiales, **SNOWTAM** y **ASHTAM**, con formato propio. Las ves al final, cuando ya sepas leer un NOTAM completo.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Jerarquía de las fuentes",
        text: "El Doc 8400 y el Anexo 15 son la norma. Las guías de curso que citamos son material didáctico y se marcan como tal. El Doc 8400 que usamos es la 6ª edición (2004): existen ediciones posteriores, así que confirma siempre contra la edición vigente.",
      },
    ],
  },

  // ── 3 ──────────────────────────────────────────────────────────────────────
  {
    n: 3,
    title: "Los tres tipos: NOTAMN, NOTAMR y NOTAMC",
    kicker: "Nuevo, reemplaza y cancela",
    minutes: 3,
    level: "basico",
    blocks: [
      {
        kind: "p",
        text: "Todo NOTAM es de uno de tres tipos, y el tipo cambia lo que tienes que hacer con él. Es lo primero que miras después del número.",
      },
      {
        kind: "table",
        head: ["Tipo", "Qué es", "Qué implica para ti"],
        rows: [
          [
            "**NOTAMN**",
            "Nuevo (new). Información que no estaba publicada.",
            "Léelo completo: no reemplaza nada.",
          ],
          [
            "**NOTAMR**",
            "Reemplaza (replacing) a un NOTAM vigente e indica cuál.",
            "El NOTAM anterior deja de valer. Lee solo el nuevo.",
          ],
          [
            "**NOTAMC**",
            "Cancela (cancellation) un NOTAM vigente.",
            "La condición terminó. No lleva casilla C).",
          ],
        ],
      },
      { kind: "p", text: "**Cómo se ven en el encabezado:**" },
      {
        kind: "code",
        text: "A0682/06 NOTAMN\nA0143/22 NOTAMR A2385/21\nC0912/26 NOTAMC C0756/26",
      },
      {
        kind: "list",
        items: [
          "En el **NOTAMR**, el número que va después del tipo es el NOTAM al que reemplaza. En el ejemplo, `A0143/22` deja sin efecto a `A2385/21`.",
          "En el **NOTAMC**, el número que va después es el NOTAM que cancela.",
          "En NOTAMR y NOTAMC, la casilla **B)** ya no es el inicio de la condición: es la fecha y hora en que se creó el mensaje (curso, pág. 27).",
          "En el resumen mensual de la Aerocivil el reemplazo aparece escrito como `RPLC NOTAM C 0756/26`, que se comporta igual que un NOTAMR.",
        ],
      },
      {
        kind: "p",
        text: "**Así se ve un reemplazo de verdad.** Este NOTAM sale del resumen mensual de la Aerocivil y trae `RPLC NOTAM C 0756/26` al final: es la forma colombiana de decir NOTAMR.",
      },
      {
        kind: "notam",
        id: "N3",
        caption:
          "El PAPI de la pista 19 de Rionegro está inutilizable. La última línea dice que este mensaje reemplaza al `C 0756/26`: ese ya no vale, aunque siga en tus notas.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error común: leer el NOTAM que ya fue reemplazado",
        text: "Si ves un NOTAMR o un `RPLC`, busca el número que reemplaza y descártalo. La información válida es la del mensaje nuevo, no la unión de los dos.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Sobre el tipo NOTAME",
        text: "La guía de interpretación de curso menciona además un tipo NOTAME (event) para eventos. Ese tipo no figura en el esquema OACI estándar N/R/C, así que trátalo como particularidad de esa fuente y confírmalo contra el Anexo 15.",
      },
    ],
  },

  // ── 4 ──────────────────────────────────────────────────────────────────────
  {
    n: 4,
    title: "Estructura: serie, número, año y casillas",
    kicker: "El esqueleto del mensaje",
    minutes: 3,
    level: "basico",
    blocks: [
      {
        kind: "p",
        text: "**El encabezado** (guía de interpretación, pág. 2; curso, pág. 21): cada NOTAM se identifica con **serie + número/año + tipo**.",
      },
      {
        kind: "breakdown",
        caption:
          "Cuatro datos en once caracteres. Con el encabezado ya sabes de qué serie es, si es nuevo o reemplaza a otro, y cómo citarlo.",
        parts: [
          {
            token: "A",
            label: "serie",
            detail: "Una letra que agrupa los NOTAM por tipo de información y por alcance.",
          },
          { token: "0682", label: "número", detail: "Correlativo dentro de la serie." },
          {
            token: "/06",
            label: "año",
            detail: "El número se reinicia cada año, por eso siempre va con el año.",
          },
          { token: "NOTAMN", label: "tipo", detail: "Nuevo, reemplaza o cancela." },
        ],
      },
      {
        kind: "list",
        items: [
          "Cada Estado define qué publica en cada serie. Colombia usa, entre otras, la serie **A** para información internacional y las series **C** y **D** para información nacional, que son las que ves en el resumen mensual de la Aerocivil.",
          "Cuando cites un NOTAM, cítalo completo: `C2222/26`, no `2222`. Sin el año, el número se repite.",
        ],
      },
      {
        kind: "p",
        text: "**Después del encabezado vienen las casillas.** Todas van identificadas por una letra y siempre en este orden (Doc 8400, pág. 7-3; curso, págs. 21 a 31):",
      },
      {
        kind: "table",
        head: ["Casilla", "Contenido", "Obligatoria"],
        rows: [
          [
            "**Q)**",
            "Calificativos: FIR, código NOTAM, tránsito, propósito, alcance, límites, coordenadas y radio",
            "Sí, salvo en NOTAMC",
          ],
          ["**A)**", "Indicador OACI del aeródromo o FIR afectado", "Sí"],
          ["**B)**", "Inicio de validez, 10 dígitos en UTC", "Sí"],
          ["**C)**", "Fin de validez", "Sí, excepto en NOTAMC"],
          ["**D)**", "Horario de actividad dentro del período B) a C)", "Solo si la condición no es continua"],
          ["**E)**", "Texto en lenguaje claro con abreviaturas OACI", "Sí"],
          ["**F) G)**", "Límite vertical inferior y superior", "Solo en restricciones y avisos de espacio aéreo"],
        ],
      },
      {
        kind: "p",
        text: "**Un NOTAM entero, con todo puesto.** Este es el ejemplo de la guía de interpretación (pág. 14), desarmado casilla por casilla:",
      },
      {
        kind: "breakdown",
        caption:
          "Léelo así siempre: encabezado, línea Q, dónde, desde cuándo, hasta cuándo y qué pasa. El resto de este documento desarma cada una de esas piezas.",
        parts: [
          { token: "A0682/06 NOTAMN", label: "encabezado", detail: "Serie A, número 0682 de 2006, nuevo." },
          {
            token: "Q)SCEZ/QMXLC/IV/M/A/000/999/3323S07047W005",
            label: "línea Q",
            detail: "Los calificativos: FIR, código de cinco letras, tránsito, objetivo, alcance, límites y área.",
          },
          { token: "A)SCEL", label: "dónde", detail: "Santiago, Arturo Merino Benítez." },
          { token: "B)0606091958", label: "desde", detail: "9 de junio de 2006 a las 19:58 UTC." },
          { token: "C)0606242359", label: "hasta", detail: "24 de junio de 2006 a las 23:59 UTC." },
          {
            token: "E)TWY TANGO CLSD BTN TWY KILO AND ZULU PRKG ACFT",
            label: "qué pasa",
            detail: "Calle de rodaje TANGO cerrada entre KILO y ZULU por estacionamiento de aeronaves.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Lo que sigue",
        text: "Las tres secciones siguientes desarman esas casillas: primero la línea Q entera, después el código de cinco letras que va dentro de ella, y después los ítems A) a G) uno por uno.",
      },
      {
        kind: "summary",
        items: [
          "El encabezado es **serie + número/año + tipo**, y se cita completo: `C2222/26`, nunca `2222`.",
          "Después del encabezado van las casillas, siempre en el orden `Q) A) B) C) D) E) F) G)`.",
          "`Q)`, `A)`, `B)`, `C)` y `E)` van casi siempre. `D)` solo si la condición no es continua, y `F) G)` solo si hay espacio aéreo de por medio.",
        ],
      },
    ],
  },

  // ── 5 ──────────────────────────────────────────────────────────────────────
  {
    n: 5,
    title: "La línea Q, pieza por pieza",
    kicker: "Los siete componentes del calificativo",
    minutes: 4,
    level: "intermedio",
    blocks: [
      { kind: "p", text: "Ejemplo del curso (pág. 22), desarmado pieza por pieza:" },
      {
        kind: "breakdown",
        caption:
          "Siete piezas separadas por barras y siempre en este orden. Si una falta, las demás conservan su posición.",
        parts: [
          {
            token: "SEFG",
            label: "FIR",
            detail: "Región de información de vuelo donde aplica.",
          },
          {
            token: "QRALW",
            label: "código NOTAM",
            detail: "Cinco letras: qué cosa y qué le pasa. Es la sección siguiente.",
          },
          {
            token: "IV",
            label: "tránsito",
            detail: "`I` es IFR, `V` es VFR, `IV` son ambos, `K` es checklist (curso, pág. 24).",
          },
          {
            token: "NBO",
            label: "objetivo",
            detail:
              "`N` atención inmediata de la tripulación, `B` entra al boletín previo al vuelo (PIB), `O` concierne a operaciones de vuelo, `M` misceláneo (no va a briefing), `K` checklist.",
          },
          {
            token: "AW",
            label: "alcance",
            detail: "`A` aeródromo, `E` en ruta, `W` advertencia de navegación. Se combinan: `AE`, `AW`.",
          },
          {
            token: "000/001",
            label: "límites",
            detail: "Inferior y superior en niveles de vuelo. `000/999` es el valor por defecto: toda altura.",
          },
          {
            token: "0202S07956W001",
            label: "área",
            detail: "Centro del área afectada y radio en millas náuticas. Aquí, 1 NM.",
          },
        ],
      },
      {
        kind: "p",
        text: "El propio Doc 8400 decodifica estos calificativos en sus ejemplos (pág. 7-3): `IV/BO/AE` significa IFR y VFR, boletín previo al vuelo más significativo para IFR, y alcance de ayuda terminal y en ruta.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Filtra con el tránsito y el alcance",
        text: "Cuando revisas un paquete de 40 NOTAM, el tránsito y el alcance son tu primer filtro. Si vuelas IFR a un aeródromo, un NOTAM `V` de alcance `W` en otra FIR no te aplica. No lo saltes sin mirar, pero decide rápido.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "En el resumen colombiano no vas a ver la línea Q",
        text: "El resumen mensual de la Aerocivil publica los NOTAM en formato de tabla, sin la línea Q: trae el número, el aeródromo, las fechas y el texto. La línea Q la ves en el formato completo, que es el que llega por el briefing AIS y el que usan los ejemplos internacionales de este documento. No la busques en los avisos colombianos que aparecen más adelante: no está.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Pendiente normativo",
        text: "Las tablas normativas completas de calificativos están en el Doc 8126, que todavía no cargamos. Lo que ves aquí viene del Doc 8400 y de la bibliografía de curso.",
      },
    ],
  },

  // ── 6 ──────────────────────────────────────────────────────────────────────
  {
    n: 6,
    title: "El código NOTAM de cinco letras",
    kicker: "Asunto y estado en cinco letras",
    minutes: 4,
    level: "intermedio",
    blocks: [
      {
        kind: "p",
        text: "Reglas (Doc 8400, §3, pág. 7-1): son cinco letras y siempre empieza por **Q**. La **2ª y 3ª letras indican el asunto**, la **4ª y 5ª el estado**.",
      },
      {
        kind: "breakdown",
        caption:
          "Con esas dos parejas armas la frase: sujeto (`MR`, la pista) y qué le pasa (`LC`, cerrada). Todos los códigos se leen igual.",
        parts: [
          { token: "Q", label: "fija", detail: "Todo código NOTAM empieza por Q." },
          {
            token: "MR",
            label: "asunto",
            detail: "2ª y 3ª letras: `M` es área de movimiento y `MR` es la pista.",
          },
          {
            token: "LC",
            label: "estado",
            detail: "4ª y 5ª letras: `L` son limitaciones y `LC` es cerrado.",
          },
        ],
      },
      { kind: "p", text: "**Asuntos** (2ª y 3ª letras), agrupados por sección:" },
      {
        kind: "kv",
        items: [
          { k: "AGA", v: "`L` iluminación · `M` área de movimiento · `F` instalaciones y servicios" },
          { k: "COM", v: "`C` comunicaciones y radar · `I` ILS/MLS · `N` navegación · `G` GNSS" },
          { k: "RAC", v: "`A` espacio aéreo · `S` servicios ATS y VOLMET · `P` procedimientos" },
          { k: "Avisos para la navegación", v: "`R` restricciones · `W` avisos (warnings)" },
          { k: "Otras informaciones", v: "`O`" },
        ],
      },
      {
        kind: "p",
        text: "**Estados** (4ª y 5ª letras): `A` disponibilidad, `C` cambios, `H` condiciones de peligro, `L` limitaciones, `XX` otros.",
      },
      { kind: "p", text: "**Casos especiales** (§3.3 a §3.8):" },
      {
        kind: "list",
        items: [
          "Asunto o condición que no figura en las tablas: se usa `XX` y el texto va en lenguaje claro.",
          "`QKKKK` es la checklist de NOTAM válidos.",
          "`TT` en 4ª y 5ª letras marca un NOTAM iniciador de enmienda o suplemento AIP AIRAC.",
          "Cancelan un NOTAM: `AK` (operación normal reanudada), `AL` (opera con limitaciones ya publicadas), `AO` (operacional), `CC` (completado) y `XX`.",
        ],
      },
      {
        kind: "p",
        text: "**Los que más vas a ver** (tablas del Doc 8400, sección 7). Esta es la tabla que el Decodificador trae completa, recortada a lo que aparece en casi todo briefing:",
      },
      {
        kind: "table",
        head: ["Código", "Asunto", "Estado", "Qué significa"],
        rows: [
          ["`QMRLC`", "`MR` pista", "`LC` cerrada", "Pista cerrada"],
          ["`QMRLT`", "`MR` pista", "`LT` limitada", "Pista sujeta a limitaciones"],
          ["`QMXLC`", "`MX` calle de rodaje", "`LC` cerrada", "Calle de rodaje cerrada"],
          ["`QLPAS`", "`LP` PAPI", "`AS` inutilizable", "PAPI inoperativo"],
          ["`QNVAS`", "`NV` VOR", "`AS` inutilizable", "VOR fuera de servicio"],
          ["`QICAS`", "`IC` ILS", "`AS` inutilizable", "ILS fuera de servicio"],
          ["`QOBCE`", "`OB` obstáculo", "`CE` erigido", "Obstáculo nuevo montado"],
          ["`QRRCA`", "`RR` zona restringida", "`CA` activada", "Zona restringida activada"],
          ["`QWMLW`", "`WM` ejercicios de tiro", "`LW` se realizarán", "Habrá ejercicios de tiro"],
          ["`QPDAW`", "`PD` SID", "`AW` retirada", "SID retirada definitivamente"],
        ],
      },
      {
        kind: "p",
        text: "**Así se ve `QFALC` en la vida real.** Magangué, en el resumen de la Aerocivil:",
      },
      {
        kind: "notam",
        id: "N13",
        caption:
          "`AD CLSD` es aeródromo cerrado: asunto `FA` (aeródromo) y estado `LC` (cerrado). El resumen no imprime el código de cinco letras, pero el texto de la casilla E) tiene que ser coherente con él, y aquí lo es. Ojo al `1100-2300`: el cierre es de once de la mañana a once de la noche UTC, no todo el día.",
      },
      {
        kind: "p",
        text: "Y este es un `QOBCE`, obstáculo montado, uno de los pocos NOTAM que te dan coordenadas y altura del obstáculo:",
      },
      {
        kind: "notam",
        id: "N5",
        caption:
          "Asunto `OB` (obstáculo) y estado `CE` (erigido). El aviso da el tipo, las coordenadas, la elevación y la altura de cada silo, que es justo lo que necesitas para saber si te afecta en aproximación.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error común: cerrado no siempre es cerrado",
        text: "`LC` es cerrado del todo, pero `LI` es cerrado solo para IFR, `LV` solo para VFR y `LN` solo de noche. Las cuatro se parecen a simple vista y cambian por completo si puedes operar o no.",
      },
      {
        kind: "summary",
        items: [
          "Cinco letras: `Q` fija, dos de **asunto** y dos de **estado**.",
          "Léelo como una frase: sujeto y qué le pasa. `QNVAS` es \"el VOR está inutilizable\".",
          "Si el asunto o el estado no está en las tablas se usa `XX` y el texto va en lenguaje claro en la casilla E).",
          "El código Q y la casilla E) tienen que decir lo mismo. Si no coinciden, sospecha del mensaje.",
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Abre el Decodificador",
        text: "Las tablas completas (168 códigos de asunto y 78 de estado, con su fraseología) están en el Decodificador de esta sección. Ahí escribes un código como `QMRLC` y ves qué significa, o buscas por palabra.",
      },
    ],
  },

  // ── 7 ──────────────────────────────────────────────────────────────────────
  {
    n: 7,
    title: "Los ítems A) a G), uno por uno",
    kicker: "Dónde, cuándo, qué y entre qué niveles",
    minutes: 6,
    level: "intermedio",
    blocks: [
      {
        kind: "p",
        text: "La línea Q te dice de qué va el NOTAM. Los ítems te dicen **dónde**, **cuándo**, **qué** exactamente y **entre qué niveles**. Cada uno tiene sus trampas.",
      },

      { kind: "p", text: "**A) Dónde aplica**" },
      {
        kind: "list",
        items: [
          "Lleva el **indicador de lugar OACI de cuatro letras**: `SKBO` para Bogotá/El Dorado, `SKRG` para Rionegro, `SKCL` para Cali.",
          "Si el NOTAM es de ruta o de espacio aéreo, aquí va el **indicador de la FIR**: `SKED` es la FIR Bogotá.",
          "Puede haber **más de un indicador** cuando la condición afecta a varios aeródromos.",
          "Si el aeródromo no tiene indicador OACI asignado, se usa el genérico de la nación y el nombre va en la casilla E).",
        ],
      },
      { kind: "code", text: "A) SKBO\nA) SKED\nA) SKBO SKRG SKCL" },

      { kind: "p", text: "**B) Desde cuándo**" },
      {
        kind: "list",
        items: [
          "Grupo de **10 dígitos: AAMMDDHHMM**, siempre en **UTC**. `2606031100` es el 3 de junio de 2026 a las 11:00 UTC, o sea las 06:00 en Colombia.",
          "El inicio del día se escribe `0000`.",
          "`WIE` (with immediate effect) significa que entra en vigor de inmediato.",
          "**En NOTAMR y NOTAMC**, B) no es el inicio de la condición: es la fecha y hora en que se creó el mensaje (curso, pág. 27).",
        ],
      },

      { kind: "p", text: "**C) Hasta cuándo**" },
      {
        kind: "list",
        items: [
          "Mismo formato de 10 dígitos en UTC. El fin del día se escribe `2359`.",
          "`PERM` significa **permanente**: la condición no termina, y en algún momento pasará al AIP.",
          "`EST` marca que el fin es **estimado**. Un NOTAM con `EST` sigue vigente aunque pase esa fecha, hasta que lo reemplacen o lo cancelen.",
          "`UFN` (until further notice) es hasta nuevo aviso.",
          "**El NOTAMC no lleva casilla C)** (curso, pág. 28): cancela, no tiene fin de validez propio.",
        ],
      },
      { kind: "code", text: "B) 2606031100  C) 2608302359\nB) 2606031100  C) 2609150000 EST\nB) 2606031100  C) PERM" },
      {
        kind: "p",
        text: "**Los dos casos, en avisos reales.** Primero uno con **fechas firmes**: empieza y termina cuando dice, sin más.",
      },
      {
        kind: "notam",
        id: "N1",
        caption:
          "Del 28 de mayo al 25 de agosto, sin `EST` y sin horario diario. Puerto Bolívar opera limitado a aeronaves hasta categoría B durante todo ese período, de corrido.",
      },
      { kind: "p", text: "Y ahora uno con **`EST`**, que es donde se cuela el error:" },
      {
        kind: "notam",
        id: "N8",
        caption:
          "El faro de aeródromo de Riohacha está inutilizable, con fin **estimado** el 30 de agosto. Esa fecha es un cálculo de quien publicó el aviso, no un compromiso: si llega el 31 y no salió un NOTAM que lo reemplace o lo cancele, el faro sigue fuera de servicio.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error común: EST no es lo mismo que vencido",
        text: "Ver una fecha `EST` ya pasada no significa que el NOTAM caducó. Significa que quien lo publicó estimó mal cuándo terminaría. Sigue vigente hasta que salga el NOTAMR o el NOTAMC.",
      },

      { kind: "p", text: "**D) A qué horas, dentro de ese período**" },
      {
        kind: "list",
        items: [
          "Solo aparece cuando la condición **no es continua** entre B) y C).",
          "Ejemplo típico: la pista está cerrada del 3 de junio al 30 de agosto, pero solo entre las 05:00 y las 10:00 de cada día (curso, pág. 29).",
          "Puede traer días de la semana, meses o referencias al sol: `SR` es salida del sol y `SS` es puesta del sol.",
          "Si el texto de D) es muy largo, el Anexo 15 recomienda publicar varios NOTAM consecutivos en vez de uno solo.",
        ],
      },
      { kind: "code", text: "D) 0500-1000\nD) MON-FRI 1200-1400\nD) DLY SR-SS" },
      {
        kind: "p",
        text: "**Ese es exactamente el caso de El Dorado.** Mira dónde está el horario diario en un NOTAM real:",
      },
      {
        kind: "notam",
        id: "N4",
        caption:
          "Las dos primeras fechas son B) y C): del 16 al 31 de julio. El `0500-1000` que va detrás es la casilla D): la pista 14R/32L solo está cerrada entre las 05:00 y las 10:00 UTC, o sea de medianoche a 5 de la mañana en Colombia. El resto del día opera normal.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error común: leer solo B) y C)",
        text: "Sin la casilla D), ese NOTAM parece decir que El Dorado tiene una pista menos durante quince días seguidos. Con ella, son cinco horas de madrugada. Es la diferencia entre replanear el vuelo y no tocarlo.",
      },

      { kind: "p", text: "**E) Qué pasa exactamente**" },
      {
        kind: "list",
        items: [
          "Texto en **lenguaje claro con abreviaturas OACI**. Es la casilla que de verdad te dice qué está pasando.",
          "Debe ser **coherente con el código Q**: si el código dice `QMRLC` (pista cerrada), E) tiene que hablar de una pista cerrada. Si no coinciden, sospecha del NOTAM y confirma.",
          "Tiene su propia sección más adelante en este documento, con las abreviaturas.",
        ],
      },

      { kind: "p", text: "**F) y G) Entre qué niveles**" },
      {
        kind: "list",
        items: [
          "Solo aparecen en **restricciones y avisos de espacio aéreo**: zonas de tiro, actividad de drones, globos, fuegos artificiales, ejercicios militares.",
          "**F)** es el límite **inferior** y **G)** el **superior**.",
          "`GND` es el nivel del terreno y `SFC` la superficie. `UNL` es ilimitado (curso, pág. 31).",
          "También se escriben como altitud (`3000FT AMSL`) o como nivel de vuelo (`FL180`).",
          "Deben **coincidir con los límites de la línea Q**: si Q) dice `000/060` y F)/G) dicen otra cosa, hay un error en el mensaje.",
        ],
      },
      { kind: "code", text: "F) GND        G) 2000FT AMSL\nF) SFC        G) UNL\nF) FL100      G) FL180" },
      {
        kind: "callout",
        tone: "tip",
        title: "Tip operacional: el orden de lectura no es el orden del papel",
        text: "En el aire lo natural es leer A) para saber si te toca, después B), C) y D) para saber si te toca hoy, y solo entonces E). El código Q lo confirmas al final, para verificar que lo que entendiste es lo que el mensaje dice.",
      },
      {
        kind: "summary",
        items: [
          "**A)** dónde: indicador OACI de aeródromo o de FIR, y pueden ir varios.",
          "**B)** y **C)** cuándo: diez dígitos `AAMMDDHHMM` en UTC. `PERM`, `EST` y `UFN` cambian cómo termina.",
          "**D)** a qué horas dentro de ese período. Si está, el NOTAM no aplica todo el día.",
          "**E)** qué pasa, en lenguaje claro. Tiene que ser coherente con el código Q.",
          "**F)** y **G)** entre qué niveles, solo cuando hay espacio aéreo de por medio.",
        ],
      },
    ],
  },

  // ── 8 ──────────────────────────────────────────────────────────────────────
  {
    n: 8,
    title: "La casilla E) y la fraseología abreviada",
    kicker: "Leer el texto en lenguaje claro",
    minutes: 3,
    level: "intermedio",
    blocks: [
      {
        kind: "p",
        text: "La casilla E) usa **abreviaturas OACI** y la **fraseología abreviada uniforme** del código, ampliada con pista, frecuencia, coordenadas o cifras (Doc 8400, §4 a §6, pág. 7-2). La ampliación del **asunto** va **antes** del significado. La del **estado**, **después**.",
      },
      { kind: "p", text: "**Ejemplos oficiales de casilla E)** (Doc 8400, pág. 7-2):" },
      {
        kind: "table",
        head: ["Situación", "Casilla E)"],
        rows: [
          [
            "Luces de zona de toma de contacto de la RWY 27 no disponibles por corte de energía",
            "`RWY 27 RTZL NOT AVBL POR INTERRUPCIÓN DE PWR`",
          ],
          ["Luces de borde de la TWY B disimuladas por nieve", "`TWY B EDGE LGT OBSCURED BY SN`"],
          ["Bancos de nieve de 15 ft en la franja de la RWY 09/27", "`RWY 09/27 STRIP SN BANKS HGT 15 FT`"],
          [
            "MSA de 90° a 180° hacia el VOR DOM cambiada a 3 600 ft MSL",
            "`90 A 180 DEG INBD VOR DOM MSA CHANGED 3600 FT MSL`",
          ],
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Traduce siempre a una frase entera",
        text: "No leas E) como una sopa de siglas. Conviértela en una oración con sujeto, qué le pasa y desde cuándo. Si no puedes decirla en voz alta en español, todavía no la entendiste.",
      },
    ],
  },

  // ── 9 ──────────────────────────────────────────────────────────────────────
  {
    n: 9,
    title: "Abreviaturas OACI que vas a ver siempre",
    kicker: "El mínimo para leer la casilla E)",
    minutes: 4,
    level: "intermedio",
    blocks: [
      {
        kind: "p",
        text: "Estas son las abreviaturas que aparecen una y otra vez en la casilla E). Con estas lees la mayoría de los NOTAM de aeródromo. Están verificadas en el Doc 8400, sección 1.",
      },

      { kind: "p", text: "**Lugares e instalaciones**" },
      {
        kind: "kv",
        items: [
          { k: "AD", v: "aeródromo" },
          { k: "RWY", v: "pista" },
          { k: "TWY", v: "calle de rodaje" },
          { k: "APN", v: "plataforma" },
          { k: "THR", v: "umbral" },
          { k: "APCH", v: "aproximación" },
          { k: "PRKG", v: "estacionamiento" },
          { k: "OBST", v: "obstáculo" },
        ],
      },

      { kind: "p", text: "**Estado y condición**" },
      {
        kind: "kv",
        items: [
          { k: "AVBL", v: "disponible" },
          { k: "U/S", v: "inutilizable" },
          { k: "CLSD", v: "cerrado" },
          { k: "ACT", v: "activo" },
          { k: "WIP", v: "obras en progreso" },
          { k: "MAINT", v: "mantenimiento" },
          { k: "INSTL", v: "instalado" },
          { k: "CTN", v: "precaución" },
        ],
      },

      { kind: "p", text: "**Tiempo**" },
      {
        kind: "kv",
        items: [
          { k: "FM", v: "desde" },
          { k: "TIL", v: "hasta" },
          { k: "BTN", v: "entre" },
          { k: "DLY", v: "diariamente" },
          { k: "PERM", v: "permanente" },
          { k: "EST", v: "estimado" },
          { k: "UFN", v: "hasta nuevo aviso" },
          { k: "WEF", v: "con efecto a partir de" },
          { k: "SR", v: "salida del sol" },
          { k: "SS", v: "puesta del sol" },
        ],
      },

      { kind: "p", text: "**Distancias declaradas de pista**" },
      {
        kind: "kv",
        items: [
          { k: "TORA", v: "recorrido de despegue disponible" },
          { k: "TODA", v: "distancia de despegue disponible" },
          { k: "ASDA", v: "distancia de aceleración-parada disponible" },
          { k: "LDA", v: "distancia de aterrizaje disponible" },
        ],
      },
      {
        kind: "p",
        text: "Las cuatro aparecen juntas cuando un NOTAM modifica las **distancias declaradas** de una pista, que es exactamente lo que pasa en el NOTAM `C2222/26` de Maicao que vas a ver en el modo práctica.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "El glosario completo está en el Decodificador",
        text: "Aquí tienes el subconjunto que más se repite. El glosario completo, más las 168 tablas de asunto y las 78 de estado, están en el Decodificador de esta sección. Tenlo abierto mientras practicas.",
      },
    ],
  },

  // ── 10 ─────────────────────────────────────────────────────────────────────
  {
    n: 10,
    title: "Decodificación completa, paso a paso",
    kicker: "Dos NOTAM decodificados enteros",
    minutes: 4,
    level: "intermedio",
    blocks: [
      {
        kind: "p",
        text: "**Ejemplo oficial** (Doc 8400, pág. 7-3, decodificado casilla por casilla en el propio documento):",
      },
      {
        kind: "code",
        text: "Q) LFFF/QNDAU/IV/BO/AE/...\nA) LFPO  B) 9203312359  C) 9204010600\nE) DME NOT AVBL",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "`LFFF` es el FIR de París.",
          "`QNDAU`: `ND` es DME y `AU` es no disponible.",
          "`IV` afecta a IFR y a VFR.",
          "`BO` va al boletín previo al vuelo y es significativo para IFR.",
          "`AE` es alcance de ayuda terminal y en ruta.",
          "`A) LFPO` es París/Orly.",
          "`B)` 31 mar 1992 a las 23:59 UTC y `C)` 1 abr 1992 a las 06:00 UTC.",
          "`E)` DME no disponible.",
        ],
      },
      {
        kind: "example",
        title: "Ejemplo resuelto: NOTAM internacional completo",
        code: "A0682/06 NOTAMN\nQ)SCEZ/QMXLC/IV/M/A/000/999/3323S07047W005\nA)SCEL B)0606091958 C)0606242359\nE)TWY TANGO CLSD BTN TWY KILO AND ZULU PRKG ACFT",
        steps: [
          "**Encabezado:** serie A, número 0682 de 2006, tipo `NOTAMN`, o sea nuevo. No reemplaza nada.",
          "**Código Q:** `QMXLC`. `MX` es calle de rodaje y `LC` es cerrada.",
          "**Tránsito y alcance:** `IV` afecta a IFR y VFR, objetivo `M` (misceláneo), alcance `A` (aeródromo). Si vuelas a Santiago te aplica.",
          "**Límites y área:** `000/999` son los niveles por defecto y el área es un círculo de 5 NM centrado en 33°23'S 70°47'W.",
          "**A)** `SCEL`, Arturo Merino Benítez. **B)** y **C)**: del 9 de junio a las 19:58 UTC al 24 de junio a las 23:59 UTC de 2006. No hay casilla D), así que es continuo.",
          "**E)** `TWY TANGO CLSD BTN TWY KILO AND ZULU PRKG ACFT`: calle de rodaje TANGO cerrada entre KILO y ZULU por estacionamiento de aeronaves.",
        ],
        answer:
          "En Santiago, la calle de rodaje TANGO está cerrada entre KILO y ZULU, sin interrupción, del 9 al 24 de junio. Toca planear rodajes alternos en superficie: el cierre no afecta la pista.",
      },
      {
        kind: "summary",
        items: [
          "Encabezado y `A)` primero: qué NOTAM es y si te toca.",
          "Código Q después: qué cosa y qué le pasa, en cinco letras.",
          "Fechas y horario: siempre UTC, y Colombia va cinco horas atrás.",
          "`E)` al final, expandiendo las abreviaturas hasta poder decirlo en voz alta en español.",
        ],
      },
    ],
  },

  // ── 11 ─────────────────────────────────────────────────────────────────────
  {
    n: 11,
    title: "NOTAM en Colombia: el resumen mensual de la Aerocivil",
    kicker: "Leer el resumen mensual DRT",
    minutes: 4,
    level: "avanzado",
    blocks: [
      {
        kind: "p",
        text: "La Dirección de Informática (DRT) de la Aerocivil publica el **resumen mensual de NOTAM vigentes** por series. Los archivos reales que usa esta app son las series **Alfa** y **Charlie/Delta**, con corte al 29 de julio de 2026. El encabezado del resumen Charlie/Delta lo dice:",
      },
      {
        kind: "quote",
        text: "Los siguientes NOTAM serie CHARLIE/DELTA continúan vigentes (...) Los no incluidos han sido cancelados, reemplazados, han expirado o fueron publicados en el Manual AIP/COLOMBIA.",
        source: "Aerocivil, DRT: resumen mensual de NOTAM vigentes, corte 29 JUL 2026",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Todas las horas son UTC",
        text: "El resumen no usa hora local en ninguna columna. Colombia va en UTC menos 5, así que resta cinco horas para saber a qué hora local aplica.",
      },
      { kind: "p", text: "**Cómo se lee cada fila del resumen.** Esta es real, de Maicao:" },
      { kind: "notam", id: "N2" },
      {
        kind: "breakdown",
        caption:
          "El resumen no usa las letras de casilla, pero la fila trae la misma información y en el mismo orden. Aprendida la equivalencia, lees el resumen igual que un NOTAM estándar.",
        parts: [
          { token: "C 2222/26", label: "encabezado", detail: "Serie C, NOTAM 2222 del año 2026." },
          {
            token: "MAICAO/JORGE ISAACS (SKLM)",
            label: "equivale a A)",
            detail: "Nombre del aeródromo o FIR con su indicador OACI.",
          },
          { token: "2606031100", label: "equivale a B)", detail: "3 de junio de 2026 a las 11:00 UTC." },
          {
            token: "2608302359",
            label: "equivale a C)",
            detail: "30 de agosto de 2026 a las 23:59 UTC. Aquí puede aparecer `EST` o `PERM`.",
          },
          {
            token: "DIST DECLARADAS RWY 10/28 MODIFICADAS",
            label: "equivale a E)",
            detail: "El texto en lenguaje claro, con las abreviaturas OACI de siempre.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Si entre las fechas y el texto aparece un bloque tipo `0500-1000`, es el **horario diario**, es decir la casilla D).",
          "En los NOTAM de espacio aéreo, las columnas Desde y Hasta equivalen a F) y G).",
          "`RPLC NOTAM C 0756/26` significa que reemplaza al NOTAM indicado, es decir que se comporta como un NOTAMR.",
        ],
      },
      {
        kind: "example",
        title: "Ejemplo resuelto: el NOTAM de Maicao, entero",
        code: "C 2222/26  MAICAO/JORGE ISAACS (SKLM)\n2606031100 / 2608302359\nDIST DECLARADAS RWY 10/28 MODIFICADAS:\nRWY 10: TORA(M)1700 TODA(M)1800 ASDA(M)1550 LDA(M)1700\nRWY 28: TORA(M)1700 TODA(M)1700 ASDA(M)1550 LDA(M)1700",
        steps: [
          "Serie C, número 2222 de 2026, en Jorge Isaacs de Maicao (`SKLM`).",
          "Vigente del 3 de junio a las 11:00 UTC (06:00 en Colombia) al 30 de agosto a las 23:59 UTC. Sin horario diario: aplica de corrido.",
          "`DIST DECLARADAS` son las **distancias declaradas** de la pista, la sección de abreviaturas te las dejó listas: `TORA` recorrido de despegue, `TODA` distancia de despegue, `ASDA` aceleración-parada y `LDA` aterrizaje. La `(M)` es que van en metros.",
          "Para la 10: despegas con 1700 m, tienes 1800 m contando la zona libre de obstáculos, 1550 m para acelerar y parar, y 1700 m para aterrizar.",
          "Para la 28 cambia una sola cifra: la `TODA` baja a 1700 m.",
        ],
        answer:
          "Maicao operó con distancias declaradas reducidas todo ese período. La cifra que manda es la `ASDA` de 1550 m: es la que penaliza el despegue con falla de motor, y es más corta que cualquiera de las otras tres. Con este NOTAM en la mano, la performance de despegue se recalcula.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Material colombiano auténtico",
        text: "En el modo práctica de esta sección ves imágenes reales de este resumen (SKPB, SKLM, SKBO, SKRG, FIR Bogotá y más) para entrenar con NOTAM nacionales. Son material de estudio con vigencia ya expirada.",
      },
    ],
  },

  // ── 12 ─────────────────────────────────────────────────────────────────────
  {
    n: 12,
    title: "SNOWTAM y ASHTAM",
    kicker: "Las dos series con formato propio",
    minutes: 5,
    level: "avanzado",
    blocks: [
      {
        kind: "p",
        text: "Hay dos situaciones que la OACI sacó del formato normal porque necesitan datos muy específicos y muy rápido: la **contaminación de la pista** y la **ceniza volcánica**. Cada una tiene su propia serie, con su propio formato, definido en el **Anexo 15**.",
      },

      { kind: "p", text: "**SNOWTAM: contaminación del área de movimiento**" },
      {
        kind: "list",
        items: [
          "Informa condiciones peligrosas por **nieve, nieve fundente, hielo, escarcha o agua estancada** en pistas, calles de rodaje y plataformas (Doc 8400, pág. 1-24).",
          "Se identifica con un **número de serie propio** y lleva el indicador del aeródromo.",
          "Reporta la pista **dividida en tres tercios**, cada uno con su **código de estado de pista** de 0 a 6: `6` es pista seca y `0` es la peor condición. También el tipo de contaminante, su espesor en milímetros y qué porcentaje de la pista cubre.",
          "Su **validez máxima es de 8 horas**. Un SNOWTAM nuevo reemplaza automáticamente al anterior del mismo aeródromo.",
          "Trae además una sección de información para la conciencia situacional: calles de rodaje y plataformas afectadas, bancos de nieve, luces tapadas y observaciones en lenguaje claro.",
        ],
      },
      { kind: "p", text: "**Ejemplo de formato**, aeródromo SKBO, pista 13R:" },
      {
        kind: "kv",
        items: [
          { k: "A) SKBO", v: "Indicador OACI del aeródromo." },
          { k: "B) 07301245", v: "Fecha y hora de la observación, `DDHHMM` en UTC." },
          { k: "C) 13R", v: "Pista que se reporta." },
          { k: "D) 5/5/3", v: "Código de estado de pista por tercio: los dos primeros tercios en 5, el último en 3." },
          { k: "E) 100/100/100", v: "Porcentaje de cada tercio cubierto por el contaminante." },
          { k: "F) NR/NR/3", v: "Espesor del contaminante en milímetros. `NR` es no reportado." },
          { k: "G) DRY/DRY/WET", v: "Descripción de la condición de cada tercio." },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Por qué te importa si vuelas en Colombia",
        text: "Nieve casi nunca, pero agua estancada sí. El mismo formato reporta pista mojada y encharcada, y el código de estado de pista es el dato que usas para calcular la distancia de aterrizaje en condiciones no secas.",
      },

      { kind: "p", text: "**ASHTAM: actividad volcánica y ceniza**" },
      {
        kind: "list",
        items: [
          "Informa **actividad volcánica, erupciones y nubes de ceniza** que afectan a la navegación aérea. Se emite por **FIR**, no por aeródromo.",
          "Su dato central es el **código de color del nivel de alerta**: **verde** (volcán en estado normal), **amarillo** (actividad por encima de lo normal), **naranja** (erupción probable o en curso sin columna significativa) y **rojo** (erupción con columna de ceniza en la atmósfera).",
          "Incluye el nombre y el número del volcán, su posición, la altura y la dirección de movimiento de la nube, y las rutas y niveles de vuelo afectados o cerrados.",
          "Su **validez máxima es de 24 horas**, y se emite uno nuevo en cuanto cambia el nivel de alerta.",
          "Va acompañado de los avisos de ceniza volcánica que emiten los centros VAAC.",
        ],
      },
      { kind: "p", text: "**Ejemplo de formato**, FIR Bogotá:" },
      {
        kind: "kv",
        items: [
          { k: "A) SKED", v: "FIR afectada. El ASHTAM se emite por FIR, no por aeródromo." },
          { k: "B) 2607301400", v: "Fecha y hora del mensaje, en UTC." },
          { k: "C) NEVADO DEL RUIZ", v: "Nombre y número del volcán." },
          { k: "D) 0453N07522W", v: "Posición del volcán." },
          { k: "E) NARANJA", v: "Código de color del nivel de alerta, y cuál era el anterior." },
          { k: "F) CENIZA HASTA FL200", v: "Altura de la nube de ceniza." },
          { k: "G) AL OESTE", v: "Dirección de movimiento de la nube." },
          { k: "H) UW7 AFECTADA", v: "Rutas, niveles de vuelo y espacio aéreo afectados o cerrados." },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Colombia es país volcánico",
        text: "El Nevado del Ruiz, el Galeras y el Puracé tienen actividad recurrente. El ASHTAM y los avisos de ceniza no son teoría de examen: son parte del briefing real de vuelos por el centro y el suroccidente del país.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Sobre los formatos de esta sección",
        text: "Los dos bloques de arriba ilustran qué campos trae cada mensaje y en qué orden. El detalle exacto de cada casilla y su edición vigente están en el Anexo 15 y sus apéndices: confírmalos ahí antes de usarlos operacionalmente.",
      },
    ],
  },

  // ── 13 ─────────────────────────────────────────────────────────────────────
  {
    n: 13,
    title: "Método de lectura en 6 pasos",
    kicker: "Rutina de lectura y errores comunes",
    minutes: 3,
    level: "avanzado",
    blocks: [
      {
        kind: "p",
        text: "Lee cada NOTAM siempre en el mismo orden. Esta rutina es la que aplicas en el modo práctica y en la evaluación.",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Encabezado y A):** qué NOTAM es (serie, número y tipo) y dónde aplica.",
          "**Código Q:** la 2ª y 3ª letras dicen qué cosa, la 4ª y 5ª qué le pasa.",
          "**Tránsito y alcance:** si te aplica (`I`/`V`, `A`/`E`/`W`).",
          "**B), C) y D):** cuándo. Siempre en UTC, y Colombia va en UTC menos 5. Ojo con `PERM`, `EST` y los horarios diarios.",
          "**E):** léelo expandiendo las abreviaturas. Debe ser coherente con el código Q.",
          "**F) y G)** si hay espacio aéreo involucrado: entre qué niveles aplica.",
        ],
      },
      { kind: "p", text: "**Errores comunes**, los mismos que evalúa la sección de práctica:" },
      {
        kind: "list",
        items: [
          "Confundir `LC` (cerrado) con `LI`, `LN` o `LV` (cerrado solo para IFR, solo de noche o solo para VFR).",
          "Leer B), C) y D) en hora local: son UTC.",
          "Ignorar `EST`: el fin es estimado, y el NOTAM sigue vigente hasta que lo reemplacen o lo cancelen.",
          "Pasar por alto el horario diario (casilla D o el bloque `HHMM-HHMM` del resumen). \"Cerrado\" puede ser solo unas horas al día.",
          "No revisar `RPLC`: si un NOTAM reemplaza a otro, el anterior ya no vale.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error común: el que más cuesta",
        text: "Leer las fechas en hora local. Un NOTAM que termina a las `2359` UTC termina a las 18:59 en Bogotá, no a medianoche.",
      },
      {
        kind: "summary",
        title: "Lo que te llevas de todo el documento",
        items: [
          "Un NOTAM es **encabezado + casillas**, y las casillas siempre van en el mismo orden.",
          "El código Q de cinco letras se lee como una frase: `Q` + asunto + estado.",
          "Todo lo que sea hora es UTC. Colombia va cinco horas atrás, sin excepciones.",
          "`EST` no es vencido, `PERM` no termina, y un `RPLC` deja sin efecto al NOTAM anterior.",
          "La casilla D) y el bloque `HHMM-HHMM` del resumen colombiano son lo mismo: el horario diario.",
          "Si el código Q y la casilla E) no dicen lo mismo, confirma antes de usar el NOTAM.",
        ],
      },
    ],
  },
]

/** Número de secciones del documento. Es el denominador del progreso de la lección. */
export const LESSON_TOTAL = LESSON_SCREENS.length

/** Fuentes citadas al pie del documento de la lección. */
export const LESSON_SOURCES: string[] = [
  "OACI, Doc 8400: Abreviaturas y códigos de la OACI (PANS-ABC), 6ª ed., 2004.",
  "OACI, Anexo 15: Servicios de información aeronáutica, incluidos sus apéndices de SNOWTAM y ASHTAM.",
  "NOTAMS: definición, estructura y ejemplos (guía de interpretación de curso).",
  "METAR, TAF y NOTAM (presentación de curso).",
  "Resúmenes mensuales de NOTAM vigentes, Aerocivil Colombia (DRT), corte 29 JUL 2026, series Alfa y Charlie/Delta.",
]
