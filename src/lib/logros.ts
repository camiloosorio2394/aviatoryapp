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
import type { CSSProperties } from "react"
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

/**
 * Tres paradas por metal: sombra, cuerpo y brillo. Croma bajo a propósito (ver
 * arriba). Los usan la insignia y todo lo que en la página se tiñe de su metal.
 */
export const METAL_DE_NIVEL: Record<NivelDeLogro, [string, string, string]> = {
  bronze: ["#7A4E33", "#B98459", "#E6C19C"],
  silver: ["#6F7A89", "#B6BFCB", "#EDF0F4"],
  gold: ["#8C6A2B", "#CFAE5F", "#F2E2B1"],
  platinum: ["#56708F", "#A9BFD8", "#E8F0F9"],
}

/** El texto de cada metal sobre papel claro: la sombra, oscurecida hasta pasar AA. */
export const TINTA_DE_NIVEL: Record<NivelDeLogro, string> = {
  bronze: "#6B4129",
  silver: "#4F5968",
  gold: "#6E5220",
  platinum: "#3F5774",
}

/**
 * Las variables de metal que leen `.logros-pastilla`, `.logros-pedestal` y el
 * trofeo de la vitrina (index.css). Van con `data-metal` en el mismo elemento.
 */
export function estiloDeMetal(nivel: NivelDeLogro): CSSProperties {
  const [sombra, cuerpo, brillo] = METAL_DE_NIVEL[nivel]
  return {
    "--metal-sombra": sombra,
    "--metal-cuerpo": cuerpo,
    "--metal-brillo": brillo,
    "--metal-tinta": TINTA_DE_NIVEL[nivel],
  } as CSSProperties
}

/**
 * Lo que vale cada metal. Es la escala de los trofeos de consola (15, 30, 90 y
 * 180): el oro cuesta seis bronces porque un dominio de módulo cuesta mucho
 * más que abrir la lección.
 */
export const XP_DE_NIVEL: Record<NivelDeLogro, number> = {
  bronze: 15,
  silver: 30,
  gold: 90,
  platinum: 180,
}

/** Cada nivel de piloto pide lo mismo: 100 XP. */
export const XP_POR_RANGO = 100

/**
 * El nombre de cada tramo de niveles, por fases del vuelo. Son de juego a
 * propósito: un rango como «capitán» o «primer oficial» se leería como una
 * licencia o un cargo, y aquí no se certifica nada.
 */
const FASES_DE_VUELO: { desde: number; nombre: string }[] = [
  { desde: 1, nombre: "En plataforma" },
  { desde: 3, nombre: "Rodaje" },
  { desde: 6, nombre: "Despegue" },
  { desde: 10, nombre: "Ascenso" },
  { desde: 15, nombre: "Crucero" },
  { desde: 21, nombre: "Leyenda" },
]

export interface Rango {
  /** El nivel del piloto, desde 1. */
  numero: number
  fase: string
  /** El metal del emblema: sube con las fases. */
  metal: NivelDeLogro
  xp: number
  /** Lo ganado dentro del nivel actual, de 0 a XP_POR_RANGO. */
  xpEnRango: number
  xpParaSubir: number
}

export function rangoDePiloto(xp: number): Rango {
  const total = Math.max(0, Math.floor(xp))
  const numero = Math.floor(total / XP_POR_RANGO) + 1
  const fase = [...FASES_DE_VUELO].reverse().find((f) => numero >= f.desde)!.nombre
  const metal: NivelDeLogro = numero >= 21 ? "platinum" : numero >= 15 ? "gold" : numero >= 6 ? "silver" : "bronze"
  const xpEnRango = total % XP_POR_RANGO
  return { numero, fase, metal, xp: total, xpEnRango, xpParaSubir: XP_POR_RANGO - xpEnRango }
}

/** La XP de lo ganado. */
export function xpGanada(logros: { code: string; tier: NivelDeLogro }[], ganado: (code: string) => boolean): number {
  return logros.reduce((suma, l) => suma + (ganado(l.code) ? XP_DE_NIVEL[l.tier] : 0), 0)
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
  hub: m.hub,
  acento: m.acento,
  codigos: (["lesson", "practice", "exam", "master"] as const).map((s) => `${m.clave}_${s}`),
}))

const RACHAS = [3, 7, 30]

export interface Mision {
  code: string
  /** Cuánto lleva y cuánto pide: días de racha o pasos del módulo. */
  actual: number
  meta: number
  detalle: string
  href: string
}

/**
 * Lo que el piloto tiene más cerca, con avance que se puede medir: la racha
 * siguiente y el paso que sigue en los módulos que ya empezó (los más
 * avanzados primero). Si no alcanza, el primer paso de los que no ha abierto.
 * De los hitos sueltos (cien preguntas, comunidad) no hay avance que contar,
 * así que no entran.
 */
export function proximasMisiones({
  existe,
  ganado,
  racha,
  hrefDiario,
  maximo = 3,
}: {
  /** Si el logro está en la tabla: uno que no esté no se ofrece. */
  existe: (code: string) => boolean
  ganado: (code: string) => boolean
  racha: number
  hrefDiario: string
  maximo?: number
}): Mision[] {
  const misiones: Mision[] = []

  const meta = RACHAS.find((n) => existe(`streak_${n}`) && !ganado(`streak_${n}`))
  if (meta) {
    const actual = Math.min(Math.max(0, racha), meta)
    misiones.push({
      code: `streak_${meta}`,
      actual,
      meta,
      detalle: actual === 0 ? `Estudia hoy y empieza la cuenta hacia ${meta} días` : `${actual} de ${meta} días seguidos`,
      href: hrefDiario,
    })
  }

  const recorridos = MODULOS_DE_LOGROS.map((m) => {
    const suyos = m.codigos.filter(existe)
    const hechos = suyos.filter(ganado).length
    const siguiente = suyos.find((c) => !ganado(c))
    return { m, suyos, hechos, siguiente }
  }).filter((r) => r.siguiente)

  const empezados = recorridos.filter((r) => r.hechos > 0).sort((a, b) => b.hechos / b.suyos.length - a.hechos / a.suyos.length)
  const nuevos = recorridos.filter((r) => r.hechos === 0)
  for (const r of [...empezados, ...nuevos]) {
    misiones.push({
      code: r.siguiente!,
      actual: r.hechos,
      meta: r.suyos.length,
      detalle: r.hechos === 0 ? `Empieza ${r.m.titulo}` : `Paso ${r.hechos + 1} de ${r.suyos.length} en ${r.m.titulo}`,
      href: r.m.hub,
    })
  }

  return misiones.slice(0, maximo)
}

const LETRAS = ["L", "M", "X", "J", "V", "S", "D"]

/**
 * Los siete días de la semana en curso (lunes a domingo) y si hubo estudio en
 * cada uno. `hoy` es AAAA-MM-DD en Bogotá, que es con lo que la base cierra el día.
 */
export function semanaEnCurso(actividad: { date: string; activities_count: number }[], hoy: string) {
  const conEstudio = new Set(actividad.filter((d) => d.activities_count > 0).map((d) => d.date))
  const [a, m, d] = hoy.split("-").map(Number)
  const fecha = new Date(Date.UTC(a, m - 1, d))
  const lunes = new Date(fecha.getTime() - ((fecha.getUTCDay() + 6) % 7) * 86_400_000)
  return LETRAS.map((letra, i) => {
    const dia = new Date(lunes.getTime() + i * 86_400_000).toISOString().slice(0, 10)
    return { letra, dia, activo: conEstudio.has(dia), esHoy: dia === hoy, futuro: dia > hoy }
  })
}

/** Ganado en los últimos siete días: la vitrina lo marca como nuevo. */
export function esReciente(ganadoEl: string | undefined, ahora = new Date()): boolean {
  if (!ganadoEl) return false
  const t = Date.parse(ganadoEl)
  return Number.isFinite(t) && ahora.getTime() - t < 7 * 24 * 60 * 60 * 1000 && t <= ahora.getTime() + 60_000
}
