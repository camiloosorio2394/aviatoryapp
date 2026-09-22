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
        text: "La regla visual es sencilla: en el patrón A2, las dos líneas continuas quedan del lado desde el que te aproximas y allí debes esperar; las discontinuas quedan hacia la pista. Cuando existe un sistema ILS (Instrument Landing System) puede haber un segundo punto de espera, patrón B2, más alejado para proteger el área crítica. No avances de una señal a otra por intuición: cada cruce requiere que la autorización sea clara y aplicable a tu posición.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-07-02-ruta-espera.webp",
        alt: "Diagrama cenital de una calle de rodaje con punto de espera intermedio, patrón B2, eje mejorado, patrón A2 y pista",
        ancho: 1600,
        alto: 900,
        pie: "Al rodar hacia una pista de precisión puedes encontrar varias referencias, pero no significan lo mismo. La línea discontinua única es un punto de espera intermedio; el patrón B2, parecido a una escalera, protege una posición más alejada; el eje mejorado anuncia que se aproxima el patrón A2; y, en este recorrido, el A2 es el último punto de espera antes de la pista. El amarillo pertenece a la ruta de rodaje; las señales blancas identifican la pista.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Eje mejorado",
            imagen: {
              src: "/modulos/aeropuertos/ap-07-03-eje-mejorado.webp",
              alt: "Diagrama del eje mejorado con trazos laterales, interrupción en un patrón B2 y terminación en el patrón A2",
            },
            puntos: [
              "El eje mejorado añade trazos amarillos a ambos lados del eje continuo y se extiende hasta 47 m desde el patrón A2, alejándose de la pista. Su función es llamar tu atención antes de llegar al punto de espera; no es una autorización para avanzar. Si un B2 queda dentro de ese tramo, el realce se interrumpe alrededor de la señal. Entre el A2 y la pista el eje vuelve a ser sencillo.",
            ],
          },
          {
            titulo: "Instrucción obligatoria",
            imagen: {
              src: "/modulos/aeropuertos/ap-07-04-instruccion-obligatoria.webp",
              alt: "Comparación entre una señal pintada blanca sobre rojo con designadores de pista y la señal NO ENTRY",
            },
            puntos: [
              "Una inscripción blanca sobre fondo rojo transmite una instrucción obligatoria. Los designadores 13L–31R identifican la pista que vas a cruzar o ingresar; NO ENTRY prohíbe continuar por esa superficie. Si la autorización no incluye esa pista, detienes el avión antes de la señal y aclaras la instrucción. El fondo rojo debe sobresalir al menos 0,50 m alrededor del texto para conservar su visibilidad.",
            ],
          },
          {
            titulo: "Punto de verificación del VOR",
            imagen: {
              src: "/modulos/aeropuertos/ap-07-05-verificacion-vor.webp",
              alt: "Diagrama de un punto de verificación del VOR con círculo blanco de seis metros y línea de azimut",
            },
            puntos: [
              "El punto de verificación del VOR (VHF Omnidirectional Range) marca la posición exacta donde se estaciona la aeronave para comprobar la indicación del receptor con datos publicados. El círculo mide 6 m de diámetro y su línea tiene 0,15 m de ancho. La línea de azimut, cuando existe, orienta el avión hacia un rumbo concreto. No improvises valores: usa la ubicación y los datos oficiales del aeródromo.",
            ],
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
            imagen: {
              src: "/modulos/aeropuertos/ap-07-06-patron-a2.webp",
              alt: "Diagrama cenital del patrón A2 con dos líneas continuas del lado de espera y dos discontinuas hacia la pista",
            },
            puntos: [
              "El patrón A2 cruza toda la calle con cuatro líneas amarillas: dos continuas del lado de espera y dos discontinuas hacia la pista. Cada línea y cada espacio miden 0,30 m, para un ancho total de 2,10 m. Es el punto de espera más cercano a la pista. Sin autorización para entrar o cruzar, detienes todo el avión antes de las continuas.",
            ],
          },
          {
            titulo: "Punto de espera patrón B2",
            imagen: {
              src: "/modulos/aeropuertos/ap-07-07-patron-b2.webp",
              alt: "Diagrama cenital del patrón B2 con dos líneas unidas por travesaños, como una escalera, y la inscripción CAT III",
            },
            puntos: [
              "El patrón B2 parece una escalera: dos líneas continuas de 0,30 m separadas 1,50 m y unidas por travesaños. También mide 2,10 m de ancho, pero aparece en posiciones más alejadas de la pista para proteger el área crítica o sensible de una aproximación de precisión. La inscripción CAT III ayuda a identificar la condición. Si se te indicó esperar allí, no avances hacia el A2 sin una autorización que permita hacerlo.",
            ],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Una intersección de calle de rodaje y pista de precisión",
        imagen: {
          src: "/modulos/aeropuertos/ap-07-08-reconoce-espera.webp",
          alt: "Fotografía didáctica de una calle de rodaje con eje mejorado, punto de espera intermedio, patrón B2 y patrón A2 antes de una pista",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 51,
            y: 67,
            que: "Eje mejorado",
            significa: "Los trazos amarillos a ambos lados del eje anuncian que te aproximas a un punto de espera de pista.",
            piloto: "Concentras la atención en la ruta autorizada y te preparas para detenerte en la señal que corresponda.",
          },
          {
            x: 45,
            y: 35,
            que: "Patrón A2",
            significa: "Dos líneas continuas de tu lado y dos discontinuas hacia la pista; es el punto de espera más cercano.",
            piloto: "Sin autorización para entrar o cruzar, todo el avión permanece antes de las continuas.",
          },
          {
            x: 48,
            y: 54,
            que: "Patrón B2",
            significa: "Dos líneas unidas por travesaños forman la escalera en una posición más alejada.",
            piloto: "Si tu autorización ordena esperar en B2, te detienes allí para proteger el área del ILS.",
          },
          {
            x: 38,
            y: 78,
            que: "Punto de espera intermedio",
            significa: "Una sola línea discontinua transversal sirve para ordenar el tránsito dentro de la calle.",
            piloto: "No la confundes con A2 o B2; esperas allí cuando control te lo indique.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Rodando hacia la pista",
        situacion:
          "Ruedas hacia la pista 13L. El patrón A2 cruza la calle y las dos líneas continuas están de tu lado. Todavía no tienes autorización para entrar.",
        pregunta: "¿Dónde paras exactamente?",
        respuesta: "Te detienes antes de las líneas continuas, dejando todo el avión del lado de espera. La nariz y el tren no son la única referencia: ninguna parte de la aeronave debe sobrepasar el punto de espera sin la autorización correspondiente.",
        claves: [
          "Las líneas discontinuas del A2 miran hacia la pista; las continuas marcan el lado de espera.",
          "Para declarar la pista libre al salir, todo el avión debe quedar más allá del punto de espera aplicable.",
        ],
        imagen: {
          src: "/modulos/aeropuertos/ap-07-09-decision-espera.webp",
          alt: "Vista desde cabina hacia una pista con patrón A2 y una indicación de detener todo el avión antes de las líneas continuas",
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
        text: "En plataforma la línea amarilla guía el avión hacia el puesto, pero no basta con seguirla de forma automática. La barra de viraje se coloca a la altura del piloto izquierdo en el punto donde debe comenzar el giro; la línea de parada también se lee desde esa posición, no desde el morro. Antes de entrar, confirma el puesto y la guía que corresponde a tu aeronave. Durante la maniobra, vigila la separación de alas y sigue el sistema de atraque o las señales del personal de tierra cuando estén presentes.",
      },
      {
        kind: "p",
        text: "Un puesto puede reunir siete referencias visuales, desde la identificación hasta la salida. No todas aparecen en cada configuración: aprende a reconocer las que realmente estén pintadas y contrástalas con la información del aeropuerto.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-08-02-anatomia-puesto.webp",
        alt: "Plano técnico de un puesto con identificación, guía de entrada, barra y línea de viraje, alineación, parada y salida",
        ancho: 1600,
        alto: 900,
        pie: "Primero identificas el puesto 2A y sigues la guía de entrada. La barra transversal con flecha indica el inicio del giro; la línea curva conduce a la alineación final y la barra de parada señala dónde debe quedar el piloto izquierdo. La línea de salida solo existe cuando la configuración permite esa maniobra. Las líneas amarillas guían al avión; la roja representa un límite de seguridad para equipos. El sistema de atraque y el procedimiento local siguen siendo decisivos.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Barra de viraje y línea de parada",
            imagen: {
              src: "/modulos/aeropuertos/ap-08-03-referencia-piloto.webp",
              alt: "Plano del puesto que distingue la barra de viraje perpendicular a la entrada y la línea de parada perpendicular a la alineación",
            },
            puntos: [
              "La barra de viraje es perpendicular a la guía de entrada, lleva una flecha y queda a la altura del piloto izquierdo cuando corresponde iniciar el giro. La línea de parada es perpendicular a la alineación final y queda a la altura del mismo piloto en el punto de detención. Ambas tienen al menos 6 m de longitud y 0,15 m de ancho; si hay varias para distintos aviones, debes seguir la asignada a tu tipo y comprobar la guía de atraque.",
            ],
          },
          {
            titulo: "Líneas de seguridad",
            imagen: {
              src: "/modulos/aeropuertos/ap-08-04-lineas-seguridad.webp",
              alt: "Fotografía de una plataforma con una línea roja continua de seguridad para delimitar el área de equipos",
            },
            puntos: [
              "La línea de seguridad de plataforma delimita las zonas previstas para vehículos o equipos y ayuda a mantenerlos separados del avión. Es continua, mide al menos 0,10 m de ancho y tiene un color visible distinto del amarillo de las guías del puesto. Su trazado exacto cambia según la plataforma: no supongas que la punta del ala llega justo a la pintura. Antes de mover el avión, confirma que el área y el camino de las alas estén libres.",
            ],
          },
          {
            titulo: "Espera en la vía de vehículos",
            imagen: {
              src: "/modulos/aeropuertos/ap-08-05-espera-vehiculo.webp",
              alt: "Vista desde un vehículo de rampa ante una línea blanca de detención y una señal vial de pare antes de una calle de rodaje",
            },
            puntos: [
              "Esta es una espera para vehículos en la vía de servicio, no un punto de espera de aeronaves A2 o B2. En el ejemplo, el conductor encuentra una línea blanca y una señal de «PARE» antes de una calle de rodaje. La forma de la marca y las autorizaciones aplicables dependen de la regulación vial y del procedimiento local del aeropuerto. Como piloto, ten presente que vehículos y equipos pueden cruzar rutas de rodaje y verifica que tu trayectoria esté libre.",
            ],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Entrando al puesto",
        imagen: {
          src: "/modulos/aeropuertos/ap-08-06-reconoce-puesto.webp",
          alt: "Vista didáctica desde cabina del puesto 2A con identificación, barra de viraje, línea de parada y línea roja de seguridad",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 49,
            y: 68,
            que: "Identificación",
            significa: "El 2A pintado sobre la guía indica el puesto al que conduce esta línea.",
            piloto: "Compruebas que coincide con el puesto asignado y no sigues por error una guía hacia otro puesto.",
          },
          {
            x: 38,
            y: 62,
            que: "Barra de viraje",
            significa: "La barra amarilla queda perpendicular a la guía de entrada y su flecha indica el sentido del giro.",
            piloto: "Inicias el giro cuando queda a la altura del piloto izquierdo, siguiendo la guía y la ayuda de atraque disponible.",
          },
          {
            x: 59,
            y: 50,
            que: "Línea de parada",
            significa: "La barra transversal se coloca perpendicular a la alineación final del puesto.",
            piloto: "Te detienes con el piloto izquierdo a su altura, según la marca del tipo de avión y el sistema de atraque.",
          },
          {
            x: 78,
            y: 49,
            que: "Línea de seguridad",
            significa: "La línea roja contrasta con las guías amarillas y delimita el área prevista para equipos.",
            piloto: "Verificas que equipos, vehículos y personas no invadan la trayectoria ni el espacio de las alas.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Entrando al puesto",
        situacion:
          "Te aproximas al puesto asignado. A tu izquierda ves una barra amarilla con flecha; la guía principal empieza a curvarse hacia el lugar de estacionamiento.",
        pregunta: "¿Qué te indica esa barra y desde qué punto decides iniciar el giro?",
        respuesta: "Es la barra de viraje. Cuando queda a la altura del piloto izquierdo, inicia el giro en el sentido de la flecha y sigue la línea curva. No tomes el morro como referencia ni continúes si la ruta, la separación o la guía de atraque no están claras.",
        claves: [
          "La barra es perpendicular a la guía de entrada y su flecha muestra la dirección prevista.",
          "El puesto asignado, la separación de alas y la ayuda de atraque siguen condicionando la maniobra.",
        ],
        imagen: {
          src: "/modulos/aeropuertos/ap-08-07-decision-viraje.webp",
          alt: "Vista distinta desde el puesto del piloto izquierdo con una barra de viraje amarilla señalada antes de la curva de entrada",
        },
      },
    ],
  },
]
