/**
 * Lo del tema NOTAM que se usa fuera de su sección: nivel, progreso local,
 * conteos, datos de la evaluación, normalización de texto y el resumen de
 * avance. Sin contenido.
 *
 * notam.ts carga los JSON del tema y la lección (unos 400 KB). Importarlo para
 * un conteo metía todo eso en la pantalla que lo pedía: el Dashboard, Ingreso a
 * aerolínea, la Biblioteca, los exámenes. Los conteos que salen del contenido
 * pesado van fijos y notamComun.test.ts los compara con los datos, así que no se
 * desalinean; los de la evaluación salen de su JSON, que pesa 1 KB.
 * ESLint no deja importar @/lib/notam fuera de sus pantallas.
 */

import examRaw from "@/data/notam/evaluacion_notam.json"

// ─── Normalización de texto ──────────────────────────────────────────────────

/**
 * Reemplaza el guion largo por dos puntos.
 *
 * El paquete de contenido usa "—" como separador ("PAPI inoperativo — Rionegro",
 * "Doc 8400, pág. 7-3 — decodificado en el propio documento"). En Aviatory el
 * guion largo no se muestra nunca, así que se limpia UNA vez acá, en el origen,
 * en lugar de que cada pantalla arme su propio helper y el mismo texto salga
 * distinto según la página.
 */
export function plainText(value: string): string {
  return value.replace(/\s*—\s*/g, ": ")
}

/** Aplica plainText a todos los strings de una estructura, sin mutar el original. */
export function deepPlain<T>(value: T): T {
  if (typeof value === "string") return plainText(value) as unknown as T
  if (Array.isArray(value)) return value.map((v) => deepPlain(v)) as unknown as T
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = deepPlain(v)
    }
    return out as T
  }
  return value
}

export type NotamLevel = "basico" | "intermedio" | "avanzado"

/** Etiqueta y color de nivel, alineados con los tokens del sistema. */
export const LEVEL_META: Record<NotamLevel, { label: string; color: string }> = {
  basico: { label: "Básico", color: "var(--av-green-400)" },
  intermedio: { label: "Intermedio", color: "var(--av-blue-500)" },
  avanzado: { label: "Avanzado", color: "var(--av-amber-400)" },
}

export const NOTAM_TOTALES = {
  /** Secciones de la lección (LESSON_SCREENS). */
  lessonScreens: 9,
  /** Lectura estimada de la lección entera, en minutos (LESSON_MINUTES). */
  lessonMinutes: 58,
  /** NOTAM reales del modo práctica. */
  reales: 31,
  /** Ejercicios de texto del modo práctica. */
  exercises: 100,
  /** Preguntas del banco de la evaluación, que vive en el servidor. */
  examQuestions: examRaw.meta.total as number,
} as const

/** Puntaje mínimo de aprobación de la evaluación (sobre 100). */
export const EXAM_PASS_SCORE = examRaw.meta.calificacion.aprobacion as number

/**
 * Cuántas preguntas entran en UN intento.
 *
 * El banco tiene 100 y el examen toma 25 al azar, así que hay dos números
 * distintos que no se pueden confundir: NOTAM_TOTALES.examQuestions es el banco
 * completo y este es lo que la persona responde de verdad.
 */
export const EXAM_PER_ATTEMPT = examRaw.meta.por_intento as number

/** Aviso obligatorio en la evaluación: preguntas de práctica, no oficiales de Aerocivil ni OACI. */
export const AVISO_EVALUACION = plainText(examRaw.meta.aviso_en_pantalla as string)

/**
 * Claves de progreso de la práctica. Las usan la pantalla y el catálogo del
 * servidor (contenido/catalogo/modulos.json), que solo acepta claves que existen.
 * Prefijos nuevos porque los bancos se rehicieron: un "ex-7" viejo ya no señala
 * al mismo ejercicio.
 */
export const claveEjercicioNotam = (id: number) => `txt-${id}`
export const claveNotamReal = (id: string) => `real-${id}`

/** Denominador de la práctica: NOTAM reales más ejercicios de texto. */
export const NOTAM_PRACTICE_TOTAL = NOTAM_TOTALES.reales + NOTAM_TOTALES.exercises

export interface NotamResumen {
  lessonRead: number
  practiceDone: number
  best: number | null
  passed: boolean
  lessonPct: number
  practicePct: number
  examPct: number
  /** Avance del tema completo, 0 a 100. */
  overall: number
  /** Todavía no tocó nada del tema. */
  empty: boolean
}

/**
 * Resume el avance del tema NOTAM.
 *
 * Vive aquí y no dentro del hub porque lo consumen varias pantallas: el hub de
 * NOTAM, la lista de temas de Ingreso a aerolínea y la Biblioteca. Con la cuenta
 * duplicada, la misma persona veía porcentajes distintos según por dónde entrara.
 */
export function resumirNotam(progreso: {
  lessonScreens: number[]
  practiceDone: string[]
  bestExamScore: number | null
}): NotamResumen {
  const lessonRead = Math.min(progreso.lessonScreens.length, NOTAM_TOTALES.lessonScreens)
  const practiceDone = Math.min(progreso.practiceDone.length, NOTAM_PRACTICE_TOTAL)
  const best = progreso.bestExamScore
  const passed = best !== null && best >= EXAM_PASS_SCORE

  const lessonPct = Math.round((lessonRead / NOTAM_TOTALES.lessonScreens) * 100)
  const practicePct = Math.round((practiceDone / NOTAM_PRACTICE_TOTAL) * 100)
  // La evaluacion aporta tu mejor puntaje; si ya aprobaste, aporta el 100 por ciento.
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

// ─── Progreso local (respaldo offline del progreso en DB) ────────────────────

const LS_KEY = "aviatory.notam.progress"

export interface NotamLocalProgress {
  lessonScreens: number[]
  exercisesDone: string[]
  bestExamScore: number | null
}

const EMPTY_PROGRESS: NotamLocalProgress = {
  lessonScreens: [],
  exercisesDone: [],
  bestExamScore: null,
}

export function readLocalProgress(): NotamLocalProgress {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return EMPTY_PROGRESS
    const parsed = JSON.parse(raw) as Partial<NotamLocalProgress>
    return {
      lessonScreens: Array.isArray(parsed.lessonScreens) ? parsed.lessonScreens : [],
      exercisesDone: Array.isArray(parsed.exercisesDone) ? parsed.exercisesDone : [],
      bestExamScore: typeof parsed.bestExamScore === "number" ? parsed.bestExamScore : null,
    }
  } catch {
    return EMPTY_PROGRESS
  }
}

export function writeLocalProgress(patch: Partial<NotamLocalProgress>): NotamLocalProgress {
  const next = { ...readLocalProgress(), ...patch }
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(next))
  } catch {
    /* localStorage puede estar bloqueado (incógnito): el progreso queda solo en memoria */
  }
  return next
}
