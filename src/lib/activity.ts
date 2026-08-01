/**
 * Registro de actividad de estudio y serie del heatmap.
 *
 * Historia del bug que motivó este archivo (31 jul 2026): las RPC
 * record_daily_activity e increment_streak existían en la base y NINGÚN flujo
 * las llamaba, así que el heatmap marcaba cero y la racha se ponía en riesgo
 * el mismo día en que el piloto hacía quizzes. Además get_activity_heatmap
 * está rota a nivel SQL (42804: declara date y devuelve timestamptz), y el
 * dashboard se tragaba el error en silencio. Por eso:
 *
 *   1. registrarActividadDeEstudio() se llama al COMPLETAR un quiz o examen.
 *   2. El heatmap se arma aquí leyendo la tabla daily_activity directo (RLS
 *      propio), sin pasar por la RPC rota. La migración
 *      20260731030000_fix_activity_heatmap.sql la repara para el futuro.
 */

import { supabase } from "@/integrations/supabase/client"

export interface ActivityDay {
  date: string
  activities_count: number
  questions_answered: number
}

/**
 * Marca el día como estudiado: suma al heatmap y mantiene viva la racha.
 * Se dispara y se olvida: si falla la red, el quiz ya quedó guardado y no
 * tiene sentido molestar al usuario por el registro de actividad.
 */
export async function registrarActividadDeEstudio(datos: {
  questions: number
  correct: number
  minutes?: number
}): Promise<void> {
  try {
    await Promise.all([
      supabase.rpc("record_daily_activity", {
        p_questions: datos.questions,
        p_correct: datos.correct,
        p_minutes: datos.minutes ?? 0,
      }),
      supabase.rpc("increment_streak"),
    ])
  } catch (err) {
    console.warn("registro de actividad", err)
  }
}

const WEEKS = 12

/**
 * Serie completa del heatmap: desde el lunes de hace 11 semanas hasta hoy,
 * con ceros donde no hubo actividad. La grilla del dashboard corta en
 * columnas de 7, así que la serie siempre arranca en lunes.
 */
export async function fetchHeatmapSeries(userId: string): Promise<ActivityDay[]> {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  const inicio = new Date(hoy)
  inicio.setDate(inicio.getDate() - (WEEKS - 1) * 7)
  // Retrocede al lunes (getDay: 0 domingo ... 1 lunes)
  const offset = (inicio.getDay() + 6) % 7
  inicio.setDate(inicio.getDate() - offset)

  const isoInicio = inicio.toISOString().slice(0, 10)

  const porFecha = new Map<string, { activities_count: number; questions_answered: number }>()
  try {
    const { data, error } = await supabase
      .from("daily_activity")
      .select("date, activities_count, questions_answered")
      .eq("user_id", userId)
      .gte("date", isoInicio)
    if (!error) {
      for (const row of (data ?? []) as ActivityDay[]) {
        porFecha.set(row.date, {
          activities_count: row.activities_count ?? 0,
          questions_answered: row.questions_answered ?? 0,
        })
      }
    }
  } catch {
    /* sin red: la serie sale en ceros y el heatmap muestra su estado vacío */
  }

  const serie: ActivityDay[] = []
  for (let d = new Date(inicio); d <= hoy; d.setDate(d.getDate() + 1)) {
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
    const row = porFecha.get(iso)
    serie.push({
      date: iso,
      activities_count: row?.activities_count ?? 0,
      questions_answered: row?.questions_answered ?? 0,
    })
  }
  return serie
}
