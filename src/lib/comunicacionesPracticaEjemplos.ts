/**
 * Ítems de EJEMPLO de la práctica con audio de Comunicaciones: dos o tres por
 * tipo, para probar el motor. El guion completo lo escribe otro después.
 *
 * Toda la fraseología sale del Doc 9432 (Manual de radiotelefonía, 4.ª ed.
 * 2007), tomada del inglés que el manual da entre paréntesis, con dos cambios:
 *
 *   - el distintivo FASTAIR 345 / G-CD / G-AB pasa a AVIATORY 452 (y los
 *     parecidos AVIATORY 425 y 542 en «¿es para mí?»);
 *   - los números van en palabras, como se transmiten (Doc 9432 2.4). Se
 *     escribe «niner» (NAI-na) y el resto con la grafía inglesa normal; el
 *     acento OACI (TRI, FA-IF, FO-ar) lo pone la voz.
 *
 * Los lugares son los ficticios del propio manual (Kennington, Wicken,
 * Georgetown, Alexander, Stephenville, North Cross). En el vuelo completo
 * algunos valores (pista, rumbo inicial) se adaptan para que el vuelo sea
 * coherente; la frase sigue siendo la del párrafo citado.
 *
 * Lo que no es fraseología OACI va rotulado PLAIN LANGUAGE.
 *
 * Cada transmisión tiene su entrada en contenido/audio/comunicaciones.json;
 * scripts/audio/comunicaciones.test.ts falla si no coinciden.
 */

import type {
  EjCopia,
  EjDesarmala,
  EjEsParaMi,
  EjEstandarOPlain,
  EjHearback,
  EjPanel,
  EjQueRespondes,
  EjRafaga,
  EjReadback,
  EjVueloCompleto,
  PerfilRadio,
  Transmision,
  VozRadio,
} from "@/lib/comunicacionesPractica"

function tx(id: string, voz: VozRadio, perfil: PerfilRadio, texto: string): Transmision {
  return { id, voz, perfil, texto }
}

// ─── Transmisiones ───────────────────────────────────────────────────────────

const T = {
  autRuta: tx(
    "cm-ej-aut-ruta-kennington",
    "atc_latam",
    "normal",
    "Aviatory four five two, cleared to Kennington via Alfa one, flight level two eight zero, Wicken three Delta departure, squawk five five zero one.",
  ),
  salidaRumbo: tx(
    "cm-ej-salida-rumbo-040",
    "atc_uk",
    "normal",
    "Aviatory four five two, turn right heading zero four zero until passing flight level seven zero, then direct Wicken VOR.",
  ),
  llegadaDescenso: tx(
    "cm-ej-llegada-descenso-4000",
    "atc_us",
    "normal",
    "Aviatory four five two, descend to four thousand feet, QNH one zero zero five, transition level five zero, expect ILS approach runway two four.",
  ),
  squawk6402: tx("cm-ej-squawk-6402", "atc_latam", "limpia", "Aviatory four five two, squawk six four zero two."),
  rodaje27: tx(
    "cm-ej-rodaje-27",
    "atc_uk",
    "normal",
    "Aviatory four five two, taxi to holding point runway two seven, give way to B seven four seven passing left to right, QNH one zero one niner.",
  ),
  // ¿Es para mí? (1)
  e1a: tx("cm-ej-epm-425-contacto", "atc_us", "normal", "Aviatory four two five, contact Alexander Control one two niner decimal one."),
  e1b: tx("cm-ej-epm-452-squawk", "atc_us", "normal", "Aviatory four five two, squawk six four one one."),
  e1c: tx("cm-ej-epm-542-rumbo", "atc_us", "normal", "Aviatory five four two, turn left heading zero five zero for separation."),
  e1d: tx("cm-ej-epm-452-rumbo", "atc_us", "normal", "Aviatory four five two, fly heading zero five zero."),
  e1e: tx("cm-ej-epm-425-detenga", "atc_us", "normal", "Aviatory four two five, stop descent at flight level one five zero."),
  e1f: tx("cm-ej-epm-452-ascenso", "atc_us", "normal", "Aviatory four five two, continue climb to flight level three three zero."),
  // ¿Es para mí? (2)
  e2a: tx("cm-ej-epm-542-apresure", "atc_latam", "sucia", "Aviatory five four two, expedite descent to flight level eight zero."),
  e2b: tx("cm-ej-epm-452-notifique-rumbo", "atc_latam", "sucia", "Aviatory four five two, report heading."),
  e2c: tx("cm-ej-epm-425-reactive", "atc_latam", "sucia", "Aviatory four two five, reset squawk six four one one."),
  e2d: tx("cm-ej-epm-452-nueva-aut", "atc_latam", "sucia", "Aviatory four five two, recleared flight level three three zero."),
  // Hearback
  h1Atc: tx(
    "cm-ej-hb-ascenso-240",
    "atc_uk",
    "normal",
    "Aviatory four five two, climb to flight level two four zero, expedite until passing flight level one eight zero.",
  ),
  h1Pm: tx(
    "cm-ej-hb-ascenso-240-pm",
    "piloto_pm",
    "normal",
    "Climbing to flight level two four zero, expediting until passing flight level one eight zero, Aviatory four five two.",
  ),
  h2Atc: tx("cm-ej-hb-qnh-1003", "atc_latam", "normal", "Aviatory four five two, QNH one zero zero three."),
  h2Pm: tx("cm-ej-hb-qnh-1003-pm", "piloto_pm", "normal", "QNH one zero one three, Aviatory four five two."),
  h3Atc: tx("cm-ej-hb-rumbo-050", "atc_us", "normal", "Aviatory four five two, turn left heading zero five zero for separation."),
  h3Pm: tx("cm-ej-hb-rumbo-050-pm", "piloto_pm", "normal", "Heading left one five zero, Aviatory four five two."),
  // ¿Qué respondes?
  inmediata: tx("cm-ej-qr-salida-inmediata", "atc_uk", "limpia", "Aviatory four five two, are you ready for immediate departure?"),
  // Desármala
  cruzDelNorte: tx(
    "cm-ej-des-north-cross",
    "atc_latam",
    "normal",
    "Aviatory four five two, after passing North Cross NDB descend to flight level eight zero.",
  ),
  despegue24: tx(
    "cm-ej-des-despegue-24",
    "atc_uk",
    "normal",
    "Aviatory four five two, runway two four, cleared for take-off, report airborne.",
  ),
  // Ráfagas
  salida121: tx("cm-ej-raf-salida-121750", "atc_us", "normal", "Aviatory four five two, contact Departure one two one decimal seven five zero."),
  qnh1009: tx("cm-ej-raf-puesta-marcha-1009", "atc_latam", "normal", "Aviatory four five two, start up approved, QNH one zero zero niner."),
  radioCheck: tx(
    "cm-ej-raf-matricula-gabcd",
    "piloto",
    "normal",
    "Stephenville Tower, Golf Alfa Bravo Charlie Delta, radio check one one eight decimal seven.",
  ),
  torre118: tx("cm-ej-raf-torre-1187", "atc_us", "sucia", "Aviatory four five two, contact Tower one one eight decimal seven."),
  reset6411: tx("cm-ej-raf-reset-6411", "atc_uk", "sucia", "Aviatory four five two, reset squawk six four one one."),
  aterrizaje24: tx(
    "cm-ej-raf-aterrizaje-24",
    "atc_uk",
    "sucia",
    "Aviatory four five two, runway two four, cleared to land, wind two seven zero degrees two zero knots.",
  ),
  // ¿Estándar o plain?
  imposible: tx(
    "cm-ej-eop-cruce-wicken",
    "atc_latam",
    "normal",
    "Aviatory four five two, Georgetown Departure, cleared to Colinton flight level two niner zero, cross Wicken flight level one five zero or above, if unable, maintain flight level one three zero.",
  ),
  // Vuelo completo
  despegue27: tx(
    "cm-ej-vc-despegue-27",
    "atc_uk",
    "normal",
    "Aviatory four five two, runway two seven, cleared for take-off, report airborne.",
  ),
  ilsDirecta: tx(
    "cm-ej-vc-ils-directa-24",
    "atc_us",
    "sucia",
    "Aviatory four five two, cleared straight-in ILS approach runway two four, report established.",
  ),
  primeraDerecha: tx(
    "cm-ej-vc-primera-derecha",
    "atc_latam",
    "sucia",
    "Aviatory four five two, take first right, when vacated contact Ground one one eight decimal three five zero.",
  ),
} satisfies Record<string, Transmision>

/** Todas las transmisiones de ejemplo. Deben estar en el manifiesto. */
export const CM_TRANSMISIONES_EJEMPLO: Transmision[] = Object.values(T)

const DISTINTIVO = { id: "distintivo", etiqueta: "Distintivo", tipo: "distintivo" as const, valor: "Aviatory 452" }

// ─── 1. Copia ────────────────────────────────────────────────────────────────

export const CM_COPIA: EjCopia[] = [
  {
    tipo: "copia",
    id: "c01",
    fuente: "Doc 9432 2.8.3.6",
    transmision: T.autRuta,
    campos: [
      { id: "limite", etiqueta: "Límite", tipo: "limite", esperado: "KENNINGTON" },
      { id: "ruta", etiqueta: "Ruta", tipo: "ruta", esperado: "A1", ayuda: "A1" },
      { id: "nivel", etiqueta: "Nivel", tipo: "nivel", esperado: "FL280", ayuda: "FL280" },
      { id: "salida", etiqueta: "Salida", tipo: "salida", esperado: "WICKEN 3 DELTA", alternativas: ["WICKEN 3D"] },
      { id: "squawk", etiqueta: "Squawk", tipo: "squawk", esperado: "5501", ayuda: "0000" },
    ],
    explicacion:
      "Es una autorización de ruta: se colaciona entera y se termina con el distintivo (Doc 9432 2.8.3.5 a y 2.8.3.7). Se copia en el orden en que llega: límite, ruta, nivel, salida y código SSR.",
  },
  {
    tipo: "copia",
    id: "c02",
    fuente: "Doc 9432 7.1.2",
    transmision: T.salidaRumbo,
    campos: [
      { id: "rumbo", etiqueta: "Rumbo", tipo: "rumbo", esperado: "040", ayuda: "000" },
      { id: "hasta", etiqueta: "Hasta pasar", tipo: "nivel", esperado: "FL70", ayuda: "FL70" },
      { id: "despues", etiqueta: "Después", tipo: "limite", esperado: "WICKEN", alternativas: ["WICKEN VOR"] },
    ],
    explicacion:
      "Una instrucción de salida con condición: el rumbo vale hasta pasar FL70 y luego va directo al VOR. El rumbo se colaciona siempre (Doc 9432 2.8.3.5 c).",
  },
  {
    tipo: "copia",
    id: "c03",
    fuente: "Doc 9432 7.3.1",
    transmision: T.llegadaDescenso,
    campos: [
      { id: "altitud", etiqueta: "Altitud", tipo: "altitud", esperado: "4000", ayuda: "pies" },
      { id: "qnh", etiqueta: "QNH", tipo: "qnh", esperado: "1005" },
      { id: "transicion", etiqueta: "Nivel de transición", tipo: "nivel", esperado: "FL50", ayuda: "FL50" },
      { id: "pista", etiqueta: "Pista", tipo: "pista", esperado: "24" },
    ],
    explicacion:
      "Al contacto inicial, aproximación da el tipo de aproximación previsto. Altitud, QNH, nivel de transición y pista se colacionan (Doc 9432 2.8.3.5 c).",
  },
]

// ─── 2. Readback con la voz ──────────────────────────────────────────────────

export const CM_READBACK: EjReadback[] = [
  {
    tipo: "readback",
    id: "r01",
    fuente: "Doc 9432 2.8.3.7",
    transmision: T.squawk6402,
    elementos: [{ id: "squawk", etiqueta: "Squawk", tipo: "squawk", valor: "6402" }, DISTINTIVO],
    modelo: "Six four zero two, Aviatory four five two.",
    explicacion: "El código SSR se colaciona siempre, y la colación termina con tu distintivo (Doc 9432 2.8.3.5 c y 2.8.3.7).",
  },
  {
    tipo: "readback",
    id: "r02",
    fuente: "Doc 9432 7.3.1",
    transmision: T.llegadaDescenso,
    elementos: [
      { id: "altitud", etiqueta: "Altitud", tipo: "altitud", valor: "4000" },
      { id: "qnh", etiqueta: "QNH", tipo: "qnh", valor: "1005" },
      { id: "transicion", etiqueta: "Nivel de transición", tipo: "texto", valor: "transition level 50" },
      { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "24" },
      DISTINTIVO,
    ],
    modelo:
      "Descending to four thousand feet, QNH one zero zero five, transition level five zero, expecting ILS approach runway two four, Aviatory four five two.",
    explicacion:
      "Instrucción de nivel, reglaje de altímetro, nivel de transición y pista en uso: los cuatro están en la lista de lo que siempre se colaciona (Doc 9432 2.8.3.5 c).",
  },
  {
    tipo: "readback",
    id: "r03",
    fuente: "Doc 9432 4.4.3",
    transmision: T.rodaje27,
    elementos: [
      { id: "punto", etiqueta: "Límite de rodaje", tipo: "texto", valor: "holding point" },
      { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "27" },
      { id: "qnh", etiqueta: "QNH", tipo: "qnh", valor: "1019" },
      DISTINTIVO,
    ],
    modelo: "Holding point runway two seven, QNH one zero one niner, giving way to B seven four seven, Aviatory four five two.",
    explicacion:
      "Toda instrucción de rodaje trae un límite (Doc 9432 4.4.1). Pista y QNH se colacionan; el ceda el paso se confirma para que el controlador sepa que viste el tráfico.",
  },
]

// ─── 3. ¿Es para mí? ─────────────────────────────────────────────────────────

export const CM_ES_PARA_MI: EjEsParaMi[] = [
  {
    tipo: "esParaMi",
    id: "e01",
    fuente: "Doc 9432 2.8.2.1, 3.3.3.2, 6.3.1 y 6.5.2",
    repeticiones: 0,
    distintivo: "AVIATORY 452",
    transmisiones: [
      { transmision: T.e1a, paraMi: false },
      { transmision: T.e1b, paraMi: true },
      { transmision: T.e1c, paraMi: false },
      { transmision: T.e1d, paraMi: true },
      { transmision: T.e1e, paraMi: false },
      { transmision: T.e1f, paraMi: true },
    ],
    explicacion:
      "Con distintivos parecidos el ATC puede ordenar cambiar temporalmente el tipo de distintivo (Doc 9432 2.7.2.3). Mientras tanto, escucha el distintivo completo antes de la instrucción: 452, no 425 ni 542.",
  },
  {
    tipo: "esParaMi",
    id: "e02",
    fuente: "Doc 9432 3.3.3.2, 3.3.3.3, 6.3.2 y 6.5.2",
    repeticiones: 0,
    distintivo: "AVIATORY 452",
    transmisiones: [
      { transmision: T.e2a, paraMi: false },
      { transmision: T.e2b, paraMi: true },
      { transmision: T.e2c, paraMi: false },
      { transmision: T.e2d, paraMi: true },
    ],
    explicacion:
      "Con la radio sucia el distintivo es lo primero que se pierde. Si dudas de que era para ti, no ejecutes: pregunta (Doc 9432 2.8.1.4).",
  },
]

// ─── 4. Hearback ─────────────────────────────────────────────────────────────

export const CM_HEARBACK: EjHearback[] = [
  {
    tipo: "hearback",
    id: "h01",
    fuente: "Doc 9432 3.3.3.3",
    instruccion: T.h1Atc,
    colacion: T.h1Pm,
    elementos: [
      { id: "nivel", etiqueta: "Nivel autorizado" },
      { id: "condicion", etiqueta: "Hasta pasar" },
      { id: "distintivo", etiqueta: "Distintivo" },
    ],
    error: null,
    explicacion: "La colación trae el nivel, la condición y el distintivo tal como los dio el controlador.",
  },
  {
    tipo: "hearback",
    id: "h02",
    fuente: "Doc 9432 2.8.3.9",
    instruccion: T.h2Atc,
    colacion: T.h2Pm,
    elementos: [
      { id: "qnh", etiqueta: "QNH" },
      { id: "distintivo", etiqueta: "Distintivo" },
    ],
    error: "qnh",
    explicacion:
      "El ATC dio 1003 y el compañero colacionó 1013. Es el ejemplo del propio manual: el controlador respondería «negative, I say again, QNH 1003». Como PM, lo cazas tú antes.",
  },
  {
    tipo: "hearback",
    id: "h03",
    fuente: "Doc 9432 6.3.1 (colación modelo; el error es de práctica)",
    instruccion: T.h3Atc,
    colacion: T.h3Pm,
    elementos: [
      { id: "direccion", etiqueta: "Dirección del viraje" },
      { id: "rumbo", etiqueta: "Rumbo" },
      { id: "distintivo", etiqueta: "Distintivo" },
    ],
    error: "rumbo",
    explicacion: "El ATC dio rumbo 050 y el compañero colacionó 150. Un dígito cambia el viraje en cien grados.",
  },
]

// ─── 5. ¿Qué respondes? ──────────────────────────────────────────────────────

export const CM_QUE_RESPONDES: EjQueRespondes[] = [
  {
    tipo: "queRespondes",
    id: "q01",
    fuente: "Doc 9432 3.3.3.3 y 2.8.3.10",
    situacion: "Vas pesado y no puedes apresurar el ascenso.",
    transmision: T.h1Atc,
    opciones: [
      "Unable to expedite, Aviatory four five two.",
      "Roger, Aviatory four five two.",
      "Wilco, Aviatory four five two.",
      "Negative, Aviatory four five two.",
    ],
    correcta: 0,
    explicacion:
      "Si no puedes cumplir, se dice «unable» (Doc 9432 2.8.3.10). «Wilco» sería prometer lo que no vas a hacer, y «roger» solo dice que recibiste.",
  },
  {
    tipo: "queRespondes",
    id: "q02",
    fuente: "Doc 9432 4.5.5 y 2.6",
    situacion: "Estás en el punto de espera con la lista de antes del despegue terminada.",
    transmision: T.inmediata,
    opciones: [
      "Roger, Aviatory four five two.",
      "Aviatory four five two, affirm.",
      "Wilco, Aviatory four five two.",
      "Correct, Aviatory four five two.",
    ],
    correcta: 1,
    explicacion:
      "Es una pregunta: se contesta «affirm» o «negative». «Roger» nunca responde una pregunta que pide sí o no (Doc 9432 2.6, nota a RECIBIDO).",
  },
  {
    tipo: "queRespondes",
    id: "q03",
    fuente: "Doc 9432 6.3.2",
    situacion: "Vuelas con rumbo 050.",
    transmision: T.e2b,
    opciones: [
      "Aviatory four five two, heading zero five zero.",
      "Wilco, Aviatory four five two.",
      "Roger, Aviatory four five two.",
      "Affirm, Aviatory four five two.",
    ],
    correcta: 0,
    explicacion: "«Report heading» pide un dato, no un acuse: se contesta con el rumbo (Doc 9432 6.3.2).",
  },
]

// ─── 6. Desármala ────────────────────────────────────────────────────────────

export const CM_DESARMALA: EjDesarmala[] = [
  {
    tipo: "desarmala",
    id: "d01",
    fuente: "Doc 9432 3.3.3.1",
    transmision: T.cruzDelNorte,
    fichas: [
      { id: "cs", texto: "AVIATORY 452", categoria: "distintivo" },
      { id: "cond", texto: "AFTER PASSING NORTH CROSS NDB", categoria: "condicion" },
      { id: "acc", texto: "DESCEND", categoria: "accion" },
      { id: "val", texto: "FL 80", categoria: "valor" },
    ],
    explicacion: "La condición va antes de la acción: no se desciende hasta pasar el NDB. Es lo primero que se pierde si solo se escucha el número.",
  },
  {
    tipo: "desarmala",
    id: "d02",
    fuente: "Doc 9432 7.1.2",
    transmision: T.salidaRumbo,
    fichas: [
      { id: "cs", texto: "AVIATORY 452", categoria: "distintivo" },
      { id: "acc", texto: "TURN RIGHT", categoria: "accion" },
      { id: "val", texto: "HEADING 040", categoria: "valor" },
      { id: "cond", texto: "UNTIL PASSING FL 70", categoria: "condicion" },
      { id: "sig", texto: "THEN DIRECT WICKEN VOR", categoria: "siguiente" },
    ],
    explicacion: "Cinco piezas: quién, qué, cuánto, hasta cuándo y qué sigue. La siguiente acción ya viene autorizada: no hay que esperar otra llamada.",
  },
  {
    tipo: "desarmala",
    id: "d03",
    fuente: "Doc 9432 4.5.6",
    transmision: T.despegue24,
    fichas: [
      { id: "cs", texto: "AVIATORY 452", categoria: "distintivo" },
      { id: "val", texto: "RUNWAY 24", categoria: "valor" },
      { id: "acc", texto: "CLEARED FOR TAKE-OFF", categoria: "accion" },
      { id: "sig", texto: "REPORT AIRBORNE", categoria: "siguiente" },
    ],
    explicacion:
      "La palabra «take-off» solo se usa para autorizar o cancelar el despegue (Doc 9432 2.8.3.3). La pista va con la autorización y se colaciona.",
  },
]

// ─── 7. Panel de cabina ──────────────────────────────────────────────────────

export const CM_PANEL: EjPanel[] = [
  {
    tipo: "panel",
    id: "p01",
    fuente: "Doc 9432 6.2.1 y 6.3.1",
    transmision: T.h3Atc,
    inicial: { hdg: 110, alt: 2500, spd: 180, vs: 0 },
    objetivo: { hdg: 50 },
    explicacion: "Rumbo 050 por la izquierda. El panel no sabe por qué lado girar: el lado lo das tú al piloto automático o al avión.",
  },
  {
    tipo: "panel",
    id: "p02",
    fuente: "Doc 9432 3.3.3.3",
    transmision: T.h1Atc,
    inicial: { hdg: 90, alt: 10000, spd: 250, vs: 0 },
    objetivo: { alt: 24000 },
    altEnNivel: true,
    explicacion: "Lo que se selecciona es el nivel autorizado, FL240. El FL180 es solo hasta dónde apresurar.",
  },
  {
    tipo: "panel",
    id: "p03",
    fuente: "Doc 9432 7.3.1",
    transmision: T.llegadaDescenso,
    inicial: { hdg: 240, alt: 8000, spd: 250, vs: 0 },
    objetivo: { alt: 4000 },
    explicacion: "4000 pies con QNH 1005. La altitud va en pies: por debajo del nivel de transición ya no es un nivel de vuelo.",
  },
]

// ─── 8. Ráfaga de números ────────────────────────────────────────────────────

export const CM_RAFAGA: EjRafaga[] = [
  {
    tipo: "rafaga",
    id: "n01",
    fuente: "Doc 9432 2.8.3.7, 4.2.2, 4.5.6 y 6.3.1",
    segundos: 8,
    dictados: [
      { id: "sq", tipo: "squawk", transmision: T.squawk6402, esperado: "6402" },
      { id: "frec", tipo: "frecuencia", transmision: T.salida121, esperado: "121.750" },
      { id: "qnh", tipo: "qnh", transmision: T.qnh1009, esperado: "1009" },
      { id: "hdg", tipo: "rumbo", transmision: T.e1d, esperado: "050" },
    ],
    explicacion: "Los números se transmiten dígito a dígito (Doc 9432 2.4.2), y las frecuencias con «decimal» (2.4.4).",
  },
  {
    tipo: "rafaga",
    id: "n02",
    fuente: "Doc 9432 2.8.4.3, 4.7.1, 6.5.2 y 7.3.1",
    segundos: 8,
    dictados: [
      { id: "mat", tipo: "matricula", transmision: T.radioCheck, esperado: "GABCD" },
      { id: "frec", tipo: "frecuencia", transmision: T.torre118, esperado: "118.7" },
      { id: "sq", tipo: "squawk", transmision: T.reset6411, esperado: "6411" },
      { id: "rwy", tipo: "pista", transmision: T.aterrizaje24, esperado: "24" },
    ],
    explicacion: "La matrícula se deletrea letra por letra con el alfabeto (Doc 9432 2.3.2). Con radio sucia, apunta mientras escuchas.",
  },
]

// ─── 9. ¿Estándar o plain? ───────────────────────────────────────────────────

export const CM_ESTANDAR_O_PLAIN: EjEstandarOPlain[] = [
  {
    tipo: "estandarOPlain",
    id: "s01",
    fuente: "Doc 9432 2.8.3.10",
    situacion: "Te piden cruzar WICKEN a FL150 o más alto. Con el peso de hoy no llegas; puedes mantener FL130.",
    transmision: T.imposible,
    clasificacion: "fraseologia",
    frase: "Georgetown Departure, unable to cross Wicken flight level one five zero due weight, maintaining flight level one three zero, Aviatory four five two.",
    explicacion:
      "Hay fraseología para esto: «unable» y el motivo (Doc 9432 2.8.3.10). El controlador ya te dio la alternativa, así que no hace falta lenguaje claro.",
  },
  {
    tipo: "estandarOPlain",
    id: "s02",
    fuente: "Doc 9432 3.2.3 y 3.2.4 (cuándo usar lenguaje claro). Frases PLAIN LANGUAGE de práctica",
    situacion:
      "Un pasajero se desmaya. La tripulación de cabina pide que haya asistencia médica al aterrizar. El avión está bien y sigues la aproximación.",
    clasificacion: "plain",
    bloques: {
      problema: { opciones: ["Passenger no good.", "We have a sick passenger on board.", "We have a technical problem."], correcta: 1 },
      capacidad: { opciones: ["The aircraft is fully serviceable.", "Maybe we can continue.", "We are unable to continue."], correcta: 0 },
      necesidad: { opciones: ["We want a doctor now please.", "Request vectors.", "Request medical assistance on arrival."], correcta: 2 },
      intencion: { opciones: ["We go around.", "We will continue the approach.", "We will hold."], correcta: 1 },
    },
    explicacion:
      "No hay una frase OACI que lo cubra: va en lenguaje claro, pero claro, breve y sin ambigüedad (Doc 9432 3.2.3 y 3.2.4). Si la situación pide declarar urgencia, esa fraseología está en el cap. 9 del Doc 9432, que no está cargado aquí: verificar.",
  },
]

// ─── 10. Vuelo completo ──────────────────────────────────────────────────────

export const CM_VUELO_COMPLETO: EjVueloCompleto[] = [
  {
    tipo: "vueloCompleto",
    id: "v01",
    titulo: "Georgetown a Kennington (escenario de práctica)",
    fuente: "Doc 9432 caps. 2, 3, 4, 6 y 7 (cada paso cita el suyo). Valores adaptados para que el vuelo sea coherente",
    explicacion: "Diecinueve transmisiones de la autorización a la plataforma, con la radio cada vez peor.",
    pasos: [
      { fase: "Autorización", perfil: "limpia", ejercicio: CM_COPIA[0] },
      { fase: "Rodaje", perfil: "limpia", ejercicio: CM_READBACK[2] },
      { fase: "Punto de espera", perfil: "limpia", ejercicio: CM_QUE_RESPONDES[1] },
      {
        fase: "Despegue",
        perfil: "limpia",
        ejercicio: {
          tipo: "readback",
          id: "vc-despegue",
          fuente: "Doc 9432 4.5.6",
          transmision: T.despegue27,
          elementos: [
            { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "27" },
            { id: "aut", etiqueta: "Autorización", tipo: "texto", valor: "cleared for take-off" },
            DISTINTIVO,
          ],
          modelo: "Runway two seven, cleared for take-off, wilco, Aviatory four five two.",
          explicacion: "La autorización de despegue se colaciona con la pista (Doc 9432 2.8.3.5 b).",
        },
      },
      {
        fase: "Salida",
        perfil: "normal",
        ejercicio: {
          tipo: "rafaga",
          id: "vc-salida",
          fuente: "Doc 9432 4.5.6",
          segundos: 8,
          dictados: [{ id: "frec", tipo: "frecuencia", transmision: T.salida121, esperado: "121.750" }],
          explicacion: "El cambio de frecuencia se colaciona con la frecuencia y el distintivo.",
        },
      },
      {
        fase: "Instrucción de salida",
        perfil: "normal",
        ejercicio: {
          tipo: "panel",
          id: "vc-rumbo",
          fuente: "Doc 9432 7.1.2",
          transmision: T.salidaRumbo,
          inicial: { hdg: 270, alt: 5000, spd: 220, vs: 0 },
          objetivo: { hdg: 40 },
          explicacion: "Rumbo 040 por la derecha hasta pasar FL70.",
        },
      },
      { fase: "Frecuencia congestionada", perfil: "normal", ejercicio: CM_ES_PARA_MI[1] },
      { fase: "Ascenso", perfil: "normal", ejercicio: CM_HEARBACK[0] },
      { fase: "Descenso", perfil: "sucia", ejercicio: CM_DESARMALA[0] },
      { fase: "Vigilancia", perfil: "sucia", ejercicio: CM_QUE_RESPONDES[2] },
      { fase: "Llegada", perfil: "sucia", ejercicio: CM_COPIA[2] },
      {
        fase: "Aproximación",
        perfil: "sucia",
        ejercicio: {
          tipo: "readback",
          id: "vc-ils",
          fuente: "Doc 9432 7.3.1",
          transmision: T.ilsDirecta,
          elementos: [
            { id: "aprox", etiqueta: "Aproximación", tipo: "texto", valor: "ILS" },
            { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "24" },
            DISTINTIVO,
          ],
          modelo: "Cleared straight-in ILS approach runway two four, wilco, Aviatory four five two.",
          explicacion: "La autorización de aproximación se colaciona con el tipo y la pista.",
        },
      },
      {
        fase: "Cambio a torre",
        perfil: "sucia",
        ejercicio: {
          tipo: "rafaga",
          id: "vc-torre",
          fuente: "Doc 9432 7.3.1",
          segundos: 8,
          dictados: [{ id: "frec", tipo: "frecuencia", transmision: T.torre118, esperado: "118.7" }],
          explicacion: "118.7: con 5.º y 6.º dígito en cero se dicen solo los cuatro primeros (Doc 9432 2.4.4).",
        },
      },
      {
        fase: "Aterrizaje",
        perfil: "sucia",
        ejercicio: {
          tipo: "readback",
          id: "vc-aterrizaje",
          fuente: "Doc 9432 4.7.1",
          transmision: T.aterrizaje24,
          elementos: [
            { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "24" },
            { id: "aut", etiqueta: "Autorización", tipo: "texto", valor: "cleared to land" },
            DISTINTIVO,
          ],
          modelo: "Runway two four, cleared to land, Aviatory four five two.",
          explicacion: "La autorización para aterrizar se colaciona con la pista (Doc 9432 2.8.3.5 b). El viento no.",
        },
      },
      {
        fase: "Después del aterrizaje",
        perfil: "sucia",
        ejercicio: {
          tipo: "queRespondes",
          id: "vc-primera-derecha",
          fuente: "Doc 9432 4.9",
          situacion: "Acabas de aterrizar y vas a tomar la primera salida a la derecha.",
          transmision: T.primeraDerecha,
          opciones: [
            "Roger, Aviatory four five two.",
            "First left, one one eight decimal three five, Aviatory four five two.",
            "First right, wilco, one one eight decimal three five zero, Aviatory four five two.",
            "Wilco, Aviatory four five two.",
          ],
          correcta: 2,
          explicacion: "Se confirma la salida y la frecuencia, como en el ejemplo del manual (Doc 9432 4.9).",
        },
      },
    ],
  },
]
