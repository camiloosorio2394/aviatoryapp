import type { ComponentType } from "react"
import { Users } from "lucide-react"
import { AerodromeIcon, NdbIcon, VorIcon } from "@/components/icons/aero"
import { EXAM_PASS_SCORE as NOTAM_PASS_SCORE, NOTAM_TOTALES, NOTAM_PRACTICE_TOTAL } from "@/lib/notamComun"
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
export function notamPct(n: NotamResumen): number {
  const lessonPct = (Math.min(n.lesson, NOTAM_TOTALES.lessonScreens) / NOTAM_TOTALES.lessonScreens) * 100
  const practicePct = (Math.min(n.practice, NOTAM_PRACTICE_TOTAL) / NOTAM_PRACTICE_TOTAL) * 100
  const examPct = n.best !== null && n.best >= NOTAM_PASS_SCORE ? 100 : (n.best ?? 0)
  return Math.round((lessonPct + practicePct + examPct) / 3)
}
