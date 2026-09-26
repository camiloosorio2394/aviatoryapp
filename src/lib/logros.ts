/**
 * Cómo se agrupa y cómo se dibuja cada logro de la tabla `achievements`.
 *
 * Cada insignia se arma con tres decisiones, para que las 57 se lean como una
 * sola colección y no como 57 dibujos sueltos:
 *
 * - **La forma dice el tipo**: medallón para la lección, hexágono para la
 *   práctica, escudo para la evaluación, alas de piloto para el módulo
 *   dominado y octágono para los hitos (primeros pasos, racha, banco PCA).
 * - **El metal dice el nivel** (`tier` de la base): bronce, plata, oro y
 *   platino, en tonos de poco croma. El ámbar y el rojo de la app son alerta y
 *   error; un oro saturado se leería como aviso, un champán no.
 * - **El glifo dice el tema**: la nube de Meteorología, la torre de
 *   Aeropuertos, el surtidor de Combustible.
 *
 * Un código nuevo sin entrada aquí cae en el grupo «Otros» con un glifo
 * genérico: la página no se rompe por un logro que agregue una migración.
 */
import type { LucideIcon } from "lucide-react"
import {
  Brain,
  ClipboardCheck,
  CloudSun,
  Flame,
  Footprints,
  Fuel,
  Gauge,
  Gem,
  GraduationCap,
  Headset,
  Languages,
  Layers,
  ListChecks,
  MessagesSquare,
  Package,
  PlaneTakeoff,
  Scale,
  ScrollText,
  Star,
  Target,
  TowerControl,
  Waypoints,
  Wind,
} from "lucide-react"
import { MODULOS_AEROLINEA, type ClaveModulo } from "@/lib/modulosAerolinea"

export type TipoDeLogro = "leccion" | "practica" | "evaluacion" | "dominio" | "hito"
export type NivelDeLogro = "bronze" | "silver" | "gold" | "platinum"

export const NOMBRE_DEL_NIVEL: Record<NivelDeLogro, string> = {
  bronze: "Bronce",
  silver: "Plata",
  gold: "Oro",
  platinum: "Platino",
}

export const NOMBRE_DEL_TIPO: Record<TipoDeLogro, string> = {
  leccion: "Lección",
  practica: "Práctica",
  evaluacion: "Evaluación",
  dominio: "Dominio",
  hito: "Hito",
}

/**
 * El tipo sale del sufijo del código (`notam_lesson`, `rvsm_master`…), pero
 * solo en los logros de un módulo: `subject_master` es un hito del banco PCA,
 * no el dominio de un módulo, aunque termine igual.
 */
export function tipoDeLogro(code: string): TipoDeLogro {
  if (!moduloDeLogro(code)) return "hito"
  if (code.endsWith("_lesson")) return "leccion"
  if (code.endsWith("_practice")) return "practica"
  if (code.endsWith("_exam")) return "evaluacion"
  if (code.endsWith("_master")) return "dominio"
  return "hito"
}

const GLIFO_DE_MODULO: Record<ClaveModulo, LucideIcon> = {
  notam: ScrollText,
  metar: CloudSun,
  mercancias: Package,
  aerodinamica: Wind,
  aeropuertos: TowerControl,
  performance: Gauge,
  comunicaciones: Headset,
  rac: Scale,
  combustible: Fuel,
  rvsm: Layers,
  pbn: Waypoints,
  mel: ClipboardCheck,
}

const GLIFO_DE_HITO: Record<string, LucideIcon> = {
  first_step: Footprints,
  first_quiz: ListChecks,
  first_100: Target,
  subject_master: GraduationCap,
  icao_climb: Languages,
  community_hello: MessagesSquare,
  founder_badge: Gem,
  streak_3: Flame,
  streak_7: Flame,
  streak_30: Flame,
  psico_simulacro: Brain,
  airline_mock_passed: PlaneTakeoff,
}

/** El módulo de Ingreso a aerolínea al que pertenece el logro, si pertenece a uno. */
export function moduloDeLogro(code: string): ClaveModulo | null {
  const prefijo = code.replace(/_(lesson|practice|exam|master)$/, "")
  return prefijo !== code && prefijo in GLIFO_DE_MODULO ? (prefijo as ClaveModulo) : null
}

export function glifoDeLogro(code: string): LucideIcon {
  const modulo = moduloDeLogro(code)
  if (modulo) return GLIFO_DE_MODULO[modulo]
  return GLIFO_DE_HITO[code] ?? Star
}

/** Las rachas llevan su número debajo de la llama: 3, 7 o 30 días. */
export function cifraDeLogro(code: string): string | null {
  const m = /^streak_(\d+)$/.exec(code)
  return m ? m[1] : null
}

export interface GrupoDeLogros {
  clave: string
  titulo: string
  /** Una línea bajo el título del grupo. */
  bajada: string
  codigos: string[]
}

/** Los grupos que no son módulos, en el orden en que se muestran. */
export const GRUPOS_DE_HITOS: GrupoDeLogros[] = [
  {
    clave: "inicio",
    titulo: "Primeros pasos",
    bajada: "Lo que se gana al empezar y al volver.",
    codigos: ["first_step", "first_quiz", "icao_climb", "community_hello", "founder_badge"],
  },
  {
    clave: "constancia",
    titulo: "Constancia",
    bajada: "Días seguidos de estudio. Un día sin estudiar reinicia la cuenta.",
    codigos: ["streak_3", "streak_7", "streak_30"],
  },
  {
    clave: "pca",
    titulo: "Examen PCA",
    bajada: "El banco de preguntas de la Aerocivil.",
    codigos: ["first_100", "subject_master"],
  },
  {
    clave: "seleccion",
    titulo: "Pruebas de selección",
    bajada: "Los simulacros que se parecen a la prueba de la aerolínea.",
    codigos: ["psico_simulacro", "airline_mock_passed"],
  },
]

/** Los módulos de Ingreso a aerolínea, en el orden de la portada, con sus cuatro logros. */
export const MODULOS_DE_LOGROS = MODULOS_AEROLINEA.map((m) => ({
  clave: m.clave,
  titulo: m.titulo,
  codigos: (["lesson", "practice", "exam", "master"] as const).map((s) => `${m.clave}_${s}`),
}))
