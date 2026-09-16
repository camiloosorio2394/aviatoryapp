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

/**
 * Evaluación de Aeropuertos: la misma pantalla que la de NOTAM, Mercancías y
 * Aerodinámica, con la evaluación `aeropuertos_evaluacion` del servidor y el
 * violeta del módulo. No se escribe nada nuevo: se configura `ExamenModulo`.
 *
 * Dos cosas siguen pendientes del SQL que Camilo tiene que correr, y las dos
 * están escritas para cambiar en una línea cuando lo haga:
 *
 *   - `sincronizarLeidas` devuelve null porque el módulo todavía no tiene tabla
 *     de progreso ni RPC. La puerta de entrada la decide entonces lo leído en
 *     este navegador. Cuando la tabla exista, aquí entra su `fetch` + `push`,
 *     igual que en Mercancías, y la migración pone `modulo_leccion` para que la
 *     puerta la decida también el servidor.
 *   - `cargarHistorial` devuelve null porque `user_aeropuertos_exam_attempts`
 *     nace con esa misma migración. Mientras tanto la nota vive en el respaldo
 *     local, que es lo que el bloque de historial usa como máximo.
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
  sincronizarLeidas: async () => null,
  leerMejorLocal: () => readAeropuertosLocal().bestScore,
  escribirMejorLocal: (score) => writeAeropuertosMejor(score),
  cargarHistorial: async () => null,
  pasos: {
    leccion: `Las ${AP_LECTURA_TOTAL} lecciones en cinco niveles: de cómo se lee un aeropuerto a cómo se opera, con la entrevista de aerolínea al cierre de cada nivel.`,
    practica: "Reconocer lo que se ve en el pavimento, en los letreros y en las luces, y decidir qué se hace con ello.",
  },
}

export function AeropuertosExam() {
  return <ExamenModulo config={CONFIG} />
}
