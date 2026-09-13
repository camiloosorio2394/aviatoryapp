import { Link } from "react-router-dom"
import { ArrowRight, Headphones } from "lucide-react"
import { icaoLevelLabel } from "@/components/perfil/datos"

export function IcaoStatusField({ level, takenAt, source }: { level: number | null; takenAt: string | null; source: "mock" | "estimate" | null }) {
  if (level == null) {
    return (
      <>
        <Link
          to="/app/test-inicial"
          className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-border bg-muted/30 px-4 h-11 hover:bg-muted/50 transition-colors"
        >
          <span className="inline-flex items-center gap-2 text-[13px] text-muted-foreground">
            <Headphones className="h-4 w-4" /> Sin evaluar: haz el test inicial
          </span>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </Link>
        <p className="text-[12px] text-muted-foreground mt-1">
          Tu nivel ICAO sale del módulo, no se declara a mano.
        </p>
      </>
    )
  }
  const dateStr = takenAt
    ? new Date(takenAt).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })
    : null
  const isEstimate = source === "estimate"
  return (
    <>
      <div className="flex items-center justify-between gap-3 rounded-xl surface px-4 h-11">
        <span className="inline-flex items-baseline gap-2">
          <span className="text-[15px] font-semibold text-foreground tabular-nums">Nivel {level}</span>
          <span className="text-[13px] text-muted-foreground">
            {icaoLevelLabel(level)}{isEstimate ? " · estimado" : ""}
          </span>
        </span>
        <Link
          to="/app/icao/simulacro"
          className="text-[12px] font-semibold inline-flex items-center gap-1"
          style={{ color: "var(--av-blue-500)" }}
        >
          {isEstimate ? "Confirmar" : "Repetir"} <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <p className="text-[12px] text-muted-foreground mt-1">
        {isEstimate
          ? "Estimado del test inicial. Confirma tu nivel oficial con el simulacro TEA."
          : `${dateStr ? `Evaluado el ${dateStr} · ` : ""}sale de tu simulacro TEA, no se declara a mano.`}
      </p>
    </>
  )
}
