import { Link } from "react-router-dom"
import {
  FileText,
  ListChecks,
  Timer,
  Target,
  Sparkles,
  ArrowRight,
  Check,
  Clock,
  Award,
  Loader2,
  PlayCircle,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { useVaultSubjects } from "@/hooks/useVaultQuiz"
import { getSubjectMeta, type SubjectColor } from "@/lib/vaultSubjects"

/**
 * Módulo Examen PCA Aerocivil — simulacros completos del examen oficial.
 */
export function Pca() {
  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 sm:p-8">
          <div className="grid items-center gap-7 sm:grid-cols-[1fr_auto]">
            <div>
              <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
                Materias · Banco PCA Aerocivil
              </div>
              <h1 className="mt-1.5 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.05]">
                Estudiá por materia, simulá el examen
              </h1>
              <p className="text-[16px] text-muted-foreground max-w-[640px] mt-3 leading-relaxed">
                El banco completo del examen Piloto Comercial de Avión de Aerocivil. Practicá
                cada materia por separado para reforzar lo que te cuesta, o lanzá un{" "}
                <strong className="text-foreground">Simulacro Examen PCA</strong> con preguntas
                mezcladas de todas las materias para medir qué tan listo estás.
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-center gap-3 pr-2">
              <div
                className="flex items-center justify-center w-[110px] h-[110px] rounded-2xl"
                style={{ background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))" }}
              >
                <Award className="h-14 w-14 text-white" strokeWidth={1.5} />
              </div>
              <div className="text-[12px] font-semibold text-muted-foreground">Examen oficial</div>
            </div>
          </div>
        </section>

        {/* === MATERIAS DISPONIBLES (en vivo desde vault_questions) === */}
        <AvailableSubjects />

        <div className="mt-10 mb-5 flex items-end justify-between">
          <div>
            <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
              Roadmap del módulo
            </div>
            <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
              Cómo te vamos a preparar
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />4 secciones · liberación gradual
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FeatureTile
            icon={Timer}
            color="cyan"
            title="Simulacros con cronómetro"
            description="Mismo número de preguntas, mismo tiempo, mismas materias que el examen oficial Aerocivil. Sin atajos."
            bullets={[
              "Reloj real, no pausable (como en Aerocivil)",
              "Mix de preguntas por materia idéntico al oficial",
              "Modo enfoque sin distracciones",
            ]}
          />
          <FeatureTile
            icon={ListChecks}
            color="blue"
            title="Análisis post-examen"
            description="Apenas terminas ves materia por materia dónde fallaste y qué quiz te conviene hacer primero para subir la nota."
            bullets={[
              "Score por materia + benchmark vs otros pilotos",
              "Recomendaciones de quices específicos",
              "Historial de simulacros para ver progreso",
            ]}
          />
          <FeatureTile
            icon={FileText}
            color="violet"
            title="Banco de preguntas reviewed"
            description="Preguntas redactadas por nosotros basadas en la teoría oficial. Validadas por pilotos que ya pasaron el examen, sin riesgo legal de copiar literal del banco oficial."
            bullets={[
              "Cobertura completa Reglamento + Meteorología + Aerodinámica + Navegación + Radio",
              "Cross-referenced con respuestas oficiales OACI / Aerocivil",
              "Actualizadas cuando cambia la normativa",
            ]}
          />
          <FeatureTile
            icon={Target}
            color="green"
            title="Tracker de readiness"
            description="Un número que te dice qué tan listo estás para presentar. Si está en verde, agenda el examen. Si está en rojo, todavía no gastes 250k en presentarlo."
            bullets={[
              "% predicho de aprobación basado en tus simulacros",
              "Materias críticas que aún te frenan",
              "Mínimo recomendado: 80% en 3 simulacros consecutivos",
            ]}
          />
        </div>

        <section
          className="mt-10 rounded-2xl border p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
          style={{
            borderColor: "color-mix(in oklab, var(--av-blue-500) 22%, transparent)",
            background: "color-mix(in oklab, var(--av-blue-500) 5%, transparent)",
          }}
        >
          <div>
            <div
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
              style={{ color: "var(--av-blue-500)" }}
            >
              <Sparkles className="h-3.5 w-3.5" /> Cómo estudiar
            </div>
            <h3 className="mt-1.5 text-lg font-bold">
              Elegí una materia de arriba y arrancá un quiz de 10 preguntas.
            </h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-[640px]">
              Cada quiz que apruebas con 70%+ acerca tu readiness al examen real.
              También puedes ver qué materias caen más usando Exam Tracker.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/app/exam-tracker"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-semibold border border-border bg-card hover:bg-muted transition-colors"
            >
              Ver Exam Tracker <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}

interface TileProps {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  color: "cyan" | "blue" | "violet" | "amber" | "green"
  title: string
  description: string
  bullets: string[]
}

const TILE_COLOR: Record<TileProps["color"], string> = {
  cyan: "#0E7490",
  blue: "#2563EB",
  violet: "#7C3AED",
  amber: "#B45309",
  green: "#047857",
}

function FeatureTile({ icon: Icon, color, title, description, bullets }: TileProps) {
  return (
    <div
      className="card card-hover rounded-2xl border p-6 flex flex-col gap-3.5"
      style={{ borderColor: "color-mix(in oklab, var(--border) 65%, transparent)" }}
    >
      <div className="flex items-start gap-3.5">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: `color-mix(in oklab, ${TILE_COLOR[color]} 12%, transparent)`,
            color: TILE_COLOR[color],
          }}
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <div className="flex-1 pt-0.5">
          <div className="text-[16px] font-bold tracking-[-0.01em]">{title}</div>
          <p className="mt-0.5 text-[14px] text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
      <ul className="space-y-1.5 pl-1">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-[14px] text-foreground/90">
            <Check
              className="flex-shrink-0 mt-0.5 h-3.5 w-3.5"
              style={{ color: TILE_COLOR[color] } as React.CSSProperties}
              strokeWidth={3}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Materias disponibles (live desde vault_questions vía vault_list_subjects)
// ────────────────────────────────────────────────────────────────────────────

function AvailableSubjects() {
  const { subjects, loading } = useVaultSubjects("pca")

  if (loading) {
    return (
      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground py-6">
        <Loader2 className="h-4 w-4 animate-spin" /> Cargando materias disponibles…
      </div>
    )
  }

  if (subjects.length === 0) {
    return null // Nada cargado todavía — los tiles del roadmap explican qué viene
  }

  return (
    <section className="mt-10">
      {/* === SIMULACRO EXAMEN PCA (preguntas mezcladas de todas las materias) === */}
      <Link
        to="/app/pca/quiz/examen?module=pca&count=20"
        className="group relative overflow-hidden rounded-2xl border p-6 flex items-center gap-5 mb-8 transition-all hover:-translate-y-0.5 hover:shadow-md"
        style={{
          borderColor: "color-mix(in oklab, var(--av-blue-500) 35%, transparent)",
          background: "color-mix(in oklab, var(--av-blue-500) 5%, transparent)",
        }}
      >
        <div
          className="relative flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))" }}
        >
          <Award className="h-7 w-7 text-white" strokeWidth={1.8} />
        </div>
        <div className="relative flex-1 min-w-0">
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            Simulacro Examen PCA
          </div>
          <div className="mt-0.5 text-[19px] font-extrabold tracking-[-0.02em]">
            20 preguntas mezcladas de todas las materias
          </div>
          <div className="mt-0.5 text-[14px] text-muted-foreground">
            Como el examen real de Aerocivil · al terminar ves tu nota.
          </div>
        </div>
        <div
          className="relative hidden sm:flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-bold flex-shrink-0 text-white"
          style={{ background: "var(--av-blue-500)" }}
        >
          Empezar <ArrowRight className="h-4 w-4" />
        </div>
      </Link>

      <div className="mb-5 flex items-end justify-between">
        <div>
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            Estudiar por materia
          </div>
          <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
            Reforzá donde más te cuesta
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />Encriptado · revisado · sin spoilers
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s) => (
          <SubjectQuizCard
            key={s.subject_slug}
            slug={s.subject_slug}
            count={s.question_count}
          />
        ))}
      </div>
    </section>
  )
}

function SubjectQuizCard({ slug, count }: { slug: string; count: number }) {
  const meta = getSubjectMeta(slug)
  const color: SubjectColor = meta.color
  const Icon = meta.icon
  const quizCount = Math.min(10, count)
  // SubjectColor incluye 'red' que no está en TILE_COLOR — fallback a cyan
  const baseColor = (TILE_COLOR as Record<string, string>)[color] ?? TILE_COLOR.cyan

  return (
    <Link
      to={`/app/pca/quiz/${slug}?module=pca&count=${quizCount}`}
      className="card card-hover rounded-2xl border p-5 flex items-center gap-4 transition-all hover:-translate-y-0.5"
      style={{ borderColor: `color-mix(in oklab, ${baseColor} 28%, transparent)` }}
    >
      <div
        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: `color-mix(in oklab, ${baseColor} 14%, transparent)`,
          border: `1px solid color-mix(in oklab, ${baseColor} 30%, transparent)`,
          color: baseColor,
        }}
      >
        {Icon ? <Icon className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[16px] font-bold tracking-[-0.01em] truncate">{meta.name}</div>
        <div className="mt-0.5 inline-flex items-center gap-1 text-[13.5px] font-semibold" style={{ color: baseColor }}>
          Practicar <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  )
}
