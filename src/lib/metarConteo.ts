/**
 * Conteos fijos de Meteorología, para pantallas que no deben cargar el módulo.
 *
 * `metar.ts` pesa 22 KB porque lleva los ejercicios dentro, así que el panel no
 * puede importarlo solo para saber cuántas secciones hay: se llevaría el
 * contenido del módulo al trozo del inicio. Es el mismo motivo por el que NOTAM
 * tiene `notamComun.ts` aparte.
 *
 * Si cambia el contenido, `leccionesConteo.test.ts` falla y dice qué número
 * poner aquí.
 */
export const METAR_CONTEO = { secciones: 30, practicas: 70, aprobacion: 80 } as const
