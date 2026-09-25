import { ExamenModulo, type ExamenConfig } from "@/components/exam/ExamenModulo"
import { traerHistorialCombustible } from "@/services/intentosExamen"
import {
  CB_APRENDE,
  CB_EXAM_PER_ATTEMPT,
  CB_HUB,
  CB_LECTURA_TOTAL,
  CB_PASS_SCORE,
  CB_PRACTICA_RUTA,
  capituloDeTemaCb,
} from "@/lib/combustible"
import { CB_EVALUACION_META } from "@/lib/combustibleEvaluacion"
import {
  fetchCombustibleProgress,
  pushPendingCombustible,
  readCombustibleLocal,
  writeCombustibleLocal,
} from "@/lib/combustibleProgress"

/**
 * Evaluación de Gestión del combustible: la misma pantalla que la de los demás
 * módulos, con el banco combustible_evaluacion del servidor, el azul queroseno
 * y el historial de `user_combustible_exam_attempts`.
 *
 * Cada pregunta del banco lleva su capítulo en los metadatos («C16»), así que
 * el resultado dice qué capítulos repasar y enlaza cada uno.
 *
 * Ruta: /app/aerolinea/combustible/evaluacion
 */

function rutaDeTema(tema: string): string | null {
  const n = capituloDeTemaCb(tema)
  return n === null ? null : `${CB_APRENDE}?l=${n}`
}

function rotuloDeTema(tema: string): string {
  const n = capituloDeTemaCb(tema)
  return n === null ? tema : `Capítulo ${n}`
}

const CONFIG: ExamenConfig = {
  nombre: "Gestión del combustible",
  eyebrow: "Combustible · Evaluación",
  volverTexto: "Volver a Gestión del combustible",
  hub: CB_HUB,
  leccion: CB_APRENDE,
  practica: CB_PRACTICA_RUTA,
  totalLecciones: CB_LECTURA_TOTAL,
  unidadLeccion: "capítulos",
  generoLeccion: "m",
  porIntento: CB_EXAM_PER_ATTEMPT,
  aprobacion: CB_PASS_SCORE,
  aviso: CB_EVALUACION_META.aviso,
  acento: "var(--av-cb-700)",
  evaluacion: "combustible_evaluacion",
  temaARuta: rutaDeTema,
  temaARotulo: rotuloDeTema,
  leerLeidas: () => readCombustibleLocal().lessonScreens,
  escribirLeidas: (ns) => writeCombustibleLocal({ lessonScreens: ns }),
  sincronizarLeidas: async (uid) => {
    const traido = await fetchCombustibleProgress(uid)
    if (!traido) return null
    return (await pushPendingCombustible(traido)).lessonScreens
  },
  leerMejorLocal: () => readCombustibleLocal().bestScore,
  escribirMejorLocal: (score) => writeCombustibleLocal({ bestScore: score }),
  cargarHistorial: async (uid) => {
    const historial = await traerHistorialCombustible(uid)
    if (!historial) return null
    return {
      rows: historial.filas.map((r) => ({
        id: r.id,
        score: r.score,
        correct: r.correct,
        total: r.total,
        passed: r.score >= CB_PASS_SCORE,
        duration: null,
        at: r.taken_at,
      })),
      count: historial.cuantos,
      best: historial.mejor,
    }
  },
  pasos: {
    leccion: `Los ${CB_LECTURA_TOTAL} capítulos: de los componentes del block fuel al MAYDAY por combustible y los diez escenarios.`,
    practica: "Las 66 preguntas de los capítulos y los diez escenarios prácticos del capítulo 23.",
  },
}

export function CombustibleExam() {
  return <ExamenModulo config={CONFIG} />
}
