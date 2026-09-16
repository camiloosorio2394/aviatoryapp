/**
 * El catálogo visual del módulo Aeropuertos: las 177 fichas de todo lo que se
 * ve desde la cabina, de la señal pintada a la luz de obstáculo.
 *
 * Es la segunda capa del módulo. Las lecciones enseñan lo que el piloto usa a
 * diario; el catálogo es la consulta rápida donde no falta nada: el Anexo 14
 * Vol. I (9.ª edición, Enmienda 18, aplicable desde el 27 de noviembre de
 * 2025) completo, el Capítulo 7 de zonas de uso restringido, los paneles del
 * área de señales del Anexo 2 y las variantes nacionales reales de LATAM.
 *
 * Cada ficha lleva su nombre en español de la OACI, su nombre en inglés, una
 * línea de qué es y qué significa para el piloto, y su imagen, que es una de
 * tres cosas:
 *
 *   hueco propio  → `AP-CAT-01` a `AP-CAT-69`, con la ficha de lo que la
 *                   imagen tiene que mostrar. Todavía no existe el archivo: se
 *                   pinta el hueco rotulado, como en las lecciones.
 *   prestada      → la imagen ya se genera para una lección (`AP-LL-NN`) o para
 *                   otra ficha del catálogo (`AP-CAT-NN`). No se abre un código
 *                   nuevo ni se vuelve a generar la imagen.
 *   sin imagen    → la ficha es solo texto (`imagen` sin definir).
 *
 * En las prestadas de lección **manda el elemento, no el código**: si un nivel
 * renumera sus huecos, el código se vuelve a resolver buscando ese elemento.
 * Los siete que apuntan al nivel 3 (`AP-09-03`, `AP-09-04`, `AP-10-03`,
 * `AP-10-04`, `AP-10-05`, `AP-11-03` y `AP-12-05`) hay que volver a
 * comprobarlos cuando ese nivel quede cerrado.
 *
 * Las dos numeraciones no se cruzan: ninguna ficha del catálogo abre un hueco
 * con código de lección y ninguna lección usa un `AP-CAT`.
 *
 * `consulta` marca las fichas de consulta pura, las que un piloto de línea casi
 * con seguridad no verá desde la cabina y solo necesita poder buscar: van con
 * imagen pequeña o sin imagen.
 *
 * Nada de esto se inventa: sale del material verificado del brief del catálogo.
 * Las cifras de norma completas (encuadre, medidas, qué no debe aparecer) viven
 * en ese brief; aquí queda lo que la pantalla enseña.
 */

import { AP_APRENDE } from "@/lib/aeropuertos"

/** Los cinco filtros de tipo, que es el único filtro del catálogo. */
export type ApCatTipo = "senal" | "letrero" | "baliza" | "luz" | "obstaculo"

/** Hueco propio del catálogo: la imagen no existe y esto es lo que pide. */
export interface ApCatHuecoPropio {
  clase: "propia"
  /** `AP-CAT-01` a `AP-CAT-69`. Nunca se reasigna. */
  codigo: string
  /** Tipo de imagen, proporción y tamaño, como en los huecos de la lección. */
  medida: string
  /** Proporción CSS, para que el hueco mida lo que va a medir la foto. */
  ratio: string
  /** Lo que la imagen tiene que mostrar, para quien la genere. */
  descripcion: string
}

/** Imagen que ya se genera en otro sitio: no se abre código nuevo. */
export interface ApCatImagenPrestada {
  clase: "prestada"
  /** `AP-LL-NN` de una lección o `AP-CAT-NN` de otra ficha. */
  codigo: string
  de: "leccion" | "catalogo"
  /** Número de la lección que la genera, cuando viene de una. */
  leccion?: number
  /**
   * Tipo y medida que la lección le dio a ese hueco. La imagen se queda con la
   * suya: aquí no se recorta ni se vuelve a generar en otra proporción.
   */
  medida?: string
  /** Proporción CSS de esa medida, para que el hueco mida lo mismo. */
  ratio?: string
  /** El elemento que se aprovecha de esa imagen. Manda sobre el código. */
  elemento?: string
}

export type ApCatImagen = ApCatHuecoPropio | ApCatImagenPrestada

export interface ApCatFicha {
  /** Número de la ficha en el catálogo, 1 a 177. */
  n: number
  /** Familia a la que pertenece, 1 a 13. */
  familia: number
  /** El filtro por el que se encuentra. */
  tipo: ApCatTipo
  /** Nombre del Anexo 14 en español, o del RAC 14 cuando es variante. */
  es: string
  /** Nombre en inglés, que es como aparece en la norma original. */
  en: string
  /** Qué es y qué significa para el piloto, en una línea. */
  linea: string
  /** Consulta pura: imagen pequeña o solo texto. */
  consulta?: boolean
  /** Variante nacional o novedad de enmienda, cuando aplica. */
  nota?: string
  /** Sin definir, la ficha es de solo texto. */
  imagen?: ApCatImagen
}

/** Las trece familias, en el orden en que se leen. */
export const AP_CAT_FAMILIAS: { n: number; titulo: string }[] = [
  { n: 1, titulo: "Señales pintadas de la pista" },
  { n: 2, titulo: "Señales pintadas de calle de rodaje y plataforma" },
  { n: 3, titulo: "Puntos de espera de la pista" },
  { n: 4, titulo: "Zonas cerradas y áreas fuera de servicio" },
  { n: 5, titulo: "Letreros con instrucciones obligatorias" },
  { n: 6, titulo: "Letreros de información" },
  { n: 7, titulo: "Balizas e indicadores" },
  { n: 8, titulo: "Luces de aproximación y pendiente visual" },
  { n: 9, titulo: "Luces de la pista y del aeródromo" },
  { n: 10, titulo: "Luces de calle de rodaje y anti incursión" },
  { n: 11, titulo: "Plataforma: guía y luces" },
  { n: 12, titulo: "Obstáculos: señalamiento" },
  { n: 13, titulo: "Obstáculos: iluminación" },
]

/** Los cinco filtros, con el nombre que ve el piloto. */
export const AP_CAT_TIPOS: { id: ApCatTipo; label: string }[] = [
  { id: "senal", label: "Señal pintada" },
  { id: "letrero", label: "Letrero" },
  { id: "luz", label: "Luz" },
  { id: "baliza", label: "Baliza" },
  { id: "obstaculo", label: "Obstáculo" },
]

export const AP_CAT_FICHAS: ApCatFicha[] = [
  // ── Familia 1 · Señales pintadas de la pista ──────────────────────────────────
  {
    n: 1,
    familia: 1,
    tipo: "senal",
    es: "Generalidades del color de las señales",
    en: "General (marking colours)",
    linea: "La pista se pinta de blanco y la calle de rodaje de amarillo: el color te dice dónde estás",
    consulta: true,
  },
  {
    n: 2,
    familia: 1,
    tipo: "senal",
    es: "Señal designadora de pista",
    en: "Runway designation marking",
    linea: "Los dos números del umbral: la décima parte del rumbo magnético, redondeada, vista desde la aproximación",
    imagen: {
      clase: "prestada",
      codigo: "AP-05-03",
      de: "leccion",
      leccion: 5,
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "designadora de pista",
    },
  },
  {
    n: 3,
    familia: 1,
    tipo: "senal",
    es: "Señal de eje de pista",
    en: "Runway centre line marking",
    linea: "Trazos blancos de umbral a umbral: tu referencia lateral en despegue y aterrizaje",
    imagen: {
      clase: "prestada",
      codigo: "AP-05-04",
      de: "leccion",
      leccion: 5,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "eje de pista",
    },
  },
  {
    n: 4,
    familia: 1,
    tipo: "senal",
    es: "Señal de umbral",
    en: "Threshold marking",
    linea: "Las fajas blancas: aquí empieza la pista utilizable para aterrizar",
    nota: "Enmienda 18 amplía su aplicación",
    imagen: {
      clase: "prestada",
      codigo: "AP-05-05",
      de: "leccion",
      leccion: 5,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "señal de umbral",
    },
  },
  {
    n: 5,
    familia: 1,
    tipo: "senal",
    es: "Señal de punto de visada",
    en: "Aiming point marking",
    linea: "Dos fajas blancas gruesas: el punto al que apuntas en la aproximación visual",
    imagen: {
      clase: "prestada",
      codigo: "AP-05-07",
      de: "leccion",
      leccion: 5,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "punto de visada",
    },
  },
  {
    n: 6,
    familia: 1,
    tipo: "senal",
    es: "Señal de zona de toma de contacto, patrón A",
    en: "Touchdown zone marking, pattern A",
    linea: "Pares de rectángulos blancos cada 150 metros: te dicen cuánta pista llevas gastada",
    imagen: {
      clase: "prestada",
      codigo: "AP-05-07",
      de: "leccion",
      leccion: 5,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "zona de toma de contacto",
    },
  },
  {
    n: 7,
    familia: 1,
    tipo: "senal",
    es: "Señal de zona de toma de contacto con codificación de distancia, patrón B",
    en: "TDZ marking, distance coded, pattern B",
    linea: "La misma zona pero en grupos de fajas: cuenta los grupos y sabes la distancia",
    nota: "Patrón alternativo",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-01",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Aproximación corta: dos pares del patrón B a los lados del eje, cada marca hecha de fajas separadas y no de un rectángulo macizo, con el punto de visada más adelante. Ojo: nunca el patrón A en la misma pista.",
    },
  },
  {
    n: 8,
    familia: 1,
    tipo: "senal",
    es: "Señal de faja lateral de pista",
    en: "Runway side stripe marking",
    linea: "Las dos líneas blancas del borde: fuera de ellas ya no hay pista",
    imagen: {
      clase: "prestada",
      codigo: "AP-05-06",
      de: "leccion",
      leccion: 5,
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "faja lateral",
    },
  },
  {
    n: 9,
    familia: 1,
    tipo: "senal",
    es: "Faja transversal del umbral desplazado",
    en: "Transverse stripe",
    linea: "La barra blanca ancha que cruza la pista: ahí empieza de verdad el terreno de aterrizaje",
    imagen: {
      clase: "prestada",
      codigo: "AP-06-02",
      de: "leccion",
      leccion: 6,
      medida: "Ilustración técnica · 16:9 · 1600×900",
      ratio: "16 / 9",
      elemento: "faja transversal",
    },
  },
  {
    n: 10,
    familia: 1,
    tipo: "senal",
    es: "Flechas del umbral desplazado permanente",
    en: "Arrows, permanently displaced threshold",
    linea: "Flechas blancas sobre el eje: ese tramo sirve para rodar y despegar, no para tomar contacto",
    imagen: {
      clase: "prestada",
      codigo: "AP-06-07",
      de: "leccion",
      leccion: 6,
      medida: "Ilustración técnica · 4:3 · 1200×900",
      ratio: "4 / 3",
      elemento: "flechas de umbral desplazado",
    },
  },
  {
    n: 11,
    familia: 1,
    tipo: "senal",
    es: "Señalización de umbral desplazado temporalmente",
    en: "Temporarily displaced threshold marking",
    linea: "Cuando el umbral se corre por obra: se tapan las señales viejas y el eje se vuelve flechas",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-02",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Tramo previo al umbral temporal con las señales tapadas y repintadas de oscuro, el eje convertido en flechas blancas, el galón de punta de flecha y la faja transversal que cruza la pista. Ojo: ninguna señal vieja asomando.",
    },
  },
  {
    n: 12,
    familia: 1,
    tipo: "senal",
    es: "Señal de eje de calle de rodaje sobre la pista",
    en: "Taxiway centre line marking on a runway",
    linea: "Línea amarilla pintada encima de una pista: estás rodando por pista, no despegando",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-03",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Línea amarilla continua corriendo a lo largo de una pista, con al menos una señal blanca de pista en el cuadro y el punto donde el amarillo sale hacia la calle de rodaje. Ojo: nada de operación nocturna.",
    },
  },
  {
    n: 13,
    familia: 1,
    tipo: "senal",
    es: "Señal de plataforma de viraje en la pista",
    en: "Runway turn pad marking",
    linea: "Línea amarilla que sale del eje y te lleva a dar la vuelta de 180 grados",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-04",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Aérea oblicua baja: el ensanche al costado de la pista y la línea amarilla que sale del eje con ángulo suave, entra a la plataforma de viraje y devuelve al eje. Ojo: ningún punto de espera dentro de la plataforma.",
    },
  },
  {
    n: 14,
    familia: 1,
    tipo: "senal",
    es: "Inscripción «CAT II» o «CAT III» en el pavimento",
    en: "\"CAT II\" / \"CAT III\" surface marking",
    linea: "Letras blancas junto a un punto de espera largo: te dicen de qué categoría es ese punto",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-05",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "La inscripción CAT II pintada en la calle de rodaje, junto al extremo de una señal de punto de espera en patrón B2. Ojo: nunca el patrón B1 y la inscripción no se traduce.",
    },
  },

  // ── Familia 2 · Señales pintadas de calle de rodaje y plataforma ──────────────
  {
    n: 15,
    familia: 2,
    tipo: "senal",
    es: "Señal de eje de calle de rodaje",
    en: "Taxiway centre line marking",
    linea: "La línea amarilla continua que te lleva de la pista hasta el puesto de estacionamiento",
    imagen: {
      clase: "prestada",
      codigo: "AP-07-02",
      de: "leccion",
      leccion: 7,
      medida: "Ilustración técnica · 16:9 · 1600×900",
      ratio: "16 / 9",
      elemento: "eje de calle de rodaje",
    },
  },
  {
    n: 16,
    familia: 2,
    tipo: "senal",
    es: "Señal mejorada de eje de calle de rodaje",
    en: "Enhanced taxiway centre line marking",
    linea: "Trazos amarillos a los lados del eje: te avisan que viene un punto de espera de pista",
    imagen: {
      clase: "prestada",
      codigo: "AP-07-03",
      de: "leccion",
      leccion: 7,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "eje mejorado",
    },
  },
  {
    n: 17,
    familia: 2,
    tipo: "senal",
    es: "Señal de faja lateral de calle de rodaje",
    en: "Taxi side stripe marking",
    linea: "Doble línea amarilla continua del borde: por fuera el pavimento no aguanta el avión",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-66",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Las dos líneas amarillas continuas del borde, contables una por una, el margen de pavimento de otro tono por fuera y el eje amarillo al otro lado del cuadro. Ojo: ni en trazos, ni una sola, ni blanca.",
    },
  },
  {
    n: 18,
    familia: 2,
    tipo: "senal",
    es: "Señal de punto de espera intermedio",
    en: "Intermediate holding position marking",
    linea: "Una sola línea amarilla de trazos: paras ahí cuando te lo indican",
    imagen: {
      clase: "prestada",
      codigo: "AP-12-05",
      de: "leccion",
      leccion: 12,
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "punto de espera intermedio",
    },
  },
  {
    n: 19,
    familia: 2,
    tipo: "senal",
    es: "Señal de punto de verificación del VOR",
    en: "VOR aerodrome checkpoint marking",
    linea: "Círculo pintado donde paras el avión para verificar el VOR contra un valor publicado",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-06",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Círculo pintado completo sobre plataforma, con la línea de azimut saliendo del centro y terminando en punta de flecha, y el reborde negro para contraste. Ojo: la flecha y el letrero del fondo tienen que coincidir.",
    },
  },
  {
    n: 20,
    familia: 2,
    tipo: "senal",
    es: "Señales de puesto de estacionamiento (conjunto)",
    en: "Aircraft stand marking",
    linea: "El juego amarillo completo que te mete al puesto y te dice dónde frenar",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-07",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Desde la cabina entrando al puesto: línea de entrada, barra de viraje con punta de flecha, línea de viraje, barra de alineación, línea de parada y la identificación pintada. Ojo: las líneas de seguridad no pueden ser amarillas.",
    },
  },
  {
    n: 21,
    familia: 2,
    tipo: "senal",
    es: "Identificación del puesto de estacionamiento",
    en: "Stand identification",
    linea: "La letra y el número pintados al comienzo de la línea de entrada",
    imagen: {
      clase: "prestada",
      codigo: "AP-08-02",
      de: "leccion",
      leccion: 8,
      medida: "Ilustración técnica · 16:9 · 1600×900",
      ratio: "16 / 9",
      elemento: "identificación de puesto",
    },
  },
  {
    n: 22,
    familia: 2,
    tipo: "senal",
    es: "Línea de entrada",
    en: "Lead-in line",
    linea: "La continua que sigue la rueda de morro hasta el puesto",
    consulta: true,
  },
  {
    n: 23,
    familia: 2,
    tipo: "senal",
    es: "Barra de viraje",
    en: "Turn bar",
    linea: "Barra con punta de flecha a la altura de tu asiento: aquí empieza el viraje",
    imagen: { clase: "prestada", codigo: "AP-CAT-07", de: "catalogo" },
  },
  {
    n: 24,
    familia: 2,
    tipo: "senal",
    es: "Línea de viraje",
    en: "Turning line",
    linea: "La curva continua que une la línea de entrada con la barra de alineación",
    consulta: true,
  },
  {
    n: 25,
    familia: 2,
    tipo: "senal",
    es: "Barra de alineación",
    en: "Alignment bar",
    linea: "La prolongación del eje del avión en el puesto: si la ves centrada, vas alineado",
    imagen: { clase: "prestada", codigo: "AP-CAT-07", de: "catalogo" },
  },
  {
    n: 26,
    familia: 2,
    tipo: "senal",
    es: "Línea de parada",
    en: "Stop line",
    linea: "Perpendicular a la barra de alineación, a la altura de tu asiento: aquí se frena",
    imagen: { clase: "prestada", codigo: "AP-CAT-07", de: "catalogo" },
  },
  {
    n: 27,
    familia: 2,
    tipo: "senal",
    es: "Línea de salida",
    en: "Lead-out line",
    linea: "La continua que te saca del puesto hacia la calle de rodaje",
    consulta: true,
  },
  {
    n: 28,
    familia: 2,
    tipo: "senal",
    es: "Líneas de seguridad en las plataformas",
    en: "Apron safety lines",
    linea: "Líneas de color contrastante que dicen por dónde se mueven vehículos y equipos",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-08",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Las señales amarillas del puesto y, en color claramente distinto, las líneas de seguridad: separación de punta de plano y límite de vía de servicio, con un vehículo del lado correcto. Ojo: nunca líneas de seguridad amarillas.",
    },
  },
  {
    n: 29,
    familia: 2,
    tipo: "senal",
    es: "Línea de separación de punta de plano",
    en: "Wing tip clearance line",
    linea: "Hasta dónde puede llegar la punta del ala sin chocar nada",
    imagen: { clase: "prestada", codigo: "AP-CAT-08", de: "catalogo" },
  },
  {
    n: 30,
    familia: 2,
    tipo: "senal",
    es: "Línea de límite de vía de servicio",
    en: "Service road boundary line",
    linea: "Por dónde circulan los vehículos de rampa sin meterse en tu puesto",
    imagen: { clase: "prestada", codigo: "AP-CAT-08", de: "catalogo" },
  },
  {
    n: 31,
    familia: 2,
    tipo: "senal",
    es: "Señal de punto de espera en la vía de vehículos",
    en: "Road-holding position marking",
    linea: "El pare del código vial en la entrada de una vía de vehículos a la pista",
    nota: "Forma la fija el tránsito local",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-09",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "La vía de vehículos llegando perpendicular a la pista, con la marca de detención del código vial del país y el letrero rojo al costado. Ojo: ahí no va la escalera aeronáutica del patrón A ni del B.",
    },
  },
  {
    n: 32,
    familia: 2,
    tipo: "senal",
    es: "Señal con instrucciones obligatorias (pintada)",
    en: "Mandatory instruction marking",
    linea: "Texto blanco sobre fondo rojo pintado en el piso: vale lo mismo que el letrero rojo",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-10",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Rectángulo rojo pintado con la inscripción en blanco sobre la calle de rodaje, el eje amarillo cruzando el cuadro y la señal A2 más adelante, del lado de la pista. Ojo: ni patrón A1 ni fondo naranja.",
    },
  },
  {
    n: 33,
    familia: 2,
    tipo: "senal",
    es: "Señal de PROHIBIDA LA ENTRADA (pintada)",
    en: "NO ENTRY marking",
    linea: "«NO ENTRY» en blanco sobre rojo en el pavimento: por ahí no se entra nunca",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-11",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "El rectángulo rojo con NO ENTRY en blanco cruzando el ancho de la calle, con el letrero de disco rojo y barra blanca al costado y el eje amarillo que entra. Ojo: la inscripción no se traduce.",
    },
  },
  {
    n: 34,
    familia: 2,
    tipo: "senal",
    es: "Señal de información: emplazamiento",
    en: "Information marking (location)",
    linea: "Amarillo sobre negro pintado en el piso: te dice en qué calle estás",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-12",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Rectángulo negro pintado con la inscripción en amarillo y su borde amarillo, con el eje de la calle de rodaje en el mismo cuadro. Ojo: el emplazamiento nunca lleva flecha.",
    },
  },
  {
    n: 35,
    familia: 2,
    tipo: "senal",
    es: "Señal de información: dirección y destino",
    en: "Information marking (direction/destination)",
    linea: "Negro sobre amarillo pintado en el piso: te dice hacia dónde sale cada calle",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-13",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Rectángulo amarillo pintado con la inscripción en negro y una flecha al lado, y la bifurcación real hacia la que apunta. Ojo: la flecha no puede señalar donde no hay calle.",
    },
  },
  {
    n: 36,
    familia: 2,
    tipo: "senal",
    es: "Señal para pistas no pavimentadas",
    en: "Unpaved runway marking",
    linea: "El reglamento regional la trata aparte y remite a un manual específico: consulta la norma de tu país",
    consulta: true,
    nota: "LAR 154",
  },
  {
    n: 37,
    familia: 2,
    tipo: "senal",
    es: "Señal de borde de plataforma",
    en: "Apron edge marking",
    linea: "Delimita la parte de la plataforma que aguanta el peso del avión",
    consulta: true,
    nota: "LAR 154, no está en el Anexo 14",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-14",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "La línea que delimita el borde de la plataforma, con el cambio evidente entre el pavimento apto y lo que hay más allá, y un avión estacionado dentro para dar escala. Ojo: sin cifras rotuladas, que no están verificadas.",
    },
  },
  {
    n: 38,
    familia: 2,
    tipo: "senal",
    es: "Señal de eje de calle de rodaje en plataforma",
    en: "Apron taxiway centre line marking",
    linea: "El mismo eje amarillo, ya dentro de la plataforma, hasta donde arrancan los puestos",
    consulta: true,
    nota: "LAR 154 le da nombre propio",
  },
  {
    n: 39,
    familia: 2,
    tipo: "senal",
    es: "Señal vertical de umbral y extremo para pistas no pavimentadas",
    en: "Unpaved runway threshold/end marker",
    linea: "Tableros frangibles a los lados del eje: marcan umbral y extremo donde no hay pintura",
    consulta: true,
    nota: "RAC 14 Colombia",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-15",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Par de tableros verticales a los lados del eje sobre tierra o grama, el del lado de aproximación con el designador y, al fondo, el par de extremo en rojo. Ojo: nada de pavimento ni de señales pintadas.",
    },
  },

  // ── Familia 3 · Puntos de espera de la pista ──────────────────────────────────
  {
    n: 40,
    familia: 3,
    tipo: "senal",
    es: "Señal de punto de espera de la pista, configuración A2",
    en: "Runway-holding position marking, pattern A2",
    linea: "Cuatro líneas amarillas: las dos continuas miran al lado donde hay que parar",
    imagen: {
      clase: "prestada",
      codigo: "AP-07-06",
      de: "leccion",
      leccion: 7,
      medida: "Ilustración técnica · 4:3 · 1200×900",
      ratio: "4 / 3",
      elemento: "patrón A2",
    },
  },
  {
    n: 41,
    familia: 3,
    tipo: "senal",
    es: "Señal de punto de espera de la pista, configuración B2",
    en: "Runway-holding position marking, pattern B2",
    linea: "La escalera amarilla: solo aparece en las posiciones más alejadas de una pista de precisión",
    imagen: {
      clase: "prestada",
      codigo: "AP-07-07",
      de: "leccion",
      leccion: 7,
      medida: "Ilustración técnica · 4:3 · 1200×900",
      ratio: "4 / 3",
      elemento: "patrón B2",
    },
  },
  {
    n: 42,
    familia: 3,
    tipo: "senal",
    es: "Punto de espera en intersección de pista con pista",
    en: "Runway-holding position at a runway/runway intersection",
    linea: "El mismo A2, pero perpendicular al eje de la pista por la que estás rodando",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-16",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "El patrón A2 pintado sobre una pista y perpendicular al eje por el que se rueda, con las dos continuas del lado de espera y las de trazos mirando a la pista que se cruza. Ojo: nunca al revés, y nunca el A1.",
    },
  },
  {
    n: 43,
    familia: 3,
    tipo: "senal",
    es: "Configuraciones A1 y B1",
    en: "Patterns A1 and B1",
    linea: "Las versiones angostas antiguas: dejan de valer el 26 de noviembre de 2026",
    consulta: true,
    nota: "Sin imagen, por norma",
  },

  // ── Familia 4 · Zonas cerradas y áreas fuera de servicio ──────────────────────
  {
    n: 44,
    familia: 4,
    tipo: "senal",
    es: "Señal de pista cerrada",
    en: "Closed runway marking",
    linea: "Cruz blanca sobre la pista: no se aterriza, no se despega, no se rueda",
    nota: "Enmienda 18 explicita el blanco",
    imagen: {
      clase: "prestada",
      codigo: "AP-06-06",
      de: "leccion",
      leccion: 6,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "cruz de pista cerrada",
    },
  },
  {
    n: 45,
    familia: 4,
    tipo: "senal",
    es: "Señal de calle de rodaje cerrada",
    en: "Closed taxiway marking",
    linea: "Cruz amarilla, más pequeña que la de pista: esa calle está cerrada",
    nota: "Enmienda 18 explicita el amarillo",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-17",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Cruz amarilla centrada en el eje de la calle de rodaje, con el eje interrumpido y la calle vecina abierta al lado. Ojo: en calle de rodaje es amarilla; la blanca es de pista.",
    },
  },
  {
    n: 46,
    familia: 4,
    tipo: "senal",
    es: "Señal de trazos en ángulo (galones) del área anterior al umbral",
    en: "Chevron marking, pre-threshold area",
    linea: "Galones amarillos apuntando a la pista: ahí no se aterriza ni se rueda",
    imagen: {
      clase: "prestada",
      codigo: "AP-06-08",
      de: "leccion",
      leccion: 6,
      medida: "Ilustración técnica · 4:3 · 1200×900",
      ratio: "4 / 3",
      elemento: "galones",
    },
  },
  {
    n: 47,
    familia: 4,
    tipo: "senal",
    es: "Señal de área fuera de servicio",
    en: "Unserviceability marking",
    linea: "Texto negro sobre fondo naranja en el piso: ese pedazo no sirve",
    nota: "Nueva con la Enmienda 18",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-18",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Rectángulo naranja pintado con la inscripción en negro, el eje amarillo de la calle y, al fondo, el área delimitada. Ojo: ni fondo rojo ni fondo amarillo, que son de otras señales.",
    },
  },
  {
    n: 48,
    familia: 4,
    tipo: "letrero",
    es: "Letrero de área fuera de servicio",
    en: "Unserviceability sign",
    linea: "El color nuevo de letrero: naranja con texto negro, para cambios temporales",
    nota: "Nuevo con la Enmienda 18",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-19",
      medida: "Fotografía de estudio · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Cara rectangular naranja con la inscripción negra centrada y su contorno, sobre acople frangible y con las dos luces destellantes encima. Ojo: son dos luces, y el naranja no se confunde con el rojo de los letreros obligatorios.",
    },
  },
  {
    n: 49,
    familia: 4,
    tipo: "baliza",
    es: "Balizas de área fuera de servicio",
    en: "Unserviceability markers",
    linea: "Objetos verticales que delimitan un pedazo que puedes sortear con seguridad",
    consulta: true,
  },
  {
    n: 50,
    familia: 4,
    tipo: "baliza",
    es: "Conos de área fuera de servicio",
    en: "Unserviceability cones",
    linea: "Conos de colores vivos alrededor de lo que no sirve",
    consulta: true,
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-20",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Varios conos en línea, al menos una bandera cuadrada sobre su soporte y un tablero de fajas verticales delimitando un área inutilizable. Ojo: las fajas del tablero nunca van horizontales, y con esto no se cierra una pista.",
    },
  },
  {
    n: 51,
    familia: 4,
    tipo: "baliza",
    es: "Banderas de área fuera de servicio",
    en: "Unserviceability flags",
    linea: "Banderas cuadradas de colores vivos con el mismo propósito que los conos",
    consulta: true,
    imagen: { clase: "prestada", codigo: "AP-CAT-20", de: "catalogo" },
  },
  {
    n: 52,
    familia: 4,
    tipo: "baliza",
    es: "Tableros de área fuera de servicio",
    en: "Unserviceability marker boards",
    linea: "Tableros con fajas verticales de dos colores, para delimitar un área mayor",
    consulta: true,
    imagen: { clase: "prestada", codigo: "AP-CAT-20", de: "catalogo" },
  },
  {
    n: 53,
    familia: 4,
    tipo: "luz",
    es: "Luces de área fuera de servicio",
    en: "Unserviceability lights",
    linea: "Luces rojas fijas de noche donde no se puede pasar",
    consulta: true,
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-21",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Fila de luces rojas fijas delimitando la entrada, con el eje verde de la calle de rodaje interrumpido detrás y contraste claro con las luces normales del fondo. Ojo: fijas, no destellantes.",
    },
  },
  {
    n: 54,
    familia: 4,
    tipo: "luz",
    es: "Luces de pista cerrada",
    en: "Closed runway lighting",
    linea: "Una cruz de luces blancas que destella sobre el eje de una pista cerrada",
    nota: "Nueva con la Enmienda 18",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-22",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Cruz de luces blancas elevadas sobre el eje, cerca del extremo, con los dos brazos del mismo número de luces y el resto de la pista apagada. Ojo: ni cruz amarilla ni luces de borde encendidas.",
    },
  },

  // ── Familia 5 · Letreros con instrucciones obligatorias ───────────────────────
  {
    n: 55,
    familia: 5,
    tipo: "letrero",
    es: "Reglas transversales de todos los letreros",
    en: "Sign general characteristics",
    linea: "Frangibles, rectangulares, bajos, iluminados o retrorreflectantes: el rojo solo es de instrucción obligatoria",
    consulta: true,
  },
  {
    n: 56,
    familia: 5,
    tipo: "letrero",
    es: "Letrero de designación de pista",
    en: "Runway designation sign",
    linea: "Blanco sobre rojo con los dos números de la pista: aquí se para y se pide autorización",
    imagen: {
      clase: "prestada",
      codigo: "AP-09-04",
      de: "leccion",
      leccion: 9,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "letrero rojo de designación",
    },
  },
  {
    n: 57,
    familia: 5,
    tipo: "letrero",
    es: "Letrero de punto de espera de la pista",
    en: "Runway-holding position sign",
    linea: "Blanco sobre rojo con calle y número: proteges la superficie de obstáculos o el área del ILS",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-23",
      medida: "Fotografía de estudio · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Cara roja horizontal con la designación de la calle y un número en blanco, contorno negro alrededor de la inscripción y acople frangible en la base. Ojo: sin flechas y sin designación de pista.",
    },
  },
  {
    n: 58,
    familia: 5,
    tipo: "letrero",
    es: "Letrero de punto de espera CAT I",
    en: "Category I holding position sign",
    linea: "Blanco sobre rojo con el número de pista y la categoría de aproximación protegida",
    imagen: {
      clase: "prestada",
      codigo: "AP-09-03",
      de: "leccion",
      leccion: 9,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "letrero CAT I",
    },
  },
  {
    n: 59,
    familia: 5,
    tipo: "letrero",
    es: "Letrero de punto de espera CAT II",
    en: "Category II holding position sign",
    linea: "Lo mismo, para operación de Categoría II",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-24",
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Los cuatro letreros de cara roja y texto blanco con su contorno negro, en fila, para que se vea la diferencia de largo entre el de una categoría y el de tres. Ojo: la sigla ILS no es de esta norma.",
    },
  },
  {
    n: 60,
    familia: 5,
    tipo: "letrero",
    es: "Letrero de punto de espera CAT III",
    en: "Category III holding position sign",
    linea: "Lo mismo, para operación de Categoría III",
    imagen: { clase: "prestada", codigo: "AP-CAT-24", de: "catalogo" },
  },
  {
    n: 61,
    familia: 5,
    tipo: "letrero",
    es: "Letrero de punto de espera conjunto CAT II/III",
    en: "Joint category II and III holding position sign",
    linea: "Un solo letrero para las dos categorías",
    imagen: { clase: "prestada", codigo: "AP-CAT-24", de: "catalogo" },
  },
  {
    n: 62,
    familia: 5,
    tipo: "letrero",
    es: "Letrero de punto de espera conjunto CAT I/II/III",
    en: "Joint category I, II and III holding position sign",
    linea: "Un solo letrero para las tres categorías",
    consulta: true,
    nota: "Colombia todavía no lo lista",
    imagen: { clase: "prestada", codigo: "AP-CAT-24", de: "catalogo" },
  },
  {
    n: 63,
    familia: 5,
    tipo: "letrero",
    es: "Letrero de PROHIBIDA LA ENTRADA",
    en: "NO ENTRY sign",
    linea: "Disco rojo con barra blanca y sin texto: por ese pavimento no se entra",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-25",
      medida: "Fotografía de estudio · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Cara roja con el disco rojo y la barra blanca horizontal en el centro, sobre acople frangible, sin una sola letra. Ojo: este letrero es solo símbolo.",
    },
  },
  {
    n: 64,
    familia: 5,
    tipo: "letrero",
    es: "Letrero de punto de espera en la vía de vehículos",
    en: "Road-holding position sign",
    linea: "Blanco sobre rojo, en el idioma del país, para el conductor que entra a la pista",
    consulta: true,
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-26",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Letrero de cara roja con texto blanco en español al costado de una vía de vehículos, cerca del borde, con la pista al fondo. Ojo: ni en inglés ni con la designación de la pista.",
    },
  },

  // ── Familia 6 · Letreros de información ───────────────────────────────────────
  {
    n: 65,
    familia: 6,
    tipo: "letrero",
    es: "Letrero de dirección",
    en: "Direction sign",
    linea: "Negro sobre amarillo con flechas: hacia dónde sale cada calle en la intersección",
    imagen: {
      clase: "prestada",
      codigo: "AP-10-04",
      de: "leccion",
      leccion: 10,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "letrero de dirección",
    },
  },
  {
    n: 66,
    familia: 6,
    tipo: "letrero",
    es: "Letrero de emplazamiento",
    en: "Location sign",
    linea: "Amarillo sobre negro con borde amarillo y sin flechas: en qué calle estás ahora",
    imagen: {
      clase: "prestada",
      codigo: "AP-10-03",
      de: "leccion",
      leccion: 10,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "letrero de emplazamiento",
    },
  },
  {
    n: 67,
    familia: 6,
    tipo: "letrero",
    es: "Letrero combinado de emplazamiento y dirección",
    en: "Combined location and direction sign",
    linea: "El de emplazamiento en medio y las direcciones a cada lado según el viraje",
    imagen: {
      clase: "prestada",
      codigo: "AP-10-04",
      de: "leccion",
      leccion: 10,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "letrero combinado",
    },
  },
  {
    n: 68,
    familia: 6,
    tipo: "letrero",
    es: "Letrero de destino",
    en: "Destination sign",
    linea: "Negro sobre amarillo con flecha hacia un destino del aeropuerto, no hacia una calle",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-27",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Cara amarilla con texto negro y flecha nombrando un destino del aeropuerto, no una calle de rodaje, con la calle hacia la que apunta al fondo. Ojo: el de destino siempre lleva flecha.",
    },
  },
  {
    n: 69,
    familia: 6,
    tipo: "letrero",
    es: "Letrero de salida de pista",
    en: "Runway exit sign",
    linea: "Negro sobre amarillo con la calle de salida y la flecha, antes del punto de salida",
    imagen: {
      clase: "prestada",
      codigo: "AP-10-05",
      de: "leccion",
      leccion: 10,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "letrero de salida",
    },
  },
  {
    n: 70,
    familia: 6,
    tipo: "letrero",
    es: "Letrero de pista libre",
    en: "Runway vacated sign",
    linea: "Lleva dibujado el patrón A: pasado ese letrero ya libraste la pista",
    imagen: {
      clase: "prestada",
      codigo: "AP-10-05",
      de: "leccion",
      leccion: 10,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "letrero de pista libre",
    },
  },
  {
    n: 71,
    familia: 6,
    tipo: "letrero",
    es: "Letrero de despegue desde intersección",
    en: "Intersection take-off sign",
    linea: "Negro sobre amarillo con el TORA que te queda en metros y la flecha",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-28",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Cara amarilla con una cifra en metros y la flecha orientada en la dirección de despegue, con la pista al fondo en esa dirección. Ojo: la cifra en metros, y no es el blanco sobre negro de distancia restante.",
    },
  },
  {
    n: 72,
    familia: 6,
    tipo: "letrero",
    es: "Letrero de punto de verificación del VOR",
    en: "VOR aerodrome checkpoint sign",
    linea: "Negro sobre amarillo con frecuencia, radial y, si hay, distancia DME",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-29",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Cara amarilla con texto negro: la sigla, la frecuencia y la marcación en grados, con parte del círculo pintado en el mismo encuadre. Ojo: la marcación tiene que coincidir con la línea de azimut.",
    },
  },
  {
    n: 73,
    familia: 6,
    tipo: "letrero",
    es: "Letrero de identificación del aeródromo",
    en: "Aerodrome identification sign",
    linea: "El nombre del aeropuerto en letras grandes, cuando no hay otra forma de identificarlo",
    consulta: true,
    nota: "Colombia lo tiene reservado",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-30",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "El nombre del aeródromo en letras enormes sobre el terreno o sobre una estructura baja, con contraste y escala suficiente para entender el tamaño. Ojo: no es el rótulo comercial de la terminal.",
    },
  },
  {
    n: 74,
    familia: 6,
    tipo: "letrero",
    es: "Letrero de identificación de puesto de estacionamiento",
    en: "Aircraft stand identification sign",
    linea: "Negro sobre amarillo, legible desde la cabina antes de entrar al puesto",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-31",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Letrero de cara amarilla con texto negro y el número del puesto, con el puesto al que apunta y la señal pintada del mismo número en el piso. Ojo: los dos números tienen que coincidir.",
    },
  },
  {
    n: 75,
    familia: 6,
    tipo: "letrero",
    es: "Letrero de distancia de pista restante",
    en: "Runway distance remaining sign",
    linea: "Blanco sobre negro cada 300 metros: cuánta pista te queda para frenar o irte al aire",
    nota: "Nuevo con la Enmienda 18",
    imagen: {
      clase: "prestada",
      codigo: "AP-03-07",
      de: "leccion",
      leccion: 3,
      medida: "Fotografía · 16:9 · 1600×900",
      ratio: "16 / 9",
      elemento: "distancia restante",
    },
  },
  {
    n: 76,
    familia: 6,
    tipo: "letrero",
    es: "Letrero de mensaje variable",
    en: "Variable message sign",
    linea: "Letrero que cambia de texto y queda en blanco cuando no está en uso",
    consulta: true,
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-32",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Cara de letrero rectangular con un mensaje que se nota generado electrónicamente, sobre acople frangible. Ojo: ni cara roja de instrucción obligatoria ni texto en movimiento.",
    },
  },
  {
    n: 77,
    familia: 6,
    tipo: "letrero",
    es: "Tamaño, altura de carácter y emplazamiento de los letreros",
    en: "Sign size and siting",
    linea: "Las cifras de cara, altura y distancia al pavimento según la clave de referencia",
    consulta: true,
  },

  // ── Familia 7 · Balizas e indicadores ─────────────────────────────────────────
  {
    n: 78,
    familia: 7,
    tipo: "baliza",
    es: "Indicador de la dirección del viento (manga)",
    en: "Wind direction indicator",
    linea: "La única indicación de viento garantizada en todo aeródromo del mundo",
    imagen: {
      clase: "prestada",
      codigo: "AP-11-03",
      de: "leccion",
      leccion: 11,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "manga de viento",
    },
  },
  {
    n: 79,
    familia: 7,
    tipo: "baliza",
    es: "Iluminación del indicador de la dirección del viento",
    en: "Illumination of wind direction indicator",
    linea: "De noche, al menos una manga va iluminada",
    consulta: true,
  },
  {
    n: 80,
    familia: 7,
    tipo: "baliza",
    es: "Banda circular del indicador de viento",
    en: "Circular band marking the wind indicator",
    linea: "Círculo blanco pintado alrededor del poste de la manga, para ubicarla desde el aire",
    consulta: true,
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-33",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "El círculo blanco completo pintado sobre el terreno, con el poste de la manga en el centro exacto y la manga extendida. Ojo: el círculo es blanco y la manga va centrada.",
    },
  },
  {
    n: 81,
    familia: 7,
    tipo: "baliza",
    es: "Indicador de la dirección de aterrizaje",
    en: "Landing direction indicator",
    linea: "Una «T» en el suelo: se aterriza paralelo al brazo y hacia el travesaño",
    consulta: true,
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-34",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "La figura en forma de T sobre el terreno, con el brazo paralelo a la pista del fondo y el travesaño hacia el lado en que se aterriza. Ojo: ni tetraedro ni veleta, que no son de esta norma.",
    },
  },
  {
    n: 82,
    familia: 7,
    tipo: "baliza",
    es: "Lámpara de señales",
    en: "Signalling lamp",
    linea: "La linterna de la torre: rojo, verde y blanco cuando te quedas sin radio",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-35",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "La lámpara apuntable a mano con su mira, operada por una persona, con el haz de color saliendo hacia la pista que se ve por la ventana de la torre. Ojo: solo rojo, verde o blanco.",
    },
  },
  {
    n: 83,
    familia: 7,
    tipo: "baliza",
    es: "Área de señales",
    en: "Signal area",
    linea: "El cuadrado con borde blanco donde la torre exhibe paneles visibles desde el aire",
    consulta: true,
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-36",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Cuadrado plano y horizontal sobre terreno, con borde blanco y al menos un panel exhibido encima que contraste con la superficie. Ojo: ni círculo segmentado ni área sobre pavimento de pista.",
    },
  },
  {
    n: 84,
    familia: 7,
    tipo: "baliza",
    es: "Panel de prohibición de aterrizar",
    en: "Prohibition of landing",
    linea: "Cuadrado rojo con dos diagonales amarillas: aterrizajes prohibidos",
    consulta: true,
    nota: "Anexo 2",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-37",
      medida: "Ilustración técnica · 16:9 · 1600×900",
      ratio: "16 / 9",
      descripcion:
        "Los diez paneles en cuadrícula: doble diagonal amarilla sobre rojo, una diagonal, haltera, haltera con barras negras, cruces de un color, la T, dos cifras, flecha a la derecha, C negra sobre amarillo y doble cruz blanca. Ojo: ninguno fuera de esa lista.",
    },
  },
  {
    n: 85,
    familia: 7,
    tipo: "baliza",
    es: "Panel de precauciones especiales",
    en: "Need for special precautions",
    linea: "Cuadrado rojo con una sola diagonal amarilla: aproxima y aterriza con precaución",
    consulta: true,
    nota: "Anexo 2",
    imagen: { clase: "prestada", codigo: "AP-CAT-37", de: "catalogo" },
  },
  {
    n: 86,
    familia: 7,
    tipo: "baliza",
    es: "Panel de uso de pistas y calles de rodaje (haltera)",
    en: "Use of runways and taxiways (dumb-bell)",
    linea: "Haltera blanca: aterriza, despega y rueda solo por pista y calle de rodaje",
    consulta: true,
    nota: "Anexo 2",
    imagen: { clase: "prestada", codigo: "AP-CAT-37", de: "catalogo" },
  },
  {
    n: 87,
    familia: 7,
    tipo: "baliza",
    es: "Panel de haltera con barras negras",
    en: "Dumb-bell with black bars",
    linea: "La misma haltera con dos barras negras: solo aterriza y despega en pista",
    consulta: true,
    nota: "Anexo 2",
    imagen: { clase: "prestada", codigo: "AP-CAT-37", de: "catalogo" },
  },
  {
    n: 88,
    familia: 7,
    tipo: "baliza",
    es: "Panel de pistas o calles de rodaje cerradas",
    en: "Closed runways or taxiways",
    linea: "Cruces de un solo color sobre el pavimento: área no apta para moverse",
    consulta: true,
    nota: "Anexo 2",
    imagen: { clase: "prestada", codigo: "AP-CAT-37", de: "catalogo" },
  },
  {
    n: 89,
    familia: 7,
    tipo: "baliza",
    es: "Panel de dirección de aterrizaje o despegue",
    en: "Directions for landing or take-off",
    linea: "La «T» exhibida como panel dentro del área de señales",
    consulta: true,
    nota: "Anexo 2",
    imagen: { clase: "prestada", codigo: "AP-CAT-37", de: "catalogo" },
  },
  {
    n: 90,
    familia: 7,
    tipo: "baliza",
    es: "Panel de dos cifras de dirección de despegue",
    en: "Two digits indicating take-off direction",
    linea: "Dos cifras junto a la torre: la dirección de despegue redondeada a diez grados",
    consulta: true,
    nota: "Anexo 2",
    imagen: { clase: "prestada", codigo: "AP-CAT-37", de: "catalogo" },
  },
  {
    n: 91,
    familia: 7,
    tipo: "baliza",
    es: "Panel de circuito por la derecha",
    en: "Right-hand traffic",
    linea: "Flecha a la derecha: los virajes del circuito son por la derecha",
    consulta: true,
    nota: "Anexo 2",
    imagen: { clase: "prestada", codigo: "AP-CAT-37", de: "catalogo" },
  },
  {
    n: 92,
    familia: 7,
    tipo: "baliza",
    es: "Panel de oficina de notificación de los servicios de tránsito aéreo",
    en: "Air traffic services reporting office",
    linea: "Una «C» negra sobre fondo amarillo: ahí está la oficina de notificación",
    consulta: true,
    nota: "Anexo 2",
    imagen: { clase: "prestada", codigo: "AP-CAT-37", de: "catalogo" },
  },
  {
    n: 93,
    familia: 7,
    tipo: "baliza",
    es: "Panel de vuelos de planeadores en curso",
    en: "Glider flights in operation",
    linea: "Doble cruz blanca: hay planeadores operando en el aeródromo",
    consulta: true,
    nota: "Anexo 2",
    imagen: { clase: "prestada", codigo: "AP-CAT-37", de: "catalogo" },
  },
  {
    n: 94,
    familia: 7,
    tipo: "baliza",
    es: "Balizas: frangibilidad y altura",
    en: "Markers: general",
    linea: "Toda baliza es frangible y queda baja para no tocar hélices ni góndolas",
    consulta: true,
  },
  {
    n: 95,
    familia: 7,
    tipo: "baliza",
    es: "Balizas de borde de pista sin pavimentar",
    en: "Unpaved runway edge markers",
    linea: "Tableros o conos que dibujan el borde de una pista destapada",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-38",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Balizas planas rectangulares apoyadas en tierra o grama, con el lado largo paralelo al eje, a los dos lados y a la misma distancia, y al menos cuatro en profundidad. Ojo: nunca perpendiculares ni sobre pavimento.",
    },
  },
  {
    n: 96,
    familia: 7,
    tipo: "baliza",
    es: "Balizas de borde de zona de parada",
    en: "Stopway edge markers",
    linea: "Deben verse claramente distintas de las de borde de pista para no confundirte",
    consulta: true,
    nota: "Colombia lo tiene reservado",
  },
  {
    n: 97,
    familia: 7,
    tipo: "baliza",
    es: "Balizas de borde para pistas cubiertas de nieve",
    en: "Edge markers for snow-covered runways",
    linea: "Objetos visibles, incluso coníferas, que dibujan el borde cuando la nieve lo tapa",
    consulta: true,
    nota: "Colombia lo tiene reservado",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-39",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Pista cubierta de nieve sin pintura visible, con balizas oscuras a intervalos regulares a los dos lados, también en el umbral y el extremo, y al menos seis en profundidad. Ojo: separaciones iguales.",
    },
  },
  {
    n: 98,
    familia: 7,
    tipo: "baliza",
    es: "Balizas de borde de calle de rodaje",
    en: "Taxiway edge markers",
    linea: "Reflectores azules donde no hay luces de borde",
    consulta: true,
    nota: "Colombia lo tiene reservado",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-40",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Balizas azules retrorreflectantes en los dos bordes de la calle y verdes planas sobre el eje, encima de la señal amarilla. Ojo: sin luces empotradas encendidas, porque estas van donde no hay luces.",
    },
  },
  {
    n: 99,
    familia: 7,
    tipo: "baliza",
    es: "Balizas de eje de calle de rodaje",
    en: "Taxiway centre line markers",
    linea: "Reflectores verdes sobre el eje, diseñados para que les pases por encima",
    consulta: true,
    nota: "Colombia lo tiene reservado",
    imagen: { clase: "prestada", codigo: "AP-CAT-40", de: "catalogo" },
  },
  {
    n: 100,
    familia: 7,
    tipo: "baliza",
    es: "Balizas de borde de calle de rodaje sin pavimentar",
    en: "Unpaved taxiway edge markers",
    linea: "Conos que delimitan una calle de rodaje destapada",
    consulta: true,
    nota: "Colombia lo tiene reservado",
  },
  {
    n: 101,
    familia: 7,
    tipo: "baliza",
    es: "Balizas delimitadoras",
    en: "Boundary markers",
    linea: "En aeródromos sin pista: marcan el límite del área de aterrizaje",
    consulta: true,
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-41",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Área de aterrizaje de grama, sin pista marcada, con balizas de dos colores contrastantes a intervalos regulares en el límite y una puesta en el ángulo de la esquina. Ojo: nada de pavimento en el cuadro.",
    },
  },

  // ── Familia 8 · Luces de aproximación y pendiente visual ──────────────────────
  {
    n: 102,
    familia: 8,
    tipo: "luz",
    es: "Sistema sencillo de iluminación de aproximación",
    en: "Simple approach lighting system",
    linea: "Fila de luces y una barra transversal: alineación y distancia al umbral en no precisión",
    imagen: {
      clase: "prestada",
      codigo: "AP-15-03",
      de: "leccion",
      leccion: 15,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "sistema sencillo",
    },
  },
  {
    n: 103,
    familia: 8,
    tipo: "luz",
    es: "Sistema de iluminación de aproximación de precisión CAT I",
    en: "Precision approach category I lighting system",
    linea: "Novecientos metros de eje blanco con barra transversal: la referencia de la CAT I",
    imagen: {
      clase: "prestada",
      codigo: "AP-15-03",
      de: "leccion",
      leccion: 15,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "aproximación CAT I",
    },
  },
  {
    n: 104,
    familia: 8,
    tipo: "luz",
    es: "Sistema de iluminación de aproximación de precisión CAT II y III",
    en: "Precision approach category II and III lighting system",
    linea: "Igual pero con dos filas laterales rojas cerca del umbral: baja visibilidad",
    imagen: {
      clase: "prestada",
      codigo: "AP-15-03",
      de: "leccion",
      leccion: 15,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "aproximación CAT II y III",
    },
  },
  {
    n: 105,
    familia: 8,
    tipo: "luz",
    es: "Luces de destellos secuenciales",
    en: "Sequenced flashing lights",
    linea: "La bola de luz que corre hacia el umbral dos veces por segundo",
    imagen: {
      clase: "prestada",
      codigo: "AP-15-06",
      de: "leccion",
      leccion: 15,
      medida: "Fotografía real · 16:9 · 1600×900",
      ratio: "16 / 9",
      elemento: "destellos secuenciales",
    },
  },
  {
    n: 106,
    familia: 8,
    tipo: "luz",
    es: "Luces de guía para el vuelo en circuito",
    en: "Circling guidance lights",
    linea: "Luces extra para encontrar la pista cuando el circuito es difícil",
    consulta: true,
  },
  {
    n: 107,
    familia: 8,
    tipo: "luz",
    es: "Sistema de luces de entrada a la pista",
    en: "Runway lead-in lighting system",
    linea: "Grupos de destellos que te llevan por una trayectoria concreta, no recta",
    consulta: true,
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-42",
      medida: "Ilustración técnica · 16:9 · 1600×900",
      ratio: "16 / 9",
      descripcion:
        "Trayectoria curva que evita un relieve, con grupos de al menos tres luces a lo largo, el umbral al final y una flecha que marque el sentido de los destellos hacia la pista. Ojo: si la trayectoria fuera recta no haría falta el sistema.",
    },
  },
  {
    n: 108,
    familia: 8,
    tipo: "luz",
    es: "Luces de identificación de umbral de pista",
    en: "Runway threshold identification lights",
    linea: "Dos destellos blancos a los lados del umbral, para encontrarlo cuando cuesta verlo",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-43",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Dos destellos blancos simétricos respecto del eje, por fuera de las filas de luces de borde, con la fila verde de umbral entre los dos. Ojo: destellos blancos, nunca de color.",
    },
  },
  {
    n: 109,
    familia: 8,
    tipo: "luz",
    es: "PAPI",
    en: "Precision approach path indicator",
    linea: "Cuatro cajas: dos rojas y dos blancas es senda, cuatro rojas es muy bajo",
    imagen: {
      clase: "prestada",
      codigo: "AP-15-04",
      de: "leccion",
      leccion: 15,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "PAPI",
    },
  },
  {
    n: 110,
    familia: 8,
    tipo: "luz",
    es: "APAPI",
    en: "Abbreviated PAPI",
    linea: "El PAPI de dos cajas: una roja y una blanca es senda",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-44",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Solo dos cajas, al lado izquierdo de la pista, la interior roja y la exterior blanca, con las luces de borde al fondo. Ojo: cuatro cajas ya serían un PAPI.",
    },
  },
  {
    n: 111,
    familia: 8,
    tipo: "luz",
    es: "T-VASIS",
    en: "T-VASIS",
    linea: "Veinte elementos en forma de T: solo la barra de ala significa en senda",
    consulta: true,
    nota: "En retiro desde 2020",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-45",
      medida: "Ilustración técnica · 16:9 · 1600×900",
      ratio: "16 / 9",
      descripcion:
        "Las cuatro situaciones en columna: la barra de ala sola cuando vas en senda, la barra más una a tres luces hacia arriba si vas alto, lo mismo hacia abajo si vas bajo, y todo rojo muy bajo. Ojo: ningún PAPI en el cuadro.",
    },
  },
  {
    n: 112,
    familia: 8,
    tipo: "luz",
    es: "AT-VASIS",
    en: "AT-VASIS",
    linea: "El T-VASIS de un solo lado de la pista",
    consulta: true,
    nota: "En retiro desde 2020",
    imagen: { clase: "prestada", codigo: "AP-CAT-45", de: "catalogo" },
  },
  {
    n: 113,
    familia: 8,
    tipo: "luz",
    es: "Superficie de protección contra obstáculos",
    en: "Obstacle protection surface",
    linea: "La superficie que protege la senda del indicador visual: es diseño, no algo que veas",
    consulta: true,
  },
  {
    n: 114,
    familia: 8,
    tipo: "luz",
    es: "Aplicación de los indicadores visuales de pendiente",
    en: "Application of VASIS",
    linea: "Cuándo es obligatorio poner PAPI o APAPI y cuál corresponde a cada clave",
    consulta: true,
  },

  // ── Familia 9 · Luces de la pista y del aeródromo ─────────────────────────────
  {
    n: 115,
    familia: 9,
    tipo: "luz",
    es: "Luces de borde de pista",
    en: "Runway edge lights",
    linea: "Las dos filas blancas que dibujan el ancho de la pista",
    imagen: {
      clase: "prestada",
      codigo: "AP-13-03",
      de: "leccion",
      leccion: 13,
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "borde de pista",
    },
  },
  {
    n: 116,
    familia: 9,
    tipo: "luz",
    es: "Tramo amarillo de las luces de borde",
    en: "Runway edge lights, yellow section",
    linea: "El último tramo se puede ver amarillo: te queda poca pista",
    nota: "Es permisivo, no obligatorio",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-46",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "El punto exacto donde las luces de borde blancas pasan a amarillas, con la fila roja de extremo al fondo y las luces de eje para dar distancia. Ojo: el tramo amarillo es el último, no el del extremo de despegue.",
    },
  },
  {
    n: 117,
    familia: 9,
    tipo: "luz",
    es: "Luces de borde rojas hacia un umbral desplazado",
    en: "Runway edge lights before a displaced threshold",
    linea: "Antes del umbral desplazado las ves rojas desde la aproximación",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-47",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Luces de borde rojas en el tramo anterior al umbral desplazado, la fila verde de umbral y las luces blancas más allá, con el cambio de color perfectamente definido. Ojo: ninguna barra de ala en la misma toma.",
    },
  },
  {
    n: 118,
    familia: 9,
    tipo: "luz",
    es: "Luces de umbral de pista",
    en: "Runway threshold lights",
    linea: "La fila verde que marca dónde empieza la pista utilizable",
    imagen: {
      clase: "prestada",
      codigo: "AP-13-04",
      de: "leccion",
      leccion: 13,
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "umbral verde",
    },
  },
  {
    n: 119,
    familia: 9,
    tipo: "luz",
    es: "Luces de barra de ala",
    en: "Wing bar lights",
    linea: "Grupos verdes a los lados del umbral, para verlo mejor o si no hay fila completa",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-48",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Dos grupos de al menos cinco luces verdes, simétricos respecto del eje, que salen hacia afuera desde el umbral, con la luz más interna alineada con las de borde. Ojo: verdes, y nunca menos de cinco por grupo.",
    },
  },
  {
    n: 120,
    familia: 9,
    tipo: "luz",
    es: "Luces de extremo de pista",
    en: "Runway end lights",
    linea: "La fila roja del final: ahí se acaba la pista",
    imagen: {
      clase: "prestada",
      codigo: "AP-13-05",
      de: "leccion",
      leccion: 13,
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "extremo rojo",
    },
  },
  {
    n: 121,
    familia: 9,
    tipo: "luz",
    es: "Luces de eje de pista",
    en: "Runway centre line lights",
    linea: "Blancas, luego rojas y blancas alternadas, luego rojas: te cuentan lo que queda",
    imagen: {
      clase: "prestada",
      codigo: "AP-13-07",
      de: "leccion",
      leccion: 13,
      medida: "Ilustración técnica · 16:9 · 1600×900",
      ratio: "16 / 9",
      elemento: "eje de pista",
    },
  },
  {
    n: 122,
    familia: 9,
    tipo: "luz",
    es: "Luces de eje para el despegue hasta un umbral desplazado",
    en: "Centre line guidance for take-off to a displaced threshold",
    linea: "Guía de eje en el tramo que solo sirve para despegar",
    consulta: true,
  },
  {
    n: 123,
    familia: 9,
    tipo: "luz",
    es: "Luces de zona de toma de contacto",
    en: "Runway touchdown zone lights",
    linea: "Barretas blancas en la zona de toque: la alfombra de la CAT II y III",
    imagen: {
      clase: "prestada",
      codigo: "AP-13-02",
      de: "leccion",
      leccion: 13,
      medida: "Fotografía real · 16:9 · 1600×900",
      ratio: "16 / 9",
      elemento: "zona de toma de contacto",
    },
  },
  {
    n: 124,
    familia: 9,
    tipo: "luz",
    es: "Luces simples de zona de toma de contacto",
    en: "Simple touchdown zone lights",
    linea: "Un par de luces blancas a cada lado: si no tocaste ahí, considera irte al aire",
    consulta: true,
    nota: "Colombia no lo transpone",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-49",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Un par de luces blancas a cada lado del eje, apenas pasada la última marca de zona de toma de contacto, que se ve pintada en el mismo cuadro. Ojo: sin las barretas completas, porque estas las reemplazan.",
    },
  },
  {
    n: 125,
    familia: 9,
    tipo: "luz",
    es: "Luces indicadoras de calle de salida rápida",
    en: "Rapid exit taxiway indicator lights",
    linea: "Grupos de luces amarillas en la pista que cuentan lo que falta para la salida rápida",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-50",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Dos juegos de luces amarillas empotradas en la pista, del mismo lado del eje que la salida, con la calle de salida rápida curvándose al frente. Ojo: nunca del lado contrario a la salida.",
    },
  },
  {
    n: 126,
    familia: 9,
    tipo: "luz",
    es: "Luces de zona de parada",
    en: "Stopway lights",
    linea: "Rojas vistas desde la pista: eso ya no es pista, es zona de parada",
    consulta: true,
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-51",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Dos filas de luces rojas que continúan las de borde de pista, con una fila roja transversal en el extremo y el cambio de pavimento visible. Ojo: en la zona de parada no hay luces blancas.",
    },
  },
  {
    n: 127,
    familia: 9,
    tipo: "luz",
    es: "Faro de aeródromo",
    en: "Aerodrome beacon",
    linea: "El destello verde y blanco que te dice dónde está el aeropuerto de noche",
    imagen: {
      clase: "prestada",
      codigo: "AP-16-02",
      de: "leccion",
      leccion: 16,
      medida: "Fotografía real · 16:9 · 1600×900",
      ratio: "16 / 9",
      elemento: "faro de aeródromo",
    },
  },
  {
    n: 128,
    familia: 9,
    tipo: "luz",
    es: "Faro de identificación",
    en: "Identification beacon",
    linea: "Destellos verdes que deletrean en Morse el identificador del aeródromo",
    consulta: true,
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-52",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Destello verde puntual en el terreno del aeródromo, de noche, con la pista iluminada al fondo y poca luz alrededor. Ojo: el verde y blanco alternado es el faro de aeródromo, que es otra ficha.",
    },
  },
  {
    n: 129,
    familia: 9,
    tipo: "luz",
    es: "Iluminación de emergencia",
    en: "Emergency lighting",
    linea: "El juego mínimo que se despliega si el aeropuerto se queda sin energía secundaria",
    consulta: true,
  },

  // ── Familia 10 · Luces de calle de rodaje y anti incursión ─────────────────────
  {
    n: 130,
    familia: 10,
    tipo: "luz",
    es: "Luces de eje de calle de rodaje",
    en: "Taxiway centre line lights",
    linea: "La cadena verde que sigue el eje amarillo",
    imagen: {
      clase: "prestada",
      codigo: "AP-14-02",
      de: "leccion",
      leccion: 14,
      medida: "Fotografía real · 16:9 · 1600×900",
      ratio: "16 / 9",
      elemento: "eje verde",
    },
  },
  {
    n: 131,
    familia: 10,
    tipo: "luz",
    es: "Codificación verde y amarillo del eje de salida",
    en: "Exit taxiway centre line lights, alternate green/yellow",
    linea: "Verde y amarillo alternados mientras estás dentro del área crítica del ILS",
    imagen: {
      clase: "prestada",
      codigo: "AP-14-05",
      de: "leccion",
      leccion: 14,
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "verde y amarillo",
    },
  },
  {
    n: 132,
    familia: 10,
    tipo: "luz",
    es: "Luces de borde de calle de rodaje",
    en: "Taxiway edge lights",
    linea: "Las azules del borde: entre ellas es calle de rodaje",
    imagen: {
      clase: "prestada",
      codigo: "AP-14-02",
      de: "leccion",
      leccion: 14,
      medida: "Fotografía real · 16:9 · 1600×900",
      ratio: "16 / 9",
      elemento: "borde azul",
    },
  },
  {
    n: 133,
    familia: 10,
    tipo: "luz",
    es: "Luces de plataforma de viraje en la pista",
    en: "Runway turn pad lights",
    linea: "Verdes que guían el giro de 180 grados sobre la plataforma de viraje",
    consulta: true,
  },
  {
    n: 134,
    familia: 10,
    tipo: "luz",
    es: "Barras de parada",
    en: "Stop bars",
    linea: "Fila de luces rojas a lo ancho: encendida no se cruza, ni con autorización",
    imagen: {
      clase: "prestada",
      codigo: "AP-14-03",
      de: "leccion",
      leccion: 14,
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "barra de parada",
    },
  },
  {
    n: 135,
    familia: 10,
    tipo: "luz",
    es: "Luces elevadas complementarias de la barra de parada",
    en: "Elevated lights added to a stop bar",
    linea: "Un par de rojas elevadas a cada extremo, para cuando el fuselaje o la nieve tapan las empotradas",
    consulta: true,
  },
  {
    n: 136,
    familia: 10,
    tipo: "luz",
    es: "Luces de punto de espera intermedio",
    en: "Intermediate holding position lights",
    linea: "Tres luces amarillas fijas: paras ahí cuando te lo indican",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-53",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Exactamente tres luces amarillas fijas empotradas, en línea perpendicular al eje y simétricas, a 0,3 m antes de la señal de una sola línea de trazos, del lado del que llega, con el eje verde siguiendo más allá. Ojo: rojas serían barra de parada.",
    },
  },
  {
    n: 137,
    familia: 10,
    tipo: "luz",
    es: "Luces de protección de pista, configuración A",
    en: "Runway guard lights, configuration A",
    linea: "Los dos pares de amarillas que destellan a los lados: viene una pista",
    imagen: {
      clase: "prestada",
      codigo: "AP-14-04",
      de: "leccion",
      leccion: 14,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "protección de pista A",
    },
  },
  {
    n: 138,
    familia: 10,
    tipo: "luz",
    es: "Luces de protección de pista, configuración B",
    en: "Runway guard lights, configuration B",
    linea: "Fila de amarillas a lo ancho de la calle que destella en ola",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-54",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Fila de luces amarillas empotradas cruzando todo el ancho de la calle, con la señal A2 justo delante y parte de la fila apagada para que se lea la ola. Ojo: ni patrón A1 ni barra de parada roja.",
    },
  },
  {
    n: 139,
    familia: 10,
    tipo: "luz",
    es: "Barra de prohibición de acceso",
    en: "No-entry bar",
    linea: "Rojas a lo ancho al final de una salida exclusiva: por ahí no se entra",
    nota: "Colombia lo tiene reservado",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-55",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Fila de luces rojas empotradas cruzando el ancho de la calle, con un par de rojas elevadas en cada extremo y el letrero de prohibida la entrada al costado. Ojo: ningún eje verde encendido más allá de la barra.",
    },
  },
  {
    n: 140,
    familia: 10,
    tipo: "luz",
    es: "Luces de salida de la instalación de deshielo",
    en: "De-icing facility exit lights",
    linea: "Amarillas empotradas en el límite de salida de la plataforma de deshielo",
    consulta: true,
    nota: "Colombia lo tiene reservado",
  },
  {
    n: 141,
    familia: 10,
    tipo: "luz",
    es: "Luces de punto de espera en la vía de vehículos",
    en: "Road-holding position light",
    linea: "Semáforo o luz roja de destellos para el conductor que entra a la pista",
    consulta: true,
  },
  {
    n: 142,
    familia: 10,
    tipo: "luz",
    es: "Luces de entrada a la pista (REL)",
    en: "Runway entrance lights",
    linea: "Rojas que se prenden solas cuando entrar a la pista no es seguro",
    imagen: {
      clase: "prestada",
      codigo: "AP-14-07",
      de: "leccion",
      leccion: 14,
      medida: "Ilustración técnica · 16:9 · 1600×900",
      ratio: "16 / 9",
      elemento: "REL",
    },
  },
  {
    n: 143,
    familia: 10,
    tipo: "luz",
    es: "Luces de espera de despegue (THL)",
    en: "Take-off hold lights",
    linea: "Dos filas rojas junto al eje: no es seguro iniciar el despegue",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-56",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Dos filas de luces rojas empotradas a los lados de las luces de eje, que se extienden lejos hacia adelante, con el eje blanco entre las dos. Ojo: el avión quieto, que el mensaje es que no se despega.",
    },
  },
  {
    n: 144,
    familia: 10,
    tipo: "luz",
    es: "Sistema autónomo de aviso de incursión en la pista",
    en: "Autonomous runway incursion warning system",
    linea: "El sistema que enciende REL y THL sin pasar por el controlador",
    consulta: true,
  },

  // ── Familia 11 · Plataforma: guía y luces ──────────────────────────────────────
  {
    n: 145,
    familia: 11,
    tipo: "luz",
    es: "Iluminación de plataforma con proyectores",
    en: "Apron floodlighting",
    linea: "Proyectores desde dos o más direcciones para que no queden sombras en el puesto",
    consulta: true,
  },
  {
    n: 146,
    familia: 11,
    tipo: "luz",
    es: "Sistema de guía visual para el atraque",
    en: "Visual docking guidance system",
    linea: "La caja que te da azimut y punto de parada cuando no hay señalero",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-57",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "La unidad de azimut delante del avión, sobre la prolongación del eje del puesto, con el indicador de parada al lado, la indicación en verde y la barra de alineación pintada coincidiendo. Ojo: si hay pantalla con el tipo de avión, es el avanzado.",
    },
  },
  {
    n: 147,
    familia: 11,
    tipo: "luz",
    es: "Sistema avanzado de guía visual para el atraque",
    en: "Advanced visual docking guidance system",
    linea: "La pantalla que además te confirma el tipo de avión y la distancia que falta",
    nota: "Colombia no lo transpone",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-58",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Una pantalla única delante del puesto con el tipo y modelo de aeronave, la distancia que falta en cifras y el indicador de desplazamiento lateral. Ojo: el tipo escrito tiene que ser el del avión de la toma.",
    },
  },
  {
    n: 148,
    familia: 11,
    tipo: "luz",
    es: "Luces de guía para maniobras en el puesto de estacionamiento",
    en: "Aircraft stand manoeuvring guidance lights",
    linea: "Amarillas que siguen las señales del puesto y rojas en el punto de parada",
    consulta: true,
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-59",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Luces amarillas fijas siguiendo las señales pintadas del puesto y rojas fijas en el punto de parada, con el puesto vacío para que se vean sin obstrucción. Ojo: ninguna luz verde.",
    },
  },

  // ── Familia 12 · Obstáculos: señalamiento ──────────────────────────────────────
  {
    n: 149,
    familia: 12,
    tipo: "obstaculo",
    es: "Regla general de coloreado de objetos fijos",
    en: "Fixed objects: general",
    linea: "Si se puede pintar se pinta; si no, van balizas o banderas",
    consulta: true,
  },
  {
    n: 150,
    familia: 12,
    tipo: "obstaculo",
    es: "Señal a cuadros (damero)",
    en: "Chequered marking",
    linea: "El damero naranja y blanco de los tanques y edificios grandes",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-67",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "El damero completo con los rectángulos contables, al menos dos filas y dos columnas, las esquinas del objeto pintadas del color oscuro y un pedazo de aeródromo al fondo. Ojo: ni rectángulos desiguales ni fajas.",
    },
  },
  {
    n: 151,
    familia: 12,
    tipo: "obstaculo",
    es: "Fajas alternas contrastantes",
    en: "Alternating contrasting bands",
    linea: "Las fajas de las antenas y chimeneas altas y delgadas",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-68",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Las fajas alternas contables de abajo arriba, perpendiculares a la dimensión mayor, con los dos extremos del objeto del color oscuro y el objeto claramente más alto que ancho. Ojo: ni anchos desiguales ni fajas verticales.",
    },
  },
  {
    n: 152,
    familia: 12,
    tipo: "obstaculo",
    es: "Color único",
    en: "Single conspicuous colour",
    linea: "Naranja o rojo entero cuando el objeto es pequeño en las dos dimensiones",
    consulta: true,
  },
  {
    n: 153,
    familia: 12,
    tipo: "obstaculo",
    es: "Banderas en objetos fijos",
    en: "Flags on fixed objects",
    linea: "Banderas encima o alrededor de lo que no se puede pintar",
    consulta: true,
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-60",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Banderas a intervalos regulares en el borde más alto de un objeto fijo y al menos una cuadriculada sobre un objeto móvil, con la diferencia de tamaño evidente contra el cielo. Ojo: ni banderas de país ni publicitarias.",
    },
  },
  {
    n: 154,
    familia: 12,
    tipo: "obstaculo",
    es: "Banderas en objetos móviles",
    en: "Flags on mobile objects",
    linea: "Las mismas banderas, más grandes, sobre vehículos y equipos",
    consulta: true,
    imagen: { clase: "prestada", codigo: "AP-CAT-60", de: "catalogo" },
  },
  {
    n: 155,
    familia: 12,
    tipo: "obstaculo",
    es: "Balizas sobre o junto a objetos",
    en: "Markers on or adjacent to objects",
    linea: "Deben reconocerse a 1 000 m desde el aire y a 300 m desde tierra",
    consulta: true,
  },
  {
    n: 156,
    familia: 12,
    tipo: "obstaculo",
    es: "Baliza esférica de cables aéreos",
    en: "Spherical marker on overhead wires",
    linea: "Las bolas de colores que cuelgan de los cables de alta tensión",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-61",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Al menos cuatro esferas a intervalos regulares a lo largo del cable, alternando dos colores, con las torres de sostén coloreadas y el valle o el río que la línea cruza. Ojo: separaciones iguales, nunca un solo color.",
    },
  },
  {
    n: 157,
    familia: 12,
    tipo: "obstaculo",
    es: "Aerogenerador: señalamiento",
    en: "Wind turbine marking",
    linea: "Álabes, barquilla y la parte alta del mástil pintados de blanco",
    nota: "Chile pinta el primer tercio de rojo",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-69",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Los tres álabes y la barquilla en blanco y los dos tercios superiores del mástil también, con el cambio de tono a la altura exacta donde termina el blanco y el parque para dar escala. Ojo: ni franjas rojas ni luces encendidas de día.",
    },
  },
  {
    n: 158,
    familia: 12,
    tipo: "obstaculo",
    es: "Vehículos y objetos móviles en el área de movimiento",
    en: "Vehicles and mobile objects",
    linea: "Cada vehículo lleva color y luz según sea de emergencia o de servicio",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-62",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "Un vehículo de emergencia de color vivo con luz azul de destellos y uno de servicio amarillo con luz amarilla, las dos en el punto más alto, con la plataforma al fondo. Ojo: la azul es solo de emergencia.",
    },
  },
  {
    n: 159,
    familia: 12,
    tipo: "obstaculo",
    es: "Objetos de movilidad limitada (pasarelas de embarque)",
    en: "Objects with limited mobility",
    linea: "Las pasarelas llevan luz roja fija: también son obstáculos",
    consulta: true,
  },
  {
    n: 160,
    familia: 12,
    tipo: "obstaculo",
    es: "Banderas de objetos móviles, medida nacional",
    en: "(National variation)",
    linea: "Colombia admite banderas más pequeñas que el mínimo del Anexo 14",
    consulta: true,
    nota: "RAC 14 Colombia",
  },
  {
    n: 161,
    familia: 12,
    tipo: "obstaculo",
    es: "Mástil de aerogenerador, variante nacional",
    en: "(National variation)",
    linea: "Chile exige además el primer tercio del mástil en rojo",
    consulta: true,
    nota: "Norma nacional de Chile",
  },

  // ── Familia 13 · Obstáculos: iluminación ───────────────────────────────────────
  {
    n: 162,
    familia: 13,
    tipo: "obstaculo",
    es: "Los diez tipos de luz de obstáculo",
    en: "Table 6-1: the ten obstacle light types",
    linea: "El cuadro completo de color, destello e intensidad de las diez luces normalizadas",
    consulta: true,
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-63",
      medida: "Ilustración técnica · 16:9 · 1600×900",
      ratio: "16 / 9",
      descripcion:
        "Las diez filas en orden, de la baja A a la E, la mediana A a la C y la alta A y B, cada una con su color exacto, la distinción clara entre fija y de destellos y la intensidad en cifras. Ojo: ninguna luz verde.",
    },
  },
  {
    n: 163,
    familia: 13,
    tipo: "obstaculo",
    es: "Baja intensidad Tipo A",
    en: "Low-intensity obstacle light, Type A",
    linea: "Roja fija de baja intensidad, en objetos fijos poco extensos",
    consulta: true,
    imagen: { clase: "prestada", codigo: "AP-CAT-63", de: "catalogo" },
  },
  {
    n: 164,
    familia: 13,
    tipo: "obstaculo",
    es: "Baja intensidad Tipo B",
    en: "Low-intensity obstacle light, Type B",
    linea: "Roja fija, más intensa que la Tipo A, sola o con la mediana roja",
    consulta: true,
    imagen: { clase: "prestada", codigo: "AP-CAT-63", de: "catalogo" },
  },
  {
    n: 165,
    familia: 13,
    tipo: "obstaculo",
    es: "Baja intensidad Tipo C",
    en: "Low-intensity obstacle light, Type C",
    linea: "La luz de destellos de los vehículos: azul en emergencia, amarilla en los demás",
    consulta: true,
    imagen: { clase: "prestada", codigo: "AP-CAT-62", de: "catalogo" },
  },
  {
    n: 166,
    familia: 13,
    tipo: "obstaculo",
    es: "Baja intensidad Tipo D",
    en: "Low-intensity obstacle light, Type D",
    linea: "La luz amarilla de destellos del vehículo «sígame»",
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-64",
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      descripcion:
        "El vehículo guía con su tablero trasero visible y la luz amarilla de destellos en el punto más alto, con el eje amarillo de la calle por delante. Ojo: ningún otro vehículo, para no confundirla con la Tipo C.",
    },
  },
  {
    n: 167,
    familia: 13,
    tipo: "obstaculo",
    es: "Baja intensidad Tipo E",
    en: "Low-intensity obstacle light, Type E",
    linea: "Roja de destellos que acompaña a la barquilla del aerogenerador",
    consulta: true,
    imagen: { clase: "prestada", codigo: "AP-CAT-63", de: "catalogo" },
  },
  {
    n: 168,
    familia: 13,
    tipo: "obstaculo",
    es: "Mediana intensidad Tipo A",
    en: "Medium-intensity obstacle light, Type A",
    linea: "Blanca de destellos que se ve también de día",
    imagen: {
      clase: "prestada",
      codigo: "AP-16-03",
      de: "leccion",
      leccion: 16,
      medida: "Ilustración técnica · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "blanca de destellos",
    },
  },
  {
    n: 169,
    familia: 13,
    tipo: "obstaculo",
    es: "Mediana intensidad Tipo B",
    en: "Medium-intensity obstacle light, Type B",
    linea: "Roja de destellos, solo para uso nocturno",
    consulta: true,
    imagen: { clase: "prestada", codigo: "AP-CAT-63", de: "catalogo" },
  },
  {
    n: 170,
    familia: 13,
    tipo: "obstaculo",
    es: "Mediana intensidad Tipo C",
    en: "Medium-intensity obstacle light, Type C",
    linea: "Roja fija de mediana intensidad, solo para uso nocturno",
    consulta: true,
    imagen: { clase: "prestada", codigo: "AP-CAT-63", de: "catalogo" },
  },
  {
    n: 171,
    familia: 13,
    tipo: "obstaculo",
    es: "Alta intensidad Tipo A",
    en: "High-intensity obstacle light, Type A",
    linea: "La blanca potentísima de las torres altas, visible a pleno sol",
    imagen: {
      clase: "prestada",
      codigo: "AP-16-05",
      de: "leccion",
      leccion: 16,
      medida: "Fotografía real · 16:9 · 1600×900",
      ratio: "16 / 9",
      elemento: "alta intensidad",
    },
  },
  {
    n: 172,
    familia: 13,
    tipo: "obstaculo",
    es: "Alta intensidad Tipo B",
    en: "High-intensity obstacle light, Type B",
    linea: "La misma idea pero para las torres que sostienen cables",
    consulta: true,
    imagen: { clase: "prestada", codigo: "AP-CAT-65", de: "catalogo" },
  },
  {
    n: 173,
    familia: 13,
    tipo: "obstaculo",
    es: "Sistema dual de iluminación de obstáculos",
    en: "Dual obstacle lighting system",
    linea: "Blanca de día y roja de noche, para no encandilar cerca del aeropuerto",
    consulta: true,
  },
  {
    n: 174,
    familia: 13,
    tipo: "obstaculo",
    es: "Iluminación de torres de catenaria",
    en: "Catenary support tower lighting",
    linea: "Tres niveles de luz blanca que destellan en un orden fijo: medio, arriba, abajo",
    consulta: true,
    imagen: {
      clase: "propia",
      codigo: "AP-CAT-65",
      medida: "Ilustración técnica · 16:9 · 1600×900",
      ratio: "16 / 9",
      descripcion:
        "La torre completa y el cable formando la catenaria, con tres niveles marcados: la cima, el punto más bajo del cable y la mitad entre los dos. El del medio destella primero, luego el de arriba y por último el de abajo. Ojo: el orden no se cambia.",
    },
  },
  {
    n: 175,
    familia: 13,
    tipo: "obstaculo",
    es: "Parque eólico",
    en: "Wind farm lighting",
    linea: "Se ilumina el perímetro y todas las turbinas destellan al mismo tiempo",
    imagen: {
      clase: "prestada",
      codigo: "AP-16-04",
      de: "leccion",
      leccion: 16,
      medida: "Fotografía real · 3:2 · 1200×800",
      ratio: "3 / 2",
      elemento: "parque eólico",
    },
  },
  {
    n: 176,
    familia: 13,
    tipo: "obstaculo",
    es: "Niveles intermedios y espaciamientos",
    en: "Intermediate levels and spacing",
    linea: "Las cifras de cada cuántos metros va un nivel de luces según el tipo",
    consulta: true,
  },
  {
    n: 177,
    familia: 13,
    tipo: "obstaculo",
    es: "Sistema autónomo de detección de aeronaves",
    en: "Autonomous aircraft detection lighting system",
    linea: "Un parque eólico puede estar apagado hasta que te detecta: sin luces no es sin obstáculo",
    consulta: true,
  },
]

/** Total de fichas del catálogo. */
export const AP_CAT_TOTAL = AP_CAT_FICHAS.length

/**
 * A dónde lleva una imagen prestada de lección.
 *
 * Mientras la imagen sea un hueco, esto es lo único que le queda al piloto: el
 * catálogo enseña de qué lección sale y la lección la abre por su número.
 */
export function leccionDe(imagen: ApCatImagenPrestada): string | undefined {
  return imagen.leccion ? `${AP_APRENDE}?l=${imagen.leccion}` : undefined
}

/**
 * Sin tildes y en minúscula, para que «senal» encuentre «señal» y «balizas»
 * encuentre «Balizas». La ñ se normaliza a n a propósito: en el teléfono casi
 * nadie la escribe al buscar.
 */
export function normalizar(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

/**
 * El filtro del catálogo: primero el tipo, después el texto.
 *
 * Busca en el nombre español, en el inglés, en la línea y en el código de la
 * imagen, que es como lo busca quien está produciendo las imágenes. Todos los
 * términos tienen que aparecer, en cualquier orden y en cualquiera de esos
 * campos: así «letrero rojo» y «rojo letrero» dan lo mismo.
 */
export function filtrarFichas(
  texto: string,
  tipo: ApCatTipo | "todas"
): ApCatFicha[] {
  const terminos = normalizar(texto).split(/\s+/).filter(Boolean)
  return AP_CAT_FICHAS.filter((f) => {
    if (tipo !== "todas" && f.tipo !== tipo) return false
    if (terminos.length === 0) return true
    const heno = normalizar(
      [f.es, f.en, f.linea, f.nota ?? "", f.imagen?.codigo ?? ""].join(" ")
    )
    return terminos.every((t) => heno.includes(t))
  })
}

/** Cuántas fichas hay de cada tipo, para los contadores de los filtros. */
export function contarPorTipo(fichas: ApCatFicha[]): Record<ApCatTipo, number> {
  const cuenta: Record<ApCatTipo, number> = {
    senal: 0,
    letrero: 0,
    luz: 0,
    baliza: 0,
    obstaculo: 0,
  }
  for (const f of fichas) cuenta[f.tipo] += 1
  return cuenta
}
