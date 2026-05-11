const steps = [
  {
    n: "01",
    title: "Cargás tu perfil de piloto",
    body: "Etapa, horas, licencias, nivel de inglés, aerolínea objetivo. 6 preguntas, 90 segundos.",
  },
  {
    n: "02",
    title: "Recibís tu plan semanal",
    body: "Aviatory te muestra exactamente qué estudiar esta semana para llegar a tu meta.",
  },
  {
    n: "03",
    title: "Estudiás, practicás, avanzás",
    body: "Quiz Aerocivil, inglés ICAO, simulacros de entrevista. El tutor IA te explica todo lo que falles.",
  },
  {
    n: "04",
    title: "Ves tu progreso real",
    body: '"Tu progreso a aerolínea: 47%" — sabés exactamente cuánto te falta y qué hacer mañana.',
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 sm:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Cómo funciona
          </div>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            En 4 pasos pasás de "no sé qué hacer" a "esto es lo que tengo que estudiar hoy".
          </h2>
        </div>

        <div className="mt-20 relative">
          {/* Connecting line */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-2xl font-bold shadow-xl shadow-blue-500/30">
                  {s.n}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-center">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground text-center leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
