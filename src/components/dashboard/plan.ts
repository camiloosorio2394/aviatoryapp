import type { ComponentType } from "react"
import { Users } from "lucide-react"
import { AerodromeIcon, LocalizerIcon, NdbIcon, VorIcon } from "@/components/icons/aero"
import { EXAM_PASS_SCORE as NOTAM_PASS_SCORE, NOTAM_TOTALES, NOTAM_PRACTICE_TOTAL } from "@/lib/notamComun"
import { METAR_CONTEO } from "@/lib/metarConteo"
import { MP_LECTURA_TOTAL, MP_PASS_SCORE, MP_PRACTICA_TOTAL } from "@/lib/mercancias"
import type { TileColorKey } from "@/lib/tileColors"
import type { NotamResumen, PilotStage } from "@/components/dashboard/tipos"

/** Días desde hoy hasta la fecha, negativo si ya pasó. */
export function daysUntil(iso: string): number {
  const d = new Date(iso + "T00:00:00")
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((d.getTime() - today.getTime()) / 86400000)
}

export const STAGE_LABEL: Record<PilotStage, string> = {
  student_ppl: "Estudiante PPL",
  ppl: "Piloto Privado",
  cpl_in_progress: "Cursando CPL",
  cpl_ready: "Piloto Comercial",
  hour_building: "Hour Building",
  instructor: "Instructor de Vuelo",
  airline_candidate: "Candidato a Aerolínea",
}

const STAGE_PROGRESS: Record<PilotStage, number> = {
  student_ppl: 12,
  ppl: 28,
  cpl_in_progress: 47,
  cpl_ready: 64,
  hour_building: 78,
  // El instructor acumula horas rápido pero sigue lejos del perfil de aerolínea.
  instructor: 74,
  airline_candidate: 92,
}

/**
 * Avance real a aerolínea: la etapa pesa 60%, el inglés ICAO 25% (la meta
 * es nivel 4, el mínimo legal) y la práctica reciente 15% (techo: 20
 * quizzes). Antes el número era solo la etapa y un candidato con ICAO 2
 * veía 92%, contradiciendo al propio insight de Wingman.
 */
export function computeAirlineProgress(stage: PilotStage, icao: number | null, attempts: number): number {
  const stageBase = STAGE_PROGRESS[stage]
  const icaoPct = (Math.min(icao ?? 0, 4) / 4) * 100
  const practicePct = (Math.min(attempts, 20) / 20) * 100
  return Math.round(0.6 * stageBase + 0.25 * icaoPct + 0.15 * practicePct)
}

export type IconComponent = ComponentType<{ size?: number; className?: string }>

export interface NextStep {
  title: string
  description: string
  href: string
  cta: string
  minutes: number
  icon: IconComponent
}

/**
 * Acción del día. La dueña única es la card "Quiz del día" que va justo debajo
 * del hero: el CTA del hero apunta ahí y el plan de hoy ya no repite el quiz,
 * así las 3 micro-acciones son distintas entre sí y distintas del quiz.
 */
export const DAILY_ACTION = { href: "/app/pca", cta: "Empezar quiz de hoy", minutes: 12 }

/** El test inicial manda mientras no haya nivel medido: sin él, el resto del
 *  tablero no tiene con qué calibrar. */
export const FIRST_ACTION = { href: "/app/test-inicial", cta: "Hacer test inicial", minutes: 15 }

export function buildTodayPlan(stage: PilotStage | null): NextStep[] {
  const baseWingman: NextStep = {
    title: "Pregúntale a Wingman",
    description: "Aclara un concepto que te quedó dando vueltas.",
    href: "/app/pca",
    cta: "Abrir Wingman",
    minutes: 8,
    icon: NdbIcon,
  }
  const baseIcao: NextStep = {
    title: "Inglés ICAO",
    description: "Vocabulario y audio del examen TEA, en bloques cortos.",
    href: "/app/icao",
    cta: "Practicar ICAO",
    minutes: 15,
    icon: VorIcon,
  }
  const baseAirline: NextStep = {
    title: "Revisa tu match",
    description: "Mira qué te falta para postular a tu aerolínea objetivo.",
    href: "/app/match",
    cta: "Ver aerolíneas",
    minutes: 5,
    icon: AerodromeIcon,
  }
  const baseCommunity: NextStep = {
    title: "Saluda a tu cohorte",
    description: "Preséntate y encuentra pilotos en tu misma etapa.",
    href: "/app/comunidad",
    cta: "Ir a comunidad",
    minutes: 3,
    icon: Users,
  }

  if (!stage) return [baseWingman, baseIcao, baseCommunity]
  switch (stage) {
    case "student_ppl":
    case "ppl":
      return [baseWingman, baseIcao, baseCommunity]
    case "cpl_in_progress":
    case "cpl_ready":
      return [baseWingman, baseIcao, baseAirline]
    case "hour_building":
    case "instructor":
    case "airline_candidate":
      return [baseAirline, baseIcao, baseCommunity]
  }
}

export function greetingTime(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Buenos días"
  if (hour < 19) return "Buenas tardes"
  return "Buenas noches"
}

export function trialDaysLeft(end: string | null): number | null {
  if (!end) return null
  const diff = new Date(end).getTime() - Date.now()
  if (diff <= 0) return 0
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

/**
 * Avance del curso NOTAM, con la misma fórmula del hub del módulo: lección,
 * práctica y evaluación pesan igual, y la evaluación aporta el mejor puntaje
 * (o el 100 si ya está aprobada). Si se toca allá, hay que tocarla aquí.
 */
export interface TotalesModulo {
  secciones: number
  practicas: number
  aprobacion: number
}

/**
 * Avance de un módulo: el promedio de lección, práctica y evaluación.
 *
 * La evaluación cuenta 100 apenas se aprueba y no su puntaje: pasarla con 84 no
 * es tener «menos módulo hecho» que pasarla con 96.
 */
export function avanceDeModulo(m: NotamResumen, t: TotalesModulo): number {
  const leccion = (Math.min(m.lesson, t.secciones) / t.secciones) * 100
  const practica = (Math.min(m.practice, t.practicas) / t.practicas) * 100
  const examen = m.best !== null && m.best >= t.aprobacion ? 100 : (m.best ?? 0)
  return Math.round((leccion + practica + examen) / 3)
}

export function notamPct(n: NotamResumen): number {
  return avanceDeModulo(n, MODULOS_AEROLINEA[0].totales)
}

/**
 * Los tres módulos de Ingreso a aerolínea, con el acento que el piloto se va a
 * encontrar al entrar. El panel mostraba solo NOTAM: Meteorología y Mercancías
 * están terminados y no aparecían en la pantalla de inicio por ningún lado.
 *
 * Los conteos son fijos a propósito. Importar `metar.ts` aquí se llevaría sus
 * 22 KB de ejercicios al trozo del inicio; `leccionesConteo.test.ts` vigila que
 * no se desfasen del contenido.
 */
export const MODULOS_AEROLINEA = [
  {
    clave: "notam" as const,
    icono: LocalizerIcon,
    color: "blue" as TileColorKey,
    titulo: "NOTAM",
    href: "/app/aerolinea/notam",
    totales: {
      secciones: NOTAM_TOTALES.lessonScreens,
      practicas: NOTAM_PRACTICE_TOTAL,
      aprobacion: NOTAM_PASS_SCORE,
    },
    promesa: "Lección y práctica con NOTAM reales de la Aerocivil.",
  },
  {
    clave: "metar" as const,
    icono: AerodromeIcon,
    color: "meteorologia" as TileColorKey,
    titulo: "Meteorología",
    href: "/app/aerolinea/meteorologia",
    totales: {
      secciones: METAR_CONTEO.secciones,
      practicas: METAR_CONTEO.practicas,
      aprobacion: METAR_CONTEO.aprobacion,
    },
    promesa: "METAR y TAF reales, decodificados campo por campo.",
  },
  {
    clave: "mercancias" as const,
    icono: NdbIcon,
    color: "mercancias" as TileColorKey,
    titulo: "Mercancías peligrosas",
    href: "/app/aerolinea/mercancias",
    totales: {
      secciones: MP_LECTURA_TOTAL,
      practicas: MP_PRACTICA_TOTAL,
      aprobacion: MP_PASS_SCORE,
    },
    promesa: "Las nueve clases, el etiquetado y qué hacer a bordo.",
  },
]
