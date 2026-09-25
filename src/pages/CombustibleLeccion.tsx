import { LectorLeccion, type LectorModulo } from "@/components/lesson/LectorLeccion"
import { CB_EVALUACION, CB_HUB, CB_PRACTICA_RUTA, CB_TITULO } from "@/lib/combustible"
import { CB_LECCIONES, CB_NIVELES } from "@/lib/combustibleLeccion"
import {
  fetchCombustibleProgress,
  markCombustibleProgress,
  pushPendingCombustible,
  readCombustibleLocal,
  writeCombustibleLocal,
} from "@/lib/combustibleProgress"

/**
 * Los veintitrés capítulos de Gestión del combustible, con el mismo lector que
 * el resto de los módulos y el azul queroseno del tema (`lector-cb`).
 *
 * En la lectura no se pregunta nada: el quiz de cada capítulo está en la
 * práctica del módulo. Lo único de práctica que vive aquí son los diez
 * escenarios del capítulo 23, que se marcan al pedir el análisis, como los de
 * Performance: son situaciones para pensar, no preguntas con opciones.
 *
 * `portadaAuto` queda en false mientras no existan las portadas: el módulo ya
 * trae sus quince figuras SVG.
 *
 * Ruta: /app/aerolinea/combustible/aprende?l=1
 */
const MODULO: LectorModulo = {
  tema: "lector-notam lector-cb",
  nombre: CB_TITULO,
  rotulo: "Combustible · Módulo",
  hub: CB_HUB,
  practica: CB_PRACTICA_RUTA,
  evaluacion: CB_EVALUACION,
  portadas: "/modulos/combustible",
  portadaRatio: "16 / 9",
  portadaAuto: false,
  actividad: "combustible-leccion",
  lecciones: CB_LECCIONES,
  niveles: CB_NIVELES,
  alFinal: CB_PRACTICA_RUTA,
  textoFinal: "Práctica y evaluación →",
  leerLocal: () => readCombustibleLocal().lessonScreens,
  escribirLocal: (ns) => {
    writeCombustibleLocal({ lessonScreens: ns })
  },
  marcar: (n) => markCombustibleProgress({ lessonScreen: n }),
  // Los escenarios se marcan al pedir el análisis, que es cuando el piloto ya
  // pensó el suyo.
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
