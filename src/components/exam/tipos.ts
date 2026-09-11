import type { ClaveEvaluacion } from "@/services/evaluaciones"

/** Una fila del historial, ya normalizada desde la tabla del módulo. */
export interface FilaHistorial {
  id: string
  score: number
  correct: number
  total: number
  passed: boolean
  duration: number | null
  at: string
}

export interface ExamenConfig {
  /** "NOTAM", "Mercancías peligrosas". */
  nombre: string
  /** "NOTAM · Evaluación". */
  eyebrow: string
  /** "Volver a la sección NOTAM". */
  volverTexto: string
  hub: string
  leccion: string
  practica: string
  totalLecciones: number
  /** "secciones" o "lecciones", para los textos de la puerta cerrada. */
  unidadLeccion: string
  /** Preguntas por intento, para los textos previos. El sorteo real lo hace el servidor. */
  porIntento: number
  /** Mínimo de aprobación para los textos previos. El que califica lo devuelve el servidor. */
  aprobacion: number
  /** Nota de referencia del banco, al pie del resultado y en la puerta cerrada. */
  aviso: string
  /** Acento del módulo: el azul de NOTAM o el amarillo de Mercancías. */
  acento: string
  /** La evaluación del servidor que presenta esta pantalla. */
  evaluacion: ClaveEvaluacion
  leerLeidas: () => number[]
  escribirLeidas: (ns: number[]) => void
  /**
   * Sube lo leído en este equipo que la base no tiene y devuelve lo que la base
   * confirmó. null si no se pudo preguntar. El servidor abre la evaluación solo
   * con la lección completa en la base.
   */
  sincronizarLeidas: (uid: string) => Promise<number[] | null>
  leerMejorLocal: () => number | null
  escribirMejorLocal: (score: number) => void
  cargarHistorial: (uid: string) => Promise<{ rows: FilaHistorial[]; count: number; best: number | null } | null>
  /** Textos de los dos enlaces de salida cuando no se aprobó. */
  pasos: { leccion: string; practica: string }
}
