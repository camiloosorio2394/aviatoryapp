import type { ResultadoEjercicio } from "@/lib/melPractica"

/** Lo que recibe cualquiera de los seis componentes de ejercicio. */
export interface PropsEjercicio<T> {
  item: T
  /** Sin «Volver a intentarlo». */
  modoExamen?: boolean
  /** Se llama cada vez que el ejercicio queda resuelto (también tras «volver a intentarlo»). */
  onResultado?: (r: ResultadoEjercicio) => void
}
