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
          "El nitrógeno, que es el 78 % del aire seco y es el que le da su densidad",
          "El oxígeno, porque de él dependen el rendimiento del motor y la presurización",
          "El vapor de agua, que es variable y no entra en la composición del aire seco",
        ],
        answer: 2,
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
          "Descartar el cambio porque todos los valores parecen normales",
          "Actualizar el ajuste y revisar pronósticos, avisos y condiciones observadas antes de inferir un cambio de tiempo",
        ],
        answer: 2,
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
          "Nada: el sentido de giro alrededor de la baja es igual en ambos hemisferios",
          "El sentido de giro se invierte: antihorario alrededor de la baja en el norte, horario en el sur",
          "El aire deja de entrar hacia la baja y pasa a salir de ella, como si fuera una alta",
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
        kind: "infografia",
        nombre: "meteo-superficies",
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
        text: "Las brisas, que cambian de sentido entre el día y la noche",
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
        kind: "infografia",
        nombre: "meteo-brisas",
      },
      {
        kind: "p",
        text: "En un aeropuerto costero eso significa que la pista en uso puede cambiar de forma previsible entre la tarde y la madrugada, sin que pase ningún frente ni cambie ningún sistema. Es la explicación de la mitad de los cambios de configuración que ves en un destino de playa.",
      },
      {
        kind: "check",
        question:
          "Aterrizas en un aeropuerto costero a las tres de la tarde con viento que entra del mar. Vuelves a las cuatro de la madrugada. ¿Qué esperas?",
        options: [
          "El mismo viento: la brisa la fija la geografía del lugar y no cambia de sentido",
          "Calma: de noche se iguala la temperatura entre la tierra y el agua y la brisa desaparece",
          "Viento saliendo de la tierra hacia el mar, y con eso, posiblemente la pista contraria en uso",
        ],
        answer: 2,
        explain:
          "De día la tierra se calienta más rápido que el agua: el aire sobre tierra sube y lo reemplaza el que viene del mar. De noche se invierte, porque la tierra también se enfría más rápido: ahora el aire más caliente está sobre el agua y el que baja de la tierra ocupa su sitio. Mismo aeropuerto, pista en uso contraria, y sin que pase ningún frente ni cambie ningún sistema.",
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
        kind: "infografia",
        nombre: "meteo-obstaculo",
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
        kind: "infografia",
        nombre: "meteo-montana",
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
        kind: "infografia",
        nombre: "meteo-microrrafaga",
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
        kind: "check",
        question:
          "El aeropuerto tiene sistema de alerta de cizalladura y no ha emitido ninguna advertencia. ¿Qué puedes concluir?",
        options: [
          "Que no hay cizalladura en el campo: para eso está el sistema y por eso se instala",
          "Que ninguna pareja de anemómetros ha medido todavía una diferencia de más de 15 kt",
          "Que si hay cizalladura será la de inversión térmica, que es la que el sistema no detecta",
        ],
        answer: 1,
        explain:
          "El sistema compara la velocidad del viento entre anemómetros repartidos por el campo y avisa cuando la diferencia supera los 15 kt. Una microrráfaga mide menos de una milla de extensión horizontal y dura unos quince minutos: puede formarse, hacer daño y desaparecer sin que ninguna pareja de sensores llegue al umbral. La advertencia existe cuando existe; estar alerta tiene que ser permanente.",
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
