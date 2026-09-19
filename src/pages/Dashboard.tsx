import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, BookOpen, Radio, RotateCcw } from "lucide-react"
import {
  avanceDeModulo,
  MODULOS_AEROLINEA,
} from "@/lib/modulosAerolinea"
import { reportarError } from "@/lib/errores"
import { useSession } from "@/hooks/useSession"
import { useRachaEnBarra } from "@/components/layout/rachaEnBarra"
import { EstadoError } from "@/components/EstadoError"
import { revisarVencimientos, traerInicioPanel, traerTarjetasPanel } from "@/services/panel"
import type { PostulacionAbierta } from "@/services/panel"
import type { PlanDeEstudio } from "@/services/planDeEstudio"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import type {
  PilotState,
  Profile,
  Streak,
  Subscription,
  Achievement,
  ActivityDay,
  DailyQuizQuestion,
  Peer,
  SubjectMastery,
  NotamResumen,
  LicenseRow,
  PcaReadiness,
} from "@/components/dashboard/tipos"
import { daysUntil, STAGE_LABEL, computeAirlineProgress, trialDaysLeft } from "@/components/dashboard/plan"
import { TarjetaModulo } from "@/components/aerolinea/TarjetaModulo"
import { CARA_DE_MODULO, TEMAS_EN_CAMINO } from "@/components/aerolinea/carasDeModulo"
import { CompromisosDeHoy } from "@/components/dashboard/CompromisosDeHoy"
import { ExpiryAlert } from "@/components/dashboard/ExpiryAlert"
import { PanelHero } from "@/components/dashboard/PanelHero"
import { Indicadores, type Indicador } from "@/components/dashboard/Indicadores"
import { AccesosDirectos } from "@/components/dashboard/AccesosDirectos"
import { DominioPca } from "@/components/dashboard/DominioPca"
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap"
import { AchievementsCard } from "@/components/dashboard/AchievementsCard"
import { CohortCard } from "@/components/dashboard/CohortCard"
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton"
import pcaFoto from "@/assets/photos/pca-flightdeck.webp"
import icaoFoto from "@/assets/photos/icao-night-cockpit.webp"

/**
 * El panel, con el vocabulario de Ingreso a aerolínea.
 *
 * Se veía como otra aplicación. Un piloto pasaba de la portada de los módulos
 * —foto bajo velo navy, rótulos en Archivo, tarjetas con portada y barra fina—
 * a un bloque azul con textura de radar, la cifra de avance en dorado, barras
 * rosas y cian que no eran de ningún sistema y cinco estilos de tarjeta
 * distintos. Ahora usa las mismas piezas: el mismo hero, la misma
 * `TarjetaModulo`, los mismos rótulos de grupo.
 *
 * El color vuelve a significar algo. El ámbar solo sale donde hay un aviso de
 * verdad —un documento por vencer, el examen a menos de dos semanas, un nivel
 * ICAO por debajo del mínimo, la racha en riesgo— y el verde, solo en lo que se
 * avanzó.
 *
 * El orden es el de las preguntas con las que entra un piloto: cómo voy y qué
 * hago hoy (el hero), qué me puede dejar en tierra (el vencimiento), mis
 * números, por dónde sigo (módulos y cursos), a dónde voy (accesos) y cómo lo
 * estoy haciendo (preparación).
 */

/** Rótulo de grupo: el mismo de la portada de Ingreso a aerolínea. */
const ROTULO =
  "nh-display m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"

/** El CTA de una tarjeta según por dónde vas, igual que en la portada del módulo. */
function ctaDeAvance(pct: number): string {
  if (pct >= 100) return "Repasar"
  return pct > 0 ? "Continuar" : "Empezar"
}

/** Horas con separador de miles, a la colombiana. */
const horas = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 })

/** Hoy en Bogotá, que es con lo que la base cierra el día de estudio. */
function hoyEnBogota(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date())
}

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
  const [modulos, setModulos] = useState<Record<string, NotamResumen | null>>({})
  const [plan, setPlan] = useState<PlanDeEstudio | null>(null)
  const [postulaciones, setPostulaciones] = useState<PostulacionAbierta[]>([])
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
        setModulos(tarjetas.modulos)
        setPlan(tarjetas.plan)
        setPostulaciones(tarjetas.postulaciones)
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
      <div className="@container px-5 sm:px-8 py-6 sm:py-8 pb-16 max-w-[1600px] mx-auto">
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
  /** Sin nivel medido no inventamos un 0: el indicador muestra un guion. */
  const icaoMeasured = icaoLevel !== null && icaoLevel > 0
  /** null = todavía no hay etapa, así que no hay avance que mostrar. Un 0 % con
   *  la barra vacía se leía como fracaso el primer día. */
  const progress = stage ? computeAirlineProgress(stage, icaoLevel, recentAttempts) : null
  const firstName =
    profile?.full_name?.split(" ")[0] ?? profile?.username ?? user?.email?.split("@")[0] ?? "piloto"
  const trialLeft = subscription?.status === "trialing" ? trialDaysLeft(subscription.current_period_end) : null

  const streakDays = streak?.current_streak ?? 0
  const longestStreak = streak?.longest_streak ?? 0
  // La fecha llega como "AAAA-MM-DD": sin hora, new Date() la parsea como
  // medianoche UTC, que en Colombia es el día ANTERIOR a las 7 de la noche.
  // Con eso, una racha hecha hoy salía "en riesgo" toda la tarde.
  const streakAtRisk =
    streakDays > 0 && streak?.last_activity_date
      ? new Date(streak.last_activity_date + "T00:00:00").toDateString() !== new Date().toDateString()
      : false

  const indicadores: Indicador[] = [
    {
      rotulo: "Horas totales",
      valor: pilot?.total_hours ? horas.format(pilot.total_hours) : null,
      nota: pilot?.hours_pic ? `PIC ${pilot.hours_pic.toFixed(1)}` : "Anótalas en tu perfil",
    },
    {
      rotulo: "Racha",
      valor: streakDays > 0 ? String(streakDays) : null,
      unidad: streakDays === 1 ? "día" : "días",
      nota: longestStreak > 0 ? `Mejor racha: ${longestStreak}` : "Sin racha todavía",
    },
    {
      rotulo: "Quizzes",
      valor: recentAttempts > 0 ? String(recentAttempts) : null,
      nota: recentAttempts > 0 ? "Completados" : "Ninguno aún",
    },
    {
      rotulo: "Inglés ICAO",
      valor: icaoMeasured ? String(icaoLevel) : null,
      nota: icaoMeasured ? "Mínimo requerido: 4" : "Mídelo en el test inicial",
      aviso: icaoMeasured && (icaoLevel ?? 0) < 4,
    },
  ]

  /**
   * Los cinco módulos, en el orden de la portada de Ingreso a aerolínea:
   * primero lo que quedó a medias, luego lo que no se ha tocado y al final lo
   * terminado. El que más avanzó de los que van a medias lleva «En curso».
   */
  const modulosEnOrden = MODULOS_AEROLINEA.map((m) => {
    const resumen = modulos[m.clave] ?? null
    const pct = resumen ? avanceDeModulo(resumen, m) : 0
    return { m, resumen, pct }
  }).sort((a, b) => {
    const grupo = (pct: number) => (pct >= 100 ? 2 : pct > 0 ? 0 : 1)
    return grupo(a.pct) - grupo(b.pct) || b.pct - a.pct
  })
  const enCurso = modulosEnOrden.find((x) => x.pct > 0 && x.pct < 100)?.m.clave ?? null

  return (
    <div className="notam-hub @container px-5 sm:px-8 py-6 sm:py-8 pb-16 max-w-[1600px] mx-auto">
      <PanelHero
        nombre={firstName}
        etapa={stageLabel}
        aerolineaObjetivo={pilot?.target_airline ?? null}
        fechaExamen={pilot?.target_date ?? null}
        avance={progress}
        diasDePrueba={trialLeft}
        icaoMedido={icaoMeasured}
        quizDiario={daily}
      />

      {/* Lo único del panel que puede dejar a un piloto en tierra, así que va
          pegado al hero. Solo aparece dentro de la ventana de 90 días o si ya
          venció: un aviso permanente deja de ser aviso. */}
      {expiry && (
        <div className="mt-4">
          <ExpiryAlert item={expiry} />
        </div>
      )}

      {/* Lo que él mismo se puso: si hoy le toca estudiar y qué postulaciones
          esperan. Si no se ha puesto nada, no aparece y no deja hueco. */}
      <div className="mt-4 empty:hidden">
        <CompromisosDeHoy
          plan={plan}
          estudioHoy={heatmap.some((d) => d.date === hoyEnBogota() && d.activities_count > 0)}
          postulaciones={postulaciones}
        />
      </div>

      <section className="mt-8" aria-labelledby="panel-numeros">
        <h2 id="panel-numeros" className={ROTULO}>
          Tus números
        </h2>
        <div className="mt-3">
          <Indicadores items={indicadores} />
        </div>
      </section>

      {/* Los accesos directos van aquí, antes de los módulos: son lo que se
          busca de un vistazo al llegar, y abajo del todo pedían bajar tres
          pantallas para algo que se usa todos los días. */}
      <section className="mt-8" aria-labelledby="panel-accesos">
        <h2 id="panel-accesos" className={ROTULO}>
          Accesos directos
        </h2>
        <div className="mt-3">
          <AccesosDirectos />
        </div>
      </section>

      <section className="mt-8" aria-labelledby="panel-modulos">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="panel-modulos" className={ROTULO}>
            Ingreso a aerolínea
          </h2>
          <Link
            to="/app/aerolinea"
            className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-foreground transition-[gap] hover:gap-2"
          >
            Ver el módulo <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
        {/* Las tarjetas son las de la portada del módulo, con sus fotos y sus
            acentos: el mismo módulo se ve igual en las dos pantallas. El avance
            sale de lo que registró la base, no se estima. */}
        <div className="mt-3 grid grid-cols-1 gap-4 @xl:grid-cols-2 @4xl:grid-cols-3">
          {modulosEnOrden.map(({ m, resumen, pct }) => {
            const cara = CARA_DE_MODULO[m.clave]
            const aprobada = resumen?.best != null && resumen.best >= m.totales.aprobacion
            return (
              <TarjetaModulo
                key={m.clave}
                to={m.hub}
                titulo={m.titulo}
                descripcion={cara.descripcion}
                icon={cara.icon}
                color={cara.color}
                foto={cara.foto}
                fotoHueco={cara.fotoHueco}
                meta={
                  resumen?.best != null
                    ? aprobada
                      ? `Evaluación aprobada con ${resumen.best}`
                      : `Mejor evaluación: ${resumen.best} de 100`
                    : `${m.totales.secciones} secciones · ${m.totales.practicas} ejercicios`
                }
                estado={
                  !resumen
                    ? "Sin empezar"
                    : pct >= 100
                      ? "Módulo completo"
                      : `${Math.min(resumen.lesson, m.totales.secciones)}/${m.totales.secciones} secciones · ${Math.min(resumen.practice, m.totales.practicas)}/${m.totales.practicas} ejercicios`
                }
                avance={pct}
                completo={pct >= 100}
                chip={m.clave === enCurso ? "En curso" : undefined}
                cta={ctaDeAvance(pct)}
                cargando={deferredLoading}
              />
            )
          })}
          {/* La celda que sobra en la segunda fila: lo que viene, igual que en
              la portada del módulo, que llena su hueco con lo mismo. Es lo único
              del módulo que el panel no enseña en otra parte. Borde sólido: en
              esta app el punteado significa «falta algo», y esto no falta, está
              anunciado. */}
          {TEMAS_EN_CAMINO.length > 0 && (
            <div className="flex flex-col rounded-2xl surface p-5">
              <span className="nh-display text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                En camino
              </span>
              <p className="m-0 mt-2 text-[13px] leading-relaxed text-muted-foreground">
                Se abren en este orden, cada uno cuando está completo.
              </p>
              <ol className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
                {TEMAS_EN_CAMINO.map((t, i) => (
                  <li key={t} className="flex items-baseline gap-3 text-[13.5px] font-medium text-foreground">
                    <span className="tabular w-4 shrink-0 text-[12px] font-semibold text-muted-foreground">{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ol>
              <Link
                to="/app/aerolinea"
                className="group mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold text-foreground"
              >
                Ver todo el módulo
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="mt-8" aria-labelledby="panel-cursos">
        <h2 id="panel-cursos" className={ROTULO}>
          Tus cursos
        </h2>
        {/* Horizontales, como las herramientas de la portada del módulo: son
            dos y así llenan la fila en vez de dejar huecos. Sin acento: el
            ámbar y el verde son semántica, y estos cursos no tienen color propio
            que prometer. */}
        <div className="mt-3 grid grid-cols-1 gap-4 @4xl:grid-cols-2">
          <TarjetaModulo
            to="/app/pca"
            titulo="Examen PCA"
            descripcion={
              pca?.weakest
                ? `Refuerza ${pca.weakest.subject_name}: ${Math.round(pca.weakest.avg_score)} % de acierto.`
                : "El banco completo, materia por materia, con su explicación."
            }
            meta={
              readiness?.passed_recently
                ? `Aprobado hace poco con ${readiness.best_score ?? 0} de 100`
                : readiness?.avg_score_60d != null && (readiness.attempts_60d ?? 0) > 0
                  ? `Promedio de 60 días: ${Math.round(readiness.avg_score_60d)} de 100`
                  : "Banco por materia"
            }
            icon={BookOpen}
            foto={pcaFoto}
            estado={pca ? `${pca.started} de ${pca.totalSubjects} materias con práctica` : "Ninguna materia iniciada"}
            avance={pca?.pct ?? 0}
            completo={(pca?.pct ?? 0) >= 100}
            cta={pca ? "Continuar" : "Empezar"}
            orientacion="horizontal"
            cargando={deferredLoading}
          />
          <TarjetaModulo
            to="/app/icao"
            titulo="Inglés ICAO"
            descripcion={
              icaoMeasured
                ? (icaoLevel ?? 0) >= 4
                  ? "Mantenlo vivo: el nivel expira y las aerolíneas lo revisan."
                  : "Vocabulario, audio real y el simulacro completo del TEA."
                : "Mide tu nivel con el simulacro TEA y sabrás qué te falta."
            }
            meta="Nivel mínimo para aerolínea: 4"
            icon={Radio}
            foto={icaoFoto}
            estado={
              icaoMeasured
                ? (icaoLevel ?? 0) >= 4
                  ? `Nivel ${icaoLevel} · cumples el mínimo`
                  : `Nivel ${icaoLevel} de 4 requerido`
                : "Sin nivel medido"
            }
            avance={icaoMeasured ? Math.min(100, Math.round(((icaoLevel ?? 0) / 4) * 100)) : 0}
            completo={icaoMeasured && (icaoLevel ?? 0) >= 4}
            cta={icaoMeasured ? "Continuar" : "Medir mi nivel"}
            orientacion="horizontal"
          />
        </div>
      </section>

      <section className="mt-8" aria-labelledby="panel-preparacion">
        <h2 id="panel-preparacion" className={ROTULO}>
          Tu preparación
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-4 @3xl:grid-cols-2 @5xl:grid-cols-3">
          <DominioPca dominio={mastery} cargando={deferredLoading} />
          <ActivityHeatmap
            data={heatmap}
            loading={deferredLoading}
            streakAtRisk={streakAtRisk}
            longestStreak={longestStreak}
            streakDays={streakDays}
            username={profile?.username ?? null}
          />
          <CohortCard peers={peers} stageLabel={stageLabel} loading={deferredLoading} />
          <div className="@5xl:col-span-3">
            <AchievementsCard unlocked={achievements} all={allAchievements} loading={deferredLoading} />
          </div>
        </div>
      </section>
    </div>
  )
}
