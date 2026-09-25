/**
 * Módulo Gestión del combustible: los datos que comparten el hub, la lección y
 * la evaluación final.
 *
 * Aquí solo vive lo que es dato: rutas, totales, umbrales y el resumen de
 * avance. El contenido de los capítulos está en combustibleLeccion.ts, que
 * genera scripts/modulos/convertir-unidades.mjs desde
 * docs/contenido/gestion-combustible.md, y el banco de la evaluación vive en el
 * servidor.
 *
 * Los totales van fijos y no importados, como en los demás módulos: la lección
 * pesa bastante y el hub, Ingreso a aerolínea y el panel solo necesitan los
 * números. leccionesConteo.test.ts los compara con el contenido.
 */

/** Nombre del módulo, tal como aparece en el hub y en la miga del lector. */
export const CB_TITULO = "Gestión del combustible"

/** El nombre corto, para la tarjeta de Ingreso a aerolínea y el panel. */
export const CB_TITULO_CORTO = "Combustible"

/** Las fuentes, en una línea. El Anexo C del documento las lista completas. */
export const CB_FUENTES =
  "RAC 91 y RAC 121 · Reglamento (UE) 965/2012 · OACI Doc 9976 y Anexo 6 · 14 CFR 121"

/**
 * De dónde sale el material, a la vista mientras se lee.
 *
 * Va en la pantalla y no en una nota al pie por la misma razón que en los
 * otros módulos: el piloto tiene que ver de qué versión está leyendo.
 */
export const CB_VIGENCIA = "Contenido v1.0 · 24 de septiembre de 2026"

/** Ruta del hub del tema. */
export const CB_HUB = "/app/aerolinea/combustible"
export const CB_APRENDE = `${CB_HUB}/aprende`
export const CB_EVALUACION = `${CB_HUB}/evaluacion`

/** El acento del módulo: petróleo, el del queroseno del que trata. */
export const CB_ACENTO = "var(--av-cb-700)"

/** Cuántos capítulos tiene el módulo (CB_LECCIONES.length). Denominador de la lectura. */
export const CB_LECTURA_TOTAL = 23

/** Lectura estimada de los veintitrés capítulos, en minutos. */
export const CB_LECTURA_MINUTOS = 190

/**
 * La práctica de este módulo no tiene pantalla propia: las tres preguntas de
 * cada capítulo viven al final del capítulo, junto al concepto que ponen a
 * prueba. El denominador de práctica es el total de esas preguntas: tres por
 * cada uno de los capítulos 1 a 22.
 */
export const CB_PRACTICA_TOTAL = 66

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

/**
 * Resume el avance del módulo.
 *
 * Las tres partes pesan igual, como en el resto de los temas: leer los
 * veintitrés capítulos sin responder sus preguntas ni evaluarse no es tener el
 * tema hecho.
 */
export function resumirCombustible(p: {
  lessonScreens: number[]
  practiceDone: string[]
  bestScore: number | null
}): CombustibleResumen {
  const leidos = p.lessonScreens.filter((n) => n >= 1 && n <= CB_LECTURA_TOTAL)
  const lessonRead = Math.min(leidos.length, CB_LECTURA_TOTAL)
  const practiceDone = Math.min(p.practiceDone.length, CB_PRACTICA_TOTAL)
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
