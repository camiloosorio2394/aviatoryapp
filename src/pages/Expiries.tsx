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
  ppl: "PPL · Piloto Privado",
  cpl: "CPL · Piloto Comercial",
  atpl: "ATPL · Línea Aérea",
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

/**
 * Única fuente de verdad del estado de un vencimiento.
 * Contador, eyebrow, tiles, banner y filas se derivan de aquí: no hay
 * umbrales sueltos duplicados en la pantalla.
 */
type Status = "expired" | "critical" | "urgent" | "warn" | "ok" | "none"
function statusOf(d: number | null): Status {
  if (d === null) return "none"
  if (d < 0) return "expired"
  if (d <= 7) return "critical"
  if (d <= 30) return "urgent"
  if (d <= 120) return "warn"
  return "ok"
}

/** color: token plano, para la barra de 4px y el contador de días. chip: utilidad con par claro/oscuro. */
/**
 * `color` es para superficies planas (la barra de 4px del estado): ahí los
 * tokens --av-*-400 funcionan bien. `fg` es para TEXTO: esos mismos tokens son
 * claros a propósito y sobre fondo blanco dan menos de 2.5:1, así que el
 * contador de días quedaba ilegible en modo claro. Los tokens *-fg tienen su
 * par claro/oscuro definido en index.css.
 */
const STATUS_META: Record<Status, { color: string; fg: string; label: string; chip: string }> = {
  expired: { color: "var(--av-red-400)", fg: "var(--av-danger-fg)", label: "VENCIDO", chip: "chip-red" },
  critical: { color: "var(--av-red-400)", fg: "var(--av-danger-fg)", label: "CRÍTICO", chip: "chip-red" },
  urgent: { color: "var(--av-amber-400)", fg: "var(--av-warn-fg)", label: "URGENTE", chip: "chip-amber" },
  warn: { color: "var(--av-amber-400)", fg: "var(--av-warn-fg)", label: "ATENCIÓN", chip: "chip-amber" },
  ok: { color: "var(--av-green-400)", fg: "var(--av-success-fg)", label: "AL DÍA", chip: "chip-green" },
  none: { color: "var(--muted-foreground)", fg: "var(--muted-foreground)", label: "SIN FECHA", chip: "" },
}

function plural(n: number, one: string, many: string): string {
  return n === 1 ? one : many
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

  // Todos los buckets salen de statusOf: un ítem cae en uno y solo uno.
  const statuses = licenses.map((l) => statusOf(l.expires_date ? daysUntil(l.expires_date) : null))
  const countOf = (s: Status) => statuses.filter((x) => x === s).length
  const expired = countOf("expired")
  const critical = countOf("critical")
  const urgent = countOf("urgent")
  const warn = countOf("warn")
  const ok = countOf("ok")
  const needsAction = expired + critical

  const eyebrow =
    needsAction > 0
      ? `VENCIMIENTOS · ${needsAction} ${plural(needsAction, "CRÍTICO", "CRÍTICOS")}`
      : licenses.length > 0
        ? "VENCIMIENTOS · TODO AL DÍA"
        : "VENCIMIENTOS"

  const bannerTitle =
    expired > 0 && critical > 0
      ? `${expired} ${plural(expired, "ítem vencido", "ítems vencidos")} y ${critical} por vencer en 7 días o menos`
      : expired > 0
        ? `${expired} ${plural(expired, "ítem ya venció", "ítems ya vencieron")}`
        : `${critical} ${plural(critical, "ítem vence", "ítems vencen")} en 7 días o menos`

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <PageHeader
          eyebrow={eyebrow}
          title={needsAction > 0 ? "Lo que vence pronto" : "Tus vencimientos al día"}
          subtitle={needsAction > 0
            ? "Renueva antes de que venzan para no perder legalidad."
            : "Te avisamos automáticamente en los 30, 15, 7 y 1 días previos a vencer."}
          actions={
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl text-[13px] font-semibold text-white border-0 cursor-pointer transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--av-blue-500)" }}
            >
              <Plus className="h-3.5 w-3.5" /> Agregar
            </button>
          }
        />

        {/* Summary tiles */}
        {!loading && licenses.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            <SummaryTile label="Vencidos" hint="Ya sin vigencia" value={expired} color="red" icon={AlertTriangle} />
            <SummaryTile label="Críticos" hint="7 días o menos" value={critical} color="red" icon={Clock} />
            <SummaryTile label="Por vencer" hint="8 a 30 días" value={urgent} color="amber" icon={Calendar} />
            <SummaryTile label="Atención" hint="1 a 4 meses" value={warn} color="cyan" icon={Calendar} />
            <SummaryTile label="Al día" hint="Más de 4 meses" value={ok} color="green" icon={CheckCircle} />
          </div>
        )}

        {/* Aviso: vencidos y críticos, con el mismo umbral que las filas */}
        {needsAction > 0 && (
          <div
            className="anim-fade-up flex items-center gap-3.5 px-5 py-4 rounded-2xl mb-6"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--av-red-400) 10%, var(--card)) 0%, var(--card) 70%)",
              border: "1px solid color-mix(in oklab, var(--av-red-400) 35%, transparent)",
            }}
          >
            <div
              className="relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "color-mix(in oklab, var(--av-red-400) 14%, transparent)",
                color: "var(--av-red-400)",
              }}
            >
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-[15px] font-semibold text-foreground tracking-[-0.015em]">
                {bannerTitle}
              </div>
              <div className="text-[12px] text-muted-foreground mt-0.5">
                Si no renuevas antes del vencimiento pierdes legalidad para volar PIC.
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
          <div className="rounded-2xl surface overflow-hidden">
            <div className="overflow-x-auto">
              <div className="lg:min-w-[620px]">
                {licenses.map((l, i) => (
                  <LicenseRow
                    key={l.id}
                    license={l}
                    isLast={i === licenses.length - 1}
                    onDelete={() => deleteOne(l.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {formOpen && (
        <NewLicenseDialog
          onClose={() => setFormOpen(false)}
          onSaved={() => {
            setFormOpen(false)
            load()
            toast.success("Guardada")
          }}
        />
      )}
    </AppLayout>
  )
}

const TILE_TONE: Record<"red" | "amber" | "cyan" | "green", string> = {
  red: "var(--av-red-400)",
  amber: "var(--av-amber-400)",
  cyan: "var(--av-blue-500)",
  green: "var(--av-green-400)",
}

function SummaryTile({
  label,
  hint,
  value,
  color,
  icon: Ic,
}: {
  label: string
  hint: string
  value: number
  color: "red" | "amber" | "cyan" | "green"
  icon: typeof AlertTriangle
}) {
  const tone = TILE_TONE[color]
  const active = value > 0
  return (
    <div
      className="rounded-2xl border p-4"
      style={{
        background: active ? `color-mix(in oklab, ${tone} 8%, var(--card))` : "var(--card)",
        borderColor: active ? `color-mix(in oklab, ${tone} 25%, var(--border))` : "var(--border)",
      }}
    >
      <Ic className="h-4 w-4" style={{ color: active ? tone : "var(--muted-foreground)" }} />
      <div
        className="tabular-nums mt-3.5 text-[24px] sm:text-[32px] font-semibold leading-none tracking-[-0.04em]"
        style={{ color: active ? "var(--foreground)" : "var(--muted-foreground)" }}
      >
        <CountUp to={value} />
      </div>
      <div className="mt-1 text-[13px] font-semibold text-foreground">{label}</div>
      <div className="text-[12px] text-muted-foreground">{hint}</div>
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

  const dateStr = license.expires_date
    ? // "AAAA-MM-DD" sin hora se parsea como UTC y en Colombia retrocede un día
      new Date(license.expires_date + "T00:00:00").toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null

  const statusChip = <span className={`chip ${meta.chip} tracking-[0.08em]`}>{meta.label}</span>

  const daysBlock =
    d !== null ? (
      <span className="tabular-nums font-semibold tracking-[-0.025em]" style={{ color: meta.fg }}>
        {Math.abs(d)}
        <span className="text-[12px] text-muted-foreground font-semibold ml-0.5">d</span>
        {d < 0 && <span className="text-[12px] text-muted-foreground ml-1">vencido</span>}
      </span>
    ) : null

  const deleteButton = (
    <button
      type="button"
      onClick={onDelete}
      className="opacity-60 lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity p-1.5 rounded-md text-muted-foreground hover:text-[color:var(--av-red-400)] hover:bg-muted"
      aria-label={`Eliminar ${label}`}
    >
      <Trash2 className="h-3.5 w-3.5" />
    </button>
  )

  return (
    <div style={{ borderBottom: isLast ? "none" : "1px solid var(--border)" }}>
      {/* Móvil y tablet: tarjeta apilada. Los días restantes y el estado nunca se recortan. */}
      <div className="lg:hidden flex items-start gap-3 px-4 py-4">
        <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ background: meta.color }} />
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-semibold text-foreground">{label}</div>
          <div className="text-[12px] text-muted-foreground mt-0.5">
            {LICENSE_CATEGORY[license.license_type]} · {dateStr ?? "Sin fecha de vencimiento"}
          </div>
          <div className="mt-2 flex items-center gap-2.5 flex-wrap">
            {statusChip}
            {daysBlock && <span className="text-[15px]">{daysBlock}</span>}
          </div>
        </div>
        <div className="flex-shrink-0">{deleteButton}</div>
      </div>

      {/* Desde lg: la fila densa */}
      <div className="hidden lg:grid items-center gap-4 px-[18px] py-4 transition-colors group hover:bg-muted lg:grid-cols-[8px_1fr_200px_110px_120px_60px]">
        <div className="w-1 h-8 rounded-full" style={{ background: meta.color }} />
        <div>
          <div className="text-[15px] font-semibold text-foreground">{label}</div>
          <div className="text-[12px] text-muted-foreground mt-0.5">
            {LICENSE_CATEGORY[license.license_type]}
          </div>
        </div>
        <div className="tabular-nums text-[15px] font-semibold text-foreground">
          {dateStr ?? <span className="text-muted-foreground">—</span>}
        </div>
        <div className="text-[17px]">{daysBlock}</div>
        <div>{statusChip}</div>
        <div className="flex items-center justify-end">{deleteButton}</div>
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
      <h3 className="text-[17px] font-semibold text-foreground">Carga tus licencias y certificaciones</h3>
      <p className="mt-2 text-[15px] text-muted-foreground max-w-md mx-auto leading-relaxed">
        Médico clase 1, PPL, CPL, IFR, recurrent check. Una vez cargadas, te recordamos antes de que venzan.
      </p>
      <ol className="mt-5 list-none p-0 space-y-2.5 text-left max-w-[360px] mx-auto">
        {[
          "Agrega tu médico clase 1 (lo más urgente)",
          "Suma tus licencias y habilitaciones",
          "Activamos los recordatorios automáticos",
        ].map((s, i) => (
          <li key={i} className="flex items-center gap-2.5 text-[15px] text-muted-foreground">
            <span className="tabular-nums flex-shrink-0 w-[22px] h-[22px] rounded-md bg-muted border border-border flex items-center justify-center text-[12px] font-semibold text-foreground">
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={onAdd}
        className="mt-5 inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
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
      <div className="fixed inset-0 z-[60] bg-background/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center overflow-y-auto p-4 pointer-events-none">
        <form
          onSubmit={handleSubmit}
          className="pointer-events-auto w-full max-w-md rounded-3xl bg-card border border-border shadow-2xl my-8"
        >
          <header className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-[17px] font-semibold">Nueva licencia o certificación</h2>
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
              <Label className="text-[12px]">Tipo</Label>
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
                <Label className="text-[12px]">
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
                <Label className="text-[12px]">Emitida</Label>
                <Input
                  type="date"
                  value={issuedDate}
                  onChange={(e) => setIssuedDate(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12px]">Vence el</Label>
                <Input
                  type="date"
                  value={expiresDate}
                  onChange={(e) => setExpiresDate(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[12px]">Notas (opcional)</Label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Restricciones, médico tratante, número de certificado..."
                className="w-full resize-none rounded-xl border border-input bg-transparent px-3 py-2 text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </div>
          </div>
          <footer className="flex items-center justify-end gap-2 px-6 pt-4 pb-24 sm:pb-4 border-t border-border">
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
