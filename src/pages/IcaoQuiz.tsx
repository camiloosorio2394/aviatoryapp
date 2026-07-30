import { useCallback, useEffect, useMemo, useState } from "react"
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
  BookOpen,
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
  /** null = todavía no sabemos cuántas preguntas hay por tema */
  const [counts, setCounts] = useState<Record<string, number> | null>(null)
  const [countsFailed, setCountsFailed] = useState(false)
  const [failed, setFailed] = useState(false)

  const current = questions[index]
  const isLast = index === questions.length - 1

  // Conteo real por tema: sin esto el botón de empezar prometía 10 preguntas
  // incluso en temas vacíos y no hacía nada al pulsarlo.
  const loadCounts = useCallback(async () => {
    setCountsFailed(false)
    setCounts(null)
    const { data, error } = await supabase
      .from("icao_quiz_questions")
      .select("topic")
      .eq("is_active", true)
      .limit(2000)
    if (error || !data) {
      console.error("icao_quiz_questions counts", error)
      setCounts({})
      setCountsFailed(true)
      return
    }
    const map: Record<string, number> = { all: data.length }
    for (const row of data) {
      map[row.topic] = (map[row.topic] ?? 0) + 1
    }
    setCounts(map)
  }, [])

  useEffect(() => { void loadCounts() }, [loadCounts])

  async function startQuiz() {
    setLoading(true)
    setFailed(false)
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
      setFailed(true)
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
      <div className="px-7 py-9 sm:py-11 pb-24 max-w-[860px] mx-auto">
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
            counts={counts}
            failed={failed}
            countsFailed={countsFailed}
            onRetryCounts={loadCounts}
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
function StartScreen({ topic, onTopicChange, onStart, loading, counts, failed, countsFailed, onRetryCounts }: { topic: string; onTopicChange: (t: string) => void; onStart: () => void; loading: boolean; counts: Record<string, number> | null; failed: boolean; countsFailed: boolean; onRetryCounts: () => void }) {
  const total = counts ? (counts.all ?? 0) : null
  const available = counts ? (counts[topic] ?? 0) : null
  // El botón nunca promete más preguntas de las que existen.
  const askCount = available == null ? QUIZ_SIZE : Math.min(QUIZ_SIZE, available)

  return (
    <>
      <div
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
        style={{ color: "var(--av-blue-500)" }}
      >
        <ClipboardCheck className="h-3.5 w-3.5" /> English quiz · Study bank
      </div>
      <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.05]">
        Vocabulary and comprehension questions
      </h1>
      <p className="mt-2 text-[15px] text-muted-foreground max-w-[640px]">
        Random questions with an explanation after each one. Read them, that's where the learning
        happens. It's not an exam, it's training.
      </p>

      <div className="mt-7 grid gap-4">
        <div>
          <div className="text-[13px] font-semibold text-muted-foreground">Topic</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {TOPICS.map((t) => {
              const active = topic === t.value
              const n = counts ? (counts[t.value] ?? 0) : null
              const empty = n === 0
              return (
                <button
                  key={t.value}
                  onClick={() => onTopicChange(t.value)}
                  disabled={empty}
                  title={empty ? "No questions in this topic yet" : undefined}
                  className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-[13px] font-semibold border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    borderColor: active
                      ? "color-mix(in oklab, var(--av-blue-500) 45%, transparent)"
                      : "color-mix(in oklab, var(--border) 60%, transparent)",
                    background: active ? "color-mix(in oklab, var(--av-blue-500) 16%, transparent)" : "transparent",
                    color: active ? "var(--av-blue-500)" : "var(--muted-foreground)",
                  }}
                >
                  <span>{t.label}</span>
                  {n != null && <span className="opacity-70 tabular-nums">{n}</span>}
                </button>
              )
            })}
          </div>
        </div>

        {available === 0 ? (
          countsFailed ? (
            <BankLoadError onRetry={onRetryCounts} />
          ) : (
            <EmptyBank
              allEmpty={total === 0}
              onAllTopics={() => onTopicChange("all")}
            />
          )
        ) : (
          <div>
            <button
              onClick={onStart}
              disabled={loading || counts == null}
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full text-[15px] font-semibold text-white border-0 surface-lift disabled:opacity-50 disabled:hover:translate-y-0"
              style={{ background: "var(--av-blue-500)" }}
            >
              {loading || counts == null ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {counts == null ? "Loading the bank…" : `Start quiz · ${askCount} question${askCount === 1 ? "" : "s"}`}
            </button>
            {available != null && available < QUIZ_SIZE && (
              <div className="mt-2 text-[13px] text-muted-foreground">
                This topic has {available} question{available === 1 ? "" : "s"} for now. Pick "All topics" for a
                longer round.
              </div>
            )}
            {failed && (
              <div className="mt-2 text-[13.5px] text-[var(--av-red-400)]">
                We couldn't load the questions. Check your connection and try again.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

/** El banco no se pudo leer: no es lo mismo que estar vacío, y se dice así. */
function BankLoadError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-2xl surface p-7 flex flex-col items-start">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{
          background: "color-mix(in oklab, var(--av-red-400) 14%, transparent)",
          border: "1px solid color-mix(in oklab, var(--av-red-400) 30%, transparent)",
          color: "var(--av-red-400)",
        }}
      >
        <RotateCcw className="h-5 w-5" />
      </div>
      <h2 className="mt-3.5 text-[18px] font-bold tracking-[-0.01em]">
        We couldn't load the question bank
      </h2>
      <p className="mt-1.5 text-[14.5px] text-muted-foreground max-w-[520px] leading-relaxed">
        It's a connection problem, not an empty bank. Try again, or use the glossary meanwhile.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 h-11 px-5 rounded-full text-[14.5px] font-semibold text-white border-0 surface-lift"
          style={{ background: "var(--av-blue-500)" }}
        >
          <RotateCcw className="h-4 w-4" /> Try again
        </button>
        <Link
          to="/app/icao/vocabulario"
          className="inline-flex items-center gap-1.5 h-11 px-5 rounded-full text-[14.5px] font-semibold border border-border bg-card hover:bg-muted transition-colors"
        >
          <BookOpen className="h-4 w-4" /> Open the glossary
        </Link>
      </div>
    </div>
  )
}

/** Tema (o banco entero) sin preguntas: estado de producto con una salida. */
function EmptyBank({ allEmpty, onAllTopics }: { allEmpty: boolean; onAllTopics: () => void }) {
  return (
    <div className="rounded-2xl surface p-7 flex flex-col items-start">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{
          background: "color-mix(in oklab, var(--av-blue-500) 14%, transparent)",
          border: "1px solid color-mix(in oklab, var(--av-blue-500) 30%, transparent)",
          color: "var(--av-blue-500)",
        }}
      >
        <ClipboardCheck className="h-5 w-5" />
      </div>
      <h2 className="mt-3.5 text-[18px] font-bold tracking-[-0.01em]">
        {allEmpty ? "The question bank is on its way" : "No questions in this topic yet"}
      </h2>
      <p className="mt-1.5 text-[14.5px] text-muted-foreground max-w-[520px] leading-relaxed">
        {allEmpty
          ? "We're loading the vocabulary and comprehension questions. Meanwhile the glossary is complete and searchable: it's the same material the quiz is built on."
          : "We're still writing this one. The other topics are ready, so start there and come back later."}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {!allEmpty && (
          <button
            onClick={onAllTopics}
            className="inline-flex items-center gap-1.5 h-11 px-5 rounded-full text-[14.5px] font-semibold text-white border-0 surface-lift"
            style={{ background: "var(--av-blue-500)" }}
          >
            Try all topics <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
        <Link
          to="/app/icao/vocabulario"
          className="inline-flex items-center gap-1.5 h-11 px-5 rounded-full text-[14.5px] font-semibold border border-border bg-card hover:bg-muted transition-colors"
        >
          <BookOpen className="h-4 w-4" /> Open the glossary
        </Link>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
function QuizCard({ question, index, total, selected, revealed, onChoose, onNext, isLast }: { question: QuizQuestion; index: number; total: number; selected: string | null; revealed: boolean; onChoose: (l: string) => void; onNext: () => void; isLast: boolean }) {
  const optionKeys = useMemo(() => Object.keys(question.options).sort(), [question.options])

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="text-[13px] font-semibold text-muted-foreground">
          Question {index + 1} <span className="opacity-50 tabular-nums">/ {total}</span> · {question.topic}
        </div>
        <div className="flex-1 mx-4 h-1 rounded-full bg-border/50 overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${((index + (revealed ? 1 : 0)) / total) * 100}%`,
              background: "var(--av-blue-500)",
            }}
          />
        </div>
      </div>

      <div className="rounded-2xl surface p-6">
        {question.context && (
          <div className="text-[13.5px] italic text-muted-foreground mb-3 border-l-2 pl-3 border-[var(--av-blue-500)]/40">
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
              ? "color-mix(in oklab, var(--av-blue-500) 50%, transparent)"
              : baseBorder
            const bg = isCorrect
              ? "color-mix(in oklab, var(--av-green-400) 10%, transparent)"
              : isWrongChosen
              ? "color-mix(in oklab, var(--av-red-400) 10%, transparent)"
              : selected === k
              ? "color-mix(in oklab, var(--av-blue-500) 8%, transparent)"
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
                  className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-[13.5px] font-bold uppercase border"
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
            className="mt-5 rounded-2xl border p-4 text-[14px] leading-relaxed"
            style={{
              borderColor: "color-mix(in oklab, var(--av-blue-500) 30%, transparent)",
              background: "color-mix(in oklab, var(--av-blue-500) 8%, transparent)",
            }}
          >
            <div className="text-[13px] font-semibold mb-1.5" style={{ color: "var(--av-blue-500)" }}>
              EXPLANATION
            </div>
            {question.explanation}
          </div>
        )}

        {revealed && (
          <div className="mt-5 flex justify-end">
            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full text-[14.5px] font-semibold text-white border-0 surface-lift"
              style={{ background: "var(--av-blue-500)" }}
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
    pct >= 60 ? { label: "Passed, keep practising", color: "var(--av-blue-500)" } :
                { label: "Needs review", color: "var(--av-amber-400)" }

  return (
    <div className="text-center pt-6">
      <div className="text-[13px] font-semibold text-muted-foreground">
        RESULTS
      </div>
      <div
        className="mt-3 text-[72px] font-extrabold tracking-[-0.04em] leading-none tabular-nums"
        style={{ color: verdict.color }}
      >
        {score} / {total}
      </div>
      <div className="mt-1 text-[13.5px] font-semibold" style={{ color: verdict.color }}>
        {pct}% · {verdict.label}
      </div>

      <div className="mt-7 flex justify-center gap-1.5 flex-wrap max-w-[480px] mx-auto">
        {history.map((h, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-md flex items-center justify-center text-[12.5px] font-bold"
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
          className="inline-flex items-center gap-2 h-11 px-5 rounded-full text-[14.5px] font-semibold text-white border-0 surface-lift"
          style={{ background: "var(--av-blue-500)" }}
        >
          <RotateCcw className="h-4 w-4" /> New round
        </button>
        <Link
          to="/app/icao/vocabulario"
          className="inline-flex items-center gap-1.5 h-11 px-5 rounded-full text-[14.5px] font-semibold border border-border bg-card hover:bg-muted transition-colors"
        >
          Go to glossary
        </Link>
      </div>
    </div>
  )
}
