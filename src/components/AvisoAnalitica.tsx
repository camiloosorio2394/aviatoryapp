import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  EVENTO_CONSENTIMIENTO,
  aceptarAnalitica,
  analiticaDisponible,
  leerConsentimiento,
  rechazarAnalitica,
} from "@/lib/analytics"

/**
 * El aviso de analítica: pregunta una vez, antes de cargar nada.
 *
 * Solo aparece si la analítica existe (hay clave de PostHog en el build) y el
 * piloto todavía no eligió. Aceptar y rechazar pesan lo mismo, y rechazar no
 * cambia nada de la app: sin trucos para empujar el sí.
 *
 * Hoy producción no tiene clave, así que este aviso no se ve.
 */
export function AvisoAnalitica() {
  const [visible, setVisible] = useState(() => analiticaDisponible() && leerConsentimiento() === null)

  // El pie de página puede volver a preguntar.
  useEffect(() => {
    const alCambiar = () => setVisible(analiticaDisponible() && leerConsentimiento() === null)
    window.addEventListener(EVENTO_CONSENTIMIENTO, alCambiar)
    return () => window.removeEventListener(EVENTO_CONSENTIMIENTO, alCambiar)
  }, [])

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Analítica de uso"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-xl border border-border bg-background p-4 shadow-lg sm:inset-x-6 sm:bottom-6"
    >
      <p className="text-[14px] leading-[1.5] text-foreground">
        ¿Nos dejas medir cómo se usa Aviatory? Con PostHog vemos qué pantallas se abren y dónde se
        traban los pilotos, sin grabar tu pantalla ni guardar lo que escribes. Solo se activa si
        aceptas, y puedes cambiarlo desde el pie de página.{" "}
        <Link to="/privacidad" className="underline hover:text-foreground">
          Política de privacidad
        </Link>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            rechazarAnalitica()
            setVisible(false)
          }}
          className="min-h-[40px] flex-1 rounded-lg border border-border px-4 text-[14px] font-medium hover:bg-muted"
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={() => {
            aceptarAnalitica()
            setVisible(false)
          }}
          className="min-h-[40px] flex-1 rounded-lg border border-border px-4 text-[14px] font-medium hover:bg-muted"
        >
          Aceptar
        </button>
      </div>
    </div>
  )
}
