/**
 * Lecciones 62 y 63 de Comunicaciones ATC: la práctica piloto-controlador.
 *
 * 62 · Los 29 ejemplos de Camilo (el 30, el vuelo completo, es la 63), en El
 *      Dorado (SKBO) con AVIANCA 452 y tránsito real. Cada ejemplo deja a la
 *      vista situación, transmisión y qué se colaciona; el significado, el
 *      porqué, el error y las palabras clave van plegados.
 * 63 · (a) Un vuelo completo SKBO → SKRG en veinte fases; (b) fraseología FAA
 *      en Los Ángeles (KLAX) y LaGuardia (KLGA), lado a lado con la OACI.
 *
 * Fuentes: Doc 4444 (15.ª ed. en español, 4.5.7.5; 16.ª ed., copia no oficial
 * con enmiendas 1 a 7-A, cap. 6, 12 y 15), Doc 9432 4.ª ed., Doc 9870 App. A,
 * CAP 413 Ed. 24, FAA JO 7110.65BB / AIM / AIP GEN 1.7 (Change 3, 7/9/2026),
 * Chart Supplement y d-TPP del ciclo 2609. El detalle va en el plegable
 * «Fuentes» de cada lección. Los datos de SKBO y SKRG no están verificados
 * contra el AIP: van como ejemplo y con el aviso «Verificar».
 *
 * Se integran en nivel8.ts: `n`, `title` y `kicker` son los de las lecciones
 * 62 y 63 actuales y no se cambian.
 */

import type { DocBlockData, DocScreen } from "@/lib/docBlocks"

/** La nota única de cada lección con ejemplos. */
const NOTA_EJEMPLOS: DocBlockData = {
  kind: "callout",
  tone: "info",
  text: "Ejemplo educativo. El distintivo de llamada de la aerolínea es real; el número de vuelo es ficticio.",
}

/** La línea bajo el primer uso de un distintivo que no es el nombre comercial. */
const distintivo = (text: string): DocBlockData => ({ kind: "p", text })

/** Un hueco de imagen rotulado con su código, tipo, proporción y medida. */
const hueco = (rotulo: string, descripcion: string): DocBlockData => ({
  kind: "hueco",
  rotulo,
  descripcion,
  alto: 280,
})

// ── Lección 62 ──────────────────────────────────────────────────────────────

interface Ejemplo {
  n: number
  titulo: string
  situacion: string
  /** Una línea por turno: «ATC:   …» o «PILOT: …». */
  radio: string[]
  /** Rótulo visible bajo la transmisión (PLAIN LANGUAGE, Verificar). */
  etiqueta?: string
  /** Bloques visibles después de la transmisión: distintivo, secuencia. */
  despues?: DocBlockData[]
  colacionar: string
  hueco?: DocBlockData
  significa: string
  porQue: string
  /** Bloques plegados entre el porqué y el error. */
  extra?: DocBlockData[]
  error: string
  claves: string
}

/**
 * Un ejemplo de la lección 62. A la vista: situación, ATC, PILOT y qué se
 * colaciona, que es lo que se practica en el celular. Lo demás, tras el botón.
 */
function ejemplo(e: Ejemplo): DocBlockData[] {
  const out: DocBlockData[] = [
    { kind: "sub", text: `${e.n}. ${e.titulo}` },
    { kind: "p", text: `**SITUACIÓN:** ${e.situacion}` },
    { kind: "code", text: e.radio.join("\n") },
  ]
  if (e.etiqueta) out.push({ kind: "p", text: e.etiqueta })
  if (e.despues) out.push(...e.despues)
  out.push({ kind: "p", text: `**¿QUÉ DEBE COLACIONAR EL PILOTO?** ${e.colacionar}` })
  if (e.hueco) out.push(e.hueco)
  out.push({
    kind: "detalleTecnico",
    etiqueta: "Qué significa, por qué y error frecuente",
    bloques: [
      { kind: "p", text: `**¿QUÉ SIGNIFICA?** ${e.significa}` },
      { kind: "p", text: `**¿POR QUÉ?** ${e.porQue}` },
      ...(e.extra ?? []),
      { kind: "callout", tone: "warn", title: "Error frecuente", text: e.error },
      { kind: "p", text: `**PALABRAS CLAVE:** ${e.claves}` },
    ],
  })
  return out
}

const EJEMPLOS_TIERRA: Ejemplo[] = [
  {
    n: 1,
    titulo: "Pushback y encendido",
    situacion: "Puesto 23 de El Dorado, ATIS Bravo copiado, cabina lista para retroceder y encender.",
    radio: [
      "PILOT: El Dorado Ground, Avianca four five two, stand two three, information Bravo, request pushback and start up.",
      "ATC:   Avianca four five two, pushback and start up approved, facing west.",
      "PILOT: Pushback and start up approved, facing west, Avianca four five two.",
    ],
    etiqueta: "«Facing west» es un complemento local: el Doc 4444 (12.3.4.4) solo trae PUSHBACK APPROVED. Verificar el procedimiento de plataforma de SKBO.",
    colacionar: "La aprobación (pushback y encendido) y la orientación final: **facing west**.",
    significa: "ATC aprueba retroceder y encender, y fija hacia dónde queda la nariz al terminar: al oeste. Se usa APPROVED, no CLEARED: el retroceso no es una autorización de tránsito (CAP 413, fig. 4).",
    porQue: "No es una instrucción de pista, así que no está en la lista obligatoria del Doc 4444 4.5.7.5.1. Pero 4.5.7.5.1.1 pide que las demás instrucciones se colacionen o se acusen de forma que se note que se entendieron. La orientación es una condición: si el avión queda mirando al lado contrario, puede cerrarle la calle a otro tránsito.",
    error: "«Roger, Avianca four five two». ROGER solo dice «recibí» (Doc 9432 2.6): el controlador no sabe si oíste «west» o «east».",
    claves: "PUSHBACK APPROVED · START UP APPROVED · STAND · FACING (uso local)",
  },
  {
    n: 2,
    titulo: "Rodaje con hold short",
    situacion: "Salida por la 13R. La ruta cruza la 13L, que sigue activa.",
    radio: [
      "PILOT: El Dorado Ground, Avianca four five two, request taxi.",
      "ATC:   Avianca four five two, taxi to holding point runway one three right via Alpha, Bravo, hold short of runway one three left.",
      "PILOT: Taxi to holding point runway one three right via Alpha, Bravo, holding short of runway one three left, Avianca four five two.",
    ],
    colacionar: "Pista de destino (**13R**), ruta (**Alpha, Bravo**) y la espera antes de la 13L con la forma OACI: **HOLDING SHORT OF RUNWAY ONE THREE LEFT**.",
    hueco: hueco(
      "CM-62-02 · Diagrama · 16:9 · 1600×900",
      "Diagrama ficticio, no el plano de El Dorado: rodaje por Alpha y Bravo hacia la 13R con la 13L en medio, rotulado TAXI ROUTE, HOLDING POINT, RUNWAY 13L HOLD SHORT y DESTINATION RUNWAY 13R.",
    ),
    significa: "Puede rodar por Alpha y Bravo hacia la 13R, pero el primer límite es la 13L: se detiene en su punto de espera. Nada de esta autorización permite entrar a la 13L.",
    porQue: "Esperar antes de una pista está en la lista del Doc 4444 4.5.7.5.1 b). El 12.3.4.8 dice que ROGER y WILCO no bastan para HOLD SHORT OF: el acuse es **HOLDING SHORT**. El Doc 9870 (App. A, 4.8) trae este mismo caso con dos paralelas y colación «…HOLDING SHORT OF RUNWAY 06L, AFR375». Con 13L y 13R, la L o la R es lo único que separa una pista de la otra.",
    error: "«Taxi one three right, Avianca four five two». Se pierde la ruta y el hold short, que es justo la parte que evita la incursión en pista.",
    claves: "HOLDING POINT · VIA · HOLD SHORT OF · HOLDING SHORT · LEFT / RIGHT",
  },
  {
    n: 3,
    titulo: "Cruzar una pista",
    situacion: "Rodando por Alpha hacia la 13R, detenidos antes de la 13L. Las pistas las controla la torre (Doc 9870 App. A, 4.7).",
    radio: [
      "PILOT: El Dorado Tower, Avianca four five two, holding short of runway one three left.",
      "ATC:   Avianca four five two, cross runway one three left, continue taxi Alpha.",
      "PILOT: Cross runway one three left, continue Alpha, Avianca four five two.",
    ],
    colacionar: "La autorización de cruce con la pista exacta (**cross runway one three left**) y la ruta que sigue.",
    significa: "Ahora sí puede entrar a la 13L, solo para cruzarla, y seguir por Alpha. Sigue sin autorización para entrar a la 13R.",
    porQue: "Cruzar una pista está en el Doc 4444 4.5.7.5.1 b). El Doc 9870 (App. A, 4.6) exige que, si el límite de rodaje queda más allá de una pista, la autorización traiga un cruce explícito o una orden de esperar: rodar no es cruzar. La forma OACI es CROSS RUNWAY (número) [REPORT VACATED] (Doc 4444 12.3.4.9).",
    error: "Error crítico: «Continue Alpha, Avianca four five two». No dice qué pista se cruza; si la instrucción era para otro avión o para otra pista, nadie lo detecta a tiempo.",
    claves: "CROSS RUNWAY · REPORT VACATED · RUNWAY VACATED (todo el avión pasó el punto de espera, Doc 4444 12.3.4.9)",
  },
  {
    n: 4,
    titulo: "Line up and wait",
    situacion: "En el punto de espera de la 13R. Un LAN COLOMBIA acaba de despegar por la misma pista.",
    radio: [
      "ATC:   Avianca four five two, runway one three right, line up and wait.",
      "PILOT: Runway one three right, line up and wait, Avianca four five two.",
    ],
    despues: [distintivo("LATAM Airlines Colombia · por radio: LAN COLOMBIA")],
    colacionar: "Pista e instrucción: **runway one three right, line up and wait**.",
    hueco: hueco(
      "CM-62-03 · Ilustración · 16:9 · 1600×900",
      "Avión alineado en la 13R con un símbolo de alto y el rótulo LINE UP AND WAIT ≠ CLEARED FOR TAKEOFF, para fijar que alinearse no es despegar.",
    ),
    significa: "Entra a la 13R, se alinea y espera. No es una autorización de despegue.",
    porQue: "Entrar a una pista está en el Doc 4444 4.5.7.5.1 b). Con varias pistas, la OACI incluye el número (LINE UP RUNWAY (número), 12.3.4.10 g). El AIM de la FAA (5-2-5) advierte que muchos pilotos colacionaron bien esta instrucción y aun así despegaron sin autorización.",
    error: "Tomarla como autorización de despegue porque la pista está libre y el avión de adelante ya se fue.",
    claves: "LINE UP AND WAIT · LINE UP RUNWAY (número) · LINING UP",
  },
  {
    n: 5,
    titulo: "Autorización de despegue",
    situacion: "Alineados en la 13R.",
    radio: [
      "ATC:   Avianca four five two, runway one three right, cleared for take-off, wind one two zero degrees eight knots.",
      "PILOT: Runway one three right, cleared for take-off, Avianca four five two.",
    ],
    colacionar: "Pista y autorización. **El viento no**: es información.",
    significa: "Está autorizado a despegar de la 13R. El viento es el dato que el piloto usa para su decisión, no una instrucción.",
    porQue: "Despegar está en el Doc 4444 4.5.7.5.1 b); el viento no aparece en esa lista. El Doc 9432 (4.5.4) colaciona así: «RUNWAY 06 CLEARED FOR TAKE-OFF G-CD». La palabra TAKE-OFF solo se usa para autorizar o cancelar un despegue; antes se dice DEPARTURE (Doc 9432 2.8.3.3).",
    error: "«Taking off, Avianca four five two». No confirma pista ni autorización. Y antes de la autorización se dice «ready for departure», nunca «ready for take-off».",
    claves: "CLEARED FOR TAKE-OFF · READY FOR DEPARTURE · REPORT AIRBORNE",
  },
]

const EJEMPLOS_SALIDA: Ejemplo[] = [
  {
    n: 6,
    titulo: "Ascenso y rumbo",
    situacion: "Recién despegados, con Bogota Approach.",
    radio: [
      "ATC:   Avianca four five two, climb to flight level one niner zero, turn left heading zero niner zero.",
      "PILOT: Climb to flight level one niner zero, left heading zero niner zero, Avianca four five two.",
    ],
    colacionar: "Nivel con FLIGHT LEVEL, sentido del viraje y rumbo.",
    hueco: hueco(
      "CM-62-04 · Ilustración de cabina · 16:9 · 1600×900",
      "PFD y ND ficticios con FL190 en el selector de altitud y rumbo 090 seleccionado, para comparar lo colacionado con lo seleccionado.",
    ),
    significa: "Dos instrucciones en una: vertical (subir a FL190) y lateral (virar por la izquierda al rumbo 090).",
    porQue: "Niveles y rumbos están en el Doc 4444 4.5.7.5.1 c). La nota de ese párrafo pide FLIGHT LEVEL antes de las cifras. El sentido del viraje importa: el lado más corto no siempre es el que ATC quiere, por terreno o por tránsito.",
    error: "Colacionar una sola de las dos instrucciones, o decir «one niner zero» sin FLIGHT LEVEL.",
    claves: "CLIMB TO · FLIGHT LEVEL · TURN LEFT HEADING",
  },
  {
    n: 7,
    titulo: "Cambio de nivel",
    situacion: "En crucero a FL280, con Bogota Control. Hay un AMERICAN más adelante en la misma ruta.",
    radio: [
      "ATC:   Avianca four five two, descend to flight level two four zero.",
      "PILOT: Descend to flight level two four zero, Avianca four five two.",
    ],
    colacionar: "El nivel completo: **descend to flight level two four zero**.",
    significa: "Descenso ahora, no cuando convenga. Si ATC lo dejara a criterio de la cabina, diría WHEN READY (Doc 4444 12.3.1.2 g).",
    porQue: "Las instrucciones de nivel están en el Doc 4444 4.5.7.5.1 c). Según el Doc 9432 (2.6), ROGER no se usa para contestar algo que exige colación.",
    error: "«Roger, Avianca four five two». El controlador no puede oír qué nivel entendiste.",
    claves: "DESCEND TO · WHEN READY · LEAVING · REACHING",
  },
  {
    n: 8,
    titulo: "Velocidad",
    situacion: "Secuencia de llegada a Bogotá, con tránsito adelante.",
    radio: [
      "ATC:   Avianca four five two, reduce speed to two two zero knots.",
      "PILOT: Reduce speed to two two zero knots, Avianca four five two.",
    ],
    colacionar: "Valor y unidad: **two two zero knots**.",
    significa: "Reducir a 220 kt y mantenerla hasta que ATC la cambie o la libere (RESUME NORMAL SPEED, Doc 4444 12.4.1.6 h).",
    porQue: "Las instrucciones de velocidad están en el Doc 4444 4.5.7.5.1 c). La velocidad se transmite dígito a dígito (CAP 413 2.13, que reproduce la regla OACI).",
    error: "Error crítico: confundir 220 con 200. Pasa cuando se dice «two twenty» o «two hundred» en vez de «two two zero» y «two zero zero».",
    claves: "REDUCE SPEED TO · KNOTS · MAINTAIN · RESUME NORMAL SPEED",
  },
  {
    n: 9,
    titulo: "Rumbo y velocidad",
    situacion: "Vectores en la terminal de Bogotá.",
    radio: [
      "ATC:   Avianca four five two, turn right heading two seven zero, maintain two five zero knots.",
      "PILOT: Right heading two seven zero, maintain two five zero knots, Avianca four five two.",
    ],
    colacionar: "Sentido del viraje, rumbo y velocidad.",
    significa: "Tres datos, tres selectores: **RIGHT** (sentido), **270** (rumbo), **250 KT** (velocidad).",
    porQue: "Rumbo y velocidad están en el Doc 4444 4.5.7.5.1 c). La forma OACI es MAINTAIN (número) KNOTS (12.4.1.6 c).",
    error: "Cruzar los números: poner 250 en el rumbo o 270 en la velocidad, porque los dos terminan en cero y llegaron juntos.",
    claves: "TURN RIGHT HEADING · MAINTAIN (número) KNOTS",
  },
  {
    n: 10,
    titulo: "Directo a un punto",
    situacion: "En ascenso. GIKOS es un punto de ejemplo del curso.",
    radio: [
      "ATC:   Avianca four five two, proceed direct GIKOS.",
      "PILOT: Direct GIKOS, Avianca four five two.",
    ],
    despues: [
      {
        kind: "secuencia",
        items: ["HEAR", "READBACK", "SELECT", "VERIFY", "EXECUTE", "MONITOR"],
        orientacion: "horizontal",
        nota: "Guía didáctica, no fraseología: oír, colacionar, seleccionar, cotejar entre los dos pilotos, ejecutar y vigilar.",
      },
    ],
    colacionar: "El punto: **direct GIKOS** (deletreado si hay duda).",
    significa: "Nueva ruta lateral hasta GIKOS. Hay que encontrar el punto, comprobar que existe en la base de datos y que es el de la carta, seleccionarlo y cotejarlo con el otro piloto antes de ejecutar.",
    porQue: "Es una autorización de ruta: Doc 4444 4.5.7.5.1 a). El Doc 9432 (6.3.3) colaciona así: «DIRECT WICKEN VOR FASTAIR 345». Si GIKOS está en la SID, se cancelan las restricciones de los puntos que se saltan y las demás siguen vigentes (Doc 4444 6.3.2.4.4).",
    error: "Seleccionar un punto de nombre parecido sin cotejar en el FMS, o suponer que el directo cancela todas las restricciones de la SID.",
    claves: "PROCEED DIRECT · CLEARED DIRECT · REJOIN SID / STAR",
  },
  {
    n: 11,
    titulo: "Descenso con QNH",
    situacion: "Llegando a Bogotá, por debajo del nivel de transición.",
    radio: [
      "ATC:   Avianca four five two, descend to altitude one zero thousand feet, QNH one zero two three.",
      "PILOT: Descend to altitude one zero thousand feet, QNH one zero two three, Avianca four five two.",
    ],
    colacionar: "La altitud con FEET y el **QNH 1023**.",
    hueco: hueco(
      "CM-62-05 · Ilustración de cabina · 16:9 · 1600×900",
      "PFD ficticio con 10 000 ft en el selector y QNH 1023 hPa en la ventana del altímetro, señalando dónde se coteja cada dato colacionado.",
    ),
    significa: "Cambia la referencia: ya no es nivel de vuelo (1013,2 hPa) sino altitud sobre el QNH. Un QNH mal puesto se vuelve error de altitud: el avión vuela más bajo o más alto de lo que indica el altímetro.",
    porQue: "Reglajes de altímetro y niveles están en el Doc 4444 4.5.7.5.1 c). La nota del párrafo pide FEET después de las cifras cuando se vuela con QNH. El ejemplo de corrección del Doc 9432 (2.8.3.9) es justamente un QNH mal colacionado (1013 por 1003).",
    error: "Colacionar la altitud y olvidar el QNH, o decir 1013 por costumbre cuando ATC dio 1023.",
    claves: "DESCEND TO ALTITUDE · FEET · QNH · TRANSITION LEVEL",
  },
]

const EJEMPLOS_LLEGADA: Ejemplo[] = [
  {
    n: 12,
    titulo: "Autorización de aproximación",
    situacion: "Con vectores al localizador de la 13L. En El Dorado hay dos pistas paralelas.",
    radio: [
      "ATC:   Avianca four five two, cleared ILS approach runway one three left.",
      "PILOT: Cleared ILS approach runway one three left, Avianca four five two.",
    ],
    colacionar: "Tipo de aproximación y pista con su letra: **ILS, one three left**.",
    significa: "Puede volar la aproximación ILS publicada a la 13L. No es autorización para aterrizar.",
    porQue: "La forma OACI es CLEARED (tipo) APPROACH [RUNWAY (número)] (Doc 4444 12.3.3.2 f). La pista en uso está en la lista de 4.5.7.5.1 c). El manual académico de Aerocivil (2.3.5) pide colacionar la pista en final cuando hay paralelas.",
    error: "«Cleared approach, Avianca four five two». Sin tipo ni pista, en un aeropuerto con 13L y 13R.",
    claves: "CLEARED (type) APPROACH · RUNWAY LEFT / RIGHT",
  },
  {
    n: 13,
    titulo: "Continue approach",
    situacion: "Final de la 13L, a unas seis millas. Un AIRFRANS acaba de aterrizar y todavía no deja la pista.",
    radio: [
      "ATC:   Avianca four five two, continue approach, expect late landing clearance.",
      "PILOT: Continue approach, Avianca four five two.",
    ],
    etiqueta: "**PLAIN LANGUAGE · Verificar:** «expect late landing clearance» no aparece en ninguna fuente oficial consultada. «Continue approach» sí (Doc 4444 12.3.4.15 d).",
    despues: [distintivo("Air France · por radio: AIRFRANS (se dice «er-FRANS»)")],
    colacionar: "Acuse con el distintivo. **No hay nada autorizado que colacionar.**",
    hueco: hueco(
      "CM-62-06 · Ilustración · 16:9 · 1600×900",
      "Perfil de aproximación a la 13L con el avión en final, otro avión todavía en la pista y el rótulo NO LANDING CLEARANCE YET.",
    ),
    significa: "Sigue aproximándote, pero todavía **no** estás autorizado a aterrizar. La forma OACI completa es CONTINUE APPROACH [PREPARE FOR POSSIBLE GO AROUND] (Doc 4444 12.3.4.15 d).",
    porQue: "El CAP 413 (4.55) lo dice sin rodeos: «continue» no es una invitación a aterrizar; hay que esperar la autorización o iniciar motor y al aire. El Doc 9432 (4.7.1) muestra que el piloto solo acusa con su distintivo. Decisión de cabina: la altura a la que, sin autorización, se hace motor y al aire la fija el procedimiento del explotador.",
    error: "Tratar CONTINUE APPROACH como si fuera CLEARED TO LAND y tocar pista sin autorización.",
    claves: "CONTINUE APPROACH · PREPARE FOR POSSIBLE GO AROUND · CLEARED TO LAND",
  },
  {
    n: 14,
    titulo: "Autorización de aterrizaje",
    situacion: "Final corta de la 13L, pista libre.",
    radio: [
      "ATC:   Avianca four five two, runway one three left, cleared to land, wind one four zero degrees seven knots.",
      "PILOT: Runway one three left, cleared to land, Avianca four five two.",
    ],
    colacionar: "Pista y autorización. El viento es información.",
    significa: "Autorizado a aterrizar en la 13L. Hasta oír esa frase, no lo estaba.",
    porQue: "Aterrizar está en el Doc 4444 4.5.7.5.1 b). El Doc 9432 (4.7.1) colaciona así: «RUNWAY 27 CLEARED TO LAND FASTAIR 345».",
    error: "«Roger, Avianca four five two», o repetir el viento y omitir la pista, que con dos paralelas es el dato que importa.",
    claves: "CLEARED TO LAND · RUNWAY LEFT / RIGHT",
  },
  {
    n: 15,
    titulo: "Motor y al aire ordenado por ATC",
    situacion: "Final corta de la 13L. El SPEEDBIRD que aterrizó antes no ha dejado la pista.",
    radio: [
      "ATC:   Avianca four five two, go around, I say again, go around.",
      "PILOT: Going around, Avianca four five two.",
      "ATC:   Avianca four five two, climb to altitude one two thousand feet, fly heading one three zero.",
      "PILOT: Climb to altitude one two thousand feet, heading one three zero, Avianca four five two.",
    ],
    despues: [distintivo("British Airways · por radio: SPEEDBIRD (se dice «SPIID-berd»)")],
    colacionar: "Primero **GOING AROUND**. Después, altitud y rumbo.",
    significa: "Abandonar la aproximación ya. Sin otras instrucciones, se vuela la aproximación frustrada publicada (Doc 9432 4.8.2).",
    porQue: "La pareja GO AROUND / GOING AROUND es del Doc 4444 (12.3.4.18). El Doc 9432 (4.8.1) pide transmisiones breves y mínimas durante la maniobra. Primero se vuela el avión, después se habla: aviate, navigate, communicate.",
    error: "Pedir explicaciones antes de iniciar la maniobra, o colacionar la altitud y no seleccionarla.",
    claves: "GO AROUND · GOING AROUND · I SAY AGAIN · FLY HEADING",
  },
  {
    n: 16,
    titulo: "Motor y al aire iniciado por el piloto",
    situacion: "Autorizados a aterrizar en la 13L, la aproximación se desestabiliza por debajo de los criterios del explotador.",
    radio: [
      "PILOT: El Dorado Tower, Avianca four five two, going around.",
      "ATC:   Avianca four five two, roger, climb to altitude one two thousand feet, continue runway heading.",
      "PILOT: Climb to altitude one two thousand feet, continue runway heading, Avianca four five two.",
    ],
    colacionar: "Altitud y rumbo que da ATC después del aviso.",
    significa: "El piloto decide y avisa. La autorización para aterrizar es un permiso, no una obligación: no convierte una aproximación inestable en una que hay que terminar.",
    porQue: "Si el piloto inicia la maniobra, la frase es GOING AROUND (Doc 9432 4.8.3). La forma OACI para seguir el rumbo de pista es CONTINUE RUNWAY HEADING (Doc 4444 12.3.4.12 g).",
    error: "Seguir una aproximación inestable «porque ya estamos autorizados», o avisar con una explicación larga en vez de GOING AROUND.",
    claves: "GOING AROUND · CONTINUE RUNWAY HEADING · MISSED APPROACH",
  },
]

const EJEMPLOS_DUDA: Ejemplo[] = [
  {
    n: 17,
    titulo: "UNABLE",
    situacion: "Descenso con turbulencia. El manual del explotador fija una velocidad menor para cruzarla.",
    radio: [
      "ATC:   Avianca four five two, maintain two five zero knots.",
      "PILOT: Unable two five zero knots due turbulence, can maintain two two zero knots, Avianca four five two.",
    ],
    colacionar: "Lo que no se va a cumplir **no se colaciona**: se dice UNABLE, qué instrucción, por qué y qué se puede hacer.",
    significa: "La cabina no acepta la instrucción y le da a ATC una alternativa para que pueda replanear.",
    porQue: "UNABLE significa «no puedo cumplir» y normalmente va seguido del motivo (Doc 9432 2.6 y 2.8.3.10, con el ejemplo «UNABLE TO CROSS WICKEN FL 150 DUE WEIGHT, MAINTAINING FL 130»).",
    error: "Colacionar «maintain two five zero knots» por reflejo y después volar 220 sin avisar.",
    claves: "UNABLE · DUE (motivo) · CAN MAINTAIN / MAINTAINING",
  },
  {
    n: 18,
    titulo: "SAY AGAIN",
    situacion: "Frecuencia congestionada: oíste «Avianca four five two, turn…» y el resto quedó tapado.",
    radio: [
      "PILOT: Avianca four five two, say again heading.",
      "ATC:   Avianca four five two, fly heading two four zero.",
      "PILOT: Heading two four zero, Avianca four five two.",
    ],
    colacionar: "El rumbo, cuando ya se oyó completo.",
    significa: "Se pide repetir solo el dato que faltó.",
    porQue: "El Doc 9432 (2.8.1.4) da SAY AGAIN (elemento) para repetir una parte del mensaje. Colacionar un dato adivinado es peor que no colacionar.",
    error: "Adivinar el número o completarlo con el que «debería» ser.",
    claves: "SAY AGAIN · SAY AGAIN ALL AFTER / BEFORE · FLY HEADING",
  },
  {
    n: 19,
    titulo: "CONFIRM",
    situacion: "El plan de vuelo dice FL280 y te pareció oír 290 con ruido.",
    radio: [
      "PILOT: Bogota Control, Avianca four five two, confirm cleared flight level two niner zero.",
      "ATC:   Avianca four five two, affirm, climb to flight level two niner zero.",
      "PILOT: Climb to flight level two niner zero, Avianca four five two.",
    ],
    colacionar: "El nivel confirmado.",
    significa: "La cabina pide verificar un dato antes de actuar, y ATC lo confirma.",
    porQue: "CONFIRM pide verificación de una autorización o instrucción; la respuesta «sí» es AFFIRM (Doc 9432 2.6).",
    error: "Decir «affirmative». En la fraseología OACI la palabra es AFFIRM; «affirmative» es de la FAA (AIM 4-2-3).",
    claves: "CONFIRM · AFFIRM · NEGATIVE",
  },
  {
    n: 20,
    titulo: "Corrección de la colación",
    situacion: "En crucero, con Bogota Control.",
    radio: [
      "ATC:   Avianca four five two, descend to flight level two four zero.",
      "PILOT: Descend to flight level two three zero, Avianca four five two.",
      "ATC:   Avianca four five two, negative, I say again, descend to flight level two four zero.",
      "PILOT: Descend to flight level two four zero, Avianca four five two.",
    ],
    despues: [
      {
        kind: "secuencia",
        items: ["INSTRUCTION", "READBACK", "HEARBACK", "CORRECTION", "CORRECT READBACK"],
        orientacion: "horizontal",
        nota: "El ciclo solo se cierra con la colación correcta.",
      },
    ],
    colacionar: "El nivel **corregido**, completo: **descend to flight level two four zero**.",
    significa: "El controlador escuchó la colación, detectó el error y lo corrigió antes de que el avión llegara al nivel equivocado.",
    porQue: "El Doc 4444 (4.5.7.5.2) obliga al controlador a escuchar la colación y corregir cualquier discrepancia. El Doc 9432 (2.8.3.9) fija la forma: NEGATIVE, I SAY AGAIN y la versión correcta.",
    error: "Contestar «roger» a la corrección, o dejar seleccionado FL230 porque ya estaba puesto.",
    claves: "READBACK · HEARBACK · NEGATIVE · I SAY AGAIN",
  },
  {
    n: 21,
    titulo: "Distintivos parecidos",
    situacion: "En la misma frecuencia van AVIANCA 452 y AVIANCA 425.",
    radio: [
      "ATC:   Avianca four two five, descend to flight level two four zero.",
      "PILOT: Descend to flight level two four zero, Avianca four two five.",
      "       (Avianca 452 no responde y no desciende.)",
    ],
    colacionar: "AVIANCA 452 **no colaciona nada**: la instrucción no es suya. Si hay duda, pregunta con CONFIRM antes de mover el avión.",
    significa: "Primero el distintivo, después la instrucción: si el distintivo no es el tuyo, lo demás no te aplica.",
    porQue: "La colación termina con el distintivo para que actúe solo el avión al que iba dirigida (Doc 9432 2.8.3.4 y 2.8.3.7). Si la confusión se repite, ATC puede pedir cambiar temporalmente el tipo de distintivo (Doc 9432 2.7.2.3).",
    error: "Actuar porque se oyó «four… two…» y el nivel era el que se esperaba.",
    claves: "CALL SIGN FIRST, INSTRUCTION SECOND · SIMILAR CALL SIGNS · CONFIRM",
  },
]

const EJEMPLOS_NO_NORMAL: Ejemplo[] = [
  {
    n: 22,
    titulo: "Desvío por meteorología",
    situacion: "En crucero, con una celda en la ruta.",
    radio: [
      "PILOT: Bogota Control, Avianca four five two, request twenty miles right of track due weather.",
      "ATC:   Avianca four five two, deviation right approved, when able proceed direct GIKOS.",
      "PILOT: Deviation right approved, when able direct GIKOS, Avianca four five two.",
    ],
    etiqueta: "**PLAIN LANGUAGE · Verificar:** la solicitud, «deviation approved» y «report back on track» no tienen texto OACI oficial accesible. «When able proceed direct» sí existe (Doc 4444 12.4.1.3 h).",
    colacionar: "Lo aprobado (lado del desvío) y la instrucción posterior (directo a GIKOS cuando se pueda).",
    significa: "La solicitud lleva cuatro piezas: qué se pide, cuánto, hacia dónde y por qué. ATC aprueba y deja dicho cómo volver a la ruta.",
    porQue: "El Doc 4444 (15.2.3, contingencias en espacio oceánico) permite abrir con WEATHER DEVIATION REQUIRED para pedir prioridad, o con PAN PAN si hace falta, y obliga a avisar cuando se termina el desvío y el avión vuelve a su ruta (15.2.3.1.2). «DEVIATION … APPROVED» es la forma de la FAA (JO 7110.65BB 2-6-4).",
    error: "Salirse de la ruta y avisar después, o pedir «some deviation» sin distancia ni lado.",
    claves: "REQUEST · DUE WEATHER · RIGHT / LEFT OF TRACK · WHEN ABLE · WEATHER DEVIATION REQUIRED",
  },
  {
    n: 23,
    titulo: "Espera (holding)",
    situacion: "Llegada a Bogotá con demora.",
    radio: [
      "ATC:   Avianca four five two, proceed to GIKOS, maintain flight level two zero zero, hold as published, expect further clearance at four five.",
      "PILOT: Proceed to GIKOS, maintain flight level two zero zero, hold as published, expect further clearance at four five, Avianca four five two.",
    ],
    colacionar: "Todo: punto, nivel, espera publicada y hora esperada.",
    significa: "Ir a GIKOS, mantener FL200 y hacer la espera que muestra la carta. A los 45 del reloj se espera una nueva autorización.",
    porQue: "La forma OACI es CLEARED (o PROCEED) TO (punto) [MAINTAIN (nivel)] HOLD [(dirección)] AS PUBLISHED EXPECT APPROACH CLEARANCE (o FURTHER CLEARANCE) AT (hora) (Doc 4444 12.3.3.3 b). El límite y el nivel son de colación obligatoria (4.5.7.5.1 a y c). La hora sirve para calcular cuánto combustible deja la espera.",
    error: "Colacionar la espera y omitir la hora, o entrar al patrón sin revisar en la carta el sentido de los virajes y el rumbo de acercamiento.",
    claves: "PROCEED TO · HOLD AS PUBLISHED · EXPECT FURTHER CLEARANCE · EXPECTED APPROACH TIME · NO DELAY EXPECTED",
  },
  {
    n: 24,
    titulo: "MINIMUM FUEL",
    situacion: "Llegada a Bogotá, comprometidos a aterrizar allí. El cálculo dice que cualquier cambio a la autorización puede dejar el avión en tierra con menos de la reserva final planificada.",
    radio: [
      "PILOT: Bogota Approach, Avianca four five two, minimum fuel.",
      "ATC:   Avianca four five two, roger, no delay expected.",
    ],
    etiqueta: "Fraseología del Doc 4444, 16.ª ed., 12.3.1.3: MINIMUM FUEL / ROGER [NO DELAY EXPECTED o EXPECT (demora)]. Cotejar con la edición vigente.",
    colacionar: "Nada: es una declaración del piloto. Lo que responde ATC es información de demora.",
    significa: "**No es una emergencia.** Avisa que las opciones se redujeron a un aeródromo y que una demora más podría convertir la situación en emergencia.",
    porQue: "El Doc 4444 (15.5.4.1) obliga al controlador a informar cuanto antes la demora prevista o que no hay demora. Si el combustible utilizable previsto al aterrizar en el aeródromo más cercano queda por debajo de la reserva final, se declara MAYDAY, MAYDAY, MAYDAY, FUEL (Anexo 6, Parte I, 4.3.7.2.3, citado por EASA; Doc 4444 15.5.4, nota 3). La FAA define «minimum fuel» de otra manera y aclara que no implica prioridad (JO 7110.65BB 2-1-8).",
    error: "Decir MINIMUM FUEL cuando el cálculo ya da por debajo de la reserva final: eso es MAYDAY FUEL. Tampoco sirve «MAYDAY DUE TO FUEL», la forma que trae el manual académico de Aerocivil y que no es la de la OACI.",
    claves: "MINIMUM FUEL · NO DELAY EXPECTED · EXPECT (delay) · MAYDAY FUEL · FINAL RESERVE FUEL",
  },
  {
    n: 25,
    titulo: "MAYDAY",
    situacion: "En crucero a FL240, falla de motor. Hay que descender y buscar el aeródromo apto más cercano.",
    radio: [
      "PILOT: MAYDAY, MAYDAY, MAYDAY, Bogota Control, Avianca four five two, Airbus A320, engine failure, request immediate descent and vectors to nearest suitable airport, four zero miles north of GIKOS, flight level two four zero, heading three one zero.",
      "ATC:   Avianca four five two, Bogota Control, roger MAYDAY, descend to flight level one eight zero, turn right heading two seven zero.",
      "PILOT: Descend to flight level one eight zero, right heading two seven zero, Avianca four five two.",
    ],
    colacionar: "Nivel y rumbo: **flight level one eight zero, right heading two seven zero**.",
    significa: "El primer mensaje dice quién, qué pasó, qué necesita y dónde está. ATC acusa el MAYDAY y da lo que el avión necesita primero: nivel y rumbo.",
    porQue: "El orden del mensaje es el del CAP 413 (8.13): MAYDAY tres veces, estación, distintivo, tipo, naturaleza, intención, posición, nivel y rumbo. El acuse «Roger MAYDAY» es el del CAP 413 (8.13). El Doc 4444 (15.1.1.3) pide evitar cambios de frecuencia y de código, y limitar las maniobras a un avión con falla de motor; si ATC no asignó otro código, se pone 7700 (15.1.1, nota 2).",
    extra: [
      {
        kind: "secuencia",
        items: ["WHO", "WHAT HAPPENED", "WHAT DO YOU NEED", "WHERE / LEVEL"],
        orientacion: "horizontal",
        nota: "El primer mensaje, sin discursos.",
      },
    ],
    error: "Explicar la falla con detalle antes de decir qué se necesita, u omitir MAYDAY y esperar que ATC lo deduzca.",
    claves: "MAYDAY ×3 · ROGER MAYDAY · REQUEST IMMEDIATE DESCENT · NEAREST SUITABLE AIRPORT · 7700",
  },
  {
    n: 26,
    titulo: "PAN PAN por un pasajero",
    situacion: "En crucero hacia la costa, un pasajero con una emergencia médica. La tripulación decide volver a Bogotá.",
    radio: [
      "PILOT: PAN PAN, PAN PAN, PAN PAN, Bogota Control, Avianca four five two, passenger medical emergency, request priority direct Bogota, flight level three two zero.",
      "ATC:   Avianca four five two, roger, proceed direct Bogota, descend to flight level two four zero.",
      "PILOT: Proceed direct Bogota, descend to flight level two four zero, Avianca four five two.",
    ],
    colacionar: "Directo y nivel.",
    significa: "Urgencia: no hay peligro grave e inminente para el avión, pero hace falta prioridad. Si el paciente empeora, la tripulación puede escalar a MAYDAY: la clasificación depende de la gravedad y la decide la tripulación.",
    porQue: "El formato del mensaje es el mismo del MAYDAY (CAP 413 8.3 y 8.13). Nivel y ruta nuevos son de colación obligatoria (Doc 4444 4.5.7.5.1 a y c).",
    error: "Decir «PAN PAN MEDICAL». Esa expresión se reserva para transportes sanitarios protegidos por los Convenios de Ginebra (CAP 413 8.14), no para un pasajero enfermo.",
    claves: "PAN PAN ×3 · PASSENGER MEDICAL EMERGENCY · REQUEST PRIORITY",
  },
  {
    n: 27,
    titulo: "TCAS RA",
    situacion: "En crucero a FL300, el TCAS da un aviso de resolución (RA) de descenso.",
    radio: [
      "PILOT: Avianca four five two, TCAS RA.",
      "ATC:   Avianca four five two, roger.",
      "PILOT: Avianca four five two, clear of conflict, returning to flight level three zero zero.",
      "ATC:   Avianca four five two, roger.",
      "PILOT: Avianca four five two, clear of conflict, flight level three zero zero resumed.",
      "ATC:   Avianca four five two, roger.",
    ],
    colacionar: "Nada que colacionar: el piloto **informa** y ATC acusa. Si ATC da una instrucción contraria al RA: **unable, TCAS RA**.",
    significa: "Primero se cumple el RA; la llamada va apenas se pueda. Al terminar, se informa el regreso a la autorización y, después, que se recuperó.",
    porQue: "Es la secuencia del Doc 4444 (16.ª ed., 12.3.1.2 r a y): TCAS RA / ROGER; CLEAR OF CONFLICT, RETURNING TO (autorización) / ROGER; CLEAR OF CONFLICT (autorización) RESUMED / ROGER; y UNABLE, TCAS RA ante una instrucción contradictoria. El CAP 413 (5.32 a 5.34) trae la misma.",
    error: "Describir la maniobra («we are descending due traffic») en vez de TCAS RA, o usar «T-CAS descent», la forma del manual académico de Aerocivil (AIC A04/2015) que no es la OACI vigente.",
    claves: "TCAS RA · CLEAR OF CONFLICT · RETURNING TO · RESUMED · UNABLE, TCAS RA",
  },
]

const EJEMPLOS_FRECUENCIA: Ejemplo[] = [
  {
    n: 28,
    titulo: "Sin contacto después de cambiar de frecuencia",
    situacion: "Te pasaron a 128.3. Llamaste dos veces y nadie responde.",
    radio: [
      "PILOT: Bogota Control, Avianca four five two, flight level three five zero.",
      "       (sin respuesta: comprobar que la frecuencia quedó activa y no en espera, y el volumen)",
      "PILOT: Bogota Control, Avianca four five two, back on your frequency, no contact on one two eight decimal three.",
      "ATC:   Avianca four five two, contact Bogota Control one two six decimal niner.",
      "PILOT: One two six decimal niner, Avianca four five two.",
    ],
    etiqueta: "**PLAIN LANGUAGE:** «back on your frequency, no contact on…» no es fraseología normalizada; es lenguaje claro y breve. Frecuencias de ejemplo.",
    colacionar: "La frecuencia nueva.",
    significa: "Reintentar, comprobar lo que se seleccionó, volver a la frecuencia anterior y pedir la correcta. Sin diagnosticar la radio al aire.",
    porQue: "ATC puede dejar dicho de antemano qué hacer: IF NO CONTACT (instrucciones) (Doc 4444 12.3.1.4 c). La frecuencia se colaciona completa (Doc 9432 2.8.2.1).",
    error: "Quedarse en silencio en una frecuencia equivocada, o probar frecuencias al azar.",
    claves: "IF NO CONTACT · CONTACT · (frecuencia) · RETURN TO",
  },
  {
    n: 29,
    titulo: "Cambio de frecuencia y primera llamada",
    situacion: "En crucero a FL350, cambio de sector.",
    radio: [
      "ATC:   Avianca four five two, contact Bogota Control one two eight decimal three.",
      "PILOT: One two eight decimal three, Avianca four five two.",
      "       (cambio de frecuencia)",
      "PILOT: Bogota Control, Avianca four five two, flight level three five zero.",
    ],
    colacionar: "La frecuencia. En la primera llamada ya no se colaciona nada: se dice a quién, quién y el nivel.",
    significa: "Son dos transmisiones distintas: la colación de la frecuencia (en la frecuencia vieja) y la primera llamada (en la nueva).",
    porQue: "El Doc 9432 colaciona así: «129.1 FASTAIR 345» (2.8.2.1). En la llamada inicial al cambiar de frecuencia va el nivel (Doc 9432 3.4.1; CAP 413 3.26).",
    error: "Despedirse en vez de colacionar, o hacer la primera llamada sin nivel.",
    claves: "CONTACT · DECIMAL · INITIAL CALL · FLIGHT LEVEL",
  },
]

/** El cuadro final de la lección 62. */
const CUADRO_COLACION: DocBlockData = {
  kind: "table",
  head: ["Tipo de instrucción", "Qué se colaciona", "Fuente"],
  rows: [
    ["Autorización de ruta", "Límite, ruta o SID, nivel y código SSR", "Doc 4444 4.5.7.5.1 a) y c)"],
    ["Rodaje con hold short", "Ruta, pista de destino y HOLDING SHORT", "Doc 4444 4.5.7.5.1 b), 12.3.4.8 · FAA 7110.65 3-7-2 · AIM 4-3-18"],
    ["Cruzar, alinearse, despegar, aterrizar", "Pista con letra y la autorización", "Doc 4444 4.5.7.5.1 b) · FAA 7110.65 2-4-3"],
    ["Nivel o altitud", "El valor, con FLIGHT LEVEL o FEET", "Doc 4444 4.5.7.5.1 c) · AIM 4-4-7"],
    ["Rumbo", "Sentido del viraje y rumbo", "Doc 4444 4.5.7.5.1 c) · AIM 4-4-7"],
    ["Velocidad", "Valor y unidad", "Doc 4444 4.5.7.5.1 c)"],
    ["QNH o altímetro", "El valor completo", "Doc 4444 4.5.7.5.1 c)"],
    ["Código SSR", "El código", "Doc 4444 4.5.7.5.1 c)"],
    ["Nivel de transición (ATC o ATIS)", "El nivel", "Doc 4444 4.5.7.5.1 c)"],
    ["Directo, espera", "Punto, nivel y hora esperada", "Doc 4444 4.5.7.5.1 a) y c), 12.3.3.3"],
    ["Cambio de frecuencia", "La frecuencia", "Doc 4444 4.5.7.5.1.1 · Doc 9432 2.8.2.1"],
    ["Continue approach, tránsito, viento", "Acuse con distintivo: es información", "Doc 9432 4.7.1"],
    ["Lo que no se puede cumplir", "UNABLE y el motivo, no la colación", "Doc 9432 2.8.3.10"],
    ["PDC en EE. UU.", "Nada: no requiere colación", "AIM 5-2-2"],
  ],
}

// ── Lección 63 ──────────────────────────────────────────────────────────────

interface Fase {
  n: number
  nombre: string
  radio: string[]
  readback: "Sí" | "No" | "Parcial"
  que: string
  porQue: string
  error: string
}

/** Una tarjeta compacta del vuelo completo. */
function fase(f: Fase): DocBlockData[] {
  return [
    { kind: "sub", text: `${String(f.n).padStart(2, "0")} · ${f.nombre}` },
    { kind: "code", text: f.radio.join("\n") },
    {
      kind: "kv",
      items: [
        { k: "READBACK REQUIRED", v: f.readback },
        { k: "WHAT MUST BE READ BACK", v: f.que },
        { k: "WHY", v: f.porQue },
        { k: "COMMON ERROR", v: f.error },
      ],
    },
  ]
}

const FASES_TIERRA: Fase[] = [
  {
    n: 1,
    nombre: "Clearance Delivery",
    radio: [
      "PILOT: El Dorado Delivery, Avianca four five two, stand two three, IFR to Rionegro, information Alpha, request clearance.",
      "ATC:   Avianca four five two, cleared to Rionegro, (SID) departure, flight planned route, flight level two zero zero, squawk four one five two.",
      "PILOT: Cleared to Rionegro, (SID) departure, flight planned route, flight level two zero zero, squawk four one five two, Avianca four five two.",
    ],
    readback: "Sí",
    que: "Límite, SID, ruta, nivel y código SSR.",
    porQue: "Autorización de ruta, nivel y código: Doc 4444 4.5.7.5.1 a) y c). Modelo: Doc 9432 2.8.3.6.",
    error: "Omitir el código o el nombre de la SID; creer que la autorización de ruta permite entrar a la pista (Doc 9432 2.8.3.3).",
  },
  {
    n: 2,
    nombre: "Pushback",
    radio: [
      "PILOT: El Dorado Ground, Avianca four five two, stand two three, request pushback.",
      "ATC:   Avianca four five two, pushback approved.",
      "PILOT: Pushback approved, Avianca four five two.",
    ],
    readback: "Parcial",
    que: "La aprobación y cualquier condición (orientación, demora).",
    porQue: "No es una instrucción de pista; se colaciona o se acusa de forma clara (Doc 4444 4.5.7.5.1.1). Forma: 12.3.4.4.",
    error: "Empezar el retroceso con STAND BY, que no es aprobación ni negación (Doc 9432 2.6).",
  },
  {
    n: 3,
    nombre: "Ground: pedir rodaje",
    radio: [
      "PILOT: El Dorado Ground, Avianca four five two, request taxi.",
      "ATC:   Avianca four five two, taxi to holding point runway one three right via Alpha, Bravo, hold short of runway one three left.",
    ],
    readback: "No",
    que: "La solicitud no se colaciona; la instrucción de rodaje se colaciona en la fase 4.",
    porQue: "La solicitud es corta: dependencia, distintivo y lo que se pide. ATIS y posición ya se dieron en la fase 1.",
    error: "Pedir rodaje con frases de cortesía largas («good morning, we would like to…»). El Doc 9432 (3.1.4) pide evitarlas.",
  },
  {
    n: 4,
    nombre: "Taxi",
    radio: [
      "PILOT: Taxi to holding point runway one three right via Alpha, Bravo, holding short of runway one three left, Avianca four five two.",
      "ATC:   Avianca four five two, give way to the COPA A320 passing left to right.",
      "PILOT: Giving way to the COPA, Avianca four five two.",
    ],
    readback: "Sí",
    que: "Pista de destino, ruta, HOLDING SHORT de la 13L. A GIVE WAY se contesta GIVING WAY.",
    porQue: "Doc 4444 4.5.7.5.1 b) y 12.3.4.8; GIVE WAY / GIVING WAY es 12.3.4.7 t) y u). Modelo: Doc 9870 App. A, 4.8.",
    error: "«Taxi one three right»: sin ruta ni hold short.",
  },
  {
    n: 5,
    nombre: "Hold short",
    radio: [
      "PILOT: El Dorado Ground, Avianca four five two, holding short of runway one three left.",
      "ATC:   Avianca four five two, contact El Dorado Tower one one eight decimal one.",
      "PILOT: One one eight decimal one, Avianca four five two.",
    ],
    readback: "Sí",
    que: "La frecuencia.",
    porQue: "Las pistas las controla la torre: el paso se hace antes de cruzar (Doc 9870 App. A, 4.7).",
    error: "Cruzar la 13L porque la ruta sigue del otro lado: sin CROSS RUNWAY, no se cruza.",
  },
  {
    n: 6,
    nombre: "Tower",
    radio: [
      "PILOT: El Dorado Tower, Avianca four five two, holding short of runway one three left.",
      "ATC:   Avianca four five two, cross runway one three left, taxi to holding point runway one three right.",
      "PILOT: Cross runway one three left, taxi to holding point runway one three right, Avianca four five two.",
    ],
    readback: "Sí",
    que: "Cruce con la pista exacta y el nuevo límite.",
    porQue: "Cruzar una pista: Doc 4444 4.5.7.5.1 b). Primer contacto con la torre con paralelas: colacionar la pista (manual académico de Aerocivil 2.3.5).",
    error: "Contestar «crossing» sin decir qué pista.",
  },
  {
    n: 7,
    nombre: "Line up",
    radio: [
      "ATC:   Avianca four five two, runway one three right, line up and wait.",
      "PILOT: Runway one three right, line up and wait, Avianca four five two.",
    ],
    readback: "Sí",
    que: "Pista e instrucción.",
    porQue: "Entrar a la pista: Doc 4444 4.5.7.5.1 b) y 12.3.4.10.",
    error: "Tomarla como autorización de despegue.",
  },
  {
    n: 8,
    nombre: "Takeoff",
    radio: [
      "ATC:   Avianca four five two, runway one three right, cleared for take-off, wind one two zero degrees eight knots.",
      "PILOT: Runway one three right, cleared for take-off, Avianca four five two.",
    ],
    readback: "Sí",
    que: "Pista y autorización; el viento no.",
    porQue: "Despegar: Doc 4444 4.5.7.5.1 b). El viento es información.",
    error: "«Taking off» o «roger»: ni pista ni autorización.",
  },
]

const FASES_RUTA: Fase[] = [
  {
    n: 9,
    nombre: "Departure",
    radio: [
      "ATC:   Avianca four five two, contact Bogota Approach one one niner decimal five.",
      "PILOT: One one niner decimal five, Avianca four five two.",
      "PILOT: Bogota Approach, Avianca four five two, (SID) departure, passing altitude one one thousand feet, climbing flight level two zero zero.",
      "ATC:   Avianca four five two, Bogota Approach, identified.",
    ],
    readback: "Parcial",
    que: "La frecuencia. La primera llamada informa: SID, nivel que se pasa y nivel autorizado.",
    porQue: "Frecuencia: Doc 9432 2.8.2.1. Contenido de la primera llamada de salida: CAP 413 3.25. IDENTIFIED: Doc 4444 12.4.1.1 e).",
    error: "Primera llamada sin el nivel autorizado: ATC no puede comprobar que coincide con el suyo.",
  },
  {
    n: 10,
    nombre: "Climb",
    radio: [
      "ATC:   Avianca four five two, climb to flight level two four zero, proceed direct GIKOS.",
      "PILOT: Climb to flight level two four zero, direct GIKOS, Avianca four five two.",
    ],
    readback: "Sí",
    que: "Nivel y punto.",
    porQue: "Nivel: 4.5.7.5.1 c). Directo: autorización de ruta, 4.5.7.5.1 a). En una SID, el directo cancela las restricciones de los puntos saltados (6.3.2.4.4).",
    error: "Colacionar el nivel y ejecutar el directo sin cotejar el punto en el FMS.",
  },
  {
    n: 11,
    nombre: "Center",
    radio: [
      "ATC:   Avianca four five two, contact Bogota Control one two eight decimal three.",
      "PILOT: One two eight decimal three, Avianca four five two.",
      "PILOT: Bogota Control, Avianca four five two, passing flight level two one zero, climbing flight level two four zero.",
    ],
    readback: "Parcial",
    que: "La frecuencia. En la llamada inicial, nivel actual y autorizado.",
    porQue: "Frecuencia: Doc 9432 2.8.2.1. Si no está nivelado, va el nivel actual y el autorizado (CAP 413 3.27). El sufijo OACI de un centro de control de área es CONTROL (Doc 9432 2.7.1.1).",
    error: "Llamar «Bogota Center»: en la OACI el sufijo es CONTROL.",
  },
  {
    n: 12,
    nombre: "Cruise",
    radio: [
      "PILOT: Bogota Control, Avianca four five two, maintaining flight level two four zero.",
      "ATC:   Avianca four five two, roger, expect descent at GIKOS.",
      "PILOT: Roger, Avianca four five two.",
    ],
    readback: "No",
    que: "Nada: EXPECT no es una autorización.",
    porQue: "EXPECT CLIMB (o DESCENT) AT (hora o punto) anuncia, no autoriza (Doc 4444 12.3.1.2 h).",
    error: "Empezar a descender al oír «descent» dentro de un EXPECT.",
  },
  {
    n: 13,
    nombre: "Descent",
    radio: [
      "ATC:   Avianca four five two, descend to flight level two zero zero, contact Medellin Approach one one niner decimal seven.",
      "PILOT: Descend to flight level two zero zero, one one niner decimal seven, Avianca four five two.",
    ],
    readback: "Sí",
    que: "Nivel y frecuencia.",
    porQue: "Nivel: 4.5.7.5.1 c). Frecuencia: Doc 9432 2.8.2.1.",
    error: "Colacionar la frecuencia y olvidar el nivel cuando llegan en la misma transmisión.",
  },
]

const FASES_LLEGADA: Fase[] = [
  {
    n: 14,
    nombre: "STAR",
    radio: [
      "PILOT: Medellin Approach, Avianca four five two, descending flight level two zero zero, information Charlie.",
      "ATC:   Avianca four five two, Medellin Approach, identified, cleared (STAR) arrival, descend via STAR to altitude one two thousand feet, QNH one zero two four.",
      "PILOT: Cleared (STAR) arrival, descend via STAR to altitude one two thousand feet, QNH one zero two four, Avianca four five two.",
    ],
    readback: "Sí",
    que: "La STAR, el nivel de «descend via», el QNH.",
    porQue: "DESCEND VIA STAR TO (nivel): bajar al nivel autorizado cumpliendo las restricciones publicadas (Doc 4444 12.3.1.2 ff). QNH y nivel: 4.5.7.5.1 c).",
    error: "Bajar directo a la altitud autorizada saltándose las restricciones de la STAR.",
  },
  {
    n: 15,
    nombre: "Approach",
    radio: [
      "ATC:   Avianca four five two, turn left heading two zero zero, reduce speed to one eight zero knots.",
      "PILOT: Left heading two zero zero, reduce speed to one eight zero knots, Avianca four five two.",
    ],
    readback: "Sí",
    que: "Sentido del viraje, rumbo y velocidad.",
    porQue: "Rumbo y velocidad: 4.5.7.5.1 c). Formas: 12.4.1.3 e) y 12.4.1.6 f).",
    error: "Colacionar el rumbo y olvidar la velocidad.",
  },
  {
    n: 16,
    nombre: "ILS / RNP approach",
    radio: [
      "ATC:   Avianca four five two, cleared ILS approach runway one niner.",
      "PILOT: Cleared ILS approach runway one niner, Avianca four five two.",
    ],
    readback: "Sí",
    que: "Tipo de aproximación y pista.",
    porQue: "CLEARED (tipo) APPROACH [RUNWAY (número)], Doc 4444 12.3.3.2 f). Para una RNP, el designador en lenguaje claro de la carta (12.3.3.2 y, z).",
    error: "«Cleared approach» sin tipo ni pista.",
  },
  {
    n: 17,
    nombre: "Landing",
    radio: [
      "PILOT: Rionegro Tower, Avianca four five two, established ILS runway one niner.",
      "ATC:   Avianca four five two, runway one niner, cleared to land, wind one seven zero degrees six knots.",
      "PILOT: Runway one niner, cleared to land, Avianca four five two.",
    ],
    readback: "Sí",
    que: "Pista y autorización.",
    porQue: "Aterrizar: Doc 4444 4.5.7.5.1 b).",
    error: "Tomar un «continue approach» como autorización.",
  },
  {
    n: 18,
    nombre: "Vacate",
    radio: [
      "ATC:   Avianca four five two, take first right, when vacated contact Ground one two one decimal eight.",
      "PILOT: First right, wilco, one two one decimal eight, Avianca four five two.",
    ],
    readback: "Parcial",
    que: "La frecuencia; la salida se acusa con WILCO.",
    porQue: "Es el modelo del Doc 9432 (4.9): «FIRST RIGHT, WILCO 118.350 FASTAIR 345». Se sigue en la frecuencia de la torre hasta dejar libre la pista (Doc 9432 4.9).",
    error: "Cambiar a Ground antes de dejar la pista libre.",
  },
  {
    n: 19,
    nombre: "Ground",
    radio: [
      "PILOT: Rionegro Ground, Avianca four five two, runway vacated.",
      "ATC:   Avianca four five two, taxi to stand (número) via (calle).",
      "PILOT: Stand (número) via (calle), Avianca four five two.",
    ],
    readback: "Sí",
    que: "Puesto y ruta.",
    porQue: "Modelo: Doc 9432 4.9, «STAND 27 VIA TAXIWAY ALPHA FASTAIR 345». RUNWAY VACATED solo cuando todo el avión pasó el punto de espera (Doc 4444 12.3.4.9).",
    error: "Decir «runway vacated» con la cola todavía dentro del área de la pista.",
  },
  {
    n: 20,
    nombre: "Gate",
    radio: [
      "       (Normalmente no hay transmisión al entrar al puesto.)",
      "PILOT: Rionegro Ground, Avianca four five two, holding at entrance stand (número), no marshaller.",
    ],
    readback: "No",
    que: "Nada. La segunda línea solo si el procedimiento local lo pide o algo falla (PLAIN LANGUAGE).",
    porQue: "Si falta el señalero o la guía de plataforma, se para y se avisa: no se entra a un puesto sin guía.",
    error: "Entrar al puesto sin guía para no hacer esperar a los pasajeros.",
  },
]

/** Una comparación FAA / OACI, lado a lado. */
function comparacion(c: {
  titulo: string
  contexto: string
  filas: [string, string][]
  diferencia: string
}): DocBlockData[] {
  return [
    { kind: "sub", text: c.titulo },
    { kind: "p", text: c.contexto },
    { kind: "table", head: ["FAA (EE. UU.)", "OACI (equivalente)"], rows: c.filas },
    { kind: "p", text: `**Diferencia:** ${c.diferencia}` },
  ]
}

const COMPARACIONES_KLAX: DocBlockData[] = [
  ...comparacion({
    titulo: "1. Autorización: Los Angeles Clearance Delivery, 120.35",
    contexto: "Voz o PDC. El Chart Supplement de KLAX lista «PDC» y «CPDLC (LOGON KUSA)».",
    filas: [
      [
        "ATC: Avianca four five two, cleared to LaGuardia Airport, ORCKA Five departure, Las Vegas transition, then as filed. Climb via SID. Departure frequency one two four point three, squawk two three five one.",
        "ATC: Avianca four five two, cleared to LaGuardia, ORCKA Five departure, Las Vegas transition, flight planned route, climb via SID to flight level two three zero, squawk two three five one.",
      ],
      [
        "PILOT: Cleared to LaGuardia, ORCKA Five departure, Las Vegas transition, then as filed, climb via SID, departure one two four point three, squawk two three five one, Avianca four five two.",
        "PILOT: Cleared to LaGuardia, ORCKA Five departure, Las Vegas transition, flight planned route, climb via SID to flight level two three zero, squawk two three five one, Avianca four five two.",
      ],
    ],
    diferencia: "La FAA dice CLIMB VIA SID **sin nivel**: se sube a la Top Altitude de la carta, FL230 en la ORCKA FIVE (AIP EE. UU. GEN 1.7, 6.3.2.4 a). La OACI siempre da el nivel (Doc 4444 6.3.2.4.1). «Then as filed» es la FAA; «flight planned route», la OACI. La FAA dice «point» donde la OACI dice «decimal». Con **PDC** no se colaciona nada (AIM 5-2-2); con **CPDLC-DCL** sí hay respuesta de la tripulación, y hace falta autorización CPDLC/FANS de la propia autoridad.",
  }),
  ...comparacion({
    titulo: "2. Rodaje: Los Angeles Ground, 121.75 (complejo sur)",
    contexto: "La ruta queda entre paréntesis: el texto del diagrama de aeródromo no se pudo leer con fiabilidad.",
    filas: [
      [
        "ATC: Avianca four five two, runway two five right, taxi via (route).",
        "ATC: Avianca four five two, taxi to holding point runway two five right via (route).",
      ],
      [
        "PILOT: Runway two five right, taxi via (route), Avianca four five two.",
        "PILOT: Taxi to holding point runway two five right via (route), Avianca four five two.",
      ],
    ],
    diferencia: "La FAA dice **la pista primero** y no usa «holding point» (JO 7110.65BB 3-7-2); nunca dice «cleared» para rodar (AIM 4-3-18). Sin instrucción de espera, se pueden cruzar las **calles** del recorrido, nunca una pista (3-7-2, nota; AIM 4-3-18).",
  }),
  ...comparacion({
    titulo: "3. Hold short y cruce en LAX",
    contexto: "Otro día, aterrizando por la 24R (escenario de práctica). El Hot Spot HS 1 de LAX dice: después de aterrizar en la 24R, espere tener que parar antes de la 24L, en las calles V, W y Y.",
    filas: [
      ["ATC: Avianca four five two, hold short of runway two four left.", "ATC: Avianca four five two, hold short of runway two four left."],
      ["PILOT: Hold short of runway two four left, Avianca four five two.", "PILOT: Holding short of runway two four left, Avianca four five two."],
      ["ATC: Avianca four five two, cross runway two four left at taxiway Yankee.", "ATC: Avianca four five two, cross runway two four left."],
    ],
    diferencia: "La frase de ATC es la misma. La FAA exige colacionar la instrucción («READ BACK HOLD INSTRUCTIONS», 3-7-2) y los diagramas de LAX y LGA lo recuerdan: «READBACK OF ALL RUNWAY HOLDING INSTRUCTIONS IS REQUIRED». La OACI pide contestar **HOLDING SHORT** (Doc 4444 12.3.4.8). La FAA dice por dónde se cruza y da un cruce por cada pista (3-7-2).",
  }),
  ...comparacion({
    titulo: "4. Pista: Los Angeles Tower, 120.95 (complejo sur)",
    contexto: "Salida por la 25R con la ORCKA FIVE; su primer punto es DOCKR.",
    filas: [
      ["ATC: Avianca four five two, runway two five right, line up and wait.", "ATC: Avianca four five two, line up and wait runway two five right."],
      ["ATC: Avianca four five two, RNAV to DOCKR, runway two five right, cleared for takeoff.", "ATC: Avianca four five two, runway two five right, cleared for take-off."],
    ],
    diferencia: "La FAA **no permite autorizaciones condicionales**: nada de «behind landing traffic, line up and wait» (3-9-4; GEN 1.7, 12.2.7). La OACI sí, si piloto y controlador ven el avión: «BEHIND DC9 ON SHORT FINAL, LINE UP BEHIND» (Doc 4444 12.2.7). En la FAA, un avión no debería pasar más de 90 segundos alineado sin otra instrucción (3-9-4, nota). «RNAV to (primer punto)» sale del ejemplo del AIM 5-2-8.",
  }),
  ...comparacion({
    titulo: "5. Salida: SoCal Departure, 124.3",
    contexto: "La frecuencia sale del pie de la carta ORCKA FIVE.",
    filas: [
      [
        "PILOT: SoCal Departure, Avianca four five two, leaving one thousand two hundred, climbing via the ORCKA Five departure.",
        "PILOT: (Unidad), Avianca four five two, ORCKA Five departure, passing one thousand two hundred feet, climbing via SID to flight level two three zero.",
      ],
      ["ATC: Avianca four five two, SoCal Departure, radar contact.", "ATC: Avianca four five two, identified."],
    ],
    diferencia: "En «climb via», la FAA pide decir la altitud que se deja y el procedimiento (7110.65BB 4-5-7, nota). Bajo 18 000 ft se dicen los miles y los cientos: «one thousand two hundred» (AIM 4-2-9). El Doc 4444 tiene RADAR CONTACT e IDENTIFIED (12.4.1.1 d y e); en EE. UU. se oye RADAR CONTACT, y la FAA no usa «identification lost» ni «will shortly lose identification» (GEN 1.7, 12.4.1.1 f).",
  }),
  ...comparacion({
    titulo: "6. «Climb and maintain»",
    contexto: "Ya en ascenso por la SID.",
    filas: [
      ["ATC: Avianca four five two, climb and maintain flight level three five zero.", "ATC: Avianca four five two, climb to flight level three five zero, cancel level and speed restrictions."],
      ["PILOT: Climb and maintain flight level three five zero, Avianca four five two.", "PILOT: Climb to flight level three five zero, cancel level and speed restrictions, Avianca four five two."],
    ],
    diferencia: "En la FAA, un «climb and maintain» sobre un «climb via» **cancela** las restricciones de altitud publicadas de la SID, y no existe «climb unrestricted» (GEN 1.7, 6.3.2.4 b y e). La OACI obliga a decir si las restricciones siguen o se cancelan (Doc 4444 6.3.2.4.1; «CLIMB UNRESTRICTED TO» o «CLIMB TO (nivel), CANCEL LEVEL AND SPEED RESTRICTIONS»).",
  }),
]

const COMPARACIONES_KLGA: DocBlockData[] = [
  ...comparacion({
    titulo: "7. Descenso: New York Approach, 120.8 / 120.05",
    contexto: "Llegando por la STAR MILTON FOUR (MIP.MIP4). Qué STAR usa en la práctica un vuelo desde el oeste no está verificado.",
    filas: [
      [
        "ATC: Avianca four five two, descend and maintain one three thousand. LaGuardia altimeter three zero one two.",
        "ATC: Avianca four five two, descend to altitude one three thousand feet, QNH one zero two zero.",
      ],
      [
        "PILOT: Descend and maintain one three thousand, LaGuardia altimeter three zero one two, Avianca four five two.",
        "PILOT: Descend to altitude one three thousand feet, QNH one zero two zero, Avianca four five two.",
      ],
    ],
    diferencia: "En EE. UU. los niveles de vuelo empiezan fijos en **FL180** con 29.92: no hay altitud ni nivel de transición que colacionar, y el altímetro va en **pulgadas** (GEN 1.7, 4.5.7.3 y 12.3.1.8 l-m; AIM 7-2). La FAA dice «altitude» o «flight level», nunca «level» (GEN 1.7). Las STAR de LAX avisan incluso «Expect local area altimeter reaching FL230».",
  }),
  ...comparacion({
    titulo: "8. Velocidad y aproximación",
    contexto: "Vectores al ILS de la 22.",
    filas: [
      ["ATC: Avianca four five two, reduce speed to two one zero.", "ATC: Avianca four five two, reduce speed to two one zero knots."],
      ["ATC: Avianca four five two, cleared ILS runway two two approach.", "ATC: Avianca four five two, cleared ILS approach runway two two."],
    ],
    diferencia: "Cambia el orden de la pista, no el contenido (7110.65BB 4-8-1; Doc 4444 12.3.3.2 f). La FAA ajusta velocidades de 5 en 5 nudos y no asigna velocidad dentro del FAF o a menos de 5 NM del final de pista (GEN 1.7, 4.6.1.5 y 4.6.3.7).",
  }),
  ...comparacion({
    titulo: "9. Aterrizaje: LaGuardia Tower, 118.7",
    contexto: "Pista 22.",
    filas: [
      ["ATC: Avianca four five two, runway two two, cleared to land.", "ATC: Avianca four five two, runway two two, cleared to land."],
    ],
    diferencia: "Igual (7110.65BB 3-10-5; Doc 4444 12.3.4.16). La FAA agrega el LAHSO, «cleared to land, hold short of…» (GEN 1.7, 7.10.3.1).",
  }),
  ...comparacion({
    titulo: "10. Salida de LaGuardia: LAGUARDIA SEVEN",
    contexto: "Es una SID de vectores. KLGA publica además «PRE TAXI CLNC 135.2»: se llama a Clearance Delivery no más de 10 minutos antes del rodaje (AIM 5-2-1).",
    filas: [
      [
        "ATC: Avianca four five two, cleared to (destination) Airport, LaGuardia Seven departure, (transition), then as filed. Maintain five thousand. Expect (flight level) one zero minutes after departure. Departure frequency one two zero point four, squawk (code).",
        "ATC: Avianca four five two, cleared to (destination), LaGuardia Seven departure, (transition), flight planned route, climb to altitude five thousand feet, squawk (code).",
      ],
    ],
    diferencia: "Con una SID de vectores, la FAA autoriza con **MAINTAIN (altitude)** y no con «climb via SID» (7110.65BB 4-3-2). Es el contraste con la ORCKA FIVE: allí «climb via», aquí «maintain five thousand».",
  }),
]

/** Resumen FAA / OACI de la lección 63. */
const TABLA_FAA_OACI: DocBlockData = {
  kind: "table",
  head: ["Tema", "FAA", "OACI"],
  rows: [
    ["Rodaje", "RUNWAY (n), TAXI VIA…", "TAXI TO HOLDING POINT RUNWAY (n) VIA…"],
    ["Hold short", "Se colaciona la instrucción", "Se contesta HOLDING SHORT"],
    ["SID con restricciones", "CLIMB VIA SID (sin nivel)", "CLIMB VIA SID TO (nivel)"],
    ["Cambio de nivel", "CLIMB AND MAINTAIN", "CLIMB TO"],
    ["Transición", "FL180 fijo, altímetro en pulgadas", "Variable, QNH en hPa, se colaciona"],
    ["Identificación", "RADAR CONTACT", "RADAR CONTACT o IDENTIFIED"],
    ["Condicionales", "No se usan", "Sí, con el avión a la vista"],
    ["Frecuencias", "POINT", "DECIMAL"],
    ["Autorización por datos", "PDC sin colación", "CPDLC: la colación oral no se exige salvo que la autoridad lo pida (Doc 4444 4.5.7.5.2.1)"],
  ],
}

export const LECCION_62: DocScreen = {
  n: 62,
  title: "Fraseología que debes dominar",
  kicker: "No recitar frases: reconocer intención, límite y respuesta",
  minutes: 20,
  blocks: [
    {
      kind: "p",
      text: "Veintinueve comunicaciones piloto-controlador en El Dorado, de la plataforma a la emergencia. En cada una: qué dice ATC, qué contesta el piloto y qué tiene que colacionar sí o sí. El significado, el porqué, el error frecuente y las palabras clave quedan tras el botón: **responde en voz alta antes de abrirlo**. El ejemplo 30, el vuelo completo, es la lección 63.",
    },
    NOTA_EJEMPLOS,
    {
      kind: "callout",
      tone: "verificar",
      title: "Verificar",
      text: "Frecuencias, calles, altitudes, GIKOS y nombres de dependencias de El Dorado son de ejemplo: verificar contra AIP Colombia AD 2 SKBO.",
    },
    {
      kind: "figura",
      src: "/modulos/comunicaciones/CM-62-01.svg",
      alt: "Secuencia de cuatro preguntas para responder una instrucción ATC: quién, qué, bajo qué límite y qué confirma o solicita la tripulación.",
      ancho: 1600,
      alto: 900,
      pie: "Antes de actuar: destinatario, acción, límite y respuesta. Después, cotejar que la selección y el avión hagan lo autorizado.",
    },
    { kind: "titulo", text: "En tierra", sub: "Ejemplos 1 a 5" },
    ...EJEMPLOS_TIERRA.flatMap(ejemplo),
    { kind: "titulo", text: "Salida y ruta", sub: "Ejemplos 6 a 11" },
    ...EJEMPLOS_SALIDA.flatMap(ejemplo),
    { kind: "titulo", text: "Llegada", sub: "Ejemplos 12 a 16" },
    ...EJEMPLOS_LLEGADA.flatMap(ejemplo),
    { kind: "titulo", text: "Cuando algo no está claro", sub: "Ejemplos 17 a 21" },
    ...EJEMPLOS_DUDA.flatMap(ejemplo),
    { kind: "titulo", text: "No normal y emergencias", sub: "Ejemplos 22 a 27" },
    ...EJEMPLOS_NO_NORMAL.flatMap(ejemplo),
    { kind: "titulo", text: "Frecuencias", sub: "Ejemplos 28 y 29" },
    ...EJEMPLOS_FRECUENCIA.flatMap(ejemplo),
    { kind: "p", text: "**30. El vuelo completo:** de Clearance Delivery al puesto de llegada, en la lección 63." },
    { kind: "titulo", text: "¿Qué debo colacionar?" },
    CUADRO_COLACION,
    {
      kind: "summary",
      title: "En pocas palabras",
      items: [
        "Pista, nivel, rumbo, velocidad, QNH, código y ruta se colacionan siempre, con el distintivo al final.",
        "HOLD SHORT se contesta HOLDING SHORT; ROGER y WILCO no bastan.",
        "CONTINUE APPROACH y LINE UP AND WAIT no son autorizaciones para aterrizar ni para despegar.",
        "Lo que no se puede cumplir no se colaciona: UNABLE y el motivo.",
        "La duda se resuelve con SAY AGAIN o CONFIRM antes de mover el avión.",
      ],
    },
    {
      kind: "detalleTecnico",
      etiqueta: "Fuentes",
      cita: "Doc 4444 4.5.7.5 · cap. 12",
      bloques: [
        { kind: "p", text: "**OACI Doc 4444, PANS-ATM, 15.ª ed. (2007), texto en español:** 4.5.7.5.1 (lo que se colaciona siempre), 4.5.7.5.1.1 (lo demás se colaciona o se acusa), 4.5.7.5.2 (el controlador escucha y corrige), 4.5.7.5.2.1 (CPDLC)." },
        { kind: "p", text: "**OACI Doc 4444, 16.ª ed. (2016), enmiendas 1 a 7-A**, copia no oficial alojada en aviacion.edu.co: 6.3.2.4 (SID), 12.2.7 (condicionales), 12.3.1.2 g, m y r a y (WHEN READY, TCAS RA), 12.3.1.3 (MINIMUM FUEL), 12.3.1.4 (frecuencias), 12.3.3.2 f (aproximación), 12.3.3.3 b (espera), 12.3.4.3 a 12.3.4.20 (aeródromo), 12.4.1.1, 12.4.1.3, 12.4.1.6 (vectores y velocidad), 15.1.1, 15.2.3 (desvío meteorológico, oceánico) y 15.5.4 (combustible). Cotejar con la edición vigente antes de citarla como norma." },
        { kind: "p", text: "**OACI Doc 9432, Manual de radiotelefonía, 4.ª ed. (2007)**, en español con el inglés entre paréntesis: 2.6 (AFFIRM, ROGER, UNABLE, STANDBY), 2.7.1.1 (sufijos: DELIVERY, GROUND, TOWER, APPROACH, CONTROL), 2.7.2.3, 2.8.1.4, 2.8.2.1, 2.8.3.3 a 2.8.3.10, 3.1.4, 3.4.1, 4.5, 4.7.1, 4.8, 4.9, 6.3." },
        { kind: "p", text: "**OACI Doc 9870**, Manual on the Prevention of Runway Incursions, App. A (alojado por SKYbrary; edición no consta): 2.2 a 2.4 (HOLDING SHORT), 4.6 a 4.8 (ejemplo con 06L y 06R)." },
        { kind: "p", text: "**UK CAA CAP 413**, Ed. 24 (vigente desde el 1 jul 2026; sigue a la OACI con diferencias en su Apéndice 1): 2.13, 3.25 a 3.27, 4.55, 5.32 a 5.34, 8.3, 8.13 (orden del mensaje y «Roger MAYDAY»), 8.14 (PAN PAN MEDICAL), fig. 4." },
        { kind: "p", text: "**Anexo 6, Parte I, 4.3.7.2.2 y 4.3.7.2.3** (MINIMUM FUEL y MAYDAY FUEL), texto de la Enmienda 36 citado por EASA SIB 2013-12 e IFALPA 13ATSBL01 (fuente secundaria)." },
        { kind: "p", text: "**FAA** (no OACI): JO 7110.65BB Change 3, 7/9/2026, 2-1-8 (minimum fuel), 2-6-4 (DEVIATION APPROVED), 3-7-2; AIM 4-2-3 (AFFIRMATIVE), 4-3-18, 4-4-7, 5-2-2, 5-2-5." },
        { kind: "p", text: "**Distintivos:** FAA JO 7340.2P Change 3 (7/9/2026), que publica la asignación OACI del Doc 8585: AVIANCA, AMERICAN, COPA, LAN COLOMBIA, AIRFRANS, SPEEDBIRD. La 7340.2R entra el 29 oct 2026: volver a mirar." },
        { kind: "p", text: "**Aerocivil, Manual Guía de Fraseología Aeronáutica**, versión académica, 3.ª ed., mayo 2019 (alojado en un sitio académico; fuente secundaria, posiblemente desactualizada): nombres EL DORADO TOWER, EL DORADO GROUND, Bogota Control, Bogota Approach, Medellin Approach; 2.3.5 (colación de pista con paralelas). Trae «MAYDAY DUE TO FUEL» y «T-CAS descent», que no son la forma OACI." },
        { kind: "p", text: "**Sin fuente oficial** (van rotulados): «facing west» (ej. 1), «expect late landing clearance» (ej. 13), la solicitud de desvío, «deviation approved» y «report back on track» (ej. 22), «back on your frequency, no contact» (ej. 28). **No verificado** (AIP Colombia AD 2 SKBO no disponible): frecuencias, calles, altitudes, GIKOS, «El Dorado Delivery» (el manual de Aerocivil da el sufijo CLEARANCE; el Doc 9432, DELIVERY)." },
        { kind: "p", text: "**Ajustes al texto propuesto, por la fuente:** «to» en ascensos, descensos y velocidades (Doc 4444 12.3.1.2 y 12.4.1.6); «maintain two five zero knots» sin «speed» (12.4.1.6 c); AFFIRM (Doc 9432 2.6); NEGATIVE, I SAY AGAIN (Doc 9432 2.8.3.9); «hold as published» con el orden del 12.3.3.3 b; «continue runway heading» en vez de «fly runway heading», que es de la FAA (12.3.4.12 g); Bogota Control en vez de «Center» (Doc 9432 2.7.1.1); «roger» sin «PAN» en el acuse del ej. 26 (sin fuente); motor y al aire a 12 000 ft en vez de 9 000 ft, que quedaría a unos cientos de pies sobre El Dorado (verificar la altitud de la aproximación frustrada en la carta)." },
        { kind: "p", text: "Los diálogos son ejemplos educativos construidos para el curso, no transcripciones de vuelos reales." },
      ],
    },
  ],
}

export const LECCION_63: DocScreen = {
  n: 63,
  title: "Aviation English: práctica operacional",
  kicker: "Veinte decisiones, de superficie a contingencia",
  minutes: 27,
  blocks: [
    {
      kind: "p",
      text: "Un vuelo completo de AVIANCA 452 de Bogotá El Dorado (SKBO) a Rionegro (SKRG), transmisión por transmisión, para seguirlo como si estuvieras en la cabina. Después, lo que cambia cuando el vuelo sale de Los Ángeles o llega a LaGuardia, donde manda la FAA.",
    },
    NOTA_EJEMPLOS,
    {
      kind: "callout",
      tone: "verificar",
      title: "Verificar",
      text: "Frecuencias, calles, SID, STAR, pistas de SKRG y dependencias en Colombia son de ejemplo: verificar AIP Colombia AD 2 SKBO y SKRG.",
    },
    {
      kind: "figura",
      src: "/modulos/comunicaciones/CM-63-01.webp",
      alt: "Secuencia visual de tres escenas: piloto escucha una instrucción, controlador transmite desde la torre y dos pilotos comprueban juntos la interpretación.",
      ancho: 1672,
      alto: 941,
      pie: "Recreación didáctica: escuchar, colacionar lo requerido y cotejar antes de ejecutar.",
    },
    { kind: "titulo", text: "Parte A · El vuelo completo", sub: "AVIANCA 452 · El Dorado → Rionegro · Airbus A320" },
    {
      kind: "p",
      text: "READBACK REQUIRED dice si hay colación obligatoria (Sí), si no la hay (No) o si solo una parte lo es (Parcial). Las demás partes se acusan de forma clara (Doc 4444 4.5.7.5.1.1).",
    },
    hueco(
      "CM-63-02 · Diagrama · 16:9 · 1600×900",
      "Perfil del vuelo SKBO → SKRG con las veinte fases numeradas y la dependencia de cada una, para ubicar cada transmisión en el vuelo.",
    ),
    { kind: "sub", text: "En tierra, en El Dorado (1 a 8)" },
    ...FASES_TIERRA.flatMap(fase),
    { kind: "sub", text: "Salida y crucero (9 a 13)" },
    ...FASES_RUTA.flatMap(fase),
    { kind: "sub", text: "Llegada a Rionegro (14 a 20)" },
    ...FASES_LLEGADA.flatMap(fase),
    { kind: "titulo", text: "Parte B · Cuando vuelas a Estados Unidos: fraseología FAA", sub: "Los Ángeles (KLAX) y LaGuardia (KLGA)" },
    {
      kind: "p",
      text: "Escenario de práctica: AVIANCA 452 de Los Ángeles a Nueva York LaGuardia. La ruta no es de un vuelo real; frecuencias, pistas, SID y STAR sí son reales. Salen del Chart Supplement (ciclo del 3 SEP al 29 OCT 2026) y de las cartas del d-TPP, ciclo AIRAC **2609** (03 SEP a 01 OCT 2026). **Las cartas cambian cada 28 días**: antes de usar un designador, mira el ciclo vigente.",
    },
    {
      kind: "p",
      text: "Los nombres hablados de las dependencias (Los Angeles Clearance Delivery, Los Angeles Ground, Los Angeles Tower, SoCal Departure, New York Approach, LaGuardia Tower) son **deducidos** de la regla FAA de nombres de estación (7110.65BB 2-4-19; AIM 4-2-6): las cartas escriben «CLNC DEL», «GND CON», «SOCAL DEP CON». «LaGuardia Clearance Delivery» sí es un ejemplo textual de la FAA.",
    },
    hueco(
      "CM-63-03 · Comparativo · 16:9 · 1600×900",
      "Dos columnas, FAA y OACI, con la misma autorización de salida desde la 25R de LAX, marcando lo que cambia: pista primero, «climb via SID» sin nivel, «point» por «decimal».",
    ),
    { kind: "sub", text: "Salida de Los Ángeles (KLAX) con la ORCKA FIVE (ORCKA5.ORCKA)" },
    ...COMPARACIONES_KLAX,
    { kind: "sub", text: "Llegada y salida en LaGuardia (KLGA)" },
    ...COMPARACIONES_KLGA,
    { kind: "sub", text: "FAA y OACI en una tabla" },
    TABLA_FAA_OACI,
    {
      kind: "summary",
      title: "En pocas palabras",
      items: [
        "En todo el vuelo se colacionan pista, nivel, rumbo, velocidad, QNH, código, ruta y frecuencia; lo demás se acusa.",
        "EXPECT y CONTINUE APPROACH anuncian; no autorizan.",
        "En EE. UU.: pista primero, «climb via SID» sin nivel, «climb and maintain», FL180 y pulgadas.",
        "La FAA no da autorizaciones condicionales y pide colacionar todo hold short.",
        "Las cartas cambian cada 28 días: nunca uses un designador sin mirar el ciclo vigente.",
      ],
    },
    {
      kind: "detalleTecnico",
      etiqueta: "Fuentes",
      cita: "Doc 4444 · Doc 9432 · FAA 7110.65BB · AIM",
      bloques: [
        { kind: "p", text: "**OACI Doc 4444, PANS-ATM:** 15.ª ed. (2007) en español, 4.5.7.5; 16.ª ed. (2016) con enmiendas 1 a 7-A, copia no oficial, 6.3.2.4, 12.2.7, 12.3.1.2 (h, ff), 12.3.2.2, 12.3.3.2 (f, y, z), 12.3.4.4 a 12.3.4.20, 12.4.1.1, 12.4.1.3, 12.4.1.6. Es la edición que cita la FAA en su GEN 1.7; cotejar con la vigente." },
        { kind: "p", text: "**OACI Doc 9432, 4.ª ed. (2007):** 2.6, 2.7.1.1, 2.8.2.1, 2.8.3.3, 2.8.3.6, 3.1.4, 4.9 (salida de pista y rodaje al puesto). **OACI Doc 9870, App. A:** 4.7 y 4.8. **CAP 413, Ed. 24:** 3.25 a 3.27." },
        { kind: "p", text: "**FAA JO 7110.65BB**, Change 3, vigente desde el 7/9/2026: 2-1-17, 2-4-19, 2-7-2, 3-7-2, 3-9-3, 3-9-4, 3-9-10, 3-10-5, 4-3-2, 4-5-7, 4-8-1, 5-3-7. **AIM**, Change 3: 4-2-3, 4-2-6, 4-2-9, 4-3-18, 4-4-7, 5-2-1, 5-2-2, 5-2-5, 5-2-8, 7-2. **AIP de EE. UU., GEN 1.7**, Amendment 1 (07/09/2026): diferencias con el Doc 4444 16.ª ed. en 4.5.7.3, 4.6, 6.3.2.4, 6.5.2.4, 7.10.3.1, 12.2.7, 12.3.1.8 y 12.4.1.1." },
        { kind: "p", text: "**KLAX:** Chart Supplement SW, p. 199-200, 3 SEP a 29 OCT 2026 (pistas, frecuencias: CLNC DEL 120.35, GND CON 121.75 sur, TOWER 120.95 sur, SOCAL DEP CON 124.3, PDC, CPDLC); Hot Spots SW-3 (HS 1 y HS 2); diagrama 00237AD; SID ORCKA FIVE (RNAV), 00237ORCKA, Top Altitude FL230, primer punto DOCKR desde la 25R; STAR HLYWD ONE y ANJLL FOUR («Expect local area altimeter reaching FL230»). d-TPP ciclo 2609 (03 SEP a 01 OCT 2026)." },
        { kind: "p", text: "**KLGA:** Chart Supplement NE, p. 227 (APP CON 120.8 y 120.05, TOWER 118.7, CLNC DEL y PRE TAXI CLNC 135.2, DEP CON 120.4, PDC, CPDLC); SID LAGUARDIA SEVEN (LGA7.LGA, «maintain 5000»); STAR MILTON FOUR (MIP.MIP4); diagrama 00289AD." },
        { kind: "p", text: "**No verificado:** qué SID o STAR usa un vuelo real entre LAX y LGA (la ORCKA FIVE con transición Las Vegas se usa porque ilustra el «climb via»); la ruta de rodaje en LAX; los nombres hablados de las dependencias, deducidos de 2-4-19. En Colombia: frecuencias, calles, SID, STAR, la pista 01/19 de Rionegro, «El Dorado Delivery», «Rionegro Tower» y «Rionegro Ground» (deducidos), altitudes y QNH (AIP AD 2 SKBO y SKRG no disponibles)." },
        { kind: "p", text: "**PLAIN LANGUAGE:** la fase 20 («holding at entrance stand, no marshaller»)." },
        { kind: "p", text: "**Distintivos:** FAA JO 7340.2P Change 3 (AVIANCA, COPA). Los diálogos son ejemplos educativos, no transcripciones de vuelos reales." },
      ],
    },
  ],
}
