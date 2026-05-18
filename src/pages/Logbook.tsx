import { useEffect, useMemo, useState, type FormEvent } from "react"
import { Plane, Plus, Trash2, X, Loader2, MapPin } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface Flight {
  id: number
  flight_date: string
  aircraft_registration: string | null
  aircraft_type: string | null
  from_airport: string | null
  to_airport: string | null
  total_minutes: number
  pic_minutes: number
  sic_minutes: number
  dual_minutes: number
  instrument_real_minutes: number
  instrument_sim_minutes: number
  night_minutes: number
  cross_country_minutes: number
  landings_day: number
  landings_night: number
  remarks: string | null
  created_at: string
}

function minutesToHours(min: number): string {
  if (min === 0) return "0.0"
  return (min / 60).toFixed(1)
}

function hoursToMinutes(h: string): number {
  const n = parseFloat(h)
  if (Number.isNaN(n) || n < 0) return 0
  return Math.round(n * 60)
}

export function Logbook() {
  const { user } = useSession()
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)

  async function loadFlights() {
    if (!user) return
    const { data, error } = await supabase
      .from("flights")
      .select("*")
      .eq("user_id", user.id)
      .order("flight_date", { ascending: false })
      .order("id", { ascending: false })
      .limit(500)
    if (error) {
      toast.error(error.message)
    } else {
      setFlights((data ?? []) as Flight[])
    }
    setLoading(false)
  }

  useEffect(() => {
    loadFlights()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  async function deleteFlight(id: number) {
    if (!confirm("¿Eliminar este vuelo del logbook?")) return
    const prev = flights
    setFlights((p) => p.filter((f) => f.id !== id))
    const { error } = await supabase.from("flights").delete().eq("id", id)
    if (error) {
      toast.error(error.message)
      setFlights(prev)
    } else {
      toast.success("Vuelo eliminado")
    }
  }

  const stats = useMemo(() => {
    const sum = (key: keyof Flight) =>
      flights.reduce((acc, f) => acc + (Number(f[key]) || 0), 0)

    const last30Cutoff = new Date()
    last30Cutoff.setDate(last30Cutoff.getDate() - 30)
    const last30 = flights
      .filter((f) => new Date(f.flight_date) >= last30Cutoff)
      .reduce((acc, f) => acc + f.total_minutes, 0)

    return {
      total: sum("total_minutes"),
      pic: sum("pic_minutes"),
      sic: sum("sic_minutes"),
      ifr: sum("instrument_real_minutes") + sum("instrument_sim_minutes"),
      night: sum("night_minutes"),
      xc: sum("cross_country_minutes"),
      landings: sum("landings_day") + sum("landings_night"),
      flightsCount: flights.length,
      last30,
    }
  }, [flights])

  // Group by year-month for display
  const grouped = useMemo(() => {
    const map = new Map<string, Flight[]>()
    for (const f of flights) {
      const d = new Date(f.flight_date)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(f)
    }
    return Array.from(map.entries())
  }, [flights])

  return (
    <AppLayout>
      <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em]">
              Logbook
            </h1>
            <p className="mt-1 text-muted-foreground">
              Tu bitácora digital — cada vuelo cuenta hacia tu próxima aerolínea.
            </p>
          </div>
          <Button
            onClick={() => setFormOpen(true)}
            size="lg"
            className="btn-apple rounded-full h-11 px-5 border-0"
          >
            <Plus className="h-4 w-4" />
            Nuevo vuelo
          </Button>
        </header>

        {/* Stats grid */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <StatBox label="Total" value={minutesToHours(stats.total)} unit="h" tone="hero" />
          <StatBox label="PIC" value={minutesToHours(stats.pic)} unit="h" />
          <StatBox label="IFR" value={minutesToHours(stats.ifr)} unit="h" />
          <StatBox label="Nocturno" value={minutesToHours(stats.night)} unit="h" />
          <StatBox label="Cross-country" value={minutesToHours(stats.xc)} unit="h" />
          <StatBox label="SIC" value={minutesToHours(stats.sic)} unit="h" />
          <StatBox label="Landings" value={String(stats.landings)} unit="" />
          <StatBox label="Últimos 30 días" value={minutesToHours(stats.last30)} unit="h" highlight />
        </section>

        {/* Flights list */}
        {loading ? (
          <div className="animate-pulse space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-muted" />
            ))}
          </div>
        ) : flights.length === 0 ? (
          <EmptyState onAdd={() => setFormOpen(true)} />
        ) : (
          <div className="space-y-8">
            {grouped.map(([month, monthFlights]) => {
              const [y, m] = month.split("-")
              const monthLabel = new Date(Number(y), Number(m) - 1).toLocaleDateString(
                "es-CO",
                { month: "long", year: "numeric" }
              )
              const monthTotal = monthFlights.reduce((a, f) => a + f.total_minutes, 0)
              return (
                <section key={month}>
                  <div className="flex items-baseline justify-between mb-3">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      {monthLabel}
                    </h2>
                    <Badge variant="secondary" className="rounded-full text-xs tabular">
                      {monthFlights.length} vuelos · {minutesToHours(monthTotal)} h
                    </Badge>
                  </div>
                  <ul className="space-y-2">
                    {monthFlights.map((f) => (
                      <FlightRow key={f.id} flight={f} onDelete={() => deleteFlight(f.id)} />
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        )}
      </div>

      {formOpen && (
        <NewFlightDialog
          onClose={() => setFormOpen(false)}
          onSaved={() => {
            setFormOpen(false)
            loadFlights()
            toast.success("Vuelo registrado ✈️")
          }}
        />
      )}
    </AppLayout>
  )
}

// ───────────────────────── Sub-components

function StatBox({
  label,
  value,
  unit,
  tone,
  highlight,
}: {
  label: string
  value: string
  unit: string
  tone?: "hero"
  highlight?: boolean
}) {
  const isHero = tone === "hero"
  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 border ${
        isHero
          ? "border-blue-500/30 bg-gradient-to-br from-blue-50 via-blue-50/40 to-transparent dark:from-blue-950/40"
          : highlight
            ? "border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20"
            : "border-border/60 bg-card"
      }`}
    >
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
      <div
        className={`mt-1 font-bold tracking-[-0.03em] tabular ${
          isHero ? "text-3xl sm:text-4xl text-blue-600 dark:text-blue-400" : "text-xl sm:text-2xl"
        }`}
      >
        {value}
        {unit && (
          <span className="text-sm font-medium text-muted-foreground ml-0.5">{unit}</span>
        )}
      </div>
    </div>
  )
}

function FlightRow({ flight, onDelete }: { flight: Flight; onDelete: () => void }) {
  const date = new Date(flight.flight_date)
  const dayLabel = date.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    weekday: "short",
  })
  const route =
    flight.from_airport && flight.to_airport
      ? `${flight.from_airport} → ${flight.to_airport}`
      : flight.from_airport ?? flight.to_airport ?? ""

  const tags: string[] = []
  if (flight.pic_minutes > 0)
    tags.push(`PIC ${minutesToHours(flight.pic_minutes)}h`)
  if (flight.instrument_real_minutes + flight.instrument_sim_minutes > 0)
    tags.push(
      `IFR ${minutesToHours(
        flight.instrument_real_minutes + flight.instrument_sim_minutes
      )}h`
    )
  if (flight.night_minutes > 0)
    tags.push(`Noche ${minutesToHours(flight.night_minutes)}h`)
  if (flight.cross_country_minutes > 0) tags.push("XC")

  return (
    <li className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card p-3 sm:p-4 hover:border-blue-500/30 transition-colors">
      <div className="flex-shrink-0 w-16 sm:w-20 text-center">
        <div className="text-xs text-muted-foreground uppercase">
          {dayLabel.split(",")[0]}
        </div>
        <div className="text-base font-semibold tabular">
          {dayLabel.split(",")[1]?.trim()}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Plane className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <span className="tabular">{flight.aircraft_registration ?? "—"}</span>
          {flight.aircraft_type && (
            <span className="text-muted-foreground font-normal">· {flight.aircraft_type}</span>
          )}
        </div>
        {route && (
          <div className="mt-0.5 text-xs text-muted-foreground flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            <span className="tabular">{route}</span>
          </div>
        )}
        {tags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {tags.map((t) => (
              <span
                key={t}
                className="text-[10px] rounded-full px-2 py-0.5 bg-muted text-muted-foreground tabular"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex-shrink-0 text-right">
        <div className="text-lg font-bold tracking-tight tabular">
          {minutesToHours(flight.total_minutes)}
          <span className="text-xs font-medium text-muted-foreground ml-0.5">h</span>
        </div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">total</div>
      </div>

      <button
        type="button"
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
        aria-label="Eliminar vuelo"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </li>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-border/60 p-12 text-center">
      <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 mb-4">
        <Plane className="h-7 w-7" />
      </div>
      <h3 className="text-base font-semibold">Empezá tu logbook digital</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
        Cada vuelo que registres se suma a tus horas totales y actualiza tu progreso a
        aerolínea automáticamente.
      </p>
      <Button onClick={onAdd} size="lg" className="btn-apple rounded-full mt-5 h-11 px-5 border-0">
        <Plus className="h-4 w-4" />
        Registrar mi primer vuelo
      </Button>
    </div>
  )
}

function NewFlightDialog({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const { user } = useSession()
  const [saving, setSaving] = useState(false)
  const today = new Date().toISOString().slice(0, 10)

  const [date, setDate] = useState(today)
  const [registration, setRegistration] = useState("")
  const [aircraftType, setAircraftType] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [totalH, setTotalH] = useState("")
  const [picH, setPicH] = useState("")
  const [sicH, setSicH] = useState("")
  const [dualH, setDualH] = useState("")
  const [instReal, setInstReal] = useState("")
  const [instSim, setInstSim] = useState("")
  const [nightH, setNightH] = useState("")
  const [xcH, setXcH] = useState("")
  const [landingsDay, setLandingsDay] = useState("1")
  const [landingsNight, setLandingsNight] = useState("0")
  const [remarks, setRemarks] = useState("")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!user) return
    const totalMin = hoursToMinutes(totalH)
    if (totalMin <= 0) {
      toast.error("El tiempo total debe ser mayor a 0")
      return
    }
    setSaving(true)
    try {
      const { error } = await supabase.from("flights").insert({
        user_id: user.id,
        flight_date: date,
        aircraft_registration: registration.trim().toUpperCase() || null,
        aircraft_type: aircraftType.trim().toUpperCase() || null,
        from_airport: from.trim().toUpperCase() || null,
        to_airport: to.trim().toUpperCase() || null,
        total_minutes: totalMin,
        pic_minutes: hoursToMinutes(picH),
        sic_minutes: hoursToMinutes(sicH),
        dual_minutes: hoursToMinutes(dualH),
        instrument_real_minutes: hoursToMinutes(instReal),
        instrument_sim_minutes: hoursToMinutes(instSim),
        night_minutes: hoursToMinutes(nightH),
        cross_country_minutes: hoursToMinutes(xcH),
        landings_day: parseInt(landingsDay) || 0,
        landings_night: parseInt(landingsNight) || 0,
        remarks: remarks.trim() || null,
      })
      if (error) throw error
      onSaved()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No pudimos guardar el vuelo")
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 pointer-events-none">
        <form
          onSubmit={handleSubmit}
          className="pointer-events-auto w-full max-w-2xl rounded-3xl bg-card shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
        >
          <header className="sticky top-0 z-10 flex items-center justify-between bg-card/95 backdrop-blur px-6 py-4 border-b border-border/40">
            <div>
              <h2 className="text-lg font-bold">Nuevo vuelo</h2>
              <p className="text-xs text-muted-foreground">Datos básicos abajo, detalles opcionales</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="p-6 space-y-6">
            {/* Section: básico */}
            <Section title="Datos del vuelo">
              <Row>
                <Field label="Fecha">
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-11 rounded-xl"
                    required
                  />
                </Field>
                <Field label="Tiempo total (horas)">
                  <Input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    min="0"
                    value={totalH}
                    onChange={(e) => setTotalH(e.target.value)}
                    placeholder="1.5"
                    className="h-11 rounded-xl"
                    required
                  />
                </Field>
              </Row>
              <Row>
                <Field label="Matrícula">
                  <Input
                    value={registration}
                    onChange={(e) => setRegistration(e.target.value)}
                    placeholder="HK-1234"
                    className="h-11 rounded-xl"
                  />
                </Field>
                <Field label="Tipo de aeronave">
                  <Input
                    value={aircraftType}
                    onChange={(e) => setAircraftType(e.target.value)}
                    placeholder="C172, PA28, A320..."
                    className="h-11 rounded-xl"
                  />
                </Field>
              </Row>
              <Row>
                <Field label="Desde (ICAO)">
                  <Input
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="SKBO"
                    maxLength={5}
                    className="h-11 rounded-xl tabular"
                  />
                </Field>
                <Field label="Hasta (ICAO)">
                  <Input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="SKMD"
                    maxLength={5}
                    className="h-11 rounded-xl tabular"
                  />
                </Field>
              </Row>
            </Section>

            {/* Section: tiempos específicos */}
            <Section title="Tiempos específicos (opcionales, en horas)">
              <Row>
                <Field label="PIC">
                  <Input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    min="0"
                    value={picH}
                    onChange={(e) => setPicH(e.target.value)}
                    placeholder="1.5"
                    className="h-11 rounded-xl"
                  />
                </Field>
                <Field label="SIC">
                  <Input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    min="0"
                    value={sicH}
                    onChange={(e) => setSicH(e.target.value)}
                    placeholder="0"
                    className="h-11 rounded-xl"
                  />
                </Field>
                <Field label="Dual recibido">
                  <Input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    min="0"
                    value={dualH}
                    onChange={(e) => setDualH(e.target.value)}
                    placeholder="0"
                    className="h-11 rounded-xl"
                  />
                </Field>
              </Row>
              <Row>
                <Field label="IFR real">
                  <Input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    min="0"
                    value={instReal}
                    onChange={(e) => setInstReal(e.target.value)}
                    placeholder="0"
                    className="h-11 rounded-xl"
                  />
                </Field>
                <Field label="IFR simulador">
                  <Input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    min="0"
                    value={instSim}
                    onChange={(e) => setInstSim(e.target.value)}
                    placeholder="0"
                    className="h-11 rounded-xl"
                  />
                </Field>
                <Field label="Nocturno">
                  <Input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    min="0"
                    value={nightH}
                    onChange={(e) => setNightH(e.target.value)}
                    placeholder="0"
                    className="h-11 rounded-xl"
                  />
                </Field>
              </Row>
              <Row>
                <Field label="Cross-country">
                  <Input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    min="0"
                    value={xcH}
                    onChange={(e) => setXcH(e.target.value)}
                    placeholder="0"
                    className="h-11 rounded-xl"
                  />
                </Field>
                <Field label="Landings día">
                  <Input
                    type="number"
                    min="0"
                    value={landingsDay}
                    onChange={(e) => setLandingsDay(e.target.value)}
                    className="h-11 rounded-xl"
                  />
                </Field>
                <Field label="Landings noche">
                  <Input
                    type="number"
                    min="0"
                    value={landingsNight}
                    onChange={(e) => setLandingsNight(e.target.value)}
                    className="h-11 rounded-xl"
                  />
                </Field>
              </Row>
            </Section>

            {/* Remarks */}
            <Field label="Observaciones">
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
                placeholder="Notas del vuelo, condiciones meteorológicas, briefing..."
                className="w-full resize-none rounded-xl border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
              />
            </Field>
          </div>

          <footer className="sticky bottom-0 z-10 flex items-center justify-end gap-2 bg-card/95 backdrop-blur px-6 py-4 border-t border-border/40">
            <Button type="button" variant="ghost" onClick={onClose} disabled={saving} className="rounded-full">
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={saving}
              size="lg"
              className="btn-apple rounded-full h-11 px-6 border-0"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Guardando…
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" /> Registrar vuelo
                </>
              )}
            </Button>
          </footer>
        </form>
      </div>
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{children}</div>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  )
}
