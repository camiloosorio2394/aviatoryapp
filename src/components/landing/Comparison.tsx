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
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
          accent
            ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
            : "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300"
        }`}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    )
  if (v === false)
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground/60">
        <X className="h-3.5 w-3.5" />
      </span>
    )
  return (
    <span className="text-xs text-muted-foreground italic">{v}</span>
  )
}

export function Comparison() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto h-96 max-w-4xl bg-[radial-gradient(closest-side,_var(--tw-gradient-stops))] from-blue-300/15 via-transparent to-transparent dark:from-blue-500/10"
      />
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <Reveal>
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Comparación
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-balance leading-[0.98]">
              Lo que recibes con Aviatory
              <br />
              <span className="text-muted-foreground/80">vs. lo que tienes hoy.</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="rounded-3xl border border-border/60 bg-card overflow-hidden shadow-2xl shadow-blue-500/5 ring-1 ring-blue-500/10">
            {/* Header */}
            <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] sm:grid-cols-4 bg-muted/40">
              <div className="px-3 sm:px-6 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Característica
              </div>
              <div className="px-3 sm:px-6 py-4 text-center text-xs sm:text-sm font-semibold">
                Estudiar
                <br className="sm:hidden" /> solo
              </div>
              <div className="px-3 sm:px-6 py-4 text-center text-xs sm:text-sm font-semibold">
                Banco
                <br className="sm:hidden" /> tradicional
              </div>
              <div className="px-3 sm:px-6 py-4 text-center text-xs sm:text-sm font-bold bg-gradient-to-b from-blue-600 to-blue-700 text-white">
                Aviatory
              </div>
            </div>

            {/* Rows */}
            <div>
              {rows.map((r, i) => (
                <div
                  key={r.feature}
                  className={`grid grid-cols-[1.2fr_1fr_1fr_1fr] sm:grid-cols-4 items-center ${
                    i % 2 === 0 ? "bg-background" : "bg-muted/20"
                  }`}
                >
                  <div className="px-3 sm:px-6 py-4 text-xs sm:text-sm font-medium">
                    {r.feature}
                  </div>
                  <div className="px-3 sm:px-6 py-4 text-center">{cell(r.alone)}</div>
                  <div className="px-3 sm:px-6 py-4 text-center">{cell(r.competitor)}</div>
                  <div className="px-3 sm:px-6 py-4 text-center bg-blue-50/50 dark:bg-blue-950/20">
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
