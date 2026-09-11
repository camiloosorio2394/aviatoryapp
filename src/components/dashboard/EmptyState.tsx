import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { appButtonClass } from "@/lib/buttonStyles"
import type { IconComponent } from "@/components/dashboard/plan"

/**
 * Patrón único de estado vacío: tile con icono, título, una línea y una salida.
 * Lo comparten racha, logros y cohorte, que antes tenían tres vacíos distintos.
 */
export function EmptyState({
  icon: Ic,
  title,
  line,
  cta,
  href,
}: {
  icon: IconComponent
  title: string
  line: string
  cta: string
  href: string
}) {
  return (
    <div className="py-5 flex flex-col items-center text-center">
      <div className="flex items-center justify-center h-11 w-11 rounded-lg border border-border bg-muted text-muted-foreground">
        <Ic className="h-5 w-5" />
      </div>
      <div className="mt-3 text-[15px] font-semibold text-foreground tracking-[-0.015em]">{title}</div>
      <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed max-w-[34ch]">{line}</p>
      <Link
        to={href}
        className={appButtonClass({ variant: "secondary" }, "mt-4")}
      >
        {cta} <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  )
}
