import { useState } from "react"
import { calificarPodemosSalir, type DecisionDespacho, type EjPodemosSalir, type ResultadoPodemosSalir } from "@/lib/melPractica"
import { Decision } from "./Decision"
import { EntradaMel } from "./EntradaMel"
import { Anuncio, BotonComprobar, BotonReintentar, Explicacion, FichaCaso, Opcion, Pregunta, TarjetaEjercicio, Veredicto } from "./piezas"
import { estadoOpcion } from "./opciones"
import type { PropsEjercicio } from "./tipos"

/**
 * b) ¿Podemos salir?: el defecto, la entrada, el estado del diferido y el
 * vuelo. El piloto decide (sí cumpliendo, no, falta información) y marca las
 * razones que la sostienen; varias pueden ser buenas.
 */
export function PodemosSalir({ item, modoExamen = false, onResultado }: PropsEjercicio<EjPodemosSalir>) {
  const [decision, setDecision] = useState<DecisionDespacho | null>(null)
  const [razones, setRazones] = useState<number[]>([])
  const [resultado, setResultado] = useState<ResultadoPodemosSalir | null>(null)
  const corregido = resultado !== null

  function alternar(i: number) {
    if (corregido) return
    setRazones((r) => (r.includes(i) ? r.filter((x) => x !== i) : [...r, i]))
  }

  function comprobar() {
    const r = calificarPodemosSalir(item, decision, razones)
    setResultado(r)
    onResultado?.({ aciertos: r.aciertos, total: r.total })
  }

  function reiniciar() {
    setDecision(null)
    setRazones([])
    setResultado(null)
  }

  const idRazones = `ps-${item.id}-razones`

  return (
    <TarjetaEjercicio rotulo="¿Podemos salir?" titulo={item.titulo} fuente={item.fuente}>
      <FichaCaso rotulo="Defecto" lineas={[item.defecto]} />
      <EntradaMel entrada={item.entrada} resaltar={item.fila} />
      <div className="grid gap-4 sm:grid-cols-2">
        <FichaCaso rotulo="Estado del diferido" lineas={item.estado} />
        <FichaCaso rotulo="El vuelo" lineas={item.vuelo} />
      </div>

      <Decision
        id={`ps-${item.id}-decision`}
        pregunta="¿Podemos salir?"
        valor={decision}
        correcta={item.decision}
        corregido={corregido}
        onElegir={(d) => !corregido && setDecision(d)}
      />

      <div className="grid gap-2.5">
        <Pregunta id={idRazones}>¿Por qué? Marca todas las razones que sostienen la decisión.</Pregunta>
        <div role="group" aria-labelledby={idRazones} className="grid gap-2">
          {item.razones.map((r, i) => {
            const marcada = razones.includes(i)
            return (
              <Opcion
                key={i}
                texto={r.texto}
                multiple
                marcada={marcada}
                deshabilitada={corregido}
                estado={estadoOpcion(marcada, r.correcta, corregido, true)}
                onClick={() => alternar(i)}
              />
            )
          })}
        </div>
      </div>

      {!corregido && <BotonComprobar onClick={comprobar} disabled={decision === null} />}

      <Anuncio>
        {resultado && (
          <div className="grid gap-3">
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <Veredicto ok={resultado.decisionOk} texto={resultado.decisionOk ? "Decisión correcta" : "Decisión equivocada"} />
              <Veredicto ok={resultado.razonesOk} texto={resultado.razonesOk ? "Razones completas" : "Razones incompletas o de más"} />
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
