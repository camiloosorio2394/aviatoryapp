import { LectorLeccion, type LectorModulo } from "@/components/lesson/LectorLeccion"
import {
  MP_APRENDE,
  MP_EVALUACION,
  MP_HUB,
  MP_PRACTICA,
  MP_TITULO,
  MP_NIVELES,
} from "@/lib/mercancias"
import { MP_ENTREVISTAS, MP_LECCIONES } from "@/lib/mercanciasLeccion"
import {
  fetchMercanciasProgress,
  markMercanciasProgress,
  pushPendingMercancias,
  readMercanciasLocal,
  writeMercanciasLocal,
} from "@/lib/mercanciasProgress"

/**
 * Lección de Mercancías peligrosas, con el mismo lector que NOTAM y el tema
 * amarillo del módulo (`lector-mp`). Dieciocho lecciones en cinco niveles; el
 * índice los rotula, y cada nivel cierra con su entrevista de aerolínea.
 *
 * Ruta: /app/aerolinea/mercancias/aprende?l=1 (lección) o ?e=1 (entrevista)
 */
const MODULO: LectorModulo = {
  tema: "lector-notam lector-mp",
  nombre: MP_TITULO,
  rotulo: "Mercancías · Módulo",
  hub: MP_HUB,
  practica: MP_PRACTICA,
  evaluacion: MP_EVALUACION,
  portadas: "/modulos/mercancias",
  // Las portadas traen el título dentro y la línea de iconos al pie: a 8:3 se
  // perderían las dos cosas.
  portadaRatio: "16 / 9",
  actividad: "mercancias-leccion",
  lecciones: MP_LECCIONES,
  niveles: MP_NIVELES,
  entrevistas: MP_ENTREVISTAS,
  alFinal: MP_PRACTICA,
  textoFinal: "Práctica →",
  leerLocal: () => readMercanciasLocal().lessonScreens,
  escribirLocal: (ns) => {
    writeMercanciasLocal({ lessonScreens: ns })
  },
  marcar: (n) => markMercanciasProgress({ lessonScreen: n }),
  hidratar: async (uid) => {
    const traido = await fetchMercanciasProgress(uid)
    if (!traido) return null
    const remoto = await pushPendingMercancias(traido)
    return remoto.lessonScreens
  },
}

export function MercanciasLeccion() {
  return <LectorLeccion modulo={MODULO} />
}

// La ruta se exporta desde lib/mercancias; aquí solo para que quien importe
// la página encuentre a mano adónde apunta.
export const MERCANCIAS_LECCION_RUTA = MP_APRENDE
