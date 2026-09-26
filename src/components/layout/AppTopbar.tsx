import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Menu,
  LogOut,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight,
  Search,
  Sun,
  Moon,
  Monitor,
} from "lucide-react"
import { toast } from "sonner"
import { traerIdentidadEnLaBarra } from "@/services/perfil"
import { cerrarSesion } from "@/services/sesion"
import { useSession } from "@/hooks/useSession"
import { UserAvatar } from "@/components/UserAvatar"
import { Isotipo } from "@/components/marca/Isotipo"
import { NotificationsBell } from "@/components/NotificationsBell"
import { PildoraDeRacha } from "@/components/racha/PildoraDeRacha"
import type { RachaEnBarra } from "./rachaEnBarra"
import { getThemePref, applyThemePref, isDark as themeIsDark, watchSystemTheme, type ThemePref } from "@/lib/theme"

const ROUTE_LABEL: Record<string, string> = {
  "/app": "Inicio",
  "/app/pca": "Examen PCA",
  "/app/pca/quiz": "Examen PCA",
  "/app/icao": "Inglés ICAO",
  "/app/aerolinea": "Ingreso a aerolínea",
  "/app/entrevistas": "Simulador entrevistas",
  "/app/psicotecnicas": "Psicotécnicas",
  "/app/biblioteca": "Biblioteca",
  "/app/examenes": "Qué cayó en el examen",
  "/app/match": "Elegibilidad",
  "/app/materias": "Materias generales",
  "/app/logbook": "Logbook",
  "/app/vencimientos": "Vencimientos",
  "/app/comunidad": "Comunidad",
  "/app/ruta": "Mi ruta",
  "/app/referidos": "Referidos",
  "/app/perfil": "Mi perfil",
  "/app/logros": "Logros",
}

interface Props {
  onMenuClick: () => void
  sidebarHidden?: boolean
  onToggleSidebar?: () => void
  racha?: RachaEnBarra
  onCmdK?: () => void
}

/**
 * Top bar with breadcrumb, ⌘K search button, streak chip, theme toggle, notifications, avatar.
 */
export function AppTopbar({
  onMenuClick,
  sidebarHidden,
  onToggleSidebar,
  racha,
  onCmdK,
}: Props) {
  const { user } = useSession()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [themePref, setThemePrefState] = useState<ThemePref>(() => getThemePref())
  const [dark, setDark] = useState<boolean>(() => themeIsDark())

  useEffect(() => {
    if (!user) return
    let cancelled = false
    void traerIdentidadEnLaBarra(user.id).then((identidad) => {
      if (cancelled || !identidad) return
      setUsername(identidad.username)
      setPhotoUrl(identidad.photoUrl)
    })
    return () => {
      cancelled = true
    }
  }, [user])

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener("click", close)
    return () => window.removeEventListener("click", close)
  }, [open])

  // Mantener el ícono sincronizado si el SO cambia día/noche en modo "system".
  useEffect(() => watchSystemTheme((d) => setDark(d)), [])

  function chooseTheme(pref: ThemePref) {
    applyThemePref(pref)
    setThemePrefState(pref)
    setDark(themeIsDark())
  }
  function toggleTheme() {
    // Atajo rápido: alterna claro/oscuro (queda fijo). Para volver a auto, usá
    // el menú del avatar.
    chooseTheme(dark ? "light" : "dark")
  }

  async function handleSignOut() {
    const fallo = await cerrarSesion()
    if (fallo) {
      toast.error(fallo)
      return
    }
    navigate("/", { replace: true })
  }

  const email = user?.email ?? ""
  const handle = username ? `@${username}` : email

  // Find best matching label (longest prefix match)
  const label =
    Object.entries(ROUTE_LABEL)
      .filter(([k]) => location.pathname === k || location.pathname.startsWith(k + "/"))
      .sort((a, b) => b[0].length - a[0].length)[0]?.[1] ?? "App"

  return (
    <header
      className="sticky top-0 z-40 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-3 px-5 backdrop-blur-xl border-b border-border"
      style={{ background: "color-mix(in oklab, var(--lienzo) 96%, transparent)" }}
    >
      {/* === LEFT COLUMN === */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Desktop: toggle sidebar */}
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="hidden lg:inline-flex items-center justify-center w-8 h-8 -ml-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.97]"
            aria-label={sidebarHidden ? "Mostrar barra lateral" : "Ocultar barra lateral"}
            title={sidebarHidden ? "Mostrar barra lateral" : "Ocultar barra lateral"}
          >
            {sidebarHidden ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        )}

        {/*
          Marca + sección — visible SIEMPRE, también en móvil. Antes se apagaba
          bajo 640px y quedaba una banda de 64px sin marca y sin contexto: en
          móvil el rail es un drawer cerrado, así que el isotipo del topbar es
          la única marca en pantalla.
        */}
        <div className="flex items-center gap-2 min-w-0 text-[13px]">
          <Isotipo titulo="Aviatory" className="h-6 w-6 flex-shrink-0" style={{ color: "var(--marca-tinta)" }} />
          <span className="titular hidden sm:inline whitespace-nowrap text-[15px] font-bold" style={{ color: "var(--marca-tinta)" }}>
            Aviatory
          </span>
          <ChevronRight className="hidden sm:inline-block h-3 w-3 text-muted-foreground flex-shrink-0" />
          <span className="font-semibold text-foreground truncate">{label}</span>
        </div>
      </div>

      {/* === CENTER COLUMN === */}
      {/* Reservada para la búsqueda global. El botón de lupa vive en la columna
          derecha y solo se monta si el shell pasa `onCmdK`. */}
      <div />

      {/* === RIGHT COLUMN === */}
      <div className="flex items-center gap-1.5 sm:gap-2 justify-end">
        {/* Racha: animada, comprimida a llama y número en móvil, completa
            desde 640px. Con cero días se ve apagada, no desaparece. */}
        {racha !== undefined && <PildoraDeRacha dias={racha.dias} masLarga={racha.masLarga} />}

        {/*
          Búsqueda global. Se monta solo cuando el shell entrega `onCmdK`: hoy
          no existe la búsqueda, y un botón que no lleva a ningún lado es peor
          que no tenerlo. Cuando exista la paleta de comandos, este botón la
          abre (basta con pasar onCmdK desde AppLayout).
        */}
        {onCmdK && (
          <button
            type="button"
            onClick={onCmdK}
            className="search-cmdk w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.97]"
            aria-label="Buscar en Aviatory"
            title="Buscar en Aviatory"
          >
            <Search className="h-4 w-4" />
          </button>
        )}

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.97]"
          aria-label="Cambiar tema claro/oscuro"
          title={themePref === "system" ? "Tema: automático" : dark ? "Tema: oscuro" : "Tema: claro"}
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <NotificationsBell />

        {/* Avatar */}
        <div className="relative ml-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setOpen((v) => !v)
            }}
            className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-muted transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.97]"
            aria-haspopup="menu"
            aria-expanded={open}
          >
            <UserAvatar
              photoUrl={photoUrl}
              username={username}
              email={email}
              size="sm"
              className="shadow-md"
              style={{ boxShadow: "0 0 0 2px var(--background), 0 0 0 3px var(--av-blue-500)" } as React.CSSProperties}
            />
            <span className="hidden sm:block text-[12px] font-semibold text-muted-foreground max-w-[200px] truncate">
              {handle}
            </span>
          </button>

          {/* Misma receta de superficie flotante que el popover de la campana:
              rounded-2xl + border-border/60 + shadow-2xl. */}
          {open && (
            <div
              className="absolute right-0 mt-2 w-64 rounded-2xl border border-border/60 bg-card shadow-2xl overflow-hidden z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-3 border-b border-border">
                {username && <p className="text-[15px] font-semibold">@{username}</p>}
                <p className="text-[12px] text-muted-foreground truncate">{email}</p>
              </div>

              {/* Tema: Claro / Oscuro / Automático (sigue al sistema) */}
              <div className="px-4 py-2.5 border-b border-border">
                <div className="text-[12px] font-semibold text-muted-foreground mb-1.5">Tema</div>
                <div className="grid grid-cols-3 gap-1">
                  {([
                    { key: "light", label: "Claro", icon: Sun },
                    { key: "dark", label: "Oscuro", icon: Moon },
                    { key: "system", label: "Auto", icon: Monitor },
                  ] as const).map((opt) => {
                    const active = themePref === opt.key
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => chooseTheme(opt.key)}
                        className="flex flex-col items-center gap-1 py-2 rounded-lg border text-[12px] font-semibold transition-colors"
                        style={{
                          borderColor: active ? "color-mix(in oklab, var(--av-blue-500) 50%, transparent)" : "color-mix(in oklab, var(--border) 70%, transparent)",
                          background: active ? "color-mix(in oklab, var(--av-blue-500) 12%, transparent)" : "transparent",
                          color: active ? "var(--av-blue-500)" : "var(--muted-foreground)",
                        }}
                      >
                        <opt.icon className="h-4 w-4" />
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <Link
                to="/app/perfil"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-[15px] hover:bg-muted transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.97]"
              >
                <User className="h-4 w-4" /> Mi perfil
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-[15px] transition-colors hover:bg-[color-mix(in_oklab,var(--av-red-400)_12%,transparent)]"
                style={{ color: "var(--av-danger-fg)" }}
              >
                <LogOut className="h-4 w-4" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
