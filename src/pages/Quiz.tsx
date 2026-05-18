import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BookOpen, ArrowRight, Lock } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { AppLayout } from "@/components/layout/AppLayout"
import { Badge } from "@/components/ui/badge"

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

const MASTERY_COLOR: Record<MasteryLevel, string> = {
  novice: "bg-muted-foreground/40",
  learning: "bg-orange-500",
  proficient: "bg-yellow-500",
  advanced: "bg-blue-500",
  expert: "bg-emerald-500",
}

const subjectMeta: Record<string, { emoji: string; description: string; color: string }> = {
  meteorologia: {
    emoji: "🌦️",
    description: "Clima, frentes, masas de aire, visibilidad, engelamiento.",
    color: "from-sky-500 to-blue-600",
  },
  navegacion: {
    emoji: "🧭",
    description: "Cartas, rumbo, deriva, GPS, navegación a estima.",
    color: "from-indigo-500 to-blue-600",
  },
  reglamento: {
    emoji: "📜",
    description: "RAC, FAR, ICAO, espacios aéreos, prioridades.",
    color: "from-violet-500 to-purple-600",
  },
  motores: {
    emoji: "⚙️",
    description: "Motor de pistón, hélices, encendido, combustión.",
    color: "from-orange-500 to-red-600",
  },
  aerodinamica: {
    emoji: "✈️",
    description: "Sustentación, perfil alar, pérdida, performance.",
    color: "from-cyan-500 to-blue-500",
  },
  "weight-balance": {
    emoji: "⚖️",
    description: "CG, distribución de carga, momentos, límites.",
    color: "from-emerald-500 to-teal-600",
  },
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
              ? {
                  avg_score: Number(m.avg_score) || 0,
                  level: m.mastery_level,
                  attempts: m.attempts_count,
                }
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

  return (
    <AppLayout>
      <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Banco de preguntas</h1>
          <p className="mt-2 text-muted-foreground">
            Elegí una materia para practicar. Cada quiz tiene 10 preguntas estilo examen Aerocivil PCA.
          </p>
        </header>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-44 rounded-2xl bg-muted" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((s) => {
              const meta = subjectMeta[s.slug] ?? { emoji: "📘", description: "", color: "from-blue-500 to-blue-700" }
              const empty = !s.questionCount || s.questionCount === 0
              return (
                <div
                  key={s.id}
                  className="group relative rounded-2xl border border-border/60 bg-card card-apple p-6 overflow-hidden"
                >
                  <div
                    aria-hidden
                    className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${meta.color} opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
                  />
                  <div className="relative">
                    <div className="text-3xl">{meta.emoji}</div>
                    <h3 className="mt-3 text-lg font-semibold">{s.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {meta.description}
                    </p>

                    {/* Mastery bar */}
                    {s.mastery && s.mastery.attempts > 0 ? (
                      <div className="mt-4 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {MASTERY_LABEL[s.mastery.level]}
                          </span>
                          <span className="font-semibold tabular">
                            {Math.round(s.mastery.avg_score)}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full ${MASTERY_COLOR[s.mastery.level]} transition-all duration-500`}
                            style={{ width: `${Math.max(s.mastery.avg_score, 4)}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 space-y-1.5">
                        <div className="text-xs text-muted-foreground">
                          {empty ? "Sin preguntas todavía" : "Sin practicar"}
                        </div>
                        <div className="h-1.5 rounded-full bg-muted" />
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <Badge variant="secondary" className="rounded-full text-xs tabular">
                        {s.questionCount} pregunta{s.questionCount === 1 ? "" : "s"}
                      </Badge>
                      {empty ? (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Lock className="h-3 w-3" />
                          Pronto
                        </span>
                      ) : (
                        <Link
                          to={`/app/quiz/${s.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:gap-1.5 transition-all"
                        >
                          {s.mastery && s.mastery.attempts > 0 ? "Continuar" : "Empezar"}
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/40">
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Estamos cargando contenido</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Camilo (nuestro instructor jefe) está cargando preguntas oficiales del PCA Aerocivil.
                Si una materia dice "Pronto", todavía no está disponible — vuelve en unos días.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
