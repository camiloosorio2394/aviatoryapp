import { Link } from "react-router-dom"
import {
  ArrowRight,
  Briefcase,
  FileSearch,
  Wrench,
  Users,
  CloudSun,
  TrendingUp,
  Cog,
  Brain,
  ClipboardList,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { SectionTitle } from "@/components/ui/section-title"
import { TILE_COLOR, tileTint, type TileColorKey } from "@/lib/tileColors"

/**
 * Módulo Preparación para aerolínea.
 *
 * La página es una lista de TEMAS de estudio. Cada tema se abre por dentro
 * cuando su contenido está listo; hoy el único abierto es NOTAM. Antes esta
 * pantalla mostraba a la vez un hero grande, 14 chips de áreas y 7 tarjetas de
 * submódulos: cuatro bloques compitiendo y ninguna forma clara de entrar a algo.
 */

interface Tema {
  slug: string
  nombre: string
  resumen: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: TileColorKey
  /** Ruta cuando el tema ya tiene contenido. Sin ruta, se muestra como Pronto. */
  to?: string
  /** Detalle corto de lo que ya está disponible adentro. */
  disponible?: string
}

const TEMAS: Tema[] = [
  {
    slug: "notam",
    nombre: "NOTAM",
    resumen:
      "Qué es un NOTAM, cómo se lee la línea Q y cómo decodificar cualquier aviso. Con material real de la Aerocivil.",
    icon: FileSearch,
    color: "blue",
    to: "/app/aerolinea/notam",
    disponible: "Lección, decodificador, práctica y evaluación",
  },
  {
    slug: "meteorologia",
    nombre: "Meteorología operacional",
    resumen: "METAR, TAF y la meteorología que de verdad te preguntan en la entrevista técnica.",
    icon: CloudSun,
    color: "cyan",
  },
  {
    slug: "performance",
    nombre: "Performance y planificación",
    resumen: "Distancias declaradas, cálculo de despegue y aterrizaje, y planificación de vuelo.",
    icon: TrendingUp,
    color: "amber",
  },
  {
    slug: "sistemas",
    nombre: "Sistemas y motor a reacción",
    resumen: "Jet orientation y sistemas de turbina: el salto del pistón al equipo de aerolínea.",
    icon: Cog,
    color: "violet",
  },
  {
    slug: "entrevista-tecnica",
    nombre: "Entrevista técnica",
    resumen: "Las preguntas técnicas que hacen Avianca, LATAM, Copa y Wingo, con la respuesta esperada.",
    icon: Wrench,
    color: "blue",
  },
  {
    slug: "entrevista-hr",
    nombre: "Entrevista HR y CRM",
    resumen: "Preguntas de comportamiento, trabajo en cabina y manejo de amenazas y errores.",
    icon: Users,
    color: "green",
  },
  {
    slug: "psicotecnicos",
    nombre: "Psicotécnicos y assessment",
    resumen: "Atención dividida, memoria operacional y los casos tipo assessment de las aerolíneas.",
    icon: Brain,
    color: "violet",
  },
  {
    slug: "requisitos",
    nombre: "Requisitos por aerolínea",
    resumen: "Qué pide cada aerolínea y qué te falta a ti para postular.",
    icon: ClipboardList,
    color: "cyan",
  },
]

export function AirlinePrep() {
  const disponibles = TEMAS.filter((t) => t.to)
  const proximos = TEMAS.filter((t) => !t.to)

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-9 sm:py-11 pb-24 max-w-[1180px] mx-auto">
        <PageHeader
          eyebrow={
            <>
              <Briefcase className="h-3.5 w-3.5" /> Carrera
            </>
          }
          title="Preparación para aerolínea"
          subtitle="Los temas que evalúan las aerolíneas de Latinoamérica, uno por uno. Abrimos cada tema cuando su contenido está completo, no antes."
        />

        {/* Temas con contenido */}
        <div className="grid gap-4">
          {disponibles.map((t) => (
            <TemaAbierto key={t.slug} tema={t} />
          ))}
        </div>

        {/* Temas en construcción */}
        <div className="mt-10">
          <SectionTitle
            eyebrow="En construcción"
            title="Los que siguen"
            hint={`${proximos.length} temas más, en el orden en que los vamos abriendo.`}
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {proximos.map((t) => (
              <TemaPronto key={t.slug} tema={t} />
            ))}
          </div>
        </div>

        {/* Lo que sí puedes adelantar hoy */}
        <section className="mt-10 rounded-2xl surface p-6">
          <div className="text-[15px] font-bold">Mientras tanto</div>
          <p className="mt-1 text-[14px] text-muted-foreground leading-relaxed max-w-[680px]">
            Tu Logbook y tus vencimientos alimentan el Pilot ID que vas a necesitar el día que
            postules, y el match por aerolínea te dice qué requisito te falta para cada una.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/app/aerolineas"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-sm font-semibold border border-border bg-card hover:bg-muted transition-colors"
            >
              Ver mi match <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/app/logbook"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-sm font-semibold border border-border bg-card hover:bg-muted transition-colors"
            >
              Mi Logbook <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}

function TemaAbierto({ tema }: { tema: Tema }) {
  const Icon = tema.icon
  return (
    <Link
      to={tema.to!}
      className="group block rounded-2xl border bg-card p-6 sm:p-7 card-apple"
      style={{ borderColor: `color-mix(in oklab, ${TILE_COLOR[tema.color]} 40%, transparent)` }}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ background: tileTint(tema.color) }}
          >
            <Icon className="h-6 w-6" style={{ color: TILE_COLOR[tema.color] }} />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip chip-green text-[11px]">Disponible</span>
              {tema.disponible && (
                <span className="text-[12px] text-muted-foreground">{tema.disponible}</span>
              )}
            </div>
            <h2 className="mt-1.5 text-[20px] font-extrabold tracking-[-0.02em]">{tema.nombre}</h2>
            <p className="mt-1 text-[14px] text-muted-foreground leading-relaxed max-w-[620px]">
              {tema.resumen}
            </p>
          </div>
        </div>
        <span
          className="inline-flex flex-shrink-0 items-center gap-1.5 h-10 px-4 rounded-full text-sm font-semibold text-white"
          style={{ background: TILE_COLOR[tema.color] }}
        >
          Abrir tema{" "}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}

function TemaPronto({ tema }: { tema: Tema }) {
  const Icon = tema.icon
  return (
    <div className="rounded-2xl surface p-5">
      <div className="flex items-center gap-2">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ background: tileTint(tema.color, 10), opacity: 0.6 }}
        >
          <Icon className="h-4 w-4" style={{ color: TILE_COLOR[tema.color] }} />
        </span>
        <span className="chip text-[10px]">Pronto</span>
      </div>
      <div className="mt-2.5 text-[15px] font-bold tracking-[-0.01em]">{tema.nombre}</div>
      <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{tema.resumen}</p>
    </div>
  )
}
