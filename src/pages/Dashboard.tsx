import { useEffect, useMemo, useState } from "react"
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
  AlertTriangle,
  ArrowRight,
  Trophy,
  Users,
  Calendar,
  Lightbulb,
} from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserAvatar } from "@/components/UserAvatar"

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

// Identity priming — call them by who they're becoming, not just who they are
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
  icon: React.ComponentType<{ className?: string }>
}

// Implementation intentions — 3 specific micro-actions for today
function buildTodayPlan(stage: PilotStage | null): NextStep[] {
  const baseQuiz: NextStep = {
    title: "Quiz de hoy",
    description: "10 preguntas Aerocivil PCA, listo en una pausa.",
    href: "/app/quiz",
    cta: "Comenzar quiz",
    minutes: 12,
    icon: BookOpen,
  }
  const baseWingman: NextStep = {
    title: "Pregúntale a Wingman",
    description: "Aclará un concepto que te quedó dando vueltas la semana pasada.",
    href: "/app/quiz",
    cta: "Abrir Wingman",
    minutes: 8,
    icon: Brain,
  }
  const baseAirline: NextStep = {
    title: "Revisá tu match",
    description: "Mirá qué te falta para postular a tu aerolínea objetivo.",
    href: "/app/aerolineas",
    cta: "Ver aerolíneas",
    minutes: 5,
    icon: Plane,
  }
  const baseCommunity: NextStep = {
    title: "Saluda a tu cohorte",
    description: "Pilotos en tu misma etapa están activos hoy.",
    href: "/app/comunidad",
    cta: "Ir a comunidad",
    minutes: 3,
    icon: Users,
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

  useEffect(() => {
    if (!user) return
    let cancelled = false

    async function load() {
      try {
        const [
          profileRes,
          pilotRes,
          streakRes,
          subRes,
          attemptsRes,
          allAchievementsRes,
          userAchievementsRes,
          heatmapRes,
          peersRes,
        ] = await Promise.all([
          supabase.from("profiles").select("full_name, username, photo_url").eq("id", user!.id).maybeSingle(),
          supabase
            .from("pilot_state")
            .select(
              "stage, total_hours, hours_pic, licenses, icao_english_level, target_airline, target_date"
            )
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
          supabase.from("achievements").select("*").order("order_index"),
          supabase
            .from("user_achievements")
            .select("achievement_id, unlocked_at, achievements(*)")
            .eq("user_id", user!.id)
            .order("unlocked_at", { ascending: false })
            .limit(4),
          supabase.rpc("get_activity_heatmap"),
          supabase.rpc("get_peers_in_stage", { p_limit: 5 }),
        ])
        if (cancelled) return

        setProfile(profileRes.data as Profile | null)
        const ps = pilotRes.data as PilotState | null
        setPilot(ps)
        setStreak(streakRes.data as Streak | null)
        setSubscription(subRes.data as Subscription | null)
        setRecentAttempts(attemptsRes.count ?? 0)

        setAllAchievements((allAchievementsRes.data ?? []) as Achievement[])

        type UARow = {
          unlocked_at: string
          achievements: Achievement | Achievement[] | null
        }
        const unlocked: Achievement[] = []
        for (const row of (userAchievementsRes.data ?? []) as UARow[]) {
          const ach = Array.isArray(row.achievements)
            ? row.achievements[0]
            : row.achievements
          if (ach) unlocked.push({ ...ach, unlocked_at: row.unlocked_at })
        }
        setAchievements(unlocked)

        setHeatmap((heatmapRes.data ?? []) as ActivityDay[])
        setPeers((peersRes.data ?? []) as Peer[])

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
  const firstName =
    profile?.full_name?.split(" ")[0] ??
    profile?.username ??
    user?.email?.split("@")[0] ??
    "piloto"
  const trialLeft =
    subscription?.status === "trialing"
      ? trialDaysLeft(subscription.current_period_end)
      : null
  const todayPlan = buildTodayPlan(stage)

  // Loss-aversion framing on streak
  const streakDays = streak?.current_streak ?? 0
  const longestStreak = streak?.longest_streak ?? 0
  const streakAtRisk = streakDays > 0 && streak?.last_activity_date
    ? (new Date(streak.last_activity_date).toDateString() !== new Date().toDateString())
    : false

  return (
    <AppLayout>
      <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-7xl mx-auto space-y-8">
        {/* Greeting with identity priming */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <UserAvatar
              photoUrl={profile?.photo_url}
              username={profile?.username}
              fullName={profile?.full_name}
              email={user?.email}
              size="xl"
              ring
              className="!h-14 !w-14 !text-lg"
            />
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                {greetingTime()}, {firstName}
              </p>
              <h1 className="mt-0.5 text-3xl sm:text-4xl font-bold tracking-[-0.03em]">
                Hola, <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">{identity}</span> ✈️
              </h1>
              <p className="mt-1 text-sm text-muted-foreground tabular">
                {stageLabel} · {pilot?.total_hours ?? 0}h totales
                {pilot?.target_airline ? ` · objetivo: ${pilot.target_airline}` : ""}
              </p>
            </div>
          </div>
          {trialLeft !== null && (
            <Badge variant="secondary" className="rounded-full px-3 py-1.5 text-xs w-fit">
              <Sparkles className="h-3 w-3 mr-1 text-blue-600 dark:text-blue-400" />
              {trialLeft > 0
                ? `Tu prueba: ${trialLeft} día${trialLeft !== 1 ? "s" : ""} restantes`
                : "Tu prueba expiró"}
            </Badge>
          )}
        </header>

        {/* Hero progress card */}
        <ProgressHero
          progress={progress}
          targetAirline={pilot?.target_airline ?? null}
          stageLabel={stageLabel}
          firstStep={todayPlan[0]}
        />

        {/* Today's plan — implementation intentions */}
        <section>
          <SectionTitle
            icon={<Calendar className="h-4 w-4" />}
            title="Tu plan de hoy"
            subtitle="3 micro-acciones para mantener el ritmo"
          />
          <div className="mt-5 grid sm:grid-cols-3 gap-4">
            {todayPlan.map((step) => (
              <TodayActionCard key={step.title} step={step} />
            ))}
          </div>
        </section>

        {/* Streak + Heatmap — loss aversion + progress visualization */}
        <section className="grid lg:grid-cols-[1fr_2fr] gap-6">
          <StreakCard
            current={streakDays}
            longest={longestStreak}
            atRisk={streakAtRisk}
          />
          <HeatmapCard data={heatmap} />
        </section>

        {/* Achievements + Wingman insight */}
        <section className="grid lg:grid-cols-[2fr_1fr] gap-6">
          <AchievementsCard
            unlocked={achievements}
            next={nextAchievement ?? null}
          />
          <WingmanInsightCard
            stage={stage}
            recentAttempts={recentAttempts}
            icao={pilot?.icao_english_level ?? null}
          />
        </section>

        {/* Stats + Peers */}
        <section className="grid lg:grid-cols-3 gap-4">
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
            sub={recentAttempts === 0 ? "Comenzá tu primer quiz" : "Seguí practicando"}
          />
          <StatCard
            icon={<Award className="h-4 w-4" />}
            label="Inglés ICAO"
            value={
              pilot?.icao_english_level
                ? `Nivel ${pilot.icao_english_level}`
                : "—"
            }
            sub={
              pilot?.icao_english_level && pilot.icao_english_level < 4
                ? "Subí a 4+ para aerolínea"
                : "Listo para internacional"
            }
          />
        </section>

        <PeersCard peers={peers} stageLabel={stageLabel} />

        {/* Upgrade banner */}
        {subscription && subscription.plan === "free" && trialLeft === 0 && (
          <section className="rounded-2xl glass-blue text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">Tu prueba terminó</h3>
              <p className="mt-1 text-blue-100">
                Sigue avanzando hacia la cabina sin perder tu progreso ni tu racha.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="btn-apple-light shine-on-hover rounded-full h-12 px-6 border-0"
            >
              <Link to="/pricing">Ver planes</Link>
            </Button>
          </section>
        )}
      </div>
    </AppLayout>
  )
}

// ---------- Sub-components ----------

function SectionTitle({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
        {icon}
        {title}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  )
}

function ProgressHero({
  progress,
  targetAirline,
  stageLabel,
  firstStep,
}: {
  progress: number
  targetAirline: string | null
  stageLabel: string
  firstStep: NextStep
}) {
  const closeToGoal = progress >= 75
  return (
    <section className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white p-7 sm:p-10 shadow-2xl shadow-blue-500/30">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-12 h-80 w-80 rounded-full bg-blue-300/15 blur-3xl"
      />
      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-200 uppercase tracking-wider">
            <Plane className="h-3.5 w-3.5" />
            Tu progreso {targetAirline ? `a ${targetAirline}` : "a aerolínea"}
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-6xl sm:text-7xl font-bold tracking-tight">{progress}%</span>
            <span className="inline-flex items-center text-sm text-green-300 font-medium">
              <TrendingUp className="h-4 w-4 mr-0.5" />
              {stageLabel}
            </span>
          </div>
          <div className="relative mt-5 h-2.5 rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-200 shadow-[0_0_16px_rgb(255_255_255_/_40%)] transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 text-sm text-blue-100/90">
            {closeToGoal
              ? "Estás muy cerca. Cada paso ahora pesa más que nunca."
              : "Tu primer paso hoy: " + firstStep.title.toLowerCase() + "."}
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="btn-apple-light shine-on-hover rounded-full h-12 px-6 border-0 self-start lg:self-auto"
        >
          <Link to={firstStep.href}>
            {firstStep.cta}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}

function TodayActionCard({ step }: { step: NextStep }) {
  return (
    <Link
      to={step.href}
      className="group block h-full rounded-2xl border border-border/60 bg-card card-apple p-5 hover:border-blue-500/30"
    >
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110">
          <step.icon className="h-5 w-5" />
        </div>
        <span className="text-xs text-muted-foreground">~{step.minutes} min</span>
      </div>
      <h3 className="mt-4 font-semibold text-base">{step.title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-1.5 transition-all">
        {step.cta} <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </Link>
  )
}

function StreakCard({
  current,
  longest,
  atRisk,
}: {
  current: number
  longest: number
  atRisk: boolean
}) {
  const isZero = current === 0
  return (
    <div className="rounded-2xl border border-border/60 bg-card card-apple p-6 h-full">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Flame className="h-3.5 w-3.5 text-orange-500" />
        Tu racha
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span
          className={`text-5xl sm:text-6xl font-bold tracking-tight ${
            isZero
              ? "text-muted-foreground"
              : "bg-gradient-to-br from-orange-500 to-red-500 bg-clip-text text-transparent"
          }`}
        >
          {current}
        </span>
        <span className="text-sm text-muted-foreground">
          {current === 1 ? "día" : "días"}
        </span>
      </div>

      {longest > current && (
        <p className="mt-1 text-xs text-muted-foreground">
          Tu mejor racha: {longest} días
        </p>
      )}

      {atRisk && current > 0 && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-orange-500/30 bg-orange-50 dark:bg-orange-950/30 p-3">
          <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-orange-700 dark:text-orange-300">
              Tu racha está en riesgo
            </div>
            <p className="mt-0.5 text-xs text-orange-600/80 dark:text-orange-400/80">
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
    </div>
  )
}

function HeatmapCard({ data }: { data: ActivityDay[] }) {
  // 12 weeks × 7 days grid
  const weeks: ActivityDay[][] = []
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7))
  }
  const total = data.reduce((acc, d) => acc + d.activities_count, 0)

  return (
    <div className="rounded-2xl border border-border/60 bg-card card-apple p-6 h-full">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            Tu actividad
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Últimas 12 semanas</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold tracking-tight">{total}</div>
          <div className="text-xs text-muted-foreground">actividades</div>
        </div>
      </div>

      <div className="flex gap-[3px] overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <HeatCell key={day.date} day={day} />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-[10px] text-muted-foreground">
        <span>Menos</span>
        <div className="h-2.5 w-2.5 rounded-sm bg-muted" />
        <div className="h-2.5 w-2.5 rounded-sm bg-blue-200 dark:bg-blue-900" />
        <div className="h-2.5 w-2.5 rounded-sm bg-blue-400 dark:bg-blue-700" />
        <div className="h-2.5 w-2.5 rounded-sm bg-blue-600 dark:bg-blue-500" />
        <div className="h-2.5 w-2.5 rounded-sm bg-blue-800 dark:bg-blue-400" />
        <span>Más</span>
      </div>
    </div>
  )
}

function HeatCell({ day }: { day: ActivityDay }) {
  const count = day.activities_count
  const cls =
    count === 0
      ? "bg-muted"
      : count === 1
        ? "bg-blue-200 dark:bg-blue-900"
        : count <= 3
          ? "bg-blue-400 dark:bg-blue-700"
          : count <= 6
            ? "bg-blue-600 dark:bg-blue-500"
            : "bg-blue-800 dark:bg-blue-400"
  return (
    <div
      className={`h-3 w-3 rounded-sm transition-transform hover:scale-150 ${cls}`}
      title={`${day.date} · ${count} actividad${count !== 1 ? "es" : ""}`}
    />
  )
}

function AchievementsCard({
  unlocked,
  next,
}: {
  unlocked: Achievement[]
  next: Achievement | null
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card card-apple p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Trophy className="h-3.5 w-3.5 text-amber-500" />
          Tus logros
        </div>
        <Badge variant="secondary" className="rounded-full text-xs">
          {unlocked.length} desbloqueados
        </Badge>
      </div>

      {unlocked.length === 0 ? (
        <div className="py-6 text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 text-2xl mb-3">
            🏆
          </div>
          <p className="text-sm text-muted-foreground">
            Tu primer logro está a un quiz de distancia.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {unlocked.map((a) => (
            <AchievementBadge key={a.code} achievement={a} unlocked />
          ))}
        </div>
      )}

      {next && (
        <div className="mt-5 pt-5 border-t border-border/40 flex items-center gap-3">
          <AchievementBadge achievement={next} unlocked={false} small />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Próximo logro
            </div>
            <div className="text-sm font-semibold truncate">{next.name}</div>
            <div className="text-xs text-muted-foreground truncate">{next.description}</div>
          </div>
        </div>
      )}
    </div>
  )
}

function AchievementBadge({
  achievement,
  unlocked,
  small = false,
}: {
  achievement: Achievement
  unlocked: boolean
  small?: boolean
}) {
  const tierGradient =
    achievement.tier === "platinum"
      ? "from-violet-400 to-blue-500"
      : achievement.tier === "gold"
        ? "from-amber-400 to-orange-500"
        : achievement.tier === "silver"
          ? "from-slate-300 to-slate-500"
          : "from-orange-300 to-orange-500"
  const size = small ? "h-11 w-11 text-xl" : "h-12 w-12 text-2xl"
  return (
    <div
      className={`group relative aspect-square rounded-2xl flex items-center justify-center ${size} ${
        unlocked
          ? `bg-gradient-to-br ${tierGradient} text-white shadow-md`
          : "bg-muted text-muted-foreground/40 grayscale"
      } transition-transform hover:scale-110`}
      title={`${achievement.name}: ${achievement.description}`}
    >
      <span>{achievement.icon}</span>
    </div>
  )
}

function WingmanInsightCard({
  stage,
  recentAttempts,
  icao,
}: {
  stage: PilotStage | null
  recentAttempts: number
  icao: number | null
}) {
  // Personalized weekly insight (heuristic until we have real performance data)
  const insight = (() => {
    if (recentAttempts === 0) {
      return {
        title: "Empezá con Meteorología",
        body: "Es la materia más densa y la que más cae en el examen Aerocivil. Si la dominás primero, el resto fluye.",
        cta: "Comenzar Meteo",
        href: "/app/quiz/meteorologia",
      }
    }
    if (icao && icao < 4) {
      return {
        title: "Subí tu inglés ICAO a 4",
        body: "Tenés todo lo técnico pero el inglés te está frenando. Esta semana enfocá 30 min/día en ICAO English.",
        cta: "Practicar inglés",
        href: "/app/quiz",
      }
    }
    if (stage === "hour_building" || stage === "airline_candidate") {
      return {
        title: "Tu CV está rezagado",
        body: "Tenés horas y exámenes, pero faltan los detalles. Pasá 20 min puliendo tu hoja de vida.",
        cta: "Ver requisitos",
        href: "/app/aerolineas",
      }
    }
    return {
      title: "Diversificá las materias",
      body: "Llevás varios quizzes de la misma materia. Probá otra: tu cerebro consolida mejor con variedad.",
      cta: "Ver materias",
      href: "/app/quiz",
    }
  })()

  return (
    <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-50 via-blue-50/50 to-transparent dark:from-blue-950/40 dark:via-blue-950/20 p-6 h-full">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
        <Lightbulb className="h-3.5 w-3.5" />
        Insight de Wingman
      </div>
      <h3 className="mt-3 text-lg font-bold tracking-tight">{insight.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{insight.body}</p>
      <Button
        asChild
        size="sm"
        className="btn-apple shine-on-hover rounded-full mt-4 h-9 px-4 border-0 text-xs"
      >
        <Link to={insight.href}>{insight.cta}</Link>
      </Button>
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

function PeersCard({
  peers,
  stageLabel,
}: {
  peers: Peer[]
  stageLabel: string
}) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card card-apple p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Users className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            Tu cohorte
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Pilotos en {stageLabel.toLowerCase()} dentro de Aviatory
          </p>
        </div>
        <Button asChild size="sm" variant="outline" className="rounded-full h-9">
          <Link to="/app/comunidad">
            <Users className="h-3.5 w-3.5 mr-1" />
            Ir a la comunidad
          </Link>
        </Button>
      </div>

      {peers.length === 0 ? (
        <div className="py-6 text-center text-sm text-muted-foreground">
          Aún no hay otros pilotos en tu etapa. Sé el primero en presentarte.
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {peers.map((p) => (
            <div
              key={p.user_id}
              className="flex items-center gap-2.5 rounded-full bg-muted/60 hover:bg-muted px-3 py-1.5 transition-colors"
            >
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-xs font-semibold flex items-center justify-center shadow-md">
                {p.username[0]?.toUpperCase() ?? "?"}
              </div>
              <span className="text-sm font-medium">@{p.username}</span>
              {p.current_streak > 0 && (
                <span className="inline-flex items-center text-xs text-orange-600 dark:text-orange-400">
                  <Flame className="h-3 w-3 mr-0.5" />
                  {p.current_streak}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function DashboardSkeleton() {
  return (
    <AppLayout>
      <div className="p-8 space-y-6 animate-pulse max-w-7xl mx-auto">
        <div className="h-8 w-64 bg-muted rounded-lg" />
        <div className="h-44 bg-muted rounded-3xl" />
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="h-32 bg-muted rounded-2xl" />
          <div className="h-32 bg-muted rounded-2xl" />
          <div className="h-32 bg-muted rounded-2xl" />
        </div>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
          <div className="h-40 bg-muted rounded-2xl" />
          <div className="h-40 bg-muted rounded-2xl" />
        </div>
      </div>
    </AppLayout>
  )
}
