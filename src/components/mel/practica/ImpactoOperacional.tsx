import { useState } from "react"
import { accentText } from "@/lib/tileColors"
import {
  alternarCapacidad,
  CAPACIDADES,
  calificarImpacto,
  type CapacidadMel,
  type EjImpactoOperacional,
  type ResultadoImpacto,
} from "@/lib/melPractica"
import { EntradaMel } from "./EntradaMel"
import { Anuncio, BotonComprobar, BotonReintentar, Explicacion, Pregunta, TarjetaEjercicio, Veredicto } from "./piezas"
import { ACENTO, ERROR, FOCO, OK, borde, tinte } from "./tokens"
import type { PropsEjercicio } from "./tipos"

const TEXTO_ESTADO = { acierto: "Afecta", omitida: "Afecta: faltó", sobra: "No afecta" } as const

/**
 * f) Impacto operacional: dada la entrada, el piloto marca qué capacidades se
 * afectan (RVSM, CAT II/III, EDTO, PBN, performance, combustible,
 * meteorología o ninguna).
 */
export function ImpactoOperacional({ item, modoExamen = false, onResultado }: PropsEjercicio<EjImpactoOperacional>) {
  const [marcadas, setMarcadas] = useState<CapacidadMel[]>([])
  const [resultado, setResultado] = useState<ResultadoImpacto | null>(null)
  const corregido = resultado !== null
  const idPregunta = `imp-${item.id}`

  function comprobar() {
    const r = calificarImpacto(item, marcadas)
    setResultado(r)
    onResultado?.({ aciertos: r.aciertos, total: r.total })
  }

  return (
    <TarjetaEjercicio rotulo="Impacto operacional" titulo={item.contexto} fuente={item.fuente}>
      <EntradaMel entrada={item.entrada} resaltar={item.fila} />

      <div className="grid gap-2.5">
        <Pregunta id={idPregunta}>¿Qué capacidades afecta? Marca todas.</Pregunta>
        <div role="group" aria-labelledby={idPregunta} className="flex flex-wrap gap-2">
          {CAPACIDADES.map((c) => {
            const on = marcadas.includes(c.valor)
            const est = resultado?.estado[c.valor]
            const color = est === "acierto" ? OK : est ? ERROR : ACENTO
            const pintada = on || !!est
            return (
              <button
                key={c.valor}
                type="button"
                aria-pressed={on}
                disabled={corregido}
                onClick={() => setMarcadas((m) => alternarCapacidad(m, c.valor))}
                className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full border px-3.5 text-[13.5px] font-semibold disabled:cursor-default ${FOCO}`}
                style={{
                  borderColor: pintada ? borde(color, 60) : "var(--border)",
                  background: pintada ? tinte(color, 13) : "transparent",
                  color: pintada ? accentText(color) : "var(--foreground)",
                }}
              >
                {c.texto}
                {est && <span className="text-[11.5px] font-medium">· {TEXTO_ESTADO[est]}</span>}
              </button>
            )
          })}
        </div>
      </div>

      {!corregido && <BotonComprobar onClick={comprobar} disabled={marcadas.length === 0} />}

      <Anuncio>
        {resultado && (
          <div className="grid gap-3">
            <Veredicto ok={resultado.ok} texto={resultado.ok ? "Correcto" : `${resultado.aciertos} de ${resultado.total}`} />
            {item.porQue && (
              <ul className="m-0 grid list-none gap-1.5 p-0">
                {CAPACIDADES.filter((c) => item.porQue?.[c.valor]).map((c) => (
                  <li key={c.valor} className="text-[13.5px] leading-snug text-foreground">
                    <span className="font-semibold">{c.texto}: </span>
                    {item.porQue?.[c.valor]}
                  </li>
                ))}
              </ul>
            )}
            <Explicacion>{item.explicacion}</Explicacion>
            {!modoExamen && (
              <BotonReintentar
                onClick={() => {
                  setMarcadas([])
                  setResultado(null)
                }}
              />
            )}
          </div>
        )}
      </Anuncio>
    </TarjetaEjercicio>
  )
}
