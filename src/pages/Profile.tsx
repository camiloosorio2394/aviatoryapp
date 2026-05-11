import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
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

type Stage =
  | "student_ppl"
  | "ppl"
  | "cpl_in_progress"
  | "cpl_ready"
  | "hour_building"
  | "airline_candidate"

const STAGES: { value: Stage; label: string }[] = [
  { value: "student_ppl", label: "Estudiante PPL" },
  { value: "ppl", label: "PPL emitido" },
  { value: "cpl_in_progress", label: "Cursando CPL" },
  { value: "cpl_ready", label: "CPL emitido" },
  { value: "hour_building", label: "Hour building" },
  { value: "airline_candidate", label: "Candidato a aerolínea" },
]

const LICENSES = ["PPL", "CPL", "IFR", "MEP", "ATPL"] as const

export function Profile() {
  const { user } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [fullName, setFullName] = useState("")
  const [country, setCountry] = useState("")
  const [stage, setStage] = useState<Stage | "">("")
  const [totalHours, setTotalHours] = useState("")
  const [hoursPic, setHoursPic] = useState("")
  const [icao, setIcao] = useState("")
  const [targetAirline, setTargetAirline] = useState("")
  const [licenses, setLicenses] = useState<string[]>([])

  useEffect(() => {
    if (!user) return
    let cancelled = false
    async function load() {
      try {
        const [profileRes, pilotRes] = await Promise.all([
          supabase.from("profiles").select("full_name, country").eq("id", user!.id).maybeSingle(),
          supabase.from("pilot_state").select("*").eq("user_id", user!.id).maybeSingle(),
        ])
        if (cancelled) return
        if (profileRes.data) {
          setFullName((profileRes.data as { full_name?: string }).full_name ?? "")
          setCountry((profileRes.data as { country?: string }).country ?? "")
        }
        if (pilotRes.data) {
          const p = pilotRes.data as {
            stage?: Stage
            total_hours?: number
            hours_pic?: number
            icao_english_level?: number
            target_airline?: string
            licenses?: string[]
          }
          setStage(p.stage ?? "")
          setTotalHours(p.total_hours?.toString() ?? "")
          setHoursPic(p.hours_pic?.toString() ?? "")
          setIcao(p.icao_english_level?.toString() ?? "")
          setTargetAirline(p.target_airline ?? "")
          setLicenses(p.licenses ?? [])
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "No pudimos cargar tu perfil")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [user])

  async function handleSave() {
    if (!user) return
    setSaving(true)
    try {
      const [pRes, sRes] = await Promise.all([
        supabase
          .from("profiles")
          .update({ full_name: fullName || null, country: country || null })
          .eq("id", user.id),
        supabase.from("pilot_state").upsert({
          user_id: user.id,
          stage: stage || null,
          total_hours: totalHours ? Number(totalHours) : null,
          hours_pic: hoursPic ? Number(hoursPic) : null,
          icao_english_level: icao ? Number(icao) : null,
          target_airline: targetAirline || null,
          licenses,
          updated_at: new Date().toISOString(),
        }),
      ])
      if (pRes.error) throw pRes.error
      if (sRes.error) throw sRes.error
      toast.success("Perfil actualizado ✈️")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No pudimos guardar")
    } finally {
      setSaving(false)
    }
  }

  function toggleLicense(lic: string) {
    setLicenses((prev) => (prev.includes(lic) ? prev.filter((l) => l !== lic) : [...prev, lic]))
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="p-8 max-w-2xl mx-auto animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-12 bg-muted rounded-xl" />
          <div className="h-12 bg-muted rounded-xl" />
          <div className="h-12 bg-muted rounded-xl" />
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Mi perfil</h1>
          <p className="mt-2 text-muted-foreground">
            Tu data del perfil de piloto. Aviatory la usa para calcular tu progreso y plan.
          </p>
        </header>

        <div className="space-y-6">
          <Section title="Identidad">
            <Field label="Email">
              <Input value={user?.email ?? ""} disabled className="h-11 rounded-xl" />
            </Field>
            <Field label="Nombre completo">
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Juan Manuel Pérez"
                className="h-11 rounded-xl"
              />
            </Field>
            <Field label="País">
              <Input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Colombia"
                className="h-11 rounded-xl"
              />
            </Field>
          </Section>

          <Section title="Tu carrera">
            <Field label="Etapa actual">
              <Select value={stage} onValueChange={(v) => setStage(v as Stage)}>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="Elegí una etapa" />
                </SelectTrigger>
                <SelectContent>
                  {STAGES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Horas totales">
                <Input
                  type="number"
                  value={totalHours}
                  onChange={(e) => setTotalHours(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </Field>
              <Field label="Horas PIC">
                <Input
                  type="number"
                  value={hoursPic}
                  onChange={(e) => setHoursPic(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </Field>
            </div>
            <Field label="Licencias">
              <div className="flex flex-wrap gap-2">
                {LICENSES.map((lic) => {
                  const active = licenses.includes(lic)
                  return (
                    <button
                      key={lic}
                      type="button"
                      onClick={() => toggleLicense(lic)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                        active
                          ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/30"
                          : "border-border bg-card hover:border-blue-500/40"
                      }`}
                    >
                      {lic}
                    </button>
                  )
                })}
              </div>
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Inglés ICAO">
                <Select value={icao} onValueChange={setIcao}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        Nivel {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Aerolínea objetivo">
                <Input
                  value={targetAirline}
                  onChange={(e) => setTargetAirline(e.target.value)}
                  placeholder="Avianca, LATAM, Wingo…"
                  className="h-11 rounded-xl"
                />
              </Field>
            </div>
          </Section>

          <Button
            onClick={handleSave}
            disabled={saving}
            size="lg"
            className="btn-apple shine-on-hover rounded-full h-12 px-6 border-0"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Guardando…
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Guardar cambios
              </>
            )}
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  )
}
