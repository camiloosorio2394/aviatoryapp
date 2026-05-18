import { Reveal } from "@/components/Reveal"
import { Star } from "lucide-react"

interface Testimonial {
  quote: string
  name: string
  role: string
  initials: string
  gradient: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Llevaba dos meses dando vueltas con los PDFs de Aerocivil. En la primera semana con Aviatory ya tenía clara la ruta. Me ahorró un trimestre.",
    name: "Juan Manuel R.",
    role: "Estudiante CPL · Bogotá",
    initials: "JM",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    quote:
      "El tutor de IA es la diferencia. Le pregunto en español, me explica con la teoría de mi materia, y me da un ejemplo. Es como tener un instructor todo el tiempo.",
    name: "María Camila O.",
    role: "Hour building · Medellín",
    initials: "MC",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    quote:
      "El módulo de aerolíneas es oro. Veo qué me falta para LATAM y para Wingo lado a lado. Antes era buscar PDFs sueltos por redes.",
    name: "Sebastián V.",
    role: "Candidato a aerolínea · Lima",
    initials: "SV",
    gradient: "from-cyan-500 to-blue-500",
  },
]

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32 section-blue-soft overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] text-blue-900 dark:opacity-[0.06] dark:text-blue-300 pattern-dots"
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Reveal>
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Lo que dicen pilotos como tú
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-balance leading-[0.98]">
              Construido con pilotos,
              <br />
              <span className="text-gradient-blue">para pilotos.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="h-full rounded-3xl card-elevated card-apple p-7 sm:p-8 flex flex-col">
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="text-base sm:text-lg leading-relaxed text-foreground flex-1">
                  "{t.quote}"
                </blockquote>
                <div className="mt-6 pt-5 border-t border-border/40 flex items-center gap-3">
                  <div
                    className={`h-11 w-11 rounded-full bg-gradient-to-br ${t.gradient} text-white flex items-center justify-center text-sm font-bold shadow-md`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
