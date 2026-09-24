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
    kicker: "Origen del aire, límites y cambios posibles",
    minutes: 9,
    blocks: [
      {
        kind: "p",
        text: "**Qué ves en la portada:** nubosidad extensa y precipitación distante sobre un aeródromo. **Cómo lo reconoces:** hay sectores con condiciones distintas, pero una sola imagen no demuestra la presencia ni el tipo de frente. **Qué decides:** ubicar el sistema en un análisis meteorológico vigente y contrastar pronóstico, observaciones, radar y avisos antes de planear la ruta o la llegada.",
      },
      {
        kind: "sub",
        text: "Ver: la región de origen influye en el aire",
      },
      {
        kind: "definicion",
        text: "Una masa de aire es un cuerpo extenso con temperatura y humedad relativamente uniformes, adquiridas en buena parte durante su permanencia sobre una región de origen. Sus propiedades cambian al desplazarse.",
      },
      {
        kind: "p",
        text: "Una clasificación frecuente combina origen térmico (**polar** o **tropical**) y superficie de origen (**marítima** o **continental**). Por ejemplo, el aire polar continental suele ser frío y seco respecto de su entorno; el tropical marítimo suele ser cálido y húmedo. Son características relativas, no un pronóstico de nubes o visibilidad en cualquier lugar.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "La superficie modifica la masa de aire",
        text: "Sobre una superficie más cálida, el calentamiento desde abajo puede favorecer mezcla y convección; con humedad suficiente podrían aparecer cúmulos y chubascos. Sobre una superficie más fría, el enfriamiento de las capas bajas puede favorecer estabilidad, estratos o niebla si hay humedad. Ninguno de esos resultados, incluida la visibilidad, está garantizado por la etiqueta de la masa: comprueba el perfil, la humedad y los reportes actuales.",
      },
      {
        kind: "infografia",
        nombre: "meteo-masas",
      },
      {
        kind: "p",
        text: "**Qué ves en la matriz:** dos criterios de origen, temperatura y superficie marítima o continental. **Cómo la reconoces:** cruza la fila térmica con la columna de humedad; es una clasificación general. **Qué decides:** úsala para formular hipótesis, no para sustituir el pronóstico de la ruta ni las observaciones del aeródromo.",
      },
      {
        kind: "check",
        question:
          "Una masa polar continental se desplaza sobre una superficie mucho más cálida. ¿Cuál es la interpretación más prudente?",
        options: [
          "Siempre habrá estratos y niebla por su origen polar",
          "El calentamiento desde abajo puede aumentar la mezcla y la convección; compruebo humedad y condiciones observadas antes de esperar chubascos o buena visibilidad",
          "La masa conservará exactamente sus propiedades de origen durante todo el trayecto",
        ],
        answer: 1,
        explain:
          "El calentamiento desde abajo puede desestabilizar las capas bajas. Para anticipar nubes o precipitación también importan la humedad, el ascenso y el perfil térmico. La mezcla puede mejorar la visibilidad, pero no la garantiza: usa observaciones y pronóstico vigentes.",
      },
      {
        kind: "sub",
        text: "Entender: el frente es la frontera",
      },
      {
        kind: "definicion",
        text: "Un frente es una zona de transición entre masas de aire con propiedades distintas, sobre todo temperatura y densidad. Su desplazamiento puede cambiar viento, nubosidad, precipitación y visibilidad, pero la intensidad y el momento dependen del sistema concreto.",
      },
      {
        kind: "p",
        text: "Los frentes frío y cálido se nombran por la masa que avanza. Los símbolos en la carta muestran tipo y dirección de avance; las nubes y el tiempo asociados son patrones posibles, no una secuencia obligatoria. Confirma posición y movimiento en productos vigentes.",
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
              "El aire cálido tiende a ascender gradualmente sobre aire más frío cerca de la superficie.",
              "Con humedad y ascenso suficientes puede producir nubosidad estratiforme extensa y precipitación continua por delante del límite en superficie.",
              "No todos se mueven a la misma velocidad ni traen niebla; comprueba posición, tendencia y cambios de techo y visibilidad.",
            ],
          },
          {
            titulo: "Frío",
            ref: "el aire frío avanza y sustituye al cálido",
            puntos: [
              "El aire más frío y denso avanza bajo el cálido y favorece su ascenso.",
              "Si el aire cálido es húmedo e inestable, pueden aparecer chubascos o tormentas cerca del límite o delante de él.",
              "La velocidad, la pendiente y el tiempo asociado varían: un frente frío puede pronosticarse y no implica tormentas en todos los casos.",
            ],
          },
          {
            titulo: "Estacionario",
            ref: "el límite se desplaza poco",
            puntos: [
              "Las masas pueden moverse a lo largo del límite aunque este apenas avance.",
              "Con humedad y ascenso puede mantener nubes o precipitación durante un período prolongado; no siempre tiene tiempo severo.",
            ],
          },
          {
            titulo: "Ocluido",
            ref: "un frente frío alcanza a uno cálido",
            puntos: [
              "Se forma cuando un frente frío alcanza uno cálido y el aire cálido queda elevado sobre la superficie.",
              "En una oclusión fría, el aire que llega detrás es el más frío; en una cálida, el aire que está delante es el más frío.",
              "Puede combinar nubes y precipitación extensas con zonas convectivas; el tipo de oclusión no fija por sí solo la severidad.",
            ],
          },
        ],
      },
      {
        kind: "infografia",
        nombre: "meteo-simbolos",
      },
      {
        kind: "p",
        text: "**Qué ves en el esquema:** cuatro símbolos de carta y cortes verticales simplificados. **Cómo los reconoces:** triángulos para el frío, semicírculos para el cálido, símbolos en lados opuestos para el estacionario y en el mismo lado para el ocluido. **Qué decides:** ubicar la posición real en el análisis vigente; el corte conceptual no indica nubes, intensidad ni mínimos en tu ruta.",
      },
      {
        kind: "reconoce",
        titulo: "Banda extensa de nubes y lluvia",
        intro: "Una vista lateral permite reconocer la extensión de una capa y la precipitación distante. Es compatible con una zona frontal, pero también puede tener otras causas.",
        imagen: {
          src: "/modulos/meteorologia/mt-t10-01-banda-nubosa.webp",
          alt: "Vista aérea oblicua de una extensa capa nubosa con una banda distante de precipitación sobre el terreno",
          ancho: 1600,
          alto: 800,
        },
        puntos: [
          { x: 64, y: 30, que: "Capa extensa", significa: "La nubosidad ocupa un área amplia; una foto no identifica por sí sola el frente ni su altitud.", piloto: "Contrasta el análisis y las bases y coberturas reportadas a lo largo de la ruta." },
          { x: 74, y: 46, que: "Precipitación distante", significa: "La cortina sugiere caída de precipitación, pero no muestra intensidad medida ni lo que ocurre dentro de la nube.", piloto: "Revisa radar, observaciones y avisos antes de planear un cruce o una llegada." },
          { x: 22, y: 37, que: "Sector más abierto", significa: "Una zona menos cubierta en este encuadre no asegura que el resto de la ruta esté despejado.", piloto: "Considera toda la trayectoria, el alterno y la evolución prevista, no solo el claro visible." },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** una capa amplia y una banda de precipitación en el horizonte. **Cómo la reconoces:** la lluvia se distingue como una cortina bajo las nubes. **Qué decides:** integrar análisis frontal, radar y reportes de ruta; la fotografía no demuestra si el frente es cálido, frío o incluso si hay uno.",
      },
      {
        kind: "sub",
        text: "Interpretar: el viento puede cambiar al cruzar una zona frontal",
      },
      {
        kind: "p",
        text: "El gradiente de presión, la circulación del sistema, la fricción y el relieve influyen en el viento. Al atravesar una zona frontal puede cambiar su dirección o intensidad, a veces de manera marcada; no ocurre igual en todos los frentes. Revisa el viento actual y previsto a las altitudes y horas relevantes, especialmente cerca del suelo.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Esto conecta con la lección 5",
        text: "Un cambio rápido del viento con la altura o en una distancia corta cerca del suelo puede ser cizalladura a bajo nivel. Un sistema frontal puede favorecerla, pero su presencia e intensidad se evalúan con avisos, reportes, observaciones y procedimientos de la operación; el símbolo de la carta no la confirma.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Cómo se clasifican las masas de aire?",
            respuesta:
              "Por propiedades adquiridas en su región de origen: una clasificación frecuente distingue origen térmico polar o tropical y superficie marítima o continental. El aire polar continental suele ser relativamente frío y seco, y el tropical marítimo, relativamente cálido y húmedo. Al desplazarse, sus propiedades se modifican; para el vuelo consulto condiciones actuales y pronóstico.",
            claves: ["Región de origen", "Polar o tropical", "Marítima o continental", "La masa cambia al desplazarse"],
          },
          {
            nivel: "interpretacion",
            q: "Una masa de aire se mueve sobre una superficie más fría que ella. ¿Qué tiempo espera?",
            respuesta:
              "El enfriamiento desde abajo tiende a estabilizar las capas bajas y, si hay humedad suficiente, puede favorecer estratos o niebla. No deduzco automáticamente mala visibilidad: la compruebo en observaciones y pronóstico, junto con la temperatura, la humedad y el viento.",
            claves: ["Enfriamiento desde abajo", "Posible estabilidad", "La humedad condiciona nubes y niebla", "Confirmar visibilidad"],
          },
          {
            nivel: "situacion",
            q: "¿Qué diferencia hay entre una oclusión de frente frío y una de frente cálido?",
            respuesta:
              "En una oclusión fría, la masa que avanza por detrás del frente frío es la más fría y se mete por debajo de la que está delante. En una oclusión cálida, la masa situada por delante es la más fría y el aire que llega asciende sobre ella. En ambos casos el aire cálido queda elevado; la severidad depende también de humedad, estabilidad y dinámica, no solo del nombre de la oclusión.",
            claves: [
              "Depende de cuál de los dos aires es más frío",
              "Oclusión fría: el más frío llega detrás",
              "Oclusión cálida: el más frío está delante",
              "La severidad no es automática",
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
        kind: "check",
        question:
          "Es verano y en la carta el frente frío está todavía a 200 km de tu ruta. ¿Puedes contar con que el tiempo está igual de lejos?",
        options: [
          "Sí: el tiempo de un frente frío se produce a lo largo del límite frontal, así que viaja con él",
          "No: pueden formarse líneas de turbonada hasta 300 km por delante de un frente frío severo",
          "No, pero al revés: el tiempo de un frente frío queda por detrás, así que ya lo tienes pasado",
        ],
        answer: 1,
        explain:
          "La regla general sí dice que el tiempo de un frente frío se produce a lo largo del límite frontal y no por delante, y por eso la primera opción suena razonable. La excepción es justo la que hay que saberse: en los meses de verano pueden formarse líneas de turbonada hasta 300 km por delante de un frente frío severo. Ver el frente lejos en la carta no significa que el tiempo esté lejos.",
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
        kind: "infografia",
        nombre: "meteo-ruta",
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
        kind: "infografia",
        nombre: "meteo-etapas",
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
        kind: "check",
        question:
          "Tienes una línea de turbonada pronosticada en la zona y puedes salir a media mañana o a última hora de la tarde. ¿Qué tienes en cuenta?",
        options: [
          "Que alcanza su máxima intensidad al atardecer y en las primeras horas de oscuridad",
          "Que lo peor es a media mañana, cuando el calentamiento del suelo dispara la convección",
          "Que la hora da igual: una línea de turbonada mantiene su intensidad mientras exista",
        ],
        answer: 0,
        explain:
          "La línea de turbonada se forma rápidamente y alcanza su máxima intensidad al atardecer y en las primeras horas de oscuridad. Eso convierte la hora de salida en una decisión meteorológica: la misma ruta a las once de la mañana y a las siete de la tarde no es el mismo vuelo. Y si la línea ya está hecha, suele ser demasiado larga para desviarla con facilidad y demasiado ancha y severa para penetrarla.",
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
