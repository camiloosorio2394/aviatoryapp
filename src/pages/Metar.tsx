import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, BookOpen, ClipboardCheck, ScanSearch, Target } from "lucide-react"
import { FilaAvance } from "@/components/modulo/FilaAvance"
import { VideoIntro } from "@/components/modulo/VideoIntro"
import { CourseCard } from "@/components/ui/course-card"
import type { CourseCardProps } from "@/components/ui/course-card"
import { useSession } from "@/hooks/useSession"
import { supabase } from "@/integrations/supabase/client"
import {
  METAR_EXAM_PASS_SCORE,
  METAR_EXAM_PER_ATTEMPT,
  METAR_LEGEND_TOTAL,
  METAR_PRACTICE_TOTAL,
  readMetarProgress,
  resumirMetar,
} from "@/lib/metar"
import { fetchMetarProgress, pushPendingMetarProgress } from "@/lib/metarProgress"
import { METAR_EXAMPLES, METAR_LECCION } from "@/lib/metar"
import aprendePhoto from "@/assets/photos/metar-leccion-nubes.jpg"
import decodificadorPhoto from "@/assets/photos/metar-decodificador-manga.jpg"
import practicaPhoto from "@/assets/photos/metar-practica-cabina-nubes.jpg"
import evaluacionPhoto from "@/assets/photos/metar-evaluacion-escritorio.jpg"

/**
 * Hub del módulo Meteorología (dentro de Ingreso a aerolínea).
 * Ruta: /app/aerolinea/meteorologia
 *
 * Portada con el mismo sistema que NOTAM y Mercancías: la foto a sangre bajo
 * un velo navy, el panel de avance dentro del hero (porque «qué es esto» y
 * «cómo voy» son la misma pregunta al llegar) y las partes en tarjetas
 * compactas. Lo que cambia entre módulos es el acento, y aquí es el petróleo
 * de los tokens --av-mt-*.
 *
 * Las tres partes con progreso viven en la base con respaldo local: lección y
 * práctica en user_metar_progress, la evaluación en user_metar_exam_attempts.
 * El decodificador no mide nada: es consulta libre.
 */

export function Metar() {
  const { user, isLoading: sessionLoading } = useSession()
  // Arranca con el respaldo local para no mostrar cero mientras carga, y se
  // completa con lo que haya en la base (que es la verdad entre dispositivos).
  // Las tres partes se hidratan juntas. Antes solo la lección venía de la base
  // y la práctica y la evaluación se leían del respaldo local, así que en otro
  // dispositivo el tema decía "0 de 10 informes" sobre trabajo ya hecho.
  const [progreso, setProgreso] = useState(() => {
    const local = readMetarProgress()
    return {
      lessonScreens: local.lessonScreens,
      practiceDone: local.practiceDone,
      bestExamScore: local.bestExamScore,
    }
  })

  // El panel de avance necesita saber cuándo el dato es el bueno: sin esto
  // enseñaría el respaldo local como si fuera definitivo. Se deriva en vez de
  // guardarse, que llamar setState en el cuerpo del efecto encadena renders.
  const [hidratado, setHidratado] = useState(false)
  const cargando = sessionLoading || (!!user?.id && !hidratado)

  useEffect(() => {
    if (sessionLoading) return
    // Sin sesión no hay nada que esperar: el respaldo local ya es todo lo
    // que va a haber, y `cargando` se apaga solo.
    const uid = user?.id
    if (!uid) return
    let cancelled = false

    void (async () => {
      const [fetched, examRes] = await Promise.all([
        fetchMetarProgress(uid),
        supabase
          .from("user_metar_exam_attempts")
          .select("score")
          .eq("user_id", uid)
          .order("score", { ascending: false })
          .limit(1),
      ])
      if (cancelled || !fetched) return
      const remote = await pushPendingMetarProgress(fetched)
      if (cancelled) return
      const local = readMetarProgress()
      const best = (examRes.data ?? [])[0]?.score
      const scores = [typeof best === "number" ? best : null, local.bestExamScore].filter(
        (s): s is number => typeof s === "number"
      )
      setProgreso({
        lessonScreens: Array.from(new Set([...local.lessonScreens, ...remote.lessonScreens])),
        practiceDone: Array.from(new Set([...local.practiceDone, ...remote.practiceDone])),
        bestExamScore: scores.length > 0 ? Math.max(...scores) : null,
      })
      setHidratado(true)
    })()

    return () => {
      cancelled = true
    }
  }, [user?.id, sessionLoading])

  const resumen = resumirMetar(progreso)

  const partes: CourseCardProps[] = [
    {
      to: "/app/aerolinea/meteorologia/aprende",
      icon: BookOpen,
      color: "var(--av-mt-700)",
      meta: `${METAR_LECCION.secciones} secciones de lectura`,
      title: "1. Aprende",
      blurb:
        "De la atmósfera al informe: por qué se mueve el aire, qué nube tienes delante, qué hace un frente cuando lo cruzas, y después el METAR y el TAF grupo por grupo.",
      cta: "Abrir la lección",
      photo: aprendePhoto,
      photoAspect: "5/2" as const,
      densidad: "compacta" as const,
      status:
        resumen.lessonRead === 0
          ? "Sin empezar"
          : resumen.lessonRead >= METAR_LECCION.secciones
            ? "Lección completa"
            : `${resumen.lessonRead} de ${METAR_LECCION.secciones} secciones leídas`,
      progress: resumen.lessonPct,
      done: resumen.lessonRead >= METAR_LECCION.secciones,
    },
    {
      to: "/app/aerolinea/meteorologia/decodificador",
      icon: ScanSearch,
      color: "var(--av-mt-700)",
      meta: `${METAR_LEGEND_TOTAL} claves y ${METAR_EXAMPLES.length} informes de ejemplo`,
      title: "2. Decodificador",
      blurb:
        "Pega cualquier METAR y te lo desarma grupo por grupo. Trae las tablas de fenómenos, descriptores, nubes y tendencias con buscador.",
      cta: "Abrir el decodificador",
      photo: decodificadorPhoto,
      photoAspect: "5/2" as const,
      densidad: "compacta" as const,
      status: "Consulta libre, sin límite",
    },
    {
      to: "/app/aerolinea/meteorologia/practica",
      icon: Target,
      color: "var(--av-mt-700)",
      meta: `${METAR_PRACTICE_TOTAL} informes con respuesta modelo`,
      title: "3. Práctica",
      blurb:
        "Lees el informe, lo interpretas con tus palabras y solo después comparas con la respuesta modelo. Con los errores típicos de cada caso.",
      cta: "Iniciar práctica",
      photo: practicaPhoto,
      photoAspect: "5/2" as const,
      densidad: "compacta" as const,
      status:
        resumen.practiceDone === 0
          ? "Sin empezar"
          : `${resumen.practiceDone} de ${METAR_PRACTICE_TOTAL} resueltos`,
      progress: resumen.practicePct,
      done: resumen.practiceDone >= METAR_PRACTICE_TOTAL,
    },
    {
      to: "/app/aerolinea/meteorologia/evaluacion",
      icon: ClipboardCheck,
      color: "var(--av-mt-700)",
      meta: `${METAR_EXAM_PER_ATTEMPT} preguntas, apruebas con ${METAR_EXAM_PASS_SCORE}`,
      title: "4. Evaluación",
      blurb:
        "Opción múltiple con preguntas y opciones barajadas. Al final ves la explicación y la referencia de cada una.",
      cta: "Iniciar evaluación",
      photo: evaluacionPhoto,
      photoAspect: "5/2" as const,
      densidad: "compacta" as const,
      status:
        resumen.best === null
          ? "Sin intentos"
          : resumen.passed
            ? `Aprobada con ${resumen.best} de 100`
            : `Mejor puntaje: ${resumen.best} de 100`,
      progress: resumen.examPct,
      done: resumen.passed,
    },
  ]

  return (
    <>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        {/* Mismo control de volver que el hub de NOTAM: un enlace de texto sobre
            el título, no un botón compitiendo con la acción de la página. */}
        <Link
          to="/app/aerolinea"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a Ingreso a aerolínea
        </Link>

        {/* Hero de sección. Sin foto todavía: el hueco conserva la caja, el
            velo y la forma, y el rótulo de la esquina dice la medida que hace
            falta. Cuando llegue la imagen se pone el <img> aquí y no se mueve
            nada alrededor. */}
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
                  style={{ color: "var(--av-mt-500)" }}
                >
                  Módulo 3
                </span>
                <span className="h-3 w-px bg-white/20" aria-hidden />
                <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                  Ingreso a aerolínea
                </span>
              </div>

              <h1 className="nh-display mt-4 text-[38px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[46px] lg:text-[54px]">
                Meteorología
              </h1>

              <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.55] text-white/80">
                Por qué se mueve el aire, qué nube tienes delante y qué te hace un frente cuando lo
                cruzas. Y después el informe: el METAR dice lo que hay, el TAF lo que se espera y
                con qué alterno sales. Es la lectura obligada del briefing y lo que te preguntan en
                la entrevista técnica.
              </p>

              <div className="mt-5 flex w-fit max-w-full flex-col gap-3">
                <VideoIntro
                  src="/modulos/meteorologia/intro.mp4"
                  miniatura="/modulos/meteorologia/intro-poster.webp"
                  portada="/modulos/meteorologia/intro-poster.webp"
                  duracion="58 s"
                  titulo="Introducción al módulo de Meteorología"
                  continuarA="/app/aerolinea/meteorologia/aprende"
                  continuarTexto="Empezar la lección"
                  claveVisto="av:visto:intro:meteorologia"
                  acento="var(--av-mt-700)"
                />

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/app/aerolinea/meteorologia/aprende"
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-[10px] px-6 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(10,26,47,0.35)] transition-[filter] hover:brightness-110"
                    style={{ background: "var(--av-mt-700)" }}
                  >
                    <BookOpen className="h-4 w-4" /> Empezar la lección
                  </Link>
                  <Link
                    to="/app/aerolinea/meteorologia/practica"
                    className="inline-flex min-h-[48px] items-center gap-2 whitespace-nowrap rounded-[10px] border border-white/25 px-5 text-[15px] font-medium text-white/90 transition-colors hover:border-white/60 hover:text-white"
                  >
                    <Target className="h-4 w-4" /> Ir a la práctica
                  </Link>
                </div>
              </div>
            </div>

            {/* Avance del módulo: la cifra global y, bajo una línea fina, de qué
                se compone. Los 33px de margen son el alto del rótulo más el
                margen del título, o sea lo que la columna izquierda tiene por
                encima del h1 y esta no. */}
            <div className="self-start overflow-hidden rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.62)] backdrop-blur-[6px] lg:mt-[33px] lg:min-w-[210px]">
              <div className="px-3.5 pb-3 pt-3.5">
                <div className="nh-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                  Tu avance
                </div>
                {cargando ? (
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
                      aria-label="Avance del módulo Meteorología"
                    >
                      <div
                        className="h-full rounded-sm transition-[width]"
                        style={{ width: `${resumen.overall}%`, background: "var(--av-mt-500)" }}
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

              {/* Tres filas y no cuatro: el Decodificador es consulta libre y
                  `resumirMetar` no lo mide, así que no habría nada que pintar. */}
              <div className="border-t border-white/10 p-1">
                <FilaAvance
                  titulo="Lección"
                  to="/app/aerolinea/meteorologia/aprende"
                  valor={`${resumen.lessonRead} / ${METAR_LECCION.secciones}`}
                  pct={resumen.lessonPct}
                  /* El petróleo del módulo no se ve sobre este cristal: aquí va
                     su claro calibrado, igual que NOTAM usa el suyo. */
                  color="#68AFB7"
                  cargando={cargando}
                />
                <FilaAvance
                  titulo="Práctica"
                  to="/app/aerolinea/meteorologia/practica"
                  valor={`${resumen.practiceDone} / ${METAR_PRACTICE_TOTAL}`}
                  pct={resumen.practicePct}
                  color="var(--av-cyan-400)"
                  cargando={cargando}
                />
                <FilaAvance
                  titulo="Evaluación"
                  to="/app/aerolinea/meteorologia/evaluacion"
                  valor={resumen.best === null ? "Sin intentos" : `${resumen.best} / 100`}
                  aviso={resumen.best === null}
                  pct={resumen.examPct}
                  color={resumen.passed ? "var(--av-green-400)" : "var(--av-amber-400)"}
                  cargando={cargando}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pt-10">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {partes.map((p) => (
              <CourseCard key={p.title} {...p} statusLoading={cargando} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

// ─── Sub componentes ─────────────────────────────────────────────────────────

