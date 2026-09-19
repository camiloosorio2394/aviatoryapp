import { useState } from "react"
import { Link } from "react-router-dom"
import { AlertTriangle, ArrowRight, Share2 } from "lucide-react"
import { toast } from "sonner"
import { shareStreak } from "@/lib/shareStreak"
import { appButtonClass } from "@/lib/buttonStyles"
import type { ActivityDay } from "@/components/dashboard/tipos"
import { DAILY_ACTION } from "@/components/dashboard/plan"

/**
 * Actividad. Sin datos no se dibujan 12 semanas en gris: una cuadrícula vacía
 * de 280px de alto ocupa media pantalla para no decir nada. Se colapsa a los 7
 * días de la semana en curso y crece cuando hay con qué llenarla.
 *
 * Absorbe además el aviso de racha en riesgo, que antes vivía en una card
 * aparte repitiendo un dato que ya está en el panel de indicadores.
 *
 * Es un mapa de calor de un solo tono, de claro a oscuro: la magnitud no
 * necesita más de un color, y la leyenda «Menos / Más» dice cómo leerlo. Las
 * celdas se estiran para llenar su tarjeta: con 14 px fijos, en una columna del
 * panel la rejilla quedaba arrinconada a la izquierda con el resto en blanco.
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
    <div className="flex h-full flex-col rounded-2xl surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="m-0 text-[15px] font-semibold tracking-[-0.01em] text-foreground">Actividad</h3>
          <p className="m-0 mt-0.5 text-[12.5px] text-muted-foreground">
            {total > 0 ? "Últimas 12 semanas" : "Esta semana"}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <div className="nh-display text-[26px] font-bold leading-none tracking-[-0.03em] text-foreground">
            {total > 0 ? total : "—"}
          </div>
          <div className="mt-1 text-[12px] text-muted-foreground">actividades</div>
        </div>
      </div>

      {loading ? (
        <div className="mt-4 h-[140px] rounded-xl bg-muted animate-pulse" />
      ) : total === 0 ? (
        <>
          {/* Una sola fila de 7 días en lugar de 12 semanas en gris. */}
          <div className="mt-4 flex items-end gap-2">
            {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="h-8 w-full rounded-lg" style={{ background: "var(--muted)" }} />
                <span className="text-[12px] text-muted-foreground">{d}</span>
              </div>
            ))}
          </div>
          <p className="m-0 mt-4 text-[13px] text-muted-foreground">Tu primera actividad aparece aquí hoy.</p>
        </>
      ) : (
        <>
          <div className="mt-4 flex items-start gap-2">
            <div className="flex flex-col gap-[3px]" aria-hidden>
              {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
                <div
                  key={i}
                  className="flex aspect-square w-3 items-center justify-end text-[11px] text-muted-foreground"
                >
                  {i % 2 === 0 ? d : ""}
                </div>
              ))}
            </div>
            <div className="grid min-w-0 flex-1 auto-cols-fr grid-flow-col gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex min-w-0 flex-col gap-[3px]">
                  {week.map((d) => (
                    <div
                      key={d.date}
                      className="aspect-square w-full max-w-[22px] rounded-[3px] transition-transform hover:scale-125"
                      style={{ background: color(d.activities_count) }}
                      title={`${d.date} · ${d.activities_count} actividad${d.activities_count !== 1 ? "es" : ""}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-end gap-2 text-[11.5px] text-muted-foreground">
            <span>Menos</span>
            {[0, 1, 3, 5, 7].map((c) => (
              <div key={c} className="h-[10px] w-[10px] rounded-[2px]" style={{ background: color(c) }} />
            ))}
            <span>Más</span>
          </div>

          {/* El pie: la mejor racha y, con racha viva, compartirla. La imagen
              sale con la marca y los galones del hito; compartir un cero no
              motiva, así que sin racha el botón no aparece. */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
            <span className="text-[12.5px] text-muted-foreground">
              {longestStreak > 0 ? `Mejor racha: ${longestStreak} días` : ""}
            </span>
            {streakDays > 0 && (
              <button
                type="button"
                onClick={() => void compartir()}
                disabled={sharing}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-background px-3 text-[12.5px] font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-60"
              >
                <Share2 className="h-3.5 w-3.5" aria-hidden />
                {sharing ? "Generando" : "Compartir racha"}
              </button>
            )}
          </div>
        </>
      )}

      {/* El aviso de racha vive aquí, junto a la actividad que lo produce, y no
          en una card propia repitiendo un dato que ya está en los indicadores.
          Ámbar porque es un aviso de verdad: si no estudias hoy, la pierdes. */}
      {streakAtRisk && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <div className="min-w-0">
            <span
              className="inline-flex items-center gap-2 text-[14px] font-semibold"
              style={{ color: "var(--av-warn-fg)" }}
            >
              <AlertTriangle className="h-4 w-4" aria-hidden /> Tu racha está en riesgo
            </span>
            <p className="m-0 mt-1 text-[12.5px] text-muted-foreground">
              Si no estudias hoy se reinicia. Con una pregunta la salvas.
            </p>
          </div>
          <Link to={DAILY_ACTION.href} className={appButtonClass({ variant: "secondary" })}>
            Salvar mi racha <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      )}
    </div>
  )
}
