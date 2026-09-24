import { useState } from "react"
import { calificarQueRespondes, type EjQueRespondes } from "@/lib/comunicacionesPractica"
import { useRadio } from "@/hooks/useRadio"
import { Anuncio, ControlRadio, Explicacion, TarjetaEjercicio, Transcripcion, Veredicto } from "./piezas"
import { BOTON_SECUNDARIO, ERROR, FOCO, OK, borde, tinte } from "./tokens"
import type { PropsEjercicio } from "./tipos"

/**
 * 5. ¿Qué respondes?: una situación a bordo, una transmisión y cuatro
 * respuestas. Al elegir se ve la buena y por qué.
 */
export function QueRespondes({ item, perfil, modoExamen = false, onResultado, reproductor }: PropsEjercicio<EjQueRespondes>) {
  const radio = useRadio({ limiteRepeticiones: item.repeticiones ?? 2, modoExamen, perfil, reproductor })
  const [elegida, setElegida] = useState<number | null>(null)
  const perfilActivo = perfil ?? item.transmision.perfil

  function elegir(i: number) {
    if (elegida !== null) return
    setElegida(i)
    onResultado?.({ aciertos: calificarQueRespondes(item, i) ? 1 : 0, total: 1 })
  }

  return (
    <TarjetaEjercicio rotulo="¿Qué respondes?" titulo={item.situacion} fuente={item.fuente}>
      <ControlRadio radio={radio} transmisiones={item.transmision} perfil={perfilActivo} />

      <div role="group" aria-label="Respuestas posibles" className="grid gap-2.5">
        {item.opciones.map((op, i) => {
          const esta = elegida === i
          const buena = i === item.correcta
          const revelada = elegida !== null && (esta || buena)
          const color = buena ? OK : ERROR
          return (
            <button
              key={i}
              type="button"
              onClick={() => elegir(i)}
              aria-pressed={esta}
              disabled={elegida !== null}
              className={`rounded-xl border p-3.5 text-left transition-colors disabled:cursor-default ${FOCO}`}
              style={{
                borderColor: revelada ? borde(color) : "var(--border)",
                background: revelada ? tinte(color) : "transparent",
              }}
            >
              <span className="flex items-start gap-2.5 text-[14.5px] leading-[1.5]">
                <span className="shrink-0 font-mono text-[12px] font-semibold text-muted-foreground">{String.fromCharCode(97 + i)}</span>
                <span lang="en">{op}</span>
              </span>
            </button>
          )
        })}
      </div>

      <Anuncio>
        {elegida !== null && (
          <div className="grid gap-3">
            <Veredicto ok={elegida === item.correcta} texto={elegida === item.correcta ? "Correcto" : "No es esa"} />
            <Explicacion>{item.explicacion}</Explicacion>
            {!modoExamen && (
              <button type="button" className={`${BOTON_SECUNDARIO} justify-self-start`} onClick={() => setElegida(null)}>
                Volver a intentarlo
              </button>
            )}
          </div>
        )}
      </Anuncio>
      <Transcripcion transmisiones={[item.transmision]} visible={elegida !== null || radio.fuente === "texto"} />
    </TarjetaEjercicio>
  )
}
