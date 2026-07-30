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
          <div className="inline-flex items-center gap-1.5 text-[13px] font-semibold mb-1"
            style={{ color: "var(--av-blue-500)" }}>
            {eyebrow}
          </div>
        )}
        <h1 className="m-0 text-[32px] sm:text-[32px] font-semibold tracking-[-0.03em] leading-[1.05] text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 mb-0 text-muted-foreground text-[15px] max-w-[640px]">{subtitle}</p>
        )}
        {children}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}
