import { useState } from "react"
import { Info, Mic, Square, Trash2 } from "lucide-react"
import { appButtonClass } from "@/lib/buttonStyles"
import { contarPalabras, useSpeechToText } from "@/hooks/useSpeechToText"
import {
  borrarRespuestaHablada,
  darConsentimiento,
  guardarRespuestaHablada,
  tieneConsentimiento,
  type RespuestaHabladaGuardada,
} from "@/lib/dictado"
import { ConsentimientoDictado } from "./ConsentimientoDictado"
import { registrarEstudioDiario } from "@/lib/activity"

/**
 * Responder hablando una pregunta de la Parte 1 del TEA.
 *
 * Lo que se muestra son HECHOS, no juicios: la transcripción tal cual salió,
 * cuánto habló y cuántas palabras dijo. Nada de convertir eso en una nota de
 * pronunciación: esa señal la contaminan el micrófono, el ruido y el propio
 * reconocedor, y una nota inventada sería justo lo que no se puede hacer.
 *
 * La transcripción va al lado de la respuesta modelo, nunca en su lugar: la
 * gracia de la pantalla es comparar lo que dijiste con lo que se esperaba.
 */
export function RespuestaHablada({
  questionId,
  guardada,
  onGuardar,
  onBorrar,
}: {
  questionId: string
  guardada: RespuestaHabladaGuardada | null
  onGuardar: (r: RespuestaHabladaGuardada) => void
  onBorrar: () => void
}) {
  const dictado = useSpeechToText("en-US")
  const [pidiendoPermiso, setPidiendoPermiso] = useState(false)
  const [prefiereEscribir, setPrefiereEscribir] = useState(false)

  function alPulsarHablar(): void {
    if (!tieneConsentimiento()) {
      setPidiendoPermiso(true)
      return
    }
    dictado.limpiar()
    dictado.empezar()
  }

  function alParar(): void {
    dictado.parar()
    const texto = dictado.texto.trim()
    if (texto === "") return
    const r: RespuestaHabladaGuardada = {
      question_id: questionId,
      transcript: texto,
      palabras: contarPalabras(texto),
      segundos: dictado.segundos,
      confianza: dictado.confianza,
    }
    onGuardar(r)
    void guardarRespuestaHablada(r)
    void registrarEstudioDiario("icao-entrevista")
  }

  function alBorrar(): void {
    dictado.limpiar()
    onBorrar()
    void borrarRespuestaHablada(questionId)
  }

  // Firefox no tiene la API. En vez de un botón que no hace nada, se dice.
  if (!dictado.soportado) {
    return (
      <Aviso>
        Tu navegador no permite dictado. Funciona en Chrome, Edge y Safari. Mientras tanto puedes
        responder en voz alta y compararte con la respuesta modelo tú mismo.
      </Aviso>
    )
  }

  if (prefiereEscribir) {
    return (
      <Aviso>
        Sin problema. Responde en voz alta y compárate con la respuesta modelo. Si cambias de idea,
        recarga la pantalla y vuelve a intentarlo.
      </Aviso>
    )
  }

  const enVivo = dictado.escuchando
  const hayTexto = enVivo ? dictado.texto || dictado.parcial : (guardada?.transcript ?? "")

  return (
    <>
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
            setPrefiereEscribir(true)
          }}
        />
      )}

      <div
        className="rounded-2xl border p-4"
        style={{
          borderColor: enVivo
            ? "color-mix(in oklab, var(--av-red-400) 40%, transparent)"
            : "color-mix(in oklab, var(--border) 70%, transparent)",
          background: enVivo
            ? "color-mix(in oklab, var(--av-red-400) 5%, transparent)"
            : "transparent",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-[13px] font-semibold flex items-center gap-1.5">
            <Mic className="h-3 w-3" />
            {enVivo ? "Escuchando" : guardada ? "Lo que dijiste" : "Responde hablando"}
          </div>

          <div className="flex items-center gap-2">
            {enVivo ? (
              <button
                type="button"
                onClick={alParar}
                className={appButtonClass({ variant: "secondary" }, "cursor-pointer")}
              >
                <Square className="h-3.5 w-3.5" /> Terminar
              </button>
            ) : (
              <button
                type="button"
                onClick={alPulsarHablar}
                className={appButtonClass({ variant: "secondary" }, "cursor-pointer")}
              >
                <Mic className="h-3.5 w-3.5" /> {guardada ? "Responder otra vez" : "Responder hablando"}
              </button>
            )}
            {guardada && !enVivo && (
              <button
                type="button"
                onClick={alBorrar}
                aria-label="Borrar lo que dijiste"
                title="Borrar lo que dijiste"
                className={appButtonClass({ variant: "ghost" }, "cursor-pointer px-2.5")}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {dictado.error && (
          <p className="mt-2 text-[13px]" style={{ color: "var(--av-warn-fg)" }}>
            {mensajeDeError(dictado.error)}
          </p>
        )}

        {hayTexto !== "" && (
          <>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">
              {enVivo ? (
                <>
                  {dictado.texto}
                  {dictado.parcial && (
                    <span className="text-muted-foreground"> {dictado.parcial}</span>
                  )}
                </>
              ) : (
                hayTexto
              )}
            </p>

            {/* Hechos, no juicios: cuánto habló y cuántas palabras dijo. */}
            {!enVivo && guardada && (
              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-muted-foreground tabular-nums">
                <span>{guardada.segundos} segundos</span>
                <span>{guardada.palabras} palabras</span>
              </div>
            )}
          </>
        )}

        {!enVivo && !guardada && hayTexto === "" && (
          <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
            Contesta en inglés, como en el examen. Al terminar te escribimos lo que entendimos para
            que lo compares con la respuesta modelo.
          </p>
        )}

        {guardada && !enVivo && (
          <p className="mt-2.5 text-[12px] text-muted-foreground leading-relaxed">
            Esto es lo que el sistema entendió de lo que dijiste. Si hay partes que no reconoció,
            puede ser tu pronunciación, el micrófono o el ruido de fondo.
          </p>
        )}
      </div>
    </>
  )
}

function Aviso({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl border p-4 flex items-start gap-2.5"
      style={{ borderColor: "color-mix(in oklab, var(--border) 70%, transparent)" }}
    >
      <Info className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" aria-hidden />
      <p className="text-[13px] text-muted-foreground leading-relaxed">{children}</p>
    </div>
  )
}

function mensajeDeError(e: string): string {
  if (e === "sin-permiso")
    return "No pudimos usar el micrófono. Revisa el permiso del navegador para este sitio."
  if (e === "sin-microfono") return "No encontramos un micrófono conectado."
  if (e === "sin-red") return "El reconocimiento necesita conexión y ahora mismo no la hay."
  return "El dictado se detuvo. Vuelve a intentarlo."
}
