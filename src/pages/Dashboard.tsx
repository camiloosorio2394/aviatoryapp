import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Award,
  BookOpen,
  Brain,
  Clock,
  Flame,
  Plane,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type PilotStage =
  | "student_ppl"
  | "ppl"
  | "cpl_in_progress"
  | "cpl_ready"
  | "hour_building"
  | "airline_candidate"

interface PilotState {
  stage: PilotStage | null
  total_hours: number | null
  hours_pic: number | null
  licenses: string[] | null
  icao_english_level: number | null
  target_airline: string | null
  target_date: string | null
}

interface Profile {
  full_name: string | null
  username: string | null
}

interface Streak {
  current_streak: number
  longest_streak: number
  last_activity_date: string | null
}

interface Subscription {
  status: "trialing" | "active" | "past_due" | "canceled"
  plan: "free" | "pro_monthly" | "pro_annual" | "founder_lifetime"
  current_period_end: string | null
}

interface NextStep {
  title: string
  description: string
  href: string
  cta: string
}

const STAGE_LABEL: Record<PilotStage, string> = {
  student_ppl: "Estudiante PPL",
  ppl: "PPL emitido",
  cpl_in_progress: "Cursando CPL",
  cpl_ready: "CPL emitido",
  hour_building: "Hour building",
  airline_candidate: "Candidato a aerolínea",
}

// Coarse progress estimate per stage (0–100). Will be replaced with checklist-based math later.
const STAGE_PROGRESS: Record<PilotStage, number> = {
  student_ppl: 12,
  ppl: 28,
  cpl_in_progress: 47,
  cpl_ready: 64,
  hour_building: 78,
  airline_candidate: 92,
}

function buildNextStep(stage: PilotStage | null): NextStep {
  switch (stage) {
    case "student_ppl":
      return {
        title: "Aprobá Meteorología",
        description: "Tu primer examen Aerocivil. Empezá con 20 preguntas guiadas.",
        href: "/app/quiz",
        cta: "Empezar quiz",
      }
    case "ppl":
      return {
        title: "Arrancá CPL",
        description: "Inscribite a CPL en tu escuela y mantené el progreso teórico.",
        href: "/app/quiz",
        cta: "Estudiar CPL",
      }
    case "cpl_in_progress":
      return {
        title: "Preparate para Aerocivil",
        description: "Practicá los 6 ejes (meteorología, reglamento, navegación…) con simulacros.",
        href: "/app/quiz",
        cta: "Iniciar simulacro",
      }
    case "cpl_ready":
      return {
        title: "Subí tu inglés ICAO",
        description: "El próximo umbral es ICAO 4. Sin esto no entrás a aerolínea internacional.",
        href: "/app/quiz",
        cta: "Practicar inglés",
      }
    case "hour_building":
      return {
        title: "Comparate con aerolíneas",
        description: "Mirá qué te falta para Avianca, LATAM, Copa, Wingo.",
        href: "/app/aerolineas",
        cta: "Ver requisitos",
      }
    case "airline_candidate":
      return {
        title: "Preparate para la entrevista",
        description: "Simulacros técnicos y de comportamiento. Tu CV pulido.",
        href: "/app/aerolineas",
        cta: "Ver mi target",
      }
    default:
      return {
        title: "Completá tu perfil",
        description: "Necesitamos saber tu etapa para armar tu plan.",
        href: "/onboarding",
        cta: "Empezar onboarding",
      }
  }
}

function trialDaysLeft(end: string | null): number | null {
  if (!end) return null
  const diff = new Date(end).getTime() - Date.now()
  if (diff <= 0) return 0
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function Dashboard() {
  const { user } = useSession()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [pilot, setPilot] = useState<PilotState | null>(null)
  const [streak, setStreak] = useState<Streak | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [recentAttempts, setRecentAttempts] = useState<number>(0)

  useEffect(() => {
    if (!user) return
    let cancelled = false

    async function load() {
      try {
        const [profileRes, pilotRes, streakRes, subRes, attemptsRes] = await Promise.all([
          supabase.from("profiles").select("full_name, username").eq("id", user!.id).maybeSingle(),
          supabase
            .from("pilot_state")
            .select("stage, total_hours, hours_pic, licenses, icao_english_level, target_airline, target_date")
            .eq("user_id", user!.id)
            .maybeSingle(),
          supabase
            .from("streaks")
            .select("current_streak, longest_streak, last_activity_date")
            .eq("user_id", user!.id)
            .maybeSingle(),
          supabase
            .from("subscriptions")
            .select("status, plan, current_period_end")
            .eq("user_id", user!.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle(),
          supabase
            .from("quiz_attempts")
            .select("id", { count: "exact", head: true })
            .eq("user_id", user!.id),
        ])
        if (cancelled) return

        setProfile(profileRes.data as Profile | null)
        setPilot(pilotRes.data as PilotState | null)
        setStreak(streakRes.data as Streak | null)
        setSubscription(subRes.data as Subscription | null)
        setRecentAttempts(attemptsRes.count ?? 0)

        // Redirect to onboarding if pilot_state is empty
        const ps = pilotRes.data as PilotState | null
        if (!ps?.stage) {
          navigate("/onboarding", { replace: true })
          return
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "No pudimos cargar tu dashboard")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [user, navigate])

  if (loading) {
    return (
      <AppLayout>
        <div className="p-8 space-y-6 animate-pulse">
          <div className="h-8 w-64 bg-muted rounded-lg" />
          <div className="h-32 bg-muted rounded-2xl" />
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="h-28 bg-muted rounded-xl" />
            <div className="h-28 bg-muted rounded-xl" />
            <div className="h-28 bg-muted rounded-xl" />
          </div>
        </div>
      </AppLayout>
    )
  }

  const stage = pilot?.stage ?? null
  const stageLabel = stage ? STAGE_LABEL[stage] : "—"
  const progress = stage ? STAGE_PROGRESS[stage] : 0
  const firstName =
    profile?.full_name?.split(" ")[0] ??
    profile?.username ??
    user?.email?.split("@")[0] ??
    "piloto"
  const trialLeft = subscription?.status === "trialing" ? trialDaysLeft(subscription.current_period_end) : null
  const nextStep = buildNextStep(stage)

  return (
    <AppLayout>
      <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-6xl mx-auto space-y-8">
        {/* Greeting */}
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Hola, {firstName} ✈️
            </h1>
            <p className="mt-1 text-muted-foreground">
              {stageLabel} · {pilot?.total_hours ?? 0}h totales
              {pilot?.target_airline ? ` · target: ${pilot.target_airline}` : ""}
            </p>
          </div>
          {trialLeft !== null && (
            <Badge variant="secondary" className="rounded-full px-3 py-1.5 text-xs w-fit">
              <Sparkles className="h-3 w-3 mr-1 text-blue-600 dark:text-blue-400" />
              {trialLeft > 0 ? `Tu prueba: ${trialLeft} día${trialLeft !== 1 ? "s" : ""} restantes` : "Tu prueba expiró"}
            </Badge>
          )}
        </header>

        {/* Progress to airline */}
        <section className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-50 via-blue-50/40 to-transparent dark:from-blue-950/40 dark:via-blue-950/20 p-6 sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl"
          />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                <Plane className="h-3.5 w-3.5" />
                Tu progreso {pilot?.target_airline ? `a ${pilot.target_airline}` : "a aerolínea"}
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
                  {progress}%
                </span>
                <span className="inline-flex items-center text-sm text-green-600 dark:text-green-400 font-medium">
                  <TrendingUp className="h-4 w-4 mr-0.5" />
                  Etapa actual: {stageLabel}
                </span>
              </div>
            </div>
            <Button asChild size="lg" className="btn-apple shine-on-hover rounded-full h-12 px-6 border-0">
              <Link to={nextStep.href}>{nextStep.cta}</Link>
            </Button>
          </div>
          <div className="relative mt-6 h-2.5 rounded-full bg-blue-100 dark:bg-blue-950/60 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-[0_0_16px_rgb(37_99_235_/_50%)] transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* Next step + 3 KPI cards */}
        <section className="grid lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-border/60 bg-card card-apple p-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              Tu siguiente paso
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">{nextStep.title}</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">{nextStep.description}</p>
            <Button asChild className="btn-apple shine-on-hover rounded-full mt-5 h-10 px-5 border-0">
              <Link to={nextStep.href}>{nextStep.cta}</Link>
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <KpiCard
              icon={<Flame className="h-4 w-4 text-orange-500" />}
              label="Racha"
              value={`${streak?.current_streak ?? 0} ${streak?.current_streak === 1 ? "día" : "días"}`}
              sub={
                streak?.longest_streak
                  ? `Tu mejor: ${streak.longest_streak} días`
                  : "Empezá hoy 🔥"
              }
            />
            <KpiCard
              icon={<Award className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
              label="ICAO"
              value={pilot?.icao_english_level ? `Nivel ${pilot.icao_english_level}` : "—"}
              sub={pilot?.icao_english_level && pilot.icao_english_level < 4 ? "Subí a 4+ para aerolínea" : "Listo para internacional"}
            />
          </div>
        </section>

        {/* Stats row */}
        <section className="grid sm:grid-cols-3 gap-4">
          <StatCard
            icon={<Clock className="h-4 w-4" />}
            label="Horas totales"
            value={`${pilot?.total_hours ?? 0}h`}
            sub={`${pilot?.hours_pic ?? 0}h como PIC`}
          />
          <StatCard
            icon={<BookOpen className="h-4 w-4" />}
            label="Quizzes hechos"
            value={String(recentAttempts)}
            sub={recentAttempts === 0 ? "Empezá tu primer quiz" : "Seguí practicando"}
          />
          <StatCard
            icon={<Brain className="h-4 w-4" />}
            label="Licencias"
            value={(pilot?.licenses?.length ?? 0).toString()}
            sub={pilot?.licenses?.length ? pilot.licenses.join(" · ") : "Sin licencias cargadas"}
          />
        </section>

        {/* Upgrade banner if free + no trial left */}
        {subscription && subscription.plan === "free" && trialLeft === 0 && (
          <section className="rounded-2xl glass-blue text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">Tu prueba terminó</h3>
              <p className="mt-1 text-blue-100">
                Upgradeá a Pro para desbloquear quiz ilimitado, tutor IA, ICAO English y requisitos por aerolínea.
              </p>
            </div>
            <Button asChild size="lg" className="btn-apple-light shine-on-hover rounded-full h-12 px-6 border-0">
              <Link to="/pricing">Ver planes</Link>
            </Button>
          </section>
        )}
      </div>
    </AppLayout>
  )
}

function KpiCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card card-apple p-5">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-2 text-2xl font-bold tracking-tight">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card card-apple p-5">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <span className="text-blue-600 dark:text-blue-400">{icon}</span>
        {label}
      </div>
      <div className="mt-2 text-2xl font-bold tracking-tight">{value}</div>
      <div className="text-xs text-muted-foreground mt-1 truncate">{sub}</div>
    </div>
  )
}
