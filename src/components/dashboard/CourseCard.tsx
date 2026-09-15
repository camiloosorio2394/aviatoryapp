import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { accentText } from "@/lib/tileColors"
import type { IconComponent } from "@/components/dashboard/plan"

/**
 * Card de curso: cuánto llevas, qué sigue y una sola salida.
 *
 * La barra solo existe cuando hay avance real. Sin práctica registrada va un
 * guion y "Sin empezar": una barra en cero el primer día se lee como fracaso,
 * y un 0% sería un dato que la app no puede sostener.
 */
export function CourseCard({
  icon: Ic,
  color,
  eyebrow,
  title,
  href,
  pct,
  done,
  status,
  hint,
  cta,
}: {
  icon: IconComponent
  /**
   * El color, como token CSS (`var(--av-mt-500)`). Se recibe suelto y no como
   * clave de una paleta para que el acento de cada módulo viva en un solo sitio
   * (`lib/modulosAerolinea.ts`) y no haya que registrarlo también aquí: una
   * clave más que mantener es una clave más que se olvida al agregar un módulo.
   */
  color: string
  eyebrow: string
  title: string
  href: string
  pct: number | null
  done: boolean
  status: string
  hint: string
  cta: string
}) {
  return (
    <Link to={href} className="surface-lift group flex flex-col rounded-xl surface p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Los iconos aero solo aceptan className: el color viaja por
              currentColor desde el contenedor. */}
          <div
            className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
            style={{
              background: `color-mix(in oklab, ${color} 14%, transparent)`,
              border: `1px solid color-mix(in oklab, ${color} 20%, transparent)`,
              color: accentText(color, 75),
            }}
          >
            <Ic className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] text-muted-foreground">{eyebrow}</div>
            <div className="text-[17px] font-semibold text-foreground tracking-[-0.021em] truncate">
              {title}
            </div>
          </div>
        </div>
        {done && <span className="chip chip-green flex-shrink-0">Completo</span>}
      </div>

      <div className="mt-4">
        {pct === null ? (
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[13px] text-muted-foreground">{status}</span>
            <span className="text-[24px] font-semibold tracking-[-0.03em] text-muted-foreground/50">
              —
            </span>
          </div>
        ) : (
          <>
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <span className="text-[13px] text-muted-foreground">{status}</span>
              <span className="tabular-nums text-[24px] font-semibold tracking-[-0.03em] text-foreground">
                {pct}%
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden bg-muted">
              <div
                className="h-full rounded-full transition-[width] duration-700"
                style={{ width: `${pct}%`, background: color }}
              />
            </div>
          </>
        )}
      </div>

      <p className="mt-3 text-[13px] text-muted-foreground leading-snug flex-1">{hint}</p>

      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-[13px] font-semibold" style={{ color: accentText(color) }}>
          {cta}
        </span>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
}
