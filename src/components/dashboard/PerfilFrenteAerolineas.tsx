import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import type { Airline } from "@/services/aerolineas"
import type { Convocatoria } from "@/services/convocatorias"
import { LogoAerolinea } from "@/components/LogoAerolinea"
import { AvisoConvocatoria, BotonRequisitos } from "@/components/convocatorias/Convocatoria"
import { Barra, EncabezadoSeccion } from "@/components/dashboard/ResumenPiloto"
import { horas } from "@/components/dashboard/portada"
import { resumenDeConvocatorias } from "@/lib/convocatorias"

// ─── Tu perfil frente a aerolíneas ──────────────────────────────────────────

function TarjetaAerolinea({
  aerolinea,
  horasPiloto,
  convocatorias,
}: {
  aerolinea: Airline
  horasPiloto: number | null
  convocatorias: Convocatoria[]
}) {
  const requeridas = aerolinea.requirements.min_hours_total ?? null
  const tiene = horasPiloto ?? 0
  const faltan = requeridas ? Math.max(0, Math.ceil(requeridas - tiene)) : null
  const resumen = resumenDeConvocatorias(aerolinea.id, convocatorias)
  return (
    <article className="surface flex min-w-0 flex-col rounded-2xl p-5">
      <div className="flex items-center justify-between gap-2">
        <LogoAerolinea aerolinea={aerolinea} />
        <Link
          to="/app/match"
          aria-label={`Ver ${aerolinea.name} en Elegibilidad`}
          className="-mr-1.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
        <AvisoConvocatoria resumen={resumen} />
        <BotonRequisitos aerolinea={aerolinea} resumen={resumen} />
      </div>
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
    </article>
  )
}

export function PerfilFrenteAerolineas({
  aerolineas,
  horasPiloto,
  convocatorias,
  cargando,
}: {
  /** Ya ordenadas: las que tienen convocatoria abierta van primero. */
  aerolineas: Airline[]
  horasPiloto: number | null
  convocatorias: Convocatoria[]
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
          ? [0, 1, 2].map((i) => <div key={i} className="h-[212px] animate-pulse rounded-2xl bg-muted" />)
          : aerolineas
              .slice(0, 3)
              .map((a) => <TarjetaAerolinea key={a.id} aerolinea={a} horasPiloto={horasPiloto} convocatorias={convocatorias} />)}
      </div>
    </section>
  )
}
