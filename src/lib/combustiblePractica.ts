// GENERADO por scripts/combustible/convertir.mjs desde
// docs/contenido/gestion-combustible.md. No se edita a mano: se edita el
// documento y se vuelve a correr el script.

/**
 * La práctica de Gestión del combustible: las tres preguntas del quiz de cada
 * capítulo, del 1 al 22, con corrección inmediata.
 *
 * No son las del quiz final, que viven en el servidor
 * (contenido/bancos/combustible_evaluacion.json); el conversor comprueba que
 * ningún enunciado de aquí repita uno de allá.
 */

import type { GrupoPractica } from "@/lib/practicaQuiz"

export const CB_PRACTICA: GrupoPractica[] = [
  {
    "tema": "C01",
    "n": 1,
    "titulo": "Introducción a la gestión del combustible",
    "preguntas": [
      {
        "id": "c01-q1",
        "enunciado": "Vas hacia un destino con tormentas. El combustible total todavía «se ve bien», pero tu predicción muestra que la espera anunciada costará más que toda tu contingencia. ¿Qué refleja una buena gestión del combustible?",
        "opciones": [
          "Esperar a que el FOB quede por debajo del OFP antes de cambiar el plan.",
          "Aceptar todas las esperas, porque el total a bordo todavía se ve bien.",
          "Pedir información de demoras temprano y preparar el desvío con margen.",
          "Declarar combustible mínimo para que el ATC te dé prioridad de llegada."
        ],
        "correcta": 2,
        "explicacion": "La gestión se decide con la predicción al aterrizaje, no con el total del momento: pedir información de demoras y decidir temprano conserva opciones. El combustible mínimo exige estar ya obligado a un aeródromo específico, no es una emergencia y no da prioridad.",
        "referencia": "RAC 121, 121.2553 (b), (b)(1) y (b)(2), Nota; OACI, Doc 9976, 6.8.5, Nota 1"
      },
      {
        "id": "c01-q2",
        "enunciado": "Eres el PIC. Al revisar el despacho con el despachador de vuelo (DV) no estás de acuerdo en que el vuelo pueda hacerse con seguridad con lo planificado. Según el RAC 121, ¿qué pasa con el despacho?",
        "opciones": [
          "Lo firma el DV y tú dejas tu objeción por escrito en el OFP.",
          "Lo decide el director de operaciones, que puede firmar en tu lugar.",
          "Lo firmas igual, porque el cálculo del combustible es tarea del DV.",
          "Solo se firma si ambos están de acuerdo en que el vuelo es seguro."
        ],
        "correcta": 3,
        "explicacion": "El PIC y el DV firman el despacho solo si ambos están de acuerdo en que el vuelo puede realizarse con seguridad. Sin ese acuerdo no hay despacho, aunque el cálculo lo haya hecho el DV.",
        "referencia": "RAC 121, 121.2705"
      },
      {
        "id": "c01-q3",
        "enunciado": "Según el RAC 121, ¿qué debe asegurar el piloto al mando de forma continua durante el vuelo?",
        "opciones": [
          "Que el combustible utilizable le permita aterrizar en algún aeródromo con la reserva final intacta.",
          "Que el combustible para el alterno de destino se conserve completo hasta el inicio de la aproximación.",
          "Que la contingencia no se consuma antes de haber recorrido la mitad de la ruta planificada.",
          "Que el combustible a bordo coincida con el planificado en el OFP en cada punto de notificación."
        ],
        "correcta": 0,
        "explicacion": "Es la regla que protege la reserva final: el combustible utilizable no puede bajar de lo necesario para llegar a un aeródromo y aterrizar con la reserva final prevista. Conservar el alterno es deseable, pero no es lo que la norma exige de forma continua.",
        "referencia": "RAC 121, 121.2553 (b); RAC 91, 91.637 (a)"
      }
    ]
  },
  {
    "tema": "C02",
    "n": 2,
    "titulo": "Conceptos básicos de combustible",
    "preguntas": [
      {
        "id": "c02-q1",
        "enunciado": "Según el RAC 121, ¿sobre qué cantidad de combustible se calculan los requisitos de un vuelo?",
        "opciones": [
          "Sobre el total en tanques, incluido el combustible no utilizable.",
          "Sobre el combustible utilizable, el que los motores pueden consumir.",
          "Sobre el combustible de rampa, medido en litros durante la carga.",
          "Sobre el utilizable más el no utilizable, que se cuenta como reserva."
        ],
        "correcta": 1,
        "explicacion": "La norma habla siempre de combustible utilizable: todo avión llevará una cantidad de combustible utilizable suficiente para completar el vuelo planificado. El no utilizable no lo pueden consumir los motores y no cuenta para ningún requisito.",
        "referencia": "RAC 121, 121.2645 (a) y (c)"
      },
      {
        "id": "c02-q2",
        "enunciado": "Tu OFP indica block fuel 8.600 kg, rodaje 300 kg y trayecto 5.100 kg. ¿Cuál es el combustible de despegue y cuál el previsto al aterrizar en destino?",
        "opciones": [
          "Despegue 8.600 kg; aterrizaje 3.500 kg.",
          "Despegue 8.300 kg; aterrizaje 2.900 kg.",
          "Despegue 8.900 kg; aterrizaje 3.800 kg.",
          "Despegue 8.300 kg; aterrizaje 3.200 kg."
        ],
        "correcta": 3,
        "explicacion": "El combustible de despegue es el block fuel menos el rodaje (8.600 menos 300 = 8.300 kg), y el previsto al aterrizaje es el de despegue menos el trayecto (8.300 menos 5.100 = 3.200 kg). Tomar el block fuel como combustible de despegue es el error típico.",
        "referencia": "RAC 121, 121.2645 (c)(1) y (c)(2)"
      },
      {
        "id": "c02-q3",
        "enunciado": "Antes de salir, el proveedor informa que cargó 6.000 litros y la densidad del combustible ese día es 0,80 kg/L. ¿Cuánto debería aumentar el FOB en los indicadores?",
        "opciones": [
          "4.800 kg",
          "6.000 kg",
          "7.500 kg",
          "10.580 kg"
        ],
        "correcta": 0,
        "explicacion": "Se planifica en masa y se carga en volumen: 6.000 L × 0,80 kg/L = 4.800 kg. Dividir por la densidad da 7.500, tomar un litro por kilo da 6.000 y 10.580 es la cifra en libras leída como kilos; si la conversión no cuadra con el FOB, no se sale hasta aclararlo.",
        "referencia": "RAC 121, Apéndice 10, A9.1.9 (h) (densidad del combustible en el MO)"
      }
    ]
  },
  {
    "tema": "C03",
    "n": 3,
    "titulo": "Componentes de la planificación de combustible",
    "preguntas": [
      {
        "id": "c03-q1",
        "enunciado": "Según el RAC 121, ¿qué debe considerar el combustible para el rodaje?",
        "opciones": [
          "Solo el recorrido desde el puesto de estacionamiento hasta la cabecera en uso, sin APU.",
          "El rodaje de salida y también el de llegada en el aeródromo de destino.",
          "Lo previsto antes del despegue, con las condiciones locales y el consumo del APU.",
          "El consumo desde la puesta en marcha hasta alcanzar la altitud de crucero."
        ],
        "correcta": 2,
        "explicacion": "Es lo que se prevé consumir antes del despegue, teniendo en cuenta las condiciones locales del aeródromo de salida y el consumo del APU. Desde el despegue, el consumo ya pertenece al trayecto.",
        "referencia": "RAC 121, 121.2645 (c)(1)"
      },
      {
        "id": "c03-q2",
        "enunciado": "Eres copiloto y revisas el OFP de un vuelo corto con trayecto de 2.400 kg. En espera a 1.500 ft sobre el destino, el avión consume 45 kg/min. Según el RAC 121, ¿cuánto combustible para contingencias debe llevar?",
        "opciones": [
          "120 kg, el 5 % del trayecto.",
          "225 kg, los 5 minutos de espera.",
          "240 kg, el 10 % del trayecto.",
          "345 kg, el 5 % más los 5 minutos."
        ],
        "correcta": 1,
        "explicacion": "Es el 5 % del trayecto (120 kg), pero nunca menos que 5 minutos a velocidad de espera a 1.500 ft sobre el destino (5 × 45 = 225 kg). Se toma el mayor, no la suma; en vuelos cortos suele mandar el piso de 5 minutos.",
        "referencia": "RAC 121, 121.2645 (c)(3)"
      },
      {
        "id": "c03-q3",
        "enunciado": "Estás en espera en el destino, con el adicional en cero, y ya consumiste el discrecional y toda la contingencia. Si aceptas seguir esperando, ¿de dónde sale ese combustible y qué significa?",
        "opciones": [
          "De la reserva final, que está planificada justamente para las esperas.",
          "Del adicional, que se recalcula para cubrir las demoras en el destino.",
          "Del trayecto, porque la espera forma parte del vuelo hasta el destino.",
          "Del combustible para el alterno: empiezas a renunciar a esa opción."
        ],
        "correcta": 3,
        "explicacion": "Después del discrecional y la contingencia sigue el combustible para el alterno, y gastarlo significa que ya no llegarías a él con la reserva final intacta. La reserva final no se planifica para consumirse y el adicional está en cero.",
        "referencia": "RAC 121, 121.2645 (c)(4) y (c)(5); 121.2553 (b)(1)"
      }
    ]
  },
  {
    "tema": "C04",
    "n": 4,
    "titulo": "Block fuel",
    "preguntas": [
      {
        "id": "c04-q1",
        "enunciado": "Tu OFP trae: rodaje 250, trayecto 4.200, contingencias 210, alterno 1.300, reserva final 1.250, adicional 0 y discrecional 190 kg. ¿Cuál es el block fuel?",
        "opciones": [
          "6.960 kg",
          "7.210 kg",
          "7.400 kg",
          "7.150 kg"
        ],
        "correcta": 2,
        "explicacion": "El block fuel es la suma de los siete componentes antes del rodaje: 250 + 4.200 + 210 + 1.300 + 1.250 + 0 + 190 = 7.400 kg. Las otras cifras dejan por fuera uno o más componentes.",
        "referencia": "RAC 121, 121.2645 (c)(1) a (c)(7)"
      },
      {
        "id": "c04-q2",
        "enunciado": "Según el RAC 121, ¿qué combustible utilizable debe haber a bordo para iniciar el despegue?",
        "opciones": [
          "Trayecto, contingencias, alterno, reserva final y adicional si se requiere.",
          "Rodaje, trayecto, contingencias, alterno y reserva final, sin el adicional.",
          "Todo el block fuel planificado, incluido el discrecional que decidió el PIC.",
          "Trayecto, alterno y reserva final; la contingencia puede gastarse en el rodaje."
        ],
        "correcta": 0,
        "explicacion": "Ningún avión despega sin trayecto, contingencias, alterno, reserva final y el adicional si aplica. El rodaje ya se quemó y el discrecional no es obligatorio; y en el RAC 121 la contingencia debe estar completa al iniciar el despegue.",
        "referencia": "RAC 121, 121.2645 (d)"
      },
      {
        "id": "c04-q3",
        "enunciado": "Según el RAC 121, ¿con qué datos de consumo se calcula en primer lugar el combustible de un vuelo?",
        "opciones": [
          "Con los del fabricante, que prevalecen sobre cualquier dato de la flota.",
          "Con los datos actuales de ese avión si existen; si no, con los del fabricante.",
          "Con el consumo promedio de todos los aviones del mismo tipo en la empresa.",
          "Con los valores que fije el despachador según su experiencia en la ruta."
        ],
        "correcta": 1,
        "explicacion": "Primero van los datos específicos actuales del avión, obtenidos de un sistema de control del consumo; solo si no están disponibles se usan los del fabricante. Sobre esos datos se aplican peso, NOTAM, meteorología, demoras ATS y el efecto de los ítems diferidos.",
        "referencia": "RAC 121, 121.2645 (b)(1) y (b)(2)"
      }
    ]
  },
  {
    "tema": "C05",
    "n": 5,
    "titulo": "Trip fuel",
    "preguntas": [
      {
        "id": "c05-q1",
        "enunciado": "Según el RAC 121, ¿qué cubre el combustible para el trayecto?",
        "opciones": [
          "Desde la puesta en marcha hasta el aterrizaje en destino, incluido el rodaje.",
          "Desde el despegue hasta el aterrizaje en destino, incluida una frustrada en ese aeródromo.",
          "Desde el despegue hasta el aterrizaje en el alterno, pasando por el destino.",
          "Desde el despegue, o el punto de nueva planificación, hasta aterrizar en destino."
        ],
        "correcta": 3,
        "explicacion": "El trayecto va del despegue (o del punto de nueva planificación en vuelo) al aterrizaje en destino. El rodaje es un componente aparte y la aproximación frustrada en destino está dentro del combustible para el alterno.",
        "referencia": "RAC 121, 121.2645 (c)(2) y (c)(4)(i)(A)"
      },
      {
        "id": "c05-q2",
        "enunciado": "Eres copiloto. Por tránsito, el ATC te deja 40 minutos en FL 310 en lugar del FL 370 planificado, cercano al óptimo. ¿Qué efecto esperas sobre el combustible?",
        "opciones": [
          "Sube el consumo; es un imprevisto de los que cubre la contingencia.",
          "Baja el consumo, porque a menor altitud el aire es más denso.",
          "Sube el consumo, y la diferencia se descuenta de la reserva final.",
          "No cambia, porque el FMS corrige el consumo de forma automática."
        ],
        "correcta": 0,
        "explicacion": "Lejos del nivel óptimo el consumo sube y el trayecto real supera al planificado. Los cambios respecto a los niveles de crucero previstos son factores imprevistos que compensa la contingencia; la reserva final no se planifica para consumirse.",
        "referencia": "RAC 121, 121.2645 (c)(3), Nota; Airbus, Getting to Grips with Fuel Economy (2004), 5.3.2"
      },
      {
        "id": "c05-q3",
        "enunciado": "Según Airbus, ¿qué hace el FMS cuando vuelas con un índice de costo (CI) de 0?",
        "opciones": [
          "Vuela a la velocidad que minimiza el tiempo total del vuelo.",
          "Vuela lo más rápido posible, cerca de su velocidad máxima de operación.",
          "Vuela a la velocidad de máximo alcance, gastando menos por distancia.",
          "Mantiene la velocidad del OFP sin optimizar el consumo de combustible."
        ],
        "correcta": 2,
        "explicacion": "El CI compara el costo del tiempo con el del combustible. Con CI 0 el tiempo no cuesta y el FMS vuela a la velocidad de máximo alcance; con valores altos vuela más rápido y gasta más.",
        "referencia": "Airbus, Getting to Grips with Fuel Economy (2004), 3 y 5.3.5; Boeing AERO Q4 2007, Fuel Conservation Strategies: Cruise Flight"
      }
    ]
  },
  {
    "tema": "C06",
    "n": 6,
    "titulo": "Contingency fuel",
    "preguntas": [
      {
        "id": "c06-q1",
        "enunciado": "Según el RAC 121, ¿cuál de estas situaciones es un factor imprevisto de los que compensa el combustible para contingencias?",
        "opciones": [
          "Una espera de 20 minutos publicada por NOTAM para tu hora de llegada.",
          "Un viento de cara más fuerte que el pronosticado en el OFP.",
          "Una falla de motor en el punto más crítico de una ruta sobre agua.",
          "Una aproximación frustrada en destino seguida del desvío al alterno."
        ],
        "correcta": 1,
        "explicacion": "Las desviaciones respecto de la meteorología prevista son factores imprevistos, y para eso está la contingencia. La espera publicada por NOTAM es previsible (va en el plan o como extra), la falla en el punto crítico es del adicional y la frustrada con desvío es del combustible para el alterno.",
        "referencia": "RAC 121, 121.2645 (c)(3), Nota"
      },
      {
        "id": "c06-q2",
        "enunciado": "Eres copiloto. El despacho sabe que a tu hora de llegada hay esperas habituales de unos 15 minutos por congestión. ¿Cómo se debe cubrir esa demora?",
        "opciones": [
          "Con la contingencia, que existe para las demoras prolongadas.",
          "Con el combustible adicional, que cubre las esperas en destino.",
          "Con la reserva final, porque son solo 15 minutos de espera.",
          "En el cálculo del plan o como extra, porque es previsible."
        ],
        "correcta": 3,
        "explicacion": "La contingencia compensa lo imprevisto; una demora que se conoce antes de salir es previsible y va en el cálculo del plan (demoras ATS previstas) o como extra, según tu operador. Si la cargas a la contingencia, te quedas sin margen para lo que sí es imprevisto.",
        "referencia": "RAC 121, 121.2645 (b)(2)(iv), (c)(3), Nota, y (c)(7)"
      },
      {
        "id": "c06-q3",
        "enunciado": "Tu aerolínea quiere calcular la contingencia con un método propio basado en su programa de control del consumo, en lugar del 5 % con piso de 5 minutos. Según el RAC 121, ¿quién puede autorizarlo?",
        "opciones": [
          "La Aerocivil, con una evaluación de riesgos del explotador que lo sustente.",
          "El PIC en cada vuelo, cuando el trayecto es corto y el tiempo es bueno.",
          "El despachador, si tiene datos de consumo actualizados de ese avión.",
          "Nadie: el 5 % y el piso de 5 minutos son fijos para cualquier operador colombiano."
        ],
        "correcta": 0,
        "explicacion": "La Aerocivil puede aprobar variaciones en rodaje, trayecto, contingencias, alterno y adicional si una evaluación de riesgos específica del explotador demuestra un nivel de seguridad equivalente; un método basado en un programa de control del consumo es uno de los ejemplos. Ni el PIC ni el DV pueden cambiarla por su cuenta.",
        "referencia": "RAC 121, 121.2645 (e)"
      }
    ]
  },
  {
    "tema": "C07",
    "n": 7,
    "titulo": "Alternate fuel",
    "preguntas": [
      {
        "id": "c07-q1",
        "enunciado": "Según el RAC 121, ¿qué incluye el combustible para el alterno de destino?",
        "opciones": [
          "Solo el crucero y el descenso desde el destino hasta el alterno, sin contar la frustrada.",
          "El vuelo al alterno más 30 minutos de espera a 1.500 ft sobre ese aeródromo.",
          "Frustrada en destino, ascenso, ruta, descenso, aproximación y aterrizaje en el alterno.",
          "La ruta al alterno y 15 minutos de espera sobre el destino antes de desviarte."
        ],
        "correcta": 2,
        "explicacion": "Son cinco partes, desde la aproximación frustrada en el destino hasta el aterrizaje en el alterno. Los 30 minutos de espera a 1.500 ft son la reserva final, un componente aparte que debe quedar intacto al aterrizar.",
        "referencia": "RAC 121, 121.2645 (c)(4)(i)"
      },
      {
        "id": "c07-q2",
        "enunciado": "Tu despacho lleva dos alternos de destino: el alterno 1, a 150 NM, pide 1.350 kg; el alterno 2, a 170 NM, pide 1.280 kg por el viento de cola. Según el RAC 121, ¿con cuál se calcula el combustible para el alterno?",
        "opciones": [
          "Con el alterno 2, porque es el más lejano de los dos alternos.",
          "Con el alterno 1, porque es el que exige más combustible.",
          "Con el promedio de los dos alternos: unos 1.315 kg.",
          "Con los dos sumados, porque pueden necesitarse ambos."
        ],
        "correcta": 1,
        "explicacion": "Con dos alternos, el RAC 121 planifica el que exige más combustible, no el más lejano. «El más lejano» es el criterio del RAC 91 (91.610 y 91.2012) y de la FAA; con viento, distancia y combustible pueden no coincidir.",
        "referencia": "RAC 121, 121.2645 (c)(4)(ii); RAC 91, 91.2012 (c)(4), Nota"
      },
      {
        "id": "c07-q3",
        "enunciado": "Según el RAC 121, ¿cuándo se deben especificar dos alternos de destino en el despacho y en el plan de vuelo?",
        "opciones": [
          "Si a la hora prevista el destino estará bajo mínimos o no hay información meteorológica.",
          "Si el vuelo planificado dura más de 6 horas o cruza zonas remotas sin aeródromos cerca.",
          "Si el primer alterno queda a más de 200 NM del aeródromo de destino del vuelo.",
          "Si el destino tiene una sola pista o si el alterno suele estar congestionado."
        ],
        "correcta": 0,
        "explicacion": "Se exigen dos alternos cuando las condiciones del destino a la hora prevista de uso estarán por debajo de los mínimos de utilización del explotador o no se dispone de información meteorológica. Una sola pista o un alterno congestionado son razones para pensar en extra, no requisitos de un segundo alterno.",
        "referencia": "RAC 121, 121.2585 (b)"
      }
    ]
  },
  {
    "tema": "C08",
    "n": 8,
    "titulo": "Final reserve fuel",
    "preguntas": [
      {
        "id": "c08-q1",
        "enunciado": "Vuelas un avión de turbina bajo el RAC 121. ¿Cuál es su reserva final?",
        "opciones": [
          "45 minutos de vuelo a la altitud normal de crucero.",
          "30 minutos a consumo normal de crucero sobre el aeródromo alterno.",
          "15 minutos a velocidad de espera a 1.500 ft sobre el destino.",
          "30 minutos a velocidad de espera a 1.500 ft sobre el aeródromo."
        ],
        "correcta": 3,
        "explicacion": "En turbina son 30 minutos a velocidad de espera a 450 m (1.500 ft) sobre la elevación del aeródromo, en condiciones normales. Los 45 minutos a altitud normal de crucero son la reserva IFR del RAC 91, Parte 1, y los 15 minutos de espera corresponden al adicional o al vuelo sin alterno de la OACI.",
        "referencia": "RAC 121, 121.2645 (c)(5)(ii)"
      },
      {
        "id": "c08-q2",
        "enunciado": "El OFP muestra la reserva final como una cantidad fija en kg. Según el RAC 121, ¿con qué peso se calcula?",
        "opciones": [
          "Con el peso estimado a la llegada al aeródromo alterno de destino.",
          "Con el peso máximo de aterrizaje certificado del avión.",
          "Con el peso de despegue previsto en el despacho del vuelo.",
          "Con el peso estimado al llegar al destino, antes de la aproximación."
        ],
        "correcta": 0,
        "explicacion": "La reserva final se calcula con el peso estimado a la llegada al alterno de destino; por eso aparece en el OFP como una cifra en kg, la reserva final prevista. Esa cifra, no «media hora» en abstracto, es la que vigilas en vuelo.",
        "referencia": "RAC 121, 121.2645 (c)(5)"
      },
      {
        "id": "c08-q3",
        "enunciado": "Tu operador pide a la Aerocivil reducir la reserva final de su flota, con una evaluación de riesgos basada en su programa de control del consumo. Según el RAC 121, ¿qué puede aprobar la Aerocivil?",
        "opciones": [
          "Una reserva de 20 minutos, siempre que haya un alterno en ruta designado.",
          "Una reducción proporcional a la mejora demostrada en los datos de consumo.",
          "Nada: la reserva final no está entre los componentes que admiten variaciones.",
          "La reducción, siempre que el PIC la acepte expresamente al firmar cada despacho."
        ],
        "correcta": 2,
        "explicacion": "La Aerocivil puede aprobar variaciones en rodaje, trayecto, contingencias, alterno y adicional, pero la reserva final no está en esa lista. Es la barrera que protege el aterrizaje en cualquier aeródromo.",
        "referencia": "RAC 121, 121.2645 (e)"
      }
    ]
  },
  {
    "tema": "C09",
    "n": 9,
    "titulo": "Additional fuel y extra fuel",
    "preguntas": [
      {
        "id": "c09-q1",
        "enunciado": "Según el RAC 121, ¿cuándo debe aparecer combustible adicional distinto de cero en el OFP?",
        "opciones": [
          "Siempre que la ruta sea larga o sobre agua, como un 5 % más sobre el trayecto planificado.",
          "Si los demás no alcanzan para una falla de motor o despresurización en el punto más crítico.",
          "Cuando el PIC prevé demoras en el destino por meteorología, congestión o una pista cerrada.",
          "Cuando el destino no tiene alterno y hay que llevar 15 minutos de espera sobre él."
        ],
        "correcta": 1,
        "explicacion": "El adicional solo aparece si trayecto, contingencias, alterno y reserva final no permiten que, tras una falla de motor o una despresurización en el punto más crítico, el avión llegue a un alterno, espere 15 minutos a 1.500 ft y aterrice. Si los demás alcanzan, sale en cero.",
        "referencia": "RAC 121, 121.2645 (c)(6)(i)"
      },
      {
        "id": "c09-q2",
        "enunciado": "Según EASA (CAT.OP.MPA.181 y su GM1), ¿en qué se diferencian el combustible extra y el discrecional?",
        "opciones": [
          "Extra: lo exige la norma para una falla en el punto crítico; discrecional: cubre lo imprevisto.",
          "Son el mismo componente con dos nombres, igual que en el RAC 121, y lo decide el comandante.",
          "Extra: demoras previstas o restricciones conocidas; discrecional: a sola discreción del comandante.",
          "Extra: lo decide el comandante antes de salir; discrecional: lo propone el despacho según cada ruta."
        ],
        "correcta": 2,
        "explicacion": "EASA separa el extra, que cubre demoras previstas o restricciones operacionales conocidas antes de salir (por ejemplo, por NOTAM), del discrecional, que queda a la sola discreción del comandante. En el RAC 121 los dos forman un solo componente, «discrecional o extra», a juicio del PIC.",
        "referencia": "EASA, CAT.OP.MPA.181 (c)(7) y (c)(8); GM1 CAT.OP.MPA.181 (j) y (k)"
      },
      {
        "id": "c09-q3",
        "enunciado": "Tu aerolínea empieza a volar una ruta sobre agua con aprobación EDTO. Además de la falla de motor o la despresurización en el punto más crítico, ¿qué otro requisito del RAC 121 puede hacer que el adicional del OFP sea mayor que cero?",
        "opciones": [
          "Una espera publicada por NOTAM para la hora de llegada al destino.",
          "Un alterno con pronóstico marginal a la hora prevista de uso.",
          "Un rodaje más largo de lo previsto por congestión en la salida.",
          "El combustible crítico exigido en una operación EDTO."
        ],
        "correcta": 3,
        "explicacion": "El adicional también cubre el escenario de combustible crítico para EDTO y otros requisitos no considerados antes. La espera por NOTAM va en el plan o como extra, el alterno marginal justifica extra y un rodaje largo se paga con el margen antes del despegue.",
        "referencia": "RAC 121, 121.2645 (c)(6)(ii) y (iii); 121.2581 (b)(5)"
      }
    ]
  },
  {
    "tema": "C10",
    "n": 10,
    "titulo": "Combustible discrecional del comandante",
    "preguntas": [
      {
        "id": "c10-q1",
        "enunciado": "En el RAC 121, ¿quién decide la cantidad de combustible discrecional o extra?",
        "opciones": [
          "El piloto al mando, según su juicio sobre el vuelo.",
          "El despachador, según la política de combustible de la empresa.",
          "La Aerocivil, al aprobar el manual de operaciones del explotador.",
          "El ATC, según las demoras que prevé en el destino."
        ],
        "correcta": 0,
        "explicacion": "Es «la cantidad de combustible que a juicio del piloto al mando puede adicionarse». El despachador puede proponer extra según la política de la empresa, pero la decisión sobre el discrecional es del PIC.",
        "referencia": "RAC 121, 121.2645 (c)(7)"
      },
      {
        "id": "c10-q2",
        "enunciado": "Cargar más combustible del que el vuelo necesita, ¿qué efecto tiene?",
        "opciones": [
          "Ninguno relevante, porque más combustible siempre significa un vuelo más seguro.",
          "Solo sube el costo, porque el consumo depende del nivel de vuelo y no del peso.",
          "Más peso: más consumo, más carrera de despegue y menos margen a las masas máximas.",
          "Mejora el alcance, porque con más peso el avión vuela más estable en crucero."
        ],
        "correcta": 2,
        "explicacion": "Hay que transportar combustible para transportar combustible: el peso extra aumenta el consumo, alarga el despegue y puede acercarte a la masa máxima de despegue o de aterrizaje. Por eso se carga el extra que la situación justifica, no el máximo posible.",
        "referencia": "Airbus, Getting to Grips with Fuel Economy (2004), 4.2.2; Boeing (Anderson), Fuel Conservation Operational Procedures, 2006"
      },
      {
        "id": "c10-q3",
        "enunciado": "Airbus estima que un aumento de peso igual al 1 % de la masa máxima de despegue reduce en promedio cerca de un 1 % el alcance específico. Tu avión tiene una masa máxima de despegue de 60 t y llevas 900 kg de extra en un trayecto de 4.000 kg. ¿Cuánto combustible de más quemarías, aproximadamente?",
        "opciones": [
          "Unos 14 kg",
          "Unos 60 kg",
          "Unos 600 kg",
          "Nada: el extra no se consume"
        ],
        "correcta": 1,
        "explicacion": "Los 900 kg son el 1,5 % de 60 t, así que el alcance específico baja cerca de un 1,5 % y el trayecto sube en esa proporción: 4.000 × 0,015 = 60 kg. Es poco frente a una espera disponible en un destino con tormentas, pero no es gratis.",
        "referencia": "Airbus, Getting to Grips with Fuel Economy (2004), 4.2.2"
      }
    ]
  },
  {
    "tema": "C11",
    "n": 11,
    "titulo": "Fuel tankering",
    "preguntas": [
      {
        "id": "c11-q1",
        "enunciado": "¿Qué es el fuel tankering?",
        "opciones": [
          "Cargar el discrecional que el PIC decide por la meteorología prevista en el destino.",
          "Pasar combustible entre tanques en vuelo para corregir un desbalance lateral.",
          "Cargar el adicional que exige la norma para una falla en el punto más crítico.",
          "Llevar desde origen más combustible del requerido para cargar menos en destino."
        ],
        "correcta": 3,
        "explicacion": "Es transportar combustible de más para reducir o evitar la carga en destino, normalmente por precio, disponibilidad o tiempo en tierra. Es una decisión económica o logística, no un margen de seguridad como el discrecional.",
        "referencia": "EUROCONTROL, Think Paper #1: Fuel Tankering (2019); Airbus, Getting to Grips with Fuel Economy (2004), 4.5"
      },
      {
        "id": "c11-q2",
        "enunciado": "Airbus define el coeficiente de transporte K como el aumento de la masa de despegue dividido por el aumento de la masa de aterrizaje. Con K = 1,2, ¿cuánto combustible debes cargar de más en origen para llegar a destino con 2.000 kg adicionales?",
        "opciones": [
          "1.670 kg",
          "2.000 kg",
          "2.400 kg",
          "2.600 kg"
        ],
        "correcta": 2,
        "explicacion": "Cada kg que quieres tener en destino exige cargar K kg en origen: 2.000 × 1,2 = 2.400 kg. Los 400 kg de diferencia son el combustible que se quema por transportar combustible.",
        "referencia": "Airbus, Getting to Grips with Fuel Economy (2004), 4.5"
      },
      {
        "id": "c11-q3",
        "enunciado": "La empresa planea tankering porque el combustible en destino es mucho más caro. La pista de destino está reportada mojada y, con el peso extra, el aterrizaje queda al límite de la performance. Eres el PIC. ¿Qué haces?",
        "opciones": [
          "Aceptas: el tankering es una decisión económica y la toma la empresa.",
          "Lo consultas con el despacho y se reduce para cumplir la performance.",
          "Cargas todo y, si hace falta, esperas en destino hasta quemar el exceso.",
          "Aceptas, porque ese exceso cuenta como discrecional y te da más margen."
        ],
        "correcta": 1,
        "explicacion": "El peso al aterrizar debe cumplir la masa máxima y la distancia de aterrizaje en destino y alternos; en pista mojada, el peso extra puede pesar más que el ahorro. Esperar para quemar el exceso anula el beneficio económico, como advierte Airbus.",
        "referencia": "RAC 121, 121.2835 (a)(2); Airbus, Getting to Grips with Fuel Economy (2004), 4.5"
      }
    ]
  },
  {
    "tema": "C12",
    "n": 12,
    "titulo": "Monitorización del combustible en vuelo",
    "preguntas": [
      {
        "id": "c12-q1",
        "enunciado": "Vas a volar para una aerolínea colombiana. ¿Qué dice el RAC 121 sobre cada cuánto se hace un fuel check en crucero?",
        "opciones": [
          "Fija uno en cada waypoint o al menos cada 30 minutos, lo que ocurra primero en crucero.",
          "Fija al menos uno cada 60 minutos en crucero, igual que la norma europea.",
          "No fija un intervalo: lo establece el MO del operador, aprobado por la Aerocivil.",
          "Fija uno en cada punto del OFP, sin importar cuánto tiempo pase entre un punto y otro."
        ],
        "correcta": 2,
        "explicacion": "El RAC 121 exige que el explotador tenga criterios y procedimientos aprobados para las verificaciones del combustible en vuelo, pero el intervalo lo pone el MO. Los 60 minutos son la referencia de EASA, y cada waypoint o cada 30 minutos, la recomendación de Airbus.",
        "referencia": "RAC 121, 121.2553 (a) y Apéndice 10, A9.3.18; EASA, AMC1 CAT.OP.MPA.185(a); Airbus, Safety First, «Fuel Leak Management in Flight» (2025)"
      },
      {
        "id": "c12-q2",
        "enunciado": "Eres PM. Al poner en marcha había 7.800 kg a bordo. En el punto de control el OFP prevé 5.400 kg; el FOB marca 5.260 kg y el FU acumulado desde la puesta en marcha es 2.540 kg. ¿Qué concluyes?",
        "opciones": [
          "Hay una fuga de unos 140 kg: aplicas el procedimiento de fuga del QRH.",
          "La suma cuadra: los 140 kg de menos son consumo mayor al previsto, no fuga.",
          "No se puede concluir nada sin comparar la suma con el combustible de despegue.",
          "Es un error de indicación: el FOB debe coincidir siempre con el del OFP."
        ],
        "correcta": 1,
        "explicacion": "5.260 + 2.540 = 7.800 kg, igual al combustible al poner en marcha: no falta combustible que los motores no hayan quemado. La diferencia con el OFP es consumo mayor al previsto (viento, nivel o ruta) y se sigue en los próximos fuel checks.",
        "referencia": "Airbus, Safety First, «Fuel Leak Management in Flight» (2025), Check 1 (FOB + FU frente al combustible al inicio del vuelo); Doc 9976, 6.6 f) y g)"
      },
      {
        "id": "c12-q3",
        "enunciado": "Según el informe oficial del vuelo Air Transat 236 (GPIAA, 2001), ¿qué hizo la tripulación del A330 ante la pérdida de combustible?",
        "opciones": [
          "Aplicó de memoria el procedimiento de desbalance y no el de fuga, y así alimentó la fuga.",
          "Detectó la fuga con la prueba FOB + FU y aplicó el QRH de fuga, pero ya era tarde.",
          "Declaró combustible mínimo en vez de MAYDAY, y el ATC no le dio prioridad a tiempo.",
          "Confundió libras con kilos al calcular la carga y despegó con menos combustible."
        ],
        "correcta": 0,
        "explicacion": "El informe concluye que la tripulación no reconoció la fuga y aplicó de memoria el procedimiento de desbalance, con lo que terminó alimentándola; el avión planeó hasta Lajes. La confusión de libras y kilos es el caso de Air Canada 143.",
        "referencia": "GPIAA, informe final 22/ACCID/GPIAA/2001, 3.1 (hallazgos 10 a 12)"
      }
    ]
  },
  {
    "tema": "C13",
    "n": 13,
    "titulo": "Fuel check",
    "preguntas": [
      {
        "id": "c13-q1",
        "enunciado": "Eres copiloto en crucero. Acaban de desviarse 20 minutos por tormentas con el antihielo de motores encendido, y el próximo punto de fuel check del MO está a 40 minutos. ¿Qué haces?",
        "opciones": [
          "Esperas al punto del MO: el fuel check solo se hace en los puntos o intervalos planificados.",
          "Lo dejas para el briefing de llegada, que es donde se actualiza la predicción al destino.",
          "Haces un fuel check solo si aparece una alerta de combustible en el ECAM o el EICAS.",
          "Haces ya un fuel check y actualizas la predicción: el desvío y el antihielo cambian el consumo."
        ],
        "correcta": 3,
        "explicacion": "Además de los puntos del MO, el fuel check se hace después de todo lo que cambie el consumo: rerruta, cambio de nivel, espera, desvío por meteorología, antihielo prolongado o una falla. Esperar 40 minutos es decidir tarde y con cifras viejas.",
        "referencia": "Doc 9976, 6.6 (a intervalos, en puntos del OFP «o cuando se requiera»); RAC 91, 91.610 (b); Anexo 6, Parte I, 4.3.6.7"
      },
      {
        "id": "c13-q2",
        "enunciado": "En el punto A vas 60 kg por debajo del plan. En el punto B, 45 minutos después, vas 150 kg por debajo, y la suma FOB + FU cuadra. ¿A qué ritmo te estás apartando del plan?",
        "opciones": [
          "Unos 90 kg por hora.",
          "Unos 120 kg por hora.",
          "Unos 150 kg por hora.",
          "Unos 200 kg por hora."
        ],
        "correcta": 1,
        "explicacion": "El ritmo es el cambio de la diferencia dividido entre el tiempo: 90 kg en 45 minutos (0,75 h) son unos 120 kg/h. 90 kg/h olvida pasar a horas, y 200 kg/h sale de dividir la diferencia total, no su cambio.",
        "referencia": "Módulo C13, «Cómo se detecta una tendencia»; Doc 9976, 6.6 a) y f)"
      },
      {
        "id": "c13-q3",
        "enunciado": "En un fuel check, ¿qué comparación te dice si todavía conservas la opción de ir al alterno?",
        "opciones": [
          "El FOB real contra el combustible que el OFP planificó para ese punto.",
          "La hora real contra la hora planificada para ese mismo punto.",
          "La suma FOB + FU contra el combustible al poner en marcha.",
          "La predicción al destino contra el alterno más la reserva final."
        ],
        "correcta": 3,
        "explicacion": "Si la predicción al aterrizar en destino queda por encima del alterno más la reserva final, todavía puedes desviarte con la reserva intacta; si cae por debajo, la norma pide información de demoras. Las otras comparaciones miden el desvío del plan y sirven para detectar fugas.",
        "referencia": "RAC 121, 121.2553 (b)(1); Doc 9976, 6.6 k); EASA, AMC1 CAT.OP.MPA.185(a), (b)(2)"
      }
    ]
  },
  {
    "tema": "C14",
    "n": 14,
    "titulo": "Fuel prediction",
    "preguntas": [
      {
        "id": "c14-q1",
        "enunciado": "¿Sobre qué cifra se aplican los tres avisos del RAC 121 (pedir demoras, «combustible mínimo» y «MAYDAY, MAYDAY, MAYDAY, COMBUSTIBLE»)?",
        "opciones": [
          "Sobre el FOB que indica el avión en este momento, comparado con la reserva final.",
          "Sobre el combustible calculado al aterrizar, es decir, sobre predicciones.",
          "Sobre el FU acumulado, comparado con el combustible para el trayecto del OFP.",
          "Sobre el combustible de despegue que quedó registrado en el OFP del vuelo."
        ],
        "correcta": 1,
        "explicacion": "Los tres avisos hablan de lo que «puede resultar» o de lo que, «según lo calculado», estaría disponible al aterrizar: son predicciones. Por eso se decide con la predicción actualizada y no con el FOB del momento.",
        "referencia": "RAC 121, 121.2553 (b)(1), (2) y (3); Anexo 6, Parte I, 4.3.7.2.1 a 4.3.7.2.3"
      },
      {
        "id": "c14-q2",
        "enunciado": "El ATC te anuncia vectores que alargan la llegada y una espera de 10 minutos, pero todavía no los cargas en el FMS. ¿Qué pasa con la predicción al destino que te muestra el FMS?",
        "opciones": [
          "Se ajusta sola, porque el FMS recibe las instrucciones del ATC.",
          "Queda pesimista, porque el FMS asume siempre la llegada más larga.",
          "Sigue igual y es optimista: no incluye ni los vectores ni la espera.",
          "Deja de importar, porque en la llegada manda la cifra del OFP."
        ],
        "correcta": 2,
        "explicacion": "El FMS predice con la ruta, los vientos, el nivel y las restricciones que tiene cargados; si no le das la espera ni los vectores, sigue mostrando la llegada vieja. Después de cada cambio se actualiza el FMS y se vuelve a leer la predicción.",
        "referencia": "Doc 9976, 6.6 d) y h); Airbus, Safety First, «Fuel Leak Management in Flight» (2025), Check 2 (FOB frente a la predicción del FMS)"
      },
      {
        "id": "c14-q3",
        "enunciado": "Ya en la llegada, ¿contra qué cifra se compara la predicción de combustible al aterrizar en el alterno si te desviaras desde donde estás?",
        "opciones": [
          "Contra la reserva final prevista del OFP.",
          "Contra el alterno más la reserva final.",
          "Contra la contingencia que queda sin usar.",
          "Contra el combustible para una segunda aproximación."
        ],
        "correcta": 0,
        "explicacion": "La predicción al alterno dice con cuánto aterrizarías allí si te desvías ahora, y lo mínimo con lo que se aterriza en cualquier aeródromo es la reserva final prevista. El alterno más la reserva final es la línea de la predicción al destino.",
        "referencia": "RAC 121, 121.2553 (b) y (b)(3), Nota 1; Anexo 6, Parte I, 4.3.7.2"
      }
    ]
  },
  {
    "tema": "C15",
    "n": 15,
    "titulo": "Combustible y toma de decisiones",
    "preguntas": [
      {
        "id": "c15-q1",
        "enunciado": "Con poco combustible, la prioridad pasa a ser el alcance. Según Boeing (AERO, 2007), ¿qué conviene programar en el FMS?",
        "opciones": [
          "La velocidad de largo alcance (LRC), que da más millas por kilo que cualquier índice de costo.",
          "El índice de costo de la empresa, porque ya optimiza el combustible de ese vuelo.",
          "Un índice de costo alto, para llegar antes y pasar menos tiempo en el aire.",
          "Un índice de costo muy bajo; con cero se obtiene el máximo alcance."
        ],
        "correcta": 3,
        "explicacion": "Boeing advierte que muchos pilotos eligen LRC creyendo que da más millas, pero la mejor estrategia para conservar combustible es un índice de costo muy bajo, con cero para el máximo alcance. Un índice alto hace lo contrario: más velocidad y más consumo.",
        "referencia": "Boeing, AERO Q4 2007, «Fuel Conservation Strategies: Cruise Flight»"
      },
      {
        "id": "c15-q2",
        "enunciado": "En vuelo concluyes que ya no puedes seguir con seguridad según lo planificado. ¿Qué responsabilidad le da el RAC 121 al despachador (DV)?",
        "opciones": [
          "Ninguna: en vuelo solo decide el PIC, y el DV se limita a registrar por escrito lo que el PIC decida.",
          "Responde por el redespacho o la cancelación si él o tú creen que no se puede seguir con seguridad.",
          "Debe autorizar por escrito cualquier desvío o cambio de destino antes de que el PIC lo ejecute.",
          "Solo interviene si el PIC declara MAYDAY y pide asistencia expresa al centro de despacho."
        ],
        "correcta": 1,
        "explicacion": "El DV es responsable de la cancelación o el redespacho si, en su opinión o en la del PIC, el vuelo no puede continuar con seguridad según lo planificado. Por eso conviene involucrarlo cuando haya tiempo: ve información que tú no ves.",
        "referencia": "RAC 121, 121.2215 (d)(7)"
      },
      {
        "id": "c15-q3",
        "enunciado": "Llegando al destino, la predicción al aterrizar es 3.000 kg y tu alterno más la reserva final suman 2.700 kg. El ATC anuncia 10 minutos de espera y en espera consumes 50 kg/min. ¿Qué decisión protege tus opciones?",
        "opciones": [
          "Aceptar solo unos 6 minutos, pedir la hora prevista de aproximación o desviarte ahora.",
          "Aceptar la espera completa: aterrizarías con 2.500 kg, que sigue sobre la reserva final.",
          "Declarar combustible mínimo antes de entrar en la espera, para obtener prioridad.",
          "Declarar MAYDAY COMBUSTIBLE, porque la espera te dejaría bajo el alterno más la reserva."
        ],
        "correcta": 0,
        "explicacion": "Tu margen sobre alterno más reserva final es de 300 kg, unos 6 minutos a 50 kg/min; la espera completa te dejaría en 2.500 kg y sin alterno. Aterrizar sobre la reserva final no basta: aceptar toda la espera es renunciar a la segunda opción, y eso se decide ahora.",
        "referencia": "RAC 121, 121.2553 (b)(1); Doc 9976, 6.4.25 y 6.4.26"
      }
    ]
  },
  {
    "tema": "C16",
    "n": 16,
    "titulo": "Minimum fuel",
    "preguntas": [
      {
        "id": "c16-q1",
        "enunciado": "Estás en espera sobre el destino. Ya no alcanzas el alterno con la reserva final intacta y calculas que cualquier demora adicional te haría aterrizar con menos de la reserva final prevista. ¿Qué le dices al ATC?",
        "opciones": [
          "«MAYDAY, MAYDAY, MAYDAY, COMBUSTIBLE».",
          "«PAN PAN, PAN PAN, PAN PAN», combustible bajo.",
          "«COMBUSTIBLE MÍNIMO».",
          "Solo pides información sobre la demora prevista."
        ],
        "correcta": 2,
        "explicacion": "Se cumplen las dos condiciones: estás obligado a un aeródromo específico y cualquier cambio en la autorización puede dejarte bajo la reserva final prevista. MAYDAY corresponde cuando ya calculas aterrizar bajo la reserva final en el aeródromo más cercano, y pedir demoras es el paso anterior.",
        "referencia": "RAC 121, 121.2553 (b)(2); Anexo 6, Parte I, 4.3.7.2.2; Doc 4444, 12.3.1.3"
      },
      {
        "id": "c16-q2",
        "enunciado": "¿Qué le comunica al ATC la declaración de «COMBUSTIBLE MÍNIMO»?",
        "opciones": [
          "Que hay una emergencia y que el avión necesita prioridad inmediata para aterrizar.",
          "Que sus opciones se redujeron a un aeródromo y que más demora podría llevar a una emergencia.",
          "Que el avión aterrizará con menos de la reserva final prevista incluso en el aeródromo más cercano.",
          "Que el piloto pide información de demoras antes de decidir si se desvía al alterno."
        ],
        "correcta": 1,
        "explicacion": "La Nota de la norma lo dice: no es una situación de emergencia, sino una indicación de que podría producirse una si hay más demora. Tampoco da prioridad (el Doc 9976, EASA y la FAA coinciden); aterrizar bajo la reserva final en el aeródromo más cercano es el criterio de MAYDAY.",
        "referencia": "RAC 121, 121.2553 (b)(2), Nota; Doc 4444, 15.5.4.1, Nota; Doc 9976, 6.8.5, Nota 1; EASA, GM1 CAT.OP.MPA.185 (f); AIM 5-5-15"
      },
      {
        "id": "c16-q3",
        "enunciado": "Declaras «COMBUSTIBLE MÍNIMO». Según el Doc 4444, ¿cuál es la respuesta normalizada del controlador?",
        "opciones": [
          "«RECIBIDO, PRIORIDAD CONCEDIDA, NÚMERO UNO PARA LA APROXIMACIÓN».",
          "«RECIBIDO, NOTIFIQUE PERSONAS A BORDO Y AUTONOMÍA».",
          "«RECIBIDO, NO SE PREVÉ DEMORA» o «RECIBIDO, PREVEA» con la demora.",
          "«ENTENDIDO, EMERGENCIA DECLARADA, SERVICIOS DE SALVAMENTO ALERTADOS»."
        ],
        "correcta": 2,
        "explicacion": "La fraseología es «RECIBIDO» seguido de «NO SE PREVÉ DEMORA» o de «PREVEA» con la información de la demora (en inglés, ROGER, NO DELAY EXPECTED o EXPECT). El controlador debe darte esa información lo antes posible; el combustible mínimo no da prioridad ni es una emergencia.",
        "referencia": "Doc 4444, 12.3.1.3 y 15.5.4.1"
      }
    ]
  },
  {
    "tema": "C17",
    "n": 17,
    "titulo": "Mayday fuel",
    "preguntas": [
      {
        "id": "c17-q1",
        "enunciado": "¿Cuándo exige el RAC 121 declarar «MAYDAY, MAYDAY, MAYDAY, COMBUSTIBLE»?",
        "opciones": [
          "Cuando el FOB indicado en este momento llega a la cantidad de la reserva final prevista del OFP.",
          "Cuando ya no alcanzas el alterno con la reserva final intacta y quedas obligado a aterrizar en destino.",
          "Cuando el ATC no te confirma una hora de aproximación después de declarar «combustible mínimo».",
          "Cuando calculas aterrizar bajo la reserva final en el aeródromo más cercano con aterrizaje seguro."
        ],
        "correcta": 3,
        "explicacion": "El criterio es una predicción: el combustible utilizable calculado al aterrizar en el aeródromo más cercano donde puedes aterrizar con seguridad, frente a la reserva final prevista. Quedar obligado al destino es la condición del combustible mínimo, no la de la emergencia.",
        "referencia": "RAC 121, 121.2553 (b)(3); Anexo 6, Parte I, 4.3.7.2.3; Doc 9976, 6.9"
      },
      {
        "id": "c17-q2",
        "enunciado": "Calculas que aterrizarás bajo la reserva final en el aeródromo más cercano y vas a declarar la emergencia. ¿Qué transmisión sigue lo que enseña este capítulo?",
        "opciones": [
          "«Aviatory 456, estamos cortos de combustible y solicitamos prioridad, nos quedan 1.300 kilos».",
          "«COMBUSTIBLE MÍNIMO, Aviatory 456», con la intención y una autonomía de 1.300 kg.",
          "«MAYDAY, MAYDAY, MAYDAY, COMBUSTIBLE, Aviatory 456», intención y autonomía de 25 minutos.",
          "«PAN PAN, PAN PAN, PAN PAN, Aviatory 456», combustible bajo y autonomía de 1.300 kg."
        ],
        "correcta": 2,
        "explicacion": "La emergencia se declara con las palabras exactas del RAC 121, y la autonomía se da en tiempo porque el controlador no convierte kilos a minutos. «Estamos cortos de combustible» no activa nada, y «combustible mínimo» no es una emergencia.",
        "referencia": "RAC 121, 121.2553 (b)(3); Doc 4444, 15.1.1.2; AIM 5-5-15 (combustible remanente en minutos)"
      },
      {
        "id": "c17-q3",
        "enunciado": "Después de un vuelo en el que declaraste MAYDAY COMBUSTIBLE y te apartaste de procedimientos, ¿qué plazos aplican para ti como PIC?",
        "opciones": [
          "Aviso a la autoridad de investigación dentro de 10 días y reporte escrito a la Aerocivil dentro de 12 horas.",
          "Reporte escrito en 10 días calendario tras volver a tu base y aviso a la autoridad de investigación en 12 h.",
          "Reporte escrito a la Aerocivil dentro de 72 horas y aviso a la autoridad de investigación dentro de 30 días.",
          "Ninguno: si nadie resultó herido, basta con anotar la emergencia en el libro de a bordo."
        ],
        "correcta": 1,
        "explicacion": "El PIC que ejerce la autoridad de emergencia envía un reporte escrito de la desviación dentro de los 10 días calendario después de regresar a su base (121.2300). Una emergencia por combustible puede ser incidente grave, y la tripulación se comunica con la autoridad de investigación dentro de las 12 horas (114.335).",
        "referencia": "RAC 121, 121.2300 (a) y (c)(2); RAC 114, 114.335 (a) y Adjunto C, literal o)"
      }
    ]
  },
  {
    "tema": "C18",
    "n": 18,
    "titulo": "Esperas y combustible",
    "preguntas": [
      {
        "id": "c18-q1",
        "enunciado": "Llamemos «combustible para abandonar la espera» al necesario para ir de la espera al alterno y aterrizar con la reserva final. ¿Cómo calculas el tiempo disponible en espera?",
        "opciones": [
          "(Combustible a bordo − reserva final) ÷ consumo en espera.",
          "(Combustible a bordo − combustible para abandonar la espera) ÷ consumo en crucero.",
          "(Combustible para abandonar la espera − reserva final) ÷ consumo en espera.",
          "(Combustible a bordo − combustible para abandonar la espera) ÷ consumo en espera."
        ],
        "correcta": 3,
        "explicacion": "Lo que puedes gastar esperando es lo que tienes por encima del combustible para abandonar la espera, dividido entre el consumo en espera. Restar solo la reserva final es gastarte, sin darte cuenta, el combustible del alterno.",
        "referencia": "Módulo C18, «La cifra que manda en una espera»; RAC 121, 121.2553 (b) y (b)(1)"
      },
      {
        "id": "c18-q2",
        "enunciado": "Entras en espera con 3.850 kg. Para abandonarla hacia el alterno necesitas 1.600 kg para llegar al alterno más 1.200 kg de reserva final. En espera consumes 50 kg/min. ¿Cuánto puedes esperar conservando el alterno?",
        "opciones": [
          "Unos 21 minutos.",
          "Unos 45 minutos.",
          "Unos 53 minutos.",
          "Unos 77 minutos."
        ],
        "correcta": 0,
        "explicacion": "(3.850 − 1.600 − 1.200) ÷ 50 = 1.050 ÷ 50, unos 21 minutos. Con esa cifra fijas, antes de entrar, a qué hora sales hacia el alterno si no hay aproximación; 53 minutos sale de restar solo la reserva final.",
        "referencia": "Módulo C18, «Tiempo disponible en espera»; RAC 121, 121.2553 (b)(1)"
      },
      {
        "id": "c18-q3",
        "enunciado": "El ATC te asigna una espera sobre el destino «por tránsito», sin más datos. Antes de aceptarla, ¿qué información le pides?",
        "opciones": [
          "Solo el nivel, el tramo de alejamiento y el sentido de los virajes; la demora la estimas con el FMS.",
          "Prioridad para la aproximación, porque cualquier espera sobre el destino consume la contingencia.",
          "La hora prevista de aproximación o la demora, su causa y si otros aviones se desvían a tu alterno.",
          "Autorización para declarar combustible mínimo apenas entres en la espera, por si la demora crece."
        ],
        "correcta": 2,
        "explicacion": "Con la hora prevista de aproximación (EAT) o la demora y su causa sabes si la espera cabe en tu tiempo disponible, y la situación del alterno te dice si esa opción sigue valiendo. Pedir información de demoras no es pedir asistencia ni declarar urgencia.",
        "referencia": "RAC 121, 121.2553 (b)(1); Doc 9976, 6.7.2 y 6.4.28 b)"
      }
    ]
  },
  {
    "tema": "C19",
    "n": 19,
    "titulo": "Combustible y aeropuerto alterno",
    "preguntas": [
      {
        "id": "c19-q1",
        "enunciado": "Según el Doc 9976, ¿cuándo suele ser mejor tomar la decisión de desviarte al alterno?",
        "opciones": [
          "Después de una aproximación frustrada en destino, que es lo que prevé el combustible del alterno.",
          "Cuando la predicción al destino llega exactamente a la cantidad de la reserva final prevista.",
          "Temprano: antes de quemar el combustible de aproximación y aun antes de agotar la contingencia.",
          "Cuando ya consumiste en la espera toda la contingencia y todo el combustible discrecional."
        ],
        "correcta": 2,
        "explicacion": "El Doc 9976 dice que en muchos casos la mejor decisión es un desvío temprano, para no tener que elegir más tarde entre menos opciones, y que puede tomarse antes de quemar el combustible de aproximación e incluso antes de consumir toda la contingencia. Esperar a llegar a la reserva final ya no es gestionar el combustible.",
        "referencia": "Doc 9976, 6.4.25 y 6.4.26"
      },
      {
        "id": "c19-q2",
        "enunciado": "En crucero, el TAF enmendado de tu alterno trae niebla bajo sus mínimos de planificación a la hora de llegada. El destino sigue con buen tiempo. ¿Qué te permite el RAC 121?",
        "opciones": [
          "Enmendar el despacho en ruta con otro alterno al alcance del avión, y registrar la enmienda.",
          "Nada: el alterno que figura en el despacho no puede cambiarse después del despegue, solo en tierra.",
          "Seguir sin alterno: basta con que el destino tenga buen tiempo y haya combustible.",
          "Cambiarlo solo con una autorización escrita de la Aerocivil, pedida antes del cambio."
        ],
        "correcta": 0,
        "explicacion": "El despacho puede enmendarse en ruta para incluir cualquier alterno dentro del alcance del avión, y quien lo enmienda lo registra; se coordina con el despachador y se recalcula, porque el nuevo alterno puede pedir más combustible. En Colombia todo vuelo debe tener al menos un alterno.",
        "referencia": "RAC 121, 121.2625 (b)(2) e (i); 121.001, definición de aeródromo aislado, Nota"
      },
      {
        "id": "c19-q3",
        "enunciado": "¿Qué le permite al PIC el procedimiento que el Doc 9976 llama «desviarse o comprometerse» con el destino?",
        "opciones": [
          "Usar parte de la reserva final para esperar en el destino, si el ATC le asigna una hora prevista de aproximación.",
          "Usar el combustible del alterno para seguir o esperar en el destino, si aterriza allí con no menos de la reserva final.",
          "Declarar combustible mínimo antes de quedar obligado a un aeródromo, para asegurar su turno en la secuencia de aproximación.",
          "Cambiar el destino por el alterno sin enmendar el despacho ni avisar al despachador, si hay combustible."
        ],
        "correcta": 1,
        "explicacion": "Si la autoridad y el MO lo permiten, el PIC puede convertir el combustible del alterno en combustible para seguir o esperar en el destino cuando concluye que aterrizará allí con no menos de la reserva final. La reserva final nunca entra en ese cálculo, y una vez comprometido aplican las reglas del combustible mínimo.",
        "referencia": "Doc 9976, 6.4.27 y 6.4.28"
      }
    ]
  },
  {
    "tema": "C20",
    "n": 20,
    "titulo": "Punto de decisión",
    "preguntas": [
      {
        "id": "c20-q1",
        "enunciado": "En el RAC 121 no aparece la expresión «punto de decisión». ¿Con qué figura se regula ese concepto en la norma colombiana?",
        "opciones": [
          "Con el punto de no retorno (PNR), que el OFP calcula en cada vuelo de larga distancia.",
          "Con el punto crítico o de igual tiempo (ETP), que el despachador fija en cada OFP.",
          "Con el punto de nueva planificación en vuelo, y el redespacho o enmienda del despacho.",
          "Con el punto de entrada EDTO, a partir del cual se revisan los alternos en ruta."
        ],
        "correcta": 2,
        "explicacion": "El Doc 9976 trata como sinónimos punto de decisión, punto de nueva planificación en vuelo, re-release point y re-dispatch point. El RAC 121 usa el punto de nueva planificación en vuelo y el redespacho, y el procedimiento lo pone el MO.",
        "referencia": "RAC 121, 121.2625 (b) y 121.2645 (c)(2), (c)(3) y (d); Apéndice 10, A9.3.9 d); Doc 9976, glosario («decision point», Nota)"
      },
      {
        "id": "c20-q2",
        "enunciado": "¿Qué es el punto de no retorno (PNR) y en qué vuelos exige la OACI determinarlo?",
        "opciones": [
          "El último punto desde el que aún puedes ir al destino y a un alterno en ruta; en vuelos a aeródromos aislados.",
          "El punto de igual tiempo entre un aeródromo por delante y otro por detrás; en vuelos EDTO sobre agua.",
          "El punto donde decides si sigues al destino final o vas a un destino intermedio; en vuelos planificados con redespacho.",
          "El punto donde el remanente iguala el alterno más la reserva final; en cada llegada a cualquier destino."
        ],
        "correcta": 0,
        "explicacion": "El PNR es el último punto geográfico desde el que el avión puede ir tanto al destino como a un alterno en ruta disponible, y la OACI exige determinarlo en cada vuelo a un aeródromo aislado. Como el RAC 121 no usa el concepto de aeródromo aislado, en la operación doméstica colombiana es sobre todo materia teórica.",
        "referencia": "Anexo 6, Parte I, Capítulo 1 (definición) y 4.3.4.3.1 b); RAC 91, 91.001; RAC 121, 121.001 (aeródromo aislado, Nota)"
      },
      {
        "id": "c20-q3",
        "enunciado": "¿Qué describe mejor el punto crítico o punto de igual tiempo (CP o ETP)?",
        "opciones": [
          "El último punto desde el que se puede volver al origen con la reserva final intacta.",
          "El punto de la ruta donde se verifica el combustible requerido para el redespacho.",
          "El punto de la ruta donde la contingencia planificada queda consumida por completo.",
          "Un punto de tiempo: seguir al aeródromo de adelante o volver al de atrás toma lo mismo."
        ],
        "correcta": 3,
        "explicacion": "El CP o ETP es el punto desde el cual se tarda lo mismo en seguir a un aeródromo por delante que en volver a otro por detrás, y sirve para planificar una falla de motor, una despresurización o una emergencia médica. No es un límite de combustible; el que depende de la autonomía es el PNR.",
        "referencia": "Módulo C20, «Punto crítico o punto de igual tiempo» (concepto de la formación ATPL; el Anexo 6 no lo define); Doc 9976, Tabla 6-1, Nota 2"
      }
    ]
  },
  {
    "tema": "C21",
    "n": 21,
    "titulo": "Factores que incrementan el consumo",
    "preguntas": [
      {
        "id": "c21-q1",
        "enunciado": "Según el Doc 9976, ¿cuál de estas situaciones produce un consumo mayor al planificado (over-burn)?",
        "opciones": [
          "Un peso sin combustible (ZFW) mayor que el planificado.",
          "Un viento de cola más fuerte que el pronosticado.",
          "Un directo que acorta la ruta presentada en el plan.",
          "Un nivel de crucero más cercano al óptimo que el planificado."
        ],
        "correcta": 0,
        "explicacion": "El Doc 9976 lista como causas de over-burn un ZFW mayor que el planificado, un rodaje más largo, rutas más largas, un nivel o una velocidad de crucero menos favorables y vientos peores que los pronosticados. Las otras tres opciones hacen lo contrario: reducen el consumo (under-burn).",
        "referencia": "Doc 9976, 6.4.3 a 6.4.5"
      },
      {
        "id": "c21-q2",
        "enunciado": "En la llegada, el ATC te deja nivelado 15 minutos a 6.000 ft antes de la aproximación. ¿Qué implica para el combustible de un reactor?",
        "opciones": [
          "Poco: a baja altura el aire es más denso y el reactor es más eficiente que en crucero.",
          "Nada que vigilar: el OFP ya incluye ese tramo nivelado dentro del combustible previsto para el trayecto.",
          "Es caro: cerca del suelo el reactor es mucho menos eficiente; pide descenso continuo si se puede.",
          "Un ahorro: al nivelar bajo antes de tiempo, el descenso se acorta y se gasta menos."
        ],
        "correcta": 2,
        "explicacion": "Los reactores son mucho menos eficientes cerca del suelo, así que un segmento largo a baja altura cuesta caro. Si se puede, se evita nivelar bajo y se pide descenso continuo; si no, se carga la restricción y se actualiza la predicción.",
        "referencia": "Módulo C21, «Operación a baja altitud»; Doc 9976, 6.4.5 d); Airbus, Getting to Grips with Fuel Economy (2004), 5.5.3"
      },
      {
        "id": "c21-q3",
        "enunciado": "Te despachan con un ítem de la MEL que aumenta el consumo. ¿Dónde debe quedar reflejado ese efecto?",
        "opciones": [
          "Solo en los fuel checks en vuelo, porque el OFP se calcula con el avión sin fallas.",
          "En ninguna parte: la contingencia existe precisamente para absorber ese consumo.",
          "Solo en el combustible discrecional, si el PIC considera necesario añadirlo por su cuenta.",
          "En el cálculo previo del combustible del OFP, que debe considerar ítems diferidos y la CDL."
        ],
        "correcta": 3,
        "explicacion": "La cantidad de combustible se basa, entre otras cosas, en el efecto de los reportes diferidos de mantenimiento y de cualquier desviación respecto de la configuración. La contingencia es para lo imprevisto; una penalización conocida de la MEL es previsible y va en el cálculo.",
        "referencia": "RAC 121, 121.2645 (b)(2)(v)"
      }
    ]
  },
  {
    "tema": "C22",
    "n": 22,
    "titulo": "Go-around y combustible",
    "preguntas": [
      {
        "id": "c22-q1",
        "enunciado": "¿Qué parte del combustible planificado cubre una aproximación frustrada en el destino?",
        "opciones": [
          "El combustible para el trayecto, que ya incluye un sobrepaso y un segundo intento en destino.",
          "La reserva final, que existe precisamente para cubrir una aproximación adicional en destino.",
          "La contingencia, que se calcula para cubrir dos aproximaciones completas en el destino.",
          "El del alterno: incluye una frustrada en destino; un segundo intento no está planificado."
        ],
        "correcta": 3,
        "explicacion": "El combustible para el alterno incluye la aproximación frustrada en destino, el ascenso, la ruta, el descenso y la aproximación y el aterrizaje en el alterno. El plan prevé un sobrepaso seguido de desvío; un segundo intento sale del margen (contingencia y discrecional) o, si ya no hay, del combustible del alterno.",
        "referencia": "RAC 121, 121.2645 (c)(4)(i)(A)"
      },
      {
        "id": "c22-q2",
        "enunciado": "Eres PM y preparas el briefing de aproximación a un destino con techo cerca de los mínimos. Sobre el combustible, ¿qué debe quedar dicho antes de iniciarla?",
        "opciones": [
          "Con cuánto quedan tras un sobrepaso, si alcanza para otro intento o solo para el alterno, y qué harán.",
          "Solo el combustible previsto al aterrizar; lo del sobrepaso se decide después, si ocurre.",
          "Solo la reserva final prevista, porque el combustible para el alterno ya lo garantiza el OFP.",
          "La hora prevista de la frustrada y el nivel de espera que pedirán al ATC tras el sobrepaso."
        ],
        "correcta": 0,
        "explicacion": "Antes de aproximar, la tripulación debe saber con cuánto combustible quedará si hace un sobrepaso, si eso alcanza para otro intento o solo para el alterno, y cuál es la decisión. El Doc 9976 añade que a veces la mejor decisión de desvío se toma antes de quemar el combustible de aproximación.",
        "referencia": "Módulo C22, «Anticipar antes de empezar la aproximación»; Doc 9976, 6.4.26"
      },
      {
        "id": "c22-q3",
        "enunciado": "Según la NTSB (AAR-91/04), ¿qué le pasó al Boeing 707 del vuelo Avianca 052 después de su aproximación frustrada en Nueva York?",
        "opciones": [
          "Se desvió a su alterno después de la frustrada y aterrizó allí con menos de la reserva final.",
          "Los motores se apagaron por falta de combustible mientras maniobraba para un segundo intento.",
          "Los motores se apagaron durante la espera, antes de que empezara la primera aproximación.",
          "Hizo un segundo intento con éxito y aterrizó en Nueva York con los tanques casi vacíos."
        ],
        "correcta": 1,
        "explicacion": "Tras más de una hora de esperas, la tripulación hizo una aproximación frustrada y los motores se apagaron por falta de combustible mientras maniobraba para el segundo intento. Los motores apagados en la espera corresponden al caso LaMia 2933.",
        "referencia": "NTSB, AAR-91/04, resumen ejecutivo y 3.2 (causa probable)"
      }
    ]
  }
]

/**
 * Las claves de práctica del módulo: las sesenta y seis preguntas de capítulo
 * y los diez escenarios del capítulo 23 (combustibleLeccion.ts). Son las que
 * guarda el progreso y valida el catálogo.
 */
export const CB_PRACTICA_CLAVES: string[] = [
  "c01-q1",
  "c01-q2",
  "c01-q3",
  "c02-q1",
  "c02-q2",
  "c02-q3",
  "c03-q1",
  "c03-q2",
  "c03-q3",
  "c04-q1",
  "c04-q2",
  "c04-q3",
  "c05-q1",
  "c05-q2",
  "c05-q3",
  "c06-q1",
  "c06-q2",
  "c06-q3",
  "c07-q1",
  "c07-q2",
  "c07-q3",
  "c08-q1",
  "c08-q2",
  "c08-q3",
  "c09-q1",
  "c09-q2",
  "c09-q3",
  "c10-q1",
  "c10-q2",
  "c10-q3",
  "c11-q1",
  "c11-q2",
  "c11-q3",
  "c12-q1",
  "c12-q2",
  "c12-q3",
  "c13-q1",
  "c13-q2",
  "c13-q3",
  "c14-q1",
  "c14-q2",
  "c14-q3",
  "c15-q1",
  "c15-q2",
  "c15-q3",
  "c16-q1",
  "c16-q2",
  "c16-q3",
  "c17-q1",
  "c17-q2",
  "c17-q3",
  "c18-q1",
  "c18-q2",
  "c18-q3",
  "c19-q1",
  "c19-q2",
  "c19-q3",
  "c20-q1",
  "c20-q2",
  "c20-q3",
  "c21-q1",
  "c21-q2",
  "c21-q3",
  "c22-q1",
  "c22-q2",
  "c22-q3",
  "esc-01",
  "esc-02",
  "esc-03",
  "esc-04",
  "esc-05",
  "esc-06",
  "esc-07",
  "esc-08",
  "esc-09",
  "esc-10"
]
