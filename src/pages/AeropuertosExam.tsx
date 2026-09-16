import { ExamenModulo, type ExamenConfig } from "@/components/exam/ExamenModulo"
import {
  AP_ACENTO,
  AP_APRENDE,
  AP_EXAM_PER_ATTEMPT,
  AP_HUB,
  AP_LECTURA_TOTAL,
  AP_PASS_SCORE,
  AP_PRACTICA,
  readAeropuertosLocal,
  writeAeropuertosLocal,
  writeAeropuertosMejor,
} from "@/lib/aeropuertos"
import { AP_EVALUACION_META } from "@/lib/aeropuertosEvaluacion"
import { fetchAeropuertosProgress, pushPendingAeropuertos } from "@/lib/aeropuertosProgress"
import { traerHistorialAeropuertos } from "@/services/intentosExamen"

/**
 * Evaluación de Aeropuertos: la misma pantalla que la de NOTAM, Mercancías y
 * Aerodinámica, con la evaluación `aeropuertos_evaluacion` del servidor y el
 * violeta del módulo. No se escribe nada nuevo: se configura `ExamenModulo`.
 *
 * La lección leída y el historial salen de la base, como en Mercancías. Las dos
 * consultas devuelven null cuando la base no contesta, y entonces la pantalla
 * sigue con el respaldo de este navegador: mientras Camilo no corra las dos
 * migraciones del módulo, ese es el caso normal y no se rompe nada.
 *
 * La puerta de entrada la decide además el servidor: `modulo_leccion` queda en
 * `aeropuertos` con la migración de progreso, y desde ahí `evaluacion_iniciar`
 * se niega a abrir la evaluación de quien no terminó las veintidós lecciones.
 *
 * Ruta: /app/aerolinea/aeropuertos/evaluacion
 */
const CONFIG: ExamenConfig = {
  nombre: "Aeropuertos",
  eyebrow: "Aeropuertos · Evaluación",
  volverTexto: "Volver a Aeropuertos",
  hub: AP_HUB,
  leccion: AP_APRENDE,
  practica: AP_PRACTICA,
  totalLecciones: AP_LECTURA_TOTAL,
  unidadLeccion: "lecciones",
  porIntento: AP_EXAM_PER_ATTEMPT,
  aprobacion: AP_PASS_SCORE,
  aviso: AP_EVALUACION_META.aviso,
  acento: AP_ACENTO,
  evaluacion: "aeropuertos_evaluacion",
  leerLeidas: () => readAeropuertosLocal().lessonScreens,
  escribirLeidas: (ns) => writeAeropuertosLocal(ns),
  sincronizarLeidas: async (uid) => {
    const traido = await fetchAeropuertosProgress(uid)
    if (!traido) return null
    const remoto = await pushPendingAeropuertos(traido)
    return remoto.lessonScreens
  },
  leerMejorLocal: () => readAeropuertosLocal().bestScore,
  escribirMejorLocal: (score) => writeAeropuertosMejor(score),
  cargarHistorial: async (uid) => {
    const historial = await traerHistorialAeropuertos(uid)
    if (!historial) return null
    return {
      rows: historial.filas.map((r) => ({
        id: r.id,
        score: r.score,
        correct: r.correct,
        total: r.total,
        passed: r.score >= AP_PASS_SCORE,
        duration: null,
        at: r.taken_at,
      })),
      count: historial.cuantos,
      best: historial.mejor,
    }
  },
  pasos: {
    leccion: `Las ${AP_LECTURA_TOTAL} lecciones en cinco niveles: de cómo se lee un aeropuerto a cómo se opera, con la entrevista de aerolínea al cierre de cada nivel.`,
    practica: "Reconocer lo que se ve en el pavimento, en los letreros y en las luces, y decidir qué se hace con ello.",
  },
}

export function AeropuertosExam() {
  return <ExamenModulo config={CONFIG} />
}
