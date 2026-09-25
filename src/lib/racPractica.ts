// GENERADO por scripts/rac/convertir.mjs desde
// docs/contenido/rac.md. No se edita a mano: se edita el documento y
// se vuelve a correr el script.

/**
 * La práctica del módulo RAC: el quiz de cada unidad, con corrección
 * inmediata, agrupado por la unidad de la que sale.
 *
 * No son las preguntas de la evaluación final: esas viven en el servidor
 * (contenido/bancos/rac_evaluacion.json) y el conversor comprueba que ningún
 * enunciado de aquí repita uno de allá.
 */

import type { GrupoPractica } from "@/lib/practicaQuiz"

export const RAC_PRACTICA: GrupoPractica[] = [
  {
    "tema": "U01",
    "n": 1,
    "titulo": "RAC 2 · Personal aeronáutico",
    "preguntas": [
      {
        "id": "u01-q1",
        "enunciado": "Según el RAC 2, que rige hoy las licencias de piloto, ¿cuántas horas de vuelo debe acreditar como mínimo el aspirante a la licencia de piloto comercial avión (PCA)?",
        "opciones": [
          "150 horas de vuelo",
          "200 horas de vuelo",
          "250 horas de vuelo",
          "1.500 horas de vuelo"
        ],
        "correcta": 1,
        "explicacion": "El 2.2.5.3 exige como mínimo 200 horas de vuelo repartidas en presolo, maniobras, instrumentos y crucero, más 30 horas en dispositivo de instrucción. Las 150 horas son del RAC 61, que aplica desde el 31/08/2027.",
        "referencia": "RAC 2, 2.2.5.3"
      },
      {
        "id": "u01-q2",
        "enunciado": "Según el RAC 2, ¿con qué periodicidad deben hacer repaso, entrenamiento y chequeo de proeficiencia los PTL y los pilotos y copilotos PCA?",
        "opciones": [
          "Una vez cada 12 meses calendario, en el mes de su cumpleaños",
          "Dos veces cada 12 meses calendario, con intervalos de 3 a 9 meses",
          "Una vez cada 24 meses calendario, con un repaso de tierra anual",
          "Dos veces cada 12 meses calendario, con intervalos de 5 a 7 meses"
        ],
        "correcta": 3,
        "explicacion": "El 2.2.1.1.4(b) pide dos repasos con entrenamiento de vuelo y verificación de la competencia en cada periodo de 12 meses calendario, con intervalos no inferiores a 5 ni mayores a 7 meses. Los 24 meses corresponden al repaso del piloto privado (2.2.3.10).",
        "referencia": "RAC 2, 2.2.1.1.4 (b)"
      },
      {
        "id": "u01-q3",
        "enunciado": "Reprobaste por primera vez el examen teórico final de tu licencia. Según el RAC 2, ¿cuándo puedes presentarlo de nuevo y con qué nota mínima?",
        "opciones": [
          "Pasados 7 días calendario, con nota mínima de 70 %",
          "Pasados 30 días calendario, con nota mínima de 75 %",
          "Al día siguiente, si un centro de instrucción certifica repaso",
          "Pasados 6 meses, el mismo plazo que se aplica al fraude"
        ],
        "correcta": 0,
        "explicacion": "Tras la primera reprobación esperas 7 días calendario; si fallas otra vez, 15 días con curso de repaso, y la cuarta y última prueba va a los 30 días. La nota mínima es 70 %; el 75 % y los 30 días de espera son del RAC 61.",
        "referencia": "RAC 2, 2.1.3.1.4 (e) y (f)"
      },
      {
        "id": "u01-q4",
        "enunciado": "Has volado 300 horas como copiloto en un avión certificado para un solo piloto. Según el RAC 2, ¿cuántas te acreditan para una licencia de piloto de grado superior?",
        "opciones": [
          "300 horas, porque el tiempo de copiloto siempre cuenta completo",
          "100 horas, es decir, un tercio del tiempo volado como copiloto",
          "150 horas, es decir, el 50 % del tiempo volado como copiloto",
          "Ninguna, porque solo cuenta el tiempo como piloto al mando"
        ],
        "correcta": 2,
        "explicacion": "En un avión certificado para un solo piloto se acredita el 50 % del tiempo como copiloto (una hora por cada dos). Si el avión está certificado para volar con copiloto, ese tiempo cuenta completo (2.2.1.4.3).",
        "referencia": "RAC 2, 2.2.1.4.2"
      }
    ]
  },
  {
    "tema": "U02",
    "n": 2,
    "titulo": "RAC 61 · Licencias para pilotos y sus habilitaciones",
    "preguntas": [
      {
        "id": "u02-q1",
        "enunciado": "El RAC 61 reemplazará al RAC 2 como norma de licencias de piloto. ¿Desde qué fecha se expiden y tramitan las licencias y habilitaciones de piloto conforme al RAC 61?",
        "opciones": [
          "Desde el 31 de julio de 2026",
          "Desde el 31 de diciembre de 2026",
          "Desde el 31 de agosto de 2027",
          "Desde el 31 de julio de 2027"
        ],
        "correcta": 2,
        "explicacion": "La ampliación de 2026 fijó el 31/08/2027: desde esa fecha las licencias y habilitaciones de piloto se tramitan por el RAC 61, y hasta entonces rige el RAC 2, Capítulos I y II. El 31/12/2026 es solo el plazo para publicar las instrucciones de implementación (literal q).",
        "referencia": "RAC 61, Normas de transición (a) y (b), en el texto de la Res. 02543 de 2026"
      },
      {
        "id": "u02-q2",
        "enunciado": "Según el RAC 61, que aplica desde el 31/08/2027, ¿qué puede hacer en transporte aéreo comercial el titular de una licencia de piloto comercial (PCA)?",
        "opciones": [
          "Ser PIC solo en aeronaves certificadas para un piloto, y copiloto donde se requiera",
          "Ser PIC en cualquier aeronave con habilitación de tipo vigente, y también copiloto",
          "Ser solo copiloto, porque para ser PIC en transporte comercial necesita licencia PTL",
          "Ser PIC en aeronaves de más de un piloto, siempre que acredite 1.500 horas de vuelo"
        ],
        "correcta": 0,
        "explicacion": "El PCA puede ser PIC en transporte aéreo comercial solo en aeronaves certificadas para un piloto, y copiloto en las que lo requieran. Ser PIC en transporte comercial en aeronaves de más de un piloto es atribución del PTL (61.830(a)(2)).",
        "referencia": "RAC 61, 61.630 (a)(3) y (a)(4)"
      },
      {
        "id": "u02-q3",
        "enunciado": "Según el RAC 61, que aplica desde el 31/08/2027: vas a actuar como PIC en un vuelo IFR y no tienes una verificación de competencia reciente. ¿Qué experiencia por instrumentos necesitas?",
        "opciones": [
          "3 horas de instrumentos y 3 aproximaciones en los últimos 90 días",
          "6 aproximaciones en los últimos 90 días, sin un mínimo de horas",
          "12 horas de instrumentos y 12 aproximaciones en los últimos 12 meses",
          "6 horas en 6 meses, 3 en la categoría, con al menos 6 aproximaciones"
        ],
        "correcta": 3,
        "explicacion": "Para ser PIC en IFR necesitas, en los últimos 6 meses, 6 horas de vuelo por instrumentos (3 en la categoría de la aeronave) con al menos 6 aproximaciones, o una verificación de competencia en esa categoría. Los 90 días son de la recencia de despegues y aterrizajes (61.140(a)).",
        "referencia": "RAC 61, 61.140 (c)(1)"
      }
    ]
  },
  {
    "tema": "U03",
    "n": 3,
    "titulo": "RAC 67 · Certificado médico",
    "preguntas": [
      {
        "id": "u03-q1",
        "enunciado": "Según el RAC 67, ¿cuánto dura el certificado médico Clase 1 de un titular de licencia PCA o PTL?",
        "opciones": [
          "6 meses a cualquier edad, por ser una licencia profesional",
          "12 meses, y 6 meses desde que el titular cumple 40 años",
          "12 meses, y 3 meses desde que el titular cumple 40 años",
          "24 meses, y 12 meses desde que el titular cumple 40 años"
        ],
        "correcta": 1,
        "explicacion": "La Clase 1 vale 12 meses, y cuando el titular de licencia PCA o PTL cumple 40 años se reduce a 6 meses. La vigencia se calcula con la edad que tienes el día del examen (67.025(g)).",
        "referencia": "RAC 67, 67.025 (a)(1) y (b)"
      },
      {
        "id": "u03-q2",
        "enunciado": "Cumples la agudeza visual de Clase 1 solo con lentes de contacto. Según el RAC 67, ¿qué condición deben cumplir esos lentes?",
        "opciones": [
          "Pueden ser multifocales o de color si te corrigen a 20/20",
          "Puedes combinarlos con gafas en el mismo ojo si lo necesitas",
          "Deben ser monofocales y sin color, con un par de repuesto a mano",
          "Solo se aceptan si en vuelo usas gafas de sol polarizadas"
        ],
        "correcta": 2,
        "explicacion": "El 67.210(e) acepta lentes de contacto monofocales, sin color, bien tolerados y con un par de repuesto a mano. No se permite lente de contacto y gafas a la vez en el mismo ojo (67.210(f)), y las gafas de sol deben ser no polarizadas (67.090(b)(9)).",
        "referencia": "RAC 67, 67.210 (e) y (f)"
      },
      {
        "id": "u03-q3",
        "enunciado": "Una lesión te deja con reposo médico de 25 días, sin hospitalización ni medicamentos continuos. Según el RAC 67, ¿debes informarlo a Medicina Aeronáutica de la Aerocivil?",
        "opciones": [
          "Sí: se informa toda disminución de aptitud de más de 20 días",
          "No: solo se informa cuando hubo hospitalización",
          "No: solo se informa si la incapacidad médica supera los 45 días",
          "Solo si tu certificado médico vence durante la incapacidad"
        ],
        "correcta": 0,
        "explicacion": "Debes informar toda disminución de aptitud de más de 20 días, la que exija tratamiento continuo con medicamentos recetados o la que haya requerido hospitalización: basta una de las tres. Además, dejas de ejercer apenas sepas que tu aptitud disminuyó (67.040(a)).",
        "referencia": "RAC 67, 67.040 (d)"
      }
    ]
  },
  {
    "tema": "U04",
    "n": 4,
    "titulo": "RAC 120 · Sustancias psicoactivas",
    "preguntas": [
      {
        "id": "u04-q1",
        "enunciado": "Tienes vuelo a las 06:00 y anoche tomaste vino en una cena. Según el RAC 120, ¿cuántas horas mínimas deben pasar entre la última bebida y el inicio de tus funciones?",
        "opciones": [
          "8 horas desde la última bebida, sin importar la cantidad",
          "12 horas desde la última bebida, sin importar la cantidad",
          "24 horas si tomaste más de dos copas, y 12 horas si fueron menos",
          "No fija horas: debes dar negativo y no estar bajo su efecto"
        ],
        "correcta": 3,
        "explicacion": "El RAC 120 no fija horas entre la última bebida y el servicio: prohíbe estar bajo el efecto de cualquier sustancia psicoactiva en funciones, y el nivel aceptado es un resultado negativo (corte de alcohol: 20 mg/dL). Si tu aerolínea fija un plazo en su manual, también lo cumples.",
        "referencia": "RAC 120, 120.025 (a) y 120.001 (Nivel de aceptación; Resultado positivo, Nota)"
      },
      {
        "id": "u04-q2",
        "enunciado": "Según el RAC 120, ¿qué sustancias deben buscarse como mínimo en los exámenes toxicológicos del personal aeronáutico?",
        "opciones": [
          "Alcohol, opioides, cannabinoides, cocaína, anfetaminas y cafeína",
          "Alcohol, opioides, cannabinoides, cocaína, anfetaminas y benzodiacepinas",
          "Alcohol, cannabinoides, cocaína, tabaco, anfetaminas, opioides y cafeína",
          "Solo alcohol y cannabinoides; lo demás queda a criterio de la empresa"
        ],
        "correcta": 1,
        "explicacion": "El 120.310(a) fija como mínimo alcohol, opioides, cannabinoides, cocaína, anfetaminas y benzodiacepinas, y la empresa puede buscar más. El tabaco y la cafeína están excluidos de la definición de sustancias psicoactivas (120.001).",
        "referencia": "RAC 120, 120.310 (a)"
      },
      {
        "id": "u04-q3",
        "enunciado": "Según el RAC 120, si entre tu examen toxicológico previo negativo y el inicio de tus funciones sensibles pasa más de cierto plazo, debes repetirlo. ¿Cuál es ese plazo?",
        "opciones": [
          "Más de 90 días",
          "Más de 12 meses",
          "Más de 180 días",
          "Más de 24 meses"
        ],
        "correcta": 2,
        "explicacion": "Si pasan más de 180 días entre el examen previo y el inicio de las funciones sensibles, repites el examen y esperas resultado negativo antes de empezar. Los 24 meses son la frecuencia recomendada para examinar a cada persona (120.030(c)).",
        "referencia": "RAC 120, 120.320 (a)(4)"
      }
    ]
  },
  {
    "tema": "U05",
    "n": 5,
    "titulo": "RAC 91 · Reglas generales de vuelo y de operación",
    "preguntas": [
      {
        "id": "u05-q1",
        "enunciado": "Vuelas VFR a 7.500 ft MSL en espacio aéreo clase E, sobre un terreno de 2.000 ft. Según el Apéndice 1 del RAC 91, ¿qué visibilidad y distancia de las nubes necesitas como mínimo?",
        "opciones": [
          "8 km; 1.500 m horizontal y 1.000 ft vertical de las nubes",
          "5 km; libre de nubes y con la superficie a la vista",
          "5 km; 1.500 m horizontal y 1.000 ft vertical de nubes",
          "1.500 m; libre de nubes y con la superficie a la vista"
        ],
        "correcta": 2,
        "explicacion": "Por debajo de 10.000 ft MSL y por encima de 3.000 ft MSL o de 1.000 ft sobre el terreno (el mayor), se exigen 5 km de visibilidad y 1.500 m horizontal y 1.000 ft vertical de las nubes. Los 8 km son para 10.000 ft o más, y «libre de nubes y con la superficie a la vista» es solo para F y G en la banda baja.",
        "referencia": "RAC 91, Apéndice 1, Tabla 1-1"
      },
      {
        "id": "u05-q2",
        "enunciado": "Planeas un vuelo IFR en avión bajo la Parte 1 del RAC 91. Además del combustible para llegar al destino y luego al alterno más distante, ¿qué reserva final debes llevar?",
        "opciones": [
          "30 minutos de vuelo a altitud normal de crucero",
          "45 minutos de vuelo a altitud normal de crucero",
          "30 minutos en espera a 1.500 ft sobre el aeródromo",
          "60 minutos de vuelo a altitud normal de crucero"
        ],
        "correcta": 1,
        "explicacion": "Para IFR, 91.610 exige una reserva final de al menos 45 minutos a altitud normal de crucero. Los 30 minutos a altitud de crucero son del VFR diurno, y los 30 minutos en espera a 1.500 ft son de la Parte 2 para aviones de turbina (91.2012).",
        "referencia": "RAC 91, 91.610 (a)(2)(ii)"
      },
      {
        "id": "u05-q3",
        "enunciado": "Vuelas IFR en IMC, en espacio aéreo con radar, y pierdes las comunicaciones. Pones 7600. Según el RAC 91, ¿durante cuánto tiempo mantienes el último nivel y velocidad asignados antes de ajustarlos al plan de vuelo?",
        "opciones": [
          "7 minutos, desde lo último entre alcanzar el nivel, poner 7600 o no notificar",
          "20 minutos, desde que dejaste de notificar un punto de notificación obligatoria",
          "3 minutos, contados desde que pusiste el código 7600 en el transpondedor",
          "30 minutos, contados desde la última hora prevista de aproximación recibida"
        ],
        "correcta": 0,
        "explicacion": "Donde se usa radar, mantienes el último nivel y velocidad asignados (o la altitud mínima, si es mayor) durante 7 minutos, contados desde lo que ocurra más tarde entre alcanzar el nivel, poner 7600 o dejar de notificar un punto obligatorio. Los 20 minutos aplican donde no se usa radar.",
        "referencia": "RAC 91, 91.265 (b)(2)(ii)"
      },
      {
        "id": "u05-q4",
        "enunciado": "En una aproximación por instrumentos, todavía antes del tramo de aproximación final y a 2.000 ft sobre la elevación del aeródromo, te informan un RVR de control inferior al mínimo. Según el RAC 91, ¿qué aplica?",
        "opciones": [
          "Puedes seguir hasta la DA/H, porque ya estás establecido en la aproximación",
          "No puedes continuar por debajo de 500 ft sobre la elevación del aeródromo",
          "Solo puedes seguir si el techo reportado está por encima de 1.000 ft",
          "No puedes continuar por debajo de 1.000 ft sobre la elevación del aeródromo"
        ],
        "correcta": 3,
        "explicacion": "Con la visibilidad o el RVR de control bajo mínimos, la aproximación no puede continuarse por debajo de 1.000 ft (300 m) sobre la elevación del aeródromo. Solo si el informe llega después de entrar al tramo final o de bajar de 1.000 ft puedes seguir hasta la DA/H o MDA/H.",
        "referencia": "RAC 91, 91.585 (b) y (c)"
      }
    ]
  },
  {
    "tema": "U06",
    "n": 6,
    "titulo": "RAC 211 · Gestión del tránsito aéreo",
    "preguntas": [
      {
        "id": "u06-q1",
        "enunciado": "Según la tabla de clases de espacio aéreo del RAC 211, ¿en qué clases un vuelo VFR no está sujeto a autorización del control de tránsito aéreo (ATC)?",
        "opciones": [
          "Solo en la clase G",
          "En las clases E, F y G",
          "En las clases F y G",
          "En las clases D, E, F y G"
        ],
        "correcta": 1,
        "explicacion": "En la tabla colombiana, los VFR necesitan autorización ATC en las clases B, C y D, pero no en E, F ni G. El error típico es creer que la clase E la exige a todos: solo se la exige a los IFR.",
        "referencia": "RAC 211, Apéndice 1 (tabla de clases de espacio aéreo ATS)"
      },
      {
        "id": "u06-q2",
        "enunciado": "La torre te transmite por voz varias instrucciones y datos. Según el RAC 211, ¿cuál de estos elementos debes colacionar obligatoriamente?",
        "opciones": [
          "El viento en la superficie",
          "La información de tránsito",
          "El reglaje de altímetro",
          "La temperatura del aeródromo"
        ],
        "correcta": 2,
        "explicacion": "Se colacionan siempre las autorizaciones de ruta, las de entrar, aterrizar, despegar, esperar, cruzar o regresar en una pista, y la pista en uso, el reglaje de altímetro, los códigos SSR, las instrucciones de nivel, rumbo y velocidad y los niveles de transición. Lo demás se colaciona o se acusa recibo de forma que quede claro que se entendió.",
        "referencia": "RAC 211, 211.555 (d)(1)(iii)"
      },
      {
        "id": "u06-q3",
        "enunciado": "Según el RAC 211, ¿entre qué niveles de vuelo se aplica en Colombia la separación vertical mínima reducida (RVSM) de 1.000 ft?",
        "opciones": [
          "Entre FL 290 y FL 410, inclusive",
          "Entre FL 280 y FL 420, inclusive",
          "Entre FL 290 y FL 450, inclusive",
          "Desde FL 250 hasta FL 410, inclusive"
        ],
        "correcta": 0,
        "explicacion": "El 211.530 fija la separación de 300 m (1.000 ft) entre FL 290 y FL 410 inclusive, con monitoreo de la agencia regional CARSAMMA.",
        "referencia": "RAC 211, 211.530 (a) y (b)"
      }
    ]
  },
  {
    "tema": "U07",
    "n": 7,
    "titulo": "RAC 212 · Búsqueda y salvamento",
    "preguntas": [
      {
        "id": "u07-q1",
        "enunciado": "De día, sobrevuelas a unos supervivientes que hicieron una señal en tierra y la entendiste. Según el RAC 212, ¿cómo se lo indicas desde el aire?",
        "opciones": [
          "Describiendo un círculo sobre ellos",
          "Cabeceando el morro varias veces",
          "Con dos destellos de los faros de aterrizaje",
          "Alabeando las alas de la aeronave"
        ],
        "correcta": 3,
        "explicacion": "De día, «entendí tu señal» se indica alabeando las alas; de noche, con dos destellos de los faros de aterrizaje o, si no los tienes, encendiendo y apagando dos veces las luces de navegación. Describir un círculo significa mensaje recibido pero no comprendido.",
        "referencia": "RAC 212, Apéndice 1, 3.1 (a)"
      },
      {
        "id": "u07-q2",
        "enunciado": "Sobrevuelas el sitio de un accidente y ves en tierra una X grande hecha por los supervivientes. Según el RAC 212, ¿qué significa?",
        "opciones": [
          "Necesitamos ayuda médica",
          "Necesitamos ayuda",
          "Estamos avanzando en esa dirección",
          "No hemos encontrado nada"
        ],
        "correcta": 0,
        "explicacion": "En el código de los supervivientes, V es «necesitamos ayuda», X es «necesitamos ayuda médica», N es «no», Y es «sí» y la flecha es «estamos avanzando en esta dirección». «No hemos encontrado nada» es NN y lo usan las brigadas de salvamento.",
        "referencia": "RAC 212, Apéndice 1, 2.1"
      },
      {
        "id": "u07-q3",
        "enunciado": "Vas en crucero escuchando 121,5 MHz y captas la señal de una baliza de socorro. Según el RAC 212, además de informar al RCC o al ATS, ¿qué debes hacer?",
        "opciones": [
          "Bajar el silenciador (squelch) para oír mejor la señal y seguirla",
          "Anotar dónde la oíste primero y no tocar el silenciador (squelch)",
          "Cambiar a 123,1 MHz para coordinar con las demás aeronaves en la zona",
          "Activar tu propio ELT para que el satélite ubique mejor el área"
        ],
        "correcta": 1,
        "explicacion": "Debes anotar y comunicar cuanto antes la posición donde recibiste la señal por primera vez, no alterar el ajuste del silenciador y, si puedes, seguir escuchando hasta que cese. Mantener el silenciador como estaba le da al RCC la ubicación más precisa de la baliza.",
        "referencia": "RAC 212, 212.426 (b)"
      }
    ]
  },
  {
    "tema": "U08",
    "n": 8,
    "titulo": "RAC 203 · Servicio meteorológico",
    "preguntas": [
      {
        "id": "u08-q1",
        "enunciado": "En vuelo encuentras varias condiciones. Según el RAC 203, ¿cuál de ellas obliga a todas las aeronaves a hacer una observación especial (AIREP especial)?",
        "opciones": [
          "Turbulencia ligera en aire claro",
          "Engelamiento ligero en nubes",
          "Turbulencia moderada o fuerte",
          "Onda orográfica moderada"
        ],
        "correcta": 2,
        "explicacion": "Obligan a una observación especial la turbulencia y el engelamiento moderados o fuertes, la onda orográfica fuerte, ciertas tormentas, las tempestades fuertes de polvo o arena, las cenizas y la actividad volcánica, y el frenado peor que el notificado. Lo ligero y la onda orográfica moderada no están en la lista.",
        "referencia": "RAC 203, 203.320 (a)(1)"
      },
      {
        "id": "u08-q2",
        "enunciado": "En el despacho te entregan un SIGMET por cenizas volcánicas que afecta tu ruta. Según el RAC 203, ¿cuál es el período máximo de validez de ese tipo de SIGMET?",
        "opciones": [
          "4 horas, igual que cualquier otro SIGMET",
          "2 horas, igual que un pronóstico de tendencia",
          "12 horas, contadas desde que se emite",
          "6 horas, por ser de cenizas volcánicas"
        ],
        "correcta": 3,
        "explicacion": "La validez de un SIGMET no pasa de 4 horas, pero en el caso especial de las cenizas volcánicas y los ciclones tropicales se extiende a 6 horas. Por eso las 4 horas son la regla general, no la de este aviso.",
        "referencia": "RAC 203, 203.515 (c)"
      }
    ]
  },
  {
    "tema": "U09",
    "n": 9,
    "titulo": "RAC 119 · Certificación de explotadores",
    "preguntas": [
      {
        "id": "u09-q1",
        "enunciado": "Según el RAC 119, ¿qué debe llevar el explotador a bordo de sus aeronaves, con traducción al inglés cuando hace operaciones internacionales?",
        "opciones": [
          "Una copia de sus especificaciones de operación",
          "El original del certificado de operación (CDO)",
          "El manual de operaciones completo de la empresa",
          "La lista de su personal directivo y sus suplentes"
        ],
        "correcta": 0,
        "explicacion": "El 119.260 obliga al explotador a llevar a bordo una copia de las OpSpecs, traducida al inglés en operaciones internacionales, y a mantener informados a sus empleados de lo que aplica a sus funciones. Las OpSpecs dicen qué, dónde y con qué aprobaciones puede volar cada avión.",
        "referencia": "RAC 119, 119.260 (a)(6)"
      },
      {
        "id": "u09-q2",
        "enunciado": "Una empresa quiere hacer vuelos regulares de pasajeros con un turborreactor de 12 asientos y 5.600 kg de peso máximo de despegue. Según el RAC 119, ¿bajo qué reglamento debe operar?",
        "opciones": [
          "RAC 135, porque tiene 19 asientos o menos",
          "RAC 135, porque no supera los 5.700 kg de peso",
          "RAC 121, porque es un turborreactor regular",
          "RAC 91, porque es un avión pequeño"
        ],
        "correcta": 2,
        "explicacion": "En operaciones regulares, todo turborreactor va por el RAC 121, sin importar asientos ni peso. Los límites de 19 asientos y 5.700 kg deciden en los turbohélices y recíprocos regulares y en las operaciones no regulares.",
        "referencia": "RAC 119, 119.110 (a)(1)(i)"
      }
    ]
  },
  {
    "tema": "U10",
    "n": 10,
    "titulo": "RAC 121 · Operación de aerolíneas",
    "preguntas": [
      {
        "id": "u10-q1",
        "enunciado": "Según el RAC 121, ¿hasta qué edad puede una persona actuar como piloto al mando (PIC) o como copiloto?",
        "opciones": [
          "Hasta cumplir 60 años",
          "Hasta cumplir 65 años",
          "Hasta cumplir 67 años",
          "Sin límite, si mantiene su médico Clase I"
        ],
        "correcta": 1,
        "explicacion": "Nadie puede actuar como PIC o copiloto según el RAC 121 cuando haya cumplido 65 años, y en una tripulación de más de un piloto solo uno puede tener más de 60. Los 60 años son el límite de ese segundo requisito, no la edad máxima.",
        "referencia": "RAC 121, 121.1410 (c) y (d)"
      },
      {
        "id": "u10-q2",
        "enunciado": "Eres copiloto con 60 horas en el tipo y vuelas con un PIC que no es instructor ni chequeador. En la pista de aterrizaje el viento cruzado es de 18 kt. Según el RAC 121, ¿quién aterriza?",
        "opciones": [
          "Tú, si el PIC lo autoriza, porque el límite es de 20 kt",
          "Cualquiera, porque la restricción aplica solo al despegue",
          "Tú, porque el límite aplica a copilotos con menos de 50 h",
          "El PIC, porque el viento cruzado supera los 15 kt"
        ],
        "correcta": 3,
        "explicacion": "Si el copiloto tiene menos de 100 horas en el tipo y el PIC no es instructor ni chequeador, el PIC hace todos los despegues y aterrizajes con viento cruzado de más de 15 nudos. También con visibilidad o RVR de 1.200 m o menos, pista contaminada, frenado menor que «bueno» o cortante de viento.",
        "referencia": "RAC 121, 121.1735 (a)(2)(v)"
      },
      {
        "id": "u10-q3",
        "enunciado": "Según el Apéndice 18 del RAC 121, ¿cuántas horas de vuelo puede acumular como máximo un tripulante de vuelo de avión en un mes calendario?",
        "opciones": [
          "85 horas",
          "100 horas",
          "90 horas",
          "120 horas"
        ],
        "correcta": 2,
        "explicacion": "El Apéndice 18 limita el tiempo de vuelo, medido «cuña a cuña», a 50 horas en la quincena, 90 en el mes, 270 en el trimestre y 1.000 en el año. Las 85 horas al mes son el límite de la aviación general en el RAC 91 (91.696).",
        "referencia": "RAC 121, Apéndice 18, 1.1 (c)(2)(iv)(B)"
      },
      {
        "id": "u10-q4",
        "enunciado": "Asciendes a través de 8.000 ft y el despacho llama por la frecuencia de la empresa para confirmar las conexiones de los pasajeros. Según el RAC 121, ¿qué corresponde?",
        "opciones": [
          "No atenderla: es fase crítica por estar bajo 10.000 ft",
          "Atenderla: en ascenso ya no es fase crítica de vuelo",
          "Atenderla: la cabina estéril aplica solo bajo 3.000 ft",
          "Atenderla, siempre que la conteste el piloto que no vuela"
        ],
        "correcta": 0,
        "explicacion": "Son fases críticas el rodaje, el despegue, el aterrizaje y todo vuelo por debajo de 10.000 ft salvo el crucero, y en ellas no se atienden llamadas de la compañía como la confirmación de conexiones. Tampoco se permiten anuncios promocionales, formularios, comer ni conversar.",
        "referencia": "RAC 121, 121.2255 (a) a (c)"
      }
    ]
  },
  {
    "tema": "U11",
    "n": 11,
    "titulo": "RAC 135 · Operaciones de transporte menores",
    "preguntas": [
      {
        "id": "u11-q1",
        "enunciado": "Según el RAC 135, si no tienes licencia de piloto de transporte de línea (PTL), ¿cuántas horas como piloto necesitas para ser designado PIC en operaciones IFR?",
        "opciones": [
          "500 horas, con 100 de crucero",
          "1.200 horas, con 500 de crucero",
          "1.500 horas totales, con 500 de crucero",
          "250 horas, con 50 de crucero"
        ],
        "correcta": 1,
        "explicacion": "Sin PTL, para IFR se piden 1.200 horas como piloto, con 500 de crucero y 75 de instrumentos (al menos 50 reales). Las 500 horas con 100 de crucero son el requisito para VFR.",
        "referencia": "RAC 135, 135.810 (b) y (c)"
      },
      {
        "id": "u11-q2",
        "enunciado": "Tu empresa RAC 135 opera un avión con 12 asientos de pasajeros y piloto automático aprobado en sus OpSpecs. Según el RAC 135, ¿puede volar sin copiloto?",
        "opciones": [
          "Sí, si el PIC tiene 100 horas en la misma marca y modelo",
          "Sí, pero solo en VFR diurno y sin pasajeros a bordo",
          "Sí, si es de hélice y vuela en IFR con aprobación",
          "No: con 10 o más asientos el copiloto es obligatorio"
        ],
        "correcta": 3,
        "explicacion": "El 135.255 exige copiloto con 10 o más asientos de pasajeros, y la excepción del piloto automático (135.280) no aplica a ese caso ni a la Categoría II. Las 100 horas en la misma marca y modelo son para usar el piloto automático en lugar del copiloto en IFR con pasajeros, fuera de esos casos.",
        "referencia": "RAC 135, 135.255 (b) y 135.280 (a)"
      }
    ]
  },
  {
    "tema": "U12",
    "n": 12,
    "titulo": "RAC 175 · Mercancías peligrosas",
    "preguntas": [
      {
        "id": "u12-q1",
        "enunciado": "Eres el PIC de un vuelo que lleva mercancías peligrosas como carga. ¿Qué te exige el RAC 175 sobre la información escrita que te entrega el explotador?",
        "opciones": [
          "Leerla en el briefing; la firma y su custodia durante el vuelo quedan a cargo del despachador en tierra.",
          "Firmarla al aterrizar y entregarla al explotador del aeródromo de destino.",
          "Firmarla antes de que se transporten las mercancías y tenerla a tu alcance durante el vuelo.",
          "Confirmarla por radio con ATS antes del despegue, sin necesidad de firmarla."
        ],
        "correcta": 2,
        "explicacion": "El explotador te la entrega por escrito lo antes posible antes de la salida; tú la firmas antes de que se transporten las mercancías y debe estar a tu alcance durante el vuelo. La copia firmada que el explotador guarda en tierra no reemplaza la tuya.",
        "referencia": "RAC 175, 175.515 (a)(1) y (a)(2)"
      },
      {
        "id": "u12-q2",
        "enunciado": "Hiciste el curso inicial de mercancías peligrosas al ingresar a la aerolínea. Según el RAC 175, ¿cada cuánto, como mínimo, debes recibir de nuevo esa instrucción?",
        "opciones": [
          "Cada 24 meses.",
          "Cada 12 meses.",
          "Cada 36 meses.",
          "Solo cuando cambias de equipo."
        ],
        "correcta": 0,
        "explicacion": "La instrucción se imparte o se verifica al contratarte y se repite, como mínimo, cada 24 meses. Los 12 meses aparecen en el RAC 175, pero para los instructores de la Categoría 6 (175.320 (b)).",
        "referencia": "RAC 175, 175.310 (a) y (b)"
      },
      {
        "id": "u12-q3",
        "enunciado": "Durante el cargue ves en la bodega un bulto con la etiqueta «Exclusivamente en aeronaves de carga». Tu vuelo lleva pasajeros. ¿Qué establece el RAC 175?",
        "opciones": [
          "Puede ir si se estiba lejos de la cabina y queda anotado en la información escrita al PIC.",
          "Puede ir si contiene cantidades exceptuadas y el explotador tiene autorización en sus OpSpecs.",
          "Puede ir si un tripulante puede verlo y manipularlo durante el vuelo.",
          "No puede estibarse en una aeronave ocupada por pasajeros."
        ],
        "correcta": 3,
        "explicacion": "Los bultos con esa etiqueta no se estiban en aeronaves con pasajeros. Que un tripulante pueda verlos y manipularlos en vuelo es un requisito adicional para cuando van en una aeronave de carga, no una excepción.",
        "referencia": "RAC 175, sección «Carga y estiba», literales (c) a (e)"
      }
    ]
  },
  {
    "tema": "U13",
    "n": 13,
    "titulo": "RAC 160 · Seguridad de la aviación (AVSEC)",
    "preguntas": [
      {
        "id": "u13-q1",
        "enunciado": "Según el RAC 160, ¿qué distingue a una persona insubordinada de una persona perturbadora?",
        "opciones": [
          "La perturbadora solo actúa a bordo; la insubordinada, solo en el aeropuerto.",
          "La insubordinada actúa a bordo entre el cierre de la puerta antes del despegue y su apertura al aterrizar.",
          "La insubordinada usa violencia física; la perturbadora solo incumple de palabra las instrucciones de la tripulación.",
          "Son sinónimos: el RAC 160 las trata como la misma categoría de pasajero."
        ],
        "correcta": 1,
        "explicacion": "La insubordinación se define por el momento: a bordo, desde que se cierra la puerta antes del despegue hasta que se abre tras el aterrizaje. La persona perturbadora altera el orden o desobedece instrucciones en el aeropuerto o a bordo, sin esa ventana de tiempo.",
        "referencia": "RAC 160, 160.005 («Persona disruptiva o perturbadora» y «Persona insubordinada»)"
      },
      {
        "id": "u13-q2",
        "enunciado": "Tu avión quedó estacionado 14 horas en plataforma durante la noche. Para el RAC 160, ¿cómo se considera esa aeronave?",
        "opciones": [
          "En servicio, siempre que no tenga ítems MEL abiertos.",
          "En servicio, porque todavía no supera las 24 horas.",
          "No está en servicio, porque lleva más de 12 horas estacionada.",
          "No está en servicio solo si además quedó sin vigilancia."
        ],
        "correcta": 2,
        "explicacion": "No está en servicio la aeronave estacionada por más de 12 horas o la que no tiene vigilancia suficiente para detectar el acceso no autorizado; basta cualquiera de las dos condiciones.",
        "referencia": "RAC 160, 160.005 («Aeronave que no está en servicio»)"
      },
      {
        "id": "u13-q3",
        "enunciado": "Según el RAC 160, ¿en qué condiciones puede un explotador comercial transportar armas y municiones?",
        "opciones": [
          "Solo en bodega, descargadas, con legalidad verificada y en un lugar inaccesible durante el vuelo.",
          "En la cabina de pasajeros, siempre que las porte personal armado autorizado por la empresa aérea.",
          "En la cabina de mando, bajo la custodia directa del piloto al mando.",
          "En el equipaje de mano, si el pasajero presenta su permiso de porte vigente."
        ],
        "correcta": 0,
        "explicacion": "Armas y municiones van solo en bodega, cuando la autoridad determinó que no están cargadas y verificó su legalidad, y en un lugar inaccesible durante el vuelo. En Colombia no se permiten armas ni personal armado en la cabina principal de aeronaves comerciales.",
        "referencia": "RAC 160, 160.1400 (b) y 160.1415 (a)"
      }
    ]
  },
  {
    "tema": "U14",
    "n": 14,
    "titulo": "RAC 219 · Gestión de la seguridad operacional (SMS)",
    "preguntas": [
      {
        "id": "u14-q1",
        "enunciado": "En el vocabulario del RAC 219, ¿qué es el «riesgo de seguridad operacional»?",
        "opciones": [
          "La condición u objeto que puede causar un incidente o accidente, o contribuir a él.",
          "El nivel aceptable de seguridad que fija la Aerocivil para cada proveedor.",
          "El proceso de poner defensas o controles para reducir la gravedad de un peligro.",
          "La probabilidad y la severidad previstas de las consecuencias de un peligro."
        ],
        "correcta": 3,
        "explicacion": "El riesgo se expresa en probabilidad y severidad de las consecuencias de un peligro. La condición u objeto que puede causar un incidente o accidente es el peligro, y poner defensas o controles para reducir la consecuencia es la mitigación.",
        "referencia": "RAC 219, 219.001 («Riesgo de seguridad operacional», «Peligro» y «Mitigación de riesgos»)"
      },
      {
        "id": "u14-q2",
        "enunciado": "¿Cuáles son los cuatro componentes de un SMS según el RAC 219?",
        "opciones": [
          "Instrucción, comunicación, gestión del cambio y mejora continua.",
          "Política y objetivos, gestión de riesgos, aseguramiento y promoción de la seguridad.",
          "Prevención, investigación, sanción y divulgación de los sucesos.",
          "Identificación de peligros, notificación obligatoria, auditoría y análisis de datos de vuelo."
        ],
        "correcta": 1,
        "explicacion": "El SMS tiene 4 componentes y 12 elementos. Instrucción, comunicación, gestión del cambio y mejora continua son elementos dentro de los componentes de aseguramiento y promoción, no componentes.",
        "referencia": "RAC 219, 219.105"
      }
    ]
  },
  {
    "tema": "U15",
    "n": 15,
    "titulo": "RAC 114 · Investigación de accidentes e incidentes",
    "preguntas": [
      {
        "id": "u15-q1",
        "enunciado": "Según el RAC 114, ¿cuál es el único objetivo de investigar un accidente o incidente de aviación?",
        "opciones": [
          "Prevenir futuros accidentes e incidentes.",
          "Determinar la culpa y la responsabilidad de los involucrados.",
          "Fijar la sanción que corresponde al explotador o a la tripulación.",
          "Establecer el monto de las indemnizaciones del seguro."
        ],
        "correcta": 0,
        "explicacion": "El único objetivo es la prevención; la investigación no busca determinar culpa ni responsabilidad. Si el investigador detecta una posible infracción, la traslada a la dependencia sancionadora, que actúa por separado (RAC 13, 13.1020).",
        "referencia": "RAC 114, 114.200 (a)"
      },
      {
        "id": "u15-q2",
        "enunciado": "Eres copiloto y tu tripulación estuvo involucrada en un incidente. Salvo fuerza mayor, ¿en qué plazo deben comunicarse con la autoridad de investigación de accidentes (AIG)?",
        "opciones": [
          "Dentro de las 2 horas siguientes.",
          "Dentro de las 24 horas siguientes.",
          "Dentro de las 72 horas siguientes.",
          "Dentro de las 12 horas siguientes."
        ],
        "correcta": 3,
        "explicacion": "Toda tripulación involucrada en un suceso se comunica con la AIG dentro de las 12 horas siguientes, por teléfono o cualquier otro medio, salvo fuerza mayor por las lesiones o por la ubicación y condición de la aeronave. Las 2 horas son el plazo del servicio de búsqueda y salvamento (114.325 (a)).",
        "referencia": "RAC 114, 114.335 (a)"
      },
      {
        "id": "u15-q3",
        "enunciado": "Según el RAC 114, ¿qué diferencia a un incidente grave de un accidente?",
        "opciones": [
          "El incidente grave solo puede ocurrir con la aeronave en tierra.",
          "El incidente grave exige que alguien sufra lesiones graves.",
          "Solo el resultado: hubo alta probabilidad de accidente, pero no llegó a serlo.",
          "El incidente grave solo aplica a aeronaves de más de 5.700 kg."
        ],
        "correcta": 2,
        "explicacion": "En el incidente grave hubo alta probabilidad de que ocurriera un accidente; la diferencia con el accidente está solo en el resultado. Las lesiones mortales o graves son uno de los criterios del accidente, no del incidente grave.",
        "referencia": "RAC 114, 114.001 («Incidente grave» y su Nota 1)"
      }
    ]
  },
  {
    "tema": "U16",
    "n": 16,
    "titulo": "RAC 13 · Régimen sancionatorio",
    "preguntas": [
      {
        "id": "u16-q1",
        "enunciado": "Cometiste una infracción técnica que no tuvo consecuencias. Según el RAC 13, ¿cuál de estas actuaciones tuyas cuenta como atenuante?",
        "opciones": [
          "Haberla cometido para ocultar otra falta anterior.",
          "Presentarte voluntariamente ante la autoridad e informar la falta.",
          "Haber aprovechado una situación de calamidad o infortunio para cometerla.",
          "Haber actuado en coparticipación con otro tripulante."
        ],
        "correcta": 1,
        "explicacion": "Presentarse voluntariamente e informar la falta es atenuante y reduce la multa un 16,66 %. Las otras tres son agravantes, que la aumentan.",
        "referencia": "RAC 13, 13.300 (a)(2) y parágrafo; 13.300 (b)"
      },
      {
        "id": "u16-q2",
        "enunciado": "Te notifican personalmente un pliego de cargos por una infracción técnica. Según el RAC 13, ¿cuánto tiempo tienes para presentar descargos y pedir pruebas?",
        "opciones": [
          "5 días.",
          "15 días hábiles.",
          "10 días.",
          "30 días."
        ],
        "correcta": 2,
        "explicacion": "Tienes 10 días desde la notificación para presentar descargos y solicitar pruebas. Los 5 días son el plazo para pagar con reducción a la mitad (13.2085) y los 15 días hábiles, el máximo para revisar una medida preventiva (13.1075 (d)).",
        "referencia": "RAC 13, 13.2045 (b)"
      },
      {
        "id": "u16-q3",
        "enunciado": "¿En cuánto tiempo caduca la facultad de la Aerocivil para sancionar una infracción, según el RAC 13?",
        "opciones": [
          "1 año desde el hecho.",
          "5 años desde el hecho.",
          "3 años desde la notificación del pliego de cargos.",
          "3 años desde el hecho."
        ],
        "correcta": 3,
        "explicacion": "La facultad de sancionar caduca a los 3 años de ocurrido el hecho. Los 5 años son la prescripción de una sanción ya decretada, contados desde su ejecutoria.",
        "referencia": "RAC 13, 13.2015"
      }
    ]
  },
  {
    "tema": "U17",
    "n": 17,
    "titulo": "RAC 1 · Definiciones",
    "preguntas": [
      {
        "id": "u17-q1",
        "enunciado": "Estudias el manual de tu aerolínea y ves que el RAC 121 define «aeródromo alterno» de forma distinta al RAC 1. Según el RAC 1, ¿cuál definición aplica a la operación?",
        "opciones": [
          "La del RAC 121, porque la del RAC particular prevalece en sus asuntos.",
          "La del RAC 1, porque es la definición general de todos los RAC.",
          "La más reciente de las dos, según la fecha de su enmienda.",
          "La del Anexo 6 de la OACI, porque las dos normas colombianas la adoptan."
        ],
        "correcta": 0,
        "explicacion": "Si hay discrepancia, prevalece la definición del RAC particular sobre la del RAC 1, pero solo para los asuntos propios de ese RAC. Si un RAC no define una palabra, se entiende como la define el RAC 1.",
        "referencia": "RAC 1, 1.2 (párrafos sobre discrepancia entre definiciones)"
      },
      {
        "id": "u17-q2",
        "enunciado": "Según las definiciones del RAC 1, ¿cuál es la diferencia entre la altitud de decisión (DA) y la altura de decisión (DH)?",
        "opciones": [
          "La DA se usa en aproximaciones que no son de precisión y la DH en las de precisión.",
          "La DA va referida al nivel medio del mar; la DH, a la zona de toma de contacto.",
          "La DA se expresa en metros y la DH en pies, pero indican el mismo punto.",
          "La DA va referida a la elevación del aeródromo y la DH al nivel medio del mar."
        ],
        "correcta": 1,
        "explicacion": "Las dos marcan el punto de la aproximación de precisión en que se inicia la frustrada si no hay referencia visual; la DA se mide respecto al nivel medio del mar y la DH, respecto a la zona de toma de contacto. Para aproximaciones sin senda electrónica se usa la MDA.",
        "referencia": "RAC 1, 1.2.1 («Altitud de decisión»)"
      },
      {
        "id": "u17-q3",
        "enunciado": "Según el RAC 1, ¿cuándo empieza y cuándo termina el tiempo de vuelo de la tripulación?",
        "opciones": [
          "Desde el despegue hasta el aterrizaje siguiente.",
          "Desde que te presentas en el aeropuerto para el servicio hasta que quedas relevado de todo servicio.",
          "Desde el encendido de los motores hasta que se apaga la APU en plataforma.",
          "Desde que la aeronave empieza a moverse para despegar hasta que se detiene al final del vuelo."
        ],
        "correcta": 3,
        "explicacion": "Para la tripulación el tiempo de vuelo es «de cuña a cuña»: desde que la aeronave empieza a moverse con el propósito de despegar hasta que se detiene. Del despegue al aterrizaje es el tiempo de vuelo de la aeronave, y contar desde la presentación hasta el relevo de todo servicio se parece al período de servicio de vuelo.",
        "referencia": "RAC 1, 1.2.1 («Tiempo de vuelo»)"
      }
    ]
  },
  {
    "tema": "U18",
    "n": 18,
    "titulo": "RAC 210 · Telecomunicaciones aeronáuticas",
    "preguntas": [
      {
        "id": "u18-q1",
        "enunciado": "Una aeronave militar te intercepta y necesitas establecer comunicación por VHF. Según el RAC 210, ¿qué canal está previsto para esa comunicación?",
        "opciones": [
          "123,450 MHz, canal aire-aire.",
          "123,100 MHz, auxiliar de búsqueda y salvamento.",
          "121,500 MHz, canal de emergencia.",
          "118,000 MHz, primera frecuencia VHF asignable."
        ],
        "correcta": 2,
        "explicacion": "El canal de emergencia 121,500 MHz se usa solo para verdaderas emergencias, y una de ellas es la comunicación entre aeronaves civiles e interceptoras. 123,45 MHz es aire-aire en zonas remotas y 123,1 MHz, auxiliar de búsqueda y salvamento.",
        "referencia": "RAC 210, 210.620 (f)"
      },
      {
        "id": "u18-q2",
        "enunciado": "Según el RAC 210, ¿en qué frecuencias debe funcionar un transmisor de localización de emergencia (ELT)?",
        "opciones": [
          "406 MHz y 121,500 MHz.",
          "121,500 MHz y 243,000 MHz.",
          "406 MHz y 123,100 MHz.",
          "3.023 kHz y 5.680 kHz."
        ],
        "correcta": 0,
        "explicacion": "Todo ELT debe funcionar tanto en 406 MHz como en 121,500 MHz; cuándo es obligatorio llevarlo lo dicen los RAC 91, 121 y 135. 3.023 kHz y 5.680 kHz son las frecuencias HF de búsqueda y salvamento en el lugar del accidente.",
        "referencia": "RAC 210, 210.600 (a)(1)"
      }
    ]
  },
  {
    "tema": "U19",
    "n": 19,
    "titulo": "RAC 4 · Normas de aeronavegabilidad y operación",
    "preguntas": [
      {
        "id": "u19-q1",
        "enunciado": "Vas a ingresar a una aerolínea colombiana que opera aviones de más de 19 pasajeros. ¿Qué normas rigen hoy su certificación y su operación?",
        "opciones": [
          "El RAC 4, que sigue vigente para las empresas certificadas antes de 2016.",
          "El RAC 119 y el RAC 121; el régimen de transición del RAC 4 ya terminó.",
          "El RAC 135 y el RAC 91, mientras la empresa no complete su transición.",
          "El RAC 4 para operaciones nacionales y el RAC 121 para las internacionales."
        ],
        "correcta": 1,
        "explicacion": "Los capítulos operativos del RAC 4 siguieron vigentes para las empresas en transición solo hasta el 31 de mayo de 2026; hoy la aerolínea se certifica por el RAC 119 y opera por el RAC 121. El RAC 135 es para aviones de 19 pasajeros o menos y 5.700 kg o menos.",
        "referencia": "RAC 121, Normas transitorias, Artículo Segundo (c)"
      },
      {
        "id": "u19-q2",
        "enunciado": "Según las normas transitorias del RAC 121, ¿qué debía hacer una empresa certificada bajo el RAC 4 que no cerró la fase 3 de su actualización en el plazo final?",
        "opciones": [
          "Seguir operando bajo el RAC 4 con una multa por cada mes de retraso.",
          "Pasar automáticamente al RAC 135 hasta terminar el proceso.",
          "Cesar sus actividades de vuelo.",
          "Operar solo vuelos nacionales hasta cerrar la fase 3."
        ],
        "correcta": 2,
        "explicacion": "El Artículo 3 ordena el cese de actividades de vuelo a quien no cerró la fase 3 al 1 de junio de 2025, o a la fecha final si se le repusieron términos. No prevé multa ni operación restringida como alternativa.",
        "referencia": "RAC 121, Normas transitorias, Artículo 3"
      }
    ]
  }
]

/** Las claves de práctica: una por pregunta, en el orden del documento. */
export const RAC_PRACTICA_CLAVES: string[] = [
  "u01-q1",
  "u01-q2",
  "u01-q3",
  "u01-q4",
  "u02-q1",
  "u02-q2",
  "u02-q3",
  "u03-q1",
  "u03-q2",
  "u03-q3",
  "u04-q1",
  "u04-q2",
  "u04-q3",
  "u05-q1",
  "u05-q2",
  "u05-q3",
  "u05-q4",
  "u06-q1",
  "u06-q2",
  "u06-q3",
  "u07-q1",
  "u07-q2",
  "u07-q3",
  "u08-q1",
  "u08-q2",
  "u09-q1",
  "u09-q2",
  "u10-q1",
  "u10-q2",
  "u10-q3",
  "u10-q4",
  "u11-q1",
  "u11-q2",
  "u12-q1",
  "u12-q2",
  "u12-q3",
  "u13-q1",
  "u13-q2",
  "u13-q3",
  "u14-q1",
  "u14-q2",
  "u15-q1",
  "u15-q2",
  "u15-q3",
  "u16-q1",
  "u16-q2",
  "u16-q3",
  "u17-q1",
  "u17-q2",
  "u17-q3",
  "u18-q1",
  "u18-q2",
  "u19-q1",
  "u19-q2"
]
