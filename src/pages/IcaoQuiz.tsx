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
  { value: "all",           label: "Todos los temas" },
  { value: "vocabulary",    label: "Vocabulario" },
  { value: "comprehension", label: "Comprensión" },
  { value: "phraseology",   label: "Fraseología" },
  { value: "weather",       label: "Meteorología" },
  { value: "medical",       label: "Médico" },
  { value: "security",      label: "Seguridad" },
  { value: "emergencies",   label: "Emergencias" },
  { value: "technical",     label: "Técnico" },
]

/** El tema llega de la base en inglés: lo mostramos con su etiqueta en español. */
function topicLabel(value: string): string {
  return TOPICS.find((t) => t.value === value)?.label ?? value
}

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

  useEffect(() => {
    // El conteo se dispara dentro de un IIFE async: los setState del fetch no
    // pueden colgar del cuerpo del efecto.
    void (async () => { await loadCounts() })()
  }, [loadCounts])

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
      <div className="px-7 py-7 pb-20 max-w-[860px] mx-auto">
        <Link
          to="/app/icao"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a Inglés ICAO
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
        <ClipboardCheck className="h-3.5 w-3.5" /> Quiz de inglés · banco de estudio
      </div>
      <h1 className="mt-3 text-[32px] sm:text-[32px] font-semibold tracking-[-0.03em] leading-[1.05]">
        Preguntas de vocabulario y comprensión
      </h1>
      <p className="mt-2 text-[15px] text-muted-foreground max-w-[640px]">
        Preguntas al azar con una explicación después de cada una. Léelas, que ahí está el
        aprendizaje. No es un examen, es entrenamiento.
      </p>

      <div className="mt-7 grid gap-4">
        <div>
          <div className="text-[13px] font-semibold text-muted-foreground">Tema</div>
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
                  title={empty ? "Todavía no hay preguntas en este tema" : undefined}
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
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
              style={{ background: "var(--av-blue-500)" }}
            >
              {loading || counts == null ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {counts == null ? "Cargando el banco…" : `Empezar quiz · ${askCount} pregunta${askCount === 1 ? "" : "s"}`}
            </button>
            {available != null && available < QUIZ_SIZE && (
              <div className="mt-2 text-[13px] text-muted-foreground">
                Por ahora este tema tiene {available} pregunta{available === 1 ? "" : "s"}. Elige
                “Todos los temas” para una ronda más larga.
              </div>
            )}
            {failed && (
              <div className="mt-2 text-[13px]" style={{ color: "var(--av-danger-fg)" }}>
                No pudimos cargar las preguntas. Revisa tu conexión e inténtalo de nuevo.
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
      <h2 className="mt-3.5 text-[17px] font-semibold tracking-[-0.01em]">
        No pudimos cargar el banco de preguntas
      </h2>
      <p className="mt-1.5 text-[15px] text-muted-foreground max-w-[520px] leading-relaxed">
        Es un problema de conexión, no un banco vacío. Inténtalo de nuevo o usa el glosario mientras
        tanto.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 h-11 px-5 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
          style={{ background: "var(--av-blue-500)" }}
        >
          <RotateCcw className="h-4 w-4" /> Intentar de nuevo
        </button>
        <Link
          to="/app/icao/vocabulario"
          className="inline-flex items-center gap-1.5 h-11 px-5 rounded-xl text-[15px] font-semibold surface hover:bg-muted transition-colors"
        >
          <BookOpen className="h-4 w-4" /> Abrir el glosario
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
      <h2 className="mt-3.5 text-[17px] font-semibold tracking-[-0.01em]">
        {allEmpty ? "El banco de preguntas está en camino" : "Todavía no hay preguntas en este tema"}
      </h2>
      <p className="mt-1.5 text-[15px] text-muted-foreground max-w-[520px] leading-relaxed">
        {allEmpty
          ? "Estamos cargando las preguntas de vocabulario y comprensión. Mientras tanto el glosario está completo y se puede buscar: es el mismo material sobre el que está armado el quiz."
          : "Todavía lo estamos escribiendo. Los demás temas ya están listos, así que empieza por ahí y vuelve más adelante."}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {!allEmpty && (
          <button
            onClick={onAllTopics}
            className="inline-flex items-center gap-1.5 h-11 px-5 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--av-blue-500)" }}
          >
            Probar con todos los temas <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
        <Link
          to="/app/icao/vocabulario"
          className="inline-flex items-center gap-1.5 h-11 px-5 rounded-xl text-[15px] font-semibold surface hover:bg-muted transition-colors"
        >
          <BookOpen className="h-4 w-4" /> Abrir el glosario
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
          Pregunta {index + 1} <span className="opacity-50 tabular-nums">/ {total}</span> ·{" "}
          {topicLabel(question.topic)}
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
          <div className="text-[13px] italic text-muted-foreground mb-3 border-l-2 pl-3 border-[var(--av-blue-500)]/40">
            {question.context}
          </div>
        )}
        <div className="text-[17px] font-semibold leading-snug tracking-[-0.01em]">
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
                  className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-[13px] font-semibold uppercase border"
                  style={{ borderColor, color: isCorrect ? "var(--av-success-fg)" : isWrongChosen ? "var(--av-danger-fg)" : "var(--muted-foreground)" }}
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
            className="mt-5 rounded-2xl border p-4 text-[13px] leading-relaxed"
            style={{
              borderColor: "color-mix(in oklab, var(--av-blue-500) 30%, transparent)",
              background: "color-mix(in oklab, var(--av-blue-500) 8%, transparent)",
            }}
          >
            <div className="text-[13px] font-semibold mb-1.5" style={{ color: "var(--av-blue-500)" }}>
              EXPLICACIÓN
            </div>
            {question.explanation}
          </div>
        )}

        {revealed && (
          <div className="mt-5 flex justify-end">
            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--av-blue-500)" }}
            >
              {isLast ? "Ver resultados" : "Siguiente"} <ArrowRight className="h-3.5 w-3.5" />
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
  // Los tres veredictos comparten mecanismo: el número va en color de texto
  // normal y el tono lo da el chip, que ya trae su par claro/oscuro legible.
  const verdict =
    pct >= 80 ? { label: "Muy bien", chip: "chip chip-green" } :
    pct >= 60 ? { label: "Aprobado, sigue practicando", chip: "chip chip-cyan" } :
                { label: "Toca repasar", chip: "chip chip-amber" }

  return (
    <div className="text-center pt-6">
      <div className="text-[13px] font-semibold text-muted-foreground">
        RESULTADOS
      </div>
      <div className="mt-3 text-[32px] font-semibold tracking-[-0.04em] leading-none tabular-nums text-foreground">
        {score} / {total}
      </div>
      <div className="mt-2 flex items-center justify-center gap-2">
        <span className="tabular-nums text-[13px] font-semibold text-muted-foreground">{pct}%</span>
        <span className={verdict.chip}>{verdict.label}</span>
      </div>

      <div className="mt-7 flex justify-center gap-1.5 flex-wrap max-w-[480px] mx-auto">
        {history.map((h, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-md flex items-center justify-center text-[12px] font-semibold"
            style={{
              background: h.correct
                ? "color-mix(in oklab, var(--av-green-400) 18%, transparent)"
                : "color-mix(in oklab, var(--av-red-400) 18%, transparent)",
              color: h.correct ? "var(--av-success-fg)" : "var(--av-danger-fg)",
            }}
          >
            {h.correct ? "✓" : "✗"}
          </div>
        ))}
      </div>

      <div className="mt-9 flex items-center justify-center gap-2">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
          style={{ background: "var(--av-blue-500)" }}
        >
          <RotateCcw className="h-4 w-4" /> Nueva ronda
        </button>
        <Link
          to="/app/icao/vocabulario"
          className="inline-flex items-center gap-1.5 h-11 px-5 rounded-xl text-[15px] font-semibold surface hover:bg-muted transition-colors"
        >
          Ir al glosario
        </Link>
      </div>
    </div>
  )
}
