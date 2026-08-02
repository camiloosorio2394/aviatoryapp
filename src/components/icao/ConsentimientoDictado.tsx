import { Mic, PenLine } from "lucide-react"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { proveedorDeReconocimiento } from "@/lib/dictado"

/**
 * Consentimiento antes de la primera grabación.
 *
 * Va antes de pedir el micrófono, no después. El reconocedor del navegador es
 * gratis pero NO es local: el audio sale del dispositivo hacia los servidores
 * de Google o de Apple. Que no cueste dinero no significa que no salga, y el
 * piloto tiene que saberlo antes de hablar, no en un pie de página.
 */
export function ConsentimientoDictado({
  onAceptar,
  onRechazar,
}: {
  onAceptar: () => void
  onRechazar: () => void
}) {
  const proveedor = proveedorDeReconocimiento()

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-consentimiento-dictado"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgb(11 16 32 / 55%)" }}
    >
      <div className="surface rounded-xl w-full max-w-[480px] p-6">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{
            background: "color-mix(in oklab, var(--av-blue-500) 12%, transparent)",
            color: "var(--av-blue-500)",
          }}
        >
          <Mic className="h-5 w-5" />
        </div>

        <h2
          id="titulo-consentimiento-dictado"
          className="mt-3 text-[17px] font-semibold tracking-[-0.015em]"
        >
          Antes de responder hablando
        </h2>

        <ul className="mt-3 flex flex-col gap-2.5 text-[15px] leading-relaxed text-muted-foreground">
          <li>
            Vamos a usar tu micrófono para <span className="text-foreground">escribir lo que digas</span>{" "}
            y que puedas compararlo con la respuesta modelo.
          </li>
          <li>
            El reconocimiento no ocurre en tu equipo: tu navegador{" "}
            <span className="text-foreground">envía el audio a los servidores de {proveedor}</span>{" "}
            para convertirlo en texto. Aviatory no lo recibe.
          </li>
          <li>
            <span className="text-foreground">Solo guardamos el texto</span>, nunca el audio. Puedes
            borrar cualquier respuesta cuando quieras.
          </li>
        </ul>

        <p className="mt-3 text-[13px] text-muted-foreground">
          Puedes retirar este permiso en cualquier momento desde tu perfil.
        </p>

        <div className="mt-5 flex flex-col-reverse sm:flex-row gap-2">
          <button
            type="button"
            onClick={onRechazar}
            className={appButtonClass({ variant: "secondary", size: "lg" }, "flex-1 cursor-pointer")}
          >
            <PenLine className="h-4 w-4" /> Prefiero escribir
          </button>
          <button
            type="button"
            onClick={onAceptar}
            className={appButtonClass({ size: "lg" }, "flex-1 cursor-pointer")}
            style={appButtonStyle()}
          >
            <Mic className="h-4 w-4" /> Aceptar y hablar
          </button>
        </div>
      </div>
    </div>
  )
}
