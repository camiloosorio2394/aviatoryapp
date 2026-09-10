/**
 * Figuras de psicotécnicas, dibujadas por Aviatory.
 *
 * Los ejercicios llegaron como recortes de los cuadernillos, con el logotipo
 * del autor impreso en mitad de la pregunta y, en la serie A1, con las letras
 * de las opciones cortadas por el encuadre. Reencuadrar no arregla lo primero:
 * la marca está dentro del pixel. Así que la figura deja de ser una imagen y
 * pasa a ser una descripción —qué elementos hay y dónde—, y el dibujo se
 * deduce de ella.
 *
 * Lo que eso compra, además de quitar las marcas ajenas:
 *
 * - **Cada opción es su propia figura.** Antes vivían dentro del pixel de la
 *   imagen grande y el botón era solo una letra. Ahora se dibujan aparte, y el
 *   ejercicio se puede usar en un móvil sin ampliar nada.
 * - **La regla queda escrita.** Si la serie es «la flecha gira un cuarto», eso
 *   está en los atributos y un solucionador puede comprobarlo. Una respuesta
 *   ya no se sostiene en que alguien miró bien.
 * - **Sigue al tema.** El trazo es `currentColor`; en claro es tinta sobre
 *   papel y en oscuro al revés, sin dos juegos de archivos.
 *
 * El dibujo se emite como cadena SVG y no como JSX a propósito: así lo usan
 * igual la aplicación y `scripts/psicotecnicas/verificar-figuras.mjs`, que
 * levanta esta misma descripción para enfrentarla al recorte original.
 */

// ────────────────────────────────────────────────────────────────────────────
// Vocabulario
//
// Regla de la casa: la figura se describe por atributos, nunca por trazos
// sueltos. Si un ejercicio no cabe aquí, se amplía el vocabulario; en cuanto
// entre un `path` a mano se pierde la ventaja entera, porque un `path` no se
// puede comparar, ni resolver, ni verificar.

/** Cuadrante dentro de una rejilla de dos por dos. */
export type Cuadrante = 0 | 1 | 2 | 3 // 0=sup-izq 1=sup-der 2=inf-izq 3=inf-der

export type Sentido = "arriba" | "abajo" | "izquierda" | "derecha"

/** Hacia dónde mira el vértice de un triángulo inscrito. */
export type Apice = "arriba" | "abajo" | "izquierda" | "derecha"

/**
 * Rellenos del cuadernillo.
 *
 * Son atributos, no colores: lo que el ejercicio hace variar es «rayado» o
 * «punteado», no un tono. Por eso se dibujan con tramas de `currentColor` y
 * siguen al tema como el resto del trazo.
 */
export type Relleno =
  | "blanco"
  | "negro"
  | "rayado-diagonal"
  | "rayado-vertical"
  | "punteado"
  | "cuadricula"
  | "escamas"
  | "rayado-punteado"

export type Esquina =
  | "inferior-izquierda"
  | "inferior-derecha"
  | "superior-izquierda"
  | "superior-derecha"

/** Un elemento dibujable dentro de una celda. */
export type Elemento =
  | { tipo: "flecha"; cuadrante: Cuadrante; sentido: Sentido }
  /** Triángulo inscrito en la celda, con la base en el lado opuesto al ápice. */
  | { tipo: "triangulo"; apice: Apice }
  /**
   * El segmento que baja del ápice hacia el centro de la base sin llegar a
   * tocarla. En los cuadernillos es un atributo que aparece y desaparece, no
   * una parte del triángulo, y por eso va suelto.
   */
  | { tipo: "mastil"; apice: Apice }
  /** Trazo corto que muere en una esquina, entrando en diagonal suave. */
  | { tipo: "trazo-esquina"; esquina: Esquina }
  /** Rombo inscrito: sus cuatro vértices, en los medios de los lados. */
  | { tipo: "rombo" }
  /**
   * Brazo desde el centro hasta el medio de un lado.
   *
   * Va suelto y no como «cruz» o «eje» porque en los cuadernillos los cuatro
   * brazos aparecen y desaparecen uno a uno: son cuatro atributos, y tratarlos
   * como uno solo perdería justo lo que cambia entre casilla y casilla.
   */
  | { tipo: "radio"; hacia: Sentido }
  /** Las dos diagonales del rectángulo, de esquina a esquina. */
  | { tipo: "diagonales" }
  /**
   * Cuerda del rombo, paralela a uno de sus ejes.
   *
   * Se declara por el lado hacia el que se desplaza —«una cuerda hacia el
   * este»— y no por una coordenada: cae siempre a mitad de camino entre el
   * centro y ese vértice, con los extremos sobre los lados del rombo. Es un
   * atributo, y por eso se puede comparar entre casillas.
   */
  | { tipo: "cuerda"; hacia: Sentido }
  /**
   * Cuadrado con una circunferencia en el medio de uno de sus lados y, cuando
   * los lleva, dos marcadores en las esquinas del lado opuesto.
   *
   * Va como un elemento y no como cuatro sueltos porque en el cuadernillo se
   * mueve como uno solo: el rabo sale de la circunferencia y los marcadores
   * cuelgan siempre del lado contrario. Sus dos atributos —hacia dónde mira y
   * qué marcadores lleva— son justo los que la matriz hace variar.
   */
  /**
   * La pieza con punta: una barra rematada por un triángulo.
   *
   * La barra va siempre perpendicular a la punta, como en las alternativas del
   * cuadernillo. El original dibuja algunas casillas con la barra en el eje de
   * la punta, pero eso es cómo lo maquetaron: el atributo que el ejercicio
   * hace variar es hacia dónde apunta, y así todas se comparan igual.
   */
  | { tipo: "pieza-punta"; mira: Sentido; relleno: Relleno }
  /**
   * El casco del ejercicio 17: un cuerpo rectangular con una punta a cada lado,
   * un remate encima y, en dos alternativas, una sombra negra por dentro.
   *
   * Las puntas no son «negra o blanca»: se tiñe **media** punta, la de arriba o
   * la de abajo, y eso es la regla de la matriz. Leerlas como enteras es
   * quedarse sin ejercicio, y fue la primera lectura que se hizo.
   *
   * `particion` es cómo viene partido el cuerpo: entero, en cuatro cuadros —una
   * raya vertical y otra horizontal— o en cuatro columnas. Se transcribe porque
   * está, no porque decida: **las cinco alternativas traen el cuerpo entero**,
   * así que el cuadernillo no pregunta por esto y el ejercicio no tendría forma
   * de responderlo.
   *
   * `sombra` es «ninguna» en las ocho casillas: solo la usan la B y la E, que
   * meten un triángulo negro dentro del cuerpo. Se declara igual, porque que
   * sea constante es justo lo que descarta esas dos.
   */
  | {
      tipo: "casco"
      puntaIzquierda: "blanca" | "arriba" | "abajo" | "negra"
      puntaDerecha: "blanca" | "arriba" | "abajo" | "negra"
      cuerpo: Relleno
      particion: "ninguna" | "cuatro-cuadros" | "cuatro-columnas"
      remate: "torre" | "triangulo" | "plancha"
      remateRelleno: Relleno
      sombra: "ninguna" | "media-diagonal" | "monte"
    }
  /** Una recta de lado a lado de la casilla. */
  | { tipo: "diagonal"; sentido: "subiendo" | "bajando" | "tendida" }
  /**
   * La diagonal de un cuadrante, de su esquina de abajo a la izquierda a la de
   * arriba a la derecha.
   *
   * Va suelta y no dentro de `cuadrante-tenido` porque en el ejercicio 20 hay
   * cuadrantes con diagonal y sin teñir, y sobre todo porque la matriz se
   * resuelve sumando casillas: si la diagonal viniera pegada al relleno, la
   * suma de una casilla teñida y una que no lo está dejaría dos diagonales
   * encima de la misma.
   */
  | { tipo: "diagonal-cuadrante"; cuadrante: Cuadrante }
  /** El triángulo de arriba a la izquierda de un cuadrante, teñido. */
  | { tipo: "cuadrante-tenido"; cuadrante: Cuadrante; relleno: Relleno }
  /**
   * El círculo o el cuadrado que cuelga de la línea de arriba, con su tramo de
   * línea hacia el centro.
   *
   * El tramo va con la marca y no aparte: en el cuadernillo la línea llega
   * hasta pasado el medio cuando hay una sola marca y cruza la casilla entera
   * cuando hay dos, que es exactamente lo que sale al juntar los dos tramos.
   */
  | { tipo: "marca-colgada"; lado: "izquierda" | "derecha"; forma: "circulo" | "cuadrado" }
  /**
   * Los discos negros del ejercicio 19, y de qué lado de la diagonal caen.
   *
   * `cuantos: 0` se declara igual que cualquier otra cantidad, en vez de
   * quitar el elemento: en esa matriz el cero es uno de los tres valores que
   * se reparten —cero, dos y cuatro—, y si al no haber puntos desapareciera el
   * elemento, desaparecería con él el atributo y la regla dejaría de poder
   * comprobarse. `lado: "ninguno"` es «por toda la casilla», que es lo que
   * hace la alternativa A al no tener un solo lado.
   *
   * Dónde cae cada disco no se declara: lo que la matriz hace variar es
   * cuántos son y de qué lado, y fijar coordenadas sería inventar precisión.
   */
  | { tipo: "puntos"; cuantos: number; lado: "arriba" | "abajo" | "ninguno" }
  /**
   * La figurita que acompaña a los puntos: una escuadra —un cuadrito con su
   * diagonal— o un corchete en ángulo.
   *
   * Como con los puntos, la ausencia es un valor y no una falta: en la matriz
   * 19 cada fila reparte escuadra, corchete y nada.
   */
  | {
      tipo: "remate"
      forma: "escuadra" | "corchete" | "ninguno"
      lado: "arriba" | "abajo" | "centro" | "ninguno"
    }
  /**
   * La casilla del ejercicio 11: un lomo redondeado a la izquierda, dos
   * lóbulos a la derecha con una letra metida en el de arriba, y un tallo que
   * cuelga por debajo del recuadro rematado a veces con una barra.
   *
   * Va como un elemento y no como cinco sueltos porque las cinco piezas son
   * siempre las mismas y en el mismo sitio: lo que la matriz hace variar son
   * los cuatro atributos que van aquí. El lóbulo de arriba no está entre
   * ellos porque en las ocho casillas y en las cinco alternativas es blanco
   * —es donde vive la letra—, y un atributo que nunca cambia no es un
   * atributo.
   *
   * El tallo lo llevan todas; lo que aparece y desaparece es la barra del
   * final, y por eso se declara sola.
   */
  | {
      tipo: "cuadro-lobulos"
      letra: "A" | "C" | "D" | "ninguna"
      /** La trama del lomo de la izquierda. */
      lomo: Relleno
      /** La del lóbulo de abajo a la derecha. */
      lobulo: Relleno
      barra: boolean
    }
  /**
   * Un grupo de símbolos iguales, y cuántos hay.
   *
   * En esta familia lo que varía no es dónde está cada símbolo sino **cuál es y
   * cuántos son**, así que la posición no se declara: se reparten solos en una
   * retícula. Declarar coordenadas aquí sería fijar algo que el ejercicio no
   * pregunta, y de paso volver la figura incomparable entre casillas.
   *
   * Las líneas llevan orientación porque en esta familia las tres —vertical,
   * diagonal y horizontal— son el mismo símbolo girado, y esa rotación es parte
   * de la regla.
   */
  | {
      tipo: "grupo-simbolos"
      simbolo: "asterisco" | "i" | "linea"
      orientacion: "vertical" | "diagonal" | "horizontal" | "ninguna"
      cantidad: number
    }
  /**
   * El rectángulo partido en dos y una de las mitades rellena.
   *
   * `lado` dice cuál de las dos se rellena: con el corte vertical, izquierda o
   * derecha; con el horizontal, arriba o abajo; con el diagonal —que va de
   * abajo-izquierda a arriba-derecha—, arriba es el triángulo de arriba a la
   * izquierda. Cuando el relleno es blanco el lado no se ve, pero se declara
   * igual: es lo que distingue dos alternativas que solo cambian de mitad.
   */
  /**
   * El mástil del ejercicio 6: una vertical con un semicírculo arriba, un
   * círculo abajo a un lado y un gancho abierto al otro.
   *
   * El gancho no se declara: va siempre al lado contrario del círculo, como en
   * el cuadernillo. Lo que sí se declara es el relleno del círculo de abajo,
   * porque hay alternativas que solo se distinguen en eso.
   */
  /**
   * La silueta del ejercicio 7: un contorno grande, un símbolo apoyado en su
   * base y un pie justo debajo.
   *
   * Las tres partes se mueven a la vez y por eso van juntas. El relleno del
   * símbolo se declara porque una alternativa cambia la barra negra por una
   * hueca y no se distingue en nada más.
   */
  /**
   * El aspa del ejercicio 9: las dos diagonales, un círculo negro que sube y
   * baja sobre el cruce, y una banda negra en un borde.
   *
   * En la matriz el círculo y la banda van atados —cuando uno sube, la otra
   * cae al borde de abajo—, pero las alternativas los separan, así que se
   * declaran aparte.
   */
  | {
      tipo: "aspa-circulo"
      circulo: "arriba" | "centro" | "abajo"
      banda: "arriba" | "abajo" | "ninguna"
    }
  | {
      tipo: "silueta-con-simbolo"
      contorno: "triangulo" | "rectangulo" | "casa"
      simbolo: "barra" | "triangulito" | "cruz"
      simboloRelleno: Relleno
      pie: "trazo" | "patas" | "circulito"
    }
  | {
      tipo: "mastil-figura"
      semicirculo: "izquierda" | "derecha"
      relleno: Relleno
      circulo: "izquierda" | "derecha"
      circuloRelleno: Relleno
    }
  | {
      tipo: "mitad-rellena"
      corte: "vertical" | "horizontal" | "diagonal"
      lado: Sentido
      relleno: Relleno
    }
  | {
      tipo: "cuadro-marcado"
      mira: Sentido
      /** Qué se posa en el medio de ese lado. */
      nudo: "circunferencia" | "cuadrado-negro"
      /** El trazo que sale del nudo hacia fuera. Distingue alternativas. */
      rabo: boolean
      marcadores: "cuadrado" | "cuadrado-hueco" | "circulo" | "ninguno"
    }

/** El contenido de una casilla: su marco, su rejilla y lo que lleva dentro. */
export interface Celda {
  /** Rejilla interior. Hoy solo la de dos por dos del conjunto A2. */
  rejilla?: "2x2"
  /** Recuadro propio de la casilla, como lo llevan las matrices del A1. */
  marco?: boolean
  elementos: Elemento[]
}

/** La casilla que hay que adivinar. */
export interface Incognita {
  incognita: true
}

export type Casilla = Celda | Incognita

export function esIncognita(c: Casilla): c is Incognita {
  return "incognita" in c
}

/**
 * Una serie de casillas en línea con sus alternativas.
 *
 * `celdas` incluye la incógnita en su sitio, porque la posición del hueco es
 * parte del ejercicio: no siempre va al final.
 */
export interface FiguraSerie {
  tipo: "serie-lineal"
  celdas: Casilla[]
  opciones: Celda[]
}

/**
 * La matriz de tres por tres del conjunto A1, con su hueco y sus cinco
 * alternativas. `celdas` va en orden de lectura y trae nueve.
 */
export interface FiguraMatriz {
  tipo: "matriz-3x3"
  celdas: Casilla[]
  opciones: Celda[]
}

export type Figura = FiguraSerie | FiguraMatriz

// ────────────────────────────────────────────────────────────────────────────
// Medidas
//
// El lienzo se piensa en píxeles reales y se sirve al ancho natural, así que
// un trazo de 2 es un trazo de 2 en pantalla. Debajo de ese ancho la figura
// entera encoge en bloque, que es lo que hace que se lea a 375 px sin ampliar.

const CELDA = 96 // lado de una casilla de la serie
const MARCO = 2.5 // grosor del contorno que agrupa la serie
const TRAZO = 1.8 // grosor de la rejilla interior
const REJILLA = 68 // lado de la rejilla de dos por dos, centrada en la casilla
const OPCION = 78 // lado de la figura de una alternativa
const MARCA_ALTO = 18 // alto del isotipo, según el encargo
const MARCA_MARGEN = 8

// ────────────────────────────────────────────────────────────────────────────
// Tramas
//
// Van con identificador fijo a propósito. Dos SVG en la misma página declaran
// la misma trama con el mismo nombre, y el navegador resuelve `url(#…)` con la
// primera que encuentra: como todas son idénticas, el dibujo sale bien y no
// hay que inventar identificadores únicos por figura.

const TRAMAS: Record<string, string> = {
  "rayado-diagonal":
    `<pattern id="psico-rayado-diagonal" width="8" height="8" patternUnits="userSpaceOnUse"` +
    ` patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8"` +
    ` stroke="currentColor" stroke-width="2"/></pattern>`,
  "rayado-vertical":
    `<pattern id="psico-rayado-vertical" width="6" height="6" patternUnits="userSpaceOnUse">` +
    `<line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" stroke-width="2"/></pattern>`,
  punteado:
    `<pattern id="psico-punteado" width="9" height="9" patternUnits="userSpaceOnUse">` +
    `<circle cx="2.5" cy="2.5" r="1.6" fill="currentColor"/></pattern>`,
  cuadricula:
    `<pattern id="psico-cuadricula" width="9" height="9" patternUnits="userSpaceOnUse">` +
    `<path d="M0 0 H9 M0 0 V9" stroke="currentColor" stroke-width="1.4" fill="none"/></pattern>`,
  // Bandas en diagonal con un punto en cada una: el relleno del cuerpo en el
  // ejercicio 17. Se parece al rayado a secas y no lo es, y en esa matriz la
  // diferencia entre un cuerpo rayado y uno en blanco es media respuesta.
  "rayado-punteado":
    `<pattern id="psico-rayado-punteado" width="11" height="11" patternUnits="userSpaceOnUse"` +
    ` patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="11"` +
    ` stroke="currentColor" stroke-width="2"/>` +
    `<circle cx="5.5" cy="5.5" r="1.5" fill="currentColor"/></pattern>`,
  // Las escamas solo las usa la alternativa E del ejercicio 11, y ahí son todo
  // el truco: es la única que acierta la letra y falla la trama.
  escamas:
    `<pattern id="psico-escamas" width="12" height="7" patternUnits="userSpaceOnUse">` +
    `<path d="M0 7 A6 6 0 0 1 12 7 M-6 0 A6 6 0 0 1 6 0 M6 0 A6 6 0 0 1 18 0"` +
    ` fill="none" stroke="currentColor" stroke-width="1.3"/></pattern>`,
}

/** Cómo se pinta un relleno dentro de un `fill`. */
function pintura(relleno: Relleno): string {
  if (relleno === "blanco") return "var(--card, #fff)"
  if (relleno === "negro") return "currentColor"
  return `url(#psico-${relleno})`
}

// ────────────────────────────────────────────────────────────────────────────
// La marca

/**
 * El isotipo de Aviatory, en la esquina superior derecha del lienzo.
 *
 * Una sola función para las noventa y nueve figuras: si la marca se copiara
 * ficha por ficha, en la número cuarenta estaría dos píxeles más abajo y
 * nadie lo vería hasta verlas juntas.
 *
 * Va el isotipo y no el logotipo horizontal porque en una figura de ejercicio
 * el wordmark compite con el enunciado. Y va en `--muted-foreground` al 35 %:
 * tiene que decir de quién es la figura sin disputarle el trazo.
 *
 * La geometría es la de `src/assets/logos/aviatory-isotype-mono.svg`, en su
 * lienzo original de 512, escalada aquí. Si allá se ajusta, ajustar acá.
 */
function marca(anchoLienzo: number): string {
  const escala = MARCA_ALTO / 512
  const x = anchoLienzo - MARCA_ALTO - MARCA_MARGEN
  const y = MARCA_MARGEN
  return [
    `<g transform="translate(${x} ${y}) scale(${escala.toFixed(5)})"`,
    ` fill="var(--muted-foreground, currentColor)" opacity="0.35" aria-hidden="true">`,
    `<mask id="av-corte"><rect width="512" height="512" fill="#fff"/>`,
    `<polygon points="0,382 512,216 512,260 0,446" fill="#000"/></mask>`,
    `<g mask="url(#av-corte)"><path fill-rule="evenodd" clip-rule="evenodd"`,
    ` d="M243 52 L317 52 L452 470 L372 470 L280 168 L188 470 L108 470 Z"/></g>`,
    `<polygon points="38,356 126,322 502,196 502,206 150,360 96,392"/>`,
    `<polygon points="96,392 150,360 138,414 102,428"/>`,
    `<polygon points="148,408 502,224 176,432"/>`,
    `</g>`,
  ].join("")
}

/**
 * Ancho que hay que reservar para que la marca no toque el dibujo.
 *
 * Regla de oro del encargo: si el dibujo llega a esa esquina **se crece el
 * lienzo, no se mueve el dibujo**. Mover el dibujo cambia el ejercicio.
 */
const MARCA_RESERVA = MARCA_ALTO + MARCA_MARGEN * 2

// ────────────────────────────────────────────────────────────────────────────
// Trazos

/**
 * Una flecha dentro de su cuadrante, centrada en él.
 *
 * El original las dibuja finas y con la punta llena; se respeta, porque el
 * grosor de la punta es lo que distingue de un vistazo el sentido, que es el
 * único atributo que cambia en toda la familia A2.
 */
function flecha(cx: number, cy: number, largo: number, sentido: Sentido): string {
  const mitad = largo / 2
  const punta = 6.5 // media base de la cabeza
  const alto = 9 // altura de la cabeza

  // Se dibuja siempre apuntando arriba y se gira: así la cabeza es idéntica en
  // los cuatro sentidos y no hay cuatro polígonos que mantener sincronizados.
  const giro = { arriba: 0, derecha: 90, abajo: 180, izquierda: 270 }[sentido]

  return [
    `<g transform="translate(${cx} ${cy}) rotate(${giro})"`,
    ` stroke="currentColor" stroke-width="2" stroke-linecap="butt">`,
    `<line x1="0" y1="${mitad}" x2="0" y2="${-mitad + alto - 1}"/>`,
    `<polygon points="0,${-mitad} ${-punta},${-mitad + alto} ${punta},${-mitad + alto}"`,
    ` fill="currentColor" stroke="none"/>`,
    `</g>`,
  ].join("")
}

/** El centro de un cuadrante dentro de una rejilla de lado `lado` en (x, y). */
function centroDe(cuadrante: Cuadrante, x: number, y: number, lado: number) {
  const columna = cuadrante % 2 // 0 izquierda, 1 derecha
  const fila = cuadrante < 2 ? 0 : 1 // 0 arriba, 1 abajo
  return {
    cx: x + lado * (0.25 + columna * 0.5),
    cy: y + lado * (0.25 + fila * 0.5),
  }
}

/** Los tres vértices de un triángulo inscrito en el rectángulo dado. */
function verticesTriangulo(
  apice: Apice,
  x: number,
  y: number,
  ancho: number,
  alto: number
): [number, number][] {
  const [i, d, s, f] = [x, x + ancho, y, y + alto] // izquierda, derecha, superior, fondo
  const mx = x + ancho / 2
  const my = y + alto / 2
  switch (apice) {
    case "arriba":
      return [[mx, s], [i, f], [d, f]]
    case "abajo":
      return [[mx, f], [i, s], [d, s]]
    case "izquierda":
      return [[i, my], [d, s], [d, f]]
    case "derecha":
      return [[d, my], [i, s], [i, f]]
  }
}

/** El punto exacto de una esquina del rectángulo. */
function puntoEsquina(
  esquina: Esquina,
  x: number,
  y: number,
  ancho: number,
  alto: number
): [number, number] {
  const arriba = esquina.startsWith("superior")
  const izquierda = esquina.endsWith("izquierda")
  return [izquierda ? x : x + ancho, arriba ? y : y + alto]
}

/** El contenido de una casilla: su marco, su rejilla y sus elementos. */
function dibujarCelda(
  celda: Celda,
  x: number,
  y: number,
  ancho: number,
  alto: number
): string {
  const partes: string[] = []

  if (celda.marco) {
    partes.push(
      `<rect x="${x}" y="${y}" width="${ancho}" height="${alto}" fill="none"` +
        ` stroke="currentColor" stroke-width="${TRAZO}"/>`
    )
  }

  if (celda.rejilla === "2x2") {
    const mx = x + ancho / 2
    const my = y + alto / 2
    partes.push(
      `<rect x="${x}" y="${y}" width="${ancho}" height="${alto}" fill="none"` +
        ` stroke="currentColor" stroke-width="${TRAZO}"/>`,
      `<line x1="${mx}" y1="${y}" x2="${mx}" y2="${y + alto}"` +
        ` stroke="currentColor" stroke-width="${TRAZO}"/>`,
      `<line x1="${x}" y1="${my}" x2="${x + ancho}" y2="${my}"` +
        ` stroke="currentColor" stroke-width="${TRAZO}"/>`
    )
  }

  // Cuando una casilla trae varios grupos de símbolos distintos —la alternativa
  // B del ejercicio 12 mete un asterisco y una viga en la misma caja— cada
  // grupo se queda con su franja, para que no se dibujen uno encima de otro.
  // Las líneas no cuentan: atraviesan la casilla entera, que es lo que son.
  const enFranjas = celda.elementos.filter(
    (el) => el.tipo === "grupo-simbolos" && el.simbolo !== "linea"
  )
  const franjaDe = (el: Elemento) => {
    const i = enFranjas.indexOf(el)
    if (i < 0 || enFranjas.length < 2) return { x, ancho }
    // Con margen: sin él los símbolos de la franja se pegan a la línea que
    // separa las dos mitades y parece que la tocan.
    const paso = ancho / enFranjas.length
    const margen = ancho * 0.08
    return { x: x + i * paso + margen, ancho: paso - margen * 2 }
  }

  for (const el of celda.elementos) {
    switch (el.tipo) {
      case "flecha": {
        const { cx, cy } = centroDe(el.cuadrante, x, y, Math.min(ancho, alto))
        partes.push(flecha(cx, cy, Math.min(ancho, alto) * 0.34, el.sentido))
        break
      }

      case "triangulo": {
        const puntos = verticesTriangulo(el.apice, x, y, ancho, alto)
          .map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`)
          .join(" ")
        partes.push(
          `<polygon points="${puntos}" fill="none" stroke="currentColor"` +
            ` stroke-width="${TRAZO}" stroke-linejoin="miter"/>`
        )
        break
      }

      case "mastil": {
        // Baja del ápice hacia el centro de la base y se queda a medio camino:
        // en el original nunca la toca, y que no la toque es lo que lo hace un
        // atributo suelto y no una partición del triángulo.
        const [[ax, ay], [b1x, b1y], [b2x, b2y]] = verticesTriangulo(
          el.apice,
          x,
          y,
          ancho,
          alto
        )
        const baseX = (b1x + b2x) / 2
        const baseY = (b1y + b2y) / 2
        const largo = 0.55
        partes.push(
          `<line x1="${ax.toFixed(1)}" y1="${ay.toFixed(1)}"` +
            ` x2="${(ax + (baseX - ax) * largo).toFixed(1)}"` +
            ` y2="${(ay + (baseY - ay) * largo).toFixed(1)}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}"/>`
        )
        break
      }

      case "rombo": {
        const puntos = [
          [x + ancho / 2, y],
          [x + ancho, y + alto / 2],
          [x + ancho / 2, y + alto],
          [x, y + alto / 2],
        ]
          .map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`)
          .join(" ")
        partes.push(
          `<polygon points="${puntos}" fill="none" stroke="currentColor"` +
            ` stroke-width="${TRAZO}" stroke-linejoin="miter"/>`
        )
        break
      }

      case "radio": {
        const cx = x + ancho / 2
        const cy = y + alto / 2
        const destino = {
          arriba: [cx, y],
          abajo: [cx, y + alto],
          izquierda: [x, cy],
          derecha: [x + ancho, cy],
        }[el.hacia]
        partes.push(
          `<line x1="${cx}" y1="${cy}" x2="${destino[0]}" y2="${destino[1]}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}"/>`
        )
        break
      }

      case "cuerda": {
        const cx = x + ancho / 2
        const cy = y + alto / 2
        // A mitad de camino hacia el vértice, el rombo mide la mitad de alto.
        const horizontal = el.hacia === "izquierda" || el.hacia === "derecha"
        const signo = el.hacia === "izquierda" || el.hacia === "arriba" ? -1 : 1
        const [x1, y1, x2, y2] = horizontal
          ? [cx + (signo * ancho) / 4, cy - alto / 4, cx + (signo * ancho) / 4, cy + alto / 4]
          : [cx - ancho / 4, cy + (signo * alto) / 4, cx + ancho / 4, cy + (signo * alto) / 4]
        partes.push(
          `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}"` +
            ` x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}"/>`
        )
        break
      }

      case "aspa-circulo": {
        const cx = x + ancho / 2
        const cy = y + alto / 2
        const r = Math.min(ancho, alto) * 0.21

        partes.push(
          `<line x1="${x}" y1="${y}" x2="${x + ancho}" y2="${y + alto}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}"/>`,
          `<line x1="${x + ancho}" y1="${y}" x2="${x}" y2="${y + alto}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}"/>`
        )

        if (el.banda !== "ninguna") {
          const h = alto * 0.13
          partes.push(
            `<rect x="${x}" y="${(el.banda === "arriba" ? y : y + alto - h).toFixed(1)}"` +
              ` width="${ancho}" height="${h.toFixed(1)}" fill="currentColor"/>`
          )
        }

        // El círculo se apoya en el cruce: centrado, o tangente por arriba o
        // por abajo. Va el último porque en el original tapa las diagonales.
        const desplazamiento = el.circulo === "centro" ? 0 : el.circulo === "arriba" ? -r : r
        partes.push(
          `<circle cx="${cx}" cy="${(cy + desplazamiento).toFixed(1)}"` +
            ` r="${r.toFixed(1)}" fill="currentColor"/>`
        )
        break
      }

      case "silueta-con-simbolo": {
        const m = Math.min(ancho, alto) * 0.08 // aire hasta el marco
        const [i, d, s2, f] = [x + m, x + ancho - m, y + m, y + alto - m]
        const cx = x + ancho / 2

        const contorno =
          el.contorno === "triangulo"
            ? `${cx},${s2} ${i},${f} ${d},${f}`
            : el.contorno === "rectangulo"
              ? `${i},${s2} ${d},${s2} ${d},${f} ${i},${f}`
              : // La casa: dos aguas sobre un cuerpo recto.
                `${cx},${s2} ${d},${s2 + (f - s2) * 0.34} ${d},${f} ${i},${f}` +
                ` ${i},${s2 + (f - s2) * 0.34}`
        partes.push(
          `<polygon points="${contorno}" fill="none" stroke="currentColor"` +
            ` stroke-width="${TRAZO}" stroke-linejoin="miter"/>`
        )

        // El símbolo se apoya en la base del contorno.
        const relleno = pintura(el.simboloRelleno)
        const alto2 = alto * 0.16
        if (el.simbolo === "barra") {
          const w = ancho * (el.contorno === "triangulo" ? 0.42 : 0.26)
          partes.push(
            `<rect x="${(cx - w / 2).toFixed(1)}" y="${(f - alto2).toFixed(1)}"` +
              ` width="${w.toFixed(1)}" height="${alto2.toFixed(1)}" fill="${relleno}"` +
              ` stroke="currentColor" stroke-width="${TRAZO}"/>`
          )
        } else if (el.simbolo === "triangulito") {
          const w = ancho * 0.12
          partes.push(
            `<polygon points="${cx},${(f - alto2 * 1.4).toFixed(1)}` +
              ` ${(cx - w).toFixed(1)},${f.toFixed(1)} ${(cx + w).toFixed(1)},${f.toFixed(1)}"` +
              ` fill="${relleno}" stroke="currentColor" stroke-width="${TRAZO}"/>`
          )
        } else {
          const brazo = ancho * 0.09
          partes.push(
            `<path d="M${cx},${(f - alto2 * 1.7).toFixed(1)} V${f.toFixed(1)}` +
              ` M${(cx - brazo).toFixed(1)},${(f - alto2 * 1.1).toFixed(1)} h${(brazo * 2).toFixed(1)}"` +
              ` stroke="currentColor" stroke-width="${TRAZO}" fill="none"/>`
          )
        }

        // Y el pie, colgando por debajo de la base.
        const p = alto * 0.09
        if (el.pie === "trazo") {
          partes.push(
            `<line x1="${cx}" y1="${f.toFixed(1)}" x2="${cx}" y2="${(f + p).toFixed(1)}"` +
              ` stroke="currentColor" stroke-width="${TRAZO}"/>`
          )
        } else if (el.pie === "patas") {
          partes.push(
            `<polygon points="${cx},${f.toFixed(1)} ${(cx - p).toFixed(1)},${(f + p).toFixed(1)}` +
              ` ${(cx + p).toFixed(1)},${(f + p).toFixed(1)}" fill="none"` +
              ` stroke="currentColor" stroke-width="${TRAZO}"/>`
          )
        } else {
          partes.push(
            `<circle cx="${cx}" cy="${(f + p * 0.55).toFixed(1)}" r="${(p * 0.62).toFixed(1)}"` +
              ` fill="var(--card, #fff)" stroke="currentColor" stroke-width="${TRAZO}"/>`
          )
        }
        break
      }

      case "mastil-figura": {
        const cx = x + ancho / 2
        const r = Math.min(ancho, alto) * 0.17
        const yArriba = y + alto * 0.2
        const yAbajo = y + alto * 0.72
        const aLaDerecha = (lado: string) => (lado === "derecha" ? 1 : -1)

        partes.push(
          `<line x1="${cx}" y1="${y}" x2="${cx}" y2="${y + alto}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}"/>`
        )

        // El semicírculo: media circunferencia pegada al mástil por su lado.
        const barrido = el.semicirculo === "derecha" ? 1 : 0
        partes.push(
          `<path d="M${cx},${(yArriba - r).toFixed(1)} A${r.toFixed(1)},${r.toFixed(1)}` +
            ` 0 0 ${barrido} ${cx},${(yArriba + r).toFixed(1)} Z"` +
            ` fill="${pintura(el.relleno)}" stroke="currentColor" stroke-width="${TRAZO}"/>`
        )

        // El círculo, tangente al mástil por dentro de su lado.
        const cxCirculo = cx + aLaDerecha(el.circulo) * r
        partes.push(
          `<circle cx="${cxCirculo.toFixed(1)}" cy="${yAbajo.toFixed(1)}" r="${r.toFixed(1)}"` +
            ` fill="${pintura(el.circuloRelleno)}" stroke="currentColor" stroke-width="${TRAZO}"/>`
        )

        // El gancho, al otro lado: media vuelta abierta hacia arriba.
        const haciaElGancho = -aLaDerecha(el.circulo)
        partes.push(
          `<path d="M${cx},${yAbajo.toFixed(1)} A${r.toFixed(1)},${r.toFixed(1)} 0 0` +
            ` ${haciaElGancho > 0 ? 0 : 1} ${(cx + haciaElGancho * 2 * r).toFixed(1)},${yAbajo.toFixed(1)}"` +
            ` fill="none" stroke="currentColor" stroke-width="${TRAZO}"/>`
        )
        break
      }

      case "mitad-rellena": {
        const relleno = pintura(el.relleno)
        const [d, f] = [x + ancho, y + alto] // derecha, fondo
        const zona =
          el.corte === "vertical"
            ? el.lado === "izquierda"
              ? `${x},${y} ${x + ancho / 2},${y} ${x + ancho / 2},${f} ${x},${f}`
              : `${x + ancho / 2},${y} ${d},${y} ${d},${f} ${x + ancho / 2},${f}`
            : el.corte === "horizontal"
              ? el.lado === "arriba"
                ? `${x},${y} ${d},${y} ${d},${y + alto / 2} ${x},${y + alto / 2}`
                : `${x},${y + alto / 2} ${d},${y + alto / 2} ${d},${f} ${x},${f}`
              : el.lado === "arriba"
                ? `${x},${y} ${d},${y} ${x},${f}`
                : `${d},${y} ${d},${f} ${x},${f}`

        // El corte se dibuja siempre, aunque la mitad quede en blanco: es la
        // línea que parte la casilla, no el borde del relleno.
        const linea =
          el.corte === "vertical"
            ? `M${x + ancho / 2},${y} V${f}`
            : el.corte === "horizontal"
              ? `M${x},${y + alto / 2} H${d}`
              : `M${x},${f} L${d},${y}`

        partes.push(
          `<polygon points="${zona}" fill="${relleno}" stroke="none"/>`,
          `<path d="${linea}" stroke="currentColor" stroke-width="${TRAZO}" fill="none"/>`
        )
        break
      }

      case "casco": {
        const F = (u: number) => x + ancho * u
        const G = (v: number) => y + alto * v
        const xi = F(0.03), xd = F(0.97), b0 = F(0.17), b1 = F(0.83)
        const arr = G(0.385), abj = G(0.74), med = G(0.5625)
        const borde = ` stroke="currentColor" stroke-width="${TRAZO}"`
        const P = (...ps: number[][]) => ps.map(([a, c]) => `${a.toFixed(1)},${c.toFixed(1)}`).join(" ")

        // Cuerpo y sus rayas.
        partes.push(
          `<rect x="${b0.toFixed(1)}" y="${arr.toFixed(1)}" width="${(b1 - b0).toFixed(1)}"` +
            ` height="${(abj - arr).toFixed(1)}" fill="${pintura(el.cuerpo)}"${borde}/>`
        )
        const rayas = el.particion === "cuatro-columnas" ? 3 : el.particion === "cuatro-cuadros" ? 1 : 0
        for (let k = 1; k <= rayas; k++) {
          const px = (b0 + ((b1 - b0) * k) / (rayas + 1)).toFixed(1)
          partes.push(`<line x1="${px}" y1="${arr}" x2="${px}" y2="${abj}"${borde}/>`)
        }
        if (el.particion === "cuatro-cuadros") {
          const py = ((arr + abj) / 2).toFixed(1)
          partes.push(`<line x1="${b0.toFixed(1)}" y1="${py}" x2="${b1.toFixed(1)}" y2="${py}"${borde}/>`)
        }

        // Las dos puntas, cada una en dos mitades para poder teñir solo una.
        const punta = (
          base: number,
          vertice: number,
          cual: "blanca" | "arriba" | "abajo" | "negra"
        ) => {
          const relleno = (mitad: "arriba" | "abajo") =>
            cual === "negra" || cual === mitad ? "currentColor" : "var(--card, #fff)"
          partes.push(
            `<polygon points="${P([base, arr], [base, med], [vertice, med])}"` +
              ` fill="${relleno("arriba")}"${borde}/>`,
            `<polygon points="${P([base, med], [base, abj], [vertice, med])}"` +
              ` fill="${relleno("abajo")}"${borde}/>`
          )
        }
        punta(b0, xi, el.puntaIzquierda)
        punta(b1, xd, el.puntaDerecha)

        // El remate, encima del cuerpo.
        if (el.remate === "torre") {
          partes.push(
            `<rect x="${F(0.455).toFixed(1)}" y="${G(0.135).toFixed(1)}"` +
              ` width="${(ancho * 0.09).toFixed(1)}" height="${(arr - G(0.135)).toFixed(1)}"` +
              ` fill="${pintura(el.remateRelleno)}"${borde}/>`
          )
        } else if (el.remate === "triangulo") {
          partes.push(
            `<polygon points="${P([F(0.5), G(0.07)], [F(0.58), arr], [F(0.42), arr])}"` +
              ` fill="${pintura(el.remateRelleno)}"${borde}/>`
          )
        } else {
          partes.push(
            `<rect x="${F(0.25).toFixed(1)}" y="${G(0.265).toFixed(1)}"` +
              ` width="${(ancho * 0.5).toFixed(1)}" height="${(arr - G(0.265)).toFixed(1)}"` +
              ` fill="${pintura(el.remateRelleno)}"${borde}/>`
          )
        }

        // La sombra va la última: en la alternativa E la punta del monte se ve
        // por dentro del remate, como en el cuadernillo.
        if (el.sombra === "media-diagonal") {
          partes.push(
            `<polygon points="${P([b0, abj], [b1, abj], [b1, arr])}" fill="currentColor"/>`
          )
        } else if (el.sombra === "monte") {
          partes.push(
            `<polygon points="${P([b0, abj], [F(0.5), G(0.16)], [b1, abj])}" fill="currentColor"/>`
          )
        }
        break
      }

      case "diagonal-cuadrante":
      case "cuadrante-tenido": {
        const qa = ancho / 2
        const qb = alto / 2
        const qx = x + (el.cuadrante % 2) * qa
        const qy = y + Math.floor(el.cuadrante / 2) * qb
        if (el.tipo === "diagonal-cuadrante") {
          partes.push(
            `<line x1="${qx}" y1="${qy + qb}" x2="${qx + qa}" y2="${qy}"` +
              ` stroke="currentColor" stroke-width="${TRAZO}"/>`
          )
          break
        }
        // Medio trazo hacia dentro por arriba y por la izquierda: el relleno
        // muere contra el marco y contra la cruz, y si se pintara justo encima
        // se las comería.
        const d = TRAZO / 2
        partes.push(
          `<polygon points="${qx + d},${qy + d} ${qx + qa},${qy + d} ${qx + d},${qy + qb}"` +
            ` fill="${pintura(el.relleno)}" stroke="none"/>`
        )
        break
      }

      case "marca-colgada": {
        const cy = y + alto * 0.25
        const r = ancho * 0.055
        const cx = x + ancho * (el.lado === "izquierda" ? 0.28 : 0.72)
        const [x1, x2] =
          el.lado === "izquierda"
            ? [cx + r, x + ancho * 0.56]
            : [x + ancho * 0.44, cx - r]
        partes.push(
          `<line x1="${x1.toFixed(1)}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${cy}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}"/>`,
          el.forma === "circulo"
            ? `<circle cx="${cx.toFixed(1)}" cy="${cy}" r="${r.toFixed(1)}"` +
              ` fill="var(--card, #fff)" stroke="currentColor" stroke-width="${TRAZO}"/>`
            : `<rect x="${(cx - r).toFixed(1)}" y="${(cy - r).toFixed(1)}"` +
              ` width="${(r * 2).toFixed(1)}" height="${(r * 2).toFixed(1)}"` +
              ` fill="var(--card, #fff)" stroke="currentColor" stroke-width="${TRAZO}"/>`
        )
        break
      }

      case "diagonal": {
        const [x1, y1, x2, y2] =
          el.sentido === "subiendo"
            ? [x, y + alto, x + ancho, y]
            : el.sentido === "bajando"
              ? [x, y, x + ancho, y + alto]
              : [x, y + alto, x + ancho, y + alto / 2]
        partes.push(
          `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}"/>`
        )
        break
      }

      case "puntos": {
        // Sitios fijos dentro del triángulo de arriba a la izquierda. Para el
        // de abajo se giran media vuelta, que es lo que hace el cuadernillo.
        const EN_TRIANGULO = [
          [0.16, 0.16], [0.52, 0.14], [0.3, 0.4], [0.14, 0.58], [0.44, 0.3],
          [0.16, 0.36], [0.34, 0.16],
        ]
        const POR_TODA = [
          [0.3, 0.14], [0.14, 0.34], [0.62, 0.3], [0.42, 0.46], [0.24, 0.7],
          [0.5, 0.76], [0.74, 0.72],
        ]
        const r = ancho * 0.037
        for (let k = 0; k < Math.min(el.cuantos, 7); k++) {
          const [u, v] =
            el.lado === "ninguno" ? POR_TODA[k] : EN_TRIANGULO[k]
          const [uu, vv] = el.lado === "abajo" ? [1 - u, 1 - v] : [u, v]
          partes.push(
            `<circle cx="${(x + ancho * uu).toFixed(1)}" cy="${(y + alto * vv).toFixed(1)}"` +
              ` r="${r.toFixed(1)}" fill="currentColor"/>`
          )
        }
        break
      }

      case "remate": {
        if (el.forma === "ninguno") break
        const P = (u: number, v: number) =>
          `${(x + ancho * u).toFixed(1)},${(y + alto * v).toFixed(1)}`
        const trazo = ` fill="none" stroke="currentColor" stroke-width="${TRAZO}"`
        if (el.forma === "escuadra") {
          // Un cuadrito con su diagonal, que va al revés que la grande.
          const [u0, v0, u1, v1] =
            el.lado === "arriba"
              ? [0.22, 0.0, 0.4, 0.58]
              : el.lado === "centro"
                ? [0.42, 0.28, 0.6, 0.72]
                : [0.6, 0.42, 0.78, 1.0]
          partes.push(
            `<path d="M${P(u0, v0)} L${P(u1, v0)} L${P(u1, v1)} L${P(u0, v1)} Z` +
              ` M${P(u0, v0)} L${P(u1, v1)}"${trazo}/>`
          )
        } else {
          // El corchete: la esquina, el brazo a la derecha y la pata.
          const [u, v, uBrazo, vPata] =
            el.lado === "arriba" ? [0.28, 0.06, 0.5, 0.5] : [0.58, 0.42, 0.8, 1.0]
          partes.push(`<path d="M${P(uBrazo, v)} L${P(u, v)} L${P(u, vPata)}"${trazo}/>`)
        }
        break
      }

      case "cuadro-lobulos": {
        const mx = x + ancho / 2
        const borde = ` stroke="currentColor" stroke-width="${TRAZO}"`
        // El lomo y los lóbulos mueren en los bordes del recuadro, así que se
        // meten medio trazo hacia dentro: si se dibujaran justo encima, su
        // relleno se comería la raya del marco y el recuadro saldría roto por
        // los cuatro sitios donde lo tocan.
        const izq = x + TRAZO / 2
        const der = x + ancho - TRAZO / 2
        const arr = y + TRAZO / 2
        const abj = y + alto - TRAZO / 2
        const medio = y + alto / 2
        const r = (abj - arr) / 2 // el redondeo del lomo: media casilla de alto
        const rl = (abj - arr) / 4 // el de cada lóbulo, que son dos en la misma altura

        // El lomo: recto desde la raya del medio y redondeado al llegar al
        // borde izquierdo, que es donde muere.
        partes.push(
          `<path d="M${mx},${arr} H${(izq + r).toFixed(1)} A${r.toFixed(1)},${r.toFixed(1)} 0 0 0` +
            ` ${(izq + r).toFixed(1)},${abj} H${mx} Z" fill="${pintura(el.lomo)}"${borde}/>`
        )

        // Los dos lóbulos de la derecha, uno encima del otro. El de arriba
        // siempre blanco: es el que lleva la letra.
        const lobulo = (arriba: boolean, relleno: Relleno) => {
          const y0 = arriba ? arr : medio
          const y1 = arriba ? medio : abj
          return (
            `<path d="M${mx},${y0} H${(der - rl).toFixed(1)} A${rl.toFixed(1)},${rl.toFixed(1)} 0 0 1` +
            ` ${(der - rl).toFixed(1)},${y1} H${mx} Z" fill="${pintura(relleno)}"${borde}/>`
          )
        }
        partes.push(lobulo(true, "blanco"), lobulo(false, el.lobulo))

        // La raya del medio, encima de los rellenos para que no se la coman.
        partes.push(`<line x1="${mx}" y1="${arr}" x2="${mx}" y2="${abj}"${borde}/>`)

        if (el.letra !== "ninguna") {
          partes.push(
            `<text x="${((mx + der - rl) / 2).toFixed(1)}" y="${(y + alto * 0.27).toFixed(1)}"` +
              ` font-family="Georgia, 'Times New Roman', serif" font-size="${(alto * 0.34).toFixed(1)}"` +
              ` text-anchor="middle" dominant-baseline="central" fill="currentColor">${el.letra}</text>`
          )
        }

        // El tallo cuelga por debajo del recuadro: el lienzo le reserva sitio
        // en `colaDe`, y sin esa reserva saldría cortado.
        const finTallo = y + alto + COLA * 0.62
        partes.push(`<line x1="${mx}" y1="${y + alto}" x2="${mx}" y2="${finTallo}"${borde}/>`)
        if (el.barra) {
          const media = ancho * 0.085
          partes.push(
            `<line x1="${mx - media}" y1="${finTallo}" x2="${mx + media}" y2="${finTallo}"${borde}/>`
          )
        }
        break
      }

      case "grupo-simbolos": {
        if (el.simbolo === "linea") {
          // Las líneas cruzan la casilla de lado a lado y se reparten a
          // intervalos iguales: con `n` líneas quedan `n + 1` franjas.
          for (let k = 1; k <= el.cantidad; k++) {
            const t = k / (el.cantidad + 1)
            if (el.orientacion === "vertical") {
              const px = (x + ancho * t).toFixed(1)
              partes.push(
                `<line x1="${px}" y1="${y}" x2="${px}" y2="${y + alto}"` +
                  ` stroke="currentColor" stroke-width="${TRAZO}"/>`
              )
            } else if (el.orientacion === "horizontal") {
              const py = (y + alto * t).toFixed(1)
              partes.push(
                `<line x1="${x}" y1="${py}" x2="${x + ancho}" y2="${py}"` +
                  ` stroke="currentColor" stroke-width="${TRAZO}"/>`
              )
            } else {
              // Diagonales «/»: todas cumplen x + y = c. Los extremos se
              // calculan recortados contra los cuatro lados en vez de dibujar
              // la recta entera y taparla, que deja el trazo asomando en los
              // navegadores que no recortan igual.
              const c = x + y + (ancho + alto) * t
              const ax = Math.max(x, c - (y + alto))
              const bx = Math.min(x + ancho, c - y)
              partes.push(
                `<line x1="${ax.toFixed(1)}" y1="${(c - ax).toFixed(1)}"` +
                  ` x2="${bx.toFixed(1)}" y2="${(c - bx).toFixed(1)}"` +
                  ` stroke="currentColor" stroke-width="${TRAZO}"/>`
              )
            }
          }
          break
        }

        // Asteriscos y vigas se reparten en una retícula centrada en su franja,
        // hasta tres por fila.
        const franja = franjaDe(el)
        // Lo más cuadrado que quepa: tres van en fila, cuatro en dos por dos,
        // cinco en tres y dos. Es como los reparte el cuadernillo.
        const porFila = Math.ceil(Math.sqrt(el.cantidad))
        const filas = Math.ceil(el.cantidad / porFila)
        const paso = Math.min(franja.ancho / (porFila + 1), alto / (filas + 1))
        const r = paso * 0.32
        let puestos = 0
        for (let f = 0; f < filas; f++) {
          const enEsta = Math.min(porFila, el.cantidad - puestos)
          for (let k = 0; k < enEsta; k++) {
            const cx = franja.x + franja.ancho / 2 + (k - (enEsta - 1) / 2) * paso
            const cy = y + alto / 2 + (f - (filas - 1) / 2) * paso
            if (el.simbolo === "asterisco") {
              // Tres trazos cruzados de punta redonda: es lo que el ojo lee
              // como asterisco sin dibujar seis pétalos.
              for (const grados of [0, 60, 120]) {
                partes.push(
                  `<line x1="${(cx - r).toFixed(1)}" y1="${cy.toFixed(1)}"` +
                    ` x2="${(cx + r).toFixed(1)}" y2="${cy.toFixed(1)}"` +
                    ` transform="rotate(${grados} ${cx.toFixed(1)} ${cy.toFixed(1)})"` +
                    ` stroke="currentColor" stroke-width="${(r * 0.44).toFixed(1)}"` +
                    ` stroke-linecap="round"/>`
                )
              }
            } else {
              // La viga: el palo, su remate arriba y las dos patas abiertas.
              partes.push(
                `<path d="M${(cx - r * 0.85).toFixed(1)},${(cy - r).toFixed(1)} h${(r * 1.7).toFixed(1)}` +
                  ` M${cx.toFixed(1)},${(cy - r).toFixed(1)} V${(cy + r * 0.5).toFixed(1)}` +
                  ` M${(cx - r * 0.9).toFixed(1)},${(cy + r).toFixed(1)} L${cx.toFixed(1)},${(cy + r * 0.5).toFixed(1)}` +
                  ` L${(cx + r * 0.9).toFixed(1)},${(cy + r).toFixed(1)}"` +
                  ` stroke="currentColor" stroke-width="${TRAZO}" fill="none"` +
                  ` stroke-linecap="round" stroke-linejoin="round"/>`
              )
            }
            puestos++
          }
        }
        break
      }

      case "pieza-punta": {
        const largo = Math.min(ancho, alto) * 0.62 // el lado largo de la barra
        const grueso = Math.min(ancho, alto) * 0.3
        const punta = Math.min(ancho, alto) * 0.22
        const cx = x + ancho / 2
        const cy = y + alto / 2
        const vertical = el.mira === "izquierda" || el.mira === "derecha"
        // La barra va perpendicular a la punta.
        const bw = vertical ? grueso : largo
        const bh = vertical ? largo : grueso
        const bx = cx - bw / 2
        const by = cy - bh / 2
        const relleno = pintura(el.relleno)

        // El triángulo cuelga del lado al que mira, con la base pegada a la
        // barra y algo más estrecha que ella: así se lee como una punta y no
        // como un tejado.
        const base = (vertical ? bh : bw) * 0.72
        const [ax, ay] =
          el.mira === "arriba"
            ? [cx, by - punta]
            : el.mira === "abajo"
              ? [cx, by + bh + punta]
              : el.mira === "izquierda"
                ? [bx - punta, cy]
                : [bx + bw + punta, cy]
        const [e1, e2] = vertical
          ? [
              [el.mira === "izquierda" ? bx : bx + bw, cy - base / 2],
              [el.mira === "izquierda" ? bx : bx + bw, cy + base / 2],
            ]
          : [
              [cx - base / 2, el.mira === "arriba" ? by : by + bh],
              [cx + base / 2, el.mira === "arriba" ? by : by + bh],
            ]

        partes.push(
          `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}"` +
            ` height="${bh.toFixed(1)}" fill="${relleno}" stroke="currentColor"` +
            ` stroke-width="${TRAZO}"/>`,
          `<polygon points="${ax.toFixed(1)},${ay.toFixed(1)} ${e1[0].toFixed(1)},${e1[1].toFixed(1)}` +
            ` ${e2[0].toFixed(1)},${e2[1].toFixed(1)}" fill="${relleno}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}" stroke-linejoin="miter"/>`
        )
        break
      }

      case "cuadro-marcado": {
        const lado = Math.min(ancho, alto) * 0.55
        const ix = x + (ancho - lado) / 2
        const iy = y + (alto - lado) / 2
        // El medio de cada lado del cuadrado, y hacia dónde sale de él.
        const medios: Record<Sentido, [number, number]> = {
          arriba: [ix + lado / 2, iy],
          abajo: [ix + lado / 2, iy + lado],
          izquierda: [ix, iy + lado / 2],
          derecha: [ix + lado, iy + lado / 2],
        }
        const fuera: Record<Sentido, [number, number]> = {
          arriba: [0, -1],
          abajo: [0, 1],
          izquierda: [-1, 0],
          derecha: [1, 0],
        }
        // Las dos esquinas del lado opuesto, que es de donde cuelgan siempre.
        const opuesto: Record<Sentido, Sentido> = {
          arriba: "abajo",
          abajo: "arriba",
          izquierda: "derecha",
          derecha: "izquierda",
        }
        const esquinasDe: Record<Sentido, [number, number][]> = {
          arriba: [[ix, iy], [ix + lado, iy]],
          abajo: [[ix, iy + lado], [ix + lado, iy + lado]],
          izquierda: [[ix, iy], [ix, iy + lado]],
          derecha: [[ix + lado, iy], [ix + lado, iy + lado]],
        }

        partes.push(
          `<rect x="${ix.toFixed(1)}" y="${iy.toFixed(1)}" width="${lado.toFixed(1)}"` +
            ` height="${lado.toFixed(1)}" fill="none" stroke="currentColor"` +
            ` stroke-width="${TRAZO}"/>`
        )

        const [mx, my] = medios[el.mira]
        const [dx, dy] = fuera[el.mira]
        const radio = 6.5

        if (el.rabo) {
          // Muere en el borde de la casilla, como en el original: el rabo dice
          // hacia dónde mira la figura, y para eso tiene que llegar al marco.
          const borde: Record<Sentido, [number, number]> = {
            arriba: [mx, y],
            abajo: [mx, y + alto],
            izquierda: [x, my],
            derecha: [x + ancho, my],
          }
          partes.push(
            `<line x1="${(mx + dx * radio).toFixed(1)}" y1="${(my + dy * radio).toFixed(1)}"` +
              ` x2="${borde[el.mira][0].toFixed(1)}" y2="${borde[el.mira][1].toFixed(1)}"` +
              ` stroke="currentColor" stroke-width="${TRAZO}"/>`
          )
        }

        if (el.marcadores !== "ninguno") {
          const salida = Math.min(ancho, alto) * 0.13
          for (const [ex, ey] of esquinasDe[opuesto[el.mira]]) {
            const px = ex - dx * salida
            const py = ey - dy * salida
            partes.push(
              `<line x1="${ex.toFixed(1)}" y1="${ey.toFixed(1)}"` +
                ` x2="${px.toFixed(1)}" y2="${py.toFixed(1)}"` +
                ` stroke="currentColor" stroke-width="${TRAZO}"/>`,
              el.marcadores === "circulo"
                ? `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="5.5" fill="currentColor"/>`
                : `<rect x="${(px - 5.5).toFixed(1)}" y="${(py - 5.5).toFixed(1)}" width="11"` +
                  ` height="11" stroke="currentColor" stroke-width="${TRAZO}"` +
                  ` fill="${el.marcadores === "cuadrado" ? "currentColor" : "var(--card, #fff)"}"/>`
            )
          }
        }

        // El nudo va el último: se dibuja encima del cuadrado y del rabo, que
        // es como se ve en el original.
        partes.push(
          el.nudo === "circunferencia"
            ? `<circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="${radio}"` +
              ` fill="var(--card, #fff)" stroke="currentColor" stroke-width="${TRAZO}"/>`
            : `<rect x="${(mx - radio).toFixed(1)}" y="${(my - radio).toFixed(1)}"` +
              ` width="${radio * 2}" height="${radio * 2}" fill="currentColor"/>`
        )
        break
      }

      case "diagonales": {
        partes.push(
          `<line x1="${x}" y1="${y}" x2="${x + ancho}" y2="${y + alto}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}"/>`,
          `<line x1="${x + ancho}" y1="${y}" x2="${x}" y2="${y + alto}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}"/>`
        )
        break
      }

      case "trazo-esquina": {
        // Muere en la esquina y entra en diagonal suave hacia el interior.
        const [ex, ey] = puntoEsquina(el.esquina, x, y, ancho, alto)
        const haciaDerecha = el.esquina.endsWith("izquierda") ? 1 : -1
        const haciaAbajo = el.esquina.startsWith("superior") ? 1 : -1
        partes.push(
          `<line x1="${ex}" y1="${ey}"` +
            ` x2="${(ex + haciaDerecha * ancho * 0.3).toFixed(1)}"` +
            ` y2="${(ey + haciaAbajo * alto * 0.26).toFixed(1)}"` +
            ` stroke="currentColor" stroke-width="${TRAZO}" stroke-linecap="round"/>`
        )
        break
      }
    }
  }

  return partes.join("")
}

// ────────────────────────────────────────────────────────────────────────────
// Lienzos

/** Envoltura común: el lienzo, la marca y el trazo que hereda del tema. */
function lienzo(ancho: number, alto: number, contenido: string, conMarca: boolean): string {
  const usadas = Object.entries(TRAMAS)
    .filter(([nombre]) => contenido.includes(`url(#psico-${nombre})`))
    .map(([, def]) => def)
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ancho} ${alto}"`,
    ` width="${ancho}" height="${alto}" role="img" focusable="false"`,
    ` style="max-width:100%;height:auto;color:inherit">`,
    usadas.length > 0 ? `<defs>${usadas.join("")}</defs>` : "",
    contenido,
    conMarca ? marca(ancho) : "",
    `</svg>`,
  ].join("")
}

/** El interrogante de la casilla que falta, centrado en el hueco. */
function interrogante(x: number, y: number, ancho: number, alto: number): string {
  return (
    `<text x="${x + ancho / 2}" y="${y + alto / 2}" fill="currentColor"` +
    ` text-anchor="middle" dominant-baseline="central"` +
    ` font-size="${Math.round(Math.min(ancho, alto) * 0.5)}" font-weight="700"` +
    ` font-family="Archivo, system-ui, sans-serif">?</text>`
  )
}

/**
 * La serie del enunciado: las casillas en línea dentro de un solo contorno.
 *
 * La incógnita se dibuja como el interrogante del original. Podría ser un
 * hueco vacío, pero el interrogante es lo que el candidato ha visto en todos
 * los cuadernillos y lo que va a ver en la prueba.
 */
function svgSerie(figura: FiguraSerie): string {
  const n = figura.celdas.length
  const ancho = CELDA * n + MARCO
  // El lienzo crece por arriba lo que ocupa la marca, en vez de encogerle
  // sitio al dibujo.
  const desplazamientoY = MARCA_RESERVA
  const alto = CELDA + MARCO + desplazamientoY

  const partes: string[] = [`<g transform="translate(0 ${desplazamientoY})">`]

  partes.push(
    `<rect x="${MARCO / 2}" y="${MARCO / 2}" width="${CELDA * n}" height="${CELDA}"` +
      ` fill="none" stroke="currentColor" stroke-width="${MARCO}"/>`
  )

  const margen = (CELDA - REJILLA) / 2
  figura.celdas.forEach((casilla, i) => {
    const x = MARCO / 2 + CELDA * i
    if (i > 0) {
      partes.push(
        `<line x1="${x}" y1="${MARCO / 2}" x2="${x}" y2="${MARCO / 2 + CELDA}"` +
          ` stroke="currentColor" stroke-width="${MARCO}"/>`
      )
    }
    if (esIncognita(casilla)) {
      partes.push(interrogante(x, MARCO / 2, CELDA, CELDA))
    } else {
      partes.push(dibujarCelda(casilla, x + margen, MARCO / 2 + margen, REJILLA, REJILLA))
    }
  })

  partes.push(`</g>`)
  return lienzo(ancho, alto, partes.join(""), true)
}

// Medidas de la matriz del A1: la casilla es apaisada, como en el cuadernillo.
const MATRIZ_ANCHO = 132
const MATRIZ_ALTO = 96
const MATRIZ_HUECO = 18

/**
 * Lo que hay que dejar por debajo de la casilla cuando algo cuelga de ella.
 *
 * Solo lo pide el ejercicio 11, y solo se añade a las figuras que lo usan: si
 * se sumara siempre, las noventa y ocho restantes cambiarían de proporción sin
 * ganar nada.
 */
const COLA = 15

const colaDe = (figura: Figura): number =>
  [...figura.celdas, ...figura.opciones].some(
    (c) => !esIncognita(c) && c.elementos.some((el) => el.tipo === "cuadro-lobulos")
  )
    ? COLA
    : 0

/**
 * La matriz de tres por tres, con sus casillas sueltas.
 *
 * A diferencia de la serie, aquí cada casilla lleva su propio recuadro y entre
 * ellas hay aire: es lo que deja leer la matriz por filas y por columnas, que
 * es como se resuelve.
 */
function svgMatriz(figura: FiguraMatriz): string {
  const paso = { x: MATRIZ_ANCHO + MATRIZ_HUECO, y: MATRIZ_ALTO + MATRIZ_HUECO }
  const ancho = MATRIZ_ANCHO * 3 + MATRIZ_HUECO * 2 + TRAZO
  const desplazamientoY = MARCA_RESERVA
  const alto = MATRIZ_ALTO * 3 + MATRIZ_HUECO * 2 + TRAZO + desplazamientoY + colaDe(figura)

  const partes: string[] = [`<g transform="translate(${TRAZO / 2} ${desplazamientoY + TRAZO / 2})">`]

  figura.celdas.forEach((casilla, i) => {
    const x = (i % 3) * paso.x
    const y = Math.floor(i / 3) * paso.y
    if (esIncognita(casilla)) {
      partes.push(
        `<rect x="${x}" y="${y}" width="${MATRIZ_ANCHO}" height="${MATRIZ_ALTO}"` +
          ` fill="none" stroke="currentColor" stroke-width="${TRAZO}"/>`,
        interrogante(x, y, MATRIZ_ANCHO, MATRIZ_ALTO)
      )
    } else {
      partes.push(dibujarCelda(casilla, x, y, MATRIZ_ANCHO, MATRIZ_ALTO))
    }
  })

  partes.push(`</g>`)
  return lienzo(ancho, alto, partes.join(""), true)
}

/** El enunciado de la figura, sea la serie del A2 o la matriz del A1. */
export function svgEnunciado(figura: Figura): string {
  return figura.tipo === "serie-lineal" ? svgSerie(figura) : svgMatriz(figura)
}

/**
 * Una alternativa, en su propio lienzo y por tanto en su propio botón.
 *
 * Se dibuja con la misma geometría que las casillas del enunciado —la figura
 * manda las proporciones— porque comparar una alternativa con la serie es todo
 * el ejercicio: si la alternativa saliera más ancha o más estrecha, el
 * ejercicio cambiaría.
 *
 * Sin marca: la marca identifica el ejercicio, y repetirla en cada alternativa
 * la convertiría en ruido justo al lado de lo que hay que comparar.
 */
export function svgOpcion(figura: Figura, indice: number): string {
  const celda = figura.opciones[indice]
  if (figura.tipo === "matriz-3x3") {
    const ancho = MATRIZ_ANCHO + TRAZO
    const alto = MATRIZ_ALTO + TRAZO + colaDe(figura)
    return lienzo(
      ancho,
      alto,
      `<g transform="translate(${TRAZO / 2} ${TRAZO / 2})">` +
        dibujarCelda(celda, 0, 0, MATRIZ_ANCHO, MATRIZ_ALTO) +
        `</g>`,
      false
    )
  }
  const margen = (OPCION - REJILLA) / 2
  return lienzo(
    OPCION,
    OPCION,
    dibujarCelda(celda, margen, margen, REJILLA, REJILLA),
    false
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Lectura en voz alta
//
// La figura dibujada tiene que decir lo mismo que decía el `imagenAlt` del
// recorte, y ahora puede decirlo sola: la descripción está en los atributos.

const NOMBRE_CUADRANTE: Record<Cuadrante, string> = {
  0: "arriba a la izquierda",
  1: "arriba a la derecha",
  2: "abajo a la izquierda",
  3: "abajo a la derecha",
}

const NOMBRE_ESQUINA: Record<Esquina, string> = {
  "inferior-izquierda": "la esquina inferior izquierda",
  "inferior-derecha": "la esquina inferior derecha",
  "superior-izquierda": "la esquina superior izquierda",
  "superior-derecha": "la esquina superior derecha",
}

export function describirCelda(celda: Celda): string {
  if (celda.elementos.length === 0) return "casilla vacía"
  return celda.elementos
    .map((el) => {
      switch (el.tipo) {
        case "flecha":
          return `flecha hacia ${el.sentido} ${NOMBRE_CUADRANTE[el.cuadrante]}`
        case "triangulo":
          return `triángulo con el vértice ${el.apice}`
        case "mastil":
          return "segmento vertical desde el vértice"
        case "trazo-esquina":
          return `trazo corto en ${NOMBRE_ESQUINA[el.esquina]}`
        case "rombo":
          return "rombo inscrito"
        case "radio":
          return `brazo desde el centro hacia ${el.hacia}`
        case "diagonales":
          return "las dos diagonales del rectángulo"
        case "cuerda":
          return `cuerda del rombo hacia ${el.hacia}`
        case "aspa-circulo":
          return (
            `aspa con el círculo negro ${el.circulo === "centro" ? "en el cruce" : el.circulo}` +
            (el.banda === "ninguna" ? " y sin banda" : ` y una banda negra ${el.banda}`)
          )
        case "silueta-con-simbolo":
          return `contorno de ${el.contorno} con ${el.simbolo} ${el.simboloRelleno} y pie de ${el.pie}`
        case "mastil-figura":
          return (
            `mástil con un semicírculo ${el.relleno} a la ${el.semicirculo} arriba, ` +
            `un círculo ${el.circuloRelleno} a la ${el.circulo} abajo y el gancho al otro lado`
          )
        case "mitad-rellena":
          return `rectángulo partido en ${el.corte}, con la mitad de ${el.lado} en ${el.relleno}`
        case "casco":
          return (
            `un casco con el cuerpo ${el.cuerpo}` +
            (el.particion === "ninguna" ? "" : ` partido en ${el.particion}`) +
            `, la punta izquierda ${el.puntaIzquierda} y la derecha ${el.puntaDerecha}` +
            `, rematado por un ${el.remate} ${el.remateRelleno}` +
            (el.sombra === "ninguna" ? "" : ` y una sombra en ${el.sombra}`)
          )
        case "diagonal":
          return `una diagonal ${el.sentido}`
        case "diagonal-cuadrante":
          return `una diagonal en el cuadrante de ${NOMBRE_CUADRANTE[el.cuadrante]}`
        case "cuadrante-tenido":
          return `el cuadrante de ${NOMBRE_CUADRANTE[el.cuadrante]} teñido de ${el.relleno}`
        case "marca-colgada":
          return `un ${el.forma} colgado a la ${el.lado}`
        case "puntos":
          return el.cuantos === 0
            ? "sin puntos"
            : `${el.cuantos} puntos ${el.lado === "ninguno" ? "por toda la casilla" : el.lado}`
        case "remate":
          return el.forma === "ninguno" ? "sin remate" : `una ${el.forma} ${el.lado}`
        case "cuadro-lobulos":
          return (
            `cuadro con el lomo ${el.lomo} a la izquierda, ` +
            (el.letra === "ninguna" ? "sin letra" : `la letra ${el.letra}`) +
            ` y el lóbulo de abajo ${el.lobulo}${el.barra ? ", con barra debajo" : ""}`
          )
        case "grupo-simbolos":
          return el.simbolo === "linea"
            ? `${el.cantidad} líneas ${el.orientacion}es`
            : `${el.cantidad} ${el.simbolo === "asterisco" ? "asteriscos" : "vigas"}`
        case "pieza-punta":
          return `pieza con la punta hacia ${el.mira}, con relleno ${el.relleno}`
        case "cuadro-marcado":
          return (
            `cuadrado con ${el.nudo === "circunferencia" ? "una circunferencia" : "un cuadrado negro"}` +
            ` mirando ${el.mira}${el.rabo ? ", con rabo" : ", sin rabo"}` +
            (el.marcadores === "ninguno"
              ? " y sin marcadores"
              : ` y dos marcadores de tipo ${el.marcadores} en el lado opuesto`)
          )
      }
    })
    .join("; ")
}

export function describirFigura(figura: Figura): string {
  const casillas = figura.celdas.map((c, i) =>
    esIncognita(c) ? `casilla ${i + 1}: la que falta` : `casilla ${i + 1}: ${describirCelda(c)}`
  )
  const cabecera =
    figura.tipo === "matriz-3x3"
      ? "Matriz de tres por tres"
      : `Serie de ${figura.celdas.length} casillas`
  return `${cabecera}. ${casillas.join(". ")}.`
}
