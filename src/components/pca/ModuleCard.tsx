import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { appButtonClass } from "@/lib/buttonStyles"

interface Props {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  to: string
  cta: string
  /** Progreso real 0..100. undefined = esta tarjeta no mide progreso. */
  progress?: number
  /** Dato de apoyo bajo la barra, del tipo "38 de 459 preguntas". */
  meta?: string
  badge?: string
}

/**
 * Tarjeta de acción del módulo.
 *
 * La barra de progreso solo aparece cuando hay progreso que mostrar. Una barra
 * al cero por ciento en cada tarjeta convierte el panel en una lista de cosas
 * que no has hecho, que es justo lo contrario de lo que debe transmitir la
 * pantalla de entrada.
 */
export function ModuleCard({ icon: Icon, title, description, to, cta, progress, meta, badge }: Props) {
  const hasProgress = typeof progress === "number" && progress > 0

  return (
    <div className="surface rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-muted text-muted-foreground flex-shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        {badge && (
          <span
            className="text-[12px] px-2 py-0.5 rounded-md"
            style={{
              color: "var(--av-success-fg)",
              background: "color-mix(in oklab, var(--av-green-400) 14%, transparent)",
            }}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="min-w-0">
        <h3 className="text-[17px] font-semibold tracking-[-0.015em]">{title}</h3>
        <p className="mt-1 text-[15px] text-muted-foreground leading-snug">{description}</p>
      </div>

      {hasProgress && (
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[13px] text-muted-foreground">{meta}</span>
            <span className="tabular-nums text-[15px] font-semibold">{progress}%</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full overflow-hidden bg-muted">
            <div
              className="h-full rounded-full transition-[width] duration-700"
              style={{ width: `${progress}%`, background: "var(--av-blue-500)" }}
            />
          </div>
        </div>
      )}

      <Link to={to} className={appButtonClass({ variant: "secondary" }, "mt-auto w-full")}>
        {cta} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}
