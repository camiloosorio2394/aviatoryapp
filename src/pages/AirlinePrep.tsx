import { Link } from "react-router-dom"
import {
  Plane,
  ClipboardList,
  FileBadge,
  Brain,
  Sparkles,
  ArrowRight,
  Check,
  Clock,
  Briefcase,
  Wrench,
  Users,
  Network,
  CloudSun,
  TrendingUp,
  Compass,
  ListChecks,
  Rocket,
  Cog,
  Map,
  HeartPulse,
  Layers,
  BookOpen,
  Mic,
  Activity,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"

/**
 * Módulo Ingreso a Aerolínea — CORE COMERCIAL.
 * 14 topics base · 7 submódulos · perfil por aerolínea.
 * Backend listo (airline_prep_topics + airline_prep_questions + mocks +
 * simulations + exams + flashcards + real_cases + airline_profiles_prep).
 */
export function AirlinePrep() {
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
                  style={{ background: "var(--av-amber-400)", boxShadow: "0 0 8px var(--av-amber-400)" }}
                />
                MÓDULO CORE · BACKEND LISTO · CONTENIDO EN CONSTRUCCIÓN
              </div>
              <h1 className="mt-4 mb-1.5 text-[42px] font-extrabold tracking-[-0.04em] text-white leading-[1.05]">
                Ingreso a Aerolínea,{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, var(--av-cyan-300), white)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  el camino completo a la cabina
                </span>
              </h1>
              <p className="text-[17px] text-white/75 max-w-[680px] mt-3 leading-relaxed">
                El módulo central de Aviatory. <strong className="text-white">14 áreas de conocimiento</strong>{" "}
                que las aerolíneas LATAM evalúan, organizadas en <strong className="text-white">7 submódulos</strong>:
                banco de preguntas, mock interviews, simulaciones técnicas, exámenes completos,
                flashcards, casos reales reportados y perfiles personalizados por aerolínea.
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
                <Briefcase className="h-14 w-14 text-white" strokeWidth={1.5} />
              </div>
              <div className="mono text-[10px] tracking-[0.16em] text-white/50">CARRERA · CORE</div>
            </div>
          </div>
        </section>

        {/* === 14 TOPICS GRID === */}
        <div className="mt-10 mb-5">
          <div className="mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--av-cyan-400)]">
            ÁREAS DE CONOCIMIENTO · 14
          </div>
          <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
            Lo que evalúan las aerolíneas
          </h2>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TOPICS.map((t) => (
            <TopicChip key={t.slug} {...t} />
          ))}
        </div>

        {/* === 7 SUBMÓDULOS === */}
        <div className="mt-10 mb-5 flex items-end justify-between">
          <div>
            <div className="mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--av-cyan-400)]">
              SUBMÓDULOS DEL SISTEMA · 7
            </div>
            <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
              Cómo vas a entrenar
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
              <Sparkles className="h-3 w-3" /> Mientras se carga el contenido
            </div>
            <h3 className="mt-1.5 text-lg font-bold">
              Activá ya las herramientas disponibles que feedean este módulo.
            </h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-[680px]">
              El match por aerolínea, el simulador de entrevistas y los tests psicotécnicos ya
              corren con backend completo. Suma tu Logbook y vencimientos para que tu Pilot ID
              esté listo el día que postules.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/app/aerolineas"
              className="av-shine inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-semibold text-white border-0"
              style={{
                background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
                boxShadow:
                  "0 1px 0 rgb(255 255 255 / 18%) inset, 0 10px 24px -8px oklch(0.55 0.22 264 / 45%)",
              }}
            >
              Ver mi match <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/app/entrevistas"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-semibold border border-border bg-card hover:bg-muted transition-colors"
            >
              Simulador entrevistas <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/app/psicotecnicas"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-semibold border border-border bg-card hover:bg-muted transition-colors"
            >
              Psicotécnicas <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// 14 TOPICS (matching airline_prep_topics seed)
// ────────────────────────────────────────────────────────────────────────────
const TOPICS: { slug: string; name: string; category: string; icon: React.ComponentType<{ className?: string }>; color: ColorKey }[] = [
  { slug: "technical_interview", name: "Technical Interview", category: "Interview", icon: Wrench, color: "blue" },
  { slug: "hr_interview", name: "HR Interview", category: "Interview", icon: Users, color: "cyan" },
  { slug: "crm_tem", name: "CRM / TEM", category: "Behavioral", icon: Network, color: "violet" },
  { slug: "meteorologia_op", name: "Meteorología operacional", category: "Operations", icon: CloudSun, color: "cyan" },
  { slug: "performance", name: "Performance", category: "Technical", icon: TrendingUp, color: "amber" },
  { slug: "navegacion", name: "Navegación", category: "Technical", icon: Compass, color: "blue" },
  { slug: "aerodinamica", name: "Aerodinámica", category: "Technical", icon: Plane, color: "cyan" },
  { slug: "sops", name: "SOPs", category: "Operations", icon: ListChecks, color: "green" },
  { slug: "jet_orientation", name: "Jet Orientation", category: "Technical", icon: Rocket, color: "violet" },
  { slug: "turbine_systems", name: "Turbine Systems", category: "Technical", icon: Cog, color: "amber" },
  { slug: "flight_planning", name: "Flight Planning", category: "Operations", icon: Map, color: "blue" },
  { slug: "factores_humanos", name: "Factores Humanos", category: "Psychology", icon: Brain, color: "violet" },
  { slug: "psicologia_operacional", name: "Psicología operacional", category: "Psychology", icon: HeartPulse, color: "amber" },
  { slug: "assessment_cases", name: "Casos tipo Assessment", category: "Case", icon: ClipboardList, color: "green" },
]

// ────────────────────────────────────────────────────────────────────────────
// 7 SUBMÓDULOS (cómo se entrena cada topic)
// ────────────────────────────────────────────────────────────────────────────
const SUBMODULES: TileProps[] = [
  {
    icon: BookOpen,
    color: "cyan",
    title: "Banco de preguntas",
    description: "Cientos de preguntas por topic, todas redactadas/revisadas por nosotros (sin riesgo legal de copiar literal).",
    bullets: ["Multiple choice + open + scenario", "Filtrado por aerolínea fuente", "Mastery tracking por topic"],
  },
  {
    icon: Mic,
    color: "blue",
    title: "Mock interviews",
    description: "Simulacros de entrevista en formato HR / Technical / Mixed. Grabación opcional + feedback IA.",
    bullets: ["Tiempo real con pausa", "Follow-ups dinámicos", "Score post-sesión"],
    link: { to: "/app/entrevistas", label: "Ya disponible: Simulador" },
  },
  {
    icon: Activity,
    color: "violet",
    title: "Simulaciones técnicas",
    description: "Escenarios operacionales: emergencia, weather, fuel, alternate, CRM conflict. Decisiones en árbol.",
    bullets: ["Decision points marcados", "Briefing pre + debrief post", "Variantes según aerolínea"],
  },
  {
    icon: ClipboardList,
    color: "amber",
    title: "Exámenes completos",
    description: "Simulacros end-to-end con cronómetro, mix de topics y passing score por aerolínea.",
    bullets: ["Duración real (60-90 min típico)", "Distribución de topics realista", "Histórico para tracking"],
  },
  {
    icon: Layers,
    color: "green",
    title: "Flashcards",
    description: "Tarjetas spaced-repetition por topic para retención larga. Imagen + texto cuando aplica.",
    bullets: ["SR scheduling automático", "Solo lo que olvidás", "Bloques de 5-10 min"],
  },
  {
    icon: FileBadge,
    color: "red",
    title: "Casos reales",
    description: "Entrevistas reportadas por pilotos que ya pasaron. Qué cayó, qué pidieron, qué duró, qué resultado.",
    bullets: ["Anónimo por defecto", "Verificado por equipo", "Filtrado por airline + año"],
  },
  {
    icon: Plane,
    color: "cyan",
    title: "Perfil por aerolínea",
    description: "Avianca, LATAM, Copa, Wingo, JetSmart, Viva — cada una con su proceso, tips y prep recommendation.",
    bullets: ["Match con tu perfil", "Tiempo típico del proceso", "Recruiter tips reales"],
    link: { to: "/app/aerolineas", label: "Ya disponible: Match" },
  },
]

// ────────────────────────────────────────────────────────────────────────────
// COMPONENTS
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

function TopicChip({ name, category, icon: Icon, color }: { name: string; category: string; icon: React.ComponentType<{ className?: string }>; color: ColorKey }) {
  return (
    <div
      className="rounded-xl border p-3 flex items-center gap-3 transition-all hover:-translate-y-0.5 hover:shadow-sm"
      style={{ borderColor: "color-mix(in oklab, var(--border) 65%, transparent)" }}
    >
      <div
        className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
        style={{
          background: `color-mix(in oklab, ${TILE_COLOR[color]} 14%, transparent)`,
          border: `1px solid color-mix(in oklab, ${TILE_COLOR[color]} 32%, transparent)`,
          color: TILE_COLOR[color],
        }}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-bold tracking-[-0.01em] truncate">{name}</div>
        <div className="mono text-[9.5px] tracking-[0.12em] uppercase text-muted-foreground">{category}</div>
      </div>
    </div>
  )
}

interface TileProps {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  color: ColorKey
  title: string
  description: string
  bullets: string[]
  link?: { to: string; label: string }
}

function FeatureTile({ icon: Icon, color, title, description, bullets, link }: TileProps) {
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
      {link && (
        <Link to={link.to} className="inline-flex items-center gap-1 mt-1 text-xs font-bold transition-colors" style={{ color: TILE_COLOR[color] }}>
          {link.label} <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  )
}
