/**
 * Nivel 1 · Cómo se lee un aeropuerto (lecciones 01 a 04).
 *
 * Primero se le pone nombre a cada pedazo de asfalto y de pasto, porque el
 * resto del nivel no hace más que nombrarlos: dónde se publican esos nombres,
 * qué cuatro cifras se miden sobre la misma pista y qué avión cabe aquí.
 *
 * Los huecos llevan su código (AP-LL-NN) porque es el que Camilo usa para
 * nombrar la imagen cuando la genera. La ficha completa de cada uno está en
 * docs/BRIEF_AEROPUERTOS.md.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const NIVEL_1: DocScreen[] = [
  // ── 01 ──────────────────────────────────────────────────────────────────
  {
    n: 1,
    title: "De qué está hecho un aeropuerto",
    kicker: "Cada pedazo de asfalto y de pasto tiene nombre, y el nombre trae obligación",
    minutes: 8,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-01-01-aerodromo.webp",
        alt: "Vista aérea oblicua de un aeródromo con flechas que señalan la pista, la calle de rodaje, la plataforma y la torre de control",
        ancho: 1600,
        alto: 900,
        pie: "La pista concentra despegues y aterrizajes; las calles conectan sus accesos; la plataforma organiza estacionamiento y servicio; la torre controla el movimiento cuando presta ese servicio. Reconocer las cuatro áreas permite anticipar qué autorización y qué señalización corresponden en cada una.",
      },
      {
        kind: "hueco",
        rotulo: "AP-01-02 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "Planta cenital con todo lo que nombra la lección, acotado y rotulado: franja (60 m antes del umbral, 150 m a cada lado del eje), RESA (90 m mínimo, 240 m recomendado), zona libre de obstáculos (75 m a cada lado, 1,25 %), zona de parada con galones, calle de salida rápida (30°, radio 550 m) y puntos de espera en patrón A2. Ojo: las dos continuas del A2 van del lado de espera, nunca mirando a la pista, y no se calca ninguna figura de la OACI.",
        alto: 340,
      },
      {
        kind: "p",
        text: "Un aeropuerto es un conjunto de áreas con nombre propio, y cada nombre cambia lo que el piloto puede hacer. En un despegue rechazado, por ejemplo, la zona de parada puede estar incluida en la ASDA para detener el avión, pero eso no la convierte en pista disponible para rodar o aterrizar. Reconocer la superficie evita sumar metros que no existen en el cálculo y ayuda a entender por qué un área despejada no siempre es pavimento utilizable.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Franja de pista",
            hueco: {
              id: "AP-01-03",
              medida: "Fotografía · 4:3 · 1200×900",
              descripcion:
                "Desde el borde de la pista hacia afuera, a la altura de los ojos: el borde del pavimento con su señal blanca, la transición enrasada sin escalón y el terreno nivelado y uniforme que sigue. Al fondo, como único objeto, una luz de borde o una ayuda visual frangible. Ojo: ni vehículos, ni conos, ni vallas, ni postes rígidos dentro de la franja.",
            },
            puntos: ["Envuelve la pista desde 60 m antes del umbral."],
          },
          {
            titulo: "Área de seguridad de extremo (RESA)",
            hueco: {
              id: "AP-01-04",
              medida: "Fotografía · 4:3 · 1200×900",
              descripcion:
                "Desde un dron, mirando el extremo de la pista en el sentido del despegue: el pavimento en el tercio inferior y, más allá, el terreno despejado y preparado, al menos el doble de ancho que la pista, hasta su final visible. Misma hora y misma luz que la foto de la franja. Ojo: nada de antenas, edificios ni carreteras dentro del área, y nunca la sigla «RSA», que no es de la OACI.",
            },
            puntos: ["Empieza donde termina la franja."],
          },
          {
            titulo: "Zona de parada",
            hueco: {
              id: "AP-01-05",
              medida: "Fotografía · 4:3 · 1200×900",
              descripcion:
                "Desde un dron algo oblicuo sobre el extremo de la pista: el pavimento continúa con exactamente la misma anchura de la pista y lleva galones amarillos a 45 grados, de 0,9 m o más de trazo y separados 30 m, con la punta hacia la pista. Ojo: ningún avión rodando sobre los galones y ninguna flecha blanca, que esa es la señal de umbral desplazado.",
            },
            puntos: ["Pavimento del ancho de la pista. Suma a la ASDA."],
          },
          {
            titulo: "Zona libre de obstáculos",
            hueco: {
              id: "AP-01-06",
              medida: "Fotografía · 4:3 · 1200×900",
              descripcion:
                "Desde un dron sobre el extremo de la pista, mirando hacia afuera: el pavimento apenas asoma abajo y el resto es terreno abierto o agua, sin un solo objeto que sobresalga, con los límites laterales visibles. Llega a 75 m a cada lado del eje prolongado y nada supera el plano del 1,25 %. Ojo: ni pavimento ni galones aquí, que eso es la zona de parada y arruina la comparación.",
            },
            puntos: ["No es pavimento: es aire. Suma a la TODA."],
          },
        ],
      },
      {
        kind: "definicion",
        text: "La zona de parada es pavimento; la zona libre, aire.",
      },
      {
        kind: "reconoce",
        titulo: "Lo que ves al entrar a la pista",
        hueco: {
          id: "AP-01-07",
          medida: "Fotografía · 16:9 · 1600×900",
          descripcion:
            "Desde el puesto del piloto, rodando hacia la pista y deteniéndose en el punto de espera: la señal en patrón A2 cruzando la calle (cuatro líneas de 0,30 m y tres espacios de 0,30 m, 2,10 m en total), el letrero blanco sobre rojo a los dos lados, el eje amarillo interrumpido en la señal, la pista al frente y una salida rápida. Ojo: las dos continuas quedan de tu lado y las de trazos miran a la pista, nunca al revés.",
        },
        puntos: [
          {
            x: 0,
            y: 0,
            que: "Salida rápida",
            significa: "Sale de la pista en ángulo agudo.",
            piloto: "Libera la pista antes.",
          },
          {
            x: 0,
            y: 0,
            que: "Punto de espera A2",
            significa: "Las continuas están de tu lado.",
            piloto: "Ahí paras.",
          },
          {
            x: 0,
            y: 0,
            que: "Letrero de designación",
            significa: "Blanco sobre rojo.",
            piloto: "Qué pista tienes.",
          },
          {
            x: 0,
            y: 0,
            que: "Franja",
            significa: "Terreno enrasado junto al pavimento.",
            piloto: "No ruedes ahí.",
          },
          {
            x: 0,
            y: 0,
            que: "Puesto de estacionamiento",
            significa: "Separación por letra de clave.",
            piloto: "Te guían.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Pasado el extremo de la pista",
        situacion: "Pasado el extremo ves 200 m de pavimento con galones amarillos.",
        pregunta: "¿Cuentas con ellos para frenar?",
        respuesta: "No. Es zona de parada: suma a la ASDA, no a la LDA.",
        claves: [
          "Tiene la misma anchura que la pista y aguanta el avión en un despegue abortado.",
          "Los galones dicen que ese pavimento no se usa para rodar ni para aterrizar.",
          "La cifra que te sirve al aterrizar es la LDA, y esos 200 m no están dentro.",
        ],
        hueco: {
          id: "AP-01-05",
          medida: "Fotografía · 4:3 · 1200×900",
          descripcion:
            "La misma foto de la ficha «Zona de parada»: el pavimento que sigue al extremo, del ancho de la pista, con los galones amarillos a 45 grados apuntando hacia la pista. Ojo: ningún avión rodando sobre los galones, y las flechas blancas no caben aquí porque esas son de umbral desplazado.",
        },
      },
    ],
  },

  // ── 02 ──────────────────────────────────────────────────────────────────
  // Las ocho imágenes de esta lección se redibujan desde cero con los datos
  // publicados del AIP: el dato es un hecho, el dibujo es obra de alguien. Por
  // eso cada hueco repite la prohibición en su descripción, que es donde la lee
  // quien genera la imagen. Nada de Jeppesen, nada de Lido, ninguna figura de
  // un documento de la OACI, y tampoco diagramas de aeropuerto de la FAA.
  {
    n: 2,
    title: "La carta y el AIP",
    kicker: "Seis cartas, veinticuatro casillas y un círculo que te está avisando",
    minutes: 10,
    blocks: [
      {
        kind: "hueco",
        rotulo: "AP-02-01 · Ilustración de escena · 16:9 · 1600×900",
        descripcion:
          "Mesa de cabina vista desde arriba en ángulo, con una tableta que muestra un plano de aeródromo dibujado por nosotros (pista, calles, plataforma) y dos o tres hojas con tablas genéricas al lado. Pavimento gris, señales de pista blancas, señales de calle amarillas. Ojo: no puede aparecer ninguna carta de Jeppesen ni de Lido, ni borrosa ni de refilón, ni ninguna figura de un documento de la OACI.",
        alto: 300,
      },
      {
        kind: "hueco",
        rotulo: "AP-02-02 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "Seis hojas en abanico, cada una reconocible: planta del aeródromo, área de rodaje con dos círculos de punto crítico, plataforma con puestos numerados, hoja partida en planta y perfil con el recuadro de las cuatro distancias, perfil de terreno con curvas de nivel y una pantalla con malla de datos. Debajo de cada hoja, su nombre. Ojo: las seis se dibujan desde cero, sin calcar ni recortar cartas de Jeppesen o de Lido ni figuras de la OACI.",
        alto: 340,
      },
      {
        kind: "p",
        text: "El aeródromo se publica en dos lugares que se complementan. La carta sirve para orientarse y seguir una ruta sin improvisar; la ficha AD 2 del AIP aporta dimensiones, resistencia, distancias, luces y procedimientos. Antes de rodar se estudian juntos: la línea de la carta puede llevarte a una intersección, pero la tabla publicada confirma si la distancia restante sirve para el peso y la configuración del día.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Carta de aeródromo",
            hueco: {
              id: "AP-02-03",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "La hoja completa de frente: planta con pista, designadores, calles y plataforma; nortes verdadero y magnético; escala lineal; tabla lateral con umbral, elevación, resistencia, dimensiones, distancias declaradas, RESA y franja; punto de referencia, frecuencias y pie de unidades. Ojo: se redibuja desde cero con datos genéricos, porque está prohibido recortar o calcar una carta de Jeppesen, de Lido o de un AIP.",
            },
            puntos: ["La principal: del puesto a la pista."],
          },
          {
            titulo: "Plano de movimientos en tierra",
            hueco: {
              id: "AP-02-04",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Recorte del área de rodaje: calles con designador, puntos de espera en patrón A2 en cada entrada a la pista, un punto de espera intermedio de una sola línea de trazos, dos círculos de punto crítico rotulados «HS 1» y «HS 2» y su tabla al pie. Ojo: dibujo propio, sin calcar cartas de Jeppesen ni de Lido ni diagramas de la FAA, y con las dos continuas del A2 del lado de espera.",
            },
            puntos: ["Cuando el rodaje no cabe en la anterior."],
          },
          {
            titulo: "Plano de estacionamiento y atraque",
            puntos: ["Puestos, guías y atraque."],
          },
          {
            titulo: "Carta de obstáculos tipo A",
            hueco: {
              id: "AP-02-05",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "La hoja partida en dos bandas alineadas por el eje: arriba el perfil, con el plano del 1,2 % saliendo del extremo de pista y dos o tres obstáculos que lo penetran, acotados; abajo la planta, con el área de trayectoria de despegue abriéndose desde 180 m a razón de 0,25 D. Retícula, escalas y el recuadro TORA, TODA, ASDA y LDA. Ojo: se redibuja entera, sin recortar ni calcar la carta tipo A de ningún AIP ni figuras de la OACI.",
            },
            puntos: ["Una por pista, con las distancias declaradas."],
          },
          {
            titulo: "Carta topográfica de precisión",
            puntos: ["Solo categorías II y III."],
          },
          {
            titulo: "Carta electrónica de terreno y obstáculos",
            puntos: ["Datos, no hoja."],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "La ficha AD 2 del AIP",
        hueco: {
          id: "AP-02-06",
          medida: "Ilustración técnica · 16:9 · 1600×900",
          descripcion:
            "Facsímil redibujado de una página del AIP, a dos idiomas, con cuatro bloques titulados en orden: características físicas de la pista, distancias declaradas, luces y procedimientos de vuelo. La tabla de distancias lleva TORA 3 800, TODA 4 100, ASDA 3 800 y LDA 3 800, y la celda de resistencia, PCR 980/F/C/X/T. Ojo: la página se dibuja desde cero; el dato es un hecho publicado, pero la maquetación del AIP no se fotografía ni se recorta.",
        },
        puntos: [
          {
            x: 0,
            y: 0,
            que: "AD 2.12",
            significa: "Características físicas y resistencia del pavimento.",
            piloto: "El código que cumples.",
          },
          {
            x: 0,
            y: 0,
            que: "AD 2.13",
            significa: "Distancias declaradas.",
            piloto: "Cuatro cifras por cabecera.",
          },
          {
            x: 0,
            y: 0,
            que: "AD 2.14",
            significa: "Luces de aproximación y de pista.",
            piloto: "Qué verás.",
          },
          {
            x: 0,
            y: 0,
            que: "AD 2.22",
            significa: "Procedimientos de vuelo.",
            piloto: "La baja visibilidad.",
          },
        ],
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Patrón A2",
            hueco: {
              id: "AP-02-07",
              medida: "Ilustración técnica · 4:3 · 1200×900",
              descripcion:
                "Recorte en planta de una carta redibujada: la calle llega a la pista, que entra por arriba, y la señal de punto de espera la cruza en patrón A2, cuatro líneas de 0,30 m con tres espacios de 0,30 m, 2,10 m acotados. Eje amarillo interrumpido y letrero blanco sobre rojo a los dos lados. Ojo: las de trazos arriba, del lado de la pista, y las continuas abajo; nada de A1, de B1 ni de calcos de cartas comerciales o de figuras de la OACI.",
            },
            puntos: ["El más cercano a la pista. Cuatro líneas de 0,30 m con tres espacios de 0,30 m."],
          },
          {
            titulo: "Patrón B2",
            hueco: {
              id: "AP-02-08",
              medida: "Ilustración técnica · 4:3 · 1200×900",
              descripcion:
                "Mismo encuadre y misma escala que el A2, pero con dos puntos de espera en la misma calle: el A2 pegado a la pista y el B2 más atrás, dibujado como escalera de dos líneas continuas de 0,30 m separadas 1,50 m y unidas por travesaños de 0,9 m cada 3,0 m, 2,10 m en total. Ojo: nada de A1, de B1 ni de la escalera de 0,6 m, y ningún calco de Jeppesen, de Lido ni de figuras de la OACI.",
            },
            puntos: ["El más alejado. Dos líneas continuas separadas 1,50 m, unidas por travesaños."],
          },
        ],
      },
      {
        kind: "definicion",
        text: "El A2 son cuatro líneas; el B2 es la escalera de más atrás.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En el briefing, antes de arrancar",
        situacion: "En la carta hay un círculo «HS 2» donde tu calle cruza otra.",
        pregunta: "¿Cuándo se revisa eso?",
        respuesta: "En el briefing, antes de arrancar. Rodando, los ojos van afuera.",
        claves: [
          "El círculo solo rodea la ubicación y le pone identificador: no explica nada por sí mismo.",
          "Lo que significa cada identificador está en la tabla de la misma hoja.",
          "Si el rodaje no cabe en la carta de aeródromo, esto se lee en el plano de movimientos en tierra.",
        ],
        hueco: {
          id: "AP-02-04",
          medida: "Ilustración técnica · 3:2 · 1200×800",
          descripcion:
            "El mismo plano de movimientos en tierra de la ficha: calles con designador, puntos de espera en patrón A2, el intermedio de una sola línea de trazos, los círculos «HS 1» y «HS 2» y la tabla de puntos críticos al pie. Ojo: dibujo propio, sin calcar ninguna carta comercial ni ningún diagrama de aeropuerto de la FAA.",
        },
      },
    ],
  },

  // ── 03 ──────────────────────────────────────────────────────────────────
  {
    n: 3,
    title: "Distancias declaradas",
    kicker: "Cuatro cifras sobre la misma pista, y ninguna mide lo mismo",
    minutes: 9,
    blocks: [
      {
        kind: "hueco",
        rotulo: "AP-03-01 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "Una pista en planta cenital, centrada y horizontal sobre fondo neutro, y encima cuatro barras de distinta longitud alineadas por su extremo izquierdo, en la misma proporción que tendrán en el diagrama maestro. Ojo: ninguna cifra, ninguna sigla y ningún nombre de aeropuerto en esta imagen, que la promesa es visual y las cuatro cifras llegan después.",
        alto: 300,
      },
      {
        kind: "hueco",
        rotulo: "AP-03-02 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "Planta cenital: la pista con designadores 14 y 32 y, a la derecha del extremo, la zona de parada (pavimento del mismo ancho, con galones) y la zona libre de obstáculos (rectángulo punteado, más ancho y más largo) dibujadas en el mismo tramo. Encima, las cuatro cotas apiladas con sus líneas de referencia; la de la LDA arranca en el umbral. Tabla de cuatro filas en la esquina. Ojo: la zona libre no pasa de media TORA, y del Anexo 14 no se calca nada.",
        alto: 340,
      },
      {
        kind: "p",
        text: "Sobre una sola pista conviven cuatro longitudes, publicadas por dirección porque un umbral desplazado, una zona de parada o una zona libre pueden afectar cada sentido de manera distinta. Si aceptas despegar desde una intersección, el avión no recupera el pavimento que dejó atrás: el cálculo se hace con la distancia publicada desde ese punto, no con la longitud total que recuerdas del aeropuerto.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "TODA",
            hueco: {
              id: "AP-03-03",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Recorte del extremo de pista, planta arriba y perfil abajo alineados: el rectángulo punteado con su cota de 75 m a cada lado del eje prolongado y, en el perfil, la línea de pendiente del 1,25 % con dos o tres árboles y un poste por debajo, ninguno tocándola. Una cota la limita a media TORA. Ojo: dentro del rectángulo no hay pavimento ni galones, que eso sería la zona de parada.",
            },
            puntos: ["Recorrido de despegue más la zona libre de obstáculos."],
          },
          {
            titulo: "ASDA",
            hueco: {
              id: "AP-03-04",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Mismo tratamiento que la ficha anterior: planta arriba, perfil abajo. El pavimento sigue al extremo de la pista con exactamente la misma anchura, con galones amarillos a 45 grados de 0,9 m o más separados 30 m, y una silueta de avión frenando encima. La cota de la ASDA por arriba. Ojo: ni más ancho ni más angosto que la pista, y ningún avión aterrizando, que la zona de parada no es para aterrizar.",
            },
            puntos: ["Recorrido de despegue más la zona de parada. La del abortado."],
          },
          {
            titulo: "LDA",
            hueco: {
              id: "AP-03-05",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Planta de la pista entera con las dos direcciones a la vez. En la cabecera izquierda, el umbral desplazado con su barra transversal y flechas blancas en el tramo anterior; arriba, la cota de la LDA arrancando en el umbral junto a la de la TORA, que arranca en el extremo. Abajo, la cota de la dirección contraria, entera. Ojo: los galones en ese tramo dirían que no se usa para nada, y la dirección recíproca no se recorta.",
            },
            puntos: ["Pista disponible para aterrizar. El umbral desplazado la recorta."],
          },
          {
            titulo: "Desde intersección",
            hueco: {
              id: "AP-03-06",
              medida: "Ilustración técnica · 16:9 · 1600×900",
              descripcion:
                "Planta de la pista con dos calles de entrada, una en cabecera y otra a un tercio. Dos cotas alineadas: TORA 3 800 m y, desde la intersección, 2 579 m; el tramo que se pierde, atenuado y rotulado. El punto de espera de esa entrada en patrón A2 y, ampliado, el letrero negro sobre amarillo con la cifra y la flecha. Ojo: calle con letra genérica, nunca un designador real, y ninguna cifra en pies.",
            },
            puntos: ["Pierdes lo que queda atrás. Va publicado y hay letrero."],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "El letrero de distancia de pista restante",
        hueco: {
          id: "AP-03-07",
          medida: "Fotografía · 16:9 · 1600×900",
          descripcion:
            "Desde el eje de la pista, a la altura de los ojos en cabina: un letrero blanco sobre negro completo y legible, otros dos iguales alejándose, la señal blanca de borde con el letrero claramente por fuera, las luces de borde y el eje discontinuo. Van cada 300 m, bajos y frangibles. Ojo: la cifra no se retoca y tiene que estar en metros; un letrero de Estados Unidos, en miles de pies, no sirve.",
        },
        puntos: [
          {
            x: 0,
            y: 0,
            que: "Letrero de distancia restante",
            significa: "Blanco sobre negro.",
            piloto: "Cuánta pista queda.",
          },
          {
            x: 0,
            y: 0,
            que: "Separación",
            significa: "Uno cada 300 m.",
            piloto: "Te deja decidir si frenas.",
          },
          {
            x: 0,
            y: 0,
            que: "Ubicación",
            significa: "Por fuera del borde, a los dos lados.",
            piloto: "Nunca invade el pavimento.",
          },
          {
            x: 0,
            y: 0,
            que: "Altura",
            significa: "Frangible y bajo.",
            piloto: "Da guarda a góndola y hélice.",
          },
          {
            x: 0,
            y: 0,
            que: "Señal de borde",
            significa: "Línea blanca continua.",
            piloto: "El letrero queda por fuera.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Antes de alinearte",
        situacion: "Te ofrecen salir por una intersección. Quedan 2 579 m de los 3 800.",
        pregunta: "¿Con qué número corres el cálculo?",
        respuesta: "Con 2 579 m, confirmado en la tabla publicada y en el letrero.",
        claves: [
          "El recorrido desde cada intersección va publicado, igual que las cuatro cifras de la cabecera.",
          "El letrero de la entrada lo repite: negro sobre amarillo, en metros y con la flecha del sentido del despegue.",
          "Lo que queda atrás no se recupera, y esos 1 221 m no están en ningún cálculo.",
        ],
        hueco: {
          id: "AP-03-06",
          medida: "Ilustración técnica · 16:9 · 1600×900",
          descripcion:
            "La misma planta de la ficha «Desde intersección»: las dos cotas alineadas, TORA 3 800 m y 2 579 m desde la intersección, el tramo perdido atenuado, el punto de espera en patrón A2 y el letrero negro sobre amarillo ampliado. Ojo: designador de calle genérico y ninguna cifra en pies.",
        },
      },
    ],
  },

  // ── 04 ──────────────────────────────────────────────────────────────────
  {
    n: 4,
    title: "Qué avión cabe aquí",
    kicker: "Un número, una letra, y una envergadura que decide sola",
    minutes: 8,
    blocks: [
      {
        kind: "hueco",
        rotulo: "AP-04-01 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "Planta cenital de tres siluetas genéricas de avión comercial superpuestas por el eje longitudinal, de menor a mayor envergadura, sobre fondo neutro, y una cota que recorre la envergadura de la mayor de punta de ala a punta de ala. Ojo: la cota nunca se toma de motor a motor ni de tren a tren, y en esta imagen no va ninguna cifra, ni libreas ni matrículas.",
        alto: 300,
      },
      {
        kind: "hueco",
        rotulo: "AP-04-02 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "La tabla entera en dos bloques separados. Izquierda, el número por longitud de campo de referencia: 1 menos de 800 m, 2 de 800 a menos de 1 200, 3 de 1 200 a menos de 1 800, 4 de 1 800 o más. Derecha, la letra por envergadura, de la A a la F, cada una con su silueta de ala. Abajo y aparte, la franja de anchura entre ruedas. Ojo: dentro del bloque de la letra no va ninguna columna de anchura entre ruedas, que es justo el error que la lección corrige.",
        alto: 340,
      },
      {
        kind: "p",
        text: "El código de referencia del aeródromo combina un número asociado a la longitud de campo de referencia del avión y una letra asociada a su envergadura. Sirve para relacionar el diseño de pistas, calles y separaciones con el avión que se pretende atender; no es por sí solo una autorización operacional. Un aeropuerto 4F puede tener una calle cerrada temporalmente para tu envergadura, de modo que la carta, el aviso vigente y la autorización siguen mandando sobre la etiqueta de diseño.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "La letra la manda la envergadura",
            hueco: {
              id: "AP-04-03",
              medida: "Ilustración técnica · 4:3 · 1200×900",
              descripcion:
                "Tres siluetas genéricas en planta, una debajo de otra, cada una con su cota de punta de ala a punta de ala y su letra al lado: C de 24 a menos de 36 m, D de 36 a menos de 52 m y E de 52 a menos de 65 m, con una escala común al pie. Ojo: la cota no se toma entre motores ni entre trenes, y ninguna silueta lleva librea, logo ni nombre de modelo.",
            },
            puntos: ["Desde 2018 depende solo de eso."],
          },
          {
            titulo: "El tren va aparte",
            hueco: {
              id: "AP-04-04",
              medida: "Ilustración técnica · 4:3 · 1200×900",
              descripcion:
                "Arriba, un tren principal de frente con la cota tomada por fuera de las dos ruedas exteriores y líneas de referencia bajando desde el borde de cada neumático. Abajo, el mismo avión en planta sobre una calle, con la cabina encima del eje amarillo continuo y acotada la separación de la rueda exterior al borde del pavimento. Ojo: la cota nunca va entre centros de rueda, y el avión no rueda con las ruedas centradas sino con la cabina sobre la línea.",
            },
            puntos: ["La anchura entre ruedas es parámetro propio."],
          },
          {
            titulo: "El letrero naranja",
            hueco: {
              id: "AP-04-05",
              medida: "Fotografía · 3:2 · 1200×800",
              descripcion:
                "Desde el puesto del piloto, rodando hacia una intersección: el letrero rectangular de lado largo horizontal, negro sobre naranja, retrorreflectante y frangible, legible de punta a punta con el texto «MAX SPAN 65 m», con el borde de la calle y el eje amarillo continuo a la vista. Contorno negro de 20 mm en clave 3 o 4. Ojo: si se produce en estudio es un letrero real fotografiado; un montaje digital sobre una foto genérica no se acepta.",
            },
            puntos: ["Negro sobre naranja: restricción temporal en el terreno."],
          },
          {
            titulo: "El aviso publicado manda",
            puntos: ["Letrero y aviso no pueden contradecirse."],
          },
        ],
      },
      {
        kind: "definicion",
        text: "La letra sale de la envergadura; la anchura entre ruedas fija pistas y calles.",
      },
      {
        kind: "reconoce",
        titulo: "El aviso de restricción de calle",
        hueco: {
          id: "AP-04-06",
          medida: "Ilustración técnica · 16:9 · 1600×900",
          descripcion:
            "Tableta de frente en el pedestal con un aviso a los navegantes en texto monoespaciado, redibujado: la identificación «A0123/26», la línea «TWY B RESTRINGIDA. MAX SPAN 65 M.», la ruta alterna por la calle C y las horas de inicio y fin de vigencia. La cifra coincide con la del letrero del terreno. Ojo: aeródromo, indicador de lugar y número son ficticios, sin logo de autoridad ni de proveedor.",
        },
        puntos: [
          {
            x: 0,
            y: 0,
            que: "Calle afectada",
            significa: "Dónde aplica.",
            piloto: "Si no es tuya, sigue.",
          },
          {
            x: 0,
            y: 0,
            que: "La restricción",
            significa: "Envergadura máxima.",
            piloto: "Compárala con tu avión.",
          },
          {
            x: 0,
            y: 0,
            que: "Fechas y horas",
            significa: "Desde cuándo y hasta cuándo.",
            piloto: "Vencido no restringe.",
          },
          {
            x: 0,
            y: 0,
            que: "La ruta alterna",
            significa: "Por dónde sí se puede.",
            piloto: "Eso pides.",
          },
          {
            x: 0,
            y: 0,
            que: "El letrero en el terreno",
            significa: "Dice lo mismo.",
            piloto: "Si difieren, pregunta.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Rodando hacia la intersección",
        situacion: "Vas a un aeropuerto 4F con 70 m de envergadura. Un letrero dice «MAX SPAN 65 m».",
        pregunta: "¿Qué manda?",
        respuesta: "El letrero y el aviso que lo respalda. La clave planifica; la restricción manda hoy.",
        claves: [
          "La letra F cubre de 65 m a menos de 80 m: dice cómo se diseñó el aeródromo, no qué está abierto hoy.",
          "Negro sobre naranja es zona fuera de servicio, y es el tercer color del área de movimiento.",
          "El letrero complementa lo publicado y no puede contradecirlo: si difieren, se pregunta.",
        ],
        hueco: {
          id: "AP-04-05",
          medida: "Fotografía · 3:2 · 1200×800",
          descripcion:
            "El mismo letrero de la ficha «El letrero naranja»: rectangular, de lado largo horizontal, negro sobre naranja, retrorreflectante y frangible, con el texto «MAX SPAN 65 m» legible de punta a punta y el eje amarillo de la calle a la vista. Ojo: nada de montajes digitales sobre una foto genérica; si no hay letrero instalado, se fotografía uno real construido con estas medidas.",
        },
      },
    ],
  },
]
