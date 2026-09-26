import { useState } from "react"
import { calificarCombinados, type DecisionDespacho, type EjCombinados, type ResultadoCombinados } from "@/lib/melPractica"
import { Decision } from "./Decision"
import { EntradaMel } from "./EntradaMel"
import { Anuncio, BotonComprobar, BotonReintentar, Explicacion, FichaCaso, Opcion, Pregunta, TarjetaEjercicio, Veredicto } from "./piezas"
import type { PropsEjercicio } from "./tipos"

/**
 * d) Combinados: dos o tres ítems abiertos a la vez. El piloto decide si el
 * conjunto deja despachar y elige qué dependencia los cruza (MEL + MEL no
 * suma: se cruza).
 */
export function Combinados({ item, modoExamen = false, onResultado }: PropsEjercicio<EjCombinados>) {
  const [decision, setDecision] = useState<DecisionDespacho | null>(null)
  const [dependencia, setDependencia] = useState<number | null>(null)
  const [resultado, setResultado] = useState<ResultadoCombinados | null>(null)
  const corregido = resultado !== null

  function comprobar() {
    const r = calificarCombinados(item, decision, dependencia)
    setResultado(r)
    onResultado?.({ aciertos: r.aciertos, total: r.total })
  }

  function reiniciar() {
    setDecision(null)
    setDependencia(null)
    setResultado(null)
  }

  const idDep = `cb-${item.id}-dep`

  return (
    <TarjetaEjercicio rotulo="Ítems combinados" titulo={item.titulo} fuente={item.fuente}>
      {item.items.map((it, i) => (
        <div key={`${it.entrada.codigo}-${i}`} className="grid gap-2">
          <EntradaMel entrada={it.entrada} resaltar={it.fila} titulo={`Ítem abierto ${i + 1} de ${item.items.length}`} />
          <p className="m-0 text-[13.5px] leading-snug text-foreground">{it.estado}</p>
        </div>
      ))}
      <FichaCaso rotulo="El vuelo" lineas={item.vuelo} />

      <Decision
        id={`cb-${item.id}-decision`}
        pregunta="¿El conjunto permite el despacho?"
        valor={decision}
        correcta={item.decision}
        corregido={corregido}
        onElegir={(d) => !corregido && setDecision(d)}
      />

      <div className="grid gap-2.5">
        <Pregunta id={idDep}>¿Qué los cruza?</Pregunta>
        <div role="group" aria-labelledby={idDep} className="grid gap-2">
          {item.dependencia.opciones.map((op, i) => {
            const marcada = dependencia === i
            const esBuena = i === item.dependencia.correcta
            return (
              <Opcion
                key={i}
                texto={op}
                indice={i}
                marcada={marcada}
                deshabilitada={corregido}
                estado={!corregido ? (marcada ? "elegida" : "neutra") : esBuena ? "correcta" : marcada ? "error" : "neutra"}
                onClick={() => !corregido && setDependencia(i)}
              />
            )
          })}
        </div>
      </div>

      {!corregido && <BotonComprobar onClick={comprobar} disabled={decision === null || dependencia === null} />}

      <Anuncio>
        {resultado && (
          <div className="grid gap-3">
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <Veredicto ok={resultado.decisionOk} texto={resultado.decisionOk ? "Decisión correcta" : "Decisión equivocada"} />
              <Veredicto ok={resultado.dependenciaOk} texto={resultado.dependenciaOk ? "Dependencia correcta" : "Dependencia equivocada"} />
            </div>
            {item.decision === "si" && item.cumpliendo && (
              <p className="m-0 text-[14px] leading-relaxed text-foreground">
                <span className="font-semibold">Sí, cumpliendo: </span>
                {item.cumpliendo}
              </p>
            )}
            <Explicacion puntaje={`${resultado.aciertos} de ${resultado.total}`}>{item.explicacion}</Explicacion>
            {!modoExamen && <BotonReintentar onClick={reiniciar} />}
          </div>
        )}
      </Anuncio>
    </TarjetaEjercicio>
  )
}
