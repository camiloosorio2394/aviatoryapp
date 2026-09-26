/**
 * Módulo Gestión del combustible: los datos que comparten el hub, la lección,
 * la práctica y la evaluación final.
 *
 * Aquí solo vive lo que es dato: rutas, totales, umbrales y el resumen de
 * avance. El contenido está en combustibleLeccion.ts y combustiblePractica.ts,
 * que genera scripts/combustible/convertir.mjs desde
 * docs/contenido/gestion-combustible.md, y el banco de la evaluación vive en el
 * servidor.
 *
 * Los totales van fijos y no importados, como en los demás módulos.
 * leccionesConteo.test.ts los compara con el contenido.
 */

/** Nombre del módulo, tal como aparece en el hub y en la miga del lector. */
export const CB_TITULO = "Gestión del combustible"

/** El marco que usa el módulo, en una línea. El Anexo C del documento lo lista completo. */
export const CB_FUENTES = "RAC 121 (121.2645 y 121.2553) · RAC 91 · OACI Anexo 6, Doc 4444 y Doc 9976 · FAA para comparar"

/** Ruta del hub del tema. */
export const CB_HUB = "/app/aerolinea/combustible"
export const CB_APRENDE = `${CB_HUB}/aprende`
export const CB_PRACTICA_RUTA = `${CB_HUB}/practica`
export const CB_EVALUACION = `${CB_HUB}/evaluacion`

/** Cuántos capítulos tiene el módulo (CB_LECCION_TOTAL). */
export const CB_LECTURA_TOTAL = 23

/** Lectura estimada de los veintitrés capítulos, en minutos (CB_MINUTOS). */
export const CB_LECTURA_MINUTOS = 151

/** El capítulo de los escenarios prácticos, que cuentan como práctica. */
export const CB_CAPITULO_ESCENARIOS = 23

/**
 * Práctica: las tres preguntas de cada capítulo (66) y los diez escenarios
 * del capítulo 23, que se marcan al pedir el análisis (CB_PRACTICA_CLAVES).
 */
export const CB_PRACTICA_TOTAL = 76

/** Número de capítulo a partir de la etiqueta del banco («C06» → 6), o null si no es válida. */
export function capituloDeTemaCb(tema: string): number | null {
  const m = /^C(\d{2})$/.exec(tema)
  const n = m ? Number(m[1]) : NaN
  return Number.isInteger(n) && n >= 1 && n <= CB_LECTURA_TOTAL ? n : null
}

/** Mínimo de la evaluación final, sobre 100. */
export const CB_PASS_SCORE = 80

/** Preguntas por intento de la evaluación final. */
export const CB_EXAM_PER_ATTEMPT = 20

export interface CombustibleResumen {
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

/** Resume el avance del módulo: lección, práctica y evaluación pesan igual. */
export function resumirCombustible(p: {
  lessonScreens: number[]
  practiceDone: string[]
  bestScore: number | null
}): CombustibleResumen {
  const leidas = p.lessonScreens.filter((n) => n >= 1 && n <= CB_LECTURA_TOTAL)
  const lessonRead = Math.min(new Set(leidas).size, CB_LECTURA_TOTAL)
  const practiceDone = Math.min(new Set(p.practiceDone).size, CB_PRACTICA_TOTAL)
  const best = p.bestScore
  const passed = best !== null && best >= CB_PASS_SCORE

  const lessonPct = Math.round((lessonRead / CB_LECTURA_TOTAL) * 100)
  const practicePct = Math.round((practiceDone / CB_PRACTICA_TOTAL) * 100)
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
