import { ArrowDown, ArrowUp } from "lucide-react"
import type { ReactNode } from "react"
import { CountUp } from "./count-up"
import { Sparkline } from "./sparkline"

interface Props {
  eyebrow: string
  value: number
  suffix?: string
  delta?: string
  deltaPositive?: boolean
  sparkline?: number[]
  sparklineColor?: string
  ring?: ReactNode
  format?: (v: number) => string
}

/**
 * Standard KPI tile: eyebrow + big animated number + optional delta + sparkline OR ring.
 * Use in 4-up grids on Dashboard, Logbook stats strip, etc.
 */
export function KpiTile({
  eyebrow,
  value,
  suffix,
  delta,
  deltaPositive,
  sparkline,
  sparklineColor,
  ring,
  format,
}: Props) {
  const isDecimal = value < 100 && value % 1 !== 0
  const defaultFormat = (v: number) => v.toFixed(isDecimal ? 1 : 0)

  return (
    <div className="rounded-xl border border-border bg-card p-[18px] flex flex-col gap-3.5 transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {eyebrow}
        </div>
        {delta !== undefined && (
          <div
            className="mono tabular-nums text-[11px] font-bold inline-flex items-center gap-0.5"
            style={{ color: deltaPositive ? "oklch(0.5 0.16 155)" : "oklch(0.55 0.2 25)" }}
          >
            {deltaPositive ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
            {delta}
          </div>
        )}
      </div>
      <div className="flex items-end justify-between gap-2">
        <div className="mono tabular-nums text-[32px] font-bold leading-none tracking-[-0.04em] text-foreground">
          <CountUp to={value} format={format ?? defaultFormat} />
          {suffix && (
            <span className="text-base text-muted-foreground font-semibold ml-0.5">
              {suffix}
            </span>
          )}
        </div>
        {sparkline && (
          <Sparkline
            data={sparkline}
            color={sparklineColor ?? "var(--av-cyan-400)"}
            width={70}
            height={24}
          />
        )}
        {ring}
      </div>
    </div>
  )
}
