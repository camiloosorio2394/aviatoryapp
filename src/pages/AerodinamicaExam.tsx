import { ExamenModulo, type ExamenConfig } from "@/components/exam/ExamenModulo"
import { traerHistorialAerodinamica } from "@/services/intentosExamen"
import {
  AERO_APRENDE,
  AERO_EXAM_PER_ATTEMPT,
  AERO_HUB,
  AERO_LECTURA_TOTAL,
  AERO_PASS_SCORE,
  AERO_PRACTICA,
} from "@/lib/aerodinamica"
import { AERO_EVALUACION_META } from "@/lib/aerodinamicaEvaluacion"
import {
  fetchAerodinamicaProgress,
  pushPendingAerodinamica,
  readAerodinamicaLocal,
  writeAerodinamicaLocal,
} from "@/lib/aerodinamicaProgress"

/**
 * Quiz final de Aerodinámica: la misma pantalla que la de NOTAM y Mercancías,
 * con la evaluación aerodinamica_evaluacion del servidor, el acento azul acero
 * y el historial de `user_aerodinamica_exam_attempts`.
 *
 * Lo único propio es el cierre: cada pregunta del banco lleva su sección en los
 * metadatos, así que el resultado dice qué secciones repasar y enlaza cada una.
 *
 * Ruta: /app/aerolinea/aerodinamica/evaluacion
 */

/** "S04" → la ruta de la sección 4. Del banco salen S01 a S12. */
function rutaDeTema(tema: string): string | null {
  const m = /^S(\d\d)$/.exec(tema)
  if (!m) return null
  const n = Number(m[1])
  if (!Number.isInteger(n) || n < 1 || n > AERO_LECTURA_TOTAL) return null
  return `${AERO_APRENDE}?l=${n}`
}

const CONFIG: ExamenConfig = {
  nombre: "Aerodinámica",
  eyebrow: "Aerodinámica · Quiz final",
  volverTexto: "Volver a Aerodinámica",
  hub: AERO_HUB,
  leccion: AERO_APRENDE,
  practica: AERO_PRACTICA,
  totalLecciones: AERO_LECTURA_TOTAL,
  unidadLeccion: "secciones",
  porIntento: AERO_EXAM_PER_ATTEMPT,
  aprobacion: AERO_PASS_SCORE,
  aviso: AERO_EVALUACION_META.aviso,
  acento: "var(--av-ae-700)",
  evaluacion: "aerodinamica_evaluacion",
  temaARuta: rutaDeTema,
  temaARotulo: (tema) => `Sección ${Number(tema.slice(1))}`,
  leerLeidas: () => readAerodinamicaLocal().lessonScreens,
  escribirLeidas: (ns) => writeAerodinamicaLocal({ lessonScreens: ns }),
  sincronizarLeidas: async (uid) => {
    const traido = await fetchAerodinamicaProgress(uid)
    if (!traido) return null
    return (await pushPendingAerodinamica(traido)).lessonScreens
  },
  leerMejorLocal: () => readAerodinamicaLocal().bestScore,
  escribirMejorLocal: (score) => writeAerodinamicaLocal({ bestScore: score }),
  cargarHistorial: async (uid) => {
    const historial = await traerHistorialAerodinamica(uid)
    if (!historial) return null
    return {
      rows: historial.filas.map((r) => ({
        id: r.id,
        score: r.score,
        correct: r.correct,
        total: r.total,
        passed: r.score >= AERO_PASS_SCORE,
        duration: null,
        at: r.taken_at,
      })),
      count: historial.cuantos,
      best: historial.mejor,
    }
  },
  pasos: {
    leccion: `Las ${AERO_LECTURA_TOTAL} secciones: de las cuatro fuerzas al Coffin Corner, con la aplicación operacional de cada concepto.`,
    practica: "Trece escenarios de vuelo y cuarenta y nueve preguntas de entrevista técnica, por nivel.",
  },
}

export function AerodinamicaExam() {
  return <ExamenModulo config={CONFIG} />
}
