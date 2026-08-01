import { useEffect, useMemo, useState, type ComponentType } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Flame,
  Radar,
  Timer,
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  Trophy,
  Users,
  Lightbulb,
  Share2,
  Sun,
  Activity,
} from "lucide-react"
import {
  AerodromeIcon,
  HoldingIcon,
  LocalizerIcon,
  NdbIcon,
  VorIcon,
  WaypointIcon,
} from "@/components/icons/aero"
import { toast } from "sonner"
import heroCockpit from "@/assets/photos/cta-cockpit-dawn.jpg"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import { SectionTitle } from "@/components/ui/section-title"
import { CountUp } from "@/components/ui/count-up"
import { KpiTile, KpiPanel } from "@/components/ui/kpi-tile"
import { TILE_COLOR, tileTint, tileBorder, type TileColorKey } from "@/lib/tileColors"
import {
  EXAM_PASS_SCORE as NOTAM_PASS_SCORE,
  TOTALS as NOTAM_TOTALS,
  accentText,
  readLocalProgress as readNotamLocal,
} from "@/lib/notam"
import { fetchNotamProgress } from "@/lib/notamProgress"
import { shareStreak } from "@/lib/shareStreak"
import { fetchHeatmapSeries } from "@/lib/activity"
import { badgeForCode } from "@/lib/achievementBadges"
import { appButtonClass } from "@/lib/buttonStyles"

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

/** Fila de get_subject_mastery: avance real contra el banco PCA, por materia. */
interface SubjectMastery {
  subject_id: number
  subject_name: string
  subject_slug: string
  total_questions: number
  total_attempted: number
  attempts_count: number
  avg_score: number
  mastery_level: string
}

/** Resumen NOTAM para la card de curso. Mismo cálculo que el hub del módulo. */
interface NotamResumen {
  lesson: number
  practice: number
  best: number | null
}

const NOTAM_PRACTICE_TOTAL = NOTAM_TOTALS.exercises + NOTAM_TOTALS.national

/** Documento del piloto con fecha de vencimiento (licencia, médico, habilitación). */
interface LicenseRow {
  id: string
  license_type: string
  custom_name: string | null
  expires_date: string | null
}

/** Vista user_pca_readiness: qué tan listo está el piloto para presentar el PCA. */
interface PcaReadiness {
  attempts_60d: number | null
  avg_score_60d: number | null
  best_score: number | null
  passed_recently: boolean | null
  readiness_color: string | null
}

/** Días desde hoy hasta la fecha, negativo si ya pasó. */
function daysUntil(iso: string): number {
  const d = new Date(iso + "T00:00:00")
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((d.getTime() - today.getTime()) / 86400000)
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

type IconComponent = ComponentType<{ size?: number; className?: string }>

interface NextStep {
  title: string
  description: string
  href: string
  cta: string
  minutes: number
  icon: IconComponent
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

function buildTodayPlan(stage: PilotStage | null): NextStep[] {
  const baseWingman: NextStep = {
    title: "Pregúntale a Wingman",
    description: "Aclara un concepto que te quedó dando vueltas.",
    href: "/app/pca",
    cta: "Abrir Wingman",
    minutes: 8,
    icon: NdbIcon,
  }
  const baseIcao: NextStep = {
    title: "Inglés ICAO",
    description: "Vocabulario y audio del examen TEA, en bloques cortos.",
    href: "/app/icao",
    cta: "Practicar ICAO",
    minutes: 15,
    icon: VorIcon,
  }
  const baseAirline: NextStep = {
    title: "Revisa tu match",
    description: "Mira qué te falta para postular a tu aerolínea objetivo.",
    href: "/app/match",
    cta: "Ver aerolíneas",
    minutes: 5,
    icon: AerodromeIcon,
  }
  const baseCommunity: NextStep = {
    title: "Saluda a tu cohorte",
    description: "Preséntate y encuentra pilotos en tu misma etapa.",
    href: "/app/comunidad",
    cta: "Ir a comunidad",
    minutes: 3,
    icon: Users,
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

function greetingTime(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Buenos días"
  if (hour < 19) return "Buenas tardes"
  return "Buenas noches"
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
  const [mastery, setMastery] = useState<SubjectMastery[]>([])
  const [notam, setNotam] = useState<NotamResumen | null>(null)
  const [licenses, setLicenses] = useState<LicenseRow[]>([])
  const [readiness, setReadiness] = useState<PcaReadiness | null>(null)

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
          // vault_sessions, no quiz_attempts: la tabla vieja quedó congelada al
          // migrar al vault y ninguna línea de la app la escribe, así que el
          // contador se quedaba clavado por más que el piloto estudiara.
          supabase
            .from("vault_sessions")
            .select("token", { count: "exact", head: true })
            .eq("user_id", user!.id)
            .not("completed_at", "is", null),
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
        const [allAchievementsRes, userAchievementsRes, heatmapRes, peersRes, dailyRes, masteryRes, notamProg, notamBestRes, licensesRes, readinessRes] = await Promise.all([
          supabase.from("achievements").select("*").order("order_index"),
          // Sin limit: la card de logros muestra la colección completa y
          // necesita saber cuáles están desbloqueados, no solo los últimos 4.
          supabase.from("user_achievements").select("achievement_id, unlocked_at, achievements(*)").eq("user_id", user!.id).order("unlocked_at", { ascending: false }),
          // get_activity_heatmap está rota a nivel SQL (42804) y este catch se
          // tragaba el error: la serie sale de la tabla daily_activity directo.
          fetchHeatmapSeries(user!.id),
          supabase.rpc("get_peers_in_stage", { p_limit: 5 }),
          supabase.rpc("get_daily_quiz"),
          supabase.rpc("get_subject_mastery"),
          fetchNotamProgress(user!.id),
          supabase.from("user_notam_exam_attempts").select("score").eq("user_id", user!.id).order("score", { ascending: false }).limit(1),
          supabase.from("licenses_held").select("id, license_type, custom_name, expires_date").eq("user_id", user!.id).not("expires_date", "is", null).order("expires_date", { ascending: true }),
          supabase.from("user_pca_readiness").select("attempts_60d, avg_score_60d, best_score, passed_recently, readiness_color").eq("user_id", user!.id).maybeSingle(),
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

        setHeatmap(heatmapRes)
        setPeers((peersRes.data ?? []) as Peer[])
        setDaily((dailyRes.data ?? []) as DailyQuizQuestion[])
        setMastery((masteryRes.data ?? []) as SubjectMastery[])

        // NOTAM: remoto unido al respaldo local, igual que el hub del módulo.
        // Todo en cero significa curso sin empezar, y la card lo dice con un
        // guion en vez de un 0%.
        const local = readNotamLocal()
        const lesson = new Set([...(notamProg?.lessonScreens ?? []), ...local.lessonScreens]).size
        const practice = new Set([...(notamProg?.practiceDone ?? []), ...local.exercisesDone]).size
        const remoteBest = (notamBestRes.data as { score: number | null }[] | null)?.[0]?.score ?? null
        const scores = [remoteBest, local.bestExamScore].filter((v): v is number => typeof v === "number")
        const best = scores.length > 0 ? Math.max(...scores) : null
        setNotam(lesson === 0 && practice === 0 && best === null ? null : { lesson, practice, best })

        setLicenses((licensesRes.data ?? []) as LicenseRow[])
        setReadiness(readinessRes.data as PcaReadiness | null)
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

  /**
   * Documento más próximo a vencer, solo si vence dentro de 90 días o ya venció.
   * Fuera de esa ventana no se muestra nada: un aviso permanente deja de ser un
   * aviso y pasa a ser decoración.
   */
  const expiry = useMemo(() => {
    const withDates = licenses
      .filter((l): l is LicenseRow & { expires_date: string } => Boolean(l.expires_date))
      .map((l) => ({ ...l, days: daysUntil(l.expires_date) }))
      .sort((a, b) => a.days - b.days)
    return withDates.find((l) => l.days <= 90) ?? null
  }, [licenses])

  /**
   * Lectura de preparación para presentar el PCA. Sale de user_pca_readiness,
   * que la app ya calculaba y ninguna pantalla mostraba. Solo habla cuando hay
   * intentos en los últimos 60 días: sin práctica reciente no hay nada que
   * decir sobre si estás listo.
   */
  const readinessHint = useMemo(() => {
    const attempts = readiness?.attempts_60d ?? 0
    if (!readiness || attempts === 0) return null
    if (readiness.passed_recently) {
      return `Vas listo para presentar: aprobaste en los últimos 60 días con ${readiness.best_score ?? 0} de 100.`
    }
    const avg = readiness.avg_score_60d
    if (avg == null) return null
    return `Promedio de los últimos 60 días: ${Math.round(avg)} de 100, en ${attempts} ${attempts === 1 ? "intento" : "intentos"}.`
  }, [readiness])

  /**
   * Agregado PCA: materias trabajadas sobre el total y la más floja con datos.
   *
   * La barra NO es cobertura del banco: get_subject_mastery cuenta contra la
   * tabla legada `questions`, casi vacía (verificado en producción: Meteorología
   * reporta 1 pregunta y 3 intentos, o sea 300 por ciento). El banco real vive
   * cifrado en vault_questions y la RPC no lo ve, así que attempted/total daba
   * un 100 por ciento falso el primer día. Materias con práctica sobre materias
   * totales sí es sostenible con estos datos.
   */
  const pca = useMemo(() => {
    if (mastery.length === 0) return null
    const started = mastery.filter((m) => m.attempts_count > 0)
    if (started.length === 0) return null
    const weakest = [...started].sort((a, b) => a.avg_score - b.avg_score)[0]
    return {
      pct: Math.round((started.length / mastery.length) * 100),
      started: started.length,
      totalSubjects: mastery.length,
      weakest: weakest ?? null,
    }
  }, [mastery])

  if (loading) return <DashboardSkeleton />

  const stage = pilot?.stage ?? null
  const stageLabel = stage ? STAGE_LABEL[stage] : "—"
  const icaoLevel = pilot?.icao_english_level ?? null
  /** Sin nivel medido no inventamos un 0: el tile muestra un guion. */
  const icaoMeasured = icaoLevel !== null && icaoLevel > 0
  /** null = todavía no hay etapa, así que no hay avance que mostrar. Un 0% con
   *  la barra vacía se leía como fracaso el primer día. */
  const progress = stage ? computeAirlineProgress(stage, icaoLevel, recentAttempts) : null
  const firstName =
    profile?.full_name?.split(" ")[0] ?? profile?.username ?? user?.email?.split("@")[0] ?? "piloto"
  const trialLeft = subscription?.status === "trialing" ? trialDaysLeft(subscription.current_period_end) : null
  const todayPlan = buildTodayPlan(stage)

  const streakDays = streak?.current_streak ?? 0
  const longestStreak = streak?.longest_streak ?? 0
  // La fecha llega como "AAAA-MM-DD": sin hora, new Date() la parsea como
  // medianoche UTC, que en Colombia es el día ANTERIOR a las 7 de la noche.
  // Con eso, una racha hecha hoy salía "en riesgo" toda la tarde.
  const streakAtRisk =
    streakDays > 0 && streak?.last_activity_date
      ? new Date(streak.last_activity_date + "T00:00:00").toDateString() !== new Date().toDateString()
      : false

  return (
    <AppLayout streak={streakDays}>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        {/* Consola de vuelo: el hero grande y los cuatro indicadores como una
            sola pieza navy. El hero saluda, muestra el avance y trae integrada
            la accion del dia (quiz de hoy o test inicial), asi que ya no hay
            dos cards sueltas compitiendo debajo. */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--panel-border)" }}
        >
          <CockpitHero
            firstName={firstName}
            stageLabel={stageLabel}
            targetAirline={pilot?.target_airline ?? null}
            targetDate={pilot?.target_date ?? null}
            progress={progress}
            trialLeft={trialLeft}
            icaoMeasured={icaoMeasured}
            daily={daily}
            deferredLoading={deferredLoading}
          />
          <KpiPanel attached>

            {pilot?.total_hours ? (
            <KpiTile
                eyebrow="Horas totales"
                value={pilot.total_hours}
                note={pilot.hours_pic ? `PIC ${pilot.hours_pic.toFixed(1)}` : undefined}
              />
            ) : (
            <KpiTile eyebrow="Horas totales" value={0} format={() => "—"} note="Sin registrar" />
            )}
            {streakDays > 0 ? (
            <KpiTile
                eyebrow="Racha"
                value={streakDays}
                suffix="d"
                note={longestStreak > 0 ? `Mejor racha: ${longestStreak}` : undefined}
              />
            ) : (
            <KpiTile eyebrow="Racha" value={0} format={() => "—"} note="Sin racha" />
            )}
            {recentAttempts > 0 ? (
            <KpiTile eyebrow="Quizzes" value={recentAttempts} />
            ) : (
            <KpiTile eyebrow="Quizzes" value={0} format={() => "—"} note="Ninguno aún" />
            )}
            {icaoMeasured ? (
            <KpiTile
                eyebrow="Inglés ICAO"
                value={icaoLevel ?? 0}
                note="Mínimo requerido: 4"
                tone={(icaoLevel ?? 0) < 4 ? "warn" : undefined}
              />
            ) : (
            <KpiTile eyebrow="Inglés ICAO" value={0} format={() => "—"} note="Sin medir" />
            )}
          </KpiPanel>
        </div>

        {/* Tus cursos. Es la respuesta a "cuánto me falta para terminar", que es
            la pregunta con la que un estudiante entra, así que va antes que los
            indicadores. Cada número sale de práctica registrada: donde no hay
            datos la card dice "Sin empezar", nunca un cero decorativo. */}
        <section className="mt-6">
          <SectionTitle
            icon={HoldingIcon}
            eyebrow="Tus cursos"
            title="Continúa donde quedaste"
            hint="El avance sale de tu práctica registrada, no se estima."
          />
          {deferredLoading ? (
            <div className="grid gap-4 md:grid-cols-3 mt-3">
              <div className="h-[184px] rounded-xl bg-muted animate-pulse" />
              <div className="h-[184px] rounded-xl bg-muted animate-pulse" />
              <div className="h-[184px] rounded-xl bg-muted animate-pulse" />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3 mt-3">
              <CourseCard
                icon={WaypointIcon}
                color="blue"
                eyebrow="Examen PCA"
                title="Banco por materia"
                href="/app/pca"
                pct={pca?.pct ?? null}
                done={false}
                status={
                  pca
                    ? `${pca.started} de ${pca.totalSubjects} materias con práctica`
                    : "Ninguna materia iniciada"
                }
                hint={
                  readinessHint ??
                  (pca?.weakest
                    ? `Refuerza ${pca.weakest.subject_name}: ${Math.round(pca.weakest.avg_score)}% de acierto`
                    : "El banco completo, materia por materia, con explicación.")
                }
                cta={pca ? "Continuar" : "Empezar el curso"}
              />
              <CourseCard
                icon={VorIcon}
                color="cyan"
                eyebrow="Inglés ICAO"
                title="Camino al nivel 4"
                href="/app/icao"
                pct={icaoMeasured ? Math.min(100, Math.round(((icaoLevel ?? 0) / 4) * 100)) : null}
                done={icaoMeasured && (icaoLevel ?? 0) >= 4}
                status={
                  icaoMeasured
                    ? (icaoLevel ?? 0) >= 4
                      ? `Nivel ${icaoLevel} · cumples el mínimo legal`
                      : `Nivel ${icaoLevel} de 4 requerido`
                    : "Sin nivel medido"
                }
                hint={
                  icaoMeasured
                    ? (icaoLevel ?? 0) >= 4
                      ? "Mantenlo vivo: el nivel expira y las aerolíneas lo revisan."
                      : "Vocabulario, audio real y simulacro completo del TEA."
                    : "Mide tu nivel con el simulacro TEA y sabrás qué te falta."
                }
                cta={icaoMeasured ? "Continuar" : "Medir mi nivel"}
              />
              <CourseCard
                icon={LocalizerIcon}
                color="violet"
                eyebrow="Prep aerolínea"
                title="NOTAM"
                href="/app/aerolinea/notam"
                pct={notam ? notamPct(notam) : null}
                done={notam !== null && notam.best !== null && notam.best >= NOTAM_PASS_SCORE}
                status={
                  notam
                    ? `Lección ${Math.min(notam.lesson, NOTAM_TOTALS.lessonScreens)} de ${NOTAM_TOTALS.lessonScreens} · práctica ${Math.min(notam.practice, NOTAM_PRACTICE_TOTAL)} de ${NOTAM_PRACTICE_TOTAL}`
                    : "Sin empezar"
                }
                hint={
                  notam?.best != null
                    ? notam.best >= NOTAM_PASS_SCORE
                      ? `Evaluación aprobada con ${notam.best} de 100.`
                      : `Mejor puntaje en la evaluación: ${notam.best} de 100.`
                    : "Lección, decodificador y práctica con NOTAM reales de la Aerocivil."
                }
                cta={notam ? "Continuar" : "Empezar NOTAM"}
              />
            </div>
          )}
        </section>

        {/* Aviso de vencimiento. Solo aparece dentro de la ventana de 90 días o
            si ya venció: un aviso permanente deja de ser aviso. Es lo único del
            dashboard que puede dejar a un piloto en tierra, así que va arriba. */}
        {expiry && <div className="mt-6"><ExpiryAlert item={expiry} /></div>}

        {/* Today's plan + Wingman insight */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-4 mb-6">
          <section>
            <SectionTitle
              icon={WaypointIcon}
              eyebrow="Tu plan de hoy"
              title="3 acciones cortas, además del quiz"
              hint="No hace falta completarlas hoy."
            />
            <div className="rounded-xl surface overflow-hidden mt-3">
              {todayPlan.map((step, i) => (
                <TodayRow key={step.title} step={step} last={i === todayPlan.length - 1} />
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

        {/* Actividad. La racha ya vive en el panel de indicadores: antes el
            mismo dato salía tres veces (chip del hero, tile y card entera). Lo
            único que la card aportaba de más era el aviso de riesgo, que ahora
            va dentro de la actividad, que es su contexto natural. */}
        <div className="mb-6">
          <ActivityHeatmap
            data={heatmap}
            loading={deferredLoading}
            streakAtRisk={streakAtRisk}
            longestStreak={longestStreak}
            streakDays={streakDays}
            username={profile?.username ?? null}
          />
        </div>

        {/* Achievements + Cohort */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
          <AchievementsCard
            unlocked={achievements}
            all={allAchievements}
            loading={deferredLoading}
          />
          <CohortCard peers={peers} stageLabel={stageLabel} loading={deferredLoading} />
        </div>
      </div>
    </AppLayout>
  )
}

/**
 * Avance del curso NOTAM, con la misma fórmula del hub del módulo: lección,
 * práctica y evaluación pesan igual, y la evaluación aporta el mejor puntaje
 * (o el 100 si ya está aprobada). Si se toca allá, hay que tocarla aquí.
 */
function notamPct(n: NotamResumen): number {
  const lessonPct = (Math.min(n.lesson, NOTAM_TOTALS.lessonScreens) / NOTAM_TOTALS.lessonScreens) * 100
  const practicePct = (Math.min(n.practice, NOTAM_PRACTICE_TOTAL) / NOTAM_PRACTICE_TOTAL) * 100
  const examPct = n.best !== null && n.best >= NOTAM_PASS_SCORE ? 100 : (n.best ?? 0)
  return Math.round((lessonPct + practicePct + examPct) / 3)
}

/**
 * Card de curso: cuánto llevas, qué sigue y una sola salida.
 *
 * La barra solo existe cuando hay avance real. Sin práctica registrada va un
 * guion y "Sin empezar": una barra en cero el primer día se lee como fracaso,
 * y un 0% sería un dato que la app no puede sostener.
 */
function CourseCard({
  icon: Ic,
  color,
  eyebrow,
  title,
  href,
  pct,
  done,
  status,
  hint,
  cta,
}: {
  icon: IconComponent
  color: TileColorKey
  eyebrow: string
  title: string
  href: string
  pct: number | null
  done: boolean
  status: string
  hint: string
  cta: string
}) {
  return (
    <Link to={href} className="surface-lift group flex flex-col rounded-xl surface p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Los iconos aero solo aceptan className: el color viaja por
              currentColor desde el contenedor. */}
          <div
            className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
            style={{
              background: tileTint(color),
              border: `1px solid ${tileBorder(color, 20)}`,
              color: accentText(TILE_COLOR[color], 75),
            }}
          >
            <Ic className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] text-muted-foreground">{eyebrow}</div>
            <div className="text-[17px] font-semibold text-foreground tracking-[-0.021em] truncate">
              {title}
            </div>
          </div>
        </div>
        {done && <span className="chip chip-green flex-shrink-0">Completo</span>}
      </div>

      <div className="mt-4">
        {pct === null ? (
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[13px] text-muted-foreground">{status}</span>
            <span className="text-[24px] font-semibold tracking-[-0.03em] text-muted-foreground/50">
              —
            </span>
          </div>
        ) : (
          <>
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <span className="text-[13px] text-muted-foreground">{status}</span>
              <span className="tabular-nums text-[24px] font-semibold tracking-[-0.03em] text-foreground">
                {pct}%
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden bg-muted">
              <div
                className="h-full rounded-full transition-[width] duration-700"
                style={{ width: `${pct}%`, background: TILE_COLOR[color] }}
              />
            </div>
          </>
        )}
      </div>

      <p className="mt-3 text-[13px] text-muted-foreground leading-snug flex-1">{hint}</p>

      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-[13px] font-semibold" style={{ color: accentText(TILE_COLOR[color]) }}>
          {cta}
        </span>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
}

/**
 * Aviso de documento por vencer.
 *
 * Es el único dato del dashboard con consecuencia legal: con el médico vencido
 * un piloto no vuela, por bien que lleve los quizzes. Por eso rompe la retícula
 * y va en su propia franja, con el color del token semántico y no del acento.
 */
function ExpiryAlert({
  item,
}: {
  item: { id: string; license_type: string; custom_name: string | null; days: number }
}) {
  const vencido = item.days < 0
  const nombre = item.custom_name ?? item.license_type
  const color = vencido || item.days <= 30 ? "var(--av-red-400)" : "var(--av-amber-400)"
  const texto = vencido
    ? `Venció hace ${Math.abs(item.days)} ${Math.abs(item.days) === 1 ? "día" : "días"}`
    : item.days === 0
      ? "Vence hoy"
      : `Vence en ${item.days} ${item.days === 1 ? "día" : "días"}`

  return (
    <Link
      to="/app/vencimientos"
      className="surface-lift mb-6 flex items-center justify-between gap-4 rounded-xl border p-4"
      style={{
        borderColor: `color-mix(in oklab, ${color} 38%, transparent)`,
        background: `color-mix(in oklab, ${color} 7%, transparent)`,
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="flex-shrink-0" style={{ color: accentText(color, 75) }}>
          <AlertTriangle className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <div className="text-[15px] font-semibold text-foreground truncate">
            {nombre}: {texto.toLowerCase()}
          </div>
          <div className="text-[13px] text-muted-foreground">
            Renuévalo antes de que te deje en tierra.
          </div>
        </div>
      </div>
      <ArrowRight className="hidden sm:block h-4 w-4 flex-shrink-0 text-muted-foreground" />
    </Link>
  )
}

function CockpitHero({
  firstName,
  stageLabel,
  targetAirline,
  targetDate,
  progress,
  trialLeft,
  icaoMeasured,
  daily,
  deferredLoading,
}: {
  firstName: string
  stageLabel: string
  targetAirline: string | null
  targetDate: string | null
  progress: number | null
  trialLeft: number | null
  icaoMeasured: boolean
  daily: DailyQuizQuestion[]
  deferredLoading: boolean
}) {
  /** Chip claro para usar sobre la foto: los .chip-* semánticos tienen texto
   *  oscuro en modo claro y ahí quedarían ilegibles. */
  const heroChip =
    "inline-flex items-center gap-2 h-[24px] px-3 rounded-full text-[12px] font-semibold tracking-[0.01em] text-white border border-white/25 bg-white/12 backdrop-blur-sm"

  /**
   * La acción del día vive DENTRO del hero: antes eran dos cards sueltas
   * debajo (quiz del día y test inicial) compitiendo con el hero por ser lo
   * primero. Prioridad: sin nivel medido manda el test inicial; con nivel y
   * quiz curado, el quiz de hoy; si hoy no hay quiz curado, la práctica por
   * materia, que siempre existe. Nada de contadores inventados.
   */
  const accion = !icaoMeasured
    ? {
        eyebrow: "Empieza por aquí",
        titulo: "Haz tu test inicial: inglés ICAO y 2 preguntas por materia",
        detalle: "~15 min · descubre tu nivel inicial",
        href: "/app/test-inicial",
        cta: "Hacer test inicial",
      }
    : daily.length > 0
      ? {
          eyebrow: "Quiz del día",
          titulo: `${daily.length} pregunta${daily.length !== 1 ? "s" : ""}${daily[0]?.subject_name ? ` · empieza con ${daily[0].subject_name}` : ""}`,
          detalle: "Se renueva mañana",
          href: DAILY_ACTION.href,
          cta: DAILY_ACTION.cta,
        }
      : {
          eyebrow: "Práctica del día",
          titulo: "El banco por materia te espera",
          detalle: "Un quiz corto mantiene tu racha viva",
          href: "/app/pca",
          cta: "Practicar ahora",
        }

  return (
    <section className="relative overflow-hidden">
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
            "linear-gradient(135deg, rgb(11 16 32 / 90%) 0%, color-mix(in oklab, var(--av-blue-500) 34%, rgb(11 16 32 / 86%)) 100%)",
        }}
      />

      <div className="relative px-6 pt-7 pb-6 sm:px-8 sm:pt-9 sm:pb-7">
        <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-2">
          <div className="min-w-0">
            <div className="text-[13px] text-white/70 truncate">
              {stageLabel}
              {targetAirline ? ` · objetivo ${targetAirline}` : ""}
            </div>
            <h1 className="mt-1 text-[24px] sm:text-[32px] font-semibold tracking-[-0.03em] leading-[1.1] text-white">
              {greetingTime()}, {firstName}
            </h1>
          </div>
          {/* Chips de contexto: la cuenta atras al examen (la fecha se fija en
              el hero de PCA, #111) y la prueba. Bajo 14 dias el examen pasa a
              ambar, igual que alla; vencida, invita a moverla. */}
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {targetDate !== null &&
              (() => {
                const dias = daysUntil(targetDate)
                if (dias < 0) {
                  return (
                    <Link to="/app/pca" className={heroChip}>
                      <CalendarDays className="h-3 w-3" /> Tu fecha de examen ya pasó: fija una nueva
                    </Link>
                  )
                }
                const urgente = dias <= 14
                return (
                  <span
                    className={`${heroChip} tabular-nums`}
                    style={
                      urgente
                        ? {
                            color: "var(--av-amber-400)",
                            borderColor: "color-mix(in oklab, var(--av-amber-400) 45%, transparent)",
                          }
                        : undefined
                    }
                  >
                    <CalendarDays className="h-3 w-3" />
                    {dias === 0
                      ? "Tu examen PCA es hoy"
                      : `Examen PCA: en ${dias} día${dias !== 1 ? "s" : ""}`}
                  </span>
                )
              })()}
            {trialLeft !== null && trialLeft > 0 && (
              <span className={`${heroChip} tabular-nums`}>
                <Timer className="h-3 w-3" /> Prueba: {trialLeft} día{trialLeft !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        {/* Avance a aerolínea. Sin etapa no hay nada que medir: va la
            invitación a generarlo, nunca un 0% con la barra en cero. */}
        {progress === null ? (
          <Link
            to="/onboarding"
            className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors"
          >
            Dinos en qué etapa vas y calculamos tu avance
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <div className="mt-5 max-w-[560px]">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[15px] font-semibold text-white">Tu avance a aerolínea</span>
              <span className="text-gradient-gold tabular-nums text-[32px] font-semibold tracking-[-0.02em]">
                <CountUp to={progress} />%
              </span>
            </div>
            <div className="relative mt-2 h-1.5 rounded-full overflow-hidden bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-[width] duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* La franja de la acción del día, parte del hero y no una card aparte */}
        {deferredLoading && icaoMeasured ? (
          <div className="mt-6 h-[76px] rounded-lg bg-white/10 animate-pulse" aria-hidden />
        ) : (
          <div className="mt-6 rounded-lg border border-white/15 bg-white/10 backdrop-blur-sm px-4 py-3.5 sm:px-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3.5 min-w-0">
              <Sun className="h-5 w-5 flex-shrink-0" style={{ color: "var(--av-amber-400)" }} />
              <div className="min-w-0">
                <div className="text-[13px]" style={{ color: "var(--av-amber-400)" }}>
                  {accion.eyebrow}
                </div>
                <div className="text-[17px] font-semibold text-white leading-snug">
                  {accion.titulo}
                </div>
                <div className="text-[13px] text-white/60">{accion.detalle}</div>
              </div>
            </div>
            <Link
              to={accion.href}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full font-semibold text-[15px] flex-shrink-0 transition-transform hover:-translate-y-0.5"
              style={{ background: "white", color: "var(--av-navy-900)" }}
            >
              {accion.cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

/**
 * Fila compacta, no card. Tres cards de 180px para decir "Revisa tu match,
 * ~5 min" era mucho aire diciendo poco: una herramienta muestra varias cosas
 * ordenadas en poco espacio. El icono va en un cuadro neutro, porque tres
 * tintes pastel para tres acciones igual de importantes es decoración.
 */
function TodayRow({ step, last }: { step: NextStep; last: boolean }) {
  const Ic = step.icon
  return (
    <Link
      to={step.href}
      className={`flex items-center gap-4 px-4 py-3 transition-colors hover:bg-muted/60 ${
        last ? "" : "border-b border-border"
      }`}
    >
      <Ic className="h-[22px] w-[22px] text-muted-foreground flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-semibold text-foreground tracking-[-0.015em]">
          {step.title}
        </div>
        <div className="text-[13px] text-muted-foreground leading-snug mt-1">
          {step.description}
        </div>
      </div>
      <span className="tabular-nums text-[13px] text-muted-foreground flex-shrink-0 hidden sm:block">
        {step.minutes} min
      </span>
      <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
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
        href: "/app/match",
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
    <div className="relative overflow-hidden rounded-xl surface p-5">
      <div className="relative">
        <div className="inline-flex items-center gap-2 text-[13px] text-muted-foreground">
          <Radar className="h-3 w-3" /> Insight de Wingman
        </div>
        <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.02em] text-foreground">{insight.title}</h3>
        <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">{insight.body}</p>
        <Link
          to={insight.href}
          className={appButtonClass({ variant: "secondary" }, "mt-4")}
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
  title,
  line,
  cta,
  href,
}: {
  icon: IconComponent
  title: string
  line: string
  cta: string
  href: string
}) {
  return (
    <div className="py-5 flex flex-col items-center text-center">
      <div className="flex items-center justify-center h-11 w-11 rounded-lg border border-border bg-muted text-muted-foreground">
        <Ic className="h-5 w-5" />
      </div>
      <div className="mt-3 text-[15px] font-semibold text-foreground tracking-[-0.015em]">{title}</div>
      <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed max-w-[34ch]">{line}</p>
      <Link
        to={href}
        className={appButtonClass({ variant: "secondary" }, "mt-4")}
      >
        {cta} <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  )
}

/**
 * Actividad. Sin datos no se dibujan 12 semanas en gris: una cuadrícula vacía
 * de 280px de alto ocupa media pantalla para no decir nada. Se colapsa a los 7
 * días de la semana en curso y crece cuando hay con qué llenarla.
 *
 * Absorbe además el aviso de racha en riesgo, que antes vivía en una card
 * aparte repitiendo un dato que ya está en el panel de indicadores.
 */
function ActivityHeatmap({
  data,
  loading,
  streakAtRisk,
  longestStreak,
  streakDays,
  username,
}: {
  data: ActivityDay[]
  loading: boolean
  streakAtRisk: boolean
  longestStreak: number
  streakDays: number
  username: string | null
}) {
  const [sharing, setSharing] = useState(false)

  async function compartir() {
    setSharing(true)
    try {
      const via = await shareStreak(streakDays, username)
      if (via === "download") toast.success("Imagen descargada: súbela a tu historia o compártela donde quieras")
    } catch {
      toast.error("No pudimos generar la imagen")
    } finally {
      setSharing(false)
    }
  }
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
    <div className="rounded-xl surface p-5">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[13px] text-muted-foreground">
            <Activity className="h-3 w-3" /> Tu actividad
          </div>
          <div className="text-[15px] font-semibold text-foreground mt-1">
            {total > 0 ? "Últimas 12 semanas" : "Esta semana"}
          </div>
        </div>
        <div className="flex items-start gap-4">
          {/* Compartir la racha: la imagen sale con la marca y los galones del
              hito. Solo aparece con racha viva: compartir un cero no motiva. */}
          {streakDays > 0 && (
            <button
              type="button"
              onClick={() => void compartir()}
              disabled={sharing}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[13px] font-semibold border border-border bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-60"
            >
              <Share2 className="h-3.5 w-3.5" />
              {sharing ? "Generando" : "Compartir racha"}
            </button>
          )}
          <div className="text-right">
            <div className="tabular-nums text-[24px] font-semibold text-foreground tracking-[-0.03em] leading-none">
              {total > 0 ? <CountUp to={total} /> : "—"}
            </div>
            <div className="text-[13px] text-muted-foreground mt-1">actividades</div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-[60px] rounded-xl bg-muted animate-pulse" />
      ) : total === 0 ? (
        <>
          {/* Una sola fila de 7 días en lugar de 12 semanas en gris. */}
          <div className="flex gap-2 items-end">
            {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full rounded-lg"
                  style={{ height: 32, background: "var(--muted)" }}
                />
                <span className="text-[12px] text-muted-foreground">{d}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-muted-foreground">
            Tu primera actividad aparece aquí hoy.
          </p>
        </>
      ) : (
        <>
          <div className="flex gap-2 items-start">
            <div className="flex flex-col gap-[3px] mt-1 mr-1">
              {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
                <div
                  key={i}
                  className="text-[12px] text-muted-foreground text-right"
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
                      className="w-[14px] h-[14px] rounded-[3px] flex-shrink-0 transition-transform hover:scale-150"
                      style={{ background: color(d.activities_count) }}
                      title={`${d.date} · ${d.activities_count} actividad${d.activities_count !== 1 ? "es" : ""}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
            {longestStreak > 0 ? (
              <span className="tabular-nums text-[13px] text-muted-foreground">
                Mejor racha: {longestStreak} días
              </span>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
              <span>Menos</span>
              {[0, 1, 3, 5, 7].map((c) => (
                <div key={c} className="w-[11px] h-[11px] rounded-[3px]" style={{ background: color(c) }} />
              ))}
              <span>Más</span>
            </div>
          </div>
        </>
      )}

      {/* El aviso de racha vive aquí, junto a la actividad que lo produce, y no
          en una card propia repitiendo un dato que ya está en los indicadores. */}
      {streakAtRisk && (
        <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <span
              className="inline-flex items-center gap-2 text-[15px] font-semibold"
              style={{ color: "var(--av-warn-fg)" }}
            >
              <AlertTriangle className="h-4 w-4" /> Tu racha está en riesgo
            </span>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Si no estudias hoy se reinicia. Con una pregunta la salvas.
            </p>
          </div>
          <Link to={DAILY_ACTION.href} className={appButtonClass({ variant: "secondary" })}>
            Salvar mi racha <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  )
}

/**
 * Logros como colección visible, no como fichas sueltas.
 *
 * El diseño anterior eran emojis flotando sobre cuatro gradientes, sin nombre a
 * la vista y con el "próximo" en gris lavado. Se veían ocho medallas y nada
 * más: ni cuántas hay, ni cuáles faltan, ni por qué querría uno la siguiente.
 * Ahora se ve la colección entera, lo desbloqueado en el color de su nivel y lo
 * pendiente en silueta con borde punteado, cada uno con su nombre. Ver los
 * huecos es lo que empuja a llenarlos; esconderlos no motivaba nada.
 */
function AchievementsCard({
  unlocked,
  all,
  loading,
}: {
  unlocked: Achievement[]
  all: Achievement[]
  loading: boolean
}) {
  /** Color de nivel desde tokens. Los gradientes a mano eran cuatro superficies
   *  que no existían en ninguna otra parte de la app. */
  const TIER_COLOR: Record<Achievement["tier"], string> = {
    bronze: "color-mix(in oklab, var(--av-amber-400) 45%, var(--av-red-400))",
    silver: "var(--muted-foreground)",
    gold: "var(--av-amber-400)",
    platinum: "var(--av-cyan-400)",
  }
  const TIER_LABEL: Record<Achievement["tier"], string> = {
    bronze: "Bronce",
    silver: "Plata",
    gold: "Oro",
    platinum: "Platino",
  }

  const unlockedCodes = new Set(unlocked.map((a) => a.code))
  const next = all.find((a) => !unlockedCodes.has(a.code)) ?? null
  const shown = all.slice(0, 12)
  const pct = all.length > 0 ? Math.round((unlockedCodes.size / all.length) * 100) : 0

  return (
    <div className="rounded-xl surface p-5">
      <SectionTitle
        icon={Trophy}
        eyebrow="Logros"
        title={loading ? "Cargando tu colección" : `${unlockedCodes.size} de ${all.length} desbloqueados`}
        right={
          <Link
            to="/app/perfil"
            className="text-[12px] font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
            style={{ color: "var(--av-blue-500)" }}
          >
            Ver todos <ArrowRight className="h-3 w-3" />
          </Link>
        }
      />

      {loading ? (
        <div className="h-[180px] rounded-xl bg-muted animate-pulse" />
      ) : all.length === 0 ? (
        <EmptyState
          icon={Trophy}
          title="La colección se está preparando"
          line="Vuelve más tarde: aquí van a aparecer los logros."
          cta="Empezar quiz de hoy"
          href={DAILY_ACTION.href}
        />
      ) : (
        <>
          {/* Cuánto llevas de la colección, en una barra real */}
          <div className="h-1.5 rounded-full overflow-hidden bg-muted mb-6">
            <div
              className="h-full rounded-full transition-[width] duration-700"
              style={{ width: `${pct}%`, background: "var(--av-amber-400)" }}
            />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-3 gap-y-4">
            {shown.map((a) => {
              const isUnlocked = unlockedCodes.has(a.code)
              const Badge = badgeForCode(a.code)
              return (
                <div
                  key={a.code}
                  className="flex flex-col items-center text-center gap-2 min-w-0"
                  title={`${a.name}: ${a.description}${isUnlocked ? "" : " (pendiente)"}`}
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full"
                    style={
                      isUnlocked
                        ? {
                            background: `color-mix(in oklab, ${TIER_COLOR[a.tier]} 14%, transparent)`,
                            border: `1.5px solid color-mix(in oklab, ${TIER_COLOR[a.tier]} 55%, transparent)`,
                            color: accentText(TIER_COLOR[a.tier], 80),
                          }
                        : {
                            background: "var(--muted)",
                            border: "1.5px dashed var(--border)",
                            color: "var(--muted-foreground)",
                          }
                    }
                  >
                    <Badge className="h-[22px] w-[22px]" />
                  </div>
                  <div
                    className={`w-full text-[12px] leading-tight line-clamp-2 ${
                      isUnlocked ? "font-semibold text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {a.name}
                  </div>
                </div>
              )
            })}
          </div>

          {next && (
            <>
              <div className="div-dotted my-4" />
              <div className="flex items-start gap-3">
                <span
                  className="chip flex-shrink-0 mt-1"
                  style={{
                    color: accentText(TIER_COLOR[next.tier]),
                    background: `color-mix(in oklab, ${TIER_COLOR[next.tier]} 12%, transparent)`,
                    borderColor: `color-mix(in oklab, ${TIER_COLOR[next.tier]} 32%, transparent)`,
                  }}
                >
                  {TIER_LABEL[next.tier]}
                </span>
                <p className="m-0 text-[13px] text-muted-foreground leading-snug">
                  <span className="font-semibold text-foreground">Siguiente: {next.name}.</span>{" "}
                  {next.description}
                </p>
              </div>
            </>
          )}
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
    <div className="rounded-xl surface p-5">
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
              className="flex items-center gap-3 px-2 py-2 rounded-lg transition-colors hover:bg-muted/50"
            >
              <div
                className="mono w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-[12px]"
                style={{ background: "var(--av-navy-800)" }}
              >
                {p.username[0]?.toUpperCase() ?? "?"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="mono text-[15px] font-semibold text-foreground">@{p.username}</div>
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
 * Espeja el layout real (mismas clases de grid, mismos breakpoints y alturas
 * parecidas) para que al cargar no salte la página.
 */
function DashboardSkeleton() {
  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto animate-pulse">
        {/* Consola: hero + indicadores, una sola pieza */}
        <div className="h-[430px] bg-muted rounded-xl" />

        {/* Tus cursos */}
        <div className="grid gap-4 md:grid-cols-3 mt-6 mb-6">
          <div className="h-[184px] bg-muted rounded-lg" />
          <div className="h-[184px] bg-muted rounded-lg" />
          <div className="h-[184px] bg-muted rounded-lg" />
        </div>

        {/* Plan de hoy + Wingman */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-4 mb-6">
          <div>
            <div className="h-[52px] w-[260px] bg-muted rounded-lg mb-4" />
            <div className="h-[186px] bg-muted rounded-lg mt-3" />
          </div>
          <div className="h-[226px] bg-muted rounded-lg" />
        </div>

        {/* Racha + actividad */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,1fr)_2.2fr] gap-4 mb-6">
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
