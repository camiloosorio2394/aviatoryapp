import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, BookOpen, GraduationCap, Target } from "lucide-react"
import { CourseCard } from "@/components/ui/course-card"
import type { CourseCardProps } from "@/components/ui/course-card"
import { FilaAvance } from "@/components/modulo/FilaAvance"
import { EspacioVideo } from "@/components/modulo/EspacioVideo"
import { useSession } from "@/hooks/useSession"
import {
  RVSM_APRENDE,
  RVSM_EVALUACION,
  RVSM_EXAM_PER_ATTEMPT,
  RVSM_LECTURA_MINUTOS,
  RVSM_LECTURA_TOTAL,
  RVSM_PASS_SCORE,
  RVSM_PRACTICA_RUTA,
  RVSM_PRACTICA_TOTAL,
  RVSM_TITULO,
  RVSM_TITULO_LARGO,
  RVSM_VIGENCIA,
  resumirRvsm,
} from "@/lib/rvsm"
import { fetchRvsmProgress, pushPendingRvsm, readRvsmLocal } from "@/lib/rvsmProgress"

/**
 * Hub del tema RVSM (módulo Ingreso a aerolínea).
 * Ruta: /app/aerolinea/rvsm
 *
 * La misma casa que los demás hubs: hero con velo navy, el sitio del video de
 * apertura, el panel de avance con sus tres filas y las tres puertas
 * numeradas. Lo propio es el acento verde azulado y que todavía no hay fotos:
 * las tarjetas muestran su hueco rotulado, que es lo que pinta `CourseCard`
 * cuando no le pasan portada. Cuando existan las imágenes se les pasa `photo`
 * y el hueco desaparece solo.
 */

const ACENTO = "var(--av-rv-700)"
const ACENTO_CLARO = "var(--av-rv-500)"

export function Rvsm() {
  const { user, isLoading: sessionLoading } = useSession()
  // Arranca con el respaldo local para no mostrar cero mientras carga, y se
  // completa con la base, que es la verdad entre dispositivos.
  const [progreso, setProgreso] = useState(() => readRvsmLocal())
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
        const traido = await fetchRvsmProgress(user.id)
        if (!traido || cancelado) return
        const remoto = await pushPendingRvsm(traido)
        if (!cancelado) setProgreso({ ...remoto, bestScore: traido.bestScore })
      } finally {
        if (!cancelado) setLoading(false)
      }
    })()

    return () => {
      cancelado = true
    }
  }, [user, sessionLoading])

  const resumen = useMemo(() => resumirRvsm(progreso), [progreso])

  const partes: CourseCardProps[] = [
    {
      to: RVSM_APRENDE,
      densidad: "compacta" as const,
      photoAspect: "5/2" as const,
      icon: BookOpen,
      color: ACENTO,
      meta: `${RVSM_LECTURA_TOTAL} capítulos · ${RVSM_LECTURA_MINUTOS} min`,
      title: "1. Aprende",
      blurb:
        "Qué exige RVSM, qué verifica la tripulación, qué se monitoriza y qué se hace cuando algo falla. Con veinte diagramas y la fraseología literal.",
      cta: "Iniciar formación",
      photoHueco:
        "RVSM-HUB-01 · Portada · 5:2 · 1200×480 · Cabina en crucero sobre capa, con los dos PFD mostrando el nivel de vuelo",
      status:
        resumen.lessonRead === 0
          ? "Sin empezar"
          : resumen.lessonRead >= RVSM_LECTURA_TOTAL
            ? "Lección completa"
            : `${resumen.lessonRead} de ${RVSM_LECTURA_TOTAL} capítulos leídos`,
      progress: resumen.lessonPct,
      done: resumen.lessonRead >= RVSM_LECTURA_TOTAL,
    },
    {
      to: RVSM_PRACTICA_RUTA,
      densidad: "compacta" as const,
      photoAspect: "5/2" as const,
      icon: Target,
      color: ACENTO,
      meta: `${RVSM_PRACTICA_TOTAL} preguntas · corrección inmediata`,
      title: "2. Practica",
      blurb:
        "Preguntas de situación sobre cada capítulo, con la explicación y la fuente de la respuesta al instante. Y diez escenarios de decisión en el capítulo 32.",
      cta: "Practicar",
      photoHueco:
        "RVSM-HUB-02 · Portada · 5:2 · 1200×480 · Tripulación comparando altímetros en crucero, con el altímetro de reserva a la vista",
      status:
        resumen.practiceDone === 0
          ? "Sin empezar"
          : `${resumen.practiceDone} de ${RVSM_PRACTICA_TOTAL} respondidas`,
      progress: resumen.practicePct,
      done: resumen.practiceDone >= RVSM_PRACTICA_TOTAL,
    },
    {
      to: RVSM_EVALUACION,
      densidad: "compacta" as const,
      photoAspect: "5/2" as const,
      icon: GraduationCap,
      color: ACENTO,
      meta: `${RVSM_EXAM_PER_ATTEMPT} preguntas · ${RVSM_PASS_SCORE}% para aprobar`,
      title: "3. Evalúate",
      blurb:
        "Cuarenta preguntas sobre los treinta y dos capítulos; cada intento toma veinte al azar. El resultado dice qué capítulos repasar.",
      cta: "Presentar la evaluación",
      photoHueco:
        "RVSM-HUB-03 · Portada · 5:2 · 1200×480 · Piloto repasando notas antes de una entrevista técnica, con el perfil de un vuelo en la tableta",
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
                Módulo 10
              </span>
              <span className="h-3 w-px bg-white/20" aria-hidden />
              <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                Ingreso a aerolínea
              </span>
            </div>

            <h1 className="nh-display mt-4 text-[38px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[46px] lg:text-[54px]">
              {RVSM_TITULO}
            </h1>
            <div className="mt-2 text-[15px] font-medium text-white/70">{RVSM_TITULO_LARGO}</div>

            <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.55] text-white/80">
              Mil pies de separación entre FL 290 y FL 410, y todo lo que hace falta para que sean
              seguros: qué equipo debe estar operativo, qué compara la tripulación y con qué cifra,
              qué se le dice al ATC cuando algo falla y qué cuesta perder la capacidad en crucero.
            </p>
            <p className="mt-3 text-[12px] text-white/55">{RVSM_VIGENCIA}</p>

            <div className="mt-5 flex w-fit max-w-full flex-col gap-3">
              {/* Encima de los botones, como en NOTAM: el video es el primer
                  paso del módulo, no un extra al final del hero. El día que
                  existan el mp4 y su cartel, el reproductor sale solo. */}
              <EspacioVideo
                src="/modulos/rvsm/intro.mp4"
                portada="/modulos/rvsm/intro-poster.webp"
                duracion="1 min"
                titulo="Mil pies, y lo que hace falta para que sean seguros"
                continuarA={RVSM_APRENDE}
                continuarTexto="Empezar la lección"
                claveVisto="aviatory.rvsm.video"
                acento="#8FB6E0"
                rotulo="RVSM-VID-01 · Video de apertura · 16:9 · 60 s"
                descripcion="El video del módulo, con la misma serie que NOTAM y Mercancías: ocho escenas, un minuto, con el avatar y la voz propios del curso. Abre con el perfil vertical de 2.000 ft frente a 1.000 ft y termina en lo que se le dice al ATC cuando algo falla. Se guarda como intro.mp4 y su primer cuadro como intro-poster.webp; en cuanto estén, el reproductor aparece aquí solo."
              />

              <div className="flex flex-wrap gap-3">
                <Link
                  to={RVSM_APRENDE}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-[10px] px-6 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(10,26,47,0.35)] transition-[filter] hover:brightness-110"
                  style={{ background: ACENTO }}
                >
                  <BookOpen className="h-4 w-4" /> Empezar la lección
                </Link>
                <Link
                  to={RVSM_PRACTICA_RUTA}
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
                    aria-label="Avance del módulo RVSM"
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
                to={RVSM_APRENDE}
                valor={`${resumen.lessonRead} / ${RVSM_LECTURA_TOTAL}`}
                pct={resumen.lessonPct}
                color={ACENTO_CLARO}
                cargando={loading}
              />
              <FilaAvance
                titulo="Práctica"
                to={RVSM_PRACTICA_RUTA}
                valor={`${resumen.practiceDone} / ${RVSM_PRACTICA_TOTAL}`}
                pct={resumen.practicePct}
                color="var(--av-cyan-400)"
                cargando={loading}
              />
              <FilaAvance
                titulo="Evaluación"
                to={RVSM_EVALUACION}
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
