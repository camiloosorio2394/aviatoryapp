import { Fragment, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  BookOpen,
  Radio,
  Briefcase,
  Radar,
  Clock,
  Calendar,
  Users,
  Map,
  Plane,
  Gift,
  GraduationCap,
  User,
  ArrowRight,
  Sparkles,
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
  icon: React.ComponentType<{ className?: string; size?: number; strokeWidth?: number; style?: React.CSSProperties }>
  end?: boolean
  /** Módulo en construcción (página placeholder) — muestra chip "Pronto". */
  soon?: boolean
}

interface NavSection {
  /** Section header; omit on first group (Dashboard standalone). */
  label?: string
  items: NavItem[]
}

/**
 * El menú separa lo que se ESTUDIA de lo que se USA.
 *
 * "Módulos" es el catálogo académico: los cursos que ofrece Aviatory, y nada
 * más. Es la vitrina del producto, así que cada curso nuevo entra ahí y la
 * lista crece sola. Los que todavía no tienen contenido van al final del
 * grupo con su «Pronto».
 *
 * Todo lo demás son herramientas que operan sobre datos del piloto o de la
 * comunidad. "Qué cayó en el examen" y "Para cuál calificas" parecen contenido
 * de un módulo pero no lo son: no se estudian, se consultan.
 *
 * Antes el menú agrupaba por tipo de actividad (Estudio, Carrera, Operación) y
 * contaba una historia distinta de la del producto: doce entradas planas donde
 * hay cuatro cursos y un puñado de utilidades.
 */
const navSections: NavSection[] = [
  {
    items: [{ to: "/app", label: "Inicio", icon: LayoutDashboard, end: true }],
  },
  {
    label: "Módulos",
    items: [
      { to: "/app/pca", label: "Examen PCA", icon: BookOpen },
      { to: "/app/icao", label: "Inglés ICAO", icon: Radio },
      { to: "/app/aerolinea", label: "Ingreso a aerolínea", icon: Briefcase },
      // Psicotécnicas no está aquí a propósito: es un tema **dentro** de
      // Ingreso a aerolínea, igual que NOTAM, meteorología y mercancías, y
      // ninguno de esos tiene entrada propia. Tenerla la vendía como un quinto
      // curso, y encima la entrada llevaba al panorama de assessment —nueve
      // categorías, seis todavía vacías— en vez de al tema con los ejercicios.
      // El panorama sigue existiendo, ahora colgando del propio tema.
      { to: "/app/materias", label: "Materias generales", icon: GraduationCap, soon: true },
      // Entrevistas vivía sola en un grupo plegable «Próximamente». Con un
      // único módulo, la cabecera del pliegue ocupaba lo mismo que el módulo y
      // pedía un clic de más para verlo.
      { to: "/app/entrevistas", label: "Entrevistas", icon: Video, soon: true },
    ],
  },
  {
    label: "Herramientas",
    items: [
      // La Biblioteca ocupa el sitio que tenía "Banco oficial": ese documento se
      // mudó a ella, así que el menú queda igual de largo.
      { to: "/app/biblioteca", label: "Biblioteca", icon: LibraryIcon },
      { to: "/app/examenes", label: "Qué cayó en el examen", icon: Radar },
      { to: "/app/match", label: "Para cuál calificas", icon: Plane },
      { to: "/app/logbook", label: "Logbook", icon: Clock },
      { to: "/app/vencimientos", label: "Vencimientos", icon: Calendar },
      { to: "/app/ruta", label: "Mi ruta", icon: Map },
    ],
  },
  {
    label: "Cuenta",
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
  /** Sidebar fijo (expandido siempre, sin depender del hover). */
  pinned?: boolean
  /** Toggle del fijado (muestra el botón pin/soltar en el header desktop). */
  onPinChange?: (pinned: boolean) => void
}

/**
 * La navegación lateral: rail de 64 px que se abre a 240 al pasar el ratón, o
 * fijo abierto. En el teléfono es el cajón.
 *
 * Habla como los hubs: el lienzo de fondo, el ítem activo como una tarjeta
 * blanca apoyada en él (en oscuro, una placa de luz), los grupos con el rótulo
 * en Archivo y el único navy en la tarjeta de Pro, el del velo de los heros.
 * Los colores viven en los tokens `--rail-*`; el componente no sabe en qué
 * tema está.
 *
 * Las filas miden 32 px en escritorio para que el menú entero quepa en un
 * portátil de 768 px de alto sin desplazarse; en el cajón del teléfono, 44,
 * que es lo que pide un dedo.
 *
 * Para que el topbar no se interponga con la expansión, el AppLayout consume
 * `onHoverChange` y empuja el contenido principal (incluido el topbar)
 * dinámicamente — el rail nunca se solapa con el header.
 */
export function AppSidebar({ onClose, forceExpanded = false, onHoverChange, pinned = false, onPinChange }: Props) {
  const [hovered, setHovered] = useState(false)
  const expanded = forceExpanded || pinned || hovered
  const tactil = forceExpanded

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
      className={`group relative flex items-center gap-3 rounded-[10px] px-2.5 font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--rail-active-mark)] ${
        tactil ? "h-11 text-[15px]" : "h-8 text-[13.5px]"
      }`}
      style={({ isActive }) =>
        isActive
          ? {
              color: "var(--rail-active-text)",
              background: "var(--rail-active-bg)",
              boxShadow: "var(--rail-active-shadow)",
              fontWeight: 600,
            }
          : // Un módulo sin contenido va en el gris de los rótulos: se ve que
            // existe y que todavía no es para hoy, y sigue pasando el contraste.
            { color: item.soon ? "var(--rail-section-label)" : "var(--rail-text)" }
      }
    >
      {({ isActive }) => (
        <>
          {/* El fondo del hover va en una capa aparte: así no pisa la tarjeta
              del activo, que lleva su propio fondo en línea. */}
          {!isActive && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[10px] opacity-0 transition-opacity group-hover:opacity-100"
              style={{ background: "var(--rail-hover)" }}
            />
          )}
          <item.icon
            size={18}
            strokeWidth={isActive ? 2 : 1.75}
            className="relative flex-shrink-0 transition-colors"
            style={{
              color: isActive ? "var(--rail-active-mark)" : "currentColor",
              // Un módulo sin contenido se ve a media luz en el rail cerrado;
              // abierto, lo dice su «Pronto».
              opacity: item.soon && !expanded ? 0.5 : 1,
            }}
          />
          <span
            className="relative min-w-0 flex-1 truncate transition-opacity duration-200"
            style={{ opacity: expanded ? 1 : 0 }}
          >
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

        64 px de alto, los mismos que la barra superior: con 60 los dos filetes
        quedaban a distinta altura y se veía el escalón.
      */}
      <div
        className="flex h-16 flex-shrink-0 items-center gap-2.5 px-3.5"
        style={{ borderBottom: "1px solid var(--rail-border)" }}
      >
        <Link to="/app" onClick={onClose} className="flex min-w-0 flex-1 items-center gap-2.5">
          {/*
            El isotipo va solo: el asset ya trae su propio squircle azul. La caja
            con gradiente que lo envolvía apilaba dos azules y dos radios.
            36px dentro de px-3.5 deja el centro en 32px, o sea el eje exacto
            del rail colapsado (64px).
          */}
          <LogoIsotype variant="color" className="h-9 w-9 flex-shrink-0 rounded-full" />
          {forceExpanded && (
            <div
              className="rotulo whitespace-nowrap text-[18px] font-bold tracking-[-0.02em]"
              style={{ color: "var(--rail-text-active)" }}
            >
              Aviatory
            </div>
          )}
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="-mr-1 rounded-lg p-2 transition-colors hover:bg-[var(--rail-hover)] lg:hidden"
            style={{ color: "var(--rail-text)" }}
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
            className="-mr-1 hidden rounded-md p-1.5 transition-colors hover:bg-[var(--rail-hover)] lg:inline-flex"
            style={{ color: "var(--rail-text)" }}
            aria-label={pinned ? "Soltar sidebar (auto-colapsar)" : "Fijar sidebar"}
            title={pinned ? "Soltar sidebar (auto-colapsar)" : "Fijar sidebar"}
          >
            {pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
          </button>
        )}
      </div>

      {/* Nav — agrupada en secciones */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2.5 pb-3 pt-2 [scrollbar-width:thin]">
        {navSections.map((section, sectionIdx) => (
          <Fragment key={section.label ?? `s-${sectionIdx}`}>
            {/* El rótulo de los hubs; con el rail cerrado, un filete. */}
            {section.label &&
              (expanded ? (
                <div
                  className={`rotulo whitespace-nowrap px-2.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] ${
                    tactil ? "pb-2 pt-5" : "pb-1.5 pt-4"
                  }`}
                  style={{ color: "var(--rail-section-label)" }}
                >
                  {section.label}
                </div>
              ) : (
                <div className="mx-2.5 my-2 h-px flex-shrink-0" style={{ background: "var(--rail-border)" }} />
              ))}

            {section.items.filter((i) => !i.soon).map(renderItem)}
            {/* Lo que todavía no tiene contenido, al final del grupo y bajo su
                propio rótulo. Con un chip «Pronto» en cada fila el nombre no
                cabía: «Materias generales» se cortaba en «Materias gen…». */}
            {expanded && section.items.some((i) => i.soon) && (
              <div
                className="rotulo flex items-center gap-2 px-2.5 pb-1 pt-2 text-[9.5px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: "var(--rail-section-label)" }}
              >
                Pronto
                <span aria-hidden className="h-px flex-1" style={{ background: "var(--rail-border)" }} />
              </div>
            )}
            {section.items.filter((i) => i.soon).map(renderItem)}
          </Fragment>
        ))}
      </nav>

      {/* Pro: la única pieza navy del rail, la del velo de los heros. */}
      <div className="flex-shrink-0 p-2.5">
        <Link
          to="/pricing"
          onClick={onClose}
          title={expanded ? undefined : "Aviatory Pro · Prueba gratis"}
          className="group relative block overflow-hidden rounded-xl outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--rail-active-mark)]"
          style={{
            background: "var(--rail-promo)",
            boxShadow: "0 1px 2px rgb(11 27 48 / 12%)",
          }}
        >
          {/* Un brillo azul en la esquina, como la luz de la cabina de los heros. */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full opacity-60 blur-2xl"
            style={{ background: "var(--av-blue-500)" }}
          />
          {expanded ? (
            <div className="relative flex items-center gap-3 px-3 py-2.5">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold text-white">
                  <Sparkles className="h-3.5 w-3.5 flex-shrink-0 text-[#7FB2F2]" aria-hidden /> Aviatory Pro
                </div>
                <div className="mt-0.5 whitespace-nowrap text-[12px] leading-snug text-white/75">
                  Pruébalo gratis · Ver planes
                </div>
              </div>
              {/* La flecha redonda de las tarjetas de módulo. */}
              <span
                aria-hidden
                className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-white text-[#0B1B30] transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          ) : (
            <div className="relative flex h-10 items-center justify-center">
              <Sparkles className="h-[18px] w-[18px] text-[#7FB2F2]" aria-hidden />
            </div>
          )}
        </Link>
      </div>
    </aside>
  )
}
