import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  ClipboardCheck,
  Clock,
  GraduationCap,
  Loader2,
  Target,
  type LucideIcon,
} from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
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
import { LogoHorizontal } from "@/components/Logo"
import { track, Events } from "@/lib/analytics"

type Stage =
  | "student_ppl"
  | "ppl"
  | "cpl_in_progress"
  | "cpl_ready"
  | "hour_building"
  | "airline_candidate"
  | "instructor"

type License = "PPL" | "CPL" | "IFR" | "MEP" | "ATPL" | "IVA"

const STAGES: { value: Stage; label: string; tag?: string; sub: string }[] = [
  {
    value: "student_ppl",
    label: "Alumno del curso de piloto de avión",
    tag: "APA",
    sub: "Cursando para obtener tus licencias PPA y PCA.",
  },
  {
    value: "ppl",
    label: "Piloto privado de avión",
    tag: "PPA",
    sub: "Ya tienes tu licencia de piloto privado.",
  },
  {
    value: "cpl_in_progress",
    label: "Cursando el comercial",
    tag: "PCA en curso",
    sub: "Preparando el examen y las horas para la licencia comercial.",
  },
  {
    value: "cpl_ready",
    label: "Piloto comercial de avión",
    tag: "PCA",
    sub: "Ya tienes tu licencia de piloto comercial.",
  },
  {
    value: "hour_building",
    label: "Sumando horas de vuelo",
    sub: "Con licencia comercial, acumulando experiencia para la aerolínea.",
  },
  {
    value: "airline_candidate",
    label: "En preparación para entrar a una aerolínea",
    tag: "PCA",
    sub: "Postulando a procesos de selección de aerolíneas.",
  },
  {
    value: "instructor",
    label: "Instructor de vuelo de avión",
    tag: "IVA",
    sub: "Volando como instructor habilitado en una escuela.",
  },
]

const LICENSES: { value: License; label: string }[] = [
  { value: "PPL", label: "PPA" },
  { value: "CPL", label: "PCA" },
  { value: "IFR", label: "IFR" },
  { value: "MEP", label: "HME" },
  { value: "ATPL", label: "ATPL" },
  { value: "IVA", label: "IVA" },
]
interface FormState {
  stage: Stage | ""
  total_hours: string
  hours_pic: string
  licenses: License[]
  target_airline: string
  target_date: string
}

const INITIAL: FormState = {
  stage: "",
  total_hours: "",
  hours_pic: "",
  licenses: [],
  target_airline: "",
  target_date: "",
}

// El nivel de inglés ICAO ya no se auto-declara acá: sale del test inicial o del
// simulacro TEA dentro de la app.
const STEPS: { title: string; sub: string; icon: LucideIcon }[] = [
  {
    title: "¿En qué etapa de tu carrera de aviación estás?",
    sub: "Para armar una ruta adaptada a tu proceso.",
    icon: GraduationCap,
  },
  { title: "¿Cuántas horas de vuelo tienes?", sub: "Las que están en tu logbook.", icon: Clock },
  { title: "¿Qué licencias tienes?", sub: "Marca todas las que apliquen.", icon: BadgeCheck },
  { title: "Tu objetivo", sub: "¿A qué aerolínea apuntas y para cuándo?", icon: Target },
  { title: "Confirma tus datos", sub: "Vas a poder editarlos después.", icon: ClipboardCheck },
]

/**
 * Formatea una fecha "YYYY-MM-DD" en español legible sin que la zona horaria
 * la corra un día: parseamos los componentes a mano y leemos en UTC.
 */
function formatTargetDate(iso: string): string {
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!parts) return iso
  const date = new Date(Date.UTC(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3])))
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}

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
        return form.total_hours !== ""
      default:
        return true
    }
  })()

  async function handleSubmit() {
    if (!user) {
      toast.error("Sesión perdida. Inicia sesión de nuevo.")
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
        // icao_english_level NO se setea acá: sale del test inicial / simulacro TEA.
        target_airline: form.target_airline || null,
        target_date: form.target_date || null,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      track(Events.ONBOARDING_COMPLETED, {
        stage: form.stage || null,
        target_airline: form.target_airline || null,
        total_hours: form.total_hours ? Number(form.total_hours) : 0,
      })
      toast.success("Listo. Bienvenido a tu cabina.")
      // Después del onboarding lo mandamos directo al test inicial (es skippable).
      navigate("/app/test-inicial", { replace: true })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No pudimos guardar tu perfil")
    } finally {
      setSubmitting(false)
    }
  }

  const isLast = step === STEPS.length - 1
  const progress = ((step + 1) / STEPS.length) * 100
  const StepIcon = STEPS[step].icon
  const selectedStage = STAGES.find((s) => s.value === form.stage)
  const stageSummary = selectedStage
    ? `${selectedStage.label}${selectedStage.tag ? ` (${selectedStage.tag})` : ""}`
    : "—"

  return (
    <main
      className="min-h-screen bg-background flex flex-col"
      style={{
        backgroundImage:
          "linear-gradient(180deg, color-mix(in oklab, var(--av-blue-500) 9%, transparent) 0%, transparent 34%)",
      }}
    >
      <header className="px-6 lg:px-8 h-16 flex items-center justify-between border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <Link to="/">
          <LogoHorizontal className="h-7 w-auto" />
        </Link>
        <div className="text-[12px] text-muted-foreground">
          Paso {step + 1} de {STEPS.length}
        </div>
      </header>

      <div className="h-1 bg-muted">
        <div
          className="h-full transition-all duration-700"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, var(--av-blue-400), var(--av-blue-500))",
            boxShadow: "0 0 8px color-mix(in oklab, var(--av-blue-500) 50%, transparent)",
          }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          <div className="text-center mb-10">
            <div
              key={step}
              className="inline-flex items-center justify-center h-14 w-14 rounded-2xl text-white mb-6 animate-in fade-in-0 zoom-in-95 duration-500"
              style={{ background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))" }}
            >
              <StepIcon className="h-7 w-7" strokeWidth={2} />
            </div>
            <div className="text-[12px] font-semibold text-gradient-gold mb-3">
              Tu plan de vuelo
            </div>
            <h1 className="text-[32px] sm:text-[32px] font-semibold tracking-[-0.03em] leading-[1.05] text-balance text-foreground">
              {STEPS[step].title}
            </h1>
            <p className="mt-2 text-muted-foreground">{STEPS[step].sub}</p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm">
            {step === 0 && (
              <div className="space-y-2">
                {STAGES.map((s) => {
                  const active = form.stage === s.value
                  return (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => update("stage", s.value)}
                      className={`w-full text-left rounded-2xl border p-4 transition-all ${
                        active ? "" : "border-border/60 hover:bg-muted/40"
                      }`}
                      style={
                        active
                          ? {
                              borderColor: "color-mix(in oklab, var(--av-blue-500) 60%, transparent)",
                              background: "color-mix(in oklab, var(--av-blue-500) 8%, transparent)",
                              boxShadow: "0 0 0 3px color-mix(in oklab, var(--av-blue-500) 14%, transparent)",
                            }
                          : undefined
                      }
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-[15px]">{s.label}</span>
                            {s.tag && <span className="chip">{s.tag}</span>}
                          </div>
                          <div className="text-[12px] text-muted-foreground mt-1">{s.sub}</div>
                        </div>
                        {active && (
                          <span
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
                            style={{ background: "var(--av-blue-500)" }}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="total-hours" className="text-[15px]">Horas totales de vuelo</Label>
                  <Input
                    id="total-hours"
                    type="number"
                    min="0"
                    step="0.1"
                    value={form.total_hours}
                    onChange={(e) => update("total_hours", e.target.value)}
                    placeholder="Ej: 245"
                    className="h-12 rounded-xl text-[17px]"
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pic-hours" className="text-[15px]">Horas como PIC (Opcional)</Label>
                  <Input
                    id="pic-hours"
                    type="number"
                    min="0"
                    step="0.1"
                    value={form.hours_pic}
                    onChange={(e) => update("hours_pic", e.target.value)}
                    placeholder="Ej: 120"
                    className="h-12 rounded-xl text-[17px]"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <p className="text-[12px] text-muted-foreground">Toca las que ya tienes emitidas.</p>
                <div className="grid grid-cols-3 gap-2">
                  {LICENSES.map((lic) => {
                    const active = form.licenses.includes(lic.value)
                    return (
                      <button
                        key={lic.value}
                        type="button"
                        onClick={() => toggleLicense(lic.value)}
                        className={`h-12 rounded-xl border text-[17px] font-semibold transition-all ${
                          active
                            ? "text-white scale-[1.02]"
                            : "border-border/60 bg-card hover:bg-muted/40"
                        }`}
                        style={
                          active
                            ? {
                                background: "var(--av-blue-500)",
                                borderColor: "var(--av-blue-500)",
                                boxShadow:
                                  "0 8px 20px -8px color-mix(in oklab, var(--av-blue-500) 60%, transparent)",
                              }
                            : undefined
                        }
                      >
                        {lic.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="airline" className="text-[15px]">Aerolínea objetivo</Label>
                  <Select value={form.target_airline} onValueChange={(v) => update("target_airline", v)}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Elige una aerolínea" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aerolíneas Argentinas">Aerolíneas Argentinas</SelectItem>
                      <SelectItem value="AeroMéxico">AeroMéxico</SelectItem>
                      <SelectItem value="Aerogal">Aerogal</SelectItem>
                      <SelectItem value="Arajet">Arajet</SelectItem>
                      <SelectItem value="Avianca">Avianca</SelectItem>
                      <SelectItem value="Avianca Cargo">Avianca Cargo</SelectItem>
                      <SelectItem value="Clic">Clic</SelectItem>
                      <SelectItem value="Copa Airlines">Copa Airlines</SelectItem>
                      <SelectItem value="EasyFly">EasyFly</SelectItem>
                      <SelectItem value="JetSmart">JetSmart</SelectItem>
                      <SelectItem value="LATAM Airlines">LATAM Airlines</SelectItem>
                      <SelectItem value="Satena">Satena</SelectItem>
                      <SelectItem value="SKY Airline">SKY Airline</SelectItem>
                      <SelectItem value="Volaris">Volaris</SelectItem>
                      <SelectItem value="Wingo">Wingo</SelectItem>
                      <SelectItem value="Otra">Otra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-date" className="text-[15px]">Fecha objetivo (Opcional)</Label>
                  <Input
                    id="target-date"
                    type="date"
                    value={form.target_date}
                    onChange={(e) => update("target_date", e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <>
                <ul className="space-y-3 text-[15px]">
                  <SummaryRow label="Etapa" value={stageSummary} />
                  <SummaryRow
                    label="Horas"
                    value={`${form.total_hours || "—"} totales${form.hours_pic ? ` · ${form.hours_pic} PIC` : ""}`}
                  />
                  <SummaryRow
                    label="Licencias"
                    value={form.licenses.length ? form.licenses.join(", ") : "Ninguna cargada"}
                  />
                  <SummaryRow
                    label="Objetivo"
                    value={`${form.target_airline || "—"}${
                      form.target_date ? ` · ${formatTargetDate(form.target_date)}` : ""
                    }`}
                  />
                </ul>
                <div
                  className="mt-4 rounded-2xl border p-3.5 text-[13px] text-muted-foreground"
                  style={{ borderColor: "color-mix(in oklab, var(--av-blue-500) 22%, transparent)", background: "color-mix(in oklab, var(--av-blue-500) 5%, transparent)" }}
                >
                  Tu nivel de inglés <strong className="text-foreground">ICAO</strong> lo vas a medir con el{" "}
                  <strong className="text-foreground">test inicial</strong> apenas entres, no hace falta declararlo a mano.
                </div>
              </>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0 || submitting}
              className="rounded-xl h-12 px-5"
            >
              <ArrowLeft className="h-4 w-4" />
              Atrás
            </Button>
            {isLast ? (
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                size="lg"
                className="rounded-xl h-12 px-8 border-0 text-white transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--av-blue-500)" }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Guardando…
                  </>
                ) : (
                  <>
                    Confirmar y entrar
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canAdvance}
                size="lg"
                className="rounded-xl h-12 px-8 border-0 text-white disabled:opacity-50 transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--av-blue-500)" }}
              >
                Siguiente
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex justify-between items-center py-2.5 border-b border-border/40 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-right">{value}</span>
    </li>
  )
}
