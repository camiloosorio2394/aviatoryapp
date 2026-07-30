import { BookOpen, Brain, Briefcase, Clock4, FileCheck, Gauge, Headphones, Languages, Users } from "lucide-react"

const features = [
  { icon: Gauge, title: "Dashboard de progreso", body: "Tu % real hacia aerolínea, próximos hitos y racha de estudio." },
  { icon: BookOpen, title: "Banco Aerocivil PPL/CPL", body: "Preguntas tipo examen oficial con explicaciones detalladas." },
  { icon: Brain, title: "Tutor IA personalizado", body: "Te explica los errores, genera preguntas similares hasta que dominas." },
  { icon: Languages, title: "Inglés ICAO 4+", body: "Vocabulario aeronáutico, comprensión oral, speaking con IA." },
  { icon: Headphones, title: "Radiofonía y comunicaciones", body: "Fraseología estándar, escenarios reales, evaluación de pronunciación." },
  { icon: Briefcase, title: "Requisitos por aerolínea", body: "Avianca, LATAM, Copa, Wingo, JetSmart, Sky, Viva, siempre al día." },
  { icon: FileCheck, title: "Simulacros de entrevista", body: "Preguntas técnicas, conductuales y HR de aerolíneas reales." },
  { icon: Clock4, title: "Alertas de vencimientos", body: "Médico, licencia, recurrent: te avisamos 30 días antes." },
  { icon: Users, title: "Comunidad de pilotos", body: "Conéctate con pilotos LATAM en tu misma etapa o ya empleados." },
]

export function Features() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Lo que recibes
          </div>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            Todo lo que necesitas. Nada de lo que no.
          </h2>
        </div>

        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl p-6 transition-all duration-300 hover:bg-muted/50"
            >
              <f.icon className="h-7 w-7 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
