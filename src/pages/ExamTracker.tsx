import { useEffect, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { Users, ArrowRight, Plus, X, Loader2, Flame, Check, CircleHelp } from "lucide-react"
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
import { KpiRing } from "@/components/ui/kpi-ring"
import { CountUp } from "@/components/ui/count-up"

interface SubjectIntel {
  subject_id: number
  subject_name: string
  subject_slug: string
  total_reports: number
  pass_rate: number | null
  hottest_topic: string | null
}

const SUBJECT_EMOJI: Record<string, string> = {
  meteorologia: "🌦️",
  navegacion: "🧭",
  reglamento: "📜",
  motores: "⚙️",
  aerodinamica: "✈️",
  "weight-balance": "⚖️",
}

export function ExamTracker() {
  const [intel, setIntel] = useState<SubjectIntel[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)

  async function load() {
    const { data, error } = await supabase.rpc("get_all_subjects_intel")
    if (error) toast.error(error.message)
    else setIntel((data ?? []) as SubjectIntel[])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const totalReports = intel.reduce((acc, i) => acc + i.total_reports, 0)
  const totalSubjects = intel.length
  const subjectsWithData = intel.filter((i) => i.total_reports > 0).length
  const avgPass = intel.length
    ? Math.round(
        intel.filter((i) => i.pass_rate !== null).reduce((a, i) => a + (i.pass_rate ?? 0), 0) /
          Math.max(intel.filter((i) => i.pass_rate !== null).length, 1)
      )
    : 0

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <PageHeader
          eyebrow="EXAM TRACKER · INTELIGENCIA COLECTIVA"
          title="El Waze de los exámenes Aerocivil"
          subtitle="Pilotos que ya tomaron el examen comparten qué cayó. Vos aprendés de los que pasaron, y aportás cuando te toque a vos."
          actions={
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="av-shine inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-[13px] font-semibold text-white border-0 cursor-pointer"
              style={{
                background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
                boxShadow:
                  "0 1px 0 rgb(255 255 255 / 18%) inset, 0 8px 20px -6px oklch(0.55 0.22 264 / 45%)",
              }}
            >
              <Plus className="h-3.5 w-3.5" /> Reportar mi examen
            </button>
          }
        />

        {/* Cockpit hero with KPIs */}
        <div
          className="cockpit anim-fade-up relative overflow-hidden rounded-3xl border p-8 mb-7"
          style={{ borderColor: "oklch(0.32 0.04 250 / 0.6)" }}
        >
          <div className="cockpit-grid absolute inset-0 opacity-45" />
          <div className="relative grid items-center gap-8" style={{ gridTemplateColumns: "auto 1fr auto" }}>
            <KpiRing value={subjectsWithData * 100 / Math.max(totalSubjects, 1)} max={100} size={140} trailing="%" sub="Cobertura" color="cyan" />
            <div>
              <div
                className="mono text-[11px] font-bold tracking-[0.14em] uppercase"
                style={{ color: "var(--av-cyan-300)" }}
              >
                Reportes en los últimos 90 días
              </div>
              <h2 className="mt-2 mb-1 text-3xl font-extrabold tracking-[-0.03em] text-white">
                <CountUp to={totalReports} /> reporte{totalReports !== 1 ? "s" : ""} compartidos
              </h2>
              <p className="m-0 text-[14px] leading-relaxed max-w-[520px]" style={{ color: "oklch(0.78 0.02 250)" }}>
                {totalReports === 0
                  ? "Sé el primero en reportar — tu data ayuda a todos los próximos pilotos."
                  : `${subjectsWithData} de ${totalSubjects} materias con inteligencia. Cada reporte sirve para que otro piloto entre al examen mejor preparado.`}
              </p>
            </div>
            <div className="text-right">
              <div
                className="mono text-[10px] uppercase tracking-[0.12em]"
                style={{ color: "var(--av-cyan-300)" }}
              >
                Pass rate promedio
              </div>
              <div
                className="mono tabular-nums text-4xl font-extrabold tracking-[-0.04em] text-white mt-1"
              >
                {avgPass}<span className="text-lg" style={{ color: "oklch(0.7 0.02 250)" }}>%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subject grid */}
        {loading ? (
          <div className="grid grid-cols-3 gap-3.5 animate-pulse mb-7">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 rounded-xl bg-muted" />
            ))}
          </div>
        ) : (
          <div className="stagger grid grid-cols-3 gap-3.5 mb-8">
            {intel.map((i) => (
              <SubjectIntelCard key={i.subject_id} intel={i} />
            ))}
          </div>
        )}

        {/* How it works */}
        <div className="grid sm:grid-cols-3 gap-4">
          <HowStep n="1" title="Reportá tu examen" body="Después de salir, tomate 2 min para contar qué cayó." />
          <HowStep n="2" title="Tu data se anonimiza" body="Tu identidad no se ve. Solo cuenta cuánto pesó cada tema." />
          <HowStep n="3" title="Todos ganan" body="El próximo piloto entra al examen con tu inteligencia." />
        </div>
      </div>

      {formOpen && (
        <NewReportDialog
          onClose={() => setFormOpen(false)}
          onSaved={() => {
            setFormOpen(false)
            load()
          }}
        />
      )}
    </AppLayout>
  )
}

function SubjectIntelCard({ intel }: { intel: SubjectIntel }) {
  const emoji = SUBJECT_EMOJI[intel.subject_slug] ?? "📘"
  const empty = intel.total_reports === 0

  return (
    <Link
      to={`/app/exam-tracker/${intel.subject_slug}`}
      className="group block rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "oklch(0.78 0.16 215 / 50%)"
        e.currentTarget.style.boxShadow = "var(--shadow-cyan)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl flex-shrink-0">{emoji}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-foreground tracking-[-0.02em]">{intel.subject_name}</h3>
          {empty ? (
            <p className="mt-1 mono text-[11px] text-muted-foreground uppercase tracking-[0.08em]">
              Sin reportes · sé el primero
            </p>
          ) : (
            <div className="mt-1 space-y-1">
              <div className="mono text-[11px] text-muted-foreground flex items-center gap-1.5">
                <Users className="h-3 w-3" />
                {intel.total_reports} reporte{intel.total_reports !== 1 ? "s" : ""} · 90d
              </div>
              {intel.pass_rate !== null && (
                <div className="mono tabular-nums text-[11px] text-muted-foreground">
                  <span className="font-bold text-foreground">{intel.pass_rate}%</span> aprobaron
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {intel.hottest_topic && (
        <div
          className="mt-4 rounded-xl p-3 flex items-start gap-2"
          style={{
            background: "color-mix(in oklab, var(--av-red-400) 8%, transparent)",
            border: "1px solid color-mix(in oklab, var(--av-red-400) 28%, transparent)",
          }}
        >
          <Flame className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--av-red-400)" }} />
          <div className="flex-1 min-w-0">
            <div
              className="mono text-[9px] font-bold uppercase tracking-[0.12em]"
              style={{ color: "var(--av-red-400)" }}
            >
              Tema más caliente
            </div>
            <div className="text-sm font-semibold text-foreground mt-0.5 truncate">{intel.hottest_topic}</div>
          </div>
        </div>
      )}

      <div
        className="mt-4 mono inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.08em]"
        style={{ color: "var(--av-cyan-400)" }}
      >
        Ver inteligencia <ArrowRight className="h-3 w-3" />
      </div>
    </Link>
  )
}

function HowStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div
        className="flex items-center justify-center h-9 w-9 rounded-full text-white text-sm font-bold"
        style={{
          background: "linear-gradient(135deg, var(--av-cyan-400), var(--av-blue-500))",
          boxShadow: "0 4px 12px -4px oklch(0.55 0.22 264 / 40%)",
        }}
      >
        {n}
      </div>
      <h3 className="mt-3 font-bold text-sm text-foreground">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{body}</p>
    </div>
  )
}

// ───────────────────────── New Report Dialog (full form preserved)

interface Subject {
  id: number
  name: string
  slug: string
}

interface Topic {
  id: number
  subject_id: number
  key: string
  label: string
}

const REGIONS: { value: string; label: string }[] = [
  { value: "bogota", label: "Bogotá" },
  { value: "medellin", label: "Medellín" },
  { value: "cali", label: "Cali" },
  { value: "barranquilla", label: "Barranquilla" },
  { value: "cartagena", label: "Cartagena" },
  { value: "cucuta", label: "Cúcuta" },
  { value: "pereira", label: "Pereira" },
  { value: "bucaramanga", label: "Bucaramanga" },
  { value: "otra", label: "Otra" },
]

function NewReportDialog({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const { user } = useSession()
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [topics, setTopics] = useState<Topic[]>([])
  const [saving, setSaving] = useState(false)

  const [subjectId, setSubjectId] = useState<string>("")
  const [examDate, setExamDate] = useState<string>(new Date().toISOString().slice(0, 10))
  const [region, setRegion] = useState<string>("bogota")
  const [passed, setPassed] = useState<"yes" | "no">("yes")
  const [score, setScore] = useState<string>("")
  const [difficulty, setDifficulty] = useState<number>(3)
  const [selectedTopics, setSelectedTopics] = useState<Set<number>>(new Set())
  const [tips, setTips] = useState<string>("")
  const [recalled, setRecalled] = useState<string>("")

  useEffect(() => {
    supabase
      .from("subjects")
      .select("id, name, slug")
      .order("order_index")
      .then(({ data }) => setSubjects((data ?? []) as Subject[]))

    supabase
      .from("subject_topics")
      .select("*")
      .order("order_index")
      .then(({ data }) => setTopics((data ?? []) as Topic[]))
  }, [])

  const filteredTopics = topics.filter((t) => String(t.subject_id) === subjectId)

  function toggleTopic(id: number) {
    setSelectedTopics((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!user || !subjectId) return
    setSaving(true)
    try {
      const { data, error } = await supabase
        .from("exam_reports")
        .insert({
          user_id: user.id,
          subject_id: Number(subjectId),
          exam_date: examDate,
          region,
          passed: passed === "yes",
          score: score ? Number(score) : null,
          difficulty,
          tips: tips.trim() || null,
          recalled_questions: recalled.trim() || null,
        })
        .select("id")
        .single()
      if (error) throw error

      if (selectedTopics.size > 0) {
        const reportId = (data as { id: number }).id
        await supabase.from("exam_report_topics").insert(
          Array.from(selectedTopics).map((topic_id) => ({
            report_id: reportId,
            topic_id,
          }))
        )
      }

      toast.success("¡Gracias por tu reporte! 🛫 La comunidad lo va a aprovechar.")
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
          className="pointer-events-auto w-full max-w-2xl rounded-3xl bg-card border border-border shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
        >
          <header className="sticky top-0 z-10 flex items-center justify-between bg-card/95 backdrop-blur px-6 py-4 border-b border-border">
            <div>
              <h2 className="text-lg font-bold">Reportá tu examen</h2>
              <p className="text-xs text-muted-foreground">
                Anónimo · 2 minutos · ayuda a todos los próximos pilotos
              </p>
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
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Materia</Label>
                <Select value={subjectId} onValueChange={setSubjectId}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Elegí" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Fecha del examen</Label>
                <Input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="h-11 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Centro Aerocivil</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">¿Aprobaste?</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPassed("yes")}
                  className={`rounded-xl border p-3 text-sm font-semibold transition-all ${
                    passed === "yes"
                      ? "text-white"
                      : "border-border bg-card hover:border-foreground/30"
                  }`}
                  style={passed === "yes" ? {
                    background: "var(--av-green-400)",
                    borderColor: "var(--av-green-400)",
                    boxShadow: "0 4px 12px -2px color-mix(in oklab, var(--av-green-400) 40%, transparent)",
                  } : undefined}
                >
                  ✓ Aprobé
                </button>
                <button
                  type="button"
                  onClick={() => setPassed("no")}
                  className={`rounded-xl border p-3 text-sm font-semibold transition-all ${
                    passed === "no" ? "text-white" : "border-border bg-card hover:border-foreground/30"
                  }`}
                  style={passed === "no" ? {
                    background: "var(--av-red-400)",
                    borderColor: "var(--av-red-400)",
                    boxShadow: "0 4px 12px -2px color-mix(in oklab, var(--av-red-400) 40%, transparent)",
                  } : undefined}
                >
                  ✗ No pasé
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Score (opcional)</Label>
                <Input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="87"
                  className="h-11 rounded-xl mono tabular-nums"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Dificultad percibida</Label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setDifficulty(n)}
                      className={`mono tabular-nums flex-1 h-11 rounded-xl border font-bold transition-all ${
                        difficulty === n ? "text-white" : "border-border bg-card hover:border-foreground/30"
                      }`}
                      style={difficulty === n ? {
                        background: "var(--av-blue-500)",
                        borderColor: "var(--av-blue-500)",
                        boxShadow: "0 4px 12px -2px color-mix(in oklab, var(--av-blue-500) 40%, transparent)",
                      } : undefined}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {subjectId && filteredTopics.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <Label className="text-xs">¿Qué temas cayeron?</Label>
                  <span className="text-[10px] text-muted-foreground">Elegí todos los que apliquen</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {filteredTopics.map((t) => {
                    const active = selectedTopics.has(t.id)
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => toggleTopic(t.id)}
                        className={`rounded-xl border p-3 text-left text-sm transition-all ${
                          active ? "" : "border-border bg-card hover:border-foreground/30"
                        }`}
                        style={active ? {
                          background: "color-mix(in oklab, var(--av-cyan-400) 12%, transparent)",
                          borderColor: "color-mix(in oklab, var(--av-cyan-400) 50%, transparent)",
                          boxShadow: "0 0 0 1px color-mix(in oklab, var(--av-cyan-400) 30%, transparent)",
                        } : undefined}
                      >
                        <div className="flex items-center justify-between">
                          <span>{t.label}</span>
                          {active && <Check className="h-3.5 w-3.5" style={{ color: "var(--av-cyan-400)" }} />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label className="text-xs">Tips para el próximo piloto (opcional)</Label>
              <textarea
                value={tips}
                onChange={(e) => setTips(e.target.value)}
                rows={3}
                placeholder="Estudiá bien los METAR, cayó mucha pregunta sobre frentes ocluidos..."
                className="w-full resize-none rounded-xl border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Preguntas que recordás (opcional)</Label>
              <textarea
                value={recalled}
                onChange={(e) => setRecalled(e.target.value)}
                rows={4}
                placeholder="Una sobre QNH y altimetría, otra de inversión térmica..."
                className="w-full resize-none rounded-xl border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
              />
              <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                <CircleHelp className="h-3 w-3" />
                NO transcribas preguntas literales — solo el tema general.
              </p>
            </div>
          </div>

          <footer className="sticky bottom-0 z-10 flex items-center justify-end gap-2 bg-card/95 backdrop-blur px-6 py-4 border-t border-border">
            <Button type="button" variant="ghost" onClick={onClose} disabled={saving} className="rounded-full">
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={saving || !subjectId}
              size="lg"
              className="rounded-full h-11 px-6 border-0 text-white"
              style={{
                background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
                boxShadow: "0 8px 20px -6px oklch(0.55 0.22 264 / 45%)",
              }}
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Guardando…
                </>
              ) : (
                <>Reportar</>
              )}
            </Button>
          </footer>
        </form>
      </div>
    </>
  )
}
