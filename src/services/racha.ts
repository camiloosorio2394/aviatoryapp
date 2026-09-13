/**
 * El estado de la racha del piloto, para poder contárselo.
 *
 * Aparte de `lib/activity.ts`, que es quien la mueve: aquí solo se lee. La
 * racha la escribe `increment_streak()` en la base y el cliente no la toca.
 */

import { supabase } from "@/integrations/supabase/client"

export interface EstadoDeRacha {
  dias: number
  masLarga: number
  /** Día en que la racha sobrevivió a una ausencia, si fue este mes. */
  graciaUsadaEn: string | null
  /** Si todavía le queda el día que puede faltar sin perderla. */
  tieneGracia: boolean
}

/** `null` es «no se pudo saber»: la pantalla entonces no dice nada de la racha. */
export async function traerEstadoDeRacha(userId: string): Promise<EstadoDeRacha | null> {
  const { data, error } = await supabase
    .from("streaks")
    .select("current_streak, longest_streak, gracia_usada_en")
    .eq("user_id", userId)
    .maybeSingle()
  if (error) {
    console.warn("racha", error.message)
    return null
  }
  if (!data) return null

  const fila = data as {
    current_streak: number
    longest_streak: number
    gracia_usada_en: string | null
  }
  return {
    dias: fila.current_streak,
    masLarga: fila.longest_streak,
    graciaUsadaEn: fila.gracia_usada_en,
    tieneGracia: !esDeEsteMes(fila.gracia_usada_en),
  }
}

/**
 * La gracia se repone cada mes calendario, así que solo cuenta la del mes en
 * curso. Se compara con el mes de Bogotá, que es con el que la base cierra el
 * día de la racha.
 */
export function esDeEsteMes(fecha: string | null, ahora = new Date()): boolean {
  if (!fecha) return false
  const mesAhora = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
  }).format(ahora)
  return fecha.slice(0, 7) === mesAhora.slice(0, 7)
}
