import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { LogoHorizontal } from "@/components/Logo"

/**
 * El marco de las pantallas sueltas de autenticación.
 *
 * `Login` tiene su propio doble panel con la lista de beneficios, que ahí está
 * bien: es la pantalla donde hay que convencer. Recuperar la contraseña es lo
 * contrario —alguien que ya se decidió y está atascado— así que va en una
 * tarjeta centrada y sin nada alrededor: cuanto menos haya, antes sale de aquí.
 */
export function AuthShell({
  titulo,
  bajada,
  children,
}: {
  titulo: string
  bajada?: ReactNode
  children: ReactNode
}) {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="p-6 lg:p-8 flex items-center justify-between">
        <Link to="/">
          <LogoHorizontal className="h-8 w-auto" />
        </Link>
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-[15px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a iniciar sesión
        </Link>
      </header>

      <div className="flex-1 flex items-start justify-center px-6 pb-16 pt-4 sm:items-center sm:pt-0">
        <div className="w-full max-w-md">
          <h1 className="text-[32px] font-semibold tracking-tight text-balance">{titulo}</h1>
          {bajada && <p className="mt-2 text-muted-foreground">{bajada}</p>}
          {children}
        </div>
      </div>
    </main>
  )
}
