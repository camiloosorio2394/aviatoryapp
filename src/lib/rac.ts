/**
 * Módulo RAC: los datos que comparten el hub, la lección y la evaluación final.
 *
 * Aquí solo vive lo que es dato: rutas, totales, umbrales y el resumen de
 * avance. El contenido de las unidades está en racLeccion.ts, que genera
 * scripts/modulos/convertir-unidades.mjs desde docs/contenido/rac.md, y el
 * banco de la evaluación vive en el servidor.
 *
 * Los totales van fijos y no importados, como en los demás módulos: la lección
 * pesa bastante y el hub, Ingreso a aerolínea y el panel solo necesitan los
 * números. leccionesConteo.test.ts los compara con el contenido.
 */

/** Nombre del módulo, tal como aparece en el hub y en la miga del lector. */
export const RAC_TITULO = "RAC"

/** El nombre largo, para donde haya sitio y la sigla no baste. */
export const RAC_TITULO_LARGO = "Reglamentos Aeronáuticos de Colombia"

/** De qué ediciones se está leyendo. Cada unidad repite la suya en su cabecera. */
export const RAC_FUENTES =
  "Reglamentos Aeronáuticos de Colombia · Aerocivil · ediciones vigentes a 2026, con la Resolución 02543 de 2026"

/**
 * De dónde sale el material, a la vista mientras se lee.
 *
 * Va en la pantalla y no en una nota al pie por la misma razón que en los
 * otros módulos: el piloto tiene que ver de qué versión está leyendo. En un
 * módulo de reglamentos esto pesa el doble.
 */
export const RAC_VIGENCIA = "Contenido v1.0 · 24 de septiembre de 2026"

/** Ruta del hub del tema. */
export const RAC_HUB = "/app/aerolinea/rac"
export const RAC_APRENDE = `${RAC_HUB}/aprende`
export const RAC_EVALUACION = `${RAC_HUB}/evaluacion`

/** El acento del módulo: azul pizarra, el de la tinta de un documento oficial. */
export const RAC_ACENTO = "var(--av-rc-700)"

/** Cuántas unidades tiene el módulo (RAC_LECCIONES.length). Denominador de la lectura. */
export const RAC_LECTURA_TOTAL = 19

/** Lectura estimada de las diecinueve unidades, en minutos. */
export const RAC_LECTURA_MINUTOS = 140

/**
 * La práctica de este módulo no tiene pantalla propia: las preguntas de cada
 * unidad viven al final de la unidad, junto a la norma que ponen a prueba. El
 * denominador de práctica es el total de esas preguntas.
 */
export const RAC_PRACTICA_TOTAL = 54

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
 * diecinueve unidades sin responder sus preguntas ni evaluarse no es tener el
 * tema hecho.
 */
export function resumirRac(p: {
  lessonScreens: number[]
  practiceDone: string[]
  bestScore: number | null
}): RacResumen {
  const leidos = p.lessonScreens.filter((n) => n >= 1 && n <= RAC_LECTURA_TOTAL)
  const lessonRead = Math.min(leidos.length, RAC_LECTURA_TOTAL)
  const practiceDone = Math.min(p.practiceDone.length, RAC_PRACTICA_TOTAL)
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
