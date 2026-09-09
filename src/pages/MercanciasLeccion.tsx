import { LectorLeccion, type LectorModulo } from "@/components/lesson/LectorLeccion"
import { MP_APRENDE, MP_HUB, MP_PRACTICA, MP_TITULO } from "@/lib/mercancias"
import { MP_LECCIONES, MP_NIVELES } from "@/lib/mercanciasLeccion"
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
 * índice los rotula.
 *
 * Ruta: /app/aerolinea/mercancias/aprende?l=1
 */
const MODULO: LectorModulo = {
  tema: "lector-notam lector-mp",
  nombre: MP_TITULO,
  rotulo: "Mercancías · Módulo",
  hub: MP_HUB,
  practica: MP_PRACTICA,
  portadas: "/modulos/mercancias",
  actividad: "mercancias-leccion",
  lecciones: MP_LECCIONES,
  niveles: MP_NIVELES,
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
