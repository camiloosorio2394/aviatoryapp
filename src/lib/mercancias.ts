/**
 * Módulo Mercancías Peligrosas: los datos.
 *
 * El contenido sale del material de Cami (guía práctica para pilotos, con
 * RAC 175, Anexo 18 y Doc 9284 de OACI y la IATA DGR como fuentes) y de la
 * estructura del diseño del módulo.
 *
 * Aquí solo vive lo que es dato: las secciones, las fuentes y la vigencia. El
 * contenido de cada sección va en las piezas del lector, porque lleva marcado
 * y enlaces y no se deja escribir como texto plano sin perder la mitad.
 */

import type { ModuloSeccion } from "@/components/modulo/tipos"

/** Nombre del módulo, tal como aparece en la barra del lector y en el hub. */
export const MP_TITULO = "Mercancías Peligrosas"

/** Las fuentes normativas, en la línea de la barra. Siempre visibles. */
export const MP_FUENTES = "RAC 175 · Anexo 18 y Doc 9284 OACI · IATA DGR"

/**
 * Edición de la que sale el material.
 *
 * Va en la barra y no en una nota al pie a propósito: el RAC 175 consultado es
 * la Edición Original y ha tenido enmiendas, así que el piloto tiene que ver de
 * qué edición está leyendo mientras lee, no al final.
 */
export const MP_VIGENCIA = "RAC 175 · Ed. original 2016"

/**
 * Los pasos del lector.
 *
 * Las nueve primeras se leen; la práctica y el chequeo se resuelven, y por eso
 * van marcadas como otro grupo: el contador de la barra cuenta solo lo que se
 * lee ("03 / 09") y el índice las separa.
 */
export const MP_SECCIONES: ModuloSeccion[] = [
  { n: "00", titulo: "Briefing del módulo" },
  { n: "01", titulo: "De dónde sale la norma" },
  { n: "02", titulo: "Las nueve clases" },
  { n: "03", titulo: "Prohibiciones y limitaciones" },
  { n: "04", titulo: "Grupos de embalaje" },
  { n: "05", titulo: "Marcas, etiquetas y documentos" },
  { n: "06", titulo: "Información al piloto al mando" },
  { n: "07", titulo: "Mercancías ocultas y estiba" },
  { n: "08", titulo: "Emergencias y notificación" },
  { n: "09", titulo: "Práctica de clasificación", grupo: "practica" },
  { n: "10", titulo: "Chequeo final", grupo: "practica" },
]

/** Cuántas secciones de lectura tiene el módulo. Denominador del progreso. */
export const MP_LECTURA_TOTAL = MP_SECCIONES.filter((s) => s.grupo !== "practica").length

/** Ruta del hub del tema. El lector vuelve aquí al salir. */
export const MP_HUB = "/app/aerolinea/mercancias"

/** Ruta del lector. */
export const MP_LECTOR = "/app/aerolinea/mercancias/leccion"
