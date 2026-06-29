/**
 * Respuestas personalizadas para el TEA Part 1 (Interview).
 *
 * Toma los datos reales del piloto (pilot_state) y arma un "ejemplo con tus
 * datos" para las preguntas que son SOBRE el candidato (job, experiencia,
 * planes, motivación). NO reemplaza la respuesta modelo de high register —
 * se muestra como punto de partida tuyo, con la advertencia de no recitarla
 * (el TEA penaliza respuestas memorizadas).
 *
 * Solo se personalizan las preguntas claramente data-driven; el resto devuelve
 * null y la UI muestra únicamente la respuesta modelo.
 */

export type InterviewStage =
  | "student_ppl"
  | "ppl"
  | "cpl_in_progress"
  | "cpl_ready"
  | "hour_building"
  | "airline_candidate"
  | "instructor"

export interface InterviewPilot {
  stage: InterviewStage | null
  totalHours: number | null
  hoursPic: number | null
  targetAirline: string | null
  licenses: string[] | null
  country: string | null
}

/** Frase de rol en inglés, encaja después de "At the moment I'm ...". */
const ROLE: Record<InterviewStage, string> = {
  student_ppl: "a student pilot, currently training for my private and commercial licences",
  ppl: "a private pilot, now building experience and working towards my commercial licence",
  cpl_in_progress: "a commercial pilot licence student, in the final stage of my training",
  cpl_ready: "a commercial pilot",
  hour_building: "a commercial pilot, currently building the flight hours I need for an airline",
  airline_candidate: "a commercial pilot preparing to apply to the airlines",
  instructor: "a flight instructor",
}

const roundH = (h: number) => Math.round(h)

function hoursSentence(p: InterviewPilot): string {
  if (!p.totalHours) return ""
  const pic = p.hoursPic ? `, roughly ${roundH(p.hoursPic)} of them as pilot in command` : ""
  return `So far I've logged around ${roundH(p.totalHours)} flight hours${pic}. `
}

function goalSentence(p: InterviewPilot): string {
  return p.targetAirline
    ? `My goal is to join ${p.targetAirline} as a first officer, so right now everything I do is aimed at meeting their entry requirements.`
    : "My goal is to build the experience I need to start an airline career."
}

function jobAnswer(p: InterviewPilot): string {
  const role = p.stage ? ROLE[p.stage] : "a trainee pilot"
  const where = p.country ? `, based in ${p.country}` : ""
  return `At the moment I'm ${role}${where}. ${hoursSentence(p)}${goalSentence(p)}`
}

function nextStep(p: InterviewPilot): string {
  switch (p.stage) {
    case "student_ppl":
    case "ppl":
      return "finish my commercial licence and instrument rating, and keep building flight hours"
    case "cpl_in_progress":
      return "complete my commercial licence"
    case "cpl_ready":
    case "hour_building":
      return "keep building hours and raise my English to the level the airlines require"
    case "airline_candidate":
      return "get through an airline selection process"
    case "instructor":
      return "build command time while I instruct"
    default:
      return "build the hours and qualifications an airline asks for"
  }
}

function plansAnswer(p: InterviewPilot): string {
  const goal = p.targetAirline ? `join ${p.targetAirline}` : "join a major airline"
  const hrs = p.totalHours
    ? `; I'm currently at around ${roundH(p.totalHours)} hours and working towards their minimums`
    : ""
  return `In the short term I want to ${nextStep(p)}. After that, my main goal is to ${goal} as a first officer${hrs}. In the long run I'd like to upgrade to captain and keep growing within the company.`
}

function decideAnswer(p: InterviewPilot): string {
  const where = p.country ? `Growing up in ${p.country}, ` : ""
  const hrs = p.totalHours
    ? ` and work my way up to the roughly ${roundH(p.totalHours)} hours I have today`
    : ""
  return `I decided quite early that I wanted to fly. ${where}I was fascinated by aircraft, and once I took my first flight the idea never left me. That's what pushed me to start my training${hrs}.`
}

function experienceAnswer(p: InterviewPilot): string | null {
  if (!p.totalHours) return null
  const pic = p.hoursPic ? `, about ${roundH(p.hoursPic)} of them as pilot in command` : ""
  const goal = p.targetAirline ? ` I'm building towards the minimums ${p.targetAirline} requires.` : ""
  return `I currently have around ${roundH(p.totalHours)} total flight hours${pic}.${goal}`
}

/**
 * Devuelve un ejemplo personalizado para la pregunta, o null si la pregunta no
 * es personalizable / faltan datos del piloto.
 */
export function personalizedInterviewAnswer(question: string, p: InterviewPilot): string | null {
  const hasData = !!(p.stage || p.totalHours || p.targetAirline || p.country)
  if (!hasData) return null
  const q = question.toLowerCase()

  if (/(what.?s.*your job)|(what is your job)|(tell me about your job)|(what do you do)/.test(q)) return jobAnswer(p)
  if (/(future plans)|(your plans)|(next step)|(where do you see yourself)|(plans for the future)/.test(q)) return plansAnswer(p)
  if ((/when did you/.test(q) && /decide/.test(q)) || /decide you wanted to be|why did you (want to )?become|why did you choose/.test(q)) return decideAnswer(p)
  if (/(how many hours)|(flying experience)|(flight hours)|(how much experience)|(how long have you been flying)/.test(q)) return experienceAnswer(p)

  return null
}
