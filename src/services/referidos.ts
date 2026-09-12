/**
 * Referidos: el código del piloto y a cuántos trajo.
 *
 * Todo sale de `get_referral_stats()`, que ya devuelve la fila armada. La
 * pantalla no arma el enlace aquí porque el dominio es cosa de la vista.
 */

import { supabase } from "@/integrations/supabase/client"
import { reportarError } from "@/lib/errores"

export interface EstadisticasReferidos {
  my_code: string | null
  total_referred: number
  active_referred: number
}

/**
 * `null` es «todavía no hay nada»: la pantalla muestra un guion y ceros.
 *
 * Si la consulta falla se reporta, porque en pantalla ese fallo es
 * indistinguible de «no has referido a nadie»: un piloto que trajo a cinco
 * vería un cero y pensaría que el programa no funciona.
 *
 * La función devuelve la fila suelta o dentro de un arreglo según cómo la
 * llame PostgREST; las dos formas valen.
 */
export async function traerEstadisticasDeReferidos(): Promise<EstadisticasReferidos | null> {
  const { data, error } = await supabase.rpc("get_referral_stats")
  if (error) {
    reportarError("referidos: estadísticas", error)
    return null
  }
  const fila = Array.isArray(data) ? data[0] : data
  return (fila as EstadisticasReferidos) ?? null
}
