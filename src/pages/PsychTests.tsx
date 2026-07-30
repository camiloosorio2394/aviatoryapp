import { Link } from "react-router-dom"
import {
  Brain,
  Eye,
  Layers,
  Activity,
  Sparkles,
  ArrowRight,
  Check,
  Cpu,
  Sigma,
  Compass,
  Users,
  UserCheck,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { TILE_COLOR, tileTint, tileBorder, type TileColorKey } from "@/lib/tileColors"

/**
 * Módulo Psicotécnicos y Assessment — separado completamente de entrevistas.
 * 9 categorías: atención dividida, memoria operacional, multitasking, lógica,
 * espacial, coordinación, cognitivos, dinámicas grupales, personality tests.
 * Plus simulaciones tipo COMPASS / CUT-E / PILAPT.
 *
 * Hoy no hay ni una batería cargada, así que la pantalla no puede fingir que sí:
 * cada tarjeta va con chip "Pronto", icono en reposo y sin hover. La única acción
 * real de la pantalla es el banco PCA, que sí existe.
 */
export function PsychTests() {
  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <section className="anim-fade-up relative overflow-hidden rounded-2xl surface p-7 sm:p-8">
          <div className="relative grid items-center gap-8 grid-cols-1 md:grid-cols-[1fr_auto]">
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
                Módulo psicotécnicas · En construcción
              </div>
              <h1 className="mt-4 mb-1.5 text-3xl sm:text-4xl font-semibold tracking-[-0.03em] leading-[1.05]">
                Psicotécnicos y Assessment,{" "}
                <span style={{ color: "var(--av-blue-500)" }}>
                  entrenables, no innatos
                </span>
              </h1>
              <p className="text-[18px] text-muted-foreground max-w-[680px] mt-3 leading-relaxed">
                Las aerolíneas manejan assessment, aptitude, psychometric y group dynamics como un
                proceso aparte de las entrevistas. Estamos construyendo{" "}
                <strong className="text-foreground">9 categorías</strong> de baterías y simuladores
                compatibles con los engines más usados
                (<strong className="text-foreground">COMPASS, CUT-E, PILAPT</strong>).
                Diferencial real: te entrenamos en formatos específicos, no en tests genéricos.
              </p>
              <div className="mt-5">
                <Link
                  to="/app/pca"
                  className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--av-blue-500)" }}
                >
                  Mientras tanto, entrena razonamiento en el banco PCA{" "}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <div className="hidden md:flex flex-col items-center gap-3 pr-2">
              <div
                className="flex items-center justify-center w-[120px] h-[120px] rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))",
                }}
              >
                <Cpu className="h-14 w-14 text-white" strokeWidth={1.5} />
              </div>
              <div className="text-[13px] font-semibold text-muted-foreground">Cognitivo</div>
            </div>
          </div>
        </section>

        {/* === 9 CATEGORÍAS === */}
        <div className="mt-10 mb-5">
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            Categorías · 9
          </div>
          <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">
            Las 9 baterías que vas a entrenar
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground max-w-[680px]">
            Ninguna está abierta todavía. Esta es la hoja de ruta del módulo, en orden de prioridad.
          </p>
        </div>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.slug} {...c} />
          ))}
        </div>

        {/* === ENGINES === */}
        <div className="mt-10 mb-5">
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            Engines soportados
          </div>
          <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">
            Simuladores compatibles con los tests reales
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground max-w-[680px]">
            Las aerolíneas tercerizan psicotécnicas a 3 grandes proveedores. Vamos a replicar sus
            formatos para que cuando hagas el real, no haya sorpresa.
          </p>
        </div>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <EngineCard
            name="COMPASS"
            description="Computerised Pilot Aptitude Screening System. Usado por LATAM, Lufthansa, otras."
            features={["Spatial orientation", "Math & reasoning", "Multi-tasking", "Memory"]}
          />
          <EngineCard
            name="CUT-E (Aon)"
            description="Suite de tests cognitivos. Usado por Avianca y muchas low-cost europeas."
            features={["Aptitude scales", "Personality (PILOT)", "Logical reasoning", "Numerical"]}
          />
          <EngineCard
            name="PILAPT"
            description="Pilot Aptitude Test. Estándar para hand-eye y spatial. Copa y otras lo usan."
            features={["Coordination", "Mental rotation", "Reaction time", "Instrument reading"]}
          />
        </div>

        {/* === CTA === */}
        <section className="mt-10 rounded-2xl surface p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
              style={{ color: "var(--av-blue-500)" }}
            >
              <Sparkles className="h-3 w-3" /> Aporta datos para calibrar
            </div>
            <h3 className="mt-1.5 text-lg font-semibold">
              ¿Ya pasaste por psicotécnicas de Avianca, LATAM o Copa?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-[680px]">
              Reporta en la comunidad qué tests cayeron, duración y formato: esa data ajusta los
              simuladores. Más reportes, simulación más cercana a lo real.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/app/comunidad"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
              style={{
                background: "var(--av-blue-500)",
              }}
            >
              Reportar en #psicotecnicas <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/app/aerolinea"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold surface hover:bg-muted transition-colors"
            >
              Ingreso a Aerolínea <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}

// ────────────────────────────────────────────────────────────────────────────
interface CategoryProps {
  slug: string
  name: string
  family: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: TileColorKey
}

const CATEGORIES: CategoryProps[] = [
  { slug: "atencion_dividida", name: "Atención dividida", family: "Attention", description: "Atender ATC + instrumentos + nav simultáneamente.", icon: Eye, color: "cyan" },
  { slug: "memoria_operacional", name: "Memoria operacional", family: "Memory", description: "Working memory para clearances y secuencias.", icon: Brain, color: "violet" },
  { slug: "multitasking", name: "Multitasking", family: "Attention", description: "Cambio rápido de tarea sin perder calidad.", icon: Layers, color: "blue" },
  { slug: "razonamiento_logico", name: "Razonamiento lógico", family: "Reasoning", description: "Inferencia y resolución de problemas bajo tiempo.", icon: Sigma, color: "amber" },
  { slug: "spatial_awareness", name: "Spatial awareness", family: "Spatial", description: "Orientación 3D, compass test, mental rotation.", icon: Compass, color: "cyan" },
  { slug: "coordinacion", name: "Coordinación psicomotriz", family: "Coordination", description: "Hand-eye, reaction time bajo presión.", icon: Activity, color: "green" },
  { slug: "cognitivos_generales", name: "Cognitivos generales", family: "Cognitive", description: "IQ, verbal, numeric, abstract reasoning.", icon: Cpu, color: "blue" },
  { slug: "dinamicas_grupales", name: "Dinámicas grupales", family: "Dynamics", description: "Group assessment, role-plays, panel discussions.", icon: Users, color: "violet" },
  { slug: "personality", name: "Personality tests", family: "Personality", description: "Big5, DISC, Hogan: fit cultural para aerolínea.", icon: UserCheck, color: "red" },
]

// ────────────────────────────────────────────────────────────────────────────
/**
 * Tarjeta de categoría. Ninguna batería está cargada, así que la tarjeta se
 * queda en reposo (sin lift, sin cursor de mano) y lo declara con chip "Pronto".
 */
function CategoryCard({ name, family, description, icon: Icon, color }: CategoryProps) {
  return (
    <div
      className="rounded-2xl border bg-card p-5 flex items-start gap-3.5"
      style={{ borderColor: "color-mix(in oklab, var(--border) 65%, transparent)" }}
    >
      <div
        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
        style={{
          background: tileTint(color),
          border: `1px solid ${tileBorder(color, 32)}`,
          color: TILE_COLOR[color],
          opacity: 0.55,
        }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-[15.5px] font-semibold tracking-[-0.01em]">{name}</div>
          <div className="text-[11.5px] font-semibold text-muted-foreground">{family}</div>
          <span className="chip text-[10px]">Pronto</span>
        </div>
        <p className="mt-0.5 text-[14px] text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function EngineCard({ name, description, features }: { name: string; description: string; features: string[] }) {
  return (
    <div className="rounded-2xl surface p-5">
      <div className="flex flex-wrap items-center gap-2">
        <div className="text-[14px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
          {name}
        </div>
        <span className="chip text-[10px]">Pronto</span>
      </div>
      <p className="mt-1.5 text-[14px] text-foreground/85 leading-relaxed">{description}</p>
      <ul className="mt-3 space-y-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-1.5 text-[13.5px] text-foreground/90">
            <Check className="flex-shrink-0 mt-0.5 h-3 w-3" style={{ color: "var(--av-blue-500)", opacity: 0.6 }} strokeWidth={3} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
