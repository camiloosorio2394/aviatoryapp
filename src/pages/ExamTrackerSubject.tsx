import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, Flame, TrendingUp, MapPin, Lightbulb, Users } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"

interface Topic {
  key: string
  label: string
  count: number
  frequency_pct: number
}

interface RecentReport {
  exam_date: string
  region: string
  passed: boolean
  difficulty: number | null
  tips: string | null
}

interface Intel {
  subject_id: number
  subject_name: string
  total_reports: number
  pass_rate: number | null
  avg_difficulty: number | null
  top_topics: Topic[]
  recent_reports: RecentReport[]
}

const REGION_LABEL: Record<string, string> = {
  bogota: "Bogotá",
  medellin: "Medellín",
  cali: "Cali",
  barranquilla: "Barranquilla",
  cartagena: "Cartagena",
  cucuta: "Cúcuta",
  pereira: "Pereira",
  bucaramanga: "Bucaramanga",
  otra: "Otra",
}

export function ExamTrackerSubject() {
  const { slug } = useParams<{ slug: string }>()
  const [intel, setIntel] = useState<Intel | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    supabase
      .rpc("get_subject_intel", { p_subject_slug: slug })
      .then(({ data, error }) => {
        if (error) {
          toast.error(error.message)
        } else {
          const row = Array.isArray(data) ? data[0] : data
          setIntel((row as Intel) ?? null)
        }
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <AppLayout>
        <div className="p-8 max-w-4xl mx-auto animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-32 bg-muted rounded-2xl" />
          <div className="h-64 bg-muted rounded-2xl" />
        </div>
      </AppLayout>
    )
  }

  if (!intel) {
    return (
      <AppLayout>
        <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-2xl mx-auto">
          <div className="rounded-3xl border border-dashed border-border p-10 text-center">
            <h2 className="text-lg font-bold text-foreground">No encontramos esta materia</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              El enlace puede estar viejo o la materia cambió de nombre.
            </p>
            <Link
              to="/app/exam-tracker"
              className="mt-5 inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--av-blue-500)" }}
            >
              Volver al tracker <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-4xl mx-auto">
        <Link
          to="/app/exam-tracker"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5"
        >
          <ArrowLeft className="h-4 w-4" />
          Todas las materias
        </Link>

        <PageHeader eyebrow="EXAM TRACKER" title={intel.subject_name} />

        <div className="space-y-8">
          {/* Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <StatBox label="Reportes 90d" value={String(intel.total_reports)} />
            <StatBox
              label="% aprobación"
              value={intel.pass_rate !== null ? `${intel.pass_rate}%` : "—"}
            />
            <StatBox
              label="Dificultad media"
              value={intel.avg_difficulty !== null ? `${intel.avg_difficulty} / 5` : "—"}
            />
          </section>

          {/* Top topics */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Temas que más caen
            </h2>
            {intel.top_topics.length === 0 ? (
              <EmptyTopics />
            ) : (
              <ul className="space-y-2">
                {intel.top_topics.map((t, i) => (
                  <TopicRow key={t.key} topic={t} rank={i + 1} />
                ))}
              </ul>
            )}
          </section>

          {/* Recent reports */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Reportes recientes
            </h2>
            {intel.recent_reports.length === 0 ? (
              <EmptyReports subjectName={intel.subject_name} />
            ) : (
              <ul className="space-y-3">
                {intel.recent_reports.map((r, i) => (
                  <RecentReportRow key={i} report={r} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </AppLayout>
  )
}

function StatBox({ label, value }: { label: string; value: string }) {
  const isEmpty = value === "—"
  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
      <div
        className={`mt-1 text-2xl sm:text-3xl font-bold tracking-[-0.03em] tabular ${
          isEmpty ? "text-muted-foreground" : "text-foreground"
        }`}
      >
        {value}
      </div>
    </div>
  )
}

function TopicRow({ topic, rank }: { topic: Topic; rank: number }) {
  const isTop = rank === 1
  return (
    <li className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <div className="tabular flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-full border border-border bg-muted text-muted-foreground font-bold text-xs">
          {rank}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-foreground">{topic.label}</span>
            {isTop && (
              <span className="chip chip-amber">
                <Flame className="h-3 w-3" /> Más frecuente
              </span>
            )}
          </div>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.max(topic.frequency_pct, 4)}%`,
                  background: isTop ? "var(--av-amber-400)" : "var(--av-blue-500)",
                }}
              />
            </div>
            <span className="tabular text-sm font-semibold text-foreground w-12 text-right">
              {topic.frequency_pct}%
            </span>
          </div>
          <div className="mt-1 text-[12.5px] text-muted-foreground">
            Cayó en {topic.count} reporte{topic.count !== 1 ? "s" : ""}
          </div>
        </div>
      </div>
    </li>
  )
}

function RecentReportRow({ report }: { report: RecentReport }) {
  const date = new Date(report.exam_date).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  return (
    <li className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <span className="tabular">{date}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {REGION_LABEL[report.region] ?? report.region}
          </span>
          {report.difficulty && (
            <>
              <span>·</span>
              <span className="tabular">Dificultad {report.difficulty}/5</span>
            </>
          )}
        </div>
        <span className={`chip ${report.passed ? "chip-green" : "chip-red"}`}>
          {report.passed ? "Aprobó" : "No pasó"}
        </span>
      </div>
      {report.tips && (
        <div className="mt-2 flex gap-2 items-start text-sm">
          <Lightbulb className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-foreground leading-relaxed">{report.tips}</p>
        </div>
      )}
    </li>
  )
}

function EmptyTopics() {
  return (
    <div className="rounded-2xl border border-dashed border-border p-8 text-center">
      <TrendingUp className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
      <p className="text-sm text-muted-foreground">
        Cuando haya reportes con temas marcados, aquí vas a ver los que más caen.
      </p>
    </div>
  )
}

/** Mismo patrón de estado vacío que Logbook y Vencimientos: icono, título, tres pasos y salida. */
function EmptyReports({ subjectName }: { subjectName: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-border p-10 sm:p-12 text-center max-w-[520px] mx-auto">
      <div
        className="inline-flex items-center justify-center h-14 w-14 rounded-2xl mb-4 text-white"
        style={{ background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))" }}
      >
        <Users className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-bold text-foreground">Nadie ha reportado {subjectName}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
        Los reportes son anónimos y solo cuentan qué temas cayeron. El primero abre la
        inteligencia de esta materia para todos.
      </p>
      <ol className="mt-5 list-none p-0 space-y-2.5 text-left max-w-[360px] mx-auto">
        {[
          "Presenta tu examen en el centro Aerocivil",
          "Marca los temas que te cayeron y cómo te fue",
          "Tu reporte queda aquí para el próximo piloto",
        ].map((s, i) => (
          <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <span className="tabular flex-shrink-0 w-[22px] h-[22px] rounded-md bg-muted border border-border flex items-center justify-center text-[12.5px] font-bold text-foreground">
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
      <Link
        to="/app/exam-tracker"
        className="mt-5 inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        style={{ background: "var(--av-blue-500)" }}
      >
        Reportar mi examen <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}
