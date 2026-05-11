import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, RotateCcw, Trophy, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { useWingman } from "@/hooks/useWingman"
import { AppLayout } from "@/components/layout/AppLayout"
import { WingmanPanel } from "@/components/wingman/WingmanPanel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AnswerOption {
  id: number
  text: string
  is_correct: boolean
  order_index: number
}

interface Question {
  id: number
  statement: string
  explanation: string | null
  answer_options: AnswerOption[]
}

interface Subject {
  id: number
  name: string
  slug: string
}

const QUESTION_COUNT = 10

export function QuizPlayer() {
  const { slug } = useParams<{ slug: string }>()
  const { user } = useSession()
  const navigate = useNavigate()

  const [subject, setSubject] = useState<Subject | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [attemptId, setAttemptId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState<{ questionId: number; optionId: number; correct: boolean }[]>([])
  const [finished, setFinished] = useState(false)

  // Wingman AI tutor
  const wingman = useWingman()

  useEffect(() => {
    if (!slug || !user) return
    let cancelled = false

    async function load() {
      try {
        // Load subject
        const subRes = await supabase
          .from("subjects")
          .select("id, name, slug")
          .eq("slug", slug!)
          .single()
        if (subRes.error || !subRes.data) throw new Error("Materia no encontrada")
        if (cancelled) return
        setSubject(subRes.data as Subject)

        // Load all questions for that subject with answer_options
        const qRes = await supabase
          .from("questions")
          .select("id, statement, explanation, answer_options(id, text, is_correct, order_index)")
          .eq("subject_id", (subRes.data as Subject).id)
        if (qRes.error) throw qRes.error

        const all = (qRes.data ?? []) as Question[]
        if (all.length === 0) {
          toast.info("Esta materia todavía no tiene preguntas cargadas.")
          navigate("/app/quiz", { replace: true })
          return
        }
        // Pick up to 10 random
        const shuffled = [...all].sort(() => Math.random() - 0.5)
        const picked = shuffled.slice(0, Math.min(QUESTION_COUNT, shuffled.length))
        // Sort options within each question
        picked.forEach((q) => {
          q.answer_options.sort((a, b) => a.order_index - b.order_index)
        })
        setQuestions(picked)

        // Create quiz_attempt
        const attemptRes = await supabase
          .from("quiz_attempts")
          .insert({
            user_id: user!.id,
            subject_id: (subRes.data as Subject).id,
            total_questions: picked.length,
            mode: "practice",
          })
          .select("id")
          .single()
        if (attemptRes.error || !attemptRes.data) throw attemptRes.error
        if (cancelled) return
        setAttemptId(attemptRes.data.id as number)
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "No pudimos iniciar el quiz")
        navigate("/app/quiz", { replace: true })
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [slug, user, navigate])

  if (loading) {
    return (
      <AppLayout>
        <div className="p-8 max-w-3xl mx-auto space-y-6 animate-pulse">
          <div className="h-6 w-48 bg-muted rounded" />
          <div className="h-48 bg-muted rounded-2xl" />
          <div className="space-y-3">
            <div className="h-14 bg-muted rounded-xl" />
            <div className="h-14 bg-muted rounded-xl" />
            <div className="h-14 bg-muted rounded-xl" />
            <div className="h-14 bg-muted rounded-xl" />
          </div>
        </div>
      </AppLayout>
    )
  }

  if (finished) return <QuizResults answered={answered} subject={subject} />

  const current = questions[currentIdx]
  const correctOption = current?.answer_options.find((o) => o.is_correct)
  const hasAnswered = selected !== null
  const isCorrect = hasAnswered && selected === correctOption?.id
  const isLast = currentIdx === questions.length - 1

  async function handleSubmitAnswer() {
    if (!current || selected === null || !attemptId) return
    const correct = selected === correctOption?.id
    setAnswered((prev) => [...prev, { questionId: current.id, optionId: selected, correct }])

    // Persist this answer
    try {
      await supabase.from("quiz_attempt_answers").insert({
        attempt_id: attemptId,
        question_id: current.id,
        selected_option_id: selected,
        is_correct: correct,
      })
    } catch {
      // silent: surface only if persisting all results fails later
    }
  }

  async function handleNext() {
    if (isLast) {
      // Finalize attempt + bump streak
      if (attemptId) {
        const total = questions.length
        const correctCount = answered.filter((a) => a.correct).length
        const score = (correctCount / total) * 100
        await supabase
          .from("quiz_attempts")
          .update({
            finished_at: new Date().toISOString(),
            correct_answers: correctCount,
            score,
          })
          .eq("id", attemptId)
        try {
          await supabase.rpc("increment_streak")
        } catch {
          /* silent — streak is non-critical */
        }
      }
      setFinished(true)
      return
    }
    setCurrentIdx((i) => i + 1)
    setSelected(null)
  }

  const progress = ((currentIdx + (hasAnswered ? 1 : 0)) / questions.length) * 100

  return (
    <AppLayout>
      <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/app/quiz" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Salir
          </Link>
          <Badge variant="secondary" className="rounded-full">
            {subject?.name} · {currentIdx + 1} / {questions.length}
          </Badge>
        </div>

        <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-8">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-semibold leading-snug">{current.statement}</h2>

          <div className="mt-6 space-y-3">
            {current.answer_options.map((opt) => {
              const isSelected = selected === opt.id
              const showCorrect = hasAnswered && opt.is_correct
              const showIncorrect = hasAnswered && isSelected && !opt.is_correct
              const baseClass = "w-full text-left rounded-xl border p-4 transition-all"
              let stateClass = "border-border/60 hover:border-blue-500/40 hover:bg-blue-50/40 dark:hover:bg-blue-950/20"
              if (showCorrect) {
                stateClass = "border-green-500/50 bg-green-50 dark:bg-green-950/30"
              } else if (showIncorrect) {
                stateClass = "border-red-500/50 bg-red-50 dark:bg-red-950/30"
              } else if (isSelected) {
                stateClass = "border-blue-500 bg-blue-50/60 dark:bg-blue-950/30"
              } else if (hasAnswered) {
                stateClass = "border-border/40 opacity-60"
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={hasAnswered}
                  onClick={() => setSelected(opt.id)}
                  className={`${baseClass} ${stateClass}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm">{opt.text}</span>
                    {showCorrect && <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />}
                    {showIncorrect && <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />}
                  </div>
                </button>
              )
            })}
          </div>

          {hasAnswered && (current.explanation || true) && (
            <div className={`mt-5 rounded-xl border p-4 ${isCorrect ? "border-green-500/30 bg-green-50/50 dark:bg-green-950/20" : "border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20"}`}>
              <div className="flex items-center gap-2 text-xs font-semibold mb-1">
                {isCorrect ? (
                  <span className="text-green-700 dark:text-green-300">✓ ¡Correcto!</span>
                ) : (
                  <span className="text-blue-700 dark:text-blue-300">💡 Por qué</span>
                )}
              </div>
              {current.explanation && (
                <p className="text-sm text-muted-foreground leading-relaxed">{current.explanation}</p>
              )}
              <button
                type="button"
                onClick={() =>
                  wingman.openWith({
                    kind: "quiz_explain",
                    question_id: current.id,
                    attempt_id: attemptId ?? undefined,
                  })
                }
                className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-blue-700 dark:text-blue-300 hover:underline"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Preguntale a Wingman
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          {!hasAnswered ? (
            <Button
              size="lg"
              disabled={selected === null}
              onClick={handleSubmitAnswer}
              className="btn-apple shine-on-hover rounded-full h-12 px-8 border-0 disabled:opacity-50"
            >
              Confirmar
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={handleNext}
              className="btn-apple shine-on-hover rounded-full h-12 px-8 border-0"
            >
              {isLast ? "Ver resultados" : "Siguiente"}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <WingmanPanel
        state={wingman.state}
        usage={wingman.usage}
        isPro={wingman.isPro}
        freeLimit={wingman.freeLimit}
        onClose={wingman.close}
        onSend={wingman.send}
        onFeedback={wingman.giveFeedback}
      />
    </AppLayout>
  )
}

function QuizResults({
  answered,
  subject,
}: {
  answered: { questionId: number; optionId: number; correct: boolean }[]
  subject: Subject | null
}) {
  const correctCount = answered.filter((a) => a.correct).length
  const total = answered.length
  const score = total === 0 ? 0 : Math.round((correctCount / total) * 100)
  const passed = score >= 70

  return (
    <AppLayout>
      <div className="px-4 sm:px-6 lg:px-10 py-12 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-2xl shadow-blue-500/40 mb-6">
          {passed ? <Trophy className="h-10 w-10" /> : <Sparkles className="h-10 w-10" />}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          {passed ? "¡Aprobaste!" : "Casi llegás"}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {subject?.name} · {correctCount} de {total} correctas
        </p>

        <div className="mt-10 rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-50 via-blue-50/40 to-transparent dark:from-blue-950/40 p-8">
          <div className="text-6xl sm:text-7xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
            {score}%
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {passed
              ? "Tu progreso quedó registrado. Mantené la racha."
              : "Necesitás 70% para aprobar. Repasá la teoría y volvé a intentar."}
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="btn-apple shine-on-hover rounded-full h-12 px-8 border-0">
            <Link to={`/app/quiz/${subject?.slug}`}>
              <RotateCcw className="mr-1 h-4 w-4" />
              Reintentar
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-8">
            <Link to="/app/quiz">Otras materias</Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="rounded-full h-12 px-8">
            <Link to="/app">Volver al dashboard</Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
