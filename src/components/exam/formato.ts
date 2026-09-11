export const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"]

// ─── Helpers de formato y color ──────────────────────────────────────────────

export function fmtTime(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds))
  const mm = Math.floor(s / 60)
  const ss = s % 60
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`
}

export function fmtDate(iso: string): string {
  const d = new Date(iso)
  const day = d.toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })
  const time = d.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", hour12: false })
  return `${day} · ${time}`
}

export function mix(token: string, pct: number): string {
  return `color-mix(in oklab, ${token} ${pct}%, transparent)`
}
