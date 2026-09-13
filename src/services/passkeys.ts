/**
 * Passkeys: entrar con Face ID, Touch ID o huella en vez de teclear la clave.
 *
 * Es un beneficio, no un requisito: la contraseña sigue siendo el camino
 * principal y el respaldo si el piloto cambia de teléfono o pierde el passkey.
 *
 * Todo aquí **falla abierto**. Si el navegador no trae WebAuthn, si los
 * passkeys no están habilitados en el servidor o si la consulta se cae, la app
 * se comporta como antes y el piloto entra con su contraseña. Nada de esto
 * puede dejar a nadie fuera de lo que pagó.
 *
 * El API de Supabase Auth es experimental y lanza salvo que el cliente se cree
 * con `auth.experimental.passkey: true` (ver integrations/supabase/client.ts).
 */

import { supabase } from "@/integrations/supabase/client"
import { reportarError } from "@/lib/errores"

/** Lo que devuelve una operación de passkey. `cancelado` no es un fallo. */
export interface ResultadoPasskey {
  ok: boolean
  /** El piloto cerró el diálogo del sistema. No se le muestra error. */
  cancelado: boolean
  /** Mensaje para la pantalla, ya en español. `null` si salió bien. */
  mensaje: string | null
}

const OK: ResultadoPasskey = { ok: true, cancelado: false, mensaje: null }
const CANCELADO: ResultadoPasskey = { ok: false, cancelado: true, mensaje: null }

/**
 * El navegador sabe de WebAuthn. En un escritorio sin lector y en navegadores
 * viejos esto da `false`, y entonces no se ofrece nada: un botón que no puede
 * funcionar es peor que no tener botón.
 */
export function soportaPasskeys(): boolean {
  return typeof window !== "undefined" && !!window.PublicKeyCredential
}

const texto = (error: unknown): string =>
  error instanceof Error ? error.message : typeof error === "string" ? error : ""

/** Los errores de Supabase Auth traen un `code` estable, aparte del mensaje. */
const codigo = (error: unknown): string =>
  typeof error === "object" && error !== null && "code" in error && typeof error.code === "string"
    ? error.code
    : ""

/** El diálogo del sistema devuelve NotAllowedError también al cancelar. */
const esCancelacion = (error: unknown): boolean => /cancel|abort|NotAllowed/i.test(texto(error))

/**
 * El proyecto todavía no tiene passkeys encendidos en Supabase Auth. Se mira
 * el `code`, que es lo estable: el servidor responde 404 con
 * `code: "passkey_disabled"` y el mensaje «Passkeys are disabled». El mensaje
 * se revisa igual por si el cliente lanza antes de salir a la red, que es lo
 * que pasa si falta `auth.experimental.passkey`. Para el piloto los tres casos
 * son el mismo: entra con su contraseña, y esto no se reporta.
 */
const estaApagado = (error: unknown): boolean =>
  codigo(error) === "passkey_disabled" ||
  /passkey_disabled|passkeys? .*disabled|experimental/i.test(texto(error))

/**
 * Entrar con passkey, sin correo ni contraseña: la credencial es descubrible,
 * así que el sistema ofrece las que el piloto tenga para este sitio. Al salir
 * bien, `onAuthStateChange` hace navegar como con cualquier otro ingreso.
 */
export async function entrarConPasskey(): Promise<ResultadoPasskey> {
  try {
    const { error } = await supabase.auth.signInWithPasskey()
    if (error) throw error
    return OK
  } catch (error) {
    if (esCancelacion(error)) return CANCELADO
    if (estaApagado(error)) {
      return { ok: false, cancelado: false, mensaje: "Entrar con Face ID todavía no está disponible. Usa tu contraseña." }
    }
    reportarError("passkeys.entrar", error)
    return { ok: false, cancelado: false, mensaje: "No se pudo entrar con Face ID. Usa tu contraseña." }
  }
}

/** Dar de alta un passkey para la sesión abierta. Pide sesión iniciada. */
export async function registrarPasskey(): Promise<ResultadoPasskey> {
  try {
    const { error } = await supabase.auth.registerPasskey()
    if (error) throw error
    return OK
  } catch (error) {
    if (esCancelacion(error)) return CANCELADO
    if (estaApagado(error)) {
      return { ok: false, cancelado: false, mensaje: "Esta función todavía no está disponible." }
    }
    reportarError("passkeys.registrar", error)
    return { ok: false, cancelado: false, mensaje: "No se pudo activar. Inténtalo más tarde." }
  }
}

/**
 * Si el piloto ya tiene algún passkey en esta cuenta.
 *
 * `null` significa «no se sabe»: el servidor no tiene la función, o la consulta
 * falló. Quien llame no debe ofrecer nada en ese caso, que es la parte de
 * fallar abierto. Un fallo aquí no se reporta: es información opcional, y
 * ensuciar `errores_cliente` con esto taparía lo que sí importa.
 */
export async function tienePasskey(): Promise<boolean | null> {
  try {
    const { data, error } = await supabase.auth.passkey.list()
    if (error) return null
    return (data?.length ?? 0) > 0
  } catch {
    return null
  }
}
