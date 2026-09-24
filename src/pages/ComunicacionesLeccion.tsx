import { LectorLeccion, type LectorModulo } from "@/components/lesson/LectorLeccion"
import {
  CM_APRENDE,
  CM_HUB,
  CM_NIVELES,
  CM_TITULO_CORTO,
  readComunicacionesLocal,
  writeComunicacionesLocal,
} from "@/lib/comunicaciones"
import { CM_LECCIONES, leccionEnRedaccion } from "@/lib/comunicacionesLeccion"
import {
  fetchComunicacionesProgress,
  markComunicacionesProgress,
  pushPendingComunicaciones,
} from "@/lib/comunicacionesProgress"

/**
 * Lección de Comunicaciones ATC, con el mismo lector que NOTAM, Mercancías,
 * Meteorología, Aerodinámica y Aeropuertos, y el tema ciruela del módulo
 * (`lector-cm`). Sesenta y nueve lecciones en ocho niveles.
 *
 * Por ahora sin práctica ni entrevistas de nivel: el pie de la última lección
 * vuelve al hub. Las lecciones que todavía son solo el marcador «en
 * redacción» no cuentan como leídas (`cuenta`).
 *
 * Ruta: /app/aerolinea/comunicaciones/aprende?l=1
 */
const MODULO: LectorModulo = {
  tema: "lector-notam lector-cm",
  nombre: CM_TITULO_CORTO,
  rotulo: "Comunicaciones ATC · Módulo",
  hub: CM_HUB,
  portadas: "/modulos/comunicaciones",
  // Franja editorial baja, como NOTAM: acompaña al texto sin dominar la hoja.
  portadaRatio: "8 / 3",
  actividad: "comunicaciones-leccion",
  lecciones: CM_LECCIONES,
  niveles: CM_NIVELES,
  alFinal: CM_HUB,
  textoFinal: "Volver al módulo →",
  leerLocal: () => readComunicacionesLocal().lessonScreens,
  escribirLocal: (ns) => {
    writeComunicacionesLocal(ns)
  },
  marcar: (n) => markComunicacionesProgress({ lessonScreen: n }),
  cuenta: (n) => !leccionEnRedaccion(n),
  hidratar: async (uid) => {
    const traido = await fetchComunicacionesProgress(uid)
    if (!traido) return null
    const remoto = await pushPendingComunicaciones(traido)
    return remoto.lessonScreens
  },
}

export function ComunicacionesLeccion() {
  return <LectorLeccion modulo={MODULO} />
}

export const COMUNICACIONES_LECCION_RUTA = CM_APRENDE
