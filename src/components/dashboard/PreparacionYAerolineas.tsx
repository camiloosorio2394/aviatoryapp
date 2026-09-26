import { Link } from "react-router-dom"
import fotoDeRespaldo from "@/assets/photos/aerolinea-piloto.webp"
import { ArrowRight, BookOpen, Clock3, Plane } from "lucide-react"
import type { Airline } from "@/services/aerolineas"
import { Barra, TarjetaPanel } from "@/components/dashboard/ResumenPiloto"
import { TEXTO_CONVOCATORIA, estadoDeConvocatoria, horas } from "@/components/dashboard/portada"

// ─── Continúa tu preparación ────────────────────────────────────────────────

export interface ModuloParaSeguir {
  titulo: string
  hub: string
  foto?: string
  color: string
  pct: number
  /** Posición del módulo en la lista, desde 1. */
  numero: number
  total: number
}

export function ContinuaPreparacion({ modulo }: { modulo: ModuloParaSeguir }) {
  const cta = modulo.pct >= 100 ? "Repasar" : modulo.pct > 0 ? "Continuar" : "Empezar"
  return (
    <TarjetaPanel icon={BookOpen} titulo="Continúa tu preparación" to="/app/aerolinea">
      <div className="flex min-w-0 flex-col gap-5 @2xl:flex-row @2xl:items-center">
        <div
          className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl @2xl:w-[220px]"
          style={{ background: `color-mix(in oklab, ${modulo.color} 55%, #0B1826)` }}
        >
          {/* Los módulos sin portada propia usan la de Ingreso a aerolínea. */}
          <img src={modulo.foto ?? fotoDeRespaldo} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="m-0 text-[12.5px] text-muted-foreground">
            Ingreso a aerolínea · Módulo {modulo.numero} de {modulo.total}
          </p>
          <h3 className="nh-display m-0 mt-1.5 text-[21px] font-bold leading-tight tracking-[-0.02em] text-foreground">{modulo.titulo}</h3>
          <div className="mt-4 flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <Barra pct={modulo.pct} etiqueta={`Avance en ${modulo.titulo}`} />
            </div>
            <span className="tabular shrink-0 text-[13px] font-semibold text-foreground">{Math.round(modulo.pct)} %</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link
              to={modulo.hub}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-foreground px-5 text-[13.5px] font-semibold text-background transition-opacity hover:opacity-90"
            >
              {cta} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              to="/app/perfil#plan-de-estudio"
              className="inline-flex h-10 items-center rounded-lg border border-border bg-card px-5 text-[13.5px] font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Ver plan de estudio
            </Link>
          </div>
        </div>
      </div>
    </TarjetaPanel>
  )
}

// ─── Tu perfil frente a aerolíneas ──────────────────────────────────────────

/**
 * Los logos oficiales se ponen en public/aerolineas/<código>.svg y se listan
 * aquí. Mientras no estén, va el nombre en el color de la marca.
 */
const LOGOS: Partial<Record<string, string>> = {}

export function LogoAerolinea({ aerolinea }: { aerolinea: Airline }) {
  const logo = aerolinea.code ? LOGOS[aerolinea.code] : undefined
  if (logo) return <img src={logo} alt={aerolinea.name} className="h-6 w-auto max-w-[140px] object-contain" />
  return (
    <span
      className="nh-display block truncate text-[18px] font-extrabold tracking-[-0.02em]"
      style={{ color: aerolinea.brand_color ?? "var(--foreground)" }}
    >
      {aerolinea.name.replace(/ Colombia$/, "")}
    </span>
  )
}

function TarjetaAerolinea({ aerolinea, horasPiloto }: { aerolinea: Airline; horasPiloto: number | null }) {
  const requeridas = aerolinea.requirements.min_hours_total ?? null
  const tiene = horasPiloto ?? 0
  const faltan = requeridas ? Math.max(0, Math.ceil(requeridas - tiene)) : null
  const convocatoria = estadoDeConvocatoria(aerolinea)
  return (
    <Link to="/app/match" className="group flex min-w-0 flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/40">
      <div className="flex items-center justify-between gap-2">
        <LogoAerolinea aerolinea={aerolinea} />
        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
      </div>
      <span
        className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-[11px] font-semibold"
        style={{ color: convocatoria === "abierta" ? "var(--av-success-fg)" : "var(--muted-foreground)" }}
      >
        <Clock3 className="h-3 w-3" aria-hidden />
        {TEXTO_CONVOCATORIA[convocatoria]}
      </span>
      <p className="m-0 mt-3 text-[13px] font-medium text-foreground">Primer oficial</p>
      <p className="m-0 mt-0.5 text-[12.5px] text-muted-foreground">
        Horas requeridas: {requeridas ? horas.format(requeridas) : "sin dato"}
      </p>
      {requeridas && (
        <div className="mt-auto pt-3">
          <Barra pct={(tiene / requeridas) * 100} etiqueta={`Horas frente a ${aerolinea.name}`} />
          <div className="mt-1.5 flex items-baseline justify-between gap-2 text-[12px]">
            <span className="tabular text-muted-foreground">
              {horas.format(tiene)} / {horas.format(requeridas)}
            </span>
            {faltan === 0 ? (
              <span className="font-semibold" style={{ color: "var(--av-success-fg)" }}>
                Cumples las horas
              </span>
            ) : (
              <span className="tabular text-muted-foreground">Te faltan {horas.format(faltan ?? 0)} h</span>
            )}
          </div>
        </div>
      )}
    </Link>
  )
}

export function PerfilFrenteAerolineas({
  aerolineas,
  horasPiloto,
  cargando,
}: {
  aerolineas: Airline[]
  horasPiloto: number | null
  cargando: boolean
}) {
  return (
    <div className="flex min-w-0 flex-col rounded-2xl surface p-5">
      <div className="flex items-start gap-3.5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-muted text-foreground">
          <Plane className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="m-0 mt-0.5 text-[15px] font-semibold tracking-[-0.01em] text-foreground">Tu perfil frente a aerolíneas</h2>
          <p className="m-0 mt-0.5 text-[12.5px] text-muted-foreground">
            {horasPiloto
              ? `Con tus ${horas.format(horasPiloto)} horas actuales, revisa en qué aerolíneas cumples requisitos.`
              : "Anota tus horas en el perfil y verás cuánto te falta para cada aerolínea."}
          </p>
        </div>
        <Link to="/app/match" className="mt-1 inline-flex shrink-0 items-center gap-1 text-[12.5px] font-semibold text-foreground">
          Ver todas <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
      <div className="mt-4 grid flex-1 grid-cols-1 gap-3 @xl:grid-cols-3">
        {cargando
          ? [0, 1, 2].map((i) => <div key={i} className="h-[178px] animate-pulse rounded-xl bg-muted" />)
          : aerolineas.slice(0, 3).map((a) => <TarjetaAerolinea key={a.id} aerolinea={a} horasPiloto={horasPiloto} />)}
      </div>
    </div>
  )
}
