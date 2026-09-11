import { Link } from "react-router-dom"
import {
  Timer,
  ArrowRight,
  CalendarDays,
  Sun,
} from "lucide-react"
import heroCockpit from "@/assets/photos/cta-cockpit-dawn.jpg"
import { CountUp } from "@/components/ui/count-up"
import type { DailyQuizQuestion } from "@/components/dashboard/tipos"
import { daysUntil, DAILY_ACTION, greetingTime } from "@/components/dashboard/plan"

export function CockpitHero({
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
