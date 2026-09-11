/**
 * Las nueve clases de mercancías peligrosas.
 *
 * Las clases y divisiones son las de la Parte 2 de las Instrucciones Técnicas
 * de la OACI, iguales en todo el mundo. El texto de cada definición se toma de
 * su transcripción en el RAC 175.1010 (Edición original, marzo 2016), recortado
 * solo donde el artículo se alarga con paréntesis. El riesgo en una línea, los
 * ejemplos y las notas son del curso, y lo dicen: cuando un ejemplo viene del
 * propio reglamento, se marca.
 *
 * Sobre el color: sale del rombo oficial, no de una paleta inventada. Por eso
 * hay clases que lo comparten (la 3 y la 4 son rojas, la 5.1 y la 7 amarillas)
 * y clases cuyo rombo es blanco o blanco y negro (la 6, la 8 y la 9). Eso NO es
 * un descuido: rojo significa inflamable las dos veces, y el piloto tiene que
 * leer esa señal como la va a ver en una bodega.
 *
 * Como el color no distingue las nueve, quien distingue es el rombo: donde haya
 * que identificar una clase se pone su etiqueta real, nunca un cuadro de color
 * con un número. El color solo tiñe bordes y acentos.
 */

export interface Division {
  /** "1.1", "2.3"… Es también el nombre del archivo del rombo. */
  id: string
  /** Qué es esa división, con las palabras de la Tabla E.2. */
  txt: string
  /** El desarrollo del 175.1010, cuando la línea de la tabla no basta. */
  detalle?: string
}

/** Un grupo dentro de la clase que no es división: las categorías de la 7, los grupos de la 9. */
export interface Subgrupo {
  id: string
  txt: string
}

export interface ClaseMP {
  /** "1" a "9". */
  n: string
  /** Nombre corto, para chips y tablas. */
  corto: string
  /** Nombre completo de la clase, como en la Tabla E.2. */
  nombre: string
  /** Color del rombo oficial. Tiñe bordes y acentos, no identifica por sí solo. */
  color: string
  /** El riesgo principal en una línea, con palabras del curso. */
  riesgo: string
  /** La definición de la clase, como la transcribe el reglamento. */
  definicion: string
  /** Artículo de la definición. */
  ref?: string
  ejemplos: string[]
  divisiones: Division[]
  /** Rótulo de los subgrupos, si los hay: "Categorías de etiqueta", "Grupos de la clase". */
  subgruposTitulo?: string
  subgrupos?: Subgrupo[]
  /**
   * Rombos que le corresponden, por id de archivo en
   * public/infografias/mercancias/clase-<id>.webp. Cuando la clase no tiene
   * división propia es uno solo y su id es el número de la clase.
   */
  rombos: string[]
  /** Si a la clase le aplica grupo de embalaje (175.426 (a)). */
  ge: boolean
  /** Matiz del grupo de embalaje: "salvo la división 5.2". */
  geNota?: string
  /** Lo que hay que llevarse de esa clase, si hay algo que subrayar. */
  nota?: string
}

export const CLASES: ClaseMP[] = [
  {
    n: "1",
    corto: "Explosivos",
    nombre: "Explosivos",
    color: "#E87722",
    riesgo: "Reacción química que explota, proyecta fragmentos o produce fuego, humo o ruido.",
    definicion:
      "Comprende las sustancias explosivas (no se incluyen las que no son en sí mismas explosivas pero pueden formar mezclas explosivas de gases, vapores o polvo), excepto las demasiado peligrosas para el transporte o aquellas cuyo riesgo principal corresponde a otra clase; los objetos explosivos, excepto los artefactos cuya ignición o cebado por inadvertencia durante el transporte no daría ninguna manifestación exterior; y las sustancias y objetos fabricados para producir un efecto explosivo o pirotécnico.",
    ejemplos: ["Municiones", "Pirotecnia", "Detonadores", "Cordón detonante"],
    divisiones: [
      { id: "1.1", txt: "Peligro de explosión en masa" },
      { id: "1.2", txt: "Peligro de proyección, pero no de explosión en masa" },
      {
        id: "1.3",
        txt: "Peligro de incendio y peligro menor de explosión o de proyección, o ambos, pero no de explosión en masa",
      },
      { id: "1.4", txt: "No presentan peligro apreciable" },
      { id: "1.5", txt: "Sustancias muy insensibles que tienen peligro de explosión en masa" },
      { id: "1.6", txt: "Objetos sumamente insensibles que no tienen peligro de explosión en masa" },
    ],
    rombos: ["1-1", "1-4"],
    ge: false,
    nota: "Las divisiones describen el tipo de peligro, no una escala del 1 al 6: la 1.5 vuelve a tener peligro de explosión en masa. Las etiquetas de 1.1, 1.2, 1.5 y 1.6 llevan la advertencia de que normalmente esos bultos no se transportan por vía aérea.",
  },
  {
    n: "2",
    corto: "Gases",
    nombre: "Gases",
    color: "#1E8A4C",
    riesgo: "Gas a presión: puede ser inflamable, tóxico o solo estar comprimido, pero todos empujan.",
    definicion:
      "Pertenecen a esta clase los gases comprimidos, gases licuados, gases disueltos, gases licuados refrigerados, mezclas de uno o más gases con uno o más vapores de sustancias de otras clases, objetos cargados con gas y aerosoles.",
    ejemplos: ["Aerosoles", "Extintores", "Oxígeno", "Butano", "Objetos cargados con gas"],
    divisiones: [
      { id: "2.1", txt: "Gases inflamables" },
      { id: "2.2", txt: "Gases no inflamables, no tóxicos" },
      { id: "2.3", txt: "Gases tóxicos" },
    ],
    rombos: ["2-1", "2-2", "2-3"],
    ge: false,
    nota: "El rombo cambia con la división: rojo el inflamable, verde el no inflamable y blanco con calavera el tóxico. La 2.2 sin riesgo secundario es una de las admitidas en cantidades exceptuadas.",
  },
  {
    n: "3",
    corto: "Líq. inflamables",
    nombre: "Líquidos inflamables",
    color: "#D0102E",
    riesgo:
      "Despiden vapores inflamables por debajo de 60,5 °C en crisol cerrado o 65,6 °C en crisol abierto: el punto de inflamación.",
    definicion:
      "Líquidos, mezclas de líquidos o líquidos que contienen sólidos en solución o en suspensión (por ejemplo pinturas, barnices y lacas, pero no las sustancias con otra clasificación por sus características peligrosas) que despiden vapores inflamables a temperaturas que no exceden de 60,5 °C en crisol cerrado o de 65,6 °C en crisol abierto: el punto de inflamación. Comprende también los explosivos insensibilizados líquidos.",
    ejemplos: ["Gasolina", "Pinturas, barnices y lacas", "Thinner", "Perfumes", "Algunos adhesivos"],
    divisiones: [],
    rombos: ["3"],
    ge: true,
    nota: "Ojo con lo que añade cada país: en Colombia, por ejemplo, la clase 3 combustibles está prohibida en aeronaves monomotores y en aviación civil privada, salvo las excepciones para pasajeros y tripulantes. Lo ves en el nivel 3.",
  },
  {
    n: "4",
    corto: "Sól. inflamables",
    nombre: "Sólidos inflamables",
    color: "#D0102E",
    riesgo: "Sólidos que se inflaman con facilidad, se calientan solos o desprenden gas inflamable con el agua.",
    definicion:
      "Sólidos inflamables; sustancias susceptibles de combustión espontánea; sustancias que, en contacto con el agua, desprenden gases inflamables.",
    ejemplos: ["Fósforos", "Azufre", "Sodio metálico (4.3)", "Carburo de calcio (4.3)"],
    divisiones: [
      {
        id: "4.1",
        txt: "Sólidos inflamables, sustancias de reacción espontánea y conexas y explosivos sensibilizados",
        detalle:
          "Sólidos que, por las condiciones del transporte, se inflaman con facilidad o pueden provocar o activar incendios por fricción; sustancias de reacción espontánea que pueden experimentar una enérgica reacción exotérmica; o explosivos insensibilizados que pueden explotar si no están suficientemente diluidos.",
      },
      {
        id: "4.2",
        txt: "Sustancias susceptibles de combustión espontánea",
        detalle:
          "Pueden calentarse espontáneamente en las condiciones normales de transporte o al entrar en contacto con el aire, y entonces inflamarse.",
      },
      {
        id: "4.3",
        txt: "Sustancias que en contacto con el agua desprenden gases inflamables",
        detalle:
          "Por reacción con el agua pueden inflamarse espontáneamente o despedir gases inflamables en cantidades peligrosas.",
      },
    ],
    rombos: ["4-1", "4-2", "4-3"],
    ge: true,
    geNota: "salvo las sustancias de reacción espontánea de la 4.1",
    nota: "La 4.3 es la que cambia la respuesta: con esas no se echa agua, porque el agua es la que produce el gas. Las sustancias de reacción espontánea de la 4.1 se estiban lejos del sol y del calor.",
  },
  {
    n: "5",
    corto: "Comburentes",
    nombre: "Sustancias comburentes y peróxidos orgánicos",
    color: "#C08A00",
    riesgo: "Liberan oxígeno y alimentan el fuego de al lado; los peróxidos además se descomponen solos con el calor.",
    definicion: "Sustancias comburentes y peróxidos orgánicos.",
    ejemplos: [
      "Peróxido de hidrógeno en solución (5.1)",
      "Nitrato de amonio (5.1)",
      "Cloratos (5.1)",
      "Peróxido de benzoílo (5.2)",
    ],
    divisiones: [
      {
        id: "5.1",
        txt: "Sustancias comburentes",
        detalle:
          "Sin ser de por sí necesariamente combustibles, pueden generalmente, liberando oxígeno, causar o facilitar la combustión de otras sustancias.",
      },
      {
        id: "5.2",
        txt: "Peróxidos orgánicos",
        detalle:
          "Sustancias orgánicas con la estructura bivalente O-O, térmicamente inestables, que pueden descomponerse auto acelerada y exotérmicamente. Además pueden descomponerse con explosión, quemarse rápidamente, ser sensibles al impacto o al rozamiento, reaccionar peligrosamente con otras sustancias y afectar a la vista.",
      },
    ],
    rombos: ["5-1", "5-2"],
    ge: true,
    geNota: "salvo la división 5.2",
    nota: "No arden solas, pero alimentan el fuego de al lado: por eso no van junto a inflamables. Ojo con el color: la 5.1 es amarilla, pero la 5.2 va roja arriba y amarilla abajo. Mira los dos rombos.",
  },
  {
    n: "6",
    corto: "Tóxicas",
    nombre: "Sustancias tóxicas y sustancias infecciosas",
    color: "#2C3440",
    riesgo:
      "Causan muerte o lesión al ingerirse, inhalarse o por contacto con la piel; o contienen patógenos.",
    definicion: "Sustancias tóxicas y sustancias infecciosas.",
    ejemplos: ["Pesticidas", "Cianuros", "Muestras biológicas (6.2)", "Material de diagnóstico"],
    divisiones: [
      {
        id: "6.1",
        txt: "Sustancias tóxicas",
        detalle:
          "Pueden causar la muerte o lesiones, o afectar a la salud humana si se tragan, inhalan o entran en contacto con la piel. Aquí «venenoso» es sinónimo de «tóxico».",
      },
      {
        id: "6.2",
        txt: "Sustancias infecciosas",
        detalle:
          "Se sabe o se cree fundadamente que contienen agentes patógenos: bacterias, virus, ricketsias, parásitos, hongos y otros agentes como priones, que pueden causar enfermedades en humanos o animales.",
      },
    ],
    rombos: ["6-1", "6-2"],
    ge: true,
    geNota: "salvo la división 6.2",
  },
  {
    n: "7",
    corto: "Radiactivo",
    nombre: "Material radiactivo",
    color: "#C08A00",
    riesgo: "Emite radiación ionizante.",
    definicion:
      "Todo material que contenga radionucleídos en los cuales tanto la concentración de actividad como la actividad total del envío excedan los valores especificados en las Instrucciones Técnicas.",
    ejemplos: ["Isótopos médicos", "Equipos de medición nuclear"],
    divisiones: [],
    subgruposTitulo: "Categorías de etiqueta",
    subgrupos: [
      { id: "I", txt: "Blanca: fondo blanco, una franja roja" },
      { id: "II", txt: "Amarilla: mitad superior amarilla, dos franjas rojas, índice de transporte" },
      { id: "III", txt: "Amarilla: igual que la II, con tres franjas rojas" },
    ],
    rombos: ["7"],
    ge: false,
    nota: "Se etiqueta por categoría según el nivel de radiación en la superficie y lleva índice de transporte. Y encima del permiso aeronáutico va el del organismo nuclear del país: Servicio Geológico Colombiano en Colombia, CNEN en Brasil.",
  },
  {
    n: "8",
    corto: "Corrosivas",
    nombre: "Sustancias corrosivas",
    color: "#2C3440",
    riesgo: "Destruyen tejidos vivos o corroen otras mercancías y el propio avión.",
    definicion:
      "Sustancias que, por su acción química, causan lesiones graves al entrar en contacto con tejidos vivos o que, si se produce un escape, provocan daños de consideración a otras mercancías o a los medios de transporte, o incluso los destruyen.",
    ejemplos: ["Ácidos", "Baterías húmedas", "Mercurio", "Soda cáustica"],
    divisiones: [],
    rombos: ["8"],
    ge: true,
    nota: "Fíjate en el doble criterio de la definición: daño a tejidos vivos y daño a la carga o al medio de transporte. Los grupos II y III están admitidos en cantidades exceptuadas.",
  },
  {
    n: "9",
    corto: "Varias",
    nombre: "Sustancias y objetos peligrosos varios",
    color: "#2C3440",
    riesgo: "Riesgos que no cubre ninguna de las otras clases.",
    definicion:
      "Sustancias y objetos peligrosos varios, incluidas las sustancias potencialmente peligrosas para el medio ambiente: sustancias y objetos que, durante el transporte por vía aérea, presentan un riesgo distinto de los correspondientes a las demás clases.",
    ejemplos: [
      "Baterías de litio",
      "Hielo seco, dióxido de carbono sólido",
      "Imanes: material magnetizado",
      "Motores de combustión interna",
      "Equipos de salvamento de inflado automático",
      "Asbesto",
    ],
    divisiones: [],
    subgruposTitulo: "Grupos que incluye la clase",
    subgrupos: [
      { id: "A", txt: "Sustancias potencialmente peligrosas para el medio ambiente acuático" },
      { id: "B", txt: "Sustancias a temperaturas elevadas: 100 °C o más en líquido, 240 °C o más en sólido" },
      { id: "C", txt: "Microorganismos y organismos modificados genéticamente que no son infecciosos" },
      { id: "D", txt: "Material magnetizado: campo de 0,159 A/m o más a 2,1 m del bulto" },
      { id: "E", txt: "Sólidos o líquidos reglamentados para la aviación: narcóticos o malsanos que en un derrame impiden a la tripulación trabajar" },
    ],
    rombos: ["9"],
    ge: true,
    geNota: "depende de la sustancia; las baterías de litio no lo llevan",
    nota: "Aquí caen las baterías de litio, el artículo más frecuente de la aviación de hoy. Casi siempre se ubican mal, en la 3 o en la 8. Es la clase donde más aparecen artículos que parecen inocuos.",
  },
]

/** Ruta del rombo oficial de una división o clase. */
export function rombo(id: string): string {
  return `/infografias/mercancias/clase-${id}.webp`
}

/** Cuántas etiquetas de clase hay en el módulo, contando divisiones. */
export const ROMBOS_TOTAL = CLASES.reduce((t, c) => t + c.rombos.length, 0)
