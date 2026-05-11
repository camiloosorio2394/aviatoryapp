import { Compass, Brain, MessageSquare, Trophy } from "lucide-react"

const solutions = [
  {
    icon: Compass,
    title: "Tu ruta personalizada",
    body: "Cargás tu etapa, horas y aerolínea objetivo. Aviatory arma tu plan semana a semana: qué examen primero, qué materias dominar, cuándo presentar.",
    accent: "from-blue-500 to-blue-600",
  },
  {
    icon: Brain,
    title: "Banco oficial + tutor IA",
    body: "Preguntas tipo Aerocivil con explicaciones claras. Cuando fallás algo, el tutor IA te genera 5 más del mismo tema hasta que lo dominás.",
    accent: "from-indigo-500 to-blue-600",
  },
  {
    icon: MessageSquare,
    title: "Inglés ICAO en español",
    body: "Único curso pensado para hispanohablantes que quieren llegar a ICAO 4+. Práctica de speaking con IA, vocabulario aeronáutico, simulacros.",
    accent: "from-cyan-500 to-blue-500",
  },
  {
    icon: Trophy,
    title: "Requisitos por aerolínea",
    body: "Avianca, LATAM, Copa, Wingo, JetSmart… cada una con sus horas, edad, inglés, exámenes. Mantenemos las hojas vivas.",
    accent: "from-blue-600 to-violet-600",
  },
]

export function Solutions() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            La solución
          </div>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            Una sola plataforma para todo lo que te separa de la cabina.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground text-balance">
            Aviatory junta lo que hoy te toca buscar en 8 lugares distintos —
            y le agrega IA para que estudies mejor, no más.
          </p>
        </div>

        <div className="mt-20 grid lg:grid-cols-2 gap-6">
          {solutions.map((s, i) => (
            <div
              key={s.title}
              className="group relative rounded-3xl border border-border/60 bg-card p-8 sm:p-10 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
            >
              <div
                aria-hidden
                className={`absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gradient-to-br ${s.accent} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`}
              />
              <div
                className={`inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br ${s.accent} text-white shadow-lg shadow-blue-500/20`}
              >
                <s.icon className="h-6 w-6" />
              </div>
              <div className="mt-6">
                <div className="text-xs font-mono text-muted-foreground">0{i + 1}</div>
                <h3 className="mt-1 text-2xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
