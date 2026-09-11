/** Tipos compartidos por la pantalla de Perfil y sus partes. */

export type Stage =
  | "student_ppl"
  | "ppl"
  | "cpl_in_progress"
  | "cpl_ready"
  | "hour_building"
  | "instructor"
  | "airline_candidate"

export type UsernameStatus =
  | { state: "idle" }
  | { state: "unchanged" }
  | { state: "invalid"; reason: string }
  | { state: "checking" }
  | { state: "available" }
  | { state: "taken" }
  | { state: "error" }

/** Una dimensión del mapa de habilidades, ya calculada con datos reales. */
export interface Skill {
  key: string
  label: string
  value: number
  hasData: boolean
  raw: string
}

/** Certificado o licencia del piloto, tal como vive en Vencimientos. */
export interface CertRow {
  id: string
  license_type: string
  custom_name: string | null
  issued_date: string | null
  expires_date: string | null
}
