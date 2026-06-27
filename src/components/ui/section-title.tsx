import type { ComponentType, ReactNode } from "react"

interface Props {
  icon?: ComponentType<{ size?: number; className?: string }>
  eyebrow: string
  title: ReactNode
  hint?: ReactNode
  right?: ReactNode
}

/**
 * Section header inside a page: small cyan eyebrow + medium title + optional hint + right slot.
 */
export function SectionTitle({ icon: Ic, eyebrow, title, hint, right }: Props) {
  return (
    <div className="flex items-center justify-between gap-3 mb-3.5">
      <div>
        <div
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
          style={{ color: "var(--av-blue-500)" }}
        >
          {Ic && <Ic size={13} />} {eyebrow}
        </div>
        <div className="mt-0.5 text-[18px] font-bold text-foreground tracking-[-0.02em]">
          {title}
        </div>
        {hint && <div className="text-xs text-muted-foreground mt-0.5">{hint}</div>}
      </div>
      {right}
    </div>
  )
}
