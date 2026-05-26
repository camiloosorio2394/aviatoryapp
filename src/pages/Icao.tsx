import { Link } from "react-router-dom"
import {
  Headphones,
  Mic,
  MessageCircle,
  BookOpen,
  Sparkles,
  ArrowRight,
  Check,
  Clock,
  Radio,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"

/**
 * Módulo Inglés ICAO.
 * Página "early access" — estructura visual lista, contenido se carga en próximas tandas.
 */
export function Icao() {
  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        {/* === Cockpit hero === */}
        <section
          className="cockpit anim-fade-up relative overflow-hidden rounded-3xl border p-9"
          style={{
            borderColor: "oklch(0.32 0.04 250 / 0.6)",
            boxShadow: "var(--shadow-navy), inset 0 1px 0 rgb(255 255 255 / 7%)",
          }}
        >
          <div className="cockpit-grid absolute inset-0 opacity-60" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(at 80% 0%, oklch(0.78 0.16 215 / 25%) 0%, transparent 50%)",
            }}
          />

          <div className="relative grid items-center gap-8" style={{ gridTemplateColumns: "1fr auto" }}>
            <div>
              <div
                className="mono inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
                style={{
                  color: "var(--av-cyan-300)",
                  background: "oklch(0.78 0.16 215 / 12%)",
                  border: "1px solid oklch(0.78 0.16 215 / 30%)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "var(--av-amber-400)",
                    boxShadow: "0 0 8px var(--av-amber-400)",
                  }}
                />
                MÓDULO ICAO · EARLY ACCESS · ETA Q3 2026
              </div>
              <h1 className="mt-4 mb-1.5 text-[42px] font-extrabold tracking-[-0.04em] text-white leading-[1.05]">
                Inglés ICAO,{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, var(--av-cyan-300), white)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Level 4 sin sorpresas
                </span>
              </h1>
              <p className="text-[17px] text-white/75 max-w-[640px] mt-3 leading-relaxed">
                El ICAO es la pared invisible entre tú y la aerolínea. Acá vas a tener la estructura
                completa del examen, ejercicios por habilidad, simulador OPI con feedback de IA y
                la fraseología oficial — todo en un solo módulo, sin saltar de YouTube a apps random.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 pr-2">
              <div
                className="flex items-center justify-center w-[120px] h-[120px] rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, var(--av-cyan-300), var(--av-blue-500))",
                  boxShadow:
                    "0 16px 40px -8px oklch(0.55 0.22 264 / 60%), inset 0 1px 0 rgb(255 255 255 / 25%)",
                }}
              >
                <Radio className="h-14 w-14 text-white" strokeWidth={1.5} />
              </div>
              <div className="mono text-[10px] tracking-[0.16em] text-white/50">ICAO LANG PROF</div>
            </div>
          </div>
        </section>

        {/* === Lo que vas a encontrar === */}
        <div className="mt-10 mb-5 flex items-end justify-between">
          <div>
            <div className="mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--av-cyan-400)]">
              ROADMAP DEL MÓDULO
            </div>
            <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
              Lo que vas a encontrar
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground mono">
            <Clock className="h-3.5 w-3.5" />4 secciones · liberación gradual
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <FeatureTile
            icon={BookOpen}
            color="cyan"
            title="Estructura del examen"
            description="Los 6 holistic descriptors de ICAO explicados con ejemplos reales, qué espera el evaluador y errores frecuentes que bajan tu nivel."
            bullets={[
              "Pronunciation, Structure, Vocabulary, Fluency, Comprehension, Interactions",
              "Criterios oficiales OACI Doc 9835",
              "Ejemplos de respuestas Level 3 vs 4 vs 5",
            ]}
          />
          <FeatureTile
            icon={Mic}
            color="blue"
            title="Ejercicios por habilidad"
            description="Cientos de drills cortos enfocados en una habilidad a la vez. Pronunciación, vocabulario aeronáutico, fluidez, comprensión y respuesta a situaciones de cabina."
            bullets={[
              "Audio + speech-to-text para auto-corrección",
              "Bloques de 10 min ideales para entre vuelos",
              "Progreso por habilidad, no solo por horas",
            ]}
          />
          <FeatureTile
            icon={Headphones}
            color="violet"
            title="Simulador OPI con IA"
            description="Sesiones de OPI (Oral Proficiency Interview) con Wingman jugando rol de evaluador. Te tira escenarios, te interrumpe, te corrige y te da el rating estimado al final."
            bullets={[
              "Escenarios: emergencia, ATC normal, weather report, traffic",
              "Feedback por descriptor",
              "Grabación + transcript para que revises tus errores",
            ]}
          />
          <FeatureTile
            icon={MessageCircle}
            color="green"
            title="Fraseología oficial"
            description="Biblioteca buscable de fraseología OACI estándar y diferencias regionales. Las frases que escuchas en el TCA cuando estás cansado y no sabes qué responder."
            bullets={[
              "Phraseology cards por fase de vuelo",
              "Diferencias FAA vs ICAO vs CAA",
              "Quices de reconocimiento rápido",
            ]}
          />
        </div>

        {/* === CTA === */}
        <section
          className="mt-10 rounded-2xl border p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
          style={{
            borderColor: "oklch(0.78 0.16 215 / 25%)",
            background:
              "linear-gradient(135deg, oklch(0.78 0.16 215 / 8%) 0%, oklch(0.55 0.22 264 / 10%) 100%)",
          }}
        >
          <div>
            <div
              className="mono inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.16em] uppercase"
              style={{ color: "var(--av-cyan-400)" }}
            >
              <Sparkles className="h-3 w-3" /> Cómo seguir desde ya
            </div>
            <h3 className="mt-1.5 text-lg font-bold">
              Mientras tanto, el quiz "Inglés ICAO" del banco de preguntas ya está activo.
            </h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-[640px]">
              Cada vez que liberemos contenido nuevo te avisamos por notificación.
              Si quieres priorizar algo específico, dinos en la comunidad #icao.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/app/materias"
              className="av-shine inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-semibold text-white border-0"
              style={{
                background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
                boxShadow:
                  "0 1px 0 rgb(255 255 255 / 18%) inset, 0 10px 24px -8px oklch(0.55 0.22 264 / 45%)",
              }}
            >
              Ir al banco de preguntas <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/app/comunidad"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-semibold border border-border bg-card hover:bg-muted transition-colors"
            >
              Pedir contenido en #icao <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}

interface TileProps {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  color: "cyan" | "blue" | "violet" | "amber" | "green"
  title: string
  description: string
  bullets: string[]
}

const TILE_COLOR: Record<TileProps["color"], string> = {
  cyan: "var(--av-cyan-400)",
  blue: "var(--av-blue-500)",
  violet: "var(--av-violet-400)",
  amber: "var(--av-amber-400)",
  green: "var(--av-green-400)",
}

function FeatureTile({ icon: Icon, color, title, description, bullets }: TileProps) {
  return (
    <div
      className="card card-hover rounded-2xl border p-6 flex flex-col gap-3.5"
      style={{
        borderColor: "color-mix(in oklab, var(--border) 65%, transparent)",
      }}
    >
      <div className="flex items-start gap-3.5">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: `color-mix(in oklab, ${TILE_COLOR[color]} 14%, transparent)`,
            border: `1px solid color-mix(in oklab, ${TILE_COLOR[color]} 32%, transparent)`,
          }}
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <div className="flex-1 pt-0.5">
          <div className="text-[15px] font-bold tracking-[-0.01em]">{title}</div>
          <p className="mt-0.5 text-[13px] text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
      <ul className="space-y-1.5 pl-1">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-[12.5px] text-foreground/80">
            <Check
              className="flex-shrink-0 mt-0.5 h-3.5 w-3.5"
              style={{ color: TILE_COLOR[color] } as React.CSSProperties}
              strokeWidth={3}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
