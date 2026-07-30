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
  FileSearch,
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
import { TILE_COLOR, type TileColorKey as ColorKey } from "@/lib/tileColors"

/**
 * Módulo Ingreso a Aerolínea — CORE COMERCIAL.
 * 14 topics base · 7 submódulos · perfil por aerolínea.
 * Backend listo (airline_prep_topics + airline_prep_questions + mocks +
 * simulations + exams + flashcards + real_cases + airline_profiles_prep).
 */
export function AirlinePrep() {
  return (
    <AppLayout>
      <div className="px-4 sm:px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        {/* === Hero === */}
        <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 sm:p-8 anim-fade-up">
          <div className="relative grid items-center gap-8 grid-cols-1 md:grid-cols-[1fr_auto]">
            <div>
              <div
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  color: "var(--av-blue-500)",
                  background: "color-mix(in oklab, var(--av-blue-500) 10%, transparent)",
                  border: "1px solid color-mix(in oklab, var(--av-blue-500) 24%, transparent)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--av-amber-400)" }}
                />
                Módulo core · sección NOTAM disponible · resto en construcción
              </div>
              <h1 className="mt-4 mb-1.5 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.05]">
                Ingreso a Aerolínea,{" "}
                <span style={{ color: "var(--av-blue-500)" }}>
                  el camino completo a la cabina
                </span>
              </h1>
              <p className="text-[18px] text-muted-foreground max-w-[680px] mt-3 leading-relaxed">
                El módulo central de Aviatory. <strong className="text-foreground">14 áreas de conocimiento</strong>{" "}
                que las aerolíneas LATAM evalúan, organizadas en <strong className="text-foreground">7 submódulos</strong>:
                banco de preguntas, mock interviews, simulaciones técnicas, exámenes completos,
                flashcards, casos reales reportados y perfiles personalizados por aerolínea.
              </p>
            </div>
            <div className="hidden md:flex flex-col items-center gap-3 pr-2">
              <div
                className="flex items-center justify-center w-[120px] h-[120px] rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))",
                }}
              >
                <Briefcase className="h-14 w-14 text-white" strokeWidth={1.5} />
              </div>
              <div className="text-[13px] font-semibold text-muted-foreground">Carrera · core</div>
            </div>
          </div>
        </section>

        {/* === SECCIÓN DISPONIBLE: NOTAM === */}
        <section className="mt-8">
          <Link
            to="/app/aerolinea/notam"
            className="group block rounded-2xl border bg-card p-6 sm:p-7 card-apple"
            style={{ borderColor: "color-mix(in oklab, var(--av-blue-500) 40%, transparent)" }}
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "color-mix(in oklab, var(--av-blue-500) 14%, transparent)" }}
                >
                  <FileSearch className="h-6 w-6" style={{ color: "var(--av-blue-500)" }} />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip chip-green text-[11px]">Disponible</span>
                    <span className="text-[12px] text-muted-foreground">
                      Primera sección lista de este módulo
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-[20px] font-extrabold tracking-[-0.02em]">
                    NOTAM: aprende a leerlos y decodificarlos
                  </h3>
                  <p className="mt-1 text-[14px] text-muted-foreground leading-relaxed max-w-[640px]">
                    Lección completa, decodificador de los 246 códigos del Doc 8400 de la OACI,
                    práctica con NOTAM reales de la Aerocivil y evaluación. Leer NOTAM es parte del
                    planeamiento de vuelo y se pregunta en entrevista técnica.
                  </p>
                </div>
              </div>
              <span
                className="inline-flex flex-shrink-0 items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold text-white"
                style={{ background: "var(--av-blue-500)" }}
              >
                Entrar{" "}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </section>

        {/* === 14 TOPICS GRID === */}
        <div className="mt-10 mb-5">
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            Áreas de conocimiento · 14
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
            <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
              Submódulos del sistema · 7
            </div>
            <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
              Cómo vas a entrenar
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />Se abren por partes · NOTAM ya está
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SUBMODULES.map((s) => (
            <FeatureTile key={s.title} {...s} />
          ))}
        </div>

        {/* === CTA === */}
        <section className="mt-10 rounded-2xl border border-border bg-card p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
              style={{ color: "var(--av-blue-500)" }}
            >
              <Sparkles className="h-3 w-3" /> Mientras cargamos el resto del contenido
            </div>
            <h3 className="mt-1.5 text-lg font-bold">
              Adelanta lo que ya puedes tener listo para el día que postules.
            </h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-[680px]">
              La sección NOTAM ya está completa. Además, el match por aerolínea te muestra qué te
              falta para cada una, y tu Logbook y tus vencimientos alimentan tu Pilot ID. El
              simulador de entrevistas y los tests psicotécnicos todavía no tienen contenido
              cargado: los abrimos por partes, como hicimos con NOTAM.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/app/aerolinea/notam"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
              style={{
                background: "var(--av-blue-500)",
              }}
            >
              Empezar con NOTAM <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/app/aerolineas"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold border border-border bg-card hover:bg-muted transition-colors"
            >
              Ver mi match <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/app/logbook"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold border border-border bg-card hover:bg-muted transition-colors"
            >
              Mi Logbook <ArrowRight className="h-3.5 w-3.5" />
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
    description: "Avianca, LATAM, Copa, Wingo, JetSmart, Viva: cada una con su proceso, tips y prep recommendation.",
    bullets: ["Match con tu perfil", "Tiempo típico del proceso", "Recruiter tips reales"],
    link: { to: "/app/aerolineas", label: "Ya disponible: Match" },
  },
]

// ────────────────────────────────────────────────────────────────────────────
// COMPONENTS
// ────────────────────────────────────────────────────────────────────────────

function TopicChip({ name, category, icon: Icon, color }: { name: string; category: string; icon: React.ComponentType<{ className?: string }>; color: ColorKey }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 flex items-center gap-3">
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
        <div className="text-[14px] font-bold tracking-[-0.01em] truncate">{name}</div>
        <div className="text-[12px] font-semibold text-muted-foreground">{category}</div>
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
  // Sin link no hay a donde ir: la tarjeta no debe levantarse con el mouse ni
  // prometer un click que no existe. Se declara "Pronto" y se queda en reposo.
  const disponible = Boolean(link)
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-6 flex flex-col gap-3.5 ${
        disponible ? "card-apple" : ""
      }`}
    >
      <div className="flex items-start gap-3.5">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: `color-mix(in oklab, ${TILE_COLOR[color]} 14%, transparent)`,
            border: `1px solid color-mix(in oklab, ${TILE_COLOR[color]} 32%, transparent)`,
            color: TILE_COLOR[color],
            opacity: disponible ? 1 : 0.55,
          }}
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <div className="flex-1 pt-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-[16px] font-bold tracking-[-0.01em]">{title}</div>
            {!disponible && <span className="chip text-[10px]">Pronto</span>}
          </div>
          <p className="mt-0.5 text-[14px] text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
      <ul className="space-y-1.5 pl-1">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-[14px] text-foreground/90">
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
