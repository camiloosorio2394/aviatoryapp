import { Clock, Map, BookX, Globe2, Plane, AlertCircle } from "lucide-react"
import { Reveal } from "@/components/Reveal"

const pains = [
  {
    icon: Map,
    title: "¿Qué estudio primero?",
    body: "Tantos temas y vencimientos que pierdes horas decidiendo en lugar de estudiando.",
  },
  {
    icon: BookX,
    title: "Los exámenes Aerocivil son densos",
    body: "Meteorología, reglamento, navegación, motores… y solo encuentras PDFs viejos y apuntes sueltos.",
  },
  {
    icon: Globe2,
    title: "El inglés ICAO te frena",
    body: "Sabes volar, pero el ICAO 4 es la pared invisible que separa aerolínea de hangar.",
  },
  {
    icon: Plane,
    title: "¿Cómo postular a Avianca o LATAM?",
    body: "Cada aerolínea tiene requisitos distintos, y nadie los reúne en un solo lugar.",
  },
  {
    icon: Clock,
    title: "Estudiar solo es lento",
    body: "Sin comunidad, sin progreso visible, pierdes motivación a la tercera semana.",
  },
  {
    icon: AlertCircle,
    title: "Se vencen tus licencias",
    body: "Médico clase 1, licencia, recurrent training… cuando te das cuenta, ya vencieron.",
  },
]

export function PainPoints() {
  return (
    <section className="relative py-24 sm:py-32 section-soft overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025] text-foreground pattern-dots"
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              ¿Te suena familiar?
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-balance leading-[0.98]">
              Ser piloto en Latinoamérica hoy
              <br />
              <span className="text-muted-foreground/80">es una carrera de obstáculos invisibles.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg text-muted-foreground text-balance">
              No es que te falten ganas. Es que te falta una hoja de ruta clara.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <div className="group h-full rounded-2xl card-elevated p-6 card-apple hover:border-blue-500/30">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 mb-4 transition-transform duration-300 group-hover:scale-110">
                  <p.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-base font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
