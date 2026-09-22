/**
 * Nivel 2 · Lo pintado en el suelo (lecciones 5 a 8).
 *
 * Es el nivel del suelo, en el orden en que un vuelo se encuentra las señales:
 * primero lo que se lee en la pista, luego el pavimento que hay delante y no
 * siempre es tuyo, después dónde se para antes de entrar y, al final, cómo se
 * llega al puesto. Norma OACI, Anexo 14 Volumen I, 9.ª edición con la Enmienda
 * 18, aplicable desde el 27 de noviembre de 2025; los puntos de espera se
 * dibujan siempre con los patrones anchos A2 y B2, nunca con A1 ni B1.
 *
 * Los huecos llevan su código (AP-LL-NN) porque es el que Camilo usa para
 * nombrar la imagen cuando la genera. La ficha completa de cada uno está en
 * docs/BRIEF_AEROPUERTOS.md.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const NIVEL_2: DocScreen[] = [
  // ── 05 ──────────────────────────────────────────────────────────────────
  {
    n: 5,
    title: "Señales de pista",
    kicker: "Todo lo blanco te está diciendo algo",
    minutes: 7,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-05-01-senales-pista.webp",
        alt: "Vista aérea de la cabecera de la pista 27 con umbral, designador, eje, referencia de apuntado y zona de toma señalados",
        ancho: 1600,
        alto: 900,
        pie: "En corta final, las fajas de umbral confirman dónde comienza la superficie disponible para aterrizar y el designador identifica la orientación de la pista. Después, el eje ayuda a mantener la alineación. Las dos barras largas son la referencia de apuntado, no el lugar exacto donde deben tocar las ruedas; los pares de barras posteriores forman la zona de toma de contacto. Todas estas señales son blancas: una línea amarilla pertenece al sistema de rodaje, no a la pista.",
      },
      {
        kind: "p",
        text: "Las señales blancas identifican la pista y ordenan las referencias que usas en aproximación y aterrizaje. Las dos barras largas forman la referencia de apuntado —denominada «señal de punto de visada» en la publicación OACI—: hacia ellas estabilizas visualmente la trayectoria, pero no significan que las ruedas deban tocar exactamente allí. Los pares de barras que siguen marcan la zona de toma de contacto y permiten estimar cuánto te has alejado del umbral.",
      },
      {
        kind: "p",
        text: "La identidad de la pista es blanca; el amarillo pertenece a calles, puntos de espera, márgenes o superficies que no se usan como pista. Al abandonar después del aterrizaje puede aparecer una guía amarilla de salida sobre el pavimento, así que el color por sí solo no confirma que estés libre: todo el avión debe cruzar el punto de espera aplicable.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Señal designadora",
            imagen: {
              src: "/modulos/aeropuertos/ap-05-03-designador-13l.webp",
              alt: "Designador blanco 13L señalado sobre una pista y explicado como rumbo magnético aproximado 130 grados, pista izquierda",
            },
            puntos: [
              "El designador se forma con la décima parte del rumbo magnético del eje, redondeada y vista desde la aproximación. Por eso 13 indica aproximadamente 130° y la L identifica la pista izquierda de un sistema paralelo. Antes de entrar o aterrizar, comparas número y letra con tu autorización; coincidir solo en el número no basta si existen paralelas.",
            ],
          },
          {
            titulo: "Señal de eje",
            imagen: {
              src: "/modulos/aeropuertos/ap-05-04-anchos-eje.webp",
              alt: "Comparación técnica de los anchos de la señal de eje para pistas CAT II y III, CAT I y no instrumentales",
            },
            puntos: [
              "El eje siempre es blanco y discontinuo. Su anchura es de 0,90 m en pistas CAT II y III; 0,45 m en CAT I y en pistas de no precisión con clave 3 o 4; y 0,30 m en pistas no instrumentales o de no precisión con clave 1 o 2. Ese ancho ayuda a reconocer el tipo de señalización, pero la categoría disponible se confirma en la carta y en la información vigente.",
            ],
          },
          {
            titulo: "Señal de umbral",
            imagen: {
              src: "/modulos/aeropuertos/ap-05-05-fajas-umbral.webp",
              alt: "Cinco esquemas de umbral que relacionan 4, 6, 8, 12 y 16 fajas con pistas de 18, 23, 30, 45 y 60 metros",
            },
            puntos: [
              "Las fajas blancas del umbral están dispuestas de forma simétrica. El total permite reconocer el ancho de pista: 4 para 18 m, 6 para 23 m, 8 para 30 m, 12 para 45 m y 16 para 60 m. En corta final, contar las fajas sirve como comprobación visual; no sustituye las dimensiones publicadas.",
            ],
          },
          {
            titulo: "Faja lateral",
            imagen: {
              src: "/modulos/aeropuertos/ap-05-06-faja-lateral.webp",
              alt: "Fotografía a nivel del suelo de una faja lateral blanca y continua cuyo borde exterior coincide con el borde de pista",
            },
            puntos: [
              "La faja lateral es blanca, continua y define visualmente el borde de la pista cuando el contraste con el terreno o el margen puede resultar insuficiente. Su borde exterior coincide con el borde de pista. Mantienes ruedas y trayectoria dentro de esas líneas: el pavimento o terreno exterior no se interpreta como ancho adicional disponible.",
            ],
          },
          {
            titulo: "Referencia de apuntado y zona de toma",
            imagen: {
              src: "/modulos/aeropuertos/ap-05-07-apuntado-zona-toma.webp",
              alt: "Diagrama a escala de una referencia de apuntado a 400 metros y pares de marcas de zona de toma cada 150 metros",
            },
            puntos: [
              "En una pista con LDA (Landing Distance Available) de 2.400 m o más, la referencia de apuntado comienza a 400 m del umbral. Las marcas de zona de toma aparecen por pares a intervalos de 150 m; si un par quedara a 50 m o menos de la referencia de apuntado, se omite. En aproximación las usas para vigilar el punto previsto de toma y decidir una ida al aire si el avión queda largo o inestable.",
            ],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "La pista desde corta final",
        imagen: {
          src: "/modulos/aeropuertos/ap-05-08-corta-final.webp",
          alt: "Vista desde cabina en corta final de una pista 27 con doce fajas de umbral, referencia de apuntado y zona de toma señaladas",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 38,
            y: 67,
            que: "Fajas de umbral",
            significa: "Las doce fajas blancas corresponden a una pista de 45 m de ancho.",
            piloto: "Las cuentas como comprobación visual y confirmas el dato en la carta; no corriges una autorización solo por la apariencia.",
          },
          {
            x: 50,
            y: 52,
            que: "Designadora",
            significa: "El 27 identifica una orientación magnética aproximada de 270°.",
            piloto: "Compruebas número y, cuando corresponda, letra de paralela antes de continuar.",
          },
          {
            x: 61,
            y: 35,
            que: "Referencia de apuntado",
            significa: "Son las dos barras largas y simétricas situadas antes de la zona de toma.",
            piloto: "Vigilas la trayectoria hacia esa referencia sin convertirla en un punto obligatorio de contacto.",
          },
          {
            x: 61,
            y: 24,
            que: "Zona de toma de contacto",
            significa: "Los pares de marcas dan referencias de distancia desde el umbral.",
            piloto: "Si la toma prevista se desplaza fuera del margen estabilizado, aplicas el criterio de ida al aire de tu operación.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Antes de despegar",
        situacion:
          "Despegas de una pista nueva. Cuentas doce fajas de umbral y el eje se ve angosto.",
        pregunta: "¿Qué pista tienes debajo?",
        respuesta:
          "Doce fajas corresponden a una pista de 45 m de ancho. Un eje angosto permite descartar visualmente el ancho de 0,90 m previsto para CAT II o III, pero no demuestra por sí solo que la pista sea CAT I.",
        claves: [
          "La categoría y el sistema disponible se confirman en la carta y en la información vigente; no se deducen de una sola señal.",
        ],
        imagen: {
          src: "/modulos/aeropuertos/ap-05-09-doce-fajas.webp",
          alt: "Vista oblicua de una pista 27 con doce fajas de umbral y un eje angosto, acompañada de la advertencia de confirmar la categoría en la carta",
        },
      },
    ],
  },

  // ── 06 ──────────────────────────────────────────────────────────────────
  {
    n: 6,
    title: "Umbral desplazado y zonas cerradas",
    kicker: "Pavimento que no siempre puedes usar",
    minutes: 7,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-06-01-umbral-desplazado.webp",
        alt: "Vista aérea de una pista con galones amarillos, flechas blancas y un umbral desplazado, señalados con rótulos didácticos",
        ancho: 1600,
        alto: 900,
        pie: "Los galones amarillos delimitan pavimento que no se usa para rodar, despegar ni aterrizar. Las flechas blancas identifican el tramo anterior al umbral: en esta dirección puede utilizarse para rodaje y despegue, pero no para iniciar el aterrizaje; desde el sentido contrario puede formar parte del recorrido de aterrizaje. La faja transversal y las fajas de umbral marcan dónde comienza la LDA (Landing Distance Available). Antes de operar, confirma las distancias publicadas y cualquier restricción vigente.",
      },
      {
        kind: "p",
        text: "No todo el pavimento alineado con una pista tiene el mismo uso. Las flechas blancas antes de un umbral desplazado permiten rodar y despegar en esa dirección, y también forman parte del recorrido de aterrizaje desde el sentido contrario; los galones amarillos identifican una zona que no se usa para rodar, despegar ni aterrizar. La diferencia cambia la TORA (Take-Off Run Available), la LDA y la decisión de continuar una aproximación.",
      },
      {
        kind: "p",
        text: "Un desplazamiento temporal no se reconoce igual que uno permanente, y una cruz cambia por completo el significado de la superficie. Antes de usar cualquier tramo, relaciona lo que ves con la carta, el NOTAM y la autorización vigente: la señal visual te permite detectar la condición, pero las distancias declaradas y las restricciones publicadas determinan la operación.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-06-02-anatomia-umbral.webp",
        alt: "Diagrama cenital de un umbral desplazado permanente con galones, flechas, puntas de flecha, faja transversal y fajas de umbral",
        ancho: 1600,
        alto: 900,
        pie: "La secuencia se lee desde el extremo de pista hacia el área utilizable: los galones amarillos señalan una superficie no apta para la operación normal; las flechas blancas guían hacia el umbral desplazado; la fila de puntas y la faja transversal identifican el nuevo comienzo de la LDA. Las fajas de umbral aparecen después de esa línea. Reconocer cada zona evita confundir pavimento disponible para despegar con pavimento disponible para tomar contacto.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Umbral desplazado temporal",
            imagen: {
              src: "/modulos/aeropuertos/ap-06-03-umbral-temporal.webp",
              alt: "Diagrama de un umbral desplazado temporal con señales anteriores ocultas, flechas blancas y una gran punta de flecha",
            },
            puntos: [
              "En un desplazamiento temporal se ocultan las señales que ya no aplican y el eje anterior se convierte en flechas blancas que conducen al nuevo umbral. La gran punta de flecha tiene al menos 10 m de altura y un trazo mínimo de 1,20 m; cuando la condición dura poco pueden emplearse balizas. El piloto no toma contacto antes de la nueva faja transversal y confirma la LDA temporal en la información vigente.",
            ],
          },
          {
            titulo: "Pista cerrada y calle cerrada",
            imagen: {
              src: "/modulos/aeropuertos/ap-06-06-cruces-cierre.webp",
              alt: "Comparación cenital entre cruces blancas de cierre de pista y una cruz amarilla de cierre de calle de rodaje",
            },
            puntos: [
              "Una cruz blanca indica una pista cerrada; una cruz amarilla indica una calle de rodaje cerrada. En pista, las cruces se repiten a intervalos máximos de 300 m para que la condición sea evidente desde el aire y desde tierra. Si la superficie aparece cerrada, no se entra ni se continúa solo porque el pavimento esté libre: se confirma la autorización y la condición publicada.",
            ],
          },
          {
            titulo: "Cruz de luces",
            imagen: {
              src: "/modulos/aeropuertos/ap-06-05-cruz-luces.webp",
              alt: "Pista cerrada de noche con una cruz de luces blancas destellantes sobre el eje",
            },
            puntos: [
              "La cruz luminosa blanca refuerza de noche la identificación de una pista temporalmente cerrada o restringida para el despegue. La recomendación prevé como mínimo cinco luces por brazo y un ciclo de un segundo encendida y uno apagada. Si aparece durante la aproximación o el rodaje, se trata como una advertencia de cierre: no se usa la pista hasta aclarar la condición con control y la información operacional.",
            ],
          },
          {
            titulo: "Área fuera de servicio",
            imagen: {
              src: "/modulos/aeropuertos/ap-06-04-fuera-servicio.webp",
              alt: "Calle de rodaje con señal y letrero naranja de fuera de servicio, ambos con letras negras",
            },
            puntos: [
              "La inscripción negra sobre fondo naranja identifica un área fuera de servicio y puede aparecer pintada en el pavimento o en un letrero. No equivale a una autorización para bordearla por cuenta propia: el piloto mantiene la ruta autorizada, comprueba NOTAM y publicaciones vigentes, y pide aclaración si la señal no coincide con la instrucción recibida.",
            ],
          },
        ],
      },
      {
        // La comparación de la lección: dos mitades que se superponen, con un
        // hueco en cada una. Van juntas o no comparan nada.
        kind: "fichas",
        titulo: "Lado a lado: flechas contra galones",
        columnas: 2,
        items: [
          {
            titulo: "Flechas de umbral desplazado",
            imagen: {
              src: "/modulos/aeropuertos/ap-06-07-flechas.webp",
              alt: "Diagrama cenital de flechas blancas que conducen a un umbral desplazado",
            },
            puntos: [
              "Las flechas blancas conducen hacia un umbral desplazado. En el sentido mostrado, el tramo puede usarse para rodar y para iniciar el despegue, pero no para tomar contacto; desde el sentido contrario puede formar parte del recorrido de aterrizaje. La faja transversal señala dónde comienza la LDA para esa aproximación.",
            ],
          },
          {
            titulo: "Galones",
            imagen: {
              src: "/modulos/aeropuertos/ap-06-08-galones.webp",
              alt: "Diagrama cenital de galones amarillos sobre pavimento anterior al umbral que no sirve para uso normal",
            },
            puntos: [
              "Los galones amarillos cubren un tramo pavimentado anterior al umbral que no es apto para el uso normal de la aeronave. A diferencia de las flechas blancas, no permiten rodaje, despegue ni aterrizaje. Si la trayectoria exige pasar sobre ellos en tierra, se detiene la maniobra y se aclara la ruta.",
            ],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Cabecera con umbral desplazado",
        imagen: {
          src: "/modulos/aeropuertos/ap-06-09-reconoce-umbral.webp",
          alt: "Vista aérea oblicua de una pista con galones amarillos, flechas blancas, faja transversal y fajas de umbral",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 28,
            y: 78,
            que: "Galones amarillos",
            significa: "Delimitan pavimento anterior al umbral que no es apto para el uso normal de la aeronave.",
            piloto: "No ruedas, no despegas y no aterrizas sobre ese tramo.",
          },
          {
            x: 51,
            y: 39,
            que: "Faja transversal",
            significa: "Identifica el umbral desplazado y separa el tramo previo de la superficie disponible para tomar contacto.",
            piloto: "Desde esta línea comienza la LDA para la aproximación mostrada.",
          },
          {
            x: 47,
            y: 53,
            que: "Flechas sobre el eje",
            significa: "Conducen visualmente hacia el umbral desplazado.",
            piloto: "Puedes usar ese tramo para rodaje y despegue en esta dirección, pero no para tomar contacto.",
          },
          {
            x: 45,
            y: 30,
            que: "Primera faja de umbral",
            significa: "Confirma el inicio de la pista disponible para aterrizar en este sentido.",
            piloto: "La relacionas con la faja transversal y el designador antes de continuar la aproximación.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Alineado para despegar",
        situacion:
          "Estás alineado para despegar. Delante ves flechas blancas y, más allá, la faja transversal.",
        pregunta: "¿Puedes usar ese tramo para despegar?",
        respuesta:
          "Sí, si las distancias publicadas y tu autorización lo permiten. Las flechas blancas indican que el tramo anterior al umbral desplazado puede utilizarse para rodar y para iniciar el despegue en esta dirección; no puede utilizarse para tomar contacto.",
        claves: [
          "Confirma la TORA publicada y cualquier reducción temporal antes de calcular o iniciar el despegue.",
          "Los galones amarillos significan que el pavimento no está disponible para la operación normal.",
        ],
        imagen: {
          src: "/modulos/aeropuertos/ap-06-10-decision-despegue.webp",
          alt: "Vista aérea de un umbral desplazado con indicaciones sobre el uso de las flechas blancas para despegue y la prohibición de tomar contacto antes del umbral",
        },
      },
    ],
  },

  // ── 07 ──────────────────────────────────────────────────────────────────
  {
    n: 7,
    title: "Dónde se espera",
    kicker: "Las cuatro líneas que evitan una incursión",
    minutes: 8,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-07-01-punto-espera.webp",
        alt: "Vista desde una cabina de un eje mejorado y un punto de espera de pista antes de las marcas blancas de la pista",
        ancho: 1600,
        alto: 900,
        pie: "El eje mejorado avisa que te aproximas a un punto de espera, pero no sustituye la autorización ni la carta. En el patrón A2, las dos líneas continuas quedan del lado desde el que llega la aeronave y las dos discontinuas miran hacia la pista. Si no tienes autorización para entrar o cruzar, detén toda la aeronave antes de las continuas: no basta con que el tren de nariz quede detrás.",
      },
      {
        kind: "p",
        text: "Rodar no es seguir una línea amarilla de forma automática: es comparar continuamente la autorización, la carta, los letreros y lo que aparece delante. Al acercarte a una pista, el eje mejorado anticipa el punto de espera; allí las líneas continuas quedan del lado donde debes detener todo el avión hasta recibir y entender la autorización correspondiente.",
      },
      {
        kind: "p",
        text: "Las continuas siempre miran al lado donde esperas.",
      },
      {
        kind: "hueco",
        rotulo: "AP-07-02 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "Cenital pura, el recorrido entero de izquierda a derecha en el orden en que lo encuentra el avión: punto de espera intermedio de una sola línea de trazos, patrón B2 con «CAT III» al lado, eje mejorado acotado a 47 m, patrón A2 de 2,10 m y señal de instrucción obligatoria blanca sobre rojo. Todo lo de calle en amarillo, todo lo de pista en blanco. Ojo: nada de patrón A1 ni B1, y las continuas van del lado de espera y nunca miran a la pista.",
        alto: 340,
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Eje mejorado",
            hueco: {
              id: "AP-07-03",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Setenta metros de calle de rodaje, cenital pura, con la pista entrando por la derecha. Eje continuo amarillo de 0,15 m con la doble línea de trazos a cada lado, acotada a 47 m desde el patrón A2 y alejándose de la pista; un B2 dentro de esos 47 m interrumpe el realce 0,90 m antes y 0,90 m después. El tramo entre el punto de espera y la pista va sin realzar. Ojo: las continuas van del lado de espera y nunca miran a la pista.",
            },
            puntos: ["Trazos a los lados del eje: pista adelante, prepárate."],
          },
          {
            titulo: "Instrucción obligatoria",
            hueco: {
              id: "AP-07-04",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Cenital pura, partida en dos. A la izquierda, la instrucción obligatoria «13L-31R» blanca sobre rojo, centrada sobre el eje, en un solo bloque, porque la anchura exterior entre ruedas del tren principal es menor de 9 m; a la derecha, «NO ENTRY». Fondo sobresaliendo 0,50 m del texto, carácter de 4 m y 1 m hasta el punto de espera insinuado al borde. Ojo: nunca a la izquierda del eje, que eso es FAA, y las continuas van del lado de espera y nunca miran a la pista.",
            },
            puntos: ["Blanco sobre rojo: no pasas sin autorización."],
          },
          {
            titulo: "Punto de verificación del VOR",
            hueco: {
              id: "AP-07-05",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Rincón de plataforma de hormigón claro, cenital pura, con el punto de verificación en el centro: círculo de 6 m de diámetro y línea de 0,15 m de ancho, bordeado de negro para contrastar. La línea de azimut sale del centro, sobresale 6 m del círculo y termina en punta de flecha; es opcional. Una flecha de norte al margen. Ojo: blanco, nunca amarillo, que el amarillo es de calle de rodaje.",
            },
            puntos: ["Círculo blanco de 6 m en la plataforma."],
          },
        ],
      },
      {
        // La comparación de la lección: A2 y B2 miden lo mismo de ancho, así
        // que solo se distinguen puestas una al lado de la otra.
        kind: "fichas",
        titulo: "Lado a lado: patrón A2 contra patrón B2",
        columnas: 2,
        items: [
          {
            titulo: "Punto de espera patrón A2",
            hueco: {
              id: "AP-07-06",
              medida: "Ilustración técnica · 4:3 · 1200×900",
              descripcion:
                "Mitad izquierda de la comparación, primer plano cenital de 25 m de calle con el patrón A2 cruzándola de arriba abajo, la pista a la derecha y el lado de espera a la izquierda. Cuatro líneas de 0,30 m y tres espacios de 0,30 m, ancho total 2,10 m, y el eje amarillo cortándose en la señal. Es siempre la señal más cercana a la pista. Ojo: nada de patrón A1, y las continuas van del lado de espera y nunca miran a la pista.",
            },
            puntos: ["Cuatro líneas, el más cercano a la pista."],
          },
          {
            titulo: "Punto de espera patrón B2",
            hueco: {
              id: "AP-07-07",
              medida: "Ilustración técnica · 4:3 · 1200×900",
              descripcion:
                "Mitad derecha, con la misma escala y el mismo encuadre que la izquierda. Patrón B2: dos líneas continuas de 0,30 m separadas 1,50 m, ancho total 2,10 m, unidas por travesaños de 0,90 m cada 3,0 m. La inscripción «CAT III», de letras de 1,80 m o más, va a 0,90 m o menos de la señal y se repite cada 45 m; un A2 se insinúa al fondo. Ojo: nada de patrón B1, y las continuas van del lado de espera y nunca miran a la pista.",
            },
            puntos: ["La escalera, siempre detrás."],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Una intersección de calle de rodaje y pista de precisión",
        hueco: {
          id: "AP-07-08",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "Aérea oblicua desde 120 m, a lo largo de una calle ancha que llega a una pista CAT III, con el recorrido completo: punto de espera intermedio al fondo, patrón B2 con «CAT III», eje mejorado y patrón A2 junto a la pista. Si no se consigue una foto con A2 y B2, se hace como ilustración técnica con el mismo encuadre: mejor una ilustración correcta que una foto con patrones vencidos. Ojo: nada de patrón A1 ni B1, y las continuas van del lado de espera y nunca miran a la pista.",
        },
        puntos: [
          {
            x: 0,
            y: 0,
            que: "Eje mejorado",
            significa: "Trazos a los lados.",
            piloto: "El punto de espera, a 47 m o menos.",
          },
          {
            x: 0,
            y: 0,
            que: "Patrón A2",
            significa: "Las continuas de tu lado.",
            piloto: "Aquí paras.",
          },
          {
            x: 0,
            y: 0,
            que: "Patrón B2",
            significa: "La escalera.",
            piloto: "Protege el área crítica del ILS.",
          },
          {
            x: 0,
            y: 0,
            que: "Punto de espera intermedio",
            significa: "Una sola línea de trazos.",
            piloto: "No es pista.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Rodando hacia la pista",
        situacion:
          "Ruedas hacia la 13L. Cuatro líneas cruzan la calle: las continuas de tu lado. Sin autorización.",
        pregunta: "¿Dónde paras exactamente?",
        respuesta: "Antes de las continuas, con todo el avión de tu lado.",
        claves: [
          "Las de trazos miran a la pista.",
          "No estás libre hasta cruzarla entera.",
        ],
        // Reutiliza la mitad izquierda de la comparación.
        hueco: {
          id: "AP-07-06",
          medida: "Ilustración técnica · 4:3 · 1200×900",
          descripcion:
            "Se reutiliza la lámina del patrón A2: cuatro líneas de 0,30 m y tres espacios de 0,30 m, ancho total 2,10 m, con la pista a la derecha y el lado de espera a la izquierda. Ojo: nada de patrón A1, y las continuas van del lado de espera y nunca miran a la pista.",
        },
      },
    ],
  },

  // ── 08 ──────────────────────────────────────────────────────────────────
  {
    n: 8,
    title: "Plataforma y puesto",
    kicker: "Las líneas que te llevan hasta el puesto",
    minutes: 7,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-08-01-puesto-plataforma.webp",
        alt: "Avión entrando a un puesto de estacionamiento con la línea de entrada, el inicio del giro, la alineación y la línea de parada señalados",
        ancho: 1600,
        alto: 900,
        pie: "La línea amarilla de entrada guía el tren de nariz, pero cada marca se interpreta desde la posición del piloto. La barra con flecha indica cuándo iniciar el giro; la línea curva conduce hacia la alineación final y la línea transversal marca la detención prevista para el puesto o tipo de aeronave. Mantener el tren sobre la guía no garantiza por sí solo la separación de alas: también debes seguir el sistema de atraque, las señales del personal de tierra y las limitaciones del puesto asignado.",
      },
      {
        kind: "p",
        text: "En plataforma la línea amarilla guía el eje del avión, pero la geometría se interpreta desde la posición del piloto. La barra de viraje aparece a la altura de la cabina para iniciar el giro y la línea de parada indica dónde detenerte según el tipo de avión o el sistema de atraque. Seguir el eje no garantiza por sí solo separación de punta de ala: también mandan el puesto asignado, la guía visual y el personal de tierra.",
      },
      {
        kind: "p",
        text: "El puesto se lee en siete partes, de la identificación a la salida.",
      },
      {
        kind: "hueco",
        rotulo: "AP-08-02 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "Cenital pura de un puesto completo, con los siete elementos rotulados: identificación «2A-B747» dentro de la línea de entrada, línea de entrada, barra de viraje, línea de viraje, barra de alineación, línea de parada y línea de salida. Todo amarillo y de 0,15 m o más; la barra de viraje y la línea de parada, de 6 m o más y en ángulo recto. Una silueta gris marca dónde cae el puesto del piloto izquierdo. Ojo: ninguna línea del puesto en blanco, que eso sería pista.",
        alto: 340,
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Barra de viraje y línea de parada",
            hueco: {
              id: "AP-08-03",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Dos mitades. A la izquierda, cenital de la silueta del avión sobre el puesto, con dos líneas de mira punteadas que salen del puesto del piloto izquierdo y caen sobre la barra de viraje y sobre la línea de parada, las dos de 6 m o más y en ángulo recto. A la derecha, la misma barra vista desde la ventanilla izquierda a 5 m del suelo, a la altura del hombro. Ojo: nunca alineada con el morro, ni sin punta de flecha.",
            },
            puntos: ["Van a la altura de tu ventanilla, no del morro."],
          },
          {
            titulo: "Líneas de seguridad",
            hueco: {
              id: "AP-08-04",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "Desde el suelo, a 1,6 m de altura, en el borde de un puesto ocupado, mirando a lo largo de la línea de seguridad que corre por delante del ala. Se ven la línea de separación de punta de plano y la de límite de vía de servicio, continuas y de 0,10 m o más, en un color que contrasta con el amarillo del puesto, y un equipo de tierra del lado correcto. Ojo: si salen amarillas se pierde justo lo que la ficha enseña.",
            },
            puntos: ["De otro color: hasta ahí llega el ala."],
          },
          {
            titulo: "Espera en la vía de vehículos",
            hueco: {
              id: "AP-08-05",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "Desde dentro de un vehículo de rampa, a 1,3 m de altura, mirando hacia la entrada de la vía a la pista. La línea de detención cruza el primer tercio del encuadre con la forma que le da el código de tránsito local, con su señal vial al lado, que dice «PARE»; al fondo, el borde de la pista. Ojo: aquí no se pinta el punto de espera patrón A ni B, que es el error que esta ficha existe para evitar.",
            },
            puntos: ["La dibuja el código de tránsito local."],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Entrando al puesto",
        hueco: {
          id: "AP-08-06",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "Desde la cabina, por la ventanilla izquierda y el parabrisas, a 5 m del pavimento, con el avión entrando al puesto y la línea de entrada pasando bajo el morro. Se ven la identificación pintada dentro de la línea, la barra de viraje con su punta de flecha entrando por la izquierda, la línea de parada al fondo y al menos una línea de seguridad de color contrastante. Ojo: nada de las dos líneas amarillas de límite de área de no movimiento, que no son de la OACI.",
        },
        puntos: [
          {
            x: 0,
            y: 0,
            que: "Identificación",
            significa: "Dentro de la línea de entrada.",
            piloto: "Confirma el puesto.",
          },
          {
            x: 0,
            y: 0,
            que: "Barra de viraje",
            significa: "A tu ventanilla.",
            piloto: "Aquí empieza el giro.",
          },
          {
            x: 0,
            y: 0,
            que: "Línea de parada",
            significa: "En ángulo recto.",
            piloto: "Cuando la ves, frenas.",
          },
          {
            x: 0,
            y: 0,
            que: "Línea de seguridad",
            significa: "De otro color.",
            piloto: "Ahí mandan los equipos de tierra.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Entrando al puesto",
        situacion:
          "Entras al puesto. Por tu ventanilla izquierda aparece una barra corta con punta de flecha.",
        pregunta: "¿Qué acabas de pasar y qué haces?",
        respuesta: "Es la barra de viraje.",
        claves: [
          "Va a la altura del piloto izquierdo: ahí empieza el giro.",
          "La flecha dice hacia dónde.",
        ],
        // Reutiliza la fotografía del «Reconoce».
        hueco: {
          id: "AP-08-06",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "Se reutiliza la vista desde la cabina del «Reconoce», con la identificación del puesto, la barra de viraje, la línea de parada al fondo y una línea de seguridad de color contrastante. Ojo: nada de las dos líneas amarillas de límite de área de no movimiento, que no son de la OACI.",
        },
      },
    ],
  },
]
