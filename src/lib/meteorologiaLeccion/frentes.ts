/**
 * Nivel 3 · Masas de aire, frentes y tormentas.
 *
 * Cierra el capítulo 11 del PHAK. Los dos vuelos de ejemplo (Junín a Formosa
 * cruzando un frente cálido y el mismo tramo cruzando uno frío) son los del
 * propio capítulo, que en su edición en español está localizado a ciudades
 * argentinas: no hay que inventar ningún escenario, ya viene situado.
 *
 * Las cifras de peligros de tormenta (200 kt en el vórtice de un tornado, 30 km
 * de turbulencia lateral, 25 km de frente de ráfaga por delante, media pulgada
 * de granizo, 100 ft de error de altímetro, 20 NM de separación) son del
 * capítulo y se citan como suyas. Ninguna se redondea ni se adorna.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const PARTE_FRENTES: DocScreen[] = [
  // ── 10 ──────────────────────────────────────────────────────────────────
  {
    n: 10,
    title: "Masas de aire y frentes",
    kicker: "De dónde viene el aire y qué pasa cuando se encuentran dos",
    minutes: 9,
    blocks: [
      {
        kind: "p",
        text: "Un frente en la carta es una línea con triángulos o semicírculos. Para el que la mira sin entenderla es un adorno; para el que la entiende es un pronóstico completo: qué nubes, qué visibilidad, qué viento, qué presión y en qué orden. Esta lección enseña a leer esa línea.",
      },
      {
        kind: "sub",
        text: "Ver: el aire se parece a donde estuvo quieto",
      },
      {
        kind: "definicion",
        text: "Una masa de aire es un volumen grande de aire que ha estado relativamente quieto varios días sobre una región, y que ha tomado la temperatura y la humedad de esa región de origen.",
      },
      {
        kind: "p",
        text: "Se nombran con dos apellidos. El primero por la temperatura: **polar** o **tropical**. El segundo por la humedad: **marítima** o **continental**. Una masa de aire polar continental trae aire frío y seco; una tropical marítima, formada sobre aguas cálidas como el mar Caribe, trae aire cálido y húmedo.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Lo que decide el tiempo no es la masa, es sobre qué pasa",
        text: "Al moverse de su región de origen, la masa se modifica. Y ahí está la regla útil: si pasa sobre una superficie MÁS CALIENTE, se calienta desde abajo, se hace inestable y da cúmulos, chaparrones y turbulencia, con buena visibilidad en superficie. Si pasa sobre una superficie MÁS FRÍA, se hace estable y da estratos bajos y niebla, con mala visibilidad, porque el humo y el polvo no pueden ascender y se quedan atrapados abajo.",
      },
      {
        kind: "hueco",
        rotulo: "MT-T10-01 · Mapa · 4:3 · 1400×1050 · SVG",
        descripcion:
          "Mapa de América Latina con las regiones de origen de masas de aire rotuladas y coloreadas: polar marítima y polar continental al sur, tropical marítima sobre el Caribe y el Pacífico, tropical continental sobre las zonas áridas. Flechas indicando por dónde entran habitualmente a la región. Sustituye a la figura 11-24 del PHAK, que es de América del Norte y no le sirve a un piloto de la región.",
        alto: 420,
        ratio: "4 / 3",
        anchoMax: 560,
        pie: "De dónde viene el aire que te va a tocar.",
      },
      {
        kind: "sub",
        text: "Entender: el frente es la frontera",
      },
      {
        kind: "definicion",
        text: "Un frente es la capa límite entre dos masas de aire con características distintas. Un frente de cualquier tipo que se acerca siempre indica cambios inminentes en el tiempo.",
      },
      {
        kind: "p",
        text: "Se nombran por la temperatura del aire que **avanza** respecto del que va a sustituir. Y conviene decirlo de entrada: no hay dos frentes iguales. Lo que sigue son las condiciones generales que se asocian a cada tipo, que es lo que ayuda a identificarlo.",
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Los cuatro tipos",
        items: [
          {
            titulo: "Cálido",
            ref: "el aire cálido avanza y sustituye al frío",
            puntos: [
              "Se mueve despacio: de 15 a 40 km/h (10 a 25 mph).",
              "La pendiente del frente se desliza por encima del aire frío y lo va empujando fuera.",
              "Trae aire cálido, a menudo con humedad muy alta.",
              "Avisa con antelación y puede tardar días en pasar por una región.",
            ],
          },
          {
            titulo: "Frío",
            ref: "el aire frío avanza y sustituye al cálido",
            puntos: [
              "Se mueve más rápido: de 30 a 55 km/h (20 a 35 mph), y se han registrado extremos de hasta 100 km/h.",
              "Es denso, se queda pegado al suelo y se mete por debajo del aire cálido, forzándolo a ascender.",
              "El ascenso rápido baja la temperatura de golpe y crea nubes.",
              "Llega con poca o ninguna advertencia y cambia el tiempo entero en unas horas.",
            ],
          },
          {
            titulo: "Estacionario",
            ref: "las dos masas se empujan con fuerzas parecidas",
            puntos: [
              "El límite se queda quieto e influye en el tiempo local durante días.",
              "El tiempo asociado es una mezcla del de un frente frío y el de uno cálido.",
            ],
          },
          {
            titulo: "Ocluido",
            ref: "un frente frío rápido alcanza a uno cálido lento",
            puntos: [
              "Al acercarse prevalece el tiempo del frente cálido, e inmediatamente después el del frío.",
              "Oclusión de frente frío: el aire que llega es más frío que el de delante, y levanta al frente cálido. Da una mezcla de los dos tiempos si el aire es relativamente estable.",
              "Oclusión de frente cálido: el aire de delante es más frío, y el frente frío sube por encima. Si el aire forzado a subir es inestable, el tiempo es más severo que en la otra: tormentas, lluvia y niebla.",
            ],
          },
        ],
      },
      {
        kind: "hueco",
        rotulo: "MT-T10-02 · Diagrama · 16:9 · 1600×900 · SVG",
        descripcion:
          "Los cuatro símbolos frontales de carta (triángulos para el frío, semicírculos para el cálido, alternados para el estacionario, combinados para el ocluido) grandes y rotulados, y debajo de cada uno un corte vertical de dos o tres líneas mostrando cómo se monta una masa sobre la otra. Es la pieza de traducción entre lo que se ve en la carta y lo que ocurre en el aire. Sustituye a la figura 11-25 del PHAK.",
        alto: 340,
        pie: "El símbolo de la carta y lo que significa en vertical.",
      },
      {
        kind: "sub",
        text: "Interpretar: el viento cambia porque el frente es una frontera de presión",
      },
      {
        kind: "p",
        text: "Los vientos alrededor de una alta y de una baja giran en sentidos opuestos. Cuando dos sistemas están pegados, en el punto de contacto los vientos van casi en oposición directa. Un frente es justo el límite entre dos áreas de presión, así que **dentro de un frente hay cambios de viento continuamente**, y el cambio de dirección es más pronunciado en los frentes fríos.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Esto conecta con la lección 5",
        text: "«Cambio de viento pronunciado» cerca del suelo tiene otro nombre: cizalladura a bajo nivel. El paso de un sistema frontal está en la lista corta de situaciones con las que se asocia. Un frente frío cruzando el aeródromo a la hora de tu aproximación no es un dato de la carta: es una condición de tu aterrizaje.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Cómo se clasifican las masas de aire?",
            respuesta:
              "Por su región de origen, que es donde estuvieron quietas varios días tomando su temperatura y su humedad. Se identifican como polares o tropicales por temperatura, y como marítimas o continentales por humedad. Una polar continental trae aire frío y seco; una tropical marítima, formada por ejemplo sobre el Caribe, trae aire cálido y húmedo.",
            claves: ["Región de origen", "Polar o tropical", "Marítima o continental"],
          },
          {
            nivel: "interpretacion",
            q: "Una masa de aire se mueve sobre una superficie más fría que ella. ¿Qué tiempo espera?",
            respuesta:
              "Se hace estable, porque no se forman corrientes de convección. Espero estratos bajos y niebla, y mala visibilidad en superficie, porque el humo, el polvo y las partículas no pueden ascender y quedan atrapados cerca del suelo.",
            claves: ["Estable", "Sin convección", "Estratos bajos y niebla", "Mala visibilidad en superficie"],
          },
          {
            nivel: "situacion",
            q: "¿Qué diferencia hay entre una oclusión de frente frío y una de frente cálido?",
            respuesta:
              "En la de frente frío, el aire del frente frío que llega es más frío que el que hay delante del cálido, así que lo reemplaza y obliga al frente cálido a subir; suele dar una mezcla del tiempo de los dos si el aire es relativamente estable. En la de frente cálido, el aire de delante es más frío que el del frente frío, y entonces el frío sube por encima; si el aire forzado a ascender es inestable, el tiempo es más severo que en la otra, con tormentas, lluvia y niebla.",
            claves: [
              "Depende de cuál de los dos aires es más frío",
              "Oclusión fría: mezcla de ambos tiempos",
              "Oclusión cálida con aire inestable: más severa",
            ],
          },
        ],
      },
    ],
  },

  // ── 11 ──────────────────────────────────────────────────────────────────
  {
    n: 11,
    title: "Cruzar un frente",
    kicker: "El mismo tramo, dos frentes, dos decisiones",
    minutes: 10,
    blocks: [
      {
        kind: "p",
        text: "El capítulo hace algo poco común y muy útil: coge un tramo concreto, Junín a Formosa, y lo vuela dos veces, una contra un frente cálido y otra contra uno frío. Los dos vuelos acaban en la misma decisión (quedarse en tierra), pero por razones distintas y con avisos distintos. Vamos a hacer los dos.",
      },
      {
        kind: "titulo",
        text: "Vuelo 1: contra un frente cálido",
        sub: "Un frente cálido avanza hacia el sur desde Formosa",
      },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Salida de Junín",
            texto: "Buen tiempo VFR, cirros dispersos a 15.000 ft. Nada que reportar.",
          },
          {
            rotulo: "Hacia Paraná",
            texto: "Las nubes se profundizan y se hacen estratiformes, con techo de 6.000 ft. Visibilidad 10 km con neblina, y la presión barométrica cayendo.",
          },
          {
            rotulo: "Acercándose a Reconquista",
            texto: "Nubes con pocos claros a 2.000 ft, 5 km de visibilidad y lluvia. La temperatura ha igualado al punto de rocío, así que es probable que haya niebla.",
            fuerte: true,
          },
          {
            rotulo: "Formosa",
            texto: "Cielo cubierto con nubes bajas, llovizna y 1 km de visibilidad.",
          },
        ],
      },
      {
        kind: "p",
        text: "Más allá de Reconquista el techo y la visibilidad ya serían demasiado bajos para continuar VFR. Lo prudente es **quedarse en Reconquista hasta que pase el frente cálido, lo que puede llevar un día o dos**.",
      },
      {
        kind: "sub",
        text: "La firma de un frente cálido, en tres tiempos",
      },
      {
        kind: "fichas",
        columnas: 3,
        items: [
          {
            titulo: "Antes de que pase",
            puntos: [
              "Nubes estratiformes o cirros a lo largo del límite frontal, con niebla.",
              "En verano pueden desarrollarse cumulonimbus.",
              "Precipitación ligera a moderada: lluvia, aguanieve, nieve o llovizna.",
              "Escasa visibilidad. Temperatura fresca o fría y punto de rocío en aumento.",
              "La presión sigue cayendo hasta que el frente pasa del todo.",
            ],
          },
          {
            titulo: "Durante el paso",
            puntos: [
              "Nubes estratiformes visibles y posible llovizna.",
              "Visibilidad generalmente pobre, que mejora con los vientos variables.",
              "La temperatura sube de forma constante.",
              "El punto de rocío se mantiene estable y la presión se nivela.",
            ],
          },
          {
            titulo: "Después",
            puntos: [
              "Predominan los estratocúmulos y son posibles lluvias.",
              "La visibilidad acaba mejorando, aunque puede haber niebla un rato.",
              "El punto de rocío sube y luego se estabiliza.",
              "Ligero aumento de presión y después un descenso.",
            ],
          },
        ],
      },
      {
        kind: "titulo",
        text: "Vuelo 2: el mismo tramo, contra un frente frío",
      },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Salida de Junín",
            texto: "VFR con 5 km de visibilidad con humo y una capa dispersa a 3.500 ft.",
          },
          {
            rotulo: "Hacia Paraná",
            texto: "Las nubes muestran signos de desarrollo vertical, con una capa con claros a 2.500 ft. Visibilidad 10 km con neblina y la presión bajando.",
          },
          {
            rotulo: "Aproximándose a Paraná",
            texto: "Cielo cubierto a 1.000 ft y 5 km de visibilidad, con tormentas y fuertes chaparrones.",
            fuerte: true,
          },
          {
            rotulo: "Formosa",
            texto: "El tiempo mejora: nubes dispersas a 1.000 ft y 15 km de visibilidad.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Fíjate en el detalle que cambia todo",
        text: "En el frente frío el destino está mejor que el punto medio. La tentación de seguir es enorme, porque el pronóstico de llegada es bueno. Y aun así lo correcto es quedarse en Paraná hasta que el frente pase: volar por debajo de una línea de tormentas es peligroso, y volar por encima o alrededor no es una opción cuando la línea se extiende de 500 a 800 km y las tormentas suben mucho más de lo que alcanza un avión pequeño.",
      },
      {
        kind: "sub",
        text: "Comparar los dos, que es lo que se pregunta",
      },
      {
        kind: "table",
        head: ["", "Frente cálido", "Frente frío"],
        rows: [
          ["Velocidad", "15 a 40 km/h", "30 a 55 km/h, extremos hasta 100"],
          ["Pendiente frontal", "Tendida: se desliza por encima", "Pronunciada: se mete por debajo"],
          ["Aviso", "Avisa con antelación, tarda días", "Poca o ninguna advertencia"],
          ["Dónde está el tiempo", "Por delante del frente", "A lo largo del límite frontal"],
          ["Qué trae", "Techos bajos, poca visibilidad y lluvia", "Tormentas repentinas, viento racheado, turbulencia, a veces granizo y tornados"],
          ["Después de pasar", "Mejora lentamente", "Mejora rápido, aire seco y visibilidad ilimitada"],
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "La excepción que hay que saberse",
        text: "El tiempo de un frente frío se produce a lo largo del límite frontal y no por delante. Pero en los meses de verano pueden formarse líneas de turbonada hasta 300 km POR DELANTE de un frente frío severo. Ver el frente lejos en la carta no significa que el tiempo esté lejos.",
      },
      {
        kind: "sub",
        text: "El frente frío rápido, que es el peor de los dos",
      },
      {
        kind: "vinetas",
        items: [
          "Lo empujan sistemas de presión intensos por detrás.",
          "La fricción con el suelo frena la parte baja y hace la superficie frontal más empinada todavía.",
          "El resultado es una banda muy estrecha y concentrada en el borde delantero.",
          "Si el aire cálido que alcanza es estable, puede haber cielo nublado y lluvias bastante por delante del frente.",
          "Si el aire cálido es inestable, se forman tormentas dispersas y chaparrones, y puede formarse una línea de turbonada por delante o a lo largo del frente.",
          "Detrás, los cielos se despejan rápido y quedan vientos racheados, turbulentos y temperaturas más frías.",
        ],
      },
      {
        kind: "hueco",
        rotulo: "MT-T11-01 · Diagrama · 3:1 · 1800×600 · SVG",
        descripcion:
          "Dos cortes verticales apilados del mismo tramo (Junín a Formosa), uno con frente cálido y otro con frío, con la nubosidad asociada dibujada a escala y la trayectoria del vuelo cruzándolos. Sobre cada corte, las cuatro paradas rotuladas con su techo y visibilidad. La pendiente tendida del cálido y la empinada del frío tienen que verse comparadas. Sustituye a las figuras 11-26 y 11-27 del PHAK.",
        alto: 300,
        ratio: "3 / 1",
        pie: "El mismo tramo, dos frentes, dos nubosidades.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En ruta, decidiendo",
        situacion:
          "Vas hacia un destino que en el pronóstico está bueno. En el punto medio de la ruta hay un frente frío con tormentas y el destino está detrás de él. Tienes combustible para llegar.",
        pregunta: "¿Qué es lo que no puedes hacer, y por qué la calidad del destino no lo cambia?",
        claves: [
          "No puedes volar por debajo de la línea de tormentas: es peligroso, y por debajo está la cizalladura del frente de ráfaga.",
          "No puedes volar por encima ni rodearla con facilidad: las tormentas se extienden mucho más arriba de lo que alcanza un avión ligero y la línea puede medir de 500 a 800 km.",
          "Que el destino esté bueno es exactamente lo que hace peligrosa esta situación: el pronóstico de llegada empuja a cruzar, y lo que hay que decidir no es el destino sino el punto medio.",
          "La decisión del capítulo, para el mismo caso, es quedarse en tierra hasta que el frente pase.",
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Y lo que decide de verdad es tu manual",
        text: "Distancias mínimas a células, criterios de desvío, uso del radar y política de combustible extra son del manual de operaciones de tu explotador y del tipo que vueles. Lo de arriba es cómo se comporta el frente, que es lo que te permite entender por qué esos criterios dicen lo que dicen.",
      },
    ],
  },

  // ── 12 ──────────────────────────────────────────────────────────────────
  {
    n: 12,
    title: "Tormentas y sus peligros",
    kicker: "Todo lo que puede salir mal, en un solo paquete",
    minutes: 11,
    blocks: [
      {
        kind: "p",
        text: "El capítulo lo dice con una frase que vale la pena repetir: **una tormenta junta casi todos los peligros meteorológicos conocidos para la aviación en un solo paquete.** No es una lista de cosas que pueden pasar: es una lista de cosas que están pasando a la vez ahí dentro.",
      },
      {
        kind: "sub",
        text: "Ver: qué hace falta para que nazca una",
      },
      {
        kind: "secuencia",
        titulo: "Tres ingredientes, y hacen falta los tres",
        numerada: true,
        items: [
          "Vapor de agua suficiente.",
          "Un gradiente térmico inestable.",
          "Una acción de elevación inicial que arranque el proceso.",
        ],
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Tormenta de masa de aire",
            puntos: [
              "Aparece al azar en aire inestable, por calentamiento de la superficie.",
              "Dura una o dos horas.",
              "Da ráfagas de viento y lluvias moderadas.",
            ],
          },
          {
            titulo: "Tormenta de estado estable",
            puntos: [
              "Asociada a sistemas meteorológicos: frentes, vientos convergentes, valles en altura.",
              "En la etapa de madurez las corrientes ascendentes son más fuertes y duran mucho más que en las de masa de aire, y de ahí el nombre.",
              "A menudo se forman en líneas de turbonada.",
            ],
          },
        ],
      },
      {
        kind: "sub",
        text: "Entender: las tres etapas, y cuál es la mala",
      },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Cúmulo",
            texto: "Empieza el ascenso. Con humedad e inestabilidad suficientes la nube sigue creciendo en altura, y las corrientes ascendentes fuertes y continuas impiden que la humedad caiga. La región de ascendentes se hace más grande que las térmicas que la alimentan.",
          },
          {
            rotulo: "Madurez",
            texto: "A los quince minutos aproximadamente. Es el periodo más violento del ciclo. Las gotas ya pesan demasiado para que la nube las sostenga y caen como lluvia o granizo, y eso crea un movimiento descendente. Dentro y cerca de la nube conviven aire cálido ascendente, aire frío descendente inducido por la precipitación y turbulencia violenta. Debajo, el aire descendente aumenta el viento en superficie y baja la temperatura.",
            fuerte: true,
          },
          {
            rotulo: "Disipación",
            texto: "Cuando el movimiento vertical de la parte alta se frena, la cima se expande y toma forma de yunque. Las corrientes descendentes se generalizan y reemplazan a las ascendentes que sostenían la tormenta.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Lo que el yunque dice, y lo que no",
        text: "El capítulo dibuja el yunque en la disipación, cuando la cima deja de crecer y se extiende. Mucha bibliografía de meteorología lo muestra ya en la madurez, en cuanto la corriente ascendente llega arriba. Para la cabina la lectura es la misma con cualquiera de las dos: **un yunque no significa que la tormenta se esté apagando**. Dice que la ascendente llegó hasta arriba, y la célula se sigue rodeando igual: como verás más abajo, el granizo puede caer varios kilómetros fuera de la nube.",
      },
      {
        kind: "hueco",
        rotulo: "MT-T12-01 · Diagrama · 3:1 · 1800×600 · SVG",
        descripcion:
          "Las tres etapas de una tormenta en fila, con la sección de la nube en cada una y las flechas de corriente dentro: solo ascendentes en la etapa cúmulo, ascendentes y descendentes conviviendo en la madura con la precipitación cayendo, y descendentes generalizadas con el yunque abierto en la de disipación. Rotular «15 minutos» sobre la flecha que va de la primera a la segunda. Sustituye a la figura 11-23 del PHAK.",
        alto: 300,
        ratio: "3 / 1",
        pie: "El ciclo entero, y dónde está el punto violento.",
      },
      {
        kind: "sub",
        text: "Interpretar: los peligros, uno a uno",
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Lo que hay dentro del paquete",
        items: [
          {
            titulo: "Turbulencia",
            puntos: [
              "Está presente en todas las tormentas y una severa puede destruir una aeronave.",
              "Dentro de la nube nace de la cizalladura entre corrientes ascendentes y descendentes.",
              "Fuera de la nube se ha encontrado turbulencia de cizalladura a varios miles de pies por encima y hasta 30 km lateralmente de una tormenta fuerte.",
              "El frente de ráfaga se mueve por delante de la precipitación, hasta 25 km, y produce cambios rápidos y drásticos del viento en superficie.",
            ],
            nota: "La nube rollo en el frente de la tormenta marca el techo de esos remolinos: es una zona muy turbulenta.",
          },
          {
            titulo: "Granizo",
            puntos: [
              "Compite con la turbulencia como mayor peligro.",
              "Las gotas superenfriadas suben y bajan con las corrientes, creciendo al tocar más humedad, hasta que caen.",
              "Puede ir del tamaño de un poroto a 10 cm de diámetro, más que una pelota de béisbol.",
              "Piedras de más de media pulgada pueden dañar una aeronave en pocos segundos.",
            ],
          },
          {
            titulo: "Engelamiento",
            puntos: [
              "Las ascendentes mantienen arriba mucha agua líquida y con gotas grandes; por encima del nivel de congelación queda superenfriada.",
              "El agua superenfriada se congela al impactar con el avión.",
              "El hielo claro se forma muy rápido entre 0 °C y -15 °C, y es frecuente en un grupo de células.",
              "Hacia -15 °C la mayor parte del vapor restante se sublima como cristales de hielo, y por encima hay menos agua superenfriada.",
            ],
            nota: "Ojo con generalizar: hay engelamiento siempre que la temperatura se acerque a 0 °C y haya humedad visible, no solo en tormentas.",
          },
          {
            titulo: "Tornados",
            puntos: [
              "Las tormentas más violentas meten aire en la base con mucho vigor; si ese aire trae rotación, se forma un vórtice muy concentrado.",
              "El viento en ese vórtice puede superar los 200 kt.",
              "Si el embudo no llega al suelo es una nube embudo; si toca, es un tornado.",
              "Una aeronave que entra en el vórtice casi con seguridad sufre daño estructural.",
              "El vórtice se extiende hacia dentro de la nube, así que en IFR se puede encontrar uno oculto.",
            ],
          },
          {
            titulo: "Rayos",
            puntos: [
              "Puede perforar el recubrimiento y dañar equipos de comunicaciones y navegación.",
              "Un relámpago cercano puede cegar momentáneamente al piloto.",
              "También puede inducir errores permanentes en el compás magnético.",
            ],
          },
          {
            titulo: "Techo, visibilidad y altímetro",
            puntos: [
              "Dentro de la nube la visibilidad es casi nula, y debajo la restringen la precipitación y el polvo.",
              "La presión cae rápido al llegar la tormenta, sube de golpe con la primera ráfaga y la descendente fría, y vuelve a caer al pasar.",
              "Ese ciclo entero puede darse en 15 minutos, y sin un ajuste correcto el altímetro puede tener más de 100 ft de error.",
            ],
          },
        ],
      },
      {
        kind: "sub",
        text: "La línea de turbonada",
      },
      {
        kind: "definicion",
        text: "Una línea de turbonada (squall line) es una banda estrecha de tormentas activas. Suele desarrollarse en o delante de un frente frío con aire húmedo e inestable, pero puede aparecer en aire inestable lejos de cualquier frente.",
      },
      {
        kind: "vinetas",
        items: [
          "Puede ser demasiado larga para desviarla con facilidad y demasiado ancha y severa para penetrarla.",
          "Suele contener tormentas estables y presenta el riesgo meteorológico individual más intenso para las aeronaves.",
          "Se forma rápidamente y alcanza su máxima intensidad al atardecer y en las primeras horas de oscuridad.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "La regla de oro del capítulo",
        text: "Rodear las tormentas identificadas como severas o que den un eco de radar intenso a por lo menos 20 millas náuticas, porque el granizo puede caer varios kilómetros fuera de la nube. Y si rodearla no es una opción: permanecer en el suelo hasta que pase.",
        sellos: ["20 NM", "El granizo cae fuera de la nube", "Si no se puede rodear, no se sale"],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Un apunte sobre lo que sí ves",
        text: "Se han observado familias de tornados como apéndices de una nube principal, extendiéndose varios kilómetros fuera de la zona de rayos y precipitación. La consecuencia práctica es directa: cualquier nube conectada a una tormenta severa lleva la amenaza, aunque ahí no esté lloviendo ni relampagueando.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué hace falta para que se forme una tormenta y cuáles son sus etapas?",
            respuesta:
              "Hacen falta vapor de agua suficiente, un gradiente térmico inestable y una acción de elevación inicial. Las etapas son cúmulo, en la que empieza el ascenso y la nube crece; madurez, que llega a los quince minutos aproximadamente y es el periodo más violento, con ascendentes y descendentes conviviendo y precipitación cayendo; y disipación, cuando las descendentes se generalizan y reemplazan a las ascendentes. Un yunque a la vista no quiere decir que la tormenta esté en disipación: se rodea igual.",
            claves: ["Vapor, inestabilidad y elevación inicial", "Cúmulo, madurez, disipación", "La madura es la violenta"],
          },
          {
            nivel: "interpretacion",
            q: "¿A qué distancia rodearía una tormenta severa y por qué?",
            respuesta:
              "A por lo menos 20 millas náuticas, porque el granizo puede caer varios kilómetros fuera de la nube. Y hay que contar además con que la turbulencia de cizalladura se encuentra hasta 30 km lateralmente de una tormenta fuerte y que el frente de ráfaga puede ir 25 km por delante de la precipitación.",
            claves: ["20 NM", "El granizo cae fuera", "Turbulencia a 30 km y frente de ráfaga a 25 km"],
          },
          {
            nivel: "situacion",
            q: "¿Por qué el altímetro es un problema al pasar una tormenta?",
            respuesta:
              "Porque la presión cae rápido al llegar, sube abruptamente con la primera ráfaga y la corriente descendente fría, y luego vuelve a caer cuando la tormenta pasa. Ese ciclo completo puede ocurrir en quince minutos, y si no se recibe un ajuste de altímetro correcto el error puede superar los 100 ft.",
            claves: ["Ciclo de presión en 15 minutos", "Más de 100 ft de error", "Hace falta ajuste actualizado"],
          },
        ],
      },
    ],
  },
]
