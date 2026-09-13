/**
 * El ritmo real del piloto contra la fecha que se puso.
 *
 * `pilot_state.target_date` se guarda desde el onboarding y hasta ahora solo
 * pintaba una cuenta regresiva. Una fecha sin ritmo al lado no dice nada: lo
 * que mueve es saber si al paso de las últimas semanas se llega o no.
 *
 * No se inventa ningún porcentaje del temario: se cuentan días estudiados, que
 * es un dato que la base ya tiene, y se comparan con los que el piloto prometió
 * en su plan. Eso es comprobable; un «vas al 64%» no lo sería.
 */

import { supabase } from "@/integrations/supabase/client"

/** Cuatro semanas: suficiente para que un viaje o una semana mala no lo decidan. */
export const DIAS_DE_LA_VENTANA = 28

export interface RitmoDeEstudio {
  /** YYYY-MM-DD, o `null` si el piloto no se puso ninguna. */
  fechaObjetivo: string | null
  /** Días con actividad en la ventana. */
  diasEstudiados: number
}

/** `null` es «no se pudo saber»: la pantalla entonces no dice nada del ritmo. */
export async function traerRitmoDeEstudio(userId: string): Promise<RitmoDeEstudio | null> {
  const desde = new Date()
  desde.setDate(desde.getDate() - DIAS_DE_LA_VENTANA)
  const desdeIso = desde.toISOString().slice(0, 10)

  const [estado, actividad] = await Promise.all([
    supabase.from("pilot_state").select("target_date").eq("user_id", userId).maybeSingle(),
    supabase.from("daily_activity").select("date").eq("user_id", userId).gte("date", desdeIso),
  ])

  const error = estado.error ?? actividad.error
  if (error) {
    console.warn("ritmo de estudio", error.message)
    return null
  }

  return {
    fechaObjetivo: (estado.data as { target_date?: string } | null)?.target_date ?? null,
    diasEstudiados: (actividad.data ?? []).length,
  }
}

/** Días que faltan para la fecha. Negativo si ya pasó, `null` si no hay fecha. */
export function diasHastaLaFecha(fecha: string | null, hoy = new Date()): number | null {
  if (!fecha) return null
  const objetivo = new Date(`${fecha}T00:00:00`)
  const desde = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())
  return Math.round((objetivo.getTime() - desde.getTime()) / 86_400_000)
}

/** Los días que un plan promete en la ventana, para comparar contra lo real. */
export function diasPrometidos(diasDelPlan: number[]): number {
  return Math.round((diasDelPlan.length * DIAS_DE_LA_VENTANA) / 7)
}
