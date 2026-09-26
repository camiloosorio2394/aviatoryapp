import { useEffect, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { useSession } from "@/hooks/useSession"
import { registrarAutorizacion, tieneAutorizacionVigente, VERSION_TERMINOS } from "@/services/cuenta"
import { cerrarSesion } from "@/services/sesion"

/** Para no volver a preguntar a la base en cada pantalla: se borra al cambiar de cuenta. */
const CLAVE_VIGENTE = "aviatory.autorizacion.vigente"

function yaConstaEnEsteEquipo(userId: string): boolean {
  try {
    return localStorage.getItem(CLAVE_VIGENTE) === `${userId}:${VERSION_TERMINOS}`
  } catch {
    return false
  }
}

function recordarQueConsta(userId: string) {
  try {
    localStorage.setItem(CLAVE_VIGENTE, `${userId}:${VERSION_TERMINOS}`)
  } catch {
    /* sin almacenamiento, se vuelve a consultar la próxima vez */
  }
}

/**
 * La autorización de tratamiento, con constancia, para quien entra.
 *
 * - Quien se registró con correo marcó la casilla, y la versión viajó en los
 *   metadatos de su cuenta: aquí se guarda la constancia sin preguntar nada.
 * - Quien entró con Google, o tenía cuenta de antes, o no ha aceptado la
 *   versión vigente, ve un aviso que pide la autorización antes de seguir.
 *
 * Nunca deja a nadie fuera por un problema nuestro: si la base todavía no
 * guarda constancias (migración 20261002000000 sin aplicar) o la consulta
 * falla, la app sigue. La pantalla se pinta mientras se consulta; el aviso,
 * si hace falta, aparece encima.
 */
export function AutorizacionPendiente({ children }: { children: ReactNode }) {
  const { user } = useSession()
  const [pedir, setPedir] = useState(false)
  const [acepta, setAcepta] = useState(false)
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    if (!user || yaConstaEnEsteEquipo(user.id)) return
    let cancelado = false
    void (async () => {
      const vigente = await tieneAutorizacionVigente(user.id)
      if (cancelado || vigente === null) return
      if (vigente) {
        recordarQueConsta(user.id)
        return
      }
      // Marcó la casilla al registrarse con correo: la constancia ya viajó en
      // los metadatos de su cuenta, así que solo falta guardarla.
      if (user.user_metadata?.autorizacion_version === VERSION_TERMINOS) {
        if (await registrarAutorizacion("terminos_y_privacidad")) recordarQueConsta(user.id)
        return
      }
      if (!cancelado) setPedir(true)
    })()
    return () => {
      cancelado = true
    }
  }, [user])

  async function aceptar() {
    if (!user) return
    setGuardando(true)
    const ok = await registrarAutorizacion("terminos_y_privacidad")
    if (ok) recordarQueConsta(user.id)
    // Si no se pudo guardar, no se bloquea al piloto: el error ya quedó reportado.
    setGuardando(false)
    setPedir(false)
  }

  return (
    <>
      {children}
      {pedir && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="autorizacion-titulo"
            className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-xl"
          >
            <h2 id="autorizacion-titulo" className="text-[20px] font-semibold tracking-tight">
              Antes de seguir
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Actualizamos los Términos y la Política de privacidad. Para usar Aviatory necesitamos
              tu autorización para tratar tus datos como explica la política.
            </p>
            <label className="mt-4 flex items-start gap-2.5 text-[14px] leading-relaxed">
              <input
                type="checkbox"
                checked={acepta}
                onChange={(e) => setAcepta(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--av-blue-500)]"
              />
              <span>
                Acepto los{" "}
                <Link to="/terminos" className="underline">Términos</Link> y autorizo el tratamiento de
                mis datos según la <Link to="/privacidad" className="underline">Política de privacidad</Link>.
              </span>
            </label>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void cerrarSesion()}
                className="min-h-[44px] flex-1 rounded-xl border border-border px-4 text-[15px] font-medium hover:bg-muted"
              >
                Salir
              </button>
              <button
                type="button"
                disabled={!acepta || guardando}
                onClick={() => void aceptar()}
                className="min-h-[44px] flex-1 rounded-xl px-4 text-[15px] font-semibold text-white disabled:opacity-50"
                style={{ background: "var(--av-blue-500)" }}
              >
                {guardando ? "Guardando…" : "Aceptar y continuar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
