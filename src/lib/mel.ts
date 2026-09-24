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
 * Estado (24-sep-2026): las 40 lecciones existen con su título y el marcador
 * «en redacción». Faltan el contenido, la práctica, la evaluación y el video.
 * Ver docs/MEL_ESTADO.md.
 */

import type { LectorNivel } from "@/components/lesson/LectorLeccion"

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
  lessonPct: number
  /**
   * Avance del módulo entero, 0 a 100. Mientras no haya práctica ni
   * evaluación es el de la lección; cuando lleguen, pesan igual las tres, como
   * en Comunicaciones ATC.
   */
  overall: number
  empty: boolean
}

export function resumirMel(p: { lessonScreens: number[] }): MelResumen {
  const leidas = new Set(p.lessonScreens.filter((n) => n >= 1 && n <= MEL_LECTURA_TOTAL))
  const lessonRead = Math.min(leidas.size, MEL_LECTURA_TOTAL)
  const lessonPct = Math.round((lessonRead / MEL_LECTURA_TOTAL) * 100)
  return { lessonRead, lessonPct, overall: lessonPct, empty: lessonRead === 0 }
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
  /** Claves de práctica resueltas. Vacío hasta que exista la práctica. */
  practiceDone: string[]
}

const VACIO: MelProgreso = { lessonScreens: [], practiceDone: [] }

export function readMelLocal(): MelProgreso {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return { ...VACIO }
    const p = JSON.parse(raw) as Partial<MelProgreso>
    return {
      lessonScreens: Array.isArray(p.lessonScreens) ? p.lessonScreens : [],
      practiceDone: Array.isArray(p.practiceDone) ? p.practiceDone : [],
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

function escribir(p: MelProgreso): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(p))
  } catch {
    /* localStorage bloqueado (incógnito): el avance queda en memoria */
  }
}
