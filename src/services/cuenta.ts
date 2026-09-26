/**
 * La cuenta del piloto frente a la ley: la autorización de tratamiento, con su
 * constancia, y la eliminación de la cuenta.
 *
 * Viene de la auditoría de prelanzamiento del 26-sep-2026. La Ley 1581 y el
 * Decreto 1377 piden poder PROBAR que el piloto autorizó, y pedir aparte la
 * autorización de un dato sensible (el certificado médico). La política promete
 * que la cuenta se elimina; hasta hoy no había cómo.
 *
 * Todo depende de la migración 20261002000000. Mientras no se aplique, nada de
 * esto deja a nadie fuera: la constancia no se guarda (se avisa en consola) y
 * eliminar la cuenta dice que todavía no está disponible.
 */

import { supabase } from "@/integrations/supabase/client"
import { reportarError } from "@/lib/errores"

/**
 * Versión vigente de los Términos y la Política. Cuando cambien de forma
 * sustancial, sube esta fecha: a quien no haya aceptado la nueva, la app se la
 * vuelve a pedir.
 */
export const VERSION_TERMINOS = "2026-09-26"

export type DocumentoAutorizado = "terminos_y_privacidad" | "dato_sensible_medico"

/** La función o la tabla no existen: la migración todavía no se aplicó. */
function faltaLaMigracion(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false
  return (
    error.code === "PGRST202" || // función que no está en el esquema
    error.code === "PGRST205" || // tabla que no está en el esquema
    error.code === "42P01" ||
    error.code === "42883" ||
    /could not find|does not exist/i.test(error.message ?? "")
  )
}

/** Deja constancia de la autorización. Devuelve false si no se pudo guardar. */
export async function registrarAutorizacion(
  documento: DocumentoAutorizado,
  version: string = VERSION_TERMINOS,
): Promise<boolean> {
  const { error } = await supabase.rpc("registrar_autorizacion", { p_documento: documento, p_version: version })
  if (!error) return true
  if (faltaLaMigracion(error)) {
    console.warn("autorización: la base todavía no guarda constancias (migración 20261002000000)")
    return false
  }
  reportarError("cuenta: registrar autorización", error, documento)
  return false
}

/**
 * ¿El piloto ya aceptó la versión vigente? `null` si no se puede saber (la
 * tabla no existe todavía o la red falló): quien llama no debe bloquear por eso.
 */
export async function tieneAutorizacionVigente(userId: string): Promise<boolean | null> {
  const { data, error } = await supabase
    .from("autorizaciones")
    .select("id")
    .eq("user_id", userId)
    .eq("documento", "terminos_y_privacidad")
    .eq("version", VERSION_TERMINOS)
    .limit(1)
  if (error) {
    if (!faltaLaMigracion(error)) console.warn("autorización: no se pudo consultar", error)
    return null
  }
  return (data?.length ?? 0) > 0
}

/** Todas las rutas de archivos bajo una carpeta, entrando a las subcarpetas. */
async function listarArchivos(bucket: string, carpeta: string): Promise<string[]> {
  const rutas: string[] = []
  const pendientes = [carpeta]
  while (pendientes.length) {
    const prefijo = pendientes.pop() as string
    const { data, error } = await supabase.storage.from(bucket).list(prefijo, { limit: 1000 })
    if (error) throw error
    for (const item of data ?? []) {
      const ruta = `${prefijo}/${item.name}`
      // En Storage una carpeta es una entrada sin id.
      if (item.id) rutas.push(ruta)
      else pendientes.push(ruta)
    }
  }
  return rutas
}

export type ResultadoEliminacion =
  | { estado: "eliminada" }
  | { estado: "no_disponible" }
  | { estado: "error"; mensaje: string }

/**
 * Elimina la cuenta del piloto que tiene la sesión:
 *
 * 1. Pregunta a la base si la función existe (con una palabra que no es la
 *    que borra), para no borrar archivos de una cuenta que no se va a poder
 *    eliminar.
 * 2. Borra sus archivos (foto y respaldos de la bitácora) por la API de
 *    Storage: la base no deja borrarlos con SQL.
 * 3. Borra la cuenta; lo demás se va en cascada.
 *
 * Quien llama cierra la sesión local y limpia el equipo después.
 */
export async function eliminarMiCuenta(userId: string): Promise<ResultadoEliminacion> {
  const prueba = await supabase.rpc("eliminar_mi_cuenta", { p_confirmacion: "VERIFICAR" })
  if (faltaLaMigracion(prueba.error)) return { estado: "no_disponible" }
  if (!prueba.error || !/confirmacion_invalida/.test(prueba.error.message)) {
    reportarError("cuenta: eliminar (verificación)", prueba.error ?? new Error("la verificación no respondió como se esperaba"))
    return { estado: "error", mensaje: "No pudimos verificar la eliminación. Inténtalo de nuevo en un rato." }
  }

  try {
    for (const bucket of ["avatars", "bitacoras"]) {
      const rutas = await listarArchivos(bucket, userId)
      for (let i = 0; i < rutas.length; i += 100) {
        const { error } = await supabase.storage.from(bucket).remove(rutas.slice(i, i + 100))
        if (error) throw error
      }
    }
  } catch (error) {
    reportarError("cuenta: eliminar archivos", error)
    return { estado: "error", mensaje: "No pudimos borrar tus archivos. Tu cuenta sigue igual; inténtalo de nuevo." }
  }

  const { error } = await supabase.rpc("eliminar_mi_cuenta", { p_confirmacion: "ELIMINAR" })
  if (error) {
    reportarError("cuenta: eliminar", error)
    return { estado: "error", mensaje: "No pudimos eliminar tu cuenta. Tus archivos ya se borraron; vuelve a intentarlo." }
  }
  return { estado: "eliminada" }
}
