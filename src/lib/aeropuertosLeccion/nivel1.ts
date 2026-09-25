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
        kind: "figura",
        src: "/modulos/aeropuertos/ap-01-02-zonas-seguridad.webp",
        alt: "Vista cenital de una pista 09-27 con la franja, la RESA, la zona de parada, la zona libre, una salida rápida y un punto de espera A2 identificados",
        ancho: 1600,
        alto: 900,
        pie: "La franja rodea la pista y continúa más allá de sus extremos para reducir daños si una aeronave se desvía. Después de esa prolongación comienza la RESA (Runway End Safety Area), el área preparada para disminuir las consecuencias de una salida por el extremo. La zona de parada es pavimento que puede aumentar la ASDA (Accelerate-Stop Distance Available); la zona libre es un volumen despejado que puede aumentar la TODA (Take-Off Distance Available), pero no ofrece pavimento para rodar o frenar. En tierra, el patrón A2 marca dónde detenerse y la salida rápida permite abandonar la pista con un ángulo menor.",
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
            imagen: {
              src: "/modulos/aeropuertos/ap-01-03-franja-pista.webp",
              alt: "Borde de pista con transición enrasada, franja nivelada y una luz frangible señalados en verde menta",
            },
            puntos: [
              "La franja es el terreno nivelado y despejado que envuelve la pista y se prolonga más allá de sus extremos. Se reconoce por la transición enrasada desde el pavimento y por la ausencia de obstáculos rígidos. No es una superficie para rodar: protege a la aeronave si se desvía y facilita el trabajo de los servicios de emergencia.",
            ],
          },
          {
            titulo: "RESA (Runway End Safety Area)",
            imagen: {
              src: "/modulos/aeropuertos/ap-01-04-resa.webp",
              alt: "Vista aérea del fin de pista, la prolongación de la franja y la RESA como áreas consecutivas y despejadas",
            },
            puntos: [
              "La RESA (Runway End Safety Area), o área de seguridad de extremo de pista, comienza después de la prolongación de la franja, no al terminar el asfalto. Es un área preparada y despejada que reduce las consecuencias de un aterrizaje demasiado corto o una salida por el extremo. El piloto no la suma a la LDA (Landing Distance Available) ni la usa como pista: su función es mitigar daños.",
            ],
          },
          {
            titulo: "Zona de parada",
            imagen: {
              src: "/modulos/aeropuertos/ap-01-05-zona-parada.webp",
              alt: "Zona de parada pavimentada con galones amarillos orientados hacia la pista y límites de ASDA y LDA señalados",
            },
            puntos: [
              "La zona de parada es pavimento del mismo ancho que la pista, identificado aquí por galones amarillos. Puede aumentar la ASDA (Accelerate-Stop Distance Available), la distancia disponible para acelerar y detenerse después de un despegue rechazado. No aumenta la LDA (Landing Distance Available) ni autoriza a rodar o aterrizar sobre ella.",
            ],
          },
          {
            titulo: "Zona libre de obstáculos",
            imagen: {
              src: "/modulos/aeropuertos/ap-01-06-zona-libre.webp",
              alt: "Zona libre sin pavimento ni obstáculos más allá del fin de pista, con el eje prolongado señalado",
            },
            puntos: [
              "La zona libre es un volumen despejado centrado en el eje prolongado; no es una extensión pavimentada. Puede aumentar la TODA (Take-Off Distance Available), la distancia disponible para despegar, porque permite continuar la trayectoria inicial sin obstáculos. No añade superficie para acelerar, frenar o aterrizar.",
            ],
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
        imagen: {
          src: "/modulos/aeropuertos/ap-01-07-punto-espera.webp",
          alt: "Vista desde cabina de un punto de espera A2 con dos líneas continuas del lado del avión, dos discontinuas hacia la pista, letreros 09-27 y una salida rápida",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 89,
            y: 16,
            que: "Salida rápida",
            significa: "Abandona la pista con un ángulo agudo para reducir el tiempo de ocupación.",
            piloto: "La usas solo con una autorización compatible y una velocidad segura; no sacrificas control por liberar antes.",
          },
          {
            x: 50,
            y: 51,
            que: "Punto de espera A2",
            significa: "Las dos continuas quedan del lado de espera y las dos discontinuas miran hacia la pista.",
            piloto: "Sin autorización de entrada o cruce, detienes la aeronave antes de la primera línea continua.",
          },
          {
            x: 18,
            y: 38,
            que: "Letrero de designación",
            significa: "El fondo rojo con caracteres blancos identifica una instrucción obligatoria y la pista 09-27.",
            piloto: "Confirma la pista antes de cruzar; una duda exige detenerse y aclarar con ATC.",
          },
          {
            x: 76,
            y: 35,
            que: "Franja",
            significa: "Es el terreno nivelado y despejado que protege los márgenes de la pista.",
            piloto: "No es una calle de rodaje ni una salida: mantienes la aeronave sobre las superficies publicadas.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Pasado el extremo de la pista",
        situacion: "Pasado el extremo ves 200 m de pavimento con galones amarillos.",
        pregunta: "¿Cuentas con ellos para frenar al aterrizar?",
        respuesta: "No. Si es zona de parada, suma a la ASDA (Accelerate-Stop Distance Available), pero nunca a la LDA (Landing Distance Available).",
        claves: [
          "Tiene la misma anchura que la pista y aguanta el avión en un despegue abortado.",
          "Los galones dicen que ese pavimento no se usa para rodar ni para aterrizar.",
          "La cifra que te sirve al aterrizar es la LDA, y esos 200 m no están dentro.",
        ],
      },
    ],
  },

  // ── 02 ──────────────────────────────────────────────────────────────────
  // Las cartas y las tablas de esta lección proceden de la publicación oficial
  // vigente de Aerocivil. Los dos patrones de señal se explican con fotografías
  // didácticas porque la carta muestra su ubicación, no su geometría de cerca.
  {
    n: 2,
    title: "La carta y el AIP",
    kicker: "Seis cartas, veinticuatro casillas y un círculo que te está avisando",
    minutes: 10,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-02-01-carta-aip.webp",
        alt: "Mesa de preparación con una carta de aeródromo en una tableta y la sección AIP AD 2 en papel, identificadas con flechas en verde menta",
        ancho: 1600,
        alto: 900,
        pie: "La carta de aeródromo te orienta espacialmente: muestra pistas, calles de rodaje y plataformas para que puedas anticipar la ruta en tierra. La sección AD 2 (Aerodromes) del AIP (Aeronautical Information Publication) completa esa imagen con dimensiones, resistencia del pavimento, distancias declaradas, luces y procedimientos. En un briefing profesional no se elige una u otra: se consultan juntas y se confirma que la enmienda esté vigente.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-02-02-cartas-oficiales.webp",
        alt: "Seis extractos reales de publicaciones oficiales de Aerocivil: carta de aeródromo, movimiento en tierra, estacionamiento, obstáculos, terreno de precisión y ficha AD 2",
        ancho: 1600,
        alto: 900,
        pie: "Fuente visual: Aerocivil, eAIP (Electronic Aeronautical Information Publication) Colombia, AIRAC (Aeronautical Information Regulation and Control) AMDT 70/26, vigente desde el 22 de enero de 2026. Cada publicación responde una pregunta distinta: la carta de aeródromo da la vista general; el plano de movimiento amplía calles y puntos críticos; el de estacionamiento ubica puestos y guías; la carta de obstáculos combina planta y perfil; la topográfica de precisión muestra el terreno en la aproximación; y la ficha AD 2 reúne los datos operativos. Primero eliges la publicación según la decisión que necesitas tomar y después confirmas que siga vigente.",
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
            imagen: {
              src: "/modulos/aeropuertos/ap-02-03-carta-aerodromo-oficial.webp",
              alt: "Carta oficial de aeródromo de SKBO con la hoja completa, la tabla superior y la planta ampliada",
            },
            puntos: [
              "La carta oficial de aeródromo muestra la configuración general, las pistas, las calles, las plataformas y las distancias publicadas. La reconoces por la planta completa, la escala, el norte y las tablas que acompañan el plano. Úsala para construir una imagen general del aeropuerto; si una calle o un puesto queda demasiado pequeño, pasa al plano específico en vez de adivinar.",
            ],
            nota: "Fuente: Aerocivil, eAIP Colombia, carta de aeródromo SKBO, AIRAC AMDT 70/26.",
          },
          {
            titulo: "Plano de movimientos en tierra",
            imagen: {
              src: "/modulos/aeropuertos/ap-02-04-movimiento-tierra-oficial.webp",
              alt: "Plano oficial de movimiento en tierra de SKBO, configuración oriente, con calles, puntos de espera y puntos críticos",
            },
            puntos: [
              "El plano de movimiento en tierra amplía la red de calles, los puntos de espera y los HS (Hot Spots), o puntos críticos. Se reconoce porque el rodaje ocupa el centro de la hoja y los HS aparecen identificados en el plano y explicados en una tabla. Se estudia antes de arrancar: durante el rodaje se confirma la autorización, la señalización exterior y la posición, sin intentar aprender la ruta con la aeronave en movimiento.",
            ],
            nota: "Fuente: Aerocivil, eAIP Colombia, plano de movimiento en tierra SKBO, AIRAC AMDT 70/26.",
          },
          {
            titulo: "Plano de estacionamiento y atraque",
            imagen: {
              src: "/modulos/aeropuertos/ap-02-09-estacionamiento-atraque-oficial.webp",
              alt: "Plano oficial de estacionamiento y atraque de la Terminal 1 de SKBO, con puestos, calles de acceso y guías de entrada",
            },
            puntos: [
              "El plano de estacionamiento y atraque amplía la plataforma hasta mostrar puestos, calles de acceso y guías de entrada. Lo reconoces por la numeración detallada de posiciones y por la silueta de la terminal. Sirve para anticipar por dónde entrar al puesto y qué referencias buscar; la autorización de ATC y la guía del sistema de atraque o del señalero siguen teniendo prioridad sobre la interpretación del plano.",
            ],
            nota: "Fuente: Aerocivil, eAIP Colombia, plano de estacionamiento y atraque de aeronaves de la Terminal 1 de SKBO, AIRAC AMDT 70/26.",
          },
          {
            titulo: "Carta de obstáculos tipo A",
            imagen: {
              src: "/modulos/aeropuertos/ap-02-05-obstaculos-tipo-a-oficial.webp",
              alt: "Carta oficial de obstáculos tipo A para la pista 14L-32R de SKBO, con perfil superior y planta inferior",
            },
            puntos: [
              "La carta de obstáculos tipo A combina un perfil lateral con una planta de la trayectoria de despegue. Se reconoce por la superficie de pendiente, los obstáculos acotados y el recuadro de TORA (Take-Off Run Available), TODA (Take-Off Distance Available), ASDA (Accelerate-Stop Distance Available) y LDA (Landing Distance Available). Sirve para entender qué obstáculo limita la salida; el cálculo final se hace con la documentación operacional aprobada de la aeronave y los datos vigentes.",
            ],
            nota: "Fuente: Aerocivil, eAIP Colombia, carta de obstáculos tipo A SKBO 14L-32R, AIRAC AMDT 70/26.",
          },
          {
            titulo: "Carta topográfica de precisión",
            imagen: {
              src: "/modulos/aeropuertos/ap-02-10-topografica-precision-oficial.webp",
              alt: "Carta topográfica oficial de aproximación de precisión para las pistas 14L y 32R de SKBO",
            },
            puntos: [
              "La carta topográfica de aproximación de precisión representa el perfil del terreno y las alturas alrededor del eje final. La reconoces por la vista en planta, el perfil longitudinal y las curvas de nivel. Apoya el estudio y la certificación de aproximaciones de precisión, especialmente categorías II y III; no reemplaza la carta de aproximación instrumental que la tripulación utiliza para volar el procedimiento.",
            ],
            nota: "Fuente: Aerocivil, eAIP Colombia, carta topográfica de aproximación de precisión SKBO 14L-32R, AIRAC AMDT 70/26.",
          },
          {
            titulo: "Carta electrónica de terreno y obstáculos",
            puntos: [
              "No siempre aparece como una hoja lista para imprimir. Es un conjunto digital de datos de terreno y obstáculos que alimenta sistemas autorizados y análisis operacionales. Por eso no debes confundir una captura de pantalla con la fuente oficial: se consulta mediante la publicación o el sistema aprobado, se comprueba su vigencia y se usa solo dentro del alcance para el que fue emitido.",
            ],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "La ficha AD 2 del AIP",
        imagen: {
          src: "/modulos/aeropuertos/ap-02-06-ficha-ad2-oficial.webp",
          alt: "Cuatro extractos reales de la ficha AD 2 de SKBO: características físicas, distancias declaradas, luces y procedimientos de vuelo",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 24,
            y: 23,
            que: "AD 2.12",
            significa: "Características físicas de las pistas, dimensiones, superficie y PCR (Pavement Classification Rating).",
            piloto: "Compruebas que la pista y su resistencia sean compatibles con la operación prevista.",
          },
          {
            x: 75,
            y: 23,
            que: "AD 2.13",
            significa: "Distancias declaradas por cabecera: TORA, TODA, ASDA y LDA.",
            piloto: "Tomas las cifras vigentes para el cálculo; no las deduces midiendo el dibujo.",
          },
          {
            x: 24,
            y: 68,
            que: "AD 2.14",
            significa: "Luces de aproximación y de pista.",
            piloto: "Anticipas qué ayudas visuales existen y confirmas cualquier degradación en los NOTAM.",
          },
          {
            x: 75,
            y: 68,
            que: "AD 2.22",
            significa: "Procedimientos de vuelo.",
            piloto: "Revisas procedimientos locales, mínimos de despegue y condiciones de baja visibilidad que afectan la operación.",
          },
        ],
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Patrón A2",
            imagen: {
              src: "/modulos/aeropuertos/ap-02-07-patron-a2.webp",
              alt: "Fotografía didáctica del patrón A2 con dos líneas continuas del lado de espera y dos discontinuas hacia la pista",
            },
            puntos: [
              "El patrón A2 marca el punto de espera asociado a la pista. Lo reconoces por cuatro líneas amarillas: dos continuas del lado donde debes detenerte y dos discontinuas hacia la pista. Sin autorización para entrar o cruzar, paras antes de la primera línea continua y confirmas que toda la aeronave permanezca fuera del área protegida.",
            ],
          },
          {
            titulo: "Patrón B2",
            imagen: {
              src: "/modulos/aeropuertos/ap-02-08-patron-b2.webp",
              alt: "Fotografía didáctica del patrón B2 en forma de escalera, situado más lejos de la pista",
            },
            puntos: [
              "El patrón B2 es una marca intermedia en forma de escalera: dos líneas continuas unidas por travesaños. Puede proteger una zona sensible o definir un punto de espera más alejado que el A2. Si la autorización termina allí, no continúas por intuición aunque la pista todavía se vea lejos; te detienes antes de la marca y aclaras cualquier duda con ATC (Air Traffic Control).",
            ],
          },
        ],
      },
      {
        kind: "definicion",
        text: "A2: dos continuas y dos discontinuas junto a la pista. B2: dos continuas unidas como escalera en un punto más alejado.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En el briefing, antes de arrancar",
        situacion: "En la carta hay un círculo «HS 2» donde tu calle cruza otra.",
        pregunta: "¿Cuándo se revisa eso?",
        respuesta: "En el briefing, antes de arrancar. Rodando, los ojos van afuera.",
        claves: [
          "HS significa Hot Spot: el círculo ubica el punto crítico, pero la razón del riesgo está en la tabla de la misma hoja.",
          "Se revisa antes de arrancar qué conflicto existe y cuál es la ruta prevista para cruzarlo sin improvisar.",
          "Si el rodaje no cabe en la carta de aeródromo, esto se lee en el plano de movimientos en tierra.",
        ],
        imagen: {
          src: "/modulos/aeropuertos/ap-02-04-movimiento-tierra-oficial.webp",
          alt: "Plano oficial de movimiento en tierra de SKBO con puntos críticos identificados para revisarlos durante el briefing",
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
        kind: "figura",
        src: "/modulos/aeropuertos/ap-03-01-distancias-declaradas.webp",
        alt: "Vista aérea de una pista con umbral desplazado y líneas que comparan TORA, TODA, ASDA y LDA",
        ancho: 1600,
        alto: 900,
        pie: "Las cuatro distancias parten de referencias distintas. TORA (Take-Off Run Available), TODA (Take-Off Distance Available) y ASDA (Accelerate-Stop Distance Available) comienzan donde inicia la carrera de despegue: TORA termina con la pista utilizable, ASDA añade la zona de parada y TODA puede alcanzar la zona libre. LDA (Landing Distance Available), en cambio, empieza en el umbral de aterrizaje; si está desplazado, las flechas anteriores pueden servir para rodar o despegar cuando esté autorizado, pero no forman parte de la distancia disponible para aterrizar en ese sentido.",
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
            imagen: {
              src: "/modulos/aeropuertos/ap-03-03-toda-zona-libre.webp",
              alt: "Vista cenital del final de una pista y la zona libre como terreno despejado más allá del fin de TORA",
            },
            puntos: [
              "La TODA es la TORA más la zona libre publicada. Esa zona libre puede ser tierra o agua bajo control del aeródromo y debe permanecer despejada, pero no es pavimento para acelerar, frenar o rodar. En la operación, el piloto no la estima mirando la foto: usa la cifra vigente de la publicación y el cálculo aprobado de performance.",
            ],
          },
          {
            titulo: "ASDA",
            imagen: {
              src: "/modulos/aeropuertos/ap-03-04-asda-zona-parada.webp",
              alt: "Vista cenital del final de pista y una zona de parada pavimentada del mismo ancho con galones amarillos",
            },
            puntos: [
              "La ASDA es la TORA más la zona de parada publicada. Esa superficie está preparada para detener una aeronave después de un despegue rechazado; no aumenta la distancia disponible para aterrizar ni convierte la zona de parada en pista de uso normal. En una entrevista, relaciónala con la decisión de parar, no con la capacidad de continuar el despegue.",
            ],
          },
          {
            titulo: "LDA",
            imagen: {
              src: "/modulos/aeropuertos/ap-03-05-lda-umbral-desplazado.webp",
              alt: "Vista cenital de una pista con flechas blancas antes de un umbral desplazado y la LDA iniciando en la barra transversal",
            },
            puntos: [
              "La LDA es la longitud disponible para aterrizar en una dirección concreta. Si el umbral está desplazado, empieza en la barra transversal y no en el comienzo del pavimento. El tramo con flechas blancas anterior al umbral puede seguir disponible para otras operaciones publicadas, pero un aterrizaje desde ese sentido no cuenta con esos metros.",
            ],
          },
          {
            titulo: "Desde intersección",
            imagen: {
              src: "/modulos/aeropuertos/ap-03-06-salida-interseccion.webp",
              alt: "Vista aérea oblicua de una salida desde la intersección C que deja parte de la pista detrás de la aeronave",
            },
            puntos: [
              "Una salida desde intersección reduce la TORA porque la carrera empieza más adelante. Si desde cabecera hay 3 800 m y desde C quedan 2 579 m, el cálculo se hace con 2 579 m: los 1 221 m que quedaron detrás no se recuperan. Antes de aceptar, confirma la intersección, la distancia publicada y que la performance del día sea suficiente.",
            ],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "El letrero de distancia de pista restante",
        intro:
          "La fotografía es de un aeródromo estadounidense, donde el numeral son miles de pies: el 6 son 6 000 ft. Bajo la norma OACI el letrero se lee distinto, y ese es el que vas a encontrar en la región.",
        imagen: {
          src: "/modulos/aeropuertos/ap-03-07-distancia-restante.webp",
          alt: "Vista desde cabina de letreros negros con numerales blancos 6 y 5 instalados fuera del borde de la pista",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 92,
            y: 47,
            que: "Numeral blanco sobre negro",
            significa: "Cuenta los tramos que quedan: el 6 son seis tramos, unos 1 800 m. En la foto, estadounidense, el mismo 6 son 6 000 ft.",
            piloto: "Es una referencia visual; no sustituye la distancia declarada usada en performance.",
          },
          {
            x: 62,
            y: 36,
            que: "Separación",
            significa: "Los letreros van cada 300 m, con una tolerancia de 30 m, a lo largo de toda la pista.",
            piloto: "La secuencia te ayuda a mantener conciencia de cuánta pista queda durante la carrera.",
          },
          {
            x: 88,
            y: 55,
            que: "Ubicación",
            significa: "Se instala fuera de la línea blanca de borde, a uno o a ambos lados.",
            piloto: "No confundas el letrero con una marca dentro del pavimento.",
          },
          {
            x: 95,
            y: 51,
            que: "Altura",
            significa: "Es bajo y frangible para reducir el riesgo si una aeronave se desvía.",
            piloto: "Su diseño no cambia el significado del numeral.",
          },
          {
            x: 79,
            y: 53,
            que: "Señal de borde",
            significa: "Línea blanca continua.",
            piloto: "El letrero permanece completamente fuera del pavimento de pista.",
          },
        ],
      },
      {
        kind: "p",
        text: "El numeral no son metros ni kilómetros: cuenta tramos. Los letreros se reparten a lo largo de toda la pista cada 300 m, así que un 6 son seis tramos, unos 1 800 m restantes. Es un letrero nuevo en la norma OACI desde el 27 de noviembre de 2025, y todavía no está en todas partes. Donde manda la reglamentación estadounidense el mismo letrero cuenta miles de pies, y un 6 son 6 000 ft: si vuelas a ese espacio aéreo, comprueba cuál de las dos lecturas aplica. En cualquiera de los dos casos, úsalo para mantener conciencia situacional durante la carrera y toma la decisión con la performance calculada y las distancias publicadas.",
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
        imagen: {
          src: "/modulos/aeropuertos/ap-03-08-briefing-interseccion.webp",
          alt: "Dos pilotos verifican en cabina la TORA de 2 579 m disponible desde la intersección C antes de aceptar la salida",
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
        kind: "figura",
        src: "/modulos/aeropuertos/ap-04-01-envergadura-clave.webp",
        alt: "Tres aviones comerciales vistos desde arriba, de envergadura creciente y clasificados con las letras C, D y E",
        ancho: 1600,
        alto: 900,
        pie: "La letra de clave se obtiene midiendo de una punta de ala a la otra: C cubre de 24 a menos de 36 m; D, de 36 a menos de 52 m; y E, de 52 a menos de 65 m. Esa letra ayuda a dimensionar calles, márgenes y separaciones, pero no garantiza por sí sola que una ruta esté disponible hoy: una restricción publicada o un letrero de envergadura máxima puede exigir otra calle.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-04-02-codigo-referencia.webp",
        alt: "Tabla didáctica del código de referencia del aeródromo: número por longitud de campo de referencia, letra por envergadura y OMGWS como medida independiente",
        ancho: 1600,
        alto: 900,
        pie: "El código tiene dos elementos: el número sale de la longitud de campo de referencia del avión y la letra de la envergadura. La OMGWS (Outer Main Gear Wheel Span), o anchura exterior del tren principal, se verifica aparte para dimensionar calles, curvas y márgenes. Ninguno de estos datos sustituye la distancia disponible, la resistencia del pavimento ni una restricción operacional vigente.",
      },
      {
        kind: "p",
        text: "El código de referencia del aeródromo combina un número asociado a la longitud de campo de referencia del avión y una letra asociada a su envergadura. La anchura exterior del tren principal —OMGWS (Outer Main Gear Wheel Span)— ya no determina esa letra, pero sigue siendo una medida propia para diseñar calles, curvas y márgenes. El código relaciona infraestructura y avión; no autoriza por sí solo una operación. Un aeropuerto 4F puede tener una calle temporalmente limitada a 65 m, de modo que la publicación vigente, el letrero y la autorización de control siguen mandando sobre la etiqueta de diseño.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "La letra la manda la envergadura",
            imagen: {
              src: "/modulos/aeropuertos/ap-04-03-envergadura-punta-a-punta.webp",
              alt: "Avión comercial visto desde arriba con una línea menta que mide la envergadura de punta de ala a punta de ala",
            },
            puntos: [
              "La cota se toma entre las dos puntas de ala, no entre motores ni entre trenes.",
              "Desde la revisión de 2018, la letra del código depende únicamente de la envergadura.",
              "Una envergadura de 60 m corresponde a la letra E: desde 52 m hasta menos de 65 m.",
            ],
          },
          {
            titulo: "El tren va aparte",
            imagen: {
              src: "/modulos/aeropuertos/ap-04-04-omgws-tren-principal.webp",
              alt: "Vista superior del tren principal de un avión con la anchura OMGWS medida entre los bordes exteriores de las ruedas",
            },
            puntos: [
              "La OMGWS se mide de borde exterior a borde exterior de las ruedas principales.",
              "No se mide entre centros de rueda y no cambia la letra asignada por envergadura.",
              "Durante el rodaje, la cabina sigue el eje; por eso la rueda exterior y el margen de pavimento siguen siendo críticos.",
            ],
          },
          {
            titulo: "El letrero naranja",
            imagen: {
              src: "/modulos/aeropuertos/ap-04-05-letrero-max-span.webp",
              alt: "Vista desde cabina de un letrero naranja junto a una calle de rodaje con la restricción MAX SPAN 65 m",
            },
            puntos: [
              "Negro sobre naranja advierte una condición fuera de servicio o una restricción temporal en el área de movimiento.",
              "MAX SPAN 65 m significa que una aeronave con mayor envergadura no debe continuar por esa ruta.",
              "El letrero debe estar fuera del pavimento, ser frangible y coincidir con la información publicada.",
            ],
          },
          {
            titulo: "El aviso publicado manda",
            imagen: {
              src: "/modulos/aeropuertos/ap-04-08-briefing-restriccion.webp",
              alt: "Dos pilotos revisan antes del vuelo una restricción de envergadura y la ruta alterna publicada para el rodaje",
            },
            puntos: [
              "La tripulación revisa la restricción vigente antes de aceptar la ruta de rodaje.",
              "La calle afectada, la envergadura máxima y la ruta alterna deben coincidir con el letrero del terreno.",
              "Si el avión supera el límite o la información no coincide, la ruta se aclara antes de mover la aeronave.",
            ],
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
        imagen: {
          src: "/modulos/aeropuertos/ap-04-06-aviso-restriccion-calle.webp",
          alt: "Tableta de cabina con un aviso operacional que restringe la calle B a una envergadura máxima de 65 m y ofrece la calle C como ruta alterna",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 50,
            y: 31,
            que: "Calle afectada",
            significa: "TWY B identifica la calle donde aplica la limitación.",
            piloto: "Confirma que esa calle forma parte de tu autorización de rodaje.",
          },
          {
            x: 52,
            y: 38,
            que: "La restricción",
            significa: "MAX SPAN 65 M fija la envergadura máxima admisible.",
            piloto: "Compárala con la envergadura real de tu aeronave, no con su letra de clave.",
          },
          {
            x: 58,
            y: 53,
            que: "Fechas y horas",
            significa: "Indican el comienzo y el final de la vigencia en UTC.",
            piloto: "Comprueba la hora operacional; no des por vencido un aviso sin verificar la publicación actual.",
          },
          {
            x: 55,
            y: 47,
            que: "La ruta alterna",
            significa: "TWY C ofrece una ruta compatible alrededor de la restricción.",
            piloto: "Solicita y confirma esa ruta antes de desviarte de la autorización recibida.",
          },
        ],
      },
      {
        kind: "p",
        text: "El aviso publicado aporta alcance, límite y vigencia; el letrero protege el punto donde la restricción se vuelve operativa. Ambos deben contar la misma historia. Si la publicación, el letrero o la autorización de control no coinciden, detén el rodaje en una posición segura y aclara la ruta antes de continuar.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Rodando hacia la intersección",
        situacion: "Vas a un aeropuerto 4F con 70 m de envergadura. Un letrero dice «MAX SPAN 65 m».",
        pregunta: "¿Qué manda?",
        respuesta: "El letrero y el aviso que lo respalda. La clave planifica; la restricción manda hoy.",
        claves: [
          "La letra F cubre de 65 m a menos de 80 m: dice cómo se diseñó el aeródromo, no qué está abierto hoy.",
          "Negro sobre naranja identifica una condición fuera de servicio o una restricción temporal del área de movimiento.",
          "El letrero complementa la publicación vigente; si difieren, detén el rodaje y aclara con control.",
        ],
        imagen: {
          src: "/modulos/aeropuertos/ap-04-07-decision-max-span.webp",
          alt: "Cabina de un avión de 70 m de envergadura ante una señal MAX SPAN 65 m, con la calle C indicada como ruta alterna",
        },
      },
    ],
  },
]
