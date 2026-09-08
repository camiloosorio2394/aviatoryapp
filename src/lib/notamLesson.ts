/**
 * Contenido estructurado de la lección "Qué es un NOTAM y cómo leerlo".
 *
 * Fuente: src/data/notam/leccion_notam.md, reordenado al temario del curso.
 * Verificado contra el Doc 8400 de la OACI (PANS-ABC, 6ª ed., 2004), el Anexo 15
 * y la bibliografía de curso citada en LESSON_SOURCES.
 *
 * Orden del temario (cada punto es una sección de este documento):
 *   1. Qué es un NOTAM                    → 1
 *   2. Tipos NOTAMN / NOTAMR / NOTAMC     → 3
 *   3. Estructura: serie, número/año      → 4
 *   4. La línea Q                         → 5
 *   5. Ítems A) a G), uno por uno         → 7
 *   6. Abreviaturas OACI                  → 9
 *   7. Lectura paso a paso de un NOTAM    → 10 (y Colombia en 11)
 *   8. SNOWTAM y ASHTAM                   → 12
 *   9. Ejercicios de práctica             → cierre del documento (NextSteps)
 *  10. Examen final                       → cierre del documento (NextSteps)
 *
 * Las tablas completas de códigos (168 asuntos + 78 estados) y el glosario de 48
 * abreviaturas NO se duplican aquí: viven en src/lib/notam.ts y se muestran en el
 * Decodificador. La sección 9 trae solo el subconjunto mínimo para leer la casilla E).
 */

import type { NotamLevel } from "@/lib/notam"
import type { DocScreen } from "@/lib/docBlocks"
import { LINEA_Q_COLOR } from "@/lib/lineaQ"


/** Los iconos que puede llevar una ficha del bloque `tarjetas`. */
export type TarjetaIcono = "documento" | "movil" | "avion"

/** Los iconos de los pasos de lectura de un NOTAM, uno por función. */
export type PasoIcono =
  | "documento"
  | "codigo"
  | "ubicacion"
  | "reloj"
  | "calendario"
  | "alerta"
  | "vertical"

/** Una pieza del desglose visual: el trozo de código y qué significa. */
export interface BreakdownPart {
  /** El trozo tal cual aparece en el mensaje: `SKBO`, `18008KT`, `QRALW`. */
  token: string
  /** Qué es, en dos o tres palabras: "estación", "viento", "código NOTAM". */
  label: string
  /** La lectura completa, si hace falta: "del sur (180°) a 8 nudos". */
  detail?: string
}

export type LessonBlock =
  | { kind: "p"; text: string }
  | { kind: "quote"; text: string; source?: string }
  | { kind: "list"; items: string[]; ordered?: boolean }
  /* ── Catálogo del sistema de lecciones (handoff Lección 01) ──────────────
     Bloques con estilo fijo para componer lecciones sin maquetarlas a mano.
     Ninguna lección inventa estilos nuevos: si falta un bloque, se agrega al
     catálogo y lo ganan todas. */
  /** H2 de bloque dentro de la lección (30px display). */
  | { kind: "sub"; text: string }
  /** Concepto clave destacado: papel hundido con barra azul, 18.5px. */
  | { kind: "definicion"; text: string }
  /** Viñetas con cuadrado de 7px. Máximo 5 ítems, dice el handoff. */
  | { kind: "vinetas"; items: string[] }
  /**
   * Rejilla de entradas: icono + título + descripción.
   *
   * `icono` es la URL que devuelve el import del PNG. Sin él queda el hueco
   * rotulado, que es el recordatorio de que falta la ilustración.
   */
  | {
      kind: "rejilla"
      items: { titulo: string; desc: string; icono?: string }[]
      nota?: string
    }
  /**
   * Título de sección grande, por encima del `sub`.
   *
   * Existe para el corte de tema dentro de una lección larga: el `sub` marca
   * apartados y este marca partes. Dos escalones bastan; un tercero ya no se
   * distingue al leer.
   */
  | { kind: "titulo"; text: string }
  /** Abreviaturas de la lección: filas con filete, en columnas. */
  | { kind: "glosario"; titulo?: string; items: { k: string; v: string }[] }
  /**
   * El NOTAM entero, presentado como se lee.
   *
   * Cada línea puede llevar un marcador al margen con la pregunta que responde
   * (¿dónde?, ¿desde cuándo?, ¿qué está pasando?), que es lo que convierte un
   * bloque de código en algo que se recorre. Una línea con `detalle` se puede
   * pulsar y abre su lectura debajo; sin `detalle` es solo texto.
   *
   * `fuerte` marca la casilla que carga el peso operacional, normalmente la E):
   * es donde el piloto averigua qué está pasando y merece más presencia.
   */
  | {
      kind: "notamPanel"
      rotulo?: string
      etiqueta?: string
      pie?: string
      lineas: {
        texto: string
        marca?: string
        detalle?: { titulo: string; texto: string }
        fuerte?: boolean
      }[]
    }
  /**
   * Los pasos de lectura de un NOTAM, numerados.
   *
   * Cada paso enseña primero el código real y debajo qué dice. `interpretacion`
   * lo esconde tras un botón donde conviene que el alumno lo intente antes de
   * leer la respuesta. `completo` saca al paso de la retícula de dos columnas
   * cuando su código no cabe en media anchura.
   */
  | {
      kind: "pasos"
      columnas?: 2
      items: {
        rotulo: string
        codigo?: string
        texto: string
        icono?: PasoIcono
        etiqueta?: string
        completo?: boolean
        fuerte?: boolean
        interpretacion?: { texto: string; enOtrasPalabras?: string }
      }[]
    }
  /**
   * Una cadena de pasos para recordar, sin nada que pulsar.
   *
   * Es una regla mental, no un ejercicio: el alumno la mira y se la lleva. Por
   * eso no es interactiva. En vertical van las preguntas que se hace al leer;
   * en horizontal, el recorrido completo resumido en una línea.
   */
  | {
      kind: "secuencia"
      titulo?: string
      intro?: string
      items: string[]
      numerada?: boolean
      orientacion?: "vertical" | "horizontal"
      nota?: string
    }
  /** Puente visual entre dos ejemplos: el país cambia, el método no. */
  | { kind: "transicion"; de: string; a: string; nota?: string }
  /**
   * El mapa completo de una línea antes de entrar pieza por pieza: los
   * tokens en fila, cada uno con una sola palabra debajo, y flechas entre
   * ellos. Va en su propio carril horizontal, como la línea Q de la
   * infografía, para que siempre se lea de una vez y en móvil se desplace en
   * vez de partirse. `color` repite el de la pieza en la infografía: es lo que
   * hace que el alumno reconozca el mismo token en los dos sitios.
   */
  | { kind: "cadena"; items: { token: string; rotulo: string; color?: string }[] }
  /**
   * Cabecera de una pieza de la línea Q cuando la lección la toma por
   * separado: el número, el token y el nombre, con el mismo color que lleva
   * en la infografía y en el mapa. Es lo que hace que el alumno reconozca que
   * está leyendo sobre la misma pieza que acaba de ver arriba. `detalle` es
   * el nombre desarrollado, en inglés casi siempre: "Flight Information
   * Region".
   */
  | {
      kind: "componente"
      n: number
      token: string
      nombre: string
      detalle?: string
      color?: string
    }
  /**
   * Una pregunta y los párrafos que la contestan, como UN bloque.
   *
   * Es el escalón por debajo del `sub`, para dentro de una pieza: la pregunta
   * va más pequeña que el título de sección y sus párrafos van pegados a ella
   * y entre sí, porque son una sola idea. Sueltos, con el aire que separa los
   * bloques de la lección, tres frases sobre lo mismo se leían como tres
   * asuntos distintos.
   */
  | { kind: "apartado"; titulo: string; parrafos: string[] }
  /**
   * Encabezados de NOTAM que se abren para enseñar de qué está hecho cada uno.
   *
   * Cerrados son tres líneas de código, como las ve el piloto en el briefing.
   * Al abrir uno, cada pieza recibe su rótulo debajo. Es el momento en que el
   * alumno descubre que el número que sigue al tipo no es del NOTAM que lee,
   * sino del que deja sin efecto, que es el error que cuesta caro.
   */
  | {
      kind: "encabezados"
      pista?: string
      items: { partes: { token: string; label: string }[] }[]
    }
  /**
   * Cadena de eslabones que se recorre en orden: Estado, AIS, NOTAM, piloto.
   *
   * Al elegir uno se ilumina solo ese y su explicación aparece debajo. Los
   * demás siguen a la vista a propósito: lo que enseña la pieza es la relación
   * entre eslabones, y ocultarlos la rompería.
   */
  | {
      kind: "flujo"
      pista?: string
      pasos: { clave: string; etiqueta: string; sub?: string; texto: string }[]
    }
  /**
   * Vías o alternativas en fichas que se abren al elegirlas.
   *
   * La ficha cerrada dice de qué va en una línea; abierta, lo desarrolla. Sirve
   * para una lista de opciones que el alumno compara antes de leerlas a fondo.
   */
  | {
      kind: "tarjetas"
      pista?: string
      items: { icono: TarjetaIcono; titulo: string; resumen: string; detalle: string }[]
    }
  /**
   * Referencias normativas en fichas: el código delante y el documento al
   * abrirlas. Existe para que la norma respalde sin ocupar media pantalla.
   */
  | {
      kind: "referencias"
      rotulo?: string
      pista?: string
      items: { codigo: string; nombre: string; detalle: string }[]
    }
  /** El elemento interactivo de la lección; lo renderiza el reproductor. */
  | { kind: "interactivo"; nombre: "notam-decodificador" }
  /**
   * Hueco de imagen rotulado, VISIBLE a propósito: la app está en
   * construcción y el hueco recuerda qué imagen falta y de qué medida.
   * Va en el flujo, al ancho de la columna; `anchoMax` lo acota y centra.
   */
  | {
      kind: "hueco"
      rotulo: string
      descripcion: string
      alto: number
      anchoMax?: number
      pie?: string
    }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "code"; text: string }
  /**
   * Caja de aviso. `sellos` destaca dos o tres palabras que hay que retener
   * como condición, no como frase: van en fichas debajo del texto.
   */
  | {
      kind: "callout"
      tone: "info" | "warn" | "tip" | "verificar"
      title?: string
      text: string
      sellos?: string[]
    }
  | { kind: "kv"; items: { k: string; v: string }[] }
  /**
   * Desglose visual de un código: la línea entera arriba, cada trozo con su
   * color, y la leyenda numerada debajo. Un METAR o un NOTAM explicado en
   * párrafo no se entiende; desarmado, sí.
   */
  | { kind: "breakdown"; caption?: string; parts: BreakdownPart[] }
  /**
   * Un NOTAM colombiano real, dentro de la lección.
   *
   * Solo lleva el `id` de la ficha en `notams_nacionales.json`: de ahí salen la
   * imagen, la transcripción (que es el `alt` de verdad, no uno decorativo), el
   * código, el aeródromo y el aviso de vigencia obligatorio. Si la ficha cambia
   * de nombre de archivo o de formato, la lección se entera sola.
   *
   * Ponlo solo donde la imagen enseñe lo que dice el párrafo de al lado.
   * Colocarlas de adorno entre párrafos es el problema que esto viene a
   * arreglar, no la solución.
   */
  | {
      kind: "notam"
      id: string
      caption?: string
      /**
       * Las casillas del NOTAM, decodificadas una por una.
       *
       * Es lo que convierte el bloque en pieza que enseña en vez de imagen que
       * decora: se ve el aviso auténtico y debajo, en la misma pieza, qué dice
       * cada casilla. Sin esto el piloto ve un NOTAM real y tiene que buscar en
       * el párrafo de al lado qué significaba, que es el fallo que arrastra la
       * sección 7.
       *
       * `cas` es el rótulo de la casilla ("A)", "F/G)"), `contenido` el texto
       * literal del aviso, y `significa` la lectura en español.
       */
      casillas?: { cas: string; contenido: string; significa: string }[]
    }
  /**
   * Infografía de lienzo fijo, diseñada aparte y portada a código.
   *
   * Va donde una imagen entera explica mejor que doce párrafos: la portada de
   * un tema, un mapa de conceptos, una anatomía completa. No sustituye al
   * texto de la sección, lo encabeza.
   *
   * `nombre` es la clave del registro de INFOGRAFIAS en DocLessonBlocks: el
   * bloque no sabe maquetar, solo elige cuál mostrar.
   */
  | { kind: "infografia"; nombre: "notam-que-es" | "notam-linea-q" }
  /** Ejemplo resuelto, en caja aparte: el enunciado, los pasos y la lectura final. */
  | {
      kind: "example"
      title: string
      /** El mensaje a interpretar, tal cual. */
      code: string
      steps: string[]
      /** La lectura en una frase, que es a lo que hay que llegar. */
      answer: string
    }
  /** Resumen al cierre de una sección: lo que hay que llevarse. */
  | { kind: "summary"; title?: string; items: string[] }
  /**
   * Comprobación dentro de la lección.
   *
   * Leer trece secciones seguidas sin recuperar nada produce fluidez ilusoria:
   * el piloto siente que entendió y no retiene. Esto corta la lectura y le pide
   * usar lo que acaba de leer, que es lo que de verdad fija el conocimiento.
   *
   * Va PEGADA a lo que pregunta, no al final de la sección: si hay que subir a
   * releer para responder, la pregunta llegó tarde.
   */
  | {
      kind: "check"
      /** Rótulo de la caja. Por defecto, "Compruébalo". */
      titulo?: string
      question: string
      options: string[]
      /** Índice de la correcta dentro de `options`. */
      answer: number
      /** Por qué esa es la buena. Se muestra al responder, acierte o falle. */
      explain: string
    }

export interface LessonScreen {
  /** Número de sección, correlativo desde 1. Es el índice que se guarda como leído. */
  n: number
  /** Título de la sección, sin el prefijo "Pantalla N" del documento fuente */
  title: string
  /** Resumen de 3 a 6 palabras */
  kicker: string
  /** Lectura estimada en minutos */
  minutes: number
  blocks: LessonBlock[]
  level: NotamLevel
}

export const LESSON_SCREENS: DocScreen[] = [
  // ── 1 ──────────────────────────────────────────────────────────────────────
  {
    n: 1,
    title: "¿Qué es un NOTAM?",
    kicker: "Definición y por qué importa",
    minutes: 2,
    level: "basico",
    // La composición del standalone aprobado el 3 de agosto: la
    // infografía-imagen descompuesta en bloques que reflowean, en UNA sola
    // página que se lee scrolleando, como el standalone. El cierre conserva
    // la definición oficial del Doc 8400, los dos párrafos de contexto y la
    // comprobación, que son contenido de la app y el standalone no traía.
    blocks: [
      // ── Paso 1: qué es y para qué sirve ──────────────────────────────────
      {
        kind: "definicion",
        text: "**NOTAM** significa Notice to Airmen. Es un aviso aeronáutico que contiene información temporal o cambios importantes relacionados con la operación de vuelo, que deben ser conocidos por pilotos y demás personal aeronáutico antes de realizar una operación.",
      },
      { kind: "p", text: "Un NOTAM puede informar, por ejemplo, sobre:" },
      {
        kind: "vinetas",
        items: [
          "Cierre o restricción de una pista.",
          "Cambio temporal de una aproximación o procedimiento.",
          "Ayudas a la navegación fuera de servicio.",
          "Obstáculos temporales.",
          "Cambios en horarios o servicios de un aeródromo.",
          "Actividades militares o áreas temporalmente restringidas.",
          "Fallas o limitaciones de sistemas de navegación, comunicaciones o iluminación.",
          "Trabajos de construcción en un aeródromo.",
        ],
      },
      { kind: "sub", text: "Para qué sirve" },
      {
        kind: "p",
        text: "Tienes programado un vuelo Miami a Bogotá en un Airbus A320 de Avianca. Al momento de hacer la planificación revisas la información disponible para tu vuelo y encuentras un NOTAM que indica que una de las pistas del aeropuerto El Dorado estará cerrada temporalmente por trabajos de mantenimiento durante el horario en el que tienes previsto llegar.",
      },
      {
        kind: "p",
        text: "Ese NOTAM cambia algo que necesitas tener en cuenta para tu operación. Ahora debes revisar cómo afecta la llegada a Bogotá, qué pista estará disponible, si cambia el procedimiento previsto o si necesitas hacer algún ajuste a tu planificación.",
      },
      {
        kind: "p",
        text: "**Ese es el propósito de un NOTAM: darte a conocer con anticipación una condición que puede afectar tu vuelo, para que puedas tomar una decisión antes de encontrarte con ella durante la operación.**",
      },
      // ── Paso 2: de qué avisan, y uno de verdad ───────────────────────────
      { kind: "sub", text: "De qué te avisan" },
      {
        kind: "rejilla",
        items: [
          {
            titulo: "Pistas y calles de rodaje",
            desc: "Cierres, limitaciones, condiciones de superficie o cambios temporales.",
            icono: "/modulos/notam/avisan-01-pistas.webp",
          },
          {
            titulo: "Ayudas a la navegación",
            desc: "Fuera de servicio, con limitaciones o con cambios en la cobertura.",
            icono: "/modulos/notam/avisan-02-ayudas.webp",
          },
          {
            titulo: "Obstáculos y construcciones",
            desc: "Obstáculos nuevos, grúas, antenas o trabajos cerca de áreas de vuelo.",
            icono: "/modulos/notam/avisan-03-obstaculos.webp",
          },
          {
            titulo: "Espacio aéreo restringido",
            desc: "Áreas peligrosas, militares o restringidas de uso temporal.",
            icono: "/modulos/notam/avisan-04-espacio.webp",
          },
          {
            titulo: "Condiciones especiales",
            desc: "Eventos, actividades o situaciones que pueden afectar las operaciones.",
            icono: "/modulos/notam/avisan-05-condiciones.webp",
          },
          {
            titulo: "Otra información importante",
            desc: "Cambios en servicios, procedimientos o instalaciones del aeropuerto.",
            icono: "/modulos/notam/avisan-06-otra.webp",
          },
        ],
      },
      { kind: "interactivo", nombre: "notam-decodificador" },
      {
        kind: "glosario",
        titulo: "Abreviaturas de esta lección",
        items: [
          { k: "RWY", v: "Pista" },
          { k: "TWY", v: "Calle de rodaje" },
          { k: "CLSD", v: "Cerrado" },
          { k: "U/S", v: "Fuera de servicio" },
          { k: "WIP", v: "Trabajos en curso" },
          { k: "AGL", v: "Sobre el nivel del terreno" },
        ],
      },
      // ── Paso 4: por qué esto pesa en el ingreso a una aerolínea ──────────
      {
        kind: "titulo",
        text: "¿Por qué debes saber leer un NOTAM para ingresar a una aerolínea?",
      },
      {
        kind: "p",
        text: "En una entrevista o evaluación de ingreso a una aerolínea pueden pedirte que interpretes un NOTAM. No buscan únicamente que conozcas las abreviaturas; quieren comprobar que puedes identificar qué está pasando, cuándo aplica y cómo puede afectar una operación.",
      },
      { kind: "p", text: "Por ejemplo, si encuentras:" },
      { kind: "code", text: "E) RWY 13L/31R CLSD DUE WIP" },
      {
        kind: "figura",
        src: "/modulos/notam/skbo-pista-cerrada.webp",
        alt: "Plano del aeropuerto El Dorado, SKBO. La pista 13L/31R aparece marcada en ámbar como tramo cerrado y la pista 13R/31L en oscuro como operativa, con las calles de rodaje, las plataformas y la terminal alrededor.",
        ancho: 1400,
        alto: 1050,
        anchoMax: 420,
      },
      {
        kind: "p",
        text: "No basta con decir “la pista está cerrada”. Como piloto debes identificar:",
      },
      {
        kind: "vinetas",
        items: [
          "**Qué está afectado:** RWY 13L/31R.",
          "**Qué sucede:** está cerrada.",
          "**Por qué:** trabajos en curso.",
          "**Cuándo aplica:** revisar B) y C).",
          "**A qué espacio vertical aplica:** revisar F) y G).",
          "**Qué impacto tiene en tu vuelo:** determinar qué pista queda disponible y qué cambios, si alguno, debes considerar en tu planificación.",
        ],
      },
      {
        kind: "p",
        text: "En una entrevista no te evalúan por memorizar un NOTAM. Te evalúan por saber interpretarlo y tomar la información que necesitas para operar.",
      },
      {
        kind: "check",
        question:
          "Una pista se va a cerrar por obras dentro de tres días. ¿Por dónde te enteras?",
        options: [
          "Por NOTAM: informa cambios o condiciones temporales que deben conocerse para la operación",
          "Por el AIP: es la publicación permanente de información aeronáutica del Estado",
          "Por la carta de aproximación, que se actualiza mediante ciclos de publicación",
        ],
        answer: 0,
        explain:
          "El NOTAM existe justo para lo que cambia antes de que el AIP pueda publicarlo. El AIP es la referencia permanente y va por ciclos; una obra que empieza en tres días no cabe ahí.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Cómo aprovechar la lección",
        text: "Avanza en orden: cada sección prepara la siguiente. Encontrarás comprobaciones durante la lección para aplicar lo que acabas de aprender. Al final tendrás una práctica con NOTAM colombianos reales y una evaluación de 20 preguntas.",
      },
    ],
  },

  // ── 2 ──────────────────────────────────────────────────────────────────────
  {
    n: 2,
    title: "¿Quién publica los NOTAM y dónde los consulto?",
    kicker: "Normas y fuentes oficiales",
    minutes: 3,
    level: "basico",
    // La norma dejó de ser el contenido principal y bajó al pie, en fichas:
    // el alumno no tiene que leer cuatro referencias para entender algo tan
    // básico como quién publica un NOTAM. El respaldo sigue ahí, a un clic.
    blocks: [
      {
        kind: "p",
        text: "Antes de revisar un NOTAM, hay algo que debes tener claro: ¿de dónde sale esa información y dónde puedes consultarla?",
      },
      {
        kind: "p",
        text: "Cuando preparas un vuelo, no buscas los NOTAM directamente en una carta ni esperas a encontrarlos en el AIP. La información se publica a través del **Servicio de Información Aeronáutica (AIS)** del Estado correspondiente.",
      },
      {
        kind: "p",
        text: "En Colombia, la información aeronáutica oficial es publicada por la **Aerocivil** a través de sus servicios de información aeronáutica.",
      },
      {
        kind: "flujo",
        pista: "Selecciona cada elemento para conocer su función.",
        pasos: [
          {
            clave: "estado",
            etiqueta: "Estado",
            sub: "Autoridad aeronáutica",
            texto: "La autoridad aeronáutica del Estado, en Colombia la Aerocivil, establece, regula y supervisa el sistema de información aeronáutica.",
          },
          {
            clave: "ais",
            etiqueta: "AIS",
            sub: "Servicio de Información Aeronáutica",
            texto: "Recibe la información que llega de distintas fuentes, la procesa y la distribuye en el formato que corresponde.",
          },
          {
            clave: "notam",
            etiqueta: "NOTAM",
            sub: "El aviso",
            texto: "El aviso que lleva la información temporal sobre el establecimiento, la condición o la modificación de instalaciones, servicios, procedimientos o peligros aeronáuticos.",
          },
          {
            clave: "piloto",
            etiqueta: "Piloto",
            sub: "Quien la usa",
            texto: "Consulta, interpreta y utiliza la información en la planificación y en la ejecución del vuelo.",
          },
        ],
      },
      {
        kind: "p",
        text: "El AIS recibe, procesa y distribuye información aeronáutica que puede ser necesaria para la planificación y operación de los vuelos.",
      },
      { kind: "sub", text: "¿Dónde los consulta un piloto?" },
      {
        kind: "tarjetas",
        pista: "Selecciona una vía para ver en qué consiste.",
        items: [
          {
            icono: "documento",
            titulo: "Fuente oficial",
            resumen: "Consulta directamente la información publicada por el Estado.",
            detalle: "Consulta de los servicios oficiales de información aeronáutica del Estado.",
          },
          {
            icono: "movil",
            titulo: "Aplicaciones de planificación",
            resumen: "Integran los NOTAM dentro de las herramientas de briefing y planificación.",
            detalle: "Herramientas como ForeFlight, Garmin Pilot, RocketRoute u otras plataformas integran NOTAM dentro del briefing de vuelo.",
          },
          {
            icono: "avion",
            titulo: "Briefing operacional",
            resumen: "En operaciones comerciales pueden formar parte del proceso de despacho y planificación.",
            detalle: "En operaciones comerciales, los NOTAM también pueden formar parte de los sistemas y procesos de despacho o planificación de vuelo.",
          },
        ],
      },
      {
        kind: "p",
        text: "Estás preparando un vuelo y necesitas revisar los NOTAM de tu aeropuerto de salida, destino, ruta y alternos.",
      },
      {
        kind: "check",
        question: "¿Qué opción representa mejor una forma adecuada de obtener esta información?",
        options: [
          "Consultar únicamente una carta aeronáutica",
          "Utilizar una herramienta de planificación o briefing que integre NOTAM y verificar que la información provenga de una fuente autorizada",
          "Esperar a recibir la información durante el vuelo",
        ],
        answer: 1,
        explain:
          "Las aplicaciones y sistemas de planificación pueden facilitar la consulta y organización de los NOTAM, pero debes asegurarte de trabajar con información vigente, completa y procedente de una fuente autorizada.",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "La aplicación que utilices no cambia la responsabilidad operacional",
        text: "Las herramientas facilitan la búsqueda y organización de la información, pero el piloto debe asegurarse de utilizar información vigente, completa y procedente de una fuente autorizada.",
        sellos: ["Vigente", "Completa", "Fuente autorizada"],
      },
      { kind: "sub", text: "Base normativa" },
      {
        kind: "p",
        text: "Los NOTAM y su distribución están establecidos dentro del sistema de información aeronáutica internacional de la OACI, principalmente mediante:",
      },
      {
        kind: "referencias",
        rotulo: "Consulta la referencia",
        pista: "Selecciona una referencia para conocer qué documento respalda esta información.",
        items: [
          {
            codigo: "Anexo 15",
            nombre: "Servicios de información aeronáutica",
            detalle: "Fija el contenido y el formato de los NOTAM, y cómo se publican (numerales 5.2.1 y 5.3.2, y Apéndice 6).",
          },
          {
            codigo: "Anexo 10 · Vol. II",
            nombre: "Procedimientos de comunicaciones",
            detalle: "Fija su transmisión por el servicio fijo aeronáutico, el AFS (Doc 8400, pág. 7-1, numeral 2).",
          },
          {
            codigo: "Doc 8126",
            nombre: "Manual para los servicios de información aeronáutica",
            detalle: "Trae los criterios de selección y las tablas de calificativos (Doc 8400, pág. 7-3, nota).",
          },
          {
            codigo: "Doc 8400",
            nombre: "PANS-ABC",
            detalle: "Normaliza el código NOTAM de cinco letras, en su sección 7. Lo tienes completo en el Decodificador de esta sección.",
          },
        ],
      },
    ],
  },

  // ── 3 ──────────────────────────────────────────────────────────────────────
  {
    n: 3,
    title: "¿Qué significa NOTAMN, NOTAMR y NOTAMC?",
    kicker: "Nuevo, reemplaza y cancela",
    minutes: 4,
    level: "basico",
    // La casilla B) en NOTAMR y NOTAMC se explica en la lección de la
    // estructura, no aquí: en esta el objetivo es uno solo, distinguir nuevo,
    // reemplaza y cancela. Meter la casilla antes de haber visto el esqueleto
    // completo obliga a explicar dos cosas a la vez y no se fija ninguna.
    blocks: [
      {
        kind: "p",
        text: "Cuando estás haciendo la planificación de un vuelo, puedes encontrar varios NOTAM relacionados con la misma pista, procedimiento o instalación. No todos significan lo mismo: algunos publican una información nueva, otros actualizan una anterior y otros la cancelan.",
      },
      {
        kind: "p",
        text: "Por eso, antes de interpretar el contenido, fíjate en el tipo que aparece después del número del NOTAM.",
      },
      {
        kind: "table",
        head: ["Tipo", "¿Qué significa?", "¿Qué haces como piloto?"],
        rows: [
          [
            "**NOTAMN**",
            "Publica una nueva información o condición.",
            "Lees el NOTAM y determinas si afecta tu operación.",
          ],
          [
            "**NOTAMR**",
            "Reemplaza un NOTAM anterior e indica cuál.",
            "Ignoras la información anterior y revisas la nueva.",
          ],
          [
            "**NOTAMC**",
            "Cancela un NOTAM anterior e indica cuál.",
            "El NOTAM cancelado deja de estar vigente.",
          ],
        ],
      },
      { kind: "sub", text: "Así los vas a encontrar" },
      {
        kind: "encabezados",
        pista: "Selecciona un encabezado para ver qué dice cada pieza.",
        items: [
          {
            partes: [
              { token: "A0682/26", label: "serie, número y año" },
              { token: "NOTAMN", label: "tipo: nuevo" },
            ],
          },
          {
            partes: [
              { token: "A0143/26", label: "serie, número y año" },
              { token: "NOTAMR", label: "tipo: reemplaza" },
              { token: "A2385/26", label: "al que reemplaza" },
            ],
          },
          {
            partes: [
              { token: "C0912/26", label: "serie, número y año" },
              { token: "NOTAMC", label: "tipo: cancela" },
              { token: "C0756/26", label: "el que cancela" },
            ],
          },
        ],
      },
      {
        kind: "list",
        items: [
          "En un **NOTAMR**, el número que aparece después de NOTAMR identifica el NOTAM que está siendo reemplazado. En el ejemplo, `A0143/26` reemplaza a `A2385/26`.",
          "En un **NOTAMC**, el número que aparece después de NOTAMC identifica el NOTAM que está siendo cancelado.",
        ],
      },
      { kind: "sub", text: "Ahora míralo en un NOTAM colombiano real" },
      { kind: "notam", id: "N3" },
      { kind: "sub", text: "Ahora analicemos el NOTAM" },
      {
        kind: "p",
        text: "El encabezado nos indica que estamos frente al NOTAM **C 1962/26**, correspondiente al aeropuerto José María Córdova (**SKRG**).",
      },
      { kind: "p", text: "El texto indica:" },
      { kind: "code", text: "PAPI RWY 19 U/S" },
      {
        kind: "p",
        text: "Esto significa que el PAPI de la pista 19 está fuera de servicio. Esta información es relevante para cualquier piloto que esté planificando una operación hacia ese aeropuerto, porque una ayuda visual asociada a la aproximación prevista no estará disponible.",
      },
      { kind: "p", text: "Pero hay una segunda información que debes identificar:" },
      { kind: "code", text: "RPLC NOTAM C 0756/26" },
      {
        kind: "p",
        text: "**RPLC** significa replace, reemplazar. En este caso, el NOTAM **C 1962/26** está reemplazando al **C 0756/26**.",
      },
      { kind: "sub", text: "Un detalle que encontrarás en Colombia" },
      {
        kind: "p",
        text: "En algunos productos de información aeronáutica de Colombia puedes encontrar la indicación `RPLC NOTAM C` seguida del número de un NOTAM.",
      },
      {
        kind: "p",
        text: "RPLC indica que el NOTAM que estás leyendo reemplaza al NOTAM identificado al final de la línea.",
      },
      {
        kind: "p",
        text: "Estás planificando una llegada a **SKRG** y encuentras el siguiente NOTAM:",
      },
      { kind: "code", text: "PAPI RWY 19 U/S" },
      {
        kind: "check",
        titulo: "Piensa como piloto",
        question: "¿Qué deberías hacer?",
        options: [
          "Continuar la planificación sin tenerlo en cuenta porque las luces PAPI no afectan la navegación",
          "Tener en cuenta que las luces PAPI de la pista 19 están fuera de servicio y revisar cómo afecta la aproximación prevista",
          "Cancelar automáticamente el vuelo porque las luces PAPI están fuera de servicio",
        ],
        answer: 1,
        explain:
          "El NOTAM informa que las luces PAPI de la pista 19 están fuera de servicio. Como piloto, debes considerar esta condición dentro de la planificación y verificar su efecto sobre la aproximación prevista. Que una ayuda visual esté fuera de servicio no significa automáticamente que la operación no pueda realizarse: debes evaluar las condiciones y procedimientos aplicables.",
      },
      {
        kind: "p",
        text: "Estás preparando un vuelo hacia **SKRG** (Rionegro). Durante la consulta encuentras primero:",
      },
      { kind: "code", text: "C 0756/26 NOTAMN\nPAPI RWY 19 U/S" },
      { kind: "p", text: "Posteriormente aparece:" },
      { kind: "code", text: "C 1962/26\nPAPI RWY 19 U/S\nRPLC NOTAM C 0756/26" },
      {
        kind: "check",
        question: "¿Cuál de las siguientes afirmaciones es correcta?",
        options: [
          "Debes considerar ambos NOTAM porque cada uno corresponde a una condición diferente",
          "El `C 1962/26` reemplaza al `C 0756/26`, por lo que debes utilizar la información del NOTAM más reciente",
          "El `C 0756/26` sigue siendo el vigente porque fue publicado originalmente como NOTAMN",
          "El `C 1962/26` cancela la condición porque contiene RPLC",
        ],
        answer: 1,
        explain:
          "El primer NOTAM fue publicado como NOTAMN, es decir, comunicó inicialmente la condición. Posteriormente, el `C 1962/26` reemplazó al `C 0756/26` mediante la indicación `RPLC NOTAM C 0756/26`. Por lo tanto, al encontrar ambos durante la consulta, debes identificar cuál es el NOTAM vigente y trabajar con la información del `C 1962/26`. Además, el contenido operacional sigue siendo el mismo: las luces PAPI de la pista 19 están fuera de servicio.",
      },
    ],
  },

  // ── 4 ──────────────────────────────────────────────────────────────────────
  {
    n: 4,
    title: "Cómo se lee un NOTAM completo",
    kicker: "El esqueleto del mensaje",
    minutes: 6,
    level: "basico",
    // La lección no explica la línea Q letra por letra a propósito: aquí solo
    // hay que saber qué función cumple cada casilla. Desarmar la Q antes de
    // eso obliga a sostener dos niveles de detalle a la vez y no se fija
    // ninguno. La Q entera es la lección siguiente.
    blocks: [
      {
        kind: "p",
        text: "Antes de interpretar el contenido de un NOTAM, primero debes saber cómo identificarlo. Su encabezado te permite reconocer la serie, el número, el año de emisión y si se trata de un NOTAM nuevo, un reemplazo o una cancelación.",
      },
      {
        kind: "figura",
        src: "/modulos/notam/notam-real-skbo.webp",
        alt: "Visor de NOTAM con el aviso C5836/16 de SKBO. Arriba, aeródromo SKBO, número C5836/16, clase International y estado Active, con las fechas de emisión, inicio y fin en UTC. Debajo, en la pestaña ICAO, el mensaje completo en formato OACI: C5836/16 NOTAMR C3212/16, la línea Q, A) SKBO, B) 1608110000, C) 1611162359 EST, D) H24 y la casilla E) con la limitación de las posiciones de parqueo E18 a E25.",
        ancho: 1400,
        alto: 439,
      },
      {
        kind: "p",
        text: "Este NOTAM corresponde al aeropuerto El Dorado (**SKBO**) y está presentado en formato OACI. Vamos a desglosarlo paso a paso.",
      },
      {
        kind: "notamPanel",
        rotulo: "NOTAM real · Bogotá / El Dorado (SKBO)",
        etiqueta: "Limitación de posiciones de parqueo",
        lineas: [
          { texto: "C5836/16 NOTAMR C3212/16", marca: "Identificación" },
          { texto: "Q) SKED/QMPLT/IV/M/A/000/999/0442N07408W010", marca: "Información codificada" },
          { texto: "A) SKBO", marca: "¿Dónde?" },
          { texto: "B) 1608110000", marca: "¿Desde cuándo?" },
          { texto: "C) 1611162359 EST", marca: "¿Hasta cuándo?" },
          { texto: "D) H24", marca: "¿Cuándo aplica?" },
          {
            texto: "E) PSN PRKG ACFT E18, E19, E20, E21, E22, E23, E24, E25 LTD,\nACFT SALIENDO DEBEN HACERLO REMOLCADAS VIA TWY M1 HASTA EJE\nINGRESO PSN PRKG E17, ACFT DEBEN INICIAR MOTORES UNICAMENTE\nFM PSN PRKG E17",
            marca: "¿Qué está pasando?",
            fuerte: true,
          },
        ],
      },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Identificación del NOTAM",
            codigo: "C5836/16 NOTAMR C3212/16",
            icono: "documento",
            texto: "**C5836/16** identifica el NOTAM: serie C, número 5836 y año 2016. **NOTAMR** indica que reemplaza a un NOTAM anterior. **C3212/16** identifica el NOTAM que está reemplazando.",
          },
          {
            rotulo: "Q) Información codificada",
            codigo: "Q) SKED/QMPLT/IV/M/A/000/999/0442N07408W010",
            icono: "codigo",
            texto: "Esta línea contiene información codificada que permite identificar rápidamente el tipo de condición, el tráfico al que aplica, el área afectada y otros datos utilizados para distribuir y procesar el NOTAM.",
            etiqueta: "La desglosamos letra por letra en la lección siguiente",
          },
          {
            rotulo: "A), B) y C) ¿Dónde y cuándo?",
            codigo: "A) SKBO\nB) 1608110000\nC) 1611162359 EST",
            icono: "ubicacion",
            texto: "**A)** indica el aeródromo afectado: SKBO, Bogotá/El Dorado. **B)** indica el inicio de la vigencia. **C)** indica el final previsto de la vigencia.",
          },
          {
            rotulo: "D) ¿Cuándo aplica?",
            codigo: "D) H24",
            icono: "calendario",
            texto: "La condición aplica durante todo el día, es decir, H24.",
          },
          {
            rotulo: "E) ¿Qué está pasando?",
            codigo: "E) PSN PRKG ACFT E18, E19, E20, E21, E22, E23, E24, E25 LTD,\nACFT SALIENDO DEBEN HACERLO REMOLCADAS VIA TWY M1 HASTA EJE\nINGRESO PSN PRKG E17, ACFT DEBEN INICIAR MOTORES UNICAMENTE\nFM PSN PRKG E17",
            icono: "alerta",
            fuerte: true,
            texto: "Esta es la parte más importante del NOTAM: aquí se explica qué está pasando y qué condición debe tener en cuenta el piloto.",
            interpretacion: {
              texto: "Las posiciones de parqueo E18 a E25 tienen una limitación. Las aeronaves que salgan de esas posiciones deben ser remolcadas por la calle de rodaje M1 hasta el eje de la posición E17. Además, las aeronaves deben iniciar motores únicamente desde la posición E17.",
              enOtrasPalabras: "Si tu aeronave está estacionada en E18 a E25, no puedes iniciar motores allí para salir. Debes ser remolcado hasta E17 y allí iniciar motores.",
            },
          },
          {
            rotulo: "F) y G) ¿Hasta dónde aplica?",
            icono: "vertical",
            texto: "En este NOTAM no aparecen las casillas **F)** y **G)**. Son los límites verticales, y solo se usan cuando hay espacio aéreo de por medio: restricciones, áreas peligrosas o avisos de altura.",
          },
        ],
      },
      {
        kind: "secuencia",
        titulo: "Piensa como piloto",
        intro: "No basta con traducir las abreviaturas. Al leer la casilla E), debes poder responder:",
        items: ["¿Qué está pasando?", "¿A qué operación afecta?", "¿Qué debo hacer diferente?"],
      },
      { kind: "sub", text: "¿Qué acabamos de descubrir?" },
      {
        kind: "p",
        text: "Un NOTAM no es un bloque de información que tienes que memorizar. Está organizado en diferentes partes, y cada una responde una pregunta:",
      },
      {
        kind: "secuencia",
        numerada: true,
        items: [
          "¿Cuál NOTAM es?",
          "¿Qué información contiene?",
          "¿Dónde aplica?",
          "¿Cuándo aplica?",
          "¿Qué está pasando?",
        ],
        nota: "En las siguientes lecciones vamos a aprender a interpretar cada una de estas partes.",
      },
      { kind: "sub", text: "¿Y cómo se ve un NOTAM fuera de Colombia?" },
      {
        kind: "p",
        text: "Hasta ahora hemos trabajado con un NOTAM de Colombia. Ahora vamos a llevar lo aprendido a un aeropuerto internacional. La lógica de interpretación sigue siendo la misma: identificar qué está pasando, dónde ocurre y cuándo aplica.",
      },
      {
        kind: "transicion",
        de: "Colombia · SKBO",
        a: "Chile · SCEL",
        nota: "Para verlo en la práctica, vamos a analizar un NOTAM real de Santiago de Chile.",
      },
      {
        kind: "notamPanel",
        rotulo: "NOTAM real · Santiago de Chile (SCEL)",
        etiqueta: "Cierre temporal de pista",
        pie: "Ahora vamos a leerlo como piloto. Pulsa D) o E) para ver qué dicen.",
        lineas: [
          { texto: "A2526/26 NOTAMN", marca: "Identificación" },
          { texto: "Q) SCEZ/QMRLC/IV/NBO/A/000/999/3324S07048W005", marca: "Información codificada" },
          { texto: "A) SCEL", marca: "¿Dónde?" },
          { texto: "B) 2609071600", marca: "¿Desde cuándo?" },
          { texto: "C) 2609122200", marca: "¿Hasta cuándo?" },
          {
            texto: "D) 07 BTN 1600-1700\n   08-09 BTN 2000-2200\n   12 BTN 1500-2200",
            marca: "¿Cuándo aplica?",
            detalle: {
              titulo: "¿Cuándo aplica?",
              texto: "La casilla D) especifica los días y horarios concretos en los que aplica el cierre.",
            },
          },
          {
            texto: "E) RWY 17L/35R CLSD",
            marca: "¿Qué está pasando?",
            fuerte: true,
            detalle: {
              titulo: "¿Qué está pasando?",
              texto: "La pista 17L/35R de Santiago está cerrada durante los períodos indicados en D).",
            },
          },
        ],
      },
      { kind: "sub", text: "¿Qué información contiene?" },
      {
        kind: "pasos",
        columnas: 2,
        items: [
          {
            rotulo: "Identificación",
            codigo: "A2526/26 NOTAMN",
            icono: "documento",
            completo: true,
            texto: "Identifica el NOTAM: serie A, número 2526, año 2026 y tipo NOTAMN, es decir, un NOTAM nuevo.",
          },
          {
            rotulo: "Q) Información codificada",
            codigo: "Q) SCEZ/QMRLC/IV/NBO/A/000/999/3324S07048W005",
            icono: "codigo",
            completo: true,
            texto: "La línea Q) contiene información codificada sobre el NOTAM: FIR, código de la condición, tipo de tránsito, objetivo, alcance, límites verticales y ubicación.",
            etiqueta: "Lo desglosaremos letra por letra más adelante",
          },
          {
            rotulo: "A) ¿Dónde?",
            codigo: "A) SCEL",
            icono: "ubicacion",
            texto: "Indica el aeródromo al que aplica el NOTAM: SCEL, Santiago de Chile, Arturo Merino Benítez.",
          },
          {
            rotulo: "B) ¿Desde cuándo?",
            codigo: "B) 2609071600",
            icono: "reloj",
            texto: "Indica el inicio de la vigencia: 7 de septiembre de 2026 a las 16:00 UTC.",
            etiqueta: "B = inicio de vigencia",
          },
          {
            rotulo: "C) ¿Hasta cuándo?",
            codigo: "C) 2609122200",
            icono: "reloj",
            texto: "Indica el final previsto de la vigencia: 12 de septiembre de 2026 a las 22:00 UTC.",
            etiqueta: "C = fin previsto de vigencia",
          },
          {
            rotulo: "D) ¿En qué horarios?",
            codigo: "D) 07 BTN 1600-1700\n   08-09 BTN 2000-2200\n   12 BTN 1500-2200",
            icono: "calendario",
            texto: "La condición no aplica continuamente durante todo el período indicado entre B) y C). La casilla D) especifica los días y horarios concretos en los que aplica el cierre.",
            etiqueta: "Esta información es clave para saber si el NOTAM afecta tu vuelo",
          },
          {
            rotulo: "E) ¿Qué está pasando?",
            codigo: "E) RWY 17L/35R CLSD",
            icono: "alerta",
            completo: true,
            fuerte: true,
            texto: "Esta es la información operacional principal del NOTAM. La pista 17L/35R de Santiago está cerrada durante los períodos indicados en D).",
          },
        ],
      },
      {
        kind: "kv",
        items: [
          { k: "RWY 17L/35R", v: "pista 17L/35R" },
          { k: "CLSD", v: "closed, cerrada" },
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "¿Qué debe hacer el piloto con esta información?",
        text: "Verificar si el cierre coincide con el horario de su operación y evaluar cómo afecta la pista prevista, los procedimientos y la planificación del vuelo.",
      },
      {
        kind: "p",
        text: "Vuelo hacia **SCEL**, Santiago de Chile. Mi llegada está prevista el 8 de septiembre entre 20:00 y 22:00 UTC.",
      },
      {
        kind: "check",
        titulo: "Léelo como piloto",
        question: "Según el NOTAM, ¿qué condición debo tener en cuenta?",
        options: [
          "La pista 17L/35R está cerrada durante todo el período entre B) y C)",
          "La pista 17L/35R está cerrada durante el período de mi operación, porque el horario está incluido en D)",
          "El NOTAM no afecta mi operación porque fue emitido por Chile",
        ],
        answer: 1,
        explain:
          "El NOTAM indica que la pista 17L/35R estará cerrada durante los períodos especificados en D). Como el horario de tu operación coincide con uno de esos períodos, debes considerar esta condición dentro de tu planificación.",
      },
      {
        kind: "secuencia",
        titulo: "Misma lógica, otro país",
        intro: "El aeropuerto cambió, pero la forma de analizar el NOTAM sigue siendo la misma:",
        orientacion: "horizontal",
        items: [
          "¿Dónde?",
          "¿Cuándo?",
          "¿En qué horario?",
          "¿Qué está pasando?",
          "¿Cómo afecta mi operación?",
        ],
        nota: "En las siguientes lecciones vamos a profundizar en cada una de estas partes para que puedas interpretar un NOTAM completo sin depender de la traducción literal de sus códigos.",
      },
    ],
  },

  // ── 5 ──────────────────────────────────────────────────────────────────────
  {
    n: 5,
    title: "La línea Q, pieza por pieza",
    kicker: "Los siete componentes del calificativo",
    minutes: 4,
    level: "intermedio",
    blocks: [
      // La sección ES el desglose. Antes eran dos párrafos de introducción, un
      // bloque breakdown y un consejo suelto al final: 181 palabras de prosa
      // para presentar algo que se explica solo si lo puedes tocar.
      { kind: "infografia", nombre: "notam-linea-q" },
      // ── El mapa completo, antes de entrar pieza por pieza ───────────────
      { kind: "sub", text: "Primero vemos el mapa completo" },
      {
        kind: "p",
        text: "La línea Q no se interpreta de una sola vez. Está formada por siete componentes y cada uno responde una pregunta diferente sobre el NOTAM.",
      },
      {
        kind: "cadena",
        items: [
          { token: "SEFG", rotulo: "FIR", color: LINEA_Q_COLOR.fir },
          { token: "QRALW", rotulo: "Código", color: LINEA_Q_COLOR.codigo },
          { token: "IV", rotulo: "Tránsito", color: LINEA_Q_COLOR.transito },
          { token: "NBO", rotulo: "Propósito", color: LINEA_Q_COLOR.objetivo },
          { token: "AW", rotulo: "Alcance", color: LINEA_Q_COLOR.alcance },
          { token: "000/001", rotulo: "Alturas", color: LINEA_Q_COLOR.limites },
          { token: "0202S07956W001", rotulo: "Área", color: LINEA_Q_COLOR.area },
        ],
      },
      {
        kind: "p",
        text: "Ahora vamos a tomar cada componente por separado y entender qué información aporta y cómo la utiliza un piloto.",
      },
      // ── ① SEFG ───────────────────────────────────────────────────────────
      {
        kind: "componente",
        n: 1,
        token: "SEFG",
        nombre: "FIR",
        detalle: "Flight Information Region",
        color: LINEA_Q_COLOR.fir,
      },
      {
        kind: "apartado",
        titulo: "¿Qué es una FIR?",
        parrafos: [
          "Una **FIR** (Flight Information Region) es una región definida de espacio aéreo dentro de la cual se proporcionan servicios de información de vuelo y servicio de alerta.",
          "Una FIR no es un aeropuerto ni una pista. Es una región de espacio aéreo que puede abarcar grandes extensiones y contener diferentes aeródromos, rutas y sectores.",
          "En la línea Q del NOTAM, el primer componente identifica la FIR asociada con la información.",
          "En el caso del NOTAM del ejemplo, `SEFG` corresponde a la FIR de Guayaquil.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/notam/fir-frecuentes.webp",
        alt: "Tabla de FIR frecuentes al consultar NOTAM en Colombia y la región SAM, con código, nombre y país: SKED Bogotá, SKEC Barranquilla, SEFG Guayaquil, MPZL Panamá, SPIM Lima-Callao, SVZM Maiquetía, SBAZ Amazónica, SBCW Curitiba, SCEZ Santiago, SCFZ Antofagasta, SLLF La Paz, SGFA Asunción, SUEO Montevideo y SACF Córdoba. Un recuadro advierte no confundir el indicador de la FIR con el de un aeródromo: SGFA es la FIR Asunción y SGAS el aeródromo; SUEO es la FIR Montevideo y SUMU el aeródromo de Carrasco. Y el consejo de piloto: el código FIR ubica la región del aviso, pero no determina por sí solo si afecta al vuelo.",
        ancho: 1312,
        alto: 1199,
      },
      {
        kind: "check",
        question:
          "Vuelas IFR a un aeródromo. En el paquete hay un NOTAM con `.../V/BO/W/...` en otra FIR. ¿Te aplica?",
        options: [
          "Sí: todo NOTAM del paquete aplica hasta que se demuestre lo contrario",
          "No, casi seguro: es de tránsito `V` (VFR) y alcance `W` (advertencia), y además en otra FIR",
          "Solo si tu ruta pasa por esa FIR, sin importar el tránsito",
        ],
        answer: 1,
        explain:
          "El tránsito y el alcance son el primer filtro de un paquete grande. `V` es VFR y `W` es advertencia de navegación: volando IFR a un aeródromo, y en otra FIR, ese aviso no es tuyo. Míralo, pero decide rápido.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "En el resumen colombiano no vas a ver la línea Q",
        text: "El resumen mensual de la Aerocivil publica los NOTAM en formato de tabla, sin la línea Q: trae el número, el aeródromo, las fechas y el texto. La línea Q la ves en el formato completo, que es el que llega por el briefing AIS y el que usan los ejemplos internacionales de este documento. No la busques en los avisos colombianos que aparecen más adelante: no está.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Pendiente normativo",
        text: "Las tablas normativas completas de calificativos están en el Doc 8126, que todavía no cargamos. Lo que ves aquí viene del Doc 8400 y de la bibliografía de curso.",
      },
    ],
  },

  // ── 6 ──────────────────────────────────────────────────────────────────────
  {
    n: 6,
    title: "El código NOTAM de cinco letras",
    kicker: "Asunto y estado en cinco letras",
    minutes: 4,
    level: "intermedio",
    blocks: [
      {
        kind: "p",
        text: "Reglas (Doc 8400, §3, pág. 7-1): son cinco letras y siempre empieza por **Q**. La **2ª y 3ª letras indican el asunto**, la **4ª y 5ª el estado**.",
      },
      {
        kind: "breakdown",
        caption:
          "Con esas dos parejas armas la frase: sujeto (`MR`, la pista) y qué le pasa (`LC`, cerrada). Todos los códigos se leen igual.",
        parts: [
          { token: "Q", label: "fija", detail: "Todo código NOTAM empieza por Q." },
          {
            token: "MR",
            label: "asunto",
            detail: "2ª y 3ª letras: `M` es área de movimiento y `MR` es la pista.",
          },
          {
            token: "LC",
            label: "estado",
            detail: "4ª y 5ª letras: `L` son limitaciones y `LC` es cerrado.",
          },
        ],
      },
      { kind: "p", text: "**Asuntos** (2ª y 3ª letras), agrupados por sección:" },
      {
        kind: "kv",
        items: [
          { k: "AGA", v: "`L` iluminación · `M` área de movimiento · `F` instalaciones y servicios" },
          { k: "COM", v: "`C` comunicaciones y radar · `I` ILS/MLS · `N` navegación · `G` GNSS" },
          { k: "RAC", v: "`A` espacio aéreo · `S` servicios ATS y VOLMET · `P` procedimientos" },
          { k: "Avisos para la navegación", v: "`R` restricciones · `W` avisos (warnings)" },
          { k: "Otras informaciones", v: "`O`" },
        ],
      },
      {
        kind: "p",
        text: "**Estados** (4ª y 5ª letras): `A` disponibilidad, `C` cambios, `H` condiciones de peligro, `L` limitaciones, `XX` otros.",
      },
      { kind: "p", text: "**Casos especiales** (§3.3 a §3.8):" },
      {
        kind: "list",
        items: [
          "Asunto o condición que no figura en las tablas: se usa `XX` y el texto va en lenguaje claro.",
          "`QKKKK` es la checklist de NOTAM válidos.",
          "`TT` en 4ª y 5ª letras marca un NOTAM iniciador de enmienda o suplemento AIP AIRAC.",
          "Cancelan un NOTAM: `AK` (operación normal reanudada), `AL` (opera con limitaciones ya publicadas), `AO` (operacional), `CC` (completado) y `XX`.",
        ],
      },
      {
        kind: "p",
        text: "**El caso `TT` en la práctica.** Un NOTAM iniciador no trae la información: avisa de que salió una publicación AIP y te manda a leerla.",
      },
      {
        kind: "notam",
        id: "N17",
        caption:
          "`TRIGGER NOTAM - AIP SUP 35/26` con `WEF 20 JUL 2026`: anuncia el suplemento 35 del AIP, con efecto desde el 20 de julio. Fíjate en la vigencia corta, del 20 de julio al 2 de agosto: el trigger acompaña a la publicación y se retira, pero el suplemento sigue vigente. Si te quedas con este aviso y no abres el AIP SUP, no te enteraste de nada.",
      },
      {
        kind: "p",
        text: "**Los que más vas a ver** (tablas del Doc 8400, sección 7). Esta es la tabla que el Decodificador trae completa, recortada a lo que aparece en casi todo briefing:",
      },
      {
        kind: "table",
        head: ["Código", "Asunto", "Estado", "Qué significa"],
        rows: [
          ["`QMRLC`", "`MR` pista", "`LC` cerrada", "Pista cerrada"],
          ["`QMRLT`", "`MR` pista", "`LT` limitada", "Pista sujeta a limitaciones"],
          ["`QMXLC`", "`MX` calle de rodaje", "`LC` cerrada", "Calle de rodaje cerrada"],
          ["`QLPAS`", "`LP` PAPI", "`AS` inutilizable", "PAPI inoperativo"],
          ["`QNVAS`", "`NV` VOR", "`AS` inutilizable", "VOR fuera de servicio"],
          ["`QICAS`", "`IC` ILS", "`AS` inutilizable", "ILS fuera de servicio"],
          ["`QOBCE`", "`OB` obstáculo", "`CE` erigido", "Obstáculo nuevo montado"],
          ["`QRRCA`", "`RR` zona restringida", "`CA` activada", "Zona restringida activada"],
          ["`QWMLW`", "`WM` ejercicios de tiro", "`LW` se realizarán", "Habrá ejercicios de tiro"],
          ["`QPDAW`", "`PD` SID", "`AW` retirada", "SID retirada definitivamente"],
        ],
      },
      {
        kind: "p",
        text: "**Así se ve `QFALC` en la vida real.** Magangué, en el resumen de la Aerocivil:",
      },
      {
        kind: "notam",
        id: "N13",
        caption:
          "`AD CLSD` es aeródromo cerrado: asunto `FA` (aeródromo) y estado `LC` (cerrado). El resumen no imprime el código de cinco letras, pero el texto de la casilla E) tiene que ser coherente con él, y aquí lo es. Ojo al `1100-2300`: el cierre es de once de la mañana a once de la noche UTC, no todo el día.",
      },
      {
        kind: "p",
        text: "Y este es un `QOBCE`, obstáculo montado, uno de los pocos NOTAM que te dan coordenadas y altura del obstáculo:",
      },
      {
        kind: "notam",
        id: "N5",
        caption:
          "Asunto `OB` (obstáculo) y estado `CE` (erigido). El aviso da el tipo, las coordenadas, la elevación y la altura de cada silo, que es justo lo que necesitas para saber si te afecta en aproximación.",
      },
      {
        kind: "check",
        question: "Vuelas IFR de noche y el NOTAM del destino trae `QMRLN`. ¿Puedes aterrizar?",
        options: [
          "No: `LN` es cerrada de noche, y es justo cuando llegas",
          "Sí: `LN` es cerrada solo para vuelos nocturnos VFR",
          "Sí: `LN` significa limitación de longitud, no cierre",
        ],
        answer: 0,
        explain:
          "`MR` es la pista y `LN` es cerrada de noche. Es el grupo de estados que más se confunde: `LC` es cerrada del todo, `LI` solo para IFR, `LV` solo para VFR y `LN` solo de noche. Se parecen a simple vista y deciden si operas o no.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error común: cerrado no siempre es cerrado",
        text: "`LC` es cerrado del todo, pero `LI` es cerrado solo para IFR, `LV` solo para VFR y `LN` solo de noche. Las cuatro se parecen a simple vista y cambian por completo si puedes operar o no.",
      },
      {
        kind: "summary",
        items: [
          "Cinco letras: `Q` fija, dos de **asunto** y dos de **estado**.",
          "Léelo como una frase: sujeto y qué le pasa. `QNVAS` es \"el VOR está inutilizable\".",
          "Si el asunto o el estado no está en las tablas se usa `XX` y el texto va en lenguaje claro en la casilla E).",
          "El código Q y la casilla E) tienen que decir lo mismo. Si no coinciden, sospecha del mensaje.",
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Abre el Decodificador",
        text: "Las tablas completas (168 códigos de asunto y 78 de estado, con su fraseología) están en el Decodificador de esta sección. Ahí escribes un código como `QMRLC` y ves qué significa, o buscas por palabra.",
      },
    ],
  },

  // ── 7 ──────────────────────────────────────────────────────────────────────
  {
    n: 7,
    title: "Los ítems A) a G), uno por uno",
    kicker: "Dónde, cuándo, qué y entre qué niveles",
    minutes: 6,
    level: "intermedio",
    blocks: [
      {
        kind: "p",
        text: "La línea Q te dice de qué va el NOTAM. Los ítems te dicen **dónde**, **cuándo**, **qué** exactamente y **entre qué niveles**. Cada uno tiene sus trampas.",
      },

      { kind: "p", text: "**A) Dónde aplica**" },
      {
        kind: "list",
        items: [
          "Lleva el **indicador de lugar OACI de cuatro letras**: `SKBO` para Bogotá/El Dorado, `SKRG` para Rionegro, `SKCL` para Cali.",
          "Si el NOTAM es de ruta o de espacio aéreo, aquí va el **indicador de la FIR**: `SKED` es la FIR Bogotá.",
          "Puede haber **más de un indicador** cuando la condición afecta a varios aeródromos.",
          "Si el aeródromo no tiene indicador OACI asignado, se usa el genérico de la nación y el nombre va en la casilla E).",
        ],
      },
      { kind: "code", text: "A) SKBO\nA) SKED\nA) SKBO SKRG SKCL" },

      { kind: "p", text: "**B) Desde cuándo**" },
      {
        kind: "list",
        items: [
          "Grupo de **10 dígitos: AAMMDDHHMM**, siempre en **UTC**. `2606031100` es el 3 de junio de 2026 a las 11:00 UTC, o sea las 06:00 en Colombia.",
          "El inicio del día se escribe `0000`.",
          "`WIE` (with immediate effect) significa que entra en vigor de inmediato.",
          "**En NOTAMR y NOTAMC**, B) no es el inicio de la condición: es la fecha y hora en que se creó el mensaje (curso, pág. 27).",
        ],
      },

      { kind: "p", text: "**C) Hasta cuándo**" },
      {
        kind: "list",
        items: [
          "Mismo formato de 10 dígitos en UTC. El fin del día se escribe `2359`.",
          "`PERM` significa **permanente**: la condición no termina, y en algún momento pasará al AIP.",
          "`EST` marca que el fin es **estimado**. Un NOTAM con `EST` sigue vigente aunque pase esa fecha, hasta que lo reemplacen o lo cancelen.",
          "`UFN` (until further notice) es hasta nuevo aviso.",
          "**El NOTAMC no lleva casilla C)** (curso, pág. 28): cancela, no tiene fin de validez propio.",
        ],
      },
      { kind: "code", text: "B) 2606031100  C) 2608302359\nB) 2606031100  C) 2609150000 EST\nB) 2606031100  C) PERM" },
      {
        kind: "p",
        text: "**Los dos casos, en avisos reales.** Primero uno con **fechas firmes**: empieza y termina cuando dice, sin más.",
      },
      {
        kind: "notam",
        id: "N1",
        // Ejemplo de referencia de `casillas`. Los otros tres NOTAM de esta
        // sección (N8, N4, N24) todavía no lo tienen: se ven, no se decodifican.
        casillas: [
          { cas: "A)", contenido: "SKPB", significa: "Uribia, Puerto Bolívar (Portete)" },
          { cas: "B)", contenido: "2605281100", significa: "Inicio: 28 may 2026, 11:00 UTC" },
          { cas: "C)", contenido: "2608252359", significa: "Fin: 25 ago 2026, 23:59 UTC" },
          {
            cas: "D)",
            contenido: "no aparece",
            significa:
              "Que falte es la forma de decir que aplica **de corrido**, sin horario diario",
          },
          {
            cas: "E)",
            contenido: "AD LTD, AVBL ACFT HASTA CAT B",
            significa:
              "Aeródromo limitado: solo disponible para aeronaves hasta categoría B. De CAT C en adelante no pueden operar mientras rija",
          },
        ],
        caption:
          "Del 28 de mayo al 25 de agosto, sin `EST` y sin horario diario. Puerto Bolívar opera limitado a aeronaves hasta categoría B durante todo ese período, de corrido.",
      },
      { kind: "p", text: "Y ahora uno con **`EST`**, que es donde se cuela el error:" },
      {
        kind: "notam",
        id: "N8",
        caption:
          "El faro de aeródromo de Riohacha está inutilizable, con fin **estimado** el 30 de agosto. Esa fecha es un cálculo de quien publicó el aviso, no un compromiso: si llega el 31 y no salió un NOTAM que lo reemplace o lo cancele, el faro sigue fuera de servicio.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error común: EST no es lo mismo que vencido",
        text: "Ver una fecha `EST` ya pasada no significa que el NOTAM caducó. Significa que quien lo publicó estimó mal cuándo terminaría. Sigue vigente hasta que salga el NOTAMR o el NOTAMC.",
      },

      { kind: "p", text: "**D) A qué horas, dentro de ese período**" },
      {
        kind: "list",
        items: [
          "Solo aparece cuando la condición **no es continua** entre B) y C).",
          "Ejemplo típico: la pista está cerrada del 3 de junio al 30 de agosto, pero solo entre las 05:00 y las 10:00 de cada día (curso, pág. 29).",
          "Puede traer días de la semana, meses o referencias al sol: `SR` es salida del sol y `SS` es puesta del sol.",
          "Si el texto de D) es muy largo, el Anexo 15 recomienda publicar varios NOTAM consecutivos en vez de uno solo.",
        ],
      },
      { kind: "code", text: "D) 0500-1000\nD) MON-FRI 1200-1400\nD) DLY SR-SS" },
      {
        kind: "p",
        text: "**Ese es exactamente el caso de El Dorado.** Mira dónde está el horario diario en un NOTAM real:",
      },
      {
        kind: "notam",
        id: "N4",
        caption:
          "Las dos primeras fechas son B) y C): del 16 al 31 de julio. El `0500-1000` que va detrás es la casilla D): la pista 14R/32L solo está cerrada entre las 05:00 y las 10:00 UTC, o sea de medianoche a 5 de la mañana en Colombia. El resto del día opera normal.",
      },
      {
        kind: "check",
        question:
          "Un NOTAM dice `B) 2607160500  C) 2607311000  0500-1000`. Llegas a El Dorado el 20 de julio a las 14:00 UTC. ¿Te afecta el cierre?",
        options: [
          "Sí: el 20 de julio está dentro del período B) a C)",
          "No: el cierre es solo de 05:00 a 10:00 UTC, y llegas a las 14:00",
          "No: el NOTAM ya expiró el 16 de julio",
        ],
        answer: 1,
        explain:
          "El bloque `0500-1000` es la casilla D), el horario diario. El período dice qué días y la casilla D) dice a qué horas dentro de esos días. A las 14:00 UTC la pista opera normal.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error común: leer solo B) y C)",
        text: "Sin la casilla D), ese NOTAM parece decir que El Dorado tiene una pista menos durante quince días seguidos. Con ella, son cinco horas de madrugada. Es la diferencia entre replanear el vuelo y no tocarlo.",
      },

      { kind: "p", text: "**E) Qué pasa exactamente**" },
      {
        kind: "list",
        items: [
          "Texto en **lenguaje claro con abreviaturas OACI**. Es la casilla que de verdad te dice qué está pasando.",
          "Debe ser **coherente con el código Q**: si el código dice `QMRLC` (pista cerrada), E) tiene que hablar de una pista cerrada. Si no coinciden, sospecha del NOTAM y confirma.",
          "Tiene su propia sección más adelante en este documento, con las abreviaturas.",
        ],
      },

      { kind: "p", text: "**F) y G) Entre qué niveles**" },
      {
        kind: "list",
        items: [
          "Solo aparecen en **restricciones y avisos de espacio aéreo**: zonas de tiro, actividad de drones, globos, fuegos artificiales, ejercicios militares.",
          "**F)** es el límite **inferior** y **G)** el **superior**.",
          "`GND` es el nivel del terreno y `SFC` la superficie. `UNL` es ilimitado (curso, pág. 31).",
          "También se escriben como altitud (`3000FT AMSL`) o como nivel de vuelo (`FL180`).",
          "Deben **coincidir con los límites de la línea Q**: si Q) dice `000/060` y F)/G) dicen otra cosa, hay un error en el mensaje.",
        ],
      },
      { kind: "code", text: "F) GND        G) 2000FT AMSL\nF) SFC        G) UNL\nF) FL100      G) FL180" },
      {
        kind: "p",
        text: "**En el resumen colombiano los límites viajan dentro del texto.** Este aviso de la FIR Bogotá los trae escritos de corrido:",
      },
      {
        kind: "notam",
        id: "N24",
        caption:
          "`FM GND TIL 10000FT AMSL` es exactamente F) y G): desde el terreno hasta 10 000 ft sobre el nivel del mar. Por encima de esa altura el aviso no te aplica. Y ojo con lo que dice: el área de control de Cali no se cierra, se queda **sin cobertura radar** en 30 NM alrededor del VOR TCO, así que la separación pasa a ser convencional.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Tip operacional: el orden de lectura no es el orden del papel",
        text: "En el aire lo natural es leer A) para saber si te toca, después B), C) y D) para saber si te toca hoy, y solo entonces E). El código Q lo confirmas al final, para verificar que lo que entendiste es lo que el mensaje dice.",
      },
      {
        kind: "summary",
        items: [
          "**A)** dónde: indicador OACI de aeródromo o de FIR, y pueden ir varios.",
          "**B)** y **C)** cuándo: diez dígitos `AAMMDDHHMM` en UTC. `PERM`, `EST` y `UFN` cambian cómo termina.",
          "**D)** a qué horas dentro de ese período. Si está, el NOTAM no aplica todo el día.",
          "**E)** qué pasa, en lenguaje claro. Tiene que ser coherente con el código Q.",
          "**F)** y **G)** entre qué niveles, solo cuando hay espacio aéreo de por medio.",
        ],
      },
    ],
  },

  // ── 8 ──────────────────────────────────────────────────────────────────────
  {
    n: 8,
    title: "La casilla E) y la fraseología abreviada",
    kicker: "Leer el texto en lenguaje claro",
    minutes: 3,
    level: "intermedio",
    blocks: [
      {
        kind: "p",
        text: "La casilla E) usa **abreviaturas OACI** y la **fraseología abreviada uniforme** del código, ampliada con pista, frecuencia, coordenadas o cifras (Doc 8400, §4 a §6, pág. 7-2). La ampliación del **asunto** va **antes** del significado. La del **estado**, **después**.",
      },
      { kind: "p", text: "**Ejemplos oficiales de casilla E)** (Doc 8400, pág. 7-2):" },
      {
        kind: "table",
        head: ["Situación", "Casilla E)"],
        rows: [
          [
            "Luces de zona de toma de contacto de la RWY 27 no disponibles por corte de energía",
            "`RWY 27 RTZL NOT AVBL POR INTERRUPCIÓN DE PWR`",
          ],
          ["Luces de borde de la TWY B disimuladas por nieve", "`TWY B EDGE LGT OBSCURED BY SN`"],
          ["Bancos de nieve de 15 ft en la franja de la RWY 09/27", "`RWY 09/27 STRIP SN BANKS HGT 15 FT`"],
          [
            "MSA de 90° a 180° hacia el VOR DOM cambiada a 3 600 ft MSL",
            "`90 A 180 DEG INBD VOR DOM MSA CHANGED 3600 FT MSL`",
          ],
        ],
      },
      {
        kind: "notam",
        id: "N18",
        caption:
          "La misma fraseología, pero de la Aerocivil y sin una sola palabra de más: `RWY 02/20 WIP, EXER CTN`. Tres abreviaturas y ya está dicho todo: pista 02/20, obras en progreso, ejerza precaución. Esto es lo que de verdad te vas a encontrar en la casilla E).",
      },
      {
        kind: "check",
        question: "¿Qué dice `RWY 27 RTZL NOT AVBL DUE TO PWR FAILURE`?",
        options: [
          "La pista 27 está cerrada por un corte de energía",
          "Las luces de zona de toma de contacto de la 27 no están disponibles por corte de energía",
          "El sistema de aproximación de la 27 quedó sin alimentación de respaldo",
        ],
        answer: 1,
        explain:
          "`RTZL` son las luces de zona de toma de contacto y `NOT AVBL` es no disponible. La pista sigue abierta: lo que falta es una ayuda visual, que cambia los mínimos nocturnos pero no cierra nada.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Traduce siempre a una frase entera",
        text: "No leas E) como una sopa de siglas. Conviértela en una oración con sujeto, qué le pasa y desde cuándo. Si no puedes decirla en voz alta en español, todavía no la entendiste.",
      },
    ],
  },

  // ── 9 ──────────────────────────────────────────────────────────────────────
  {
    n: 9,
    title: "Abreviaturas OACI que vas a ver siempre",
    kicker: "El mínimo para leer la casilla E)",
    minutes: 4,
    level: "intermedio",
    blocks: [
      {
        kind: "p",
        text: "Estas son las abreviaturas que aparecen una y otra vez en la casilla E). Con estas lees la mayoría de los NOTAM de aeródromo. Están verificadas en el Doc 8400, sección 1.",
      },

      { kind: "p", text: "**Lugares e instalaciones**" },
      {
        kind: "kv",
        items: [
          { k: "AD", v: "aeródromo" },
          { k: "RWY", v: "pista" },
          { k: "TWY", v: "calle de rodaje" },
          { k: "APN", v: "plataforma" },
          { k: "THR", v: "umbral" },
          { k: "APCH", v: "aproximación" },
          { k: "PRKG", v: "estacionamiento" },
          { k: "OBST", v: "obstáculo" },
        ],
      },

      { kind: "p", text: "**Estado y condición**" },
      {
        kind: "kv",
        items: [
          { k: "AVBL", v: "disponible" },
          { k: "U/S", v: "inutilizable" },
          { k: "CLSD", v: "cerrado" },
          { k: "ACT", v: "activo" },
          { k: "WIP", v: "obras en progreso" },
          { k: "MAINT", v: "mantenimiento" },
          { k: "INSTL", v: "instalado" },
          { k: "CTN", v: "precaución" },
        ],
      },

      { kind: "p", text: "**Tiempo**" },
      {
        kind: "kv",
        items: [
          { k: "FM", v: "desde" },
          { k: "TIL", v: "hasta" },
          { k: "BTN", v: "entre" },
          { k: "DLY", v: "diariamente" },
          { k: "PERM", v: "permanente" },
          { k: "EST", v: "estimado" },
          { k: "UFN", v: "hasta nuevo aviso" },
          { k: "WEF", v: "con efecto a partir de" },
          { k: "SR", v: "salida del sol" },
          { k: "SS", v: "puesta del sol" },
        ],
      },

      { kind: "p", text: "**Distancias declaradas de pista**" },
      {
        kind: "kv",
        items: [
          { k: "TORA", v: "recorrido de despegue disponible" },
          { k: "TODA", v: "distancia de despegue disponible" },
          { k: "ASDA", v: "distancia de aceleración-parada disponible" },
          { k: "LDA", v: "distancia de aterrizaje disponible" },
        ],
      },
      {
        kind: "p",
        text: "Las cuatro aparecen juntas cuando un NOTAM modifica las **distancias declaradas** de una pista, que es exactamente lo que pasa en el NOTAM `C2222/26` de Maicao que vas a ver en el modo práctica.",
      },
      {
        kind: "check",
        question:
          "Un NOTAM modifica las distancias declaradas y la `ASDA` queda más corta que las otras tres. ¿Qué operación penaliza?",
        options: [
          "El aterrizaje, porque la ASDA es la distancia de aterrizaje disponible",
          "El despegue con falla de motor, porque la ASDA es la de aceleración y parada",
          "El rodaje, porque la ASDA mide la calle de salida",
        ],
        answer: 1,
        explain:
          "`ASDA` es la distancia de aceleración-parada disponible: la que necesitas si abortas el despegue. La de aterrizaje es `LDA`. Cuando la ASDA baja, lo que cambia es tu V1 y tu peso máximo de despegue.",
      },
      {
        kind: "notam",
        id: "N21",
        caption:
          "Con la lista de arriba ya lo lees entero: `THR` es umbral, `EXER CTN` es ejercer precaución y `EST` es estimado. Un bache en el umbral de la 05 de Barranquilla, y una fecha de fin que es un cálculo, no una promesa.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "El glosario completo está en el Decodificador",
        text: "Aquí tienes el subconjunto que más se repite. El glosario completo, más las 168 tablas de asunto y las 78 de estado, están en el Decodificador de esta sección. Tenlo abierto mientras practicas.",
      },
    ],
  },

  // ── 10 ─────────────────────────────────────────────────────────────────────
  {
    n: 10,
    title: "Decodificación completa, paso a paso",
    kicker: "Dos NOTAM decodificados enteros",
    minutes: 4,
    level: "intermedio",
    blocks: [
      {
        kind: "p",
        text: "**Ejemplo oficial** (Doc 8400, pág. 7-3, decodificado casilla por casilla en el propio documento):",
      },
      {
        kind: "code",
        text: "Q) LFFF/QNDAU/IV/BO/AE/...\nA) LFPO  B) 9203312359  C) 9204010600\nE) DME NOT AVBL",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "`LFFF` es el FIR de París.",
          "`QNDAU`: `ND` es DME y `AU` es no disponible.",
          "`IV` afecta a IFR y a VFR.",
          "`BO` va al boletín previo al vuelo y es significativo para IFR.",
          "`AE` es alcance de ayuda terminal y en ruta.",
          "`A) LFPO` es París/Orly.",
          "`B)` 31 mar 1992 a las 23:59 UTC y `C)` 1 abr 1992 a las 06:00 UTC.",
          "`E)` DME no disponible.",
        ],
      },
      {
        kind: "example",
        title: "Ejemplo resuelto: NOTAM internacional completo",
        code: "A0682/06 NOTAMN\nQ)SCEZ/QMXLC/IV/M/A/000/999/3323S07047W005\nA)SCEL B)0606091958 C)0606242359\nE)TWY TANGO CLSD BTN TWY KILO AND ZULU PRKG ACFT",
        steps: [
          "**Encabezado:** serie A, número 0682 de 2006, tipo `NOTAMN`, o sea nuevo. No reemplaza nada.",
          "**Código Q:** `QMXLC`. `MX` es calle de rodaje y `LC` es cerrada.",
          "**Tránsito y alcance:** `IV` afecta a IFR y VFR, objetivo `M` (misceláneo), alcance `A` (aeródromo). Si vuelas a Santiago te aplica.",
          "**Límites y área:** `000/999` son los niveles por defecto y el área es un círculo de 5 NM centrado en 33°23'S 70°47'W.",
          "**A)** `SCEL`, Arturo Merino Benítez. **B)** y **C)**: del 9 de junio a las 19:58 UTC al 24 de junio a las 23:59 UTC de 2006. No hay casilla D), así que es continuo.",
          "**E)** `TWY TANGO CLSD BTN TWY KILO AND ZULU PRKG ACFT`: calle de rodaje TANGO cerrada entre KILO y ZULU por estacionamiento de aeronaves.",
        ],
        answer:
          "En Santiago, la calle de rodaje TANGO está cerrada entre KILO y ZULU, sin interrupción, del 9 al 24 de junio. Toca planear rodajes alternos en superficie: el cierre no afecta la pista.",
      },
      {
        kind: "check",
        question:
          "En `Q)LFFF/QNDAU/IV/BO/AE/...`, ¿qué instalación está afectada y qué le pasa?",
        options: [
          "El VOR, y está fuera de servicio",
          "El DME, y no está disponible",
          "La pista, y está limitada",
        ],
        answer: 1,
        explain:
          "Del código `QNDAU`: `ND` es DME y `AU` es no disponible. El VOR sería `NV`. Recuerda la regla: 2ª y 3ª letras el asunto, 4ª y 5ª el estado.",
      },
      {
        kind: "summary",
        items: [
          "Encabezado y `A)` primero: qué NOTAM es y si te toca.",
          "Código Q después: qué cosa y qué le pasa, en cinco letras.",
          "Fechas y horario: siempre UTC, y Colombia va cinco horas atrás.",
          "`E)` al final, expandiendo las abreviaturas hasta poder decirlo en voz alta en español.",
        ],
      },
    ],
  },

  // ── 11 ─────────────────────────────────────────────────────────────────────
  {
    n: 11,
    title: "NOTAM en Colombia: el resumen mensual de la Aerocivil",
    kicker: "Leer el resumen mensual DRT",
    minutes: 4,
    level: "avanzado",
    blocks: [
      {
        kind: "p",
        text: "La Dirección de Informática (DRT) de la Aerocivil publica el **resumen mensual de NOTAM vigentes** por series. Los archivos reales que usa esta app son las series **Alfa** y **Charlie/Delta**, con corte al 29 de julio de 2026. El encabezado del resumen Charlie/Delta lo dice:",
      },
      {
        kind: "quote",
        text: "Los siguientes NOTAM serie CHARLIE/DELTA continúan vigentes (...) Los no incluidos han sido cancelados, reemplazados, han expirado o fueron publicados en el Manual AIP/COLOMBIA.",
        source: "Aerocivil, DRT: resumen mensual de NOTAM vigentes, corte 29 JUL 2026",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Todas las horas son UTC",
        text: "El resumen no usa hora local en ninguna columna. Colombia va en UTC menos 5, así que resta cinco horas para saber a qué hora local aplica.",
      },
      { kind: "p", text: "**Cómo se lee cada fila del resumen.** Esta es real, de Maicao:" },
      { kind: "notam", id: "N2" },
      {
        kind: "breakdown",
        caption:
          "El resumen no usa las letras de casilla, pero la fila trae la misma información y en el mismo orden. Aprendida la equivalencia, lees el resumen igual que un NOTAM estándar.",
        parts: [
          { token: "C 2222/26", label: "encabezado", detail: "Serie C, NOTAM 2222 del año 2026." },
          {
            token: "MAICAO/JORGE ISAACS (SKLM)",
            label: "equivale a A)",
            detail: "Nombre del aeródromo o FIR con su indicador OACI.",
          },
          { token: "2606031100", label: "equivale a B)", detail: "3 de junio de 2026 a las 11:00 UTC." },
          {
            token: "2608302359",
            label: "equivale a C)",
            detail: "30 de agosto de 2026 a las 23:59 UTC. Aquí puede aparecer `EST` o `PERM`.",
          },
          {
            token: "DIST DECLARADAS RWY 10/28 MODIFICADAS",
            label: "equivale a E)",
            detail: "El texto en lenguaje claro, con las abreviaturas OACI de siempre.",
          },
        ],
      },
      {
        kind: "list",
        items: [
          "Si entre las fechas y el texto aparece un bloque tipo `0500-1000`, es el **horario diario**, es decir la casilla D).",
          "En los NOTAM de espacio aéreo, las columnas Desde y Hasta equivalen a F) y G).",
          "`RPLC NOTAM C 0756/26` significa que reemplaza al NOTAM indicado, es decir que se comporta como un NOTAMR.",
        ],
      },
      {
        kind: "example",
        title: "Ejemplo resuelto: el NOTAM de Maicao, entero",
        code: "C 2222/26  MAICAO/JORGE ISAACS (SKLM)\n2606031100 / 2608302359\nDIST DECLARADAS RWY 10/28 MODIFICADAS:\nRWY 10: TORA(M)1700 TODA(M)1800 ASDA(M)1550 LDA(M)1700\nRWY 28: TORA(M)1700 TODA(M)1700 ASDA(M)1550 LDA(M)1700",
        steps: [
          "Serie C, número 2222 de 2026, en Jorge Isaacs de Maicao (`SKLM`).",
          "Vigente del 3 de junio a las 11:00 UTC (06:00 en Colombia) al 30 de agosto a las 23:59 UTC. Sin horario diario: aplica de corrido.",
          "`DIST DECLARADAS` son las **distancias declaradas** de la pista, la sección de abreviaturas te las dejó listas: `TORA` recorrido de despegue, `TODA` distancia de despegue, `ASDA` aceleración-parada y `LDA` aterrizaje. La `(M)` es que van en metros.",
          "Para la 10: despegas con 1700 m, tienes 1800 m contando la zona libre de obstáculos, 1550 m para acelerar y parar, y 1700 m para aterrizar.",
          "Para la 28 cambia una sola cifra: la `TODA` baja a 1700 m.",
        ],
        answer:
          "Maicao operó con distancias declaradas reducidas todo ese período. La cifra que manda es la `ASDA` de 1550 m: es la que penaliza el despegue con falla de motor, y es más corta que cualquiera de las otras tres. Con este NOTAM en la mano, la performance de despegue se recalcula.",
      },
      {
        kind: "check",
        question:
          "En una fila del resumen colombiano lees `2606031100 / 2608302359 EST`. ¿Qué pasa el 31 de agosto?",
        options: [
          "El NOTAM caduca automáticamente y deja de aplicar",
          "Sigue vigente: el fin era estimado y solo termina con un reemplazo o una cancelación",
          "Se renueva solo por otros tres meses",
        ],
        answer: 1,
        explain:
          "`EST` marca que quien publicó el aviso **estimó** cuándo terminaría. Pasada esa fecha el NOTAM sigue vigente hasta que salga el que lo reemplaza o lo cancela. Darlo por vencido es de los errores que más cuestan en un briefing.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Material colombiano auténtico",
        text: "En el modo práctica de esta sección ves imágenes reales de este resumen (SKPB, SKLM, SKBO, SKRG, FIR Bogotá y más) para entrenar con NOTAM nacionales. Son material de estudio con vigencia ya expirada.",
      },
    ],
  },

  // ── 12 ─────────────────────────────────────────────────────────────────────
  {
    n: 12,
    title: "SNOWTAM y ASHTAM",
    kicker: "Las dos series con formato propio",
    minutes: 5,
    level: "avanzado",
    blocks: [
      {
        kind: "p",
        text: "Hay dos situaciones que la OACI sacó del formato normal porque necesitan datos muy específicos y muy rápido: la **contaminación de la pista** y la **ceniza volcánica**. Cada una tiene su propia serie, con su propio formato, definido en el **Anexo 15**.",
      },

      { kind: "p", text: "**SNOWTAM: contaminación del área de movimiento**" },
      {
        kind: "list",
        items: [
          "Informa condiciones peligrosas por **nieve, nieve fundente, hielo, escarcha o agua estancada** en pistas, calles de rodaje y plataformas (Doc 8400, pág. 1-24).",
          "Se identifica con un **número de serie propio** y lleva el indicador del aeródromo.",
          "Reporta la pista **dividida en tres tercios**, cada uno con su **código de estado de pista** de 0 a 6: `6` es pista seca y `0` es la peor condición. También el tipo de contaminante, su espesor en milímetros y qué porcentaje de la pista cubre.",
          "Su **validez máxima es de 8 horas**. Un SNOWTAM nuevo reemplaza automáticamente al anterior del mismo aeródromo.",
          "Trae además una sección de información para la conciencia situacional: calles de rodaje y plataformas afectadas, bancos de nieve, luces tapadas y observaciones en lenguaje claro.",
        ],
      },
      { kind: "p", text: "**Ejemplo de formato**, aeródromo SKBO, pista 13R:" },
      {
        kind: "kv",
        items: [
          { k: "A) SKBO", v: "Indicador OACI del aeródromo." },
          { k: "B) 07301245", v: "Fecha y hora de la observación, `DDHHMM` en UTC." },
          { k: "C) 13R", v: "Pista que se reporta." },
          { k: "D) 5/5/3", v: "Código de estado de pista por tercio: los dos primeros tercios en 5, el último en 3." },
          { k: "E) 100/100/100", v: "Porcentaje de cada tercio cubierto por el contaminante." },
          { k: "F) NR/NR/3", v: "Espesor del contaminante en milímetros. `NR` es no reportado." },
          { k: "G) DRY/DRY/WET", v: "Descripción de la condición de cada tercio." },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Por qué te importa si vuelas en Colombia",
        text: "Nieve casi nunca, pero agua estancada sí. El mismo formato reporta pista mojada y encharcada, y el código de estado de pista es el dato que usas para calcular la distancia de aterrizaje en condiciones no secas.",
      },

      { kind: "p", text: "**ASHTAM: actividad volcánica y ceniza**" },
      {
        kind: "list",
        items: [
          "Informa **actividad volcánica, erupciones y nubes de ceniza** que afectan a la navegación aérea. Se emite por **FIR**, no por aeródromo.",
          "Su dato central es el **código de color del nivel de alerta**: **verde** (volcán en estado normal), **amarillo** (actividad por encima de lo normal), **naranja** (erupción probable o en curso sin columna significativa) y **rojo** (erupción con columna de ceniza en la atmósfera).",
          "Incluye el nombre y el número del volcán, su posición, la altura y la dirección de movimiento de la nube, y las rutas y niveles de vuelo afectados o cerrados.",
          "Su **validez máxima es de 24 horas**, y se emite uno nuevo en cuanto cambia el nivel de alerta.",
          "Va acompañado de los avisos de ceniza volcánica que emiten los centros VAAC.",
        ],
      },
      { kind: "p", text: "**Ejemplo de formato**, FIR Bogotá:" },
      {
        kind: "kv",
        items: [
          { k: "A) SKED", v: "FIR afectada. El ASHTAM se emite por FIR, no por aeródromo." },
          { k: "B) 2607301400", v: "Fecha y hora del mensaje, en UTC." },
          { k: "C) NEVADO DEL RUIZ", v: "Nombre y número del volcán." },
          { k: "D) 0453N07522W", v: "Posición del volcán." },
          { k: "E) NARANJA", v: "Código de color del nivel de alerta, y cuál era el anterior." },
          { k: "F) CENIZA HASTA FL200", v: "Altura de la nube de ceniza." },
          { k: "G) AL OESTE", v: "Dirección de movimiento de la nube." },
          { k: "H) UW7 AFECTADA", v: "Rutas, niveles de vuelo y espacio aéreo afectados o cerrados." },
        ],
      },
      {
        kind: "check",
        question: "Un SNOWTAM de Bogotá reporta `D) 5/5/3`. ¿Qué te está diciendo?",
        options: [
          "Que la pista mide 5300 metros",
          "El código de estado de pista por tercios: los dos primeros en 5 y el último en 3",
          "Que hay 5 cm de contaminante en dos tercios y 3 cm en el otro",
        ],
        answer: 1,
        explain:
          "La casilla D) del SNOWTAM es el código de estado de pista **por tercios**, de 6 (seca) a 0 (la peor condición). El espesor del contaminante en milímetros va en la casilla F). Ese código es el que entra en tu cálculo de distancia de aterrizaje.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Colombia es país volcánico",
        text: "El Nevado del Ruiz, el Galeras y el Puracé tienen actividad recurrente. El ASHTAM y los avisos de ceniza no son teoría de examen: son parte del briefing real de vuelos por el centro y el suroccidente del país.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Sobre los formatos de esta sección",
        text: "Los dos bloques de arriba ilustran qué campos trae cada mensaje y en qué orden. El detalle exacto de cada casilla y su edición vigente están en el Anexo 15 y sus apéndices: confírmalos ahí antes de usarlos operacionalmente.",
      },
    ],
  },

  // ── 13 ─────────────────────────────────────────────────────────────────────
  {
    n: 13,
    title: "Método de lectura en 6 pasos",
    kicker: "Rutina de lectura y errores comunes",
    minutes: 3,
    level: "avanzado",
    blocks: [
      {
        kind: "p",
        text: "Lee cada NOTAM siempre en el mismo orden. Esta rutina es la que aplicas en el modo práctica y en la evaluación.",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Encabezado y A):** qué NOTAM es (serie, número y tipo) y dónde aplica.",
          "**Código Q:** la 2ª y 3ª letras dicen qué cosa, la 4ª y 5ª qué le pasa.",
          "**Tránsito y alcance:** si te aplica (`I`/`V`, `A`/`E`/`W`).",
          "**B), C) y D):** cuándo. Siempre en UTC, y Colombia va en UTC menos 5. Ojo con `PERM`, `EST` y los horarios diarios.",
          "**E):** léelo expandiendo las abreviaturas. Debe ser coherente con el código Q.",
          "**F) y G)** si hay espacio aéreo involucrado: entre qué niveles aplica.",
        ],
      },
      { kind: "p", text: "**Errores comunes**, los mismos que evalúa la sección de práctica:" },
      {
        kind: "list",
        items: [
          "Confundir `LC` (cerrado) con `LI`, `LN` o `LV` (cerrado solo para IFR, solo de noche o solo para VFR).",
          "Leer B), C) y D) en hora local: son UTC.",
          "Ignorar `EST`: el fin es estimado, y el NOTAM sigue vigente hasta que lo reemplacen o lo cancelen.",
          "Pasar por alto el horario diario (casilla D o el bloque `HHMM-HHMM` del resumen). \"Cerrado\" puede ser solo unas horas al día.",
          "No revisar `RPLC`: si un NOTAM reemplaza a otro, el anterior ya no vale.",
        ],
      },
      {
        kind: "check",
        question:
          "Un NOTAM termina a las `2359` UTC del 30 de agosto. Tu vuelo sale de Bogotá el 30 a las 20:00 hora local. ¿Sigue vigente?",
        options: [
          "No: a las 20:00 ya pasó la medianoche del NOTAM",
          "Sí: las 23:59 UTC son las 18:59 en Bogotá, así que a las 20:00 local ya terminó",
          "Sí: a las 20:00 local son las 01:00 UTC del día siguiente, así que ya no aplica",
        ],
        answer: 1,
        explain:
          "Colombia va en UTC menos 5, así que las `2359` UTC del día 30 son las 18:59 locales de ese mismo día. A las 20:00 locales el NOTAM ya expiró. Leer las fechas en hora local, en cualquiera de los dos sentidos, es el error que más cuesta.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error común: el que más cuesta",
        text: "Leer las fechas en hora local. Un NOTAM que termina a las `2359` UTC termina a las 18:59 en Bogotá, no a medianoche.",
      },
      {
        kind: "summary",
        title: "Lo que te llevas de todo el documento",
        items: [
          "Un NOTAM es **encabezado + casillas**, y las casillas siempre van en el mismo orden.",
          "El código Q de cinco letras se lee como una frase: `Q` + asunto + estado.",
          "Todo lo que sea hora es UTC. Colombia va cinco horas atrás, sin excepciones.",
          "`EST` no es vencido, `PERM` no termina, y un `RPLC` deja sin efecto al NOTAM anterior.",
          "La casilla D) y el bloque `HHMM-HHMM` del resumen colombiano son lo mismo: el horario diario.",
          "Si el código Q y la casilla E) no dicen lo mismo, confirma antes de usar el NOTAM.",
        ],
      },
    ],
  },
]

/** Número de secciones del documento. Es el denominador del progreso de la lección. */
export const LESSON_TOTAL = LESSON_SCREENS.length

/**
 * Lectura estimada de la lección entera, en minutos.
 *
 * Cada sección ya traía su estimación y no se mostraba en ninguna parte. El hub
 * decía cuántas secciones tiene el tema pero no cuánto cuestan, que es lo que
 * hace falta para saber si cabe en el rato que tienes.
 */
export const LESSON_MINUTES = LESSON_SCREENS.reduce((t, s) => t + s.minutes, 0)

/** Fuentes citadas al pie del documento de la lección. */
export const LESSON_SOURCES: string[] = [
  "OACI, Doc 8400: Abreviaturas y códigos de la OACI (PANS-ABC), 6ª ed., 2004.",
  "OACI, Anexo 15: Servicios de información aeronáutica, incluidos sus apéndices de SNOWTAM y ASHTAM.",
  "NOTAMS: definición, estructura y ejemplos (guía de interpretación de curso).",
  "METAR, TAF y NOTAM (presentación de curso).",
  "Resúmenes mensuales de NOTAM vigentes, Aerocivil Colombia (DRT), corte 29 JUL 2026, series Alfa y Charlie/Delta.",
]
