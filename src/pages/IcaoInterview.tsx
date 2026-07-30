import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  Mic,
  MessageSquare,
  Lightbulb,
  ChevronDown,
  Eye,
  EyeOff,
  Sparkles,
  UserCircle2,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { TEA_PART1_SETS, TEA_PART1_TOTAL, type InterviewQuestion } from "@/lib/icaoInterview"
import { personalizedInterviewAnswer, type InterviewPilot } from "@/lib/personalizeInterview"

/**
 * TEA — Part 1: Interview.
 * Las 4 sets de preguntas que hace el examinador, cada una con su respuesta
 * sugerida (oculta por defecto, para que el usuario primero intente responder
 * en voz alta y recién después compare con el modelo).
 */
export function IcaoInterview() {
  const { user } = useSession()
  const [activeSet, setActiveSet] = useState(1)
  const [pilot, setPilot] = useState<InterviewPilot | null>(null)
  const set = TEA_PART1_SETS.find((s) => s.set === activeSet) ?? TEA_PART1_SETS[0]

  useEffect(() => {
    if (!user) return
    let cancelled = false
    supabase
      .from("pilot_state")
      .select("stage, total_hours, hours_pic, target_airline, licenses, country")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled || !data) return
        const p = data as {
          stage?: InterviewPilot["stage"]; total_hours?: number; hours_pic?: number
          target_airline?: string; licenses?: string[]; country?: string
        }
        setPilot({
          stage: p.stage ?? null,
          totalHours: p.total_hours ?? null,
          hoursPic: p.hours_pic ?? null,
          targetAirline: p.target_airline ?? null,
          licenses: p.licenses ?? null,
          country: p.country ?? null,
        })
      })
    return () => { cancelled = true }
  }, [user])

  const hasProfile = !!(pilot && (pilot.stage || pilot.totalHours || pilot.targetAirline))

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[940px] mx-auto">
        <Link
          to="/app/icao"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a Inglés ICAO
        </Link>

        {/* Header */}
        <section className="relative overflow-hidden rounded-2xl surface p-7 sm:p-8">
          <div
            className="inline-flex items-center gap-2 w-9 h-9 rounded-xl mb-4 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))" }}
          >
            <Mic className="h-4.5 w-4.5 text-white" />
          </div>
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            TEA · Parte 1 · Interview · 7 a 8 minutos
          </div>
          <h1 className="mt-2 text-[32px] sm:text-[32px] font-semibold tracking-[-0.03em] leading-[1.05] text-foreground">
            Entrevista: preguntas sobre tu rol
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground max-w-[700px]">
            El examen abre con una entrevista sobre tu experiencia profesional y temas de aviación. La
            idea es ver si puedes sostener una conversación espontánea en inglés natural, técnico y
            profesional. Cada pregunta viene con una{" "}
            <strong className="text-foreground">respuesta modelo</strong>, no para memorizarla (el
            examen penaliza las respuestas recitadas) sino para captar el registro, la estructura y el
            vocabulario esperado.
          </p>
        </section>

        {/* Tip */}
        <div
          className="mt-5 rounded-2xl border p-4 flex items-start gap-3"
          style={{
            borderColor: "color-mix(in oklab, var(--av-amber-400) 25%, transparent)",
            background: "color-mix(in oklab, var(--av-amber-400) 6%, transparent)",
          }}
        >
          <Lightbulb className="flex-shrink-0 mt-0.5 h-4.5 w-4.5" style={{ color: "var(--av-amber-400)" }} />
          <div className="text-[13px] text-foreground/85 leading-relaxed">
            <strong>Cómo practicar:</strong> lee la pregunta, respóndela en voz alta mientras te
            grabas y recién después abre la respuesta sugerida para comparar. Apunta a 3 o 5 oraciones
            por respuesta, con detalle técnico y conectores naturales, no un “yes/no” seco.
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
                className="px-4 h-9 rounded-full text-[13px] font-semibold border transition-colors"
                style={{
                  borderColor: active
                    ? "color-mix(in oklab, var(--av-blue-500) 45%, transparent)"
                    : "color-mix(in oklab, var(--border) 60%, transparent)",
                  background: active ? "color-mix(in oklab, var(--av-blue-500) 16%, transparent)" : "transparent",
                  color: active ? "var(--av-blue-500)" : "var(--muted-foreground)",
                }}
              >
                {s.label}
              </button>
            )
          })}
        </div>

        {/* Personalization hint */}
        {!hasProfile && (
          <Link
            to="/app/perfil"
            className="mt-3 flex items-center gap-2.5 rounded-2xl border border-dashed border-border bg-muted/30 px-4 py-3 hover:bg-muted/50 transition-colors"
          >
            <UserCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: "var(--av-blue-500)" }} />
            <span className="text-[13px] text-muted-foreground">
              Completa tu perfil (etapa, horas, aerolínea objetivo) para ver{" "}
              <strong className="text-foreground">ejemplos armados con tus datos</strong> en las
              preguntas sobre ti.
            </span>
          </Link>
        )}

        {/* Questions */}
        <div className="mt-5 space-y-2.5">
          {set.questions.map((q) => (
            <QuestionCard key={`${set.set}-${q.n}`} q={q} pilot={hasProfile ? pilot : null} />
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 text-[12px] text-muted-foreground text-center">
          {TEA_PART1_TOTAL} preguntas · 4 sets · TEA Parte 1 (Mayflower College)
        </div>
      </div>
    </AppLayout>
  )
}

function QuestionCard({ q, pilot }: { q: InterviewQuestion; pilot: InterviewPilot | null }) {
  const [open, setOpen] = useState(false)
  const mine = pilot ? personalizedInterviewAnswer(q.question, pilot) : null
  return (
    <div
      className="rounded-2xl border bg-card overflow-hidden"
      style={{ borderColor: open ? "color-mix(in oklab, var(--av-blue-500) 32%, transparent)" : "color-mix(in oklab, var(--border) 70%, transparent)" }}
    >
      <div className="flex items-start gap-4 p-4">
        <div
          className="tabular-nums flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-[13px] font-semibold"
          style={{
            background: "color-mix(in oklab, var(--av-blue-500) 12%, transparent)",
            color: "var(--av-blue-500)",
          }}
        >
          {String(q.n).padStart(2, "0")}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-semibold text-muted-foreground">
            Pregunta del examinador
          </div>
          <div className="mt-1 text-[15px] font-semibold tracking-[-0.01em] leading-snug">
            {q.question}
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
            style={{ color: "var(--av-blue-500)" }}
          >
            {open ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {open ? "Ocultar la respuesta sugerida" : "Ver la respuesta sugerida"}
            <ChevronDown
              className="h-3.5 w-3.5 transition-transform"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="px-4 pb-4 pt-0 space-y-3">
          {/* Tu versión — ejemplo armado con los datos del piloto */}
          {mine && (
            <div
              className="rounded-2xl border p-4"
              style={{
                borderColor: "color-mix(in oklab, var(--av-green-400) 30%, transparent)",
                background: "color-mix(in oklab, var(--av-green-400) 6%, transparent)",
              }}
            >
              <div className="text-[13px] font-semibold mb-1.5 flex items-center gap-1.5" style={{ color: "var(--av-success-fg)" }}>
                <Sparkles className="h-3 w-3" /> Tu versión · con tus datos
              </div>
              <p className="text-[15px] leading-relaxed text-foreground/90">{mine}</p>
              <p className="mt-2 text-[12px] text-muted-foreground">
                Ejemplo armado con tu perfil: úsalo como guía, no lo recites (el TEA penaliza las
                respuestas memorizadas).
              </p>
            </div>
          )}

          <div
            className="rounded-2xl border p-4"
            style={{
              borderColor: "color-mix(in oklab, var(--av-blue-500) 25%, transparent)",
              background: "color-mix(in oklab, var(--av-blue-500) 7%, transparent)",
            }}
          >
            <div className="text-[13px] font-semibold mb-1.5 flex items-center gap-1.5" style={{ color: "var(--av-blue-500)" }}>
              <MessageSquare className="h-3 w-3" />{" "}
              {mine ? "Respuesta modelo · registro alto" : "Respuesta sugerida"}
            </div>
            <p className="text-[15px] leading-relaxed text-foreground/90">
              {q.suggestedAnswer}
            </p>

            {q.highRegisterWords && q.highRegisterWords.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border/50">
                <div className="text-[13px] font-semibold mb-1.5" style={{ color: "var(--av-warn-fg)" }}>
                  Palabras de registro alto
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {q.highRegisterWords.map((w) => (
                    <span
                      key={w}
                      className="px-2 py-0.5 rounded-md text-[12px] font-semibold"
                      style={{
                        background: "color-mix(in oklab, var(--av-amber-400) 14%, transparent)",
                        color: "var(--av-warn-fg)",
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
