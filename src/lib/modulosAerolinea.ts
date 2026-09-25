/**
 * Los módulos de Ingreso a aerolínea, en una sola lista.
 *
 * Estaban enumerados dos veces —en la portada del hub y en el panel— y eso ya
 * se pudrió una vez: al entrar Aerodinámica, el panel siguió anunciando tres de
 * cuatro durante dos días. Un piloto que iba por el módulo nuevo no veía su
 * avance en su propia pantalla de inicio.
 *
 * Con la lista aquí, el panel pinta lo que haya en ella, y
 * `scripts/catalogo/catalogo.test.ts` falla si el catálogo tiene un módulo que
 * esta lista no: agregar uno sin ponerlo aquí rompe CI, que es lo único que
 * impide que vuelva a pasar.
 *
 * **Solo constantes livianas.** `metar.ts` pesa 22 KB porque lleva sus
 * ejercicios dentro, así que sus conteos vienen de `metarConteo.ts`. Si alguna
 * vez un módulo engorda igual, se le hace su archivo de conteo y no se importa
 * aquí: esta lista la carga el panel, que es la primera pantalla del piloto.
 *
 * Lo que NO va aquí: fotos, descripciones largas y minutos de lectura. Eso es
 * presentación de la portada, que ya los tiene y puede cargar lo que quiera.
 */

import { EXAM_PASS_SCORE as NOTAM_PASS_SCORE, NOTAM_PRACTICE_TOTAL, NOTAM_TOTALES } from "@/lib/notamComun"
import { METAR_CONTEO } from "@/lib/metarConteo"
import { MP_HUB, MP_LECTURA_TOTAL, MP_PASS_SCORE, MP_PRACTICA_TOTAL } from "@/lib/mercancias"
import { AERO_HUB, AERO_LECTURA_TOTAL, AERO_PASS_SCORE, AERO_PRACTICA_TOTAL } from "@/lib/aerodinamica"
import { AP_HUB, AP_LECTURA_TOTAL, AP_PASS_SCORE } from "@/lib/aeropuertos"
import { AP_PRACTICA_CONTEO } from "@/lib/aeropuertosConteo"
import { PERF_HUB, PERF_LECTURA_TOTAL, PERF_PASS_SCORE, PERF_PRACTICA_TOTAL } from "@/lib/performance"

import { CM_HUB, CM_LECTURA_TOTAL, CM_PASS_SCORE } from "@/lib/comunicaciones"
import { CM_PRACTICA_CONTEO } from "@/lib/comunicacionesConteo"
import { RAC_HUB, RAC_LECTURA_TOTAL, RAC_PASS_SCORE, RAC_PRACTICA_TOTAL } from "@/lib/rac"
import { CB_HUB, CB_LECTURA_TOTAL, CB_PASS_SCORE, CB_PRACTICA_TOTAL } from "@/lib/combustible"
import {
  RVSM_HUB,
  RVSM_LECTURA_TOTAL,
  RVSM_PASS_SCORE,
  RVSM_PRACTICA_TOTAL,
  RVSM_TITULO,
} from "@/lib/rvsm"
import { PBN_HUB, PBN_LECTURA_TOTAL, PBN_PASS_SCORE, PBN_PRACTICA_TOTAL, PBN_TITULO } from "@/lib/pbn"
import { MEL_HUB, MEL_LECTURA_TOTAL, MEL_PASS_SCORE } from "@/lib/mel"
import { MEL_PRACTICA_CONTEO } from "@/lib/melConteo"

/** Las claves son las de `contenido/catalogo/modulos.json`, y la prueba lo exige. */
export type ClaveModulo =
  | "notam"
  | "metar"
  | "mercancias"
  | "aerodinamica"
  | "aeropuertos"
  | "performance"
  | "comunicaciones"
  | "rac"
  | "combustible"
  | "rvsm"
  | "pbn"
  | "mel"

export interface ModuloAerolinea {
  clave: ClaveModulo
  titulo: string
  hub: string
  /** El acento con el que abre su módulo, para que la tarjeta no prometa otro. */
  acento: string
  totales: { secciones: number; practicas: number; aprobacion: number }
  /** Una línea, para la tarjeta del panel. La portada tiene la suya, más larga. */
  promesa: string
}

export const MODULOS_AEROLINEA: ModuloAerolinea[] = [
  {
    clave: "notam",
    titulo: "NOTAM",
    hub: "/app/aerolinea/notam",
    acento: "var(--av-blue-500)",
    totales: {
      secciones: NOTAM_TOTALES.lessonScreens,
      practicas: NOTAM_PRACTICE_TOTAL,
      aprobacion: NOTAM_PASS_SCORE,
    },
    promesa: "Lección y práctica con NOTAM reales de la Aerocivil.",
  },
  {
    clave: "metar",
    titulo: "Meteorología",
    hub: "/app/aerolinea/meteorologia",
    acento: "var(--av-mt-500)",
    totales: {
      secciones: METAR_CONTEO.secciones,
      practicas: METAR_CONTEO.practicas,
      aprobacion: METAR_CONTEO.aprobacion,
    },
    promesa: "METAR y TAF reales, decodificados campo por campo.",
  },
  {
    clave: "mercancias",
    titulo: "Mercancías peligrosas",
    hub: MP_HUB,
    acento: "var(--av-dg-500)",
    totales: {
      secciones: MP_LECTURA_TOTAL,
      practicas: MP_PRACTICA_TOTAL,
      aprobacion: MP_PASS_SCORE,
    },
    promesa: "Las nueve clases, el etiquetado y qué hacer a bordo.",
  },
  {
    clave: "aerodinamica",
    titulo: "Aerodinámica",
    hub: AERO_HUB,
    acento: "var(--av-ae-500)",
    totales: {
      secciones: AERO_LECTURA_TOTAL,
      practicas: AERO_PRACTICA_TOTAL,
      aprobacion: AERO_PASS_SCORE,
    },
    promesa: "Sustentación, pérdida, factor de carga, Mach y altitud de densidad.",
  },
  {
    clave: "aeropuertos",
    titulo: "Aeropuertos",
    hub: AP_HUB,
    acento: "var(--av-ap-500)",
    totales: {
      secciones: AP_LECTURA_TOTAL,
      practicas: AP_PRACTICA_CONTEO,
      aprobacion: AP_PASS_SCORE,
    },
    promesa: "Señales, letreros, luces y balizas, y dónde para el avión.",
  },
  {
    clave: "performance",
    titulo: "Performance",
    hub: PERF_HUB,
    acento: "var(--av-pf-500)",
    totales: {
      secciones: PERF_LECTURA_TOTAL,
      practicas: PERF_PRACTICA_TOTAL,
      aprobacion: PERF_PASS_SCORE,
    },
    promesa: "V₁, campo equilibrado, segundo segmento, obstáculos y aterrizaje.",
  },
  {
    clave: "comunicaciones",
    titulo: "Comunicaciones ATC",
    hub: CM_HUB,
    acento: "var(--av-cm-500)",
    totales: {
      secciones: CM_LECTURA_TOTAL,
      practicas: CM_PRACTICA_CONTEO,
      aprobacion: CM_PASS_SCORE,
    },
    promesa: "Escuchar, interpretar, confirmar y responder al ATC.",
  },
  {
    clave: "rac",
    titulo: "RAC",
    hub: RAC_HUB,
    acento: "var(--av-rac-500)",
    totales: {
      secciones: RAC_LECTURA_TOTAL,
      practicas: RAC_PRACTICA_TOTAL,
      aprobacion: RAC_PASS_SCORE,
    },
    promesa: "Los reglamentos que te preguntan: licencia, médico, reglas de vuelo y aerolínea.",
  },
  {
    clave: "combustible",
    titulo: "Gestión del combustible",
    hub: CB_HUB,
    acento: "var(--av-cb-500)",
    totales: {
      secciones: CB_LECTURA_TOTAL,
      practicas: CB_PRACTICA_TOTAL,
      aprobacion: CB_PASS_SCORE,
    },
    promesa: "Planificar, vigilar y decidir antes de que el combustible sea la emergencia.",
  },
  {
    clave: "rvsm",
    titulo: RVSM_TITULO,
    hub: RVSM_HUB,
    acento: "var(--av-rv-500)",
    totales: {
      secciones: RVSM_LECTURA_TOTAL,
      practicas: RVSM_PRACTICA_TOTAL,
      aprobacion: RVSM_PASS_SCORE,
    },
    promesa: "Mil pies de separación: qué exige, qué verificas y qué dices si falla.",
  },
  {
    clave: "pbn",
    titulo: PBN_TITULO,
    hub: PBN_HUB,
    acento: "var(--av-pbn-500)",
    totales: {
      secciones: PBN_LECTURA_TOTAL,
      practicas: PBN_PRACTICA_TOTAL,
      aprobacion: PBN_PASS_SCORE,
    },
    promesa: "RNAV, RNP y el número: qué exige cada especificación y cómo se verifica.",
  },
  {
    clave: "mel",
    titulo: "MEL",
    hub: MEL_HUB,
    acento: "var(--av-mel-500)",
    totales: {
      secciones: MEL_LECTURA_TOTAL,
      practicas: MEL_PRACTICA_CONTEO,
      aprobacion: MEL_PASS_SCORE,
    },
    promesa: "Leer la entrada, cumplir lo que pide y decidir si el avión sale.",
  },
]

/** Avance de un módulo, tal como lo cuenta la base. `null` es «sin empezar». */
export interface AvanceModulo {
  lesson: number
  practice: number
  best: number | null
}

/**
 * El avance: el promedio de lección, práctica y evaluación.
 *
 * La evaluación cuenta 100 apenas se aprueba y no su puntaje: pasarla con 84 no
 * es tener «menos módulo hecho» que pasarla con 96.
 */
export function avanceDeModulo(a: AvanceModulo, m: ModuloAerolinea): number {
  const leccion = (Math.min(a.lesson, m.totales.secciones) / m.totales.secciones) * 100
  const practica = (Math.min(a.practice, m.totales.practicas) / m.totales.practicas) * 100
  const examen = a.best !== null && a.best >= m.totales.aprobacion ? 100 : (a.best ?? 0)
  return Math.round((leccion + practica + examen) / 3)
}
