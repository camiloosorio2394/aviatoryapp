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
 *
 * Los bloques de curso (norma, caso real, en la operación, escenario, pon a
 * prueba, fichas) los estrenó Mercancías peligrosas, pero no llevan nada de
 * mercancías: cualquier módulo que cite una norma o cuente un accidente los
 * puede usar tal cual.
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
  /**
   * Ancho máximo en píxeles. Sin él la figura ocupa la columna entera, que
   * es lo que quiere un plano o un diagrama. Con él se acota y se centra,
   * para lo que ilustra un detalle y no debe dominar la página.
   */
  anchoMax?: number
}

/**
 * Qué clase de afirmación es la que se cita.
 *
 * El módulo tiene que decir si algo es un requisito de la norma, una
 * recomendación, un procedimiento que fija cada explotador, una buena práctica
 * de la industria o una explicación del curso. Sin la etiqueta, todo se lee en
 * el mismo tono y el piloto no sabe qué le pueden exigir y qué no.
 */
export type NaturalezaNorma =
  | "requisito"
  | "recomendacion"
  | "explotador"
  | "practica"
  | "pedagogico"

/** Cita de la norma, literal o casi, con su referencia y su naturaleza. */
export interface NormaBlock {
  kind: "norma"
  /** "RAC 175.515 (a)", "Anexo 18, 9.1". */
  ref: string
  texto: string
  /** Por defecto, requisito. */
  naturaleza?: NaturalezaNorma
  titulo?: string
}

/**
 * Un caso real, con su fuente. Nunca uno inventado.
 *
 * Trae lo que ocurrió, qué se transportaba, la consecuencia y lo que el piloto
 * tiene que reconocer. La fuente va siempre: es lo que separa un caso real de
 * una anécdota. Cuando el caso lleva foto y todavía no existe, `hueco` deja el
 * espacio rotulado con su identificador y su medida.
 */
export interface CasoRealBlock {
  kind: "casoReal"
  /** "ValuJet 592". */
  titulo: string
  fecha: string
  lugar?: string
  /** "DC-9-32 · N904VJ · Miami a Atlanta". */
  aeronave?: string
  /** Qué mercancía peligrosa estaba involucrada. */
  mercancia: string
  /** Párrafos cortos, en orden. */
  queOcurrio: string[]
  consecuencia: string
  /** Lo que un piloto debería reconocer. */
  leccion: string
  /** Frase textual del informe, si aporta. */
  cita?: { texto: string; de: string }
  fuente: string
  hueco?: { id: string; medida: string; descripcion: string }
}

/** La aplicación concreta de un concepto en el trabajo diario del piloto. */
export interface EnLaOperacionBlock {
  kind: "enLaOperacion"
  /** "En el briefing", "En la rampa", "En vuelo". */
  momento: string
  texto: string
  pasos?: string[]
}

/**
 * Escenario construido para el curso. Va rotulado como tal, siempre.
 *
 * Cada pregunta se abre al tocarla y muestra la respuesta debajo: el alumno
 * decide antes de leer lo que habría que hacer. Al pie va el aviso de que no es
 * un documento real ni sustituye el manual del explotador.
 */
export interface EscenarioBlock {
  kind: "escenario"
  titulo: string
  situacion: string
  preguntas: { q: string; a: string }[]
  /** El concepto que el escenario pone a prueba, en una línea. */
  concepto?: string
}

/**
 * "Pon a prueba lo que aprendiste": una o varias preguntas, con
 * retroalimentación POR OPCIÓN. No solo dice cuál es la buena: dice por qué
 * cada una de las otras no lo es, que es donde de verdad se aprende.
 */
export interface PonAPruebaBlock {
  kind: "ponAPrueba"
  titulo?: string
  preguntas: {
    q: string
    /** Artículo que respalda la respuesta. */
    ref?: string
    opciones: { t: string; ok?: boolean; fb: string }[]
  }[]
}

/** Fichas con título, referencia y puntos. Para actores, términos, comparaciones. */
export interface FichasBlock {
  kind: "fichas"
  titulo?: string
  columnas?: 2 | 3
  items: { titulo: string; ref?: string; puntos: string[]; nota?: string }[]
}

/** Todo lo que sabe pintar `DocBlock`. */
export type DocBlockData =
  | LessonBlock
  | FiguraBlock
  | NormaBlock
  | CasoRealBlock
  | EnLaOperacionBlock
  | EscenarioBlock
  | PonAPruebaBlock
  | FichasBlock

/** Una pantalla de lección que además puede llevar figuras. */
export interface DocScreen extends Omit<LessonScreen, "blocks"> {
  blocks: DocBlockData[]
}
