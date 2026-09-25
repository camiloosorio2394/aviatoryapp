import { LectorLeccion, type LectorModulo } from "@/components/lesson/LectorLeccion"
import { RAC_APRENDE, RAC_EVALUACION, RAC_HUB, RAC_TITULO } from "@/lib/rac"
import { RAC_LECCIONES, RAC_NIVELES } from "@/lib/racLeccion"
import {
  fetchRacProgress,
  markRacProgress,
  pushPendingRac,
  readRacLocal,
  writeRacLocal,
} from "@/lib/racProgress"

/**
 * RAC: las diecinueve unidades, con el mismo lector que el resto de
 * los módulos y el acento del tema (`lector-rc`).
 *
 * No lleva práctica aparte: las preguntas de cada unidad viven al final del
 * unidad, junto a lo que ponen a prueba, y se marcan al responderlas.
 *
 * `portadaAuto` queda en false mientras no existan las portadas de unidad: sin
 * esto el lector pintaría 19 huecos de portada.
 *
 * Ruta: /app/aerolinea/rac/aprende?l=1
 */
const MODULO: LectorModulo = {
  tema: "lector-notam lector-rc",
  nombre: RAC_TITULO,
  rotulo: "RAC · Módulo",
  hub: RAC_HUB,
  evaluacion: RAC_EVALUACION,
  portadas: "/modulos/rac",
  portadaRatio: "16 / 9",
  portadaAuto: false,
  actividad: "rac-leccion",
  lecciones: RAC_LECCIONES,
  niveles: RAC_NIVELES,
  alFinal: RAC_EVALUACION,
  textoFinal: "Evaluación →",
  leerLocal: () => readRacLocal().lessonScreens,
  escribirLocal: (ns) => {
    writeRacLocal({ lessonScreens: ns })
  },
  marcar: (n) => markRacProgress({ lessonScreen: n }),
  // Las preguntas se marcan al pedir la respuesta, que es el momento en que el
  // piloto ya pensó la suya. No se espera al final de la unidad: nadie
  // responde las diecinueve unidades de una sentada.
  marcarPractica: (clave) => {
    void markRacProgress({ practiceId: clave })
  },
  hidratar: async (uid) => {
    const traido = await fetchRacProgress(uid)
    if (!traido) return null
    const remoto = await pushPendingRac(traido)
    return remoto.lessonScreens
  },
}

export function RacLeccion() {
  return <LectorLeccion modulo={MODULO} />
}

// La ruta se exporta desde lib/rac; aquí solo para que quien importe la
// página encuentre a mano adónde apunta.
export const RAC_LECCION_RUTA = RAC_APRENDE
