import { Reveal } from "@/components/Reveal"

const steps = [
  {
    n: "01",
    title: "Cargas tu perfil de piloto",
    body: "Etapa, horas, licencias, nivel de inglés, aerolínea objetivo. 6 preguntas, 90 segundos.",
  },
  {
    n: "02",
    title: "Recibes tu plan semanal",
    body: "Aviatory te muestra exactamente qué estudiar esta semana para llegar a tu meta.",
  },
  {
    n: "03",
    title: "Estudias, practicas, avanzas",
    body: "Quizzes Aerocivil, inglés ICAO, simulacros. El tutor IA te explica todo lo que fallas.",
  },
  {
    n: "04",
    title: "Ves tu progreso real",
    body: '"Tu progreso a aerolínea: 47%" — sabes exactamente cuánto te falta y qué hacer hoy.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="relative py-24 sm:py-32 section-soft overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025] text-foreground pattern-dots"
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Cómo funciona
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.025em] text-balance leading-[1.05]">
              En 4 pasos pasas de
              <br />
              <span className="text-muted-foreground">"no sé por dónde empezar" a saber qué hacer hoy.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-20 relative">
          <div
            aria-hidden
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="relative">
                  <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-2xl font-bold shadow-xl shadow-blue-500/30 transition-transform duration-500 hover:scale-105">
                    {s.n}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-center">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground text-center leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
