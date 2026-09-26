import { Fragment, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { ArrowRight, ChevronsLeft, ChevronsRight, Sparkles, X } from "lucide-react"
import { Isotipo } from "@/components/marca/Isotipo"
import { CieloConAla } from "@/components/marca/CieloConAla"
import { IconoMarca } from "@/components/marca/Icono"
import type { NombreIcono } from "@/components/marca/iconos"

interface NavItem {
  to: string
  label: string
  /** El ícono de la hoja de Camilo (src/assets/iconos). */
  icono: NombreIcono
  end?: boolean
}

interface NavSection {
  /** Rótulo del grupo; el primero (Inicio) va sin rótulo. */
  label?: string
  items: NavItem[]
}

/** Ancho del rail abierto. AppLayout empuja el contenido lo mismo (`lg:pl-[264px]`). */
const ANCHO_BARRA_ABIERTA = 264

/**
 * El menú separa lo que se ESTUDIA de lo que se USA, como la propuesta de
 * Camilo del 25-sep-2026:
 *
 * - **Formación**: los tres cursos. Materias generales y Entrevistas salieron
 *   del menú mientras no tengan contenido: un «Pronto» en la navegación es una
 *   promesa en el sitio donde el piloto busca lo que ya puede usar.
 * - **Herramientas**: lo que opera sobre sus datos. «Para cuál calificas» pasa
 *   a llamarse Elegibilidad. «Qué cayó en el examen» sigue en Mi ruta y en el
 *   Examen PCA, y Referidos en el perfil y al aprobar.
 * - **Comunidad** y **Cuenta**. Logros va en Cuenta: es la página de la
 *   colección y la actividad, que salió del panel.
 */
const navSections: NavSection[] = [
  { items: [{ to: "/app", label: "Inicio", icono: "navegacion", end: true }] },
  {
    label: "Formación",
    items: [
      { to: "/app/pca", label: "Examen PCA", icono: "examen-pca" },
      { to: "/app/icao", label: "Inglés ICAO", icono: "ingles-icao" },
      // Psicotécnicas no tiene entrada propia a propósito: es un tema dentro
      // de Ingreso a aerolínea, igual que NOTAM, meteorología y mercancías.
      { to: "/app/aerolinea", label: "Ingreso a aerolínea", icono: "ingreso-aerolinea" },
    ],
  },
  {
    label: "Herramientas",
    items: [
      { to: "/app/biblioteca", label: "Biblioteca", icono: "biblioteca" },
      { to: "/app/logbook", label: "Logbook", icono: "logbook" },
      { to: "/app/vencimientos", label: "Vencimientos", icono: "vencimientos" },
      { to: "/app/ruta", label: "Mi ruta", icono: "mi-ruta" },
      { to: "/app/match", label: "Elegibilidad", icono: "elegibilidad" },
    ],
  },
  { label: "Comunidad", items: [{ to: "/app/comunidad", label: "Comunidad", icono: "comunidad" }] },
  {
    label: "Cuenta",
    items: [
      { to: "/app/perfil", label: "Mi perfil", icono: "mi-perfil" },
      // Las charreteras: los galones que se ganan. Es el ícono de «Materias
      // generales» en la hoja, que ya no tiene entrada en el menú.
      { to: "/app/logros", label: "Logros", icono: "materias" },
    ],
  },
]

interface Props {
  onClose?: () => void
  /** When true (mobile drawer), force-expanded; desktop ignores this and uses hover. */
  forceExpanded?: boolean
  /** Notifica al parent del estado hover desktop para que reflowee el contenido principal. */
  onHoverChange?: (hovered: boolean) => void
  /** Sidebar fijo (expandido siempre, sin depender del hover). */
  pinned?: boolean
  /** Toggle del fijado (muestra el botón de contraer/fijar en el encabezado). */
  onPinChange?: (pinned: boolean) => void
}

/**
 * La navegación lateral: rail de 64 px que se abre a 264 al pasar el ratón, o
 * fija abierta. En el teléfono es el cajón.
 *
 * Es la hoja de marca puesta en la app: el isotipo y el nombre en Playfair
 * con el lema en versalitas, el papel blanco, el navy de la marca en el texto,
 * lo activo en la niebla azul con la franja de acento pegada al borde, filetes
 * finos entre grupos y, abajo, la tarjeta de Pro sobre el cielo con el ala.
 *
 * Las filas miden 36 px en escritorio y 44 en el cajón del teléfono, que es lo
 * que pide un dedo. En pantallas de poca altura (un portátil de 768 px) la
 * tarjeta de Pro se compacta y el lema del pie se esconde, para que el menú
 * entero quepa sin desplazarse.
 *
 * Los colores viven en los tokens `--rail-*` y `--marca-*`: el componente no
 * sabe en qué tema está.
 */
export function AppSidebar({ onClose, forceExpanded = false, onHoverChange, pinned = false, onPinChange }: Props) {
  const [hovered, setHovered] = useState(false)
  const expanded = forceExpanded || pinned || hovered
  const tactil = forceExpanded

  /**
   * Fila de navegación. Con el rail cerrado el nombre viaja en `title`: un
   * tooltip flotante no se vería, el aside recorta lo que sale de sus 64 px.
   */
  const renderItem = (item: NavItem) => (
    <NavLink
      key={item.to}
      to={item.to}
      end={item.end}
      onClick={onClose}
      title={expanded ? undefined : item.label}
      className={`group relative flex items-center gap-3.5 rounded-[12px] px-3 outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--rail-active-mark)] ${
        tactil ? "h-11 text-[15px]" : "h-9 text-[14px]"
      }`}
      style={({ isActive }) =>
        isActive
          ? { color: "var(--rail-active-text)", background: "var(--rail-active-bg)", fontWeight: 600 }
          : { color: "var(--rail-text)", fontWeight: 500 }
      }
    >
      {({ isActive }) => (
        <>
          {/* La franja de acento, pegada al borde del rail (el nav tiene 14 px
              de relleno, de ahí el -14). */}
          {isActive && (
            <span
              aria-hidden
              className="absolute -left-3.5 top-0 h-full w-1 rounded-r-full"
              style={{ background: "var(--rail-active-mark)" }}
            />
          )}
          {!isActive && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[12px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{ background: "var(--rail-hover)" }}
            />
          )}
          <IconoMarca
            nombre={item.icono}
            className={`relative flex-shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${
              tactil ? "h-8 w-8" : "h-7 w-7"
            }`}
          />
          <span className="relative min-w-0 flex-1 truncate transition-opacity duration-200" style={{ opacity: expanded ? 1 : 0 }}>
            {item.label}
          </span>
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
      className="flex h-full flex-col overflow-hidden"
      style={{
        width: expanded ? (tactil ? "100%" : ANCHO_BARRA_ABIERTA) : 64,
        background: "var(--rail)",
        color: "var(--rail-text)",
        borderRight: "1px solid var(--rail-border)",
      }}
    >
      {/* La marca. Con el rail cerrado queda solo el isotipo, centrado en sus 64 px. */}
      <div className={`relative flex flex-shrink-0 items-start gap-3 ${expanded ? "px-5 pb-4 pt-5" : "justify-center px-0 pb-4 pt-5"}`}>
        <Link
          to="/app"
          onClick={onClose}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[var(--rail-active-mark)]"
          style={{ color: "var(--marca-tinta)" }}
          aria-label="Aviatory, inicio"
        >
          <Isotipo className={`flex-shrink-0 ${expanded ? "h-10 w-10" : "mx-auto h-9 w-9"}`} />
          {expanded && (
            <span className="min-w-0">
              <span className="titular block whitespace-nowrap text-[27px] font-bold leading-none tracking-[-0.01em]">
                Aviatory
              </span>
              <span
                className="versalitas mt-1.5 block whitespace-nowrap text-[8px] leading-[1.6] tracking-[0.2em]"
                style={{ color: "var(--rail-section-label)" }}
              >
                Tu siguiente destino,
                <br />
                más cerca
              </span>
            </span>
          )}
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-2 top-3 rounded-lg p-2 transition-colors hover:bg-[var(--rail-hover)] lg:hidden"
            style={{ color: "var(--rail-text)" }}
            aria-label="Cerrar menú"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {onPinChange && !forceExpanded && expanded && (
          <button
            type="button"
            onClick={() => onPinChange(!pinned)}
            className="absolute right-2 top-3 hidden rounded-lg p-1.5 transition-colors hover:bg-[var(--rail-hover)] lg:inline-flex"
            style={{ color: "var(--rail-text)" }}
            aria-label={pinned ? "Contraer la barra" : "Fijar la barra abierta"}
            title={pinned ? "Contraer la barra" : "Fijar la barra abierta"}
          >
            {pinned ? <ChevronsLeft className="h-[18px] w-[18px]" strokeWidth={1.6} /> : <ChevronsRight className="h-[18px] w-[18px]" strokeWidth={1.6} />}
          </button>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3.5 pb-3 pt-1 [scrollbar-width:thin]" aria-label="Principal">
        {navSections.map((section, i) => (
          <Fragment key={section.label ?? "inicio"}>
            {section.label && (
              <>
                {/* Filete entre grupos; el primero (Formación) cuelga directo de Inicio. */}
                {i > 1 && <div aria-hidden className="mx-1 my-2.5 h-px flex-shrink-0" style={{ background: "var(--rail-border)" }} />}
                {expanded ? (
                  <div
                    className={`versalitas whitespace-nowrap px-3 text-[10.5px] ${tactil ? "pb-2 pt-3" : i === 1 ? "pb-1.5 pt-4" : "pb-1.5 pt-1"}`}
                    style={{ color: "var(--rail-section-label)" }}
                  >
                    {section.label}
                  </div>
                ) : (
                  i === 1 && <div aria-hidden className="mx-1 my-2.5 h-px flex-shrink-0" style={{ background: "var(--rail-border)" }} />
                )}
              </>
            )}
            {section.items.map(renderItem)}
          </Fragment>
        ))}
      </nav>

      {/* Pro, sobre el cielo con el ala. */}
      <div className="flex-shrink-0 px-3.5 pb-3 pt-2">
        <Link
          to="/pricing"
          onClick={onClose}
          title={expanded ? undefined : "Aviatory Pro · Ver planes"}
          className="group relative block overflow-hidden rounded-2xl outline-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--rail-active-mark)]"
          style={{ background: "var(--rail-promo)", boxShadow: "0 10px 24px -14px rgb(11 30 58 / 55%)" }}
        >
          {expanded ? (
            <>
              <CieloConAla className="absolute inset-0 h-full w-full" />
              <div className="relative px-5 pb-4 pt-4 [@media(min-height:960px)]:pb-5 [@media(min-height:960px)]:pt-5">
                <p className="versalitas m-0 text-[9.5px] text-white/70">Aviatory Pro</p>
                <p className="titular m-0 mt-1.5 text-[19px] font-medium leading-[1.15] text-white [@media(min-height:960px)]:text-[23px]">
                  Lleva tu carrera
                  <br />
                  más lejos.
                </p>
                <span aria-hidden className="mt-3 hidden h-px w-8 bg-white/70 [@media(min-height:960px)]:block" />
                <span className="mt-2.5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white/90 [@media(min-height:960px)]:mt-3">
                  Ver planes
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </>
          ) : (
            <div className="relative flex h-10 items-center justify-center">
              <Sparkles className="h-[18px] w-[18px] text-white/85" strokeWidth={1.6} aria-hidden />
            </div>
          )}
        </Link>
        {expanded && (
          <div className="mt-3 hidden flex-col items-center gap-2 [@media(min-height:960px)]:flex">
            <p className="versalitas m-0 text-center text-[8.5px] leading-[1.7]" style={{ color: "var(--rail-section-label)" }}>
              Mejores pilotos.
              <br />
              Más oportunidades.
            </p>
            <span aria-hidden className="h-px w-10" style={{ background: "var(--rail-border)" }} />
          </div>
        )}
      </div>
    </aside>
  )
}
