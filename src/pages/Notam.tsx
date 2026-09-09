import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight, BookOpen, Target, GraduationCap } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Rotulo } from "@/components/ui/rotulo"
import { CourseCard } from "@/components/ui/course-card"
import type { CourseCardProps } from "@/components/ui/course-card"
import heroPhoto from "@/assets/photos/notam-hero.webp"
import aprendePhoto from "@/assets/photos/notam-aprende-planeacion.jpg"
import practicaPhoto from "@/assets/photos/notam-practica-cabina.jpg"
import evaluacionPhoto from "@/assets/photos/notam-evaluacion-examen.jpg"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import {
  EXAM_PASS_SCORE,
  EXAM_PER_ATTEMPT,
  NOTAM_PRACTICE_TOTAL,
  TOTALS,
  readLocalProgress,
  resumirNotam,
} from "@/lib/notam"
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
      icon: BookOpen,
      color: "var(--av-blue-500)",
      meta: `${TOTALS.lessonScreens} secciones de lectura`,
      title: "Aprende",
      blurb:
        "La lección completa: para qué sirve un NOTAM, quién lo publica y cómo se lee casilla por casilla.",
      cta: "Abrir la lección",
      photo: aprendePhoto,
      status:
        resumen.lessonRead === 0
          ? "Sin empezar"
          : resumen.lessonRead >= TOTALS.lessonScreens
            ? "Lección completa"
            : `${resumen.lessonRead} de ${TOTALS.lessonScreens} secciones leídas`,
      progress: resumen.lessonPct,
      done: resumen.lessonRead >= TOTALS.lessonScreens,
    },
    {
      to: "/app/aerolinea/notam/practica",
      icon: Target,
      color: "var(--av-violet-400)",
      meta: `${TOTALS.exercises} ejercicios y ${TOTALS.national} NOTAM reales de Colombia`,
      title: "Práctica",
      blurb:
        "Interpretas NOTAM de texto y recortes reales publicados por la Aerocivil, con respuesta modelo y puntos clave.",
      cta: "Empezar a practicar",
      photo: practicaPhoto,
      status:
        resumen.practiceDone === 0
          ? "Sin empezar"
          : `${resumen.practiceDone} de ${NOTAM_PRACTICE_TOTAL} resueltos`,
      progress: resumen.practicePct,
      done: resumen.practiceDone >= NOTAM_PRACTICE_TOTAL,
    },
    {
      to: "/app/aerolinea/notam/evaluacion",
      icon: GraduationCap,
      color: "var(--av-amber-400)",
      meta: `${EXAM_PER_ATTEMPT} preguntas al azar, apruebas con ${EXAM_PASS_SCORE}`,
      title: "Evaluación",
      blurb:
        "Opción múltiple con preguntas y opciones barajadas. Al final ves la explicación y la referencia de cada una.",
      cta: "Presentar la evaluación",
      photo: evaluacionPhoto,
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
    <AppLayout>
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

          <div className="relative grid gap-8 px-7 pb-10 pt-9 sm:px-12 sm:pb-12 sm:pt-11 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-10">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7FB2F2]">
                  Sección 01
                </span>
                <span className="h-3 w-px bg-white/20" aria-hidden />
                <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                  Ingreso a aerolínea
                </span>
              </div>

              <h1 className="nh-display mt-4 text-[42px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[52px] lg:text-[64px]">
                NOTAM
              </h1>

              <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-white/80">
                Los NOTAM avisan de pistas cerradas, ayudas fuera de servicio y peligros
                temporales: los necesitas para planear cada vuelo y te los preguntan en las
                entrevistas y pruebas técnicas de las aerolíneas.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
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

            {/* Panel de avance. Cristal sobre la foto, no tarjeta blanca: una
                superficie clara aquí partiría el hero en dos pantallas. */}
            <div className="self-start rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.62)] px-5 py-[18px] backdrop-blur-[6px] lg:min-w-[230px]">
              <div className="nh-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                Tu avance
              </div>
              {loading ? (
                <>
                  <div className="mt-3 h-9 w-24 animate-pulse rounded bg-white/15" />
                  <div className="mt-4 h-1 animate-pulse rounded-sm bg-white/15" />
                </>
              ) : (
                <>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="nh-display tabular text-[40px] font-bold leading-none text-white">
                      {resumen.overall}%
                    </span>
                    <span className="text-[13px] text-white/60">de la sección</span>
                  </div>
                  <div
                    className="mt-4 h-1 overflow-hidden rounded-sm bg-white/15"
                    role="progressbar"
                    aria-valuenow={resumen.overall}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Avance de la sección NOTAM"
                  >
                    <div
                      className="h-full rounded-sm transition-all"
                      style={{ width: `${resumen.overall}%`, background: "#4E9BF5" }}
                    />
                  </div>
                </>
              )}
              <p className="mt-3 text-[12px] leading-[1.5] text-white/55">
                {user
                  ? "Se guarda en tu cuenta a medida que avanzas."
                  : "Inicia sesión para guardar tu avance en la cuenta."}
              </p>
            </div>
          </div>
        </section>

        {/* Franja de avance. El separador entre celdas es el hueco de un píxel
            de la retícula sobre el color del borde: una sola caja con tres
            celdas, y no tres tarjetas sueltas. */}
        <div className="mt-6 grid gap-px overflow-hidden rounded-[14px] border border-border bg-border [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <Celda
            titulo="Lección"
            to="/app/aerolinea/notam/aprende"
            valor={`${resumen.lessonRead} / ${TOTALS.lessonScreens}`}
            pie="secciones leídas"
            pct={resumen.lessonPct}
            color="var(--av-blue-500)"
            cargando={loading}
          />
          <Celda
            titulo="Práctica"
            to="/app/aerolinea/notam/practica"
            valor={`${resumen.practiceDone} / ${NOTAM_PRACTICE_TOTAL}`}
            pie="ejercicios resueltos"
            pct={resumen.practicePct}
            color="var(--av-blue-500)"
            cargando={loading}
          />
          <Celda
            titulo="Evaluación"
            to="/app/aerolinea/notam/evaluacion"
            valor={resumen.best === null ? "Sin intentos" : `${resumen.best} / 100`}
            aviso={resumen.best === null}
            pie={
              resumen.best === null
                ? `apruebas con ${EXAM_PASS_SCORE}`
                : resumen.passed
                  ? "aprobada"
                  : `te faltan ${EXAM_PASS_SCORE - resumen.best} puntos`
            }
            pct={resumen.examPct}
            color={resumen.passed ? "var(--av-green-400)" : "var(--av-amber-400)"}
            cargando={loading}
          />
        </div>

        {/* Las 3 partes */}
        <section className="pt-14">
          <Rotulo>La sección · 3 partes</Rotulo>
          <h2 className="mt-1.5 text-[24px] font-semibold tracking-[-0.021em] leading-tight">
            Por dónde vas a pasar
          </h2>
          <p className="mt-1.5 text-[15px] text-muted-foreground max-w-[60ch]">
            El orden recomendado es de arriba abajo, pero puedes entrar a cualquiera.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {partes.map((p) => (
              <CourseCard key={p.to} {...p} statusLoading={loading} />
            ))}
          </div>
        </section>

      </div>
    </AppLayout>
  )
}

// ─── Sub componentes ─────────────────────────────────────────────────────────

/**
 * Una celda de la franja de avance: bloque, cifra, barra y pie.
 *
 * La barra es recta y de cinco píxeles, no cápsula con degradado: la cápsula
 * lee como app de consumo y esta pantalla tiene que leerse como instrumento.
 * Cuando todavía no hay nada que medir, la cifra se sustituye por un sello
 * ámbar, que dice "pendiente" sin fingir un cero.
 */
function Celda({
  titulo,
  valor,
  pie,
  pct,
  color,
  aviso,
  cargando,
  to,
}: {
  titulo: string
  valor: string
  pie: string
  pct: number
  color: string
  aviso?: boolean
  cargando?: boolean
  /** A dónde lleva la celda. Sin esto se queda en dato, que era el problema. */
  to?: string
}) {
  return (
    <div className="bg-card px-6 py-[22px]">
      <div className="flex items-center justify-between gap-3">
        <span className="nh-display text-[16px] font-semibold">{titulo}</span>
        {cargando ? (
          <span className="h-4 w-14 animate-pulse rounded bg-muted" />
        ) : aviso ? (
          // El sello del sistema, no tres hexadecimales a mano: aquellos eran
          // los del handoff, calibrados para fondo claro, y en tema oscuro
          // dejaban un bloque crema sobre la tarjeta casi negra. `.chip-amber`
          // ya trae su variante para oscuro.
          //
          // Y no puede partirse en dos líneas: sin `whitespace-nowrap`, "Sin
          // intentos" rompe la altura de la celda y descuadra la franja entera.
          <span className="chip chip-amber shrink-0 whitespace-nowrap">{valor}</span>
        ) : (
          <span className="tabular text-[14px]" style={{ color }}>
            {valor}
          </span>
        )}
      </div>
      <div
        className="mt-3 h-[5px] overflow-hidden rounded-[3px] bg-muted"
        role="progressbar"
        aria-valuenow={cargando ? undefined : pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Avance de ${titulo}`}
      >
        <div
          className="h-full rounded-[3px] transition-all"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <div className="mt-2.5 text-[11px] tracking-[0.04em] text-muted-foreground">{pie}</div>
      {/* La celda no se queda en el dato: lleva a arreglarlo. Un «Sin intentos»
          sin salida es un reproche; con el enlace al lado es una invitación. */}
      {to && (
        <Link
          to={to}
          className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium transition-colors hover:underline"
          style={{ color }}
        >
          {pct > 0 ? "Seguir" : "Empezar"}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  )
}
