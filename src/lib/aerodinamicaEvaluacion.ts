/**
 * Quiz final de Aerodinámica: 40 preguntas de opción múltiple, cuatro opciones,
 * una correcta. Cada intento toma 20 al azar y baraja las opciones.
 *
 * El banco se edita en el documento del módulo (docs/contenido/aerodinamica.md,
 * sección «Quiz final»), lo genera scripts/aerodinamica/convertir.mjs en
 * contenido/bancos/aerodinamica_evaluacion.json, y lo presenta y califica el
 * servidor (services/evaluaciones.ts). El navegador nunca recibe las respuestas
 * junto con las preguntas.
 *
 * Cada pregunta lleva su sección en los metadatos (`{"tema": "S04"}`): es lo
 * que permite que el resultado diga qué secciones repasar y enlace cada una.
 */

export const AERO_EVALUACION_META = {
  total: 40,
  porIntento: 20,
  puntajePorPregunta: 5,
  aprobacion: 80,
  aviso:
    "Las preguntas salen de los mismos documentos que el módulo (PHAK de la FAA, AC 61-107B, AUPRTA y AMC 25.251 de EASA) y son de elaboración propia, no material oficial de ningún organismo ni autoridad: verifica siempre en el AFM y el manual de operaciones de tu tipo.",
}
