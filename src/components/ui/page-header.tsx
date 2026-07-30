import type { ReactNode } from "react"

interface Props {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
  children?: ReactNode
}

/**
 * Top-of-page header: small cyan eyebrow + big title + subtitle + actions to the right.
 * Use as the first thing inside every page's main content.
 */
export function PageHeader({ eyebrow, title, subtitle, actions, children }: Props) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4 mb-8">
      <div className="min-w-0">
        {eyebrow && (
          <div className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground mb-1.5">
            {eyebrow}
          </div>
        )}
        <h1 className="m-0 text-[32px] font-semibold tracking-[-0.03em] leading-[1.1] text-foreground">
          {title}
        </h1>
        {/* Medida de lectura, no ancho disponible: por encima de unos 70
            caracteres por línea el ojo pierde el renglón al volver. */}
        {subtitle && (
          <p
            className="mt-2 mb-0 text-muted-foreground text-[15px] leading-relaxed max-w-[54ch]"
            style={{ textWrap: "pretty" }}
          >
            {subtitle}
          </p>
        )}
        {children}
      </div>
      {/* Alineado con el título y no con la base del bloque: si el subtítulo
          crece, el botón dejaba de tener relación con nada. */}
      {actions && <div className="flex flex-wrap gap-2 mt-1 sm:mt-7">{actions}</div>}
    </div>
  )
}
