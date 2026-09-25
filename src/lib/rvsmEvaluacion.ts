/**
 * Evaluación de RVSM: 40 preguntas de opción múltiple, cuatro opciones, una
 * correcta. Cada intento toma 20 al azar y el servidor baraja las opciones.
 *
 * El banco se genera en `contenido/bancos/rvsm_evaluacion.json` desde el
 * documento y lo presenta y califica el servidor (`services/evaluaciones.ts`).
 * El navegador nunca recibe las respuestas junto con las preguntas, así que
 * aquí no hay ni una pregunta: solo los números que la pantalla anuncia antes
 * de empezar.
 */

export const RVSM_EVALUACION_META = {
  total: 40,
  porIntento: 20,
  puntajePorPregunta: 5,
  aprobacion: 80,
  aviso:
    "Las preguntas salen del mismo material que el módulo y son de elaboración propia, no texto oficial de ninguna autoridad: para operar mandan el AFM, el FCOM, el QRH y el manual de operaciones de tu aerolínea, y la reglamentación vigente del Estado donde vueles.",
}
