import { useEffect, useState, type ReactNode } from "react"
import { AppSidebar } from "./AppSidebar"
import { AppTopbar } from "./AppTopbar"
import { Wingman } from "@/components/Wingman"
import { useAchievementToasts } from "@/hooks/useAchievementToasts"
import { CLAVE_BARRA_FIJADA, CLAVE_BARRA_OCULTA } from "@/lib/preferenciasEquipo"

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
      return window.localStorage.getItem(CLAVE_BARRA_OCULTA) === "1"
    } catch {
      return false
    }
  })

  // Sidebar fijo (pinned): por defecto SÍ — queda expandido sin necesidad de
  // hover. Si el usuario lo "suelta", vuelve al rail que se expande on-hover.
  const [sidebarPinned, setSidebarPinned] = useState<boolean>(() => {
    if (typeof window === "undefined") return true
    try {
      const v = window.localStorage.getItem(CLAVE_BARRA_FIJADA)
      return v === null ? true : v === "1"
    } catch {
      return true
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(CLAVE_BARRA_OCULTA, sidebarHidden ? "1" : "0")
    } catch {
      /* localStorage podría estar bloqueado (incógnito, etc.) — sigue */
    }
  }, [sidebarHidden])

  useEffect(() => {
    try {
      window.localStorage.setItem(CLAVE_BARRA_FIJADA, sidebarPinned ? "1" : "0")
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

      {/* Cajón de móvil. Va montado siempre y se mueve con `transform`, que es
          el mismo patrón del rail de escritorio de aquí arriba. Antes entraba
          con un keyframe y salía por teletransporte, y abrir y cerrar rápido lo
          reiniciaba desde fuera de la pantalla en vez de retomarlo donde
          estaba. Es la navegación principal en celular, que es justo donde más
          se toca y se arrepiente uno a media animación.

          `AppSidebar` no monta nada caro: ni consultas ni efectos, solo pinta.
          El desenfoque del velo solo existe cuando el cajón está abierto: un
          `backdrop-filter` a pantalla completa se compone aunque esté a opacidad
          cero. */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-200 ${
          mobileOpen ? "bg-background/60 backdrop-blur-sm opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 shadow-2xl transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
      >
        <AppSidebar onClose={() => setMobileOpen(false)} forceExpanded />
      </div>

      {/* `min-w-0` no es decorativo: sin él, este elemento es un ítem flex con
          `min-width: auto`, así que su ancho mínimo lo fija el contenido más
          ancho de la página. Cualquier bloque con un mínimo fijo empujaba
          entonces la página entera a lo ancho en vez de desplazarse dentro de
          su caja, y en celular aparecía scroll lateral en toda la app.
          Lo encontramos por dos caminos: el estante de la Biblioteca, que es
          una tira horizontal, y el recorte de NOTAM de la lección. Medido a
          390 px: la lección ocupaba 784 de ancho sin esto, 390 con esto. */}
      {/* Sin `transition-[padding]`. Lo tenía, y el rail animaba su `width` al
          mismo tiempo y disparado por hover: 300 ms reflowando el documento
          entero (la barra superior, el <main> y cada tarjeta de dentro) cada
          vez que el ratón pasaba por el borde izquierdo. El rail sigue
          abriéndose, ahora de golpe. Si prefieres recuperar el deslizamiento,
          la manera de hacerlo sin reflow es que el rail se superponga en vez
          de empujar, y eso es una decisión de producto, no un arreglo. */}
      <div
        className={`flex-1 min-w-0 flex flex-col min-h-screen ${contentPaddingClass}`}
      >
        <AppTopbar
          onMenuClick={() => setMobileOpen(true)}
          sidebarHidden={sidebarHidden}
          onToggleSidebar={() => setSidebarHidden((v) => !v)}
          streak={streak}
        />
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      <Wingman />
    </div>
  )
}
