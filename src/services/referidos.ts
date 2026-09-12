/**
 * Referidos: el código del piloto y a cuántos trajo.
 *
 * Todo sale de `get_referral_stats()`, que ya devuelve la fila armada. La
 * pantalla no arma el enlace aquí porque el dominio es cosa de la vista.
 */

import { supabase } from "@/integrations/supabase/client"

export interface EstadisticasReferidos {
  my_code: string | null
  total_referred: number
  active_referred: number
}

/**
 * `null` es «todavía no hay nada»: la pantalla muestra un guion y ceros, que
 * es lo mismo que hacía antes.
 *
 * La función devuelve la fila suelta o dentro de un arreglo según cómo la
 * llame PostgREST; las dos formas valen.
 */
export async function traerEstadisticasDeReferidos(): Promise<EstadisticasReferidos | null> {
  const { data } = await supabase.rpc("get_referral_stats")
  const fila = Array.isArray(data) ? data[0] : data
  return (fila as EstadisticasReferidos) ?? null
}
