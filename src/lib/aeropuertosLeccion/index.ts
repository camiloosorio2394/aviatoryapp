/**
 * La lección de Aeropuertos: veintidós lecciones en cinco niveles.
 *
 * Progresión: cómo se lee un aeropuerto → lo pintado en el suelo → letreros y
 * balizas → luces → operar. Cada nivel cierra con su entrevista de aerolínea,
 * que es una pantalla aparte y no cuenta como lección.
 *
 * Es el módulo más visual de la app: el texto de cada lección cabe en unas 150
 * palabras y las imágenes explican los elementos y decisiones operativas.
 *
 * Norma: **solo OACI**. Anexo 14, Volumen I, 9.ª edición (2022) con la Enmienda
 * 18, aplicable desde el 27 de noviembre de 2025, y Anexo 4 para las cartas. Lo
 * nacional solo aparece cuando es una diferencia real, y marcado como tal.
 *
 * Las lecciones se escriben por nivel en su propio archivo; este solo las junta
 * y comprueba que la numeración sea la que el índice y el avance esperan.
 */

import type { DocScreen } from "@/lib/docBlocks"
import { NIVEL_1 } from "./nivel1"
import { NIVEL_2 } from "./nivel2"
import { NIVEL_3 } from "./nivel3"
import { NIVEL_4 } from "./nivel4"
import { NIVEL_5 } from "./nivel5"

export const AP_LECCIONES: DocScreen[] = [...NIVEL_1, ...NIVEL_2, ...NIVEL_3, ...NIVEL_4, ...NIVEL_5]

// La numeración es la que se guarda como avance: si un archivo se desordena,
// mejor caerse al arrancar que marcar leída la lección equivocada.
AP_LECCIONES.forEach((s, i) => {
  if (s.n !== i + 1) throw new Error(`aeropuertosLeccion: la lección ${s.n} está en la posición ${i + 1}`)
})

export const AP_LECCION_TOTAL = AP_LECCIONES.length

export const AP_MINUTOS = AP_LECCIONES.reduce((t, s) => t + s.minutes, 0)

// La entrevista de aerolínea que cierra cada nivel, aparte de las lecciones.
export { AP_ENTREVISTAS } from "./entrevistas"
