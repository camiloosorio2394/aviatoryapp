/**
 * Contenido estructurado de la lección "Qué es un NOTAM y cómo leerlo".
 *
 * Fuente: src/data/notam/leccion_notam.md (9 pantallas).
 * Verificado contra el Doc 8400 de la OACI (PANS-ABC, 6ª ed., 2004) y la
 * bibliografía de curso citada en LESSON_SOURCES.
 *
 * Las tablas de códigos (168 asuntos + 78 estados) y el glosario NO se duplican
 * aquí: viven en src/lib/notam.ts y se muestran en el Decodificador.
 */

import type { NotamLevel } from "@/lib/notam"

export type LessonBlock =
  | { kind: "p"; text: string }
  | { kind: "quote"; text: string; source?: string }
  | { kind: "list"; items: string[]; ordered?: boolean }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "code"; text: string }
  | { kind: "callout"; tone: "info" | "warn" | "tip"; title?: string; text: string }
  | { kind: "kv"; items: { k: string; v: string }[] }

export interface LessonScreen {
  /** 1 a 9 */
  n: number
  /** Título de la pantalla, sin el prefijo "Pantalla N" del documento fuente */
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
        title: "Cómo aprovechar esta lección",
        text: "Son 9 pantallas cortas. Al terminar tienes el modo práctica con NOTAM colombianos reales y una evaluación de 20 preguntas. Puedes volver a cualquier pantalla desde la barra de progreso.",
      },
    ],
  },

  // ── 2 ──────────────────────────────────────────────────────────────────────
  {
    n: 2,
    title: "De dónde sale y dónde vive",
    kicker: "Normas, fuentes y series especiales",
    minutes: 3,
    level: "basico",
    blocks: [
      {
        kind: "list",
        items: [
          "El contenido y el formato de los NOTAM los fija el **Anexo 15 de la OACI** (§5.2.1, §5.3.2 y Apéndice 6). Su transmisión por el servicio fijo aeronáutico (AFS) la fija el **Anexo 10, Vol. II** (Doc 8400, pág. 7-1, §2).",
          "Los criterios de selección y las tablas de calificativos están en el **Doc 8126**, Manual para los servicios de información aeronáutica (Doc 8400, pág. 7-3, nota).",
          "El **código NOTAM** de cinco letras está normalizado en el **Doc 8400, sección 7**. Lo tienes completo en el Decodificador de esta sección.",
          "En Colombia, la **Aeronáutica Civil** publica los NOTAM vigentes. Su Dirección de Informática (DRT) emite el **resumen mensual de NOTAM vigentes** por series, y lo trabajas en la pantalla 8.",
        ],
      },
      { kind: "p", text: "**Series especiales:**" },
      {
        kind: "kv",
        items: [
          {
            k: "SNOWTAM",
            v: "Condiciones peligrosas por nieve, nieve fundente, hielo o agua en el área de movimiento (Doc 8400, pág. 1-24).",
          },
          {
            k: "ASHTAM",
            v: "Actividad volcánica y ceniza volcánica (bibliografía de curso, pág. 20; definido normativamente en el Anexo 15).",
          },
        ],
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
    title: "Anatomía del formato NOTAM",
    kicker: "Encabezado, tipos y casillas",
    minutes: 4,
    level: "basico",
    blocks: [
      {
        kind: "p",
        text: "**El encabezado** (guía de interpretación, pág. 2; curso, pág. 21): cada NOTAM se identifica con **serie + número/año + tipo**. Por ejemplo, `A0682/06 NOTAMN` es un NOTAM de la serie A, número 0682 del año 2006, de tipo nuevo.",
      },
      { kind: "p", text: "**Tipos de NOTAM** (curso, pág. 20; guía, pág. 2):" },
      {
        kind: "list",
        items: [
          "**NOTAMN** (new): nuevo.",
          "**NOTAMR** (replacing): reemplaza a uno vigente e indica cuál, como en `A0143/22 NOTAMR A2385/21`.",
          "**NOTAMC** (cancelation): cancela uno vigente.",
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Sobre el tipo NOTAME",
        text: "La guía de interpretación menciona además un tipo NOTAME (event) para eventos. Ese tipo no figura en el esquema OACI estándar N/R/C, así que trátalo como particularidad de esa fuente y confírmalo contra el Anexo 15.",
      },
      {
        kind: "p",
        text: "**Las casillas Q) a G)** (Doc 8400, pág. 7-3; curso, págs. 21 a 31):",
      },
      {
        kind: "table",
        head: ["Casilla", "Contenido", "Detalle"],
        rows: [
          [
            "**Q)**",
            "Calificativos: FIR / código NOTAM / tránsito / objetivo / alcance / límites / coordenadas y radio",
            "Se detalla en la pantalla 4",
          ],
          ["**A)**", "Indicador OACI del aeródromo o FIR afectado", "`A)SKBO`, `A)SKED`"],
          [
            "**B)**",
            "Inicio de validez, 10 dígitos AAMMDDHHMM en **UTC**",
            "En NOTAMR y NOTAMC es la fecha y hora de creación (curso, pág. 27). Inicio del día = `0000`.",
          ],
          [
            "**C)**",
            "Fin de validez, mismo formato",
            "`PERM` = permanente. Si el fin es incierto se estima y se marca `EST`. Fin del día = `2359`. El NOTAMC no lleva C) (curso, pág. 28).",
          ],
          [
            "**D)**",
            "Horario de actividad dentro del período B) a C), cuando la condición no es continua",
            "Por ejemplo, pista cerrada solo de `0500-1000` cada día (curso, pág. 29)",
          ],
          ["**E)**", "Texto en lenguaje claro con abreviaturas OACI", "Se detalla en la pantalla 6"],
          [
            "**F) G)**",
            "Límite vertical inferior y superior (restricciones y avisos de espacio aéreo)",
            "`GND` y `SFC` = tierra o superficie. `UNL` = ilimitado (curso, pág. 31)",
          ],
        ],
      },
    ],
  },

  // ── 4 ──────────────────────────────────────────────────────────────────────
  {
    n: 4,
    title: "La línea Q, pieza por pieza",
    kicker: "Los siete componentes del calificativo",
    minutes: 4,
    level: "intermedio",
    blocks: [
      { kind: "p", text: "Ejemplo del curso (pág. 22):" },
      { kind: "code", text: "Q)SEFG/QRALW/IV/NBO/AW/000/001/0202S07956W001" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**FIR** (`SEFG`): región de información de vuelo donde aplica.",
          "**Código NOTAM** (`QRALW`): cinco letras, se explica en la pantalla siguiente.",
          "**Tránsito** (curso, pág. 24): `I` = IFR, `V` = VFR, `IV` = ambos, `K` = checklist.",
          "**Objetivo** (curso, pág. 24): `N` = atención inmediata de la tripulación, `B` = entra al boletín previo al vuelo (PIB), `O` = concierne a operaciones de vuelo, `M` = misceláneo, no va a briefing y queda disponible a solicitud, `K` = checklist.",
          "**Alcance** (curso, pág. 25): `A` = aeródromo, `E` = en ruta, `W` = advertencia de navegación. Se combinan, por ejemplo `AE` o `AW`.",
          "**Límites** (curso, pág. 25): inferior y superior en niveles de vuelo. `000/999` son los valores por defecto, es decir toda altura.",
          "**Coordenadas y radio**: centro del área afectada y radio en NM. En `0202S07956W001` el radio es de 1 NM.",
        ],
      },
      {
        kind: "p",
        text: "El propio Doc 8400 decodifica estos calificativos en sus ejemplos (pág. 7-3): `IV/BO/AE` significa IFR y VFR, boletín previo al vuelo más significativo para IFR, y alcance de ayuda terminal y en ruta.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Pendiente normativo",
        text: "Las tablas normativas completas de calificativos están en el Doc 8126, que todavía no cargamos. Lo que ves aquí viene del Doc 8400 y de la bibliografía de curso.",
      },
    ],
  },

  // ── 5 ──────────────────────────────────────────────────────────────────────
  {
    n: 5,
    title: "El código NOTAM de cinco letras",
    kicker: "Asunto y estado en cinco letras",
    minutes: 4,
    level: "intermedio",
    blocks: [
      {
        kind: "p",
        text: "Reglas (Doc 8400, §3, pág. 7-1): son cinco letras y siempre empieza por **Q**. La **2ª y 3ª letras indican el asunto**, la **4ª y 5ª el estado**.",
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
      { kind: "p", text: "**Ejemplos rápidos** (tablas del Doc 8400, sección 7):" },
      {
        kind: "kv",
        items: [
          { k: "QMRLC", v: "pista cerrada" },
          { k: "QMXLC", v: "calle de rodaje cerrada" },
          { k: "QNVAS", v: "VOR fuera de servicio" },
          { k: "QLPAS", v: "PAPI inoperativo" },
          { k: "QPDAW", v: "SID retirada definitivamente" },
          { k: "QWMLW", v: "ejercicios de tiro se realizarán" },
          { k: "QOBCE", v: "obstáculo montado" },
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

  // ── 6 ──────────────────────────────────────────────────────────────────────
  {
    n: 6,
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
        title: "El glosario está en el Decodificador",
        text: "Las abreviaturas para leer la casilla E) (AD, AVBL, CLSD, U/S, WIP, TORA, TODA, ASDA, LDA y muchas más, verificadas en el Doc 8400, sección 1) se muestran en el Decodificador, junto a las tablas de códigos. Tenlo abierto mientras practicas.",
      },
    ],
  },

  // ── 7 ──────────────────────────────────────────────────────────────────────
  {
    n: 7,
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
        kind: "p",
        text: "**Ejemplo internacional decodificado** (guía de interpretación, pág. 14):",
      },
      {
        kind: "code",
        text: "A0682/06 NOTAMN\nQ)SCEZ/QMXLC/IV/M/A/000/999/3323S07047W005\nA)SCEL B)0606091958 C)0606242359\nE)TWY TANGO CLSD BTN TWY KILO AND ZULU PRKG ACFT",
      },
      {
        kind: "p",
        text: "Serie A, número 0682 de 2006, NOTAM nuevo. FIR Santiago. `QMXLC` = calle de rodaje (`MX`) cerrada (`LC`). Afecta a IFR y VFR, objetivo `M` (misceláneo), alcance `A` (aeródromo), `000/999` son los niveles por defecto y el área es un círculo de 5 NM centrado en 33°23'S 70°47'W. En Arturo Merino Benítez (`SCEL`), del 9 de junio a las 19:58 UTC al 24 de junio a las 23:59 UTC de 2006: calle de rodaje TANGO cerrada entre KILO y ZULU por estacionamiento de aeronaves.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Traducción operacional",
        text: "Toca planear rodajes alternos en superficie. El cierre no afecta la pista.",
      },
    ],
  },

  // ── 8 ──────────────────────────────────────────────────────────────────────
  {
    n: 8,
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
      { kind: "p", text: "**Cómo se lee cada fila del resumen:**" },
      {
        kind: "code",
        text: "C 2222/26   MAICAO/JORGE ISAACS (ANTES LA MINA) (SKLM)\n            2606031100 / 2608302359 ,\n            DIST DECLARADAS RWY 10/28 MODIFICADAS: ...",
      },
      {
        kind: "list",
        items: [
          "`C 2222/26` es la serie C, NOTAM 2222 del año 2026.",
          "Luego va el nombre del aeródromo o FIR con su indicador OACI, que equivale a la casilla A).",
          "Las dos fechas son las casillas B) y C). Si aparece un bloque tipo `1100-2300`, es el **horario diario**, es decir la casilla D). `EST` y `PERM` funcionan igual que en el formato estándar.",
          "El texto final es la casilla E). En los NOTAM de espacio aéreo, las columnas Desde y Hasta equivalen a F) y G).",
          "`RPLC NOTAM C 0756/26` significa que reemplaza al NOTAM indicado, es decir que se comporta como un NOTAMR.",
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Material colombiano auténtico",
        text: "En el modo práctica de esta sección ves imágenes reales de este resumen (SKPB, SKLM, SKBO, SKRG, FIR Bogotá y más) para entrenar con NOTAM nacionales. Son material de estudio con vigencia ya expirada.",
      },
    ],
  },

  // ── 9 ──────────────────────────────────────────────────────────────────────
  {
    n: 9,
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
        title: "El error que más cuesta",
        text: "Leer las fechas en hora local. Un NOTAM que termina a las `2359` UTC termina a las 18:59 en Bogotá, no a medianoche.",
      },
    ],
  },
]

/** Las cuatro fuentes del bloque de fuentes del documento de la lección. */
export const LESSON_SOURCES: string[] = [
  "OACI, Doc 8400: Abreviaturas y códigos de la OACI (PANS-ABC), 6ª ed., 2004.",
  "NOTAMS: definición, estructura y ejemplos (guía de interpretación de curso).",
  "METAR, TAF y NOTAM (presentación de curso).",
  "Resúmenes mensuales de NOTAM vigentes, Aerocivil Colombia (DRT), corte 29 JUL 2026, series Alfa y Charlie/Delta.",
]
