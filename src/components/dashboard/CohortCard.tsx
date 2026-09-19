import { Flame, Users } from "lucide-react"
import type { Peer } from "@/components/dashboard/tipos"
import { EmptyState } from "@/components/dashboard/EmptyState"

/**
 * Los pilotos de tu misma etapa y su racha.
 *
 * La racha de cada uno va en texto neutro y no en la etiqueta ámbar: el ámbar
 * en esta app es un aviso, y cuatro avisos seguidos sobre rachas ajenas no
 * avisan de nada. La etiqueta ámbar de la barra superior sí se queda, porque es
 * la tuya y puede estar en riesgo.
 */
export function CohortCard({
  peers,
  stageLabel,
  loading,
}: {
  peers: Peer[]
  stageLabel: string
  loading: boolean
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl surface p-5">
      <h3 className="m-0 text-[15px] font-semibold tracking-[-0.01em] text-foreground">Tu cohorte</h3>
      <p className="m-0 mt-0.5 text-[12.5px] text-muted-foreground">
        {loading
          ? "Buscando pilotos como tú"
          : peers.length > 0
            ? `${peers.length} pilotos en ${stageLabel}`
            : `Pilotos en ${stageLabel}`}
      </p>

      {loading ? (
        <div className="mt-4 h-[150px] rounded-xl bg-muted animate-pulse" />
      ) : peers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Todavía no hay pilotos en tu etapa"
          line="Preséntate en la comunidad: el primero en llegar arma la cohorte."
          cta="Ir a comunidad"
          href="/app/comunidad"
        />
      ) : (
        <ul className="m-0 mt-3 flex list-none flex-col p-0">
          {peers.map((p) => (
            <li
              key={p.username}
              className="flex items-center gap-3 border-b border-border py-2.5 last:border-b-0"
            >
              <span
                className="mono flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-[12px] font-semibold text-background"
                aria-hidden
              >
                {p.username[0]?.toUpperCase() ?? "?"}
              </span>
              <span className="mono min-w-0 flex-1 truncate text-[14px] font-semibold text-foreground">
                @{p.username}
              </span>
              {p.current_streak > 0 && (
                <span className="inline-flex shrink-0 items-center gap-1 text-[12.5px] font-semibold text-muted-foreground">
                  <Flame className="h-3.5 w-3.5" aria-hidden />
                  <span className="tabular">{p.current_streak}</span>
                  <span className="sr-only">días de racha</span>
                  <span aria-hidden>d</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
