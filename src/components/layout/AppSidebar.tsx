import { Fragment, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  BookOpen,
  Radio,
  Briefcase,
  Cpu,
  Radar,
  Clock,
  Calendar,
  Users,
  Map,
  Plane,
  Gift,
  User,
  Sparkles,
  ArrowRight,
  X,
  Library as LibraryIcon,
  Video,
} from "lucide-react"
import { LogoIsotype } from "@/components/Logo"

interface NavItem {
  to: string
  label: string
  icon: React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>
  end?: boolean
  /** Módulo en construcción (página placeholder) — muestra chip "Pronto". */
  soon?: boolean
}

interface NavSection {
  /** Section header; omit on first group (Dashboard standalone). */
  label?: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    items: [{ to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true }],
  },
  {
    label: "Estudio",
    items: [
      { to: "/app/pca", label: "Materias", icon: BookOpen },
      { to: "/app/icao", label: "Inglés ICAO", icon: Radio, soon: true },
    ],
  },
  {
    label: "Carrera",
    items: [
      { to: "/app/aerolinea", label: "Ingreso a Aerolínea", icon: Briefcase, soon: true },
      { to: "/app/entrevistas", label: "Simulador entrevistas", icon: Video, soon: true },
      { to: "/app/psicotecnicas", label: "Psicotécnicas", icon: Cpu, soon: true },
      { to: "/app/exam-tracker", label: "Exam Tracker", icon: Radar },
      { to: "/app/aerolineas", label: "Match aerolíneas", icon: Plane },
    ],
  },
  {
    label: "Operación",
    items: [
      { to: "/app/biblioteca", label: "Biblioteca", icon: LibraryIcon, soon: true },
      { to: "/app/logbook", label: "Logbook", icon: Clock },
      { to: "/app/vencimientos", label: "Vencimientos", icon: Calendar },
      { to: "/app/ruta", label: "Mi ruta", icon: Map },
    ],
  },
  {
    label: "Comunidad",
    items: [
      { to: "/app/comunidad", label: "Comunidad", icon: Users },
      { to: "/app/referidos", label: "Referidos", icon: Gift },
      { to: "/app/perfil", label: "Mi perfil", icon: User },
    ],
  },
]

interface Props {
  onClose?: () => void
  /** When true (mobile drawer), force-expanded; desktop ignores this and uses hover. */
  forceExpanded?: boolean
  /** Notifica al parent del estado hover desktop para que reflowee el contenido principal. */
  onHoverChange?: (hovered: boolean) => void
}

/**
 * Collapsible icon rail (64px → 240px on hover).
 * Dark navy with cyan accent for active state.
 *
 * Para que el topbar no se interponga con la expansión, el AppLayout consume
 * `onHoverChange` y empuja el contenido principal (incluido el topbar)
 * dinámicamente — el rail nunca se solapa con el header.
 */
export function AppSidebar({ onClose, forceExpanded = false, onHoverChange }: Props) {
  const [hovered, setHovered] = useState(false)
  const expanded = forceExpanded || hovered

  return (
    <aside
      onMouseEnter={() => {
        setHovered(true)
        onHoverChange?.(true)
      }}
      onMouseLeave={() => {
        setHovered(false)
        onHoverChange?.(false)
      }}
      className="flex flex-col h-full overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        width: expanded ? 240 : 64,
        background: "var(--rail)",
        borderRight: "1px solid var(--rail-border)",
        color: "var(--rail-text)",
      }}
    >
      {/*
        Logo — el isotype solo ocupa el ancho del rail colapsado (64px) para
        no solaparse con el topbar cuando el sidebar se expande on-hover.
        El wordmark "Aviatory" SOLO se muestra en el drawer mobile (forceExpanded)
        donde el topbar no aparece — en desktop el topbar muestra el breadcrumb
        "Aviatory · Sección".
      */}
      <div
        className="flex items-center gap-2.5 px-3.5"
        style={{
          height: 60,
          borderBottom: "1px solid var(--rail-border)",
        }}
      >
        <Link to="/app" onClick={onClose} className="flex items-center gap-2.5 flex-1 min-w-0">
          <div
            className="flex-shrink-0 flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background:
                "linear-gradient(135deg, var(--av-cyan-300) 0%, var(--av-blue-500) 60%, var(--av-navy-900) 100%)",
              boxShadow:
                "0 4px 12px -2px oklch(0.55 0.22 264 / 50%), inset 0 1px 0 rgb(255 255 255 / 30%)",
            }}
          >
            <LogoIsotype className="h-5 w-5" />
          </div>
          {/* Wordmark solo en mobile drawer */}
          {forceExpanded && (
            <div className="font-extrabold text-lg tracking-[-0.03em] text-white whitespace-nowrap">
              Aviatory
            </div>
          )}
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-2 -mr-1 text-white/60 hover:text-white"
            aria-label="Cerrar menú"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav — agrupada en secciones */}
      <nav className="flex-1 px-2.5 pt-2 pb-2 flex flex-col gap-0.5 overflow-y-auto">
        {navSections.map((section, sectionIdx) => (
          <Fragment key={section.label ?? `s-${sectionIdx}`}>
            {/* Section header — only when expanded; collapsed = subtle divider */}
            {section.label && (
              <>
                {expanded ? (
                  <div
                    className="px-2.5 pt-3 pb-1 mono text-[10px] font-bold uppercase tracking-[0.14em] whitespace-nowrap transition-opacity duration-200"
                    style={{ color: "oklch(0.55 0.02 250)" }}
                  >
                    {section.label}
                  </div>
                ) : (
                  <div
                    className="mx-2.5 my-1 border-t"
                    style={{ borderColor: "var(--rail-border)" }}
                  />
                )}
              </>
            )}

            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className="group relative flex items-center gap-3 h-10 px-2.5 rounded-lg text-[13px] font-semibold transition-colors"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "var(--rail-text-active)",
                        background:
                          "linear-gradient(90deg, oklch(0.78 0.16 215 / 18%) 0%, oklch(0.78 0.16 215 / 8%) 100%)",
                        boxShadow:
                          "inset 2px 0 0 var(--av-cyan-400), inset 0 1px 0 rgb(255 255 255 / 4%)",
                      }
                    : { color: "var(--rail-text)" }
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      size={18}
                      className="flex-shrink-0 transition-colors"
                      style={{ color: isActive ? "var(--av-cyan-400)" : "currentColor" }}
                    />
                    <span
                      className="whitespace-nowrap overflow-hidden transition-opacity duration-200 flex-1"
                      style={{ opacity: expanded ? 1 : 0 }}
                    >
                      {item.label}
                    </span>
                    {/* Chip "Pronto" para módulos en construcción (solo expandido) */}
                    {item.soon && expanded && (
                      <span
                        className="flex-shrink-0 mono text-[9px] font-bold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded"
                        style={{
                          color: "oklch(0.72 0.02 250)",
                          background: "oklch(1 0 0 / 6%)",
                          border: "1px solid var(--rail-border)",
                        }}
                      >
                        Pronto
                      </span>
                    )}
                    {/* Punto indicador "pronto" cuando está colapsado */}
                    {item.soon && !expanded && (
                      <span
                        className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--av-amber-400)" }}
                      />
                    )}
                    {!expanded && (
                      <span
                        className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--av-navy-950)] text-white text-[11px] font-semibold px-2 py-1 rounded whitespace-nowrap z-50 shadow-lg"
                      >
                        {item.label}{item.soon ? " · Pronto" : ""}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </Fragment>
        ))}
      </nav>

      {/* Pro upgrade */}
      <div className="p-2.5">
        <Link
          to="/pricing"
          className="block transition-transform hover:-translate-y-0.5"
          style={{
            padding: expanded ? 14 : 10,
            borderRadius: 12,
            background:
              "linear-gradient(135deg, oklch(0.78 0.16 215 / 12%) 0%, oklch(0.55 0.22 264 / 16%) 100%)",
            border: "1px solid oklch(0.78 0.16 215 / 25%)",
          }}
        >
          {expanded ? (
            <>
              <div
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em]"
                style={{ color: "var(--av-cyan-300)" }}
              >
                <Sparkles className="h-3 w-3" /> Prueba gratis
              </div>
              <div className="mt-1 text-xs leading-snug" style={{ color: "oklch(0.78 0.02 250)" }}>
                Pasa a Pro y desbloquea todo Aviatory.
              </div>
              <div
                className="av-shine mt-2.5 flex items-center justify-center gap-1 w-full h-8 px-3 rounded-lg text-xs font-semibold"
                style={{
                  background: "linear-gradient(180deg, var(--av-cyan-300) 0%, var(--av-cyan-400) 100%)",
                  color: "var(--av-navy-950)",
                  boxShadow:
                    "0 1px 0 rgb(255 255 255 / 30%) inset, 0 8px 24px -8px oklch(0.78 0.16 215 / 40%)",
                }}
              >
                Ver planes <ArrowRight className="h-3 w-3" />
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <Sparkles className="h-[18px] w-[18px]" style={{ color: "var(--av-cyan-300)" }} />
            </div>
          )}
        </Link>
      </div>
    </aside>
  )
}
