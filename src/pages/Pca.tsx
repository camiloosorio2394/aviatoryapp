import { Link } from "react-router-dom"
import {
  ArrowRight,
  BookOpen,
  PlayCircle,
  Radar,
  RefreshCw,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { StatTile } from "@/components/pca/StatTile"
import { ModuleCard } from "@/components/pca/ModuleCard"
import { useVaultSubjects } from "@/hooks/useVaultQuiz"
import { usePcaStats } from "@/hooks/usePcaStats"
import { getSubjectMeta } from "@/lib/vaultSubjects"

/** Bajo este número de preguntas la materia se marca como banco corto. */
const SMALL_BANK = 20

/**
 * Módulo Examen PCA.
 *
 * Panel, no documento. La versión anterior abría con dos bloques de texto
 * explicando la política del banco: información correcta en el sitio
 * equivocado, porque quien entra ya decidió estudiar y lo que necesita es
 * saber dónde continuar.
 *
 * El orden responde a las cuatro preguntas de entrada: qué hago (hero con una
 * acción), cuánto llevo (indicadores), dónde continúo (tarjetas de módulo) y
 * qué debo saber (avisos, en dos líneas).
 *
 * Los indicadores solo aparecen cuando hay actividad que medir. Seis celdas en
 * blanco el primer día convierten el panel en una lista de lo que no has
 * hecho; en su lugar va la franja de arranque.
 */
export function Pca() {
  const { stats, loading: statsLoading } = usePcaStats()
  const { subjects, loading: subjectsLoading, error, reload } = useVaultSubjects("pca")

  const bankTotal = stats?.bank_total ?? 0
  const examCount = Math.min(20, bankTotal || 20)
  const hasActivity = (stats?.sessions ?? 0) > 0
  const coverage =
    stats && stats.bank_total > 0 ? Math.round((stats.answered / stats.bank_total) * 100) : 0

  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-6 sm:py-8 pb-12 max-w-[1280px] mx-auto">
        {/* ── Hero: una sola pregunta contestada, qué hago ahora ── */}
        <section className="mb-6">
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            Banco oficial Aerocivil
          </div>
          <h1 className="mt-1.5 text-[32px] font-semibold tracking-[-0.03em] leading-[1.1]">
            Examen PCA
          </h1>
          <p className="mt-2 text-[15px] text-muted-foreground max-w-[52ch] leading-relaxed">
            Entrena con las preguntas del examen oficial de Piloto Comercial de Avión.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to={`/app/pca/quiz/examen?module=pca&count=${examCount}`}
              className={appButtonClass({ size: "lg" })}
              style={appButtonStyle()}
            >
              Comenzar simulacro <ArrowRight className="h-4 w-4" />
            </Link>
            {hasActivity && (
              <Link to="#materias" className={appButtonClass({ variant: "secondary", size: "lg" })}>
                Continuar por materia
              </Link>
            )}
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

        {/* ── Avisos, en dos líneas ── */}
        <section className="grid gap-3 sm:grid-cols-2 mb-8">
          <Alert
            icon={ShieldCheck}
            tone="success"
            title="Preguntas verificadas contra Aerocivil"
            line="Puedes abrir el banco oficial y comprobar cada pregunta."
            to="/app/banco-oficial"
            cta="Ver fuente"
          />
          <Alert
            icon={TriangleAlert}
            tone="warn"
            title="El banco oficial tiene errores"
            line="Te damos la respuesta técnica correcta y cuál marcar para aprobar."
          />
        </section>

        {/* ── Módulos ── */}
        <div id="materias" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <ModuleCard
            icon={BookOpen}
            title="Banco por materia"
            description="Practica la materia que más te cuesta, en bloques cortos."
            to="#lista-materias"
            cta="Elegir materia"
            progress={hasActivity ? coverage : undefined}
            meta={stats ? `${stats.answered} de ${stats.bank_total} preguntas` : undefined}
          />
          <ModuleCard
            icon={PlayCircle}
            title="Simulacro"
            description="Preguntas mezcladas de todas las materias, como el examen real."
            to={`/app/pca/quiz/examen?module=pca&count=${examCount}`}
            cta="Comenzar"
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

        {/* ── Lista de materias ── */}
        <section id="lista-materias">
          <div className="flex items-baseline justify-between gap-3 mb-4">
            <h2 className="text-[20px] font-semibold tracking-[-0.02em]">Materias</h2>
            {!subjectsLoading && !error && (
              <span className="tabular-nums text-[13px] text-muted-foreground">
                {subjects.length} abiertas
              </span>
            )}
          </div>

          {subjectsLoading ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-[92px] rounded-xl surface animate-pulse" />
              ))}
            </div>
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
          ) : subjects.length === 0 ? (
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
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[...subjects]
                .sort((a, b) => b.question_count - a.question_count)
                .map((s) => (
                  <SubjectRow
                    key={s.subject_slug}
                    slug={s.subject_slug}
                    count={s.question_count}
                    answered={
                      stats?.by_subject.find((x) => x.slug === s.subject_slug)?.answered ?? 0
                    }
                  />
                ))}
            </div>
          )}
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
  to,
  cta,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  tone: "success" | "warn"
  title: string
  line: string
  to?: string
  cta?: string
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
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-semibold" style={{ color }}>
          {title}
        </div>
        <p className="mt-0.5 text-[13px] text-muted-foreground leading-snug">{line}</p>
        {to && cta && (
          <Link
            to={to}
            className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-foreground"
          >
            {cta} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </div>
  )
}

/** Fila de materia. Compacta a propósito: son hasta 14 y no compiten entre sí. */
function SubjectRow({ slug, count, answered }: { slug: string; count: number; answered: number }) {
  const meta = getSubjectMeta(slug)
  const Icon = meta.icon
  const quizCount = Math.min(10, count)
  const short = count < SMALL_BANK
  const pct = count > 0 ? Math.round((answered / count) * 100) : 0

  return (
    <Link
      to={`/app/pca/quiz/${slug}?module=pca&count=${quizCount}`}
      className="surface surface-lift rounded-xl p-4 flex items-center gap-3"
    >
      <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-muted text-muted-foreground flex-shrink-0">
        {Icon ? <Icon className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-semibold tracking-[-0.01em] truncate">{meta.name}</div>
        <div className="mt-0.5 flex items-center gap-2">
          <span className="tabular-nums text-[13px] text-muted-foreground">
            {count} preguntas
          </span>
          {short && (
            <span className="text-[13px]" style={{ color: "var(--av-warn-fg)" }}>
              banco corto
            </span>
          )}
        </div>
        {pct > 0 && (
          <div className="mt-2 h-1 rounded-full overflow-hidden bg-muted">
            <div
              className="h-full rounded-full"
              style={{ width: `${pct}%`, background: "var(--av-blue-500)" }}
            />
          </div>
        )}
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
    </Link>
  )
}
