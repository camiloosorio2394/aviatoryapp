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
          "El uso del GPS como fuente primaria de navegación en ruta y aproximación.",
          "Navegación de área basada en requisitos de performance que se aplican en rutas ATS, procedimientos de aproximación por instrumentos y espacio aéreo designado.",
          "El conjunto de procedimientos RNAV que reemplazaron a los procedimientos basados en radioayudas terrestres.",
          "La capacidad del FMS de calcular una trayectoria entre dos puntos cualesquiera."
        ],
        "correcta": 1,
        "explicacion": "Es la definición de la norma: navegación de área basada en los requisitos de performance aplicables a la aeronave que vuela en una ruta ATS, en un procedimiento de aproximación por instrumentos o en un espacio aéreo designado. El GPS es una fuente posible, no la definición, y PBN no reemplazó la navegación convencional.",
        "referencia": "RAC 91, definición de navegación basada en la performance (PBN)"
      },
      {
        "id": "p01-q2",
        "enunciado": "¿Cuál es el cambio de fondo que introduce PBN frente a la navegación convencional?",
        "opciones": [
          "Que la trayectoria se vuela con piloto automático en lugar de a mano.",
          "Que se exige una performance de navegación en lugar de un equipo determinado a bordo.",
          "Que las radioayudas terrestres dejan de usarse como fuente de posición.",
          "Que el ATC deja de asignar rutas y la tripulación elige la trayectoria."
        ],
        "correcta": 1,
        "explicacion": "El requisito pasa de ser un equipo a ser una performance, y con eso se abre qué sensores pueden usarse para conseguirla. Las radioayudas terrestres siguen siendo fuente válida en varias especificaciones, y las rutas las sigue autorizando el ATC.",
        "referencia": "RAC 91, definición de navegación basada en la performance (PBN); FAA AIM 1-2-1"
      },
      {
        "id": "p01-q3",
        "enunciado": "¿A qué se aplica una especificación para la navegación PBN?",
        "opciones": [
          "Solo a las aproximaciones por instrumentos.",
          "Solo a las rutas oceánicas y remotas.",
          "A rutas ATS, espacio aéreo designado, SID, STAR y aproximaciones por instrumentos.",
          "A cualquier fase de vuelo, pero únicamente por encima de FL 290."
        ],
        "correcta": 2,
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
          "Son sinónimos: RNAV es el nombre técnico de PBN.",
          "PBN es navegación de área, pero existe navegación de área que no entra en la definición de PBN.",
          "La navegación de área es una aplicación de PBN restringida a la terminal.",
          "PBN reemplazó a la navegación de área cuando se generalizó el GNSS."
        ],
        "correcta": 1,
        "explicacion": "La nota de la norma es explícita: la navegación de área incluye la navegación basada en la performance y además otras operaciones no incluidas en su definición. Es una relación de contenido, no de equivalencia ni de reemplazo.",
        "referencia": "RAC 91, nota a la definición de navegación de área"
      },
      {
        "id": "p02-q2",
        "enunciado": "En el título de un procedimiento, ¿qué indica la palabra RNAV?",
        "opciones": [
          "Que el avión debe estar equipado con GNSS.",
          "Que es navegación de área, sin decir nada sobre la capacidad del equipo del avión.",
          "Que el procedimiento incluye control y alerta de la performance a bordo.",
          "Que el procedimiento solo puede volarse con piloto automático acoplado."
        ],
        "correcta": 1,
        "explicacion": "El AIM lo aclara expresamente: en ese contexto, como en los títulos de procedimiento, RNAV significa simplemente navegación de área, con independencia de la capacidad del equipo de la aeronave. Los requisitos concretos están en las notas y en el recuadro PBN de la carta.",
        "referencia": "FAA AIM 1-2-1"
      },
      {
        "id": "p02-q3",
        "enunciado": "Por qué sigue importando la navegación convencional en un módulo de PBN?",
        "opciones": [
          "Porque las especificaciones PBN exigen volar siempre con referencia a un VOR.",
          "Porque es lo que se usa por debajo de la altitud de transición.",
          "Porque varias especificaciones admiten posicionamiento por radioayudas y porque la reversión a navegación convencional es una contingencia habitual.",
          "Porque el ATC solo autoriza rutas convencionales cuando hay tráfico."
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
          "GNSS, FMS y base de datos de navegación.",
          "Precisión, integridad y continuidad.",
          "Aplicación de navegación, especificación para la navegación e infraestructura de radioayudas.",
          "Aeronave elegible, operador autorizado y tripulación entrenada."
        ],
        "correcta": 2,
        "explicacion": "Son esos tres. La opción D enumera condiciones para operar, que salen de la especificación; la B enumera atributos de la performance; y la A, equipo de a bordo.",
        "referencia": "RAC 91, definiciones de navegación basada en la performance y de especificación para la navegación"
      },
      {
        "id": "p03-q2",
        "enunciado": "Tu avión es elegible para RNP 1 según el AFM, pero hoy no puede cumplir una SID RNP 1. ¿Es posible?",
        "opciones": [
          "No: si el AFM lo declara elegible, la capacidad está garantizada.",
          "Sí: la elegibilidad la da la documentación del avión y la capacidad depende de la infraestructura disponible y del estado de la aviónica.",
          "Solo si el piloto automático está inoperativo.",
          "Solo en espacio aéreo oceánico o remoto."
        ],
        "correcta": 1,
        "explicacion": "El AIM usa este mismo ejemplo: una aeronave puede ser elegible para RNP 1 y no ser capaz de la operación por cobertura limitada de radioayudas o por una falla de aviónica. Son dos preguntas distintas y las dos hay que contestarlas.",
        "referencia": "FAA AIM 1-2-1, apartado de especificaciones RNP"
      },
      {
        "id": "p03-q3",
        "enunciado": "¿Qué define exactamente una especificación para la navegación?",
        "opciones": [
          "El equipo mínimo que debe llevar la aeronave.",
          "La precisión lateral que debe mantener el piloto automático.",
          "El conjunto de requisitos relativos a la aeronave y a la tripulación de vuelo necesarios para dar apoyo a la operación en un espacio aéreo definido.",
          "La trayectoria publicada y sus restricciones de altitud y velocidad."
        ],
        "correcta": 2,
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
          "Porque el GPS no se admite como fuente de posición en operaciones RNP.",
          "Porque cada especificación exige elegibilidad propia de la aeronave, además de autorización del operador y competencia de la tripulación.",
          "Porque las operaciones RNP exigen posicionamiento por DME/DME.",
          "Porque el GPS solo sirve en ruta, no en terminal ni en aproximación."
        ],
        "correcta": 1,
        "explicacion": "El AIM subraya que la elegibilidad se lista por separado para cada especificación y que ser elegible para una no implica serlo para otra. Y el RAC 121 exige además que el explotador esté autorizado. El GPS es fuente, no permiso.",
        "referencia": "FAA AIM 1-2-1; RAC 121, numeral 121.995"
      },
      {
        "id": "p04-q2",
        "enunciado": "¿Qué diferencia hay entre PBN y TAWS?",
        "opciones": [
          "Ninguna operacionalmente: el TAWS es la función de PBN que protege del terreno.",
          "PBN define y vigila la performance de navegación; el TAWS alerta de una situación peligrosa respecto del terreno.",
          "El TAWS es la fuente de datos de terreno que usa el FMS para calcular la trayectoria PBN.",
          "PBN sustituye al TAWS en procedimientos RNP AR."
        ],
        "correcta": 1,
        "explicacion": "Son sistemas distintos con propósitos distintos. Seguir con precisión una trayectoria publicada da margen sobre obstáculos porque el procedimiento se diseñó así, no porque PBN vigile el terreno. Confundirlos hace que se deje de vigilar el perfil vertical.",
        "referencia": "FAA AC 90-105A, capítulo 6; FAA AIM 1-2-1"
      },
      {
        "id": "p04-q3",
        "enunciado": "Encuentras una aproximación RNP en la carta pero no aparece en la base de datos del avión. En el marco de la FAA, ¿qué es lo más probable?",
        "opciones": [
          "Que la base de datos esté vencida.",
          "Que el procedimiento contenga elementos PBN para los que el avión no es elegible.",
          "Que el procedimiento esté cancelado por NOTAM.",
          "Que haya que introducirlo a mano con las coordenadas de la carta."
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
          "La integridad.",
          "La disponibilidad.",
          "La funcionalidad."
        ],
        "correcta": 3,
        "explicacion": "La capacidad de volar un tramo RF es funcionalidad, y en varias especificaciones es opcional: hay que buscarla listada como característica del equipo. Un avión puede ser elegible para RNP APCH o RNP 1 y no poder volar un RF.",
        "referencia": "FAA AIM 1-2-1, apartados de RNP APCH y RNP 1; FAA AC 90-101A, numeral 4"
      },
      {
        "id": "p05-q2",
        "enunciado": "¿Qué significa integridad para el piloto?",
        "opciones": [
          "Que la posición calculada es precisa.",
          "Que el sistema puede avisar cuando la información deja de ser confiable.",
          "Que el equipo es redundante y sobrevive a una falla.",
          "Que el servicio está disponible en el periodo del vuelo."
        ],
        "correcta": 1,
        "explicacion": "Precisión es parecido a la verdad; integridad es la confianza en esa información y el aviso cuando se pierde. La redundancia es continuidad y el servicio en el periodo del vuelo es disponibilidad: cuatro preguntas distintas.",
        "referencia": "FAA AC 90-101A, numeral 3, definición de RAIM; FAA AIM 1-2-1"
      },
      {
        "id": "p05-q3",
        "enunciado": "¿Por qué ciertas operaciones exigen equipo redundante?",
        "opciones": [
          "Por precisión: dos sistemas promedian mejor la posición.",
          "Por continuidad: una sola falla no puede dejar al avión sin navegación en mitad del procedimiento.",
          "Por funcionalidad: la redundancia habilita los tramos RF.",
          "Por disponibilidad: dos receptores ven más satélites."
        ],
        "correcta": 1,
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
          "Que admite menos fuentes de posición.",
          "Que no incluye el requisito de control y alerta de la performance a bordo.",
          "Que su número es siempre mayor.",
          "Que solo se aplica en ruta."
        ],
        "correcta": 1,
        "explicacion": "Es la definición literal: especificación basada en la navegación de área que no incluye el requisito de control y alerta de la performance, designada con el prefijo RNAV. El número no distingue las familias y las especificaciones RNAV existen en ruta, en terminal y en espacio oceánico.",
        "referencia": "RAC 91, definición de especificación para navegación de área (RNAV)"
      },
      {
        "id": "p06-q2",
        "enunciado": "¿Cuál es el límite real de la libertad de trayectoria que da RNAV?",
        "opciones": [
          "La autorización del ATC, únicamente.",
          "La capacidad del sistema del avión y la infraestructura de radioayudas disponible.",
          "El alcance del piloto automático.",
          "La altitud de transición."
        ],
        "correcta": 1,
        "explicacion": "La navegación de área permite operar sobre cualquier trayectoria deseada dentro de la cobertura de las radioayudas de referencia, de los límites de un sistema autónomo a bordo o de una combinación de ambos. La autorización del ATC define qué se vuela, no qué se puede.",
        "referencia": "RAC 91, definición de navegación de área; FAA AIM 1-2-1"
      },
      {
        "id": "p06-q3",
        "enunciado": "Pierdes el GNSS volando una SID RNAV 1 y no puedes cumplir la especificación. ¿Cómo lo comunicas?",
        "opciones": [
          "Declaras emergencia y desciendes.",
          "Informas la falla, declaras que no puedes cumplir RNAV y solicitas autorización enmendada.",
          "No comunicas nada mientras el FMS siga mostrando la trayectoria.",
          "Solicitas vectores sin mencionar la falla."
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
          "Una precisión lateral menor.",
          "El requisito de control de la performance a bordo y de alerta a la tripulación.",
          "La obligación de usar GNSS como única fuente.",
          "La obligación de volar con piloto automático acoplado."
        ],
        "correcta": 1,
        "explicacion": "Es lo único que separa las dos familias en la definición de la norma. El resto (fuentes admitidas, uso del piloto automático, valores) depende de cada especificación concreta y de la carta, no de la familia.",
        "referencia": "RAC 91, definición de especificación para la performance de navegación requerida (RNP)"
      },
      {
        "id": "p07-q2",
        "enunciado": "¿Cuál es la consecuencia operacional del control y alerta a bordo?",
        "opciones": [
          "Que el piloto puede desviarse de la trayectoria sin autorización.",
          "Que permite depender menos de la intervención del ATC y de la separación procedimental.",
          "Que el avión corrige automáticamente cualquier error de posición.",
          "Que deja de ser necesario vigilar la desviación lateral."
        ],
        "correcta": 1,
        "explicacion": "Si el avión sabe cuándo deja de cumplir y lo dice, se puede reducir la dependencia de que el controlador lo detecte y del margen procedimental. Nada de eso releva al piloto de vigilar la desviación ni convierte el sistema en autocorrector.",
        "referencia": "FAA AIM 1-2-1, apartado general de RNP"
      },
      {
        "id": "p07-q3",
        "enunciado": "Un compañero afirma que con el control y alerta a bordo el avión avisará de cualquier error de posición. ¿Qué le falta?",
        "opciones": [
          "Nada: el sistema detecta todo error de posición.",
          "Que el control y alerta responde a los criterios para los que fue diseñado, y hay degradaciones que no disparan alerta, como la suplantación de señal.",
          "Que el aviso solo funciona con el piloto automático acoplado.",
          "Que el aviso solo se presenta en la fase de aproximación."
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
          "Sí: el número indica la misma precisión, así que son intercambiables.",
          "No: son especificaciones distintas y la elegibilidad para una no implica la elegibilidad para la otra.",
          "Sí, siempre que el avión tenga GNSS.",
          "No, porque RNAV 1 solo se aplica en ruta y RNP 1 solo en terminal."
        ],
        "correcta": 1,
        "explicacion": "El AIM lo dice expresamente: RNP 1 es distinto de RNAV 1, y una elegibilidad RNP 1 no significa elegibilidad automática para RNP 2 ni para RNAV 1. Por eso cada especificación se lista por separado en la documentación del avión.",
        "referencia": "FAA AIM 1-2-1, apartado general de RNP"
      },
      {
        "id": "p08-q2",
        "enunciado": "Según la norma, ¿qué le pasó al término RNP como concepto general?",
        "opciones": [
          "Sigue siendo el concepto general que engloba RNAV.",
          "Fue reemplazado por el concepto de PBN, y hoy RNP solo se usa para especificaciones con control y alerta de la performance.",
          "Se reservó para operaciones oceánicas.",
          "Se eliminó y ahora todo se llama RNAV."
        ],
        "correcta": 1,
        "explicacion": "La nota es literal: el término RNP, antes definido como declaración de la performance de navegación necesaria para operar en un espacio aéreo definido, fue reemplazado por el concepto de PBN, y ahora se usa solo en el contexto de especificaciones que requieren control y alerta.",
        "referencia": "RAC 91, nota 2 a la definición de especificación para la navegación"
      },
      {
        "id": "p08-q3",
        "enunciado": "¿Cómo hay que comparar dos especificaciones de navegación?",
        "opciones": [
          "Por su número: a menor número, mejor especificación.",
          "Como especificaciones distintas entre sí, no mejores ni peores por la precisión lateral que describen.",
          "Por la cantidad de sensores que admiten.",
          "Por la fase de vuelo en que se aplican, únicamente."
        ],
        "correcta": 1,
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
          "Que la aeronave puede desviarse hasta 1 NM del eje.",
          "Que el error lateral nunca excede 1 NM.",
          "La precisión de navegación lateral en millas náuticas que se espera conseguir al menos el 95 % del tiempo de vuelo.",
          "Que la anchura del espacio aéreo protegido es de 1 NM."
        ],
        "correcta": 2,
        "explicacion": "Es la definición completa, y las tres piezas cuentan: precisión lateral, en millas náuticas, conseguida al menos el 95 % del tiempo de vuelo. No es un permiso de desviación ni un límite que nunca se excede.",
        "referencia": "FAA AIM 1-2-1; FAA AC 90-101A, numeral 3, definición de RNP"
      },
      {
        "id": "p09-q2",
        "enunciado": "Según la FAA, ¿qué error debe mantener una aeronave en RNAV 2?",
        "opciones": [
          "Un error total del sistema no mayor de 2 NM el 95 % del tiempo total de vuelo.",
          "Un error lateral no mayor de 2 NM en ningún momento.",
          "Un error de 2 NM respecto de la posición GNSS.",
          "Un error técnico de vuelo no mayor de 2 NM."
        ],
        "correcta": 0,
        "explicacion": "El AIM lo formula así para RNAV 1 y RNAV 2: error total del sistema no mayor de 1 y de 2 NM respectivamente, el 95 % del tiempo total de vuelo. El error total del sistema no es lo mismo que el error técnico de vuelo, que es solo una de sus componentes.",
        "referencia": "FAA AIM 1-2-1, apartado de especificaciones RNAV"
      },
      {
        "id": "p09-q3",
        "enunciado": "Aunque el valor de la especificación sea 1 NM, ¿qué se espera del piloto?",
        "opciones": [
          "Mantenerse dentro de 1 NM del eje, sin más exigencia.",
          "Mantener el eje según los indicadores de desviación lateral o la guía de vuelo, salvo autorización del ATC o emergencia.",
          "Volar el 95 % del tiempo dentro de 1 NM y el resto libremente.",
          "Corregir solo cuando el sistema alerte."
        ],
        "correcta": 1,
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
          "1",
          "0.5",
          "0.3",
          "0.1"
        ],
        "correcta": 2,
        "explicacion": "RNP APCH tiene valor 1 hasta el segmento final, donde los márgenes se estrechan a 0.3, y vuelve a 1 en la frustrada. Es el ejemplo más claro de que el valor pertenece al segmento y no al procedimiento.",
        "referencia": "FAA AC 90-105A, numeral 5.1 y Tabla 5-1"
      },
      {
        "id": "p10-q2",
        "enunciado": "¿Cuál de estas afirmaciones sobre A-RNP es correcta?",
        "opciones": [
          "Es una especificación exclusiva de aproximación.",
          "Admite valor 2 en oceánico y remoto, 2 o 1 en ruta doméstica y un rango de 1 a 0.3 en los segmentos de terminal.",
          "Tiene un valor fijo de 1 en todas las fases.",
          "Solo se aplica en espacio aéreo oceánico."
        ],
        "correcta": 1,
        "explicacion": "Lo distintivo de A-RNP es el escalado: los límites se van abriendo desde 0.3 hacia valores mayores en salidas y frustradas, y se estrechan en llegadas y aproximaciones. Es una especificación de varias fases, no solo de aproximación.",
        "referencia": "FAA AC 90-105A, numeral 5.1 y Tabla 5-1"
      },
      {
        "id": "p10-q3",
        "enunciado": "«RNP solo se usa en aproximaciones.» ¿Por qué es falso?",
        "opciones": [
          "Porque RNP también se usa en rodaje.",
          "Porque hay especificaciones RNP para ruta doméstica, oceánico y remoto, llegada y salida.",
          "Porque RNP es un concepto general que engloba RNAV.",
          "Porque en aproximación se usa exclusivamente RNAV."
        ],
        "correcta": 1,
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
          "En la base de datos del FMS.",
          "En el manual de vuelo o en otra documentación de la aeronave aprobada por el Estado de diseño o la autoridad.",
          "En el plan operacional de vuelo.",
          "En la carta del procedimiento."
        ],
        "correcta": 1,
        "explicacion": "La norma exige que la aeronave cuente con esa información enumerada en el manual de vuelo o en otra documentación aprobada, y el AIM añade que si falta o está incompleta hay que contactar al fabricante de la aviónica o de la aeronave. La carta dice qué se exige, no qué tiene el avión.",
        "referencia": "RAC 91, numeral 91.1015, apartado (a)(2); FAA AIM 1-2-1"
      },
      {
        "id": "p11-q2",
        "enunciado": "Según el RAC 121, ¿qué hace falta además de que el avión esté equipado?",
        "opciones": [
          "Nada más: el equipo determina la capacidad.",
          "Que el explotador esté autorizado por la autoridad para realizar esas operaciones.",
          "Que el ATC confirme la capacidad en el primer contacto.",
          "Que el procedimiento aparezca en la base de datos."
        ],
        "correcta": 1,
        "explicacion": "El explotador debe estar autorizado por la UAEAC, y para las especificaciones con autorización obligatoria (AR) la autoridad emite una aprobación específica. Tener el equipo y estar autorizado son dos cosas distintas.",
        "referencia": "RAC 121, numeral 121.995, apartado (b)(3) y (b)(4)"
      },
      {
        "id": "p11-q3",
        "enunciado": "¿Qué información sobre PBN debe contener la MEL según la norma?",
        "opciones": [
          "El valor RNP de cada procedimiento del destino.",
          "La información relativa a las capacidades de especificación de navegación de la aeronave.",
          "La lista de satélites disponibles.",
          "El ciclo AIRAC vigente."
        ],
        "correcta": 1,
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
          "Que solo admite GNSS.",
          "Que admite VOR/DME e inerciales como fuentes declarables por sí solas, además de GNSS y DME/DME.",
          "Que no admite DME/DME.",
          "Que exige dos sistemas independientes."
        ],
        "correcta": 1,
        "explicacion": "Los códigos del plan de vuelo listan para RNAV 5 todos los sensores permitidos, GNSS, DME/DME, VOR/DME, INS o IRS, y LORAN C. Esa amplitud es lo característico de la especificación, y tiene consecuencia operacional ante una pérdida de GNSS.",
        "referencia": "OACI PANS-ATM, Apéndice 2, códigos `PBN/` B1 a B6"
      },
      {
        "id": "p12-q2",
        "enunciado": "¿Dónde se comprueba si RNAV 5 aplica en una FIR concreta?",
        "opciones": [
          "En el AFM del avión.",
          "En las circulares de la FAA.",
          "En el AIP del Estado correspondiente.",
          "En la base de datos del FMS."
        ],
        "correcta": 2,
        "explicacion": "Qué especificación se prescribe en un espacio aéreo lo publica el Estado en su AIP. Las circulares de la FAA no cubren RNAV 5 porque en su espacio aéreo la especificación de ruta aplicable es RNAV 2: es un buen recordatorio de que los criterios de una autoridad no son universales.",
        "referencia": "RAC 211, apéndice de designadores de rutas ATS; práctica estándar de publicación AIP"
      },
      {
        "id": "p12-q3",
        "enunciado": "Pierdes GNSS en ruta volando con capacidad RNAV 5 declarada y el sistema sigue posicionando por DME/DME. ¿Qué corresponde?",
        "opciones": [
          "Declarar *unable RNAV* de inmediato.",
          "Determinar si la fuente que queda es admitida y declarada para la especificación, y actuar en consecuencia.",
          "Descender por debajo del nivel de vuelo más bajo de la ruta.",
          "Nada: RNAV 5 no exige fuente determinada."
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
          "El equipo en tierra necesario en el aeropuerto.",
          "La especificación del procedimiento y, si hace falta, sensores, requisitos funcionales adicionales, valor RNP mínimo y observaciones.",
          "La lista de aeronaves autorizadas.",
          "Las frecuencias de los servicios de tránsito aéreo."
        ],
        "correcta": 1,
        "explicacion": "Es exactamente lo que el AIM enumera para ese recuadro, y añade que lo que figura ahí es obligatorio para volar los elementos PBN del procedimiento. El equipo en tierra va en un recuadro distinto, de requisitos de equipo.",
        "referencia": "FAA AIM 1-2-3, representación de los requisitos PBN"
      },
      {
        "id": "p13-q2",
        "enunciado": "Antes de iniciar la carrera de despegue en una salida RNAV con GNSS, ¿qué se exige?",
        "opciones": [
          "Nada especial: basta con tener el FMS inicializado.",
          "Que la señal GNSS esté adquirida antes de que comience la carrera, y que la posición del avión esté confirmada.",
          "Que se haya verificado el RAIM en el destino.",
          "Que el piloto automático esté acoplado."
        ],
        "correcta": 1,
        "explicacion": "La circular exige confirmar la posición de la aeronave, con una tolerancia de 1.000 ft al comenzar la carrera y la actualización de pista como medio aceptable, y en aviones que usan GNSS, que la señal esté adquirida antes de iniciar la carrera.",
        "referencia": "FAA AC 90-100A, numeral 10, apartados c(3) y c(4)"
      },
      {
        "id": "p13-q3",
        "enunciado": "La carta de una STAR dice «RNAV 1». ¿Qué está describiendo?",
        "opciones": [
          "La capacidad del avión que la va a volar.",
          "La precisión con que el piloto debe volar a mano.",
          "La especificación que el procedimiento exige.",
          "El valor de desviación lateral que el ATC tolera."
        ],
        "correcta": 2,
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
          "Es obligatoria: todo avión RNP 1 puede volar un RF.",
          "Es opcional: hay que verificar que los tramos RF estén listados como característica del equipo.",
          "No existe: los tramos RF son exclusivos de RNP AR.",
          "Depende de la autorización del ATC en el momento."
        ],
        "correcta": 1,
        "explicacion": "El AIM lo dice con esas palabras: el avión puede ser elegible para RNP 1 y no volar un tramo RF salvo que los RF estén específicamente listados como una característica del equipo de aviónica. En RNP AR, en cambio, la capacidad RF es obligatoria.",
        "referencia": "FAA AIM 1-2-1, apartado RNP 1"
      },
      {
        "id": "p14-q2",
        "enunciado": "¿En qué fases se aplica RNP 1?",
        "opciones": [
          "Solo en aproximación final.",
          "Solo en ruta.",
          "Llegada y salida en terminal, e inicial e intermedia de aproximación cuando se usa en procedimientos convencionales con segmentos PBN.",
          "En todas las fases, incluida la aproximación final."
        ],
        "correcta": 2,
        "explicacion": "La tabla de aplicaciones marca RNP 1 en llegada, inicial, intermedia, frustrada y salida, y deja la final sin aplicar. El AIM añade el caso típico: un ILS con alimentador, IAF o frustrada de tipo PBN.",
        "referencia": "FAA AIM 1-2-1, apartado RNP 1; FAA AC 90-105A, Tabla 5-1"
      },
      {
        "id": "p14-q3",
        "enunciado": "Dos aviones de la misma flota tienen elegibilidad RNP 1 y uno no puede volar una STAR con un tramo RF. ¿Qué explica la diferencia?",
        "opciones": [
          "Un error de la base de datos.",
          "Que la capacidad de tramo RF es una funcionalidad opcional que debe constar por separado.",
          "Que uno tiene el piloto automático inoperativo.",
          "Que uno declaró otra especificación en el plan de vuelo."
        ],
        "correcta": 1,
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
          "Solo en espacio oceánico y remoto.",
          "Solo en ruta doméstica.",
          "En ruta doméstica y en oceánico o remoto.",
          "En terminal y en aproximación inicial."
        ],
        "correcta": 2,
        "explicacion": "RNP 2 se aplica tanto a operaciones domésticas como oceánicas o remotas, con valor 2. RNP 4 es la que queda restringida a oceánico y remoto.",
        "referencia": "FAA AIM 1-2-1, apartado RNP 2; FAA AC 90-105A, Tabla 5-1"
      },
      {
        "id": "p15-q2",
        "enunciado": "¿Por qué RNP 10 pasó a llamarse RNAV 10?",
        "opciones": [
          "Porque su precisión lateral cambió de 10 a otro valor.",
          "Porque no incluye control y alerta de la performance a bordo, y el prefijo RNP quedó reservado a las que sí lo incluyen.",
          "Porque dejó de aplicarse en espacio oceánico.",
          "Porque la FAA y OACI usan nombres distintos para la misma especificación."
        ],
        "correcta": 1,
        "explicacion": "El prefijo RNP quedó reservado a especificaciones con control y alerta de la performance. Esta no lo tiene, así que se renombró, aunque el nombre antiguo sobrevive en el código `A1` del plan de vuelo, cuyo texto literal es «RNAV 10 (RNP 10)».",
        "referencia": "RAC 91, nota 2 a la definición de especificación para la navegación; FAA AIM 1-2-1, apartado RNP 10"
      },
      {
        "id": "p15-q3",
        "enunciado": "Tu flota es elegible para A-RNP. ¿Puedes volar una RNP AR APCH?",
        "opciones": [
          "Sí: A-RNP incluye RNP AR.",
          "Sí, si el procedimiento tiene tramos RF, que A-RNP exige.",
          "No automáticamente: RNP AR exige un proceso de determinación separado y autorización especial.",
          "No, porque A-RNP es solo de ruta."
        ],
        "correcta": 2,
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
          "Al recibir la autorización de aproximación.",
          "2 NM antes del punto de aproximación final.",
          "Al cruzar el punto de aproximación inicial.",
          "Al pasar el FAF."
        ],
        "correcta": 1,
        "explicacion": "La circular lo fija así: los pilotos deben confirmar que el sistema ha iniciado la transición de modo terminal a modo aproximación 2 NM antes del FAF. Confirmarlo después del FAF llega tarde para hacer algo al respecto.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.7.2.1"
      },
      {
        "id": "p16-q2",
        "enunciado": "¿Cómo define la FAA la pérdida de capacidad RNP APCH?",
        "opciones": [
          "La pérdida total del GNSS.",
          "Cualquier falla o suceso que haga que la aeronave deje de satisfacer los requisitos RNP APCH del procedimiento.",
          "La superación del valor RNP en el segmento final.",
          "La desconexión del piloto automático."
        ],
        "correcta": 1,
        "explicacion": "La definición es deliberadamente amplia: cualquier falla o suceso que impida satisfacer los requisitos del procedimiento. No hay que esperar la pérdida total de una fuente para concluir que la capacidad se perdió.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.7.1.8"
      },
      {
        "id": "p16-q3",
        "enunciado": "Una carta se titula «RNAV (GPS) RWY 13». ¿Qué especificación se está volando en el marco de la FAA?",
        "opciones": [
          "RNAV 1.",
          "RNP APCH.",
          "RNP AR APCH.",
          "No se puede saber por el título: siempre hay que leer las notas, y en el marco de la FAA ese título corresponde a RNP APCH."
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
          "LNAV.",
          "LNAV/VNAV, siempre.",
          "LPV y LP.",
          "Circling."
        ],
        "correcta": 2,
        "explicacion": "Para volar a mínimos LPV o LP se requiere aumentación satelital. LNAV/VNAV puede volarse con guía vertical barométrica aprobada para aproximación o con vertical satelital, así que no exige SBAS necesariamente.",
        "referencia": "FAA AIM 1-2-1, apartado RNP APCH; FAA AIM 5-4-5"
      },
      {
        "id": "p17-q2",
        "enunciado": "¿Es LP un modo degradado de LPV?",
        "opciones": [
          "Sí: cuando LPV no está disponible, el sistema revierte a LP.",
          "No: LP solo se publica cuando el terreno u otra razón impiden publicar un procedimiento con guía vertical, y no aparece junto a una línea con guía vertical aprobada.",
          "Sí, pero solo en aeropuertos sin ILS.",
          "No: LP es la línea vertical y LPV la lateral."
        ],
        "correcta": 1,
        "explicacion": "El AIM lo dice expresamente: LP no es un modo de reversión de LPV. Se publica solo donde no se puede publicar un procedimiento con guía vertical, y nunca junto a LNAV/VNAV o LPV.",
        "referencia": "FAA AIM 5-4-5, apartado LP"
      },
      {
        "id": "p17-q3",
        "enunciado": "La carta publica LPV, pero el AFM de tu avión no menciona esa capacidad. Estás autorizado al procedimiento por el ATC. ¿A qué línea puedes volar?",
        "opciones": [
          "A LPV: la autorización del ATC habilita cualquier línea publicada.",
          "A la línea para la que el avión esté certificado, que no es LPV.",
          "A ninguna: sin LPV el procedimiento no puede volarse.",
          "A LPV, aumentando la visibilidad mínima."
        ],
        "correcta": 1,
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
          "Sí, aumentando los mínimos.",
          "No: se requiere ajuste altimétrico local y actual del aeropuerto de aterrizaje; con ajuste remoto la función VNAV solo puede usarse hasta la MDA de LNAV.",
          "Sí, si la temperatura está dentro de límites.",
          "Sí, si el ATC lo autoriza."
        ],
        "correcta": 1,
        "explicacion": "La circular es explícita: el uso de Baro-VNAV hasta una DA no está autorizado con ajuste altimétrico remoto, y donde se publican mínimos con altímetro remoto la función VNAV puede usarse solo hasta la MDA de LNAV publicada.",
        "referencia": "FAA AC 90-105A, Apéndice B, numeral B.4.4"
      },
      {
        "id": "p18-q2",
        "enunciado": "¿Cuándo debe estar puesto el altímetro local del aeropuerto de aterrizaje?",
        "opciones": [
          "Antes de iniciar el descenso.",
          "No más tarde del punto de aproximación final.",
          "Al pasar la altitud de transición.",
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
          "Sí, si se ajusta la velocidad vertical al gradiente publicado.",
          "No: los modos como velocidad vertical no son aplicables a operaciones de aproximación Baro-VNAV.",
          "Sí, cuando el piloto automático está desacoplado.",
          "Sí, por debajo del FAF."
        ],
        "correcta": 1,
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
          "Vuelas a la DA de LNAV/VNAV: la limitación es orientativa.",
          "Vuelas a la MDA de LNAV.",
          "No puedes volar la aproximación.",
          "Sumas un margen a la DA y continúas."
        ],
        "correcta": 1,
        "explicacion": "Sin una función automática aprobada de compensación no se puede usar la línea LNAV/VNAV fuera del rango de temperatura, pero la línea LNAV sí puede usarse. La respuesta no es abandonar la aproximación: es cambiar de línea de mínimos.",
        "referencia": "FAA AC 90-105A, Apéndice B, numeral B.4.2; FAA AIM 5-4-5"
      },
      {
        "id": "p19-q2",
        "enunciado": "¿A quién no aplica la limitación de temperatura publicada para Baro-VNAV?",
        "opciones": [
          "A ninguna aeronave: aplica siempre.",
          "A quien vuela la aproximación a mínimos LNAV/VNAV con guía vertical satelital y tiene la aprobación de aeronavegabilidad correspondiente.",
          "A quien vuela con piloto automático acoplado.",
          "A quien tiene autorización del ATC para continuar."
        ],
        "correcta": 1,
        "explicacion": "La limitación existe porque la senda se construye con información barométrica. Si la guía vertical viene de aumentación satelital y el avión tiene esa aprobación, la limitación de temperatura publicada no le aplica.",
        "referencia": "FAA AIM 5-4-5, nota sobre la limitación de temperatura Baro-VNAV"
      },
      {
        "id": "p19-q3",
        "enunciado": "¿Dónde está el valor concreto de la limitación de temperatura de una aproximación?",
        "opciones": [
          "En el AFM del avión.",
          "En una tabla general de la autoridad.",
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
          "Un procedimiento de aproximación con guía vertical que sustituye a la línea LNAV.",
          "Una técnica de vuelo para el tramo de aproximación final de un procedimiento que no es de precisión, en descenso continuo y sin nivelaciones de altura.",
          "Una autorización específica del explotador para descender por debajo de la MDA.",
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
          "Operación 2D, y se vuela a la MDA.",
          "Operación 3D, y el procedimiento pasa a ser una APV con DA.",
          "Operación 3D, pero el procedimiento sigue siendo un NPA y se vuela a la MDA.",
          "Depende de que el operador tenga aprobación específica."
        ],
        "correcta": 2,
        "explicacion": "La nota del RAC es exacta: las CDFA con guía VNAV de asesoramiento calculada por el equipo de a bordo se consideran operaciones 3D, y con cálculo manual de la velocidad vertical, 2D. Pero la clasificación de la operación no cambia el procedimiento: sigue siendo un NPA y el mínimo sigue siendo la MDA.",
        "referencia": "RAC 91 y RAC 121, nota a la definición de procedimiento de aproximación que no es de precisión (NPA)"
      },
      {
        "id": "p20-q3",
        "enunciado": "Una carta de NPA lleva la nota «Visual Segment – Obstacles» en el perfil. ¿Qué significa?",
        "opciones": [
          "Que el segmento visual está balizado con luces de aproximación.",
          "Que el VDA se retiró porque hay una penetración de obstáculo que obligaría a desviarse de él entre la MDA y la toma.",
          "Que la aproximación solo puede volarse de día.",
          "Que el procedimiento exige guía vertical barométrica."
        ],
        "correcta": 1,
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
          "El valor RNP más una zona secundaria estándar.",
          "Dos veces el valor RNP, sin zona secundaria ni márgenes adicionales.",
          "Cuatro veces el valor RNP.",
          "La misma que RNP APCH."
        ],
        "correcta": 1,
        "explicacion": "Es lo que caracteriza a RNP AR: área lateral igual a dos veces el valor RNP, sin área lateral secundaria ni márgenes adicionales. Esa ausencia de colchón es la razón de las exigencias de autorización, equipo y entrenamiento.",
        "referencia": "FAA AIM 5-4-18, apartado de valor RNP"
      },
      {
        "id": "p21-q2",
        "enunciado": "La carta de una RNP AR publica una línea de mínimos con RNP 0.15. ¿Puedes volarla?",
        "opciones": [
          "Sí, si el avión es elegible para RNP AR.",
          "Sí, si el ATC te autoriza el procedimiento.",
          "Solo si la autorización de tu operador permite ese valor con la configuración prevista.",
          "No: RNP AR exige siempre RNP 0.30."
        ],
        "correcta": 2,
        "explicacion": "Cada autorización identifica un valor RNP mínimo autorizado, y ese valor puede variar según la configuración de la aeronave o los procedimientos operacionales, por ejemplo con director de vuelo con o sin piloto automático. La carta publica la línea; la autorización dice a qué valor se puede volar.",
        "referencia": "FAA AIM 5-4-18; FAA AC 90-101A, Apéndice, numeral 2, apartado a"
      },
      {
        "id": "p21-q3",
        "enunciado": "¿Qué hay que confirmar antes de iniciar una aproximación RNP AR con gradiente de frustrada no estándar?",
        "opciones": [
          "Nada especial: el gradiente lo calcula el FMS.",
          "Que se puede cumplir ese requisito, porque la carta refleja los valores no estándar y el piloto debe confirmarlo antes de comenzar.",
          "Que el ATC acepta una frustrada con gradiente reducido.",
          "Que la temperatura está dentro de límites."
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
          "Que RNP AR usa un valor RNP más bajo.",
          "Que RNP AR exige autorización específica y su área de obstáculos no tiene zona secundaria: el margen lo pone la performance del avión y el pilotaje.",
          "Que RNP APCH no admite guía vertical.",
          "Que RNP AR solo se vuela con aumentación satelital."
        ],
        "correcta": 1,
        "explicacion": "El valor más bajo es una consecuencia del diseño, no la definición. Lo que define RNP AR es la autorización específica, sin excepciones, y un área lateral de evaluación de obstáculos de dos veces el valor RNP sin zona secundaria.",
        "referencia": "FAA AIM 5-4-18; FAA AC 90-101A, numeral 1"
      },
      {
        "id": "p22-q2",
        "enunciado": "¿Cómo se trata la elegibilidad de tramo RF en cada especificación?",
        "opciones": [
          "Obligatoria en las dos.",
          "Opcional en las dos.",
          "Opcional en RNP APCH y obligatoria en cualquier autorización RNP AR.",
          "Obligatoria en RNP APCH y opcional en RNP AR."
        ],
        "correcta": 2,
        "explicacion": "En RNP APCH la capacidad RF es opcional y hay que verla listada como característica del equipo. En RNP AR, la elegibilidad para tramos RF es requerida en cualquier autorización, porque muchos de esos procedimientos los contienen.",
        "referencia": "FAA AIM 1-2-1, apartado RNP APCH; FAA AIM 5-4-18, apartado de tramos RF"
      },
      {
        "id": "p22-q3",
        "enunciado": "¿En qué se basa la performance de navegación vertical de una RNP AR APCH?",
        "opciones": [
          "Solo en guía vertical satelital.",
          "Solo en guía vertical barométrica.",
          "En guía vertical barométrica o en aumentación satelital.",
          "En el radioaltímetro."
        ],
        "correcta": 2,
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
          "Un giro cerrado que el FMS ejecuta al anticipar un waypoint.",
          "Una trayectoria circular de radio constante alrededor de un centro de giro definido, que empieza y termina en un punto.",
          "Un tramo que se vuela con rumbo constante hasta interceptar una derrota.",
          "Un procedimiento de espera de radio reducido."
        ],
        "correcta": 1,
        "explicacion": "Es la definición literal. La clave operacional es que el arco es la trayectoria publicada y protegida, no una consecuencia de cómo el avión toma el giro.",
        "referencia": "FAA AC 90-101A, numeral 3, apartado g; FAA AIM 1-2-1"
      },
      {
        "id": "p23-q2",
        "enunciado": "¿Por qué importa la velocidad en un tramo RF?",
        "opciones": [
          "Porque afecta el consumo de combustible.",
          "Porque un arco de radio fijo volado por encima de la velocidad prevista exige más inclinación y el avión no consigue quedarse en el arco.",
          "Porque el ATC calcula la separación con la velocidad publicada.",
          "No importa: el FMS ajusta el radio a la velocidad real."
        ],
        "correcta": 1,
        "explicacion": "El radio está definido, así que la única variable es la inclinación necesaria para seguirlo. La circular enumera entre los conocimientos requeridos la importancia de mantener la trayectoria publicada y las velocidades máximas en operaciones RNP con tramos RF.",
        "referencia": "FAA AC 90-105A, numeral 8.4.3, apartado 14"
      },
      {
        "id": "p23-q3",
        "enunciado": "Tu avión es elegible para RNP APCH. ¿Puedes volar una aproximación RNP APCH con un tramo RF?",
        "opciones": [
          "Sí: la elegibilidad RNP APCH incluye los tramos RF.",
          "Solo si los tramos RF figuran listados como característica del equipo de aviónica.",
          "No: los tramos RF son exclusivos de RNP AR.",
          "Sí, si el piloto automático está acoplado."
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
          "El fly-by se sobrevuela y el fly-over se anticipa.",
          "En el fly-by el giro empieza antes del punto; en el fly-over hay que sobrevolar el punto antes de empezar el giro.",
          "El fly-over solo existe en procedimientos convencionales.",
          "El fly-by exige piloto automático y el fly-over no."
        ],
        "correcta": 1,
        "explicacion": "Es la definición: el fly-by se usa cuando el avión debe empezar el giro hacia la derrota siguiente antes de llegar al punto que separa los tramos, lo que se llama anticipación del giro; el fly-over, cuando debe volar sobre el punto antes de iniciar el giro.",
        "referencia": "FAA AIM 1-2-2, apartados de waypoints"
      },
      {
        "id": "p24-q2",
        "enunciado": "El sistema de navegación no proporciona guía de anticipación de giro para un punto fly-by. ¿Qué corresponde?",
        "opciones": [
          "Tratar el punto como fly-over.",
          "Ejecutar la anticipación del giro manualmente.",
          "Solicitar vectores al ATC.",
          "Insertar un directo al punto siguiente."
        ],
        "correcta": 1,
        "explicacion": "El AIM lo dice expresamente: donde el sistema de navegación no proporciona esa guía, el piloto debe ejecutar la anticipación del giro o el sobrevuelo del punto manualmente. La simbología de la carta existe justamente para dar esa conciencia.",
        "referencia": "FAA AIM 5-4-5, apartado de waypoints"
      },
      {
        "id": "p24-q3",
        "enunciado": "¿De qué depende la anticipación del giro en un punto fly-by?",
        "opciones": [
          "Solo del ángulo entre las dos derrotas.",
          "De la velocidad y la altitud, entre otros factores.",
          "Del valor RNP del segmento.",
          "Del tipo de piloto automático instalado."
        ],
        "correcta": 1,
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
          "Un arco de radio constante.",
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
          "Para poder codificar procedimientos en el FMS.",
          "Porque el comportamiento del avión en una transición depende de cómo está codificado el tramo, y eso explica trayectorias inesperadas.",
          "Porque el ATC los nombra en las autorizaciones.",
          "Porque determinan el valor RNP del segmento."
        ],
        "correcta": 1,
        "explicacion": "La circular incluye entre los conocimientos requeridos la representación de los terminadores de tramo y las trayectorias asociadas. No se trata de codificar nada: se trata de tener una explicación cuando la trayectoria no es la esperada.",
        "referencia": "FAA AC 90-105A, numeral 8.4.3, apartado 15"
      },
      {
        "id": "p25-q3",
        "enunciado": "¿Qué dice la norma sobre la sustitución de terminadores de tramo por parte del proveedor de la base de datos?",
        "opciones": [
          "Que puede sustituirlos si mejora la codificación.",
          "Que no debe sustituirlos por otros distintos de los especificados en los datos originales del AIP del Estado.",
          "Que debe sustituirlos siempre por TF, que es el más simple.",
          "Que la sustitución la autoriza el operador."
        ],
        "correcta": 1,
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
          "Para vigilar el error técnico de vuelo.",
          "Para determinar el valor RNP del segmento.",
          "Para verificar el ajuste altimétrico."
        ],
        "correcta": 1,
        "explicacion": "La circular pide seleccionar las presentaciones que permitan vigilar la derrota calculada y la posición del avión respecto de la trayectoria, la desviación lateral, para vigilar el error técnico de vuelo. Es la vigilancia que hace el piloto, no el sistema.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.7.2.2"
      },
      {
        "id": "p26-q2",
        "enunciado": "Estás perfectamente centrado en la presentación de desviación lateral. ¿Qué garantiza eso?",
        "opciones": [
          "Que el avión está sobre la trayectoria publicada, en el mundo real.",
          "Que el avión está sobre la trayectoria calculada respecto de la posición que el sistema estima.",
          "Que el error total del sistema es cero.",
          "Que la performance requerida se está cumpliendo."
        ],
        "correcta": 1,
        "explicacion": "La indicación se construye sobre la posición estimada. Si esa estimación tiene error, el avión puede estar centrado en pantalla y desplazado respecto de la posición verdadera: es la diferencia entre error técnico de vuelo y error del sistema de navegación.",
        "referencia": "FAA AC 90-105A, numerales 4.3.1 a 4.3.4"
      },
      {
        "id": "p26-q3",
        "enunciado": "¿Qué ocurre con la sensibilidad de la presentación de desviación lateral?",
        "opciones": [
          "Es fija para todas las fases de vuelo.",
          "Cambia con la fase, y el piloto debe saber qué escalado está activo.",
          "La fija el ATC según la densidad de tráfico.",
          "Solo cambia en procedimientos RNP AR."
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
          "El mayor de los tres errores componentes.",
          "La diferencia entre la posición verdadera y la posición deseada, igual a la suma vectorial de FTE, PDE y NSE.",
          "La diferencia entre la posición estimada y la posición deseada.",
          "El error de pilotaje más el error de la base de datos."
        ],
        "correcta": 1,
        "explicacion": "Es la definición literal: diferencia entre la posición verdadera y la deseada, igual a la suma vectorial de los tres componentes. No es el mayor de ellos ni una suma de dos.",
        "referencia": "FAA AC 90-105A, numeral 4.3.4"
      },
      {
        "id": "p27-q2",
        "enunciado": "¿Qué vigila la función de control y alerta a bordo?",
        "opciones": [
          "El error técnico de vuelo.",
          "El error del sistema de navegación, con un algoritmo de control y alerta; el error técnico de vuelo lo vigila la tripulación con la presentación de desviación lateral.",
          "Los tres componentes del error total.",
          "El error de definición de la trayectoria."
        ],
        "correcta": 1,
        "explicacion": "La circular lo aclara expresamente: cumplir el requisito de control y alerta no implica un control automático del error técnico de vuelo. La función debe consistir al menos en un algoritmo de control y alerta del NSE y en una presentación de desviación lateral que permita a la tripulación vigilar el FTE.",
        "referencia": "FAA AC 90-105A, nota al numeral 4.2"
      },
      {
        "id": "p27-q3",
        "enunciado": "¿Por qué se considera despreciable el error de definición de la trayectoria (PDE)?",
        "opciones": [
          "Porque es imposible de medir.",
          "Por el proceso de integridad de la base de datos y los procedimientos de tripulación.",
          "Porque el FMS lo compensa automáticamente.",
          "Porque solo aparece en procedimientos convencionales."
        ],
        "correcta": 1,
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
          "Solo en GNSS.",
          "En una radioayuda convencional, por ejemplo VOR, DME o NDB.",
          "En sistemas DME/DME.",
          "Solo en aumentación satelital."
        ],
        "correcta": 1,
        "explicacion": "La circular dice que el GPS es el sistema primario para RNP APCH, que los sistemas basados en DME/DME no son aceptables, y que el segmento de frustrada puede basarse en una radioayuda convencional como VOR, DME o NDB. De ahí la necesidad de tenerla sintonizada y verificada.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.5.1"
      },
      {
        "id": "p28-q2",
        "enunciado": "¿Qué valor RNP aplica al segmento de frustrada en RNP APCH?",
        "opciones": [
          "0.3",
          "0.5",
          "1",
          "2"
        ],
        "correcta": 2,
        "explicacion": "El valor se estrecha a 0.3 en la final y **vuelve a 1** en la frustrada. Es la mejor prueba de que el valor pertenece al segmento y no al procedimiento.",
        "referencia": "FAA AC 90-105A, numeral 5.1 y Tabla 5-1"
      },
      {
        "id": "p28-q3",
        "enunciado": "Una RNP AR exige una frustrada con valor menor de 1.00 NM. ¿Qué implica?",
        "opciones": [
          "Nada especial: cualquier avión RNP AR puede volarla.",
          "Que típicamente requiere equipo redundante y que la autorización del operador debe especificar si puede volarla.",
          "Que la frustrada se vuela con vectores del ATC.",
          "Que el valor de la final también debe ser menor de 1.00."
        ],
        "correcta": 1,
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
          "Un receptor GNSS con pantalla.",
          "Un sistema integrado con sensores, receptor y computador, con bases de datos de navegación y de performance, que proporciona guía de performance y de navegación de área.",
          "La base de datos de navegación del avión.",
          "El computador que calcula la posición GNSS."
        ],
        "correcta": 1,
        "explicacion": "Es la definición literal, y lo relevante es la palabra integrado: el FMS junta sensores, datos y guía, así que una degradación en cualquiera de esas entradas se traslada a la guía que entrega.",
        "referencia": "FAA AC 90-101A, numeral 3, apartado c"
      },
      {
        "id": "p29-q2",
        "enunciado": "¿Qué añade el FMS en una operación con especificación RNP que no necesita en una RNAV?",
        "opciones": [
          "El cálculo de la posición.",
          "La guía lateral.",
          "El control de la performance y la alerta a la tripulación.",
          "La base de datos de navegación."
        ],
        "correcta": 2,
        "explicacion": "El cálculo de posición, la guía lateral y la base de datos hacen falta en las dos familias. Lo que caracteriza RNP es el control de la performance conseguida y la identificación para el piloto de si el requisito operacional se está cumpliendo.",
        "referencia": "RAC 91, definición de especificación RNP; FAA AC 90-105A, numeral 4.2"
      },
      {
        "id": "p29-q3",
        "enunciado": "«El FMS reemplaza la carta.» ¿Por qué es falso?",
        "opciones": [
          "Porque la carta tiene información que el FMS no puede mostrar.",
          "Porque el FMS ejecuta lo que se le programó y la carta es la referencia contra la que se verifica lo que va a hacer.",
          "Porque el FMS no incluye las restricciones de altitud.",
          "Porque la carta es obligatoria por norma y el FMS no."
        ],
        "correcta": 1,
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
          "El error real de posición del avión.",
          "La performance de estimación de posición actual, como indicación estadística definida del error potencial, en millas náuticas.",
          "El valor RNP requerido por el procedimiento.",
          "La desviación lateral respecto de la trayectoria."
        ],
        "correcta": 1,
        "explicacion": "La definición es explícita: una medida sobre una escala definida, en millas náuticas, que expresa la performance de estimación de posición actual, y **no** es una estimación del error real sino una indicación estadística definida.",
        "referencia": "FAA AC 90-105A, Apéndice J, definición de EPU; FAA AC 90-101A, numeral 3, apartado b"
      },
      {
        "id": "p30-q2",
        "enunciado": "¿Es obligatorio que el PFD muestre un valor de ANP o EPE?",
        "opciones": [
          "Sí, en todas las operaciones RNP.",
          "Sí, en operaciones RNP AR.",
          "No: lo que las presentaciones deben proporcionar es una alerta si la RNP de la operación no puede cumplirse.",
          "No, salvo que el operador lo solicite."
        ],
        "correcta": 2,
        "explicacion": "La circular dice que no es necesario que las presentaciones de navegación, en particular los PFD, incluyan un valor de ANP o EPE: solo necesitan proporcionar una alerta si la RNP de la operación no puede cumplirse. El requisito es el aviso, no el número.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.3.8, apartado 6"
      },
      {
        "id": "p30-q3",
        "enunciado": "Tu FMS muestra «RNP 1.0» y «ANP 0.08». ¿Qué está diciendo?",
        "opciones": [
          "Que el avión está a 0,08 NM de su posición verdadera.",
          "Que la performance requerida es 1.0 y la indicación estadística de incertidumbre de posición del sistema vale 0.08.",
          "Que la desviación lateral es de 0,08 NM.",
          "Que el valor RNP se puede reducir a 0.08."
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
          "Informar al ATC, identificar la falla, volar el avión y consultar el QRH.",
          "Volar el avión, reconocer la alerta, contrastar la posición, aplicar QRH y SOP, determinar la capacidad que queda, concluir si todavía se cumple lo exigido e informar al ATC.",
          "Frustrar de inmediato y comunicar al aterrizar.",
          "Reducir el valor RNP en el FMS y continuar."
        ],
        "correcta": 1,
        "explicacion": "Aviar, navegar, comunicar, con la pregunta decisiva en el penúltimo lugar: si la especificación exigida todavía se puede cumplir. Reducir el valor RNP en el FMS no es una opción: el valor lo fija el procedimiento.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.7.1.8 y numeral 8.4.3, apartado 23"
      },
      {
        "id": "p31-q2",
        "enunciado": "¿Dónde se busca el significado exacto del mensaje que muestra el avión y la acción asociada?",
        "opciones": [
          "En la circular de la autoridad.",
          "En la carta del procedimiento.",
          "En el FCOM y el QRH de la flota.",
          "En el AIP del Estado."
        ],
        "correcta": 2,
        "explicacion": "La presentación depende del fabricante y del modelo, y la propia circular anima a usar el entrenamiento y los procedimientos operacionales recomendados por el fabricante. La norma da el marco; el mensaje concreto está en la documentación del avión.",
        "referencia": "FAA AC 90-105A, nota al numeral 8.4.3; práctica estándar de documentación de fabricante"
      },
      {
        "id": "p31-q3",
        "enunciado": "¿Qué es lo que distingue a una tripulación preparada en este escenario?",
        "opciones": [
          "Reconocer el mensaje más rápido.",
          "Poder concluir si la especificación que exige el segmento todavía se puede cumplir, porque sabe qué exige.",
          "Aplicar el QRH de memoria.",
          "Informar al ATC antes de actuar."
        ],
        "correcta": 1,
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
          "No usar la base de datos para conducir esa operación.",
          "Introducir la enmienda a mano en el FMS.",
          "Volar el procedimiento y reportar la diferencia al aterrizar."
        ],
        "correcta": 1,
        "explicacion": "La norma es explícita: si se publica una carta enmendada cuya enmienda no está en la base de datos, la base no debe usarse para conducir la operación. Introducir la enmienda a mano no es una solución aceptable.",
        "referencia": "FAA AC 90-105A, nota al numeral 10.4"
      },
      {
        "id": "p32-q2",
        "enunciado": "¿Qué debe confirmar el piloto de un operador de transporte en la inicialización del sistema?",
        "opciones": [
          "Que el procedimiento de destino está cargado.",
          "Que la base de datos de navegación es actual.",
          "Que el valor RNP está fijado.",
          "Que los sensores están todos operativos."
        ],
        "correcta": 1,
        "explicacion": "El programa de base de datos del operador exige que los pilotos confirmen, en la inicialización del sistema, que la base es actual. Las otras verificaciones existen, pero esta es la que la norma sitúa en la inicialización.",
        "referencia": "FAA AC 90-105A, numeral 10.7, apartado 4"
      },
      {
        "id": "p32-q3",
        "enunciado": "Encuentras un error en la codificación de un procedimiento. ¿Qué exige la norma?",
        "opciones": [
          "Corregirlo en el FMS y continuar.",
          "Reportarlo al proveedor de la base de datos y prohibir el uso del procedimiento afectado mediante un aviso a las tripulaciones, hasta que el operador lo restablezca.",
          "Reportarlo al ATC.",
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
          "Cancelar el vuelo.",
          "Que operadores y pilotos establezcan procedimientos para asegurar la exactitud de los datos, incluida la idoneidad de las instalaciones usadas para definir rutas y procedimientos.",
          "Cargar las dos bases de datos simultáneamente.",
          "Nada: la base activa vale hasta el aterrizaje."
        ],
        "correcta": 1,
        "explicacion": "Se espera que los datos sean actuales durante todo el vuelo, y si el ciclo cambia en vuelo hay que establecer procedimientos para asegurar la exactitud. La norma menciona como medio aceptable comparar las cartas nueva y antigua para verificar los puntos antes de salir.",
        "referencia": "FAA AC 90-105A, nota al numeral 10.4"
      },
      {
        "id": "p33-q2",
        "enunciado": "La base de datos no está dentro del ciclo esperado. ¿Cuál es la respuesta profesional?",
        "opciones": [
          "«No go», siempre.",
          "Volar y verificar cada punto contra la carta.",
          "Consultar MEL, SOP, autorización del operador, tipo de operación y regulación aplicable antes de decidir.",
          "Cargar el procedimiento a mano."
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
          "Ejecutarlo de inmediato para que el sistema lo secuencie.",
          "Usar las capacidades de la aviónica para verificar los datos de puntos y de derrota.",
          "Compararlo con el plan operacional de vuelo.",
          "Confirmar el ciclo AIRAC."
        ],
        "correcta": 1,
        "explicacion": "El AIM lo pide expresamente: usar las capacidades de la aviónica para verificar los datos apropiados de puntos y derrota después de cargar el procedimiento desde la base de datos. Cargar y verificar son dos pasos distintos.",
        "referencia": "FAA AIM 1-2-1, apartado general de RNP"
      },
      {
        "id": "p34-q2",
        "enunciado": "¿Qué significa que el FMS muestre una ruta completa y sin discontinuidades?",
        "opciones": [
          "Que la ruta está autorizada.",
          "Que la ruta es la publicada.",
          "Que el sistema pudo construirla con los datos que tenía.",
          "Que el avión es elegible para volarla."
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
          "Sí, si hay dos instalaciones DME en cobertura.",
          "No: el GPS es el sistema primario y los sistemas basados en DME/DME no son aceptables.",
          "Sí, para el segmento final únicamente.",
          "Sí, si se combinan con inercial."
        ],
        "correcta": 1,
        "explicacion": "La circular es explícita: el GPS es el sistema de navegación primario para RNP APCH y los sistemas basados en DME/DME no son aceptables. Lo que sí puede apoyarse en radioayuda convencional es el segmento de frustrada.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.5.1"
      },
      {
        "id": "p35-q2",
        "enunciado": "¿Qué papel cumple el inercial en una solución DME/DME/IRU?",
        "opciones": [
          "Sustituir al DME durante todo el vuelo.",
          "Proporcionar información de posición suficiente durante huecos limitados de cobertura DME.",
          "Corregir el error del GNSS.",
          "Generar la guía vertical."
        ],
        "correcta": 1,
        "explicacion": "La definición habla de huecos limitados de cobertura DME. El inercial cubre un tramo sin instalaciones, no reemplaza la infraestructura, y esa limitación es lo que hay que tener presente al perder DME.",
        "referencia": "FAA AC 90-105A, Apéndice J, definición de DME/DME/IRU"
      },
      {
        "id": "p35-q3",
        "enunciado": "«Si pierdo GNSS pierdo automáticamente toda capacidad RNAV.» ¿Por qué es incorrecto?",
        "opciones": [
          "Porque el GNSS nunca se pierde por completo.",
          "Porque las fuentes admitidas dependen de la especificación, y algunas admiten DME/DME, VOR/DME o inercial.",
          "Porque el inercial sustituye al GNSS indefinidamente.",
          "Porque el ATC puede autorizar la continuación."
        ],
        "correcta": 1,
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
          "Solo el GPS.",
          "GPS, aumentación satelital, aumentación basada en tierra, GLONASS, Galileo y otros sistemas aprobados para uso civil.",
          "GPS y sistemas inerciales.",
          "GPS y DME/DME."
        ],
        "correcta": 1,
        "explicacion": "La circular enumera GPS, SBAS como WAAS, GBAS como LAAS, GLONASS, Galileo y cualquier otro sistema de navegación por satélite aprobado para uso civil, y añade que el GNSS puede aumentarse según sea necesario para apoyar la RNP de la fase de operación.",
        "referencia": "FAA AC 90-101A, numeral 3, apartado e"
      },
      {
        "id": "p36-q2",
        "enunciado": "¿Qué hay que confirmar sobre la infraestructura antes de una operación RNP?",
        "opciones": [
          "Que el GNSS está operativo en el momento del despegue.",
          "La disponibilidad de la infraestructura necesaria para las rutas, procedimientos o aproximaciones previstas, incluidas las contingencias no RNP, para el periodo de la operación.",
          "Que hay al menos cuatro satélites visibles.",
          "Que el ATC tiene cobertura radar."
        ],
        "correcta": 1,
        "explicacion": "La circular pide confirmar la disponibilidad para el periodo de las operaciones previstas usando toda la información disponible, y menciona expresamente las contingencias no RNP. El plan B también necesita infraestructura.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.7.1.7"
      },
      {
        "id": "p36-q3",
        "enunciado": "¿Por qué una degradación de GNSS puede producir una indicación errónea de combustible insuficiente?",
        "opciones": [
          "Porque el GNSS mide el consumo.",
          "Porque hay funciones del FMS dependientes de la posición, y una posición errónea produce predicciones erróneas.",
          "Porque el FMS desconecta el cálculo de combustible al perder GNSS.",
          "No puede: son sistemas independientes."
        ],
        "correcta": 1,
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
          "Un sistema de aumentación satelital.",
          "Un algoritmo que verifica la integridad de la salida de posición usando mediciones GPS, o mediciones GPS más ayuda barométrica.",
          "La precisión del receptor GPS.",
          "El control de la performance a bordo exigido por las especificaciones RNP."
        ],
        "correcta": 1,
        "explicacion": "Es la definición literal, y lo importante es que es integridad: comprobar si la posición es confiable, no mejorar su precisión. La aumentación satelital es otra cosa y el control de la performance a bordo es un requisito de especificación, más amplio.",
        "referencia": "FAA AC 90-101A, numeral 3, apartado h"
      },
      {
        "id": "p37-q2",
        "enunciado": "¿Es obligatoria la predicción RAIM en toda operación RNP?",
        "opciones": [
          "Sí, en todas.",
          "Sí, en todas las que usen GNSS.",
          "No: se obtiene cuando corresponda, y eso depende de la especificación, el equipo, el operador y la región.",
          "No: nunca se exige en aviones de transporte."
        ],
        "correcta": 2,
        "explicacion": "La circular lo formula como exigencia condicional: obtener una predicción RAIM para la operación RNP prevista si corresponde. Presentarla como requisito universal es incorrecto, y negar que exista también.",
        "referencia": "FAA AC 90-105A, numeral 8.4.4, apartado 2; FAA AIM 5-1-16"
      },
      {
        "id": "p37-q3",
        "enunciado": "¿Qué añade FDE sobre RAIM?",
        "opciones": [
          "Mejora la precisión de la posición.",
          "Puede detectar y excluir automáticamente un satélite defectuoso de la solución de posición cuando hay mediciones redundantes suficientes.",
          "Proporciona guía vertical.",
          "Sustituye la necesidad de aumentación satelital."
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
          "Declarar emergencia.",
          "Desconectar el piloto automático.",
          "Verificar la posición del avión por medio de radioayudas convencionales, cuando estén disponibles.",
          "Solicitar al ATC la posición radar."
        ],
        "correcta": 2,
        "explicacion": "La recomendación es estar atento a las indicaciones según la guía del fabricante y verificar la posición con radioayudas convencionales cuando estén disponibles. El contraste es lo primero, porque de él sale todo lo demás, incluida la decisión de qué informar.",
        "referencia": "FAA AIM 1-2-4, recomendaciones durante el vuelo"
      },
      {
        "id": "p38-q2",
        "enunciado": "¿Por qué el piloto puede no advertir una suplantación de señal?",
        "opciones": [
          "Porque el sistema desconecta las alertas.",
          "Porque el RAIM es solo parcialmente efectivo frente a ese tipo de disrupción, de modo que puede no haber indicación de navegación errónea.",
          "Porque el corrimiento de posición es siempre pequeño.",
          "Porque el ATC no informa."
        ],
        "correcta": 1,
        "explicacion": "La FAA advierte que el RAIM es solo parcialmente efectivo frente a una disrupción que actúa como suplantación, que el piloto puede no advertir ninguna indicación errónea y que el ATC puede ser el único medio disponible para identificarla.",
        "referencia": "FAA AIM 1-1-19, apartado sobre disrupciones de GPS"
      },
      {
        "id": "p38-q3",
        "enunciado": "¿Qué recomendación de planificación previa al vuelo se relaciona con el combustible?",
        "opciones": [
          "Ninguna: el combustible no se ve afectado.",
          "Planificar contingencias de combustible, porque revertir a procedimientos convencionales puede costar millas, tiempo y otro alterno.",
          "Cargar combustible mínimo para reducir peso.",
          "Solicitar al ATC ruta directa."
        ],
        "correcta": 1,
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
          "Solo seguir la trayectoria lateral publicada.",
          "Cumplir la trayectoria lateral del procedimiento y las restricciones de velocidad y altitud asociadas a lo largo de la ruta autorizada.",
          "Mantener la altitud asignada e ignorar las restricciones publicadas.",
          "Ascender a la altitud de crucero final sin restricciones."
        ],
        "correcta": 1,
        "explicacion": "Es una autorización abreviada que exige cumplir la trayectoria lateral y las restricciones de velocidad y altitud. Y es fraseología de la FAA: en otro Estado hay que usar lo que publique su AIP.",
        "referencia": "FAA AIM 5-2-9, apartado de autorización «climb via»"
      },
      {
        "id": "p39-q2",
        "enunciado": "¿Qué se verifica en una SID PBN que no se verificaría en una SID convencional?",
        "opciones": [
          "La frecuencia de la torre.",
          "La especificación de navegación requerida y las funciones que exija, como los tramos RF.",
          "El gradiente de ascenso.",
          "La longitud de pista."
        ],
        "correcta": 1,
        "explicacion": "Lo que añade el procedimiento PBN es el requisito de performance y las funciones necesarias, que están en las notas o en el recuadro PBN. El resto de las verificaciones de una salida siguen aplicando igual.",
        "referencia": "FAA AIM 1-2-3; FAA AC 90-100A, numeral 10"
      },
      {
        "id": "p39-q3",
        "enunciado": "¿Cuál es el error más frecuente en la preparación de una SID PBN?",
        "opciones": [
          "Calcular mal el gradiente.",
          "Cargar el procedimiento correcto con la transición o la pista equivocadas.",
          "No sintonizar el VOR de salida.",
          "Seleccionar el modo vertical inadecuado."
        ],
        "correcta": 1,
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
          "Siguen vigentes: la STAR no se cancela con unos vectores.",
          "Quedan canceladas junto con la STAR, y se recibirá una altitud que mantener y, si hace falta, una velocidad.",
          "Siguen vigentes solo las de velocidad.",
          "Quedan a criterio del piloto."
        ],
        "correcta": 1,
        "explicacion": "Si se vectorea o se autoriza a desviarse de una STAR, el piloto debe considerarla cancelada, y las restricciones de altitud, de velocidad y la nota de transición de Mach a velocidad indicada quedan canceladas también.",
        "referencia": "FAA AIM 5-4-1, apartado de rutas con STAR"
      },
      {
        "id": "p40-q2",
        "enunciado": "¿Cómo se sabe que el ATC pretende volver a meter al avión en la STAR?",
        "opciones": [
          "Se asume siempre.",
          "Porque el controlador avisa dónde esperar reanudar el procedimiento.",
          "Porque el FMS conserva la secuencia.",
          "Porque la altitud asignada coincide con una restricción publicada."
        ],
        "correcta": 1,
        "explicacion": "Si el ATC piensa autorizar de nuevo el procedimiento, avisará dónde esperar reanudarlo, y el piloto debe prepararse para reincorporarse en el punto o tramo siguiente. Que el FMS conserve la secuencia no significa que la autorización siga vigente.",
        "referencia": "FAA AIM 5-4-1, apartado de rutas con STAR"
      },
      {
        "id": "p40-q3",
        "enunciado": "En el marco de la FAA, ¿qué altitud se mantiene cuando la ruta autorizada incluye una STAR?",
        "opciones": [
          "La primera altitud publicada en la STAR.",
          "La última altitud asignada, hasta recibir autorización para descender cumpliendo las restricciones publicadas o emitidas.",
          "La altitud de crucero del plan de vuelo.",
          "La altitud mínima de sector."
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
          "La distancia al punto.",
          "A qué punto exactamente se está autorizado, colacionado y comparado con la carta.",
          "El viento en ruta.",
          "La altitud mínima de sector."
        ],
        "correcta": 1,
        "explicacion": "Los nombres de cinco letras se parecen y se oyen mal en frecuencia cargada. Un directo al punto equivocado cambia la trayectoria, el perfil y la preparación de la aproximación, y todo eso con el FMS funcionando perfectamente.",
        "referencia": "FAA AC 90-105A, numeral 8.4.3, apartado 22; práctica estándar de colación"
      },
      {
        "id": "p41-q2",
        "enunciado": "¿Qué efecto puede tener seleccionar la opción de «vectores a final» en una aproximación?",
        "opciones": [
          "Ninguno: solo cambia la presentación.",
          "Puede impedir que se carguen los puntos situados fuera del FAF, con el aumento de carga de trabajo de volver a programar.",
          "Cancela la aproximación en el FMS.",
          "Fija automáticamente el valor RNP del segmento final."
        ],
        "correcta": 1,
        "explicacion": "El AIM lo desaconseja precisamente por eso: la selección puede impedir que los puntos fuera del FAF se carguen en el sistema RNAV, y eso obliga a reprogramar con más carga de trabajo.",
        "referencia": "FAA AIM 5-4-6, nota sobre la selección de vectores a final"
      },
      {
        "id": "p41-q3",
        "enunciado": "El ATC te pide un desplazamiento lateral paralelo y tu sistema no tiene esa funcionalidad. ¿Qué haces?",
        "opciones": [
          "Vuelas un rumbo aproximado para conseguir el desplazamiento.",
          "Avisas al ATC de que la funcionalidad no está disponible.",
          "Aceptas y lo resuelves con el piloto automático en modo rumbo.",
          "Solicitas vectores."
        ],
        "correcta": 1,
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
          "Radar de meteorología a bordo.",
          "PBN aprobado, con los detalles en la casilla 18.",
          "RNAV aprobado únicamente.",
          "RVSM aprobado."
        ],
        "correcta": 1,
        "explicacion": "La R declara PBN aprobado y remite a la casilla 18 para el detalle. RVSM se declara con la W, que es otra letra, y confundirlas es un error que se oye con frecuencia.",
        "referencia": "OACI PANS-ATM, Apéndice 2, casilla 10, código R"
      },
      {
        "id": "p42-q2",
        "enunciado": "¿Qué diferencia hay entre los códigos `S1` y `S2`?",
        "opciones": [
          "`S1` es RNP APCH y `S2` es RNP AR APCH.",
          "`S1` es RNP APCH y `S2` es RNP APCH con Baro-VNAV.",
          "`S1` es con GNSS y `S2` con DME/DME.",
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
          "Los que hagan falta.",
          "Hasta 4 entradas.",
          "Hasta 8 entradas, con un total de no más de 16 caracteres.",
          "Hasta 16 entradas."
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
          "Para facilitar el trabajo de mantenimiento.",
          "Porque un avión puede quedar despachable y haber perdido una capacidad PBN concreta.",
          "Para declarar la capacidad en el plan de vuelo.",
          "Porque la MEL sustituye al AFM."
        ],
        "correcta": 1,
        "explicacion": "Las dos normas exigen contar con esa información cuando la aeronave se opera de acuerdo con la MEL. Es el reconocimiento normativo de que el despacho y la capacidad PBN son cosas distintas.",
        "referencia": "RAC 91, numeral 91.1015, apartado (a)(3); RAC 121, numeral 121.995, apartado (b)(1)(iii)"
      },
      {
        "id": "p43-q2",
        "enunciado": "¿Cuándo pasa a ser obligatorio el acoplamiento del piloto automático o del director de vuelo en RNP APCH?",
        "opciones": [
          "Siempre.",
          "Nunca: es una recomendación.",
          "Cuando el error total del sistema lateral no puede demostrarse sin esos sistemas.",
          "Solo en aproximaciones con tramo RF."
        ],
        "correcta": 2,
        "explicacion": "Se recomienda el acoplamiento, y si el error total del sistema lateral no puede demostrarse sin esos sistemas, el acoplamiento se vuelve obligatorio y la guía operacional debe indicarlo. En esas aeronaves, un piloto automático inoperativo quita la capacidad.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.3.9"
      },
      {
        "id": "p43-q3",
        "enunciado": "Hay dos ítems de MEL abiertos, cada uno aceptable por separado. ¿Cómo se evalúa el efecto conjunto sobre PBN?",
        "opciones": [
          "Sumando las restricciones de cada uno.",
          "Tomando la más restrictiva.",
          "Revisando si la lista prohíbe la combinación o cambia el efecto, porque las restricciones no son aditivas.",
          "Consultando al ATC antes del despacho."
        ],
        "correcta": 2,
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
          "Ejecutar, verificar, vigilar, seleccionar.",
          "Seleccionar, ejecutar, verificar, vigilar.",
          "Seleccionar, verificar, ejecutar, vigilar.",
          "Verificar, seleccionar, ejecutar, vigilar."
        ],
        "correcta": 2,
        "explicacion": "La verificación va antes de ejecutar, porque ejecutar es el punto sin retorno. La norma pide verificar los datos de puntos y derrota después de cargar y antes de usar el procedimiento, y establecer vigilancia para cada fase.",
        "referencia": "FAA AIM 1-2-1; FAA AC 90-105A, numeral 8.4.3, apartado 16"
      },
      {
        "id": "p44-q2",
        "enunciado": "¿Por qué el que programa el FMS no debería ser el que verifica?",
        "opciones": [
          "Porque el SOP lo prohíbe en todas las aerolíneas.",
          "Porque si una sola persona hace las dos cosas no hay verificación, hay repetición.",
          "Porque el piloto a los mandos no puede tocar el FMS.",
          "Porque el sistema registra quién programó."
        ],
        "correcta": 1,
        "explicacion": "La verificación tiene valor porque la hace otro par de ojos. El reparto concreto lo fija el SOP del operador, que la norma le exige documentar, pero el principio es el mismo en todos.",
        "referencia": "RAC 121, numeral 121.995, apartado (b)(2); FAA AC 90-105A, capítulo 8"
      },
      {
        "id": "p44-q3",
        "enunciado": "¿Qué riesgo señala la norma al pasar de una trayectoria PBN a la captura de un ILS?",
        "opciones": [
          "La pérdida de la capacidad RNP.",
          "Posibles capturas laterales y verticales falsas durante la transición.",
          "El secuenciamiento prematuro de la frustrada.",
          "La desconexión del piloto automático."
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
          "Nunca: el piloto automático no forma parte de la capacidad de navegación.",
          "Sí, si era requerido para la operación.",
          "Solo en procedimientos RNP AR.",
          "Solo si además se pierde el director de vuelo."
        ],
        "correcta": 1,
        "explicacion": "La definición de pérdida de capacidad es amplia y la circular cita expresamente la pérdida del piloto automático o del director de vuelo si eran requeridos. En ciertas aeronaves el acoplamiento es obligatorio para RNP APCH, y sin él la capacidad se pierde.",
        "referencia": "FAA AC 90-100A, numeral 10, apartado d; FAA AC 90-105A, Apéndice A, numeral A.3.9"
      },
      {
        "id": "p45-q2",
        "enunciado": "¿Qué debe contener el aviso al ATC por pérdida de capacidad?",
        "opciones": [
          "Solo la falla.",
          "La pérdida de la capacidad junto con el curso de acción propuesto.",
          "Una declaración de emergencia.",
          "La posición y el combustible remanente."
        ],
        "correcta": 1,
        "explicacion": "La circular exige las dos cosas: notificar la pérdida y el curso de acción propuesto. El controlador necesita saber qué se va a hacer para poder acomodarlo, no solo qué se rompió.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.7.1.8 y Apéndice H, numeral H.8.5"
      },
      {
        "id": "p45-q3",
        "enunciado": "¿Cuál es el paso que decide en el flujo de pérdida de capacidad?",
        "opciones": [
          "Identificar el mensaje.",
          "Aplicar el QRH.",
          "Determinar si todavía se puede cumplir la especificación que exige el segmento.",
          "Informar al ATC."
        ],
        "correcta": 2,
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
          "Identificación y falla, qué no se puede cumplir, y qué se solicita.",
          "Declaración de emergencia, intenciones y nivel deseado.",
          "Especificación declarada, especificación perdida y hora estimada."
        ],
        "correcta": 1,
        "explicacion": "El ejemplo de la circular las contiene: matrícula y falla del sistema, *unable RNAV*, y solicitud de autorización enmendada. Nombrar lo que no se puede cumplir es lo que permite al controlador decidir.",
        "referencia": "FAA AC 90-100A, numeral 10, apartado d"
      },
      {
        "id": "p46-q2",
        "enunciado": "¿Cuándo se comunica la pérdida de capacidad?",
        "opciones": [
          "Al aterrizar, en el reporte de vuelo.",
          "En el contacto inicial de la frecuencia siguiente.",
          "Lo antes posible, junto con el curso de acción propuesto.",
          "Solo si el ATC pregunta."
        ],
        "correcta": 2,
        "explicacion": "La circular pide notificar la pérdida junto con el curso de acción propuesto y, si no se pueden cumplir los requisitos del procedimiento, avisar al servicio de tránsito aéreo lo antes posible. El aviso tardío reduce las opciones del controlador.",
        "referencia": "FAA AC 90-105A, Apéndice A, numeral A.7.1.8"
      },
      {
        "id": "p46-q3",
        "enunciado": "Dices al ATC «tengo un problema con el GPS» y nada más. ¿Qué falta?",
        "opciones": [
          "Nada: el controlador deducirá las consecuencias.",
          "Nombrar qué especificación no se puede cumplir y qué se solicita, porque el controlador no sabe qué exige ese procedimiento con ese avión.",
          "Declarar emergencia.",
          "Dar la posición exacta."
        ],
        "correcta": 1,
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
          "91.1010",
          "91.1015",
          "91.1020"
        ],
        "correcta": 2,
        "explicacion": "El numeral 91.1015 es «Equipo de navegación para operaciones PBN». El 91.1020 trata el equipo para operaciones MNPS, y el 91.1010 los requisitos generales a los que el 91.1015 añade los suyos.",
        "referencia": "RAC 91, numeral 91.1015"
      },
      {
        "id": "p47-q2",
        "enunciado": "Según el RAC 121, además de tener el avión equipado, ¿qué debe ocurrir?",
        "opciones": [
          "Que el ATC confirme la capacidad en frecuencia.",
          "Que el explotador esté autorizado por la UAEAC para realizar esas operaciones.",
          "Que el procedimiento esté en la base de datos.",
          "Que la tripulación tenga habilitación de tipo vigente, y nada más."
        ],
        "correcta": 1,
        "explicacion": "El texto es directo: el explotador deberá estar autorizado por la UAEAC para realizar las operaciones en cuestión. Y para las especificaciones con autorización obligatoria (AR), la autoridad emite además una aprobación específica.",
        "referencia": "RAC 121, numeral 121.995, apartado (b)(3)"
      },
      {
        "id": "p47-q3",
        "enunciado": "¿Qué dice la nota del RAC 121 sobre los datos de navegación?",
        "opciones": [
          "Que son responsabilidad exclusiva del proveedor.",
          "Que la gestión de datos electrónicos de navegación es parte integral de los procedimientos normales y anormales.",
          "Que deben verificarse solo antes del primer vuelo del día.",
          "Que la autoridad los audita anualmente."
        ],
        "correcta": 1,
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
          "Las notas y el recuadro PBN.",
          "La caja de mínimos.",
          "El perfil vertical."
        ],
        "correcta": 1,
        "explicacion": "El título dice la clase de procedimiento según la convención de quien publica, pero lo que el procedimiento exige está en las notas y en el recuadro PBN, y lo que está ahí es obligatorio para volar sus elementos PBN.",
        "referencia": "FAA AIM 1-2-3, representación de los requisitos PBN"
      },
      {
        "id": "p48-q2",
        "enunciado": "En el vuelo completo, ¿en qué fase se resuelve una contradicción entre la MEL y la capacidad declarada en el plan de vuelo?",
        "opciones": [
          "En vuelo, explicándola al ATC.",
          "Antes de salir, corrigiendo el plan.",
          "Al llegar al destino, en el reporte.",
          "No hay contradicción posible."
        ],
        "correcta": 1,
        "explicacion": "El ATC autoriza según las capacidades declaradas y espera que se usen, así que una capacidad declarada que la MEL quitó es una contradicción que se resuelve en tierra. Explicarla por radio llega cuando ya se recibió una autorización que no se puede cumplir.",
        "referencia": "RAC 121, numeral 121.995, apartado (b)(1)(iii); OACI PANS-ATM, Apéndice 2"
      },
      {
        "id": "p48-q3",
        "enunciado": "¿Qué indica un valor RNP publicado con dos decimales, del tipo 0.15?",
        "opciones": [
          "Que se trata de la especificación RNP 0.3 para helicópteros.",
          "Que es un valor de 0.30 o menor, propio de una operación con autorización requerida.",
          "Que la precisión es orientativa.",
          "Que el procedimiento admite cualquier aeronave RNP APCH."
        ],
        "correcta": 1,
        "explicacion": "El AIM pide no confundir un valor RNP en carta de 0.30 o menor con el nombre de la especificación «RNP 0.3»: los valores en carta de 0.30 o menos se escriben con dos decimales. Y las aproximaciones RNP AR tienen valores de RNP 0.30 o menores, cada línea de mínimos con el suyo.",
        "referencia": "FAA AIM 1-2-1, nota sobre valores RNP en carta; FAA AIM 5-4-18"
      }
    ]
  }
]
