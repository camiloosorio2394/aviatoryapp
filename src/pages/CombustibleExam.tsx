import { ExamenModulo, type ExamenConfig } from "@/components/exam/ExamenModulo"
import { traerHistorialCombustible } from "@/services/intentosExamen"
import {
  CB_APRENDE,
  CB_EXAM_PER_ATTEMPT,
  CB_HUB,
  CB_LECTURA_TOTAL,
  CB_PASS_SCORE,
  CB_TITULO,
} from "@/lib/combustible"
import { CB_EVALUACION_META } from "@/lib/combustibleEvaluacion"
import {
  fetchCombustibleProgress,
  pushPendingCombustible,
  readCombustibleLocal,
  writeCombustibleLocal,
} from "@/lib/combustibleProgress"

/**
 * Evaluación de Gestión del combustible: la misma pantalla que la de los demás módulos, con
 * el banco combustible_evaluacion del servidor, el acento del tema y el historial
 * de `user_combustible_exam_attempts`.
 *
 * Cada pregunta del banco lleva su capítulo en los metadatos, así que el
 * resultado dice qué repasar y enlaza cada capítulo.
 *
 * Ruta: /app/aerolinea/combustible/evaluacion
 */

/** El banco guarda el capítulo como `C14`; de ahí sale su ruta. */
function rutaDeTema(tema: string): string | null {
  const n = Number(tema.replace(/^[A-Za-z]+/, ""))
  if (!Number.isInteger(n) || n < 1 || n > CB_LECTURA_TOTAL) return null
  return `${CB_APRENDE}?l=${n}`
}

const CONFIG: ExamenConfig = {
  nombre: CB_TITULO,
  eyebrow: "Gestión del combustible · Evaluación",
  volverTexto: "Volver a Gestión del combustible",
  hub: CB_HUB,
  leccion: CB_APRENDE,
  totalLecciones: CB_LECTURA_TOTAL,
  unidadLeccion: "capítulos",
  generoLeccion: "m",
  porIntento: CB_EXAM_PER_ATTEMPT,
  aprobacion: CB_PASS_SCORE,
  aviso: CB_EVALUACION_META.aviso,
  acento: "var(--av-cb-700)",
  evaluacion: "combustible_evaluacion",
  temaARuta: rutaDeTema,
  temaARotulo: (tema) => `Capítulo ${tema}`,
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
    leccion: "Los 23 capítulos: de los componentes del despacho al MAYDAY COMBUSTIBLE y el punto de decisión.",
    practica: "Las tres preguntas del final de cada capítulo, junto al concepto que ponen a prueba.",
  },
}

export function CombustibleExam() {
  return <ExamenModulo config={CONFIG} />
}
