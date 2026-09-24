import { LectorLeccion, type LectorModulo } from "@/components/lesson/LectorLeccion"
import { MEL_APRENDE, MEL_HUB, MEL_NIVELES, MEL_TITULO_CORTO, readMelLocal, writeMelLocal } from "@/lib/mel"
import { MEL_LECCIONES, leccionEnRedaccion } from "@/lib/melLeccion"
import { fetchMelProgress, markMelProgress, pushPendingMel } from "@/lib/melProgress"

/**
 * Lección de MEL, con el mismo lector que los demás módulos y el tema grafito
 * del módulo (`lector-mel`). Cuarenta lecciones en cinco niveles.
 *
 * Por ahora sin práctica ni entrevistas de nivel: el pie de la última lección
 * vuelve al hub. Las lecciones que todavía son solo el marcador «en
 * redacción» no cuentan como leídas (`cuenta`), como en Comunicaciones ATC.
 *
 * Ruta: /app/aerolinea/mel/aprende?l=1
 */
const MODULO: LectorModulo = {
  tema: "lector-notam lector-mel",
  nombre: MEL_TITULO_CORTO,
  rotulo: "MEL · Módulo",
  hub: MEL_HUB,
  portadas: "/modulos/mel",
  // Como Mercancías, Aeropuertos y Comunicaciones: portadas diseñadas, a 16:9.
  portadaRatio: "16 / 9",
  actividad: "mel-leccion",
  lecciones: MEL_LECCIONES,
  niveles: MEL_NIVELES,
  alFinal: MEL_HUB,
  textoFinal: "Volver al módulo →",
  leerLocal: () => readMelLocal().lessonScreens,
  escribirLocal: (ns) => {
    writeMelLocal(ns)
  },
  marcar: (n) => markMelProgress({ lessonScreen: n }),
  cuenta: (n) => !leccionEnRedaccion(n),
  hidratar: async (uid) => {
    const traido = await fetchMelProgress(uid)
    if (!traido) return null
    const remoto = await pushPendingMel(traido)
    return remoto.lessonScreens
  },
}

export function MelLeccion() {
  return <LectorLeccion modulo={MODULO} />
}

export const MEL_LECCION_RUTA = MEL_APRENDE
