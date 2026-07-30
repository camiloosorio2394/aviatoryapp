import { Fragment, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  BookOpen,
  Radio,
  Briefcase,
  FileSearch,
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
  ChevronDown,
  X,
  Library as LibraryIcon,
  Video,
  Pin,
  PinOff,
} from "lucide-react"
import { LogoIsotype } from "@/components/Logo"

interface NavItem {
  to: string
  label: string
  icon: React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>
  end?: boolean
  /** Módulo en construcción (página placeholder) — muestra chip "Pronto". */
  soon?: boolean
  /**
   * Cantidad de contenido publicado en el módulo (catálogo, no progreso del
   * piloto). Sirve para probar que adentro hay material de verdad.
   * Si crece el contenido, hay que actualizar el número en esta lista.
   */
  count?: number
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
      { to: "/app/icao", label: "Inglés ICAO", icon: Radio },
    ],
  },
  {
    label: "Carrera",
    items: [
      { to: "/app/aerolinea", label: "Prep aerolínea", icon: Briefcase },
      { to: "/app/aerolinea/notam", label: "NOTAM", icon: FileSearch },
      { to: "/app/exam-tracker", label: "Exam Tracker", icon: Radar },
      { to: "/app/aerolineas", label: "Match aerolíneas", icon: Plane },
    ],
  },
  {
    label: "Operación",
    items: [
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

/**
 * Módulos todavía sin contenido. Van juntos al final, en un bloque colapsado,
 * para que el menú real entre completo en la pantalla de un portátil.
 */
const soonItems: NavItem[] = [
  { to: "/app/entrevistas", label: "Entrevistas", icon: Video, soon: true },
  { to: "/app/psicotecnicas", label: "Psicotécnicas", icon: Cpu, soon: true },
  { to: "/app/biblioteca", label: "Biblioteca", icon: LibraryIcon, soon: true },
]

interface Props {
  onClose?: () => void
  /** When true (mobile drawer), force-expanded; desktop ignores this and uses hover. */
  forceExpanded?: boolean
  /** Notifica al parent del estado hover desktop para que reflowee el contenido principal. */
  onHoverChange?: (hovered: boolean) => void
  /** Sidebar fijo (expandido siempre, sin depender del hover). */
  pinned?: boolean
  /** Toggle del fijado (muestra el botón pin/soltar en el header desktop). */
  onPinChange?: (pinned: boolean) => void
}

/**
 * Collapsible icon rail (64px → 240px on hover).
 * Dark navy with blue accent for active state.
 *
 * Para que el topbar no se interponga con la expansión, el AppLayout consume
 * `onHoverChange` y empuja el contenido principal (incluido el topbar)
 * dinámicamente — el rail nunca se solapa con el header.
 */
export function AppSidebar({ onClose, forceExpanded = false, onHoverChange, pinned = false, onPinChange }: Props) {
  const [hovered, setHovered] = useState(false)
  const [soonOpen, setSoonOpen] = useState(false)
  const expanded = forceExpanded || pinned || hovered

  /**
   * Fila de navegación. Cuando el rail está colapsado el nombre viaja en el
   * atributo `title`: el tooltip flotante anterior nunca se veía porque el
   * aside y el nav recortan todo lo que sale de sus 64px.
   */
  const renderItem = (item: NavItem) => (
    <NavLink
      key={item.to}
      to={item.to}
      end={item.end}
      onClick={onClose}
      title={expanded ? undefined : item.soon ? `${item.label} · Pronto` : item.label}
      className="group relative flex items-center gap-3 h-10 px-2.5 rounded-lg text-[14px] font-semibold transition-colors hover:bg-white/5"
      style={({ isActive }) =>
        isActive
          ? {
              color: "#fff",
              background: "color-mix(in oklab, var(--av-blue-500) 26%, transparent)",
              boxShadow: "inset 2px 0 0 var(--av-blue-400)",
            }
          : { color: "var(--rail-text)" }
      }
    >
      {({ isActive }) => (
        <>
          <item.icon
            size={18}
            className="flex-shrink-0 transition-colors"
            style={{ color: isActive ? "var(--av-blue-400)" : "currentColor" }}
          />
          <span
            className="whitespace-nowrap overflow-hidden transition-opacity duration-200 flex-1"
            style={{ opacity: expanded ? 1 : 0 }}
          >
            {item.label}
          </span>
          {/* Conteo de contenido publicado (solo expandido) */}
          {item.count !== undefined && expanded && (
            <span
              className="mono tabular-nums flex-shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded"
              style={{
                color: "oklch(0.82 0.02 250)",
                background: "oklch(1 0 0 / 8%)",
                border: "1px solid var(--rail-border)",
              }}
            >
              {item.count}
            </span>
          )}
          {/* Chip "Pronto" para módulos en construcción (solo expandido) */}
          {item.soon && expanded && (
            <span
              className="flex-shrink-0 text-[10px] font-semibold uppercase tracking-[0.06em] px-1.5 py-0.5 rounded"
              style={{ color: "oklch(0.78 0.02 250)", background: "oklch(1 0 0 / 6%)", border: "1px solid var(--rail-border)" }}
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
        </>
      )}
    </NavLink>
  )

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
        color: "var(--rail-text)",
        borderRight: "1px solid var(--rail-border)",
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
        style={{ height: 60, borderBottom: "1px solid var(--rail-border)" }}
      >
        <Link to="/app" onClick={onClose} className="flex items-center gap-2.5 flex-1 min-w-0">
          <div
            className="flex-shrink-0 flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
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
        {/* Pin / soltar (solo desktop, cuando está expandido) */}
        {onPinChange && !forceExpanded && expanded && (
          <button
            type="button"
            onClick={() => onPinChange(!pinned)}
            className="hidden lg:inline-flex p-1.5 -mr-1 rounded-md text-white/55 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={pinned ? "Soltar sidebar (auto-colapsar)" : "Fijar sidebar"}
            title={pinned ? "Soltar sidebar (auto-colapsar)" : "Fijar sidebar"}
          >
            {pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
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
                    className="px-2.5 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-opacity duration-200"
                    style={{ color: "oklch(0.74 0.03 250)" }}
                  >
                    {section.label}
                  </div>
                ) : (
                  <div className="mx-2.5 my-1 border-t" style={{ borderColor: "var(--rail-border)" }} />
                )}
              </>
            )}

            {section.items.map(renderItem)}
          </Fragment>
        ))}

        {/*
          Próximamente — los módulos sin contenido van juntos y colapsados.
          Saca 3 filas y un header del nav: el menú entra completo en un
          portátil y desaparece el scroll interno sin indicio.
        */}
        <div className="mt-2 pt-2" style={{ borderTop: "1px solid var(--rail-border)" }}>
          <button
            type="button"
            onClick={() => setSoonOpen((v) => !v)}
            className="w-full flex items-center gap-3 h-9 px-2.5 rounded-lg text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors hover:bg-white/5"
            style={{ color: "oklch(0.74 0.03 250)" }}
            aria-expanded={soonOpen}
            title={expanded ? undefined : "Próximamente"}
          >
            <ChevronDown
              size={18}
              className="flex-shrink-0 transition-transform duration-200"
              style={{ transform: soonOpen ? "none" : "rotate(-90deg)" }}
            />
            <span
              className="flex-1 text-left whitespace-nowrap overflow-hidden transition-opacity duration-200"
              style={{ opacity: expanded ? 1 : 0 }}
            >
              Próximamente
            </span>
            <span
              className="mono tabular-nums flex-shrink-0 text-[10px] transition-opacity duration-200"
              style={{ opacity: expanded ? 1 : 0 }}
            >
              {soonItems.length}
            </span>
          </button>

          {soonOpen && <div className="mt-0.5 flex flex-col gap-0.5">{soonItems.map(renderItem)}</div>}
        </div>
      </nav>

      {/* Pro upgrade */}
      <div className="p-2.5">
        <Link
          to="/pricing"
          className="block transition-transform hover:-translate-y-0.5"
          style={{
            padding: expanded ? 14 : 10,
            borderRadius: 12,
            background: "color-mix(in oklab, var(--av-blue-500) 22%, transparent)",
            border: "1px solid color-mix(in oklab, var(--av-blue-400) 35%, transparent)",
          }}
        >
          {expanded ? (
            <>
              <div
                className="flex items-center gap-1.5 text-[13px] font-semibold"
                style={{ color: "var(--av-blue-400)" }}
              >
                <Sparkles className="h-3.5 w-3.5" /> Prueba gratis
              </div>
              <div className="mt-1 text-xs leading-snug" style={{ color: "oklch(0.82 0.02 250)" }}>
                Pasa a Pro y desbloquea todo Aviatory.
              </div>
              <div
                className="mt-2.5 flex items-center justify-center gap-1 w-full h-8 px-3 rounded-lg text-xs font-semibold text-white"
                style={{ background: "var(--av-blue-500)" }}
              >
                Ver planes <ArrowRight className="h-3 w-3" />
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <Sparkles className="h-[18px] w-[18px]" style={{ color: "var(--av-blue-400)" }} />
            </div>
          )}
        </Link>
      </div>
    </aside>
  )
}
