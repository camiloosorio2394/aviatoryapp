/**
 * Práctica del módulo Aeropuertos: tres tipos de ejercicio.
 *
 *   Reconoce  → se muestra la imagen y se dice qué señal, letrero, luz o
 *               baliza es. En un módulo visual, practicar es reconocer.
 *   Decide    → una situación corta de rodaje, aproximación o plataforma, con
 *               cuatro salidas posibles y una sola buena.
 *   Cambió    → lo que trajo la Enmienda 18 y lo que deja de valer el 26 de
 *               noviembre de 2026. Es justo lo que ningún material viejo
 *               enseña, así que cada ejercicio dice también qué decía antes.
 *
 * La norma es solo OACI: Anexo 14, Volumen I, 9.ª edición (2022) con la
 * Enmienda 18, aplicable desde el 27 de noviembre de 2025, y Anexo 4 para las
 * cartas. Nada de FAA. Sin citas de artículo en el texto que ve el piloto.
 *
 * Cada ejercicio de reconocimiento usa una imagen sin rótulos que revelen la
 * respuesta. Los huecos pendientes conservan el código y las indicaciones
 * de producción hasta tener una imagen verificada.
 *
 * Los puntos de espera se dibujan siempre en patrón A2 o B2, nunca A1 ni B1, y
 * las dos líneas continuas del patrón A van del lado de espera.
 *
 * Ninguna pregunta repite una de las entrevistas de nivel
 * (aeropuertosLeccion/entrevistas.ts): la práctica se responde tocando y la
 * entrevista se responde hablando.
 */

/** Los cinco niveles del módulo. */
export type ApNivel = 1 | 2 | 3 | 4 | 5

/** El hueco de la imagen que falta, con el código que lleva el archivo. */
export interface ApHueco {
  codigo: string
  medida: string
  /** Qué tiene que mostrar. Nunca nombra la respuesta. */
  descripcion: string
}

/** Lo común a los tres tipos: de dónde sale y cómo se responde. */
interface ApBase {
  id: string
  nivel: ApNivel
  /** Lección del módulo de la que sale, 1 a 22. */
  leccion: number
  opciones: string[]
  correcta: number
  /** En qué se reconoce, o por qué esa es la salida. */
  explicacion: string
}

// ─── 1. Reconoce: qué estás viendo ───────────────────────────────────────────

export interface ApReconoce extends ApBase {
  /** Señal pintada, letrero, luz, baliza o carta. Va como pastilla. */
  familia: string
  /** Imagen de la prueba, sin rótulos que revelen la respuesta. */
  imagen?: { src: string; alt: string; pie: string }
  hueco?: ApHueco
  pregunta: string
}

export const AP_RECONOCE: ApReconoce[] = [
  {
    id: "r01",
    nivel: 1,
    leccion: 1,
    familia: "Señal pintada",
    imagen: {
      src: "/modulos/aeropuertos/ap-pra-02-reconoce-area.webp",
      alt: "Vista aérea de un extremo de pista con pavimento continuo y marcas amarillas en ángulo más allá de la línea blanca transversal",
      pie: "Observa dónde termina el eje blanco, si la superficie continúa y qué color tienen las marcas. Elige el área antes de abrir la explicación; la fotografía no te da por sí sola ninguna distancia declarada.",
    },
    pregunta: "Si está declarada para frenar un despegue interrumpido, ¿qué área es?",
    opciones: [
      "La zona libre de obstáculos",
      "El área de seguridad de extremo de pista",
      "La franja de pista",
      "La zona de parada",
    ],
    correcta: 3,
    explicacion:
      "La zona de parada se extiende más allá del extremo de despegue y se prepara para que una aeronave pueda detenerse tras interrumpir el despegue; si está declarada, se suma a la distancia de aceleración y parada disponible. Los galones amarillos advierten que el pavimento no es pista utilizable para aterrizar, despegar ni rodar. La foto sola no demuestra que sea una zona de parada: un área pavimentada previa al umbral también puede llevar galones. Confirma la designación y las distancias declaradas en la información oficial del aeródromo; la zona libre de obstáculos es un volumen despejado, no una distancia de frenado.",
  },
  {
    id: "r02",
    nivel: 1,
    leccion: 2,
    familia: "Carta",
    hueco: {
      codigo: "AP-PRA-03",
      medida: "Ilustración técnica · 3:2 · 1200×800",
      descripcion:
        "Una hoja de carta redibujada, propia y no identificable, en tres partes: arriba una planta con una sola pista y los objetos que sobresalen marcados; abajo un perfil del terreno a lo largo del eje prolongado, con la misma escala horizontal; y a un costado un recuadro con cuatro cifras por cada cabecera. Ojo: no puede parecerse a una carta comercial ni calcar figuras de la OACI.",
    },
    pregunta: "¿Qué carta tienes delante?",
    opciones: [
      "La carta de aeródromo",
      "El plano de movimientos en tierra",
      "La carta de obstáculos tipo A",
      "La carta topográfica de precisión",
    ],
    correcta: 2,
    explicacion:
      "La reconoces por las tres partes juntas: planta, perfil y el recuadro con las cuatro distancias declaradas. Va una por pista. La carta de aeródromo es la principal y te lleva del puesto a la pista; el plano de movimientos en tierra solo aparece cuando el rodaje no cabe con claridad en aquella; y la topográfica de precisión es únicamente para categorías II y III.",
  },
  {
    id: "r03",
    nivel: 2,
    leccion: 5,
    familia: "Señal pintada",
    imagen: {
      src: "/modulos/aeropuertos/ap-pra-04-umbral.svg",
      alt: "Vista cenital técnica de una pista con doce fajas blancas longitudinales simétricas, seis a cada lado del eje",
      pie: "Esquema cenital: cuenta las fajas a cada lado del eje y compara su longitud con la línea central que aparece más adelante. El trazo debe reconocerse antes de consultar la explicación.",
    },
    pregunta: "¿Qué señal estás viendo?",
    opciones: [
      "Señal de umbral",
      "Señal de punto de visada",
      "Señal de zona de toma de contacto",
      "Faja lateral de pista",
    ],
    correcta: 0,
    explicacion:
      "Se reconoce porque las fajas son paralelas al eje, todas iguales y simétricas: nunca hay un número impar a un lado. Cada faja mide 30 m de largo por 1,80 m de ancho, van separadas 1,80 m y el grupo arranca a 6 m del umbral. Cuenta las fajas y tienes el ancho de la pista: 4, 6, 8, 12 y 16 fajas son 18, 23, 30, 45 y 60 m. El punto de visada son dos fajas mucho más gruesas, una a cada lado; la zona de toma de contacto son pares de rectángulos cortos cada 150 m; y la faja lateral corre a lo largo del borde.",
  },
  {
    id: "r04",
    nivel: 2,
    leccion: 6,
    familia: "Señal pintada",
    imagen: {
      src: "/modulos/aeropuertos/ap-pra-05-calle-cerrada.webp",
      alt: "Vista oblicua de una calle de rodaje con una gran cruz amarilla sobre el eje y otra más lejana",
      pie: "Observa el color de las cruces, el ancho del pavimento y su línea central. La combinación te dice qué superficie está afectada y qué maniobra debes descartar.",
    },
    pregunta: "¿Qué te está diciendo esa cruz?",
    opciones: [
      "Que la pista está cerrada",
      "Que la calle de rodaje está cerrada",
      "Que hay un área fuera de servicio por obra",
      "Que ahí se verifica el VOR",
    ],
    correcta: 1,
    explicacion:
      "Manda el color, y es la confusión más fácil de cometer: la cruz de pista cerrada es blanca y la de calle de rodaje es amarilla. También cambia el tamaño. La de calle mide unos 9 m de brazo, 3,75 m de travesaño y faja de 1,50 m, y va al menos en cada extremo del tramo cerrado. La de pista es mucho mayor, 36 m de brazo, 14,5 m de travesaño y faja de 1,80 m, y se repite cada 300 m como máximo. El área fuera de servicio se avisa con texto negro sobre naranja, no con una cruz.",
  },
  {
    id: "r05",
    nivel: 2,
    leccion: 7,
    familia: "Señal pintada",
    imagen: {
      src: "/modulos/aeropuertos/ap-pra-06-patron-b2.webp",
      alt: "Vista cenital de una calle de rodaje con dos barras amarillas continuas cruzadas por travesaños regulares",
      pie: "Compara el dibujo transversal con cuatro líneas paralelas o una línea segmentada: los travesaños son la pista para clasificar el punto de espera. Antes de avanzar, confirma siempre la autorización y tu posición real.",
    },
    pregunta: "¿Qué punto de espera es?",
    opciones: [
      "Punto de espera de la pista, patrón A2",
      "Punto de espera intermedio",
      "Punto de espera de la pista, patrón B2",
      "Faja lateral de calle de rodaje",
    ],
    correcta: 2,
    explicacion:
      "La escalera es el patrón B2: dos continuas de 0,30 m separadas 1,50 m, unidas por travesaños de 0,90 m cada 3,0 m. El A2 mide lo mismo de ancho, 2,10 m, pero son cuatro líneas de 0,30 m con tres espacios de 0,30 m y sin travesaños. Por eso los dos solo se distinguen por el dibujo, no por el tamaño. El B2 solo aparece cuando hay dos o tres puntos de espera en una intersección con pista de aproximación de precisión, y siempre es el más alejado de la pista. El punto de espera intermedio es una sola línea de trazos.",
  },
  {
    id: "r06",
    nivel: 3,
    leccion: 9,
    familia: "Letrero",
    imagen: {
      src: "/modulos/aeropuertos/ap-pra-07-prohibida-entrada.webp",
      alt: "Entrada nocturna a una calle de rodaje con dos letreros rojos iluminados, uno a cada lado, sin inscripciones",
      pie: "Mira ambos lados de la entrada y observa el símbolo en cada cara. Antes de responder, decide qué maniobra permite o impide esa señalización.",
    },
    pregunta: "¿Qué letrero es y qué te obliga a hacer?",
    opciones: [
      "Letrero de designación de pista: paras y pides autorización",
      "Letrero de punto de espera de la pista: paras hasta que te autoricen",
      "Letrero de área fuera de servicio: hay obra adelante",
      "Letrero de prohibida la entrada: por ahí no pasa nadie",
    ],
    correcta: 3,
    explicacion:
      "Es el único letrero obligatorio sin texto: disco rojo con barra blanca horizontal, y va a cada lado de la calle prohibida. No es un punto de espera, así que no hay autorización que lo levante: por ese pavimento no se entra nunca, aunque la autorización apunte hacia allá. Si te encuentras uno, te detienes y pides encaminamiento. Los otros letreros rojos sí llevan inscripción: la designación de pista lleva las cabeceras y el de punto de espera lleva la calle y su número, o la pista y la categoría.",
  },
  {
    id: "r07",
    nivel: 3,
    leccion: 10,
    familia: "Letrero",
    imagen: {
      src: "/modulos/aeropuertos/ap-pra-08-pista-libre.webp",
      alt: "Primer plano de un letrero amarillo con borde negro y cuatro trazos negros paralelos, dos continuos y dos discontinuos",
      pie: "Fíjate en el dibujo negro: no son letras ni una flecha. Reconoce qué señal de pavimento representa antes de decidir cuándo puedes informar al control.",
    },
    pregunta: "¿Qué letrero es?",
    opciones: [
      "Letrero de pista libre",
      "Letrero de salida de pista",
      "Letrero de punto de espera de la pista",
      "Letrero de emplazamiento",
    ],
    correcta: 0,
    explicacion:
      "Se reconoce porque lleva dibujada dentro la configuración del patrón A, y es el único letrero que dibuja una señal del suelo. Pasado ese letrero, y solo cuando lo ha pasado el avión entero, ya liberaste la pista: eso es lo que puedes contestarle al control. El de salida de pista es negro sobre amarillo con la calle y una flecha, y va antes del punto de salida. El de punto de espera es blanco sobre rojo. El de emplazamiento es amarillo sobre negro y nunca lleva flechas.",
  },
  {
    id: "r08",
    nivel: 3,
    leccion: 11,
    familia: "Baliza",
    hueco: {
      codigo: "AP-PRA-09",
      medida: "Ilustración técnica · 4:3 · 1200×900",
      descripcion:
        "Vista cenital de un panel blanco centrado sobre un área cuadrada con borde blanco de 0,3 m, fondo gris claro y sin sombras. El panel son dos discos unidos por una barra, y sobre cada disco hay una barra negra corta puesta en perpendicular al eje que los une. Ojo: las dos barras negras, nunca una sola, y nunca paralelas al eje.",
    },
    pregunta: "¿Qué te está diciendo ese panel?",
    opciones: [
      "Que el aterrizaje y el despegue están limitados a las pistas, pero el rodaje es libre",
      "Que aterrizaje, despegue y rodaje están limitados a pistas y calles de rodaje",
      "Que el aeródromo está cerrado",
      "Que hay tránsito de planeadores",
    ],
    correcta: 0,
    explicacion:
      "La haltera cambia de significado según lleve o no las barras. Sola, quiere decir que aterrizajes, despegues y rodaje quedan limitados a pistas y calles de rodaje. Con una barra negra perpendicular sobre cada disco, la limitación se estrecha: solo el aterrizaje y el despegue quedan atados a las pistas. El cierre del aeródromo lo dice una cruz, y los planeadores, una doble cruz. Todo esto vive en el área de señales, cuadrada y de 9 m de lado como mínimo.",
  },
  {
    id: "r09",
    nivel: 4,
    leccion: 13,
    familia: "Luz",
    hueco: {
      codigo: "AP-PRA-10",
      medida: "Fotografía real · 16:9 · 1600×900",
      descripcion:
        "De noche, desde el asiento izquierdo, con el avión rodando por el eje de una pista larga hacia el fondo del cuadro. La fila central de luces empotradas alterna rojo y blanco a lo largo de todo el tramo visible, con luces cada 15 m, y las dos filas de los lados siguen blancas. Ojo: ninguna luz amarilla y ningún tramo enteramente rojo en el encuadre.",
    },
    pregunta: "¿Qué estás viendo y qué te dice?",
    opciones: [
      "Luces de zona de toma de contacto: aquí se pone el tren",
      "Luces de eje de pista en su tramo alternado: quedan menos de 900 m",
      "Luces de protección de pista: la pista está a un paso",
      "Luces de entrada a la pista: hay tráfico y no es seguro entrar",
    ],
    correcta: 1,
    explicacion:
      "El eje de la pista te da la distancia que falta sin leer nada. Va blanco mientras sobra pista, rojo y blanco alternados entre los 900 m y los 300 m del extremo, y rojo en los últimos 300 m. En una pista de menos de 1 800 m el aviso llega antes: el tramo alternado empieza en el punto medio. Las luces de la zona de toma de contacto son barretas blancas en pares simétricos, las de protección de pista son amarillas y destellan, y las de entrada a la pista son rojas y corren hacia la pista desde la calle.",
  },
  {
    id: "r10",
    nivel: 4,
    leccion: 14,
    familia: "Luz",
    hueco: {
      codigo: "AP-PRA-11",
      medida: "Ilustración técnica · 3:2 · 1200×800",
      descripcion:
        "Planta de una calle de rodaje llegando a una pista, de noche. Cruzando la calle de lado a lado, una fila de luces amarillas separadas 3 m, con las adyacentes en fases opuestas, dibujadas unas encendidas y otras apagadas para que se lea el destello en ola. Un rótulo al margen dice «30 a 60 ciclos por minuto» y otro, «lado de espera». Ojo: en este emplazamiento no se dibuja ninguna barra de parada.",
    },
    pregunta: "¿Qué luces son?",
    opciones: [
      "Barra de parada",
      "Luces de punto de espera intermedio",
      "Luces de protección de pista, configuración B",
      "Luces de espera de despegue",
    ],
    correcta: 2,
    explicacion:
      "Manda el color: amarillo advierte, rojo detiene. Estas son amarillas y destellan de 30 a 60 ciclos por minuto hacia el lado de espera, y avisan de que la pista está a un paso. La configuración A son dos pares de amarillas, uno a cada lado de la calle, que se encienden alternadamente; la B es esta fila que cruza la calle entera cada 3 m, y nunca comparte emplazamiento con una barra de parada. La barra de parada es roja, las luces de punto de espera intermedio son tres amarillas fijas y las de espera de despegue son dos filas rojas junto al eje de la pista.",
  },
  {
    id: "r11",
    nivel: 4,
    leccion: 15,
    familia: "Luz",
    hueco: {
      codigo: "AP-PRA-12",
      medida: "Ilustración técnica · 16:9 · 1600×900",
      descripcion:
        "Planta del área de aproximación con el umbral abajo a la derecha y una cinta de cotas al pie. Una fila central de luces blancas de 900 m con luces cada 30 m, barras transversales a 150 m y a 300 m del umbral, y dos filas laterales de luces rojas que acompañan a la central solo en los 270 m más cercanos al umbral. Ojo: ninguna sigla de otra autoridad y ninguna cifra en pies.",
    },
    pregunta: "¿Qué sistema de aproximación es?",
    opciones: [
      "Sistema sencillo",
      "Sistema de precisión de categoría I",
      "Sistema de luces de entrada a la pista",
      "Sistema de precisión de categorías II y III",
    ],
    correcta: 3,
    explicacion:
      "Lo que lo identifica son las dos filas laterales rojas, que solo existen en los 270 m antes del umbral: si las ves, el umbral está muy cerca. Los tres sistemas comparten la fila central, así que la diferencia está en lo demás. El sencillo llega a 420 m como mínimo, con luces cada 60 m y una sola barra transversal a 300 m. El de categoría I llega a 900 m con luces cada 30 m, barra a 300 m y barras adicionales a 150, 450, 600 y 750 m. El sistema de luces de entrada a la pista no es una fila recta: son grupos de destellos que te llevan por una trayectoria.",
  },
  {
    id: "r12",
    nivel: 5,
    leccion: 19,
    familia: "Luz",
    imagen: {
      src: "/modulos/aeropuertos/ap-pra-13-barra-parada.webp",
      alt: "Vista nocturna desde una cabina detenida ante una hilera transversal de luces rojas con dos luces elevadas en cada extremo",
      pie: "La hilera roja cruza toda la calle; observa también las luces elevadas a sus extremos y el tramo oscuro del eje más allá. Identifica qué orden comunica antes de responder.",
    },
    pregunta: "¿Qué estás viendo?",
    opciones: [
      "Luces de área fuera de servicio",
      "Una barra de parada encendida",
      "Luces de entrada a la pista",
      "Luces de punto de espera en la vía de vehículos",
    ],
    correcta: 1,
    explicacion:
      "Se reconoce por tres detalles a la vez: cruza toda la calle, es unidireccional hacia el avión que espera y lleva un par de rojas elevadas a cada extremo para cuando el fuselaje o la nieve tapan las empotradas. Detrás de la barra, el eje verde queda apagado en 90 m como mínimo, y esa es la confirmación de que la barra manda. Es obligatoria con alcance visual en la pista menor que 550 m. Las luces de entrada a la pista también son rojas, pero corren a lo largo, hacia la pista, no cruzando la calle.",
  },
]

// ─── 2. Decide: dónde paras y con qué número ─────────────────────────────────

export interface ApDecide extends ApBase {
  /** En qué momento del vuelo pasa. Va como pastilla. */
  momento: string
  situacion: string
  pregunta: string
}

export const AP_DECIDE: ApDecide[] = [
  {
    id: "d01",
    nivel: 1,
    leccion: 3,
    momento: "Preparando el aterrizaje",
    situacion:
      "Vas a aterrizar en una pista que declara 2 400 m de recorrido de despegue y tiene, pasado el extremo, 180 m de pavimento con trazos amarillos en ángulo. La ficha publica las cuatro distancias de esa cabecera.",
    pregunta: "¿Con qué cifra corres el cálculo de aterrizaje?",
    opciones: [
      "Con la distancia de aterrizaje disponible, sin sumarle los 180 m",
      "Con la distancia de aceleración y parada, que ya incluye esos 180 m",
      "Con la distancia de despegue disponible",
      "Con los 2 400 m más los 180 m de pavimento adicional",
    ],
    correcta: 0,
    explicacion:
      "Ese pavimento es zona de parada, y la zona de parada suma a la distancia de aceleración y parada, que es la de un despegue abortado, no a la de aterrizaje. Los trazos en ángulo están precisamente para decirte que ahí no se aterriza ni se rueda. El cálculo de aterrizaje corre con la distancia de aterrizaje disponible y con nada más. Y recuerda que las cuatro cifras se publican por dirección de la pista, no para la pista entera.",
  },
  {
    id: "d02",
    nivel: 1,
    leccion: 2,
    momento: "En el briefing de llegada",
    situacion:
      "Preparas la llegada a un aeropuerto grande. En la carta de aeródromo las calles se cruzan tan juntas que no puedes seguir con el dedo la ruta que te van a dar, y necesitas identificar los cruces conflictivos antes de tocar.",
    pregunta: "¿Dónde lo miras?",
    opciones: [
      "En la carta de obstáculos tipo A",
      "En el plano de estacionamiento y atraque",
      "En el plano de movimientos en tierra",
      "En la carta topográfica de precisión",
    ],
    correcta: 2,
    explicacion:
      "El plano de movimientos en tierra existe exactamente para eso: aparece cuando el rodaje no cabe con claridad en la carta de aeródromo, y es donde se leen los puntos críticos, cada uno rodeado con un círculo y con su identificador, y explicados en una tabla de la misma hoja. El plano de estacionamiento y atraque cubre puestos, guías y sistemas de atraque. La tipo A va una por pista y trae obstáculos y distancias declaradas. La topográfica de precisión solo existe para categorías II y III.",
  },
  {
    id: "d03",
    nivel: 2,
    leccion: 7,
    momento: "Rodando hacia la pista",
    situacion:
      "Te autorizaron a rodar hasta el punto de espera de la 31, sin cruzar. Frenas al ver la señal y, cuando el avión queda quieto, el tren principal descansa justo encima de la primera línea continua. Delante tienes la segunda continua y las dos de trazos.",
    pregunta: "¿Estás donde tenías que estar?",
    opciones: [
      "Sí: mientras el morro no pase de las líneas de trazos, estás detrás",
      "No: el avión entero tiene que quedar antes de las continuas",
      "Sí: la señal se considera respetada al tocar la primera línea",
      "No: hay que retroceder hasta el punto de espera intermedio anterior",
    ],
    correcta: 1,
    explicacion:
      "Las dos continuas están del lado donde se espera y las dos de trazos miran a la pista, así que las continuas son la línea que no se pisa: todo el avión queda de tu lado. Es la misma regla al revés cuando sales de la pista, y ahí es donde más se falla: no estás libre hasta que has cruzado la señal entera. El eje amarillo de la calle se interrumpe justo en esa señal para recordártelo, y el eje mejorado, con sus trazos a los lados, te venía avisando desde, como mucho, 47 m antes.",
  },
  {
    id: "d04",
    nivel: 2,
    leccion: 8,
    momento: "Entrando a la plataforma",
    situacion:
      "Ruedas por la plataforma hacia el puesto. Por delante del ala de un avión ya estacionado corre una línea continua que no es amarilla, sino de un color que contrasta con las señales del puesto, y justo detrás de ella hay un equipo de tierra esperando con un remolque.",
    pregunta: "¿Qué es esa línea y qué cambia para ti?",
    opciones: [
      "Es el eje de otra calle de rodaje: puedes seguirla si te encamina al puesto",
      "Es el borde de la plataforma: por fuera el pavimento no aguanta el avión",
      "Es una línea de seguridad: marca por dónde se mueven vehículos y equipos",
      "Es un punto de espera: paras hasta que te autoricen a seguir",
    ],
    correcta: 2,
    explicacion:
      "En la plataforma todo lo del puesto va en amarillo, así que una línea continua de otro color es una línea de seguridad. Son de 0,10 m de ancho como mínimo y dicen dos cosas distintas según cuál sea: la de separación de punta de plano marca hasta dónde puede llegar el ala sin chocar nada, y la de límite de vía de servicio marca por dónde circulan los vehículos de rampa sin meterse en tu puesto. No es un punto de espera y no te para, pero te dice de quién es cada pedazo de pavimento.",
  },
  {
    id: "d05",
    nivel: 3,
    leccion: 10,
    momento: "Rodando hacia la pista",
    situacion:
      "Ruedas por la calle que preparaste. A media calle aparece un letrero rectangular de cara naranja con texto negro en mayúsculas, reforzado con dos luces que destellan a la vez, y justo al lado hay un letrero amarillo cubierto con una funda.",
    pregunta: "¿Qué haces con esa información?",
    opciones: [
      "Sigues: el naranja es informativo y no cambia nada de lo que preparaste",
      "Paras siempre: el naranja es un letrero con instrucciones obligatorias",
      "Lo ignoras: es señalización vial del aeropuerto, no aeronáutica",
      "Contrastas con lo publicado antes de seguir: hay algo fuera de servicio adelante",
    ],
    correcta: 3,
    explicacion:
      "Negro sobre naranja es área fuera de servicio, y avisa de obras o de distancias declaradas reducidas. Los dos destellos simultáneos están para obligarte a mirarlo. El letrero amarillo tapado dice que esa ayuda ya no aplica. La información del naranja no puede estar en conflicto con la que da el servicio de información aeronáutica, así que si tu cálculo dependía de una cifra publicada, la compruebas antes de seguir; si el letrero y el aviso no coinciden, se para y se reporta. El único letrero que te frena por sí mismo sigue siendo el rojo.",
  },
  {
    id: "d06",
    nivel: 3,
    leccion: 11,
    momento: "Entrando a un aeródromo sin control",
    situacion:
      "Llegas a un aeródromo sin servicio de información. Desde el circuito ves la manga completamente extendida en horizontal, con la boca pequeña apuntando al este, y cuentas sus cinco bandas sin esfuerzo.",
    pregunta: "¿Qué viento tienes?",
    opciones: [
      "Viento del este, y la manga no dice nada de la intensidad",
      "Viento del oeste, y fuerte",
      "Viento del este, y fuerte",
      "Viento del oeste, pero sin dato de intensidad hasta ver otra manga",
    ],
    correcta: 1,
    explicacion:
      "El aire entra por la boca grande y sale por la pequeña, así que la manga apunta hacia donde va el viento: si la boca chica mira al este, el viento viene del oeste. Y la manga también da una idea de la intensidad: cuanto más horizontal, más viento. La norma de la OACI no fija con cuántos nudos queda extendida. Es el único indicador de viento garantizado en todo aeródromo del mundo. Sus medidas también las puedes usar de referencia: cono de tela de 3,6 m como mínimo, 0,9 m de diámetro en la boca grande y legible desde 300 m de altura.",
  },
  {
    id: "d07",
    nivel: 4,
    leccion: 15,
    momento: "En final",
    situacion:
      "Vuelas una aproximación visual a una pista con indicador de pendiente de cuatro cajas, publicado para una senda de 3 grados. A una milla del umbral ves tres cajas rojas y una blanca, y la blanca es la más alejada de la pista.",
    pregunta: "¿Dónde estás y qué haces?",
    opciones: [
      "Ligeramente alto: reduces y dejas que la senda te alcance",
      "En senda: mantienes",
      "Bajo: corriges hacia arriba antes de que pasen a cuatro rojas",
      "Muy bajo: motor y al aire",
    ],
    correcta: 2,
    explicacion:
      "El indicador se lee de fuera hacia dentro, y las rojas van siempre del lado de la pista. Cuatro blancas es muy alto, una roja y tres blancas es alto, dos y dos es en senda, tres rojas y una blanca es bajo y cuatro rojas es muy bajo. Para una senda de 3 grados esas cuatro lecturas caen en 3 grados 30 minutos, 3 grados 10, 2 grados 50 y 2 grados 30. Más blanco, más alto; más rojo, más bajo. La versión abreviada usa dos cajas y tiene solo tres lecturas.",
  },
  {
    id: "d08",
    nivel: 4,
    leccion: 17,
    momento: "En corta final",
    situacion:
      "Aproximación de precisión de categoría I, de noche, sobre terreno llano. Se va la energía del aeropuerto y se apagan el borde de la pista, el umbral y el indicador de pendiente. Vuelven todos unos diez segundos después.",
    pregunta: "¿Es normal o el aeropuerto incumplió?",
    opciones: [
      "Incumplió: en cualquier pista de precisión esas luces vuelven en 1 segundo",
      "Está dentro de norma: en categoría I casi todo puede tardar hasta 15 segundos",
      "Incumplió: sin fuente secundaria no se puede operar de noche",
      "Está fuera de norma porque el tiempo de conmutación se mide en minutos",
    ],
    correcta: 1,
    explicacion:
      "El tiempo de conmutación no es lo que tarda el generador en arrancar: es el rato que la luz pasa por debajo de la mitad de su intensidad al cambiar de fuente. En categoría I casi todo admite 15 segundos, y el segundo único se exige solo cuando la aproximación se hace sobre terreno peligroso o escarpado, y para el indicador de pendiente, el borde y el umbral. En categorías II y III la cosa cambia: el eje, la zona de toma de contacto, el umbral, el extremo y las barras de parada vuelven en 1 segundo, aunque el borde pueda tardar 15. Lo que decide si sigues es el aviso que el sistema de vigilancia le manda al control cuando el nivel de servicio cae.",
  },
  {
    id: "d09",
    nivel: 5,
    leccion: 20,
    momento: "Antes del descenso",
    situacion:
      "Llega el informe del estado de la pista. En el primer tercio, la administración del aeródromo evaluó que un 20 por ciento de la superficie está mojada y el resto está seca. Los otros dos tercios están secos.",
    pregunta: "¿Qué clave esperas para ese primer tercio?",
    opciones: [
      "Clave 5, porque hay superficie mojada",
      "Clave 3, porque mojada resbaladiza es 3",
      "No se notifica clave cuando la superficie es mixta",
      "Clave 6, porque el tercio cuenta como seco",
    ],
    correcta: 3,
    explicacion:
      "La regla del 25 por ciento: si esa proporción o menos del tercio está mojada o cubierta, el tercio se notifica como 6. La clave se da siempre por tercio y siempre empezando por el designador más bajo de la pista, así que si aterrizas por la cabecera contraria tienes que leerla al revés y tu primer tercio es el último del informe. La tabla va de 6 a 0: el 6 es seca, el 1 es hielo y el 0 es lo peor que hay.",
  },
  {
    id: "d10",
    nivel: 5,
    leccion: 21,
    momento: "Planificando el vuelo",
    situacion:
      "Estudias un aeropuerto que publica categoría 7 de salvamento y extinción de incendios. Tu avión mide 52 m de longitud total y su fuselaje tiene 6 m de anchura máxima.",
    pregunta: "¿Qué encuentras al comparar?",
    opciones: [
      "Tu avión pide categoría 8, así que la publicada se queda corta",
      "Encaja: la categoría 7 cubre hasta 61 m de longitud",
      "No aplica: la categoría se elige por el peso máximo de despegue",
      "Tu avión pide categoría 9 porque el fuselaje excede su fila",
    ],
    correcta: 0,
    explicacion:
      "La categoría se elige por la longitud total del avión y después se comprueba la anchura máxima del fuselaje. La 7 cubre de 39 a menos de 49 m; con 52 m tu avión cae en la 8, que va de 49 a menos de 61 m y admite hasta 7 m de fuselaje, así que los 6 m no la suben de nivel. Si el fuselaje se pasara de la anchura de su fila, la categoría subiría un escalón. Y hay una excepción a la baja: con menos de 700 movimientos en los tres meses consecutivos de mayor actividad, el nivel puede bajar una sola categoría.",
  },
]

// ─── 3. Cambió: la Enmienda 18 y el 26 de noviembre de 2026 ──────────────────

export interface ApCambio extends ApBase {
  /** La fecha que manda en este ejercicio. Va como pastilla. */
  fecha: string
  pregunta: string
  /** Qué decía el material anterior. Es lo que hace útil el ejercicio. */
  antes: string
}

export const AP_CAMBIO: ApCambio[] = [
  {
    id: "c01",
    nivel: 5,
    leccion: 18,
    fecha: "26 de noviembre de 2026",
    pregunta:
      "Hasta el 26 de noviembre de 2026, rodando hacia una pista de precisión en cualquier aeropuerto del mundo, ¿qué puedes encontrarte pintado en el punto de espera?",
    opciones: [
      "Solo los patrones anchos A2 y B2: los estrechos ya no existen",
      "Los cuatro: A1 y B1 siguen siendo válidos hasta el 26 de noviembre de 2026",
      "Solo A1 y B1, porque A2 y B2 todavía no son aplicables",
      "Cualquiera de los cuatro, sin fecha de vencimiento",
    ],
    correcta: 1,
    explicacion:
      "Es el punto más práctico de todo el cambio. Las configuraciones estrechas siguen valiendo hasta el 26 de noviembre de 2026, así que muchos aeropuertos todavía las tienen pintadas, y lo que ves en el suelo puede no ser lo que enseña el material nuevo. Lo que no cambia es la regla que te salva de una incursión: en el patrón A las dos líneas continuas van del lado donde se espera y las de trazos miran a la pista, y el patrón A es siempre el más cercano a la pista.",
    antes:
      "El material anterior dibuja A1 y B1 como si fueran la norma, sin ninguna fecha de vencimiento.",
  },
  {
    id: "c02",
    nivel: 2,
    leccion: 7,
    fecha: "26 de noviembre de 2026",
    pregunta:
      "En una intersección ves una escalera amarilla cuyas dos líneas continuas están separadas unos 0,6 m. ¿Qué estás mirando?",
    opciones: [
      "Un patrón B2 mal pintado, que hay que reportar",
      "Un punto de espera intermedio reforzado",
      "Una faja lateral de calle de rodaje",
      "Un patrón B1, la configuración estrecha que deja de valer en 2026",
    ],
    correcta: 3,
    explicacion:
      "La separación es la que delata la configuración. En el B2 las dos continuas van de 0,30 m, separadas 1,50 m, y el conjunto mide 2,10 m de ancho total, con travesaños de 0,90 m cada 3,0 m. Una escalera mucho más estrecha es la configuración antigua, y sigue siendo válida hasta el 26 de noviembre de 2026. Ancho aparte, significa exactamente lo mismo: es el punto de espera más alejado de la pista y protege el área del sistema de aterrizaje por instrumentos.",
    antes:
      "Los manuales y las figuras anteriores dan la escalera estrecha como la única forma del patrón B.",
  },
  {
    id: "c03",
    nivel: 3,
    leccion: 10,
    fecha: "27 de noviembre de 2025",
    pregunta: "La Enmienda 18 metió un color nuevo en las señales y los letreros del área de movimiento. ¿Dónde se usa?",
    opciones: [
      "En la señal pintada y en el letrero de área fuera de servicio",
      "También en las cruces que cierran una pista o una calle de rodaje",
      "En las balizas de borde de calle de rodaje",
      "En los letreros con instrucciones obligatorias, que pasan de rojo a naranja",
    ],
    correcta: 0,
    explicacion:
      "El catálogo de señales pintadas solo tenía blanco, amarillo, rojo con blanco y negro con amarillo. El naranja es el color nuevo y significa que eso no sirve: lo llevan la señal pintada de área fuera de servicio y el letrero del mismo nombre, el color nuevo de los letreros. En señales pintadas y en letreros, el naranja solo significa eso. El fondo naranja sobresale 0,50 m o más del texto, el contorno negro es de 10 mm en clave 1 o 2 y de 20 mm en clave 3 o 4, y el letrero puede reforzarse con dos luces destellantes que destellan a la vez.",
    antes:
      "El material anterior enseña cuatro familias de color en el suelo y dos de letrero, sin el naranja.",
  },
  {
    id: "c04",
    nivel: 1,
    leccion: 3,
    fecha: "27 de noviembre de 2025",
    pregunta:
      "Un compañero que estudió con material de 2023 te dice que el letrero de distancia de pista restante no está en la norma que estás estudiando. ¿Qué le contestas?",
    opciones: [
      "Que tiene razón: sigue sin estar y solo se usa en algunos países",
      "Que entró con la Enmienda 18 y hoy es un elemento de la norma que estudias",
      "Que existe pero solo para pistas de categoría II y III",
      "Que se retiró en 2025 y por eso ya no aparece",
    ],
    correcta: 1,
    explicacion:
      "Es uno de los elementos que estrena la Enmienda 18, y por eso no está en casi ningún material de estudio. Es inscripción blanca sobre fondo negro, va a lo largo de toda la pista espaciado cada 300 m, paralelo al eje y equidistante de él, y siempre por fuera de los bordes del pavimento. Es frangible, va bajo, y todos los letreros de una misma pista son del mismo tamaño. Lleva una sola cifra, sin unidades: cuántos tramos de unos 300 m quedan hasta el final de la pista.",
    antes:
      "Los manuales anteriores lo describen como un elemento ajeno a esta norma, propio de otra autoridad.",
  },
  {
    id: "c05",
    nivel: 4,
    leccion: 14,
    fecha: "27 de noviembre de 2025",
    pregunta:
      "En tu aeropuerto, las luces de eje de calle se exigían donde se rodaba con alcance visual en la pista menor que 350 m, y ahora la cifra que se aplica es 300 m. ¿Por qué?",
    opciones: [
      "Es una decisión del explotador del aeródromo, no de la norma",
      "Cambió el mínimo de las operaciones de categoría II",
      "La norma movió ese umbral de 350 m a 300 m y aplica desde finales de 2025",
      "Es un error de publicación que hay que reportar",
    ],
    correcta: 2,
    explicacion:
      "Es un cambio de una sola cifra que recorre buena parte de las luces de rodaje: ejes de calle, plataformas de viraje, puntos de espera intermedios e indicadoras de salida rápida. Por eso tu aeropuerto pudo haberlo movido hace poco sin que nada más cambiara a la vista. Ojo con no mezclarlo con la otra cifra del mismo capítulo: la barra de parada sigue siendo obligatoria cuando el alcance visual en la pista es menor que 550 m, y en una calle que se usa por debajo de 300 m las luces de eje van cada 15 m en vez de cada 30.",
    antes:
      "Todo el material anterior, y todavía algunos reglamentos nacionales, dan 350 m como el umbral que dispara este alumbrado.",
  },
  {
    id: "c06",
    nivel: 2,
    leccion: 5,
    fecha: "27 de noviembre de 2025",
    pregunta: "¿En qué pistas es obligatoria hoy la señal de umbral?",
    opciones: [
      "Solo en pistas de aproximación por instrumentos",
      "Solo en pistas de clave 3 o 4 de transporte comercial internacional",
      "En todas las pistas pavimentadas",
      "En todas, estén pavimentadas o no",
    ],
    correcta: 2,
    explicacion:
      "La Enmienda 18 quitó la restricción que acotaba la exigencia y la extendió a todas las pistas pavimentadas. Es un cambio fácil de leer al revés, porque la redacción vieja se parece mucho y sigue circulando. En la práctica te cambia una cosa: en una pista pavimentada pequeña también puedes contar las fajas para saber el ancho, y siguen siendo 4, 6, 8, 12 y 16 fajas para 18, 23, 30, 45 y 60 m.",
    antes:
      "El material anterior limita la señal de umbral a las pistas por instrumentos y a algunas de vuelo visual.",
  },
  {
    id: "c07",
    nivel: 2,
    leccion: 6,
    fecha: "27 de noviembre de 2025",
    pregunta: "¿Cómo se señala de noche una pista cerrada, según lo que trajo esta edición?",
    opciones: [
      "Se apaga todo el alumbrado de esa pista y se deja a oscuras",
      "Con una cruz de luces amarillas fijas sobre el eje",
      "Con dos filas de luces rojas a lo ancho de cada extremo",
      "Con una cruz de luces blancas que destella un segundo sí y un segundo no",
    ],
    correcta: 3,
    explicacion:
      "Es una recomendación nueva, y la clave está en el ritmo: blanco variable de destellos, un segundo encendida y un segundo apagada, montada sobre el eje y visible desde la dirección de aproximación. Lleva 5 luces por brazo como mínimo, con 1,5 m de intervalo, y si el brazo tiene 7 luces el intervalo baja a 1,0 m y con 9 luces a 0,8 m. Si el sistema de destellos falla, las luces pasan automáticamente a fijas. De día lo que cierra la pista es la cruz pintada, que es blanca, y la de la calle de rodaje, que es amarilla.",
    antes:
      "El material anterior no la trae: de noche, una pista cerrada solo se reconocía porque tenía el alumbrado apagado.",
  },
  {
    id: "c08",
    nivel: 2,
    leccion: 7,
    fecha: "27 de noviembre de 2025",
    pregunta:
      "La señal pintada con instrucciones obligatorias puede ir centrada sobre el eje o repartida a los dos lados. ¿Qué dato lo decide hoy?",
    opciones: [
      "La anchura exterior entre ruedas del tren principal",
      "La letra de la clave de referencia del aeródromo",
      "La envergadura máxima admitida en esa calle",
      "La categoría de aproximación que protege el punto de espera",
    ],
    correcta: 0,
    explicacion:
      "El criterio se movió de la letra de clave a la anchura exterior entre ruedas del tren principal: por debajo de 9 m, la inscripción va centrada sobre el eje; de 9 m a menos de 15 m, va a los dos lados, y en los dos casos a 1 m como mínimo del punto de espera y del eje. Es el mismo parámetro que dejó de determinar la letra de clave en 2018 y quedó como dato aparte, el que fija anchuras de pista, de calles y de márgenes. La señal es blanca sobre rojo y vale exactamente lo mismo que el letrero rojo.",
    antes:
      "El material anterior explica esta señal en función de la letra de clave, que ya no es el criterio.",
  },
]

// ─── Totales y claves de progreso ────────────────────────────────────────────

/**
 * Clave con la que se guarda cada ejercicio resuelto. Llevan prefijo por tipo
 * para que un identificador repetido entre tipos no se pise, y para poder leer
 * de un vistazo qué practicó el piloto.
 */
export const claveReconoce = (id: string) => `ap-rec-${id}`
export const claveDecide = (id: string) => `ap-dec-${id}`
export const claveCambio = (id: string) => `ap-cam-${id}`

export const AP_PRACTICA_TOTALES = {
  reconoce: AP_RECONOCE.length,
  decide: AP_DECIDE.length,
  cambio: AP_CAMBIO.length,
}

/**
 * Las claves válidas, en el orden en que se practican. Es lo que la base usa
 * como catálogo: `aeropuertos_mark_progress` rechaza cualquier clave que no
 * esté aquí, así que esta lista y `contenido/catalogo/modulos.json` tienen que
 * decir lo mismo. De cuadrarlas se encarga scripts/catalogo/catalogo.test.ts.
 */
export const AP_PRACTICA_CLAVES: string[] = [
  ...AP_RECONOCE.map((e) => claveReconoce(e.id)),
  ...AP_DECIDE.map((e) => claveDecide(e.id)),
  ...AP_CAMBIO.map((e) => claveCambio(e.id)),
]

export const AP_PRACTICA_TOTAL = AP_PRACTICA_CLAVES.length

/**
 * El aviso del pie. Dice de dónde sale el material y qué no es: la práctica se
 * construyó para el curso y no sustituye lo que publica el aeródromo.
 */
export const AP_PRACTICA_AVISO =
  "Ejercicios construidos con fines formativos a partir del Anexo 14, Volumen I, 9.ª edición con la Enmienda 18, aplicable desde el 27 de noviembre de 2025, y del Anexo 4 para las cartas. Las situaciones no son sucesos reales. Lo que publica cada aeródromo sobre sus pistas, sus distancias declaradas y sus ayudas visuales manda siempre sobre un ejercicio."
