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
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { ProtectedContent } from "@/components/ProtectedContent"
import { KpiRing } from "@/components/ui/kpi-ring"
import { useVaultQuiz, type AnswerResult } from "@/hooks/useVaultQuiz"
import { SUBJECT_META } from "@/lib/vaultSubjects"

const MODULE_LABEL: Record<string, string> = {
  pca: "Examen PCA Aerocivil",
  airline_prep: "Ingreso a Aerolínea",
  icao: "Inglés ICAO",
  psych: "Psicotécnicas",
  interview_sim: "Simulador entrevistas",
  library: "Biblioteca",
}

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
 *  6. Última → resumen con score
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

  const { session, loading, startQuiz, submitAnswer, resetSession } = useVaultQuiz()

  const [position, setPosition] = useState(1)
  const [selected, setSelected] = useState<string | null>(null)
  const [result, setResult] = useState<AnswerResult | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [history, setHistory] = useState<Array<{ position: number; correct: boolean; subject_slug: string }>>([])
  const [completed, setCompleted] = useState(false)

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
    ? { name: "Simulacro Examen PCA", color: "cyan" as const }
    : SUBJECT_META[subjectSlug] ?? { name: subjectSlug, color: "cyan" as const }
  const total = session?.questionCount ?? 0
  const correctCount = history.filter((h) => h.correct).length
  const progressPct = total > 0 ? Math.round((Math.min(position - 1 + (result ? 1 : 0), total) / total) * 100) : 0

  async function handleSubmit() {
    if (!selected || !currentQuestion || submitting) return
    setSubmitting(true)
    const res = await submitAnswer(position, selected)
    setSubmitting(false)
    if (res) {
      setResult(res)
      setHistory((h) => [...h, { position, correct: res.is_correct, subject_slug: subjectSlug }])
    }
  }

  function handleNext() {
    if (!session) return
    if (position >= session.questionCount) {
      setCompleted(true)
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
    startQuiz({ subjectSlug: isExam ? undefined : subjectSlug, module, count: Math.min(Math.max(count, 1), 20) })
  }

  // ──────────────────── Loading ────────────────────
  if (loading || (!session && !completed)) {
    return (
      <AppLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="h-7 w-7 animate-spin" />
          <p className="text-sm">Preparando tu quiz…</p>
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
        <div className="px-7 py-7 pb-20 max-w-[920px] mx-auto">
          <section
            className="cockpit anim-fade-up relative overflow-hidden rounded-3xl border p-9"
            style={{
              borderColor: "oklch(0.32 0.04 250 / 0.6)",
              boxShadow: "var(--shadow-navy), inset 0 1px 0 rgb(255 255 255 / 7%)",
            }}
          >
            <div className="cockpit-grid absolute inset-0 opacity-60" />
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(at 80% 0%, oklch(0.78 0.16 215 / 25%) 0%, transparent 50%)" }}
            />
            <div className="relative grid items-center gap-8" style={{ gridTemplateColumns: "1fr auto" }}>
              <div>
                <div
                  className="mono inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
                  style={{
                    color: "var(--av-cyan-300)",
                    background: "oklch(0.78 0.16 215 / 12%)",
                    border: "1px solid oklch(0.78 0.16 215 / 30%)",
                  }}
                >
                  <Trophy className="h-3 w-3" /> RESULTADO · {subjectMeta.name.toUpperCase()}
                </div>
                <h1 className="mt-4 mb-1.5 text-[42px] font-extrabold tracking-[-0.04em] text-white leading-[1.05]">
                  {passed ? "¡Aprobaste!" : "Casi llegas"}
                </h1>
                <p className="text-[16px] text-white/75 max-w-[520px] mt-2">
                  {correctCount} de {session.questionCount} correctas ·{" "}
                  {passed
                    ? "Sobre 70% — listo para presentar a este ritmo."
                    : "Bajo 70% — repasá la teoría y volvé a intentar."}
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

          {/* Question-by-question recap */}
          <div className="mt-8 grid gap-2 sm:grid-cols-2 md:grid-cols-5">
            {history.map((h) => (
              <div
                key={h.position}
                className={`rounded-xl border p-3 flex items-center gap-2 ${
                  h.correct ? "border-green-500/40" : "border-red-500/40"
                }`}
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center text-white"
                  style={{
                    background: h.correct ? "var(--av-green-400)" : "var(--av-red-400)",
                  }}
                >
                  {h.correct ? <Check className="h-4 w-4" strokeWidth={3} /> : <X className="h-4 w-4" strokeWidth={3} />}
                </div>
                <div className="text-[13px] font-semibold">Q{h.position}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleRestart}
              className="av-shine inline-flex items-center gap-1.5 h-11 px-5 rounded-lg text-sm font-semibold text-white border-0 cursor-pointer"
              style={{
                background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
                boxShadow:
                  "0 1px 0 rgb(255 255 255 / 18%) inset, 0 10px 24px -8px oklch(0.55 0.22 264 / 45%)",
              }}
            >
              <RefreshCw className="h-4 w-4" /> Otra ronda
            </button>
            <Link
              to="/app/pca"
              className="inline-flex items-center gap-1.5 h-11 px-5 rounded-lg text-sm font-semibold border border-border bg-card hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Volver a {MODULE_LABEL[module]}
            </Link>
          </div>
        </div>
      </AppLayout>
    )
  }

  // ──────────────────── Question view ────────────────────
  if (!currentQuestion || !session) return null

  const optionEntries = Object.entries(currentQuestion.options)

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[920px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <Link
            to="/app/pca"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {subjectMeta.name}
          </Link>
          <div className="mono text-[11px] font-bold tracking-[0.16em] uppercase text-muted-foreground">
            Pregunta {position} de {session.questionCount}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 rounded-full bg-muted overflow-hidden mb-7">
          <div
            className="h-full transition-all duration-300 ease-out"
            style={{
              width: `${progressPct}%`,
              background: "linear-gradient(90deg, var(--av-cyan-400), var(--av-blue-500))",
            }}
          />
        </div>

        {/* Question card */}
        <ProtectedContent watermark={false}>
          <section
            className="card rounded-2xl border p-7"
            style={{ borderColor: "color-mix(in oklab, var(--border) 70%, transparent)" }}
          >
            <div
              className="mono inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.16em] uppercase mb-3"
              style={{ color: "var(--av-cyan-400)" }}
            >
              {subjectMeta.name}
            </div>
            <h1 className="text-[22px] md:text-[24px] font-bold tracking-[-0.02em] leading-tight">
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
                      borderColor: "var(--av-green-400)",
                      background: "color-mix(in oklab, var(--av-green-400) 10%, var(--card))",
                    }
                  } else if (isWrong) {
                    stateStyle = {
                      borderColor: "var(--av-red-400)",
                      background: "color-mix(in oklab, var(--av-red-400) 10%, var(--card))",
                    }
                  }
                } else if (isSelected) {
                  stateStyle = {
                    borderColor: "var(--av-cyan-400)",
                    background: "color-mix(in oklab, var(--av-cyan-400) 8%, var(--card))",
                  }
                }

                return (
                  <button
                    key={key}
                    type="button"
                    disabled={!!result || submitting}
                    onClick={() => setSelected(key)}
                    className="w-full text-left rounded-xl border p-4 flex items-start gap-3 transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:cursor-default"
                    style={{
                      borderColor: "var(--border)",
                      ...stateStyle,
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center mono text-[12px] font-extrabold"
                      style={{
                        background: isSelected || isCorrectAnswer ? "var(--av-cyan-400)" : "var(--muted)",
                        color: isSelected || isCorrectAnswer ? "white" : "var(--foreground)",
                      }}
                    >
                      {key.toUpperCase()}
                    </div>
                    <div className="flex-1 text-[14.5px] leading-relaxed text-foreground/90 pt-0.5">{text}</div>
                    {result && isRight && (
                      <Check className="flex-shrink-0 h-5 w-5" style={{ color: "var(--av-green-400)" }} strokeWidth={3} />
                    )}
                    {result && isWrong && (
                      <X className="flex-shrink-0 h-5 w-5" style={{ color: "var(--av-red-400)" }} strokeWidth={3} />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Feedback */}
            {result && (
              <div className="mt-6 space-y-3 anim-fade-up">
                <div
                  className="rounded-xl border p-4"
                  style={{
                    borderColor: result.is_correct ? "oklch(0.76 0.16 145 / 30%)" : "oklch(0.65 0.22 25 / 30%)",
                    background: result.is_correct
                      ? "color-mix(in oklab, var(--av-green-400) 8%, transparent)"
                      : "color-mix(in oklab, var(--av-red-400) 8%, transparent)",
                  }}
                >
                  <div
                    className="mono inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] uppercase mb-1.5"
                    style={{ color: result.is_correct ? "var(--av-green-400)" : "var(--av-red-400)" }}
                  >
                    {result.is_correct ? (
                      <>
                        <Check className="h-3.5 w-3.5" strokeWidth={3} /> Correcto
                      </>
                    ) : (
                      <>
                        <X className="h-3.5 w-3.5" strokeWidth={3} /> Incorrecto · Respuesta: {result.correct_answer.toUpperCase()}
                      </>
                    )}
                  </div>
                  <p className="text-[13.5px] text-foreground/85 leading-relaxed mt-1">{result.explanation}</p>
                </div>

                {result.pedagogical_note && (
                  <div
                    className="rounded-xl border p-4 flex items-start gap-3"
                    style={{
                      borderColor: "oklch(0.78 0.18 80 / 35%)",
                      background: "color-mix(in oklab, var(--av-amber-400) 10%, transparent)",
                    }}
                  >
                    <AlertTriangle
                      className="flex-shrink-0 h-4 w-4 mt-0.5"
                      style={{ color: "var(--av-amber-400)" }}
                    />
                    <div>
                      <div
                        className="mono text-[10px] font-bold tracking-[0.14em] uppercase mb-1"
                        style={{ color: "var(--av-amber-400)" }}
                      >
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

        {/* CTA */}
        <div className="mt-6 flex items-center justify-end gap-2">
          {!result ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selected || submitting}
              className="av-shine inline-flex items-center gap-1.5 h-11 px-5 rounded-lg text-sm font-semibold text-white border-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
                boxShadow:
                  "0 1px 0 rgb(255 255 255 / 18%) inset, 0 10px 24px -8px oklch(0.55 0.22 264 / 45%)",
              }}
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Comprobar
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="av-shine inline-flex items-center gap-1.5 h-11 px-5 rounded-lg text-sm font-semibold text-white border-0 cursor-pointer"
              style={{
                background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
                boxShadow:
                  "0 1px 0 rgb(255 255 255 / 18%) inset, 0 10px 24px -8px oklch(0.55 0.22 264 / 45%)",
              }}
            >
              {position >= session.questionCount ? "Ver resultado" : "Siguiente"}
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
