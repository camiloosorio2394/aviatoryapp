import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Target } from "lucide-react"
import { toast } from "sonner"
import { PERFIL_VACIO, traerAerolineasYPiloto, type Airline, type PilotProfile } from "@/services/aerolineas"
import { useSession } from "@/hooks/useSession"
import { MisPostulaciones } from "@/components/postulaciones/MisPostulaciones"
import { PageHeader } from "@/components/ui/page-header"
import { KpiRing } from "@/components/ui/kpi-ring"
import { Bandera, TarjetaConvocatoria, TarjetaSinConvocatoria } from "@/components/convocatorias/Convocatoria"
import { traerConvocatorias, type Convocatoria } from "@/services/convocatorias"
import {
  agruparPorPais,
  chequeosDeConvocatoria,
  convocatoriasAbiertas,
  esDeIngreso,
  nombreDelCargo,
  resumenDeConvocatorias,
  type Chequeo,
  type PerfilParaConvocatoria,
} from "@/lib/convocatorias"
import { reportarError } from "@/lib/errores"
import { TILE_COLOR, tileTint, tileBorder } from "@/lib/tileColors"

/**
 * Elegibilidad: las convocatorias abiertas de las aerolíneas, por país, y lo
 * que pide cada una frente al perfil del piloto.
 *
 * Desde el 26-sep-2026 (pedido de Camilo) todo sale de la convocatoria: las
 * horas y el nivel de inglés son los que publicó la aerolínea, no una tabla
 * nuestra. Cada convocatoria va por separado, con su cargo y su país, y las
 * aerolíneas sin nada abierto quedan al final con sus últimos requisitos.
 */
export function Airlines() {
  const { user } = useSession()
  const [airlines, setAirlines] = useState<Airline[]>([])
  const [pilot, setPilot] = useState<PilotProfile>(PERFIL_VACIO)
  const [loading, setLoading] = useState(true)
  const [convocatorias, setConvocatorias] = useState<Convocatoria[]>([])

  useEffect(() => {
    let cancelled = false
    async function load() {
      // Aparte: si fallan, cada aerolínea sale «Pendiente por abrir» y la pantalla sigue.
      traerConvocatorias()
        .then((lista) => {
          if (!cancelled) setConvocatorias(lista)
        })
        .catch((err) => reportarError("elegibilidad: convocatorias", err))
      try {
        const { aerolineas, piloto } = await traerAerolineasYPiloto(user?.id)
        if (cancelled) return
        setAirlines(aerolineas)
        setPilot(piloto)
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "No pudimos cargar las aerolíneas")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [user])

  // Sin horas ni licencias no hay nada real que comparar: no inventamos un match.
  const profileReady = (pilot.totalHours ?? 0) > 0 || pilot.licenses.length > 0
  const perfil: PerfilParaConvocatoria = { horas: pilot.totalHours, icao: pilot.icaoLevel, pais: pilot.pais }

  const porId = new Map(airlines.map((a) => [a.id, a]))
  const abiertas = convocatoriasAbiertas(convocatorias).filter((c) => porId.has(c.airlineId))
  const grupos = agruparPorPais(abiertas, pilot.pais)
  const sinAbierta = airlines.filter((a) => !abiertas.some((c) => c.airlineId === a.id))

  /** La convocatoria de ingreso abierta en la que el piloto está más cerca, entre las que publican algo que comparar. */
  const mejor = profileReady
    ? abiertas
        .filter(esDeIngreso)
        .map((c) => {
          const chequeos = chequeosDeConvocatoria(c, perfil)
          const conDato = chequeos.filter((ch) => ch.cumple !== null)
          const pct = conDato.length ? Math.round((conDato.filter((ch) => ch.cumple).length / conDato.length) * 100) : 0
          return { c, chequeos, pct }
        })
        .filter((x) => x.chequeos.length > 0)
        .sort((a, b) => b.pct - a.pct)[0]
    : undefined

  return (
    <>
      <div className="px-7 py-9 sm:py-11 pb-20 max-w-[1480px] mx-auto">
        <PageHeader
          eyebrow="CONVOCATORIAS · MATCH CON TU PERFIL"
          title="Convocatorias abiertas"
          subtitle="Lo que pide cada aerolínea en su convocatoria, por país, frente a tus horas y tu inglés. Revisamos sus portales cada 6 horas."
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[236px] rounded-2xl bg-muted" />
            ))}
          </div>
        ) : (
          <>
            {!profileReady ? (
              <PilotIdPrompt />
            ) : mejor ? (
              <MejorOpcion
                convocatoria={mejor.c}
                aerolinea={porId.get(mejor.c.airlineId) as Airline}
                chequeos={mejor.chequeos}
                pct={mejor.pct}
              />
            ) : null}

            {grupos.length === 0 ? (
              <div className="surface rounded-2xl p-6 text-[14px] text-muted-foreground">
                Hoy ninguna aerolínea tiene convocatoria de piloto abierta. En cuanto una abra, aparece aquí con sus
                requisitos.
              </div>
            ) : (
              <div className="flex flex-col gap-9">
                {grupos.map((g) => (
                  <section key={g.pais} aria-labelledby={`pais-${g.pais}`}>
                    <h2 id={`pais-${g.pais}`} className="m-0 mb-3.5 flex items-center gap-2.5 text-[18px] font-semibold tracking-[-0.01em] text-foreground">
                      <Bandera pais={g.pais} className="h-4" />
                      {g.pais}
                      <span className="text-[13px] font-normal text-muted-foreground">
                        {g.convocatorias.length === 1 ? "1 convocatoria" : `${g.convocatorias.length} convocatorias`}
                      </span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {g.convocatorias.map((c) => (
                        <TarjetaConvocatoria
                          key={c.id}
                          convocatoria={c}
                          aerolinea={porId.get(c.airlineId) as Airline}
                          piloto={perfil}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {sinAbierta.length > 0 && (
              <section className="mt-11" aria-labelledby="sin-convocatoria">
                <h2 id="sin-convocatoria" className="m-0 text-[18px] font-semibold tracking-[-0.01em] text-foreground">
                  Sin convocatoria abierta
                </h2>
                <p className="m-0 mt-1 mb-3.5 text-[13px] text-muted-foreground">
                  Lo que pidieron la última vez, o lo que piden en su página de pilotos, para ir preparándote.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {sinAbierta.map((a) => (
                    <TarjetaSinConvocatoria key={a.id} aerolinea={a} resumen={resumenDeConvocatorias(a.id, convocatorias)} />
                  ))}
                </div>
              </section>
            )}

            {/* A cuál se postuló de verdad. Va debajo de las convocatorias porque
                es la misma conversación: arriba, qué hay abierto y qué piden;
                aquí, qué pasó cuando lo intentó. */}
            {user && (
              <MisPostulaciones
                userId={user.id}
                aerolineas={airlines.map((a) => ({ id: a.id, name: a.name }))}
              />
            )}
          </>
        )}
      </div>
    </>
  )
}

/** «CPL, IFR y HME». La coma serial no existe en español. */
function unirConY(partes: string[]): string {
  if (partes.length <= 1) return partes[0] ?? ""
  return `${partes.slice(0, -1).join(", ")} y ${partes[partes.length - 1]}`
}

function MejorOpcion({
  convocatoria: c,
  aerolinea,
  chequeos,
  pct,
}: {
  convocatoria: Convocatoria
  aerolinea: Airline
  chequeos: Chequeo[]
  pct: number
}) {
  const faltan = chequeos.map((ch) => ch.falta).filter((f): f is string => !!f)
  const sinDato = chequeos.filter((ch) => ch.cumple === null).map((ch) => ch.etiqueta.toLowerCase())
  return (
    <div
      className="anim-fade-up rounded-2xl surface p-6 sm:p-7 mb-8 overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, color-mix(in oklab, var(--av-blue-500) 6%, var(--card)) 0%, var(--card) 70%)",
        borderColor: "color-mix(in oklab, var(--av-blue-500) 30%, var(--border))",
      }}
    >
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="hidden sm:block flex-shrink-0">
          <KpiRing value={pct} max={100} size={104} trailing="%" color="blue" />
        </div>
        <div className="flex-1">
          <div className="text-[13px] font-semibold inline-flex items-center gap-1.5" style={{ color: "var(--av-blue-500)" }}>
            <Target className="h-[13px] w-[13px]" /> Tu mejor opción hoy
          </div>
          <h2 className="mt-2 mb-1 flex flex-wrap items-center gap-2 text-[22px] font-semibold tracking-[-0.03em] text-foreground">
            {aerolinea.name.replace(/ Colombia$/, "")} · {nombreDelCargo(c)}
            {c.pais && (
              <span className="inline-flex items-center gap-1.5 text-[15px] font-medium text-muted-foreground">
                <Bandera pais={c.pais} className="h-3.5" /> {c.pais}
              </span>
            )}
          </h2>
          <p className="m-0 text-muted-foreground text-[13px] leading-relaxed max-w-[640px]">
            {faltan.length > 0
              ? `Te falta ${unirConY(faltan)} para lo que pide su convocatoria.`
              : sinDato.length > 0
                ? `Anota tus ${unirConY(sinDato)} en tu perfil para saber si cumples.`
                : "Cumples las horas y el inglés que pide su convocatoria. Revisa el resto de requisitos y postúlate."}
          </p>
        </div>
      </div>
    </div>
  )
}

/** Pre estado: sin datos reales no mostramos porcentajes, mostramos la salida. */
function PilotIdPrompt() {
  return (
    <div className="anim-fade-up rounded-2xl border border-dashed border-border bg-card p-6 sm:p-7 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <div
          className="hidden sm:flex items-center justify-center h-[104px] w-[104px] rounded-2xl flex-shrink-0"
          style={{ background: tileTint("blue"), border: `1px solid ${tileBorder("blue")}` }}
          aria-hidden="true"
        >
          <Target className="h-9 w-9" style={{ color: TILE_COLOR.blue }} />
        </div>
        <div className="flex-1">
          <div className="text-[13px] font-semibold inline-flex items-center gap-1.5" style={{ color: "var(--av-blue-500)" }}>
            Match con las convocatorias
          </div>
          <h2 className="mt-2 mb-1 text-[24px] sm:text-[24px] font-semibold tracking-[-0.03em] text-foreground">
            Completa tu Pilot ID para ver tu match
          </h2>
          <p className="m-0 text-muted-foreground text-[13px] leading-relaxed max-w-[600px]">
            Necesitamos tus horas y tu nivel de inglés para compararlos con lo que pide cada convocatoria. Abajo
            puedes ver los requisitos mientras tanto.
          </p>
          <Link
            to="/app/perfil"
            className="mt-4 inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--av-blue-500)" }}
          >
            Completar mi Pilot ID <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
