import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useSession } from "@/hooks/useSession"
import { PasskeyInvitacion } from "@/components/auth/PasskeyInvitacion"

interface RequireAuthProps {
  children: ReactNode
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { session, isLoading } = useSession()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Cargando…</p>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  // Con sesión: se ofrece el passkey una vez, y quien lo posponga entra igual.
  return <PasskeyInvitacion>{children}</PasskeyInvitacion>
}
