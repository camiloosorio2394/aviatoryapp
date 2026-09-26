import { Link } from "react-router-dom"
import { ArrowRight, Library as LibraryIcon, Radar, RefreshCw, ShieldCheck, TriangleAlert } from "lucide-react"
import pcaFlightdeck from "@/assets/photos/pca-flightdeck.webp"
import { appButtonClass } from "@/lib/buttonStyles"
import { PanelDelExamen } from "@/components/pca/PanelDelExamen"
import { SubjectTable } from "@/components/pca/SubjectTable"
import { Indicadores, type Indicador } from "@/components/dashboard/Indicadores"
import { FilaDeAcceso } from "@/components/dashboard/AccesosDirectos"
import { Nota } from "@/components/dashboard/Nota"
import { useVaultSubjects } from "@/hooks/useVaultQuiz"
import { usePcaStats } from "@/hooks/usePcaStats"
import { getSubjectMeta, PCA_APROBADO } from "@/lib/vaultSubjects"
import { subjectFoto } from "@/lib/subjectFotos"
import { subjectSymbol } from "@/lib/subjectSymbols"

/**
 * Módulo Examen PCA, con el vocabulario del panel y de Ingreso a aerolínea.
 *
 * Era la última pantalla con el aire de antes: velo azul, título sin Archivo,
 * la cuenta atrás en un chip suelto, tres tarjetas con botones grandes para lo
 * que eran tres enlaces, y verde en las etiquetas «Oficial» y «Comunidad», que
 * no son aciertos de nada. Ahora usa las mismas piezas: el hero con su panel de
 * cristal, los indicadores del panel, las filas de acceso y los rótulos de
 * grupo en Archivo.
 *
 * El orden responde a las preguntas con las que se entra: cuándo es el examen y
 * qué hago hoy (el hero), cuánto llevo (los números), por dónde sigo
 * (continúa), qué materia toca (la tabla) y qué hay que saber del banco (al
 * pie, porque informa una vez y arriba sería ruido permanente).
 */

/** Rótulo de grupo: el mismo del panel y de la portada de Ingreso a aerolínea. */
const ROTULO =
  "nh-display m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"

const miles = new Intl.NumberFormat("es-CO")

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

  /**
   * Sin simulacros no hay cifra que dar: va un guion con lo que hace falta para
   * tenerla, nunca un cero, que el primer día se lee como un suspenso. El
   * dominio avisa en ámbar solo bajo el aprobado, y la nota dice por qué: un
   * color de alerta sin su motivo no sirve de nada.
   */
  const bajoElAprobado = stats?.mastery_pct != null && stats.mastery_pct < PCA_APROBADO
  const indicadores: Indicador[] = [
    {
      rotulo: "Cobertura del banco",
      valor: hasActivity ? String(coverage) : null,
      unidad: "%",
      nota:
        hasActivity && stats
          ? `${miles.format(stats.answered)} de ${miles.format(stats.bank_total)} preguntas`
          : `${miles.format(bankTotal)} preguntas en el banco`,
    },
    {
      rotulo: "Dominio",
      valor: stats?.mastery_pct != null ? String(stats.mastery_pct) : null,
      unidad: "%",
      nota:
        stats?.mastery_pct == null
          ? "Aparece con tu primer simulacro"
          : bajoElAprobado
            ? `Bajo el ${PCA_APROBADO} % para aprobar`
            : "Aciertos sobre las que viste",
      aviso: bajoElAprobado,
    },
    {
      rotulo: "Simulacros",
      valor: hasActivity && stats ? String(stats.sessions) : null,
      nota: stats?.avg_minutes ? `${stats.avg_minutes} min de media` : "Ninguno aún",
    },
    {
      rotulo: "Racha",
      valor: stats?.streak_days ? String(stats.streak_days) : null,
      unidad: stats?.streak_days === 1 ? "día" : "días",
      nota: stats?.streak_days ? "Días seguidos" : "Sin racha activa",
    },
  ]

  /**
   * Por dónde seguir: la materia que dejó a medias. Sin historial la tarjeta no
   * promete continuidad: propone la materia más grande del banco.
   */
  const siguiente = resume
    ? {
        rotulo: "Donde quedaste",
        slug: resume.slug,
        detalle: `${resume.answered} de ${resume.total} preguntas vistas`,
        pct: resumePct,
        to: `/app/pca/quiz/${resume.slug}?module=pca&count=${Math.min(10, resume.total)}`,
        cta: "Retomar",
      }
    : rows[0]
      ? {
          rotulo: "Por dónde empezar",
          slug: rows[0].slug,
          detalle: `La materia más grande del banco: ${rows[0].count} preguntas`,
          pct: null,
          to: `/app/pca/quiz/${rows[0].slug}?module=pca&count=${Math.min(10, rows[0].count)}`,
          cta: "Empezar",
        }
      : null

  return (
    <div className="notam-hub @container px-5 sm:px-8 py-6 sm:py-8 pb-16 max-w-[1600px] mx-auto">
      {/* El hero de las portadas de módulo: la foto bajo el velo navy, el
          titular en Archivo, la acción del día en su tarjeta de cristal y, a la
          derecha, el panel con la cuenta atrás, que se fija aquí mismo. */}
      <section className="relative overflow-hidden rounded-[18px] shadow-[0_1px_2px_rgba(11,27,48,0.08)]">
        <img
          src={pcaFlightdeck}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(8,20,36,.93) 0%, rgba(8,20,36,.82) 42%, rgba(8,20,36,.62) 72%, rgba(8,20,36,.48) 100%)",
          }}
        />

        <div className="relative grid gap-6 px-6 py-6 sm:px-10 sm:py-8 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,272px)] @4xl:gap-10">
          <div className="min-w-0 self-center">
            <div className="flex flex-wrap items-center gap-3">
              <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7FB2F2]">
                Módulo
              </span>
              <span className="hidden h-3 w-px bg-white/20 @md:block" aria-hidden />
              <span className="nh-display inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/78">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Banco oficial Aerocivil
              </span>
            </div>

            <h1 className="nh-display mt-3 text-[32px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[38px] @5xl:text-[44px]">
              Examen PCA
            </h1>
            <p className="mt-3 mb-0 max-w-[52ch] text-[15px] leading-[1.55] text-white/80">
              Entrena con las preguntas del examen oficial de Piloto Comercial de Avión.
            </p>

            {/* La única entrada al simulacro en toda la pantalla. */}
            <div className="mt-6 flex max-w-[560px] flex-col gap-4 rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.55)] p-4 backdrop-blur-[6px] @lg:flex-row @lg:items-center @lg:justify-between">
              <div className="min-w-0">
                <div className="nh-display text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7FB2F2]">
                  Simulacro
                </div>
                <div className="mt-1.5 text-[15px] font-semibold leading-snug text-white">
                  {examCount} preguntas de todas las materias
                </div>
                <div className="mt-0.5 text-[12.5px] text-white/78">
                  Mezcladas, con la explicación de cada respuesta
                </div>
              </div>
              <Link
                to={`/app/pca/quiz/examen?module=pca&count=${examCount}`}
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-white px-5 text-[13.5px] font-semibold text-[#0B1B30] transition-colors hover:bg-white/90 @lg:self-auto"
              >
                Comenzar simulacro
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>

          {statsLoading ? (
            <div
              className="h-[150px] self-start rounded-[14px] border border-white/15 bg-white/[0.06] animate-pulse @4xl:self-center"
              aria-hidden
            />
          ) : (
            <PanelDelExamen
              dias={stats?.days_to_exam ?? null}
              fechaExamen={stats?.target_date ?? null}
              onGuardar={(d) => setExamDate(d)}
            />
          )}
        </div>
      </section>

      <section className="mt-8" aria-labelledby="pca-numeros">
        <h2 id="pca-numeros" className={ROTULO}>
          Tus números
        </h2>
        <div className="mt-3">
          {statsLoading ? (
            <div className="h-[210px] rounded-2xl bg-muted animate-pulse @3xl:h-[114px]" aria-hidden />
          ) : (
            <Indicadores items={indicadores} />
          )}
        </div>
      </section>

      <section className="mt-8" aria-labelledby="pca-continua">
        <h2 id="pca-continua" className={ROTULO}>
          Sigue estudiando
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-4 @4xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          {statsLoading || subjectsLoading ? (
            <div className="h-[196px] rounded-2xl bg-muted animate-pulse" aria-hidden />
          ) : siguiente ? (
            <TarjetaSiguiente
              {...siguiente}
              foto={subjectFoto(siguiente.slug)}
              icon={subjectSymbol(siguiente.slug)}
            />
          ) : (
            <div className="flex flex-col justify-center rounded-2xl border border-dashed border-border p-5">
              <p className="m-0 text-[13.5px] text-muted-foreground">
                Cuando se abran las materias, aquí verás por dónde seguir.
              </p>
            </div>
          )}

          {/* El banco oficial se mudó a la Biblioteca. El enlace lleva a la
              CATEGORÍA del PCA y no al documento suelto: el día que haya más
              material del examen, ya está el sitio donde ponerlo. */}
          <div className="flex flex-col gap-3">
            <div className="flex-1">
              <FilaDeAcceso
                to="/app/biblioteca#pca"
                titulo="Bibliografía del PCA"
                detalle="El banco oficial de la Aerocivil completo, para consultar y verificar"
                icon={LibraryIcon}
              />
            </div>
            <div className="flex-1">
              <FilaDeAcceso
                to="/app/examenes"
                titulo="Qué cayó en el examen"
                detalle="Lo que reportan los pilotos que ya lo presentaron"
                icon={Radar}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="materias" className="mt-8 scroll-mt-6" aria-labelledby="pca-materias">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="pca-materias" className={ROTULO}>
            Materias
          </h2>
          {!subjectsLoading && !error && rows.length > 0 && (
            <span className="tabular text-[12.5px] text-muted-foreground">
              {rows.length} abiertas · {miles.format(bankTotal)} preguntas
            </span>
          )}
        </div>

        <div className="mt-3">
          {subjectsLoading ? (
            <div className="h-[420px] rounded-2xl bg-muted animate-pulse" aria-hidden />
          ) : error ? (
            <div className="rounded-2xl surface p-6 text-center">
              <p className="m-0 text-[15px] font-semibold text-foreground">No pudimos cargar las materias</p>
              <p className="m-0 mt-1 text-[13px] text-muted-foreground">
                La conexión con el banco falló. Inténtalo de nuevo.
              </p>
              <button
                type="button"
                onClick={reload}
                className={appButtonClass({ variant: "secondary" }, "mt-4 cursor-pointer")}
              >
                <RefreshCw className="h-4 w-4" aria-hidden /> Reintentar
              </button>
            </div>
          ) : rows.length === 0 ? (
            <div className="rounded-2xl surface p-6 text-center">
              <p className="m-0 text-[15px] font-semibold text-foreground">Todavía no hay materias abiertas</p>
              <Link to="/app/test-inicial" className={appButtonClass({ variant: "secondary" }, "mt-4")}>
                Hacer el test inicial <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          ) : (
            <SubjectTable rows={rows} enCurso={resume?.slug ?? null} />
          )}
        </div>
      </section>

      {/* Lo que hay que saber del banco, al pie. Informa una vez: arriba, con
          banda propia, sería ruido en la segunda visita. */}
      <section className="mt-8" aria-labelledby="pca-banco">
        <h2 id="pca-banco" className={ROTULO}>
          Sobre el banco
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-3 @3xl:grid-cols-2">
          <Nota
            icon={ShieldCheck}
            titulo="Preguntas verificadas contra Aerocivil"
            linea="Cada pregunta corresponde al documento oficial, y puedes comprobarlo."
            to="/app/biblioteca/banco-preguntas-pca"
            toLabel="Abrir el banco oficial"
          />
          <Nota
            icon={TriangleAlert}
            aviso
            titulo="El banco oficial tiene errores"
            linea="Te damos la respuesta técnica correcta y cuál marcar para aprobar."
          />
        </div>
      </section>
    </div>
  )
}

/**
 * Por dónde seguir: la materia, cuánto llevas de ella y un botón. Es la segunda
 * acción de la pantalla después del simulacro, así que su botón es el único
 * relleno fuera del hero.
 */
function TarjetaSiguiente({
  rotulo,
  slug,
  foto,
  icon: Simbolo,
  detalle,
  pct,
  to,
  cta,
}: {
  rotulo: string
  slug: string
  /** La misma miniatura que lleva la materia en la tabla; sin ella, el símbolo. */
  foto?: string
  icon: React.ComponentType<{ className?: string }>
  detalle: string
  /** `null` = todavía no se ha empezado: no hay barra que dibujar. */
  pct: number | null
  to: string
  cta: string
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl surface p-5">
      <span className="nh-display text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {rotulo}
      </span>
      <div className="mt-3 flex items-center gap-3">
        {foto ? (
          <img
            src={foto}
            alt=""
            width={124}
            height={84}
            decoding="async"
            className="h-[44px] w-[65px] shrink-0 rounded-lg object-cover"
          />
        ) : (
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-muted text-foreground">
            <Simbolo className="h-5 w-5" />
          </span>
        )}
        <div className="min-w-0">
          <div className="truncate text-[18px] font-semibold tracking-[-0.02em] text-foreground">
            {getSubjectMeta(slug).name}
          </div>
          <div className="mt-0.5 text-[12.5px] text-muted-foreground">{detalle}</div>
        </div>
      </div>
      <div className="mt-auto flex items-center gap-4 pt-5">
        {pct !== null ? (
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div
              className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-r-[3px] bg-muted"
              role="progressbar"
              aria-label={`Avance en ${getSubjectMeta(slug).name}`}
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="h-full rounded-r-[3px]" style={{ width: `${pct}%`, background: "var(--foreground)" }} />
            </div>
            <span className="tabular shrink-0 text-[12.5px] font-semibold text-muted-foreground">{pct} %</span>
          </div>
        ) : (
          <span className="flex-1" />
        )}
        <Link
          to={to}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-foreground px-5 text-[13.5px] font-semibold text-background transition-opacity hover:opacity-90"
        >
          {cta} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  )
}
