/**
 * Las etiquetas de la Parte 5 de las Instrucciones Técnicas: de riesgo y de
 * manipulación. Son las mismas en todo el mundo, y por eso se reconocen sin
 * leer el idioma. El texto de la especificación de cada una (símbolo, fondo,
 * franjas) se toma de su transcripción en el Apéndice 1 del RAC 175.
 *
 * La especificación de cada una es la que consta en el texto del Apéndice
 * (símbolo, fondo, franjas, dimensiones). Donde el Apéndice presenta la
 * etiqueta solo mediante la figura, sin describir colores en el texto, la ficha
 * lo dice y queda marcada `pend`: no se inventan colores.
 *
 * `imagen` es el rombo que ya tiene el módulo (public/infografias/mercancias).
 * Las que no lo tienen muestran el hueco con su identificador y su medida, que
 * es la lista de trabajo para producirlas.
 */

export type GrupoEtiqueta = "riesgo" | "manipulacion"

export interface EtiquetaMP {
  /** Identificador estable del recurso gráfico: "MP-ETQ-01". */
  id: string
  nombre: string
  /** "Clase 1 · Div. 1.1, 1.2 y 1.3", "División 2.1", "Manipulación". */
  clase: string
  grupo: GrupoEtiqueta
  /** La especificación textual del Apéndice 1. */
  spec: string
  /** Rombo existente, por id de archivo (ver `rombo()` en mercanciasClases). */
  imagen?: string
  /** El Apéndice no describe sus colores en el texto: verificar contra el original. */
  pend?: boolean
  /** Advertencia que va con la etiqueta, si la hay. */
  alerta?: string
}

export const ETIQUETAS: EtiquetaMP[] = [
  // ── Etiquetas de riesgo ──────────────────────────────────
  {
    id: "MP-ETQ-01",
    nombre: "Explosivo",
    clase: "Clase 1 · Div. 1.1, 1.2 y 1.3",
    grupo: "riesgo",
    spec: "Símbolo (bomba haciendo explosión) en negro. Fondo anaranjado. Se inserta la división y el grupo de compatibilidad.",
    imagen: "1-1",
    alerta: "Normalmente, los bultos que llevan esta etiqueta con la marca de la División 1.1 o 1.2 no se pueden transportar por vía aérea.",
  },
  {
    id: "MP-ETQ-02",
    nombre: "Explosivo 1.4",
    clase: "Clase 1 · Div. 1.4",
    grupo: "riesgo",
    spec: "Fondo anaranjado, cifras en negro, de unos 30 mm de altura y 5 mm de espesor en la etiqueta de 100 × 100 mm. Se inserta el grupo de compatibilidad.",
    imagen: "1-4",
  },
  {
    id: "MP-ETQ-03",
    nombre: "Explosivo 1.5 y 1.6",
    clase: "Clase 1 · Div. 1.5 y 1.6",
    grupo: "riesgo",
    spec: "Fondo anaranjado, cifras en negro, mismas dimensiones de numeración que la 1.4.",
    alerta: "Normalmente, los bultos que llevan estas etiquetas no se pueden transportar por vía aérea.",
  },
  {
    id: "MP-ETQ-04",
    nombre: "Gas inflamable",
    clase: "División 2.1",
    grupo: "riesgo",
    spec: "La norma presenta esta etiqueta únicamente mediante la figura, sin describir sus colores en el texto. El rombo que ves es el normalizado: llama sobre fondo rojo.",
    imagen: "2-1",
    pend: true,
  },
  {
    id: "MP-ETQ-05",
    nombre: "Gas no inflamable, no tóxico",
    clase: "División 2.2",
    grupo: "riesgo",
    spec: "Símbolo (botella de gas) en negro o blanco. Fondo verde.",
    imagen: "2-2",
  },
  {
    id: "MP-ETQ-06",
    nombre: "Gas tóxico",
    clase: "División 2.3",
    grupo: "riesgo",
    spec: "Símbolo (calavera y tibias cruzadas) en negro. Fondo blanco.",
    imagen: "2-3",
  },
  {
    id: "MP-ETQ-07",
    nombre: "Líquido inflamable",
    clase: "Clase 3",
    grupo: "riesgo",
    spec: "Símbolo (llama) en negro o blanco. Fondo rojo.",
    imagen: "3",
  },
  {
    id: "MP-ETQ-08",
    nombre: "Sólido inflamable",
    clase: "División 4.1",
    grupo: "riesgo",
    spec: "Símbolo (llama) en negro. Fondo blanco con siete franjas rojas verticales.",
    imagen: "4-1",
  },
  {
    id: "MP-ETQ-09",
    nombre: "Combustión espontánea",
    clase: "División 4.2",
    grupo: "riesgo",
    spec: "Símbolo (llama) en negro. Fondo blanco en la mitad superior, rojo en la mitad inferior.",
    imagen: "4-2",
  },
  {
    id: "MP-ETQ-10",
    nombre: "Peligroso mojado",
    clase: "División 4.3",
    grupo: "riesgo",
    spec: "Símbolo (llama) en negro o blanco. Fondo azul. Sustancia que en contacto con el agua emite gas inflamable.",
    imagen: "4-3",
  },
  {
    id: "MP-ETQ-11",
    nombre: "Comburente",
    clase: "División 5.1",
    grupo: "riesgo",
    spec: "Símbolo (llama sobre un círculo) en negro. Fondo amarillo. Número «5.1» en el ángulo inferior.",
    imagen: "5-1",
  },
  {
    id: "MP-ETQ-12",
    nombre: "Peróxido orgánico",
    clase: "División 5.2",
    grupo: "riesgo",
    spec: "La norma presenta esta etiqueta únicamente mediante la figura, sin describir sus colores en el texto. El rombo que ves es el normalizado: mitad superior roja, mitad inferior amarilla.",
    imagen: "5-2",
    pend: true,
  },
  {
    id: "MP-ETQ-13",
    nombre: "Sustancia tóxica",
    clase: "División 6.1",
    grupo: "riesgo",
    spec: "Símbolo (calavera y tibias cruzadas) en negro. Fondo blanco.",
    imagen: "6-1",
  },
  {
    id: "MP-ETQ-14",
    nombre: "Sustancia infecciosa",
    clase: "División 6.2",
    grupo: "riesgo",
    spec: "Símbolo (tres medias lunas sobre un círculo) e inscripción en negro. Fondo blanco. Número «6» en el ángulo inferior. La parte superior lleva la inscripción: «Sustancia infecciosa. En caso de averías o fugas, adviértase inmediatamente a las autoridades sanitarias».",
    imagen: "6-2",
  },
  {
    id: "MP-ETQ-15",
    nombre: "Radiactivo I · Blanca",
    clase: "Clase 7 · Categoría I",
    grupo: "riesgo",
    spec: "Símbolo (trébol) en negro. Fondo blanco. Número «7» en el ángulo inferior. Texto obligatorio en negro en la mitad inferior: «Radioactivo», «Contenido…», «Actividad…». La palabra «Radioactivo» va seguida de una franja vertical roja.",
  },
  {
    id: "MP-ETQ-16",
    nombre: "Radiactivo II · Amarilla",
    clase: "Clase 7 · Categoría II",
    grupo: "riesgo",
    spec: "Fondo amarillo con borde blanco en la mitad superior, blanco en la inferior. Añade «Índice de transporte» en recuadro negro. La palabra «Radioactivo» va seguida de dos franjas verticales rojas.",
  },
  {
    id: "MP-ETQ-17",
    nombre: "Radiactivo III · Amarilla",
    clase: "Clase 7 · Categoría III",
    grupo: "riesgo",
    spec: "Igual que la Categoría II, con tres franjas verticales rojas.",
  },
  {
    id: "MP-ETQ-18",
    nombre: "Corrosivo",
    clase: "Clase 8",
    grupo: "riesgo",
    spec: "Símbolo (líquido goteando de dos tubos de ensayo sobre una mano y una plancha de metal) en negro. Fondo blanco en la mitad superior y negro con borde blanco en la mitad inferior.",
    imagen: "8",
  },
  {
    id: "MP-ETQ-19",
    nombre: "Mercancías peligrosas varias",
    clase: "Clase 9",
    grupo: "riesgo",
    spec: "Símbolo (siete franjas verticales en la mitad superior) en negro. Fondo blanco.",
    imagen: "9",
  },

  // ── Etiquetas de manipulación ────────────────────────────
  {
    id: "MP-ETQ-20",
    nombre: "Exclusivamente en aeronaves de carga",
    clase: "Manipulación · CAO",
    grupo: "manipulacion",
    spec: "Color negro sobre fondo anaranjado. Dimensiones: 120 mm × 110 mm.",
    alerta: "No se estiban en una aeronave ocupada por pasajeros los bultos que lleven esta etiqueta.",
  },
  {
    id: "MP-ETQ-21",
    nombre: "Material magnetizado",
    clase: "Manipulación",
    grupo: "manipulacion",
    spec: "Color azul sobre fondo blanco. Dimensiones: 110 mm × 90 mm.",
  },
  {
    id: "MP-ETQ-22",
    nombre: "Posición del bulto",
    clase: "Manipulación",
    grupo: "manipulacion",
    spec: "Color rojo o negro sobre fondo contrastado. Dimensiones: 74 mm × 105 mm. Las flechas indican hacia dónde va «arriba».",
  },
  {
    id: "MP-ETQ-23",
    nombre: "Líquidos criogénicos",
    clase: "Manipulación",
    grupo: "manipulacion",
    spec: "Símbolo blanco. Fondo verde. Dimensiones: 74 mm × 105 mm. Su uso es obligatorio cuando se manipulen líquidos criogénicos.",
  },
  {
    id: "MP-ETQ-24",
    nombre: "Manténgase alejado del calor",
    clase: "Manipulación",
    grupo: "manipulacion",
    spec: "La norma la incluye como etiqueta de manipulación mediante la figura, sin describir sus colores en el texto.",
    pend: true,
  },
  {
    id: "MP-ETQ-25",
    nombre: "Baterías de litio",
    clase: "Manipulación",
    grupo: "manipulacion",
    spec: "La norma la incluye como etiqueta de manipulación mediante la figura, sin describir sus colores en el texto. Ediciones posteriores de las Instrucciones Técnicas la reemplazaron por la marca de batería de litio y la etiqueta 9A: verifica la edición en vigor.",
    pend: true,
  },
]

export const ETIQUETAS_TOTAL = ETIQUETAS.length
