import { useState } from "react"
import { Link } from "react-router-dom"
import {
  AlertTriangle,
  ArrowRight,
  Share2,
  Activity,
} from "lucide-react"
import { toast } from "sonner"
import { CountUp } from "@/components/ui/count-up"
import { shareStreak } from "@/lib/shareStreak"
import { appButtonClass } from "@/lib/buttonStyles"
import { type ActivityDay } from "@/components/dashboard/tipos"
import { DAILY_ACTION } from "@/components/dashboard/plan"

/**
 * Actividad. Sin datos no se dibujan 12 semanas en gris: una cuadrícula vacía
 * de 280px de alto ocupa media pantalla para no decir nada. Se colapsa a los 7
 * días de la semana en curso y crece cuando hay con qué llenarla.
 *
 * Absorbe además el aviso de racha en riesgo, que antes vivía en una card
 * aparte repitiendo un dato que ya está en el panel de indicadores.
 */
export function ActivityHeatmap({
  data,
  loading,
  streakAtRisk,
  longestStreak,
  streakDays,
  username,
}: {
  data: ActivityDay[]
  loading: boolean
  streakAtRisk: boolean
  longestStreak: number
  streakDays: number
  username: string | null
}) {
  const [sharing, setSharing] = useState(false)

  async function compartir() {
    setSharing(true)
    try {
      const via = await shareStreak(streakDays, username)
      if (via === "download") toast.success("Imagen descargada: súbela a tu historia o compártela donde quieras")
    } catch {
      toast.error("No pudimos generar la imagen")
    } finally {
      setSharing(false)
    }
  }
  const weeks: ActivityDay[][] = []
  for (let i = 0; i < data.length; i += 7) weeks.push(data.slice(i, i + 7))
  const total = data.reduce((a, d) => a + d.activities_count, 0)
  const color = (c: number) => {
    if (c === 0) return "var(--muted)"
    if (c === 1) return "color-mix(in oklab, var(--av-blue-500) 25%, transparent)"
    if (c <= 3) return "color-mix(in oklab, var(--av-blue-500) 50%, transparent)"
    if (c <= 5) return "color-mix(in oklab, var(--av-blue-500) 80%, transparent)"
    return "var(--av-blue-500)"
  }

  return (
    <div className="rounded-xl surface p-5">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[13px] text-muted-foreground">
            <Activity className="h-3 w-3" /> Tu actividad
          </div>
          <div className="text-[15px] font-semibold text-foreground mt-1">
            {total > 0 ? "Últimas 12 semanas" : "Esta semana"}
          </div>
        </div>
        <div className="flex items-start gap-4">
          {/* Compartir la racha: la imagen sale con la marca y los galones del
              hito. Solo aparece con racha viva: compartir un cero no motiva. */}
          {streakDays > 0 && (
            <button
              type="button"
              onClick={() => void compartir()}
              disabled={sharing}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[13px] font-semibold border border-border bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-60"
            >
              <Share2 className="h-3.5 w-3.5" />
              {sharing ? "Generando" : "Compartir racha"}
            </button>
          )}
          <div className="text-right">
            <div className="tabular-nums text-[24px] font-semibold text-foreground tracking-[-0.03em] leading-none">
              {total > 0 ? <CountUp to={total} /> : "—"}
            </div>
            <div className="text-[13px] text-muted-foreground mt-1">actividades</div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-[60px] rounded-xl bg-muted animate-pulse" />
      ) : total === 0 ? (
        <>
          {/* Una sola fila de 7 días en lugar de 12 semanas en gris. */}
          <div className="flex gap-2 items-end">
            {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full rounded-lg"
                  style={{ height: 32, background: "var(--muted)" }}
                />
                <span className="text-[12px] text-muted-foreground">{d}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-muted-foreground">
            Tu primera actividad aparece aquí hoy.
          </p>
        </>
      ) : (
        <>
          <div className="flex gap-2 items-start">
            <div className="flex flex-col gap-[3px] mt-1 mr-1">
              {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
                <div
                  key={i}
                  className="text-[12px] text-muted-foreground text-right"
                  style={{ height: 14, lineHeight: "14px", width: 12 }}
                >
                  {i % 2 === 0 ? d : ""}
                </div>
              ))}
            </div>
            <div className="flex gap-[3px] overflow-x-auto flex-1 pb-1">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((d) => (
                    <div
                      key={d.date}
                      className="w-[14px] h-[14px] rounded-[3px] flex-shrink-0 transition-transform hover:scale-150"
                      style={{ background: color(d.activities_count) }}
                      title={`${d.date} · ${d.activities_count} actividad${d.activities_count !== 1 ? "es" : ""}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
            {longestStreak > 0 ? (
              <span className="tabular-nums text-[13px] text-muted-foreground">
                Mejor racha: {longestStreak} días
              </span>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
              <span>Menos</span>
              {[0, 1, 3, 5, 7].map((c) => (
                <div key={c} className="w-[11px] h-[11px] rounded-[3px]" style={{ background: color(c) }} />
              ))}
              <span>Más</span>
            </div>
          </div>
        </>
      )}

      {/* El aviso de racha vive aquí, junto a la actividad que lo produce, y no
          en una card propia repitiendo un dato que ya está en los indicadores. */}
      {streakAtRisk && (
        <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <span
              className="inline-flex items-center gap-2 text-[15px] font-semibold"
              style={{ color: "var(--av-warn-fg)" }}
            >
              <AlertTriangle className="h-4 w-4" /> Tu racha está en riesgo
            </span>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Si no estudias hoy se reinicia. Con una pregunta la salvas.
            </p>
          </div>
          <Link to={DAILY_ACTION.href} className={appButtonClass({ variant: "secondary" })}>
            Salvar mi racha <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  )
}
