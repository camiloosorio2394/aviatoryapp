/**
 * Datos del Perfil: leerlos, guardarlos y cambiar la foto.
 *
 * La pantalla no habla con Supabase, le pide las cosas a este archivo. Lo que
 * se puede calcular sin red (la recurrencia de los certificados, de dónde sale
 * el nivel ICAO) sale de funciones puras, para poder probarlo sin base.
 */

import { supabase } from "@/integrations/supabase/client"
import { traerResumenBitacora } from "@/services/bitacora"
import type { CertRow, Stage } from "@/components/perfil/tipos"

/** Extensiones que acepta el avatar, en el orden en que se intenta borrarlas. */
export const EXTENSIONES_AVATAR = ["png", "jpg", "jpeg", "webp"] as const

export interface DatosDelPerfil {
  fullName: string
  country: string
  username: string
  photoUrl: string | null
  stage: Stage | ""
  /** Lo que el piloto editaba antes como «horas totales»: ahora es su carrera
   *  previa a Aviatory. El total lo calcula la base sumándole la bitácora. */
  horasPreviasTotal: string
  horasPreviasPic: string
  /** La carrera completa, calculada. Solo se muestra. */
  totalCarrera: number | null
  picCarrera: number | null
  targetAirline: string
  licenses: string[]
  vuelos: { totalMin: number; picMin: number; xcMin: number; count: number }
  ultimoVuelo: string | null
  certs: CertRow[]
  recurrencia: { valid: number; total: number }
  logros: { unlocked: number; total: number }
  estudio: { pcaBest: number | null; quizzes: number; longestStreak: number }
  icao: { level: number | null; takenAt: string | null; source: "mock" | "estimate" | null }
}

interface FilaPiloto {
  stage?: Stage
  horas_previas_total?: number
  horas_previas_pic?: number
  total_hours?: number
  hours_pic?: number
  icao_english_level?: number
  target_airline?: string
  licenses?: string[]
}

/**
 * Cuántos certificados con vigencia siguen al día. Los que no tienen fecha de
 * vencimiento no cuentan ni a favor ni en contra: no se sabe nada de ellos.
 */
export function contarRecurrencia(certs: CertRow[], hoy: string): { valid: number; total: number } {
  const conFecha = certs.filter((c): c is CertRow & { expires_date: string } => Boolean(c.expires_date))
  return { valid: conFecha.filter((c) => c.expires_date >= hoy).length, total: conFecha.length }
}

/**
 * El nivel ICAO oficial es el del simulacro TEA. Sin simulacro se usa la
 * estimación del test inicial, marcada como tal. Nunca lo que declare el
 * piloto a mano.
 */
export function resolverIcao(
  mock: { final_level?: number; taken_at?: string } | null,
  estimacion: number | null,
): DatosDelPerfil["icao"] {
  return {
    level: mock?.final_level ?? estimacion,
    takenAt: mock?.taken_at ?? null,
    source: mock?.final_level != null ? "mock" : estimacion != null ? "estimate" : null,
  }
}

/** Todo lo que la pantalla necesita para pintarse, en una sola tanda. */
export async function traerPerfil(userId: string): Promise<DatosDelPerfil> {
  const [profileRes, pilotRes, bitacoraRes, licRes, mockRes, achMineRes, achAllRes, pcaBestRes, quizCountRes, streakRes] =
    await Promise.all([
      supabase.from("profiles").select("full_name, country, username, photo_url").eq("id", userId).maybeSingle(),
      supabase.from("pilot_state").select("*").eq("user_id", userId).maybeSingle(),
      traerResumenBitacora(userId),
      supabase
        .from("licenses_held")
        .select("id, license_type, custom_name, issued_date, expires_date")
        .eq("user_id", userId)
        .order("expires_date", { ascending: true, nullsFirst: false }),
      supabase
        .from("user_icao_mock_results")
        .select("final_level, taken_at")
        .eq("user_id", userId)
        .order("taken_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase.from("user_achievements").select("achievement_id", { count: "exact", head: true }).eq("user_id", userId),
      supabase.from("achievements").select("id", { count: "exact", head: true }),
      supabase
        .from("user_pca_exam_attempts")
        .select("score")
        .eq("user_id", userId)
        .order("score", { ascending: false })
        .limit(1)
        .maybeSingle(),
      // vault_sessions, no quiz_attempts: la tabla vieja quedó congelada al
      // migrar al vault, así que este número no se movía nunca. Era real,
      // pero de otra época: una mentira en pantalla de las difíciles de ver.
      supabase
        .from("vault_sessions")
        .select("token", { count: "exact", head: true })
        .eq("user_id", userId)
        .not("completed_at", "is", null),
      supabase.from("streaks").select("longest_streak").eq("user_id", userId).maybeSingle(),
    ])

  const p = (profileRes.data ?? {}) as { full_name?: string; country?: string; username?: string; photo_url?: string }
  const pilot = pilotRes.data as FilaPiloto | null

  // El agregado de la bitácora es la fuente real de horas. Si falla, la
  // pantalla se queda con las horas declaradas en pilot_state.
  if (bitacoraRes.error) console.warn("perfil: bitacora_resumen", bitacoraRes.error.message)
  const bitacora = bitacoraRes.resumen

  const certs = (licRes.data ?? []) as CertRow[]

  return {
    fullName: p.full_name ?? "",
    country: p.country ?? "",
    username: p.username ?? "",
    photoUrl: p.photo_url ?? null,
    stage: pilot?.stage ?? "",
    horasPreviasTotal: pilot?.horas_previas_total?.toString() ?? "",
    horasPreviasPic: pilot?.horas_previas_pic?.toString() ?? "",
    totalCarrera: pilot?.total_hours ?? null,
    picCarrera: pilot?.hours_pic ?? null,
    targetAirline: pilot?.target_airline ?? "",
    licenses: pilot?.licenses ?? [],
    vuelos: {
      totalMin: bitacora.minutosTotal,
      picMin: bitacora.minutosPic,
      xcMin: bitacora.minutosTravesia,
      count: bitacora.vuelos,
    },
    ultimoVuelo: bitacora.ultimoVuelo,
    certs,
    recurrencia: contarRecurrencia(certs, new Date().toISOString().slice(0, 10)),
    logros: { unlocked: achMineRes.count ?? 0, total: achAllRes.count ?? 0 },
    estudio: {
      pcaBest: (pcaBestRes.data as { score: number | null } | null)?.score ?? null,
      quizzes: quizCountRes.count ?? 0,
      longestStreak: (streakRes.data as { longest_streak: number | null } | null)?.longest_streak ?? 0,
    },
    icao: resolverIcao(mockRes.data as { final_level?: number; taken_at?: string } | null, pilot?.icao_english_level ?? null),
  }
}

/**
 * Si el nombre de usuario está libre. `libre: null` con `fallo` es «no se pudo
 * comprobar»: antes un error de red salía en pantalla como «ya está tomado».
 */
export async function comprobarUsuarioLibre(
  username: string,
): Promise<{ libre: boolean | null; fallo: boolean }> {
  const { data, error } = await supabase.rpc("check_username_available", { p_username: username })
  if (error) console.warn("check_username_available", error.message)
  return { libre: error ? null : !!data, fallo: Boolean(error) }
}

/**
 * Sube el avatar y deja la URL en el perfil. Devuelve la URL ya con el sello de
 * tiempo, que es lo que hace que el navegador deje de servir la foto anterior.
 */
export async function subirFotoDePerfil(userId: string, file: File, ext: string): Promise<string> {
  const path = `${userId}/avatar.${ext}`
  const { error: upErr } = await supabase.storage
    .from("avatars")
    .upload(path, file, { upsert: true, cacheControl: "0", contentType: file.type })
  if (upErr) throw upErr
  const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path)
  const finalUrl = `${urlData.publicUrl}?v=${Date.now()}`
  const { error: dbErr } = await supabase.from("profiles").update({ photo_url: finalUrl }).eq("id", userId)
  if (dbErr) throw dbErr
  return finalUrl
}

/** Borra el avatar del almacenamiento, en todas sus extensiones posibles. */
export async function borrarFotoDePerfil(userId: string): Promise<void> {
  for (const ext of EXTENSIONES_AVATAR) {
    await supabase.storage.from("avatars").remove([`${userId}/avatar.${ext}`])
  }
  const { error } = await supabase.from("profiles").update({ photo_url: null }).eq("id", userId)
  if (error) throw error
}

export interface PerfilParaGuardar {
  fullName: string
  country: string
  username: string
  stage: Stage | ""
  horasPreviasTotal: string
  horasPreviasPic: string
  targetAirline: string
  licenses: string[]
}

/** Guarda identidad y estado de piloto. El nivel ICAO no se toca aquí. */
export async function guardarPerfil(userId: string, datos: PerfilParaGuardar): Promise<void> {
  const [pRes, sRes] = await Promise.all([
    supabase
      .from("profiles")
      .update({
        full_name: datos.fullName || null,
        country: datos.country || null,
        username: datos.username || null,
      })
      .eq("id", userId),
    supabase.from("pilot_state").upsert({
      user_id: userId,
      stage: datos.stage || null,
      // total_hours y hours_pic NO se mandan: los calcula la base sumando
      // estas horas previas más la bitácora (20260912210000_horas_de_carrera).
      horas_previas_total: datos.horasPreviasTotal ? Number(datos.horasPreviasTotal) : null,
      horas_previas_pic: datos.horasPreviasPic ? Number(datos.horasPreviasPic) : null,
      // icao_english_level NO se setea acá: el nivel oficial sale del simulacro TEA.
      target_airline: datos.targetAirline || null,
      licenses: datos.licenses,
      updated_at: new Date().toISOString(),
    }),
  ])
  if (pRes.error) throw pRes.error
  if (sRes.error) throw sRes.error
}
