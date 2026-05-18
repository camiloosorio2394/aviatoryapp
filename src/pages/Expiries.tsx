import { useEffect, useState, type FormEvent } from "react"
import { AlertTriangle, Calendar, Loader2, Plus, Trash2, X, FileText, Check } from "lucide-react"
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

function daysUntil(date: string): number {
  const target = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function tone(daysLeft: number) {
  if (daysLeft < 0) return { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-500/30", label: "Vencido" }
  if (daysLeft <= 7) return { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-500/30", label: "Urgente" }
  if (daysLeft <= 30) return { color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-950/30", border: "border-orange-500/30", label: "Próximo" }
  if (daysLeft <= 90) return { color: "text-yellow-700 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-950/30", border: "border-yellow-500/30", label: "Mantén ojo" }
  return { color: "text-green-700 dark:text-green-400", bg: "bg-green-50 dark:bg-green-950/30", border: "border-green-500/30", label: "Vigente" }
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
    if (error) {
      toast.error(error.message)
    } else {
      setLicenses((data ?? []) as License[])
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
    // Trigger expiry check (creates notifs si corresponde)
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

  return (
    <AppLayout>
      <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-4xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em]">
              Vencimientos
            </h1>
            <p className="mt-1 text-muted-foreground">
              Tu médico clase 1, licencias y recurrent checks. Te avisamos antes que venzan.
            </p>
          </div>
          <Button
            onClick={() => setFormOpen(true)}
            size="lg"
            className="btn-apple rounded-full h-11 px-5 border-0"
          >
            <Plus className="h-4 w-4" />
            Agregar
          </Button>
        </header>

        {loading ? (
          <div className="animate-pulse space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-muted" />
            ))}
          </div>
        ) : licenses.length === 0 ? (
          <EmptyState onAdd={() => setFormOpen(true)} />
        ) : (
          <ul className="space-y-2.5">
            {licenses.map((l) => (
              <LicenseRow key={l.id} license={l} onDelete={() => deleteOne(l.id)} />
            ))}
          </ul>
        )}

        <div className="rounded-2xl border border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20 p-5 flex gap-3 items-start">
          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold">Te avisamos automático</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Cuando una licencia entra en los 30, 15, 7 o 1 días previos a vencer, te
              llega una notificación en la campanita 🔔. Sin que tengas que abrir
              esta pantalla.
            </p>
          </div>
        </div>
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

function LicenseRow({ license, onDelete }: { license: License; onDelete: () => void }) {
  const label =
    license.license_type === "type_rating" && license.custom_name
      ? `Type Rating ${license.custom_name}`
      : license.license_type === "other" && license.custom_name
        ? license.custom_name
        : LICENSE_TYPE_LABEL[license.license_type]

  const daysLeft = license.expires_date ? daysUntil(license.expires_date) : null
  const t = daysLeft !== null ? tone(daysLeft) : null

  return (
    <li
      className={`group flex items-start gap-4 rounded-2xl border p-4 sm:p-5 ${
        t ? `${t.border} ${t.bg}` : "border-border/60 bg-card"
      }`}
    >
      <div className={`flex-shrink-0 mt-0.5 ${t?.color ?? "text-muted-foreground"}`}>
        {t && daysLeft !== null && daysLeft <= 30 ? (
          <AlertTriangle className="h-5 w-5" />
        ) : (
          <Check className="h-5 w-5" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <h3 className="text-base font-semibold">{label}</h3>
          {t && (
            <span className={`text-xs font-medium ${t.color}`}>{t.label}</span>
          )}
        </div>
        <div className="mt-1 text-sm text-muted-foreground tabular">
          {license.expires_date ? (
            <>
              Vence el {new Date(license.expires_date).toLocaleDateString("es-CO", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
              {daysLeft !== null && (
                <span className={`ml-2 font-medium ${t?.color}`}>
                  {daysLeft < 0
                    ? `· hace ${Math.abs(daysLeft)} días`
                    : daysLeft === 0
                      ? "· hoy"
                      : `· en ${daysLeft} día${daysLeft !== 1 ? "s" : ""}`}
                </span>
              )}
            </>
          ) : (
            <span>Sin fecha de vencimiento</span>
          )}
        </div>
        {license.notes && (
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
            {license.notes}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
        aria-label="Eliminar"
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
        <FileText className="h-7 w-7" />
      </div>
      <h3 className="text-base font-semibold">Carga tus licencias y certificaciones</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
        Médico clase 1, PPL, CPL, IFR, recurrent check… Una vez cargadas, te
        recordamos antes que venzan.
      </p>
      <Button onClick={onAdd} size="lg" className="btn-apple rounded-full mt-5 h-11 px-5 border-0">
        <Plus className="h-4 w-4" />
        Agregar la primera
      </Button>
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
          className="pointer-events-auto w-full max-w-md rounded-3xl bg-card shadow-2xl my-8"
        >
          <header className="flex items-center justify-between px-6 py-4 border-b border-border/40">
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
          <footer className="flex items-center justify-end gap-2 px-6 py-4 border-t border-border/40">
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
                <>Guardar</>
              )}
            </Button>
          </footer>
        </form>
      </div>
    </>
  )
}
