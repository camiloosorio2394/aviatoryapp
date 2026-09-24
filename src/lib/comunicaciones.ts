/**
 * Módulo Comunicaciones aeronáuticas y gestión ATC: los datos que comparten el
 * lector, el hub y la tarjeta de «Ingreso a aerolínea».
 *
 * Aquí solo vive lo que es dato: rutas, niveles, totales, el acento y el
 * respaldo local del avance. El contenido está en comunicacionesLeccion/.
 *
 * El objetivo del módulo es que el piloto termine capaz de **escuchar,
 * interpretar, confirmar y responder** una comunicación ATC. No es un curso de
 * inglés general ni una lista de fraseología: por eso la progresión va de los
 * fundamentos de la radio a la autorización, la emergencia, el data link y los
 * factores humanos, y cierra con práctica.
 *
 * La norma es **OACI**. Lo que sea procedimiento de un Estado o de un
 * explotador se dice como tal, y lo que no tenga fuente cargada va con un
 * callout `verificar`.
 *
 * Estado (25-sep-2026): las 69 lecciones existen con su título (y se van
 * llenando nivel por nivel), la práctica con audio está conectada y la
 * evaluación va en el servidor. Falta el video. Ver
 * docs/COMUNICACIONES_ESTADO.md.
 */

import type { LectorNivel } from "@/components/lesson/LectorLeccion"
import { CM_PRACTICA_CONTEO } from "@/lib/comunicacionesConteo"

/** Nombre completo del módulo, para el hub. */
export const CM_TITULO = "Comunicaciones aeronáuticas y gestión ATC"

/** Nombre corto, para la miga del lector y la tarjeta de Ingreso a aerolínea. */
export const CM_TITULO_CORTO = "Comunicaciones ATC"

/** Las fuentes normativas, en una línea. */
export const CM_FUENTES = "Anexo 10 Vol. II, Doc 4444 y Doc 9432 de la OACI"

/** Ruta del módulo. */
export const CM_HUB = "/app/aerolinea/comunicaciones"
/** La lección, con el lector genérico. */
export const CM_APRENDE = `${CM_HUB}/aprende`
/** La práctica con audio, los diez tipos de ejercicio. */
export const CM_PRACTICA = `${CM_HUB}/practica`
/** La evaluación, con el banco en el servidor. */
export const CM_EVALUACION = `${CM_HUB}/evaluacion`

/** Preguntas por intento de la evaluación. La regla que manda es la de la tabla `evaluaciones`. */
export const CM_EXAM_PER_ATTEMPT = 25
/** Nota para aprobar, igual que `comunicaciones_pass` en module_thresholds. */
export const CM_PASS_SCORE = 80

/**
 * La ciruela de radio del módulo, para las pantallas que no son el lector.
 *
 * Dentro del lector el acento lo pone el tema `.lector-notam.lector-cm`; fuera
 * de él no hay tema que aplicar, así que el valor vive aquí una sola vez. Es
 * el mismo oklch(0.40 0.095 320) de `--av-cm-700` en index.css.
 */
export const CM_ACENTO = "#5E3567"

/** Los ocho niveles, con el número de su primera lección. */
export const CM_NIVELES: LectorNivel[] = [
  { titulo: "Nivel 1 · Fundamentos", desde: 1 },
  { titulo: "Nivel 2 · El idioma", desde: 8 },
  { titulo: "Nivel 3 · Autorizaciones y superficie", desde: 12 },
  { titulo: "Nivel 4 · En ruta y llegada", desde: 19 },
  { titulo: "Nivel 5 · Vigilancia, contingencias y emergencias", desde: 31 },
  { titulo: "Nivel 6 · Data link y operación oceánica", desde: 41 },
  { titulo: "Nivel 7 · Situaciones no normales y factores humanos", desde: 51 },
  { titulo: "Nivel 8 · Práctica y repaso", desde: 62 },
]

/**
 * Total de lecciones: 68 capítulos y el repaso de las 50 frases. Va fijo y no
 * importado para que la tarjeta del hub no arrastre el contenido entero;
 * `leccionesConteo.test.ts` lo compara con el contenido y con la migración.
 */
export const CM_LECTURA_TOTAL = 69

// ─── Resumen del avance ──────────────────────────────────────────────────────

export interface ComunicacionesResumen {
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
 * Resume el avance del módulo, como `resumirAeropuertos`: las tres partes
 * pesan igual, porque leer sin practicar ni evaluarse no es tener el tema.
 */
export function resumirComunicaciones(p: {
  lessonScreens: number[]
  practiceDone: string[]
  bestScore: number | null
}): ComunicacionesResumen {
  const leidas = new Set(p.lessonScreens.filter((n) => n >= 1 && n <= CM_LECTURA_TOTAL))
  const lessonRead = Math.min(leidas.size, CM_LECTURA_TOTAL)
  const practiceDone = Math.min(new Set(p.practiceDone).size, CM_PRACTICA_CONTEO)
  const best = p.bestScore
  const passed = best !== null && best >= CM_PASS_SCORE

  const lessonPct = Math.round((lessonRead / CM_LECTURA_TOTAL) * 100)
  const practicePct = Math.round((practiceDone / CM_PRACTICA_CONTEO) * 100)
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
 * Lo de la base vive en `comunicacionesProgress.ts`, que trae el cliente de
 * Supabase detrás. Aquí no, porque este archivo lo carga Ingreso a aerolínea.
 */
const LS_KEY = "aviatory.comunicaciones.progress"

export interface ComunicacionesProgreso {
  /** Números de lección leída, 1 a CM_LECTURA_TOTAL. */
  lessonScreens: number[]
  /** Claves de práctica resueltas, las de `claveEjercicioCm`. */
  practiceDone: string[]
  /** Mejor puntaje de la evaluación en este navegador, o null. */
  bestScore: number | null
}

const VACIO: ComunicacionesProgreso = { lessonScreens: [], practiceDone: [], bestScore: null }

export function readComunicacionesLocal(): ComunicacionesProgreso {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return { ...VACIO }
    const p = JSON.parse(raw) as Partial<ComunicacionesProgreso>
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
export function writeComunicacionesLocal(lessonScreens: number[]): void {
  escribir({ ...readComunicacionesLocal(), lessonScreens })
}

/** Y al revés: guarda lo practicado sin pisar lo leído. */
export function writeComunicacionesPracticas(practiceDone: string[]): void {
  escribir({ ...readComunicacionesLocal(), practiceDone })
}

/** Y el mejor puntaje de la evaluación, sin pisar lo demás. */
export function writeComunicacionesMejor(bestScore: number): void {
  const antes = readComunicacionesLocal().bestScore
  escribir({ ...readComunicacionesLocal(), bestScore: antes === null ? bestScore : Math.max(antes, bestScore) })
}

function escribir(p: ComunicacionesProgreso): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(p))
  } catch {
    /* localStorage bloqueado (incógnito): el avance queda en memoria */
  }
}
