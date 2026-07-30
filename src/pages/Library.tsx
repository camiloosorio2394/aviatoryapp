import { Link } from "react-router-dom"
import {
  BookOpen,
  ListChecks,
  FileText,
  TrendingUp,
  Scale,
  Mic,
  Lightbulb,
  Users,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Check,
  Clock,
  Library as LibraryIcon,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"

/**
 * Módulo Biblioteca Operacional.
 * 9 categorías: manuales, SOPs, quick refs, performance tools, W&B,
 * briefings, checklist philosophy, CRM/TEM cases, accident studies.
 * Backend: library_categories, library_items, user_library_bookmarks,
 * user_library_views.
 */
export function Library() {
  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <section className="anim-fade-up relative overflow-hidden rounded-2xl border border-border bg-card p-7 sm:p-8">
          <div className="relative grid items-center gap-8" style={{ gridTemplateColumns: "1fr auto" }}>
            <div>
              <div
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  color: "var(--av-blue-500)",
                  background: "color-mix(in oklab, var(--av-blue-500) 10%, transparent)",
                  border: "1px solid color-mix(in oklab, var(--av-blue-500) 28%, transparent)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--av-amber-400)" }}
                />
                Módulo biblioteca · backend listo · contenido en construcción
              </div>
              <h1 className="mt-4 mb-1.5 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-foreground leading-[1.05]">
                Biblioteca Operacional,{" "}
                <span style={{ color: "var(--av-blue-500)" }}>
                  útil incluso cuando no estás estudiando
                </span>
              </h1>
              <p className="text-[18px] text-muted-foreground max-w-[680px] mt-3 leading-relaxed">
                <strong className="text-foreground">9 categorías</strong> de contenido operacional para
                consultar día a día: manuales, SOPs, QRH, performance tools, W&amp;B, briefings,
                checklist philosophy, casos CRM/TEM y accident case studies. La diferencia entre
                "una app más" y "la app que abrís todos los días".
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 pr-2">
              <div
                className="flex items-center justify-center w-[120px] h-[120px] rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))",
                }}
              >
                <LibraryIcon className="h-14 w-14 text-white" strokeWidth={1.5} />
              </div>
              <div className="text-[13px] font-semibold text-muted-foreground">Consulta · engage</div>
            </div>
          </div>
        </section>

        {/* === 9 CATEGORÍAS === */}
        <div className="mt-10 mb-5 flex items-end justify-between">
          <div>
            <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
              Categorías · 9
            </div>
            <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
              Todo lo que vas a poder consultar
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />Carga gradual · prioridad Avianca/LATAM/Copa
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <CategoryTile key={c.slug} {...c} />
          ))}
        </div>

        {/* === CTA === */}
        <section className="mt-10 rounded-2xl border border-border bg-card p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
              style={{ color: "var(--av-blue-500)" }}
            >
              <Sparkles className="h-3 w-3" /> Aporta tu material
            </div>
            <h3 className="mt-1.5 text-lg font-bold">
              ¿Tienes manuales/SOPs/quick references que aportar?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-[680px]">
              Aporta material y se lo damos al resto de la comunidad (con tu crédito si quieres).
              Solo material no-propietario o de dominio público: el equipo revisa antes de publicar.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/app/comunidad"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--av-blue-500)" }}
            >
              Comunidad #biblioteca <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}

// ────────────────────────────────────────────────────────────────────────────
type ColorKey = "cyan" | "blue" | "violet" | "amber" | "green" | "red"
const TILE_COLOR: Record<ColorKey, string> = {
  cyan: "#0E7490",
  blue: "var(--av-blue-500)",
  violet: "#7C3AED",
  amber: "#B45309",
  green: "#047857",
  red: "var(--av-red-400)",
}

interface CategoryProps {
  slug: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  color: ColorKey
  bullets: string[]
}

const CATEGORIES: CategoryProps[] = [
  {
    slug: "manuales",
    name: "Manuales",
    icon: BookOpen,
    color: "cyan",
    description: "FCOM, AFM, manuales operacionales por aeronave.",
    bullets: ["A320 family", "B737NG / MAX", "ATR 42/72", "Genéricos PPL/CPL"],
  },
  {
    slug: "sops",
    name: "SOPs",
    icon: ListChecks,
    color: "blue",
    description: "Standard Operating Procedures por aerolínea.",
    bullets: ["Avianca / LATAM / Copa SOPs", "Flow patterns", "Callouts esperados"],
  },
  {
    slug: "quick_refs",
    name: "Quick References",
    icon: FileText,
    color: "amber",
    description: "QRH, emergency checklists, abnormal procedures.",
    bullets: ["QRH por aeronave", "Emergency memory items", "Abnormal flowcharts"],
  },
  {
    slug: "performance",
    name: "Performance Tools",
    icon: TrendingUp,
    color: "green",
    description: "Calculadoras de despegue, aterrizaje, ascenso.",
    bullets: ["TOLD interactive", "Climb/cruise/descent", "Engine-out planning"],
  },
  {
    slug: "w_and_b",
    name: "Weight & Balance",
    icon: Scale,
    color: "violet",
    description: "Tools de cálculo W&B por aeronave.",
    bullets: ["Calculadora interactiva", "Templates por aeronave", "Validación CG envelope"],
  },
  {
    slug: "briefings",
    name: "Briefings",
    icon: Mic,
    color: "cyan",
    description: "Templates de briefing pre-vuelo, takeoff, approach.",
    bullets: ["Pre-flight briefing", "Takeoff briefing template", "Approach briefing guidelines"],
  },
  {
    slug: "checklist_philosophy",
    name: "Checklist Philosophy",
    icon: Lightbulb,
    color: "blue",
    description: "Por qué se hacen los checks como se hacen: flow patterns.",
    bullets: ["Origen de cada checklist", "Read & verify vs do & verify", "Common errors"],
  },
  {
    slug: "crm_tem_cases",
    name: "CRM / TEM Cases",
    icon: Users,
    color: "violet",
    description: "Casos reales de CRM y TEM para discusión.",
    bullets: ["Casos clásicos comentados", "Discussion prompts", "Lessons learned por caso"],
  },
  {
    slug: "accident_studies",
    name: "Accident Case Studies",
    icon: AlertTriangle,
    color: "red",
    description: "NTSB, BEA, AAIB: qué aprender de cada accidente.",
    bullets: ["Reports oficiales linkeados", "Resumen pedagógico", "TEM/CRM takeaways"],
  },
]

function CategoryTile({ icon: Icon, color, name, description, bullets }: CategoryProps) {
  return (
    <div className="card-hover rounded-2xl border border-border bg-card p-6 flex flex-col gap-3.5">
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
          <div className="text-[16px] font-bold tracking-[-0.01em]">{name}</div>
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
    </div>
  )
}
