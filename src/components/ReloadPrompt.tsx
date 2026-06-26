import { useEffect, useRef } from "react"
import { useRegisterSW } from "virtual:pwa-register/react"
import { toast } from "sonner"
import { RefreshCw } from "lucide-react"

/**
 * Aviso de "nueva versión disponible".
 *
 * Con registerType: 'prompt' (vite.config.ts), el service worker descarga la
 * versión nueva en segundo plano pero NO recarga la página solo. Acá detectamos
 * ese estado (`needRefresh`) y mostramos un toast persistente con un botón
 * "Actualizar" que aplica la nueva versión y recarga.
 *
 * Notas:
 * - En dev el SW está deshabilitado (devOptions.enabled: false), así que esto
 *   solo se ve en producción (Vercel). Para probarlo: deployar una versión,
 *   abrir la app, deployar otra, y volver a la pestaña → aparece el aviso.
 * - El toast es `duration: Infinity` para que no desaparezca solo; el usuario
 *   decide cuándo actualizar.
 */
export function ReloadPrompt() {
  const shownRef = useRef(false)
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl) {
      // Chequea updates cada 30 min mientras la app está abierta, además del
      // chequeo automático en cada navegación / recarga.
      if (import.meta.env.PROD) {
        setInterval(() => {
          navigator.serviceWorker.getRegistration(swUrl).then((r) => r?.update())
        }, 30 * 60 * 1000)
      }
    },
  })

  useEffect(() => {
    if (!needRefresh || shownRef.current) return
    shownRef.current = true
    toast("Hay una nueva versión de Aviatory", {
      description: "Actualizá para ver los últimos cambios. No vas a perder tu sesión.",
      icon: <RefreshCw className="size-4" />,
      duration: Infinity,
      action: {
        label: "Actualizar",
        onClick: () => updateServiceWorker(true),
      },
    })
  }, [needRefresh, updateServiceWorker])

  return null
}
