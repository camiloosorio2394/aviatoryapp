import type { ComponentType, ReactNode } from "react"

interface Props {
  icon?: ComponentType<{ size?: number; className?: string }>
  eyebrow: string
  title: ReactNode
  hint?: ReactNode
  right?: ReactNode
}

/**
 * Encabezado de seccion. Sentence case y jerarquia por tamano y peso, no por
 * mayusculas con letterspacing: eso ultimo es registro de terminal, y aca
 * buscamos el de una app de escritorio bien hecha. El eyebrow es una linea
 * secundaria en gris, el titulo manda por tamano.
 */
export function SectionTitle({ icon: Ic, eyebrow, title, hint, right }: Props) {
  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <div className="min-w-0">
        <div className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground">
          {Ic && <Ic size={14} />} {eyebrow}
        </div>
        <div className="mt-0.5 text-[20px] font-semibold text-foreground tracking-[-0.021em] leading-tight">
          {title}
        </div>
        {hint && <div className="text-[13px] text-muted-foreground mt-1">{hint}</div>}
      </div>
      {right}
    </div>
  )
}
