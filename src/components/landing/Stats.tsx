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
  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5">
      <div className="text-5xl sm:text-6xl font-extrabold tracking-[-0.04em] tabular" style={{ color: "var(--av-blue-500)" }}>
        <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
      </div>
      <div className="mt-3 text-[15px] font-bold tracking-[-0.01em]">{stat.label}</div>
      <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{stat.sub}</p>
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
  const durationMs = 1600

  useEffect(() => {
    if (!inView) return
    let raf = 0
    // Spring-like easing: overshoot ligero + settle
    function spring(t: number) {
      // ease-out-elastic-ish; suave en el approach final
      if (t === 0 || t === 1) return t
      const p = 0.4
      return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1
    }
    function tick(t: number) {
      if (startRef.current === null) startRef.current = t
      const elapsed = t - startRef.current
      const progress = Math.min(elapsed / durationMs, 1)
      const eased = Math.min(spring(progress), 1)
      setDisplay(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref} className="tabular">
      {prefix}
      {display.toLocaleString("es-CO")}
      {suffix}
    </span>
  )
}
