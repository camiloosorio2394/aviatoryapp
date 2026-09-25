import { LectorLeccion, type LectorModulo } from "@/components/lesson/LectorLeccion"
import { PBN_APRENDE, PBN_EVALUACION, PBN_HUB, PBN_TITULO } from "@/lib/pbn"
import { PB_LECCIONES, PB_NIVELES } from "@/lib/pbnLeccion"
import {
  fetchPbnProgress,
  markPbnProgress,
  pushPendingPbn,
  readPbnLocal,
  writePbnLocal,
} from "@/lib/pbnProgress"

/**
 * Los treinta y dos capítulos de PBN, con el mismo lector que el resto de los
 * módulos y el verde azulado del tema (`lector-pbn`).
 *
 * No lleva práctica dentro de la lectura: las noventa y seis preguntas viven
 * en la pantalla de práctica, que es la regla de la casa.
 *
 * `portadaAuto` queda en false mientras no existan las portadas de capítulo:
 * sin esto el lector pintaría treinta y dos huecos de portada encima de los
 * veinte huecos de figura que el módulo ya trae a propósito.
 *
 * Ruta: /app/aerolinea/pbn/aprende?l=1
 */
const MODULO: LectorModulo = {
  tema: "lector-notam lector-pbn",
  nombre: PBN_TITULO,
  rotulo: "PBN · Módulo",
  hub: PBN_HUB,
  evaluacion: PBN_EVALUACION,
  portadas: "/modulos/pbn",
  portadaRatio: "16 / 9",
  portadaAuto: false,
  actividad: "pbn-leccion",
  lecciones: PB_LECCIONES,
  niveles: PB_NIVELES,
  alFinal: PBN_EVALUACION,
  textoFinal: "Evaluación →",
  leerLocal: () => readPbnLocal().lessonScreens,
  escribirLocal: (ns) => {
    writePbnLocal({ lessonScreens: ns })
  },
  marcar: (n) => markPbnProgress({ lessonScreen: n }),
  hidratar: async (uid) => {
    const traido = await fetchPbnProgress(uid)
    if (!traido) return null
    const remoto = await pushPendingPbn(traido)
    return remoto.lessonScreens
  },
}

export function PbnLeccion() {
  return <LectorLeccion modulo={MODULO} />
}

// La ruta se exporta desde lib/pbn; aquí solo para que quien importe la
// página encuentre a mano adónde apunta.
export const PBN_LECCION_RUTA = PBN_APRENDE
