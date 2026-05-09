import { useEffect, useState, type FormEvent } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Mode = "signin" | "signup"

interface LocationStateFrom {
  from?: { pathname?: string }
}

export function Login() {
  const [mode, setMode] = useState<Mode>("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { session, isLoading } = useSession()

  const from = (location.state as LocationStateFrom | null)?.from?.pathname ?? "/app"

  useEffect(() => {
    if (!isLoading && session) {
      navigate(from, { replace: true })
    }
  }, [session, isLoading, navigate, from])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        if (data.session) {
          navigate("/onboarding", { replace: true })
        } else {
          toast.success("Te enviamos un email de confirmación. Revisá tu bandeja.")
          setMode("signin")
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Algo salió mal")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/app` },
    })
    if (error) toast.error(error.message)
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{mode === "signin" ? "Iniciar sesión" : "Crear cuenta"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogle}
          >
            Continuar con Google
          </Button>

          <div className="relative text-center text-sm text-muted-foreground py-2">
            <span className="bg-card px-2 relative z-10">o con email</span>
            <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Procesando…" : mode === "signin" ? "Entrar" : "Crear cuenta"}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground">
            {mode === "signin" ? (
              <>
                ¿Sin cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  Registrate
                </button>
              </>
            ) : (
              <>
                ¿Ya tenés cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  Iniciar sesión
                </button>
              </>
            )}
          </p>

          <p className="text-xs text-center text-muted-foreground">
            <Link to="/" className="hover:underline">
              ← Volver al inicio
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
