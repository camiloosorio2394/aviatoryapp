/**
 * El glifo de cada categoría del foro, aparte de lib/foro.ts para que el
 * middleware (que importa foro.ts) no cargue íconos ni React.
 */
import type { LucideIcon } from "lucide-react"
import { BriefcaseBusiness, CircleHelp, GraduationCap, MessageSquareQuote, MessagesSquare, Plane, Radar } from "lucide-react"
import type { ClaveCategoria } from "@/lib/foro"

const GLIFOS: Record<ClaveCategoria, LucideIcon> = {
  convocatorias: BriefcaseBusiness,
  entrevistas: MessageSquareQuote,
  avisos: Radar,
  cursos: GraduationCap,
  preguntas: CircleHelp,
  "vida-en-linea": Plane,
}

export function glifoDeCategoria(clave: string): LucideIcon {
  return GLIFOS[clave as ClaveCategoria] ?? MessagesSquare
}
