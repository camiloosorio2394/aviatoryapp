/**
 * Entrar, registrarse y recuperar la contraseña.
 *
 * Las tres pantallas de acceso (Login, Recuperar, NuevaClave) llaman aquí. Casi
 * todo lanza a propósito: el mensaje del servidor es lo que se le muestra al
 * piloto, y tragárselo dejaría un formulario que no dice qué pasó.
 */

import { supabase } from "@/integrations/supabase/client"

export interface RegistroNuevo {
  email: string
  password: string
  username: string
  /** Código de quien lo invitó, si llegó por un enlace de referidos. */
  referralCode?: string | null
  /**
   * La versión de los Términos y la Política que aceptó al marcar la casilla.
   * Viaja en los metadatos de la cuenta: es la constancia desde el primer
   * momento, antes incluso de confirmar el correo.
   */
  autorizacion?: string
}

/**
 * Si el nombre de usuario está libre.
 *
 * Devuelve el error además del resultado porque las dos pantallas que la usan
 * lo tratan distinto: mientras se escribe, un fallo de red es «no se sabe» y no
 * se dice nada; justo antes de registrar, es motivo para parar.
 */
export async function comprobarUsuarioLibre(
  username: string,
): Promise<{ libre: boolean | null; error: unknown }> {
  const { data, error } = await supabase.rpc("check_username_available", { p_username: username })
  return { libre: error ? null : !!data, error: error ?? null }
}

/**
 * Crea la cuenta. Devuelve si quedó sesión abierta: con la confirmación por
 * correo encendida no la hay, y entonces hay que esperar al enlace.
 */
export async function registrarPiloto(datos: RegistroNuevo): Promise<{ haySesion: boolean }> {
  const { data, error } = await supabase.auth.signUp({
    email: datos.email,
    password: datos.password,
    options: {
      data: {
        username: datos.username,
        ...(datos.referralCode ? { referral_code: datos.referralCode } : {}),
        ...(datos.autorizacion
          ? { autorizacion_version: datos.autorizacion, autorizacion_en: new Date().toISOString() }
          : {}),
      },
    },
  })
  if (error) throw error
  return { haySesion: Boolean(data.session) }
}

/** Entrar con correo y contraseña. Al salir bien, `useSession` hace navegar. */
export async function entrarConClave(email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
}

/**
 * Entrar con Google. Devuelve el error en vez de lanzarlo porque la pantalla lo
 * pinta en su franja de error y no en el `catch` del formulario.
 */
export async function entrarConGoogle(redirectTo: string): Promise<{ error: { message: string } | null }> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  })
  return { error }
}

/**
 * Manda el correo para poner una contraseña nueva. `redirectTo` se arma con el
 * origen de donde está el piloto y no con una constante: así funciona igual en
 * producción, en una preview de Vercel y en local, sin tocar código.
 */
export async function enviarCorreoDeRecuperacion(email: string, redirectTo: string): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
  if (error) throw error
}

/** Cambia la contraseña de la sesión abierta por el enlace del correo. */
export async function cambiarClave(clave: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({ password: clave })
  if (error) throw error
}

/**
 * Cierra la sesión. Devuelve el mensaje de error si Supabase se quejó, o null.
 *
 * No lanza a propósito, porque tiene dos usos con distinta urgencia: NuevaClave
 * la llama cuando el enlace del correo ya venía mal —ahí un fallo al cerrar no
 * cambia nada— y la barra la llama porque el piloto acaba de pedir salir, y ahí
 * sí hay que decírselo.
 */
export async function cerrarSesion(): Promise<string | null> {
  const { error } = await supabase.auth.signOut()
  return error?.message ?? null
}

/**
 * Cierra la sesión solo en este equipo. Es lo que queda después de eliminar la
 * cuenta: en el servidor ya no hay sesión que cerrar, y pedirlo daría error.
 */
export async function cerrarSesionLocal(): Promise<void> {
  await supabase.auth.signOut({ scope: "local" })
}
