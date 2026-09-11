/**
 * Constantes y funciones sueltas del Perfil.
 *
 * Van aparte de los componentes porque react-refresh no deja exportar
 * funciones desde un archivo que también exporta componentes: mezclarlas
 * rompería el recambio en caliente de toda la pantalla.
 */

import type { Stage } from "@/components/perfil/tipos"

export const USERNAME_REGEX = /^[a-z0-9_]{3,30}$/

export const STAGES: { value: Stage; label: string }[] = [
  { value: "student_ppl", label: "Estudiante PPL" },
  { value: "ppl", label: "PPL emitido" },
  { value: "cpl_in_progress", label: "Cursando CPL" },
  { value: "cpl_ready", label: "CPL emitido" },
  { value: "hour_building", label: "Hour building" },
  { value: "instructor", label: "Instructor de vuelo" },
  { value: "airline_candidate", label: "Candidato a aerolínea" },
]

export const LICENSES = ["PPL", "CPL", "IFR", "MEP", "ATPL"] as const

/** Próximo paso accionable por dimensión (a qué módulo ir para mejorarla). */
export const DIM_ADVICE: Record<string, { cta: string; href: string }> = {
  horas: { cta: "Registra tus vuelos en el Logbook", href: "/app/logbook" },
  pic: { cta: "Suma horas como PIC en el Logbook", href: "/app/logbook" },
  icao: { cta: "Haz el simulacro TEA", href: "/app/icao/simulacro" },
  licencias: { cta: "Carga tus licencias en Vencimientos", href: "/app/vencimientos" },
  xc: { cta: "Registra vuelos cross-country", href: "/app/logbook" },
  recurrencia: { cta: "Revisa tus vencimientos", href: "/app/vencimientos" },
}

export function icaoLevelLabel(n: number): string {
  if (n <= 3) return "Pre-operacional"
  if (n === 4) return "Operacional"
  if (n === 5) return "Extendido"
  return "Experto"
}

/** Días desde hoy hasta la fecha (negativo si ya pasó). */
export function cvDaysUntil(iso: string): number {
  const d = new Date(iso + "T00:00:00")
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((d.getTime() - today.getTime()) / 86400000)
}

export function cvDate(iso: string | null): string {
  if (!iso) return "—"
  return new Date(iso + "T00:00:00").toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })
}
