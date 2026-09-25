import { LectorLeccion, type LectorModulo } from "@/components/lesson/LectorLeccion"
import { CB_APRENDE, CB_EVALUACION, CB_HUB, CB_TITULO } from "@/lib/combustible"
import { CB_LECCIONES } from "@/lib/combustibleLeccion"
import {
  fetchCombustibleProgress,
  markCombustibleProgress,
  pushPendingCombustible,
  readCombustibleLocal,
  writeCombustibleLocal,
} from "@/lib/combustibleProgress"

/**
 * Gestión del combustible: los veintitrés capítulos, con el mismo lector que el resto de
 * los módulos y el acento del tema (`lector-cb`).
 *
 * No lleva práctica aparte: las preguntas de cada capítulo viven al final del
 * capítulo, junto a lo que ponen a prueba, y se marcan al responderlas.
 *
 * `portadaAuto` queda en false mientras no existan las portadas de capítulo: sin
 * esto el lector pintaría 23 huecos de portada encima de los quince
 * huecos de figura que el módulo ya trae a propósito.
 *
 * Ruta: /app/aerolinea/combustible/aprende?l=1
 */
const MODULO: LectorModulo = {
  tema: "lector-notam lector-cb",
  nombre: CB_TITULO,
  rotulo: "Gestión del combustible · Módulo",
  hub: CB_HUB,
  evaluacion: CB_EVALUACION,
  portadas: "/modulos/combustible",
  portadaRatio: "16 / 9",
  portadaAuto: false,
  actividad: "combustible-leccion",
  lecciones: CB_LECCIONES,
  alFinal: CB_EVALUACION,
  textoFinal: "Evaluación →",
  leerLocal: () => readCombustibleLocal().lessonScreens,
  escribirLocal: (ns) => {
    writeCombustibleLocal({ lessonScreens: ns })
  },
  marcar: (n) => markCombustibleProgress({ lessonScreen: n }),
  // Las preguntas se marcan al pedir la respuesta, que es el momento en que el
  // piloto ya pensó la suya. No se espera al final del capítulo: nadie
  // responde los veintitrés capítulos de una sentada.
  marcarPractica: (clave) => {
    void markCombustibleProgress({ practiceId: clave })
  },
  hidratar: async (uid) => {
    const traido = await fetchCombustibleProgress(uid)
    if (!traido) return null
    const remoto = await pushPendingCombustible(traido)
    return remoto.lessonScreens
  },
}

export function CombustibleLeccion() {
  return <LectorLeccion modulo={MODULO} />
}

// La ruta se exporta desde lib/combustible; aquí solo para que quien importe la
// página encuentre a mano adónde apunta.
export const CB_LECCION_RUTA = CB_APRENDE
