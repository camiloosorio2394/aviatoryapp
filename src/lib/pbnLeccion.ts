// GENERADO por scripts/pbn/convertir.mjs desde docs/contenido/pbn.md.
// No se edita a mano: se edita el documento y se vuelve a correr el script.

/**
 * Los 48 capítulos de PBN, en el formato del lector de lecciones.
 *
 * El contenido es el del documento, sin tocar: este archivo lo traduce a
 * bloques. 29 de las 29 imágenes son figuras SVG de public/modulos/pbn/,
 * dibujadas con scripts/pbn/dibujar-figuras.mjs; no queda ningún hueco.
 *
 * Las preguntas de cada capítulo NO están aquí: viven en pbnPractica.ts,
 * porque en la lectura no se pregunta nada.
 */

import type { DocScreen } from "@/lib/docBlocks"
import type { LectorNivel } from "@/components/lesson/LectorLeccion"

/** Los 9 bloques del documento, con el capítulo en el que empieza cada uno. */
export const PB_NIVELES: LectorNivel[] = [
  {
    "titulo": "El concepto",
    "desde": 1
  },
  {
    "titulo": "RNAV, RNP y el número",
    "desde": 6
  },
  {
    "titulo": "Las especificaciones, una por una",
    "desde": 12
  },
  {
    "titulo": "Las aproximaciones PBN",
    "desde": 16
  },
  {
    "titulo": "La trayectoria",
    "desde": 23
  },
  {
    "titulo": "El FMS y los datos",
    "desde": 29
  },
  {
    "titulo": "Los sensores",
    "desde": 35
  },
  {
    "titulo": "La operación de aerolínea",
    "desde": 39
  },
  {
    "titulo": "Perder la capacidad, Colombia y la carta",
    "desde": 45
  }
]

export const PB_LECCIONES: DocScreen[] = [
  {
    "n": 1,
    "title": "Qué es PBN",
    "kicker": "P01",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Performance-Based Navigation: navegación basada en la performance. El RAC 91 la define como «navegación de área basada en los requisitos de performance que se aplican a las aeronaves que vuelan en una ruta ATS, en un procedimiento de aproximación por instrumentos o en un espacio aéreo designado»."
      },
      {
        "kind": "p",
        "text": "La frase que hay que leer despacio es **«basada en los requisitos de performance»**. Antes, para volar una ruta, se exigía un equipo: un VOR, un ADF, dos DME. PBN invierte la pregunta. Ya no dice «lleve este equipo», dice «demuestre esta performance», y deja abierto con qué sensores se consigue."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "PBN se aplica a cuatro cosas, y conviene tenerlas en la cabeza porque son cuatro momentos distintos de un mismo vuelo:"
      },
      {
        "kind": "list",
        "items": [
          "Rutas ATS.",
          "Espacio aéreo designado.",
          "Salidas normalizadas por instrumentos (SID).",
          "Llegadas normalizadas (STAR) y aproximaciones por instrumentos."
        ]
      },
      {
        "kind": "p",
        "text": "En cada una de ellas la autoridad puede prescribir una **especificación para la navegación**, y esa especificación es la que fija qué tiene que cumplir el avión y qué tiene que saber hacer la tripulación."
      },
      {
        "kind": "sub",
        "text": "Por qué esto cambia la manera de preparar un vuelo"
      },
      {
        "kind": "p",
        "text": "Con navegación convencional, la pregunta de cabina era: «¿está el VOR operativo?». Con PBN la pregunta es doble y más incómoda: «¿es mi avión elegible para esta especificación?» y «¿puede cumplirla hoy, con el equipo que tengo despachado y la infraestructura que hay disponible?»."
      },
      {
        "kind": "p",
        "text": "Son dos preguntas distintas. La primera se contesta en el AFM y en las especificaciones de operación. La segunda se contesta el día del vuelo, con la MEL, los NOTAM y lo que el avión indique."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "En un vuelo normal, PBN es invisible por la misma razón que RVSM: todo funciona. Aparece en cinco momentos concretos:"
      },
      {
        "kind": "list",
        "items": [
          "En el despacho, cuando un ítem de la MEL toca una fuente de navegación.",
          "En la preparación, cuando se comprueba el ciclo de la base de datos.",
          "Al cargar la SID o la aproximación, cuando la carta exige una especificación y hay que saber si se tiene.",
          "Cuando el ATC cambia la autorización y hay que reprogramar sin romper la trayectoria.",
          "Cuando algo se degrada y hay que decidir si todavía se puede cumplir lo que la carta pide."
        ]
      },
      {
        "kind": "p",
        "text": "El resto del tiempo, PBN es la razón por la que la SID no pasa por encima del cerro y la aproximación existe en una pista que no tiene ILS."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "p",
        "text": "En este capítulo, la idea con la que se leen los demás: la tripulación no verifica que el avión «tenga GPS». Verifica que el avión y la operación cumplan **la especificación que pide el procedimiento**, hoy."
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Si la especificación prescrita no se cumple, el procedimiento no se puede volar tal como está publicado. No es una cuestión de criterio del piloto: la separación, el margen sobre obstáculos y el diseño de la trayectoria se calcularon suponiendo esa performance."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«PBN es lo nuevo que reemplazó al VOR.» Ni lo uno ni lo otro. PBN es un concepto de navegación, no una tecnología, y la navegación convencional sigue existiendo y sigue publicándose. Lo que cambió es que ahora hay procedimientos cuyo requisito de acceso es una performance, no un equipo concreto."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-01.svg",
        "alt": "Dos mapas del mismo terreno y el mismo aeropuerto. A la izquierda, navegación convencional: la ruta va en tramos rectos de un VOR al siguiente, y uno de los tramos pasa sobre el cerro donde está la antena. A la derecha, PBN: la misma llegada definida por seis waypoints de nombre ficticio, con la trayectoria lejos del relieve y alineada con la pista.",
        "ancho": 1600,
        "alto": 900,
        "pie": "Esquema didáctico, con nombres de punto ficticios."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "PBN es navegación de área basada en requisitos de performance, aplicada a rutas ATS, espacio aéreo designado, SID, STAR y aproximaciones.",
          "Exige performance, no un equipo concreto: por eso la pregunta de cabina cambia de «¿está el VOR?» a «¿cumplo la especificación?».",
          "La especificación para la navegación es la que fija los requisitos de la aeronave y de la tripulación.",
          "No es una tecnología ni el reemplazo del VOR: es un concepto."
        ]
      }
    ]
  },
  {
    "n": 2,
    "title": "De la radioayuda a la trayectoria",
    "kicker": "P02",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Tres etapas, y el piloto de aerolínea convive con las tres en la misma jornada."
      },
      {
        "kind": "sub",
        "text": "Navegación convencional"
      },
      {
        "kind": "p",
        "text": "VOR a VOR. La trayectoria es consecuencia de dónde están las antenas: se vuela hacia una o desde una, y la ruta se quiebra sobre cada instalación."
      },
      {
        "kind": "sub",
        "text": "Navegación de área (RNAV)"
      },
      {
        "kind": "p",
        "text": "Waypoint a waypoint. El sistema de a bordo calcula la posición y permite volar cualquier trayectoria deseada dentro de la cobertura de la infraestructura y de la capacidad del equipo. La antena deja de ser el destino y pasa a ser, si acaso, una fuente de posición."
      },
      {
        "kind": "sub",
        "text": "PBN"
      },
      {
        "kind": "p",
        "text": "La aeronave debe **demostrar** una performance determinada para realizar una aplicación concreta. Ya no es «puedo volar a ese punto», es «puedo volar a ese punto con esta precisión, y si dejo de poder, lo sé»."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Una precisión de vocabulario que se pregunta en entrevista: **navegación de área no es sinónimo de PBN**. La nota del RAC 91 lo dice sin rodeos: la navegación de área incluye la navegación basada en la performance y además otras operaciones que no entran en la definición de PBN."
      },
      {
        "kind": "p",
        "text": "Dicho al revés: toda operación PBN es navegación de área, pero hay navegación de área que no es PBN. El AIM lo expresa desde el otro lado, y también hay que saberlo: PBN existe bajo el paraguas de la navegación de área, y el término RNAV en el título de un procedimiento significa «navegación de área», sin decir nada del equipo del avión."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "En un mismo vuelo pueden convivir una SID RNAV 1, una ruta con designador que exige una especificación, vectores del ATC que sacan el avión de la trayectoria publicada y una aproximación RNP APCH. Y si la aproximación no está disponible, el alterno puede ser un VOR/DME convencional."
      },
      {
        "kind": "p",
        "text": "Esa es la razón por la que el módulo no trata la navegación convencional como algo superado: sigue siendo el plan B, y el plan B hay que saber volarlo."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "p",
        "text": "Que la trayectoria que el FMS va a volar es la que la carta publica, no la que el avión «puede» volar. Con navegación de área la libertad es grande, y esa libertad es justamente lo que hay que acotar con la carta."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Confundir la evolución con una sustitución. «Ya no se usan radioayudas» es falso: varias especificaciones RNAV admiten posicionamiento por DME/DME o por VOR/DME, el ILS sigue siendo el patrón de la aproximación de precisión, y la reversión a navegación convencional es la contingencia más común."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-02.svg",
        "alt": "Tres mapas con los mismos dos aeropuertos y el mismo cerro. En el primero, navegación convencional: la derrota se quiebra sobre tres VOR. En el segundo, navegación de área: la derrota pasa por waypoints y los VOR quedan en gris. En el tercero, PBN: la misma derrota con una franja alrededor y la especificación rotulada en cada tramo, RNAV 1 en la salida, RNP 2 en ruta y RNP APCH en la aproximación.",
        "ancho": 1600,
        "alto": 900
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Convencional: VOR a VOR, la trayectoria la deciden las antenas.",
          "Navegación de área: waypoint a waypoint, la trayectoria se define donde conviene.",
          "PBN: la aeronave demuestra una performance para una aplicación concreta.",
          "Toda operación PBN es navegación de área, pero no toda navegación de área es PBN."
        ]
      }
    ]
  },
  {
    "n": 3,
    "title": "Los tres elementos del concepto PBN",
    "kicker": "P03",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "El concepto PBN se sostiene sobre tres piezas que encajan. Para el piloto no es teoría de diseño de espacio aéreo: es la explicación de por qué un procedimiento existe, por qué exige lo que exige y por qué a veces no se puede volar."
      },
      {
        "kind": "sub",
        "text": "La aplicación de navegación"
      },
      {
        "kind": "p",
        "text": "Es el uso concreto: esta SID, esta STAR, esta ruta, esta aproximación a esta pista. Es lo que aparece publicado y lo que el ATC autoriza."
      },
      {
        "kind": "sub",
        "text": "La especificación para la navegación"
      },
      {
        "kind": "p",
        "text": "Es el conjunto de requisitos relativos a la aeronave y a la tripulación necesarios para dar apoyo a la operación dentro de un espacio aéreo definido. Es lo que el piloto tiene que cumplir. RNAV 1, RNP 1, RNP APCH son especificaciones."
      },
      {
        "kind": "sub",
        "text": "La infraestructura de radioayudas"
      },
      {
        "kind": "p",
        "text": "Es lo que hay disponible para posicionarse: satélites, DME, VOR, sistemas inerciales a bordo. Sin la infraestructura adecuada, la especificación no se puede cumplir aunque el avión sea elegible."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "La consecuencia práctica de las tres piezas es una frase que conviene memorizar: **un avión puede ser elegible para una especificación y no ser capaz de cumplirla hoy**."
      },
      {
        "kind": "p",
        "text": "El AIM lo ejemplifica exactamente así: una aeronave puede ser elegible para RNP 1 y no ser capaz de una operación RNP 1 por cobertura limitada de radioayudas o por una falla de aviónica. Elegibilidad la da el AFM; capacidad la da el día."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Las tres piezas se revisan en tres momentos distintos y por caminos distintos, y eso es lo que hace que se olviden:"
      },
      {
        "kind": "list",
        "items": [
          "La aplicación está en la carta y en la autorización del ATC.",
          "La especificación está en la carta (qué pide) y en el AFM o las especificaciones de operación (qué tengo).",
          "La infraestructura está en los NOTAM y, en vuelo, en lo que indique el avión."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Qué especificación pide el procedimiento que se va a volar.",
          "Si la aeronave es elegible para ella.",
          "Si la infraestructura necesaria está disponible para el periodo del vuelo."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Falta cualquiera de las tres y el procedimiento no se puede volar como está publicado. La que más se pasa por alto es la tercera, porque no se ve en cabina hasta que el avión avisa."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Creer que la especificación es una etiqueta del procedimiento. No lo es: es un contrato de dos partes. Dice lo que debe cumplir la aeronave **y** lo que debe saber hacer la tripulación. El RAC 91 lo dice en la propia definición: requisitos relativos a la aeronave y a la tripulación de vuelo."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-03.svg",
        "alt": "Tres engranajes encajados. El primero es la aplicación de navegación: la SID, la STAR, la ruta o la aproximación. El segundo, la especificación para la navegación: lo que deben cumplir el avión y la tripulación. El tercero, la infraestructura: GNSS, DME y VOR, que se revisa en los NOTAM. Debajo, la regla: si falta una, el procedimiento no se vuela como está publicado.",
        "ancho": 1600,
        "alto": 900
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Tres piezas: aplicación de navegación, especificación para la navegación e infraestructura.",
          "La especificación es un contrato de dos partes: aeronave y tripulación.",
          "Ser elegible no es ser capaz hoy: la infraestructura y el equipo despachado deciden.",
          "Falta una pieza y el procedimiento no se vuela como está publicado."
        ]
      }
    ]
  },
  {
    "n": 4,
    "title": "Lo que PBN no es",
    "kicker": "P04",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Tres confusiones que aparecen una y otra vez en entrevistas, y que conviene desarmar antes de entrar en las especificaciones."
      },
      {
        "kind": "sub",
        "text": "PBN no es GPS"
      },
      {
        "kind": "p",
        "text": "PBN es un concepto de navegación basada en performance. El GNSS es una tecnología, y para muchas aplicaciones PBN es la fuente fundamental de posición, a veces la única admitida. Pero la especificación no dice «lleve GPS», dice «consiga esta performance». Hay especificaciones que admiten DME/DME, DME/DME/IRU o VOR/DME."
      },
      {
        "kind": "sub",
        "text": "RNAV no es GPS"
      },
      {
        "kind": "p",
        "text": "RNAV describe la capacidad de navegar de área. El GPS es una de las fuentes con que se consigue. En el título de un procedimiento, RNAV no dice nada del equipo del avión."
      },
      {
        "kind": "sub",
        "text": "PBN no es TAWS ni GPWS"
      },
      {
        "kind": "p",
        "text": "PBN permite seguir una trayectoria con una performance especificada. El TAWS es un sistema de alerta que avisa de una situación peligrosa respecto del terreno. Uno define por dónde se vuela; el otro avisa cuando el resultado se acerca al suelo. Son sistemas distintos, con propósitos distintos, y ninguno reemplaza al otro."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "La razón por la que estas confusiones importan no es terminológica, es operacional."
      },
      {
        "kind": "p",
        "text": "Quien cree que PBN es GPS concluye que perder GNSS es perder toda capacidad PBN, y eso lleva a declarar una incapacidad que a lo mejor no existe, o a lo contrario: a suponer que con GPS operativo ya se puede volar cualquier RNP."
      },
      {
        "kind": "p",
        "text": "Quien cree que PBN protege del terreno deja de vigilar el perfil vertical y las restricciones de altitud, que es precisamente lo que sí protege."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "En una degradación de GNSS en ruta, la pregunta correcta no es «¿perdí PBN?». Es «¿qué especificación necesito para el segmento que estoy volando y qué me queda para cumplirla?». En algunos casos la respuesta es que se sigue igual con otra fuente de posición. En otros, que hay que pedir otra autorización."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«Si el procedimiento aparece en el FMS, estoy autorizado.» No. Que un procedimiento esté en la base de datos dice que el proveedor lo codificó, no que el avión, el operador y la tripulación estén autorizados a volarlo. En el caso de la FAA hay incluso una salvaguarda en sentido contrario que conviene conocer: se exige que la base de datos de la aeronave contenga solo los procedimientos para los que la aeronave mantiene elegibilidad, así que si un procedimiento no aparece, lo más probable es que contenga elementos PBN para los que el avión no es elegible. Esa salvaguarda es un criterio de la FAA; no se puede dar por universal."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-04.svg",
        "alt": "Diagrama radial. En el centro, PBN, concepto de navegación basada en performance. A su alrededor, cuatro fuentes de posición unidas al centro: GNSS, DME/DME, DME/DME/IRU y VOR/DME. Aparte, al otro lado de una línea de puntos, el TAWS, alerta de terreno: un sistema distinto, con otro propósito.",
        "ancho": 1600,
        "alto": 900
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "PBN es un concepto; el GNSS es una tecnología, con frecuencia la fuente principal, y no siempre la única admitida.",
          "RNAV describe navegación de área; en el título de un procedimiento no dice nada del equipo del avión.",
          "PBN no protege del terreno: eso es el TAWS, que es otro sistema.",
          "Que el procedimiento esté en el FMS no significa que se esté autorizado a volarlo."
        ]
      }
    ]
  },
  {
    "n": 5,
    "title": "Precisión, integridad, continuidad, disponibilidad y funcionalidad",
    "kicker": "P05",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Cuando se dice que una especificación fija «requisitos de performance», eso se descompone en cinco atributos. No hace falta saber cómo se calculan; hace falta saber qué significa cada uno cuando se está sentado en la cabina."
      },
      {
        "kind": "sub",
        "text": "Precisión (*accuracy*)"
      },
      {
        "kind": "p",
        "text": "Cuánto se parece la posición que el sistema usa a la posición real. Es el atributo que el número de la especificación cuantifica."
      },
      {
        "kind": "sub",
        "text": "Integridad (*integrity*)"
      },
      {
        "kind": "p",
        "text": "La confianza en que lo que el sistema dice es cierto, y la capacidad de avisar cuando deja de serlo. Para el piloto, integridad es la diferencia entre «estoy desviado y lo sé» y «estoy desviado y nadie me lo dijo»."
      },
      {
        "kind": "sub",
        "text": "Continuidad (*continuity*)"
      },
      {
        "kind": "p",
        "text": "Que la función siga estando durante toda la operación. Por eso ciertas operaciones exigen equipo redundante: no porque un sistema sea impreciso, sino porque una sola falla no puede dejar al avión sin navegación a mitad del procedimiento."
      },
      {
        "kind": "sub",
        "text": "Disponibilidad (*availability*)"
      },
      {
        "kind": "p",
        "text": "Que el servicio esté ahí cuando se lo va a usar. Es lo que se comprueba con NOTAM y, cuando corresponde, con una predicción de disponibilidad."
      },
      {
        "kind": "sub",
        "text": "Funcionalidad (*functionality*)"
      },
      {
        "kind": "p",
        "text": "Qué tiene que **saber hacer** el sistema, más allá de posicionarse bien: seguir un tramo de radio constante, escalar el valor RNP, generar una trayectoria paralela desplazada, presentar la desviación lateral."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "De los cinco, el que cambia la vida en cabina es la integridad, porque es el que convierte un error en una alerta. Y el que más sorprende en entrevista es la funcionalidad: dos aviones con el mismo GNSS y la misma precisión pueden diferir en si pueden volar un tramo RF, y por eso uno vuela el procedimiento y el otro no."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Cada atributo se comprueba por una vía distinta:"
      },
      {
        "kind": "table",
        "head": [
          "Atributo",
          "Dónde se comprueba"
        ],
        "rows": [
          [
            "Precisión",
            "La especificación que pide la carta y la elegibilidad del avión"
          ],
          [
            "Integridad",
            "Lo que el avión indica y alerta durante la operación"
          ],
          [
            "Continuidad",
            "La MEL y los requisitos de redundancia de la operación"
          ],
          [
            "Disponibilidad",
            "NOTAM y, cuando aplique, predicción de disponibilidad"
          ],
          [
            "Funcionalidad",
            "El AFM o la documentación de aviónica, y las notas de la carta"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "p",
        "text": "Que la funcionalidad que exige el procedimiento esté listada como capacidad del avión, no solo la precisión. Es el hueco por donde se cuelan las sorpresas."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Tratar los cinco atributos como sinónimos de «el equipo es bueno». No lo son: son cinco preguntas distintas, y una operación puede fallar por cualquiera de ellas con el resto en orden."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Precisión: cuánto se parece la posición usada a la real. Es lo que cuantifica el número.",
          "Integridad: la capacidad de avisar cuando la posición deja de ser confiable.",
          "Continuidad: que la función siga estando durante toda la operación; de ahí la redundancia.",
          "Disponibilidad: que el servicio esté cuando se lo va a usar; de ahí los NOTAM y la predicción.",
          "Funcionalidad: qué debe saber hacer el sistema, como un tramo RF o escalar el RNP."
        ]
      }
    ]
  },
  {
    "n": 6,
    "title": "RNAV: navegación de área",
    "kicker": "P06",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Area Navigation. Es el método de navegación que permite operar sobre **cualquier trayectoria deseada** dentro de la cobertura de las radioayudas de referencia, de los límites de un sistema autónomo a bordo, o de una combinación de ambos."
      },
      {
        "kind": "p",
        "text": "Esa libertad tiene dos frenos, y los dos importan: la capacidad del sistema del avión y la infraestructura disponible. RNAV no significa «puedo ir a donde quiera»; significa «puedo definir la trayectoria sin tener que pasar por encima de una antena, siempre que el equipo y la infraestructura lo permitan»."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Una **especificación RNAV** es, según el RAC 91, una especificación para la navegación basada en la navegación de área **que no incluye el requisito de control y alerta de la performance**, y se designa con el prefijo RNAV: RNAV 5, RNAV 1."
      },
      {
        "kind": "p",
        "text": "La frase entera se aprende de memoria, porque la mitad final es lo único que separa RNAV de RNP. Sin control y alerta, el sistema navega con la precisión que se le exige, pero no se pronuncia sobre si la está consiguiendo."
      },
      {
        "kind": "sub",
        "text": "Las especificaciones RNAV que existen"
      },
      {
        "kind": "p",
        "text": "RNAV 10, RNAV 5, RNAV 2 y RNAV 1. Conviene saber que RNAV 10 arrastra una peculiaridad de nombre que se ve en el capítulo correspondiente: conserva la designación RNP 10 en la casilla del plan de vuelo y en mucha documentación."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Las especificaciones RNAV aparecen sobre todo en SID y STAR (RNAV 1), en rutas (RNAV 2, RNAV 5) y en espacio oceánico y remoto (RNAV 10). En una jornada normal, el piloto de aerolínea vuela RNAV sin nombrarlo: lo nombra cuando la carta lo exige y cuando algo falla."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Qué especificación RNAV pide el procedimiento, en las notas o en el recuadro PBN de la carta.",
          "Si la aeronave es elegible para esa especificación concreta, no para «RNAV» en general.",
          "Qué fuentes de posición admite y cuáles están disponibles hoy."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Sin la especificación exigida no se puede volar la trayectoria publicada, y hay que pedir una autorización alternativa. Como la especificación RNAV no incluye control y alerta a bordo, la detección de un problema depende más del piloto y de la vigilancia del ATC que del propio sistema. Esa es la razón de fondo por la que RNAV y RNP no son intercambiables."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Cuando se pierde la capacidad, el ejemplo que da la circular de la FAA para operaciones RNAV en terminal y en ruta es directo: «*…N1234, failure of GPS/GNSS system, unable RNAV, request amended clearance*». Tres piezas: qué falló, qué no se puede cumplir y qué se pide."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Decir «estoy RNAV» como si fuera un estado del avión. No lo es: cada especificación se declara y se autoriza por separado. Ser elegible para RNAV 2 no implica serlo para RNAV 1."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "RNAV es navegación de área: permite operar sobre cualquier trayectoria deseada dentro de la capacidad del sistema y de la infraestructura.",
          "Una especificación RNAV **no** incluye el requisito de control y alerta de la performance.",
          "Se designa con el prefijo RNAV: RNAV 10, RNAV 5, RNAV 2, RNAV 1.",
          "La elegibilidad es por especificación, no por familia."
        ]
      }
    ]
  },
  {
    "n": 7,
    "title": "RNP: el control y la alerta a bordo",
    "kicker": "P07",
    "minutes": 8,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Required Navigation Performance. Este capítulo es el corazón del módulo, y se resume en una ecuación que hay que poder escribir en una pizarra en una entrevista:"
      },
      {
        "kind": "p",
        "text": "RNAV  =  navegación de área RNP   =  navegación de área        +  control de la performance a bordo        +  alerta a la tripulación"
      },
      {
        "kind": "p",
        "text": "El RAC 91 lo define así: especificación para la navegación basada en la navegación de área **que incluye el requisito de control y alerta de la performance**, designada con el prefijo RNP; por ejemplo, RNP 4, RNP APCH."
      },
      {
        "kind": "p",
        "text": "En inglés el término es *on-board performance monitoring and alerting* (OBPMA), y así aparece en la documentación de la FAA y del fabricante."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Lo que añade RNP no es precisión: es **autoconciencia**. El sistema no solo calcula dónde está; también determina si puede satisfacer la performance necesaria y avisa a la tripulación cuando ya no puede garantizarla."
      },
      {
        "kind": "p",
        "text": "La consecuencia operacional es enorme y el AIM la explica bien: esa capacidad permite depender menos de la intervención del ATC y de la separación procedimental para conseguir la seguridad de la operación. Si el avión avisa cuando se sale del margen, el margen puede ser más estrecho."
      },
      {
        "kind": "sub",
        "text": "Lo que no significa"
      },
      {
        "kind": "p",
        "text": "No significa que el avión avise de todo. Un sistema de control y alerta responde a los criterios para los que fue diseñado. Hay degradaciones que no disparan una alerta de performance, y el caso más incómodo, que tiene su propio capítulo, es la suplantación de señal: la FAA advierte que el RAIM es solo parcialmente efectivo frente a ella y que el piloto puede no darse cuenta de que las indicaciones son erróneas."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "En crucero y en aproximación, el control y alerta se manifiesta de dos maneras: un valor que se puede comparar (la performance requerida frente a la estimada, que se ve en el capítulo correspondiente) y un mensaje o una bandera cuando el sistema concluye que no llega."
      },
      {
        "kind": "p",
        "text": "Lo que la tripulación hace con ese mensaje es lo que separa una operación profesional de un susto: reconocerlo, contrastar la posición, aplicar el QRH y el SOP, determinar qué capacidad queda e informar al ATC."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Que la especificación que pide el procedimiento es RNP y no RNAV, porque las exigencias no son las mismas.",
          "Que el avión es elegible para esa especificación RNP concreta.",
          "Que se sabe dónde se presenta el aviso en esta flota y qué dice el QRH al respecto."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Si el control y alerta no está disponible, no se cumple la especificación RNP, aunque la precisión sea buena. La precisión sin alerta es RNAV, no RNP."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "La pérdida de capacidad RNP se comunica al ATC junto con el curso de acción propuesto. La circular de la FAA es explícita para todas las especificaciones RNP que cubre: el piloto debe notificar al ATC cualquier pérdida de la capacidad RNP y, si no puede cumplir los requisitos del procedimiento, debe avisar al servicio de tránsito aéreo lo antes posible."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«RNP es más preciso que RNAV.» No es la diferencia. La diferencia es el control y la alerta. Puede haber una especificación RNAV con un número menor que una RNP y seguir sin ser RNP, porque le falta el requisito que define la familia."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-05.svg",
        "alt": "Dos columnas con la misma trayectoria arriba. RNAV tiene una sola pieza: la capacidad de navegación. RNP tiene tres: la capacidad de navegación, el control de la performance a bordo y la alerta a la tripulación, esta última resaltada con un símbolo de aviso. Al pie: la diferencia no es el número, es el aviso.",
        "ancho": 1600,
        "alto": 900
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "RNP es navegación de área más control de la performance a bordo más alerta a la tripulación.",
          "El RAC 91 lo define con esas palabras: incluye el requisito de control y alerta de la performance.",
          "La consecuencia operacional es depender menos de la intervención del ATC y de la separación procedimental.",
          "Precisión sin alerta no es RNP."
        ]
      }
    ]
  },
  {
    "n": 8,
    "title": "RNAV frente a RNP",
    "kicker": "P08",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "La comparación, en la terminología de la norma:"
      },
      {
        "kind": "table",
        "head": [
          "",
          "RNAV",
          "RNP"
        ],
        "rows": [
          [
            "Base",
            "Navegación de área",
            "Navegación de área"
          ],
          [
            "Requisito de performance",
            "Sí",
            "Sí"
          ],
          [
            "Control y alerta de la performance a bordo",
            "**No**",
            "**Sí**"
          ],
          [
            "Prefijo del designador",
            "RNAV",
            "RNP"
          ],
          [
            "Ejemplos",
            "RNAV 5, RNAV 1",
            "RNP 4, RNP APCH"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Hay una idea que el AIM insiste en corregir y que en entrevista vale mucho: las especificaciones deben considerarse **distintas entre sí, no mejores ni peores** por la precisión lateral que describen."
      },
      {
        "kind": "p",
        "text": "De ahí sale la consecuencia que más se falla: **RNP 1 no es lo mismo que RNAV 1**, y ser elegible para RNP 1 **no** implica automáticamente ser elegible para RNP 2 ni para RNAV 1. Por eso la elegibilidad de cada especificación se lista por separado en la documentación de aviónica o en el AFM."
      },
      {
        "kind": "sub",
        "text": "El cambio de significado del término RNP"
      },
      {
        "kind": "p",
        "text": "Una nota del RAC 91 que conviene conocer porque explica documentación antigua: el término RNP, definido antes como «declaración de la performance de navegación necesaria para operar dentro de un espacio aéreo definido», fue **reemplazado por el concepto de PBN**. Hoy RNP se usa solo en el contexto de especificaciones de navegación que requieren control y alerta de la performance."
      },
      {
        "kind": "p",
        "text": "Es decir: si en un manual viejo se lee «RNP» como si fuera el concepto general, es lenguaje anterior. El concepto general hoy se llama PBN."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "La diferencia se vuelve tangible en dos sitios:"
      },
      {
        "kind": "list",
        "items": [
          "**En la carta.** Un procedimiento que exige RNP y otro que exige RNAV piden capacidades distintas, y hay que buscar cuál es en las notas o en el recuadro PBN.",
          "**En la MEL.** Una falla puede dejar intacta la capacidad RNAV y quitar la RNP, porque lo que se pierde es el control y la alerta."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "p",
        "text": "Que se lee el prefijo, no solo el número. «1» no dice nada por sí solo: RNAV 1 y RNP 1 son especificaciones distintas con elegibilidades distintas."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«RNAV 1 es más preciso que RNP 1 porque ambos tienen 1.» La frase se contradice sola y aparece en entrevistas. El número es el mismo porque describen la misma precisión lateral; lo que las separa es que RNP 1 exige control y alerta a bordo."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "La única diferencia de familia es el control y alerta de la performance a bordo.",
          "Las especificaciones son distintas entre sí, no mejores ni peores por su número.",
          "Ser elegible para RNP 1 no implica ser elegible para RNP 2 ni para RNAV 1.",
          "El término RNP dejó de ser el concepto general: hoy el concepto general es PBN."
        ]
      }
    ]
  },
  {
    "n": 9,
    "title": "Qué significa el número",
    "kicker": "P09",
    "minutes": 8,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Este capítulo se lee dos veces. Es el que más se pregunta y el que peor se contesta."
      },
      {
        "kind": "p",
        "text": "Para las especificaciones RNP y RNAV, **la designación numérica se refiere a la precisión de navegación lateral en millas náuticas que se espera conseguir al menos el 95 % del tiempo de vuelo** por la población de aeronaves que operan en ese espacio aéreo, ruta o procedimiento."
      },
      {
        "kind": "p",
        "text": "Tres piezas, y las tres hacen falta para que la respuesta sea correcta:"
      },
      {
        "kind": "list",
        "items": [
          "**Precisión lateral**, en millas náuticas.",
          "**Al menos el 95 % del tiempo de vuelo.**",
          "**Por la población de aeronaves** que opera ahí, no por un avión concreto en un instante concreto."
        ]
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "La FAA lo expresa además en términos de error total del sistema, y así es más fácil de decir en una entrevista: en RNAV 1, la aeronave debe mantener un error total del sistema no mayor de 1 NM el 95 % del tiempo total de vuelo; en RNAV 2, no mayor de 2 NM."
      },
      {
        "kind": "sub",
        "text": "La formulación incorrecta que hay que evitar"
      },
      {
        "kind": "p",
        "text": "«RNP 1 significa que puedo desviarme una milla.» Está mal por tres razones, y conviene tenerlas separadas:"
      },
      {
        "kind": "list",
        "items": [
          "No es un permiso de desviación. Es un requisito de performance del sistema, no una tolerancia de pilotaje.",
          "No es un límite duro. Es un valor que se espera conseguir al menos el 95 % del tiempo.",
          "No habla de un avión individual autorizándose a sí mismo, sino de la performance de la población de aeronaves que opera ahí."
        ],
        "ordered": true
      },
      {
        "kind": "p",
        "text": "Y una cuarta, operacional: de todas formas la expectativa es **mantener el eje**. La FAA lo dice para todas las operaciones RNP que cubre: se espera que todos los pilotos mantengan la línea central, según la indican los indicadores de desviación lateral o la guía de vuelo, salvo autorización del ATC para desviarse o condiciones de emergencia."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "El número tiene un efecto directo sobre lo que el piloto ve: en sistemas con escalado, la sensibilidad de la indicación de desviación lateral cambia con el valor aplicable. Una desviación que en ruta es pequeña en la pantalla, en final puede ocupar media escala."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "p",
        "text": "Qué valor aplica al **segmento** que se está volando, no al procedimiento en general. En una misma aproximación el valor cambia entre la aproximación inicial, la final y la frustrada."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Dos, y los dos son de entrevista:"
      },
      {
        "kind": "list",
        "items": [
          "Dar el número sin el 95 %. La respuesta queda incompleta y se nota.",
          "Traducir el número a una tolerancia de pilotaje. La tolerancia de pilotaje es mantener el eje; el número es un requisito de performance del sistema."
        ]
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-06.svg",
        "alt": "Vista en planta de un tramo de ruta. La trayectoria publicada va en magenta por el centro, rotulada CENTERLINE. A cada lado, a 1 NM, una línea de puntos. Un avión algo desplazado del eje, dentro de la franja, rotulado posición real. Al pie: el valor es un requisito de performance del sistema, conseguido al menos el 95 % del tiempo, y la expectativa operacional sigue siendo mantener el eje.",
        "ancho": 1600,
        "alto": 900
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "El número es la precisión de navegación lateral en millas náuticas.",
          "Se espera conseguirla al menos el 95 % del tiempo de vuelo.",
          "Se refiere a la población de aeronaves que opera en ese espacio aéreo, ruta o procedimiento.",
          "No es un permiso de desviación: la expectativa operacional es mantener el eje."
        ]
      }
    ]
  },
  {
    "n": 10,
    "title": "El catálogo de especificaciones",
    "kicker": "P10",
    "minutes": 8,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Las especificaciones que un piloto de aerolínea necesita reconocer, agrupadas por familia."
      },
      {
        "kind": "sub",
        "text": "Especificaciones RNAV"
      },
      {
        "kind": "table",
        "head": [
          "Especificación",
          "Uso principal"
        ],
        "rows": [
          [
            "RNAV 10",
            "Oceánico y remoto continental"
          ],
          [
            "RNAV 5",
            "En ruta"
          ],
          [
            "RNAV 2",
            "En ruta"
          ],
          [
            "RNAV 1",
            "Terminal: SID y STAR, y en ruta cuando corresponda"
          ]
        ]
      },
      {
        "kind": "sub",
        "text": "Especificaciones RNP"
      },
      {
        "kind": "table",
        "head": [
          "Especificación",
          "Uso principal"
        ],
        "rows": [
          [
            "RNP 4",
            "Oceánico y remoto continental"
          ],
          [
            "RNP 2",
            "En ruta, doméstico y oceánico o remoto continental"
          ],
          [
            "RNP 1",
            "Terminal: llegada y salida, e inicial e intermedia de aproximación"
          ],
          [
            "A-RNP",
            "Especificación avanzada, con funciones obligatorias y valores escalables"
          ],
          [
            "RNP APCH",
            "Aproximación"
          ],
          [
            "RNP AR APCH",
            "Aproximación con autorización requerida"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "Existe además RNP 0.3, que en el marco de la FAA se aplica inicialmente a operaciones de helicóptero y no está autorizado para espacio oceánico, remoto ni para el segmento de aproximación final. Para un piloto de avión de transporte es un dato de contexto, no una especificación que vaya a volar."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "La tabla de aplicaciones de la FAA (AC 90-105A, Tabla 5-1) da el valor RNP por fase de vuelo, y vale la pena conocer tres lecturas suyas:"
      },
      {
        "kind": "list",
        "items": [
          "**RNP 1** aplica valor 1 en llegada, aproximación inicial, intermedia, frustrada y salida. En la aproximación final no aplica.",
          "**RNP APCH** aplica valor 1 en la aproximación inicial e intermedia, **0.3 en la final** y vuelve a 1 en la frustrada.",
          "**A-RNP** admite escalado: valor 2 en oceánico y remoto, 2 o 1 en ruta doméstica, y un rango de 1 a 0.3 en llegada, inicial, intermedia, salida y frustrada."
        ]
      },
      {
        "kind": "p",
        "text": "La forma de recordarlo es geométrica: los márgenes se estrechan a medida que el avión se acerca a la pista y se vuelven a abrir en la frustrada."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Nadie memoriza la tabla para volar: se lee la carta. Se memoriza para la entrevista y para tener el criterio de si lo que la carta pide es razonable y qué se necesita para cumplirlo."
      },
      {
        "kind": "p",
        "text": "Lo que sí hay que tener claro en cabina es que **el valor cambia dentro del mismo procedimiento**. Un avión que cumple con holgura en la inicial puede quedarse corto en la final, donde el margen es 0.3."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Qué especificación pide el procedimiento.",
          "Qué valor aplica al segmento en curso.",
          "Si la elegibilidad del avión cubre esa especificación, con las funciones que el procedimiento exija."
        ]
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«RNP solo se usa en aproximaciones.» La tabla lo desmiente: hay RNP en ruta doméstica, en oceánico, en llegada y en salida. Y la inversa también se oye: «en aproximación todo es RNP APCH», ignorando que una aproximación convencional puede llevar segmentos PBN, como una frustrada RNAV, y que en ese caso la capacidad exigida aparece en el recuadro PBN de la carta."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-07.svg",
        "alt": "Tabla de especificaciones por fase de vuelo. RNAV 10 y RNP 4 en oceánico y remoto; RNAV 5 y RNAV 2 en ruta; RNAV 1 en ruta, llegada y salida; RNP 2 en oceánico y en ruta; RNP 1 con valor 1 en llegada, aproximación inicial, intermedia, frustrada y salida; A-RNP con 2 en oceánico, 2 o 1 en ruta, de 1 a 0.3 en llegada, inicial, intermedia, frustrada y salida, y 0.3 en la final; RNP APCH con 1 en inicial e intermedia, 0.3 en la final y 1 en la frustrada; RNP AR APCH de 1 a 0.1, y de 0.3 a 0.1 en la final. Debajo, una franja de aproximación que se estrecha hasta la final y se vuelve a abrir en la frustrada.",
        "ancho": 1600,
        "alto": 1040,
        "pie": "Las filas RNAV muestran el uso principal de cada especificación; las RNP, los valores de la tabla 5-1 de la FAA AC 90-105A. El valor que manda en vuelo es el de la carta."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "RNAV: 10, 5, 2, 1. RNP: 4, 2, 1, A-RNP, RNP APCH y RNP AR APCH.",
          "El valor RNP cambia por fase de vuelo dentro del mismo procedimiento.",
          "En RNP APCH: 1 en inicial e intermedia, 0.3 en final, 1 en la frustrada.",
          "A-RNP escala entre 1 y 0.3 en terminal, y usa 2 en oceánico y remoto."
        ]
      }
    ]
  },
  {
    "n": 11,
    "title": "Cómo sé si mi avión puede",
    "kicker": "P11",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "La pregunta práctica de todo el módulo. Se contesta en tres capas, y hay que recorrerlas en orden porque cada una puede negar lo que la anterior concedió."
      },
      {
        "kind": "sub",
        "text": "Capa 1: elegibilidad de la aeronave"
      },
      {
        "kind": "p",
        "text": "La documentación del avión. El RAC 91 exige que la aeronave cuente con información relativa a las capacidades de especificación de navegación **enumeradas en el manual de vuelo o en otra documentación de la aeronave** aprobada por el Estado de diseño o por la UAEAC. El AIM dice lo mismo desde el lado del piloto: el AFM o los documentos de aviónica deben declarar específicamente las elegibilidades RNP del avión, y si esa información falta o está incompleta, hay que contactar al fabricante."
      },
      {
        "kind": "sub",
        "text": "Capa 2: autorización del operador"
      },
      {
        "kind": "p",
        "text": "El RAC 121 es directo: el explotador **deberá estar autorizado por la UAEAC** para realizar las operaciones en cuestión. Y para las especificaciones con autorización obligatoria (AR), la autoridad emite una aprobación específica."
      },
      {
        "kind": "sub",
        "text": "Capa 3: estado de hoy"
      },
      {
        "kind": "p",
        "text": "La MEL y la infraestructura. El RAC 91 y el RAC 121 exigen que la información sobre las capacidades de especificación de navegación del avión **esté incluida en la MEL**. Y la disponibilidad de la infraestructura necesaria debe confirmarse para el periodo de la operación con toda la información disponible."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Las tres capas responden a tres preguntas distintas que se confunden todo el tiempo:"
      },
      {
        "kind": "table",
        "head": [
          "Pregunta",
          "Dónde se contesta"
        ],
        "rows": [
          [
            "¿Este avión es elegible?",
            "AFM o documentación de aviónica"
          ],
          [
            "¿Mi operador está autorizado?",
            "Especificaciones de operación"
          ],
          [
            "¿Hoy se puede?",
            "MEL, NOTAM y lo que indique el avión"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "Y hay una cuarta, la que más se olvida: **¿tengo la funcionalidad?** Un avión elegible para RNP APCH puede no poder volar un tramo RF, porque en esa especificación la capacidad RF es opcional."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "La tripulación no lee el AFM en la puerta de embarque. Lo que hace es apoyarse en lo que el operador ya resolvió: las especificaciones de operación dicen qué está autorizado, la MEL dice qué queda con el equipo despachado, y el SOP dice cómo verificarlo. El criterio del piloto entra cuando algo no encaja."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Qué pide la carta, incluidas las funciones (tramo RF, escalado, guía vertical).",
          "Qué dice la MEL sobre la capacidad con el equipo que se lleva.",
          "Qué dicen los NOTAM sobre la infraestructura necesaria."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Si cualquiera de las capas falla, el procedimiento no se puede volar. Y hay que decirlo antes, no durante."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«Si el avión es despachable por MEL mantiene todas sus capacidades PBN.» Falso, y es justamente el motivo por el que la norma exige que la MEL lleve la información de capacidad de navegación: un avión puede quedar aeronavegable y despachable, y perder una capacidad PBN concreta."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Tres capas: elegibilidad de la aeronave, autorización del operador y estado de hoy.",
          "La elegibilidad está en el AFM o en la documentación de aviónica, por especificación.",
          "El explotador debe estar autorizado; las especificaciones AR llevan aprobación específica.",
          "La MEL debe incluir la información de capacidad de especificación de navegación."
        ]
      }
    ]
  },
  {
    "n": 12,
    "title": "RNAV 5",
    "kicker": "P12",
    "minutes": 5,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Especificación RNAV de **ruta**, con precisión lateral de 5 NM. Es la más holgada de las que un piloto de aerolínea se encuentra en espacio continental, y por eso es también la que admite más fuentes de posición."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Los códigos de la casilla 18 del plan de vuelo OACI dicen, mejor que ningún texto, qué se admite en RNAV 5:"
      },
      {
        "kind": "table",
        "head": [
          "Código",
          "Significado"
        ],
        "rows": [
          [
            "B1",
            "RNAV 5 con todos los sensores permitidos"
          ],
          [
            "B2",
            "RNAV 5 con GNSS"
          ],
          [
            "B3",
            "RNAV 5 con DME/DME"
          ],
          [
            "B4",
            "RNAV 5 con VOR/DME"
          ],
          [
            "B5",
            "RNAV 5 con INS o IRS"
          ],
          [
            "B6",
            "RNAV 5 con LORAN C"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "Esa lista es lo que hace a RNAV 5 distinta del resto: es la única de la familia donde VOR/DME y los sistemas inerciales aparecen como fuentes declarables por sí solas. Operacionalmente significa que una pérdida de GNSS no necesariamente quita la capacidad RNAV 5, mientras haya otra fuente admitida y declarada."
      },
      {
        "kind": "p",
        "text": "**Verificar:** dónde se aplica RNAV 5 dentro de una FIR concreta se publica en el AIP de ese Estado, en la parte de ruta. Las circulares de la FAA que sirven de base a este módulo no cubren RNAV 5, porque en el espacio aéreo estadounidense la especificación de ruta que se aplica es RNAV 2. No hay que dar por hecho que lo que aplica en un espacio aplica en otro."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Aparece en planificación: la ruta exige la especificación y el despacho declara la capacidad en el plan de vuelo. En cabina no suele pedir nada especial más allá de vigilar la trayectoria, precisamente porque el margen es amplio."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Que la capacidad declarada en el plan corresponde a lo que el avión tiene hoy.",
          "Qué fuente de posición está usando el sistema si se perdió alguna."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Se notifica al ATC y se solicita una autorización alternativa, como en cualquier pérdida de capacidad RNAV."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Suponer que RNAV 5 es «RNAV pero peor». No es peor: es una especificación distinta, para una fase distinta, con una infraestructura distinta. El principio del capítulo 8 se aplica también aquí."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "RNAV 5 es especificación de ruta, con precisión lateral de 5 NM.",
          "Es la que admite más fuentes: GNSS, DME/DME, VOR/DME, INS o IRS, y LORAN C.",
          "Perder GNSS no necesariamente quita la capacidad, si hay otra fuente admitida.",
          "Dónde aplica se publica en el AIP del Estado, no se deduce."
        ]
      }
    ]
  },
  {
    "n": 13,
    "title": "RNAV 1 y RNAV 2",
    "kicker": "P13",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Las dos especificaciones RNAV que más se vuelan en operación regular."
      },
      {
        "kind": "list",
        "items": [
          "**RNAV 1**: típicamente en salidas y llegadas normalizadas, y así aparece en las cartas. La aeronave debe mantener un error total del sistema no mayor de **1 NM el 95 % del tiempo total de vuelo**.",
          "**RNAV 2**: típicamente en ruta, salvo que se especifique otra cosa. Error total del sistema no mayor de **2 NM el 95 % del tiempo total de vuelo**."
        ]
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "Cómo se reconoce que un procedimiento exige RNAV 1"
      },
      {
        "kind": "p",
        "text": "Por la carta. En el espacio aéreo estadounidense, los requisitos PBN de un procedimiento se presentan en un **recuadro de notas normalizado**, el «recuadro PBN», que contiene la especificación del procedimiento y, cuando hace falta, los sensores o la infraestructura necesarios, los requisitos funcionales adicionales, el valor RNP mínimo y las observaciones. Lo que está en ese recuadro es **obligatorio** para volar los elementos PBN del procedimiento. Los requisitos de equipo en tierra o específicos del aeropuerto van en un recuadro aparte, de requisitos de equipo, y cuando hay los dos, el recuadro PBN va primero."
      },
      {
        "kind": "p",
        "text": "Ese formato de dos recuadros es de la FAA. En otras cartas la información puede presentarse en el bloque de notas del procedimiento, y hay que buscarla ahí."
      },
      {
        "kind": "sub",
        "text": "Una exigencia de la salida que se pasa por alto"
      },
      {
        "kind": "p",
        "text": "Para operaciones RNAV en salida hay un requisito de verificación de posición antes de rodar: la posición del avión debe quedar confirmada, y la circular de la FAA fija una tolerancia de 1.000 ft al comenzar la carrera de despegue, con la actualización de pista automática o manual como medio aceptable de cumplimiento. Y en aviones que usan GNSS, la señal debe estar adquirida **antes** de iniciar la carrera."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "RNAV 1 es el pan de cada día de la terminal: se carga la SID, se verifica, se despega y se sigue la trayectoria. RNAV 2 es la ruta."
      },
      {
        "kind": "p",
        "text": "Lo que cambia respecto de una SID convencional es que aquí la trayectoria la construye el FMS a partir de datos codificados, y eso obliga a la verificación que se ve en el capítulo 34."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "El recuadro PBN o las notas de la carta: qué especificación y qué funciones exige.",
          "La posición del avión antes de rodar, dentro de la tolerancia que fije el procedimiento del operador.",
          "Que la señal GNSS esté adquirida antes de iniciar la carrera, si se opera con GNSS."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Sin la capacidad exigida no se vuela el procedimiento: hay que pedir otra autorización antes de salir, no después."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Si la capacidad se pierde en vuelo: notificar la pérdida junto con el curso de acción propuesto, con el formato del capítulo 46."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Creer que «RNAV 1» en la carta describe el avión. Describe **el procedimiento**: es lo que el procedimiento exige. Lo que el avión tiene está en otro documento."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-08.svg",
        "alt": "Recreación de una carta de salida RNAV. Arriba a la derecha, dos recuadros apilados: el recuadro PBN, con RNAV 1 y los sensores admitidos, y debajo el de equipo requerido. En planta, la pista 09 y cuatro waypoints de nombre ficticio unidos por la derrota, con sus rumbos, dos restricciones de altitud y una de velocidad. Cinco números señalan el recuadro PBN, el de equipo, un punto fly-by, una restricción de altitud y la derrota entre dos puntos.",
        "ancho": 1600,
        "alto": 900
      },
      {
        "kind": "list",
        "ordered": true,
        "items": [
          "Aquí está la especificación que exige el procedimiento, y las funciones o sensores que hagan falta. Lo que está en este recuadro es obligatorio para volar los elementos PBN.",
          "Los requisitos de equipo en tierra o específicos del aeropuerto van aparte. Cuando hay los dos, el recuadro PBN va primero.",
          "El símbolo dice si el punto se sobrevuela o si el giro se anticipa. Cambia la trayectoria real del avión.",
          "La restricción es parte del procedimiento y hay que verificarla cargada en el FMS, no solo leída en la carta.",
          "La derrota publicada es la referencia contra la que se compara lo que muestra el FMS."
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "RNAV 1: terminal, error total del sistema no mayor de 1 NM el 95 % del tiempo. RNAV 2: ruta, 2 NM.",
          "En cartas de la FAA, los requisitos PBN van en un recuadro normalizado y son obligatorios.",
          "En salida hay que confirmar la posición del avión antes de rodar, y con GNSS la señal debe estar adquirida antes de la carrera.",
          "La especificación de la carta describe el procedimiento, no el avión."
        ]
      }
    ]
  },
  {
    "n": 14,
    "title": "RNP 1",
    "kicker": "P14",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Especificación RNP de terminal. Requiere un valor de precisión lateral de **1** en llegada y salida, y en las fases inicial e intermedia de aproximación cuando se usa en procedimientos convencionales con segmentos PBN: por ejemplo, un ILS con un tramo de alimentación, un punto de aproximación inicial o una frustrada de tipo PBN."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "La diferencia con RNAV 1, otra vez"
      },
      {
        "kind": "p",
        "text": "Mismo número, misma precisión lateral, distinta familia: RNP 1 incluye control y alerta de la performance a bordo y RNAV 1 no. Y la elegibilidad no se hereda: ser elegible para RNP 1 no da RNAV 1 ni RNP 2."
      },
      {
        "kind": "sub",
        "text": "La trampa del tramo RF"
      },
      {
        "kind": "p",
        "text": "La capacidad de volar un tramo RF es **opcional** en la elegibilidad RNP 1. Esto significa, con las palabras del AIM, que el avión puede ser elegible para operaciones RNP 1 y no poder volar un tramo RF salvo que los tramos RF estén específicamente listados como una característica del equipo de aviónica."
      },
      {
        "kind": "p",
        "text": "Es la razón por la que dos aviones de la misma flota, con la misma elegibilidad en el papel, pueden no poder volar el mismo procedimiento."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "RNP 1 aparece en SID y STAR de terminales exigentes y en segmentos PBN colgados de procedimientos convencionales. La consecuencia de cabina es que en esos procedimientos el avión vigila su propia performance, y por tanto **hay un aviso posible** que en una SID RNAV 1 no existiría."
      },
      {
        "kind": "p",
        "text": "Saber dónde se presenta ese aviso en la flota que se vuela es parte del trabajo, y está en el FCOM y en el QRH, no en la norma."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Si el procedimiento pide RNP 1 o RNAV 1: no es lo mismo.",
          "Si el procedimiento incluye un tramo RF y si el avión lo tiene listado como capacidad.",
          "Qué indica el sistema sobre la performance durante el procedimiento."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Si el avión no es elegible, o le falta la funcionalidad que el procedimiento exige, el procedimiento no se vuela. Si la capacidad se pierde en vuelo, se notifica al ATC con el curso de acción propuesto."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«Si soy RNP 1, soy RNAV 1 con holgura.» No: son elegibilidades separadas y se listan por separado. Y el error gemelo: suponer que un avión RNP 1 puede volar cualquier tramo RF."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "RNP 1 exige precisión lateral de 1 en llegada, salida e inicial e intermedia de aproximación en procedimientos con segmentos PBN.",
          "Incluye control y alerta a bordo; RNAV 1 no.",
          "La capacidad de tramo RF es opcional: hay que verla listada como característica del equipo.",
          "Las elegibilidades no se heredan entre especificaciones."
        ]
      }
    ]
  },
  {
    "n": 15,
    "title": "RNP 2, RNP 4, RNAV 10 y A-RNP",
    "kicker": "P15",
    "minutes": 9,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Las especificaciones de ruta que quedan, y las dos que más confunden: una por su nombre y la otra por su alcance."
      },
      {
        "kind": "list",
        "items": [
          "**RNP 2**: operaciones **domésticas y oceánicas o remotas**, con valor de precisión lateral 2.",
          "**RNP 4**: **solo** oceánicas y remotas, con valor 4.",
          "**RNAV 10**: ciertas operaciones oceánicas y remotas, con valor 10. Se sigue llamando RNP 10 en el plan de vuelo.",
          "**A-RNP**: *Advanced RNP*, una especificación con funciones obligatorias habilitadas en la aviónica."
        ]
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "La única herencia que existe"
      },
      {
        "kind": "p",
        "text": "**La elegibilidad RNP 4 confiere automáticamente la elegibilidad RNP 10.** Es una de las pocas herencias que hay, y precisamente por ser excepción hay que saberla, para no generalizarla: entre RNP 1, RNP 2, RNAV 1 y RNAV 2 no hay herencia alguna."
      },
      {
        "kind": "sub",
        "text": "RNAV 10, que se sigue llamando RNP 10"
      },
      {
        "kind": "p",
        "text": "En ese espacio aéreo la especificación que se aplica es RNAV 10, así que toda aeronave elegible para RNP 10 se considera elegible para operaciones RNAV 10. El nombre antiguo sobrevive en el plan de vuelo: el código de la casilla 18 es `A1`, y su texto literal es «RNAV 10 (RNP 10)»."
      },
      {
        "kind": "p",
        "text": "El motivo de fondo es el del capítulo 8: RNP quedó reservado a especificaciones con control y alerta de la performance, y esta no lo tiene. Por eso se renombró a RNAV 10 sin que el nombre viejo desapareciera de la documentación."
      },
      {
        "kind": "sub",
        "text": "A-RNP, y el límite de lo que agrupa"
      },
      {
        "kind": "p",
        "text": "En el marco de la FAA, las funciones mínimas **obligatorias** de A-RNP incluyen:"
      },
      {
        "kind": "list",
        "items": [
          "Calcular y volar tramos RF.",
          "RNP escalable.",
          "Generación de trayectoria paralela desplazada (*parallel offset*)."
        ]
      },
      {
        "kind": "p",
        "text": "Lo interesante de A-RNP para un piloto de aerolínea es que agrupa: normalmente, una aeronave elegible para A-RNP también será elegible para RNP APCH, RNP y RNAV 1, RNP y RNAV 2, RNP 4, y RNP y RNAV 10."
      },
      {
        "kind": "p",
        "text": "Y lo que hay que tener muy claro es el límite de ese agrupamiento: **una aeronave elegible para A-RNP no es automáticamente elegible para RNP AR APCH ni para RNP AR DP**, porque la elegibilidad RNP AR exige un proceso de determinación separado y una autorización especial."
      },
      {
        "kind": "p",
        "text": "Sobre los valores: A-RNP permite valores laterales escalables en terminal, 1.0 o 0.3, y el uso de esas precisiones reducidas normalmente exige el piloto automático, el director de vuelo, o ambos. Puede exigirse mayor continuidad, por ejemplo sistemas duales, para cierto espacio oceánico y remoto."
      },
      {
        "kind": "sub",
        "text": "Qué cambia en oceánico y remoto"
      },
      {
        "kind": "p",
        "text": "Lo que cambia no es el concepto, es el contexto: sin vigilancia radar continua y con comunicaciones que pueden no ser directas, el avión y la tripulación son la primera línea de detección. Por eso estas especificaciones suelen venir acompañadas de requisitos de continuidad, es decir, de redundancia de equipo."
      },
      {
        "kind": "p",
        "text": "Este módulo no es un módulo oceánico. Lo que el piloto necesita llevarse es esto: el valor es 2, 4 o 10, la aplicación es de ruta, y la exigencia práctica se concentra en continuidad y en procedimientos de contingencia."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "En la planificación, la especificación de la ruta determina qué se declara en el plan de vuelo: `L1` para RNP 4, `A1` para RNAV 10. En vuelo, se vigila la trayectoria y se atiende cualquier aviso de performance."
      },
      {
        "kind": "p",
        "text": "A-RNP es una especificación de flota moderna y su ventaja es administrativa y operacional a la vez: una elegibilidad que cubre varias especificaciones simplifica el papeleo y amplía lo que se puede volar. Lo que no simplifica es RNP AR, que sigue siendo una puerta aparte."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Qué especificación exige la ruta, según el AIP o la documentación de ruta del operador.",
          "Que la capacidad declarada corresponde al equipo de hoy.",
          "Si la elegibilidad de la flota es A-RNP y qué especificaciones cubre en la práctica.",
          "Si el procedimiento requiere una precisión reducida y, con ella, el uso del piloto automático o del director de vuelo.",
          "Que no se asume RNP AR por tener A-RNP.",
          "Los procedimientos de contingencia del operador para esa área."
        ]
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Las tripulaciones deben avisar al ATC de cualquier deterioro o falla del equipo de navegación, y de cualquier desviación requerida por un procedimiento de contingencia. Esa obligación aparece expresamente en los apéndices de RNP 2 y RNP 4 de la circular de la FAA."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Cuatro, y los cuatro aparecen en entrevista:"
      },
      {
        "kind": "list",
        "items": [
          "Tratar RNP 2 como «solo oceánico». Se aplica también a ruta doméstica.",
          "Tratar RNP 4 como «RNP 2 con más margen»: son especificaciones distintas, con aplicaciones distintas.",
          "«RNP 10 es una especificación RNP.» El nombre lo sugiere y la norma dice lo contrario: no tiene control y alerta, y por eso hoy es RNAV 10.",
          "«Con A-RNP puedo volar RNP AR.» No: exige determinación separada y autorización especial."
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "RNP 2: ruta doméstica y oceánica o remota, valor 2. RNP 4: solo oceánica y remota, valor 4.",
          "La elegibilidad RNP 4 confiere automáticamente RNP 10. Es la excepción, no la regla.",
          "RNAV 10 conserva el nombre RNP 10 en el plan de vuelo, con el código `A1`.",
          "A-RNP exige funciones obligatorias: tramos RF, RNP escalable y trayectoria paralela desplazada.",
          "A-RNP no confiere elegibilidad RNP AR: eso va por determinación separada y autorización especial.",
          "Hay que avisar al ATC de cualquier deterioro o falla del equipo de navegación."
        ]
      }
    ]
  },
  {
    "n": 16,
    "title": "RNP APCH",
    "kicker": "P16",
    "minutes": 9,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "RNP Approach. La especificación RNP de aproximación, y la que un piloto de aerolínea vuela más veces en su carrera. Su valor de precisión lateral es **1** en los segmentos de terminal y en la frustrada, y escala a **0.3** en la aproximación final."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "Qué se junta en una RNP APCH"
      },
      {
        "kind": "p",
        "text": "Cinco piezas que trabajan a la vez, y cada una puede caerse por separado:"
      },
      {
        "kind": "list",
        "items": [
          "**GNSS**, como fuente de posición lateral, con o sin aumentación satelital.",
          "**FMS**, que construye la trayectoria y vigila la performance.",
          "**Base de datos de navegación**, de donde sale el procedimiento codificado.",
          "**Guía lateral** siempre, y **guía vertical** cuando la línea de mínimos la tenga.",
          "**Líneas de mínimos**, que son varias en una misma carta y no todas utilizables por todos los aviones."
        ]
      },
      {
        "kind": "sub",
        "text": "El título de la carta: aquí las autoridades no coinciden"
      },
      {
        "kind": "p",
        "text": "Esto se pregunta y hay que decirlo con precisión, sin mezclar:"
      },
      {
        "kind": "table",
        "head": [
          "Marco",
          "Cómo se titula"
        ],
        "rows": [
          [
            "FAA",
            "Los procedimientos RNP APCH se titulan **RNAV (GPS) RWY XX**"
          ],
          [
            "FAA, RNP AR",
            "Se titulan **RNAV (RNP) RWY XX**"
          ],
          [
            "Internacional",
            "Los RNP AR pueden encontrarse titulados **RNP RWY XX (AR)**"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "De ahí sale una advertencia práctica: el título no basta para saber qué exige el procedimiento. **Lo que exige está en las notas y en el recuadro PBN**, y en el caso de RNP AR, además, la carta dice expresamente «Authorization Required»."
      },
      {
        "kind": "p",
        "text": "**Verificar:** cómo se titulan los procedimientos PBN en Colombia hay que leerlo en la carta publicada en el AIP Colombia del aeropuerto de que se trate. No se debe suponer la convención de la FAA ni la internacional sin mirar."
      },
      {
        "kind": "sub",
        "text": "La capacidad de tramo RF, otra vez opcional"
      },
      {
        "kind": "p",
        "text": "En RNP APCH la capacidad de volar un tramo RF es **opcional**. Elegible para RNP APCH no significa poder volar un RF: los tramos RF tienen que estar listados como característica del equipo."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "La preparación de una RNP APCH tiene una secuencia que conviene tener automatizada:"
      },
      {
        "kind": "list",
        "items": [
          "Confirmar la disponibilidad de la infraestructura de navegación para el periodo previsto, incluida la integridad del GNSS, con toda la información disponible.",
          "Comprobar el ciclo de la base de datos.",
          "Cargar el procedimiento desde la base de datos, nunca a mano.",
          "Verificar procedimiento, pista, transición, secuencia de puntos, derrotas y restricciones contra la carta.",
          "Decidir a qué línea de mínimos se va y confirmar que el avión y el operador la pueden usar.",
          "Confirmar el ajuste altimétrico local."
        ],
        "ordered": true
      },
      {
        "kind": "sub",
        "text": "Durante el procedimiento"
      },
      {
        "kind": "p",
        "text": "Dos exigencias concretas de la circular de la FAA que valen como conocimiento de entrevista:"
      },
      {
        "kind": "list",
        "items": [
          "Confirmar que el sistema ha iniciado la transición de modo terminal a modo aproximación **2 NM antes del punto de aproximación final**.",
          "Tener seleccionadas las presentaciones que permitan vigilar la derrota calculada y la posición del avión respecto de la trayectoria, es decir, la desviación lateral (XTK), para vigilar el error técnico de vuelo."
        ]
      },
      {
        "kind": "p",
        "text": "Y la expectativa de fondo: mantener el eje del procedimiento según lo indican los indicadores de desviación lateral o la guía de vuelo, salvo autorización del ATC o emergencia."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Disponibilidad de infraestructura e integridad GNSS para el periodo de la operación, incluidas las contingencias no RNP.",
          "Vigencia de la base de datos.",
          "Procedimiento, pista, transición, puntos, derrotas, restricciones.",
          "La transición a modo aproximación antes del FAF.",
          "El ajuste altimétrico local.",
          "La línea de mínimos que el avión y el operador pueden usar."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Se pierde la capacidad RNP APCH. La circular de la FAA define esa pérdida de forma amplia y útil: **cualquier falla o suceso que haga que la aeronave deje de satisfacer los requisitos RNP APCH del procedimiento**. Y pide que el operador desarrolle procedimientos de contingencia para reaccionar con seguridad si la capacidad se pierde durante la aproximación."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "El piloto debe notificar al ATC cualquier pérdida de la capacidad RNP APCH, junto con el curso de acción propuesto, y si no puede cumplir los requisitos del procedimiento, debe avisar al servicio de tránsito aéreo lo antes posible."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«RNAV approach y RNP approach son siempre exactamente lo mismo.» No. El título de la carta responde a la convención de cada autoridad, y lo que el procedimiento exige está en las notas. Hay procedimientos titulados RNAV que exigen RNP APCH, y en el marco de la FAA es lo normal."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-09.svg",
        "alt": "Recreación de una carta de aproximación RNP a la pista 09: título arriba, recuadro PBN a la derecha, vista en planta con IAF, dos puntos intermedios, FAF, pista y frustrada hacia un circuito de espera, perfil vertical con la altitud del FAF y la DA, y abajo la caja de mínimos con tres líneas y el bloque de notas. Seis números señalan el título, el recuadro PBN, el FAF, la frustrada, la caja de mínimos y las notas.",
        "ancho": 1600,
        "alto": 1000
      },
      {
        "kind": "list",
        "ordered": true,
        "items": [
          "El título sigue la convención de la autoridad que publica. No dice por sí solo qué exige el procedimiento.",
          "Aquí está la especificación exigida, los sensores o funciones necesarios y el valor RNP mínimo cuando aplique. Es obligatorio.",
          "2 NM antes de este punto hay que haber confirmado que el sistema pasó a modo aproximación.",
          "La frustrada también tiene requisito de navegación, y puede exigir una capacidad que el avión no tenga aunque tenga la de la aproximación.",
          "Hay varias líneas y no todas son utilizables por todos los aviones. La que se usa depende de la capacidad del avión, el equipo operativo y la autorización del operador.",
          "Aquí aparecen las limitaciones, incluida la de temperatura cuando la línea de mínimos es de guía vertical barométrica."
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "RNP APCH: valor 1 en terminal y frustrada, 0.3 en la aproximación final.",
          "La FAA titula los RNP APCH como RNAV (GPS) RWY XX y los RNP AR como RNAV (RNP) RWY XX; internacionalmente los RNP AR pueden aparecer como RNP RWY XX (AR).",
          "El título no dice qué exige el procedimiento: eso está en las notas y en el recuadro PBN.",
          "La transición a modo aproximación se confirma 2 NM antes del FAF.",
          "La capacidad de tramo RF es opcional en RNP APCH."
        ]
      }
    ]
  },
  {
    "n": 17,
    "title": "Las líneas de mínimos",
    "kicker": "P17",
    "minutes": 8,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Una misma carta de aproximación PBN puede publicar **varias líneas de mínimos**, y no todas son utilizables por todos los aviones. Esta es una de las decisiones de cabina más concretas del módulo: a qué línea se va."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "En el marco de la FAA, una carta RNAV (GPS) puede traer hasta cuatro líneas, más la de circling:"
      },
      {
        "kind": "table",
        "head": [
          "Línea",
          "Qué es",
          "A qué se vuela"
        ],
        "rows": [
          [
            "LNAV",
            "Solo navegación lateral",
            "MDA"
          ],
          [
            "LNAV/VNAV",
            "Lateral más guía vertical, normalmente Baro-VNAV aprobado para aproximación, o vertical satelital",
            "DA"
          ],
          [
            "LPV",
            "*Localizer performance with vertical guidance*, aprovecha la precisión de la aumentación satelital",
            "DA"
          ],
          [
            "LP",
            "*Localizer performance*, lateral con sensibilidad angular, sin guía vertical",
            "MDA"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "Y una precisión que conviene saber porque ordena el mapa mental: LNAV/VNAV y LPV son **aproximaciones con guía vertical (APV)**, es decir, aproximaciones basadas en un sistema que no tiene por qué cumplir los patrones de aproximación de precisión pero que sí da información de desviación de rumbo y de senda."
      },
      {
        "kind": "sub",
        "text": "Tres reglas que se preguntan"
      },
      {
        "kind": "list",
        "items": [
          "Para volar a mínimos LPV o LP hace falta aumentación satelital: son líneas que exigen SBAS.",
          "**LP no es un modo degradado de LPV.** LP solo se publica cuando el terreno, los obstáculos u otra razón impiden publicar un procedimiento con guía vertical, y nunca aparece junto a una línea con guía vertical aprobada.",
          "Los mínimos de circling pueden ser más bajos que la línea LNAV/VNAV, pero **nunca** más bajos que la línea LNAV recta."
        ]
      },
      {
        "kind": "sub",
        "text": "Qué decide a qué línea se va"
      },
      {
        "kind": "p",
        "text": "Cinco cosas, y hay que revisarlas todas:"
      },
      {
        "kind": "list",
        "items": [
          "La capacidad de la aeronave, declarada en el AFM.",
          "El estado del equipo hoy.",
          "La autorización del operador.",
          "Las restricciones de temperatura, cuando la línea es de guía vertical barométrica.",
          "El ajuste altimétrico disponible."
        ]
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "El briefing de aproximación incluye decir en voz alta a qué línea se va y por qué, y qué línea es la alternativa si algo se cae. No es un formalismo: si a mitad de la aproximación se pierde la guía vertical, la pregunta «¿a qué mínimos voy ahora?» ya tiene que estar contestada."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Qué líneas publica la carta.",
          "Cuál puede usar este avión, con este equipo, hoy.",
          "Qué limitaciones acompañan a esa línea.",
          "Qué línea queda como alternativa."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Volar a una línea de mínimos que el avión o el operador no pueden usar es descender por debajo de un mínimo que no aplica. En el marco de la FAA, una autorización del ATC para el procedimiento autoriza a un piloto debidamente certificado a usar los mínimos para los que la aeronave está certificada: la autorización no habilita una línea que el avión no puede usar."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«Si la carta publica LPV, puedo volar LPV.» No: la línea existe en la carta, la capacidad está en el avión. Y el gemelo: suponer que LNAV/VNAV, LPV y Baro-VNAV son lo mismo. LNAV/VNAV es una línea de mínimos; Baro-VNAV es una forma de generar la guía vertical; LPV es otra línea, que exige aumentación satelital."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-10.svg",
        "alt": "Recreación de una caja de mínimos de una aproximación RNP con cuatro líneas y columnas por categoría de aeronave A, B, C y D. LPV con DA 1450 (250) y 750 m; LNAV/VNAV con DA 1560 (360) y 1200 m; LNAV con MDA 1620 (420); y circuito, con MDA de 1620 a 1900 según la categoría. Cuatro números señalan cada línea. Las cifras son ilustrativas.",
        "ancho": 1600,
        "alto": 900,
        "pie": "Cifras ilustrativas, para un aeródromo de 1200 ft de elevación. Las alturas y visibilidades mínimas de circuito por categoría siguen el patrón de los PANS-OPS; las de una carta real se leen en la carta."
      },
      {
        "kind": "list",
        "ordered": true,
        "items": [
          "Exige aumentación satelital. Se vuela a DA. Si el avión no la tiene aprobada, esta línea no es utilizable aunque esté publicada.",
          "Guía vertical, normalmente Baro-VNAV aprobado para aproximación. Se vuela a DA y está sujeta a la limitación de temperatura publicada.",
          "Solo lateral. Se vuela a MDA. Es la línea a la que se degrada la operación cuando la guía vertical no está disponible o la temperatura está fuera de límites.",
          "Puede ser más bajo que LNAV/VNAV, pero nunca más bajo que la LNAV recta."
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Una carta PBN puede publicar LNAV, LNAV/VNAV, LPV y LP, más circling.",
          "LNAV/VNAV y LPV son aproximaciones con guía vertical (APV) y se vuelan a DA; LNAV y LP, a MDA.",
          "LPV y LP exigen aumentación satelital. LP no es un modo degradado de LPV.",
          "La línea utilizable la deciden la capacidad del avión, el equipo de hoy, la autorización del operador, la temperatura y el ajuste altimétrico."
        ]
      }
    ]
  },
  {
    "n": 18,
    "title": "BARO-VNAV y el ajuste altimétrico",
    "kicker": "P18",
    "minutes": 9,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "*Barometric Vertical Navigation*. Es la forma de generar guía vertical a partir de información barométrica de altitud, y es la que normalmente sostiene la línea de mínimos LNAV/VNAV."
      },
      {
        "kind": "p",
        "text": "Lo importante para el piloto no es cómo se calcula la senda, sino de qué depende: de la **presión**. Y de ahí sale todo lo demás, porque el ajuste altimétrico deja de ser un dato de altimetría y pasa a ser **la referencia de la que cuelga la trayectoria vertical**. Un QNH equivocado desplaza la senda entera."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Tres reglas de la circular de la FAA que definen la operación con Baro-VNAV, y las tres se preguntan:"
      },
      {
        "kind": "sub",
        "text": "El ajuste altimétrico tiene que ser local"
      },
      {
        "kind": "p",
        "text": "**El uso de Baro-VNAV hasta una DA no está autorizado con un ajuste altimétrico remoto.** Se requiere un ajuste altimétrico actual del aeropuerto de aterrizaje. Donde se publican mínimos con altímetro remoto, la función VNAV puede usarse, pero **solo hasta la MDA de LNAV** publicada."
      },
      {
        "kind": "p",
        "text": "Y una consecuencia del mismo principio: cuando el ajuste altimétrico en que se basa la aproximación **no está disponible, la aproximación no está autorizada**."
      },
      {
        "kind": "p",
        "text": "Hay una cuarta regla que ordena la práctica: los mínimos de una aproximación se basan en el ajuste altimétrico local de ese aeropuerto salvo que la carta anote otra cosa. Cuando se autoriza más de una fuente y los mínimos difieren, la carta lo indica con renglones separados en la caja de mínimos o con una nota, y los mínimos pueden ser más altos con una fuente no local."
      },
      {
        "kind": "sub",
        "text": "Hay que verificar el ajuste antes del FAF"
      },
      {
        "kind": "p",
        "text": "Los pilotos deben verificar que el altímetro local actual del aeropuerto de aterrizaje previsto está puesto **no más tarde del punto de aproximación final**. Después del FAF ya se está descendiendo sobre una senda que depende de ese ajuste."
      },
      {
        "kind": "sub",
        "text": "El modo vertical importa"
      },
      {
        "kind": "p",
        "text": "Hay que conocer la selección del modo vertical adecuado, el que manda la trayectoria vertical publicada. Otros modos verticales, como velocidad vertical, **no** son aplicables a una aproximación Baro-VNAV."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "En la práctica, la operación LNAV/VNAV con Baro-VNAV tiene tres puntos de fallo que la tripulación controla: el ajuste altimétrico, la temperatura y el modo vertical. Los tres se verifican en el briefing y se vuelven a mirar antes del FAF."
      },
      {
        "kind": "p",
        "text": "El QNH llega por ATIS o por el ATC, y el riesgo real es de gestión: ponerlo tarde, poner el del aeropuerto equivocado en una zona con varios aeródromos cercanos, o quedarse con un valor viejo en una situación de presión cambiando rápido. El contraste entre ambos pilotos es la defensa, y el momento es antes del FAF."
      },
      {
        "kind": "p",
        "text": "Y la acción en el mínimo es la de siempre: volar la trayectoria vertical publicada y ejecutar la frustrada al llegar a la DA, salvo que estén presentes las referencias visuales exigidas para continuar."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Que el ajuste altimétrico es local, del aeropuerto de aterrizaje, y actual.",
          "Que está puesto en los dos altímetros no más tarde del FAF.",
          "Qué dice la carta si se está usando una fuente de ajuste no local.",
          "Que la temperatura está dentro de los límites publicados (capítulo 19).",
          "Que el modo vertical seleccionado es el que sigue la trayectoria publicada."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Con ajuste remoto no se puede ir a la DA de LNAV/VNAV: se vuela a la MDA de LNAV. Sin el ajuste en que se basa la aproximación, la aproximación no está autorizada. Y con un ajuste equivocado la senda barométrica queda desplazada respecto de la publicada, en el sentido y la magnitud que corresponda al error."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Si hay duda sobre el valor del ajuste, se pide confirmación. Es una petición de rutina que no cuesta nada y que resuelve el problema antes de que sea una desviación."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Dos:"
      },
      {
        "kind": "list",
        "items": [
          "Usar velocidad vertical para «seguir» la senda. No es un modo aplicable a una aproximación Baro-VNAV, y lo que se consigue es volar una trayectoria parecida a la publicada, que no es lo mismo que volar la publicada.",
          "Tratar el QNH como un dato de altímetro nada más. En una LNAV/VNAV es también un dato de trayectoria: es lo que hace que la senda del FMS coincida con la del procedimiento."
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Baro-VNAV genera guía vertical a partir de información barométrica: depende de la presión, y el ajuste altimétrico es la referencia de la trayectoria vertical.",
          "Hasta una DA exige ajuste altimétrico local y actual; con ajuste remoto solo se puede usar hasta la MDA de LNAV.",
          "Si el ajuste en que se basa la aproximación no está disponible, la aproximación no está autorizada.",
          "El altímetro local se verifica puesto no más tarde del FAF.",
          "El modo vertical tiene que ser el que sigue la trayectoria publicada, no velocidad vertical."
        ]
      }
    ]
  },
  {
    "n": 19,
    "title": "Temperatura y la trayectoria barométrica",
    "kicker": "P19",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "La temperatura no estándar tiene un efecto pronunciado sobre los sistemas Baro-VNAV. Por eso las aproximaciones con línea de mínimos LNAV/VNAV llevan **una limitación de temperatura baja y alta**, y esa limitación aparece como una **nota en el procedimiento**."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "La regla"
      },
      {
        "kind": "p",
        "text": "Los sistemas Baro-VNAV **sin compensación** no pueden operar hasta la DA de LNAV/VNAV cuando la temperatura real está por debajo o por encima de las limitaciones de temperatura publicadas."
      },
      {
        "kind": "p",
        "text": "Dicho en términos de cabina, y así lo formula el AIM: la línea LNAV/VNAV no puede usarse sin una función automática aprobada de compensación de temperatura si la temperatura está fuera del rango de la limitación Baro-VNAV. **La línea LNAV sí puede usarse.**"
      },
      {
        "kind": "sub",
        "text": "Las dos excepciones"
      },
      {
        "kind": "list",
        "items": [
          "Si la aeronave tiene capacidad de compensación de temperatura, hay que seguir las instrucciones del fabricante para el uso de la función Baro-VNAV.",
          "La limitación de temperatura publicada **no aplica** a los pilotos que operan una aeronave con aprobación de aeronavegabilidad para volar la aproximación a mínimos LNAV/VNAV **usando guía vertical satelital**. La razón es la que ordena todo el capítulo: el problema es de la presión, y esa aproximación no depende de la presión para la senda."
        ]
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "El briefing de una LNAV/VNAV en un aeropuerto frío incluye leer la nota de temperatura y compararla con la temperatura real. La decisión que sale de ahí es binaria: o se va a la DA de LNAV/VNAV, o se va a la MDA de LNAV."
      },
      {
        "kind": "p",
        "text": "Lo que nunca corresponde es volar a la DA suponiendo que el margen de la nota es conservador. La nota es parte del procedimiento, como una altitud mínima."
      },
      {
        "kind": "p",
        "text": "**No inventes límites.** El valor concreto está en la carta de ese procedimiento y solo ahí. No hay un número general para memorizar."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "La nota de limitación de temperatura del procedimiento.",
          "La temperatura real en el aeropuerto.",
          "Si la aeronave tiene compensación automática aprobada, y qué dice el fabricante sobre su uso.",
          "Si la aproximación se va a volar con guía vertical satelital, caso en que la limitación no aplica."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Con temperatura fuera de límites y sin compensación, la DA de LNAV/VNAV no está disponible. Volar a ella es descender por debajo de un mínimo que en esas condiciones no protege lo que debía proteger."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Creer que la limitación es una advertencia de confort del equipo. No lo es: es una limitación del procedimiento, y la alternativa (la MDA de LNAV) es la respuesta correcta y está publicada en la misma carta."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-11.svg",
        "alt": "Perfil de una aproximación final. Desde el FAF a la pista, una senda continua rotulada trayectoria en condición estándar y, por debajo, una senda de puntos rotulada efecto conceptual de aire más frío que el estándar. Las dos coinciden en el umbral y se separan con la altura; entre ellas, a la altura del FAF, una cota sin cifra: la magnitud está en la nota de la carta. Bajo la senda fría hay un obstáculo con menos margen del diseñado.",
        "ancho": 1600,
        "alto": 900
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "La temperatura no estándar afecta de forma pronunciada la guía vertical barométrica.",
          "Las líneas LNAV/VNAV llevan limitación de temperatura baja y alta, publicada como nota del procedimiento.",
          "Sin compensación aprobada y con temperatura fuera de rango, la DA de LNAV/VNAV no se usa; la MDA de LNAV sí.",
          "La limitación no aplica si la aproximación a LNAV/VNAV se vuela con guía vertical satelital y el avión tiene esa aprobación."
        ]
      }
    ]
  },
  {
    "n": 20,
    "title": "Volar a una MDA: el descenso continuo",
    "kicker": "P20",
    "minutes": 8,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Los tres capítulos anteriores terminan en la misma respuesta: cuando la guía vertical no está disponible, cuando el ajuste es remoto o cuando la temperatura queda fuera del límite publicado, **se vuela a la MDA de LNAV**. Este capítulo es el que falta: cómo se vuela eso."
      },
      {
        "kind": "p",
        "text": "Porque una MDA no es una DA. El RAC la define como la altitud «por debajo de la cual no debe efectuarse el descenso sin la referencia visual requerida». En una DA se decide *al llegar*; en una MDA no se puede bajar de ahí sin ver. Son dos operaciones distintas con dos técnicas distintas."
      },
      {
        "kind": "p",
        "text": "La técnica que las aerolíneas usan para el tramo final de un procedimiento que no es de precisión tiene nombre en la norma colombiana:"
      },
      {
        "kind": "quote",
        "text": "**Aproximación final en descenso continuo (CDFA).** Técnica de vuelo congruente con los procedimientos de aproximación estabilizada, para el tramo de aproximación final (FAS) siguiendo los procedimientos de aproximación por instrumentos que no es de precisión (NPA) en descenso continuo, **sin nivelaciones de altura**, desde una altitud/altura igual o superior a la altitud/altura del punto de referencia de aproximación final hasta un punto a aproximadamente 15 m (50 ft) por encima del umbral de la pista de aterrizaje o hasta el punto en el que comienza la maniobra de nivelada para el aterrizaje."
      },
      {
        "kind": "p",
        "text": "Es decir: lo contrario de la escalera. En vez de descender a cada altitud mínima y nivelar hasta el siguiente punto, se calcula una senda y se baja una sola vez."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "Por qué esto es un tema de PBN"
      },
      {
        "kind": "p",
        "text": "Una RNP APCH volada a mínimos LNAV **es un procedimiento que no es de precisión**. El RAC clasifica los NPA como procedimientos diseñados para operaciones de aproximación por instrumentos **2D de tipo A**, y reserva las 3D para las APV y las de precisión. Así que la línea de mínimos que se elija en el capítulo 17 decide también qué técnica de vuelo aplica en el final."
      },
      {
        "kind": "sub",
        "text": "La clasificación que se pregunta"
      },
      {
        "kind": "p",
        "text": "Aquí está el dato que separa a quien estudió, y está en una nota literal del RAC 91 y del RAC 121:"
      },
      {
        "kind": "table",
        "head": [
          "Cómo se vuela la CDFA",
          "Qué operación es"
        ],
        "rows": [
          [
            "Con **guía VNAV de asesoramiento** calculada por el equipo de a bordo",
            "Operación de aproximación por instrumentos **3D**"
          ],
          [
            "Con **cálculo manual** de la velocidad vertical de descenso requerida",
            "Operación de aproximación por instrumentos **2D**"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "Ojo con la trampa: que la operación sea 3D **no convierte el procedimiento en una APV ni cambia el mínimo**. El procedimiento sigue siendo un NPA y se sigue volando a la MDA. Lo que cambia es cómo se clasifica la operación."
      },
      {
        "kind": "p",
        "text": "El propio RAC remite a los PANS-OPS (Documento OACI 8168), Volumen I, Parte II, Sección 5, para más información sobre las CDFA. Ese documento no es de acceso público, así que aquí se cita lo que el RAC reproduce."
      },
      {
        "kind": "sub",
        "text": "La guía vertical de asesoramiento es de asesoramiento"
      },
      {
        "kind": "p",
        "text": "En el marco de la FAA, muchos NPA publican un ángulo de descenso vertical (VDA). Tres cosas que dice la circular del AIM y que hay que tener claras:"
      },
      {
        "kind": "list",
        "items": [
          "El VDA es **información de asesoramiento solamente** y no debe considerarse guía vertical derivada del procedimiento. Su única función es ayudar a establecer un descenso continuo y estabilizado en la final.",
          "El VDA **no garantiza el franqueamiento de obstáculos por debajo de la MDA** en el segmento visual. Y su presencia **no cambia ninguno de los requisitos** del procedimiento que no es de precisión.",
          "Cuando hay una penetración de obstáculo que obligaría a desviarse del VDA entre la MDA y la toma, el VDA se sustituye en la carta por la nota **«Visual Segment – Obstacles»**. Quien siga bajando por el ángulo que le dibuja el sistema, por debajo de la MDA y en un procedimiento con esa nota, puede encontrarse el obstáculo."
        ]
      },
      {
        "kind": "p",
        "text": "Dicho de otro modo: la senda de asesoramiento sirve para llegar ordenado a la MDA. Por debajo de la MDA, el franqueamiento lo pone el piloto con la vista."
      },
      {
        "kind": "sub",
        "text": "Dónde empieza el descenso visual"
      },
      {
        "kind": "p",
        "text": "El **punto de descenso visual (VDP)**, marcado con la letra (V), es el punto de la final desde el cual puede iniciarse un descenso visual estabilizado desde la MDA hasta la zona de toma. No se desciende por debajo de la MDA antes de alcanzar el VDP. No todas las cartas lo publican, y cuando falta, la razón puede ser justamente que el descenso entre la MDA y la pista no sería estabilizado."
      },
      {
        "kind": "sub",
        "text": "La cifra que no está en la norma"
      },
      {
        "kind": "p",
        "text": "Para no bajar de la MDA, el descenso continuo tiene que empezar a nivelarse **antes**. Muchos operadores definen para eso una altitud de decisión derivada, con un incremento sobre la MDA publicada, y una acción de frustrada al alcanzarla."
      },
      {
        "kind": "p",
        "text": "Eso es una **cifra del operador**: está en el SOP, el FCOM y el manual de operaciones, cambia de flota en flota y de operador en operador, y este módulo no la inventa. Lo que sí es común a todos: la MDA publicada no se cruza hacia abajo sin la referencia visual requerida."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-12.svg",
        "alt": "Dos perfiles del FAF al umbral. Arriba, la escalera: la trayectoria baja a cada altitud mínima, nivela y llega a la MDA en vuelo nivelado y largo, con las nivelaciones marcadas en rojo. Abajo, el descenso continuo (CDFA): un solo trazo desde el FAF que pasa por encima de cada altitud mínima y llega a la MDA en el punto de descenso visual, marcado (V); la MDA no se cruza sin referencia visual, y la senda de asesoramiento no da franqueamiento por debajo de ella.",
        "ancho": 1600,
        "alto": 1060,
        "pie": "Para no cruzar la MDA, el operador suele fijar una altitud de decisión derivada con un margen sobre ella. Esa cifra está en el SOP de cada flota."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "En una RNP APCH, el caso normal de una aerolínea es volar a mínimos LNAV/VNAV o LPV, con guía vertical y DA. La CDFA aparece cuando esas líneas no están disponibles: temperatura fuera de límites, ajuste remoto, equipo con MEL, o una carta que solo publica LNAV."
      },
      {
        "kind": "p",
        "text": "Esa es la razón por la que el briefing de una aproximación PBN no termina en «vamos a LNAV/VNAV». Termina en «y si no, vamos a LNAV, a la MDA, con esta técnica y esta altitud de frustrada», que es una decisión que se toma antes y no en el FAF."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Qué línea de mínimos se va a usar y, con ella, si la operación termina en DA o en MDA.",
          "Si el procedimiento publica senda de asesoramiento o VDA, y que se entiende como asesoramiento.",
          "Si la carta lleva la nota «Visual Segment – Obstacles».",
          "Si hay VDP publicado.",
          "Qué dice el SOP del operador sobre la técnica y sobre la altitud a la que se inicia la frustrada."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Volar a una MDA como si fuera una DA hace que el avión descienda por debajo del mínimo publicado durante la maniobra de frustrada. Y seguir una senda de asesoramiento por debajo de la MDA, en un procedimiento con obstáculos en el segmento visual, es exactamente el escenario que la nota de la carta advierte."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«Si el FMS me dibuja senda, es una aproximación con guía vertical.» No. Una senda de asesoramiento sobre un NPA no convierte el procedimiento en APV, no cambia el mínimo y no evalúa obstáculos por debajo de la MDA. La línea de mínimos manda, y la línea de mínimos dice MDA."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Una MDA no es una DA: no se desciende por debajo sin la referencia visual requerida.",
          "La CDFA es un descenso continuo, sin nivelaciones, desde el FAF hasta unos 50 ft sobre el umbral o el inicio de la nivelada.",
          "CDFA con guía VNAV de asesoramiento es operación 3D; con cálculo manual de la velocidad vertical, 2D. El procedimiento sigue siendo un NPA y el mínimo sigue siendo la MDA.",
          "El VDA es asesoramiento: no cambia los requisitos del NPA y no garantiza franqueamiento por debajo de la MDA.",
          "La nota «Visual Segment – Obstacles» sustituye al VDA cuando hay obstáculo en el segmento visual.",
          "El incremento sobre la MDA, si lo hay, es cifra del operador: está en el SOP."
        ]
      }
    ]
  },
  {
    "n": 21,
    "title": "RNP AR APCH",
    "kicker": "P21",
    "minutes": 9,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "RNP Authorization Required Approach. Es la especificación de aproximación más exigente que vuela una aerolínea, y la característica que la define está en su nombre: **requiere autorización**."
      },
      {
        "kind": "p",
        "text": "El AIM lo compara con algo conocido para entender el nivel: la autorización que exige RNP AR es análoga a la autorización especial que exigen los procedimientos ILS de Categoría II o III. Todos los operadores necesitan autorización específica de la autoridad para volar cualquier aproximación o salida RNP AR. **No hay excepciones.**"
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "El valor RNP y el área de evaluación de obstáculos"
      },
      {
        "kind": "p",
        "text": "Aquí hay un dato que explica por qué RNP AR es distinta de todo lo demás: los procedimientos RNP AR se caracterizan por usar un área lateral de evaluación de obstáculos igual a **dos veces el valor RNP**, sin área lateral secundaria ni márgenes adicionales."
      },
      {
        "kind": "p",
        "text": "Dicho en claro: en RNP AR no hay colchón. En otros procedimientos, el área protegida incluye una zona secundaria; aquí el margen es el que da el propio valor RNP, y nada más."
      },
      {
        "kind": "p",
        "text": "Los valores: RNP AR exige un valor mínimo de precisión lateral de **RNP 0.30**, y las aproximaciones RNP AR tendrán un valor de RNP 0.3 o menor. Cada línea de mínimos publicada tiene su valor RNP asociado, que define el requisito de performance lateral en el segmento final."
      },
      {
        "kind": "sub",
        "text": "La autorización del operador fija un valor mínimo"
      },
      {
        "kind": "p",
        "text": "La autorización de cada operador **identifica un valor RNP mínimo autorizado**, y ese valor puede variar según la configuración de la aeronave o los procedimientos operacionales, por ejemplo según se use director de vuelo con o sin piloto automático."
      },
      {
        "kind": "p",
        "text": "Consecuencia de cabina: el valor al que un operador puede volar no es el más bajo que publique la carta, es el más bajo que su autorización permita con la configuración de ese día."
      },
      {
        "kind": "sub",
        "text": "Tramos RF"
      },
      {
        "kind": "p",
        "text": "Muchos procedimientos RNP AR contienen tramos RF, y aquí **la elegibilidad para tramos RF es obligatoria** en cualquier autorización RNP AR. Los requisitos de tramo RF se indican en la sección de notas de la carta o en el punto de aproximación inicial aplicable."
      },
      {
        "kind": "sub",
        "text": "Frustradas por debajo de RNP 1.00"
      },
      {
        "kind": "p",
        "text": "Algunos procedimientos RNP AR requieren un valor de precisión lateral **menor de 1.00 NM en el segmento de frustrada**. En ciertos lugares el entorno de espacio aéreo o de obstáculos lo obliga, y la operación en esas aproximaciones típicamente requiere **equipo redundante**. La autorización del operador especifica si puede volar una frustrada que exija menos de 1.00 NM."
      },
      {
        "kind": "sub",
        "text": "Velocidades y gradientes no estándar"
      },
      {
        "kind": "p",
        "text": "Las aproximaciones RNP AR pueden requerir velocidades de aproximación o gradientes de ascenso en frustrada **no estándar**. La carta refleja esos requisitos y los pilotos deben confirmar que pueden cumplirlos **antes de iniciar la aproximación**."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "RNP AR existe para resolver problemas concretos en lugares concretos: terreno, obstáculos, espacio aéreo restringido. El AIM lo dice sin adornos: está pensada para dar beneficios específicos en lugares específicos, y **no** está pensada para todo operador ni para todo avión."
      },
      {
        "kind": "p",
        "text": "La preparación es distinta de una RNP APCH normal en tres cosas: hay que confirmar el valor RNP al que se está autorizado hoy, hay que confirmar la capacidad de los tramos RF y de la frustrada, y hay que confirmar las velocidades y gradientes antes de empezar."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Que el operador tiene autorización RNP AR y cuál es su valor mínimo autorizado con la configuración prevista.",
          "Que la aeronave es elegible, incluidos los tramos RF.",
          "Qué valor RNP exige la línea de mínimos elegida y qué exige la frustrada.",
          "Las velocidades y gradientes no estándar, antes de comenzar."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "No se vuela. Sin la autorización, sin la elegibilidad o sin poder cumplir los gradientes, el procedimiento no es una opción, y el área de evaluación de obstáculos al doble del valor RNP explica por qué no hay margen para improvisar."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«RNP AR y RNP APCH son lo mismo con otro nombre.» No. Y el error de pilotaje asociado: suponer que se puede volar al valor más bajo publicado en la carta. El valor lo fija la autorización del operador, no la carta."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-13.svg",
        "alt": "Dos vistas en planta del mismo valle entre dos cerros, con la pista al fondo. A la izquierda, RNP APCH: una final recta y larga alineada con la pista, con una franja ancha, área primaria y zona secundaria a cada lado. A la derecha, RNP AR APCH, con el rótulo authorization required: la trayectoria rodea el cerro con un tramo RF de radio constante y entra al valle con una franja mucho más estrecha y sin zona secundaria, porque el área lateral de evaluación de obstáculos es 2 veces el valor RNP.",
        "ancho": 1600,
        "alto": 900
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "RNP AR requiere autorización específica del operador, sin excepciones, análoga a la de CAT II o III.",
          "El área lateral de evaluación de obstáculos es dos veces el valor RNP, sin zona secundaria ni márgenes adicionales.",
          "Exige un valor mínimo de RNP 0.30, y cada línea de mínimos tiene su valor asociado.",
          "La elegibilidad para tramos RF es obligatoria; la frustrada puede exigir menos de 1.00 NM y equipo redundante.",
          "Puede haber velocidades y gradientes no estándar, que se confirman antes de iniciar."
        ]
      }
    ]
  },
  {
    "n": 22,
    "title": "RNP APCH frente a RNP AR APCH",
    "kicker": "P22",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "La comparación, con las diferencias que importan en cabina:"
      },
      {
        "kind": "table",
        "head": [
          "",
          "RNP APCH",
          "RNP AR APCH"
        ],
        "rows": [
          [
            "Autorización",
            "Aprobación del operador para la especificación",
            "**Autorización específica**, sin excepciones, análoga a CAT II o III"
          ],
          [
            "Entrenamiento",
            "Según la especificación y el operador",
            "Requisitos específicos identificados por la autoridad"
          ],
          [
            "Elegibilidad de tramo RF",
            "**Opcional**",
            "**Obligatoria** en cualquier autorización RNP AR"
          ],
          [
            "Escalado del valor RNP",
            "No es un requisito de la especificación",
            "Obligatorio en la elegibilidad"
          ],
          [
            "Valor en final",
            "0.3",
            "**0.30 o menor**, y cada línea de mínimos lleva el suyo"
          ],
          [
            "Área lateral de obstáculos",
            "Con zona secundaria",
            "**2 × RNP, sin zona secundaria**"
          ],
          [
            "Frustrada",
            "Valor 1",
            "Puede exigir **menos de 1.00 NM** y equipo redundante"
          ],
          [
            "Velocidades y gradientes",
            "Estándar",
            "Pueden ser **no estándar**, y hay que confirmarlos antes"
          ],
          [
            "Título de la carta (FAA)",
            "RNAV (GPS) RWY XX",
            "RNAV (RNP) RWY XX, con «Authorization Required»"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "La diferencia de fondo no es el número: es **quién garantiza el margen**."
      },
      {
        "kind": "p",
        "text": "En RNP APCH, parte del margen lo pone el diseño del procedimiento, con su zona secundaria. En RNP AR, el margen es el que da la performance del avión y la precisión del pilotaje, porque el área protegida es dos veces el valor RNP y nada más. Por eso se exige autorización, equipo, entrenamiento y, en algunos casos, redundancia."
      },
      {
        "kind": "sub",
        "text": "Y una diferencia de guía vertical"
      },
      {
        "kind": "p",
        "text": "La performance de navegación vertical de RNP AR APCH se basa en guía vertical barométrica o en aumentación satelital. No es un detalle menor: si la guía vertical es barométrica, todo el capítulo 19 se aplica con más razón, porque el margen lateral tampoco perdona."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Un piloto puede pasar años volando RNP APCH y no volar nunca una RNP AR, porque RNP AR existe para lugares concretos. Lo que no puede es confundirlas en una entrevista, ni suponer que su autorización de una le sirve para la otra."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "p",
        "text": "Lo mismo de siempre, pero con una pregunta añadida: **¿esta aproximación dice «Authorization Required»?** Si lo dice, el juego es otro y hay que confirmar autorización, valor mínimo autorizado, elegibilidad RF, capacidad de la frustrada y gradientes."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Además del clásico de tratarlas como equivalentes, hay uno más fino: suponer que una RNP AR es «una RNP APCH con RNP más bajo». El valor es una consecuencia, no la definición. La definición es la autorización y el diseño sin colchón."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "RNP AR exige autorización específica sin excepciones; RNP APCH, no.",
          "En RNP AR la elegibilidad de tramo RF y el escalado son obligatorios; en RNP APCH el RF es opcional.",
          "En RNP AR el área lateral es 2 × RNP, sin zona secundaria: no hay colchón.",
          "La frustrada de una RNP AR puede exigir menos de 1.00 NM y equipo redundante.",
          "La carta de una RNP AR dice «Authorization Required»."
        ]
      }
    ]
  },
  {
    "n": 23,
    "title": "El tramo RF",
    "kicker": "P23",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Radius to Fix. Un tramo RF es una **trayectoria circular de radio constante alrededor de un centro de giro definido, que empieza y termina en un punto**. Puede publicarse como parte de un procedimiento."
      },
      {
        "kind": "p",
        "text": "Lo que lo distingue de un giro normal entre dos waypoints es que aquí la curva **es** la trayectoria publicada, no el resultado de que el avión anticipe un giro. El radio, el centro y los dos extremos están definidos, y la trayectoria protegida es ese arco."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "Cómo aparece en el procedimiento"
      },
      {
        "kind": "p",
        "text": "Los requisitos de tramo RF se indican en la sección de notas de la carta o en el punto de aproximación inicial aplicable. Y la capacidad de volarlos:"
      },
      {
        "kind": "list",
        "items": [
          "En RNP APCH y en RNP 1, es **opcional**: tiene que estar listada como característica del equipo.",
          "En RNP AR y en A-RNP, es **obligatoria**."
        ]
      },
      {
        "kind": "sub",
        "text": "Qué se espera del piloto en un RF"
      },
      {
        "kind": "p",
        "text": "Dos cosas, y las dos vienen de los requisitos de conocimiento de la circular de la FAA:"
      },
      {
        "kind": "list",
        "items": [
          "**Mantener la trayectoria publicada.** El arco es la trayectoria; salirse de él no es un atajo, es salirse del área protegida.",
          "**Mantener las velocidades máximas publicadas.** La circular lo enumera expresamente como conocimiento requerido: la importancia de mantener la trayectoria publicada y las velocidades máximas mientras se ejecutan operaciones RNP con tramos RF."
        ]
      },
      {
        "kind": "p",
        "text": "La razón es geométrica y se entiende sin matemáticas: un arco de radio fijo volado más rápido exige más inclinación. Si la velocidad sube por encima de lo previsto, el avión no consigue quedarse en el arco."
      },
      {
        "kind": "sub",
        "text": "Por qué no se modifica"
      },
      {
        "kind": "p",
        "text": "Un tramo RF codificado no se retoca. Cambiar un punto, insertar un directo o eliminar una discontinuidad en medio de un RF puede destruir la geometría del arco y convertir la trayectoria en algo que no está protegido."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Un RF típico aparece en llegadas de terminales con terreno, y en salidas RNP AR puede empezar **tan pronto como el extremo de salida de la pista**. Eso significa que el giro puede comenzar muy cerca del suelo, con el avión limpio a medias y la carga de trabajo alta."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Si el procedimiento tiene un tramo RF, en las notas o en el IAF.",
          "Si el avión tiene la capacidad RF listada.",
          "La velocidad máxima publicada para el tramo.",
          "Qué dice el SOP del operador sobre automatización en tramos RF."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Sin la capacidad, el procedimiento no se vuela. Con la capacidad pero por encima de la velocidad prevista, el avión se sale del arco, y en RNP AR el área lateral protegida es dos veces el valor RNP, sin zona secundaria."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Si el ATC pide algo incompatible con el tramo (una velocidad que no se puede mantener, un directo que rompe el arco), se dice. Es más fácil renegociar una instrucción que recuperar una trayectoria."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«RF significa simplemente un giro cerrado.» No: significa un arco de radio constante, definido, que es la trayectoria publicada. Un giro cerrado es lo que hace el avión; un RF es lo que está dibujado en la carta."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-14.svg",
        "alt": "Vista en planta. Del waypoint A sale un arco de radio constante en magenta hasta el waypoint B, con el centro marcado por una cruz y el mismo radio R hasta cada extremo. Un avión sigue la curva. En gris y con línea de puntos, el giro que haría el avión si anticipara el paso por un waypoint en la esquina: queda claramente fuera del arco. Al pie: la trayectoria publicada es el arco y la velocidad máxima del tramo está en la carta.",
        "ancho": 1600,
        "alto": 900
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Un tramo RF es una trayectoria circular de radio constante alrededor de un centro definido, entre dos puntos.",
          "Capacidad opcional en RNP APCH y RNP 1; obligatoria en RNP AR y A-RNP.",
          "Hay que mantener la trayectoria publicada y las velocidades máximas publicadas.",
          "Un RF codificado no se modifica: cambiarlo destruye la geometría del arco."
        ]
      }
    ]
  },
  {
    "n": 24,
    "title": "Fly-by y fly-over",
    "kicker": "P24",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Dos maneras de pasar por un waypoint, y la diferencia se ve en la trayectoria."
      },
      {
        "kind": "list",
        "items": [
          "**Fly-by.** El avión empieza el giro hacia la siguiente derrota **antes** de llegar al punto que separa los dos tramos. Eso se llama anticipación del giro.",
          "**Fly-over.** El avión **tiene que sobrevolar** el punto antes de empezar el giro."
        ]
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "La codificación está en la base de datos: en la mayoría de receptores, la base incluye la codificación que informa al sistema de navegación de qué puntos son fly-over y cuáles fly-by, y el sistema puede dar la guía correspondiente, anticipando el giro antes de un fly-by o haciendo sobrevolar un fly-over."
      },
      {
        "kind": "p",
        "text": "Y aquí viene lo que hay que saber de verdad: **donde el sistema no proporciona esa guía, el piloto debe ejecutar la anticipación del giro o el sobrevuelo del punto manualmente.** La simbología de la carta para el punto fly-by le da al piloto conciencia de lo que se espera."
      },
      {
        "kind": "sub",
        "text": "Lo que cambia la anticipación"
      },
      {
        "kind": "p",
        "text": "La anticipación del giro depende de la velocidad y de la altitud, y eso también está en la lista de conocimientos requeridos de la circular. A más velocidad, el giro empieza antes y el radio es mayor. Por eso en una llegada rápida los puntos se «cortan» más que en una lenta."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "En la práctica, la diferencia se nota en dos sitios:"
      },
      {
        "kind": "list",
        "items": [
          "**En las restricciones de altitud.** Si la restricción está en un punto fly-by, el avión empieza a girar antes de llegar, pero la restricción sigue siendo del punto.",
          "**En la conciencia de la trayectoria.** Un punto fly-over que el avión trata como fly-by, o al revés, produce una trayectoria distinta de la publicada."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "La simbología de los puntos en la carta.",
          "Que la trayectoria que dibuja el FMS coincide con lo que la carta espera.",
          "Si el sistema no da la guía correspondiente, quién ejecuta la anticipación o el sobrevuelo y cómo."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "La trayectoria real se aparta de la publicada, y en un procedimiento diseñado con márgenes estrechos eso importa."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Suponer que el avión «siempre» hace lo correcto porque el punto está en la base de datos. En la mayoría de los casos sí, pero la norma contempla expresamente el caso en que no, y entonces es trabajo del piloto."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-15.svg",
        "alt": "Dos paneles con las mismas dos derrotas que se cruzan en un waypoint. En el fly-by, el punto es la estrella sin círculo y la trayectoria empieza a curvar antes del punto, por dentro de la esquina; una cota marca la anticipación, que depende de la velocidad y la altitud. En el fly-over, la estrella va dentro de un círculo y la trayectoria pasa exactamente por encima del punto, curva después y hace una recuperación hasta la derrota siguiente.",
        "ancho": 1600,
        "alto": 900
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Fly-by: el giro empieza antes del punto, con anticipación. Fly-over: hay que sobrevolar el punto antes de girar.",
          "La codificación está en la base de datos y la simbología, en la carta.",
          "Donde el sistema no da esa guía, la anticipación o el sobrevuelo los hace el piloto.",
          "La anticipación del giro depende de la velocidad y de la altitud."
        ]
      }
    ]
  },
  {
    "n": 25,
    "title": "Los terminadores de tramo",
    "kicker": "P25",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "El FMS no vuela la carta: vuela una secuencia de **tramos codificados**. Cada tramo lleva una instrucción que dice cómo se define y dónde termina, y esas instrucciones son los terminadores de tramo, definidos en la especificación ARINC 424."
      },
      {
        "kind": "p",
        "text": "Este capítulo no es de codificación. Es de por qué el avión hace a veces algo que la carta no parecía decir."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Los que conviene reconocer conceptualmente, porque son los que la circular de la FAA exige que el sistema pueda ejecutar y mantener:"
      },
      {
        "kind": "table",
        "head": [
          "Terminador",
          "Qué define"
        ],
        "rows": [
          [
            "IF · *Initial Fix*",
            "El punto donde empieza la secuencia"
          ],
          [
            "TF · *Track to Fix*",
            "Una derrota recta entre dos puntos definidos"
          ],
          [
            "CF · *Course to Fix*",
            "Un rumbo o curso determinado hasta un punto"
          ],
          [
            "DF · *Direct to Fix*",
            "Desde la posición actual, directo a un punto"
          ],
          [
            "RF · *Radius to Fix*",
            "El arco de radio constante del capítulo 23"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "La circular exige, para RNP APCH y para otras especificaciones, la capacidad de ejecutar automáticamente las transiciones entre tramos y mantener derrotas consistentes con IF, TF y DF, o sus equivalentes. Para los tramos RF, la capacidad se trata por separado y por eso es opcional en unas especificaciones y obligatoria en otras."
      },
      {
        "kind": "sub",
        "text": "Lo que no hay que hacer"
      },
      {
        "kind": "p",
        "text": "No hay que memorizar el catálogo completo de ARINC 424. Lo que hay que entender es la idea: **el comportamiento del avión en una transición depende de cómo está codificado el tramo**, y si el avión hace algo inesperado, ahí está una de las explicaciones posibles."
      },
      {
        "kind": "sub",
        "text": "Una salvaguarda que protege la trayectoria"
      },
      {
        "kind": "p",
        "text": "El proveedor de la base de datos **no debe sustituir terminadores de tramo** por otros distintos de los especificados en los datos originales del AIP del Estado. Es la razón por la que un procedimiento codificado se parece a la carta, y también la razón por la que una discrepancia entre los dos es un asunto serio y no una curiosidad."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "La utilidad de conocer esto es concreta: cuando la trayectoria dibujada no coincide con la expectativa, la pregunta no es «¿está roto el FMS?», es «¿cómo está definido este tramo?». Y la respuesta se busca en la página de tramos, comparando con la carta."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "p",
        "text": "Que la secuencia y las derrotas que muestra el FMS coinciden con las de la carta. No hay que verificar los códigos: hay que verificar el resultado."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Dos extremos igual de malos: creer que hay que memorizar ARINC 424, y creer que no hace falta saber nada de esto. Lo segundo lleva a aceptar como normal cualquier cosa que dibuje el FMS."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "El FMS vuela tramos codificados, no la carta.",
          "Los que conviene reconocer: IF, TF, CF, DF y RF.",
          "El sistema debe poder ejecutar las transiciones y mantener derrotas consistentes con IF, TF y DF.",
          "El proveedor de la base no debe sustituir terminadores por otros distintos de los del AIP original."
        ]
      }
    ]
  },
  {
    "n": 26,
    "title": "La desviación lateral",
    "kicker": "P26",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Cross-track error, XTK. Es la distancia entre la posición del avión y la trayectoria deseada, medida perpendicularmente a esa trayectoria. Es lo que el piloto ve y lo que el piloto corrige."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Tres piezas que se relacionan:"
      },
      {
        "kind": "list",
        "items": [
          "**La trayectoria deseada** (*desired path*): la que el procedimiento define.",
          "**La posición del avión**: donde está.",
          "**La desviación lateral**: la diferencia entre las dos, presentada en la pantalla."
        ]
      },
      {
        "kind": "p",
        "text": "La circular de la FAA lo pide explícitamente para RNP APCH: hay que tener seleccionadas las presentaciones que permitan vigilar la derrota calculada por el sistema **y** la posición del avión respecto de la trayectoria, es decir la desviación lateral, para vigilar el error técnico de vuelo."
      },
      {
        "kind": "sub",
        "text": "El escalado de la indicación"
      },
      {
        "kind": "p",
        "text": "Un punto que se pregunta: la sensibilidad de la presentación de desviación lateral no es fija. La circular incluye entre los conocimientos requeridos la selección apropiada del escalado del indicador de desviación de curso. En la práctica esto significa que la misma desviación en millas se ve distinta en ruta que en final, y que hay que saber qué escala se está mirando."
      },
      {
        "kind": "sub",
        "text": "Minimizar el XTK es parte del oficio"
      },
      {
        "kind": "p",
        "text": "La circular lo dice entre los conocimientos requeridos: el uso recomendado por el operador de la automatización según fase de vuelo y carga de trabajo, **incluidos los métodos para minimizar el error de desviación lateral y mantener el eje de la ruta**."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "La desviación lateral es el instrumento de vigilancia del piloto. El sistema vigila su propia estimación de posición; el piloto vigila si el avión está sobre la línea. Son dos vigilancias distintas y complementarias, y es el tema del capítulo siguiente."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Que la presentación de desviación lateral está seleccionada y visible.",
          "Qué escala está activa.",
          "Que la derrota calculada por el sistema es la que la carta publica."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Sin la presentación de desviación lateral no hay manera de vigilar el error técnico de vuelo, y la operación pierde una de sus dos defensas."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Confundir «estoy en la línea magenta» con «el sistema sabe dónde estoy». La línea magenta se dibuja respecto de la posición que el sistema **estima**. Si esa estimación está corrida, el avión puede estar perfectamente centrado en la pantalla y desplazado en el mundo real."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-16.svg",
        "alt": "A la izquierda, vista en planta: la trayectoria deseada en magenta y el avión desplazado a su derecha, unidos por una cota perpendicular rotulada XTK. A la derecha, la presentación de desviación lateral en cabina, unida a la planta por una línea de puntos: la aguja está desplazada la misma proporción, hacia el lado donde queda la trayectoria.",
        "ancho": 1600,
        "alto": 900
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "La desviación lateral (XTK) es la distancia perpendicular entre la posición del avión y la trayectoria deseada.",
          "Hay que tenerla presentada para vigilar el error técnico de vuelo.",
          "La sensibilidad de la presentación cambia con la fase: hay que saber qué escala se está mirando.",
          "Minimizar el XTK para mantener el eje es parte del uso recomendado de la automatización."
        ]
      }
    ]
  },
  {
    "n": 27,
    "title": "PDE, NSE y TSE",
    "kicker": "P27",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "De dónde sale el error total. Son tres componentes y una suma, y con las definiciones de la circular de la FAA se explican en una frase cada una:"
      },
      {
        "kind": "list",
        "items": [
          "**PDE**, *Path Definition Error*: la diferencia entre la trayectoria **definida** y la trayectoria **deseada** en un punto determinado.",
          "**NSE**, *Navigation System Error*: la diferencia entre la posición **verdadera** y la posición **estimada**.",
          "**FTE**, *Flight Technical Error*: la precisión con que se controla el avión, medida por la posición **indicada** respecto de la posición **mandada o deseada** indicada. No incluye errores de bulto (*blunder errors*).",
          "**TSE**, *Total System Error*: la diferencia entre la posición verdadera y la posición deseada, y es igual a la **suma vectorial** de FTE, PDE y NSE."
        ]
      },
      {
        "kind": "p",
        "text": "PDE  (trayectoria definida vs deseada) NSE  (posición verdadera vs estimada) FTE  (control del avión respecto de lo mandado)                       ↓ TSE  (posición verdadera vs deseada) = suma vectorial de los tres"
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Aquí está la parte que de verdad cambia la manera de trabajar, y es una nota de la circular que conviene leer dos veces:"
      },
      {
        "kind": "p",
        "text": "**Cumplir con el requisito de control y alerta de la performance no implica un control automático del error técnico de vuelo.** La función de control y alerta a bordo debe consistir, como mínimo, en un algoritmo de control y alerta del error del sistema de navegación **y** en una presentación de desviación lateral que permita a la tripulación vigilar el error técnico de vuelo."
      },
      {
        "kind": "p",
        "text": "Traducido a reparto de tareas:"
      },
      {
        "kind": "table",
        "head": [
          "Componente",
          "Quién lo vigila"
        ],
        "rows": [
          [
            "NSE",
            "El sistema, con su algoritmo de control y alerta"
          ],
          [
            "FTE",
            "**La tripulación**, con la presentación de desviación lateral"
          ],
          [
            "PDE",
            "Se considera **despreciable**, por el proceso de integridad de la base de datos y los procedimientos de tripulación"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "Que PDE se considere despreciable no es un regalo: es una consecuencia de que la base de datos esté controlada y de que la tripulación verifique. Si esas dos cosas se relajan, el supuesto deja de ser válido."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "La consecuencia práctica es la del capítulo anterior, ahora con nombre: cuando el avión no alerta, no significa que todo esté bien; significa que el **NSE** está dentro de límites. El FTE lo está mirando el piloto, y si nadie lo mira, nadie lo está vigilando."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "p",
        "text": "Que se está vigilando lo que le corresponde al piloto: la desviación lateral. Y que el reparto está claro entre los dos tripulantes."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«Si el avión no alerta, la performance está bien.» Incompleto: el avión alerta sobre su propia estimación de posición. El error de pilotaje no lo vigila él."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-17.svg",
        "alt": "Diagrama de convergencia. Tres cajas a la izquierda: PDE, trayectoria definida frente a deseada, que se considera despreciable; NSE, posición verdadera frente a estimada, que vigila el sistema; y FTE, el control del avión frente a lo mandado, que vigila la tripulación. Las tres flechas convergen en TSE, posición verdadera frente a deseada, la suma vectorial de las tres. Debajo, el reparto: el sistema alerta del NSE y la tripulación vigila el FTE en la desviación lateral.",
        "ancho": 1600,
        "alto": 900
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "PDE: trayectoria definida frente a deseada. NSE: posición verdadera frente a estimada. FTE: control del avión frente a lo mandado.",
          "TSE es la suma vectorial de los tres: posición verdadera frente a posición deseada.",
          "El control y alerta a bordo vigila el NSE, no el FTE.",
          "El FTE lo vigila la tripulación con la presentación de desviación lateral. PDE se considera despreciable por la integridad de la base de datos y los procedimientos."
        ]
      }
    ]
  },
  {
    "n": 28,
    "title": "La frustrada en PBN",
    "kicker": "P28",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "La aproximación frustrada también tiene requisitos de navegación, y se olvidan con facilidad porque la atención está puesta en llegar."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "La frustrada tiene su propio valor"
      },
      {
        "kind": "p",
        "text": "En RNP APCH, el valor vuelve a **1** en el segmento de frustrada, después de haber estado en 0.3 en la final. En RNP 1, la frustrada aplica valor 1. Y en RNP AR, algunos procedimientos exigen **menos de 1.00 NM** en la frustrada, con equipo redundante y con la autorización del operador diciendo expresamente si puede volarla."
      },
      {
        "kind": "sub",
        "text": "La frustrada puede apoyarse en radioayuda convencional"
      },
      {
        "kind": "p",
        "text": "Un dato de la circular de la FAA que sorprende y que conviene tener: para RNP APCH, el GPS es el sistema de navegación primario, los sistemas basados en DME/DME **no** son aceptables, y **el segmento de frustrada puede basarse en una radioayuda convencional**, por ejemplo VOR, DME o NDB."
      },
      {
        "kind": "p",
        "text": "Esto tiene una consecuencia de preparación: la frustrada de una aproximación PBN puede exigir tener sintonizada y verificada una radioayuda convencional. Lo dice la carta."
      },
      {
        "kind": "sub",
        "text": "Y puede exigir gradientes no estándar"
      },
      {
        "kind": "p",
        "text": "En RNP AR, la frustrada puede requerir gradientes de ascenso no estándar, la carta los refleja y hay que confirmar que se pueden cumplir antes de iniciar la aproximación."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "El briefing de aproximación tiene que incluir la frustrada con el mismo detalle que la aproximación: qué capacidad exige, qué puntos, qué derrota inicial, qué altitudes, qué espera, y qué pasa si se pierde una capacidad justo cuando se necesita."
      },
      {
        "kind": "p",
        "text": "Porque el momento en que se vuela la frustrada es, por definición, un momento en que algo no salió como se esperaba."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "El requisito de navegación de la frustrada, que puede no ser el de la aproximación.",
          "Si se apoya en una radioayuda convencional, y si está sintonizada y verificada.",
          "Los puntos, la derrota inicial, las altitudes y la espera.",
          "El gradiente, si es no estándar.",
          "Si la capacidad se conserva después de la falla que motivó la frustrada."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Se ejecuta una frustrada por una trayectoria que no está protegida, en el momento de menos margen del vuelo."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Revisar la aproximación y no la frustrada. Y el error asociado: suponer que la capacidad que vale para la final vale para la frustrada. En RNP AR puede ser justo lo contrario, porque la frustrada puede pedir un valor más exigente."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "La frustrada tiene su propio requisito de navegación, que puede no ser el de la aproximación.",
          "En RNP APCH el valor vuelve a 1; en RNP AR puede exigir menos de 1.00 NM, con equipo redundante y autorización específica.",
          "En RNP APCH el segmento de frustrada puede basarse en una radioayuda convencional: VOR, DME o NDB.",
          "Los gradientes no estándar se confirman antes de iniciar la aproximación."
        ]
      }
    ]
  },
  {
    "n": 29,
    "title": "El FMS en PBN",
    "kicker": "P29",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "La circular de la FAA define el FMS como un **sistema integrado** formado por sensores de a bordo, receptor y computador, con bases de datos de navegación y de performance de la aeronave, que proporciona guía de performance y de navegación de área a una presentación y al sistema automático de control de vuelo."
      },
      {
        "kind": "p",
        "text": "De esa definición, lo que le interesa al piloto es que el FMS **junta** cosas: sensores, datos y guía. Y que si cualquiera de las tres se degrada, la guía que sale al otro lado se degrada con ella."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Las funciones del FMS que sostienen una operación PBN, en el orden en que se usan:"
      },
      {
        "kind": "table",
        "head": [
          "Función",
          "Qué hace"
        ],
        "rows": [
          [
            "Plan de vuelo",
            "Guarda la ruta: puntos, tramos, restricciones"
          ],
          [
            "Base de datos de navegación",
            "Aporta los procedimientos codificados y los puntos"
          ],
          [
            "Integración de sensores",
            "Combina lo que dicen GNSS, DME, VOR e inerciales"
          ],
          [
            "Cálculo de posición",
            "Estima dónde está el avión"
          ],
          [
            "Guía lateral",
            "Manda la derrota a la presentación y al automático"
          ],
          [
            "Control de la performance",
            "En especificaciones RNP, compara lo requerido con lo estimado y alerta"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "El punto que conviene tener claro es que el FMS es una herramienta de **gestión**, no un oráculo. Hace exactamente lo que se le programó, con los datos que tiene y con los sensores que le funcionan."
      },
      {
        "kind": "p",
        "text": "De ahí sale el principio que ordena todo este bloque y el siguiente: lo que el FMS muestra **se verifica**, no se acepta."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Que el plan de vuelo cargado corresponde a la autorización.",
          "Que el procedimiento salió de la base de datos y no se escribió a mano.",
          "Qué fuente de posición está usando el sistema.",
          "Que la página de progreso o de tramos se está vigilando en la fase que corresponde."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Se vuela una trayectoria distinta de la autorizada o de la publicada, con toda la automatización funcionando perfectamente."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«El FMS reemplaza la carta.» No la reemplaza: la ejecuta. La carta es la referencia contra la que se verifica lo que el FMS va a hacer, y eso es el tema del capítulo 34."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "El FMS es un sistema integrado: sensores, receptor, computador y bases de datos de navegación y performance.",
          "Proporciona guía de performance y de navegación de área a la presentación y al automático.",
          "En especificaciones RNP añade el control de la performance y la alerta.",
          "Hace lo que se le programó: lo que muestra se verifica, no se acepta."
        ]
      }
    ]
  },
  {
    "n": 30,
    "title": "RNP frente a ANP y EPU",
    "kicker": "P30",
    "minutes": 8,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Dos magnitudes que se comparan, y no son lo mismo:"
      },
      {
        "kind": "list",
        "items": [
          "**RNP**: la performance **requerida**. La pide el procedimiento o el espacio aéreo.",
          "**EPU**, *Estimate of Position Uncertainty*: una medida en millas náuticas, sobre una escala definida, que expresa la **performance de estimación de posición actual**. En ciertos aviones se conoce como **ANP** (*Actual Navigation Performance*) o **EPE** (*Estimate of Position Error*)."
        ]
      },
      {
        "kind": "p",
        "text": "RNP        lo que el procedimiento exige EPU / ANP  lo que el sistema estima que está consiguiendo"
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "Lo que EPU no es"
      },
      {
        "kind": "p",
        "text": "La circular lo dice de forma explícita y es la frase que hay que llevarse: **el EPU no es una estimación del error real, sino una indicación estadística definida** del error potencial."
      },
      {
        "kind": "p",
        "text": "Eso tiene una consecuencia mental importante. Ver «ANP 0.08» no significa que el avión esté a 0,08 NM de donde cree estar. Significa que, con la información que el sistema tiene, su indicación estadística de incertidumbre de posición vale eso."
      },
      {
        "kind": "sub",
        "text": "El nombre cambia con el fabricante"
      },
      {
        "kind": "p",
        "text": "ANP, EPU y EPE son el mismo concepto con nombre distinto según el avión. No hay un término universal, y por eso este módulo no pone mensajes concretos de FMS en la boca de ningún fabricante: **lo que dice la pantalla y cómo se llama está en el FCOM de la flota que se vuela.**"
      },
      {
        "kind": "sub",
        "text": "Y no todos los aviones lo muestran"
      },
      {
        "kind": "p",
        "text": "Un punto que sorprende y que la circular deja claro: **no es necesario que las presentaciones de navegación, en particular el PFD, incluyan un valor de ANP o de EPE.** Las presentaciones solo necesitan proporcionar una **alerta** si la RNP de la operación no puede cumplirse."
      },
      {
        "kind": "p",
        "text": "O sea: el requisito es la alerta, no el número. Hay aviones donde se puede comparar el número, y hay aviones donde lo que llega es el aviso."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Cuando el avión muestra los dos valores, la comparación es inmediata y es una buena herramienta de conciencia: si el valor estimado se acerca al requerido, hay margen para anticipar en vez de reaccionar."
      },
      {
        "kind": "p",
        "text": "Cuando el avión no muestra el número, la herramienta es la alerta, y entonces la conciencia la da el resto: qué fuentes están en uso, qué dicen los NOTAM, qué tan razonable es la posición que se está presentando."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Qué valor RNP está aplicando el sistema al segmento en curso, y si se fija de forma automática o manual.",
          "Si el avión presenta el valor estimado y dónde.",
          "Qué dice el FCOM de la flota sobre cómo se presenta la alerta."
        ]
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«ANP y RNP son lo mismo.» Son lo contrario de lo mismo: uno es el requisito y el otro es la estimación de lo que se está consiguiendo. Y el error fino: leer el valor estimado como si fuera el error real."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-18.svg",
        "alt": "Recreación de una página genérica de FMS con dos renglones separados: RNP con el valor 1.0 y ANP con el valor 0.08, y debajo una zona de mensajes vacía. Tres números señalan el renglón RNP, el renglón ANP y la zona de mensajes.",
        "ancho": 1600,
        "alto": 900
      },
      {
        "kind": "list",
        "ordered": true,
        "items": [
          "La performance requerida por el procedimiento o el espacio aéreo. Puede fijarse de forma automática o manual, según el sistema.",
          "La indicación estadística de incertidumbre de posición del sistema. No es el error real. En otros aviones se llama EPU o EPE, y en algunos no se presenta.",
          "Aquí aparecería la alerta si la performance requerida no pudiera cumplirse. La norma exige la alerta; no exige el número."
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "RNP es la performance requerida; EPU, ANP o EPE es la estimación de la performance de posición actual.",
          "El EPU no es una estimación del error real: es una indicación estadística definida del error potencial.",
          "El nombre depende del fabricante y está en el FCOM.",
          "No es obligatorio que la pantalla muestre el valor: lo obligatorio es la alerta si la RNP no puede cumplirse."
        ]
      }
    ]
  },
  {
    "n": 31,
    "title": "Cuando la performance estimada ya no alcanza",
    "kicker": "P31",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "El momento en que el sistema concluye que no puede satisfacer la performance requerida, y lo dice. Es la razón de ser del control y alerta a bordo, y el capítulo que más se parece a lo que va a pasar de verdad."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "La secuencia de actuación, en orden y sin adornos:"
      },
      {
        "kind": "list",
        "items": [
          "**Reconocer la alerta.** Saber qué es y qué no es. Un aviso de performance no es lo mismo que una falla de sensor, aunque puedan ir juntos.",
          "**Mantener el control del avión.** Aviar antes que nada.",
          "**Contrastar la posición.** Con lo que haya: datos crudos si están disponibles, otra fuente de navegación, distancia y marcación a una radioayuda, la pista si está a la vista, la posición que reporta el ATC.",
          "**Aplicar el QRH y el SOP.** Lo que haya que hacer está ahí, no en la norma.",
          "**Determinar qué capacidad de navegación queda.**",
          "**Preguntarse si la especificación exigida todavía se puede cumplir.**",
          "**Informar al ATC** y coordinar una autorización alternativa si la respuesta es no."
        ],
        "ordered": true
      },
      {
        "kind": "sub",
        "text": "Lo que no se puede hacer aquí"
      },
      {
        "kind": "p",
        "text": "**No inventar mensajes.** Lo que aparece en pantalla, cómo se llama y qué acción inmediata pide depende del fabricante: Airbus, Boeing, Embraer y los demás lo presentan de forma distinta. Este módulo no pone palabras concretas en la pantalla de nadie. Lo que el módulo enseña es la secuencia, y la secuencia es común."
      },
      {
        "kind": "p",
        "text": "**Verificar:** el mensaje exacto, su significado y la acción asociada están en el FCOM y el QRH de la flota. Es material de entrenamiento de tipo, y hay que buscarlo ahí."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "La diferencia entre una tripulación entrenada y una que improvisa está en el paso 6. Reconocer la alerta y aplicar el QRH lo hace casi cualquiera; **concluir si todavía se cumple lo que el procedimiento exige** requiere saber qué exige el procedimiento, y eso se preparó antes."
      },
      {
        "kind": "p",
        "text": "Por eso el briefing importa: si en el briefing se dijo «esta aproximación exige RNP APCH con el valor 0.3 en la final y la frustrada se apoya en el VOR», el paso 6 ya está medio contestado."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Qué especificación y qué valor exige el segmento en curso.",
          "Qué fuentes de posición quedan y qué admite la especificación.",
          "Qué dice el QRH.",
          "Si conviene continuar, cambiar de línea de mínimos, frustrar o pedir otra autorización."
        ]
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Se informa al ATC la pérdida de capacidad junto con el curso de acción propuesto, tan pronto como la situación lo permita. La fraseología se ve en el capítulo 46."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Actuar sobre el mensaje antes de volar el avión, y el opuesto: seguir volando el procedimiento sin contestar la pregunta de si todavía se puede cumplir. La alerta es información, y la decisión sigue siendo de la tripulación."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-19.svg",
        "alt": "Dos escenarios con la misma trayectoria y el mismo límite requerido. Arriba, la incertidumbre de posición estimada cabe dentro del límite y el indicador dice normal. Abajo, la incertidumbre es más ancha que el límite: el avión se ve sobre la trayectoria, pero el indicador dice alerta. Al pie, la secuencia de actuación en siete pasos: reconocer, volar el avión, contrastar la posición, QRH y SOP, qué capacidad queda, si se cumple lo exigido e informar al ATC.",
        "ancho": 1600,
        "alto": 960
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "La alerta dice que el sistema ya no puede garantizar la performance requerida.",
          "Secuencia: reconocer, volar, contrastar la posición, QRH y SOP, determinar qué queda, preguntarse si se cumple lo exigido, informar al ATC.",
          "El mensaje concreto y su acción asociada están en el FCOM y el QRH de la flota, no en la norma.",
          "La alerta es información: la decisión es de la tripulación."
        ]
      }
    ]
  },
  {
    "n": 32,
    "title": "La base de datos de navegación",
    "kicker": "P32",
    "minutes": 8,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "PBN depende de datos correctamente cargados. La trayectoria que vuela el avión sale de un procedimiento **codificado** en la base de datos, no de la carta que el piloto lee. Si los dos no coinciden, hay un problema, y es un problema serio."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "Qué exige la norma"
      },
      {
        "kind": "list",
        "items": [
          "Los datos de navegación de a bordo deben ser **actuales y apropiados** para la región de la operación, e incluir radioayudas, puntos y los procedimientos codificados de terminal pertinentes para la salida, la llegada y los aeródromos de alternativa.",
          "Antes de usar un procedimiento o un punto recuperado de la base de datos, el piloto debe **verificar la validez** de la base.",
          "Se espera además que los datos sigan siendo actuales **durante todo el vuelo**."
        ]
      },
      {
        "kind": "sub",
        "text": "La regla que hay que saber decir de memoria"
      },
      {
        "kind": "p",
        "text": "Si se publica una **carta enmendada** cuya enmienda no está en la base de datos, **la base no debe usarse para conducir la operación**."
      },
      {
        "kind": "p",
        "text": "Es la regla que convierte la comparación carta-base en algo obligatorio y no en una buena costumbre."
      },
      {
        "kind": "sub",
        "text": "Y la que aplica a una aerolínea"
      },
      {
        "kind": "p",
        "text": "Para operadores de transporte, la norma no se conforma con que el piloto mire la fecha. Exige que el operador establezca un **programa de base de datos** con cuatro piezas: un responsable identificado del proceso de actualización, un proceso documentado de aceptación y verificación de aplicabilidad, ese proceso bajo control de configuración, y **la confirmación por parte del piloto, en la inicialización del sistema, de que la base de datos es actual**."
      },
      {
        "kind": "p",
        "text": "Y una quinta que es la que cierra el círculo: las discrepancias que invalidan un procedimiento, por ejemplo errores de base de datos, **deben reportarse al proveedor**, y el uso de los procedimientos afectados debe prohibirse mediante un aviso del operador a sus tripulaciones. El procedimiento solo vuelve a estar disponible cuando el operador lo restablece."
      },
      {
        "kind": "sub",
        "text": "El RAC lo dice en una línea"
      },
      {
        "kind": "p",
        "text": "La nota del RAC 121 sobre PBN es breve y contundente: **la gestión de datos electrónicos de navegación es parte integral de los procedimientos normales y anormales**."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "En la práctica del día, la tripulación hace tres cosas: confirma la vigencia en la inicialización, carga los procedimientos desde la base, y compara con la carta. Lo demás lo sostiene el programa del operador."
      },
      {
        "kind": "p",
        "text": "Lo que la tripulación **no** hace es arreglar un procedimiento que no cuadra. Lo reporta."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "La vigencia de la base en la inicialización del sistema.",
          "Que el procedimiento se cargó desde la base y no se escribió.",
          "Que lo cargado coincide con la carta, incluida cualquier enmienda."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Se vuela una trayectoria que no es la publicada, con la automatización siguiéndola con total precisión. Es el fallo más silencioso de todo el módulo."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«La base de datos del FMS siempre es correcta.» La propia norma contempla el caso contrario y monta un proceso entero para gestionarlo: reporte al proveedor, prohibición de uso y restablecimiento. Si la norma lo prevé, el piloto también tiene que preverlo."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Los datos deben ser actuales y apropiados para la región, y seguir siéndolo durante el vuelo.",
          "Si hay una carta enmendada cuya enmienda no está en la base, la base no se usa para esa operación.",
          "Un operador de transporte necesita un programa documentado, y el piloto confirma la vigencia en la inicialización.",
          "Las discrepancias se reportan al proveedor y el uso del procedimiento afectado se prohíbe hasta que el operador lo restablezca."
        ]
      }
    ]
  },
  {
    "n": 33,
    "title": "El ciclo AIRAC",
    "kicker": "P33",
    "minutes": 6,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Aeronautical Information Regulation and Control. Es el sistema de fechas comunes en que la información aeronáutica entra en vigor, y lo que le importa al piloto son tres datos de la base de datos de su avión: **desde cuándo es válida, hasta cuándo, y cuál está activa.**"
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "El caso que hay que saber resolver"
      },
      {
        "kind": "p",
        "text": "Se espera que los datos de navegación sean actuales **durante todo el vuelo**. Y la norma contempla expresamente el caso incómodo: **si el ciclo AIRAC va a cambiar durante el vuelo**, operadores y pilotos deben establecer procedimientos para asegurar la exactitud de los datos de navegación, incluida la idoneidad de las instalaciones de navegación usadas para definir las rutas y los procedimientos del vuelo."
      },
      {
        "kind": "p",
        "text": "La norma incluso dice cómo se ha hecho tradicionalmente: verificando los datos electrónicos contra productos en papel o de tableta electrónica, y un medio aceptable es comparar las cartas nueva y antigua para verificar los puntos de navegación antes de salir."
      },
      {
        "kind": "sub",
        "text": "Lo que el piloto verifica"
      },
      {
        "kind": "p",
        "text": "En la inicialización, que la base es actual. Y si el vuelo cruza un cambio de ciclo, que existe y se aplica el procedimiento del operador para ese caso."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Los vuelos largos y los que salen al final de un ciclo son los que ponen esto a prueba. Un vuelo transoceánico que despega el último día de un ciclo aterriza en el siguiente, y eso no es un problema si el operador tiene resuelto el procedimiento; es un problema si nadie lo miró."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Qué base está activa y entre qué fechas es válida.",
          "Si el vuelo cruza un cambio de ciclo.",
          "Qué dice el procedimiento del operador para ese caso."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Se puede acabar volando un procedimiento que cambió, con datos que ya no corresponden a lo publicado."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Ante una base fuera de ciclo, responder «no go» de forma automática. La respuesta correcta es analizar: hay que consultar la MEL, el SOP, la autorización del operador, el tipo de operación y la regulación aplicable. La norma no da una respuesta universal, y precisamente por eso la pregunta aparece en entrevistas: lo que se evalúa es si el candidato razona o recita."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-20.svg",
        "alt": "Recreación de una página genérica de estado de la base de datos de navegación: NAV DATA BASE, ACTIVE con el ciclo 2610, EFFECTIVE FROM 01OCT26 y EFFECTIVE TO 28OCT26. Tres números señalan el ciclo activo, la fecha de entrada en vigor y la fecha de fin.",
        "ancho": 1600,
        "alto": 900,
        "pie": "El ciclo 2610 es real: rige del 1 al 28 de octubre de 2026, y el 2611 entra el 29. La página es genérica."
      },
      {
        "kind": "list",
        "ordered": true,
        "items": [
          "Qué base está en uso. Es el dato que se confirma en la inicialización del sistema.",
          "Desde cuándo es válida. Una base que todavía no entró en vigor no es la base actual.",
          "Hasta cuándo. Si el vuelo pasa de esta fecha, hay que aplicar el procedimiento del operador para el cambio de ciclo en vuelo."
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "AIRAC es el sistema de fechas comunes de entrada en vigor de la información aeronáutica.",
          "El piloto verifica qué base está activa y entre qué fechas es válida.",
          "Los datos deben seguir siendo actuales durante todo el vuelo; si el ciclo cambia en vuelo, hay que aplicar un procedimiento para asegurar la exactitud.",
          "Una base fuera de ciclo no se resuelve con un «no go» automático: se consulta MEL, SOP, autorización del operador, tipo de operación y regulación aplicable."
        ]
      }
    ]
  },
  {
    "n": 34,
    "title": "Validar: autorización, carta y FMS",
    "kicker": "P34",
    "minutes": 9,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Cargar no es validar. Y validar no es mirar una cosa: es comprobar que **tres fuentes dicen lo mismo**."
      },
      {
        "kind": "p",
        "text": "AUTORIZACIÓN DEL ATC                ▲                │     CARTA ◄────┼────► FMS                │           CONTRASTE"
      },
      {
        "kind": "list",
        "items": [
          "**La autorización del ATC** dice qué se ha autorizado a volar.",
          "**La carta** dice cómo es ese procedimiento y qué exige.",
          "**El FMS** dice qué va a volar el avión."
        ]
      },
      {
        "kind": "p",
        "text": "Si las tres no coinciden, alguna está mal, y hay que resolverlo **antes de ejecutar**."
      },
      {
        "kind": "p",
        "text": "El AIM lo pide con una frase que vale como principio: hay que **usar las capacidades de la aviónica para verificar los datos de puntos y de derrota después de cargar el procedimiento desde la base de datos**."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "La lista de lo que se compara"
      },
      {
        "kind": "p",
        "text": "En el orden en que conviene recorrerla:"
      },
      {
        "kind": "table",
        "head": [
          "Qué",
          "Por qué"
        ],
        "rows": [
          [
            "Nombre del procedimiento",
            "Es el error más común y el más fácil de detectar"
          ],
          [
            "Pista",
            "Un procedimiento con la pista equivocada es otro procedimiento"
          ],
          [
            "Transición",
            "Una transición distinta cambia la trayectoria entera"
          ],
          [
            "Secuencia de puntos",
            "El orden es la trayectoria"
          ],
          [
            "Derrotas",
            "Se comparan con las publicadas: un número distinto delata un tramo mal codificado"
          ],
          [
            "Restricciones de altitud",
            "Cargadas, no solo leídas"
          ],
          [
            "Restricciones de velocidad",
            "Ídem, y en tramos RF son parte del diseño"
          ],
          [
            "Discontinuidades",
            "Hay que verlas y decidir qué se hace con ellas"
          ],
          [
            "Aproximación final",
            "El FAF, la senda, la DA o MDA"
          ],
          [
            "Frustrada",
            "Puntos, derrota inicial, altitudes y espera"
          ]
        ]
      },
      {
        "kind": "sub",
        "text": "Los tres pares, y el error típico de cada uno"
      },
      {
        "kind": "table",
        "head": [
          "Par",
          "Error típico"
        ],
        "rows": [
          [
            "Autorización frente a carta",
            "Se vuela el procedimiento que se esperaba, no el que se autorizó"
          ],
          [
            "Carta frente a FMS",
            "El procedimiento cargado no es el publicado, por transición, pista o codificación"
          ],
          [
            "Autorización frente a FMS",
            "Se ejecuta antes de comparar, y el avión empieza a volar lo que nadie verificó"
          ]
        ]
      },
      {
        "kind": "sub",
        "text": "El principio de fondo"
      },
      {
        "kind": "p",
        "text": "El FMS no valida nada. Muestra lo que tiene. Que una ruta aparezca dibujada en la pantalla no dice que sea correcta, ni que esté autorizada, ni que el avión pueda volarla. Lo único que dice es que el sistema pudo construirla con los datos que tenía."
      },
      {
        "kind": "sub",
        "text": "Lo que este módulo no puede hacer"
      },
      {
        "kind": "p",
        "text": "**No inventar un SOP universal.** Quién carga, quién verifica, quién ejecuta y con qué palabras se hace es del operador. Lo que es común es **qué** se verifica, y esa es la lista de arriba."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "El contraste se hace en tres momentos naturales: al recibir la autorización, al cargar el procedimiento y antes de ejecutar. Y se repite cada vez que el ATC cambia algo, que es el asunto del capítulo 41."
      },
      {
        "kind": "p",
        "text": "La validación tiene además dos lados que conviene no confundir, porque ahí nace la mayoría de los errores:"
      },
      {
        "kind": "list",
        "items": [
          "**Antes de ejecutar.** Se compara y se corrige. Aquí no hay prisa que valga.",
          "**Después de ejecutar.** Se vigila que lo que el avión hace sea lo que se verificó. Aquí ya se está volando."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "p",
        "text": "La lista completa, los tres pares, y con la carta a la vista. Verificar de memoria no es verificar. En particular: al recibir una autorización, colacionar lo que se oyó, y comparar lo colacionado con lo que se va a programar."
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Se ejecuta una trayectoria que nadie comparó con nada, o que no está autorizada. Y como el FMS la vuela con precisión, no hay ninguna señal de que algo esté mal: todo parece normal."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Si la autorización y la carta no encajan, se pregunta. Una petición de confirmación es más barata que una desviación."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Dos:"
      },
      {
        "kind": "list",
        "items": [
          "Verificar el nombre del procedimiento y dar por bueno el resto. El nombre correcto con la transición equivocada es una trayectoria equivocada, y el nombre se lee en un segundo mientras la secuencia de puntos exige mirar.",
          "Tomar el FMS como árbitro. Si la carta y el FMS discrepan, el FMS no gana por estar en una pantalla: se trata como una discrepancia de datos de navegación, con la regla del capítulo 32."
        ]
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-21.svg",
        "alt": "Un triángulo con la autorización del ATC arriba, la carta abajo a la izquierda y el FMS abajo a la derecha, y en el centro un círculo rotulado contraste. Junto a cada lado, el error típico de ese par: entre autorización y carta, se vuela lo que se esperaba y no lo autorizado; entre carta y FMS, lo cargado no es lo publicado; entre autorización y FMS, se ejecuta antes de comparar.",
        "ancho": 1600,
        "alto": 900
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-22.svg",
        "alt": "Recreación de una página genérica de plan de vuelo del FMS con la SID KILAB 1A de la pista 09 cargada: un encabezado con la pista y el procedimiento, un renglón con la transición MORUS y cinco renglones de puntos con su derrota y su distancia; uno lleva la restricción de velocidad de 230 nudos y otros dos, las de altitud. Cinco números señalan la pista, el nombre del procedimiento, la transición, la columna de puntos y derrotas, y una restricción de altitud.",
        "ancho": 1600,
        "alto": 940,
        "pie": "Es la misma salida de la figura de la SID de este módulo, para que se pueda comparar punto por punto. Nombres y distancias ficticios."
      },
      {
        "kind": "list",
        "ordered": true,
        "items": [
          "La pista cargada tiene que ser la autorizada. Con otra pista, es otro procedimiento.",
          "Se compara con la autorización del ATC, no con lo que se esperaba recibir.",
          "La transición equivocada con el procedimiento correcto produce una trayectoria distinta. Es el error que más se escapa.",
          "Se compara la secuencia y las derrotas con la carta. Un número distinto delata un tramo que no es el que se cree.",
          "Leída en la carta no basta: hay que verla cargada aquí."
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Autorización, carta y FMS tienen que decir lo mismo.",
          "Cargar no es validar: se compara con la carta a la vista.",
          "Nombre, pista, transición, secuencia, derrotas, altitudes, velocidades, discontinuidades, final y frustrada.",
          "El contraste se hace al recibir la autorización, al cargar y antes de ejecutar; después solo queda vigilar.",
          "El FMS no valida: muestra lo que tiene.",
          "Quién hace qué lo dice el SOP del operador; qué se verifica es común."
        ]
      }
    ]
  },
  {
    "n": 35,
    "title": "Los sensores de navegación",
    "kicker": "P35",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "De dónde saca el sistema la posición. No interesa la electrónica: interesan dos preguntas de cabina."
      },
      {
        "kind": "p",
        "text": "¿QUÉ CAPACIDAD TENGO? ¿QUÉ PASA SI PIERDO UNA FUENTE?"
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Las fuentes que aparecen en las especificaciones PBN:"
      },
      {
        "kind": "table",
        "head": [
          "Fuente",
          "Qué aporta"
        ],
        "rows": [
          [
            "GNSS",
            "Posición por satélite, con o sin aumentación"
          ],
          [
            "DME/DME",
            "Posición por distancias a dos o más instalaciones DME"
          ],
          [
            "DME/DME/IRU",
            "Lo anterior, con sistemas inerciales que cubren huecos limitados de cobertura DME"
          ],
          [
            "IRS o IRU",
            "Posición inercial autónoma, sin referencia exterior"
          ],
          [
            "VOR/DME",
            "Posición por marcación y distancia"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "La circular de la FAA describe el caso DME/DME/IRU exactamente así: uso de instalaciones DME para determinar la posición junto con sistemas inerciales, que proporcionan información de posición suficiente durante **huecos limitados** de cobertura DME. La palabra clave es «limitados»: el inercial cubre un tramo sin DME, no un vuelo entero."
      },
      {
        "kind": "sub",
        "text": "Cada especificación admite lo suyo"
      },
      {
        "kind": "p",
        "text": "Y aquí está el dato que ordena todo el capítulo: **las fuentes admitidas no son las mismas en todas las especificaciones.** El caso más importante para una aerolínea:"
      },
      {
        "kind": "list",
        "items": [
          "En **RNAV 5** se admiten GNSS, DME/DME, VOR/DME, inerciales y LORAN C, cada uno declarable por separado.",
          "En **RNP APCH**, el GPS es el sistema de navegación primario y **los sistemas basados en DME/DME no son aceptables**. El segmento de frustrada sí puede basarse en una radioayuda convencional."
        ]
      },
      {
        "kind": "p",
        "text": "O sea: la misma pérdida de GNSS tiene consecuencias completamente distintas según lo que se esté volando."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "La pregunta operativa no es «¿qué sensores tiene el avión?», es «¿qué está usando ahora y qué admite lo que estoy volando?». Esa pregunta tiene respuesta en la página de progreso o de posición del FMS, y su interpretación está en el FCOM."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Qué fuentes admite la especificación del segmento en curso.",
          "Qué fuente está usando el sistema.",
          "Qué queda si se pierde la que está usando."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Si la fuente que queda no es admitida por la especificación, la capacidad se perdió, aunque el avión siga navegando perfectamente con ella."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«Si pierdo GNSS pierdo automáticamente toda capacidad RNAV.» Depende de la especificación: en RNAV 5 puede quedar capacidad con otra fuente; en RNP APCH, donde el GPS es primario y DME/DME no es aceptable, la conclusión es otra. La respuesta correcta empieza siempre por «depende de la especificación»."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Las fuentes posibles son GNSS, DME/DME, DME/DME/IRU, IRS o IRU, y VOR/DME.",
          "Lo admitido cambia con la especificación: en RNP APCH el GPS es primario y DME/DME no es aceptable.",
          "El inercial cubre huecos limitados de cobertura DME, no un vuelo entero.",
          "Perder GNSS no significa lo mismo en cada especificación."
        ]
      }
    ]
  },
  {
    "n": 36,
    "title": "GNSS en PBN",
    "kicker": "P36",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Global Navigation Satellite System. La circular de la FAA lo define como sistema global de posición y hora que incluye una o más constelaciones de satélites, receptores de a bordo y control de integridad del sistema, aumentado según sea necesario para apoyar la performance de navegación requerida para la operación prevista."
      },
      {
        "kind": "p",
        "text": "Bajo ese nombre entran el GPS, los sistemas de aumentación basados en satélites (SBAS, como WAAS), los basados en tierra (GBAS, como LAAS), GLONASS, Galileo y cualquier otro sistema de navegación por satélite aprobado para uso civil. Y la frase que importa: **el GNSS puede aumentarse según sea necesario para apoyar la RNP de la fase de operación real.**"
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Cinco cosas, y ninguna exige física satelital:"
      },
      {
        "kind": "sub",
        "text": "Es fuente de posición, y para muchas cosas la única admitida"
      },
      {
        "kind": "p",
        "text": "En RNP APCH es el sistema primario. Para las líneas de mínimos LPV y LP hace falta aumentación satelital."
      },
      {
        "kind": "sub",
        "text": "La integridad no es la precisión"
      },
      {
        "kind": "p",
        "text": "La precisión dice cuánto se parece la posición a la verdad; la integridad, si se puede confiar en ella y si el sistema avisa cuando no. En GNSS la integridad se consigue con algoritmos a bordo o con aumentación, y es el tema del capítulo 37."
      },
      {
        "kind": "sub",
        "text": "La disponibilidad se comprueba antes"
      },
      {
        "kind": "p",
        "text": "Con NOTAM y, cuando aplique, con una predicción. La circular exige confirmar la disponibilidad de la infraestructura necesaria para las rutas, procedimientos o aproximaciones previstas, **incluidas las contingencias no RNP**, para el periodo de la operación previsto y usando toda la información disponible."
      },
      {
        "kind": "sub",
        "text": "La geometría de los satélites importa"
      },
      {
        "kind": "p",
        "text": "No hace falta saber calcularla. Hace falta saber que el número y la disposición de los satélites visibles afecta a la disponibilidad de la función, y que por eso una predicción se hace para un lugar y una hora concretos, no «en general»."
      },
      {
        "kind": "sub",
        "text": "Y hay más cosas colgadas del GNSS de las que parece"
      },
      {
        "kind": "p",
        "text": "Una degradación de GNSS no afecta solo a la navegación lateral. La lista oficial de efectos posibles, que se ve entera en el capítulo 38, incluye el disparo poco fiable del TAWS, salidas de ADS-B erróneas o perdidas, efectos del FMS dependientes de la posición como una indicación errónea de combustible insuficiente, relojes del avión erróneos e indicaciones erróneas de viento y velocidad respecto al suelo."
      },
      {
        "kind": "p",
        "text": "Por eso la circular pide evaluar los riesgos y limitaciones operacionales asociados a la pérdida de capacidad GPS, **incluidos los sistemas de a bordo que requieren entradas de señal GPS**."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Antes de salir: NOTAM, predicción si aplica, y un plan alternativo con radioayudas convencionales en el destino. En vuelo: vigilancia y contraste."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "NOTAM de GNSS y de aumentación.",
          "La disponibilidad para el periodo previsto, incluidas las contingencias no RNP.",
          "Qué otros sistemas del avión dependen del GNSS."
        ]
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Pensar el GNSS como un interruptor: está o no está. Las degradaciones parciales son lo habitual, y sus efectos se reparten por todo el avión."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "GNSS incluye GPS, SBAS, GBAS, GLONASS, Galileo y otros sistemas aprobados para uso civil.",
          "Puede aumentarse según haga falta para apoyar la RNP de la operación real.",
          "La disponibilidad se confirma para el periodo previsto, incluidas las contingencias no RNP.",
          "Una degradación de GNSS afecta también al TAWS, al ADS-B, al reloj, al viento y a predicciones del FMS."
        ]
      }
    ]
  },
  {
    "n": 37,
    "title": "RAIM y la predicción de disponibilidad",
    "kicker": "P37",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Receiver Autonomous Integrity Monitoring. La circular lo define de forma breve y suficiente: **un algoritmo que verifica la integridad de la salida de posición usando mediciones GPS, o mediciones GPS más ayuda barométrica.**"
      },
      {
        "kind": "p",
        "text": "Y su hermano mayor, FDE (*Fault Detection and Exclusion*): un algoritmo RAIM que puede **detectar y excluir automáticamente un satélite defectuoso** de la solución de posición cuando hay suficientes mediciones satelitales redundantes disponibles."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "Qué función cumple"
      },
      {
        "kind": "p",
        "text": "Comprobar que la posición que el receptor entrega es confiable, y avisar cuando no puede garantizarlo. Es integridad, no precisión."
      },
      {
        "kind": "sub",
        "text": "Por qué a veces hay que comprobar la disponibilidad antes"
      },
      {
        "kind": "p",
        "text": "Porque la función RAIM depende de cuántos satélites se vean y cómo estén dispuestos, y eso cambia con el lugar y la hora. De ahí la exigencia condicional de la circular: el piloto debe, **cuando corresponda**, obtener una predicción RAIM para la operación RNP prevista."
      },
      {
        "kind": "p",
        "text": "La palabra «cuando corresponda» es la que hay que retener, y es exactamente lo que este módulo no puede convertir en regla universal."
      },
      {
        "kind": "sub",
        "text": "Cuándo corresponde"
      },
      {
        "kind": "p",
        "text": "Depende de cuatro cosas: la **especificación** de navegación, el **equipo** del avión, el **operador** y la **región**. Un ejemplo concreto del AIM ilustra lo específico que puede llegar a ser: para cierto equipo antiguo, la predicción de RAIM de aproximación de no precisión del propio receptor debe comprobarse en aeropuertos espaciados a intervalos no mayores de 60 NM a lo largo de la derrota del procedimiento RNAV 1, y debe haber RAIM de terminal o de aproximación disponible a la hora estimada sobre cada aeropuerto comprobado."
      },
      {
        "kind": "p",
        "text": "No hay que memorizar eso. Hay que sacar la conclusión: **la exigencia de predicción está atada al equipo y al tipo de operación, y se consulta, no se supone.**"
      },
      {
        "kind": "sub",
        "text": "Y no es la única arquitectura"
      },
      {
        "kind": "p",
        "text": "Las aeronaves modernas pueden usar otras arquitecturas y sistemas de aumentación para conseguir integridad. El RAIM es una forma de resolverlo, no la única. Por eso este capítulo se queda en el nivel del piloto y no se convierte en un curso de GPS."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "En la mayoría de flotas de transporte, la predicción, si hace falta, la resuelve el despacho o el sistema del operador. Lo que la tripulación tiene que saber es si en su operación hace falta y dónde se mira."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Si la operación prevista exige predicción, según la especificación, el equipo, el operador y la región.",
          "Si la exige, que esté hecha y qué dice.",
          "Los NOTAM de GNSS y de aumentación."
        ]
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Presentar la predicción RAIM como requisito universal de todas las aeronaves modernas. No lo es, y afirmarlo en una entrevista delata que se memorizó una frase suelta."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "RAIM es un algoritmo que verifica la integridad de la posición con mediciones GPS, o GPS más ayuda barométrica.",
          "FDE es un RAIM que además excluye automáticamente un satélite defectuoso cuando hay mediciones redundantes suficientes.",
          "La predicción se obtiene «cuando corresponda»: depende de la especificación, el equipo, el operador y la región.",
          "Las aeronaves modernas pueden usar otras arquitecturas y aumentación para la integridad."
        ]
      }
    ]
  },
  {
    "n": 38,
    "title": "GNSS degradado: interrupción, interferencia y suplantación",
    "kicker": "P38",
    "minutes": 10,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Tres cosas distintas que conviene no mezclar, porque cada una se maneja de otra manera:"
      },
      {
        "kind": "list",
        "items": [
          "**Interrupción** (*outage*): el servicio no está disponible. Puede ser planificada y publicada por NOTAM, o no planificada.",
          "**Interferencia**: hay señales que impiden usar el GNSS, o lo degradan. Puede ser accidental o intencional.",
          "**Suplantación** (*spoofing*): una señal falsa induce información de posición incorrecta, y el avión puede no decir nada."
        ]
      },
      {
        "kind": "p",
        "text": "La primera se planifica. La segunda se detecta. La tercera es el caso más incómodo de todo el módulo."
      },
      {
        "kind": "p",
        "text": "Este capítulo enseña a desconfiar de datos inconsistentes. No enseña, ni va a enseñar, nada sobre cómo se generan o se interfieren señales GNSS."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "La interrupción planificada se planifica"
      },
      {
        "kind": "p",
        "text": "Ante una interrupción planificada, por ejemplo una publicada por NOTAM, se puede planificar volar a través de ella usando la red de radioayudas convencionales según corresponda y según lo autorice el ATC."
      },
      {
        "kind": "p",
        "text": "Eso convierte la interrupción planificada en un problema de planificación, no de emergencia: se sabe dónde, se sabe cuándo y se lleva plan B."
      },
      {
        "kind": "sub",
        "text": "Cómo se manifiesta una interferencia"
      },
      {
        "kind": "p",
        "text": "La propia FAA lo describe: los problemas de GNSS se caracterizan a menudo por indicaciones de degradación de la navegación o de pérdida de servicio. En zonas con interferencia GNSS, la aeronave puede quedar sin poder usar el GPS para navegar y el ADS-B puede quedar no disponible para vigilancia. La interferencia por radiofrecuencia puede afectar a la vez a la navegación del piloto y a la vigilancia del controlador. Según el equipo y su integración, al piloto le puede llegar una luz de aviso o un mensaje."
      },
      {
        "kind": "sub",
        "text": "Por qué la suplantación es distinta"
      },
      {
        "kind": "p",
        "text": "La FAA lo advierte para un caso concreto y la advertencia vale como principio: ciertos sistemas mal instalados o defectuosos han producido disrupciones que se comportan efectivamente como una suplantación de señal, con salida de información de posición errónea y **sin bandera**, hacia las presentaciones primarias de vuelo y hacia otros sistemas del avión y del control de tránsito aéreo. Y añade lo que hay que llevarse: **como el RAIM es solo parcialmente efectivo frente a este tipo de disrupción, el piloto puede no advertir ninguna indicación de navegación errónea, y el ATC puede ser el único medio disponible para identificarlas.**"
      },
      {
        "kind": "sub",
        "text": "Los indicios, según la lista oficial"
      },
      {
        "kind": "table",
        "head": [
          "Indicio",
          "Cómo se nota"
        ],
        "rows": [
          [
            "Cambios en la performance de navegación real",
            "El valor estimado se mueve sin motivo"
          ],
          [
            "Cambios en el reloj del avión",
            "Hora incorrecta, o imposibilidad de conectarse a enlace de datos"
          ],
          [
            "Posición del FMS incorrecta",
            "La posición no cuadra con lo demás"
          ],
          [
            "Corrimiento grande de la posición GPS presentada",
            "El salto en el mapa"
          ],
          [
            "Avisos del PFD o del ND sobre error de posición",
            "La bandera, cuando la hay"
          ],
          [
            "Otras aeronaves reportando problemas de hora, errores de posición o pidiendo vectores",
            "La frecuencia como sensor"
          ],
          [
            "Disparo poco fiable del TAWS",
            "Alertas de terreno sin sentido"
          ],
          [
            "Posición inexacta en la presentación de navegación, incluidos mapa móvil y tableta electrónica",
            "El mapa no encaja"
          ],
          [
            "Salidas de ADS-B perdidas o erróneas",
            "Lo nota el ATC antes que el piloto"
          ],
          [
            "Efectos inesperados al navegar con radioayudas convencionales",
            "Si el avión está desplazado de la trayectoria prevista, la sintonización automática no selecciona la radioayuda cercana"
          ],
          [
            "Efectos del FMS dependientes de la posición",
            "Una indicación errónea de combustible insuficiente, por ejemplo"
          ],
          [
            "Indicaciones erróneas de viento y de velocidad respecto al suelo",
            "Números que no cuadran con el vuelo"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "El indicio de la sintonización automática es especialmente bueno para una entrevista, porque muestra comprensión: si el avión cree estar en otro sitio, las radioayudas que sintoniza solo no son las que debería."
      },
      {
        "kind": "p",
        "text": "**No hay que atribuir automáticamente todo corrimiento del mapa al GNSS.** Puede venir de otras causas, y la actuación correcta no depende de identificar la causa: depende de contrastar y de no confiar en una sola fuente."
      },
      {
        "kind": "sub",
        "text": "Qué hacer"
      },
      {
        "kind": "p",
        "text": "La recomendación oficial, en orden:"
      },
      {
        "kind": "list",
        "items": [
          "Estar atento a cualquier indicación de que el GPS del avión está perturbado, revisando la guía del fabricante para ese tipo y equipamiento.",
          "**Verificar la posición del avión por medio de radioayudas convencionales, cuando estén disponibles.**",
          "Evaluar los riesgos y limitaciones operacionales de la pérdida de capacidad GPS, incluidos los sistemas de a bordo que requieren entradas de GPS.",
          "Asegurar que las radioayudas críticas para la ruta o la aproximación previstas están disponibles.",
          "Estar preparado para revertir a procedimientos de vuelo por instrumentos convencionales.",
          "Notificar al ATC con prontitud si se experimentan anomalías de GPS."
        ],
        "ordered": true
      },
      {
        "kind": "sub",
        "text": "La pregunta que salva"
      },
      {
        "kind": "p",
        "text": "¿TIENE SENTIDO LA POSICIÓN QUE ME ESTÁ MOSTRANDO EL SISTEMA?"
      },
      {
        "kind": "p",
        "text": "Y las herramientas para contestarla, con lo que esté disponible: datos crudos, distancia y marcación a una radioayuda, terreno, la pista, la posición que reporta el ATC, otras fuentes de navegación."
      },
      {
        "kind": "p",
        "text": "La recomendación de la FAA lo dice como práctica y no como opción: volando IFR, conviene tener equipo de navegación adicional para la ruta prevista con el que contrastar la posición, y **comprobaciones rutinarias de la posición contra información de VOR o DME podrían ayudar a detectar una señal GPS comprometida**."
      },
      {
        "kind": "sub",
        "text": "Antes de salir"
      },
      {
        "kind": "p",
        "text": "Cinco recomendaciones: conocer las zonas de riesgo potencial, revisar los NOTAM pertinentes, **planificar contingencias de combustible**, planificar el uso de radioayudas convencionales y de los procedimientos de llegada y aproximación apropiados en el destino, y seguir la guía detallada del fabricante."
      },
      {
        "kind": "p",
        "text": "La de combustible es la que más se olvida y la que más cuesta: revertir a un procedimiento convencional puede significar más millas, más tiempo y otro alterno."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Una degradación de GNSS en ruta no es una emergencia, es una reorganización: qué capacidad queda, qué se puede volar en el destino, cuánto combustible cuesta y qué hay que decirle al ATC."
      },
      {
        "kind": "p",
        "text": "Y el contraste rutinario es lo que convierte esto de un tema de conferencia en un hábito. No es una maniobra: es mirar de vez en cuando si lo que dice el mapa cuadra con lo que dice el resto del avión."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "NOTAM de GNSS y zonas de riesgo conocidas.",
          "Qué radioayudas críticas hacen falta y si están disponibles.",
          "Que hay contingencia de combustible.",
          "Qué sistemas del avión dependen del GNSS.",
          "La posición contra al menos otra fuente, de forma rutinaria.",
          "La coherencia entre mapa, datos crudos, terreno, pista y lo que dice el ATC.",
          "El reloj y las indicaciones de viento y velocidad respecto al suelo, cuando algo huele raro."
        ]
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Se notifica con prontitud, con una excepción de sentido común: **no hay que informar al ATC de interferencia o suplantación cuando se vuela por zonas de pruebas conocidas y publicadas por NOTAM, salvo que se necesite asistencia del ATC.** Es para no saturar la frecuencia con lo que ya se sabe."
      },
      {
        "kind": "p",
        "text": "Y después del vuelo: documentar el suceso en el libro de mantenimiento para que se cierren las fallas, y presentar el reporte detallado en el sitio de la autoridad."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Tres:"
      },
      {
        "kind": "list",
        "items": [
          "Tratar interrupción e interferencia como lo mismo. La primera se planifica; la segunda se detecta y se contrasta.",
          "Confiar en la fuente que está comprometida para verificar la fuente comprometida. Si el mapa se construye con la posición GNSS, el mapa no puede validar la posición GNSS.",
          "Suponer que el avión avisará. En el escenario de suplantación, la propia autoridad advierte que puede no avisar. Y no notificar es el error grave: el sistema pierde información que sirve a los que vienen detrás."
        ]
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-23.svg",
        "alt": "Recreación de una pantalla de navegación en modo mapa: la derrota en magenta con tres waypoints y el avión centrado sobre ella, rotulado posición presentada. Desplazada a un lado, una segunda silueta de puntos rotulada posición según datos crudos y reporte del ATC, unida a la primera por una flecha doble: discrepancia. Al margen, tres indicios: el reloj del avión, el viento y la velocidad respecto al suelo, y que la sintonización automática no seleccione la radioayuda cercana. Al pie, la pregunta: ¿tiene sentido la posición que me está mostrando el sistema?",
        "ancho": 1600,
        "alto": 960
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Interrupción es que el servicio no esté; interferencia es que haya señales que lo impidan o degraden; suplantación es una señal falsa que induce posición incorrecta.",
          "Una interrupción publicada se planifica: se vuela con radioayudas convencionales según lo autorice el ATC.",
          "Ante interferencia: verificar la posición con radioayudas, evaluar qué depende del GPS, asegurar las radioayudas críticas, estar listo para revertir y notificar al ATC.",
          "El RAIM es solo parcialmente efectivo frente a una suplantación: el piloto puede no advertirlo y el ATC puede ser el único medio de identificarla.",
          "No todo corrimiento del mapa es GNSS: lo que corresponde es contrastar, no diagnosticar.",
          "Antes de salir: zonas de riesgo, NOTAM, contingencia de combustible, plan con radioayudas convencionales y guía del fabricante."
        ]
      }
    ]
  },
  {
    "n": 39,
    "title": "La SID PBN",
    "kicker": "P39",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Una salida normalizada PBN es una trayectoria definida por puntos, con restricciones, que el avión va a volar a partir de datos codificados. La diferencia con una SID convencional no está en el dibujo: está en que aquí hay una especificación que cumplir y una trayectoria que verificar."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Lo que se prepara, en orden:"
      },
      {
        "kind": "table",
        "head": [
          "Qué",
          "Dónde está"
        ],
        "rows": [
          [
            "Especificación requerida",
            "Notas de la carta o recuadro PBN"
          ],
          [
            "Ruta y puntos",
            "La carta"
          ],
          [
            "Restricciones de altitud",
            "La carta, y verificadas en el FMS"
          ],
          [
            "Restricciones de velocidad",
            "Ídem"
          ],
          [
            "Tramos RF",
            "Notas de la carta o el punto correspondiente"
          ],
          [
            "Notas de equipo",
            "Recuadro de requisitos de equipo"
          ],
          [
            "Autorización del ATC",
            "Lo que se recibió y se coló"
          ]
        ]
      },
      {
        "kind": "sub",
        "text": "La autorización abreviada, que es de la FAA"
      },
      {
        "kind": "p",
        "text": "En el marco de la FAA, una autorización para una SID con restricciones de altitud publicadas puede darse con la fraseología **«climb via»**, que es una autorización abreviada que exige cumplir la trayectoria lateral del procedimiento y las restricciones de velocidad y altitud asociadas a lo largo de la ruta o el procedimiento autorizados."
      },
      {
        "kind": "p",
        "text": "Y cuando la SID no trae restricciones publicadas, o es una SID con segmento de vectores radar, la autorización se da con «maintain (altitud)»."
      },
      {
        "kind": "p",
        "text": "**Verificar:** esa fraseología es de la FAA. En Colombia hay que leer lo que publique el AIP y lo que use el ATC local, y no dar por hecho el uso estadounidense. Mezclar fraseologías de dos autoridades es uno de los errores que peor sientan en una entrevista."
      },
      {
        "kind": "sub",
        "text": "Y una exigencia que ya se vio"
      },
      {
        "kind": "p",
        "text": "Antes de rodar hay que confirmar la posición del avión, y con GNSS la señal debe estar adquirida antes de iniciar la carrera."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "El error más caro de una SID PBN no es de pilotaje: es de programación. Pista equivocada, transición equivocada, o una restricción leída en la carta y no cargada."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "p",
        "text": "La lista del capítulo 34, con la carta a la vista, antes de ejecutar."
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Se vuela una trayectoria que no es la publicada, en la fase con menos altura disponible del vuelo."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Colacionar, y comparar lo colacionado con lo que se va a programar. Si la autorización y la carta no encajan, preguntar antes de rodar."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Cargar la SID por su nombre y no mirar la transición. Y usar fraseología de otra autoridad porque suena profesional."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Una SID PBN exige una especificación, y está en las notas o en el recuadro PBN.",
          "Se verifican ruta, puntos, altitudes, velocidades, tramos RF y notas de equipo.",
          "«Climb via» es una autorización abreviada de la FAA: exige cumplir trayectoria lateral y restricciones.",
          "Antes de rodar, posición confirmada; con GNSS, señal adquirida antes de la carrera."
        ]
      }
    ]
  },
  {
    "n": 40,
    "title": "La STAR PBN",
    "kicker": "P40",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Misma lógica que la SID, con dos añadidos propios: la transición de llegada y el perfil vertical, que en una llegada suele ser lo que más carga de trabajo genera."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "Lo que se verifica: transición, secuencia de puntos, altitudes, velocidades, el enganche con la aproximación prevista y la especificación requerida."
      },
      {
        "kind": "sub",
        "text": "La autorización de descenso, que también es de la FAA"
      },
      {
        "kind": "p",
        "text": "En el marco de la FAA, cuando una ruta IFR autorizada incluye una STAR, el piloto debe mantener la última altitud asignada **hasta recibir autorización para descender** cumpliendo todas las restricciones de altitud publicadas o emitidas. Esa autorización puede contener la fraseología **«descend via»**."
      },
      {
        "kind": "p",
        "text": "**Verificar:** de nuevo, es fraseología de la FAA. Lo que se usa en Colombia se lee en el AIP y se oye en la frecuencia, y no se supone."
      },
      {
        "kind": "sub",
        "text": "Lo que pasa cuando el ATC saca el avión de la STAR"
      },
      {
        "kind": "p",
        "text": "Y aquí está el dato operacional más importante del capítulo, del que casi nadie se acuerda a tiempo:"
      },
      {
        "kind": "p",
        "text": "Si se vectorea al avión o se lo autoriza a desviarse de una STAR, **el piloto debe considerar la STAR cancelada**. Si la STAR tenía restricciones de altitud, de velocidad o una nota de carta para la transición de Mach a velocidad indicada, **esas restricciones también quedan canceladas**, y el piloto recibirá una altitud que mantener y, si hace falta, una velocidad."
      },
      {
        "kind": "p",
        "text": "Si el ATC piensa volver a meter al avión en la STAR, el controlador avisará dónde esperar reanudar el procedimiento, y el piloto debe estar preparado para reincorporarse en el punto o tramo siguiente."
      },
      {
        "kind": "p",
        "text": "La misma regla existe para la SID: una vez establecido en la SID, si se vectorea al avión o se lo autoriza a desviarse de la SID o de su transición, la SID se considera cancelada, salvo que el controlador añada que se espere reanudarla. Y las restricciones publicadas quedan canceladas."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "La consecuencia práctica es enorme y se olvida bajo carga de trabajo: después de unos vectores, **las restricciones de la STAR ya no están**, y el avión vuela con la altitud que el ATC asignó. Seguir «cumpliendo» la STAR cancelada es tan problemático como ignorar una restricción vigente."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "La transición correcta y su enganche con la aproximación.",
          "Que las restricciones están cargadas.",
          "Después de unos vectores: si la STAR sigue viva o no, y si el ATC dijo dónde esperar reanudarla."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "O se incumple una restricción vigente, o se cumple una que ya no existe y se sorprende al ATC con un perfil que no pidió."
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Si no está claro si la STAR sigue vigente, se pregunta. Es una pregunta corta y ahorra un desvío."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Suponer que después de unos vectores la STAR sigue vigente con sus restricciones. En el marco descrito, no lo está."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Se verifican transición, puntos, altitudes, velocidades y el enganche con la aproximación.",
          "«Descend via» es fraseología de la FAA, y hay que mantener la última altitud asignada hasta recibir autorización para descender.",
          "Si se vectorea o se autoriza desviarse de la STAR, la STAR se considera cancelada, y con ella sus restricciones.",
          "El ATC avisa dónde esperar reanudar el procedimiento; hay que estar listo para reincorporarse."
        ]
      }
    ]
  },
  {
    "n": 41,
    "title": "Vectores y directos",
    "kicker": "P41",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Las dos maneras en que el ATC modifica una trayectoria PBN en vuelo, y las dos exigen gestión de cabina."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "Vectores"
      },
      {
        "kind": "p",
        "text": "Sacan al avión de la trayectoria publicada. Lo que hay que tener presente:"
      },
      {
        "kind": "list",
        "items": [
          "El procedimiento se considera cancelado, con sus restricciones, salvo que el controlador diga que se espere reanudarlo.",
          "Cambia el modo de navegación: el avión deja de seguir la trayectoria lateral del FMS.",
          "Hay que saber **dónde y cómo** se va a reincorporar, y qué secuencia quedará activa al hacerlo."
        ]
      },
      {
        "kind": "sub",
        "text": "Directos"
      },
      {
        "kind": "p",
        "text": "Un directo a un punto cambia más cosas de las que parece:"
      },
      {
        "kind": "table",
        "head": [
          "Qué cambia",
          "Por qué importa"
        ],
        "rows": [
          [
            "Geometría",
            "La trayectoria deja de ser la publicada entre esos puntos"
          ],
          [
            "Secuenciamiento",
            "Los puntos intermedios pueden salir del plan activo"
          ],
          [
            "Perfil vertical",
            "Las restricciones asociadas a puntos que se saltan desaparecen del cálculo"
          ],
          [
            "Predicción de combustible",
            "Cambian distancia y tiempo"
          ],
          [
            "Preparación de la aproximación",
            "El enganche con el procedimiento puede romperse"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "Y el punto que hay que verificar siempre: **a qué punto exactamente se está autorizado.** Los nombres de cinco letras se parecen entre sí y se oyen mal en una frecuencia cargada. Se colaciona y se compara con la carta antes de ejecutar."
      },
      {
        "kind": "sub",
        "text": "Un detalle de selección que conviene conocer"
      },
      {
        "kind": "p",
        "text": "En el marco de la FAA hay una advertencia práctica sobre la aproximación: seleccionar la opción de «vectores a final» o «vectores» para una aproximación por instrumentos **puede impedir que se carguen en el sistema los puntos situados fuera del FAF**, y por eso se desaconseja su uso, por el aumento de carga de trabajo que supone volver a programar el sistema."
      },
      {
        "kind": "p",
        "text": "Es un buen ejemplo de una decisión de cabina aparentemente cómoda que se paga después."
      },
      {
        "kind": "sub",
        "text": "Y los desplazamientos laterales"
      },
      {
        "kind": "p",
        "text": "Entre los conocimientos requeridos está saber cómo se aplican los desplazamientos laterales (*offsets*), cuál es la funcionalidad del sistema propio y **la necesidad de avisar al ATC si esa funcionalidad no está disponible**. Es decir: si el ATC pide un desplazamiento paralelo y el avión no lo sabe hacer, se dice."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Cada cambio del ATC reinicia el triángulo del capítulo 34: autorización nueva, comparar con la carta, programar, verificar, ejecutar. La tentación bajo carga de trabajo es programar y ejecutar sin el paso del medio."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "A qué punto se está autorizado, colacionado y comparado.",
          "Qué restricciones sobreviven y cuáles no.",
          "Qué secuencia queda activa y si la aproximación sigue enganchada.",
          "Si la funcionalidad que pide el ATC está disponible."
        ]
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Confirmar el punto si hay cualquier duda, y avisar si una funcionalidad solicitada no está disponible."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Ejecutar un directo y descubrir después que se saltó un punto con restricción, o que la aproximación quedó desenganchada. El paso que falta es verificar antes de ejecutar."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-24.svg",
        "alt": "Diagrama de flujo vertical con siete cajas: autorización del ATC, entender, colacionar, seleccionar o modificar el FMS, contrastar, ejecutar y vigilar. Junto a contrastar, tres preguntas: a qué punto exactamente, qué restricciones sobreviven y si sigue enganchada la aproximación. Una flecha vuelve de vigilar al principio: cada cambio del ATC reinicia el flujo.",
        "ancho": 1600,
        "alto": 940
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Unos vectores cancelan el procedimiento y sus restricciones, salvo que el controlador diga que se espere reanudarlo.",
          "Un directo cambia geometría, secuenciamiento, perfil vertical, predicción de combustible y preparación de la aproximación.",
          "Hay que verificar a qué punto exactamente se está autorizado.",
          "Si la funcionalidad que pide el ATC no está disponible, hay que avisarlo."
        ]
      }
    ]
  },
  {
    "n": 42,
    "title": "La capacidad en el plan de vuelo",
    "kicker": "P42",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "La capacidad PBN se declara en el plan de vuelo OACI en dos sitios, y los dos hacen falta:"
      },
      {
        "kind": "list",
        "items": [
          "**Casilla 10**, equipo y capacidades: la letra **R**, que significa **PBN aprobado**, con los detalles en la casilla 18.",
          "**Casilla 18**, otra información: el indicador **`PBN/`** seguido de los descriptores que apliquen, hasta un máximo de **8 entradas**, es decir un total de no más de **16 caracteres**."
        ]
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "p",
        "text": "La tabla completa de descriptores:"
      },
      {
        "kind": "sub",
        "text": "Especificaciones RNAV"
      },
      {
        "kind": "table",
        "head": [
          "Código",
          "Significado"
        ],
        "rows": [
          [
            "A1",
            "RNAV 10 (RNP 10)"
          ],
          [
            "B1",
            "RNAV 5 con todos los sensores permitidos"
          ],
          [
            "B2",
            "RNAV 5 con GNSS"
          ],
          [
            "B3",
            "RNAV 5 con DME/DME"
          ],
          [
            "B4",
            "RNAV 5 con VOR/DME"
          ],
          [
            "B5",
            "RNAV 5 con INS o IRS"
          ],
          [
            "B6",
            "RNAV 5 con LORAN C"
          ],
          [
            "C1",
            "RNAV 2 con todos los sensores permitidos"
          ],
          [
            "C2",
            "RNAV 2 con GNSS"
          ],
          [
            "C3",
            "RNAV 2 con DME/DME"
          ],
          [
            "C4",
            "RNAV 2 con DME/DME/IRU"
          ],
          [
            "D1",
            "RNAV 1 con todos los sensores permitidos"
          ],
          [
            "D2",
            "RNAV 1 con GNSS"
          ],
          [
            "D3",
            "RNAV 1 con DME/DME"
          ],
          [
            "D4",
            "RNAV 1 con DME/DME/IRU"
          ]
        ]
      },
      {
        "kind": "sub",
        "text": "Especificaciones RNP"
      },
      {
        "kind": "table",
        "head": [
          "Código",
          "Significado"
        ],
        "rows": [
          [
            "L1",
            "RNP 4"
          ],
          [
            "O1",
            "RNP 1 básica con todos los sensores permitidos"
          ],
          [
            "O2",
            "RNP 1 básica con GNSS"
          ],
          [
            "O3",
            "RNP 1 básica con DME/DME"
          ],
          [
            "O4",
            "RNP 1 básica con DME/DME/IRU"
          ],
          [
            "S1",
            "RNP APCH"
          ],
          [
            "S2",
            "RNP APCH con Baro-VNAV"
          ],
          [
            "T1",
            "RNP AR APCH con RF (requiere autorización especial)"
          ],
          [
            "T2",
            "RNP AR APCH sin RF (requiere autorización especial)"
          ]
        ]
      },
      {
        "kind": "sub",
        "text": "Lo que la tabla enseña, más allá de los códigos"
      },
      {
        "kind": "p",
        "text": "Tres lecturas que valen en una entrevista:"
      },
      {
        "kind": "list",
        "items": [
          "**El sensor se declara.** No basta decir «RNAV 1»: se declara con qué. Y eso importa cuando se pierde una fuente.",
          "**`S2` existe porque Baro-VNAV es una capacidad aparte.** RNP APCH con guía vertical barométrica no es lo mismo que RNP APCH.",
          "**`T1` y `T2` llevan escrita la autorización especial** en su propio texto, y se distinguen por la capacidad de tramo RF. Es la confirmación, en el plan de vuelo, de todo lo dicho en el capítulo 21."
        ]
      },
      {
        "kind": "sub",
        "text": "Una regla de fondo"
      },
      {
        "kind": "p",
        "text": "El ATC emite autorizaciones **basándose en las capacidades declaradas** en las casillas 10 y 18. Los operadores deben declarar todas las capacidades para las que la aeronave y la tripulación están certificados, capacitados y autorizados. Y la contrapartida, que la FAA dice sin rodeos: **cuando se declara una capacidad, el ATC espera que se use.**"
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "El plan lo presenta el despacho, pero el que responde en frecuencia es el piloto. Si el plan declara una capacidad que hoy no se tiene, por MEL o por falla, hay una contradicción que se resuelve antes de salir, no explicándola por radio después."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Que los códigos declarados corresponden a lo que el avión tiene hoy.",
          "Que la R está en la casilla 10 si hay capacidad PBN declarada.",
          "Que si hay un ítem de MEL que quita una capacidad, el plan lo refleja."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "El ATC autoriza suponiendo una capacidad que no existe, y el problema aparece cuando ya se está volando la trayectoria."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Declarar de más «por si acaso». Si se declara, se espera que se use. Y el error contrario: no declarar una capacidad que se tiene, con lo que se pierden procedimientos y eficiencia."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-25.svg",
        "alt": "Recreación de un fragmento de plan de vuelo OACI. En la casilla 10, la cadena de equipo SDFGHIRWY/S, con la R resaltada. En la casilla 18, PBN/A1D2O2S2 y otro indicador. Debajo, qué significa cada descriptor: A1, RNAV 10; D2, RNAV 1 con GNSS; O2, RNP 1 básica con GNSS; S2, RNP APCH con Baro-VNAV. Tres números señalan la R, el indicador PBN/ y el descriptor S2.",
        "ancho": 1600,
        "alto": 900,
        "pie": "Casilla 10 y descriptores según el Doc 4444 de la OACI, Apéndice 2. El resto de la cadena es de ejemplo."
      },
      {
        "kind": "list",
        "ordered": true,
        "items": [
          "Significa PBN aprobado. Es la declaración general; los detalles van en la casilla 18.",
          "Aquí van los descriptores concretos, hasta 8 entradas y no más de 16 caracteres en total.",
          "RNP APCH con Baro-VNAV. La guía vertical barométrica es una capacidad declarable aparte, distinta de `S1`."
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Casilla 10: la letra R, PBN aprobado. Casilla 18: `PBN/` con hasta 8 descriptores y no más de 16 caracteres.",
          "Los descriptores declaran especificación **y** sensor: por eso hay B2, B3, B4, C3, C4, D2, D3, D4, O2, O3, O4.",
          "`S1` es RNP APCH y `S2` es RNP APCH con Baro-VNAV. `T1` y `T2` son RNP AR, con y sin RF, y requieren autorización especial.",
          "El ATC autoriza según lo declarado, y espera que la capacidad declarada se use."
        ]
      }
    ]
  },
  {
    "n": 43,
    "title": "La MEL y la capacidad PBN",
    "kicker": "P43",
    "minutes": 8,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Un avión puede quedar **aeronavegable y despachable** y haber perdido una capacidad PBN. Esa frase resume el capítulo, y la norma la respalda de la forma más directa posible: exige que la información sobre las capacidades de especificación de navegación de la aeronave **esté incluida en la MEL**."
      },
      {
        "kind": "p",
        "text": "Si la norma obliga a que esa información esté en la MEL, es porque la MEL puede quitarla."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "Lo que se puede perder sin perder el despacho"
      },
      {
        "kind": "table",
        "head": [
          "Capacidad",
          "Consecuencia si se pierde"
        ],
        "rows": [
          [
            "RNAV",
            "No se vuelan procedimientos que exijan esa especificación RNAV"
          ],
          [
            "RNP",
            "No se vuelan procedimientos RNP: se pierde el control y alerta"
          ],
          [
            "RNP AR",
            "No se vuelan procedimientos con autorización requerida"
          ],
          [
            "Aproximación",
            "Puede caerse una línea de mínimos, o la aproximación entera"
          ],
          [
            "Funciones",
            "Un tramo RF, el escalado, el desplazamiento paralelo"
          ]
        ]
      },
      {
        "kind": "sub",
        "text": "Sistemas que la MEL puede tocar y que afectan a PBN"
      },
      {
        "kind": "p",
        "text": "GNSS, FMC o FMS, sistemas inerciales, DME, presentaciones de navegación, director de vuelo, piloto automático y sistemas de radionavegación."
      },
      {
        "kind": "p",
        "text": "Y una advertencia que hay que decir siempre: **no hay una regla automática.** Que falle uno de esos sistemas no elimina por sí mismo la capacidad PBN. Depende de cuatro cosas:"
      },
      {
        "kind": "p",
        "text": "la ESPECIFICACIÓN de navegación la CONFIGURACIÓN de la aeronave la MEL la OPERACIÓN prevista"
      },
      {
        "kind": "sub",
        "text": "El caso del piloto automático, que es el que más sorprende"
      },
      {
        "kind": "p",
        "text": "Para RNP APCH se recomienda que el director de vuelo esté acoplado o el piloto automático permanezca acoplado. Y aquí está el giro: **si el error total del sistema lateral no puede demostrarse sin esos sistemas, el acoplamiento pasa a ser obligatorio**, y entonces la guía operacional debe indicar que el acoplamiento del director de vuelo o del piloto automático es obligatorio para esas aproximaciones."
      },
      {
        "kind": "p",
        "text": "Dicho de otro modo: en ciertas aeronaves, un piloto automático inoperativo no es solo una molestia, es la pérdida de una capacidad de aproximación."
      },
      {
        "kind": "p",
        "text": "Lo mismo aparece en A-RNP: el uso de las precisiones laterales reducidas normalmente exige el piloto automático, el director de vuelo, o ambos. Y en RNP AR, el valor mínimo autorizado puede variar según se use director de vuelo con o sin piloto automático."
      },
      {
        "kind": "sub",
        "text": "Y la redundancia"
      },
      {
        "kind": "p",
        "text": "Cuando la operación exige continuidad, por ejemplo una frustrada RNP AR que pide menos de 1.00 NM, la operación típicamente requiere equipo redundante. Un ítem de MEL que quita la redundancia quita la operación, aunque el sistema que queda funcione perfectamente."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "La secuencia de despacho es: leer la entrada de MEL completa, ver qué capacidad afecta, comprobar si el vuelo previsto necesita esa capacidad, y si la necesita, resolverlo antes de salir. Lo que incluye revisar si el plan de vuelo declara una capacidad que ya no se tiene."
      },
      {
        "kind": "p",
        "text": "Y una precisión sobre combinaciones: dos ítems aceptables por separado pueden no serlo juntos. La lista puede prohibir expresamente una combinación, y el efecto conjunto sobre la capacidad PBN puede no coincidir con el de ninguno de los dos aislados. Eso lo resuelve la MEL, no la suma mental de restricciones."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Qué dice la entrada de MEL completa, incluidas las observaciones.",
          "Qué capacidad de especificación de navegación queda, según la información que la MEL debe incluir.",
          "Si el vuelo previsto necesita esa capacidad, en salida, ruta y aproximación, incluidos los alternos.",
          "Si el plan de vuelo hay que corregirlo."
        ]
      },
      {
        "kind": "titulo",
        "text": "¿Qué ocurre si no se cumple?"
      },
      {
        "kind": "p",
        "text": "Se sale con un plan que declara una capacidad inexistente, y se descubre al recibir una autorización que no se puede cumplir."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "«Si el avión es despachable por MEL mantiene automáticamente todas sus capacidades PBN.» Es exactamente lo contrario de lo que la norma previene al exigir que la MEL lleve esa información."
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-26.svg",
        "alt": "Recreación de una entrada de MEL ficticia para un receptor GNSS, con cinco columnas: ítem y sistema, categoría de reparación C, dos instalados, uno requerido para el despacho, y las observaciones, que empiezan con el símbolo (O) de procedimiento operacional y dicen que no se permiten las operaciones que exijan dos receptores. Cinco números señalan la columna del sistema, el número requerido, el (O), la columna de observaciones y el renglón que quita una capacidad de navegación.",
        "ancho": 1600,
        "alto": 900,
        "pie": "Entrada inventada para enseñar dónde mirar. El formato de columnas cambia entre la MMEL del fabricante y la MEL de cada operador."
      },
      {
        "kind": "list",
        "ordered": true,
        "items": [
          "Qué sistema es y su número de ítem. Es lo que se busca, pero no es lo que decide.",
          "Cuántos hacen falta para despachar. Despachar no es conservar todas las capacidades.",
          "Indica que hay un procedimiento operacional asociado. Hay que buscarlo y leerlo: ahí suele estar la restricción real.",
          "Aquí aparece qué queda limitado. Es la parte que se salta quien solo mira si el avión es despachable.",
          "Esta es la línea que puede quitar una capacidad PBN concreta con el avión perfectamente despachable."
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "La norma exige que la MEL incluya la información de capacidades de especificación de navegación: la MEL puede quitarlas.",
          "Despachable no es «con todas las capacidades»: depende de la especificación, la configuración, la MEL y la operación.",
          "En ciertas aeronaves el acoplamiento del piloto automático o del director de vuelo es obligatorio para RNP APCH, y sin él se pierde la capacidad.",
          "Dos ítems aceptables por separado pueden no serlo juntos: lo resuelve la MEL, no la suma de restricciones."
        ]
      }
    ]
  },
  {
    "n": 44,
    "title": "El reparto en cabina: seleccionar, verificar, ejecutar, vigilar",
    "kicker": "P44",
    "minutes": 10,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "La mayoría de los errores de una operación PBN no son de pilotaje: son de gestión de la automatización y de reparto de tareas."
      },
      {
        "kind": "p",
        "text": "De ahí sale el principio que Aviatory propone para gestionar el FMS, en cuatro pasos y en ese orden:"
      },
      {
        "kind": "p",
        "text": "SELECCIONAR   →   VERIFICAR   →   EJECUTAR   →   VIGILAR"
      },
      {
        "kind": "p",
        "text": "No es una norma: es una regla mental construida sobre lo que las normas exigen en cada paso."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "La lista de lo que puede salir mal"
      },
      {
        "kind": "table",
        "head": [
          "Error",
          "Cómo se produce"
        ],
        "rows": [
          [
            "Procedimiento equivocado",
            "Se carga otro con nombre parecido"
          ],
          [
            "Transición equivocada",
            "El nombre coincide y la transición no"
          ],
          [
            "Pista equivocada",
            "Cambio de pista de última hora sin recargar"
          ],
          [
            "Directo a un punto equivocado",
            "Nombres de cinco letras parecidos"
          ],
          [
            "Secuenciamiento prematuro",
            "El sistema pasa al punto siguiente antes de lo esperado"
          ],
          [
            "Discontinuidad eliminada mal",
            "Se une lo que no había que unir"
          ],
          [
            "Restricción de altitud mal cargada",
            "Se leyó en la carta y no se verificó en el FMS"
          ],
          [
            "Suponer que la base es correcta",
            "No se compara con la carta"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "Todos tienen el mismo antídoto: verificar antes de ejecutar, y vigilar después."
      },
      {
        "kind": "sub",
        "text": "Los cuatro pasos"
      },
      {
        "kind": "p",
        "text": "**Seleccionar.** Cargar el procedimiento **desde la base de datos**, con el nombre, la pista y la transición de la autorización recibida. Nunca escribir un procedimiento a mano."
      },
      {
        "kind": "p",
        "text": "**Verificar.** Comparar con la carta: nombre, pista, transición, secuencia, derrotas, altitudes, velocidades, discontinuidades, final y frustrada. Lo hace alguien distinto de quien cargó. Aquí es donde la norma pide usar las capacidades de la aviónica para verificar los datos de puntos y de derrota después de cargar."
      },
      {
        "kind": "p",
        "text": "**Ejecutar.** Solo después de verificar. Este es el punto sin retorno: a partir de aquí, el avión va a volar lo que está cargado, verificado o no."
      },
      {
        "kind": "p",
        "text": "**Vigilar.** Durante todo el procedimiento: la desviación lateral, el progreso, el valor RNP aplicable, las restricciones que van llegando y cualquier aviso. La norma pide procedimientos de vigilancia para cada fase de vuelo."
      },
      {
        "kind": "sub",
        "text": "El reparto de tareas"
      },
      {
        "kind": "p",
        "text": "En términos generales, el piloto a los mandos vuela y gestiona la trayectoria, y el piloto que vigila monitoriza, verifica y apoya las comunicaciones y la programación. Y los dos hacen el contraste."
      },
      {
        "kind": "p",
        "text": "**No inventar un reparto universal.** Quién programa, quién verifica, quién ejecuta y con qué llamadas es del SOP del operador, y la norma se lo exige a él: el explotador debe establecer y documentar procedimientos normales y anormales y los requisitos de calificación y competencia de la tripulación de acuerdo con las especificaciones de navegación apropiadas."
      },
      {
        "kind": "p",
        "text": "Lo que sí es común es el principio: **el que programa no es el que verifica.** Si una sola persona hace las dos cosas, no hay verificación, hay repetición."
      },
      {
        "kind": "sub",
        "text": "Lo que la norma pide sobre automatización"
      },
      {
        "kind": "p",
        "text": "Entre los conocimientos requeridos están: el uso recomendado por el operador de la automatización según la fase de vuelo y la carga de trabajo, incluidos los métodos para minimizar el error de desviación lateral y mantener el eje de la ruta; los procedimientos de vigilancia para cada fase de vuelo; el ajuste automático o manual del valor RNP requerido; y la conciencia de posibles capturas laterales y verticales falsas durante una transición a la captura de un ILS."
      },
      {
        "kind": "p",
        "text": "Ese último punto es de los que se preguntan poco y valen mucho: pasar de una trayectoria PBN a un ILS tiene su propio riesgo, y la norma pide conocerlo."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "El orden es lo que hace el trabajo. Invertir dos pasos cualesquiera rompe la defensa:"
      },
      {
        "kind": "list",
        "items": [
          "Ejecutar antes de verificar: el avión empieza a volar algo que nadie comparó.",
          "Verificar después de ejecutar: se descubre el error mientras se corrige la trayectoria.",
          "No vigilar: se ejecutó bien y nadie se dio cuenta de que algo cambió."
        ]
      },
      {
        "kind": "p",
        "text": "Y la carga de trabajo es el enemigo. Cuando sube, lo primero que desaparece es la verificación, porque es lo único que no produce un efecto visible cuando se hace bien. Por eso el SOP la vuelve obligatoria y con palabras concretas."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Que los cuatro pasos se dieron, en orden, cada vez que la trayectoria cambia. Y cambia más veces de las que uno espera: en el briefing, con la autorización inicial, con cada vector, con cada directo, con cada cambio de pista.",
          "Que la verificación la hace alguien distinto de quien programó.",
          "El valor RNP aplicado y si se fija solo o a mano.",
          "La transición de una trayectoria PBN a un ILS, con atención a capturas falsas."
        ]
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Tres:"
      },
      {
        "kind": "list",
        "items": [
          "Programar y ejecutar en un mismo movimiento.",
          "Saltarse la verificación cuando el cambio parece pequeño. Un directo a un punto es un cambio pequeño de teclado y grande de trayectoria.",
          "Bajo carga de trabajo, verificar en voz alta lo que se espera ver en vez de lo que está en la pantalla."
        ]
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-27.svg",
        "alt": "Cuatro bloques en fila, cada uno más oscuro que el anterior: seleccionar, desde la base de datos y nunca a mano; verificar, contra la carta y lo hace otro; ejecutar, el punto sin retorno; y vigilar, la desviación lateral, el progreso, el valor RNP y los avisos. Entre verificar y ejecutar, una barra vertical marca el límite.",
        "ancho": 1600,
        "alto": 700
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Los errores típicos son de programación y gestión, no de pilotaje.",
          "Seleccionar desde la base de datos, nunca a mano. Verificar contra la carta, y que lo haga alguien distinto de quien cargó.",
          "Ejecutar solo después de verificar: es el punto sin retorno. Vigilar durante todo el procedimiento.",
          "Los cuatro pasos se repiten cada vez que la trayectoria cambia.",
          "El reparto concreto de tareas es del SOP del operador, y la norma se lo exige.",
          "Hay que conocer la vigilancia por fase, el ajuste del valor RNP y el riesgo de capturas falsas al pasar de PBN a un ILS."
        ]
      }
    ]
  },
  {
    "n": 45,
    "title": "Perder la capacidad PBN",
    "kicker": "P45",
    "minutes": 8,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Uno de los dos capítulos más importantes del módulo. Lo que hay que construir aquí no es una lista de memoria: es un **flujo mental** que sirva en cualquier fase y con cualquier especificación."
      },
      {
        "kind": "p",
        "text": "LA CAPACIDAD PBN SE DEGRADA             ↓ CONTROLAR EL AVIÓN             ↓ IDENTIFICAR EL MENSAJE O LA FALLA             ↓ CONTRASTAR LA POSICIÓN             ↓ APLICAR QRH Y SOP             ↓ DETERMINAR QUÉ CAPACIDAD DE NAVEGACIÓN QUEDA             ↓ ¿SE PUEDE SEGUIR CUMPLIENDO LA ESPECIFICACIÓN EXIGIDA?             ↓       SÍ  ──────────→  continuar y seguir vigilando             ↓       NO             ↓ INFORMAR AL ATC SOLICITAR AUTORIZACIÓN ALTERNATIVA USAR LA CAPACIDAD DE NAVEGACIÓN DISPONIBLE"
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "Qué cuenta como pérdida de capacidad"
      },
      {
        "kind": "p",
        "text": "La definición que da la circular de la FAA es amplia y hay que usarla así: **cualquier falla o suceso que haga que la aeronave deje de satisfacer los requisitos de la especificación para el procedimiento.** Y da ejemplos que sorprenden: entre las fallas que cuentan está la pérdida del piloto automático o del director de vuelo **si eran requeridos**, y la reversión a una fuente de navegación distinta de las admitidas, aunque no se exija al piloto vigilar la fuente de actualización."
      },
      {
        "kind": "p",
        "text": "O sea: no hace falta perder el GNSS para perder la capacidad."
      },
      {
        "kind": "sub",
        "text": "La obligación de informar"
      },
      {
        "kind": "p",
        "text": "El piloto **debe** notificar al ATC cualquier pérdida de la capacidad, **junto con el curso de acción propuesto**. Las dos partes cuentan: el aviso y la propuesta. Y si no se puede cumplir con los requisitos del procedimiento, hay que avisar al servicio de tránsito aéreo **lo antes posible**."
      },
      {
        "kind": "p",
        "text": "Para RNP 2 y RNP 4 la exigencia se extiende: hay que avisar de cualquier **deterioro o falla** del equipo de navegación, y de las desviaciones que exija un procedimiento de contingencia."
      },
      {
        "kind": "sub",
        "text": "Y el operador tiene que tener procedimientos"
      },
      {
        "kind": "p",
        "text": "La norma no deja la contingencia al criterio del momento. El RAC 91 y el RAC 121 exigen que el explotador establezca y documente **procedimientos normales y anormales, incluidos los procedimientos de contingencia**, y la circular de la FAA pide que el operador desarrolle procedimientos de contingencia para reaccionar con seguridad tras la pérdida de la capacidad durante la aproximación."
      },
      {
        "kind": "p",
        "text": "Lo que la tripulación hace es aplicar esos procedimientos, no inventarlos."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "El paso que decide es el penúltimo: **¿se puede seguir cumpliendo lo que el procedimiento exige?** Y solo se puede contestar si se sabe qué exige, lo que remite al briefing."
      },
      {
        "kind": "p",
        "text": "Si la respuesta es sí, se continúa vigilando. Si es no, se informa y se coordina. Lo que no se hace es continuar sin contestar la pregunta."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Qué especificación y qué valor exige el segmento en curso.",
          "Qué queda operativo y si es admitido por la especificación.",
          "Qué dice el QRH y el SOP.",
          "Si hay que cambiar de línea de mínimos, de procedimiento, de destino o de nivel.",
          "El combustible, si la alternativa cuesta millas."
        ]
      },
      {
        "kind": "titulo",
        "text": "Comunicación ATC"
      },
      {
        "kind": "p",
        "text": "Aviso más propuesta, lo antes posible. La fraseología, en el capítulo siguiente."
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Dos, opuestos:"
      },
      {
        "kind": "list",
        "items": [
          "Declarar una incapacidad que no existe, porque se asumió que perder GNSS es perder todo.",
          "Seguir volando el procedimiento sin haber contestado si todavía se cumple lo que exige."
        ]
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-28.svg",
        "alt": "Diagrama de flujo vertical: la capacidad PBN se degrada; controlar el avión; identificar el mensaje o la falla; contrastar la posición; aplicar QRH y SOP; determinar qué capacidad de navegación queda; y la pregunta decisiva, se puede seguir cumpliendo la especificación exigida. Si la respuesta es sí, continuar y seguir vigilando. Si es no, informar al ATC, solicitar autorización alternativa y usar la capacidad de navegación disponible. A la izquierda, tres notas: el mensaje concreto está en el FCOM y el QRH; qué capacidad queda depende de la especificación; y la pregunta decisiva se contestó en el briefing.",
        "ancho": 1600,
        "alto": 1140
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Pérdida de capacidad es cualquier falla o suceso que impida satisfacer los requisitos de la especificación para el procedimiento.",
          "Cuenta también perder el piloto automático o el director de vuelo si eran requeridos, y revertir a una fuente no admitida.",
          "Se informa al ATC la pérdida **junto con el curso de acción propuesto**, lo antes posible.",
          "La pregunta que decide es si todavía se cumple lo exigido, y se contesta con lo que se preparó en el briefing."
        ]
      }
    ]
  },
  {
    "n": 46,
    "title": "«Unable RNAV», «unable RNP» y las contingencias",
    "kicker": "P46",
    "minutes": 8,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Cómo se dice. Y aquí este módulo va a ser explícito sobre lo que puede verificar y lo que no."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "La formulación que este módulo puede respaldar con fuente"
      },
      {
        "kind": "p",
        "text": "La circular de la FAA para operaciones RNAV en terminal y en ruta da un ejemplo literal de comunicación ante pérdida de capacidad:"
      },
      {
        "kind": "quote",
        "text": "«…N1234, failure of GPS/GNSS system, unable RNAV, request amended clearance.»"
      },
      {
        "kind": "p",
        "text": "Tres piezas, y en ese orden:"
      },
      {
        "kind": "table",
        "head": [
          "Pieza",
          "Qué aporta"
        ],
        "rows": [
          [
            "Identificación y falla",
            "Quién es y qué se rompió"
          ],
          [
            "*Unable RNAV*",
            "Qué no se puede cumplir"
          ],
          [
            "*Request amended clearance*",
            "Qué se pide"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "La misma estructura sirve cambiando la especificación: lo que no se puede cumplir se nombra, y se pide una autorización que sí se pueda cumplir."
      },
      {
        "kind": "sub",
        "text": "Lo que este módulo no va a inventar"
      },
      {
        "kind": "p",
        "text": "**Verificar:** la fraseología normalizada de OACI para estas situaciones está en los Procedimientos para los servicios de navegación aérea de Gestión del tránsito aéreo (Doc 4444). Ese documento no es de acceso público y no se pudo cargar para escribir este módulo, así que **aquí no se publica ninguna formulación OACI literal**. La fraseología aplicable en Colombia hay que leerla en el AIP Colombia y en los documentos de la Aerocivil que la reproduzcan, y es lo que se usa en frecuencia."
      },
      {
        "kind": "p",
        "text": "Lo que sí se puede afirmar con la fuente cargada es la **obligación**: notificar al ATC la pérdida de la capacidad junto con el curso de acción propuesto, y avisar al servicio de tránsito aéreo lo antes posible si no se pueden cumplir los requisitos del procedimiento."
      },
      {
        "kind": "p",
        "text": "Esa distinción entre «lo que hay que comunicar» y «con qué palabras exactas» es la que hay que sostener en una entrevista: el contenido se sabe, y las palabras exactas se leen en el documento del Estado donde se opera."
      },
      {
        "kind": "sub",
        "text": "Cuándo se usa"
      },
      {
        "kind": "p",
        "text": "En cuanto se concluye que no se puede cumplir la especificación exigida, y lo antes posible. No al aterrizar, no en la frecuencia siguiente."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Lo que el controlador hace con el aviso depende de la situación de tránsito: puede dar vectores, cambiar el nivel, autorizar otro procedimiento o autorizar otra aproximación. Cuanto antes llegue el aviso y más clara sea la propuesta, más opciones hay."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Qué especificación no se puede cumplir, con nombre.",
          "Qué se va a proponer.",
          "Qué fraseología aplica en el espacio aéreo en que se está volando."
        ]
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Decir «tengo un problema con el GPS» y esperar que el controlador deduzca las consecuencias. El controlador no sabe qué especificación necesita ese procedimiento con ese avión: eso lo sabe la tripulación."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "La estructura es: identificación y falla, qué no se puede cumplir, qué se pide.",
          "La circular de la FAA da el ejemplo literal con *unable RNAV* y *request amended clearance*.",
          "La fraseología OACI literal no se publica aquí porque su documento no se pudo cargar: se lee en el AIP del Estado.",
          "La obligación sí está verificada: notificar la pérdida con el curso de acción propuesto, lo antes posible."
        ]
      }
    ]
  },
  {
    "n": 47,
    "title": "PBN en Colombia",
    "kicker": "P47",
    "minutes": 7,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "Qué dice la norma colombiana sobre PBN, y qué hay que leer en cada caso."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "Las definiciones son las de OACI, en español"
      },
      {
        "kind": "p",
        "text": "El RAC 91 reproduce las definiciones del concepto: especificación para la navegación como conjunto de requisitos relativos a la aeronave **y a la tripulación de vuelo**, con sus dos clases, RNP (con control y alerta de la performance) y RNAV (sin ese requisito). Y la nota que explica el cambio histórico del término RNP."
      },
      {
        "kind": "p",
        "text": "Para un piloto colombiano, esas definiciones no son «lo que dice OACI»: son su norma."
      },
      {
        "kind": "sub",
        "text": "El artículo del equipo: RAC 91, numeral 91.1015"
      },
      {
        "kind": "p",
        "text": "En operaciones con especificación PBN prescrita, la aeronave debe:"
      },
      {
        "kind": "list",
        "items": [
          "Estar provista del equipo de navegación que le permita funcionar conforme a las especificaciones prescritas.",
          "Contar con la información de sus capacidades de especificación de navegación **enumeradas en el manual de vuelo o en otra documentación aprobada** por el Estado de diseño o por la UAEAC.",
          "Cuando se opere de acuerdo con la MEL, contar con la información de esas capacidades **incluida en la MEL**."
        ]
      },
      {
        "kind": "p",
        "text": "Y la UAEAC establece los criterios para las operaciones en que se prescribe una especificación PBN."
      },
      {
        "kind": "p",
        "text": "Además, como parte de sus especificaciones de navegación PBN, el explotador debe demostrar a la UAEAC que estableció:"
      },
      {
        "kind": "list",
        "items": [
          "Procedimientos normales y anormales, **incluidos los de contingencia**.",
          "Requisitos de calificación y competencia de la tripulación de vuelo, de acuerdo con las especificaciones apropiadas.",
          "Instrucción para el personal pertinente, congruente con las operaciones previstas.",
          "Procedimientos de mantenimiento apropiados."
        ]
      },
      {
        "kind": "p",
        "text": "Y el Estado de matrícula expide una **aprobación específica** para operaciones con especificaciones de navegación con autorización requerida (AR)."
      },
      {
        "kind": "sub",
        "text": "El artículo del explotador: RAC 121, numeral 121.995"
      },
      {
        "kind": "p",
        "text": "Dice lo mismo para el avión, y añade tres cosas que valen oro en una entrevista:"
      },
      {
        "kind": "list",
        "items": [
          "La UAEAC se asegura de que el explotador **estableció y documentó** procedimientos, calificaciones, instrucción y mantenimiento.",
          "**El explotador deberá estar autorizado por la UAEAC** para realizar las operaciones en cuestión.",
          "La UAEAC emite una aprobación específica para las operaciones con especificación PBN **con autorización obligatoria (AR)**."
        ]
      },
      {
        "kind": "p",
        "text": "Y una nota breve que resume media asignatura: **la gestión de datos electrónicos de navegación es parte integral de los procedimientos normales y anormales.**"
      },
      {
        "kind": "sub",
        "text": "Dónde está PBN como aprobación específica"
      },
      {
        "kind": "p",
        "text": "En las especificaciones de operación. El RAC 91 lista PBN entre las operaciones que requieren requisitos especiales de mantenimiento, junto a CAT II y III y RVSM, y el RAC 121 la lista entre los tipos de operación aprobados y entre las que exigen capacitación especial de navegación. En la estructura de las especificaciones de operación, las especificaciones de navegación con autorización requerida (AR) para PBN se anotan **una línea por aprobación**, con sus limitaciones."
      },
      {
        "kind": "titulo",
        "text": "En operación de aerolínea"
      },
      {
        "kind": "p",
        "text": "Lo que el piloto colombiano tiene que saber ubicar:"
      },
      {
        "kind": "table",
        "head": [
          "Pregunta",
          "Dónde se contesta"
        ],
        "rows": [
          [
            "¿Qué exige la norma para operar PBN?",
            "RAC 91 numeral 91.1015 y RAC 121 numeral 121.995"
          ],
          [
            "¿Está mi operador autorizado y para qué?",
            "Especificaciones de operación"
          ],
          [
            "¿Qué procedimientos PBN hay publicados y qué exigen?",
            "AIP Colombia y la carta del aeropuerto"
          ],
          [
            "¿Qué capacidad tengo hoy?",
            "AFM, MEL y NOTAM"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "**Verificar:** la circular GCEP-1.0-22-032 de la Aerocivil, «Procedimiento para la aprobación de operaciones RNAV/RNP bajo el concepto PBN», es el documento de guía del proceso de aprobación. Al 25 de septiembre de 2026 no está disponible en el servidor de documentos de la entidad: las rutas conocidas devuelven error 404. Quien necesite el detalle del proceso de aprobación tiene que pedirla a la Aerocivil o buscarla en la biblioteca técnica cuando vuelva a estar publicada. Este módulo no reproduce su contenido porque no se pudo leer."
      },
      {
        "kind": "p",
        "text": "**Verificar también:** qué procedimientos PBN concretos hay publicados en cada aeropuerto colombiano, cómo se titulan y qué exigen en sus notas se lee en el AIP Colombia vigente. No se debe suponer la convención de títulos de la FAA ni la internacional sin mirar la carta."
      },
      {
        "kind": "titulo",
        "text": "¿Qué debe verificar?"
      },
      {
        "kind": "list",
        "items": [
          "Las especificaciones de operación del explotador: qué está autorizado.",
          "La carta del procedimiento en el AIP Colombia: qué exige.",
          "El AFM y la MEL: qué se tiene hoy."
        ]
      },
      {
        "kind": "titulo",
        "text": "Error frecuente"
      },
      {
        "kind": "p",
        "text": "Citar la circular de la FAA como si fuera la norma aplicable en Colombia. La norma aplicable es el RAC. La circular de la FAA es una fuente de criterio operacional excelente, y así se usa en este módulo, pero no es la norma del Estado donde se vuela."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "El RAC 91 numeral 91.1015 y el RAC 121 numeral 121.995 son los artículos de PBN en Colombia.",
          "El explotador debe estar autorizado por la UAEAC, y las especificaciones AR llevan aprobación específica.",
          "La MEL debe incluir la información de capacidades de especificación de navegación.",
          "La gestión de datos electrónicos de navegación es parte integral de los procedimientos normales y anormales.",
          "Lo publicado en cada aeropuerto se lee en el AIP Colombia, no se supone."
        ]
      }
    ]
  },
  {
    "n": 48,
    "title": "Cómo se lee una carta PBN y un vuelo completo",
    "kicker": "P48",
    "minutes": 9,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Concepto"
      },
      {
        "kind": "p",
        "text": "El capítulo de cierre tiene dos partes. Primero, dónde mirar en una carta PBN. Después, el vuelo entero, fase por fase, con doce escenarios de decisión."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber el piloto"
      },
      {
        "kind": "sub",
        "text": "El orden en que se mira una carta PBN"
      },
      {
        "kind": "list",
        "items": [
          "**Título del procedimiento.** Dice qué clase de procedimiento es, según la convención de la autoridad que publica.",
          "**Notas y recuadro PBN.** Qué especificación exige, qué sensores o funciones, qué valor RNP mínimo, qué observaciones. Es lo obligatorio.",
          "**Requisitos de equipo.** El recuadro aparte, con el equipo en tierra o específico del aeropuerto.",
          "**Pista y transiciones.** Qué se está cargando exactamente.",
          "**Puntos y su simbología.** Fly-by o fly-over, y si hay tramo RF.",
          "**Derrotas y distancias.** Para comparar con el FMS.",
          "**Restricciones de altitud y de velocidad.** Incluidas las de un tramo RF.",
          "**Perfil vertical.** El FAF, la senda, el mínimo.",
          "**Líneas de mínimos.** Cuáles hay y cuál se puede usar.",
          "**Limitaciones.** Temperatura, fuentes de ajuste altimétrico, lo que diga la nota.",
          "**Frustrada.** Requisito de navegación, puntos, derrota inicial, altitudes y espera."
        ],
        "ordered": true
      },
      {
        "kind": "sub",
        "text": "El vuelo completo"
      },
      {
        "kind": "table",
        "head": [
          "Fase",
          "Qué se verifica",
          "Qué puede fallar",
          "Qué se comunica"
        ],
        "rows": [
          [
            "Preparación",
            "Capacidad PBN del avión, especificaciones de operación",
            "Una capacidad que se creía tener",
            "Nada todavía"
          ],
          [
            "MEL",
            "Qué capacidad queda con el equipo despachado",
            "Que la MEL quite una capacidad y el plan la declare",
            "Corrección del plan, antes de salir"
          ],
          [
            "Base de datos",
            "Vigencia, y el cambio de ciclo si aplica",
            "Base fuera de ciclo, carta enmendada no incluida",
            "Nada; se resuelve en tierra"
          ],
          [
            "Plan de vuelo",
            "Casilla 10 con la R y casilla 18 con `PBN/`",
            "Declarar de más o de menos",
            "Con el despacho"
          ],
          [
            "SID",
            "Especificación, ruta, puntos, restricciones, RF",
            "Transición o pista equivocadas",
            "Colación y confirmación"
          ],
          [
            "En ruta",
            "Especificación de la ruta, fuentes en uso",
            "Degradación de GNSS, interferencia",
            "Aviso con propuesta"
          ],
          [
            "STAR",
            "Transición, restricciones, enganche con la aproximación",
            "Vectores que cancelan la STAR",
            "Confirmar si sigue vigente"
          ],
          [
            "RNP APCH",
            "Infraestructura, modo aproximación antes del FAF, línea de mínimos, QNH",
            "Temperatura fuera de límites, pérdida de capacidad",
            "Aviso con propuesta"
          ],
          [
            "Aterrizaje",
            "Nada nuevo",
            "",
            "Reporte posterior si hubo anomalía"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "El orden de lectura de una carta PBN empieza por el título y sigue por las notas y el recuadro PBN, que es lo obligatorio.",
          "PBN acompaña el vuelo entero: preparación, MEL, datos, plan, SID, ruta, STAR y aproximación.",
          "En cada fase hay algo que verificar, algo que puede fallar y algo que se comunica.",
          "Lo que no está en la carta está en el AFM, la MEL, el QRH y el SOP."
        ]
      },
      {
        "kind": "figura",
        "src": "/modulos/pbn/PB-29.svg",
        "alt": "Recreación de una carta de aproximación RNP AR a la pista 09 que ocupa todo el ancho: título arriba a la izquierda; recuadro de equipo requerido y recuadro PBN arriba a la derecha; en planta, IAF, un tramo RF con su velocidad máxima, el FAF con su altitud, la pista y la frustrada hacia un circuito de espera; debajo, el perfil vertical; y abajo, el bloque de notas a la izquierda y la caja de mínimos con tres valores RNP a la derecha. Doce números señalan título, recuadro PBN, equipo requerido, pista, un punto fly-by, el tramo RF, una restricción de altitud, una de velocidad, la derrota, el valor RNP, las notas y la frustrada; debajo de la carta, qué significa cada uno.",
        "ancho": 1600,
        "alto": 1580
      },
      {
        "kind": "list",
        "ordered": true,
        "items": [
          "La clase de procedimiento, según la convención de quien publica. No dice por sí solo qué exige.",
          "La especificación exigida, los sensores o funciones y el valor RNP mínimo. Obligatorio.",
          "Equipo en tierra o específico del aeropuerto. Va aparte del recuadro PBN.",
          "Lo que se carga tiene que ser exactamente esto.",
          "Dice si el punto se sobrevuela o si el giro se anticipa.",
          "Arco de radio constante. Exige capacidad listada y respetar la velocidad máxima publicada.",
          "Se verifica cargada en el FMS, no solo leída.",
          "En un tramo RF es parte del diseño, no una sugerencia.",
          "La referencia contra la que se compara lo que muestra el FMS.",
          "Un valor con dos decimales indica 0.30 o menos y remite a una operación con autorización requerida.",
          "Limitaciones de temperatura, fuentes de ajuste altimétrico y cualquier condición del procedimiento.",
          "Tiene su propio requisito de navegación, que puede no ser el de la aproximación."
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 1 · La SID cargada no es la autorizada",
        "rotulo": "Escenario de práctica",
        "situacion": "el ATC autoriza una SID con una transición determinada. Al verificar, el FMS contiene el mismo procedimiento con otra transición.",
        "pregunta": "¿qué hace la tripulación y en qué momento?",
        "respuesta": "se corrige **antes de ejecutar**. El nombre del procedimiento coincide, así que la trampa está en la transición, que es el elemento que más se escapa porque no se ve en el encabezado. Se recarga el procedimiento completo desde la base de datos con la transición autorizada, se vuelve a verificar la secuencia de puntos y las derrotas contra la carta, y se comprueba que las restricciones quedaron cargadas. Lo que no corresponde es editar la secuencia a mano para «arreglarla»: se carga desde la base. Y si hay cualquier duda sobre qué transición se autorizó, se pregunta.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AIM 1-2-1, verificación de datos tras cargar el procedimiento; FAA AC 90-105A, numeral 8.4.4."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 2 · La base de datos no está en el ciclo esperado",
        "rotulo": "Escenario de práctica",
        "situacion": "en la inicialización se encuentra que la base de datos no corresponde al ciclo que se esperaba.",
        "pregunta": "¿es un «no go»?",
        "respuesta": "no de forma automática, y responder «no go» sin más es el error que la pregunta busca. Hay que consultar la MEL, el SOP, la autorización del operador, el tipo de operación y la regulación aplicable. La norma exige que los datos sean actuales y apropiados para la región y que sigan siéndolo durante el vuelo, y para operadores de transporte monta un programa de base de datos con responsable, proceso documentado y confirmación del piloto en la inicialización. Hay un caso en que la respuesta sí es tajante: si se publicó una carta enmendada cuya enmienda no está en la base, la base **no debe usarse** para conducir esa operación.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AC 90-105A, numerales 10.2, 10.4, 10.6 y 10.7."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 3 · Falla de GNSS durante una SID RNAV",
        "rotulo": "Escenario de práctica",
        "situacion": "en ascenso, volando una SID RNAV, se pierde el GNSS.",
        "pregunta": "¿qué secuencia se sigue?",
        "respuesta": "controlar el avión, identificar la falla, contrastar la posición con lo que quede disponible, determinar qué capacidad de navegación permanece y si la especificación exigida todavía se puede cumplir, aplicar QRH y SOP, e informar al ATC con el curso de acción propuesto. La pregunta que decide es si queda una fuente **admitida por esa especificación**: en RNAV 5 puede quedar capacidad con DME/DME, VOR/DME o inercial; en una especificación que solo admite GNSS, no. Si no se puede cumplir, la comunicación sigue la estructura de identificación y falla, lo que no se puede cumplir, y lo que se solicita.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AC 90-100A, numeral 10, apartado d; FAA AC 90-105A, Apéndice A, numeral A.7.1.8."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 4 · La performance estimada ya no satisface la requerida",
        "rotulo": "Escenario de práctica",
        "situacion": "en una llegada con especificación RNP, el sistema indica que ya no puede satisfacer la performance requerida.",
        "pregunta": "¿qué significa y qué se hace?",
        "respuesta": "significa que el control y alerta a bordo concluyó que el requisito operacional no se está cumpliendo, y eso es precisamente para lo que existe la función. Se vuela el avión, se reconoce el aviso, se contrasta la posición, se aplican QRH y SOP de la flota, se determina qué capacidad queda y se concluye si la especificación del segmento todavía se cumple. Si no, se informa al ATC con la propuesta. Dos cosas que no se hacen: modificar el valor RNP en el sistema para que «quepa», porque el valor lo fija el procedimiento, y esperar a ver si el aviso se va.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AC 90-105A, numeral 4.2 y Apéndice A, numeral A.7.1.8; FAA AC 90-105A, Apéndice J, definición de EPU."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 5 · Restricción de MEL antes del vuelo",
        "rotulo": "Escenario de práctica",
        "situacion": "hay un ítem de MEL abierto en una fuente de navegación. El avión es despachable.",
        "pregunta": "¿qué hay que determinar antes de salir?",
        "respuesta": "qué capacidad de especificación de navegación queda, que es información que la norma exige que esté **en la MEL**. Y con eso, si el vuelo previsto la necesita: la salida, la ruta, la llegada, la aproximación al destino y la de los alternos. Hay que revisar la entrada completa, incluidas las observaciones y el procedimiento operacional asociado, que es donde suele estar la restricción real. Si la capacidad se perdió y el plan de vuelo la declara, el plan hay que corregirlo antes de salir. Y si hay un segundo ítem abierto, el efecto conjunto no se calcula sumando: lo resuelve la lista.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "RAC 91, numeral 91.1015, apartado (a)(3); RAC 121, numeral 121.995, apartado (b)(1)(iii)."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 6 · Temperatura por debajo del límite publicado",
        "rotulo": "Escenario de práctica",
        "situacion": "aproximación con línea de mínimos LNAV/VNAV. La temperatura está por debajo del límite publicado en la nota del procedimiento y el avión no tiene compensación automática aprobada.",
        "pregunta": "¿se puede volar la aproximación?",
        "respuesta": "sí, pero no a esa línea. Los sistemas Baro-VNAV sin compensación no pueden operar a la DA de LNAV/VNAV con la temperatura fuera de las limitaciones publicadas, y la respuesta correcta es volar a la **MDA de LNAV**, que está publicada en la misma carta. La limitación no aplicaría si la aproximación se volara a mínimos LNAV/VNAV con guía vertical satelital y el avión tuviera esa aprobación de aeronavegabilidad. Lo que no corresponde es volar a la DA suponiendo que el margen de la nota es conservador: la nota es parte del procedimiento.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AC 90-105A, Apéndice B, numeral B.4.2; FAA AIM 5-4-5."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 7 · Aviso de performance antes del FAF",
        "rotulo": "Escenario de práctica",
        "situacion": "preparado para una RNP APCH. Antes del FAF aparece un aviso relacionado con la performance de navegación.",
        "pregunta": "¿se puede continuar?",
        "respuesta": "depende de si se puede seguir satisfaciendo los requisitos RNP APCH del procedimiento, y la definición de pérdida de capacidad es amplia: cualquier falla o suceso que impida satisfacerlos. Hay que contrastar, aplicar el procedimiento de contingencia que el operador desarrolló para este caso, y decidir entre continuar a otra línea de mínimos si eso es válido con lo que queda, frustrar, o pedir otra aproximación. Antes del FAF hay más opciones que después, y ese es justamente el motivo de que la norma pida confirmar la transición a modo aproximación **2 NM antes del FAF**. También hay que mirar el combustible: otra aproximación o un alterno cuestan.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AC 90-105A, Apéndice A, numerales A.7.1.8 y A.7.2.1."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 8 · Degradación durante una RNP AR",
        "rotulo": "Escenario de práctica",
        "situacion": "ejecutando una aproximación RNP AR, con terreno alrededor, aparece una degradación de la navegación.",
        "pregunta": "¿por qué es más crítico que en una aproximación PBN menos exigente?",
        "respuesta": "porque el área lateral de evaluación de obstáculos de un procedimiento RNP AR es **dos veces el valor RNP, sin zona secundaria ni márgenes adicionales**. No hay colchón: el margen lo estaba dando la performance del avión y la precisión del seguimiento de la trayectoria. A eso se suman los tramos RF, que no admiten desviación arbitraria, y una frustrada que puede exigir un valor menor de 1.00 NM con equipo redundante. La actuación concreta está en el procedimiento autorizado del operador y en el entrenamiento específico de RNP AR: aquí no hay una respuesta universal, y suponer una es el error.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AIM 5-4-18; FAA AC 90-101A, Apéndice, numeral 2."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 9 · Discrepancia entre la carta y el FMS",
        "rotulo": "Escenario de práctica",
        "situacion": "la carta publica un punto que no coincide con la secuencia que muestra el FMS.",
        "pregunta": "¿qué hace la tripulación?",
        "respuesta": "no improvisar. Se confirma qué se autorizó, se revisa la selección (procedimiento, pista y transición son las causas más probables), se verifica la vigencia de la base de datos y se consulta el SOP. Una trayectoria dudosa no se vuela solo porque esté cargada. Si se concluye que es un error de codificación, la norma tiene un camino: se reporta al proveedor de la base de datos y el uso del procedimiento afectado se prohíbe mediante un aviso del operador a sus tripulaciones, hasta que el operador lo resuelva. Y si existe una carta enmendada cuya enmienda no está en la base, la base no se usa para esa operación.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AC 90-105A, numerales 10.4 y 10.7, apartado 5; Apéndice A, numeral A.4.2."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 10 · Interferencia de GNSS en crucero",
        "rotulo": "Escenario de práctica",
        "situacion": "en crucero aparecen varias discrepancias: la hora del avión es incorrecta, el viento y la velocidad respecto al suelo no cuadran, y otro avión en la frecuencia reporta errores de posición.",
        "pregunta": "¿qué está pasando y qué se hace?",
        "respuesta": "esos tres son indicios reconocidos de interferencia o suplantación de GNSS, junto con el corrimiento del mapa, la posición incorrecta del FMS, los avisos de error de posición, el disparo poco fiable del TAWS y las salidas de ADS-B erróneas. Se verifica la posición con radioayudas convencionales cuando estén disponibles, se evalúa qué sistemas de a bordo dependen de entradas de GPS, se comprueba que las radioayudas críticas de la ruta y de la aproximación previstas están disponibles, se está preparado para revertir a procedimientos convencionales y se notifica al ATC con prontitud, salvo que se esté en una zona de pruebas publicada por NOTAM y no se requiera asistencia. Después del vuelo: documentar en el libro de mantenimiento y presentar el reporte.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AIM 1-2-4, indicios y recomendaciones; FAA AIM 1-1-19."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 11 · Vectores en mitad de una STAR",
        "rotulo": "Escenario de práctica",
        "situacion": "volando una STAR con restricciones de altitud y velocidad publicadas, el ATC da vectores para espaciamiento.",
        "pregunta": "¿siguen vigentes las restricciones?",
        "respuesta": "no. Si se vectorea al avión o se lo autoriza a desviarse de la STAR, la STAR se considera **cancelada**, y con ella sus restricciones de altitud, de velocidad y la nota de transición de Mach a velocidad indicada; el ATC dará una altitud que mantener y, si hace falta, una velocidad. Si el controlador pretende reincorporar el avión, avisará dónde esperar reanudar el procedimiento. Lo que la tripulación no debe hacer es seguir «cumpliendo» un perfil que ya no está autorizado, ni suponer que el FMS, que conserva la secuencia, refleja la autorización vigente. Si hay duda, se pregunta.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AIM 5-4-1, apartado de rutas con STAR; FAA AIM 5-2-9."
          }
        ]
      },
      {
        "kind": "piensaComoPiloto",
        "momento": "Escenario 12 · Directo a un punto con la aproximación cargada",
        "rotulo": "Escenario de práctica",
        "situacion": "con la aproximación cargada y verificada, el ATC autoriza directo a un punto intermedio.",
        "pregunta": "¿qué hay que comprobar antes de ejecutar?",
        "respuesta": "primero, a qué punto exactamente se está autorizado: se colaciona y se compara con la carta, porque los nombres de cinco letras se confunden en frecuencia. Después, qué cambia el directo: la geometría, el secuenciamiento, las restricciones asociadas a los puntos que se saltan, el perfil vertical, la predicción de combustible y el enganche con la aproximación. Se verifica que la aproximación sigue enganchada y que la frustrada sigue completa. Solo entonces se ejecuta, y después se vigila. Si el directo rompe un tramo RF o hace incompatible una restricción, se le dice al ATC antes de ejecutar, no después.",
        "claves": [
          {
            "titulo": "Referencia",
            "texto": "FAA AC 90-105A, numeral 8.4.3, apartados 20 y 22; FAA AIM 5-4-6."
          }
        ]
      },
      {
        "kind": "titulo",
        "text": "Errores frecuentes en entrevistas"
      },
      {
        "kind": "p",
        "text": "Dieciséis afirmaciones que se oyen y por qué fallan."
      },
      {
        "kind": "list",
        "items": [
          "**«PBN es GPS.»** PBN es un concepto de navegación basada en performance; el GNSS es una tecnología, con frecuencia la fuente principal y no siempre la única admitida. Hay especificaciones que aceptan DME/DME, DME/DME/IRU o VOR/DME.",
          "**«RNAV y RNP son lo mismo.»** La única diferencia de familia es que la especificación RNP incluye el requisito de control y alerta de la performance a bordo, y la RNAV no.",
          "**«RNP 1 significa que puedo desviarme una milla.»** El número es la precisión de navegación lateral que se espera conseguir al menos el 95 % del tiempo de vuelo por la población de aeronaves. No es una tolerancia de pilotaje: la expectativa operacional es mantener el eje.",
          "**«RNAV 1 es más preciso que RNP 1 porque ambos tienen 1.»** La frase se contradice sola. El número describe la misma precisión lateral; lo que separa a las dos es el control y la alerta a bordo.",
          "**«RNP solo se utiliza en aproximaciones.»** Hay RNP 2 en ruta doméstica y oceánica, RNP 4 en oceánico y remoto, y RNP 1 en llegada, salida e inicial e intermedia de aproximación.",
          "**«RNP AR y RNP APCH son lo mismo.»** RNP AR exige autorización específica sin excepciones y su área lateral de evaluación de obstáculos es dos veces el valor RNP, sin zona secundaria.",
          "**«Si tengo GPS puedo volar cualquier RNP.»** Cada especificación exige elegibilidad propia de la aeronave, autorización del operador y competencia de la tripulación. La elegibilidad no se hereda, salvo el caso de RNP 4 que confiere RNP 10.",
          "**«Si el procedimiento aparece en el FMS significa que estoy autorizado.»** Que esté codificado no dice nada de la autorización. En el marco de la FAA ocurre lo contrario: si no aparece, lo probable es que el avión no sea elegible para sus elementos PBN.",
          "**«La base de datos del FMS siempre es correcta.»** La norma prevé el caso contrario y monta un proceso: reporte al proveedor, prohibición de uso del procedimiento afectado y restablecimiento por el operador.",
          "**«El FMS reemplaza la carta.»** El FMS ejecuta; la carta es la referencia de verificación. Después de cargar hay que verificar los datos de puntos y derrotas.",
          "**«PBN elimina la necesidad de monitorear la posición.»** El control y alerta a bordo vigila el error del sistema de navegación. El error técnico de vuelo lo vigila la tripulación con la presentación de desviación lateral.",
          "**«ANP y RNP son lo mismo.»** Uno es el requisito y el otro la estimación de la performance de posición actual. Y esa estimación no es el error real: es una indicación estadística definida.",
          "**«RF significa simplemente un giro cerrado.»** Es una trayectoria circular de radio constante alrededor de un centro definido, entre dos puntos, y es la trayectoria publicada y protegida.",
          "**«Si pierdo GNSS pierdo automáticamente toda capacidad RNAV.»** Depende de la especificación: algunas admiten otras fuentes. En RNP APCH, donde el GPS es primario y DME/DME no es aceptable, la conclusión es la contraria.",
          "**«Si el avión es despachable por MEL mantiene automáticamente todas sus capacidades PBN.»** Es justo lo que la norma previene al exigir que la MEL incluya la información de capacidades de especificación de navegación.",
          "**«RNAV approach y RNP approach son siempre exactamente lo mismo.»** El título de la carta sigue la convención de cada autoridad: en el marco de la FAA los RNP APCH se titulan RNAV (GPS). Lo que exige el procedimiento está en las notas."
        ]
      },
      {
        "kind": "titulo",
        "text": "Lo que hay que memorizar"
      },
      {
        "kind": "p",
        "text": "Treinta puntos. Lo demás se consulta."
      },
      {
        "kind": "list",
        "items": [
          "PBN es navegación de área basada en requisitos de performance, aplicada a rutas ATS, espacio aéreo designado, SID, STAR y aproximaciones.",
          "Toda operación PBN es navegación de área; no toda navegación de área es PBN.",
          "Los tres elementos: aplicación de navegación, especificación para la navegación e infraestructura de radioayudas.",
          "Una especificación para la navegación es un conjunto de requisitos relativos a la aeronave **y a la tripulación de vuelo**.",
          "Especificación RNAV: sin requisito de control y alerta de la performance. Prefijo RNAV.",
          "Especificación RNP: con control y alerta de la performance a bordo. Prefijo RNP.",
          "El número es la precisión de navegación lateral en millas náuticas, conseguida al menos el 95 % del tiempo de vuelo.",
          "RNAV 1: error total del sistema no mayor de 1 NM el 95 % del tiempo. RNAV 2: 2 NM.",
          "Especificaciones RNAV: 10, 5, 2 y 1. RNP: 4, 2, 1, A-RNP, RNP APCH y RNP AR APCH.",
          "RNP APCH: valor 1 en terminal y frustrada, 0.3 en la aproximación final.",
          "RNP 1: llegada, salida e inicial e intermedia de aproximación en procedimientos con segmentos PBN.",
          "RNP 2: ruta doméstica y oceánica. RNP 4: solo oceánica y remota.",
          "RNP 4 confiere automáticamente RNP 10; RNP 10 se considera RNAV 10. Es la excepción a la falta de herencia.",
          "A-RNP exige tramos RF, RNP escalable y trayectoria paralela desplazada, y **no** confiere RNP AR.",
          "RNP AR exige autorización específica sin excepciones, valor mínimo de RNP 0.30 y área lateral de dos veces el valor RNP sin zona secundaria.",
          "En RNP AR la elegibilidad de tramo RF es obligatoria; en RNP APCH y RNP 1 es opcional.",
          "Tramo RF: trayectoria circular de radio constante entre dos puntos; hay que mantener la trayectoria y las velocidades máximas publicadas.",
          "Fly-by: el giro empieza antes del punto. Fly-over: hay que sobrevolar el punto antes de girar.",
          "RNP es la performance requerida; EPU, ANP o EPE es la estimación de la performance de posición actual, y no es el error real.",
          "No es obligatorio presentar el valor estimado: lo obligatorio es la alerta si la RNP no puede cumplirse.",
          "TSE es la suma vectorial de PDE, NSE y FTE. El sistema vigila el NSE; la tripulación, el FTE.",
          "La base de datos debe ser actual y apropiada, y seguir siéndolo durante el vuelo.",
          "Si hay una carta enmendada cuya enmienda no está en la base, la base no se usa para esa operación.",
          "Autorización del ATC, carta y FMS tienen que decir lo mismo, y se contrasta antes de ejecutar.",
          "En RNP APCH el GPS es primario, DME/DME no es aceptable, y la frustrada puede basarse en radioayuda convencional.",
          "Baro-VNAV hasta una DA exige ajuste altimétrico local y actual, puesto no más tarde del FAF.",
          "Con temperatura fuera del límite publicado y sin compensación aprobada, no se usa la DA de LNAV/VNAV; sí la MDA de LNAV.",
          "La capacidad PBN se declara con la letra R en la casilla 10 y con `PBN/` en la casilla 18, hasta 8 descriptores y 16 caracteres.",
          "La MEL debe incluir la información de capacidades de especificación de navegación: despachable no es «con todas las capacidades».",
          "Ante pérdida de capacidad: volar, identificar, contrastar, QRH y SOP, determinar qué queda, concluir si se cumple lo exigido, informar al ATC con la propuesta."
        ],
        "ordered": true
      },
      {
        "kind": "titulo",
        "text": "Lo que hay que comprender, no memorizar"
      },
      {
        "kind": "list",
        "items": [
          "Por qué el control y alerta permite depender menos de la intervención del ATC y de la separación procedimental.",
          "Por qué el valor pertenece al segmento y no al procedimiento.",
          "Por qué un avión elegible puede no ser capaz hoy.",
          "Por qué el área sin zona secundaria de RNP AR explica todas sus exigencias.",
          "Por qué la temperatura afecta a una trayectoria vertical barométrica."
        ]
      },
      {
        "kind": "titulo",
        "text": "Lo que hay que consultar, nunca recitar"
      },
      {
        "kind": "list",
        "items": [
          "El valor RNP de una línea de mínimos y el límite de temperatura: en la carta.",
          "La elegibilidad de la aeronave y sus funciones: en el AFM o la documentación de aviónica.",
          "Lo que el operador está autorizado a volar: en las especificaciones de operación.",
          "Qué capacidad queda hoy: en la MEL.",
          "El mensaje que muestra el avión y la acción asociada: en el FCOM y el QRH.",
          "La fraseología aplicable: en el AIP del Estado donde se opera."
        ]
      },
      {
        "kind": "titulo",
        "text": "Preguntas típicas de entrevista"
      },
      {
        "kind": "p",
        "text": "Veintiocho, con respuesta corta, explicación y una nota de cómo decirla."
      },
      {
        "kind": "p",
        "text": "**1. What does PBN mean?** **Respuesta corta:** Performance-Based Navigation: navegación de área basada en requisitos de performance aplicados en rutas ATS, procedimientos de aproximación por instrumentos y espacio aéreo designado. **Explicación:** el cambio de fondo es que el requisito pasa de ser un equipo a ser una performance. **Nota:** menciona las cuatro aplicaciones. Quien solo dice «navegación por satélite» se queda corto."
      },
      {
        "kind": "p",
        "text": "**2. What is the difference between RNAV and RNP?** **Respuesta corta:** RNP es navegación de área más control de la performance a bordo más alerta a la tripulación. RNAV no incluye ese requisito. **Explicación:** es la única diferencia de familia en la definición de la norma. **Nota:** dilo como una ecuación. Es la pregunta más frecuente del tema."
      },
      {
        "kind": "p",
        "text": "**3. What does the number in RNP 1 mean?** **Respuesta corta:** la precisión de navegación lateral en millas náuticas que se espera conseguir al menos el 95 % del tiempo de vuelo. **Explicación:** se refiere a la población de aeronaves que opera en ese espacio, ruta o procedimiento. **Nota:** no olvides el 95 %. Sin él la respuesta está incompleta."
      },
      {
        "kind": "p",
        "text": "**4. Is RNP 1 the same as RNAV 1?** **Respuesta corta:** no. Misma precisión lateral, familia distinta, y la elegibilidad no se hereda. **Explicación:** ser elegible para RNP 1 no da RNP 2 ni RNAV 1. **Nota:** añade que las especificaciones se consideran distintas, no mejores o peores."
      },
      {
        "kind": "p",
        "text": "**5. What is onboard performance monitoring and alerting?** **Respuesta corta:** la capacidad del sistema de vigilar la performance conseguida e identificar para el piloto si el requisito operacional se está cumpliendo. **Explicación:** permite depender menos de la intervención del ATC y de la separación procedimental. **Nota:** aclara que vigila el error del sistema de navegación, no el error técnico de vuelo."
      },
      {
        "kind": "p",
        "text": "**6. What is RNP APCH?** **Respuesta corta:** la especificación RNP de aproximación: valor 1 en terminal y frustrada, 0.3 en la final. **Explicación:** en el marco de la FAA se titula RNAV (GPS) y puede publicar varias líneas de mínimos. **Nota:** menciona que el título depende de la convención de la autoridad."
      },
      {
        "kind": "p",
        "text": "**7. What is RNP AR?** **Respuesta corta:** RNP Authorization Required: exige autorización específica, sin excepciones, y su área lateral de obstáculos es dos veces el valor RNP sin zona secundaria. **Explicación:** valor mínimo de RNP 0.30, tramos RF obligatorios y posibles frustradas por debajo de 1.00 NM. **Nota:** compárala con la autorización de CAT II o III para dar la medida."
      },
      {
        "kind": "p",
        "text": "**8. What is the difference between RNP APCH and RNP AR APCH?** **Respuesta corta:** la autorización específica y la ausencia de zona secundaria en el área de obstáculos. **Explicación:** en RNP AR los tramos RF y el escalado son obligatorios, y la frustrada puede exigir menos de 1.00 NM con equipo redundante. **Nota:** el valor más bajo es una consecuencia del diseño, no la definición."
      },
      {
        "kind": "p",
        "text": "**9. What is an RF leg?** **Respuesta corta:** una trayectoria circular de radio constante alrededor de un centro definido, que empieza y termina en un punto. **Explicación:** el arco es la trayectoria publicada, y hay que respetar las velocidades máximas. **Nota:** añade que la capacidad es opcional en RNP APCH y RNP 1, y obligatoria en RNP AR."
      },
      {
        "kind": "p",
        "text": "**10. What is the difference between a fly-by and a fly-over waypoint?** **Respuesta corta:** en el fly-by el giro empieza antes del punto; en el fly-over hay que sobrevolar el punto antes de girar. **Explicación:** la anticipación depende de la velocidad y la altitud. **Nota:** menciona que si el sistema no da esa guía, la ejecuta el piloto."
      },
      {
        "kind": "p",
        "text": "**11. What is ANP?** **Respuesta corta:** la estimación de la performance de navegación actual, en millas náuticas. En otros aviones se llama EPU o EPE. **Explicación:** no es el error real, es una indicación estadística definida del error potencial. **Nota:** aclara que el nombre depende del fabricante."
      },
      {
        "kind": "p",
        "text": "**12. What happens if ANP exceeds RNP?** **Respuesta corta:** el sistema concluye que no puede satisfacer la performance requerida y alerta. **Explicación:** se vuela el avión, se contrasta la posición, se aplica QRH y SOP, se determina qué queda y se concluye si se cumple lo exigido. **Nota:** no digas el mensaje de un fabricante concreto si no te preguntan por esa flota."
      },
      {
        "kind": "p",
        "text": "**13. What is an AIRAC cycle?** **Respuesta corta:** el sistema de fechas comunes de entrada en vigor de la información aeronáutica. **Explicación:** el piloto verifica qué base está activa y su periodo de validez. **Nota:** menciona el caso del ciclo que cambia en vuelo."
      },
      {
        "kind": "p",
        "text": "**14. Why must the navigation database be checked?** **Respuesta corta:** porque la trayectoria que vuela el avión sale de datos codificados, y deben ser actuales y apropiados. **Explicación:** si hay una carta enmendada cuya enmienda no está en la base, la base no se usa. **Nota:** añade que el operador necesita un programa documentado y el piloto confirma la vigencia en la inicialización."
      },
      {
        "kind": "p",
        "text": "**15. Can you fly an RNP procedure simply because it appears in the FMS?** **Respuesta corta:** no. Que esté codificado no dice nada de la elegibilidad del avión ni de la autorización del operador. **Explicación:** hacen falta aeronave elegible, operador autorizado y tripulación competente. **Nota:** si conoces el marco de la FAA, menciona que si **no** aparece, lo probable es que el avión no sea elegible."
      },
      {
        "kind": "p",
        "text": "**16. What would you do if GNSS capability is lost during a PBN procedure?** **Respuesta corta:** volar el avión, identificar la falla, contrastar la posición, determinar qué capacidad queda, concluir si se cumple la especificación e informar al ATC con la propuesta. **Explicación:** las fuentes admitidas dependen de la especificación. **Nota:** empieza por «depende de la especificación». Es la señal de que entendiste el tema."
      },
      {
        "kind": "p",
        "text": "**17. Can an MEL affect PBN capability?** **Respuesta corta:** sí. Un avión puede quedar despachable y haber perdido una capacidad PBN. **Explicación:** por eso la norma exige que la MEL incluya la información de capacidades de especificación de navegación. **Nota:** añade que dos ítems aceptables por separado pueden no serlo juntos."
      },
      {
        "kind": "p",
        "text": "**18. What is Baro-VNAV?** **Respuesta corta:** guía vertical generada a partir de información barométrica de altitud, que normalmente sostiene la línea LNAV/VNAV. **Explicación:** depende de la presión, así que el ajuste altimétrico y la temperatura la afectan. **Nota:** menciona que hasta una DA exige ajuste local y actual."
      },
      {
        "kind": "p",
        "text": "**19. Why can temperature affect Baro-VNAV?** **Respuesta corta:** porque la temperatura no estándar tiene un efecto pronunciado sobre una trayectoria construida con información barométrica. **Explicación:** por eso la línea LNAV/VNAV lleva limitación de temperatura publicada como nota del procedimiento. **Nota:** no cites un número: el valor está en la carta de ese procedimiento."
      },
      {
        "kind": "p",
        "text": "**20. What should you verify before flying an RNAV SID?** **Respuesta corta:** la especificación exigida, la ruta, los puntos, las restricciones, los tramos RF, las notas de equipo y la autorización, y la posición del avión antes de rodar. **Explicación:** con GNSS, la señal debe estar adquirida antes de iniciar la carrera. **Nota:** menciona la transición: es el elemento que más se escapa."
      },
      {
        "kind": "p",
        "text": "**21. What would you do if the chart and FMS disagree?** **Respuesta corta:** no improvisar: confirmar qué se autorizó, revisar la selección, verificar la vigencia de la base y consultar el SOP. **Explicación:** si es un error de codificación, se reporta al proveedor y se prohíbe el uso del procedimiento hasta que el operador lo resuelva. **Nota:** la frase que cierra la respuesta es «una trayectoria dudosa no se vuela solo porque esté cargada»."
      },
      {
        "kind": "p",
        "text": "**22. What is the difference between PBN and GPS?** **Respuesta corta:** PBN es un concepto de navegación basada en performance; el GPS es una tecnología y una fuente de posición. **Explicación:** hay especificaciones que admiten DME/DME, DME/DME/IRU o VOR/DME. **Nota:** una frase de cierre útil: «el GPS es fuente, no permiso»."
      },
      {
        "kind": "p",
        "text": "**23. Can an aircraft remain dispatchable but lose RNP capability?** **Respuesta corta:** sí, y la norma lo asume al exigir que la MEL lleve la información de capacidades de navegación. **Explicación:** en ciertas aeronaves, un piloto automático inoperativo quita la capacidad RNP APCH si el error total del sistema no puede demostrarse sin él. **Nota:** ese ejemplo del piloto automático es el que mejor demuestra que entendiste."
      },
      {
        "kind": "p",
        "text": "**24. What is the difference between an outage and interference?** **Respuesta corta:** la interrupción es que el servicio no esté; la interferencia es que haya señales que lo impidan o degraden. **Explicación:** una interrupción publicada se planifica con radioayudas convencionales; una interferencia se detecta y se contrasta. **Nota:** menciona la contingencia de combustible: revertir a convencional cuesta millas."
      },
      {
        "kind": "p",
        "text": "**25. How would you detect GNSS spoofing?** **Respuesta corta:** por inconsistencias: reloj del avión, posición del FMS, corrimiento del mapa, avisos de error de posición, TAWS disparando sin sentido, ADS-B, viento y velocidad respecto al suelo, y lo que reporten otros aviones. **Explicación:** el RAIM es solo parcialmente efectivo frente a ello, así que el piloto puede no advertirlo. **Nota:** añade el contraste rutinario contra VOR o DME. Es lo que la autoridad recomienda."
      },
      {
        "kind": "p",
        "text": "**26. What is RAIM?** **Respuesta corta:** un algoritmo que verifica la integridad de la salida de posición usando mediciones GPS, o GPS más ayuda barométrica. **Explicación:** FDE es un RAIM que además excluye automáticamente un satélite defectuoso cuando hay mediciones redundantes suficientes. **Nota:** no digas que la predicción RAIM es obligatoria siempre: se obtiene cuando corresponda."
      },
      {
        "kind": "p",
        "text": "**27. How is PBN capability filed in the ICAO flight plan?** **Respuesta corta:** la letra R en la casilla 10, y el indicador `PBN/` con sus descriptores en la casilla 18, hasta 8 entradas y 16 caracteres. **Explicación:** los descriptores declaran especificación y sensor, y `S2` añade Baro-VNAV. **Nota:** el ATC autoriza según lo declarado y espera que se use."
      },
      {
        "kind": "p",
        "text": "**28. What does TSE consist of?** **Respuesta corta:** la suma vectorial del error de definición de la trayectoria, el error del sistema de navegación y el error técnico de vuelo. **Explicación:** el PDE se considera despreciable por la integridad de la base de datos y los procedimientos; el NSE lo vigila el sistema y el FTE, la tripulación. **Nota:** el reparto de vigilancia es la parte que distingue una buena respuesta."
      }
    ]
  }
]

/** Cuántos capítulos hay. Lo lee el catálogo de contenido, que valida la base. */
export const PB_LECCION_TOTAL = 48

/** Las claves de práctica: los identificadores de las preguntas de capítulo. */
export const PB_PRACTICA_CLAVES = [
  "p01-q1",
  "p01-q2",
  "p01-q3",
  "p02-q1",
  "p02-q2",
  "p02-q3",
  "p03-q1",
  "p03-q2",
  "p03-q3",
  "p04-q1",
  "p04-q2",
  "p04-q3",
  "p05-q1",
  "p05-q2",
  "p05-q3",
  "p06-q1",
  "p06-q2",
  "p06-q3",
  "p07-q1",
  "p07-q2",
  "p07-q3",
  "p08-q1",
  "p08-q2",
  "p08-q3",
  "p09-q1",
  "p09-q2",
  "p09-q3",
  "p10-q1",
  "p10-q2",
  "p10-q3",
  "p11-q1",
  "p11-q2",
  "p11-q3",
  "p12-q1",
  "p12-q2",
  "p12-q3",
  "p13-q1",
  "p13-q2",
  "p13-q3",
  "p14-q1",
  "p14-q2",
  "p14-q3",
  "p15-q1",
  "p15-q2",
  "p15-q3",
  "p16-q1",
  "p16-q2",
  "p16-q3",
  "p17-q1",
  "p17-q2",
  "p17-q3",
  "p18-q1",
  "p18-q2",
  "p18-q3",
  "p19-q1",
  "p19-q2",
  "p19-q3",
  "p20-q1",
  "p20-q2",
  "p20-q3",
  "p21-q1",
  "p21-q2",
  "p21-q3",
  "p22-q1",
  "p22-q2",
  "p22-q3",
  "p23-q1",
  "p23-q2",
  "p23-q3",
  "p24-q1",
  "p24-q2",
  "p24-q3",
  "p25-q1",
  "p25-q2",
  "p25-q3",
  "p26-q1",
  "p26-q2",
  "p26-q3",
  "p27-q1",
  "p27-q2",
  "p27-q3",
  "p28-q1",
  "p28-q2",
  "p28-q3",
  "p29-q1",
  "p29-q2",
  "p29-q3",
  "p30-q1",
  "p30-q2",
  "p30-q3",
  "p31-q1",
  "p31-q2",
  "p31-q3",
  "p32-q1",
  "p32-q2",
  "p32-q3",
  "p33-q1",
  "p33-q2",
  "p33-q3",
  "p34-q1",
  "p34-q2",
  "p34-q3",
  "p35-q1",
  "p35-q2",
  "p35-q3",
  "p36-q1",
  "p36-q2",
  "p36-q3",
  "p37-q1",
  "p37-q2",
  "p37-q3",
  "p38-q1",
  "p38-q2",
  "p38-q3",
  "p39-q1",
  "p39-q2",
  "p39-q3",
  "p40-q1",
  "p40-q2",
  "p40-q3",
  "p41-q1",
  "p41-q2",
  "p41-q3",
  "p42-q1",
  "p42-q2",
  "p42-q3",
  "p43-q1",
  "p43-q2",
  "p43-q3",
  "p44-q1",
  "p44-q2",
  "p44-q3",
  "p45-q1",
  "p45-q2",
  "p45-q3",
  "p46-q1",
  "p46-q2",
  "p46-q3",
  "p47-q1",
  "p47-q2",
  "p47-q3",
  "p48-q1",
  "p48-q2",
  "p48-q3"
]

/** Los huecos de figura que quedan por llenar, para el inventario de imágenes. */
export const PB_FIGURAS_PENDIENTES: string[] = []
