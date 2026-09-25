/**
 * Lo que comparten las tarjetas de la portada del panel y no es un
 * componente: formatos, textos de estado y la convocatoria de cada aerolínea.
 */
import type { ComponentType, CSSProperties } from "react"
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react"
import type { EstadoDeDocumento } from "@/lib/licencias"
import type { Airline } from "@/services/aerolineas"

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

/** Si la aerolínea tiene la convocatoria abierta o todavía no. */
export type EstadoConvocatoria = "abierta" | "pendiente"

/**
 * Las aerolíneas con convocatoria abierta, por código. Vacío a propósito: por
 * ahora todas salen «Pendiente por abrir». Cuando el dato viva en la base y se
 * actualice solo, esto se reemplaza por lo que venga de ahí; es el único sitio
 * que cambia.
 */
const CONVOCATORIAS_ABIERTAS = new Set<string>()

export function estadoDeConvocatoria(aerolinea: Pick<Airline, "code">): EstadoConvocatoria {
  return aerolinea.code && CONVOCATORIAS_ABIERTAS.has(aerolinea.code) ? "abierta" : "pendiente"
}

export const TEXTO_CONVOCATORIA: Record<EstadoConvocatoria, string> = {
  abierta: "Convocatoria abierta",
  pendiente: "Pendiente por abrir",
}
