import { useState } from "react"
import { Hand } from "lucide-react"
import { calificarEsParaMi, type EjEsParaMi, type ResultadoEsParaMi } from "@/lib/comunicacionesPractica"
import { useRadio } from "@/hooks/useRadio"
import { accentText } from "@/lib/tileColors"
import { Anuncio, ControlRadio, Explicacion, TarjetaEjercicio, Veredicto } from "./piezas"
import { ACENTO, BOTON_PRIMARIO, BOTON_SECUNDARIO, ERROR, FOCO, borde, tinte } from "./tokens"
import type { PropsEjercicio } from "./tipos"

/**
 * 3. ¿Es para mí?: frecuencia congestionada con distintivos parecidos. Suena
 * la secuencia seguida y el piloto toca «Es para mí» solo mientras suena una
 * suya. Se puntúan aciertos, omisiones y falsas alarmas.
 *
 * Si el navegador no puede reproducir nada, la secuencia se muestra escrita y
 * se marca en la lista.
 */
export function EsParaMi({ item, perfil, modoExamen = false, onResultado, reproductor }: PropsEjercicio<EjEsParaMi>) {
  const radio = useRadio({ limiteRepeticiones: item.repeticiones ?? 0, modoExamen, perfil, reproductor })
  const [marcadas, setMarcadas] = useState<number[]>([])
  const [termino, setTermino] = useState(false)
  const [resultado, setResultado] = useState<ResultadoEsParaMi | null>(null)
  const txs = item.transmisiones.map((t) => t.transmision)
  const perfilActivo = perfil ?? txs[0]?.perfil ?? "normal"
  const sinAudio = radio.fuente === "texto"

  function alternar(i: number) {
    if (resultado) return
    setMarcadas((m) => (m.includes(i) ? m.filter((x) => x !== i) : [...m, i]))
  }

  function revisar() {
    const r = calificarEsParaMi(item, marcadas)
    setResultado(r)
    onResultado?.({ aciertos: r.correctas, total: r.total })
  }

  const indice = radio.sonandoIndice
  const actualMarcada = indice !== null && marcadas.includes(indice)

  return (
    <TarjetaEjercicio rotulo="¿Es para mí?" titulo={`Eres ${item.distintivo}. Toca solo cuando te llamen a ti`} fuente={item.fuente}>
      <ControlRadio
        radio={radio}
        transmisiones={txs}
        perfil={perfilActivo}
        etiqueta="Empezar a escuchar"
        bloqueado={!!resultado}
        alTerminar={() => setTermino(true)}
      />

      {!sinAudio && (
        <button
          type="button"
          onClick={() => indice !== null && alternar(indice)}
          disabled={!radio.sonando || indice === null || !!resultado}
          aria-pressed={actualMarcada}
          className={`inline-flex min-h-[72px] w-full items-center justify-center gap-3 rounded-2xl border-2 text-[18px] font-semibold transition-colors disabled:opacity-40 ${FOCO}`}
          style={{
            borderColor: ACENTO,
            background: actualMarcada ? ACENTO : tinte(ACENTO, 8),
            color: actualMarcada ? "white" : accentText(ACENTO),
          }}
        >
          <Hand className="h-6 w-6" aria-hidden="true" />
          {actualMarcada ? "Marcada como mía" : "Es para mí"}
        </button>
      )}

      {sinAudio && !resultado && (
        <fieldset className="grid gap-2 border-0 p-0">
          <legend className="mb-2 text-[13px] text-foreground">Sin audio: marca las que son para ti.</legend>
          {item.transmisiones.map((t, i) => (
            <label key={t.transmision.id} className="flex items-start gap-2.5 rounded-lg border p-3 text-[14px]" style={{ borderColor: "var(--border)" }}>
              <input type="checkbox" checked={marcadas.includes(i)} onChange={() => alternar(i)} className={`mt-1 ${FOCO}`} />
              <span lang="en">{t.transmision.texto}</span>
            </label>
          ))}
        </fieldset>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {!resultado ? (
          <button
            type="button"
            onClick={revisar}
            disabled={!termino && !sinAudio}
            className={BOTON_PRIMARIO}
            style={{ background: ACENTO }}
          >
            Revisar
          </button>
        ) : (
          !modoExamen && (
            <button
              type="button"
              className={BOTON_SECUNDARIO}
              onClick={() => {
                setResultado(null)
                setMarcadas([])
                setTermino(false)
                radio.reiniciar()
              }}
            >
              Volver a intentarlo
            </button>
          )
        )}
        <span className="text-[12.5px] text-muted-foreground">
          {marcadas.length} {marcadas.length === 1 ? "marcada" : "marcadas"}
        </span>
      </div>

      <Anuncio>
        {resultado && (
          <div className="grid gap-3">
            <ul className="m-0 grid list-none gap-1.5 p-0">
              {item.transmisiones.map((t, i) => {
                const marcada = marcadas.includes(i)
                const ok = marcada === t.paraMi
                const nota = t.paraMi ? (marcada ? "Tuya, la marcaste" : "Tuya, se te pasó") : marcada ? "No era tuya" : "No era tuya, bien"
                return (
                  <li
                    key={`${t.transmision.id}-${i}`}
                    className="grid gap-1 rounded-lg border px-3 py-2"
                    style={{ borderColor: ok ? "var(--border)" : borde(ERROR, 45) }}
                  >
                    <Veredicto ok={ok} texto={nota} />
                    <span className="text-[13.5px] text-foreground" lang="en">
                      {t.transmision.texto}
                    </span>
                  </li>
                )
              })}
            </ul>
            <Explicacion
              puntaje={`${resultado.aciertos} aciertos, ${resultado.omisiones} omisiones, ${resultado.falsasAlarmas} falsas alarmas`}
            >
              {item.explicacion}
            </Explicacion>
          </div>
        )}
      </Anuncio>
    </TarjetaEjercicio>
  )
}
