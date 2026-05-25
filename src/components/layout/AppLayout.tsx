import { useEffect, useState, type ReactNode } from "react"
import { AppSidebar } from "./AppSidebar"
import { AppTopbar } from "./AppTopbar"
import { useAchievementToasts } from "@/hooks/useAchievementToasts"

const SIDEBAR_HIDDEN_KEY = "aviatory.sidebarHidden"

export function AppLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  // Desktop sidebar visibility — persiste en localStorage
  const [sidebarHidden, setSidebarHidden] = useState<boolean>(() => {
    if (typeof window === "undefined") return false
    try {
      return window.localStorage.getItem(SIDEBAR_HIDDEN_KEY) === "1"
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(SIDEBAR_HIDDEN_KEY, sidebarHidden ? "1" : "0")
    } catch {
      /* localStorage podría estar bloqueado (incógnito, etc.) — sigue */
    }
  }, [sidebarHidden])

  // Detecta y celebra achievements desbloqueados en toda la app autenticada
  useAchievementToasts()

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar — slide out si está oculto */}
      <div
        className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 z-30 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          sidebarHidden ? "-translate-x-full" : "translate-x-0"
        }`}
        aria-hidden={sidebarHidden}
      >
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

      <div
        className={`flex-1 flex flex-col min-h-screen transition-[padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          sidebarHidden ? "lg:pl-0" : "lg:pl-64"
        }`}
      >
        <AppTopbar
          onMenuClick={() => setMobileOpen(true)}
          sidebarHidden={sidebarHidden}
          onToggleSidebar={() => setSidebarHidden((v) => !v)}
        />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
