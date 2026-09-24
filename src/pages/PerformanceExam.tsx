import { ExamenModulo, type ExamenConfig } from "@/components/exam/ExamenModulo"
import { traerHistorialPerformance } from "@/services/intentosExamen"
import {
  PERF_APRENDE,
  PERF_EXAM_PER_ATTEMPT,
  PERF_HUB,
  PERF_LECTURA_TOTAL,
  PERF_PASS_SCORE,
} from "@/lib/performance"
import { PERF_EVALUACION_META } from "@/lib/performanceEvaluacion"
import {
  fetchPerformanceProgress,
  pushPendingPerformance,
  readPerformanceLocal,
  writePerformanceLocal,
} from "@/lib/performanceProgress"

/**
 * Evaluación de Performance: la misma pantalla que la de los demás módulos,
 * con el banco performance_evaluacion del servidor, el acento bronce y el
 * historial de `user_performance_exam_attempts`.
 *
 * Cada pregunta del banco lleva su tema en los metadatos, así que el resultado
 * dice qué temas repasar y enlaza cada uno.
 *
 * Ruta: /app/aerolinea/performance/evaluacion
 */

/** El banco guarda el tema como número; de ahí sale la ruta de ese tema. */
function rutaDeTema(tema: string): string | null {
  const n = Number(tema)
  if (!Number.isInteger(n) || n < 1 || n > PERF_LECTURA_TOTAL) return null
  return `${PERF_APRENDE}?l=${n}`
}

const CONFIG: ExamenConfig = {
  nombre: "Performance",
  eyebrow: "Performance · Evaluación",
  volverTexto: "Volver a Performance",
  hub: PERF_HUB,
  leccion: PERF_APRENDE,
  // La práctica de este módulo no tiene pantalla: los ejercicios resueltos son
  // el tema 40, así que el enlace lleva directo allí.
  practica: `${PERF_APRENDE}?l=40`,
  totalLecciones: PERF_LECTURA_TOTAL,
  unidadLeccion: "temas",
  generoLeccion: "m",
  porIntento: PERF_EXAM_PER_ATTEMPT,
  aprobacion: PERF_PASS_SCORE,
  aviso: PERF_EVALUACION_META.aviso,
  acento: "var(--av-pf-700)",
  evaluacion: "performance_evaluacion",
  temaARuta: rutaDeTema,
  temaARotulo: (tema) => `Tema ${tema}`,
  leerLeidas: () => readPerformanceLocal().lessonScreens,
  escribirLeidas: (ns) => writePerformanceLocal({ lessonScreens: ns }),
  sincronizarLeidas: async (uid) => {
    const traido = await fetchPerformanceProgress(uid)
    if (!traido) return null
    return (await pushPendingPerformance(traido)).lessonScreens
  },
  leerMejorLocal: () => readPerformanceLocal().bestScore,
  escribirMejorLocal: (score) => writePerformanceLocal({ bestScore: score }),
  cargarHistorial: async (uid) => {
    const historial = await traerHistorialPerformance(uid)
    if (!historial) return null
    return {
      rows: historial.filas.map((r) => ({
        id: r.id,
        score: r.score,
        correct: r.correct,
        total: r.total,
        passed: r.score >= PERF_PASS_SCORE,
        duration: null,
        at: r.taken_at,
      })),
      count: historial.cuantos,
      best: historial.mejor,
    }
  },
  pasos: {
    leccion: `Los ${PERF_LECTURA_TOTAL} temas: de qué es la performance a cómo se lee un resultado del EFB.`,
    practica: "Los dieciocho ejercicios resueltos del tema 40 y los diez escenarios operacionales del 38.",
  },
}

export function PerformanceExam() {
  return <ExamenModulo config={CONFIG} />
}
