import { Link } from "react-router-dom"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/Reveal"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "para siempre",
    description: "Prueba la plataforma sin compromiso.",
    features: [
      "Perfil de piloto + dashboard básico",
      "30 preguntas Aerocivil al mes",
      "Vista de tu ruta de carrera",
      "Acceso a la comunidad",
    ],
    cta: "Comenzar gratis",
    href: "/login?mode=signup",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$39.000",
    periodSub: "COP / mes",
    period: "o $390.000 anual (2 meses gratis)",
    description: "Todo lo que necesitas para llegar a aerolínea.",
    features: [
      "Banco Aerocivil ilimitado + simulacros",
      "Tutor IA Wingman con explicaciones",
      "Inglés ICAO completo",
      "Requisitos por aerolínea LATAM",
      "Alertas de vencimientos",
      "Soporte por WhatsApp",
    ],
    cta: "Comenzar 7 días gratis",
    href: "/login?mode=signup&plan=pro",
    highlight: true,
  },
  {
    name: "Founder",
    price: "$599.000",
    period: "pago único · solo 100 cupos",
    description: "Acceso de por vida + comunidad fundadora.",
    features: [
      "Todo lo de Pro, para siempre",
      "Comunidad privada con fundadores",
      "Sesiones 1-a-1 con el equipo",
      "Voto en el roadmap de features",
      "Badge Founder en tu perfil",
    ],
    cta: "Reservar mi cupo",
    href: "/login?mode=signup&plan=founder",
    highlight: false,
    badge: "Solo 100 cupos",
  },
]

export function PricingPreview() {
  return (
    <section className="relative py-24 sm:py-32 section-soft overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[600px] max-w-5xl bg-[radial-gradient(closest-side,_var(--tw-gradient-stops))] from-blue-300/20 via-transparent to-transparent dark:from-blue-500/10"
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Planes
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-balance leading-[0.98]">
              Precios pensados
              <br />
              <span className="text-gradient-blue">para piloto en formación.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg text-muted-foreground text-balance">
              Empiezas gratis. Pagas solo si te ayuda a llegar a tu meta.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid lg:grid-cols-3 gap-6 lg:gap-8 lg:items-start">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div
                className={`relative h-full rounded-3xl p-8 transition-all duration-500 ${
                  p.highlight
                    ? "glass-blue halo-pulse text-white scale-100 lg:scale-105"
                    : "bg-card/80 backdrop-blur-sm border border-border/60 card-apple"
                }`}
              >
                {p.highlight && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-blue-700 hover:bg-white rounded-full px-3">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Recomendado
                  </Badge>
                )}
                {p.badge && !p.highlight && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3">
                    {p.badge}
                  </Badge>
                )}

                <div>
                  <h3 className={`text-lg font-semibold ${p.highlight ? "text-blue-100" : ""}`}>
                    {p.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-bold tracking-tight">{p.price}</span>
                    {p.periodSub && (
                      <span
                        className={`text-sm ${
                          p.highlight ? "text-blue-100" : "text-muted-foreground"
                        }`}
                      >
                        {p.periodSub}
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-1 text-xs ${
                      p.highlight ? "text-blue-200" : "text-muted-foreground"
                    }`}
                  >
                    {p.period}
                  </p>
                  <p
                    className={`mt-4 text-sm ${
                      p.highlight ? "text-blue-100" : "text-muted-foreground"
                    }`}
                  >
                    {p.description}
                  </p>
                </div>

                <ul className="mt-8 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm">
                      <Check
                        className={`h-5 w-5 flex-shrink-0 ${
                          p.highlight ? "text-blue-200" : "text-blue-600 dark:text-blue-400"
                        }`}
                      />
                      <span className={p.highlight ? "text-blue-50" : ""}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="lg"
                  className={`mt-8 w-full rounded-full h-12 text-base border-0 ${
                    p.highlight
                      ? "btn-apple-light shine-on-hover"
                      : "btn-apple shine-on-hover"
                  }`}
                >
                  <Link to={p.href}>{p.cta}</Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div className="mt-12 text-center">
            <Link
              to="/pricing"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Comparar todos los planes en detalle →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
