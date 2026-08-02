/**
 * Las nueve clases de mercancías peligrosas.
 *
 * Contenido del material de Cami (guía práctica para pilotos), con las
 * etiquetas normalizadas de OACI.
 *
 * Sobre el color: sale del rombo oficial, no de una paleta inventada. Por eso
 * hay clases que lo comparten (la 3 y la 4 son rojas, la 5 y la 7 amarillas) y
 * clases cuyo rombo es blanco o blanco y negro (la 6, la 8 y la 9). Eso NO es
 * un descuido: rojo significa inflamable las dos veces, y el piloto tiene que
 * leer esa señal como la va a ver en una bodega.
 *
 * Como el color no distingue las nueve, quien distingue es el rombo: donde haya
 * que identificar una clase se pone su etiqueta real, nunca un cuadro de color
 * con un número. El color solo tiñe bordes y acentos.
 */

export interface Division {
  /** "1.1", "2.3"… Es también el nombre del archivo del rombo. */
  id: string
  /** Qué es esa división, en una línea. */
  txt: string
}

export interface ClaseMP {
  /** "1" a "9". */
  n: string
  /** Nombre corto, para chips y tablas. */
  corto: string
  /** Nombre completo de la clase. */
  nombre: string
  /** Color del rombo oficial. Tiñe bordes y acentos, no identifica por sí solo. */
  color: string
  /** El riesgo principal, que es lo que define la clase. */
  riesgo: string
  ejemplos: string[]
  divisiones: Division[]
  /**
   * Rombos que le corresponden, por id de archivo en
   * public/infografias/mercancias/clase-<id>.webp. Cuando la clase no tiene
   * división propia es uno solo y su id es el número de la clase.
   */
  rombos: string[]
  /** Si a la clase le aplica grupo de embalaje. */
  ge: boolean
  /** Lo que hay que llevarse de esa clase, si hay algo que subrayar. */
  nota?: string
}

export const CLASES: ClaseMP[] = [
  {
    n: "1",
    corto: "Explosivos",
    nombre: "Explosivos",
    color: "#E87722",
    riesgo: "Reacción química que explota o proyecta fragmentos.",
    // Estos cuatro ejemplos y el texto de la 1.1 salen del diseño de Cami, que
    // el brief transcribe literal para esta clase. Las otras ocho vienen del
    // .docx y están pendientes de contrastar contra el diseño.
    ejemplos: ["Municiones", "Pirotecnia", "Detonadores", "Cordón detonante"],
    divisiones: [
      { id: "1.1", txt: "Peligro de explosión en masa" },
      { id: "1.2", txt: "Peligro de proyección, sin explosión en masa" },
      { id: "1.3", txt: "Peligro de incendio, con onda o proyección menor" },
      { id: "1.4", txt: "Peligro insignificante" },
      { id: "1.5", txt: "Muy insensible, con peligro de explosión en masa" },
      { id: "1.6", txt: "Extremadamente insensible, sin peligro de explosión en masa" },
    ],
    rombos: ["1-1", "1-4"],
    ge: false,
    nota: "Las divisiones van de mayor a menor riesgo de explosión en masa, de la 1.1 a la 1.6.",
  },
  {
    n: "2",
    corto: "Gases",
    nombre: "Gases",
    color: "#1E8A4C",
    riesgo: "Sustancias gaseosas a presión: inflamables, no inflamables o tóxicas.",
    ejemplos: ["Aerosoles", "Extintores", "Oxígeno", "Butano", "Gases tóxicos"],
    divisiones: [
      { id: "2.1", txt: "Gas inflamable" },
      { id: "2.2", txt: "Gas no inflamable y no tóxico" },
      { id: "2.3", txt: "Gas tóxico" },
    ],
    rombos: ["2-1", "2-2", "2-3"],
    ge: false,
    nota: "El rombo cambia de color con la división: rojo el inflamable, verde el no inflamable y blanco el tóxico.",
  },
  {
    n: "3",
    corto: "Líq. inflamables",
    nombre: "Líquidos inflamables",
    color: "#D0102E",
    riesgo: "Líquidos con punto de inflamación igual o menor a 60 °C.",
    ejemplos: ["Gasolina", "Pinturas", "Thinner", "Perfumes", "Algunos adhesivos"],
    divisiones: [],
    rombos: ["3"],
    ge: true,
  },
  {
    n: "4",
    corto: "Sól. inflamables",
    nombre: "Sólidos inflamables",
    color: "#D0102E",
    riesgo: "Sólidos que se inflaman con facilidad o reaccionan de forma peligrosa.",
    ejemplos: ["Fósforos", "Azufre", "Sodio metálico", "Carburo de calcio"],
    divisiones: [
      { id: "4.1", txt: "Sólido inflamable" },
      { id: "4.2", txt: "Riesgo de combustión espontánea" },
      { id: "4.3", txt: "Emite gas inflamable en contacto con el agua" },
    ],
    rombos: ["4-1", "4-2", "4-3"],
    ge: true,
    nota: "La 4.3 es la que cambia la respuesta: con esas no se echa agua, porque el agua es la que produce el gas.",
  },
  {
    n: "5",
    corto: "Oxidantes",
    nombre: "Oxidantes y peróxidos orgánicos",
    color: "#C08A00",
    riesgo: "Liberan oxígeno e intensifican un incendio; los peróxidos además son inestables.",
    ejemplos: ["Peróxido de hidrógeno", "Nitrato de amonio", "Kits de resina"],
    divisiones: [
      { id: "5.1", txt: "Comburentes (oxidantes)" },
      { id: "5.2", txt: "Peróxidos orgánicos" },
    ],
    rombos: ["5-1", "5-2"],
    ge: true,
    nota: "No arden solas, pero alimentan el fuego de al lado. Por eso no pueden ir junto a inflamables.",
  },
  {
    n: "6",
    corto: "Tóxicas",
    nombre: "Sustancias tóxicas e infecciosas",
    color: "#2C3440",
    riesgo:
      "Causan muerte o lesión al ingerirse, inhalarse o por contacto con la piel; o contienen patógenos.",
    ejemplos: ["Pesticidas", "Cianuros", "Muestras biológicas", "Material de diagnóstico"],
    divisiones: [
      { id: "6.1", txt: "Sustancias tóxicas" },
      { id: "6.2", txt: "Sustancias infecciosas" },
    ],
    rombos: ["6-1", "6-2"],
    ge: true,
  },
  {
    n: "7",
    corto: "Radiactivo",
    nombre: "Material radiactivo",
    color: "#C08A00",
    riesgo: "Emite radiación ionizante.",
    ejemplos: ["Isótopos médicos", "Equipos de medición nuclear"],
    divisiones: [],
    rombos: ["7"],
    ge: false,
    nota: "Se categoriza I-Blanca, II-Amarilla y III-Amarilla según el nivel de radiación, y lleva índice de transporte.",
  },
  {
    n: "8",
    corto: "Corrosivas",
    nombre: "Sustancias corrosivas",
    color: "#2C3440",
    riesgo: "Destruyen tejidos vivos o corroen metales.",
    ejemplos: ["Ácidos", "Baterías húmedas", "Mercurio", "Soda cáustica"],
    divisiones: [],
    rombos: ["8"],
    ge: true,
  },
  {
    n: "9",
    corto: "Varias",
    nombre: "Mercancías peligrosas varias",
    color: "#2C3440",
    riesgo: "Riesgos que no cubre ninguna de las otras clases.",
    ejemplos: [
      "Baterías de litio",
      "Hielo seco (UN 1845)",
      "Imanes",
      "Sustancias peligrosas para el ambiente",
    ],
    divisiones: [],
    rombos: ["9"],
    ge: true,
    nota: "Aquí caen las baterías de litio, que son el artículo más frecuente de la aviación de hoy. Es la respuesta que más se falla en entrevista.",
  },
]

/** Ruta del rombo oficial de una división o clase. */
export function rombo(id: string): string {
  return `/infografias/mercancias/clase-${id}.webp`
}

/** Cuántas etiquetas hay en total, contando divisiones. */
export const ROMBOS_TOTAL = CLASES.reduce((t, c) => t + c.rombos.length, 0)
