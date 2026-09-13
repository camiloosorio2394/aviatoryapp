/**
 * Vencimientos: las licencias, habilitaciones y certificados del piloto.
 *
 * La pantalla decide qué está vencido y de qué color se pinta; aquí solo se
 * lee y se escribe la tabla `licenses_held`, más el aviso al servidor para que
 * revise si toca notificar algo.
 */

import { supabase } from "@/integrations/supabase/client"

export type LicenseType =
  | "medical_class_1"
  | "medical_class_2"
  | "medical_class_3"
  | "ppl"
  | "cpl"
  | "atpl"
  | "ifr"
  | "multi_engine"
  | "flight_instructor"
  | "type_rating"
  | "icao_english"
  | "recurrent_check"
  | "other"

export interface License {
  id: number
  license_type: LicenseType
  custom_name: string | null
  issued_date: string | null
  expires_date: string | null
  document_url: string | null
  notes: string | null
  created_at: string
}

export interface LicenciaNueva {
  userId: string
  licenseType: LicenseType
  customName: string | null
  issuedDate: string | null
  expiresDate: string | null
  notes: string | null
}

/** Lo del piloto, de lo que vence antes a lo que vence después. */
export async function traerLicencias(
  userId: string,
): Promise<{ licencias: License[]; error: { message: string } | null }> {
  const { data, error } = await supabase
    .from("licenses_held")
    .select("*")
    .eq("user_id", userId)
    .order("expires_date", { ascending: true, nullsFirst: false })
  return { licencias: (data ?? []) as License[], error }
}

/**
 * Le pide al servidor que revise los vencimientos y cree los avisos que toque.
 * Que falle no rompe nada de lo que se ve: por eso es `console.warn` y no un
 * error reportado.
 */
export async function revisarVencimientos(): Promise<void> {
  const { error } = await supabase.rpc("check_my_expiries")
  if (error) console.warn("check_my_expiries", error.message)
}

/** Borra una licencia. El error sube para poder devolver la lista a como estaba. */
export async function borrarLicencia(id: number): Promise<{ error: { message: string } | null }> {
  const { error } = await supabase.from("licenses_held").delete().eq("id", id)
  return { error }
}

/** Guarda una licencia nueva. Lanza si falla, que es lo que espera el formulario. */
export async function guardarLicencia(datos: LicenciaNueva): Promise<void> {
  const { error } = await supabase.from("licenses_held").insert({
    user_id: datos.userId,
    license_type: datos.licenseType,
    custom_name: datos.customName,
    issued_date: datos.issuedDate,
    expires_date: datos.expiresDate,
    notes: datos.notes,
  })
  if (error) throw error
}
