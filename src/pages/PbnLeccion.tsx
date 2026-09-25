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
 * Los cuarenta y ocho capítulos de PBN, con el mismo lector que el resto de los
 * módulos y el bronce de instrumento del tema (`lector-pbn`).
 *
 * No lleva práctica dentro de la lectura: las ciento cuarenta y cuatro
 * preguntas viven en la pantalla de práctica, que es la regla de la casa.
 *
 * `portadaAuto` queda en false mientras no existan las portadas de capítulo:
 * sin esto el lector pintaría cuarenta y ocho huecos de portada encima de las
 * veintinueve figuras SVG que ya trae el módulo.
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
