import { useState } from "react"
import { CheckCircle2, Eye, PencilLine } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"
import { accentText } from "@/lib/tileColors"
import type { EscenarioMP } from "@/lib/mercanciasPractica"
import { ACENTO } from "@/components/mercancias/practica/comun"
import { PuntosClave, MarcarResuelto } from "@/components/mercancias/practica/Piezas"

// ─── Escenarios ──────────────────────────────────────────────────────────────

export function Escenario({
  escenario,
  n,
  total,
  isDone,
  saving,
  onDone,
}: {
  escenario: EscenarioMP
  n: number
  total: number
  isDone: boolean
  saving: boolean
  onDone: () => void
}) {
  const [answer, setAnswer] = useState("")
  const [revealed, setRevealed] = useState(false)
  const [ticked, setTicked] = useState<number[]>([])

  return (
    <div className="grid gap-5 xl:gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
      <section className="min-w-0 rounded-2xl surface p-5 sm:p-6">
        <header>
          <div className="np-rotulo">
            Escenario de práctica · {n} de {total}
          </div>
          <h2 className="np-display mt-1.5 text-[26px] sm:text-[30px] font-semibold leading-[1.05]">{escenario.titulo}</h2>
          {isDone && (
            <div className="mt-3">
              <span className="np-badge np-badge-on">
                <CheckCircle2 className="h-3.5 w-3.5" /> Resuelto
              </span>
            </div>
          )}
        </header>
        <div className="mt-6">
          <div className="np-rotulo mb-2.5">La situación</div>
          <div className="np-tecnico">
            <p className="m-0 text-[15px] leading-[1.7] text-foreground">{escenario.situacion}</p>
          </div>
        </div>
        <div className="mt-5">
          <div className="np-rotulo mb-2.5">Lo que tienes que decidir</div>
          <ol className="m-0 list-none p-0 flex flex-col gap-2">
            {escenario.preguntas.map((q, i) => (
              <li key={i} className="grid grid-cols-[26px_1fr] gap-2.5 text-[14.5px] leading-[1.55]">
                <span
                  className="mono mt-[2px] flex h-[22px] w-[22px] items-center justify-center rounded-[5px] text-[11px] font-semibold"
                  style={{ background: `color-mix(in oklab, ${ACENTO} 14%, transparent)`, color: accentText(ACENTO) }}
                >
                  {i + 1}
                </span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="min-w-0 rounded-2xl surface p-5 sm:p-6">
        <SectionTitle icon={PencilLine} eyebrow="Tu respuesta" title="Resuélvelo con tus palabras" hint="Escribe primero, compara después. Como en un briefing real." />
        <label htmlFor={`esc-${escenario.id}`} className="sr-only">
          Tu respuesta al escenario
        </label>
        <textarea
          id={`esc-${escenario.id}`}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Qué haces, en qué orden, con qué respaldo del reglamento y qué queda después."
          className="w-full min-h-[180px] rounded-xl border border-border bg-background p-3.5 text-[13px] leading-relaxed text-foreground placeholder:text-muted-foreground/70 resize-y focus:outline-none focus:border-foreground/30 transition-colors"
        />
        {!revealed ? (
          <div className="mt-4">
            <button
              onClick={() => setRevealed(true)}
              className="w-full inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
              style={{ background: ACENTO }}
            >
              <Eye className="h-4 w-4" /> Comparar con la respuesta modelo
            </button>
            <p className="mt-2 mb-0 text-[12px] text-muted-foreground leading-relaxed">
              {answer.trim().length < 20 ? "Intenta escribir tu versión completa antes de comparar: es la parte que de verdad te entrena." : "La respuesta modelo aparece solo cuando tú lo pides."}
            </p>
          </div>
        ) : (
          <div className="mt-5 rev-aparece">
            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: accentText("var(--av-green-400)") }}>
              <CheckCircle2 className="h-3.5 w-3.5" /> Respuesta modelo
            </div>
            <p className="mt-2 mb-0 text-[13px] text-foreground/90 leading-relaxed">{escenario.modelo}</p>
            <PuntosClave puntos={escenario.puntos} ticked={ticked} onToggle={(i) => setTicked((t) => (t.includes(i) ? t.filter((x) => x !== i) : [...t, i]))} />
            <MarcarResuelto isDone={isDone} saving={saving} onDone={onDone} />
          </div>
        )}
      </section>
    </div>
  )
}
