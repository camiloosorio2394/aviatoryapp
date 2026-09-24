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
              "Las dos filas delimitan la pista utilizable. Se separan como máximo 60 m en pista por instrumentos y 100 m en pista visual, y pueden quedar hasta 3 m por fuera del borde. Vistas en dirección de despegue, las del último tramo pueden ser amarillas: un aviso visual de que se acerca el extremo, no una nueva calle de rodaje.",
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
        text: "Verde guía el eje y azul ayuda a reconocer el borde; ninguno autoriza a avanzar. Amarillo puede advertir la proximidad de una pista o señalar una espera intermedia: el patrón y la ubicación importan. Una barra roja encendida detiene el rodaje. Las luces de eje de calle de rodaje se exigen cuando la calle está prevista para operar con una RVR (Runway Visual Range, alcance visual en pista) menor de 300 m; por encima de esa cifra son recomendadas, y algunos Estados fijan umbrales propios. Consulta el equipamiento publicado y los procedimientos del aeropuerto.",
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
        pie: "En este ejemplo, los destellos verdes y blancos del faro ayudan a localizar el aeródromo de noche; algunos faros de aeródromo también pueden emitir solo blanco. Ninguno confirma por sí solo qué pista está disponible. Las luces rojas distribuidas en varios niveles señalan una torre como obstáculo, no una ruta de vuelo. El piloto contrasta ambos patrones con la carta, las luces de pista y la autorización antes de decidir.",
      },
      {
        kind: "p",
        text: "Hay luces para encontrar el aeródromo y otras para advertir de un obstáculo. Un faro da una ubicación general, pero no identifica por sí solo una pista utilizable; las luces de obstáculo revelan estructuras que pueden perderse entre las luces de la ciudad. En aproximación o rodaje, interpreta el patrón completo y compáralo con la carta, en vez de perseguir la luz más intensa.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-16-02-faro-cercano.webp",
        alt: "Faro giratorio en el borde de un aeropuerto terrestre, con lente verde iluminada y lente blanca opuesta frente a hangares al anochecer",
        ancho: 1600,
        alto: 900,
        pie: "El cabezal giratorio tiene lentes opuestas; la foto captura el momento en que se ve la verde. En esta configuración, al girar alterna destellos verdes y blancos, normalmente de 20 a 30 destellos por minuto. Sirve para ubicar el aeródromo, no para elegir pista o aproximación. La foto no permite medir la frecuencia: confirma la instalación y la operación con la información publicada.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Faro de aeródromo",
            puntos: [
              "En un aeródromo terrestre, el faro puede alternar verde y blanco o emitir solo blanco; el ejemplo fotografiado es verde y blanco. El faro de identificación es distinto: transmite caracteres en código Morse con destellos verdes. Ambos ayudan a identificar el lugar, pero no autorizan una pista.",
            ],
          },
          {
            titulo: "Luces de obstáculo",
            imagen: {
              src: "/modulos/aeropuertos/ap-16-03-familias-luces.webp",
              alt: "Lámina de familias de luces de obstáculo: roja fija de baja intensidad, roja o blanca de intensidad media, blanca destellante de alta intensidad y colores de vehículos",
            },
            puntos: [
              "En objetos fijos puedes encontrar roja fija de baja intensidad; el tipo E, también de baja intensidad, destella en ciertos aerogeneradores. En intensidad media hay roja fija, roja destellante o blanca destellante; en alta, blanca destellante. La franja inferior separa los vehículos: azul para emergencia o seguridad y amarillo para servicio o guía. Identifica si la luz señala una estructura fija o tráfico en movimiento; ningún color sustituye la distancia segura ni la ruta autorizada.",
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
            imagen: {
              src: "/modulos/aeropuertos/ap-16-04-parque-eolico.webp",
              alt: "Seis aerogeneradores al anochecer con luces rojas de obstáculo en las barquillas, encendidas en el mismo instante",
            },
            puntos: [
              "Las luces rojas en lo alto de las barquillas marcan el parque eólico como obstáculo extenso. En esta instalación se ven encendidas al mismo tiempo; cuando un parque usa destellos, estos se sincronizan. La foto es un instante, no una medición del ritmo. En vuelo, identifica el conjunto, no solo la turbina más cercana, y contrástalo con la carta y las altitudes publicadas.",
            ],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Una torre de línea eléctrica con balizas",
        intro:
          "La foto muestra tres niveles de luces blancas y esferas que hacen visible parte del tendido. Una imagen fija no enseña el orden de destellos: si la instalación usa luces de alta intensidad tipo B, la secuencia es medio, cima e inferior. El cable puede ser más difícil de ver que la torre.",
        imagen: {
          src: "/modulos/aeropuertos/ap-16-05-torre-cables.webp",
          alt: "Torre eléctrica al atardecer con tres niveles de luces blancas, cables que cuelgan entre torres y esferas blancas y anaranjadas alternadas",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 23,
            y: 5,
            que: "Luz blanca de la cima",
            significa: "Hace visible la parte más alta de esta torre.",
            piloto: "No calcules la altura libre mirando solo esa luz: verifica la altitud y los obstáculos publicados.",
          },
          {
            x: 23,
            y: 29,
            que: "Luz blanca del nivel medio",
            significa: "Es el nivel intermedio de la señalización.",
            piloto: "Si la instalación es tipo B y observas varios ciclos, esta luz destella primero; una foto sola no lo demuestra.",
          },
          {
            x: 23,
            y: 48,
            que: "Luz blanca del nivel bajo",
            significa: "Completa la señalización vertical de esta estructura.",
            piloto: "No tomes este punto luminoso como límite inferior del cable; la catenaria puede descender entre torres.",
          },
          {
            x: 43,
            y: 35,
            que: "Esferas en el cable",
            significa: "Los marcadores esféricos blancos y anaranjados alternan para hacer más visible el tendido de día.",
            piloto: "Te ayudan a localizar el cable, pero no garantizan que todo su tramo sea fácil de ver.",
          },
          {
            x: 67,
            y: 71,
            que: "La catenaria entre torres",
            significa: "El cable cuelga y cruza el espacio entre las torres.",
            piloto: "Trata todo el tendido como obstáculo; usa la ruta y la altitud publicadas, no una estimación visual desde la cabina.",
          },
        ],
      },
      {
        kind: "p",
        text: "En la imagen de reconocimiento, las tres luces blancas hacen más fácil ubicar la torre, mientras las esferas blancas y anaranjadas resaltan el cable con luz diurna. La amenaza no termina en la torre: el tendido cruza el valle y puede bajar entre apoyos. Si encuentras esta escena en una aproximación o salida, comprueba las altitudes y restricciones publicadas; no infieras separación vertical por la posición de una sola luz.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-16-06-patrones-luces.webp",
        alt: "Comparación entre faro de aeródromo verde y blanco, faro de identificación con Morse verde y secuencia medio-cima-inferior de una torre eléctrica con luces blancas tipo B",
        ancho: 1600,
        alto: 900,
        pie: "El faro de aeródromo del ejemplo alterna verde y blanco para ayudar a encontrar el campo; uno instalado puede emitir solo blanco. El faro de identificación transmite caracteres verdes en código Morse. Abajo, si una torre que sostiene cables usa luces blancas de alta intensidad tipo B, destellan primero en el nivel medio, luego en la cima y al final en el inferior. Reconoce el propósito de cada patrón y verifica cartas y procedimientos: ninguno indica por sí mismo que una pista esté autorizada.",
      },
      {
        kind: "p",
        text: "En plataforma, la baliza azul destellante identifica un vehículo de emergencia o seguridad; la amarilla, uno de servicio o guía. El color advierte qué tipo de vehículo puede estar moviéndose, pero no le otorga por sí solo prioridad para cruzar la ruta de tu avión.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Rodando de noche hacia el puesto",
        situacion:
          "Rodando de noche hacia el puesto, ves dos luces destellando cruzando tu ruta: una azul y una amarilla. Las dos van hacia el mismo punto de la plataforma.",
        pregunta: "¿Qué identificas por las balizas y cómo decides si puedes continuar?",
        respuesta:
          "La baliza azul identifica un vehículo de emergencia o seguridad; la amarilla, uno de servicio. Un vehículo guía también puede llevar una baliza amarilla, pero se reconoce por su función y por las instrucciones recibidas, no solo porque parezca más brillante. Si cualquiera de ellos se acerca a tu ruta, reduce la velocidad o detente según el riesgo y confirma con control antes de seguir. El color no concede por sí solo prioridad de paso.",
        claves: [
          "Azul destellante: vehículo de emergencia o seguridad.",
          "Amarillo destellante: servicio o guía; la función se confirma por contexto e instrucciones.",
          "Ante una trayectoria que se cruza, protege la separación y aclara la autorización.",
        ],
        imagen: {
          src: "/modulos/aeropuertos/ap-16-07-vehiculos-plataforma.webp",
          alt: "Vista nocturna desde cabina con vehículo de emergencia o seguridad de baliza azul, camioneta de servicio de baliza amarilla y vehículo guía al fondo",
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
        pie: "Una fila de luces funciona como patrón, no como suma de puntos aislados. Dos luces contiguas apagadas crean un hueco que puede deformar la percepción del borde aunque el porcentaje total todavía parezca alto. La tripulación no calcula la disponibilidad desde la cabina: confirma la condición mediante ATIS (Automatic Terminal Information Service, servicio automático de información terminal), NOTAM (Notice to Airmen, aviso a los aviadores) o control, y la aplica a los mínimos y procedimientos del operador.",
      },
      {
        kind: "p",
        text: "Una instalación puede conservar un porcentaje alto de luces en servicio y aun así perder la forma visual que necesita el piloto. Por eso se revisan tanto el porcentaje como la distribución de las luces y el tiempo que tardan en recuperarse tras cambiar de fuente eléctrica. Estos son criterios de diseño y mantenimiento, no mínimos de aterrizaje que la tripulación pueda calcular a ojo. Antes de operar con una ayuda degradada, consulta la información vigente y aplica los mínimos y procedimientos de tu operador.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-17-02-conmutacion.webp",
        alt: "Esquema de cambio de fuente primaria a secundaria y gráfica del intervalo en que una luz cae por debajo de la mitad de su intensidad",
        ancho: 1600,
        alto: 900,
        pie: "La conmutación es el intervalo durante el cual la intensidad de una luz, medida en una dirección, cae por debajo del 50 % y luego vuelve a ese nivel al cambiar de fuente. Se mide con la luz operando al menos al 25 % de su intensidad. Reconoce el cambio de fuente en el esquema, pero no confundas el tiempo de arranque del generador con el tiempo sin luz útil: para decidir si la ayuda está disponible, consulta la condición publicada o informada por control.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Tiempo de conmutación",
            imagen: {
              src: "/modulos/aeropuertos/ap-17-03-tiempos.webp",
              alt: "Matriz de tiempos máximos de conmutación de ayudas luminosas por tipo de operación, con las excepciones de terreno peligroso y ausencia de luces de eje",
            },
            puntos: [
              "La tabla separa los sistemas que deben recuperarse en 1 segundo de los que pueden tardar 15. En aproximaciones de precisión de categoría II/III, el umbral, el extremo, el eje, la zona de toma de contacto, las barras de parada y los 300 m interiores de aproximación están en el grupo de 1 segundo; el borde de pista queda en el de 15. El PAPI (Precision Approach Path Indicator, indicador de trayectoria de aproximación de precisión) puede requerir 1 segundo junto con borde y umbral en terreno peligroso o escarpado. Identifica el sistema afectado antes de interpretar una falla; la tabla no reemplaza la información operacional vigente.",
            ],
          },
          {
            titulo: "Niveles de mantenimiento",
            imagen: {
              src: "/modulos/aeropuertos/ap-17-04-mantenimiento.webp",
              alt: "Objetivos de mantenimiento de luces para aproximaciones de precisión: porcentajes por sistema en categorías II y III, referencia de categoría I y advertencia sobre luces contiguas",
            },
            puntos: [
              "Una luz se considera fuera de servicio si la intensidad media de su haz principal baja del 50 % de la especificada o si el color o filtro es incorrecto; no se determina mirando una foto. En categoría I, el objetivo es 85 % para aproximación, umbral, borde y extremo. En categoría II/III varía por sistema: 95 % en los 450 m interiores de aproximación, umbral, eje y borde; 90 % en zona de toma de contacto; 85 % en el resto de aproximación y 75 % en el extremo. Son objetivos de mantenimiento, no permiso automático para aterrizar.",
            ],
          },
        ],
      },
      { kind: "sub", text: "Los tiempos por tipo de pista" },
      {
        kind: "table",
        head: ["Caso de pista", "Deben volver en 1 segundo", "Pueden tardar hasta 15 segundos"],
        rows: [
          [
            "Vuelo visual",
            "No se fija un valor de 1 segundo",
            "No se fija un valor de 15 segundos: debe ser lo más corto posible",
          ],
          [
            "Aproximación que no es de precisión",
            "Indicador de pendiente, borde y umbral, solo si la aproximación se hace sobre terreno peligroso o escarpado",
            "Sistema de aproximación, indicador de pendiente, borde, umbral, extremo y obstáculos, salvo la excepción indicada",
          ],
          [
            "Precisión categoría I",
            "Indicador de pendiente, borde y umbral, solo si la aproximación se hace sobre terreno peligroso o escarpado",
            "Sistema de aproximación, indicador de pendiente, borde, umbral, extremo y obstáculos, salvo la excepción indicada",
          ],
          [
            "Precisión categorías II y III",
            "Los 300 m interiores de aproximación, umbral, extremo, eje, zona de toma de contacto, barras de parada y extremo de zona de parada",
            "Resto de aproximación, borde de pista, calle esencial, obstáculos, luces de protección de pista y bordes de zona de parada",
          ],
          [
            "Despegue con RVR (Runway Visual Range, alcance visual en pista) menor de 800 m",
            "Extremo, eje, barras de parada, extremo de zona de parada y borde si no hay luces de eje",
            "Borde si hay eje, calle esencial, obstáculos y bordes de zona de parada",
          ],
        ],
      },
      {
        kind: "p",
        text: "Para una pista de vuelo visual no se impone aquí un máximo de 1 o 15 segundos: la conmutación debe ser lo más corta posible. En ciertos casos puede haber alumbrado de emergencia desplegable en 15 minutos; eso no significa que las luces instaladas puedan tardar 15 minutos en volver. Estos tiempos describen la instalación, no autorizan a continuar una aproximación sin la referencia visual requerida.",
      },
      {
        kind: "reconoce",
        titulo: "Una fila de borde con luces faltando",
        intro: "La fotografía muestra un tramo de tres luces de borde consecutivas apagadas. Las flechas menta señalan esa fila y el borde opuesto de la pista: ver luces al otro lado no repara el hueco cercano. Una foto no permite medir la intensidad reglamentaria ni decidir si la pista cumple los objetivos de mantenimiento; confirma el estado de las ayudas por los canales operacionales.",
        imagen: {
          src: "/modulos/aeropuertos/ap-17-05-fila-borde.webp",
          alt: "Fotografía nocturna de una fila de luces blancas de borde con tres luminarias consecutivas oscuras; al otro lado se ve el borde opuesto encendido",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 24,
            y: 30,
            que: "Fila blanca de borde",
            significa: "Las luces encendidas revelan una secuencia de puntos a lo largo del borde de pista.",
            piloto: "Úsala para orientarte solo si está disponible y ofrece la guía visual que exige la operación.",
          },
          {
            x: 42,
            y: 43,
            que: "Tres luces seguidas apagadas",
            significa: "Forman un hueco en la continuidad del borde; no son una marca que indique un viraje.",
            piloto: "No reconstruyas el borde por intuición: contrasta la condición de la ayuda con control y tus mínimos.",
          },
          {
            x: 49,
            y: 66,
            que: "Luz de borde encendida en primer plano",
            significa: "Permite comparar la fila visible con el tramo sin luces, pero no cuantifica la intensidad de ninguna luminaria.",
            piloto: "No infieras un porcentaje de servicio ni una autorización a partir de este contraste.",
          },
          {
            x: 73,
            y: 24,
            que: "Luces del borde opuesto",
            significa: "Marcan el otro lado de la pista; que estén encendidas no restaura la continuidad de la fila cercana.",
            piloto: "No tomes una fila visible como prueba de que todo el sistema de borde está disponible.",
          },
        ],
      },
      {
        kind: "p",
        text: "En los objetivos de mantenimiento de categoría II/III no debe haber dos luces contiguas fuera de servicio, excepto dentro de una barreta o barra transversal, donde pueden admitirse dos. En categoría I también se controla la adyacencia, con la salvedad de separaciones significativamente menores que las requeridas. Una luz aislada tampoco queda aprobada automáticamente: importan su ubicación, la cantidad total y el sistema afectado. Si una fila presenta un hueco, el piloto no decide su aptitud contando lámparas desde cabina.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En corta final de categoría III",
        situacion:
          "Estás en corta final para una aproximación de categoría III cuando falla la fuente eléctrica principal. Después del primer segundo ves el eje, la zona de toma de contacto, el umbral y la parte interior de las luces de aproximación, pero las dos filas de borde aún están apagadas.",
        pregunta: "¿Qué puede explicar esa diferencia y qué haces si la guía visual no alcanza para continuar?",
        respuesta:
          "La diferencia puede corresponder a los tiempos máximos de conmutación: esos sistemas interiores deben recuperarse en 1 segundo, mientras el borde puede tardar hasta 15. No significa que la aproximación esté automáticamente autorizada o que la instalación esté sana; si la iluminación requerida no se recupera, es una falla que debe notificarse. La tripulación aplica sus mínimos y procedimiento: si no tiene la referencia visual requerida o no puede continuar con seguridad, ejecuta la aproximación frustrada y comunica la condición a control. La información del sistema de vigilancia y los avisos operacionales ayudan a determinar la disponibilidad posterior.",
        claves: [
          "En categoría II/III, eje, umbral, extremo, zona de toma de contacto y aproximación interior deben recuperarse en 1 segundo.",
          "Borde de pista y aproximación exterior pueden tardar hasta 15 segundos.",
          "Sin la referencia visual necesaria, no continúes solo porque otros sistemas estén encendidos: sigue tus mínimos y frustra si corresponde.",
        ],
        imagen: {
          src: "/modulos/aeropuertos/ap-17-06-falla-en-final.webp",
          alt: "Esquema técnico de una conmutación en aproximación de categoría II o III: luces interiores, umbral, eje y zona de toma de contacto encendidas mientras borde y aproximación exterior siguen apagados",
        },
      },
    ],
  },
]
