/**
 * Verificar las horas de carrera previa del piloto.
 *
 * El piloto sube una foto o un PDF de la página de totales de su bitácora y
 * pide revisión. No puede darse por verificado: la base solo le deja crear la
 * solicitud y retirarla mientras siga pendiente.
 *
 * El sello guarda cuántas horas se verificaron. Si después se sube las horas,
 * deja de cubrirlas, y eso lo resuelve la vista `horas_verificadas`: sin eso el
 * sello no valdría nada frente a una aerolínea.
 */

import { supabase } from "@/integrations/supabase/client"
import { reportarError } from "@/lib/errores"

export type EstadoVerificacion = "pendiente" | "verificada" | "rechazada" | "retirada"

export interface VerificacionDeHoras {
  estado: EstadoVerificacion
  /** Las horas tal como estaban al pedir la revisión. */
  horasTotal: number
  horasPic: number
  revisadoEn: string | null
  /** Si el sello alcanza para las horas que el piloto declara hoy. */
  cubreLoDeclarado: boolean
}

/** Lo que acepta el bucket. Va aquí y no en la pantalla: es regla del servidor. */
export const TIPOS_DE_EVIDENCIA = ["image/jpeg", "image/png", "image/webp", "image/heic", "application/pdf"]
export const TOPE_EVIDENCIA_BYTES = 10 * 1024 * 1024

/**
 * La última solicitud que no esté retirada. `null` es «nunca pidió» o «no se
 * pudo saber»: en los dos casos la pantalla muestra las horas como declaradas,
 * que es lo prudente.
 */
export async function traerVerificacion(userId: string): Promise<VerificacionDeHoras | null> {
  const { data, error } = await supabase
    .from("horas_verificadas")
    .select("estado, horas_total, horas_pic, revisado_en, cubre_lo_declarado")
    .eq("user_id", userId)
    .maybeSingle()
  if (error) {
    console.warn("verificacion de horas", error.message)
    return null
  }
  if (!data) return null

  const fila = data as {
    estado: EstadoVerificacion
    horas_total: number
    horas_pic: number
    revisado_en: string | null
    cubre_lo_declarado: boolean
  }
  return {
    estado: fila.estado,
    horasTotal: fila.horas_total,
    horasPic: fila.horas_pic,
    revisadoEn: fila.revisado_en,
    cubreLoDeclarado: fila.cubre_lo_declarado,
  }
}

/**
 * Sube la evidencia y pide la revisión. Lanza con un mensaje ya en español,
 * que es lo que la pantalla muestra.
 *
 * El archivo va a una carpeta con el id del piloto, que es lo único que la
 * política de Storage le deja escribir.
 */
export async function pedirVerificacion(
  userId: string,
  archivo: File,
  horas: { total: number; pic: number },
  nota: string | null,
): Promise<void> {
  if (!TIPOS_DE_EVIDENCIA.includes(archivo.type)) {
    throw new Error("Sube una foto (JPG, PNG, WebP o HEIC) o un PDF.")
  }
  if (archivo.size > TOPE_EVIDENCIA_BYTES) {
    throw new Error("El archivo pesa más de 10 MB. Sube una foto más liviana.")
  }

  const extension = archivo.name.split(".").pop()?.toLowerCase() ?? "bin"
  const ruta = `${userId}/${Date.now()}.${extension}`

  const { error: errorArchivo } = await supabase.storage
    .from("bitacoras")
    .upload(ruta, archivo, { contentType: archivo.type, upsert: false })
  if (errorArchivo) {
    reportarError("verificacion de horas: subir evidencia", errorArchivo)
    throw new Error("No pudimos subir el archivo. Revisa tu conexión e inténtalo de nuevo.")
  }

  const { error } = await supabase.from("verificaciones_horas").insert({
    user_id: userId,
    horas_total: horas.total,
    horas_pic: horas.pic,
    evidencia: ruta,
    nota_piloto: nota,
  })
  if (error) {
    // El índice único deja una sola pendiente por piloto.
    if (error.code === "23505") throw new Error("Ya tienes una solicitud en revisión.")
    reportarError("verificacion de horas: pedir revision", error)
    throw new Error("No pudimos registrar la solicitud. Inténtalo de nuevo.")
  }
}

/** Retira la solicitud pendiente. Devuelve si había alguna que retirar. */
export async function retirarVerificacion(): Promise<boolean> {
  const { data, error } = await supabase.rpc("retirar_verificacion_horas")
  if (error) {
    reportarError("verificacion de horas: retirar", error)
    throw new Error("No pudimos retirar la solicitud. Inténtalo de nuevo.")
  }
  return Boolean(data)
}
