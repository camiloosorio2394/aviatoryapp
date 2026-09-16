import { useEffect, useMemo, useState } from "react"
import { CheckCircle2, Link2, RotateCcw } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"
import { accentText } from "@/lib/tileColors"
import type { EscenarioMP } from "@/lib/mercanciasPractica"
import { ACENTO } from "@/components/mercancias/practica/comun"
import { PuntosModelo, MarcarResuelto } from "@/components/mercancias/practica/Piezas"

// ─── Escenarios ──────────────────────────────────────────────────────────────

/**
 * Un escenario no se responde escribiendo: se resuelve conectando cada elemento
 * de la situación con lo que le corresponde. Se toca una ficha de la izquierda
 * y su pareja de la derecha; si aciertan, las dos quedan unidas por el mismo
 * número. Cuando están todas, se abre la respuesta modelo.
 *
 * La columna de la derecha se baraja con una semilla sacada del id del
 * escenario, no con Math.random: el orden es el mismo para el mismo escenario y
 * no salta cuando React vuelve a pintar.
 */

type Estado = "libre" | "elegida" | "hecha" | "error"

/** Baraja estable: misma semilla, mismo orden, siempre. */
function barajar(n: number, semilla: string): number[] {
  let s = 0
  for (let i = 0; i < semilla.length; i++) s = (Math.imul(s, 31) + semilla.charCodeAt(i)) >>> 0
  const orden = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    s = (Math.imul(s, 1103515245) + 12345) >>> 0
    const j = s % (i + 1)
    const tmp = orden[i]
    orden[i] = orden[j]
    orden[j] = tmp
  }
  return orden
}

const COLOR: Record<Estado, { borde: string; fondo: string }> = {
  libre: { borde: "var(--border)", fondo: "transparent" },
  elegida: { borde: ACENTO, fondo: `color-mix(in oklab, ${ACENTO} 12%, transparent)` },
  hecha: {
    borde: "color-mix(in oklab, var(--av-green-400) 45%, transparent)",
    fondo: "color-mix(in oklab, var(--av-green-400) 10%, transparent)",
  },
  error: {
    borde: "color-mix(in oklab, var(--av-red-400) 50%, transparent)",
    fondo: "color-mix(in oklab, var(--av-red-400) 12%, transparent)",
  },
}

function Ficha({
  texto,
  estado,
  numero,
  onClick,
}: {
  texto: string
  estado: Estado
  numero?: number
  onClick: () => void
}) {
  const hecha = estado === "hecha"
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={hecha}
      aria-pressed={estado === "elegida"}
      className="mp-ficha flex w-full items-start gap-2 rounded-xl border p-2.5 text-left transition-[background-color,border-color,transform] duration-150 disabled:cursor-default"
      style={{ borderColor: COLOR[estado].borde, background: COLOR[estado].fondo }}
    >
      <span
        aria-hidden
        className="mono mt-[1px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] text-[10px] font-semibold"
        style={{
          background: hecha ? "var(--av-green-400)" : "color-mix(in oklab, var(--border) 55%, transparent)",
          color: hecha ? "#fff" : "var(--muted-foreground)",
        }}
      >
        {hecha ? numero : "·"}
      </span>
      <span className="text-[13px] leading-[1.45] text-foreground">{texto}</span>
    </button>
  )
}

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
  const pares = escenario.conexiones
  const orden = useMemo(() => barajar(pares.length, escenario.id), [pares.length, escenario.id])

  /** Índice de la pareja → en qué turno se conectó (el número que se ve). */
  const [hechas, setHechas] = useState<Record<number, number>>({})
  const [selIzq, setSelIzq] = useState<number | null>(null)
  const [selDer, setSelDer] = useState<number | null>(null)
  const [fallo, setFallo] = useState<{ izq: number; der: number } | null>(null)
  const [errores, setErrores] = useState(0)

  const listas = Object.keys(hechas).length
  const completo = listas === pares.length

  // El fallo se muestra un instante y se deshace solo: no hace falta otro clic
  // para volver a intentarlo.
  useEffect(() => {
    if (!fallo) return
    const t = window.setTimeout(() => {
      setFallo(null)
      setSelIzq(null)
      setSelDer(null)
    }, 700)
    return () => window.clearTimeout(t)
  }, [fallo])

  function intentar(izq: number, der: number): void {
    if (izq === der) {
      setHechas((h) => ({ ...h, [izq]: Object.keys(h).length + 1 }))
      setSelIzq(null)
      setSelDer(null)
      return
    }
    setErrores((e) => e + 1)
    setFallo({ izq, der })
  }

  function tocarIzq(i: number): void {
    if (fallo || hechas[i] !== undefined) return
    if (selDer !== null) {
      intentar(i, selDer)
      return
    }
    setSelIzq((s) => (s === i ? null : i))
  }

  function tocarDer(i: number): void {
    if (fallo || hechas[i] !== undefined) return
    if (selIzq !== null) {
      intentar(selIzq, i)
      return
    }
    setSelDer((s) => (s === i ? null : i))
  }

  function reiniciar(): void {
    setHechas({})
    setSelIzq(null)
    setSelDer(null)
    setFallo(null)
    setErrores(0)
  }

  function estadoIzq(i: number): Estado {
    if (hechas[i] !== undefined) return "hecha"
    if (fallo?.izq === i) return "error"
    return selIzq === i ? "elegida" : "libre"
  }

  function estadoDer(i: number): Estado {
    if (hechas[i] !== undefined) return "hecha"
    if (fallo?.der === i) return "error"
    return selDer === i ? "elegida" : "libre"
  }

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
        <SectionTitle
          icon={Link2}
          eyebrow="Tu turno"
          title="Conecta cada elemento"
          hint="Toca uno de la izquierda y su pareja de la derecha. La respuesta modelo se abre cuando estén todas."
        />

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-[13px] font-semibold text-foreground" aria-live="polite">
            <span className="tabular">{listas}</span> de <span className="tabular">{pares.length}</span> conectadas
          </div>
          {errores > 0 && (
            <div className="text-[12px] text-muted-foreground">
              <span className="tabular">{errores}</span> {errores === 1 ? "intento fallido" : "intentos fallidos"}
            </div>
          )}
        </div>
        <div
          className="mt-2 h-1.5 rounded-full overflow-hidden"
          style={{ background: "color-mix(in oklab, var(--border) 60%, transparent)" }}
          role="progressbar"
          aria-valuenow={listas}
          aria-valuemin={0}
          aria-valuemax={pares.length}
          aria-label="Parejas conectadas"
        >
          <div
            className="h-full rounded-full transition-[width] duration-200"
            style={{ width: `${(listas / pares.length) * 100}%`, background: completo ? "var(--av-green-400)" : ACENTO }}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="min-w-0">
            <div className="np-rotulo mb-2">En el escenario</div>
            <div className="flex flex-col gap-2">
              {pares.map((p, i) => (
                <Ficha key={p.izquierda} texto={p.izquierda} estado={estadoIzq(i)} numero={hechas[i]} onClick={() => tocarIzq(i)} />
              ))}
            </div>
          </div>
          <div className="min-w-0">
            <div className="np-rotulo mb-2">Lo que le corresponde</div>
            <div className="flex flex-col gap-2">
              {orden.map((i) => (
                <Ficha
                  key={pares[i].derecha}
                  texto={pares[i].derecha}
                  estado={estadoDer(i)}
                  numero={hechas[i]}
                  onClick={() => tocarDer(i)}
                />
              ))}
            </div>
          </div>
        </div>

        {!completo ? (
          <p className="mt-3 mb-0 text-[12px] text-muted-foreground leading-relaxed">
            {fallo
              ? "Esa no es. Mira otra vez qué parte del escenario estás resolviendo."
              : "Si fallas no pierdes nada: la pareja se libera y vuelves a intentarlo."}
          </p>
        ) : (
          <div className="mt-5 rev-aparece">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: accentText("var(--av-green-400)") }}>
                <CheckCircle2 className="h-3.5 w-3.5" /> Respuesta modelo
              </div>
              <button
                onClick={reiniciar}
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Rehacer
              </button>
            </div>
            <p className="mt-2 mb-0 text-[13px] text-foreground/90 leading-relaxed">{escenario.modelo}</p>
            <PuntosModelo puntos={escenario.puntos} />
            <MarcarResuelto isDone={isDone} saving={saving} onDone={onDone} />
          </div>
        )}
      </section>
    </div>
  )
}
