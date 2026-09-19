import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  BookOpen,
  Mic,
  Headphones,
  Image as ImageIcon,
  ArrowRight,
  Clock,
  Check,
  ClipboardCheck,
  Gauge,
  Award,
  ChevronDown,
  Users,
} from "lucide-react"
import { useSession } from "@/hooks/useSession"
import {
  ICAO_PROGRESS_VACIO,
  fetchIcaoProgress,
  resumirInterview,
  resumirSimulacro,
  resumirVocabulario,
  type IcaoProgress,
  type SeccionResumen,
} from "@/lib/icaoProgress"
import { TEA_PART1_SETS, TEA_PART1_TOTAL } from "@/lib/icaoInterview"
import {
  INTERACTIVE_ITEMS,
  LONG_AUDIOS,
  SHORT_AUDIO_TOTAL,
} from "@/lib/icaoComprehension"
import { PART3_TASK_STEPS, PICTURE_PAIRS } from "@/lib/icaoPictures"
import { FilaDeAcceso } from "@/components/dashboard/AccesosDirectos"
import heroPhoto from "@/assets/photos/icao-night-cockpit.webp"

/**
 * Módulo Inglés ICAO, estructurado según el examen TEA (Test of English for
 * Aviation, Mayflower College), con el vocabulario del panel y del PCA.
 *
 * Tenía el aire de antes: el título en degradado dorado —el dorado es ámbar,
 * el color de los avisos— repitiendo el rótulo que llevaba encima, un color
 * distinto por sección (cian, azul, violeta, verde) que no significaba nada y
 * que como texto sobre blanco no llegaba al contraste, y tres cajas tintadas
 * de azul seguidas compitiendo entre sí. Ahora usa las mismas piezas: el hero
 * con su panel de cristal, tarjetas neutras y los rótulos de grupo en Archivo.
 *
 * El orden: qué hago hoy y en qué nivel estoy (el hero), las cuatro partes (la
 * navegación real), ponerse a prueba (el simulacro, que es de donde sale el
 * nivel) y la referencia plegada, para que la teoría no compita con la
 * navegación.
 *
 * La pantalla lee el avance real y ordena por él: primero lo que quedó a
 * medias, después lo que no se ha tocado y de último lo terminado. Comprensión
 * y descripción de imágenes todavía no guardan nada: no se les pinta un 0 %,
 * se les pinta lo que hay dentro, con las cifras del propio contenido.
 */

/** Rótulo de grupo: el mismo del panel, del PCA y de Ingreso a aerolínea. */
const ROTULO =
  "nh-display m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"

/** El mínimo legal para volar comercial internacional. */
const NIVEL_MINIMO = 4

export function Icao() {
  const { user, isLoading: sessionLoading } = useSession()
  const [progreso, setProgreso] = useState<IcaoProgress>(ICAO_PROGRESS_VACIO)
  const [hidratado, setHidratado] = useState(false)

  // Sin sesión no hay nada que esperar: las tarjetas enseñan su contenido.
  const loading = sessionLoading || (Boolean(user) && !hidratado)

  useEffect(() => {
    if (sessionLoading || !user) return
    let cancelado = false
    void (async () => {
      const p = await fetchIcaoProgress()
      if (cancelado) return
      setProgreso(p)
      setHidratado(true)
    })()
    return () => {
      cancelado = true
    }
  }, [user, sessionLoading])

  const secciones: Seccion[] = useMemo(() => {
    const vocabulario = resumirVocabulario(progreso)
    const interview = resumirInterview(progreso)

    const lista: Seccion[] = [
      {
        to: "/app/icao/vocabulario",
        icon: BookOpen,
        part: "Base",
        title: "Vocabulario",
        // Las cifras salen de la base: si el glosario crece, la promesa de la
        // tarjeta crece con él en vez de quedarse en un "cerca de 350".
        meta:
          progreso.vocabularioTotal > 0
            ? `${progreso.vocabularioTotal} términos · ${progreso.quizTotal} preguntas de quiz`
            : "Glosario por categorías, con buscador y quiz",
        description:
          "Los términos de inglés aeronáutico con buscador, agrupados por categoría. Es la base de todo lo demás e incluye un quiz para ponerte a prueba.",
        cta: "Abrir el glosario",
        secondary: { to: "/app/icao/quiz", label: "Quiz", icon: ClipboardCheck },
        resumen: vocabulario,
      },
      {
        to: "/app/icao/interview",
        icon: Mic,
        part: "TEA · Parte 1",
        title: "Entrevista",
        meta: `${TEA_PART1_TOTAL} preguntas · ${TEA_PART1_SETS.length} sets · respuestas modelo`,
        description:
          "La sección Interview: las preguntas que hace el examinador sobre tu rol y sobre aviación. Respondes hablando y te queda la transcripción al lado.",
        cta: "Practicar la entrevista",
        resumen: interview,
      },
      {
        to: "/app/icao/comprension",
        icon: Headphones,
        part: "TEA · Parte 2",
        title: "Comprensión interactiva",
        meta: `${SHORT_AUDIO_TOTAL} clips cortos · ${LONG_AUDIOS.length} largos · ${INTERACTIVE_ITEMS.length} interactivos`,
        description:
          "La sección Interactive Comprehension: escuchas situaciones no rutinarias y reaccionas. Bloques 2A cortos, 2B largos y 2C interactivos, con audios reales.",
        cta: "Practicar comprensión",
        resumen: {
          pct: null,
          estado: `${SHORT_AUDIO_TOTAL + LONG_AUDIOS.length + INTERACTIVE_ITEMS.length} audios reales para escuchar`,
        },
      },
      {
        to: "/app/icao/picture-description",
        icon: ImageIcon,
        part: "TEA · Parte 3",
        title: "Descripción de imágenes",
        meta: `${PICTURE_PAIRS.length} pares de imágenes · ${PART3_TASK_STEPS.length} pasos por par`,
        description:
          "Pares de imágenes reales: describes, comparas, identificas riesgos, especulas causas, das tu opinión y conversas sobre el tema.",
        cta: "Practicar la Parte 3",
        resumen: {
          pct: null,
          estado: `${PICTURE_PAIRS.length} pares para describir y comparar`,
        },
      },
    ]

    // Primero lo que está a medias, después lo que no se ha tocado y de último
    // lo terminado. Sin avance conocido cuenta como no empezado: no se premia
    // ni se castiga lo que no sabemos.
    const grupo = (s: Seccion) => {
      const p = s.resumen.pct
      if (p === null || p === 0) return 1
      return p >= 100 ? 2 : 0
    }
    return lista
      .map((s, i) => ({ s, i }))
      .sort((a, b) => grupo(a.s) - grupo(b.s) || (b.s.resumen.pct ?? 0) - (a.s.resumen.pct ?? 0) || a.i - b.i)
      .map(({ s }) => s)
  }, [progreso])

  // El único botón principal: retomar donde ibas, o entrar a la primera si
  // todavía no empezaste nada.
  const enCurso = secciones.find((s) => s.resumen.pct !== null && s.resumen.pct > 0 && s.resumen.pct < 100)
  const continuar = enCurso ?? secciones[0]
  const simulacro = resumirSimulacro(progreso)

  return (
    <div className="notam-hub @container px-5 sm:px-8 py-6 sm:py-8 pb-16 max-w-[1600px] mx-auto">
      {/* El hero de las portadas de módulo: la foto bajo el velo navy, el
          titular en Archivo, la acción del día en su tarjeta de cristal y, a la
          derecha, el panel con el nivel. Antes el título iba en degradado
          dorado, que es ámbar, el color de los avisos, y repetía el rótulo que
          llevaba encima. */}
      <section className="relative overflow-hidden rounded-[18px] shadow-[0_1px_2px_rgba(11,27,48,0.08)]">
        <img
          src={heroPhoto}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 45%" }}
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
                <Clock className="h-3.5 w-3.5" aria-hidden /> Examen TEA · 25 a 30 minutos
              </span>
            </div>

            <h1 className="nh-display mt-3 text-[32px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[38px] @5xl:text-[44px]">
              Inglés ICAO
            </h1>
            <p className="mt-3 mb-0 max-w-[58ch] text-[15px] leading-[1.55] text-white/85">
              Organizado como el <strong className="font-semibold text-white">Test of English for Aviation</strong>: cuatro
              partes para lo único que mide el examen, <strong className="font-semibold text-white">hablar y comprender</strong>{" "}
              inglés en contexto aeronáutico.
            </p>

            {/* Retomar la parte a medias, o empezar por la primera. */}
            <div className="mt-6 flex max-w-[560px] flex-col gap-4 rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.55)] p-4 backdrop-blur-[6px] @lg:flex-row @lg:items-center @lg:justify-between">
              {loading ? (
                <span className="block h-[58px] w-full animate-pulse rounded-lg bg-white/10" aria-hidden />
              ) : (
                <>
                  <div className="min-w-0">
                    <div className="nh-display text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7FB2F2]">
                      {enCurso ? "Sigue donde ibas" : "Empieza por aquí"}
                    </div>
                    <div className="mt-1.5 text-[15px] font-semibold leading-snug text-white">{continuar.title}</div>
                    <div className="mt-0.5 text-[12.5px] text-white/78">{continuar.resumen.estado}</div>
                  </div>
                  <Link
                    to={continuar.to}
                    className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-white px-5 text-[13.5px] font-semibold text-[#0B1B30] transition-colors hover:bg-white/90 @lg:self-auto"
                  >
                    {enCurso ? "Seguir" : "Empezar"}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </>
              )}
            </div>
          </div>

          <PanelDeNivel cargando={loading} mejorNivel={progreso.mejorNivel} simulacros={progreso.simulacros} />
        </div>
      </section>

      <section className="mt-8" aria-labelledby="icao-partes">
        <h2 id="icao-partes" className={ROTULO}>
          Las cuatro partes
        </h2>
        {/* Cuatro tarjetas: dos columnas en tableta, cuatro cuando hay sitio.
            Nunca tres, que con cuatro deja una huérfana. */}
        <div className="mt-3 grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
          {secciones.map((s) => (
            <TarjetaParte
              key={s.title}
              {...s}
              enCurso={Boolean(enCurso) && s.title === enCurso?.title}
              cargando={loading}
            />
          ))}
        </div>
      </section>

      <section className="mt-8" aria-labelledby="icao-prueba">
        <h2 id="icao-prueba" className={ROTULO}>
          Ponte a prueba
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-4 @4xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          {/* El simulacro: de aquí sale el nivel del panel de arriba. No se
              auto-declara, se evalúa. */}
          <div className="flex h-full flex-col rounded-2xl surface p-5">
            <span className="nh-display text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Examen completo
            </span>
            <div className="mt-3 flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-muted text-foreground">
                <Award className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <div className="text-[18px] font-semibold tracking-[-0.02em] text-foreground">Simulacro TEA</div>
                <div className="mt-0.5 text-[12.5px] text-muted-foreground">
                  {loading ? "Cargando tu historial" : simulacro.estado}
                </div>
              </div>
            </div>
            <p className="m-0 mt-3 max-w-[62ch] text-[13.5px] leading-relaxed text-muted-foreground">
              Las tres partes seguidas, cronometradas y con audios reales. Te grabas, respondes en voz alta y al final te
              autoevalúas con los seis descriptores.
            </p>
            <div className="mt-auto flex justify-end pt-5">
              <Link
                to="/app/icao/simulacro"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-5 text-[13.5px] font-semibold text-background transition-opacity hover:opacity-90"
              >
                Hacer el simulacro <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="flex h-full flex-col rounded-2xl surface p-5">
            <span className="nh-display text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Consejo de práctica
            </span>
            <div className="mt-3 text-[16px] font-semibold tracking-[-0.01em] text-foreground">
              Practica en voz alta y grábate
            </div>
            <p className="m-0 mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
              El TEA es oral. Leer las respuestas no alcanza: respóndelas en voz alta, grábate con el celular y escúchate
              después. Es lo más incómodo y lo que más rápido sube tu nivel.
            </p>
            <div className="mt-auto pt-4">
              <FilaDeAcceso
                to="/app/comunidad"
                titulo="Comunidad #icao"
                detalle="Pide comentarios y practica con otros pilotos"
                icon={Users}
              />
            </div>
          </div>
        </div>
      </section>

      <ReferenceBlock />
    </div>
  )
}

/**
 * El panel de cristal: el mejor nivel en un simulacro, que es de donde sale el
 * nivel en esta app. Sin simulacro no se inventa ninguno. Bajo el 4 va en
 * ámbar, porque el 4 es el mínimo legal para volar comercial internacional: ahí
 * sí es un aviso, y la fila de abajo dice cuál es el mínimo.
 */
function PanelDeNivel({
  cargando,
  mejorNivel,
  simulacros,
}: {
  cargando: boolean
  mejorNivel: number | null
  simulacros: number
}) {
  return (
    <div className="self-start overflow-hidden rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.62)] backdrop-blur-[6px] @4xl:self-center">
      <div className="px-4 pb-4 pt-4">
        <div className="nh-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/72">
          Tu nivel ICAO
        </div>
        {cargando ? (
          <div className="mt-2.5 h-12 w-20 animate-pulse rounded bg-white/15" aria-hidden />
        ) : mejorNivel === null ? (
          <>
            <p className="m-0 mt-2 text-[14px] leading-snug text-white/85">
              Sale del simulacro: preséntalo y aquí verás tu nivel.
            </p>
            <Link
              to="/app/icao/simulacro"
              className="mt-3 inline-flex h-9 items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/20"
            >
              Hacer el simulacro <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </>
        ) : (
          <div className="mt-1 flex items-baseline gap-2">
            <span
              className="nh-display text-[52px] font-bold leading-none tracking-[-0.04em]"
              style={{ color: mejorNivel < NIVEL_MINIMO ? "var(--av-amber-400)" : "#fff" }}
            >
              {mejorNivel}
            </span>
            <span className="text-[13px] font-semibold text-white/78">mejor simulacro</span>
          </div>
        )}
      </div>
      {!cargando && (
        <dl className="m-0 border-t border-white/10 px-4 py-3 text-[12px] leading-[1.5]">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/72">Mínimo para aerolínea</dt>
            <dd className="tabular m-0 font-semibold text-white/90">ICAO {NIVEL_MINIMO}</dd>
          </div>
          <div className="mt-1 flex items-baseline justify-between gap-3">
            <dt className="text-white/72">Simulacros</dt>
            <dd className="tabular m-0 font-semibold text-white/90">{simulacros > 0 ? simulacros : "Ninguno aún"}</dd>
          </div>
        </dl>
      )}
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Una parte del módulo
// ────────────────────────────────────────────────────────────────────────────
interface Seccion {
  to: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  part: string
  title: string
  /** Cuánto contenido hay dentro, con cifras reales. */
  meta: string
  description: string
  cta: string
  secondary?: { to: string; label: string; icon: React.ComponentType<{ className?: string }> }
  resumen: SeccionResumen
}

/**
 * Tarjeta neutra: el color de cada parte era decoración, y como texto no
 * llegaba al contraste. Lo que la distingue es su icono y su nombre. «Completa»
 * sí va en verde, como el «Listo» de los módulos: ahí el verde dice algo.
 *
 * El enlace principal cubre la tarjeta entera con un ::after; el secundario (el
 * quiz del vocabulario) va por encima con z-10. Un enlace dentro de otro no es
 * HTML válido, y así los dos funcionan.
 */
function TarjetaParte({
  to,
  icon: Icon,
  part,
  title,
  meta,
  description,
  cta,
  secondary,
  resumen,
  enCurso,
  cargando,
}: Seccion & { enCurso: boolean; cargando: boolean }) {
  const completa = resumen.pct !== null && resumen.pct >= 100
  return (
    <div className="group relative flex h-full flex-col rounded-2xl surface surface-lift p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>
        {completa ? (
          <span className="chip chip-green">Completa</span>
        ) : enCurso ? (
          <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-semibold text-foreground">
            En curso
          </span>
        ) : null}
      </div>

      <span className="nh-display mt-4 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {part}
      </span>
      <h3 className="m-0 mt-1 text-[17px] font-semibold tracking-[-0.02em] text-foreground">
        <Link to={to} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
          {title}
        </Link>
      </h3>
      <div className="mt-1 text-[12px] font-medium text-muted-foreground">{meta}</div>
      <p className="m-0 mt-2 text-[13px] leading-relaxed text-muted-foreground">{description}</p>

      {/* El pie: el estado y, si hay avance, su barra. Una barra vacía diría
          «vas perdiendo» cuando lo que pasa es que todavía no empezaste. */}
      <div className="mt-auto pt-4">
        <div className="border-t border-border pt-3">
          {cargando ? (
            <span className="block h-4 w-32 animate-pulse rounded bg-muted" aria-hidden />
          ) : (
            <>
              {resumen.pct !== null && resumen.pct > 0 && (
                <div
                  className="mb-2 h-1.5 overflow-hidden rounded-r-[3px] bg-muted"
                  role="progressbar"
                  aria-label={`Avance de ${title}`}
                  aria-valuenow={resumen.pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-r-[3px] transition-[width]"
                    style={{ width: `${resumen.pct}%`, background: "var(--foreground)" }}
                  />
                </div>
              )}
              <p className="m-0 text-[12px] leading-snug text-muted-foreground">{resumen.estado}</p>
            </>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-foreground">
            {cta} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
          {secondary && (
            <Link
              to={secondary.to}
              className="relative z-10 inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[12px] font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <secondary.icon className="h-3.5 w-3.5" aria-hidden /> {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// BLOQUE DE REFERENCIA: qué es el TEA · los 6 descriptores · niveles 4 y 5
// ────────────────────────────────────────────────────────────────────────────
function ReferenceBlock() {
  const [open, setOpen] = useState(false)
  return (
    <section className="mt-8" aria-labelledby="icao-referencia">
      <h2 id="icao-referencia" className={ROTULO}>
        Referencia
      </h2>
      <div className="mt-3 overflow-hidden rounded-2xl surface">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-muted/40"
        >
          <div className="min-w-0">
            <div className="text-[16px] font-semibold tracking-[-0.01em] text-foreground">
              Qué es el TEA y cómo se califica
            </div>
            <p className="m-0 mt-0.5 text-[13px] text-muted-foreground">
              Estructura, duración, los seis descriptores ICAO y qué piden los niveles 4 y 5.
            </p>
          </div>
          <ChevronDown
            className="h-4.5 w-4.5 shrink-0 text-muted-foreground transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            aria-hidden
          />
        </button>

        {open && (
          <div className="border-t border-border p-5 sm:p-6">
            {/* Qué es el examen */}
            <div className="grid gap-6 @4xl:grid-cols-[1.4fr_1fr]">
              <div>
                <h3 className="m-0 text-[17px] font-semibold tracking-[-0.01em] text-foreground">
                  Test of English for Aviation
                </h3>
                <p className="m-0 mt-2 text-[15px] leading-relaxed text-foreground/90">
                  El TEA es un examen diseñado por <strong className="text-foreground">Mayflower College</strong> para
                  evaluar el nivel de inglés de pilotos y controladores frente a los requisitos lingüísticos de la OACI.
                  Evalúa <strong className="text-foreground">solo hablar y escuchar</strong>, en contexto aeronáutico:{" "}
                  <strong className="text-foreground">no evalúa conocimiento técnico ni fraseología estándar</strong>.
                </p>
                <p className="m-0 mt-3 text-[15px] leading-relaxed text-foreground/90">
                  La entrevista de la Parte 1 evalúa si puedes sostener una conversación espontánea en inglés natural,
                  técnico y profesional. Las partes siguientes miden tu comprensión auditiva y tu capacidad de
                  describir, comparar y dar opiniones.
                </p>
              </div>

              <div className="rounded-2xl bg-muted/60 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-foreground" aria-hidden />
                  <div className="text-[13px] font-semibold text-foreground">Duración total: 25 a 30 minutos</div>
                </div>
                <ul className="m-0 list-none space-y-2.5 p-0">
                  <FactRow label="Parte 1 · Interview" detail="7 a 8 minutos, conversación sobre tu rol" />
                  <FactRow label="Parte 2 · Comprensión" detail="audios de situaciones no rutinarias" />
                  <FactRow label="Parte 3 · Imágenes y conversación" detail="describir, comparar y opinar" />
                </ul>
                <div className="mt-4 border-t border-border pt-3 text-[13px] leading-relaxed text-muted-foreground">
                  Solo mide <strong className="text-foreground">hablar y escuchar</strong>. No hay parte escrita ni
                  preguntas técnicas de aviación.
                </div>
              </div>
            </div>

            {/* Los 6 descriptores */}
            <div className="mt-8">
              <h3 className="m-0 text-[17px] font-semibold tracking-[-0.01em] text-foreground">Los seis descriptores ICAO</h3>
              <p className="m-0 mt-1.5 max-w-[760px] text-[15px] text-muted-foreground">
                El TEA califica seis descriptores.{" "}
                <strong className="text-foreground">Tu resultado final es tu descriptor más bajo</strong>: si sacas 5 en
                cinco de ellos y 4 en comprensión, tu resultado oficial es ICAO 4. Ser bueno en algunos no alcanza:
                tienes que subirlos todos.
              </p>
              <div className="mt-4 grid gap-2.5 @xl:grid-cols-2 @4xl:grid-cols-3">
                {DESCRIPTORS.map((d) => (
                  <div key={d.name} className="rounded-xl border border-border p-4">
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-muted-foreground" aria-hidden />
                      <div className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">{d.name}</div>
                    </div>
                    <p className="m-0 mt-1 text-[13px] leading-snug text-muted-foreground">{d.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Niveles 4 y 5 */}
            <div className="mt-8">
              <h3 className="m-0 text-[17px] font-semibold tracking-[-0.01em] text-foreground">Qué piden los niveles 4 y 5</h3>
              <div className="mt-4 grid gap-4 @3xl:grid-cols-2">
                <LevelPanel
                  level={4}
                  title="Operational"
                  blurb="El mínimo legal para volar comercial internacional. Tienes que llegar a 4 en TODOS los descriptores."
                  traits={[
                    "Sostiene conversaciones sobre temas operacionales",
                    "Entiende casi toda la comunicación rutinaria y muchas situaciones no rutinarias",
                    "Comete algunos errores gramaticales, pero rara vez afectan la comunicación",
                    "Tiene vocabulario suficiente para explicar problemas y pedir ayuda",
                    "Habla con fluidez razonable y puede pedir aclaraciones",
                  ]}
                />
                <LevelPanel
                  level={5}
                  title="Extended"
                  blurb="El nivel objetivo para una carrera en aerolínea. Mínimo 5 en TODOS los descriptores."
                  traits={[
                    "Habla con mucha soltura y confianza",
                    "Usa estructuras gramaticales variadas y comete muy pocos errores",
                    "Maneja vocabulario amplio y preciso",
                    "Entiende casi todo, incluso acentos y situaciones complejas",
                    "Interactúa de forma espontánea y necesita muy pocas repeticiones",
                  ]}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
function FactRow({ label, detail }: { label: string; detail: string }) {
  return (
    <li className="flex items-start gap-2">
      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground" strokeWidth={3} aria-hidden />
      <div>
        <div className="text-[13px] font-semibold leading-tight text-foreground">{label}</div>
        <div className="text-[13px] leading-tight text-muted-foreground">{detail}</div>
      </div>
    </li>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// DESCRIPTORES + NIVELES
// ────────────────────────────────────────────────────────────────────────────
const DESCRIPTORS: { name: string; detail: string }[] = [
  { name: "Pronunciation", detail: "Pronunciación clara y fácil de entender." },
  { name: "Structure", detail: "Gramática correcta y construcción de las oraciones." },
  { name: "Vocabulary", detail: "Amplitud y precisión del vocabulario, aeronáutico y general." },
  { name: "Fluency", detail: "Hablar de forma continua y natural, con pocas pausas innecesarias." },
  { name: "Comprehension", detail: "Entender los mensajes hablados, incluso con acentos o situaciones inesperadas." },
  { name: "Interactions", detail: "Sostener la conversación, responder, pedir aclaraciones y manejar el intercambio." },
]

/** Cada nivel en su tarjeta neutra: la cifra grande lo identifica, no un color. */
function LevelPanel({ level, title, blurb, traits }: { level: number; title: string; blurb: string; traits: string[] }) {
  return (
    <div className="rounded-2xl border border-border p-5">
      <div className="flex items-baseline gap-3">
        <div className="nh-display text-[40px] font-bold leading-none tracking-[-0.04em] text-foreground">{level}</div>
        <div>
          <div className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
            ICAO {level} · {title}
          </div>
          <div className="text-[12px] text-muted-foreground">mínimo {level} en cada descriptor</div>
        </div>
      </div>
      <p className="m-0 mt-3 text-[13px] leading-relaxed text-foreground/90">{blurb}</p>
      <ul className="m-0 mt-3 list-none space-y-1.5 p-0">
        {traits.map((t) => (
          <li key={t} className="flex items-start gap-2 text-[13px] text-foreground/90">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground" strokeWidth={3} aria-hidden />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
