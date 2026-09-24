/**
 * Módulo Performance: los datos que comparten el hub, la lección y la
 * evaluación final.
 *
 * Aquí solo vive lo que es dato: rutas, totales, umbrales y el resumen de
 * avance. El contenido de los temas está en performanceLeccion.ts, que genera
 * scripts/performance/convertir.mjs desde docs/contenido/performance.md, y el
 * banco de la evaluación vive en el servidor.
 *
 * Los totales van fijos y no importados, como en los demás módulos: la lección
 * pesa bastante y el hub, Ingreso a aerolínea y el panel solo necesitan los
 * números. leccionesConteo.test.ts los compara con el contenido.
 */

/** Nombre del módulo, tal como aparece en el hub y en la miga del lector. */
export const PERF_TITULO = "Performance"

/** Las fuentes, en una línea. El Anexo B del documento las lista completas. */
export const PERF_FUENTES = "14 CFR 25 y CS-25 · 14 CFR 121 · Reglamento (UE) 965/2012 · FAA AC 25-13 · SAFO 19001"

/**
 * De dónde sale el material, a la vista mientras se lee.
 *
 * Va en la pantalla y no en una nota al pie por la misma razón que en los
 * otros módulos: el piloto tiene que ver de qué versión está leyendo.
 */
export const PERF_VIGENCIA = "Contenido v1.0 · 24 de septiembre de 2026"

/** Ruta del hub del tema. */
export const PERF_HUB = "/app/aerolinea/performance"
export const PERF_APRENDE = `${PERF_HUB}/aprende`
export const PERF_EVALUACION = `${PERF_HUB}/evaluacion`

/** Cuántos temas tiene el módulo (PERF_LECCION_TOTAL). Denominador de la lectura. */
export const PERF_LECTURA_TOTAL = 40

/** Lectura estimada de los cuarenta temas, en minutos (PERF_MINUTOS). */
export const PERF_LECTURA_MINUTOS = 131

/**
 * La práctica de este módulo no tiene pantalla propia: los dieciocho
 * ejercicios resueltos y los diez escenarios viven dentro de los temas 38 y
 * 40, donde se estudian junto al concepto que ponen a prueba. El denominador
 * de práctica es esa suma.
 */
export const PERF_PRACTICA_TOTAL = 28

/** Mínimo de la evaluación final, sobre 100. */
export const PERF_PASS_SCORE = 80

/** Preguntas por intento de la evaluación final. */
export const PERF_EXAM_PER_ATTEMPT = 25

export interface PerformanceResumen {
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
 * Las tres partes pesan igual, como en el resto de los temas: leer los cuarenta
 * temas sin resolver los ejercicios ni evaluarse no es tener el tema hecho.
 */
export function resumirPerformance(p: {
  lessonScreens: number[]
  practiceDone: string[]
  bestScore: number | null
}): PerformanceResumen {
  const leidos = p.lessonScreens.filter((n) => n >= 1 && n <= PERF_LECTURA_TOTAL)
  const lessonRead = Math.min(leidos.length, PERF_LECTURA_TOTAL)
  const practiceDone = Math.min(p.practiceDone.length, PERF_PRACTICA_TOTAL)
  const best = p.bestScore
  const passed = best !== null && best >= PERF_PASS_SCORE

  const lessonPct = Math.round((lessonRead / PERF_LECTURA_TOTAL) * 100)
  const practicePct = Math.round((practiceDone / PERF_PRACTICA_TOTAL) * 100)
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
