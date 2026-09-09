import { useEffect, useMemo, useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AuthShell } from "@/components/auth/AuthShell"
import { PasswordRules, claveValida, comprobarClave } from "@/components/auth/PasswordRules"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Seo } from "@/components/Seo"

/**
 * Poner la contraseña nueva, al volver del enlace del correo.
 * Ruta: /nueva-clave
 *
 * El detalle que hay que tener presente: Supabase no manda un código para
 * teclear, manda **una sesión**. Al abrir el enlace, el cliente encuentra el
 * token en la URL, lo canjea y deja al piloto con sesión iniciada antes de que
 * esta pantalla se pinte. De ahí salen tres consecuencias:
 *
 * 1. La ruta NO va detrás de `RequireAuth`. No haría daño —para cuando se
 *    evalúa ya hay sesión—, pero ataría esta pantalla a una carrera que no
 *    tiene por qué ganar.
 * 2. No hay que leer el token a mano. `detectSessionInUrl` viene puesto por
 *    defecto en el cliente, así que basta con esperar a que `useSession` diga
 *    que hay sesión; y como eso funciona igual con el flujo implícito que con
 *    PKCE, esta pantalla no depende de cuál tenga configurado la consola.
 * 3. Los enlaces caducados **no** llegan como sesión, llegan como error en la
 *    propia URL. Ese error se lee de una vez al montar, porque el cliente
 *    limpia el hash en cuanto termina de mirarlo y después ya no está.
 */

/** El error que trae el enlace, si viene con uno. Del hash y de la query. */
function errorDelEnlace(): string | null {
  if (typeof window === "undefined") return null
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""))
  const query = new URLSearchParams(window.location.search)
  const codigo = hash.get("error_code") ?? query.get("error_code")
  const descripcion = hash.get("error_description") ?? query.get("error_description")
  if (!codigo && !descripcion && !hash.get("error") && !query.get("error")) return null

  // El caso corriente, y el único que conviene explicar con palabras nuestras.
  if (codigo === "otp_expired" || /expired/i.test(descripcion ?? "")) {
    return "El enlace ya caducó. Pide uno nuevo y ábrelo en cuanto llegue."
  }
  return descripcion?.replace(/\+/g, " ") ?? "El enlace no es válido. Pide uno nuevo."
}

export function NuevaClave() {
  // Se lee una sola vez, al montar: el cliente de Supabase borra el hash en
  // cuanto lo procesa, así que leerlo más tarde ya no encuentra nada.
  const [errorEnlace] = useState(errorDelEnlace)

  const [clave, setClave] = useState("")
  const [confirmacion, setConfirmacion] = useState("")
  const [verClave, setVerClave] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const { session, isLoading } = useSession()

  const reglas = useMemo(() => comprobarClave(clave), [clave])
  const coinciden = confirmacion.length > 0 && confirmacion === clave
  const puedeGuardar = claveValida(clave) && coinciden

  // Si el enlace vino con error no tiene sentido dejar la sesión a medias.
  useEffect(() => {
    if (errorEnlace) void supabase.auth.signOut()
  }, [errorEnlace])

  async function guardar(evento: FormEvent) {
    evento.preventDefault()
    setError(null)
    setGuardando(true)
    try {
      const { error } = await supabase.auth.updateUser({ password: clave })
      if (error) throw error
      toast.success("Listo, tu contraseña quedó cambiada.")
      navigate("/app", { replace: true })
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No pudimos cambiar la contraseña. Inténtalo otra vez."
      )
    } finally {
      setGuardando(false)
    }
  }

  if (errorEnlace) {
    return (
      <AuthShell titulo="Ese enlace ya no sirve" bajada={errorEnlace}>
        <Seo path="/nueva-clave" title="Nueva contraseña" noindex />
        <Link
          to="/recuperar"
          className="btn-apple shine-on-hover mt-8 inline-flex h-12 w-full items-center justify-center gap-1 rounded-full border-0 text-[17px] text-white"
        >
          Pedir un enlace nuevo
          <ArrowRight className="h-4 w-4" />
        </Link>
      </AuthShell>
    )
  }

  if (isLoading) {
    return (
      <AuthShell titulo="Un momento…">
        <Seo path="/nueva-clave" title="Nueva contraseña" noindex />
        <div className="mt-8 flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Comprobando el enlace
        </div>
      </AuthShell>
    )
  }

  // Sin sesión y sin error en la URL: o el enlace se usó ya, o alguien entró a
  // esta dirección por su cuenta. En los dos casos la salida es la misma.
  if (!session) {
    return (
      <AuthShell
        titulo="Necesitas un enlace"
        bajada="Para poner una contraseña nueva hay que entrar desde el enlace que te mandamos por correo."
      >
        <Seo path="/nueva-clave" title="Nueva contraseña" noindex />
        <Link
          to="/recuperar"
          className="btn-apple shine-on-hover mt-8 inline-flex h-12 w-full items-center justify-center gap-1 rounded-full border-0 text-[17px] text-white"
        >
          Pedir el enlace
          <ArrowRight className="h-4 w-4" />
        </Link>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      titulo="Elige tu contraseña nueva"
      bajada={
        session.user.email ? (
          <>
            La estás cambiando para{" "}
            <span className="font-medium text-foreground">{session.user.email}</span>.
          </>
        ) : (
          "Escríbela dos veces para que no se cuele una errata."
        )
      }
    >
      <Seo path="/nueva-clave" title="Nueva contraseña" noindex />

      <form onSubmit={guardar} className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="clave" className="text-[15px]">
            Contraseña nueva
          </Label>
          <div className="relative">
            <Input
              id="clave"
              type={verClave ? "text" : "password"}
              autoComplete="new-password"
              autoFocus
              required
              placeholder="Mínimo 8 caracteres + un número"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              className="h-12 rounded-xl pr-11"
            />
            <button
              type="button"
              onClick={() => setVerClave((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={verClave ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {verClave ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {clave.length > 0 && <PasswordRules length={reglas.length} digit={reglas.digit} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmacion" className="text-[15px]">
            Repítela
          </Label>
          <Input
            id="confirmacion"
            type={verClave ? "text" : "password"}
            autoComplete="new-password"
            required
            placeholder="La misma otra vez"
            value={confirmacion}
            onChange={(e) => setConfirmacion(e.target.value)}
            className="h-12 rounded-xl"
          />
          {confirmacion.length > 0 && !coinciden && (
            <p className="text-[12px] text-red-600 dark:text-red-400">
              Las contraseñas no coinciden
            </p>
          )}
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[15px] text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={guardando || !puedeGuardar}
          className="btn-apple shine-on-hover h-12 w-full rounded-full border-0 text-[17px] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {guardando ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Guardando…
            </>
          ) : (
            <>
              Guardar y entrar
              <ArrowRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 flex items-start gap-2 text-[12px] leading-relaxed text-muted-foreground">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Al guardar quedas dentro de tu cuenta en este dispositivo. Si estás en un computador
        prestado, cierra sesión al terminar.
      </p>
    </AuthShell>
  )
}
