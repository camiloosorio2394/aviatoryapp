import { useState } from "react"
import { calificarHearback, type EjHearback } from "@/lib/comunicacionesPractica"
import { useRadio } from "@/hooks/useRadio"
import { Anuncio, ControlRadio, Explicacion, TarjetaEjercicio, Transcripcion, Veredicto } from "./piezas"
import { ACENTO, BOTON_SECUNDARIO, ERROR, FOCO, OK, borde, tinte } from "./tokens"
import type { PropsEjercicio } from "./tipos"

/**
 * 4. Hearback, tú eres el PM: suena la instrucción del ATC y después la
 * colación del compañero, que puede traer un error. Se marca «correcta» o se
 * señala el elemento equivocado. Es el cruce que el Doc 9432 2.8.3.8 le pide
 * al controlador, hecho desde la cabina.
 */
export function Hearback({ item, perfil, modoExamen = false, onResultado, reproductor }: PropsEjercicio<EjHearback>) {
  const radio = useRadio({ limiteRepeticiones: item.repeticiones ?? 1, modoExamen, perfil, reproductor })
  const [respuesta, setRespuesta] = useState<string | null>(null)
  const txs = [item.instruccion, item.colacion]
  const perfilActivo = perfil ?? item.instruccion.perfil
  const oido = radio.yaSono(txs) || radio.fuente === "texto"

  function responder(r: string) {
    if (respuesta !== null) return
    setRespuesta(r)
    onResultado?.({ aciertos: calificarHearback(item, r) ? 1 : 0, total: 1 })
  }

  const ok = respuesta !== null && calificarHearback(item, respuesta)
  const opciones = [{ id: "correcto", etiqueta: "La colación está bien" }, ...item.elementos.map((e) => ({ id: e.id, etiqueta: `Error en: ${e.etiqueta}` }))]

  return (
    <TarjetaEjercicio rotulo="Hearback · eres el PM" titulo="¿Tu compañero colacionó bien?" fuente={item.fuente}>
      <ControlRadio radio={radio} transmisiones={txs} perfil={perfilActivo} etiqueta="Escuchar ATC y colación" />

      <div role="group" aria-label="Tu veredicto" className="grid gap-2 sm:grid-cols-2">
        {opciones.map((o) => {
          const elegida = respuesta === o.id
          const buena = respuesta !== null && (item.error === null ? o.id === "correcto" : o.id === item.error)
          const color = buena ? OK : elegida ? ERROR : null
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => responder(o.id)}
              disabled={!oido || respuesta !== null}
              aria-pressed={elegida}
              className={`min-h-[48px] rounded-xl border px-3.5 text-left text-[14px] font-semibold text-foreground transition-colors disabled:cursor-default ${FOCO} ${!oido ? "opacity-40" : ""}`}
              style={{
                borderColor: color ? borde(color, 50) : o.id === "correcto" ? borde(ACENTO, 40) : "var(--border)",
                background: color ? tinte(color, 10) : "transparent",
              }}
            >
              {o.etiqueta}
            </button>
          )
        })}
      </div>
      {!oido && <p className="m-0 text-[12.5px] text-muted-foreground">Escucha primero las dos transmisiones.</p>}

      <Anuncio>
        {respuesta !== null && (
          <div className="grid gap-3">
            <Veredicto ok={ok} texto={ok ? "Bien cazado" : item.error === null ? "La colación estaba bien" : "El error estaba en otro elemento"} />
            <Explicacion>{item.explicacion}</Explicacion>
            {!modoExamen && (
              <button type="button" className={`${BOTON_SECUNDARIO} justify-self-start`} onClick={() => setRespuesta(null)}>
                Volver a intentarlo
              </button>
            )}
          </div>
        )}
      </Anuncio>
      <Transcripcion transmisiones={txs} visible={respuesta !== null || radio.fuente === "texto"} />
    </TarjetaEjercicio>
  )
}
