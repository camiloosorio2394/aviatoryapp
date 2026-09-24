import { useId, useState } from "react"
import { Mic, PenLine, Square } from "lucide-react"
import { calificarReadback, type EjReadback, type ResultadoReadback } from "@/lib/comunicacionesPractica"
import { darConsentimiento, tieneConsentimiento } from "@/lib/dictado"
import { useRadio } from "@/hooks/useRadio"
import { useSpeechToText } from "@/hooks/useSpeechToText"
import { ConsentimientoDictado } from "@/components/icao/ConsentimientoDictado"
import { Anuncio, ControlRadio, Explicacion, TarjetaEjercicio, Transcripcion, Veredicto } from "./piezas"
import { ACENTO, BOTON_PRIMARIO, BOTON_SECUNDARIO, FOCO } from "./tokens"
import type { PropsEjercicio } from "./tipos"

/**
 * 2. Readback con la voz: escucha, colaciona hablando (reconocimiento en
 * inglés) y se revisa que estén los elementos críticos del guion. Los números
 * se aceptan dichos en palabras («two four zero», «tree», «niner», «fife»).
 *
 * Sin reconocimiento de voz (Firefox), sin permiso o si falla, se colaciona
 * escribiendo. El consentimiento es el mismo del dictado del TEA: el audio
 * sale hacia Google o Apple y el piloto lo sabe antes de hablar.
 */
export function ReadbackVoz({ item, perfil, modoExamen = false, onResultado, reproductor }: PropsEjercicio<EjReadback>) {
  const radio = useRadio({ limiteRepeticiones: item.repeticiones ?? 2, modoExamen, perfil, reproductor })
  const dictado = useSpeechToText("en-US")
  const [escrito, setEscrito] = useState("")
  const [modoEscrito, setModoEscrito] = useState(false)
  const [pidiendoPermiso, setPidiendoPermiso] = useState(false)
  const [resultado, setResultado] = useState<ResultadoReadback | null>(null)
  const idTexto = useId()
  const perfilActivo = perfil ?? item.transmision.perfil

  const puedeHablar = dictado.soportado && dictado.error === null
  const escribiendo = modoEscrito || !puedeHablar
  const colacion = escribiendo ? escrito : dictado.texto

  function grabar() {
    if (!tieneConsentimiento()) {
      setPidiendoPermiso(true)
      return
    }
    dictado.limpiar()
    dictado.empezar()
  }

  function revisar() {
    if (dictado.escuchando) dictado.parar()
    const r = calificarReadback(item, colacion)
    setResultado(r)
    onResultado?.({ aciertos: r.presentes.length, total: item.elementos.length })
  }

  function reiniciar() {
    setResultado(null)
    setEscrito("")
    dictado.limpiar()
  }

  const errorDictado =
    dictado.error === "sin-permiso"
      ? "El navegador no dio permiso para el micrófono. Colaciona escribiendo."
      : dictado.error === "sin-microfono"
        ? "No se encontró micrófono. Colaciona escribiendo."
        : dictado.error === "sin-red"
          ? "El reconocimiento de voz necesita conexión. Colaciona escribiendo."
          : dictado.error
            ? "El reconocimiento de voz falló. Colaciona escribiendo."
            : null

  return (
    <TarjetaEjercicio rotulo="Readback" titulo="Escucha y colaciona" fuente={item.fuente}>
      <ControlRadio radio={radio} transmisiones={item.transmision} perfil={perfilActivo} />

      <div className="grid gap-3">
        {!dictado.soportado && (
          <p className="m-0 text-[12.5px] text-muted-foreground">
            Este navegador no reconoce voz. Escribe la colación como la dirías.
          </p>
        )}
        {errorDictado && <p className="m-0 text-[12.5px] text-muted-foreground">{errorDictado}</p>}

        {!escribiendo && (
          <div className="flex flex-wrap items-center gap-2">
            {dictado.escuchando ? (
              <button type="button" onClick={dictado.parar} className={BOTON_SECUNDARIO}>
                <Square className="h-4 w-4" aria-hidden="true" /> Terminar
              </button>
            ) : (
              <button
                type="button"
                onClick={grabar}
                disabled={!!resultado}
                className={BOTON_PRIMARIO}
                style={{ background: ACENTO }}
              >
                <Mic className="h-4 w-4" aria-hidden="true" /> {dictado.texto ? "Grabar otra vez" : "Colacionar hablando"}
              </button>
            )}
            <button type="button" onClick={() => setModoEscrito(true)} className={BOTON_SECUNDARIO} disabled={!!resultado}>
              <PenLine className="h-4 w-4" aria-hidden="true" /> Prefiero escribir
            </button>
          </div>
        )}

        {!escribiendo && (dictado.texto || dictado.parcial) && (
          <p className="m-0 rounded-lg border p-3 text-[14.5px] leading-relaxed text-foreground" style={{ borderColor: "var(--border)" }} lang="en">
            {dictado.texto} <span className="text-muted-foreground">{dictado.parcial}</span>
          </p>
        )}

        {escribiendo && (
          <div className="grid gap-1.5">
            <label htmlFor={idTexto} className="text-[12.5px] font-semibold text-foreground">
              Tu colación
            </label>
            <textarea
              id={idTexto}
              lang="en"
              rows={3}
              value={escrito}
              readOnly={!!resultado}
              onChange={(e) => setEscrito(e.target.value)}
              placeholder="Como la dirías en la radio, en inglés"
              className={`rounded-lg border bg-transparent p-3 text-[15px] leading-relaxed text-foreground ${FOCO}`}
              style={{ borderColor: "var(--border)" }}
            />
            {puedeHablar && !resultado && (
              <button type="button" onClick={() => setModoEscrito(false)} className={`${BOTON_SECUNDARIO} justify-self-start`}>
                <Mic className="h-4 w-4" aria-hidden="true" /> Mejor hablando
              </button>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {!resultado ? (
            <button
              type="button"
              onClick={revisar}
              disabled={colacion.trim() === ""}
              className={BOTON_PRIMARIO}
              style={{ background: ACENTO }}
            >
              Revisar colación
            </button>
          ) : (
            !modoExamen && (
              <button type="button" onClick={reiniciar} className={BOTON_SECUNDARIO}>
                Volver a intentarlo
              </button>
            )
          )}
        </div>
      </div>

      <Anuncio>
        {resultado && (
          <div className="grid gap-3">
            <ul className="m-0 grid list-none gap-1.5 p-0">
              {item.elementos.map((el) => {
                const ok = resultado.presentes.includes(el.id)
                return (
                  <li key={el.id} className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2" style={{ borderColor: "var(--border)" }}>
                    <span className="text-[14px] text-foreground">{el.etiqueta}</span>
                    <Veredicto ok={ok} texto={ok ? "Está" : "Faltó"} />
                  </li>
                )
              })}
            </ul>
            <Explicacion
              puntaje={
                resultado.faltan.length === 0
                  ? "Colación completa"
                  : `Faltó ${resultado.faltan.length} de ${item.elementos.length}`
              }
            >
              {item.explicacion}
            </Explicacion>
            <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Colación modelo</div>
              <p className="m-0 text-[14.5px] leading-relaxed text-foreground" lang="en">
                {item.modelo}
              </p>
            </div>
          </div>
        )}
      </Anuncio>
      <Transcripcion transmisiones={[item.transmision]} visible={!!resultado || radio.fuente === "texto"} />

      {pidiendoPermiso && (
        <ConsentimientoDictado
          onAceptar={() => {
            darConsentimiento()
            setPidiendoPermiso(false)
            dictado.limpiar()
            dictado.empezar()
          }}
          onRechazar={() => {
            setPidiendoPermiso(false)
            setModoEscrito(true)
          }}
        />
      )}
    </TarjetaEjercicio>
  )
}
