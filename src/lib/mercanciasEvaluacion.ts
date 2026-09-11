/**
 * Evaluación de Mercancías peligrosas: 60 preguntas de opción múltiple, cuatro
 * opciones, una correcta. Cada intento toma 25 al azar y baraja las opciones.
 *
 * El banco se edita en contenido/bancos/mercancias_evaluacion.json y lo presenta
 * y califica el servidor (services/evaluaciones.ts). Las reglas de redacción del
 * banco siguen siendo las mismas:
 *   - Cada pregunta sale de una lección. Sin citas, como el resto del
 *     módulo (la nota de fuentes va en la lección 1), pero cada dato se
 *     comprobó contra el LAR 175 y, cuando la regla es de ahí, contra las
 *     Instrucciones Técnicas. Lo que solo existe en un reglamento nacional se
 *     dice como tal, para que nadie lo estudie como si fuera regional.
 *   - La correcta NO es sistemáticamente la más larga: las distractoras son
 *     errores reales de piloto, escritos con el mismo cuerpo.
 *   - Sin niveles de dificultad en pantalla.
 *   - Las cifras que salen de las Instrucciones Técnicas (no cargadas) no se
 *     preguntan como norma: se pregunta dónde están y qué regla las gobierna.
 */

export const MP_EVALUACION_META = {
  total: 60,
  porIntento: 25,
  puntajePorPregunta: 4,
  aprobacion: 80,
  aviso:
    "Las preguntas salen de los mismos documentos que el módulo y son de elaboración propia, no material oficial de ningún organismo ni autoridad: verifica siempre en el reglamento vigente de tu país.",
}
