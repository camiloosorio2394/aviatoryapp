/**
 * Nivel 4 · Luces (lecciones 13 a 17).
 *
 * De noche el aeropuerto solo existe donde hay luz, así que el nivel se ordena
 * como lo ve el piloto: primero la pista, después el rodaje, después lo que se
 * enciende antes de ver la pista, después lo que hay que esquivar y, al final,
 * qué pasa cuando parte de todo eso se apaga.
 *
 * La norma es el Anexo 14 Vol. I, 9.ª edición con la Enmienda 18. Sin citas en
 * el texto y sin nada de la FAA, por decisión de Camilo.
 *
 * Los huecos llevan su código (AP-LL-NN) porque es el que Camilo usa para
 * nombrar la imagen cuando la genera. La ficha completa de cada uno está en
 * docs/BRIEF_AEROPUERTOS.md.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const NIVEL_4: DocScreen[] = [
  // ── 13 ──────────────────────────────────────────────────────────────────
  {
    n: 13,
    title: "Luces de pista",
    kicker: "De noche la pista se lee por colores, no por formas",
    minutes: 9,
    blocks: [
      {
        kind: "hueco",
        rotulo: "AP-13-01 · Ilustración de escena · 16:9 · 1600×900",
        descripcion:
          "Vista aérea oblicua desde 800 ft y 2 NM del umbral, noche cerrada, la pista en diagonal. Dos filas de borde blancas parejas, fila verde de umbral, fila roja de extremo al fondo y el eje cambiando de color: blanco hasta 900 m del extremo, rojo y blanco alternados de 900 m a 300 m y rojo en los últimos 300 m, con luces cada 15 m. Al costado, calles de rodaje azules. Ojo: ninguna luz de eje roja al principio de la pista.",
        alto: 320,
      },
      {
        kind: "p",
        text: "De noche no ves la pista: ves su dibujo en luces. Cada color dice una cosa y ninguna está puesta por gusto.",
      },
      {
        kind: "hueco",
        rotulo: "AP-13-02 · Fotografía real · 16:9 · 1600×900",
        descripcion:
          "Desde el asiento izquierdo, de noche, a 200 ft sobre el umbral y alineado con el eje. Fila verde de umbral cruzando el cuadro, filas blancas de borde abriéndose hacia la cámara, eje blanco, barretas blancas de toma de contacto en pares simétricos cada 30 m o 60 m y el PAPI a la izquierda con dos rojas y dos blancas. Ojo: en este tramo no va ninguna luz amarilla.",
        alto: 320,
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Borde",
            hueco: {
              id: "AP-13-03",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "A ras de pista, desde el eje, de noche, mirando al extremo: la fila de borde derecha entra por la esquina inferior y se pierde al fondo. Blancas, en el borde del pavimento o hasta 3 m por fuera, separación uniforme de 60 m como máximo en pista por instrumentos (100 m en visual), y el punto exacto donde pasan a amarillas: los últimos 600 m o el último tercio, lo que sea menor, contado desde el extremo opuesto al de la carrera de despegue. Ojo: el azul es de calle de rodaje, nunca del borde de pista.",
            },
            puntos: [
              "Dos filas blancas marcan hasta dónde llega el pavimento: cada 60 m por instrumentos, cada 100 m en visual. El último tramo puede verse amarillo.",
            ],
          },
          {
            titulo: "Umbral",
            hueco: {
              id: "AP-13-04",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "El umbral visto de frente, de noche, desde 100 ft o desde el suelo. La fila verde cruza perpendicular al eje, completa, a 3 m por fuera del extremo como máximo y con al menos 6 luces en pista visual o de no precisión. A cada lado, una barra de ala de al menos 5 luces que se extiende 10 m como mínimo hacia afuera, con la luz más interna en línea con las de borde. Ojo: ninguna roja mezclada en la fila verde, y ningún patrón A1 ni B1 al fondo.",
            },
            puntos: [
              "Verde es dónde empieza tu pista. Las barras de ala refuerzan el umbral con dos grupos verdes.",
            ],
          },
          {
            titulo: "Extremo",
            hueco: {
              id: "AP-13-05",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "Desde el eje, de noche, a 300 m del extremo y con la cámara baja. La fila roja de extremo cierra la pista (a 3 m por fuera como máximo, al menos 6 luces, separadas 6 m como máximo en categoría III) y detrás siguen las dos filas rojas de la zona de parada, en prolongación de las de borde, más la fila roja de su final. El eje ya va rojo en ese tramo. Ojo: ninguna luz blanca ni verde dentro de la zona de parada.",
            },
            puntos: ["Rojo es dónde se termina."],
          },
          {
            titulo: "Toma de contacto",
            puntos: [
              "Las barretas blancas dibujan dónde poner el tren. Un par suelto de blancas marca el último punto útil para aterrizar.",
            ],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Una pista de categoría III, de noche, desde el eje",
        hueco: {
          id: "AP-13-06",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "Cámara a 3 m de altura sobre el eje, mirando al extremo, noche, aire limpio y pista seca: tiene que caber el ancho completo y al menos 1 000 m de profundidad. Filas de borde blancas, eje blanco cada 15 m, barretas de toma de contacto en pares cada 30 m o 60 m a lo largo de 900 m, el par suelto de blancas junto al eje y, al fondo, el tramo alternado rojo y blanco y la fila roja del extremo. Ojo: sin luces amarillas de salida rápida en este cuadro.",
        },
        puntos: [
          {
            x: 0,
            y: 0,
            que: "Luces de borde, blancas",
            significa: "Marcan el ancho utilizable.",
            piloto: "Si las pierdes de vista por un lado, te saliste del eje.",
          },
          {
            x: 0,
            y: 0,
            que: "Luces de eje, blancas",
            significa: "Dicen que todavía sobra pista.",
            piloto: "Es tu referencia de alineación en visibilidad baja.",
          },
          {
            x: 0,
            y: 0,
            que: "Barretas de zona de toma de contacto",
            significa: "Ahí es donde debes poner el tren.",
            piloto: "Si las pasas de largo, ya no aterrizaste donde calculaste.",
          },
          {
            x: 0,
            y: 0,
            que: "Par suelto de luces blancas junto al eje",
            significa: "Es el último punto útil para aterrizar.",
            piloto: "Si llegas ahí sin tren en el piso, es motor y al aire.",
          },
          {
            x: 0,
            y: 0,
            que: "Eje rojo y blanco alternados",
            significa: "Quedan menos de 900 m.",
            piloto: "Empieza a mirar el frenado.",
          },
          {
            x: 0,
            y: 0,
            que: "Fila roja del extremo",
            significa: "Ahí se acaba el pavimento.",
            piloto: "No hay nada útil después.",
          },
        ],
      },
      {
        kind: "p",
        text: "El eje te da la distancia que falta sin leer nada: blanco mientras sobra pista, rojo y blanco cuando empieza a faltar, rojo cuando se acabó. En pistas cortas el aviso llega desde la mitad. Rojo bajo la nariz: últimos 300 m.",
      },
      {
        kind: "hueco",
        rotulo: "AP-13-07 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "Planta de una pista completa con el eje en tres tramos: blanco desde el umbral hasta 900 m del extremo, rojo y blanco alternados de 900 m a 300 m y rojo en los últimos 300 m, con luces cada 15 m y las cotas medidas desde el extremo. Debajo, la misma pista más corta: con menos de 1 800 m el tramo alternado arranca en el punto medio. Rótulos «900 m», «300 m», «blanco», «rojo y blanco», «rojo», «pista de menos de 1 800 m» y «punto medio». Ojo: nada de cifras en pies ni figuras calcadas de la OACI.",
        alto: 320,
      },
      {
        kind: "piensaComoPiloto",
        momento: "Rodando hacia el extremo, de noche",
        situacion:
          "Aterrizaste de noche en una pista sin salida en la cabecera. Rodando hacia el extremo, el eje que sigues se pone rojo y adelante ves que unas luces verdes se curvan hacia la derecha, fuera de la pista.",
        pregunta: "¿Qué son esas luces verdes y qué te están diciendo?",
        respuesta:
          "Son las luces de plataforma de viraje. Te marcan el camino para dar la vuelta de 180 grados sin salirte del pavimento. Las verdes de viraje solo las ve el avión que va hacia ellas, y el rojo del eje te confirma que estás en los últimos 300 m.",
        claves: [
          "Verdes, fijas y unidireccionales: solo las ve el avión que va hacia la plataforma.",
          "Van sobre la señal de viraje o desplazadas 30 cm como máximo.",
          "El eje rojo es la confirmación de los últimos 300 m.",
        ],
        hueco: {
          id: "AP-13-08",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "Desde la cabina, de noche, rodando hacia el extremo de una pista sin salida en la cabecera, con el pavimento ensanchándose hacia un lado. Se ve la línea de luces verdes curvándose hacia la plataforma de viraje (tramo recto 15 m como máximo, curvo 7,5 m como máximo), las blancas de borde terminando, la fila roja del extremo cerca y, si la plataforma lleva borde iluminado, azules cada 30 m como máximo. Ojo: nada de ejes verdes de calle de rodaje entrando por el costado, que aquí confunden.",
        },
      },
    ],
  },

  // ── 14 ──────────────────────────────────────────────────────────────────
  {
    n: 14,
    title: "Luces de calle de rodaje",
    kicker: "Azul, verde, amarillo y rojo: cuatro colores y una sola regla",
    minutes: 9,
    blocks: [
      {
        kind: "hueco",
        rotulo: "AP-14-01 · Ilustración de escena · 16:9 · 1600×900",
        descripcion:
          "Vista aérea inclinada, de noche, sobre un nudo de calles de rodaje entre la plataforma y la pista, sin ciudad de fondo. Ejes verdes dibujando las curvas, bordes azules acompañándolos, un punto de espera con la barra roja cruzada (luces cada 3 m como máximo), un par de amarillas destellando a los lados de esa calle y, al fondo, las blancas de borde de pista. Ojo: ningún patrón de punto de espera A1 ni B1.",
        alto: 320,
      },
      {
        kind: "p",
        text: "En rodaje los colores te dicen dónde estás y hasta dónde puedes seguir. El rojo siempre significa lo mismo: aquí se para.",
      },
      {
        kind: "hueco",
        rotulo: "AP-14-02 · Fotografía real · 16:9 · 1600×900",
        descripcion:
          "Desde el asiento izquierdo, de noche, rodando por una calle recta. Las luces de eje verdes, empotradas, se pierden al frente sobre la señal de eje amarilla pintada (sobre la señal o desplazadas 30 cm como máximo, cada 30 m como máximo en recta, 15 m si la calle se usa con RVR menor de 300 m) y las dos filas de borde azules, elevadas, se abren a los lados cada 60 m como máximo. Ojo: en este tramo el eje no lleva ninguna luz amarilla.",
        alto: 320,
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Barra de parada",
            hueco: {
              id: "AP-14-03",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "Desde la cabina, de noche, detenido antes del punto de espera: la fila de luces rojas empotradas cruza toda la calle a unos 15 m, separadas 3 m como máximo y unidireccionales hacia el avión que espera, con un par de rojas elevadas a cada extremo. Detrás de la barra, el eje verde apagado en 90 m como mínimo. Señal patrón A2: cuatro líneas amarillas de 0,3 m con tres espacios de 0,3 m, 2,10 m de ancho total. Ojo: las dos líneas continuas van del lado de espera, nunca mirando a la pista.",
            },
            puntos: [
              "Una fila roja a través de la calle. Encendida no se cruza, ni con autorización. Dos pares de luces rojas altas la refuerzan.",
            ],
          },
          {
            titulo: "Luces de protección de pista",
            hueco: {
              id: "AP-14-04",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Planta de un punto de espera partida en dos mitades a la misma escala: a la izquierda la configuración A, con dos pares de luces amarillas, uno a cada lado de la calle, que se encienden alternadamente; a la derecha la configuración B, con la fila amarilla cruzando la calle cada 3 m, las adyacentes alternando y las alternas al unísono. Las dos destellan de 30 a 60 ciclos por minuto hacia el punto de espera. Rótulos «configuración A», «configuración B», «30 a 60 ciclos por minuto» y «lado de espera». Ojo: la configuración B nunca comparte emplazamiento con una barra de parada.",
            },
            puntos: [
              "Amarillas y destellando. Avisan que la pista está a un paso. Dos formas: a los lados de la calle o cruzándola completa.",
            ],
          },
          {
            titulo: "Salida verde y amarilla",
            hueco: {
              id: "AP-14-05",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "Desde la cabina, de noche, saliendo de la pista por una calle de salida, con la pista quedando atrás a la derecha. La curva de luces de eje alterna verde y amarillo desde el eje de la pista hasta el perímetro del área crítica o sensible del ILS (o el borde inferior de la superficie de transición interna, lo que quede más lejos): la primera luz siempre verde, la última amarilla, y de ahí en adelante todas verdes. Bordes azules a los lados. Ojo: ninguna barra de parada encendida en el sentido de salida.",
            },
            puntos: [
              "Cuando sales de la pista, el eje alterna verde y amarillo. Mientras veas amarillo, todavía estás dentro del área sensible del ILS.",
            ],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Llegando al punto de espera de la pista, de noche",
        hueco: {
          id: "AP-14-06",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "Desde la cabina, de noche, rodando hacia un punto de espera que está a 60 m, con el ancho completo de la calle y el comienzo de la pista al fondo. Eje verde hasta la barra, bordes azules, tres amarillas fijas separadas 1,5 m atravesadas en el punto de espera intermedio, dos pares de amarillas destellando a los lados, la barra de parada roja cruzando y la fila de rojas de entrada a la pista corriendo a 0,6 m del eje. Señal patrón A2. Ojo: las dos líneas continuas van del lado de espera, nunca mirando a la pista.",
        },
        puntos: [
          {
            x: 0,
            y: 0,
            que: "Eje verde",
            significa: "Es el camino autorizado.",
            piloto: "Si lo pierdes, estás fuera de la calle.",
          },
          {
            x: 0,
            y: 0,
            que: "Borde azul",
            significa: "Es hasta dónde llega el pavimento.",
            piloto: "Si lo cruzas, el tren se va al pasto.",
          },
          {
            x: 0,
            y: 0,
            que: "Tres amarillas atravesadas",
            significa: "Punto de espera intermedio.",
            piloto: "Ahí paras aunque no haya pista delante.",
          },
          {
            x: 0,
            y: 0,
            que: "Amarillas destellando a los lados",
            significa: "Luces de protección de pista.",
            piloto: "La pista está a un paso.",
          },
          {
            x: 0,
            y: 0,
            que: "Barra roja",
            significa: "Barra de parada.",
            piloto: "No se cruza encendida, ni con autorización.",
          },
          {
            x: 0,
            y: 0,
            que: "Rojas en línea hacia la pista",
            significa: "Luces de entrada a la pista: hay tráfico en la pista o llegando.",
            piloto: "No sustituyen la autorización del control.",
          },
        ],
      },
      {
        kind: "hueco",
        rotulo: "AP-14-07 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "Planta de un extremo de pista con una calle entrando por el costado. Arriba la pista, abajo la calle. Luces de entrada a la pista: rojas fijas empotradas a 0,6 m del eje de la calle, al menos 5 elementos separados entre 3,8 m y 15,2 m, más una luz dentro de la pista a 0,6 m de su eje. Luces de espera de despegue: dos filas rojas en pares a 1,8 m a cada lado del eje de pista, desde 115 m del comienzo y cada 30 m durante 450 m como mínimo. Rótulos con las cotas en metros. Ojo: nada de cifras en pies ni figuras calcadas de la OACI.",
        alto: 320,
      },
      {
        kind: "p",
        text: "Verde es el eje y azul es el borde. El amarillo advierte y el rojo detiene. Desde finales de 2025 casi todo este alumbrado se exige con RVR por debajo de 300 m, no de 350 m: tu aeropuerto pudo cambiarlo hace poco.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En carrera de aterrizaje",
        situacion:
          "Acabas de aterrizar de noche. Mientras frenas, ves aparecer a tu derecha tres juegos de luces amarillas empotradas en la pista, separados entre sí, y el último queda cerca de una salida.",
        pregunta: "¿Qué te están contando esas luces amarillas?",
        respuesta:
          "Son luces indicadoras de calle de salida rápida. Cada juego es una cuenta regresiva de 100 m hasta la salida rápida, que está del mismo lado. Te dejan dosificar el frenado sin adivinar la distancia. No son una autorización para salir: eso lo sigue dando el control.",
        claves: [
          "Cada juego marca 100 m menos hasta la salida.",
          "Van siempre del mismo lado del eje que la calle de salida rápida.",
          "No sustituyen la autorización del control.",
        ],
        hueco: {
          id: "AP-14-08",
          medida: "Ilustración de escena · 16:9 · 1600×900",
          descripcion:
            "Desde la cabina, de noche, en carrera de aterrizaje a 400 m de una salida rápida que se abre a la derecha. Tres juegos de amarillas fijas empotradas del mismo lado del eje que la salida, con 2 m entre luces del juego y 2 m del eje, los juegos cada 100 m y el más cercano a 60 m del punto de tangencia. Eje blanco al centro, bordes blancos y, al fondo, el arranque de la salida con su eje verde y amarillo. Sin verificar cuántas luces lleva cada juego: dibujar tres y revisar antes de publicar. Ojo: ninguna amarilla igual al otro lado del eje.",
        },
      },
    ],
  },

  // ── 15 ──────────────────────────────────────────────────────────────────
  {
    n: 15,
    title: "Aproximación visual",
    kicker: "Las luces que te ponen en la senda antes de ver la pista",
    minutes: 10,
    blocks: [
      {
        kind: "hueco",
        rotulo: "AP-15-01 · Ilustración de escena · 16:9 · 1600×900",
        descripcion:
          "Desde el aire, a 400 ft y 1,5 NM del umbral, algo alto respecto de la senda, de noche, con el sistema de aproximación al centro y la pista abriéndose detrás. Eje de 900 m con luces cada 30 m en blanco variable, dos barras transversales a 150 m y a 300 m, las dos filas laterales rojas de los 270 m más cercanos al umbral, la fila verde del umbral y el PAPI a la izquierda con tres blancas y una roja. Ojo: el PAPI no va a la derecha sin justificación.",
        alto: 320,
      },
      {
        kind: "p",
        text: "Antes de ver la pista ves su aproximación. De ahí sacas dos cosas: dónde está el umbral y si vienes alto o bajo.",
      },
      {
        kind: "hueco",
        rotulo: "AP-15-02 · Fotografía real · 16:9 · 1600×900",
        descripcion:
          "Desde el asiento izquierdo, de noche, a 600 ft y alineado con el eje, con el sistema de aproximación delante y la pista al fondo. Las cuatro cajas del PAPI a la izquierda, nítidas y separadas 9 m con tolerancia de 1 m, la más interna a 15 m del borde de pista, con las dos internas rojas y las dos externas blancas. Detrás, la fila de eje de aproximación y la fila verde del umbral. Ojo: el PAPI nunca destella ni lleva tres cajas.",
        alto: 320,
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Los tres sistemas de aproximación",
            hueco: {
              id: "AP-15-03",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Tres bandas apiladas a la misma escala, con el umbral alineado a la derecha y una cinta de cotas común. Sencillo: eje de 420 m como mínimo, luces cada 60 m (puede bajar a 30 m) y barra transversal a 300 m. Categoría I: eje de 900 m cada 30 m, barra a 300 m y barras adicionales a 150, 450, 600 y 750 m. Categorías II y III: eje de 900 m cada 30 m, filas laterales rojas de 270 m y barras a 150 m y a 300 m. Sin verificar el color del sencillo: la norma solo pide que sea fácilmente distinguible; dibujarlo blanco. Ojo: nada de cifras en pies ni figuras calcadas de la OACI.",
            },
            puntos: [
              "El sencillo llega a 420 m del umbral; los de precisión, a 900 m. El de categorías II y III añade dos filas rojas laterales.",
            ],
          },
          {
            titulo: "PAPI",
            hueco: {
              id: "AP-15-04",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Cinco filas, cada una con las cuatro cajas vistas de frente y el avión en perfil sobre una senda punteada: cuatro blancas, una roja y tres blancas, dos y dos, tres rojas y una blanca, cuatro rojas, con las rojas siempre del lado de la pista. Para una senda de 3 grados: 3°30′, 3°10′, 2°50′ y 2°30′, separación 9 m con tolerancia de 1 m. Abajo, el abreviado de dos cajas con sus tres lecturas, 3°15′ y 2°45′, separación 6 m. Rótulos «muy alto», «alto», «en senda», «bajo», «muy bajo» y «PAPI abreviado (APAPI)». Ojo: en el PAPI no existe el ámbar ni el verde.",
            },
            puntos: [
              "Cuatro cajas a la izquierda. Dos rojas y dos blancas es senda. Más blanco, más alto; más rojo, más bajo. El abreviado usa dos cajas.",
            ],
          },
          {
            titulo: "Las otras tres",
            hueco: {
              id: "AP-15-05",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Un solo dibujo en planta con la pista abajo a la derecha y el área de aproximación ocupando el resto. Luces de identificación de umbral: dos destellos blancos de 60 a 120 por minuto, simétricos, en línea con el umbral y a unos 10 m por fuera de cada fila de borde. Sistema de luces de entrada a la pista: grupos de al menos 3 destellos blancos en secuencia hacia la pista, con los grupos a 1 600 m como máximo entre sí. Y un par de luces de guía para el circuito, del lado con viento en cola. Ojo: la sigla REIL no va en el dibujo, que es de la FAA.",
            },
            puntos: [
              "Destellos blancos a los lados del umbral lo hacen visible. Grupos de destellos te guían cuando el terreno obliga a entrar torcido. Y hay luces para el circuito.",
            ],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Un sistema de categorías II y III visto en final",
        hueco: {
          id: "AP-15-06",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "Desde la cabina, de noche, a 300 ft y alineado, con todo el sistema delante y la pista empezando al fondo. Fila central de eje de 900 m cada 30 m en blanco variable, las dos filas laterales rojas de los 270 m más cercanos al umbral, la barra transversal de 300 m (15 m a cada lado del eje, luces cada 2,7 m como máximo) más ancha que la de 150 m, la fila verde del umbral, el PAPI a la izquierda y los destellos secuenciales captados con arrastre. Ojo: ninguna carta de aproximación ni pantalla de cabina legible en el cuadro.",
        },
        puntos: [
          {
            x: 0,
            y: 0,
            que: "Fila central de luces blancas",
            significa: "Es el eje prolongado de la pista.",
            piloto: "Si la ves torcida, estás descentrado.",
          },
          {
            x: 0,
            y: 0,
            que: "Filas laterales rojas",
            significa: "Solo existen en los últimos 270 m antes del umbral.",
            piloto: "Si las ves, el umbral está muy cerca.",
          },
          {
            x: 0,
            y: 0,
            que: "Barra transversal ancha",
            significa: "Está a 300 m del umbral.",
            piloto: "Te da un horizonte artificial y una referencia de distancia.",
          },
          {
            x: 0,
            y: 0,
            que: "Destellos corriendo hacia la pista",
            significa: "Dos por segundo.",
            piloto: "Sirven para encontrar el sistema, no para volar la senda.",
          },
          {
            x: 0,
            y: 0,
            que: "Fila verde",
            significa: "El umbral.",
            piloto: "Desde ahí cuenta tu pista disponible.",
          },
        ],
      },
      {
        kind: "p",
        text: "Los destellos secuenciales corren hacia el umbral dos veces por segundo: sirven para encontrar el sistema, no para volar la senda. La senda la da el indicador de pendiente, y detrás de cada uno hay una superficie libre de obstáculos.",
      },
      {
        kind: "hueco",
        rotulo: "AP-15-07 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "Cuadro partido en dos. Arriba, los cuatro indicadores de pendiente normalizados con su lectura en senda: PAPI de cuatro cajas, APAPI de dos, T-VASIS de 20 elementos y AT-VASIS de 10, los dos últimos con la marca «en retiro desde 2020». Abajo, los tres sistemas de aproximación con sus longitudes rotuladas «420 m», «900 m» y «900 m». Ojo: no dibujar el VASI de barras, el tricolor ni el pulsante, que no son de la OACI.",
        alto: 320,
      },
      {
        kind: "piensaComoPiloto",
        momento: "En el briefing de aproximación",
        situacion:
          "Vuelas a un aeropuerto donde levantaron una grúa a un costado de la aproximación. El PAPI sigue publicado, pero el NOTAM dice que está fuera de servicio, y el resto de las luces funciona.",
        pregunta: "¿Por qué apagarían el PAPI si la grúa no está en la pista?",
        respuesta:
          "Porque cada indicador de pendiente tiene detrás una superficie que debe quedar libre. Si un objeto la penetra, la salida no es dejar el sistema encendido: hay que quitar el objeto, subir la pendiente, recortar el sector, correr el sistema pista adentro o apagarlo. Un PAPI encendido con un obstáculo dentro de su superficie te llevaría en senda contra la grúa.",
        claves: [
          "Detrás del indicador hay una superficie de protección contra obstáculos.",
          "Si algo la penetra, se corrige el obstáculo o se corrige el sistema.",
          "Un indicador en servicio con la superficie penetrada te guía contra el objeto.",
        ],
        hueco: {
          id: "AP-15-08",
          medida: "Ilustración técnica · 16:9 · 1600×900",
          descripcion:
            "Perfil arriba y planta abajo. En el perfil: la pista, el indicador de pendiente, la senda y la superficie de protección arrancando 30 m por delante del sistema en pista visual de clave 1 y 60 m en los demás casos, con una grúa atravesándola, marcada. En la planta: el borde interno acotado (60, 80, 150 o 300 m según la pista) y los lados divergiendo 10 % en visual y 15 % en instrumental, hasta 7 500 m o 15 000 m. Rótulos «superficie de protección contra obstáculos», «borde interno», «10 % / 15 %» y «objeto que la penetra». Ojo: no mezclar aquí las superficies limitadoras de obstáculos del aeródromo.",
        },
      },
    ],
  },

  // ── 16 ──────────────────────────────────────────────────────────────────
  {
    n: 16,
    title: "Faros y obstáculos",
    kicker: "Lo que se enciende para que lo encuentres y lo que se enciende para que no lo golpees",
    minutes: 8,
    blocks: [
      {
        kind: "hueco",
        rotulo: "AP-16-01 · Ilustración de escena · 16:9 · 1600×900",
        descripcion:
          "Noche, plano general desde el suelo a media distancia y cielo limpio. A la izquierda, la torre del faro de aeródromo girando, con un destello verde saliendo hacia la cámara, a 20 a 30 destellos por minuto alternados con blanco. A la derecha y al fondo, una torre alta con al menos tres niveles de luces rojas de destellos de mediana intensidad tipo B, de 20 a 60 por minuto. Entre las dos, la silueta del aeródromo con sus luces de pista. Ojo: el faro de doble destello blanco no es de la OACI.",
        alto: 320,
      },
      {
        kind: "p",
        text: "Hay luces que existen para que veas el aeropuerto y luces que existen para que veas lo que no debes tocar.",
      },
      {
        kind: "hueco",
        rotulo: "AP-16-02 · Fotografía real · 16:9 · 1600×900",
        descripcion:
          "De noche, ángulo bajo al pie de la torre del faro o a media distancia, con el faro en el tercio izquierdo y el cielo ocupando el resto. La lámpara encendida en verde, el haz saliendo hacia arriba y, al fondo desenfocadas, las luces del aeródromo. De 20 a 30 destellos por minuto, 2 000 cd como mínimo, verde en aeródromo terrestre alternando con blanco. Ojo: el amarillo es de hidroaeródromo, no de un aeropuerto en tierra.",
        alto: 320,
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Faro de aeródromo",
            puntos: [
              "Gira y destella de 20 a 30 veces por minuto: verde y blanco en tierra, amarillo y blanco en agua. El faro de identificación manda Morse.",
            ],
          },
          {
            titulo: "Luces de obstáculo",
            hueco: {
              id: "AP-16-03",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Tabla visual de tres bloques: baja intensidad (A roja fija 10 cd; B roja fija 32 cd; C amarilla o azul de destellos 60 a 90 por minuto, 40 cd; D amarilla de destellos 200 cd; E roja de destellos 32 cd), mediana (A blanca de destellos 20 a 60 por minuto, 20 000 cd de día y 2 000 de noche; B roja de destellos 2 000 cd; C roja fija 2 000 cd) y alta (A blanca de destellos 40 a 60 por minuto, 200 000 cd de día; B igual, 100 000 cd). Cada fila con su círculo de color y su icono de fija o de destello. Ojo: nada de designaciones L-810, L-864, L-865, L-856 ni L-857, que son de la FAA.",
            },
            puntos: [
              "Tres intensidades. Las bajas son rojas fijas, salvo las de vehículos. Las medias y las altas son el estrobo blanco de día y el rojo de noche.",
            ],
          },
        ],
      },
      { kind: "sub", text: "Dos casos se reconocen solos" },
      {
        kind: "fichas",
        columnas: 1,
        items: [
          {
            titulo: "Parque eólico",
            hueco: {
              id: "AP-16-04",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "De noche, desde el suelo a media distancia o desde el aire, con al menos seis aerogeneradores en el cuadro y las luces rojas de las barquillas encendidas al mismo tiempo, porque el parque se trata como un objeto extenso y su perímetro destella simultáneo. En las turbinas de 150 m a 315 m, además, un nivel intermedio a la mitad de la altura de la barquilla con al menos 3 luces de baja intensidad tipo E, rojas de destellos, al mismo régimen. Álabes, barquilla y los dos tercios superiores del mástil en blanco. Ojo: ninguna turbina destellando desfasada de las demás.",
            },
            puntos: ["Un parque eólico destella todo a la vez."],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Una torre de línea eléctrica con balizas",
        intro:
          "Destella en orden fijo: medio, arriba y abajo. Lo peligroso no es la torre, es el cable que cuelga.",
        hueco: {
          id: "AP-16-05",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "Atardecer con luz suficiente para ver las esferas y las luces ya encendidas, cámara desde el suelo a media distancia, con la torre completa y el cable cruzando hacia otra torre al fondo. Tres niveles de luces blancas de alta intensidad tipo B, de 40 a 60 destellos por minuto y 100 000 cd de día: cima, mitad y altura del punto más bajo de la catenaria, destellando primero la del medio, después la superior y al final la inferior. Esferas de 60 cm como mínimo, un color cada una, alternando blanco con rojo o anaranjado, separadas 30 m como máximo. Ojo: en estos tres niveles no van luces rojas.",
        },
        puntos: [
          {
            x: 0,
            y: 0,
            que: "Luz blanca de la cima",
            significa: "Marca el punto más alto de la estructura.",
            piloto: "Es lo último que libras si vuelas por encima.",
          },
          {
            x: 0,
            y: 0,
            que: "Luz blanca del nivel medio",
            significa: "Es la que destella primero.",
            piloto: "Si captas el orden, sabes que estás mirando una línea eléctrica.",
          },
          {
            x: 0,
            y: 0,
            que: "Luz blanca del nivel bajo",
            significa: "Está a la altura del punto más bajo del cable.",
            piloto: "Por debajo de ella hay cable, no aire libre.",
          },
          {
            x: 0,
            y: 0,
            que: "Esferas en el cable",
            significa: "Hacen visible de día lo que de noche no se ve.",
            piloto: "Su separación depende del diámetro.",
          },
          {
            x: 0,
            y: 0,
            que: "La catenaria entre torres",
            significa: "Es el obstáculo real.",
            piloto: "Las torres se ven, el cable no.",
          },
        ],
      },
      {
        kind: "hueco",
        rotulo: "AP-16-06 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "Dos franjas. Arriba, la secuencia verde, blanco, verde, blanco del faro sobre una línea de tiempo de un minuto, con el contador «20 a 30 destellos por minuto» y, en un recuadro, el faro de identificación mandando Morse a 6 u 8 palabras por minuto. Abajo, una torre tipo con sus niveles acotados: cada 105 m como máximo con mediana intensidad tipo A y cima de más de 105 m; cada 52 m como máximo con tipo B alternando con baja tipo B, o con tipo C. Ojo: nada de designaciones de la FAA ni cifras en pies.",
        alto: 320,
      },
      {
        kind: "p",
        text: "En tierra, azul es emergencia y amarillo es servicio.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Rodando de noche hacia el puesto",
        situacion:
          "Rodando de noche hacia el puesto, ves dos luces destellando cruzando tu ruta: una azul y una amarilla. Las dos van hacia el mismo punto de la plataforma.",
        pregunta: "¿Cuál de las dos te obliga a prestar más atención y por qué?",
        respuesta:
          "La azul. El azul destellante identifica un vehículo de emergencia o de seguridad, y si va en movimiento hacia la plataforma es probable que esté atendiendo algo. El amarillo destellante es un vehículo de servicio normal. Y si el amarillo es más potente y va delante de ti, es el vehículo guía.",
        claves: [
          "Azul de destellos: emergencia o seguridad.",
          "Amarillo de destellos: vehículo de servicio.",
          "El amarillo más potente que va delante de ti es el vehículo guía.",
        ],
        hueco: {
          id: "AP-16-07",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "De noche, desde la cabina o desde el borde de la plataforma, con dos vehículos en el cuadro: uno de emergencia con baliza azul y uno de servicio con baliza amarilla, los dos con luz de baja intensidad tipo C de 60 a 90 destellos por minuto y 40 cd. Al fondo, el vehículo guía con su tipo D amarilla de 200 cd, más potente. Pavimento iluminado por proyectores y, si entran en cuadro, las luces rojas fijas de una pasarela de embarque. Ojo: nada de luces rojas y azules de patrulla, que no son de aviación.",
        },
      },
    ],
  },

  // ── 17 ──────────────────────────────────────────────────────────────────
  {
    n: 17,
    title: "Cuando se apaga",
    kicker: "Cuántas luces pueden faltar antes de que la pista deje de servir",
    minutes: 7,
    blocks: [
      {
        kind: "hueco",
        rotulo: "AP-17-01 · Ilustración de escena · 16:9 · 1600×900",
        descripcion:
          "Noche, vista baja y frontal de una pista, con las dos filas de borde blancas perdiéndose al fondo con separación uniforme (dibujar 60 m) y la línea de eje completa. En la fila derecha, un hueco oscuro de dos luces seguidas que rompe la simetría y hace que esa fila se lea torcida. Ojo: dos luces contiguas apagadas no se permiten en ningún nivel de servicio, y ese es justo el problema que la imagen enseña.",
        alto: 320,
      },
      {
        kind: "p",
        text: "Ninguna instalación tiene todas las luces encendidas siempre. La norma dice cuántas pueden faltar y en cuánto tiempo tienen que volver.",
      },
      {
        kind: "hueco",
        rotulo: "AP-17-02 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "A todo el ancho. A la izquierda, el camino de la energía: red pública, tablero, llave de transferencia, grupo electrógeno y circuito de pista. A la derecha, una gráfica de intensidad contra tiempo con el momento de la falla marcado, la línea horizontal del 50 % de intensidad y el tramo de la curva que queda por debajo, acotado: eso es el tiempo de conmutación, medido en una dirección dada y con la luz operando al 25 % de intensidad o más. Rótulos «fuente primaria», «fuente secundaria», «50 % de intensidad» y «tiempo de conmutación». Ojo: las cifras por tipo de pista no van aquí.",
        alto: 320,
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Tiempo de conmutación",
            hueco: {
              id: "AP-17-03",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Matriz visual: cinco filas con los casos de pista (vuelo visual, aproximación que no es de precisión, precisión CAT I, precisión CAT II/III y despegue con RVR menor de 800 m) y una columna por sistema de luces. Cada celda, un chip con «1 s», «15 s» o un guion. Al pie, la leyenda con las dos excepciones: «terreno peligroso o escarpado: 1 s» y «sin luces de eje: 1 s». Ojo: la fila de pista visual no lleva cifra inventada, porque la norma solo pide que el intervalo sea lo más corto posible.",
            },
            puntos: [
              "No es lo que tarda el generador: es el tiempo que la luz pasa bajo la mitad de su intensidad al cambiar de fuente. En categoría I casi todo tarda 15 segundos; en categorías II y III casi todo vuelve en 1, pero el borde puede tardar 15.",
            ],
          },
          {
            titulo: "Niveles de mantenimiento",
            hueco: {
              id: "AP-17-04",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Planta de una pista con su sistema de aproximación, por zonas coloreadas con su porcentaje para categorías II y III: 95 % en los 450 m interiores del sistema, en el eje de pista, en el umbral y en el borde; 90 % en la zona de toma de contacto; 85 % en el sistema más allá de 450 m; 75 % en el extremo. Una tira aparte, rotulada categoría I, con 85 % en sus cuatro elementos. Al costado, la regla de adyacencia: una apagada aislada con un visto y dos seguidas con una equis. Ojo: no dibujar apagadas en pares fuera de esa tira.",
            },
            puntos: [
              "Una luz está fuera de servicio cuando su haz principal baja del 50 %. En categoría I debe servir el 85 % de cada sistema; en categorías II y III la exigencia sube hasta el 95 %.",
            ],
          },
        ],
      },
      { kind: "sub", text: "Los tiempos por tipo de pista" },
      {
        kind: "table",
        head: ["Caso de pista", "Vuelven en 1 segundo", "Pueden tardar 15 segundos"],
        rows: [
          [
            "Vuelo visual",
            "Sin cifra: el intervalo debe ser lo más corto posible",
            "Puede resolverse con alumbrado de emergencia desplegable en 15 minutos",
          ],
          [
            "Aproximación que no es de precisión",
            "Nada",
            "Sistema de aproximación, indicador de pendiente, borde, umbral, extremo y obstáculos",
          ],
          [
            "Precisión categoría I",
            "Indicador de pendiente, borde y umbral, solo si la aproximación se hace sobre terreno peligroso o escarpado",
            "Todo lo demás",
          ],
          [
            "Precisión categorías II y III",
            "Los 300 m interiores del sistema de aproximación, umbral, extremo, eje de pista, zona de toma de contacto y todas las barras de parada",
            "Resto del sistema de aproximación, borde de pista, calle de rodaje esencial y obstáculos",
          ],
          [
            "Despegue con RVR menor de 800 m",
            "Extremo, eje y barras de parada",
            "Borde de pista (1 s si no hay luces de eje), calle de rodaje esencial y obstáculos",
          ],
        ],
      },
      {
        kind: "reconoce",
        titulo: "Una fila de borde con luces faltando",
        hueco: {
          id: "AP-17-05",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "De noche, desde el borde de la pista o desde un vehículo detenido, ángulo bajo, mirando a lo largo de una fila de borde que se pierde al fondo y se lee como una línea de puntos. Blancas, separación uniforme de 60 m como máximo en pista por instrumentos. En la fila: una luz apagada aislada, dos apagadas seguidas en otro tramo y una encendida pero claramente más débil que sus vecinas, que ya puede estar fuera de servicio si su haz principal cayó del 50 %. Al costado, la línea de eje completa. Ojo: nada de montaje digital evidente ni colores distintos en la misma fila.",
        },
        puntos: [
          {
            x: 0,
            y: 0,
            que: "Una luz apagada aislada",
            significa: "Cabe dentro del porcentaje permitido.",
            piloto: "No rompe el patrón y la fila se sigue leyendo derecha.",
          },
          {
            x: 0,
            y: 0,
            que: "Dos apagadas seguidas",
            significa: "Está prohibido en todos los niveles de servicio.",
            piloto: "Abre un hueco que se puede leer como una curva del borde.",
          },
          {
            x: 0,
            y: 0,
            que: "Una luz más débil que las vecinas",
            significa:
              "Si su haz principal cayó del 50 %, cuenta como fuera de servicio aunque esté encendida.",
            piloto: "El conteo no se hace a ojo.",
          },
          {
            x: 0,
            y: 0,
            que: "La línea de eje completa",
            significa: "Es la que más exigencia tiene en categorías II y III.",
            piloto: "Si le faltan luces, la operación baja de categoría antes que por el borde.",
          },
        ],
      },
      {
        kind: "p",
        text: "Hay una regla que manda sobre los porcentajes: nunca dos luces contiguas apagadas. Dos apagadas seguidas abren un hueco en el patrón, y un hueco se lee como una curva o como el borde de la pista donde no lo hay.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En corta final de categoría III",
        situacion:
          "Estás en corta final en categoría III. Se va la energía del aeropuerto. Ves que el eje, la zona de toma de contacto y el umbral siguen encendidos, pero las dos filas de borde se apagaron.",
        pregunta: "¿Es normal eso o es una falla del aeropuerto?",
        respuesta:
          "Está dentro de norma. En categorías II y III el eje, la zona de toma de contacto, el umbral, el extremo y las barras de parada tienen que volver en 1 segundo, pero el borde de la pista puede tardar hasta 15. Por eso puede parecer que se apagó media pista sin que nadie haya incumplido nada. Lo que sí decide si sigues es el aviso que el sistema de vigilancia le manda al control cuando el nivel de servicio cae por debajo del mínimo.",
        claves: [
          "En 1 segundo: eje, zona de toma de contacto, umbral, extremo y barras de parada.",
          "Hasta 15 segundos: borde de pista, resto del sistema de aproximación, calle esencial y obstáculos.",
          "Lo que decide es el aviso al control cuando cae el nivel de servicio.",
        ],
        hueco: {
          id: "AP-17-06",
          medida: "Ilustración de escena · 16:9 · 1600×900",
          descripcion:
            "Desde la cabina, de noche y con niebla densa que reduce la escena a las luces, en corta final de categoría III, en el instante siguiente a una falla de energía. Encendidos: el eje de pista, las barretas de zona de toma de contacto, la fila de umbral y los 300 m interiores del sistema de aproximación. Apagados: las dos filas de borde y el tramo exterior del sistema de aproximación. Ojo: no dibujar la pista entera a oscuras, porque esto es una conmutación y no un apagón.",
        },
      },
    ],
  },
]
