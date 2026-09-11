import { Flame, Users } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"
import type { Peer } from "@/components/dashboard/tipos"
import { EmptyState } from "@/components/dashboard/EmptyState"

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
    <div className="rounded-xl surface p-5">
      <SectionTitle
        icon={Users}
        eyebrow="Tu cohorte"
        title={loading ? "Buscando pilotos como tú" : `${peers.length} pilotos en ${stageLabel}`}
      />
      {loading ? (
        <div className="h-[132px] rounded-xl bg-muted animate-pulse" />
      ) : peers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Todavía no hay pilotos en tu etapa"
          line="Preséntate en la comunidad: el primero en llegar arma la cohorte."
          cta="Ir a comunidad"
          href="/app/comunidad"
        />
      ) : (
        <div className="flex flex-col gap-2">
          {peers.map((p) => (
            <div
              key={p.username}
              className="flex items-center gap-3 px-2 py-2 rounded-lg transition-colors hover:bg-muted/50"
            >
              <div
                className="mono w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-[12px]"
                style={{ background: "var(--av-navy-800)" }}
              >
                {p.username[0]?.toUpperCase() ?? "?"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="mono text-[15px] font-semibold text-foreground">@{p.username}</div>
              </div>
              {p.current_streak > 0 && (
                <div className="chip chip-amber mono tabular-nums">
                  <Flame className="h-2.5 w-2.5" /> {p.current_streak}d
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
