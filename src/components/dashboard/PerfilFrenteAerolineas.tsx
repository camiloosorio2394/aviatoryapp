import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import type { Airline } from "@/services/aerolineas"
import type { Convocatoria } from "@/services/convocatorias"
import { TarjetaConvocatoria } from "@/components/convocatorias/Convocatoria"
import { EncabezadoSeccion } from "@/components/dashboard/ResumenPiloto"
import { convocatoriasAbiertas, esDeIngreso, type PerfilParaConvocatoria } from "@/lib/convocatorias"

// ─── Tu perfil frente a aerolíneas ──────────────────────────────────────────

/**
 * Solo las convocatorias de ingreso que están abiertas hoy (Camilo,
 * 26-sep-2026: «en el perfil debe haber solo las que tengan abierta»), cada
 * una con lo que pide frente a lo que tiene el piloto. Las de capitán y las
 * aerolíneas sin convocatoria están en Elegibilidad.
 */
export function PerfilFrenteAerolineas({
  aerolineas,
  convocatorias,
  piloto,
  cargando,
}: {
  aerolineas: Airline[]
  convocatorias: Convocatoria[]
  piloto: PerfilParaConvocatoria
  cargando: boolean
}) {
  const porId = new Map(aerolineas.map((a) => [a.id, a]))
  const abiertas = convocatoriasAbiertas(convocatorias).filter((c) => esDeIngreso(c) && porId.has(c.airlineId))
  const total = convocatoriasAbiertas(convocatorias).filter((c) => porId.has(c.airlineId)).length
  const otras = total - abiertas.length
  return (
    <section className="flex min-w-0 flex-col gap-4">
      <EncabezadoSeccion
        icono="aerolineas"
        titulo="Tu perfil frente a aerolíneas"
        bajada={
          cargando
            ? "Buscando convocatorias abiertas…"
            : abiertas.length > 0
              ? `${abiertas.length === 1 ? "Una convocatoria abierta" : `${abiertas.length} convocatorias abiertas`} para primer oficial, frente a tus horas y tu inglés.`
              : "Hoy ninguna aerolínea tiene convocatoria abierta para primer oficial."
        }
        accion={{ texto: otras > 0 ? `Ver todas (${total})` : "Ver todas", to: "/app/match" }}
      />
      {cargando ? (
        <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[236px] animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : abiertas.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2 @5xl:grid-cols-3">
          {abiertas.slice(0, 6).map((c) => (
            <TarjetaConvocatoria key={c.id} convocatoria={c} aerolinea={porId.get(c.airlineId) as Airline} piloto={piloto} />
          ))}
        </div>
      ) : (
        <div className="surface flex flex-col items-start gap-3 rounded-2xl p-5 @2xl:flex-row @2xl:items-center @2xl:justify-between">
          <p className="m-0 text-[13.5px] text-muted-foreground">
            Revisamos los portales de empleo de las aerolíneas cada 6 horas. En cuanto una abra, aparece aquí.
          </p>
          <Link to="/app/match" className="group inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-foreground">
            Ver los requisitos de cada aerolínea
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      )}
    </section>
  )
}
