import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Lock, Zap, Cloud, Compass, FileText, Settings, Plane, Activity, BookOpen, Check, Clock, Trophy } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { KpiRing } from "@/components/ui/kpi-ring"
import { CountUp } from "@/components/ui/count-up"

interface Subject {
  id: number
  name: string
  slug: string
  order_index: number
  questionCount?: number
  mastery?: {
    avg_score: number
    level: MasteryLevel
    attempts: number
  }
}

type MasteryLevel = "novice" | "learning" | "proficient" | "advanced" | "expert"

interface MasteryRow {
  subject_id: number
  total_questions: number
  total_attempted: number
  avg_score: number
  mastery_level: MasteryLevel
  attempts_count: number
}

const MASTERY_LABEL: Record<MasteryLevel, string> = {
  novice: "Sin practicar",
  learning: "Aprendiendo",
  proficient: "En camino",
  advanced: "Avanzado",
  expert: "Dominio",
}

const COLOR_MAP: Record<string, string> = {
  cyan: "var(--av-cyan-400)",
  blue: "var(--av-blue-400)",
  violet: "var(--av-violet-400)",
  amber: "var(--av-amber-400)",
  green: "var(--av-green-400)",
}

const SUBJECT_META: Record<string, { icon: typeof Cloud; color: "cyan" | "blue" | "violet" | "amber" | "green"; desc: string }> = {
  meteorologia: { icon: Cloud, color: "cyan", desc: "Clima, frentes, masas de aire, visibilidad, engelamiento." },
  navegacion: { icon: Compass, color: "blue", desc: "Cartas, rumbo, deriva, GPS, navegación a estima." },
  reglamento: { icon: FileText, color: "violet", desc: "RAC, FAR, ICAO, espacios aéreos, prioridades." },
  motores: { icon: Settings, color: "amber", desc: "Motor de pistón, hélices, encendido, combustión." },
  aerodinamica: { icon: Plane, color: "cyan", desc: "Sustentación, perfil alar, pérdida, performance." },
  "weight-balance": { icon: Activity, color: "green", desc: "CG, distribución de carga, momentos, límites." },
}

const MASTERY_COLOR: Record<MasteryLevel, "cyan" | "amber" | "blue" | "green" | "red"> = {
  novice: "red",
  learning: "amber",
  proficient: "amber",
  advanced: "blue",
  expert: "green",
}

export function Quiz() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [subjectsRes, countsRes, masteryRes] = await Promise.all([
          supabase.from("subjects").select("*").order("order_index"),
          supabase.from("questions").select("subject_id"),
          supabase.rpc("get_subject_mastery"),
        ])
        if (cancelled) return
        const counts = new Map<number, number>()
        for (const row of (countsRes.data ?? []) as { subject_id: number }[]) {
          counts.set(row.subject_id, (counts.get(row.subject_id) ?? 0) + 1)
        }
        const masteryBySubject = new Map<number, MasteryRow>()
        for (const row of (masteryRes.data ?? []) as MasteryRow[]) {
          masteryBySubject.set(row.subject_id, row)
        }
        const list = ((subjectsRes.data ?? []) as Subject[]).map((s) => {
          const m = masteryBySubject.get(s.id)
          return {
            ...s,
            questionCount: counts.get(s.id) ?? 0,
            mastery: m
              ? { avg_score: Number(m.avg_score) || 0, level: m.mastery_level, attempts: m.attempts_count }
              : undefined,
          }
        })
        setSubjects(list)
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "No pudimos cargar las materias")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  // Overall mastery average for the hero
  const masteryAvg = subjects.length
    ? Math.round(
        subjects.reduce((acc, s) => acc + (s.mastery?.avg_score ?? 0), 0) / subjects.length
      )
    : 0
  const totalAttempts = subjects.reduce((acc, s) => acc + (s.mastery?.attempts ?? 0), 0)
  const totalQuestions = subjects.reduce((acc, s) => acc + (s.questionCount ?? 0), 0)
  const weakest = subjects
    .filter((s) => (s.questionCount ?? 0) > 0)
    .sort((a, b) => (a.mastery?.avg_score ?? 0) - (b.mastery?.avg_score ?? 0))[0]
  const strongest = subjects.filter((s) => s.mastery && s.mastery.attempts > 0).sort((a, b) => (b.mastery?.avg_score ?? 0) - (a.mastery?.avg_score ?? 0))[0]

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <PageHeader
          eyebrow={`MATERIAS · ${totalQuestions} PREGUNTAS`}
          title="Estudia donde más te falta"
          subtitle="Cada materia tiene quices estilo examen Aerocivil PCA. Próximamente: contenido teórico y exámenes completos por materia. Tu mastery se actualiza con cada intento."
          actions={
            <Link
              to="/app/materias"
              className="av-shine inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-[13px] font-semibold text-white"
              style={{
                background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
                boxShadow:
                  "0 1px 0 rgb(255 255 255 / 18%) inset, 0 1px 2px rgb(15 22 41 / 18%), 0 8px 20px -6px oklch(0.55 0.22 264 / 45%)",
              }}
            >
              <Zap className="h-3.5 w-3.5" /> Quiz rápido (10)
            </Link>
          }
        />

        {/* Mastery overview */}
        <div
          className="rounded-xl border p-6 mb-6"
          style={{
            background: "linear-gradient(160deg, color-mix(in oklab, var(--av-cyan-400) 6%, var(--card)) 0%, var(--card) 100%)",
            borderColor: "var(--border)",
          }}
        >
          <div className="grid gap-8 items-center" style={{ gridTemplateColumns: "auto 1fr" }}>
            <KpiRing value={masteryAvg} max={100} size={140} trailing="%" sub="Dominio" color="cyan" />
            <div>
              <div className="mono text-[10px] font-bold tracking-[0.14em] uppercase" style={{ color: "var(--av-cyan-400)" }}>
                Tu progreso general
              </div>
              <h3 className="mt-1.5 mb-1 text-[22px] font-bold tracking-[-0.025em] text-foreground">
                {masteryAvg >= 60 ? "Vas por buen camino, Capitán" : "Hay espacio para crecer"}
              </h3>
              <p className="m-0 text-muted-foreground text-[13px] leading-relaxed max-w-[520px]">
                {strongest && weakest && (
                  <>
                    <strong className="text-foreground">{strongest.name}</strong> está cerca de dominio.{" "}
                    <strong className="text-foreground">{weakest.name}</strong> sigue siendo tu materia más débil — empieza ahí hoy.
                  </>
                )}
                {!strongest && "Haz tu primer quiz para empezar a medir tu mastery."}
              </p>
              <div className="mt-4 flex gap-4 flex-wrap">
                <MiniStat label="Quizzes" value={totalAttempts} icon={BookOpen} />
                <MiniStat label="Aciertos" value={masteryAvg} suffix="%" icon={Check} />
                <MiniStat label="Preguntas" value={totalQuestions} icon={Clock} />
                {strongest && <MiniStat label="Mejor materia" valueText={strongest.name} icon={Trophy} />}
              </div>
            </div>
          </div>
        </div>

        {/* Subject grid */}
        {loading ? (
          <div className="grid grid-cols-3 gap-3.5 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[260px] rounded-xl bg-muted" />
            ))}
          </div>
        ) : (
          <div className="stagger grid grid-cols-3 gap-3.5">
            {subjects.map((s) => (
              <SubjectCard key={s.id} s={s} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}

function MiniStat({
  label,
  value,
  valueText,
  suffix,
  icon: Ic,
}: {
  label: string
  value?: number
  valueText?: string
  suffix?: string
  icon: typeof Cloud
}) {
  return (
    <div className="flex items-center gap-2">
      <Ic className="h-3.5 w-3.5 text-muted-foreground" />
      <div>
        <div className="mono tabular-nums text-base font-bold text-foreground tracking-[-0.02em] leading-none">
          {value !== undefined ? <CountUp to={value} /> : valueText}
          {suffix}
        </div>
        <div className="mono text-[9px] text-muted-foreground uppercase tracking-[0.1em] mt-0.5">{label}</div>
      </div>
    </div>
  )
}

function SubjectCard({ s }: { s: Subject }) {
  const meta = SUBJECT_META[s.slug] ?? { icon: BookOpen, color: "cyan" as const, desc: "" }
  const Ic = meta.icon
  const accent = COLOR_MAP[meta.color]
  const locked = !s.questionCount || s.questionCount === 0
  const masteryColor = s.mastery ? MASTERY_COLOR[s.mastery.level] : "cyan"

  const card = (
    <div
      className="relative overflow-hidden rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5"
      style={{
        borderColor: "var(--border)",
        opacity: locked ? 0.55 : 1,
        cursor: locked ? "default" : "pointer",
      }}
      onMouseEnter={(e) => {
        if (!locked) {
          e.currentTarget.style.borderColor = "oklch(0.78 0.16 215 / 50%)"
          e.currentTarget.style.boxShadow = "var(--shadow-cyan)"
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      <div
        aria-hidden
        className="absolute -top-[30px] -right-[30px] w-[120px] h-[120px] rounded-full blur-2xl"
        style={{ background: accent, opacity: 0.07 }}
      />
      <div className="relative">
        <div className="flex justify-between items-start">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              background: `color-mix(in oklab, ${accent} 14%, transparent)`,
              color: accent,
              border: `1px solid color-mix(in oklab, ${accent} 28%, transparent)`,
            }}
          >
            <Ic className="h-[22px] w-[22px]" />
          </div>
          <KpiRing
            value={Math.round(s.mastery?.avg_score ?? 0)}
            max={100}
            size={64}
            trailing="%"
            color={meta.color}
          />
        </div>
        <h3 className="mt-4 mb-1 text-base font-bold tracking-[-0.02em] text-foreground">{s.name}</h3>
        <p className="m-0 text-xs text-muted-foreground leading-relaxed">{meta.desc}</p>

        <div className="div-dotted my-4" />

        <div className="flex justify-between items-center">
          <div>
            <div
              className="mono text-[9px] font-bold uppercase tracking-[0.12em]"
              style={{ color: COLOR_MAP[masteryColor] }}
            >
              {s.mastery ? MASTERY_LABEL[s.mastery.level] : "Sin practicar"}
            </div>
            <div className="mono tabular-nums text-[11px] text-muted-foreground mt-0.5">
              {locked
                ? "Próximamente"
                : `${s.questionCount} preguntas · ${s.mastery?.attempts ?? 0} intentos`}
            </div>
          </div>
          {locked ? (
            <span className="chip">
              <Lock className="h-3 w-3" /> Pronto
            </span>
          ) : (
            <span
              className="mono inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.08em]"
              style={{ color: accent }}
            >
              {s.mastery && s.mastery.attempts > 0 ? "Continuar" : "Empezar"} <ArrowRight className="h-[11px] w-[11px]" />
            </span>
          )}
        </div>
      </div>
    </div>
  )

  if (locked) return card
  return <Link to={`/app/materias/${s.slug}`}>{card}</Link>
}
