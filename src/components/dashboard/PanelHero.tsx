import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import heroFoto from "@/assets/photos/cta-cockpit-dawn.jpg"
import type { DailyQuizQuestion } from "@/components/dashboard/tipos"
import { daysUntil, DAILY_ACTION, FIRST_ACTION, greetingTime } from "@/components/dashboard/plan"

/**
 * La portada del panel, con la misma anatomía que la de Ingreso a aerolínea:
 * la foto a sangre bajo el velo navy, el titular en Archivo y el panel de
 * cristal con el avance a la derecha.
 *
 * Antes era otra pieza: velo azul, textura de radar encima y la cifra de avance
 * en un degradado dorado. Tres problemas en uno. El panel no se parecía a los
 * módulos a los que lleva; el ámbar en esta app significa alerta, así que el
 * número del que más se enorgullece un piloto se leía como un aviso; y la
 * textura competía con el texto.
 *
 * La cifra del avance es la cifra protagonista del panel —la única de este
 * tamaño en la pantalla— y va en cifras proporcionales: las tabulares dan a
 * cada dígito el ancho de un cero y un «78» grande se ve suelto.
 */
export function PanelHero({
  nombre,
  etapa,
  aerolineaObjetivo,
  fechaExamen,
  avance,
  diasDePrueba,
  icaoMedido,
  quizDiario,
}: {
  nombre: string
  etapa: string
  aerolineaObjetivo: string | null
  fechaExamen: string | null
  /** `null` = todavía no hay etapa, así que no hay avance que medir. */
  avance: number | null
  diasDePrueba: number | null
  icaoMedido: boolean
  quizDiario: DailyQuizQuestion[]
}) {
  /**
   * La acción del día. Sin nivel medido manda el test inicial, porque sin él el
   * resto del panel no tiene con qué calibrar; con nivel y quiz curado, el quiz
   * de hoy; si hoy no hay quiz curado, la práctica por materia, que siempre
   * existe. Nada de contadores inventados.
   */
  const accion = !icaoMedido
    ? {
        rotulo: "Empieza por aquí",
        titulo: "Tu test inicial: inglés ICAO y dos preguntas por materia",
        detalle: "Unos 15 minutos · te dice desde dónde partes",
        href: FIRST_ACTION.href,
        cta: "Hacer el test",
      }
    : quizDiario.length > 0
      ? {
          rotulo: "Quiz del día",
          titulo: `${quizDiario.length} pregunta${quizDiario.length !== 1 ? "s" : ""}${
            quizDiario[0]?.subject_name ? ` · empieza con ${quizDiario[0].subject_name}` : ""
          }`,
          detalle: "Se renueva mañana",
          href: DAILY_ACTION.href,
          cta: DAILY_ACTION.cta,
        }
      : {
          rotulo: "Práctica del día",
          titulo: "El banco por materia te espera",
          detalle: "Un quiz corto mantiene viva tu racha",
          href: "/app/pca",
          cta: "Practicar ahora",
        }

  const diasAlExamen = fechaExamen !== null ? daysUntil(fechaExamen) : null

  return (
    <section className="relative overflow-hidden rounded-[18px] shadow-[0_1px_2px_rgba(11,27,48,0.08)]">
      <img
        src={heroFoto}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center 27%" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(8,20,36,.92) 0%, rgba(8,20,36,.80) 42%, rgba(8,20,36,.58) 72%, rgba(8,20,36,.42) 100%)",
        }}
      />

      <div className="relative grid gap-6 px-6 py-6 sm:px-10 sm:py-8 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,288px)] @4xl:gap-10">
        <div className="min-w-0 self-center">
          <div className="flex flex-wrap items-center gap-3">
            <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7FB2F2]">
              Tu panel
            </span>
            <span className="hidden h-3 w-px bg-white/20 @md:block" aria-hidden />
            <span className="nh-display truncate text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
              {etapa}
              {aerolineaObjetivo ? ` · objetivo ${aerolineaObjetivo}` : ""}
            </span>
          </div>

          <h1 className="nh-display mt-3 text-[32px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[38px] @5xl:text-[44px]">
            {greetingTime()}, {nombre}
          </h1>

          {/* La acción del día, en la tarjeta de cristal que en la portada del
              módulo ocupa el video. Es la única del hero con botón: todo lo
              demás se retoma desde su tarjeta, más abajo. */}
          <div className="mt-6 flex max-w-[560px] flex-col gap-4 rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.55)] p-4 backdrop-blur-[6px] @lg:flex-row @lg:items-center @lg:justify-between">
            <div className="min-w-0">
              <div className="nh-display text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7FB2F2]">
                {accion.rotulo}
              </div>
              <div className="mt-1.5 text-[15px] font-semibold leading-snug text-white">{accion.titulo}</div>
              <div className="mt-0.5 text-[12.5px] text-white/60">{accion.detalle}</div>
            </div>
            <Link
              to={accion.href}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-white px-5 text-[13.5px] font-semibold text-[#0B1B30] transition-colors hover:bg-white/90 @lg:self-auto"
            >
              {accion.cta}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>

        {/* El panel de cristal de las portadas de módulo. Arriba la cifra que
            resume todo; debajo, en filas, lo que tiene fecha. */}
        <div className="self-start overflow-hidden rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.62)] backdrop-blur-[6px] @4xl:self-center">
          <div className="px-4 pb-4 pt-4">
            <div className="nh-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
              Tu avance a aerolínea
            </div>
            {avance === null ? (
              // Sin etapa no hay nada que medir: va la invitación a generarlo,
              // nunca un 0 % con la barra vacía, que el primer día se lee como
              // un suspenso.
              <Link
                to="/onboarding"
                className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
              >
                Dinos en qué etapa vas
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            ) : (
              <>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="nh-display text-[52px] font-bold leading-none tracking-[-0.04em] text-white">
                    {avance}
                  </span>
                  <span className="nh-display text-[24px] font-bold leading-none text-white/70">%</span>
                </div>
                <div
                  className="mt-3 h-1 overflow-hidden rounded-sm bg-white/15"
                  role="progressbar"
                  aria-valuenow={avance}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Tu avance a aerolínea"
                >
                  <div
                    className="h-full rounded-sm transition-[width]"
                    style={{ width: `${avance}%`, background: "var(--av-green-400)" }}
                  />
                </div>
              </>
            )}
          </div>

          {(diasAlExamen !== null || (diasDePrueba !== null && diasDePrueba > 0)) && (
            <dl className="m-0 border-t border-white/10 px-4 py-3 text-[12px] leading-[1.5]">
              {diasAlExamen !== null && (
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-white/55">Examen PCA</dt>
                  <dd className="m-0 font-semibold">
                    {diasAlExamen < 0 ? (
                      <Link to="/app/pca" className="text-white/85 underline decoration-white/30 underline-offset-2">
                        Ya pasó: fija otra fecha
                      </Link>
                    ) : (
                      // A dos semanas o menos pasa a ámbar, que aquí sí es un
                      // aviso: es el mismo umbral que usa la portada del PCA.
                      <span
                        className="tabular"
                        style={{ color: diasAlExamen <= 14 ? "var(--av-amber-400)" : "rgb(255 255 255 / 85%)" }}
                      >
                        {diasAlExamen === 0 ? "Es hoy" : `en ${diasAlExamen} día${diasAlExamen !== 1 ? "s" : ""}`}
                      </span>
                    )}
                  </dd>
                </div>
              )}
              {diasDePrueba !== null && diasDePrueba > 0 && (
                <div className="mt-1 flex items-baseline justify-between gap-3">
                  <dt className="text-white/55">Prueba gratuita</dt>
                  <dd className="tabular m-0 font-semibold text-white/85">
                    {diasDePrueba} día{diasDePrueba !== 1 ? "s" : ""}
                  </dd>
                </div>
              )}
            </dl>
          )}
        </div>
      </div>
    </section>
  )
}
