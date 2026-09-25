import { useState } from "react"
import {
  calificarLectura,
  calificarPasoLectura,
  sumarPartes,
  NOMBRE_PARTE,
  type EjLeeLaEntrada,
  type ParteEntrada,
  type RespuestaPaso,
} from "@/lib/melPractica"
import { EntradaMel } from "./EntradaMel"
import { Anuncio, BotonComprobar, BotonReintentar, Explicacion, Opcion, Pregunta, TarjetaEjercicio, Veredicto } from "./piezas"
import { estadoOpcion } from "./opciones"
import { BOTON_PRIMARIO, ACENTO } from "./tokens"
import type { PropsEjercicio } from "./tipos"

/**
 * a) Lee la entrada: la entrada en su tabla y una serie de pasos. En los de
 * «toca», el piloto señala la parte en la tabla; en los de opciones, responde
 * (sistema, categoría, instalados, requeridos, (M), (O), condiciones). Se
 * corrige paso por paso y al final se ve el puntaje por campo.
 */
export function LeeLaEntrada({ item, modoExamen = false, onResultado }: PropsEjercicio<EjLeeLaEntrada>) {
  const [indice, setIndice] = useState(0)
  const [respuestas, setRespuestas] = useState<Record<string, RespuestaPaso>>({})
  const [seleccion, setSeleccion] = useState<number[]>([])
  const [corregido, setCorregido] = useState(false)
  const [terminado, setTerminado] = useState(false)

  const paso = item.pasos[indice]
  const respuesta = respuestas[paso.id]
  const ok = corregido && calificarPasoLectura(paso, respuesta)
  const ultimo = indice === item.pasos.length - 1
  const idPregunta = `lee-${item.id}-${paso.id}`

  function responder(r: RespuestaPaso) {
    setRespuestas((prev) => ({ ...prev, [paso.id]: r }))
    setCorregido(true)
  }

  function tocar(p: ParteEntrada) {
    if (corregido || terminado || paso.tipo !== "toca") return
    responder(p)
  }

  function elegir(i: number) {
    if (corregido || paso.tipo !== "elige") return
    if (paso.correctas.length === 1) {
      setSeleccion([i])
      responder([i])
      return
    }
    setSeleccion((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]))
  }

  function siguiente() {
    if (ultimo) {
      setTerminado(true)
      onResultado?.(sumarPartes(calificarLectura(item, respuestas)))
      return
    }
    setIndice((i) => i + 1)
    setSeleccion([])
    setCorregido(false)
  }

  function reiniciar() {
    setIndice(0)
    setRespuestas({})
    setSeleccion([])
    setCorregido(false)
    setTerminado(false)
  }

  const partes = terminado ? calificarLectura(item, respuestas) : []
  const aciertos = partes.filter((x) => x.ok).length

  return (
    <TarjetaEjercicio rotulo="Lee la entrada" titulo={item.contexto} fuente={item.fuente}>
      <EntradaMel
        entrada={item.entrada}
        resaltar={item.fila}
        toca={
          paso.tipo === "toca" && !terminado
            ? {
                onTocar: tocar,
                deshabilitado: corregido,
                marca: corregido && typeof respuesta === "string" ? { parte: respuesta, ok } : null,
                correcta: corregido && !ok ? paso.parte : null,
              }
            : undefined
        }
      />

      {!terminado && (
        <div className="grid gap-3">
          <div className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Paso {indice + 1} de {item.pasos.length}
          </div>
          <Pregunta id={idPregunta}>{paso.enunciado}</Pregunta>

          {paso.tipo === "toca" ? (
            !corregido && (
              <p className="m-0 text-[13px] text-muted-foreground">Toca la parte en la tabla. Las que se pueden tocar tienen un borde punteado.</p>
            )
          ) : (
            <div role="group" aria-labelledby={idPregunta} className="grid gap-2">
              {paso.opciones.map((op, i) => {
                const multiple = paso.correctas.length > 1
                const marcada = seleccion.includes(i)
                return (
                  <Opcion
                    key={i}
                    texto={op}
                    indice={multiple ? undefined : i}
                    multiple={multiple}
                    marcada={marcada}
                    deshabilitada={corregido}
                    estado={estadoOpcion(marcada, paso.correctas.includes(i), corregido, multiple)}
                    onClick={() => elegir(i)}
                  />
                )
              })}
              {paso.correctas.length > 1 && !corregido && (
                <BotonComprobar onClick={() => responder(seleccion)} disabled={seleccion.length === 0} />
              )}
            </div>
          )}

          <Anuncio>
            {corregido && (
              <div className="grid gap-2">
                <Veredicto
                  ok={ok}
                  texto={
                    ok
                      ? "Correcto"
                      : paso.tipo === "toca"
                        ? `No. Era: ${NOMBRE_PARTE[paso.parte]}`
                        : "No. Mira las marcadas en verde"
                  }
                />
              </div>
            )}
          </Anuncio>

          {corregido && (
            <button type="button" onClick={siguiente} className={`${BOTON_PRIMARIO} justify-self-start`} style={{ background: ACENTO }}>
              {ultimo ? "Ver resultado" : "Siguiente"}
            </button>
          )}
        </div>
      )}

      <Anuncio>
        {terminado && (
          <div className="grid gap-3">
            <Veredicto ok={aciertos === partes.length} texto={`${aciertos} de ${partes.length} campos bien`} />
            <ul className="m-0 grid list-none gap-1 p-0">
              {item.pasos.map((p, i) => (
                <li key={p.id} className="flex items-start gap-2 text-[13.5px] leading-snug">
                  <Veredicto ok={partes[i].ok} texto={partes[i].ok ? "Bien" : "Mal"} />
                  <span className="text-foreground/90">{p.enunciado}</span>
                </li>
              ))}
            </ul>
            <Explicacion>{item.explicacion}</Explicacion>
            {!modoExamen && <BotonReintentar onClick={reiniciar} />}
          </div>
        )}
      </Anuncio>
    </TarjetaEjercicio>
  )
}
