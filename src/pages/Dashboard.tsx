import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  BookOpen,
  Brain,
  Flame,
  Gauge,
  Languages,
  Plane,
  Radar,
  Timer,
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
import heroCockpit from "@/assets/photos/cta-cockpit-dawn.jpg"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import { SectionTitle } from "@/components/ui/section-title"
import { CountUp } from "@/components/ui/count-up"
import { KpiTile } from "@/components/ui/kpi-tile"
import { tileBorder, tileTint, type TileColorKey } from "@/lib/tileColors"

type PilotStage =
  | "student_ppl"
  | "ppl"
  | "cpl_in_progress"
  | "cpl_ready"
  | "hour_building"
  | "instructor"
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
  instructor: "Instructor de Vuelo",
  airline_candidate: "Candidato a Aerolínea",
}

const STAGE_PROGRESS: Record<PilotStage, number> = {
  student_ppl: 12,
  ppl: 28,
  cpl_in_progress: 47,
  cpl_ready: 64,
  hour_building: 78,
  // El instructor acumula horas rápido pero sigue lejos del perfil de aerolínea.
  instructor: 74,
  airline_candidate: 92,
}

/**
 * Avance real a aerolínea: la etapa pesa 60%, el inglés ICAO 25% (la meta
 * es nivel 4, el mínimo legal) y la práctica reciente 15% (techo: 20
 * quizzes). Antes el número era solo la etapa y un candidato con ICAO 2
 * veía 92%, contradiciendo al propio insight de Wingman.
 */
function computeAirlineProgress(stage: PilotStage, icao: number | null, attempts: number): number {
  const stageBase = STAGE_PROGRESS[stage]
  const icaoPct = (Math.min(icao ?? 0, 4) / 4) * 100
  const practicePct = (Math.min(attempts, 20) / 20) * 100
  return Math.round(0.6 * stageBase + 0.25 * icaoPct + 0.15 * practicePct)
}

interface NextStep {
  title: string
  description: string
  href: string
  cta: string
  minutes: number
  icon: typeof BookOpen
  tone: TileColorKey
}

/**
 * Acción del día. La dueña única es la card "Quiz del día" que va justo debajo
 * del hero: el CTA del hero apunta ahí y el plan de hoy ya no repite el quiz,
 * así las 3 micro-acciones son distintas entre sí y distintas del quiz.
 */
const DAILY_ACTION = { href: "/app/pca", cta: "Empezar quiz de hoy", minutes: 12 }

/** El test inicial manda mientras no haya nivel medido: sin él, el resto del
 *  tablero no tiene con qué calibrar. */
const FIRST_ACTION = { href: "/app/test-inicial", cta: "Hacer test inicial", minutes: 15 }

/**
 * Una sola acción primaria por estado. Antes el hero mandaba siempre al quiz
 * mientras la card de abajo ofrecía el test inicial y Wingman proponía una
 * tercera materia: tres destinos distintos compitiendo por ser "lo primero".
 * Ahora el hero y la card destacada apuntan siempre al mismo lugar.
 */
function resolvePrimaryAction(icaoMeasured: boolean) {
  return icaoMeasured ? DAILY_ACTION : FIRST_ACTION
}

function buildTodayPlan(stage: PilotStage | null): NextStep[] {
  const baseWingman: NextStep = {
    title: "Pregúntale a Wingman",
    description: "Aclara un concepto que te quedó dando vueltas.",
    href: "/app/pca",
    cta: "Abrir Wingman",
    minutes: 8,
    icon: Brain,
    tone: "violet",
  }
  const baseIcao: NextStep = {
    title: "Inglés ICAO",
    description: "Vocabulario y audio del examen TEA, en bloques cortos.",
    href: "/app/icao",
    cta: "Practicar ICAO",
    minutes: 15,
    icon: Languages,
    tone: "green",
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
    description: "Preséntate y encuentra pilotos en tu misma etapa.",
    href: "/app/comunidad",
    cta: "Ir a comunidad",
    minutes: 3,
    icon: Users,
    tone: "amber",
  }

  if (!stage) return [baseWingman, baseIcao, baseCommunity]
  switch (stage) {
    case "student_ppl":
    case "ppl":
      return [baseWingman, baseIcao, baseCommunity]
    case "cpl_in_progress":
    case "cpl_ready":
      return [baseWingman, baseIcao, baseAirline]
    case "hour_building":
    case "instructor":
    case "airline_candidate":
      return [baseAirline, baseIcao, baseCommunity]
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
  /** Las tres RPC lentas (heatmap, cohorte, quiz diario) y los logros cargan
   *  después del hero, con skeleton local en su propia card. */
  const [deferredLoading, setDeferredLoading] = useState(true)
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

    async function loadCore() {
      try {
        const [profileRes, pilotRes, streakRes, subRes, attemptsRes] = await Promise.all([
          supabase.from("profiles").select("full_name, username, photo_url").eq("id", user!.id).maybeSingle(),
          supabase.from("pilot_state").select("stage, total_hours, hours_pic, licenses, icao_english_level, target_airline, target_date").eq("user_id", user!.id).maybeSingle(),
          supabase.from("streaks").select("current_streak, longest_streak, last_activity_date").eq("user_id", user!.id).maybeSingle(),
          supabase.from("subscriptions").select("status, plan, current_period_end").eq("user_id", user!.id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
          supabase.from("quiz_attempts").select("id", { count: "exact", head: true }).eq("user_id", user!.id),
        ])

        if (cancelled) return

        setProfile(profileRes.data as Profile | null)
        const ps = pilotRes.data as PilotState | null
        setPilot(ps)
        setStreak(streakRes.data as Streak | null)
        setSubscription(subRes.data as Subscription | null)
        setRecentAttempts(attemptsRes.count ?? 0)

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

    loadCore()
    return () => {
      cancelled = true
    }
  }, [user, navigate])

  useEffect(() => {
    if (!user) return
    let cancelled = false

    async function loadDeferred() {
      try {
        const [allAchievementsRes, userAchievementsRes, heatmapRes, peersRes, dailyRes] = await Promise.all([
          supabase.from("achievements").select("*").order("order_index"),
          supabase.from("user_achievements").select("achievement_id, unlocked_at, achievements(*)").eq("user_id", user!.id).order("unlocked_at", { ascending: false }).limit(4),
          supabase.rpc("get_activity_heatmap"),
          supabase.rpc("get_peers_in_stage", { p_limit: 5 }),
          supabase.rpc("get_daily_quiz"),
        ])

        supabase.rpc("check_my_expiries").then(() => undefined)
        if (cancelled) return

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
      } catch {
        // Estas cards muestran su propio estado vacío si algo falla: no
        // interrumpimos el dashboard con un toast por el heatmap.
      } finally {
        if (!cancelled) setDeferredLoading(false)
      }
    }

    loadDeferred()
    return () => {
      cancelled = true
    }
  }, [user])

  const nextAchievement = useMemo(() => {
    const unlockedCodes = new Set(achievements.map((a) => a.code))
    return allAchievements.find((a) => !unlockedCodes.has(a.code))
  }, [achievements, allAchievements])

  if (loading) return <DashboardSkeleton />

  const stage = pilot?.stage ?? null
  const stageLabel = stage ? STAGE_LABEL[stage] : "—"
  const icaoLevel = pilot?.icao_english_level ?? null
  /** Sin nivel medido no inventamos un 0: el tile muestra un guion. */
  const icaoMeasured = icaoLevel !== null && icaoLevel > 0
  /** null = todavía no hay etapa, así que no hay avance que mostrar. Un 0% con
   *  la barra vacía se leía como fracaso el primer día. */
  const progress = stage ? computeAirlineProgress(stage, icaoLevel, recentAttempts) : null
  const primaryAction = resolvePrimaryAction(icaoMeasured)
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
      <div className="px-4 sm:px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        {/* Cockpit hero */}
        <CockpitHero
          firstName={firstName}
          stageLabel={stageLabel}
          totalHours={pilot?.total_hours ?? 0}
          targetAirline={pilot?.target_airline ?? null}
          streakDays={streakDays}
          progress={progress}
          trialLeft={trialLeft}
          primaryAction={primaryAction}
        />

        {/* Una sola card destacada bajo el hero, la de la acción primaria.
            Antes podían salir las dos a la vez y el usuario nuevo tenía que
            elegir entre el test inicial y el quiz del día sin saber cuál va
            primero. Sin skeleton propio: si hoy no hay quiz curado la card no
            existe y un placeholder dejaría un hueco que se cierra de golpe. */}
        {icaoMeasured && daily.length > 0 && (
          <div className="mt-5">
            <DailyQuizCard count={daily.length} firstSubject={daily[0]?.subject_name ?? null} />
          </div>
        )}

        {/* Test inicial: la acción primaria mientras no haya nivel medido */}
        {!icaoMeasured && (
          <Link
            to="/app/test-inicial"
            className="mt-5 flex items-center justify-between gap-4 rounded-lg border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{ borderColor: "color-mix(in oklab, var(--av-blue-500) 32%, transparent)", background: "color-mix(in oklab, var(--av-blue-500) 6%, transparent)" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center w-11 h-11 rounded-lg flex-shrink-0"
                style={{ background: "var(--av-blue-500)" }}
              >
                <Gauge className="h-[22px] w-[22px] text-white" />
              </div>
              <div>
                <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>Empieza por aquí</div>
                <div className="mt-0.5 text-[17px] font-extrabold tracking-[-0.01em]">Haz tu test inicial</div>
                <div className="text-[13.5px] text-muted-foreground">Inglés ICAO + 2 por materia · ~15 min · descubre tu Nivel Inicial.</div>
              </div>
            </div>
            <ArrowRight className="hidden sm:block h-5 w-5 flex-shrink-0 text-muted-foreground" />
          </Link>
        )}

        {/* Instrument cluster: sin curvas inventadas, solo el número que la app
            sostiene. Donde todavía no hay nada medido va un guion y no un cero:
            cuatro ceros en fila el primer día se leen como un tablero roto. */}
        <div className="stagger grid grid-cols-2 lg:grid-cols-4 gap-3 mt-7 mb-7">
          {pilot?.total_hours ? (
            <KpiTile
              eyebrow="Tot hrs"
              value={pilot.total_hours}
              note={pilot.hours_pic ? `PIC ${pilot.hours_pic.toFixed(1)}` : undefined}
            />
          ) : (
            <KpiTile eyebrow="Tot hrs" value={0} format={() => "—"} note="Sin cargar" />
          )}
          {streakDays > 0 ? (
            <KpiTile
              eyebrow="Racha"
              value={streakDays}
              suffix="d"
              note={longestStreak > 0 ? `Máx ${longestStreak}` : undefined}
            />
          ) : (
            <KpiTile eyebrow="Racha" value={0} format={() => "—"} note="Sin racha" />
          )}
          {recentAttempts > 0 ? (
            <KpiTile eyebrow="Quiz" value={recentAttempts} />
          ) : (
            <KpiTile eyebrow="Quiz" value={0} format={() => "—"} note="Ninguno" />
          )}
          {icaoMeasured ? (
            <KpiTile
              eyebrow="Icao eng"
              value={icaoLevel ?? 0}
              note="Mín 4 req"
              tone={(icaoLevel ?? 0) < 4 ? "warn" : undefined}
            />
          ) : (
            <KpiTile eyebrow="Icao eng" value={0} format={() => "—"} note="Sin medir" />
          )}
        </div>

        {/* Today's plan + Wingman insight */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-4 mb-7">
          <section>
            <SectionTitle
              icon={Target}
              eyebrow="Tu plan de hoy"
              title="3 acciones cortas, además del quiz"
              hint="Cada paso suma. No tienes que hacer las 3 hoy."
            />
            <div className="stagger grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              {todayPlan.map((step) => (
                <TodayCard key={step.title} step={step} />
              ))}
            </div>
          </section>
          <WingmanInsight
            stage={stage}
            recentAttempts={recentAttempts}
            icao={icaoLevel}
            icaoMeasured={icaoMeasured}
          />
        </div>

        {/* Streak + Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,1fr)_2.2fr] gap-4 mb-7">
          <StreakCard current={streakDays} longest={longestStreak} atRisk={streakAtRisk} />
          <ActivityHeatmap data={heatmap} loading={deferredLoading} />
        </div>

        {/* Achievements + Cohort */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
          <AchievementsCard
            unlocked={achievements}
            next={nextAchievement ?? null}
            total={allAchievements.length}
            loading={deferredLoading}
          />
          <CohortCard peers={peers} stageLabel={stageLabel} loading={deferredLoading} />
        </div>
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
  trialLeft,
  primaryAction,
}: {
  firstName: string
  stageLabel: string
  totalHours: number
  targetAirline: string | null
  streakDays: number
  progress: number | null
  trialLeft: number | null
  primaryAction: { href: string; cta: string; minutes: number }
}) {
  /** Chip claro para usar sobre la foto: los .chip-* semánticos tienen texto
   *  oscuro en modo claro y ahí quedarían ilegibles. */
  const heroChip =
    "inline-flex items-center gap-1.5 h-[24px] px-2.5 rounded-full text-[11.5px] font-semibold tracking-[0.01em] text-white border border-white/25 bg-white/12 backdrop-blur-sm"

  return (
    <section className="relative overflow-hidden rounded-2xl">
      <img
        src={heroCockpit}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgb(11 16 32 / 88%) 0%, color-mix(in oklab, var(--av-blue-500) 34%, rgb(11 16 32 / 86%)) 100%)",
        }}
      />

      <div className="relative p-6 sm:p-8">
        <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-white/70">
              {stageLabel}
              {targetAirline ? ` · objetivo ${targetAirline}` : ""}
            </div>
            <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.05] text-white">
              {greetingTime()}, {firstName}
            </h1>
            <p className="mt-2.5 text-[15px] text-white/75 flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span className="tabular-nums">{totalHours}h totales</span>
              {streakDays > 0 && (
                <>
                  <span className="text-white/30">·</span>
                  <span className={`${heroChip} tabular-nums`}>
                    <Flame className="h-3 w-3" />
                    {streakDays} {streakDays === 1 ? "día" : "días"} de racha
                  </span>
                </>
              )}
            </p>

            {/* Avance a aerolínea. Sin etapa no hay nada que medir: va la
                invitación a generarlo, nunca un 0% con la barra en cero. */}
            <div className="mt-6 max-w-[560px]">
              {progress === null ? (
                <>
                  <div className="flex justify-between items-baseline gap-3 mb-2">
                    <span className="text-[13px] font-semibold text-white/70">
                      Tu avance a aerolínea
                    </span>
                    <span className="text-2xl font-extrabold tracking-[-0.03em] text-white/40">
                      —
                    </span>
                  </div>
                  <Link
                    to="/onboarding"
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors"
                  >
                    Dinos en qué etapa vas y lo calculamos
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-baseline gap-3 mb-2">
                    <span className="text-[13px] font-semibold text-white/70">
                      Tu avance a aerolínea
                    </span>
                    <span className="text-gradient-gold tabular-nums text-2xl font-extrabold tracking-[-0.03em]">
                      <CountUp to={progress} />%
                    </span>
                  </div>
                  <div className="relative h-2.5 rounded-full overflow-hidden bg-white/20">
                    <div
                      className="h-full rounded-full bg-white transition-[width] duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right CTA */}
          <div className="flex flex-col items-start lg:items-end gap-2.5">
            {trialLeft !== null && trialLeft > 0 && (
              <span className={`${heroChip} tabular-nums`}>
                <Timer className="h-3 w-3" /> Prueba: {trialLeft} día{trialLeft !== 1 ? "s" : ""}
              </span>
            )}
            <Link
              to={primaryAction.href}
              className="inline-flex items-center gap-1.5 h-11 px-5 rounded-xl font-semibold text-[15px] text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--av-blue-500)" }}
            >
              {primaryAction.cta} <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="text-[12px] text-white/70">~{primaryAction.minutes} min</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TodayCard({ step }: { step: NextStep }) {
  const Ic = step.icon
  return (
    <Link
      to={step.href}
      className="relative overflow-hidden rounded-lg border border-border bg-card p-[18px] cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md block"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = tileBorder(step.tone, 45)
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)"
      }}
    >
      <div className="relative">
        <div className="flex items-center justify-between">
          <div
            className="w-[38px] h-[38px] rounded-lg flex items-center justify-center text-foreground"
            style={{
              background: tileTint(step.tone),
              border: `1px solid ${tileBorder(step.tone)}`,
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
        <div className="mt-3.5 inline-flex items-center gap-1 text-xs font-semibold text-foreground">
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
  icaoMeasured,
}: {
  stage: PilotStage | null
  recentAttempts: number
  icao: number | null
  icaoMeasured: boolean
}) {
  const insight = (() => {
    /** Sin nivel medido Wingman no tiene con qué personalizar, así que refuerza
     *  la acción primaria en vez de abrir un tercer destino. */
    if (!icaoMeasured) {
      return {
        title: "Empieza por el test inicial",
        body: "Son unos 15 minutos. Con tu nivel medido puedo decirte qué materia atacar primero y qué tan lejos estás de aerolínea.",
        cta: FIRST_ACTION.cta,
        href: FIRST_ACTION.href,
      }
    }
    if (recentAttempts === 0) {
      return {
        title: "Empieza con Meteorología",
        body: "Es la materia más densa y la que más cae en el examen Aerocivil. Si la dominas primero, el resto fluye.",
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
      title: "Diversifica las materias",
      body: "Llevas varios quizzes de la misma materia. Prueba otra: tu cerebro consolida mejor con variedad.",
      cta: "Ver materias",
      href: "/app/pca",
    }
  })()

  return (
    <div
      className="relative overflow-hidden rounded-lg border p-5"
      style={{
        background: "color-mix(in oklab, var(--av-violet-400) 5%, var(--card))",
        borderColor: "color-mix(in oklab, var(--av-violet-400) 22%, var(--border))",
      }}
    >
      <div className="relative">
        <div className="chip chip-violet">
          <Radar className="h-3 w-3" /> Insight de Wingman
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

/**
 * Patrón único de estado vacío: tile con icono, título, una línea y una salida.
 * Lo comparten racha, logros y cohorte, que antes tenían tres vacíos distintos.
 */
function EmptyState({
  icon: Ic,
  tone,
  title,
  line,
  cta,
  href,
}: {
  icon: typeof BookOpen
  tone: TileColorKey
  title: string
  line: string
  cta: string
  href: string
}) {
  return (
    <div className="py-5 flex flex-col items-center text-center">
      <div
        className="flex items-center justify-center h-12 w-12 rounded-lg text-foreground"
        style={{ background: tileTint(tone), border: `1px solid ${tileBorder(tone)}` }}
      >
        <Ic className="h-5 w-5" />
      </div>
      <div className="mt-3 text-sm font-bold text-foreground tracking-[-0.015em]">{title}</div>
      <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed max-w-[34ch]">{line}</p>
      <Link
        to={href}
        className="inline-flex items-center gap-1.5 mt-3.5 h-9 px-3 rounded-lg border border-border bg-background text-xs font-semibold text-foreground hover:bg-muted transition-colors"
      >
        {cta} <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  )
}

/** Preview de la semana: 7 barras, apagadas hasta el primer día de racha. */
function StreakBars({ current }: { current: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-1.5 rounded-full"
          style={{
            background: i < current ? "var(--av-amber-400)" : "var(--muted)",
          }}
        />
      ))}
    </div>
  )
}

function StreakCard({ current, longest, atRisk }: { current: number; longest: number; atRisk: boolean }) {
  if (current === 0) {
    return (
      <div className="relative overflow-hidden rounded-lg border border-border bg-card p-5">
        <span className="chip chip-amber">
          <Flame className="h-3 w-3" /> Tu racha
        </span>
        <EmptyState
          icon={Flame}
          tone="amber"
          title="Enciende tu racha"
          line="Una sola pregunta hoy cuenta como día activo y arranca la cuenta."
          cta="Responder una pregunta"
          href={DAILY_ACTION.href}
        />
        <div className="div-dotted my-4" />
        <StreakBars current={0} />
        <p className="mt-2 text-[12px] text-muted-foreground">Así se ve tu semana: hoy es el primer casillero.</p>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-card p-5">
      <div className="relative">
        <span className="chip chip-amber">
          <Flame className="h-3 w-3" /> Tu racha
        </span>
        <div className="mt-4 flex items-baseline gap-2">
          <span
            className="mono tabular-nums text-[64px] font-bold leading-none tracking-[-0.05em]"
            style={{ color: "var(--av-warn-fg)" }}
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

        {atRisk && (
          <div
            className="mt-4 rounded-xl p-3"
            style={{
              background: tileTint("amber", 10),
              border: `1px solid ${tileBorder("amber", 26)}`,
            }}
          >
            <span className="chip chip-amber">
              <AlertTriangle className="h-3 w-3" /> Tu racha está en riesgo
            </span>
            <p className="mt-2 text-[12.5px] text-muted-foreground">
              Si no estudias hoy se reinicia. Con una pregunta la salvas.
            </p>
            <Link
              to={DAILY_ACTION.href}
              className="inline-flex items-center gap-1.5 mt-2.5 h-9 px-3 rounded-lg border border-border bg-background text-xs font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Salvar mi racha <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}

        <div className="div-dotted my-4" />
        <StreakBars current={current} />
      </div>
    </div>
  )
}

function ActivityHeatmap({ data, loading }: { data: ActivityDay[]; loading: boolean }) {
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
    <div className="rounded-lg border border-border bg-card p-5">
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
            {total > 0 ? <CountUp to={total} /> : "—"}
          </div>
          <div className="text-[11px] text-muted-foreground">actividades</div>
        </div>
      </div>

      {loading ? (
        <div className="h-[122px] rounded-xl bg-muted animate-pulse" />
      ) : (
        <>
          <div className="flex gap-1 items-start" style={total === 0 ? { opacity: 0.3 } : undefined}>
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
              {total === 0
                ? Array.from({ length: 12 }).map((_, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {Array.from({ length: 7 }).map((_, di) => (
                        <div
                          key={di}
                          className="w-[14px] h-[14px] rounded-[3px] flex-shrink-0"
                          style={{ background: "var(--muted)" }}
                        />
                      ))}
                    </div>
                  ))
                : weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((d) => (
                        <div
                          key={d.date}
                          className="w-[14px] h-[14px] rounded-[3px] flex-shrink-0 transition-transform hover:scale-150"
                          style={{ background: color(d.activities_count) }}
                          title={`${d.date} · ${d.activities_count} actividad${d.activities_count !== 1 ? "es" : ""}`}
                        />
                      ))}
                    </div>
                  ))}
            </div>
          </div>

          {total === 0 ? (
            <p className="mt-3.5 text-[13px] text-muted-foreground">
              Tu primera actividad aparece aquí hoy.
            </p>
          ) : (
            <div className="mt-3.5 flex items-center gap-1.5 text-[12px] text-muted-foreground justify-end">
              <span>Menos</span>
              {[0, 1, 3, 5, 7].map((c) => (
                <div key={c} className="w-[11px] h-[11px] rounded-[3px]" style={{ background: color(c) }} />
              ))}
              <span>Más</span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function AchievementsCard({
  unlocked,
  next,
  total,
  loading,
}: {
  unlocked: Achievement[]
  next: Achievement | null
  total: number
  loading: boolean
}) {
  const TIER_GRAD: Record<Achievement["tier"], string> = {
    bronze: "linear-gradient(135deg, oklch(0.75 0.12 60), oklch(0.55 0.15 40))",
    silver: "linear-gradient(135deg, oklch(0.85 0.01 250), oklch(0.55 0.02 250))",
    gold: "linear-gradient(135deg, oklch(0.85 0.14 85), oklch(0.65 0.16 65))",
    platinum: "linear-gradient(135deg, var(--av-cyan-300), var(--av-violet-400))",
  }
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <SectionTitle
        icon={Trophy}
        eyebrow="Logros"
        title={loading ? "Cargando tus logros" : `${unlocked.length} / ${total} desbloqueados`}
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
      {loading ? (
        <div className="h-[132px] rounded-xl bg-muted animate-pulse" />
      ) : unlocked.length === 0 ? (
        <EmptyState
          icon={Trophy}
          tone="amber"
          title="Tu primer logro está a un quiz de distancia"
          line="Completa el quiz de hoy y desbloqueas el primero de la colección."
          cta="Empezar quiz de hoy"
          href={DAILY_ACTION.href}
        />
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
          {unlocked.slice(0, 8).map((a) => (
            <div key={a.code} className="aspect-square relative group" title={`${a.name}: ${a.description}`}>
              <div
                className="w-full h-full rounded-xl flex items-center justify-center text-xl transition-transform hover:scale-110"
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

function CohortCard({
  peers,
  stageLabel,
  loading,
}: {
  peers: Peer[]
  stageLabel: string
  loading: boolean
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <SectionTitle
        icon={Users}
        eyebrow="Tu cohorte"
        title={loading ? "Buscando pilotos como tú" : `${peers.length} pilotos en ${stageLabel}`}
      />
      {loading ? (
        <div className="h-[132px] rounded-xl bg-muted animate-pulse" />
      ) : peers.length === 0 ? (
        <EmptyState
          icon={Users}
          tone="blue"
          title="Todavía no hay pilotos en tu etapa"
          line="Preséntate en la comunidad: el primero en llegar arma la cohorte."
          cta="Ir a comunidad"
          href="/app/comunidad"
        />
      ) : (
        <div className="flex flex-col gap-2">
          {peers.map((p) => (
            <div
              key={p.user_id}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-colors hover:bg-muted/50"
            >
              <div
                className="mono w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs"
                style={{ background: "var(--av-navy-800)" }}
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

/**
 * Acción del día. Superficie sólida en vez del gradiente ámbar con halo: el
 * ámbar queda solo en la etiqueta, donde significa "esto es lo de hoy".
 */
function DailyQuizCard({ count, firstSubject }: { count: number; firstSubject: string | null }) {
  return (
    <Link
      to={DAILY_ACTION.href}
      className="anim-fade-up relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg p-5 text-white transition-colors"
      style={{ background: "var(--av-navy-900)", border: "1px solid var(--av-navy-700)" }}
    >
      <div className="flex items-center gap-3.5">
        <Sun className="h-5 w-5 flex-shrink-0" style={{ color: "var(--av-amber-400)" }} />
        <div>
          <div
            className="mono text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "var(--av-amber-400)" }}
          >
            Quiz del día
          </div>
          <div className="mt-1 text-[17px] font-bold tracking-[-0.015em]">
            <span className="mono tabular-nums">{count}</span> preguntas
            {firstSubject ? ` · empieza con ${firstSubject}` : ""}
          </div>
          <div className="text-[13px] text-white/60 mt-0.5">Se renueva mañana.</div>
        </div>
      </div>
      <span
        className="inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-md font-semibold text-[14px] flex-shrink-0"
        style={{ background: "white", color: "var(--av-navy-900)" }}
      >
        {DAILY_ACTION.cta} <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  )
}

/**
 * Espeja el layout real (mismas clases de grid, mismos breakpoints y alturas
 * parecidas) para que al cargar no salte la página.
 */
function DashboardSkeleton() {
  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-7 pb-20 max-w-[1480px] mx-auto animate-pulse">
        {/* Hero */}
        <div className="h-[232px] bg-muted rounded-lg" />

        {/* Instrument cluster */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-7 mb-7">
          <div className="h-[106px] bg-muted rounded-lg" />
          <div className="h-[106px] bg-muted rounded-lg" />
          <div className="h-[106px] bg-muted rounded-lg" />
          <div className="h-[106px] bg-muted rounded-lg" />
        </div>

        {/* Plan de hoy + Wingman */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-4 mb-7">
          <div>
            <div className="h-[52px] w-[260px] bg-muted rounded-lg mb-3.5" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <div className="h-[158px] bg-muted rounded-lg" />
              <div className="h-[158px] bg-muted rounded-lg" />
              <div className="h-[158px] bg-muted rounded-lg" />
            </div>
          </div>
          <div className="h-[226px] bg-muted rounded-lg" />
        </div>

        {/* Racha + actividad */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,1fr)_2.2fr] gap-4 mb-7">
          <div className="h-[248px] bg-muted rounded-lg" />
          <div className="h-[248px] bg-muted rounded-lg" />
        </div>

        {/* Logros + cohorte */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
          <div className="h-[212px] bg-muted rounded-lg" />
          <div className="h-[212px] bg-muted rounded-lg" />
        </div>
      </div>
    </AppLayout>
  )
}
