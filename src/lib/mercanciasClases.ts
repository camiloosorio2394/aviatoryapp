/**
 * Las nueve clases de mercancías peligrosas.
 *
 * Las clases y divisiones son las de la Parte 2 de las Instrucciones Técnicas
 * de la OACI, iguales en todo el mundo. El texto de cada definición se toma de
 * su transcripción en el RAC 175.1010 (Edición original, marzo 2016), recortado
 * solo donde el artículo se alarga con paréntesis. Después de la definición
 * literal va «en otras palabras», que es la misma idea en el idioma del curso:
 * la norma se lee una vez y se entiende la otra.
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

/**
 * Un grupo dentro de la clase que no es división: las categorías de etiqueta de
 * la 7, los tipos de mercancía de la 9. `id` solo cuando el grupo de verdad se
 * numera: en la clase 9 no existen divisiones 9.A ni 9.B, así que ahí va sin id.
 */
export interface Subgrupo {
  id?: string
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
  /** La misma definición sin el idioma del reglamento. */
  enOtrasPalabras: string
  /** Artículo de la definición. */
  ref?: string
  ejemplos: string[]
  divisiones: Division[]
  /** Rótulo de los subgrupos, si los hay. */
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
  /** Lo que cambia la operación, cuando la clase tiene una condición propia. */
  importante?: string
}

export const CLASES: ClaseMP[] = [
  {
    n: "1",
    corto: "Explosivos",
    nombre: "Explosivos",
    color: "#E87722",
    riesgo:
      "Reacción química que puede producir una explosión, proyectar fragmentos o generar fuego, humo, presión o ruido.",
    definicion:
      "Comprende las sustancias explosivas (no se incluyen las que no son en sí mismas explosivas pero pueden formar mezclas explosivas de gases, vapores o polvo), excepto las demasiado peligrosas para el transporte o aquellas cuyo riesgo principal corresponde a otra clase; los objetos explosivos, excepto los artefactos cuya ignición o cebado por inadvertencia durante el transporte no daría ninguna manifestación exterior; y las sustancias y objetos fabricados para producir un efecto explosivo o pirotécnico.",
    enOtrasPalabras:
      "Esta clase reúne sustancias y objetos capaces de producir una explosión, una proyección, un incendio u otro efecto explosivo o pirotécnico. En aviación, lo importante es identificar qué tipo de peligro presenta el explosivo y en qué condiciones puede ser transportado.",
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
    rombos: ["1-1", "1-2", "1-3", "1-4", "1-5", "1-6"],
    ge: false,
    nota: "Las divisiones describen el tipo de peligro, no una escala del 1 al 6. Por eso, la división 1.5 vuelve a tener peligro de explosión en masa, aunque se trate de sustancias muy insensibles.",
    importante:
      "Las mercancías de Clase 1 están sujetas a restricciones específicas para el transporte aéreo. Algunas divisiones y grupos de compatibilidad están prohibidos o tienen condiciones especiales de transporte. Por eso, no basta con identificar una mercancía como «explosivo»: es necesario conocer su división y grupo de compatibilidad para determinar las condiciones aplicables.",
  },
  {
    n: "2",
    corto: "Gases",
    nombre: "Gases",
    color: "#1E8A4C",
    riesgo:
      "Gas a presión: puede ser inflamable, tóxico o no inflamable ni tóxico, pero en todos los casos el gas está contenido bajo presión o en condiciones especiales.",
    definicion:
      "Pertenecen a esta clase los gases comprimidos, gases licuados, gases disueltos, gases licuados refrigerados, mezclas de uno o más gases con uno o más vapores de sustancias de otras clases, objetos cargados con gas y aerosoles.",
    enOtrasPalabras:
      "Esta clase reúne gases que pueden encontrarse comprimidos, licuados o refrigerados y que, dependiendo de sus propiedades, pueden presentar peligro de incendio, toxicidad o presión. En aviación, lo importante es identificar qué tipo de gas es y cuál es su peligro principal antes de determinar las condiciones para su transporte.",
    ejemplos: ["Aerosoles", "Extintores", "Oxígeno", "Butano", "Objetos cargados con gas"],
    divisiones: [
      { id: "2.1", txt: "Gases inflamables" },
      { id: "2.2", txt: "Gases no inflamables, no tóxicos" },
      { id: "2.3", txt: "Gases tóxicos" },
    ],
    rombos: ["2-1", "2-2", "2-3"],
    ge: false,
    nota: "El rombo cambia con la división: rojo para gases inflamables, verde para gases no inflamables y no tóxicos, y blanco con calavera para gases tóxicos.",
  },
  {
    n: "3",
    corto: "Líq. inflamables",
    nombre: "Líquidos inflamables",
    color: "#D0102E",
    riesgo:
      "Líquidos que pueden liberar vapores inflamables. El punto de inflamación es la temperatura a la que esos vapores pueden encenderse; para esta clase, el límite es 60,5 °C en crisol cerrado o 65,6 °C en crisol abierto.",
    definicion:
      "Líquidos, mezclas de líquidos o líquidos que contienen sólidos en solución o en suspensión (por ejemplo pinturas, barnices y lacas, pero no las sustancias con otra clasificación por sus características peligrosas) que despiden vapores inflamables a temperaturas que no exceden de 60,5 °C en crisol cerrado o de 65,6 °C en crisol abierto. Comprende también los explosivos insensibilizados líquidos.",
    enOtrasPalabras:
      "Son líquidos que pueden incendiarse y generar un fuego rápidamente cuando sus vapores entran en contacto con una fuente de ignición. Por eso, durante el transporte aéreo deben mantenerse alejados de fuentes de calor, ignición y otras condiciones que puedan aumentar el riesgo.",
    ejemplos: ["Gasolina", "Pinturas, barnices y lacas", "Thinner", "Perfumes", "Algunos adhesivos"],
    divisiones: [],
    rombos: ["3"],
    ge: true,
  },
  {
    n: "4",
    corto: "Sól. inflamables",
    nombre: "Sólidos inflamables",
    color: "#D0102E",
    riesgo:
      "Sólidos que pueden incendiarse con facilidad, calentarse espontáneamente o reaccionar con el agua liberando gases inflamables.",
    definicion:
      "Sólidos inflamables; sustancias susceptibles de combustión espontánea; sustancias que, en contacto con el agua, desprenden gases inflamables.",
    enOtrasPalabras:
      "Esta clase reúne sustancias cuyo peligro aparece porque pueden arder, calentarse por sí mismas o reaccionar con el agua produciendo un gas inflamable. En aviación, es importante identificar cuál de estos comportamientos presenta la mercancía, porque cada uno implica condiciones diferentes para su transporte y manejo.",
    ejemplos: ["Fósforos", "Azufre", "Fósforo rojo", "Naftaleno", "Polvo de magnesio", "Carbón activado"],
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
  },
  {
    n: "5",
    corto: "Comburentes",
    nombre: "Sustancias comburentes y peróxidos orgánicos",
    color: "#C08A00",
    riesgo:
      "Sustancias que pueden favorecer o intensificar un incendio. Las comburentes pueden liberar oxígeno y hacer que otros materiales ardan con mayor facilidad; los peróxidos orgánicos, además, pueden descomponerse de forma peligrosa por efecto del calor u otras condiciones.",
    definicion: "Sustancias comburentes y peróxidos orgánicos.",
    enOtrasPalabras:
      "Las sustancias 5.1 pueden hacer que un incendio sea más intenso al favorecer la combustión de otros materiales. Los 5.2 pueden descomponerse de manera peligrosa y liberar gran cantidad de calor. Por eso, en aviación es importante mantenerlas alejadas de materiales combustibles y seguir las condiciones específicas de transporte establecidas para cada sustancia.",
    ejemplos: [
      "Peróxido de hidrógeno en solución (5.1)",
      "Nitrato de amonio (5.1)",
      "Cloratos (5.1)",
      "Nitratos (5.1)",
      "Hipocloritos (5.1, según su clasificación)",
      "Peróxido de benzoílo (5.2)",
      "Algunos peróxidos orgánicos industriales (5.2)",
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
          "Sustancias orgánicas con la estructura bivalente O-O, térmicamente inestables, que pueden descomponerse autoacelerada y exotérmicamente. Además, pueden descomponerse con explosión, quemarse rápidamente, ser sensibles al impacto o al rozamiento, reaccionar peligrosamente con otras sustancias y afectar a la vista.",
      },
    ],
    rombos: ["5-1", "5-2"],
    ge: true,
    geNota: "salvo la división 5.2",
  },
  {
    n: "6",
    corto: "Tóxicas",
    nombre: "Sustancias tóxicas y sustancias infecciosas",
    color: "#2C3440",
    riesgo:
      "Sustancias que pueden causar lesiones graves, enfermedad o muerte por ingestión, inhalación o contacto con la piel. Las sustancias infecciosas pueden contener microorganismos capaces de causar enfermedades.",
    definicion: "Sustancias tóxicas y sustancias infecciosas.",
    enOtrasPalabras:
      "Esta clase reúne sustancias que pueden dañar directamente la salud o que pueden transmitir una enfermedad. En aviación, el riesgo puede afectar tanto a las personas que manipulan la mercancía como a la tripulación y los pasajeros si el contenido se libera durante el transporte.",
    ejemplos: [
      "Pesticidas (6.1)",
      "Cianuros (6.1)",
      "Productos químicos tóxicos (6.1)",
      "Muestras biológicas (6.2)",
      "Material de diagnóstico (6.2)",
      "Cultivos de microorganismos (6.2)",
      "Determinadas muestras o residuos médicos (6.2)",
    ],
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
          "Se sabe o se cree fundadamente que contienen agentes patógenos: bacterias, virus, rickettsias, parásitos, hongos y otros agentes como priones, que pueden causar enfermedades en humanos o animales.",
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
    riesgo:
      "Emite radiación ionizante, que puede afectar a las personas y a otros materiales si la exposición es suficiente.",
    definicion:
      "Todo material que contenga radionucleídos en los cuales tanto la concentración de actividad como la actividad total del envío excedan los valores especificados en las Instrucciones Técnicas.",
    enOtrasPalabras:
      "Esta clase comprende materiales que contienen sustancias radiactivas en cantidades que superan los límites establecidos para el transporte. En aviación, el riesgo está relacionado con la radiación que puede emitir el material, por lo que su transporte requiere controles específicos, incluida la identificación de la categoría y la información correspondiente.",
    ejemplos: [
      "Isótopos médicos",
      "Equipos de medición nuclear",
      "Material radiactivo para diagnóstico o tratamiento",
      "Fuentes radiactivas de equipos de medición",
      "Materiales radiactivos de investigación",
    ],
    divisiones: [],
    subgruposTitulo: "Categorías de etiqueta",
    subgrupos: [
      { id: "I", txt: "Blanca: fondo blanco y una franja roja." },
      { id: "II", txt: "Amarilla: mitad superior amarilla, dos franjas rojas e índice de transporte." },
      { id: "III", txt: "Amarilla: mitad superior amarilla, tres franjas rojas e índice de transporte." },
    ],
    rombos: ["7"],
    ge: false,
    nota: "La categoría de la etiqueta se determina según el nivel de radiación en la superficie del bulto y el índice de transporte (TI). A mayor categoría, mayores son las condiciones de control aplicables.",
  },
  {
    n: "8",
    corto: "Corrosivas",
    nombre: "Sustancias corrosivas",
    color: "#2C3440",
    riesgo:
      "Sustancias que pueden causar lesiones graves al entrar en contacto con la piel, los ojos u otros tejidos, y que también pueden dañar otros materiales.",
    definicion:
      "Sustancias que, por su acción química, causan lesiones graves al entrar en contacto con tejidos vivos o que, si se produce un escape, provocan daños de consideración a otras mercancías o a los medios de transporte, o incluso los destruyen.",
    enOtrasPalabras:
      "Esta clase reúne sustancias que pueden dañar seriamente a las personas o corroer materiales cuando entran en contacto con ellos. En aviación, una fuga puede afectar tanto a las personas como a otras mercancías y componentes de la aeronave.",
    ejemplos: [
      "Ácido sulfúrico",
      "Ácido clorhídrico",
      "Ácido nítrico",
      "Soda cáustica",
      "Baterías húmedas",
      "Hipocloritos",
      "Algunos productos de limpieza industriales",
    ],
    divisiones: [],
    rombos: ["8"],
    ge: true,
  },
  {
    n: "9",
    corto: "Varias",
    nombre: "Sustancias y objetos peligrosos varios",
    color: "#2C3440",
    riesgo: "Presentan peligros que no están cubiertos por las otras clases de mercancías peligrosas.",
    definicion:
      "Sustancias y objetos peligrosos varios, incluidas las sustancias potencialmente peligrosas para el medio ambiente: sustancias y objetos que, durante el transporte por vía aérea, presentan un riesgo distinto de los correspondientes a las demás clases.",
    enOtrasPalabras:
      "Esta clase reúne mercancías que presentan un peligro específico durante el transporte aéreo, pero que no encajan en las Clases 1 a 8. Por eso es una clase muy amplia: puede incluir desde baterías de litio y hielo seco hasta material magnetizado, determinados motores y otros artículos con riesgos específicos para la operación aérea.",
    ejemplos: [
      "Baterías de litio",
      "Hielo seco (dióxido de carbono sólido)",
      "Material magnetizado",
      "Motores de combustión interna",
      "Equipos de salvamento de inflado automático",
      "Sustancias peligrosas para el medio ambiente",
      "Asbesto",
    ],
    divisiones: [],
    subgruposTitulo: "Algunos tipos de mercancías que pueden encontrarse en Clase 9",
    subgrupos: [
      { txt: "Sustancias potencialmente peligrosas para el medio ambiente" },
      { txt: "Sustancias a temperaturas elevadas: líquidos transportados a 100 °C o más y sólidos a 240 °C o más" },
      { txt: "Determinados microorganismos y organismos modificados genéticamente que no son infecciosos" },
      { txt: "Material magnetizado" },
      {
        txt: "Determinadas sustancias reguladas específicamente para el transporte aéreo por sus propiedades anestésicas, nocivas o similares",
      },
    ],
    rombos: ["9"],
    ge: true,
    geNota: "aplica a determinadas sustancias, pero no a todas",
    nota: "Estos son tipos de mercancías dentro de la Clase 9, no divisiones oficiales 9.A, 9.B o 9.C. Las baterías de litio son especialmente relevantes en aviación: están sujetas a requisitos propios de clasificación, embalaje, marcado, etiquetado y transporte.",
  },
]

/** Ruta del rombo oficial de una división o clase. */
export function rombo(id: string): string {
  return `/infografias/mercancias/clase-${id}.webp`
}

/** Cuántas etiquetas de clase hay en el módulo, contando divisiones. */
export const ROMBOS_TOTAL = CLASES.reduce((t, c) => t + c.rombos.length, 0)
