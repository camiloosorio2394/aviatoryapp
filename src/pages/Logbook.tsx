import { useEffect, useMemo, useState, type FormEvent } from "react"
import { Plane, Plus, Trash2, X, Loader2, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/ui/page-header"
import { Sparkline } from "@/components/ui/sparkline"
import { CountUp } from "@/components/ui/count-up"

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

type FilterTab = "all" | "last30" | "year" | "pic" | "ifr"

export function Logbook() {
  const { user } = useSession()
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [filter, setFilter] = useState<FilterTab>("all")

  async function loadFlights() {
    if (!user) return
    const { data, error } = await supabase
      .from("flights")
      .select("*")
      .eq("user_id", user.id)
      .order("flight_date", { ascending: false })
      .order("id", { ascending: false })
      .limit(500)
    if (error) toast.error(error.message)
    else setFlights((data ?? []) as Flight[])
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
    const sum = (key: keyof Flight) => flights.reduce((acc, f) => acc + (Number(f[key]) || 0), 0)
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
      last30,
    }
  }, [flights])

  // Build a sparkline of total hours accumulated per month (last 8 months)
  const trendSpark = useMemo(() => {
    const buckets = new Map<string, number>()
    const now = new Date()
    for (let i = 7; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      buckets.set(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, 0)
    }
    for (const f of flights) {
      const k = f.flight_date.slice(0, 7)
      if (buckets.has(k)) buckets.set(k, (buckets.get(k) ?? 0) + f.total_minutes)
    }
    let running = 0
    return Array.from(buckets.values()).map((v) => {
      running += v / 60
      return running
    })
  }, [flights])

  // Filtered flights for the list
  const filtered = useMemo(() => {
    if (filter === "all") return flights
    if (filter === "last30") {
      const cutoff = new Date()
      cutoff.setDate(cutoff.getDate() - 30)
      return flights.filter((f) => new Date(f.flight_date) >= cutoff)
    }
    if (filter === "year") {
      const year = new Date().getFullYear()
      return flights.filter((f) => new Date(f.flight_date).getFullYear() === year)
    }
    if (filter === "pic") return flights.filter((f) => f.pic_minutes > 0)
    if (filter === "ifr") return flights.filter((f) => f.instrument_real_minutes + f.instrument_sim_minutes > 0)
    return flights
  }, [flights, filter])

  // Group by year-month for display
  const grouped = useMemo(() => {
    const map = new Map<string, Flight[]>()
    for (const f of filtered) {
      const d = new Date(f.flight_date)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(f)
    }
    return Array.from(map.entries())
  }, [filtered])

  return (
    <AppLayout>
      <div className="px-7 py-9 sm:py-11 pb-24 max-w-[1480px] mx-auto">
        <PageHeader
          eyebrow={`LOGBOOK · ${minutesToHours(stats.total)}h TOTALES`}
          title="Bitácora de vuelo"
          subtitle="Cada vuelo cuenta hacia tu próxima aerolínea. Registra apenas aterrices."
          actions={
            <>
              <button
                type="button"
                onClick={() => setFormOpen(true)}
                className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[14px] font-semibold text-white border-0 cursor-pointer surface-lift"
                style={{
                  background: "var(--av-blue-500)",
                }}
              >
                <Plus className="h-3.5 w-3.5" /> Nuevo vuelo
              </button>
            </>
          }
        />

        {/* Stats strip */}
        <div className="stagger grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          <BigStat label="Total" valueMin={stats.total} unit="h" highlight sparkline={trendSpark} />
          <BigStat label="PIC" valueMin={stats.pic} unit="h" />
          <BigStat label="SIC" valueMin={stats.sic} unit="h" />
          <BigStat label="IFR" valueMin={stats.ifr} unit="h" />
          <BigStat label="Nocturno" valueMin={stats.night} unit="h" />
          <BigStat label="Cross-country" valueMin={stats.xc} unit="h" />
          <BigStat label="Landings" value={stats.landings} unit="" />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-3.5 flex-wrap">
          <div
            className="flex gap-1 p-[3px] rounded-xl border border-border"
            style={{ background: "var(--muted)" }}
          >
            {([
              ["all", "Todos"],
              ["last30", "Últimos 30d"],
              ["year", "Este año"],
              ["pic", "PIC"],
              ["ifr", "IFR"],
            ] as [FilterTab, string][]).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className="px-3 py-1 rounded-lg text-[13px] font-semibold transition-colors"
                style={{
                  background: filter === key ? "var(--card)" : "transparent",
                  color: filter === key ? "var(--av-blue-500)" : "var(--muted-foreground)",
                  boxShadow: filter === key ? "var(--shadow-1)" : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <span className="text-[13px] font-semibold text-muted-foreground">
            {filtered.length} vuelos
          </span>
        </div>

        {/* Dense table */}
        {loading ? (
          <div className="animate-pulse space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 rounded-2xl bg-muted" />
            ))}
          </div>
        ) : flights.length === 0 ? (
          <EmptyState onAdd={() => setFormOpen(true)} />
        ) : (
          <div className="rounded-2xl surface overflow-hidden">
            <div className="overflow-x-auto">
              <div className="lg:min-w-[720px]">
                {/* Header (solo desde lg: en móvil cada vuelo es una tarjeta) */}
                <div
                  className="hidden lg:grid items-center px-[18px] py-3 text-[12px] font-semibold text-muted-foreground border-b border-border lg:grid-cols-[100px_1fr_1fr_110px_70px_70px_70px_70px_70px_40px]"
                  style={{ background: "var(--muted)" }}
                >
                  <span>Fecha</span>
                  <span>Aeronave</span>
                  <span>Ruta</span>
                  <span className="text-right">Total</span>
                  <span className="text-right">PIC</span>
                  <span className="text-right">IFR</span>
                  <span className="text-right">Noche</span>
                  <span className="text-right">XC</span>
                  <span className="text-right">Land.</span>
                  <span />
                </div>

                {/* Grouped rows */}
                {grouped.map(([month, monthFlights]) => {
                  const [y, m] = month.split("-")
                  const monthLabel = new Date(Number(y), Number(m) - 1).toLocaleDateString("es-CO", {
                    month: "long",
                    year: "numeric",
                  })
                  const monthTotal = monthFlights.reduce((a, f) => a + f.total_minutes, 0)
                  return (
                    <div key={month}>
                      <div
                        className="flex flex-wrap gap-x-3 justify-between items-center px-4 lg:px-[18px] py-2.5 text-[13px] font-semibold text-muted-foreground border-t border-b border-border"
                        style={{
                          background:
                            "color-mix(in oklab, var(--av-blue-500) 5%, var(--card))",
                        }}
                      >
                        <span>{monthLabel}</span>
                        <span className="tabular-nums">
                          {monthFlights.length} vuelos · {minutesToHours(monthTotal)}h
                        </span>
                      </div>
                      {monthFlights.map((f) => (
                        <FlightRow key={f.id} f={f} onDelete={() => deleteFlight(f.id)} />
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
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

function BigStat({
  label,
  value,
  valueMin,
  unit,
  highlight,
  sparkline,
}: {
  label: string
  value?: number
  valueMin?: number
  unit: string
  highlight?: boolean
  sparkline?: number[]
}) {
  const computed = valueMin !== undefined ? valueMin / 60 : value ?? 0
  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-3.5"
      style={{
        background: highlight
          ? "linear-gradient(160deg, color-mix(in oklab, var(--av-blue-500) 8%, var(--card)) 0%, var(--card) 100%)"
          : "var(--card)",
        borderColor: highlight
          ? "color-mix(in oklab, var(--av-blue-500) 30%, var(--border))"
          : "var(--border)",
      }}
    >
      <div className="text-[12px] font-semibold text-muted-foreground">
        {label}
      </div>
      <div
        className="tabular-nums mt-1.5 text-[22px] font-extrabold leading-none tracking-[-0.03em]"
        style={{ color: highlight ? "var(--av-blue-500)" : "var(--foreground)" }}
      >
        <CountUp to={computed} format={(v) => (unit === "" ? v.toFixed(0) : v.toFixed(1))} />
        {unit && (
          <span className="text-xs text-muted-foreground font-semibold ml-0.5">{unit}</span>
        )}
      </div>
      {sparkline && sparkline.length > 0 && (
        <div className="mt-2">
          <Sparkline
            data={sparkline}
            color={highlight ? "var(--av-blue-500)" : "var(--muted-foreground)"}
            width={120}
            height={20}
          />
        </div>
      )}
    </div>
  )
}

function FlightRow({ f, onDelete }: { f: Flight; onDelete: () => void }) {
  const date = new Date(f.flight_date)
  const day = String(date.getDate()).padStart(2, "0")
  const month = date.toLocaleDateString("es-CO", { month: "short" }).replace(".", "").toUpperCase()
  const dow = date.toLocaleDateString("es-CO", { weekday: "short" }).replace(".", "").toUpperCase()
  const ifrTotal = f.instrument_real_minutes + f.instrument_sim_minutes

  const tags: { label: string; color: "violet" | "cyan" | "green" }[] = []
  if (ifrTotal > 0) tags.push({ label: "IFR", color: "violet" })
  if (f.night_minutes > 0) tags.push({ label: "NIGHT", color: "cyan" })
  if (f.cross_country_minutes > 0) tags.push({ label: "XC", color: "green" })

  const route =
    f.from_airport || f.to_airport ? (
      <div className="tabular-nums flex items-center gap-1.5 text-foreground font-semibold">
        {f.from_airport ?? "—"}{" "}
        <ArrowRight className="h-2.5 w-2.5" style={{ color: "var(--av-blue-500)" }} />{" "}
        {f.to_airport ?? "—"}
      </div>
    ) : (
      <span className="text-muted-foreground">—</span>
    )

  const tagRow =
    tags.length > 0 ? (
      <div className="mt-1 flex gap-1 flex-wrap">
        {tags.map((t) => (
          <span key={t.label} className={`chip chip-${t.color} h-4 px-1.5 text-[11px]`}>
            {t.label}
          </span>
        ))}
      </div>
    ) : null

  const deleteButton = (
    <button
      type="button"
      onClick={onDelete}
      className="opacity-60 lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity p-1.5 rounded-md text-muted-foreground hover:text-[color:var(--av-red-400)] hover:bg-muted"
      aria-label={`Eliminar el vuelo del ${day} ${month}`}
    >
      <Trash2 className="h-3.5 w-3.5" />
    </button>
  )

  return (
    <div className="border-b border-border last:border-b-0">
      {/* Móvil y tablet: tarjeta apilada, ningún dato queda fuera de pantalla */}
      <div className="lg:hidden px-4 py-3.5 text-[14px]">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] text-muted-foreground uppercase tracking-[0.1em] font-semibold">
              {dow} {day} {month}
            </div>
            <div className="tabular-nums mt-0.5 font-bold text-foreground">
              {f.aircraft_registration ?? "—"}
              <span className="ml-1.5 text-[12.5px] font-normal text-muted-foreground">
                {f.aircraft_type ?? "—"}
              </span>
            </div>
            <div className="mt-1 text-[13px]">{route}</div>
            {tagRow}
          </div>
          <div className="flex items-start gap-1 flex-shrink-0">
            <div
              className="tabular-nums text-[20px] font-bold leading-none tracking-[-0.03em]"
              style={{ color: "var(--av-blue-500)" }}
            >
              {minutesToHours(f.total_minutes)}
              <span className="text-[12px] text-muted-foreground font-semibold ml-0.5">h</span>
            </div>
            {deleteButton}
          </div>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px]">
          <MiniStat label="PIC" value={minutesToHours(f.pic_minutes)} on={f.pic_minutes > 0} />
          <MiniStat label="IFR" value={minutesToHours(ifrTotal)} on={ifrTotal > 0} />
          <MiniStat label="Noche" value={minutesToHours(f.night_minutes)} on={f.night_minutes > 0} />
          <MiniStat label="XC" value={minutesToHours(f.cross_country_minutes)} on={f.cross_country_minutes > 0} />
          <MiniStat label="Land." value={String(f.landings_day + f.landings_night)} on />
        </div>
      </div>

      {/* Desde lg: la grilla densa */}
      <div className="hidden lg:grid items-center px-[18px] py-3.5 text-[14px] transition-colors group hover:bg-muted/40 lg:grid-cols-[100px_1fr_1fr_110px_70px_70px_70px_70px_70px_40px]">
      <div>
        <div className="text-[11px] text-muted-foreground uppercase tracking-[0.1em] font-semibold">
          {dow}
        </div>
        <div className="tabular-nums text-sm font-bold text-foreground">
          {day} {month}
        </div>
      </div>
      <div>
        <div className="tabular-nums font-bold text-foreground">{f.aircraft_registration ?? "—"}</div>
        <div className="text-[12.5px] text-muted-foreground">{f.aircraft_type ?? "—"}</div>
      </div>
      <div>
        {route}
        {tagRow}
      </div>
      <div
        className="tabular-nums text-right text-[16px] font-bold"
        style={{ color: "var(--av-blue-500)" }}
      >
        {minutesToHours(f.total_minutes)}
      </div>
      <div
        className="tabular-nums text-right"
        style={{ color: f.pic_minutes > 0 ? "var(--foreground)" : "var(--muted-foreground)" }}
      >
        {minutesToHours(f.pic_minutes)}
      </div>
      <div
        className="tabular-nums text-right"
        style={{ color: ifrTotal > 0 ? "var(--foreground)" : "var(--muted-foreground)" }}
      >
        {minutesToHours(ifrTotal)}
      </div>
      <div
        className="tabular-nums text-right"
        style={{ color: f.night_minutes > 0 ? "var(--foreground)" : "var(--muted-foreground)" }}
      >
        {minutesToHours(f.night_minutes)}
      </div>
      <div
        className="tabular-nums text-right"
        style={{
          color: f.cross_country_minutes > 0 ? "var(--foreground)" : "var(--muted-foreground)",
        }}
      >
        {minutesToHours(f.cross_country_minutes)}
      </div>
      <div className="tabular-nums text-right text-foreground">
        {f.landings_day + f.landings_night}
      </div>
      <div className="flex justify-end">{deleteButton}</div>
      </div>
    </div>
  )
}

function MiniStat({ label, value, on }: { label: string; value: string; on: boolean }) {
  return (
    <span className="inline-flex items-baseline gap-1">
      <span className="text-[11px] uppercase tracking-[0.06em] font-semibold text-muted-foreground">
        {label}
      </span>
      <span
        className="tabular-nums font-bold"
        style={{ color: on ? "var(--foreground)" : "var(--muted-foreground)" }}
      >
        {value}
      </span>
    </span>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-border p-12 text-center max-w-[520px] mx-auto">
      <div
        className="inline-flex items-center justify-center h-14 w-14 rounded-2xl mb-4 text-white"
        style={{
          background:
            "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))",
        }}
      >
        <Plane className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-bold text-foreground">Empieza tu logbook digital</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
        Cada vuelo que registres se suma a tus horas totales y actualiza tu progreso a aerolínea automáticamente.
      </p>
      <ol className="mt-5 list-none p-0 space-y-2.5 text-left max-w-[360px] mx-auto">
        {[
          "Toma tu logbook actual o la pantalla del último vuelo",
          "Carga fecha, ruta, matrícula y tiempo total",
          "El resto se calcula y se suma a tus stats",
        ].map((s, i) => (
          <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <span className="tabular-nums flex-shrink-0 w-[22px] h-[22px] rounded-md bg-muted border border-border flex items-center justify-center text-[12.5px] font-bold text-foreground">
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={onAdd}
        className="mt-5 inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-sm font-semibold text-white surface-lift"
        style={{
          background: "var(--av-blue-500)",
        }}
      >
        <Plus className="h-3.5 w-3.5" /> Registrar mi primer vuelo
      </button>
    </div>
  )
}

// ───────────────────────── New Flight Dialog (form fully preserved)

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
      <div className="fixed inset-0 z-[60] bg-background/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center overflow-y-auto p-4 pointer-events-none">
        <form
          onSubmit={handleSubmit}
          className="pointer-events-auto w-full max-w-2xl rounded-3xl bg-card border border-border shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
        >
          <header className="sticky top-0 z-10 flex items-center justify-between bg-card/95 backdrop-blur px-6 py-4 border-b border-border">
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
            <Section title="Datos del vuelo">
              <Row>
                <Field label="Fecha">
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-11 rounded-xl" required />
                </Field>
                <Field label="Tiempo total (horas)">
                  <Input type="number" inputMode="decimal" step="0.1" min="0" value={totalH} onChange={(e) => setTotalH(e.target.value)} placeholder="1.5" className="h-11 rounded-xl tabular-nums" required />
                </Field>
              </Row>
              <Row>
                <Field label="Matrícula">
                  <Input value={registration} onChange={(e) => setRegistration(e.target.value)} placeholder="HK-1234" className="h-11 rounded-xl" />
                </Field>
                <Field label="Tipo de aeronave">
                  <Input value={aircraftType} onChange={(e) => setAircraftType(e.target.value)} placeholder="C172, PA28, A320..." className="h-11 rounded-xl" />
                </Field>
              </Row>
              <Row>
                <Field label="Desde (ICAO)">
                  <Input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="SKBO" maxLength={5} className="h-11 rounded-xl tabular-nums" />
                </Field>
                <Field label="Hasta (ICAO)">
                  <Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="SKMD" maxLength={5} className="h-11 rounded-xl tabular-nums" />
                </Field>
              </Row>
            </Section>

            <Section title="Tiempos específicos (opcionales, en horas)">
              <Row>
                <Field label="PIC">
                  <Input type="number" inputMode="decimal" step="0.1" min="0" value={picH} onChange={(e) => setPicH(e.target.value)} placeholder="1.5" className="h-11 rounded-xl tabular-nums" />
                </Field>
                <Field label="SIC">
                  <Input type="number" inputMode="decimal" step="0.1" min="0" value={sicH} onChange={(e) => setSicH(e.target.value)} placeholder="0" className="h-11 rounded-xl tabular-nums" />
                </Field>
                <Field label="Dual recibido">
                  <Input type="number" inputMode="decimal" step="0.1" min="0" value={dualH} onChange={(e) => setDualH(e.target.value)} placeholder="0" className="h-11 rounded-xl tabular-nums" />
                </Field>
              </Row>
              <Row>
                <Field label="IFR real">
                  <Input type="number" inputMode="decimal" step="0.1" min="0" value={instReal} onChange={(e) => setInstReal(e.target.value)} placeholder="0" className="h-11 rounded-xl tabular-nums" />
                </Field>
                <Field label="IFR simulador">
                  <Input type="number" inputMode="decimal" step="0.1" min="0" value={instSim} onChange={(e) => setInstSim(e.target.value)} placeholder="0" className="h-11 rounded-xl tabular-nums" />
                </Field>
                <Field label="Nocturno">
                  <Input type="number" inputMode="decimal" step="0.1" min="0" value={nightH} onChange={(e) => setNightH(e.target.value)} placeholder="0" className="h-11 rounded-xl tabular-nums" />
                </Field>
              </Row>
              <Row>
                <Field label="Cross-country">
                  <Input type="number" inputMode="decimal" step="0.1" min="0" value={xcH} onChange={(e) => setXcH(e.target.value)} placeholder="0" className="h-11 rounded-xl tabular-nums" />
                </Field>
                <Field label="Landings día">
                  <Input type="number" min="0" value={landingsDay} onChange={(e) => setLandingsDay(e.target.value)} className="h-11 rounded-xl tabular-nums" />
                </Field>
                <Field label="Landings noche">
                  <Input type="number" min="0" value={landingsNight} onChange={(e) => setLandingsNight(e.target.value)} className="h-11 rounded-xl tabular-nums" />
                </Field>
              </Row>
            </Section>

            <Field label="Observaciones">
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
                placeholder="Notas del vuelo, condiciones meteorológicas, briefing..."
                className="w-full resize-none rounded-xl border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </Field>
          </div>

          <footer className="sticky bottom-0 z-10 flex items-center justify-end gap-2 bg-card/95 backdrop-blur px-6 pt-4 pb-24 sm:pb-4 border-t border-border">
            <Button type="button" variant="ghost" onClick={onClose} disabled={saving} className="rounded-full">
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={saving}
              size="lg"
              className="rounded-xl h-11 px-6 border-0 text-white surface-lift"
              style={{
                background: "var(--av-blue-500)",
              }}
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
      <h3 className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
        {title}
      </h3>
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
