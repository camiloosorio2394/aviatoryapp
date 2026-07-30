import { useEffect, useState, type ReactNode } from "react"
import { AppSidebar } from "./AppSidebar"
import { AppTopbar } from "./AppTopbar"
import { Wingman } from "@/components/Wingman"
import { useAchievementToasts } from "@/hooks/useAchievementToasts"

const SIDEBAR_HIDDEN_KEY = "aviatory.sidebarHidden"
const SIDEBAR_PINNED_KEY = "aviatory.sidebarPinned"

/**
 * App shell:
 * - Desktop: sidebar 64px (icon rail) → expands to 240px on hover.
 *   Hide it entirely with the topbar toggle (persisted).
 * - Mobile: sidebar slides in as drawer.
 * - Wingman floats bottom-right on every authenticated page.
 *
 * `streak` opcional: pásalo desde la página si quieres mostrar el chip de racha.
 */
interface Props {
  children: ReactNode
  streak?: number
}

export function AppLayout({ children, streak }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  // Estado del hover desktop: cuando el sidebar se expande (64 → 240),
  // empujamos el contenido principal (incluido el topbar) para que NO se
  // interponga visualmente con el rail. El topbar siempre queda a la
  // derecha del sidebar, jamás encima.
  const [sidebarHovered, setSidebarHovered] = useState(false)

  const [sidebarHidden, setSidebarHidden] = useState<boolean>(() => {
    if (typeof window === "undefined") return false
    try {
      return window.localStorage.getItem(SIDEBAR_HIDDEN_KEY) === "1"
    } catch {
      return false
    }
  })

  // Sidebar fijo (pinned): por defecto SÍ — queda expandido sin necesidad de
  // hover. Si el usuario lo "suelta", vuelve al rail que se expande on-hover.
  const [sidebarPinned, setSidebarPinned] = useState<boolean>(() => {
    if (typeof window === "undefined") return true
    try {
      const v = window.localStorage.getItem(SIDEBAR_PINNED_KEY)
      return v === null ? true : v === "1"
    } catch {
      return true
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(SIDEBAR_HIDDEN_KEY, sidebarHidden ? "1" : "0")
    } catch {
      /* localStorage podría estar bloqueado (incógnito, etc.) — sigue */
    }
  }, [sidebarHidden])

  useEffect(() => {
    try {
      window.localStorage.setItem(SIDEBAR_PINNED_KEY, sidebarPinned ? "1" : "0")
    } catch { /* noop */ }
  }, [sidebarPinned])

  // Con el drawer móvil abierto el fondo seguía scrolleando detrás del overlay:
  // bloqueamos el scroll del body mientras está abierto (igual que el Header
  // público).
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  useAchievementToasts()

  // Padding-left del contenido principal:
  //   - sidebar oculto        → 0
  //   - sidebar colapsado     → 64px (lg:pl-16)
  //   - sidebar expandido hover → 240px (lg:pl-60)
  // Las tres clases aparecen como literal strings para que Tailwind las compile.
  const contentPaddingClass = sidebarHidden
    ? "lg:pl-0"
    : sidebarPinned || sidebarHovered
      ? "lg:pl-60"
      : "lg:pl-16"

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar — slide out if hidden */}
      <div
        className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 z-30 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          sidebarHidden ? "-translate-x-full" : "translate-x-0"
        }`}
        aria-hidden={sidebarHidden}
      >
        <AppSidebar
          onHoverChange={setSidebarHovered}
          pinned={sidebarPinned}
          onPinChange={setSidebarPinned}
        />
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 shadow-2xl animate-in slide-in-from-left duration-200">
            <AppSidebar onClose={() => setMobileOpen(false)} forceExpanded />
          </div>
        </>
      )}

      <div
        className={`flex-1 flex flex-col min-h-screen transition-[padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${contentPaddingClass}`}
      >
        <AppTopbar
          onMenuClick={() => setMobileOpen(true)}
          sidebarHidden={sidebarHidden}
          onToggleSidebar={() => setSidebarHidden((v) => !v)}
          streak={streak}
        />
        <main className="flex-1">{children}</main>
      </div>

      <Wingman />
    </div>
  )
}
