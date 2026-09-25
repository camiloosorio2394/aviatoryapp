import { ExamenModulo, type ExamenConfig } from "@/components/exam/ExamenModulo"
import { traerHistorialRac } from "@/services/intentosExamen"
import {
  RAC_APRENDE,
  RAC_EXAM_PER_ATTEMPT,
  RAC_HUB,
  RAC_LECTURA_TOTAL,
  RAC_PASS_SCORE,
  RAC_TITULO,
} from "@/lib/rac"
import { RAC_EVALUACION_META } from "@/lib/racEvaluacion"
import {
  fetchRacProgress,
  pushPendingRac,
  readRacLocal,
  writeRacLocal,
} from "@/lib/racProgress"

/**
 * Evaluación de RAC: la misma pantalla que la de los demás módulos, con
 * el banco rac_evaluacion del servidor, el acento del tema y el historial
 * de `user_rac_exam_attempts`.
 *
 * Cada pregunta del banco lleva su unidad en los metadatos, así que el
 * resultado dice qué repasar y enlaza cada unidad.
 *
 * Ruta: /app/aerolinea/rac/evaluacion
 */

/** El banco guarda la unidad como `U07`; de ahí sale su ruta. */
function rutaDeTema(tema: string): string | null {
  const n = Number(tema.replace(/^[A-Za-z]+/, ""))
  if (!Number.isInteger(n) || n < 1 || n > RAC_LECTURA_TOTAL) return null
  return `${RAC_APRENDE}?l=${n}`
}

const CONFIG: ExamenConfig = {
  nombre: RAC_TITULO,
  eyebrow: "RAC · Evaluación",
  volverTexto: "Volver a RAC",
  hub: RAC_HUB,
  leccion: RAC_APRENDE,
  totalLecciones: RAC_LECTURA_TOTAL,
  unidadLeccion: "unidades",
  generoLeccion: "f",
  porIntento: RAC_EXAM_PER_ATTEMPT,
  aprobacion: RAC_PASS_SCORE,
  aviso: RAC_EVALUACION_META.aviso,
  acento: "var(--av-rc-700)",
  evaluacion: "rac_evaluacion",
  temaARuta: rutaDeTema,
  temaARotulo: (tema) => `Unidad ${tema}`,
  leerLeidas: () => readRacLocal().lessonScreens,
  escribirLeidas: (ns) => writeRacLocal({ lessonScreens: ns }),
  sincronizarLeidas: async (uid) => {
    const traido = await fetchRacProgress(uid)
    if (!traido) return null
    return (await pushPendingRac(traido)).lessonScreens
  },
  leerMejorLocal: () => readRacLocal().bestScore,
  escribirMejorLocal: (score) => writeRacLocal({ bestScore: score }),
  cargarHistorial: async (uid) => {
    const historial = await traerHistorialRac(uid)
    if (!historial) return null
    return {
      rows: historial.filas.map((r) => ({
        id: r.id,
        score: r.score,
        correct: r.correct,
        total: r.total,
        passed: r.score >= RAC_PASS_SCORE,
        duration: null,
        at: r.taken_at,
      })),
      count: historial.cuantos,
      best: historial.mejor,
    }
  },
  pasos: {
    leccion: "Las 19 unidades: de tu licencia y tu médico a la investigación de accidentes y el régimen sancionatorio.",
    practica: "Las preguntas del final de cada unidad, que se responden con la norma que acabas de leer.",
  },
}

export function RacExam() {
  return <ExamenModulo config={CONFIG} />
}
