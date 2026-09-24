/**
 * Evaluación de Performance: 60 preguntas de opción múltiple, cuatro opciones,
 * una correcta. Cada intento toma 25 al azar y el servidor baraja las opciones.
 *
 * El banco se edita en `contenido/bancos/performance_evaluacion.json` y lo
 * presenta y califica el servidor (`services/evaluaciones.ts`). El navegador
 * nunca recibe las respuestas junto con las preguntas, así que aquí no hay ni
 * una pregunta: solo los números que la pantalla anuncia antes de empezar.
 *
 * Reglas con las que se escribió el banco:
 *   - Reparto por nivel: 6, 13, 9, 13, 12, 3 y 4 preguntas, con 34 de los 40
 *     temas tocados y el peso donde el módulo lo pone: velocidades de despegue,
 *     aceleración y parada, campo equilibrado, segundo segmento, obstáculos y
 *     aterrizaje.
 *   - Cuatro son de cálculo, que es lo que más se pregunta en una prueba de
 *     ingreso: conversión de gradiente, atmósfera estándar, viento acreditado y
 *     régimen de ascenso.
 *   - Ninguna repite un ejercicio resuelto ni un escenario del módulo.
 *   - Ninguna cifra sin fuente: todo sale del material verificado del módulo, y
 *     donde la FAA y EASA difieren se dice cuál es cuál.
 *   - La correcta no se delata por larga. Medido sobre las sesenta: la razón
 *     entre la correcta y la siguiente más larga tiene mediana 0,94 y máximo
 *     1,14, y la correcta es la más larga en 24 y la más corta en 22.
 */

export const PERF_EVALUACION_META = {
  total: 60,
  porIntento: 25,
  puntajePorPregunta: 4,
  aprobacion: 80,
  aviso:
    "Las preguntas salen del mismo material que el módulo y son de elaboración propia, no material oficial de ningún fabricante, operador ni autoridad: para volar manda el AFM, el FCOM y el manual de operaciones de tu aerolínea.",
}
