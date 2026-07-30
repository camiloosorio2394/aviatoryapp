import { Link } from "react-router-dom"
import {
  ArrowRight,
  FileText,
  PlayCircle,
  Radar,
  RefreshCw,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react"
import pcaFlightdeck from "@/assets/photos/pca-flightdeck.jpg"
import { AppLayout } from "@/components/layout/AppLayout"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { StatTile } from "@/components/pca/StatTile"
import { ModuleCard } from "@/components/pca/ModuleCard"
import { ExamCountdown } from "@/components/pca/ExamCountdown"
import { SubjectTable } from "@/components/pca/SubjectTable"
import { useVaultSubjects } from "@/hooks/useVaultQuiz"
import { usePcaStats } from "@/hooks/usePcaStats"
import { getSubjectMeta } from "@/lib/vaultSubjects"

/**
 * Módulo Examen PCA.
 *
 * El orden responde a las cuatro preguntas de entrada: cuándo es el examen y
 * qué hago (hero), cuánto llevo (indicadores), dónde continúo (tarjetas) y qué
 * materia toca (tabla). Los avisos bajan al pie: informan una vez y después
 * son ruido permanente si ocupan banda propia arriba.
 */
export function Pca() {
  const { stats, loading: statsLoading, setExamDate } = usePcaStats()
  const { subjects, loading: subjectsLoading, error, reload } = useVaultSubjects("pca")

  const bankTotal = stats?.bank_total ?? 0
  const examCount = Math.min(20, bankTotal || 20)
  const hasActivity = (stats?.sessions ?? 0) > 0
  const coverage =
    stats && stats.bank_total > 0 ? Math.round((stats.answered / stats.bank_total) * 100) : 0

  const resume = stats?.resume_slug
    ? stats.by_subject.find((s) => s.slug === stats.resume_slug)
    : undefined
  const resumePct =
    resume && resume.total > 0 ? Math.round((resume.answered / resume.total) * 100) : 0

  const rows = [...subjects]
    .map((s) => ({
      slug: s.subject_slug,
      count: s.question_count,
      answered: stats?.by_subject.find((x) => x.slug === s.subject_slug)?.answered ?? 0,
    }))
    .sort((a, b) => b.count - a.count)

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden rounded-xl mb-6">
          <img
            src={pcaFlightdeck}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgb(11 16 32 / 88%) 0%, color-mix(in oklab, var(--av-blue-500) 34%, rgb(11 16 32 / 86%)) 100%)",
            }}
          />

          <div className="relative p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[13px] text-white/70">
                  <ShieldCheck className="h-4 w-4" />
                  Banco oficial Aerocivil
                </div>
                <h1 className="mt-1.5 text-[32px] font-semibold tracking-[-0.03em] leading-[1.1] text-white">
                  Examen PCA
                </h1>
                <p className="mt-2 text-[15px] text-white/75 max-w-[52ch] leading-relaxed">
                  Entrena con las preguntas del examen oficial de Piloto Comercial de Avión.
                </p>
              </div>

              {!statsLoading && (
                <ExamCountdown
                  days={stats?.days_to_exam ?? null}
                  onSave={(d) => setExamDate(d)}
                />
              )}
            </div>

            {/* Única entrada al simulacro en toda la pantalla. */}
            <div className="mt-6">
              <Link
                to={`/app/pca/quiz/examen?module=pca&count=${examCount}`}
                className={appButtonClass({ size: "lg" })}
                style={appButtonStyle()}
              >
                Comenzar simulacro <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Indicadores ── */}
        {statsLoading ? (
          <div className="h-[104px] rounded-xl surface animate-pulse mb-6" />
        ) : hasActivity && stats ? (
          <section
            className="rounded-xl overflow-hidden mb-6 grid gap-px sm:grid-cols-2 lg:grid-cols-4"
            style={{ background: "var(--border)", border: "1px solid var(--border)" }}
          >
            <StatTile
              label="Cobertura del banco"
              value={coverage}
              suffix="%"
              hint={`${stats.answered} de ${stats.bank_total} preguntas`}
            />
            <StatTile
              label="Dominio"
              value={stats.mastery_pct}
              suffix="%"
              hint={stats.mastery_pct === null ? "Sin datos suficientes" : "Aciertos sobre vistas"}
              tone={stats.mastery_pct !== null && stats.mastery_pct < 70 ? "warn" : "success"}
            />
            <StatTile
              label="Simulacros"
              value={stats.sessions}
              hint={stats.avg_minutes ? `${stats.avg_minutes} min de media` : undefined}
            />
            <StatTile
              label="Racha"
              value={stats.streak_days || null}
              suffix="d"
              hint={stats.streak_days ? "Días seguidos" : "Sin racha activa"}
            />
          </section>
        ) : (
          <section className="surface rounded-xl px-5 py-4 mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <PlayCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <p className="text-[15px] text-muted-foreground">
                Tus indicadores aparecen cuando termines tu primer simulacro.
              </p>
            </div>
            <span className="tabular-nums text-[13px] text-muted-foreground flex-shrink-0">
              {bankTotal || "—"} preguntas disponibles
            </span>
          </section>
        )}

        {/* ── Accesos ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Retomar donde se dejó, con la materia real. Sin historial la
              tarjeta no promete continuidad: propone por dónde empezar. */}
          {resume ? (
            <ModuleCard
              icon={PlayCircle}
              title="Continuar donde quedaste"
              description={getSubjectMeta(resume.slug).name}
              to={`/app/pca/quiz/${resume.slug}?module=pca&count=${Math.min(10, resume.total)}`}
              cta="Retomar"
              progress={resumePct}
              meta={`${resume.answered} de ${resume.total}`}
            />
          ) : (
            <ModuleCard
              icon={PlayCircle}
              title="Empieza por la materia más grande"
              description={rows[0] ? getSubjectMeta(rows[0].slug).name : "Elige una materia abajo"}
              to={
                rows[0]
                  ? `/app/pca/quiz/${rows[0].slug}?module=pca&count=${Math.min(10, rows[0].count)}`
                  : "#materias"
              }
              cta="Empezar"
            />
          )}
          <ModuleCard
            icon={FileText}
            title="Banco oficial"
            description="El documento de Aerocivil completo, para consultar y verificar."
            to="/app/banco-oficial"
            cta="Abrir documento"
            badge="Oficial"
          />
          <ModuleCard
            icon={Radar}
            title="Qué cayó en el examen"
            description="Lo que reportan los pilotos que ya presentaron."
            to="/app/examenes"
            cta="Ver reportes"
            badge="Comunidad"
          />
        </div>

        {/* ── Materias ── */}
        <section id="materias" className="mb-8">
          <div className="flex items-baseline justify-between gap-3 mb-4">
            <h2 className="text-[20px] font-semibold tracking-[-0.02em]">Materias</h2>
            {!subjectsLoading && !error && (
              <span className="tabular-nums text-[13px] text-muted-foreground">
                {rows.length} abiertas · {bankTotal} preguntas
              </span>
            )}
          </div>

          {subjectsLoading ? (
            <div className="h-[320px] rounded-xl surface animate-pulse" />
          ) : error ? (
            <div className="surface rounded-xl p-6 text-center">
              <p className="text-[15px] font-semibold">No pudimos cargar las materias</p>
              <p className="mt-1 text-[13px] text-muted-foreground">
                La conexión con el banco falló. Inténtalo de nuevo.
              </p>
              <button
                type="button"
                onClick={reload}
                className={appButtonClass({ variant: "secondary" }, "mt-4 cursor-pointer")}
              >
                <RefreshCw className="h-4 w-4" /> Reintentar
              </button>
            </div>
          ) : rows.length === 0 ? (
            <div className="surface rounded-xl p-6 text-center">
              <p className="text-[15px] font-semibold">Todavía no hay materias abiertas</p>
              <Link
                to="/app/test-inicial"
                className={appButtonClass({ variant: "secondary" }, "mt-4")}
              >
                Hacer el test inicial <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <SubjectTable rows={rows} />
          )}
        </section>

        {/* ── Avisos, al pie ──
            Informan una vez. Arriba ocupaban una banda permanente para algo que
            deja de aportar en la segunda visita. */}
        <section className="grid gap-3 sm:grid-cols-2">
          <Alert
            icon={ShieldCheck}
            tone="success"
            title="Preguntas verificadas contra Aerocivil"
            line="Cada pregunta corresponde al documento oficial, y puedes comprobarlo."
          />
          <Alert
            icon={TriangleAlert}
            tone="warn"
            title="El banco oficial tiene errores"
            line="Te damos la respuesta técnica correcta y cuál marcar para aprobar."
          />
        </section>
      </div>
    </AppLayout>
  )
}

function Alert({
  icon: Icon,
  tone,
  title,
  line,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  tone: "success" | "warn"
  title: string
  line: string
}) {
  const color = tone === "warn" ? "var(--av-warn-fg)" : "var(--av-success-fg)"
  const tint = tone === "warn" ? "var(--av-amber-400)" : "var(--av-green-400)"

  return (
    <div
      className="rounded-xl px-4 py-3.5 flex items-start gap-3"
      style={{
        background: `color-mix(in oklab, ${tint} 8%, transparent)`,
        border: `1px solid color-mix(in oklab, ${tint} 22%, transparent)`,
      }}
    >
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color }} />
      <div className="min-w-0">
        <div className="text-[15px] font-semibold" style={{ color }}>
          {title}
        </div>
        <p className="mt-0.5 text-[13px] text-muted-foreground leading-snug">{line}</p>
      </div>
    </div>
  )
}
