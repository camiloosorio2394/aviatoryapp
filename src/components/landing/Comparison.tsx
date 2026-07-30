import { Check, X } from "lucide-react"
import { Reveal } from "@/components/Reveal"

interface Row {
  feature: string
  alone: boolean | string
  competitor: boolean | string
  aviatory: boolean | string
}

const rows: Row[] = [
  { feature: "Banco de preguntas Aerocivil PCA", alone: false, competitor: true, aviatory: true },
  { feature: "Plan personalizado por etapa", alone: false, competitor: false, aviatory: true },
  { feature: "Tutor IA que te explica cuando fallas", alone: false, competitor: false, aviatory: true },
  { feature: "Inglés ICAO desde español", alone: "Apps en inglés", competitor: "Limitado", aviatory: true },
  { feature: "Requisitos por aerolínea LATAM", alone: false, competitor: false, aviatory: true },
  { feature: "Comunidad de pilotos hispanohablantes", alone: false, competitor: false, aviatory: true },
  { feature: "Dashboard de progreso visual", alone: false, competitor: false, aviatory: true },
  { feature: "Alertas de vencimientos médico/licencia", alone: false, competitor: false, aviatory: true },
]

function cell(v: boolean | string, accent = false) {
  if (v === true)
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full"
        style={{
          background: accent ? "var(--av-blue-500)" : "color-mix(in oklab, var(--av-blue-500) 16%, transparent)",
          color: accent ? "#fff" : "var(--av-blue-500)",
        }}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    )
  if (v === false)
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground/50">
        <X className="h-3.5 w-3.5" />
      </span>
    )
  return <span className="text-[12px] text-muted-foreground">{v}</span>
}

export function Comparison() {
  return (
    <section className="relative py-20 sm:py-28 bg-background">
      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <Reveal>
            <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
              Comparación
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05]">
              Lo que recibes con Aviatory vs. lo que tienes hoy
            </h2>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] sm:grid-cols-4 border-b border-border">
              <div className="px-3 sm:px-6 py-4 text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                Característica
              </div>
              <div className="px-3 sm:px-6 py-4 text-center text-[11px] sm:text-[13px] font-semibold text-muted-foreground">
                Estudiar
                <br className="sm:hidden" /> solo
              </div>
              <div className="px-3 sm:px-6 py-4 text-center text-[11px] sm:text-[13px] font-semibold text-muted-foreground">
                Banco
                <br className="sm:hidden" /> tradicional
              </div>
              <div className="px-3 sm:px-6 py-4 text-center text-[12px] sm:text-[14px] font-bold text-white" style={{ background: "var(--av-blue-500)" }}>
                Aviatory
              </div>
            </div>

            {/* Rows */}
            <div>
              {rows.map((r, i) => (
                <div
                  key={r.feature}
                  className={`grid grid-cols-[1.2fr_1fr_1fr_1fr] sm:grid-cols-4 items-center ${
                    i !== rows.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="px-3 sm:px-6 py-4 text-[12px] sm:text-[14px] font-medium">
                    {r.feature}
                  </div>
                  <div className="px-3 sm:px-6 py-4 text-center">{cell(r.alone)}</div>
                  <div className="px-3 sm:px-6 py-4 text-center">{cell(r.competitor)}</div>
                  <div
                    className="px-3 sm:px-6 py-4 text-center"
                    style={{ background: "color-mix(in oklab, var(--av-blue-500) 6%, transparent)" }}
                  >
                    {cell(r.aviatory, true)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
