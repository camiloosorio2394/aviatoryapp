import { useEffect, useMemo, useRef, useState, type FormEvent } from "react"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import {
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Check,
  Plane,
  AtSign,
  X,
} from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogoHorizontal, LogoIsotype } from "@/components/Logo"

type Mode = "signin" | "signup"

interface LocationStateFrom {
  from?: { pathname?: string }
}

const benefits = [
  "Plan de estudio personalizado por etapa",
  "Banco de preguntas Aerocivil PPL/CPL",
  "Tutor IA que te explica cada respuesta",
  "Requisitos por aerolínea siempre al día",
  "Comunidad de pilotos LATAM",
]

const USERNAME_REGEX = /^[a-z0-9_]{3,30}$/

type UsernameStatus =
  | { state: "idle" }
  | { state: "invalid"; reason: string }
  | { state: "checking" }
  | { state: "available" }
  | { state: "taken" }

export function Login() {
  const [searchParams] = useSearchParams()
  const initialMode: Mode = searchParams.get("mode") === "signup" ? "signup" : "signin"

  const [mode, setMode] = useState<Mode>(initialMode)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>({ state: "idle" })

  const navigate = useNavigate()
  const location = useLocation()
  const { session, isLoading } = useSession()

  const from = (location.state as LocationStateFrom | null)?.from?.pathname ?? "/app"
  const isSignup = mode === "signup"

  useEffect(() => {
    if (!isLoading && session) navigate(from, { replace: true })
  }, [session, isLoading, navigate, from])

  useEffect(() => {
    const m = searchParams.get("mode") === "signup" ? "signup" : "signin"
    setMode(m)
  }, [searchParams])

  // Username availability check (debounced)
  const checkTimer = useRef<number | undefined>(undefined)
  useEffect(() => {
    if (!isSignup) return
    if (!username) {
      setUsernameStatus({ state: "idle" })
      return
    }
    if (!USERNAME_REGEX.test(username)) {
      setUsernameStatus({
        state: "invalid",
        reason: "3–30 caracteres, minúsculas, números o _",
      })
      return
    }
    setUsernameStatus({ state: "checking" })
    window.clearTimeout(checkTimer.current)
    checkTimer.current = window.setTimeout(async () => {
      const { data, error } = await supabase.rpc("check_username_available", {
        p_username: username,
      })
      if (error) {
        setUsernameStatus({ state: "idle" })
        return
      }
      setUsernameStatus({ state: data ? "available" : "taken" })
    }, 400)
    return () => window.clearTimeout(checkTimer.current)
  }, [username, isSignup])

  const passwordChecks = useMemo(
    () => ({
      length: password.length >= 8,
      digit: /\d/.test(password),
      match: confirm.length > 0 && confirm === password,
    }),
    [password, confirm]
  )

  const canSubmit = useMemo(() => {
    if (!email) return false
    if (isSignup) {
      if (usernameStatus.state !== "available") return false
      if (!passwordChecks.length || !passwordChecks.digit || !passwordChecks.match) return false
    } else {
      if (!password) return false
    }
    return true
  }, [email, isSignup, usernameStatus.state, passwordChecks, password])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      if (isSignup) {
        // Double-check username right before signup (race-safe)
        const { data: stillAvailable, error: checkErr } = await supabase.rpc(
          "check_username_available",
          { p_username: username }
        )
        if (checkErr) throw checkErr
        if (!stillAvailable) {
          setUsernameStatus({ state: "taken" })
          throw new Error("Ese usuario ya fue tomado mientras escribías. Probá otro.")
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
          },
        })
        if (error) throw error
        if (data.session) {
          navigate("/onboarding", { replace: true })
        } else {
          toast.success("Te enviamos un email de confirmación. Revisá tu bandeja.")
          setMode("signin")
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Algo salió mal"
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGoogle() {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/app` },
    })
    if (error) setError(error.message)
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-5 bg-background">
      {/* LEFT — brand panel */}
      <aside className="hidden lg:flex lg:col-span-2 relative overflow-hidden flex-col justify-between p-12 text-white">
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900" />
        <div aria-hidden className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative">
          <Link to="/" className="inline-flex items-center gap-3">
            <LogoIsotype variant="color" className="h-10 w-10 rounded-xl shadow-lg" />
            <span className="text-xl font-semibold tracking-tight">Aviatory</span>
          </Link>
        </div>

        <div className="relative space-y-8">
          <div>
            <Plane className="h-7 w-7 mb-6 text-blue-200" />
            <h2 className="text-4xl font-bold tracking-tight leading-tight text-balance">
              {isSignup
                ? "Empezá hoy. Llegá a la cabina antes."
                : "Bienvenido de vuelta a tu próximo vuelo."}
            </h2>
            <p className="mt-4 text-blue-100/90 text-lg leading-relaxed">
              {isSignup
                ? "Sumate a la plataforma para pilotos LATAM que llegan a aerolínea."
                : "Tu progreso, tu plan, tu comunidad — te esperan."}
            </p>
          </div>

          <ul className="space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-blue-50">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-sm">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative text-xs text-blue-200/70">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 border-2 border-blue-700" />
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 border-2 border-blue-700" />
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-300 to-purple-500 border-2 border-blue-700" />
            </div>
            <span>Cientos de pilotos LATAM ya están adentro.</span>
          </div>
        </div>
      </aside>

      {/* RIGHT — form */}
      <section className="lg:col-span-3 flex flex-col">
        <header className="p-6 lg:p-8 flex items-center justify-between">
          <Link to="/" className="lg:hidden">
            <LogoHorizontal className="h-8 w-auto" />
          </Link>
          <Link
            to="/"
            className="ml-auto inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </header>

        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-md">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
              {isSignup ? "Crea tu cuenta" : "Iniciá sesión"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {isSignup
                ? "7 días gratis. Sin tarjeta. Cancelás cuando quieras."
                : "Bienvenido de vuelta. Ingresá para seguir."}
            </p>

            <div className="mt-8 space-y-3">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full h-12 rounded-full text-sm font-medium border-2 hover:border-blue-500/40 transition-all hover:-translate-y-0.5"
                onClick={handleGoogle}
              >
                <GoogleIcon className="h-5 w-5" />
                Continuar con Google
              </Button>
            </div>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">o con tu email</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="vos@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>

              {isSignup && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="username" className="text-sm">Usuario</Label>
                    <span className="text-xs text-muted-foreground">único en la comunidad</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <AtSign className="h-4 w-4" />
                    </span>
                    <Input
                      id="username"
                      type="text"
                      autoComplete="username"
                      placeholder="capi_juanma"
                      required
                      value={username}
                      onChange={(e) =>
                        setUsername(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9_]/g, "")
                            .slice(0, 30)
                        )
                      }
                      className="h-12 rounded-xl pl-9 pr-11"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      <UsernameIndicator status={usernameStatus} />
                    </span>
                  </div>
                  <UsernameHint status={usernameStatus} />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm">Contraseña</Label>
                  {!isSignup && (
                    <button
                      type="button"
                      className="text-xs text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      onClick={() => toast.info("Pronto disponible. Por ahora escribinos a hola@aviatory.app")}
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={isSignup ? "new-password" : "current-password"}
                    placeholder={isSignup ? "Mínimo 8 caracteres + un número" : "Tu contraseña"}
                    required
                    minLength={isSignup ? 8 : 1}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {isSignup && password.length > 0 && (
                  <PasswordRules length={passwordChecks.length} digit={passwordChecks.digit} />
                )}
              </div>

              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="confirm" className="text-sm">Confirmá tu contraseña</Label>
                  <div className="relative">
                    <Input
                      id="confirm"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Repetí la contraseña"
                      required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      className={`h-12 rounded-xl pr-11 ${
                        confirm.length > 0 && !passwordChecks.match
                          ? "border-red-300 focus-visible:ring-red-300/40"
                          : ""
                      }`}
                    />
                    {confirm.length > 0 && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2">
                        {passwordChecks.match ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                      </span>
                    )}
                  </div>
                  {confirm.length > 0 && !passwordChecks.match && (
                    <p className="text-xs text-red-600 dark:text-red-400">Las contraseñas no coinciden</p>
                  )}
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900/50 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={submitting || !canSubmit}
                className="btn-apple shine-on-hover w-full h-12 rounded-full text-base border-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isSignup ? "Creando cuenta…" : "Iniciando sesión…"}
                  </>
                ) : (
                  <>
                    {isSignup ? "Crear cuenta gratis" : "Entrar"}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>

              {isSignup && (
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  Al crear tu cuenta aceptás los{" "}
                  <Link to="/" className="underline hover:text-foreground">Términos</Link> y la{" "}
                  <Link to="/" className="underline hover:text-foreground">Política de privacidad</Link>.
                </p>
              )}
            </form>

            <p className="mt-8 text-sm text-center text-muted-foreground">
              {isSignup ? (
                <>
                  ¿Ya tenés cuenta?{" "}
                  <Link to="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                    Iniciá sesión
                  </Link>
                </>
              ) : (
                <>
                  ¿No tenés cuenta todavía?{" "}
                  <Link to="/login?mode=signup" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                    Empezá gratis
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

function PasswordRules({ length, digit }: { length: boolean; digit: boolean }) {
  return (
    <ul className="space-y-1 mt-1 text-xs">
      <Rule met={length} text="Al menos 8 caracteres" />
      <Rule met={digit} text="Incluye un número" />
    </ul>
  )
}

function Rule({ met, text }: { met: boolean; text: string }) {
  return (
    <li
      className={`flex items-center gap-1.5 transition-colors ${
        met ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
      }`}
    >
      {met ? <Check className="h-3 w-3" /> : <span className="h-3 w-3 inline-flex items-center justify-center"><span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" /></span>}
      {text}
    </li>
  )
}

function UsernameIndicator({ status }: { status: UsernameStatus }) {
  switch (status.state) {
    case "checking":
      return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
    case "available":
      return <Check className="h-4 w-4 text-green-600" />
    case "taken":
    case "invalid":
      return <X className="h-4 w-4 text-red-500" />
    default:
      return null
  }
}

function UsernameHint({ status }: { status: UsernameStatus }) {
  switch (status.state) {
    case "invalid":
      return <p className="text-xs text-muted-foreground">{status.reason}</p>
    case "checking":
      return <p className="text-xs text-muted-foreground">Verificando disponibilidad…</p>
    case "available":
      return <p className="text-xs text-green-600 dark:text-green-400">Disponible ✓</p>
    case "taken":
      return <p className="text-xs text-red-600 dark:text-red-400">Ese usuario ya está tomado</p>
    default:
      return <p className="text-xs text-muted-foreground">3–30 caracteres, minúsculas, números o _</p>
  }
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}
