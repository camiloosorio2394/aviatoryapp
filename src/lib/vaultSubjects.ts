import { Plane, Cloud, Compass, FileText, Settings, Activity, Brain, Shield, Wrench, Gauge, type LucideIcon } from "lucide-react"

export type SubjectColor = "cyan" | "blue" | "violet" | "amber" | "green" | "red"

interface SubjectMetaEntry {
  name: string
  shortName?: string
  icon?: LucideIcon
  color: SubjectColor
  description?: string
}

/**
 * Mapeo de subject_slug → metadata visible al usuario.
 *
 * Las preguntas en `vault_questions` se guardan con slugs técnicos
 * (`aerodinamica`, `meteorologia_op`, etc.). Acá los traducimos a
 * nombre humano, icono y color para la UI.
 *
 * Cuando llegue una tanda con un slug nuevo que no esté acá, la página
 * Pca.tsx hace fallback al slug mismo. Agregar entradas cuando carguemos
 * nuevas materias del banco PCA.
 */
export const SUBJECT_META: Record<string, SubjectMetaEntry> = {
  // PCA Aerocivil
  aerodinamica: {
    name: "Aerodinámica Básica",
    icon: Plane,
    color: "cyan",
    description: "Sustentación, perfil alar, factor de carga, pérdida, performance",
  },
  meteorologia: {
    name: "Meteorología",
    shortName: "Meteo",
    icon: Cloud,
    color: "blue",
    description: "Clima operacional, frentes, masas de aire, METAR/TAF",
  },
  navegacion: {
    name: "Navegación",
    icon: Compass,
    color: "violet",
    description: "Cartas, rumbo, deriva, GPS, navegación a estima",
  },
  reglamentacion: {
    name: "Reglamentación",
    shortName: "RAC",
    icon: FileText,
    color: "amber",
    description: "RAC, FAR, ICAO, espacios aéreos, prioridades",
  },
  motores: {
    name: "Motores",
    icon: Settings,
    color: "green",
    description: "Motor de pistón, hélices, encendido, combustión",
  },
  performance: {
    name: "Performance",
    icon: Activity,
    color: "amber",
    description: "Despegue, aterrizaje, ascenso, crucero, alcance",
  },
  factores_humanos: {
    name: "Factores Humanos",
    shortName: "FFHH",
    icon: Brain,
    color: "violet",
    description: "Fatiga, stress, decisiones, CRM, fisiología del vuelo",
  },
  seguridad_op: {
    name: "Seguridad Operacional",
    shortName: "SMS",
    icon: Shield,
    color: "red",
    description: "SMS, gestión de riesgo, prevención de accidentes",
  },
  "weight-balance": {
    name: "Weight & Balance",
    shortName: "W&B",
    icon: Wrench,
    color: "blue",
    description: "CG, distribución de carga, momentos, límites",
  },
  sistemas: {
    name: "Sistemas de Aeronaves",
    shortName: "Sistemas",
    icon: Wrench,
    color: "amber",
    description: "Magnetos, carburador, mezcla, hélices, detonación, enfriamiento",
  },
  instrumentos: {
    name: "Instrumentos de Vuelo",
    shortName: "Instrumentos",
    icon: Gauge,
    color: "blue",
    description: "Velocidades V, altímetro, número Mach, brújula, giroscópicos, EFD",
  },
  // Add more as content is loaded
}

export function getSubjectMeta(slug: string): SubjectMetaEntry {
  return SUBJECT_META[slug] ?? {
    name: slug.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    color: "cyan" as SubjectColor,
  }
}
