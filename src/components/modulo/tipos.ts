/**
 * Tipos del lector de módulo.
 *
 * Viven aparte para que el cascarón, el índice y la barra los compartan sin
 * importarse entre ellos.
 */

/** Un paso del lector: una entrada del índice y una pantalla de contenido. */
export interface ModuloSeccion {
  /** Número de dos dígitos como se ve en el índice: "00", "01"… */
  n: string
  /** Título de la sección, tal cual va en el índice y en el titular. */
  titulo: string
  /**
   * A qué parte del flujo pertenece.
   *
   * El contador de la barra ("03 / 09") cuenta solo las de estudio: son las
   * que se leen. La práctica y el chequeo son otra cosa y van aparte en el
   * índice, porque no se "leen", se resuelven.
   */
  grupo?: "estudio" | "practica"
}
