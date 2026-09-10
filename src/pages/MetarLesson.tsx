import { LectorLeccion, type LectorModulo } from "@/components/lesson/LectorLeccion"
import { readMetarProgress, writeMetarProgress } from "@/lib/metar"
import {
  fetchMetarProgress,
  markMetarProgress,
  pushPendingMetarProgress,
} from "@/lib/metarProgress"
import { METAR_LESSON, METAR_NIVELES } from "@/lib/metarLesson"

/**
 * Lección de Meteorología, con el mismo lector que NOTAM y Mercancías y el
 * tema verde del módulo (`lector-mt`).
 *
 * Antes tenía lector propio: una hoja continua con índice lateral y detección
 * de sección por scroll. Funcionaba, pero era el único módulo que se leía
 * distinto, y mantener tres lectores para el mismo trabajo no se sostiene. El
 * genérico trae además lo que a este le faltaba: portada por lección, niveles
 * rotulados en el índice y la barra de progreso que ya usan los otros dos.
 *
 * Ruta: /app/aerolinea/meteorologia/aprende?l=1
 */
const MODULO: LectorModulo = {
  tema: "lector-notam lector-mt",
  nombre: "Meteorología",
  rotulo: "Meteorología · Módulo",
  hub: "/app/aerolinea/meteorologia",
  practica: "/app/aerolinea/meteorologia/practica",
  evaluacion: "/app/aerolinea/meteorologia/evaluacion",
  portadas: "/modulos/meteorologia",
  actividad: "metar-leccion",
  lecciones: METAR_LESSON,
  niveles: METAR_NIVELES,
  alFinal: "/app/aerolinea/meteorologia/decodificador",
  textoFinal: "Decodificador →",
  leerLocal: () => readMetarProgress().lessonScreens,
  escribirLocal: (ns) => {
    writeMetarProgress({ lessonScreens: ns })
  },
  marcar: (n) => markMetarProgress({ lessonScreen: n }),
  hidratar: async (uid) => {
    const traido = await fetchMetarProgress(uid)
    if (!traido) return null
    const remoto = await pushPendingMetarProgress(traido)
    return remoto.lessonScreens
  },
}

export function MetarLesson() {
  return <LectorLeccion modulo={MODULO} />
}
