// GENERADO por scripts/pbn/convertir.mjs desde docs/contenido/pbn.md.
// No se edita a mano: se edita el documento y se vuelve a correr el script.

/**
 * La práctica de PBN: las tres preguntas del quiz de cada capítulo, con
 * corrección inmediata.
 *
 * No son las del quiz final, que viven en el servidor
 * (contenido/bancos/pbn_evaluacion.json); el conversor comprueba que ningún
 * enunciado de aquí repita uno de allá.
 */

import type { GrupoPractica } from "@/lib/practicaQuiz"

export const PB_PRACTICA: GrupoPractica[] = [
  {
    "tema": "P01",
    "n": 1,
    "titulo": "Qué es PBN",
    "preguntas": [
      {
        "id": "p01-q1",
        "enunciado": "En una entrevista te piden definir PBN. ¿Cuál respuesta es correcta y completa?",
        "opciones": [
          "Navegación de área basada en requisitos de performance, aplicada a rutas ATS, aproximaciones por instrumentos y espacio aéreo designado.",
          "El uso del GNSS como fuente primaria de posición en ruta, terminal y aproximación, en lugar de las radioayudas terrestres.",
          "El conjunto de procedimientos RNAV que reemplazaron a los procedimientos basados en radioayudas terrestres en todas las fases.",
          "La capacidad del FMS de calcular y volar una trayectoria entre dos puntos cualesquiera, sin depender de dónde estén las antenas."
        ],
        "correcta": 0,
        "explicacion": "Es la definición de la norma: navegación de área basada en los requisitos de performance aplicables a la aeronave que vuela en una ruta ATS, en un procedimiento de aproximación por instrumentos o en un espacio aéreo designado. El GPS es una fuente posible, no la definición, y PBN no reemplazó la navegación convencional.",
        "referencia": "RAC 91, definición de navegación basada en la performance (PBN)"
      },
      {
        "id": "p01-q2",
        "enunciado": "¿Cuál es el cambio de fondo que introduce PBN frente a la navegación convencional?",
        "opciones": [
          "Que la trayectoria se vuela con el piloto automático acoplado en lugar de a mano durante todo el procedimiento.",
          "Que las radioayudas terrestres dejan de usarse como fuente de posición.",
          "Que se exige una performance de navegación y no un equipo determinado a bordo.",
          "Que el ATC deja de asignar rutas y la tripulación elige la trayectoria."
        ],
        "correcta": 2,
        "explicacion": "El requisito pasa de ser un equipo a ser una performance, y con eso se abre qué sensores pueden usarse para conseguirla. Las radioayudas terrestres siguen siendo fuente válida en varias especificaciones, y las rutas las sigue autorizando el ATC.",
        "referencia": "RAC 91, definición de navegación basada en la performance (PBN); FAA AIM 1-2-1"
      },
      {
        "id": "p01-q3",
        "enunciado": "¿A qué se aplica una especificación para la navegación PBN?",
        "opciones": [
          "Solo a las aproximaciones por instrumentos, que es donde se exige control y alerta a bordo.",
          "Solo a las rutas oceánicas y remotas, donde no hay cobertura de radioayudas.",
          "A cualquier fase del vuelo, pero únicamente por encima de FL 290.",
          "A rutas ATS, espacio aéreo designado, SID, STAR y aproximaciones por instrumentos."
        ],
        "correcta": 3,
        "explicacion": "PBN acompaña el vuelo entero: ruta, terminal y aproximación. Reducirlo a las aproximaciones es el error más común, y la tabla de aplicaciones de la FAA lo deja claro al listar valores para salida, llegada, aproximación inicial, intermedia, final y frustrada.",
        "referencia": "RAC 91, definición de navegación basada en la performance (PBN); FAA AC 90-105A, Tabla 5-1"
      }
    ]
  },
  {
    "tema": "P02",
    "n": 2,
    "titulo": "De la radioayuda a la trayectoria",
    "preguntas": [
      {
        "id": "p02-q1",
        "enunciado": "¿Cuál es la relación correcta entre navegación de área y PBN?",
        "opciones": [
          "Son sinónimos: RNAV es el nombre técnico que la norma usa para PBN.",
          "PBN es navegación de área, pero hay navegación de área que no entra en la definición de PBN.",
          "La navegación de área es una aplicación de PBN restringida a la terminal y a las aproximaciones.",
          "PBN reemplazó a la navegación de área cuando el GNSS se generalizó como fuente primaria."
        ],
        "correcta": 1,
        "explicacion": "La nota de la norma es explícita: la navegación de área incluye la navegación basada en la performance y además otras operaciones no incluidas en su definición. Es una relación de contenido, no de equivalencia ni de reemplazo.",
        "referencia": "RAC 91, nota a la definición de navegación de área"
      },
      {
        "id": "p02-q2",
        "enunciado": "En el título de un procedimiento, ¿qué indica la palabra RNAV?",
        "opciones": [
          "Que el avión debe estar equipado con GNSS para volar el procedimiento.",
          "Que el procedimiento incluye control y alerta de la performance a bordo del avión.",
          "Que el procedimiento solo puede volarse con el piloto automático acoplado desde el inicio.",
          "Que es navegación de área, sin decir nada de la capacidad del equipo del avión."
        ],
        "correcta": 3,
        "explicacion": "El AIM lo aclara expresamente: en ese contexto, como en los títulos de procedimiento, RNAV significa simplemente navegación de área, con independencia de la capacidad del equipo de la aeronave. Los requisitos concretos están en las notas y en el recuadro PBN de la carta.",
        "referencia": "FAA AIM 1-2-1"
      },
      {
        "id": "p02-q3",
        "enunciado": "Por qué sigue importando la navegación convencional en un módulo de PBN?",
        "opciones": [
          "Porque todas las especificaciones PBN exigen volar con un VOR sintonizado como respaldo permanente de la posición GNSS.",
          "Porque es lo que se usa por debajo de la altitud de transición, donde PBN deja de aplicarse.",
          "Porque varias especificaciones admiten radioayudas y revertir a navegación convencional es una contingencia habitual.",
          "Porque el ATC solo autoriza rutas convencionales cuando hay tráfico denso en terminal."
        ],
        "correcta": 2,
        "explicacion": "Hay especificaciones que admiten DME/DME o VOR/DME como fuente de posición, y cuando se pierde la capacidad PBN lo que queda suele ser navegación convencional. Saber volarla no es nostalgia: es el plan B.",
        "referencia": "FAA AC 90-100A, numeral 8; FAA AC 90-105A, capítulo 6"
      }
    ]
  },
  {
    "tema": "P03",
    "n": 3,
    "titulo": "Los tres elementos del concepto PBN",
    "preguntas": [
      {
        "id": "p03-q1",
        "enunciado": "¿Cuáles son los tres elementos del concepto PBN?",
        "opciones": [
          "Aplicación de navegación, especificación para la navegación e infraestructura de radioayudas.",
          "Receptor GNSS, sistema de gestión de vuelo y base de datos de navegación vigente en el ciclo AIRAC.",
          "Precisión, integridad, continuidad y disponibilidad de la señal.",
          "Aeronave elegible, operador autorizado y tripulación entrenada y calificada."
        ],
        "correcta": 0,
        "explicacion": "Son esos tres. Avión elegible, operador autorizado y tripulación entrenada son condiciones para operar, que salen de la especificación; precisión, integridad y continuidad son atributos de la performance; y GNSS, FMS y base de datos son equipo de a bordo.",
        "referencia": "RAC 91, definiciones de navegación basada en la performance y de especificación para la navegación"
      },
      {
        "id": "p03-q2",
        "enunciado": "Tu avión es elegible para RNP 1 según el AFM, pero hoy no puede cumplir una SID RNP 1. ¿Es posible?",
        "opciones": [
          "No: si el AFM lo declara elegible, la capacidad para esa SID queda garantizada mientras la base esté vigente.",
          "Sí: la elegibilidad la da la documentación del avión, y la capacidad depende de la infraestructura y del estado de la aviónica.",
          "Solo si el piloto automático está inoperativo y la SID exige el acoplamiento durante todo el ascenso.",
          "Solo en espacio aéreo oceánico o remoto, donde una SID RNP 1 no tiene radioayudas terrestres que la respalden."
        ],
        "correcta": 1,
        "explicacion": "El AIM usa este mismo ejemplo: una aeronave puede ser elegible para RNP 1 y no ser capaz de la operación por cobertura limitada de radioayudas o por una falla de aviónica. Son dos preguntas distintas y las dos hay que contestarlas.",
        "referencia": "FAA AIM 1-2-1, apartado de especificaciones RNP"
      },
      {
        "id": "p03-q3",
        "enunciado": "¿Qué define exactamente una especificación para la navegación?",
        "opciones": [
          "El equipo mínimo que la aeronave debe llevar operativo para entrar en ese espacio aéreo.",
          "La precisión lateral que el piloto automático debe mantener durante el procedimiento publicado.",
          "La trayectoria publicada con sus restricciones de altitud y de velocidad, tal como la codifica el proveedor de la base.",
          "Los requisitos de aeronave y de tripulación necesarios para operar en un espacio aéreo definido."
        ],
        "correcta": 3,
        "explicacion": "Es la definición literal de la norma, y lo importante es que incluye a la tripulación. Una especificación no se cumple solo con equipo: exige calificación, competencia y procedimientos.",
        "referencia": "RAC 91, definición de especificación para la navegación"
      }
    ]
  },
  {
    "tema": "P04",
    "n": 4,
    "titulo": "Lo que PBN no es",
    "preguntas": [
      {
        "id": "p04-q1",
        "enunciado": "«Si tengo GPS puedo volar cualquier RNP.» ¿Por qué es incorrecto?",
        "opciones": [
          "Porque cada especificación exige su propia elegibilidad, además de operador autorizado y tripulación competente.",
          "Porque el GPS no se admite como fuente de posición en las operaciones RNP, solo en las RNAV.",
          "Porque las operaciones RNP exigen DME/DME como fuente principal y dejan el GPS solo como respaldo.",
          "Porque el GPS solo se admite en ruta, no en terminal ni en aproximación, donde la precisión exigida es mucho mayor que 1 NM."
        ],
        "correcta": 0,
        "explicacion": "El AIM subraya que la elegibilidad se lista por separado para cada especificación y que ser elegible para una no implica serlo para otra. Y el RAC 121 exige además que el explotador esté autorizado. El GPS es fuente, no permiso.",
        "referencia": "FAA AIM 1-2-1; RAC 121, numeral 121.995"
      },
      {
        "id": "p04-q2",
        "enunciado": "¿Qué diferencia hay entre PBN y TAWS?",
        "opciones": [
          "Ninguna en la práctica: el TAWS es la función de PBN que protege del terreno en la aproximación.",
          "El TAWS es la fuente de datos de terreno que usa el FMS para calcular la trayectoria PBN y sus restricciones.",
          "PBN define y vigila la performance de navegación; el TAWS alerta de un peligro respecto del terreno.",
          "PBN sustituye al TAWS en los procedimientos RNP AR, donde el margen lo da la precisión."
        ],
        "correcta": 2,
        "explicacion": "Son sistemas distintos con propósitos distintos. Seguir con precisión una trayectoria publicada da margen sobre obstáculos porque el procedimiento se diseñó así, no porque PBN vigile el terreno. Confundirlos hace que se deje de vigilar el perfil vertical.",
        "referencia": "FAA AC 90-105A, capítulo 6; FAA AIM 1-2-1"
      },
      {
        "id": "p04-q3",
        "enunciado": "Encuentras una aproximación RNP en la carta pero no aparece en la base de datos del avión. En el marco de la FAA, ¿qué es lo más probable?",
        "opciones": [
          "Que la base de datos esté vencida y el procedimiento no alcanzara a entrar en el ciclo.",
          "Que el procedimiento tenga elementos PBN para los que el avión no es elegible.",
          "Que el procedimiento esté cancelado por NOTAM y el proveedor lo haya retirado.",
          "Que haya que introducirlo a mano con las coordenadas de los waypoints de la carta."
        ],
        "correcta": 1,
        "explicacion": "La FAA exige que la base de datos contenga solo los procedimientos para los que la aeronave mantiene elegibilidad: si no está, lo probable es que el avión no pueda computarlo o volarlo. Lo que nunca corresponde es teclearlo a mano desde la carta.",
        "referencia": "FAA AIM 1-2-1, apartado de especificaciones RNP"
      }
    ]
  },
  {
    "tema": "P05",
    "n": 5,
    "titulo": "Precisión, integridad, continuidad, disponibilidad y funcionalidad",
    "preguntas": [
      {
        "id": "p05-q1",
        "enunciado": "Dos aviones tienen el mismo receptor GNSS y la misma precisión declarada, pero uno no puede volar una aproximación con un tramo RF. ¿Qué atributo explica la diferencia?",
        "opciones": [
          "La precisión.",
          "La funcionalidad.",
          "La integridad.",
          "La disponibilidad."
        ],
        "correcta": 1,
        "explicacion": "La capacidad de volar un tramo RF es funcionalidad, y en varias especificaciones es opcional: hay que buscarla listada como característica del equipo. Un avión puede ser elegible para RNP APCH o RNP 1 y no poder volar un RF.",
        "referencia": "FAA AIM 1-2-1, apartados de RNP APCH y RNP 1; FAA AC 90-101A, numeral 4"
      },
      {
        "id": "p05-q2",
        "enunciado": "¿Qué significa integridad para el piloto?",
        "opciones": [
          "Que la posición calculada coincide con la verdadera dentro del valor RNP.",
          "Que el equipo es redundante y sigue funcionando después de una falla.",
          "Que el servicio está disponible durante todo el periodo previsto del vuelo.",
          "Que el sistema puede avisar cuando la información deja de ser confiable."
        ],
        "correcta": 3,
        "explicacion": "Precisión es parecido a la verdad; integridad es la confianza en esa información y el aviso cuando se pierde. La redundancia es continuidad y el servicio en el periodo del vuelo es disponibilidad: cuatro preguntas distintas.",
        "referencia": "FAA AC 90-101A, numeral 3, definición de RAIM; FAA AIM 1-2-1"
      },
      {
        "id": "p05-q3",
        "enunciado": "¿Por qué ciertas operaciones exigen equipo redundante?",
        "opciones": [
          "Por continuidad: una sola falla no puede dejar al avión sin navegación a mitad del procedimiento.",
          "Por precisión: dos sistemas promedian mejor la posición y reducen el error del sistema de navegación.",
          "Por funcionalidad: la redundancia es lo que habilita los tramos RF.",
          "Por disponibilidad: dos receptores ven más satélites en zonas de montaña."
        ],
        "correcta": 0,
        "explicacion": "La redundancia responde a continuidad. La circular de RNP AR lo ejemplifica al exigir equipo redundante donde la frustrada necesita RNP por debajo de 1.0: el punto no es medir mejor, es que la función no se caiga a mitad de la maniobra.",
        "referencia": "FAA AC 90-105A, capítulo 6; FAA AC 90-101A, numeral 2, apartado c"
      }
    ]
  },
  {
    "tema": "P06",
    "n": 6,
    "titulo": "RNAV: navegación de área",
    "preguntas": [
      {
        "id": "p06-q1",
        "enunciado": "¿Qué caracteriza a una especificación RNAV frente a una RNP?",
        "opciones": [
          "Que admite menos fuentes de posición que cualquier especificación RNP.",
          "Que su número es siempre mayor que el de una RNP, porque describe una precisión lateral más holgada.",
          "Que no incluye el requisito de control y alerta de la performance a bordo.",
          "Que solo se aplica en ruta y nunca en salidas, llegadas ni aproximaciones."
        ],
        "correcta": 2,
        "explicacion": "Es la definición literal: especificación basada en la navegación de área que no incluye el requisito de control y alerta de la performance, designada con el prefijo RNAV. El número no distingue las familias y las especificaciones RNAV existen en ruta, en terminal y en espacio oceánico.",
        "referencia": "RAC 91, definición de especificación para navegación de área (RNAV)"
      },
      {
        "id": "p06-q2",
        "enunciado": "¿Cuál es el límite real de la libertad de trayectoria que da RNAV?",
        "opciones": [
          "La capacidad del sistema del avión y la infraestructura de radioayudas disponible.",
          "La autorización del ATC, y nada más que eso.",
          "El alcance del piloto automático en modo de navegación lateral.",
          "La altitud de transición, por debajo de la cual se vuela convencional con radioayudas."
        ],
        "correcta": 0,
        "explicacion": "La navegación de área permite operar sobre cualquier trayectoria deseada dentro de la cobertura de las radioayudas de referencia, de los límites de un sistema autónomo a bordo o de una combinación de ambos. La autorización del ATC define qué se vuela, no qué se puede.",
        "referencia": "RAC 91, definición de navegación de área; FAA AIM 1-2-1"
      },
      {
        "id": "p06-q3",
        "enunciado": "Pierdes el GNSS volando una SID RNAV 1 y no puedes cumplir la especificación. ¿Cómo lo comunicas?",
        "opciones": [
          "Declaras emergencia y desciendes a la altitud mínima de seguridad del sector.",
          "Informas la falla, dices que no puedes cumplir RNAV y pides una autorización enmendada.",
          "No comunicas nada mientras el FMS siga mostrando la trayectoria completa en la pantalla.",
          "Pides vectores al ATC sin mencionar la falla, para no cargar la frecuencia."
        ],
        "correcta": 1,
        "explicacion": "La circular da el ejemplo con esas tres piezas: falla del sistema GPS/GNSS, *unable RNAV* y solicitud de autorización enmendada. El piloto debe notificar al ATC cualquier pérdida de la capacidad RNAV junto con el curso de acción propuesto.",
        "referencia": "FAA AC 90-100A, numeral 10, apartado d"
      }
    ]
  },
  {
    "tema": "P07",
    "n": 7,
    "titulo": "RNP: el control y la alerta a bordo",
    "preguntas": [
      {
        "id": "p07-q1",
        "enunciado": "¿Qué añade RNP sobre RNAV?",
        "opciones": [
          "Una precisión lateral menor en todas las fases del vuelo.",
          "La obligación de usar el GNSS como única fuente de posición admitida.",
          "La obligación de volar con el piloto automático acoplado mientras dure el procedimiento.",
          "El requisito de control de la performance a bordo y de alerta a la tripulación."
        ],
        "correcta": 3,
        "explicacion": "Es lo único que separa las dos familias en la definición de la norma. El resto (fuentes admitidas, uso del piloto automático, valores) depende de cada especificación concreta y de la carta, no de la familia.",
        "referencia": "RAC 91, definición de especificación para la performance de navegación requerida (RNP)"
      },
      {
        "id": "p07-q2",
        "enunciado": "¿Cuál es la consecuencia operacional del control y alerta a bordo?",
        "opciones": [
          "Que el piloto puede desviarse de la trayectoria publicada sin pedir autorización.",
          "Que el avión corrige solo cualquier error de posición sin intervención de la tripulación.",
          "Que permite depender menos de la intervención del ATC y de la separación procedimental.",
          "Que deja de ser necesario vigilar la desviación lateral en la presentación de navegación."
        ],
        "correcta": 2,
        "explicacion": "Si el avión sabe cuándo deja de cumplir y lo dice, se puede reducir la dependencia de que el controlador lo detecte y del margen procedimental. Nada de eso releva al piloto de vigilar la desviación ni convierte el sistema en autocorrector.",
        "referencia": "FAA AIM 1-2-1, apartado general de RNP"
      },
      {
        "id": "p07-q3",
        "enunciado": "Un compañero afirma que con el control y alerta a bordo el avión avisará de cualquier error de posición. ¿Qué le falta?",
        "opciones": [
          "Nada: el sistema detecta cualquier error de posición, sea cual sea su origen.",
          "Que solo avisa según los criterios para los que se diseñó: una suplantación de señal puede no disparar alerta.",
          "Que el aviso solo funciona con el piloto automático acoplado y en modo de navegación lateral.",
          "Que el aviso solo se presenta en la aproximación, cuando el valor RNP baja a 0.3 NM y la escala se estrecha."
        ],
        "correcta": 1,
        "explicacion": "La FAA advierte que frente a una disrupción que actúa como suplantación de señal el RAIM es solo parcialmente efectivo y el piloto puede no advertir indicaciones erróneas de navegación. Por eso el contraste de posición sigue siendo trabajo de la tripulación.",
        "referencia": "FAA AIM 1-1-19, apartado sobre disrupciones de GPS y suplantación"
      }
    ]
  },
  {
    "tema": "P08",
    "n": 8,
    "titulo": "RNAV frente a RNP",
    "preguntas": [
      {
        "id": "p08-q1",
        "enunciado": "¿Es correcto decir que RNAV 1 y RNP 1 son equivalentes?",
        "opciones": [
          "Sí: el número indica la misma precisión lateral, así que son intercambiables en la carta.",
          "Sí, siempre que el avión tenga GNSS operativo y la base de datos vigente.",
          "No, porque RNAV 1 solo se aplica en ruta y RNP 1 solo en salidas, llegadas y aproximaciones.",
          "No: son especificaciones distintas y ser elegible para una no hace elegible para la otra."
        ],
        "correcta": 3,
        "explicacion": "El AIM lo dice expresamente: RNP 1 es distinto de RNAV 1, y una elegibilidad RNP 1 no significa elegibilidad automática para RNP 2 ni para RNAV 1. Por eso cada especificación se lista por separado en la documentación del avión.",
        "referencia": "FAA AIM 1-2-1, apartado general de RNP"
      },
      {
        "id": "p08-q2",
        "enunciado": "Según la norma, ¿qué le pasó al término RNP como concepto general?",
        "opciones": [
          "Lo reemplazó el concepto de PBN, y hoy RNP se usa solo para especificaciones con control y alerta.",
          "Sigue siendo el concepto general que engloba RNAV y todas las especificaciones, y PBN es solo su nombre en la OACI.",
          "Se reservó para las operaciones oceánicas y remotas, donde no hay vigilancia radar.",
          "Se eliminó de la norma y ahora todas las especificaciones se designan como RNAV, con su número."
        ],
        "correcta": 0,
        "explicacion": "La nota es literal: el término RNP, antes definido como declaración de la performance de navegación necesaria para operar en un espacio aéreo definido, fue reemplazado por el concepto de PBN, y ahora se usa solo en el contexto de especificaciones que requieren control y alerta.",
        "referencia": "RAC 91, nota 2 a la definición de especificación para la navegación"
      },
      {
        "id": "p08-q3",
        "enunciado": "¿Cómo hay que comparar dos especificaciones de navegación?",
        "opciones": [
          "Por su número: a menor número, mejor especificación y más exigente el equipo.",
          "Por la cantidad de sensores que admiten, porque más fuentes significa más robustez frente a fallas.",
          "Como especificaciones distintas, no mejores ni peores por la precisión lateral que describen.",
          "Por la fase de vuelo en que se aplican, y solo por eso."
        ],
        "correcta": 2,
        "explicacion": "El AIM pide tratarlas como diferentes, no como mejores o peores, y de ese principio se deriva que cada elegibilidad tenga que constar por separado. Ordenarlas por número lleva directamente al error de suponer capacidades que el avión no tiene.",
        "referencia": "FAA AIM 1-2-1, apartado general de RNP"
      }
    ]
  },
  {
    "tema": "P09",
    "n": 9,
    "titulo": "Qué significa el número",
    "preguntas": [
      {
        "id": "p09-q1",
        "enunciado": "¿Qué significa el número en RNP 1?",
        "opciones": [
          "Que la aeronave puede desviarse hasta 1 NM del eje sin que se considere un error de navegación.",
          "Que el error lateral nunca excede 1 NM en ningún momento del procedimiento.",
          "La precisión lateral en NM que se espera conseguir al menos el 95 % del tiempo de vuelo.",
          "Que la anchura del espacio aéreo protegido a cada lado del eje es de 1 NM."
        ],
        "correcta": 2,
        "explicacion": "Es la definición completa, y las tres piezas cuentan: precisión lateral, en millas náuticas, conseguida al menos el 95 % del tiempo de vuelo. No es un permiso de desviación ni un límite que nunca se excede.",
        "referencia": "FAA AIM 1-2-1; FAA AC 90-101A, numeral 3, definición de RNP"
      },
      {
        "id": "p09-q2",
        "enunciado": "Según la FAA, ¿qué error debe mantener una aeronave en RNAV 2?",
        "opciones": [
          "Un error lateral que no supere 2 NM en ningún momento, sin excepción.",
          "Un error de 2 NM como máximo entre la posición del FMS y la posición GNSS.",
          "Un error técnico de vuelo no mayor de 2 NM, medido en la presentación de desviación lateral.",
          "Un error total del sistema no mayor de 2 NM el 95 % del tiempo total de vuelo."
        ],
        "correcta": 3,
        "explicacion": "El AIM lo formula así para RNAV 1 y RNAV 2: error total del sistema no mayor de 1 y de 2 NM respectivamente, el 95 % del tiempo total de vuelo. El error total del sistema no es lo mismo que el error técnico de vuelo, que es solo una de sus componentes.",
        "referencia": "FAA AIM 1-2-1, apartado de especificaciones RNAV"
      },
      {
        "id": "p09-q3",
        "enunciado": "Aunque el valor de la especificación sea 1 NM, ¿qué se espera del piloto?",
        "opciones": [
          "Mantener el eje con la desviación lateral o la guía de vuelo, salvo autorización del ATC o emergencia.",
          "Mantenerse dentro de 1 NM del eje, que es todo lo que la especificación exige.",
          "Volar el 95 % del tiempo dentro de 1 NM del eje y el resto con libertad de trayectoria.",
          "Corregir la trayectoria solo cuando el sistema de control y alerta dé un aviso de performance."
        ],
        "correcta": 0,
        "explicacion": "La expectativa operacional es mantener la línea central, según la indican los indicadores de desviación lateral o la guía de vuelo, en todas las operaciones RNP que cubre la circular, salvo autorización del ATC para desviarse o condiciones de emergencia. El valor de la especificación no es una banda de trabajo.",
        "referencia": "FAA AC 90-105A, numeral 6.2"
      }
    ]
  },
  {
    "tema": "P10",
    "n": 10,
    "titulo": "El catálogo de especificaciones",
    "preguntas": [
      {
        "id": "p10-q1",
        "enunciado": "En RNP APCH, ¿qué valor aplica al segmento de aproximación final?",
        "opciones": [
          "0.3",
          "1",
          "0.5",
          "0.1"
        ],
        "correcta": 0,
        "explicacion": "RNP APCH tiene valor 1 hasta el segmento final, donde los márgenes se estrechan a 0.3, y vuelve a 1 en la frustrada. Es el ejemplo más claro de que el valor pertenece al segmento y no al procedimiento.",
        "referencia": "FAA AC 90-105A, numeral 5.1 y Tabla 5-1"
      },
      {
        "id": "p10-q2",
        "enunciado": "¿Cuál de estas afirmaciones sobre A-RNP es correcta?",
        "opciones": [
          "Es una especificación exclusiva de aproximación, con un valor fijo de 0.3 en la final.",
          "Admite 2 en oceánico y remoto, 2 o 1 en ruta doméstica y de 1 a 0.3 en terminal.",
          "Tiene un valor fijo de 1 en todas las fases, desde la salida hasta la frustrada.",
          "Solo se aplica en espacio aéreo oceánico y remoto, con un valor de 2 o de 4."
        ],
        "correcta": 1,
        "explicacion": "Lo distintivo de A-RNP es el escalado: los límites se van abriendo desde 0.3 hacia valores mayores en salidas y frustradas, y se estrechan en llegadas y aproximaciones. Es una especificación de varias fases, no solo de aproximación.",
        "referencia": "FAA AC 90-105A, numeral 5.1 y Tabla 5-1"
      },
      {
        "id": "p10-q3",
        "enunciado": "«RNP solo se usa en aproximaciones.» ¿Por qué es falso?",
        "opciones": [
          "Porque RNP también se usa en rodaje, para seguir las calles de rodaje codificadas en la base de datos.",
          "Porque RNP es el concepto general que engloba RNAV y todas las especificaciones PBN.",
          "Porque hay especificaciones RNP para ruta doméstica, oceánico y remoto, llegada y salida.",
          "Porque en aproximación se usa exclusivamente RNAV, y RNP queda para ruta y terminal."
        ],
        "correcta": 2,
        "explicacion": "RNP 2 se aplica en ruta doméstica y oceánica, RNP 4 en oceánico y remoto, y RNP 1 en llegada, salida y los segmentos inicial e intermedio de aproximación. Reducir RNP a la aproximación es uno de los errores de entrevista más frecuentes.",
        "referencia": "FAA AC 90-105A, Tabla 5-1"
      }
    ]
  },
  {
    "tema": "P11",
    "n": 11,
    "titulo": "Cómo sé si mi avión puede",
    "preguntas": [
      {
        "id": "p11-q1",
        "enunciado": "¿Dónde consta si la aeronave es elegible para una especificación de navegación?",
        "opciones": [
          "En la base de datos del FMS, junto con los procedimientos que el avión puede volar.",
          "En el plan operacional de vuelo que prepara el despacho, en la casilla de equipo del avión.",
          "En la carta del procedimiento, en el recuadro de requisitos de equipo de la aeronave.",
          "En el manual de vuelo o en otra documentación de la aeronave aprobada por la autoridad."
        ],
        "correcta": 3,
        "explicacion": "La norma exige que la aeronave cuente con esa información enumerada en el manual de vuelo o en otra documentación aprobada, y el AIM añade que si falta o está incompleta hay que contactar al fabricante de la aviónica o de la aeronave. La carta dice qué se exige, no qué tiene el avión.",
        "referencia": "RAC 91, numeral 91.1015, apartado (a)(2); FAA AIM 1-2-1"
      },
      {
        "id": "p11-q2",
        "enunciado": "Según el RAC 121, ¿qué hace falta además de que el avión esté equipado?",
        "opciones": [
          "Nada más: si el equipo está a bordo, la capacidad está dada.",
          "Que el explotador esté autorizado por la autoridad para esas operaciones.",
          "Que el ATC confirme la capacidad del avión en el primer contacto de cada dependencia.",
          "Que el procedimiento aparezca en la base de datos del FMS con el ciclo vigente."
        ],
        "correcta": 1,
        "explicacion": "El explotador debe estar autorizado por la UAEAC, y para las especificaciones con autorización obligatoria (AR) la autoridad emite una aprobación específica. Tener el equipo y estar autorizado son dos cosas distintas.",
        "referencia": "RAC 121, numeral 121.995, apartado (b)(3) y (b)(4)"
      },
      {
        "id": "p11-q3",
        "enunciado": "¿Qué información sobre PBN debe contener la MEL según la norma?",
        "opciones": [
          "El valor RNP de cada procedimiento publicado en el destino y en los aeródromos alternos del plan.",
          "La lista de satélites GNSS disponibles para la fecha y la ruta del vuelo.",
          "La información sobre las capacidades de especificación de navegación de la aeronave.",
          "El ciclo AIRAC vigente de la base de datos y la fecha en que vence el siguiente."
        ],
        "correcta": 2,
        "explicacion": "Las dos normas exigen que, cuando la aeronave se opere de acuerdo con la MEL, se cuente con la información relativa a las capacidades de especificación de navegación incluidas en ella. Es la prueba normativa de que un avión despachable puede haber perdido una capacidad PBN.",
        "referencia": "RAC 91, numeral 91.1015, apartado (a)(3); RAC 121, numeral 121.995, apartado (b)(1)(iii)"
      }
    ]
  },
  {
    "tema": "P12",
    "n": 12,
    "titulo": "RNAV 5",
    "preguntas": [
      {
        "id": "p12-q1",
        "enunciado": "¿Qué distingue a RNAV 5 del resto de la familia RNAV en cuanto a fuentes de posición?",
        "opciones": [
          "Que solo admite GNSS, sin ninguna otra fuente de posición declarable.",
          "Que no admite DME/DME porque su precisión no alcanza para 5 NM en ruta.",
          "Que exige dos sistemas de navegación independientes durante todo el vuelo.",
          "Que admite VOR/DME e inerciales como fuentes declarables por sí solas."
        ],
        "correcta": 3,
        "explicacion": "Los códigos del plan de vuelo listan para RNAV 5 todos los sensores permitidos, GNSS, DME/DME, VOR/DME, INS o IRS, y LORAN C. Esa amplitud es lo característico de la especificación, y tiene consecuencia operacional ante una pérdida de GNSS.",
        "referencia": "OACI PANS-ATM, Apéndice 2, códigos `PBN/` B1 a B6"
      },
      {
        "id": "p12-q2",
        "enunciado": "¿Dónde se comprueba si RNAV 5 aplica en una FIR concreta?",
        "opciones": [
          "En el AIP de ese Estado.",
          "En el AFM del avión.",
          "En las circulares de la FAA.",
          "En la base de datos del FMS."
        ],
        "correcta": 0,
        "explicacion": "Qué especificación se prescribe en un espacio aéreo lo publica el Estado en su AIP. Las circulares de la FAA no cubren RNAV 5 porque en su espacio aéreo la especificación de ruta aplicable es RNAV 2: es un buen recordatorio de que los criterios de una autoridad no son universales.",
        "referencia": "RAC 211, apéndice de designadores de rutas ATS; práctica estándar de publicación AIP"
      },
      {
        "id": "p12-q3",
        "enunciado": "Pierdes GNSS en ruta volando con capacidad RNAV 5 declarada y el sistema sigue posicionando por DME/DME. ¿Qué corresponde?",
        "opciones": [
          "Declarar *unable RNAV* de inmediato, porque sin GNSS no hay capacidad.",
          "Comprobar si la fuente que queda está admitida y declarada para la especificación.",
          "Descender por debajo del nivel de vuelo más bajo de la ruta para salir del espacio RNAV 5.",
          "Nada: RNAV 5 no exige ninguna fuente de posición determinada."
        ],
        "correcta": 1,
        "explicacion": "La pregunta correcta es si queda una fuente admitida para esa especificación y declarada como capacidad. Si la hay, puede que la capacidad se conserve; si no, se notifica al ATC. Declarar una incapacidad que no existe también es un error.",
        "referencia": "OACI PANS-ATM, Apéndice 2, códigos `PBN/` B1 a B6; FAA AC 90-100A, numeral 10, apartado d"
      }
    ]
  },
  {
    "tema": "P13",
    "n": 13,
    "titulo": "RNAV 1 y RNAV 2",
    "preguntas": [
      {
        "id": "p13-q1",
        "enunciado": "¿Qué contiene el recuadro PBN de una carta en el marco de la FAA?",
        "opciones": [
          "El equipo en tierra que debe estar operativo en el aeropuerto, como el ILS o el DME.",
          "La especificación y, si hace falta, sensores, funciones adicionales, valor RNP mínimo y observaciones.",
          "La lista de tipos de aeronave autorizados a volar el procedimiento por la autoridad.",
          "Las frecuencias de los servicios de tránsito aéreo y del ATIS, con sus horarios de operación en el aeródromo."
        ],
        "correcta": 1,
        "explicacion": "Es exactamente lo que el AIM enumera para ese recuadro, y añade que lo que figura ahí es obligatorio para volar los elementos PBN del procedimiento. El equipo en tierra va en un recuadro distinto, de requisitos de equipo.",
        "referencia": "FAA AIM 1-2-3, representación de los requisitos PBN"
      },
      {
        "id": "p13-q2",
        "enunciado": "Antes de iniciar la carrera de despegue en una salida RNAV con GNSS, ¿qué se exige?",
        "opciones": [
          "Nada especial: basta con que el FMS esté inicializado con la posición de la puerta.",
          "Que se haya verificado la predicción RAIM para la hora estimada de llegada al destino.",
          "Que el piloto automático esté acoplado desde el inicio de la carrera hasta el primer waypoint de la SID.",
          "Que la señal GNSS esté adquirida antes de la carrera y que la posición del avión esté confirmada."
        ],
        "correcta": 3,
        "explicacion": "La circular exige confirmar la posición de la aeronave, con una tolerancia de 1.000 ft al comenzar la carrera y la actualización de pista como medio aceptable, y en aviones que usan GNSS, que la señal esté adquirida antes de iniciar la carrera.",
        "referencia": "FAA AC 90-100A, numeral 10, apartados c(3) y c(4)"
      },
      {
        "id": "p13-q3",
        "enunciado": "La carta de una STAR dice «RNAV 1». ¿Qué está describiendo?",
        "opciones": [
          "La especificación que el procedimiento exige.",
          "La capacidad del avión que la va a volar.",
          "La precisión con que el piloto debe volar a mano.",
          "El valor de desviación lateral que el ATC tolera."
        ],
        "correcta": 0,
        "explicacion": "La carta dice qué exige el procedimiento. Lo que el avión tiene consta en el AFM o en la documentación de aviónica, y lo que el operador está autorizado a hacer, en las especificaciones de operación. Son tres documentos distintos.",
        "referencia": "FAA AIM 1-2-1 y 1-2-3"
      }
    ]
  },
  {
    "tema": "P14",
    "n": 14,
    "titulo": "RNP 1",
    "preguntas": [
      {
        "id": "p14-q1",
        "enunciado": "En RNP 1, ¿qué ocurre con la capacidad de volar un tramo RF?",
        "opciones": [
          "Es opcional: hay que verificar que los RF estén listados como característica del equipo.",
          "Es obligatoria: todo avión elegible para RNP 1 puede volar un tramo RF.",
          "No existe: los tramos RF son exclusivos de las aproximaciones RNP AR.",
          "Depende de lo que autorice el ATC en el momento, según el tráfico y la meteorología del día."
        ],
        "correcta": 0,
        "explicacion": "El AIM lo dice con esas palabras: el avión puede ser elegible para RNP 1 y no volar un tramo RF salvo que los RF estén específicamente listados como una característica del equipo de aviónica. En RNP AR, en cambio, la capacidad RF es obligatoria.",
        "referencia": "FAA AIM 1-2-1, apartado RNP 1"
      },
      {
        "id": "p14-q2",
        "enunciado": "¿En qué fases se aplica RNP 1?",
        "opciones": [
          "Solo en la aproximación final, donde el valor baja de 1 a 0.3 NM.",
          "Solo en ruta, entre el final de la SID y el comienzo de la STAR.",
          "Llegada, salida, e inicial e intermedia de aproximación en procedimientos convencionales con segmentos PBN.",
          "En todas las fases del vuelo, incluidas la aproximación final y la frustrada, siempre con el mismo valor de 1 NM."
        ],
        "correcta": 2,
        "explicacion": "La tabla de aplicaciones marca RNP 1 en llegada, inicial, intermedia, frustrada y salida, y deja la final sin aplicar. El AIM añade el caso típico: un ILS con alimentador, IAF o frustrada de tipo PBN.",
        "referencia": "FAA AIM 1-2-1, apartado RNP 1; FAA AC 90-105A, Tabla 5-1"
      },
      {
        "id": "p14-q3",
        "enunciado": "Dos aviones de la misma flota tienen elegibilidad RNP 1 y uno no puede volar una STAR con un tramo RF. ¿Qué explica la diferencia?",
        "opciones": [
          "Un error de codificación del tramo RF en la base de datos de uno de los dos aviones de la flota.",
          "Que uno de los dos tiene el piloto automático inoperativo por un ítem de MEL.",
          "Que uno de los dos declaró otra especificación en la casilla 18 del plan de vuelo.",
          "Que la capacidad de tramo RF es una función opcional que debe constar por separado."
        ],
        "correcta": 3,
        "explicacion": "La elegibilidad de la especificación y las funcionalidades opcionales se documentan por separado. El caso es exactamente el que el AIM previene, y es también un buen recordatorio de que en la base de datos puede no aparecer un procedimiento para el que el avión no es elegible.",
        "referencia": "FAA AIM 1-2-1, apartados RNP 1 y RNP APCH"
      }
    ]
  },
  {
    "tema": "P15",
    "n": 15,
    "titulo": "RNP 2, RNP 4, RNAV 10 y A-RNP",
    "preguntas": [
      {
        "id": "p15-q1",
        "enunciado": "¿Dónde se aplica RNP 2?",
        "opciones": [
          "En ruta doméstica y en oceánico o remoto.",
          "Solo en espacio oceánico y remoto.",
          "Solo en ruta doméstica.",
          "En terminal y en los segmentos inicial e intermedio de aproximación."
        ],
        "correcta": 0,
        "explicacion": "RNP 2 se aplica tanto a operaciones domésticas como oceánicas o remotas, con valor 2. RNP 4 es la que queda restringida a oceánico y remoto.",
        "referencia": "FAA AIM 1-2-1, apartado RNP 2; FAA AC 90-105A, Tabla 5-1"
      },
      {
        "id": "p15-q2",
        "enunciado": "¿Por qué RNP 10 pasó a llamarse RNAV 10?",
        "opciones": [
          "Porque su precisión lateral cambió de 10 NM a un valor distinto.",
          "Porque dejó de aplicarse en espacio oceánico y remoto.",
          "Porque no incluye control y alerta a bordo, y el prefijo RNP quedó para las que sí lo incluyen.",
          "Porque la FAA y la OACI usan nombres distintos para la misma especificación, y en el plan manda la OACI."
        ],
        "correcta": 2,
        "explicacion": "El prefijo RNP quedó reservado a especificaciones con control y alerta de la performance. Esta no lo tiene, así que se renombró, aunque el nombre antiguo sobrevive en el código `A1` del plan de vuelo, cuyo texto literal es «RNAV 10 (RNP 10)».",
        "referencia": "RAC 91, nota 2 a la definición de especificación para la navegación; FAA AIM 1-2-1, apartado RNP 10"
      },
      {
        "id": "p15-q3",
        "enunciado": "Tu flota es elegible para A-RNP. ¿Puedes volar una RNP AR APCH?",
        "opciones": [
          "Sí: A-RNP incluye RNP AR entre las especificaciones que agrupa.",
          "No automáticamente: RNP AR exige un proceso de determinación separado y autorización especial.",
          "Sí, siempre que el procedimiento tenga tramos RF, que A-RNP exige como función obligatoria en todas sus aprobaciones.",
          "No, porque A-RNP es una especificación solo de ruta y no se aplica en aproximación."
        ],
        "correcta": 1,
        "explicacion": "La nota del AIM es tajante: las aeronaves elegibles para A-RNP no son automáticamente elegibles para operaciones RNP AR APCH ni RNP AR DP, porque esa elegibilidad requiere un proceso de determinación separado y autorización especial de la autoridad.",
        "referencia": "FAA AIM 1-2-1, nota al apartado A-RNP"
      }
    ]
  },
  {
    "tema": "P16",
    "n": 16,
    "titulo": "RNP APCH",
    "preguntas": [
      {
        "id": "p16-q1",
        "enunciado": "¿Cuándo hay que confirmar que el sistema pasó de modo terminal a modo aproximación?",
        "opciones": [
          "Al recibir la autorización de aproximación del ATC.",
          "Al cruzar el punto de aproximación inicial.",
          "2 NM antes del punto de aproximación final.",
          "Al pasar el FAF."
        ],
        "correcta": 2,
        "explicacion": "La circular lo fija así: los pilotos deben confirmar que el sistema ha iniciado la transición de modo terminal a modo aproximación 2 NM antes del FAF. Confirmarlo después del FAF llega tarde para hacer algo al respecto.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.7.2.1"
      },
      {
        "id": "p16-q2",
        "enunciado": "¿Cómo define la FAA la pérdida de capacidad RNP APCH?",
        "opciones": [
          "La pérdida total del GNSS, y ninguna otra condición.",
          "Cualquier falla o suceso que impida satisfacer los requisitos RNP APCH del procedimiento.",
          "La superación del valor RNP en el segmento final, confirmada por la alerta del sistema de control a bordo.",
          "La desconexión del piloto automático en un procedimiento que exige su acoplamiento."
        ],
        "correcta": 1,
        "explicacion": "La definición es deliberadamente amplia: cualquier falla o suceso que impida satisfacer los requisitos del procedimiento. No hay que esperar la pérdida total de una fuente para concluir que la capacidad se perdió.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.7.1.8"
      },
      {
        "id": "p16-q3",
        "enunciado": "Una carta se titula «RNAV (GPS) RWY 13». ¿Qué especificación se está volando en el marco de la FAA?",
        "opciones": [
          "RNAV 1, porque el título empieza por RNAV y no por RNP.",
          "RNP AR APCH, porque el título indica que el GPS es el único sensor admitido.",
          "RNAV 1 con GPS como único sensor exigido para toda la aproximación, incluida la frustrada publicada.",
          "RNP APCH, pero lo que exige el procedimiento se confirma en las notas y el recuadro PBN."
        ],
        "correcta": 3,
        "explicacion": "En el marco de la FAA los procedimientos RNP APCH se titulan RNAV (GPS), así que la respuesta práctica es RNP APCH. Pero la respuesta profesional incluye el hábito: lo que el procedimiento exige está en las notas y en el recuadro PBN, no en el título.",
        "referencia": "FAA AIM 1-2-1, apartado RNP APCH; FAA AIM 1-2-3"
      }
    ]
  },
  {
    "tema": "P17",
    "n": 17,
    "titulo": "Las líneas de mínimos",
    "preguntas": [
      {
        "id": "p17-q1",
        "enunciado": "¿Qué línea de mínimos exige aumentación satelital?",
        "opciones": [
          "LPV y LP.",
          "LNAV.",
          "LNAV/VNAV, siempre.",
          "Circling."
        ],
        "correcta": 0,
        "explicacion": "Para volar a mínimos LPV o LP se requiere aumentación satelital. LNAV/VNAV puede volarse con guía vertical barométrica aprobada para aproximación o con vertical satelital, así que no exige SBAS necesariamente.",
        "referencia": "FAA AIM 1-2-1, apartado RNP APCH; FAA AIM 5-4-5"
      },
      {
        "id": "p17-q2",
        "enunciado": "¿Es LP un modo degradado de LPV?",
        "opciones": [
          "Sí: cuando la guía vertical de LPV no está disponible, el sistema revierte solo a LP.",
          "Sí, pero solo en aeropuertos sin ILS, donde LP reemplaza a la línea LNAV.",
          "No: LP solo se publica donde no se puede publicar un procedimiento con guía vertical.",
          "No: LP es la línea con guía vertical y LPV la que solo tiene guía lateral de precisión."
        ],
        "correcta": 2,
        "explicacion": "El AIM lo dice expresamente: LP no es un modo de reversión de LPV. Se publica solo donde no se puede publicar un procedimiento con guía vertical, y nunca junto a LNAV/VNAV o LPV.",
        "referencia": "FAA AIM 5-4-5, apartado LP"
      },
      {
        "id": "p17-q3",
        "enunciado": "La carta publica LPV, pero el AFM de tu avión no menciona esa capacidad. Estás autorizado al procedimiento por el ATC. ¿A qué línea puedes volar?",
        "opciones": [
          "A LPV: la autorización del ATC habilita cualquier línea de mínimos publicada.",
          "A ninguna: sin capacidad LPV el procedimiento entero queda sin poder volarse.",
          "A LPV, siempre que se aumente la visibilidad mínima publicada.",
          "A la línea para la que el avión esté certificado, que no es LPV."
        ],
        "correcta": 3,
        "explicacion": "La autorización del ATC para el procedimiento habilita al piloto a usar los mínimos para los que la aeronave está certificada, no todos los publicados. Sin capacidad LPV se vuela a otra línea, típicamente LNAV/VNAV o LNAV según lo que el avión tenga.",
        "referencia": "FAA AIM 5-4-5, apartado sobre cartas de aproximación RNAV"
      }
    ]
  },
  {
    "tema": "P18",
    "n": 18,
    "titulo": "BARO-VNAV y el ajuste altimétrico",
    "preguntas": [
      {
        "id": "p18-q1",
        "enunciado": "¿Se puede volar a la DA de LNAV/VNAV con un ajuste altimétrico remoto?",
        "opciones": [
          "Sí, siempre que se aumenten los mínimos publicados en la caja de la carta.",
          "Sí, si la temperatura del aeródromo está dentro de los límites que publica la nota del procedimiento en la carta.",
          "Sí, si el ATC lo autoriza expresamente al dar la autorización de aproximación.",
          "No: hace falta ajuste local y actual; con ajuste remoto, VNAV solo sirve hasta la MDA de LNAV."
        ],
        "correcta": 3,
        "explicacion": "La circular es explícita: el uso de Baro-VNAV hasta una DA no está autorizado con ajuste altimétrico remoto, y donde se publican mínimos con altímetro remoto la función VNAV puede usarse solo hasta la MDA de LNAV publicada.",
        "referencia": "FAA AC 90-105A, Apéndice B, numeral B.4.4"
      },
      {
        "id": "p18-q2",
        "enunciado": "¿Cuándo debe estar puesto el altímetro local del aeropuerto de aterrizaje?",
        "opciones": [
          "Antes de iniciar el descenso desde el nivel de crucero.",
          "No más tarde del punto de aproximación final.",
          "Al pasar la altitud de transición en el descenso.",
          "Al alcanzar la DA."
        ],
        "correcta": 1,
        "explicacion": "La circular fija ese límite: los pilotos deben verificar que el altímetro local actual del aeropuerto de aterrizaje previsto está puesto no más tarde del FAF. Después del FAF ya se está descendiendo sobre una senda que depende de ese ajuste.",
        "referencia": "FAA AC 90-105A, Apéndice B, numeral B.4.5.1"
      },
      {
        "id": "p18-q3",
        "enunciado": "¿Es aceptable usar el modo de velocidad vertical para seguir la senda en una aproximación Baro-VNAV?",
        "opciones": [
          "Sí, si se ajusta la velocidad vertical al gradiente publicado en la carta.",
          "Sí, cuando el piloto automático está desacoplado y se vuela a mano con director.",
          "No: velocidad vertical no es un modo aplicable a una aproximación Baro-VNAV.",
          "Sí, por debajo del FAF, cuando la senda ya está capturada."
        ],
        "correcta": 2,
        "explicacion": "La circular pide conocer la selección del modo vertical que manda la trayectoria vertical publicada y aclara que otros modos, como velocidad vertical, no son aplicables a operaciones de aproximación Baro-VNAV.",
        "referencia": "FAA AC 90-105A, Apéndice B, numeral B.4.3"
      }
    ]
  },
  {
    "tema": "P19",
    "n": 19,
    "titulo": "Temperatura y la trayectoria barométrica",
    "preguntas": [
      {
        "id": "p19-q1",
        "enunciado": "La temperatura está por debajo del límite publicado para la línea LNAV/VNAV y tu avión no tiene compensación automática. ¿Qué haces?",
        "opciones": [
          "Vuelas a la MDA de la línea LNAV.",
          "Vuelas a la DA de LNAV/VNAV: la limitación es orientativa.",
          "No puedes volar la aproximación.",
          "Sumas un margen a la DA y continúas."
        ],
        "correcta": 0,
        "explicacion": "Sin una función automática aprobada de compensación no se puede usar la línea LNAV/VNAV fuera del rango de temperatura, pero la línea LNAV sí puede usarse. La respuesta no es abandonar la aproximación: es cambiar de línea de mínimos.",
        "referencia": "FAA AC 90-105A, Apéndice B, numeral B.4.2; FAA AIM 5-4-5"
      },
      {
        "id": "p19-q2",
        "enunciado": "¿A quién no aplica la limitación de temperatura publicada para Baro-VNAV?",
        "opciones": [
          "A ninguna aeronave: la limitación de temperatura aplica siempre, sin excepción.",
          "A quien la vuela con guía vertical satelital y tiene la aprobación de aeronavegabilidad para ello.",
          "A quien la vuela con el piloto automático acoplado y la compensación de temperatura manual.",
          "A quien tiene autorización del ATC para continuar la aproximación por debajo del FAF con esa temperatura."
        ],
        "correcta": 1,
        "explicacion": "La limitación existe porque la senda se construye con información barométrica. Si la guía vertical viene de aumentación satelital y el avión tiene esa aprobación, la limitación de temperatura publicada no le aplica.",
        "referencia": "FAA AIM 5-4-5, nota sobre la limitación de temperatura Baro-VNAV"
      },
      {
        "id": "p19-q3",
        "enunciado": "¿Dónde está el valor concreto de la limitación de temperatura de una aproximación?",
        "opciones": [
          "En el AFM del avión, en la sección de limitaciones.",
          "En una tabla general que publica la autoridad para todos los aeródromos.",
          "En una nota del propio procedimiento, en la carta.",
          "En el manual de operaciones del explotador."
        ],
        "correcta": 2,
        "explicacion": "La circular dice que la limitación se muestra como una nota en el procedimiento. Es una cifra del procedimiento, no del avión ni general: se lee en la carta de esa aproximación y no se memoriza.",
        "referencia": "FAA AC 90-105A, Apéndice B, numeral B.4.2"
      }
    ]
  },
  {
    "tema": "P20",
    "n": 20,
    "titulo": "Volar a una MDA: el descenso continuo",
    "preguntas": [
      {
        "id": "p20-q1",
        "enunciado": "Según el RAC, ¿qué es la técnica de aproximación final en descenso continuo (CDFA)?",
        "opciones": [
          "Un procedimiento de aproximación con guía vertical que sustituye a la línea LNAV cuando la LPV no está disponible.",
          "Una técnica de vuelo para el tramo final de un NPA, en descenso continuo y sin nivelaciones de altura.",
          "Una autorización específica del explotador para descender por debajo de la MDA sin la referencia visual.",
          "El método de cálculo del ángulo de descenso que publica la carta."
        ],
        "correcta": 1,
        "explicacion": "La definición es literal: técnica de vuelo congruente con los procedimientos de aproximación estabilizada, para el tramo de aproximación final siguiendo un NPA en descenso continuo, sin nivelaciones de altura, desde una altitud igual o superior a la del FAF hasta unos 15 m (50 ft) sobre el umbral o el inicio de la nivelada. Es una técnica, no un procedimiento ni una autorización.",
        "referencia": "RAC 91 y RAC 121, definición de aproximación final en descenso continuo (CDFA)"
      },
      {
        "id": "p20-q2",
        "enunciado": "Vuelas una CDFA con guía VNAV de asesoramiento calculada por el equipo de a bordo. ¿Cómo se clasifica la operación y a qué mínimo se vuela?",
        "opciones": [
          "Operación 3D, pero el procedimiento sigue siendo un NPA y se vuela a la MDA.",
          "Operación 2D, y se vuela a la MDA como en cualquier NPA.",
          "Operación 3D, y el procedimiento pasa a ser una APV con su DA.",
          "Depende de que el operador tenga aprobación específica para CDFA con guía de asesoramiento."
        ],
        "correcta": 0,
        "explicacion": "La nota del RAC es exacta: las CDFA con guía VNAV de asesoramiento calculada por el equipo de a bordo se consideran operaciones 3D, y con cálculo manual de la velocidad vertical, 2D. Pero la clasificación de la operación no cambia el procedimiento: sigue siendo un NPA y el mínimo sigue siendo la MDA.",
        "referencia": "RAC 91 y RAC 121, nota a la definición de procedimiento de aproximación que no es de precisión (NPA)"
      },
      {
        "id": "p20-q3",
        "enunciado": "Una carta de NPA lleva la nota «Visual Segment – Obstacles» en el perfil. ¿Qué significa?",
        "opciones": [
          "Que el segmento visual está balizado con luces de aproximación de alta intensidad.",
          "Que la aproximación solo puede volarse de día y con la pista a la vista desde el FAF.",
          "Que el procedimiento exige guía vertical barométrica aprobada por debajo de la MDA publicada.",
          "Que el VDA se retiró porque un obstáculo obligaría a desviarse de él entre la MDA y la toma."
        ],
        "correcta": 3,
        "explicacion": "Cuando el VDA/TCH no está autorizado por una penetración de obstáculo que obligaría al piloto a desviarse del VDA entre la MDA y la toma, se sustituye por esa nota. Quien siga bajando por el ángulo que le dibuja el sistema de navegación, por debajo de la MDA, puede encontrarse obstáculos en el segmento visual.",
        "referencia": "FAA AIM 5-4-5, apartado de ángulo de descenso vertical (VDA)"
      }
    ]
  },
  {
    "tema": "P21",
    "n": 21,
    "titulo": "RNP AR APCH",
    "preguntas": [
      {
        "id": "p21-q1",
        "enunciado": "¿Qué área lateral de evaluación de obstáculos usan los procedimientos RNP AR?",
        "opciones": [
          "El valor RNP más una zona secundaria estándar a cada lado.",
          "Cuatro veces el valor RNP, con una zona secundaria reducida.",
          "La misma que RNP APCH, con el valor de la línea.",
          "Dos veces el valor RNP, sin zona secundaria ni márgenes adicionales."
        ],
        "correcta": 3,
        "explicacion": "Es lo que caracteriza a RNP AR: área lateral igual a dos veces el valor RNP, sin área lateral secundaria ni márgenes adicionales. Esa ausencia de colchón es la razón de las exigencias de autorización, equipo y entrenamiento.",
        "referencia": "FAA AIM 5-4-18, apartado de valor RNP"
      },
      {
        "id": "p21-q2",
        "enunciado": "La carta de una RNP AR publica una línea de mínimos con RNP 0.15. ¿Puedes volarla?",
        "opciones": [
          "Sí, siempre que el avión sea elegible para RNP AR según su AFM.",
          "Sí, si el ATC te autoriza el procedimiento con esa línea de mínimos.",
          "Solo si la autorización del operador permite ese valor.",
          "No: RNP AR exige siempre un valor mínimo de 0.30, y las líneas más bajas son de otras autoridades."
        ],
        "correcta": 2,
        "explicacion": "Cada autorización identifica un valor RNP mínimo autorizado, y ese valor puede variar según la configuración de la aeronave o los procedimientos operacionales, por ejemplo con director de vuelo con o sin piloto automático. La carta publica la línea; la autorización dice a qué valor se puede volar.",
        "referencia": "FAA AIM 5-4-18; FAA AC 90-101A, Apéndice, numeral 2, apartado a"
      },
      {
        "id": "p21-q3",
        "enunciado": "¿Qué hay que confirmar antes de iniciar una aproximación RNP AR con gradiente de frustrada no estándar?",
        "opciones": [
          "Nada especial: el gradiente de frustrada lo calcula y lo vuela el FMS.",
          "Que el avión puede cumplirlo, como lo publica la carta.",
          "Que el ATC acepta una frustrada con gradiente reducido si hace falta.",
          "Que la temperatura del aeródromo está dentro de los límites de la nota Baro-VNAV publicada en la carta."
        ],
        "correcta": 1,
        "explicacion": "Una RNP AR puede pedir velocidades de aproximación o gradientes de frustrada que no son los estándar. Están publicados en la carta, y confirmar que el avión los cumple es un paso previo a iniciar: descubrirlo en la frustrada es tarde.",
        "referencia": "FAA AIM 5-4-18, apartado de velocidades y gradientes no estándar"
      }
    ]
  },
  {
    "tema": "P22",
    "n": 22,
    "titulo": "RNP APCH frente a RNP AR APCH",
    "preguntas": [
      {
        "id": "p22-q1",
        "enunciado": "¿Cuál es la diferencia de fondo entre RNP APCH y RNP AR APCH?",
        "opciones": [
          "Que RNP AR usa un valor RNP más bajo, y esa es toda la diferencia entre las dos.",
          "Que exige autorización específica y no tiene zona secundaria.",
          "Que RNP APCH no admite guía vertical y RNP AR sí, con Baro-VNAV o aumentación satelital.",
          "Que RNP AR solo se vuela con aumentación satelital y RNP APCH con cualquier sensor admitido por la especificación."
        ],
        "correcta": 1,
        "explicacion": "El valor más bajo es una consecuencia del diseño, no la definición. Lo que define RNP AR es la autorización específica, sin excepciones, y un área lateral de evaluación de obstáculos de dos veces el valor RNP sin zona secundaria.",
        "referencia": "FAA AIM 5-4-18; FAA AC 90-101A, numeral 1"
      },
      {
        "id": "p22-q2",
        "enunciado": "¿Cómo se trata la elegibilidad de tramo RF en cada especificación?",
        "opciones": [
          "Obligatoria en las dos, porque ambas incluyen segmentos curvos.",
          "Opcional en las dos: depende del equipo de cada avión.",
          "Opcional en RNP APCH; obligatoria en RNP AR.",
          "Obligatoria en RNP APCH y opcional en RNP AR, según lo que diga cada autorización."
        ],
        "correcta": 2,
        "explicacion": "En RNP APCH la capacidad RF es opcional y hay que verla listada como característica del equipo. En RNP AR, la elegibilidad para tramos RF es requerida en cualquier autorización, porque muchos de esos procedimientos los contienen.",
        "referencia": "FAA AIM 1-2-1, apartado RNP APCH; FAA AIM 5-4-18, apartado de tramos RF"
      },
      {
        "id": "p22-q3",
        "enunciado": "¿En qué se basa la performance de navegación vertical de una RNP AR APCH?",
        "opciones": [
          "En guía vertical barométrica o en aumentación satelital.",
          "Solo en guía vertical satelital, porque la barométrica no alcanza.",
          "Solo en guía vertical barométrica, compensada por temperatura.",
          "En el radioaltímetro durante toda la aproximación final."
        ],
        "correcta": 0,
        "explicacion": "Puede basarse en Baro-VNAV o en aumentación satelital. Si es barométrica, las limitaciones de ajuste altimétrico y de temperatura se aplican igual, y con menos margen lateral disponible para absorber cualquier otro problema.",
        "referencia": "FAA AIM 1-2-1, apartado RNP AR APCH"
      }
    ]
  },
  {
    "tema": "P23",
    "n": 23,
    "titulo": "El tramo RF",
    "preguntas": [
      {
        "id": "p23-q1",
        "enunciado": "¿Qué es un tramo RF?",
        "opciones": [
          "Un giro cerrado que el FMS ejecuta por su cuenta al anticipar un waypoint fly-by.",
          "Un tramo con rumbo constante hasta interceptar la derrota siguiente.",
          "Un procedimiento de espera de radio reducido, publicado para zonas de relieve.",
          "Una trayectoria circular de radio constante alrededor de un centro definido, entre dos puntos."
        ],
        "correcta": 3,
        "explicacion": "Es la definición literal. La clave operacional es que el arco es la trayectoria publicada y protegida, no una consecuencia de cómo el avión toma el giro.",
        "referencia": "FAA AC 90-101A, numeral 3, apartado g; FAA AIM 1-2-1"
      },
      {
        "id": "p23-q2",
        "enunciado": "¿Por qué importa la velocidad en un tramo RF?",
        "opciones": [
          "Porque con el radio fijo, más velocidad exige más inclinación y el avión no se queda en el arco.",
          "Porque afecta el consumo de combustible previsto para el segmento de llegada.",
          "Porque el ATC calcula la separación entre aviones con la velocidad publicada del tramo.",
          "No importa: el FMS ajusta el radio del arco a la velocidad real."
        ],
        "correcta": 0,
        "explicacion": "El radio está definido, así que la única variable es la inclinación necesaria para seguirlo. La circular enumera entre los conocimientos requeridos la importancia de mantener la trayectoria publicada y las velocidades máximas en operaciones RNP con tramos RF.",
        "referencia": "FAA AC 90-105A, numeral 8.4.3, apartado 14"
      },
      {
        "id": "p23-q3",
        "enunciado": "Tu avión es elegible para RNP APCH. ¿Puedes volar una aproximación RNP APCH con un tramo RF?",
        "opciones": [
          "Sí: la elegibilidad RNP APCH incluye los tramos RF de la aproximación.",
          "Solo si el equipo lista los tramos RF.",
          "No: los tramos RF son exclusivos de las aproximaciones RNP AR.",
          "Sí, siempre que el piloto automático esté acoplado durante todo el arco y hasta el FAF."
        ],
        "correcta": 1,
        "explicacion": "En RNP APCH la capacidad RF es opcional, así que la elegibilidad de la especificación no la incluye. Hay que verla listada aparte. En RNP AR, en cambio, es obligatoria en cualquier autorización.",
        "referencia": "FAA AIM 1-2-1, apartado RNP APCH"
      }
    ]
  },
  {
    "tema": "P24",
    "n": 24,
    "titulo": "Fly-by y fly-over",
    "preguntas": [
      {
        "id": "p24-q1",
        "enunciado": "¿Qué diferencia hay entre un waypoint fly-by y uno fly-over?",
        "opciones": [
          "En el fly-by el giro empieza antes del punto; en el fly-over se sobrevuela el punto antes de girar.",
          "El fly-by se sobrevuela antes de girar y el fly-over se anticipa según la velocidad del avión.",
          "El fly-over solo existe en procedimientos convencionales, y en los procedimientos PBN todos los puntos son fly-by.",
          "El fly-by exige el piloto automático acoplado y el fly-over se puede volar a mano con el director de vuelo."
        ],
        "correcta": 0,
        "explicacion": "Es la definición: el fly-by se usa cuando el avión debe empezar el giro hacia la derrota siguiente antes de llegar al punto que separa los tramos, lo que se llama anticipación del giro; el fly-over, cuando debe volar sobre el punto antes de iniciar el giro.",
        "referencia": "FAA AIM 1-2-2, apartados de waypoints"
      },
      {
        "id": "p24-q2",
        "enunciado": "El sistema de navegación no proporciona guía de anticipación de giro para un punto fly-by. ¿Qué corresponde?",
        "opciones": [
          "Tratar el punto como fly-over y girar al sobrevolarlo.",
          "Solicitar vectores al ATC para ese tramo.",
          "Ejecutar la anticipación del giro manualmente.",
          "Insertar un directo al punto siguiente en el FMS."
        ],
        "correcta": 2,
        "explicacion": "El AIM lo dice expresamente: donde el sistema de navegación no proporciona esa guía, el piloto debe ejecutar la anticipación del giro o el sobrevuelo del punto manualmente. La simbología de la carta existe justamente para dar esa conciencia.",
        "referencia": "FAA AIM 5-4-5, apartado de waypoints"
      },
      {
        "id": "p24-q3",
        "enunciado": "¿De qué depende la anticipación del giro en un punto fly-by?",
        "opciones": [
          "Solo del ángulo entre las dos derrotas.",
          "Del valor RNP del segmento que viene a continuación.",
          "Del tipo de piloto automático instalado en la flota.",
          "De la velocidad y la altitud, entre otros factores."
        ],
        "correcta": 3,
        "explicacion": "La circular enumera entre los conocimientos requeridos la anticipación del giro considerando los efectos de velocidad y altitud. El ángulo entre derrotas también influye, pero no es lo único, y por eso la anticipación no es un valor fijo del procedimiento.",
        "referencia": "FAA AC 90-105A, numeral 8.4.3, apartado 11"
      }
    ]
  },
  {
    "tema": "P25",
    "n": 25,
    "titulo": "Los terminadores de tramo",
    "preguntas": [
      {
        "id": "p25-q1",
        "enunciado": "¿Qué define un terminador de tramo TF?",
        "opciones": [
          "Un rumbo determinado hasta un punto.",
          "Una derrota recta entre dos puntos definidos.",
          "Un arco de radio constante alrededor de un centro.",
          "Un directo desde la posición actual a un punto."
        ],
        "correcta": 1,
        "explicacion": "*Track to Fix* define una derrota recta entre dos puntos. CF es un rumbo o curso hasta un punto, DF un directo desde la posición actual, y RF el arco de radio constante.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.3.8, apartado 10; especificación ARINC 424"
      },
      {
        "id": "p25-q2",
        "enunciado": "¿Por qué le interesa a un piloto saber que existen los terminadores de tramo?",
        "opciones": [
          "Para poder codificar o corregir procedimientos en el FMS durante el vuelo.",
          "Porque el ATC los nombra en las autorizaciones de salida y de llegada.",
          "Porque determinan el valor RNP que el sistema aplica a cada segmento del procedimiento publicado.",
          "Porque la trayectoria depende de cómo está codificado el tramo."
        ],
        "correcta": 3,
        "explicacion": "La circular incluye entre los conocimientos requeridos la representación de los terminadores de tramo y las trayectorias asociadas. No se trata de codificar nada: se trata de tener una explicación cuando la trayectoria no es la esperada.",
        "referencia": "FAA AC 90-105A, numeral 8.4.3, apartado 15"
      },
      {
        "id": "p25-q3",
        "enunciado": "¿Qué dice la norma sobre la sustitución de terminadores de tramo por parte del proveedor de la base de datos?",
        "opciones": [
          "Que no debe cambiarlos por otros que no estén en el AIP.",
          "Que puede sustituirlos si con eso mejora la codificación del procedimiento.",
          "Que debe sustituirlos siempre por TF, que es el más simple de volar.",
          "Que la sustitución la autoriza el operador en su programa de gestión de la base de datos."
        ],
        "correcta": 0,
        "explicacion": "El proveedor no debe sustituir terminadores en lugar de los especificados en los datos originales del AIP del Estado. Es la garantía de que el procedimiento codificado corresponde al publicado, y por eso una discrepancia hay que tomarla en serio.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.4.2"
      }
    ]
  },
  {
    "tema": "P26",
    "n": 26,
    "titulo": "La desviación lateral",
    "preguntas": [
      {
        "id": "p26-q1",
        "enunciado": "¿Para qué exige la norma tener presentada la desviación lateral en una RNP APCH?",
        "opciones": [
          "Para calcular el tiempo al punto siguiente.",
          "Para determinar el valor RNP del segmento.",
          "Para verificar el ajuste altimétrico.",
          "Para vigilar el error técnico de vuelo."
        ],
        "correcta": 3,
        "explicacion": "La circular pide seleccionar las presentaciones que permitan vigilar la derrota calculada y la posición del avión respecto de la trayectoria, la desviación lateral, para vigilar el error técnico de vuelo. Es la vigilancia que hace el piloto, no el sistema.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.7.2.2"
      },
      {
        "id": "p26-q2",
        "enunciado": "Estás perfectamente centrado en la presentación de desviación lateral. ¿Qué garantiza eso?",
        "opciones": [
          "Que el avión está sobre la trayectoria publicada, en el mundo real, sin ningún error de posición.",
          "Que el error total del sistema es cero en ese momento del procedimiento.",
          "Que está sobre la trayectoria según la posición estimada.",
          "Que la performance requerida por la especificación se está cumpliendo con margen."
        ],
        "correcta": 2,
        "explicacion": "La indicación se construye sobre la posición estimada. Si esa estimación tiene error, el avión puede estar centrado en pantalla y desplazado respecto de la posición verdadera: es la diferencia entre error técnico de vuelo y error del sistema de navegación.",
        "referencia": "FAA AC 90-105A, numerales 4.3.1 a 4.3.4"
      },
      {
        "id": "p26-q3",
        "enunciado": "¿Qué ocurre con la sensibilidad de la presentación de desviación lateral?",
        "opciones": [
          "Es fija para todas las fases del vuelo.",
          "Cambia con la fase, y hay que saber qué escala está activa.",
          "La fija el ATC según la densidad de tráfico del sector.",
          "Solo cambia en los procedimientos RNP AR."
        ],
        "correcta": 1,
        "explicacion": "La circular incluye entre los conocimientos requeridos comprender las condiciones operacionales de las operaciones RNP, con la selección apropiada del escalado del indicador de desviación de curso. Una misma desviación en millas se ve distinta según la escala activa.",
        "referencia": "FAA AC 90-105A, numeral 8.4.3, apartado 13"
      }
    ]
  },
  {
    "tema": "P27",
    "n": 27,
    "titulo": "PDE, NSE y TSE",
    "preguntas": [
      {
        "id": "p27-q1",
        "enunciado": "¿Qué es el error total del sistema (TSE)?",
        "opciones": [
          "El mayor de los tres errores componentes, que es el que limita la precisión.",
          "La diferencia entre la posición estimada por el sistema y la posición deseada.",
          "La diferencia entre la posición verdadera y la deseada: la suma vectorial de FTE, PDE y NSE.",
          "El error de pilotaje más el error de la base de datos."
        ],
        "correcta": 2,
        "explicacion": "Es la definición literal: diferencia entre la posición verdadera y la deseada, igual a la suma vectorial de los tres componentes. No es el mayor de ellos ni una suma de dos.",
        "referencia": "FAA AC 90-105A, numeral 4.3.4"
      },
      {
        "id": "p27-q2",
        "enunciado": "¿Qué vigila la función de control y alerta a bordo?",
        "opciones": [
          "El error técnico de vuelo, con avisos cuando el avión se sale del eje.",
          "El del sistema de navegación; el de pilotaje, la tripulación.",
          "Los tres componentes del error total, cada uno con su propio umbral de alerta.",
          "El error de definición de la trayectoria, comparando la base de datos con el AIP del Estado."
        ],
        "correcta": 1,
        "explicacion": "La circular lo aclara expresamente: cumplir el requisito de control y alerta no implica un control automático del error técnico de vuelo. La función debe consistir al menos en un algoritmo de control y alerta del NSE y en una presentación de desviación lateral que permita a la tripulación vigilar el FTE.",
        "referencia": "FAA AC 90-105A, nota al numeral 4.2"
      },
      {
        "id": "p27-q3",
        "enunciado": "¿Por qué se considera despreciable el error de definición de la trayectoria (PDE)?",
        "opciones": [
          "Por la integridad de la base de datos y los procedimientos de tripulación.",
          "Porque es imposible de medir con los sensores de a bordo.",
          "Porque el FMS lo compensa automáticamente durante el vuelo.",
          "Porque solo aparece en procedimientos convencionales."
        ],
        "correcta": 0,
        "explicacion": "Se asume cero por el proceso de integridad de la base de datos y los procedimientos de tripulación. Es un supuesto que se sostiene sobre dos cosas concretas, y si alguna se relaja, deja de valer.",
        "referencia": "FAA AC 90-105A, nota al numeral 4.2"
      }
    ]
  },
  {
    "tema": "P28",
    "n": 28,
    "titulo": "La frustrada en PBN",
    "preguntas": [
      {
        "id": "p28-q1",
        "enunciado": "En RNP APCH, ¿en qué puede basarse el segmento de frustrada?",
        "opciones": [
          "Solo en GNSS, igual que el resto del procedimiento.",
          "En sistemas DME/DME, que son el respaldo del GPS.",
          "En un VOR, un DME o un NDB.",
          "Solo en aumentación satelital, para mantener la precisión de la final."
        ],
        "correcta": 2,
        "explicacion": "La circular dice que el GPS es el sistema primario para RNP APCH, que los sistemas basados en DME/DME no son aceptables, y que el segmento de frustrada puede basarse en una radioayuda convencional como VOR, DME o NDB. De ahí la necesidad de tenerla sintonizada y verificada.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.5.1"
      },
      {
        "id": "p28-q2",
        "enunciado": "¿Qué valor RNP aplica al segmento de frustrada en RNP APCH?",
        "opciones": [
          "1",
          "0.3",
          "0.5",
          "2"
        ],
        "correcta": 0,
        "explicacion": "El valor se estrecha a 0.3 en la final y **vuelve a 1** en la frustrada. Es la mejor prueba de que el valor pertenece al segmento y no al procedimiento.",
        "referencia": "FAA AC 90-105A, numeral 5.1 y Tabla 5-1"
      },
      {
        "id": "p28-q3",
        "enunciado": "Una RNP AR exige una frustrada con valor menor de 1.00 NM. ¿Qué implica?",
        "opciones": [
          "Nada especial: cualquier avión elegible para RNP AR puede volarla.",
          "Que la frustrada se vuela con vectores del ATC en vez de la trayectoria.",
          "Que el valor RNP de la final también debe ser menor de 1.00 NM, y del mismo número que la frustrada.",
          "Que suele exigir equipo redundante y autorización."
        ],
        "correcta": 3,
        "explicacion": "En ciertos lugares el entorno obliga a un valor menor de 1.00 en la frustrada, la operación típicamente requiere equipo redundante y la autorización emitida al operador especifica si puede volar una frustrada con ese requisito.",
        "referencia": "FAA AIM 5-4-18, apartado de frustradas con valor menor de 1.00 NM; FAA AC 90-101A, Apéndice, numeral 2, apartado c"
      }
    ]
  },
  {
    "tema": "P29",
    "n": 29,
    "titulo": "El FMS en PBN",
    "preguntas": [
      {
        "id": "p29-q1",
        "enunciado": "¿Qué es un FMS según la definición de la circular de la FAA?",
        "opciones": [
          "Un receptor GNSS con pantalla propia, que calcula la posición y la dibuja sobre el mapa de la ruta programada.",
          "La base de datos de navegación del avión, con los procedimientos y los waypoints del ciclo vigente.",
          "El computador que calcula la posición GNSS y la envía al piloto automático.",
          "Un sistema integrado de sensores, receptor y computador, con bases de datos, que da guía de navegación y performance."
        ],
        "correcta": 3,
        "explicacion": "Es la definición literal, y lo relevante es la palabra integrado: el FMS junta sensores, datos y guía, así que una degradación en cualquiera de esas entradas se traslada a la guía que entrega.",
        "referencia": "FAA AC 90-101A, numeral 3, apartado c"
      },
      {
        "id": "p29-q2",
        "enunciado": "¿Qué añade el FMS en una operación con especificación RNP que no necesita en una RNAV?",
        "opciones": [
          "El control y la alerta de la performance.",
          "El cálculo de la posición a partir de los sensores.",
          "La guía lateral hacia el piloto automático.",
          "La base de datos de navegación con los procedimientos PBN del ciclo."
        ],
        "correcta": 0,
        "explicacion": "El cálculo de posición, la guía lateral y la base de datos hacen falta en las dos familias. Lo que caracteriza RNP es el control de la performance conseguida y la identificación para el piloto de si el requisito operacional se está cumpliendo.",
        "referencia": "RAC 91, definición de especificación RNP; FAA AC 90-105A, numeral 4.2"
      },
      {
        "id": "p29-q3",
        "enunciado": "«El FMS reemplaza la carta.» ¿Por qué es falso?",
        "opciones": [
          "Porque la carta tiene información que el FMS no puede mostrar en la pantalla.",
          "Porque el FMS no incluye las restricciones de altitud.",
          "Porque el FMS ejecuta lo programado y la carta es la referencia para verificarlo.",
          "Porque la carta es obligatoria por norma y el FMS no."
        ],
        "correcta": 2,
        "explicacion": "El FMS es una herramienta de gestión que hace lo que se le programó con los datos que tiene. La carta es la referencia de verificación, y el AIM pide expresamente usar las capacidades de la aviónica para verificar los datos de puntos y derrotas después de cargar el procedimiento.",
        "referencia": "FAA AC 90-105A, numeral 8.4.4; FAA AIM 1-2-1"
      }
    ]
  },
  {
    "tema": "P30",
    "n": 30,
    "titulo": "RNP frente a ANP y EPU",
    "preguntas": [
      {
        "id": "p30-q1",
        "enunciado": "¿Qué expresa el EPU?",
        "opciones": [
          "La performance de estimación de posición actual, como indicación estadística en NM.",
          "El error real de posición del avión, medido contra la posición verdadera.",
          "El valor RNP que exige el procedimiento en el segmento que se está volando.",
          "La desviación lateral respecto de la trayectoria calculada."
        ],
        "correcta": 0,
        "explicacion": "La definición es explícita: una medida sobre una escala definida, en millas náuticas, que expresa la performance de estimación de posición actual, y **no** es una estimación del error real sino una indicación estadística definida.",
        "referencia": "FAA AC 90-105A, Apéndice J, definición de EPU; FAA AC 90-101A, numeral 3, apartado b"
      },
      {
        "id": "p30-q2",
        "enunciado": "¿Es obligatorio que el PFD muestre un valor de ANP o EPE?",
        "opciones": [
          "Sí, en todas las operaciones RNP, junto con el valor de la especificación.",
          "Sí, en las operaciones RNP AR, donde el margen lateral es menor.",
          "No, salvo que el operador lo solicite al fabricante como opción de la aviónica instalada.",
          "No: lo obligatorio es la alerta si no se cumple la RNP."
        ],
        "correcta": 3,
        "explicacion": "La circular dice que no es necesario que las presentaciones de navegación, en particular los PFD, incluyan un valor de ANP o EPE: solo necesitan proporcionar una alerta si la RNP de la operación no puede cumplirse. El requisito es el aviso, no el número.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.3.8, apartado 6"
      },
      {
        "id": "p30-q3",
        "enunciado": "Tu FMS muestra «RNP 1.0» y «ANP 0.08». ¿Qué está diciendo?",
        "opciones": [
          "Que el avión está a 0,08 NM de su posición verdadera en este momento.",
          "Que se requiere 1.0 y la incertidumbre estimada es 0.08.",
          "Que la desviación lateral respecto del eje es de 0,08 NM hacia un lado.",
          "Que el valor RNP del segmento se puede reducir a 0.08 si el ATC lo autoriza para la aproximación."
        ],
        "correcta": 1,
        "explicacion": "Es la comparación entre requerido y estimado. El valor estimado no es el error real, y no habilita a volar a un valor menor: el valor aplicable lo fija el procedimiento y, en RNP AR, la autorización del operador.",
        "referencia": "FAA AC 90-105A, Apéndice J, definición de EPU"
      }
    ]
  },
  {
    "tema": "P31",
    "n": 31,
    "titulo": "Cuando la performance estimada ya no alcanza",
    "preguntas": [
      {
        "id": "p31-q1",
        "enunciado": "Recibes una alerta de performance de navegación durante una aproximación PBN. ¿Cuál es el orden correcto?",
        "opciones": [
          "Informar al ATC de inmediato, identificar la falla, consultar el QRH y después volar el avión.",
          "Volar el avión, reconocer la alerta, contrastar la posición, aplicar QRH y SOP, ver si aún se cumple lo exigido e informar al ATC.",
          "Frustrar de inmediato, subir a la altitud de seguridad, estabilizar el avión y comunicar la alerta al ATC una vez en tierra.",
          "Reducir el valor RNP en el FMS hasta que la alerta se apague, confirmarlo con el otro piloto y continuar la aproximación."
        ],
        "correcta": 1,
        "explicacion": "Aviar, navegar, comunicar, con la pregunta decisiva en el penúltimo lugar: si la especificación exigida todavía se puede cumplir. Reducir el valor RNP en el FMS no es una opción: el valor lo fija el procedimiento.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.7.1.8 y numeral 8.4.3, apartado 23"
      },
      {
        "id": "p31-q2",
        "enunciado": "¿Dónde se busca el significado exacto del mensaje que muestra el avión y la acción asociada?",
        "opciones": [
          "En el FCOM y el QRH de la flota.",
          "En la circular de la autoridad que regula la especificación.",
          "En la carta del procedimiento que se vuela.",
          "En el AIP del Estado."
        ],
        "correcta": 0,
        "explicacion": "La presentación depende del fabricante y del modelo, y la propia circular anima a usar el entrenamiento y los procedimientos operacionales recomendados por el fabricante. La norma da el marco; el mensaje concreto está en la documentación del avión.",
        "referencia": "FAA AC 90-105A, nota al numeral 8.4.3; práctica estándar de documentación de fabricante"
      },
      {
        "id": "p31-q3",
        "enunciado": "¿Qué es lo que distingue a una tripulación preparada en este escenario?",
        "opciones": [
          "Reconocer el mensaje más rápido que el otro piloto.",
          "Aplicar el QRH de memoria, sin necesidad de leerlo.",
          "Saber si el segmento aún se puede cumplir.",
          "Informar al ATC antes de actuar, para tener su autorización en cada paso del procedimiento."
        ],
        "correcta": 2,
        "explicacion": "La pérdida de capacidad se define como cualquier falla o suceso que haga que la aeronave deje de satisfacer los requisitos del procedimiento, así que la pregunta solo se puede contestar si se sabe qué requisitos son. Eso se prepara en el briefing.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.7.1.8"
      }
    ]
  },
  {
    "tema": "P32",
    "n": 32,
    "titulo": "La base de datos de navegación",
    "preguntas": [
      {
        "id": "p32-q1",
        "enunciado": "Se publica una carta enmendada y la enmienda no está en la base de datos. ¿Qué corresponde?",
        "opciones": [
          "Volar el procedimiento de la base, que es lo que el avión puede seguir.",
          "Introducir la enmienda a mano en el FMS antes de salir.",
          "Volar el procedimiento y reportar la diferencia al aterrizar.",
          "No usar la base de datos para conducir esa operación."
        ],
        "correcta": 3,
        "explicacion": "La norma es explícita: si se publica una carta enmendada cuya enmienda no está en la base de datos, la base no debe usarse para conducir la operación. Introducir la enmienda a mano no es una solución aceptable.",
        "referencia": "FAA AC 90-105A, nota al numeral 10.4"
      },
      {
        "id": "p32-q2",
        "enunciado": "¿Qué debe confirmar el piloto de un operador de transporte en la inicialización del sistema?",
        "opciones": [
          "Que el procedimiento de destino está cargado.",
          "Que el valor RNP de la salida está fijado.",
          "Que la base de datos de navegación es actual.",
          "Que todos los sensores de navegación están operativos."
        ],
        "correcta": 2,
        "explicacion": "El programa de base de datos del operador exige que los pilotos confirmen, en la inicialización del sistema, que la base es actual. Las otras verificaciones existen, pero esta es la que la norma sitúa en la inicialización.",
        "referencia": "FAA AC 90-105A, numeral 10.7, apartado 4"
      },
      {
        "id": "p32-q3",
        "enunciado": "Encuentras un error en la codificación de un procedimiento. ¿Qué exige la norma?",
        "opciones": [
          "Corregirlo en el FMS, avisar al otro piloto y continuar con el procedimiento.",
          "Reportarlo al proveedor y prohibir el procedimiento con un aviso a las tripulaciones hasta que se restablezca.",
          "Reportarlo al ATC para que lo retire de las autorizaciones de ese día.",
          "Anotarlo en el libro de mantenimiento al final del vuelo."
        ],
        "correcta": 1,
        "explicacion": "Las discrepancias que invalidan un procedimiento deben reportarse al proveedor y el uso de los procedimientos afectados debe prohibirse mediante un aviso del operador a su tripulación, y solo se restablecen cuando el operador lo resuelve. No es un asunto de cabina.",
        "referencia": "FAA AC 90-105A, numeral 10.7, apartado 5"
      }
    ]
  },
  {
    "tema": "P33",
    "n": 33,
    "titulo": "El ciclo AIRAC",
    "preguntas": [
      {
        "id": "p33-q1",
        "enunciado": "El ciclo AIRAC va a cambiar durante el vuelo. ¿Qué exige la norma?",
        "opciones": [
          "Cancelar el vuelo, porque la base deja de ser vigente antes del aterrizaje.",
          "Cargar las dos bases en el FMS y elegir la vigente al cambiar el ciclo.",
          "Nada: la base activa al despegar sigue valiendo hasta el aterrizaje, sin importar el ciclo.",
          "Que operador y pilotos tengan procedimientos para asegurar la exactitud de los datos el resto del vuelo."
        ],
        "correcta": 3,
        "explicacion": "Se espera que los datos sean actuales durante todo el vuelo, y si el ciclo cambia en vuelo hay que establecer procedimientos para asegurar la exactitud. La norma menciona como medio aceptable comparar las cartas nueva y antigua para verificar los puntos antes de salir.",
        "referencia": "FAA AC 90-105A, nota al numeral 10.4"
      },
      {
        "id": "p33-q2",
        "enunciado": "La base de datos no está dentro del ciclo esperado. ¿Cuál es la respuesta profesional?",
        "opciones": [
          "«No go», siempre: una base fuera de ciclo no se vuela en ningún caso.",
          "Volar igual y verificar cada punto de la ruta y de los procedimientos contra la carta vigente del nuevo ciclo.",
          "Consultar MEL, SOP, autorización y norma antes de decidir.",
          "Cargar a mano los procedimientos que hayan cambiado con el nuevo ciclo, a partir de las cartas."
        ],
        "correcta": 2,
        "explicacion": "La norma no da una respuesta universal: monta un proceso que depende del tipo de operador y de su programa de datos. Lo que se evalúa en la pregunta es si el piloto analiza o recita, y la respuesta correcta empieza por consultar.",
        "referencia": "FAA AC 90-105A, numerales 10.4, 10.6 y 10.7"
      },
      {
        "id": "p33-q3",
        "enunciado": "¿Qué tres datos de la base verifica la tripulación?",
        "opciones": [
          "El proveedor, el número de serie y la fecha de carga.",
          "Cuál está activa, desde cuándo es válida y hasta cuándo.",
          "El número de procedimientos, los aeropuertos incluidos y la versión del software.",
          "El ciclo, el operador y el responsable del proceso de actualización."
        ],
        "correcta": 1,
        "explicacion": "Lo que el piloto confirma es la vigencia: qué base está activa y su periodo de validez, porque de ahí sale si hace falta un procedimiento adicional por cambio de ciclo en vuelo. El resto es responsabilidad del programa del operador.",
        "referencia": "FAA AC 90-105A, numerales 10.4 y 10.7, apartado 4"
      }
    ]
  },
  {
    "tema": "P34",
    "n": 34,
    "titulo": "Validar: autorización, carta y FMS",
    "preguntas": [
      {
        "id": "p34-q1",
        "enunciado": "¿Qué pide el AIM después de cargar un procedimiento desde la base de datos?",
        "opciones": [
          "Usar las capacidades de la aviónica para verificar los datos de puntos y de derrota.",
          "Ejecutarlo de inmediato para que el sistema lo secuencie.",
          "Compararlo con el plan operacional de vuelo que entregó el despacho.",
          "Confirmar el ciclo AIRAC de la base de datos activa."
        ],
        "correcta": 0,
        "explicacion": "El AIM lo pide expresamente: usar las capacidades de la aviónica para verificar los datos apropiados de puntos y derrota después de cargar el procedimiento desde la base de datos. Cargar y verificar son dos pasos distintos.",
        "referencia": "FAA AIM 1-2-1, apartado general de RNP"
      },
      {
        "id": "p34-q2",
        "enunciado": "¿Qué significa que el FMS muestre una ruta completa y sin discontinuidades?",
        "opciones": [
          "Que la ruta está autorizada por el ATC.",
          "Que la ruta es exactamente la publicada en la carta del procedimiento.",
          "Que pudo construirla con sus datos.",
          "Que el avión es elegible para volar todos sus tramos."
        ],
        "correcta": 2,
        "explicacion": "El FMS no valida: construye con lo que tiene. Que esté autorizada lo dice el ATC, que sea la publicada lo dice la carta y que el avión pueda volarla lo dice su documentación.",
        "referencia": "FAA AIM 1-2-1; FAA AC 90-105A, numeral 8.4.4"
      },
      {
        "id": "p34-q3",
        "enunciado": "¿Cuál es el elemento de la validación que más se escapa?",
        "opciones": [
          "El nombre del procedimiento.",
          "La transición.",
          "La DA o MDA.",
          "La frecuencia de la torre."
        ],
        "correcta": 1,
        "explicacion": "El nombre correcto con la transición equivocada produce una trayectoria distinta, y el nombre se lee de un vistazo mientras la transición exige mirar el detalle. Por eso aparece como escenario propio en el capítulo 48.",
        "referencia": "FAA AC 90-105A, numeral 8.4.4; FAA AIM 1-2-1"
      }
    ]
  },
  {
    "tema": "P35",
    "n": 35,
    "titulo": "Los sensores de navegación",
    "preguntas": [
      {
        "id": "p35-q1",
        "enunciado": "En RNP APCH, ¿se aceptan sistemas basados en DME/DME como fuente de posición?",
        "opciones": [
          "Sí, siempre que haya dos instalaciones DME en cobertura durante toda la aproximación final.",
          "Sí, pero solo para el segmento final, donde el valor RNP baja a 0.3 NM.",
          "Sí, si se combinan con el sistema inercial para cubrir los huecos de cobertura en la final.",
          "No: el GPS es el sistema primario y los sistemas basados en DME/DME no son aceptables."
        ],
        "correcta": 3,
        "explicacion": "La circular es explícita: el GPS es el sistema de navegación primario para RNP APCH y los sistemas basados en DME/DME no son aceptables. Lo que sí puede apoyarse en radioayuda convencional es el segmento de frustrada.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.5.1"
      },
      {
        "id": "p35-q2",
        "enunciado": "¿Qué papel cumple el inercial en una solución DME/DME/IRU?",
        "opciones": [
          "Sustituir al DME durante todo el vuelo.",
          "Corregir el error del GNSS cuando hay interferencia.",
          "Dar posición suficiente durante huecos limitados de cobertura DME.",
          "Generar la guía vertical para las aproximaciones con Baro-VNAV."
        ],
        "correcta": 2,
        "explicacion": "La definición habla de huecos limitados de cobertura DME. El inercial cubre un tramo sin instalaciones, no reemplaza la infraestructura, y esa limitación es lo que hay que tener presente al perder DME.",
        "referencia": "FAA AC 90-105A, Apéndice J, definición de DME/DME/IRU"
      },
      {
        "id": "p35-q3",
        "enunciado": "«Si pierdo GNSS pierdo automáticamente toda capacidad RNAV.» ¿Por qué es incorrecto?",
        "opciones": [
          "Porque las fuentes admitidas dependen de la especificación, y algunas aceptan DME/DME, VOR/DME o inercial.",
          "Porque el GNSS nunca se pierde por completo, siempre queda al menos un satélite a la vista.",
          "Porque el inercial sustituye al GNSS de forma indefinida en todas las especificaciones RNAV.",
          "Porque el ATC puede autorizar la continuación con vigilancia radar."
        ],
        "correcta": 0,
        "explicacion": "Los códigos del plan de vuelo muestran que RNAV 5 y RNAV 1 o 2 admiten fuentes distintas del GNSS. En RNP APCH la conclusión es la contraria, porque el GPS es primario. La respuesta profesional empieza por preguntar qué especificación se está volando.",
        "referencia": "OACI PANS-ATM, Apéndice 2, códigos `PBN/`; FAA AC 90-105A, Apéndice A, numeral A.5.1"
      }
    ]
  },
  {
    "tema": "P36",
    "n": 36,
    "titulo": "GNSS en PBN",
    "preguntas": [
      {
        "id": "p36-q1",
        "enunciado": "¿Qué entra bajo el nombre GNSS?",
        "opciones": [
          "Solo el GPS; los demás no están aprobados para uso civil.",
          "GPS, SBAS, GBAS, GLONASS, Galileo y otros sistemas por satélite aprobados para uso civil.",
          "El GPS y los sistemas inerciales que integran su posición en el FMS.",
          "El GPS y el DME/DME, que son las dos fuentes de posición de las especificaciones RNP."
        ],
        "correcta": 1,
        "explicacion": "La circular enumera GPS, SBAS como WAAS, GBAS como LAAS, GLONASS, Galileo y cualquier otro sistema de navegación por satélite aprobado para uso civil, y añade que el GNSS puede aumentarse según sea necesario para apoyar la RNP de la fase de operación.",
        "referencia": "FAA AC 90-101A, numeral 3, apartado e"
      },
      {
        "id": "p36-q2",
        "enunciado": "¿Qué hay que confirmar sobre la infraestructura antes de una operación RNP?",
        "opciones": [
          "Su disponibilidad para el periodo de la operación.",
          "Que el GNSS está operativo y con señal adquirida en el momento del despegue.",
          "Que hay al menos cuatro satélites visibles sobre el horizonte en el aeródromo de salida.",
          "Que el ATC tiene cobertura radar en toda la ruta, incluidas las llegadas y las aproximaciones al destino y al alterno."
        ],
        "correcta": 0,
        "explicacion": "La circular pide confirmar la disponibilidad para el periodo de las operaciones previstas usando toda la información disponible, y menciona expresamente las contingencias no RNP. El plan B también necesita infraestructura.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.7.1.7"
      },
      {
        "id": "p36-q3",
        "enunciado": "¿Por qué una degradación de GNSS puede producir una indicación errónea de combustible insuficiente?",
        "opciones": [
          "Porque el GNSS mide el consumo real de combustible y lo envía al FMS para las predicciones.",
          "Porque el FMS desconecta el cálculo de combustible al perder la señal GNSS y muestra el mínimo.",
          "No puede: combustible y navegación son sistemas independientes.",
          "Porque hay funciones del FMS que dependen de la posición, y una posición errónea da predicciones erróneas."
        ],
        "correcta": 3,
        "explicacion": "La FAA lista entre los efectos posibles los efectos del FMS dependientes de la posición, con la indicación errónea de combustible insuficiente como ejemplo. De ahí la exigencia de evaluar qué sistemas de a bordo requieren entradas de GPS.",
        "referencia": "FAA AIM 1-2-4, lista de efectos de interferencia y suplantación de GPS"
      }
    ]
  },
  {
    "tema": "P37",
    "n": 37,
    "titulo": "RAIM y la predicción de disponibilidad",
    "preguntas": [
      {
        "id": "p37-q1",
        "enunciado": "¿Qué es RAIM?",
        "opciones": [
          "Un algoritmo que verifica la integridad de la posición con mediciones GPS, o GPS más ayuda barométrica.",
          "Un sistema de aumentación satelital que mejora la precisión de la posición GPS en la aproximación.",
          "La precisión del receptor GPS expresada en millas náuticas.",
          "El control de la performance a bordo que exigen las especificaciones RNP."
        ],
        "correcta": 0,
        "explicacion": "Es la definición literal, y lo importante es que es integridad: comprobar si la posición es confiable, no mejorar su precisión. La aumentación satelital es otra cosa y el control de la performance a bordo es un requisito de especificación, más amplio.",
        "referencia": "FAA AC 90-101A, numeral 3, apartado h"
      },
      {
        "id": "p37-q2",
        "enunciado": "¿Es obligatoria la predicción RAIM en toda operación RNP?",
        "opciones": [
          "Sí, en todas las operaciones RNP, sin excepción.",
          "Sí, en todas las que usen GNSS como fuente de posición, en cualquier fase del vuelo y con cualquier equipo.",
          "No: nunca se exige en los aviones de transporte con más de un receptor.",
          "No: se obtiene cuando corresponda."
        ],
        "correcta": 3,
        "explicacion": "La circular lo formula como exigencia condicional: obtener una predicción RAIM para la operación RNP prevista si corresponde. Presentarla como requisito universal es incorrecto, y negar que exista también.",
        "referencia": "FAA AC 90-105A, numeral 8.4.4, apartado 2; FAA AIM 5-1-16"
      },
      {
        "id": "p37-q3",
        "enunciado": "¿Qué añade FDE sobre RAIM?",
        "opciones": [
          "Mejora la precisión de la posición combinando más satélites que el RAIM.",
          "Puede excluir automáticamente un satélite defectuoso si hay mediciones redundantes suficientes.",
          "Proporciona guía vertical a partir de la geometría de los satélites.",
          "Sustituye la aumentación satelital en las aproximaciones LPV."
        ],
        "correcta": 1,
        "explicacion": "FDE es un algoritmo RAIM que además excluye el satélite defectuoso, siempre que haya suficientes mediciones satelitales redundantes disponibles. No mejora la precisión: protege la integridad de la solución.",
        "referencia": "FAA AC 90-105A, Apéndice J, definición de FDE"
      }
    ]
  },
  {
    "tema": "P38",
    "n": 38,
    "titulo": "GNSS degradado: interrupción, interferencia y suplantación",
    "preguntas": [
      {
        "id": "p38-q1",
        "enunciado": "¿Cuál es la primera acción recomendada al sospechar una perturbación del GPS en vuelo?",
        "opciones": [
          "Declarar emergencia y pedir vectores al aeródromo más cercano.",
          "Verificar la posición del avión con radioayudas convencionales, cuando estén disponibles.",
          "Desconectar el piloto automático y volar a mano con los instrumentos básicos.",
          "Solicitar al ATC la posición radar y seguir la trayectoria del FMS."
        ],
        "correcta": 1,
        "explicacion": "La recomendación es estar atento a las indicaciones según la guía del fabricante y verificar la posición con radioayudas convencionales cuando estén disponibles. El contraste es lo primero, porque de él sale todo lo demás, incluida la decisión de qué informar.",
        "referencia": "FAA AIM 1-2-4, recomendaciones durante el vuelo"
      },
      {
        "id": "p38-q2",
        "enunciado": "¿Por qué el piloto puede no advertir una suplantación de señal?",
        "opciones": [
          "Porque el sistema desconecta las alertas de navegación mientras dura la interferencia.",
          "Porque el corrimiento de posición que produce es siempre pequeño, menor que el valor RNP.",
          "Porque el RAIM es solo parcialmente efectivo frente a ella.",
          "Porque el ATC no informa de las zonas de suplantación a las tripulaciones, aunque las conozca y estén publicadas."
        ],
        "correcta": 2,
        "explicacion": "La FAA advierte que el RAIM es solo parcialmente efectivo frente a una disrupción que actúa como suplantación, que el piloto puede no advertir ninguna indicación errónea y que el ATC puede ser el único medio disponible para identificarla.",
        "referencia": "FAA AIM 1-1-19, apartado sobre disrupciones de GPS"
      },
      {
        "id": "p38-q3",
        "enunciado": "¿Qué recomendación de planificación previa al vuelo se relaciona con el combustible?",
        "opciones": [
          "Planificar contingencias de combustible.",
          "Ninguna: una degradación del GNSS no afecta al combustible necesario para el vuelo.",
          "Cargar el combustible mínimo para reducir peso y ganar margen de performance en ruta.",
          "Solicitar al ATC ruta directa desde el despegue para compensar las millas que añada una posible reversión a radioayudas."
        ],
        "correcta": 0,
        "explicacion": "Entre las recomendaciones previas a la salida está planificar contingencias de combustible, junto con conocer las zonas de riesgo, revisar los NOTAM y planificar el uso de radioayudas y procedimientos convencionales en el destino.",
        "referencia": "FAA AIM 1-2-4, recomendaciones previas a la salida"
      }
    ]
  },
  {
    "tema": "P39",
    "n": 39,
    "titulo": "La SID PBN",
    "preguntas": [
      {
        "id": "p39-q1",
        "enunciado": "En el marco de la FAA, ¿qué exige una autorización «climb via SID»?",
        "opciones": [
          "Solo seguir la trayectoria lateral publicada, sin las restricciones verticales.",
          "Mantener la altitud asignada e ignorar las restricciones publicadas hasta nueva autorización.",
          "Cumplir la trayectoria lateral y las restricciones de velocidad y altitud a lo largo de la ruta autorizada.",
          "Ascender directo a la altitud de crucero, sin restricciones."
        ],
        "correcta": 2,
        "explicacion": "Es una autorización abreviada que exige cumplir la trayectoria lateral y las restricciones de velocidad y altitud. Y es fraseología de la FAA: en otro Estado hay que usar lo que publique su AIP.",
        "referencia": "FAA AIM 5-2-9, apartado de autorización «climb via»"
      },
      {
        "id": "p39-q2",
        "enunciado": "¿Qué se verifica en una SID PBN que no se verificaría en una SID convencional?",
        "opciones": [
          "La frecuencia de la torre y la del control de salida.",
          "El gradiente de ascenso publicado y la altitud de aceleración.",
          "La longitud de pista disponible y la masa máxima de despegue que permite el gradiente de esa salida.",
          "La especificación y las funciones que exija."
        ],
        "correcta": 3,
        "explicacion": "Lo que añade el procedimiento PBN es el requisito de performance y las funciones necesarias, que están en las notas o en el recuadro PBN. El resto de las verificaciones de una salida siguen aplicando igual.",
        "referencia": "FAA AIM 1-2-3; FAA AC 90-100A, numeral 10"
      },
      {
        "id": "p39-q3",
        "enunciado": "¿Cuál es el error más frecuente en la preparación de una SID PBN?",
        "opciones": [
          "Cargar la transición o la pista equivocadas.",
          "Calcular mal el gradiente de ascenso exigido por la salida.",
          "No sintonizar el VOR de salida para el contraste de posición.",
          "Seleccionar el modo vertical inadecuado para el ascenso inicial después del despegue."
        ],
        "correcta": 0,
        "explicacion": "El nombre correcto con la transición o la pista equivocadas produce una trayectoria distinta, y es el error que más se escapa porque el nombre se lee de un vistazo. Por eso la validación es una lista y se hace con la carta a la vista.",
        "referencia": "FAA AC 90-105A, numeral 8.4.4; FAA AIM 1-2-1"
      }
    ]
  },
  {
    "tema": "P40",
    "n": 40,
    "titulo": "La STAR PBN",
    "preguntas": [
      {
        "id": "p40-q1",
        "enunciado": "El ATC te vectorea fuera de una STAR con restricciones de altitud publicadas. ¿Qué ocurre con esas restricciones?",
        "opciones": [
          "Siguen vigentes: la STAR no se cancela con unos vectores, solo se suspende hasta que el ATC la reanude.",
          "Siguen vigentes solo las de velocidad, porque las de altitud las reemplaza el ATC.",
          "Quedan canceladas con la STAR, y se recibirá una altitud que mantener y, si hace falta, una velocidad.",
          "Quedan a criterio del piloto, que decide cuáles cumplir según el perfil vertical del FMS y el tráfico en la llegada."
        ],
        "correcta": 2,
        "explicacion": "Si se vectorea o se autoriza a desviarse de una STAR, el piloto debe considerarla cancelada, y las restricciones de altitud, de velocidad y la nota de transición de Mach a velocidad indicada quedan canceladas también.",
        "referencia": "FAA AIM 5-4-1, apartado de rutas con STAR"
      },
      {
        "id": "p40-q2",
        "enunciado": "¿Cómo se sabe que el ATC pretende volver a meter al avión en la STAR?",
        "opciones": [
          "Se asume siempre: los vectores son solo una desviación temporal de la STAR.",
          "Porque el FMS conserva la secuencia de puntos de la STAR.",
          "Porque la altitud asignada coincide con una de las restricciones publicadas.",
          "Porque el controlador avisa dónde esperar reanudar el procedimiento."
        ],
        "correcta": 3,
        "explicacion": "Si el ATC piensa autorizar de nuevo el procedimiento, avisará dónde esperar reanudarlo, y el piloto debe prepararse para reincorporarse en el punto o tramo siguiente. Que el FMS conserve la secuencia no significa que la autorización siga vigente.",
        "referencia": "FAA AIM 5-4-1, apartado de rutas con STAR"
      },
      {
        "id": "p40-q3",
        "enunciado": "En el marco de la FAA, ¿qué altitud se mantiene cuando la ruta autorizada incluye una STAR?",
        "opciones": [
          "La primera altitud publicada en la STAR, desde que se recibe la autorización de la ruta.",
          "La última asignada, hasta que autoricen el descenso.",
          "La altitud de crucero del plan de vuelo, hasta el punto de inicio del descenso que calcula el FMS para la STAR.",
          "La altitud mínima de sector del aeródromo de destino, por seguridad frente al terreno."
        ],
        "correcta": 1,
        "explicacion": "Hay que mantener la última altitud asignada hasta recibir la autorización para descender, que puede llegar con la fraseología «descend via». Es fraseología de la FAA: en otro Estado se aplica lo que publique su AIP.",
        "referencia": "FAA AIM 5-4-1, apartado de rutas con STAR"
      }
    ]
  },
  {
    "tema": "P41",
    "n": 41,
    "titulo": "Vectores y directos",
    "preguntas": [
      {
        "id": "p41-q1",
        "enunciado": "¿Qué hay que verificar siempre ante una autorización de directo a un punto?",
        "opciones": [
          "La distancia al punto, para recalcular el tiempo estimado de llegada.",
          "A qué punto exacto se está autorizado, colacionado y comparado con la carta.",
          "El viento en ruta, para confirmar que el directo ahorra combustible.",
          "La altitud mínima de sector del área del directo."
        ],
        "correcta": 1,
        "explicacion": "Los nombres de cinco letras se parecen y se oyen mal en frecuencia cargada. Un directo al punto equivocado cambia la trayectoria, el perfil y la preparación de la aproximación, y todo eso con el FMS funcionando perfectamente.",
        "referencia": "FAA AC 90-105A, numeral 8.4.3, apartado 22; práctica estándar de colación"
      },
      {
        "id": "p41-q2",
        "enunciado": "¿Qué efecto puede tener seleccionar la opción de «vectores a final» en una aproximación?",
        "opciones": [
          "Ninguno: solo cambia la presentación en la pantalla.",
          "Cancela la aproximación en el FMS y hay que cargarla de nuevo desde la base.",
          "Fija automáticamente el valor RNP del segmento final en 0.3 NM.",
          "Puede impedir que se carguen los puntos fuera del FAF y obligar a reprogramar."
        ],
        "correcta": 3,
        "explicacion": "El AIM lo desaconseja precisamente por eso: la selección puede impedir que los puntos fuera del FAF se carguen en el sistema RNAV, y eso obliga a reprogramar con más carga de trabajo.",
        "referencia": "FAA AIM 5-4-6, nota sobre la selección de vectores a final"
      },
      {
        "id": "p41-q3",
        "enunciado": "El ATC te pide un desplazamiento lateral paralelo y tu sistema no tiene esa funcionalidad. ¿Qué haces?",
        "opciones": [
          "Avisas al ATC de que la funcionalidad no está disponible.",
          "Vuelas un rumbo aproximado para conseguir el desplazamiento pedido.",
          "Aceptas y lo resuelves con el piloto automático en modo rumbo.",
          "Solicitas vectores sin explicar el motivo."
        ],
        "correcta": 0,
        "explicacion": "La norma pide conocer tres cosas sobre los desplazamientos: cómo se aplican, qué sabe hacer el sistema propio y que hay que decírselo al ATC cuando no está disponible. Un desplazamiento improvisado a rumbo produce una trayectoria que el controlador no está separando.",
        "referencia": "FAA AC 90-105A, numeral 8.4.3, apartado 20"
      }
    ]
  },
  {
    "tema": "P42",
    "n": 42,
    "titulo": "La capacidad en el plan de vuelo",
    "preguntas": [
      {
        "id": "p42-q1",
        "enunciado": "¿Qué significa la letra R en la casilla 10 del plan de vuelo OACI?",
        "opciones": [
          "Radar meteorológico a bordo, operativo para todo el vuelo.",
          "RNAV aprobado, sin especificar cuál.",
          "RVSM aprobado para toda la ruta del plan.",
          "PBN aprobado, detallado en la 18."
        ],
        "correcta": 3,
        "explicacion": "La R declara PBN aprobado y remite a la casilla 18 para el detalle. RVSM se declara con la W, que es otra letra, y confundirlas es un error que se oye con frecuencia.",
        "referencia": "OACI PANS-ATM, Apéndice 2, casilla 10, código R"
      },
      {
        "id": "p42-q2",
        "enunciado": "¿Qué diferencia hay entre los códigos `S1` y `S2`?",
        "opciones": [
          "`S1` es RNP APCH y `S2` es RNP AR APCH.",
          "`S1` es RNP APCH y `S2` es RNP APCH con Baro-VNAV.",
          "`S1` es con GNSS y `S2` con DME/DME como sensor.",
          "`S1` es para aproximación y `S2` para frustrada."
        ],
        "correcta": 1,
        "explicacion": "La guía vertical barométrica es una capacidad declarable aparte. RNP AR se declara con `T1` o `T2`, según se tenga o no capacidad de tramo RF, y esos códigos llevan escrito que requieren autorización especial.",
        "referencia": "OACI PANS-ATM, Apéndice 2, códigos `PBN/` S1 y S2"
      },
      {
        "id": "p42-q3",
        "enunciado": "¿Cuántos descriptores admite el indicador `PBN/`?",
        "opciones": [
          "Los que hagan falta para declarar todas las capacidades del avión, sin límite.",
          "Hasta 4 entradas, una por cada fase del vuelo.",
          "Hasta 8, con 16 caracteres en total.",
          "Hasta 16 entradas, con un máximo de 32 caracteres."
        ],
        "correcta": 2,
        "explicacion": "El límite es de 8 entradas y 16 caracteres en total. Por eso los operadores declaran las capacidades que van a usar y no todas las que podrían encajar: no cabe todo.",
        "referencia": "OACI PANS-ATM, Apéndice 2, casilla 18, indicador `PBN/`"
      }
    ]
  },
  {
    "tema": "P43",
    "n": 43,
    "titulo": "La MEL y la capacidad PBN",
    "preguntas": [
      {
        "id": "p43-q1",
        "enunciado": "¿Por qué exige la norma que la MEL incluya información sobre las capacidades de especificación de navegación?",
        "opciones": [
          "Porque un avión puede quedar despachable y haber perdido una capacidad PBN concreta.",
          "Para facilitar el trabajo de mantenimiento al diferir un ítem de navegación.",
          "Para que el despacho declare la capacidad en la casilla 18 del plan de vuelo.",
          "Porque la MEL sustituye al AFM para la elegibilidad."
        ],
        "correcta": 0,
        "explicacion": "Las dos normas exigen contar con esa información cuando la aeronave se opera de acuerdo con la MEL. Es el reconocimiento normativo de que el despacho y la capacidad PBN son cosas distintas.",
        "referencia": "RAC 91, numeral 91.1015, apartado (a)(3); RAC 121, numeral 121.995, apartado (b)(1)(iii)"
      },
      {
        "id": "p43-q2",
        "enunciado": "¿Cuándo pasa a ser obligatorio el acoplamiento del piloto automático o del director de vuelo en RNP APCH?",
        "opciones": [
          "Siempre, en todas las aproximaciones RNP APCH, sin importar el avión.",
          "Nunca: es una recomendación del fabricante, no una exigencia de la norma.",
          "Cuando sin ellos no se demuestra el error lateral.",
          "Solo en las aproximaciones con tramo RF, donde el arco no se puede volar a mano con precisión."
        ],
        "correcta": 2,
        "explicacion": "Se recomienda el acoplamiento, y si el error total del sistema lateral no puede demostrarse sin esos sistemas, el acoplamiento se vuelve obligatorio y la guía operacional debe indicarlo. En esas aeronaves, un piloto automático inoperativo quita la capacidad.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.3.9"
      },
      {
        "id": "p43-q3",
        "enunciado": "Hay dos ítems de MEL abiertos, cada uno aceptable por separado. ¿Cómo se evalúa el efecto conjunto sobre PBN?",
        "opciones": [
          "Sumando las restricciones de cada ítem, porque son independientes entre sí.",
          "Tomando la más restrictiva de las dos y aplicándola a todo el vuelo.",
          "Consultando al ATC qué especificación exige la ruta.",
          "Revisando si la lista prohíbe la combinación, porque las restricciones no son aditivas."
        ],
        "correcta": 3,
        "explicacion": "Las restricciones no se suman. La lista puede prohibir expresamente una combinación que admite por separado, y el efecto conjunto puede no coincidir con el de ninguno de los dos aislados. La respuesta está en la MEL, no en la aritmética.",
        "referencia": "RAC 121, numeral 121.995, apartado (b)(1)(iii); práctica estándar de listas de equipo mínimo"
      }
    ]
  },
  {
    "tema": "P44",
    "n": 44,
    "titulo": "El reparto en cabina: seleccionar, verificar, ejecutar, vigilar",
    "preguntas": [
      {
        "id": "p44-q1",
        "enunciado": "¿Cuál es el orden correcto para gestionar un cambio de trayectoria en el FMS?",
        "opciones": [
          "Seleccionar, verificar, ejecutar, vigilar.",
          "Ejecutar, verificar, vigilar, seleccionar.",
          "Seleccionar, ejecutar, verificar, vigilar.",
          "Verificar, seleccionar, ejecutar, vigilar."
        ],
        "correcta": 0,
        "explicacion": "La verificación va antes de ejecutar, porque ejecutar es el punto sin retorno. La norma pide verificar los datos de puntos y derrota después de cargar y antes de usar el procedimiento, y establecer vigilancia para cada fase.",
        "referencia": "FAA AIM 1-2-1; FAA AC 90-105A, numeral 8.4.3, apartado 16"
      },
      {
        "id": "p44-q2",
        "enunciado": "¿Por qué el que programa el FMS no debería ser el que verifica?",
        "opciones": [
          "Porque el SOP lo prohíbe en todas las aerolíneas por igual, sin excepción.",
          "Porque el piloto a los mandos no puede tocar el FMS durante el vuelo.",
          "Porque sin otro par de ojos no hay verificación.",
          "Porque el sistema registra quién programó cada cambio y lo audita el operador después del vuelo."
        ],
        "correcta": 2,
        "explicacion": "La verificación tiene valor porque la hace otro par de ojos. El reparto concreto lo fija el SOP del operador, que la norma le exige documentar, pero el principio es el mismo en todos.",
        "referencia": "RAC 121, numeral 121.995, apartado (b)(2); FAA AC 90-105A, capítulo 8"
      },
      {
        "id": "p44-q3",
        "enunciado": "¿Qué riesgo señala la norma al pasar de una trayectoria PBN a la captura de un ILS?",
        "opciones": [
          "La pérdida de la capacidad RNP al sintonizar el ILS.",
          "Capturas laterales y verticales falsas.",
          "El secuenciamiento prematuro de la frustrada en el FMS.",
          "La desconexión del piloto automático al cambiar de modo de navegación a modo aproximación."
        ],
        "correcta": 1,
        "explicacion": "Entre los conocimientos requeridos está la conciencia de posibles capturas laterales y verticales falsas durante una transición en la captura de un ILS. Es un riesgo específico de ese enganche y por eso aparece en la lista.",
        "referencia": "FAA AC 90-105A, numeral 8.4.3, apartado 19"
      }
    ]
  },
  {
    "tema": "P45",
    "n": 45,
    "titulo": "Perder la capacidad PBN",
    "preguntas": [
      {
        "id": "p45-q1",
        "enunciado": "¿Cuenta como pérdida de capacidad RNP la falla del piloto automático?",
        "opciones": [
          "Sí, si era requerido para la operación.",
          "Nunca: el piloto automático no forma parte de la capacidad de navegación.",
          "Solo en procedimientos RNP AR.",
          "Solo si además se pierde el director de vuelo."
        ],
        "correcta": 0,
        "explicacion": "La definición de pérdida de capacidad es amplia y la circular cita expresamente la pérdida del piloto automático o del director de vuelo si eran requeridos. En ciertas aeronaves el acoplamiento es obligatorio para RNP APCH, y sin él la capacidad se pierde.",
        "referencia": "FAA AC 90-100A, numeral 10, apartado d; FAA AC 90-105A, Apéndice A, numeral A.3.9"
      },
      {
        "id": "p45-q2",
        "enunciado": "¿Qué debe contener el aviso al ATC por pérdida de capacidad?",
        "opciones": [
          "Solo la falla, para que el ATC decida qué hacer.",
          "Una declaración de emergencia y la intención de aterrizar.",
          "La posición, el combustible y las personas a bordo.",
          "La pérdida de la capacidad junto con el curso de acción propuesto."
        ],
        "correcta": 3,
        "explicacion": "La circular exige las dos cosas: notificar la pérdida y el curso de acción propuesto. El controlador necesita saber qué se va a hacer para poder acomodarlo, no solo qué se rompió.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.7.1.8 y Apéndice H, numeral H.8.5"
      },
      {
        "id": "p45-q3",
        "enunciado": "¿Cuál es el paso que decide en el flujo de pérdida de capacidad?",
        "opciones": [
          "Identificar el mensaje exacto que presenta el avión en la pantalla.",
          "Determinar si todavía se puede cumplir la especificación que exige el segmento.",
          "Aplicar el QRH de la flota, paso por paso y sin saltarse nada.",
          "Informar al ATC antes de hacer cualquier otra cosa."
        ],
        "correcta": 1,
        "explicacion": "Todo lo anterior es preparación para esa pregunta y todo lo posterior es consecuencia. Y solo se puede contestar si se sabe qué exige el segmento, que es lo que se fija en el briefing.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.7.1.8"
      }
    ]
  },
  {
    "tema": "P46",
    "n": 46,
    "titulo": "«Unable RNAV», «unable RNP» y las contingencias",
    "preguntas": [
      {
        "id": "p46-q1",
        "enunciado": "¿Cuáles son las tres piezas de una comunicación de pérdida de capacidad?",
        "opciones": [
          "Posición, combustible y personas a bordo.",
          "Declaración de emergencia, intenciones y nivel deseado.",
          "Identificación y falla, qué no se puede cumplir, y qué se solicita.",
          "Especificación declarada, perdida y hora estimada."
        ],
        "correcta": 2,
        "explicacion": "El ejemplo de la circular las contiene: matrícula y falla del sistema, *unable RNAV*, y solicitud de autorización enmendada. Nombrar lo que no se puede cumplir es lo que permite al controlador decidir.",
        "referencia": "FAA AC 90-100A, numeral 10, apartado d"
      },
      {
        "id": "p46-q2",
        "enunciado": "¿Cuándo se comunica la pérdida de capacidad?",
        "opciones": [
          "Al aterrizar, en el reporte de vuelo.",
          "En el contacto inicial de la frecuencia siguiente, junto con el nivel.",
          "Solo si el ATC pregunta por la capacidad.",
          "Enseguida, con lo que se propone."
        ],
        "correcta": 3,
        "explicacion": "La circular pide notificar la pérdida junto con el curso de acción propuesto y, si no se pueden cumplir los requisitos del procedimiento, avisar al servicio de tránsito aéreo lo antes posible. El aviso tardío reduce las opciones del controlador.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.7.1.8"
      },
      {
        "id": "p46-q3",
        "enunciado": "Dices al ATC «tengo un problema con el GPS» y nada más. ¿Qué falta?",
        "opciones": [
          "Qué especificación no se puede cumplir y qué se solicita.",
          "Nada: el controlador deducirá solo las consecuencias operacionales.",
          "Declarar emergencia para tener prioridad.",
          "Dar la posición exacta y el nivel de vuelo actual del avión."
        ],
        "correcta": 0,
        "explicacion": "El controlador separa y autoriza; la capacidad la conoce la tripulación. Un aviso sin la consecuencia operacional obliga al controlador a preguntar y retrasa la solución.",
        "referencia": "FAA AC 90-100A, numeral 10, apartado d; FAA AC 90-105A, Apéndice A, numeral A.7.1.8"
      }
    ]
  },
  {
    "tema": "P47",
    "n": 47,
    "titulo": "PBN en Colombia",
    "preguntas": [
      {
        "id": "p47-q1",
        "enunciado": "¿Cuál es el numeral del RAC 91 que trata el equipo de navegación para operaciones PBN?",
        "opciones": [
          "91.305",
          "91.1015",
          "91.1010",
          "91.1020"
        ],
        "correcta": 1,
        "explicacion": "El numeral 91.1015 es «Equipo de navegación para operaciones PBN». El 91.1020 trata el equipo para operaciones MNPS, y el 91.1010 los requisitos generales a los que el 91.1015 añade los suyos.",
        "referencia": "RAC 91, numeral 91.1015"
      },
      {
        "id": "p47-q2",
        "enunciado": "Según el RAC 121, además de tener el avión equipado, ¿qué debe ocurrir?",
        "opciones": [
          "Que el ATC confirme la capacidad del avión en frecuencia.",
          "Que el procedimiento esté cargado en la base de datos vigente.",
          "Que la tripulación tenga habilitación de tipo vigente.",
          "Que el explotador esté autorizado por la UAEAC para esas operaciones."
        ],
        "correcta": 3,
        "explicacion": "El texto es directo: el explotador deberá estar autorizado por la UAEAC para realizar las operaciones en cuestión. Y para las especificaciones con autorización obligatoria (AR), la autoridad emite además una aprobación específica.",
        "referencia": "RAC 121, numeral 121.995, apartado (b)(3)"
      },
      {
        "id": "p47-q3",
        "enunciado": "¿Qué dice la nota del RAC 121 sobre los datos de navegación?",
        "opciones": [
          "Que son responsabilidad exclusiva del proveedor de la base de datos.",
          "Que deben verificarse solo antes del primer vuelo del día.",
          "Que su gestión es parte integral de los procedimientos normales y anormales.",
          "Que la autoridad los audita cada año."
        ],
        "correcta": 2,
        "explicacion": "Es la nota literal, y es una frase con consecuencias: convierte la gestión de los datos en parte de los procedimientos que el explotador debe establecer y documentar, no en un trámite administrativo aparte.",
        "referencia": "RAC 121, numeral 121.995, apartado (b)(2), nota 2"
      }
    ]
  },
  {
    "tema": "P48",
    "n": 48,
    "titulo": "Cómo se lee una carta PBN y un vuelo completo",
    "preguntas": [
      {
        "id": "p48-q1",
        "enunciado": "¿Cuál es el primer sitio de la carta donde se busca lo que el procedimiento exige?",
        "opciones": [
          "El título del procedimiento.",
          "La caja de mínimos.",
          "Las notas y el recuadro PBN.",
          "El perfil vertical de la aproximación."
        ],
        "correcta": 2,
        "explicacion": "El título dice la clase de procedimiento según la convención de quien publica, pero lo que el procedimiento exige está en las notas y en el recuadro PBN, y lo que está ahí es obligatorio para volar sus elementos PBN.",
        "referencia": "FAA AIM 1-2-3, representación de los requisitos PBN"
      },
      {
        "id": "p48-q2",
        "enunciado": "En el vuelo completo, ¿en qué fase se resuelve una contradicción entre la MEL y la capacidad declarada en el plan de vuelo?",
        "opciones": [
          "Antes de salir, corrigiendo el plan de vuelo.",
          "En vuelo, explicándola al ATC en el primer contacto.",
          "Al llegar al destino, en el reporte del vuelo.",
          "No hay contradicción posible entre esos documentos."
        ],
        "correcta": 0,
        "explicacion": "El ATC autoriza según las capacidades declaradas y espera que se usen, así que una capacidad declarada que la MEL quitó es una contradicción que se resuelve en tierra. Explicarla por radio llega cuando ya se recibió una autorización que no se puede cumplir.",
        "referencia": "RAC 121, numeral 121.995, apartado (b)(1)(iii); OACI PANS-ATM, Apéndice 2"
      },
      {
        "id": "p48-q3",
        "enunciado": "¿Qué indica un valor RNP publicado con dos decimales, del tipo 0.15?",
        "opciones": [
          "Que se trata de la especificación RNP 0.3, que es la de los helicópteros.",
          "Que es un valor de 0.30 o menor, propio de una operación con autorización requerida.",
          "Que la precisión publicada es orientativa y el FMS la redondea a 0.3.",
          "Que lo puede volar cualquier avión RNP APCH."
        ],
        "correcta": 1,
        "explicacion": "El AIM pide no confundir un valor RNP en carta de 0.30 o menor con el nombre de la especificación «RNP 0.3»: los valores en carta de 0.30 o menos se escriben con dos decimales. Y las aproximaciones RNP AR tienen valores de RNP 0.30 o menores, cada línea de mínimos con el suyo.",
        "referencia": "FAA AIM 1-2-1, nota sobre valores RNP en carta; FAA AIM 5-4-18"
      }
    ]
  }
]
