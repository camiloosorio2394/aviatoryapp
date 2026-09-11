/**
 * Los NOTAM colombianos reales que las lecciones muestran embebidos (el bloque
 * de NOTAM nacional de DocLessonBlocks).
 *
 * Va aparte de notam.ts porque DocLessonBlocks es el lector de todas las
 * lecciones (NOTAM, Meteorología, Mercancías): con el import de notam.ts, abrir
 * cualquier lección descargaba el contenido completo del tema NOTAM.
 */

import nationalRaw from "@/data/notam/notams_nacionales.json"
import { deepPlain, plainText, type NotamLevel } from "@/lib/notamComun"

export interface NationalNotam {
  id: string
  /** Ruta original del paquete de contenido; usar notamImageUrl() para la URL servible */
  imagen: string
  serie_numero: string
  aerodromo: string
  nivel: NotamLevel
  /** Transcripción del recorte: alt-text, búsqueda y evaluación sin OCR */
  transcripcion: string
  decodificacion: string
  puntos_clave: string[]
  errores_tipicos?: string[]
  fuente_imagen: string
}

export const NATIONAL_NOTAMS = deepPlain(nationalRaw.notams as NationalNotam[])

/** Aviso obligatorio en pantalla: NOTAM colombianos reales embebidos en la lección (vigencia expirada). */
export const AVISO_NACIONALES = plainText(nationalRaw.meta.aviso_obligatorio_en_pantalla as string)

/** URL servible de la imagen de un NOTAM nacional (los PNG viven en /public/notams). */
export function notamImageUrl(rel: string): string {
  return `/notams/${rel.split("/").pop()}`
}
