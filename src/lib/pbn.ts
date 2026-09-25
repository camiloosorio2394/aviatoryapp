/**
 * Módulo PBN: los datos que comparten el hub, la lección, la práctica y la
 * evaluación final.
 *
 * Aquí solo vive lo que es dato: rutas, totales, umbrales y el resumen de
 * avance. El contenido de los capítulos está en pbnLeccion.ts, las preguntas
 * de capítulo en pbnPractica.ts, y las de la evaluación en el servidor. Los
 * tres los genera scripts/pbn/convertir.mjs desde docs/contenido/pbn.md.
 *
 * Los totales van fijos y no importados, como en los demás módulos: la lección
 * pesa bastante y el hub, Ingreso a aerolínea y el panel solo necesitan los
 * números. leccionesConteo.test.ts los compara con el contenido.
 */

/** Nombre del módulo, tal como aparece en el hub y en la miga del lector. */
export const PBN_TITULO = "PBN"

/** El nombre largo, para donde haya sitio y la sigla no baste. */
export const PBN_TITULO_LARGO = "Performance-Based Navigation"

/** De dónde sale el material, a la vista mientras se lee. */
export const PBN_VIGENCIA = "Contenido v1.0 · 25 de septiembre de 2026"

/** Las fuentes, en una línea. El Anexo B del documento las lista completas. */
export const PBN_FUENTES = "RAC 91, 119, 121 y 211 · FAA AC 90-105A, 90-100A y 90-101A · FAA AIM · OACI PANS-ATM"

/** Ruta del hub del tema. */
export const PBN_HUB = "/app/aerolinea/pbn"
export const PBN_APRENDE = `${PBN_HUB}/aprende`
export const PBN_PRACTICA_RUTA = `${PBN_HUB}/practica`
export const PBN_EVALUACION = `${PBN_HUB}/evaluacion`

/** El acento del módulo: bronce de instrumento. */
export const PBN_ACENTO = "var(--av-pbn-700)"

/** Cuántos capítulos tiene el módulo (PB_LECCION_TOTAL). Denominador de la lectura. */
export const PBN_LECTURA_TOTAL = 48

/** Lectura estimada de los cuarenta y ocho capítulos, en minutos. */
export const PBN_LECTURA_MINUTOS = 352

/** Las tres preguntas del quiz de cada capítulo: 48 × 3. */
export const PBN_PRACTICA_TOTAL = 144

/** Mínimo de la evaluación final, sobre 100. */
export const PBN_PASS_SCORE = 80

/** Preguntas por intento de la evaluación final. */
export const PBN_EXAM_PER_ATTEMPT = 20

/**
 * El banco guarda el capítulo como «P07»; de ahí sale el número de lección.
 * Devuelve null si el identificador no corresponde a un capítulo del módulo.
 */
export function leccionDeTemaPbn(tema: string): number | null {
  const n = Number(tema.replace(/^P/i, ""))
  if (!Number.isInteger(n) || n < 1 || n > PBN_LECTURA_TOTAL) return null
  return n
}

export interface PbnResumen {
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
 * Las tres partes pesan igual, como en el resto de los temas: leer los cincuenta
 * y dos capítulos sin hacer la práctica ni evaluarse no es tener el tema hecho.
 */
export function resumirPbn(p: {
  lessonScreens: number[]
  practiceDone: string[]
  bestScore: number | null
}): PbnResumen {
  const leidos = p.lessonScreens.filter((n) => n >= 1 && n <= PBN_LECTURA_TOTAL)
  const lessonRead = Math.min(leidos.length, PBN_LECTURA_TOTAL)
  const practiceDone = Math.min(p.practiceDone.length, PBN_PRACTICA_TOTAL)
  const best = p.bestScore
  const passed = best !== null && best >= PBN_PASS_SCORE

  const lessonPct = Math.round((lessonRead / PBN_LECTURA_TOTAL) * 100)
  const practicePct = Math.round((practiceDone / PBN_PRACTICA_TOTAL) * 100)
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
