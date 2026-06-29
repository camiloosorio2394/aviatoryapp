import { useEffect, useState, type FormEvent } from "react"
import { AlertTriangle, Calendar, Loader2, Plus, Trash2, X, FileText, CheckCircle, Clock } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PageHeader } from "@/components/ui/page-header"
import { CountUp } from "@/components/ui/count-up"

type LicenseType =
  | "medical_class_1"
  | "medical_class_2"
  | "medical_class_3"
  | "ppl"
  | "cpl"
  | "atpl"
  | "ifr"
  | "multi_engine"
  | "flight_instructor"
  | "type_rating"
  | "icao_english"
  | "recurrent_check"
  | "other"

interface License {
  id: number
  license_type: LicenseType
  custom_name: string | null
  issued_date: string | null
  expires_date: string | null
  document_url: string | null
  notes: string | null
  created_at: string
}

const LICENSE_TYPE_LABEL: Record<LicenseType, string> = {
  medical_class_1: "Médico clase 1",
  medical_class_2: "Médico clase 2",
  medical_class_3: "Médico clase 3",
  ppl: "PPL — Piloto Privado",
  cpl: "CPL — Piloto Comercial",
  atpl: "ATPL — Línea Aérea",
  ifr: "Habilitación IFR",
  multi_engine: "Habilitación Multi-engine",
  flight_instructor: "Instructor de vuelo",
  type_rating: "Type Rating",
  icao_english: "Inglés ICAO",
  recurrent_check: "Recurrent check",
  other: "Otra",
}

const LICENSE_CATEGORY: Record<LicenseType, string> = {
  medical_class_1: "Médico",
  medical_class_2: "Médico",
  medical_class_3: "Médico",
  ppl: "Licencia",
  cpl: "Licencia",
  atpl: "Licencia",
  ifr: "Habilitación",
  multi_engine: "Habilitación",
  flight_instructor: "Habilitación",
  type_rating: "Type Rating",
  icao_english: "Inglés",
  recurrent_check: "Currency",
  other: "Otra",
}

function daysUntil(date: string): number {
  const target = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

type Status = "expired" | "critical" | "urgent" | "warn" | "ok" | "none"
function statusOf(d: number | null): Status {
  if (d === null) return "none"
  if (d < 0) return "expired"
  if (d <= 7) return "critical"
  if (d <= 30) return "urgent"
  if (d <= 120) return "warn"
  return "ok"
}

const STATUS_META: Record<Status, { color: string; label: string }> = {
  expired: { color: "#DC2626", label: "VENCIDO" },
  critical: { color: "#DC2626", label: "CRÍTICO" },
  urgent: { color: "#B45309", label: "URGENTE" },
  warn: { color: "#B45309", label: "ATENCIÓN" },
  ok: { color: "#047857", label: "AL DÍA" },
  none: { color: "var(--muted-foreground)", label: "SIN FECHA" },
}

export function Expiries() {
  const { user } = useSession()
  const [licenses, setLicenses] = useState<License[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)

  async function load() {
    if (!user) return
    const { data, error } = await supabase
      .from("licenses_held")
      .select("*")
      .eq("user_id", user.id)
      .order("expires_date", { ascending: true, nullsFirst: false })
    if (error) toast.error(error.message)
    else setLicenses((data ?? []) as License[])
    setLoading(false)
  }

  useEffect(() => {
    load()
    supabase.rpc("check_my_expiries").then(() => undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  async function deleteOne(id: number) {
    if (!confirm("¿Eliminar esta licencia o certificación?")) return
    const prev = licenses
    setLicenses((p) => p.filter((l) => l.id !== id))
    const { error } = await supabase.from("licenses_held").delete().eq("id", id)
    if (error) {
      toast.error(error.message)
      setLicenses(prev)
    } else {
      toast.success("Eliminada")
    }
  }

  // Bucket counts
  const withDates = licenses.map((l) => ({ l, d: l.expires_date ? daysUntil(l.expires_date) : null }))
  const critical = withDates.filter((x) => x.d !== null && x.d < 14).length
  const urgent = withDates.filter((x) => x.d !== null && x.d >= 14 && x.d < 30).length
  const upcoming = withDates.filter((x) => x.d !== null && x.d >= 30 && x.d < 120).length
  const ok = withDates.filter((x) => x.d !== null && x.d >= 120).length

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <PageHeader
          eyebrow={`VENCIMIENTOS · ${critical} CRÍTICOS`}
          title={critical > 0 ? "Lo que vence pronto" : "Tus vencimientos al día"}
          subtitle={critical > 0
            ? "Renová antes que venzan para no perder legalidad."
            : "Te avisamos automáticamente en los 30, 15, 7 y 1 días previos a vencer."}
          actions={
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl text-[14px] font-semibold text-white border-0 cursor-pointer transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--av-blue-500)" }}
            >
              <Plus className="h-3.5 w-3.5" /> Agregar
            </button>
          }
        />

        {/* Summary tiles */}
        {!loading && licenses.length > 0 && (
          <div className="grid grid-cols-4 gap-3 mb-6">
            <SummaryTile label="Críticos (<14d)" value={critical} color="red" icon={AlertTriangle} />
            <SummaryTile label="Por vencer (<30d)" value={urgent} color="amber" icon={Clock} />
            <SummaryTile label="Próximos 4 meses" value={upcoming} color="cyan" icon={Calendar} />
            <SummaryTile label="Al día" value={ok} color="green" icon={CheckCircle} />
          </div>
        )}

        {/* Critical alert */}
        {critical > 0 && (
          <div
            className="anim-fade-up flex items-center gap-3.5 px-5 py-4 rounded-2xl mb-6"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, #DC2626 10%, var(--card)) 0%, var(--card) 70%)",
              border: "1px solid color-mix(in oklab, #DC2626 35%, transparent)",
            }}
          >
            <div
              className="relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "color-mix(in oklab, #DC2626 14%, transparent)",
                color: "#DC2626",
              }}
            >
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-foreground tracking-[-0.015em]">
                {critical} ítem{critical !== 1 ? "s necesitan" : " necesita"} acción esta semana
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Si no renovás antes del vencimiento perdés legalidad para volar PIC.
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="animate-pulse space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 rounded-2xl bg-muted" />
            ))}
          </div>
        ) : licenses.length === 0 ? (
          <EmptyState onAdd={() => setFormOpen(true)} />
        ) : (
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {licenses.map((l, i) => (
              <LicenseRow
                key={l.id}
                license={l}
                isLast={i === licenses.length - 1}
                onDelete={() => deleteOne(l.id)}
              />
            ))}
          </div>
        )}
      </div>

      {formOpen && (
        <NewLicenseDialog
          onClose={() => setFormOpen(false)}
          onSaved={() => {
            setFormOpen(false)
            load()
            toast.success("Guardada ✈️")
          }}
        />
      )}
    </AppLayout>
  )
}

function SummaryTile({
  label,
  value,
  color,
  icon: Ic,
}: {
  label: string
  value: number
  color: "red" | "amber" | "cyan" | "green"
  icon: typeof AlertTriangle
}) {
  const TONES = {
    red: { c: "#DC2626", bg: "color-mix(in oklab, #DC2626 8%, var(--card))" },
    amber: { c: "#B45309", bg: "color-mix(in oklab, #B45309 8%, var(--card))" },
    cyan: { c: "var(--av-blue-500)", bg: "color-mix(in oklab, var(--av-blue-500) 8%, var(--card))" },
    green: { c: "#047857", bg: "color-mix(in oklab, #047857 8%, var(--card))" },
  }
  const t = TONES[color]
  return (
    <div
      className="rounded-2xl border p-4"
      style={{
        background: t.bg,
        borderColor: `color-mix(in oklab, ${t.c} 25%, var(--border))`,
      }}
    >
      <Ic className="h-4 w-4" style={{ color: t.c }} />
      <div className="tabular-nums mt-3.5 text-3xl font-bold leading-none tracking-[-0.04em] text-foreground">
        <CountUp to={value} />
      </div>
      <div className="mt-1 text-[13px] font-semibold text-muted-foreground">
        {label}
      </div>
    </div>
  )
}

function LicenseRow({
  license,
  isLast,
  onDelete,
}: {
  license: License
  isLast: boolean
  onDelete: () => void
}) {
  const label =
    license.license_type === "type_rating" && license.custom_name
      ? `Type Rating ${license.custom_name}`
      : license.license_type === "other" && license.custom_name
        ? license.custom_name
        : LICENSE_TYPE_LABEL[license.license_type]

  const d = license.expires_date ? daysUntil(license.expires_date) : null
  const s = statusOf(d)
  const meta = STATUS_META[s]

  return (
    <div
      className="grid items-center gap-4 px-[18px] py-4 transition-colors group"
      style={{
        gridTemplateColumns: "8px 1fr 200px 110px 120px 100px",
        borderBottom: isLast ? "none" : "1px solid var(--border)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--muted)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div
        className="w-1 h-8 rounded-full"
        style={{ background: meta.color }}
      />
      <div>
        <div className="text-sm font-bold text-foreground">{label}</div>
        <div className="text-[12px] text-muted-foreground mt-0.5">
          {LICENSE_CATEGORY[license.license_type]}
        </div>
      </div>
      <div className="tabular-nums text-sm font-semibold text-foreground">
        {license.expires_date ? (
          new Date(license.expires_date).toLocaleDateString("es-CO", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </div>
      <div>
        {d !== null && (
          <div
            className="tabular-nums text-lg font-bold tracking-[-0.025em]"
            style={{ color: meta.color }}
          >
            {Math.abs(d)}
            <span className="text-[12.5px] text-muted-foreground font-semibold ml-0.5">d</span>
            {d < 0 && <span className="text-[12px] text-muted-foreground ml-1">vencido</span>}
          </div>
        )}
      </div>
      <div>
        <span
          className="px-2 py-0.5 rounded-md text-[11px] font-bold tracking-[0.08em]"
          style={{
            color: meta.color,
            background: `color-mix(in oklab, ${meta.color} 12%, transparent)`,
            border: `1px solid color-mix(in oklab, ${meta.color} 30%, transparent)`,
          }}
        >
          {meta.label}
        </span>
      </div>
      <div className="text-right flex items-center justify-end gap-1">
        <button
          type="button"
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
          aria-label="Eliminar"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-border p-12 text-center max-w-[520px] mx-auto">
      <div
        className="inline-flex items-center justify-center h-14 w-14 rounded-2xl mb-4 text-white"
        style={{
          background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))",
        }}
      >
        <FileText className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-bold text-foreground">Carga tus licencias y certificaciones</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
        Médico clase 1, PPL, CPL, IFR, recurrent check… Una vez cargadas, te recordamos antes que venzan.
      </p>
      <ol className="mt-5 list-none p-0 space-y-2.5 text-left max-w-[360px] mx-auto">
        {[
          "Agrega tu médico clase 1 (lo más urgente)",
          "Suma tus licencias y habilitaciones",
          "Activamos los recordatorios automáticos",
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
        className="mt-5 inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        style={{ background: "var(--av-blue-500)" }}
      >
        <Plus className="h-3.5 w-3.5" /> Agregar la primera
      </button>
    </div>
  )
}

function NewLicenseDialog({
  onClose,
  onSaved,
}: {
  onClose: () => void
  onSaved: () => void
}) {
  const { user } = useSession()
  const [saving, setSaving] = useState(false)
  const [licenseType, setLicenseType] = useState<LicenseType>("medical_class_1")
  const [customName, setCustomName] = useState("")
  const [issuedDate, setIssuedDate] = useState("")
  const [expiresDate, setExpiresDate] = useState("")
  const [notes, setNotes] = useState("")

  const needsCustomName = licenseType === "type_rating" || licenseType === "other"

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!user) return
    setSaving(true)
    try {
      const { error } = await supabase.from("licenses_held").insert({
        user_id: user.id,
        license_type: licenseType,
        custom_name: needsCustomName ? customName.trim() || null : null,
        issued_date: issuedDate || null,
        expires_date: expiresDate || null,
        notes: notes.trim() || null,
      })
      if (error) throw error
      onSaved()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No pudimos guardar")
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
          className="pointer-events-auto w-full max-w-md rounded-3xl bg-card border border-border shadow-2xl my-8"
        >
          <header className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-lg font-bold">Nueva licencia o certificación</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </header>
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Tipo</Label>
              <Select value={licenseType} onValueChange={(v) => setLicenseType(v as LicenseType)}>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(LICENSE_TYPE_LABEL).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {needsCustomName && (
              <div className="space-y-1.5">
                <Label className="text-xs">
                  {licenseType === "type_rating" ? "Aeronave (ej A320, B737)" : "Nombre"}
                </Label>
                <Input
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  required
                  placeholder={licenseType === "type_rating" ? "A320" : "Mi certificación"}
                  className="h-11 rounded-xl"
                />
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Emitida</Label>
                <Input
                  type="date"
                  value={issuedDate}
                  onChange={(e) => setIssuedDate(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Vence el</Label>
                <Input
                  type="date"
                  value={expiresDate}
                  onChange={(e) => setExpiresDate(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Notas (opcional)</Label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Restricciones, médico tratante, número de certificado..."
                className="w-full resize-none rounded-xl border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
              />
            </div>
          </div>
          <footer className="flex items-center justify-end gap-2 px-6 py-4 border-t border-border">
            <Button type="button" variant="ghost" onClick={onClose} disabled={saving} className="rounded-full">
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={saving}
              size="lg"
              className="rounded-xl h-11 px-6 border-0 text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--av-blue-500)" }}
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Guardando…
                </>
              ) : (
                <>Guardar</>
              )}
            </Button>
          </footer>
        </form>
      </div>
    </>
  )
}
