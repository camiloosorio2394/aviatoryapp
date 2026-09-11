import { useState } from "react"
import { CheckCircle2, Eye, MessageSquareText } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"
import type { PreguntaEntrevista } from "@/lib/mercanciasPractica"
import { ACENTO } from "@/components/mercancias/practica/comun"
import { MarcarResuelto } from "@/components/mercancias/practica/Piezas"

// ─── Entrevista ──────────────────────────────────────────────────────────────

export function Entrevista({
  pregunta,
  n,
  total,
  isDone,
  saving,
  onDone,
}: {
  pregunta: PreguntaEntrevista
  n: number
  total: number
  isDone: boolean
  saving: boolean
  onDone: () => void
}) {
  const [answer, setAnswer] = useState("")
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="grid gap-5 xl:gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
      <section className="min-w-0 rounded-2xl surface p-5 sm:p-6">
        <header>
          <div className="np-rotulo">
            Lo que podrían preguntarte · {n} de {total}
          </div>
          <h2 className="np-display mt-1.5 text-[24px] sm:text-[28px] font-semibold leading-[1.15]">{pregunta.pregunta}</h2>
          {isDone && (
            <div className="mt-3">
              <span className="np-badge np-badge-on">
                <CheckCircle2 className="h-3.5 w-3.5" /> Ensayada
              </span>
            </div>
          )}
        </header>
        <p className="mt-5 mb-0 text-[13.5px] text-muted-foreground leading-relaxed">
          Respóndela en voz alta como si estuvieras frente al panel, y escribe lo esencial. Después compara: no se
          trata de recitar, sino de decir lo correcto con el artículo que lo respalda.
        </p>
        <label htmlFor={`ent-${pregunta.n}`} className="sr-only">
          Tu respuesta
        </label>
        <textarea
          id={`ent-${pregunta.n}`}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Lo esencial de tu respuesta, con el artículo si lo recuerdas."
          className="mt-4 w-full min-h-[140px] rounded-xl border border-border bg-background p-3.5 text-[13px] leading-relaxed text-foreground placeholder:text-muted-foreground/70 resize-y focus:outline-none focus:border-foreground/30 transition-colors"
        />
      </section>

      <section className="min-w-0 rounded-2xl surface p-5 sm:p-6">
        <SectionTitle icon={MessageSquareText} eyebrow="Respuesta modelo" title="Compara" hint="Y fíjate en qué está evaluando el entrevistador con esa pregunta." />
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="w-full inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
            style={{ background: ACENTO }}
          >
            <Eye className="h-4 w-4" /> Ver la respuesta modelo
          </button>
        ) : (
          <div className="rev-aparece">
            <p className="m-0 text-[13.5px] text-foreground/90 leading-relaxed">{pregunta.respuesta}</p>
            <div className="mt-4 rounded-xl border p-3.5" style={{ borderColor: `color-mix(in oklab, ${ACENTO} 30%, transparent)`, background: `color-mix(in oklab, ${ACENTO} 6%, transparent)` }}>
              <div className="np-rotulo">Qué evalúan</div>
              <p className="m-0 mt-1 text-[13px] leading-relaxed text-foreground/90">{pregunta.evaluan}</p>
            </div>
            <MarcarResuelto isDone={isDone} saving={saving} onDone={onDone} label="Marcar como ensayada" done="Ya la ensayaste" />
          </div>
        )}
      </section>
    </div>
  )
}
