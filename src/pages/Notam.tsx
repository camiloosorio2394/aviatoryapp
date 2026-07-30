import { useEffect, useMemo, useState } from "react"
import type { ComponentType } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ScanSearch,
  Target,
  GraduationCap,
  Plane,
  FileText,
  Info,
  ListOrdered,
  Sparkles,
  CheckCircle2,
  Gauge,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { SectionTitle } from "@/components/ui/section-title"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import {
  CODE_META,
  DISCLAIMERS,
  EXAM_PASS_SCORE,
  TOTALS,
  readLocalProgress,
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

const PRACTICE_TOTAL = TOTALS.exercises + TOTALS.national

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

  const resumen = useMemo(() => {
    const lessonRead = Math.min(progress.lessonScreens.length, TOTALS.lessonScreens)
    const practiceDone = Math.min(progress.practiceDone.length, PRACTICE_TOTAL)
    const best = progress.bestExamScore
    const passed = best !== null && best >= EXAM_PASS_SCORE

    const lessonPct = Math.round((lessonRead / TOTALS.lessonScreens) * 100)
    const practicePct = Math.round((practiceDone / PRACTICE_TOTAL) * 100)
    // La evaluacion aporta tu mejor puntaje; si ya aprobaste, aporta el 100 por ciento.
    const examPct = passed ? 100 : (best ?? 0)
    const overall = Math.round((lessonPct + practicePct + examPct) / 3)

    return {
      lessonRead,
      practiceDone,
      best,
      passed,
      lessonPct,
      practicePct,
      examPct,
      overall,
      empty: lessonRead === 0 && practiceDone === 0 && best === null,
    }
  }, [progress])

  const partes: ParteCard[] = [
    {
      to: "/app/aerolinea/notam/aprende",
      icon: BookOpen,
      color: "var(--av-blue-500)",
      eyebrow: `${TOTALS.lessonScreens} secciones`,
      title: "Aprende",
      description:
        "La lección completa: para qué sirve un NOTAM, quién lo publica y cómo se lee casilla por casilla.",
      estado:
        resumen.lessonRead === 0
          ? "Sin empezar"
          : resumen.lessonRead >= TOTALS.lessonScreens
            ? "Lección completa"
            : `${resumen.lessonRead} de ${TOTALS.lessonScreens} secciones leídas`,
      hecho: resumen.lessonRead >= TOTALS.lessonScreens,
    },
    {
      to: "/app/aerolinea/notam/decodificador",
      icon: ScanSearch,
      color: "var(--av-cyan-400)",
      eyebrow: `${TOTALS.subjects} asuntos y ${TOTALS.statuses} estados`,
      title: "Decodificador",
      description:
        "Escribe un código Q de 5 letras y te devuelve el asunto, el estado y la fraseología normalizada. Trae buscador.",
      estado: "Consulta libre, sin límite",
      hecho: false,
    },
    {
      to: "/app/aerolinea/notam/practica",
      icon: Target,
      color: "var(--av-violet-400)",
      eyebrow: `${TOTALS.exercises} ejercicios y ${TOTALS.national} NOTAM reales de Colombia`,
      title: "Práctica",
      description:
        "Interpretas NOTAM de texto y recortes reales publicados por la Aerocivil, con respuesta modelo y puntos clave.",
      estado:
        resumen.practiceDone === 0
          ? "Sin empezar"
          : `${resumen.practiceDone} de ${PRACTICE_TOTAL} resueltos`,
      hecho: resumen.practiceDone >= PRACTICE_TOTAL,
    },
    {
      to: "/app/aerolinea/notam/evaluacion",
      icon: GraduationCap,
      color: "var(--av-amber-400)",
      eyebrow: `${TOTALS.examQuestions} preguntas, apruebas con ${EXAM_PASS_SCORE}`,
      title: "Evaluación",
      description:
        "Opción múltiple con preguntas y opciones barajadas. Al final ves la explicación y la referencia de cada una.",
      estado:
        resumen.best === null
          ? "Sin intentos"
          : resumen.passed
            ? `Aprobada con ${resumen.best} de 100`
            : `Mejor puntaje: ${resumen.best} de 100`,
      hecho: resumen.passed,
    },
  ]

  return (
    <AppLayout>
      <div className="px-5 sm:px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <Link
          to="/app/aerolinea"
          className="inline-flex items-center gap-1.5 text-[13.5px] text-muted-foreground hover:text-foreground transition-colors mb-4"
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
            <>
              <Link
                to="/app/aerolinea/notam/aprende"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[14.5px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--av-blue-500)" }}
              >
                <Sparkles className="h-4 w-4" /> Empezar la lección
              </Link>
              <Link
                to="/app/aerolinea/notam/decodificador"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[14.5px] font-semibold surface hover:bg-muted transition-colors"
              >
                <ScanSearch className="h-4 w-4" /> Decodificar un código
              </Link>
            </>
          }
        />

        {/* Contexto y fuente del contenido */}
        <section className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl surface p-6">
            <SectionTitle icon={Info} eyebrow="Antes de arrancar" title="Qué es un NOTAM" />
            <p className="text-[14.5px] text-foreground/90 leading-relaxed">
              Un NOTAM es un aviso que distribuye el servicio AIS con información temporal o urgente
              que afecta la operación: cierre de pista, ILS o PAPI fuera de servicio, obras,
              obstáculos nuevos, espacios aéreos restringidos o vuelos de UAS.
            </p>
            <p className="mt-2.5 text-[14.5px] text-foreground/90 leading-relaxed">
              Se escribe con un código de 5 letras y casillas fijas (A hasta G), así que cualquier
              piloto del mundo lo entiende sin traducirlo. Aquí aprendes a leerlo de corrido, en
              español y con ejemplos de Colombia.
            </p>
          </div>

          <div
            className="rounded-2xl border p-6"
            style={{
              borderColor: "color-mix(in oklab, var(--av-blue-500) 22%, transparent)",
              background: "color-mix(in oklab, var(--av-blue-500) 5%, transparent)",
            }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <FileText className="h-4 w-4" style={{ color: "var(--av-blue-500)" }} />
              <div className="text-[14px] font-bold tracking-[-0.01em]">
                De dónde sale el contenido
              </div>
            </div>
            <p className="text-[13.5px] text-muted-foreground leading-relaxed">
              {CODE_META.fuente}
            </p>
            <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">
              Los ejemplos colombianos salen de los resúmenes de NOTAM vigentes que publica la
              Aerocivil.
            </p>
            <p className="mt-3.5 pt-3 border-t border-border/60 text-[12.5px] text-muted-foreground leading-relaxed">
              {DISCLAIMERS.edition}
            </p>
          </div>
        </section>

        {/* Progreso general de la seccion */}
        <section className="mt-9">
          <SectionTitle
            icon={Gauge}
            eyebrow="Tu avance"
            title="Progreso de la sección"
            hint={
              user
                ? "Se guarda en tu cuenta a medida que avanzas."
                : "Inicia sesión para guardar tu avance en la cuenta."
            }
            right={
              !loading && !resumen.empty ? (
                <div
                  className="tabular text-[28px] font-extrabold tracking-[-0.03em]"
                  style={{ color: "var(--av-blue-500)" }}
                >
                  {resumen.overall}%
                </div>
              ) : undefined
            }
          />

          <div className="rounded-2xl surface p-6 min-h-[196px]">
            {loading ? (
              <ProgresoSkeleton />
            ) : resumen.empty ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: "color-mix(in oklab, var(--av-blue-500) 14%, transparent)",
                    border: "1px solid color-mix(in oklab, var(--av-blue-500) 30%, transparent)",
                    color: "var(--av-blue-500)",
                  }}
                >
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[17px] font-bold tracking-[-0.01em]">
                    Todavía no empiezas esta sección
                  </div>
                  <p className="mt-1 text-[14px] text-muted-foreground leading-relaxed max-w-[620px]">
                    Arranca por la lección: son {TOTALS.lessonScreens} secciones cortas y de ahí
                    salen el código Q y las casillas que después usas en la práctica y en la
                    evaluación. Cuando termines, el decodificador te queda como herramienta de
                    consulta.
                  </p>
                </div>
                <Link
                  to="/app/aerolinea/notam/aprende"
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl text-[14.5px] font-semibold text-white border-0 flex-shrink-0 transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--av-blue-500)" }}
                >
                  Empezar por la lección <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${resumen.overall}%`,
                      background: "linear-gradient(90deg, var(--av-blue-400), var(--av-blue-500))",
                    }}
                  />
                </div>
                <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
                  <MiniStat
                    label="Lección"
                    value={`${resumen.lessonRead} / ${TOTALS.lessonScreens}`}
                    detail="secciones leídas"
                    pct={resumen.lessonPct}
                    color="var(--av-blue-500)"
                  />
                  <MiniStat
                    label="Práctica"
                    value={`${resumen.practiceDone} / ${PRACTICE_TOTAL}`}
                    detail="ejercicios resueltos"
                    pct={resumen.practicePct}
                    color="var(--av-violet-400)"
                  />
                  <MiniStat
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
          </div>
        </section>

        {/* Las 4 partes */}
        <section className="mt-10">
          <SectionTitle
            icon={ListOrdered}
            eyebrow="La sección · 4 partes"
            title="Por dónde vas a pasar"
            hint="El orden recomendado es de arriba abajo, pero puedes entrar a cualquiera."
          />
          <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
            {partes.map((p) => (
              <ParteTile key={p.to} {...p} cargando={loading} />
            ))}
          </div>
        </section>

      </div>
    </AppLayout>
  )
}

// ─── Sub componentes ─────────────────────────────────────────────────────────

interface ParteCard {
  to: string
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
  color: string
  eyebrow: string
  title: string
  description: string
  estado: string
  hecho: boolean
}

function ParteTile({
  to,
  icon: Icon,
  color,
  eyebrow,
  title,
  description,
  estado,
  hecho,
  cargando,
}: ParteCard & { cargando: boolean }) {
  return (
    <Link
      to={to}
      className="card-apple group rounded-2xl border bg-card p-5 flex flex-col gap-3"
      style={{ borderColor: `color-mix(in oklab, ${color} 28%, transparent)` }}
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: `color-mix(in oklab, ${color} 14%, transparent)`,
            border: `1px solid color-mix(in oklab, ${color} 32%, transparent)`,
            color,
          }}
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        {!cargando && hecho && (
          <span
            className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              color: "var(--av-green-400)",
              background: "color-mix(in oklab, var(--av-green-400) 14%, transparent)",
            }}
          >
            <CheckCircle2 className="h-3 w-3" /> Listo
          </span>
        )}
      </div>

      <div>
        <div className="text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color }}>
          {eyebrow}
        </div>
        <div className="mt-0.5 text-[17px] font-bold tracking-[-0.01em]">{title}</div>
        <p className="mt-1 text-[13.5px] text-muted-foreground leading-relaxed">{description}</p>
      </div>

      <div className="mt-auto pt-2.5 border-t border-border/60 flex items-center justify-between gap-2">
        {cargando ? (
          <span className="h-4 w-32 rounded bg-muted animate-pulse" aria-hidden="true" />
        ) : (
          <span className="text-[12.5px] font-semibold text-muted-foreground">{estado}</span>
        )}
        <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
}

function MiniStat({
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
    <div
      className="rounded-xl border p-3.5"
      style={{ borderColor: "color-mix(in oklab, var(--border) 65%, transparent)" }}
    >
      <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 tabular text-[19px] font-extrabold tracking-[-0.02em]" style={{ color }}>
        {value}
      </div>
      <div className="text-[12.5px] text-muted-foreground">{detail}</div>
      <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${Math.max(0, Math.min(100, pct))}%`, background: color }}
        />
      </div>
    </div>
  )
}

function ProgresoSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="h-2.5 rounded-full bg-muted animate-pulse" />
      <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-xl border p-3.5"
            style={{ borderColor: "color-mix(in oklab, var(--border) 65%, transparent)" }}
          >
            <div className="h-3 w-16 rounded bg-muted animate-pulse" />
            <div className="mt-2 h-5 w-24 rounded bg-muted animate-pulse" />
            <div className="mt-2 h-3 w-28 rounded bg-muted animate-pulse" />
            <div className="mt-2.5 h-1.5 rounded-full bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
