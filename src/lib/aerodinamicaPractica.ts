// GENERADO por scripts/aerodinamica/convertir.mjs desde
// docs/contenido/aerodinamica.md. No se edita a mano: se edita el documento y
// se vuelve a correr el script.

/**
 * La práctica de Aerodinámica: trece escenarios de aplicación y cuarenta y
 * nueve preguntas de entrevista en tres niveles.
 *
 * Un escenario se marca hecho al desplegar su análisis; una pregunta, al ver
 * la respuesta. Las claves son las que valida modulos_contenido.
 */

export interface EscenarioAero {
  id: string
  titulo: string
  situacion: string
  preguntas: string[]
  /** Una respuesta por pregunta, en el mismo orden. */
  analisis: string[]
  /** Las secciones que pone a prueba: "S06", "S04". */
  temas: string[]
}

export type NivelEntrevista = "basico" | "intermedio" | "avanzado"

export interface PreguntaEntrevistaAero {
  id: string
  nivel: NivelEntrevista
  titulo: string
  pregunta: string
  /** Solo las de opción múltiple; las abiertas se despliegan sin elegir. */
  opciones?: string[]
  /** Índice de la correcta dentro de `opciones`, desde 0. */
  correcta?: number
  respuesta: string
  explicacion: string
  punto: string
  /** Las secciones que repasa. Casi todas citan una; ent-49 cita dos. */
  temas: string[]
}

export const AERO_ESCENARIOS: EscenarioAero[] = [
  {
    "id": "esc-01",
    "titulo": "Viraje de 60° de alabeo",
    "situacion": "Un avión realiza un viraje nivelado coordinado de 60° de alabeo. Su velocidad de pérdida en vuelo recto, para ese peso y configuración, es de 120 kt.",
    "preguntas": [
      "¿Qué ocurre con el factor de carga?",
      "¿Qué ocurre con la velocidad de pérdida?",
      "¿Qué debe hacer el piloto para mantener la altitud?"
    ],
    "analisis": [
      "n = 1/cos 60° = **2 G**.",
      "La velocidad de pérdida aumenta con √2 ≈ 1,41: pasa de 120 kt a **≈ 170 kt**.",
      "Aumentar el ángulo de ataque para duplicar la sustentación y aumentar el empuje, porque la resistencia inducida crece. Si la velocidad está cerca de 170 kt, el viraje terminará en pérdida acelerada."
    ],
    "temas": [
      "S06",
      "S04"
    ]
  },
  {
    "id": "esc-02",
    "titulo": "Crucero cerca de MMO a gran altitud",
    "situacion": "En crucero a FL390 el avión vuela cerca de su MMO. Entra en una zona de cizalladura con aumento brusco del viento de frente y ligera turbulencia, y el Mach empieza a subir.",
    "preguntas": [
      "¿Qué fenómeno aerodinámico comienza a ser relevante?",
      "¿Qué tendencia de cabeceo puede aparecer?",
      "¿Qué margen hay hacia la baja velocidad?"
    ],
    "analisis": [
      "Flujo local supersónico sobre el extradós, **ondas de choque**, aumento de **resistencia de onda** y **Mach Buffet** por separación detrás de la onda.",
      "**Mach Tuck:** la onda de choque y el centro de presión se desplazan hacia atrás y aparece nariz abajo; el Mach Trim lo compensa.",
      "A esa altitud el margen hacia el low-speed buffet puede ser pequeño (Coffin Corner). Reducir velocidad de forma brusca o maniobrar con mucho alabeo puede llevar al buffet del otro extremo. La corrección de velocidad debe ser gradual y según el procedimiento del tipo."
    ],
    "temas": [
      "S10",
      "S11"
    ]
  },
  {
    "id": "esc-03",
    "titulo": "Más pitch sin energía",
    "situacion": "En el ascenso inicial, con empuje reducido por atenuación de ruido, el piloto sube la nariz para cumplir una restricción de altitud. La velocidad baja de forma continua.",
    "preguntas": [
      "¿Qué ocurre con el ángulo de ataque?",
      "¿Por qué el avión no sube como espera el piloto?",
      "¿Qué corrige la situación?"
    ],
    "analisis": [
      "Aumenta. Con menos velocidad, el ala necesita más ángulo de ataque para sostener el peso; y el pitch adicional, sin energía, aumenta el ángulo de ataque todavía más.",
      "El ascenso lo sostiene el exceso de empuje. Si no hay empuje sobrante, subir la nariz solo cambia velocidad por altura por un momento, y después la velocidad sigue cayendo hacia el ángulo de ataque crítico.",
      "Empuje y una actitud compatible con la energía disponible. Si aparece aviso de pérdida, reducir ángulo de ataque primero."
    ],
    "temas": [
      "S02",
      "S04",
      "S05"
    ]
  },
  {
    "id": "esc-04",
    "titulo": "El avión flota en el aterrizaje",
    "situacion": "En una aproximación con viento en calma, el avión cruza el umbral 10 kt por encima de la velocidad de referencia. En el flare parece \"flotar\" y consume mucha pista antes del toque.",
    "preguntas": [
      "¿Qué fenómeno aerodinámico está influyendo?",
      "¿Por qué el exceso de velocidad lo empeora?"
    ],
    "analisis": [
      "**Efecto suelo:** cerca de la pista se reducen el downwash y los vórtices de punta; baja la resistencia inducida y el ala necesita menos ángulo de ataque para el mismo CL.",
      "Con menos resistencia, la energía sobrante tarda más en disiparse. Cada nudo de más se convierte en distancia de flotación. La prevención es una aproximación estabilizada a la velocidad correcta."
    ],
    "temas": [
      "S09",
      "S05"
    ]
  },
  {
    "id": "esc-05",
    "titulo": "Despegue alto, caliente y pesado",
    "situacion": "Despegue en un aeródromo a 8.000 ft de elevación, con 25 °C y el avión cerca de su peso máximo.",
    "preguntas": [
      "¿Cómo está la temperatura respecto a la ISA a esa elevación?",
      "¿Qué pasa con la IAS de rotación, la TAS y la GS?",
      "¿Qué efectos hay en distancia y ascenso?"
    ],
    "analisis": [
      "La ISA a 8.000 ft es cerca de –1 °C (15 °C – 2 °C × 8). Con 25 °C, el aire está unos 26 °C por encima de la estándar: la altitud de densidad es bastante mayor que 8.000 ft.",
      "La IAS de rotación, para el peso y la configuración, es prácticamente la misma (las tablas del tipo pueden aplicar pequeños ajustes); la TAS y la GS al rotar son mayores.",
      "Más carrera de despegue, menor gradiente y régimen de ascenso, menos empuje disponible y mayor energía en un eventual despegue abortado. Los datos de performance del día definen si el peso es aceptable."
    ],
    "temas": [
      "S12"
    ]
  },
  {
    "id": "esc-06",
    "titulo": "Stick shaker en viraje durante la aproximación",
    "situacion": "Avión pesado, aproximación con flaps intermedios. Por un cambio de pista, el piloto inicia un viraje de 30° de alabeo sin advertir que la velocidad ha caído por debajo de la velocidad mínima de maniobra de esa configuración. Se activa el Stick Shaker.",
    "preguntas": [
      "¿Por qué se activa si la velocidad estaba \"en rango\"?",
      "¿Cuál es la corrección?"
    ],
    "analisis": [
      "Las velocidades de referencia ya consideran el peso y dejan margen para maniobrar. Ese margen se consumió por dos vías: la velocidad por debajo del mínimo y el viraje, que aumentó el factor de carga (≈ 1,15 G) y la velocidad de pérdida (≈ 7,5 %). El ala se acercó a su ángulo de ataque crítico: es una **pérdida acelerada inminente**.",
      "Reducir el ángulo de ataque (aliviar presión atrás), reducir el alabeo, aplicar empuje según necesidad y seguir el procedimiento de recuperación del tipo."
    ],
    "temas": [
      "S04",
      "S06"
    ]
  },
  {
    "id": "esc-07",
    "titulo": "Turbulencia severa en crucero",
    "situacion": "En crucero a gran altitud el avión entra en turbulencia severa. El primer oficial propone reducir a Va \"para proteger la estructura\" y mantener la altitud con correcciones firmes.",
    "preguntas": [
      "¿Qué velocidad es la referencia?",
      "¿Qué error hay en la idea de mantener la altitud con correcciones firmes?",
      "¿Qué riesgo aerodinámico adicional hay a gran altitud?"
    ],
    "analisis": [
      "En aviones de transporte, la **velocidad o el Mach de penetración de turbulencia (VRA/MRA)** y el procedimiento del AFM/QRH, no Va. A gran altitud la referencia es normalmente MRA, que puede elegirse para dar el mejor margen entre buffet de baja y alta velocidad (14 CFR 25.1517(c)).",
      "Va no protege contra entradas alternadas ni simultáneas en varios ejes (14 CFR 25.1583(a)(3)). Perseguir la altitud con mandos grandes aumenta las cargas. Lo recomendable es mantener la actitud y aceptar variaciones de altitud según el procedimiento.",
      "A gran altitud el margen entre low-speed buffet y Mach buffet puede ser pequeño; las ráfagas cambian el ángulo de ataque y el factor de carga. Reducir demasiado la velocidad acerca el buffet de baja velocidad."
    ],
    "temas": [
      "S06",
      "S11"
    ]
  },
  {
    "id": "esc-08",
    "titulo": "CG en límite delantero y en límite trasero",
    "situacion": "Dos vuelos con el mismo peso. En el vuelo A el CG está en el límite delantero; en el vuelo B, en el límite trasero.",
    "preguntas": [
      "¿En cuál es mayor la fuerza para rotar?",
      "¿En cuál es mayor el consumo?",
      "¿En cuál hay más riesgo de golpe de cola?"
    ],
    "analisis": [
      "**Vuelo A.** El CG adelantado requiere más momento de nariz arriba de la cola.",
      "**Vuelo A.** Más carga hacia abajo en la cola implica más sustentación en el ala, más ángulo de ataque y más resistencia.",
      "**Vuelo B.** Con CG atrasado la rotación es ligera y es más fácil sobrerrotar. Además la estabilidad longitudinal es menor."
    ],
    "temas": [
      "S08"
    ]
  },
  {
    "id": "esc-09",
    "titulo": "Aviso de pérdida a FL370",
    "situacion": "Con piloto automático en modo de altitud y empuje limitado, el avión pierde velocidad lentamente en crucero a FL370. Suena el aviso de pérdida y hay buffet.",
    "preguntas": [
      "¿Por qué el ala entra en pérdida a una IAS mayor que a baja altitud?",
      "¿Qué acción es prioritaria y qué se debe aceptar?",
      "¿Por qué el empuje máximo no resuelve la situación por sí solo?"
    ],
    "analisis": [
      "A Mach alto disminuyen el ángulo de ataque de pérdida y el CLmax.",
      "**Reducir el ángulo de ataque** (AC 120-109A): desconectar automatismos, nariz abajo hasta eliminar las indicaciones, alas niveladas, empuje según necesidad, retraer speed brakes y volver a la trayectoria. Se debe aceptar la pérdida de altitud; a gran altitud puede ser de varios miles de pies.",
      "A gran altitud el empuje sobrante es pequeño y la aceleración es lenta; con motores bajo el ala, el empuje a baja velocidad genera nariz arriba. Sin reducir el ángulo de ataque no hay recuperación."
    ],
    "temas": [
      "S04",
      "S11"
    ]
  },
  {
    "id": "esc-10",
    "titulo": "Velocidad que cae en la aproximación final",
    "situacion": "En final, la velocidad está 8 kt por debajo de la referencia y sigue bajando. El piloto sube la nariz para no quedar bajo la senda, sin mover el empuje.",
    "preguntas": [
      "¿En qué zona de la curva de resistencia está el avión?",
      "¿Qué pasa con la velocidad y el ángulo de ataque?"
    ],
    "analisis": [
      "Por debajo de la velocidad de mínima resistencia: **régimen de mando invertido (Back Side of the Drag Curve)**.",
      "Al subir la nariz aumenta el ángulo de ataque y la resistencia inducida; la velocidad sigue cayendo y el avión se acerca a la pérdida. Hay que añadir empuje. Si la aproximación no es estable, se ejecuta motor y al aire."
    ],
    "temas": [
      "S05",
      "S04"
    ]
  },
  {
    "id": "esc-11",
    "titulo": "Ascenso por la altitud de cruce",
    "situacion": "El avión asciende a 290 KIAS y luego cambia a Mach 0,78 para continuar al nivel de crucero.",
    "preguntas": [
      "¿Por qué el Mach aumenta durante el ascenso a IAS constante?",
      "¿Qué pasa con la IAS al subir a Mach constante?",
      "¿Qué limitación cambia en esa transición?"
    ],
    "analisis": [
      "A IAS constante la TAS aumenta con la altitud y la velocidad del sonido baja con la temperatura: el Mach sube.",
      "La IAS disminuye progresivamente.",
      "Es la altitud de cruce de ese perfil (cerca de FL310 para 290 KIAS / Mach 0,78 en atmósfera estándar): por encima, mantener la IAS haría subir el Mach por encima del objetivo y, más arriba, por encima de MMO; por eso se pasa a volar Mach. No la confundas con la altitud de cruce VMO/MMO del tipo, donde el límite máximo pasa de VMO a MMO: es otra altitud, porque se calcula con otros valores."
    ],
    "temas": [
      "S10",
      "S12"
    ]
  },
  {
    "id": "esc-12",
    "titulo": "Escarcha en el ala antes del despegue",
    "situacion": "Amanece con temperatura bajo cero. Hay una capa fina de escarcha en el extradós. Alguien comenta que \"es muy delgada, no pesa nada\".",
    "preguntas": [
      "¿El problema es el peso?",
      "¿Qué ocurre con el ángulo de ataque de pérdida y el aviso de pérdida?"
    ],
    "analisis": [
      "No. El problema es aerodinámico: la rugosidad altera la capa límite y adelanta la separación.",
      "El ala entra en pérdida a **menor ángulo de ataque** y con menor CLmax; la velocidad de pérdida aumenta. El aviso de pérdida, calibrado para ala limpia, puede no anticipar la pérdida. Por eso el ala debe estar limpia (concepto de ala limpia) antes del despegue."
    ],
    "temas": [
      "S04",
      "S01"
    ]
  },
  {
    "id": "esc-13",
    "titulo": "Oscilación de alabeo y guiñada con Yaw Damper inoperativo",
    "situacion": "En crucero, con el Yaw Damper inoperativo, el avión presenta una oscilación en la que la nariz se mueve de lado a lado mientras las alas alabean de forma alternada.",
    "preguntas": [
      "¿Qué fenómeno es?",
      "¿Por qué es típico de un ala en flecha?",
      "¿Qué debe hacer la tripulación?"
    ],
    "analisis": [
      "**Dutch Roll.**",
      "La flecha aumenta el efecto diedro; cuando domina sobre la estabilidad direccional, alabeo y guiñada se acoplan.",
      "Aplicar el procedimiento del fabricante y las limitaciones de la MEL/AFM para Yaw Damper inoperativo. Evitar improvisar entradas de mando grandes."
    ],
    "temas": [
      "S09",
      "S10"
    ]
  }
]

export const AERO_ENTREVISTA: PreguntaEntrevistaAero[] = [
  {
    "id": "ent-01",
    "nivel": "basico",
    "titulo": "Ángulo de ataque",
    "pregunta": "¿Qué es el ángulo de ataque?",
    "respuesta": "Es el ángulo entre la cuerda del ala y el viento relativo.",
    "explicacion": "El viento relativo es opuesto a la trayectoria, por eso el ángulo de ataque depende de hacia dónde se mueve el avión, no solo de hacia dónde apunta la nariz. Es el parámetro que determina el CL y la pérdida.",
    "punto": "Cuerda contra viento relativo; no contra el horizonte.",
    "temas": [
      "S04"
    ]
  },
  {
    "id": "ent-02",
    "nivel": "basico",
    "titulo": "Cuatro fuerzas",
    "pregunta": "¿Cuáles son las cuatro fuerzas del vuelo y cómo actúan?",
    "respuesta": "Sustentación, perpendicular al viento relativo; peso, hacia el centro de la Tierra desde el CG; empuje, hacia adelante; resistencia, paralela y opuesta al viento relativo.",
    "explicacion": "En vuelo estabilizado están en equilibrio. Los cambios de velocidad o trayectoria aparecen cuando una fuerza supera a su opuesta.",
    "punto": "Sustentación y resistencia se definen respecto al viento relativo, no respecto al horizonte.",
    "temas": [
      "S02"
    ]
  },
  {
    "id": "ent-03",
    "nivel": "basico",
    "titulo": "Sustentación",
    "pregunta": "¿Qué es la sustentación y de qué depende?",
    "respuesta": "Es la componente de la fuerza aerodinámica perpendicular al viento relativo. Depende de la densidad, del cuadrado de la velocidad, de la superficie alar y del coeficiente de sustentación: L = ½ ρ V² S CL.",
    "explicacion": "El ala desvía el flujo hacia abajo y crea una diferencia de presión entre extradós e intradós. El piloto la controla con la velocidad y el ángulo de ataque (y con flaps y slats).",
    "punto": "Newton y Bernoulli describen el mismo fenómeno; no son teorías rivales.",
    "temas": [
      "S03"
    ]
  },
  {
    "id": "ent-04",
    "nivel": "basico",
    "titulo": "Pitch vs ángulo de ataque",
    "pregunta": "¿Cuál es la diferencia entre pitch y ángulo de ataque?",
    "opciones": [
      "Son el mismo ángulo: uno lo muestra el horizonte artificial y el otro, el indicador de AOA",
      "El pitch se mide respecto al horizonte; el ángulo de ataque, respecto al viento relativo",
      "El pitch se mide respecto al viento relativo; el ángulo de ataque, respecto al horizonte",
      "El ángulo de ataque siempre es mayor que el pitch, porque se le suma el ángulo de trayectoria"
    ],
    "correcta": 1,
    "respuesta": "El pitch se mide respecto al horizonte; el ángulo de ataque, respecto al viento relativo",
    "explicacion": "Con alas niveladas, pitch ≈ ángulo de ataque + ángulo de trayectoria. En descenso con nariz arriba, el ángulo de ataque puede ser mucho mayor que el pitch.",
    "punto": "Una nariz arriba no garantiza ni ascenso ni ala fuera de pérdida.",
    "temas": [
      "S04"
    ]
  },
  {
    "id": "ent-05",
    "nivel": "basico",
    "titulo": "Stall",
    "pregunta": "¿Qué es una pérdida aerodinámica (Stall)?",
    "opciones": [
      "La situación en que el ala supera su ángulo de ataque crítico, el flujo se separa y el CL cae",
      "La pérdida total de sustentación del ala cuando la velocidad cae por debajo de la de pérdida",
      "El momento en que la velocidad cae por debajo de la velocidad mínima publicada en el manual del avión",
      "La pérdida de empuje de los motores cuando se interrumpe el flujo de aire que entra al compresor"
    ],
    "correcta": 0,
    "respuesta": "La situación en que el ala supera su ángulo de ataque crítico, el flujo se separa y el CL cae",
    "explicacion": "Al superar el ángulo crítico, el flujo se separa del extradós, cae el CL y aumenta la resistencia. El ala no deja de producir sustentación por completo.",
    "punto": "La pérdida es un problema de ángulo de ataque.",
    "temas": [
      "S04"
    ]
  },
  {
    "id": "ent-06",
    "nivel": "basico",
    "titulo": "Ángulo de ataque crítico",
    "pregunta": "¿Qué es el ángulo de ataque crítico (Critical Angle of Attack)?",
    "respuesta": "Es el ángulo de ataque al que el ala alcanza su CLmax. Por encima de él, el ala entra en pérdida.",
    "explicacion": "Para una configuración dada, un ala limpia y a bajo Mach no depende de velocidad, peso ni altitud de densidad. Lo modifican los flaps, los slats, la contaminación y el Mach.",
    "punto": "Fijo para una configuración y condición; no es universal.",
    "temas": [
      "S04"
    ]
  },
  {
    "id": "ent-07",
    "nivel": "basico",
    "titulo": "Velocidad de pérdida",
    "pregunta": "¿La velocidad de pérdida es un valor fijo? ¿De qué depende?",
    "respuesta": "No. Es la velocidad a la que, en unas condiciones concretas, el ala alcanza su ángulo de ataque crítico. Aumenta con el peso, el factor de carga, el CG adelantado, la contaminación del ala y el Mach alto; disminuye con flaps y slats.",
    "explicacion": "Varía con la raíz cuadrada del peso y del factor de carga. Las velocidades publicadas corresponden a 1 G, un peso y una configuración determinados.",
    "punto": "Lo fijo, para una configuración, es el ángulo de ataque crítico; no la velocidad.",
    "temas": [
      "S04"
    ]
  },
  {
    "id": "ent-08",
    "nivel": "basico",
    "titulo": "Resistencia parásita",
    "pregunta": "¿Qué es la resistencia parásita (Parasite Drag)?",
    "respuesta": "La resistencia que no está relacionada con producir sustentación: de forma, de fricción superficial y de interferencia. Aumenta con el cuadrado de la velocidad.",
    "explicacion": "Domina a alta velocidad. Tren abajo o superficies extendidas la aumentan.",
    "punto": "Más velocidad, mucha más resistencia parásita.",
    "temas": [
      "S05"
    ]
  },
  {
    "id": "ent-09",
    "nivel": "basico",
    "titulo": "Resistencia inducida",
    "pregunta": "¿Qué es la resistencia inducida (Induced Drag)?",
    "respuesta": "La resistencia que resulta de producir sustentación. La diferencia de presión genera vórtices de punta y el flujo desviado inclina la fuerza aerodinámica hacia atrás. En vuelo nivelado disminuye con el cuadrado de la velocidad.",
    "explicacion": "Es máxima con el ala pesada y lenta (alto CL y alto ángulo de ataque). La reducen el alargamiento, los winglets y el efecto suelo.",
    "punto": "Domina a baja velocidad y alto ángulo de ataque.",
    "temas": [
      "S05"
    ]
  },
  {
    "id": "ent-10",
    "nivel": "basico",
    "titulo": "Factor de carga",
    "pregunta": "¿Qué es el factor de carga?",
    "respuesta": "La relación entre la sustentación y el peso (n = L/W), expresada en G.",
    "explicacion": "En vuelo recto y nivelado es 1 G. En un viraje nivelado es 1/cos del alabeo: 30° ≈ 1,15 G, 45° ≈ 1,41 G, 60° = 2 G.",
    "punto": "Más factor de carga, más carga estructural y mayor velocidad de pérdida.",
    "temas": [
      "S06"
    ]
  },
  {
    "id": "ent-11",
    "nivel": "basico",
    "titulo": "Flaps",
    "pregunta": "¿Qué hacen los flaps?",
    "opciones": [
      "Aumentan el ángulo de ataque crítico y el CLmax sin cambiar la resistencia, igual que los slats",
      "Reducen la resistencia para despegar más rápido y acortar la carrera, por eso se usan en el despegue",
      "Aumentan el CLmax y reducen la resistencia, por eso en el despegue siempre conviene extender la mayor posición de flaps",
      "Aumentan la curvatura (y en algunos tipos la superficie), el CLmax y la resistencia, y reducen la velocidad de pérdida"
    ],
    "correcta": 3,
    "respuesta": "Aumentan la curvatura (y en algunos tipos la superficie), el CLmax y la resistencia, y reducen la velocidad de pérdida",
    "explicacion": "Permiten volar más lento con una actitud de nariz más baja y un ángulo de descenso mayor. Los flaps de borde de salida reducen el ángulo de ataque crítico aunque suben el CLmax.",
    "punto": "Flaps = más CLmax y más resistencia.",
    "temas": [
      "S07"
    ]
  },
  {
    "id": "ent-12",
    "nivel": "basico",
    "titulo": "Slats",
    "pregunta": "¿Qué hacen los slats?",
    "respuesta": "Retrasan la separación del flujo en el borde de ataque y permiten alcanzar un ángulo de ataque mayor antes de la pérdida: aumentan el ángulo crítico y el CLmax.",
    "explicacion": "Abren una ranura que energiza la capa límite del extradós. Se usan con los flaps en despegue y aterrizaje.",
    "punto": "Slats suben el ángulo de ataque crítico; los flaps de borde de salida no.",
    "temas": [
      "S07"
    ]
  },
  {
    "id": "ent-13",
    "nivel": "basico",
    "titulo": "Spoilers",
    "pregunta": "¿Qué son los spoilers y para qué se usan en un avión de transporte?",
    "respuesta": "Paneles en el extradós que destruyen sustentación y aumentan resistencia. En vuelo, asimétricos ayudan al alabeo y simétricos actúan como speed brakes. En tierra, eliminan sustentación y cargan las ruedas para frenar mejor.",
    "explicacion": "Como ayuda de alabeo no producen guiñada adversa. Se retraen en la recuperación de pérdida.",
    "punto": "Spoilers: menos sustentación, más resistencia, más peso en las ruedas tras el toque.",
    "temas": [
      "S07"
    ]
  },
  {
    "id": "ent-14",
    "nivel": "basico",
    "titulo": "Centro de gravedad",
    "pregunta": "¿Qué es el CG y por qué es importante?",
    "respuesta": "Es el punto donde se considera aplicado el peso total. Su posición respecto al punto neutro y al centro de presión define la estabilidad longitudinal, las fuerzas de mando, la velocidad de pérdida y el consumo.",
    "explicacion": "Adelantado: más estable y más consumo. Atrasado: menos estable y peor recuperación de pérdida. Fuera de límites puede faltar autoridad de elevador.",
    "punto": "El CG no es un dato administrativo: define cómo vuela el avión.",
    "temas": [
      "S08"
    ]
  },
  {
    "id": "ent-15",
    "nivel": "basico",
    "titulo": "Número de Mach",
    "pregunta": "¿Qué es el número de Mach?",
    "respuesta": "La relación entre la velocidad verdadera del avión y la velocidad del sonido local.",
    "explicacion": "La velocidad del sonido depende solo de la temperatura; como la temperatura baja con la altitud, a igual TAS el Mach aumenta al subir.",
    "punto": "Mach = TAS / velocidad del sonido local.",
    "temas": [
      "S10"
    ]
  },
  {
    "id": "ent-16",
    "nivel": "basico",
    "titulo": "IAS, TAS y GS",
    "pregunta": "¿Cuál es la diferencia entre IAS, TAS y GS?",
    "respuesta": "IAS es la velocidad indicada por el anemómetro (presión dinámica); TAS es la velocidad real respecto a la masa de aire; GS es la TAS corregida por viento, la velocidad sobre el terreno.",
    "explicacion": "La IAS gobierna el comportamiento aerodinámico; la TAS, la navegación y el Mach; la GS, el tiempo, el combustible y la distancia sobre la pista.",
    "punto": "El ala vuela con IAS; el avión recorre terreno con GS.",
    "temas": [
      "S12"
    ]
  },
  {
    "id": "ent-17",
    "nivel": "basico",
    "titulo": "Altitud de densidad",
    "pregunta": "¿Qué es la altitud de densidad y por qué importa?",
    "respuesta": "Es la altitud de presión corregida por temperatura no estándar: la altitud de la atmósfera estándar que tiene la densidad real del aire.",
    "explicacion": "Mayor altitud de densidad significa menos sustentación, empuje y potencia a una misma TAS: más distancia de despegue y aterrizaje y peor ascenso.",
    "punto": "El avión rinde según la altitud de densidad, no según la elevación.",
    "temas": [
      "S12"
    ]
  },
  {
    "id": "ent-18",
    "nivel": "intermedio",
    "titulo": "Fuerzas en ascenso",
    "pregunta": "En un ascenso estabilizado, la sustentación es:",
    "opciones": [
      "Igual al peso, como en vuelo recto y nivelado",
      "Mayor que el peso, que es lo que hace subir al avión",
      "Ligeramente menor que el peso",
      "Ligeramente mayor que el peso"
    ],
    "correcta": 2,
    "respuesta": "Ligeramente menor que el peso",
    "explicacion": "Una componente del peso actúa hacia atrás a lo largo de la trayectoria y la compensa el empuje. La sustentación solo equilibra la componente del peso perpendicular a la trayectoria.",
    "punto": "El avión sube por exceso de empuje, no por exceso de sustentación.",
    "temas": [
      "S02"
    ]
  },
  {
    "id": "ent-19",
    "nivel": "intermedio",
    "titulo": "Velocidad de pérdida en viraje",
    "pregunta": "¿Por qué aumenta la velocidad de pérdida en un viraje y cuánto?",
    "respuesta": "Porque la sustentación debe ser mayor que el peso para mantener la altitud; a la misma velocidad eso exige más ángulo de ataque, y el ángulo crítico se alcanza a mayor velocidad. La velocidad de pérdida aumenta con √n: ≈ 7,5 % a 30°, ≈ 19 % a 45° y ≈ 41 % a 60°.",
    "explicacion": "n = 1/cos del alabeo. El resultado no depende del tipo de avión.",
    "punto": "60° de alabeo = 2 G = +41 %.",
    "temas": [
      "S06"
    ]
  },
  {
    "id": "ent-20",
    "nivel": "intermedio",
    "titulo": "Pérdida acelerada",
    "pregunta": "¿Qué es una pérdida acelerada (Accelerated Stall)? Da un ejemplo.",
    "respuesta": "Una pérdida con factor de carga mayor a 1 G, que ocurre por encima de la velocidad de pérdida en vuelo recto. Ejemplo: un viraje escarpado en la aproximación con poca velocidad, o un tirón brusco al recuperar de un picado.",
    "explicacion": "El factor de carga exige más sustentación y más ángulo de ataque; el ala llega al ángulo crítico a una velocidad mayor. Suele ser más súbita.",
    "punto": "Se puede entrar en pérdida con la velocidad \"en verde\" si hay G.",
    "temas": [
      "S04"
    ]
  },
  {
    "id": "ent-21",
    "nivel": "intermedio",
    "titulo": "Velocidad de maniobra",
    "pregunta": "¿Cuál afirmación sobre la velocidad de maniobra (Va) es correcta?",
    "opciones": [
      "Por debajo de Va, un mando a fondo en un solo eje no debería exceder la carga límite; alternar o combinar ejes sí puede causar falla estructural",
      "Por debajo de Va el avión está protegido contra cualquier entrada de mando, en cualquier eje, en cualquier secuencia y con cualquier recorrido del mando",
      "Va es la velocidad de penetración de turbulencia en todo avión de transporte, y la que el AFM publica para volar en aire turbulento",
      "Va aumenta cuando el peso disminuye, porque el avión más liviano soporta más G antes de entrar en pérdida y de llegar a la carga límite de diseño"
    ],
    "correcta": 0,
    "respuesta": "Por debajo de Va, un mando a fondo en un solo eje no debería exceder la carga límite; alternar o combinar ejes sí puede causar falla estructural",
    "explicacion": "Es el contenido exigido por 14 CFR 25.1583(a)(3) en el manual de vuelo, reforzado tras el accidente de AA587. En turbulencia, en transporte, se usa VRA/MRA.",
    "punto": "Va: un mando, un eje, sin alternar.",
    "temas": [
      "S06"
    ]
  },
  {
    "id": "ent-22",
    "nivel": "intermedio",
    "titulo": "Va y peso",
    "pregunta": "¿Por qué Va disminuye cuando el avión pesa menos?",
    "respuesta": "Porque con menos peso la misma sustentación produce un factor de carga mayor (n = L/W) y la velocidad de pérdida es menor. La velocidad por debajo de la cual el ala entra en pérdida antes de alcanzar la carga límite baja.",
    "explicacion": "La regulación relaciona Va con la velocidad de pérdida y el factor de carga límite (Va no menor que Vs × √n, 14 CFR 25.335(c)).",
    "punto": "Avión liviano, Va más baja.",
    "temas": [
      "S06"
    ]
  },
  {
    "id": "ent-23",
    "nivel": "intermedio",
    "titulo": "Curva de resistencia y L/Dmax",
    "pregunta": "Explica la curva de resistencia total y qué representa L/Dmax.",
    "respuesta": "La resistencia total es la suma de la parásita, que crece con V², y la inducida, que decrece con V². La curva tiene forma de U. Su mínimo es la velocidad de mínima resistencia, que corresponde a L/Dmax: máxima eficiencia aerodinámica.",
    "explicacion": "En la teoría clásica, en ese punto la inducida iguala a la parásita. L/Dmax ocurre a un ángulo de ataque específico; la velocidad correspondiente aumenta con el peso.",
    "punto": "L/Dmax = mínima resistencia = mejor planeo.",
    "temas": [
      "S05"
    ]
  },
  {
    "id": "ent-24",
    "nivel": "intermedio",
    "titulo": "Planeo y peso",
    "pregunta": "Si un avión pesa más, ¿planea más o menos distancia?",
    "opciones": [
      "Menos distancia, porque el peso extra aumenta el régimen de descenso",
      "La misma distancia a L/Dmax, pero a mayor velocidad y mayor régimen de descenso",
      "Más distancia, porque el avión pesado lleva más energía al planear",
      "La misma distancia y a la misma velocidad que el avión liviano"
    ],
    "correcta": 1,
    "respuesta": "La misma distancia a L/Dmax, pero a mayor velocidad y mayor régimen de descenso",
    "explicacion": "La relación de planeo depende de L/D. El peso cambia la velocidad a la que se obtiene L/Dmax, no su valor.",
    "punto": "El peso no cambia la distancia de planeo; cambia la velocidad.",
    "temas": [
      "S05"
    ]
  },
  {
    "id": "ent-25",
    "nivel": "intermedio",
    "titulo": "Efecto suelo",
    "pregunta": "¿Qué es el efecto suelo y cómo afecta el despegue y el aterrizaje?",
    "respuesta": "Dentro de aproximadamente una envergadura del suelo se restringen el downwash y los vórtices de punta; se reduce la resistencia inducida y el ala necesita menos ángulo de ataque para el mismo CL. En el aterrizaje, con exceso de velocidad, el avión flota; en el despegue, puede despegar antes de la velocidad adecuada y no sostenerse al salir del efecto suelo.",
    "explicacion": "Según el PHAK, a un décimo de la envergadura la reducción de resistencia inducida es cercana a 48 %. Al salir del efecto suelo aumenta la resistencia inducida y se necesita más ángulo de ataque.",
    "punto": "Efecto suelo = menos resistencia inducida.",
    "temas": [
      "S09"
    ]
  },
  {
    "id": "ent-26",
    "nivel": "intermedio",
    "titulo": "Guiñada adversa",
    "pregunta": "¿Qué es la guiñada adversa (Adverse Yaw), por qué ocurre y cómo se corrige?",
    "respuesta": "Es la guiñada hacia el lado contrario al viraje al aplicar alerones. El ala que sube tiene más sustentación y más resistencia inducida. Se corrige con timón coordinado; el diseño la reduce con alerones diferenciales, tipo Frise o spoilers de alabeo.",
    "explicacion": "Es más notable a baja velocidad y con grandes deflexiones de alerón.",
    "punto": "El ala que sube frena más.",
    "temas": [
      "S09"
    ]
  },
  {
    "id": "ent-27",
    "nivel": "intermedio",
    "titulo": "Estabilidad estática y dinámica",
    "pregunta": "¿Cuál es la diferencia entre estabilidad estática y dinámica?",
    "respuesta": "La estática es la tendencia inicial después de una perturbación (volver, quedarse o alejarse). La dinámica es el comportamiento en el tiempo (oscilaciones que se amortiguan, se mantienen o crecen).",
    "explicacion": "Un avión puede ser estáticamente estable y dinámicamente inestable: vuelve hacia el equilibrio, pero lo sobrepasa con oscilaciones crecientes.",
    "punto": "Estática = tendencia inicial; dinámica = evolución en el tiempo.",
    "temas": [
      "S08"
    ]
  },
  {
    "id": "ent-28",
    "nivel": "intermedio",
    "titulo": "CG adelantado y atrasado",
    "pregunta": "Con el CG en el límite delantero, respecto al límite trasero:",
    "opciones": [
      "Menor velocidad de pérdida, menor consumo, mandos más livianos y menos estabilidad",
      "Menor estabilidad y mayor riesgo de golpe de cola en la rotación",
      "Mayor velocidad de pérdida y más consumo, pero mandos más livianos y menos estabilidad",
      "Mayor velocidad de pérdida, mayores fuerzas de mando, más estabilidad y más consumo"
    ],
    "correcta": 3,
    "respuesta": "Mayor velocidad de pérdida, mayores fuerzas de mando, más estabilidad y más consumo",
    "explicacion": "El CG adelantado exige más fuerza hacia abajo en la cola: más sustentación en el ala, más ángulo de ataque y más resistencia. El atrasado reduce la estabilidad y dificulta la recuperación de pérdidas.",
    "punto": "Adelantado: estable y costoso. Atrasado: eficiente y delicado.",
    "temas": [
      "S08"
    ]
  },
  {
    "id": "ent-29",
    "nivel": "intermedio",
    "titulo": "Estabilidad lateral",
    "pregunta": "¿Qué aporta la estabilidad lateral en un avión de transporte?",
    "respuesta": "El efecto diedro: ante un derrape, la tendencia a nivelar las alas. La producen el ángulo de diedro, la flecha y el ala alta (por la interacción ala–fuselaje en el derrape).",
    "explicacion": "En ala en flecha, el ala que avanza hacia el viento relativo presenta más velocidad perpendicular a su borde de ataque, genera más sustentación y el avión alabea en sentido contrario al derrape.",
    "punto": "Flecha = efecto diedro adicional.",
    "temas": [
      "S08"
    ]
  },
  {
    "id": "ent-30",
    "nivel": "intermedio",
    "titulo": "Dutch Roll vs inestabilidad espiral",
    "pregunta": "¿Qué diferencia hay entre Dutch Roll e inestabilidad espiral?",
    "respuesta": "El Dutch Roll es una oscilación acoplada de alabeo y guiñada que aparece cuando el efecto diedro domina sobre la estabilidad direccional. La inestabilidad espiral aparece cuando la estabilidad direccional es muy fuerte frente al efecto diedro: el alabeo aumenta lentamente y el avión entra en espiral.",
    "explicacion": "La FAA indica que la mayoría de los aviones se diseñan con leve inestabilidad espiral, porque es más fácil de manejar que el Dutch Roll. En jets con ala en flecha el Yaw Damper amortigua el Dutch Roll.",
    "punto": "Son las dos caras del mismo compromiso de diseño.",
    "temas": [
      "S09"
    ]
  },
  {
    "id": "ent-31",
    "nivel": "intermedio",
    "titulo": "High, hot, heavy",
    "pregunta": "¿Qué efecto tiene la combinación alta elevación + alta temperatura + alto peso en el despegue?",
    "opciones": [
      "No tiene efecto si se usa la misma IAS: el ala vuela igual, así que la distancia de despegue y el ascenso no cambian",
      "Reduce la IAS de rotación, porque el aire menos denso ofrece menos resistencia y el avión acelera antes en la carrera",
      "Aumenta la TAS y la GS de rotación, reduce el empuje y aumenta la distancia de despegue; empeora el ascenso",
      "Mejora el ascenso por la menor resistencia del aire poco denso, aunque la carrera de despegue sea algo más larga"
    ],
    "correcta": 2,
    "respuesta": "Aumenta la TAS y la GS de rotación, reduce el empuje y aumenta la distancia de despegue; empeora el ascenso",
    "explicacion": "Menos densidad exige más TAS para la misma presión dinámica; los motores producen menos empuje; el peso aumenta la velocidad de despegue. Según el PHAK, +10 % de peso ≈ +21 % o más de distancia de despegue.",
    "punto": "High, hot, heavy: más pista, menos ascenso.",
    "temas": [
      "S12"
    ]
  },
  {
    "id": "ent-32",
    "nivel": "intermedio",
    "titulo": "TAS e IAS en altura",
    "pregunta": "¿Por qué la TAS es mayor que la IAS a medida que se sube?",
    "respuesta": "Porque el anemómetro mide presión dinámica (½ ρ V²). Con menos densidad, se necesita más velocidad verdadera para producir la misma presión dinámica y la misma indicación.",
    "explicacion": "Como estimación, el PHAK indica sumar 2 % a la CAS por cada 1.000 ft. A gran altitud la diferencia es grande: a igual IAS la TAS y el Mach son mucho mayores.",
    "punto": "Menos densidad, más TAS para la misma IAS.",
    "temas": [
      "S12"
    ]
  },
  {
    "id": "ent-33",
    "nivel": "intermedio",
    "titulo": "Régimen de mando invertido",
    "pregunta": "¿Qué es volar en el \"Back Side of the Drag Curve\" y por qué es peligroso en la aproximación?",
    "respuesta": "Es volar por debajo de la velocidad de mínima resistencia, donde reducir la velocidad aumenta la resistencia y exige más empuje. Si la velocidad cae y solo se sube la nariz, la resistencia inducida crece y la velocidad sigue cayendo.",
    "explicacion": "La velocidad es inestable: sin corrección de empuje, la tendencia es a seguir perdiendo velocidad hacia la pérdida.",
    "punto": "En esa zona la velocidad se corrige con empuje.",
    "temas": [
      "S05"
    ]
  },
  {
    "id": "ent-34",
    "nivel": "avanzado",
    "titulo": "Mach crítico",
    "pregunta": "Defina Mach crítico y explique su relación con el crucero de un jet.",
    "respuesta": "Es el Mach de vuelo al que el flujo, en algún punto del avión, alcanza Mach 1 por primera vez. Por encima aparecen zonas supersónicas, ondas de choque y aumento de resistencia. Los jets suelen cruzar cerca o ligeramente por encima del Mach crítico, pero por debajo o cerca del Mach de divergencia, donde la resistencia sube bruscamente y que según el PHAK suele estar entre 5 % y 10 % por encima.",
    "explicacion": "El ala acelera el aire sobre el extradós, por eso la velocidad local supera a la del avión. El diseño del ala (flecha, perfil) busca subir el Mach crítico y el de divergencia.",
    "punto": "Mach crítico = primer Mach 1 local.",
    "temas": [
      "S10"
    ]
  },
  {
    "id": "ent-35",
    "nivel": "avanzado",
    "titulo": "Compresibilidad",
    "pregunta": "¿Qué es la compresibilidad y cuándo empieza a importar?",
    "respuesta": "Es el cambio apreciable de densidad del aire cuando se acelera o se frena alrededor del avión. A baja velocidad (del orden de Mach 0,3 o menos) es despreciable; en velocidades de crucero de jet es significativa y, por encima del Mach crítico, se manifiesta como ondas de choque, resistencia de onda, buffet, Mach Tuck y pérdida de efectividad de mandos.",
    "explicacion": "También afecta la medición de velocidad a gran altitud (diferencia entre CAS y EAS) y reduce el ángulo de ataque de pérdida a Mach alto.",
    "punto": "Compresibilidad: el aire deja de comportarse como incompresible.",
    "temas": [
      "S10"
    ]
  },
  {
    "id": "ent-36",
    "nivel": "avanzado",
    "titulo": "Ondas de choque",
    "pregunta": "¿Cómo se forman las ondas de choque en el ala de un avión subsónico y qué consecuencias tienen?",
    "respuesta": "Por encima del Mach crítico se forma una zona de flujo supersónico sobre el extradós; donde ese flujo vuelve a subsónico aparece una onda de choque normal. La presión y la densidad suben de golpe, el flujo pierde energía y la capa límite puede separarse. Consecuencias: resistencia de onda, Mach Buffet, desplazamiento del centro de presión hacia atrás (Mach Tuck) y menor efectividad de mandos.",
    "explicacion": "Al aumentar la velocidad, la onda se intensifica y se desplaza hacia el borde de salida.",
    "punto": "El problema no es solo la onda: es la separación que provoca.",
    "temas": [
      "S10"
    ]
  },
  {
    "id": "ent-37",
    "nivel": "avanzado",
    "titulo": "Low-speed buffet vs Mach buffet",
    "pregunta": "¿Cuál es la diferencia entre el buffet de baja velocidad y el Mach Buffet?",
    "opciones": [
      "No hay diferencia: los dos son la misma vibración por separación del flujo y solo cambia el nombre según la fase",
      "El de baja velocidad se debe a alto ángulo de ataque cerca de la pérdida; el Mach Buffet, a la separación detrás de ondas de choque a alta velocidad",
      "El de baja velocidad solo ocurre con flaps extendidos, en la aproximación; el Mach Buffet, solo en crucero, con el ala limpia y siempre por encima de MMO",
      "El Mach Buffet ocurre solo por debajo de FL100, donde la presión dinámica es mayor; el de baja velocidad, solo por encima de FL300, cerca del techo máximo"
    ],
    "correcta": 1,
    "respuesta": "El de baja velocidad se debe a alto ángulo de ataque cerca de la pérdida; el Mach Buffet, a la separación detrás de ondas de choque a alta velocidad",
    "explicacion": "A gran altitud ambos pueden tener relación con la compresibilidad: con alto ángulo de ataque, el flujo sobre el extradós se acelera y puede formar ondas de choque incluso a baja IAS (el PHAK lo llama buffet de Mach de baja velocidad).",
    "punto": "Uno por demasiado lento para el peso y la altitud; el otro por demasiado rápido.",
    "temas": [
      "S11"
    ]
  },
  {
    "id": "ent-38",
    "nivel": "avanzado",
    "titulo": "Alas en flecha",
    "pregunta": "¿Por qué los aviones de transporte usan alas en flecha y qué desventajas tienen?",
    "respuesta": "Porque solo la componente del flujo perpendicular al borde de ataque determina la distribución de presiones y las ondas de choque; al reducirla, la flecha sube el Mach crítico y el de divergencia y suaviza la subida de resistencia. Desventajas: tendencia a la pérdida en punta con cabeceo hacia arriba, menor efectividad para generar sustentación a baja velocidad (más velocidad de aproximación y necesidad de flaps y slats) y mayor tendencia al Dutch Roll.",
    "explicacion": "El compromiso favorece el crucero rápido y eficiente; las desventajas a baja velocidad se resuelven con hipersustentadores y Yaw Damper.",
    "punto": "Flecha: mejor a alta velocidad, más exigente a baja velocidad.",
    "temas": [
      "S10"
    ]
  },
  {
    "id": "ent-39",
    "nivel": "avanzado",
    "titulo": "Mach Tuck",
    "pregunta": "¿Qué es Mach Tuck y qué sistema lo compensa?",
    "respuesta": "Es la tendencia de nariz abajo al aumentar el Mach: la onda de choque y el centro de presión se desplazan hacia atrás. Lo compensa el Mach Trim; si está inoperativo, el fabricante impone un Mach máximo reducido.",
    "explicacion": "Si no se corrige, la nariz abajo aumenta la velocidad y agrava el efecto.",
    "punto": "Más Mach, centro de presión atrás, nariz abajo.",
    "temas": [
      "S10"
    ]
  },
  {
    "id": "ent-40",
    "nivel": "avanzado",
    "titulo": "Coffin Corner",
    "pregunta": "Explique qué es Coffin Corner y por qué el margen entre el buffet de baja velocidad y el buffet de alta velocidad disminuye a grandes altitudes.",
    "respuesta": "Coffin Corner (o Q-Corner, según la AC 61-107B de la FAA) es la región de gran altitud donde el límite de baja velocidad (low-speed buffet / pérdida) y el de alta velocidad (MMO / Mach buffet) convergen y el margen operacional es mínimo. El margen se reduce por tres razones: (1) a igual CAS, al subir aumenta la TAS y baja la velocidad del sonido, así que el límite de baja velocidad expresado en Mach sube; (2) a Mach alto el ángulo de ataque de pérdida y el CLmax disminuyen, lo que eleva todavía más la velocidad del buffet de baja velocidad; (3) el límite de alta velocidad es un Mach fijo o incluso menor, porque en aire menos denso el ala vuela con más ángulo de ataque y el flujo del extradós llega antes a formar ondas de choque. Más peso o más G estrechan aún más el margen; la temperatura alta reduce el empuje disponible y, con él, la altitud máxima y la capacidad de mantener la velocidad.",
    "explicacion": "Ejemplo del PHAK: una pérdida a 152 KCAS es Mach 0,23 a nivel del mar y Mach 0,50 a FL380. Operacionalmente implica menos capacidad de viraje, poca aceleración disponible y sensibilidad a la turbulencia.",
    "punto": "Coffin Corner representa una reducción del margen entre los límites aerodinámicos de baja y alta velocidad a gran altitud.",
    "temas": [
      "S11"
    ]
  },
  {
    "id": "ent-41",
    "nivel": "avanzado",
    "titulo": "Buffet de baja velocidad en altura",
    "pregunta": "¿Por qué la IAS del buffet de baja velocidad a FL390 es mayor que la velocidad de pérdida del mismo avión a FL100?",
    "respuesta": "Porque a Mach alto disminuyen el ángulo de ataque de pérdida y el CLmax. El ala necesita más presión dinámica (más IAS) para sostener el mismo peso sin llegar al buffet.",
    "explicacion": "A bajo Mach la velocidad de pérdida en IAS es prácticamente la misma con la altitud; a gran altitud deja de serlo por la compresibilidad (AUPRTA, Airbus).",
    "punto": "A Mach alto el ala entra en pérdida antes.",
    "temas": [
      "S11"
    ]
  },
  {
    "id": "ent-42",
    "nivel": "avanzado",
    "titulo": "Margen de maniobra de 1,3 G",
    "pregunta": "¿Qué significa volar con un margen de buffet de 1,3 G y qué implica en un viraje cerca del techo?",
    "respuesta": "Que el avión puede soportar un incremento de 0,3 G (maniobra o ráfaga) sin llegar al buffet. Es la referencia de la EASA (AMC 25.251(e)) y de los fabricantes para la altitud limitada por buffet. 1,3 G equivale a un viraje nivelado de unos 40°; más alabeo, o turbulencia sumada a un viraje, puede llevar al buffet.",
    "explicacion": "Más G sube el buffet de baja velocidad y baja el de alta. En el techo de buffet el margen está en el mínimo y la capacidad de alabeo es reducida.",
    "punto": "Cerca del techo, alabeo moderado y cuidado con la turbulencia.",
    "temas": [
      "S11"
    ]
  },
  {
    "id": "ent-43",
    "nivel": "avanzado",
    "titulo": "Altitud máxima",
    "pregunta": "¿Qué determina la altitud máxima de operación de un jet en un día dado?",
    "respuesta": "Es la menor de tres: la altitud máxima certificada, la altitud limitada por empuje (la que permite un régimen de ascenso mínimo) y la altitud limitada por buffet o maniobra (la que conserva el margen requerido antes del buffet).",
    "explicacion": "Depende del peso y la temperatura: con más temperatura la altitud máxima baja de forma significativa (AUPRTA). El FMS o el AFM la indican para las condiciones del día.",
    "punto": "Techo del día = el menor de certificado, empuje y buffet.",
    "temas": [
      "S11"
    ]
  },
  {
    "id": "ent-44",
    "nivel": "avanzado",
    "titulo": "Q-Corner y altitud de cruce",
    "pregunta": "¿Cuál afirmación es correcta?",
    "opciones": [
      "Q-Corner es otro nombre de Coffin Corner; la altitud donde una CAS y un Mach dados coinciden es la altitud de cruce (Crossover Altitude)",
      "Q-Corner es la altitud donde VMO y MMO son iguales, y no tiene relación con Coffin Corner",
      "Coffin Corner y altitud de cruce son lo mismo: la altitud donde una CAS y un Mach dados coinciden",
      "Q-Corner es el factor de carga máximo que admite la estructura en turbulencia a gran altitud"
    ],
    "correcta": 0,
    "respuesta": "Q-Corner es otro nombre de Coffin Corner; la altitud donde una CAS y un Mach dados coinciden es la altitud de cruce (Crossover Altitude)",
    "explicacion": "La AC 61-107B usa \"Q-Corner or Coffin Corner\". La altitud de cruce es otro concepto: marca el paso del límite VMO al MMO.",
    "punto": "Q-Corner = Coffin Corner. Crossover = cambio de IAS a Mach.",
    "temas": [
      "S11"
    ]
  },
  {
    "id": "ent-45",
    "nivel": "avanzado",
    "titulo": "Altitud de cruce en el ascenso",
    "pregunta": "Explica qué pasa con el Mach al ascender a IAS constante y con la IAS al ascender a Mach constante.",
    "respuesta": "A IAS constante, el Mach aumenta: la TAS sube con la altitud y la velocidad del sonido baja con la temperatura. A Mach constante, la IAS disminuye. Por eso se asciende primero con IAS y, al llegar a la altitud de cruce del perfil, con Mach; de lo contrario el Mach seguiría subiendo por encima del objetivo y, más arriba, de MMO.",
    "explicacion": "Ejemplo del PHAK: en los primeros jets, 306 KCAS y Mach 0,82 coincidían cerca de FL310; a FL380, Mach 0,82 equivale a unos 261 KCAS. Ascender demasiado a Mach constante acerca la IAS al límite de baja velocidad.",
    "punto": "Abajo manda VMO; arriba manda MMO.",
    "temas": [
      "S10"
    ]
  },
  {
    "id": "ent-46",
    "nivel": "avanzado",
    "titulo": "Recuperación de pérdida a gran altitud",
    "pregunta": "Describa la recuperación de una pérdida a gran altitud y explique por qué no se debe priorizar mantener la altitud.",
    "respuesta": "Según la plantilla de la AC 120-109A: desconectar piloto automático y autothrottle; aplicar nariz abajo hasta eliminar las indicaciones de pérdida (y compensar si es necesario); nivelar alas; empuje según necesidad; retraer speed brakes/spoilers; regresar a la trayectoria deseada. Reducir el ángulo de ataque es lo prioritario; intentar mantener altitud mantiene el ala en pérdida.",
    "explicacion": "A gran altitud el empuje sobrante es pequeño y la aceleración es lenta; la recuperación puede requerir varios miles de pies. Con motores bajo el ala, el empuje alto a baja velocidad genera nariz arriba.",
    "punto": "Primero ángulo de ataque; la altitud se recupera después.",
    "temas": [
      "S04"
    ]
  },
  {
    "id": "ent-47",
    "nivel": "avanzado",
    "titulo": "Nariz arriba y en pérdida",
    "pregunta": "¿Puede un avión estar en pérdida con la nariz arriba y descendiendo a gran velocidad vertical? ¿Qué indica eso sobre pitch y ángulo de ataque?",
    "respuesta": "Sí. Si el avión desciende con fuerte ángulo de trayectoria negativo, el viento relativo llega desde abajo y el ángulo de ataque es aproximadamente el pitch más ese ángulo de descenso. Con 15° de nariz arriba y 25° de trayectoria descendente, el ángulo de ataque es del orden de 40°.",
    "explicacion": "En el AF447 (BEA) el avión llegó a unos 38.000 ft con 16° de actitud y de ángulo de ataque; luego descendió con la nariz arriba, a unos 10.000 ft/min, con ángulo de ataque por encima de 35° durante el descenso.",
    "punto": "La actitud no dice si el ala vuela; el ángulo de ataque sí.",
    "temas": [
      "S04"
    ]
  },
  {
    "id": "ent-48",
    "nivel": "avanzado",
    "titulo": "Contaminación del ala",
    "pregunta": "¿Por qué una capa delgada de escarcha en el ala es peligrosa si casi no agrega peso?",
    "respuesta": "Porque altera la capa límite y adelanta la separación: el ala entra en pérdida a menor ángulo de ataque y con menor CLmax, y la velocidad de pérdida aumenta. El aviso de pérdida, calibrado para ala limpia, puede no anticiparla.",
    "explicacion": "El problema es aerodinámico, no de peso. Por eso el despegue exige ala limpia.",
    "punto": "Ala contaminada = pérdida a menor ángulo de ataque.",
    "temas": [
      "S04"
    ]
  },
  {
    "id": "ent-49",
    "nivel": "avanzado",
    "titulo": "Turbulencia severa y velocidad",
    "pregunta": "En crucero entras en turbulencia severa. ¿Qué velocidad usas, cómo manejas los mandos y qué riesgo aerodinámico consideras a gran altitud?",
    "respuesta": "La velocidad o el Mach de penetración de turbulencia (VRA/MRA) y el procedimiento del AFM/QRH, no Va. Mantener la actitud con entradas suaves y aceptar variaciones de altitud: las entradas grandes y alternadas pueden causar daño estructural incluso por debajo de Va (14 CFR 25.1583(a)(3)). A gran altitud, las ráfagas cambian el ángulo de ataque y el factor de carga y pueden llevar al buffet de baja o alta velocidad.",
    "explicacion": "La turbulencia combina cargas estructurales (Sección 6) con márgenes de buffet reducidos (Sección 11). La 14 CFR 25.1517 exige establecer VRA y MRA; en altitudes limitadas por Mach, MRA puede elegirse para dar el margen óptimo entre buffet de baja y alta velocidad.",
    "punto": "VRA/MRA, actitud, entradas suaves y respeto por el margen de buffet.",
    "temas": [
      "S06",
      "S11"
    ]
  }
]

export const AERO_NIVELES: { clave: NivelEntrevista; rotulo: string }[] = [
  { clave: "basico", rotulo: "Básico" },
  { clave: "intermedio", rotulo: "Intermedio" },
  { clave: "avanzado", rotulo: "Avanzado" },
]

/** Las claves de práctica válidas: los escenarios y las de entrevista. */
export const AERO_PRACTICA_CLAVES: string[] = [
  ...AERO_ESCENARIOS.map((e) => e.id),
  ...AERO_ENTREVISTA.map((e) => e.id),
]

export const AERO_PRACTICA_TOTAL = AERO_PRACTICA_CLAVES.length
