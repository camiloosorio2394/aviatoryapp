import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { trackPageView } from "@/lib/analytics"

/**
 * Dispara un $pageview cada vez que cambia la ruta de react-router.
 * Usar una sola vez (ej: en App.tsx o en un layout raíz).
 */
export function usePageViewTracking() {
  const location = useLocation()
  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname])
}
