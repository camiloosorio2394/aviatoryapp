import { useState } from "react"
import { CheckCircle2, ChevronRight, RotateCcw } from "lucide-react"
import { accentText } from "@/lib/tileColors"
import { rombo } from "@/lib/mercanciasClases"
import type { EjercicioEtiquetas } from "@/lib/mercanciasPractica"
import { ACENTO } from "@/components/mercancias/practica/comun"

// ─── Etiquetas: ejercicio por rondas ─────────────────────────────────────────

/**
 * Un ejercicio de etiquetas: una ronda a la vez, se responde, se ve la
 * explicación y se pasa a la siguiente. Al terminar, el marcador y el ejercicio
 * queda resuelto. Las opciones pueden ser rombos o texto; el enunciado también
 * puede traer su rombo.
 */
export function Etiquetas({
  ejercicio,
  n,
  total,
  isDone,
  onFinish,
}: {
  ejercicio: EjercicioEtiquetas
  n: number
  total: number
  isDone: boolean
  onFinish: () => void
}) {
  const [ronda, setRonda] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [aciertos, setAciertos] = useState(0)
  const [fin, setFin] = useState(false)
  const r = ejercicio.rondas[ronda]
  const rondas = ejercicio.rondas.length

  function elegir(i: number) {
    if (picked !== null) return
    setPicked(i)
    if (i === r.correcta) setAciertos((a) => a + 1)
  }

  function siguiente() {
    if (ronda >= rondas - 1) {
      setFin(true)
      onFinish()
      return
    }
    setRonda((x) => x + 1)
    setPicked(null)
  }

  function repetir() {
    setRonda(0)
    setPicked(null)
    setAciertos(0)
    setFin(false)
  }

  return (
    <section className="min-w-0 rounded-2xl surface p-5 sm:p-6">
      <header>
        <div className="np-rotulo">
          Etiquetas · ejercicio {n} de {total}
        </div>
        <h2 className="np-display mt-1.5 text-[26px] sm:text-[30px] font-semibold leading-none">{ejercicio.titulo}</h2>
        <p className="mt-2.5 text-[14px] text-muted-foreground leading-relaxed max-w-[720px]">{ejercicio.descripcion}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="np-badge tabular">
            Ronda {Math.min(ronda + 1, rondas)} de {rondas}
          </span>
          <span className="np-badge tabular">Aciertos: {aciertos}</span>
          {isDone && (
            <span className="np-badge np-badge-on">
              <CheckCircle2 className="h-3.5 w-3.5" /> Resuelto
            </span>
          )}
        </div>
      </header>

      {fin ? (
        <div className="mt-6 rounded-xl border p-5 text-center" style={{ borderColor: "var(--border)" }}>
          <div className="np-rotulo">Marcador</div>
          <div className="tabular mt-1 text-[40px] font-semibold leading-none" style={{ color: ACENTO }}>
            {aciertos} / {rondas}
          </div>
          <p className="mt-3 text-[13.5px] text-muted-foreground max-w-[520px] mx-auto leading-relaxed">
            {aciertos === rondas
              ? "Todas. Ya reconoces estas etiquetas sin pensarlo."
              : aciertos >= Math.ceil(rondas * 0.7)
                ? "Bien. Repite el ejercicio hasta que las falladas salgan solas."
                : "Vuelve a la lección 06 y repite: reconocer un rombo tiene que ser automático."}
          </p>
          <button
            onClick={repetir}
            className="mt-4 inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[14px] font-semibold text-white border-0"
            style={{ background: ACENTO }}
          >
            <RotateCcw className="h-4 w-4" /> Repetir el ejercicio
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] items-start">
          <div className="min-w-0">
            <div className="np-rotulo mb-2.5">Enunciado</div>
            <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
              {r.imagen && (
                <img
                  src={rombo(r.imagen)}
                  alt="Etiqueta a reconocer"
                  width={160}
                  height={160}
                  className="mx-auto block h-[160px] w-[160px] object-contain"
                />
              )}
              <p className={`m-0 text-[16px] font-medium leading-[1.55] ${r.imagen ? "mt-4 text-center" : ""}`}>{r.enunciado}</p>
            </div>
          </div>

          <div className="min-w-0">
            <div className="np-rotulo mb-2.5">Elige</div>
            <div className={`grid gap-2.5 ${r.opciones[0]?.imagen ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1"}`}>
              {r.opciones.map((op, i) => {
                const elegida = picked === i
                const esLaBuena = i === r.correcta
                const revelada = picked !== null && (elegida || esLaBuena)
                const tono = esLaBuena ? "var(--av-green-400)" : "var(--av-red-400)"
                return (
                  <button
                    key={i}
                    onClick={() => elegir(i)}
                    aria-pressed={elegida}
                    disabled={picked !== null}
                    className="rounded-xl border p-3 text-left transition-colors disabled:cursor-default"
                    style={{
                      borderColor: revelada ? `color-mix(in oklab, ${tono} 45%, transparent)` : "var(--border)",
                      background: revelada ? `color-mix(in oklab, ${tono} 10%, transparent)` : "transparent",
                    }}
                  >
                    {op.imagen ? (
                      <img src={rombo(op.imagen)} alt={`Opción ${i + 1}`} width={96} height={96} className="mx-auto block h-[96px] w-[96px] object-contain" />
                    ) : (
                      <span className="flex items-start gap-2.5 text-[14.5px] leading-[1.5]">
                        <span className="mono shrink-0 text-[12px] font-semibold text-muted-foreground">{String.fromCharCode(97 + i)}</span>
                        <span>{op.texto}</span>
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {picked !== null && (
              <div className="rev-aparece mt-4 rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
                <div
                  className="text-[13px] font-semibold"
                  style={{ color: accentText(picked === r.correcta ? "var(--av-green-400)" : "var(--av-amber-400)") }}
                >
                  {picked === r.correcta ? "Correcto." : "No es esa."}
                </div>
                <p className="m-0 mt-1 text-[14px] leading-relaxed text-foreground/90">{r.explicacion}</p>
                {r.ref && <div className="mono mt-2 text-[11px] text-muted-foreground">Referencia: {r.ref}</div>}
                <button
                  onClick={siguiente}
                  className="mt-4 inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[14px] font-semibold text-white border-0"
                  style={{ background: ACENTO }}
                >
                  {ronda >= rondas - 1 ? "Ver el marcador" : "Siguiente ronda"} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
