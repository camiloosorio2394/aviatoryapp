import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, BookOpen, GraduationCap, Target } from "lucide-react"
import { CourseCard } from "@/components/ui/course-card"
import type { CourseCardProps } from "@/components/ui/course-card"
import { FilaAvance } from "@/components/modulo/FilaAvance"
import { EspacioVideo } from "@/components/modulo/EspacioVideo"
import { useSession } from "@/hooks/useSession"
import {
  CB_APRENDE,
  CB_EVALUACION,
  CB_EXAM_PER_ATTEMPT,
  CB_FUENTES,
  CB_LECTURA_MINUTOS,
  CB_LECTURA_TOTAL,
  CB_PASS_SCORE,
  CB_PRACTICA_RUTA,
  CB_PRACTICA_TOTAL,
  CB_TITULO,
  resumirCombustible,
} from "@/lib/combustible"
import { fetchCombustibleProgress, pushPendingCombustible, readCombustibleLocal } from "@/lib/combustibleProgress"

/**
 * Hub del tema Gestión del combustible (módulo Ingreso a aerolínea).
 * Ruta: /app/aerolinea/combustible
 *
 * La misma casa que los demás hubs: hero con velo navy, el panel de avance con
 * sus tres filas y las puertas numeradas. Lo propio es el azul queroseno y que
 * todavía no hay fotos: el hero va sobre el navy liso y las tarjetas muestran
 * su hueco rotulado, que es lo que pinta `CourseCard` sin portada.
 */

const ACENTO = "var(--av-cb-700)"
const ACENTO_CLARO = "var(--av-cb-500)"

export function Combustible() {
  const { user, isLoading: sessionLoading } = useSession()
  // Arranca con el respaldo local para no mostrar cero mientras carga, y se
  // completa con la base, que es la verdad entre dispositivos.
  const [progreso, setProgreso] = useState(() => readCombustibleLocal())
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
        const traido = await fetchCombustibleProgress(user.id)
        if (!traido || cancelado) return
        const remoto = await pushPendingCombustible(traido)
        if (!cancelado) setProgreso({ ...remoto, bestScore: traido.bestScore })
      } finally {
        if (!cancelado) setLoading(false)
      }
    })()

    return () => {
      cancelado = true
    }
  }, [user, sessionLoading])

  const resumen = useMemo(() => resumirCombustible(progreso), [progreso])

  const partes: CourseCardProps[] = [
    {
      to: CB_APRENDE,
      densidad: "compacta" as const,
      photoAspect: "5/2" as const,
      icon: BookOpen,
      color: ACENTO,
      meta: `${CB_LECTURA_TOTAL} capítulos · ${CB_LECTURA_MINUTOS} min`,
      title: "1. Aprende",
      blurb:
        "De los componentes del block fuel a la reserva final, el fuel check, el combustible mínimo, el MAYDAY y diez escenarios para decidir.",
      cta: "Iniciar formación",
      photoHueco: "CB-HUB-01 · Portada · 5:2 · 1200×480 · Plan operacional de vuelo (OFP) con la tabla de combustible, sobre el pedestal",
      status:
        resumen.lessonRead === 0
          ? "Sin empezar"
          : resumen.lessonRead >= CB_LECTURA_TOTAL
            ? "Lección completa"
            : `${resumen.lessonRead} de ${CB_LECTURA_TOTAL} capítulos leídos`,
      progress: resumen.lessonPct,
      done: resumen.lessonRead >= CB_LECTURA_TOTAL,
    },
    {
      to: CB_PRACTICA_RUTA,
      densidad: "compacta" as const,
      photoAspect: "5/2" as const,
      icon: Target,
      color: ACENTO,
      meta: `66 preguntas y 10 escenarios`,
      title: "2. Practica",
      blurb:
        "Tres preguntas por capítulo con corrección inmediata, y los diez escenarios del capítulo 23 para pensar sin opciones.",
      cta: "Practicar",
      photoHueco: "CB-HUB-02 · Portada · 5:2 · 1200×480 · Página de combustible del FMS durante un fuel check en crucero",
      status:
        resumen.practiceDone === 0
          ? "Sin empezar"
          : `${resumen.practiceDone} de ${CB_PRACTICA_TOTAL} hechos`,
      progress: resumen.practicePct,
      done: resumen.practiceDone >= CB_PRACTICA_TOTAL,
    },
    {
      to: CB_EVALUACION,
      densidad: "compacta" as const,
      photoAspect: "5/2" as const,
      icon: GraduationCap,
      color: ACENTO,
      meta: `${CB_EXAM_PER_ATTEMPT} preguntas · ${CB_PASS_SCORE}% para aprobar`,
      title: "3. Evalúate",
      blurb:
        "Cuarenta preguntas de situación sobre los veintidós capítulos; cada intento toma veinte al azar. El resultado dice qué capítulos repasar.",
      cta: "Presentar la evaluación",
      photoHueco: "CB-HUB-03 · Portada · 5:2 · 1200×480 · Indicador de combustible de cabina con la reserva final marcada",
      status: resumen.best === null ? "Sin intentos" : `Mejor: ${resumen.best} / 100`,
      progress: resumen.examPct,
      done: resumen.passed,
    },
  ]

  return (
    <div className="@container notam-hub px-5 sm:px-8 py-9 sm:py-11 pb-24 max-w-[1600px] mx-auto">
      <Link
        to="/app/aerolinea"
        className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Volver a Ingreso a aerolínea
      </Link>

      {/* Sin foto todavía: el navy liso es la base del hero de todos los módulos. */}
      <section className="relative overflow-hidden rounded-[18px] bg-[#0A1524] shadow-[0_1px_2px_rgba(11,27,48,0.08)]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(8,20,36,.93) 0%, rgba(8,20,36,.79) 42%, rgba(8,20,36,.53) 72%, rgba(8,20,36,.38) 100%)",
          }}
          aria-hidden
        />

        <div className="relative grid gap-7 px-7 pb-7 pt-7 sm:px-12 sm:pb-8 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,248px)] lg:gap-10">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: ACENTO_CLARO }}
              >
                Módulo 9
              </span>
              <span className="h-3 w-px bg-white/20" aria-hidden />
              <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                Ingreso a aerolínea
              </span>
            </div>

            <h1 className="nh-display mt-4 text-[38px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[46px] lg:text-[54px]">
              {CB_TITULO}
            </h1>

            <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.55] text-white/80">
              Planificar cuánto cargar, vigilar cómo se consume y predecir con cuánto vas a aterrizar,
              para decidir mientras todavía hay opciones. Anclado en el RAC 121 y la OACI, con EASA y la
              FAA para comparar y los casos que se estudian en formación de pilotos.
            </p>
            <p className="mt-3 text-[12px] text-white/55">{CB_FUENTES}</p>

            <div className="mt-5 flex w-fit max-w-full flex-col gap-3">
              {/* Encima de los botones, como en NOTAM: el video es el primer
                  paso del módulo, no un extra al final del hero. El día que
                  existan el mp4 y su cartel, el reproductor sale solo. */}
              <EspacioVideo
                src="/modulos/combustible/intro.mp4"
                portada="/modulos/combustible/intro-poster.webp"
                duracion="1 min"
                titulo="Con cuánto aterrizo, y dónde"
                continuarA={CB_APRENDE}
                continuarTexto="Empezar la lección"
                claveVisto="aviatory.combustible.video"
                acento="#8FD4CE"
                rotulo="CB-VID-01 · Video de apertura · 16:9 · 60 s"
                descripcion="El video del módulo, con la misma serie que NOTAM y Mercancías: ocho escenas, un minuto, con el avatar y la voz propios del curso. Cuenta por qué la pregunta no es cuánto llevas sino con cuánto aterrizas. Se guarda como intro.mp4 y su primer cuadro como intro-poster.webp; en cuanto estén, el reproductor aparece aquí solo."
              />

              <div className="flex flex-wrap gap-3">
                <Link
                  to={CB_APRENDE}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-[10px] px-6 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(10,26,47,0.35)] transition-[filter] hover:brightness-110"
                  style={{ background: ACENTO }}
                >
                  <BookOpen className="h-4 w-4" /> Empezar la lección
                </Link>
                <Link
                  to={CB_PRACTICA_RUTA}
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
                    aria-label="Avance del módulo Gestión del combustible"
                  >
                    <div
                      className="h-full rounded-sm transition-[width]"
                      style={{ width: `${resumen.overall}%`, background: ACENTO_CLARO }}
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
                to={CB_APRENDE}
                valor={`${resumen.lessonRead} / ${CB_LECTURA_TOTAL}`}
                pct={resumen.lessonPct}
                color={ACENTO_CLARO}
                cargando={loading}
              />
              <FilaAvance
                titulo="Práctica"
                to={CB_PRACTICA_RUTA}
                valor={`${resumen.practiceDone} / ${CB_PRACTICA_TOTAL}`}
                pct={resumen.practicePct}
                color="var(--av-cyan-400)"
                cargando={loading}
              />
              <FilaAvance
                titulo="Evaluación"
                to={CB_EVALUACION}
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

      {/* Las tres puertas */}
      <section className="pt-10">
        <div className="grid gap-4 @xl:grid-cols-3">
          {partes.map((p) => (
            <CourseCard key={p.title} {...p} statusLoading={loading} />
          ))}
        </div>
      </section>
    </div>
  )
}
