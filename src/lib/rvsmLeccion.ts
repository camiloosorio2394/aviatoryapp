// GENERADO por scripts/rvsm/convertir.mjs desde docs/contenido/rvsm.md.
// No se edita a mano: se edita el documento y se vuelve a correr el script.

/**
 * Los 32 capítulos de RVSM, en el formato del lector de lecciones.
 *
 * El contenido es el del documento, sin tocar: este archivo lo traduce a
 * bloques. Las 20 imágenes entran como huecos rotulados, cada uno con lo que
 * hay que dibujar y para qué, así que el módulo se lee completo desde hoy.
 *
 * Las preguntas de cada capítulo NO están aquí: viven en rvsmPractica.ts,
 * porque en la lectura no se pregunta nada.
 */

import type { DocScreen } from "@/lib/docBlocks"
import type { LectorNivel } from "@/components/lesson/LectorLeccion"

/** Los 6 bloques del documento, con el capítulo en el que empieza cada uno. */
export const RV_NIVELES: LectorNivel[] = [
  {
    "titulo": "Qué es y dónde se aplica",
    "desde": 1
  },
  {
    "titulo": "El equipo que exige",
    "desde": 5
  },
  {
    "titulo": "Antes de volar",
    "desde": 12
  },
  {
    "titulo": "Dentro del espacio RVSM",
    "desde": 16
  },
  {
    "titulo": "Cuando algo falla",
    "desde": 24
  },
  {
    "titulo": "Lo que se vigila y lo que cuesta",
    "desde": 29
  }
]

export const RV_LECCIONES: DocScreen[] = [
  {
    "n": 1,
    "title": "Qué es RVSM",
    "kicker": "R01",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Reduced Vertical Separation Minimum: la separación vertical mínima reducida. Es el espacio aéreo designado donde a las aeronaves debidamente aprobadas se las separa **1.000 ft** en vertical, en vez de los 2.000 ft que se aplicaban antes en niveles superiores."
      },
      {
        "kind": "p",
        "text": "La FAA lo define como «espacio aéreo de calificación especial» (*special qualification airspace*). Esa etiqueta es la idea central del módulo: no es un espacio aéreo al que se entra por estar volando alto, sino uno al que se entra por cumplir requisitos."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Reducir la separación de 2.000 a 1.000 ft no se consigue volando con más cuidado. Se consigue porque el sistema entero (avión, operador, tripulación y vigilancia) garantiza que el error vertical se mantiene dentro de márgenes muy estrechos. Sobre esas cuatro patas se sostiene:"
      },
      {
        "kind": "sub",
        "text": "Precisión altimétrica"
      },
      {
        "kind": "p",
        "text": "La altitud que el piloto ve y la que el avión transmite tienen que parecerse mucho a la altitud real. El error del sistema altimétrico (ASE) es una de las magnitudes que se vigilan en todo el programa, y tiene su propio capítulo más adelante."
      },
      {
        "kind": "sub",
        "text": "Mantenimiento del nivel (*height keeping*)"
      },
      {
        "kind": "p",
        "text": "No basta con medir bien: hay que quedarse en el nivel. Por eso RVSM exige un sistema automático de mantenimiento de altitud operativo y **acoplado** en crucero nivelado, y no solo «disponible»."
      },
      {
        "kind": "sub",
        "text": "Equipamiento y aprobación"
      },
      {
        "kind": "p",
        "text": "El avión debe cumplir unos requisitos de equipo, y el operador debe estar autorizado. Una cosa no implica la otra."
      },
      {
        "kind": "sub",
        "text": "Procedimientos, entrenamiento y monitorización"
      },
      {
        "kind": "p",
        "text": "La tripulación tiene procedimientos propios (chequeos altimétricos, fraseología, contingencias) y la performance altimétrica de las flotas se monitoriza de forma continua."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "En una operación normal, RVSM es invisible: se despega, se sube, se nivela en FL 350 y nadie lo menciona. Aparece en tres momentos: cuando un ítem de la MEL toca un sistema relacionado, cuando el ATC pregunta el estado RVSM, y cuando algo falla en crucero y hay que decir *unable RVSM*."
      },
      {
        "kind": "p",
        "text": "El resto del tiempo, RVSM es la razón por la que el nivel que se pidió estaba libre."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "p",
        "text": "En este capítulo, nada todavía: es el marco. Pero conviene fijar la idea con la que se leen los siguientes: la tripulación no verifica que el avión «pueda» llegar al nivel, sino que **siga siendo capaz de cumplir RVSM**."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«RVSM significa volar más cerca.» Describe el resultado, no el concepto, y en una entrevista se nota. RVSM es el conjunto de requisitos que hace que volar más cerca sea seguro."
      },
      {
        "kind": "p",
        "text": "Y el error de siglas, que se oye más de lo que parece: no es *Reduced Vertical Separation Mode*. Es *Minimum*."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-01 · Figura · 16:9 · 1600×900",
        "descripcion": "Perfil vertical partido en dos mitades, con la misma escala de altura a la izquierda. Mitad izquierda, rotulada «ANTES · 2.000 ft»: solo cuatro niveles utilizables entre FL 290 y FL 350, marcados FL 290, FL 310, FL 330 y FL 350, con la separación de 2.000 ft acotada entre dos de ellos. Mitad derecha, rotulada «RVSM · 1.000 ft»: siete niveles entre los mismos extremos, FL 290, FL 300, FL 310, FL 320, FL 330, FL 340 y FL 350, con la separación de 1.000 ft acotada. Una silueta de avión en cada nivel para que la densidad se vea de un golpe.",
        "pie": "Que el piloto entienda de un vistazo que RVSM no acerca los aviones por acercarlos: casi duplica los niveles utilizables en la misma franja de altura.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "RVSM es separación vertical de 1.000 ft entre aeronaves aprobadas, en espacio aéreo designado.",
          "La FAA lo llama espacio aéreo de calificación especial: se entra por cumplir requisitos, no por altura.",
          "Se apoya en precisión altimétrica, mantenimiento del nivel, equipo, aprobación, procedimientos y monitorización.",
          "No es *Mode*: es *Minimum*."
        ]
      }
    ]
  },
  {
    "n": 2,
    "title": "Dónde se aplica",
    "kicker": "R02",
    "minutes": 5,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "El rango vertical donde se aplica RVSM. En la definición de la FAA y en el RAC colombiano coinciden: **desde FL 290 hasta FL 410, inclusive**. Por debajo de FL 290 y por encima de FL 410 rigen otros mínimos de separación."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "«FL 290 a FL 410 inclusive» es la respuesta de entrevista, y es correcta. Pero la respuesta completa lleva una segunda frase: **los detalles los publica cada Estado**."
      },
      {
        "kind": "p",
        "text": "Lo que puede cambiar de una región a otra:"
      },
      {
        "kind": "list",
        "items": [
          "La asignación de niveles por dirección de vuelo, que no es universal.",
          "Los procedimientos para aeronaves sin capacidad RVSM.",
          "Los requisitos de transpondedor y de TCAS. La propia FAA advierte que el operador o el piloto deben averiguar qué exige cada área RVSM donde vayan a operar.",
          "Las contingencias en espacio aéreo oceánico o remoto."
        ]
      },
      {
        "kind": "p",
        "text": "Dónde se mira: el AIP del Estado, los procedimientos suplementarios regionales y los NOTAM."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "En un vuelo doméstico colombiano esto casi nunca se piensa: se sube a FL 330 y ya. En un vuelo internacional, en cambio, el briefing de ruta incluye qué espacio se cruza y qué exige. Un avión aprobado en una región no lo está automáticamente en todas las áreas, y eso se revisa antes, no en el aire."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "list",
        "items": [
          "Que la ruta planificada cruza espacio RVSM y en qué tramos.",
          "Que el avión y el operador están autorizados para ese espacio.",
          "Qué exige esa región en cuanto a transpondedor y vigilancia.",
          "Los NOTAM que afecten al espacio RVSM del día."
        ]
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Nada específico en este capítulo. El estado RVSM se comunica cuando el ATC lo pregunta o cuando la aeronave no es RVSM, y eso tiene su propio capítulo."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«FL 290 siempre es un nivel RVSM que puedo pedir.» FL 290 es el límite inferior del espacio, pero que un nivel exista no quiere decir que esté disponible para tu dirección de vuelo, tu ruta o tu autorización. Y en Colombia hay una consecuencia extra que conviene recordar: sin autorización no hay VFR sobre FL 200, y nunca sobre FL 290 en espacio RVSM (RAC 91, numerales 91.305 y 91.310)."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-02 · Figura · 16:9 · 1600×900",
        "descripcion": "Perfil vertical de una sola columna con tres franjas de altura claramente diferenciadas por color. Franja inferior, gris: «POR DEBAJO DEL ESPACIO RVSM», con su borde superior rotulado FL 290. Franja central, destacada: «ESPACIO RVSM · separación 1.000 ft», con los bordes rotulados FL 290 abajo y FL 410 arriba. Franja superior, gris: «POR ENCIMA DEL ESPACIO RVSM», desde FL 410. A la derecha de la franja central, una nota: «Los detalles los publica cada Estado: AIP, procedimientos regionales y NOTAM».",
        "pie": "Fijar los dos límites verticales y, al mismo tiempo, dejar claro que dentro de esos límites las condiciones las pone cada región.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "RVSM se aplica entre FL 290 y FL 410, inclusive.",
          "Los límites son comunes; los detalles los publica cada Estado.",
          "El AIP, los procedimientos regionales y los NOTAM son la fuente.",
          "En Colombia, sin autorización no hay VFR sobre FL 200 y nunca sobre FL 290 en RVSM."
        ]
      }
    ]
  },
  {
    "n": 3,
    "title": "Por qué existe",
    "kicker": "R03",
    "minutes": 5,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "La razón de ser de RVSM: en la franja de crucero de los reactores de transporte, la altura es un recurso escaso. Separar 2.000 ft desperdiciaba la mitad de los niveles disponibles justo donde más tráfico hay."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "Lo que se gana"
      },
      {
        "kind": "list",
        "items": [
          "**Capacidad.** Casi el doble de niveles utilizables entre FL 290 y FL 410.",
          "**Disponibilidad.** Más probabilidad de conseguir el nivel que se pide, y antes.",
          "**Perfiles más eficientes.** Un avión pesado que necesita FL 310 y luego FL 330 puede escalonar en pasos de 1.000 ft en vez de 2.000.",
          "**Combustible.** Consecuencia de lo anterior: volar más cerca del nivel óptimo consume menos. El ahorro no lo produce RVSM por sí mismo, sino el poder estar donde conviene.",
          "**Flexibilidad para el ATC.** Más niveles significa más soluciones para resolver un conflicto sin desviar lateralmente."
        ]
      },
      {
        "kind": "sub",
        "text": "Lo que se exige a cambio"
      },
      {
        "kind": "p",
        "text": "El precio de reducir el margen es que el error vertical tiene que ser mucho menor. De ahí salen las tres exigencias que recorren todo el módulo:"
      },
      {
        "kind": "list",
        "items": [
          "**Precisión altimétrica.** La altitud mostrada y transmitida debe parecerse a la real dentro de márgenes estrechos.",
          "**Mantenimiento del nivel.** El avión debe quedarse en el nivel asignado, con el sistema automático acoplado.",
          "**Fiabilidad del sistema.** Dos fuentes altimétricas independientes, alerta de altitud y reporte de altitud, para que un fallo no pase inadvertido."
        ]
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Cuando el despacho propone FL 330 en vez de FL 310 y eso vale trescientos kilos de combustible, la razón de que FL 330 exista como nivel utilizable en esa dirección es RVSM."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«RVSM se hizo para ahorrar combustible.» Se hizo para ganar capacidad. El ahorro es una consecuencia, y depende de que el nivel eficiente esté disponible ese día."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "RVSM existe para ganar capacidad en la franja de crucero más congestionada.",
          "Más niveles significa más disponibilidad, perfiles mejores y más margen de maniobra para el ATC.",
          "El ahorro de combustible es consecuencia, no objetivo.",
          "El precio es exigencia de precisión, de mantenimiento del nivel y de fiabilidad."
        ]
      }
    ]
  },
  {
    "n": 4,
    "title": "La aprobación: tres cosas, no una",
    "kicker": "R04",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Operar RVSM no depende solo del avión. Depende de tres cosas que tienen que darse a la vez."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "El avión"
      },
      {
        "kind": "p",
        "text": "Debe cumplir los requisitos de equipo y de performance altimétrica, y tener la aprobación de aeronavegabilidad correspondiente. Aquí es donde entran los dos sistemas altimétricos, el control automático de altitud, la alerta de altitud y el transpondedor con reporte de altitud, que se ven en los capítulos siguientes."
      },
      {
        "kind": "sub",
        "text": "El operador"
      },
      {
        "kind": "p",
        "text": "Debe estar autorizado para operaciones RVSM. En Colombia, esa autorización aparece como una aprobación específica dentro de las especificaciones de operación (OpSpecs) que la Aerocivil le expide al explotador, junto a otras como mercancías peligrosas, baja visibilidad, EDTO o PBN AR (RAC 119, numeral 119.270(a)). La empresa no puede operar donde sus OpSpecs no la autoricen."
      },
      {
        "kind": "sub",
        "text": "La tripulación"
      },
      {
        "kind": "p",
        "text": "Debe estar entrenada en los procedimientos RVSM: chequeos altimétricos, procedimientos antes de la entrada, operación dentro del espacio, contingencias y fraseología. Ese entrenamiento es parte de la aprobación, no un extra."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Al piloto de línea esto le llega resuelto: vuela un avión aprobado, de un operador autorizado, y su entrenamiento periódico incluye RVSM. Lo que sí le toca es saber que la capacidad puede perderse (por un ítem de MEL o por una falla en vuelo) y reconocer cuándo ha ocurrido."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "list",
        "items": [
          "Que el avión del día figura como RVSM capable en la documentación de la empresa.",
          "Que ningún ítem diferido haya retirado esa capacidad.",
          "Que la ruta cruza espacio donde el operador está autorizado."
        ]
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«Si el avión es RVSM capable, ya está.» Falta el operador y falta la tripulación. Y al revés: que el operador esté autorizado no salva a un avión con un sistema requerido inoperativo."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-03 · Figura · 16:9 · 1600×900",
        "descripcion": "Diagrama de convergencia. Tres bloques en la parte superior, separados y del mismo tamaño: «AERONAVE · equipo y performance altimétrica aprobados», «OPERADOR · autorización en las especificaciones de operación» y «TRIPULACIÓN · entrenada en procedimientos RVSM». De cada bloque baja una flecha gruesa hacia un único bloque inferior, más ancho y destacado: «OPERACIÓN RVSM». Al lado del bloque inferior, en tipografía menor y en rojo apagado, la nota: «Si falta una, no hay RVSM».",
        "pie": "Dejar grabado que RVSM no es una propiedad del avión, sino la intersección de tres condiciones.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "RVSM exige avión aprobado, operador autorizado y tripulación entrenada.",
          "En Colombia la autorización del operador va en las especificaciones de operación (RAC 119, numeral 119.270(a)).",
          "Si falta cualquiera de las tres, no hay operación RVSM.",
          "La capacidad puede perderse después: por MEL o por una falla en vuelo."
        ]
      }
    ]
  },
  {
    "n": 5,
    "title": "El equipo requerido, de un vistazo",
    "kicker": "R05",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Los sistemas que deben estar operativos para que una aeronave opere en espacio RVSM. El piloto no necesita saber cómo están construidos; necesita saber cuáles son, para qué le sirven y qué pasa si uno falla."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "La FAA los enumera en el Apéndice A de la AC 91-85B. Son cuatro:"
      },
      {
        "kind": "table",
        "head": [
          "Sistema",
          "Para qué le sirve al piloto",
          "Si falla"
        ],
        "rows": [
          [
            "Dos sistemas independientes de medición de altitud",
            "Le dan dos altitudes que puede comparar entre sí",
            "Con una sola fuente fiable, la capacidad RVSM queda comprometida"
          ],
          [
            "Un transpondedor con reporte de altitud (SSR)",
            "Transmite al ATC la altitud que el avión cree tener",
            "El ATC deja de ver la altitud; hay que coordinar"
          ],
          [
            "Un sistema de alerta de altitud",
            "Avisa cuando la altitud mostrada se aparta de la seleccionada",
            "Se pierde la red de seguridad contra el level bust"
          ],
          [
            "Un sistema automático de control de altitud",
            "Mantiene el nivel sin depender de la mano del piloto",
            "Sin él, en crucero nivelado, no hay capacidad RVSM"
          ]
        ]
      },
      {
        "kind": "sub",
        "text": "Lo que garantizan esas cifras"
      },
      {
        "kind": "p",
        "text": "El equipo aprobado trae unos márgenes que conviene conocer porque explican por qué las cosas avisan cuando avisan:"
      },
      {
        "kind": "list",
        "items": [
          "**La alerta de altitud** debe sonar cuando la altitud mostrada se aparta de la seleccionada más de un valor nominal: **±300 ft** en aviones cuyo certificado de tipo se solicitó el 9 de abril de 1997 o antes, y **±200 ft** en los posteriores, con una tolerancia de equipo que no debe exceder ±50 ft.",
          "**El control automático de altitud** debe mantener el avión dentro de **±65 ft** de la altitud adquirida en vuelo recto y nivelado, sin turbulencia ni ráfagas. Algunos aviones antiguos con entradas del FMS admiten hasta ±130 ft y no requieren modificación.",
          "**El selector de altitud** no debe introducir un error mayor de **±25 ft** entre lo que el piloto selecciona y lo que recibe el sistema de control."
        ]
      },
      {
        "kind": "p",
        "text": "Esas cifras son de diseño, no chequeos que el piloto haga. Se citan aquí porque en una entrevista explican por qué 200 o 300 ft son las magnitudes que aparecen una y otra vez en RVSM."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "p",
        "text": "Que los cuatro estén operativos antes de entrar, y que lo sigan estando mientras se está dentro. La verificación concreta la trae cada capítulo."
      },
      {
        "kind": "titulo",
        "text": "¿Qué pasa si falla?"
      },
      {
        "kind": "p",
        "text": "Depende de cuál. La regla general (y la respuesta correcta en entrevista) es que **no se asume**: se consulta la MEL y el QRH. Pero hay un núcleo que la FAA deja escrito: para entrar a espacio RVSM deben estar operando normalmente los dos sistemas primarios de medición de altitud, un sistema automático de control de altitud y un dispositivo de alerta de altitud."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Contar el TCAS entre el equipo requerido para RVSM. No lo es. El requisito de transpondedor y de TCAS depende del área RVSM, y la propia FAA dice que hay que averiguarlo para cada región donde se pretenda operar."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-04 · Figura · 16:9 · 1600×900",
        "descripcion": "Rejilla de cuatro tarjetas iguales, dispuestas en dos filas de dos, cada una con un icono sencillo arriba, el nombre del sistema en el centro y una línea de consecuencia abajo. Tarjeta 1: dos altímetros lado a lado: «DOS SISTEMAS INDEPENDIENTES DE ALTITUD»: «permiten comparar». Tarjeta 2: antena emitiendo: «TRANSPONDEDOR CON REPORTE DE ALTITUD»: «el ATC ve tu nivel». Tarjeta 3: campana: «ALERTA DE ALTITUD»: «avisa si te apartas». Tarjeta 4: mando de piloto automático: «CONTROL AUTOMÁTICO DE ALTITUD»: «mantiene el nivel». Bajo la rejilla, una banda rotulada: «Los cuatro, operativos, antes de entrar».",
        "pie": "Que el piloto pueda enumerar de memoria los cuatro sistemas y decir en una línea para qué sirve cada uno.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Cuatro sistemas: dos fuentes de altitud, transpondedor con reporte, alerta de altitud y control automático de altitud.",
          "Para entrar deben estar operando normalmente los dos primarios, un control automático y una alerta.",
          "El requisito de transpondedor y de TCAS depende del área: hay que averiguarlo.",
          "Las cifras de diseño (±200 o ±300 ft de alerta, ±65 ft de mantenimiento) explican las magnitudes que maneja RVSM."
        ]
      }
    ]
  },
  {
    "n": 6,
    "title": "Los dos sistemas altimétricos",
    "kicker": "R06",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Las dos fuentes de altitud independientes que exige RVSM. Independientes quiere decir que un problema en una no arrastra a la otra, y esa es toda la razón de que sean dos."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Con una sola fuente, un error no se detecta: lo que el instrumento dice es lo único que hay. Con dos, un error se manifiesta como una **discrepancia**, y una discrepancia sí se puede ver."
      },
      {
        "kind": "p",
        "text": "De ahí salen las cuatro cosas que el piloto hace con ellas:"
      },
      {
        "kind": "sub",
        "text": "Comparar"
      },
      {
        "kind": "p",
        "text": "Mirar las dos y ver si dicen lo mismo. Es el gesto básico y se hace varias veces en el vuelo."
      },
      {
        "kind": "sub",
        "text": "Contrastar contra una referencia conocida"
      },
      {
        "kind": "p",
        "text": "En tierra, la elevación del aeródromo. En el aire, el altímetro de reserva, que es una tercera opinión independiente de las dos primarias."
      },
      {
        "kind": "sub",
        "text": "Detectar la discrepancia"
      },
      {
        "kind": "p",
        "text": "No basta con que las dos cifras «se parezcan»: hay un límite, y tiene número. Se ve en el capítulo siguiente."
      },
      {
        "kind": "sub",
        "text": "Identificar cuál es la sospechosa"
      },
      {
        "kind": "p",
        "text": "Si una de las dos se aparta y la de reserva coincide con la otra, la que se aparta es la candidata. Esa comparación de tres es la razón por la que la FAA pide anotar la diferencia entre las primarias y la de reserva: sirve justamente para cuando haya que decidir cuál creer."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "En un avión moderno, las dos primarias son la del comandante y la del primer oficial, y el avión suele traer comparadores automáticos que vigilan la diferencia y avisan. La FAA advierte de algo con cara de detalle y que no lo es: aunque el avión tenga comparadores, **en espacio oceánico o remoto la tripulación debe ir anotando los chequeos altimétricos**, porque el comparador registra fallas pero no deja a mano la diferencia que hará falta en una contingencia."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "list",
        "items": [
          "Que las dos primarias coinciden dentro del límite.",
          "Cuál es la diferencia entre las primarias y la de reserva, y anotarla.",
          "Que el sistema altimétrico que gobierna el avión es el que alimenta el reporte de altitud al ATC."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué pasa si falla?"
      },
      {
        "kind": "p",
        "text": "Si queda **una sola primaria operativa**, la FAA marca un camino concreto: contrastar con el altímetro de reserva y avisar al ATC de que se está operando con una sola primaria. Y una condición que conviene memorizar: **si no se puede confirmar la precisión de esa primaria que queda, se actúa como si hubieran fallado todas**."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Con una sola primaria operativa, se notifica al ATC. Si no se puede confirmar su precisión, se pasa a *unable RVSM due equipment*, que se ve en su capítulo."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«Si los altímetros difieren un poco no importa, porque el ATC tiene radar.» El radar muestra lo que el transpondedor transmite, y el transpondedor transmite lo que dice el sistema altimétrico. Si ese sistema está equivocado, el ATC ve el mismo error, no la verdad."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-05 · Figura · 16:9 · 1600×900 · anotada",
        "descripcion": "Cabina genérica de reactor de transporte, vista frontal, con el PFD del comandante a la izquierda, el PFD del primer oficial a la derecha y el altímetro de reserva en el panel central. Los tres mostrando altitud en crucero. ANOTACIONES: → FLECHA 1: a la cinta de altitud del PFD izquierdo. EXPLICACIÓN: primaria del comandante. → FLECHA 2: a la cinta de altitud del PFD derecho. EXPLICACIÓN: primaria del primer oficial. Estas dos son las que deben coincidir dentro del límite en crucero. → FLECHA 3: al altímetro de reserva del panel central. EXPLICACIÓN: la tercera opinión, independiente. Es contra ella que se contrastan las primarias cada hora, y la diferencia se anota para una eventual contingencia.",
        "pie": "Que el piloto vea que en RVSM no hay «el altímetro»: hay tres indicaciones y una relación entre ellas que hay que vigilar.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Dos fuentes independientes existen para que un error se vea como discrepancia.",
          "El altímetro de reserva es la tercera opinión que permite decidir cuál de las dos primarias es la sospechosa.",
          "Con una sola primaria operativa: contrastar con la de reserva y avisar al ATC.",
          "Si no se puede confirmar su precisión, se trata como falla de todas las primarias.",
          "El radar del ATC no corrige un error altimétrico: lo repite."
        ]
      }
    ]
  },
  {
    "n": 7,
    "title": "El chequeo altimétrico",
    "kicker": "R07",
    "minutes": 8,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "La comparación periódica de las indicaciones de altitud. Es el procedimiento más característico de RVSM y el que más se pregunta en entrevista, porque tiene momentos definidos y cifras concretas."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Hay cuatro momentos, y cada uno tiene su referencia."
      },
      {
        "kind": "sub",
        "text": "Antes del despegue"
      },
      {
        "kind": "p",
        "text": "Con los altímetros en QNH, deben mostrar una elevación conocida (típicamente la del aeródromo) dentro de los límites del manual del avión. La FAA fija un tope: **la diferencia entre la elevación conocida y la mostrada no debe exceder 75 ft**."
      },
      {
        "kind": "p",
        "text": "Además, las dos primarias deben coincidir entre sí dentro de los límites del manual de operación o del AFM. Ese segundo límite **depende del avión**: la FAA no da un número único y remite al manual."
      },
      {
        "kind": "sub",
        "text": "Al subir por la altitud de transición"
      },
      {
        "kind": "p",
        "text": "Poner 29,92 inHg / **1013,25 hPa** en todos los altímetros, primarios y de reserva, sin demora, y volver a comprobar el ajuste al llegar al primer nivel autorizado."
      },
      {
        "kind": "sub",
        "text": "En crucero, ya en RVSM"
      },
      {
        "kind": "p",
        "text": "**Las dos primarias deben coincidir dentro de 200 ft** (60 m), o menos si el manual del avión lo especifica. La AC añade la consecuencia en la misma frase: si no se cumple, **el sistema altimétrico debe reportarse como defectuoso y notificarse al ATC**."
      },
      {
        "kind": "p",
        "text": "Y una tarea que se olvida: anotar la diferencia entre las primarias y la de reserva, para tenerla si hace falta."
      },
      {
        "kind": "sub",
        "text": "Cada hora, aproximadamente"
      },
      {
        "kind": "p",
        "text": "Contrastar las primarias con el altímetro de reserva. La FAA matiza cómo se hace según el espacio:"
      },
      {
        "kind": "list",
        "items": [
          "El barrido normal de instrumentos suele bastar en la mayoría de los vuelos.",
          "En espacio con vigilancia (radar o ADS-B), el primer chequeo se hace **después de nivelar**.",
          "En espacio oceánico o remoto, se hace y **se registra** en las proximidades del punto donde empieza la navegación oceánica (por ejemplo, al salir a la costa), anotando las lecturas de las primarias y de la de reserva."
        ]
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "En un vuelo doméstico corto, el chequeo de crucero puede ser el único que se haga, y cabe en el barrido normal. En un Bogotá–Madrid, el chequeo al coast out se anota en el registro de vuelo, y ese papel es el que sirve si más tarde hay que decidir qué altímetro creer."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "table",
        "head": [
          "Momento",
          "Qué se compara",
          "Contra qué"
        ],
        "rows": [
          [
            "Antes del despegue",
            "Altímetros en QNH",
            "Elevación conocida, dentro de 75 ft"
          ],
          [
            "Antes del despegue",
            "Primaria contra primaria",
            "Límite del manual del avión"
          ],
          [
            "Por la altitud de transición",
            "Ajuste de subescala",
            "1013,25 hPa / 29,92 inHg, y recomprobar al nivelar"
          ],
          [
            "En crucero RVSM",
            "Primaria contra primaria",
            "200 ft, o menos si lo dice el manual"
          ],
          [
            "Cada hora aproximadamente",
            "Primarias contra la de reserva",
            "Anotar la diferencia"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué pasa si falla?"
      },
      {
        "kind": "p",
        "text": "Si en crucero las primarias no coinciden dentro del límite, la respuesta no es «vigilarlo»: se reporta el sistema altimétrico como defectuoso y se notifica al ATC. A partir de ahí se entra en el terreno de la pérdida de capacidad RVSM."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Dar el número de 200 ft como si fuera universal para cualquier momento del vuelo. Los 200 ft son el límite **entre primarias, en crucero**. El chequeo contra la elevación conocida antes de despegar tiene otro número, 75 ft, y el límite entre primarias en tierra lo pone el manual del avión."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-06 · Figura · 16:9 · 1600×900",
        "descripcion": "Línea de tiempo horizontal de un vuelo, de izquierda a derecha, con la silueta del perfil de vuelo por detrás en gris claro: rodaje, ascenso, crucero largo y descenso. Sobre la línea, cuatro marcadores numerados con su rótulo y su cifra. Marcador 1, en rodaje: «ANTES DEL DESPEGUE · elevación conocida ±75 ft · primarias entre sí: límite del AFM». Marcador 2, en el ascenso: «ALTITUD DE TRANSICIÓN · 1013,25 hPa en todos · recomprobar al nivelar». Marcador 3, al principio del crucero: «EN CRUCERO · primarias dentro de 200 ft». Marcador 4, repetido tres veces a lo largo del crucero con una flecha circular: «CADA ~1 HORA · primarias contra la de reserva · anotar».",
        "pie": "Que el piloto asocie cada chequeo con su momento y su cifra, y no mezcle los números de un momento con los de otro.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Antes de despegar: elevación conocida dentro de 75 ft, y primarias entre sí según el manual del avión.",
          "Por la transición: 1013,25 hPa en todos los altímetros, y recomprobar al nivelar.",
          "En crucero: primarias dentro de 200 ft, o menos si lo dice el manual.",
          "Cada hora aproximadamente: contrastar con la de reserva; en oceánico, anotarlo.",
          "Si no coinciden en crucero: se reporta el sistema como defectuoso y se avisa al ATC."
        ]
      }
    ]
  },
  {
    "n": 8,
    "title": "El control automático de altitud",
    "kicker": "R08",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "El sistema que mantiene el avión en el nivel sin depender de la mano del piloto: en la práctica, el piloto automático con su modo de mantenimiento de altitud."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "RVSM no pide que el sistema esté **disponible**: pide que esté **operativo y acoplado** durante el crucero nivelado. La FAA admite dos excepciones, y conviene decirlas con sus palabras: circunstancias como la necesidad de **retrimar** el avión o la **turbulencia** pueden requerir desacoplarlo."
      },
      {
        "kind": "p",
        "text": "Y añade una condición que se olvida: en cualquier caso, la adherencia a la altitud de crucero debe hacerse **por referencia a uno de los dos altímetros primarios**. Desacoplar no significa dejar de vigilar; significa vigilar más."
      },
      {
        "kind": "sub",
        "text": "Qué garantiza el equipo"
      },
      {
        "kind": "p",
        "text": "El sistema aprobado mantiene el avión dentro de **±65 ft** de la altitud adquirida en vuelo recto y nivelado, sin turbulencia ni ráfagas. Es una cifra de diseño y explica por qué, en condiciones normales, la altitud simplemente no se mueve."
      },
      {
        "kind": "sub",
        "text": "El sobrepaso en los cambios de nivel"
      },
      {
        "kind": "p",
        "text": "Durante una transición autorizada entre niveles, la FAA pide no sobrepasar ni quedarse corto del nivel autorizado **en más de 150 ft** (45 m). Y recomienda hacer la nivelación con la función de captura de altitud del sistema automático, si está instalada."
      },
      {
        "kind": "p",
        "text": "Esa cifra de 150 ft es la que distingue una nivelación normal de una que ya es un hallazgo."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "El gesto real es pequeño: se selecciona el nivel, se comprueba, se deja capturar al automático y se verifica que se quedó. Lo que cambia en RVSM es que desacoplar el piloto automático en crucero deja de ser una opción de estilo y pasa a ser una decisión con consecuencias."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "list",
        "items": [
          "Que el sistema está operativo antes de entrar.",
          "Que está acoplado en crucero nivelado.",
          "Que la captura del nivel no sobrepasó ni quedó corta más de 150 ft.",
          "Que la altitud se sigue por uno de los primarios, aunque el automático esté acoplado."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué pasa si falla?"
      },
      {
        "kind": "p",
        "text": "La falla del sistema automático de control de altitud es uno de los tres casos que la FAA agrupa bajo *unable RVSM due equipment*, junto con la falla de la alerta de altitud y la de todos los altímetros primarios."
      },
      {
        "kind": "p",
        "text": "Y aquí está el error de entrevista más común del módulo: **volar manual no sustituye al sistema**. Que un piloto sea capaz de mantener el nivel a mano no devuelve la capacidad RVSM."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Si el sistema falla estando dentro: *«Unable RVSM due equipment»*, y solicitar salir del espacio RVSM salvo que la situación operacional indique otra cosa."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«Si falla el piloto automático sigo igual, porque puedo volar manual.» Falso en RVSM. El requisito es del sistema, no de la habilidad."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-07 · Figura · 16:9 · 1600×900 · anotada",
        "descripcion": "PFD genérico en crucero, con la cinta de altitud a la derecha, la altitud seleccionada en la ventana superior, y la fila de anunciadores del modo de vuelo (FMA) en la parte alta. ANOTACIONES: → FLECHA 1: a la altitud seleccionada en la ventana superior. EXPLICACIÓN: el nivel autorizado, tal como quedó tras la colación. Es la cifra que el otro piloto verifica. → FLECHA 2: a la altitud actual en la cinta. EXPLICACIÓN: lo que el avión hace. En crucero estable y sin turbulencia, el sistema aprobado la mantiene dentro de ±65 ft. → FLECHA 3: al anunciador de modo vertical y al de piloto automático acoplado en el FMA. EXPLICACIÓN: RVSM exige que el sistema automático esté operativo y acoplado en crucero nivelado, no solo disponible.",
        "pie": "Relacionar tres cosas que el piloto mira por separado (nivel autorizado, altitud real y estado del automático) como la única verificación que sostiene la separación de 1.000 ft.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "El control automático debe estar operativo y acoplado en crucero nivelado.",
          "Se admite desacoplar para retrimar o por turbulencia; la altitud se sigue por un primario.",
          "En transiciones de nivel, no sobrepasar ni quedarse corto más de 150 ft.",
          "Su falla es *unable RVSM due equipment*: volar manual no la sustituye."
        ]
      }
    ]
  },
  {
    "n": 9,
    "title": "La alerta de altitud",
    "kicker": "R09",
    "minutes": 5,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "El sistema que avisa cuando la altitud mostrada se aparta de la seleccionada. Es la red de seguridad contra el error humano: el nivel mal puesto, el que se olvida, el que se pasa."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Opera desde cualquiera de las dos fuentes de altitud requeridas, y avisa cuando la desviación supera un valor nominal:"
      },
      {
        "kind": "list",
        "items": [
          "**±300 ft** en aviones cuyo certificado de tipo o cambio mayor se solicitó el 9 de abril de 1997 o antes.",
          "**±200 ft** en los posteriores, con una tolerancia de equipo que no debe exceder ±50 ft."
        ]
      },
      {
        "kind": "p",
        "text": "Lo que el piloto saca de esas cifras no es la fecha: es que **la alerta suena tarde para RVSM**. Con 1.000 ft de separación, para cuando el avisador canta ya se ha consumido una quinta o una tercera parte del margen. La alerta es la última defensa, no la primera."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Se nota en la aproximación al nivel y en el momento de nivelar. En crucero estable no debería sonar nunca; si suena, ha pasado algo que merece atención inmediata."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "p",
        "text": "Que el sistema esté operativo. La FAA lo pone entre los tres que deben estar operando normalmente al entrar en espacio RVSM, y lo repite en los procedimientos en vuelo: la alerta de altitud **debe estar operativa**."
      },
      {
        "kind": "titulo",
        "text": "¿Qué pasa si falla?"
      },
      {
        "kind": "p",
        "text": "Es uno de los tres casos de *unable RVSM due equipment*. Y conviene entender por qué un aviso que «solo avisa» tiene ese peso: sin él, una desviación lenta puede crecer sin que nadie la note hasta que el ATC la vea en el radar, y para entonces el margen puede haberse consumido."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "*«Unable RVSM due equipment»*, y solicitar salir del espacio salvo que la situación operacional indique otra cosa."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Tratarla como un lujo: «es solo una campana». En RVSM es equipo requerido, y su falla tiene la misma consecuencia que perder el piloto automático o los altímetros primarios."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Avisa cuando la altitud mostrada se aparta de la seleccionada: ±300 ft o ±200 ft según la antigüedad del tipo.",
          "Con 1.000 ft de separación, cuando suena ya se consumió buena parte del margen: es la última defensa.",
          "Debe estar operativa para entrar y mientras se está dentro.",
          "Su falla es *unable RVSM due equipment*."
        ]
      }
    ]
  },
  {
    "n": 10,
    "title": "El reporte de altitud y el transpondedor",
    "kicker": "R10",
    "minutes": 5,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "El transpondedor con reporte de altitud es lo que hace que el ATC vea tu nivel. Sin él, el controlador tiene tu posición pero no tu altitud, y en un espacio donde la separación es de 1.000 ft eso cambia el problema entero."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Hay una regla operacional, corta y muy citable en entrevista:"
      },
      {
        "kind": "quote",
        "text": "Normalmente, el sistema altimétrico que se está usando para controlar la aeronave debe ser el que alimenta el transpondedor que reporta la altitud al ATC."
      },
      {
        "kind": "p",
        "text": "Dicho de otro modo: **lo que el avión sigue y lo que el avión transmite deben venir de la misma fuente**. Si el piloto automático se guía por el sistema 1 y el transpondedor transmite el sistema 2, y los dos discrepan, el avión está volando un nivel y enseñando otro. El ATC separa con lo que ve."
      },
      {
        "kind": "p",
        "text": "De ahí también que la diferencia asignada (la AAD) se defina contra lo transmitido: es la diferencia entre la altitud que transmite el transpondedor en modo C y la altitud o nivel asignado."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "En la mayoría de los aviones esto está resuelto por diseño y por SOP: se selecciona un transpondedor y la fuente correspondiente. Aparece cuando hay que cambiar de transpondedor o de fuente de datos aéreos, y ahí la pregunta es siempre la misma: ¿lo que transmito viene de donde vuelo?"
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "list",
        "items": [
          "Que el transpondedor está operativo y reportando altitud.",
          "Que la fuente que alimenta el reporte es la que gobierna el avión.",
          "Si se cambia de transpondedor o de fuente, que la relación se mantiene, y anotarlo si hubo diferencia."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué pasa si falla?"
      },
      {
        "kind": "p",
        "text": "La falla de transpondedor tiene un tratamiento **distinto** del de los otros tres sistemas, y esa distinción es fina y se pregunta. Según la tabla de contingencias de la FAA:"
      },
      {
        "kind": "list",
        "items": [
          "El piloto contacta al ATC y **solicita autorización para continuar operando en el nivel autorizado**.",
          "Cumple la autorización revisada si el ATC la emite.",
          "El controlador considera la solicitud y emite nueva autorización si hace falta."
        ]
      },
      {
        "kind": "p",
        "text": "No es el *unable RVSM due equipment* automático de los otros tres. Y la AC recuerda que la operación con transpondedor inoperativo está regulada aparte. En espacio aéreo no controlado por Estados Unidos, los Estados proveedores determinan qué acciones corresponden ante falla de transpondedor o de TCAS."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Solicitud de continuar en el nivel autorizado, y cumplimiento de lo que el ATC responda."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Meter la falla de transpondedor en el mismo saco que la del piloto automático. No van juntas: los altímetros, el control automático y la alerta son *unable RVSM due equipment*; el transpondedor se coordina."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "El transpondedor es lo que hace visible tu nivel para el ATC.",
          "La fuente que gobierna el avión debe ser la que alimenta el reporte de altitud.",
          "La AAD se mide contra lo transmitido, no contra lo que ves.",
          "Su falla se coordina con el ATC: no es el *unable RVSM due equipment* de los otros tres."
        ]
      }
    ]
  },
  {
    "n": 11,
    "title": "RVSM y la MEL",
    "kicker": "R11",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "El punto donde RVSM se cruza con la lista de equipo mínimo. Es el capítulo que más se pregunta en entrevistas de aerolínea, porque separa al que memorizó de una lista al que sabe razonar."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "La idea central cabe en una frase: **despachable y RVSM capable no son lo mismo**."
      },
      {
        "kind": "p",
        "text": "Un ítem diferido puede dejar el avión perfectamente despachable y, al mismo tiempo, retirarle la capacidad RVSM. Y al revés: no toda falla la retira automáticamente. La única forma de saberlo es mirar la MEL de ese avión."
      },
      {
        "kind": "sub",
        "text": "Qué mira el piloto en la entrada de MEL"
      },
      {
        "kind": "list",
        "items": [
          "**El ítem y su número requerido.** Cuántos hacen falta para despachar.",
          "**Las observaciones o excepciones.** Aquí es donde suele aparecer la restricción RVSM, escrita con todas las letras.",
          "**La (M)**, que indica un procedimiento de mantenimiento asociado.",
          "**La (O)**, que indica un procedimiento operacional que le toca a la tripulación.",
          "**La restricción explícita de RVSM**, si la hay."
        ]
      },
      {
        "kind": "sub",
        "text": "Sistemas que suelen tocar RVSM"
      },
      {
        "kind": "p",
        "text": "Los que ya conocemos: altimetría, control automático de altitud, alerta de altitud, y reporte de altitud o transpondedor. Que un ítem toque uno de esos sistemas es motivo para ir a mirar, no para concluir."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "El avión llega con un ítem diferido. El despacho ya hizo su parte y el vuelo está planificado. Lo que le toca al piloto es comprobar si esa restricción afecta la ruta del día: si el plan cruza espacio RVSM y el avión ya no es capaz, hay que replanificar, y eso toca nivel, combustible y a veces ruta."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "list",
        "items": [
          "La entrada de MEL completa, no solo el título.",
          "Si hay restricción RVSM.",
          "Si el plan de vuelo declara capacidad que el avión ya no tiene.",
          "Qué nivel queda disponible, y si el avión llega con el peso del día.",
          "Qué consecuencia tiene sobre el combustible.",
          "Si el procedimiento operacional (O) le corresponde a la tripulación cumplirlo."
        ],
        "ordered": true
      },
      {
        "kind": "titulo",
        "text": "¿Qué pasa si falla?"
      },
      {
        "kind": "p",
        "text": "Aquí «falla» significa no leer la entrada completa. Los dos errores clásicos:"
      },
      {
        "kind": "list",
        "items": [
          "Suponer que porque el avión está despachado sigue siendo RVSM capable.",
          "Suponer que porque un sistema está inoperativo ya no lo es."
        ]
      },
      {
        "kind": "p",
        "text": "Ninguna de las dos suposiciones se sostiene sin la MEL delante."
      },
      {
        "kind": "sub",
        "text": "Dos ítems abiertos a la vez"
      },
      {
        "kind": "p",
        "text": "Caso que aparece en entrevista: dos entradas de MEL abiertas simultáneamente, cada una aceptable por separado. La respuesta correcta es que **hay que mirar la interacción**: la MEL puede prohibir la combinación aunque admita cada una por su lado, y el efecto conjunto sobre RVSM puede no ser el de ninguna de las dos."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«Si el avión es despachable por MEL, automáticamente sigue siendo RVSM.» Es exactamente la confusión que este capítulo existe para deshacer."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-08 · Figura · 16:9 · 1600×900 · anotada",
        "descripcion": "Entrada ficticia de una lista de equipo mínimo, con su formato habitual en columnas: número de ítem y sistema, número instalado, número requerido para el despacho, y una columna ancha de observaciones y excepciones. El ítem se refiere a un sistema relacionado con el mantenimiento automático de altitud. ANOTACIONES: → FLECHA 1: a la columna de número requerido. EXPLICACIÓN: cuántos hacen falta para despachar. Responde «¿sale el avión?», no «¿es RVSM?». → FLECHA 2: a la línea de observaciones donde aparece la restricción. EXPLICACIÓN: aquí es donde la MEL retira la capacidad RVSM, con todas las letras. Es la línea que hay que leer. → FLECHA 3: a las marcas (M) y (O) al lado del ítem. EXPLICACIÓN: (M) es un procedimiento de mantenimiento; (O) es uno operacional, y ese le toca cumplirlo a la tripulación.",
        "pie": "Mostrar en un solo golpe de vista que «despachable» y «RVSM capable» se leen en columnas distintas de la misma entrada.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Despachable y RVSM capable no son lo mismo.",
          "La restricción RVSM se lee en las observaciones de la entrada de MEL, no se deduce.",
          "Nunca se asume en ninguna de las dos direcciones.",
          "Con dos ítems abiertos, hay que mirar la interacción entre ellos.",
          "Perder RVSM en tierra cambia nivel, combustible y a veces ruta."
        ]
      }
    ]
  },
  {
    "n": 12,
    "title": "La planificación",
    "kicker": "R12",
    "minutes": 5,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Lo que la tripulación revisa en la preparación del vuelo con relación a RVSM. No es el trabajo del despachador: es la parte que el piloto comprueba y firma."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "La lista corta, en el orden en que se mira:"
      },
      {
        "kind": "list",
        "items": [
          "**Estado RVSM del avión del día.** Si es capaz, y si sigue siéndolo con lo que traiga diferido.",
          "**MEL y CDL.** Si hay ítems que toquen altimetría, control automático de altitud, alerta o reporte de altitud.",
          "**La ruta.** Qué tramos cruzan espacio RVSM y de qué regiones.",
          "**El plan de vuelo.** Que declare la capacidad que el avión de verdad tiene.",
          "**Meteorología en ruta.** Con dos cosas que este módulo mira con lupa: turbulencia y onda de montaña.",
          "**NOTAM.** Los que afecten al espacio RVSM del día."
        ]
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "El briefing dura poco y casi siempre se resume en una frase: «avión limpio, ruta normal, sin novedad». RVSM se vuelve una conversación cuando algo de esa lista no está limpio, y entonces el efecto se propaga: nivel distinto, más combustible, a veces otra ruta."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "p",
        "text": "Los seis puntos de arriba. Y una comprobación de coherencia que se olvida: **que lo declarado en el plan de vuelo coincide con lo que el avión puede hacer hoy**. Si el avión perdió capacidad RVSM por MEL, el plan no debe declararla."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«RVSM solo afecta la planificación del vuelo.» Es al revés: la planificación es donde empieza, pero RVSM se verifica antes de entrar, se vigila dentro y se reporta después."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Se revisa: estado del avión, MEL y CDL, ruta, plan de vuelo, meteorología y NOTAM.",
          "La meteorología importa por turbulencia y onda de montaña, que afectan el mantenimiento del nivel.",
          "Lo declarado en el plan debe coincidir con lo que el avión puede hacer hoy.",
          "La planificación es el principio, no el final."
        ]
      }
    ]
  },
  {
    "n": 13,
    "title": "RVSM en el plan de vuelo OACI",
    "kicker": "R13",
    "minutes": 5,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Cómo se declara la capacidad RVSM en el plan de vuelo. Es una sola letra, y el piloto debe saber cuál es y qué significa."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "En el plan de vuelo OACI, la **casilla 10 (Equipo)** se anota con la letra **W** para operar en espacio RVSM. Esa letra es la que usa el proveedor de servicios de tránsito aéreo para decidir cuándo asignar separación de 1.000 ft."
      },
      {
        "kind": "p",
        "text": "Tres consecuencias que conviene tener claras:"
      },
      {
        "kind": "list",
        "items": [
          "**La letra declara, no otorga.** La capacidad viene del avión, del operador y de la tripulación; la W solo se lo comunica al sistema.",
          "**Si el avión o la tripulación no cumplen los requisitos, la W no se pone.** La FAA lo dice expresamente: el operador o el despachador **no** declaran el código de equipo RVSM, y se siguen los procedimientos de aeronave no RVSM, incluida la fraseología correspondiente.",
          "**Declarar capacidad que no se tiene es un problema serio.** El ATC separará 1.000 ft creyendo que puede."
        ]
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "El plan llega hecho. Lo que el piloto hace es comprobar coherencia: si el avión trae una restricción RVSM por MEL y el plan lleva la W, hay una contradicción que se resuelve antes de salir, no en el aire."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "list",
        "items": [
          "Que la casilla 10 lleva la W si el vuelo va a operar RVSM.",
          "Que **no** la lleva si el avión perdió la capacidad.",
          "Que la matrícula del avión aparece donde corresponde cuando difiere de la identificación de la aeronave."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué pasa si falla?"
      },
      {
        "kind": "p",
        "text": "Si el plan declara capacidad que no existe, el sistema aplicará separación reducida a un avión que no puede garantizarla. Corregirlo es responsabilidad del operador y del despacho, y el piloto es la última verificación antes de que el avión se mueva."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Si el avión no es RVSM, además de no declarar la W, el piloto debe informarlo al controlador, con la fraseología del capítulo 27."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Creer que la W «habilita» el vuelo RVSM. Declara una capacidad que ya debe existir. Ponerla no hace capaz a un avión que no lo es."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-09 · Figura · 16:9 · 1600×900 · anotada",
        "descripcion": "Fragmento ficticio de un plan de vuelo OACI, mostrando la fila de casillas 7 a 10 con contenido de ejemplo, y la casilla 10 (Equipo) claramente legible con una cadena de letras de equipo entre las que aparece la W. ANOTACIONES: → FLECHA 1: a la letra W dentro de la casilla 10. EXPLICACIÓN: declara capacidad RVSM. Es lo que el proveedor de servicios ATS usa para decidir si te aplica separación de 1.000 ft. → FLECHA 2: al resto de la cadena de equipo de la casilla 10. EXPLICACIÓN: las demás capacidades declaradas. La W convive con ellas; no las sustituye. → FLECHA 3: a la casilla 7, identificación de la aeronave. EXPLICACIÓN: cuando la matrícula difiere de la identificación, se anota donde corresponda en la información complementaria.",
        "pie": "Que el piloto reconozca a simple vista dónde vive RVSM dentro del plan de vuelo y entienda que esa letra es una declaración, no una autorización.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "La capacidad RVSM se declara con la letra W en la casilla 10 del plan de vuelo OACI.",
          "Si el avión o la tripulación no cumplen, la W no se declara.",
          "La W declara; no otorga capacidad.",
          "El piloto comprueba que el plan dice lo que el avión de verdad puede hacer."
        ]
      }
    ]
  },
  {
    "n": 14,
    "title": "El preflight",
    "kicker": "R14",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Lo que la tripulación hace antes de salir, con relación a RVSM. La FAA lo enumera en cuatro puntos y todos son de piloto, no de mantenimiento."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "1. Revisar los registros de mantenimiento"
      },
      {
        "kind": "p",
        "text": "Mirar el libro técnico y las formas para conocer el estado del equipo requerido para vuelo en espacio RVSM, y asegurarse de que se han tomado las acciones para corregir los defectos de ese equipo."
      },
      {
        "kind": "sub",
        "text": "2. En la inspección exterior, mirar las tomas estáticas"
      },
      {
        "kind": "p",
        "text": "Prestar atención particular al estado de las **tomas estáticas**, al estado del revestimiento del fuselaje **cerca de cada toma estática**, y a cualquier otro componente que afecte la precisión del sistema altimétrico."
      },
      {
        "kind": "p",
        "text": "Este punto merece detenerse. Es el único momento del vuelo en que el piloto puede ver con sus ojos algo que afecta directamente la precisión altimétrica: una abolladura, una reparación mal acabada o una cinta cerca de una toma estática cambia el flujo de aire y con él la presión que el sistema mide. La FAA admite que lo haga otra persona calificada y autorizada (un mecánico, un ingeniero de vuelo), pero alguien tiene que mirarlo."
      },
      {
        "kind": "sub",
        "text": "3. Antes del despegue, los dos chequeos altimétricos"
      },
      {
        "kind": "p",
        "text": "Los del capítulo 7: elevación conocida dentro de 75 ft con QNH puesto, y las dos primarias coincidiendo dentro del límite del manual del avión. La AC añade una nota que dice mucho: **ambos chequeos deben ser un punto de énfasis en el material de entrenamiento**."
      },
      {
        "kind": "sub",
        "text": "4. El equipo requerido, operativo"
      },
      {
        "kind": "p",
        "text": "El equipo requerido para vuelo en espacio RVSM debe estar operativo, y cualquier indicación de mal funcionamiento debe resolverse."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Los cuatro puntos caben en la rutina normal: el libro técnico se lee, la vuelta al avión se da, los altímetros se ajustan y se comparan. Lo que RVSM añade es intención: mirar las tomas estáticas **sabiendo por qué**, y comparar los altímetros **sabiendo contra qué**."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "table",
        "head": [
          "#",
          "Verificación",
          "Referencia"
        ],
        "rows": [
          [
            "1",
            "Libro técnico y formas: estado del equipo RVSM",
            "AC 91-85B, B.3.2(1)"
          ],
          [
            "2",
            "Tomas estáticas y fuselaje cercano",
            "AC 91-85B, B.3.2(2)"
          ],
          [
            "3",
            "Elevación conocida dentro de 75 ft, y primarias entre sí",
            "AC 91-85B, B.3.2(3)"
          ],
          [
            "4",
            "Equipo requerido operativo, sin indicaciones de falla",
            "AC 91-85B, B.3.2(4)"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué pasa si falla?"
      },
      {
        "kind": "p",
        "text": "Un hallazgo en el preflight se resuelve en tierra. Si el equipo requerido no está operativo o el chequeo altimétrico se sale de límites, el camino es la MEL y mantenimiento, no despegar a ver qué pasa."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Dar la vuelta al avión sin mirar las tomas estáticas, o mirarlas sin saber que en RVSM son el punto crítico de la inspección exterior."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-10 · Figura · 16:9 · 1600×900",
        "descripcion": "Detalle del fuselaje delantero de un reactor de transporte, vista lateral próxima, con una toma estática claramente visible y el revestimiento alrededor. Un círculo de atención marcando la toma y una zona sombreada del revestimiento en su entorno inmediato. A un lado, tres viñetas cortas de lo que se busca: «superficie limpia y sin obstrucción», «revestimiento sin abolladuras ni reparaciones que alteren el flujo», «sin cinta, sellante ni pintura sobre la toma o su entorno».",
        "pie": "Convertir un punto del preflight que suele pasar desapercibido en algo concreto y mirable, explicando por qué en RVSM esa zona del avión importa más que en otras operaciones.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Revisar el libro técnico para conocer el estado del equipo RVSM.",
          "En la vuelta al avión, mirar las tomas estáticas y el fuselaje a su alrededor.",
          "Antes de despegar: elevación conocida dentro de 75 ft y primarias entre sí según el manual.",
          "El equipo requerido debe estar operativo; las indicaciones de falla se resuelven en tierra."
        ]
      }
    ]
  },
  {
    "n": 15,
    "title": "Antes de entrar al espacio RVSM",
    "kicker": "R15",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "La verificación que se hace en el ascenso, antes de cruzar FL 290. Es el momento en que se confirma que lo que se comprobó en tierra sigue siendo cierto."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "La FAA lo resume en una regla y una lista."
      },
      {
        "kind": "p",
        "text": "**La regla:** si cualquiera del equipo requerido falla **antes** de entrar en espacio RVSM, el piloto debe **solicitar una nueva autorización para evitar el vuelo en ese espacio**. No se entra a ver si se resuelve."
      },
      {
        "kind": "p",
        "text": "**La lista** de lo que debe estar operando normalmente al entrar:"
      },
      {
        "kind": "list",
        "items": [
          "Dos sistemas primarios de medición de altitud.",
          "Un sistema automático de control de altitud.",
          "Un dispositivo de alerta de altitud."
        ],
        "ordered": true
      },
      {
        "kind": "p",
        "text": "Y la nota que la acompaña: el requisito de transpondedor operativo y de TCAS hay que averiguarlo para cada área RVSM donde se vaya a operar."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "El ascenso a crucero es un momento cargado: cambio de frecuencia, ajuste de altímetros en la transición, aceleración, retracción. La verificación RVSM se engancha ahí y por eso conviene tenerla como una secuencia corta y siempre igual."
      },
      {
        "kind": "sub",
        "text": "Resumen educativo: seguir siempre el SOP, el FCOM y el QRH del operador"
      },
      {
        "kind": "p",
        "text": "Esta secuencia no sustituye ninguna lista de chequeo certificada. Es un orden mental para estudiar:"
      },
      {
        "kind": "list",
        "items": [
          "**Capacidad**: el avión sigue siendo RVSM capable, con lo que traiga diferido.",
          "**Sistemas**: los tres requeridos, operando normalmente.",
          "**Altímetros**: 1013,25 hPa puesto, y las primarias coincidiendo.",
          "**Mantenimiento del nivel**: el sistema automático operativo y listo para acoplarse.",
          "**Reporte de altitud**: transpondedor reportando, alimentado por la fuente que gobierna el avión.",
          "**Meteorología**: turbulencia u onda de montaña previstas en el tramo.",
          "**Autorización**: el nivel autorizado, colacionado y verificado por los dos pilotos."
        ],
        "ordered": true
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "p",
        "text": "Los siete puntos anteriores, con especial cuidado en los tres primeros, que son los que la norma exige de forma explícita."
      },
      {
        "kind": "titulo",
        "text": "¿Qué pasa si falla?"
      },
      {
        "kind": "p",
        "text": "Antes de entrar, la respuesta es sencilla y no admite matices: se pide una autorización que evite el espacio RVSM. La diferencia con lo que ocurre dentro es importante y se pregunta en entrevista: **antes se evita entrar; dentro se comunica y se coordina la salida**."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Si algo falla antes de entrar, se solicita nueva autorización para no entrar. No se usa *unable RVSM due equipment*, que es la fraseología para después de la entrada."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Entrar igual «porque ya casi estamos en nivel» y resolverlo arriba. La norma pide lo contrario: si falla antes, no se entra."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-11 · Figura · 16:9 · 1600×900",
        "descripcion": "Perfil de ascenso de izquierda a derecha, con una aeronave subiendo hacia el crucero. Una línea horizontal de trazo grueso cruzando el perfil, rotulada «FL 290 · PUERTA DE ENTRADA RVSM». Justo antes de esa línea, un recuadro vertical con la secuencia de verificación numerada del 1 al 7, en texto corto. Al pie del recuadro, en tipografía menor y en cursiva: «Resumen educativo: seguir siempre el SOP, el FCOM y el QRH del operador». A la derecha de la línea, en el espacio RVSM, la aeronave ya nivelada.",
        "pie": "Fijar que la capacidad se confirma ANTES de cruzar la puerta, y que lo que ocurre después ya se gestiona con otras reglas.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Si el equipo requerido falla antes de entrar, se solicita autorización para evitar el espacio RVSM.",
          "Deben operar normalmente: dos primarios de altitud, un control automático y una alerta de altitud.",
          "El requisito de transpondedor y TCAS depende del área.",
          "Antes se evita entrar; dentro se comunica y se coordina la salida."
        ]
      }
    ]
  },
  {
    "n": 16,
    "title": "Operar dentro de RVSM",
    "kicker": "R16",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Lo que la tripulación hace mientras está establecida en el espacio. La FAA lo recoge en diez puntos que conviene conocer completos, porque juntos desmontan la idea de que RVSM es «acoplar y olvidarse»."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "Volar el nivel autorizado"
      },
      {
        "kind": "p",
        "text": "En crucero nivelado es esencial que la aeronave vuele el nivel autorizado. Eso exige particular cuidado en que las autorizaciones del ATC se entiendan por completo y se cumplan. **Salvo en contingencia o emergencia, la aeronave no debe apartarse intencionalmente del nivel autorizado sin autorización positiva del ATC.**"
      },
      {
        "kind": "sub",
        "text": "Poner 1013,25 sin demora"
      },
      {
        "kind": "p",
        "text": "Énfasis en ajustar la subescala de todos los altímetros, primarios y de reserva, a 29,92 inHg / 1013,25 hPa al subir por la altitud de transición, y volver a comprobar el ajuste al llegar al primer nivel autorizado."
      },
      {
        "kind": "sub",
        "text": "Nivelar sin pasarse"
      },
      {
        "kind": "p",
        "text": "En transiciones autorizadas entre niveles, no sobrepasar ni quedarse corto más de 150 ft, y usar la función de captura de altitud del sistema automático si está instalada."
      },
      {
        "kind": "sub",
        "text": "El automático, acoplado"
      },
      {
        "kind": "p",
        "text": "Operativo y acoplado en crucero nivelado, salvo retrimado o turbulencia. La altitud se sigue por uno de los dos primarios."
      },
      {
        "kind": "sub",
        "text": "La alerta, operativa"
      },
      {
        "kind": "p",
        "text": "Debe estarlo."
      },
      {
        "kind": "sub",
        "text": "Los altímetros, comparados"
      },
      {
        "kind": "p",
        "text": "Primarias dentro de 200 ft en crucero, chequeo con la de reserva cada hora aproximadamente, y anotar la diferencia."
      },
      {
        "kind": "sub",
        "text": "El reporte, de la fuente correcta"
      },
      {
        "kind": "p",
        "text": "El sistema que gobierna el avión alimenta el transpondedor."
      },
      {
        "kind": "sub",
        "text": "Si el ATC avisa de una desviación"
      },
      {
        "kind": "p",
        "text": "Si el ATC notifica una desviación de altitud asignada (AAD) **igual o superior a 300 ft (90 m)**, el piloto debe actuar para **regresar al nivel autorizado tan rápido como sea posible**."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "En crucero estable esto es casi todo pasivo: el avión se queda donde está y el barrido de instrumentos basta. Se vuelve activo en tres momentos: al nivelar, al cambiar de nivel y cuando el ATC llama por la altitud."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "p",
        "text": "De forma continua: nivel autorizado contra altitud real, estado del automático, coincidencia de los altímetros. Y periódicamente, el chequeo con el altímetro de reserva."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«RVSM es acoplar el automático y olvidarse de la altitud.» La propia norma pide lo contrario: aun con el automático acoplado, la adherencia al nivel se hace por referencia a uno de los primarios."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "No apartarse del nivel autorizado sin autorización positiva del ATC, salvo contingencia o emergencia.",
          "1013,25 hPa sin demora en la transición, y recomprobar al nivelar.",
          "Nivelaciones dentro de 150 ft; automático acoplado; alerta operativa.",
          "Si el ATC reporta AAD de 300 ft o más: volver al nivel autorizado lo antes posible."
        ]
      }
    ]
  },
  {
    "n": 17,
    "title": "Desviación de nivel y AAD",
    "kicker": "R17",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Una desviación de nivel es apartarse del nivel autorizado. En RVSM se mide con una magnitud concreta: la **desviación de altitud asignada (AAD)**, que es la diferencia entre la altitud que transmite el transpondedor en modo C y la altitud o nivel asignado."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Conviene separar tres magnitudes que se confunden y que en entrevista se preguntan juntas:"
      },
      {
        "kind": "table",
        "head": [
          "Magnitud",
          "Qué compara",
          "Quién la ve"
        ],
        "rows": [
          [
            "**AAD** · desviación de altitud asignada",
            "Lo que el transpondedor transmite contra el nivel asignado",
            "El ATC, en su pantalla"
          ],
          [
            "**ASE** · error del sistema altimétrico",
            "La altitud mostrada a la tripulación (con 1013,25) contra la presión real",
            "Nadie a bordo, en tiempo real"
          ],
          [
            "**TVE** · error vertical total",
            "La altitud de presión que el avión vuela de verdad contra la asignada",
            "El sistema de monitorización"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "La relación es sencilla de decir: el TVE es lo que de verdad separa al avión de su nivel. La AAD es lo que se ve desde tierra. El ASE es la parte del error que ningún instrumento de la cabina delata, porque está en la medición misma."
      },
      {
        "kind": "sub",
        "text": "Los umbrales que se reportan e investigan"
      },
      {
        "kind": "p",
        "text": "La FAA fija los errores de mantenimiento de altitud que deben reportarse e investigarse:"
      },
      {
        "kind": "list",
        "items": [
          "**TVE igual o mayor que ±300 ft** (±90 m).",
          "**ASE igual o mayor que ±245 ft** (±75 m).",
          "**AAD igual o mayor que ±300 ft** (±90 m)."
        ]
      },
      {
        "kind": "p",
        "text": "Y el plazo: el operador debe reportar el evento a la autoridad **dentro de las 72 horas**, con un análisis inicial de los factores causales y las medidas para evitar que se repita."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Para la tripulación esto se traduce en dos cosas. La primera, que 300 ft es la cifra que hay que tener en la cabeza: es cuando el ATC llama y es cuando el evento se reporta. La segunda, que la incidencia de estos errores es muy pequeña y que cada uno se investiga; no son rutina."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "p",
        "text": "Que la altitud real coincide con la autorizada, de forma continua. Y si hay desviación: corregir primero, entender después."
      },
      {
        "kind": "titulo",
        "text": "¿Qué pasa si falla?"
      },
      {
        "kind": "p",
        "text": "Una desviación de 300 ft o más entra en el terreno de lo reportable. La FAA advierte además de algo que conviene saber para una entrevista: un operador que comete errores de mantenimiento de altitud puede llegar a perder la autoridad para operaciones RVSM."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Si el ATC llama, se corrige y se responde. Si la tripulación detecta la desviación antes, se corrige y se informa."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Usar «altitude deviation», «level bust» y «large height deviation» como sinónimos. Se parecen y no son lo mismo: lo aclara el capítulo 19."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-12 · Figura · 16:9 · 1600×900",
        "descripcion": "Esquema de una sola aeronave en crucero con tres líneas horizontales de referencia, separadas verticalmente y rotuladas con claridad. Línea 1, continua y gruesa: «NIVEL ASIGNADO · FL 350». Línea 2, punteada: «ALTITUD QUE EL AVIÓN VUELA DE VERDAD». Línea 3, de trazo y punto: «ALTITUD QUE EL TRANSPONDEDOR TRANSMITE». Tres acotaciones verticales entre las líneas, cada una con su sigla y su significado en una palabra: entre 1 y 3, «AAD · lo que ve el ATC»; entre 1 y 2, «TVE · la separación real que se pierde»; entre 2 y 3, «ASE · el error de medición, invisible en cabina».",
        "pie": "Que el piloto pueda dibujar de memoria la diferencia entre AAD, TVE y ASE, que es una de las preguntas de entrevista que más separa a los candidatos.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "AAD: lo transmitido contra lo asignado. Es lo que ve el ATC.",
          "TVE: lo volado de verdad contra lo asignado. Es la separación que realmente se pierde.",
          "ASE: el error de la medición. No se ve en cabina.",
          "Se reportan e investigan: TVE o AAD de ±300 ft o más, y ASE de ±245 ft o más, dentro de 72 horas."
        ]
      }
    ]
  },
  {
    "n": 18,
    "title": "Large height deviation",
    "kicker": "R18",
    "minutes": 5,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Una desviación vertical grande respecto del nivel autorizado, de las que el sistema de vigilancia de RVSM registra y estudia. Es conocimiento avanzado y aparece en entrevistas de aerolínea."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "Por qué se vigilan"
      },
      {
        "kind": "p",
        "text": "RVSM funciona porque el riesgo de colisión vertical se mantiene por debajo de un objetivo de seguridad. Ese objetivo no se comprueba una vez: se vigila de forma continua, contando y analizando las desviaciones grandes que ocurren de verdad en el espacio aéreo."
      },
      {
        "kind": "sub",
        "text": "De dónde salen"
      },
      {
        "kind": "p",
        "text": "Las causas que se repiten, y ninguna es exótica:"
      },
      {
        "kind": "list",
        "items": [
          "**Error de coordinación entre dependencias ATC.**",
          "**Desviación del piloto**: nivel mal entendido, mal seleccionado o no vigilado.",
          "**Turbulencia**, que impide mantener el nivel.",
          "**Problema de equipo**, incluida una falla altimétrica.",
          "**Interpretación incorrecta de la autorización**, que es la causa con más historia detrás."
        ]
      },
      {
        "kind": "sub",
        "text": "Quién las sigue"
      },
      {
        "kind": "p",
        "text": "Cada región tiene su agencia de monitorización. En Sudamérica y el Caribe es **CARSAMMA**, y el RAC colombiano la nombra expresamente al tratar RVSM (RAC 211, numeral 211.530)."
      },
      {
        "kind": "quote",
        "text": "**Verificar antes de dar cifras regionales.** El umbral numérico exacto que cada agencia regional usa para clasificar una desviación como *large height deviation*, y el procedimiento de reporte asociado, hay que tomarlos del documento regional vigente y del AIP del Estado. Este módulo no los inventa. Lo que sí está verificado, y es de la FAA, son los umbrales de reporte e investigación del capítulo 17: TVE o AAD de ±300 ft y ASE de ±245 ft."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Al piloto no le toca el trámite entre agencias. Le toca entender que **lo que pasa en su cabina se cuenta**: una desviación grande no se queda en el avión, entra en una estadística que sostiene (o retira) la aprobación RVSM de su operador."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "p",
        "text": "Nada específico aquí. La contribución de la tripulación a este capítulo es no generar desviaciones y reportar las que ocurran."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Pensar que una desviación grande sin consecuencias (sin tráfico cerca, sin llamada del ATC) es un no-evento. Se cuenta igual, y precisamente por eso el sistema puede seguir siendo seguro."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-13 · Figura · 16:9 · 1600×900",
        "descripcion": "Dos aeronaves en crucero, vista lateral, en niveles RVSM adyacentes. La superior, estable, rotulada «FL 360 · nivel autorizado y mantenido». La inferior, rotulada «FL 350 · nivel autorizado», dibujada por encima de su línea de nivel y ascendiendo. Tres elementos acotados con claridad: una línea punteada horizontal en FL 350 rotulada «NIVEL AUTORIZADO»; la posición real del avión rotulada «NIVEL REAL»; y una acotación vertical entre ambas rotulada «DESVIACIÓN VERTICAL». A la derecha, la separación que queda entre los dos aviones, acotada y rotulada «margen real restante», visiblemente menor que los 1.000 ft nominales.",
        "pie": "Mostrar que una desviación vertical no es un error abstracto: se come el margen que separa a dos aviones reales.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Una desviación grande de altitud es la que el sistema de vigilancia RVSM registra y estudia.",
          "Causas típicas: coordinación ATC, desviación del piloto, turbulencia, equipo o mala interpretación de la autorización.",
          "En Sudamérica y el Caribe, la agencia de monitorización es CARSAMMA, nombrada en el RAC 211.",
          "Los umbrales regionales exactos se consultan en la documentación vigente; los de la FAA son ±300 ft de TVE o AAD."
        ]
      }
    ]
  },
  {
    "n": 19,
    "title": "Level bust: tres términos que no son sinónimos",
    "kicker": "R19",
    "minutes": 5,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Tres términos que se usan como si fueran lo mismo y no lo son. Distinguirlos es una pregunta de entrevista frecuente."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "table",
        "head": [
          "Término",
          "Qué es",
          "Dónde vive"
        ],
        "rows": [
          [
            "**Altitude deviation**",
            "Apartarse del nivel autorizado, en cualquier magnitud",
            "Descripción general de lo que ocurre"
          ],
          [
            "**Level bust**",
            "Pasarse del nivel autorizado, normalmente por error humano en la cadena de la autorización",
            "Lenguaje operacional y de seguridad"
          ],
          [
            "**Large height deviation**",
            "Una desviación vertical grande, que el sistema de vigilancia RVSM registra y estudia",
            "Monitorización del sistema"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "Dicho corto: toda desviación es una desviación; un level bust es una desviación **causada por un error en la cadena autorización–selección–ejecución**; una desviación grande es la que además **entra en la estadística** que sostiene el sistema."
      },
      {
        "kind": "sub",
        "text": "Dónde se rompe la cadena"
      },
      {
        "kind": "p",
        "text": "Un level bust casi nunca nace en el aire: nace en la comunicación."
      },
      {
        "kind": "list",
        "items": [
          "La autorización se oye mal.",
          "La colación se hace de memoria y no de lo que se oyó.",
          "El nivel se selecciona mal en el panel.",
          "Nadie verifica lo seleccionado contra lo autorizado.",
          "Se pone el nivel correcto y luego se cambia sin que el otro piloto lo sepa."
        ]
      },
      {
        "kind": "sub",
        "text": "Las defensas"
      },
      {
        "kind": "list",
        "items": [
          "**Colación completa** de la autorización de nivel.",
          "**Verificación cruzada** del nivel seleccionado en el panel contra lo autorizado.",
          "**Llamadas de altitud** al aproximarse al nivel.",
          "**Vigilancia** de la captura y del nivel una vez establecido.",
          "**CRM**: que el otro piloto pueda decirlo y lo diga."
        ]
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "El momento de más riesgo no es el crucero: es el cambio de nivel, y sobre todo cuando llega en una frecuencia cargada, durante otra tarea, o justo cuando se está hablando con la cabina de pasajeros."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Decir en una entrevista que un level bust es «lo mismo que una desviación de altitud, pero más grande». La diferencia no es de tamaño: es de causa."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Altitude deviation: apartarse del nivel autorizado, en general.",
          "Level bust: desviación por error en la cadena autorización–selección–ejecución.",
          "Large height deviation: desviación grande que el sistema registra y estudia.",
          "Las defensas son de comunicación, no de pilotaje."
        ]
      }
    ]
  },
  {
    "n": 20,
    "title": "CRM: la cadena que evita el level bust",
    "kicker": "R20",
    "minutes": 5,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Cómo se reparten el piloto que vuela (PF) y el que monitoriza (PM) las tareas que sostienen el nivel. Es el capítulo que convierte RVSM en algo que se hace entre dos."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "La cadena, en orden, y con un responsable en cada eslabón:"
      },
      {
        "kind": "list",
        "items": [
          "**El ATC emite la autorización.** Los dos escuchan.",
          "**El PM colaciona**, y colaciona lo que oyó, no lo que esperaba oír.",
          "**Se selecciona la altitud** en el panel de control de modos.",
          "**Se verifica de forma cruzada**: el otro piloto mira el panel y confirma contra la autorización.",
          "**Se ejecuta** el ascenso o descenso.",
          "**Se nivela**, preferiblemente con la captura automática, dentro de 150 ft.",
          "**Se vigila** que el nivel se mantiene."
        ],
        "ordered": true
      },
      {
        "kind": "p",
        "text": "El eslabón que más se salta es el cuarto. Es el único que no produce ningún efecto visible si se hace bien, y por eso es el primero que desaparece cuando hay prisa."
      },
      {
        "kind": "sub",
        "text": "Lo que cada uno aporta"
      },
      {
        "kind": "list",
        "items": [
          "**PF**: vuela, ejecuta y confirma lo seleccionado.",
          "**PM**: escucha, colacione, selecciona, verifica y vigila, y es quien tiene libertad para decir «eso no es lo que nos dieron»."
        ]
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "La diferencia entre una tripulación que evita el level bust y una que lo comete casi nunca está en la habilidad: está en si la verificación cruzada se hizo o se dio por hecha."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Creer que colacionar equivale a verificar. Colacionar es repetir al ATC; verificar es comprobar que el panel dice lo mismo que la autorización. Son dos actos distintos y se pueden hacer mal por separado."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-14 · Figura · 16:9 · 1600×900",
        "descripcion": "Diagrama de flujo vertical, de arriba hacia abajo, con siete bloques conectados por flechas y una etiqueta de responsable a la derecha de cada uno. Bloque 1: «AUTORIZACIÓN ATC»: los dos escuchan. Bloque 2: «COLACIÓN»: PM. Bloque 3: «SELECCIÓN DE ALTITUD»: PM. Bloque 4, destacado con borde más grueso y color: «VERIFICACIÓN CRUZADA»: PF y PM, con una nota al lado: «el eslabón que más se salta». Bloque 5: «EJECUCIÓN»: PF. Bloque 6: «NIVELACIÓN · dentro de 150 ft»: PF. Bloque 7: «VIGILANCIA DEL NIVEL»: los dos.",
        "pie": "Mostrar que evitar un level bust es una secuencia con responsables, no una cuestión de atención individual, y señalar visualmente cuál es el eslabón débil.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "La cadena es: autorización, colación, selección, verificación cruzada, ejecución, nivelación y vigilancia.",
          "El eslabón que más se salta es la verificación cruzada.",
          "Colacionar y verificar son dos actos distintos.",
          "El PM es quien tiene que poder decir «eso no es lo que nos dieron»."
        ]
      }
    ]
  },
  {
    "n": 21,
    "title": "Mil pies no es mucho",
    "kicker": "R21",
    "minutes": 4,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Un capítulo corto con un solo objetivo: que el piloto tenga conciencia física de lo que significan 1.000 ft cuando el otro avión está justo ahí."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Con 2.000 ft de separación, una desviación de 300 ft se come el 15 % del margen. Con 1.000 ft, se come el 30 %. Y si los dos aviones se desvían el uno hacia el otro, el margen restante es de 400 ft."
      },
      {
        "kind": "p",
        "text": "Cuatrocientos pies, entre dos reactores que se cruzan a velocidades de crucero, es muy poco."
      },
      {
        "kind": "sub",
        "text": "Por eso las cifras del módulo son las que son"
      },
      {
        "kind": "p",
        "text": "Ahora se entiende de dónde salen los números que han ido apareciendo:"
      },
      {
        "kind": "list",
        "items": [
          "**±65 ft**: lo que el sistema automático mantiene en condiciones normales. Menos del 7 % del margen.",
          "**150 ft**: el sobrepaso máximo admitido al nivelar. El 15 %.",
          "**200 ft**: el límite de discrepancia entre primarias en crucero. El 20 %.",
          "**300 ft**: cuando el ATC llama y cuando el evento se reporta. El 30 %."
        ]
      },
      {
        "kind": "p",
        "text": "La escala no es arbitraria. Cada cifra es una fracción del único margen que hay."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Esto es lo que explica por qué una llamada del ATC por 300 ft no es una formalidad, y por qué la norma pide volver al nivel «tan rápido como sea posible» y no «cuando convenga»."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Razonar en porcentajes de altitud en vez de en fracciones del margen. Trescientos pies sobre FL 350 es menos del 1 % de la altitud, y suena a nada. Pero es el 30 % de lo que te separa del tráfico de arriba."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-15 · Figura · 16:9 · 1600×900",
        "descripcion": "Dos aeronaves enfrentadas verticalmente, en vista lateral y a escala. Aeronave A en FL 350, aeronave B en FL 360, con la separación nominal acotada entre ambas: «1.000 ft». A la derecha, la misma escena repetida con la aeronave A desplazada 300 ft hacia arriba: la acotación entre las dos ahora marca «700 ft», y la porción consumida aparece sombreada en rojo apagado con la etiqueta «30 % del margen». Debajo, una tercera escena con las dos desviándose una hacia la otra 300 ft cada una y la acotación marcando «400 ft».",
        "pie": "Dar conciencia visual e inmediata de que una desviación que parece pequeña respecto a la altitud es enorme respecto al margen.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Una desviación de 300 ft consume el 30 % del margen de 1.000 ft.",
          "Si los dos aviones se desvían uno hacia el otro, quedan 400 ft.",
          "Las cifras del módulo (65, 150, 200, 300 ft) son fracciones de ese único margen.",
          "No se razona en porcentaje de altitud: se razona en porcentaje de separación."
        ]
      }
    ]
  },
  {
    "n": 22,
    "title": "Turbulencia y onda de montaña",
    "kicker": "R22",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Las dos condiciones meteorológicas que pueden impedir mantener el nivel. En RVSM tienen tratamiento propio porque afectan directamente lo único que el sistema no puede ceder: el *height keeping*."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "La cifra que activa el procedimiento"
      },
      {
        "kind": "p",
        "text": "La FAA fija un disparador concreto: turbulencia severa o actividad de onda de montaña que induzca **desviaciones de altitud de aproximadamente 200 ft o más**. A partir de ahí, la secuencia es:"
      },
      {
        "kind": "list",
        "items": [
          "Contactar al ATC y declarar **«Unable RVSM due [causa]»**, por ejemplo turbulencia u onda de montaña.",
          "Si el controlador no lo ofrece, **solicitar vector libre de tráfico en los niveles adyacentes**.",
          "Si se desea, solicitar cambio de nivel o desvío de ruta.",
          "**Reportar la localización y la magnitud** de la turbulencia o la onda al ATC."
        ]
      },
      {
        "kind": "p",
        "text": "Por su parte, el controlador vectoriza para evitar que el eco se funda con tráfico de niveles adyacentes cuando el tráfico lo permite, avisa del tráfico en conflicto, emite cambio de nivel o desvío si puede, y difunde el reporte a otras aeronaves."
      },
      {
        "kind": "sub",
        "text": "Onda de montaña, sin llegar a esa cifra"
      },
      {
        "kind": "p",
        "text": "La FAA aclara que un encuentro con onda de montaña **no necesariamente produce desviaciones del orden de 200 ft**. Para los encuentros menos significativos, la acción es más simple: contactar al ATC y reportar que se está experimentando onda de montaña, solicitar cambio de nivel o desvío si se desea, y reportar localización y magnitud."
      },
      {
        "kind": "sub",
        "text": "Por qué la onda de montaña merece capítulo"
      },
      {
        "kind": "p",
        "text": "Es un flujo ondulatorio que se forma cuando el viento cruza una cordillera con determinada estabilidad y perfil. Para el piloto importan tres cosas y solo tres:"
      },
      {
        "kind": "list",
        "items": [
          "**Reconocerla**: variaciones verticales persistentes, cambios de viento, a veces turbulencia asociada, en zonas de relieve y con viento perpendicular a la cordillera.",
          "**Su efecto**: puede producir variaciones verticales importantes que comprometen el mantenimiento del nivel aunque el avión esté sano y el automático acoplado.",
          "**Qué hacer**: comunicar, pedir lo que haga falta y reportar."
        ]
      },
      {
        "kind": "p",
        "text": "En Colombia esto no es teórico: la ruta entre la costa y el interior y los cruces de las tres cordilleras son terreno propicio, y el nivel de crucero de un vuelo doméstico está justo en la franja donde la onda se nota."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "La diferencia entre un piloto entrenado y uno que no lo está se ve aquí. El no entrenado pelea con el nivel en silencio. El entrenado dice *unable RVSM due turbulence*, pide vector y deja de ser una sorpresa para el ATC y para los aviones de arriba y abajo."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "p",
        "text": "La magnitud de las desviaciones. Los 200 ft son la referencia para decidir si esto es «turbulencia» o es una situación que hay que comunicar como incapacidad temporal."
      },
      {
        "kind": "titulo",
        "text": "¿Qué pasa si falla?"
      },
      {
        "kind": "p",
        "text": "Si no se comunica, el ATC sigue separando 1.000 ft a un avión que no puede garantizarlos."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "**PILOTO:** «Unable RVSM due turbulence» (o *due mountain wave*). **SIGNIFICADO:** la aeronave no puede garantizar el mantenimiento del nivel por causa meteorológica. **CUÁNDO:** cuando la turbulencia severa o la onda de montaña induzcan desviaciones de aproximadamente 200 ft o más."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Pensar que *unable RVSM* solo se usa por falla de equipo. La propia fraseología tiene la variante meteorológica, y la tabla de contingencias la trata aparte."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-16 · Figura · 16:9 · 1600×900",
        "descripcion": "Perfil de una cordillera vista de costado, con el viento entrando desde la izquierda representado por líneas de corriente que se ondulan al superar la cresta y siguen ondulando corriente abajo, con amplitud decreciente. Una aeronave en crucero dentro de la zona ondulada, con dos siluetas fantasma por encima y por debajo de su posición nominal unidas por una acotación vertical rotulada «desplazamiento vertical inducido». Una línea horizontal punteada marcando el nivel autorizado. Etiquetas cortas: «viento perpendicular a la cordillera», «flujo ondulatorio corriente abajo», «el nivel se mantiene con dificultad aunque el avión esté sano».",
        "pie": "Que el piloto vea que la onda de montaña puede mover el avión verticalmente sin que nada haya fallado a bordo, y entienda por qué eso obliga a comunicar.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "El disparador son desviaciones de aproximadamente 200 ft o más por turbulencia severa u onda de montaña.",
          "Se declara «Unable RVSM due [causa]» y se solicita vector libre de tráfico adyacente si no lo ofrecen.",
          "Se reporta localización y magnitud al ATC.",
          "Un encuentro con onda de montaña puede no llegar a 200 ft: igual se reporta.",
          "En Colombia, las cordilleras hacen esto muy real."
        ]
      }
    ]
  },
  {
    "n": 23,
    "title": "Estela turbulenta en RVSM",
    "kicker": "R23",
    "minutes": 4,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "El encuentro con la estela de otro avión dentro del espacio RVSM. Tiene tratamiento propio porque con 1.000 ft de separación vertical el tráfico pesado queda más cerca que antes."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "La separación reglamentaria no garantiza ausencia de estela. Un avión pesado 1.000 ft por encima y ligeramente adelante puede dejar una estela que descienda hasta el nivel de abajo."
      },
      {
        "kind": "p",
        "text": "Qué mira el piloto:"
      },
      {
        "kind": "list",
        "items": [
          "**Tráfico pesado próximo**, sobre todo por encima y por delante.",
          "**La dirección del viento**, que desplaza la estela lateralmente.",
          "**La posición relativa** respecto a ese tráfico."
        ]
      },
      {
        "kind": "p",
        "text": "Y qué hace, según la tabla de contingencias de la FAA:"
      },
      {
        "kind": "list",
        "items": [
          "Contactar al ATC y **solicitar vector, cambio de nivel o, si la aeronave es capaz, un desplazamiento lateral** (*lateral offset*)."
        ]
      },
      {
        "kind": "p",
        "text": "Por su parte, el controlador proporciona **2.000 ft de separación vertical** o la separación horizontal apropiada, y saca a la aeronave del espacio RVSM salvo que la situación operacional indique otra cosa."
      },
      {
        "kind": "p",
        "text": "Esa respuesta (volver a 2.000 ft) es reveladora: cuando el sistema no puede garantizar las condiciones de RVSM, lo que hace es devolver el margen que RVSM había reducido."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Se resuelve casi siempre con un desplazamiento lateral corto o con un cambio de nivel. Lo importante es pedirlo, en vez de aguantarlo."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Solicitud de vector, cambio de nivel o desplazamiento lateral, indicando el motivo."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Aguantar la estela sin comunicar, porque «la separación es la reglamentaria». Lo es, y aun así el ATC tiene previstas respuestas para este caso."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "La separación reglamentaria no impide encontrar estela.",
          "Se mira: tráfico pesado próximo, viento y posición relativa.",
          "Se solicita vector, cambio de nivel o desplazamiento lateral si la aeronave es capaz.",
          "El controlador puede dar 2.000 ft o separación horizontal, y sacar la aeronave del espacio RVSM."
        ]
      }
    ]
  },
  {
    "n": 24,
    "title": "Perder la capacidad RVSM",
    "kicker": "R24",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "El momento en que la aeronave deja de cumplir los requisitos para operar con separación de 1.000 ft. Es el capítulo más importante del módulo."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "Qué la produce"
      },
      {
        "kind": "p",
        "text": "La FAA agrupa bajo la misma acción tres fallas:"
      },
      {
        "kind": "list",
        "items": [
          "**Todos los altímetros primarios.**",
          "**El sistema automático de control de altitud.**",
          "**La alerta de altitud.**"
        ]
      },
      {
        "kind": "p",
        "text": "Cualquiera de las tres se comunica como **«Unable RVSM due equipment»**."
      },
      {
        "kind": "p",
        "text": "Dos casos tienen tratamiento distinto y por eso se separan:"
      },
      {
        "kind": "list",
        "items": [
          "**Una sola primaria operativa**: se contrasta con la de reserva y se notifica al ATC la operación con una sola primaria. Si no se puede confirmar su precisión, se pasa al grupo anterior.",
          "**Falla de transpondedor**: se solicita al ATC autorización para continuar en el nivel autorizado."
        ]
      },
      {
        "kind": "p",
        "text": "Y la causa meteorológica, del capítulo 22: turbulencia severa u onda de montaña que induzcan desviaciones de aproximadamente 200 ft o más, que se declara como *unable RVSM due* la causa correspondiente."
      },
      {
        "kind": "sub",
        "text": "Lo que hay que resistir"
      },
      {
        "kind": "p",
        "text": "La tentación de deducir. «Falló X, luego no soy RVSM» es tan incorrecto como «falló X pero sigo siendo RVSM». La regla es consultar: **QRH, MEL y los requisitos aplicables**. Lo que sí está escrito, y es de memoria, son los tres casos del grupo *unable RVSM due equipment*."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Lo que cambia inmediatamente es que el ATC dejará de separarte 1.000 ft, y eso suele significar otro nivel. Lo que cambia después es todo lo demás: consumo, predicción al destino, a veces ruta. El capítulo 30 lo desarrolla."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "p",
        "text": "Qué falló exactamente, qué dice el QRH, si la aeronave conserva o no la capacidad, y qué nivel queda disponible."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "«Unable RVSM due equipment», y solicitar salir del espacio RVSM salvo que la situación operacional indique otra cosa. El controlador proporciona 2.000 ft de separación vertical o separación horizontal apropiada."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«Si pierdo RVSM debo declarar MAYDAY.» No. Perder la capacidad RVSM no es, por sí misma, una emergencia: es una incapacidad de cumplir unos requisitos, que se comunica y se coordina. Puede haber una emergencia detrás (depende de qué falló), pero la pérdida de RVSM no la declara."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Tres fallas se comunican como *unable RVSM due equipment*: todos los primarios, el control automático de altitud y la alerta de altitud.",
          "Una sola primaria operativa y la falla de transpondedor tienen tratamiento propio.",
          "La turbulencia y la onda de montaña producen *unable RVSM due* la causa meteorológica.",
          "No se deduce en ninguna dirección: QRH, MEL y requisitos aplicables.",
          "Perder RVSM no es declarar emergencia."
        ]
      }
    ]
  },
  {
    "n": 25,
    "title": "Qué hace el piloto si la pierde en vuelo",
    "kicker": "R25",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "El flujo operacional completo, desde que algo falla hasta que la situación queda coordinada. Es la respuesta a la pregunta de entrevista más típica del módulo: *«You are cruising at FL370 in RVSM airspace and one of the required systems fails. What would you do?»*"
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "El orden es el de siempre: **aviar, navegar, comunicar**. Dentro de ese marco, la secuencia:"
      },
      {
        "kind": "sub",
        "text": "1. Controlar la aeronave"
      },
      {
        "kind": "p",
        "text": "Mantener el nivel autorizado **en la medida de lo posible** mientras se evalúa la situación. Es la primera acción que la FAA enumera para cualquier contingencia en la que no se pueda mantener el nivel o haya duda sobre la capacidad de mantenerlo."
      },
      {
        "kind": "sub",
        "text": "2. Vigilar el tráfico"
      },
      {
        "kind": "p",
        "text": "Buscar tráfico en conflicto **visualmente y con el TCAS**, si está instalado. Y encender las luces exteriores, en lo que las limitaciones del avión permitan, para hacerse ver."
      },
      {
        "kind": "sub",
        "text": "3. Identificar la falla"
      },
      {
        "kind": "p",
        "text": "Qué falló exactamente. No «algo del piloto automático»: qué."
      },
      {
        "kind": "sub",
        "text": "4. Aplicar el QRH y el SOP"
      },
      {
        "kind": "p",
        "text": "El procedimiento del avión manda. Aquí es donde se sabe si la falla tiene acciones de memoria, si hay reconfiguración posible y qué queda operativo."
      },
      {
        "kind": "sub",
        "text": "5. Determinar la capacidad RVSM"
      },
      {
        "kind": "p",
        "text": "Con el QRH y la MEL en la mano: ¿la aeronave sigue cumpliendo los requisitos? Esto es una conclusión, no una intuición."
      },
      {
        "kind": "sub",
        "text": "6. Si no la conserva, informar al ATC"
      },
      {
        "kind": "p",
        "text": "Notificar y **solicitar una nueva autorización tan pronto como la situación lo permita**. Si no hay autorización disponible o la naturaleza de la emergencia exige acción rápida, el piloto notifica al ATC su acción y el procedimiento de contingencia que está aplicando."
      },
      {
        "kind": "sub",
        "text": "7. Cumplir la autorización o el procedimiento de contingencia"
      },
      {
        "kind": "p",
        "text": "Y seguir vigilando la altitud."
      },
      {
        "kind": "sub",
        "text": "8. Avisar cuando deje de hacer falta"
      },
      {
        "kind": "p",
        "text": "Es responsabilidad de la tripulación **notificar al ATC cuando el procedimiento de contingencia ya no sea necesario**."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Los pasos 1 a 4 ocurren en la cabina y pueden tardar minutos. El 6 es el que cambia lo que hace el sistema: hasta que no se comunica, el ATC sigue separando 1.000 ft. Por eso la norma insiste en «tan pronto como la situación lo permita»: no inmediatamente a costa de volar el avión, pero tampoco cuando ya esté todo resuelto."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "**PILOTO:** «Unable RVSM due equipment». Y la solicitud de salir del espacio RVSM, salvo que la situación operacional indique otra cosa."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Comunicar primero y volar después. El orden es aviar, navegar, comunicar, y la propia tabla de contingencias empieza por mantener el nivel mientras se evalúa."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-17 · Figura · 16:9 · 1600×900",
        "descripcion": "Diagrama de flujo vertical de ocho bloques conectados por flechas descendentes, con la etiqueta AVIAR abarcando los dos primeros bloques, NAVEGAR el tercero y cuarto, y COMUNICAR del quinto en adelante, marcadas con llaves laterales. Bloque 1: «FALLA DE SISTEMA RVSM». Bloque 2: «CONTROLAR LA AERONAVE · mantener el nivel en lo posible · vigilar tráfico y encender luces». Bloque 3: «IDENTIFICAR LA FALLA». Bloque 4: «QRH Y SOP». Bloque 5, en forma de rombo de decisión: «¿CONSERVA CAPACIDAD RVSM?» con dos salidas. Salida «SÍ» a un bloque: «CONTINUAR · vigilar altitud». Salida «NO» a: «INFORMAR AL ATC · unable RVSM due equipment». De ahí: «SOLICITAR O ACEPTAR NUEVA AUTORIZACIÓN». Y por último: «AVISAR CUANDO YA NO HAGA FALTA».",
        "pie": "Dar una estructura mental completa y memorizable que no sustituye al QRH ni al SOP, pero que ordena la respuesta ante la pregunta clásica de entrevista.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Aviar, navegar, comunicar, en ese orden.",
          "Mantener el nivel en lo posible, vigilar tráfico visualmente y con TCAS, encender luces exteriores.",
          "Identificar la falla, aplicar QRH y SOP, y concluir si se conserva la capacidad.",
          "Informar al ATC tan pronto la situación lo permita y coordinar la nueva autorización.",
          "Avisar también cuando el procedimiento de contingencia deje de ser necesario."
        ]
      }
    ]
  },
  {
    "n": 26,
    "title": "La fraseología",
    "kicker": "R26",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Las frases normalizadas que se intercambian entre piloto y controlador sobre el estado RVSM. Hay que saberlas en inglés, tal cual, porque así se usan."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "El controlador pregunta el estado"
      },
      {
        "kind": "p",
        "text": "**ATC:** *«(call sign) Confirm RVSM approved.»* **SIGNIFICADO:** el controlador quiere saber si la aeronave está aprobada para RVSM. **CUÁNDO:** cuando necesita confirmarlo para aplicar separación."
      },
      {
        "kind": "sub",
        "text": "El piloto confirma"
      },
      {
        "kind": "p",
        "text": "**PILOTO:** *«Affirm RVSM.»* **SIGNIFICADO:** el vuelo está aprobado para RVSM."
      },
      {
        "kind": "sub",
        "text": "El piloto declara que no lo está"
      },
      {
        "kind": "p",
        "text": "**PILOTO:** *«Negative RVSM»*, seguido de información complementaria cuando corresponda, por ejemplo *«Certification flight»*. **CUÁNDO:** el piloto de una aeronave no RVSM lo reporta en cuatro momentos:"
      },
      {
        "kind": "list",
        "items": [
          "En la llamada inicial en **cualquier** frecuencia dentro del espacio RVSM.",
          "En **todas** las solicitudes de cambio de nivel a niveles dentro del espacio RVSM.",
          "En **todas** las colaciones de autorizaciones de nivel dentro del espacio RVSM.",
          "En la colación de autorizaciones de nivel que impliquen ascender o descender **a través** del espacio RVSM (FL 290–410)."
        ]
      },
      {
        "kind": "sub",
        "text": "El piloto pierde la capacidad por equipo"
      },
      {
        "kind": "p",
        "text": "**PILOTO:** *«Unable RVSM due equipment.»* **CUÁNDO:** tras entrar al espacio RVSM, cuando fallan todos los altímetros primarios, el sistema automático de control de altitud o la alerta de altitud. **NOTA IMPORTANTE:** la frase se usa tanto para la indicación inicial de la falla **como en el contacto inicial en todas las frecuencias** del espacio RVSM, hasta que el problema deje de existir o la aeronave salga del espacio."
      },
      {
        "kind": "sub",
        "text": "El piloto no puede mantener el nivel por meteorología"
      },
      {
        "kind": "p",
        "text": "**PILOTO:** *«Unable RVSM due (causa)»*, por ejemplo *turbulence* o *mountain wave*."
      },
      {
        "kind": "sub",
        "text": "El ATC niega la entrada"
      },
      {
        "kind": "p",
        "text": "**ATC:** *«Unable issue clearance into RVSM airspace, maintain FL (nivel).»*"
      },
      {
        "kind": "sub",
        "text": "El ATC pregunta si se puede reanudar"
      },
      {
        "kind": "p",
        "text": "**ATC:** *«Confirm able to resume RVSM.»* **CUÁNDO:** cuando quiere confirmar que la aeronave recuperó el estado aprobado o que el piloto está listo para reanudar."
      },
      {
        "kind": "sub",
        "text": "El piloto avisa que puede reanudar"
      },
      {
        "kind": "p",
        "text": "**PILOTO:** *«Ready to resume RVSM.»* **CUÁNDO:** tras una contingencia de sistema o meteorológica, cuando la aeronave puede volver a cumplir."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "La que más se usa en la práctica es *negative RVSM*, en aviones que no están aprobados, y hay que recordar que se repite en cuatro situaciones, no una sola vez. La segunda más usada es *unable RVSM due equipment*, y también se repite en cada frecuencia nueva."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Decir *unable RVSM* una vez y darlo por comunicado. La nota de la FAA es explícita: se repite en el contacto inicial de **todas** las frecuencias mientras dure el problema."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "*Confirm RVSM approved* / *Affirm RVSM*: el ATC pregunta, el piloto confirma.",
          "*Negative RVSM*: aeronave no aprobada. Se repite en cuatro situaciones.",
          "*Unable RVSM due equipment*: falla de primarios, control automático o alerta. Se repite en cada frecuencia.",
          "*Unable RVSM due turbulence / mountain wave*: causa meteorológica.",
          "*Confirm able to resume RVSM* / *Ready to resume RVSM*: la vuelta a la normalidad."
        ]
      }
    ]
  },
  {
    "n": 27,
    "title": "«Unable RVSM» y las aeronaves sin capacidad",
    "kicker": "R27",
    "minutes": 5,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Qué comunica realmente *unable RVSM*, qué puede hacer el ATC después, y qué ocurre con las aeronaves que sencillamente no tienen capacidad."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "Qué dice y qué no dice"
      },
      {
        "kind": "p",
        "text": "*Unable RVSM* dice: **esta aeronave no puede cumplir los requisitos RVSM aplicables**. No dice que haya una emergencia. Puede haberla, según qué falló, pero la frase no la declara."
      },
      {
        "kind": "sub",
        "text": "Qué puede hacer el ATC"
      },
      {
        "kind": "p",
        "text": "No hay una respuesta universal, y eso es parte de la respuesta correcta en entrevista. Según las circunstancias y el tráfico, el controlador puede:"
      },
      {
        "kind": "list",
        "items": [
          "Proporcionar **2.000 ft de separación vertical** o la separación horizontal apropiada.",
          "**Sacar la aeronave del espacio RVSM**, que es lo que hará salvo que la situación operacional indique otra cosa.",
          "**Asignar otro nivel.**",
          "**Emitir una autorización revisada** con otro procedimiento."
        ]
      },
      {
        "kind": "p",
        "text": "Presentar una sola de estas como «lo que hace el ATC» es un error: depende del tráfico y de la situación."
      },
      {
        "kind": "sub",
        "text": "Las aeronaves no RVSM"
      },
      {
        "kind": "p",
        "text": "Una aeronave u operador que no cumple los requisitos (incluida una aeronave sin equipo RVSM operativo) se denomina **no RVSM**. Para ellas:"
      },
      {
        "kind": "list",
        "items": [
          "El operador o el despachador **no declaran** el código de equipo RVSM en el plan de vuelo.",
          "El piloto **debe informar al controlador** de la falta de aprobación, con la fraseología del capítulo 26.",
          "Existen procedimientos de acomodación y **categorías específicas** de aeronaves no RVSM que pueden acomodarse, sujetas a autorización."
        ]
      },
      {
        "kind": "p",
        "text": "La regla de conducta para el piloto es directa: **no se solicita ni se acepta RVSM solo porque el avión llegue a esos niveles**, salvo que los procedimientos aplicables lo permitan."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Para una aerolínea, volar no RVSM es excepcional y suele significar niveles por debajo de FL 290, con el coste de combustible que eso implica. Por eso la pérdida de capacidad tiene consecuencias operacionales reales, que se ven en el capítulo 30."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«Si digo *unable RVSM* el ATC me va a sacar del espacio, siempre.» Es lo más probable, pero no es automático: la propia norma dice «salvo que la situación operacional indique otra cosa»."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "*Unable RVSM* comunica incapacidad de cumplir requisitos, no una emergencia.",
          "El ATC puede dar 2.000 ft, separación horizontal, otro nivel, sacarte del espacio o revisar la autorización.",
          "No RVSM: no se declara el código en el plan y se informa al controlador.",
          "No se pide ni se acepta RVSM solo porque el avión alcance el nivel."
        ]
      }
    ]
  },
  {
    "n": 28,
    "title": "TCAS y RVSM",
    "kicker": "R28",
    "minutes": 5,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "La relación entre el sistema anticolisión y la separación reducida. No es un capítulo de TCAS: es el punto exacto donde TCAS y RVSM se tocan."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "Por qué se tocan"
      },
      {
        "kind": "p",
        "text": "Con 1.000 ft de separación, el tráfico de los niveles adyacentes está el doble de cerca en vertical. Eso significa más contactos en pantalla y avisos de tráfico (TA) más frecuentes. Es normal y no indica que nada vaya mal."
      },
      {
        "kind": "sub",
        "text": "La regla que no admite matices"
      },
      {
        "kind": "p",
        "text": "Una autorización del ATC **no tiene prioridad** sobre una resolución (RA) que exija maniobra conforme a los procedimientos ACAS aplicables. Si el TCAS manda una maniobra, se ejecuta."
      },
      {
        "kind": "p",
        "text": "Esta es exactamente la excepción a la regla del capítulo 16: la aeronave no se aparta del nivel autorizado sin autorización positiva del ATC **salvo en contingencia o emergencia**. Una RA es una de esas situaciones."
      },
      {
        "kind": "sub",
        "text": "Después de la RA"
      },
      {
        "kind": "p",
        "text": "Se informa al ATC conforme a los procedimientos aplicables, y se vuelve al nivel autorizado cuando corresponda."
      },
      {
        "kind": "sub",
        "text": "Lo que el TCAS no es"
      },
      {
        "kind": "p",
        "text": "No es equipo requerido para RVSM por sí mismo. La FAA separa las dos cosas: los requisitos de dotación de TCAS vienen de la normativa de operaciones aplicable a cada tipo de explotador, y en el caso del Part 91 se exige que las aeronaves con TCAS II que vuelen en espacio RVSM incorporen la versión 7.0 o posterior. El requisito de TCAS en cada área RVSM hay que averiguarlo."
      },
      {
        "kind": "p",
        "text": "Y sobre todo: **el TCAS no sustituye la separación**. Es la última red, no el método."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Se traduce en no sorprenderse: más tráfico visible en el ND y más TA que en espacio no RVSM. Y en tener clarísimo que si llega una RA, se vuela la RA."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "p",
        "text": "Que el TCAS está operativo según lo exija la normativa aplicable al operador y al área."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Tras una RA, la que corresponda según los procedimientos ACAS aplicables."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«El TCAS reemplaza los requisitos RVSM» o «con TCAS operativo puedo entrar aunque me falte otro sistema». Ninguna de las dos. Son sistemas con funciones distintas: RVSM garantiza la separación; el TCAS actúa cuando esa garantía falló."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-18 · Figura · 16:9 · 1600×900",
        "descripcion": "Dos aeronaves en niveles RVSM adyacentes, vista lateral, separadas 1.000 ft y acotadas. A la derecha de la escena, un recuadro que representa la porción de un ND genérico con el símbolo del tráfico próximo y su etiqueta de altitud relativa, y debajo un PFD genérico con la banda de resolución del TCAS representada en la cinta de altitud. Dos rótulos cortos: junto a la acotación de 1.000 ft, «lo que RVSM garantiza»; junto a la banda de resolución, «lo que actúa cuando esa garantía falló». Una nota al pie, destacada: «Una RA se vuela, aunque contradiga la autorización del ATC».",
        "pie": "Separar visualmente las dos funciones y dejar grabado que la resolución del TCAS prevalece sobre la autorización.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Con 1.000 ft, el tráfico adyacente está más cerca: más contactos y más avisos, y eso es normal.",
          "Una RA se vuela: la autorización del ATC no tiene prioridad sobre ella.",
          "Es la excepción a «no apartarse del nivel sin autorización positiva».",
          "El TCAS no es la separación: es lo que actúa cuando la separación falló."
        ]
      }
    ]
  },
  {
    "n": 29,
    "title": "ASE, monitorización y postvuelo",
    "kicker": "R29",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Tres cosas que van juntas: el error que no se ve, el sistema que lo vigila, y lo que la tripulación deja escrito al aterrizar."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "El error del sistema altimétrico (ASE)"
      },
      {
        "kind": "p",
        "text": "Es la diferencia entre la altitud de presión que se muestra a la tripulación con 1013,25 hPa puesto y la altitud de presión real de la corriente libre."
      },
      {
        "kind": "p",
        "text": "Lo característico del ASE, y lo que hay que saber decir en entrevista: **no se ve en la indicación**. El instrumento muestra un valor con toda normalidad y ese valor está corrido. Es una componente del error vertical total, y el piloto no dispone de ningún indicador que se la señale en vuelo."
      },
      {
        "kind": "p",
        "text": "De ahí que el sistema se apoye en dos cosas: la **comparación entre fuentes** dentro del avión, y la **monitorización externa** de la flota."
      },
      {
        "kind": "sub",
        "text": "La monitorización de la performance altimétrica"
      },
      {
        "kind": "p",
        "text": "Existe un programa de vigilancia de la performance de mantenimiento de altitud, y los operadores deben participar en el que corresponda a su tipo de operación. Es un control de calidad que permite a la autoridad evaluar cómo se comportan de verdad las aeronaves y los operadores en servicio."
      },
      {
        "kind": "p",
        "text": "Al piloto le basta con saber cuatro cosas: **que existe, para qué sirve, que una aeronave puede requerir monitorización, y que forma parte del mantenimiento de la aprobación RVSM**. El trámite no es suyo."
      },
      {
        "kind": "sub",
        "text": "El postvuelo"
      },
      {
        "kind": "p",
        "text": "Aquí sí hay tarea concreta. Al anotar en el libro de mantenimiento una falla de sistemas de mantenimiento de altitud, el piloto debe dar **detalle suficiente** para que mantenimiento pueda diagnosticar y reparar: el defecto real y lo que la tripulación hizo para aislarlo. La FAA enumera qué anotar cuando corresponda:"
      },
      {
        "kind": "list",
        "items": [
          "Lectura del altímetro primario y del de reserva.",
          "Ajuste del selector de altitud.",
          "Ajuste de subescala del altímetro.",
          "Qué piloto automático gobernaba el avión, y las diferencias al seleccionar el sistema alterno.",
          "Diferencias en las lecturas de altímetro si se seleccionaron tomas estáticas alternas.",
          "Uso del selector de computador de datos aéreos en el procedimiento de diagnóstico.",
          "Qué transpondedor estaba dando la altitud al ATC, y las diferencias si se seleccionó manualmente otro transpondedor u otra fuente."
        ],
        "ordered": true
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Ese nivel de detalle es lo que distingue una anotación útil de una inútil. «Altímetro con problemas» no permite reparar nada; las siete líneas de arriba, sí."
      },
      {
        "kind": "p",
        "text": "Y hay un segundo camino, además del libro técnico: el reporte operacional y el de seguridad, según el SOP del operador, cuando hubo desviación significativa, discrepancia altimétrica, desviación inducida por turbulencia o un error de altitud reportado por el ATC."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "p",
        "text": "Que lo ocurrido queda escrito con datos, no con adjetivos."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Salir del avión sin anotar una discrepancia porque «se resolvió sola». Si hubo discrepancia altimétrica en vuelo, mantenimiento necesita los números."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "El ASE es la diferencia entre la altitud mostrada con 1013,25 y la real, y no se ve en cabina.",
          "Por eso el sistema se apoya en comparar fuentes a bordo y monitorizar las flotas desde fuera.",
          "El piloto solo necesita saber que la monitorización existe y para qué sirve.",
          "Al aterrizar: anotar con detalle, incluidas las lecturas, los ajustes y qué sistema gobernaba."
        ]
      }
    ]
  },
  {
    "n": 30,
    "title": "Lo que cuesta perder RVSM",
    "kicker": "R30",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Las consecuencias operacionales de quedarse sin capacidad RVSM. Es el capítulo que conecta este módulo con Performance y con Gestión del combustible."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Perder RVSM casi siempre significa **salir del espacio**, y salir del espacio significa volar por debajo de FL 290 o por encima de FL 410. Para un reactor de transporte en ruta, en la práctica significa bajar."
      },
      {
        "kind": "p",
        "text": "La cadena de consecuencias:"
      },
      {
        "kind": "sub",
        "text": "1. Un nivel menos eficiente"
      },
      {
        "kind": "p",
        "text": "Por debajo de FL 290 el consumo específico empeora. No es un matiz: es la diferencia entre llegar con margen y llegar sin él."
      },
      {
        "kind": "sub",
        "text": "2. Más combustible por hora"
      },
      {
        "kind": "p",
        "text": "Y por tanto una predicción al destino peor que la del plan operacional."
      },
      {
        "kind": "sub",
        "text": "3. Revisar la predicción"
      },
      {
        "kind": "p",
        "text": "Aquí se engancha con el módulo de combustible. Lo que había que comprobar allí sigue valiendo aquí: si la predicción al destino conserva el alterno más la reserva final. Si no, hay decisiones que tomar, y cuanto antes mejor."
      },
      {
        "kind": "sub",
        "text": "4. Posible cambio de ruta o de destino"
      },
      {
        "kind": "p",
        "text": "Si el nivel disponible no permite llegar con lo requerido, entra el alterno o una escala técnica."
      },
      {
        "kind": "sub",
        "text": "5. Coordinación"
      },
      {
        "kind": "p",
        "text": "Con el ATC, para el nivel; y con el despacho, para lo demás."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "El escenario típico: FL 370, falla el sistema automático de control de altitud, se declara *unable RVSM due equipment*, el ATC ofrece FL 280. El avión vuela, pero el vuelo ya no es el que se planificó, y la pregunta deja de ser técnica y pasa a ser de combustible."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "list",
        "items": [
          "Qué nivel queda disponible y si el avión llega con el peso actual.",
          "Cuánto cambia el consumo.",
          "Qué queda al llegar al destino, comparado con alterno más reserva final.",
          "Si hace falta replanificar, y con qué opciones."
        ]
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Primero la del capítulo 26. Después, la solicitud del nivel que convenga, y la coordinación con el despacho por el canal que use el operador."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Tratar la pérdida de RVSM como un asunto cerrado en cuanto el ATC asigna un nivel. Ahí empieza la segunda mitad del problema."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-19 · Figura · 16:9 · 1600×900",
        "descripcion": "Cadena horizontal de cinco eslabones conectados por flechas, cada uno con un icono y un rótulo corto. Eslabón 1: falla de sistema: «PÉRDIDA DE CAPACIDAD RVSM». Eslabón 2: perfil de vuelo bajando: «SALIDA DEL ESPACIO · normalmente por debajo de FL 290». Eslabón 3: indicador de consumo: «MAYOR CONSUMO POR HORA». Eslabón 4: cifra de combustible con flecha descendente: «PREDICCIÓN AL DESTINO REVISADA». Eslabón 5, en forma de rombo: «¿CONSERVA ALTERNO + RESERVA FINAL?» con dos salidas: «SÍ · continuar vigilando» y «NO · replanificar con el despacho».",
        "pie": "Mostrar que una falla técnica en crucero termina siendo una decisión de combustible, y enlazar este módulo con el de Gestión del combustible.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Perder RVSM normalmente obliga a salir del espacio, y para un reactor en ruta eso es bajar.",
          "Un nivel inferior consume más: la predicción al destino empeora.",
          "Hay que comprobar si se conserva alterno más reserva final.",
          "Puede haber cambio de ruta, alterno o escala técnica.",
          "La falla técnica termina siendo una decisión de combustible."
        ]
      }
    ]
  },
  {
    "n": 31,
    "title": "RVSM en Colombia",
    "kicker": "R31",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Lo que un piloto que vuela en Colombia debe saber de RVSM según la reglamentación colombiana, y en qué se diferencia de lo que ha leído hasta aquí."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "Lo que dice el RAC"
      },
      {
        "kind": "p",
        "text": "El **RAC 211**, que es el de gestión del tránsito aéreo, establece la separación de **1.000 ft (300 m) entre FL 290 y FL 410 inclusive**, con monitoreo de la agencia regional **CARSAMMA** (numeral 211.530)."
      },
      {
        "kind": "p",
        "text": "Dos cosas de ahí merecen subrayarse. La primera: el rango coincide con el estándar internacional, así que la respuesta de entrevista es la misma. La segunda: el RAC **nombra la agencia de monitorización**, lo que confirma que el seguimiento de la performance altimétrica no es una idea abstracta sino parte del sistema colombiano."
      },
      {
        "kind": "sub",
        "text": "El VFR y el espacio RVSM"
      },
      {
        "kind": "p",
        "text": "El **RAC 91** cierra la puerta al VFR: sin autorización no hay VFR sobre FL 200 (numeral 91.305), y **nunca sobre FL 290 en espacio de separación vertical reducida** (numeral 91.310). El espacio RVSM colombiano es IFR."
      },
      {
        "kind": "sub",
        "text": "La autorización del explotador"
      },
      {
        "kind": "p",
        "text": "El **RAC 119** incluye RVSM entre las aprobaciones específicas que aparecen en las especificaciones de operación del explotador, junto a mercancías peligrosas, baja visibilidad, EDTO, PBN AR y EFB (numeral 119.270(a)). Y añade la regla que cierra el círculo: la empresa no puede volar en un área que sus OpSpecs no autoricen (numeral 119.020(d))."
      },
      {
        "kind": "sub",
        "text": "Dónde mirar lo demás"
      },
      {
        "kind": "quote",
        "text": "**Verificar antes de citar.** Los procedimientos particulares de las FIR Bogotá y Barranquilla, los niveles por dirección de vuelo y los requisitos de aprobación detallados se publican en el **AIP Colombia vigente** y en las circulares de la Aerocivil, entre ellas la **circular GCEP-1.0-22-033** sobre requisitos y procedimientos para la aprobación de operaciones RVSM. Este módulo no reproduce sus cifras: se consultan en la versión vigente, porque cambian."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Para un piloto que vuela doméstico colombiano, RVSM es el pan de cada día: el crucero de casi cualquier etapa está dentro de FL 290–FL 410. Lo específicamente colombiano que hay que tener a mano es el numeral del RAC 211 y la existencia de CARSAMMA, porque son las dos cosas que una entrevista en una aerolínea local puede preguntar y que no vienen en la documentación de la FAA."
      },
      {
        "kind": "p",
        "text": "Y el relieve: tres cordilleras significan que el capítulo de onda de montaña no es teoría importada."
      },
      {
        "kind": "titulo",
        "text": "¿Qué verifica la tripulación?"
      },
      {
        "kind": "p",
        "text": "Que las OpSpecs del operador cubren el área, y el AIP y los NOTAM para lo que sea particular del día."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Responder una pregunta sobre Colombia con la referencia de la FAA. Los números coinciden, pero en una entrevista en una aerolínea colombiana citar el RAC 211, numeral 211.530, vale mucho más que citar una AC estadounidense."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "RAC 211, numeral 211.530: 1.000 ft entre FL 290 y FL 410, con monitoreo de CARSAMMA.",
          "RAC 91, numerales 91.305 y 91.310: nada de VFR sobre FL 290 en espacio RVSM.",
          "RAC 119, numeral 119.270(a): RVSM es una aprobación específica de las OpSpecs.",
          "Lo particular de las FIR y los niveles por dirección: AIP Colombia y circulares de la Aerocivil vigentes.",
          "Las tres cordilleras hacen la onda de montaña un asunto real, no importado."
        ]
      }
    ]
  },
  {
    "n": 32,
    "title": "Escenarios",
    "kicker": "R32",
    "minutes": 9,
    "blocks": [
      {
        "kind": "titulo",
        "text": "¿Qué es?"
      },
      {
        "kind": "p",
        "text": "Diez situaciones para razonar, no para memorizar. Cada una plantea un caso y explica el razonamiento correcto con su referencia. Son el puente entre lo que se ha leído y lo que se responde en una entrevista."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "En todos los escenarios el orden es el mismo: **controlar, identificar, consultar, concluir, comunicar, coordinar**. Lo que cambia es la conclusión."
      },
      {
        "kind": "hueco",
        "rotulo": "RV-20 · Figura · 16:9 · 1600×900",
        "descripcion": "Perfil completo de un vuelo de izquierda a derecha, desde el despegue en Bogotá hasta el aterrizaje en un destino internacional, con la silueta del terreno por debajo. Sobre el perfil, once marcadores numerados en el punto donde ocurre cada uno: 1 PREFLIGHT (libro técnico, tomas estáticas, altímetros), 2 PLAN DE VUELO (letra W en la casilla 10), 3 ASCENSO, 4 ALTITUD DE TRANSICIÓN (1013,25 hPa), 5 PUERTA RVSM en FL 290 con las verificaciones de entrada, 6 NIVELADO EN FL 370, 7 CHEQUEO ALTIMÉTRICO cada hora, 8 TURBULENCIA con la llamada «unable RVSM due turbulence», 9 POSIBLE FALLA y su flujo de contingencia, 10 SALIDA DEL ESPACIO RVSM al descender por FL 290, 11 POSTVUELO con la anotación en el libro. La franja entre FL 290 y FL 410 va sombreada y rotulada «ESPACIO RVSM».",
        "pie": "Integrar todo el módulo en una sola operación realista, de modo que el piloto vea dónde aparece cada procedimiento dentro de un vuelo completo.",
        "alto": 260,
        "ratio": "16 / 9"
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 1 · Los altímetros no coinciden",
        "rotulo": "Escenario de práctica",
        "situacion": "crucero FL 350 en espacio RVSM. El altímetro del comandante indica FL 350; el del primer oficial, una diferencia apreciable respecto de ese valor.",
        "pregunta": "¿qué hace la tripulación y qué referencia usa?",
        "respuesta": "lo primero es cuantificar, no estimar: en crucero las dos primarias deben coincidir dentro de **200 ft**, o menos si lo especifica el manual del avión. Si la diferencia excede ese límite, la norma es explícita: el sistema altimétrico **debe reportarse como defectuoso y notificarse al ATC**. El altímetro de reserva es la tercera opinión que permite decidir cuál de las dos primarias es la sospechosa, y por eso se anota su diferencia con las primarias. Si no se puede confirmar la precisión de la que queda, se actúa como en la falla de todas las primarias.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AC 91-85B, Apéndice B, numeral B.3.4 apartado 7 y Tabla B-2."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 2 · Falla el sistema automático de control de altitud",
        "rotulo": "Escenario de práctica",
        "situacion": "establecido en FL 370. Se pierde el sistema automático de mantenimiento de altitud requerido.",
        "pregunta": "¿sigue siendo RVSM capable? ¿Qué comunica? ¿Qué puede pedir?",
        "respuesta": "no. La falla del sistema automático de control de altitud es uno de los tres casos de *unable RVSM due equipment*. Se comunica esa frase al ATC y se solicita salir del espacio RVSM salvo que la situación operacional indique otra cosa; el controlador proporcionará 2.000 ft de separación vertical o la separación horizontal apropiada. Volar manual **no** devuelve la capacidad. Y queda la segunda mitad: el nivel inferior consume más, así que hay que revisar la predicción al destino contra alterno más reserva final.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AC 91-85B, Apéndice B, Tabla B-2."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 3 · Falla la alerta de altitud",
        "rotulo": "Escenario de práctica",
        "situacion": "crucero RVSM. La alerta de altitud queda inoperativa. Todo lo demás funciona.",
        "pregunta": "¿se puede continuar?",
        "respuesta": "no en espacio RVSM. La alerta de altitud es equipo requerido y su falla entra en el mismo grupo que la del control automático y la de todos los primarios: *unable RVSM due equipment*. Que sea «solo un aviso» no cambia su condición de requisito: sin ella, una desviación lenta puede crecer sin que nadie la note.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AC 91-85B, Apéndice B, numeral B.3.3 y Tabla B-2."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 4 · Problema en el reporte de altitud",
        "rotulo": "Escenario de práctica",
        "situacion": "el transpondedor deja de reportar altitud en crucero RVSM.",
        "pregunta": "¿es *unable RVSM due equipment*?",
        "respuesta": "no, y esta distinción es fina. La falla de transpondedor tiene tratamiento propio: el piloto contacta al ATC y **solicita autorización para continuar operando en el nivel autorizado**, y cumple la autorización revisada si el controlador la emite. El controlador considera la solicitud. Además, en espacio no controlado por Estados Unidos, los Estados proveedores determinan las acciones ante falla de transpondedor o de TCAS.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AC 91-85B, Apéndice B, Tabla B-2, «Transponder Failure»."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 5 · Turbulencia severa",
        "rotulo": "Escenario de práctica",
        "situacion": "FL 370, turbulencia severa, dificultad para mantener el nivel, con desviaciones que rondan los 200 ft.",
        "pregunta": "¿qué se hace y en qué orden?",
        "respuesta": "aviar primero: volar el avión y mantener el nivel en lo posible. Después comunicar: **«Unable RVSM due turbulence»**. Si el controlador no lo ofrece, **solicitar vector libre de tráfico en los niveles adyacentes**. Se puede pedir cambio de nivel o desvío. Y hay que **reportar localización y magnitud** de la turbulencia. Mientras tanto, vigilar tráfico visualmente y con el TCAS y encender las luces exteriores.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AC 91-85B, Apéndice B, Tabla B-2."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 6 · Onda de montaña",
        "rotulo": "Escenario de práctica",
        "situacion": "cruce de cordillera con viento perpendicular. Variaciones verticales persistentes que no llegan a 200 ft.",
        "pregunta": "¿hay que declarar algo?",
        "respuesta": "*unable RVSM* no, porque no se alcanza el disparador. Pero sí hay acción: contactar al ATC y **reportar que se está experimentando onda de montaña**, con su localización y magnitud, y solicitar cambio de nivel o desvío si se desea. La FAA aclara expresamente que los encuentros con onda de montaña no necesariamente producen desviaciones del orden de 200 ft, y prevé esta acción para los menos significativos.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AC 91-85B, Apéndice B, Tabla B-2, «MWA Encounters – General»."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 7 · Restricción de MEL antes del vuelo",
        "rotulo": "Escenario de práctica",
        "situacion": "el avión trae un ítem diferido relacionado con altimetría. El vuelo está despachado y el plan declara la W.",
        "pregunta": "¿qué analiza el piloto?",
        "respuesta": "leer la entrada de MEL completa: número requerido, observaciones, (M), (O) y si hay restricción RVSM expresa. Despachable y RVSM capable no son lo mismo. Si la restricción retira la capacidad, hay una contradicción con la W del plan que **se resuelve antes de salir**: el código de equipo RVSM no debe declararse cuando la aeronave no cumple. Y después, el efecto en cadena: nivel disponible, consumo, predicción y ruta.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AC 91-85B, Apéndice B, numerales B.3.1 Nota y B.4."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 8 · Resolución del TCAS",
        "rotulo": "Escenario de práctica",
        "situacion": "crucero RVSM, tráfico 1.000 ft por encima. Llega una resolución que exige maniobra vertical contraria a la autorización.",
        "pregunta": "¿qué prevalece?",
        "respuesta": "la resolución. Una autorización del ATC no tiene prioridad sobre una RA que exija maniobra conforme a los procedimientos ACAS aplicables. Es la excepción expresa a la regla de no apartarse del nivel autorizado sin autorización positiva, que la norma reserva para contingencia o emergencia. Después se informa al ATC según los procedimientos aplicables y se vuelve al nivel cuando corresponda.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "procedimientos ACAS aplicables; FAA AC 91-85B, Apéndice B, numeral B.3.4 apartado 3."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 9 · El ATC reporta una desviación",
        "rotulo": "Escenario de práctica",
        "situacion": "el ATC informa que la aeronave está fuera del nivel asignado, con una desviación de unos 350 ft.",
        "pregunta": "¿qué se hace primero?",
        "respuesta": "volver al nivel autorizado **tan rápido como sea posible**; la norma lo exige a partir de una AAD de 300 ft o más. Después, y solo después, confirmar indicaciones, contrastar con el altímetro de reserva, identificar la fuente del problema y evaluar si se conserva la capacidad RVSM. Y tener presente que un evento de esa magnitud es de los que se reportan e investigan, con plazo de 72 horas para el operador.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AC 91-85B, Apéndice B, numeral B.3.4 apartado 10; numeral 5.10.1."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 10 · La consecuencia de combustible",
        "rotulo": "Escenario de práctica",
        "situacion": "FL 370. Se pierde la capacidad RVSM y el ATC asigna FL 280 para el resto de la ruta.",
        "pregunta": "¿qué más hay que resolver?",
        "respuesta": "la separación ya está resuelta; el vuelo no. A FL 280 el consumo por hora es mayor y la predicción al destino empeora respecto del plan. Hay que recalcularla y compararla con alterno más reserva final. Si no se conserva, se replanifica con el despacho: otro alterno, una escala técnica o un cambio de ruta. Y al aterrizar, la anotación con detalle en el libro de mantenimiento.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AC 91-85B, Apéndice B, numerales B.3.6 y B.3.7; módulo Gestión del combustible."
          }
        ]
      },
      {
        "kind": "titulo",
        "text": "Errores frecuentes en entrevistas"
      },
      {
        "kind": "p",
        "text": "Once afirmaciones que se oyen y por qué fallan."
      },
      {
        "kind": "list",
        "items": [
          "**«RVSM significa Reduced Vertical Separation Mode.»** Es *Minimum*, no *Mode*. No es un modo del avión: es un espacio aéreo con requisitos.",
          "**«RVSM es simplemente separación de 1.000 pies.»** Describe el resultado. RVSM es el conjunto de equipo, aprobación, procedimientos, entrenamiento y monitorización que hace que esos 1.000 ft sean seguros.",
          "**«Cualquier avión con piloto automático puede volar RVSM.»** Hacen falta dos fuentes de altitud independientes, control automático de altitud, alerta de altitud y reporte de altitud, más la aprobación del avión, la autorización del operador y el entrenamiento de la tripulación.",
          "**«RVSM solo depende del ATC.»** El ATC aplica la separación; la capacidad la pone la aeronave, el operador y la tripulación.",
          "**«Si falla el piloto automático puedo continuar porque vuelo manual.»** La habilidad no sustituye un requisito de equipo. Es *unable RVSM due equipment*.",
          "**«Si el avión es despachable por MEL, sigue siendo RVSM.»** Despachable y RVSM capable se leen en columnas distintas de la misma entrada.",
          "**«El TCAS reemplaza los requisitos RVSM.»** Cumplen funciones distintas: RVSM garantiza la separación, el TCAS actúa cuando esa garantía falló.",
          "**«Si pierdo RVSM debo declarar MAYDAY.»** Se comunica y se coordina. Puede haber emergencia detrás, pero perder RVSM no la constituye.",
          "**«RVSM solo afecta la planificación del vuelo.»** Empieza ahí, se verifica antes de entrar, se vigila dentro y se reporta después.",
          "**«FL 290 siempre es un nivel RVSM utilizable.»** Es el límite inferior del espacio, no una garantía de disponibilidad para tu dirección, tu ruta o tu autorización.",
          "**«Si los altímetros difieren un poco no importa, el ATC tiene radar.»** El radar muestra lo que transmite el transpondedor, y el transpondedor transmite lo que dice el sistema altimétrico. Si ese sistema está corrido, el ATC ve el mismo error."
        ]
      },
      {
        "kind": "titulo",
        "text": "Lo que hay que memorizar"
      },
      {
        "kind": "p",
        "text": "Veinticuatro puntos. Lo demás se consulta."
      },
      {
        "kind": "list",
        "items": [
          "RVSM es *Reduced Vertical Separation Minimum*.",
          "Es espacio aéreo de calificación especial: se entra por cumplir requisitos.",
          "Separación: 1.000 ft.",
          "Rango: FL 290 a FL 410, inclusive.",
          "En Colombia: RAC 211, numeral 211.530, con monitoreo de CARSAMMA.",
          "Depende de tres cosas: avión aprobado, operador autorizado, tripulación entrenada.",
          "Equipo: dos sistemas independientes de altitud, transpondedor con reporte, alerta de altitud y control automático de altitud.",
          "Para entrar deben operar normalmente: dos primarios, un control automático y una alerta.",
          "Antes del despegue: elevación conocida dentro de 75 ft.",
          "Por la altitud de transición: 1013,25 hPa en todos, y recomprobar al nivelar.",
          "En crucero: primarias dentro de 200 ft, o menos si lo dice el manual.",
          "Chequeo con la de reserva cada hora aproximadamente; en oceánico, anotarlo.",
          "Nivelaciones: no sobrepasar ni quedarse corto más de 150 ft.",
          "Control automático: operativo y acoplado en crucero, salvo retrimado o turbulencia.",
          "La altitud se sigue por uno de los primarios, aun con el automático acoplado.",
          "El sistema que gobierna el avión alimenta el reporte de altitud.",
          "AAD de 300 ft o más notificada por el ATC: volver al nivel lo antes posible.",
          "Se reportan e investigan: TVE o AAD de ±300 ft, ASE de ±245 ft. Plazo: 72 horas.",
          "Fraseología: *Affirm RVSM*, *Negative RVSM*, *Unable RVSM due equipment*, *Unable RVSM due (causa)*, *Ready to resume RVSM*.",
          "*Unable RVSM* se repite en el contacto inicial de todas las frecuencias mientras dure.",
          "*Negative RVSM* se reporta en cuatro situaciones, no una.",
          "Turbulencia u onda de montaña con desviaciones de unos 200 ft o más: *unable RVSM due (causa)* y pedir vector.",
          "Una RA del TCAS prevalece sobre la autorización del ATC.",
          "En el plan de vuelo OACI: letra W en la casilla 10."
        ],
        "ordered": true
      },
      {
        "kind": "p",
        "text": "**Lo que se consulta, no se memoriza:** los límites de discrepancia propios del avión, las restricciones concretas de la MEL, los procedimientos del QRH, los niveles por dirección de vuelo de cada región y los requisitos particulares de cada área RVSM."
      },
      {
        "kind": "titulo",
        "text": "Preguntas típicas de entrevista"
      },
      {
        "kind": "table",
        "head": [
          "Pregunta",
          "Respuesta corta"
        ],
        "rows": [
          [
            "What does RVSM mean?",
            "Reduced Vertical Separation Minimum."
          ],
          [
            "What is the purpose of RVSM?",
            "Increase airspace capacity: nearly twice the usable flight levels."
          ],
          [
            "Between which flight levels is RVSM applied?",
            "FL 290 to FL 410, inclusive."
          ],
          [
            "What is the vertical separation in RVSM airspace?",
            "1.000 ft."
          ],
          [
            "What equipment is required?",
            "Two independent altitude measurement systems, one altitude reporting transponder, one altitude alerting system, one automatic altitude control system."
          ],
          [
            "What must be operating at entry?",
            "Two primary altitude measurement systems, one automatic altitude control system, one altitude alerting device."
          ],
          [
            "Why two independent altitude systems?",
            "So an error shows up as a discrepancy that can be detected."
          ],
          [
            "What is an altimeter crosscheck?",
            "Comparing the primaries with each other and with the standby, at defined moments."
          ],
          [
            "Altimeters disagree in cruise: limit?",
            "200 ft, or less if the aircraft manual specifies. Beyond that, report the system defective and notify ATC."
          ],
          [
            "Preflight altimeter check against field elevation?",
            "Within 75 ft."
          ],
          [
            "Maximum overshoot when levelling off?",
            "150 ft."
          ],
          [
            "Autopilot fails in RVSM: still capable?",
            "No. «Unable RVSM due equipment». Flying manually does not restore capability."
          ],
          [
            "What does «Unable RVSM due equipment» mean?",
            "The aircraft cannot meet applicable RVSM requirements. It is not an emergency declaration."
          ],
          [
            "Can an aircraft be dispatchable but not RVSM capable?",
            "Yes. They are different things, read in different columns of the same MEL entry."
          ],
          [
            "What is a Large Height Deviation?",
            "A large vertical deviation that the RVSM monitoring system records and investigates."
          ],
          [
            "What is ASE?",
            "Altimetry System Error: difference between displayed pressure altitude at 1013,25 and actual. Not visible in the cockpit."
          ],
          [
            "What is AAD?",
            "Assigned Altitude Deviation: difference between transponded altitude and assigned level."
          ],
          [
            "Severe turbulence in RVSM?",
            "«Unable RVSM due turbulence», request vector clear of adjacent levels, report location and magnitude."
          ],
          [
            "TCAS RA against ATC clearance?",
            "Fly the RA. The clearance does not take priority."
          ],
          [
            "ATC reports an altitude deviation?",
            "Return to cleared level as soon as possible, then confirm indications and identify the source."
          ],
          [
            "How is RVSM filed in the ICAO flight plan?",
            "Letter W, Item 10."
          ],
          [
            "Transponder fails in RVSM?",
            "Request clearance to continue at cleared level; comply with revised clearance."
          ]
        ]
      }
    ]
  }
]

/** Cuántos capítulos hay. Lo lee el catálogo de contenido, que valida la base. */
export const RV_LECCION_TOTAL = 32

/** Las claves de práctica: los identificadores de las preguntas de capítulo. */
export const RV_PRACTICA_CLAVES = [
  "r01-q1",
  "r01-q2",
  "r01-q3",
  "r02-q1",
  "r02-q2",
  "r02-q3",
  "r03-q1",
  "r03-q2",
  "r03-q3",
  "r04-q1",
  "r04-q2",
  "r04-q3",
  "r05-q1",
  "r05-q2",
  "r05-q3",
  "r06-q1",
  "r06-q2",
  "r06-q3",
  "r07-q1",
  "r07-q2",
  "r07-q3",
  "r08-q1",
  "r08-q2",
  "r08-q3",
  "r09-q1",
  "r09-q2",
  "r09-q3",
  "r10-q1",
  "r10-q2",
  "r10-q3",
  "r11-q1",
  "r11-q2",
  "r11-q3",
  "r12-q1",
  "r12-q2",
  "r12-q3",
  "r13-q1",
  "r13-q2",
  "r13-q3",
  "r14-q1",
  "r14-q2",
  "r14-q3",
  "r15-q1",
  "r15-q2",
  "r15-q3",
  "r16-q1",
  "r16-q2",
  "r16-q3",
  "r17-q1",
  "r17-q2",
  "r17-q3",
  "r18-q1",
  "r18-q2",
  "r18-q3",
  "r19-q1",
  "r19-q2",
  "r19-q3",
  "r20-q1",
  "r20-q2",
  "r20-q3",
  "r21-q1",
  "r21-q2",
  "r21-q3",
  "r22-q1",
  "r22-q2",
  "r22-q3",
  "r23-q1",
  "r23-q2",
  "r23-q3",
  "r24-q1",
  "r24-q2",
  "r24-q3",
  "r25-q1",
  "r25-q2",
  "r25-q3",
  "r26-q1",
  "r26-q2",
  "r26-q3",
  "r27-q1",
  "r27-q2",
  "r27-q3",
  "r28-q1",
  "r28-q2",
  "r28-q3",
  "r29-q1",
  "r29-q2",
  "r29-q3",
  "r30-q1",
  "r30-q2",
  "r30-q3",
  "r31-q1",
  "r31-q2",
  "r31-q3",
  "r32-q1",
  "r32-q2",
  "r32-q3"
]

/** Los huecos de figura que quedan por llenar, para el inventario de imágenes. */
export const RV_FIGURAS_PENDIENTES = [
  "RV-01",
  "RV-02",
  "RV-03",
  "RV-04",
  "RV-05",
  "RV-06",
  "RV-07",
  "RV-08",
  "RV-09",
  "RV-10",
  "RV-11",
  "RV-12",
  "RV-13",
  "RV-14",
  "RV-15",
  "RV-16",
  "RV-17",
  "RV-18",
  "RV-19",
  "RV-20"
]
