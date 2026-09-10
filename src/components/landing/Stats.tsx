import { Reveal } from "@/components/Reveal"
import { CountUp } from "@/components/ui/count-up"
import { useInView } from "@/hooks/useInView"

interface Stat {
  value: number
  suffix?: string
  prefix?: string
  label: string
  sub: string
}

const stats: Stat[] = [
  {
    value: 3,
    suffix: "x",
    label: "Más rápido",
    sub: "que estudiar solo con PDFs y videos sueltos",
  },
  {
    value: 6,
    label: "Materias cubiertas",
    sub: "Meteorología, Reglamento, Navegación, Motores, Aerodinámica, W&B",
  },
  {
    value: 1500,
    suffix: "+",
    label: "Horas registrables",
    sub: "El sistema te lleva la cuenta hasta llegar a tu mínima de aerolínea",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Wingman AI",
    sub: "Tu tutor personal te explica cada pregunta que fallas",
  },
]

export function Stats() {
  return (
    <section className="relative py-20 sm:py-28 bg-background">
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <Reveal>
            <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
              Lo que cambia con Aviatory
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05]">
              Estudiar para pilotear, finalmente con estructura
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <StatCard stat={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ stat }: { stat: Stat }) {
  // El contador arranca cuando la cifra está a la vista, no al montar: si no,
  // la cuenta se gasta arriba del todo y quien baja encuentra el número quieto.
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 })

  return (
    <div className="rounded-2xl border border-border bg-card transition-[transform,box-shadow,border-color] duration-300 ease-out p-6 hover:-translate-y-0.5">
      <div ref={ref} className="text-5xl sm:text-6xl font-extrabold tracking-[-0.04em] tabular" style={{ color: "var(--av-blue-500)" }}>
        <CountUp
          to={stat.value}
          start={inView}
          prefix={stat.prefix}
          suffix={stat.suffix}
          format={(v) => Math.round(v).toLocaleString("es-CO")}
        />
      </div>
      <div className="mt-3 text-[15px] font-bold tracking-[-0.01em]">{stat.label}</div>
      <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{stat.sub}</p>
    </div>
  )
}

