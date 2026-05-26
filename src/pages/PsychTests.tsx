import { Link } from "react-router-dom"
import {
  Brain,
  Eye,
  Layers,
  Activity,
  Sparkles,
  ArrowRight,
  Check,
  Clock,
  Cpu,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"

/**
 * Módulo Psicotécnicas — preparación para tests psicotécnicos de aerolínea.
 */
export function PsychTests() {
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
                MÓDULO PSICOTÉCNICAS · EARLY ACCESS · ETA Q4 2026
              </div>
              <h1 className="mt-4 mb-1.5 text-[42px] font-extrabold tracking-[-0.04em] text-white leading-[1.05]">
                Psicotécnicas,{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, var(--av-cyan-300), white)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  entrenadas como el simulador
                </span>
              </h1>
              <p className="text-[17px] text-white/75 max-w-[640px] mt-3 leading-relaxed">
                Los tests psicotécnicos son entrenables — pero solo si practicas el formato exacto
                que usa cada aerolínea. Vamos a tener baterías de razonamiento espacial, atención
                dividida, memoria de trabajo y coordinación psicomotriz, con métricas de progreso
                para que llegues al día del test sin sorpresas.
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
                <Cpu className="h-14 w-14 text-white" strokeWidth={1.5} />
              </div>
              <div className="mono text-[10px] tracking-[0.16em] text-white/50">COGNITIVO</div>
            </div>
          </div>
        </section>

        <div className="mt-10 mb-5 flex items-end justify-between">
          <div>
            <div className="mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--av-cyan-400)]">
              ROADMAP DEL MÓDULO
            </div>
            <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
              Baterías de entrenamiento
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground mono">
            <Clock className="h-3.5 w-3.5" />4 áreas · liberación gradual
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FeatureTile
            icon={Eye}
            color="cyan"
            title="Razonamiento espacial"
            description="Compass test, mental rotation, instruments interpretation. Las baterías más temidas porque no las entrenan en el curso de PPL — pero sí se entrenan con repetición correcta."
            bullets={[
              "Compass / heading interpretation drills",
              "3D mental rotation con feedback instantáneo",
              "Bank/pitch attitude reading bajo presión",
            ]}
          />
          <FeatureTile
            icon={Layers}
            color="blue"
            title="Atención dividida"
            description="Ejercicios multi-task que simulan estar atendiendo radio, instrumentos, navegación y ATC al mismo tiempo. Mejora real de capacidad mental bajo carga."
            bullets={[
              "Doble + triple task con timers",
              "Auditory + visual stimuli combinados",
              "Métrica de degradación bajo fatiga",
            ]}
          />
          <FeatureTile
            icon={Brain}
            color="violet"
            title="Memoria de trabajo"
            description="Secuencias numéricas, alfa-numéricas, ATC clearances completos. Si ya te has quedado en blanco cuando el controller te dispara una clearance larga, este módulo es para ti."
            bullets={[
              "Digit span forward/backward",
              "ATC clearance recall (real audio)",
              "Métrica de span máximo + accuracy",
            ]}
          />
          <FeatureTile
            icon={Activity}
            color="green"
            title="Coordinación psicomotriz"
            description="Tiempo de reacción, hand-eye coordination, control under stress. Los tests tipo DLR que LATAM usa en su evaluación final."
            bullets={[
              "Reaction time tracking + percentiles",
              "Simple, choice, complex reaction",
              "Comparación con el promedio de pilotos contratados",
            ]}
          />
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
              <Sparkles className="h-3 w-3" /> Cómo aportar
            </div>
            <h3 className="mt-1.5 text-lg font-bold">
              ¿Ya pasaste por psicotécnicas de Avianca, LATAM o Copa?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-[640px]">
              Comparte en la comunidad qué tests cayeron, qué duración, qué formato. Esa
              data nos ayuda a calibrar los simuladores para que estén lo más cerca posible
              de lo real.
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
              Ir a #psicotecnicas <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/app/aerolinea"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-semibold border border-border bg-card hover:bg-muted transition-colors"
            >
              Ver Ingreso a Aerolínea <ArrowRight className="h-3.5 w-3.5" />
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
      style={{ borderColor: "color-mix(in oklab, var(--border) 65%, transparent)" }}
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
