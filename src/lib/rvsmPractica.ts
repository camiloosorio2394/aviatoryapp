// GENERADO por scripts/rvsm/convertir.mjs desde docs/contenido/rvsm.md.
// No se edita a mano: se edita el documento y se vuelve a correr el script.

/**
 * La práctica de RVSM: las tres preguntas del quiz de cada capítulo, con
 * corrección inmediata.
 *
 * No son las del quiz final, que viven en el servidor
 * (contenido/bancos/rvsm_evaluacion.json); el conversor comprueba que ningún
 * enunciado de aquí repita uno de allá.
 */

import type { GrupoPractica } from "@/lib/practicaQuiz"

export const RV_PRACTICA: GrupoPractica[] = [
  {
    "tema": "R01",
    "n": 1,
    "titulo": "Qué es RVSM",
    "preguntas": [
      {
        "id": "r01-q1",
        "enunciado": "En una entrevista te preguntan qué significa RVSM y por qué existe. ¿Cuál respuesta es la correcta y completa?",
        "opciones": [
          "Reduced Vertical Separation Mode: un modo del piloto automático que mantiene el nivel con más precisión.",
          "Reduced Vertical Separation Minimum: separación vertical de 1.000 ft entre aeronaves aprobadas, en espacio aéreo designado.",
          "Reduced Vertical Separation Minimum: la autorización que da el ATC para volar entre dos aeronaves con menos margen.",
          "Reduced Visual Separation Minimum: la separación que se aplica cuando hay contacto visual con el tráfico adyacente."
        ],
        "correcta": 1,
        "explicacion": "RVSM es *Reduced Vertical Separation Minimum* y designa un espacio aéreo, no un modo del avión ni una autorización puntual del ATC. La FAA lo define como espacio aéreo de calificación especial, normalmente entre FL 290 y FL 410, donde se aplican 1.000 ft de separación vertical.",
        "referencia": "FAA AC 91-85B, Apéndice A, definición 15"
      },
      {
        "id": "r01-q2",
        "enunciado": "Tu compañero dice que, como el avión es moderno y llega sin problema a FL 370, puede operar RVSM. ¿Qué le falta a ese razonamiento?",
        "opciones": [
          "Nada: si el avión alcanza el nivel con margen de performance, cumple los requisitos.",
          "Solo falta que el ATC lo autorice en el momento de pedir el nivel.",
          "Que RVSM exige equipo, aprobación, procedimientos y entrenamiento, no solo capacidad de subir.",
          "Que primero hay que comprobar que el TCAS esté operativo, que es lo que sustituye la separación."
        ],
        "correcta": 2,
        "explicacion": "Alcanzar el nivel es performance, no autorización. RVSM se sostiene sobre precisión altimétrica, mantenimiento del nivel, equipamiento, aprobación, procedimientos, entrenamiento y monitorización. El TCAS no sustituye ninguno de esos requisitos.",
        "referencia": "FAA AC 91-85B, Apéndice A, definición 15; Apéndice B, numeral B.3.3"
      },
      {
        "id": "r01-q3",
        "enunciado": "¿Qué gana el sistema al pasar de 2.000 a 1.000 ft de separación vertical en la misma franja de niveles?",
        "opciones": [
          "Prácticamente el doble de niveles utilizables, y con ello más capacidad y perfiles más eficientes.",
          "Menos consumo, porque la separación reducida obliga a volar a velocidades menores.",
          "Que el ATC deja de necesitar separación horizontal entre aeronaves en esos niveles.",
          "Que desaparece la necesidad de vigilar la altitud, porque el sistema la garantiza."
        ],
        "correcta": 0,
        "explicacion": "La ganancia es de capacidad: en la misma franja caben casi el doble de niveles, lo que da más flexibilidad al ATC y deja a cada avión más cerca de su nivel óptimo. La separación horizontal y la vigilancia de la altitud siguen existiendo igual.",
        "referencia": "FAA AC 91-85B, Apéndice A, definición 15"
      }
    ]
  },
  {
    "tema": "R02",
    "n": 2,
    "titulo": "Dónde se aplica",
    "preguntas": [
      {
        "id": "r02-q1",
        "enunciado": "¿Entre qué niveles se aplica normalmente RVSM, tanto en la definición de la FAA como en el RAC colombiano?",
        "opciones": [
          "Entre FL 250 y FL 450, inclusive.",
          "Entre FL 290 y FL 410, inclusive.",
          "Desde FL 290 hacia arriba, sin límite superior definido.",
          "Entre FL 200 y FL 290, que es donde se concentra el tráfico de aerolínea."
        ],
        "correcta": 1,
        "explicacion": "Las dos fuentes coinciden: de FL 290 a FL 410, ambos inclusive. Por encima de FL 410 y por debajo de FL 290 rigen otros mínimos de separación vertical.",
        "referencia": "FAA AC 91-85B, Apéndice A, definición 15; RAC 211, numeral 211.530"
      },
      {
        "id": "r02-q2",
        "enunciado": "Vas a operar por primera vez en un área RVSM de otra región. ¿Qué debes verificar además del rango de niveles?",
        "opciones": [
          "Nada: RVSM está normalizado y funciona igual en todo el mundo.",
          "Solo la meteorología en ruta, porque el resto lo resuelve el despacho.",
          "Lo que publique esa región: AIP, procedimientos suplementarios y NOTAM, incluidos los requisitos de transpondedor.",
          "Únicamente que el avión alcance los niveles previstos con el peso del día."
        ],
        "correcta": 2,
        "explicacion": "El rango vertical es común, pero cada Estado publica sus condiciones. La propia FAA advierte que el operador o el piloto deben averiguar qué requisito de transpondedor y de TCAS aplica en cada área RVSM donde se pretenda operar.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.3, Nota"
      },
      {
        "id": "r02-q3",
        "enunciado": "Según el RAC 91, ¿qué ocurre con el vuelo VFR en el espacio RVSM colombiano?",
        "opciones": [
          "Se permite hasta FL 350 si la visibilidad supera los 8 km.",
          "Se permite con autorización del ATC en cualquier nivel RVSM.",
          "Se permite solo de día y con plan de vuelo presentado.",
          "Nunca se permite sobre FL 290 en espacio de separación vertical reducida."
        ],
        "correcta": 3,
        "explicacion": "Sin autorización no hay VFR sobre FL 200, y sobre FL 290 en espacio RVSM no se permite en ningún caso. El espacio RVSM es de operación IFR.",
        "referencia": "RAC 91, numerales 91.305 y 91.310"
      }
    ]
  },
  {
    "tema": "R03",
    "n": 3,
    "titulo": "Por qué existe",
    "preguntas": [
      {
        "id": "r03-q1",
        "enunciado": "¿Cuál es el objetivo principal de RVSM?",
        "opciones": [
          "Reducir el consumo de combustible de cada vuelo en un porcentaje fijo.",
          "Permitir que el ATC deje de aplicar separación horizontal en crucero.",
          "Aumentar la capacidad del espacio aéreo disponiendo de más niveles utilizables.",
          "Facilitar que los aviones vuelen con el piloto automático desacoplado."
        ],
        "correcta": 2,
        "explicacion": "El objetivo es la capacidad: casi el doble de niveles en la misma franja. El ahorro de combustible es una consecuencia de poder volar más cerca del nivel óptimo, y la separación horizontal sigue aplicándose igual.",
        "referencia": "OACI Doc 9574; FAA AC 91-85B, Apéndice A, definición 15"
      },
      {
        "id": "r03-q2",
        "enunciado": "¿Qué exige a cambio la reducción de 2.000 a 1.000 ft?",
        "opciones": [
          "Velocidades de crucero menores, para dar más tiempo de reacción.",
          "Precisión altimétrica, mantenimiento del nivel y fiabilidad del equipo.",
          "Vigilancia radar permanente en todo el espacio RVSM.",
          "Que todas las aeronaves lleven TCAS II con resoluciones coordinadas."
        ],
        "correcta": 1,
        "explicacion": "Al reducir el margen a la mitad, el error vertical admisible se reduce en la misma proporción. Por eso se exigen dos fuentes altimétricas independientes, mantenimiento automático del nivel y alerta de altitud operativa.",
        "referencia": "FAA AC 91-85B, Apéndice B, numerales B.3.3 y B.3.4"
      },
      {
        "id": "r03-q3",
        "enunciado": "En el briefing, el despacho propone FL 350 en vez de FL 330 y estima menos consumo. ¿Cómo se relaciona eso con RVSM?",
        "opciones": [
          "No se relaciona: el consumo depende solo del peso y del viento.",
          "RVSM obliga a volar en el nivel más alto disponible para ahorrar.",
          "RVSM hace que ese nivel exista y esté disponible en esa dirección de vuelo.",
          "RVSM reduce el consumo directamente al disminuir la separación."
        ],
        "correcta": 2,
        "explicacion": "RVSM no ahorra combustible por sí mismo: lo que hace es que haya el doble de niveles, y con ello más probabilidad de que el nivel eficiente esté libre. El ahorro viene de volar donde conviene.",
        "referencia": "OACI Doc 9574"
      }
    ]
  },
  {
    "tema": "R04",
    "n": 4,
    "titulo": "La aprobación: tres cosas, no una",
    "preguntas": [
      {
        "id": "r04-q1",
        "enunciado": "¿De qué depende que un vuelo pueda operar en espacio RVSM?",
        "opciones": [
          "Solo de que la aeronave tenga la aprobación de aeronavegabilidad correspondiente.",
          "De la aeronave, de la autorización del operador y del entrenamiento de la tripulación.",
          "De que el ATC confirme la separación disponible antes de la entrada.",
          "De que el avión alcance los niveles previstos con el peso y la temperatura del día."
        ],
        "correcta": 1,
        "explicacion": "Las tres condiciones deben darse a la vez. La aprobación del avión no basta, y la del operador tampoco salva a un avión con un sistema requerido inoperativo.",
        "referencia": "FAA AC 91-85B, numeral 1.1; RAC 119, numeral 119.270(a)"
      },
      {
        "id": "r04-q2",
        "enunciado": "En Colombia, ¿dónde aparece la autorización RVSM del explotador?",
        "opciones": [
          "En el certificado de aeronavegabilidad de cada aeronave.",
          "En el plan de vuelo, casilla 10.",
          "En las especificaciones de operación que expide la Aerocivil.",
          "En la licencia de cada piloto, como una habilitación."
        ],
        "correcta": 2,
        "explicacion": "Las OpSpecs recogen las aprobaciones específicas del explotador, y RVSM es una de ellas, junto a mercancías peligrosas, baja visibilidad, EDTO o PBN AR. El plan de vuelo declara la capacidad, pero no la otorga.",
        "referencia": "RAC 119, numeral 119.270(a)"
      },
      {
        "id": "r04-q3",
        "enunciado": "La aeronave está aprobada y el operador autorizado, pero un sistema requerido para RVSM está inoperativo. ¿Qué ocurre?",
        "opciones": [
          "Nada: la aprobación del operador cubre esa situación.",
          "Se mantiene la capacidad si el ATC lo autoriza expresamente.",
          "La capacidad RVSM puede perderse; hay que consultar la MEL y los requisitos aplicables.",
          "Se mantiene la capacidad mientras el otro sistema equivalente siga operativo."
        ],
        "correcta": 2,
        "explicacion": "Las aprobaciones no compensan un equipo requerido inoperativo. Hay que ir a la MEL del avión y a los requisitos aplicables antes de decidir si la aeronave sigue siendo RVSM capable.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.3"
      }
    ]
  },
  {
    "tema": "R05",
    "n": 5,
    "titulo": "El equipo requerido, de un vistazo",
    "preguntas": [
      {
        "id": "r05-q1",
        "enunciado": "Según la FAA, ¿qué equipo debe estar operando normalmente al entrar en espacio RVSM?",
        "opciones": [
          "Dos sistemas primarios de altitud, un control automático de altitud y una alerta de altitud.",
          "Un sistema primario de altitud, un TCAS II y dos transpondedores.",
          "Tres sistemas independientes de altitud y dos pilotos automáticos.",
          "Un piloto automático, un altímetro de reserva y el radar meteorológico."
        ],
        "correcta": 0,
        "explicacion": "La AC lo enumera así: dos sistemas primarios de medición de altitud, un sistema automático de control de altitud y un dispositivo de alerta de altitud. El requisito de transpondedor y TCAS depende del área RVSM.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.3"
      },
      {
        "id": "r05-q2",
        "enunciado": "¿Por qué la alerta de altitud es parte del equipo requerido y no un extra?",
        "opciones": [
          "Porque sustituye al control automático de altitud cuando este se desacopla.",
          "Porque avisa cuando la altitud mostrada se aparta de la seleccionada, antes de que sea una desviación.",
          "Porque transmite la desviación al ATC de forma automática.",
          "Porque calcula el error del sistema altimétrico en tiempo real."
        ],
        "correcta": 1,
        "explicacion": "Es la red de seguridad contra el level bust: señala una alerta cuando la altitud mostrada se aparta de la seleccionada más del valor nominal, ±300 ft en aviones anteriores a abril de 1997 y ±200 ft en los posteriores. No transmite nada ni sustituye al piloto automático.",
        "referencia": "FAA AC 91-85B, Apéndice A, numeral A.4.1.3"
      },
      {
        "id": "r05-q3",
        "enunciado": "Un compañero incluye el TCAS en la lista de equipo requerido para RVSM. ¿Qué le respondes?",
        "opciones": [
          "Que tiene razón: sin TCAS no hay RVSM en ninguna región.",
          "Que el TCAS solo se exige en espacio oceánico.",
          "Que el requisito de transpondedor y TCAS depende del área RVSM y hay que verificarlo.",
          "Que el TCAS sustituye a la alerta de altitud si esta falla."
        ],
        "correcta": 2,
        "explicacion": "La AC deja la puerta abierta a propósito: el operador o el piloto deben averiguar el requisito de transpondedor y de TCAS en cada área RVSM donde vayan a operar. El TCAS no sustituye ningún requisito RVSM.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.3, Nota"
      }
    ]
  },
  {
    "tema": "R06",
    "n": 6,
    "titulo": "Los dos sistemas altimétricos",
    "preguntas": [
      {
        "id": "r06-q1",
        "enunciado": "¿Por qué RVSM exige dos sistemas de medición de altitud independientes?",
        "opciones": [
          "Para que el piloto elija el que prefiera durante el crucero.",
          "Para que un error aparezca como discrepancia y pueda detectarse.",
          "Para poder transmitir dos altitudes distintas al ATC y que él decida.",
          "Para repartir la carga de trabajo entre el comandante y el primer oficial."
        ],
        "correcta": 1,
        "explicacion": "Con una sola fuente un error es invisible. Con dos, se manifiesta como diferencia entre ellas, y una diferencia sí se puede ver, medir y contrastar con el altímetro de reserva.",
        "referencia": "FAA AC 91-85B, Apéndice A, numeral A.4.1.1; Apéndice B, numeral B.3.4"
      },
      {
        "id": "r06-q2",
        "enunciado": "En crucero RVSM queda operativa una sola primaria y no puedes confirmar su precisión. ¿Qué corresponde?",
        "opciones": [
          "Continuar normalmente, porque una primaria operativa cumple el requisito.",
          "Cambiar al altímetro de reserva como fuente principal y seguir.",
          "Actuar como si hubieran fallado todas las primarias.",
          "Desacoplar el piloto automático y volar manual vigilando la altitud."
        ],
        "correcta": 2,
        "explicacion": "La tabla de contingencias lo dice expresamente: si no se puede confirmar la precisión de la primaria que queda, se siguen las acciones previstas para la falla de todas las primarias, es decir, *unable RVSM due equipment*.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-2, «One Primary Altimeter Remains Operational»"
      },
      {
        "id": "r06-q3",
        "enunciado": "Vas a entrar en espacio oceánico y el avión tiene comparadores automáticos de altímetros. ¿Debes anotar los chequeos altimétricos?",
        "opciones": [
          "No: el comparador registra las fallas automáticamente.",
          "Sí: en espacio oceánico o remoto la tripulación debe anotarlos para una eventual contingencia.",
          "Solo si el comparador señala una falla durante el cruce.",
          "Solo si el operador lo exige en su manual de operaciones."
        ],
        "correcta": 1,
        "explicacion": "La AC lo advierte de forma explícita: aunque el avión tenga comparadores, en espacio oceánico y remoto la tripulación debe ir registrando los chequeos, porque el comparador no deja fácilmente a mano la diferencia entre las primarias, que es justo lo que hace falta en una contingencia.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 8, Nota"
      }
    ]
  },
  {
    "tema": "R07",
    "n": 7,
    "titulo": "El chequeo altimétrico",
    "preguntas": [
      {
        "id": "r07-q1",
        "enunciado": "En crucero RVSM, ¿dentro de qué diferencia deben coincidir los dos altímetros primarios, según la FAA?",
        "opciones": [
          "75 ft.",
          "200 ft, o menos si lo especifica el manual del avión.",
          "300 ft, que es el umbral de desviación reportable.",
          "65 ft, que es la tolerancia del control automático de altitud."
        ],
        "correcta": 1,
        "explicacion": "En nivel de crucero las dos primarias deben coincidir dentro de 200 ft (60 m), o un valor menor si el manual del avión lo especifica. Los 75 ft son el chequeo contra la elevación conocida antes del despegue, y los 65 ft, una tolerancia de diseño del control automático.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 7"
      },
      {
        "id": "r07-q2",
        "enunciado": "Antes del despegue, con QNH puesto, el altímetro muestra la elevación del aeródromo con 90 ft de diferencia. ¿Qué indica eso?",
        "opciones": [
          "Está dentro de lo aceptable: el límite son 200 ft.",
          "Excede el tope de 75 ft que fija la FAA para ese chequeo.",
          "Es irrelevante en tierra: el chequeo solo cuenta en crucero.",
          "Obliga a declarar *unable RVSM* antes de solicitar la salida."
        ],
        "correcta": 1,
        "explicacion": "La diferencia entre la elevación conocida y la mostrada no debe exceder 75 ft. Excederlo es un hallazgo que hay que resolver antes de salir; no se traslada al aire para verlo después. *Unable RVSM* es una comunicación posterior a la entrada en el espacio, no un trámite de salida.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.2, apartado 3"
      },
      {
        "id": "r07-q3",
        "enunciado": "Vas a cruzar espacio oceánico. ¿Qué exige la FAA respecto al chequeo altimétrico?",
        "opciones": [
          "Repetirlo cada 30 minutos y comunicarlo al control oceánico.",
          "Nada distinto: el barrido normal de instrumentos basta en todos los espacios.",
          "Hacerlo y registrarlo cerca del punto donde empieza la navegación oceánica.",
          "Hacerlo solo si el comparador automático señala una diferencia."
        ],
        "correcta": 2,
        "explicacion": "En espacio oceánico y remoto el chequeo se hace y se registra en las proximidades del punto donde empieza la navegación oceánica, por ejemplo al salir a la costa, anotando las lecturas de las primarias y de la de reserva para tenerlas disponibles en una contingencia.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 8, letra c"
      }
    ]
  },
  {
    "tema": "R08",
    "n": 8,
    "titulo": "El control automático de altitud",
    "preguntas": [
      {
        "id": "r08-q1",
        "enunciado": "En crucero RVSM, ¿qué exige la FAA respecto del sistema automático de control de altitud?",
        "opciones": [
          "Que esté instalado y disponible, aunque se vuele manual.",
          "Que esté operativo y acoplado, salvo circunstancias como retrimar o turbulencia.",
          "Que se desacople cada hora para comprobar el trimado.",
          "Que se use solo por encima de FL 350."
        ],
        "correcta": 1,
        "explicacion": "Debe estar operativo y acoplado durante el crucero nivelado, y la AC admite el desacople por circunstancias como la necesidad de retrimar o la turbulencia. En cualquier caso, la adherencia a la altitud se hace por referencia a uno de los dos altímetros primarios.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 5"
      },
      {
        "id": "r08-q2",
        "enunciado": "Durante una transición autorizada entre niveles, ¿cuál es el sobrepaso máximo que admite la FAA?",
        "opciones": [
          "65 ft.",
          "150 ft.",
          "200 ft.",
          "300 ft."
        ],
        "correcta": 1,
        "explicacion": "El avión no debe sobrepasar ni quedarse corto del nivel autorizado en más de 150 ft (45 m), y se recomienda nivelar con la función de captura de altitud del sistema automático. Los 65 ft son la tolerancia de diseño en crucero estable, no el límite de la nivelación.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 4"
      },
      {
        "id": "r08-q3",
        "enunciado": "Falla el sistema automático de control de altitud en crucero RVSM. Tu compañero propone continuar volando manual. ¿Qué respondes?",
        "opciones": [
          "Que es válido si se mantiene el nivel dentro de 200 ft.",
          "Que es válido mientras la turbulencia sea ligera.",
          "Que no: su falla es *unable RVSM due equipment* y hay que avisar al ATC.",
          "Que es válido si el otro piloto vigila la altitud de forma continua."
        ],
        "correcta": 2,
        "explicacion": "La tabla de contingencias agrupa la falla del sistema automático de control de altitud, la de la alerta de altitud y la de todos los altímetros primarios bajo la misma acción: comunicar *unable RVSM due equipment* y solicitar salir del espacio RVSM salvo que la situación operacional indique otra cosa. La habilidad manual no sustituye el requisito.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-2, «Unable RVSM Due Equipment»"
      }
    ]
  },
  {
    "tema": "R09",
    "n": 9,
    "titulo": "La alerta de altitud",
    "preguntas": [
      {
        "id": "r09-q1",
        "enunciado": "¿Cuándo señala una alerta el sistema de alerta de altitud?",
        "opciones": [
          "Cuando el ATC detecta una desviación y la transmite al avión.",
          "Cuando la altitud mostrada se aparta de la seleccionada más de un valor nominal.",
          "Cuando la diferencia entre los dos altímetros primarios excede 200 ft.",
          "Cuando el piloto automático se desacopla en crucero."
        ],
        "correcta": 1,
        "explicacion": "El sistema compara la altitud mostrada con la seleccionada y alerta cuando la desviación supera el valor nominal: ±300 ft en tipos anteriores a abril de 1997 y ±200 ft en los posteriores. La comparación entre primarias es otra cosa, y la detecta el comparador o el propio piloto.",
        "referencia": "FAA AC 91-85B, Apéndice A, numeral A.4.1.3"
      },
      {
        "id": "r09-q2",
        "enunciado": "¿Por qué se dice que la alerta de altitud es la última defensa y no la primera?",
        "opciones": [
          "Porque solo funciona por encima de FL 290.",
          "Porque depende del transpondedor para operar.",
          "Porque cuando suena ya se consumió buena parte del margen de 1.000 ft.",
          "Porque el ATC la recibe antes que la tripulación."
        ],
        "correcta": 2,
        "explicacion": "Con umbrales de 200 o 300 ft y una separación de 1.000 ft, para cuando la alerta canta ya se ha gastado entre una quinta y una tercera parte del margen. Las defensas anteriores son la colación, la verificación cruzada del nivel seleccionado y la vigilancia de la altitud.",
        "referencia": "FAA AC 91-85B, Apéndice A, numeral A.4.1.3"
      },
      {
        "id": "r09-q3",
        "enunciado": "La alerta de altitud queda inoperativa en crucero RVSM. ¿Qué corresponde?",
        "opciones": [
          "Continuar, porque es un sistema de aviso y no de control.",
          "Continuar si el piloto automático funciona correctamente.",
          "Comunicar *unable RVSM due equipment* y solicitar salir del espacio RVSM.",
          "Reducir la velocidad y aumentar la frecuencia de los chequeos altimétricos."
        ],
        "correcta": 2,
        "explicacion": "La FAA la agrupa con la falla del control automático de altitud y la de todos los primarios: las tres se comunican como *unable RVSM due equipment* y se solicita salir del espacio, salvo que la situación operacional indique otra cosa.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-2, «Unable RVSM Due Equipment»"
      }
    ]
  },
  {
    "tema": "R10",
    "n": 10,
    "titulo": "El reporte de altitud y el transpondedor",
    "preguntas": [
      {
        "id": "r10-q1",
        "enunciado": "¿Qué regla operacional establece la FAA sobre la fuente del reporte de altitud?",
        "opciones": [
          "Que debe alimentarse siempre del altímetro de reserva.",
          "Que debe alimentarse del sistema altimétrico que se está usando para controlar la aeronave.",
          "Que debe alternarse entre las dos primarias cada hora.",
          "Que debe alimentarse del sistema del primer oficial, para independizarlo del piloto que vuela."
        ],
        "correcta": 1,
        "explicacion": "Lo que el avión sigue y lo que transmite deben venir de la misma fuente. Si no, el avión vuela un nivel y enseña otro, y el ATC separa con lo que ve.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 9"
      },
      {
        "id": "r10-q2",
        "enunciado": "Falla el transpondedor en crucero RVSM. ¿Qué corresponde según la tabla de contingencias de la FAA?",
        "opciones": [
          "Comunicar *unable RVSM due equipment* y salir del espacio RVSM.",
          "Contactar al ATC y solicitar autorización para continuar en el nivel autorizado.",
          "Declarar emergencia y descender por debajo de FL 290.",
          "Continuar sin comunicar nada mientras el nivel se mantenga estable."
        ],
        "correcta": 1,
        "explicacion": "La falla de transpondedor se coordina: se solicita autorización para seguir en el nivel autorizado y se cumple la autorización revisada si la hay. No entra en el grupo de *unable RVSM due equipment*, que son los altímetros primarios, el control automático de altitud y la alerta de altitud.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-2, «Transponder Failure»"
      },
      {
        "id": "r10-q3",
        "enunciado": "¿Contra qué se define la desviación de altitud asignada (AAD)?",
        "opciones": [
          "Contra la altitud que muestra el altímetro del comandante.",
          "Contra la altitud media de los dos altímetros primarios.",
          "Contra la altitud que transmite el transpondedor en modo C.",
          "Contra la altitud que el FMS predice para el punto siguiente."
        ],
        "correcta": 2,
        "explicacion": "La AAD es la diferencia entre la altitud transmitida por el modo de reporte de altitud del radar secundario y la altitud o nivel asignado. Por eso importa tanto que la fuente del reporte sea la que gobierna el avión.",
        "referencia": "FAA AC 91-85B, Apéndice A, definición 7"
      }
    ]
  },
  {
    "tema": "R11",
    "n": 11,
    "titulo": "RVSM y la MEL",
    "preguntas": [
      {
        "id": "r11-q1",
        "enunciado": "El avión tiene un ítem de MEL abierto y está despachado. ¿Qué se puede concluir sobre su capacidad RVSM?",
        "opciones": [
          "Que la conserva: si estuviera afectada, el avión no habría sido despachado.",
          "Que la ha perdido: cualquier ítem abierto retira la capacidad.",
          "Nada: hay que leer la entrada de MEL y sus observaciones.",
          "Que la conserva si el ítem no es de altimetría."
        ],
        "correcta": 2,
        "explicacion": "Despachable y RVSM capable son dos cosas distintas que se leen en columnas distintas de la misma entrada. Ni la presencia de un ítem retira automáticamente la capacidad ni el hecho de estar despachado la garantiza.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.3"
      },
      {
        "id": "r11-q2",
        "enunciado": "En la entrada de MEL, ¿qué indica la marca (O)?",
        "opciones": [
          "Que el ítem es opcional y puede ignorarse.",
          "Que hay un procedimiento operacional que le corresponde cumplir a la tripulación.",
          "Que el ítem solo aplica en operación oceánica.",
          "Que el despacho queda a criterio del comandante."
        ],
        "correcta": 1,
        "explicacion": "La (O) señala un procedimiento operacional asociado al ítem, y ese lo ejecuta la tripulación. La (M) señala uno de mantenimiento. Ignorar la (O) es una de las formas más comunes de operar fuera de las condiciones de la MEL.",
        "referencia": "Práctica estándar de listas de equipo mínimo; conectar con el módulo MEL de Aviatory"
      },
      {
        "id": "r11-q3",
        "enunciado": "Hay dos ítems de MEL abiertos, cada uno aceptable por separado. ¿Cómo se evalúa el efecto sobre RVSM?",
        "opciones": [
          "Se suman: si ninguno retira la capacidad por separado, juntos tampoco.",
          "Se toma el más restrictivo de los dos y se ignora el otro.",
          "Se revisa la interacción: la MEL puede prohibir la combinación o cambiar el efecto.",
          "Se consulta al ATC antes del despegue."
        ],
        "correcta": 2,
        "explicacion": "Las restricciones de la MEL no son aditivas. La lista puede prohibir expresamente una combinación que admite por separado, y el efecto conjunto sobre la capacidad RVSM puede no coincidir con el de ninguno de los dos ítems aislados.",
        "referencia": "Práctica estándar de listas de equipo mínimo; conectar con el módulo MEL de Aviatory"
      }
    ]
  },
  {
    "tema": "R12",
    "n": 12,
    "titulo": "La planificación",
    "preguntas": [
      {
        "id": "r12-q1",
        "enunciado": "Durante la preparación del vuelo, ¿qué debe comprobar la tripulación respecto a RVSM?",
        "opciones": [
          "Solo que el avión figure como RVSM capable en la documentación.",
          "Estado del avión, MEL y CDL, ruta, plan de vuelo, meteorología y NOTAM.",
          "Únicamente los NOTAM del aeródromo de salida y de destino.",
          "Nada: la capacidad RVSM la verifica el despacho antes de entregar el plan."
        ],
        "correcta": 1,
        "explicacion": "La comprobación es más amplia que el estado del avión: incluye lo diferido, la ruta que cruza espacio RVSM, la coherencia del plan de vuelo, la meteorología en ruta (turbulencia y onda de montaña) y los NOTAM.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.2"
      },
      {
        "id": "r12-q2",
        "enunciado": "El avión perdió capacidad RVSM por un ítem de MEL. ¿Qué pasa con el plan de vuelo?",
        "opciones": [
          "No cambia: el plan declara la capacidad de diseño de la aeronave.",
          "No debe declarar una capacidad que el avión no tiene hoy.",
          "Se mantiene y se avisa al ATC en el primer contacto.",
          "Lo corrige el ATC automáticamente al recibir el plan."
        ],
        "correcta": 1,
        "explicacion": "La FAA es explícita: el operador o el despachador no deben declarar el código de equipo RVSM en el plan de vuelo cuando la aeronave u operador no están en condiciones RVSM. Y el piloto de una aeronave no RVSM debe informar al controlador de esa condición.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.4"
      },
      {
        "id": "r12-q3",
        "enunciado": "¿Por qué la meteorología en ruta es parte de la planificación RVSM?",
        "opciones": [
          "Porque la temperatura cambia el rango de niveles RVSM disponibles.",
          "Porque turbulencia y onda de montaña pueden comprometer el mantenimiento del nivel.",
          "Porque el espacio RVSM se suspende con meteorología adversa.",
          "Porque el altímetro pierde precisión con humedad alta."
        ],
        "correcta": 1,
        "explicacion": "La turbulencia severa y la actividad de onda de montaña pueden producir desviaciones de altitud que impiden mantener el nivel autorizado, y por eso tienen tratamiento propio en la tabla de contingencias. El rango de niveles no depende de la temperatura ni el espacio se suspende por meteorología.",
        "referencia": "FAA AC 91-85B, Apéndice D"
      }
    ]
  },
  {
    "tema": "R13",
    "n": 13,
    "titulo": "RVSM en el plan de vuelo OACI",
    "preguntas": [
      {
        "id": "r13-q1",
        "enunciado": "¿Cómo se declara la capacidad RVSM en el plan de vuelo OACI?",
        "opciones": [
          "Con la letra R en la casilla 18.",
          "Con la letra W en la casilla 10, de equipo.",
          "Con la sigla RVSM en la casilla 15, de ruta.",
          "No se declara: la conoce el ATC por la matrícula."
        ],
        "correcta": 1,
        "explicacion": "La casilla 10 (Equipo) se anota con la letra W para operar en espacio RVSM. El proveedor de servicios ATS usa esos códigos de plan de vuelo para determinar cuándo asignar separación de 1.000 ft.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.1, apartado 2"
      },
      {
        "id": "r13-q2",
        "enunciado": "La aeronave no cumple los requisitos RVSM. ¿Qué debe ocurrir con el plan de vuelo?",
        "opciones": [
          "Se declara la W igualmente y se avisa por radio al entrar.",
          "No se declara el código de equipo RVSM y se siguen los procedimientos de aeronave no RVSM.",
          "Se declara la W y se añade una observación en la casilla 18.",
          "Se presenta el plan como VFR para evitar el espacio RVSM."
        ],
        "correcta": 1,
        "explicacion": "Si la tripulación o la aeronave no cumplen los requisitos, el operador o el despachador no declaran el código de equipo RVSM y se aplican los procedimientos de estado no RVSM, incluida la fraseología correspondiente con el ATC.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.1, Nota"
      },
      {
        "id": "r13-q3",
        "enunciado": "Tu compañero dice que poner la W en el plan «habilita» al vuelo para RVSM. ¿Qué le respondes?",
        "opciones": [
          "Que tiene razón: la W es la autorización operativa del vuelo.",
          "Que solo habilita si el ATC la confirma en el primer contacto.",
          "Que la W declara una capacidad que ya debe existir; no la otorga.",
          "Que la W habilita únicamente por encima de FL 310."
        ],
        "correcta": 2,
        "explicacion": "La capacidad nace del avión aprobado, del operador autorizado y de la tripulación entrenada. La letra W comunica esa capacidad al sistema; escribirla en un avión que no la tiene no lo hace capaz, y sí hace que el ATC le aplique separación de 1.000 ft.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.1"
      }
    ]
  },
  {
    "tema": "R14",
    "n": 14,
    "titulo": "El preflight",
    "preguntas": [
      {
        "id": "r14-q1",
        "enunciado": "En la inspección exterior de un vuelo RVSM, ¿a qué debe prestar atención particular la tripulación?",
        "opciones": [
          "Al estado de los neumáticos y de los frenos.",
          "A las tomas estáticas y al revestimiento del fuselaje cercano a ellas.",
          "A las antenas del transpondedor en el vientre del avión.",
          "A las luces exteriores, que se usan para alertar a otros aviones."
        ],
        "correcta": 1,
        "explicacion": "La AC pide atención particular al estado de las tomas estáticas, al revestimiento del fuselaje cerca de cada toma y a cualquier componente que afecte la precisión del sistema altimétrico. Es el único punto del preflight donde el piloto ve algo que incide directamente en la precisión de la altitud.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.2, apartado 2"
      },
      {
        "id": "r14-q2",
        "enunciado": "¿Quién puede realizar la comprobación de las tomas estáticas en el preflight?",
        "opciones": [
          "Solo el comandante, y no es delegable.",
          "Solo personal de mantenimiento certificado.",
          "El piloto, u otra persona calificada y autorizada, como un ingeniero de vuelo o mantenimiento.",
          "Nadie: se comprueba en el mantenimiento programado, no en el preflight."
        ],
        "correcta": 2,
        "explicacion": "La AC admite expresamente que la realice una persona calificada y autorizada distinta del piloto, por ejemplo un ingeniero de vuelo o personal de mantenimiento. Lo que no admite es que no se haga.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.2, apartado 2"
      },
      {
        "id": "r14-q3",
        "enunciado": "En el preflight encuentras que un equipo requerido para RVSM muestra indicación de mal funcionamiento. ¿Qué corresponde?",
        "opciones": [
          "Anotarlo y verificarlo de nuevo en crucero.",
          "Resolverlo antes del vuelo: el equipo requerido debe estar operativo.",
          "Continuar y declarar *unable RVSM* al entrar en el espacio.",
          "Continuar si el sistema redundante funciona correctamente."
        ],
        "correcta": 1,
        "explicacion": "El equipo requerido para vuelo en espacio RVSM debe estar operativo y las indicaciones de mal funcionamiento deben resolverse. El camino es la MEL y mantenimiento, en tierra. *Unable RVSM* es una comunicación para lo que ocurre después de haber entrado al espacio.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.2, apartado 4"
      }
    ]
  },
  {
    "tema": "R15",
    "n": 15,
    "titulo": "Antes de entrar al espacio RVSM",
    "preguntas": [
      {
        "id": "r15-q1",
        "enunciado": "Durante el ascenso, antes de FL 290, falla un equipo requerido para RVSM. ¿Qué corresponde?",
        "opciones": [
          "Entrar y comunicar *unable RVSM due equipment* en el primer contacto.",
          "Solicitar una nueva autorización para evitar el vuelo en espacio RVSM.",
          "Entrar y aumentar la frecuencia de los chequeos altimétricos.",
          "Continuar el ascenso hasta FL 410 para salir del espacio por arriba."
        ],
        "correcta": 1,
        "explicacion": "Si el equipo requerido falla antes de entrar, el piloto debe solicitar una nueva autorización para evitar el vuelo en ese espacio. *Unable RVSM due equipment* es la comunicación para las fallas que ocurren después de haber entrado.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.3"
      },
      {
        "id": "r15-q2",
        "enunciado": "¿Qué equipo debe estar operando normalmente al entrar en espacio RVSM?",
        "opciones": [
          "Dos primarios de altitud, un control automático de altitud y una alerta de altitud.",
          "Dos primarios de altitud, dos transpondedores y un TCAS II.",
          "Un primario, un altímetro de reserva y el control automático.",
          "Los cuatro sistemas RVSM más el radar meteorológico."
        ],
        "correcta": 0,
        "explicacion": "La AC enumera exactamente esos tres. El requisito de transpondedor operativo y de TCAS hay que averiguarlo por separado para cada área RVSM donde se pretenda operar.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.3"
      },
      {
        "id": "r15-q3",
        "enunciado": "¿Qué diferencia hay entre una falla antes de entrar y una falla ya dentro del espacio RVSM?",
        "opciones": [
          "Ninguna: en ambos casos se comunica *unable RVSM due equipment*.",
          "Antes se evita entrar; dentro se comunica al ATC y se coordina la salida.",
          "Antes se comunica al ATC; dentro se resuelve con el QRH sin comunicar.",
          "Antes se declara emergencia; dentro basta con vigilar la altitud."
        ],
        "correcta": 1,
        "explicacion": "Antes de la entrada, la norma pide solicitar una autorización que evite el espacio. Ya dentro, la tripulación debe solicitar una nueva autorización tan pronto la situación lo permita y, si no hay autorización disponible o la urgencia lo exige, notificar al ATC su acción y el procedimiento de contingencia aplicado.",
        "referencia": "FAA AC 91-85B, Apéndice B, numerales B.3.3 y B.3.6"
      }
    ]
  },
  {
    "tema": "R16",
    "n": 16,
    "titulo": "Operar dentro de RVSM",
    "preguntas": [
      {
        "id": "r16-q1",
        "enunciado": "En crucero RVSM, ¿bajo qué condición puede la aeronave apartarse del nivel autorizado?",
        "opciones": [
          "Cuando el piloto lo considere conveniente para el confort de los pasajeros.",
          "Cuando el TCAS muestre tráfico en el nivel adyacente.",
          "Solo con autorización positiva del ATC, salvo contingencia o emergencia.",
          "Cuando la turbulencia sea ligera y no afecte la separación."
        ],
        "correcta": 2,
        "explicacion": "Salvo en situaciones de contingencia o emergencia, la aeronave no debe apartarse intencionalmente del nivel autorizado sin autorización positiva del ATC. Una resolución del TCAS es precisamente uno de esos casos excepcionales, y tiene su propio capítulo.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 3"
      },
      {
        "id": "r16-q2",
        "enunciado": "El ATC te informa de una desviación de altitud asignada de 350 ft. ¿Qué debes hacer?",
        "opciones": [
          "Anotarlo y corregir en el siguiente cambio de nivel.",
          "Regresar al nivel autorizado tan rápido como sea posible.",
          "Declarar *unable RVSM due equipment* y salir del espacio.",
          "Solicitar un nivel 1.000 ft por encima para recuperar margen."
        ],
        "correcta": 1,
        "explicacion": "Si el ATC notifica una AAD igual o superior a 300 ft, el piloto debe tomar acción para volver al nivel autorizado lo más rápido posible. Después vendrá comprobar indicaciones e identificar la causa, pero lo primero es recuperar el nivel.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 10"
      },
      {
        "id": "r16-q3",
        "enunciado": "Con el piloto automático acoplado en crucero RVSM, ¿cómo se sigue la altitud?",
        "opciones": [
          "Basta con el automático: por eso es requisito.",
          "Por referencia a uno de los dos altímetros primarios.",
          "Por el altímetro de reserva, que es independiente.",
          "Por la predicción de altitud del FMS."
        ],
        "correcta": 1,
        "explicacion": "La AC lo dice en la misma frase en que exige el automático acoplado: en cualquier caso, la adherencia a la altitud de crucero debe hacerse por referencia a uno de los dos altímetros primarios. El automático mantiene; el piloto vigila.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 5"
      }
    ]
  },
  {
    "tema": "R17",
    "n": 17,
    "titulo": "Desviación de nivel y AAD",
    "preguntas": [
      {
        "id": "r17-q1",
        "enunciado": "¿Qué es exactamente la desviación de altitud asignada (AAD)?",
        "opciones": [
          "La diferencia entre los dos altímetros primarios.",
          "La diferencia entre la altitud transmitida por el transpondedor y la asignada.",
          "La diferencia entre la altitud real y la que muestra el altímetro.",
          "La diferencia entre el nivel autorizado y el nivel óptimo de crucero."
        ],
        "correcta": 1,
        "explicacion": "La AAD compara lo que el transpondedor transmite en modo C con la altitud o nivel asignado. Es la magnitud que el ATC observa. La diferencia entre altitud real y mostrada es el ASE, y el error vertical total contra el nivel asignado es el TVE.",
        "referencia": "FAA AC 91-85B, Apéndice A, definición 7"
      },
      {
        "id": "r17-q2",
        "enunciado": "¿A partir de qué valores se reportan e investigan los errores de mantenimiento de altitud, según la FAA?",
        "opciones": [
          "TVE o AAD de ±150 ft y ASE de ±100 ft.",
          "TVE o AAD de ±300 ft y ASE de ±245 ft.",
          "TVE, AAD y ASE, todos de ±200 ft.",
          "Solo el TVE, a partir de ±500 ft."
        ],
        "correcta": 1,
        "explicacion": "Los errores que deben reportarse e investigarse son TVE igual o mayor que ±300 ft, ASE igual o mayor que ±245 ft y AAD igual o mayor que ±300 ft. El operador reporta el evento dentro de las 72 horas con un análisis inicial de causas.",
        "referencia": "FAA AC 91-85B, numeral 5.10.1"
      },
      {
        "id": "r17-q3",
        "enunciado": "¿Cuál de estas magnitudes no puede detectarse desde la cabina en tiempo real?",
        "opciones": [
          "La AAD, porque solo la ve el ATC.",
          "El TVE, porque exige medición externa.",
          "El ASE, porque está en la medición misma de la altitud.",
          "Ninguna: las tres se leen en el PFD."
        ],
        "correcta": 2,
        "explicacion": "El ASE es la diferencia entre la altitud de presión mostrada a la tripulación con 1013,25 hPa y la altitud de presión real. Como el error está en la propia medición, no aparece en la indicación: el instrumento muestra con confianza un valor equivocado. Por eso el sistema se apoya en la comparación entre fuentes y en la monitorización externa.",
        "referencia": "FAA AC 91-85B, Apéndice A, definición 4; numeral 4.3.1"
      }
    ]
  },
  {
    "tema": "R18",
    "n": 18,
    "titulo": "Large height deviation",
    "preguntas": [
      {
        "id": "r18-q1",
        "enunciado": "¿Por qué se vigilan las desviaciones verticales grandes en espacio RVSM?",
        "opciones": [
          "Para sancionar a las tripulaciones que las cometen.",
          "Porque la seguridad del sistema se comprueba de forma continua con lo que ocurre de verdad.",
          "Porque el ATC necesita justificar los cambios de nivel que emite.",
          "Porque sirven para recalcular el rango de niveles RVSM de cada región."
        ],
        "correcta": 1,
        "explicacion": "RVSM se sostiene sobre un objetivo de seguridad que no se comprueba una sola vez: se vigila contando y analizando las desviaciones reales. Por eso existen agencias regionales de monitorización, como CARSAMMA en Sudamérica y el Caribe.",
        "referencia": "OACI Doc 9574; RAC 211, numeral 211.530"
      },
      {
        "id": "r18-q2",
        "enunciado": "¿Cuál de estas no es una causa típica de desviación vertical grande?",
        "opciones": [
          "Error de coordinación entre dependencias ATC.",
          "Interpretación incorrecta de la autorización.",
          "Turbulencia que impide mantener el nivel.",
          "Uso del piloto automático en modo de mantenimiento de altitud."
        ],
        "correcta": 3,
        "explicacion": "Las causas se agrupan en fallas de equipo y errores operacionales: coordinación ATC, desviación del piloto, turbulencia, problema de equipo o mala interpretación de la autorización. Usar el mantenimiento automático de altitud es justamente lo que la norma exige para evitarlas.",
        "referencia": "FAA AC 91-85B, numeral 5.10.2"
      },
      {
        "id": "r18-q3",
        "enunciado": "¿Qué agencia de monitorización nombra el RAC colombiano al tratar RVSM?",
        "opciones": [
          "EUROCONTROL.",
          "CARSAMMA.",
          "La NTSB.",
          "La propia Aerocivil, sin agencia regional."
        ],
        "correcta": 1,
        "explicacion": "El RAC 211 establece la separación de 1.000 ft entre FL 290 y FL 410 con monitoreo de la agencia regional CARSAMMA, que cubre Sudamérica y el Caribe.",
        "referencia": "RAC 211, numeral 211.530"
      }
    ]
  },
  {
    "tema": "R19",
    "n": 19,
    "titulo": "Level bust: tres términos que no son sinónimos",
    "preguntas": [
      {
        "id": "r19-q1",
        "enunciado": "¿Cuál es la diferencia esencial entre una desviación de altitud y un level bust?",
        "opciones": [
          "El tamaño: un level bust supera siempre los 300 ft.",
          "La causa: el level bust nace de un error en la cadena de la autorización.",
          "El espacio: el level bust solo ocurre dentro de RVSM.",
          "Quién lo detecta: el level bust lo detecta siempre el ATC."
        ],
        "correcta": 1,
        "explicacion": "La FAA agrupa los errores de mantenimiento de altitud en fallas de equipo y errores operacionales. El level bust pertenece a los segundos: la desviación se origina en oír, colacionar, seleccionar o verificar mal el nivel, no en la magnitud del apartamiento.",
        "referencia": "FAA AC 91-85B, numeral 5.10.2"
      },
      {
        "id": "r19-q2",
        "enunciado": "¿Cuál de estas defensas actúa antes de que el avión se mueva?",
        "opciones": [
          "La alerta de altitud.",
          "La llamada del ATC informando la desviación.",
          "La verificación cruzada del nivel seleccionado contra el autorizado.",
          "La resolución del TCAS."
        ],
        "correcta": 2,
        "explicacion": "Verificar que lo seleccionado coincide con lo autorizado ocurre antes de que el avión inicie nada. La alerta de altitud, la llamada del ATC y la resolución del TCAS actúan cuando la desviación ya existe.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 3"
      },
      {
        "id": "r19-q3",
        "enunciado": "¿En qué momento del vuelo es mayor el riesgo de level bust?",
        "opciones": [
          "En el crucero estable, por la monotonía.",
          "En los cambios de nivel, sobre todo con frecuencia cargada o durante otra tarea.",
          "En el ascenso inicial, antes de la altitud de transición.",
          "En la aproximación final, por la carga de trabajo."
        ],
        "correcta": 1,
        "explicacion": "El cambio de nivel es donde se concentra la cadena completa: oír, colacionar, seleccionar, verificar, ejecutar y vigilar la captura. Por eso la norma pone un límite explícito al sobrepaso (150 ft) y recomienda nivelar con la función de captura del sistema automático.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 4"
      }
    ]
  },
  {
    "tema": "R20",
    "n": 20,
    "titulo": "CRM: la cadena que evita el level bust",
    "preguntas": [
      {
        "id": "r20-q1",
        "enunciado": "¿Cuál es la diferencia entre colacionar y verificar?",
        "opciones": [
          "Ninguna: colacionar ya incluye la verificación.",
          "Colacionar es repetir al ATC; verificar es comprobar el panel contra la autorización.",
          "Colacionar lo hace el PF y verificar el PM, pero es el mismo acto.",
          "Verificar solo aplica en cambios de nivel dentro de RVSM."
        ],
        "correcta": 1,
        "explicacion": "Son dos actos separados que pueden fallar por separado: se puede colacionar correctamente y seleccionar mal, o seleccionar bien y colacionar mal. La norma exige que las autorizaciones se entiendan por completo y se cumplan, y eso requiere las dos cosas.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 3"
      },
      {
        "id": "r20-q2",
        "enunciado": "¿Cuál es el eslabón que con más frecuencia se omite en la cadena?",
        "opciones": [
          "La colación de la autorización.",
          "La ejecución del cambio de nivel.",
          "La verificación cruzada del nivel seleccionado.",
          "La vigilancia del nivel una vez establecido."
        ],
        "correcta": 2,
        "explicacion": "Es el único eslabón que no produce ningún efecto visible cuando se hace bien, y por eso es el primero que se sacrifica con carga de trabajo. Los errores operacionales de mantenimiento de altitud se concentran justamente ahí.",
        "referencia": "FAA AC 91-85B, numeral 5.10.2"
      },
      {
        "id": "r20-q3",
        "enunciado": "Durante un cambio de nivel, el PM detecta que el panel no coincide con la autorización. ¿Qué corresponde?",
        "opciones": [
          "Esperar a que el avión nivele y corregir entonces.",
          "Decirlo de inmediato y corregir antes de continuar.",
          "Colacionar de nuevo al ATC para confirmar.",
          "Anotarlo para el reporte de postvuelo."
        ],
        "correcta": 1,
        "explicacion": "La discrepancia se corrige antes de que el avión siga moviéndose hacia un nivel equivocado. Si además hay duda sobre lo autorizado, se confirma con el ATC, pero lo primero es detener la ejecución de algo que no coincide con la autorización.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 3"
      }
    ]
  },
  {
    "tema": "R21",
    "n": 21,
    "titulo": "Mil pies no es mucho",
    "preguntas": [
      {
        "id": "r21-q1",
        "enunciado": "Una aeronave en FL 350 se desvía 300 ft hacia arriba y otra en FL 360 mantiene su nivel. ¿Qué margen vertical queda?",
        "opciones": [
          "1.000 ft: la separación asignada no cambia.",
          "700 ft.",
          "400 ft.",
          "300 ft."
        ],
        "correcta": 1,
        "explicacion": "Con una sola aeronave desviada 300 ft, el margen real baja de 1.000 a 700 ft: se consume el 30 %. Los 400 ft corresponderían al caso en que ambas se desvían 300 ft una hacia la otra.",
        "referencia": "FAA AC 91-85B, Apéndice A, definición 15"
      },
      {
        "id": "r21-q2",
        "enunciado": "¿Por qué 300 ft es una cifra importante en RVSM?",
        "opciones": [
          "Porque es el límite de discrepancia entre los altímetros primarios.",
          "Porque es el sobrepaso máximo admitido al nivelar.",
          "Porque es cuando el ATC llama y cuando el evento se reporta e investiga.",
          "Porque es la tolerancia del sistema automático de control de altitud."
        ],
        "correcta": 2,
        "explicacion": "Si el ATC notifica una AAD igual o superior a 300 ft, el piloto debe volver al nivel autorizado lo antes posible, y ese mismo valor es el umbral de reporte e investigación para TVE y AAD. Los 200 ft son la discrepancia entre primarias, los 150 ft el sobrepaso al nivelar y los 65 ft la tolerancia de diseño del automático.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 10; numeral 5.10.1"
      },
      {
        "id": "r21-q3",
        "enunciado": "Tu compañero dice que 300 ft sobre FL 350 «es menos del 1 %, no es nada». ¿Qué le respondes?",
        "opciones": [
          "Que tiene razón si el avión está estable.",
          "Que la referencia correcta no es la altitud, sino el margen de separación.",
          "Que solo importa si hay tráfico en el nivel adyacente.",
          "Que la cifra relevante es el 1 % del nivel de vuelo."
        ],
        "correcta": 1,
        "explicacion": "Respecto a la altitud, 300 ft es despreciable. Respecto a los 1.000 ft que lo separan del tráfico de arriba, es el 30 % del margen. En RVSM la referencia siempre es la separación, no la altitud.",
        "referencia": "FAA AC 91-85B, Apéndice A, definición 15"
      }
    ]
  },
  {
    "tema": "R22",
    "n": 22,
    "titulo": "Turbulencia y onda de montaña",
    "preguntas": [
      {
        "id": "r22-q1",
        "enunciado": "¿A partir de qué magnitud de desviación inducida por turbulencia severa u onda de montaña corresponde declarar *unable RVSM*?",
        "opciones": [
          "Aproximadamente 100 ft o más.",
          "Aproximadamente 200 ft o más.",
          "Aproximadamente 300 ft o más.",
          "Cualquier desviación, sin umbral."
        ],
        "correcta": 1,
        "explicacion": "La tabla de contingencias fija el disparador en desviaciones de aproximadamente 200 ft o más inducidas por turbulencia severa o actividad de onda de montaña. A partir de ahí se contacta al ATC con «Unable RVSM due [causa]».",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-2"
      },
      {
        "id": "r22-q2",
        "enunciado": "Además de declarar *unable RVSM due turbulence*, ¿qué debe solicitar el piloto si el controlador no lo ofrece?",
        "opciones": [
          "Prioridad de aterrizaje en el destino.",
          "Un vector libre de tráfico en los niveles adyacentes.",
          "Autorización para descender por debajo de FL 290 sin coordinación.",
          "Cambio de código de transpondedor."
        ],
        "correcta": 1,
        "explicacion": "Si el controlador no lo emite, el piloto solicita vector para quedar libre de tráfico en los niveles adyacentes. Además puede pedir cambio de nivel o desvío, y debe reportar la localización y magnitud del fenómeno.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-2"
      },
      {
        "id": "r22-q3",
        "enunciado": "Encuentras onda de montaña, pero las desviaciones no llegan a 200 ft. ¿Qué corresponde?",
        "opciones": [
          "Nada: por debajo del umbral no hay acción.",
          "Declarar *unable RVSM* igualmente, por precaución.",
          "Contactar al ATC, reportar que se experimenta onda de montaña y su localización y magnitud.",
          "Descender de inmediato fuera del espacio RVSM."
        ],
        "correcta": 2,
        "explicacion": "La AC advierte que los encuentros con onda de montaña no necesariamente producen desviaciones del orden de 200 ft, y prevé una acción propia para los menos significativos: contactar al ATC, reportar el fenómeno con su localización y magnitud, y solicitar cambio de nivel o desvío si se desea.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-2, «MWA Encounters – General»"
      }
    ]
  },
  {
    "tema": "R23",
    "n": 23,
    "titulo": "Estela turbulenta en RVSM",
    "preguntas": [
      {
        "id": "r23-q1",
        "enunciado": "Encuentras estela turbulenta en crucero RVSM. Según la FAA, ¿qué puede solicitar el piloto?",
        "opciones": [
          "Solo un cambio de nivel.",
          "Vector, cambio de nivel o, si la aeronave es capaz, un desplazamiento lateral.",
          "Autorización para desconectar el piloto automático hasta salir de la estela.",
          "Prioridad de ruta directa al destino."
        ],
        "correcta": 1,
        "explicacion": "La tabla prevé las tres opciones: vector, cambio de nivel o desplazamiento lateral cuando la aeronave tiene esa capacidad. La respuesta del controlador puede incluir 2.000 ft de separación vertical o separación horizontal apropiada.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-2, «Wake Turbulence Encounters»"
      },
      {
        "id": "r23-q2",
        "enunciado": "¿Qué separación vertical puede proporcionar el controlador ante un encuentro con estela en RVSM?",
        "opciones": [
          "Los mismos 1.000 ft, reforzados con vigilancia.",
          "500 ft, suficientes para salir del eje de la estela.",
          "2.000 ft, o la separación horizontal apropiada.",
          "3.000 ft, que es el mínimo fuera de RVSM."
        ],
        "correcta": 2,
        "explicacion": "El controlador proporciona 2.000 ft de separación vertical o la separación horizontal apropiada, y saca a la aeronave del espacio RVSM salvo que la situación operacional indique otra cosa. Es el mismo criterio que se aplica ante *unable RVSM due equipment*.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-2"
      },
      {
        "id": "r23-q3",
        "enunciado": "¿Por qué la estela merece tratamiento propio dentro de RVSM?",
        "opciones": [
          "Porque la estela es más intensa por encima de FL 290.",
          "Porque con 1.000 ft de separación el tráfico pesado queda más cerca que antes.",
          "Porque el TCAS no detecta estela.",
          "Porque el piloto automático no puede compensarla."
        ],
        "correcta": 1,
        "explicacion": "Al reducir la separación vertical a la mitad, un avión pesado en el nivel adyacente queda a 1.000 ft en vez de 2.000. La separación sigue siendo reglamentaria, pero el encuentro con estela se vuelve más probable, y por eso la norma prevé acciones específicas.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-2; Apéndice D"
      }
    ]
  },
  {
    "tema": "R24",
    "n": 24,
    "titulo": "Perder la capacidad RVSM",
    "preguntas": [
      {
        "id": "r24-q1",
        "enunciado": "¿Cuáles son las tres fallas que la FAA agrupa como *unable RVSM due equipment*?",
        "opciones": [
          "Transpondedor, TCAS y altímetro de reserva.",
          "Todos los altímetros primarios, el control automático de altitud y la alerta de altitud.",
          "Piloto automático, FMS y radar meteorológico.",
          "Una primaria, el transpondedor y el sistema de alerta."
        ],
        "correcta": 1,
        "explicacion": "Esas tres comparten la misma acción: comunicar *unable RVSM due equipment* y solicitar salir del espacio RVSM salvo que la situación operacional indique otra cosa. El transpondedor y el caso de una sola primaria operativa tienen tratamientos distintos.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-2"
      },
      {
        "id": "r24-q2",
        "enunciado": "Pierdes la capacidad RVSM en crucero. ¿Debes declarar emergencia?",
        "opciones": [
          "Sí: la pérdida de capacidad RVSM es siempre una emergencia.",
          "No necesariamente: es una incapacidad de cumplir requisitos, que se comunica y se coordina.",
          "Sí, si ocurre por encima de FL 350.",
          "Solo si el ATC no responde a la primera llamada."
        ],
        "correcta": 1,
        "explicacion": "La pérdida de capacidad RVSM se comunica y se coordina: se solicita nueva autorización tan pronto la situación lo permita. Puede haber una emergencia detrás según qué haya fallado, pero perder RVSM no la constituye por sí misma.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.6"
      },
      {
        "id": "r24-q3",
        "enunciado": "Queda una sola primaria operativa y puedes confirmar su precisión contra la de reserva. ¿Qué corresponde?",
        "opciones": [
          "Comunicar *unable RVSM due equipment* de inmediato.",
          "Contrastar con la de reserva y notificar al ATC la operación con una sola primaria.",
          "No comunicar nada mientras la indicación sea estable.",
          "Declarar emergencia y solicitar descenso inmediato."
        ],
        "correcta": 1,
        "explicacion": "El procedimiento es contrastar con el altímetro de reserva y notificar al ATC que se opera con una sola primaria; el controlador lo acusa. Solo si no se puede confirmar la precisión de esa primaria se siguen las acciones previstas para la falla de todas.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-2, «One Primary Altimeter Remains Operational»"
      }
    ]
  },
  {
    "tema": "R25",
    "n": 25,
    "titulo": "Qué hace el piloto si la pierde en vuelo",
    "preguntas": [
      {
        "id": "r25-q1",
        "enunciado": "¿Cuál es la primera acción cuando no se puede mantener el nivel o hay duda sobre la capacidad de mantenerlo?",
        "opciones": [
          "Declarar *unable RVSM* de inmediato.",
          "Notificar al ATC y mantener el nivel en la medida de lo posible mientras se evalúa.",
          "Descender por debajo de FL 290 sin esperar autorización.",
          "Desconectar el piloto automático para volar manual."
        ],
        "correcta": 1,
        "explicacion": "Las acciones iniciales son notificar al ATC y solicitar asistencia, mantener el nivel autorizado en lo posible mientras se evalúa la situación, vigilar tráfico en conflicto visualmente y con el TCAS, y alertar a las aeronaves cercanas encendiendo las luces exteriores dentro de las limitaciones del avión.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-2, «Initial Pilot Actions»"
      },
      {
        "id": "r25-q2",
        "enunciado": "Has aplicado el QRH y la aeronave ya no conserva capacidad RVSM. ¿Cuándo informas al ATC?",
        "opciones": [
          "Al llegar al destino, en el reporte de postvuelo.",
          "Tan pronto como la situación lo permita, solicitando nueva autorización.",
          "Solo si el ATC pregunta por el estado RVSM.",
          "Al salir del espacio RVSM por descenso normal."
        ],
        "correcta": 1,
        "explicacion": "La tripulación debe solicitar una nueva autorización al controlador tan pronto como la situación lo permita. Si no hay autorización disponible o la urgencia lo exige, notifica su acción y el procedimiento de contingencia aplicado. Hasta que no se comunica, el ATC sigue separando 1.000 ft.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.6"
      },
      {
        "id": "r25-q3",
        "enunciado": "Se resolvió la condición que motivó el procedimiento de contingencia. ¿Qué corresponde?",
        "opciones": [
          "Nada: el ATC lo deduce al ver que el avión mantiene el nivel.",
          "Notificar al ATC que el procedimiento de contingencia ya no es necesario.",
          "Esperar a que el ATC pregunte si se puede reanudar RVSM.",
          "Anotarlo en el libro técnico al aterrizar."
        ],
        "correcta": 1,
        "explicacion": "La AC lo pone como responsabilidad expresa de la tripulación: notificar al ATC cuando la aplicación de los procedimientos de contingencia ya no sea necesaria. Para eso existe también la fraseología «Ready to resume RVSM».",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.6"
      }
    ]
  },
  {
    "tema": "R26",
    "n": 26,
    "titulo": "La fraseología",
    "preguntas": [
      {
        "id": "r26-q1",
        "enunciado": "¿Cuál es la respuesta normalizada del piloto cuando el ATC transmite «Confirm RVSM approved»?",
        "opciones": [
          "«RVSM operational».",
          "«Affirm RVSM».",
          "«RVSM capable».",
          "«Roger RVSM»."
        ],
        "correcta": 1,
        "explicacion": "La fraseología normalizada es «Affirm RVSM» para indicar que el vuelo está aprobado. Las otras tres no son fraseología establecida y en una entrevista técnica se notan.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-1"
      },
      {
        "id": "r26-q2",
        "enunciado": "Una aeronave no aprobada para RVSM, ¿en cuántas situaciones debe reportar su condición?",
        "opciones": [
          "Una sola vez, en el primer contacto tras el despegue.",
          "En cuatro: llamada inicial en cualquier frecuencia, solicitudes de nivel, colaciones de nivel y colaciones de ascenso o descenso a través del espacio RVSM.",
          "Solo cuando el ATC se lo pregunte expresamente.",
          "Solo al entrar y al salir del espacio RVSM."
        ],
        "correcta": 1,
        "explicacion": "La tabla las enumera: llamada inicial en cualquier frecuencia dentro del espacio RVSM, todas las solicitudes de cambio a niveles RVSM, todas las colaciones de autorizaciones de nivel en RVSM, y las colaciones de autorizaciones que impliquen ascenso o descenso a través de FL 290–410.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-1"
      },
      {
        "id": "r26-q3",
        "enunciado": "Declaraste «Unable RVSM due equipment» y te transfieren a otra frecuencia. ¿Debes repetirlo?",
        "opciones": [
          "No: el controlador anterior lo coordina con el siguiente.",
          "Solo si el nuevo controlador pregunta por tu estado RVSM.",
          "Sí: la frase se usa también en el contacto inicial de todas las frecuencias hasta que el problema cese o salgas del espacio.",
          "Solo si cambias de nivel durante la transferencia."
        ],
        "correcta": 2,
        "explicacion": "La nota de la tabla lo dice expresamente: la frase se usa para transmitir tanto la indicación inicial de la falla como en el contacto inicial en todas las frecuencias del espacio RVSM, hasta que el problema deje de existir o la aeronave haya salido del espacio.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-1, Nota"
      }
    ]
  },
  {
    "tema": "R27",
    "n": 27,
    "titulo": "«Unable RVSM» y las aeronaves sin capacidad",
    "preguntas": [
      {
        "id": "r27-q1",
        "enunciado": "¿Qué comunica exactamente la frase *unable RVSM*?",
        "opciones": [
          "Que la aeronave está en emergencia y requiere prioridad.",
          "Que la aeronave no puede cumplir los requisitos RVSM aplicables.",
          "Que la aeronave solicita abandonar el espacio aéreo controlado.",
          "Que la aeronave ha sufrido una desviación de altitud superior a 300 ft."
        ],
        "correcta": 1,
        "explicacion": "Comunica incapacidad de cumplir los requisitos RVSM, por equipo o por meteorología. No es una declaración de emergencia, aunque pueda haber una detrás según lo que haya fallado.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-1 y Tabla B-2"
      },
      {
        "id": "r27-q2",
        "enunciado": "Tras un *unable RVSM due equipment*, ¿qué hará el controlador?",
        "opciones": [
          "Siempre sacará a la aeronave del espacio RVSM de inmediato.",
          "Siempre asignará 2.000 ft de separación vertical.",
          "Depende de las circunstancias: 2.000 ft, separación horizontal, otro nivel o sacarla del espacio.",
          "Declarará emergencia en su nombre y coordinará prioridad."
        ],
        "correcta": 2,
        "explicacion": "La tabla prevé que el controlador proporcione 2.000 ft de separación vertical o la separación horizontal apropiada y saque a la aeronave del espacio RVSM «salvo que la situación operacional indique otra cosa». No hay una respuesta única: depende del tráfico y de la situación.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-2"
      },
      {
        "id": "r27-q3",
        "enunciado": "El avión no está aprobado para RVSM pero alcanza FL 350 sin problema. ¿Puedes pedir ese nivel?",
        "opciones": [
          "Sí: si el avión llega, el nivel es utilizable.",
          "Sí, informando al ATC en la colación.",
          "No, salvo que los procedimientos aplicables de acomodación lo permitan.",
          "Sí, si el TCAS está operativo."
        ],
        "correcta": 2,
        "explicacion": "Los operadores deben estar autorizados y las aeronaves ser conformes para volar en espacio RVSM designado, con excepciones limitadas. Existen procedimientos de acomodación y categorías específicas que pueden acomodarse sujetas a autorización, pero la capacidad de alcanzar el nivel no es uno de los criterios.",
        "referencia": "FAA AC 91-85B, Apéndice B, numerales B.4 y B.4.2"
      }
    ]
  },
  {
    "tema": "R28",
    "n": 28,
    "titulo": "TCAS y RVSM",
    "preguntas": [
      {
        "id": "r28-q1",
        "enunciado": "Recibes una resolución del TCAS que contradice tu autorización de nivel en espacio RVSM. ¿Qué haces?",
        "opciones": [
          "Mantienes el nivel autorizado y consultas al ATC.",
          "Ejecutas la maniobra de la resolución conforme a los procedimientos ACAS aplicables.",
          "Solicitas al ATC que confirme la separación antes de maniobrar.",
          "Desconectas el TCAS para evitar una desviación de nivel."
        ],
        "correcta": 1,
        "explicacion": "La resolución manda sobre la autorización. Volar el nivel autorizado es la regla, y la norma solo la levanta en contingencia, en emergencia y cuando el sistema anticolisión pide maniobrar: ahí se maniobra primero y se le cuenta al ATC después.",
        "referencia": "Procedimientos ACAS aplicables; FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 3"
      },
      {
        "id": "r28-q2",
        "enunciado": "¿Por qué en espacio RVSM se reciben más avisos de tráfico que fuera de él?",
        "opciones": [
          "Porque el TCAS aumenta su sensibilidad por encima de FL 290.",
          "Porque el tráfico de los niveles adyacentes está a 1.000 ft en vez de 2.000.",
          "Porque el ATC transfiere los contactos al TCAS de cada aeronave.",
          "Porque en RVSM hay menos separación horizontal."
        ],
        "correcta": 1,
        "explicacion": "Al reducirse la separación vertical a la mitad, el tráfico de los niveles contiguos entra con más frecuencia en los umbrales de aviso. Es un efecto esperado de la geometría, no un indicio de problema.",
        "referencia": "FAA AC 91-85B, Apéndice A, definición 15"
      },
      {
        "id": "r28-q3",
        "enunciado": "¿Qué relación tiene el TCAS con los requisitos de equipo RVSM?",
        "opciones": [
          "Los sustituye: con TCAS operativo se puede entrar aunque falte otro sistema.",
          "Es el quinto sistema requerido en todas las regiones.",
          "Es independiente: su exigencia viene de la normativa aplicable y del área, y no sustituye ningún requisito RVSM.",
          "Solo se exige en espacio oceánico."
        ],
        "correcta": 2,
        "explicacion": "Los requisitos de dotación de TCAS vienen de la normativa de operaciones de cada tipo de explotador, y el requisito de transpondedor y TCAS en cada área RVSM hay que averiguarlo. El TCAS no sustituye ningún requisito RVSM: cumple otra función.",
        "referencia": "FAA AC 91-85B, Apéndice B, numerales B.3.1 apartado 5 y B.3.3 Nota"
      }
    ]
  },
  {
    "tema": "R29",
    "n": 29,
    "titulo": "ASE, monitorización y postvuelo",
    "preguntas": [
      {
        "id": "r29-q1",
        "enunciado": "¿Qué es el error del sistema altimétrico (ASE)?",
        "opciones": [
          "La diferencia entre los dos altímetros primarios.",
          "La diferencia entre la altitud mostrada con 1013,25 hPa y la altitud de presión real.",
          "La diferencia entre la altitud transmitida y la asignada.",
          "La desviación máxima admitida al nivelar."
        ],
        "correcta": 1,
        "explicacion": "El ASE compara lo mostrado a la tripulación con la referencia estándar puesta y la altitud de presión real de la corriente libre. La diferencia entre lo transmitido y lo asignado es la AAD, y la desviación máxima al nivelar son los 150 ft.",
        "referencia": "FAA AC 91-85B, Apéndice A, definición 4"
      },
      {
        "id": "r29-q2",
        "enunciado": "¿Por qué el ASE no puede detectarse mirando el altímetro?",
        "opciones": [
          "Porque el altímetro solo muestra altitud indicada, no de presión.",
          "Porque el error está en la propia medición: el instrumento muestra con normalidad un valor corrido.",
          "Porque el ASE solo existe por encima de FL 410.",
          "Porque requiere que el transpondedor esté inoperativo."
        ],
        "correcta": 1,
        "explicacion": "El ASE no se ve en la indicación mostrada: el sistema presenta un valor que parece normal y está desplazado. Por eso el control se hace comparando fuentes independientes a bordo y monitorizando la performance de las flotas desde fuera.",
        "referencia": "FAA AC 91-85B, numeral 4.3.1"
      },
      {
        "id": "r29-q3",
        "enunciado": "Hubo una discrepancia altimétrica en crucero. ¿Qué debe quedar en el libro de mantenimiento?",
        "opciones": [
          "Una nota breve indicando que se observó una discrepancia.",
          "Nada, si la discrepancia desapareció antes de aterrizar.",
          "Detalle suficiente: lecturas de primario y reserva, ajustes, qué automático gobernaba y qué transpondedor daba la altitud.",
          "Solo el nivel de vuelo y la hora del suceso."
        ],
        "correcta": 2,
        "explicacion": "La AC pide detalle suficiente para que mantenimiento pueda diagnosticar y reparar, y enumera qué anotar: lecturas de primario y reserva, ajuste del selector de altitud, subescala, qué piloto automático gobernaba y las diferencias con el alterno, diferencias con tomas estáticas alternas, uso del selector de computador de datos aéreos y qué transpondedor daba la altitud.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.7"
      }
    ]
  },
  {
    "tema": "R30",
    "n": 30,
    "titulo": "Lo que cuesta perder RVSM",
    "preguntas": [
      {
        "id": "r30-q1",
        "enunciado": "Pierdes RVSM en FL 370 y el ATC te asigna FL 280. ¿Cuál es la consecuencia operacional inmediata que debes evaluar?",
        "opciones": [
          "Ninguna mientras el avión mantenga el nuevo nivel.",
          "El aumento de consumo y el efecto sobre la predicción de combustible al destino.",
          "La necesidad de declarar emergencia por cambio de nivel.",
          "La pérdida de la aprobación RVSM del operador."
        ],
        "correcta": 1,
        "explicacion": "Volar más bajo empeora el consumo específico, y eso cambia la predicción al destino. La evaluación siguiente es si se conserva el combustible para el alterno más la reserva final; si no, hay que replanificar con el despacho.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.6; conectar con el módulo Gestión del combustible"
      },
      {
        "id": "r30-q2",
        "enunciado": "¿Con qué módulo de Aviatory conecta directamente la pérdida de capacidad RVSM en crucero?",
        "opciones": [
          "Con Mercancías peligrosas.",
          "Con Gestión del combustible.",
          "Con Comunicaciones ATC únicamente.",
          "Con Meteorología."
        ],
        "correcta": 1,
        "explicacion": "La consecuencia práctica de bajar de nivel es un consumo mayor y una predicción al destino peor, que es exactamente el razonamiento del módulo de combustible: comprobar si se conserva el alterno más la reserva final y decidir mientras todavía hay opciones.",
        "referencia": "Módulo Gestión del combustible, capítulos de predicción y decisión"
      },
      {
        "id": "r30-q3",
        "enunciado": "Tras coordinar el nuevo nivel con el ATC, ¿el asunto queda cerrado?",
        "opciones": [
          "Sí: con el nivel asignado, la contingencia terminó.",
          "No: queda revisar consumo, predicción al destino y posibles alternativas.",
          "Sí, siempre que se haya anotado en el libro técnico.",
          "No: hay que declarar emergencia para asegurar prioridad."
        ],
        "correcta": 1,
        "explicacion": "La asignación de nivel resuelve la separación, no el vuelo. A partir de ahí hay que revisar el consumo al nuevo nivel, actualizar la predicción al destino y evaluar si hace falta replanificar. Y al aterrizar, dejar la anotación con detalle.",
        "referencia": "FAA AC 91-85B, Apéndice B, numeral B.3.6"
      }
    ]
  },
  {
    "tema": "R31",
    "n": 31,
    "titulo": "RVSM en Colombia",
    "preguntas": [
      {
        "id": "r31-q1",
        "enunciado": "¿Qué numeral del RAC establece la separación RVSM en Colombia y qué agencia de monitorización nombra?",
        "opciones": [
          "RAC 91, numeral 91.310, y la OACI.",
          "RAC 211, numeral 211.530, y CARSAMMA.",
          "RAC 119, numeral 119.270, y la Aerocivil.",
          "RAC 121, numeral 121.2553, y CARSAMMA."
        ],
        "correcta": 1,
        "explicacion": "El RAC 211 establece la separación de 1.000 ft entre FL 290 y FL 410 inclusive con monitoreo de la agencia regional CARSAMMA. El RAC 91 trata el VFR y el RAC 119 las especificaciones de operación.",
        "referencia": "RAC 211, numeral 211.530"
      },
      {
        "id": "r31-q2",
        "enunciado": "Según el RAC 119, ¿qué relación tiene RVSM con las especificaciones de operación?",
        "opciones": [
          "Ninguna: las OpSpecs no tratan capacidades de navegación ni de separación.",
          "RVSM figura entre las aprobaciones específicas del explotador en sus OpSpecs.",
          "Las OpSpecs solo recogen RVSM para operaciones internacionales.",
          "RVSM se aprueba por aeronave, no por explotador."
        ],
        "correcta": 1,
        "explicacion": "Las OpSpecs recogen aprobaciones específicas como mercancías peligrosas, baja visibilidad, RVSM, EDTO, PBN AR y EFB. Y la empresa no puede volar en un área que sus OpSpecs no autoricen.",
        "referencia": "RAC 119, numerales 119.270(a) y 119.020(d)"
      },
      {
        "id": "r31-q3",
        "enunciado": "Te preguntan por los procedimientos particulares de las FIR Bogotá y Barranquilla en RVSM. ¿Cuál es la respuesta correcta?",
        "opciones": [
          "Son idénticos a los de la FAA, porque RVSM está normalizado.",
          "No existen procedimientos particulares: se aplica solo el RAC 211.",
          "Se consultan en el AIP Colombia vigente y en las circulares de la Aerocivil.",
          "Los publica CARSAMMA en su informe anual de monitorización."
        ],
        "correcta": 2,
        "explicacion": "El rango vertical y la separación son comunes, pero lo particular de cada FIR, los niveles por dirección de vuelo y los requisitos detallados de aprobación se publican en el AIP del Estado y en las circulares vigentes de la autoridad. Se consultan; no se deducen.",
        "referencia": "AIP Colombia vigente; circulares de la Aerocivil"
      }
    ]
  },
  {
    "tema": "R32",
    "n": 32,
    "titulo": "Escenarios",
    "preguntas": [
      {
        "id": "r32-q1",
        "enunciado": "En todos los escenarios de contingencia RVSM, ¿cuál es el orden correcto?",
        "opciones": [
          "Comunicar, controlar, identificar, consultar.",
          "Controlar, identificar, consultar, concluir, comunicar, coordinar.",
          "Consultar el QRH, comunicar y después controlar la aeronave.",
          "Identificar, comunicar y esperar instrucciones del ATC."
        ],
        "correcta": 1,
        "explicacion": "Aviar, navegar, comunicar. Las acciones iniciales son mantener el nivel en lo posible mientras se evalúa y vigilar tráfico; luego se identifica la falla, se consulta el QRH, se concluye si se conserva la capacidad y se comunica y coordina con el ATC.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-2 y numeral B.3.6"
      },
      {
        "id": "r32-q2",
        "enunciado": "¿Cuál de estas situaciones **no** se comunica como *unable RVSM due equipment*?",
        "opciones": [
          "Falla de todos los altímetros primarios.",
          "Falla del sistema automático de control de altitud.",
          "Falla del transpondedor.",
          "Falla de la alerta de altitud."
        ],
        "correcta": 2,
        "explicacion": "La falla de transpondedor tiene tratamiento propio: se solicita al ATC autorización para continuar en el nivel autorizado y se cumple la autorización revisada si la hay. Las otras tres comparten la acción *unable RVSM due equipment*.",
        "referencia": "FAA AC 91-85B, Apéndice B, Tabla B-2"
      },
      {
        "id": "r32-q3",
        "enunciado": "Tras resolver la separación con el ATC en un nivel inferior, ¿qué queda pendiente?",
        "opciones": [
          "Nada operacionalmente relevante.",
          "Revisar consumo y predicción al destino, y anotar la falla con detalle al aterrizar.",
          "Declarar emergencia para asegurar prioridad en destino.",
          "Solicitar de nuevo el nivel original cada treinta minutos."
        ],
        "correcta": 1,
        "explicacion": "El nivel resuelve la separación, no el vuelo. Queda recalcular el consumo y la predicción al destino frente a alterno más reserva final, replanificar con el despacho si hace falta, y dejar en el libro de mantenimiento la anotación con el detalle que la norma enumera.",
        "referencia": "FAA AC 91-85B, Apéndice B, numerales B.3.6 y B.3.7"
      }
    ]
  }
]
