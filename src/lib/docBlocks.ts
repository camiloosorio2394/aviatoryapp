/**
 * Bloques de la lección-documento que no viven en `notamLesson.ts`.
 *
 * El tipo `LessonBlock` nació dentro de la lección de NOTAM y sigue ahí. Este
 * archivo lo amplía desde fuera para poder añadir piezas nuevas al renderizador
 * sin abrir el archivo de contenido, que es el que se reescribe a mano.
 *
 * Para escribir una lección con figuras, teclea las pantallas como
 * `DocScreen[]` en vez de `LessonScreen[]`: es la misma pantalla con la lista
 * de bloques ampliada. `LessonScreen[]` sigue valiendo donde no haga falta.
 */

import type { LessonBlock, LessonScreen } from "@/lib/notamLesson"

/**
 * Una ilustración dentro de la hoja.
 *
 * `alt` es obligatorio: si la imagen enseña algo hay que poder describirlo, y
 * si es decorativa no debería estar en una lección. `ancho` y `alto` son los
 * del archivo, en píxeles, para que el texto no salte cuando la imagen carga.
 */
export interface FiguraBlock {
  kind: "figura"
  src: string
  alt: string
  ancho: number
  alto: number
  /** Pie opcional, debajo de la imagen. */
  pie?: string
}

/** Todo lo que sabe pintar `DocBlock`. */
export type DocBlockData = LessonBlock | FiguraBlock

/** Una pantalla de lección que además puede llevar figuras. */
export interface DocScreen extends Omit<LessonScreen, "blocks"> {
  blocks: DocBlockData[]
}
