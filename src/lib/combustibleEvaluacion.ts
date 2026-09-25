/**
 * Evaluación de Gestión del combustible: 40 preguntas de opción múltiple, cuatro
 * opciones, una correcta. Cada intento toma 20 al azar y el servidor baraja
 * las opciones.
 *
 * El banco se edita en `contenido/bancos/combustible_evaluacion.json` y lo presenta y
 * califica el servidor (`services/evaluaciones.ts`). El navegador nunca recibe
 * las respuestas junto con las preguntas, así que aquí no hay ni una pregunta:
 * solo los números que la pantalla anuncia antes de empezar.
 */

export const CB_EVALUACION_META = {
  total: 40,
  porIntento: 20,
  puntajePorPregunta: 5,
  aprobacion: 80,
  aviso: "Las preguntas salen del mismo material que el módulo y son de elaboración propia, no material oficial de ningún fabricante, operador ni autoridad: para volar mandan el RAC, el FCOM y el manual de operaciones de tu aerolínea.",
}
