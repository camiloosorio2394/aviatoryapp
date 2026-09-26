import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { useSession } from "@/hooks/useSession"
import { rutaEquivalente } from "@/lib/foro"
import { Foro } from "./Foro"
import { PublicacionForoPagina } from "./PublicacionForoPagina"

/**
 * Las pantallas de la comunidad, afuera y adentro.
 *
 * Afuera (/comunidad) van con la cabecera y el pie de la web. Quien ya tiene
 * sesión pasa a la misma dirección dentro de la app: allí tiene la barra,
 * sus avisos y Wingman. Google no tiene sesión: se queda afuera y lee.
 */
function Publica({ children }: { children: ReactNode }) {
  const { user, isLoading } = useSession()
  const location = useLocation()
  if (!isLoading && user) {
    return <Navigate to={`${rutaEquivalente(location.pathname, "app")}${location.search}${location.hash}`} replace />
  }
  return <PublicLayout>{children}</PublicLayout>
}

export function ForoPublico() {
  return (
    <Publica>
      <Foro donde="publica" />
    </Publica>
  )
}

export function PublicacionPublica() {
  return (
    <Publica>
      <PublicacionForoPagina donde="publica" />
    </Publica>
  )
}

export function ForoApp() {
  return <Foro donde="app" />
}

export function PublicacionApp() {
  return <PublicacionForoPagina donde="app" />
}
