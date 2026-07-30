import { Link } from "react-router-dom"
import {
  Users,
  Wrench,
  Video,
  Mic,
  Brain,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Activity,
  ListChecks,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { TILE_COLOR, tileTint, tileBorder, type TileColorKey } from "@/lib/tileColors"

/**
 * Módulo Simulador de Entrevistas — separado del módulo "Ingreso a Aerolínea"
 * porque tiene su propia evolución (audio/video AI feedback).
 * Categorías: HR, Technical, Video Interview AI.
 *
 * Hoy lo único que existe es Intro Speaking. Las 3 categorías y las métricas de
 * feedback IA se declaran con chip "Pronto" y se quedan en reposo.
 */
export function InterviewSim() {
  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <section className="anim-fade-up relative overflow-hidden rounded-2xl border border-border bg-card p-7 sm:p-8">
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
                Módulo entrevistas · Solo Intro Speaking disponible
              </div>
              <h1 className="mt-4 mb-1.5 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.05]">
                Simulador de Entrevistas, practica antes de que cuente
              </h1>
              <p className="text-[18px] text-muted-foreground max-w-[680px] mt-3 leading-relaxed">
                Lo separamos de Ingreso a Aerolínea porque tiene su propia evolución técnica:
                grabación de audio y video, transcripción y feedback IA de comunicación. Van a ser{" "}
                <strong className="text-foreground">3 categorías</strong>: HR Interview, Technical
                Interview y Video Interview con análisis de claridad, muletillas, pace y contenido.
              </p>
              <div className="mt-5">
                <Link
                  to="/app/icao"
                  className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--av-blue-500)" }}
                >
                  Mientras tanto, practica speaking en inglés ICAO{" "}
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
                <Video className="h-14 w-14 text-white" strokeWidth={1.5} />
              </div>
              <div className="text-[13px] font-semibold text-muted-foreground">Práctica</div>
            </div>
          </div>
        </section>

        {/* === CTA destacado: Intro Speaking (lo único activo hoy) === */}
        <Link
          to="/app/entrevistas/speaking"
          className="mt-8 block rounded-2xl border p-5 transition-all hover:-translate-y-0.5"
          style={{
            borderColor: "color-mix(in oklab, var(--av-amber-400) 38%, transparent)",
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--av-amber-400) 10%, transparent) 0%, color-mix(in oklab, var(--av-amber-400) 4%, transparent) 100%)",
          }}
        >
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div
              className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: "color-mix(in oklab, var(--av-amber-400) 20%, transparent)",
                border: "1px solid color-mix(in oklab, var(--av-amber-400) 40%, transparent)",
                color: "var(--av-amber-400)",
              }}
            >
              <Mic className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="chip chip-amber">Ya disponible</span>
              <div className="mt-1.5 text-[17px] font-extrabold tracking-[-0.01em]">
                Intro Speaking · 15 preguntas que toda aerolínea hace al inicio
              </div>
              <p className="mt-0.5 text-[14px] text-muted-foreground leading-relaxed">
                Cada pregunta con su intención, topics esperados y follow-ups. Practica en
                voz alta antes de pasar al técnico.
              </p>
            </div>
            <div
              className="flex-shrink-0 sm:mt-2 inline-flex items-center gap-1 text-[13.5px] font-semibold"
              style={{ color: "var(--av-blue-500)" }}
            >
              <ListChecks className="h-3.5 w-3.5" /> Abrir <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </Link>

        {/* === 3 CATEGORÍAS === */}
        <div className="mt-10 mb-5">
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            Categorías · 3
          </div>
          <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
            Cómo vas a entrenar cada tipo
          </h2>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <CategoryCard
            icon={Users}
            color="cyan"
            type="HR Interview"
            description="Behavioral, motivación, fit cultural, CRM conflict."
            bullets={[
              "Tell me about yourself",
              "Leadership stories",
              "CRM conflict resolution",
              "Decision making bajo presión",
              "Failure management",
            ]}
          />
          <CategoryCard
            icon={Wrench}
            color="blue"
            type="Technical Interview"
            description="Emergencias, meteo, performance, TEM, fuel, alternate."
            bullets={[
              "Emergency scenarios",
              "Meteorología operacional",
              "Performance calc en vivo",
              "TEM applied",
              "Fuel / alternate planning",
            ]}
          />
          <CategoryCard
            icon={Video}
            color="violet"
            type="Video Interview AI"
            description="Grabación + feedback IA de comunicación y delivery."
            bullets={[
              "Grabación audio + video",
              "Transcripción automática",
              "Score claridad / contenido / confianza",
              "Detección de muletillas (uh, este, como que)",
              "Pace (words per minute)",
            ]}
          />
        </div>

        {/* === LO QUE EVALUARÁ LA IA === */}
        <div className="mt-10 mb-5">
          <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
            Evaluación automática
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h2 className="text-[22px] font-extrabold tracking-[-0.02em]">
              Lo que el feedback IA va a medir
            </h2>
            <span className="chip text-[10px]">Pronto</span>
          </div>
        </div>

        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard icon={MessageCircle} color="cyan" title="Claridad" detail="Estructura: intro · contexto · acción · resultado" />
          <MetricCard icon={Activity} color="blue" title="Pace" detail="Words per minute · pausas · silencios" />
          <MetricCard icon={Brain} color="violet" title="Contenido" detail="Cobertura de los topics esperados" />
          <MetricCard icon={Mic} color="amber" title="Muletillas" detail="Conteo y patrón de filler words" />
        </div>

        <section className="mt-10 rounded-2xl border border-border bg-card p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
              style={{ color: "var(--av-blue-500)" }}
            >
              <Sparkles className="h-3 w-3" /> Cómo empezar
            </div>
            <h3 className="mt-1.5 text-lg font-bold">
              ¿Ya estás en proceso con alguna aerolínea?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-[680px]">
              Pásale a Wingman el detalle del proceso (qué aerolínea, qué etapa) y te ayuda con
              preguntas de práctica hasta que el módulo completo esté listo. En la comunidad
              también vas a encontrar pilotos en proceso.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/app/aerolinea"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold text-white border-0 transition-all hover:-translate-y-0.5"
              style={{
                background: "var(--av-blue-500)",
              }}
            >
              Ingreso a Aerolínea <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/app/comunidad"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold border border-border bg-card hover:bg-muted transition-colors"
            >
              Comunidad <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}

// ────────────────────────────────────────────────────────────────────────────
/**
 * Categoría del módulo. Ninguna de las 3 está abierta todavía: sin lift, icono
 * desaturado, chip "Pronto" y bullets con punto neutro (un PlayCircle prometía
 * reproducir algo que no existe).
 */
function CategoryCard({ icon: Icon, color, type, description, bullets }: { icon: React.ComponentType<{ className?: string }>; color: TileColorKey; type: string; description: string; bullets: string[] }) {
  return (
    <div
      className="rounded-2xl border bg-card p-6 flex flex-col gap-3.5"
      style={{ borderColor: tileBorder(color, 20) }}
    >
      <div className="flex items-center gap-3.5">
        <div
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: tileTint(color),
            border: `1px solid ${tileBorder(color, 32)}`,
            color: TILE_COLOR[color],
            opacity: 0.55,
          }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-[17px] font-extrabold tracking-[-0.02em]">{type}</div>
            <span className="chip text-[10px]">Pronto</span>
          </div>
          <div className="text-[14px] text-muted-foreground">{description}</div>
        </div>
      </div>
      <ul className="space-y-1.5 pl-1 pt-1">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-[14px] text-muted-foreground">
            <span
              aria-hidden="true"
              className="flex-shrink-0 mt-[7px] h-1.5 w-1.5 rounded-full"
              style={{ background: "color-mix(in oklab, var(--muted-foreground) 55%, transparent)" }}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function MetricCard({ icon: Icon, color, title, detail }: { icon: React.ComponentType<{ className?: string }>; color: TileColorKey; title: string; detail: string }) {
  return (
    <div
      className="rounded-2xl border bg-card p-4 flex items-start gap-3"
      style={{ borderColor: "color-mix(in oklab, var(--border) 65%, transparent)" }}
    >
      <div
        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
        style={{
          background: tileTint(color),
          color: TILE_COLOR[color],
          opacity: 0.55,
        }}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-bold tracking-[-0.01em]">{title}</div>
        <p className="mt-0.5 text-[13.5px] text-muted-foreground leading-snug">{detail}</p>
      </div>
    </div>
  )
}
