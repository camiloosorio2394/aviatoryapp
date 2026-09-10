import { useEffect, useState } from "react"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"
import { isDark } from "@/lib/theme"

/**
 * El tema de Aviatory es una clase `dark` en <html> que pone `applyThemePref`,
 * con tres estados: claro, oscuro y automático. Sonner con `theme="system"`
 * mira solo el `prefers-color-scheme` del sistema operativo, así que quien
 * tenía el sistema en claro y forzaba la app a oscuro veía la app oscura y los
 * toasts claros.
 *
 * Se observa la clase y no la preferencia porque la clase es lo que cambia en
 * los dos casos: cuando el piloto la conmuta a mano y cuando el sistema pasa de
 * día a noche estando en automático.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const [oscuro, setOscuro] = useState(isDark)

  useEffect(() => {
    const observador = new MutationObserver(() => setOscuro(isDark()))
    observador.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observador.disconnect()
  }, [])

  return (
    <Sonner
      theme={oscuro ? "dark" : "light"}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
