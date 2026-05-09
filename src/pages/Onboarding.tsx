import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

type License = "PPL" | "CPL" | "IFR" | "MEP" | "ATPL"

const STAGES: { value: Stage; label: string }[] = [
  { value: "student_ppl", label: "Estudiante PPL" },
  { value: "ppl", label: "PPL emitido" },
  { value: "cpl_in_progress", label: "Cursando CPL" },
  { value: "cpl_ready", label: "CPL emitido" },
  { value: "hour_building", label: "Hour building" },
  { value: "airline_candidate", label: "Candidato a aerolínea" },
]

const LICENSES: License[] = ["PPL", "CPL", "IFR", "MEP", "ATPL"]
const ICAO_LEVELS = [1, 2, 3, 4, 5, 6] as const

interface FormState {
  stage: Stage | ""
  total_hours: string
  hours_pic: string
  licenses: License[]
  icao_english_level: string
  target_airline: string
  target_date: string
}

const INITIAL: FormState = {
  stage: "",
  total_hours: "",
  hours_pic: "",
  licenses: [],
  icao_english_level: "",
  target_airline: "",
  target_date: "",
}

const STEP_TITLES = [
  "Tu etapa actual",
  "Horas de vuelo",
  "Licencias",
  "Inglés ICAO",
  "Tu objetivo",
  "Confirmá tus datos",
]

const TOTAL_STEPS = STEP_TITLES.length

export function Onboarding() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(INITIAL)
  const [submitting, setSubmitting] = useState(false)

  const navigate = useNavigate()
  const { user } = useSession()

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function toggleLicense(lic: License) {
    setForm((prev) => ({
      ...prev,
      licenses: prev.licenses.includes(lic)
        ? prev.licenses.filter((l) => l !== lic)
        : [...prev.licenses, lic],
    }))
  }

  const canAdvance = (() => {
    switch (step) {
      case 0:
        return !!form.stage
      case 1:
        return form.total_hours !== "" && form.hours_pic !== ""
      case 3:
        return form.icao_english_level !== ""
      default:
        return true
    }
  })()

  async function handleSubmit() {
    if (!user) {
      toast.error("Sesión perdida. Iniciá sesión de nuevo.")
      return
    }
    setSubmitting(true)
    try {
      const { error } = await supabase.from("pilot_state").upsert({
        user_id: user.id,
        stage: form.stage || null,
        total_hours: form.total_hours ? Number(form.total_hours) : null,
        hours_pic: form.hours_pic ? Number(form.hours_pic) : null,
        licenses: form.licenses,
        icao_english_level: form.icao_english_level
          ? Number(form.icao_english_level)
          : null,
        target_airline: form.target_airline || null,
        target_date: form.target_date || null,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      toast.success("Listo. Bienvenido a tu cabina.")
      navigate("/app", { replace: true })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No pudimos guardar tu perfil")
    } finally {
      setSubmitting(false)
    }
  }

  const isLast = step === TOTAL_STEPS - 1

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardDescription>
            Paso {step + 1} de {TOTAL_STEPS}
          </CardDescription>
          <CardTitle>{STEP_TITLES[step]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 0 && (
            <div className="space-y-2">
              <Label>¿En qué etapa de tu carrera estás?</Label>
              <Select
                value={form.stage}
                onValueChange={(v) => update("stage", v as Stage)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Elegí una opción" />
                </SelectTrigger>
                <SelectContent>
                  {STAGES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="total-hours">Horas totales de vuelo</Label>
                <Input
                  id="total-hours"
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.total_hours}
                  onChange={(e) => update("total_hours", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pic-hours">Horas como PIC</Label>
                <Input
                  id="pic-hours"
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.hours_pic}
                  onChange={(e) => update("hours_pic", e.target.value)}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <div className="space-y-2">
              <Label>Licencias actuales (opcional)</Label>
              <div className="grid grid-cols-3 gap-2">
                {LICENSES.map((lic) => {
                  const active = form.licenses.includes(lic)
                  return (
                    <button
                      key={lic}
                      type="button"
                      onClick={() => toggleLicense(lic)}
                      className={
                        "p-3 border rounded-md text-sm font-medium transition-colors " +
                        (active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card hover:bg-accent")
                      }
                    >
                      {lic}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              <Label>Nivel ICAO de inglés</Label>
              <Select
                value={form.icao_english_level}
                onValueChange={(v) => update("icao_english_level", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Elegí tu nivel (1–6)" />
                </SelectTrigger>
                <SelectContent>
                  {ICAO_LEVELS.map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      Nivel {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {step === 4 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="airline">Aerolínea objetivo (opcional)</Label>
                <Input
                  id="airline"
                  placeholder="Avianca, LATAM, Wingo…"
                  value={form.target_airline}
                  onChange={(e) => update("target_airline", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-date">Fecha objetivo (opcional)</Label>
                <Input
                  id="target-date"
                  type="date"
                  value={form.target_date}
                  onChange={(e) => update("target_date", e.target.value)}
                />
              </div>
            </>
          )}

          {step === 5 && (
            <ul className="text-sm space-y-2">
              <li>
                <span className="text-muted-foreground">Etapa:</span>{" "}
                <strong>
                  {STAGES.find((s) => s.value === form.stage)?.label ?? "—"}
                </strong>
              </li>
              <li>
                <span className="text-muted-foreground">Horas:</span>{" "}
                <strong>
                  {form.total_hours || "—"} totales · {form.hours_pic || "—"} PIC
                </strong>
              </li>
              <li>
                <span className="text-muted-foreground">Licencias:</span>{" "}
                <strong>
                  {form.licenses.length ? form.licenses.join(", ") : "—"}
                </strong>
              </li>
              <li>
                <span className="text-muted-foreground">Inglés ICAO:</span>{" "}
                <strong>{form.icao_english_level || "—"}</strong>
              </li>
              <li>
                <span className="text-muted-foreground">Objetivo:</span>{" "}
                <strong>{form.target_airline || "—"}</strong>
                {form.target_date ? ` · ${form.target_date}` : ""}
              </li>
            </ul>
          )}

          <div className="flex justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0 || submitting}
            >
              Atrás
            </Button>
            {isLast ? (
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Guardando…" : "Confirmar"}
              </Button>
            ) : (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canAdvance}
              >
                Siguiente
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
