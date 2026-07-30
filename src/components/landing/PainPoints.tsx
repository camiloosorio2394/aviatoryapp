import { Clock, Map, BookX, Globe2, Plane, AlertCircle } from "lucide-react"
import { Reveal } from "@/components/Reveal"

const pains = [
  { icon: Map, title: "¿Qué estudio primero?", body: "Tantos temas y vencimientos que pierdes horas decidiendo en lugar de estudiando." },
  { icon: BookX, title: "Los exámenes Aerocivil son densos", body: "Meteorología, reglamento, navegación, motores… y solo encuentras PDFs viejos y apuntes sueltos." },
  { icon: Globe2, title: "El inglés ICAO te frena", body: "Sabes volar, pero el ICAO 4 es la pared invisible que separa aerolínea de hangar." },
  { icon: Plane, title: "¿Cómo postular a Avianca o LATAM?", body: "Cada aerolínea tiene requisitos distintos, y nadie los reúne en un solo lugar." },
  { icon: Clock, title: "Estudiar solo es lento", body: "Sin comunidad, sin progreso visible, pierdes la motivación a la tercera semana." },
  { icon: AlertCircle, title: "Se vencen tus licencias", body: "Médico clase 1, licencia, recurrent training… cuando te das cuenta, ya vencieron." },
]

export function PainPoints() {
  return (
    <section className="relative py-20 sm:py-28 section-soft">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <Reveal>
            <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
              ¿Te suena familiar?
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05]">
              Ser piloto en LATAM es una carrera de obstáculos invisibles
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-3 text-[16px] text-muted-foreground leading-relaxed">
              No es que te falten ganas. Es que te falta una hoja de ruta clara.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl mb-4" style={{ background: "color-mix(in oklab, var(--av-blue-500) 12%, transparent)" }}>
                  <p.icon className="h-5 w-5" style={{ color: "var(--av-blue-500)" }} />
                </div>
                <h3 className="text-[16px] font-bold tracking-[-0.01em]">{p.title}</h3>
                <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
