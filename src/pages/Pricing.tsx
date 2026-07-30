import { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Check, Sparkles, X } from "lucide-react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { track, Events } from "@/lib/analytics"

type Billing = "monthly" | "annual"

const tiers = [
  {
    name: "Free",
    description: "Prueba la plataforma sin compromiso.",
    monthly: { price: "$0", suffix: "/ mes", note: "Para siempre, sin tarjeta." },
    annual: { price: "$0", suffix: "/ año", note: "Para siempre, sin tarjeta." },
    cta: "Empezar gratis",
    href: "/login?mode=signup",
    highlight: false,
  },
  {
    name: "Pro",
    description: "Todo lo que necesitas para llegar a aerolínea.",
    monthly: { price: "$39.000", suffix: "COP / mes", note: "Equivale a $9.99 USD" },
    annual: { price: "$390.000", suffix: "COP / año", note: "2 meses gratis vs mensual" },
    cta: "Empezar 7 días gratis",
    href: "/login?mode=signup&plan=pro",
    highlight: true,
  },
  {
    name: "Pro+",
    description: "Pro + Wingman IA ilimitado + mock interview con voz.",
    monthly: { price: "$79.000", suffix: "COP / mes", note: "Equivale a $19.99 USD" },
    annual: { price: "$790.000", suffix: "COP / año", note: "2 meses gratis vs mensual" },
    cta: "Probar Pro+ gratis",
    href: "/login?mode=signup&plan=pro_plus",
    highlight: false,
    badge: "Más AI",
  },
  {
    name: "Founder",
    description: "Acceso Pro+ de por vida + comunidad fundadora.",
    monthly: { price: "$599.000", suffix: "COP · pago único", note: "Solo 100 cupos · ~$149 USD" },
    annual: { price: "$599.000", suffix: "COP · pago único", note: "Solo 100 cupos · ~$149 USD" },
    cta: "Reservar mi cupo",
    href: "/login?mode=signup&plan=founder",
    highlight: false,
    badge: "Solo 100 cupos",
  },
]

type Cell = boolean | string

type Feature = {
  category: string
  rows: Array<{ name: string; free: Cell; pro: Cell; proPlus: Cell; founder: Cell }>
}

const matrix: Feature[] = [
  {
    category: "Tu ruta",
    rows: [
      { name: "Perfil de piloto", free: true, pro: true, proPlus: true, founder: true },
      { name: "Dashboard de progreso", free: "Básico", pro: "Completo", proPlus: "Completo", founder: "Completo" },
      { name: "Plan personalizado semanal", free: false, pro: true, proPlus: true, founder: true },
      { name: "Alertas de vencimientos", free: false, pro: true, proPlus: true, founder: true },
      { name: "Logbook digital", free: "10 vuelos", pro: "Ilimitado", proPlus: "Ilimitado", founder: "Ilimitado" },
    ],
  },
  {
    category: "Exámenes",
    rows: [
      { name: "Preguntas Aerocivil PPL/CPL", free: "30 / mes", pro: "Ilimitado", proPlus: "Ilimitado", founder: "Ilimitado" },
      { name: "Simulacros con tiempo", free: false, pro: true, proPlus: true, founder: true },
      { name: "Quiz del día", free: "Vista", pro: true, proPlus: true, founder: true },
      { name: "Wingman IA (explicaciones)", free: "5 / mes", pro: "100 / mes", proPlus: "Ilimitado", founder: "Ilimitado" },
    ],
  },
  {
    category: "Inglés ICAO",
    rows: [
      { name: "Vocabulario aeronáutico", free: false, pro: true, proPlus: true, founder: true },
      { name: "Práctica oral con Wingman Voice", free: false, pro: false, proPlus: true, founder: true },
      { name: "Simulacros TEA/ELPAC", free: false, pro: true, proPlus: true, founder: true },
    ],
  },
  {
    category: "Carrera",
    rows: [
      { name: "Requisitos por aerolínea", free: "Vista", pro: "Completo", proPlus: "Completo", founder: "Completo" },
      { name: "Simulacros de entrevista AI", free: false, pro: false, proPlus: true, founder: true },
      { name: "CV piloto con AI", free: false, pro: true, proPlus: true, founder: true },
    ],
  },
  {
    category: "Comunidad",
    rows: [
      { name: "Acceso a comunidad pública", free: true, pro: true, proPlus: true, founder: true },
      { name: "Comunidad fundadores", free: false, pro: false, proPlus: false, founder: true },
      { name: "Sesiones 1-a-1 con el equipo", free: false, pro: false, proPlus: false, founder: true },
      { name: "Voto en roadmap", free: false, pro: false, proPlus: false, founder: true },
    ],
  },
]

/** Tinte de la columna Pro: mismo valor en el th y en cada celda. */
const PRO_TINT = "color-mix(in oklab, var(--av-blue-500) 8%, transparent)"

/**
 * La primera columna queda fija al hacer scroll horizontal en móvil. Para que no
 * se transparente el contenido que pasa por debajo, cada celda pegada lleva su
 * propio fondo opaco: el tinte de la fila sobre var(--background).
 */
function stickyBg(tintPct: number): string {
  if (tintPct <= 0) return "var(--background)"
  const tint = `color-mix(in oklab, var(--muted) ${tintPct}%, transparent)`
  return `linear-gradient(${tint}, ${tint}), var(--background)`
}

const STICKY_SHADOW =
  "1px 0 0 0 color-mix(in oklab, var(--border) 60%, transparent), 8px 0 10px -8px color-mix(in oklab, var(--foreground) 22%, transparent)"

function renderCell(v: boolean | string) {
  if (v === true) return <Check className="h-4 w-4 mx-auto" style={{ color: "var(--av-blue-500)" }} />
  if (v === false) return <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />
  return <span className="text-xs text-foreground">{v}</span>
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly")

  useEffect(() => {
    track(Events.PAYWALL_VIEWED, { source: "pricing_page" })
  }, [])

  return (
    <PublicLayout>
      <Seo
        path="/pricing"
        title="Planes y precios"
        description="Empieza gratis 7 días. Pro desde $39.000 COP/mes con tutor IA, banco de preguntas Aerocivil ilimitado y comunidad. Sin tarjeta para empezar."
      />
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-xs">
            Precios pensados para piloto LATAM
          </Badge>
          <h1 className="mt-6 text-5xl sm:text-6xl font-semibold tracking-tight text-balance">
            Plan claro. Resultado claro.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-balance">
            Empieza gratis. Si te ayuda a llegar a la cabina, pagas. Si no, no.
          </p>

          <div className="mt-10 inline-flex">
            <Tabs value={billing} onValueChange={(v) => setBilling(v as Billing)}>
              <TabsList className="rounded-full">
                <TabsTrigger value="monthly" className="rounded-full px-6">
                  Mensual
                </TabsTrigger>
                <TabsTrigger value="annual" className="rounded-full px-6">
                  Anual{" "}
                  <span className="ml-2 text-xs font-semibold" style={{ color: "var(--av-blue-500)" }}>
                    -17%
                  </span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 lg:items-start">
            {tiers.map((t) => {
              const p = t[billing]
              return (
                <div
                  key={t.name}
                  className={`relative rounded-3xl p-8 transition-all duration-500 ${
                    t.highlight
                      ? "halo-pulse text-white backdrop-blur-xl scale-100 lg:scale-105"
                      : "bg-card/80 backdrop-blur-sm border border-border/60 card-apple"
                  }`}
                  style={
                    t.highlight
                      ? {
                          background:
                            "linear-gradient(135deg, var(--av-blue-500) 0%, color-mix(in oklab, var(--av-blue-500) 62%, var(--av-navy-900)) 100%)",
                          boxShadow:
                            "inset 0 1px 0 0 color-mix(in oklab, white 18%, transparent), 0 24px 48px -16px color-mix(in oklab, var(--av-blue-500) 45%, transparent)",
                        }
                      : undefined
                  }
                >
                  {t.highlight && (
                    <Badge
                      className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white hover:bg-white rounded-full px-3"
                      style={{ color: "var(--av-blue-500)" }}
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      Recomendado
                    </Badge>
                  )}
                  {t.badge && !t.highlight && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3">
                      {t.badge}
                    </Badge>
                  )}

                  <h3 className={`text-lg font-semibold ${t.highlight ? "text-white/90" : ""}`}>
                    {t.name}
                  </h3>
                  <p className={`mt-2 text-sm ${t.highlight ? "text-white/85" : "text-muted-foreground"}`}>
                    {t.description}
                  </p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-4xl font-semibold tracking-tight">{p.price}</span>
                    <span className={`text-sm ${t.highlight ? "text-white/85" : "text-muted-foreground"}`}>
                      {p.suffix}
                    </span>
                  </div>
                  <p className={`mt-1 text-xs ${t.highlight ? "text-white/70" : "text-muted-foreground"}`}>
                    {p.note}
                  </p>

                  <Button
                    asChild
                    size="lg"
                    className={`mt-8 w-full rounded-full h-12 text-base border-0 ${
                      t.highlight
                        ? "btn-apple-light shine-on-hover"
                        : "btn-apple shine-on-hover"
                    }`}
                  >
                    <Link
                      to={t.href}
                      onClick={() =>
                        track(Events.PLAN_CLICKED, {
                          plan: t.name,
                          billing,
                          source: "pricing_page",
                        })
                      }
                    >
                      {t.cta}
                    </Link>
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center">
            Comparación completa de planes
          </h2>

          <div className="mt-12 overflow-x-auto rounded-2xl border border-border/60">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th
                    className="sticky left-0 z-10 text-left p-4 font-medium text-muted-foreground"
                    style={{ background: stickyBg(50), boxShadow: STICKY_SHADOW }}
                  >
                    Incluye
                  </th>
                  <th className="p-4 text-center font-semibold">Free</th>
                  <th
                    className="p-4 text-center font-semibold"
                    style={{ color: "var(--av-blue-500)", background: PRO_TINT }}
                  >
                    Pro
                  </th>
                  <th className="p-4 text-center font-semibold">Pro+</th>
                  <th className="p-4 text-center font-semibold">Founder</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((cat) => (
                  <Fragment key={cat.category}>
                    <tr className="bg-muted/20">
                      <td
                        className="sticky left-0 z-10 p-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground"
                        style={{ background: stickyBg(20), boxShadow: STICKY_SHADOW }}
                      >
                        {cat.category}
                      </td>
                      <td colSpan={4} className="bg-muted/20" />
                    </tr>
                    {cat.rows.map((r) => (
                      <tr key={r.name} className="border-t border-border/40">
                        <td
                          className="sticky left-0 z-10 p-4"
                          style={{ background: stickyBg(0), boxShadow: STICKY_SHADOW }}
                        >
                          {r.name}
                        </td>
                        <td className="p-4 text-center">{renderCell(r.free)}</td>
                        <td className="p-4 text-center" style={{ background: PRO_TINT }}>
                          {renderCell(r.pro)}
                        </td>
                        <td className="p-4 text-center">{renderCell(r.proPlus)}</td>
                        <td className="p-4 text-center">{renderCell(r.founder)}</td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground sm:hidden">
            Desliza la tabla para ver todos los planes.
          </p>

          <p className="mt-12 text-center text-sm text-muted-foreground">
            ¿Dudas?{" "}
            <Link
              to="/contact"
              className="hover:underline font-medium"
              style={{ color: "var(--av-blue-500)" }}
            >
              Habla con nosotros
            </Link>
            .
          </p>
        </div>
      </section>
    </PublicLayout>
  )
}
