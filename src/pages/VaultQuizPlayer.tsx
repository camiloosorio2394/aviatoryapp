import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  AlertTriangle,
  Trophy,
  Sparkles,
  Loader2,
  RefreshCw,
  Timer,
  BookOpen,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { ProtectedContent } from "@/components/ProtectedContent"
import { KpiRing } from "@/components/ui/kpi-ring"
import { useVaultQuiz, type AnswerResult, type VaultError } from "@/hooks/useVaultQuiz"
import { registrarActividadDeEstudio } from "@/lib/activity"
import { getSubjectMeta } from "@/lib/vaultSubjects"
import { TILE_COLOR, tileBorder, tileTint, type TileColorKey } from "@/lib/tileColors"

const MODULE_LABEL: Record<string, string> = {
  pca: "Examen PCA Aerocivil",
  airline_prep: "Ingreso a Aerolínea",
  icao: "Inglés ICAO",
  psych: "Psicotécnicas",
  interview_sim: "Simulador entrevistas",
  library: "Biblioteca",
}

interface HistoryEntry {
  position: number
  correct: boolean
  /** `null` en el simulacro mezclado: el servidor no informa la materia por pregunta. */
  subjectSlug: string | null
  question: string
  correctAnswer: string
  explanation: string
}

const MIXED_KEY = "__mixed__"

/**
 * Quiz player que consume las preguntas del vault encriptado.
 *
 * Flujo:
 *  1. Mount → llama vault_start_quiz(subject, module, 10) → muestra Q1
 *  2. User clickea una opción → estado "selected" (todavía no submit)
 *  3. User clickea "Comprobar" → llama vault_submit_answer(token, position, answer)
 *     → backend valida server-side → devuelve is_correct + correct + explanation
 *  4. UI muestra feedback (verde/rojo) + explicación + pedagogical_note si hay
 *  5. "Siguiente" → carga la próxima pregunta del array local del session
 *  6. Última → resumen con score, recap por materia y repaso de las falladas
 *
 * La respuesta correcta jamás viaja al cliente antes del submit.
 */
export function VaultQuizPlayer() {
  const params = useParams<{ subject: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const subjectSlug = params.subject ?? ""
  const module = searchParams.get("module") ?? "pca"
  const count = Number(searchParams.get("count") ?? "10")
  // 'examen' = simulacro: preguntas mezcladas de TODAS las materias (sin filtro)
  const isExam = subjectSlug === "examen"

  const { session, loading, error, startQuiz, submitAnswer, resetSession } = useVaultQuiz()

  const [position, setPosition] = useState(1)
  const [selected, setSelected] = useState<string | null>(null)
  const [result, setResult] = useState<AnswerResult | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [completed, setCompleted] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)

  // Start session once
  useEffect(() => {
    if (!subjectSlug) {
      navigate("/app/pca", { replace: true })
      return
    }
    startQuiz({ subjectSlug: isExam ? undefined : subjectSlug, module, count: Math.min(Math.max(count, 1), 20) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectSlug, module, count])

  const currentQuestion = useMemo(() => {
    if (!session) return null
    return session.questions.find((q) => q.position === position) ?? null
  }, [session, position])

  const subjectMeta = isExam
    ? { name: "Simulacro Examen PCA", color: "cyan" as TileColorKey }
    : getSubjectMeta(subjectSlug)
  const total = session?.questionCount ?? 0
  const correctCount = history.filter((h) => h.correct).length
  const progressPct = total > 0 ? Math.round((Math.min(position - 1 + (result ? 1 : 0), total) / total) * 100) : 0
  const wrongList = useMemo(() => history.filter((h) => !h.correct), [history])

  /** Recap agrupado por materia: en el simulacro cae todo en un grupo mezclado. */
  const grouped = useMemo(() => {
    const map = new Map<string, { key: string; label: string; items: HistoryEntry[] }>()
    for (const h of history) {
      const key = h.subjectSlug ?? MIXED_KEY
      const label = h.subjectSlug ? getSubjectMeta(h.subjectSlug).name : "Materias mezcladas"
      const bucket = map.get(key)
      if (bucket) bucket.items.push(h)
      else map.set(key, { key, label, items: [h] })
    }
    return [...map.values()]
  }, [history])

  function subjectLabelOf(entry: HistoryEntry) {
    return entry.subjectSlug ? getSubjectMeta(entry.subjectSlug).name : subjectMeta.name
  }

  async function handleSubmit() {
    if (!selected || !currentQuestion || submitting) return
    setSubmitting(true)
    const res = await submitAnswer(position, selected)
    setSubmitting(false)
    if (res) {
      setResult(res)
      setHistory((h) => [
        ...h,
        {
          position,
          correct: res.is_correct,
          subjectSlug: currentQuestion.subject_slug ?? (isExam ? null : subjectSlug),
          question: currentQuestion.question,
          correctAnswer: res.correct_answer,
          explanation: res.explanation,
        },
      ])
    }
  }

  function handleNext() {
    if (!session) return
    if (position >= session.questionCount) {
      setCompleted(true)
      // Quiz terminado = día estudiado: alimenta el heatmap y mantiene la
      // racha. Sin esto, el tablero decía "racha en riesgo" el mismo día en
      // que el piloto había hecho cinco quizzes.
      void registrarActividadDeEstudio({
        questions: session.questionCount,
        correct: history.filter((h) => h.correct).length,
      })
      return
    }
    setPosition(position + 1)
    setSelected(null)
    setResult(null)
  }

  function handleRestart() {
    resetSession()
    setPosition(1)
    setSelected(null)
    setResult(null)
    setHistory([])
    setCompleted(false)
    setReviewOpen(false)
    startQuiz({ subjectSlug: isExam ? undefined : subjectSlug, module, count: Math.min(Math.max(count, 1), 20) })
  }

  // ──────────────────── Error: sin preguntas / rate limit / falla ────────────────────
  if (error && !session) {
    const noQuestionsTitle = isExam
      ? "Todavía no hay preguntas en el banco"
      : `Todavía no hay preguntas de ${subjectMeta.name}`
    return <QuizNotice {...noticeFor(error, noQuestionsTitle)} onRetry={handleRestart} />
  }

  // ──────────────────── Loading ────────────────────
  if (loading || (!session && !completed)) {
    return (
      <AppLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="h-7 w-7 animate-spin" />
          <p className="text-[15px]">Preparando tu quiz…</p>
        </div>
      </AppLayout>
    )
  }

  // ──────────────────── Final summary ────────────────────
  if (completed && session) {
    const scorePct = Math.round((correctCount / session.questionCount) * 100)
    const passed = scorePct >= 70
    return (
      <AppLayout>
        <div className="px-5 sm:px-7 py-7 pb-20 max-w-[920px] mx-auto">
          <section className="anim-fade-up relative overflow-hidden rounded-2xl surface p-6 sm:p-8">
            <div className="relative grid items-center gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-[1fr_auto]">
              <div>
                <div
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    color: "var(--av-blue-500)",
                    background: "color-mix(in oklab, var(--av-blue-500) 10%, transparent)",
                    border: "1px solid color-mix(in oklab, var(--av-blue-500) 28%, transparent)",
                  }}
                >
                  <Trophy className="h-3 w-3" /> Resultado · {subjectMeta.name}
                </div>
                <h1 className="mt-4 mb-1.5 text-[32px] sm:text-[32px] font-semibold tracking-[-0.03em] leading-[1.05]">
                  {passed ? "¡Aprobaste!" : "Casi llegas"}
                </h1>
                <p className="text-[17px] text-muted-foreground max-w-[520px] mt-2">
                  {correctCount} de {session.questionCount} correctas ·{" "}
                  {passed
                    ? "Sobre 70%: listo para presentar a este ritmo."
                    : "Bajo 70%: repasa la teoría y vuelve a intentar."}
                </p>
              </div>
              <KpiRing
                value={scorePct}
                max={100}
                size={160}
                trailing="%"
                sub="Score"
                color={passed ? "green" : "amber"}
              />
            </div>
          </section>

          {/* Recap agrupado por materia, con el enunciado de cada pregunta */}
          {grouped.length > 0 && (
            <div className="mt-7 grid gap-4 grid-cols-1 lg:grid-cols-2">
              {grouped.map((g) => {
                const groupCorrect = g.items.filter((i) => i.correct).length
                const allRight = groupCorrect === g.items.length
                return (
                  <div key={g.key} className="rounded-2xl surface p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="text-[15px] font-semibold tracking-[-0.01em]">{g.label}</div>
                      <span className={`chip flex-shrink-0 ${allRight ? "chip-green" : "chip-amber"}`}>
                        {groupCorrect} de {g.items.length}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {g.items.map((h) => (
                        <li key={h.position} className="flex items-start gap-2.5">
                          <span
                            className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center"
                            style={{
                              background: h.correct ? tileTint("green", 16) : tileTint("red", 16),
                              color: h.correct ? TILE_COLOR.green : TILE_COLOR.red,
                            }}
                          >
                            {h.correct ? (
                              <Check className="h-3 w-3" strokeWidth={3} />
                            ) : (
                              <X className="h-3 w-3" strokeWidth={3} />
                            )}
                          </span>
                          <span className="text-[13px] leading-snug text-foreground/85 line-clamp-2">
                            {h.question}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          )}

          {/* Repaso de las falladas */}
          {wrongList.length > 0 && (
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setReviewOpen((v) => !v)}
                aria-expanded={reviewOpen}
                className="inline-flex items-center gap-1.5 h-11 px-5 rounded-xl text-[15px] font-semibold border cursor-pointer transition-colors"
                style={{
                  borderColor: tileBorder("red", 32),
                  background: tileTint("red", 8),
                  color: TILE_COLOR.red,
                }}
              >
                <BookOpen className="h-4 w-4" />
                {reviewOpen
                  ? "Ocultar el repaso"
                  : `Repasar las ${wrongList.length} que fallaste`}
              </button>

              {reviewOpen && (
                <div className="mt-4 space-y-3 anim-fade-up">
                  {wrongList.map((h) => (
                    <div
                      key={h.position}
                      className="rounded-2xl border p-5"
                      style={{ borderColor: tileBorder("red", 26), background: tileTint("red", 5) }}
                    >
                      <div className="text-[12px] font-semibold text-muted-foreground">
                        Pregunta {h.position} · {subjectLabelOf(h)}
                      </div>
                      <p className="mt-1 text-[15px] font-semibold leading-snug">{h.question}</p>
                      <div className="mt-2.5 chip chip-green">
                        Respuesta correcta: {h.correctAnswer.toUpperCase()}
                      </div>
                      {h.explanation && (
                        <p className="mt-2.5 text-[13px] leading-relaxed text-foreground/85">
                          {h.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-xl text-[15px] font-semibold text-white border-0 cursor-pointer transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--av-blue-500)" }}
            >
              <RefreshCw className="h-4 w-4" /> Otra ronda
            </button>
            <Link
              to="/app/pca"
              className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-xl text-[15px] font-semibold surface hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Volver a {MODULE_LABEL[module] ?? "materias"}
            </Link>
          </div>
        </div>
      </AppLayout>
    )
  }

  // ──────────────────── Sesión sin la pregunta pedida ────────────────────
  if (!currentQuestion || !session) {
    return (
      <QuizNotice
        icon={AlertTriangle}
        color="amber"
        title="No pudimos mostrar esta pregunta"
        line="La sesión del quiz se cortó antes de tiempo. Vuelve a empezar y sigue practicando."
        onRetry={handleRestart}
      />
    )
  }

  const optionEntries = Object.entries(currentQuestion.options)

  return (
    <AppLayout>
      <div className="px-5 sm:px-7 py-7 pb-4 sm:pb-20 max-w-[920px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <Link
            to="/app/pca"
            className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {subjectMeta.name}
          </Link>
          <div className="tabular-nums text-[13px] font-semibold text-muted-foreground">
            Pregunta {position} de {session.questionCount}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 rounded-full bg-muted overflow-hidden mb-7">
          <div
            className="h-full transition-all duration-300 ease-out"
            style={{
              width: `${progressPct}%`,
              background: "var(--av-blue-500)",
            }}
          />
        </div>

        {/* Question card */}
        <ProtectedContent watermark={false}>
          <section className="rounded-2xl surface p-5 sm:p-7">
            <div
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold mb-3"
              style={{ color: "var(--av-blue-500)" }}
            >
              {subjectMeta.name}
            </div>
            <h1 className="text-[20px] sm:text-[24px] font-semibold tracking-[-0.02em] leading-tight">
              {currentQuestion.question}
            </h1>

            {/* Options */}
            <div className="mt-7 space-y-2.5">
              {optionEntries.map(([key, text]) => {
                const isSelected = selected === key
                const isCorrectAnswer = result?.correct_answer === key
                const isWrong = result && isSelected && !result.is_correct
                const isRight = result && isCorrectAnswer

                let stateStyle: React.CSSProperties = {}
                if (result) {
                  if (isRight) {
                    stateStyle = {
                      borderColor: TILE_COLOR.green,
                      background: `color-mix(in oklab, ${TILE_COLOR.green} 10%, var(--card))`,
                    }
                  } else if (isWrong) {
                    stateStyle = {
                      borderColor: TILE_COLOR.red,
                      background: `color-mix(in oklab, ${TILE_COLOR.red} 10%, var(--card))`,
                    }
                  }
                } else if (isSelected) {
                  stateStyle = {
                    borderColor: "var(--av-blue-500)",
                    background: "color-mix(in oklab, var(--av-blue-500) 8%, var(--card))",
                  }
                }

                return (
                  <button
                    key={key}
                    type="button"
                    disabled={!!result || submitting}
                    onClick={() => setSelected(key)}
                    className="w-full text-left rounded-2xl border p-4 flex items-start gap-3 transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:cursor-default"
                    style={{
                      borderColor: "var(--border)",
                      ...stateStyle,
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center tabular-nums text-[13px] font-semibold"
                      style={{
                        background: isSelected || isCorrectAnswer ? "var(--av-blue-500)" : "var(--muted)",
                        color: isSelected || isCorrectAnswer ? "white" : "var(--foreground)",
                      }}
                    >
                      {key.toUpperCase()}
                    </div>
                    <div className="flex-1 text-[15px] leading-relaxed text-foreground/90 pt-0.5">{text}</div>
                    {result && isRight && (
                      <Check
                        className="flex-shrink-0 h-5 w-5"
                        style={{ color: TILE_COLOR.green }}
                        strokeWidth={3}
                      />
                    )}
                    {result && isWrong && (
                      <X
                        className="flex-shrink-0 h-5 w-5"
                        style={{ color: TILE_COLOR.red }}
                        strokeWidth={3}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Feedback */}
            {result && (
              <div className="mt-6 space-y-3 anim-fade-up">
                <div
                  className="rounded-2xl border p-4"
                  style={{
                    borderColor: result.is_correct ? tileBorder("green", 30) : tileBorder("red", 30),
                    background: result.is_correct ? tileTint("green", 8) : tileTint("red", 8),
                  }}
                >
                  <div className={`chip ${result.is_correct ? "chip-green" : "chip-red"}`}>
                    {result.is_correct ? (
                      <>
                        <Check className="h-3 w-3" strokeWidth={3} /> Correcto
                      </>
                    ) : (
                      <>
                        <X className="h-3 w-3" strokeWidth={3} /> Incorrecto · Respuesta:{" "}
                        {result.correct_answer.toUpperCase()}
                      </>
                    )}
                  </div>
                  <p className="text-[15px] text-foreground/85 leading-relaxed mt-2">{result.explanation}</p>
                </div>

                {result.pedagogical_note && (
                  <div
                    className="rounded-2xl border p-4 flex items-start gap-3"
                    style={{
                      borderColor: tileBorder("amber", 35),
                      background: tileTint("amber", 10),
                    }}
                  >
                    <AlertTriangle
                      className="flex-shrink-0 h-4 w-4 mt-0.5"
                      style={{ color: TILE_COLOR.amber }}
                    />
                    <div>
                      <div className="text-[13px] font-semibold mb-1" style={{ color: TILE_COLOR.amber }}>
                        Nota para el examen
                      </div>
                      <p className="text-[13px] text-foreground/85 leading-relaxed">
                        {result.pedagogical_note}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </ProtectedContent>

        {/*
          CTA: en móvil queda fijo al pie (antes vivía bajo el fold y obligaba a
          dos scrolls por pregunta). El hueco de la derecha deja libre el FAB de
          Wingman, que flota en esa esquina.
        */}
        <div className="sticky bottom-0 z-30 -mx-5 mt-6 border-t border-border bg-background/95 px-5 py-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
          <div className="flex items-center gap-3 sm:justify-end">
            <div className="flex-shrink-0 tabular-nums text-[13px] font-semibold text-muted-foreground sm:hidden">
              {position}/{session.questionCount}
            </div>
            {!result ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!selected || submitting}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 h-12 sm:h-11 px-5 rounded-xl text-[15px] font-semibold text-white border-0 cursor-pointer transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                style={{ background: "var(--av-blue-500)" }}
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                Comprobar
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 h-12 sm:h-11 px-5 rounded-xl text-[15px] font-semibold text-white border-0 cursor-pointer transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--av-blue-500)" }}
              >
                {position >= session.questionCount ? "Ver resultado" : "Siguiente"}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Estados sin quiz: cada uno explica qué pasó y ofrece una salida
// ────────────────────────────────────────────────────────────────────────────

interface NoticeProps {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  color: TileColorKey
  title: string
  line: string
  onRetry?: () => void
}

function noticeFor(error: VaultError, noQuestionsTitle: string): NoticeProps {
  if (error.kind === "no_questions") {
    return {
      icon: BookOpen,
      color: "blue",
      title: noQuestionsTitle,
      line: "Esta materia todavía no tiene banco cargado. Elige otra para seguir practicando hoy.",
    }
  }
  if (error.kind === "rate_limit") {
    return {
      icon: Timer,
      color: "amber",
      title: "Llegaste al límite de 100 preguntas por hora",
      line: "Es un tope que protege el banco. Espera un rato y vuelve a intentar: tus respuestas ya quedaron registradas.",
    }
  }
  return {
    icon: AlertTriangle,
    color: "red",
    title: "No pudimos cargar el quiz",
    line: error.message || "Algo falló al pedir las preguntas. Intenta de nuevo en un momento.",
  }
}

function QuizNotice({ icon: Icon, color, title, line, onRetry }: NoticeProps) {
  return (
    <AppLayout>
      <div className="px-5 sm:px-7 py-10 pb-20 max-w-[560px] mx-auto">
        <div className="rounded-2xl surface p-7 text-center">
          <div
            className="mx-auto flex items-center justify-center w-12 h-12 rounded-xl"
            style={{
              background: tileTint(color),
              border: `1px solid ${tileBorder(color)}`,
              color: TILE_COLOR[color],
            }}
          >
            <Icon className="h-6 w-6" strokeWidth={1.8} />
          </div>
          <h1 className="mt-4 text-[20px] font-semibold tracking-[-0.02em]">{title}</h1>
          <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">{line}</p>
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-center gap-2">
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-xl text-[15px] font-semibold text-white border-0 cursor-pointer transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--av-blue-500)" }}
              >
                <RefreshCw className="h-4 w-4" /> Reintentar
              </button>
            )}
            <Link
              to="/app/pca"
              className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-xl text-[15px] font-semibold surface hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Volver a materias
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
