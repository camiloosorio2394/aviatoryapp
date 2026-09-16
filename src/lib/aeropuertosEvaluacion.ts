/**
 * Evaluación de Aeropuertos: 60 preguntas de opción múltiple, cuatro opciones,
 * una correcta. Cada intento toma 25 al azar y baraja las opciones.
 *
 * El banco se edita en `contenido/bancos/aeropuertos_evaluacion.json` y lo
 * presenta y califica el servidor (`services/evaluaciones.ts`). El navegador
 * nunca recibe las respuestas junto con las preguntas, así que aquí no hay ni
 * una pregunta: solo los números que la pantalla anuncia antes de empezar.
 *
 * Reglas con las que se escribió el banco:
 *   - Reparto por peso de cada nivel: 11, 11, 11, 14 y 13 preguntas, en
 *     proporción a las 4, 4, 4, 5 y 5 lecciones que tiene cada uno.
 *   - Ninguna repite una pregunta de la entrevista de nivel
 *     (`aeropuertosLeccion/entrevistas.ts`) ni de la práctica: cuando el tema
 *     coincide, lo que se pregunta es otro dato.
 *   - Ninguna cifra sin fuente. Todo sale del material verificado del módulo, y
 *     lo que la Enmienda 18 cambió se dice con su fecha y no con su numeral.
 *   - Sin citas de artículos en el texto que ve el piloto, como el resto del
 *     módulo.
 *   - La correcta no es sistemáticamente la más larga ni la primera: las
 *     distractoras son confusiones reales, escritas con el mismo cuerpo.
 */

export const AP_EVALUACION_META = {
  total: 60,
  porIntento: 25,
  puntajePorPregunta: 4,
  aprobacion: 80,
  aviso:
    "Las preguntas salen del mismo material que el módulo (Anexo 14, Volumen I, novena edición, con la Enmienda 18) y son de elaboración propia, no material oficial de ningún organismo ni autoridad: verifica siempre en la publicación de información aeronáutica y en el reglamento vigente de tu país.",
}
