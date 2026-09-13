import { ExamenModulo, type ExamenConfig } from "@/components/exam/ExamenModulo"
import { traerHistorialMercancias } from "@/services/intentosExamen"
import { MP_APRENDE, MP_EXAM_PER_ATTEMPT, MP_HUB, MP_LECTURA_TOTAL, MP_PASS_SCORE, MP_PRACTICA } from "@/lib/mercancias"
import { MP_EVALUACION_META } from "@/lib/mercanciasEvaluacion"
import {
  fetchMercanciasProgress,
  pushPendingMercancias,
  readMercanciasLocal,
  writeMercanciasLocal,
} from "@/lib/mercanciasProgress"

/**
 * Evaluación de Mercancías peligrosas: la misma pantalla que la de NOTAM, con la
 * evaluación mercancias_evaluacion del servidor, el acento amarillo y el historial
 * de `user_mercancias_exam_attempts` (score, correct, total, taken_at).
 *
 * Ruta: /app/aerolinea/mercancias/evaluacion
 */
const CONFIG: ExamenConfig = {
  nombre: "Mercancías peligrosas",
  eyebrow: "Mercancías peligrosas · Evaluación",
  volverTexto: "Volver a Mercancías peligrosas",
  hub: MP_HUB,
  leccion: MP_APRENDE,
  practica: MP_PRACTICA,
  totalLecciones: MP_LECTURA_TOTAL,
  unidadLeccion: "lecciones",
  porIntento: MP_EXAM_PER_ATTEMPT,
  aprobacion: MP_PASS_SCORE,
  aviso: MP_EVALUACION_META.aviso,
  acento: "var(--av-dg-700)",
  evaluacion: "mercancias_evaluacion",
  leerLeidas: () => readMercanciasLocal().lessonScreens,
  escribirLeidas: (ns) => writeMercanciasLocal({ lessonScreens: ns }),
  sincronizarLeidas: async (uid) => {
    const traido = await fetchMercanciasProgress(uid)
    if (!traido) return null
    return (await pushPendingMercancias(traido)).lessonScreens
  },
  leerMejorLocal: () => readMercanciasLocal().bestScore,
  escribirMejorLocal: (score) => writeMercanciasLocal({ bestScore: score }),
  cargarHistorial: async (uid) => {
    const historial = await traerHistorialMercancias(uid)
    if (!historial) return null
    return {
      rows: historial.filas.map((r) => ({
        id: r.id,
        score: r.score,
        correct: r.correct,
        total: r.total,
        passed: r.score >= MP_PASS_SCORE,
        duration: null,
        at: r.taken_at,
      })),
      count: historial.cuantos,
      best: historial.mejor,
    }
  },
  pasos: {
    leccion: `Las ${MP_LECTURA_TOTAL} lecciones en cinco niveles: de la definición al NOTOC, con el artículo de cada afirmación.`,
    practica: "Etiquetas, clasificación, escenarios operacionales y las preguntas de una entrevista técnica.",
  },
}

export function MercanciasExam() {
  return <ExamenModulo config={CONFIG} />
}
