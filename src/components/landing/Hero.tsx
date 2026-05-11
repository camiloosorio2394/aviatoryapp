import { Link } from "react-router-dom"
import { ArrowRight, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 sm:pt-28 sm:pb-40">
      {/* Subtle gradient bg */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/60 via-background to-background dark:from-blue-950/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[600px] max-w-5xl bg-[radial-gradient(closest-side,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent dark:from-blue-500/10"
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <Badge variant="secondary" className="mb-6 rounded-full px-4 py-1.5 text-xs">
            🛫 Plataforma para pilotos LATAM
          </Badge>
        </div>

        <h1 className="animate-fade-in-up [animation-delay:100ms] text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.05]">
          De estudiante piloto
          <br />
          a <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">candidato de aerolínea</span>.
        </h1>

        <p className="animate-fade-in-up [animation-delay:200ms] mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
          Prepara tus exámenes PPL/CPL Aerocivil, mejora tu inglés ICAO y avanza
          paso a paso hacia tu primer empleo en aerolínea. Todo en español.
        </p>

        <div className="animate-fade-in-up [animation-delay:300ms] mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="btn-apple shine-on-hover rounded-full text-base px-8 h-12 border-0">
            <Link to="/login?mode=signup">
              Empezar 7 días gratis
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" className="btn-apple-ghost rounded-full text-base px-6 h-12">
            <a href="#como-funciona">
              <PlayCircle className="mr-2 h-5 w-5" />
              Ver cómo funciona
            </a>
          </Button>
        </div>

        <p className="animate-fade-in-up [animation-delay:400ms] mt-6 text-sm text-muted-foreground">
          Sin tarjeta de crédito · Cancelá cuando quieras
        </p>

        {/* Visual placeholder — dashboard mockup */}
        <div className="animate-fade-in-up [animation-delay:500ms] mt-20 relative">
          <div className="relative mx-auto max-w-5xl">
            <div className="rounded-2xl border border-border/60 bg-card shadow-2xl shadow-blue-500/10 overflow-hidden">
              <div className="bg-muted/40 px-4 py-2.5 border-b border-border/60 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/70" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <div className="h-3 w-3 rounded-full bg-green-500/70" />
                </div>
                <div className="ml-4 text-xs text-muted-foreground font-mono">aviatory.app/dashboard</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-gradient-to-br from-background to-muted/30">
                <DashCard label="Tu progreso a aerolínea" value="47%" sub="+12% este mes" accent />
                <DashCard label="Próximo paso" value="Meteorología" sub="12 preguntas pendientes" />
                <DashCard label="Días estudiando" value="14" sub="Tu mejor racha 🔥" />
              </div>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-blue-600/20 via-transparent to-blue-400/20 blur-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function DashCard({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string
  value: string
  sub: string
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-xl border p-5 text-left transition-transform hover:-translate-y-0.5 ${
        accent
          ? "border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20"
          : "border-border/60 bg-card"
      }`}
    >
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className={`mt-2 text-3xl font-bold tracking-tight ${accent ? "text-blue-600 dark:text-blue-400" : ""}`}>
        {value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </div>
  )
}
