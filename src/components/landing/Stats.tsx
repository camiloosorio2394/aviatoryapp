import { useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/Reveal"
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
    <section className="py-24 sm:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Reveal>
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Lo que cambia con Aviatory
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.025em] text-balance leading-[1.05]">
              Estudiar para pilotear,
              <br />
              <span className="text-muted-foreground">finalmente con estructura.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <StatCard stat={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card card-apple p-7 text-center">
      <div className="text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-br from-blue-600 to-blue-500 bg-clip-text text-transparent">
        <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
      </div>
      <div className="mt-3 text-base font-semibold">{stat.label}</div>
      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{stat.sub}</p>
    </div>
  )
}

function CountUp({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number
  prefix?: string
  suffix?: string
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 })
  const [display, setDisplay] = useState(0)
  const startRef = useRef<number | null>(null)
  const durationMs = 1100

  useEffect(() => {
    if (!inView) return
    let raf = 0
    function tick(t: number) {
      if (startRef.current === null) startRef.current = t
      const elapsed = t - startRef.current
      const progress = Math.min(elapsed / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("es-CO")}
      {suffix}
    </span>
  )
}
