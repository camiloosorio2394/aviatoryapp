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

/** Un vuelo de la bitácora, tal como vive en la tabla `flights`. */
export interface Flight {
  id: number
  flight_date: string
  aircraft_registration: string | null
  aircraft_type: string | null
  from_airport: string | null
  to_airport: string | null
  total_minutes: number
  pic_minutes: number
  sic_minutes: number
  dual_minutes: number
  instrument_real_minutes: number
  instrument_sim_minutes: number
  night_minutes: number
  cross_country_minutes: number
  landings_day: number
  landings_night: number
  remarks: string | null
  created_at: string
}

/**
 * Cuántos vuelos trae la lista. Los totales no dependen de este número: salen
 * de la vista con todos los vuelos, que es de lo que trata este archivo.
 */
export const LIMITE_LISTA = 500

export interface VueloNuevo {
  userId: string
  flightDate: string
  aircraftRegistration: string | null
  aircraftType: string | null
  fromAirport: string | null
  toAirport: string | null
  totalMinutes: number
  picMinutes: number
  sicMinutes: number
  dualMinutes: number
  instrumentRealMinutes: number
  instrumentSimMinutes: number
  nightMinutes: number
  crossCountryMinutes: number
  landingsDay: number
  landingsNight: number
  remarks: string | null
}

/**
 * Lo que necesita la pantalla de la Bitácora: los vuelos más recientes para la
 * lista y los totales de todos para las cifras. Si falla cualquiera de las dos
 * cosas se devuelve el error, porque media pantalla con datos y media sin
 * ellos es peor que decir que no se pudo.
 */
export async function traerBitacora(userId: string): Promise<{
  vuelos: Flight[]
  resumen: ResumenBitacora
  error: { message: string } | null
}> {
  const [lista, totales] = await Promise.all([
    supabase
      .from("flights")
      .select("*")
      .eq("user_id", userId)
      .order("flight_date", { ascending: false })
      .order("id", { ascending: false })
      .limit(LIMITE_LISTA),
    traerResumenBitacora(userId),
  ])
  return {
    vuelos: (lista.data ?? []) as Flight[],
    resumen: totales.resumen,
    error: lista.error ?? totales.error,
  }
}

/** Borra un vuelo. El error sube para poder devolver la fila a la lista. */
export async function borrarVuelo(id: number): Promise<{ error: { message: string } | null }> {
  const { error } = await supabase.from("flights").delete().eq("id", id)
  return { error }
}

/** Guarda un vuelo. Lanza si falla, que es lo que espera el formulario. */
export async function guardarVuelo(vuelo: VueloNuevo): Promise<void> {
  const { error } = await supabase.from("flights").insert({
    user_id: vuelo.userId,
    flight_date: vuelo.flightDate,
    aircraft_registration: vuelo.aircraftRegistration,
    aircraft_type: vuelo.aircraftType,
    from_airport: vuelo.fromAirport,
    to_airport: vuelo.toAirport,
    total_minutes: vuelo.totalMinutes,
    pic_minutes: vuelo.picMinutes,
    sic_minutes: vuelo.sicMinutes,
    dual_minutes: vuelo.dualMinutes,
    instrument_real_minutes: vuelo.instrumentRealMinutes,
    instrument_sim_minutes: vuelo.instrumentSimMinutes,
    night_minutes: vuelo.nightMinutes,
    cross_country_minutes: vuelo.crossCountryMinutes,
    landings_day: vuelo.landingsDay,
    landings_night: vuelo.landingsNight,
    remarks: vuelo.remarks,
  })
  if (error) throw error
}
