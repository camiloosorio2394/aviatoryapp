import type { ReactNode } from "react"
import { accentText } from "@/lib/tileColors"

// ─── Piezas ──────────────────────────────────────────────────────────────────

export function ModeButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className="inline-flex items-center justify-center gap-2 h-11 px-3 rounded-lg text-[13px] sm:text-[13px] font-semibold transition-colors text-center"
      style={{
        background: active ? "var(--av-blue-500)" : "transparent",
        color: active ? "white" : "var(--muted-foreground)",
      }}
    >
      {icon}
      <span className="truncate">{label}</span>
    </button>
  )
}

export function Callout({
  tone,
  icon,
  children,
  className = "",
}: {
  tone: "amber" | "red"
  icon: ReactNode
  children: ReactNode
  className?: string
}) {
  const color = tone === "amber" ? "var(--av-amber-400)" : "var(--av-red-400)"
  return (
    <div
      className={`rounded-xl border p-3.5 flex items-start gap-2.5 ${className}`}
      style={{
        borderColor: `color-mix(in oklab, ${color} 32%, transparent)`,
        background: `color-mix(in oklab, ${color} 8%, transparent)`,
      }}
    >
      <span className="flex-shrink-0 mt-0.5" style={{ color }}>
        {icon}
      </span>
      <div className="text-[13px] text-foreground/85 leading-relaxed">{children}</div>
    </div>
  )
}

export function ScoreHint({ ticked, total }: { ticked: number; total: number }) {
  const ratio = total > 0 ? ticked / total : 0
  const color =
    ratio >= 0.8 ? "var(--av-green-400)" : ratio >= 0.5 ? "var(--av-amber-400)" : "var(--av-red-400)"
  const msg =
    ratio >= 0.8
      ? "Muy bien: cubriste lo esencial del NOTAM."
      : ratio >= 0.5
        ? "Vas bien, pero repasa los puntos que te faltaron."
        : "Vuelve a leer el NOTAM y arma de nuevo tu interpretación."
  return (
    <div
      className="mt-3 rounded-lg p-3 text-[13px] leading-relaxed"
      style={{
        color: accentText(color),
        background: `color-mix(in oklab, ${color} 10%, transparent)`,
        border: `1px solid color-mix(in oklab, ${color} 28%, transparent)`,
      }}
    >
      <span className="font-semibold tabular">
        Mencionaste {ticked} de {total} puntos clave.
      </span>{" "}
      <span className="text-foreground/80">{msg}</span>
    </div>
  )
}
