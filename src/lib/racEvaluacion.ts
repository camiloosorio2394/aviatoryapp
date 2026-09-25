/**
 * Evaluación del módulo RAC: 50 preguntas de opción múltiple, cuatro opciones,
 * una correcta. Cada intento toma 20 al azar y el servidor baraja las opciones.
 *
 * El banco se edita en docs/contenido/rac.md («Quiz final del módulo RAC»), lo
 * pasa a `contenido/bancos/rac_evaluacion.json` scripts/rac/convertir.mjs, y lo
 * presenta y califica el servidor (`services/evaluaciones.ts`). El navegador
 * nunca recibe las respuestas junto con las preguntas, así que aquí no hay ni
 * una pregunta: solo los números que la pantalla anuncia antes de empezar.
 *
 * Reglas con las que se escribió el banco:
 *   - Reparto por bloque: 13, 10, 9, 13 y 5 preguntas; las diecinueve unidades
 *     tienen al menos una.
 *   - Cada pregunta lleva su numeral en la referencia, y se comprobó contra el
 *     texto oficial de la Aerocivil, no solo contra el módulo.
 *   - Ninguna repite una pregunta de la práctica de las unidades.
 *   - Nada de números de resolución: se pregunta lo que un piloto aplica. La
 *     excepción es el 31 de agosto de 2027, la fecha del paso del RAC 2 al
 *     RAC 61, que sí cambia lo que se le exige.
 */

export const RAC_EVALUACION_META = {
  total: 50,
  porIntento: 20,
  aprobacion: 80,
  aviso:
    "Las preguntas son de elaboración propia a partir de los textos oficiales vigentes de la Aerocivil. Para volar manda el RAC publicado y el manual de operaciones de tu aerolínea: si la norma cambia, cambia la respuesta.",
}
