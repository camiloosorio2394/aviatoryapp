import { Reveal } from "@/components/Reveal"

const steps = [
  {
    n: "1",
    title: "Cargás tu perfil de piloto",
    body: "Etapa, horas, licencias, nivel de inglés y aerolínea objetivo. 6 preguntas, 90 segundos.",
  },
  {
    n: "2",
    title: "Recibís tu ruta de aprendizaje",
    body: "Aviatory te muestra exactamente qué estudiar esta semana para llegar a tu meta.",
  },
  {
    n: "3",
    title: "Estudiás, practicás, avanzás",
    body: "Cursos, quizzes Aerocivil, inglés ICAO y simulacros. Tu tutor IA te explica todo lo que fallás.",
  },
  {
    n: "4",
    title: "Ves tu progreso real",
    body: "“Tu progreso a aerolínea: 47%” — sabés cuánto te falta y qué hacer hoy.",
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-20 sm:py-28 section-soft">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <Reveal>
            <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
              Cómo funciona
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05]">
              De “no sé por dónde empezar” a saber qué hacer hoy
            </h2>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <div
                  className="flex items-center justify-center h-11 w-11 rounded-xl text-white text-[18px] font-extrabold"
                  style={{ background: "var(--av-blue-500)" }}
                >
                  {s.n}
                </div>
                <h3 className="mt-5 text-[17px] font-bold tracking-[-0.01em]">{s.title}</h3>
                <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
