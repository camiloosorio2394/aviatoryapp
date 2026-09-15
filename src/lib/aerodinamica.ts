/**
 * Módulo Aerodinámica: los datos que comparten el hub, la lección, la práctica
 * y el quiz final.
 *
 * Aquí solo vive lo que es dato: rutas, totales, umbrales y el resumen de
 * avance. El contenido de las secciones está en aerodinamicaLeccion.ts, la
 * práctica en aerodinamicaPractica.ts y el banco del quiz en el servidor. Los
 * dos primeros los genera scripts/aerodinamica/convertir.mjs desde
 * docs/contenido/aerodinamica.md, que es la fuente.
 *
 * Los totales van fijos y no importados, como en Mercancías: la lección pesa
 * 130 KB y el hub, Ingreso a aerolínea y la Biblioteca solo necesitan los
 * números. leccionesConteo.test.ts los compara con el contenido.
 */

/** Nombre del módulo, tal como aparece en el hub y en la miga del lector. */
export const AERO_TITULO = "Aerodinámica"

/** Las fuentes, en una línea. El Anexo B del documento las lista completas. */
export const AERO_FUENTES = "FAA PHAK (8083-25A y 25C) · AC 61-107B · AUPRTA · EASA AMC 25.251"

/**
 * De dónde sale el material, a la vista mientras se lee.
 *
 * Va en la pantalla y no en una nota al pie por la misma razón que en
 * Mercancías: el piloto tiene que ver de qué edición está leyendo mientras lee.
 */
export const AERO_VIGENCIA = "Contenido v1.0 · 15 de septiembre de 2026"

/** Ruta del hub del tema. */
export const AERO_HUB = "/app/aerolinea/aerodinamica"
export const AERO_APRENDE = `${AERO_HUB}/aprende`
export const AERO_PRACTICA = `${AERO_HUB}/practica`
export const AERO_EVALUACION = `${AERO_HUB}/evaluacion`

/** Cuántas secciones tiene el módulo (AERO_LECCION_TOTAL). Denominador del progreso de lectura. */
export const AERO_LECTURA_TOTAL = 12

/** Lectura estimada de las doce secciones, en minutos (AERO_MINUTOS). */
export const AERO_LECTURA_MINUTOS = 145

/**
 * Ejercicios de la práctica (AERO_PRACTICA_TOTAL): 13 escenarios de aplicación
 * y 49 preguntas de entrevista. Denominador de esa parte.
 */
export const AERO_PRACTICA_TOTAL = 62

/** Mínimo del quiz final, sobre 100. */
export const AERO_PASS_SCORE = 80

/** Preguntas por intento del quiz final. */
export const AERO_EXAM_PER_ATTEMPT = 20

export interface AerodinamicaResumen {
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
 * Las tres partes pesan igual, como en NOTAM, METAR y Mercancías: leer las doce
 * secciones sin practicar ni evaluarse no es tener el tema hecho.
 */
export function resumirAerodinamica(p: {
  lessonScreens: number[]
  practiceDone: string[]
  bestScore: number | null
}): AerodinamicaResumen {
  const leidas = p.lessonScreens.filter((n) => n >= 1 && n <= AERO_LECTURA_TOTAL)
  const lessonRead = Math.min(leidas.length, AERO_LECTURA_TOTAL)
  const practiceDone = Math.min(p.practiceDone.length, AERO_PRACTICA_TOTAL)
  const best = p.bestScore
  const passed = best !== null && best >= AERO_PASS_SCORE

  const lessonPct = Math.round((lessonRead / AERO_LECTURA_TOTAL) * 100)
  const practicePct = Math.round((practiceDone / AERO_PRACTICA_TOTAL) * 100)
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
