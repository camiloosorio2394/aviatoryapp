/**
 * Los intentos de evaluación de los módulos: NOTAM, Meteorología y Mercancías.
 *
 * Cada módulo tiene su tabla y sus columnas (unas guardan `created_at` y otras
 * `taken_at`, unas el aprobado y otras lo deducen del puntaje), así que lo que
 * se comparte es el patrón: una página reciente para la lista y **el máximo
 * histórico aparte**, porque con más de diez intentos el mejor puede quedar
 * fuera de la página.
 */

import { supabase } from "@/integrations/supabase/client"
import { reportarError } from "@/lib/errores"

export type TablaDeIntentos =
  | "user_notam_exam_attempts"
  | "user_metar_exam_attempts"
  | "user_mercancias_exam_attempts"

/** Cuántos intentos trae la lista del historial. */
export const INTENTOS_EN_LA_LISTA = 10

export interface FilaIntentoNotam {
  id: string
  score: number
  correct_count: number
  total_questions: number
  passed: boolean
  duration_seconds: number | null
  created_at: string
}

export interface FilaIntentoMercancias {
  id: string
  score: number
  correct: number
  total: number
  taken_at: string
}

export interface Historial<Fila> {
  filas: Fila[]
  /** Total de intentos del piloto, no solo los de esta página. */
  cuantos: number
  /** El máximo histórico. `null` si todavía no ha presentado. */
  mejor: number | null
}

/**
 * El mejor puntaje del piloto en un módulo.
 *
 * Devuelve también el error porque las pantallas lo tratan distinto: la de
 * Meteorología sigue con su respaldo local, la de NOTAM para.
 */
export async function traerMejorPuntaje(
  tabla: TablaDeIntentos,
  userId: string,
): Promise<{ mejor: number | null; error: { message: string } | null }> {
  const { data, error } = await supabase
    .from(tabla)
    .select("score")
    .eq("user_id", userId)
    .order("score", { ascending: false })
    .limit(1)
  const puntaje = ((data ?? []) as { score?: unknown }[])[0]?.score
  return { mejor: typeof puntaje === "number" ? puntaje : null, error }
}

/**
 * Los últimos intentos más el máximo histórico, en dos consultas.
 * `null` cuando la lista falla; el fallo ya quedó reportado.
 */
async function traerHistorial<Fila>(
  tabla: TablaDeIntentos,
  columnas: string,
  ordenarPor: string,
  userId: string,
  contexto: string,
): Promise<Historial<Fila> | null> {
  const [listaRes, mejorRes] = await Promise.all([
    supabase
      .from(tabla)
      .select(columnas, { count: "exact" })
      .eq("user_id", userId)
      .order(ordenarPor, { ascending: false })
      .limit(INTENTOS_EN_LA_LISTA),
    traerMejorPuntaje(tabla, userId),
  ])
  if (listaRes.error) {
    reportarError(contexto, listaRes.error)
    return null
  }
  const filas = (listaRes.data ?? []) as Fila[]
  return { filas, cuantos: listaRes.count ?? filas.length, mejor: mejorRes.mejor }
}

export function traerHistorialNotam(userId: string): Promise<Historial<FilaIntentoNotam> | null> {
  return traerHistorial<FilaIntentoNotam>(
    "user_notam_exam_attempts",
    "id,score,correct_count,total_questions,passed,duration_seconds,created_at",
    "created_at",
    userId,
    "NOTAM: historial de evaluación",
  )
}

export function traerHistorialMercancias(userId: string): Promise<Historial<FilaIntentoMercancias> | null> {
  return traerHistorial<FilaIntentoMercancias>(
    "user_mercancias_exam_attempts",
    "id,score,correct,total,taken_at",
    "taken_at",
    userId,
    "mercancías: historial de evaluación",
  )
}
