/**
 * Cómo se llama y en qué estado está cada documento del piloto.
 *
 * Lo usan Vencimientos y el panel: si cada pantalla tuviera su lista de
 * nombres, un «Médico clase 1» en una sería «medical_class_1» en la otra.
 */
import type { LicenseType } from "@/services/documentos"

export const LICENSE_TYPE_LABEL: Record<LicenseType, string> = {
  medical_class_1: "Médico clase 1",
  medical_class_2: "Médico clase 2",
  medical_class_3: "Médico clase 3",
  ppl: "PPL · Piloto Privado",
  cpl: "CPL · Piloto Comercial",
  atpl: "ATPL · Línea Aérea",
  ifr: "Habilitación IFR",
  multi_engine: "Habilitación Multi-engine",
  flight_instructor: "Instructor de vuelo",
  type_rating: "Type Rating",
  icao_english: "Inglés ICAO",
  recurrent_check: "Recurrent check",
  other: "Otra",
}

/** El nombre que ve el piloto: el que escribió él, o el del tipo. */
export function nombreDeDocumento(d: { license_type: string; custom_name: string | null }): string {
  return d.custom_name?.trim() || LICENSE_TYPE_LABEL[d.license_type as LicenseType] || d.license_type
}

/** Los tres grupos del panel: la licencia, el médico y todo lo demás. */
export type GrupoDeDocumento = "licencia" | "medico" | "otros"

export function grupoDeDocumento(tipo: string): GrupoDeDocumento {
  if (tipo.startsWith("medical_")) return "medico"
  if (tipo === "ppl" || tipo === "cpl" || tipo === "atpl") return "licencia"
  return "otros"
}

export type EstadoDeDocumento = "vencido" | "por-vencer" | "vigente" | "sin-fecha"

/**
 * Vencido, por vencer (90 días o menos: la misma ventana del aviso del panel)
 * o vigente. Sin fecha de vencimiento no se inventa un estado.
 */
export function estadoDeDocumento(dias: number | null): EstadoDeDocumento {
  if (dias === null) return "sin-fecha"
  if (dias < 0) return "vencido"
  if (dias <= 90) return "por-vencer"
  return "vigente"
}
