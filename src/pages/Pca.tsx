import { Link } from "react-router-dom"
import {
  ArrowRight,
  Award,
  BookOpen,
  History,
  ListChecks,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  PlayCircle,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { SectionTitle } from "@/components/ui/section-title"
import { useVaultSubjects } from "@/hooks/useVaultQuiz"
import { getSubjectMeta } from "@/lib/vaultSubjects"
import { TILE_COLOR, tileBorder, tileTint, type TileColorKey } from "@/lib/tileColors"

/** Bajo este número de preguntas avisamos que el banco todavía es chico. */
const SMALL_BANK = 20

/**
 * Módulo Examen PCA Aerocivil — estudio por materia + simulacro del examen.
 */
export function Pca() {
  return (
    <AppLayout>
      <div className="px-5 sm:px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <PageHeader
          eyebrow={
            <>
              <Award className="h-3.5 w-3.5" /> Banco PCA Aerocivil
            </>
          }
          title="Estudia por materia, simula el examen"
          subtitle="El banco del examen Piloto Comercial de Avión de Aerocivil. Practica una materia para reforzar lo que te cuesta, o lanza un simulacro con preguntas mezcladas para medir qué tan listo estás."
          actions={
            <Link
              to="/app/exam-tracker"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-semibold surface hover:bg-muted transition-colors"
            >
              Ver Exam Tracker <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />

        {/* === MATERIAS DISPONIBLES (en vivo desde vault_questions) === */}
        <AvailableSubjects />

        <ComingNext />
      </div>
    </AppLayout>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Materias disponibles (live desde vault_questions vía vault_list_subjects)
// ────────────────────────────────────────────────────────────────────────────

function AvailableSubjects() {
  const { subjects, loading, error, reload } = useVaultSubjects("pca")

  if (loading) {
    return (
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[132px] rounded-2xl surface animate-pulse" />
        ))}
      </section>
    )
  }

  if (error) {
    return (
      <section className="rounded-2xl surface p-6 text-center">
        <div className="text-[16px] font-bold">No pudimos cargar las materias</div>
        <p className="mt-1.5 text-[14px] text-muted-foreground">
          La conexión con el banco de preguntas falló. Intenta de nuevo en un momento.
        </p>
        <button
          type="button"
          onClick={reload}
          className="mt-5 inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-xl text-sm font-semibold text-white border-0 cursor-pointer transition-transform hover:-translate-y-0.5"
          style={{ background: "var(--av-blue-500)" }}
        >
          <RefreshCw className="h-4 w-4" /> Reintentar
        </button>
      </section>
    )
  }

  if (subjects.length === 0) {
    return (
      <section className="rounded-2xl surface p-7 text-center">
        <div
          className="mx-auto flex items-center justify-center w-12 h-12 rounded-xl"
          style={{
            background: tileTint("blue"),
            border: `1px solid ${tileBorder("blue")}`,
            color: TILE_COLOR.blue,
          }}
        >
          <BookOpen className="h-6 w-6" strokeWidth={1.8} />
        </div>
        <h2 className="mt-4 text-[19px] font-bold tracking-[-0.02em]">
          El banco de preguntas se abre por materias
        </h2>
        <p className="mt-2 text-[14.5px] text-muted-foreground max-w-[440px] mx-auto leading-relaxed">
          Todavía no hay ninguna materia abierta en tu cuenta. Haz el test inicial para saber por dónde
          cuanto la primera esté lista.
        </p>
        <Link
          to="/app/test-inicial"
          className="mt-5 inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-xl text-sm font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
          style={{ background: "var(--av-blue-500)" }}
        >
          Hacer el test inicial <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    )
  }

  // Banco más grande primero: la escasez deja de ser una sorpresa al abrir el quiz.
  const ordered = [...subjects].sort(
    (a, b) =>
      b.question_count - a.question_count ||
      getSubjectMeta(a.subject_slug).name.localeCompare(getSubjectMeta(b.subject_slug).name),
  )
  const bankTotal = ordered.reduce((acc, s) => acc + s.question_count, 0)
  const examCount = Math.min(20, bankTotal)

  return (
    <section>
      {/* === SIMULACRO EXAMEN PCA (preguntas mezcladas de todas las materias) === */}
      <Link
        to={`/app/pca/quiz/examen?module=pca&count=${examCount}`}
        className="card-apple group relative overflow-hidden rounded-2xl border p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-8"
        style={{
          borderColor: tileBorder("blue", 35),
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
          <div className="mt-0.5 text-[18px] sm:text-[19px] font-extrabold tracking-[-0.02em]">
            {examCount} preguntas mezcladas de todas las materias
          </div>
          <div className="mt-0.5 text-[14px] text-muted-foreground">
            Como el examen real de Aerocivil: al terminar ves tu nota y qué materia repasar.
          </div>
        </div>
        <div
          className="relative inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-xl text-sm font-bold flex-shrink-0 text-white"
          style={{ background: "var(--av-blue-500)" }}
        >
          Empezar <ArrowRight className="h-4 w-4" />
        </div>
      </Link>

      <SectionTitle
        icon={BookOpen}
        eyebrow="Estudiar por materia"
        title="Refuerza donde más te cuesta"
        hint={`${ordered.length} materias abiertas · ${bankTotal} preguntas en total`}
        right={
          <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" /> Preguntas revisadas, sin spoilers
          </div>
        }
      />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((s) => (
          <SubjectQuizCard key={s.subject_slug} slug={s.subject_slug} count={s.question_count} />
        ))}
      </div>
    </section>
  )
}

function SubjectQuizCard({ slug, count }: { slug: string; count: number }) {
  const meta = getSubjectMeta(slug)
  const color: TileColorKey = meta.color
  const Icon = meta.icon
  const quizCount = Math.min(10, count)
  const isSmallBank = count < SMALL_BANK

  return (
    <Link
      to={`/app/pca/quiz/${slug}?module=pca&count=${quizCount}`}
      className="card-apple rounded-2xl border bg-card p-5 flex flex-col gap-3.5"
      style={{ borderColor: tileBorder(color) }}
    >
      <div className="flex items-start gap-3.5">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: tileTint(color),
            border: `1px solid ${tileBorder(color, 30)}`,
            color: TILE_COLOR[color],
          }}
        >
          {Icon ? <Icon className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[16px] font-bold tracking-[-0.01em]">{meta.name}</div>
          {meta.description && (
            <p className="mt-0.5 text-[13px] text-muted-foreground leading-snug line-clamp-2">
              {meta.description}
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="chip">{count} preguntas</span>
          <span className="chip">Quiz de {quizCount}</span>
          {isSmallBank && <span className="chip chip-amber">Banco chico</span>}
        </div>
        <span
          className="inline-flex items-center gap-1 text-[13.5px] font-semibold"
          style={{ color: TILE_COLOR[color] }}
        >
          Practicar <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Qué viene: solo lo que la base puede sostener cuando salga. Nada clickeable.
// ────────────────────────────────────────────────────────────────────────────

const COMING_NEXT: { icon: typeof ListChecks; color: TileColorKey; title: string; line: string }[] = [
  {
    icon: ListChecks,
    color: "blue",
    title: "Análisis por materia",
    line: "Al terminar un simulacro, en qué materia fallaste y qué quiz seguir.",
  },
  {
    icon: History,
    color: "violet",
    title: "Historial de simulacros",
    line: "Cada intento guardado para comparar tu progreso.",
  },
  {
    icon: ShieldCheck,
    color: "green",
    title: "Banco al día",
    line: "Actualizamos las preguntas cuando cambia la normativa.",
  },
]

function ComingNext() {
  return (
    <section className="mt-10">
      <SectionTitle
        eyebrow="Roadmap del módulo"
        title="Qué viene"
        hint="En construcción."
      />
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {COMING_NEXT.map((c) => (
          <div
            key={c.title}
            className="rounded-2xl surface p-4 flex items-start gap-3"
          >
            <div
              className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: tileTint(c.color), color: TILE_COLOR[c.color] }}
            >
              <c.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[14.5px] font-bold tracking-[-0.01em]">{c.title}</span>
                <span className="chip">Pronto</span>
              </div>
              <p className="mt-0.5 text-[13px] text-muted-foreground leading-snug">{c.line}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
