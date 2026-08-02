/**
 * Práctica y chequeo del módulo Mercancías Peligrosas.
 *
 * La práctica es de CLASIFICACIÓN: se da una mercancía y el piloto decide su
 * clase y si le aplica grupo de embalaje. Es lo que de verdad se pregunta, y es
 * lo que permite comprobar despues que un NOTOC es coherente.
 *
 * Los casos están elegidos para que cada uno enseñe algo distinto y no para
 * cubrir las nueve clases: la pintura enseña que manda la propiedad y no el
 * nombre comercial, el litio es el que más se falla, el hielo seco enseña que
 * la clase 9 es un cajón de sastre y el sodio enseña que la división cambia la
 * respuesta ante una emergencia.
 */

export interface CasoMP {
  id: string
  /** La situación, tal como llegaría. */
  texto: string
  /** Clase correcta, "1" a "9". */
  clase: string
  /** Si le aplica grupo de embalaje. */
  ge: boolean
  /** La respuesta en una línea, lo que habría que decir. */
  respuesta: string
  /** Por qué, y qué es lo que se suele fallar. */
  explicacion: string
  /** Nota de embalaje o transporte, cuando aporta. */
  embalaje?: string
}

export const CASOS: CasoMP[] = [
  {
    id: "c1",
    texto:
      "Un envío de pintura para mantenimiento, en latas metálicas de 5 litros. En la guía figura como “Paint”.",
    clase: "3",
    ge: true,
    respuesta: "Clase 3, líquido inflamable, con grupo de embalaje.",
    explicacion:
      "La pintura tiene disolventes con punto de inflamación igual o menor a 60 °C, así que es líquido inflamable. Lo que la clasifica es esa propiedad, no que se llame pintura: el nombre de transporte es la designación oficial, no el comercial.",
    embalaje: "UN 1263 es su número ONU y suele ir con grupo de embalaje II.",
  },
  {
    id: "c2",
    texto:
      "Un palé con baterías de ión litio que viajan solas, como carga, en un vuelo que lleva pasajeros.",
    clase: "9",
    ge: false,
    respuesta: "Clase 9, sin grupo de embalaje. Y en ese vuelo no viaja.",
    explicacion:
      "Es el caso que más se falla: las baterías de litio no son clase 3 ni clase 8, son clase 9, y no llevan grupo de embalaje. Lo que gobierna su transporte es la instrucción de embalaje y el estado de carga. Como carga suelta están prohibidas en aeronave de pasajeros desde 2016.",
    embalaje: "UN 3480, instrucción PI 965, solo aeronave de carga y con estado de carga no mayor al 30 %.",
  },
  {
    id: "c3",
    texto:
      "Una caja con hielo seco usada para mantener frías unas muestras médicas durante el vuelo.",
    clase: "9",
    ge: false,
    respuesta: "Clase 9, sin grupo de embalaje.",
    explicacion:
      "El hielo seco es dióxido de carbono sólido: no arde ni es tóxico, pero sublima y desplaza el oxígeno en un espacio cerrado. Ese riesgo no encaja en ninguna de las otras ocho clases, y por eso está en la 9, que es donde va lo que no cubre el resto.",
    embalaje: "UN 1845. El embalaje tiene que permitir que salga el gas: cerrarlo hermético es el error.",
  },
  {
    id: "c4",
    texto:
      "Un envío de sodio metálico para un laboratorio. Se declara en recipientes sellados bajo aceite mineral.",
    clase: "4",
    ge: true,
    respuesta: "Clase 4, división 4.3, con grupo de embalaje.",
    explicacion:
      "Es un sólido inflamable, pero lo que importa es la división: la 4.3 emite gas inflamable en contacto con el agua. Si hay un incidente, echar agua empeora las cosas, y por eso la división no es un detalle administrativo sino el dato que cambia la respuesta.",
    embalaje: "Va bajo aceite justamente para aislarlo de la humedad del aire.",
  },
]

export interface PreguntaMP {
  id: string
  texto: string
  /** Sección del módulo de la que sale, para poder volver a repasarla. */
  ref: string
  ops: string[]
  /** Índice de la correcta dentro de `ops`. */
  ok: number
  /** Por qué esa es la buena. Se muestra al calificar, se acierte o no. */
  explica: string
}

export const PREGUNTAS: PreguntaMP[] = [
  {
    id: "p1",
    texto: "¿En qué clase están las baterías de litio?",
    ref: "02",
    ops: ["Clase 3, líquidos inflamables", "Clase 8, corrosivas", "Clase 9, mercancías varias"],
    ok: 2,
    explica:
      "Clase 9. Es la respuesta que más se falla en entrevista, casi siempre ubicándolas en la 3 o en la 8.",
  },
  {
    id: "p2",
    texto: "Un pasajero quiere llevar un power bank en su maleta facturada. ¿Puede?",
    ref: "07",
    ops: [
      "Sí, si va apagado y protegido",
      "No: las baterías de repuesto van solo en cabina",
      "Sí, si no pasa de 100 Wh",
    ],
    ok: 1,
    explica:
      "No. Las baterías de repuesto y los power banks van únicamente en cabina, con los terminales protegidos contra cortocircuito. En bodega nadie ve ni atiende una fuga térmica.",
  },
  {
    id: "p3",
    texto: "¿Qué es el NOTOC?",
    ref: "06",
    ops: [
      "La declaración que firma el expedidor",
      "La información escrita al comandante sobre las mercancías peligrosas a bordo",
      "El listado de la IATA con todas las sustancias",
    ],
    ok: 1,
    explica:
      "Es la notificación escrita al comandante: UN, designación, clase, cantidad, posición e información de emergencia. La declaración del expedidor es otro documento, y es la fuente con la que se arma el NOTOC.",
  },
  {
    id: "p4",
    texto:
      "En el NOTOC de un vuelo con pasajeros aparece un bulto marcado “Cargo Aircraft Only”. ¿Qué haces?",
    ref: "03",
    ops: [
      "Lo acepto si va estibado lejos de la cabina",
      "Lo acepto si el expedidor lo aprueba por escrito",
      "No sale: ese bulto no puede ir en una aeronave con pasajeros",
    ],
    ok: 2,
    explica:
      "No sale. Un bulto de solo aeronaves de carga está prohibido en un vuelo con pasajeros, y asegurarse de eso es una responsabilidad expresa del comandante.",
  },
  {
    id: "p5",
    texto: "Hay humo en cabina y sospechas de la carga peligrosa. ¿Qué va primero?",
    ref: "08",
    ops: [
      "Informar al ATC qué mercancía llevas",
      "Volar la aeronave y gestionar el humo",
      "Consultar el NOTOC para identificar la sustancia",
    ],
    ok: 1,
    explica:
      "Primero se vuela: control de la aeronave, oxígeno y máscaras, gestión del humo. Identificar con el NOTOC y avisar al ATC vienen enseguida, pero después.",
  },
]
