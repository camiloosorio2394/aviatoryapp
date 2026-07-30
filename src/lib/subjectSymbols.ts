import type { ComponentType } from "react"
import { BookOpen, CloudSun, Gauge, Scale, Users } from "lucide-react"
import {
  AerodromeIcon,
  HoldingIcon,
  LocalizerIcon,
  NdbIcon,
  VorIcon,
  WaypointIcon,
} from "@/components/icons/aero"

type Symbol = ComponentType<{ className?: string }>

/**
 * Símbolo por materia del banco PCA.
 *
 * Se usa el símbolo de carta solo donde significa algo, que es la misma regla
 * con la que se introdujeron: forzarlo en todas las materias lo convertiría en
 * decoración, que es de lo que veníamos con los seis colores repartidos al azar.
 *
 * Donde ningún símbolo aeronáutico aporta (factores humanos, weight and
 * balance) se mantiene un icono neutro y legible.
 */
const MAP: Record<string, Symbol> = {
  // El VOR es la radioayuda: navegación aérea por excelencia.
  navegacion: VorIcon,
  // El localizador guía la aproximación por instrumentos.
  instrumentos: LocalizerIcon,
  // El aeródromo es el destino y el contexto de los procedimientos de área.
  procedimientos: AerodromeIcon,
  // El circuito de espera es una maniobra de performance y planificación.
  performance: HoldingIcon,
  // El NDB orienta de forma aproximada, como la reglamentación enmarca sin
  // resolver cada caso concreto.
  reglamentacion: WaypointIcon,
  // Sin símbolo de carta que aporte: iconos legibles y neutros.
  meteorologia: CloudSun,
  servicios_meteo: CloudSun,
  aerodinamica: Gauge,
  sistemas: NdbIcon,
  factores_humanos: Users,
  "weight-balance": Scale,
}

export function subjectSymbol(slug: string): Symbol {
  return MAP[slug] ?? BookOpen
}
