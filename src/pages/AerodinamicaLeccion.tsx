import { MargenDeVelocidad } from "@/components/aerodinamica/MargenDeVelocidad"
import { LectorLeccion, type LectorModulo } from "@/components/lesson/LectorLeccion"
import {
  AERO_APRENDE,
  AERO_EVALUACION,
  AERO_HUB,
  AERO_PRACTICA,
  AERO_TITULO,
} from "@/lib/aerodinamica"
import { AERO_LECCIONES } from "@/lib/aerodinamicaLeccion"
import {
  fetchAerodinamicaProgress,
  markAerodinamicaProgress,
  pushPendingAerodinamica,
  readAerodinamicaLocal,
  writeAerodinamicaLocal,
} from "@/lib/aerodinamicaProgress"

/**
 * Las doce secciones de Aerodinámica, con el mismo lector que NOTAM y
 * Mercancías y el acero del módulo (`lector-ae`).
 *
 * No lleva niveles ni entrevista por nivel: el módulo es una progresión de
 * doce secciones, y la entrevista es una página aparte, dentro de la práctica.
 *
 * Ruta: /app/aerolinea/aerodinamica/aprende?l=1
 */
const MODULO: LectorModulo = {
  tema: "lector-notam lector-ae",
  nombre: AERO_TITULO,
  rotulo: "Aerodinámica · Módulo",
  hub: AERO_HUB,
  practica: AERO_PRACTICA,
  evaluacion: AERO_EVALUACION,
  portadas: "/modulos/aerodinamica/portadas",
  portadaRatio: "16 / 9",
  actividad: "aerodinamica-leccion",
  lecciones: AERO_LECCIONES,
  alFinal: AERO_PRACTICA,
  textoFinal: "Práctica →",
  interactivo: (nombre) => (nombre === "aero-margen-velocidad" ? <MargenDeVelocidad /> : null),
  leerLocal: () => readAerodinamicaLocal().lessonScreens,
  escribirLocal: (ns) => {
    writeAerodinamicaLocal({ lessonScreens: ns })
  },
  marcar: (n) => markAerodinamicaProgress({ lessonScreen: n }),
  hidratar: async (uid) => {
    const traido = await fetchAerodinamicaProgress(uid)
    if (!traido) return null
    const remoto = await pushPendingAerodinamica(traido)
    return remoto.lessonScreens
  },
}

export function AerodinamicaLeccion() {
  return <LectorLeccion modulo={MODULO} />
}

// La ruta se exporta desde lib/aerodinamica; aquí solo para que quien importe
// la página encuentre a mano adónde apunta.
export const AERODINAMICA_LECCION_RUTA = AERO_APRENDE
