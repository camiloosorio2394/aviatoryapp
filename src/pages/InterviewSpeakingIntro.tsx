import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  Mic,
  Clock,
  ChevronDown,
  Loader2,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { supabase } from "@/integrations/supabase/client"

/**
 * Preguntas de entrevista intro (speaking) — las que TODA aerolínea hace al
 * inicio para evaluar fluidez/capacidad de respuesta en inglés.
 *
 * Fuente: `interview_sim_questions` con category.slug = 'intro_speaking'.
 *
 * MVP: lista expandible con la pregunta + intención + topics esperados +
 * follow-ups. La grabación + IA feedback ya tienen el backend (recordings/
 * feedback tables) pero queda para una iteración siguiente.
 */

interface Question {
  id: number
  slug: string
  question_text: string
  intent: string | null
  expected_topics: string[]
  follow_ups: string[]
  ideal_duration_seconds: number
  order_index: number
}

interface CategoryRow {
  id: number
}

export function InterviewSpeakingIntro() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [openId, setOpenId] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const cat = await supabase
        .from("interview_sim_categories")
        .select("id")
        .eq("slug", "intro_speaking")
        .maybeSingle()
      if (cancelled) return
      const catRow = cat.data as CategoryRow | null
      if (!catRow) {
        setLoading(false)
        return
      }
      const qres = await supabase
        .from("interview_sim_questions")
        .select("id,slug,question_text,intent,expected_topics,follow_ups,ideal_duration_seconds,order_index")
        .eq("category_id", catRow.id)
        .eq("is_active", true)
        .order("order_index", { ascending: true })
      if (cancelled) return
      if (qres.error) {
        console.error("interview_sim_questions", qres.error)
      } else {
        setQuestions((qres.data ?? []).map((row) => ({
          ...row,
          expected_topics: Array.isArray(row.expected_topics) ? (row.expected_topics as string[]) : [],
          follow_ups: Array.isArray(row.follow_ups) ? (row.follow_ups as string[]) : [],
        })) as Question[])
      }
      setLoading(false)
    })()
    return () => { cancelled = true }
  }, [])

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[920px] mx-auto">
        <Link
          to="/app/entrevistas"
          className="inline-flex items-center gap-1.5 text-[13.5px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a Entrevistas
        </Link>

        {/* Header */}
        <div
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
          style={{ color: "var(--av-blue-500)" }}
        >
          <Mic className="h-3.5 w-3.5" /> Entrevista intro · Speaking
        </div>
        <h1 className="mt-1.5 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.05]">
          {questions.length > 0
            ? `Las ${questions.length} preguntas que toda aerolínea hace al inicio`
            : "Las preguntas que toda aerolínea hace al inicio"}
        </h1>
        <p className="mt-2 text-[15px] text-muted-foreground max-w-[680px]">
          Son las preguntas básicas que cualquier aerolínea hace antes de pasar al técnico.
          Sirven para evaluar tu <strong className="text-foreground">capacidad de respuesta
          (speaking)</strong> y si sabes armar una historia coherente. Si fallas aquí, no avanzas
          al resto del proceso.
        </p>

        <div
          className="mt-5 rounded-2xl border p-4 flex items-start gap-3"
          style={{
            borderColor: "color-mix(in oklab, var(--av-blue-500) 22%, transparent)",
            background: "color-mix(in oklab, var(--av-blue-500) 5%, transparent)",
          }}
        >
          <Lightbulb className="flex-shrink-0 mt-0.5 h-4.5 w-4.5" style={{ color: "var(--av-blue-500)" }} />
          <div className="text-[14px] text-foreground/85 leading-relaxed">
            Cada pregunta abre con la <strong>intención</strong> (qué buscan que digas y qué
            evitar), los <strong>topics que esperan que cubras</strong>, y posibles{" "}
            <strong>follow-ups</strong>. Practica <strong>en voz alta</strong>, idealmente
            grabándote en el celular y escuchándote: es lo más incómodo y lo más útil.
          </div>
        </div>

        {/* List */}
        <div className="mt-7 space-y-2">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Cargando preguntas…</span>
            </div>
          ) : questions.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center flex flex-col items-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: "color-mix(in oklab, var(--av-blue-500) 14%, transparent)",
                  border: "1px solid color-mix(in oklab, var(--av-blue-500) 30%, transparent)",
                  color: "var(--av-blue-500)",
                }}
              >
                <Mic className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-[19px] font-bold tracking-[-0.01em]">
                Las preguntas intro llegan pronto
              </h2>
              <p className="mt-1.5 text-[14.5px] text-muted-foreground max-w-[460px] leading-relaxed">
                Aquí vas a encontrar las preguntas de apertura que hace toda aerolínea, con la
                intención de cada una, los topics que esperan y los follow-ups. Mientras tanto,
                entrena el speaking en el módulo de inglés ICAO.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <Link
                  to="/app/icao/interview"
                  className="inline-flex items-center gap-1.5 h-11 px-5 rounded-xl text-[14.5px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--av-blue-500)" }}
                >
                  Practicar Interview TEA <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/app/icao"
                  className="inline-flex items-center gap-1.5 h-11 px-5 rounded-xl text-[14.5px] font-semibold border border-border bg-card hover:bg-muted transition-colors"
                >
                  Ver el módulo ICAO
                </Link>
              </div>
            </div>
          ) : (
            questions.map((q, i) => (
              <QuestionRow
                key={q.id}
                number={i + 1}
                question={q}
                open={openId === q.id}
                onToggle={() => setOpenId(openId === q.id ? null : q.id)}
              />
            ))
          )}
        </div>

        {!loading && questions.length > 0 && (
          <div
            className="mt-10 rounded-2xl border p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
            style={{
              borderColor: "color-mix(in oklab, var(--av-blue-500) 22%, transparent)",
              background: "color-mix(in oklab, var(--av-blue-500) 5%, transparent)",
            }}
          >
            <div>
              <div className="inline-flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
                <Sparkles className="h-3.5 w-3.5" /> Próximo paso
              </div>
              <div className="mt-1.5 text-[16px] font-bold tracking-[-0.01em]">
                Cuando puedas responder estas con fluidez, pasa al Technical Interview.
              </div>
            </div>
            <Link
              to="/app/entrevistas"
              className="inline-flex items-center gap-1.5 h-11 px-5 rounded-xl text-[14.5px] font-semibold text-white border-0 flex-shrink-0 transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--av-blue-500)" }}
            >
              Ver otras categorías <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </AppLayout>
  )
}

function QuestionRow({ number, question, open, onToggle }: { number: number; question: Question; open: boolean; onToggle: () => void }) {
  return (
    <div
      className="rounded-2xl border bg-card overflow-hidden"
      style={{ borderColor: open ? "color-mix(in oklab, var(--av-blue-500) 35%, transparent)" : "var(--border)" }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left flex items-center gap-4 p-4 hover:bg-muted/40 transition-colors"
      >
        <div
          className="tabular-nums flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-[13.5px] font-bold"
          style={{
            background: "color-mix(in oklab, var(--av-blue-500) 12%, transparent)",
            color: "var(--av-blue-500)",
          }}
        >
          {String(number).padStart(2, "0")}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[15.5px] font-semibold tracking-[-0.01em]">
            {question.question_text}
          </div>
          <div className="mt-0.5 text-[12.5px] text-muted-foreground flex items-center gap-1.5">
            <Clock className="h-3 w-3" /> Ideal: {question.ideal_duration_seconds}s
          </div>
        </div>
        <ChevronDown
          className="h-4 w-4 text-muted-foreground transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div className="px-4 pb-5 pt-1 space-y-4 border-t border-border/60">
          {question.intent && (
            <div>
              <div className="mb-1.5">
                <span className="chip chip-amber">Intención · qué buscan</span>
              </div>
              <p className="text-[14px] leading-relaxed text-foreground/85">{question.intent}</p>
            </div>
          )}

          {question.expected_topics.length > 0 && (
            <div>
              <div className="mb-1.5 text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
                Topics que esperan
              </div>
              <ul className="space-y-1">
                {question.expected_topics.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] text-foreground/90">
                    <CheckCircle2 className="flex-shrink-0 mt-0.5 h-3.5 w-3.5" style={{ color: "var(--av-blue-500)" }} strokeWidth={2.5} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {question.follow_ups.length > 0 && (
            <div>
              <div className="mb-1.5">
                <span className="chip chip-green">Posibles follow-ups</span>
              </div>
              <ul className="space-y-1">
                {question.follow_ups.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] italic text-foreground/90">
                    <ArrowRight className="flex-shrink-0 mt-0.5 h-3.5 w-3.5" style={{ color: "var(--av-green-400)" }} strokeWidth={2.5} />
                    <span>"{f}"</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
