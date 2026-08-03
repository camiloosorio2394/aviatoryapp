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
  Sparkles,
  ClipboardCheck,
  Gauge,
  Award,
  ChevronDown,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { TILE_COLOR, tileTint, tileBorder, type TileColorKey } from "@/lib/tileColors"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
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
import heroPhoto from "@/assets/photos/icao-night-cockpit.jpg"

/**
 * Módulo Inglés ICAO — estructurado según el examen TEA (Test of English for
 * Aviation, Mayflower College). 4 secciones:
 *   1. Vocabulario   (glosario + quiz)                       — LISTO
 *   2. Interview      (TEA Part 1)                           — LISTO
 *   3. Interactive Comprehension (TEA Part 2)                — LISTO (audios reales)
 *   4. Picture Description & Discussion (TEA Part 3)         — LISTO (13 pares)
 *
 * Jerarquía: hero → las 4 secciones (la navegación real) → simulacro → tip →
 * bloque de referencia colapsable (qué es el TEA, los 6 descriptores, niveles).
 * La teoría no compite con la navegación.
 *
 * La pantalla lee el avance real y ordena por él: primero lo que quedó a
 * medias, después lo que no se ha tocado y de último lo terminado. El manual es
 * el de `AirlinePrep.tsx`, que ya está probado.
 *
 * Dos secciones (comprensión y descripción de imágenes) todavía no guardan
 * nada, así que no tienen avance que mostrar. No se les pinta un 0%: se les
 * pinta lo que hay dentro, con las cifras del propio contenido.
 */
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
      const p = await fetchIcaoProgress(user.id)
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
        color: "cyan",
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
        color: "blue",
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
        color: "violet",
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
        color: "green",
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
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1240px] mx-auto">
        {/* === HERO === */}
        <section className="relative overflow-hidden rounded-2xl">
          <img
            src={heroPhoto}
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
          <div className="relative p-7 sm:p-10">
            <div className="text-[13px] font-semibold text-white/70">
              Inglés ICAO · estructura del examen TEA
            </div>
            <h1 className="text-gradient-gold mt-1.5 text-[32px] sm:text-[32px] font-semibold tracking-[-0.03em] leading-[1.12] pb-1">
              Inglés ICAO, con la estructura del examen TEA
            </h1>
            <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-white/70">
              Está organizado igual que el{" "}
              <strong className="font-semibold text-white">Test of English for Aviation</strong>: 4
              secciones que cubren las dos habilidades que mide el examen,{" "}
              <strong className="font-semibold text-white">hablar y comprender</strong> inglés en
              contexto aeronáutico.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {loading ? (
                <span
                  className="block h-11 w-52 rounded-lg bg-white/15 animate-pulse"
                  aria-hidden="true"
                />
              ) : (
                <Link
                  to={continuar.to}
                  className={appButtonClass({ size: "lg" })}
                  style={appButtonStyle()}
                >
                  <Mic className="h-4 w-4" />
                  {enCurso ? `Seguir con ${continuar.title}` : `Empezar por ${continuar.title}`}
                </Link>
              )}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold text-white">
                <Clock className="h-3.5 w-3.5" /> TEA · 25 a 30 minutos
              </span>
            </div>
          </div>
        </section>

        {/* === LAS SECCIONES (la navegación del módulo) === */}
        <div className="mt-8 mb-4">
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            El módulo · 4 secciones
          </div>
          <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.02em]">
            Dónde entrenas cada habilidad
          </h2>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
          {secciones.map((s) => (
            <SectionCard key={s.title} {...s} statusLoading={loading} />
          ))}
        </div>

        {/* === SIMULACRO (destacado) === */}
        <Link
          to="/app/icao/simulacro"
          className="card-apple group mt-8 block rounded-2xl border p-6"
          style={{
            borderColor: "color-mix(in oklab, var(--av-blue-500) 35%, transparent)",
            background: "color-mix(in oklab, var(--av-blue-500) 5%, transparent)",
          }}
        >
          <div className="flex items-center gap-5">
            <div
              className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))" }}
            >
              <Award className="h-7 w-7 text-white" strokeWidth={1.6} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
                Ponte a prueba
              </div>
              <div className="mt-0.5 text-[20px] font-semibold tracking-[-0.02em]">
                Simulacro TEA: examen completo
              </div>
              <p className="mt-1 text-[13px] text-muted-foreground max-w-[640px]">
                Las 3 partes seguidas, cronometradas y con audios reales. Grábate, responde en voz
                alta y autoevalúate con los 6 descriptores al final.
              </p>
              {/* De aquí sale tu nivel ICAO: no se auto-declara, se evalúa. */}
              <div className="mt-2 text-[12px] font-medium text-muted-foreground">
                {loading ? (
                  <span className="block h-4 w-40 rounded bg-muted animate-pulse" aria-hidden="true" />
                ) : (
                  simulacro.estado
                )}
              </div>
            </div>
            <ArrowRight className="hidden sm:block h-5 w-5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>

        {/* === Wingman helper === */}
        <section
          className="mt-8 rounded-2xl border p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
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
              <Sparkles className="h-3.5 w-3.5" /> Consejo de práctica
            </div>
            <h3 className="mt-1.5 text-[17px] font-semibold">Practica en voz alta y grábate</h3>
            <p className="mt-1 text-[15px] text-muted-foreground max-w-[680px]">
              El TEA es oral. Leer las respuestas no alcanza: respóndelas en voz alta, grábate con el
              celular y escúchate después. Es lo más incómodo y lo que más rápido sube tu nivel. En la
              comunidad #icao puedes pedir comentarios y practicar con otros pilotos.
            </p>
          </div>
          <Link
            to="/app/comunidad"
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-[15px] font-semibold text-white border-0 flex-shrink-0 transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--av-blue-500)" }}
          >
            Comunidad #icao <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>

        {/* === REFERENCIA (colapsable) === */}
        <ReferenceBlock />
      </div>
    </AppLayout>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// BLOQUE DE REFERENCIA: qué es el TEA · los 6 descriptores · niveles 4 y 5
// ────────────────────────────────────────────────────────────────────────────
function ReferenceBlock() {
  const [open, setOpen] = useState(false)
  return (
    <section className="mt-8 rounded-2xl surface overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <div className="min-w-0">
          <div className="text-[12px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            Referencia
          </div>
          <div className="mt-0.5 text-[17px] font-semibold tracking-[-0.01em]">
            Qué es el TEA y cómo se califica
          </div>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            Estructura, duración, los 6 descriptores ICAO y qué piden los niveles 4 y 5.
          </p>
        </div>
        <ChevronDown
          className="flex-shrink-0 h-4.5 w-4.5 text-muted-foreground transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div className="border-t border-border p-5 sm:p-6">
          {/* Qué es el examen */}
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h3 className="text-[17px] font-semibold tracking-[-0.01em]">
                Test of English for Aviation
              </h3>
              <p className="mt-2 text-[15px] text-foreground/90 leading-relaxed">
                El TEA es un examen diseñado por{" "}
                <strong className="text-foreground">Mayflower College</strong> para evaluar el nivel de
                inglés de pilotos y controladores frente a los requisitos lingüísticos de la OACI.
                Evalúa <strong className="text-foreground">solo hablar y escuchar</strong>, en contexto
                aeronáutico:{" "}
                <strong className="text-foreground">
                  no evalúa conocimiento técnico ni fraseología estándar
                </strong>
                .
              </p>
              <p className="mt-3 text-[15px] text-foreground/90 leading-relaxed">
                La entrevista de la Parte 1 evalúa si puedes sostener una conversación espontánea en
                inglés natural, técnico y profesional. Las partes siguientes miden tu comprensión
                auditiva y tu capacidad de describir, comparar y dar opiniones.
              </p>
            </div>

            <div
              className="rounded-2xl border p-5"
              style={{
                borderColor: "color-mix(in oklab, var(--av-blue-500) 22%, transparent)",
                background: "color-mix(in oklab, var(--av-blue-500) 5%, transparent)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4" style={{ color: "var(--av-blue-500)" }} />
                <div className="text-[13px] font-semibold">Duración total: 25 a 30 minutos</div>
              </div>
              <ul className="space-y-2.5">
                <FactRow label="Parte 1 · Interview" detail="7 a 8 minutos, conversación sobre tu rol" />
                <FactRow label="Parte 2 · Comprensión" detail="audios de situaciones no rutinarias" />
                <FactRow label="Parte 3 · Imágenes y conversación" detail="describir, comparar y opinar" />
              </ul>
              <div className="mt-4 pt-3 border-t border-border/50 text-[13px] text-muted-foreground leading-relaxed">
                Solo mide <strong className="text-foreground/90">hablar y escuchar</strong>. No hay parte
                escrita ni preguntas técnicas de aviación.
              </div>
            </div>
          </div>

          {/* Los 6 descriptores */}
          <div className="mt-8">
            <h3 className="text-[17px] font-semibold tracking-[-0.01em]">Los 6 descriptores ICAO</h3>
            <p className="mt-1.5 text-[15px] text-muted-foreground max-w-[760px]">
              El TEA califica seis descriptores.{" "}
              <strong className="text-foreground">Tu resultado final es tu descriptor más bajo</strong>:
              si sacas 5 en cinco de ellos y 4 en comprensión, tu resultado oficial es ICAO 4. Ser bueno
              en algunos no alcanza: tienes que subirlos todos.
            </p>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {DESCRIPTORS.map((d) => (
                <div
                  key={d.name}
                  className="rounded-xl border p-4"
                  style={{ borderColor: "color-mix(in oklab, var(--border) 65%, transparent)" }}
                >
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4" style={{ color: "var(--av-blue-500)" }} />
                    <div className="text-[15px] font-semibold tracking-[-0.01em]">{d.name}</div>
                  </div>
                  <p className="mt-1 text-[13px] text-muted-foreground leading-snug">{d.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Niveles 4 y 5 */}
          <div className="mt-8">
            <h3 className="text-[17px] font-semibold tracking-[-0.01em]">Qué piden los niveles 4 y 5</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <LevelPanel
                level={4}
                title="Operational"
                color="cyan"
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
                color="green"
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
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
function FactRow({ label, detail }: { label: string; detail: string }) {
  return (
    <li className="flex items-start gap-2">
      <Check className="flex-shrink-0 mt-0.5 h-3.5 w-3.5" style={{ color: "var(--av-blue-500)" }} strokeWidth={3} />
      <div>
        <div className="text-[13px] font-semibold leading-tight">{label}</div>
        <div className="text-[13px] text-muted-foreground leading-tight">{detail}</div>
      </div>
    </li>
  )
}

interface Seccion {
  to: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  color: TileColorKey
  part: string
  title: string
  /** Cuánto contenido hay dentro, con cifras reales. */
  meta: string
  description: string
  cta: string
  secondary?: { to: string; label: string; icon: React.ComponentType<{ className?: string }> }
  resumen: SeccionResumen
}

function SectionCard({
  to,
  icon: Icon,
  color,
  part,
  title,
  meta,
  description,
  cta,
  secondary,
  resumen,
  statusLoading,
}: Seccion & { statusLoading?: boolean }) {
  const c = TILE_COLOR[color]
  const completa = resumen.pct !== null && resumen.pct >= 100
  return (
    <div
      className="card-apple relative rounded-2xl surface p-5 flex flex-col gap-3"
      style={{ borderColor: tileBorder(color, 32) }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: tileTint(color, 14),
            border: `1px solid ${tileBorder(color, 32)}`,
            color: c,
          }}
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        {completa && <span className="chip chip-green">Completa</span>}
      </div>

      <div>
        <div className="text-[12px] font-semibold" style={{ color: c }}>
          {part}
        </div>
        <div className="mt-0.5 text-[17px] font-semibold tracking-[-0.02em]">{title}</div>
        <div className="mt-1 text-[12px] font-medium text-muted-foreground">{meta}</div>
        <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{description}</p>
      </div>

      <div className="mt-auto pt-1 flex items-center gap-2">
        {/* El ::after estira el área de click a toda la tarjeta: si se levanta con
            hover, tiene que llevar a algún lado. */}
        <Link
          to={to}
          className="inline-flex items-center gap-1 text-[13px] font-semibold after:absolute after:inset-0 after:content-['']"
          style={{ color: c }}
        >
          {cta} <ArrowRight className="h-3 w-3" />
        </Link>
        {secondary && (
          <>
            <span className="text-border">·</span>
            <Link
              to={secondary.to}
              className="relative z-10 inline-flex items-center gap-1 text-[13px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <secondary.icon className="h-3 w-3" /> {secondary.label}
            </Link>
          </>
        )}
      </div>

      {/* El pie: la barra solo se dibuja cuando hay avance. Una barra vacía dice
          "vas perdiendo" cuando lo que pasa es que todavía no empezaste. */}
      <div className="pt-3 border-t border-border/60">
        {statusLoading ? (
          <span className="block h-4 w-32 rounded bg-muted animate-pulse" aria-hidden="true" />
        ) : (
          <>
            {resumen.pct !== null && resumen.pct > 0 && (
              <div
                className="mb-2 h-1.5 rounded-full bg-muted overflow-hidden"
                role="progressbar"
                aria-label={`Avance de ${title}`}
                aria-valuenow={resumen.pct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full transition-[width]"
                  style={{ width: `${resumen.pct}%`, background: c }}
                />
              </div>
            )}
            <span className="text-[12px] font-medium text-muted-foreground">{resumen.estado}</span>
          </>
        )}
      </div>
    </div>
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

function LevelPanel({ level, title, color, blurb, traits }: { level: number; title: string; color: TileColorKey; blurb: string; traits: string[] }) {
  const c = TILE_COLOR[color]
  return (
    <div
      className="rounded-2xl border p-5"
      style={{ borderColor: tileBorder(color, 30), background: tileTint(color, 5) }}
    >
      <div className="flex items-baseline gap-2">
        <div className="text-[32px] font-semibold tracking-[-0.04em] leading-none" style={{ color: c }}>
          {level}
        </div>
        <div>
          <div className="text-[15px] font-semibold tracking-[-0.01em]">ICAO {level} · {title}</div>
          <div className="text-[12px] text-muted-foreground">
            mínimo {level} en cada descriptor
          </div>
        </div>
      </div>
      <p className="mt-2 text-[13px] text-foreground/90 leading-relaxed">{blurb}</p>
      <ul className="mt-3 space-y-1.5">
        {traits.map((t) => (
          <li key={t} className="flex items-start gap-2 text-[13px] text-foreground/90">
            <Check className="flex-shrink-0 mt-0.5 h-3.5 w-3.5" style={{ color: c }} strokeWidth={3} />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
