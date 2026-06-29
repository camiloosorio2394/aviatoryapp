import type { CSSProperties } from "react"

type Color = "cyan" | "blue" | "amber" | "green" | "red" | "violet"

interface Props {
  value?: number
  max?: number
  size?: number
  label?: string
  sub?: string
  color?: Color
  trailing?: string
}

// El acento cyan se retiró del producto: "cyan" se mapea a azul para que
// cualquier call-site que aún pase color="cyan" quede consistente.
const COLOR_VAR: Record<Color, string> = {
  cyan: "var(--av-blue-500)",
  blue: "var(--av-blue-500)",
  amber: "#B45309",
  green: "#047857",
  red: "#DC2626",
  violet: "#7C3AED",
}

/**
 * Instrument-style arc ring (cockpit gauge).
 * 260° sweep, bottom-centered, with tick marks and animated stroke.
 */
export function KpiRing({
  value = 0,
  max = 100,
  size = 84,
  label,
  sub,
  color = "blue",
  trailing,
}: Props) {
  const r = (size - 14) / 2
  const cx = size / 2
  const cy = size / 2
  const sweep = 260
  const start = 90 + (360 - sweep) / 2

  const polar = (deg: number): [number, number] => {
    const rad = ((deg - 90) * Math.PI) / 180
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
  }

  const [sx, sy] = polar(start)
  const [ex, ey] = polar(start + sweep)
  const largeArc = sweep > 180 ? 1 : 0
  const arcPath = `M ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}`

  const pct = Math.max(0, Math.min(1, value / max))
  const totalArcLen = (sweep / 360) * 2 * Math.PI * r
  const offset = totalArcLen * (1 - pct)
  const stroke = COLOR_VAR[color]

  const valueFont: CSSProperties = {
    fontSize: size > 100 ? 28 : 22,
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "-0.04em",
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
          <path d={arcPath} className="ring-bg" strokeWidth={6} />
          <path
            d={arcPath}
            className="ring-fill"
            stroke={stroke}
            strokeWidth={6}
            strokeDasharray={`${totalArcLen}`}
            strokeDashoffset={offset}
          />
          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
            const angle = ((start + sweep * t - 90) * Math.PI) / 180
            const [xOut, yOut] = polar(start + sweep * t)
            const rIn = r - 8
            const xIn = cx + rIn * Math.cos(angle)
            const yIn = cy + rIn * Math.sin(angle)
            return (
              <line key={i} x1={xIn} y1={yIn} x2={xOut} y2={yOut} stroke="var(--border)" strokeWidth={1} />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
          <div className="tabular-nums text-foreground" style={valueFont}>
            {value}
            {trailing}
          </div>
          {sub && (
            <div className="mt-1 text-[11px] font-semibold text-muted-foreground">
              {sub}
            </div>
          )}
        </div>
      </div>
      {label && (
        <div className="text-[12.5px] font-semibold text-muted-foreground">
          {label}
        </div>
      )}
    </div>
  )
}
