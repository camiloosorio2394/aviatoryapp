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
    <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
      <div>
        {eyebrow && (
          <div className="mono tabular-nums inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] uppercase mb-2"
            style={{ color: "var(--av-cyan-400)" }}>
            {eyebrow}
          </div>
        )}
        <h1 className="m-0 text-[34px] font-extrabold tracking-[-0.035em] text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 mb-0 text-muted-foreground text-sm max-w-[640px]">{subtitle}</p>
        )}
        {children}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}
