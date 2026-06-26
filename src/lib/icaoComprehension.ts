/**
 * TEA — Part 2: Interactive Comprehension.
 *
 * Contenido de práctica para las 3 sub-partes:
 *   2A — Short Audios (6 mensajes cortos): identificar el mensaje + quién habla.
 *   2B — Long Audios (4 mensajes largos): explicar problema + pedido + detalles.
 *   2C — Interactive Response (3 situaciones): formular preguntas + dar consejo.
 *
 * No tenemos los audios oficiales del examen, así que los `transcript` se
 * reproducen con voz sintetizada (Web Speech API). Es práctica — el examen real
 * usa grabaciones con acentos variados y ruido de cabina. Los transcripts y las
 * respuestas modelo sirven para autocorregirse DESPUÉS de intentar.
 */

export type Speaker = "pilot" | "controller"

export interface ShortAudio {
  id: number
  /** lo que "se escucha" (TTS lo lee) */
  transcript: string
  speaker: Speaker
  /** resumen modelo del mensaje (qué se esperaba captar) */
  messageSummary: string
}

export interface LongAudio {
  id: number
  transcript: string
  speaker: Speaker
  problem: string
  request: string
  /** detalles clave que conviene recordar (fuel, POB, posición, etc.) */
  details: string[]
}

export interface InteractiveScenario {
  id: number
  /** la situación que plantea el examinador (TTS la lee) */
  situation: string
  /** preguntas relevantes que el candidato podría formular */
  suggestedQuestions: string[]
  /** recomendaciones/consejos apropiados */
  suggestedAdvice: string[]
}

// ─── 2A · SHORT AUDIOS ───────────────────────────────────────────────────────
export const SHORT_AUDIOS: ShortAudio[] = [
  {
    id: 1,
    transcript:
      "Mayday, mayday, mayday. Speedbird two one seven, we have an engine fire and we are returning to the field immediately.",
    speaker: "pilot",
    messageSummary:
      "El piloto declara MAYDAY por un incendio de motor y va a regresar al aeródromo de inmediato.",
  },
  {
    id: 2,
    transcript:
      "Delta four five one, traffic alert, climb immediately, traffic eleven o'clock, two miles, opposite direction.",
    speaker: "controller",
    messageSummary:
      "El controlador da una alerta de tráfico e instruye trepar de inmediato por tráfico en sentido contrario a las 11 en punto, 2 millas.",
  },
  {
    id: 3,
    transcript:
      "Tower, Cessna three four X-ray, we have a rough-running engine and we request a priority landing.",
    speaker: "pilot",
    messageSummary:
      "El piloto reporta un motor funcionando irregular (rough-running) y solicita aterrizaje prioritario.",
  },
  {
    id: 4,
    transcript:
      "All stations, the airport is now closed due to a disabled aircraft on the runway. Expect holding.",
    speaker: "controller",
    messageSummary:
      "El controlador informa a todas las estaciones que el aeropuerto está cerrado por una aeronave inutilizada en pista; esperar holding.",
  },
  {
    id: 5,
    transcript:
      "Center, Air France two two, we are unable to maintain altitude due to severe icing and we request lower.",
    speaker: "pilot",
    messageSummary:
      "El piloto no puede mantener altitud por engelamiento severo (severe icing) y pide descender.",
  },
  {
    id: 6,
    transcript:
      "Lufthansa nine, go around, vehicle on the runway. I say again, go around.",
    speaker: "controller",
    messageSummary:
      "El controlador instruye motor y al aire (go-around) por un vehículo en la pista; repite la instrucción.",
  },
]

// ─── 2B · LONG AUDIOS ────────────────────────────────────────────────────────
export const LONG_AUDIOS: LongAudio[] = [
  {
    id: 1,
    transcript:
      "Pan-pan, pan-pan, pan-pan. London Control, Speedbird four eight two. We have a passenger with a suspected heart attack on board. We are at flight level three five zero and we need to divert to the nearest suitable airport. We require medical assistance on arrival. We have two hundred and ten passengers on board and three hours of fuel remaining.",
    speaker: "pilot",
    problem: "Un pasajero con sospecha de ataque cardíaco a bordo.",
    request: "Desviar al aeropuerto adecuado más cercano y asistencia médica a la llegada.",
    details: [
      "Llamada PAN-PAN (urgencia, no MAYDAY)",
      "Nivel de vuelo 350",
      "210 pasajeros a bordo",
      "3 horas de combustible restante",
    ],
  },
  {
    id: 2,
    transcript:
      "Iberia six two zero four, be advised, there is a large flock of birds reported two miles east of the field at five hundred feet. Braking action on runway two seven is reported medium to poor due to heavy rain. The wind is two six zero degrees at twenty knots, gusting thirty. Caution wake turbulence from a departing heavy.",
    speaker: "controller",
    problem:
      "Múltiples peligros en la aproximación: bandada de aves, frenado pobre y viento racheado.",
    request:
      "Es un aviso (be advised / caution): precaución por varios riesgos, no un pedido puntual.",
    details: [
      "Bandada de aves 2 millas al este, a 500 ft",
      "Frenado en pista 27: medio a pobre por lluvia fuerte",
      "Viento 260° a 20 kt, ráfagas 30 kt",
      "Precaución estela turbulenta de un 'heavy' que despega",
    ],
  },
  {
    id: 3,
    transcript:
      "Mayday, mayday, mayday. Center, Cactus one five four nine. We have had a double bird strike and we have lost thrust on both engines. We are unable to reach any airport. We are going to be in the Hudson. We have one hundred and fifty five souls on board.",
    speaker: "pilot",
    problem:
      "Doble impacto de aves con pérdida de empuje en ambos motores.",
    request:
      "No puede alcanzar ningún aeropuerto; va a amarizar (ditching) en el río Hudson.",
    details: [
      "MAYDAY (emergencia)",
      "Double bird strike, ambos motores sin empuje",
      "Unable to reach any airport",
      "155 personas a bordo (souls on board)",
    ],
  },
  {
    id: 4,
    transcript:
      "Tower, Ryanair three eight eight, we have smoke in the cabin and the source is unknown. We request an immediate landing with emergency services standing by. We will need to evacuate on the runway. We have one hundred and seventy eight passengers and crew on board.",
    speaker: "pilot",
    problem: "Humo en cabina de origen desconocido.",
    request:
      "Aterrizaje inmediato con servicios de emergencia listos; necesitará evacuar en la pista.",
    details: [
      "Humo en cabina, fuente desconocida",
      "Servicios de emergencia en standby",
      "Evacuación en pista",
      "178 pasajeros y tripulación a bordo",
    ],
  },
]

// ─── 2C · INTERACTIVE RESPONSE ───────────────────────────────────────────────
export const INTERACTIVE_SCENARIOS: InteractiveScenario[] = [
  {
    id: 1,
    situation:
      "A pilot reports that a passenger has become aggressive and is refusing to follow the cabin crew's instructions.",
    suggestedQuestions: [
      "Is the passenger physically violent, or only verbally aggressive?",
      "Has the passenger been restrained?",
      "Is there a doctor or any security personnel on board?",
      "Is the cabin crew safe at the moment?",
    ],
    suggestedAdvice: [
      "If there is a physical threat, advise the crew to restrain the passenger.",
      "Recommend the captain consider a precautionary diversion.",
      "Coordinate for police and security to meet the aircraft on arrival.",
      "Keep other passengers well away from the disruptive passenger.",
    ],
  },
  {
    id: 2,
    situation:
      "A controller informs you that the weather at your destination has deteriorated below minimums and is not expected to improve.",
    suggestedQuestions: [
      "What is the current visibility and cloud base?",
      "Is the weather still worsening, or has it stabilised?",
      "What is the weather at the nearest suitable alternate?",
      "How much holding fuel do we realistically have?",
    ],
    suggestedAdvice: [
      "Recommend diverting to a suitable alternate while fuel still allows it.",
      "Request the latest weather for two or three nearby airports.",
      "Only hold if there is a genuine chance of improvement.",
      "Declare a fuel state early if it starts to become critical.",
    ],
  },
  {
    id: 3,
    situation:
      "A pilot tells you that one of the landing gear indicators is not showing green and they are unsure if the gear is down and locked.",
    suggestedQuestions: [
      "Which gear is affected — the nose gear or a main gear?",
      "Have you tried recycling the landing gear?",
      "Have you carried out the alternate gear extension procedure?",
      "How much fuel do you have available to troubleshoot?",
    ],
    suggestedAdvice: [
      "Recommend a low pass so the tower can visually check the gear.",
      "Suggest completing the abnormal checklist for an unsafe gear indication.",
      "Have emergency services on standby for the landing.",
      "Consider burning off fuel to reduce the landing weight.",
    ],
  },
]
