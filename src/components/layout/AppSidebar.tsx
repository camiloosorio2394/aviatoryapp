import { NavLink, Link } from "react-router-dom"
import { LayoutDashboard, BookOpen, Map, Plane, User, X, Users } from "lucide-react"
import { LogoIsotype, LogoHorizontal } from "@/components/Logo"

const navItems = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/quiz", label: "Banco de preguntas", icon: BookOpen },
  { to: "/app/comunidad", label: "Comunidad", icon: Users },
  { to: "/app/ruta", label: "Mi ruta", icon: Map },
  { to: "/app/aerolineas", label: "Aerolíneas", icon: Plane },
  { to: "/app/perfil", label: "Mi perfil", icon: User },
]

export function AppSidebar({ onClose }: { onClose?: () => void }) {
  return (
    <aside className="flex flex-col h-full w-64 bg-muted/30 border-r border-border/60">
      <div className="flex items-center justify-between px-5 h-16 border-b border-border/40">
        <Link to="/app" className="flex items-center" onClick={onClose}>
          <LogoHorizontal className="h-7 w-auto" />
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border/40">
        <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/30 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-300">
            <LogoIsotype variant="color" className="h-5 w-5 rounded" />
            Prueba gratis
          </div>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            Tu trial termina pronto. Upgradeá a Pro y desbloqueá todo.
          </p>
          <Link
            to="/pricing"
            className="mt-3 inline-flex w-full justify-center items-center btn-apple shine-on-hover rounded-full h-8 px-4 text-xs font-medium text-white border-0"
          >
            Ver planes
          </Link>
        </div>
      </div>
    </aside>
  )
}
