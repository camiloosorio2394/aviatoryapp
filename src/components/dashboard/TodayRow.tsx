import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import type { NextStep } from "@/components/dashboard/plan"

/**
 * Fila compacta, no card. Tres cards de 180px para decir "Revisa tu match,
 * ~5 min" era mucho aire diciendo poco: una herramienta muestra varias cosas
 * ordenadas en poco espacio. El icono va en un cuadro neutro, porque tres
 * tintes pastel para tres acciones igual de importantes es decoración.
 */
export function TodayRow({ step, last }: { step: NextStep; last: boolean }) {
  const Ic = step.icon
  return (
    <Link
      to={step.href}
      className={`flex items-center gap-4 px-4 py-3 transition-colors hover:bg-muted/60 ${
        last ? "" : "border-b border-border"
      }`}
    >
      <Ic className="h-[22px] w-[22px] text-muted-foreground flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-semibold text-foreground tracking-[-0.015em]">
          {step.title}
        </div>
        <div className="text-[13px] text-muted-foreground leading-snug mt-1">
          {step.description}
        </div>
      </div>
      <span className="tabular-nums text-[13px] text-muted-foreground flex-shrink-0 hidden sm:block">
        {step.minutes} min
      </span>
      <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
    </Link>
  )
}
