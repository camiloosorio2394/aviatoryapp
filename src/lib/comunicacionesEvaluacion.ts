/**
 * Evaluación de Comunicaciones ATC: 80 preguntas de opción múltiple, cuatro
 * opciones, una correcta. Cada intento toma 25 al azar y baraja las opciones.
 *
 * El banco se edita en `contenido/bancos/comunicaciones_evaluacion.json` y lo
 * presenta y califica el servidor (`services/evaluaciones.ts`). El navegador
 * nunca recibe las respuestas junto con las preguntas, así que aquí no hay ni
 * una pregunta: solo los números que la pantalla anuncia antes de empezar.
 *
 * Reglas con las que se escribió el banco (ver su `descripcion`):
 *   - Más peso en lo que más se pregunta y más se equivoca: colación, pistas y
 *     rodaje, autorizaciones, niveles y rumbos, aclaración y lenguaje común.
 *   - Solo lo verificado en las fuentes cargadas (Doc 9432, Doc 4444 caps. 1
 *     a 5 y Doc 9835), con la referencia en cada pregunta.
 *   - Ninguna repite un ejercicio de la práctica ni un «pon a prueba» de
 *     lección (`evaluacionesContenido.test.ts` lo vigila).
 */

export const CM_EVALUACION_META = {
  total: 80,
  porIntento: 25,
  puntajePorPregunta: 4,
  aprobacion: 80,
  aviso:
    "Las preguntas salen del mismo material que el módulo (Doc 9432, Doc 4444 y Doc 9835 de la OACI) y son de elaboración propia, no material oficial de ningún organismo ni autoridad: verifica siempre en la publicación de información aeronáutica y en el reglamento vigente de tu país.",
}
