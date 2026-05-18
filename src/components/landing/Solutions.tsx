import { Brain, Compass, Globe2, Plane, BookOpen, Sparkles } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { TiltCard } from "@/components/TiltCard"

export function Solutions() {
  return (
    <section className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -translate-y-1/2 mx-auto h-[500px] max-w-4xl bg-[radial-gradient(closest-side,_var(--tw-gradient-stops))] from-blue-300/15 via-transparent to-transparent dark:from-blue-500/10"
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Reveal>
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              La solución
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-balance leading-[0.98]">
              Una plataforma para todo lo que
              <br />
              <span className="text-gradient-blue">te separa de la cabina.</span>
            </h2>
          </Reveal>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 lg:gap-6 auto-rows-[minmax(220px,auto)]">
          {/* HERO CARD — Plan personalizado */}
          <Reveal as="div" className="md:col-span-4 md:row-span-2" delay={0}>
            <BentoCard
              title="Tu plan, personalizado"
              description="Cargas tu etapa, horas y aerolínea objetivo. Aviatory arma tu ruta semana a semana: qué examen primero, qué materias dominar, cuándo presentar."
              gradient="from-blue-600 to-blue-800"
              icon={Compass}
              tall
              visual={<PlanVisual />}
            />
          </Reveal>

          {/* Tutor IA */}
          <Reveal as="div" className="md:col-span-2" delay={80}>
            <BentoCard
              title="Wingman IA"
              description="Tu tutor personal te explica cada pregunta que fallas. En español, con la teoría de tu materia y un tip para recordar."
              icon={Brain}
              accent="from-indigo-500 to-blue-600"
              compact
            />
          </Reveal>

          {/* ICAO */}
          <Reveal as="div" className="md:col-span-2" delay={160}>
            <BentoCard
              title="Inglés ICAO 4+"
              description="El único curso de inglés aeronáutico pensado para hispanohablantes. Práctica oral, vocabulario, simulacros."
              icon={Globe2}
              accent="from-cyan-500 to-blue-500"
              compact
            />
          </Reveal>

          {/* Banco preguntas */}
          <Reveal as="div" className="md:col-span-3" delay={240}>
            <BentoCard
              title="Banco oficial Aerocivil"
              description="Preguntas estilo examen PCA con explicaciones detalladas. Practica por materia o simulacros con tiempo real."
              icon={BookOpen}
              accent="from-blue-500 to-blue-700"
            />
          </Reveal>

          {/* Aerolíneas */}
          <Reveal as="div" className="md:col-span-3" delay={320}>
            <BentoCard
              title="Requisitos por aerolínea"
              description="Avianca, LATAM, Copa, Wingo, JetSmart. Sabes exactamente qué te falta para postular a cada una."
              icon={Plane}
              accent="from-blue-600 to-violet-600"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

interface BentoCardProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  gradient?: string
  accent?: string
  compact?: boolean
  tall?: boolean
  visual?: React.ReactNode
}

function BentoCard({
  title,
  description,
  icon: Icon,
  gradient,
  accent = "from-blue-500 to-blue-700",
  compact = false,
  tall = false,
  visual,
}: BentoCardProps) {
  const isHero = !!gradient

  return (
    <TiltCard
      intensity={isHero ? 3 : 4}
      className={`group relative h-full rounded-3xl overflow-hidden ${
        isHero
          ? `bg-gradient-to-br ${gradient} text-white p-8 sm:p-10 shadow-2xl shadow-blue-500/30 ring-1 ring-white/10`
          : "card-elevated p-7"
      }`}
    >
      {/* Decorative glow */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-gradient-to-br ${
          isHero ? "from-white/30 to-transparent" : accent + " opacity-0 group-hover:opacity-10"
        } blur-3xl transition-opacity duration-700`}
      />

      <div className="relative flex flex-col h-full">
        <div
          className={`inline-flex items-center justify-center h-12 w-12 rounded-2xl ${
            isHero
              ? "bg-white/15 backdrop-blur-md text-white"
              : `bg-gradient-to-br ${accent} text-white shadow-lg shadow-blue-500/20`
          } transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
        >
          <Icon className="h-6 w-6" />
        </div>

        <div className={tall ? "mt-7" : "mt-5"}>
          <h3
            className={`font-bold tracking-tight ${
              isHero
                ? "text-2xl sm:text-3xl lg:text-4xl"
                : compact
                  ? "text-lg"
                  : "text-xl sm:text-2xl"
            }`}
          >
            {title}
          </h3>
          <p
            className={`mt-3 leading-relaxed ${
              isHero
                ? "text-blue-100 text-base sm:text-lg max-w-md"
                : compact
                  ? "text-sm text-muted-foreground"
                  : "text-base text-muted-foreground"
            }`}
          >
            {description}
          </p>
        </div>

        {visual && <div className="mt-auto pt-8">{visual}</div>}
      </div>
    </TiltCard>
  )
}

function PlanVisual() {
  const items = [
    { label: "Esta semana", value: "Meteorología — temas 4 al 7", state: "active" },
    { label: "Próxima semana", value: "Reglamento — RAC 60 a 91", state: "upcoming" },
    { label: "Hito en 21 días", value: "Examen PCA Meteo", state: "milestone" },
  ]
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4 sm:p-5 space-y-3">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <div
            className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 ${
              item.state === "active"
                ? "bg-white text-blue-700"
                : item.state === "milestone"
                  ? "bg-blue-300/40 text-white border border-white/40"
                  : "bg-white/15 text-white/80"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-blue-100">{item.label}</div>
            <div className="text-sm font-medium truncate">{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
