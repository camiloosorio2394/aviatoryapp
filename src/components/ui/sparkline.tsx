interface Props {
  data: number[]
  color?: string
  width?: number
  height?: number
  fillBelow?: boolean
}

/**
 * Inline SVG sparkline. Pass an array of numbers — autoscales.
 * Renders a 2px line with optional gradient fill below + dot on last point.
 */
export function Sparkline({
  data,
  color = "var(--av-cyan-400)",
  width = 80,
  height = 24,
  fillBelow = true,
}: Props) {
  if (!data || data.length === 0) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = width / (data.length - 1 || 1)
  const points: [number, number][] = data.map((v, i) => [
    i * stepX,
    height - ((v - min) / range) * (height - 4) - 2,
  ])
  const lineD = "M" + points.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ")
  const areaD = `${lineD} L ${width} ${height} L 0 ${height} Z`
  const gradId = `sg-${color.replace(/[^a-z0-9]/gi, "")}`
  const last = points[points.length - 1]

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block">
      {fillBelow && (
        <>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaD} fill={`url(#${gradId})`} />
        </>
      )}
      <path d={lineD} className="spark-line" stroke={color} />
      <circle cx={last[0]} cy={last[1]} r={2.5} fill={color} />
    </svg>
  )
}
