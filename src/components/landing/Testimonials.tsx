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
    <section className="relative py-20 sm:py-28 section-soft">
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <Reveal>
            <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
              Lo que dicen pilotos como tú
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05]">
              Construido con pilotos, para pilotos
            </h2>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 flex flex-col">
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-[14.5px] leading-relaxed text-foreground flex-1">
                  "{t.quote}"
                </blockquote>
                <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full bg-gradient-to-br ${t.gradient} text-white flex items-center justify-center text-[13px] font-bold`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-[13.5px] font-semibold">{t.name}</div>
                    <div className="text-[12px] text-muted-foreground">{t.role}</div>
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
