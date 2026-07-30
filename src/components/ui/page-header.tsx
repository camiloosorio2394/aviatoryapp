import type { ReactNode } from "react"

interface Props {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
  children?: ReactNode
}

/**
 * Encabezado de página: eyebrow azul, titular grande, bajada y acciones a la derecha.
 * Va como primer elemento del contenido de cada página.
 *
 * La escala del titular es la misma que la de los bloques del inicio
 * (text-3xl sm:text-4xl, 800, tracking -0.03em). Lo que se alineó acá fue la
 * bajada, que iba en 14 px contra los 16 px del inicio, y el aire de abajo: con
 * mb-7 el titular quedaba pegado al primer bloque y la página se leía apretada
 * al lado de la landing.
 */
export function PageHeader({ eyebrow, title, subtitle, actions, children }: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-9 sm:mb-11">
      <div>
        {eyebrow && (
          <div className="inline-flex items-center gap-1.5 text-[13px] font-semibold mb-1.5"
            style={{ color: "var(--av-blue-500)" }}>
            {eyebrow}
          </div>
        )}
        <h1 className="m-0 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.05] text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 mb-0 text-muted-foreground text-[15.5px] leading-relaxed max-w-[640px]">
            {subtitle}
          </p>
        )}
        {children}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}
