/**
 * Registro de actividad de estudio y serie del heatmap.
 *
 * Estudiar marca el día: suma al heatmap (daily_activity) y mantiene la racha.
 * - registrarActividadDeEstudio(): al completar un quiz o una evaluación, con
 *   preguntas y aciertos.
 * - registrarEstudioDiario(): al estudiar en una superficie sin preguntas (una
 *   lección, una práctica), como mucho una vez al día por superficie.
 * - fetchHeatmapSeries(): la serie del heatmap, leída de daily_activity con su RLS.
 */

import { supabase } from "@/integrations/supabase/client"
import { reportarError } from "@/lib/errores"

export interface ActivityDay {
  date: string
  activities_count: number
  questions_answered: number
}

/**
 * Marca el día como estudiado: suma al heatmap y mantiene viva la racha.
 * Devuelve true si la base registró las dos cosas. Sin sesión no hay nada que
 * registrar. Un fallo no interrumpe al piloto (lo que estudió ya quedó guardado
 * por su lado), pero se reporta.
 */
export async function registrarActividadDeEstudio(datos: {
  questions: number
  correct: number
  minutes?: number
}): Promise<boolean> {
  try {
    const { data } = await supabase.auth.getSession()
    if (!data.session) return false
    const [actividad, racha] = await Promise.all([
      supabase.rpc("record_daily_activity", {
        p_questions: datos.questions,
        p_correct: datos.correct,
        p_minutes: datos.minutes ?? 0,
      }),
      supabase.rpc("increment_streak"),
    ])
    const error = actividad.error ?? racha.error
    if (error) {
      reportarError("registro de actividad", error)
      return false
    }
    return true
  } catch (err) {
    reportarError("registro de actividad", err)
    return false
  }
}

const LS_REGISTRADAS = "aviatory.actividad.superficies"
/** Superficies con un registro en camino: dos secciones leídas seguidas no lo mandan dos veces. */
const enCamino = new Set<string>()

/** Fecha de hoy en Colombia, que es la zona con la que la base cierra el día. */
function hoyEnColombia(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" })
}

/**
 * Marca el día como estudiado desde una superficie concreta (una lección, un
 * decodificador, una práctica), como mucho UNA VEZ AL DÍA por superficie.
 *
 * Sin este tope, leer la lección de NOTAM dispararía trece pares de RPC en un
 * rato y dejaría el heatmap con trece "actividades" de un día, contra una sola
 * de quien presentó la evaluación entera: la intensidad del heatmap dejaría de
 * significar nada. Con el tope, cada superficie aporta lo mismo, que es lo
 * único que se quiere decir: estudiaste aquí hoy.
 *
 * La marca del día se anota cuando la base confirma el registro: si falla, el
 * siguiente estudio en esa superficie lo intenta otra vez.
 *
 * Responder un quiz o una evaluación sigue yendo por
 * `registrarActividadDeEstudio`, que sí acumula preguntas y aciertos.
 */
export async function registrarEstudioDiario(
  superficie: string,
  datos: { minutes?: number } = {}
): Promise<void> {
  const hoy = hoyEnColombia()
  let marcas: Record<string, string> = {}
  try {
    marcas = JSON.parse(localStorage.getItem(LS_REGISTRADAS) ?? "{}") as Record<string, string>
  } catch {
    /* localStorage bloqueado o dañado: se registra igual, solo se pierde el tope */
  }
  if (marcas[superficie] === hoy || enCamino.has(superficie)) return

  enCamino.add(superficie)
  try {
    const registrada = await registrarActividadDeEstudio({ questions: 0, correct: 0, minutes: datos.minutes ?? 0 })
    if (!registrada) return
    try {
      localStorage.setItem(LS_REGISTRADAS, JSON.stringify({ ...marcas, [superficie]: hoy }))
    } catch {
      /* localStorage bloqueado: sin tope, cada estudio vuelve a registrar el día */
    }
  } finally {
    enCamino.delete(superficie)
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
    // Sin datos, la serie sale en ceros y el heatmap muestra su estado vacío.
    if (error) console.warn("heatmap: daily_activity", error.message)
    for (const row of (data ?? []) as ActivityDay[]) {
      porFecha.set(row.date, {
        activities_count: row.activities_count ?? 0,
        questions_answered: row.questions_answered ?? 0,
      })
    }
  } catch (err) {
    console.warn("heatmap: daily_activity", err)
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
