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
  /**
   * La cita que manda: el LAR 175 del SRVSOP, que es la norma regional.
   * "LAR 175.715 (a)".
   */
  ref?: string
  /**
   * De dónde sale la regla en la OACI: "Anexo 18" o la Parte o Tabla de las
   * Instrucciones Técnicas que la norma regional nombra ("Tabla 8-1").
   * Solo se escribe cuando el LAR o el RAC la señalan: no se deduce.
   */
  oaci?: string
  /**
   * Una adopción nacional, para que se vea que cada Estado publica la suya.
   * En el módulo se usa Colombia: "RAC 175.1010 (a)".
   */
  rac?: string
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
  fuente?: string
  hueco?: { id: string; medida: string; descripcion: string }
  /** La foto, cuando ya existe. Sustituye al hueco. */
  imagen?: { src: string; alt: string }
}

/** La aplicación concreta de un concepto en el trabajo diario del piloto. */
/** Foto que acompaña a una ficha, a la derecha en escritorio. */
export interface FotoFicha {
  src: string
  alt: string
}

/** La foto que todavía no existe: rotulada con su medida y lo que tiene que enseñar. */
export interface HuecoFoto {
  id: string
  medida: string
  descripcion: string
}

export interface EnLaOperacionBlock {
  kind: "enLaOperacion"
  /** "En el briefing", "En la rampa", "En vuelo". */
  momento: string
  texto: string
  pasos?: string[]
  /** El rótulo de la esquina, «Escenario de práctica» por ejemplo. Solo si lo es. */
  rotulo?: string
  imagen?: FotoFicha
  hueco?: HuecoFoto
  /** «Lo que estás viendo»: qué señalar en la foto. Solo se pinta con foto real. */
  ves?: string[]
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
  columnas?: 1 | 2 | 3
  items: {
    titulo: string
    ref?: string
    /** La explicación. Puede faltar: con foto y solo el nombre, cuando la foto ya lo explica. */
    puntos?: string[]
    /** El rótulo sobre la explicación, si no es «En palabras fáciles de entender». */
    puntosRotulo?: string
    nota?: string
    /** Foto encima de la ficha. Con foto o hueco, la ficha pasa a la versión con imagen. */
    imagen?: FotoFicha
    /** La foto que todavía no existe, rotulada con su medida. */
    hueco?: HuecoFoto
    /**
     * Lo que dice el reglamento, literal, antes de la explicación para el piloto.
     * `rotulo` existe para cuando el texto no es una definición: el LAR usa
     * términos que no define, y eso tiene que decirse, no disimularse.
     */
    tecnica?: { texto: string; ref?: string; rotulo?: string; nota?: string }
  }[]
}

/**
 * Selector interactivo de las nueve clases (Mercancías peligrosas). Trae sus
 * propios datos; el bloque solo lo nombra.
 */
export interface ClasesMPBlock {
  kind: "clasesMP"
}

/**
 * Una imagen real con puntos numerados: el alumno señala y descubre.
 *
 * Es el bloque que cambia «leer» por «reconocer», y por eso el texto de cada
 * punto no se ve hasta que se pulsa. `x` e `y` van en porcentaje sobre la
 * imagen, medidos desde su esquina superior izquierda.
 */
export interface ReconoceBlock {
  kind: "reconoce"
  titulo?: string
  intro?: string
  imagen: { src: string; alt: string; ancho: number; alto: number }
  puntos: {
    /** Posición del punto, en % del ancho y del alto de la imagen. */
    x: number
    y: number
    /** Qué es, en dos o tres palabras: rotula el botón. */
    que: string
    /** Qué significa. */
    significa: string
    /** Y esto por qué le importa a un piloto. */
    piloto: string
  }[]
}

/**
 * Una situación de operación con la respuesta guardada detrás de un botón.
 *
 * El valor está en los segundos en que el alumno piensa qué haría, así que las
 * claves no se muestran de entrada.
 */
export interface PiensaComoPilotoBlock {
  kind: "piensaComoPiloto"
  /** "En plataforma", "Antes del vuelo", "En crucero". */
  momento?: string
  situacion: string
  pregunta: string
  /**
   * La primera frase de la respuesta, antes de las claves. Cuando está, abre
   * ella la respuesta y sobra el rótulo «Lo que te interesa a ti».
   */
  respuesta?: string
  /** Cada clave, suelta o con su título («Presión», «Tiempo de respuesta»). */
  claves: (string | { titulo: string; texto: string })[]
  /** «Lo que te interesa como piloto»: la idea que hay que llevarse, después de las claves. */
  interesa?: string
  cierre?: string
  /** El rótulo de la esquina, «Escenario de práctica» por ejemplo. Solo si lo es. */
  rotulo?: string
  imagen?: FotoFicha
  hueco?: HuecoFoto
  /** «Lo que estás viendo»: qué señalar en la foto. Solo se pinta con foto real. */
  ves?: string[]
}

/**
 * Preguntas de entrevista en tres niveles, sin opciones: en una entrevista
 * nadie te da cuatro alternativas. Debajo de la respuesta van los conceptos
 * que el evaluador espera oír.
 */
export interface EntrevistaBlock {
  kind: "entrevista"
  titulo?: string
  intro?: string
  preguntas: {
    nivel: "concepto" | "interpretacion" | "situacion"
    q: string
    respuesta: string
    /** Lo que había que mencionar sí o sí. */
    claves?: string[]
    ref?: string
  }[]
}

/**
 * La capa de consulta: la norma completa, plegada. Nada se borra por extenso;
 * deja de competir con la enseñanza por la misma pantalla.
 */
export interface DetalleTecnicoBlock {
  kind: "detalleTecnico"
  /** Rótulo del botón. Por defecto, "Ver detalle técnico". */
  etiqueta?: string
  /** Cita corta a la derecha del botón: "LAR 175.430". */
  cita?: string
  bloques: DocBlockData[]
}

/** Fichas de las etiquetas de las Instrucciones Técnicas, por familia. */
export interface EtiquetasMPBlock {
  kind: "etiquetasMP"
  grupo: "riesgo" | "manipulacion" | "todas"
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
  | ClasesMPBlock
  | EtiquetasMPBlock
  | ReconoceBlock
  | PiensaComoPilotoBlock
  | EntrevistaBlock
  | DetalleTecnicoBlock

/** Una pantalla de lección que además puede llevar figuras. */
export interface DocScreen extends Omit<LessonScreen, "blocks"> {
  blocks: DocBlockData[]
}
