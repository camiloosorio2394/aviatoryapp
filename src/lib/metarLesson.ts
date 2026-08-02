/**
 * Contenido de la lección "Qué es un METAR y cómo leerlo".
 *
 * Fuentes: briefing para pilotos METAR (Erick De Paz, Meteorólogo Clase III
 * OMM), leyenda de lectura METAR y TAF (Volar3.com, material de curso). La
 * norma de referencia es el Anexo 3 de la OACI y el Manual de claves No. 306
 * de la OMM: confirma siempre contra la edición vigente.
 *
 * Reusa los tipos de bloque de la lección NOTAM para que las dos lecciones se
 * lean idénticas: misma hoja, mismos bloques, mismo registro.
 */

import type { LessonBlock, LessonScreen } from "@/lib/notamLesson"

export const METAR_LESSON: LessonScreen[] = [
  // ── 1 ──────────────────────────────────────────────────────────────────────
  {
    n: 1,
    title: "¿Qué es un METAR?",
    kicker: "El estado del cielo, en una línea",
    minutes: 2,
    level: "basico",
    blocks: [
      {
        kind: "p",
        text: "El **METAR** (informe meteorológico aeronáutico de rutina) te dice la meteorología reinante en un aeródromo en un momento dado. Los datos salen de la estación meteorológica del propio aeropuerto y se publican a intervalos regulares.",
      },
      {
        kind: "p",
        text: "Cuando algo cambia fuerte antes de la siguiente observación (una tormenta que llega, la visibilidad que se desploma), se emite un **SPECI**: un informe especial fuera de horario. Si ves SPECI en vez de METAR, alguien decidió que no podía esperar.",
      },
      {
        kind: "p",
        text: "**Por qué importa en la entrevista y en cabina:** junto con el NOTAM, el METAR es la lectura obligada del briefing. Un piloto que no decodifica `27010G25KT 4000 +TSRA BKN015CB` de memoria no puede decidir si despega.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Cómo aprovechar esta lección",
        text: "Léela de corrido: cada sección usa lo de la anterior, y va con comprobaciones intercaladas para que uses lo que acabas de leer. Después abre el Decodificador: pegas cualquier METAR y te lo desarma grupo por grupo.",
      },
      {
        kind: "check",
        question: "Estás en la sala de despacho y sale un `SPECI` de tu destino. ¿Qué significa?",
        options: [
          "Que el informe de rutina se retrasó y este lo sustituye",
          "Que algo cambió lo bastante como para no esperar a la siguiente observación",
          "Que es un informe de aeródromo militar, con clave distinta",
        ],
        answer: 1,
        explain:
          "El `SPECI` es un informe **especial**, fuera de horario. Se emite justo porque la condición cambió fuerte antes de la observación siguiente. Si ves uno, mira qué grupo se movió: alguien decidió que no podía esperar.",
      },
    ],
  },

  // ── 2 ──────────────────────────────────────────────────────────────────────
  {
    n: 2,
    title: "La plantilla completa",
    kicker: "Todo METAR sigue el mismo orden",
    minutes: 3,
    level: "basico",
    blocks: [
      {
        kind: "p",
        text: "El informe siempre trae los mismos grupos en el mismo orden. Esta es la plantilla de la OMM, simplificada a lo que ves a diario:",
      },
      {
        kind: "breakdown",
        caption:
          "Nueve grupos separados por espacios. Cada uno responde una pregunta, y siempre en el mismo orden: qué informe, dónde, cuándo, cómo sopla, cuánto ves, qué tapa, qué números y qué viene.",
        parts: [
          { token: "METAR", label: "tipo", detail: "Informe de rutina. `SPECI` si es especial." },
          {
            token: "SKBO",
            label: "estación",
            detail: "Indicador OACI del aeródromo, el mismo de la casilla A) del NOTAM.",
          },
          {
            token: "261300Z",
            label: "fecha y hora",
            detail: "Día 26 a las 13:00 **UTC**. La `Z` es zulu: en Colombia resta 5 horas, son las 08:00.",
          },
          { token: "09006KT", label: "viento", detail: "Del este (090°) a 6 nudos." },
          { token: "9999", label: "visibilidad", detail: "10 km o más, el mejor valor de la clave." },
          {
            token: "SCT023 BKN080",
            label: "nubes",
            detail: "Dispersas a 2300 ft y fragmentadas a 8000 ft. El techo es la BKN: 8000 ft.",
          },
          { token: "14/09", label: "temp / rocío", detail: "14 °C de temperatura y 9 °C de punto de rocío." },
          { token: "Q1027", label: "QNH", detail: "1027 hectopascales al altímetro." },
          { token: "NOSIG", label: "tendencia", detail: "Sin cambio significativo previsto." },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "El orden es tu mapa",
        text: "Si un grupo falta, el resto conserva su posición. Con el orden en la cabeza puedes leer cualquier METAR del mundo aunque tenga grupos que nunca hayas visto: sabes qué debería ir ahí.",
      },
      {
        kind: "check",
        question: "En `METAR SKBO 261300Z 09006KT 9999 SCT023 BKN080 14/09 Q1027 NOSIG`, ¿a qué hora local de Colombia se tomó la observación?",
        options: ["A las 13:00", "A las 08:00", "A las 18:00"],
        answer: 1,
        explain:
          "`261300Z` es el día 26 a las 13:00 **UTC**. Colombia va en UTC menos 5, así que son las 08:00 locales. La `Z` de zulu es el aviso: en el METAR nunca hay hora local.",
      },
      {
        kind: "p",
        text: "**Uno más, y feo.** El de arriba era un día tranquilo en Bogotá. Este es el que te van a poner en la entrevista:",
      },
      {
        kind: "breakdown",
        caption:
          "Mismo orden, mismas posiciones. Lo único que cambia es que ahora casi todos los grupos traen malas noticias.",
        parts: [
          { token: "SPECI", label: "tipo", detail: "Informe especial: alguien decidió que no podía esperar." },
          { token: "SKRG", label: "estación", detail: "Rionegro, José María Córdova." },
          { token: "151740Z", label: "fecha y hora", detail: "Día 15 a las 17:40 UTC, 12:40 en Colombia." },
          {
            token: "27015G28KT",
            label: "viento",
            detail: "Del oeste a 15 nudos con ráfagas de 28. El pico es el problema, no el promedio.",
          },
          { token: "3000", label: "visibilidad", detail: "3 km. Muy lejos de los 9999 del ejemplo anterior." },
          { token: "+TSRA", label: "tiempo presente", detail: "Tormenta eléctrica (`TS`) con lluvia (`RA`) fuerte (`+`)." },
          {
            token: "BKN012CB",
            label: "nubes",
            detail: "Fragmentadas a 1200 ft, y el `CB` dice que son cumulonimbos: convección sobre el aeródromo.",
          },
          { token: "18/17", label: "temp / rocío", detail: "Un grado de diferencia: aire saturado." },
          { token: "Q1013", label: "QNH", detail: "1013 hectopascales." },
          {
            token: "TEMPO 1820 4000 SHRA",
            label: "tendencia",
            detail: "Entre las 18:00 y las 20:00 UTC, ratos con 4 km y chubascos de lluvia.",
          },
        ],
      },
    ],
  },

  // ── 3 ──────────────────────────────────────────────────────────────────────
  {
    n: 3,
    title: "El viento",
    kicker: "Dirección, ráfagas y cizalladura",
    minutes: 4,
    level: "basico",
    blocks: [
      {
        kind: "p",
        text: "**`27010KT`**: los tres primeros dígitos son la dirección **verdadera desde donde sopla**, redondeada a decenas de grado; los siguientes, la velocidad en nudos. Aquí: viento del oeste a 10 nudos.",
      },
      {
        kind: "list",
        items: [
          "**`00000KT`**: viento en calma.",
          "**`VRB03KT`**: dirección variable, 3 nudos. Típico de vientos muy flojos.",
          "**`27010G25KT`**: la **G** es ráfaga (gust): viento de 10 nudos con ráfagas de 25.",
          "**`240V300`**: si la dirección varía 60° o más, se agrega el rango entre el que oscila.",
          "**`WS`**: cizalladura del viento reportada (wind shear), por ejemplo `WS R28` o `WS ALL RWY`.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "La cizalladura es la que mata",
        text: "Un cambio súbito de dirección o velocidad del viento, asociado a microrráfagas descendentes o inversiones térmicas bajas, puede variar de golpe tu velocidad aerodinámica y empujarte hacia el suelo. Es especialmente peligrosa en despegue y aterrizaje: si el METAR trae WS, el briefing cambia.",
      },
      {
        kind: "check",
        question:
          "La pista en uso es la 09 y el METAR dice `27015G28KT`. ¿Qué tienes de frente y qué te preocupa?",
        options: [
          "Viento de cara de 15 nudos; las ráfagas ayudan a frenar",
          "Viento de cola de 15 nudos con ráfagas de 28, que es el número que manda",
          "Viento cruzado puro de 28 nudos por la derecha",
        ],
        answer: 1,
        explain:
          "El viento sopla **desde** 270°, y la 09 apunta a 090°: lo tienes justo por la cola. Y el número que limita no es el promedio sino la ráfaga, 28 nudos, que es contra la que se compara el límite de viento de cola del avión.",
      },
    ],
  },

  // ── 4 ──────────────────────────────────────────────────────────────────────
  {
    n: 4,
    title: "Visibilidad y alcance de pista",
    kicker: "Metros, millas y el RVR",
    minutes: 3,
    level: "basico",
    blocks: [
      {
        kind: "list",
        items: [
          "**`9999`**: visibilidad de 10 km o más. Es el mejor valor que reporta la clave.",
          "**`4000`**: visibilidad horizontal en metros (4 km). Colombia y casi todo el mundo reportan en metros.",
          "**`6SM`**: Estados Unidos reporta en millas terrestres (statute miles). 1 SM = 1609 m.",
          "**`R28L/1200`**: el **RVR** (alcance visual en pista): desde la aproximación a la pista 28 izquierda se ven 1200 metros. L, C y R distinguen pistas paralelas (izquierda, central, derecha).",
          "El RVR puede traer tendencia: **U** mejorando (up), **D** empeorando (down), **N** sin cambio. En EE. UU. va en pies: `R28C/3600FT`.",
        ],
      },
      {
        kind: "p",
        text: "El RVR se mide con las luces de alta intensidad de la pista o el contraste con otros objetos, y es el número que define si puedes iniciar una aproximación con niebla. Cuando la visibilidad general y el RVR difieren, el RVR manda para esa pista.",
      },
      {
        kind: "check",
        question:
          "El METAR trae visibilidad `0800` y además `R28L/1200`. Vas a la 28 izquierda. ¿Con qué número decides?",
        options: [
          "Con los 800 m: es la visibilidad oficial del aeródromo",
          "Con los 1200 m del RVR, que es el que manda para esa pista",
          "Con el promedio de los dos",
        ],
        answer: 1,
        explain:
          "El RVR es el alcance visual medido **en esa pista**, y cuando difiere de la visibilidad general es el que manda para la aproximación. Por eso un aeródromo con niebla puede seguir operando: la visibilidad general está peor que lo que se ve desde la senda.",
      },
    ],
  },

  // ── 5 ──────────────────────────────────────────────────────────────────────
  {
    n: 5,
    title: "El tiempo presente",
    kicker: "Calificador, descriptor y fenómeno",
    minutes: 5,
    level: "intermedio",
    blocks: [
      {
        kind: "p",
        text: "El grupo de tiempo presente se arma como un lego de tres piezas, siempre en este orden: **calificador + descriptor + fenómeno**. `+TSRA` es fuerte (+) tormenta eléctrica (TS) con lluvia (RA).",
      },
      { kind: "p", text: "**Calificadores** (intensidad o posición):" },
      {
        kind: "kv",
        items: [
          { k: "-", v: "ligero. Sin signo: moderado." },
          { k: "+", v: "fuerte" },
          { k: "VC", v: "en la vecindad del aeródromo, no sobre la estación" },
          { k: "RE", v: "reciente: ocurrió desde la última observación" },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Sobre TS",
        text: "Las tablas del curso no traen TS como descriptor, pero sin él no se lee un `+TSRA` real: viene de la clave estándar del Anexo 3. Valídalo con tu instructor.",
      },
      { kind: "p", text: "**Descriptores** (cómo se presenta):" },
      {
        kind: "kv",
        items: [
          { k: "TS", v: "tormenta eléctrica" },
          { k: "SH", v: "chubascos" },
          { k: "FZ", v: "engelante (sobreenfriado): el que congela la célula" },
          { k: "MI", v: "baja (niebla baja: MIFG)" },
          { k: "BC", v: "bancos" },
          { k: "PR", v: "parcial" },
          { k: "DR", v: "ventisca baja" },
          { k: "BL", v: "levantado por el viento" },
        ],
      },
      { kind: "p", text: "**Fenómenos** más frecuentes en Colombia:" },
      {
        kind: "kv",
        items: [
          { k: "RA", v: "lluvia · DZ llovizna · GR granizo" },
          { k: "FG", v: "niebla (visibilidad bajo 1000 m) · BR neblina" },
          { k: "HZ", v: "bruma o calima · FU humo" },
          { k: "VA", v: "ceniza volcánica: la misma del ASHTAM" },
          { k: "SQ", v: "turbonada · FC nube embudo (+FC tornado)" },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "FG o BR: la frontera es 1000 metros",
        text: "Niebla (FG) cuando la visibilidad cae por debajo de 1000 m; neblina (BR) por encima. El umbral viene de la clave OACI: la leyenda del curso solo da los nombres, así que valídalo con tu instructor.",
      },
      {
        kind: "p",
        text: "**Los grupos armados que más vas a ver.** Esta tabla es la misma que trae el Decodificador, recortada a las combinaciones de todos los días:",
      },
      {
        kind: "table",
        head: ["Grupo", "Piezas", "Qué es", "Qué implica"],
        rows: [
          ["`-RA`", "`-` + `RA`", "Lluvia ligera", "Pista mojada, poco más"],
          ["`+TSRA`", "`+` + `TS` + `RA`", "Tormenta con lluvia fuerte", "Convección encima: cizalladura, granizo, turbulencia"],
          ["`SHRA`", "`SH` + `RA`", "Chubascos de lluvia", "Visibilidad que sube y baja de golpe"],
          ["`VCTS`", "`VC` + `TS`", "Tormenta en la vecindad", "No está sobre la estación, pero está cerca"],
          ["`FZRA`", "`FZ` + `RA`", "Lluvia engelante", "Hielo en la célula: de los peores del catálogo"],
          ["`MIFG`", "`MI` + `FG`", "Niebla baja", "Techo aparente falso desde la cabina"],
          ["`BR`", "`BR`", "Neblina", "Visibilidad reducida, por encima de 1000 m"],
          ["`RERA`", "`RE` + `RA`", "Lluvia reciente", "Ocurrió desde la observación anterior"],
          ["`VA`", "`VA`", "Ceniza volcánica", "La misma del ASHTAM. No se atraviesa"],
        ],
      },
      {
        kind: "summary",
        items: [
          "El grupo se arma siempre igual: **calificador + descriptor + fenómeno**.",
          "El calificador es intensidad (`-`, sin signo, `+`) o posición (`VC`, `RE`).",
          "`TS` y `FZ` son las dos piezas que cambian una decisión de vuelo por sí solas.",
          "Si no reconoces una combinación, sepárala en piezas: casi siempre se entiende sola.",
        ],
      },
      {
        kind: "check",
        question: "¿Qué significa `VCTS` y por qué no es lo mismo que `TS`?",
        options: [
          "Tormenta muy fuerte: la V es de violenta",
          "Tormenta en la vecindad del aeródromo, no sobre la estación",
          "Tormenta con visibilidad reducida",
        ],
        answer: 1,
        explain:
          "`VC` es el calificador de posición: **in the vicinity**, en la vecindad. La tormenta está cerca pero no encima. Cambia la decisión: no es lo mismo despegar con una celda sobre el campo que con una a diez millas moviéndose hacia ti.",
      },
    ],
  },

  // ── 6 ──────────────────────────────────────────────────────────────────────
  {
    n: 6,
    title: "Nubes y CAVOK",
    kicker: "Octavos de cielo y el techo",
    minutes: 4,
    level: "intermedio",
    blocks: [
      {
        kind: "p",
        text: "Las capas de nubes se reportan con una sigla de cobertura, medida en **octavos de cielo**, más la altura de la base en **centenares de pies** sobre el aeródromo:",
      },
      {
        kind: "kv",
        items: [
          { k: "SKC", v: "despejado (0/8)" },
          { k: "FEW", v: "escasas (1/8 a 2/8): FEW010 = escasas a 1000 ft" },
          { k: "SCT", v: "dispersas (3/8 a 4/8)" },
          { k: "BKN", v: "fragmentadas (5/8 a 7/8): la primera capa BKN u OVC define el techo" },
          { k: "OVC", v: "cubierto (8/8): OVC220 = cubierto a 22 000 ft" },
        ],
      },
      {
        kind: "list",
        items: [
          "**CB** (cumulonimbos) y **TCU** (torrecúmulos) se anotan pegados a la capa: `BKN015CB`. Son las nubes convectivas: precipitación fuerte, tormenta, granizo y turbulencia severa.",
          "**`VV002`**: visibilidad vertical de 200 ft. El cielo está oscurecido (niebla, humo) y no hay base de nube definida.",
          "**El techo** es la base de la capa más baja que cubra más de la mitad del cielo (BKN u OVC). Es uno de los números que decide si el vuelo puede ser VFR.",
        ],
      },
      {
        kind: "p",
        text: "**CAVOK** (ceiling and visibility OK): techo y visibilidad OK. El briefing del curso lo define como cielo despejado con visibilidad horizontal mayor de 10 000 metros. Cuando aparece, reemplaza a los grupos de visibilidad, tiempo presente y nubes.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "La condición completa",
        text: "La clave OACI exige además que no haya nubes por debajo de 5000 ft ni CB/TCU a ninguna altura. Ese detalle no está en la bibliografía del curso: valídalo con tu instructor antes de la entrevista.",
      },
      {
        kind: "breakdown",
        caption:
          "Tres letras de cobertura, tres dígitos de altura y, si aplica, el tipo de nube pegado al final. Nunca se separan.",
        parts: [
          { token: "BKN", label: "cobertura", detail: "Fragmentadas: de 5/8 a 7/8 del cielo. Cuenta como techo." },
          {
            token: "015",
            label: "altura de la base",
            detail: "En centenares de pies sobre el aeródromo: 1500 ft. No son 15 000.",
          },
          {
            token: "CB",
            label: "tipo de nube",
            detail: "Cumulonimbo. `TCU` es torrecúmulo. Solo se anotan estos dos, y solo porque cambian la decisión.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error común: leer la altura como pies directos",
        text: "`FEW010` no son 10 000 ft, son 1000. Es el error que más se repite y el que más rápido descarta a un candidato en la entrevista técnica.",
      },
      {
        kind: "summary",
        items: [
          "Cobertura en octavos: `SKC` 0/8, `FEW` 1 a 2, `SCT` 3 a 4, `BKN` 5 a 7, `OVC` 8/8.",
          "La altura va en **centenares de pies** sobre el aeródromo.",
          "El **techo** es la base de la primera capa `BKN` u `OVC`.",
          "`CB` y `TCU` pegados a la capa son convección: cambian la decisión aunque el techo sea alto.",
          "`VV002` significa cielo oscurecido sin base definida, con 200 ft de visibilidad vertical.",
        ],
      },
      {
        kind: "check",
        question: "El METAR dice `FEW008 SCT015 BKN025CB OVC090`. ¿Cuál es el techo?",
        options: [
          "800 ft, la capa más baja",
          "2500 ft, la primera capa BKN u OVC",
          "9000 ft, la capa cubierta",
        ],
        answer: 1,
        explain:
          "El techo es la base de la primera capa que cubra **más de la mitad** del cielo, o sea la primera `BKN` u `OVC`: aquí `BKN025`, 2500 ft. Las `FEW` y `SCT` de abajo no cuentan para el techo. Y ojo al `CB` pegado: hay convección, que pesa más que el techo mismo.",
      },
    ],
  },

  // ── 7 ──────────────────────────────────────────────────────────────────────
  {
    n: 7,
    title: "Temperatura, rocío y QNH",
    kicker: "Los números que ajustan tu altímetro",
    minutes: 3,
    level: "intermedio",
    blocks: [
      {
        kind: "p",
        text: "**`20/12`**: temperatura del aire 20 °C, **punto de rocío** 12 °C. El punto de rocío es la temperatura a la que el aire se satura (humedad relativa del 100 por ciento). Los negativos llevan M: `M02/M04` es temperatura de menos 2 y rocío de menos 4.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Cuando se juntan, algo se forma",
        text: "Cuanto más cerca esté el rocío de la temperatura, más probable es la niebla, las nubes bajas y la precipitación. Un 09/09 al amanecer en Bogotá es niebla casi segura. Y la diferencia también te habla del rendimiento: aire húmedo y caliente es menos denso.",
      },
      {
        kind: "p",
        text: "**`Q1012`**: el **QNH** en hectopascales, el valor al que calibras el altímetro para que marque la altitud real del aeródromo sobre el nivel del mar. Estados Unidos lo reporta en pulgadas de mercurio: `A2980` son 29.80 inHg.",
      },
      {
        kind: "list",
        items: [
          "QNH bajo y sin actualizar: el altímetro miente alto. De ahí el clásico: de alta a baja, cuidado abajo.",
          "El cambio de Q a A al volar hacia EE. UU. es un error de lectura clásico en entrevistas.",
        ],
      },
      {
        kind: "check",
        question:
          "Amanece en Bogotá con `06/06` y viento en calma. ¿Qué esperas encontrar en la aproximación?",
        options: [
          "Nada especial: seis grados es una temperatura normal",
          "Niebla, casi seguro: temperatura y rocío iguales significan aire saturado",
          "Turbulencia térmica, porque el aire está frío y estable",
        ],
        answer: 1,
        explain:
          "Cuando la temperatura alcanza al punto de rocío el aire está saturado y el vapor condensa. Sin viento que mezcle la capa baja, eso es niebla de radiación. Es el aviso más barato que da un METAR y el que más se pasa por alto.",
      },
    ],
  },

  // ── 8 ──────────────────────────────────────────────────────────────────────
  {
    n: 8,
    title: "Tendencias y comentarios",
    kicker: "Lo que viene en las próximas 2 horas",
    minutes: 3,
    level: "avanzado",
    blocks: [
      {
        kind: "p",
        text: "Al final del informe, el observador te dice qué espera para las **próximas dos horas**. Es la miniatura del TAF (el pronóstico de aeródromo, que merece su propia lección):",
      },
      {
        kind: "kv",
        items: [
          { k: "NOSIG", v: "sin cambio significativo. El mejor final posible." },
          { k: "BECMG", v: "cambio esperado: BECMG 1216 = entre las 12:00 y las 16:00 UTC" },
          { k: "TEMPO", v: "fluctuaciones temporales: TEMPO 0306 = ratos con esa condición entre las 03 y las 06" },
          { k: "PROB40", v: "probabilidad del 40 por ciento" },
          { k: "FM", v: "cambio significativo desde una hora dada" },
          { k: "NSW", v: "fin del tiempo significativo" },
          { k: "RMK", v: "comentario libre del observador. Después de RMK, lee con calma" },
        ],
      },
      {
        kind: "list",
        items: [
          "**AUTO**: observación automatizada, sin observador humano. Algunas estaciones no discriminan el tipo de precipitación (reportan UP).",
          "**COR**: corrección a una observación ya publicada.",
        ],
      },
      {
        kind: "check",
        question: "¿Qué diferencia hay entre `BECMG 1216 3000 BR` y `TEMPO 1216 3000 BR`?",
        options: [
          "Ninguna: las dos anuncian 3 km con neblina entre las 12:00 y las 16:00 UTC",
          "`BECMG` es un cambio que se instala y se queda; `TEMPO` son ratos que van y vienen",
          "`BECMG` es más probable que `TEMPO`",
        ],
        answer: 1,
        explain:
          "`BECMG` describe una transición: en algún momento de esa ventana la condición cambia y a partir de ahí se mantiene. `TEMPO` son fluctuaciones temporales dentro de la ventana, y entre ellas se vuelve a lo anterior. Para planear un alterno no da lo mismo.",
      },
    ],
  },

  // ── 9 ──────────────────────────────────────────────────────────────────────
  {
    n: 9,
    title: "Método de lectura en 5 pasos",
    kicker: "La rutina y los errores comunes",
    minutes: 3,
    level: "avanzado",
    blocks: [
      {
        kind: "p",
        text: "Lee todo METAR en el mismo orden, siempre. La rutina es lo que te salva cuando el informe es feo y el tiempo apremia:",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Dónde y cuándo:** estación y grupo horario. Confirma que el informe sea reciente y pásalo a hora local.",
          "**Viento:** dirección contra la pista en uso, ráfagas y cualquier WS.",
          "**Cuánto ves:** visibilidad y RVR si hay. Compara con tus mínimos.",
          "**Qué cae y qué tapa:** tiempo presente y nubes. CB o TCU cambian la decisión aunque el resto esté limpio.",
          "**Números de máquina:** temperatura y rocío (niebla, rendimiento) y QNH al altímetro. Cierra con la tendencia.",
        ],
      },
      {
        kind: "example",
        title: "Ejemplo resuelto: la rutina aplicada de principio a fin",
        code: "METAR SKCL 041200Z 05008KT 020V090 8000 -RA SCT018 BKN025TCU OVC090 24/22 Q1011 BECMG 1416 9999 NSW",
        steps: [
          "**Dónde y cuándo:** Cali, Alfonso Bonilla Aragón. Día 4 a las 12:00 UTC, o sea las 07:00 hora Colombia. Informe fresco.",
          "**Viento:** del noreste (050°) a 8 nudos, oscilando entre 020° y 090°. Flojo, pero variable: la componente cruzada cambia con la pista en uso.",
          "**Cuánto ves:** 8000 m. No es `9999`, así que algo hay: lo confirma el grupo siguiente.",
          "**Qué cae:** `-RA`, lluvia ligera. Es lo que baja la visibilidad a 8 km.",
          "**Qué tapa:** dispersas a 1800 ft, **fragmentadas a 2500 ft con `TCU`** y cubierto a 9000 ft. El techo son 2500 ft y hay torrecúmulos: convección en desarrollo.",
          "**Números de máquina:** 24 °C con rocío de 22. Dos grados de diferencia, aire muy húmedo y menos denso: la performance de despegue se resiente.",
          "**Tendencia:** `BECMG 1416 9999 NSW`, entre las 14:00 y las 16:00 UTC mejora a 10 km o más y termina el tiempo significativo.",
        ],
        answer:
          "Cali amaneció con lluvia ligera, 8 km de visibilidad y techo de 2500 ft con torrecúmulos, y mejora prevista para media mañana. El dato que manda no es el techo: es el `TCU`. Con convección en desarrollo y aire saturado, lo que hay que mirar es si esos torrecúmulos maduran a cumulonimbos antes de tu hora estimada.",
      },
      { kind: "p", text: "**Errores comunes**, los que caen en entrevista:" },
      {
        kind: "list",
        items: [
          "Leer la hora como local: es UTC, y Colombia va 5 horas detrás.",
          "Confundir la dirección del viento: es **desde donde sopla**, en grados verdaderos, no magnéticos.",
          "Pasar por alto la G de ráfagas o el rango 240V300: el promedio no es el problema, el pico sí.",
          "Leer FEW010 como 10 000 ft: la altura va en centenares, son 1000 ft.",
          "Ignorar el CB pegado a la capa: `BKN015CB` no es solo un techo de 1500 ft, es convección encima del aeródromo.",
          "Olvidar que CAVOK también promete que no hay CB: si hay CAVOK, nadie vio convección.",
        ],
      },
      {
        kind: "check",
        question:
          "Último: `METAR SKCL 041200Z VRB03KT 9999 FEW018 BKN030TCU 26/23 Q1010 NOSIG`. ¿Cuál es el dato que más pesa?",
        options: [
          "El `NOSIG`: no se espera cambio, así que el informe es tranquilizador",
          "El `TCU` de la capa de 3000 ft: hay convección en desarrollo",
          "El `VRB03KT`: viento variable, difícil de elegir pista",
        ],
        answer: 1,
        explain:
          "Todo lo demás está cómodo: 10 km de visibilidad, techo de 3000 ft, viento flojo. Pero `TCU` son torrecúmulos, el paso previo al cumulonimbo, y con 26/23 hay humedad de sobra para que maduren. El `NOSIG` cubre solo dos horas; la convección no pide permiso.",
      },
      {
        kind: "summary",
        title: "Lo que te llevas de toda la lección",
        items: [
          "Todo METAR trae los mismos grupos en el mismo orden. Si uno falta, los demás no se mueven.",
          "La hora es UTC y Colombia va cinco horas atrás, igual que en el NOTAM.",
          "El viento es **desde donde sopla**, en grados verdaderos, y lo que decide es la ráfaga.",
          "La altura de las nubes va en centenares de pies, y el techo es la primera `BKN` u `OVC`.",
          "`CB`, `TCU`, `WS` y `FZ` son las cuatro señales que cambian un briefing por sí solas.",
          "Temperatura y rocío juntos anuncian niebla, y separados te hablan de rendimiento.",
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Tip operacional: sigue con el Decodificador",
        text: "Pega cualquier METAR en el Decodificador de esta sección y compáralo con tu lectura mental. Cuando los decodifiques más rápido que la herramienta, estás listo para la entrevista.",
      },
    ],
  },
]

export const METAR_LESSON_TOTAL = METAR_LESSON.length

/** Lectura estimada de la lección entera, en minutos. Ver LESSON_MINUTES. */
export const METAR_LESSON_MINUTES = METAR_LESSON.reduce((t, s) => t + s.minutes, 0)

export const METAR_SOURCES: string[] = [
  "Los puntos sin respaldo en estos manuales van marcados en el propio texto (detalle en src/data/metar/FUENTES.md del repositorio).",
  "Briefing para pilotos: METAR. Erick De Paz, Meteorólogo Clase III OMM (presentación de curso).",
  "Leyenda para lectura de METAR y TAF, Volar3.com (material de curso).",
  "Norma de referencia: OACI, Anexo 3 (Servicio meteorológico para la navegación aérea internacional) y OMM, Manual de claves No. 306. Confirma contra la edición vigente.",
]

export type { LessonBlock }
