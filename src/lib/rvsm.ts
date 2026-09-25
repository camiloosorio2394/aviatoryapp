/**
 * Módulo RVSM: los datos que comparten el hub, la lección, la práctica y la
 * evaluación final.
 *
 * Aquí solo vive lo que es dato: rutas, totales, umbrales y el resumen de
 * avance. El contenido de los capítulos está en rvsmLeccion.ts, las preguntas
 * de capítulo en rvsmPractica.ts, y las de la evaluación en el servidor. Los
 * tres los genera scripts/rvsm/convertir.mjs desde docs/contenido/rvsm.md.
 *
 * Los totales van fijos y no importados, como en los demás módulos: la lección
 * pesa bastante y el hub, Ingreso a aerolínea y el panel solo necesitan los
 * números. leccionesConteo.test.ts los compara con el contenido.
 */

/** Nombre del módulo, tal como aparece en el hub y en la miga del lector. */
export const RVSM_TITULO = "RVSM"

/** El nombre largo, para donde haya sitio y la sigla no baste. */
export const RVSM_TITULO_LARGO = "Reduced Vertical Separation Minimum"

/** De dónde sale el material, a la vista mientras se lee. */
export const RVSM_VIGENCIA = "Contenido v1.0 · 25 de septiembre de 2026"

/** Las fuentes, en una línea. El Anexo B del documento las lista completas. */
export const RVSM_FUENTES = "FAA AC 91-85B · RAC 91, 119 y 211 · OACI Doc 9574 · AIP Colombia"

/** Ruta del hub del tema. */
export const RVSM_HUB = "/app/aerolinea/rvsm"
export const RVSM_APRENDE = `${RVSM_HUB}/aprende`
export const RVSM_PRACTICA_RUTA = `${RVSM_HUB}/practica`
export const RVSM_EVALUACION = `${RVSM_HUB}/evaluacion`

/** El acento del módulo: verde azulado de cabina. */
export const RVSM_ACENTO = "var(--av-rv-700)"

/** Cuántos capítulos tiene el módulo (RV_LECCION_TOTAL). Denominador de la lectura. */
export const RVSM_LECTURA_TOTAL = 32

/** Lectura estimada de los treinta y dos capítulos, en minutos. */
export const RVSM_LECTURA_MINUTOS = 187

/** Las tres preguntas del quiz de cada capítulo: 32 × 3. */
export const RVSM_PRACTICA_TOTAL = 96

/** Mínimo de la evaluación final, sobre 100. */
export const RVSM_PASS_SCORE = 80

/** Preguntas por intento de la evaluación final. */
export const RVSM_EXAM_PER_ATTEMPT = 20

/**
 * El banco guarda el capítulo como «R07»; de ahí sale el número de lección.
 * Devuelve null si el identificador no corresponde a un capítulo del módulo.
 */
export function leccionDeTemaRvsm(tema: string): number | null {
  const n = Number(tema.replace(/^R/i, ""))
  if (!Number.isInteger(n) || n < 1 || n > RVSM_LECTURA_TOTAL) return null
  return n
}

export interface RvsmResumen {
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
 * Las tres partes pesan igual, como en el resto de los temas: leer los treinta
 * y dos capítulos sin hacer la práctica ni evaluarse no es tener el tema hecho.
 */
export function resumirRvsm(p: {
  lessonScreens: number[]
  practiceDone: string[]
  bestScore: number | null
}): RvsmResumen {
  const leidos = p.lessonScreens.filter((n) => n >= 1 && n <= RVSM_LECTURA_TOTAL)
  const lessonRead = Math.min(leidos.length, RVSM_LECTURA_TOTAL)
  const practiceDone = Math.min(p.practiceDone.length, RVSM_PRACTICA_TOTAL)
  const best = p.bestScore
  const passed = best !== null && best >= RVSM_PASS_SCORE

  const lessonPct = Math.round((lessonRead / RVSM_LECTURA_TOTAL) * 100)
  const practicePct = Math.round((practiceDone / RVSM_PRACTICA_TOTAL) * 100)
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
