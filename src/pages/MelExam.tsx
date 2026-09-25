import { ExamenModulo, type ExamenConfig } from "@/components/exam/ExamenModulo"
import {
  MEL_ACENTO,
  MEL_APRENDE,
  MEL_EXAM_PER_ATTEMPT,
  MEL_HUB,
  MEL_LECTURA_TOTAL,
  MEL_PASS_SCORE,
  MEL_PRACTICA,
  MEL_TITULO_CORTO,
  readMelLocal,
  writeMelLocal,
  writeMelMejor,
} from "@/lib/mel"
import { MEL_EVALUACION_META } from "@/lib/melEvaluacion"
import { fetchMelProgress, pushPendingMel } from "@/lib/melProgress"
import { traerHistorialMel } from "@/services/intentosExamen"

/**
 * Evaluación de MEL: la misma pantalla que la de Comunicaciones ATC, con la
 * evaluación `mel_evaluacion` del servidor y el grafito del módulo. No se
 * escribe nada nuevo: se configura `ExamenModulo`.
 *
 * La lección leída y el historial salen de la base, con el respaldo de este
 * navegador cuando la base no contesta (mientras Camilo no corra las
 * migraciones del módulo, ese es el caso normal y no se rompe nada).
 *
 * La puerta la decide además el servidor: `modulo_leccion` es `mel`, así que
 * `evaluacion_iniciar` no abre la evaluación a quien no tenga las 40
 * lecciones en la base.
 *
 * Ruta: /app/aerolinea/mel/evaluacion
 */
const CONFIG: ExamenConfig = {
  nombre: MEL_TITULO_CORTO,
  eyebrow: `${MEL_TITULO_CORTO} · Evaluación`,
  volverTexto: `Volver a ${MEL_TITULO_CORTO}`,
  hub: MEL_HUB,
  leccion: MEL_APRENDE,
  practica: MEL_PRACTICA,
  totalLecciones: MEL_LECTURA_TOTAL,
  unidadLeccion: "lecciones",
  porIntento: MEL_EXAM_PER_ATTEMPT,
  aprobacion: MEL_PASS_SCORE,
  aviso: MEL_EVALUACION_META.aviso,
  acento: MEL_ACENTO,
  evaluacion: "mel_evaluacion",
  leerLeidas: () => readMelLocal().lessonScreens,
  escribirLeidas: (ns) => writeMelLocal(ns),
  sincronizarLeidas: async (uid) => {
    const traido = await fetchMelProgress(uid)
    if (!traido) return null
    const remoto = await pushPendingMel(traido)
    return remoto.lessonScreens
  },
  leerMejorLocal: () => readMelLocal().bestScore,
  escribirMejorLocal: (score) => writeMelMejor(score),
  cargarHistorial: async (uid) => {
    const historial = await traerHistorialMel(uid)
    if (!historial) return null
    return {
      rows: historial.filas.map((r) => ({
        id: r.id,
        score: r.score,
        correct: r.correct,
        total: r.total,
        passed: r.score >= MEL_PASS_SCORE,
        duration: null,
        at: r.taken_at,
      })),
      count: historial.cuantos,
      best: historial.mejor,
    }
  },
  pasos: {
    leccion: `Las ${MEL_LECTURA_TOTAL} lecciones en cinco niveles: de qué es la MEL a leer una entrada, llevar el defecto al despacho y su impacto en el vuelo.`,
    practica: "Encontrar el ítem, leer la entrada, calcular el plazo y decidir si el avión sale, con entradas reales de las MMEL.",
  },
}

export function MelExam() {
  return <ExamenModulo config={CONFIG} />
}
