/**
 * El estado del piloto: la fila de `pilot_state`.
 *
 * La escriben dos pantallas de entrada, y cada una escribe solo lo suyo. El
 * onboarding pone etapa, horas, licencias y objetivo; el test inicial pone el
 * nivel de inglés estimado. Ninguna toca lo de la otra, que es la razón de que
 * sean dos funciones y no una.
 */

import { supabase } from "@/integrations/supabase/client"
import { reportarError } from "@/lib/errores"

export interface PerfilInicial {
  stage: string | null
  /** Lo volado antes de Aviatory. La base le suma la bitácora para el total. */
  horasPreviasTotal: number | null
  horasPreviasPic: number | null
  licenses: string[]
  targetAirline: string | null
  targetDate: string | null
}

/**
 * Lo que llena el onboarding. Dos cosas NO se escriben aquí:
 * `icao_english_level`, que sale del test inicial o del simulacro TEA, y
 * `total_hours`, que lo calcula la base como previas más bitácora.
 * Lanza si falla, que es lo que espera la pantalla.
 */
export async function guardarPerfilInicial(userId: string, datos: PerfilInicial): Promise<void> {
  const { error } = await supabase.from("pilot_state").upsert({
    user_id: userId,
    stage: datos.stage,
    horas_previas_total: datos.horasPreviasTotal,
    horas_previas_pic: datos.horasPreviasPic,
    licenses: datos.licenses,
    target_airline: datos.targetAirline,
    target_date: datos.targetDate,
    updated_at: new Date().toISOString(),
  })
  if (error) throw error
}

/**
 * El nivel de inglés estimado por el test inicial.
 *
 * Devuelve si se guardó. supabase-js no lanza: el error llega en la respuesta
 * y hay que mirarlo, o se anuncia como guardado algo que no se guardó.
 */
export async function guardarNivelIcaoEstimado(userId: string, nivel: number): Promise<boolean> {
  const { error } = await supabase.from("pilot_state").upsert({
    user_id: userId,
    icao_english_level: nivel,
    updated_at: new Date().toISOString(),
  })
  if (error) {
    reportarError("test inicial: guardar nivel", error)
    return false
  }
  return true
}
