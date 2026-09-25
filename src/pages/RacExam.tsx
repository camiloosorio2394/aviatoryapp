import { ExamenModulo, type ExamenConfig } from "@/components/exam/ExamenModulo"
import { traerHistorialRac } from "@/services/intentosExamen"
import {
  RAC_APRENDE,
  RAC_EXAM_PER_ATTEMPT,
  RAC_HUB,
  RAC_LECTURA_TOTAL,
  RAC_PASS_SCORE,
  RAC_PRACTICA_RUTA,
  RAC_UNIDADES,
  leccionDeTemaRac,
} from "@/lib/rac"
import { RAC_EVALUACION_META } from "@/lib/racEvaluacion"
import { fetchRacProgress, pushPendingRac, readRacLocal, writeRacLocal } from "@/lib/racProgress"

/**
 * Evaluación del módulo RAC: la misma pantalla que la de los demás módulos,
 * con el banco rac_evaluacion del servidor, el acento grafito y el historial
 * de `user_rac_exam_attempts`.
 *
 * Cada pregunta del banco lleva su unidad en los metadatos («U05»), así que el
 * resultado dice qué reglamentos repasar y enlaza cada unidad.
 *
 * Ruta: /app/aerolinea/rac/evaluacion
 */

function rutaDeTema(tema: string): string | null {
  const n = leccionDeTemaRac(tema)
  return n === null ? null : `${RAC_APRENDE}?l=${n}`
}

function rotuloDeTema(tema: string): string {
  const n = leccionDeTemaRac(tema)
  return n === null ? tema : (RAC_UNIDADES[n - 1] ?? `Unidad ${n}`)
}

const CONFIG: ExamenConfig = {
  nombre: "RAC",
  eyebrow: "RAC · Evaluación",
  volverTexto: "Volver a RAC",
  hub: RAC_HUB,
  leccion: RAC_APRENDE,
  practica: RAC_PRACTICA_RUTA,
  totalLecciones: RAC_LECTURA_TOTAL,
  unidadLeccion: "unidades",
  porIntento: RAC_EXAM_PER_ATTEMPT,
  aprobacion: RAC_PASS_SCORE,
  aviso: RAC_EVALUACION_META.aviso,
  acento: "var(--av-rac-700)",
  evaluacion: "rac_evaluacion",
  temaARuta: rutaDeTema,
  temaARotulo: rotuloDeTema,
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
    leccion: `Las ${RAC_LECTURA_TOTAL} unidades: del RAC 2 y el RAC 61 (tu licencia) al RAC 121 (la aerolínea) y el RAC 13 (las sanciones).`,
    practica: "Las 54 preguntas de práctica, con la explicación y el numeral de cada respuesta.",
  },
}

export function RacExam() {
  return <ExamenModulo config={CONFIG} />
}
