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

/** Cierra la sesión. Se usa cuando el enlace del correo vino con error. */
export async function cerrarSesion(): Promise<void> {
  await supabase.auth.signOut()
}
