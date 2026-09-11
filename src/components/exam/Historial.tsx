import { useEffect, useMemo, useState } from "react"
import { History } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"
import { accentText } from "@/lib/tileColors"
import { type FilaHistorial, type ExamenConfig } from "@/components/exam/tipos"
import { fmtTime, fmtDate, mix } from "@/components/exam/formato"

// ─── Historial de intentos ───────────────────────────────────────────────────

export function AttemptHistory({
  config,
  userId,
  sessionLoading,
  refreshKey,
  total,
}: {
  config: ExamenConfig
  userId: string | null
  sessionLoading: boolean
  refreshKey: number
  total: number
}) {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<FilaHistorial[]>([])
  const [attemptCount, setAttemptCount] = useState(0)
  const [remoteBest, setRemoteBest] = useState<number | null>(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps -- refreshKey fuerza la relectura del respaldo local tras guardar
  const localBest = useMemo(() => config.leerMejorLocal(), [config, refreshKey])

  useEffect(() => {
    if (sessionLoading) return
    let cancelled = false
    void (async () => {
      if (!userId) {
        if (!cancelled) {
          setRows([])
          setAttemptCount(0)
          setRemoteBest(null)
          setLoading(false)
        }
        return
      }
      setLoading(true)
      const res = await config.cargarHistorial(userId)
      if (cancelled) return
      if (!res) {
        setRows([])
        setAttemptCount(0)
        setRemoteBest(null)
      } else {
        setRows(res.rows)
        setAttemptCount(res.count)
        setRemoteBest(res.best)
      }
      setLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [userId, sessionLoading, refreshKey, config])

  const scoreColor = (s: number) => (s >= config.aprobacion ? config.acento : "var(--av-wine-500)")
  const scoreTextColor = (s: number) => (s >= config.aprobacion ? accentText(config.acento) : "var(--av-wine-fg)")

  // El mejor puntaje es el máximo entre la nube y el respaldo local, nunca uno de los dos.
  const best = Math.max(remoteBest ?? 0, localBest ?? 0) || null
  const last = rows.length ? rows[0].score : null
  const busy = loading || sessionLoading

  return (
    <>
      <SectionTitle icon={History} eyebrow="Tu historial" title="Tus intentos anteriores" hint="Mostramos tus 10 intentos más recientes." />

      <div className="grid grid-cols-3 gap-2.5">
        <Stat label="Mejor puntaje" value={busy ? "" : best != null ? String(best) : "0"} color={best != null ? scoreColor(best) : "var(--muted-foreground)"} />
        <Stat label="Último puntaje" value={busy ? "" : last != null ? String(last) : "0"} color={last != null ? scoreColor(last) : "var(--muted-foreground)"} />
        <Stat label="Intentos" value={busy ? "" : String(attemptCount)} color={config.acento} />
      </div>

      {busy ? (
        <div className="mt-3 space-y-1.5" role="status" aria-label="Cargando tu historial">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[58px] rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : !userId ? (
        <div className="mt-3 rounded-2xl border border-border bg-muted/20 p-4 text-[13px] text-muted-foreground leading-relaxed">
          Inicia sesión para que tus intentos queden guardados y puedas ver cómo mejoras. Igual puedes presentar la
          evaluación ahora mismo.
        </div>
      ) : rows.length === 0 ? (
        <div className="mt-3 rounded-2xl border border-border bg-muted/20 p-5 text-center">
          <History className="mx-auto h-5 w-5 text-muted-foreground" />
          <div className="mt-2 text-[15px] font-semibold tracking-[-0.01em]">Todavía no has presentado la evaluación</div>
          <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed max-w-[520px] mx-auto">
            Presenta el primer intento y aquí vas a ver tu puntaje, si aprobaste y cuánto tardaste. Puedes repetirla las
            veces que quieras.
          </p>
        </div>
      ) : (
        <div className="mt-3 space-y-1.5">
          {rows.map((r) => (
            <div key={r.id} className="rounded-xl border bg-card px-3.5 py-2.5 flex items-center gap-3" style={{ borderColor: mix("var(--border)", 65) }}>
              <div className="tabular w-11 flex-shrink-0 text-[17px] font-semibold tracking-[-0.02em]" style={{ color: scoreColor(r.score) }}>
                {r.score}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold">{fmtDate(r.at)}</div>
                <div className="tabular text-[12px] text-muted-foreground">
                  {r.correct} de {r.total || total} correctas
                  {r.duration != null ? ` · ${fmtTime(r.duration)}` : ""}
                </div>
              </div>
              <span
                className="flex-shrink-0 text-[12px] font-semibold px-2 py-0.5 rounded-full"
                style={{ color: scoreTextColor(r.score), background: mix(scoreColor(r.score), 12) }}
              >
                {r.passed ? "Aprobado" : "No aprobado"}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border p-3 text-center" style={{ borderColor: mix("var(--border)", 60) }}>
      <div className="tabular text-[20px] font-semibold tracking-[-0.02em]" style={{ color }}>
        {value === "" ? <span className="inline-block h-5 w-10 rounded bg-muted animate-pulse" aria-hidden="true" /> : value}
      </div>
      <div className="text-[12px] sm:text-[12px] text-muted-foreground">{label}</div>
    </div>
  )
}
