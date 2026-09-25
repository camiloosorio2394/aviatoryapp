import { ExamenModulo, type ExamenConfig } from "@/components/exam/ExamenModulo"
import { traerHistorialPbn } from "@/services/intentosExamen"
import {
  PBN_APRENDE,
  PBN_EXAM_PER_ATTEMPT,
  PBN_HUB,
  PBN_LECTURA_TOTAL,
  PBN_PASS_SCORE,
  PBN_PRACTICA_RUTA,
  PBN_TITULO,
  leccionDeTemaPbn,
} from "@/lib/pbn"
import { PBN_EVALUACION_META } from "@/lib/pbnEvaluacion"
import {
  fetchPbnProgress,
  pushPendingPbn,
  readPbnLocal,
  writePbnLocal,
} from "@/lib/pbnProgress"

/**
 * Evaluación de PBN: la misma pantalla que la de los demás módulos, con el
 * banco pbn_evaluacion del servidor, el verde azulado del tema y el historial
 * de `user_pbn_exam_attempts`.
 *
 * Cada pregunta del banco lleva su capítulo en los metadatos, así que el
 * resultado dice qué repasar y enlaza cada capítulo.
 *
 * Ruta: /app/aerolinea/pbn/evaluacion
 */

function rutaDeTema(tema: string): string | null {
  const n = leccionDeTemaPbn(tema)
  return n === null ? null : `${PBN_APRENDE}?l=${n}`
}

const CONFIG: ExamenConfig = {
  nombre: PBN_TITULO,
  eyebrow: "PBN · Evaluación",
  volverTexto: "Volver a PBN",
  hub: PBN_HUB,
  leccion: PBN_APRENDE,
  practica: PBN_PRACTICA_RUTA,
  totalLecciones: PBN_LECTURA_TOTAL,
  unidadLeccion: "capítulos",
  generoLeccion: "m",
  porIntento: PBN_EXAM_PER_ATTEMPT,
  aprobacion: PBN_PASS_SCORE,
  aviso: PBN_EVALUACION_META.aviso,
  acento: "var(--av-pbn-700)",
  evaluacion: "pbn_evaluacion",
  temaARuta: rutaDeTema,
  temaARotulo: (tema) => `Capítulo ${leccionDeTemaPbn(tema) ?? tema}`,
  leerLeidas: () => readPbnLocal().lessonScreens,
  escribirLeidas: (ns) => writePbnLocal({ lessonScreens: ns }),
  sincronizarLeidas: async (uid) => {
    const traido = await fetchPbnProgress(uid)
    if (!traido) return null
    return (await pushPendingPbn(traido)).lessonScreens
  },
  leerMejorLocal: () => readPbnLocal().bestScore,
  escribirMejorLocal: (score) => writePbnLocal({ bestScore: score }),
  cargarHistorial: async (uid) => {
    const historial = await traerHistorialPbn(uid)
    if (!historial) return null
    return {
      rows: historial.filas.map((r) => ({
        id: r.id,
        score: r.score,
        correct: r.correct,
        total: r.total,
        passed: r.score >= PBN_PASS_SCORE,
        duration: null,
        at: r.taken_at,
      })),
      count: historial.cuantos,
      best: historial.mejor,
    }
  },
  pasos: {
    leccion: `Los ${PBN_LECTURA_TOTAL} capítulos: de qué es PBN a qué se reporta al aterrizar.`,
    practica: "Las noventa y seis preguntas de capítulo, con corrección inmediata y su fuente.",
  },
}

export function PbnExam() {
  return <ExamenModulo config={CONFIG} />
}
