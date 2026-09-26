import { Link } from "react-router-dom"
import { ArrowRight, Clock3 } from "lucide-react"
import type { Airline } from "@/services/aerolineas"
import { LogoAerolinea } from "@/components/LogoAerolinea"
import { Barra, EncabezadoSeccion } from "@/components/dashboard/ResumenPiloto"
import { TEXTO_CONVOCATORIA, estadoDeConvocatoria, horas } from "@/components/dashboard/portada"

// ─── Tu perfil frente a aerolíneas ──────────────────────────────────────────

function TarjetaAerolinea({ aerolinea, horasPiloto }: { aerolinea: Airline; horasPiloto: number | null }) {
  const requeridas = aerolinea.requirements.min_hours_total ?? null
  const tiene = horasPiloto ?? 0
  const faltan = requeridas ? Math.max(0, Math.ceil(requeridas - tiene)) : null
  const convocatoria = estadoDeConvocatoria(aerolinea)
  return (
    <Link to="/app/match" className="group surface surface-lift flex min-w-0 flex-col rounded-2xl p-5">
      <div className="flex items-center justify-between gap-2">
        <LogoAerolinea aerolinea={aerolinea} />
        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
      </div>
      <span
        className="mt-2.5 inline-flex w-fit items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-[11px] font-medium"
        style={{ color: convocatoria === "abierta" ? "var(--av-success-fg)" : "var(--muted-foreground)" }}
      >
        <Clock3 className="h-3 w-3" aria-hidden />
        {TEXTO_CONVOCATORIA[convocatoria]}
      </span>
      <p className="m-0 mt-4 text-[12.5px] text-muted-foreground">Primer oficial · horas requeridas</p>
      <p className="cifra m-0 mt-1 text-[22px] leading-none text-foreground">
        {requeridas ? horas.format(requeridas) : "Sin dato"}
        {requeridas && <span className="ml-1 text-[13px] font-normal tracking-normal text-muted-foreground">h</span>}
      </p>
      {requeridas && (
        <div className="mt-auto pt-4">
          <Barra pct={(tiene / requeridas) * 100} etiqueta={`Horas frente a ${aerolinea.name}`} />
          <div className="mt-2.5 flex items-baseline justify-between gap-2 text-[12px]">
            <span className="tabular text-muted-foreground">
              Tienes {horas.format(tiene)} h
            </span>
            {faltan === 0 ? (
              <span className="font-medium" style={{ color: "var(--av-success-fg)" }}>
                Cumples las horas
              </span>
            ) : (
              <span className="tabular text-muted-foreground">Faltan {horas.format(faltan ?? 0)} h</span>
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
    <section className="flex min-w-0 flex-col gap-4">
      <EncabezadoSeccion
        icono="aerolineas"
        titulo="Tu perfil frente a aerolíneas"
        bajada={
          horasPiloto
            ? `Con tus ${horas.format(horasPiloto)} horas, esto te falta para cada una.`
            : "Anota tus horas en el perfil y verás cuánto te falta para cada una."
        }
        accion={{ texto: "Ver todas", to: "/app/match" }}
      />
      <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-3">
        {cargando
          ? [0, 1, 2].map((i) => <div key={i} className="h-[196px] animate-pulse rounded-2xl bg-muted" />)
          : aerolineas.slice(0, 3).map((a) => <TarjetaAerolinea key={a.id} aerolinea={a} horasPiloto={horasPiloto} />)}
      </div>
    </section>
  )
}
