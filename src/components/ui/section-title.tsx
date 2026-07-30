import type { ComponentType, ReactNode } from "react"

interface Props {
  icon?: ComponentType<{ size?: number; className?: string }>
  eyebrow: string
  title: ReactNode
  hint?: ReactNode
  right?: ReactNode
}

/**
 * Encabezado de seccion. El eyebrow va en monoespaciada corta y en mayuscula,
 * el mismo registro que las etiquetas del panel de indicadores, para que toda
 * la app hable un solo idioma tipografico en lugar de dos.
 */
export function SectionTitle({ icon: Ic, eyebrow, title, hint, right }: Props) {
  return (
    <div className="flex items-center justify-between gap-3 mb-3.5">
      <div>
        <div className="mono inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {Ic && <Ic size={12} />} {eyebrow}
        </div>
        <div className="mt-1 text-[18px] font-bold text-foreground tracking-[-0.02em]">
          {title}
        </div>
        {hint && <div className="text-xs text-muted-foreground mt-0.5">{hint}</div>}
      </div>
      {right}
    </div>
  )
}
