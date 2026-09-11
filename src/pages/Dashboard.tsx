import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { RotateCcw } from "lucide-react"
import {
  HoldingIcon,
  LocalizerIcon,
  VorIcon,
  WaypointIcon,
} from "@/components/icons/aero"
import { reportarError } from "@/lib/errores"
import { useSession } from "@/hooks/useSession"
import { useRachaEnBarra } from "@/components/layout/rachaEnBarra"
import { EstadoError } from "@/components/EstadoError"
import { SectionTitle } from "@/components/ui/section-title"
import { KpiTile, KpiPanel } from "@/components/ui/kpi-tile"
import { EXAM_PASS_SCORE as NOTAM_PASS_SCORE, NOTAM_TOTALES, NOTAM_PRACTICE_TOTAL } from "@/lib/notamComun"
import { revisarVencimientos, traerInicioPanel, traerTarjetasPanel } from "@/services/panel"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import {
  type PilotState,
  type Profile,
  type Streak,
  type Subscription,
  type Achievement,
  type ActivityDay,
  type DailyQuizQuestion,
  type Peer,
  type SubjectMastery,
  type NotamResumen,
  type LicenseRow,
  type PcaReadiness,
} from "@/components/dashboard/tipos"
import {
  daysUntil,
  STAGE_LABEL,
  computeAirlineProgress,
  buildTodayPlan,
  trialDaysLeft,
  notamPct,
} from "@/components/dashboard/plan"
import { CourseCard } from "@/components/dashboard/CourseCard"
import { ExpiryAlert } from "@/components/dashboard/ExpiryAlert"
import { CockpitHero } from "@/components/dashboard/CockpitHero"
import { TodayRow } from "@/components/dashboard/TodayRow"
import { WingmanInsight } from "@/components/dashboard/WingmanInsight"
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap"
import { AchievementsCard } from "@/components/dashboard/AchievementsCard"
import { CohortCard } from "@/components/dashboard/CohortCard"
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton"

export function Dashboard() {
  const { user } = useSession()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  /** No se pudo leer el perfil o el estado del piloto: se ofrece reintentar. */
  const [fallo, setFallo] = useState(false)
  const [intento, setIntento] = useState(0)
  /** Las tarjetas (logros, heatmap, cohorte, quiz diario…) cargan después del
   *  hero, con skeleton local en su propia card: panel_tarjetas() es la llamada
   *  lenta y el encabezado no la espera. */
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
        const inicio = await traerInicioPanel()
        if (cancelled) return

        setProfile(inicio.perfil)
        setPilot(inicio.piloto)
        setStreak(inicio.racha)
        setSubscription(inicio.suscripcion)
        setRecentAttempts(inicio.quizzesCompletados)

        if (!inicio.piloto?.stage) {
          navigate("/onboarding", { replace: true })
          return
        }
      } catch (err) {
        // Sin perfil ni estado del piloto no se sabe si le falta el onboarding:
        // se ofrece reintentar en vez de mandarlo a hacerlo otra vez.
        reportarError("dashboard: encabezado", err)
        if (!cancelled) setFallo(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadCore()
    return () => {
      cancelled = true
    }
  }, [user, navigate, intento])

  useEffect(() => {
    if (!user) return
    let cancelled = false

    async function loadDeferred() {
      try {
        const tarjetas = await traerTarjetasPanel()
        revisarVencimientos()
        if (cancelled) return

        setAllAchievements(tarjetas.logros)
        setAchievements(tarjetas.desbloqueados)
        setHeatmap(tarjetas.actividad)
        setPeers(tarjetas.companeros)
        setDaily(tarjetas.quizDiario)
        setMastery(tarjetas.dominio)
        // NOTAM contado en la base contra el catálogo; null si no ha empezado,
        // y la card lo dice con un guion en vez de un 0%.
        setNotam(tarjetas.notam)
        setLicenses(tarjetas.licencias)
        setReadiness(tarjetas.preparacion)
      } catch (err) {
        // Las cards muestran su propio estado vacío si algo falla: no se
        // interrumpe el dashboard con un toast, pero el fallo se reporta.
        reportarError("dashboard: tarjetas", err)
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

  // Antes del return temprano: un hook no puede quedar detrás de un if.
  useRachaEnBarra(loading ? undefined : (streak?.current_streak ?? 0))

  if (fallo) {
    return (
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        <EstadoError
          titulo="No pudimos cargar tu panel"
          mensaje="Revisa tu conexión e inténtalo de nuevo. Tu avance está guardado."
          acciones={
            <button
              type="button"
              onClick={() => {
                setFallo(false)
                setLoading(true)
                setIntento((n) => n + 1)
              }}
              className={appButtonClass({ size: "lg" })}
              style={appButtonStyle()}
            >
              <RotateCcw className="h-4 w-4" /> Intentar de nuevo
            </button>
          }
        />
      </div>
    )
  }

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
    <>
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
                    ? `Lección ${Math.min(notam.lesson, NOTAM_TOTALES.lessonScreens)} de ${NOTAM_TOTALES.lessonScreens} · práctica ${Math.min(notam.practice, NOTAM_PRACTICE_TOTAL)} de ${NOTAM_PRACTICE_TOTAL}`
                    : "Sin empezar"
                }
                hint={
                  notam?.best != null
                    ? notam.best >= NOTAM_PASS_SCORE
                      ? `Evaluación aprobada con ${notam.best} de 100.`
                      : `Mejor puntaje en la evaluación: ${notam.best} de 100.`
                    : "Lección y práctica con NOTAM reales de la Aerocivil."
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
    </>
  )
}
