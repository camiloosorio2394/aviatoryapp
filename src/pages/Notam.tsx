import { useEffect, useMemo, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ScanSearch,
  Target,
  GraduationCap,
  Plane,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { CourseCard } from "@/components/ui/course-card"
import type { CourseCardProps } from "@/components/ui/course-card"
import aprendePhoto from "@/assets/photos/notam-aprende-planeacion.jpg"
import decodificadorPhoto from "@/assets/photos/notam-decodificador-tablero.jpg"
import practicaPhoto from "@/assets/photos/notam-practica-cabina.jpg"
import evaluacionPhoto from "@/assets/photos/notam-evaluacion-examen.jpg"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import {
  EXAM_PASS_SCORE,
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
 * Cuatro partes: Aprende, Decodificador, Practica y Evaluacion.
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

  // Las cuatro partes, presentadas como el catálogo de cursos de la portada:
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
      to: "/app/aerolinea/notam/decodificador",
      icon: ScanSearch,
      color: "var(--av-cyan-400)",
      meta: `${TOTALS.subjects} asuntos y ${TOTALS.statuses} estados`,
      title: "Decodificador",
      blurb:
        "Escribe un código Q de 5 letras y te devuelve el asunto, el estado y la fraseología normalizada. Trae buscador.",
      cta: "Abrir el decodificador",
      photo: decodificadorPhoto,
      status: "Consulta libre, sin límite",
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
      meta: `${TOTALS.examQuestions} preguntas, apruebas con ${EXAM_PASS_SCORE}`,
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
      <div className="px-5 sm:px-7 py-7 pb-20 max-w-[1280px] mx-auto">
        <Link
          to="/app/aerolinea"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a Ingreso a aerolínea
        </Link>

        <PageHeader
          eyebrow={
            <>
              <Plane className="h-3.5 w-3.5" /> Ingreso a aerolínea · sección
            </>
          }
          title="NOTAM"
          subtitle="Los NOTAM avisan de pistas cerradas, ayudas fuera de servicio y peligros temporales: los necesitas para planear cada vuelo y te los preguntan en las entrevistas y pruebas técnicas de las aerolíneas."
          actions={
            /* Un solo boton primario. Dos botones del mismo peso obligan a
               elegir sin decir cual importa; el decodificador es herramienta de
               consulta, no la entrada a la seccion, asi que baja a enlace. */
            <div className="flex items-center gap-5">
              <Link
                to="/app/aerolinea/notam/decodificador"
                className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
              >
                <ScanSearch className="h-3.5 w-3.5" /> Decodificar un código
              </Link>
              <Link
                to="/app/aerolinea/notam/aprende"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--av-blue-500)" }}
              >
                <BookOpen className="h-4 w-4" /> Empezar la lección
              </Link>
            </div>
          }
        />

        {/* Ficha tecnica de la seccion: lo que trae, en datos y no en prosa.
            Todos los numeros salen de TOTALS, ninguno esta escrito a mano. */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 py-2.5 border-y border-border mono text-[12px] text-muted-foreground">
          <span>4 partes</span>
          <Filete />
          <span>{TOTALS.lessonScreens} secciones de lectura</span>
          <Filete />
          <span>{TOTALS.national} NOTAM reales de Colombia</span>
          <Filete />
          <span>OACI Doc 8400, 6ª ed.</span>
          {!loading && !resumen.empty && (
            <span className="ml-auto tabular" style={{ color: "var(--av-blue-500)" }}>
              {resumen.overall}% completado
            </span>
          )}
        </div>

        {/* Tu avance. Sin tarjeta: la estructura la dan los filetes. Apilar
            superficies redondeadas era lo que hacia que la pantalla se leyera
            como plantilla y no como instrumento. */}
        <section className="py-8 border-b border-border">
          <Rotulo>Tu avance</Rotulo>

          {loading ? (
            <ProgresoSkeleton />
          ) : resumen.empty ? (
            <div className="mt-3.5 flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="flex-1 min-w-0">
                <div className="text-[20px] font-semibold tracking-[-0.02em]">
                  Todavía no empiezas esta sección
                </div>
                <p className="mt-1.5 text-[15px] text-muted-foreground leading-relaxed max-w-[60ch]">
                  Arranca por la lección: son {TOTALS.lessonScreens} secciones cortas y de ahí
                  salen el código Q y las casillas que después usas en la práctica y en la
                  evaluación. Cuando termines, el decodificador te queda como herramienta de
                  consulta.
                </p>
              </div>
              <Link
                to="/app/aerolinea/notam/aprende"
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg text-[15px] font-semibold text-white border-0 flex-shrink-0 transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--av-blue-500)" }}
              >
                Empezar por la lección <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-3 flex items-baseline gap-2.5">
                <span className="tabular text-[32px] font-semibold tracking-[-0.03em] leading-none">
                  {resumen.overall}%
                </span>
                <span className="mono text-[13px] text-muted-foreground">de la sección</span>
              </div>
              <div className="mt-5">
                <Pista
                  label="Lección"
                  value={`${resumen.lessonRead} / ${TOTALS.lessonScreens}`}
                  detail="secciones leídas"
                  pct={resumen.lessonPct}
                  color="var(--av-blue-500)"
                />
                <Pista
                  label="Práctica"
                  value={`${resumen.practiceDone} / ${NOTAM_PRACTICE_TOTAL}`}
                  detail="ejercicios resueltos"
                  pct={resumen.practicePct}
                  color="var(--av-violet-400)"
                />
                <Pista
                  label="Evaluación"
                  value={resumen.best === null ? "Sin intentos" : `${resumen.best} / 100`}
                  detail={
                    resumen.best === null
                      ? `apruebas con ${EXAM_PASS_SCORE}`
                      : resumen.passed
                        ? "aprobada"
                        : `te faltan ${EXAM_PASS_SCORE - resumen.best} puntos`
                  }
                  pct={resumen.examPct}
                  color={resumen.passed ? "var(--av-green-400)" : "var(--av-amber-400)"}
                />
              </div>
            </>
          )}

          <p className="mt-5 mono text-[11px] text-muted-foreground">
            {user
              ? "Se guarda en tu cuenta a medida que avanzas."
              : "Inicia sesión para guardar tu avance en la cuenta."}
          </p>
        </section>

        {/* Las 4 partes */}
        <section className="pt-8">
          <Rotulo>La sección · 4 partes</Rotulo>
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
 * Micro-rotulo en mono y mayuscula. Es el patron del rediseno para nombrar un
 * bloque sin gastar un titular. Va contra la regla de sentence case del
 * proyecto, que reserva esto al lector de modulo: es una decision explicita de
 * Camilo del 3 de agosto, no un descuido.
 */
function Rotulo({ children }: { children: ReactNode }) {
  return (
    <div className="mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
      {children}
    </div>
  )
}

/** Separador vertical de la ficha tecnica. */
function Filete() {
  return (
    <span aria-hidden="true" style={{ color: "var(--border)" }}>
      |
    </span>
  )
}

/**
 * Una linea de avance. Barra recta de 3px y no capsula redondeada: la capsula
 * con degradado lee como app de consumo, la linea recta como instrumento, que
 * es de lo que va la app.
 */
function Pista({
  label,
  value,
  detail,
  pct,
  color,
}: {
  label: string
  value: string
  detail: string
  pct: number
  color: string
}) {
  return (
    <div className="py-3.5 border-t border-border first:border-t-0 first:pt-0">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[15px]">{label}</span>
        <span className="tabular text-[15px] font-medium" style={{ color }}>
          {value}
        </span>
      </div>
      <div className="mt-2 h-[3px] bg-muted overflow-hidden">
        <div
          className="h-full transition-all"
          style={{ width: `${Math.max(0, Math.min(100, pct))}%`, background: color }}
        />
      </div>
      <div className="mt-1.5 mono text-[11px] text-muted-foreground">{detail}</div>
    </div>
  )
}

function ProgresoSkeleton() {
  return (
    /* El esqueleto calca la forma final: cifra, tres pistas y sus barras. Un
       esqueleto que no coincide con lo que llega produce un salto al cargar. */
    <div aria-hidden="true">
      <div className="mt-3 h-8 w-28 bg-muted animate-pulse" />
      <div className="mt-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="py-3.5 border-t border-border first:border-t-0 first:pt-0">
            <div className="flex items-baseline justify-between gap-4">
              <div className="h-4 w-24 bg-muted animate-pulse" />
              <div className="h-4 w-16 bg-muted animate-pulse" />
            </div>
            <div className="mt-2 h-[3px] bg-muted animate-pulse" />
            <div className="mt-1.5 h-3 w-32 bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
