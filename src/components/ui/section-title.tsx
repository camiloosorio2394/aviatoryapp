import type { ComponentType, ReactNode } from "react"

interface Props {
  icon?: ComponentType<{ size?: number; className?: string }>
  eyebrow: string
  title: ReactNode
  hint?: ReactNode
  right?: ReactNode
}

/**
 * Encabezado de sección dentro de una página: eyebrow azul, título medio, pista
 * opcional y ranura a la derecha.
 *
 * Mismo patrón que los bloques del inicio (eyebrow, titular, bajada), a menor
 * escala. La pista subió de 12 a 13,5 px: en 12 px quedaba por debajo del texto
 * secundario del resto de la app y se leía como letra chica legal.
 */
export function SectionTitle({ icon: Ic, eyebrow, title, hint, right }: Props) {
  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <div>
        <div
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
          style={{ color: "var(--av-blue-500)" }}
        >
          {Ic && <Ic size={13} />} {eyebrow}
        </div>
        <div className="mt-1 text-[19px] font-bold text-foreground tracking-[-0.02em]">
          {title}
        </div>
        {hint && (
          <div className="text-[13.5px] text-muted-foreground mt-1 leading-relaxed">{hint}</div>
        )}
      </div>
      {right}
    </div>
  )
}
