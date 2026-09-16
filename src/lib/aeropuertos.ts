/**
 * Módulo Aeropuertos: los datos que comparten el lector, el catálogo y la
 * tarjeta de «Ingreso a aerolínea».
 *
 * Aquí solo vive lo que es dato: rutas, niveles, totales y el respaldo local del
 * avance. El contenido está en aeropuertosLeccion/.
 *
 * Es un módulo **visual**: el texto de cada lección cabe en unas 150 palabras y
 * lo que enseña son las imágenes. Por eso las lecciones llevan muchos huecos
 * rotulados mientras Camilo va generando las fotos.
 *
 * La norma es **solo OACI**: Anexo 14, Volumen I, 9.ª edición (2022) con la
 * Enmienda 18, aplicable desde el 27 de noviembre de 2025. Ni FAA ni RAC como
 * base; lo nacional solo se nombra cuando es una diferencia real.
 */

import type { LectorNivel } from "@/components/lesson/LectorLeccion"
import { AP_PRACTICA_CONTEO } from "@/lib/aeropuertosConteo"

/** Nombre del módulo, tal como aparece en la miga del lector. */
export const AP_TITULO = "Aeropuertos"

/** Las fuentes normativas, en una línea. */
export const AP_FUENTES = "Anexo 14 Vol. I y Anexo 4 de la OACI"

/**
 * Edición de la que sale el material, a la vista y no en una nota al pie: la
 * Enmienda 18 cambió cosas que todavía no están en los libros de estudio.
 */
export const AP_VIGENCIA = "Anexo 14 Vol. I · 9.ª edición (2022), Enmienda 18"

/** Ruta del módulo. */
export const AP_HUB = "/app/aerolinea/aeropuertos"
/** La lección, con el lector genérico. */
export const AP_APRENDE = `${AP_HUB}/aprende`
/** El catálogo visual: todas las señales, letreros, luces y balizas. */
export const AP_CATALOGO = `${AP_HUB}/catalogo`
/** La práctica: reconocer lo que se ve, decidir lo que se hace. */
export const AP_PRACTICA = `${AP_HUB}/practica`
/** La evaluación, con el banco en el servidor. */
export const AP_EVALUACION = `${AP_HUB}/evaluacion`

/**
 * El violeta del módulo, para las pantallas que no son el lector.
 *
 * Dentro del lector el acento lo pone el tema `.lector-notam.lector-ap`; fuera
 * de él no hay tema que aplicar, así que el valor vive aquí una sola vez y no
 * escrito a mano en cada pantalla.
 */
export const AP_ACENTO = "#6B4FD8"

/** Preguntas por intento de la evaluación. Quien sortea es el servidor. */
export const AP_EXAM_PER_ATTEMPT = 25

/** Mínimo de aprobación de la evaluación, sobre 100. Quien califica es el servidor. */
export const AP_PASS_SCORE = 80

/** Los cinco niveles, con el número de su primera lección. */
export const AP_NIVELES: LectorNivel[] = [
  { titulo: "Nivel 1 · Cómo se lee un aeropuerto", desde: 1 },
  { titulo: "Nivel 2 · Lo pintado en el suelo", desde: 5 },
  { titulo: "Nivel 3 · Letreros y balizas", desde: 9 },
  { titulo: "Nivel 4 · Luces", desde: 13 },
  { titulo: "Nivel 5 · Operar", desde: 18 },
]

/**
 * Total de lecciones. Va fijo y no importado para que la tarjeta del hub no
 * arrastre el contenido entero; `leccionesConteo.test.ts` lo compara.
 */
export const AP_LECTURA_TOTAL = 22

// ─── Resumen del avance ──────────────────────────────────────────────────────

export interface AeropuertosResumen {
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
 * Las tres partes pesan igual, como en los demás módulos: mirarse las
 * veintidós lecciones sin practicar ni evaluarse no es tener el tema hecho.
 */
export function resumirAeropuertos(p: {
  lessonScreens: number[]
  practiceDone: string[]
  bestScore: number | null
}): AeropuertosResumen {
  const leidas = p.lessonScreens.filter((n) => n >= 1 && n <= AP_LECTURA_TOTAL)
  const lessonRead = Math.min(leidas.length, AP_LECTURA_TOTAL)
  const practiceDone = Math.min(p.practiceDone.length, AP_PRACTICA_CONTEO)
  const best = p.bestScore
  const passed = best !== null && best >= AP_PASS_SCORE

  const lessonPct = Math.round((lessonRead / AP_LECTURA_TOTAL) * 100)
  const practicePct = Math.round((practiceDone / AP_PRACTICA_CONTEO) * 100)
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
 * Lo de la base vive en `aeropuertosProgress.ts`, que trae el cliente de
 * Supabase detrás. Aquí no, porque este archivo lo carga el panel.
 */
const LS_KEY = "aviatory.aeropuertos.progress"

export interface AeropuertosProgreso {
  /** Números de lección leída, 1 a AP_LECTURA_TOTAL. */
  lessonScreens: number[]
  /**
   * Claves de los ejercicios de práctica ya resueltos. Salen de
   * `claveReconoce`, `claveDecide` y `claveCambio` (lib/aeropuertosPractica),
   * nunca escritas a mano, para que el día que esto suba a la base las claves
   * ya cuadren con el catálogo.
   */
  practiceDone: string[]
  /** Mejor puntaje de la evaluación, 0 a 100. `null` si todavía no la ha presentado. */
  bestScore: number | null
}

const VACIO: AeropuertosProgreso = { lessonScreens: [], practiceDone: [], bestScore: null }

export function readAeropuertosLocal(): AeropuertosProgreso {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return { ...VACIO }
    const p = JSON.parse(raw) as Partial<AeropuertosProgreso>
    return {
      lessonScreens: Array.isArray(p.lessonScreens) ? p.lessonScreens : [],
      practiceDone: Array.isArray(p.practiceDone) ? p.practiceDone : [],
      bestScore: typeof p.bestScore === "number" ? p.bestScore : null,
    }
  } catch {
    return { ...VACIO }
  }
}

/**
 * Guarda lo leído sin pisar lo practicado: el lector solo conoce las
 * lecciones, así que lo demás se conserva tal como estaba.
 */
export function writeAeropuertosLocal(lessonScreens: number[]): void {
  escribir({ ...readAeropuertosLocal(), lessonScreens })
}

/** Y al revés: guarda lo practicado sin pisar lo leído. */
export function writeAeropuertosPracticas(practiceDone: string[]): void {
  escribir({ ...readAeropuertosLocal(), practiceDone })
}

/**
 * Respaldo local del mejor puntaje de la evaluación.
 *
 * Mientras el módulo no tenga tabla de intentos, este es el único sitio donde
 * la nota sobrevive a una recarga. Cuando la tabla exista sigue sirviendo: el
 * historial toma el máximo entre la nube y esto.
 */
export function writeAeropuertosMejor(bestScore: number): void {
  escribir({ ...readAeropuertosLocal(), bestScore })
}

function escribir(p: AeropuertosProgreso): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(p))
  } catch {
    /* localStorage bloqueado (incógnito): el avance queda en memoria */
  }
}

