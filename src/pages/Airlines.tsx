import { useEffect, useState } from "react"
import { Plane, Check, X, Clock, Globe2 } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import { Badge } from "@/components/ui/badge"

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

  return (
    <AppLayout>
      <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Aerolíneas LATAM</h1>
          <p className="mt-2 text-muted-foreground">
            Los requisitos reales para entrar como cadete o primer oficial. Comparados con tu perfil actual.
          </p>
        </header>

        {loading ? (
          <div className="grid sm:grid-cols-2 gap-4 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-muted" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {airlines.map((a) => {
              const req = a.requirements
              const checks = [
                req.min_hours_total
                  ? {
                      label: `Mín. ${req.min_hours_total}h totales`,
                      passed: (pilot?.total_hours ?? 0) >= (req.min_hours_total ?? 0),
                      hint: pilot
                        ? `Tenés ${pilot.total_hours ?? 0}h`
                        : "Cargá tu perfil",
                    }
                  : null,
                req.min_hours_pic
                  ? {
                      label: `Mín. ${req.min_hours_pic}h PIC`,
                      passed: (pilot?.hours_pic ?? 0) >= (req.min_hours_pic ?? 0),
                      hint: pilot ? `Tenés ${pilot.hours_pic ?? 0}h PIC` : "Cargá tu perfil",
                    }
                  : null,
                req.icao_english
                  ? {
                      label: `ICAO inglés ${req.icao_english}+`,
                      passed: (pilot?.icao_english_level ?? 0) >= (req.icao_english ?? 0),
                      hint: pilot?.icao_english_level
                        ? `Tu nivel: ${pilot.icao_english_level}`
                        : "Sin nivel cargado",
                    }
                  : null,
                req.licenses && req.licenses.length > 0
                  ? {
                      label: `Licencias: ${req.licenses.join(" + ")}`,
                      passed: req.licenses.every((l) => pilot?.licenses?.includes(l)),
                      hint:
                        pilot?.licenses && pilot.licenses.length > 0
                          ? `Tenés: ${pilot.licenses.join(", ")}`
                          : "Sin licencias cargadas",
                    }
                  : null,
              ].filter(Boolean) as { label: string; passed: boolean; hint: string }[]
              const passedCount = checks.filter((c) => c.passed).length
              const totalChecks = checks.length || 1
              const matchPct = Math.round((passedCount / totalChecks) * 100)
              const brand = a.brand_color ?? "#2563EB"

              return (
                <div
                  key={a.id}
                  className="rounded-2xl border border-border/60 bg-card card-apple p-6 overflow-hidden relative"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-20"
                    style={{ background: brand }}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-9 w-9 rounded-xl flex items-center justify-center text-white shadow-md"
                            style={{ background: brand }}
                          >
                            <Plane className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold tracking-tight">{a.name}</h3>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Globe2 className="h-3 w-3" /> {a.country}
                              {a.code ? ` · ${a.code}` : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="rounded-full text-xs whitespace-nowrap"
                      >
                        {matchPct}% match
                      </Badge>
                    </div>

                    <div className="mt-5 space-y-2.5">
                      {checks.map((c) => (
                        <div key={c.label} className="flex items-start gap-2.5 text-sm">
                          {c.passed ? (
                            <CheckCircleSmall className="text-green-600 dark:text-green-400" />
                          ) : (
                            <XCircleSmall className="text-muted-foreground" />
                          )}
                          <div className="flex-1">
                            <div className={c.passed ? "" : "text-muted-foreground"}>{c.label}</div>
                            <div className="text-xs text-muted-foreground">{c.hint}</div>
                          </div>
                        </div>
                      ))}
                      {req.age_max && (
                        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                          <Clock className="h-4 w-4" /> Edad máxima cadete: {req.age_max} años
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </AppLayout>
  )
}

function CheckCircleSmall({ className = "" }: { className?: string }) {
  return (
    <span className={`flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/40 flex-shrink-0 ${className}`}>
      <Check className="h-3 w-3" />
    </span>
  )
}
function XCircleSmall({ className = "" }: { className?: string }) {
  return (
    <span className={`flex h-5 w-5 items-center justify-center rounded-full bg-muted flex-shrink-0 ${className}`}>
      <X className="h-3 w-3" />
    </span>
  )
}
