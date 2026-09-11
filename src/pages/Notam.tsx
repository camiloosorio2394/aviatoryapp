import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, BookOpen, Target, GraduationCap } from "lucide-react"
import { CourseCard } from "@/components/ui/course-card"
import { FilaAvance } from "@/components/modulo/FilaAvance"
import { VideoIntro } from "@/components/modulo/VideoIntro"
import type { CourseCardProps } from "@/components/ui/course-card"
import heroPhoto from "@/assets/photos/notam-hero.webp"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import {
  EXAM_PASS_SCORE,
  NOTAM_PRACTICE_TOTAL,
  readLocalProgress,
  resumirNotam,
  EXAM_PER_ATTEMPT,
  NOTAM_TOTALES,
} from "@/lib/notamComun"
import { fetchNotamProgress, pushPendingLocalProgress } from "@/lib/notamProgress"

/**
 * Hub de la seccion NOTAM (modulo Ingreso a Aerolinea).
 * Ruta: /app/aerolinea/notam
 *
 * Tres partes: Aprende, Practica y Evaluacion.
 * El progreso se lee de Supabase (user_notam_progress + user_notam_exam_attempts)
 * y cae al respaldo local de la libreria si no hay sesion o la consulta falla.
 */


interface NotamProgress {
  lessonScreens: number[]
  practiceDone: string[]
  bestExamScore: number | null
}

interface AttemptRow {
  score: number | null
}

const EMPTY_PROGRESS: NotamProgress = {
  lessonScreens: [],
  practiceDone: [],
  bestExamScore: null,
}

/** Une el progreso remoto con el respaldo local (el local puede ser previo al login). */
function unirProgreso(remoto: NotamProgress, local: NotamProgress): NotamProgress {
  const scores = [remoto.bestExamScore, local.bestExamScore].filter(
    (s): s is number => typeof s === "number"
  )
  return {
    lessonScreens: Array.from(new Set([...remoto.lessonScreens, ...local.lessonScreens])),
    practiceDone: Array.from(new Set([...remoto.practiceDone, ...local.practiceDone])),
    bestExamScore: scores.length > 0 ? Math.max(...scores) : null,
  }
}

export function Notam() {
  const { user, isLoading: sessionLoading } = useSession()
  const [progress, setProgress] = useState<NotamProgress>(EMPTY_PROGRESS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionLoading) return
    let cancelled = false

    async function cargar() {
      const local = readLocalProgress()
      const localProgress: NotamProgress = {
        lessonScreens: local.lessonScreens,
        practiceDone: local.exercisesDone,
        bestExamScore: local.bestExamScore,
      }

      if (!user) {
        if (!cancelled) {
          setProgress(localProgress)
          setLoading(false)
        }
        return
      }

      try {
        const [progRes, examRes] = await Promise.all([
          fetchNotamProgress(user.id),
          supabase
            .from("user_notam_exam_attempts")
            .select("score")
            .eq("user_id", user.id)
            .order("score", { ascending: false })
            .limit(1),
        ])
        if (cancelled) return
        if (examRes.error) throw examRes.error
        if (!progRes) throw new Error("no se pudo leer el progreso guardado")

        // Sube lo que el usuario avanzó sin sesión antes de armar el resumen: así
        // el porcentaje que ve es el que de verdad quedó guardado, y no se pierde
        // al abrir la app en otro dispositivo.
        const remotoSync = await pushPendingLocalProgress(progRes)
        if (cancelled) return

        const attempts = (examRes.data ?? []) as AttemptRow[]
        const remoto: NotamProgress = {
          lessonScreens: remotoSync.lessonScreens,
          practiceDone: remotoSync.practiceDone,
          bestExamScore: typeof attempts[0]?.score === "number" ? attempts[0].score : null,
        }
        setProgress(unirProgreso(remoto, localProgress))
      } catch {
        // Si la consulta falla no rompemos la pagina: mostramos el respaldo local.
        if (!cancelled) setProgress(localProgress)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    cargar()
    return () => {
      cancelled = true
    }
  }, [user, sessionLoading])

  // La cuenta vive en lib/notam para que esta pantalla y la lista de temas de
  // Ingreso a aerolínea no puedan mostrar dos porcentajes distintos.
  const resumen = useMemo(() => resumirNotam(progress), [progress])

  // Las tres partes, presentadas como el catálogo de cursos de la portada:
  // eliges por dónde entrar, y ahí la foto orienta y distingue. Las tarjetas de
  // dato de esta misma página (el progreso de arriba) siguen sin foto.
  const partes: CourseCardProps[] = [
    {
      to: "/app/aerolinea/notam/aprende",
      densidad: "compacta" as const,
      icon: BookOpen,
      color: "var(--av-blue-500)",
      meta: `${NOTAM_TOTALES.lessonScreens} secciones de formación`,
      title: "1. Aprende",
      blurb:
        "Conoce la estructura del NOTAM, identifica sus componentes y aprende a interpretar la información aeronáutica.",
      cta: "Iniciar formación",
      photoHueco: "NT-POR-01 · Portada 5:2 · 1200×480 · Mesa de estudio con cartas y un NOTAM impreso",
      photoAspect: "5/2",
      status:
        resumen.lessonRead === 0
          ? "Sin empezar"
          : resumen.lessonRead >= NOTAM_TOTALES.lessonScreens
            ? "Lección completa"
            : `${resumen.lessonRead} de ${NOTAM_TOTALES.lessonScreens} secciones leídas`,
      progress: resumen.lessonPct,
      done: resumen.lessonRead >= NOTAM_TOTALES.lessonScreens,
    },
    {
      to: "/app/aerolinea/notam/practica",
      densidad: "compacta" as const,
      icon: Target,
      color: "var(--av-violet-400)",
      meta: "NOTAMs reales · Imagen y texto",
      title: "2. Práctica",
      blurb:
        "Trabaja con NOTAMs reales y fortalece tu capacidad para reconocer abreviaturas, interpretar mensajes y comprender su significado operacional.",
      cta: "Iniciar práctica",
      photoHueco: "NT-POR-02 · Portada 5:2 · 1200×480 · Tableta con NOTAM reales en preparación de vuelo",
      photoAspect: "5/2",
      status:
        resumen.practiceDone === 0
          ? "Sin empezar"
          : `${resumen.practiceDone} de ${NOTAM_PRACTICE_TOTAL} resueltos`,
      progress: resumen.practicePct,
      done: resumen.practiceDone >= NOTAM_PRACTICE_TOTAL,
    },
    {
      to: "/app/aerolinea/notam/evaluacion",
      densidad: "compacta" as const,
      icon: GraduationCap,
      color: "var(--av-amber-400)",
      meta: `${EXAM_PER_ATTEMPT} preguntas · Puntaje mínimo ${EXAM_PASS_SCORE}%`,
      title: "3. Evaluación",
      blurb: `Comprueba tu dominio de la lectura e interpretación de NOTAMs mediante una evaluación de ${EXAM_PER_ATTEMPT} preguntas aleatorias.`,
      cta: "Iniciar evaluación",
      photoHueco: "NT-POR-03 · Portada 5:2 · 1200×480 · Hoja de respuestas y cronómetro sobre la mesa",
      photoAspect: "5/2",
      status:
        resumen.best === null
          ? "Sin intentos"
          : resumen.passed
            ? `Aprobada con ${resumen.best} de 100`
            : `Mejor puntaje: ${resumen.best} de 100`,
      done: resumen.passed,
    },
  ]

  return (
    <>
      <div className="notam-hub px-5 sm:px-8 py-9 sm:py-11 pb-24 max-w-[1280px] mx-auto">
        <Link
          to="/app/aerolinea"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a Ingreso a aerolínea
        </Link>

        {/* Hero de sección. La foto va a sangre bajo un velo navy: el título
            tiene que leerse sobre cualquier zona de la imagen, y por eso el
            velo es un degradado y no una opacidad plana. El panel de avance
            vive dentro del hero porque "qué es esto" y "cómo voy" son la misma
            pregunta al llegar. */}
        <section className="relative overflow-hidden rounded-[18px] shadow-[0_1px_2px_rgba(11,27,48,0.08)]">
          <img
            src={heroPhoto}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(8,20,36,.90) 0%, rgba(8,20,36,.76) 40%, rgba(8,20,36,.50) 70%, rgba(8,20,36,.30) 100%)",
            }}
            aria-hidden
          />

          <div className="relative grid gap-7 px-7 pb-7 pt-7 sm:px-12 sm:pb-8 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,248px)] lg:gap-10">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7FB2F2]">
                  Módulo 1
                </span>
                <span className="h-3 w-px bg-white/20" aria-hidden />
                <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                  Ingreso a aerolínea
                </span>
              </div>

              <h1 className="nh-display mt-4 text-[38px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[46px] lg:text-[54px]">
                NOTAM
              </h1>

              <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.55] text-white/80">
                Los NOTAM avisan de pistas cerradas, ayudas fuera de servicio y peligros
                temporales: los necesitas para planear cada vuelo y te los preguntan en las
                entrevistas y pruebas técnicas de las aerolíneas.
              </p>

              {/* Columna `w-fit`: el mas ancho de los dos fija el ancho y el otro
                  lo iguala, asi que la tarjeta y los botones acaban en la misma
                  vertical sin ninguna medida escrita a mano. */}
              <div className="mt-5 flex w-fit max-w-full flex-col gap-3">
                {/* Sin esperar al avance: la tarjeta es la misma para todos,
                    y retrasarla solo hacía que los botones dieran un salto. */}
                <VideoIntro
                  src="/modulos/notam/intro.mp4"
                  miniatura={heroPhoto}
                  portada="/modulos/notam/intro-poster.webp"
                  duracion="59 s"
                  titulo="Introducción al módulo de NOTAM"
                  continuarA="/app/aerolinea/notam/aprende"
                  continuarTexto="Empezar la lección"
                  claveVisto="av:visto:intro:notam"
                />

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/app/aerolinea/notam/aprende"
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-[10px] px-6 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(10,26,47,0.35)] transition-colors"
                    style={{ background: "var(--av-blue-500)" }}
                  >
                    <BookOpen className="h-4 w-4" /> Empezar la lección
                  </Link>
                  <Link
                    to="/app/aerolinea/notam/practica"
                    className="inline-flex min-h-[48px] items-center gap-2 whitespace-nowrap rounded-[10px] border border-white/25 px-5 text-[15px] font-medium text-white/90 transition-colors hover:border-white/60 hover:text-white"
                  >
                    <Target className="h-4 w-4" /> Ir a la práctica
                  </Link>
                </div>
              </div>

            </div>

            {/* Avance de la sección: la cifra global y, bajo una línea fina, de
                qué se compone. Una sola caja de cristal sobre la foto: en dos
                cajas separadas se troceaba algo que se lee de un tirón, y una
                superficie clara aquí partiría el hero en dos pantallas.
                `overflow-hidden` es lo que deja que la línea llegue de borde a
                borde sin desbordar el radio de las esquinas. */}
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
                      <span className="text-[11px] text-white/60">de la sección</span>
                    </div>
                    <div
                      className="mt-3 h-1 overflow-hidden rounded-sm bg-white/15"
                      role="progressbar"
                      aria-valuenow={resumen.overall}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Avance de la sección NOTAM"
                    >
                      <div
                        className="h-full rounded-sm transition-[width]"
                        style={{
                          width: `${resumen.overall}%`,
                          background: "var(--av-green-400)",
                        }}
                      />
                    </div>
                  </>
                )}
                {/* Solo sin sesión. Al que ya entró, repetirle en cada visita
                    que su avance se guarda es ruido; sin sesión, en cambio, es
                    la razón para registrarse.

                    Espera a `sessionLoading`: mientras se resuelve, `user` está
                    indefinido, y sin esa guarda a quien sí tiene sesión le
                    parpadeaba un aviso diciéndole que no la tiene. */}
                {!sessionLoading && !user && (
                  <p className="mt-2 text-[10.5px] leading-[1.5] text-white/55">
                    Inicia sesión para guardar tu avance en la cuenta.
                  </p>
                )}
              </div>

              <div className="border-t border-white/10 p-1">
                <FilaAvance
                  titulo="Lección"
                  to="/app/aerolinea/notam/aprende"
                  valor={`${resumen.lessonRead} / ${NOTAM_TOTALES.lessonScreens}`}
                  pct={resumen.lessonPct}
                  color="#4E9BF5"
                  cargando={loading}
                />
                <FilaAvance
                  titulo="Práctica"
                  to="/app/aerolinea/notam/practica"
                  valor={`${resumen.practiceDone} / ${NOTAM_PRACTICE_TOTAL}`}
                  pct={resumen.practicePct}
                  color="var(--av-cyan-400)"
                  cargando={loading}
                />
                <FilaAvance
                  titulo="Evaluación"
                  to="/app/aerolinea/notam/evaluacion"
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

        {/* Las 3 partes */}
        <section className="pt-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partes.map((p) => (
              <CourseCard key={p.to} {...p} statusLoading={loading} />
            ))}
          </div>
        </section>

      </div>
    </>
  )
}
