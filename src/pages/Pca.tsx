import { Link } from "react-router-dom"
import { ArrowRight, BookOpenCheck, RefreshCw, ShieldCheck, TriangleAlert } from "lucide-react"
import pcaFlightdeck from "@/assets/photos/pca-flightdeck.webp"
import { appButtonClass } from "@/lib/buttonStyles"
import { PanelDelExamen, type CifraDelPanel } from "@/components/pca/PanelDelExamen"
import { SubjectTable } from "@/components/pca/SubjectTable"
import { Nota } from "@/components/dashboard/Nota"
import { useVaultSubjects } from "@/hooks/useVaultQuiz"
import { usePcaStats } from "@/hooks/usePcaStats"
import { PCA_APROBADO } from "@/lib/vaultSubjects"

/**
 * Módulo Examen PCA, con el vocabulario del panel y de Ingreso a aerolínea.
 *
 * Era la última pantalla con el aire de antes: velo azul, título sin Archivo,
 * la cuenta atrás en un chip suelto, tres tarjetas con botones grandes para lo
 * que eran tres enlaces, y verde en las etiquetas «Oficial» y «Comunidad», que
 * no son aciertos de nada. Ahora usa las mismas piezas: el hero con su panel de
 * cristal, las filas de acceso y los rótulos de grupo en Archivo.
 *
 * El orden responde a las preguntas con las que se entra: cuándo es el examen,
 * cuánto llevo y qué hago hoy (el hero, con el simulacro y el banco oficial en
 * sus dos cuadrados y las cifras en pequeño bajo la fecha), qué materia toca
 * (la tabla) y qué hay que saber del banco (al pie, porque informa una vez y
 * arriba sería ruido permanente).
 *
 * Lo que hubo y Camilo quitó: una sección «Tus números» (cuatro datos que caben
 * en el panel) y una sección «Sigue estudiando» con la materia a medias y la
 * bibliografía; la materia a medias ya se ve en la tabla, con su «En curso», y
 * el banco subió al hero.
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

  // La materia que dejó a medias: la tabla la marca «En curso».
  const resume = stats?.resume_slug
    ? stats.by_subject.find((s) => s.slug === stats.resume_slug)
    : undefined

  const rows = [...subjects]
    .map((s) => ({
      slug: s.subject_slug,
      count: s.question_count,
      answered: stats?.by_subject.find((x) => x.slug === s.subject_slug)?.answered ?? 0,
    }))
    .sort((a, b) => b.count - a.count)

  /**
   * Las cuatro cifras, en las filas pequeñas del panel del hero. Sin simulacros
   * no hay cifra que dar: va un guion, nunca un cero, que el primer día se lee
   * como un suspenso. El dominio avisa en ámbar solo bajo el aprobado, y como
   * en una fila no cabe la nota, el motivo va en el propio rótulo: un color de
   * alerta sin su motivo no sirve de nada.
   */
  const bajoElAprobado = stats?.mastery_pct != null && stats.mastery_pct < PCA_APROBADO
  const cifras: CifraDelPanel[] = [
    { rotulo: "Cobertura del banco", valor: hasActivity ? `${coverage} %` : null },
    {
      rotulo: bajoElAprobado ? `Dominio (mínimo ${PCA_APROBADO} %)` : "Dominio",
      valor: stats?.mastery_pct != null ? `${stats.mastery_pct} %` : null,
      aviso: bajoElAprobado,
    },
    { rotulo: "Simulacros", valor: hasActivity && stats ? String(stats.sessions) : null },
    {
      rotulo: "Racha",
      valor: stats?.streak_days ? `${stats.streak_days} ${stats.streak_days === 1 ? "día" : "días"}` : null,
    },
  ]

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
            <p className="mt-3 mb-0 max-w-[64ch] text-[15px] leading-[1.55] text-white/80">
              Prepárate con las preguntas del examen oficial de Piloto Comercial de Avión de la Aeronáutica Civil de
              Colombia. Organizamos el banco de preguntas por materias para que estudies de forma enfocada, identifiques
              tus áreas de mejora y aproveches cada sesión de preparación para llegar mejor preparado al examen.
            </p>

            {/* Dos cuadrados de cristal, uno al lado del otro: la única entrada al
                simulacro en toda la pantalla, y el banco oficial completo en la
                Biblioteca. El botón blanco es solo el del simulacro; el del banco
                va en contorno, para que la jerarquía no cambie. */}
            <div className="mt-6 grid max-w-[760px] gap-4 @2xl:grid-cols-2">
              <div className="flex flex-col gap-4 rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.55)] p-4 backdrop-blur-[6px]">
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
                  className="mt-auto inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-white px-5 text-[13.5px] font-semibold text-[#0B1B30] transition-colors hover:bg-white/90"
                >
                  Comenzar simulacro
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>

              <div className="flex flex-col gap-4 rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.55)] p-4 backdrop-blur-[6px]">
                <div className="min-w-0">
                  <div className="nh-display text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7FB2F2]">
                    Banco oficial PCA
                  </div>
                  <div className="mt-1.5 text-[15px] font-semibold leading-snug text-white">
                    El documento completo de la Aerocivil
                  </div>
                  <div className="mt-0.5 text-[12.5px] text-white/78">
                    En la Biblioteca, para consultar y verificar cada pregunta
                  </div>
                </div>
                <Link
                  to="/app/biblioteca/banco-preguntas-pca"
                  className="mt-auto inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-white/25 bg-white/10 px-5 text-[13.5px] font-semibold text-white transition-colors hover:bg-white/20"
                >
                  <BookOpenCheck className="h-3.5 w-3.5" aria-hidden />
                  Abrir el banco
                </Link>
              </div>
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
              cifras={cifras}
            />
          )}
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
