import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  BookOpen,
  Brain,
  Flame,
  Plane,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Trophy,
  Users,
  Lightbulb,
  Sun,
  Target,
  Activity,
} from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import { SectionTitle } from "@/components/ui/section-title"
import { CountUp } from "@/components/ui/count-up"
import { KpiTile } from "@/components/ui/kpi-tile"

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
  photo_url: string | null
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

interface Achievement {
  id: number
  code: string
  name: string
  description: string
  icon: string
  tier: "bronze" | "silver" | "gold" | "platinum"
  unlocked_at?: string
}

interface ActivityDay {
  date: string
  activities_count: number
  questions_answered: number
}

interface DailyQuizQuestion {
  question_id: number
  statement: string
  subject_name: string
}

interface Peer {
  user_id: string
  username: string
  current_streak: number
}

const STAGE_LABEL: Record<PilotStage, string> = {
  student_ppl: "Estudiante PPL",
  ppl: "Piloto Privado",
  cpl_in_progress: "Cursando CPL",
  cpl_ready: "Piloto Comercial",
  hour_building: "Hour Building",
  airline_candidate: "Candidato a Aerolínea",
}

const STAGE_IDENTITY: Record<PilotStage, string> = {
  student_ppl: "futuro piloto",
  ppl: "Piloto",
  cpl_in_progress: "futuro Capitán",
  cpl_ready: "Capitán",
  hour_building: "futuro First Officer",
  airline_candidate: "futuro First Officer",
}

const STAGE_PROGRESS: Record<PilotStage, number> = {
  student_ppl: 12,
  ppl: 28,
  cpl_in_progress: 47,
  cpl_ready: 64,
  hour_building: 78,
  airline_candidate: 92,
}

interface NextStep {
  title: string
  description: string
  href: string
  cta: string
  minutes: number
  icon: typeof BookOpen
  tone: "cyan" | "violet" | "blue" | "amber"
}

function buildTodayPlan(stage: PilotStage | null): NextStep[] {
  const baseQuiz: NextStep = {
    title: "Quiz de hoy",
    description: "10 preguntas Aerocivil PCA, listo en una pausa.",
    href: "/app/pca",
    cta: "Comenzar quiz",
    minutes: 12,
    icon: BookOpen,
    tone: "cyan",
  }
  const baseWingman: NextStep = {
    title: "Pregúntale a Wingman",
    description: "Aclará un concepto que te quedó dando vueltas.",
    href: "/app/pca",
    cta: "Abrir Wingman",
    minutes: 8,
    icon: Brain,
    tone: "violet",
  }
  const baseAirline: NextStep = {
    title: "Revisa tu match",
    description: "Mira qué te falta para postular a tu aerolínea objetivo.",
    href: "/app/aerolineas",
    cta: "Ver aerolíneas",
    minutes: 5,
    icon: Plane,
    tone: "blue",
  }
  const baseCommunity: NextStep = {
    title: "Saluda a tu cohorte",
    description: "Pilotos en tu misma etapa están activos hoy.",
    href: "/app/comunidad",
    cta: "Ir a comunidad",
    minutes: 3,
    icon: Users,
    tone: "amber",
  }

  if (!stage) return [baseQuiz, baseWingman, baseCommunity]
  switch (stage) {
    case "student_ppl":
    case "ppl":
      return [baseQuiz, baseWingman, baseCommunity]
    case "cpl_in_progress":
    case "cpl_ready":
      return [baseQuiz, baseWingman, baseAirline]
    case "hour_building":
    case "airline_candidate":
      return [baseAirline, baseQuiz, baseCommunity]
  }
}

function trialDaysLeft(end: string | null): number | null {
  if (!end) return null
  const diff = new Date(end).getTime() - Date.now()
  if (diff <= 0) return 0
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function greetingTime(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Buenos días"
  if (hour < 19) return "Buenas tardes"
  return "Buenas noches"
}

const COLOR_MAP: Record<string, string> = {
  cyan: "#0E7490",
  blue: "#2563EB",
  violet: "#7C3AED",
  amber: "#B45309",
  green: "#047857",
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
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([])
  const [heatmap, setHeatmap] = useState<ActivityDay[]>([])
  const [peers, setPeers] = useState<Peer[]>([])
  const [daily, setDaily] = useState<DailyQuizQuestion[]>([])

  useEffect(() => {
    if (!user) return
    let cancelled = false

    async function load() {
      try {
        const [profileRes, pilotRes, streakRes, subRes, attemptsRes, allAchievementsRes, userAchievementsRes, heatmapRes, peersRes, dailyRes] = await Promise.all([
          supabase.from("profiles").select("full_name, username, photo_url").eq("id", user!.id).maybeSingle(),
          supabase.from("pilot_state").select("stage, total_hours, hours_pic, licenses, icao_english_level, target_airline, target_date").eq("user_id", user!.id).maybeSingle(),
          supabase.from("streaks").select("current_streak, longest_streak, last_activity_date").eq("user_id", user!.id).maybeSingle(),
          supabase.from("subscriptions").select("status, plan, current_period_end").eq("user_id", user!.id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
          supabase.from("quiz_attempts").select("id", { count: "exact", head: true }).eq("user_id", user!.id),
          supabase.from("achievements").select("*").order("order_index"),
          supabase.from("user_achievements").select("achievement_id, unlocked_at, achievements(*)").eq("user_id", user!.id).order("unlocked_at", { ascending: false }).limit(4),
          supabase.rpc("get_activity_heatmap"),
          supabase.rpc("get_peers_in_stage", { p_limit: 5 }),
          supabase.rpc("get_daily_quiz"),
        ])

        supabase.rpc("check_my_expiries").then(() => undefined)
        if (cancelled) return

        setProfile(profileRes.data as Profile | null)
        const ps = pilotRes.data as PilotState | null
        setPilot(ps)
        setStreak(streakRes.data as Streak | null)
        setSubscription(subRes.data as Subscription | null)
        setRecentAttempts(attemptsRes.count ?? 0)

        setAllAchievements((allAchievementsRes.data ?? []) as Achievement[])

        type UARow = { unlocked_at: string; achievements: Achievement | Achievement[] | null }
        const unlocked: Achievement[] = []
        for (const row of (userAchievementsRes.data ?? []) as UARow[]) {
          const ach = Array.isArray(row.achievements) ? row.achievements[0] : row.achievements
          if (ach) unlocked.push({ ...ach, unlocked_at: row.unlocked_at })
        }
        setAchievements(unlocked)

        setHeatmap((heatmapRes.data ?? []) as ActivityDay[])
        setPeers((peersRes.data ?? []) as Peer[])
        setDaily((dailyRes.data ?? []) as DailyQuizQuestion[])

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

  const nextAchievement = useMemo(() => {
    const unlockedCodes = new Set(achievements.map((a) => a.code))
    return allAchievements.find((a) => !unlockedCodes.has(a.code))
  }, [achievements, allAchievements])

  if (loading) return <DashboardSkeleton />

  const stage = pilot?.stage ?? null
  const stageLabel = stage ? STAGE_LABEL[stage] : "—"
  const identity = stage ? STAGE_IDENTITY[stage] : "piloto"
  const progress = stage ? STAGE_PROGRESS[stage] : 0
  const firstName = profile?.full_name?.split(" ")[0] ?? profile?.username ?? user?.email?.split("@")[0] ?? "piloto"
  const trialLeft = subscription?.status === "trialing" ? trialDaysLeft(subscription.current_period_end) : null
  const todayPlan = buildTodayPlan(stage)

  const streakDays = streak?.current_streak ?? 0
  const longestStreak = streak?.longest_streak ?? 0
  const streakAtRisk =
    streakDays > 0 && streak?.last_activity_date
      ? new Date(streak.last_activity_date).toDateString() !== new Date().toDateString()
      : false

  return (
    <AppLayout streak={streakDays}>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        {/* Cockpit hero */}
        <CockpitHero
          firstName={firstName}
          identity={identity}
          stageLabel={stageLabel}
          totalHours={pilot?.total_hours ?? 0}
          targetAirline={pilot?.target_airline ?? null}
          streakDays={streakDays}
          progress={progress}
          firstStep={todayPlan[0]}
          trialLeft={trialLeft}
        />

        {/* Test inicial — solo si todavía no tiene nivel/estimación */}
        {!pilot?.icao_english_level && (
          <Link
            to="/app/test-inicial"
            className="mt-5 flex items-center justify-between gap-4 rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{ borderColor: "color-mix(in oklab, var(--av-blue-500) 32%, transparent)", background: "color-mix(in oklab, var(--av-blue-500) 6%, transparent)" }}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))" }}>
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>Empezá por acá</div>
                <div className="mt-0.5 text-[17px] font-extrabold tracking-[-0.01em]">Hacé tu test inicial</div>
                <div className="text-[13.5px] text-muted-foreground">Inglés ICAO + 2 por materia · ~15 min · descubrí tu Nivel Inicial.</div>
              </div>
            </div>
            <ArrowRight className="hidden sm:block h-5 w-5 flex-shrink-0 text-muted-foreground" />
          </Link>
        )}

        {/* Instrument cluster */}
        <div className="stagger grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-7 mb-7">
          <KpiTile eyebrow="Horas totales" value={pilot?.total_hours ?? 0} suffix="h" sparkline={[12, 18, 22, 19, 28, 24, 32]} sparklineColor="var(--av-cyan-400)" />
          <KpiTile eyebrow="Racha actual" value={streakDays} suffix="d" sparkline={[1, 2, 3, 4, 5, 6, streakDays || 1]} sparklineColor="var(--av-amber-400)" />
          <KpiTile eyebrow="Quizzes hechos" value={recentAttempts} sparkline={[2, 5, 4, 7, 9, 12, 8]} sparklineColor="var(--av-violet-400)" />
          <KpiTile eyebrow="ICAO English" value={pilot?.icao_english_level ?? 0} sparkline={[3, 3, 3.5, 4, 4, 4, pilot?.icao_english_level ?? 4]} sparklineColor="var(--av-green-400)" />
        </div>

        {/* Today's plan + Wingman insight */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-4 mb-7">
          <section>
            <SectionTitle
              icon={Target}
              eyebrow="Tu plan de hoy"
              title="3 micro-acciones para no romper la racha"
              hint="Cada paso suma. No tienes que hacer los 3 hoy."
            />
            <div className="stagger grid grid-cols-3 gap-3 mt-3">
              {todayPlan.map((step) => (
                <TodayCard key={step.title} step={step} />
              ))}
            </div>
          </section>
          <WingmanInsight stage={stage} recentAttempts={recentAttempts} icao={pilot?.icao_english_level ?? null} />
        </div>

        {/* Streak + Heatmap */}
        <div className="grid grid-cols-[minmax(280px,1fr)_2.2fr] gap-4 mb-7">
          <StreakCard current={streakDays} longest={longestStreak} atRisk={streakAtRisk} />
          <ActivityHeatmap data={heatmap} />
        </div>

        {/* Achievements + Cohort */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-4 mb-7">
          <AchievementsCard unlocked={achievements} next={nextAchievement ?? null} total={allAchievements.length} />
          <CohortCard peers={peers} stageLabel={stageLabel} />
        </div>

        {/* Daily quiz callout */}
        {daily.length > 0 && (
          <DailyQuizCard count={daily.length} firstSubject={daily[0]?.subject_name ?? null} />
        )}
      </div>
    </AppLayout>
  )
}

function CockpitHero({
  firstName,
  stageLabel,
  totalHours,
  targetAirline,
  streakDays,
  progress,
  firstStep,
  trialLeft,
}: {
  firstName: string
  identity?: string
  stageLabel: string
  totalHours: number
  targetAirline: string | null
  streakDays: number
  progress: number
  firstStep: NextStep
  trialLeft: number | null
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 sm:p-8">
      <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="min-w-0">
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            {stageLabel}
            {targetAirline ? ` · objetivo ${targetAirline}` : ""}
          </div>
          <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.05]">
            {greetingTime()}, {firstName} 👋
          </h1>
          <p className="mt-2 text-[15px] text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{totalHours}h totales</span>
            {streakDays > 0 && (
              <>
                <span className="text-muted-foreground/40">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5" style={{ color: "var(--av-amber-400)" }} />
                  {streakDays} días de racha
                </span>
              </>
            )}
          </p>

          {/* Progress to airline */}
          <div className="mt-6 max-w-[560px]">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[13px] font-semibold text-muted-foreground">
                Tu avance a aerolínea
              </span>
              <span
                className="tabular-nums text-2xl font-extrabold tracking-[-0.03em]"
                style={{ color: "var(--av-blue-500)" }}
              >
                <CountUp to={progress} />%
              </span>
            </div>
            <div className="relative h-2.5 rounded-full overflow-hidden bg-muted">
              <div
                className="h-full rounded-full transition-[width] duration-1000"
                style={{ width: `${progress}%`, background: "var(--av-blue-500)" }}
              />
            </div>
          </div>
        </div>

        {/* Right CTA */}
        <div className="flex flex-col items-start lg:items-end gap-2.5">
          {trialLeft !== null && trialLeft > 0 && (
            <span
              className="inline-flex items-center gap-1.5 text-[12px] font-bold px-2.5 py-1 rounded-full"
              style={{
                color: "#B45309",
                background: "color-mix(in oklab, var(--av-amber-400) 18%, transparent)",
              }}
            >
              <Sparkles className="h-3 w-3" /> Prueba: {trialLeft} día{trialLeft !== 1 ? "s" : ""}
            </span>
          )}
          <Link
            to={firstStep.href}
            className="inline-flex items-center gap-1.5 h-11 px-5 rounded-xl font-semibold text-[15px] text-white transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--av-blue-500)" }}
          >
            {firstStep.cta} <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="text-[12px] text-muted-foreground">~{firstStep.minutes} min</div>
        </div>
      </div>
    </section>
  )
}

function TodayCard({ step }: { step: NextStep }) {
  const Ic = step.icon
  const accent = COLOR_MAP[step.tone]
  return (
    <Link
      to={step.href}
      className="relative overflow-hidden rounded-2xl border border-border bg-card p-[18px] cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md block"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `color-mix(in oklab, ${accent} 45%, transparent)`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)"
      }}
    >
      <div className="relative">
        <div className="flex items-center justify-between">
          <div
            className="w-[38px] h-[38px] rounded-lg flex items-center justify-center"
            style={{
              background: `color-mix(in oklab, ${accent} 14%, transparent)`,
              color: accent,
              border: `1px solid color-mix(in oklab, ${accent} 28%, transparent)`,
            }}
          >
            <Ic className="h-[18px] w-[18px]" />
          </div>
          <span className="tabular-nums text-[12px] text-muted-foreground">
            ~{step.minutes} min
          </span>
        </div>
        <div className="mt-3.5 text-sm font-bold text-foreground tracking-[-0.015em]">{step.title}</div>
        <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{step.description}</div>
        <div
          className="mt-3.5 inline-flex items-center gap-1 text-xs font-semibold"
          style={{ color: accent }}
        >
          {step.cta} <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </Link>
  )
}

function WingmanInsight({
  stage,
  recentAttempts,
  icao,
}: {
  stage: PilotStage | null
  recentAttempts: number
  icao: number | null
}) {
  const insight = (() => {
    if (recentAttempts === 0) {
      return {
        title: "Empieza con Meteorología",
        body: "Es la materia más densa y la que más cae en el examen Aerocivil. Si la dominás primero, el resto fluye.",
        cta: "Comenzar Meteo",
        href: "/app/pca/quiz/meteorologia",
      }
    }
    if (icao && icao < 4) {
      return {
        title: "Sube tu inglés ICAO a 4",
        body: "Tienes todo lo técnico pero el inglés te está frenando. Esta semana enfoca 30 min/día en ICAO English.",
        cta: "Practicar inglés",
        href: "/app/pca",
      }
    }
    if (stage === "hour_building" || stage === "airline_candidate") {
      return {
        title: "Tu CV está rezagado",
        body: "Tienes horas y exámenes, pero faltan los detalles. Pasa 20 min puliendo tu hoja de vida.",
        cta: "Ver requisitos",
        href: "/app/aerolineas",
      }
    }
    return {
      title: "Diversificá las materias",
      body: "Llevas varios quizzes de la misma materia. Prueba otra: tu cerebro consolida mejor con variedad.",
      cta: "Ver materias",
      href: "/app/pca",
    }
  })()

  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-5"
      style={{
        background: "color-mix(in oklab, #7C3AED 5%, var(--card))",
        borderColor: "color-mix(in oklab, #7C3AED 22%, var(--border))",
      }}
    >
      <div className="relative">
        <div
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
          style={{ color: "#7C3AED" }}
        >
          <Sparkles className="h-3.5 w-3.5" /> Insight de Wingman
        </div>
        <h3 className="mt-2.5 text-lg font-bold tracking-[-0.02em] text-foreground">{insight.title}</h3>
        <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{insight.body}</p>
        <Link
          to={insight.href}
          className="inline-flex items-center gap-1.5 mt-3.5 h-9 px-3 rounded-lg border border-border bg-background text-xs font-semibold text-foreground hover:bg-muted transition-colors"
        >
          <Lightbulb className="h-3 w-3" /> {insight.cta}
        </Link>
      </div>
    </div>
  )
}

function StreakCard({ current, longest, atRisk }: { current: number; longest: number; atRisk: boolean }) {
  const isZero = current === 0
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5">
      <div className="relative">
        <div
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
          style={{ color: "#B45309" }}
        >
          <Flame className="h-3.5 w-3.5" /> Tu racha
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span
            className="mono tabular-nums text-[64px] font-bold leading-none tracking-[-0.05em]"
            style={
              isZero
                ? { color: "var(--muted-foreground)" }
                : {
                    background:
                      "linear-gradient(135deg, var(--av-amber-400) 0%, oklch(0.7 0.22 25) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }
            }
          >
            <CountUp to={current} />
          </span>
          <span className="text-sm text-muted-foreground font-semibold">
            {current === 1 ? "día" : "días"}
          </span>
        </div>
        {longest > current && (
          <p className="mt-2 mono tabular-nums text-xs text-muted-foreground">
            Mejor racha: <span className="font-semibold text-foreground">{longest} días</span>
          </p>
        )}

        {atRisk && current > 0 && (
          <div
            className="mt-4 flex items-start gap-2 rounded-xl p-3"
            style={{
              background: "color-mix(in oklab, var(--av-amber-400) 12%, transparent)",
              border: "1px solid color-mix(in oklab, var(--av-amber-400) 30%, transparent)",
            }}
          >
            <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--av-amber-400)" }} />
            <div>
              <div
                className="text-xs font-bold"
                style={{ color: "var(--av-amber-400)" }}
              >
                Tu racha está en riesgo
              </div>
              <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                Si no estudias hoy se reinicia.
              </p>
            </div>
          </div>
        )}

        {isZero && (
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Una pregunta hoy enciende tu racha 🔥
          </p>
        )}

        <div className="div-dotted my-4" />
        <div className="flex gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1.5 rounded-full"
              style={{
                background: i < current ? "var(--av-amber-400)" : "var(--muted)",
                boxShadow: i < current ? "0 0 6px var(--av-amber-400)" : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ActivityHeatmap({ data }: { data: ActivityDay[] }) {
  const weeks: ActivityDay[][] = []
  for (let i = 0; i < data.length; i += 7) weeks.push(data.slice(i, i + 7))
  const total = data.reduce((a, d) => a + d.activities_count, 0)
  const color = (c: number) => {
    if (c === 0) return "var(--muted)"
    if (c === 1) return "color-mix(in oklab, var(--av-blue-500) 25%, transparent)"
    if (c <= 3) return "color-mix(in oklab, var(--av-blue-500) 50%, transparent)"
    if (c <= 5) return "color-mix(in oklab, var(--av-blue-500) 80%, transparent)"
    return "var(--av-blue-500)"
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <div
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
            style={{ color: "var(--av-blue-500)" }}
          >
            <Activity className="h-3.5 w-3.5" /> Tu actividad
          </div>
          <div className="text-sm font-semibold text-foreground mt-0.5">Últimas 12 semanas</div>
        </div>
        <div className="text-right">
          <div className="tabular-nums text-[22px] font-extrabold text-foreground tracking-[-0.03em]">
            <CountUp to={total} />
          </div>
          <div className="text-[11px] text-muted-foreground">actividades</div>
        </div>
      </div>
      <div className="flex gap-1 items-start">
        <div className="flex flex-col gap-[3px] mt-0.5 mr-1">
          {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
            <div
              key={i}
              className="mono text-[11px] text-muted-foreground text-right"
              style={{ height: 14, lineHeight: "14px", width: 12 }}
            >
              {i % 2 === 0 ? d : ""}
            </div>
          ))}
        </div>
        <div className="flex gap-[3px] overflow-x-auto flex-1 pb-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((d) => (
                <div
                  key={d.date}
                  className="w-[14px] h-[14px] rounded-[3px] transition-transform hover:scale-150 cursor-pointer"
                  style={{ background: color(d.activities_count) }}
                  title={`${d.date} · ${d.activities_count} actividad${d.activities_count !== 1 ? "es" : ""}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3.5 flex items-center gap-1.5 text-[12px] text-muted-foreground justify-end">
        <span>Menos</span>
        {[0, 1, 3, 5, 7].map((c) => (
          <div key={c} className="w-[11px] h-[11px] rounded-[3px]" style={{ background: color(c) }} />
        ))}
        <span>Más</span>
      </div>
    </div>
  )
}

function AchievementsCard({
  unlocked,
  next,
  total,
}: {
  unlocked: Achievement[]
  next: Achievement | null
  total: number
}) {
  const TIER_GRAD: Record<Achievement["tier"], string> = {
    bronze: "linear-gradient(135deg, oklch(0.75 0.12 60), oklch(0.55 0.15 40))",
    silver: "linear-gradient(135deg, oklch(0.85 0.01 250), oklch(0.55 0.02 250))",
    gold: "linear-gradient(135deg, oklch(0.85 0.14 85), oklch(0.65 0.16 65))",
    platinum: "linear-gradient(135deg, var(--av-cyan-300), var(--av-violet-400))",
  }
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <SectionTitle
        icon={Trophy}
        eyebrow="Logros"
        title={`${unlocked.length} / ${total} desbloqueados`}
        right={
          <Link
            to="/app/perfil"
            className="text-xs font-semibold inline-flex items-center gap-1 hover:gap-1.5 transition-all"
            style={{ color: "var(--av-blue-500)" }}
          >
            Ver todos <ArrowRight className="h-3 w-3" />
          </Link>
        }
      />
      {unlocked.length === 0 ? (
        <div className="py-6 text-center">
          <div
            className="inline-flex items-center justify-center h-14 w-14 rounded-2xl mb-3 text-2xl"
            style={{
              background: "color-mix(in oklab, var(--av-amber-400) 10%, transparent)",
              color: "var(--av-amber-400)",
            }}
          >
            🏆
          </div>
          <p className="text-sm text-muted-foreground">Tu primer logro está a un quiz de distancia.</p>
        </div>
      ) : (
        <div className="grid grid-cols-8 gap-2.5">
          {unlocked.slice(0, 8).map((a) => (
            <div key={a.code} className="aspect-square relative group" title={`${a.name}: ${a.description}`}>
              <div
                className="w-full h-full rounded-xl flex items-center justify-center text-xl transition-transform hover:scale-110 cursor-pointer"
                style={{
                  background: TIER_GRAD[a.tier],
                  boxShadow:
                    "0 4px 12px -4px rgb(0 0 0 / 20%), inset 0 1px 0 rgb(255 255 255 / 25%)",
                }}
              >
                {a.icon}
              </div>
            </div>
          ))}
        </div>
      )}

      {next && (
        <>
          <div className="div-dotted my-4" />
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-lg opacity-40"
              style={{ background: TIER_GRAD[next.tier], filter: "grayscale(0.5)" }}
            >
              {next.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="mono text-[11px] text-muted-foreground tracking-[0.12em] uppercase font-bold">
                Próximo
              </div>
              <div className="text-sm font-semibold text-foreground truncate">{next.name}</div>
              <div className="text-xs text-muted-foreground truncate">{next.description}</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function CohortCard({ peers, stageLabel }: { peers: Peer[]; stageLabel: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <SectionTitle icon={Users} eyebrow="Tu cohorte" title={`${peers.length} pilotos en ${stageLabel}`} />
      {peers.length === 0 ? (
        <div className="py-6 text-center text-sm text-muted-foreground">
          Aún no hay otros pilotos en tu etapa.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {peers.map((p) => (
            <div
              key={p.user_id}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-colors hover:bg-muted/50"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                style={{
                  background: "linear-gradient(135deg, var(--av-blue-400), var(--av-navy-800))",
                  boxShadow: "0 2px 8px -2px rgb(0 0 0 / 25%)",
                }}
              >
                {p.username[0]?.toUpperCase() ?? "?"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="mono text-[14px] font-semibold text-foreground">@{p.username}</div>
              </div>
              {p.current_streak > 0 && (
                <div className="chip chip-amber mono tabular-nums">
                  <Flame className="h-2.5 w-2.5" /> {p.current_streak}d
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function DailyQuizCard({ count, firstSubject }: { count: number; firstSubject: string | null }) {
  return (
    <Link
      to="/app/pca"
      className="anim-fade-up relative overflow-hidden flex items-center justify-between gap-4 rounded-2xl p-6 text-white"
      style={{
        background: "linear-gradient(135deg, var(--av-amber-400) 0%, oklch(0.7 0.18 65) 100%)",
        boxShadow:
          "0 16px 40px -16px oklch(0.7 0.18 65 / 50%), inset 0 1px 0 rgb(255 255 255 / 25%)",
      }}
    >
      <div
        className="absolute -right-10 -top-10 w-[200px] h-[200px] rounded-full"
        style={{ background: "white", opacity: 0.08 }}
      />
      <div className="relative flex items-center gap-4">
        <div
          className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center"
          style={{
            background: "rgb(255 255 255 / 20%)",
            boxShadow: "inset 0 1px 0 rgb(255 255 255 / 30%)",
          }}
        >
          <Sun className="h-6 w-6" />
        </div>
        <div>
          <div className="text-[12px] font-bold tracking-[0.08em] uppercase opacity-85">
            Quiz del día
          </div>
          <div className="text-xl font-bold tracking-[-0.02em]">
            {count} preguntas{firstSubject ? ` · empezá con ${firstSubject}` : ""}
          </div>
          <div className="text-xs opacity-85 mt-0.5">
            Curadas para vos. Se renueva mañana — no las dejes pasar.
          </div>
        </div>
      </div>
      <span
        className="inline-flex items-center gap-1.5 h-11 px-5 rounded-xl font-bold text-sm flex-shrink-0"
        style={{ background: "white", color: "#B45309", boxShadow: "0 8px 24px -8px rgb(0 0 0 / 30%)" }}
      >
        Empezar quiz <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  )
}

function DashboardSkeleton() {
  return (
    <AppLayout>
      <div className="px-7 py-7 max-w-[1480px] mx-auto space-y-6 animate-pulse">
        <div className="h-8 w-64 bg-muted rounded-lg" />
        <div className="h-44 bg-muted rounded-2xl" />
        <div className="grid grid-cols-4 gap-3.5">
          <div className="h-28 bg-muted rounded-xl" />
          <div className="h-28 bg-muted rounded-xl" />
          <div className="h-28 bg-muted rounded-xl" />
          <div className="h-28 bg-muted rounded-xl" />
        </div>
        <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
          <div className="h-40 bg-muted rounded-xl" />
          <div className="h-40 bg-muted rounded-xl" />
        </div>
      </div>
    </AppLayout>
  )
}
