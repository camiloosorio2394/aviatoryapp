/**
 * Totales de la bitácora del piloto, calculados en la base: vista
 * `bitacora_resumen` (supabase/migrations/20260911202806_resumenes_en_la_base.sql).
 *
 * Sumarlos en el navegador obligaba a traer todos los vuelos, y PostgREST corta
 * cada respuesta en 1000 filas: pasado ese número las horas salían mal sin
 * avisar. La lista de la Bitácora se sigue cortando; los totales no dependen de
 * ella.
 */

import { supabase } from "@/integrations/supabase/client"

export interface ResumenBitacora {
  vuelos: number
  minutosTotal: number
  minutosPic: number
  minutosSic: number
  minutosIfr: number
  minutosNoche: number
  minutosTravesia: number
  aterrizajes: number
  /** Fecha (YYYY-MM-DD) del vuelo más reciente. */
  ultimoVuelo: string | null
}

export const RESUMEN_BITACORA_VACIO: ResumenBitacora = {
  vuelos: 0,
  minutosTotal: 0,
  minutosPic: 0,
  minutosSic: 0,
  minutosIfr: 0,
  minutosNoche: 0,
  minutosTravesia: 0,
  aterrizajes: 0,
  ultimoVuelo: null,
}

interface FilaResumen {
  vuelos: number
  minutos_total: number
  minutos_pic: number
  minutos_sic: number
  minutos_ifr: number
  minutos_noche: number
  minutos_travesia: number
  aterrizajes: number
  ultimo_vuelo: string | null
}

/** Sin vuelos la vista no tiene fila para el piloto: el resumen sale en cero. */
export function leerResumenBitacora(fila: FilaResumen | null): ResumenBitacora {
  if (!fila) return RESUMEN_BITACORA_VACIO
  return {
    vuelos: fila.vuelos,
    minutosTotal: fila.minutos_total,
    minutosPic: fila.minutos_pic,
    minutosSic: fila.minutos_sic,
    minutosIfr: fila.minutos_ifr,
    minutosNoche: fila.minutos_noche,
    minutosTravesia: fila.minutos_travesia,
    aterrizajes: fila.aterrizajes,
    ultimoVuelo: fila.ultimo_vuelo,
  }
}

export async function traerResumenBitacora(
  userId: string,
): Promise<{ resumen: ResumenBitacora; error: { message: string } | null }> {
  const { data, error } = await supabase
    .from("bitacora_resumen")
    .select(
      "vuelos, minutos_total, minutos_pic, minutos_sic, minutos_ifr, minutos_noche, minutos_travesia, aterrizajes, ultimo_vuelo",
    )
    .eq("user_id", userId)
    .maybeSingle()
  return { resumen: leerResumenBitacora(data as FilaResumen | null), error }
}
