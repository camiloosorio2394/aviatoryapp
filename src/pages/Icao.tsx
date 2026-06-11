import { Link } from "react-router-dom"
import {
  Headphones,
  Mic,
  Volume2,
  Radio,
  AlertTriangle,
  BookOpen,
  PlayCircle,
  ClipboardCheck,
  MessageCircle,
  Brain,
  Sparkles,
  ArrowRight,
  Check,
  Clock,
  Award,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"

/**
 * Módulo Inglés ICAO — mercado propio, separado de Aerolínea.
 * Niveles 3/4/5 · 5 skills · preparación · evaluación con IA.
 * Backend: icao_levels, icao_skills, icao_exercises, icao_phrases,
 * icao_emergencies, icao_roleplays, user_icao_attempts, user_icao_level.
 */
export function Icao() {
  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
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
            style={{ background: "radial-gradient(at 80% 0%, oklch(0.78 0.16 215 / 25%) 0%, transparent 50%)" }}
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
                  style={{ background: "var(--av-amber-400)", boxShadow: "0 0 8px var(--av-amber-400)" }}
                />
                MÓDULO ICAO · BACKEND LISTO · CONTENIDO EN CONSTRUCCIÓN
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
                  del nivel 3 al 5 con método
                </span>
              </h1>
              <p className="text-[17px] text-white/75 max-w-[680px] mt-3 leading-relaxed">
                Mercado propio, lógica pedagógica propia. <strong className="text-white">3 niveles oficiales</strong>{" "}
                (3 / 4 / 5), <strong className="text-white">5 skills</strong> evaluadas
                (listening, speaking, pronunciation, radiotelephony, unexpected situations),
                preparación dirigida al examen y evaluación con IA basada en los descriptores OACI Doc 9835.
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

        {/* === NIVELES === */}
        <div className="mt-10 mb-5">
          <div className="mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--av-cyan-400)]">
            NIVELACIÓN · 3 NIVELES OFICIALES
          </div>
          <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
            ¿En qué nivel estás y a cuál quieres llegar?
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {LEVELS.map((l) => (
            <LevelCard key={l.level} {...l} />
          ))}
        </div>

        {/* === SKILLS === */}
        <div className="mt-10 mb-5">
          <div className="mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--av-cyan-400)]">
            SKILLS EVALUADAS · 5
          </div>
          <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
            Lo que el evaluador mide
          </h2>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {SKILLS.map((s) => (
            <SkillChip key={s.slug} {...s} />
          ))}
        </div>

        {/* === SUBMÓDULOS === */}
        <div className="mt-10 mb-5 flex items-end justify-between">
          <div>
            <div className="mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--av-cyan-400)]">
              PREPARACIÓN + EVALUACIÓN
            </div>
            <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
              Cómo te llevamos al examen
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground mono">
            <Clock className="h-3.5 w-3.5" />Backend listo · contenido gradual
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SUBMODULES.map((s) => (
            <FeatureTile key={s.title} {...s} />
          ))}
        </div>

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
              <Sparkles className="h-3 w-3" /> Cómo empezar ya
            </div>
            <h3 className="mt-1.5 text-lg font-bold">
              Mientras se carga el contenido del módulo completo
            </h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-[680px]">
              Pásale tu ICAO actual a Wingman (el asistente) y te ayuda con frases, vocabulary y
              roleplays mientras cargamos el contenido oficial. En la comunidad #icao puedes pedir
              priorización de skills específicas.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/app/comunidad"
              className="av-shine inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-semibold text-white border-0"
              style={{
                background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
                boxShadow:
                  "0 1px 0 rgb(255 255 255 / 18%) inset, 0 10px 24px -8px oklch(0.55 0.22 264 / 45%)",
              }}
            >
              Comunidad #icao <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/app/pca"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-semibold border border-border bg-card hover:bg-muted transition-colors"
            >
              Estudio general <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// LEVELS
// ────────────────────────────────────────────────────────────────────────────
type ColorKey = "cyan" | "blue" | "violet" | "amber" | "green" | "red"
const TILE_COLOR: Record<ColorKey, string> = {
  cyan: "var(--av-cyan-400)",
  blue: "var(--av-blue-500)",
  violet: "var(--av-violet-400)",
  amber: "var(--av-amber-400)",
  green: "var(--av-green-400)",
  red: "var(--av-red-400)",
}

const LEVELS: { level: number; title: string; description: string; valid: string; color: ColorKey; criteria: string[] }[] = [
  {
    level: 3,
    title: "ICAO 3 · Pre-Operational",
    description: "Comunicación básica. No apto para operación internacional comercial.",
    valid: "Vigencia: revisar antes del próximo CHEQUEO",
    color: "amber",
    criteria: ["Vocabulario limitado a fraseología", "Comprende pero responde lento", "Pronunciación inteligible con esfuerzo"],
  },
  {
    level: 4,
    title: "ICAO 4 · Operational",
    description: "Mínimo legal para volar internacional comercial. Tu objetivo si recién postulás.",
    valid: "Vigencia: 3 años",
    color: "cyan",
    criteria: ["Vocabulario aviation completo", "Fluidez en rutina", "Maneja eventos inesperados básicos"],
  },
  {
    level: 5,
    title: "ICAO 5 · Extended",
    description: "Nivel objetivo para carrera de aerolínea. Te diferencia en procesos competitivos.",
    valid: "Vigencia: 6 años",
    color: "green",
    criteria: ["Vocabulario amplio aviation + general", "Fluidez sostenida", "Maneja eventos complejos sin problema"],
  },
]

const SKILLS: { slug: string; name: string; icon: React.ComponentType<{ className?: string }>; color: ColorKey }[] = [
  { slug: "listening", name: "Listening", icon: Headphones, color: "cyan" },
  { slug: "speaking", name: "Speaking", icon: Mic, color: "blue" },
  { slug: "pronunciation", name: "Pronunciation", icon: Volume2, color: "violet" },
  { slug: "radiotelephony", name: "Radiotelephony", icon: Radio, color: "amber" },
  { slug: "unexpected", name: "Unexpected", icon: AlertTriangle, color: "red" },
]

const SUBMODULES: TileProps[] = [
  {
    icon: BookOpen,
    color: "cyan",
    title: "Estructura del examen",
    description: "Los 6 holistic descriptors explicados con ejemplos reales y criterios oficiales.",
    bullets: ["Pronunciation, Structure, Vocabulary, Fluency, Comprehension, Interactions", "Criterios Doc 9835 OACI", "Comparación Level 3 vs 4 vs 5"],
  },
  {
    icon: PlayCircle,
    color: "blue",
    title: "Ejercicios guiados",
    description: "Drills cortos por skill con audio + speech-to-text para auto-corrección.",
    bullets: ["Bloques de 10 min", "Auto-corrección instantánea", "Progreso por skill, no por horas"],
  },
  {
    icon: ClipboardCheck,
    color: "violet",
    title: "Mock tests",
    description: "Simulacros completos con el formato y duración del examen real.",
    bullets: ["Estructura idéntica al oficial", "Cronómetro real", "Score estimado por descriptor"],
  },
  {
    icon: MessageCircle,
    color: "green",
    title: "Frases ICAO + emergencias",
    description: "Biblioteca buscable de fraseología OACI estándar y respuestas a emergencias.",
    bullets: ["Phraseology cards por fase de vuelo", "Variantes FAA/ICAO/CAA/EASA", "Escenarios de emergencia con respuesta esperada"],
  },
  {
    icon: Brain,
    color: "amber",
    title: "Roleplay ATC-Pilot",
    description: "Conversaciones simuladas con Wingman jugando rol de ATC. Te interrumpe, te corrige, te pide repetir.",
    bullets: ["Escenarios: rutina, emergencia, weather, traffic", "Grabación + transcript", "Variantes por aerolínea/región"],
  },
  {
    icon: Award,
    color: "red",
    title: "Evaluación con IA",
    description: "Score automático por descriptor + feedback accionable + grabación de tu sesión.",
    bullets: ["Análisis por los 6 holistic descriptors", "Comparativa histórica de tu progreso", "Recomendaciones específicas por skill débil"],
  },
]

// ────────────────────────────────────────────────────────────────────────────
function LevelCard({ level, title, description, valid, color, criteria }: { level: number; title: string; description: string; valid: string; color: ColorKey; criteria: string[] }) {
  return (
    <div
      className="card rounded-2xl border p-5 flex flex-col gap-3"
      style={{ borderColor: `color-mix(in oklab, ${TILE_COLOR[color]} 30%, transparent)` }}
    >
      <div className="flex items-baseline justify-between">
        <div
          className="mono text-[42px] font-extrabold tracking-[-0.04em] leading-none"
          style={{ color: TILE_COLOR[color] }}
        >
          {level}
        </div>
        <div className="mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground">{valid}</div>
      </div>
      <div>
        <div className="text-[15px] font-bold tracking-[-0.01em]">{title}</div>
        <p className="mt-1 text-[12.5px] text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <ul className="space-y-1 pt-1">
        {criteria.map((c) => (
          <li key={c} className="flex items-start gap-2 text-[12px] text-foreground/80">
            <Check className="flex-shrink-0 mt-0.5 h-3 w-3" style={{ color: TILE_COLOR[color] }} strokeWidth={3} />
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SkillChip({ name, icon: Icon, color }: { slug: string; name: string; icon: React.ComponentType<{ className?: string }>; color: ColorKey }) {
  return (
    <div
      className="rounded-xl border p-3 flex flex-col items-center gap-2 transition-all hover:-translate-y-0.5"
      style={{ borderColor: `color-mix(in oklab, ${TILE_COLOR[color]} 30%, transparent)` }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{
          background: `color-mix(in oklab, ${TILE_COLOR[color]} 14%, transparent)`,
          color: TILE_COLOR[color],
        }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-[12.5px] font-semibold text-center">{name}</div>
    </div>
  )
}

interface TileProps {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  color: ColorKey
  title: string
  description: string
  bullets: string[]
}

function FeatureTile({ icon: Icon, color, title, description, bullets }: TileProps) {
  return (
    <div
      className="card card-hover rounded-2xl border p-6 flex flex-col gap-3.5"
      style={{ borderColor: "color-mix(in oklab, var(--border) 65%, transparent)" }}
    >
      <div className="flex items-start gap-3.5">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: `color-mix(in oklab, ${TILE_COLOR[color]} 14%, transparent)`,
            border: `1px solid color-mix(in oklab, ${TILE_COLOR[color]} 32%, transparent)`,
            color: TILE_COLOR[color],
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
            <Check className="flex-shrink-0 mt-0.5 h-3.5 w-3.5" style={{ color: TILE_COLOR[color] }} strokeWidth={3} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
