import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { RotateCcw } from "lucide-react"
import {
  avanceDeModulo,
  MODULOS_AEROLINEA,
} from "@/lib/modulosAerolinea"
import { reportarError } from "@/lib/errores"
import { useSession } from "@/hooks/useSession"
import { useRachaEnBarra } from "@/components/layout/rachaEnBarra"
import { EstadoError } from "@/components/EstadoError"
import { revisarVencimientos, traerInicioPanel, traerTarjetasPanel } from "@/services/panel"
import { traerAerolineasYPiloto, type Airline } from "@/services/aerolineas"
import type { PostulacionAbierta } from "@/services/panel"
import type { PlanDeEstudio } from "@/services/planDeEstudio"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import type {
  PilotState,
  Profile,
  Streak,
  Subscription,
  ActivityDay,
  NotamResumen,
  LicenseRow,
} from "@/components/dashboard/tipos"
import { daysUntil, FIRST_ACTION, trialDaysLeft } from "@/components/dashboard/plan"
import { CARA_DE_MODULO } from "@/components/aerolinea/carasDeModulo"
import { CompromisosDeHoy } from "@/components/dashboard/CompromisosDeHoy"
import { PortadaHero, type ProximoObjetivo } from "@/components/dashboard/PortadaHero"
import { TarjetaDocumentos, TarjetaHoras, TarjetaIcao, TarjetaProgreso } from "@/components/dashboard/ResumenPiloto"
import { horas } from "@/components/dashboard/portada"
import { ContinuaPreparacion, PerfilFrenteAerolineas, type ModuloParaSeguir } from "@/components/dashboard/PreparacionYAerolineas"
import { CifrasDeEstudio, ProximosVencimientos, RachaDeEstudio, TarjetaDestinos } from "@/components/dashboard/FilaInferior"
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton"

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
 * hago hoy (el hero), mis números, por dónde sigo y frente a qué aerolíneas,
 * qué se me vence y cómo va mi constancia.
 *
 * Los accesos rápidos, «Tu preparación» y la cohorte salieron (pedido de
 * Camilo, 25-sep-2026): los accesos repetían la barra lateral, y los logros con
 * la actividad pasaron a su propia página, /app/logros.
 */

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
  const [heatmap, setHeatmap] = useState<ActivityDay[]>([])
  const [modulos, setModulos] = useState<Record<string, NotamResumen | null>>({})
  const [plan, setPlan] = useState<PlanDeEstudio | null>(null)
  const [postulaciones, setPostulaciones] = useState<PostulacionAbierta[]>([])
  const [licenses, setLicenses] = useState<LicenseRow[]>([])
  const [aerolineas, setAerolineas] = useState<Airline[]>([])

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
      // Las aerolíneas van aparte: si fallan, su tarjeta queda vacía y el resto
      // del panel sigue.
      traerAerolineasYPiloto(user?.id)
        .then(({ aerolineas: lista }) => {
          if (!cancelled) setAerolineas(lista)
        })
        .catch((err) => reportarError("dashboard: aerolíneas", err))
      try {
        const tarjetas = await traerTarjetasPanel()
        revisarVencimientos()
        if (cancelled) return

        setHeatmap(tarjetas.actividad)
        // NOTAM contado en la base contra el catálogo; null si no ha empezado,
        // y la card lo dice con un guion en vez de un 0%.
        setModulos(tarjetas.modulos)
        setPlan(tarjetas.plan)
        setPostulaciones(tarjetas.postulaciones)
        setLicenses(tarjetas.licencias)
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

  const icaoLevel = pilot?.icao_english_level ?? null
  /** Sin nivel medido no inventamos un 0: el indicador muestra un guion. */
  const icaoMeasured = icaoLevel !== null && icaoLevel > 0
  const firstName =
    profile?.full_name?.split(" ")[0] ?? profile?.username ?? user?.email?.split("@")[0] ?? "piloto"
  const diasDePrueba = subscription?.status === "trialing" ? trialDaysLeft(subscription.current_period_end) : null
  const diasAlExamen = pilot?.target_date ? daysUntil(pilot.target_date) : null
  /** Lo que tiene fecha, en pequeño junto a la fecha de hoy. */
  const avisosHero = [
    diasAlExamen !== null && diasAlExamen >= 0
      ? { texto: diasAlExamen === 0 ? "Examen PCA hoy" : `Examen PCA en ${diasAlExamen} ${diasAlExamen === 1 ? "día" : "días"}`, aviso: diasAlExamen <= 14 }
      : null,
    diasDePrueba !== null && diasDePrueba > 0
      ? { texto: `Prueba gratuita: ${diasDePrueba} ${diasDePrueba === 1 ? "día" : "días"}`, aviso: diasDePrueba <= 3 }
      : null,
  ].filter((a): a is { texto: string; aviso: boolean } => a !== null)

  const streakDays = streak?.current_streak ?? 0
  // La fecha llega como "AAAA-MM-DD": sin hora, new Date() la parsea como
  // medianoche UTC, que en Colombia es el día ANTERIOR a las 7 de la noche.
  // Con eso, una racha hecha hoy salía "en riesgo" toda la tarde.
  const streakAtRisk =
    streakDays > 0 && streak?.last_activity_date
      ? new Date(streak.last_activity_date + "T00:00:00").toDateString() !== new Date().toDateString()
      : false

  /** El siguiente mínimo de horas entre las aerolíneas de la lista, por encima de lo que lleva. */
  const totalHoras = pilot?.total_hours ?? null
  const metaHoras =
    [...new Set(aerolineas.map((a) => a.requirements.min_hours_total).filter((h): h is number => typeof h === "number"))]
      .sort((a, b) => a - b)
      .find((h) => h > (totalHoras ?? 0)) ?? null

  /** Las aerolíneas en su orden, con la que el piloto eligió como objetivo primero. */
  const objetivoAerolinea = pilot?.target_airline?.toLowerCase() ?? null
  const aerolineasEnOrden = objetivoAerolinea
    ? [...aerolineas].sort(
        (a, b) =>
          Number(b.name.toLowerCase().startsWith(objetivoAerolinea)) - Number(a.name.toLowerCase().startsWith(objetivoAerolinea)),
      )
    : aerolineas

  /** El avance de cada módulo de Ingreso a aerolínea, en el orden de la lista. */
  const avances = MODULOS_AEROLINEA.map((m, i) => {
    const resumen = modulos[m.clave] ?? null
    return { m, numero: i + 1, pct: resumen ? avanceDeModulo(resumen, m) : 0 }
  })
  const completos = avances.filter((x) => x.pct >= 100).length
  const pctGeneral = avances.length ? avances.reduce((t, x) => t + x.pct, 0) / avances.length : 0
  /** El que va a medias y más avanzó; si no hay, el primero sin terminar. */
  const aMedias = avances.filter((x) => x.pct > 0 && x.pct < 100).sort((a, b) => b.pct - a.pct)[0]
  const seguir = aMedias ?? avances.find((x) => x.pct < 100) ?? avances[0]
  const cara = CARA_DE_MODULO[seguir.m.clave]
  const moduloParaSeguir: ModuloParaSeguir = {
    titulo: seguir.m.titulo,
    hub: seguir.m.hub,
    foto: cara.foto,
    color: cara.color,
    pct: seguir.pct,
    numero: seguir.numero,
    total: avances.length,
  }

  /**
   * El próximo objetivo del hero, en este orden: sin inglés medido no se puede
   * calibrar nada; con nivel por debajo de 4 ninguna aerolínea lo recibe; luego
   * el módulo que va a medias, y al final las horas que faltan.
   */
  const objetivo: ProximoObjetivo = !icaoMeasured
    ? { titulo: "Medir mi nivel de inglés ICAO", detalle: "Unos 15 minutos con el test inicial", to: FIRST_ACTION.href }
    : (icaoLevel ?? 0) < 4
      ? {
          titulo: "Mejorar mi nivel de Inglés ICAO",
          detalle: `Estás a ${4 - (icaoLevel ?? 0)} ${4 - (icaoLevel ?? 0) === 1 ? "nivel" : "niveles"} de tu objetivo.`,
          to: "/app/icao",
        }
      : seguir.pct < 100
        ? {
            titulo: `${seguir.pct > 0 ? "Terminar" : "Empezar"} ${seguir.m.titulo}`,
            detalle: seguir.pct > 0 ? `Vas en el ${Math.round(seguir.pct)} % del módulo.` : "El siguiente módulo de Ingreso a aerolínea.",
            to: seguir.m.hub,
          }
        : metaHoras && totalHoras
          ? {
              titulo: `Llegar a ${horas.format(metaHoras)} horas`,
              detalle: `Te faltan ${horas.format(Math.ceil(metaHoras - totalHoras))} h para el siguiente requisito.`,
              to: "/app/logbook",
            }
          : { titulo: "Mantener el banco PCA al día", detalle: "Un quiz corto cada día sostiene lo aprendido.", to: "/app/pca" }

  const esqueleto = (alto: string) => <div className={`animate-pulse rounded-2xl bg-muted ${alto}`} aria-hidden />

  return (
    <div className="notam-hub @container px-5 sm:px-8 py-6 sm:py-8 pb-16 max-w-[1600px] mx-auto">
      <PortadaHero nombre={firstName} objetivo={objetivo} avisos={avisosHero} />

      {/* Lo que él mismo se puso: si hoy le toca estudiar y qué postulaciones
          esperan. Si no se ha puesto nada, no aparece y no deja hueco. */}
      <div className="mt-4 empty:hidden">
        <CompromisosDeHoy
          plan={plan}
          estudioHoy={heatmap.some((d) => d.date === hoyEnBogota() && d.activities_count > 0)}
          postulaciones={postulaciones}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 @xl:grid-cols-2 @6xl:grid-cols-4">
        <TarjetaHoras total={totalHoras} pic={pilot?.hours_pic ?? null} meta={metaHoras} />
        <TarjetaIcao nivel={icaoMeasured ? icaoLevel : null} medirHref={FIRST_ACTION.href} />
        {deferredLoading ? esqueleto("min-h-[172px]") : <TarjetaDocumentos documentos={licenses} />}
        {deferredLoading ? esqueleto("min-h-[132px]") : <TarjetaProgreso pct={pctGeneral} completos={completos} total={avances.length} />}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 @6xl:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]">
        {deferredLoading ? esqueleto("min-h-[240px]") : <ContinuaPreparacion modulo={moduloParaSeguir} />}
        <PerfilFrenteAerolineas aerolineas={aerolineasEnOrden} horasPiloto={totalHoras} cargando={deferredLoading} />
      </div>


      <div className="mt-4 grid grid-cols-1 gap-4 @3xl:grid-cols-2 @6xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.15fr)]">
        {deferredLoading ? esqueleto("min-h-[190px]") : <ProximosVencimientos documentos={licenses} />}
        {deferredLoading ? esqueleto("min-h-[190px]") : <RachaDeEstudio dias={streakDays} enRiesgo={streakAtRisk} actividad={heatmap} />}
        {deferredLoading ? esqueleto("min-h-[190px]") : <CifrasDeEstudio quizzes={recentAttempts} actividad={heatmap} />}
        <TarjetaDestinos />
      </div>
    </div>
  )
}
