/**
 * La práctica de opción múltiple de los módulos RAC y Gestión del combustible.
 *
 * Son las preguntas del «quiz de la unidad» o «del capítulo» de cada
 * documento. No van dentro de la lección: la regla de Camilo es que en la
 * lectura no se pregunta nada, así que viven en la pantalla de práctica del
 * módulo, agrupadas por la unidad o el capítulo del que salen.
 *
 * No son las del banco de la evaluación: esas viven en el servidor
 * (contenido/bancos/*_evaluacion.json) y nunca entran al bundle. Los
 * conversores comprueban que ningún enunciado de aquí repita uno de allá.
 */

export interface PreguntaPractica {
  /** «u05-q2», «c13-q1»: es también la clave de práctica que guarda el progreso. */
  id: string
  enunciado: string
  /** Cuatro opciones, en el orden del documento. */
  opciones: string[]
  /** Índice de la correcta, desde 0. */
  correcta: number
  explicacion: string
  /** Norma y numeral que respaldan la respuesta. */
  referencia: string
}

export interface GrupoPractica {
  /** «U05», «C13»: la etiqueta del documento. */
  tema: string
  /** Número de la lección de la que salen las preguntas, para enlazarla. */
  n: number
  /** «RAC 91 · Reglas generales de vuelo y de operación», «Fuel check». */
  titulo: string
  preguntas: PreguntaPractica[]
}
