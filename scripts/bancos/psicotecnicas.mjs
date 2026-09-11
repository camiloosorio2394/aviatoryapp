/**
 * El banco de psicotécnicas en el formato de banco_preguntas.
 *
 * La fuente editorial sigue siendo `src/data/psicotecnicas/` (la usan los
 * verificadores de scripts/psicotecnicas/), pero la app ya no la importa: los
 * ejercicios llegan del servidor. Este módulo convierte esa fuente en
 * `contenido/bancos/psicotecnicas.json`, que es lo que se siembra.
 *
 * Lo que el piloto ve durante el ejercicio va en `metadatos` (figura, imagen,
 * tiempo, nivel); lo que no debe ver hasta responder va en las columnas propias
 * de banco_preguntas (correcta, explicación) o en metadatos que el servidor no
 * devuelve antes de tiempo (id, categoría, subcategoría, fuente).
 */

export const BANCO_PSICOTECNICAS = "psicotecnicas"

/** Un EjercicioPsico convertido en pregunta de banco. Sin campos indefinidos. */
export function preguntaDeEjercicio(e) {
  const metadatos = { categoria: e.categoria, subcategoria: e.subcategoria, nivel: e.nivel, tiempo: e.tiempo }
  if (e.imagen) metadatos.imagen = e.imagen
  if (e.imagenAlt) metadatos.imagenAlt = e.imagenAlt
  if (e.figura) metadatos.figura = e.figura
  if (e.opcionesEnImagen) metadatos.opcionesEnImagen = true

  return {
    id: e.id,
    enunciado: e.enunciado,
    opciones: e.opciones,
    correcta: e.respuesta,
    explicacion: e.explicacion,
    referencia: e.fuente,
    metadatos,
  }
}

export function bancoDePsicotecnicas(ejercicios) {
  return {
    banco: BANCO_PSICOTECNICAS,
    descripcion:
      "Pruebas psicotécnicas: razonamiento abstracto, espacial y numérico. Generado desde src/data/psicotecnicas con scripts/bancos/exportar-psicotecnicas.mjs; no se edita a mano.",
    preguntas: ejercicios.map(preguntaDeEjercicio),
  }
}
