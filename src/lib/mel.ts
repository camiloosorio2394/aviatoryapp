/**
 * Módulo Minimum Equipment List (MEL): los datos que comparten el lector, el
 * hub y la tarjeta de «Ingreso a aerolínea».
 *
 * Aquí solo vive lo que es dato: rutas, niveles, totales, el acento y el
 * respaldo local del avance. El contenido está en melLeccion/.
 *
 * El objetivo del módulo es que el piloto, con algo inoperativo en el avión,
 * sepa **leer la entrada, cumplir lo que pide y decidir si sale**, y que lo
 * pueda explicar en una entrevista. Por eso la progresión va de qué es la MEL
 * a leer una entrada columna por columna, al flujo del defecto al despacho, al
 * impacto en el vuelo, y cierra con práctica y entrevista.
 *
 * Las entradas reales salen de las MMEL públicas de la FAA (son la lista del
 * tipo, no la MEL de un operador); lo que es de Colombia se cita por RAC y lo
 * que depende del operador se dice como tal.
 *
 * Estado (25-sep-2026): las 40 lecciones con su contenido, la práctica de
 * seis tipos conectada y la evaluación en el servidor. Faltan las portadas y
 * el video. Ver docs/MEL_ESTADO.md.
 */

import type { LectorNivel } from "@/components/lesson/LectorLeccion"
import { MEL_PRACTICA_CONTEO } from "@/lib/melConteo"

/** Nombre completo del módulo, para el hub. */
export const MEL_TITULO = "Minimum Equipment List (MEL)"

/** Nombre corto, para la miga del lector y la tarjeta de Ingreso a aerolínea. */
export const MEL_TITULO_CORTO = "MEL"

/** Las fuentes, en una línea. */
export const MEL_FUENTES = "Anexo 6 de la OACI, RAC 121 y RAC 91, FAA Order 8900.1 y las MMEL de la FAA"

/** Ruta del módulo. */
export const MEL_HUB = "/app/aerolinea/mel"
/** La lección, con el lector genérico. */
export const MEL_APRENDE = `${MEL_HUB}/aprende`
/** La práctica, los seis tipos de ejercicio. */
export const MEL_PRACTICA = `${MEL_HUB}/practica`
/** La evaluación, con el banco en el servidor. */
export const MEL_EVALUACION = `${MEL_HUB}/evaluacion`

/** Preguntas por intento de la evaluación. La regla que manda es la de la tabla `evaluaciones`. */
export const MEL_EXAM_PER_ATTEMPT = 25
/** Nota para aprobar, igual que `mel_pass` en module_thresholds. */
export const MEL_PASS_SCORE = 80

/**
 * El grafito de bitácora del módulo, para las pantallas que no son el lector.
 *
 * Dentro del lector el acento lo pone el tema `.lector-notam.lector-mel`; fuera
 * de él no hay tema que aplicar, así que el valor vive aquí una sola vez. Es
 * el mismo oklch(0.40 0.020 60) de `--av-mel-700` en index.css.
 */
export const MEL_ACENTO = "#50453D"

/**
 * Los cinco niveles, con el número de su primera lección.
 *
 * Las lecciones se numeran 1 a 40 en el orden en que aparecen en
 * docs/mel/nivel-N.md, que no es el de los capítulos: el nivel 3 lleva los
 * capítulos 16 a 21 y 33 a 36, y el nivel 5 los 30 a 32 y 37 a 40. La
 * correspondencia está en `MEL_CAPITULOS` (melLeccion/index.ts).
 */
export const MEL_NIVELES: LectorNivel[] = [
  { titulo: "Nivel 1 · Qué es la MEL", desde: 1 },
  { titulo: "Nivel 2 · Leer una entrada", desde: 4 },
  { titulo: "Nivel 3 · Del defecto al despacho", desde: 16 },
  { titulo: "Nivel 4 · Impacto operacional", desde: 26 },
  { titulo: "Nivel 5 · Práctica y entrevista", desde: 34 },
]

/**
 * Total de lecciones, una por capítulo. Va fijo y no importado para que la
 * tarjeta del hub no arrastre el contenido entero; `leccionesConteo.test.ts`
 * lo compara con el contenido y con la migración.
 */
export const MEL_LECTURA_TOTAL = 40

// ─── Resumen del avance ──────────────────────────────────────────────────────

export interface MelResumen {
  lessonRead: number
  practiceDone: number
  best: number | null
  passed: boolean
  lessonPct: number
  practicePct: number
  examPct: number
  /** Avance del módulo entero, 0 a 100: lección, práctica y evaluación pesan igual. */
  overall: number
  empty: boolean
}

/**
 * Resume el avance del módulo, como `resumirComunicaciones`: las tres partes
 * pesan igual, porque leer sin practicar ni evaluarse no es tener el tema.
 * Solo cuentan las claves de esta práctica (`mel-…`).
 */
export function resumirMel(p: { lessonScreens: number[]; practiceDone: string[]; bestScore: number | null }): MelResumen {
  const leidas = new Set(p.lessonScreens.filter((n) => n >= 1 && n <= MEL_LECTURA_TOTAL))
  const lessonRead = Math.min(leidas.size, MEL_LECTURA_TOTAL)
  const practiceDone = Math.min(new Set(p.practiceDone.filter((k) => k.startsWith("mel-"))).size, MEL_PRACTICA_CONTEO)
  const best = p.bestScore
  const passed = best !== null && best >= MEL_PASS_SCORE
  const lessonPct = Math.round((lessonRead / MEL_LECTURA_TOTAL) * 100)
  const practicePct = Math.round((practiceDone / MEL_PRACTICA_CONTEO) * 100)
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

// ─── Respaldo local del avance ───────────────────────────────────────────────

/**
 * El respaldo local del avance. Se escribe siempre y primero: el módulo tiene
 * que funcionar sin sesión y sin red, y lo que se estudie así se sube cuando
 * aparezca una cuenta.
 *
 * Lo de la base vive en `melProgress.ts`, que trae el cliente de Supabase
 * detrás. Aquí no, porque este archivo lo carga Ingreso a aerolínea.
 */
const LS_KEY = "aviatory.mel.progress"

export interface MelProgreso {
  /** Números de lección leída, 1 a MEL_LECTURA_TOTAL. */
  lessonScreens: number[]
  /** Claves de práctica resueltas, las de `claveEjercicioMel`. */
  practiceDone: string[]
  /** Mejor puntaje de la evaluación en este navegador, o null. */
  bestScore: number | null
}

const VACIO: MelProgreso = { lessonScreens: [], practiceDone: [], bestScore: null }

export function readMelLocal(): MelProgreso {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return { ...VACIO }
    const p = JSON.parse(raw) as Partial<MelProgreso>
    return {
      lessonScreens: Array.isArray(p.lessonScreens) ? p.lessonScreens : [],
      practiceDone: Array.isArray(p.practiceDone) ? p.practiceDone : [],
      bestScore: typeof p.bestScore === "number" ? p.bestScore : null,
    }
  } catch {
    return { ...VACIO }
  }
}

/** Guarda lo leído sin pisar lo practicado. */
export function writeMelLocal(lessonScreens: number[]): void {
  escribir({ ...readMelLocal(), lessonScreens })
}

/** Y al revés: guarda lo practicado sin pisar lo leído. */
export function writeMelPracticas(practiceDone: string[]): void {
  escribir({ ...readMelLocal(), practiceDone })
}

/** Y el mejor puntaje de la evaluación, sin pisar lo demás. */
export function writeMelMejor(bestScore: number): void {
  const antes = readMelLocal().bestScore
  escribir({ ...readMelLocal(), bestScore: antes === null ? bestScore : Math.max(antes, bestScore) })
}

function escribir(p: MelProgreso): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(p))
  } catch {
    /* localStorage bloqueado (incógnito): el avance queda en memoria */
  }
}
