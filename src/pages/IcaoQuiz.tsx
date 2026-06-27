import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Loader2,
  RotateCcw,
  ClipboardCheck,
  Sparkles,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"

/**
 * Quiz simple para el módulo Inglés. NO usa vault (las preguntas no son del
 * banco oficial competitivo del PCA — son material pedagógico estándar del
 * libro de Cami).
 *
 * Flujo: traer N preguntas random (client-side shuffle), una a la vez,
 * marcar correcta/incorrecta + explicación, al final mostrar score.
 * Guardamos cada intento en `user_icao_quiz_attempts` (RLS por user_id).
 */

interface QuizQuestion {
  id: number
  topic: string
  prompt: string
  context: string | null
  options: Record<string, string>
  correct_answer: string
  explanation: string | null
}

const TOPICS: { value: string; label: string }[] = [
  { value: "all",           label: "All topics" },
  { value: "vocabulary",    label: "Vocabulary" },
  { value: "comprehension", label: "Comprehension" },
  { value: "phraseology",   label: "Phraseology" },
  { value: "weather",       label: "Weather" },
  { value: "medical",       label: "Medical" },
  { value: "security",      label: "Security" },
  { value: "emergencies",   label: "Emergencies" },
  { value: "technical",     label: "Technical" },
]

const QUIZ_SIZE = 10

export function IcaoQuiz() {
  const { user } = useSession()
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [loading, setLoading] = useState(false)
  const [topic, setTopic] = useState<string>("all")
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [history, setHistory] = useState<{ qId: number; correct: boolean }[]>([])

  const current = questions[index]
  const isLast = index === questions.length - 1

  async function startQuiz() {
    setLoading(true)
    setStarted(false)
    setIndex(0)
    setSelected(null)
    setRevealed(false)
    setScore(0)
    setHistory([])

    let q = supabase
      .from("icao_quiz_questions")
      .select("id,topic,prompt,context,options,correct_answer,explanation")
      .eq("is_active", true)
    if (topic !== "all") q = q.eq("topic", topic)

    const { data, error } = await q.limit(60)
    setLoading(false)
    if (error || !data || data.length === 0) {
      console.error("icao_quiz_questions", error)
      return
    }
    // shuffle + slice
    const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, QUIZ_SIZE)
    setQuestions(shuffled as unknown as QuizQuestion[])
    setStarted(true)
  }

  async function chooseAnswer(letter: string) {
    if (revealed || !current) return
    setSelected(letter)
    setRevealed(true)
    const correct = letter === current.correct_answer
    if (correct) setScore((s) => s + 1)
    setHistory((h) => [...h, { qId: current.id, correct }])

    // Save attempt (fire-and-forget; RLS impone user_id)
    if (user) {
      void supabase.from("user_icao_quiz_attempts").insert({
        user_id: user.id,
        question_id: current.id,
        answer: letter,
        is_correct: correct,
      })
    }
  }

  function next() {
    setSelected(null)
    setRevealed(false)
    setIndex((i) => Math.min(i + 1, questions.length - 1))
  }

  const finished = revealed && isLast

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[860px] mx-auto">
        <Link
          to="/app/icao"
          className="inline-flex items-center gap-1.5 text-[13.5px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to ICAO English
        </Link>

        {/* === Pre-start screen === */}
        {!started && (
          <StartScreen
            topic={topic}
            onTopicChange={setTopic}
            onStart={startQuiz}
            loading={loading}
          />
        )}

        {/* === Quiz in progress === */}
        {started && current && !finished && (
          <QuizCard
            question={current}
            index={index}
            total={questions.length}
            selected={selected}
            revealed={revealed}
            onChoose={chooseAnswer}
            onNext={next}
            isLast={isLast}
          />
        )}

        {/* === Finished === */}
        {started && finished && (
          <FinishedScreen
            score={score}
            total={questions.length}
            history={history}
            onRestart={() => startQuiz()}
          />
        )}
      </div>
    </AppLayout>
  )
}

// ────────────────────────────────────────────────────────────────────────────
function StartScreen({ topic, onTopicChange, onStart, loading }: { topic: string; onTopicChange: (t: string) => void; onStart: () => void; loading: boolean }) {
  return (
    <>
      <div
        className="mono inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.18em] px-2 py-1 rounded-full"
        style={{
          color: "var(--av-cyan-300)",
          background: "oklch(0.78 0.16 215 / 12%)",
          border: "1px solid oklch(0.78 0.16 215 / 30%)",
        }}
      >
        <ClipboardCheck className="h-3 w-3" /> ENGLISH QUIZ · STUDY BANK
      </div>
      <h1 className="mt-3 text-[34px] font-extrabold tracking-[-0.03em] leading-[1.05]">
        Vocabulary and comprehension questions
      </h1>
      <p className="mt-2 text-[15px] text-muted-foreground max-w-[640px]">
        {QUIZ_SIZE} random questions. Each one has an explanation at the end — read them, that's
        where the learning happens. It's not an exam, it's training.
      </p>

      <div className="mt-7 grid gap-4">
        <div>
          <label className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-foreground mono">
            Topic
          </label>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {TOPICS.map((t) => {
              const active = topic === t.value
              return (
                <button
                  key={t.value}
                  onClick={() => onTopicChange(t.value)}
                  className="mono px-3 h-8 rounded-full text-[12.5px] font-bold uppercase tracking-[0.08em] border transition-colors"
                  style={{
                    borderColor: active
                      ? "color-mix(in oklab, var(--av-cyan-400) 45%, transparent)"
                      : "color-mix(in oklab, var(--border) 60%, transparent)",
                    background: active ? "color-mix(in oklab, var(--av-cyan-400) 16%, transparent)" : "transparent",
                    color: active ? "var(--av-cyan-300)" : "var(--muted-foreground)",
                  }}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>

        <button
          onClick={onStart}
          disabled={loading}
          className="av-shine inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg text-[15px] font-semibold text-white border-0 disabled:opacity-50"
          style={{
            background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
            boxShadow: "0 1px 0 rgb(255 255 255 / 18%) inset, 0 10px 24px -8px oklch(0.55 0.22 264 / 45%)",
          }}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          Start quiz · {QUIZ_SIZE} questions
        </button>
      </div>
    </>
  )
}

// ────────────────────────────────────────────────────────────────────────────
function QuizCard({ question, index, total, selected, revealed, onChoose, onNext, isLast }: { question: QuizQuestion; index: number; total: number; selected: string | null; revealed: boolean; onChoose: (l: string) => void; onNext: () => void; isLast: boolean }) {
  const optionKeys = useMemo(() => Object.keys(question.options).sort(), [question.options])

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="mono text-[12.5px] uppercase tracking-[0.12em] text-muted-foreground">
          Question {index + 1} <span className="opacity-50">/ {total}</span> · {question.topic}
        </div>
        <div className="flex-1 mx-4 h-1 rounded-full bg-border/50 overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${((index + (revealed ? 1 : 0)) / total) * 100}%`,
              background: "var(--av-cyan-400)",
            }}
          />
        </div>
      </div>

      <div
        className="rounded-2xl border p-6"
        style={{ borderColor: "color-mix(in oklab, var(--border) 70%, transparent)" }}
      >
        {question.context && (
          <div className="text-[13.5px] italic text-muted-foreground mb-3 border-l-2 pl-3 border-[var(--av-cyan-400)]/40">
            {question.context}
          </div>
        )}
        <div className="text-[18px] font-bold leading-snug tracking-[-0.01em]">
          {question.prompt}
        </div>

        <div className="mt-5 grid gap-2">
          {optionKeys.map((k) => {
            const isCorrect = revealed && k === question.correct_answer
            const isWrongChosen = revealed && selected === k && k !== question.correct_answer
            const baseBorder = "color-mix(in oklab, var(--border) 75%, transparent)"
            const borderColor = isCorrect
              ? "color-mix(in oklab, var(--av-green-400) 65%, transparent)"
              : isWrongChosen
              ? "color-mix(in oklab, var(--av-red-400) 65%, transparent)"
              : selected === k
              ? "color-mix(in oklab, var(--av-cyan-400) 50%, transparent)"
              : baseBorder
            const bg = isCorrect
              ? "color-mix(in oklab, var(--av-green-400) 10%, transparent)"
              : isWrongChosen
              ? "color-mix(in oklab, var(--av-red-400) 10%, transparent)"
              : selected === k
              ? "color-mix(in oklab, var(--av-cyan-400) 8%, transparent)"
              : "transparent"
            return (
              <button
                key={k}
                onClick={() => onChoose(k)}
                disabled={revealed}
                className="text-left flex items-start gap-3 p-3.5 rounded-xl border transition-colors disabled:cursor-default"
                style={{ borderColor, background: bg }}
              >
                <span
                  className="mono flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-[13.5px] font-bold uppercase border"
                  style={{ borderColor, color: isCorrect ? "var(--av-green-400)" : isWrongChosen ? "var(--av-red-400)" : "var(--muted-foreground)" }}
                >
                  {k}
                </span>
                <span className="flex-1 text-[15px] leading-relaxed">{question.options[k]}</span>
                {isCorrect && <CheckCircle2 className="flex-shrink-0 h-4.5 w-4.5 mt-1" style={{ color: "var(--av-green-400)" }} />}
                {isWrongChosen && <XCircle className="flex-shrink-0 h-4.5 w-4.5 mt-1" style={{ color: "var(--av-red-400)" }} />}
              </button>
            )
          })}
        </div>

        {revealed && question.explanation && (
          <div
            className="mt-5 rounded-xl border p-4 text-[14px] leading-relaxed"
            style={{
              borderColor: "color-mix(in oklab, var(--av-cyan-400) 30%, transparent)",
              background: "color-mix(in oklab, var(--av-cyan-400) 8%, transparent)",
            }}
          >
            <div className="mono text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--av-cyan-300)] mb-1.5">
              EXPLANATION
            </div>
            {question.explanation}
          </div>
        )}

        {revealed && (
          <div className="mt-5 flex justify-end">
            <button
              onClick={onNext}
              className="av-shine inline-flex items-center gap-2 h-11 px-5 rounded-lg text-[14.5px] font-semibold text-white border-0"
              style={{
                background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
                boxShadow: "0 1px 0 rgb(255 255 255 / 18%) inset, 0 10px 24px -8px oklch(0.55 0.22 264 / 45%)",
              }}
            >
              {isLast ? "See results" : "Next"} <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </>
  )
}

// ────────────────────────────────────────────────────────────────────────────
function FinishedScreen({ score, total, history, onRestart }: { score: number; total: number; history: { qId: number; correct: boolean }[]; onRestart: () => void }) {
  const pct = Math.round((score / total) * 100)
  const verdict =
    pct >= 80 ? { label: "Great job", color: "var(--av-green-400)" } :
    pct >= 60 ? { label: "Passed, keep practising", color: "var(--av-cyan-400)" } :
                { label: "Needs review", color: "var(--av-amber-400)" }

  return (
    <div className="text-center pt-6">
      <div className="mono text-[12px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        RESULTS
      </div>
      <div
        className="mt-3 text-[72px] font-extrabold tracking-[-0.04em] leading-none"
        style={{ color: verdict.color }}
      >
        {score} / {total}
      </div>
      <div className="mt-1 mono text-[13.5px] uppercase tracking-[0.16em]" style={{ color: verdict.color }}>
        {pct}% · {verdict.label}
      </div>

      <div className="mt-7 flex justify-center gap-1.5 flex-wrap max-w-[480px] mx-auto">
        {history.map((h, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-md flex items-center justify-center text-[12.5px] font-bold mono"
            style={{
              background: h.correct
                ? "color-mix(in oklab, var(--av-green-400) 18%, transparent)"
                : "color-mix(in oklab, var(--av-red-400) 18%, transparent)",
              color: h.correct ? "var(--av-green-400)" : "var(--av-red-400)",
            }}
          >
            {h.correct ? "✓" : "✗"}
          </div>
        ))}
      </div>

      <div className="mt-9 flex items-center justify-center gap-2">
        <button
          onClick={onRestart}
          className="av-shine inline-flex items-center gap-2 h-11 px-5 rounded-lg text-[14.5px] font-semibold text-white border-0"
          style={{
            background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
            boxShadow: "0 1px 0 rgb(255 255 255 / 18%) inset, 0 10px 24px -8px oklch(0.55 0.22 264 / 45%)",
          }}
        >
          <RotateCcw className="h-4 w-4" /> New round
        </button>
        <Link
          to="/app/icao/vocabulario"
          className="inline-flex items-center gap-1.5 h-11 px-5 rounded-lg text-[14.5px] font-semibold border border-border bg-card hover:bg-muted transition-colors"
        >
          Go to glossary
        </Link>
      </div>
    </div>
  )
}
