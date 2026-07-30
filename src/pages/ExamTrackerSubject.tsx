import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Flame, TrendingUp, MapPin, Lightbulb } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { AppLayout } from "@/components/layout/AppLayout"
import { Badge } from "@/components/ui/badge"

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
        <div className="p-8 text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground">Materia no encontrada.</p>
          <Link to="/app/exam-tracker" className="text-blue-600 hover:underline text-sm mt-3 inline-block">
            ← Volver al tracker
          </Link>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-4xl mx-auto space-y-8">
        <Link
          to="/app/exam-tracker"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Todas las materias
        </Link>

        <header>
          <div className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Exam Tracker
          </div>
          <h1 className="mt-1 text-3xl sm:text-4xl font-bold tracking-[-0.03em]">
            {intel.subject_name}
          </h1>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-3 gap-3 sm:gap-4">
          <StatBox label="Reportes 90d" value={String(intel.total_reports)} />
          <StatBox
            label="% aprobación"
            value={intel.pass_rate !== null ? `${intel.pass_rate}%` : "—"}
            tone={
              intel.pass_rate === null
                ? "neutral"
                : intel.pass_rate >= 70
                  ? "good"
                  : intel.pass_rate >= 50
                    ? "warn"
                    : "bad"
            }
          />
          <StatBox
            label="Dificultad media"
            value={
              intel.avg_difficulty !== null ? `${intel.avg_difficulty} / 5` : "—"
            }
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
            <p className="text-sm text-muted-foreground">
              Nadie ha reportado todavía en esta materia. Sé el primero.
            </p>
          ) : (
            <ul className="space-y-3">
              {intel.recent_reports.map((r, i) => (
                <RecentReportRow key={i} report={r} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </AppLayout>
  )
}

function StatBox({
  label,
  value,
  tone = "neutral",
}: {
  label: string
  value: string
  tone?: "neutral" | "good" | "warn" | "bad"
}) {
  const color =
    tone === "good"
      ? "text-green-600 dark:text-green-400"
      : tone === "warn"
        ? "text-orange-600 dark:text-orange-400"
        : tone === "bad"
          ? "text-red-600 dark:text-red-400"
          : ""
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 sm:p-5">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
      <div className={`mt-1 text-2xl sm:text-3xl font-bold tracking-[-0.03em] tabular ${color}`}>
        {value}
      </div>
    </div>
  )
}

function TopicRow({ topic, rank }: { topic: Topic; rank: number }) {
  const isTop = rank === 1
  return (
    <li
      className={`rounded-xl border p-4 ${
        isTop
          ? "border-orange-500/30 bg-orange-50/50 dark:bg-orange-950/20"
          : "border-border/60 bg-card"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-full font-bold text-xs ${
            isTop
              ? "bg-orange-500 text-white"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {isTop ? <Flame className="h-4 w-4" /> : rank}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold">{topic.label}</div>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  isTop ? "bg-orange-500" : "bg-blue-500"
                }`}
                style={{ width: `${Math.max(topic.frequency_pct, 4)}%` }}
              />
            </div>
            <span className="text-sm font-semibold tabular w-12 text-right">
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
    <li className="rounded-xl border border-border/60 bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
        <Badge
          variant={report.passed ? "secondary" : "default"}
          className={`rounded-full text-[12px] ${
            report.passed
              ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300"
          }`}
        >
          {report.passed ? "✓ Aprobó" : "✗ No pasó"}
        </Badge>
      </div>
      {report.tips && (
        <div className="mt-2 flex gap-2 items-start text-sm">
          <Lightbulb className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-foreground leading-relaxed">{report.tips}</p>
        </div>
      )}
    </li>
  )
}

function EmptyTopics() {
  return (
    <div className="rounded-2xl border border-dashed border-border/60 p-8 text-center">
      <TrendingUp className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
      <p className="text-sm text-muted-foreground">
        Cuando haya reportes con temas tagueados, vas a ver aquí los que más caen.
      </p>
    </div>
  )
}
