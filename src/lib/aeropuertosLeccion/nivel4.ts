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
        kind: "figura",
        src: "/modulos/aeropuertos/ap-13-01-luces-pista.webp",
        alt: "Vista aérea nocturna de una pista con umbral verde, bordes blancos, eje codificado y extremo rojo señalados",
        ancho: 1600,
        alto: 900,
        pie: "La fila verde identifica el umbral visto desde la aproximación: desde allí comienza la superficie disponible para aterrizar. Las filas blancas laterales muestran los bordes y permiten percibir anchura y alineación. El eje empieza blanco y cambia a rojo y blanco, y después a rojo, para advertir que el extremo se aproxima; la fila roja transversal confirma el final. Si el patrón no coincide con la pista publicada, no acomodes mentalmente las luces: verifica la identificación o frustra la aproximación.",
      },
      {
        kind: "p",
        text: "De noche la pista se reconoce por el patrón completo de sus luces, no por un punto brillante aislado. El umbral verde, el extremo rojo, las filas blancas de borde y el eje codificado permiten confirmar dirección, anchura y distancia restante. En una aproximación, una configuración que no coincide con la carta es motivo para verificar o frustrar; no se corrige la identificación acomodando mentalmente las luces que faltan.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-13-02-final-nocturna.webp",
        alt: "Corta final nocturna desde cabina: umbral verde, bordes y eje blancos, barretas simétricas y PAPI con dos luces blancas y dos rojas",
        ancho: 1600,
        alto: 900,
        pie: "La fila verde señala el inicio de la superficie disponible para aterrizar en esta dirección; no significa que debas tocar allí. Las luces blancas de borde y eje ayudan a comprobar alineación, y las barretas blancas identifican la zona de toma de contacto. A la izquierda, dos luces blancas y dos rojas del PAPI (Precision Approach Path Indicator) indican que estás cerca de su senda nominal. La tripulación mantiene la aproximación estabilizada y compara el patrón con la pista y el procedimiento previstos.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Borde",
            imagen: {
              src: "/modulos/aeropuertos/ap-13-03-borde-blanco-amarillo.webp",
              alt: "Fotografía nocturna de luces blancas de borde de pista que cambian a amarillo hacia el extremo lejano",
            },
            puntos: [
              "Las dos filas delimitan la pista utilizable. Según la referencia EASA (European Union Aviation Safety Agency), las luces se separan como máximo 60 m en pista por instrumentos y 100 m en visual; pueden estar hasta 3 m fuera del borde. Vistas en dirección de despegue, las del último tramo pueden ser amarillas: un aviso visual de que se acerca el extremo, no una nueva calle de rodaje.",
            ],
          },
          {
            titulo: "Umbral",
            imagen: {
              src: "/modulos/aeropuertos/ap-13-04-umbral-verde.webp",
              alt: "Umbral de pista visto de frente con fila transversal verde y barras de ala verdes a ambos lados",
            },
            puntos: [
              "La fila verde, vista desde la aproximación, identifica el inicio del tramo disponible para aterrizar. Cuando se instalan barras de ala, los grupos verdes a ambos lados hacen más reconocible el umbral, en especial si está desplazado. Confirma el punto de entrada con la carta y sigue hacia la zona de toma de contacto prevista.",
            ],
          },
          {
            titulo: "Extremo",
            imagen: {
              src: "/modulos/aeropuertos/ap-13-05-extremo-rojo.webp",
              alt: "Eje rojo y fila roja transversal que termina la pista; más allá, dos hileras rojas delimitan una zona de parada",
            },
            puntos: ["La fila transversal roja marca el final de la pista en esta dirección. Si hay una zona de parada más allá, sus luces rojas la delimitan, pero no la convierten en pista utilizable para un aterrizaje normal. Al ver el eje rojo y luego esa fila, confirma la distancia restante y la salida o detención prevista."],
          },
          {
            titulo: "Toma de contacto",
            imagen: {
              src: "/modulos/aeropuertos/ap-13-09-zona-toma-contacto.webp",
              alt: "Pares de barretas blancas a ambos lados del eje en una zona de toma de contacto iluminada",
            },
            puntos: [
              "Los pares de barretas blancas identifican la zona de toma de contacto en una pista de precisión equipada para ello. No ordenan poner el tren sobre una barreta: el punto real se determina con la trayectoria estabilizada, la referencia de apuntado y la distancia de aterrizaje calculada. Si la toma se desplaza más allá de lo previsto, aplica el procedimiento del operador; no persigas las últimas luces.",
            ],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Una pista de categoría III, de noche, desde el eje",
        imagen: {
          src: "/modulos/aeropuertos/ap-13-06-reconoce-pista.webp",
          alt: "Vista nocturna de pista de precisión con bordes blancos, eje blanco y rojo, barretas blancas y fila roja del extremo",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 91,
            y: 43,
            que: "Luces de borde, blancas",
            significa: "Delimitan ambos lados de la pista.",
            piloto: "Compruebas la alineación con el patrón completo, no deduces una salida de pista por perder una luz aislada.",
          },
          {
            x: 50,
            y: 60,
            que: "Luces de eje, blancas",
            significa: "Aportan una referencia longitudinal antes del tramo de aviso final.",
            piloto: "Mantienes la alineación y sigues evaluando la distancia disponible con la operación prevista.",
          },
          {
            x: 73,
            y: 49,
            que: "Barretas de zona de toma de contacto",
            significa: "Los pares blancos muestran la zona preparada para la toma.",
            piloto: "Vigila el punto real de toma; las luces no sustituyen la referencia de apuntado ni los criterios de aterrizaje.",
          },
          {
            x: 50,
            y: 24,
            que: "Eje rojo",
            significa: "En la parte final del eje iluminado, el rojo marca los últimos 300 m.",
            piloto: "Confirma que la deceleración y la salida prevista siguen siendo realistas; no lo confundas con el fin mismo.",
          },
          {
            x: 50,
            y: 13,
            que: "Fila roja del extremo",
            significa: "Marca el final de la pista disponible en esta dirección.",
            piloto: "No cuentes una eventual zona de parada como longitud de aterrizaje.",
          },
        ],
      },
      {
        kind: "p",
        text: "Cuando la pista tiene luces de eje, la secuencia también orienta sobre la distancia hasta el extremo: blancas antes de los últimos 900 m, rojas y blancas alternadas entre 900 y 300 m, y rojas en los últimos 300 m. En una pista de menos de 1 800 m, la alternancia comienza en el punto medio. Por ejemplo, durante la carrera de aterrizaje, ver rojo bajo la nariz no significa que la pista ya terminó, sino que quedan aproximadamente 300 m o menos: una referencia para contrastar con la deceleración y el plan de salida, no para improvisar una frenada.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-13-07-secuencia-eje.webp",
        alt: "Esquema del eje luminoso: blanco hasta 900 metros del extremo, rojo y blanco alternados hasta 300 metros y rojo al final; en pista corta alterna desde la mitad",
        ancho: 1600,
        alto: 900,
        pie: "Las cotas se miden hacia atrás desde el final de la pista. El cambio a rojo y blanco avisa del tramo final; las luces totalmente rojas ocupan los últimos 300 m. En pistas de menos de 1 800 m, el tramo alternado empieza en la mitad. Es un esquema didáctico: el piloto consulta la longitud publicada y usa el patrón como confirmación visual, no como sustituto de los cálculos de aterrizaje.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Rodando hacia el extremo, de noche",
        situacion:
          "Aterrizaste de noche en una pista sin salida de rodaje cerca de la cabecera. Rodando hacia el extremo, el eje que sigues se pone rojo y adelante ves que unas luces verdes se curvan hacia un ensanche del pavimento a la derecha.",
        pregunta: "¿Qué son esas luces verdes y qué te están diciendo?",
        respuesta:
          "Son luces de la plataforma de viraje de pista. La curva verde guía hacia el espacio ensanchado donde se puede completar el giro de 180 grados; no es una calle de rodaje lateral. Esas luces verdes son fijas y unidireccionales, visibles desde la aeronave que se aproxima a la plataforma. Las luces rojas del eje indican que estás en los últimos 300 m, así que reduces la velocidad y sigues el procedimiento de viraje y las instrucciones de control aplicables; no giras solo por ver verde.",
        claves: [
          "Verdes, fijas y unidireccionales: solo las ve el avión que va hacia la plataforma.",
          "Van sobre la señal de viraje o desplazadas 30 cm como máximo.",
          "El eje rojo es la confirmación de los últimos 300 m.",
        ],
        imagen: {
          src: "/modulos/aeropuertos/ap-13-08-plataforma-viraje.webp",
          alt: "Vista desde cabina de eje rojo en los últimos metros de pista y luces verdes que guían hacia la plataforma de viraje a la derecha",
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
        kind: "figura",
        src: "/modulos/aeropuertos/ap-14-01-luces-rodaje.webp",
        alt: "Nudo de calles de rodaje nocturno con eje verde, bordes azules, barra de parada roja y luces amarillas de advertencia",
        ancho: 1600,
        alto: 900,
        pie: "Las luces verdes marcan el eje que debes seguir y las azules delimitan los bordes de la calle, pero ninguna sustituye la autorización. Las luces amarillas llaman la atención sobre la proximidad de la pista. La barra roja encendida es una orden visual de detenerse: aunque una transmisión parezca autorizar el cruce, no la atravieses hasta que se apague y la autorización sea inequívoca. Observa también que el eje verde no continúa encendido inmediatamente después de la barra.",
      },
      {
        kind: "p",
        text: "En rodaje los colores ayudan a separar guía, límite, advertencia y detención. El eje verde orienta la ruta, el borde azul delimita la calle y las luces amarillas anuncian un punto que exige atención. Una barra roja encendida es una orden visual de detenerse aunque la autorización verbal parezca permitir el cruce: se para y se informa al control antes de continuar.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-14-02-eje-bordes.webp",
        alt: "Calle recta de noche desde cabina con luces verdes sobre el eje y luces azules en los dos bordes",
        ancho: 1600,
        alto: 900,
        pie: "En esta calle recta, las luces verdes empotradas siguen el eje pintado de amarillo; las azules, elevadas, ayudan a distinguir ambos bordes. Es una guía para mantener la trayectoria de rodaje, no una autorización para entrar en cualquier tramo que aparezca iluminado. Compara el recorrido con la carta, las señales y la instrucción de control.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Barra de parada",
            imagen: {
              src: "/modulos/aeropuertos/ap-14-03-barra-parada.webp",
              alt: "Barra de parada roja que cruza toda la calle, reforzada por luces rojas elevadas en ambos extremos",
            },
            puntos: [
              "La fila roja atraviesa la calle en el lugar donde debes detenerte. Puede tener luces elevadas en los extremos para verse mejor desde cabina. Si está encendida, no la cruces aunque la radio parezca autorizarlo: detente, confirma con control y espera a que se apague. Las luces verdes después de la barra también deben permanecer apagadas.",
            ],
          },
          {
            titulo: "Luces de protección de pista",
            imagen: {
              src: "/modulos/aeropuertos/ap-14-04-proteccion-a-b.webp",
              alt: "Esquema en planta: protección de pista A con dos pares amarillos a los lados y B con una fila amarilla transversal",
            },
            puntos: [
              "Las luces amarillas intermitentes advierten que estás llegando a una pista. La configuración A tiene dos pares a los lados; la B, una fila transversal. Ninguna permite ingresar por sí sola: identifica el punto de espera y confirma la autorización. La configuración B no se coloca en el mismo sitio que una barra de parada.",
            ],
          },
          {
            titulo: "Salida verde y amarilla",
            imagen: {
              src: "/modulos/aeropuertos/ap-14-05-salida-verde-amarilla.webp",
              alt: "Salida nocturna de pista con luces del eje alternadas verdes y amarillas cerca de la pista y verdes más adelante",
            },
            puntos: [
              "En una salida equipada así, las luces verdes y amarillas alternadas señalan el tramo próximo a la pista y a su área protegida; más adelante el eje queda verde. No declares la pista libre solo porque apareció una luz verde: confirma que todo el avión superó el punto de espera y cualquier límite aplicable a la operación.",
            ],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Llegando al punto de espera de la pista, de noche",
        imagen: {
          src: "/modulos/aeropuertos/ap-14-06-reconoce-luces.webp",
          alt: "Vista nocturna desde cabina con eje verde, bordes azules, protección amarilla a los lados y barra de parada roja",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 51,
            y: 56,
            que: "Eje verde",
            significa: "Guía la trayectoria por el centro de esta calle.",
            piloto: "Síguelo solo por la ruta autorizada; la luz no sustituye la instrucción de control.",
          },
          {
            x: 22,
            y: 44,
            que: "Borde azul",
            significa: "Ayuda a reconocer el borde de la calle de rodaje.",
            piloto: "Úsalo para vigilar tu posición lateral; no infieras el margen exacto del tren a partir de una sola luz.",
          },
          {
            x: 36,
            y: 26,
            que: "Amarillas destellando a los lados",
            significa: "Luces de protección de pista.",
            piloto: "Te alertan de la proximidad de la pista; localiza el punto de espera y verifica la autorización.",
          },
          {
            x: 50,
            y: 30,
            que: "Barra roja",
            significa: "Barra de parada.",
            piloto: "Detente antes de la fila roja encendida y aclara cualquier autorización contradictoria.",
          },
        ],
      },
      {
        kind: "p",
        text: "En la foto de reconocimiento, el eje verde orienta la ruta y el borde azul ayuda a mantener el avión dentro de la calle. Los pares amarillos advierten que se acerca una pista; la fila roja encendida indica el lugar donde debes detenerte. Antes de seguir, comprueba la ruta autorizada, el punto de espera y el estado de la barra: ninguna luz verde ni amarilla reemplaza una autorización clara.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-14-07-tres-advertencias.webp",
        alt: "Esquema de tres sistemas distintos: tres luces amarillas de espera intermedia, rojas de entrada a pista y dos filas rojas de espera de despegue",
        ancho: 1600,
        alto: 900,
        pie: "Las tres amarillas fijas atraviesan una calle en un punto de espera intermedio y no equivalen a una barra roja. En aeropuertos que cuentan con luces de estado de pista, las luces rojas de entrada REL (Runway Entrance Lights) siguen un lado del eje de la calle; las luces de espera de despegue THL (Take-off Hold Lights) aparecen en pares a ambos lados del eje de pista. Si las REL están encendidas, no entres en la pista; si se encienden las THL, no inicies la carrera. Informa al control. El esquema diferencia sistemas; no significa que todos estén instalados en cada aeropuerto.",
      },
      {
        kind: "p",
        text: "Verde guía el eje y azul ayuda a reconocer el borde; ninguno autoriza a avanzar. Amarillo puede advertir la proximidad de una pista o señalar una espera intermedia: el patrón y la ubicación importan. Una barra roja encendida detiene el rodaje. La especificación europea usa 350 m de RVR (Runway Visual Range, alcance visual en pista) para ciertos requisitos de luces de eje y espera intermedia; no conviertas ese umbral de diseño en una regla universal para todas las pistas. Consulta el equipamiento publicado y los procedimientos del aeropuerto.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En carrera de aterrizaje",
        situacion:
          "Acabas de aterrizar de noche. Mientras frenas, ves aparecer a tu derecha tres juegos de luces amarillas empotradas en la pista, separados entre sí, y el último queda cerca de una salida.",
        pregunta: "¿Qué te están contando esas luces amarillas?",
        respuesta:
          "Son luces indicadoras de salida rápida RETIL (Rapid Exit Taxiway Indicator Lights). En la pista equipada, las tres, luego dos y finalmente una luz amarilla aparecen del mismo lado del eje que la salida; cada grupo te acerca 100 m al punto donde comienza la curva. Sirven para anticipar el frenado, no para improvisar la velocidad ni para cambiar de salida sin coordinación con control.",
        claves: [
          "Los grupos 3–2–1 se separan 100 m; el último queda 100 m antes del inicio de la curva.",
          "Van siempre del mismo lado del eje que la calle de salida rápida.",
          "Confirma la salida asignada y su velocidad compatible con el avión y la pista.",
        ],
        imagen: {
          src: "/modulos/aeropuertos/ap-14-08-salida-rapida.webp",
          alt: "Vista nocturna desde cabina con tres, dos y una luces amarillas junto al eje de pista antes de una salida rápida a la derecha",
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
        kind: "figura",
        src: "/modulos/aeropuertos/ap-15-01-aproximacion-papi.webp",
        alt: "Aproximación nocturna con sistema de luces, barras transversales, umbral verde y PAPI de tres blancas y una roja",
        ancho: 1600,
        alto: 900,
        pie: "La línea central del sistema de aproximación lleva la mirada hacia el eje antes de que las señales pintadas sean fáciles de distinguir. Sus barras transversales aportan referencias de anchura y distancia; no son umbrales. La fila verde sí marca el umbral. A la izquierda, el PAPI (Precision Approach Path Indicator, indicador de trayectoria de aproximación de precisión) muestra tres blancas y una roja: la aeronave está ligeramente alta. El piloto corrige de forma estabilizada y compara la referencia visual con los instrumentos y el procedimiento publicado.",
      },
      {
        kind: "p",
        text: "Antes de distinguir las señales pintadas, el sistema de aproximación ayuda a encontrar y alinear la pista, mientras el PAPI permite comprobar la relación angular con la senda visual. Son funciones distintas: los destellos y la línea central llevan la mirada hacia el umbral; la combinación roja y blanca indica si estás alto o bajo. El piloto la compara con los instrumentos y con la información publicada, especialmente de noche o con referencias visuales degradadas.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-15-02-papi.webp",
        alt: "Vista desde cabina en final con una flecha verde menta que señala las cuatro cajas del PAPI, dos blancas y dos rojas",
        ancho: 1600,
        alto: 900,
        pie: "El PAPI se reconoce como una fila de cuatro cajas junto a la pista. Dos blancas y dos rojas indican que el avión está en la senda visual; más blancas significan alto y más rojas, bajo.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Los tres sistemas de aproximación",
            imagen: {
              src: "/modulos/aeropuertos/ap-15-03-sistemas-aproximacion.webp",
              alt: "Esquema a escala de tres sistemas de luces de aproximación: sencillo de 420 metros, precisión categoría I de 900 metros y categorías II/III con filas rojas laterales",
            },
            puntos: [
              "El sencillo llega aproximadamente 420 m antes del umbral; los de precisión, 900 m. En la configuración mostrada, la barra blanca a 300 m ayuda a reconocer la distancia y las filas rojas cercanas al umbral distinguen el sistema de categorías II y III. Identifica el patrón real en la carta publicada: estas luces ayudan a alinearte, pero no indican si estás alto o bajo.",
            ],
          },
          {
            titulo: "PAPI",
            imagen: {
              src: "/modulos/aeropuertos/ap-15-04-lectura-papi.webp",
              alt: "Cinco lecturas correctas de un PAPI de cuatro luces, de cuatro blancas a cuatro rojas, y lectura en senda del APAPI de dos luces",
            },
            puntos: [
              "Reconoces el PAPI por cuatro luces a un lado de la pista: dos blancas y dos rojas señalan la senda visual; más blancas indican alto y más rojas, bajo. El APAPI (Abbreviated Precision Approach Path Indicator) usa dos luces; una blanca y una roja indican su senda. Compara cualquier corrección con la aproximación estabilizada y los instrumentos: ni el PAPI ni el APAPI sustituyen los mínimos publicados.",
            ],
          },
          {
            titulo: "Las otras tres",
            imagen: {
              src: "/modulos/aeropuertos/ap-15-05-otras-ayudas.webp",
              alt: "Tres esquemas separados: destellos blancos para identificar el umbral, grupos de luces de entrada y luces que guían una maniobra de circuito",
            },
            puntos: [
              "Dos destellos blancos a los lados ayudan a localizar el umbral; no lo desplazan. Grupos de destellos pueden marcar una ruta de entrada cuando el terreno exige una trayectoria particular: sigue solo la ruta publicada y autorizada. Las luces de circuito ayudan a ubicar la pista durante esa maniobra; no te dan pendiente. Comprueba cuáles de estas ayudas tiene el aeropuerto antes de depender de ellas.",
            ],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Un sistema de categorías II y III visto en final",
        imagen: {
          src: "/modulos/aeropuertos/ap-15-06-reconoce-aproximacion.webp",
          alt: "Aproximación nocturna desde cabina con eje de luces blancas, barra de 300 metros, filas laterales rojas, umbral verde y PAPI a la izquierda",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 57,
            y: 62,
            que: "Fila central de luces blancas",
            significa: "Es el eje prolongado de la pista.",
            piloto: "Si la ves torcida, estás descentrado.",
          },
          {
            x: 58,
            y: 34,
            que: "Filas laterales rojas",
            significa: "Identifican la zona próxima al umbral de este sistema de precisión de categorías II y III.",
            piloto: "Reconoce la configuración publicada; su presencia te confirma que estás cerca del umbral, no una altitud segura por sí sola.",
          },
          {
            x: 61,
            y: 53,
            que: "Barra transversal ancha",
            significa: "En esta configuración, es la barra a 300 m del umbral.",
            piloto: "Te da una referencia transversal y de distancia mientras verificas la alineación con el eje.",
          },
          {
            x: 43,
            y: 27,
            que: "PAPI a la izquierda",
            significa: "Las cuatro luces blancas y rojas indican posición respecto a la senda visual.",
            piloto: "Lee el patrón de colores y compáralo con instrumentos y procedimiento; no infieras la pendiente de las barras blancas.",
          },
          {
            x: 56,
            y: 29,
            que: "Fila verde",
            significa: "El umbral.",
            piloto: "Reconoce dónde empieza la pista utilizable para aterrizar; comprueba la distancia publicada antes de la aproximación.",
          },
        ],
      },
      {
        kind: "p",
        text: "En la fotografía, el eje blanco y las barras transversales muestran la alineación; la fila verde marca el umbral y las filas rojas pertenecen al tramo cercano de esta configuración de precisión. El PAPI aporta una referencia distinta: la posición angular respecto a la senda visual. Si un aeropuerto tiene destellos secuenciales, ayudan a encontrar el sistema, pero tampoco sustituyen la guía vertical, los instrumentos ni los mínimos publicados.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-15-07-dos-preguntas.webp",
        alt: "Comparación: las luces blancas de aproximación y el umbral verde ayudan a alinearse; la combinación roja y blanca del PAPI indica si se está alto, en senda o bajo",
        ancho: 1600,
        alto: 900,
        pie: "Son dos preguntas diferentes en corta final. El eje blanco, las barras y el umbral verde ayudan a ubicar y alinear la pista, pero no dan la pendiente. El PAPI o APAPI muestra alto, en senda o bajo mediante luces blancas y rojas. Usa ambas referencias junto con los instrumentos y la aproximación publicada; no persigas una luz aislada ni confundas alineación con altura segura.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En el briefing de aproximación",
        situacion:
          "Vuelas a un aeropuerto donde levantaron una grúa a un costado de la aproximación. El PAPI sigue publicado, pero el NOTAM dice que está fuera de servicio, y el resto de las luces funciona.",
        pregunta: "¿Por qué apagarían el PAPI si la grúa no está en la pista?",
        respuesta:
          "El PAPI tiene una superficie de protección contra obstáculos en la aproximación. Una grúa que la comprometa exige una evaluación y una medida: retirar el obstáculo, ajustar la pendiente o el sector visible, o modificar el emplazamiento, según el caso. No significa que cualquier penetración lleve necesariamente al avión contra la grúa. Aquí el NOTAM declara el PAPI fuera de servicio: no lo uses como guía. Aplica el procedimiento y los mínimos vigentes; si no tienes las referencias requeridas o la aproximación deja de estar estabilizada, ejecuta la aproximación frustrada.",
        claves: [
          "La superficie protegida se extiende por la aproximación, delante del umbral, no detrás del PAPI.",
          "Una grúa en esa zona requiere evaluación y medidas publicadas; no se supone automáticamente una colisión.",
          "Si el NOTAM declara el PAPI fuera de servicio, no lo sigas y usa el procedimiento aplicable.",
        ],
        imagen: {
          src: "/modulos/aeropuertos/ap-15-08-obstaculo-papi.webp",
          alt: "Corte esquemático de una aproximación con grúa que compromete la superficie de protección del PAPI, mostrado apagado junto al umbral",
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
        kind: "figura",
        src: "/modulos/aeropuertos/ap-16-01-faro-obstaculo.webp",
        alt: "Aeródromo nocturno con faro verde y blanco, y una torre marcada con varios niveles de luces rojas de obstáculo",
        ancho: 1600,
        alto: 900,
        pie: "El faro verde y blanco ayuda a localizar el aeródromo en el entorno nocturno, pero no confirma por sí solo qué pista está disponible ni cuál es su orientación. Las luces rojas distribuidas en varios niveles hacen visible la altura y extensión de la torre: señalan un obstáculo, no una ruta de vuelo. El piloto identifica ambos patrones y los contrasta con la carta, las luces de pista y la autorización antes de tomar una decisión.",
      },
      {
        kind: "p",
        text: "Hay luces que ayudan a localizar el aeródromo y otras que hacen visible un obstáculo. El faro confirma la ubicación general, pero no identifica por sí solo una pista utilizable; las luces de obstáculo muestran altura y extensión de estructuras que pueden confundirse con el fondo urbano. En aproximación o rodaje, el piloto interpreta el patrón y lo contrasta con la carta en vez de perseguir la luz más intensa.",
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
              "Tres intensidades. Las bajas son rojas, salvo las amarillas y azules de los vehículos. Las medias pueden ser el estrobo blanco o rojas; las altas son siempre el estrobo blanco. Importa reconocer el patrón publicado.",
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
            piloto: "Hasta esa altura baja el cable entre las torres.",
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
        kind: "figura",
        src: "/modulos/aeropuertos/ap-17-01-luces-fuera-servicio.webp",
        alt: "Pista nocturna con dos luces consecutivas de borde apagadas y la ruptura de continuidad señalada",
        ancho: 1600,
        alto: 900,
        pie: "Una fila de luces funciona como patrón, no como suma de puntos aislados. Dos luces contiguas apagadas crean un hueco que rompe la continuidad y puede deformar la percepción del borde, aunque el porcentaje total de luces en servicio todavía parezca alto. La tripulación no calcula la disponibilidad desde la cabina: confirma la condición mediante ATIS, NOTAM o control y la aplica a los mínimos y procedimientos del operador.",
      },
      {
        kind: "p",
        text: "Una instalación puede conservar un porcentaje de luces en servicio y aun así perder la forma visual que necesita el piloto. Por eso la norma combina porcentajes, distribución y tiempo de conmutación: dos luces contiguas apagadas pueden romper una fila aunque el total parezca aceptable. En operación, la tripulación no calcula esos porcentajes desde la cabina; recibe la condición por ATIS, NOTAM o control y decide con los mínimos y procedimientos del operador.",
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
            "Indicador de pendiente, borde y umbral, solo si la aproximación se hace sobre terreno peligroso o escarpado",
            "Todo lo demás: sistema de aproximación, indicador de pendiente, borde, umbral, extremo y obstáculos",
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
            significa: "En una fila de borde no se admite en ningún nivel de servicio.",
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
            significa: "En categorías II y III pide el 95 %, igual que el borde y el umbral.",
            piloto: "Con la visibilidad mínima, es tu guía en la carrera.",
          },
        ],
      },
      {
        kind: "p",
        text: "Hay una regla que manda sobre los porcentajes: nunca dos luces contiguas apagadas, salvo dentro de una barreta o de una barra transversal. Dos apagadas seguidas abren un hueco en el patrón, y un hueco se lee como una curva o como el borde de la pista donde no lo hay.",
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
