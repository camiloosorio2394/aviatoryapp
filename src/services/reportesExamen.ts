/**
 * Exam Tracker: lo que los pilotos reportan de los exámenes de la Aerocivil.
 *
 * Las dos pantallas (la lista de materias y el detalle de una) leen de dos
 * funciones de la base, y el formulario escribe en dos tablas. Aquí vive todo
 * eso; las pantallas solo piden y pintan.
 */

import { supabase } from "@/integrations/supabase/client"
import { reportarError } from "@/lib/errores"

export interface SubjectIntel {
  subject_id: number
  subject_name: string
  subject_slug: string
  total_reports: number
  pass_rate: number | null
  hottest_topic: string | null
}

export interface Topic {
  key: string
  label: string
  count: number
  frequency_pct: number
}

export interface RecentReport {
  exam_date: string
  region: string
  passed: boolean
  difficulty: number | null
  tips: string | null
}

export interface Intel {
  subject_id: number
  subject_name: string
  total_reports: number
  pass_rate: number | null
  avg_difficulty: number | null
  top_topics: Topic[]
  recent_reports: RecentReport[]
}

/** Materia del examen, como la lista el formulario. */
export interface Subject {
  id: number
  name: string
  slug: string
}

/** Tema de una materia, para marcar qué cayó. */
export interface SubjectTopic {
  id: number
  subject_id: number
  key: string
  label: string
}

export interface ReporteNuevo {
  userId: string
  subjectId: number
  examDate: string
  region: string
  passed: boolean
  score: number | null
  difficulty: number
  tips: string | null
  recalledQuestions: string | null
}

/** Resumen de todas las materias, para la portada del Exam Tracker. */
export async function traerIntelDeMaterias(): Promise<{
  materias: SubjectIntel[]
  error: { message: string } | null
}> {
  const { data, error } = await supabase.rpc("get_all_subjects_intel")
  return { materias: (data ?? []) as SubjectIntel[], error }
}

/**
 * `get_subject_intel` a veces devuelve la fila suelta y a veces dentro de un
 * arreglo, según cómo la llame PostgREST. Las dos formas valen.
 */
export function leerIntel(data: unknown): Intel | null {
  const fila = Array.isArray(data) ? data[0] : data
  return (fila as Intel) ?? null
}

/** El detalle de una materia: temas calientes y últimos reportes. */
export async function traerIntelDeMateria(
  slug: string,
): Promise<{ intel: Intel | null; error: { message: string } | null }> {
  const { data, error } = await supabase.rpc("get_subject_intel", { p_subject_slug: slug })
  return { intel: error ? null : leerIntel(data), error }
}

/**
 * Las materias del formulario, en el orden en que se muestran.
 *
 * Si falla se reporta: sin materias el desplegable sale vacío y el piloto no
 * puede enviar su reporte, sin que nada le diga por qué.
 */
export async function traerMaterias(): Promise<Subject[]> {
  const { data, error } = await supabase.from("subjects").select("id, name, slug").order("order_index")
  if (error) {
    reportarError("reporte de examen: materias", error)
    return []
  }
  return (data ?? []) as Subject[]
}

/** Los temas de todas las materias; el formulario filtra por la elegida. */
export async function traerTemas(): Promise<SubjectTopic[]> {
  const { data, error } = await supabase.from("subject_topics").select("*").order("order_index")
  if (error) {
    reportarError("reporte de examen: temas del formulario", error)
    return []
  }
  return (data ?? []) as SubjectTopic[]
}

/**
 * Guarda el reporte y los temas marcados.
 *
 * Si falla el reporte, lanza: la pantalla distingue el tope de publicaciones
 * del resto. Si falla solo lo de los temas, el reporte ya quedó guardado, así
 * que se devuelve `temasGuardados: false` para avisarlo en vez de dar las
 * gracias como si nada.
 */
export async function guardarReporte(
  reporte: ReporteNuevo,
  temas: number[],
): Promise<{ temasGuardados: boolean }> {
  const { data, error } = await supabase
    .from("exam_reports")
    .insert({
      user_id: reporte.userId,
      subject_id: reporte.subjectId,
      exam_date: reporte.examDate,
      region: reporte.region,
      passed: reporte.passed,
      score: reporte.score,
      difficulty: reporte.difficulty,
      tips: reporte.tips,
      recalled_questions: reporte.recalledQuestions,
    })
    .select("id")
    .single()
  if (error) throw error

  if (temas.length === 0) return { temasGuardados: true }

  const reportId = (data as { id: number }).id
  const { error: errorTemas } = await supabase
    .from("exam_report_topics")
    .insert(temas.map((topic_id) => ({ report_id: reportId, topic_id })))
  if (errorTemas) {
    reportarError("reporte de examen: temas", errorTemas)
    return { temasGuardados: false }
  }
  return { temasGuardados: true }
}
