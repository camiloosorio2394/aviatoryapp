import { DECISIONES, type DecisionDespacho } from "@/lib/melPractica"
import { Opcion, Pregunta } from "./piezas"

/**
 * Las tres respuestas de despacho: «Sí, cumpliendo las condiciones», «No» y
 * «Falta información». La usan «¿Podemos salir?» y «Combinados».
 */
export function Decision({
  id,
  pregunta,
  valor,
  correcta,
  corregido,
  onElegir,
}: {
  id: string
  pregunta: string
  valor: DecisionDespacho | null
  correcta: DecisionDespacho
  corregido: boolean
  onElegir: (d: DecisionDespacho) => void
}) {
  return (
    <div className="grid gap-2.5">
      <Pregunta id={id}>{pregunta}</Pregunta>
      <div role="group" aria-labelledby={id} className="grid gap-2 sm:grid-cols-3">
        {DECISIONES.map((d, i) => {
          const marcada = valor === d.valor
          const esBuena = d.valor === correcta
          return (
            <Opcion
              key={d.valor}
              texto={d.texto}
              indice={i}
              marcada={marcada}
              deshabilitada={corregido}
              estado={!corregido ? (marcada ? "elegida" : "neutra") : esBuena ? "correcta" : marcada ? "error" : "neutra"}
              onClick={() => onElegir(d.valor)}
            />
          )
        })}
      </div>
    </div>
  )
}
