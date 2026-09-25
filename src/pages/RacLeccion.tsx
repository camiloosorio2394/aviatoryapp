import { LectorLeccion, type LectorModulo } from "@/components/lesson/LectorLeccion"
import { RAC_EVALUACION, RAC_HUB, RAC_PRACTICA_RUTA, RAC_TITULO } from "@/lib/rac"
import { RAC_LECCIONES, RAC_NIVELES } from "@/lib/racLeccion"
import { fetchRacProgress, markRacProgress, pushPendingRac, readRacLocal, writeRacLocal } from "@/lib/racProgress"

/**
 * Las diecinueve unidades del módulo RAC, una por reglamento, con el mismo
 * lector que el resto de los módulos y el grafito del tema (`lector-rac`).
 *
 * En la lectura no se pregunta nada: el quiz de cada unidad está en la
 * práctica del módulo (regla de Camilo, la misma de Aerodinámica).
 *
 * `portadaAuto` queda en false mientras no existan las portadas: sin esto el
 * lector pintaría diecinueve huecos de portada, uno por unidad.
 *
 * Ruta: /app/aerolinea/rac/aprende?l=1
 */
const MODULO: LectorModulo = {
  tema: "lector-notam lector-rac",
  nombre: RAC_TITULO,
  rotulo: "RAC · Módulo",
  hub: RAC_HUB,
  practica: RAC_PRACTICA_RUTA,
  evaluacion: RAC_EVALUACION,
  portadas: "/modulos/rac",
  portadaRatio: "16 / 9",
  portadaAuto: false,
  actividad: "rac-leccion",
  lecciones: RAC_LECCIONES,
  niveles: RAC_NIVELES,
  alFinal: RAC_PRACTICA_RUTA,
  textoFinal: "Práctica y evaluación →",
  leerLocal: () => readRacLocal().lessonScreens,
  escribirLocal: (ns) => {
    writeRacLocal({ lessonScreens: ns })
  },
  marcar: (n) => markRacProgress({ lessonScreen: n }),
  hidratar: async (uid) => {
    const traido = await fetchRacProgress(uid)
    if (!traido) return null
    const remoto = await pushPendingRac(traido)
    return remoto.lessonScreens
  },
}

export function RacLeccion() {
  return <LectorLeccion modulo={MODULO} />
}
