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
 *   3. Practica     → REAL_NOTAMS (capturas reales) + EXERCISES (texto)
 *   4. Evaluación   → en el servidor (contenido/bancos/notam_evaluacion.json)
 *
 * Solo lo importan las pantallas de la sección NOTAM (ESLint lo exige): con la
 * lección pesa unos 400 KB. Nivel, progreso local, conteos, datos
 * de la evaluación y resumen de avance están en notamComun.ts; los NOTAM
 * nacionales de la lección, en notamNacionales.ts.
 */

import codesRaw from "@/data/notam/notam_codes.json"
import exercisesRaw from "@/data/notam/ejercicios_interpretacion.json"
import realesRaw from "@/data/notam/notams_reales.json"
import { deepPlain, NOTAM_TOTALES, type NotamLevel } from "@/lib/notamComun"
import { LESSON_TOTAL } from "@/lib/notamLesson"
import { NATIONAL_NOTAMS } from "@/lib/notamNacionales"

// ─── Tipos ───────────────────────────────────────────────────────────────────

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
  /** Sale de uno de los 31 NOTAM reales de notams_reales.json */
  | "real_notam"
  | "oficial_doc8400"
  | "bibliografia_real_historico"

/** Qué se le pide interpretar al usuario en ese ejercicio. */
export type ExerciseKind =
  | "significado"
  | "elemento"
  | "vigencia"
  | "casilla"
  | "restriccion"
  | "piloto"
  | "lectura"

export interface NotamExercise {
  id: number
  origen: ExerciseOrigin
  tipo: ExerciseKind
  /** Etiqueta corta del tipo, ya traducida en el JSON */
  tipo_label: string
  nivel: NotamLevel
  titulo: string
  /** Id de la ficha de notams_reales.json de la que sale, si sale de una */
  notam_ref: string | null
  lugar: string | null
  pais: string | null
  /** Texto crudo del NOTAM (respeta los saltos de línea al renderizar) */
  notam: string
  consigna: string
  respuesta_modelo: string
  puntos_clave: string[]
  errores_tipicos?: string[]
  fuente: string
}

/**
 * Un NOTAM real con su captura.
 *
 * La imagen NO se convierte ni se recorta: es el PNG que devolvió el buscador
 * oficial, copiado tal cual. Esa captura es la prueba de que el aviso existió, y
 * recomprimirla le quitaría exactamente eso.
 */
export interface RealNotam {
  id: string
  /** Ruta relativa dentro de public/notams/; usar realNotamImageUrl() */
  imagen: string
  identificacion: string
  aerodromo: string
  pais: string
  fir: string
  asunto: string
  nivel: NotamLevel
  /** Transcripción del texto OACI: alt-text, búsqueda y evaluación sin OCR */
  transcripcion: string
  decodificacion: string
  puntos_clave: string[]
  fuente_imagen: string
}

/** Criterio de la rúbrica de evaluación de respuestas abiertas. */
export interface RubricCriterion {
  key: string
  label: string
  peso: number
  descripcion: string
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

/** Los 31 NOTAM reales del modo práctica, con su captura. */
export const REAL_NOTAMS = deepPlain(realesRaw.notams as RealNotam[])
export const REAL_META = deepPlain(realesRaw.meta)

export const TOTALS = {
  subjects: Object.keys(SUBJECT_CODES).length,
  statuses: Object.keys(STATUS_CODES).length,
  exercises: EXERCISES.length,
  national: NATIONAL_NOTAMS.length,
  /** NOTAM reales del modo práctica: los de la columna izquierda. */
  reales: REAL_NOTAMS.length,
  /** Preguntas del banco de la evaluación, que vive en el servidor. */
  examQuestions: NOTAM_TOTALES.examQuestions,
  // Derivado, no fijo: si se agrega o se reordena una sección de la lección, el
  // denominador del progreso del hub tiene que moverse con ella.
  lessonScreens: LESSON_TOTAL,
} as const

// ─── Avisos obligatorios en pantalla (reglas de producto del paquete) ────────

export const DISCLAIMERS = {
  /** Los ejercicios de texto salen todos de NOTAM reales; ya no hay ninguno inventado. */
  practice: EXERCISE_META.aviso_obligatorio_en_pantalla as string,
  /** Las 31 capturas reales del modo práctica. */
  reales: REAL_META.aviso_obligatorio_en_pantalla as string,
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

/**
 * URL de la captura de un NOTAM real.
 *
 * Aquí sí se respeta la subcarpeta: las capturas viven en
 * public/notams/practica/ y la ficha guarda "practica/<archivo>.png".
 */
export function realNotamImageUrl(rel: string): string {
  return `/notams/${rel.replace(/^\/+/, "")}`
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


/** Etiqueta de procedencia de cada ejercicio, para mostrar la fuente sin ambigüedad. */
export const ORIGIN_META: Record<ExerciseOrigin, { label: string; real: boolean }> = {
  real_notam: { label: "NOTAM real", real: true },
  oficial_doc8400: { label: "Ejemplo oficial · Doc 8400", real: true },
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

