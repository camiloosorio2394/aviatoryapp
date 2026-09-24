/**
 * Nivel 4 · En ruta y llegada (lecciones 19 a 30, capítulos 19 a 30 de la especificación).
 *
 * Del SID a la pista de destino: niveles, rumbos, velocidades, reportes,
 * desvíos por meteorología, llegada, aproximación, espera, aterrizaje y motor
 * y al aire.
 *
 * Fuente: docs/comunicaciones/nivel-4.md, entero. Cada intercambio del
 * Markdown es un bloque `code` con su significado debajo (`ejemplo`); los
 * rótulos (VERIFICAR) y PLAIN LANGUAGE de cada ejemplo se conservan en su
 * título. Lo que el Markdown marca VERIFICAR sale en un callout «Verificar»
 * visible al empezar la fraseología y, completo, en el detalle técnico de
 * FUENTES. El formato de los bloques y de los huecos está documentado al
 * inicio de index.ts.
 */

import type { DocBlockData, DocScreen } from "@/lib/docBlocks"

/**
 * Un intercambio: el título en negrita, la transmisión literal (una línea por
 * turno de palabra) y el significado en español.
 */
function ejemplo(titulo: string, turnos: string[], significado: string): DocBlockData[] {
  return [
    { kind: "p", text: `**${titulo}**` },
    { kind: "code", text: turnos.join("\n") },
    { kind: "p", text: significado },
  ]
}

/** Un error frecuente: el nombre del error como título y la explicación. */
function error(titulo: string, text: string): DocBlockData {
  return { kind: "callout", tone: "warn", title: titulo, text }
}

/** Cómo leer los ejemplos: va al empezar la fraseología de cada lección. */
const COMO_LEER: DocBlockData = {
  kind: "callout",
  tone: "info",
  title: "Cómo leer los ejemplos",
  text: "`AVIATORY 452`, las estaciones, pistas, frecuencias, SID, STAR y waypoints son **ficticios**. Frase **sin etiqueta**: su estructura está en el Doc 9432 o el Doc 4444 cargados (el párrafo exacto va en Fuentes). **(VERIFICAR)**: fraseología OACI conocida que no está en las fuentes cargadas. **PLAIN LANGUAGE**: lenguaje claro, no fraseología estandarizada.",
}

/** Las convenciones de los ejemplos de todo el nivel (cabecera de nivel-4.md). */
const CONVENCIONES: DocBlockData = {
  kind: "list",
  items: [
    "`AVIATORY 452` es un distintivo ficticio. «Bogota Departure», «Bogota Control», «Bogota Approach», «Bogota Tower» y «Bogota Ground» son estaciones de ejemplo educativo. Pistas, frecuencias, niveles de transición, designadores de SID y STAR y waypoints (GIKOS, PAXUM, RODEL, KUBIN, LOSAM, TOMUR, VATIX) son **ficticios**: no corresponden a la carta real de ningún aeródromo.",
    "Los números van con su ortografía inglesa normal para que se lean fácil. La pronunciación OACI de cada dígito está en el capítulo 5.",
    "Frase **sin etiqueta**: su estructura está en el Doc 9432 o el Doc 4444 cargados (se cambiaron distintivo, lugares y valores). El párrafo exacto va en FUENTES.",
    "**(VERIFICAR)**: fraseología OACI conocida que no está en las fuentes cargadas. Confirmarla en el documento indicado antes de publicarla como norma.",
    "**PLAIN LANGUAGE**: lenguaje claro, no fraseología estandarizada.",
    "Fuentes cargadas: Doc 9432, Manual de radiotelefonía, 4.ª ed. 2007 (caps. 1 a 7.3) y Doc 4444, PANS-ATM, 15.ª ed. con Enm. 4 (caps. 1 a 4 y comienzo del 5). El cap. 12 del Doc 4444 (fraseología), el cap. 8 del Doc 9432 (control de área) y la sección 7.4 en adelante del Doc 9432 **no están cargados**. La 15.ª ed. del Doc 4444 no es la vigente: existe la 16.ª ed. (2016) con enmiendas.",
  ],
}

export const NIVEL_4: DocScreen[] = [
  // ── 19 ──────────────────────────────────────────────────────────────────
  {
    n: 19,
    title: "SID y salida",
    kicker: "La autorización de salida y las restricciones publicadas",
    minutes: 9,
    blocks: [
      {
        kind: "p",
        text: "Capítulos 19 a 30. Del despegue ya autorizado hasta la plataforma de llegada: salida, cambios de nivel, vectores, velocidad, crucero, reportes de posición, desvíos por meteorología, llegada, aproximación, espera, aterrizaje y motor y al aire.",
      },
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "La **SID** (salida normalizada por instrumentos) es una ruta de salida IFR publicada que une el aeródromo o una pista con un punto significativo, normalmente en una ruta ATS, donde empieza la fase en ruta (Doc 4444, cap. 1). **Departure** es la dependencia de control que recibe al avión después del despegue. En aeropuertos pequeños el mismo Approach hace de Departure; en los de más tráfico están separados (Doc 9432, 7.1.1).",
      },
      {
        kind: "p",
        text: "Las instrucciones de salida pueden llegar como una SID o en lenguaje claro: un rumbo, un nivel, un punto (Doc 9432, 7.1.2).",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "La SID normalmente viene dentro de la autorización de ruta, nombrada por su designador («cleared … via (designación)», Doc 4444, 4.5.7.2.1). Se colaciona completa: es autorización de ruta e incluye nivel y código SSR (Doc 4444, 4.5.7.5.1).",
          "Después del despegue, ATC puede cambiar parte de la SID con una instrucción: un rumbo, un nivel, un directo, una velocidad. **La instrucción específica manda sobre lo publicado en lo que modifica.** Lo que no está claro es qué pasa con el resto (las restricciones de nivel y de velocidad publicadas). Para eso se creó la fraseología `CLIMB VIA SID` en la 16.ª ed. del Doc 4444 (VERIFICAR). Si hay duda, se pregunta con `CONFIRM`.",
          "ATC evita transmitir durante el despegue y el ascenso inicial, salvo por seguridad (Doc 9432, 4.1.2 y 4.5.4). Por eso la primera llamada a Departure se hace cuando la cabina está estable, según el SOP.",
          "En la primera llamada tras un cambio de frecuencia, cuando la autoridad ATS lo disponga, se dice: estación, distintivo (y `HEAVY` si es de estela pesada), nivel (incluido el de paso y el autorizado si no se mantiene el autorizado), velocidad si ATC la asignó (Doc 4444, 4.11.3 y 4.9.2). Qué exige cada Estado está en su AIP.",
          "Después de la autorización de despegue, la palabra `TAKEOFF` desaparece: se habla de `DEPARTURE` o `AIRBORNE` (Doc 9432, 2.8.3.3).",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "Esta lección usa fraseología que no está en las fuentes cargadas. «CLIMB VIA SID TO (nivel)» (ejemplo 6) y qué restricciones publicadas cancela o mantiene una instrucción de nivel sin «VIA»: consultar el Doc 4444 16.ª ed., caps. 6 (salidas) y 12 (fraseología de SID y STAR). Las frases de cancelación de restricciones de SID («LEVEL RESTRICTION(S) CANCELLED», «SPEED RESTRICTION(S) CANCELLED», «CLIMB UNRESTRICTED») no se usan en los ejemplos por no estar confirmadas: Doc 4444 16.ª ed., cap. 12. Lo que exige cada Estado en la primera llamada a Departure: su AIP (en Colombia, AIP Colombia ENR y AD 2 del aeródromo).",
      },
      ...ejemplo(
        "Ejemplo 1 · La SID dentro de la autorización de ruta",
        [
          `ATC:   "Aviatory 452, cleared to Cali, via Alpha one, flight level two eight zero, GIKOS three Delta departure, squawk five five zero one."`,
          `PILOT: "Cleared to Cali, via Alpha one, flight level two eight zero, GIKOS three Delta departure, squawk five five zero one, Aviatory 452."`,
        ],
        "Significado: autorizado hasta Cali por la aerovía A1, nivel de vuelo 280, saliendo por la SID GIKOS 3D, código 5501. Se colaciona todo y se cierra con el distintivo.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Primera llamada a Departure",
        [
          `PILOT: "Bogota Departure, Aviatory 452, passing six thousand feet climbing to flight level one two zero."`,
          `ATC:   "Aviatory 452, identified, climb to flight level two four zero."`,
          `PILOT: "Climbing to flight level two four zero, Aviatory 452."`,
        ],
        "Significado: el piloto dice nivel de paso y nivel autorizado. ATC confirma identificación radar y da un nivel nuevo, que se colaciona con «flight level».",
      ),
      ...ejemplo(
        "Ejemplo 3 · ATC modifica la SID con un rumbo",
        [
          `ATC:   "Aviatory 452, turn right heading zero four zero until passing flight level seven zero, then direct GIKOS."`,
          `PILOT: "Right heading zero four zero until passing flight level seven zero, then direct GIKOS, Aviatory 452."`,
          `ATC:   "Aviatory 452, report passing flight level seven zero."`,
          `PILOT: "Wilco, Aviatory 452."`,
          `PILOT: "Aviatory 452, passing flight level seven zero."`,
        ],
        "Significado: se abandona la trayectoria lateral de la SID. Rumbo 040 a la derecha hasta cruzar FL 70, luego directo a GIKOS. `WILCO` porque es una instrucción de notificar, no un valor que colacionar.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Restricción de la SID y «si es imposible»",
        [
          `ATC:   "Aviatory 452, Bogota Departure, cleared to Cali flight level two nine zero, cross GIKOS flight level one five zero or above, if unable, maintain flight level one three zero."`,
          `PILOT: "Bogota Departure, unable to cross GIKOS flight level one five zero due weight, maintaining flight level one three zero, Aviatory 452."`,
        ],
        "Significado: ATC anticipa que quizá no se pueda cumplir la restricción y da la alternativa. El piloto calcula, dice `UNABLE` con el motivo y confirma la alternativa.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Cambio de frecuencia condicionado a un nivel",
        [
          `ATC:   "Aviatory 452, when passing flight level eight zero, contact Bogota Control one two eight decimal seven five."`,
          `PILOT: "When passing flight level eight zero, one two eight decimal seven five, Aviatory 452."`,
        ],
        "Significado: no se cambia de frecuencia ya. Se cambia al cruzar FL 80. La condición se colaciona.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Ascenso por la SID (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, climb via SID to flight level two four zero."`,
          `PILOT: "Climb via SID to flight level two four zero, Aviatory 452."`,
        ],
        "Significado: ascender hasta FL 240 cumpliendo las restricciones de nivel y velocidad publicadas en la SID. Frase de la 16.ª ed. del Doc 4444 que no está en lo cargado: su uso y lo que cancela se confirman en el Doc 4444 vigente y en la AIP del Estado.",
      ),
      ...ejemplo(
        "Ejemplo 7 · Duda sobre las restricciones después de un rumbo (PLAIN LANGUAGE con palabra normalizada)",
        [
          `ATC:   "Aviatory 452, climb to flight level two four zero."`,
          `PILOT: "Aviatory 452, confirm SID speed restrictions still apply?"`,
          `ATC:   "Aviatory 452, affirm."`,
        ],
        "Significado: la tripulación ya va en rumbo y recibe un nivel sin la palabra `VIA`. En vez de suponer, pregunta con `CONFIRM`. La respuesta `AFFIRM` quiere decir que sí se mantienen.",
      ),
      {
        kind: "hueco",
        rotulo: "CM-19-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion: "Imagen sugerida: Vista en planta y perfil vertical de una SID ficticia «GIKOS 3D» desde una pista genérica. En el perfil, restricciones publicadas: «A o por encima de 5000 ft» en un punto intermedio, «FL 150 o superior» en GIKOS y «250 kt máx.» hasta un punto. Superpuesta en otro color, la trayectoria real cuando ATC da «turn right heading 040 until passing FL 70, then direct GIKOS»: se ve cómo el tramo lateral publicado queda abandonado. Etiquetas cortas: «Publicado», «Instrucción ATC», «¿Sigue vigente?». Objetivo: Que el piloto vea que una instrucción ATC reemplaza la parte de la SID que modifica, y que la duda sobre las demás restricciones se resuelve preguntando, no suponiendo.",
        alto: 280,
      },
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Antes y después del despegue",
        texto: "Antes del despegue, la tripulación compara la SID cargada en el FMS con la autorización: designador, transición, nivel inicial y restricciones. Después del despegue, cada instrucción de Departure se colaciona y se introduce en el FCU o MCP (nivel, rumbo, velocidad) según el SOP del operador. Quién habla y quién vuela lo define cada operador: casi siempre el PM gestiona la radio y el PF la trayectoria, pero no es una regla universal. Lo que es universal es que los dos escuchan y verifican lo que se seleccionó.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Suponer qué restricciones quedan vigentes", "**Suponer qué restricciones quedan vigentes** tras un rumbo o un nivel sin `VIA`. Un avión que se salta una restricción de altitud de la SID puede quedar en conflicto con una llegada que cruza por debajo."),
      error("Volar la SID de ayer", "Designadores parecidos (GIKOS 3D, GIKOS 3C) y la costumbre producen sesgo de expectativa: se lee lo que se esperaba."),
      error("Cambiar de frecuencia antes de la condición", "**Cambiar de frecuencia antes de la condición** («when passing flight level eight zero») o sin instrucción. Sin instrucción, el piloto informa antes de cambiar (Doc 9432, 2.8.2.1)."),
      error("Primera llamada incompleta", "**Primera llamada incompleta**: sin nivel autorizado, ATC no puede comprobar lo que el avión cree que tiene."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "La SID viene en la autorización de ruta y se colaciona completa.",
          "Una instrucción ATC manda sobre la parte de la SID que modifica.",
          "Si no sabes qué restricciones siguen vigentes, `CONFIRM`.",
          "Primera llamada a Departure: estación, distintivo, nivel de paso y autorizado, velocidad si fue asignada.",
          "`UNABLE` con motivo, a tiempo, es una respuesta profesional.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 4444 (15.ª ed., Enm. 4) cap. 1 «Salida normalizada por instrumentos (SID)»; 4.5.7.2.1; 4.5.7.5.1; 4.9.2; 4.11.3. Doc 9432 (4.ª ed.) 2.8.2.1; 2.8.3.3; 2.8.3.5 (ejemplo «WICKEN 3 DELTA DEPARTURE»); 2.8.3.10 (ejemplo «IF UNABLE, MAINTAIN»); 4.1.2; 4.5.4; 6.2.1 («IDENTIFIED»); 7.1.1; 7.1.2; 7.1 (ejemplo «TURN RIGHT HEADING 040 UNTIL PASSING FL 70 THEN DIRECT WICKEN VOR», «REPORT PASSING FL 70»); 3.3 («CLIMBING TO FL»).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: «CLIMB VIA SID TO (nivel)» y qué restricciones publicadas cancela o mantiene una instrucción de nivel sin «VIA», contra Doc 4444 16.ª ed. cap. 6 (salidas) y cap. 12 (fraseología de SID/STAR) (no cargado).",
              "VERIFICAR: frases de cancelación de restricciones de SID (del tipo «LEVEL RESTRICTION(S) CANCELLED», «SPEED RESTRICTION(S) CANCELLED», «CLIMB UNRESTRICTED») contra Doc 4444 16.ª ed. cap. 12 (no cargado). No se usan en los ejemplos por no estar confirmadas.",
              "VERIFICAR: qué debe decir exactamente la primera llamada a Departure en cada Estado, contra la AIP (en Colombia, AIP Colombia ENR y AD 2 del aeródromo).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 20 ──────────────────────────────────────────────────────────────────
  {
    n: 20,
    title: "Ascenso y cambios de nivel",
    kicker: "CLIMB, DESCEND, MAINTAIN y cuándo decir UNABLE",
    minutes: 9,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Las instrucciones de nivel son las que ATC da para ascender, descender o mantener. Son de las más críticas de la radio: un nivel mal escuchado puede poner a dos aviones a la misma altura.",
      },
      { kind: "p", text: "Cuatro definiciones que hay que tener limpias (Doc 4444, cap. 1):" },
      {
        kind: "glosario",
        items: [
          {
            k: "Altitud",
            v: "distancia vertical desde el nivel medio del mar. Se dice en pies o metros («five thousand feet»).",
          },
          {
            k: "Nivel de vuelo",
            v: "superficie de presión constante referida a 1013,2 hPa. Se dice con «flight level» delante («flight level one two zero»).",
          },
          {
            k: "Altitud de transición",
            v: "altitud a la cual o por debajo de la cual la posición vertical se controla por altitudes.",
          },
          {
            k: "Nivel de transición",
            v: "nivel de vuelo más bajo disponible por encima de la altitud de transición. Entre los dos queda la **capa de transición**.",
          },
        ],
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "Por debajo o en la altitud de transición se habla en altitudes; en o por encima del nivel de transición, en niveles de vuelo. Al cruzar la capa de transición se usan niveles de vuelo en ascenso y altitudes en descenso (Doc 4444, 4.10.1.1).",
          "El nivel de transición lo fija la dependencia ATS y se da antes de llegar a él en el descenso, por voz, ATIS o enlace de datos (Doc 4444, 4.10.2 y 4.10.4.3). El QNH va en la primera autorización para descender por debajo del nivel de transición (4.10.4.5).",
          "Si cambia cualquier parte de una autorización de nivel, **ATC repite la autorización de nivel completa** (Doc 9432, 3.3.3). Una instrucción nueva puede anular la anterior (3.3.3.2).",
          "Las instrucciones de nivel y los niveles de transición **siempre se colacionan** (Doc 4444, 4.5.7.5.1). En la colación, «flight level» antes de las cifras de un nivel de vuelo; «feet» o «metres» después de una altitud (Nota a 4.5.7.5.1).",
          "Decir «leaving» o «passing» sirve para algo: ATC puede autorizar a otro avión a un nivel que usted dejó **después de que usted notifique que lo dejó** (Doc 4444, 5.3.4.1).",
          "ATC también puede pedir un régimen de ascenso o descenso. Si no se puede cumplir, se informa (Doc 4444, 4.7.1.3).",
          "Los valores de altitud y nivel de transición varían por aeródromo y por Estado. En Colombia: AIP Colombia ENR 1.7 y AD 2 del aeródromo.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "Dos formas de esta lección no están en las fuentes cargadas: el pedido de un nivel específico «REQUEST (nivel)» con la respuesta «UNABLE (nivel) DUE TRAFFIC» (ejemplo 4) y la frase de régimen vertical «CLIMB AT (número) FEET PER MINUTE OR GREATER» (ejemplo 11). Consultar el Doc 4444 16.ª ed., cap. 12. La altitud y el nivel de transición en Colombia se confirman en la AIP Colombia ENR 1.7 y en el AD 2 de cada aeródromo.",
      },
      ...ejemplo(
        "Ejemplo 1 · Notifique nivel",
        [
          `ATC:   "Aviatory 452, report level."`,
          `PILOT: "Aviatory 452, maintaining flight level one two zero."`,
        ],
        "Significado: ATC pide el nivel actual. Se responde con el valor exacto, no con `ROGER`.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Ascenso",
        [
          `ATC:   "Aviatory 452, climb to flight level two four zero."`,
          `PILOT: "Leaving flight level one two zero climbing to flight level two four zero, Aviatory 452."`,
        ],
        "Significado: autorizado a FL 240. El piloto colaciona y dice qué nivel deja.",
      ),
      ...ejemplo(
        "Ejemplo 3 · El piloto pide descenso",
        [
          `PILOT: "Bogota Control, Aviatory 452, request descent."`,
          `ATC:   "Aviatory 452, descend to flight level two zero zero."`,
          `PILOT: "Leaving flight level three five zero descending to flight level two zero zero, Aviatory 452."`,
        ],
        "Significado: `REQUEST` pide, no autoriza. Hasta oír «descend to» el avión se queda en su nivel.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Pedir un nivel específico (VERIFICAR)",
        [
          `PILOT: "Aviatory 452, request flight level three seven zero."`,
          `ATC:   "Aviatory 452, unable flight level three seven zero due traffic."`,
          `PILOT: "Roger, Aviatory 452."`,
        ],
        "Significado: ATC no puede aprobar el cambio. Cuando lo justifiquen las circunstancias, debería ofrecer otro nivel (Doc 4444, 4.5.7.4.2). Aquí `ROGER` basta: no hay instrucción nueva.",
      ),
      ...ejemplo(
        "Ejemplo 5 · El piloto no puede (performance)",
        [
          `ATC:   "Aviatory 452, climb to flight level three nine zero."`,
          `PILOT: "Unable flight level three nine zero due performance, Aviatory 452."`,
          `ATC:   "Aviatory 452, roger, maintain flight level three five zero."`,
          `PILOT: "Maintaining flight level three five zero, Aviatory 452."`,
        ],
        "Significado: por peso o temperatura el avión no llega o no se sostiene en FL 390. `UNABLE` es normalizada; «due performance» es el motivo, como el «due weight» del Doc 9432. ATC da una alternativa.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Interrumpir el descenso",
        [
          `ATC:   "Aviatory 452, stop descent at flight level one five zero."`,
          `PILOT: "Stop descent at flight level one five zero, Aviatory 452."`,
        ],
        "Significado: la instrucción anterior (descender más bajo) queda anulada. El avión nivela en FL 150.",
      ),
      ...ejemplo(
        "Ejemplo 7 · Acelerar el ascenso hasta cruzar un nivel",
        [
          `ATC:   "Aviatory 452, climb to flight level two four zero, expedite until passing flight level one eight zero."`,
          `PILOT: "Climbing to flight level two four zero, expediting until passing flight level one eight zero, Aviatory 452."`,
          `(o) PILOT: "Unable to expedite, Aviatory 452."`,
        ],
        "Significado: ATC necesita un régimen mayor que el normal por tráfico. Si no se puede, se dice de inmediato.",
      ),
      ...ejemplo(
        "Ejemplo 8 · Nueva autorización",
        [
          `ATC:   "Aviatory 452, recleared flight level three three zero."`,
          `PILOT: "Recleared flight level three three zero, Aviatory 452."`,
        ],
        "Significado: `RECLEARED` invalida la autorización de nivel anterior o parte de ella (Doc 9432, 2.6).",
      ),
      ...ejemplo(
        "Ejemplo 9 · Descenso bajo el nivel de transición",
        [
          `ATC:   "Aviatory 452, descend to five thousand feet, QNH one zero one two, transition level seven zero."`,
          `PILOT: "Descending to five thousand feet, QNH one zero one two, transition level seven zero, Aviatory 452."`,
        ],
        "Significado: altitud en pies, QNH para el altímetro y nivel de transición. Los tres se colacionan.",
      ),
      ...ejemplo(
        "Ejemplo 10 · ATC verifica el altímetro",
        [
          `ATC:   "Aviatory 452, check altimeter setting and confirm level."`,
          `PILOT: "Aviatory 452, altimeter one zero one three, flight level eight zero."`,
        ],
        "Significado: lo que ve el radar no cuadra con lo que debería volar el avión. Se revisa el reglaje y se confirma el nivel.",
      ),
      ...ejemplo(
        "Ejemplo 11 · Régimen vertical (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, climb at two thousand feet per minute or greater."`,
          `PILOT: "Unable, Aviatory 452. We can give one thousand five hundred feet per minute."`,
        ],
        "Significado: ATC pide un régimen mínimo. La segunda frase del piloto es PLAIN LANGUAGE: dice lo que sí puede.",
      ),
      {
        kind: "hueco",
        rotulo: "CM-20-01 · Diagrama · 4:5 · 1080×1350 px",
        descripcion: "Imagen sugerida: Corte vertical simple. Abajo, el terreno y el aeródromo. Una línea horizontal «Altitud de transición» y, más arriba, otra «Nivel de transición»; entre las dos, una franja sombreada «Capa de transición». Un avión subiendo a la izquierda con la etiqueta «En ascenso: niveles de vuelo al cruzar la capa» y altímetro «1013». Un avión bajando a la derecha con «En descenso: altitudes al cruzar la capa» y altímetro «QNH». Ejemplos de voz en cada zona: «five thousand feet» abajo, «flight level one two zero» arriba. Objetivo: Que el piloto sepa cuándo decir «feet» y cuándo «flight level», y por qué se colaciona el nivel de transición.",
        alto: 420,
        ratio: "4 / 5",
        anchoMax: 420,
      },
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En cabina, al recibir un nivel",
        texto: "En cabina, un nivel colacionado no está terminado hasta que se selecciona en el FCU o MCP y el otro piloto lo verifica. Muchos SOP piden señalar y decir en voz alta el valor seleccionado. En el descenso, el cambio de 1013 a QNH al pasar el nivel de transición es un punto clásico de verificación cruzada. Cómo se hace exactamente depende del SOP de cada operador.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("FL 100 contra 10 000 pies", "«Flight level one zero zero» y «one zero thousand feet» no son lo mismo. Con QNH bajo, la diferencia puede ser de cientos de pies."),
      error("Colacionar solo el número", "**Colacionar solo el número** («two four zero, Aviatory 452»). Sin «flight level» o «feet» ATC no sabe si usted entendió nivel de vuelo o altitud."),
      error("«To» y «two»", "«Climb to two four zero» se puede oír como «climb two two four zero». Decir siempre «flight level» antes de las cifras evita la trampa."),
      error("Tomar el nivel de otro distintivo", "Aviatory 452 y Aviatory 542 en la misma frecuencia: el nivel se colaciona con el distintivo completo para que ATC lo note."),
      error("Nivelar tarde o pasarse", "**Nivelar tarde o pasarse** por no haber seleccionado el valor o por haberlo seleccionado mal. La colación correcta no sirve si el FCU dice otra cosa."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Altitud en pies con QNH; nivel de vuelo con 1013. Se dicen distinto.",
          "Todo nivel y todo nivel de transición se colaciona, con «flight level» o «feet».",
          "«Leaving» y «passing» liberan niveles para otros aviones.",
          "`REQUEST` no autoriza; `UNABLE` con motivo, apenas se sepa.",
          "Colacionar, seleccionar, verificar entre los dos pilotos.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 4444 (15.ª ed., Enm. 4) cap. 1 («Altitud», «Nivel», «Nivel de vuelo», «Altitud de transición», «Nivel de transición», «Capa de transición»); 4.5.7.4.2; 4.5.7.5.1 y su Nota; 4.7.1.3; 4.10.1.1; 4.10.2; 4.10.4.3; 4.10.4.5; 5.3.4.1. Doc 9432 (4.ª ed.) 2.6 («RECLEARED», «UNABLE»); 2.8.3.10; 3.3.2; 3.3.3; 3.3.3.1 a 3.3.3.3 (ejemplos «REPORT LEVEL», «CLIMB TO FL 70», «REQUEST DESCENT», «STOP DESCENT AT FL 150», «RECLEARED FL 330», «EXPEDITE UNTIL PASSING», «UNABLE TO EXPEDITE»); 6.5.1 («CHECK ALTIMETER SETTING AND CONFIRM LEVEL»); 7.3 («DESCEND TO 4 000 FEET QNH 1005 TRANSITION LEVEL 50»).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: «REQUEST (nivel)» como petición de nivel específico y la respuesta «UNABLE (nivel) DUE TRAFFIC», contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
              "VERIFICAR: fraseología de régimen vertical («CLIMB AT (número) FEET PER MINUTE OR GREATER») contra Doc 4444 16.ª ed. cap. 12 (no cargado). El concepto (4.7) sí está cargado.",
              "VERIFICAR: altitud y nivel de transición en Colombia contra AIP Colombia ENR 1.7 y AD 2 de cada aeródromo.",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 21 ──────────────────────────────────────────────────────────────────
  {
    n: 21,
    title: "Rumbo, directo y vectores",
    kicker: "Virajes, directos y retomar la navegación propia",
    minutes: 7,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "**Guía vectorial** es la navegación que ATC da en forma de rumbos específicos, usando un sistema de vigilancia ATS (Doc 4444, cap. 1). ATC vectoriza para identificar, separar, secuenciar o evitar tráfico. Cuando termina, devuelve al avión a su navegación: **resume own navigation**, casi siempre con un directo a un punto.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "Los rumbos de ATC y los que da el piloto son **magnéticos** (Doc 9432, 6.1.2). Se dicen con tres dígitos: «heading zero eight zero» (2.4.2). La palabra «degrees» se puede omitir en rumbos radar (3.1.3).",
          "ATC debería decir la razón del vector salvo que sea evidente (Doc 9432, 6.3.1): «for separation», «for sequencing».",
          "Rumbo no es derrota. El rumbo es hacia dónde apunta la nariz; con viento, la trayectoria sobre el suelo es otra. Si ATC dice «heading», se vuela rumbo.",
          "Al terminar la guía vectorial, ATC da `RESUME OWN NAVIGATION` con información de posición e instrucciones (Doc 9432, 6.3.3).",
          "Las instrucciones de rumbo se colacionan siempre (Doc 4444, 4.5.7.5.1). En el Doc 9432 la colación incluye el sentido del viraje: «left heading zero eight zero».",
          "Margen con el terreno: el Doc 4444 recuerda que prevenir colisiones con el terreno no está entre los objetivos del servicio ATC y que eso no libera al piloto de asegurarse de que la autorización es segura. Cuando un vuelo IFR va con guía vectorial o con un directo que lo saca de una ruta ATS, se aplica el cap. 8, 8.6.5.2 (Doc 4444, 4.10.3, Nota 3). Ese párrafo no está cargado: VERIFICAR qué responsabilidad asume ATC en ese caso.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "«PROCEED DIRECT (punto)» (ejemplo 9) no está en las fuentes cargadas: consultar el Doc 4444 16.ª ed., cap. 12. Qué responsabilidad asume ATC sobre el margen con el terreno durante la guía vectorial y los directos fuera de ruta ATS: Doc 4444, cap. 8, 8.6.5.2 (no cargado).",
      },
      ...ejemplo(
        "Ejemplo 1 · Viraje para separación",
        [
          `ATC:   "Aviatory 452, turn left heading zero five zero for separation."`,
          `PILOT: "Left heading zero five zero, Aviatory 452."`,
        ],
        "Significado: virar por la izquierda hasta rumbo 050. El piloto colacionó el sentido y el valor.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Volar un rumbo",
        [
          `ATC:   "Aviatory 452, fly heading two seven zero."`,
          `PILOT: "Heading two seven zero, Aviatory 452."`,
        ],
        "Significado: mantener o tomar rumbo 270.",
      ),
      ...ejemplo(
        "Ejemplo 3 · ATC pide el rumbo actual",
        [
          `ATC:   "Aviatory 452, report heading."`,
          `PILOT: "Aviatory 452, heading two seven zero."`,
          `ATC:   "Aviatory 452, roger, continue heading two seven zero."`,
          `PILOT: "Wilco, Aviatory 452."`,
        ],
        "Significado: ATC separa lateralmente con el rumbo que usted ya lleva. Desde aquí no se vuelve a la ruta sin instrucción.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Fin de la guía vectorial",
        [
          `ATC:   "Aviatory 452, position two zero miles west of PAXUM, resume own navigation direct PAXUM."`,
          `PILOT: "Direct PAXUM, Aviatory 452."`,
        ],
        "Significado: la guía vectorial terminó. ATC da la posición y el piloto navega por su cuenta directo a PAXUM.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Directo con derrota y distancia",
        [
          `ATC:   "Aviatory 452, resume own navigation direct PAXUM, track zero seven zero, distance two seven miles."`,
          `PILOT: "Track zero seven zero, two seven miles, direct PAXUM, Aviatory 452."`,
        ],
        "Significado: además del directo, ATC da la derrota y la distancia para que el piloto compruebe su navegación.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Viraje de 360 para secuencia",
        [
          `ATC:   "Aviatory 452, make a three sixty turn left for sequencing."`,
          `PILOT: "Three sixty turn left, Aviatory 452."`,
        ],
        "Significado: un viraje completo por la izquierda para demorar al avión y ordenar la secuencia (Doc 9432, 6.3.4).",
      ),
      ...ejemplo(
        "Ejemplo 7 · Maniobra de evitación",
        [
          `ATC:   "Aviatory 452, turn right immediately heading one one zero to avoid traffic twelve o'clock four miles."`,
          `PILOT: "Right heading one one zero, Aviatory 452."`,
        ],
        "Significado: riesgo inminente de colisión (Doc 9432, 6.7.2). Se vira ya y se colaciona corto.",
      ),
      ...ejemplo(
        "Ejemplo 8 · Tráfico, el piloto pide vectores",
        [
          `ATC:   "Aviatory 452, unknown traffic ten o'clock one one miles crossing left to right fast moving."`,
          `PILOT: "Aviatory 452, negative contact, request vectors."`,
          `ATC:   "Aviatory 452, turn left heading zero five zero."`,
          `PILOT: "Left heading zero five zero, Aviatory 452."`,
          `ATC:   "Aviatory 452, clear of traffic, resume own navigation direct GIKOS."`,
          `PILOT: "Direct GIKOS, Aviatory 452."`,
        ],
        "Significado: sin contacto visual, el piloto pide vectores. ATC avisa cuando el conflicto terminó (Doc 9432, 6.4.2).",
      ),
      ...ejemplo(
        "Ejemplo 9 · Directo (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, proceed direct GIKOS."`,
          `PILOT: "Direct GIKOS, Aviatory 452."`,
        ],
        "Significado: dejar la ruta y volar directo al punto. Frase del Doc 4444 cap. 12, no cargado.",
      ),
      ...ejemplo(
        "Ejemplo 10 · Rumbo sin sentido de viraje, casi opuesto (PLAIN LANGUAGE con palabra normalizada)",
        [
          `ATC:   "Aviatory 452, fly heading one eight zero."`,
          `PILOT: "Aviatory 452, confirm left or right turn heading one eight zero?"`,
          `ATC:   "Aviatory 452, turn right heading one eight zero."`,
          `PILOT: "Right heading one eight zero, Aviatory 452."`,
        ],
        "Significado: el avión va con rumbo 360. Por cualquier lado son 180°. Virar por el lado equivocado puede meterlo en el tráfico que ATC quería evitar. Se pregunta.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Con vectores y directos",
        texto: "Un vector se colaciona, se selecciona en el FCU o MCP y el otro piloto lo verifica, igual que un nivel. En aviones que tienen modo rumbo y modo derrota en el mismo selector, se revisa que el modo sea el que ATC pidió. Al recibir `RESUME OWN NAVIGATION` o un directo, se modifica la ruta en el FMS y se comprueba que la nueva trayectoria no deje por fuera restricciones de altitud que seguían vigentes.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Virar al lado contrario", "Colacionar sin el sentido del viraje esconde el error."),
      error("Rumbo contra derrota", "**Rumbo contra derrota**, o modo equivocado en el selector."),
      error("Volver a la ruta sin autorización", "**Volver a la ruta sin autorización** porque «el vector ya debería haber terminado». Con vectores, el avión se queda en el último rumbo hasta nueva instrucción."),
      error("Olvidar el terreno", "Un directo o un vector bajo en zona montañosa exige conciencia de la altitud mínima. Si algo no cuadra, se pregunta."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Rumbos magnéticos, tres dígitos, con sentido de viraje en la colación.",
          "Heading no es track.",
          "Sin instrucción, el avión sigue en el último rumbo asignado.",
          "`RESUME OWN NAVIGATION` cierra la guía vectorial.",
          "Si el sentido del viraje no está claro, `CONFIRM`.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 4444 (15.ª ed., Enm. 4) cap. 1 («Guía vectorial»); 4.5.7.5.1; 4.10.3, Nota 3. Doc 9432 (4.ª ed.) 2.4.2; 3.1.3 b); 6.1.2; 6.2.1; 6.3.1 a 6.3.4 (ejemplos «TURN LEFT HEADING 050 FOR SEPARATION», «FLY HEADING 050», «REPORT HEADING», «CONTINUE HEADING», «RESUME OWN NAVIGATION DIRECT … TRACK … DISTANCE», «MAKE A THREE SIXTY TURN LEFT FOR SEQUENCING»); 6.4.1 y 6.4.2 («NEGATIVE CONTACT, REQUEST VECTORS», «CLEAR OF TRAFFIC»); 6.7.2.",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: «PROCEED DIRECT (punto)» contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
              "VERIFICAR: responsabilidad sobre el margen con el terreno durante guía vectorial y directos fuera de ruta ATS, contra Doc 4444 cap. 8, 8.6.5.2 (no cargado).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 22 ──────────────────────────────────────────────────────────────────
  {
    n: 22,
    title: "Control de velocidad",
    kicker: "Reducir, aumentar y decir que no se puede",
    minutes: 7,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "El control de velocidad es la herramienta con la que ATC ajusta la distancia entre aviones sin cambiarles ruta ni nivel (Doc 4444, 4.6). Se usa sobre todo en la llegada, para armar la secuencia.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "Lo que dice el Doc 4444 (15.ª ed.) sobre cómo lo aplica ATC:" },
      {
        kind: "list",
        items: [
          "En FL 250 y por encima, los ajustes se dan en múltiplos de **0,01 Mach**; por debajo, en múltiplos de **10 kt IAS** (4.6.1.5).",
          "Por debajo de 250 kt IAS durante el descenso inicial de un reactor, solo con la aquiescencia de la tripulación (4.6.3.3). Por debajo de FL 150, no menos de 220 kt IAS, que suele estar cerca de la velocidad mínima en configuración limpia (4.6.3.5).",
          "En aproximación intermedia y final, solo ajustes menores de ±20 kt (4.6.3.6), y **nada de control de velocidad después de 4 NM del umbral** (4.6.3.7): la tripulación debe estar estabilizada, típicamente a 3 NM.",
          "No se aplica control de velocidad a quien entra o está en un circuito de espera (4.6.1.2).",
          "ATC debería evitar pedir a la vez descenso rápido y reducción de velocidad: son incompatibles (4.6.3.4).",
          "ATC avisa cuando la restricción ya no se requiere (4.6.1.6).",
        ],
      },
      { kind: "p", text: "Lo que le toca al piloto:" },
      {
        kind: "list",
        items: [
          "**Si en cualquier momento no puede cumplir una velocidad, lo dice** (4.6.1.4). ATC buscará otro método.",
          "Las instrucciones de velocidad se colacionan siempre (4.5.7.5.1).",
          "Con una velocidad asignada, se incluye en los reportes de posición y en la primera llamada tras un cambio de frecuencia (4.11.2.2 y 4.11.3).",
          "«Velocidad mínima limpia» es la mínima sin dispositivos hipersustentadores, frenos aerodinámicos ni tren (4.6.3.2, Nota).",
        ],
      },
      {
        kind: "p",
        text: "Todos estos valores son de la 15.ª ed. Confirmarlos en la edición vigente (VERIFICAR).",
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "Toda instrucción de velocidad de ATC de esta lección es por verificar, aunque el ejemplo no lo repita: «REDUCE SPEED TO», «MAINTAIN (número) KNOTS OR GREATER», «MAINTAIN MACH», «REDUCE TO MINIMUM CLEAN SPEED», «NO SPEED RESTRICTIONS», «MAINTAIN (número) KNOTS UNTIL (punto)». Consultar el Doc 4444 16.ª ed., cap. 12. La pronunciación del decimal del Mach («POINT» o «DECIMAL»): Doc 9432 y Anexo 10 Vol. II cap. 5. Los valores de 4.6 (250 kt, 220 kt bajo FL 150, ±20 kt, 4 NM) son de la 15.ª ed.: confirmarlos en la 16.ª ed. del Doc 4444, y las restricciones de velocidad publicadas en la AIP del Estado.",
      },
      {
        kind: "p",
        text: "Las frases de velocidad del Doc 4444 están en el cap. 12, no cargado. Toda instrucción de velocidad de ATC en este capítulo va con **(VERIFICAR)**, aunque el ejemplo no lo repita.",
      },
      ...ejemplo(
        "Ejemplo 1 · Reducir (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, reduce speed to two five zero knots."`,
          `PILOT: "Reduce speed to two five zero knots, Aviatory 452."`,
        ],
        "Significado: bajar a 250 kt IAS y mantenerlos hasta nueva instrucción.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Velocidad mínima, con «or greater» (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, maintain two eight zero knots or greater."`,
          `PILOT: "Two eight zero knots or greater, Aviatory 452."`,
        ],
        "Significado: no bajar de 280 kt. Puede ir más rápido.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Mach en crucero (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, maintain Mach point seven eight."`,
          `PILOT: "Mach point seven eight, Aviatory 452."`,
        ],
        "Significado: por encima de FL 250 la velocidad se asigna en número de Mach.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Velocidad mínima limpia (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, reduce to minimum clean speed."`,
          `PILOT: "Minimum clean speed, two one zero knots, Aviatory 452."`,
        ],
        "Significado: lo más lento posible sin flaps ni slats. Decir el valor (PLAIN LANGUAGE) ayuda a ATC a planear la secuencia.",
      ),
      ...ejemplo(
        "Ejemplo 5 · El piloto no puede",
        [
          `ATC:   "Aviatory 452, reduce speed to one eight zero knots."`,
          `PILOT: "Unable one eight zero knots, minimum clean speed two one zero knots, Aviatory 452."`,
        ],
        "Significado: el avión está alto y limpio. `UNABLE` es normalizada; el resto dice lo que sí puede. Aceptar y no cumplir es peor que decir que no.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Fin de la restricción (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, no speed restrictions."`,
          `PILOT: "No speed restrictions, Aviatory 452."`,
        ],
        "Significado: vuelve a la velocidad que la tripulación elija, dentro de los límites publicados del espacio aéreo.",
      ),
      ...ejemplo(
        "Ejemplo 7 · Primera llamada con velocidad asignada",
        [
          `PILOT: "Bogota Approach, Aviatory 452, passing flight level one six zero descending to flight level one two zero, two five zero knots."`,
          `ATC:   "Aviatory 452, Bogota Approach, roger."`,
        ],
        "Significado: la velocidad asignada va en la primera llamada tras el cambio de frecuencia (Doc 4444, 4.11.3). Los elementos están verificados; el orden y la redacción son un ejemplo.",
      ),
      ...ejemplo(
        "Ejemplo 8 · El piloto pide velocidad por turbulencia (PLAIN LANGUAGE)",
        [
          `PILOT: "Aviatory 452, moderate turbulence, request two seven zero knots."`,
          `ATC:   "Aviatory 452, two seven zero knots approved."`,
          `PILOT: "Two seven zero knots, Aviatory 452."`,
        ],
        "Significado: la tripulación necesita volar a su velocidad de turbulencia. Pide, espera aprobación y colaciona.",
      ),
      ...ejemplo(
        "Ejemplo 9 · Velocidad hasta un punto de la final (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, maintain one six zero knots until four miles final."`,
          `PILOT: "One six zero knots until four miles final, Aviatory 452."`,
        ],
        "Significado: después de 4 NM la velocidad queda en manos de la tripulación para estabilizar (Doc 4444, 4.6.3.7).",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En la llegada con secuencia",
        texto: "En la llegada a un aeropuerto con secuencia, lo normal es recibir varias velocidades. Cada una se colaciona, se selecciona y se verifica. Una velocidad asignada condiciona el perfil de descenso: si con ella el avión no puede bajar a tiempo para una restricción, se dice antes, no al llegar al punto. Cuándo configurar para cumplir una velocidad baja lo define el SOP del operador.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Aceptar una velocidad que el avión no puede volar", "**Aceptar una velocidad que el avión no puede volar** en ese peso y nivel."),
      error("Olvidar la velocidad asignada", "**Olvidar la velocidad asignada** al cambiar de frecuencia, y no decirla en la primera llamada."),
      error("Seguir con la restricción", "**Seguir con la restricción** cuando ATC ya la quitó, o quitarla sin que ATC lo diga."),
      error("Confundir Mach con IAS", "**Confundir Mach con IAS** en el cambio de uno a otro durante el descenso."),
      error("Pedir descenso rápido y reducción a la vez", "**Pedir descenso rápido y reducción a la vez** sin avisar que no se puede."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "La velocidad se colaciona siempre.",
          "Si no puede, `UNABLE` y lo que sí puede.",
          "Velocidad asignada: va en la primera llamada y en los reportes de posición.",
          "Dentro de 4 NM del umbral ATC no debería asignar velocidad.",
          "Sin instrucción que la quite, la restricción sigue.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1; 4.6.1.1 a 4.6.1.6; 4.6.3.1 a 4.6.3.7 y Notas; 4.11.2.2; 4.11.3. Doc 9432 (4.ª ed.) 2.6 («UNABLE»); 2.8.3.10.",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: toda la fraseología de velocidad de los ejemplos («REDUCE SPEED TO», «MAINTAIN (número) KNOTS OR GREATER», «MAINTAIN MACH», «REDUCE TO MINIMUM CLEAN SPEED», «NO SPEED RESTRICTIONS», «MAINTAIN (número) KNOTS UNTIL (punto)») contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
              "VERIFICAR: pronunciación del decimal del número de Mach («POINT» o «DECIMAL») contra Doc 9432 y Anexo 10 Vol. II cap. 5 (no cargado).",
              "VERIFICAR: que los valores de 4.6 (250 kt, 220 kt bajo FL 150, ±20 kt, 4 NM) sigan iguales en la 16.ª ed. del Doc 4444, y las restricciones de velocidad publicadas por el Estado en su AIP.",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 23 ──────────────────────────────────────────────────────────────────
  {
    n: 23,
    title: "Crucero",
    kicker: "Reportes, solicitudes y cambios de frecuencia",
    minutes: 6,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "El crucero parece la fase tranquila, pero la radio no para: transferencias entre sectores, llamadas iniciales, pedidos de nivel y de directo, reportes de meteorología y, donde no hay radar, reportes de posición. La tarea del piloto es **saber siempre en qué frecuencia está, cuál sigue y qué tiene autorizado**.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "La dependencia ATS dice cuándo cambiar de frecuencia. Si no lo dice, **el piloto informa antes de cambiar** (Doc 9432, 2.8.2.1).",
          "`CONTACT` es llamar en la frecuencia nueva. `STAND BY FOR` (quede en escucha) es pasar a la frecuencia y esperar, porque la dependencia lo va a llamar pronto. `MONITOR` es escuchar una frecuencia donde se radiodifunde información (Doc 9432, 2.6 y 2.8.2.2).",
          "En la primera llamada después de un cambio de canal va el nivel, aunque la región permita omitirlo en los reportes de posición (Doc 4444, 4.11.2.1.1), y la velocidad si fue asignada (4.11.2.2).",
          "ATC ofrece la ruta más directa siempre que el espacio aéreo, la carga de trabajo y el tráfico lo permitan (Doc 4444, 4.5.7.2.3). Pedir un directo es normal; no es un favor.",
          "El avión que ya está en un nivel de crucero normalmente tiene prioridad sobre otros que piden ese nivel (Doc 4444, 5.3.3.7). A veces la respuesta a un pedido de nivel es «no» por eso.",
          "Turbulencia moderada o fuerte, engelamiento moderado o fuerte, ondas orográficas fuertes, ciertas tormentas, tempestades de polvo o arena, cenizas y actividad volcánica: **se notifican con una aeronotificación especial** (Doc 4444, 4.12.3.1). Por voz lleva: tipo de mensaje, identificación, posición, hora, nivel y la condición (4.12.3.3).",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "«REQUEST DIRECT (punto)» y «PROCEED DIRECT (punto)» (ejemplo 5) y la forma «REQUEST (nivel) DUE (motivo)» (ejemplo 6) no están en las fuentes cargadas: consultar el Doc 4444 16.ª ed., cap. 12. La redacción oral de la aeronotificación especial («AIREP SPECIAL», ejemplo 7): Doc 4444, Apéndice 1 (no cargado).",
      },
      ...ejemplo(
        "Ejemplo 1 · Transferencia a otro sector",
        [
          `ATC:   "Aviatory 452, contact Bogota Control one two eight decimal seven."`,
          `PILOT: "One two eight decimal seven, Aviatory 452."`,
        ],
        "Significado: cambiar a 128.7 y llamar. Se colaciona la frecuencia.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Primera llamada en el sector nuevo",
        [
          `PILOT: "Bogota Control, Aviatory 452, flight level three five zero."`,
          `ATC:   "Aviatory 452, Bogota Control, identified."`,
        ],
        "Significado: se dice el nivel para que el controlador lo compare con lo que ve en pantalla.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Quede en escucha",
        [
          `ATC:   "Aviatory 452, stand by for Bogota Control one three two decimal two."`,
          `PILOT: "One three two decimal two, Aviatory 452."`,
        ],
        "Significado: pasar a 132.2 y esperar la llamada del controlador (Doc 9432, 2.8.2.2).",
      ),
      ...ejemplo(
        "Ejemplo 4 · Haga escucha",
        [
          `ATC:   "Aviatory 452, monitor ATIS one two three decimal two five."`,
          `PILOT: "Monitoring one two three decimal two five, Aviatory 452."`,
        ],
        "Significado: escuchar la radiodifusión, no transmitir en ella.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Pedir un directo (VERIFICAR)",
        [
          `PILOT: "Aviatory 452, request direct KUBIN."`,
          `ATC:   "Aviatory 452, proceed direct KUBIN."`,
          `PILOT: "Direct KUBIN, Aviatory 452."`,
        ],
        "Significado: el directo ahorra tiempo y combustible. Mientras no llegue la autorización, el avión sigue su ruta.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Pedir nivel por turbulencia (VERIFICAR la forma del pedido)",
        [
          `PILOT: "Aviatory 452, request flight level three seven zero due moderate turbulence."`,
          `ATC:   "Aviatory 452, climb to flight level three seven zero."`,
          `PILOT: "Leaving flight level three five zero climbing to flight level three seven zero, Aviatory 452."`,
        ],
        "Significado: el motivo le dice a ATC que otros aviones a ese nivel tendrán lo mismo.",
      ),
      ...ejemplo(
        "Ejemplo 7 · Aeronotificación especial (VERIFICAR la redacción)",
        [
          `PILOT: "Bogota Control, Aviatory 452, AIREP special."`,
          `ATC:   "Aviatory 452, Bogota Control."`,
          `PILOT: "Aviatory 452, GIKOS at four five, flight level three five zero, moderate turbulence."`,
          `ATC:   "Aviatory 452, roger."`,
        ],
        "Significado: los elementos (identificación, posición, hora, nivel, condición) están en el Doc 4444, 4.12.3.3. La redacción exacta está en el Apéndice 1, no cargado. ATC la pasa a la oficina meteorológica (4.12.6.3). Fíjese en la respuesta de ATC: su distintivo y el de la estación. El Doc 9432 omitió «GO AHEAD»; esa respuesta ya es la invitación a transmitir (2.6, Nota).",
      ),
      ...ejemplo(
        "Ejemplo 8 · Próxima notificación",
        [
          `ATC:   "Aviatory 452, next report KUBIN."`,
          `PILOT: "Wilco, Aviatory 452."`,
        ],
        "Significado: el próximo reporte de posición es en KUBIN (Doc 9432, 3.4.2).",
      ),
      ...ejemplo(
        "Ejemplo 9 · Sin respuesta en la frecuencia nueva (PLAIN LANGUAGE)",
        [
          `PILOT: "Bogota Control, Aviatory 452, no reply on one three two decimal two."`,
          `ATC:   "Aviatory 452, contact Bogota Control one three two decimal eight five."`,
          `PILOT: "One three two decimal eight five, Aviatory 452."`,
        ],
        "Significado: si la frecuencia nueva no responde, lo primero es volver a la anterior y avisar. La falla de comunicaciones se trata en el capítulo 32.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En crucero",
        texto: "En crucero muchas tripulaciones dejan preseleccionada en la radio de reserva la frecuencia siguiente o la anterior, y anotan en el plan de vuelo la frecuencia activa. Cuando uno de los pilotos sale del puesto (descanso, baño), el que queda asume la radio y lo que se autorizó mientras tanto se le cuenta al otro al volver. Cómo se reparte y se registra lo define el SOP.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Perder la frecuencia", "**Perder la frecuencia**: aceptar un cambio, sintonizar mal y quedarse sin contacto sin darse cuenta."),
      error("Confundir `MONITOR` con `CONTACT`", "**Confundir `MONITOR` con `CONTACT`**: llamar en una frecuencia de radiodifusión, o no llamar cuando había que hacerlo."),
      error("Callar la turbulencia", "**Callar la turbulencia**: no hacer la aeronotificación deja a los que vienen atrás sin aviso."),
      error("Tomar el directo como autorizado", "**Tomar el directo como autorizado** porque «siempre lo dan»."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "`CONTACT` llama; `STAND BY FOR` espera la llamada; `MONITOR` solo escucha.",
          "Sin instrucción, avisar antes de cambiar de frecuencia.",
          "Primera llamada en sector nuevo: nivel, y velocidad si está asignada.",
          "Turbulencia o engelamiento moderado o fuerte: aeronotificación especial.",
          "Frecuencia activa y siguiente, siempre claras en cabina.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 4444 (15.ª ed., Enm. 4) 4.5.7.2.3; 4.11.2.1.1; 4.11.2.2; 4.12.3.1; 4.12.3.3; 4.12.6.3; 5.3.3.1; 5.3.3.7. Doc 9432 (4.ª ed.) 2.6 («CONTACT», «MONITOR», «STANDBY»); 2.6, Nota (se omitió «GO AHEAD»: la respuesta con los distintivos invita a transmitir); 2.8.2.1; 2.8.2.2 («STAND BY FOR … TOWER», «MONITOR ATIS»); 3.4.2 («NEXT REPORT»); 6.2.1 («IDENTIFIED»).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: «REQUEST DIRECT (punto)» y «PROCEED DIRECT (punto)» contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
              "VERIFICAR: «REQUEST (nivel) DUE (motivo)» contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
              "VERIFICAR: redacción oral de la aeronotificación especial («AIREP SPECIAL») contra Doc 4444 Apéndice 1 (no cargado).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 24 ──────────────────────────────────────────────────────────────────
  {
    n: 24,
    title: "Reportes de posición",
    kicker: "Qué lleva un reporte y cuándo se da",
    minutes: 6,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "El reporte de posición le dice a ATC dónde está el avión, a qué hora, a qué nivel y qué viene después. Con radar o ADS casi no se usa; sin vigilancia (zonas remotas, oceánicas o con radar fuera de servicio) es la base de la separación.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "**Los seis elementos** (Doc 9432, 3.4.1; Doc 4444, 4.11.2.1):" },
      {
        kind: "list",
        items: [
          "Identificación de la aeronave.",
          "Posición.",
          "Hora.",
          "Nivel de vuelo o altitud, incluidos el nivel de paso y el autorizado si no se mantiene el autorizado.",
          "Próxima posición y hora estimada sobre ella.",
          "Punto significativo siguiente.",
        ],
        ordered: true,
      },
      {
        kind: "list",
        items: [
          "Los elementos 4, 5 y 6 se pueden omitir si lo prescribe un acuerdo regional de navegación aérea. El 4 va siempre en la primera llamada tras cambiar de frecuencia.",
          "Si ATC asignó una velocidad, se incluye (Doc 4444, 4.11.2.2).",
          "**Cuándo**: en rutas con puntos de notificación obligatoria, al pasar cada uno. En rutas sin puntos designados, a la primera media hora de vuelo y luego cada hora (Doc 4444, 4.11.1.1 y 4.11.1.2).",
          "Con datos de vigilancia adecuados, ATC puede eximir de reportar (Doc 9432, 3.4.2; Doc 4444, 4.11.1.3).",
          "Cuando se prescribe, el último reporte antes de pasar a otra FIR se da también a la dependencia de la FIR siguiente (Doc 4444, 4.11.1.4).",
          "Si un reporte no llega a la hora prevista, ATC no supone que el avión va a tiempo: lo busca (Doc 4444, 4.11.1.5). Un reporte tarde genera llamadas y trabajo.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "«REPORT ESTIMATE (punto)» (ejemplo 7) no está en las fuentes cargadas: consultar el Doc 4444 16.ª ed., cap. 12. La forma del reporte por HF («POSITION» como llamada, ejemplo 8), el formato de coordenadas y la tolerancia para corregir estimados: Doc 4444 cap. 12, Doc 7030 (procedimientos suplementarios regionales) y AIP del Estado (no cargados).",
      },
      ...ejemplo(
        "Ejemplo 1 · Reporte completo",
        [
          `PILOT: "Aviatory 452, GIKOS four seven, flight level three three zero, PAXUM five seven, RODEL next."`,
          `ATC:   "Aviatory 452, roger."`,
        ],
        "Significado: sobre GIKOS al minuto 47, FL 330, estimando PAXUM al minuto 57, siguiente RODEL. `ROGER` basta: es información, no una instrucción.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Reporte con velocidad asignada (orden ilustrativo)",
        [
          `PILOT: "Aviatory 452, PAXUM one two, flight level three five zero, Mach point seven eight, RODEL three four, KUBIN next."`,
          `ATC:   "Aviatory 452, roger."`,
        ],
        "Significado: se agregó la velocidad asignada. El Doc 4444 exige incluirla pero lo cargado no fija su lugar en el reporte.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Reporte sin estar en el nivel autorizado",
        [
          `PILOT: "Aviatory 452, KUBIN two zero, passing flight level two six zero climbing to flight level three three zero, LOSAM four one, TOMUR next."`,
          `ATC:   "Aviatory 452, roger."`,
        ],
        "Significado: el elemento 4 lleva nivel de paso y nivel autorizado.",
      ),
      ...ejemplo(
        "Ejemplo 4 · ATC fija el próximo reporte",
        [
          `ATC:   "Aviatory 452, next report RODEL."`,
          `PILOT: "Wilco, Aviatory 452."`,
        ],
        "Significado: puede omitir los puntos intermedios y reportar en RODEL.",
      ),
      ...ejemplo(
        "Ejemplo 5 · ATC exime de reportes",
        [
          `ATC:   "Aviatory 452, omit position reports until FIR boundary, next report RODEL."`,
          `PILOT: "Wilco, Aviatory 452."`,
        ],
        "Significado: no reportar hasta el límite de la FIR; el siguiente reporte es en RODEL.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Reanudar reportes",
        [
          `ATC:   "Aviatory 452, resume position reporting."`,
          `PILOT: "Wilco, Aviatory 452."`,
        ],
        "Significado: vuelven los reportes en cada punto obligatorio. Suele pasar cuando se pierde la vigilancia.",
      ),
      ...ejemplo(
        "Ejemplo 7 · ATC pide un estimado (VERIFICAR la forma de la pregunta)",
        [
          `ATC:   "Aviatory 452, report estimate PAXUM."`,
          `PILOT: "Aviatory 452, estimating PAXUM one four."`,
        ],
        "Significado: estimado sobre PAXUM al minuto 14. «Estimating» aparece en el Doc 9432 (3.5.2 y 7.3).",
      ),
      ...ejemplo(
        "Ejemplo 8 · Reporte procedimental en zona sin radar, por HF (VERIFICAR)",
        [
          `PILOT: "Oceanic Radio, Aviatory 452, position."`,
          `ATC:   "Aviatory 452, Oceanic Radio."`,
          `PILOT: "Aviatory 452, zero five north zero four zero west at one two three zero, flight level three five zero, estimating zero eight north zero four five west at one three one five, next zero one one north zero five zero west."`,
          `ATC:   "Aviatory 452, roger."`,
        ],
        "Significado: estación y coordenadas ficticias. Los seis elementos son los mismos; cambia que la posición va en coordenadas y la hora completa. La operación oceánica, HF y SELCAL están en el nivel 6.",
      ),
      {
        kind: "hueco",
        rotulo: "CM-24-01 · Esquema · 4:5 · 1080×1350 px",
        descripcion: "Imagen sugerida: Tarjeta vertical de bolsillo con seis casillas numeradas: 1 «Quién» (Aviatory 452), 2 «Dónde» (GIKOS), 3 «Cuándo» (47), 4 «Nivel» (FL 330), 5 «Próximo y estimado» (PAXUM 57), 6 «Siguiente» (RODEL). Al lado de cada casilla, la palabra inglesa como se dice por radio. Una nota al pie: «4, 5 y 6 pueden omitirse por acuerdo regional; el nivel va siempre en la primera llamada tras cambiar de frecuencia». Objetivo: Que el piloto memorice el orden de los seis elementos y pueda armar un reporte sin pensar.",
        alto: 420,
        ratio: "4 / 5",
        anchoMax: 420,
      },
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En rutas procedimentales",
        texto: "En rutas procedimentales, el plan de vuelo operacional trae los puntos, los estimados y espacio para anotar la hora real y el combustible. La tripulación arma el reporte sobre ese papel o sobre la página del FMS antes de llamar, para no transmitir improvisando. Si el estimado al punto siguiente cambia en más de lo que tolera la región, se corrige con ATC; el umbral lo fija cada región en sus procedimientos suplementarios y AIP (VERIFICAR).",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Mezclar el orden", "**Mezclar el orden** y que ATC tenga que pedir de nuevo el reporte."),
      error("Estimado equivocado", "**Estimado equivocado** por leer el tiempo de otro punto en el FMS."),
      error("Olvidar el nivel en la primera llamada", "**Olvidar el nivel en la primera llamada** tras cambiar de frecuencia."),
      error("Reportar tarde", "**Reportar tarde** y generar una búsqueda innecesaria."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Quién, dónde, cuándo, nivel, próximo con estimado, siguiente.",
          "Velocidad asignada: va en el reporte.",
          "Con radar, ATC puede eximir; `RESUME POSITION REPORTING` las devuelve.",
          "Preparar el reporte antes de apretar el PTT.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 9432 (4.ª ed.) 2.6, Nota (respuesta con distintivos en lugar de «GO AHEAD»); 3.4.1 (ejemplo «WICKEN 47 FL 330 MARLO 57 COLIN NEXT»); 3.4.2 («NEXT REPORT», «OMIT POSITION REPORTS UNTIL FIR BOUNDARY», «RESUME POSITION REPORTING»); 3.5.2 y 7.3 («ESTIMATING»). Doc 4444 (15.ª ed., Enm. 4) cap. 1 («Punto de notificación»); 4.11.1.1 a 4.11.1.5; 4.11.2.1; 4.11.2.1.1; 4.11.2.2.",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: «REPORT ESTIMATE (punto)» contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
              "VERIFICAR: forma del reporte por HF («POSITION» como llamada), formato de coordenadas y tolerancia para corregir estimados, contra Doc 4444 cap. 12, Doc 7030 (procedimientos suplementarios regionales) y AIP del Estado (no cargados).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 25 ──────────────────────────────────────────────────────────────────
  {
    n: 25,
    title: "Desvíos por meteorología",
    kicker: "Cómo pedir un desvío con claridad",
    minutes: 7,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Es salirse de la ruta o del nivel autorizado para evitar tormentas, turbulencia u otra meteorología significativa. En Latinoamérica, con convección fuerte buena parte del año, es comunicación de todos los días.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "Un desvío es un **cambio de la autorización**. Se pide y se espera la aprobación, igual que un nivel. Cuando se concede, ATC debería decir exactamente qué cambió (Doc 4444, 4.5.7.4.1). Si no puede, dice `UNABLE` y, cuando se justifique, ofrece una alternativa (4.5.7.4.2).",
          "Una solicitud clara tiene cinco partes:",
        ],
      },
      {
        kind: "list",
        items: [
          "**Qué**: desvío izquierda o derecha, un rumbo, o un nivel.",
          "**Cuánto**: millas desde la ruta, o el rumbo.",
          "**Por qué**: «due weather».",
          "**Hasta dónde o por cuánto tiempo**: «for about three zero miles», «back on track at GIKOS».",
          "**Cuándo**: pedirlo con anticipación, no cuando ya se está encima de la celda.",
        ],
        ordered: true,
      },
      {
        kind: "list",
        items: [
          "No existe una frase estándar para cada situación de meteorología. Cuando la fraseología no alcanza, se usa lenguaje claro, tan claro y conciso como la fraseología, sin charla (Doc 9432, 3.2.3 y 3.2.4).",
          "Turbulencia o tormentas que cumplan los criterios de 4.12.3.1 se notifican con aeronotificación especial (Doc 4444).",
          "Si no se puede obtener autorización a tiempo y hay que desviarse, existe un procedimiento de contingencia OACI (Doc 4444, cap. 15, no cargado): VERIFICAR su contenido antes de enseñarlo. La autoridad final sobre la seguridad del vuelo es del piloto al mando; la urgencia y el socorro se tratan en el nivel 5.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "La fraseología de desvío por meteorología de los ejemplos («REQUEST (número) MILES LEFT/RIGHT OF TRACK DUE WEATHER», «DEVIATION UP TO (número) MILES LEFT/RIGHT OF TRACK APPROVED», «REPORT BACK ON TRACK», «REPORT CLEAR OF WEATHER», «UNABLE (dirección) DEVIATION DUE TRAFFIC») y «PROCEED DIRECT (punto)» no están en las fuentes cargadas: consultar el Doc 4444 16.ª ed., cap. 12. El procedimiento de contingencia para desviarse sin autorización ATC: Doc 4444 16.ª ed., cap. 15 (no cargado).",
      },
      {
        kind: "p",
        text: "La fraseología de desvío por meteorología está en el Doc 4444 cap. 12, no cargado. Los ejemplos con **(VERIFICAR)** siguen la forma que Camilo dio como ejemplo conceptual.",
      },
      ...ejemplo(
        "Ejemplo 1 · Pedir desvío lateral (VERIFICAR)",
        [
          `PILOT: "Bogota Control, Aviatory 452, request two zero miles right of track due weather."`,
          `ATC:   "Aviatory 452, deviation up to two zero miles right of track approved, report back on track."`,
          `PILOT: "Up to two zero miles right of track, wilco, Aviatory 452."`,
        ],
        "Significado: puede separarse hasta 20 NM a la derecha de la ruta. Debe avisar cuando vuelva a ella.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Avisar con anticipación (PLAIN LANGUAGE)",
        [
          `PILOT: "Bogota Control, Aviatory 452, weather ahead on our track. In about four zero miles we will need to deviate right, up to two zero miles."`,
          `ATC:   "Aviatory 452, roger, expect deviation right, call me when ready."`,
          `PILOT: "Wilco, Aviatory 452."`,
        ],
        "Significado: el piloto le da tiempo al controlador para mover el tráfico. Frases cortas, números concretos, una idea por frase.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Pedir un rumbo (VERIFICAR la forma del pedido)",
        [
          `PILOT: "Aviatory 452, request heading one two zero due weather."`,
          `ATC:   "Aviatory 452, turn right heading one two zero, report clear of weather."`,
          `PILOT: "Right heading one two zero, wilco, Aviatory 452."`,
        ],
        "Significado: en área terminal a veces es más simple pedir un rumbo que un desvío en millas.",
      ),
      ...ejemplo(
        "Ejemplo 4 · ATC no puede hacia el lado pedido (VERIFICAR)",
        [
          `PILOT: "Aviatory 452, request deviation right of track due weather."`,
          `ATC:   "Aviatory 452, unable right deviation due traffic. Left deviation up to one five miles approved."`,
          `PILOT: "Aviatory 452, left of track is also weather. Request descent to flight level three one zero."`,
        ],
        "Significado: si la alternativa no sirve, se dice y se propone otra. La segunda frase del piloto es PLAIN LANGUAGE.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Incapaz de mantener la ruta (UNABLE + PLAIN LANGUAGE)",
        [
          `PILOT: "Bogota Control, Aviatory 452, unable to maintain track due weather. Request immediate deviation left up to three zero miles."`,
          `ATC:   "Aviatory 452, deviation left up to three zero miles approved, report back on track."`,
          `PILOT: "Left up to three zero miles, wilco, Aviatory 452."`,
        ],
        "Significado: «unable to maintain track» dice el problema, «request immediate» dice la urgencia sin llegar a socorro.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Turbulencia y cambio de nivel (VERIFICAR la forma del pedido)",
        [
          `PILOT: "Aviatory 452, severe turbulence at flight level three five zero. Request descent to flight level three one zero."`,
          `ATC:   "Aviatory 452, descend to flight level three one zero."`,
          `PILOT: "Leaving flight level three five zero descending to flight level three one zero, Aviatory 452."`,
        ],
        "Significado: turbulencia fuerte es condición de aeronotificación especial (Doc 4444, 4.12.3.1). ATC la usará para avisar a otros.",
      ),
      ...ejemplo(
        "Ejemplo 7 · Volver a la ruta (VERIFICAR)",
        [
          `PILOT: "Aviatory 452, clear of weather, request direct GIKOS."`,
          `ATC:   "Aviatory 452, proceed direct GIKOS."`,
          `PILOT: "Direct GIKOS, Aviatory 452."`,
        ],
        "Significado: el desvío terminó. El piloto no vuelve a la ruta por su cuenta si ATC le dio un rumbo; pide.",
      ),
      {
        kind: "hueco",
        rotulo: "CM-25-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion: "Imagen sugerida: Vista en planta de una ruta recta entre dos waypoints ficticios (GIKOS y PAXUM) con una línea de celdas convectivas en rojo y amarillo tipo radar meteorológico sobre la ruta. Un avión que se separa a la derecha, con una cota «hasta 20 NM» y un punto «back on track». Encima, un globo de diálogo con las cinco partes de la solicitud: QUÉ (right of track), CUÁNTO (20 miles), POR QUÉ (due weather), HASTA DÓNDE (back on track at PAXUM), CUÁNDO (40 NM antes). Colores de la celda solo como representación de radar meteorológico, no como código de alerta de la app. Objetivo: Que el piloto arme una solicitud de desvío completa y la pida con anticipación.",
        alto: 280,
      },
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Frente a la convección",
        texto: "La decisión de desviarse sale del radar meteorológico de a bordo y de lo que reportan otros aviones. En la frecuencia se escucha a quienes van adelante: si todos piden la derecha, ATC ya está preparando ese lado. Qué distancia mínima mantener de una celda lo define el operador en su manual; no es fraseología.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Pedir tarde", "**Pedir tarde**, encima de la celda, cuando ATC ya no tiene espacio para mover el tráfico."),
      error("Solicitud incompleta", "**Solicitud incompleta**: «request deviation» sin lado ni distancia obliga a otro intercambio."),
      error("Desviarse sin decir nada", "**Desviarse sin decir nada** cuando había tiempo para pedir."),
      error("Olvidar el «report back on track»", "**Olvidar el «report back on track»** y dejar a ATC sin saber dónde termina el desvío."),
      error("Hablar de más en lenguaje claro", "**Hablar de más en lenguaje claro**: explicar la tormenta en vez de pedir lo que se necesita."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Un desvío se pide y se autoriza como cualquier cambio.",
          "Qué, cuánto, por qué, hasta dónde, y con tiempo.",
          "`UNABLE` a la alternativa, más una propuesta.",
          "Turbulencia o tormenta significativa: aeronotificación especial.",
          "Si hay que actuar sin autorización, hay procedimiento de contingencia (verificar Doc 4444 cap. 15).",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 4444 (15.ª ed., Enm. 4) 4.5.7.4.1; 4.5.7.4.2; 4.12.3.1; 4.12.3.3. Doc 9432 (4.ª ed.) 2.6 («UNABLE», «WILCO»); 3.2.3; 3.2.4; 3.3 («DESCEND TO FL»); 6.3 («TURN RIGHT HEADING»).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: «REQUEST (número) MILES LEFT/RIGHT OF TRACK DUE WEATHER», «DEVIATION UP TO (número) MILES LEFT/RIGHT OF TRACK APPROVED», «REPORT BACK ON TRACK», «REPORT CLEAR OF WEATHER» y «UNABLE (dirección) DEVIATION DUE TRAFFIC», contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
              "VERIFICAR: procedimiento de contingencia para desvío por meteorología sin autorización ATC, contra Doc 4444 16.ª ed. cap. 15 (no cargado).",
              "VERIFICAR: «PROCEED DIRECT (punto)» contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 26 ──────────────────────────────────────────────────────────────────
  {
    n: 26,
    title: "STAR y llegada",
    kicker: "La llegada autorizada y lo que la modifica",
    minutes: 8,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "La **STAR** (llegada normalizada por instrumentos) es una ruta de llegada IFR publicada que une un punto significativo, normalmente en una ruta ATS, con un punto donde puede empezar una aproximación por instrumentos publicada (Doc 4444, cap. 1). La llegada termina de armarse con Approach: pista, tipo de aproximación, QNH, nivel de transición y secuencia.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "Cuando la STAR está publicada en la AIP, la autorización puede nombrarla por su designador («autorizado llegada vía (designación)», Doc 4444, 4.5.7.2.1).",
          "En el contacto inicial, Approach normalmente dice qué aproximación esperar. El nivel de transición se puede omitir si está publicado en la AIP (Doc 9432, 7.3.1).",
          "En el primer contacto con el aeródromo se acusa recibo del ATIS (Doc 9432, 4.6.2 y 7.3).",
          "El QNH va en la primera autorización para descender por debajo del nivel de transición (Doc 4444, 4.10.4.5).",
          "**Una instrucción que modifica parte de la STAR** (un directo, un rumbo, un nivel, una velocidad) cambia esa parte. Qué pasa con las restricciones publicadas que quedan es lo que regula la fraseología `DESCEND VIA STAR` en la 16.ª ed. del Doc 4444 (VERIFICAR). Si queda duda: `CONFIRM`.",
          "`EXPECT` da información para planear, **no autoriza**. «Expect ILS approach runway three one» no es autorización de aproximación.",
          "En el descenso inicial de un reactor, ATC solo debería pedir menos de 250 kt con la aquiescencia de la tripulación (Doc 4444, 4.6.3.3). Ver capítulo 22.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "No están en las fuentes cargadas: «CLEARED (designador) ARRIVAL» como forma inglesa de «autorizado llegada vía (designación)» (ejemplo 1); «DESCEND VIA STAR TO (nivel)» (ejemplo 2) y qué restricciones publicadas quedan vigentes tras una instrucción de nivel sin «VIA» o un directo; «PROCEED DIRECT (punto)» (ejemplo 6) y «REDUCE SPEED TO (número) KNOTS» (ejemplo 8). Consultar el Doc 4444 16.ª ed., caps. 6 y 12, y la AIP del Estado.",
      },
      ...ejemplo(
        "Ejemplo 1 · Autorización con la STAR (VERIFICAR la redacción inglesa)",
        [
          `ATC:   "Aviatory 452, cleared PAXUM two Bravo arrival, descend to flight level one two zero."`,
          `PILOT: "Cleared PAXUM two Bravo arrival, descending to flight level one two zero, Aviatory 452."`,
        ],
        "Significado: seguir la STAR PAXUM 2B y descender a FL 120. El Doc 4444 cargado da la forma en español («autorizado llegada vía»); la inglesa está en el cap. 12.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Descenso por la STAR (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, descend via STAR to seven thousand feet, QNH one zero one two."`,
          `PILOT: "Descend via STAR to seven thousand feet, QNH one zero one two, Aviatory 452."`,
        ],
        "Significado: bajar hasta 7000 ft cumpliendo las restricciones de nivel y velocidad publicadas de la STAR. Con QNH porque la altitud autorizada está por debajo del nivel de transición.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Primer contacto con Approach",
        [
          `PILOT: "Bogota Approach, Aviatory 452, flight level one two zero, estimating PAXUM four six, information Delta."`,
          `ATC:   "Aviatory 452, descend to five thousand feet, QNH one zero one two, transition level seven zero, expect ILS approach runway three one."`,
          `PILOT: "Descending to five thousand feet, QNH one zero one two, transition level seven zero, expecting ILS approach runway three one, Aviatory 452."`,
        ],
        "Significado: nivel, estimado y ATIS en la llamada. ATC da altitud, QNH, nivel de transición y aproximación prevista; todo se colaciona.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Descender después de un punto",
        [
          `ATC:   "Aviatory 452, after passing PAXUM descend to flight level eight zero."`,
          `PILOT: "After PAXUM descend to flight level eight zero, Aviatory 452."`,
        ],
        "Significado: autorización condicional. **No se inicia el descenso antes de PAXUM.**",
      ),
      ...ejemplo(
        "Ejemplo 5 · Restricción de cruce",
        [
          `ATC:   "Aviatory 452, cross RODEL flight level one zero zero or above."`,
          `PILOT: "Cross RODEL flight level one zero zero or above, Aviatory 452."`,
        ],
        "Significado: sobre RODEL a FL 100 o más alto. Hay que planear el descenso para cumplirla.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Directo que corta la STAR (directo VERIFICAR; la pregunta es PLAIN LANGUAGE con palabra normalizada)",
        [
          `ATC:   "Aviatory 452, proceed direct RODEL."`,
          `PILOT: "Direct RODEL, Aviatory 452. Confirm altitude restriction at RODEL still applies?"`,
          `ATC:   "Aviatory 452, affirm, cross RODEL flight level one zero zero or above."`,
          `PILOT: "Cross RODEL flight level one zero zero or above, Aviatory 452."`,
        ],
        "Significado: al saltarse puntos, puede desaparecer del FMS alguna restricción, o quedar menos distancia para bajar. Se confirma.",
      ),
      ...ejemplo(
        "Ejemplo 7 · Cambio de pista (EXPECT verificado; lo demás PLAIN LANGUAGE)",
        [
          `ATC:   "Aviatory 452, expect ILS approach runway one three, QNH one zero one four."`,
          `PILOT: "Runway one three, QNH one zero one four, Aviatory 452. We need about three minutes to set up the new approach."`,
          `ATC:   "Aviatory 452, roger, fly heading one eight zero."`,
          `PILOT: "Heading one eight zero, Aviatory 452."`,
        ],
        "Significado: un cambio de pista en la llegada es carga de trabajo real (nueva aproximación, nuevos puntos, nueva distancia). Decir cuánto tiempo se necesita es mejor que aceptar y quedarse corto.",
      ),
      ...ejemplo(
        "Ejemplo 8 · Velocidad en la llegada (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, reduce speed to two two zero knots."`,
          `PILOT: "Reduce speed to two two zero knots, Aviatory 452."`,
        ],
        "Significado: ajuste para la secuencia. Si con esa velocidad no se cumple una restricción de altitud, se avisa.",
      ),
      {
        kind: "hueco",
        rotulo: "CM-26-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion: "Imagen sugerida: Esquema en planta de una STAR ficticia «PAXUM 2B»: PAXUM → RODEL → KUBIN → punto de aproximación inicial. Junto a cada punto, su restricción publicada en estilo de carta (RODEL «FL100 o superior», KUBIN «250 kt máx.»). Una línea en otro color muestra un directo ATC de PAXUM a RODEL que salta un punto intermedio. Al margen, tres tarjetas: «EXPECT = planear, no autoriza», «DESCEND VIA STAR = con restricciones publicadas (verificar)», «Instrucción ATC = cambia lo que nombra». Objetivo: Que el piloto entienda qué parte de la STAR cambia con cada instrucción y que un directo puede dejarle menos distancia para descender.",
        alto: 280,
      },
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Preparando la llegada",
        texto: "La llegada se prepara antes del descenso con el ATIS, la STAR y la aproximación esperada, y se hace el briefing. Cualquier cambio posterior (pista, STAR, directo) obliga a volver a revisar lo cargado en el FMS contra la carta, con los dos pilotos. Si la distancia que queda no alcanza para bajar a tiempo, se dice pronto: ATC puede dar vectores, más distancia o una restricción distinta.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Tomar `EXPECT` como autorización", "**Tomar `EXPECT` como autorización** y bajar o empezar la aproximación."),
      error("Descender antes del punto", "**Descender antes del punto** en una autorización «after passing»."),
      error("Perder una restricción", "**Perder una restricción** al cargar un directo en el FMS."),
      error("Aceptar un cambio de pista sin tiempo", "**Aceptar un cambio de pista sin tiempo** para preparar la nueva aproximación y llegar alto o rápido."),
      error("Olvidar el QNH", "**Olvidar el QNH** al cruzar el nivel de transición en descenso."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "La STAR viene en la autorización y se colaciona.",
          "`EXPECT` sirve para planear; no autoriza nada.",
          "Primer contacto con Approach: nivel, estimado, ATIS.",
          "Directo o rumbo: cambia la parte que nombra; si no está claro lo demás, `CONFIRM`.",
          "Si no alcanza a descender, se dice antes.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 4444 (15.ª ed., Enm. 4) cap. 1 («Llegada normalizada por instrumentos (STAR)»); 4.5.7.2.1; 4.5.7.5.1; 4.6.3.3; 4.10.4.5. Doc 9432 (4.ª ed.) 2.8.3.7 («CROSS A1 AT WICKEN FL 70»); 2.8.3.10 («CROSS WICKEN FL 150 OR ABOVE»); 3.3.3.1 («AFTER PASSING … DESCEND TO FL 80»); 4.6.2; 7.3.1 y 7.3 (primer contacto con Approach, «DESCEND TO 4 000 FEET QNH 1005 TRANSITION LEVEL 50 EXPECT ILS APPROACH RUNWAY 24», «EXPECT ILS APPROACH RUNWAY 24 QNH 1014»).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: «CLEARED (designador) ARRIVAL» como forma inglesa de «autorizado llegada vía (designación)», contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
              "VERIFICAR: «DESCEND VIA STAR TO (nivel)» y qué restricciones publicadas quedan vigentes tras una instrucción de nivel sin «VIA» o un directo, contra Doc 4444 16.ª ed. caps. 6 y 12 (no cargados) y la AIP del Estado.",
              "VERIFICAR: «PROCEED DIRECT (punto)» y «REDUCE SPEED TO (número) KNOTS» contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 27 ──────────────────────────────────────────────────────────────────
  {
    n: 27,
    title: "Aproximación",
    kicker: "La autorización de aproximación y lo que se reporta",
    minutes: 9,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "La aproximación es la parte del vuelo que lleva el avión desde la llegada hasta la pista. Este capítulo trata **cómo se comunica**, no cómo se vuela el procedimiento.",
      },
      { kind: "p", text: "Definiciones del Doc 4444 (cap. 1) que conviene tener claras:" },
      {
        kind: "glosario",
        items: [
          {
            k: "Procedimiento de aproximación por instrumentos",
            v: "serie de maniobras predeterminadas por referencia a los instrumentos, con protección contra obstáculos. Se clasifica en **de precisión** (PA, por ejemplo ILS), **con guía vertical** (APV) y **que no es de precisión** (NPA).",
          },
          {
            k: "Aproximación final",
            v: "la parte del procedimiento que empieza en el punto o la referencia de aproximación final.",
          },
          {
            k: "Aproximación visual",
            v: "en un vuelo IFR, cuando parte o todo el procedimiento por instrumentos no se completa y se sigue con referencia visual al terreno.",
          },
          {
            k: "Altitud/altura de decisión (DA/DH)",
            v: "donde debe iniciarse la aproximación frustrada si no se tiene la referencia visual requerida.",
          },
        ],
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "`EXPECT (tipo) APPROACH` es información. La **autorización de aproximación** es otra transmisión: «cleared … approach runway …».",
          "Si ATC pide «report established», se informa cuando el avión está establecido en el procedimiento (Doc 9432, 7.3).",
          "Los vectores hacia la final son rumbos como los del capítulo 21, con la misma colación.",
          "Cerca del final, ATC solo debería pedir ajustes de velocidad menores (±20 kt) y ninguno después de 4 NM del umbral (Doc 4444, 4.6.3.6 y 4.6.3.7).",
          "ATC puede avisar una **advertencia de altitud mínima (MSAW)** e instrucciones (Doc 9432, 6.7.1). Se reacciona primero y se habla después.",
          "La información esencial del aeródromo (por ejemplo, un ILS fuera de servicio) se da antes de empezar la aproximación final, salvo que ya se tenga por otra fuente (Doc 9432, 4.10).",
          "Una aproximación RNAV o RNP exige que el avión y la tripulación estén aprobados. Si no se puede volar la que ATC propone, `UNABLE` y se pide otra. La comunicación PBN está en el capítulo 40.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "No están en las fuentes cargadas: «CLEARED ILS APPROACH RUNWAY (número)», la forma del rumbo de interceptación y «REPORT ESTABLISHED ON THE LOCALIZER» (Doc 9432 cap. 7, 7.4 en adelante, y Doc 4444 16.ª ed. cap. 12); «REPORT RUNWAY IN SIGHT» y «CLEARED VISUAL APPROACH RUNWAY (número)» (Doc 4444 16.ª ed. cap. 12); «CLEARED RNP (o RNAV) APPROACH RUNWAY (número)» y la designación de aproximaciones RNP (Doc 4444 16.ª ed. cap. 12 y Doc 9613, Manual PBN); «MAINTAIN (número) KNOTS UNTIL (distancia) FINAL» (Doc 4444 16.ª ed. cap. 12).",
      },
      ...ejemplo(
        "Ejemplo 1 · Aproximación ILS directa",
        [
          `PILOT: "Runway three one, QNH one zero one four, request straight-in ILS approach, Aviatory 452."`,
          `ATC:   "Aviatory 452, cleared straight-in ILS approach runway three one, report established."`,
          `PILOT: "Cleared straight-in ILS approach runway three one, wilco, Aviatory 452."`,
          `PILOT: "Aviatory 452, established, runway in sight."`,
          `ATC:   "Aviatory 452, contact Tower one one eight decimal seven."`,
          `PILOT: "One one eight decimal seven, Aviatory 452."`,
        ],
        "Significado: autorizado a la aproximación ILS directa. «Report established» se cumple con `WILCO` y luego se informa. Después, cambio a Torre.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Vectores hacia la final",
        [
          `ATC:   "Aviatory 452, turn left heading two one zero, descend to four thousand feet, QNH one zero one four."`,
          `PILOT: "Left heading two one zero, descending to four thousand feet, QNH one zero one four, Aviatory 452."`,
        ],
        "Significado: rumbo, altitud y QNH en una sola transmisión. Se colaciona en el mismo orden.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Rumbo de interceptación y autorización ILS (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, turn left heading one six zero, cleared ILS approach runway three one, report established on the localizer."`,
          `PILOT: "Left heading one six zero, cleared ILS approach runway three one, wilco, Aviatory 452."`,
          `PILOT: "Aviatory 452, established on the localizer."`,
        ],
        "Significado: rumbo para interceptar, autorización de la aproximación y pedido de notificar establecido en el localizador. La forma exacta del Doc 4444 cap. 12 (no cargado) se confirma.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Aproximación visual (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, report runway in sight."`,
          `PILOT: "Aviatory 452, runway in sight."`,
          `ATC:   "Aviatory 452, cleared visual approach runway three one."`,
          `PILOT: "Cleared visual approach runway three one, Aviatory 452."`,
        ],
        "Significado: ver la pista no es tener la autorización. Hasta escuchar «cleared visual approach», el avión sigue con lo último autorizado.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Aproximación RNP (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, cleared RNP approach runway one three."`,
          `PILOT: "Cleared RNP approach runway one three, Aviatory 452."`,
        ],
        "Significado: se nombra el tipo de aproximación y la pista. Si la carta tiene varias del mismo tipo, se nombra la que corresponde.",
      ),
      ...ejemplo(
        "Ejemplo 6 · No puede volar la aproximación propuesta (UNABLE + PLAIN LANGUAGE)",
        [
          `ATC:   "Aviatory 452, expect RNP approach runway one three."`,
          `PILOT: "Aviatory 452, unable RNP approach. Request ILS approach runway three one."`,
          `ATC:   "Aviatory 452, roger, expect ILS approach runway three one, fly heading two seven zero."`,
          `PILOT: "Heading two seven zero, expecting ILS approach runway three one, Aviatory 452."`,
        ],
        "Significado: el avión no tiene hoy la capacidad requerida (por equipo o por aprobación). Se dice con tiempo para que ATC reorganice.",
      ),
      ...ejemplo(
        "Ejemplo 7 · Ayuda fuera de servicio",
        [
          `ATC:   "Aviatory 452, ILS runway three one unserviceable."`,
          `PILOT: "Roger, Aviatory 452. Request RNP approach runway three one."`,
        ],
        "Significado: la primera parte sigue el Doc 9432 (4.10); el pedido es PLAIN LANGUAGE.",
      ),
      ...ejemplo(
        "Ejemplo 8 · Advertencia de altitud mínima",
        [
          `ATC:   "Aviatory 452, low altitude warning, check your altitude immediately, QNH is one zero zero six, the minimum flight altitude is four thousand five hundred feet."`,
          `PILOT: "Aviatory 452, climbing to four thousand five hundred feet, QNH one zero zero six."`,
        ],
        "Significado: el sistema de ATC detecta al avión demasiado bajo. Se corrige primero. La respuesta del piloto es un ejemplo en lenguaje claro: el Doc 9432 cargado no la trae.",
      ),
      ...ejemplo(
        "Ejemplo 9 · Velocidad hasta la final (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, maintain one six zero knots until four miles final."`,
          `PILOT: "One six zero knots until four miles final, Aviatory 452."`,
        ],
        "Significado: después de 4 NM la velocidad es de la tripulación para estabilizar.",
      ),
      {
        kind: "hueco",
        rotulo: "CM-27-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion: "Imagen sugerida: Vista en planta de una interceptación del localizador de una pista genérica «31». El avión viene en rumbo 210, luego rumbo 160 hacia el eje extendido de la pista (ángulo de interceptación visible). En el punto de interceptación, la etiqueta «Established on the localizer». Debajo, un perfil lateral con la senda de planeo y el punto «4 NM» marcado con «Sin control de velocidad ATC desde aquí». Globos de diálogo cortos en cada tramo: «turn left heading 160», «cleared ILS approach runway 31», «established». Objetivo: Que el piloto asocie cada fase de la interceptación con lo que se dice por radio y distinga el rumbo de interceptación de la autorización de aproximación.",
        alto: 280,
      },
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Briefing y autorización de aproximación",
        texto: "La aproximación esperada se prepara y se revisa en el briefing antes del descenso. La autorización se colaciona y el PM verifica que el modo de aproximación esté armado según el SOP. Muchos operadores exigen que ambos pilotos confirmen en voz alta pista y tipo de aproximación al recibir la autorización. Cambios tardíos de pista o de tipo de aproximación son una fuente conocida de aproximaciones no estabilizadas: si no hay tiempo, se pide.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Tomar el rumbo de interceptación como autorización de aproximación", "Con solo «heading one six zero», el avión cruza el localizador y sigue de largo."),
      error("Descender en la senda sin autorización de aproximación", "**Descender en la senda sin autorización de aproximación.**"),
      error("Confundir pista o tipo de aproximación", "**Confundir pista o tipo de aproximación** (31 y 13, ILS y RNP) por sesgo de expectativa del briefing."),
      error("Aceptar una aproximación para la que el avión o la tripulación no están aprobados", "**Aceptar una aproximación para la que el avión o la tripulación no están aprobados.**"),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "`EXPECT` prepara; «cleared … approach» autoriza.",
          "El rumbo de interceptación no es autorización de aproximación.",
          "«Report established»: `WILCO` y luego informar.",
          "`UNABLE` si no puede volar el procedimiento, y pedir otro.",
          "MSAW: corregir primero, hablar después.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 4444 (15.ª ed., Enm. 4) cap. 1 («Procedimiento de aproximación por instrumentos (IAP)» y su clasificación PA/APV/NPA, «Aproximación final», «Aproximación visual», «Altitud de decisión (DA) o altura de decisión (DH)»); 4.6.3.6; 4.6.3.7. Doc 9432 (4.ª ed.) 4.10 («ILS 09 UNSERVICEABLE»); 6.3 (rumbos); 6.7.1 («LOW ALTITUDE WARNING, CHECK YOUR ALTITUDE IMMEDIATELY»); 7.3.1; 7.3 («REQUEST STRAIGHT-IN ILS APPROACH», «CLEARED STRAIGHT-IN ILS APPROACH RUNWAY 24 REPORT ESTABLISHED», «ESTABLISHED RUNWAY IN SIGHT», «CONTACT TOWER»).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: «CLEARED ILS APPROACH RUNWAY (número)», la forma del rumbo de interceptación del localizador y «REPORT ESTABLISHED ON THE LOCALIZER», contra Doc 9432 cap. 7 (7.4 en adelante, no cargado) y Doc 4444 16.ª ed. cap. 12 (no cargado).",
              "VERIFICAR: «REPORT RUNWAY IN SIGHT» y «CLEARED VISUAL APPROACH RUNWAY (número)» contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
              "VERIFICAR: «CLEARED RNP (o RNAV) APPROACH RUNWAY (número)» y la designación de aproximaciones RNP, contra Doc 4444 16.ª ed. cap. 12 y Doc 9613 (Manual PBN) (no cargados).",
              "VERIFICAR: «MAINTAIN (número) KNOTS UNTIL (distancia) FINAL» contra Doc 4444 16.ª ed. cap. 12 (no cargado).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 28 ──────────────────────────────────────────────────────────────────
  {
    n: 28,
    title: "Espera (holding)",
    kicker: "Instrucciones de espera y hora prevista de aproximación",
    minutes: 8,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "El **procedimiento de espera** es una maniobra predeterminada que mantiene al avión dentro de un espacio aéreo especificado mientras espera otra autorización (Doc 4444, cap. 1). Se vuela sobre un **punto de referencia de espera**. Lo usa ATC cuando hay más llegadas que capacidad de pista, cuando la pista se cierra o cuando la meteorología no deja aterrizar.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**Hora prevista de aproximación (EAT)**: hora a la que ATC prevé que el avión, después de una demora, dejará el punto de espera para completar la aproximación. La hora real de salida de la espera depende de la autorización de aproximación (Doc 4444, cap. 1 y su Nota). La EAT sirve para planear el combustible y, en caso de falla de comunicaciones, tiene un papel propio (capítulo 32).",
          "Cuando la demora es conocida, ATC puede hacerla absorber antes, con velocidad reducida en crucero (Doc 4444, 4.6.3.1).",
          "**No se aplica control de velocidad** a quien entra o está en espera (Doc 4444, 4.6.1.2). Las velocidades máximas de espera y las entradas al circuito están en el Doc 8168 (PANS-OPS), no cargado.",
          "En la misma espera, ATC puede fijar regímenes de descenso para mantener la separación entre aviones que bajan a velocidades muy distintas (Doc 4444, 5.3.4.1.1).",
          "Un viraje de 360 u órbita «for delay» no es un circuito de espera: es una demora corta con vectores (Doc 9432, 6.3.4).",
          "**Una instrucción de espera incompleta se aclara antes de llegar al punto**: punto, nivel, rumbo de acercamiento, sentido de los virajes y duración o distancia del alejamiento.",
          "La tripulación sabe cuánto tiempo puede esperar antes de tener que ir al alterno. Ese número se dice a ATC antes de que sea un problema. La comunicación de combustible mínimo y de emergencia de combustible está en el capítulo 37.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "Toda instrucción de espera de ATC de esta lección es por verificar, aunque el ejemplo no lo repita: «HOLD AT (fijo) AS PUBLISHED», la espera no publicada con «INBOUND TRACK», «RIGHT/LEFT HAND PATTERN» y «OUTBOUND TIME», «EXPECT APPROACH CLEARANCE AT (hora)», «DELAY NOT DETERMINED», «NO DELAY EXPECTED». Consultar el Doc 4444 16.ª ed., cap. 12, y el Doc 9432, cap. 7 (7.4 en adelante) y cap. 8. Velocidades máximas de espera, entradas al circuito y tiempo de alejamiento: Doc 8168 PANS-OPS Vol. I. Si el Estado exige informar la entrada en la espera: su AIP.",
      },
      {
        kind: "p",
        text: "La fraseología de espera está en partes del Doc 9432 y del Doc 4444 que no están cargadas. Toda instrucción de espera de ATC en este capítulo va con **(VERIFICAR)**, aunque el ejemplo no lo repita.",
      },
      ...ejemplo(
        "Ejemplo 1 · Espera publicada (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, hold at PAXUM as published, maintain flight level one two zero, expect approach clearance at four five."`,
          `PILOT: "Hold at PAXUM as published, maintaining flight level one two zero, expect approach clearance at four five, Aviatory 452."`,
        ],
        "Significado: esperar en PAXUM con el circuito de la carta, a FL 120. La aproximación se prevé a los 45. Se colaciona el nivel y la hora.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Espera no publicada (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, hold at GIKOS, flight level one five zero, inbound track two seven zero, right hand pattern, outbound time one minute."`,
          `PILOT: "Hold at GIKOS, flight level one five zero, inbound track two seven zero, right hand pattern, outbound time one minute, Aviatory 452."`,
        ],
        "Significado: ATC arma el circuito completo: punto, nivel, rumbo de acercamiento, virajes a la derecha, un minuto de alejamiento. Se colaciona todo.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Falta un dato (palabras normalizadas)",
        [
          `ATC:   "Aviatory 452, hold at GIKOS, flight level one five zero, inbound track two seven zero, outbound time one minute."`,
          `PILOT: "Aviatory 452, confirm right or left hand pattern?"`,
          `ATC:   "Aviatory 452, right hand pattern."`,
          `PILOT: "Right hand pattern, Aviatory 452."`,
        ],
        "Significado: sin el sentido de los virajes, la espera no está definida. Se pregunta antes del punto, no encima de él.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Demora sin determinar (VERIFICAR la frase de ATC; la respuesta es PLAIN LANGUAGE)",
        [
          `ATC:   "Aviatory 452, delay not determined, runway closed."`,
          `PILOT: "Roger, Aviatory 452. We can hold for three zero minutes, then we will need to divert to Cali."`,
          `ATC:   "Aviatory 452, roger, I will advise."`,
        ],
        "Significado: sin hora prevista, la tripulación le da a ATC su límite. Así ATC sabe cuándo debe tener lista la desviación.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Sin demora (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, no delay expected, cleared ILS approach runway three one."`,
          `PILOT: "Cleared ILS approach runway three one, Aviatory 452."`,
        ],
        "Significado: la autorización de aproximación es lo que saca al avión de la espera. No se sale por haber llegado la EAT.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Límite de combustible (UNABLE + PLAIN LANGUAGE)",
        [
          `ATC:   "Aviatory 452, expect approach clearance at one five."`,
          `PILOT: "Aviatory 452, unable to hold until one five due fuel. Maximum holding time one zero minutes, then we divert to Cali."`,
        ],
        "Significado: `UNABLE` normalizada, motivo y dato concreto. Esto no es declarar combustible mínimo ni emergencia: esas frases están en el capítulo 37.",
      ),
      ...ejemplo(
        "Ejemplo 7 · Informar entrada en la espera (PLAIN LANGUAGE; depende del Estado)",
        [
          `PILOT: "Aviatory 452, entering the hold at PAXUM, flight level one two zero."`,
          `ATC:   "Aviatory 452, roger."`,
        ],
        "Significado: algunas dependencias lo piden y otras no. Se hace si la AIP o ATC lo exigen.",
      ),
      ...ejemplo(
        "Ejemplo 8 · Descenso dentro de la espera",
        [
          `ATC:   "Aviatory 452, descend to flight level one zero zero."`,
          `PILOT: "Leaving flight level one two zero descending to flight level one zero zero, Aviatory 452."`,
        ],
        "Significado: los aviones de abajo salen hacia la aproximación y los de arriba bajan un escalón. La colación es la del capítulo 20.",
      ),
      {
        kind: "hueco",
        rotulo: "CM-28-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion: "Imagen sugerida: Circuito de espera en planta sobre un fijo ficticio «GIKOS». Se ven: el fijo (triángulo), el tramo de acercamiento con la etiqueta «Inbound track 270» y la flecha hacia el fijo, el viraje a la derecha sobre el fijo, el tramo de alejamiento con «Outbound time 1 min», y el segundo viraje a la derecha de vuelta al acercamiento. Texto «Right hand pattern» con flechas de sentido. En un recuadro lateral, los cinco datos que debe tener la instrucción: fijo, nivel, inbound track, sentido de virajes, tiempo o distancia de alejamiento; y aparte «EAT: hora prevista de salida de la espera». Objetivo: Que el piloto reconozca cada elemento de una instrucción de espera en el dibujo y sepa qué preguntar si falta alguno.",
        alto: 280,
      },
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Al recibir una espera",
        texto: "Al recibir una espera, la tripulación la carga en el FMS, verifica contra la carta o contra lo dictado, y calcula cuánto puede esperar con el combustible que tiene antes de ir al alterno. Ese tiempo se actualiza en cada vuelta y se habla con ATC antes de llegar al límite. Los criterios de combustible y de decisión de desviar son del operador y de la norma del Estado; aquí solo se trata cómo comunicarlos.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Colacionar la espera a medias", "**Colacionar la espera a medias** y descubrir encima del fijo que falta el sentido de los virajes."),
      error("Confundir la EAT con una autorización", "**Confundir la EAT con una autorización** y salir de la espera sin autorización de aproximación."),
      error("Guardarse el límite de combustible", "**Guardarse el límite de combustible** hasta que ya no hay margen."),
      error("Tomar el descenso de otro avión", "**Tomar el descenso de otro avión** en una frecuencia llena de aviones en la misma espera."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Fijo, nivel, rumbo de acercamiento, sentido de virajes, alejamiento: si falta uno, se pregunta.",
          "EAT planea; la autorización de aproximación saca de la espera.",
          "Sin control de velocidad ATC en la espera.",
          "Decir a tiempo cuánto se puede esperar y a dónde se desviaría.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 4444 (15.ª ed., Enm. 4) cap. 1 («Procedimiento de espera», «Punto de referencia de espera», «Hora prevista de aproximación» y su Nota); 4.6.1.2; 4.6.3.1; 5.3.4.1.1. Doc 9432 (4.ª ed.) cap. 1 («Hora prevista de aproximación», «Procedimiento de espera»); 2.6 («CONFIRM», «UNABLE»); 3.3 (descenso); 6.3.4 («ORBIT LEFT FOR DELAY»).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: toda la fraseología de espera de los ejemplos («HOLD AT (fijo) AS PUBLISHED», «HOLD AT (fijo) (nivel) INBOUND TRACK (tres dígitos) RIGHT/LEFT HAND PATTERN OUTBOUND TIME (número) MINUTES», «EXPECT APPROACH CLEARANCE AT (hora)», «DELAY NOT DETERMINED», «NO DELAY EXPECTED»), contra Doc 4444 16.ª ed. cap. 12 y Doc 9432 cap. 7 (7.4 en adelante) y cap. 8 (no cargados).",
              "VERIFICAR: velocidades máximas de espera, entradas al circuito y tiempo de alejamiento por nivel, contra Doc 8168 PANS-OPS Vol. I (no cargado).",
              "VERIFICAR: si el Estado exige informar la entrada en la espera, contra su AIP.",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 29 ──────────────────────────────────────────────────────────────────
  {
    n: 29,
    title: "Aterrizaje",
    kicker: "CONTINUE APPROACH no es CLEARED TO LAND",
    minutes: 8,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Es la última autorización del vuelo antes de tocar la pista: **CLEARED TO LAND**. Antes de ella, Torre puede decir otras cosas que suenan parecido y no autorizan nada.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "definicion", text: "CONTINUE APPROACH no es CLEARED TO LAND." },
      {
        kind: "list",
        items: [
          "`CONTINUE APPROACH` quiere decir: siga aproximándose, **todavía no tiene autorización para aterrizar**. Suele venir con el viento, porque la pista aún no está libre o porque Torre está secuenciando (Doc 9432, 4.6.4 y 4.7.1). En el Doc 9432 el piloto acusa recibo solo con su distintivo: no hay nada que colacionar.",
          "`CLEARED TO LAND` es la autorización. Lleva la pista y normalmente el viento. **Se colaciona con la pista** (Doc 4444, 4.5.7.5.1: las autorizaciones para aterrizar se colacionan siempre).",
          "Si el avión se acerca al punto en el que su SOP exige tener la autorización y no la tiene, se pregunta. Si sigue sin tenerla, **motor y al aire**. Ese punto lo define el operador y, en algunos Estados, la norma nacional: no es un valor OACI único.",
          "Algunos Estados usan fraseología adicional en la final (por ejemplo, para anticipar una autorización tardía). Si no está en el Doc 4444 del Estado o en su AIP, no se asume nada: se pregunta.",
          "Torre evita transmitir en la última parte de la final y durante el recorrido de aterrizaje, salvo por seguridad (Doc 9432, 4.1.2). Lo que llegue en ese momento es importante.",
          "Notificaciones en la final: «FINAL» a 4 NM (7 km) o menos del punto de toma de contacto; «LONG FINAL» si el viraje a final es más lejos, o a unas 8 NM en una aproximación directa (Doc 9432, 4.7.1). Se hacen cuando las pide Torre o el procedimiento local.",
          "Después de aterrizar: se sigue en la frecuencia de Torre hasta dejar la pista, salvo instrucción distinta (Doc 9432, 4.9).",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "Los intercambios de esta lección salen del Doc 9432 cargado. Queda por verificar lo que por eso no se usa en ellos: la fraseología adicional de la final (autorización tardía, aterrizaje después de otro tráfico), contra el Doc 4444 16.ª ed. cap. 12 y la AIP del Estado; y el punto en el que el operador o el Estado exige tener la autorización de aterrizaje, contra el SOP del operador y la norma nacional (en Colombia, RAC y AIP Colombia).",
      },
      ...ejemplo(
        "Ejemplo 1 · Continuar la aproximación",
        [
          `PILOT: "Bogota Tower, Aviatory 452, long final."`,
          `ATC:   "Aviatory 452, continue approach, wind two six zero degrees one eight knots."`,
          `PILOT: "Aviatory 452."`,
        ],
        "Significado: siga, sin autorización para aterrizar. El distintivo solo es el acuse de recibo que muestra el Doc 9432. Decir «continue approach, Aviatory 452» también deja claro en cabina que falta la autorización.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Autorización para aterrizar",
        [
          `PILOT: "Aviatory 452, final."`,
          `ATC:   "Aviatory 452, runway three one, cleared to land, wind two seven zero degrees two zero knots."`,
          `PILOT: "Runway three one, cleared to land, Aviatory 452."`,
        ],
        "Significado: ahora sí puede aterrizar. Se colaciona pista y autorización. El viento no hace falta colacionarlo.",
      ),
      ...ejemplo(
        "Ejemplo 3 · La autorización no llega (palabra normalizada + PLAIN LANGUAGE)",
        [
          `PILOT: "Bogota Tower, Aviatory 452, confirm cleared to land runway three one?"`,
          `ATC:   "Aviatory 452, negative, continue approach, traffic departing runway three one."`,
          `PILOT: "Aviatory 452."`,
        ],
        "Significado: se pregunta con `CONFIRM`. La respuesta `NEGATIVE` deja claro que no hay autorización. Si no llega antes del punto que fija el SOP, motor y al aire.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Pista ocupada",
        [
          `ATC:   "Aviatory 452, go around, aircraft on the runway."`,
          `PILOT: "Going around, Aviatory 452."`,
        ],
        "Significado: orden de motor y al aire. Se ejecuta y se responde corto (capítulo 30).",
      ),
      ...ejemplo(
        "Ejemplo 5 · Información esencial en la final",
        [
          `ATC:   "Aviatory 452, caution, large flock of birds north of runway three one."`,
          `PILOT: "Roger, Aviatory 452."`,
        ],
        "Significado: información, no instrucción. `ROGER` basta. La decisión de continuar es de la tripulación.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Salida de pista y cambio a Tierra",
        [
          `ATC:   "Aviatory 452, take first right, when vacated contact Ground one two one decimal eight."`,
          `PILOT: "First right, wilco, one two one decimal eight, Aviatory 452."`,
        ],
        "Significado: salir por la primera a la derecha. **Se cambia a Tierra cuando la pista quedó libre**, no antes.",
      ),
      ...ejemplo(
        "Ejemplo 7 · Pista libre",
        [
          `PILOT: "Bogota Ground, Aviatory 452, runway vacated."`,
          `ATC:   "Aviatory 452, taxi to stand two seven via taxiway Alpha."`,
          `PILOT: "Stand two seven via taxiway Alpha, Aviatory 452."`,
        ],
        "Significado: primer contacto con Tierra. La instrucción de rodaje se colaciona como en el capítulo 16.",
      ),
      ...ejemplo(
        "Ejemplo 8 · Órbita por tráfico en la pista (circuito visual)",
        [
          `ATC:   "Aviatory 452, orbit right due traffic on the runway, report again on final."`,
          `PILOT: "Orbiting right, wilco, Aviatory 452."`,
        ],
        "Significado: en un circuito de tránsito visual, Torre puede demorar al avión con una órbita en vez de un motor y al aire (Doc 9432, 4.6.5). En una aproximación IFR estabilizada, lo normal es el motor y al aire.",
      ),
      {
        kind: "hueco",
        rotulo: "CM-29-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion: "Imagen sugerida: Perfil lateral de una aproximación final hacia una pista genérica «31», con el avión a varias distancias. A 8 NM, globo «LONG FINAL» y respuesta de torre «CONTINUE APPROACH, wind…» con una etiqueta gris «SIN autorización para aterrizar». A 4 NM, globo «FINAL» y respuesta «RUNWAY 31, CLEARED TO LAND, wind…» con una etiqueta en el color de acento del módulo «AUTORIZADO». Antes del umbral, una línea vertical punteada rotulada «Punto de decisión según SOP del operador: sin CLEARED TO LAND → preguntar; si no llega → GO AROUND». El ámbar y el rojo no se usan como decoración. Objetivo: Que el piloto distinga de un vistazo CONTINUE APPROACH de CLEARED TO LAND y sepa que la falta de autorización tiene un punto de decisión.",
        alto: 280,
      },
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En la final",
        texto: "Muchos SOP incluyen en la lista de la final un ítem para confirmar la autorización de aterrizaje, y que el PM la anuncie en voz alta al recibirla. Cuándo se decide el motor y al aire por falta de autorización, qué pasa en pistas paralelas y cómo se confirma la pista correcta son reglas del operador y del Estado. Lo que no cambia: **sin «cleared to land» no se aterriza**.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Escuchar «cleared to land» donde dijeron «continue approach»", "Es el sesgo de expectativa en su forma más peligrosa: la tripulación espera la autorización y el cerebro la completa."),
      error("Colacionar sin la pista", "**Colacionar sin la pista**, sobre todo con pistas paralelas o en uso cruzado."),
      error("Tomar una autorización de aterrizaje de otro distintivo", "**Tomar una autorización de aterrizaje de otro distintivo** en una frecuencia de torre cargada."),
      error("Cambiar a Tierra con el avión todavía en la pista", "**Cambiar a Tierra con el avión todavía en la pista.**"),
      error("Aterrizar sin autorización", "**Aterrizar sin autorización** por pérdida de comunicaciones sin haberlo notado. Si la radio está en silencio en la final, algo pasa."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "`CONTINUE APPROACH` no autoriza a aterrizar.",
          "`CLEARED TO LAND` se colaciona con la pista.",
          "Sin autorización al punto que fija el SOP: preguntar; si no llega, motor y al aire.",
          "En Torre hasta dejar la pista; luego Tierra.",
          "`ROGER` para información; colación para autorizaciones.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1 b) y c). Doc 9432 (4.ª ed.) 2.6 («CONFIRM», «NEGATIVE», «ROGER»); 4.1.2; 4.6.4 («REPORT FINAL», «CONTINUE APPROACH WIND …»); 4.6.5 («ORBIT RIGHT DUE TRAFFIC ON THE RUNWAY. REPORT AGAIN ON FINAL»); 4.7.1 («LONG FINAL», «CONTINUE APPROACH WIND 260 DEGREES 18 KNOTS», «RUNWAY 27 CLEARED TO LAND WIND 270 DEGREES 20 KNOTS» y su colación); 4.8.1 («GO AROUND AIRCRAFT ON THE RUNWAY»); 4.9 («TAKE FIRST RIGHT WHEN VACATED CONTACT GROUND», «RUNWAY VACATED», «TAXI TO STAND 27 VIA TAXIWAY ALPHA»); 4.10 («LARGE FLOCK OF BIRDS NORTH OF RUNWAY 27»).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: fraseología adicional de la final (autorización tardía, aterrizaje después de otro tráfico) contra Doc 4444 16.ª ed. cap. 12 y la AIP del Estado (no cargados). No se usa en los ejemplos.",
              "VERIFICAR: punto en el que el operador o el Estado exige tener la autorización de aterrizaje, contra el SOP del operador y la norma nacional (en Colombia, RAC y AIP Colombia).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 30 ──────────────────────────────────────────────────────────────────
  {
    n: 30,
    title: "Motor y al aire",
    kicker: "Go-around ordenado o iniciado por la tripulación",
    minutes: 7,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "**Motor y al aire** (go-around) es interrumpir la aproximación y subir. El **procedimiento de aproximación frustrada** es lo que hay que volar si no se puede seguir la aproximación (Doc 4444, cap. 1). Puede ordenarlo ATC o decidirlo la tripulación.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**Aviate, Navigate, Communicate.** Primero se vuela el avión (potencia, actitud, configuración), luego se navega (la frustrada publicada o la instrucción de ATC), y después se habla. Nadie espera una transmisión en los primeros segundos.",
          "En la maniobra la carga de trabajo es alta, y ATC debe dar transmisiones breves y reducidas al mínimo (Doc 9432, 4.8.1).",
          "**Sin instrucciones en contrario, un avión IFR vuela el procedimiento de aproximación frustrada publicado**; uno VFR sigue en el circuito de tránsito (Doc 9432, 4.8.2).",
          "Si la tripulación lo inicia, dice `GOING AROUND` (Doc 9432, 4.8.3). La razón se puede dar después, cuando el avión esté estable y si ATC la necesita.",
          "Situaciones que llevan a un motor y al aire:",
        ],
      },
      {
        kind: "list",
        items: [
          "**Ordenado por ATC**: pista ocupada, tráfico, separación.",
          "**Pista no disponible**: vehículo, animal, obstáculo.",
          "**Aproximación no estabilizada**: el Doc 4444 recuerda que la tripulación debe estabilizarse, típicamente a 3 NM del umbral (Nota a 4.6.3.7, que remite al Doc 8168). Los criterios exactos son del operador.",
          "**Sin referencia visual en la DA/DH** (definición del Doc 4444, cap. 1).",
          "**Sin autorización de aterrizaje** en el punto que fija el SOP (capítulo 29).",
          "Cizalladura, meteorología u otra razón técnica.",
        ],
      },
      {
        kind: "list",
        items: [
          "Las nuevas instrucciones de rumbo y nivel después del motor y al aire **se colacionan** como siempre.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "«SAY REASON FOR GO-AROUND» (ejemplo 5), u otra forma en que ATC pida el motivo, no está en las fuentes cargadas: consultar el Doc 4444 16.ª ed., cap. 12; si no existe, es PLAIN LANGUAGE. La fraseología específica de cizalladura (ejemplo 8): Doc 4444 16.ª ed. cap. 12 y AIP del Estado. Los criterios de aproximación estabilizada: Doc 8168 PANS-OPS Vol. I y SOP del operador.",
      },
      ...ejemplo(
        "Ejemplo 1 · Ordenado por ATC",
        [
          `ATC:   "Aviatory 452, go around, aircraft on the runway."`,
          `PILOT: "Going around, Aviatory 452."`,
        ],
        "Significado: la orden se ejecuta de inmediato. La respuesta es corta.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Iniciado por la tripulación, ATC solo acusa recibo",
        [
          `PILOT: "Aviatory 452, going around."`,
          `ATC:   "Aviatory 452, roger."`,
        ],
        "Significado: sin otra instrucción, el avión IFR vuela la frustrada publicada (Doc 9432, 4.8.2).",
      ),
      ...ejemplo(
        "Ejemplo 3 · ATC da otras instrucciones después",
        [
          `PILOT: "Aviatory 452, going around."`,
          `ATC:   "Aviatory 452, roger, climb to five thousand feet, turn right heading zero four zero."`,
          `PILOT: "Climbing to five thousand feet, right heading zero four zero, Aviatory 452."`,
        ],
        "Significado: ATC reemplaza la frustrada publicada con una altitud y un rumbo. Estructura de los ejemplos de nivel (3.3) y rumbo (6.3) del Doc 9432.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Cambio a Approach después de la frustrada",
        [
          `ATC:   "Aviatory 452, contact Bogota Approach one two zero decimal four."`,
          `PILOT: "One two zero decimal four, Aviatory 452."`,
          `PILOT: "Bogota Approach, Aviatory 452, passing three thousand five hundred feet climbing to five thousand feet, heading zero four zero."`,
        ],
        "Significado: primera llamada con nivel de paso, nivel autorizado y rumbo asignado para que Approach sepa dónde está y qué tiene.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Explicar el motivo y pedir lo siguiente (PLAIN LANGUAGE)",
        [
          `ATC:   "Aviatory 452, say reason for go-around."`,
          `PILOT: "Aviatory 452, unstable approach. Request vectors for another ILS approach runway three one."`,
          `ATC:   "Aviatory 452, fly heading zero four zero, expect vectors for ILS approach runway three one."`,
          `PILOT: "Heading zero four zero, Aviatory 452."`,
        ],
        "Significado: motivo en dos palabras y lo que se necesita. Nadie pide detalles técnicos por radio en ese momento.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Sin referencia visual en los mínimos (PLAIN LANGUAGE)",
        [
          `PILOT: "Aviatory 452, going around."`,
          `ATC:   "Aviatory 452, roger."`,
          `PILOT: "Aviatory 452, no visual reference at minimums. Request holding to wait for weather improvement, endurance four zero minutes."`,
        ],
        "Significado: primero `GOING AROUND`. Una vez estable, el motivo, la intención y el dato que ATC necesita para planear (cuánto puede esperar).",
      ),
      ...ejemplo(
        "Ejemplo 7 · Motor y al aire con tráfico: se repite la orden",
        [
          `ATC:   "Aviatory 452, go around, I say again, go around, aircraft on the runway."`,
          `PILOT: "Going around, Aviatory 452."`,
        ],
        "Significado: `I SAY AGAIN` para recalcar. El piloto no discute ni pregunta: ejecuta.",
      ),
      ...ejemplo(
        "Ejemplo 8 · Frustrada por cizalladura (PLAIN LANGUAGE)",
        [
          `PILOT: "Aviatory 452, going around, windshear."`,
          `ATC:   "Aviatory 452, roger."`,
        ],
        "Significado: la palabra «windshear» avisa a Torre de algo que afecta también al avión de atrás. Si el Estado tiene fraseología específica para esto, se usa esa (VERIFICAR).",
      ),
      {
        kind: "hueco",
        rotulo: "CM-30-01 · Esquema · 16:9 · 1600×900 px",
        descripcion: "Imagen sugerida: Tres bloques horizontales en secuencia sobre una trayectoria de motor y al aire que sube desde cerca de la pista. Bloque 1 «AVIATE» sobre el inicio de la subida: potencia, actitud, configuración. Bloque 2 «NAVIGATE» en el tramo siguiente: frustrada publicada o instrucción ATC. Bloque 3 «COMMUNICATE» más adelante: globo «Going around, Aviatory 452». Abajo, una franja pequeña con las causas (ATC, pista no disponible, no estabilizada, sin referencia visual en DA/DH, sin autorización de aterrizaje, cizalladura). Estilo limpio, color de acento del módulo; sin ámbar ni rojo decorativos. Objetivo: Que el piloto vea que la comunicación va después de volar y navegar, y que la frase inicial es corta.",
        alto: 280,
      },
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En el motor y al aire",
        texto: "Los SOP definen quién anuncia el motor y al aire en cabina, quién hace la llamada a Torre y cuándo. Lo habitual es que el PM transmita «going around» cuando el PF ya tiene el avión subiendo y la frustrada en curso, pero no hay regla universal. La tripulación revisa antes de la aproximación la frustrada publicada y cualquier instrucción distinta que ATC haya anticipado, para no tener que leerla en el peor momento.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Hablar antes de volar", "**Hablar antes de volar**: soltar la radio antes de tener el avión estable."),
      error("Esperar la autorización para hacer motor y al aire", "No hace falta: se hace y se informa."),
      error("Volar la frustrada publicada cuando ATC dio otra", "**Volar la frustrada publicada cuando ATC dio otra** o al revés, por no colacionar bien."),
      error("Explicaciones largas", "**Explicaciones largas** en la frecuencia de Torre, bloqueando al avión que viene atrás."),
      error("Olvidar que el siguiente puede tener lo mismo", "**Olvidar que el siguiente puede tener lo mismo**: la razón (cizalladura, pista, meteorología) le sirve a ATC y a los demás."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Aviate, Navigate, Communicate.",
          "Iniciado por la tripulación: `GOING AROUND`.",
          "Sin otra instrucción, IFR vuela la frustrada publicada.",
          "Nuevas instrucciones de rumbo y nivel se colacionan.",
          "El motivo, corto y cuando el avión esté estable.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 4444 (15.ª ed., Enm. 4) cap. 1 («Procedimiento de aproximación frustrada», «Altitud de decisión (DA) o altura de decisión (DH)»); 4.5.7.5.1; 4.6.3.7 y su Nota (aproximación estabilizada, típicamente 3 NM, remite al Doc 8168). Doc 9432 (4.ª ed.) 2.6 («I SAY AGAIN», «ROGER», «CONTACT»); 3.3 (niveles); 6.3 (rumbos); 4.8.1 («GO AROUND AIRCRAFT ON THE RUNWAY», «GOING AROUND»); 4.8.2; 4.8.3; 6.4.2 («REQUEST VECTORS»).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: «SAY REASON FOR GO-AROUND» (u otra forma en que ATC pida el motivo), contra Doc 4444 16.ª ed. cap. 12 (no cargado). Si no existe, es PLAIN LANGUAGE.",
              "VERIFICAR: fraseología específica de cizalladura en la aproximación, contra Doc 4444 16.ª ed. cap. 12 y la AIP del Estado (no cargados).",
              "VERIFICAR: criterios de aproximación estabilizada, contra Doc 8168 PANS-OPS Vol. I (no cargado) y el SOP del operador.",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
]
