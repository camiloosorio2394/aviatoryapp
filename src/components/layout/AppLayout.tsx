import { useState, type ReactNode } from "react"
import { AppSidebar } from "./AppSidebar"
import { AppTopbar } from "./AppTopbar"
import { useAchievementToasts } from "@/hooks/useAchievementToasts"

export function AppLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  // Detecta y celebra achievements desbloqueados en toda la app autenticada
  useAchievementToasts()

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64">
        <AppSidebar />
      </div>

      {/* Mobile sidebar drawer */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 shadow-2xl animate-in slide-in-from-left duration-200">
            <AppSidebar onClose={() => setMobileOpen(false)} />
          </div>
        </>
      )}

      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <AppTopbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
