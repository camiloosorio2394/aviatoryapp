/**
 * Módulo NOTAM — capa de datos y helpers.
 *
 * Contenido verificado contra el Doc 8400 de la OACI (PANS-ABC, 6ª ed., 2004),
 * complementado con bibliografía de curso y los resúmenes mensuales de NOTAM
 * vigentes de la Aerocivil (DRT, corte 29 JUL 2026).
 *
 * Estructura de la sección:
 *   1. Aprende      → LESSON_SCREENS (notamLesson.ts)
 *   2. Decodificador → SUBJECT_CODES + STATUS_CODES + decodeQ()
 *   3. Practica     → EXERCISES (texto) + NATIONAL_NOTAMS (imágenes reales)
 *   4. Evaluación   → EXAM_QUESTIONS
 */

import codesRaw from "@/data/notam/notam_codes.json"
import exercisesRaw from "@/data/notam/ejercicios_interpretacion.json"
import examRaw from "@/data/notam/evaluacion_notam.json"
import nationalRaw from "@/data/notam/notams_nacionales.json"

// ─── Tipos ───────────────────────────────────────────────────────────────────

export type NotamLevel = "basico" | "intermedio" | "avanzado"

export interface SubjectCode {
  /** Significado normativo del asunto (2ª/3ª letras) */
  significado: string
  /** Fraseología abreviada uniforme para la casilla E) */
  fraseologia: string
  /** AGA · COM · RAC · Avisos para la navegación · Otras informaciones */
  seccion: string
  subseccion: string
}

export interface StatusCode {
  /** Significado normativo del estado (4ª/5ª letras) */
  significado: string
  fraseologia: string
  /** Disponibilidad (A) · Cambios (C) · Condiciones de peligro (H) · Limitaciones (L) · Otros (XX) */
  categoria: string
  /** Errata documentada de la edición en español 2004, si aplica */
  nota?: string
}

export interface OfficialExample {
  id: string
  descripcion: string
  notam: Record<string, string>
  decodificacion: Record<string, string>
  fuente: string
}

export type ExerciseOrigin =
  | "oficial_doc8400"
  | "practica_no_oficial"
  | "bibliografia_real_historico"

export interface NotamExercise {
  id: number
  origen: ExerciseOrigin
  nivel: NotamLevel
  titulo: string
  /** Texto crudo del NOTAM (respeta los saltos de línea al renderizar) */
  notam: string
  consigna: string
  respuesta_modelo: string
  puntos_clave: string[]
  errores_tipicos?: string[]
  fuente: string
}

export interface NationalNotam {
  id: string
  /** Ruta original del paquete de contenido; usar notamImageUrl() para la URL servible */
  imagen: string
  serie_numero: string
  aerodromo: string
  nivel: NotamLevel
  /** Transcripción del recorte: alt-text, búsqueda y evaluación sin OCR */
  transcripcion: string
  decodificacion: string
  puntos_clave: string[]
  errores_tipicos?: string[]
  fuente_imagen: string
}

export interface ExamQuestion {
  id: number
  nivel: NotamLevel
  pregunta: string
  opciones: string[]
  /** Índice en el array original. Al barajar hay que remapearlo. */
  correcta: number
  explicacion: string
  referencia: string
}

/** Criterio de la rúbrica de evaluación de respuestas abiertas. */
export interface RubricCriterion {
  key: string
  label: string
  peso: number
  descripcion: string
}

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
function deepPlain<T>(value: T): T {
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

/**
 * Color legible para texto chico pintado con un token --av-*.
 *
 * Los tokens --av-*-400 son claros a propósito (sirven para iconos y barras),
 * así que como color de texto sobre una superficie blanca dan un contraste de
 * ~2:1 y quedan ilegibles en modo claro. Mezclarlos con --foreground los baja
 * a un contraste usable sin perder la identidad del color, y funciona igual en
 * claro y en oscuro porque --foreground se invierte con el tema.
 */
export function accentText(token: string, mix = 62): string {
  return `color-mix(in oklab, ${token} ${mix}%, var(--foreground))`
}

// ─── Datos ───────────────────────────────────────────────────────────────────

export const SUBJECT_CODES = deepPlain(
  codesRaw.segunda_tercera_letras as Record<string, SubjectCode>
)
export const STATUS_CODES = deepPlain(codesRaw.cuarta_quinta_letras as Record<string, StatusCode>)
// El JSON infiere claves opcionales distintas por ejemplo (unos traen F/G, otros no),
// así que el cast directo a Record<string, string> no pasa el typecheck.
export const OFFICIAL_EXAMPLES = deepPlain(
  codesRaw.ejemplos_oficiales as unknown as OfficialExample[]
)
export const CODE_META = deepPlain(codesRaw.meta)
export const SPECIAL_RULES = CODE_META.reglas_especiales

export const EXERCISES = deepPlain(exercisesRaw.ejercicios as NotamExercise[])
export const EXERCISE_META = deepPlain(exercisesRaw.meta)
export const EXAM_QUESTIONS = deepPlain(examRaw.preguntas as ExamQuestion[])
export const EXAM_META = deepPlain(examRaw.meta)
export const NATIONAL_NOTAMS = deepPlain(nationalRaw.notams as NationalNotam[])
export const NATIONAL_META = deepPlain(nationalRaw.meta)

export const TOTALS = {
  subjects: Object.keys(SUBJECT_CODES).length,
  statuses: Object.keys(STATUS_CODES).length,
  exercises: EXERCISES.length,
  national: NATIONAL_NOTAMS.length,
  examQuestions: EXAM_QUESTIONS.length,
  lessonScreens: 9,
} as const

/** Puntaje mínimo de aprobación de la evaluación (sobre 100). */
export const EXAM_PASS_SCORE = EXAM_META.calificacion.aprobacion as number
export const EXAM_POINTS_PER_QUESTION = EXAM_META.calificacion.puntaje_por_pregunta as number

// ─── Avisos obligatorios en pantalla (reglas de producto del paquete) ────────

export const DISCLAIMERS = {
  /** Ejercicios de práctica redactados para Aviatory: no son NOTAM reales. */
  practice: EXERCISE_META.aviso_obligatorio_en_pantalla as string,
  /** NOTAM colombianos reales usados como material de estudio (vigencia expirada). */
  national: NATIONAL_META.aviso_obligatorio_en_pantalla as string,
  /** Preguntas de práctica, no oficiales de Aerocivil ni OACI. */
  exam: EXAM_META.aviso_en_pantalla as string,
  /** El Doc 8400 cargado es la 6ª ed. (2004); existen ediciones posteriores. */
  edition: CODE_META.advertencia_vigencia as string,
} as const

// ─── Rúbrica de respuestas abiertas ──────────────────────────────────────────

export const RUBRIC: RubricCriterion[] = Object.entries(
  EXERCISE_META.criterios_rubrica_default as Record<string, { peso: number; descripcion: string }>
).map(([key, v]) => ({
  key,
  label: key.charAt(0).toUpperCase() + key.slice(1),
  peso: v.peso,
  descripcion: v.descripcion,
}))

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** URL servible de la imagen de un NOTAM nacional (los PNG viven en /public/notams). */
export function notamImageUrl(rel: string): string {
  return `/notams/${rel.split("/").pop()}`
}

export interface DecodedQ {
  input: string
  /** Código normalizado de 5 letras, si la entrada es interpretable */
  code: string | null
  subjectKey: string | null
  subject: SubjectCode | null
  statusKey: string | null
  status: StatusCode | null
  /** Regla especial detectada: checklist (QKKKK), trigger (TT), lenguaje claro (XX) */
  special: "checklist" | "trigger" | "plain_subject" | "plain_status" | null
  /** Mensaje explicativo cuando el código no resuelve o cae en una regla especial */
  note: string | null
  valid: boolean
}

/**
 * Decodifica un código NOTAM de 5 letras (QNVAS, QMRLC, …).
 * Tolera minúsculas, espacios y que el usuario omita la Q inicial.
 */
export function decodeQ(input: string): DecodedQ {
  const clean = input.trim().toUpperCase().replace(/[^A-Z]/g, "")
  const empty: DecodedQ = {
    input,
    code: null,
    subjectKey: null,
    subject: null,
    statusKey: null,
    status: null,
    special: null,
    note: null,
    valid: false,
  }

  if (clean.length < 4) return empty

  // Acepta "QNVAS" o "NVAS" (sin la Q fija)
  const body = clean.startsWith("Q") ? clean.slice(1, 5) : clean.slice(0, 4)
  if (body.length < 4) return empty

  const code = `Q${body}`
  const subjectKey = body.slice(0, 2)
  const statusKey = body.slice(2, 4)

  if (body === "KKKK") {
    return {
      ...empty,
      code,
      valid: true,
      special: "checklist",
      note: SPECIAL_RULES.KKKK,
    }
  }

  const subject = SUBJECT_CODES[subjectKey] ?? null
  const status = STATUS_CODES[statusKey] ?? null

  let special: DecodedQ["special"] = null
  let note: string | null = null

  if (statusKey === "TT") {
    special = "trigger"
    note = SPECIAL_RULES.TT
  } else if (subjectKey === "XX") {
    special = "plain_subject"
    note = SPECIAL_RULES.XX_asunto
  } else if (statusKey === "XX") {
    special = "plain_status"
    note = SPECIAL_RULES.XX_estado
  }

  return {
    input,
    code,
    subjectKey,
    subject,
    statusKey,
    status,
    special,
    note,
    valid: Boolean(subject) || Boolean(status) || special !== null,
  }
}

/** Códigos de 4ª/5ª letras que cancelan un NOTAM (Doc 8400 §3.8). */
export const CANCEL_CODES = ["AK", "AL", "AO", "CC", "XX"] as const

export function isCancelCode(statusKey: string): boolean {
  return (CANCEL_CODES as readonly string[]).includes(statusKey.toUpperCase())
}

/**
 * Convierte el grupo fecha/hora de 10 dígitos (AAMMDDHHMM, UTC) a una etiqueta
 * legible con su equivalente en hora de Colombia (UTC−5).
 * Devuelve null si el grupo no tiene el formato esperado (PERM, EST suelto, etc.).
 */
export function formatNotamDateTime(group: string): { utc: string; local: string } | null {
  const g = group.trim()
  if (!/^\d{10}$/.test(g)) return null
  const yy = Number(g.slice(0, 2))
  const mm = Number(g.slice(2, 4))
  const dd = Number(g.slice(4, 6))
  const hh = Number(g.slice(6, 8))
  const mi = Number(g.slice(8, 10))
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31 || hh > 23 || mi > 59) return null

  const utcDate = new Date(Date.UTC(2000 + yy, mm - 1, dd, hh, mi))
  const fmt = (d: Date, tz: string) =>
    d.toLocaleString("es-CO", {
      timeZone: tz,
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })

  return {
    utc: `${fmt(utcDate, "UTC")} UTC`,
    local: `${fmt(utcDate, "America/Bogota")} hora Colombia`,
  }
}

/** Etiqueta y color de nivel, alineados con los tokens del sistema. */
export const LEVEL_META: Record<NotamLevel, { label: string; color: string }> = {
  basico: { label: "Básico", color: "var(--av-green-400)" },
  intermedio: { label: "Intermedio", color: "var(--av-blue-500)" },
  avanzado: { label: "Avanzado", color: "var(--av-amber-400)" },
}

/** Etiqueta de procedencia de cada ejercicio, para mostrar la fuente sin ambigüedad. */
export const ORIGIN_META: Record<ExerciseOrigin, { label: string; real: boolean }> = {
  oficial_doc8400: { label: "Ejemplo oficial · Doc 8400", real: true },
  practica_no_oficial: { label: "Práctica · no es un NOTAM real", real: false },
  bibliografia_real_historico: { label: "NOTAM real histórico", real: true },
}

/**
 * Baraja preservando el índice de la opción correcta.
 * Determinista si se pasa una semilla, para que un intento sea reproducible.
 */
export function shuffle<T>(items: T[], seed?: number): T[] {
  const out = items.slice()
  // xorshift32 se queda pegado en cero si la semilla es cero, de ahí el || 1.
  let s = seed ?? (Math.floor(Math.random() * 2 ** 31) || 1)
  const next = () => {
    // xorshift32: barajado estable y reproducible por semilla.
    // El resultado se normaliza sin signo sobre 2^32: con Math.abs(s)/2^31,
    // el valor -2147483648 devolvía exactamente 1 y el swap escribía fuera
    // del array, dejando una pregunta undefined.
    s ^= s << 13
    s ^= s >>> 17
    s ^= s << 5
    return (s >>> 0) / 2 ** 32
  }
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export interface ShuffledQuestion extends ExamQuestion {
  /** Opciones barajadas */
  shuffledOptions: string[]
  /** Índice de la respuesta correcta DENTRO de shuffledOptions */
  correctIndex: number
}

/** Prepara la evaluación: baraja preguntas y opciones, remapeando la correcta. */
export function buildExam(count?: number, seed?: number): ShuffledQuestion[] {
  const picked = shuffle(EXAM_QUESTIONS, seed).slice(0, count ?? EXAM_QUESTIONS.length)
  return picked.map((q, qi) => {
    const correctText = q.opciones[q.correcta]
    const shuffledOptions = shuffle(q.opciones, seed ? seed + qi + 1 : undefined)
    return {
      ...q,
      shuffledOptions,
      correctIndex: shuffledOptions.indexOf(correctText),
    }
  })
}

/** Glosario mínimo para leer la casilla E) (verificado en el Doc 8400, sección 1). */
export const GLOSSARY: { abbr: string; meaning: string }[] = [
  { abbr: "AD", meaning: "aeródromo" },
  { abbr: "ACFT", meaning: "aeronave" },
  { abbr: "ACT", meaning: "activo" },
  { abbr: "APCH", meaning: "aproximación" },
  { abbr: "APN", meaning: "plataforma" },
  { abbr: "AVBL", meaning: "disponible" },
  { abbr: "BTN", meaning: "entre" },
  { abbr: "CAT", meaning: "categoría" },
  { abbr: "CLSD", meaning: "cerrado" },
  { abbr: "CTN", meaning: "precaución" },
  { abbr: "DLY", meaning: "diariamente" },
  { abbr: "EQPT", meaning: "equipo" },
  { abbr: "EST", meaning: "estimado" },
  { abbr: "EXC", meaning: "excepto" },
  { abbr: "EXER", meaning: "ejercicios / ejercer" },
  { abbr: "FM", meaning: "desde" },
  { abbr: "HGT", meaning: "altura" },
  { abbr: "INSTL", meaning: "instalado" },
  { abbr: "LGT", meaning: "luz" },
  { abbr: "MAINT", meaning: "mantenimiento" },
  { abbr: "NGT", meaning: "noche" },
  { abbr: "NXT", meaning: "siguiente" },
  { abbr: "OBST", meaning: "obstáculo" },
  { abbr: "OPS", meaning: "operaciones" },
  { abbr: "PERM", meaning: "permanente" },
  { abbr: "PRKG", meaning: "estacionamiento" },
  { abbr: "PSN", meaning: "posición" },
  { abbr: "PWR", meaning: "potencia" },
  { abbr: "RWY", meaning: "pista" },
  { abbr: "SKED", meaning: "horario" },
  { abbr: "SN", meaning: "nieve" },
  { abbr: "SR", meaning: "salida del sol" },
  { abbr: "SS", meaning: "puesta del sol" },
  { abbr: "SFC", meaning: "superficie" },
  { abbr: "THR", meaning: "umbral" },
  { abbr: "TIL", meaning: "hasta" },
  { abbr: "TKOF", meaning: "despegue" },
  { abbr: "TWY", meaning: "calle de rodaje" },
  { abbr: "U/S", meaning: "inutilizable" },
  { abbr: "UFN", meaning: "hasta nuevo aviso" },
  { abbr: "VCY", meaning: "inmediaciones" },
  { abbr: "WEF", meaning: "con efecto a partir de" },
  { abbr: "WI", meaning: "dentro de" },
  { abbr: "WIP", meaning: "obras en progreso" },
  { abbr: "TORA", meaning: "recorrido de despegue disponible" },
  { abbr: "TODA", meaning: "distancia de despegue disponible" },
  { abbr: "ASDA", meaning: "distancia de aceleración-parada disponible" },
  { abbr: "LDA", meaning: "distancia de aterrizaje disponible" },
]

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
