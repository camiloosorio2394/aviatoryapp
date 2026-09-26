import type { ActivityDay } from "@/components/dashboard/tipos"

/**
 * Actividad de las últimas 12 semanas, en la página de Logros. Sin datos no
 * se dibujan 12 semanas en gris: una cuadrícula vacía ocupa media tarjeta
 * para no decir nada. Se colapsa a los 7 días de la semana en curso y crece
 * cuando hay con qué llenarla.
 *
 * Es un mapa de calor de un solo tono, de claro a oscuro: la magnitud no
 * necesita más de un color, y la leyenda «Menos / Más» dice cómo leerlo. Las
 * celdas tienen medida fija y la rejilla se centra: estiradas al ancho de la
 * tarjeta quedaban columnas sueltas con aire entre ellas.
 *
 * La racha, su aviso y el botón de compartir viven en la tarjeta de racha
 * (components/logros/Constancia.tsx), al lado.
 */
export function ActivityHeatmap({ data, loading }: { data: ActivityDay[]; loading: boolean }) {
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
    <section className="flex h-full min-w-0 flex-col rounded-3xl surface p-5 sm:p-6" aria-labelledby="logros-actividad">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 id="logros-actividad" className="logros-rotulo m-0 text-[11px] text-muted-foreground">
            Actividad
          </h2>
          <p className="m-0 mt-1 text-[12.5px] text-muted-foreground">{total > 0 ? "Últimas 12 semanas" : "Esta semana"}</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="logros-display text-[30px] font-bold leading-none text-foreground">{total > 0 ? total : "0"}</div>
          <div className="mt-1 text-[12px] text-muted-foreground">{total === 1 ? "actividad" : "actividades"}</div>
        </div>
      </div>

      {loading ? (
        <div className="mt-5 h-[150px] animate-pulse rounded-xl bg-muted" />
      ) : total === 0 ? (
        <>
          {/* Una sola fila de 7 días en lugar de 12 semanas en gris. */}
          <div className="mt-5 flex items-end gap-2">
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
          <div className="mt-5 flex justify-center gap-2 overflow-x-auto">
            <div className="flex flex-col gap-1" aria-hidden>
              {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
                <div key={i} className="flex h-4 w-3 items-center justify-end text-[10.5px] text-muted-foreground sm:h-[18px]">
                  {i % 2 === 0 ? d : ""}
                </div>
              ))}
            </div>
            <div className="flex gap-1">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                  {week.map((d) => (
                    <div
                      key={d.date}
                      className="h-4 w-4 rounded-[4px] transition-transform hover:scale-125 sm:h-[18px] sm:w-[18px]"
                      style={{ background: color(d.activities_count) }}
                      title={`${d.date} · ${d.activities_count} actividad${d.activities_count !== 1 ? "es" : ""}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto flex items-center justify-end gap-2 pt-4 text-[11.5px] text-muted-foreground">
            <span>Menos</span>
            {[0, 1, 3, 5, 7].map((c) => (
              <div key={c} className="h-[10px] w-[10px] rounded-[3px]" style={{ background: color(c) }} />
            ))}
            <span>Más</span>
          </div>
        </>
      )}
    </section>
  )
}
