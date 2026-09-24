/**
 * El `Select` de la app es de Radix, que en jsdom no se puede abrir (pide
 * punteros y medidas que jsdom no tiene). En las pruebas de pantalla se cambia
 * por un `<select>` nativo con la misma API, que sí se puede elegir:
 *
 *   vi.mock("@/components/ui/select", () => import("@/test/selectNativo"))
 *
 * Lo que se prueba es la pantalla, no el desplegable.
 */
import type { ReactNode } from "react"

export function Select({
  value,
  onValueChange,
  children,
}: {
  value?: string
  onValueChange?: (valor: string) => void
  children?: ReactNode
}) {
  return (
    <select value={value ?? ""} onChange={(e) => onValueChange?.(e.target.value)}>
      <option value="" />
      {children}
    </select>
  )
}

/** El disparador y el valor visible no tienen equivalente en un `<select>`. */
export function SelectTrigger() {
  return null
}

export function SelectValue() {
  return null
}

export function SelectContent({ children }: { children?: ReactNode }) {
  return <>{children}</>
}

export function SelectItem({ value, children }: { value: string; children?: ReactNode }) {
  return <option value={value}>{children}</option>
}
