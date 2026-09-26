/**
 * Módulo RAC: los datos que comparten el hub, la lección, la práctica y la
 * evaluación final.
 *
 * Aquí solo vive lo que es dato: rutas, totales, umbrales y el resumen de
 * avance. El contenido está en racLeccion.ts y racPractica.ts, que genera
 * scripts/rac/convertir.mjs desde docs/contenido/rac.md, y el banco de la
 * evaluación vive en el servidor.
 *
 * Los totales van fijos y no importados, como en los demás módulos: la lección
 * pesa bastante y el hub, Ingreso a aerolínea y el panel solo necesitan los
 * números. leccionesConteo.test.ts los compara con el contenido.
 */

/** Nombre del módulo, tal como aparece en el hub y en la miga del lector. */
export const RAC_TITULO = "RAC"

/** Nombre largo, para el hero del hub. */
export const RAC_TITULO_LARGO = "Reglamentos Aeronáuticos de Colombia"

/**
 * De dónde sale el material, a la vista mientras se lee.
 *
 * El piloto tiene que ver de qué versión está leyendo: los RAC cambian por
 * resolución, y la del RAC 61 cambió de fecha en agosto de 2026.
 */
export const RAC_VIGENCIA = "Textos oficiales de la Aerocivil, descargados el 24 de septiembre de 2026"

/** Ruta del hub del tema. */
export const RAC_HUB = "/app/aerolinea/rac"
export const RAC_APRENDE = `${RAC_HUB}/aprende`
export const RAC_PRACTICA_RUTA = `${RAC_HUB}/practica`
export const RAC_EVALUACION = `${RAC_HUB}/evaluacion`

/** Cuántas unidades tiene el módulo, una por RAC (RAC_LECCION_TOTAL). */
export const RAC_LECTURA_TOTAL = 19

/**
 * Lectura estimada de las diecinueve unidades, en minutos (RAC_MINUTOS): lo que
 * se lee sin abrir nada, porque el detalle de la norma va plegado.
 */
export const RAC_LECTURA_MINUTOS = 116

/** Preguntas de práctica: el quiz de cada unidad (RAC_PRACTICA_CLAVES). */
export const RAC_PRACTICA_TOTAL = 54

/**
 * El reglamento de cada unidad, en el orden del módulo (U01 es el RAC 2).
 *
 * Lo usa el resultado de la evaluación para decir «repasa el RAC 91» en vez de
 * «unidad 5», sin cargar la lección entera. racContenido.test.ts lo compara
 * con los títulos de las lecciones.
 */
export const RAC_UNIDADES: readonly string[] = [
  "RAC 2",
  "RAC 61",
  "RAC 67",
  "RAC 120",
  "RAC 91",
  "RAC 211",
  "RAC 212",
  "RAC 203",
  "RAC 119",
  "RAC 121",
  "RAC 135",
  "RAC 175",
  "RAC 160",
  "RAC 219",
  "RAC 114",
  "RAC 13",
  "RAC 1",
  "RAC 210",
  "RAC 4",
]

/** Número de lección a partir de la etiqueta del banco («U05» → 5), o null si no es válida. */
export function leccionDeTemaRac(tema: string): number | null {
  const m = /^U(\d{2})$/.exec(tema)
  const n = m ? Number(m[1]) : NaN
  return Number.isInteger(n) && n >= 1 && n <= RAC_LECTURA_TOTAL ? n : null
}

/** Mínimo de la evaluación final, sobre 100. */
export const RAC_PASS_SCORE = 80

/** Preguntas por intento de la evaluación final. */
export const RAC_EXAM_PER_ATTEMPT = 20

export interface RacResumen {
  lessonRead: number
  practiceDone: number
  best: number | null
  passed: boolean
  lessonPct: number
  practicePct: number
  examPct: number
  /** Avance del módulo entero, 0 a 100. */
  overall: number
  empty: boolean
}

/**
 * Resume el avance del módulo.
 *
 * Las tres partes pesan igual, como en el resto de los temas: leer las
 * diecinueve unidades sin practicar ni evaluarse no es tener el tema hecho.
 */
export function resumirRac(p: {
  lessonScreens: number[]
  practiceDone: string[]
  bestScore: number | null
}): RacResumen {
  const leidas = p.lessonScreens.filter((n) => n >= 1 && n <= RAC_LECTURA_TOTAL)
  const lessonRead = Math.min(new Set(leidas).size, RAC_LECTURA_TOTAL)
  const practiceDone = Math.min(new Set(p.practiceDone).size, RAC_PRACTICA_TOTAL)
  const best = p.bestScore
  const passed = best !== null && best >= RAC_PASS_SCORE

  const lessonPct = Math.round((lessonRead / RAC_LECTURA_TOTAL) * 100)
  const practicePct = Math.round((practiceDone / RAC_PRACTICA_TOTAL) * 100)
  const examPct = passed ? 100 : (best ?? 0)

  return {
    lessonRead,
    practiceDone,
    best,
    passed,
    lessonPct,
    practicePct,
    examPct,
    overall: Math.round((lessonPct + practicePct + examPct) / 3),
    empty: lessonRead === 0 && practiceDone === 0 && best === null,
  }
}
