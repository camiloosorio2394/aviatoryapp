import { useState } from "react"
import { CheckCircle2, Eye, PencilLine } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"
import { CLASES, rombo } from "@/lib/mercanciasClases"
import type { CasoMP } from "@/lib/mercanciasPractica"
import { ACENTO } from "@/components/mercancias/practica/comun"
import { MarcarResuelto } from "@/components/mercancias/practica/Piezas"

// ─── Clasifica ───────────────────────────────────────────────────────────────

export function Clasifica({
  caso,
  n,
  total,
  isDone,
  saving,
  onDone,
}: {
  caso: CasoMP
  n: number
  total: number
  isDone: boolean
  saving: boolean
  onDone: () => void
}) {
  const [clase, setClase] = useState<string | null>(null)
  const [ge, setGe] = useState<boolean | null>(null)
  const [revelado, setRevelado] = useState(false)
  const claseOk = clase === caso.clase
  const geOk = ge === caso.ge
  const listo = clase !== null && ge !== null

  return (
    <div className="grid gap-5 xl:gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
      <section className="min-w-0 rounded-2xl surface p-5 sm:p-6">
        <header>
          <div className="np-rotulo">
            Clasifica · caso {n} de {total}
          </div>
          <h2 className="np-display mt-1.5 text-[26px] sm:text-[30px] font-semibold leading-none">Caso {n}</h2>
          {isDone && (
            <div className="mt-3">
              <span className="np-badge np-badge-on">
                <CheckCircle2 className="h-3.5 w-3.5" /> Resuelto
              </span>
            </div>
          )}
        </header>
        <div className="mt-6">
          <div className="np-rotulo mb-2.5">El envío</div>
          <div className="np-tecnico">
            <p className="m-0 text-[15px] leading-[1.7] text-foreground">{caso.texto}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="np-rotulo mb-2.5">¿Qué clase es?</div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
            {CLASES.map((c) => {
              const activa = clase === c.n
              const revelaOk = revelado && c.n === caso.clase
              const revelaMal = revelado && activa && !claseOk
              const borde = revelaOk ? "var(--av-green-400)" : revelaMal ? "var(--av-red-400)" : activa ? ACENTO : "var(--border)"
              return (
                <button
                  key={c.n}
                  onClick={() => !revelado && setClase(c.n)}
                  aria-pressed={activa}
                  disabled={revelado}
                  className="flex flex-col items-center gap-1 rounded-[10px] border px-1 py-2 transition-colors disabled:cursor-default"
                  style={{
                    borderColor: borde,
                    background: revelaOk || activa ? `color-mix(in oklab, ${borde} 10%, transparent)` : "transparent",
                  }}
                >
                  <img src={rombo(c.rombos[0])} alt={`Clase ${c.n}`} width={40} height={40} className="block h-10 w-10 object-contain" />
                  <span className="mono text-[11px] font-semibold">{c.n}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-5">
          <div className="np-rotulo mb-2.5">¿Lleva grupo de embalaje?</div>
          <div className="flex gap-2">
            {[true, false].map((v) => {
              const activa = ge === v
              const revelaOk = revelado && v === caso.ge
              const revelaMal = revelado && activa && !geOk
              const borde = revelaOk ? "var(--av-green-400)" : revelaMal ? "var(--av-red-400)" : activa ? ACENTO : "var(--border)"
              return (
                <button
                  key={String(v)}
                  onClick={() => !revelado && setGe(v)}
                  aria-pressed={activa}
                  disabled={revelado}
                  className="h-10 px-5 rounded-xl border text-[14px] font-semibold transition-colors disabled:cursor-default"
                  style={{ borderColor: borde, background: activa || revelaOk ? `color-mix(in oklab, ${borde} 10%, transparent)` : "transparent" }}
                >
                  {v ? "Sí" : "No"}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="min-w-0 rounded-2xl surface p-5 sm:p-6">
        <SectionTitle icon={PencilLine} eyebrow="Tu clasificación" title="Decide y comprueba" hint="Elige la clase y si lleva grupo de embalaje. Después compara." />
        {!revelado ? (
          <button
            onClick={() => setRevelado(true)}
            disabled={!listo}
            className="w-full inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
            style={{ background: ACENTO }}
          >
            <Eye className="h-4 w-4" /> Comprobar
          </button>
        ) : (
          <div className="rev-aparece">
            <div
              className="rounded-xl border p-3.5 text-[14px] leading-relaxed"
              style={{
                borderColor: `color-mix(in oklab, ${claseOk && geOk ? "var(--av-green-400)" : "var(--av-amber-400)"} 32%, transparent)`,
                background: `color-mix(in oklab, ${claseOk && geOk ? "var(--av-green-400)" : "var(--av-amber-400)"} 8%, transparent)`,
              }}
            >
              <span className="font-semibold">{claseOk && geOk ? "Correcto. " : claseOk ? "La clase sí; el grupo de embalaje no. " : "La clase no era esa. "}</span>
              {caso.respuesta}
            </div>
            <p className="mt-3 mb-0 text-[13.5px] text-foreground/90 leading-relaxed">{caso.explicacion}</p>
            {caso.embalaje && (
              <p className="mt-2 mb-0 text-[12.5px] text-muted-foreground leading-relaxed">
                <span className="font-semibold">Embalaje y transporte:</span> {caso.embalaje}
              </p>
            )}
            <MarcarResuelto isDone={isDone} saving={saving} onDone={onDone} />
          </div>
        )}
      </section>
    </div>
  )
}
