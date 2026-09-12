/**
 * Ingreso a aerolínea: los requisitos de cada una y con qué se comparan.
 *
 * `armarPerfilDePiloto` es la regla de prioridad entre lo medido y lo
 * declarado. Vive aquí y no en la pantalla porque es la misma que usa el Pilot
 * ID del perfil, y si las dos se separan el match empieza a contradecir lo que
 * el piloto ve de sí mismo.
 */

import { supabase } from "@/integrations/supabase/client"
import { RESUMEN_BITACORA_VACIO, traerResumenBitacora, type ResumenBitacora } from "@/services/bitacora"

export interface AirlineRequirements {
  min_hours_total?: number
  min_hours_pic?: number
  icao_english?: number
  licenses?: string[]
  age_max?: number
}

export interface Airline {
  id: number
  name: string
  code: string | null
  country: string
  brand_color: string | null
  requirements: AirlineRequirements
  order_index: number
}

/** Fila declarada en `pilot_state` (lo que el piloto escribió a mano en su perfil). */
export interface PilotStateRow {
  total_hours: number | null
  hours_pic: number | null
  licenses: string[] | null
  icao_english_level: number | null
}

/** Perfil consolidado del piloto: con esto se compara contra cada aerolínea. */
export interface PilotProfile {
  totalHours: number | null
  hoursPic: number | null
  icaoLevel: number | null
  licenses: string[]
}

export const PERFIL_VACIO: PilotProfile = {
  totalHours: null,
  hoursPic: null,
  icaoLevel: null,
  licenses: [],
}

/**
 * La regla de prioridad, medido antes que declarado:
 *
 *  - Horas y PIC: la bitácora si hay vuelos; si no, lo declarado en
 *    `pilot_state`.
 *  - Inglés ICAO: el simulacro TEA si lo hizo; si no, la estimación del test
 *    inicial guardada en `pilot_state.icao_english_level`.
 *  - Licencias: `pilot_state.licenses`, que es donde el piloto las marca.
 */
export function armarPerfilDePiloto(
  estado: PilotStateRow | null,
  bitacora: ResumenBitacora,
  nivelIcaoDelSimulacro: number | null,
): PilotProfile {
  const hayVuelos = bitacora.vuelos > 0
  return {
    totalHours: hayVuelos ? bitacora.minutosTotal / 60 : estado?.total_hours ?? null,
    hoursPic: hayVuelos ? bitacora.minutosPic / 60 : estado?.hours_pic ?? null,
    icaoLevel: nivelIcaoDelSimulacro ?? estado?.icao_english_level ?? null,
    licenses: estado?.licenses ?? [],
  }
}

/**
 * Las aerolíneas y el perfil contra el que se comparan. Sin sesión se traen
 * las aerolíneas igual: la pantalla se puede mirar sin cuenta, solo que no
 * arma match.
 */
export async function traerAerolineasYPiloto(
  userId: string | undefined,
): Promise<{ aerolineas: Airline[]; piloto: PilotProfile }> {
  const [aerolineasRes, pilotRes, bitacoraRes, mockRes] = await Promise.all([
    supabase.from("airlines").select("*").order("order_index"),
    userId
      ? supabase
          .from("pilot_state")
          .select("total_hours, hours_pic, licenses, icao_english_level")
          .eq("user_id", userId)
          .maybeSingle()
      : Promise.resolve({ data: null }),
    userId ? traerResumenBitacora(userId) : Promise.resolve(null),
    userId
      ? supabase
          .from("user_icao_mock_results")
          .select("final_level")
          .eq("user_id", userId)
          .order("taken_at", { ascending: false })
          .limit(1)
          .maybeSingle()
      : Promise.resolve({ data: null }),
  ])

  // Si el agregado de la bitácora falla se sigue con lo declarado: es mejor un
  // match con las horas del perfil que ningún match.
  if (bitacoraRes?.error) console.warn("aerolíneas: bitacora_resumen", bitacoraRes.error.message)

  return {
    aerolineas: (aerolineasRes.data ?? []) as Airline[],
    piloto: armarPerfilDePiloto(
      pilotRes.data as PilotStateRow | null,
      bitacoraRes?.resumen ?? RESUMEN_BITACORA_VACIO,
      (mockRes.data as { final_level: number | null } | null)?.final_level ?? null,
    ),
  }
}

/**
 * El mejor puntaje de las evaluaciones de NOTAM y Meteorología. `null` es «no
 * ha presentado» o «no se pudo saber»: la pantalla se queda entonces con el
 * respaldo local, que nunca miente hacia abajo.
 */
export async function traerMejoresPuntajesDeExamen(
  userId: string,
): Promise<{ notam: number | null; metar: number | null }> {
  const mejor = (tabla: string) =>
    supabase.from(tabla).select("score").eq("user_id", userId).order("score", { ascending: false }).limit(1)

  const [notamRes, metarRes] = await Promise.all([
    mejor("user_notam_exam_attempts"),
    mejor("user_metar_exam_attempts"),
  ])

  const leer = (res: { data: unknown }) => {
    const puntaje = ((res.data ?? []) as { score?: unknown }[])[0]?.score
    return typeof puntaje === "number" ? puntaje : null
  }
  return { notam: leer(notamRes), metar: leer(metarRes) }
}
