import { LectorLeccion, type LectorModulo } from "@/components/lesson/LectorLeccion"
import {
  PERF_APRENDE,
  PERF_EVALUACION,
  PERF_HUB,
  PERF_TITULO,
} from "@/lib/performance"
import { PERF_LECCIONES, PERF_NIVELES } from "@/lib/performanceLeccion"
import {
  fetchPerformanceProgress,
  markPerformanceProgress,
  pushPendingPerformance,
  readPerformanceLocal,
  writePerformanceLocal,
} from "@/lib/performanceProgress"

/**
 * Los cuarenta temas de Performance, con el mismo lector que el resto de los
 * módulos y el bronce del tema (`lector-pf`).
 *
 * No lleva entrevista por nivel ni práctica aparte: los dieciocho ejercicios
 * resueltos y los diez escenarios viven dentro de los temas 38 y 40, junto al
 * concepto que ponen a prueba.
 *
 * `portadaAuto` queda en false mientras no existan las portadas de tema: sin
 * esto el lector pintaría cuarenta huecos de portada encima de los veinte
 * huecos de figura que el módulo ya trae a propósito.
 *
 * Ruta: /app/aerolinea/performance/aprende?l=1
 */
const MODULO: LectorModulo = {
  tema: "lector-notam lector-pf",
  nombre: PERF_TITULO,
  rotulo: "Performance · Módulo",
  hub: PERF_HUB,
  evaluacion: PERF_EVALUACION,
  portadas: "/modulos/performance",
  portadaRatio: "16 / 9",
  portadaAuto: false,
  actividad: "performance-leccion",
  lecciones: PERF_LECCIONES,
  niveles: PERF_NIVELES,
  alFinal: PERF_EVALUACION,
  textoFinal: "Evaluación →",
  leerLocal: () => readPerformanceLocal().lessonScreens,
  escribirLocal: (ns) => {
    writePerformanceLocal({ lessonScreens: ns })
  },
  marcar: (n) => markPerformanceProgress({ lessonScreen: n }),
  // Los ejercicios y los escenarios se marcan al pedir la respuesta, que es el
  // momento en que el piloto ya pensó el suyo. No se espera al final del tema:
  // el tema 40 son dieciocho ejercicios y nadie los hace de una sentada.
  marcarPractica: (clave) => {
    void markPerformanceProgress({ practiceId: clave })
  },
  hidratar: async (uid) => {
    const traido = await fetchPerformanceProgress(uid)
    if (!traido) return null
    const remoto = await pushPendingPerformance(traido)
    return remoto.lessonScreens
  },
}

export function PerformanceLeccion() {
  return <LectorLeccion modulo={MODULO} />
}

// La ruta se exporta desde lib/performance; aquí solo para que quien importe
// la página encuentre a mano adónde apunta.
export const PERFORMANCE_LECCION_RUTA = PERF_APRENDE
