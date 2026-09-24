import type { PerfilRadio, ResultadoEjercicio } from "@/lib/comunicacionesPractica"
import type { ReproductorRadio } from "@/lib/radio"

/** Lo que recibe cualquiera de los diez componentes de ejercicio. */
export interface PropsEjercicio<T> {
  item: T
  /** Fuerza el perfil de radio (el vuelo completo lo sube por tramos). */
  perfil?: PerfilRadio
  /** Velocidad fija y sin «volver a intentarlo». */
  modoExamen?: boolean
  /** Se llama cada vez que el ejercicio queda resuelto (también tras «volver a intentarlo»). */
  onResultado?: (r: ResultadoEjercicio) => void
  /** Para pruebas: un reproductor falso. */
  reproductor?: ReproductorRadio
}
