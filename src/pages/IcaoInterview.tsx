import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  Mic,
  MessageSquare,
  Lightbulb,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { TEA_PART1_SETS, TEA_PART1_TOTAL, type InterviewQuestion } from "@/lib/icaoInterview"

/**
 * TEA — Part 1: Interview.
 * Las 4 sets de preguntas que hace el examinador, cada una con su respuesta
 * sugerida (oculta por defecto, para que el usuario primero intente responder
 * en voz alta y recién después compare con el modelo).
 */
export function IcaoInterview() {
  const [activeSet, setActiveSet] = useState(1)
  const set = TEA_PART1_SETS.find((s) => s.set === activeSet) ?? TEA_PART1_SETS[0]

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[940px] mx-auto">
        <Link
          to="/app/icao"
          className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver al módulo Inglés ICAO
        </Link>

        {/* Header */}
        <div
          className="mono inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-1 rounded-full"
          style={{
            color: "var(--av-cyan-300)",
            background: "oklch(0.78 0.16 215 / 12%)",
            border: "1px solid oklch(0.78 0.16 215 / 30%)",
          }}
        >
          <Mic className="h-3 w-3" /> TEA · PART 1 · INTERVIEW · 7–8 MIN
        </div>
        <h1 className="mt-3 text-[34px] font-extrabold tracking-[-0.03em] leading-[1.05]">
          Interview · preguntas sobre tu rol
        </h1>
        <p className="mt-2 text-[14px] text-muted-foreground max-w-[700px]">
          El examen abre con una entrevista sobre tu experiencia profesional y temas de aviación.
          El objetivo es ver si podés sostener una conversación espontánea en inglés natural,
          técnico y profesional. Cada pregunta trae una <strong className="text-foreground">respuesta
          modelo</strong> — no para memorizarla (el examen penaliza respuestas recitadas), sino para
          captar el registro, la estructura y el vocabulario esperado.
        </p>

        {/* Tip */}
        <div
          className="mt-5 rounded-xl border p-4 flex items-start gap-3"
          style={{
            borderColor: "color-mix(in oklab, var(--av-amber-400) 25%, transparent)",
            background: "color-mix(in oklab, var(--av-amber-400) 6%, transparent)",
          }}
        >
          <Lightbulb className="flex-shrink-0 mt-0.5 h-4.5 w-4.5" style={{ color: "var(--av-amber-400)" }} />
          <div className="text-[12.5px] text-foreground/85 leading-relaxed">
            <strong>Cómo practicar:</strong> leé la pregunta, respondé en voz alta grabándote, y
            recién después abrí la respuesta sugerida para comparar. Apuntá a 3–5 frases por
            respuesta, con detalle técnico y conectores naturales — no a un "sí/no" seco.
          </div>
        </div>

        {/* Set tabs */}
        <div className="mt-7 flex gap-1.5 flex-wrap">
          {TEA_PART1_SETS.map((s) => {
            const active = s.set === activeSet
            return (
              <button
                key={s.set}
                onClick={() => setActiveSet(s.set)}
                className="mono px-4 h-9 rounded-full text-[12px] font-bold uppercase tracking-[0.08em] border transition-colors"
                style={{
                  borderColor: active
                    ? "color-mix(in oklab, var(--av-cyan-400) 45%, transparent)"
                    : "color-mix(in oklab, var(--border) 60%, transparent)",
                  background: active ? "color-mix(in oklab, var(--av-cyan-400) 16%, transparent)" : "transparent",
                  color: active ? "var(--av-cyan-300)" : "var(--muted-foreground)",
                }}
              >
                {s.label}
              </button>
            )
          })}
        </div>

        {/* Questions */}
        <div className="mt-5 space-y-2.5">
          {set.questions.map((q) => (
            <QuestionCard key={`${set.set}-${q.n}`} q={q} />
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 text-[11px] text-muted-foreground mono text-center">
          {TEA_PART1_TOTAL} preguntas · 4 sets · TEA Part 1 (Mayflower College)
        </div>
      </div>
    </AppLayout>
  )
}

function QuestionCard({ q }: { q: InterviewQuestion }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-xl border bg-card overflow-hidden"
      style={{ borderColor: open ? "color-mix(in oklab, var(--av-cyan-400) 32%, transparent)" : "color-mix(in oklab, var(--border) 70%, transparent)" }}
    >
      <div className="flex items-start gap-4 p-4">
        <div
          className="mono flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-[12px] font-bold"
          style={{
            background: "color-mix(in oklab, var(--av-cyan-400) 12%, transparent)",
            color: "var(--av-cyan-300)",
          }}
        >
          {String(q.n).padStart(2, "0")}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-semibold tracking-[-0.01em] leading-snug">
            {q.question}
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold transition-colors"
            style={{ color: "var(--av-cyan-400)" }}
          >
            {open ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {open ? "Ocultar respuesta sugerida" : "Ver respuesta sugerida"}
            <ChevronDown
              className="h-3.5 w-3.5 transition-transform"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="px-4 pb-4 pt-0">
          <div
            className="rounded-xl border p-4"
            style={{
              borderColor: "color-mix(in oklab, var(--av-cyan-400) 25%, transparent)",
              background: "color-mix(in oklab, var(--av-cyan-400) 7%, transparent)",
            }}
          >
            <div className="mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--av-cyan-300)] mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="h-3 w-3" /> RESPUESTA SUGERIDA
            </div>
            <p className="text-[13.5px] leading-relaxed text-foreground/90">
              {q.suggestedAnswer}
            </p>

            {q.highRegisterWords && q.highRegisterWords.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border/50">
                <div className="mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--av-amber-400)] mb-1.5">
                  HIGH REGISTER WORDS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {q.highRegisterWords.map((w) => (
                    <span
                      key={w}
                      className="px-2 py-0.5 rounded-md text-[11px] font-semibold"
                      style={{
                        background: "color-mix(in oklab, var(--av-amber-400) 14%, transparent)",
                        color: "var(--av-amber-400)",
                      }}
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
