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
    <section className="relative py-20 sm:py-28 bg-background">
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <Reveal>
            <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
              Planes
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05]">
              Precios pensados para piloto en formación
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-3 text-[16px] text-muted-foreground leading-relaxed">
              Empezás gratis. Pagás solo si te ayuda a llegar a tu meta.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 lg:items-stretch">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div
                className="relative h-full rounded-2xl border bg-card p-7 flex flex-col transition-all hover:-translate-y-0.5"
                style={{
                  borderColor: p.highlight
                    ? "color-mix(in oklab, var(--av-blue-500) 55%, transparent)"
                    : "var(--border)",
                  boxShadow: p.highlight ? "0 8px 30px color-mix(in oklab, var(--av-blue-500) 14%, transparent)" : undefined,
                }}
              >
                {p.highlight && (
                  <Badge
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 text-white border-0"
                    style={{ background: "var(--av-blue-500)" }}
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Recomendado
                  </Badge>
                )}
                {p.badge && !p.highlight && (
                  <Badge variant="secondary" className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3">
                    {p.badge}
                  </Badge>
                )}

                <div>
                  <h3 className="text-[15px] font-bold tracking-[-0.01em]">{p.name}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold tracking-[-0.03em]">{p.price}</span>
                    {p.periodSub && (
                      <span className="text-[13px] text-muted-foreground">{p.periodSub}</span>
                    )}
                  </div>
                  <p className="mt-1 text-[12px] text-muted-foreground">{p.period}</p>
                  <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <ul className="mt-7 space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[14px]">
                      <Check className="h-[18px] w-[18px] flex-shrink-0 mt-0.5" style={{ color: "var(--av-blue-500)" }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="lg"
                  variant={p.highlight ? "default" : "outline"}
                  className="mt-7 w-full rounded-xl h-11 text-[15px]"
                  style={p.highlight ? { background: "var(--av-blue-500)" } : undefined}
                >
                  <Link to={p.href}>{p.cta}</Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-10">
            <Link
              to="/pricing"
              className="text-[14px] font-semibold hover:underline"
              style={{ color: "var(--av-blue-500)" }}
            >
              Comparar todos los planes en detalle →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
