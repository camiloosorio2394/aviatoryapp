import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Check, X, Globe, Target, MapPin } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { KpiRing } from "@/components/ui/kpi-ring"
import { TILE_COLOR, tileTint, tileBorder } from "@/lib/tileColors"

interface AirlineRequirements {
  min_hours_total?: number
  min_hours_pic?: number
  icao_english?: number
  licenses?: string[]
  age_max?: number
}

interface Airline {
  id: number
  name: string
  code: string | null
  country: string
  brand_color: string | null
  requirements: AirlineRequirements
  order_index: number
}

/** Fila declarada en pilot_state (lo que el piloto escribió a mano en su perfil). */
interface PilotStateRow {
  total_hours: number | null
  hours_pic: number | null
  licenses: string[] | null
  icao_english_level: number | null
}

/**
 * Perfil consolidado del piloto: la única fuente de verdad que usa esta pantalla.
 * Ver buildPilotProfile() para la regla de prioridad (es la misma que usa Perfil).
 */
interface PilotProfile {
  totalHours: number | null
  hoursPic: number | null
  icaoLevel: number | null
  licenses: string[]
}

interface MatchCheck {
  label: string
  have: string
  need: string
  passed: boolean
}

const EMPTY_PROFILE: PilotProfile = {
  totalHours: null,
  hoursPic: null,
  icaoLevel: null,
  licenses: [],
}

export function Airlines() {
  const { user } = useSession()
  const [airlines, setAirlines] = useState<Airline[]>([])
  const [pilot, setPilot] = useState<PilotProfile>(EMPTY_PROFILE)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [airlinesRes, pilotRes, flightsRes, mockRes] = await Promise.all([
          supabase.from("airlines").select("*").order("order_index"),
          user
            ? supabase
                .from("pilot_state")
                .select("total_hours, hours_pic, licenses, icao_english_level")
                .eq("user_id", user.id)
                .maybeSingle()
            : Promise.resolve({ data: null }),
          user
            ? supabase.from("flights").select("total_minutes, pic_minutes").eq("user_id", user.id)
            : Promise.resolve({ data: null }),
          user
            ? supabase
                .from("user_icao_mock_results")
                .select("final_level")
                .eq("user_id", user.id)
                .order("taken_at", { ascending: false })
                .limit(1)
                .maybeSingle()
            : Promise.resolve({ data: null }),
        ])
        if (cancelled) return
        setAirlines((airlinesRes.data ?? []) as Airline[])
        setPilot(
          buildPilotProfile(
            pilotRes.data as PilotStateRow | null,
            (flightsRes.data ?? []) as { total_minutes: number; pic_minutes: number }[],
            (mockRes.data as { final_level: number | null } | null)?.final_level ?? null
          )
        )
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

  const matches = airlines
    .map((a) => {
      const checks = buildChecks(a.requirements, pilot)
      const matchPct = checks.length
        ? Math.round((checks.filter((c) => c.passed).length / checks.length) * 100)
        : 0
      const missing = checks.filter((c) => !c.passed).length
      return { airline: a, checks, matchPct, missing }
    })
    .sort((a, b) => b.matchPct - a.matchPct)

  const bestMatch = profileReady ? matches[0] : undefined

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <PageHeader
          eyebrow="AEROLÍNEAS · MATCH CON TU PERFIL"
          title="¿Para cuál calificas hoy?"
          subtitle="Comparamos tus horas, licencias e inglés contra los requisitos públicos de cada aerolínea."
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[280px] rounded-2xl bg-muted" />
            ))}
          </div>
        ) : (
          <>
            {!profileReady ? (
              <PilotIdPrompt />
            ) : bestMatch && bestMatch.matchPct > 0 ? (
              <div
                className="anim-fade-up rounded-2xl surface p-6 sm:p-7 mb-6 overflow-hidden relative"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in oklab, var(--av-blue-500) 6%, var(--card)) 0%, var(--card) 70%)",
                  borderColor: "color-mix(in oklab, var(--av-blue-500) 30%, var(--border))",
                }}
              >
                <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="hidden sm:block flex-shrink-0">
                    <KpiRing value={bestMatch.matchPct} max={100} size={104} trailing="%" color="blue" />
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-[13px] font-semibold inline-flex items-center gap-1.5"
                      style={{ color: "var(--av-blue-500)" }}
                    >
                      <Target className="h-[13px] w-[13px]" /> Tu mejor match hoy
                    </div>
                    <h2 className="mt-2 mb-1 text-[26px] font-semibold tracking-[-0.03em] text-foreground">
                      {bestMatch.airline.name} · {bestMatch.matchPct}% match
                    </h2>
                    <p className="m-0 text-muted-foreground text-[14px] leading-relaxed max-w-[600px]">
                      {bestMatch.missing === 0
                        ? "Cumples todos los requisitos públicos. Postúlate cuando abran convocatoria."
                        : `Te faltan ${bestMatch.missing} requisito${bestMatch.missing !== 1 ? "s" : ""} para postular. Mira los detalles abajo.`}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Grid */}
            <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {matches.map((m) => (
                <AirlineCard
                  key={m.airline.id}
                  airline={m.airline}
                  checks={m.checks}
                  matchPct={m.matchPct}
                  missing={m.missing}
                  ready={profileReady}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  )
}

/**
 * Regla de prioridad de datos, idéntica a la de la pantalla de Perfil:
 *
 *  - Horas totales y PIC: el agregado real del Logbook (tabla flights) manda.
 *    Solo si el piloto todavía no registró ningún vuelo se usa el valor que
 *    declaró a mano en pilot_state.
 *  - Nivel de inglés ICAO: el nivel oficial es el del último simulacro TEA
 *    (user_icao_mock_results.final_level). Si nunca lo hizo, se cae a la
 *    estimación del test inicial guardada en pilot_state.icao_english_level.
 *  - Licencias: pilot_state.licenses (es donde el piloto las marca).
 *
 * Así el match de aerolíneas no contradice lo que el piloto ve en su Pilot ID.
 */
function buildPilotProfile(
  state: PilotStateRow | null,
  flights: { total_minutes: number; pic_minutes: number }[],
  mockIcaoLevel: number | null
): PilotProfile {
  const hasFlights = flights.length > 0
  const totalMin = flights.reduce((a, f) => a + (f.total_minutes ?? 0), 0)
  const picMin = flights.reduce((a, f) => a + (f.pic_minutes ?? 0), 0)
  return {
    totalHours: hasFlights ? totalMin / 60 : state?.total_hours ?? null,
    hoursPic: hasFlights ? picMin / 60 : state?.hours_pic ?? null,
    icaoLevel: mockIcaoLevel ?? state?.icao_english_level ?? null,
    licenses: state?.licenses ?? [],
  }
}

function fmtHours(h: number): string {
  return h % 1 === 0 ? String(h) : h.toFixed(1)
}

function buildChecks(req: AirlineRequirements, pilot: PilotProfile): MatchCheck[] {
  const checks: MatchCheck[] = []
  if (req.min_hours_total) {
    checks.push({
      label: "Horas totales",
      have: pilot.totalHours != null ? `${fmtHours(pilot.totalHours)}h` : "—",
      need: `${req.min_hours_total}h`,
      passed: (pilot.totalHours ?? 0) >= req.min_hours_total,
    })
  }
  if (req.min_hours_pic) {
    checks.push({
      label: "Horas PIC",
      have: pilot.hoursPic != null ? `${fmtHours(pilot.hoursPic)}h` : "—",
      need: `${req.min_hours_pic}h`,
      passed: (pilot.hoursPic ?? 0) >= req.min_hours_pic,
    })
  }
  if (req.icao_english) {
    checks.push({
      label: "Inglés ICAO",
      have: pilot.icaoLevel != null ? `Nivel ${pilot.icaoLevel}` : "—",
      need: `Nivel ${req.icao_english}`,
      passed: (pilot.icaoLevel ?? 0) >= req.icao_english,
    })
  }
  if (req.licenses && req.licenses.length > 0) {
    checks.push({
      label: "Licencias",
      have: pilot.licenses.length > 0 ? pilot.licenses.join(", ") : "—",
      need: req.licenses.join(" + "),
      passed: req.licenses.every((l) => pilot.licenses.includes(l)),
    })
  }
  return checks
}

/** Pre estado: sin datos reales no mostramos porcentajes, mostramos la salida. */
function PilotIdPrompt() {
  return (
    <div className="anim-fade-up rounded-2xl border border-dashed border-border bg-card p-6 sm:p-7 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <div
          className="hidden sm:flex items-center justify-center h-[104px] w-[104px] rounded-2xl flex-shrink-0"
          style={{ background: tileTint("blue"), border: `1px solid ${tileBorder("blue")}` }}
          aria-hidden="true"
        >
          <Target className="h-9 w-9" style={{ color: TILE_COLOR.blue }} />
        </div>
        <div className="flex-1">
          <div
            className="text-[13px] font-semibold inline-flex items-center gap-1.5"
            style={{ color: "var(--av-blue-500)" }}
          >
            Match con aerolíneas
          </div>
          <h2 className="mt-2 mb-1 text-[24px] sm:text-[26px] font-semibold tracking-[-0.03em] text-foreground">
            Completa tu Pilot ID para ver tu match
          </h2>
          <p className="m-0 text-muted-foreground text-[14px] leading-relaxed max-w-[600px]">
            Necesitamos tus horas y tus licencias para compararlas con los requisitos públicos de
            cada aerolínea. Abajo puedes ver esos requisitos mientras tanto.
          </p>
          <Link
            to="/app/perfil"
            className="mt-4 inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--av-blue-500)" }}
          >
            Completar mi Pilot ID <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function AirlineCard({
  airline,
  checks,
  matchPct,
  missing,
  ready,
}: {
  airline: Airline
  checks: MatchCheck[]
  matchPct: number
  missing: number
  ready: boolean
}) {
  const brand = airline.brand_color ?? TILE_COLOR.blue
  const code = airline.code ?? airline.name.slice(0, 2).toUpperCase()
  const ringColor = matchPct > 60 ? "blue" : matchPct > 40 ? "amber" : "red"

  return (
    // Sin hover-lift ni cursor-pointer: la tarjeta no es clickeable todavía.
    <div className="relative overflow-hidden rounded-2xl surface p-5">
      <div className="relative">
        <div className="flex justify-between items-start gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-semibold text-base tracking-[-0.02em] text-white"
            style={{ background: brand }}
          >
            {code}
          </div>
          {ready ? (
            <KpiRing value={matchPct} max={100} size={64} trailing="%" color={ringColor} />
          ) : (
            <div
              className="h-16 w-16 rounded-full border border-dashed border-border flex items-center justify-center text-lg font-semibold text-muted-foreground"
              aria-hidden="true"
            >
              —
            </div>
          )}
        </div>

        <h3 className="mt-4 mb-1 text-lg font-semibold tracking-[-0.02em] text-foreground">{airline.name}</h3>
        <div className="text-[12.5px] text-muted-foreground flex gap-1.5 items-center">
          <MapPin className="h-2.5 w-2.5" /> {airline.country}
          {airline.code ? ` · ${airline.code}` : ""}
        </div>
        <div className="mt-2">
          <span className="chip">Perfil pronto</span>
        </div>

        <div className="div-dotted my-4" />

        <div className="flex flex-col gap-2">
          {checks.map((c) => (
            <div key={c.label} className="flex items-center justify-between gap-2 text-xs">
              <span className="text-muted-foreground">{c.label}</span>
              {ready ? (
                <span className={`chip tabular-nums ${c.passed ? "chip-green" : "chip-red"}`}>
                  {c.passed ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  {c.have} / {c.need}
                </span>
              ) : (
                <span className="tabular-nums font-semibold text-foreground">{c.need}</span>
              )}
            </div>
          ))}
          {airline.requirements.age_max && (
            <div className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
              <Globe className="h-3 w-3" /> Edad máxima cadete: {airline.requirements.age_max} años
            </div>
          )}
        </div>

        {!ready ? (
          <Link
            to="/app/perfil"
            className="mt-4 w-full h-9 rounded-lg border border-border bg-background flex items-center justify-center font-semibold text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Completa tu Pilot ID para comparar
          </Link>
        ) : missing === 0 ? (
          <div className="chip chip-green mt-4 w-full !h-9 !rounded-lg justify-center !text-[13px]">
            Cumples los requisitos
          </div>
        ) : (
          <div className="mt-4 w-full h-9 rounded-lg border border-border bg-background flex items-center justify-center font-semibold text-[13px] text-muted-foreground">
            Te faltan {missing} requisito{missing !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  )
}
