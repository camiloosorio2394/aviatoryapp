import { LectorLeccion, type LectorModulo } from "@/components/lesson/LectorLeccion"
import { RVSM_APRENDE, RVSM_EVALUACION, RVSM_HUB, RVSM_TITULO } from "@/lib/rvsm"
import { RV_LECCIONES, RV_NIVELES } from "@/lib/rvsmLeccion"
import {
  fetchRvsmProgress,
  markRvsmProgress,
  pushPendingRvsm,
  readRvsmLocal,
  writeRvsmLocal,
} from "@/lib/rvsmProgress"

/**
 * Los treinta y dos capítulos de RVSM, con el mismo lector que el resto de los
 * módulos y el verde azulado del tema (`lector-rv`).
 *
 * No lleva práctica dentro de la lectura: las noventa y seis preguntas viven
 * en la pantalla de práctica, que es la regla de la casa.
 *
 * `portadaAuto` queda en false mientras no existan las portadas de capítulo:
 * sin esto el lector pintaría treinta y dos huecos de portada encima de los
 * veinte huecos de figura que el módulo ya trae a propósito.
 *
 * Ruta: /app/aerolinea/rvsm/aprende?l=1
 */
const MODULO: LectorModulo = {
  tema: "lector-notam lector-rv",
  nombre: RVSM_TITULO,
  rotulo: "RVSM · Módulo",
  hub: RVSM_HUB,
  evaluacion: RVSM_EVALUACION,
  portadas: "/modulos/rvsm",
  portadaRatio: "16 / 9",
  portadaAuto: false,
  actividad: "rvsm-leccion",
  lecciones: RV_LECCIONES,
  niveles: RV_NIVELES,
  alFinal: RVSM_EVALUACION,
  textoFinal: "Evaluación →",
  leerLocal: () => readRvsmLocal().lessonScreens,
  escribirLocal: (ns) => {
    writeRvsmLocal({ lessonScreens: ns })
  },
  marcar: (n) => markRvsmProgress({ lessonScreen: n }),
  hidratar: async (uid) => {
    const traido = await fetchRvsmProgress(uid)
    if (!traido) return null
    const remoto = await pushPendingRvsm(traido)
    return remoto.lessonScreens
  },
}

export function RvsmLeccion() {
  return <LectorLeccion modulo={MODULO} />
}

// La ruta se exporta desde lib/rvsm; aquí solo para que quien importe la
// página encuentre a mano adónde apunta.
export const RVSM_LECCION_RUTA = RVSM_APRENDE
