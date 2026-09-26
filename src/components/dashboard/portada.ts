/**
 * Lo que comparten las tarjetas de la portada del panel y no es un
 * componente: formatos y textos de estado. La convocatoria de cada aerolínea
 * ya no se escribe aquí: sale de la tabla `convocatorias` (src/lib/convocatorias.ts).
 */
import type { ComponentType, CSSProperties } from "react"
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react"
import type { EstadoDeDocumento } from "@/lib/licencias"

/** Horas con separador de miles, a la colombiana. */
export const horas = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 })

/** Icono y color de cada estado de documento: los mismos en todas las tarjetas. */
export const ESTADO_VISUAL: Record<
  EstadoDeDocumento,
  { icono: ComponentType<{ className?: string; style?: CSSProperties }>; color: string }
> = {
  vencido: { icono: XCircle, color: "var(--av-danger-fg)" },
  "por-vencer": { icono: AlertTriangle, color: "var(--av-warn-fg)" },
  vigente: { icono: CheckCircle2, color: "var(--av-success-fg)" },
  "sin-fecha": { icono: CheckCircle2, color: "var(--av-success-fg)" },
}

export function textoDeEstado(estado: EstadoDeDocumento, dias: number | null): string {
  if (estado === "vencido") return "Vencido"
  if (estado === "por-vencer") return dias === 0 ? "Vence hoy" : `Vence en ${dias} ${dias === 1 ? "día" : "días"}`
  if (estado === "sin-fecha") return "Sin vencimiento"
  return "Vigente"
}

