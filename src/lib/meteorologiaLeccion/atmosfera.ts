/**
 * Nivel 1 · La atmósfera y el aire en movimiento.
 *
 * Adapta el capítulo 11 del Pilot Handbook of Aeronautical Knowledge (FAA
 * H-8083-25, edición en español) a lo que un piloto necesita para una
 * entrevista de aerolínea y para decidir en cabina. No es un resumen del
 * manual: el manual explica el fenómeno y aquí se explica qué se ve, qué
 * significa, cómo se lo van a preguntar y qué hace con eso el que va sentado
 * adelante.
 *
 * Las cifras (composición, gradientes, ISA, altitudes de las capas) salen del
 * capítulo y se citan como suyas. Lo que no está en el capítulo no se inventa:
 * va como escenario de práctica rotulado o con un callout de verificar.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const PARTE_ATMOSFERA: DocScreen[] = [
  // ── 01 ──────────────────────────────────────────────────────────────────
  {
    n: 1,
    title: "La atmósfera en la que vuelas",
    kicker: "Dónde ocurre el tiempo y dónde deja de ocurrir",
    minutes: 6,
    blocks: [
      {
        kind: "p",
        text: "Vas en un México a Santiago, nivel 380, de noche, aire liso. Miras abajo y hay una capa de nubes que se acaba de golpe, como si alguien le hubiera puesto una tapa. Esa tapa existe y tiene nombre: es la **tropopausa**, y saber dónde está te dice tres cosas antes de que el meteorólogo te las diga.",
      },
      {
        kind: "p",
        text: "Toda la meteorología que te va a molestar vive por debajo de ella. Las nubes, las tormentas, la turbulencia de convección, el engelamiento. Por eso la primera pregunta de una entrevista sobre atmósfera casi nunca es «cuántas capas tiene»: es «por qué el tiempo se queda en la de abajo».",
      },
      {
        kind: "sub",
        text: "Qué hay ahí fuera",
      },
      {
        kind: "kv",
        items: [
          { k: "Nitrógeno", v: "78 % del volumen" },
          { k: "Oxígeno", v: "21 %" },
          { k: "Argón, CO₂ y trazas", v: "el 1 % restante" },
          { k: "Vapor de agua", v: "de 0 a 5 %, y es el que manda" },
        ],
      },
      {
        kind: "p",
        text: "Ese último renglón es el importante. El vapor de agua es una parte pequeñísima de la mezcla y es responsable de casi todos los cambios de tiempo que te van a cambiar el plan: las nubes, la precipitación, la niebla, el engelamiento. Todo lo que decide si sales o no sales sale de ese cero a cinco por ciento.",
      },
      {
        kind: "sub",
        text: "Las capas, y por qué solo te importa una y media",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Tropósfera",
            ref: "del suelo a 26.000 ft en los polos y 48.000 ft sobre el ecuador",
            puntos: [
              "Aquí ocurre casi todo: nubes, tormentas, turbulencia y las variaciones de temperatura.",
              "La temperatura baja unos 2 °C por cada 1.000 ft.",
              "La presión baja alrededor de 1 pulgada de mercurio por cada 1.000 ft (un milibar cada 30 ft).",
            ],
            nota: "Que sea más alta sobre el ecuador que sobre los polos no es un dato de examen: es la razón de que en una ruta larga norte a sur la tapa te suba y te baje.",
          },
          {
            titulo: "Tropopausa",
            ref: "el límite de arriba",
            puntos: [
              "Atrapa la humedad y el tiempo asociado debajo de ella.",
              "Su altura cambia con la latitud y la estación, así que su forma es elíptica y no redonda.",
              "Se asocia con la corriente en chorro y con la turbulencia en aire claro.",
            ],
          },
          {
            titulo: "Estratósfera",
            ref: "de la tropopausa a unos 160.000 ft",
            puntos: [
              "Poco cambio de tiempo y aire estable.",
              "Algún tipo de nube se mete en ella de vez en cuando, pero es la excepción.",
            ],
          },
          {
            titulo: "Mesósfera y termósfera",
            ref: "por encima",
            puntos: ["Influencia sobre el clima: prácticamente ninguna. No las vas a volar."],
          },
        ],
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t01-01-corte-atmosfera.webp",
        alt: "Corte vertical de la atmósfera con las cuatro capas rotuladas, la tropopausa marcada como una línea gruesa y la banda de crucero de un jet de línea, entre FL350 y FL410, justo por debajo de ella.",
        ancho: 900,
        alto: 1125,
        anchoMax: 380,
        pie: "Dónde vuela un jet comercial respecto de la tropopausa.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En crucero",
        situacion:
          "Vuelas FL370 en ruta hacia el norte. El plan te da la tropopausa en FL380 al salir y en FL340 a mitad de ruta. No has pedido cambio de nivel.",
        pregunta: "¿Qué acaba de cambiar para ti, aunque el nivel sea el mismo?",
        claves: [
          "Empezaste debajo de la tropopausa y vas a acabar por encima de ella: la tapa bajó hasta quedar por debajo de tu nivel.",
          "Cerca de la tropopausa es donde vive la corriente en chorro, así que ahí se concentra la turbulencia en aire claro. Es el tramo en el que conviene tener el cinturón puesto aunque el aire esté liso.",
          "Por encima de la tropopausa el aire es más estable, así que si la turbulencia aparece justo al cruzarla y luego se calma, eso es lo que pasó y no una casualidad.",
        ],
        cierre:
          "El nivel de la tropopausa viene en el plan de vuelo y en las cartas de altura. Mirarlo cuesta cinco segundos y explica la mitad de las sorpresas de una ruta larga.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es la tropopausa y por qué le importa a un piloto?",
            respuesta:
              "Es el límite superior de la tropósfera. Actúa como tapa: atrapa debajo la humedad y el tiempo asociado, así que casi toda la meteorología significativa queda por debajo. Le importa al piloto porque marca dónde se acaba el tiempo y porque se asocia con la corriente en chorro y con la turbulencia en aire claro.",
            claves: [
              "Límite superior de la tropósfera",
              "Atrapa la humedad debajo",
              "Corriente en chorro y turbulencia en aire claro",
            ],
          },
          {
            nivel: "interpretacion",
            q: "En la tropósfera, ¿cuánto baja la temperatura y cuánto la presión al subir?",
            respuesta:
              "Unos 2 °C por cada 1.000 ft de temperatura, y alrededor de una pulgada de mercurio por cada 1.000 ft de presión, que es lo mismo que un milibar cada 30 ft.",
            claves: ["2 °C por 1.000 ft", "1 \"Hg por 1.000 ft", "1 mb cada 30 ft"],
          },
          {
            nivel: "situacion",
            q: "Un compañero dice que la tropopausa está siempre a la misma altura. ¿Qué le corrige?",
            respuesta:
              "Que cambia con la latitud y con la estación del año. Va de unos 26.000 ft en los polos a unos 48.000 ft sobre las regiones ecuatoriales, y por eso su forma es elíptica y no una esfera regular. En una ruta larga norte a sur la vas cruzando de altura sin cambiar de nivel.",
            claves: ["Cambia con latitud y estación", "26.000 ft en polos", "48.000 ft en el ecuador"],
          },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Ver el detalle del capítulo",
        cita: "PHAK cap. 11",
        bloques: [
          {
            kind: "p",
            text: "La atmósfera alcanza casi 700 kilómetros desde la superficie y está en movimiento constante. Además de sostener la vida, absorbe energía del sol, recicla agua y otros productos químicos, y protege de la radiación de alta energía y del frío del espacio.",
          },
          {
            kind: "p",
            text: "Las cuatro capas se identifican por sus características térmicas, su composición química, su movimiento y su densidad. La estratósfera se extiende desde la tropopausa hasta unos 160.000 ft (50 km).",
          },
        ],
      },
    ],
  },

  // ── 02 ──────────────────────────────────────────────────────────────────
  {
    n: 2,
    title: "La presión y lo que le hace a tu altímetro",
    kicker: "Por qué el mismo número significa cosas distintas",
    minutes: 8,
    blocks: [
      {
        kind: "p",
        text: "Sales de Bogotá, elevación 8.360 ft. El METAR te da un QNH y el altímetro, con ese ajuste, marca la elevación del aeródromo en la plataforma. Todo bien. Ese mismo aeropuerto, con ese mismo altímetro, te va a dar una carrera de despegue muy distinta en un día caliente que en uno frío, y el instrumento no te lo va a decir. Esta lección es sobre lo que la presión sí te dice y lo que te esconde.",
      },
      {
        kind: "sub",
        text: "Ver: el aire pesa",
      },
      {
        kind: "p",
        text: "Imagina una columna de aire sellada de un centímetro cuadrado de base y 700 kilómetros de alto. Levantarla costaría 1,03 kg. Ese es el peso del aire que tienes encima al nivel del mar. Si acortas la columna, pesa menos: a 18.000 ft el peso es de unos 0,52 kg, casi la mitad.",
      },
      {
        kind: "definicion",
        text: "La presión atmosférica es la fuerza que ejerce el peso de las moléculas de aire. No se ven, pero pesan y ocupan sitio.",
      },
      {
        kind: "p",
        text: "De ahí sale la regla que vas a usar toda tu carrera: **cada 1.000 ft de subida, la presión baja alrededor de 1 pulgada de mercurio** (unos 34 milibares).",
      },
      {
        kind: "sub",
        text: "Entender: por qué todas las estaciones mienten a propósito",
      },
      {
        kind: "p",
        text: "Una estación a 4.000 ft de elevación mide 25,92 \"Hg de verdad. Si informara ese número, tu altímetro y el de la estación de al lado, que está a nivel del mar, nunca se pondrían de acuerdo. Así que cada estación **convierte su lectura a presión al nivel del mar**, sumando aproximadamente 1 \"Hg por cada 1.000 ft de su propia elevación. Los 25,92 se informan como 29,92.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Esto es exactamente lo que lees en el METAR",
        text: "El grupo de presión del METAR (el `Q1013` o el `A2992`) no es la presión que hay en esa pista: es la presión llevada al nivel del mar. Por eso el mismo ajuste sirve para todos los aviones de la zona y por eso, puesto en el altímetro, te da elevación y no cero.",
      },
      {
        kind: "sub",
        text: "La atmósfera estándar, que es una ficción útil",
      },
      {
        kind: "kv",
        items: [
          { k: "Presión estándar al nivel del mar", v: "1013,2 mb (29,92 \"Hg)" },
          { k: "Temperatura estándar", v: "15 °C (59 °F)" },
          { k: "Equivalencia", v: "1 \"Hg ≈ 34 mb" },
          { k: "Rango habitual de lecturas", v: "de 950 a 1.040 mb" },
        ],
      },
      {
        kind: "p",
        text: "La ISA no describe ningún día concreto: es la referencia sobre la que están calibrados tus instrumentos y sobre la que están calculadas casi todas las tablas de performance del avión. Cuando el día real se aparta de ella, el avión no rinde lo que dice la tabla, y ahí es donde empieza el trabajo del piloto.",
      },
      {
        kind: "sub",
        text: "Interpretar: altitud de densidad, que es la que vuela el avión",
      },
      {
        kind: "p",
        text: "Al bajar la presión el aire se hace menos denso, «fino». Volar en aire fino equivale a estar más arriba de lo que marca el altímetro, y a eso se le llama **altitud de densidad**. La temperatura hace lo mismo: aire caliente es aire menos denso. Dos días con el mismo QNH y distinta temperatura son dos aviones distintos.",
      },
      {
        kind: "vinetas",
        items: [
          "Con aire fino hace falta más velocidad para generar la misma sustentación, así que la carrera de despegue se alarga.",
          "El PHAK lo pone en números: un avión que necesita 745 ft de carrera al nivel del mar necesita más del doble a 8.000 ft de altitud de presión.",
          "Motores y hélices también rinden menos, así que baja el régimen de ascenso y crece la distancia para franquear obstáculos.",
          "El aterrizaje se alarga por lo mismo.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t02-01-carrera-dos-altitudes.webp",
        alt: "Dos siluetas de pista con la misma aeronave: arriba, a nivel del mar, la carrera de despegue acotada en 745 ft; abajo, a 8.000 ft de altitud de presión, una carrera de más del doble.",
        ancho: 1600,
        alto: 900,
        pie: "La misma aeronave, el mismo peso, dos altitudes de presión.",
      },
      {
        kind: "sub",
        text: "Aplicar: el altímetro no sabe de temperatura",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En el briefing",
        situacion:
          "Aeropuerto de altura, mediodía, 32 °C, QNH estándar. El comandante mira el ajuste, ve que el altímetro marca la elevación de la plataforma y dice que la performance está bien porque la presión es la estándar.",
        pregunta: "¿Qué falta en ese razonamiento?",
        claves: [
          "El altímetro correcto solo dice que el ajuste de presión está bien. No dice nada de la densidad del aire.",
          "A 32 °C el aire está muy por encima de la temperatura estándar de 15 °C, así que es menos denso: la altitud de densidad es mucho mayor que la altitud de presión.",
          "La carrera de despegue, el régimen de ascenso y el franqueamiento de obstáculos hay que sacarlos de la tabla con la altitud de densidad, no con lo que marca el altímetro.",
        ],
        cierre:
          "El altímetro ajustado te dice dónde estás. La altitud de densidad te dice cómo va a volar el avión. Son dos preguntas distintas y solo una la contesta el instrumento.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Lo que la tendencia de presión te adelanta",
        text: "Siguiendo la presión de una estación a lo largo del tiempo: si sube de forma sostenida, lo normal es que se acerque buen tiempo. Si baja, y sobre todo si cae rápido, lo normal es mal tiempo y posiblemente tormentas fuertes. Es la lectura más barata que existe y está en cada METAR sucesivo del mismo aeródromo.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es la atmósfera estándar internacional y para qué sirve?",
            respuesta:
              "Es una referencia común: 1013,2 mb (29,92 \"Hg) y 15 °C al nivel del mar. Sirve porque sobre ella están calibrados ciertos instrumentos de vuelo y calculada la mayoría de los datos de performance de la aeronave.",
            claves: ["1013,2 mb / 29,92 \"Hg", "15 °C", "Base de instrumentos y de performance"],
          },
          {
            nivel: "interpretacion",
            q: "Una estación a 4.000 ft mide 25,92 \"Hg. ¿Qué informa y por qué?",
            respuesta:
              "Informa 29,92 \"Hg. Convierte su presión a presión al nivel del mar sumando aproximadamente 1 \"Hg por cada 1.000 ft de elevación, para que todas las estaciones den una referencia comparable y los altímetros de todos los aviones queden bien ajustados.",
            claves: ["29,92", "1 \"Hg por 1.000 ft", "Referencia común entre estaciones"],
          },
          {
            nivel: "situacion",
            q: "Va a despegar de un aeropuerto de altura en un día caluroso. ¿Qué espera del avión y por qué?",
            respuesta:
              "Espero peor performance en todo: carrera de despegue más larga, menor régimen de ascenso y más distancia para franquear obstáculos, y también aterrizaje más largo. La causa es la altitud de densidad: menos presión por la altura y menos densidad por el calor. Los motores y las hélices además rinden menos en aire fino.",
            claves: [
              "Altitud de densidad alta",
              "Carrera y distancia de franqueamiento mayores",
              "Menor régimen de ascenso",
              "Motores y hélices menos eficientes",
            ],
          },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Ver el detalle del capítulo",
        cita: "PHAK cap. 11",
        bloques: [
          {
            kind: "p",
            text: "La presión atmosférica se mide en pulgadas o milímetros de mercurio con un barómetro de mercurio, que mide la altura de una columna dentro de un tubo de vidrio: al subir la presión el mercurio sube, y al caer, drena. Es el de laboratorio o estación: ni portátil ni fácil de leer.",
          },
          {
            kind: "p",
            text: "El barómetro aneroide es la alternativa portátil. Lleva una cápsula cerrada que se contrae o se expande con los cambios de presión, unida por un enlace mecánico a un indicador. La parte sensora de presión del altímetro de un avión es básicamente un barómetro aneroide, y por ese enlace mecánico no es tan preciso como el de mercurio.",
          },
          {
            kind: "p",
            text: "Las cartas de presión constante y los informes de presión de huracanes se escriben en milibares.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "La altitud también te afecta a ti",
        text: "A 18.000 ft la presión parcial de oxígeno ya afecta a las funciones normales del cuerpo. Las reacciones de una persona media se deterioran hacia los 10.000 ft, y en algunas personas desde los 5.000 ft. La hipoxia se disimula y afecta distinto a cada uno, de la desorientación leve a la incapacitación. Para eso están el oxígeno suplementario y la presurización.",
      },
    ],
  },

  // ── 03 ──────────────────────────────────────────────────────────────────
  {
    n: 3,
    title: "Por qué se mueve el aire",
    kicker: "Calentamiento desigual, Coriolis y de qué lado te conviene volar",
    minutes: 7,
    blocks: [
      {
        kind: "p",
        text: "Vuelas Bogotá a Buenos Aires con viento de cola casi todo el tramo, y a la vuelta el mismo tramo te cuesta cuarenta minutos más. No es mala suerte ni una ruta mal planificada: es que la ida y la vuelta pasan por lados distintos del mismo sistema de presión. Esta lección es la que te deja mirar una carta de superficie y saber de antemano por dónde te conviene ir.",
      },
      {
        kind: "sub",
        text: "Ver: el motor de todo esto es que el sol no calienta parejo",
      },
      {
        kind: "secuencia",
        titulo: "El circuito básico",
        numerada: true,
        items: [
          "El sol calienta la superficie de forma desigual: el ecuador recibe más que los polos, porque la Tierra es curva y su eje está inclinado.",
          "El aire caliente se expande, se hace menos denso y sube.",
          "El aire frío, más denso y pesado, baja y ocupa el sitio del que subió.",
          "Ese movimiento circular, repetido a escala del planeta, es la circulación atmosférica.",
        ],
      },
      {
        kind: "p",
        text: "El calentamiento desigual no solo cambia la densidad: cambia la presión. Y donde hay diferencia de presión, hay viento, porque **el aire siempre va de la alta a la baja**.",
      },
      {
        kind: "sub",
        text: "Entender: Coriolis, que tuerce el camino",
      },
      {
        kind: "definicion",
        text: "La fuerza de Coriolis es el efecto de la rotación de la Tierra sobre lo que se mueve por ella. Desvía el aire hacia la derecha en el hemisferio norte y hacia la izquierda en el hemisferio sur.",
      },
      {
        kind: "vinetas",
        items: [
          "No la notas al caminar: te mueves despacio y poco. Sí afecta a lo que recorre grandes distancias, como una masa de aire o de agua.",
          "La desviación es máxima en los polos y se anula en el ecuador.",
          "Cuanto más rápido se mueve el cuerpo, mayor es la desviación.",
          "Por ella, el flujo general se parte en tres células por hemisferio en lugar de ir del polo al ecuador en línea recta.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Cruzar el ecuador te invierte el dibujo",
        text: "Un piloto de la región vuela los dos hemisferios en la misma semana, así que este no es un dato de examen. En el hemisferio sur el aire que sale de una alta se desvía a la izquierda y la circula en sentido antihorario (anticiclónica), y alrededor de una baja gira en sentido horario (ciclónica). En el hemisferio norte es al revés. El mismo símbolo en la carta significa un giro distinto según de qué lado del ecuador esté.",
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t03-01-coriolis-dos-hemisferios.webp",
        alt: "Cuatro sistemas de presión, dos por hemisferio, con flechas curvas mostrando el sentido de giro. El ecuador separa los dos grupos y el sentido se invierte al cruzarlo.",
        ancho: 1600,
        alto: 900,
        pie: "El mismo sistema de presión gira al revés en cada hemisferio.",
      },
      {
        kind: "sub",
        text: "Interpretar: qué tiempo trae cada sistema",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Alta presión",
            puntos: [
              "Aire que desciende, seco y estable.",
              "Se asocia normalmente con buen tiempo.",
            ],
          },
          {
            titulo: "Baja presión",
            puntos: [
              "El aire entra para reemplazar al que asciende.",
              "Aire inestable, más nubosidad y precipitación.",
              "El mal tiempo se asocia normalmente con las bajas.",
            ],
          },
        ],
      },
      {
        kind: "sub",
        text: "Aplicar: elegir el lado del sistema",
      },
      {
        kind: "p",
        text: "Aquí está el rendimiento de esta lección. Si entiendes el sentido de giro, sabes de qué lado del sistema el viento sopla a tu favor. El PHAK lo plantea para el hemisferio norte: **volando de este a oeste los vientos favorables están por el lado norte de una alta o por el lado sur de una baja**, y a la vuelta, al revés.",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Antes de aplicarlo al sur",
        text: "Esa regla está escrita para el hemisferio norte. Al sur del ecuador el sentido de giro se invierte, así que el lado favorable también. No des por buena la regla tal cual: dedúcela del sentido de giro que corresponda al hemisferio en el que estás volando, o contrástala con la carta de vientos en altura de la ruta.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Planificando la ruta",
        situacion:
          "Tienes dos rutas posibles hacia el oeste con casi la misma distancia. En la carta de superficie hay un sistema de alta presión entre las dos: una ruta pasa por el norte del sistema y la otra por el sur. Estás en el hemisferio norte.",
        pregunta: "¿Cuál eliges y por qué?",
        claves: [
          "En el hemisferio norte el aire gira alrededor de una alta en sentido horario, así que por el lado norte del sistema el viento sopla hacia el oeste.",
          "Volando hacia el oeste, esa es la ruta que te da componente de cola: se elige la que pasa por el norte de la alta.",
          "De regreso hacia el este el favorable sería el lado sur de esa misma alta.",
          "Además de combustible ganas información: sabes qué tipo de tiempo esperar en cada sector según sea alta o baja.",
        ],
        cierre:
          "Y si el mismo tramo fuera en el hemisferio sur, la respuesta sería la contraria, porque el giro se invierte. La regla que se memoriza es el sentido del giro, no el lado.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "La teoría no llega hasta el suelo",
        text: "Todo esto describe la circulación a gran escala. Cerca del suelo mandan las condiciones locales: dentro de los primeros 2.000 ft la fricción con la superficie frena el aire y reduce el efecto de Coriolis, así que el viento en superficie sopla desde una dirección algo distinta que el de unos miles de pies más arriba. Esa diferencia es la lección siguiente.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es la fuerza de Coriolis y cómo actúa en cada hemisferio?",
            respuesta:
              "Es el efecto de la rotación de la Tierra sobre los cuerpos que se mueven grandes distancias. Desvía el aire a la derecha en el hemisferio norte y a la izquierda en el hemisferio sur. Es máxima en los polos y nula en el ecuador, y crece con la velocidad del cuerpo.",
            claves: [
              "Rotación de la Tierra",
              "Derecha en el norte, izquierda en el sur",
              "Máxima en los polos, nula en el ecuador",
            ],
          },
          {
            nivel: "interpretacion",
            q: "¿Qué tiempo esperaría en una alta y qué tiempo en una baja?",
            respuesta:
              "En la alta, aire descendente, seco y estable, y por lo general buen tiempo. En la baja, aire que asciende y es inestable, con más nubosidad y precipitación, así que por lo general mal tiempo.",
            claves: ["Alta: desciende, estable, buen tiempo", "Baja: asciende, inestable, mal tiempo"],
          },
          {
            nivel: "situacion",
            q: "¿Por qué el viento en superficie no sopla en la misma dirección que a 3.000 ft?",
            respuesta:
              "Porque dentro de los primeros 2.000 ft la fricción con la superficie frena el movimiento del aire, y al frenarlo reduce la fuerza de Coriolis. Con menos desviación, el viento de superficie queda girado respecto del de arriba.",
            claves: ["Fricción en los primeros 2.000 ft", "Reduce Coriolis", "Cambio de dirección"],
          },
        ],
      },
    ],
  },

  // ── 04 ──────────────────────────────────────────────────────────────────
  {
    n: 4,
    title: "El viento cerca del suelo",
    kicker: "Convección, brisas y lo que hace un edificio con el aire",
    minutes: 8,
    blocks: [
      {
        kind: "p",
        text: "Vienes en final a una pista corta con un hangar grande a barlovento. Todo estable, senda buena, y a doscientos pies el avión se cae medio punto y luego se te va de lado. No fue tuyo: el hangar te partió el viento. Esta lección es sobre los últimos mil pies, que es donde el aire deja de comportarse como en el libro.",
      },
      {
        kind: "sub",
        text: "Ver: cada superficie devuelve el calor a su manera",
      },
      {
        kind: "kv",
        items: [
          { k: "Terreno arado, roca, arena, tierra árida", v: "emiten mucho calor: el aire sube" },
          { k: "Agua, árboles, vegetación", v: "absorben y retienen el calor: el aire baja" },
        ],
      },
      {
        kind: "definicion",
        text: "Corrientes de convección: pequeñas circulaciones locales que nacen del calentamiento desparejo de la superficie. Son las responsables del aire con baches que se siente volando bajo en un día caluroso.",
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t04-01-cuatro-superficies.webp",
        alt: "Perfil de terreno con cuatro superficies seguidas, asfalto, campo arado, bosque y lago, con flechas ascendentes sobre las dos primeras y descendentes sobre las dos últimas, y una trayectoria de vuelo bajo ondulada cruzándolas.",
        ancho: 1600,
        alto: 900,
        pie: "El mismo tramo de vuelo bajo, cuatro superficies, cuatro empujones distintos.",
      },
      {
        kind: "sub",
        text: "Interpretar: esto te mueve el punto de toma",
      },
      {
        kind: "p",
        text: "En final, el aire que sube desde un terreno pelado produce un efecto de globo que te pasa largo del punto previsto. Una aproximación sobre agua o sobre vegetación espesa hace lo contrario: te hunde y te deja corto. El avión no cambió; cambió el aire de los últimos segundos.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "La salida barata",
        text: "La turbulencia de convección se evita subiendo. Volando por encima de la capa de cúmulos el aire vuelve a estar liso. Si el tramo bajo no es obligatorio, es la decisión más simple que hay.",
      },
      {
        kind: "sub",
        text: "Las brisas, que se dan vuelta cada doce horas",
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Brisa de mar y brisa de tierra",
        items: [
          {
            titulo: "De día: brisa de mar",
            puntos: [
              "La tierra se calienta más rápido que el agua.",
              "El aire sobre tierra se calienta, se hace menos denso y sube.",
              "Lo reemplaza aire más frío y denso que viene del agua.",
              "Resultado: viento que entra desde el mar hacia la tierra.",
            ],
          },
          {
            titulo: "De noche: brisa de tierra",
            puntos: [
              "La tierra se enfría más rápido que el agua, y el aire sobre ella también.",
              "Ahora el aire más caliente está sobre el agua, y es el que sube.",
              "Lo reemplaza el aire más frío y denso que baja de la tierra.",
              "Resultado: viento que sale de la tierra hacia el agua.",
            ],
          },
        ],
      },
      {
        kind: "p",
        text: "En un aeropuerto costero eso significa que la pista en uso puede cambiar de forma previsible entre la tarde y la madrugada, sin que pase ningún frente ni cambie ningún sistema. Es la explicación de la mitad de los cambios de configuración que ves en un destino de playa.",
      },
      {
        kind: "sub",
        text: "Aplicar: obstáculos, que es el peligro invisible",
      },
      {
        kind: "p",
        text: "Las obstrucciones del suelo rompen el flujo del viento y crean ráfagas que cambian de dirección y de velocidad muy rápido. Valen igual un hangar que un acantilado. Lo importante operativamente: **la intensidad de la turbulencia depende del tamaño del obstáculo y de la velocidad del viento**, así que el mismo hangar es inofensivo con calma y serio con viento fuerte.",
      },
      {
        kind: "vinetas",
        items: [
          "En aterrizaje, la aeronave puede «caer» por la turbulencia y quedar demasiado baja para franquear los obstáculos de la aproximación.",
          "Conviene tenerlo presente al operar en aeropuertos con edificios grandes u obstáculos naturales cerca de la pista.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t04-02-edificio-y-turbulencia.webp",
        alt: "Pista con un hangar a barlovento: las líneas de corriente llegan lisas, se rompen en remolinos a sotavento y esa zona rota cae justo sobre la zona de toma, que cruza una aeronave en final.",
        ancho: 1600,
        alto: 900,
        pie: "El edificio no se mueve, pero mueve el aire donde vas a tomar.",
      },
      {
        kind: "sub",
        text: "Y en montaña, lo mismo pero peor",
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Los dos lados de una montaña no son el mismo vuelo",
        items: [
          {
            titulo: "Barlovento",
            puntos: [
              "El viento sube la ladera de forma suave.",
              "Las corrientes ascendentes ayudan a llevar la aeronave sobre la cima.",
            ],
          },
          {
            titulo: "Sotavento",
            puntos: [
              "El aire sigue el contorno del terreno y se vuelve cada vez más turbulento.",
              "Tiende a empujar la aeronave contra la ladera.",
              "Cuanto más fuerte el viento, mayor la turbulencia y mayor la presión hacia abajo.",
              "En valles y cañones las corrientes descendentes pueden ser severas.",
            ],
          },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Lo que recomienda el capítulo",
        text: "Antes de volar en terreno montañoso desconocido, el PHAK recomienda hacer una salida con un instructor de vuelo en montaña calificado. No es una formalidad: el lado de sotavento se comporta al revés de lo que la intuición espera.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué son las corrientes de convección y cuándo las nota un piloto?",
            respuesta:
              "Son circulaciones locales producidas por el calentamiento desparejo de la superficie, porque cada tipo de terreno irradia calor de forma distinta. Se notan como aire turbulento y con baches, sobre todo volando bajo en tiempo caluroso.",
            claves: ["Calentamiento desparejo", "Circulación local", "Vuelo bajo, tiempo caluroso"],
          },
          {
            nivel: "interpretacion",
            q: "Va en final sobre un lago y después sobre terreno pelado. ¿Qué le hace cada uno?",
            respuesta:
              "Sobre el agua predominan las corrientes descendentes, que tienden a hundirlo y a dejarlo corto del punto de toma. Sobre el terreno pelado predominan las ascendentes, con efecto de globo, que tienden a pasarlo largo.",
            claves: ["Agua: descendente, corto", "Terreno árido: ascendente, largo"],
          },
          {
            nivel: "situacion",
            q: "¿Por qué el lado de sotavento de una montaña es más peligroso que el de barlovento?",
            respuesta:
              "A barlovento el viento sube la ladera de forma suave y las ascendentes incluso ayudan. A sotavento el aire sigue el contorno del terreno y se vuelve turbulento, empujando la aeronave hacia la ladera, y la presión hacia abajo crece con la fuerza del viento. En valles y cañones las descendentes pueden ser severas.",
            claves: [
              "Barlovento: flujo suave, ascendentes",
              "Sotavento: turbulencia y descendentes",
              "Empuja contra la ladera",
              "Peor cuanto más fuerte el viento",
            ],
          },
        ],
      },
    ],
  },

  // ── 05 ──────────────────────────────────────────────────────────────────
  {
    n: 5,
    title: "Cizalladura a bajo nivel",
    kicker: "La microrráfaga, paso a paso",
    minutes: 9,
    blocks: [
      {
        kind: "p",
        text: "De todo el capítulo de teoría del clima, esta es la lección que hay que saberse de memoria. No porque la pregunten más, que la preguntan, sino porque es la única en la que la reacción tiene que salir antes que el razonamiento.",
      },
      {
        kind: "definicion",
        text: "Cizalladura del viento: un cambio repentino y drástico de velocidad y/o dirección del viento sobre un área muy pequeña.",
      },
      {
        kind: "p",
        text: "Puede pasar a cualquier altitud. Lo que hace peligrosa a la **cizalladura a bajo nivel** es la cercanía al suelo: no hay altura para recuperar. Se le asocian cambios de dirección de hasta 180° y cambios de velocidad de 50 nudos o más.",
      },
      {
        kind: "sub",
        text: "Ver: dónde vive",
      },
      {
        kind: "vinetas",
        items: [
          "Al paso de sistemas frontales.",
          "Con tormentas eléctricas.",
          "Con inversiones térmicas cuando arriba hay viento fuerte (más de 25 nudos).",
        ],
      },
      {
        kind: "p",
        text: "El tipo más severo a baja altura es el asociado a la **precipitación convectiva**, es decir, a la lluvia de las tormentas. Y el caso crítico de ese tipo tiene nombre propio.",
      },
      {
        kind: "sub",
        text: "Entender: qué es una microrráfaga",
      },
      {
        kind: "kv",
        items: [
          { k: "Extensión horizontal", v: "menos de una milla" },
          { k: "Extensión vertical", v: "dentro de 1.000 ft" },
          { k: "Duración", v: "unos 15 minutos" },
          { k: "Corrientes descendentes", v: "hasta 6.000 ft por minuto" },
          { k: "Cambio de dirección", v: "45° o más, en cuestión de segundos" },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Léelo otra vez",
        text: "Seis mil pies por minuto de descendente, dentro de los primeros mil pies. Ese número es el que explica por qué la microrráfaga no se negocia: se evita.",
      },
      {
        kind: "sub",
        text: "Interpretar: los cuatro tiempos de la trampa",
      },
      {
        kind: "p",
        text: "Esta es la secuencia que el PHAK describe para un despegue que entra sin querer en una microrráfaga, y es exactamente lo que engaña: **empieza pareciendo una buena noticia.**",
      },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Viento de frente",
            texto: "La velocidad sube y la performance mejora. El avión se siente bien, y ese es el problema: parece que sobra energía.",
            fuerte: true,
          },
          {
            rotulo: "Corriente descendente",
            texto: "La performance empieza a caer mientras el aire te empuja hacia abajo.",
          },
          {
            rotulo: "Viento de cola",
            texto: "El viento se da la vuelta. La velocidad se desploma y la performance con ella.",
            fuerte: true,
          },
          {
            rotulo: "El resultado",
            texto: "Impacto con el terreno, o vuelo peligrosamente cerca del suelo.",
          },
        ],
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t05-01-microrrafaga-cuatro-tiempos.webp",
        alt: "Corte vertical de una microrráfaga sobre una pista: la columna descendente golpea el suelo y se abre en abanico, con los cuatro momentos numerados sobre la trayectoria de despegue, del viento de frente al impacto.",
        ancho: 1600,
        alto: 900,
        pie: "Los cuatro tiempos de una microrráfaga, sobre la trayectoria de despegue.",
      },
      {
        kind: "p",
        text: "El mecanismo, en una frase: un viento de cola que pasa a viento de frente sube la velocidad y la performance; un viento de frente que pasa a viento de cola las derrumba. La microrráfaga te hace las dos cosas seguidas y en menos de un minuto.",
      },
      {
        kind: "sub",
        text: "Aplicar: qué te avisa y qué no",
      },
      {
        kind: "p",
        text: "En los aeropuertos hay redes de anemómetros repartidos que detectan diferencias de velocidad del viento entre puntos. **Cuando la diferencia supera los 15 nudos, se emite una advertencia de cizalladura.** Ese sistema es el LLWAS (Low Level Wind Shear Alert System).",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Lo que el capítulo insiste en dejar dicho",
        text: "Las microrráfagas son difíciles de detectar porque ocurren en áreas pequeñas. La cizalladura puede afectar a cualquier vuelo, a cualquier piloto y a cualquier altitud, y muchas veces no se detecta: es un peligro silencioso. La advertencia existe cuando existe; la actitud de estar alerta tiene que existir siempre, sobre todo volando en tormentas o cerca de sistemas frontales.",
      },
      {
        kind: "escenario",
        titulo: "Escenario de práctica",
        concepto: "Reconocer la primera fase de una microrráfaga, que es la que engaña.",
        situacion:
          "Despegas de un aeropuerto con una tormenta a cuatro millas del extremo de pista y lluvia visible debajo de ella. Rotas normal y, pasando 300 ft, la velocidad indicada sube 12 nudos sin que hayas tocado nada y el avión asciende mejor de lo previsto.",
        preguntas: [
          {
            q: "¿Qué acaba de pasar y qué es lo peligroso de ello?",
            a: "Entraste en el viento de frente de la fase 1: la velocidad y la performance mejoran. Lo peligroso es que es una ganancia prestada. Si es una microrráfaga, en segundos viene la descendente y después el viento de cola, y todo lo que ganaste se pierde de golpe y con creces.",
          },
          {
            q: "¿Qué NO deberías hacer al ver la ganancia de velocidad?",
            a: "Corregirla hacia abajo. Reducir potencia o bajar el morro para «devolver» esa velocidad extra te deja sin nada justo antes de que el viento se dé la vuelta. La energía sobrante es lo único que vas a tener cuando llegue la fase 3.",
          },
          {
            q: "¿Qué información habrías querido tener antes de alinear?",
            a: "La advertencia de cizalladura del sistema del aeropuerto si la hubiera, cualquier PIREP de aeronaves que acaben de salir, y la posición y evolución de esa célula. Con una tormenta con lluvia a cuatro millas del extremo, la pregunta razonable es si el despegue puede esperar quince minutos, que es lo que dura una microrráfaga.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "La técnica de escape la manda tu operador",
        text: "Qué se hace exactamente al encontrar cizalladura (actitud, potencia, configuración, cuándo se abandona la aproximación) es un procedimiento del explotador y del fabricante, y cambia por tipo de avión. Está en el FCOM y en el manual de operaciones de tu compañía, no en un curso general. Lo que sí es tuyo y no depende del tipo: reconocerla en la fase 1 y no gastarte la energía que te sobra.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "Defina cizalladura del viento y diga por qué la de bajo nivel es la peligrosa.",
            respuesta:
              "Es un cambio repentino y drástico de velocidad y/o dirección del viento en un área muy pequeña. La de bajo nivel es la peligrosa por la proximidad al suelo: no queda altura para recuperar. Se le asocian cambios de dirección de hasta 180° y de velocidad de 50 nudos o más.",
            claves: ["Cambio repentino de velocidad y/o dirección", "Área pequeña", "Proximidad al suelo", "180° y 50 kt"],
          },
          {
            nivel: "interpretacion",
            q: "¿Con qué condiciones se asocia comúnmente la cizalladura a bajo nivel?",
            respuesta:
              "Con el paso de sistemas frontales, con tormentas eléctricas y con inversiones térmicas cuando hay viento fuerte en niveles superiores, por encima de 25 nudos. La más severa es la asociada a precipitación convectiva.",
            claves: ["Frentes", "Tormentas", "Inversión con viento superior mayor a 25 kt"],
          },
          {
            nivel: "situacion",
            q: "Describa la secuencia de una microrráfaga durante un despegue.",
            respuesta:
              "Primero un viento de frente que aumenta la velocidad y la performance. Después las corrientes descendentes, que la disminuyen. Después el viento cambia a viento de cola y la velocidad cae. Y el resultado puede ser el impacto con el terreno o el vuelo peligrosamente cerca del suelo. La microrráfaga típica ocupa menos de una milla horizontal y menos de 1.000 ft vertical, dura unos 15 minutos y puede dar descendentes de hasta 6.000 ft por minuto.",
            claves: [
              "Frente, descendente, cola, impacto",
              "Menos de 1 milla y 1.000 ft",
              "15 minutos",
              "6.000 ft/min",
            ],
          },
        ],
      },
    ],
  },
]
