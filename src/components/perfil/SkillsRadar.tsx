export function SkillsRadar({ skills }: { skills: { label: string; value: number }[] }) {
  const N = skills.length
  const cx = 100, cy = 100, r = 80
  const polar = (v: number, i: number) => {
    const angle = (i / N) * Math.PI * 2 - Math.PI / 2
    const rr = (v / 100) * r
    return [cx + rr * Math.cos(angle), cy + rr * Math.sin(angle)] as [number, number]
  }
  const pts = skills.map((s, i) => polar(s.value, i))

  return (
    <svg width={200} height={200} viewBox="0 0 200 200">
      {[0.25, 0.5, 0.75, 1].map((rr) => (
        <circle key={rr} cx={cx} cy={cy} r={r * rr} fill="none" stroke="var(--border)" strokeWidth={1} strokeDasharray={rr === 1 ? "0" : "2 4"} />
      ))}
      {skills.map((_, i) => {
        const a = (i / N) * Math.PI * 2 - Math.PI / 2
        return (
          <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} stroke="var(--border)" strokeWidth={1} />
        )
      })}
      <polygon
        points={pts.map((p) => p.join(",")).join(" ")}
        fill="var(--av-blue-500)"
        fillOpacity={0.15}
        stroke="var(--av-blue-500)"
        strokeWidth={2}
      />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={3.5} fill="var(--av-blue-500)" stroke="var(--background)" strokeWidth={1.5} />
      ))}
      {skills.map((s, i) => {
        const a = (i / N) * Math.PI * 2 - Math.PI / 2
        const lr = 96
        return (
          <text
            key={i}
            x={cx + lr * Math.cos(a)}
            y={cy + lr * Math.sin(a)}
            fontSize={9}
            fontWeight={600}
            fill="var(--muted-foreground)"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ letterSpacing: "0.02em" }}
          >
            {s.label.slice(0, 8)}
          </text>
        )
      })}
    </svg>
  )
}
