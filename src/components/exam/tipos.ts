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
  /** "secciones", "lecciones" o "temas", para los textos de la puerta cerrada. */
  unidadLeccion: string
  /**
   * El género de esa palabra, para concordar los artículos de la puerta
   * cerrada. Femenino por defecto, que es lo que son «secciones» y
   * «lecciones»; Performance cuenta «temas» y pide masculino.
   */
  generoLeccion?: "f" | "m"
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
  /**
   * Adónde lleva un tema de los que hay que repasar. Con esto, el resultado
   * cierra con las secciones de las preguntas falladas, cada una enlazada.
   * Sin esto no se pinta esa parte: los módulos cuyo banco no trae tema no
   * tienen nada que enlazar.
   */
  temaARuta?: (tema: string) => string | null
  /** Cómo se nombra un tema en ese bloque: "Sección 4". */
  temaARotulo?: (tema: string) => string
}
