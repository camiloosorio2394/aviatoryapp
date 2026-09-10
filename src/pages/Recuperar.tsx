import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Loader2, Mail, MailCheck } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { AuthShell } from "@/components/auth/AuthShell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Seo } from "@/components/Seo"

/**
 * Pedir el enlace para recuperar la contraseña.
 * Ruta: /recuperar
 *
 * Hasta ahora el botón «¿Olvidaste tu contraseña?» solo lanzaba un aviso que
 * mandaba a escribir a una dirección que no existe —el dominio no tiene MX—,
 * así que quien olvidaba la clave se quedaba fuera de su cuenta sin salida
 * ninguna. Esto es la salida.
 *
 * Supabase manda el correo y el enlace vuelve a `/nueva-clave`, que es donde se
 * fija la contraseña nueva. Esa URL hay que autorizarla en la consola de
 * Supabase: está anotado en `docs/PENDIENTES_CAMILO.md`.
 */
export function Recuperar() {
  const [email, setEmail] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function enviar(evento: FormEvent) {
    evento.preventDefault()
    setError(null)
    setEnviando(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        // A dónde vuelve el piloto al abrir el enlace del correo. Se arma con
        // el origen de donde está y no con una constante: así funciona igual en
        // producción, en una preview de Vercel y en local, sin tocar código.
        redirectTo: `${window.location.origin}/nueva-clave`,
      })
      if (error) throw error
      setEnviado(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos enviar el correo. Inténtalo otra vez.")
    } finally {
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <AuthShell titulo="Revisa tu correo">
        <Seo path="/recuperar" title="Recuperar contraseña" noindex />
        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <MailCheck className="h-8 w-8" style={{ color: "var(--av-blue-500)" }} />
          <p className="mt-4 text-[15px] leading-relaxed">
            Si <span className="font-semibold">{email.trim()}</span> tiene una cuenta en Aviatory,
            acabamos de enviarle un enlace para poner una contraseña nueva.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            El enlace caduca, así que conviene abrirlo pronto. Si no aparece en unos minutos, mira
            en el correo no deseado.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px]">
          <Link to="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
            Volver a iniciar sesión
          </Link>
          <button
            type="button"
            onClick={() => setEnviado(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Probar con otro correo
          </button>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      titulo="Recupera tu contraseña"
      bajada="Escribe el correo con el que entras y te mandamos un enlace para poner una nueva."
    >
      <Seo path="/recuperar" title="Recuperar contraseña" noindex />

      <form onSubmit={enviar} className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[15px]">
            Tu correo
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              autoFocus
              required
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl pl-9"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[15px] text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={enviando || email.trim().length === 0}
          className="btn-apple shine-on-hover h-12 w-full rounded-full border-0 text-[17px] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {enviando ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enviando…
            </>
          ) : (
            <>
              Enviarme el enlace
              <ArrowRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-8 text-center text-[15px] text-muted-foreground">
        ¿Te acordaste?{" "}
        <Link to="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </AuthShell>
  )
}
