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

/**
 * El color de las casillas A) a G).
 *
 * Todas comparten el azul aeronáutico menos la E), en ámbar: es la única que
 * dice lo que está pasando de verdad, y el color la separa del resto de una
 * ojeada. Reusar aquí los siete colores de la línea Q habría hecho creer que
 * la casilla A) y el campo FIR son lo mismo, que es justo lo que la lección
 * quiere que no se confunda.
 */
const ITEM_COLOR = LINEA_Q_COLOR.codigo
const ITEM_E_COLOR = LINEA_Q_COLOR.objetivo


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

/** Cada casilla que el laboratorio deja abrir, en el orden en que se leen. */
export type CampoNotam = "encabezado" | "Q" | "A" | "B" | "C" | "D" | "E" | "F" | "G"

/** Un NOTAM del laboratorio, con su texto literal y la lectura de cada casilla. */
export interface LabNotam {
  /** Dos cifras, para el rótulo: "01". */
  n: string
  /** Indicador y ciudad: "SKBQ · Barranquilla · Colombia". */
  aeropuerto: string
  /** Indicador OACI solo, para la pestaña. */
  codigo: string
  fir: string
  /** De dónde se consultó y cuándo. Va al pie, siempre visible. */
  fuente: string
  /** Qué enseña esta ficha, en una línea. */
  concepto: string
  /**
   * Cuánto se da hecho. `completa` enseña la interpretación de entrada;
   * a partir de `moderada` hay que pedirla; `desafio` no la da.
   */
  ayuda: "completa" | "moderada" | "poca" | "desafio"
  /** El NOTAM literal, línea a línea, con la casilla a la que pertenece. */
  lineas: { campo: CampoNotam; texto: string }[]
  /** La lectura de cada casilla presente. Las ausentes no se inventan. */
  campos: { campo: CampoNotam; titulo: string; texto: string }[]
  interpretacion: string
}

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
  | { kind: "titulo"; text: string; sub?: string; n?: string }
  /**
   * Tabla de consulta de abreviaturas, en dos parejas por fila.
   *
   * No es material que se memorice: se mira. Por eso va en cuatro columnas y
   * no en fichas, que multiplicarían por cuarenta y seis el número de bordes
   * en pantalla para decir lo mismo. La abreviatura pesa y el significado
   * acompaña, que es el orden en que se consulta.
   */
  | {
      kind: "abreviaturas"
      titulo?: string
      intro?: string
      items: { a: string; v: string }[]
      nota?: string
    }
  /**
   * Un mensaje de la casilla E) y lo que dice, uno debajo del otro.
   *
   * `marcar` son las abreviaturas que se resaltan dentro del código: al entrar
   * en pantalla se encienden primero ellas y después aparece el significado,
   * que es el orden en que un piloto lo resuelve.
   */
  | {
      kind: "traduccion"
      codigo: string
      significado: string
      marcar?: string[]
    }
  /**
   * El cierre de la lección: el lema, los tres pasos y un ejemplo con el
   * código a un lado y la lectura al otro.
   */
  /**
   * El laboratorio: diez NOTAM reales, uno en pantalla cada vez, y cada
   * casilla se abre a golpe de botón.
   *
   * No van en cascada a propósito. Diez NOTAM apilados se leen como un muro y
   * el alumno los salta; de uno en uno se leen como un briefing, que es como
   * llegan de verdad. El texto de cada uno va literal: la interpretación se
   * redacta, el NOTAM no se toca.
   *
   * `ayuda` gradúa cuánto se da hecho, de la primera ficha a la última.
   */
  | { kind: "laboratorio"; intro?: string; items: LabNotam[] }
  /**
   * La salida de la lección hacia otra parte de la aplicación.
   *
   * Existe solo para el cierre: la lección termina y el camino sigue en la
   * práctica. Un enlace suelto en un párrafo no se ve; esto sí.
   */
  | { kind: "cta"; texto?: string; destino: string; rotulo: string }
  | {
      kind: "reglaLectura"
      lema: string
      pasos: string[]
      codigo: string
      significado: string
    }
  /**
   * En qué punto del vuelo estamos: salida, ruta o destino.
   *
   * Es el hilo de la parte de planificación. Cinco NOTAM seguidos se
   * confunden entre sí, y este carril dice a cuál de las tres etapas
   * pertenece el que viene ahora. El avión llega a la parada al entrar en
   * pantalla, que es lo que convierte una lista en un vuelo.
   */
  | {
      kind: "etapaRuta"
      etapa: "salida" | "ruta" | "destino" | "aproximacion"
      de: string
      a: string
    }
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
      /** Número de pieza de la línea Q, o letra de casilla: 1, 2… o "A", "B"… */
      n: number | string
      token?: string
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
  /**
   * `color` tiñe las pastillas de código del apartado. Se usa dentro de una
   * pieza de la línea Q para que sus códigos lleven el color del token.
   */
  | { kind: "apartado"; titulo?: string; parrafos: string[]; color?: string }
  /**
   * Una tabla compacta de códigos: el código en monoespaciada y su significado
   * al lado, a dos columnas. Es para que el alumno vea CÓMO SON los códigos y
   * reconozca los frecuentes, no para memorizarlos: por eso caben dieciséis en
   * ocho filas y no en una tabla de página entera. `sub` dice qué letras del
   * código son estas.
   */
  | {
      kind: "codigos"
      titulo: string
      sub?: string
      /** De dónde salen los códigos. Va en pequeño, a la derecha del título. */
      fuente?: string
      items: { k: string; v: string }[]
      color?: string
    }
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
  /** `grande` para el código que es protagonista, no una cita al paso. */
  | { kind: "code"; text: string; grande?: boolean }
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
  /** `color` tiñe la clave de esa fila y los códigos de su valor. */
  | { kind: "kv"; items: { k: string; v: string; color?: string }[] }
  /**
   * Desglose visual de un código: la línea entera arriba, cada trozo con su
   * color, y la leyenda numerada debajo. Un METAR o un NOTAM explicado en
   * párrafo no se entiende; desarmado, sí.
   */
  /**
   * Un codigo desmontado en sus trozos.
   *
   * Por defecto va en listado: cada trozo con su nombre y su lectura debajo,
   * que es lo unico que aguanta tokens largos y explicaciones de dos
   * renglones. Con `columnas`, la composicion horizontal: sirve cuando los
   * trozos son cortos y del mismo tipo, como un grupo de fecha y hora, y
   * entonces se lee de un vistazo en vez de en cinco explicaciones sueltas.
   */
  | {
      kind: "breakdown"
      caption?: string
      parts: BreakdownPart[]
      columnas?: boolean
      /** El resultado, destacado bajo el desglose: "09 JUL 2026 · 13:16 UTC". */
      resultado?: string
      color?: string
    }
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
      /** Código que se enseña dentro de la caja, encima de la pregunta. */
      codigo?: string
      question: string
      options: string[]
      /** Índice de la correcta dentro de `options`. */
      answer: number
      /** Por qué esa es la buena. Se muestra al responder, acierte o falle. */
      explain: string
    }
  /**
   * Emparejar cada código con su función, tocando.
   *
   * NO se arrastra: en un celular el arrastre pelea con el desplazamiento de
   * la página y el ejercicio se vuelve una lucha con el dedo. Se toca el
   * código, se toca su función y quedan unidos. Misma exigencia, sin pelea.
   */
  | {
      kind: "emparejar"
      titulo?: string
      enunciado: string
      /** El orden de `pares` es el de la columna izquierda. */
      pares: { k: string; v: string; color?: string }[]
      /** La columna derecha, desordenada a mano para que no case por posición. */
      orden: number[]
    }
  /**
   * Una fila por componente y un desplegable con las opciones.
   *
   * Desplegables y no escritura libre: en móvil se responde con el pulgar, y
   * nadie falla por redactar bien la idea con otras palabras.
   */
  | {
      kind: "desplegables"
      titulo?: string
      enunciado: string
      codigo?: string
      filas: { token: string; opciones: string[]; correcta: number; color?: string }[]
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
    minutes: 2,
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
    minutes: 3,
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
    minutes: 3,
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
    minutes: 8,
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
        color: LINEA_Q_COLOR.fir,
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
        kind: "callout",
        tone: "tip",
        title: "Para el piloto",
        text: "Reconocer el código FIR permite identificar rápidamente la región de espacio aéreo asociada al NOTAM. Sin embargo, este dato por sí solo no determina si el NOTAM afecta tu vuelo; debes continuar con la interpretación del resto de la línea Q y del NOTAM.",
      },
      // ── ② QRALW ──────────────────────────────────────────────────────────
      // Los códigos de las tablas salen de src/data/notam/notam_codes.json,
      // que es el Doc 8400. La imagen de referencia que mandó Camilo traía
      // varios que no existen (AE como aeródromo, CL como cerrado, IN, OP,
      // TX...), así que no se copió: se eligieron los frecuentes de la tabla
      // oficial y se verificó cada ejemplo completo.
      {
        kind: "componente",
        n: 2,
        token: "QRALW",
        nombre: "Código NOTAM",
        detalle: "Q + asunto + condición",
        color: LINEA_Q_COLOR.codigo,
      },
      {
        kind: "apartado",
        color: LINEA_Q_COLOR.codigo,
        parrafos: [
          "El segundo componente de la línea Q es el **código NOTAM**. Está formado por cinco letras y permite identificar de manera estandarizada el asunto que se está notificando y la condición o estado de ese asunto. La primera letra siempre es `Q`; la segunda y tercera identifican el asunto, y la cuarta y quinta indican la condición o estado. Esta estructura está establecida por OACI en el Doc 8400, PANS-ABC.",
          "Por ejemplo, en nuestro caso tenemos `QRALW`. Las letras `RA` corresponden al asunto que se está notificando y `LW` identifica la condición asociada. De esta manera, el código permite obtener una primera lectura del contenido del NOTAM sin tener que interpretar todavía todo su texto.",
          "Lo importante en esta etapa no es memorizar todos los códigos. Lo que debes aprender es a reconocer cómo está construido el código: **Q + asunto + condición**. A continuación veremos los códigos más utilizados y aprenderemos a desglosarlos uno por uno.",
        ],
      },
      {
        kind: "apartado",
        titulo: "¿Dónde encuentro los códigos?",
        color: LINEA_Q_COLOR.codigo,
        parrafos: [
          "Los códigos NOTAM están estandarizados por OACI y sus combinaciones se encuentran principalmente en el **Doc 8400, PANS-ABC** (ICAO Abbreviations and Codes). Además, los Criterios de Selección de NOTAM del **Doc 8126**, Aeronautical Information Services Manual, presentan los códigos de uso más frecuente y su relación con los calificativos de Tránsito, Propósito y Alcance.",
          "**Importante:** no necesitas memorizar todos los códigos. A continuación encontrarás una tabla de los códigos más utilizados, con su significado y su desglose, para que puedas consultarlos y aprender a interpretarlos progresivamente.",
        ],
      },
      {
        kind: "codigos",
        titulo: "Códigos de asunto",
        sub: "Segunda y tercera letra: de qué trata el aviso",
        fuente: "OACI, Doc 8400 (PANS-ABC), sección 7",
        color: LINEA_Q_COLOR.codigo,
        items: [
          { k: "FA", v: "Aeródromo" },
          { k: "MR", v: "Pista" },
          { k: "MX", v: "Calle de rodaje" },
          { k: "MN", v: "Plataforma" },
          { k: "MK", v: "Zona de estacionamiento" },
          { k: "MD", v: "Distancias declaradas" },
          { k: "LP", v: "PAPI" },
          { k: "IC", v: "ILS" },
          { k: "NV", v: "VOR" },
          { k: "NB", v: "NDB" },
          { k: "NM", v: "VOR/DME" },
          { k: "PI", v: "Procedimiento de aproximación por instrumentos" },
          { k: "RA", v: "Reserva de espacio aéreo" },
          { k: "RD", v: "Zona peligrosa" },
          { k: "RR", v: "Zona restringida" },
          { k: "OB", v: "Obstáculos" },
        ],
      },
      {
        kind: "codigos",
        titulo: "Códigos de condición",
        sub: "Cuarta y quinta letra: en qué estado está",
        fuente: "OACI, Doc 8400 (PANS-ABC), sección 7",
        color: LINEA_Q_COLOR.codigo,
        items: [
          { k: "AS", v: "No utilizable (U/S)" },
          { k: "AU", v: "No está disponible" },
          { k: "AH", v: "Cambian las horas de servicio" },
          { k: "AK", v: "Reanudada la operación normal" },
          { k: "AP", v: "Disponible con permiso previo (PPR)" },
          { k: "LC", v: "Cerrado" },
          { k: "LT", v: "Limitado a" },
          { k: "LP", v: "Prohibido a" },
          { k: "LW", v: "Se realizará" },
          { k: "LV", v: "Cerrado para operaciones VFR" },
          { k: "HW", v: "Prosiguen los trabajos (WIP)" },
          { k: "HX", v: "Concentración de aves" },
          { k: "CA", v: "En actividad" },
          { k: "CN", v: "Cancelado" },
          { k: "CH", v: "Cambiado" },
          { k: "CM", v: "Desplazado" },
        ],
      },
      { kind: "sub", text: "Así se combinan el asunto y la condición" },
      {
        kind: "table",
        head: ["Código", "Asunto", "Estado", "Qué significa"],
        rows: [
          ["`QMRLC`", "`MR` pista", "`LC` cerrada", "Pista cerrada"],
          ["`QMRLT`", "`MR` pista", "`LT` limitada", "Pista sujeta a limitaciones"],
          ["`QMXLC`", "`MX` calle de rodaje", "`LC` cerrada", "Calle de rodaje cerrada"],
          ["`QRALW`", "`RA` reserva de espacio aéreo", "`LW` se realizará", "Reserva de espacio aéreo programada"],
          ["`QLPAS`", "`LP` PAPI", "`AS` inutilizable", "Luces PAPI no utilizables"],
          ["`QNVAS`", "`NV` VOR", "`AS` inutilizable", "VOR fuera de servicio"],
          ["`QICAS`", "`IC` ILS", "`AS` inutilizable", "ILS fuera de servicio"],
          ["`QOBCE`", "`OB` obstáculo", "`CE` montado", "Obstáculo nuevo montado"],
          ["`QRRCA`", "`RR` zona restringida", "`CA` en actividad", "Zona restringida activada"],
          ["`QWMLW`", "`WM` ejercicios de tiro", "`LW` se realizarán", "Habrá ejercicios de tiro"],
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Para el piloto",
        text: "El código NOTAM te da una idea inicial de qué trata la información, pero siempre debes leer el resto de la línea Q y el texto completo del NOTAM para entender su alcance, ubicación y período de validez. No necesitas saberte todos los códigos de memoria: lo que sí necesitas es saber dónde buscarlos y cómo se construyen. Con la regla **Q + asunto + condición** puedes descifrar cualquiera que encuentres.",
      },
      // ── ③ IV ─────────────────────────────────────────────────────────────
      {
        kind: "componente",
        n: 3,
        token: "IV",
        nombre: "Tránsito",
        color: LINEA_Q_COLOR.transito,
      },
      {
        kind: "apartado",
        titulo: "¿A qué tipo de tránsito está asociada la información?",
        color: LINEA_Q_COLOR.transito,
        parrafos: [
          "El tercer componente de la línea Q indica a qué tipo de tránsito aéreo está asociada la información del NOTAM. Este campo permite identificar si el aviso está relacionado con operaciones IFR, VFR o con ambos tipos de tránsito.",
          "`I` corresponde a IFR, `V` corresponde a VFR y `IV` corresponde tanto a IFR como VFR.",
          "En nuestro ejemplo, el tercer componente es `IV`, por lo que la información del NOTAM está asociada tanto a operaciones IFR como VFR.",
        ],
      },
      // ── ④ NBO ────────────────────────────────────────────────────────────
      {
        kind: "componente",
        n: 4,
        token: "NBO",
        nombre: "Propósito",
        color: LINEA_Q_COLOR.objetivo,
      },
      {
        kind: "apartado",
        titulo: "¿Para qué se publica o cómo se utiliza la información?",
        color: LINEA_Q_COLOR.objetivo,
        parrafos: [
          "El cuarto componente de la línea Q indica el propósito del NOTAM, es decir, cómo está destinada a utilizarse o distribuirse la información dentro del proceso de información aeronáutica.",
          "Por ejemplo, cuando encuentras `NBO`, cada letra aporta información sobre el propósito del NOTAM. La `N` indica que la información requiere atención inmediata, la `B` indica que está destinada a ser incluida en el PIB (Pre-flight Information Bulletin) y la `O` indica que está relacionada con las operaciones de vuelo.",
          "También puedes encontrar la letra `M`, que corresponde a información miscelánea. En este caso, la información no está destinada a ser incluida en el PIB, pero permanece disponible cuando el usuario la solicita.",
        ],
      },
      // ── ⑤ AW ─────────────────────────────────────────────────────────────
      // Los tres códigos NO se listan en texto: la imagen ya los explica uno
      // por uno con la misma redacción, y ponerlos en los dos sitios se leía
      // como un error. El texto presenta y la imagen enseña.
      {
        kind: "componente",
        n: 5,
        token: "AW",
        nombre: "Alcance",
        color: LINEA_Q_COLOR.alcance,
      },
      {
        kind: "apartado",
        titulo: "¿Sobre qué lugar o situación trata el NOTAM?",
        color: LINEA_Q_COLOR.alcance,
        parrafos: [
          "El quinto componente de la línea Q indica a qué tipo de lugar o situación se refiere la información del NOTAM. En otras palabras, nos ayuda a saber si estamos hablando de algo relacionado con un aeródromo, una situación en ruta o una advertencia para la navegación.",
          "Los códigos principales son:",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/notam/linea-q-alcance.webp",
        alt: "Tres fichas con los códigos de alcance de la línea Q. A, aeródromo: la información está relacionada con un aeródromo o con elementos asociados a él, como pistas, calles de rodaje, plataformas, ayudas o instalaciones. E, en ruta: la información está relacionada con la operación fuera del aeródromo, durante la ruta. W, advertencia: la información corresponde a una advertencia para la navegación, por ejemplo una actividad o condición que puede representar un peligro para las aeronaves.",
        ancho: 1400,
        alto: 933,
        anchoMax: 620,
      },
      {
        kind: "apartado",
        color: LINEA_Q_COLOR.alcance,
        parrafos: [
          "En nuestro ejemplo aparece `AW`. Esto nos indica que la información tiene relación con un aeródromo y, al mismo tiempo, corresponde a una advertencia para la navegación.",
        ],
      },
      // ── ⑥ 000/001 ────────────────────────────────────────────────────────
      // Mismo criterio que en la pieza ⑤: la equivalencia 000 = SFC y
      // 001 = 100 ft la enseña la imagen, con su tabla de referencias, así que
      // el texto no la repite. Presenta, muestra y concluye.
      {
        kind: "componente",
        n: 6,
        token: "000/001",
        nombre: "Límites verticales",
        color: LINEA_Q_COLOR.limites,
      },
      {
        kind: "apartado",
        titulo: "¿Entre qué alturas aplica el NOTAM?",
        color: LINEA_Q_COLOR.limites,
        parrafos: [
          "Los dos grupos de tres cifras indican entre qué alturas se encuentra el área a la que aplica el NOTAM.",
          "El primer grupo corresponde al **límite inferior** y el segundo al **límite superior**.",
          "En nuestro ejemplo:",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/notam/linea-q-limites.webp",
        alt: "Diagrama de los límites verticales de un NOTAM. Una franja roja sobre una pista se extiende desde SFC, marcado como 000, hasta 100 ft, marcado como 001, y se rotula como el área a la que aplica el NOTAM. Al lado, una tabla de referencias: 000 es SFC o superficie, 001 son 100 pies, 010 son 1.000 pies y 100 son 10.000 pies.",
        ancho: 1226,
        alto: 1283,
        anchoMax: 520,
      },
      {
        kind: "apartado",
        color: LINEA_Q_COLOR.limites,
        parrafos: [
          "Por lo tanto, `000/001` indica que el NOTAM aplica desde la superficie hasta 100 ft.",
        ],
      },
      // ── ⑦ 0202S07956W001 ─────────────────────────────────────────────────
      // El desglose visual hace de "se lee así": parte el token en tres y da
      // la lectura de cada trozo, así que el texto no repite la conversión.
      {
        kind: "componente",
        n: 7,
        token: "0202S07956W001",
        nombre: "Coordenadas y radio",
        color: LINEA_Q_COLOR.area,
      },
      {
        kind: "apartado",
        titulo: "¿Dónde está ubicada exactamente la información?",
        color: LINEA_Q_COLOR.area,
        parrafos: [
          "El último componente de la línea Q nos permite ubicar geográficamente el área a la que se refiere el NOTAM. Está formado por las coordenadas del punto central y un radio en millas náuticas.",
          "En nuestro ejemplo tenemos `0202S07956W001`, que se lee así:",
        ],
      },
      {
        kind: "breakdown",
        caption:
          "Las coordenadas indican el punto de referencia geográfico y el último grupo de tres cifras indica el radio en millas náuticas alrededor de ese punto.",
        parts: [
          { token: "0202S", label: "latitud", detail: "02°02′ Sur." },
          { token: "07956W", label: "longitud", detail: "079°56′ Oeste." },
          { token: "001", label: "radio", detail: "1 milla náutica alrededor de ese punto." },
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Para el piloto",
        text: "Estas coordenadas te permiten ubicar en el mapa el lugar al que se refiere el NOTAM, mientras que el último grupo indica el radio alrededor de ese punto.",
      },
      // ── ⑧ La línea Q entera, ya con las siete piezas vistas ──────────────
      { kind: "titulo", text: "Ahora leamos la línea Q completa" },
      {
        kind: "apartado",
        parrafos: [
          "Hasta ahora hemos analizado cada componente por separado. Ahora vamos a unirlos para entender cómo se lee una línea Q completa. Tomemos nuevamente nuestro ejemplo:",
        ],
      },
      { kind: "code", text: "Q) SEFG/QRALW/IV/NBO/AW/000/001/0202S07956W001", grande: true },
      { kind: "apartado", parrafos: ["Ahora podemos interpretarlo de izquierda a derecha:"] },
      {
        kind: "kv",
        items: [
          { k: "SEFG", v: "FIR Guayaquil.", color: LINEA_Q_COLOR.fir },
          { k: "QRALW", v: "Reserva de espacio aéreo que tendrá lugar.", color: LINEA_Q_COLOR.codigo },
          { k: "IV", v: "IFR y VFR.", color: LINEA_Q_COLOR.transito },
          { k: "NBO", v: "Atención inmediata, PIB y operaciones de vuelo.", color: LINEA_Q_COLOR.objetivo },
          { k: "AW", v: "Aeródromo y advertencia.", color: LINEA_Q_COLOR.alcance },
          { k: "000/001", v: "Desde la superficie hasta 100 ft.", color: LINEA_Q_COLOR.limites },
          { k: "0202S07956W001", v: "Ubicación y radio de 1 NM.", color: LINEA_Q_COLOR.area },
        ],
      },
      {
        kind: "apartado",
        parrafos: [
          "Como puedes ver, cada componente aporta una pieza diferente de información. Al leerlos juntos, la línea Q permite establecer dónde aplica el NOTAM, qué información contiene, a qué tránsito está asociada, cuál es su propósito, sobre qué tipo de área trata, entre qué límites verticales aplica y dónde se encuentra exactamente.",
        ],
      },
      // ── ⑨ Los cuatro ejercicios ──────────────────────────────────────────
      // Van de menos a más: reconocer una pieza por su sitio, atar cada pieza
      // con su función, interpretar las siete de un ejemplo conocido y, al
      // final, leer una línea nueva entera. Los distractores del último son
      // errores de verdad (confundir la FIR con un aeródromo, leer la I como
      // VFR, invertir los límites), no rellenos absurdos.
      { kind: "titulo", text: "Ahora te toca a ti" },
      {
        kind: "apartado",
        parrafos: [
          "Ya conoces los siete componentes de la línea Q. Ahora es momento de ponerlos juntos.",
          "A continuación encontrarás diferentes líneas Q. Intenta identificar qué información contiene cada componente antes de consultar la interpretación.",
        ],
      },
      {
        kind: "check",
        titulo: "Ejercicio 1 · Completa la línea Q",
        codigo: "Q) SEFG/______/IV/NBO/AW/000/001/0202S07956W001",
        question: "¿Qué componente falta?",
        options: ["`QMRLC`", "`QRALW`", "`QXXXX`", "`QOBCE`"],
        answer: 1,
        explain:
          "El hueco está en el segundo lugar, el del código NOTAM, y el resto de la línea dice de qué va: alcance `AW`, de aeródromo y advertencia, y límites desde la superficie. `QRALW` es reserva de espacio aéreo que se realizará, y encaja. `QMRLC` sería una pista cerrada, que no es una advertencia de navegación; `QXXXX` se usa cuando ni el asunto ni la condición están en las tablas; y `QOBCE` no corresponde a este aviso.",
      },
      {
        kind: "emparejar",
        titulo: "Ejercicio 2 · Une cada componente con su función",
        enunciado: "Toca un código y después la función que le corresponde.",
        pares: [
          { k: "SEFG", v: "FIR", color: LINEA_Q_COLOR.fir },
          { k: "IV", v: "Tránsito", color: LINEA_Q_COLOR.transito },
          { k: "NBO", v: "Propósito", color: LINEA_Q_COLOR.objetivo },
          { k: "AW", v: "Alcance", color: LINEA_Q_COLOR.alcance },
          { k: "000/001", v: "Límites verticales", color: LINEA_Q_COLOR.limites },
          { k: "0202S07956W001", v: "Coordenadas y radio", color: LINEA_Q_COLOR.area },
        ],
        // La derecha va desordenada a mano: si cayera en el mismo orden que la
        // izquierda, se resolvería emparejando por altura sin leer nada.
        orden: [3, 0, 5, 1, 4, 2],
      },
      {
        kind: "desplegables",
        titulo: "Ejercicio 3 · Ahora sí, interpretación",
        enunciado: "Elige qué dice cada componente de esta línea Q.",
        codigo: "Q) SEFG/QRALW/IV/NBO/AW/000/001/0202S07956W001",
        filas: [
          {
            token: "SEFG",
            color: LINEA_Q_COLOR.fir,
            opciones: [
              "Aeródromo de Guayaquil",
              "FIR Guayaquil",
              "Aeródromo de Bogotá",
              "FIR Santiago",
            ],
            correcta: 1,
          },
          {
            token: "QRALW",
            color: LINEA_Q_COLOR.codigo,
            opciones: [
              "Pista cerrada",
              "Reserva de espacio aéreo que se realizará",
              "Ayuda a la navegación fuera de servicio",
              "Zona peligrosa cancelada",
            ],
            correcta: 1,
          },
          {
            token: "IV",
            color: LINEA_Q_COLOR.transito,
            opciones: ["Solo IFR", "Solo VFR", "IFR y VFR", "Lista de verificación"],
            correcta: 2,
          },
          {
            token: "NBO",
            color: LINEA_Q_COLOR.objetivo,
            opciones: [
              "Misceláneo, no va a briefing",
              "Atención inmediata, PIB y operaciones de vuelo",
              "Solo para el boletín previo al vuelo",
              "Lista de verificación",
            ],
            correcta: 1,
          },
          {
            token: "AW",
            color: LINEA_Q_COLOR.alcance,
            opciones: [
              "Aeródromo y en ruta",
              "En ruta y advertencia de navegación",
              "Aeródromo y advertencia de navegación",
              "Solo aeródromo",
            ],
            correcta: 2,
          },
          {
            token: "000/001",
            color: LINEA_Q_COLOR.limites,
            opciones: [
              "Desde la superficie hasta 100 ft",
              "Desde 100 ft hasta la superficie",
              "Desde la superficie hasta 1.000 ft",
              "Toda altura",
            ],
            correcta: 0,
          },
          {
            token: "0202S07956W001",
            color: LINEA_Q_COLOR.area,
            opciones: [
              "02°02′ Sur, 079°56′ Oeste, radio de 1 NM",
              "02°02′ Norte, 079°56′ Este, radio de 1 NM",
              "02°02′ Sur, 079°56′ Oeste, radio de 100 NM",
              "020°2′ Sur, 079°56′ Oeste, radio de 1 km",
            ],
            correcta: 0,
          },
        ],
      },
      {
        kind: "check",
        titulo: "Ejercicio 4 · Lee la línea Q completa",
        codigo: "Q) SCEZ/QMRLC/I/NBO/A/000/999/3324S07048W005",
        question: "Selecciona la interpretación correcta de esta línea Q.",
        options: [
          "En el aeródromo `SCEZ`, una pista cerrada para tránsito VFR, con alcance en ruta, desde la superficie hasta el nivel máximo, en un radio de 5 NM.",
          "En la FIR Santiago, una pista cerrada para tránsito IFR, con alcance de aeródromo, desde la superficie hasta el nivel máximo, en un radio de 5 NM alrededor de 33°24′ Sur, 070°48′ Oeste.",
          "En la FIR Santiago, una calle de rodaje cerrada para tránsito IFR y VFR, con alcance de aeródromo, desde el nivel máximo hasta la superficie, en un radio de 5 NM.",
        ],
        answer: 1,
        explain:
          "Pieza por pieza: `SCEZ` es la **FIR** de Santiago, no un aeródromo; `QMRLC` es `MR` pista más `LC` cerrado, es decir pista cerrada, no calle de rodaje, que sería `MX`; la `I` sola es **solo IFR**; `NBO` es atención inmediata, PIB y operaciones; la `A` sola es **aeródromo**, no en ruta; `000/999` va de la superficie al nivel máximo, en ese orden, primero el inferior; y `3324S07048W005` sitúa el punto en 33°24′ Sur, 070°48′ Oeste con radio de 5 NM.",
      },
      // ── ⑩ El cierre: la linea Q resuelta, y lo que viene después ──────────
      { kind: "titulo", text: "Del código a la operación" },
      {
        kind: "apartado",
        parrafos: [
          "Ya aprendiste a identificar los siete componentes de la línea Q y a interpretar la información que contiene cada uno.",
          "Pero en una operación real, leer la línea Q es solo el comienzo. La línea Q funciona como un resumen codificado que permite identificar rápidamente el contexto del NOTAM. Para saber realmente qué está ocurriendo, todavía debemos revisar el resto de la información.",
          "Ahora vamos a llevar lo aprendido a NOTAM completos. Veremos cómo relacionar la línea Q con el aeródromo, las fechas y horarios de vigencia y, sobre todo, con el contenido operacional descrito en el NOTAM.",
          "El objetivo es pasar de “sé qué significa el código” a “entiendo qué está pasando y cómo puede afectar mi operación”.",
        ],
      },
    ],
  },

  // ── 6 ──────────────────────────────────────────────────────────────────────
  {
    n: 6,
    title: "Los ítems A) a G), uno por uno",
    kicker: "Dónde, cuándo, qué y entre qué niveles",
    minutes: 10,
    level: "intermedio",
    // Todas las casillas comparten el azul aeronáutico menos la E), que va en
    // ámbar: es la única que dice lo que está pasando de verdad, y el color la
    // separa del resto de una ojeada. Reusar aquí los siete colores de la
    // línea Q habría hecho creer que la casilla A) y el campo FIR son lo
    // mismo, que es justo lo que la lección quiere que no se confunda.
    blocks: [
      {
        kind: "apartado",
        parrafos: [
          "Ya aprendiste a leer la línea Q. Ahora vamos a mirar qué información aparece después de ella.",
          "Para hacerlo, utilizaremos un NOTAM real y lo iremos descomponiendo paso a paso. Los ítems A) a G) permiten identificar **dónde aplica** la información, **cuándo** está asociada, **en qué horarios** se presenta, **qué está ocurriendo** y, cuando corresponde, **entre qué niveles** se encuentra la condición notificada.",
          "No todas las casillas aparecen necesariamente en todos los NOTAM. En el ejemplo que vamos a analizar aparecen **A)**, **B)**, **C)** y **E)**. Más adelante veremos para qué se utilizan **D)**, **F)** y **G)**.",
        ],
      },
      {
        kind: "notamPanel",
        rotulo: "NOTAM de ejemplo · Rionegro / José María Córdova (SKRG)",
        etiqueta: "Torre limitada y visibilidad reducida",
        lineas: [
          { texto: "A1956/26 NOTAMR A1635/26", marca: "Identificación" },
          { texto: "Q) SKED/QSTLT/IV/NBO/A/000/999/0610N07525W010", marca: "Línea Q" },
          { texto: "A) SKRG", marca: "¿Dónde aplica?" },
          { texto: "B) 2607091316", marca: "¿Desde cuándo?" },
          { texto: "C) PERM", marca: "¿Hasta cuándo?" },
          {
            texto: "E) TWR LTD, VIS REDUCED BTN TWY A AND THR 01\n   DUE TO TREES, EXER CTN REF. SKRG AD 2.23",
            marca: "¿Qué está ocurriendo?",
            fuerte: true,
          },
        ],
      },
      {
        kind: "p",
        text: "Antes de analizar cada casilla, observa que la línea Q ya la conocemos. Ahora nuestro objetivo es entender la información que aparece después de ella.",
      },

      // ── A) ───────────────────────────────────────────────────────────────
      { kind: "componente", n: "A", nombre: "Dónde aplica", color: ITEM_COLOR },
      { kind: "code", text: "A) SKRG" },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "El ítem A) indica **el lugar** al que se refiere el NOTAM. En este caso aparece `SKRG`, el indicador de lugar OACI que designa al aeropuerto José María Córdova, ubicado en Rionegro, Antioquia.",
          "El contenido de A) depende del tipo de NOTAM. Puede identificar un aeródromo, una instalación, una ubicación determinada o, según el caso, utilizar un indicador relacionado con una región de información de vuelo. Por ejemplo:",
        ],
      },
      {
        kind: "kv",
        items: [
          {
            k: "A) SKBO",
            v: "Indica el aeropuerto El Dorado, ubicado en Bogotá.",
            color: ITEM_COLOR,
          },
          {
            k: "A) SKRG",
            v: "Indica el aeropuerto José María Córdova, ubicado en Rionegro, Antioquia.",
            color: ITEM_COLOR,
          },
        ],
      },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "En determinados NOTAM pueden aparecer varios indicadores cuando la información aplica a **más de un lugar**.",
          "Por lo tanto, la primera pregunta que debemos responder al encontrar A) es sencilla:",
        ],
      },
      { kind: "definicion", text: "¿Dónde aplica la información que estoy leyendo?" },

      // ── B) ───────────────────────────────────────────────────────────────
      { kind: "componente", n: "B", nombre: "Desde cuándo", color: ITEM_COLOR },
      { kind: "code", text: "B) 2607091316" },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "El ítem B) contiene una **fecha y hora expresadas en UTC**. La información se presenta mediante un grupo de diez cifras, `AAMMDDHHMM`:",
        ],
      },
      {
        kind: "breakdown",
        columnas: true,
        color: ITEM_COLOR,
        resultado: "09 JUL 2026 · 13:16 UTC",
        caption: "La fecha y hora están expresadas en UTC.",
        parts: [
          { token: "26", label: "año", detail: "2026" },
          { token: "07", label: "mes", detail: "Julio" },
          { token: "09", label: "día", detail: "09" },
          { token: "13", label: "hora", detail: "13 UTC" },
          { token: "16", label: "minutos", detail: "16" },
        ],
      },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "La interpretación de B) depende del tipo de NOTAM. Cuando se trata de un **NOTAMN**, B) corresponde a la fecha y hora a partir de la cual **entra en vigor** la información publicada.",
          "Sin embargo, nuestro ejemplo es un **NOTAMR**, porque aparece:",
        ],
      },
      { kind: "code", text: "A1956/26 NOTAMR A1635/26" },
      {
        kind: "callout",
        tone: "warn",
        title: "La B) de un NOTAMR no es lo que parece",
        text: "En un NOTAMR, B) corresponde a la **fecha y hora de origen del nuevo NOTAM**. Es decir, indica cuándo fue originado el NOTAM de reemplazo. Esto es importante porque no debemos interpretar automáticamente B) como el momento en que comienza la condición descrita en E).",
      },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "También pueden aparecer indicaciones especiales relacionadas con el inicio de la información. Por ejemplo, `WIE`, **With Immediate Effect**, significa con efecto inmediato.",
        ],
      },

      // ── C) ───────────────────────────────────────────────────────────────
      { kind: "componente", n: "C", nombre: "Hasta cuándo", color: ITEM_COLOR },
      { kind: "code", text: "C) PERM" },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "El ítem C) indica **hasta cuándo permanece vigente** la información. En nuestro ejemplo aparece `PERM`, que significa **permanente**.",
          "Esto indica que la información tiene carácter permanente y que, cuando corresponda, deberá incorporarse a la información aeronáutica permanente.",
          "Cuando una condición es **temporal**, C) puede contener una fecha y hora de finalización. Estas son las formas que vas a encontrar:",
        ],
      },
      {
        kind: "kv",
        items: [
          {
            k: "C) 2607312359",
            v: "El 31 de julio de 2026 a las 23:59 UTC como momento de finalización.",
            color: ITEM_COLOR,
          },
          { k: "C) PERM", v: "Permanente.", color: ITEM_COLOR },
          {
            k: "EST",
            v: "**Estimated**. La fecha o hora de finalización indicada es estimada. La condición puede requerir posteriormente un NOTAM de reemplazo o cancelación para actualizar su estado.",
            color: ITEM_COLOR,
          },
        ],
      },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "La relación entre B) y C) permite establecer el período temporal asociado a la información, teniendo siempre en cuenta el tipo de NOTAM y las indicaciones adicionales que puedan aparecer.",
        ],
      },

      // ── D) ───────────────────────────────────────────────────────────────
      { kind: "componente", n: "D", nombre: "En qué horarios", color: ITEM_COLOR },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "El ítem D) se utiliza cuando la condición descrita en el NOTAM **no permanece activa de manera continua** durante todo el período indicado entre B) y C). En D) se especifican los días y horarios durante los cuales se presenta la condición. Por ejemplo:",
        ],
      },
      { kind: "code", text: "D) 07-09 BTN 1200-1600" },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "Indica que la condición se presenta durante los días indicados, entre 12:00 y 16:00 UTC.",
          "También pueden aparecer diferentes períodos dentro de un mismo NOTAM:",
        ],
      },
      { kind: "code", text: "D) 07 BTN 1200-1600\n   08-09 BTN 1400-1800" },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: ["En este caso, los horarios de aplicación cambian según el día."],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Lo que no está publicado, no se supone",
        text: "Nuestro NOTAM no contiene un ítem D). Esto significa que **no debemos agregar horarios que no estén publicados**. La información disponible debe interpretarse exactamente como aparece en el NOTAM.",
      },

      // ── E) ───────────────────────────────────────────────────────────────
      { kind: "componente", n: "E", nombre: "Qué está ocurriendo", color: ITEM_E_COLOR },
      {
        kind: "apartado",
        color: ITEM_E_COLOR,
        parrafos: ["Ahora llegamos al contenido operacional del NOTAM:"],
      },
      {
        kind: "code",
        grande: true,
        text: "E) TWR LTD, VIS REDUCED BTN TWY A AND THR 01\n   DUE TO TREES, EXER CTN REF. SKRG AD 2.23",
      },
      {
        kind: "apartado",
        color: ITEM_E_COLOR,
        parrafos: [
          "El ítem E) contiene **el texto que describe la condición**, cambio, restricción, actividad o situación que se está notificando.",
          "Vamos a interpretarlo por partes:",
        ],
      },
      {
        kind: "kv",
        items: [
          { k: "TWR LTD", v: "El servicio de torre está limitado.", color: ITEM_E_COLOR },
          {
            k: "VIS REDUCED BTN TWY A AND THR 01",
            v: "La visibilidad está reducida entre la calle de rodaje A y el umbral de la pista 01.",
            color: ITEM_E_COLOR,
          },
          { k: "DUE TO TREES", v: "Esta condición se debe a árboles.", color: ITEM_E_COLOR },
          { k: "EXER CTN", v: "Es una indicación para ejercer precaución.", color: ITEM_E_COLOR },
          {
            k: "REF. SKRG AD 2.23",
            v: "Hace referencia a la información correspondiente del AIP, específicamente a SKRG AD 2.23.",
            color: ITEM_E_COLOR,
          },
        ],
      },
      {
        kind: "apartado",
        color: ITEM_E_COLOR,
        parrafos: ["Al unir toda la información, podemos entender el mensaje de manera natural:"],
      },
      {
        kind: "definicion",
        text: "El servicio de torre está limitado y la visibilidad está reducida entre la calle de rodaje A y el umbral de la pista 01 debido a árboles. Se debe ejercer precaución y consultar la referencia SKRG AD 2.23.",
      },
      {
        kind: "apartado",
        color: ITEM_E_COLOR,
        parrafos: [
          "Aquí es donde el NOTAM deja de ser únicamente una serie de códigos y comienza a convertirse en **información operacional** que debemos comprender.",
        ],
      },

      // ── F) ───────────────────────────────────────────────────────────────
      { kind: "componente", n: "F", nombre: "Desde qué nivel", color: ITEM_COLOR },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "El ítem F) indica el **límite vertical inferior** de la actividad, restricción o condición cuando este dato es aplicable. Puede expresarse mediante diferentes referencias. Por ejemplo:",
        ],
      },
      { kind: "code", text: "F) SFC" },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "Significa que el límite inferior se encuentra en **la superficie**. El valor indicado en F) debe interpretarse junto con G), cuando ambos están presentes, para establecer el rango vertical de la información.",
        ],
      },

      // ── G) ───────────────────────────────────────────────────────────────
      { kind: "componente", n: "G", nombre: "Hasta qué nivel", color: ITEM_COLOR },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "El ítem G) indica el **límite vertical superior** de la actividad, restricción o condición cuando este dato es aplicable. Por ejemplo:",
        ],
      },
      { kind: "code", text: "G) 1000 FT" },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "Indica que el límite superior es 1.000 ft. Cuando F) y G) aparecen juntos, permiten establecer entre qué límites verticales se encuentra la condición descrita. Por ejemplo:",
        ],
      },
      { kind: "code", text: "F) SFC\nG) 1000 FT" },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: ["Indica que la condición se extiende **desde la superficie hasta 1.000 ft**."],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "No confundas F) y G) con los límites de la línea Q",
        text: "En la línea Q, esos valores forman parte de la clasificación codificada del NOTAM. Los ítems F) y G), cuando aparecen, proporcionan los límites verticales de la actividad o condición descrita.",
      },

      // ── Transición: de las casillas sueltas a la planificación ───────────
      {
        kind: "titulo",
        text: "Ahora léelo como piloto",
        sub: "De los campos del NOTAM a la planificación de un vuelo",
      },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "Hasta ahora hemos aprendido qué información contiene cada uno de los ítems A) a G). Ya sabemos identificar el lugar, las fechas, los horarios, la condición publicada y, cuando corresponde, los límites verticales.",
          "Pero durante una planificación de vuelo, un piloto **no analiza cada NOTAM de forma aislada**. Primero identifica cuáles corresponden a su operación y después interpreta la información para determinar si existe alguna condición que deba tener en cuenta.",
          "Veámoslo con un vuelo completo.",
        ],
      },
      { kind: "sub", text: "Vuelo Barranquilla → Nueva York" },
      {
        kind: "figura",
        src: "/modulos/notam/planificacion-skbq-klga.webp",
        alt: "Ejemplo de planificación del vuelo SKBQ Barranquilla, Colombia, a KLGA Nueva York–LaGuardia, Estados Unidos. Un mapa satelital traza la ruta real a través del Caribe y el océano Atlántico, con las coordenadas de los dos aeropuertos. A la izquierda, cuatro etapas encadenadas: salida en SKBQ, en ruta sobre el Atlántico, destino KLGA y aproximación a KLGA. El objetivo indicado es revisar los NOTAM relevantes para el aeropuerto de salida, la ruta y el aeropuerto de destino como parte de la planificación del vuelo.",
        ancho: 1400,
        alto: 700,
      },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "Tienes programado un vuelo desde Barranquilla (`SKBQ`) hacia Nueva York–LaGuardia (`KLGA`).",
          "Antes de iniciar la planificación operacional revisas, entre otra información, los NOTAM vigentes para los aeropuertos involucrados y para la ruta prevista.",
          "Encuentras varios NOTAM.",
          "La pregunta no es simplemente “¿qué dicen?”, sino:",
        ],
      },
      {
        kind: "definicion",
        text: "¿Cuáles son relevantes para mi vuelo y qué información operacional debo tener en cuenta?",
      },

      // ── 01 · Salida ──────────────────────────────────────────────────────
      { kind: "etapaRuta", etapa: "salida", de: "SKBQ", a: "KLGA" },
      {
        kind: "titulo",
        n: "01",
        text: "NOTAM del aeropuerto de salida",
        sub: "SKBQ · Barranquilla",
      },
      {
        kind: "figura",
        src: "/modulos/notam/notam-skbq-alsf.webp",
        alt: "Visor de NOTAM del aeropuerto Ernesto Cortissoz. Facility SKBQ, NOTAM A2611/26, clase International, estado Active. Emitido el 03/09/2026 a las 1454 UTC, con inicio el 03/09/2026 a las 1452 y fin el 01/12/2026 a las 2359EST. En la pestaña ICAO, el mensaje completo: A2611/26 NOTAMR A1636/26, Q) SKEC/QLAAS/IV/NBO/A/000/999/1053N07447W005, A) SKBQ, B) 2609031452 C) 2612012359EST, E) ALSF CAT I RWY 05 U/S.",
        ancho: 1400,
        alto: 352,
      },
      {
        kind: "apartado",
        titulo: "¿Cómo lo lee un piloto?",
        color: ITEM_COLOR,
        parrafos: [
          "Este NOTAM corresponde a `SKBQ`, Barranquilla. Se trata de un **NOTAMR**, es decir, reemplaza un NOTAM anterior.",
          "En B) aparece `2609031452`, correspondiente al 3 de septiembre de 2026 a las 14:52 UTC. En C) aparece `2612012359EST`, por lo que la finalización está estimada para el 1 de diciembre de 2026 a las 23:59 UTC.",
          "La información operacional está en E):",
        ],
      },
      { kind: "code", grande: true, text: "ALSF CAT I RWY 05 U/S" },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "Esto indica que el sistema **ALSF CAT I** de la pista 05 está **fuera de servicio**.",
          "Leído de corrido, el aviso dice esto: en Barranquilla, desde el 3 de septiembre de 2026 a las 14:52 UTC y con finalización estimada el 1 de diciembre de 2026 a las 23:59 UTC, **el sistema de luces de aproximación ALSF categoría I de la pista 05 no está utilizable**. Y reemplaza al `A1636/26`, que era el aviso anterior sobre lo mismo.",
          "La línea Q ya lo anticipaba. En `QLAAS`, `LA` es sistema de iluminación de aproximación y `AS` es no utilizable: el código y el texto de E) dicen lo mismo.",
          "Como nuestro vuelo parte de `SKBQ`, esta información debe ser considerada durante la planificación de la salida. El piloto debe revisar cómo esta condición se relaciona con la pista prevista, los procedimientos aplicables y las demás condiciones de la operación.",
        ],
      },
      {
        kind: "secuencia",
        orientacion: "horizontal",
        items: ["SKBQ", "salida", "revisar efecto operacional"],
      },

      // ── 02 · Otro NOTAM de la salida ─────────────────────────────────────
      {
        kind: "titulo",
        n: "02",
        text: "Otro NOTAM en el aeropuerto de salida",
        sub: "Una segunda información puede cambiar la operación en tierra",
      },
      {
        kind: "figura",
        src: "/modulos/notam/notam-skbq-twy-i.webp",
        alt: "Visor de NOTAM del aeropuerto Ernesto Cortissoz. Facility SKBQ, NOTAM C2117/09, clase International, estado Active. Emitido el 31/05/2009 a las 0024 UTC, con inicio el 31/05/2009 a las 0022 y fin PERM. En la pestaña ICAO, el mensaje completo: C2117/09 NOTAMN, Q) SKEC/QMXXX///A/000/999/, A) SKBQ B) 0905310022 C) PERM, D) H24, E) TWY I OPR UNICAMENTE AVIACION MIL.",
        ancho: 1400,
        alto: 365,
      },
      {
        kind: "apartado",
        titulo: "¿Cómo lo lee un piloto?",
        color: ITEM_COLOR,
        parrafos: [
          "Este NOTAM también corresponde a `SKBQ` y tiene carácter **permanente**, ya que C) indica `PERM`.",
          "El ítem D) indica `H24`, por lo que la condición aplica **durante todo el día**.",
          "En E) encontramos:",
        ],
      },
      { kind: "code", grande: true, text: "TWY I OPR UNICAMENTE AVIACION MIL" },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "La calle de rodaje I opera únicamente para aviación militar.",
          "Leído de corrido: en Barranquilla, de forma permanente desde el 31 de mayo de 2009 a las 00:22 UTC y **las veinticuatro horas del día**, la calle de rodaje I está reservada a la aviación militar. Para nosotros, que somos aviación civil, esa calle no es utilizable en ningún momento.",
          "En la línea Q aparece `QMXXX`. `MX` es calle o calles de rodaje, y `XX` significa que la condición no figura en la lista de códigos; por eso el detalle va escrito en lenguaje claro en E).",
          "Para una operación de aviación civil, esta información debe tenerse en cuenta al planificar el movimiento en tierra en `SKBQ`. La disponibilidad de una calle de rodaje **no se determina solamente mirando la carta**: también debemos considerar las restricciones temporales o permanentes publicadas mediante NOTAM.",
        ],
      },

      // ── 03 · En ruta ─────────────────────────────────────────────────────
      { kind: "etapaRuta", etapa: "ruta", de: "SKBQ", a: "KLGA" },
      {
        kind: "titulo",
        n: "03",
        text: "NOTAM en ruta",
        sub: "No todo NOTAM que aparece durante la planificación afecta necesariamente al vuelo",
      },
      {
        kind: "figura",
        src: "/modulos/notam/notam-skec-uas.webp",
        alt: "Visor de NOTAM de Barranquilla ACC UIR FIR. Facility SKEC, NOTAM A1779/26, clase International, estado Active. Emitido el 23/06/2026 a las 1433 UTC, con inicio el 26/06/2026 a las 0000 y fin el 22/09/2026 a las 2359. En la pestaña ICAO, el mensaje completo: A1779/26 NOTAMN, Q) SKEC/QWULW/IV/BO/W/000/120/0951N07324W005, A) SKEC, B) 2606260000 C) 2609222359, E) UAS WILL TAKE PLACE NXT COORD, seguido de cuatro pares de coordenadas que delimitan el área, F) GND G) 1200FT AMSL.",
        ancho: 1400,
        alto: 397,
      },
      {
        kind: "apartado",
        titulo: "¿Cómo lo lee un piloto?",
        color: ITEM_COLOR,
        parrafos: [
          "Ahora salimos del aeropuerto de origen y revisamos la información asociada a la ruta.",
          "Este NOTAM informa sobre una actividad **UAS** dentro de un área definida mediante coordenadas y con límites verticales determinados.",
          "Leído de corrido: en la FIR Barranquilla, entre el 26 de junio de 2026 a las 00:00 UTC y el 22 de septiembre de 2026 a las 23:59 UTC, **se realizará actividad de aeronaves no tripuladas** dentro del área que delimitan las cuatro coordenadas publicadas en E), desde la superficie, `GND` en F), hasta **1.200 ft sobre el nivel medio del mar**, `1200FT AMSL` en G).",
          "Con eso ya tengo lo que necesito para decidir. La actividad dura casi tres meses y no pasa de 1.200 ft, así que lo único que debo comparar es si mi ruta cruza ese área y a qué nivel la cruzo.",
          "En este caso, la información no se interpreta simplemente porque el NOTAM pertenezca a la FIR que estamos atravesando. Debemos comparar **el área publicada, el horario de la actividad y los límites verticales** con nuestra ruta y el nivel previsto.",
          "Si nuestra trayectoria no entra en el área afectada durante el período de actividad, el NOTAM puede no tener un efecto directo sobre nuestro vuelo. Si existe coincidencia, debemos analizar la condición y las medidas operacionales aplicables.",
        ],
      },
      {
        kind: "definicion",
        text: "Estar dentro de una FIR no significa que todos sus NOTAM afecten automáticamente tu vuelo.",
      },

      // ── 04 · Destino ─────────────────────────────────────────────────────
      { kind: "etapaRuta", etapa: "destino", de: "SKBQ", a: "KLGA" },
      {
        kind: "titulo",
        n: "04",
        text: "NOTAM del aeropuerto de destino",
        sub: "KLGA · Nueva York–LaGuardia",
      },
      { kind: "p", text: "Ahora llegamos al destino." },
      {
        kind: "figura",
        src: "/modulos/notam/notam-klga-twy-ac.webp",
        alt: "Visor de NOTAM del aeropuerto de LaGuardia. Facility LGA, NOTAM 08/446 con referencia KLGA-A6262/26, clase Aerodrome, estado Active. Emitido el 23/08/2026 a las 0855 UTC, con inicio el 23/08/2026 a las 0855 y fin el 31/12/2026 a las 1200. En la pestaña ICAO, el mensaje completo: 08/446 NOTAMR, Q) KZNY/QMXLC/IV/M/A/000/999/4046N07352W005, A) KLGA, B) 2608230855, C) 2612311200, E) TWY AC CLSD.",
        ancho: 1400,
        alto: 460,
      },
      {
        kind: "apartado",
        titulo: "¿Cómo lo lee un piloto?",
        color: ITEM_COLOR,
        parrafos: [
          "Este NOTAM corresponde a `KLGA`, LaGuardia.",
          "B) indica `2608230855`, mientras que C) indica `2612311200`. Por lo tanto, la condición está publicada desde el 23 de agosto de 2026 y tiene como finalización el 31 de diciembre de 2026 a las 12:00 UTC.",
          "En E) encontramos:",
        ],
      },
      { kind: "code", grande: true, text: "TWY AC CLSD" },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "La calle de rodaje AC está cerrada.",
          "Leído de corrido: en LaGuardia, desde el 23 de agosto de 2026 a las 08:55 UTC hasta el 31 de diciembre de 2026 a las 12:00 UTC, **la calle de rodaje AC está cerrada**. Es un **NOTAMR**, así que sustituye al aviso anterior sobre esa misma calle.",
          "La línea Q vuelve a decir lo mismo que E): en `QMXLC`, `MX` es calle o calles de rodaje y `LC` es cerrado.",
          "Como `KLGA` es nuestro aeropuerto de destino, esta información es **directamente relevante** para la planificación de la llegada y del movimiento en tierra después del aterrizaje.",
          "El piloto deberá considerar la disponibilidad de las calles de rodaje y consultar la información operacional vigente del aeródromo durante la planificación.",
        ],
      },

      // ── 05 · Aproximación ────────────────────────────────────────────────
      { kind: "etapaRuta", etapa: "aproximacion", de: "SKBQ", a: "KLGA" },
      {
        kind: "titulo",
        n: "05",
        text: "NOTAM de la aproximación",
        sub: "KLGA · Procedimiento de llegada",
      },
      {
        kind: "figura",
        src: "/modulos/notam/notam-klga-ils-13.webp",
        alt: "Visor de NOTAM del aeropuerto de LaGuardia. Facility LGA, NOTAM 6/2418 con referencia KLGA-A1909/26, clase Procedure, estado Active. Emitido el 23/03/2026 a las 1332 UTC, con inicio el 23/03/2026 a las 1332 y fin el 23/03/2028 a las 1331EST. En la pestaña ICAO: Q) KZNY/QPIXX/I/NBO/A/000/999/4046N07352W005, A) KLGA, B) 2603231332, C) 2803231331EST, E) LGA LAGUARDIA, NEW YORK, NY. ILS OR LOC RWY 13, AMDT 2C, con los mínimos modificados del procedimiento: S-LOC 13 MDA 880/HAT 868 para todas las categorías, visibilidad CAT C/D 2, circling MDA 880/HAA 859 CAT A/B, VDP en I-GDI 2.86 DME, distancia del VDP al umbral 2.46 NM, mínimos del fix COROR no aplicables, y para ALS inoperativo aumentar la visibilidad de S-LOC 13 CATS C/D a 2 1/2 SM.",
        ancho: 1400,
        alto: 435,
      },
      {
        kind: "apartado",
        titulo: "¿Cómo lo lee un piloto?",
        color: ITEM_COLOR,
        parrafos: [
          "En este NOTAM identifico que corresponde a LaGuardia (`KLGA`), pero ahora la información no está en una pista ni en una calle de rodaje: está relacionada con un **procedimiento de aproximación por instrumentos**.",
          "En la línea Q aparece `QPIXX`. `PI` es procedimiento de aproximación por instrumentos y `XX` significa que la condición va en lenguaje claro, que es justo lo que ocupa el resto del aviso.",
          "El procedimiento afectado es `ILS OR LOC RWY 13`, en su enmienda `2C`. Todo lo que viene debajo son los valores que quedan vigentes, y hay que leerlos uno por uno:",
        ],
      },
      {
        kind: "kv",
        items: [
          {
            k: "S-LOC 13 MDA 880 / HAT 868 ALL CATS",
            v: "Aproximación directa solo con LOC: altitud mínima de descenso 880 ft, que son 868 ft sobre la zona de toma de contacto, para todas las categorías de aeronave.",
            color: ITEM_COLOR,
          },
          {
            k: "VISIBILITY CAT C/D 2",
            v: "Con esos mínimos, las categorías C y D necesitan 2 millas terrestres de visibilidad.",
            color: ITEM_COLOR,
          },
          {
            k: "CIRCLING MDA 880 / HAA 859 CAT A/B",
            v: "En circuito: altitud mínima de descenso 880 ft, que son 859 ft sobre la elevación del aeródromo, para las categorías A y B.",
            color: ITEM_COLOR,
          },
          {
            k: "VDP AT I-GDI 2.86 DME",
            v: "El punto de descenso visual queda a 2,86 DME del I-GDI, y de ahí al umbral hay 2,46 millas náuticas.",
            color: ITEM_COLOR,
          },
          {
            k: "COROR FIX MINIMUMS NA",
            v: "Los mínimos publicados a partir del fijo COROR no están disponibles.",
            color: ITEM_COLOR,
          },
          {
            k: "DISREGARD NOTE",
            v: "Queda sin efecto la nota que obligaba a subir la visibilidad de las categorías C y D a 2½ millas cuando el sistema de luces de aproximación está fuera de servicio.",
            color: ITEM_COLOR,
          },
          {
            k: "ALTERNATE MINS",
            v: "Mínimos para usar LaGuardia como aeródromo de alternativa por LOC: 900-2 en categorías A y B, 1100-3 en categoría C y 1300-3 en categoría D.",
            color: ITEM_COLOR,
          },
          {
            k: "PERM BLDG 611FT MSL",
            v: "Se informa de un edificio permanente a 611 ft sobre el nivel medio del mar.",
            color: ITEM_COLOR,
          },
        ],
      },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "Leído de corrido: desde el 23 de marzo de 2026 a las 13:32 UTC, y con finalización estimada dos años después, **la aproximación ILS o LOC a la pista 13 de LaGuardia cambia de mínimos**. La directa por LOC queda en 880 ft de altitud mínima de descenso para todas las categorías, con 2 millas de visibilidad en categorías C y D, y el circuito queda en 880 ft para categorías A y B. Además dejan de aplicarse los mínimos del fijo COROR y el aumento de visibilidad por luces de aproximación fuera de servicio.",
          "Si nuestra llegada está prevista para utilizar la pista 13, esta información debe ser revisada antes de la operación. El piloto debe consultar el procedimiento vigente y **verificar los mínimos aplicables** antes de utilizarlo.",
        ],
      },
      {
        kind: "definicion",
        text: "No todos los NOTAM afectan una pista físicamente. Algunos modifican o informan condiciones relacionadas con procedimientos, ayudas a la navegación o información necesaria para ejecutar una operación.",
      },

      // ── 06 · Todo junto ──────────────────────────────────────────────────
      { kind: "titulo", n: "06", text: "Ahora junta toda la información" },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "Hemos revisado NOTAM del aeropuerto de salida, información asociada a la ruta y NOTAM del aeropuerto de destino.",
          "Ahora podemos hacer lo que realmente interesa durante una planificación: **relacionar la información publicada con nuestro vuelo**.",
        ],
      },
      { kind: "sub", text: "SKBQ → KLGA" },
      {
        kind: "table",
        head: ["Etapa", "Información encontrada", "¿Qué debemos analizar?"],
        rows: [
          ["Salida", "`ALSF CAT I RWY 05 U/S`", "Efecto sobre la operación en SKBQ"],
          ["Salida", "TWY I limitada a aviación militar", "Movimiento en tierra"],
          ["Ruta", "Actividad UAS", "Área, horario, ruta y nivel"],
          ["Destino", "`TWY AC CLSD`", "Rodaje y operación en KLGA"],
          ["Aproximación", "`ILS/LOC RWY 13`", "Procedimiento y mínimos aplicables"],
        ],
      },
    ],
  },

  // ── 7 ──────────────────────────────────────────────────────────────────────
  {
    n: 7,
    title: "La casilla E) y la fraseología abreviada",
    kicker: "Leer el texto en lenguaje claro",
    minutes: 5,
    level: "intermedio",
    // La casilla E) es la única del NOTAM escrita para leerse, no para
    // filtrarse. Por eso aquí no se vuelve a explicar la estructura: se enseña
    // a reconocer las siglas y a construir la frase. El protagonista visual es
    // el mensaje, no la teoría.
    blocks: [
      // ── 01 · Identifica la casilla E) ────────────────────────────────────
      {
        kind: "notamPanel",
        rotulo: "NOTAM real · Rionegro / José María Córdova (SKRG)",
        etiqueta: "Torre limitada y visibilidad reducida",
        lineas: [
          { texto: "A1956/26 NOTAMR A1635/26", marca: "Identificación" },
          { texto: "Q) SKED/QSTLT/IV/NBO/A/000/999/0610N07525W010", marca: "Línea Q" },
          { texto: "A) SKRG", marca: "Dónde" },
          { texto: "B) 2607091316", marca: "Desde cuándo" },
          { texto: "C) PERM", marca: "Hasta cuándo" },
          {
            texto: "E) TWR LTD, VIS REDUCED BTN TWY A AND THR 01\n   DUE TO TREES, EXER CTN REF. SKRG AD 2.23",
            marca: "E) · La condición notificada",
            fuerte: true,
          },
        ],
      },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "La casilla E) contiene la descripción de la condición, cambio, restricción o situación operacional que está siendo notificada.",
          "Su contenido usa abreviaturas y fraseología aeronáutica estandarizada, para transmitir la información de forma breve y precisa.",
          "Por eso el objetivo no es traducir palabra por palabra, sino **reconocer las abreviaturas y comprender el mensaje completo**.",
        ],
      },
      {
        kind: "traduccion",
        codigo: "E) TWR LTD, VIS REDUCED BTN TWY A AND THR 01\n   DUE TO TREES, EXER CTN REF. SKRG AD 2.23",
        marcar: ["TWR", "LTD", "VIS", "BTN", "TWY", "THR", "DUE TO", "EXER", "CTN", "REF", "AD"],
        significado:
          "El servicio de torre está limitado y la visibilidad está reducida entre la calle de rodaje A y el umbral de la pista 01 debido a árboles. Se debe ejercer precaución y consultar la referencia SKRG AD 2.23.",
      },

      // ── 02 · Las abreviaturas ────────────────────────────────────────────
      {
        kind: "abreviaturas",
        titulo: "Abreviaturas frecuentes en NOTAM",
        intro:
          "Los NOTAM usan abreviaturas y expresiones estandarizadas que permiten transmitir información operacional de forma rápida y precisa. Estas son algunas de las más frecuentes.",
        items: [
          { a: "RWY", v: "Pista" },
          { a: "TWY", v: "Calle de rodaje" },
          { a: "CLSD", v: "Cerrado" },
          { a: "U/S", v: "Fuera de servicio" },
          { a: "LTD", v: "Limitado" },
          { a: "WIP", v: "Trabajos en curso" },
          { a: "BTN", v: "Entre" },
          { a: "THR", v: "Umbral" },
          { a: "VIS", v: "Visibilidad" },
          { a: "DUE TO", v: "Debido a" },
          { a: "CTN", v: "Precaución" },
          { a: "OPR", v: "Opera" },
          { a: "ACFT", v: "Aeronave" },
          { a: "PSN", v: "Posición" },
          { a: "APRON", v: "Plataforma" },
          { a: "STAND", v: "Puesto de estacionamiento" },
          { a: "APCH", v: "Aproximación" },
          { a: "DEP", v: "Salida" },
          { a: "ARR", v: "Llegada" },
          { a: "ILS", v: "Sistema de aterrizaje por instrumentos" },
          { a: "LOC", v: "Localizador" },
          { a: "VOR", v: "Radiofaro omnidireccional VHF" },
          { a: "DME", v: "Equipo radiotelemétrico" },
          { a: "NDB", v: "Radiofaro no direccional" },
          { a: "PAPI", v: "Indicador visual de pendiente de aproximación" },
          { a: "ALSF", v: "Sistema de luces de aproximación" },
          { a: "FREQ", v: "Frecuencia" },
          { a: "COM", v: "Comunicaciones" },
          { a: "SFC", v: "Superficie" },
          { a: "GND", v: "Tierra" },
          { a: "ALT", v: "Altitud" },
          { a: "FL", v: "Nivel de vuelo" },
          { a: "ABV", v: "Por encima de" },
          { a: "BLW", v: "Por debajo de" },
          { a: "MNM", v: "Mínimo" },
          { a: "MAX", v: "Máximo" },
          { a: "FM", v: "Desde" },
          { a: "TIL", v: "Hasta" },
          { a: "H24", v: "Las veinticuatro horas" },
          { a: "HRS", v: "Horas" },
          { a: "EST", v: "Estimado" },
          { a: "PERM", v: "Permanente" },
          { a: "EXER", v: "Ejercer" },
          { a: "REF", v: "Referencia" },
          { a: "AD", v: "Aeródromo" },
          { a: "UAS", v: "Aeronave no tripulada" },
          { a: "APN", v: "Plataforma (forma corta)" },
          { a: "PRKG", v: "Estacionamiento" },
          { a: "OBST", v: "Obstáculo" },
          { a: "AVBL", v: "Disponible" },
          { a: "ACT", v: "Activo" },
          { a: "MAINT", v: "Mantenimiento" },
          { a: "INSTL", v: "Instalado" },
          { a: "DLY", v: "Diariamente" },
          { a: "UFN", v: "Hasta nuevo aviso" },
          { a: "WEF", v: "Con efecto a partir de" },
          { a: "SR", v: "Salida del sol" },
          { a: "SS", v: "Puesta del sol" },
          { a: "TORA", v: "Recorrido de despegue disponible" },
          { a: "TODA", v: "Distancia de despegue disponible" },
          { a: "ASDA", v: "Distancia de aceleración-parada disponible" },
          { a: "LDA", v: "Distancia de aterrizaje disponible" },
        ],
        nota: "Esta tabla es una herramienta de consulta. No necesitas memorizar todas las abreviaturas: tienes que aprender a reconocerlas e interpretar su significado dentro del contexto del NOTAM.",
      },

      // ── 03 · Del NOTAM al lenguaje claro ─────────────────────────────────
      { kind: "titulo", n: "03", text: "Del NOTAM al lenguaje claro" },
      {
        kind: "traduccion",
        codigo: "E) RWY 13L/31R CLSD DUE WIP",
        marcar: ["RWY", "CLSD", "DUE", "WIP"],
        significado: "La pista 13L/31R está cerrada debido a trabajos en curso.",
      },
      {
        kind: "traduccion",
        codigo: "E) ALSF CAT I RWY 05 U/S",
        marcar: ["ALSF", "RWY", "U/S"],
        significado:
          "El sistema de luces de aproximación ALSF CAT I de la pista 05 está fuera de servicio.",
      },
      {
        kind: "traduccion",
        codigo: "E) TWY I OPR UNICAMENTE AVIACION MIL",
        marcar: ["TWY", "OPR"],
        significado: "La calle de rodaje I opera únicamente para aviación militar.",
      },
      {
        kind: "traduccion",
        codigo: "E) TWY AC CLSD",
        marcar: ["TWY", "CLSD"],
        significado: "La calle de rodaje AC está cerrada.",
      },
      {
        kind: "traduccion",
        codigo: "E) TWR LTD, VIS REDUCED BTN TWY A AND THR 01 DUE TO TREES",
        marcar: ["TWR", "LTD", "VIS", "BTN", "TWY", "THR", "DUE TO"],
        significado:
          "El servicio de torre está limitado y la visibilidad está reducida entre la calle de rodaje A y el umbral de la pista 01 debido a árboles.",
      },
      {
        kind: "traduccion",
        codigo: "E) PAPI RWY 19 U/S",
        marcar: ["PAPI", "RWY", "U/S"],
        significado: "Las luces PAPI de la pista 19 están fuera de servicio.",
      },

      // ── 04 · Ahora interprétalo tú ───────────────────────────────────────
      { kind: "titulo", n: "04", text: "Ahora interprétalo tú" },
      {
        kind: "p",
        text: "Ocho mensajes de casilla E), de menos a más. Léelos como los vas a leer en un briefing: primero las siglas, después la frase.",
      },
      {
        kind: "check",
        codigo: "E) TWY AC CLSD",
        question: "¿Qué significa este NOTAM?",
        options: [
          "La pista AC está cerrada al tránsito.",
          "La calle de rodaje AC está cerrada.",
          "La plataforma AC está cerrada hoy.",
        ],
        answer: 1,
        explain:
          "`TWY` es taxiway, calle de rodaje, y `CLSD` es cerrado. La pista sería `RWY` y la plataforma, `APRON`.",
      },
      {
        kind: "check",
        codigo: "E) RWY 05 CLSD DUE WIP",
        question: "¿Qué significa este NOTAM?",
        options: [
          "La pista 05 está cerrada por trabajos en curso.",
          "La pista 05 quedó fuera de servicio por una falla.",
          "La calle de rodaje 05 está cerrada por obras.",
        ],
        answer: 0,
        explain:
          "`WIP` es work in progress, trabajos en curso, y `DUE` introduce la causa. Fuera de servicio sería `U/S`, que se usa para equipos y ayudas, no para una pista cerrada por obra.",
      },
      {
        kind: "check",
        codigo: "E) PAPI RWY 19 U/S",
        question: "¿Qué significa este NOTAM?",
        options: [
          "El PAPI de la pista 19 está fuera de servicio.",
          "La pista 19 está cerrada por una falla del PAPI.",
          "El ILS de la pista 19 está fuera de servicio.",
        ],
        answer: 0,
        explain:
          "`PAPI` es el indicador visual de pendiente de aproximación y `U/S` es unserviceable. Lo que falla es una ayuda visual: la pista sigue abierta.",
      },
      {
        kind: "check",
        codigo: "E) TWR LTD",
        question: "¿Qué significa este NOTAM?",
        options: [
          "La torre está cerrada durante ese periodo.",
          "El servicio de torre está limitado.",
          "La torre opera en frecuencia reducida.",
        ],
        answer: 1,
        explain:
          "`LTD` es limited, limitado. No dice cerrada, que sería `CLSD`, ni en qué consiste la limitación: para eso hay que mirar el resto del NOTAM.",
      },
      {
        kind: "check",
        codigo: "E) ILS RWY 13 U/S FM 0600 TIL 1200",
        question: "¿Qué significa este NOTAM?",
        options: [
          "El ILS de la pista 13 opera solamente entre las 06:00 y las 12:00.",
          "El ILS de la pista 13 está fuera de servicio de 06:00 a 12:00.",
          "La pista 13 está cerrada entre las 06:00 y las 12:00.",
        ],
        answer: 1,
        explain:
          "`FM` es from, desde, y `TIL` es until, hasta. La franja es la de la avería, no la del servicio: `U/S` dice que en esas horas el ILS no está.",
      },
      {
        kind: "check",
        codigo: "E) TWY B WIP, ACFT EXER CTN",
        question: "¿Qué significa este NOTAM?",
        options: [
          "La calle de rodaje B está cerrada y las aeronaves tienen que evitarla.",
          "Hay trabajos en la calle de rodaje B; ejerza precaución.",
          "La calle de rodaje B opera con restricción por tránsito de aeronaves.",
        ],
        answer: 1,
        explain:
          "`WIP` son trabajos en curso y `EXER CTN` es ejercer precaución. La calle sigue abierta: si estuviera cerrada diría `CLSD`.",
      },
      {
        kind: "check",
        codigo: "E) VOR U/S, APCH RWY 27 LTD",
        question: "¿Qué significa este NOTAM?",
        options: [
          "El VOR opera con limitaciones y la aproximación a la 27 está cerrada del todo.",
          "El VOR está fuera de servicio y la aproximación a la 27 queda limitada.",
          "El VOR y la aproximación a la pista 27 están fuera de servicio.",
        ],
        answer: 1,
        explain:
          "Cada condición va pegada a su elemento: `U/S` es del VOR y `LTD` es de la aproximación. Cruzar los dos estados es el error más común al leer una casilla E) con varias condiciones.",
      },
      {
        kind: "check",
        codigo: "E) TWR LTD H24, VIS REDUCED BTN TWY A AND THR 01 DUE TO TREES, EXER CTN",
        question: "¿Entre qué dos puntos está reducida la visibilidad?",
        options: [
          "Entre la torre de control y el umbral de la pista 01.",
          "Entre la calle de rodaje A y el umbral de la 01.",
          "Entre la calle de rodaje A y la plataforma principal.",
        ],
        answer: 1,
        explain:
          "`BTN` es between y `AND` cierra el par: el tramo va de `TWY A` al `THR 01`, el umbral de la pista 01. El `H24` es de la limitación de torre, no de la visibilidad.",
      },

      // ── 05 · La regla de lectura ─────────────────────────────────────────
      {
        kind: "reglaLectura",
        lema: "No traduzcas. Interpreta.",
        pasos: [
          "Reconoce las abreviaturas.",
          "Relaciona cada una con el elemento o la condición que describe.",
          "Construye el significado completo del mensaje.",
        ],
        codigo: "E) RWY 13L/31R CLSD DUE WIP",
        significado: "La pista 13L/31R está cerrada debido a trabajos en curso.",
      },

      // ── 06 · Cierre ──────────────────────────────────────────────────────
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "Ya puedes reconocer la fraseología abreviada de la casilla E) y convertir un mensaje condensado en una lectura clara.",
          "El siguiente paso es interpretar NOTAM completos y relacionar toda la información, ubicación, vigencia, horarios, condición y alcance, con una operación de vuelo.",
        ],
      },
    ],
  },

  // ── 8 ──────────────────────────────────────────────────────────────────────
  {
    n: 8,
    title: "De la lectura a la interpretación",
    kicker: "Laboratorio de NOTAM reales",
    minutes: 6,
    level: "intermedio",
    // Diez NOTAM auténticos, de diez aeropuertos y diez FIR distintas. El texto
    // de cada uno va literal: lo que se redacta es la lectura, nunca el aviso.
    // La ayuda baja de la primera ficha a la última, para que el alumno pase de
    // "me enseñan cómo" a "puedo yo".
    blocks: [
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "Ya conoces la estructura de un NOTAM. Ahora vamos a trabajar con NOTAM reales y a analizarlos parte por parte.",
          "Selecciona un NOTAM y después elige cada uno de sus componentes para descubrir qué información contiene.",
        ],
      },
      {
        kind: "secuencia",
        orientacion: "horizontal",
        items: ["Estructura", "Lectura", "Interpretación"],
      },
      {
        kind: "hueco",
        rotulo: "ILUSTRACIÓN · 1200×420",
        descripcion:
          "El paso de estructura a lectura y de lectura a interpretación, con el lenguaje visual de Aviatory. Pásala a WebP con scripts/optimizar-imagenes.mjs, guárdala como public/modulos/notam/leccion-08-interpretacion.webp y cámbiala por un bloque figura.",
        alto: 210,
        anchoMax: 640,
      },

      {
        kind: "laboratorio",
        intro:
          "Diez NOTAM reales, de diez aeropuertos y diez FIR distintas. El texto de cada uno está tal como se publicó. Empieza por el 01, que viene con toda la ayuda, y llega al 10, que es el desafío.",
        items: [
          {
            n: "01",
            aeropuerto: "SKBQ · Barranquilla · Colombia",
            codigo: "SKBQ",
            fir: "SKEC",
            fuente: "Publicado por la Aerocivil de Colombia",
            concepto: "NOTAMR sobre una ayuda visual fuera de servicio",
            ayuda: "completa",
            lineas: [
              { campo: "encabezado", texto: "A2611/26 NOTAMR A1636/26" },
              { campo: "Q", texto: "Q) SKEC/QLAAS/IV/NBO/A/000/999/1053N07447W005" },
              { campo: "A", texto: "A) SKBQ" },
              { campo: "B", texto: "B) 2609031452" },
              { campo: "C", texto: "C) 2612012359EST" },
              { campo: "E", texto: "E) ALSF CAT I RWY 05 U/S" },
            ],
            campos: [
              {
                campo: "encabezado",
                titulo: "Serie A, número 2611 del año 2026",
                texto:
                  "Es un **NOTAMR**: reemplaza al `A1636/26`, que era el aviso anterior sobre lo mismo. Desde que sale este, el otro deja de valer.",
              },
              {
                campo: "Q",
                titulo: "FIR Barranquilla, luces de aproximación no utilizables",
                texto:
                  "`SKEC` es la FIR. En `QLAAS`, `LA` es sistema de iluminación de aproximación y `AS` es no utilizable: el código ya dice lo que luego repite la casilla E).",
              },
              {
                campo: "A",
                titulo: "Dónde aplica",
                texto: "`SKBQ`, el aeropuerto Ernesto Cortissoz de Barranquilla.",
              },
              {
                campo: "B",
                titulo: "Desde cuándo",
                texto: "3 de septiembre de 2026 a las 14:52 UTC, que en Colombia son las 09:52.",
              },
              {
                campo: "C",
                titulo: "Hasta cuándo, y es estimado",
                texto:
                  "1 de diciembre de 2026 a las 23:59. El `EST` avisa de que esa fecha es una estimación: el NOTAM sigue vigente hasta que lo reemplacen o lo cancelen, no se cae solo ese día.",
              },
              {
                campo: "E",
                titulo: "Qué está ocurriendo",
                texto:
                  "`ALSF CAT I` es el sistema de luces de aproximación de categoría I, `RWY 05` la pista y `U/S` fuera de servicio. Es una ayuda visual la que falla: la pista sigue abierta.",
              },
            ],
            interpretacion:
              "El sistema de luces de aproximación ALSF CAT I de la pista 05 está fuera de servicio.",
          },
          {
            n: "02",
            aeropuerto: "SCEL · Santiago · Chile",
            codigo: "SCEL",
            fir: "SCEZ",
            fuente: "DGAC Chile / IFIS",
            concepto: "Cierre de pista con horarios en la casilla D)",
            ayuda: "completa",
            lineas: [
              { campo: "encabezado", texto: "A2526/26 NOTAMN" },
              { campo: "Q", texto: "Q)SCEZ/QMRLC/IV/NBO/A/000/999/3324S07048W005" },
              { campo: "A", texto: "A)SCEL" },
              { campo: "B", texto: "B)2609071600" },
              { campo: "C", texto: "C)2609122200" },
              { campo: "D", texto: "D)07 BTN 1600-1700" },
              { campo: "D", texto: "   08-09 BTN 2000-2200" },
              { campo: "D", texto: "   12 BTN 1500-2200" },
              { campo: "E", texto: "E)RWY 17L/35R CLSD" },
            ],
            campos: [
              {
                campo: "encabezado",
                titulo: "Serie A, número 2526 del año 2026",
                texto: "Es un **NOTAMN**: información nueva, no reemplaza a ninguno anterior.",
              },
              {
                campo: "Q",
                titulo: "FIR Santiago, pista cerrada",
                texto:
                  "`SCEZ` es la FIR. En `QMRLC`, `MR` es pista y `LC` es cerrado. Sería `MX` si hablara de una calle de rodaje.",
              },
              { campo: "A", titulo: "Dónde aplica", texto: "`SCEL`, Santiago / Arturo Merino Benítez." },
              {
                campo: "B",
                titulo: "Desde cuándo",
                texto: "7 de septiembre de 2026 a las 16:00 UTC.",
              },
              {
                campo: "C",
                titulo: "Hasta cuándo",
                texto: "12 de septiembre de 2026 a las 22:00 UTC.",
              },
              {
                campo: "D",
                titulo: "En qué horas de esos días, que es lo que decide",
                texto:
                  "B) y C) fijan el **periodo entero**, del 7 al 12. D) dice cuándo está de verdad cerrada dentro de ese periodo: el día 7 entre 16:00 y 17:00, los días 8 y 9 entre 20:00 y 22:00, y el día 12 entre 15:00 y 22:00. **Fuera de esas franjas la pista está abierta.** Leer solo B) y C) aquí te haría cancelar un vuelo que sí podía salir.",
              },
              {
                campo: "E",
                titulo: "Qué está ocurriendo",
                texto: "La pista 17L/35R está cerrada.",
              },
            ],
            interpretacion:
              "La pista 17L/35R está cerrada durante los períodos horarios indicados en la casilla D).",
          },
          {
            n: "03",
            aeropuerto: "SCJO · Osorno · Chile",
            codigo: "SCJO",
            fir: "SCTZ",
            fuente: "DGAC Chile / IFIS",
            concepto: "Una radioayuda caída deja sin usar cinco procedimientos",
            ayuda: "completa",
            lineas: [
              { campo: "encabezado", texto: "C3877/26 NOTAMN" },
              { campo: "Q", texto: "Q)SCTZ/QPIAU/I/NBO/A/000/999/4037S07303W005" },
              { campo: "A", texto: "A)SCJO" },
              { campo: "B", texto: "B)2609091700" },
              { campo: "C", texto: "C)2609091900" },
              {
                campo: "E",
                texto:
                  "E)IAC 1 VOR Z RWY 15 IAC 2 VOR Y RWY15 IAC 3 VOR Z RWY 33\n   IAC 4 VOR Y RWY 33 IAC 5 VOR X RWY 15 NO AVBL DEBIDO A\n   VOR/DME OSO U/S INSTRUCCIONES: PUERTO MONTT RADAR 119,5MHZ",
              },
            ],
            campos: [
              {
                campo: "encabezado",
                titulo: "Serie C, número 3877 del año 2026",
                texto: "Un **NOTAMN**, información nueva.",
              },
              {
                campo: "Q",
                titulo: "FIR Puerto Montt, procedimiento de aproximación no disponible",
                texto:
                  "En `QPIAU`, `PI` es procedimiento de aproximación por instrumentos y `AU` es no está disponible. El tránsito es `I`, **solo IFR**: a un vuelo visual esto no le aplica.",
              },
              { campo: "A", titulo: "Dónde aplica", texto: "`SCJO`, Osorno / Cañal Bajo." },
              { campo: "B", titulo: "Desde cuándo", texto: "9 de septiembre de 2026 a las 17:00 UTC." },
              {
                campo: "C",
                titulo: "Hasta cuándo",
                texto: "9 de septiembre de 2026 a las 19:00 UTC. Son solo dos horas.",
              },
              {
                campo: "E",
                titulo: "Causa y consecuencia, en el mismo mensaje",
                texto:
                  "Lo que falla es **una sola cosa**: el `VOR/DME OSO`, que está `U/S`. La consecuencia son **cinco** procedimientos: las cartas de aproximación IAC 1 a IAC 5 quedan `NO AVBL`, porque todas se apoyan en esa radioayuda. Y el aviso cierra con la instrucción: contactar a Puerto Montt Radar en 119,5 MHz.",
              },
            ],
            interpretacion:
              "Las aproximaciones instrumentales indicadas no están disponibles porque el VOR/DME OSO está fuera de servicio. Se instruye contactar a Puerto Montt Radar en 119,5 MHz.",
          },
          {
            n: "04",
            aeropuerto: "SCDA · Iquique · Chile",
            codigo: "SCDA",
            fir: "SCFZ",
            fuente: "DGAC Chile / IFIS",
            concepto: "Una condición y además una instrucción operacional",
            ayuda: "moderada",
            lineas: [
              { campo: "encabezado", texto: "A2536/26 NOTAMN" },
              { campo: "Q", texto: "Q)SCFZ/QFULT/IV/NBO/A/000/999/2032S07011W005" },
              { campo: "A", texto: "A)SCDA" },
              { campo: "B", texto: "B)2609071515" },
              { campo: "C", texto: "C)2612052359" },
              {
                campo: "E",
                texto:
                  "E)AVGAS 100LL AVBL LTD DUE TO STORAGE CAPACITY. USERS MUST\n   COOR 6 HR IN ADVANCE WITH COPEC AVIATION AT IQUIQUE AP\n   REGARDING DISPENSING AVBL AND QUANTITY BY TEL +56 57 2415585,\n   CELL +56 950217699 OR EMAIL IQQ(A)COPECAVIATION.COM",
              },
            ],
            campos: [
              {
                campo: "encabezado",
                titulo: "Serie A, número 2536 del año 2026",
                texto: "Un **NOTAMN**.",
              },
              {
                campo: "Q",
                titulo: "FIR Antofagasta, combustible limitado",
                texto:
                  "En `QFULT`, `FU` es disponibilidad de combustible y `LT` es limitado a. El código no cierra nada: limita un servicio.",
              },
              { campo: "A", titulo: "Dónde aplica", texto: "`SCDA`, Iquique / Diego Aracena." },
              { campo: "B", titulo: "Desde cuándo", texto: "7 de septiembre de 2026 a las 15:15 UTC." },
              { campo: "C", titulo: "Hasta cuándo", texto: "5 de diciembre de 2026 a las 23:59 UTC." },
              {
                campo: "E",
                titulo: "Dos cosas, no una",
                texto:
                  "Primero la **condición**: el AVGAS 100LL está disponible de forma limitada por capacidad de almacenamiento. Y después la **instrucción**: hay que coordinar con seis horas de antelación con el proveedor, con teléfono y correo en el propio aviso. Resumirlo como «combustible limitado» te deja sin la mitad del mensaje, que es la que tienes que ejecutar.",
              },
            ],
            interpretacion:
              "El AVGAS 100LL está disponible de forma limitada debido a la capacidad de almacenamiento. Los usuarios deben coordinar con seis horas de anticipación la disponibilidad y la cantidad de combustible.",
          },
          {
            n: "05",
            aeropuerto: "SABE · Buenos Aires · Argentina",
            codigo: "SABE",
            fir: "SAEF",
            fuente: "Publicado por el AIS de Argentina",
            concepto: "Cierre de pista con una programación de días sueltos",
            ayuda: "moderada",
            lineas: [
              { campo: "encabezado", texto: "A3235/26 NOTAMN" },
              { campo: "Q", texto: "Q)SAEF/QMRLC/IV/NBO/A/000/999/3433S05824W005" },
              { campo: "A", texto: "A)SABE" },
              { campo: "B", texto: "B)2609010400" },
              { campo: "C", texto: "C)2609290700" },
              {
                campo: "D",
                texto: "D)1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26 AND 29 0400-0700",
              },
              { campo: "E", texto: "E)RWY 13/31 CLSD WIP MAINT" },
            ],
            campos: [
              {
                campo: "encabezado",
                titulo: "Serie A, número 3235 del año 2026",
                texto: "Un **NOTAMN**.",
              },
              {
                campo: "Q",
                titulo: "FIR Ezeiza, pista cerrada",
                texto: "`QMRLC`: `MR` pista, `LC` cerrado. El mismo código del NOTAM 02.",
              },
              { campo: "A", titulo: "Dónde aplica", texto: "`SABE`, Buenos Aires / Aeroparque Jorge Newbery." },
              { campo: "B", titulo: "Desde cuándo", texto: "1 de septiembre de 2026 a las 04:00 UTC." },
              { campo: "C", titulo: "Hasta cuándo", texto: "29 de septiembre de 2026 a las 07:00 UTC." },
              {
                campo: "D",
                titulo: "Trece días sueltos, siempre a la misma hora",
                texto:
                  "Aquí D) no lista franjas distintas: lista **qué días** del mes aplica, y en todos ellos la franja es la misma, de 04:00 a 07:00 UTC. Los días que no están en esa lista, la pista está abierta las 24 horas.",
              },
              {
                campo: "E",
                titulo: "Qué está ocurriendo",
                texto:
                  "La pista 13/31 está cerrada por `WIP MAINT`, trabajos de mantenimiento en curso.",
              },
            ],
            interpretacion:
              "La pista 13/31 estará cerrada por trabajos de mantenimiento durante los días y horarios especificados en la casilla D).",
          },
          {
            n: "06",
            aeropuerto: "EHAM · Ámsterdam Schiphol · Países Bajos",
            codigo: "EHAM",
            fir: "EHAA",
            fuente: "Publicado por el AIS de los Países Bajos",
            concepto: "Un NOTAM que cambia los mínimos de un procedimiento",
            ayuda: "moderada",
            lineas: [
              { campo: "encabezado", texto: "A2101/26 NOTAMN" },
              { campo: "Q", texto: "Q) EHAA/QPOCH/I/NBO/A/000/999/5218N00446E005" },
              { campo: "A", texto: "A) EHAM" },
              { campo: "B", texto: "B) 2609081245" },
              { campo: "C", texto: "C) 2609132200EST" },
              {
                campo: "E",
                texto:
                  "E) CHANGE OF CIRCLING MINIMA OCA(OCH) DUE TO CRANE.\n   CAT A INCREASED TO 634(644).",
              },
            ],
            campos: [
              { campo: "encabezado", titulo: "Serie A, número 2101 del año 2026", texto: "Un **NOTAMN**." },
              {
                campo: "Q",
                titulo: "FIR Ámsterdam, altitud de franqueamiento cambiada",
                texto:
                  "En `QPOCH`, `PO` es altitud de franqueamiento de obstáculos y `CH` es cambiado. El código lo dice antes que el texto: aquí no se cierra nada, se **cambia un valor**.",
              },
              { campo: "A", titulo: "Dónde aplica", texto: "`EHAM`, Ámsterdam / Schiphol." },
              { campo: "B", titulo: "Desde cuándo", texto: "8 de septiembre de 2026 a las 12:45 UTC." },
              {
                campo: "C",
                titulo: "Hasta cuándo, estimado",
                texto: "13 de septiembre de 2026 a las 22:00, con `EST`: la fecha es una estimación.",
              },
              {
                campo: "E",
                titulo: "Qué cambia y por qué",
                texto:
                  "Cambian los mínimos de la aproximación en circuito por una **grúa**. Para la categoría A el valor sube a 634 (644). Lo que tienes que llevarte de aquí no es el número: es que un NOTAM puede **modificar la información de un procedimiento** sin cerrar ni una pista ni una ayuda.",
              },
            ],
            interpretacion:
              "Se modifican los mínimos para aproximación en circuito debido a una grúa. Para categoría A, la OCA(OCH) aumenta a 634 (644).",
          },
          {
            n: "07",
            aeropuerto: "EGLL · Londres Heathrow · Reino Unido",
            codigo: "EGLL",
            fir: "EGTT",
            fuente: "Publicado por el AIS del Reino Unido",
            concepto: "Radioayuda que puede fluctuar en un sector concreto",
            ayuda: "poca",
            lineas: [
              { campo: "encabezado", texto: "A2710/26 NOTAMN" },
              { campo: "Q", texto: "Q) EGTT/QNVXX/IV/BO/AE/000/999/5129N00028W025" },
              { campo: "A", texto: "A) EGLL" },
              { campo: "B", texto: "B) 2608032130" },
              { campo: "C", texto: "C) 2609280530" },
              {
                campo: "E",
                texto:
                  "E) VOR/DME LON/LONDON 113.60 CH83X THERE MAY BE OBSERVATIONS\n   OF DVOR BEARING FLUCTUATIONS WI THE 125-170 DEG. MAG.\n   SECTOR RADIALS FM LONDON VOR/DME STATION, DUE TO MOBILE\n   CRANE ACTIVITY IN VICINITY",
              },
            ],
            campos: [
              { campo: "encabezado", titulo: "Serie A, número 2710 del año 2026", texto: "Un **NOTAMN**." },
              {
                campo: "Q",
                titulo: "FIR Londres, VOR en lenguaje claro",
                texto:
                  "En `QNVXX`, `NV` es VOR y `XX` significa que la condición **no está en la lista de códigos**: por eso todo el detalle va escrito en la casilla E). El alcance es `AE`, aeródromo y en ruta, y el radio del área son 25 NM.",
              },
              { campo: "A", titulo: "Dónde aplica", texto: "`EGLL`, Londres / Heathrow." },
              { campo: "B", titulo: "Desde cuándo", texto: "3 de agosto de 2026 a las 21:30 UTC." },
              { campo: "C", titulo: "Hasta cuándo", texto: "28 de septiembre de 2026 a las 05:30 UTC." },
              {
                campo: "E",
                titulo: "No está caído: puede fallar",
                texto:
                  "El VOR/DME de Londres **sigue operativo**. Lo que avisa el NOTAM es que puede haber fluctuaciones de marcación dentro de un sector concreto, entre los radiales magnéticos 125 y 170, por una grúa móvil cerca. Un aviso de posible degradación no es lo mismo que un `U/S`.",
              },
            ],
            interpretacion:
              "El VOR/DME LON puede presentar fluctuaciones de marcación en el sector magnético de 125° a 170° debido a la actividad de una grúa móvil en las proximidades.",
          },
          {
            n: "08",
            aeropuerto: "RJTT · Tokio Haneda · Japón",
            codigo: "RJTT",
            fir: "RJJJ",
            fuente: "Publicado por el AIS de Japón",
            concepto: "Obstáculo: luz apagada, posición y elevación",
            ayuda: "poca",
            lineas: [
              { campo: "encabezado", texto: "J1540/26 NOTAMN" },
              { campo: "Q", texto: "Q)RJJJ/QOLAS/IV/M/A/000/003/3533N13947E005" },
              { campo: "A", texto: "A)RJTT" },
              { campo: "B", texto: "B)2607130954" },
              { campo: "C", texto: "C)2610120940" },
              { campo: "E", texto: "E)OBST LGT U/S" },
              { campo: "E", texto: "   TYPE: BLDG" },
              { campo: "E", texto: "   PSN: 353312.7N1394656.8E" },
              { campo: "E", texto: "   ELEV: 262FT AMSL" },
              { campo: "E", texto: "   (OTA-KU IN TOKYO)" },
            ],
            campos: [
              { campo: "encabezado", titulo: "Serie J, número 1540 del año 2026", texto: "Un **NOTAMN**." },
              {
                campo: "Q",
                titulo: "FIR Fukuoka, luces de obstáculo no utilizables",
                texto:
                  "En `QOLAS`, `OL` son luces de obstáculo y `AS` es no utilizable. Los límites verticales son `000/003`, de la superficie a 300 ft, que encierra la altura del edificio.",
              },
              { campo: "A", titulo: "Dónde aplica", texto: "`RJTT`, Tokio / Haneda." },
              { campo: "B", titulo: "Desde cuándo", texto: "13 de julio de 2026 a las 09:54 UTC." },
              { campo: "C", titulo: "Hasta cuándo", texto: "12 de octubre de 2026 a las 09:40 UTC." },
              {
                campo: "E",
                titulo: "Qué, dónde y a qué altura",
                texto:
                  "Las tres cosas van juntas y hacen falta las tres. `OBST LGT U/S`: la luz del obstáculo está apagada. `TYPE: BLDG`: es un edificio. `PSN`: sus coordenadas exactas. `ELEV: 262FT AMSL`: su cima está a 262 ft sobre el nivel medio del mar. Sin la posición y la elevación, saber que hay una luz apagada no sirve para nada.",
              },
            ],
            interpretacion:
              "La iluminación del obstáculo correspondiente al edificio en la posición indicada está fuera de servicio.",
          },
          {
            n: "09",
            aeropuerto: "CYYZ · Toronto Pearson · Canadá",
            codigo: "CYYZ",
            fir: "CZYZ",
            fuente: "Publicado por NAV CANADA",
            concepto: "Ni abierta ni cerrada: una condición de uso",
            ayuda: "poca",
            lineas: [
              { campo: "encabezado", texto: "D3711/26 NOTAMR D3682/26" },
              { campo: "Q", texto: "Q) CZYZ/QMXLL/IV/M/A/000/999/4341N07938W005" },
              { campo: "A", texto: "A) CYYZ" },
              { campo: "B", texto: "B) 2609031248" },
              { campo: "C", texto: "C) 2612011700" },
              {
                campo: "E",
                texto: "E) ACFT WITH WINGSPAN UP TO 262FT AUTH ON TWY J BTN TWY P\n   AND RWY 15L",
              },
            ],
            campos: [
              {
                campo: "encabezado",
                titulo: "Serie D, número 3711 del año 2026",
                texto: "Es un **NOTAMR**: reemplaza al `D3682/26`.",
              },
              {
                campo: "Q",
                titulo: "FIR Toronto, calle de rodaje con dimensiones de uso",
                texto:
                  "En `QMXLL`, `MX` es calle o calles de rodaje y `LL` significa **puede usarse con las dimensiones que se indican**. Ni cerrada ni abierta sin más: usable bajo condición.",
              },
              { campo: "A", titulo: "Dónde aplica", texto: "`CYYZ`, Toronto / Pearson." },
              { campo: "B", titulo: "Desde cuándo", texto: "3 de septiembre de 2026 a las 12:48 UTC." },
              { campo: "C", titulo: "Hasta cuándo", texto: "1 de diciembre de 2026 a las 17:00 UTC." },
              {
                campo: "E",
                titulo: "Una condición, no un cierre",
                texto:
                  "Se autorizan aeronaves con envergadura de hasta 262 ft en la calle de rodaje J, en el tramo entre la calle P y la pista 15L. Esto **no dice** que la J esté abierta ni cerrada: dice **quién puede usarla y en qué tramo**. Si tu envergadura supera esa cifra, ese tramo no es para ti.",
              },
            ],
            interpretacion:
              "Se autorizan aeronaves con una envergadura de hasta 262 ft para utilizar la calle de rodaje J entre la calle de rodaje P y la pista 15L.",
          },
          {
            n: "10",
            aeropuerto: "KJFK · Nueva York JFK · Estados Unidos",
            codigo: "KJFK",
            fir: "KZNY",
            fuente: "Publicado por la FAA de Estados Unidos",
            concepto: "Desafío: léelo entero antes de mirar la respuesta",
            ayuda: "desafio",
            lineas: [
              { campo: "encabezado", texto: "A1420/26 NOTAMN" },
              { campo: "Q", texto: "Q) ZNY/QMRLC/IV/NBO/A/000/999/4038N07346W005" },
              { campo: "A", texto: "A) KJFK" },
              { campo: "B", texto: "B) 2609030600" },
              { campo: "C", texto: "C) 2609051400" },
              { campo: "E", texto: "E) RWY 04L/22R CLSD DUE TO WIP RESURFACING." },
            ],
            campos: [
              {
                campo: "encabezado",
                titulo: "Serie A, número 1420 del año 2026",
                texto: "Un **NOTAMN**.",
              },
              {
                campo: "Q",
                titulo: "Pista cerrada",
                texto:
                  "`QMRLC`: `MR` pista, `LC` cerrado. Fíjate en el primer campo: aquí viene como `ZNY` y no con las cuatro letras de una FIR, que serían `KZNY`. Así se publicó.",
              },
              { campo: "A", titulo: "Dónde aplica", texto: "`KJFK`, Nueva York / John F. Kennedy." },
              { campo: "B", titulo: "Desde cuándo", texto: "3 de septiembre de 2026 a las 06:00 UTC." },
              { campo: "C", titulo: "Hasta cuándo", texto: "5 de septiembre de 2026 a las 14:00 UTC." },
              {
                campo: "E",
                titulo: "Qué está ocurriendo",
                texto: "La pista 04L/22R está cerrada por `WIP RESURFACING`, obras de repavimentación.",
              },
            ],
            interpretacion:
              "La pista 04L/22R está cerrada debido a trabajos de repavimentación.",
          },
        ],
      },

      // ── Cierre ────────────────────────────────────────────────────────────
      { kind: "titulo", text: "De los códigos a la operación" },
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "Ya puedes tomar un NOTAM real, identificar sus componentes y reconstruir su significado en lenguaje claro.",
          "Pero interpretar no es solamente saber qué dice el NOTAM.",
        ],
      },
      {
        kind: "definicion",
        text: "También hay que determinar qué significa para tu vuelo.",
      },
    ],
  },

  // ── 9 ──────────────────────────────────────────────────────────────────────
  {
    n: 9,
    title: "Cierre del módulo",
    kicker: "Ya sabes leer un NOTAM",
    minutes: 2,
    level: "intermedio",
    blocks: [
      {
        kind: "apartado",
        color: ITEM_COLOR,
        parrafos: [
          "Un NOTAM puede parecer complicado al principio, pero cuando entiendes su estructura la lectura cambia por completo.",
          "Ya sabes identificar dónde aplica, cuándo está vigente, qué está ocurriendo y cómo interpretar la fraseología que usa.",
          "El siguiente paso es practicar. La interpretación de NOTAM se mejora leyendo casos distintos y aprendiendo a reconocer rápido la información que puede importar en una operación.",
        ],
      },
      {
        kind: "cta",
        texto:
          "**Practica con NOTAM reales.** En Aviatory tienes un módulo de práctica con NOTAM nacionales e internacionales. Ahí puedes seguir entrenando con distintos aeropuertos, situaciones y formatos.",
        destino: "/app/aerolinea/notam/practica",
        rotulo: "Ir a práctica de NOTAM",
      },
      {
        kind: "definicion",
        text: "La próxima vez que encuentres un NOTAM, no pienses «¿qué significa todo esto?». Piensa: «¿qué está pasando y qué significa para mi vuelo?».",
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
