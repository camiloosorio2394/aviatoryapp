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
        text: "Léela de corrido y después abre el Decodificador: pegas cualquier METAR y te lo desarma grupo por grupo. La práctica y la evaluación de esta sección llegan pronto.",
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
        kind: "code",
        text: "METAR  SKBO  261300Z  09006KT  9999  SCT023 BKN080  14/09  Q1027  NOSIG",
      },
      {
        kind: "kv",
        items: [
          { k: "METAR", v: "Tipo de informe: rutina. SPECI si es especial." },
          { k: "SKBO", v: "Estación: el indicador OACI del aeródromo (el mismo de la casilla A del NOTAM)." },
          { k: "261300Z", v: "Día 26 a las 13:00 **UTC**. La Z es zulu: en Colombia resta 5 horas." },
          { k: "09006KT", v: "Viento: del este (090°) a 6 nudos." },
          { k: "9999", v: "Visibilidad: 10 km o más." },
          { k: "SCT023 BKN080", v: "Nubes: dispersas a 2300 ft, fragmentadas a 8000 ft." },
          { k: "14/09", v: "Temperatura 14 °C, punto de rocío 9 °C." },
          { k: "Q1027", v: "QNH 1027 hectopascales." },
          { k: "NOSIG", v: "Tendencia: sin cambio significativo previsto." },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "El orden es tu mapa",
        text: "Si un grupo falta, el resto conserva su posición. Con el orden en la cabeza puedes leer cualquier METAR del mundo aunque tenga grupos que nunca hayas visto: sabes qué debería ir ahí.",
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
        kind: "callout",
        tone: "tip",
        title: "Sigue con el Decodificador",
        text: "Pega cualquier METAR en el Decodificador de esta sección y compáralo con tu lectura mental. Cuando los decodifiques más rápido que la herramienta, estás listo para la entrevista.",
      },
    ],
  },
]

export const METAR_LESSON_TOTAL = METAR_LESSON.length

export const METAR_SOURCES: string[] = [
  "Los puntos sin respaldo en estos manuales van marcados en el propio texto (detalle en src/data/metar/FUENTES.md del repositorio).",
  "Briefing para pilotos: METAR. Erick De Paz, Meteorólogo Clase III OMM (presentación de curso).",
  "Leyenda para lectura de METAR y TAF, Volar3.com (material de curso).",
  "Norma de referencia: OACI, Anexo 3 (Servicio meteorológico para la navegación aérea internacional) y OMM, Manual de claves No. 306. Confirma contra la edición vigente.",
]

export type { LessonBlock }
