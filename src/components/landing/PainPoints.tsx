import { Clock, Map, BookX, Globe2, Plane, AlertCircle } from "lucide-react"

const pains = [
  {
    icon: Map,
    title: "No sé qué estudiar próximo",
    body: "Tantos temas, materias y vencimientos que perdés horas decidiendo en lugar de estudiando.",
  },
  {
    icon: BookX,
    title: "Los exámenes Aerocivil son densos",
    body: "Meteorología, reglamento, navegación, motores… y solo hay PDFs viejos y apuntes que circulan.",
  },
  {
    icon: Globe2,
    title: "El inglés ICAO me frena",
    body: "Sabés volar, pero el ICAO 4 es la pared invisible que separa aerolínea de hangar.",
  },
  {
    icon: Plane,
    title: "¿Cómo postulo a Avianca/Copa/LATAM?",
    body: "Cada aerolínea pide requisitos distintos y nadie los tiene compilados en un solo lugar.",
  },
  {
    icon: Clock,
    title: "Estudiar solo es lento y frustrante",
    body: "Sin comunidad, sin progreso visible, perdés motivación a la tercera semana.",
  },
  {
    icon: AlertCircle,
    title: "Se me vencen las licencias",
    body: "Médico clase 1, licencia, recurrent training… cuando te das cuenta, ya vencieron.",
  },
]

export function PainPoints() {
  return (
    <section className="py-24 sm:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            El problema
          </div>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            Ser piloto LATAM hoy es una carrera de obstáculos invisibles.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground text-balance">
            No es que te falten ganas. Es que te falta una hoja de ruta clara.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pains.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-blue-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 mb-4">
                <p.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-base font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
