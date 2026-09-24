import { useId, useState } from "react"
import { accentText } from "@/lib/tileColors"
import {
  BLOQUES_PLAIN,
  calificarEstandarOPlain,
  type BloquePlain,
  type EjEstandarOPlain,
} from "@/lib/comunicacionesPractica"
import { useRadio } from "@/hooks/useRadio"
import { Anuncio, ControlRadio, Explicacion, TarjetaEjercicio, Transcripcion, Veredicto } from "./piezas"
import { ACENTO, BOTON_PRIMARIO, BOTON_SECUNDARIO, ERROR, FOCO, OK, borde, tinte } from "./tokens"
import type { PropsEjercicio } from "./tipos"

type Clasificacion = "fraseologia" | "plain"

/**
 * 9. ¿Estándar o plain?: primero se decide si hay fraseología OACI para la
 * situación o si toca lenguaje claro. Si es lenguaje claro, se arma el mensaje
 * por bloques (problema, capacidad, necesidad, intención) eligiendo frases.
 *
 * El criterio es el del Doc 9432 3.2: la fraseología siempre que exista; el
 * lenguaje claro solo cuando no, y tan claro, breve e inequívoco como ella.
 */
export function EstandarOPlain({ item, perfil, modoExamen = false, onResultado, reproductor }: PropsEjercicio<EjEstandarOPlain>) {
  const radio = useRadio({ limiteRepeticiones: item.repeticiones ?? 2, modoExamen, perfil, reproductor })
  const [clasificacion, setClasificacion] = useState<Clasificacion | null>(null)
  const [elegidas, setElegidas] = useState<Partial<Record<BloquePlain, number>>>({})
  const [revisado, setRevisado] = useState(false)
  const base = useId()
  const perfilActivo = perfil ?? item.transmision?.perfil ?? "normal"
  const bloques = BLOQUES_PLAIN.filter((b) => item.bloques?.[b.id])
  const armar = item.clasificacion === "plain" && clasificacion !== null

  function clasificar(c: Clasificacion) {
    if (clasificacion) return
    setClasificacion(c)
    if (item.clasificacion === "fraseologia") {
      setRevisado(true)
      onResultado?.({ aciertos: c === item.clasificacion ? 1 : 0, total: 1 })
    }
  }

  function revisar() {
    if (!clasificacion) return
    const r = calificarEstandarOPlain(item, clasificacion, elegidas)
    setRevisado(true)
    onResultado?.({ aciertos: r.aciertos, total: r.total })
  }

  const resultado = revisado && clasificacion ? calificarEstandarOPlain(item, clasificacion, elegidas) : null
  const mensaje = bloques
    .map((b) => {
      const i = elegidas[b.id]
      return i === undefined ? null : item.bloques?.[b.id]?.opciones[i]
    })
    .filter(Boolean)
    .join(" ")

  return (
    <TarjetaEjercicio rotulo="¿Estándar o plain?" titulo={item.situacion} fuente={item.fuente}>
      {item.transmision && <ControlRadio radio={radio} transmisiones={item.transmision} perfil={perfilActivo} />}

      <div role="group" aria-label="¿Hay fraseología para esto?" className="grid gap-2 sm:grid-cols-2">
        {(
          [
            { id: "fraseologia", texto: "Hay fraseología OACI" },
            { id: "plain", texto: "Va en lenguaje claro (plain)" },
          ] as const
        ).map((o) => {
          const on = clasificacion === o.id
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              disabled={clasificacion !== null}
              onClick={() => clasificar(o.id)}
              className={`min-h-[52px] rounded-xl border px-4 text-left text-[14.5px] font-semibold text-foreground disabled:cursor-default ${FOCO}`}
              style={{ borderColor: on ? ACENTO : "var(--border)", background: on ? tinte(ACENTO, 12) : "transparent" }}
            >
              {o.texto}
            </button>
          )
        })}
      </div>

      {clasificacion && (
        <Anuncio>
          <Veredicto
            ok={clasificacion === item.clasificacion}
            texto={
              clasificacion === item.clasificacion
                ? "Bien clasificada"
                : item.clasificacion === "fraseologia"
                  ? "Sí hay fraseología para esto"
                  : "No hay frase OACI para esto: va en lenguaje claro"
            }
          />
        </Anuncio>
      )}

      {armar && (
        <div className="grid gap-4">
          <p className="m-0 text-[13px] text-muted-foreground">
            Arma el mensaje en lenguaje claro. Rótulo: PLAIN LANGUAGE, no es fraseología OACI.
          </p>
          {bloques.map((b) => {
            const def = item.bloques?.[b.id]
            if (!def) return null
            const ok = resultado?.bloques.find((x) => x.id === b.id)?.ok
            return (
              <fieldset key={b.id} className="grid gap-2 rounded-xl border p-3" style={{ borderColor: ok === undefined ? "var(--border)" : borde(ok ? OK : ERROR) }}>
                <legend className="px-1 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: accentText(ACENTO) }}>
                  {b.etiqueta} · {b.pregunta}
                </legend>
                {def.opciones.map((op, i) => (
                  <label key={i} className="flex items-start gap-2.5 text-[14px] leading-snug text-foreground">
                    <input
                      type="radio"
                      name={`${base}-${b.id}`}
                      checked={elegidas[b.id] === i}
                      disabled={revisado}
                      onChange={() => setElegidas((e) => ({ ...e, [b.id]: i }))}
                      className={`mt-0.5 ${FOCO}`}
                    />
                    <span lang="en">{op}</span>
                  </label>
                ))}
                {ok !== undefined && (
                  <Veredicto ok={ok} texto={ok ? "Bien" : `Mejor: ${def.opciones[def.correcta]}`} />
                )}
              </fieldset>
            )
          })}
          {mensaje && (
            <div className="rounded-xl border p-4" style={{ borderColor: borde(ACENTO, 30) }}>
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Tu mensaje</div>
              <p className="m-0 text-[14.5px] leading-relaxed text-foreground" lang="en">
                {mensaje}
              </p>
            </div>
          )}
          {!revisado && (
            <button
              type="button"
              onClick={revisar}
              disabled={bloques.some((b) => elegidas[b.id] === undefined)}
              className={`${BOTON_PRIMARIO} justify-self-start`}
              style={{ background: ACENTO }}
            >
              Revisar mensaje
            </button>
          )}
        </div>
      )}

      <Anuncio>
        {revisado && resultado && (
          <div className="grid gap-3">
            {item.frase && (
              <div className="rounded-xl border p-4" style={{ borderColor: borde(ACENTO, 30) }}>
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">La frase</div>
                <p className="m-0 text-[14.5px] leading-relaxed text-foreground" lang="en">
                  {item.frase}
                </p>
              </div>
            )}
            <Explicacion puntaje={`${resultado.aciertos} de ${resultado.total}`}>{item.explicacion}</Explicacion>
            {!modoExamen && (
              <button
                type="button"
                className={`${BOTON_SECUNDARIO} justify-self-start`}
                onClick={() => {
                  setClasificacion(null)
                  setElegidas({})
                  setRevisado(false)
                }}
              >
                Volver a intentarlo
              </button>
            )}
          </div>
        )}
      </Anuncio>
      {item.transmision && <Transcripcion transmisiones={[item.transmision]} visible={revisado || radio.fuente === "texto"} />}
    </TarjetaEjercicio>
  )
}
