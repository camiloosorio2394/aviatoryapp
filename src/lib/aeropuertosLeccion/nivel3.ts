/**
 * Nivel 3 · Letreros y balizas (lecciones 09 a 12).
 *
 * Primero los que obligan, que son los únicos que te frenan, y después los que
 * informan; luego lo que no es letrero y sigue hablándote desde el suelo, y al
 * final un rodaje entero leído letrero por letrero, que es donde todo lo
 * anterior se usa junto y de corrido.
 *
 * La base de señalización es la OACI: Anexo 14 Vol. I, 9.ª edición, Enmienda 18,
 * aplicable desde el 27 de noviembre de 2025. La lección 10 distingue además
 * dos ejemplos propios de publicaciones FAA y no los presenta como universales.
 * Los puntos de espera se dibujan
 * siempre con los patrones anchos A2 y B2, y en el patrón A las dos líneas
 * continuas van del lado en que la aeronave espera y las de trazos miran a la
 * pista: esa guarda está repetida hueco por hueco a propósito.
 *
 * Los huecos llevan su código (AP-LL-NN) porque es el que Camilo usa para
 * nombrar la imagen cuando la genera. La ficha completa de cada uno está en
 * docs/BRIEF_AEROPUERTOS.md.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const NIVEL_3: DocScreen[] = [
  // ── 09 ──────────────────────────────────────────────────────────────────
  {
    n: 9,
    title: "Los que obligan",
    kicker: "Blanco sobre rojo. Los nueve letreros que no se negocian.",
    minutes: 7,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-09-01-letrero-obligatorio.webp",
        alt: "Vista desde cabina de un letrero obligatorio de pista 25-07, un letrero de emplazamiento E y un punto de espera A2",
        ancho: 1600,
        alto: 900,
        pie: "Blanco sobre rojo identifica una instrucción obligatoria: el «25-07» confirma que la calle llega al punto protegido de esa pista y no debes cruzarlo sin la autorización correspondiente. Amarillo sobre negro informa tu emplazamiento actual: estás en la calle E. Las dos líneas continuas quedan de tu lado y las dos discontinuas miran hacia la pista; ante cualquier contradicción entre autorización, carta y señalización, detente antes de las continuas y aclara.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-09-02-punto-espera-a2.webp",
        alt: "Vista desde cabina de un punto de espera A2 con dos líneas continuas del lado del avión, dos discontinuas hacia la pista y letreros 25-07 a ambos lados",
        ancho: 1600,
        alto: 900,
        pie: "El patrón A2 cruza toda la calle: las dos líneas continuas quedan de tu lado y las dos discontinuas miran hacia la pista. Los letreros rojos «25-07» identifican el punto de espera de esa pista; el panel negro «E» confirma la calle actual. Antes de entrar o cruzar, comprueba que la autorización de control corresponde a la pista y mantén todo el avión antes de las continuas si no la tienes.",
      },
      {
        kind: "p",
        text: "El fondo rojo con caracteres blancos identifica una instrucción obligatoria. Puede señalar una pista, una posición de espera o una entrada prohibida. Léelo junto con la carta de rodaje y la autorización: si los tres no coinciden, detente antes del punto protegido y aclara la instrucción. No intentes resolver la contradicción mientras sigues rodando.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-09-03-familias-obligatorias.webp",
        alt: "Nueve ejemplos de letreros obligatorios: pista 25, intersección 25-07, esperas CAT I, II, III y combinadas, entrada prohibida y punto de espera B2",
        ancho: 1200,
        alto: 800,
        pie: "Estas son nueve inscripciones o símbolos de referencia, no nueve pasos sucesivos. «25-07» designa la pista en una intersección; «25 CAT II/III» identifica la posición que protege operaciones de categoría II y III; «B2» puede identificar un punto de espera distinto. CAT viene de Category (categoría). La forma circular con barra blanca prohíbe entrar a esa ruta. En cada caso, identifica qué posición tienes delante y confirma la autorización antes de rebasarla.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Designación de pista",
            imagen: {
              src: "/modulos/aeropuertos/ap-09-04-designacion-pista.webp",
              alt: "Plano didáctico de una calle E ante la pista: el letrero 25-07 indica que la dirección de la 25 queda a la izquierda y la de la 07 a la derecha",
            },
            puntos: ["En esta intersección, «25-07» sitúa la dirección de la pista 25 a tu izquierda y la 07 a tu derecha. El panel «E» confirma la calle desde la que llegas. Antes de escoger sentido o cruzar, coteja la carta, la ruta autorizada y el punto de espera A2; el letrero no es por sí solo autorización para entrar."],
          },
          {
            titulo: "Punto de espera de la pista",
            imagen: {
              src: "/modulos/aeropuertos/ap-09-10-letrero-espera.webp",
              alt: "Acercamiento fotográfico a los paneles 25-07 en rojo y E en negro junto a un punto de espera de pista",
            },
            puntos: ["El letrero de designación «25-07» confirma la pista que tienes delante y se coloca junto al punto de espera correspondiente. «E» es tu calle actual, no otra autorización. Una señal roja con calle y número, por ejemplo «B2», identifica una posición de espera distinta que puede proteger una superficie de limitación de obstáculos o el área sensible del ILS (Instrument Landing System)."],
          },
          {
            titulo: "Los CAT",
            imagen: {
              src: "/modulos/aeropuertos/ap-09-11-cat-ii-iii.webp",
              alt: "Fotografía cercana de un letrero rojo 25 CAT II/III con caracteres blancos junto a una calle de rodaje",
            },
            puntos: ["«25 CAT II/III» se lee como una posición de espera para la pista 25 que protege operaciones de categoría II y III. No son dos cabeceras ni una instrucción para entrar: la tripulación debe confirmar la posición publicada, el procedimiento de baja visibilidad y la autorización que le corresponde."],
          },
          {
            titulo: "Prohibida la entrada",
            imagen: {
              src: "/modulos/aeropuertos/ap-09-05-prohibida-entrada.webp",
              alt: "Fotografía nocturna de una rama de rodaje prohibida con señales luminosas de entrada prohibida a ambos lados",
            },
            puntos: ["El círculo con barra blanca sobre rojo, sin letras, marca la entrada prohibida. Aquí aparece a ambos lados de la rama cerrada; la línea amarilla conduce por otra calle. Como piloto no tomas esa rama, aunque una autorización parezca apuntar hacia ella: te detienes en un lugar seguro y aclaras la ruta."],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Ante una posición CAT II/III",
        imagen: {
          src: "/modulos/aeropuertos/ap-09-08-reconoce-cat.webp",
          alt: "Vista desde cabina de una posición de espera B2 con marca en escalera y letrero rojo 25 CAT II/III",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 35,
            y: 51,
            que: "Escalera amarilla",
            significa: "Es el patrón B2: dos líneas continuas unidas por travesaños, no cuatro líneas A2.",
            piloto: "Si tu autorización exige esperar aquí, detienes todo el avión antes de la marca.",
          },
          {
            x: 88,
            y: 35,
            que: "25 CAT II/III",
            significa: "El letrero rojo identifica la pista 25 y la posición que protege operaciones de categoría II y III.",
            piloto: "Confirmas que es la posición asignada; no la cruzas por asumir que ya puedes llegar al A2.",
          },
          {
            x: 48,
            y: 60,
            que: "Eje amarillo",
            significa: "Te mantiene sobre la ruta de rodaje, pero no sustituye la autorización de control.",
            piloto: "Sigues el eje solo hasta la posición autorizada y te detienes ante cualquier discrepancia.",
          },
        ],
      },
      // La comparación de dos imágenes 4:3 y un renglón: dos fichas iguales en
      // ancho, el mismo dibujo y el mismo ángulo, y la frase debajo.
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Patrón A2",
            imagen: {
              src: "/modulos/aeropuertos/ap-09-06-patron-a2.webp",
              alt: "Plano técnico del patrón A2 con dos líneas continuas del lado de espera y dos discontinuas hacia la pista, junto a un letrero 25-07",
            },
            puntos: ["A2 tiene cuatro líneas transversales: dos continuas hacia tu avión y dos discontinuas hacia la pista. Identifica el punto de espera asociado con la designación de pista; sin autorización para entrar o cruzar, detén todo el avión antes de las continuas."],
          },
          {
            titulo: "Patrón B2",
            imagen: {
              src: "/modulos/aeropuertos/ap-09-07-patron-b2.webp",
              alt: "Plano técnico del patrón B2 con dos líneas continuas unidas por travesaños junto a un letrero 25 CAT II/III",
            },
            puntos: ["B2 parece una escalera: dos líneas continuas unidas por travesaños. Cuando protege una aproximación de precisión se acompaña del letrero CAT que corresponde a la posición. Identifica la marca y el letrero, coteja la carta y espera allí si esa es la posición que control te asignó."],
          },
        ],
      },
      {
        kind: "p",
        text: "A2 y B2 no se distinguen solo por estar «más cerca» o «más lejos». A2 son cuatro líneas, con las continuas de tu lado; B2 es una escalera de dos líneas y travesaños que puede proteger el área sensible de la aproximación de precisión. El aeropuerto puede tener ambas posiciones o solo la que aplique a esa intersección. La carta, el letrero y la autorización indican dónde debes detenerte.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En una unión de calles",
        situacion: "Al amanecer, tu ruta de rodaje parece llevarte a una rama con dos letreros rojos de círculo y barra blanca.",
        pregunta: "¿Qué haces?",
        respuesta:
          "No tomas esa rama. El símbolo significa «prohibida la entrada», incluso si crees que la autorización apuntaba hacia allí. Detente en un lugar seguro, informa de la discrepancia y confirma otra ruta antes de seguir.",
        claves: ["El círculo con barra blanca no es una posición de espera que puedas rebasar con otra autorización.", "Aclara la ruta antes de mover el avión."],
        imagen: {
          src: "/modulos/aeropuertos/ap-09-09-decision-entrada.webp",
          alt: "Vista desde cabina de una bifurcación con letreros de entrada prohibida en la rama derecha y la ruta permitida hacia la izquierda",
        },
      },
    ],
  },

  // ── 10 ──────────────────────────────────────────────────────────────────
  {
    n: 10,
    title: "Los que informan",
    kicker: "Amarillo y negro para orientarte; dos señales FAA que conviene reconocer.",
    minutes: 8,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-10-01-letreros-informativos.webp",
        alt: "Vista desde cabina de una intersección con letreros de dirección hacia N y E, emplazamiento M y una espera intermedia",
        ancho: 1600,
        alto: 900,
        pie: "Los paneles amarillos con caracteres negros y flechas anuncian hacia dónde conducen las calles N y E; el panel negro con la letra amarilla confirma que la aeronave está en M y, por eso, no lleva flecha. La línea amarilla discontinua que cruza la calle marca una espera intermedia: si la autorización exige detenerte allí, espera antes de la línea y confirma la ruta antes de escoger una bifurcación.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-10-02-familias-color.webp",
        alt: "Comparación de letreros rojos obligatorios, amarillos de dirección, negros de distancia restante FAA y naranjas temporales FAA",
        ancho: 1600,
        alto: 900,
        pie: "Rojo con blanco exige identificar un límite o una prohibición; amarillo con negro indica una dirección, y amarillo sobre negro identifica la calle actual. Los otros dos ejemplos pertenecen a la señalización publicada por la FAA: el «3» blanco sobre negro significa 3.000 pies de pista restantes y el naranja alerta sobre obras. No presupongas que todos los aeropuertos usan estas cuatro familias: verifica la señalización local y su publicación vigente.",
      },
      {
        kind: "p",
        text: "En una intersección, el panel negro con letras amarillas confirma la calle donde estás; el amarillo con letras negras y flecha muestra hacia dónde conduce cada giro. Léelos juntos y compáralos con la ruta autorizada antes de mover el avión. Más adelante verás ejemplos de la FAA, como el aviso naranja de obras y la distancia restante en pies: sirven para reconocerlos si operas donde se utilizan, no para asumir que aparecerán igual en todos los aeropuertos.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Dirección y destino",
            imagen: {
              src: "/modulos/aeropuertos/ap-10-03-direccion-destino.webp",
              alt: "Conjunto de letreros de dirección a N y E a ambos lados del emplazamiento M, con ejemplo separado de destino hacia carga",
            },
            puntos: ["El panel negro «M» confirma que estás en esa calle y no lleva flecha. Los amarillos señalan los giros hacia N y E; «CARGA →» indica un destino, no el nombre de la calle donde estás. Sigue solo la ruta autorizada y aclara cualquier discrepancia antes del giro."],
          },
          {
            titulo: "Salida de pista y pista libre",
            imagen: {
              src: "/modulos/aeropuertos/ap-10-04-salida-pista-libre.webp",
              alt: "Comparación técnica de un letrero de salida E4 con flecha y otro de pista libre con el símbolo de la posición de espera patrón A",
            },
            puntos: ["«E4 →» anuncia la salida que viene. El letrero de pista libre representa el patrón A y ayuda a ubicar el límite protegido al abandonar la pista; no sustituye verificar que todo el avión haya pasado la marca correspondiente. Confirma posición y procedimiento antes de notificar que libraste."],
          },
          {
            titulo: "Distancia de pista restante",
            imagen: {
              src: "/modulos/aeropuertos/ap-10-05-distancias-letreros.webp",
              alt: "Comparación entre el 3 blanco sobre negro de distancia restante FAA y un letrero amarillo de despegue por intersección que muestra 2.150 metros",
            },
            puntos: ["En el ejemplo FAA, «3» blanco sobre negro significa 3.000 pies de pista restantes, no 3 km. El letrero amarillo «2 150 m →» informa la TORA (Take-Off Run Available), es decir, la carrera de despegue disponible desde esa intersección, en metros. Para calcular performance manda la distancia publicada y el punto de entrada real, no una estimación visual."],
          },
          {
            titulo: "Área fuera de servicio",
            imagen: {
              src: "/modulos/aeropuertos/ap-10-06-area-obras.webp",
              alt: "Fotografía de una calle bloqueada por obras con barreras y letrero naranja temporal CONSTRUCTION AHEAD como ejemplo FAA",
            },
            puntos: ["En este ejemplo FAA, «CONSTRUCTION AHEAD» avisa que hay obras adelante; la barrera, no el letrero, muestra el tramo físicamente cerrado. Antes de rodar confirma la ruta vigente, el NOTAM (Notice to Airmen) aplicable y la autorización de control. Si la ruta parece conducir al cierre, detente y aclárala."],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "El tramo en obra",
        imagen: {
          src: "/modulos/aeropuertos/ap-10-09-reconoce-obra.webp",
          alt: "Calle en obras al amanecer con un letrero naranja FAA a la izquierda, conos y barrera de cierre adelante",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          { x: 14, y: 47, que: "Letrero naranja", significa: "Aviso temporal FAA de obras adelante, no una señal universal.", piloto: "Cotejas el NOTAM y la ruta autorizada antes de seguir." },
          { x: 56, y: 39, que: "Barrera transversal", significa: "Delimita físicamente el tramo cerrado.", piloto: "No ruedas hacia la zona bloqueada." },
          {
            x: 58,
            y: 44,
            que: "Conos de obra",
            significa: "Hacen visible el cierre a lo largo de la calle.",
            piloto: "Si la autorización parece llevarte entre ellos, te detienes y pides aclaración.",
          },
        ],
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Emplazamiento",
            imagen: {
              src: "/modulos/aeropuertos/ap-10-07-emplazamiento.webp",
              alt: "Fotografía de un letrero aislado de emplazamiento M2 amarillo sobre negro con borde amarillo y sin flecha",
            },
            puntos: ["«M2» identifica la calle o posición en la que estás. El fondo negro, las letras amarillas y la ausencia de flecha te permiten distinguirlo de un letrero de dirección. Si tu carta o autorización nombran otra calle, no elijas un giro por intuición: confirma la posición."],
          },
          {
            titulo: "Dirección",
            imagen: {
              src: "/modulos/aeropuertos/ap-10-08-direccion.webp",
              alt: "Fotografía de un letrero amarillo de dirección E con flecha negra hacia la derecha junto a una bifurcación realista",
            },
            puntos: ["«E →» anuncia que el giro a la derecha conduce a la calle E; no dice que ya estés en ella. Identifica la flecha, comprueba que el giro coincide con la autorización y, después de hacerlo, busca una referencia que confirme tu nuevo emplazamiento."],
          },
        ],
      },
      {
        kind: "p",
        text: "Para recordarlo durante el rodaje: amarillo sobre negro, sin flecha, confirma dónde estás; negro sobre amarillo, con flecha, te orienta hacia la próxima calle. La señal nunca reemplaza la carta de rodaje ni la autorización.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Después de aterrizar",
        situacion: "Aterrizaste y saliste por la calle E. El controlador pregunta si libraste.",
        pregunta: "¿Ya libraste?",
        respuesta:
          "Confirma que todo el avión pasó la marca de espera que delimita la pista y que ya estás fuera de su área protegida. El letrero de pista libre puede ayudarte a ubicar ese límite, pero no basta verlo por la ventanilla: verifica la posición completa de la aeronave antes de informar a control.",
        claves: ["Todo el avión debe haber pasado el límite aplicable.", "El letrero muestra el patrón A, pero no sustituye la comprobación de posición."],
        imagen: {
          src: "/modulos/aeropuertos/ap-10-10-decision-pista-libre.webp",
          alt: "Plano técnico de una aeronave completamente más allá de la marca de espera A2 al abandonar una pista",
        },
      },
    ],
  },

  // ── 11 ──────────────────────────────────────────────────────────────────
  // Referencias: EASA CS ADR-DSN.K.490/K.500 y GM K.515 (indicadores,
  // lámpara y área); CS ADR-DSN.P.805–P.830 (balizas); OACI Anexo 2,
  // apéndice 1, §§ 4.1–4.2 (señales luminosas y paneles del área).
  {
    n: 11,
    title: "Balizas, paneles e indicadores",
    kicker: "Lo que no es letrero y sigue hablándote desde el suelo.",
    minutes: 8,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-11-01-manga-viento.webp",
        alt: "Manga de viento de cinco bandas junto a una pista, con su boca, dirección y círculo de visibilidad señalados",
        ancho: 1600,
        alto: 900,
        pie: "La boca ancha de la manga queda hacia el lugar del que viene el viento y la punta se extiende hacia sotavento. Si se usan dos colores, cinco bandas alternas facilitan reconocerla; el círculo blanco ayuda a ubicarla desde el aire. La manga muestra dirección y una idea general de la intensidad, no una lectura exacta: la tripulación la contrasta con el ATIS (Automatic Terminal Information Service), la torre y los demás datos de viento disponibles.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-11-02-manga-campo.webp",
        alt: "Fotografía de una manga naranja y blanca extendida, con la boca ancha, la punta y el círculo blanco de emplazamiento señalados",
        ancho: 1600,
        alto: 900,
        pie: "La manga se orienta por el viento: la boca ancha queda a barlovento y la punta apunta hacia donde sopla. El círculo blanco permite encontrarla entre otras instalaciones. Antes de calcular una componente de viento, confirma el valor comunicado; la tela solo ofrece una comprobación visual general.",
      },
      {
        kind: "p",
        text: "No toda la información llega en un letrero. La manga muestra dirección y una idea general del viento en superficie; algunas balizas delimitan bordes cuando la superficie no basta para distinguirlos. Si existe un área de señales, sus paneles se leen desde el aire; si falla la radio, la torre puede usar una lámpara de señales. Cada ayuda se interpreta en su contexto y se contrasta con la información vigente: ninguna reemplaza por sí sola una carta, una autorización o un procedimiento de falla de radio.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "El indicador de dirección del viento",
            imagen: {
              src: "/modulos/aeropuertos/ap-11-03-medidas-manga.webp",
              alt: "Esquema de referencia EASA de una manga de al menos 3,6 m de largo y 0,9 m de diámetro mayor, junto al círculo blanco de 15 m de diámetro y 1,2 m de ancho",
            },
            puntos: ["Como referencia técnica EASA, el cono de tela mide al menos 3,6 m de largo y 0,9 m en la boca ancha. La banda circular que ubica al menos una manga mide 15 m de diámetro y 1,2 m de ancho. Estas cotas explican su visibilidad; no sirven para calcular nudos a ojo."],
          },
          {
            titulo: "Las balizas",
            imagen: {
              src: "/modulos/aeropuertos/ap-11-04-balizas.webp",
              alt: "Comparación técnica de baliza plana para borde de pista sin pavimentar, baliza azul para borde de calle y baliza verde para eje de calle",
            },
            puntos: ["La placa plana puede delimitar una pista sin pavimentar cuyo borde se confunde con el terreno. En calles de rodaje, una baliza azul retrorreflectante señala el borde y una verde puede reforzar el eje. Las balizas cercanas al movimiento de aeronaves deben ser bajas y frangibles: reconoce qué superficie delimitan antes de seguir una guía."],
          },
          {
            titulo: "La lámpara de señales",
            imagen: {
              src: "/modulos/aeropuertos/ap-11-05-lampara-torre.webp",
              alt: "Fotografía desde una torre de control al anochecer con una lámpara de señales de lente verde junto al controlador",
            },
            puntos: ["La torre puede dirigir una lámpara roja, verde o blanca a una aeronave cuando no hay comunicación por radio. No basta ver el color: distingue luz fija de intermitente y confirma que la señal va dirigida a tu avión. La interpretación también cambia entre vuelo y tierra."],
          },
          {
            titulo: "El área de señales",
            imagen: {
              src: "/modulos/aeropuertos/ap-11-06-area-senales.webp",
              alt: "Área de señales vista desde arriba con borde blanco, un panel rojo de dos diagonales, otro de una diagonal y una haltera blanca",
            },
            puntos: ["Si se instala, el área de señales es una superficie horizontal de al menos 9 m de lado con borde blanco de al menos 0,3 m, según la referencia EASA. Dos diagonales amarillas en rojo prohíben aterrizar; una pide precauciones especiales. La haltera blanca limita aterrizajes, despegues y rodaje a pistas y calles. Consulta la información publicada antes de actuar por un panel aislado."],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "La manga y su círculo",
        imagen: {
          src: "/modulos/aeropuertos/ap-11-09-reconoce-manga.webp",
          alt: "Vista cenital didáctica de una manga y su círculo de emplazamiento para identificar boca, punta, bandas y dirección de viento",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          { x: 39, y: 50, que: "Boca ancha", significa: "Se orienta hacia el viento que llega.", piloto: "Identificas de dónde viene antes de evaluar la componente para la pista." },
          { x: 47, y: 50, que: "Punta estrecha", significa: "Se extiende hacia sotavento.", piloto: "No inviertes la dirección del viento al leer la manga." },
          { x: 43, y: 42, que: "Cinco bandas", significa: "En esta manga alternan naranja y blanco; la primera y la última son oscuras.", piloto: "Reconoces el cono desde lejos, pero no asignas una velocidad exacta por contar bandas." },
          { x: 38, y: 75, que: "Círculo blanco", significa: "Ayuda a localizar la manga desde el aire.", piloto: "Una vez ubicada, comparas su indicación con el viento comunicado y las limitaciones del avión." },
        ],
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Haltera sola",
            imagen: {
              src: "/modulos/aeropuertos/ap-11-07-haltera-sola.webp",
              alt: "Haltera blanca sin barras negras: aterrizaje, despegue y rodaje limitados a pistas y calles de rodaje",
            },
            puntos: ["La haltera blanca sin barras significa que aterrizaje, despegue y rodaje deben hacerse únicamente en pistas y calles de rodaje. Al reconocerla desde arriba, descartas operar por superficies distintas aunque parezcan transitables."],
          },
          {
            titulo: "Haltera con barras",
            imagen: {
              src: "/modulos/aeropuertos/ap-11-08-haltera-barras.webp",
              alt: "Haltera blanca con una barra negra perpendicular sobre cada extremo: aterrizajes y despegues solo en pistas",
            },
            puntos: ["Las dos barras negras cambian la instrucción: aterrizajes y despegues se hacen solo en pistas, pero otros movimientos no quedan limitados necesariamente a pistas y calles. Compruebas ambas barras antes de confundir este panel con la haltera sola."],
          },
        ],
      },
      {
        kind: "p",
        text: "La diferencia entre las dos halteras importa: sin barras, aterrizaje, despegue y rodaje quedan limitados a pistas y calles de rodaje; con dos barras negras, la limitación a pistas se aplica al aterrizaje y al despegue, no a todos los demás movimientos.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Sin radio, en circuito",
        situacion: "Te quedas sin radio en circuito. La torre te apunta y ves verde fija.",
        pregunta: "¿Cómo interpretas la señal y acusas recibo?",
        respuesta:
          "Una verde fija dirigida a una aeronave en vuelo significa autorizado a aterrizar. De día, acusas recibo balanceando las alas, pero no se espera ese gesto en base o final; de noche, haces dos destellos con las luces de aterrizaje o navegación. Sigues el procedimiento de falla de radio de tu operación.",
        claves: ["Verde fija en tierra significa autorizado a despegar: la fase cambia la lectura.", "Confirma que la señal está dirigida a tu aeronave y distingue luz fija de intermitente."],
        imagen: {
          src: "/modulos/aeropuertos/ap-11-10-verde-fija.webp",
          alt: "Tarjeta de decisión: verde fija en vuelo significa autorizado a aterrizar y se acusa recibo según sea de día o de noche",
        },
      },
    ],
  },

  // ── 12 ──────────────────────────────────────────────────────────────────
  // La lección práctica: seis fotos del mismo rodaje, en orden, con una línea
  // de texto cada una. Van como hueco y párrafo alternados, no como fichas, para
  // que se lea como una secuencia y no como un catálogo. No lleva comparación:
  // una secuencia no compara nada.
  {
    n: 12,
    title: "Un rodaje leído letrero por letrero",
    kicker: "De la puerta a la pista, seis fotos y seis decisiones.",
    minutes: 9,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-12-01-rodaje-secuencia.webp",
        alt: "Rodaje desde cabina con una secuencia de letreros de emplazamiento, dirección y pista explicados paso a paso",
        ancho: 1600,
        alto: 900,
        pie: "Un rodaje seguro se confirma por etapas. Primero, el panel negro «M» fija tu posición; después, los paneles amarillos con flecha permiten comparar cada giro con la ruta autorizada; finalmente, el letrero rojo «13-31» anuncia el límite protegido de la pista. Si cualquiera de esas tres lecturas no coincide con la carta o la autorización, detén la aeronave antes de improvisar el siguiente movimiento.",
      },
      {
        kind: "hueco",
        rotulo: "AP-12-02 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "Plano cenital esquemático: la plataforma abajo con el puesto «K14», las calles «M», «E» y «F» en el centro, la pista «07-25» arriba y la paralela más allá. La ruta va marcada con línea gruesa y seis círculos numerados del 1 al 6, uno por foto. Se ven el punto de espera intermedio, la calle prohibida, la A2 con la B2 detrás y la vía de vehículos. Ojo: ni A1 ni B1, ni la A2 invertida.",
        alto: 320,
        ratio: "16 / 9",
      },
      {
        kind: "p",
        text: "Ahora se integra todo en un rodaje desde la puerta hasta la pista. Antes de mover el avión, la tripulación traza la autorización en la carta e identifica puntos críticos; durante el rodaje confirma cada letrero y cada cruce en voz alta. Si la secuencia real deja de coincidir con la preparada, la decisión correcta es detenerse en un lugar seguro y preguntar, no seguir hasta encontrar una señal conocida.",
      },
      {
        kind: "hueco",
        rotulo: "AP-12-03 · Fotografía real · 3:2 · 1200×800",
        descripcion:
          "Foto 1 de 6, misma cámara y misma luz que las cinco siguientes. Avión detenido en el puesto de un aeropuerto latinoamericano grande, mañana de luz lateral. Letrero de identificación de puesto, negro sobre amarillo, con la inscripción «K14», legible sin esfuerzo; las señales pintadas de entrada y de parada del puesto, y el eje de rodaje arrancando por delante. Ojo: ningún logo, matrícula ni rotulación en otro idioma.",
        alto: 300,
        ratio: "3 / 2",
      },
      {
        kind: "p",
        text: "**1. En el puesto.** Letrero amarillo `K14`. Lo lees antes de entrar.",
      },
      {
        kind: "hueco",
        rotulo: "AP-12-04 · Fotografía real · 3:2 · 1200×800",
        descripcion:
          "Foto 2 de 6, misma cámara, mismo avión, misma luz. Ya en movimiento, llegando al límite de la plataforma. A la izquierda del eje, el letrero combinado en este orden: «← N», «M» en cara negra con borde amarillo y «E →», con líneas negras verticales separando cada elemento. El eje de calle amarillo continuo entra al cuadro. Ojo: ninguna flecha dentro del letrero de emplazamiento.",
        alto: 300,
        ratio: "3 / 2",
      },
      {
        kind: "p",
        text: "**2. Saliendo de plataforma.** Combinado `← N`, `M`, `E →`. Estás en la M.",
      },
      {
        kind: "hueco",
        rotulo: "AP-12-05 · Fotografía real · 3:2 · 1200×800",
        descripcion:
          "Foto 3 de 6, misma cámara y misma luz, el avión frenando. Una sola línea amarilla de trazos cruza la calle de lado a lado en el tercio inferior, y el eje de calle se interrumpe al cruzarla. A la izquierda, un letrero de emplazamiento aislado, cara negra con la inscripción amarilla «M2» y su borde amarillo. Ojo: cuatro líneas serían un punto de espera de pista, y aquí no hay ninguno.",
        alto: 300,
        ratio: "3 / 2",
      },
      {
        kind: "p",
        text: "**3. Punto de espera intermedio.** Línea de trazos y letrero `M2`. Paras ahí si te lo indican.",
      },
      {
        kind: "hueco",
        rotulo: "AP-12-06 · Fotografía real · 3:2 · 1200×800",
        descripcion:
          "Foto 4 de 6, misma cámara y misma luz, llegando a una unión en cruz. A la izquierda, el letrero de dirección «↖ F» y «G ↗», separados por una línea negra vertical. Al fondo a la derecha, la calle prohibida con su disco rojo y barra blanca, sin texto. Al fondo a la izquierda, el letrero de vía de vehículos, «PARE · NO CONTINUAR SIN AUTORIZACIÓN ATC», en español. Ojo: nada de «NO ENTRY» dentro del disco.",
        alto: 300,
        ratio: "3 / 2",
      },
      {
        kind: "p",
        text: "**4. Unión con la F.** Dirección `↖ F` y `G ↗`. Y un disco rojo.",
      },
      {
        kind: "hueco",
        rotulo: "AP-12-07 · Fotografía real · 3:2 · 1200×800",
        descripcion:
          "Foto 5 de 6, misma cámara y misma luz, acercándose despacio al punto de espera. El eje mejorado arranca en el primer tercio, con doble línea de trazos a cada lado del eje continuo, y llega hasta 47 m desde la A2. Cruzando al fondo, la A2 de cuatro líneas de 0,30 m con las continuas del lado de espera, sus letreros rojos «25-07» y el emplazamiento «E» por fuera; antes de ella, más cerca de la cámara, la B2 con «25 CAT II/III». Ojo: nunca la A2 invertida.",
        alto: 300,
        ratio: "3 / 2",
      },
      {
        kind: "p",
        text: "**5. Acercándote a la pista.** El eje mejorado arranca a 47 m o menos. Frenas antes.",
      },
      {
        kind: "hueco",
        rotulo: "AP-12-08 · Fotografía real · 3:2 · 1200×800",
        descripcion:
          "Foto 6 de 6, misma cámara y misma luz, girando para alinearse y entrando a la pista por una intersección. A la izquierda, el letrero de despegue desde intersección, negro sobre amarillo, con «2 150 m →», a 60 m o más del eje de pista. Al fondo, la señal de eje de pista y un letrero blanco sobre negro de distancia restante. Ojo: la cifra del letrero de intersección va en metros, nunca en pies.",
        alto: 300,
        ratio: "3 / 2",
      },
      {
        kind: "p",
        text: "**6. Autorizado a entrar.** `2 150 m →` es el TORA que te queda.",
      },
      {
        kind: "reconoce",
        titulo: "El plano de la ruta",
        hueco: {
          id: "AP-12-02",
          medida: "Ilustración técnica · 16:9 · 1600×900",
          descripcion:
            "El mismo plano cenital de la apertura: la ruta desde el puesto «K14» hasta el punto de espera de la 25, con los seis círculos numerados donde se tomó cada foto, el punto de espera intermedio de la «M», la calle prohibida, la A2 con la B2 detrás y la entrada de la vía de vehículos. Ojo: ni A1 ni B1, ni la A2 invertida.",
        },
        puntos: [
          { x: 0, y: 0, que: "Línea amarilla continua", significa: "Eje de rodaje.", piloto: "Tu carril." },
          { x: 0, y: 0, que: "Seis puntos", significa: "La secuencia.", piloto: "Cada uno con su letrero." },
          { x: 0, y: 0, que: "Rojo en el punto 5", significa: "Obligatoria.", piloto: "Único freno." },
          { x: 0, y: 0, que: "Vía de vehículos", significa: "Tránsito de tierra.", piloto: "Espera lo mismo." },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "En el punto 5",
        situacion: "Estás en el punto 5, de noche y con RVR de 400 metros.",
        pregunta: "¿A2 o escalera?",
        respuesta:
          "En el punto que indiquen el procedimiento de baja visibilidad vigente y la autorización. Si la operación protege el área sensible del ILS, será el punto de categoría más alejado, identificado por el patrón B2 y su letrero; la RVR por sí sola no autoriza a escogerlo ni a cruzarlo.",
        claves: [
          "Se verifica el procedimiento LVP y el punto asignado antes de llegar al cruce.",
          "Pasarse del punto activo puede contaminar el área sensible del ILS.",
        ],
        hueco: {
          id: "AP-12-07",
          medida: "Fotografía real · 3:2 · 1200×800",
          descripcion:
            "La foto 5 de la secuencia: el eje mejorado arrancando a 47 m, la A2 cruzando al fondo con las continuas del lado de espera y los letreros rojos «25-07», y antes de ella, más cerca de la cámara, la B2 en escalera con «25 CAT II/III». Ojo: nunca la A2 invertida.",
        },
      },
    ],
  },
]
