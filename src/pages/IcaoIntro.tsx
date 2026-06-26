import { Link } from "react-router-dom"
import {
  ArrowLeft,
  BookOpen,
  ClipboardCheck,
  Mic,
  ArrowRight,
  AlertTriangle,
  Headphones,
  MessageSquare,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"

/**
 * Pantalla introductoria del módulo de Inglés — mensaje pedagógico de bienvenida
 * + las 4 puertas de entrada (glosario, quiz, speaking, ICAO levels).
 *
 * El texto base sale del libro de Cami ("THE MEANING OF WORDS" + "ESSENTIAL ICAO
 * VOCABULARY"). Cuando el usuario nos pase el mensaje definitivo del módulo,
 * reemplazamos `INTRO_HTML` por el suyo — el resto de la página no cambia.
 */
export function IcaoIntro() {
  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[920px] mx-auto">
        <Link
          to="/app/icao"
          className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver al módulo Inglés
        </Link>

        <div
          className="mono inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-1 rounded-full"
          style={{
            color: "var(--av-cyan-300)",
            background: "oklch(0.78 0.16 215 / 12%)",
            border: "1px solid oklch(0.78 0.16 215 / 30%)",
          }}
        >
          INGLÉS PARA AEROLÍNEA · ANTES DE EMPEZAR
        </div>

        <h1 className="mt-4 text-[36px] font-extrabold tracking-[-0.03em] leading-[1.05]">
          Por qué este módulo existe
        </h1>

        {/* === MENSAJE INTRODUCTORIO === */}
        {/* TODO: reemplazar este bloque por el mensaje definitivo del usuario
            cuando nos lo pase. La estructura del resto de la página (CTAs)
            sigue igual. */}
        <article className="mt-6 space-y-5 text-[15px] leading-relaxed text-foreground/85">
          <p>
            Las aerolíneas no buscan que hables inglés "bonito". Buscan que entiendas — y
            puedas responder — en situaciones <strong className="text-foreground">no rutinarias
            y de emergencia</strong>, bajo presión y por radio con ruido de cabina. Ese es
            todo el juego del inglés operacional.
          </p>

          <p>
            Por eso este módulo no se parece a un curso de inglés general. Se concentra
            en tres cosas:
          </p>

          <div className="grid gap-3 md:grid-cols-3 my-2">
            <Pillar
              icon={BookOpen}
              title="Vocabulario operacional"
              detail="~350 términos que aparecen en exámenes ICAO y en checkrides reales. Buscables siempre."
            />
            <Pillar
              icon={Headphones}
              title="Comprensión"
              detail="Si no entendés el mensaje, no podés responder. La mitad de los fallos en ICAO 4 son comprensión, no producción."
            />
            <Pillar
              icon={MessageSquare}
              title="Capacidad de respuesta (speaking)"
              detail="Aerolíneas evalúan fluidez en preguntas básicas de entrevista antes de pasarte a técnico. Si fallás acá, no avanzás."
            />
          </div>

          <h2 className="text-[20px] font-extrabold tracking-[-0.02em] pt-3">
            Cómo te recomendamos usar esto
          </h2>

          <ol className="space-y-3 list-decimal pl-5 marker:text-[var(--av-cyan-400)] marker:font-bold">
            <li>
              <strong className="text-foreground">Glosario primero.</strong>{" "}
              Recorrelo por categoría (aircraft, weather, security, medical…). No tenés
              que memorizarlo de un saque — abrelo cada vez que veas una palabra que no
              te suena, en cualquier material de estudio.
            </li>
            <li>
              <strong className="text-foreground">Preguntas (quiz).</strong>{" "}
              Hacé tandas cortas. Cada pregunta te muestra la explicación al final
              — leela, no la saltees. El objetivo no es acertar, es entender por qué.
            </li>
            <li>
              <strong className="text-foreground">Entrevista intro (speaking).</strong>{" "}
              Practicá respondiendo en voz alta, incluso si estás solo. Las preguntas
              vienen con la <em>intención</em> detrás (por qué la hacen, qué buscan que
              digas y qué evitar). Grabate y escuchate — es lo más incómodo y lo más útil.
            </li>
          </ol>

          <div
            className="rounded-xl border p-5 mt-4"
            style={{
              borderColor: "oklch(0.78 0.16 215 / 25%)",
              background:
                "linear-gradient(135deg, oklch(0.78 0.16 215 / 6%) 0%, oklch(0.55 0.22 264 / 8%) 100%)",
            }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle
                className="flex-shrink-0 mt-0.5 h-5 w-5"
                style={{ color: "var(--av-amber-400)" }}
              />
              <div>
                <div className="text-[14px] font-bold tracking-[-0.01em]">
                  Una cosa importante sobre el examen ICAO
                </div>
                <p className="mt-1 text-[13px] text-foreground/80">
                  ICAO 4 es el <strong className="text-foreground">mínimo legal</strong> para
                  volar comercial internacional. ICAO 5 te diferencia en procesos
                  competitivos. La diferencia entre 3 y 4 NO es vocabulario — es{" "}
                  <strong className="text-foreground">cómo manejás eventos inesperados</strong>{" "}
                  y la fluidez sostenida. Por eso el módulo prioriza situaciones reales,
                  no listas de verbos.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* === CTAs === */}
        <div className="mt-10 mb-4">
          <div className="mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--av-cyan-400)]">
            EMPEZAR
          </div>
          <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
            ¿Por dónde arrancás?
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <CtaCard
            to="/app/icao/vocabulario"
            icon={BookOpen}
            color="cyan"
            title="Glosario"
            detail="~350 términos buscables, agrupados por categoría."
          />
          <CtaCard
            to="/app/icao/quiz"
            icon={ClipboardCheck}
            color="blue"
            title="Quiz vocabulario"
            detail="Preguntas MC de comprensión y vocabulario con explicación."
          />
          <CtaCard
            to="/app/entrevistas/speaking"
            icon={Mic}
            color="amber"
            title="Entrevista intro"
            detail="Las 15 preguntas que toda aerolínea hace para evaluar speaking."
          />
        </div>
      </div>
    </AppLayout>
  )
}

function Pillar({ icon: Icon, title, detail }: { icon: React.ComponentType<{ className?: string }>; title: string; detail: string }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: "color-mix(in oklab, var(--border) 65%, transparent)" }}
    >
      <Icon className="h-4.5 w-4.5 mb-2 text-[var(--av-cyan-400)]" />
      <div className="text-[13.5px] font-bold tracking-[-0.01em]">{title}</div>
      <p className="mt-1 text-[12px] text-muted-foreground leading-snug">{detail}</p>
    </div>
  )
}

type Color = "cyan" | "blue" | "amber"
const COLOR: Record<Color, string> = {
  cyan: "var(--av-cyan-400)",
  blue: "var(--av-blue-500)",
  amber: "var(--av-amber-400)",
}

function CtaCard({ to, icon: Icon, color, title, detail }: { to: string; icon: React.ComponentType<{ className?: string }>; color: Color; title: string; detail: string }) {
  return (
    <Link
      to={to}
      className="card card-hover rounded-2xl border p-5 flex flex-col gap-3 transition-all hover:-translate-y-0.5"
      style={{ borderColor: `color-mix(in oklab, ${COLOR[color]} 30%, transparent)` }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{
          background: `color-mix(in oklab, ${COLOR[color]} 14%, transparent)`,
          color: COLOR[color],
        }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-[15px] font-bold tracking-[-0.01em]">{title}</div>
        <p className="mt-1 text-[12.5px] text-muted-foreground leading-relaxed">{detail}</p>
      </div>
      <div className="mt-auto pt-2 flex items-center gap-1 text-[12px] font-semibold" style={{ color: COLOR[color] }}>
        Abrir <ArrowRight className="h-3 w-3" />
      </div>
    </Link>
  )
}
