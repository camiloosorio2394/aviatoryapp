/**
 * Evaluación de Gestión del combustible: 40 preguntas de opción múltiple,
 * cuatro opciones, una correcta. Cada intento toma 20 al azar y el servidor
 * baraja las opciones.
 *
 * El banco se edita en docs/contenido/gestion-combustible.md («Quiz final»), lo
 * pasa a `contenido/bancos/combustible_evaluacion.json`
 * scripts/combustible/convertir.mjs, y lo presenta y califica el servidor
 * (`services/evaluaciones.ts`). Aquí no hay ni una pregunta.
 *
 * Reglas con las que se escribió el banco:
 *   - Veinte de planificación (capítulos 1 a 11) y veinte de gestión en vuelo
 *     (12 a 22), con el peso donde el módulo lo pone: reserva final, combustible
 *     mínimo y MAYDAY.
 *   - Todas son de situación, con cifras propias que no copian las del vuelo de
 *     referencia del módulo.
 *   - Cada clave se comprobó contra el RAC 121, el RAC 91 y la OACI; donde EASA
 *     o la FAA difieren, el enunciado dice de qué norma se habla.
 *   - Ninguna repite una pregunta de la práctica de los capítulos.
 */

export const CB_EVALUACION_META = {
  total: 40,
  porIntento: 20,
  aprobacion: 80,
  aviso:
    "Las preguntas son de elaboración propia a partir del RAC 121, el RAC 91 y los documentos de la OACI. Para volar manda el manual de operaciones de tu aerolínea: la norma fija mínimos y tu operador puede ser más conservador.",
}
