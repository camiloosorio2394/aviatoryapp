import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  Flame,
  TrendingUp,
  MapPin,
  Lightbulb,
  Users,
  Radar,
  MessagesSquare,
} from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { SectionTitle } from "@/components/ui/section-title"

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
    let alive = true
    void (async () => {
      setLoading(true)
      const { data, error } = await supabase.rpc("get_subject_intel", { p_subject_slug: slug })
      if (!alive) return
      if (error) {
        toast.error(error.message)
      } else {
        const row = Array.isArray(data) ? data[0] : data
        setIntel((row as Intel) ?? null)
      }
      setLoading(false)
    })()
    return () => {
      alive = false
    }
  }, [slug])

  if (loading) {
    return (
      <AppLayout>
        <div className="px-4 sm:px-7 py-7 pb-20 max-w-[1480px] mx-auto animate-pulse">
          <div className="h-9 w-56 bg-muted rounded-xl mb-7" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-2xl" />
            ))}
          </div>
          <div className="h-64 bg-muted rounded-2xl" />
        </div>
      </AppLayout>
    )
  }

  if (!intel) {
    return (
      <AppLayout>
        <div className="px-4 sm:px-7 py-7 pb-20 max-w-[1480px] mx-auto">
          <div className="rounded-3xl border border-dashed border-border p-8 sm:p-10 text-center max-w-[520px] mx-auto">
            <h2 className="text-[17px] font-semibold text-foreground">No encontramos esta materia</h2>
            <p className="mt-2 text-[15px] text-muted-foreground">
              El enlace puede estar viejo o la materia cambió de nombre.
            </p>
            <Link
              to="/app/pca/examenes"
              className="mt-5 inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
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
      <div className="px-4 sm:px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <PageHeader
          eyebrow={
            <>
              <Radar className="h-3.5 w-3.5" /> EXAM TRACKER
            </>
          }
          title={intel.subject_name}
          subtitle="Lo que reportaron los pilotos que ya presentaron esta materia en los últimos 90 días."
          actions={
            <Link
              to="/app/pca/examenes"
              className="btn-apple-ghost inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl text-[13px] font-semibold no-underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Todas las materias
            </Link>
          }
        />

        <div className="space-y-8">
          {/* Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <StatBox label="Reportes 90 días" value={String(intel.total_reports)} />
            <StatBox
              label="Aprobación"
              value={intel.pass_rate !== null ? `${intel.pass_rate}%` : "—"}
              chip={passRateChip(intel.pass_rate)}
            />
            <StatBox
              label="Dificultad media"
              value={intel.avg_difficulty !== null ? `${intel.avg_difficulty} / 5` : "—"}
              chip={difficultyChip(intel.avg_difficulty)}
            />
          </section>

          {/* Top topics */}
          <section>
            <SectionTitle
              icon={TrendingUp}
              eyebrow="Frecuencia"
              title="Temas que más caen"
              hint={
                intel.top_topics.length > 0
                  ? "Ordenados por cuántas veces aparecieron en los reportes."
                  : undefined
              }
            />
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
            <SectionTitle
              icon={MessagesSquare}
              eyebrow="Comunidad"
              title="Reportes recientes"
              hint={
                intel.recent_reports.length > 0
                  ? "Anónimos, del más nuevo al más viejo."
                  : undefined
              }
            />
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

type Tone = "green" | "amber" | "red"
interface Chip {
  label: string
  tone: Tone
}

/** El número siempre va en text-foreground; el color vive en el chip, que ya trae par claro/oscuro. */
function passRateChip(pct: number | null): Chip | undefined {
  if (pct === null) return undefined
  if (pct >= 70) return { label: "Alta", tone: "green" }
  if (pct >= 50) return { label: "Media", tone: "amber" }
  return { label: "Baja", tone: "red" }
}

function difficultyChip(avg: number | null): Chip | undefined {
  if (avg === null) return undefined
  if (avg <= 2) return { label: "Llevadera", tone: "green" }
  if (avg <= 3.5) return { label: "Media", tone: "amber" }
  return { label: "Exigente", tone: "red" }
}

function StatBox({ label, value, chip }: { label: string; value: string; chip?: Chip }) {
  const isEmpty = value === "—"
  return (
    <div className="card-apple rounded-2xl surface p-4 sm:p-5">
      <div className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
      <div className="mt-1 flex items-center gap-2 flex-wrap">
        <div
          className={`text-[24px] sm:text-[32px] font-semibold tracking-[-0.03em] tabular ${
            isEmpty ? "text-muted-foreground" : "text-foreground"
          }`}
        >
          {value}
        </div>
        {chip && !isEmpty && <span className={`chip chip-${chip.tone}`}>{chip.label}</span>}
      </div>
    </div>
  )
}

function TopicRow({ topic, rank }: { topic: Topic; rank: number }) {
  const isTop = rank === 1
  return (
    <li className="rounded-xl surface p-4">
      <div className="flex items-center gap-3">
        <div className="tabular flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-full border border-border bg-muted text-muted-foreground font-semibold text-[12px]">
          {rank}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[15px] font-semibold text-foreground">{topic.label}</span>
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
            <span className="tabular text-[15px] font-semibold text-foreground w-12 text-right">
              {topic.frequency_pct}%
            </span>
          </div>
          <div className="mt-1 text-[12px] text-muted-foreground">
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
    <li className="rounded-xl surface p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
        <div className="flex items-center gap-2 text-[12px] text-muted-foreground flex-wrap">
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
        <div className="mt-2 flex gap-2 items-start text-[15px]">
          <Lightbulb className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-foreground leading-relaxed">{report.tips}</p>
        </div>
      )}
    </li>
  )
}

function EmptyTopics() {
  return (
    <div className="rounded-2xl border border-dashed border-border p-8 sm:p-10 text-center max-w-[520px] mx-auto">
      <div
        className="inline-flex items-center justify-center h-14 w-14 rounded-2xl mb-4 text-white"
        style={{ background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))" }}
      >
        <TrendingUp className="h-7 w-7" />
      </div>
      <h3 className="text-[17px] font-semibold text-foreground">Todavía no hay temas marcados</h3>
      <p className="mt-2 text-[15px] text-muted-foreground max-w-md mx-auto leading-relaxed">
        Apenas los reportes empiecen a marcar qué cayó, aquí queda el ranking de los temas más
        frecuentes de esta materia.
      </p>
      <Link
        to="/app/pca/examenes"
        className="mt-5 inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
        style={{ background: "var(--av-blue-500)" }}
      >
        Reportar mi examen <ArrowRight className="h-3.5 w-3.5" />
      </Link>
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
      <h3 className="text-[17px] font-semibold text-foreground">Nadie ha reportado {subjectName}</h3>
      <p className="mt-2 text-[15px] text-muted-foreground max-w-md mx-auto leading-relaxed">
        Los reportes son anónimos y solo cuentan qué temas cayeron. El primero abre la
        inteligencia de esta materia para todos.
      </p>
      <ol className="mt-5 list-none p-0 space-y-2.5 text-left max-w-[360px] mx-auto">
        {[
          "Presenta tu examen en el centro Aerocivil",
          "Marca los temas que te cayeron y cómo te fue",
          "Tu reporte queda aquí para el próximo piloto",
        ].map((s, i) => (
          <li key={i} className="flex items-center gap-2.5 text-[15px] text-muted-foreground">
            <span className="tabular flex-shrink-0 w-[22px] h-[22px] rounded-md bg-muted border border-border flex items-center justify-center text-[12px] font-semibold text-foreground">
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
      <Link
        to="/app/pca/examenes"
        className="mt-5 inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
        style={{ background: "var(--av-blue-500)" }}
      >
        Reportar mi examen <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}
