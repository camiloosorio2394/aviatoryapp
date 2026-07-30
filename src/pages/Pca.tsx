import { Link } from "react-router-dom"
import {
  ArrowRight,
  Award,
  BookOpen,
  History,
  ListChecks,
  RefreshCw,
  ShieldCheck,
  FileText,
  PlayCircle,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { PageHeader } from "@/components/ui/page-header"
import { SectionTitle } from "@/components/ui/section-title"
import { useVaultSubjects } from "@/hooks/useVaultQuiz"
import { getSubjectMeta } from "@/lib/vaultSubjects"
import { tileBorder, type TileColorKey } from "@/lib/tileColors"

/** Bajo este número de preguntas avisamos que el banco todavía es chico. */
const SMALL_BANK = 20

/**
 * Módulo Examen PCA Aerocivil — estudio por materia + simulacro del examen.
 */
export function Pca() {
  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        <PageHeader
          eyebrow={
            <>
              <Award className="h-3.5 w-3.5" /> Banco oficial Aerocivil
            </>
          }
          title="Estudia con el banco oficial de Aerocivil"
          subtitle="Todas las preguntas provienen del banco que la Aeronáutica Civil utiliza en sus exámenes de conocimiento para la licencia de Piloto Comercial de Avión."
          actions={
            <Link
              to="/app/examenes"
              className={appButtonClass({ variant: "secondary" })}
            >
              Ver Exam Tracker <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />

        <OfficialBankNote />

        {/* === MATERIAS DISPONIBLES (en vivo desde vault_questions) === */}
        <AvailableSubjects />

        <ComingNext />
      </div>
    </AppLayout>
  )
}

/**
 * Cómo tratamos el banco oficial.
 *
 * Es el argumento de autoridad del módulo y el diferenciador real: ningún
 * competidor se hace cargo de los errores del banco.
 *
 * Va en su propio bloque y no en el subtítulo, donde 110 palabras no se leen.
 * Pero el texto se mantiene completo a propósito: aquí el detalle no sobra,
 * sostiene el argumento. Un piloto que está decidiendo si confiar en la app
 * quiere saber exactamente cómo se trata cada caso, y resumirlo en dos líneas
 * lo dejaba sonando a promesa vaga.
 */
function OfficialBankNote() {
  return (
    <section className="surface rounded-xl p-5 sm:p-6 mb-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <h2 className="text-[17px] font-semibold tracking-[-0.015em]">
              Qué hacemos cuando el banco oficial tiene errores
            </h2>
          </div>
          <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">
            El banco oficial contiene preguntas con respuestas técnicamente incorrectas. En esas
            preguntas Aviatory te muestra la explicación y la respuesta técnicamente correcta, y
            además te indica cuál debes seleccionar para aprobar el examen oficial de acuerdo con el
            banco vigente de la Aerocivil.
          </p>
          <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
            Así estudias con criterio técnico, que es lo que vas a necesitar volando, sin arriesgar
            el resultado del examen.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <h2 className="text-[17px] font-semibold tracking-[-0.015em]">
              Verifica cada pregunta contra la fuente
            </h2>
          </div>
          <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">
            Dentro de la aplicación encontrarás el banco de preguntas oficial completo en formato
            PDF. Puedes localizar cada pregunta, verificar la información y corroborar que el
            contenido de Aviatory corresponde exactamente al banco utilizado en el examen.
          </p>
          <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
            No tienes que creernos: puedes comprobarlo tú mismo, pregunta por pregunta.
          </p>
          <Link
            to="/app/banco-oficial"
            className={appButtonClass({ variant: "secondary" }, "mt-4")}
          >
            Abrir el banco oficial <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
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
          <div key={i} className="h-[132px] rounded-xl surface animate-pulse" />
        ))}
      </section>
    )
  }

  if (error) {
    return (
      <section className="rounded-xl surface p-6 text-center">
        <div className="text-[15px] font-semibold">No pudimos cargar las materias</div>
        <p className="mt-1.5 text-[13px] text-muted-foreground">
          La conexión con el banco de preguntas falló. Intenta de nuevo en un momento.
        </p>
        <button
          type="button"
          onClick={reload}
          className={appButtonClass({ size: "lg" }, "mt-5 cursor-pointer")}
          style={appButtonStyle()}
        >
          <RefreshCw className="h-4 w-4" /> Reintentar
        </button>
      </section>
    )
  }

  if (subjects.length === 0) {
    return (
      <section className="rounded-xl surface p-7 text-center">
        <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-lg border border-border bg-muted text-muted-foreground">
          <BookOpen className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-[20px] font-semibold tracking-[-0.02em]">
          El banco de preguntas se abre por materias
        </h2>
        <p className="mt-2 text-[15px] text-muted-foreground max-w-[440px] mx-auto leading-relaxed">
          Todavía no hay ninguna materia abierta en tu cuenta. Haz el test inicial y te decimos por
          dónde empezar.
        </p>
        <Link
          to="/app/test-inicial"
          className={appButtonClass({ size: "lg" }, "mt-5")}
          style={appButtonStyle()}
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
        className="surface-lift group relative overflow-hidden rounded-xl border p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-8"
        style={{
          borderColor: tileBorder("blue", 35),
          background: "color-mix(in oklab, var(--av-blue-500) 5%, transparent)",
        }}
      >
        <div
          className="relative flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ background: "var(--av-blue-500)" }}
        >
          <Award className="h-6 w-6 text-white" />
        </div>
        <div className="relative flex-1 min-w-0">
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            Simulacro Examen PCA
          </div>
          <div className="mt-0.5 text-[17px] sm:text-[20px] font-semibold tracking-[-0.02em]">
            {examCount} preguntas mezcladas de todas las materias
          </div>
          <div className="mt-0.5 text-[13px] text-muted-foreground">
            Como el examen real de Aerocivil: al terminar ves tu nota y qué materia repasar.
          </div>
        </div>
        <div className={appButtonClass({ size: "lg" }, "relative flex-shrink-0")} style={appButtonStyle()}>
          Empezar <ArrowRight className="h-4 w-4" />
        </div>
      </Link>

      <SectionTitle
        icon={BookOpen}
        eyebrow="Estudiar por materia"
        title="Refuerza donde más te cuesta"
        hint={`${ordered.length} materias abiertas · ${bankTotal} preguntas en total`}
        right={
          <div className="hidden md:flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <ShieldCheck className="h-4 w-4" /> Preguntas revisadas, sin spoilers
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

/**
 * Tarjeta de materia.
 *
 * Sin color por materia. Las 14 materias usaban 6 colores repartidos sin
 * criterio, con tres compartiendo el mismo: el color no identificaba nada, era
 * un mosaico decorativo. Y una materia salía en rojo, que en aviación
 * significa acción inmediata.
 *
 * Ahora el único color es el ámbar del banco corto, donde sí informa: avisa de
 * que esa materia todavía tiene pocas preguntas y dice cuántas faltan.
 */
function SubjectQuizCard({ slug, count }: { slug: string; count: number }) {
  const meta = getSubjectMeta(slug)
  const Icon = meta.icon
  const quizCount = Math.min(10, count)
  const isSmallBank = count < SMALL_BANK

  return (
    <Link
      to={`/app/pca/quiz/${slug}?module=pca&count=${quizCount}`}
      className="surface surface-lift rounded-xl p-5 flex flex-col gap-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border border-border bg-muted text-muted-foreground">
          {Icon ? <Icon className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-semibold tracking-[-0.01em]">{meta.name}</div>
          {meta.description && (
            <p className="mt-1 text-[13px] text-muted-foreground leading-snug line-clamp-2">
              {meta.description}
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="tabular-nums text-[20px] font-semibold tracking-[-0.02em]">
            {count}
            <span className="ml-1 text-[13px] font-normal text-muted-foreground">preguntas</span>
          </div>
          {isSmallBank ? (
            <div className="mt-1 text-[13px]" style={{ color: "var(--av-warn-fg)" }}>
              Banco corto: faltan {SMALL_BANK - count} para el mínimo
            </div>
          ) : (
            <div className="mt-1 text-[13px] text-muted-foreground">Quiz de {quizCount}</div>
          )}
        </div>
        <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-foreground flex-shrink-0">
          Practicar <ArrowRight className="h-4 w-4" />
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
            className="rounded-xl surface p-4 flex items-start gap-3"
          >
            <div
              className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
              
            >
              <c.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[15px] font-semibold tracking-[-0.01em]">{c.title}</span>
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
