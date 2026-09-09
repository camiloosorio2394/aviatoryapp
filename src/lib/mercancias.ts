/**
 * Módulo Mercancías peligrosas: los datos que comparten el hub, la lección, la
 * práctica y la evaluación.
 *
 * Aquí solo vive lo que es dato: rutas, totales, umbrales y el resumen de
 * avance. El contenido de la lección está en mercanciasLeccion/, la práctica
 * en mercanciasPractica.ts y el banco de la evaluación en su propio archivo.
 */

import { MP_LECCION_TOTAL } from "@/lib/mercanciasLeccion"
import { CASOS } from "@/lib/mercanciasPractica"

/** Nombre del módulo, tal como aparece en el hub y en la miga del lector. */
export const MP_TITULO = "Mercancías peligrosas"

/** Las fuentes normativas, en una línea. */
export const MP_FUENTES = "RAC 175 · LAR 175 · Anexo 18 y Doc 9284 OACI · RAC 2 · RAC 61"

/**
 * Edición de la que sale el material.
 *
 * Va a la vista y no en una nota al pie a propósito: el RAC 175 consultado es
 * la Edición original y ha tenido enmiendas, así que el piloto tiene que ver de
 * qué edición está leyendo mientras lee, no al final.
 */
export const MP_VIGENCIA = "RAC 175 · Edición original, marzo 2016 (Res. 00478)"

/** Ruta del hub del tema. */
export const MP_HUB = "/app/aerolinea/mercancias"
/** La lección, con el lector genérico. */
export const MP_APRENDE = `${MP_HUB}/aprende`
export const MP_PRACTICA = `${MP_HUB}/practica`
export const MP_EVALUACION = `${MP_HUB}/evaluacion`
/** Ruta vieja del lector propio. Redirige a la lección; se conserva por los enlaces guardados. */
export const MP_LECTOR = `${MP_HUB}/leccion`

/** Cuántas lecciones tiene el módulo. Denominador del progreso de lectura. */
export const MP_LECTURA_TOTAL = MP_LECCION_TOTAL

/** Ejercicios de la práctica. Denominador de esa parte. */
export const MP_PRACTICA_TOTAL = CASOS.length

/** Mínimo de la evaluación, sobre 100. */
export const MP_PASS_SCORE = 80

/** Preguntas por intento de la evaluación. */
export const MP_EXAM_PER_ATTEMPT = 25

export interface MercanciasResumen {
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
 * Las tres partes pesan igual, como en NOTAM y METAR: leer todo sin practicar
 * ni evaluarse no es tener el tema hecho.
 */
export function resumirMercancias(p: {
  lessonScreens: number[]
  practiceDone: string[]
  bestScore: number | null
}): MercanciasResumen {
  const leidas = p.lessonScreens.filter((n) => n >= 1 && n <= MP_LECTURA_TOTAL)
  const lessonRead = Math.min(leidas.length, MP_LECTURA_TOTAL)
  const practiceDone = Math.min(p.practiceDone.length, MP_PRACTICA_TOTAL)
  const best = p.bestScore
  const passed = best !== null && best >= MP_PASS_SCORE

  const lessonPct = Math.round((lessonRead / MP_LECTURA_TOTAL) * 100)
  const practicePct = Math.round((practiceDone / MP_PRACTICA_TOTAL) * 100)
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
