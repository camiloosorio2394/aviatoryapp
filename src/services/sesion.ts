/**
 * Entrar, registrarse y recuperar la contraseña.
 *
 * Las tres pantallas de acceso (Login, Recuperar, NuevaClave) llaman aquí. Casi
 * todo lanza a propósito: el mensaje es lo que se le muestra al piloto, y
 * tragárselo dejaría un formulario que no dice qué pasó. Lo que lanza ya viene
 * en español (`mensajeDeAcceso`), con el error de Supabase en `cause`.
 */

import { supabase } from "@/integrations/supabase/client"

const CORREO_O_CLAVE =
  "El correo o la contraseña no coinciden. Si acabas de crear la cuenta, abre primero el enlace que te enviamos."

/** Código o texto que devuelve Supabase Auth → lo que lee el piloto. */
const MENSAJES: { codigos: string[]; texto: RegExp; mensaje: string }[] = [
  // «Email not confirmed» dice que la cuenta existe: se contesta igual que a
  // una clave mala para que el formulario no sirva para averiguar correos.
  {
    codigos: ["invalid_credentials", "email_not_confirmed"],
    texto: /invalid login credentials|email not confirmed/i,
    mensaje: CORREO_O_CLAVE,
  },
  {
    codigos: ["user_already_exists", "email_exists"],
    texto: /already registered|already exists/i,
    mensaje: "No pudimos crear la cuenta con ese correo. Si ya tienes una, inicia sesión o recupera tu contraseña.",
  },
  {
    codigos: ["weak_password"],
    texto: /weak password|password should/i,
    mensaje: "Esa contraseña es muy fácil de adivinar o apareció en alguna filtración. Elige otra.",
  },
  {
    codigos: ["same_password"],
    texto: /should be different/i,
    mensaje: "La contraseña nueva tiene que ser distinta de la anterior.",
  },
  {
    codigos: ["over_request_rate_limit", "over_email_send_rate_limit"],
    texto: /rate limit|too many/i,
    mensaje: "Demasiados intentos seguidos. Espera unos minutos y vuelve a probar.",
  },
  {
    codigos: ["session_not_found", "session_expired"],
    texto: /session missing|session not found|expired/i,
    mensaje: "El enlace ya venció. Pide uno nuevo desde «¿Olvidaste tu contraseña?».",
  },
  {
    codigos: ["email_address_invalid", "validation_failed"],
    texto: /invalid email|unable to validate email/i,
    mensaje: "Revisa el correo: no parece una dirección válida.",
  },
  { codigos: ["signup_disabled"], texto: /signups not allowed/i, mensaje: "El registro está cerrado por ahora." },
  {
    codigos: [],
    texto: /failed to fetch|network|load failed/i,
    mensaje: "No hay conexión con el servidor. Revisa tu internet y vuelve a probar.",
  },
]

/**
 * El error de Supabase Auth en palabras del piloto. Los mensajes del servidor
 * llegan en inglés, y los que no están en la lista se quedan en la consola: al
 * piloto le llega uno general.
 */
export function mensajeDeAcceso(error: unknown): string {
  const { code, message } = (error ?? {}) as { code?: unknown; message?: unknown }
  const codigo = typeof code === "string" ? code : ""
  const texto = typeof message === "string" ? message : ""
  const conocido = MENSAJES.find((m) => m.codigos.includes(codigo) || m.texto.test(texto))
  if (conocido) return conocido.mensaje
  console.warn("sesion: error de acceso sin traducir", codigo, texto)
  return "No pudimos completar la operación. Prueba de nuevo en un momento."
}

function enEspanol(error: unknown): Error {
  return new Error(mensajeDeAcceso(error), { cause: error })
}

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
  if (error) throw enEspanol(error)
  return { haySesion: Boolean(data.session) }
}

/** Entrar con correo y contraseña. Al salir bien, `useSession` hace navegar. */
export async function entrarConClave(email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw enEspanol(error)
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
  return { error: error ? { message: mensajeDeAcceso(error) } : null }
}

/**
 * Manda el correo para poner una contraseña nueva. `redirectTo` se arma con el
 * origen de donde está el piloto y no con una constante: así funciona igual en
 * producción, en una preview de Vercel y en local, sin tocar código.
 */
export async function enviarCorreoDeRecuperacion(email: string, redirectTo: string): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
  if (error) throw enEspanol(error)
}

/** Cambia la contraseña de la sesión abierta por el enlace del correo. */
export async function cambiarClave(clave: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({ password: clave })
  if (error) throw enEspanol(error)
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
