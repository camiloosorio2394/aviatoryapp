/**
 * Nivel 1 · La atmósfera y el aire en movimiento.
 *
 * Adapta el capítulo 12 del Pilot's Handbook of Aeronautical Knowledge (FAA
 * H-8083-25C) a lo que un piloto necesita para una
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
        text: "Vas de México a Santiago en el nivel de vuelo 380 (FL380, Flight Level 380). A lo lejos, una tormenta extiende su parte superior en forma de yunque. No hay una tapa visible: cerca de esa altura cambia la estabilidad del aire y se limita gran parte del desarrollo vertical. La **tropopausa** es el límite entre la troposfera y la estratosfera; conocer su altura ayuda a interpretar el tiempo y la posible cercanía de la corriente en chorro.",
      },
      {
        kind: "p",
        text: "En la troposfera se desarrolla la mayor parte del tiempo que cambia tu plan: nubes, precipitación, turbulencia convectiva y condiciones de engelamiento. Una tormenta intensa puede alcanzar la tropopausa, extender su cima lateralmente y formar un yunque; las corrientes ascendentes más fuertes incluso pueden sobrepasarla. La pregunta útil no es cuántas capas tiene la atmósfera, sino por qué la mayor parte del tiempo se concentra en la inferior.",
      },
      {
        kind: "sub",
        text: "Reconocer el yunque sin confundirlo con una frontera visible",
      },
      {
        kind: "reconoce",
        titulo: "El yunque y la cima que sobresale",
        intro: "Toca los puntos numerados para identificar lo que sí muestra la fotografía. La tropopausa no es una línea visible y no se puede medir en esta imagen.",
        imagen: {
          src: "/modulos/meteorologia/mt-l01-yunque-tropopausa.webp",
          alt: "Cumulonimbo visto de lado con una cima en forma de yunque y un pequeño domo que sobresale",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 38,
            y: 17,
            que: "Cima sobresaliente",
            significa: "Un domo de nube se eleva por encima del yunque y revela una corriente ascendente intensa.",
            piloto: "Trata la tormenta como un área peligrosa y consulta información actual para planear cómo evitarla; no deduzcas una altura exacta de la foto.",
          },
          {
            x: 75,
            y: 29,
            que: "Yunque",
            significa: "La parte superior se extiende lateralmente al encontrar aire más estable en altura.",
            piloto: "No supongas que el aire bajo el yunque es seguro: la amenaza puede extenderse fuera de la zona de precipitación visible.",
          },
          {
            x: 40,
            y: 54,
            que: "Torre convectiva",
            significa: "La nube crece en vertical gracias a corrientes ascendentes y humedad disponible.",
            piloto: "El desarrollo vertical advierte de convección; verifica la ruta y las alternativas antes de acercarte.",
          },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** una tormenta con torre convectiva, yunque y una cima que sobresale. **Cómo la reconoces:** por su gran desarrollo vertical y su cima extendida. **Qué decides:** evitar la célula según la información meteorológica vigente y los procedimientos de tu operación; la foto no te da por sí sola la altura de la tropopausa.",
      },
      {
        kind: "p",
        text: "En el aire seco, el nitrógeno y el oxígeno suman cerca del 99 %. Para comprender por qué cambian las nubes, la precipitación y la niebla, hay que mirar además el **vapor de agua**: su proporción es variable y puede llegar a cerca del 5 %. También importan la temperatura, la presión y el movimiento del aire; el vapor por sí solo no decide si un vuelo puede salir.",
      },
      {
        kind: "check",
        question:
          "¿Qué componente variable del aire interviene directamente en la formación de nubes, niebla y precipitación?",
        options: [
          "El vapor de agua, que varía y no forma parte del aire seco",
          "El nitrógeno, que es el 78 % del aire seco y el que le da su densidad",
          "El oxígeno, del que dependen el rendimiento del motor y la presurización",
        ],
        answer: 0,
        explain:
          "El nitrógeno y el oxígeno suman cerca del 99 % del aire seco y sus proporciones cambian poco. El vapor de agua sí varía y participa en la formación de nubes, precipitación y niebla. También hacen falta condiciones apropiadas de temperatura y movimiento del aire.",
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
            titulo: "Troposfera",
            ref: "del suelo a 26.000 ft en los polos y 48.000 ft sobre el ecuador",
            puntos: [
              "Aquí ocurre casi todo: nubes, tormentas, turbulencia y las variaciones de temperatura.",
              "La temperatura baja unos 2 °C por cada 1.000 ft.",
              "Cerca del nivel del mar, la presión baja aproximadamente 1 pulgada de mercurio por cada 1.000 ft (cerca de 1 milibar cada 30 ft); esa tasa no es constante en altura.",
            ],
            nota: "Que sea más alta sobre el ecuador que sobre los polos no es un dato de examen: es la razón de que en una ruta larga norte a sur ese límite te suba y te baje.",
          },
          {
            titulo: "Tropopausa",
            ref: "el límite de arriba",
            puntos: [
              "Debajo de ella queda el grueso de la humedad y del tiempo asociado.",
              "Su altura cambia con la latitud y la estación: no está a un nivel uniforme alrededor del planeta.",
              "Se asocia con la corriente en chorro y con la turbulencia en aire claro.",
            ],
          },
          {
            titulo: "Estratosfera",
            ref: "de la tropopausa a unos 160.000 ft",
            puntos: [
              "Poco cambio de tiempo y aire estable.",
              "Algún tipo de nube se mete en ella de vez en cuando, pero es la excepción.",
            ],
          },
          {
            titulo: "Mesosfera y termosfera",
            ref: "por encima",
            puntos: ["Influencia sobre el clima: prácticamente ninguna. No las vas a volar."],
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "En crucero",
        situacion:
          "Vuelas FL370 en ruta hacia el norte. El plan te da la tropopausa en FL380 al salir y en FL340 a mitad de ruta. No has pedido cambio de nivel.",
        pregunta: "¿Qué acaba de cambiar para ti, aunque el nivel sea el mismo?",
        claves: [
          "Empezaste debajo de la tropopausa y vas a acabar por encima de ella: el límite bajó hasta quedar por debajo de tu nivel.",
          "La tropopausa puede estar asociada con la corriente en chorro y turbulencia en aire claro. El cambio de altura te obliga a revisar el pronóstico de vientos y turbulencia para ese tramo, aunque ahora el aire esté liso.",
          "Por encima de la tropopausa el aire suele ser más estable, pero cruzarla no garantiza aire liso ni permite atribuir una turbulencia concreta a ese límite sin más información.",
        ],
        cierre:
          "Consulta la altura prevista de la tropopausa y los vientos y la turbulencia en la información meteorológica disponible para tu ruta; no la deduzcas solo de la vista exterior.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es la tropopausa y por qué le importa a un piloto?",
            respuesta:
              "Es el límite superior de la troposfera. Debajo queda atrapada la humedad y el tiempo asociado, así que casi toda la meteorología significativa se desarrolla ahí; por encima el aire es estable y se mezcla poco en vertical. Le importa al piloto porque marca hasta dónde llega el grueso del tiempo y porque se asocia con la corriente en chorro y con la turbulencia en aire claro.",
            claves: [
              "Límite superior de la troposfera",
              "El grueso de la humedad queda debajo",
              "Corriente en chorro y turbulencia en aire claro",
            ],
          },
          {
            nivel: "interpretacion",
            q: "En la troposfera, ¿cuánto baja la temperatura y cuánto la presión al subir?",
            respuesta:
              "En la atmósfera estándar, unos 2 °C por cada 1.000 ft dentro de la troposfera. Cerca del nivel del mar, la presión disminuye aproximadamente una pulgada de mercurio por cada 1.000 ft, equivalente a cerca de un milibar cada 30 ft. Esa aproximación de presión no se mantiene igual a cualquier altitud.",
            claves: ["Temperatura estándar: cerca de 2 °C por 1.000 ft", "Presión: aproximación válida cerca del nivel del mar", "La tasa de presión cambia con la altura"],
          },
          {
            nivel: "situacion",
            q: "Un compañero dice que la tropopausa está siempre a la misma altura. ¿Qué le corrige?",
            respuesta:
              "Que cambia con la latitud y con la estación del año. Puede estar alrededor de 26.000 ft en las regiones polares y de 48.000 ft cerca del ecuador. Por eso, en una ruta larga, la posición de ese límite respecto a tu nivel de vuelo puede cambiar aunque mantengas el mismo nivel.",
            claves: ["Cambia con latitud y estación", "26.000 ft en polos", "48.000 ft en el ecuador"],
          },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Ver el detalle del capítulo",
        cita: "FAA-H-8083-25C, cap. 12",
        bloques: [
          {
            kind: "p",
            text: "La atmósfera alcanza casi 700 kilómetros desde la superficie y está en movimiento constante. Además de sostener la vida, absorbe energía del sol, recicla agua y otros productos químicos, y protege de la radiación de alta energía y del frío del espacio.",
          },
          {
            kind: "kv",
            items: [
              { k: "Nitrógeno", v: "78 % del volumen de aire seco" },
              { k: "Oxígeno", v: "21 %" },
              { k: "Argón, CO₂ y trazas", v: "el 1 % restante" },
              { k: "Vapor de agua", v: "de 0 a 5 %, aparte del aire seco y muy variable" },
            ],
          },
          {
            kind: "p",
            text: "Las cuatro capas se identifican por sus características térmicas, su composición química, su movimiento y su densidad. La estratosfera se extiende desde la tropopausa hasta unos 160.000 ft (50 km).",
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
        text: "Sales de un aeropuerto de altura. El informe meteorológico de aeródromo (METAR, Meteorological Aerodrome Report) publica el QNH, el ajuste altimétrico local; con él, el altímetro en tierra indica aproximadamente la elevación del aeródromo. Eso no te dice cuánto rendirá el avión. En un día caluroso, la distancia de despegue puede ser muy distinta de la de un día frío, aunque el ajuste sea el mismo. Esta lección separa esas dos preguntas.",
      },
      {
        kind: "sub",
        text: "Ver: el aire pesa",
      },
      {
        kind: "p",
        text: "El aire tiene masa y ejerce presión sobre la superficie. Cerca del nivel del mar, una columna de aire sobre un centímetro cuadrado ejerce una fuerza equivalente al peso de cerca de 1 kg. Al ascender queda menos aire encima y, en general, la presión disminuye.",
      },
      {
        kind: "definicion",
        text: "La presión atmosférica es la fuerza que ejerce el aire por unidad de superficie. El altímetro barométrico interpreta los cambios de presión como cambios de altitud.",
      },
      {
        kind: "p",
        text: "**Cerca del nivel del mar**, una diferencia de 1 pulgada de mercurio (\"Hg) equivale aproximadamente a 1.000 ft de altitud de presión. Es una regla rápida local, no una conversión válida a cualquier altura: la relación entre presión y altitud cambia al ascender.",
      },
      {
        kind: "sub",
        text: "Entender: presión medida y ajuste altimétrico no son lo mismo",
      },
      {
        kind: "p",
        text: "Una estación elevada mide la presión en su propio emplazamiento; esa presión es menor que la que habría al nivel del mar en una atmósfera comparable. El **ajuste altimétrico** se obtiene reduciendo la presión de la estación a una referencia de nivel del mar mediante el procedimiento meteorológico establecido. No se calcula sumando 1 \"Hg por cada 1.000 ft: esa aproximación no sirve para convertir una observación real en QNH.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Esto es exactamente lo que lees en el METAR",
        text: "El grupo `Q1013` informa QNH en hectopascales; `A2992` expresa el ajuste altimétrico en pulgadas de mercurio. No son la presión medida sobre la pista. Con el ajuste local vigente, el altímetro en el aeródromo debe indicar aproximadamente su elevación, dentro de la tolerancia del instrumento. El ajuste es local y debe actualizarse durante el vuelo según los procedimientos aplicables.",
      },
      {
        kind: "sub",
        text: "La atmósfera estándar como referencia",
      },
      {
        kind: "kv",
        items: [
          { k: "Presión estándar al nivel del mar", v: "1013,2 mb (29,92 \"Hg)" },
          { k: "Temperatura estándar", v: "15 °C (59 °F)" },
          { k: "Equivalencia", v: "1 \"Hg ≈ 34 mb" },
          { k: "Referencia", v: "Atmósfera estándar internacional (ISA, International Standard Atmosphere)" },
        ],
      },
      {
        kind: "p",
        text: "La ISA no describe un día concreto: es una referencia para instrumentos y datos de rendimiento. Las tablas del manual de vuelo contemplan condiciones distintas de las estándar; debes usar las entradas y correcciones que correspondan al avión y a la operación real.",
      },
      {
        kind: "sub",
        text: "Interpretar: altitud de densidad y rendimiento",
      },
      {
        kind: "p",
        text: "La **altitud de densidad** es la altitud que tendría, en la atmósfera estándar, la misma densidad del aire que existe aquí y ahora. La presión y la temperatura influyen en ella: aire más caliente o de menor presión suele ser menos denso. Es un índice de rendimiento, **no** una altura sobre el terreno ni una lectura directa del altímetro. Con el mismo QNH, dos temperaturas distintas pueden producir rendimientos distintos.",
      },
      {
        kind: "vinetas",
        items: [
          "A una misma velocidad **indicada**, una altitud de densidad alta implica mayor velocidad verdadera y, con el mismo viento, mayor velocidad respecto al suelo. La carrera de despegue y la distancia de aterrizaje suelen aumentar.",
          "La menor densidad puede reducir el empuje disponible y el rendimiento de ascenso; el efecto exacto depende de la aeronave, sus motores y las condiciones de operación.",
          "La longitud de pista y el franqueamiento de obstáculos se verifican con datos de rendimiento aprobados para el avión, no con una regla general ni con la imagen.",
        ],
      },
      {
        kind: "reconoce",
        titulo: "Aeródromo de altura: qué puedes observar",
        intro: "Toca los puntos. La foto ilustra el contexto de una operación en pista, pero no permite medir la altitud de densidad ni calcular distancias.",
        imagen: {
          src: "/modulos/meteorologia/mt-l02-altitud-densidad.webp",
          alt: "Avión comercial sobre una pista en una meseta andina, con aire cálido sobre el pavimento",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 16,
            y: 65,
            que: "Reverberación térmica",
            significa: "El aire cerca del pavimento caliente distorsiona el fondo. Sugiere calor, pero no proporciona una temperatura utilizable para el cálculo.",
            piloto: "Obtén la temperatura observada y verifica el rendimiento con los datos del avión; no estimes la altitud de densidad mirando la pista.",
          },
          {
            x: 76,
            y: 34,
            que: "Entorno montañoso",
            significa: "El relieve sugiere un aeródromo de altura, pero la imagen no permite conocer su elevación.",
            piloto: "Consulta la elevación publicada y el ajuste altimétrico vigente antes de calcular la altitud de presión.",
          },
          {
            x: 52,
            y: 57,
            que: "Avión sobre pista",
            significa: "Para una misma velocidad indicada, una densidad menor suele requerir mayor velocidad respecto al suelo.",
            piloto: "Confirma distancia de despegue, ascenso y márgenes de obstáculos con el manual y los procedimientos del operador.",
          },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** aire cálido sobre la pista, relieve montañoso y un avión. **Cómo lo reconoces:** por la posible reverberación y el entorno, no por un valor numérico visible. **Qué decides:** usar elevación, QNH, temperatura, viento, configuración, masa y datos aprobados del avión para verificar despegue y ascenso. La imagen no sustituye ese cálculo.",
      },
      {
        kind: "sub",
        text: "Aplicar: el altímetro no sabe de temperatura",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En el briefing",
        situacion:
          "Aeropuerto de altura, mediodía, 32 °C, QNH estándar. El comandante mira el ajuste, ve que el altímetro marca la elevación de la plataforma y dice que el rendimiento será adecuado porque la presión es la estándar.",
        pregunta: "¿Qué falta en ese razonamiento?",
        claves: [
          "El altímetro correcto solo dice que el ajuste de presión está bien. No dice nada de la densidad del aire.",
          "A un aeropuerto alto le corresponde una temperatura ISA inferior a 15 °C; 32 °C está muy por encima de esa referencia y eleva la altitud de densidad.",
          "Hay que comprobar distancia de despegue, ascenso y franqueamiento de obstáculos con el procedimiento y los datos aprobados para el avión, usando las condiciones reales.",
        ],
        cierre:
          "El altímetro ajustado indica altitud barométrica; no certifica que haya margen de rendimiento. Son dos comprobaciones distintas.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "La tendencia de presión es una pista, no un pronóstico",
        text: "Una caída de presión en observaciones sucesivas puede acompañar la llegada de un sistema de baja presión, pero no demuestra por sí sola que habrá tormentas ni determina su intensidad. Comprueba los METAR, pronósticos y avisos vigentes, además de la situación sinóptica, antes de decidir. Actualiza siempre el ajuste altimétrico cuando corresponda.",
      },
      {
        kind: "check",
        question:
          "Miras los METAR sucesivos de tu destino y el QNH va 1015, 1012, 1008 en tres horas. ¿Qué haces con eso?",
        options: [
          "Actualizar el altímetro si corresponde y asumir que la presión no aporta nada más",
          "Actualizar el ajuste y revisar pronósticos, avisos y observaciones antes de inferir un cambio de tiempo",
          "Descartar el cambio, porque cada valor por separado está dentro de lo normal y no justifica revisar nada más",
        ],
        answer: 1,
        explain:
          "El descenso sostenido es una señal para investigar el contexto meteorológico, no un pronóstico de tormenta por sí mismo. Usa el ajuste vigente y contrasta METAR, pronósticos y avisos; que cada valor parezca habitual no elimina la importancia de la tendencia.",
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
            claves: ["1013,2 mb / 29,92 \"Hg", "15 °C", "Referencia para instrumentos y rendimiento"],
          },
          {
            nivel: "interpretacion",
            q: "¿Por qué la presión medida en una estación elevada no se publica sin más como QNH?",
            respuesta:
              "Porque se mide a la elevación de la estación. El QNH se determina reduciendo esa presión a la referencia altimétrica del nivel del mar con el procedimiento establecido, no sumando linealmente una pulgada de mercurio por cada 1.000 ft. Con el QNH local, el altímetro en el aeródromo indica aproximadamente su elevación.",
            claves: ["Presión de estación ≠ QNH", "Reducción establecida, no suma lineal", "Altímetro: elevación aproximada"],
          },
          {
            nivel: "situacion",
            q: "Va a despegar de un aeropuerto de altura en un día caluroso. ¿Qué espera del avión y por qué?",
            respuesta:
              "Espero una altitud de densidad alta y posibles aumentos de distancia de despegue y aterrizaje, con menor capacidad de ascenso. A igual velocidad indicada, la velocidad respecto al suelo tiende a ser mayor. Debo calcular el resultado exacto y el margen sobre obstáculos con datos aprobados para ese avión y esas condiciones.",
            claves: [
              "Altitud de densidad alta",
              "Carrera y distancia de franqueamiento mayores",
              "Menor régimen de ascenso",
              "Comprobación con datos del avión",
            ],
          },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Ver el detalle del capítulo",
        cita: "PHAK cap. 8 y 11; FAA AC 00-6B",
        bloques: [
          {
            kind: "p",
            text: "La presión atmosférica se mide en pulgadas o milímetros de mercurio con un barómetro de mercurio, que mide la altura de una columna dentro de un tubo de vidrio: al subir la presión el mercurio sube, y al caer, drena. Es el de laboratorio o estación: ni portátil ni fácil de leer.",
          },
          {
            kind: "p",
            text: "El barómetro aneroide utiliza una cápsula que se deforma con los cambios de presión y mueve un indicador mediante un mecanismo. El altímetro barométrico emplea un principio semejante. Su precisión depende de la calibración, la instalación y las condiciones de uso; no se deduce solo de que tenga un mecanismo.",
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
    kicker: "Calentamiento desigual, presión y efecto de Coriolis",
    minutes: 7,
    blocks: [
      {
        kind: "p",
        text: "En un vuelo de ida puedes encontrar viento de cola y, en el regreso, viento de frente. La distribución de presión y la rotación terrestre ayudan a explicar esos patrones, pero una carta de superficie **no** basta para conocer el viento a la altitud de crucero. Esta lección te enseña a interpretar el mecanismo; la planificación operativa exige pronósticos de viento en altura para la ruta y el nivel previstos.",
      },
      {
        kind: "sub",
        text: "Ver: el sol no calienta de manera uniforme",
      },
      {
        kind: "secuencia",
        titulo: "El circuito básico",
        numerada: true,
        items: [
          "El sol calienta la superficie de forma desigual: el ecuador recibe más que los polos, porque la Tierra es curva y su eje está inclinado.",
          "El aire caliente se expande, se hace menos denso y sube.",
          "El aire que se enfría tiende a hacerse más denso y puede descender.",
          "Los contrastes de temperatura y presión impulsan la circulación atmosférica; la rotación terrestre y otros factores modifican el flujo.",
        ],
      },
      {
        kind: "p",
        text: "El calentamiento desigual también genera diferencias de presión. La **fuerza del gradiente de presión** inicia el movimiento hacia presiones menores. El viento resultante no sopla siempre directamente de alta a baja: la rotación terrestre lo desvía y, cerca del suelo, la fricción cambia su velocidad y dirección.",
      },
      {
        kind: "sub",
        text: "Entender: Coriolis, que tuerce el camino",
      },
      {
        kind: "definicion",
        text: "El efecto de Coriolis es la desviación aparente que produce la rotación de la Tierra en un flujo de aire visto desde la superficie: hacia la derecha de su movimiento en el hemisferio norte y hacia la izquierda en el sur.",
      },
      {
        kind: "vinetas",
        items: [
          "Es relevante para flujos extensos y duraderos, como los grandes sistemas atmosféricos; no explica por sí solo una ráfaga local.",
          "La desviación es máxima en los polos y se anula en el ecuador.",
          "Cuanto más rápido se mueve el flujo, mayor es el efecto de desviación.",
          "Junto con el calentamiento desigual y otros procesos, contribuye al patrón de circulación de tres células por hemisferio.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Cruzar el ecuador te invierte el dibujo",
        text: "En el hemisferio norte, el flujo a gran escala gira en sentido horario alrededor de una alta y antihorario alrededor de una baja. En el hemisferio sur esos sentidos se invierten. Es un patrón general, no una dirección de viento garantizada en cada punto ni a cualquier altitud.",
      },
      {
        kind: "infografia",
        nombre: "meteo-coriolis",
      },
      {
        kind: "p",
        text: "**Qué muestra el esquema:** la circulación general cerca de la superficie alrededor de altas (A) y bajas (B) a cada lado del ecuador. **Cómo leerlo:** compara el sentido de las flechas en ambos hemisferios; el giro se invierte. **Qué decides:** úsalo para comprender el patrón, pero verifica el viento real y pronosticado en el nivel de vuelo antes de calcular tiempo y combustible. Este mecanismo global no se puede identificar con precisión en una sola fotografía.",
      },
      {
        kind: "check",
        question:
          "El mismo día vuelas Bogotá y luego Santiago, y en las dos cartas hay una baja. ¿Qué cambia al cruzar el ecuador?",
        options: [
          "Nada: el sentido de giro alrededor de la baja es el mismo en los dos hemisferios, como en la carta",
          "Se invierte el giro: antihorario alrededor de la baja en el norte, horario en el sur",
          "El aire deja de entrar hacia la baja y pasa a salir de ella, como si se tratara de una alta",
        ],
        answer: 1,
        explain:
          "Se invierte el sentido general de giro: antihorario alrededor de una baja en el norte y horario en el sur. Cerca de la superficie, la fricción hace que el aire cruce las isobaras hacia la baja. La carta de superficie no describe por sí sola los vientos de crucero.",
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
              "El aire tiende a descender en el centro del sistema.",
              "Suele favorecer estabilidad, pero no garantiza cielo despejado ni ausencia de peligros.",
            ],
          },
          {
            titulo: "Baja presión",
            puntos: [
              "Cerca del suelo, el aire tiende a converger hacia el centro.",
              "Puede favorecer ascenso, nubosidad y precipitación; las condiciones concretas requieren observación y pronóstico.",
            ],
          },
        ],
      },
      {
        kind: "sub",
        text: "Aplicar: del patrón general al viento de ruta",
      },
      {
        kind: "p",
        text: "El sentido de giro ayuda a interpretar una carta, pero no permite escoger automáticamente un lado del sistema para una ruta de aerolínea. Las altas y bajas de superficie no bastan para deducir la componente de viento en crucero; compara los pronósticos de viento y temperatura en altura para las rutas y niveles permitidos.",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Primero el nivel de vuelo, después la componente",
        text: "En ambos hemisferios, distingue la circulación de superficie del viento en altura. La ruta, la altitud autorizada, las restricciones, el tiempo previsto y los datos del operador forman parte de la decisión; el giro dibujado en una carta no reemplaza esos datos.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Planificando la ruta",
        situacion:
          "Tienes dos rutas posibles hacia el oeste con distancias parecidas. Una pasa al norte y la otra al sur de una alta de superficie en el hemisferio norte. Alguien propone elegir la del norte porque allí el giro horario sugiere viento del este.",
        pregunta: "¿Es suficiente para elegir la ruta?",
        claves: [
          "El giro horario de una alta en el norte es una orientación conceptual, no un pronóstico de componente de cola para el vuelo.",
          "Compara vientos y temperaturas pronosticados a los niveles utilizables de ambas rutas y calcula tiempo y combustible.",
          "Revisa también convección, turbulencia, restricciones de espacio aéreo y los procedimientos del operador.",
        ],
        cierre:
          "La carta de superficie aporta contexto; la decisión operativa necesita datos del nivel de vuelo y de toda la ruta. En el hemisferio sur cambia el sentido general de giro, no ese método de verificación.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "La teoría no llega hasta el suelo",
        text: "Todo esto describe patrones a gran escala. En la capa próxima al suelo, la fricción reduce la velocidad y cambia el equilibrio entre el gradiente de presión y Coriolis; por eso el viento puede cruzar las isobaras. La profundidad de esa capa varía con terreno y condiciones atmosféricas: 2.000 ft es una referencia, no un límite universal. La siguiente lección trata los vientos locales.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es la fuerza de Coriolis y cómo actúa en cada hemisferio?",
            respuesta:
              "Es la desviación aparente de un flujo observada en una Tierra en rotación: a la derecha en el hemisferio norte y a la izquierda en el sur. Su efecto aumenta con la velocidad del flujo y la latitud; es nulo en el ecuador para el movimiento horizontal.",
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
              "Una alta suele favorecer subsidencia y estabilidad; una baja puede favorecer convergencia, ascenso, nubosidad y precipitación. No son garantías: confirmo el tiempo con observaciones, pronósticos y avisos.",
            claves: ["Alta: tendencia a estabilidad", "Baja: posible ascenso y nubosidad", "Verificar productos vigentes"],
          },
          {
            nivel: "situacion",
            q: "¿Por qué el viento en superficie no sopla en la misma dirección que a 3.000 ft?",
            respuesta:
              "La fricción próxima al suelo frena el flujo y cambia el equilibrio de fuerzas; el viento puede cruzar las isobaras y diferir del de niveles superiores. La profundidad de la capa afectada varía, especialmente sobre terreno complejo.",
            claves: ["Fricción cerca del suelo", "Equilibrio de fuerzas distinto", "Profundidad variable"],
          },
        ],
      },
    ],
  },

  // ── 04 ──────────────────────────────────────────────────────────────────
  {
    n: 4,
    title: "El viento cerca del suelo",
    kicker: "Convección, brisas y turbulencia junto a obstáculos",
    minutes: 8,
    blocks: [
      {
        kind: "p",
        text: "En aproximación a una pista con un hangar grande próximo al corredor final, una racha cambia la trayectoria y exige corregirla. El edificio puede perturbar el flujo, pero no basta verlo para diagnosticar la causa de cada desviación. Como piloto, reconoces el riesgo, vigilas la estabilidad de la aproximación y aplicas los criterios de aproximación frustrada de tu operación si dejas de cumplirlos.",
      },
      {
        kind: "sub",
        text: "Ver: cada superficie devuelve el calor a su manera",
      },
      {
        kind: "kv",
        items: [
          { k: "Pavimento y terreno seco al sol", v: "pueden calentarse con rapidez y favorecer corrientes ascendentes" },
          { k: "Agua y vegetación", v: "suelen calentarse de otra manera; la corriente local depende de las condiciones" },
        ],
      },
      {
        kind: "definicion",
        text: "Las corrientes convectivas son movimientos locales del aire asociados, entre otros factores, al calentamiento desigual de la superficie. Pueden contribuir a la turbulencia en vuelo bajo durante un día soleado; no toda turbulencia cerca del suelo tiene esa causa.",
      },
      {
        kind: "reconoce",
        titulo: "Superficies distintas junto al aeródromo",
        intro: "Toca los puntos. La fotografía permite identificar los materiales; no muestra la dirección ni la intensidad de una corriente vertical.",
        imagen: {
          src: "/modulos/meteorologia/mt-l04-superficies.webp",
          alt: "Pavimento, vegetación y agua contiguos en un aeródromo en un día soleado",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 26,
            y: 82,
            que: "Pavimento soleado",
            significa: "Una superficie oscura puede calentarse más que su entorno y favorecer una corriente ascendente local.",
            piloto: "Anticipa posible aire irregular a baja altura, pero confirma las condiciones reales y mantén los criterios de aproximación estable.",
          },
          {
            x: 55,
            y: 52,
            que: "Vegetación",
            significa: "Su respuesta térmica puede diferir de la del pavimento; no implica por sí sola una descendencia.",
            piloto: "No conviertas el cambio de superficie en una predicción automática de la senda de vuelo.",
          },
          {
            x: 82,
            y: 51,
            que: "Agua",
            significa: "Suele calentarse y enfriarse más lentamente que el terreno contiguo, lo que puede crear contrastes térmicos.",
            piloto: "Comprueba viento, rachas y reportes de turbulencia en lugar de deducir una corriente descendente de la foto.",
          },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** pavimento, vegetación y agua bajo el mismo sol. **Cómo lo reconoces:** por el cambio de material y la posible reverberación sobre el pavimento. **Qué decides:** considerar turbulencia local, confirmar viento y rachas, y volar la aproximación según los procedimientos; la imagen no revela corrientes verticales medibles.",
      },
      {
        kind: "sub",
        text: "Interpretar: una superficie no predice el punto de toma",
      },
      {
        kind: "p",
        text: "El aire ascendente sobre una superficie calentada puede afectar la trayectoria, y una descendencia local también puede hacerlo. Pero cruzar de pavimento a agua o vegetación **no** predice por sí solo si aterrizarás largo o corto. Vigila velocidad, trayectoria y energía; si la aproximación deja de estar estabilizada, sigue el procedimiento de aproximación frustrada.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Ajustar el plan no elimina todos los riesgos",
        text: "En algunos casos, operar por encima de una capa convectiva poco profunda reduce la turbulencia térmica. No garantiza aire suave ni sustituye la evaluación de nubes, tormentas, turbulencia y altitudes autorizadas. En despegue y aterrizaje no puedes evitar toda la capa cercana al suelo: prepárate con información vigente y procedimientos del operador.",
      },
      {
        kind: "sub",
        text: "Brisas costeras: cómo puede cambiar el viento",
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
              "Con condiciones favorables, el aire sobre tierra se calienta, se hace menos denso y sube.",
              "Lo reemplaza aire más frío y denso que viene del agua.",
              "Resultado posible: brisa desde el mar hacia la tierra.",
            ],
          },
          {
            titulo: "De noche: brisa de tierra",
            puntos: [
              "La tierra se enfría más rápido que el agua, y el aire sobre ella también.",
              "Si el agua permanece relativamente más cálida, el aire sobre ella puede ascender.",
              "Lo reemplaza el aire más frío y denso que baja de la tierra.",
              "Resultado posible: brisa desde la tierra hacia el agua, a menudo más débil.",
            ],
          },
        ],
      },
      {
        kind: "infografia",
        nombre: "meteo-brisas",
      },
      {
        kind: "p",
        text: "**Qué muestra el esquema:** el mecanismo ideal de brisa marina de día y terrestre de noche. **Cómo leerlo:** compara cuál superficie está relativamente más cálida y la dirección de la flecha cerca del suelo. **Qué decides:** comprobar viento observado y pronosticado antes de prever una pista en uso; el viento sinóptico puede impedir o modificar ambas brisas. Una fotografía aislada no muestra la inversión entre día y noche.",
      },
      {
        kind: "p",
        text: "En un aeropuerto costero, un cambio de brisa puede contribuir a una variación del viento y de la pista en uso. No ocurre de manera obligatoria ni a una hora fija: intervienen el viento predominante, la topografía y la operación del aeródromo.",
      },
      {
        kind: "check",
        question:
          "Aterrizas en un aeropuerto costero a las tres de la tarde con viento que entra del mar. Vuelves a las cuatro de la madrugada. ¿Qué esperas?",
        options: [
          "Puede aparecer una brisa de tierra, pero confirmas el viento vigente y la pista asignada",
          "El mismo viento del mar, que confirmo en el ATIS: la brisa marina no cambia de noche",
          "Calma segura: al anochecer desaparece todo gradiente de temperatura",
        ],
        answer: 0,
        explain:
          "El enfriamiento nocturno de la tierra puede favorecer una brisa hacia el mar. No es seguro que se forme ni que cambie la pista en uso: comprueba las observaciones, el pronóstico, el viento predominante y la información del aeródromo.",
      },
      {
        kind: "sub",
        text: "Aplicar: viento perturbado junto a obstáculos",
      },
      {
        kind: "p",
        text: "Edificios, árboles y relieve pueden perturbar el viento y generar turbulencia a sotavento. La intensidad depende, entre otros factores, de la velocidad y dirección del viento y de la forma y tamaño del obstáculo. Un hangar grande merece atención especial con viento fuerte; no puedes deducir la intensidad exacta desde una fotografía.",
      },
      {
        kind: "vinetas",
        items: [
          "En final, una ráfaga o cizalladura local puede alterar velocidad y senda; controla la energía y aplica los criterios de aproximación estabilizada.",
          "Revisa reportes, viento y disposición de edificios o relieve junto a la trayectoria, sin inventar una zona de peligro exacta a partir de la imagen.",
        ],
      },
      {
        kind: "reconoce",
        titulo: "Un hangar puede perturbar el flujo",
        intro: "Identifica los elementos de la escena. El polvo en suspensión puede sugerir aire en movimiento, pero también tener otras causas; no mide turbulencia ni cizalladura.",
        imagen: {
          src: "/modulos/meteorologia/mt-l04-hangar.webp",
          alt: "Hangar próximo al área de maniobras, polvo en suspensión y avión distante en aproximación",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 24,
            y: 38,
            que: "Hangar",
            significa: "Una estructura grande puede modificar el viento a su alrededor, especialmente a sotavento.",
            piloto: "Consulta dirección e intensidad del viento antes de valorar qué sector podría quedar afectado.",
          },
          {
            x: 53,
            y: 62,
            que: "Polvo en suspensión",
            significa: "Podría deberse al viento o a una actividad en tierra; la imagen fija no identifica su causa ni mide la intensidad del flujo.",
            piloto: "Trátalo como una señal de atención; confirma con reportes, observación y procedimientos de la operación.",
          },
          {
            x: 93,
            y: 40,
            que: "Avión en aproximación",
            significa: "En vuelo bajo queda menos altura para recuperar una desviación de velocidad o trayectoria.",
            piloto: "Mantén los criterios de estabilización; si no se cumplen, ejecuta la aproximación frustrada según el procedimiento.",
          },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** un hangar, polvo en suspensión y un avión distante. **Cómo lo reconoces:** la estructura sobresale junto al área de maniobras y hay polvo visible; la foto no permite saber qué lo levantó. **Qué decides:** confirmar viento y reportes, anticipar posible perturbación y aplicar los criterios de aproximación estable; la fotografía no cuantifica el peligro.",
      },
      {
        kind: "sub",
        text: "En montaña: ascensos y descendencias posibles",
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Los dos lados de una montaña no son el mismo vuelo",
        items: [
          {
            titulo: "Barlovento",
            puntos: [
              "El flujo puede ascender por la ladera expuesta al viento.",
              "También puede haber turbulencia; una ascendente no garantiza margen sobre la cima.",
            ],
          },
          {
            titulo: "Sotavento",
            puntos: [
              "Pueden aparecer ondas, rotores, turbulencia y descendencias a sotavento.",
              "Una descendencia puede superar la capacidad de ascenso disponible.",
              "La intensidad depende del viento, estabilidad y relieve; no siempre aumenta de forma simple.",
              "En valles y cañones las corrientes descendentes pueden ser severas.",
            ],
          },
        ],
      },
      {
        kind: "infografia",
        nombre: "meteo-montana",
      },
      {
        kind: "p",
        text: "**Qué muestra el esquema:** ascenso posible en barlovento y flujo perturbado a sotavento. **Cómo leerlo:** ubica la dirección del viento respecto de la cresta y observa dónde se representa la descendencia. **Qué decides:** consultar viento en altura, turbulencia y procedimientos de ruta, y mantener margen con el terreno; ninguna ladera es automáticamente segura. Una foto no revela por sí sola el flujo invisible a ambos lados de la montaña.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Lo que recomienda el capítulo",
        text: "Para aviación general, el manual de la FAA recomienda instrucción específica antes de operar en montaña desconocida. En una aerolínea, la decisión se rige por entrenamiento, rutas, limitaciones y procedimientos del operador; la imagen no reemplaza esa preparación.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué son las corrientes de convección y cuándo las nota un piloto?",
            respuesta:
              "Son movimientos locales asociados al calentamiento desigual de la superficie. Pueden generar ascendencias y aire irregular a baja altura, especialmente en días soleados; no se infiere su intensidad mirando solo el tipo de terreno.",
            claves: ["Calentamiento desigual", "Circulación local", "No cuantificable por una foto"],
          },
          {
            nivel: "interpretacion",
            q: "Va en final sobre un lago y después sobre terreno seco. ¿Puede predecir el punto de toma solo por ese cambio?",
            respuesta:
              "No. El contraste térmico puede favorecer circulaciones locales, pero no garantiza una descendencia sobre el lago ni una ascendente sobre el terreno. Mantengo control de velocidad y senda y aplico la política de aproximación estabilizada.",
            claves: ["Contraste térmico posible", "No garantiza corriente vertical", "Criterios de aproximación estable"],
          },
          {
            nivel: "situacion",
            q: "¿Por qué el lado de sotavento de una montaña es más peligroso que el de barlovento?",
            respuesta:
              "En sotavento pueden presentarse ondas, rotores y descendencias intensas que reduzcan el margen con el terreno. Barlovento puede tener ascendencias, pero no es automáticamente suave ni seguro. Verifico viento en altura, turbulencia prevista y los márgenes y procedimientos de la ruta.",
            claves: [
              "Barlovento: ascenso posible, no garantizado",
              "Sotavento: ondas, rotores y descendencias posibles",
              "Margen con terreno y procedimientos",
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
    kicker: "Reconocer el peligro y evitar la microrráfaga",
    minutes: 9,
    blocks: [
      {
        kind: "p",
        text: "La cizalladura a bajo nivel importa en una entrevista y, sobre todo, en despegue y aproximación. Reconocer indicios y evitar la zona peligrosa es la primera defensa. Si ocurre un encuentro, la tripulación aplica de inmediato el procedimiento de su aeronave y operador: esta lección explica el fenómeno, no sustituye ese entrenamiento.",
      },
      {
        kind: "definicion",
        text: "Cizalladura del viento: cambio de velocidad o dirección del viento a lo largo de una distancia horizontal o vertical. Puede ser abrupto e intenso; no se limita a un área de tamaño fijo.",
      },
      {
        kind: "p",
        text: "Puede ocurrir a distintas altitudes. Cerca del suelo, durante el despegue o la aproximación, queda poco margen para recuperar velocidad o trayectoria. Su intensidad es variable: no existe un cambio único de dirección o velocidad que describa todos los encuentros.",
      },
      {
        kind: "sub",
        text: "Ver: condiciones en las que puede aparecer",
      },
      {
        kind: "vinetas",
        items: [
          "Al paso de sistemas frontales.",
          "Con tormentas eléctricas.",
          "Cerca de inversiones térmicas cuando el viento cambia mucho con la altura.",
        ],
      },
      {
        kind: "p",
        text: "Una microrráfaga es una descendencia convectiva intensa que, al llegar al suelo, se dispersa horizontalmente. Puede acompañar a una tormenta con lluvia fuerte, pero también a células de aspecto menos amenazante o a precipitación que se evapora antes de tocar el suelo (virga). No exijas una cortina de lluvia visible para considerarla posible.",
      },
      {
        kind: "reconoce",
        titulo: "Señales visuales: convección y polvo cercano al suelo",
        intro: "La fotografía ayuda a buscar indicios, no a diagnosticar una microrráfaga ni a medir su fuerza.",
        imagen: {
          src: "/modulos/meteorologia/mt-l05-indicios.webp",
          alt: "Nube convectiva con precipitación localizada y polvo visible cerca de un aeródromo árido",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 52,
            y: 23,
            que: "Nube convectiva",
            significa: "Puede sostener corrientes intensas y precipitación localizada; su apariencia no mide la cizalladura debajo.",
            piloto: "Consulta radar, avisos y evolución de la célula antes de operar cerca de ella.",
          },
          {
            x: 52,
            y: 47,
            que: "Cortina de precipitación",
            significa: "Se observa precipitación bajo la nube; una microrráfaga también puede ocurrir con lluvia escasa o virga.",
            piloto: "No uses la presencia o ausencia de lluvia en superficie como único criterio de seguridad.",
          },
          {
            x: 52,
            y: 67,
            que: "Polvo cercano al suelo",
            significa: "Puede sugerir viento fuerte o salida de aire, pero la imagen fija no demuestra su causa ni dirección.",
            piloto: "Confirma viento, reportes de aeronaves y alertas disponibles; evita el sector de riesgo conforme al procedimiento.",
          },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** una nube convectiva, precipitación localizada y polvo cerca del suelo. **Cómo lo reconoces:** por el desarrollo de la nube, la cortina bajo su base y el polvo levantado. **Qué decides:** reunir información vigente y evitar una posible zona de cizalladura; la foto no prueba ni descarta una microrráfaga.",
      },
      {
        kind: "sub",
        text: "Entender: qué es una microrráfaga",
      },
      {
        kind: "kv",
        items: [
          { k: "Núcleo descendente", v: "habitualmente menos de 1 milla de diámetro antes de llegar al suelo" },
          { k: "Flujo de salida", v: "puede extenderse cerca del suelo hasta unas 2,5 millas de diámetro" },
          { k: "Duración individual", v: "por lo general no supera 15 minutos; pueden repetirse en la misma zona" },
          { k: "Descendencia extrema", v: "se han observado hasta 6.000 ft/min; no es un valor típico de cada evento" },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Evitar es la primera defensa",
        text: "Una microrráfaga intensa puede superar la capacidad de una aeronave de transporte. Los valores extremos ilustran el peligro, pero no permiten calcular desde la cabina una separación segura: aplica la evaluación de riesgo y los procedimientos del operador.",
      },
      {
        kind: "sub",
        text: "Interpretar: secuencia posible durante el encuentro",
      },
      {
        kind: "p",
        text: "En un despegue que atraviesa el flujo de salida, puede aparecer primero viento de frente, luego descendencia y finalmente viento de cola. El diagrama muestra un caso posible, no una secuencia obligatoria ni una trayectoria que deba aceptarse.",
      },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Viento de frente",
            texto: "Puede aumentar la velocidad indicada y mejorar transitoriamente el ascenso; no es una reserva de energía garantizada.",
            fuerte: true,
          },
          {
            rotulo: "Corriente descendente",
            texto: "La descendencia puede degradar la trayectoria y exigir más rendimiento del disponible.",
          },
          {
            rotulo: "Viento de cola",
            texto: "Al pasar a viento de cola puede caer bruscamente la velocidad indicada y empeorar el margen de ascenso.",
            fuerte: true,
          },
          {
            rotulo: "El riesgo",
            texto: "La combinación puede llevar a pérdida crítica de margen con el terreno; el impacto es posible, no inevitable.",
          },
        ],
      },
      {
        kind: "infografia",
        nombre: "meteo-microrrafaga",
      },
      {
        kind: "p",
        text: "**Qué muestra el esquema:** un posible cruce del flujo de salida durante el despegue. **Cómo leerlo:** sigue el cambio de viento de frente a descendencia y viento de cola. **Qué decides:** priorizar la evitación; si ocurre el encuentro, ejecutar las indicaciones y el procedimiento de escape aplicables a tu avión. La foto anterior no permite ver esta circulación invisible.",
      },
      {
        kind: "sub",
        text: "Aplicar: qué te avisa y qué no",
      },
      {
        kind: "p",
        text: "Algunos aeropuertos cuentan con un sistema de alerta de cizalladura a bajo nivel (Low Level Wind Shear Alert System, LLWAS) u otros sensores. Las capacidades, áreas vigiladas y umbrales dependen del equipo y la instalación. El LLWAS básico alerta de cizalladura en su red, pero no equivale a un detector de todas las microrráfagas; versiones ampliadas y radares pueden ofrecer avisos adicionales. Una ausencia de alerta **no** despeja tu trayectoria.",
      },
      {
        kind: "check",
        question:
          "El aeropuerto tiene sistema de alerta de cizalladura y no ha emitido ninguna advertencia. ¿Qué puedes concluir?",
        options: [
          "Que no hay cizalladura en el campo ni en la trayectoria de salida, porque el sistema la vigila",
          "Que el sistema no ha emitido una alerta; aún debes valorar tormentas, reportes y limitaciones de cobertura",
          "Que solo podría haber cizalladura por una inversión térmica, que el sistema no mide",
        ],
        answer: 1,
        explain:
          "Sin alerta no hay confirmación de aire seguro. El LLWAS básico solo cubre su red y no genera avisos específicos de microrráfaga. Las versiones ampliadas y otros sensores tienen capacidades diferentes, pero también límites de cobertura y detección. Contrasta la situación con observaciones, avisos y reportes de pilotos.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Una alerta ayuda; su ausencia no garantiza seguridad",
        text: "Las microrráfagas pueden ser localizadas y aparecer con poca lluvia en superficie. Combina información meteorológica, reportes, alertas de aeródromo y, cuando exista, el sistema predictivo de la aeronave. Evita atravesar convección peligrosa: el entrenamiento de recuperación no convierte en aceptable un encuentro deliberado.",
      },
      {
        kind: "escenario",
        titulo: "Escenario de práctica",
        concepto: "Reconocer un indicio posible sin diagnosticar el fenómeno por una sola señal.",
        situacion:
          "Antes del despegue observas una célula convectiva próxima al corredor de salida. No hay alerta del sistema del aeródromo. Durante un ejercicio de simulador, ya en ascenso inicial, la velocidad indicada aumenta de forma inesperada y luego la trayectoria empieza a deteriorarse.",
        preguntas: [
          {
            q: "¿Qué interpretación inicial harías y qué no puedes asegurar?",
            a: "La variación inesperada de velocidad y trayectoria es compatible con cizalladura. Un aumento inicial puede preceder a una descendencia y pérdida de viento de frente, pero una sola señal no confirma que sea una microrráfaga ni permite predecir su intensidad.",
          },
          {
            q: "¿Qué guía tu reacción en el simulador?",
            a: "Las alertas de a bordo y el procedimiento de escape de cizalladura del tipo de aeronave y operador. No hago una corrección aislada solo para anular el aumento de velocidad sin evaluar la trayectoria y el procedimiento aplicable.",
          },
          {
            q: "¿Qué debió revisarse antes de alinear para despegar?",
            a: "La posición y evolución de la célula, observaciones y radar disponibles, avisos de aeródromo y de a bordo, y los informes meteorológicos de pilotos (Pilot Weather Reports, PIREP) si existen. Una espera fija de quince minutos no garantiza que el área sea segura: pueden presentarse otras microrráfagas. La decisión de demorar, cambiar la salida o no despegar se toma con información actual y procedimientos del operador.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "La técnica de escape la manda tu operador",
        text: "La respuesta a una alerta o encuentro de cizalladura —actitud, empuje, configuración y trayectoria— depende del fabricante y del operador. Se entrena con el manual de operaciones de la tripulación (Flight Crew Operating Manual, FCOM) y los procedimientos de la compañía. Aquí debes comprender por qué se evita la zona y por qué un aumento inicial de velocidad no significa que el peligro terminó.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "Defina cizalladura del viento y diga por qué la de bajo nivel es la peligrosa.",
            respuesta:
              "Es una variación de la velocidad o dirección del viento con la distancia horizontal o vertical. En despegue y aproximación resulta especialmente peligrosa porque puede alterar rápido la velocidad indicada y la trayectoria con poco margen sobre el terreno.",
            claves: ["Cambio horizontal o vertical de viento", "Velocidad indicada y trayectoria", "Poco margen a baja altura"],
          },
          {
            nivel: "interpretacion",
            q: "¿Con qué condiciones se asocia comúnmente la cizalladura a bajo nivel?",
            respuesta:
              "Puede asociarse con frentes, tormentas y fuertes diferencias de viento cerca de una inversión. Las microrráfagas convectivas son un peligro crítico a baja altura y no siempre van acompañadas de lluvia intensa en superficie.",
            claves: ["Frentes", "Convección", "Cambio de viento con la altura", "Puede haber poca lluvia"],
          },
          {
            nivel: "situacion",
            q: "Describa la secuencia de una microrráfaga durante un despegue.",
            respuesta:
              "En un encuentro posible, primero aumenta el viento de frente y puede subir la velocidad indicada; después llegan la descendencia y, al cruzar, el viento de cola, que puede reducirla bruscamente. El riesgo es perder margen con el terreno. La secuencia no es inevitable: la defensa prioritaria es evitar la zona, y si se produce el encuentro se aplica el procedimiento del avión y operador.",
            claves: [
              "Viento de frente, descendencia, viento de cola",
              "Pérdida de velocidad y margen con terreno",
              "Evitar y aplicar procedimiento del operador",
            ],
          },
        ],
      },
    ],
  },
]
