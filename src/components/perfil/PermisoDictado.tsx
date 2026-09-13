import { useState } from "react"
import { Mic } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"
import { appButtonClass } from "@/lib/buttonStyles"
import { revocarConsentimiento, tieneConsentimiento } from "@/lib/dictado"

/**
 * Permiso de dictado.
 *
 * El consentimiento para responder hablando se guarda por dispositivo, así que
 * este bloque solo muestra y retira el de ESTE equipo, y lo dice. Retirarlo no
 * borra lo ya transcrito: para eso está el botón de borrar de cada pregunta, y
 * conviene no mezclar las dos cosas.
 */
export function PermisoDictado() {
  const [dado, setDado] = useState(() => tieneConsentimiento())

  return (
    <section className="mt-6">
      <SectionTitle
        icon={Mic}
        eyebrow="Permisos"
        title="Responder hablando"
        hint="El dictado del módulo de inglés ICAO, en este dispositivo."
      />
      <div className="surface rounded-xl p-5">
        <p className="text-[15px] leading-relaxed text-muted-foreground max-w-[680px]">
          {dado
            ? "Diste permiso para usar el micrófono y que tu navegador convierta a texto lo que dices. Aviatory guarda solo el texto, nunca el audio."
            : "No has dado permiso en este dispositivo. Se te va a pedir la primera vez que quieras responder hablando."}
        </p>
        {dado && (
          <button
            type="button"
            onClick={() => {
              revocarConsentimiento()
              setDado(false)
            }}
            className={appButtonClass({ variant: "secondary" }, "mt-4 cursor-pointer")}
          >
            Retirar el permiso
          </button>
        )}
        <p className="mt-3 text-[13px] text-muted-foreground max-w-[680px]">
          Retirarlo no borra las respuestas que ya transcribiste. Cada una se borra desde su propia
          pregunta.
        </p>
      </div>
    </section>
  )
}
