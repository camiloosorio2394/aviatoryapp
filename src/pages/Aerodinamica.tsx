import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, BookOpen, GraduationCap, Target } from "lucide-react"
import { CourseCard } from "@/components/ui/course-card"
import type { CourseCardProps } from "@/components/ui/course-card"
import { FilaAvance } from "@/components/modulo/FilaAvance"
import { VideoIntro } from "@/components/modulo/VideoIntro"
import { useSession } from "@/hooks/useSession"
import {
  AERO_APRENDE,
  AERO_EVALUACION,
  AERO_EXAM_PER_ATTEMPT,
  AERO_LECTURA_MINUTOS,
  AERO_LECTURA_TOTAL,
  AERO_PASS_SCORE,
  AERO_PRACTICA,
  AERO_PRACTICA_TOTAL,
  AERO_TITULO,
  resumirAerodinamica,
} from "@/lib/aerodinamica"
import { AERO_ENTREVISTA, AERO_ESCENARIOS } from "@/lib/aerodinamicaPractica"
import {
  fetchAerodinamicaProgress,
  pushPendingAerodinamica,
  readAerodinamicaLocal,
} from "@/lib/aerodinamicaProgress"

/**
 * Hub del tema Aerodinámica (módulo Ingreso a aerolínea).
 * Ruta: /app/aerolinea/aerodinamica
 *
 * La misma casa que los hubs de NOTAM, Meteorología y Mercancías, sin una
 * coma de diferencia: hero con velo navy sobre el hueco de la foto de fondo,
 * el vídeo de introducción, un botón primario y otro secundario, el panel de
 * avance con sus tres filas y las tres puertas numeradas. Lo único propio es
 * el acento, que aquí es el azul acero.
 */

const ACENTO = "var(--av-ae-700)"

export function Aerodinamica() {
  const { user, isLoading: sessionLoading } = useSession()
  // Arranca con el respaldo local para no mostrar cero mientras carga, y se
  // completa con la base, que es la verdad entre dispositivos.
  const [progreso, setProgreso] = useState(() => readAerodinamicaLocal())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionLoading) return
    let cancelado = false

    void (async () => {
      if (!user) {
        if (!cancelado) setLoading(false)
        return
      }
      try {
        const traido = await fetchAerodinamicaProgress(user.id)
        if (cancelado || !traido) return
        await pushPendingAerodinamica(traido)
        if (!cancelado) setProgreso(traido)
      } catch {
        /* sin red: se queda el respaldo local */
      } finally {
        if (!cancelado) setLoading(false)
      }
    })()

    return () => {
      cancelado = true
    }
  }, [user, sessionLoading])

  const resumen = useMemo(() => resumirAerodinamica(progreso), [progreso])

  const partes: CourseCardProps[] = [
    {
      to: AERO_APRENDE,
      densidad: "compacta" as const,
      photoAspect: "5/2" as const,
      icon: BookOpen,
      color: ACENTO,
      meta: `${AERO_LECTURA_TOTAL} secciones · ${AERO_LECTURA_MINUTOS} min`,
      title: "1. Aprende",
      blurb:
        "De las cuatro fuerzas al Coffin Corner: sustentación, pérdida, factor de carga, Mach y altitud de densidad.",
      cta: "Iniciar formación",
      photoHueco: "AE-POR-01 · Portada 5:2 · 1200×480 · Ala en flecha vista desde la cabina de pasajeros",
      status:
        resumen.lessonRead === 0
          ? "Sin empezar"
          : resumen.lessonRead >= AERO_LECTURA_TOTAL
            ? "Lección completa"
            : `${resumen.lessonRead} de ${AERO_LECTURA_TOTAL} secciones leídas`,
      progress: resumen.lessonPct,
      done: resumen.lessonRead >= AERO_LECTURA_TOTAL,
    },
    {
      to: AERO_PRACTICA,
      densidad: "compacta" as const,
      photoAspect: "5/2" as const,
      icon: Target,
      color: ACENTO,
      meta: `${AERO_ESCENARIOS.length} escenarios · ${AERO_ENTREVISTA.length} preguntas de entrevista`,
      title: "2. Práctica",
      blurb:
        "Analizas situaciones reales de vuelo y ensayas las preguntas que hace un entrevistador técnico, por nivel.",
      cta: "Iniciar práctica",
      photoHueco: "AE-POR-02 · Portada 5:2 · 1200×480 · Cabina en crucero, con el Mach a la vista",
      status:
        resumen.practiceDone === 0
          ? "Sin empezar"
          : `${resumen.practiceDone} de ${AERO_PRACTICA_TOTAL} resueltos`,
      progress: resumen.practicePct,
      done: resumen.practiceDone >= AERO_PRACTICA_TOTAL,
    },
    {
      to: AERO_EVALUACION,
      densidad: "compacta" as const,
      photoAspect: "5/2" as const,
      icon: GraduationCap,
      color: ACENTO,
      meta: `${AERO_EXAM_PER_ATTEMPT} preguntas · Puntaje mínimo ${AERO_PASS_SCORE}%`,
      title: "3. Evaluación",
      blurb:
        "Opción múltiple barajada. Al terminar ves la explicación de cada una y qué secciones te toca repasar.",
      cta: "Iniciar evaluación",
      photoHueco: "AE-POR-03 · Portada 5:2 · 1200×480 · Anemómetro con la banda de maniobra",
      status:
        resumen.best === null
          ? "Sin intentos"
          : resumen.passed
            ? `Aprobado con ${resumen.best} de 100`
            : `Mejor puntaje: ${resumen.best} de 100`,
      done: resumen.passed,
    },
  ]

  return (
    <div className="notam-hub px-5 sm:px-8 py-9 sm:py-11 pb-24 max-w-[1280px] mx-auto">
      <Link
        to="/app/aerolinea"
        className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Volver a Ingreso a aerolínea
      </Link>

      {/* Hero de sección. La imagen de fondo todavía no existe: el hueco
          conserva la caja, el velo y la forma, así que cuando llegue la foto se
          pone el <img> aquí y no cambia nada más. */}
      <section className="relative overflow-hidden rounded-[18px] bg-[#0A1524] shadow-[0_1px_2px_rgba(11,27,48,0.08)]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(8,20,36,.97) 0%, rgba(8,20,36,.94) 42%, rgba(8,20,36,.86) 72%, rgba(8,20,36,.78) 100%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-2 rounded-[14px] border border-dashed border-white/[0.10]"
          aria-hidden
        />
        <span className="nh-display pointer-events-none absolute bottom-3 right-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/30">
          [Imagen de fondo · 2432×860 · espacio reservado]
        </span>

        <div className="relative grid gap-7 px-7 pb-7 pt-7 sm:px-12 sm:pb-8 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,248px)] lg:gap-10">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: "var(--av-ae-500)" }}
              >
                Módulo 4
              </span>
              <span className="h-3 w-px bg-white/20" aria-hidden />
              <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                Ingreso a aerolínea
              </span>
            </div>

            <h1 className="nh-display mt-4 text-[38px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[46px] lg:text-[54px]">
              {AERO_TITULO}
            </h1>

            <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.55] text-white/80">
              Por qué vuela un avión y qué cambia cuando cambian la velocidad, la actitud, la
              configuración y la altitud. Doce secciones, de las cuatro fuerzas al Coffin Corner, con
              los escenarios y las preguntas que hace un entrevistador técnico.
            </p>

            <div className="mt-5 flex w-fit max-w-full flex-col gap-3">
              <VideoIntro
                src="/modulos/aerodinamica/intro.mp4"
                miniatura="/modulos/aerodinamica/intro-poster.webp"
                portada="/modulos/aerodinamica/intro-poster.webp"
                duracion="58 s"
                titulo="Introducción al módulo de Aerodinámica"
                continuarA={AERO_APRENDE}
                continuarTexto="Empezar la lección"
                claveVisto="av:visto:intro:aerodinamica"
                acento={ACENTO}
              />

              <div className="flex flex-wrap items-center gap-3">
              <Link
                to={AERO_APRENDE}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-[10px] px-6 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(10,26,47,0.35)] transition-[filter] hover:brightness-110"
                style={{ background: ACENTO }}
              >
                <BookOpen className="h-4 w-4" /> Empezar la lección
              </Link>
              <Link
                to={AERO_PRACTICA}
                className="inline-flex min-h-[48px] items-center gap-2 whitespace-nowrap rounded-[10px] border border-white/25 px-5 text-[15px] font-medium text-white/90 transition-colors hover:border-white/60 hover:text-white"
              >
                  <Target className="h-4 w-4" /> Ir a la práctica
                </Link>
              </div>
            </div>
          </div>

          <div className="self-start overflow-hidden rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.62)] backdrop-blur-[6px] lg:mt-[33px] lg:min-w-[210px]">
            <div className="px-3.5 pb-3 pt-3.5">
              <div className="nh-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                Tu avance
              </div>
              {loading ? (
                <>
                  <div className="mt-2.5 h-6 w-16 animate-pulse rounded bg-white/15" />
                  <div className="mt-3 h-1 animate-pulse rounded-sm bg-white/15" />
                </>
              ) : (
                <>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    <span className="nh-display tabular text-[23px] font-bold leading-none text-white">
                      {resumen.overall}%
                    </span>
                    <span className="text-[11px] text-white/60">del módulo</span>
                  </div>
                  <div
                    className="mt-3 h-1 overflow-hidden rounded-sm bg-white/15"
                    role="progressbar"
                    aria-valuenow={resumen.overall}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Avance del módulo Aerodinámica"
                  >
                    <div
                      className="h-full rounded-sm transition-[width]"
                      style={{ width: `${resumen.overall}%`, background: "var(--av-ae-500)" }}
                    />
                  </div>
                </>
              )}
              {!sessionLoading && !user && (
                <p className="mt-2 text-[10.5px] leading-[1.5] text-white/55">
                  Inicia sesión para guardar tu avance en la cuenta.
                </p>
              )}
            </div>

            <div className="border-t border-white/10 p-1">
              <FilaAvance
                titulo="Lección"
                to={AERO_APRENDE}
                valor={`${resumen.lessonRead} / ${AERO_LECTURA_TOTAL}`}
                pct={resumen.lessonPct}
                color="#4E9BF5"
                cargando={loading}
              />
              <FilaAvance
                titulo="Práctica"
                to={AERO_PRACTICA}
                valor={`${resumen.practiceDone} / ${AERO_PRACTICA_TOTAL}`}
                pct={resumen.practicePct}
                color="var(--av-cyan-400)"
                cargando={loading}
              />
              <FilaAvance
                titulo="Evaluación"
                to={AERO_EVALUACION}
                valor={resumen.best === null ? "Sin intentos" : `${resumen.best} / 100`}
                aviso={resumen.best === null}
                pct={resumen.examPct}
                color={resumen.passed ? "var(--av-green-400)" : "var(--av-amber-400)"}
                cargando={loading}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Las tres partes */}
      <section className="pt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partes.map((p) => (
            <CourseCard key={p.title} {...p} statusLoading={loading} />
          ))}
        </div>
      </section>

    </div>
  )
}
