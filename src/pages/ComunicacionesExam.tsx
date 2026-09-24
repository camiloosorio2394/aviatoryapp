import { ExamenModulo, type ExamenConfig } from "@/components/exam/ExamenModulo"
import {
  CM_ACENTO,
  CM_APRENDE,
  CM_EXAM_PER_ATTEMPT,
  CM_HUB,
  CM_LECTURA_TOTAL,
  CM_PASS_SCORE,
  CM_PRACTICA,
  CM_TITULO_CORTO,
  readComunicacionesLocal,
  writeComunicacionesLocal,
  writeComunicacionesMejor,
} from "@/lib/comunicaciones"
import { CM_EVALUACION_META } from "@/lib/comunicacionesEvaluacion"
import { fetchComunicacionesProgress, pushPendingComunicaciones } from "@/lib/comunicacionesProgress"
import { traerHistorialComunicaciones } from "@/services/intentosExamen"

/**
 * Evaluación de Comunicaciones ATC: la misma pantalla que la de Aeropuertos,
 * con la evaluación `comunicaciones_evaluacion` del servidor y la ciruela del
 * módulo. No se escribe nada nuevo: se configura `ExamenModulo`.
 *
 * La lección leída y el historial salen de la base, con el respaldo de este
 * navegador cuando la base no contesta (mientras Camilo no corra las
 * migraciones del módulo, ese es el caso normal y no se rompe nada).
 *
 * La puerta la decide además el servidor: `modulo_leccion` es
 * `comunicaciones`, así que `evaluacion_iniciar` no abre la evaluación a quien
 * no tenga las 69 lecciones en la base. Las lecciones que siguen «en
 * redacción» no se marcan como leídas, así que la evaluación queda cerrada
 * hasta que el contenido esté completo: es a propósito.
 *
 * Ruta: /app/aerolinea/comunicaciones/evaluacion
 */
const CONFIG: ExamenConfig = {
  nombre: CM_TITULO_CORTO,
  eyebrow: `${CM_TITULO_CORTO} · Evaluación`,
  volverTexto: `Volver a ${CM_TITULO_CORTO}`,
  hub: CM_HUB,
  leccion: CM_APRENDE,
  practica: CM_PRACTICA,
  totalLecciones: CM_LECTURA_TOTAL,
  unidadLeccion: "lecciones",
  porIntento: CM_EXAM_PER_ATTEMPT,
  aprobacion: CM_PASS_SCORE,
  aviso: CM_EVALUACION_META.aviso,
  acento: CM_ACENTO,
  evaluacion: "comunicaciones_evaluacion",
  leerLeidas: () => readComunicacionesLocal().lessonScreens,
  escribirLeidas: (ns) => writeComunicacionesLocal(ns),
  sincronizarLeidas: async (uid) => {
    const traido = await fetchComunicacionesProgress(uid)
    if (!traido) return null
    const remoto = await pushPendingComunicaciones(traido)
    return remoto.lessonScreens
  },
  leerMejorLocal: () => readComunicacionesLocal().bestScore,
  escribirMejorLocal: (score) => writeComunicacionesMejor(score),
  cargarHistorial: async (uid) => {
    const historial = await traerHistorialComunicaciones(uid)
    if (!historial) return null
    return {
      rows: historial.filas.map((r) => ({
        id: r.id,
        score: r.score,
        correct: r.correct,
        total: r.total,
        passed: r.score >= CM_PASS_SCORE,
        duration: null,
        at: r.taken_at,
      })),
      count: historial.cuantos,
      best: historial.mejor,
    }
  },
  pasos: {
    leccion: `Las ${CM_LECTURA_TOTAL} lecciones en ocho niveles: de la disciplina de radio a la emergencia, el data link y los factores humanos.`,
    practica: "Escuchar, copiar, colacionar y responder transmisiones con radio real, del despeje a la plataforma.",
  },
}

export function ComunicacionesExam() {
  return <ExamenModulo config={CONFIG} />
}
