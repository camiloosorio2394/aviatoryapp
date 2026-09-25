/**
 * Evaluación de MEL: 70 preguntas de opción múltiple, cuatro opciones, una
 * correcta. Cada intento toma 25 al azar y baraja las opciones.
 *
 * El banco se edita en `contenido/bancos/mel_evaluacion.json` y lo presenta y
 * califica el servidor (`services/evaluaciones.ts`). El navegador nunca recibe
 * las respuestas junto con las preguntas, así que aquí no hay ni una
 * pregunta: solo los números que la pantalla anuncia antes de empezar.
 *
 * Reglas con las que se escribió el banco (ver su `descripcion`):
 *   - Más peso en leer e interpretar entradas, del defecto al despacho e
 *     impacto operacional (niveles 2 a 4).
 *   - Solo lo verificado en las fuentes cargadas (PL-25, PL-34, 14 CFR
 *     121.628, 8900.1, AC 120-125, las MMEL de la FAA, RAC 121 y RAC 91),
 *     con la referencia en cada pregunta.
 *   - Ninguna repite un ejercicio de la práctica ni un texto de las lecciones
 *     (`melPractica.test.ts` y `evaluacionesContenido.test.ts` lo vigilan).
 */

export const MEL_EVALUACION_META = {
  total: 70,
  porIntento: 25,
  puntajePorPregunta: 4,
  aprobacion: 80,
  aviso:
    "Las preguntas salen del mismo material que el módulo (las MMEL y los Policy Letters de la FAA, la Order 8900.1, el RAC 121 y el RAC 91) y son de elaboración propia, no material oficial de ningún organismo ni autoridad. Los plazos A a D son los del sistema FAA: en tu aerolínea rige la MEL aprobada del operador.",
}
