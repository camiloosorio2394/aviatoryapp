import { ExamenModulo, type ExamenConfig } from "@/components/exam/ExamenModulo"
import { traerHistorialRvsm } from "@/services/intentosExamen"
import {
  RVSM_APRENDE,
  RVSM_EXAM_PER_ATTEMPT,
  RVSM_HUB,
  RVSM_LECTURA_TOTAL,
  RVSM_PASS_SCORE,
  RVSM_PRACTICA_RUTA,
  RVSM_TITULO,
  leccionDeTemaRvsm,
} from "@/lib/rvsm"
import { RVSM_EVALUACION_META } from "@/lib/rvsmEvaluacion"
import {
  fetchRvsmProgress,
  pushPendingRvsm,
  readRvsmLocal,
  writeRvsmLocal,
} from "@/lib/rvsmProgress"

/**
 * Evaluación de RVSM: la misma pantalla que la de los demás módulos, con el
 * banco rvsm_evaluacion del servidor, el verde azulado del tema y el historial
 * de `user_rvsm_exam_attempts`.
 *
 * Cada pregunta del banco lleva su capítulo en los metadatos, así que el
 * resultado dice qué repasar y enlaza cada capítulo.
 *
 * Ruta: /app/aerolinea/rvsm/evaluacion
 */

function rutaDeTema(tema: string): string | null {
  const n = leccionDeTemaRvsm(tema)
  return n === null ? null : `${RVSM_APRENDE}?l=${n}`
}

const CONFIG: ExamenConfig = {
  nombre: RVSM_TITULO,
  eyebrow: "RVSM · Evaluación",
  volverTexto: "Volver a RVSM",
  hub: RVSM_HUB,
  leccion: RVSM_APRENDE,
  practica: RVSM_PRACTICA_RUTA,
  totalLecciones: RVSM_LECTURA_TOTAL,
  unidadLeccion: "capítulos",
  generoLeccion: "m",
  porIntento: RVSM_EXAM_PER_ATTEMPT,
  aprobacion: RVSM_PASS_SCORE,
  aviso: RVSM_EVALUACION_META.aviso,
  acento: "var(--av-rv-700)",
  evaluacion: "rvsm_evaluacion",
  temaARuta: rutaDeTema,
  temaARotulo: (tema) => `Capítulo ${leccionDeTemaRvsm(tema) ?? tema}`,
  leerLeidas: () => readRvsmLocal().lessonScreens,
  escribirLeidas: (ns) => writeRvsmLocal({ lessonScreens: ns }),
  sincronizarLeidas: async (uid) => {
    const traido = await fetchRvsmProgress(uid)
    if (!traido) return null
    return (await pushPendingRvsm(traido)).lessonScreens
  },
  leerMejorLocal: () => readRvsmLocal().bestScore,
  escribirMejorLocal: (score) => writeRvsmLocal({ bestScore: score }),
  cargarHistorial: async (uid) => {
    const historial = await traerHistorialRvsm(uid)
    if (!historial) return null
    return {
      rows: historial.filas.map((r) => ({
        id: r.id,
        score: r.score,
        correct: r.correct,
        total: r.total,
        passed: r.score >= RVSM_PASS_SCORE,
        duration: null,
        at: r.taken_at,
      })),
      count: historial.cuantos,
      best: historial.mejor,
    }
  },
  pasos: {
    leccion: `Los ${RVSM_LECTURA_TOTAL} capítulos: de qué es RVSM a qué se reporta al aterrizar.`,
    practica: "Las noventa y seis preguntas de capítulo, con corrección inmediata y su fuente.",
  },
}

export function RvsmExam() {
  return <ExamenModulo config={CONFIG} />
}
