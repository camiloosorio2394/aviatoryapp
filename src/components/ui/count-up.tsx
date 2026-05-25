import { useEffect, useState } from "react"

interface Props {
  to: number
  duration?: number
  format?: (v: number) => string
  suffix?: string
  className?: string
}

/**
 * Counts up from 0 to `to` over `duration` ms.
 * Use for KPI numbers, totals, anything that should feel "alive" on mount.
 */
export function CountUp({
  to,
  duration = 900,
  format = (v) => v.toFixed(0),
  suffix = "",
  className,
}: Props) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    let raf: number
    let start: number | null = null
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const step = (ts: number) => {
      if (start === null) start = ts
      const t = Math.min(1, (ts - start) / duration)
      setVal(to * ease(t))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])

  return (
    <span className={className}>
      {format(val)}
      {suffix}
    </span>
  )
}
