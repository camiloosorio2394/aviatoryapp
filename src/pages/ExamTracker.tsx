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
    if (error) {
      toast.error(error.message)
    } else {
      setIntel((data ?? []) as SubjectIntel[])
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const totalReports = intel.reduce((acc, i) => acc + i.total_reports, 0)

  return (
    <AppLayout>
      <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <Users className="h-4 w-4" />
              Inteligencia colectiva
            </div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-[-0.03em]">
              Exam Tracker
            </h1>
            <p className="mt-2 text-muted-foreground max-w-2xl leading-relaxed">
              Pilotos que ya tomaron el examen Aerocivil comparten qué cayó.
              Tú aprendes de los que ya pasaron, y aportás cuando llegue tu turno.
              <strong className="text-foreground"> El Waze de los exámenes.</strong>
            </p>
          </div>
          <Button
            onClick={() => setFormOpen(true)}
            size="lg"
            className="btn-apple rounded-full h-11 px-5 border-0"
          >
            <Plus className="h-4 w-4" />
            Reportar mi examen
          </Button>
        </header>

        {/* Community stat */}
        <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-50 via-blue-50/40 to-transparent dark:from-blue-950/40 p-6 sm:p-7 flex items-center gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/30 flex-shrink-0">
            <Users className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
              Reportes en los últimos 90 días
            </div>
            <div className="mt-1 text-3xl sm:text-4xl font-bold tracking-[-0.03em] tabular">
              {loading ? "…" : totalReports}
            </div>
            <p className="text-sm text-muted-foreground">
              {totalReports === 0
                ? "Sé el primero en reportar — tu data ayuda a todos"
                : "Cada reporte sirve para que otro piloto entre al examen mejor preparado"}
            </p>
          </div>
        </section>

        {/* Subjects grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-muted" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {intel.map((i) => (
              <SubjectCard key={i.subject_id} intel={i} />
            ))}
          </div>
        )}

        {/* How it works */}
        <section className="grid sm:grid-cols-3 gap-4">
          <HowStep n="1" title="Reportá tu examen" body="Después de salir, tomate 2 min para contar qué cayó." />
          <HowStep n="2" title="La data se anonimiza" body="Tu identidad no se ve. Solo cuenta cuánto pesó cada tema." />
          <HowStep n="3" title="Todos ganan" body="El próximo piloto entra al examen con tu inteligencia adentro." />
        </section>
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

function SubjectCard({ intel }: { intel: SubjectIntel }) {
  const emoji = SUBJECT_EMOJI[intel.subject_slug] ?? "📘"
  const empty = intel.total_reports === 0

  return (
    <Link
      to={`/app/exam-tracker/${intel.subject_slug}`}
      className="group block rounded-2xl border border-border/60 bg-card card-apple p-6 hover:border-blue-500/30"
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl flex-shrink-0">{emoji}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold">{intel.subject_name}</h3>
          {empty ? (
            <p className="mt-1 text-xs text-muted-foreground">
              Sin reportes aún · sé el primero
            </p>
          ) : (
            <div className="mt-1 space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Users className="h-3 w-3" />
                {intel.total_reports} reporte{intel.total_reports !== 1 ? "s" : ""}{" "}
                · últimos 90 días
              </p>
              {intel.pass_rate !== null && (
                <p className="text-xs text-muted-foreground tabular">
                  <span className="font-semibold text-foreground">{intel.pass_rate}%</span>{" "}
                  aprobaron
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {intel.hottest_topic && (
        <div className="mt-4 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-500/20 p-3 flex items-start gap-2">
          <Flame className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-orange-700 dark:text-orange-300">
              Tema más caliente
            </div>
            <div className="text-sm font-medium mt-0.5">{intel.hottest_topic}</div>
          </div>
        </div>
      )}

      <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 group-hover:gap-1.5 transition-all">
        Ver inteligencia <ArrowRight className="h-3 w-3" />
      </div>
    </Link>
  )
}

function HowStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5">
      <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/30">
        {n}
      </div>
      <h3 className="mt-3 font-semibold text-sm">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{body}</p>
    </div>
  )
}

// ───────────────────────── New Report Dialog

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

  // Form state
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
          className="pointer-events-auto w-full max-w-2xl rounded-3xl bg-card shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
        >
          <header className="sticky top-0 z-10 flex items-center justify-between bg-card/95 backdrop-blur px-6 py-4 border-b border-border/40">
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
            {/* Subject + date + region */}
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

            {/* Pass/fail */}
            <div className="space-y-2">
              <Label className="text-xs">¿Aprobaste?</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPassed("yes")}
                  className={`rounded-xl border p-3 text-sm font-medium transition-all ${
                    passed === "yes"
                      ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-500/30"
                      : "border-border/60 bg-card hover:border-green-500/30"
                  }`}
                >
                  ✓ Aprobé
                </button>
                <button
                  type="button"
                  onClick={() => setPassed("no")}
                  className={`rounded-xl border p-3 text-sm font-medium transition-all ${
                    passed === "no"
                      ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-500/30"
                      : "border-border/60 bg-card hover:border-red-500/30"
                  }`}
                >
                  ✗ No pasé
                </button>
              </div>
            </div>

            {/* Score + difficulty */}
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
                  className="h-11 rounded-xl tabular"
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
                      className={`flex-1 h-11 rounded-xl border font-semibold transition-all tabular ${
                        difficulty === n
                          ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/30"
                          : "border-border/60 bg-card hover:border-blue-500/30"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Topics multiselect */}
            {subjectId && filteredTopics.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <Label className="text-xs">¿Qué temas cayeron?</Label>
                  <span className="text-[10px] text-muted-foreground">
                    Elegí todos los que apliquen
                  </span>
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
                          active
                            ? "bg-blue-50 dark:bg-blue-950/30 border-blue-500/50 ring-1 ring-blue-500/30"
                            : "border-border/60 bg-card hover:border-blue-500/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{t.label}</span>
                          {active && <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Tips */}
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

            {/* Recalled questions */}
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

          <footer className="sticky bottom-0 z-10 flex items-center justify-end gap-2 bg-card/95 backdrop-blur px-6 py-4 border-t border-border/40">
            <Button type="button" variant="ghost" onClick={onClose} disabled={saving} className="rounded-full">
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={saving || !subjectId}
              size="lg"
              className="btn-apple rounded-full h-11 px-6 border-0"
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
