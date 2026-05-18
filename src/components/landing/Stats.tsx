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
    <section className="relative py-24 sm:py-32 section-dark-mesh overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] text-white pattern-grid"
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Reveal>
            <div className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
              Lo que cambia con Aviatory
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-balance leading-[0.98] text-white">
              Estudiar para pilotear,
              <br />
              <span className="bg-gradient-to-r from-blue-200 via-blue-300 to-cyan-200 bg-clip-text text-transparent">finalmente con estructura.</span>
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
    <div className="rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-7 text-center transition-all duration-500 hover:bg-white/[0.08] hover:-translate-y-1.5 hover:border-blue-300/40 hover:shadow-2xl hover:shadow-blue-500/30">
      <div className="text-6xl sm:text-7xl font-bold tracking-[-0.04em] tabular bg-gradient-to-br from-blue-200 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
        <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
      </div>
      <div className="mt-3 text-base font-semibold text-white tracking-tight">{stat.label}</div>
      <p className="mt-1.5 text-sm text-blue-100/60 leading-relaxed">{stat.sub}</p>
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
