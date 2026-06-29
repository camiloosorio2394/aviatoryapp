import { useEffect, useState } from "react"
import { Check, X, Globe, Target, MapPin } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { KpiRing } from "@/components/ui/kpi-ring"

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

interface PilotState {
  total_hours: number | null
  hours_pic: number | null
  licenses: string[] | null
  icao_english_level: number | null
}

interface MatchCheck {
  label: string
  have: string
  need: string
  passed: boolean
}

export function Airlines() {
  const { user } = useSession()
  const [airlines, setAirlines] = useState<Airline[]>([])
  const [pilot, setPilot] = useState<PilotState | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [airlinesRes, pilotRes] = await Promise.all([
          supabase.from("airlines").select("*").order("order_index"),
          user
            ? supabase
                .from("pilot_state")
                .select("total_hours, hours_pic, licenses, icao_english_level")
                .eq("user_id", user.id)
                .maybeSingle()
            : Promise.resolve({ data: null }),
        ])
        if (cancelled) return
        setAirlines((airlinesRes.data ?? []) as Airline[])
        setPilot(pilotRes.data as PilotState | null)
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

  // Compute matches
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

  const bestMatch = matches[0]

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <PageHeader
          eyebrow="AEROLÍNEAS · MATCH CON TU PERFIL"
          title="¿Para cuál calificás hoy?"
          subtitle="Comparamos tus horas, licencias e inglés contra los requisitos públicos de cada aerolínea."
        />

        {loading ? (
          <div className="grid grid-cols-3 gap-3.5 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[280px] rounded-2xl bg-muted" />
            ))}
          </div>
        ) : (
          <>
            {/* Best match callout */}
            {bestMatch && (
              <div
                className="anim-fade-up rounded-2xl border border-border bg-card p-6 sm:p-7 mb-6 overflow-hidden relative"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in oklab, var(--av-blue-500) 6%, var(--card)) 0%, var(--card) 70%)",
                  borderColor: "color-mix(in oklab, var(--av-blue-500) 30%, var(--border))",
                }}
              >
                <div className="relative flex items-center gap-5">
                  <KpiRing value={bestMatch.matchPct} max={100} size={104} trailing="%" color="cyan" />
                  <div className="flex-1">
                    <div
                      className="text-[13px] font-semibold inline-flex items-center gap-1.5"
                      style={{ color: "var(--av-blue-500)" }}
                    >
                      <Target className="h-[13px] w-[13px]" /> Tu mejor match hoy
                    </div>
                    <h2 className="mt-2 mb-1 text-[26px] font-extrabold tracking-[-0.03em] text-foreground">
                      {bestMatch.airline.name} · {bestMatch.matchPct}% match
                    </h2>
                    <p className="m-0 text-muted-foreground text-[14px] leading-relaxed max-w-[600px]">
                      {bestMatch.missing === 0
                        ? "Cumplís todos los requisitos públicos. Postulá cuando abran convocatoria."
                        : `Te faltan ${bestMatch.missing} requisito${bestMatch.missing !== 1 ? "s" : ""} para postular. Mira los detalles abajo.`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Grid */}
            <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {matches.map((m) => (
                <AirlineCard key={m.airline.id} airline={m.airline} checks={m.checks} matchPct={m.matchPct} missing={m.missing} />
              ))}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  )
}

function buildChecks(req: AirlineRequirements, pilot: PilotState | null): MatchCheck[] {
  const checks: MatchCheck[] = []
  if (req.min_hours_total) {
    checks.push({
      label: "Horas totales",
      have: `${pilot?.total_hours ?? 0}h`,
      need: `${req.min_hours_total}h`,
      passed: (pilot?.total_hours ?? 0) >= req.min_hours_total,
    })
  }
  if (req.min_hours_pic) {
    checks.push({
      label: "Horas PIC",
      have: `${pilot?.hours_pic ?? 0}h`,
      need: `${req.min_hours_pic}h`,
      passed: (pilot?.hours_pic ?? 0) >= req.min_hours_pic,
    })
  }
  if (req.icao_english) {
    checks.push({
      label: "ICAO English",
      have: pilot?.icao_english_level ? `Nivel ${pilot.icao_english_level}` : "—",
      need: `Nivel ${req.icao_english}`,
      passed: (pilot?.icao_english_level ?? 0) >= req.icao_english,
    })
  }
  if (req.licenses && req.licenses.length > 0) {
    checks.push({
      label: "Licencias",
      have: pilot?.licenses?.join(", ") || "—",
      need: req.licenses.join(" + "),
      passed: req.licenses.every((l) => pilot?.licenses?.includes(l)),
    })
  }
  return checks
}

function AirlineCard({
  airline,
  checks,
  matchPct,
  missing,
}: {
  airline: Airline
  checks: MatchCheck[]
  matchPct: number
  missing: number
}) {
  const brand = airline.brand_color ?? "#2563EB"
  const code = airline.code ?? airline.name.slice(0, 2).toUpperCase()
  const ringColor = matchPct > 60 ? "cyan" : matchPct > 40 ? "amber" : "red"

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
    >
      <div className="relative">
        <div className="flex justify-between items-start">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-base tracking-[-0.02em] text-white"
            style={{
              background: brand,
            }}
          >
            {code}
          </div>
          <KpiRing value={matchPct} max={100} size={64} trailing="%" color={ringColor} />
        </div>

        <h3 className="mt-4 mb-1 text-lg font-bold tracking-[-0.02em] text-foreground">{airline.name}</h3>
        <div className="text-[12.5px] text-muted-foreground flex gap-1.5 items-center">
          <MapPin className="h-2.5 w-2.5" /> {airline.country}
          {airline.code ? ` · ${airline.code}` : ""}
        </div>

        <div className="div-dotted my-4" />

        <div className="flex flex-col gap-2">
          {checks.map((c) => (
            <div key={c.label} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{c.label}</span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="tabular-nums font-bold"
                  style={{
                    color: c.passed ? "#047857" : "#DC2626",
                  }}
                >
                  {c.have}
                </span>
                <span className="text-muted-foreground">/ {c.need}</span>
                {c.passed ? (
                  <Check className="h-3 w-3" style={{ color: "#047857" }} />
                ) : (
                  <X className="h-3 w-3" style={{ color: "#DC2626" }} />
                )}
              </span>
            </div>
          ))}
          {airline.requirements.age_max && (
            <div className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
              <Globe className="h-3 w-3" /> Edad máxima cadete: {airline.requirements.age_max} años
            </div>
          )}
        </div>

        <div
          className="mt-4 w-full h-9 rounded-lg border flex items-center justify-center font-semibold text-[14px]"
          style={
            missing === 0
              ? {
                  borderColor: "color-mix(in oklab, #047857 35%, var(--border))",
                  background: "color-mix(in oklab, #047857 10%, var(--card))",
                  color: "#047857",
                }
              : { borderColor: "var(--border)", background: "var(--background)", color: "var(--muted-foreground)" }
          }
        >
          {missing === 0 ? "✓ Cumplís los requisitos" : `Te faltan ${missing} requisito${missing !== 1 ? "s" : ""}`}
        </div>
      </div>
    </div>
  )
}
