/**
 * Inglés ICAO: el vocabulario, las preguntas de entrevista y el perfil con el
 * que se personalizan las respuestas sugeridas.
 *
 * El quiz corregido en el servidor no está aquí: vive en `services/icaoQuiz.ts`
 * porque va por su propia función de la base.
 */

import { supabase } from "@/integrations/supabase/client"
import { reportarError } from "@/lib/errores"
import type { InterviewPilot } from "@/lib/personalizeInterview"

export type VocabCategory =
  | "aircraft"
  | "airport"
  | "navigation"
  | "flight_ops"
  | "weather"
  | "health"
  | "security"
  | "non_routine"

export interface VocabEntry {
  id: number
  term_en: string
  translation_es: string
  definition: string
  category: VocabCategory
}

export interface InterviewQuestion {
  id: number
  slug: string
  question_text: string
  intent: string | null
  expected_topics: string[]
  follow_ups: string[]
  ideal_duration_seconds: number
  order_index: number
}

/**
 * Cuántos términos trae el glosario. Con el volumen actual entra completo; el
 * filtrado y la paginación de la pantalla son sobre lo que ya está en memoria.
 */
export const LIMITE_VOCABULARIO = 1000

/** El glosario activo, en orden alfabético. Lista vacía si algo falla. */
export async function traerVocabulario(): Promise<VocabEntry[]> {
  const { data, error } = await supabase
    .from("icao_vocabulary")
    .select("id,term_en,translation_es,definition,category")
    .eq("is_active", true)
    .order("term_en", { ascending: true })
    .limit(LIMITE_VOCABULARIO)
  if (error) {
    reportarError("vocabulario ICAO", error)
    return []
  }
  return (data ?? []) as VocabEntry[]
}

/**
 * Las preguntas de una categoría del simulador de entrevista.
 *
 * `expected_topics` y `follow_ups` son columnas JSON: si llegan con otra forma
 * se dejan vacías en vez de reventar la pantalla.
 */
export async function traerPreguntasDeEntrevista(slugCategoria: string): Promise<InterviewQuestion[]> {
  const categoria = await supabase
    .from("interview_sim_categories")
    .select("id")
    .eq("slug", slugCategoria)
    .maybeSingle()
  const fila = categoria.data as { id: number } | null
  if (!fila) return []

  const preguntas = await supabase
    .from("interview_sim_questions")
    .select("id,slug,question_text,intent,expected_topics,follow_ups,ideal_duration_seconds,order_index")
    .eq("category_id", fila.id)
    .eq("is_active", true)
    .order("order_index", { ascending: true })
  if (preguntas.error) {
    reportarError("entrevista: preguntas", preguntas.error)
    return []
  }
  return (preguntas.data ?? []).map((row) => ({
    ...row,
    expected_topics: Array.isArray(row.expected_topics) ? (row.expected_topics as string[]) : [],
    follow_ups: Array.isArray(row.follow_ups) ? (row.follow_ups as string[]) : [],
  })) as InterviewQuestion[]
}

/**
 * El perfil con el que se personalizan las respuestas sugeridas de la
 * entrevista. `null` cuando no hay fila: entonces las respuestas quedan
 * genéricas, que es mejor que inventarle horas a nadie.
 */
export async function traerPilotoParaEntrevista(userId: string): Promise<InterviewPilot | null> {
  const { data } = await supabase
    .from("pilot_state")
    .select("stage, total_hours, hours_pic, target_airline, licenses, country")
    .eq("user_id", userId)
    .maybeSingle()
  if (!data) return null

  const p = data as {
    stage?: InterviewPilot["stage"]
    total_hours?: number
    hours_pic?: number
    target_airline?: string
    licenses?: string[]
    country?: string
  }
  return {
    stage: p.stage ?? null,
    totalHours: p.total_hours ?? null,
    hoursPic: p.hours_pic ?? null,
    targetAirline: p.target_airline ?? null,
    licenses: p.licenses ?? null,
    country: p.country ?? null,
  }
}
