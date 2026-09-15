// GENERADO por scripts/aerodinamica/convertir.mjs desde
// docs/contenido/aerodinamica.md. No se edita a mano: se edita el documento y
// se vuelve a correr el script.

/**
 * Las doce secciones de Aerodinámica, en el formato del lector de lecciones.
 *
 * El contenido es de Camilo (docs/contenido/aerodinamica.md, versión 1.0 del
 * 15 de septiembre de 2026), con sus fuentes en el Anexo B del documento.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const AERO_LECCIONES: DocScreen[] = [
  {
    "n": 1,
    "title": "Fundamentos de aerodinámica",
    "kicker": "El vocabulario físico",
    "minutes": 10,
    "blocks": [
      {
        "kind": "p",
        "text": "**Objetivo:** manejar el vocabulario físico que usa el resto del módulo."
      },
      {
        "kind": "sub",
        "text": "Qué es la aerodinámica"
      },
      {
        "kind": "p",
        "text": "La aerodinámica estudia las fuerzas que aparecen cuando un cuerpo se mueve en el aire. Para el piloto se reduce a una pregunta: cómo se generan y cómo cambian la sustentación y la resistencia cuando cambian la velocidad, la actitud, la configuración y la atmósfera."
      },
      {
        "kind": "sub",
        "text": "El aire como fluido"
      },
      {
        "kind": "p",
        "text": "El aire es un gas: fluye, tiene masa y se comprime. A bajas velocidades (del orden de Mach 0,3 o menos) su densidad casi no cambia al rodear el avión y se analiza como incompresible. A velocidades de crucero de un jet la compresibilidad ya no se puede ignorar (Sección 10)."
      },
      {
        "kind": "table",
        "head": [
          "Propiedad",
          "Qué es",
          "Por qué le importa al piloto"
        ],
        "rows": [
          [
            "**Presión estática**",
            "Presión que ejerce el aire en reposo sobre cualquier superficie",
            "Base del altímetro; su distribución sobre el ala produce la sustentación"
          ],
          [
            "**Presión dinámica (q)**",
            "Presión asociada al movimiento: q = ½ ρ V²",
            "Es lo que \"siente\" el ala y lo que mide el anemómetro (IAS)"
          ],
          [
            "**Densidad (ρ)**",
            "Masa de aire por unidad de volumen",
            "Menos densidad → menos sustentación, empuje y potencia a una misma TAS"
          ],
          [
            "**Temperatura**",
            "Estado térmico del aire",
            "Afecta la densidad y **es lo único de lo que depende la velocidad del sonido**"
          ],
          [
            "**Viscosidad**",
            "Resistencia interna del aire a fluir",
            "Origina la capa límite y la resistencia por fricción"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "**Dato de referencia (atmósfera estándar):** a nivel del mar, 15 °C, la velocidad del sonido es 661 kt; a unos –55 °C (≈ 40.000 ft) baja a 574 kt (FAA, PHAK)."
      },
      {
        "kind": "sub",
        "text": "Flujo de aire, viento relativo y líneas de corriente"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Viento relativo (Relative Wind):** dirección del flujo de aire respecto al ala. Es paralelo y opuesto a la **trayectoria de vuelo**, no a la actitud. Si el avión desciende, el viento relativo llega desde abajo, aunque la nariz esté arriba.",
          "**Líneas de corriente (Streamlines):** trayectorias del aire en un flujo estable. Donde se juntan, el aire se acelera y su presión estática baja; donde se separan, se frena y la presión sube."
        ]
      },
      {
        "kind": "hueco",
        "rotulo": "IMG-01 · FLUJO DE AIRE Y VIENTO RELATIVO",
        "descripcion": "El viento relativo es opuesto a la trayectoria de vuelo, no a la dirección hacia donde apunta la nariz.",
        "alto": 320,
        "ratio": "16 / 9"
      },
      {
        "kind": "sub",
        "text": "Capa límite"
      },
      {
        "kind": "p",
        "text": "Por viscosidad, el aire en contacto con la superficie queda con velocidad cero y la velocidad aumenta en una capa delgada hasta el valor del flujo libre. Esa capa es la **capa límite (Boundary Layer)**."
      },
      {
        "kind": "vinetas",
        "items": [
          "**Flujo laminar:** capas ordenadas, poca fricción, pero con poca energía; se separa con facilidad.",
          "**Flujo turbulento:** mezcla y remolinos, más fricción, pero más energía cerca de la superficie; resiste mejor la separación.",
          "**Separación:** cuando la capa límite ya no puede seguir la superficie, se desprende. Aumenta mucho la resistencia y destruye sustentación. Con más ángulo de ataque, el punto de separación avanza hacia el borde de ataque."
        ]
      },
      {
        "kind": "enLaOperacion",
        "momento": "Aplicación operacional",
        "texto": "Los generadores de vórtice (Vortex Generators) mezclan aire de alta energía con la capa límite para retrasar la separación. Hielo, escarcha o suciedad en el ala alteran la capa límite y adelantan la separación: el ala entra en pérdida a menor ángulo de ataque."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Debes recordar",
        "text": "El viento relativo lo define la trayectoria, no la actitud. Y la separación de la capa límite es el mecanismo físico de la pérdida."
      },
      {
        "kind": "ponAPrueba",
        "titulo": "Quiz · Sección 1",
        "preguntas": [
          {
            "q": "¿Qué define la dirección del viento relativo?",
            "opciones": [
              {
                "t": "La trayectoria de vuelo del avión respecto a la masa de aire",
                "ok": true,
                "fb": "El viento relativo es paralelo y opuesto a la trayectoria de vuelo. La actitud y la cuerda no lo determinan; el viento meteorológico cambia la velocidad sobre el terreno, no el viento relativo."
              },
              {
                "t": "La dirección del viento reportado en el METAR",
                "fb": "El viento relativo es paralelo y opuesto a la trayectoria de vuelo. La actitud y la cuerda no lo determinan; el viento meteorológico cambia la velocidad sobre el terreno, no el viento relativo."
              },
              {
                "t": "La dirección hacia donde apunta la nariz del avión",
                "fb": "El viento relativo es paralelo y opuesto a la trayectoria de vuelo. La actitud y la cuerda no lo determinan; el viento meteorológico cambia la velocidad sobre el terreno, no el viento relativo."
              },
              {
                "t": "La línea de cuerda del ala respecto al horizonte",
                "fb": "El viento relativo es paralelo y opuesto a la trayectoria de vuelo. La actitud y la cuerda no lo determinan; el viento meteorológico cambia la velocidad sobre el terreno, no el viento relativo."
              }
            ]
          },
          {
            "q": "La velocidad del sonido en la atmósfera depende únicamente de:",
            "opciones": [
              {
                "t": "La humedad",
                "fb": "La velocidad del sonido depende solo de la temperatura del aire. Por eso disminuye al ascender hasta la tropopausa."
              },
              {
                "t": "La temperatura",
                "ok": true,
                "fb": "La velocidad del sonido depende solo de la temperatura del aire. Por eso disminuye al ascender hasta la tropopausa."
              },
              {
                "t": "La presión",
                "fb": "La velocidad del sonido depende solo de la temperatura del aire. Por eso disminuye al ascender hasta la tropopausa."
              },
              {
                "t": "La densidad",
                "fb": "La velocidad del sonido depende solo de la temperatura del aire. Por eso disminuye al ascender hasta la tropopausa."
              }
            ]
          },
          {
            "q": "Frente a una capa límite laminar, la turbulenta:",
            "opciones": [
              {
                "t": "No produce fricción porque el aire se mezcla",
                "fb": "La turbulenta tiene más fricción, pero su mezcla lleva energía a la superficie y retrasa la separación. La laminar tiene menos fricción y es menos estable."
              },
              {
                "t": "Solo aparece por encima del Mach crítico",
                "fb": "La turbulenta tiene más fricción, pero su mezcla lleva energía a la superficie y retrasa la separación. La laminar tiene menos fricción y es menos estable."
              },
              {
                "t": "Produce más fricción, pero tiene más energía y resiste mejor la separación",
                "ok": true,
                "fb": "La turbulenta tiene más fricción, pero su mezcla lleva energía a la superficie y retrasa la separación. La laminar tiene menos fricción y es menos estable."
              },
              {
                "t": "Produce menos fricción y se separa con más facilidad",
                "fb": "La turbulenta tiene más fricción, pero su mezcla lleva energía a la superficie y retrasa la separación. La laminar tiene menos fricción y es menos estable."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "n": 2,
    "title": "Las cuatro fuerzas del vuelo",
    "kicker": "Cómo se equilibran",
    "minutes": 10,
    "blocks": [
      {
        "kind": "p",
        "text": "**Objetivo:** explicar cómo se equilibran las fuerzas en cada fase del vuelo."
      },
      {
        "kind": "sub",
        "text": "Las fuerzas"
      },
      {
        "kind": "table",
        "head": [
          "Fuerza",
          "Dirección",
          "Qué la produce"
        ],
        "rows": [
          [
            "**Sustentación (Lift)**",
            "Perpendicular al viento relativo",
            "El ala al desviar el flujo y crear diferencia de presión"
          ],
          [
            "**Peso (Weight)**",
            "Hacia el centro de la Tierra, aplicado en el CG",
            "La gravedad sobre la masa total"
          ],
          [
            "**Empuje (Thrust)**",
            "Hacia adelante, a lo largo del eje de los motores",
            "Motores y hélices"
          ],
          [
            "**Resistencia (Drag)**",
            "Paralela y opuesta al viento relativo",
            "Forma, fricción, interferencia y la propia sustentación"
          ]
        ]
      },
      {
        "kind": "hueco",
        "rotulo": "IMG-02 · LAS CUATRO FUERZAS DEL VUELO",
        "descripcion": "Vuelo nivelado y ascenso estabilizado. En ascenso, una componente del peso actúa hacia atrás a lo largo de la trayectoria.",
        "alto": 320,
        "ratio": "16 / 9"
      },
      {
        "kind": "sub",
        "text": "Comportamiento por fase de vuelo"
      },
      {
        "kind": "table",
        "head": [
          "Fase",
          "Relación de fuerzas",
          "Lo que pasa realmente"
        ],
        "rows": [
          [
            "**Recto y nivelado, velocidad constante**",
            "L = W · T = D",
            "Fuerzas en equilibrio; no hay aceleración"
          ],
          [
            "**Ascenso estabilizado**",
            "T > D · L ligeramente **menor** que W",
            "Parte del peso actúa hacia atrás en la trayectoria; el empuje sobrante la compensa. El ascenso lo sostiene el **exceso de empuje**, no un exceso de sustentación"
          ],
          [
            "**Descenso estabilizado**",
            "T < D · L ligeramente menor que W",
            "Una componente del peso actúa hacia adelante y reemplaza parte del empuje"
          ],
          [
            "**Aceleración en nivelado**",
            "T > D",
            "Al aumentar la velocidad hay que **reducir** el ángulo de ataque para no ganar altitud"
          ],
          [
            "**Desaceleración en nivelado**",
            "T < D",
            "Al bajar la velocidad hay que **aumentar** el ángulo de ataque para mantener L = W"
          ]
        ]
      },
      {
        "kind": "enLaOperacion",
        "momento": "Aplicación operacional",
        "texto": "En un ascenso con empuje fijo, si subes la nariz aumentas el ángulo de trayectoria, pero la velocidad cae, porque el empuje disponible no cambió. La energía se intercambia; no se crea con el mando de profundidad."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Punto clave",
        "text": "En vuelo estabilizado (ascenso, crucero o descenso) las fuerzas están en equilibrio. Lo que hace subir al avión es el exceso de empuje sobre la resistencia, no más sustentación que peso."
      },
      {
        "kind": "detalleTecnico",
        "etiqueta": "¿En un ascenso estabilizado la sustentación es mayor que el peso?",
        "bloques": [
          {
            "kind": "p",
            "text": "No. Es ligeramente menor. En la trayectoria inclinada, una componente del peso actúa hacia atrás y la compensa el empuje; la sustentación solo equilibra la componente del peso perpendicular a la trayectoria."
          }
        ]
      },
      {
        "kind": "ponAPrueba",
        "titulo": "Quiz · Sección 2",
        "preguntas": [
          {
            "q": "En vuelo recto y nivelado a velocidad constante:",
            "opciones": [
              {
                "t": "La resistencia es cero",
                "fb": "Sin aceleración, las fuerzas opuestas se equilibran."
              },
              {
                "t": "La sustentación es mayor que el peso",
                "fb": "Sin aceleración, las fuerzas opuestas se equilibran."
              },
              {
                "t": "El empuje es mayor que la resistencia",
                "fb": "Sin aceleración, las fuerzas opuestas se equilibran."
              },
              {
                "t": "Sustentación igual a peso y empuje igual a resistencia",
                "ok": true,
                "fb": "Sin aceleración, las fuerzas opuestas se equilibran."
              }
            ]
          },
          {
            "q": "¿Qué permite a un avión mantener un ascenso estabilizado?",
            "opciones": [
              {
                "t": "Que el empuje supere a la resistencia",
                "ok": true,
                "fb": "El exceso de empuje compensa la componente del peso que actúa hacia atrás en la trayectoria. La sustentación es incluso algo menor que el peso."
              },
              {
                "t": "Que el ángulo de ataque sea mayor que el crítico",
                "fb": "El exceso de empuje compensa la componente del peso que actúa hacia atrás en la trayectoria. La sustentación es incluso algo menor que el peso."
              },
              {
                "t": "Que la sustentación supere al peso",
                "fb": "El exceso de empuje compensa la componente del peso que actúa hacia atrás en la trayectoria. La sustentación es incluso algo menor que el peso."
              },
              {
                "t": "Que el peso actúe hacia adelante",
                "fb": "El exceso de empuje compensa la componente del peso que actúa hacia atrás en la trayectoria. La sustentación es incluso algo menor que el peso."
              }
            ]
          },
          {
            "q": "Un avión acelera en vuelo nivelado. Para mantener la altitud, el piloto debe:",
            "opciones": [
              {
                "t": "Mantener el mismo ángulo de ataque",
                "fb": "La sustentación depende de V². Si la velocidad aumenta con el mismo ángulo de ataque, la sustentación crece y el avión sube; hay que reducir el ángulo de ataque."
              },
              {
                "t": "Reducir el ángulo de ataque",
                "ok": true,
                "fb": "La sustentación depende de V². Si la velocidad aumenta con el mismo ángulo de ataque, la sustentación crece y el avión sube; hay que reducir el ángulo de ataque."
              },
              {
                "t": "Extender flaps",
                "fb": "La sustentación depende de V². Si la velocidad aumenta con el mismo ángulo de ataque, la sustentación crece y el avión sube; hay que reducir el ángulo de ataque."
              },
              {
                "t": "Aumentar el ángulo de ataque",
                "fb": "La sustentación depende de V². Si la velocidad aumenta con el mismo ángulo de ataque, la sustentación crece y el avión sube; hay que reducir el ángulo de ataque."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "n": 3,
    "title": "Sustentación y perfiles aerodinámicos",
    "kicker": "De dónde sale la sustentación",
    "minutes": 12,
    "blocks": [
      {
        "kind": "p",
        "text": "**Objetivo:** explicar la sustentación con precisión y usar la ecuación sin hacer derivaciones."
      },
      {
        "kind": "sub",
        "text": "El perfil aerodinámico (Airfoil)"
      },
      {
        "kind": "table",
        "head": [
          "Término",
          "Definición"
        ],
        "rows": [
          [
            "**Borde de ataque (Leading Edge)**",
            "Parte delantera del perfil, donde el flujo se divide"
          ],
          [
            "**Borde de salida (Trailing Edge)**",
            "Parte trasera, donde el flujo se reúne"
          ],
          [
            "**Cuerda (Chord Line)**",
            "Línea recta imaginaria entre borde de ataque y borde de salida"
          ],
          [
            "**Curvatura (Camber)**",
            "Curvatura del perfil respecto a la cuerda; más curvatura, más sustentación a un mismo ángulo de ataque"
          ],
          [
            "**Espesor (Thickness)**",
            "Distancia máxima entre extradós e intradós"
          ],
          [
            "**Viento relativo**",
            "Dirección del flujo respecto al perfil (Sección 1)"
          ],
          [
            "**Ángulo de ataque (AOA)**",
            "Ángulo entre la cuerda y el viento relativo"
          ],
          [
            "**Coeficiente de sustentación (CL)**",
            "Número sin unidades que resume la capacidad del ala para producir sustentación en una condición dada"
          ]
        ]
      },
      {
        "kind": "hueco",
        "rotulo": "IMG-03 · PERFIL AERODINÁMICO ETIQUETADO",
        "descripcion": "Borde de ataque, borde de salida, cuerda, curvatura, espesor, viento relativo y ángulo de ataque.",
        "alto": 320,
        "ratio": "16 / 9"
      },
      {
        "kind": "sub",
        "text": "Cómo se genera la sustentación"
      },
      {
        "kind": "p",
        "text": "El ala está inclinada y curvada respecto al flujo. Al pasar, **desvía el aire hacia abajo** detrás del ala (downwash), con una corriente ascendente delante (upwash). Para desviar ese flujo, el ala crea una **distribución de presiones**: menor presión sobre el extradós y mayor presión en el intradós. La diferencia de presión, sumada sobre toda el ala, es la sustentación."
      },
      {
        "kind": "p",
        "text": "Hay tres formas de describir el mismo fenómeno. No compiten entre sí:"
      },
      {
        "kind": "table",
        "head": [
          "Enfoque",
          "Qué explica"
        ],
        "rows": [
          [
            "**Distribución de presión**",
            "La fuerza actúa sobre el ala como diferencia de presión entre extradós e intradós"
          ],
          [
            "**Newton (cantidad de movimiento)**",
            "El ala empuja aire hacia abajo; el aire empuja el ala hacia arriba (tercera ley)"
          ],
          [
            "**Bernoulli**",
            "A lo largo de una línea de corriente, donde el aire se acelera la presión baja; relaciona la velocidad del flujo con esa distribución de presiones"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "NASA lo resume así: tanto Bernoulli como Newton son correctos; integrar la presión o el cambio de velocidad del flujo da la misma fuerza aerodinámica."
      },
      {
        "kind": "p",
        "text": "**Error común que debes evitar en una entrevista:** la teoría del \"tiempo de tránsito igual\" (el aire de arriba recorre más distancia y debe llegar al mismo tiempo que el de abajo) es **falsa**. El aire del extradós llega antes al borde de salida, y un perfil simétrico, con extradós e intradós de igual longitud, produce sustentación con ángulo de ataque positivo."
      },
      {
        "kind": "sub",
        "text": "La ecuación de sustentación"
      },
      {
        "kind": "code",
        "text": "L = ½ ρ V² S CL",
        "grande": true,
        "tabular": true
      },
      {
        "kind": "table",
        "head": [
          "Variable",
          "Significado",
          "¿Quién la controla?"
        ],
        "rows": [
          [
            "**L**",
            "Sustentación",
            "Resultado"
          ],
          [
            "**ρ** (rho)",
            "Densidad del aire",
            "La atmósfera (altitud, temperatura, humedad)"
          ],
          [
            "**V**",
            "Velocidad verdadera respecto al aire (TAS)",
            "El piloto, con empuje y actitud"
          ],
          [
            "**½ ρ V²**",
            "Presión dinámica (q)",
            "Lo que mide el anemómetro: por eso la IAS es la referencia aerodinámica"
          ],
          [
            "**S**",
            "Superficie alar",
            "Fija (los flaps tipo Fowler la aumentan)"
          ],
          [
            "**CL**",
            "Coeficiente de sustentación",
            "El piloto, con el ángulo de ataque y la configuración (flaps, slats). También lo afectan el Mach, la contaminación y el número de Reynolds"
          ]
        ]
      },
      {
        "kind": "enLaOperacion",
        "momento": "Aplicación operacional",
        "texto": "",
        "pasos": [
          "La sustentación depende del **cuadrado** de la velocidad. Si la velocidad baja a la mitad, para sostener el mismo peso el CL tendría que ser cuatro veces mayor. Por eso, cuando la velocidad cae, el ángulo de ataque sube rápido hacia el crítico.",
          "Para un peso dado, a baja velocidad el ala vuela con alto ángulo de ataque; a alta velocidad, con bajo ángulo de ataque.",
          "A igual IAS, la presión dinámica es la misma en cualquier altitud (a bajo Mach). Por eso las velocidades de pérdida, rotación y límites de flaps se publican en IAS/CAS."
        ]
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Debes recordar",
        "text": "Newton, Bernoulli y la distribución de presión describen el mismo fenómeno. En vuelo, el piloto modifica la sustentación con la velocidad y el ángulo de ataque."
      },
      {
        "kind": "ponAPrueba",
        "titulo": "Quiz · Sección 3",
        "preguntas": [
          {
            "q": "¿Cuál es la afirmación correcta sobre la generación de sustentación?",
            "opciones": [
              {
                "t": "Solo Bernoulli la explica; Newton aplica únicamente a motores",
                "fb": "La diferencia de presión y el desvío del flujo son dos caras del mismo proceso. El \"tiempo de tránsito igual\" es falso."
              },
              {
                "t": "La sustentación se genera principalmente por el impacto del aire en el intradós",
                "fb": "La diferencia de presión y el desvío del flujo son dos caras del mismo proceso. El \"tiempo de tránsito igual\" es falso."
              },
              {
                "t": "El ala desvía el flujo hacia abajo creando una diferencia de presión; Newton y Bernoulli describen el mismo fenómeno",
                "ok": true,
                "fb": "La diferencia de presión y el desvío del flujo son dos caras del mismo proceso. El \"tiempo de tránsito igual\" es falso."
              },
              {
                "t": "El aire de arriba debe llegar al borde de salida al mismo tiempo que el de abajo",
                "fb": "La diferencia de presión y el desvío del flujo son dos caras del mismo proceso. El \"tiempo de tránsito igual\" es falso."
              }
            ]
          },
          {
            "q": "En L = ½ ρ V² S CL, ¿qué variables controla el piloto en vuelo?",
            "opciones": [
              {
                "t": "Solo S",
                "fb": "La densidad la impone la atmósfera y la superficie alar es fija. El piloto actúa sobre la velocidad y sobre el CL mediante el ángulo de ataque, flaps y slats."
              },
              {
                "t": "ρ y CL",
                "fb": "La densidad la impone la atmósfera y la superficie alar es fija. El piloto actúa sobre la velocidad y sobre el CL mediante el ángulo de ataque, flaps y slats."
              },
              {
                "t": "ρ y S",
                "fb": "La densidad la impone la atmósfera y la superficie alar es fija. El piloto actúa sobre la velocidad y sobre el CL mediante el ángulo de ataque, flaps y slats."
              },
              {
                "t": "V y CL (con ángulo de ataque y configuración)",
                "ok": true,
                "fb": "La densidad la impone la atmósfera y la superficie alar es fija. El piloto actúa sobre la velocidad y sobre el CL mediante el ángulo de ataque, flaps y slats."
              }
            ]
          },
          {
            "q": "Si la velocidad se reduce a la mitad y el peso no cambia, el CL necesario para mantener el vuelo nivelado:",
            "opciones": [
              {
                "t": "Se multiplica por cuatro",
                "ok": true,
                "fb": "La sustentación es proporcional a V². La mitad de velocidad da una cuarta parte de presión dinámica; el CL debe cuadruplicarse."
              },
              {
                "t": "No cambia",
                "fb": "La sustentación es proporcional a V². La mitad de velocidad da una cuarta parte de presión dinámica; el CL debe cuadruplicarse."
              },
              {
                "t": "Se reduce a la mitad",
                "fb": "La sustentación es proporcional a V². La mitad de velocidad da una cuarta parte de presión dinámica; el CL debe cuadruplicarse."
              },
              {
                "t": "Se duplica",
                "fb": "La sustentación es proporcional a V². La mitad de velocidad da una cuarta parte de presión dinámica; el CL debe cuadruplicarse."
              }
            ]
          },
          {
            "q": "Un perfil simétrico:",
            "opciones": [
              {
                "t": "Solo produce sustentación en vuelo invertido",
                "fb": "Con ángulo de ataque positivo desvía el flujo hacia abajo y genera diferencia de presión, aunque sus dos superficies tengan igual longitud."
              },
              {
                "t": "Produce sustentación cuando tiene ángulo de ataque positivo",
                "ok": true,
                "fb": "Con ángulo de ataque positivo desvía el flujo hacia abajo y genera diferencia de presión, aunque sus dos superficies tengan igual longitud."
              },
              {
                "t": "Produce sustentación porque su extradós es más largo",
                "fb": "Con ángulo de ataque positivo desvía el flujo hacia abajo y genera diferencia de presión, aunque sus dos superficies tengan igual longitud."
              },
              {
                "t": "No produce sustentación en ninguna condición",
                "fb": "Con ángulo de ataque positivo desvía el flujo hacia abajo y genera diferencia de presión, aunque sus dos superficies tengan igual longitud."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "n": 4,
    "title": "Ángulo de ataque y pérdida",
    "kicker": "La pérdida es de ángulo",
    "minutes": 15,
    "blocks": [
      {
        "kind": "p",
        "text": "**Objetivo:** explicar la pérdida por ángulo de ataque, no por velocidad, y aplicarlo a cualquier actitud y configuración."
      },
      {
        "kind": "sub",
        "text": "Ángulo de ataque y actitud de cabeceo"
      },
      {
        "kind": "table",
        "head": [
          "Término",
          "Definición",
          "Referencia"
        ],
        "rows": [
          [
            "**Ángulo de ataque (Angle of Attack – AOA)**",
            "Ángulo entre la cuerda del ala y el viento relativo",
            "La masa de aire"
          ],
          [
            "**Actitud de cabeceo (Pitch Attitude)**",
            "Ángulo entre el eje longitudinal del avión y el horizonte",
            "La Tierra"
          ],
          [
            "**Ángulo de trayectoria (Flight Path Angle)**",
            "Ángulo entre la trayectoria de vuelo y el horizonte",
            "La Tierra"
          ]
        ]
      },
      {
        "kind": "code",
        "text": "PITCH  ≈  AOA  +  ÁNGULO DE TRAYECTORIA",
        "grande": true,
        "tabular": true
      },
      {
        "kind": "table",
        "head": [
          "Situación",
          "Pitch",
          "Trayectoria",
          "AOA aproximado"
        ],
        "rows": [
          [
            "Ascenso normal",
            "+10°",
            "+7°",
            "3°"
          ],
          [
            "Aproximación estabilizada",
            "+3°",
            "–3°",
            "6°"
          ],
          [
            "Nariz arriba, descendiendo fuerte",
            "+15°",
            "–25°",
            "40° (en pérdida)"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "*Valores ilustrativos para mostrar la relación, no de un tipo de avión específico.*"
      },
      {
        "kind": "enLaOperacion",
        "momento": "Aplicación operacional",
        "texto": "La última fila no es teórica. En el accidente del AF447 (BEA, informe final), a unos 38.000 ft la actitud y el ángulo de ataque llegaron a 16°; después, con la nariz todavía arriba y una velocidad vertical de descenso cercana a 10.000 ft/min, el ángulo de ataque superó los 40°. La actitud por sí sola no indica si el ala está volando."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Debes recordar",
        "text": "Pitch y ángulo de ataque no son lo mismo. Una actitud de nariz arriba no garantiza que el avión esté subiendo ni que el ala esté fuera de pérdida."
      },
      {
        "kind": "sub",
        "text": "Ángulo de ataque crítico y pérdida"
      },
      {
        "kind": "vinetas",
        "items": [
          "Al aumentar el ángulo de ataque, el CL aumenta hasta un máximo: el **CLmax**. El ángulo al que ocurre es el **ángulo de ataque crítico (Critical Angle of Attack)**.",
          "Al superarlo, el flujo se separa del extradós, el CL cae y la resistencia aumenta bruscamente. Eso es la **pérdida aerodinámica (Stall)**.",
          "En pérdida el ala **no deja de producir sustentación por completo**; deja de producir la necesaria para sostener el vuelo.",
          "Para una configuración dada, un ala limpia y a bajo Mach, el ángulo de ataque crítico no depende de la velocidad, el peso, el factor de carga ni la altitud de densidad.",
          "**Sí lo cambian:** flaps de borde de salida (lo reducen, aunque aumentan el CLmax), slats y dispositivos de borde de ataque (lo aumentan), contaminación del ala (lo reduce) y el número de Mach alto (lo reduce, Sección 11)."
        ]
      },
      {
        "kind": "hueco",
        "rotulo": "IMG-04 · CURVA DE SUSTENTACIÓN VS ÁNGULO DE ATAQUE",
        "descripcion": "CL aumenta con el ángulo de ataque hasta CLmax; después del ángulo crítico el CL cae. Curvas comparadas: ala limpia, con flaps y con slats.",
        "alto": 320,
        "ratio": "16 / 9"
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Debes recordar",
        "text": "Un avión entra en pérdida cuando supera su ángulo de ataque crítico. La pérdida no ocurre simplemente porque el avión llegue a una velocidad determinada."
      },
      {
        "kind": "sub",
        "text": "Velocidad de pérdida"
      },
      {
        "kind": "p",
        "text": "La **velocidad de pérdida (Stall Speed)** es la velocidad a la que, **en unas condiciones concretas**, el ala alcanza su ángulo de ataque crítico. Es una consecuencia, no la causa."
      },
      {
        "kind": "table",
        "head": [
          "Factor",
          "Efecto en la velocidad de pérdida",
          "Por qué"
        ],
        "rows": [
          [
            "Mayor peso",
            "Aumenta (proporcional a √peso)",
            "Se necesita más sustentación"
          ],
          [
            "Mayor factor de carga (viraje, tirón)",
            "Aumenta (proporcional a √n)",
            "Se necesita más sustentación"
          ],
          [
            "CG adelantado",
            "Aumenta",
            "Más carga hacia abajo en la cola → más sustentación requerida en el ala"
          ],
          [
            "Flaps y slats extendidos",
            "Disminuye",
            "Mayor CLmax"
          ],
          [
            "Hielo, escarcha, nieve en el ala",
            "Aumenta",
            "Separación a menor ángulo de ataque y menor CLmax"
          ],
          [
            "Mach alto (gran altitud)",
            "Aumenta la IAS de pérdida",
            "Menor ángulo de ataque de pérdida y menor CLmax"
          ],
          [
            "Turbulencia",
            "Puede producir pérdida a una velocidad mayor",
            "Ráfagas verticales cambian el ángulo de ataque de forma súbita"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "La certificación de transporte (14 CFR 25.103) determina la velocidad de pérdida de referencia en 1 g y con la posición del CG que da la velocidad más alta, es decir, adelantado."
      },
      {
        "kind": "sub",
        "text": "Pérdida acelerada y pérdida en viraje"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Pérdida acelerada (Accelerated Stall):** pérdida con factor de carga mayor a 1 g. Ocurre a una velocidad superior a la de pérdida en 1 g. Ejemplos: tirón brusco en una recuperación, viraje escarpado, salida de un picado.",
          "**Pérdida en viraje:** en un viraje nivelado el ala debe producir más sustentación que el peso. Para lograrlo, el piloto aumenta el ángulo de ataque; con más alabeo, el ángulo crítico se alcanza a mayor velocidad (Sección 6).",
          "**Pérdida en diferentes configuraciones:** con flaps y slats la velocidad de pérdida baja. En alas en flecha la tendencia es entrar en pérdida primero en las puntas, lo que desplaza la sustentación hacia adelante y produce cabeceo hacia arriba. En aviones con cola en T, la cola puede quedar en la estela del ala en pérdida y perder efectividad; por eso muchos tienen empujador de bastón (Stick Pusher)."
        ]
      },
      {
        "kind": "sub",
        "text": "Recuperación de la pérdida en avión de transporte"
      },
      {
        "kind": "enLaOperacion",
        "momento": "Aplicación operacional",
        "texto": "Plantilla de recuperación de la FAA (AC 120-109A). Los fabricantes la adaptan en su QRH/FCTM; en el avión manda el procedimiento del tipo."
      },
      {
        "kind": "list",
        "items": [
          "Piloto automático y autothrottle/autothrust — **Desconectar**",
          "Mando de cabeceo nariz abajo — **Aplicar hasta eliminar las indicaciones de pérdida inminente** · Compensación nariz abajo — **Según necesidad**",
          "Alabeo — **Alas niveladas**",
          "Empuje — **Según necesidad**",
          "Speed brakes / spoilers — **Retraer**",
          "Regresar a la trayectoria deseada"
        ],
        "ordered": true
      },
      {
        "kind": "vinetas",
        "items": [
          "Reducir el ángulo de ataque es la acción más importante.",
          "La recuperación normalmente implica pérdida de altitud; la AC 120-109A pide aceptarla.",
          "El empuje máximo no siempre es lo correcto: en aviones con motores bajo el ala, a baja velocidad genera un momento de nariz arriba fuerte."
        ]
      },
      {
        "kind": "sub",
        "text": "Preguntas que debes poder responder"
      },
      {
        "kind": "detalleTecnico",
        "etiqueta": "¿Un avión puede entrar en pérdida a alta velocidad?",
        "bloques": [
          {
            "kind": "p",
            "text": "Sí. Basta con superar el ángulo de ataque crítico, por ejemplo con un tirón brusco al salir de un picado. La FAA lo resume: la pérdida puede ocurrir a cualquier velocidad, en cualquier actitud y con cualquier potencia."
          }
        ]
      },
      {
        "kind": "detalleTecnico",
        "etiqueta": "¿Puede entrar en pérdida durante un descenso?",
        "bloques": [
          {
            "kind": "p",
            "text": "Sí. En descenso el viento relativo viene desde abajo. Si el piloto sube la nariz sin energía suficiente, el ángulo de ataque aumenta aunque el avión siga bajando."
          }
        ]
      },
      {
        "kind": "detalleTecnico",
        "etiqueta": "¿Puede entrar en pérdida durante un viraje?",
        "bloques": [
          {
            "kind": "p",
            "text": "Sí, y a una velocidad mayor que en vuelo recto. El viraje aumenta el factor de carga y la sustentación requerida; con 60° de alabeo nivelado, la velocidad de pérdida aumenta cerca de 41 %."
          }
        ]
      },
      {
        "kind": "detalleTecnico",
        "etiqueta": "¿La velocidad de pérdida siempre es la misma?",
        "bloques": [
          {
            "kind": "p",
            "text": "No. Cambia con peso, factor de carga, configuración, posición del CG, contaminación y Mach. Lo que no cambia, para una configuración dada y ala limpia, es el ángulo de ataque crítico."
          }
        ]
      },
      {
        "kind": "ponAPrueba",
        "titulo": "Quiz · Sección 4",
        "preguntas": [
          {
            "q": "Un avión entra en pérdida cuando:",
            "opciones": [
              {
                "t": "Su actitud de cabeceo supera 20°",
                "fb": "La única condición necesaria es superar el ángulo de ataque crítico. La velocidad publicada corresponde a condiciones específicas (peso, configuración, 1 g)."
              },
              {
                "t": "El empuje es menor que la resistencia",
                "fb": "La única condición necesaria es superar el ángulo de ataque crítico. La velocidad publicada corresponde a condiciones específicas (peso, configuración, 1 g)."
              },
              {
                "t": "Supera su ángulo de ataque crítico",
                "ok": true,
                "fb": "La única condición necesaria es superar el ángulo de ataque crítico. La velocidad publicada corresponde a condiciones específicas (peso, configuración, 1 g)."
              },
              {
                "t": "Su velocidad cae por debajo de la velocidad de pérdida publicada",
                "fb": "La única condición necesaria es superar el ángulo de ataque crítico. La velocidad publicada corresponde a condiciones específicas (peso, configuración, 1 g)."
              }
            ]
          },
          {
            "q": "Un avión tiene 12° de pitch y su trayectoria es de –8°. Su ángulo de ataque aproximado es:",
            "opciones": [
              {
                "t": "4°",
                "fb": "Con alas niveladas, AOA ≈ pitch – ángulo de trayectoria = 12° – (–8°) = 20°. Nariz arriba y descendiendo puede significar un ángulo de ataque muy alto."
              },
              {
                "t": "12°",
                "fb": "Con alas niveladas, AOA ≈ pitch – ángulo de trayectoria = 12° – (–8°) = 20°. Nariz arriba y descendiendo puede significar un ángulo de ataque muy alto."
              },
              {
                "t": "20°",
                "ok": true,
                "fb": "Con alas niveladas, AOA ≈ pitch – ángulo de trayectoria = 12° – (–8°) = 20°. Nariz arriba y descendiendo puede significar un ángulo de ataque muy alto."
              },
              {
                "t": "–8°",
                "fb": "Con alas niveladas, AOA ≈ pitch – ángulo de trayectoria = 12° – (–8°) = 20°. Nariz arriba y descendiendo puede significar un ángulo de ataque muy alto."
              }
            ]
          },
          {
            "q": "¿Qué efecto tiene extender flaps de borde de salida?",
            "opciones": [
              {
                "t": "Aumenta el ángulo de ataque crítico y el CLmax",
                "fb": "Los flaps de borde de salida aumentan la curvatura y el CLmax, lo que baja la velocidad de pérdida; el ala llega a su máximo con un ángulo de ataque menor. Los slats son los que aumentan el ángulo crítico."
              },
              {
                "t": "Reduce el CLmax y aumenta la velocidad de pérdida",
                "fb": "Los flaps de borde de salida aumentan la curvatura y el CLmax, lo que baja la velocidad de pérdida; el ala llega a su máximo con un ángulo de ataque menor. Los slats son los que aumentan el ángulo crítico."
              },
              {
                "t": "No modifica la curva de sustentación",
                "fb": "Los flaps de borde de salida aumentan la curvatura y el CLmax, lo que baja la velocidad de pérdida; el ala llega a su máximo con un ángulo de ataque menor. Los slats son los que aumentan el ángulo crítico."
              },
              {
                "t": "Aumenta el CLmax y reduce la velocidad de pérdida, aunque el ángulo de ataque crítico suele ser menor",
                "ok": true,
                "fb": "Los flaps de borde de salida aumentan la curvatura y el CLmax, lo que baja la velocidad de pérdida; el ala llega a su máximo con un ángulo de ataque menor. Los slats son los que aumentan el ángulo crítico."
              }
            ]
          },
          {
            "q": "¿Cuál es la acción más importante en la recuperación de una pérdida según la AC 120-109A?",
            "opciones": [
              {
                "t": "Reducir el ángulo de ataque",
                "ok": true,
                "fb": "Reducir el ángulo de ataque es la prioridad. El empuje se aplica según necesidad y se acepta la pérdida de altitud."
              },
              {
                "t": "Nivelar las alas",
                "fb": "Reducir el ángulo de ataque es la prioridad. El empuje se aplica según necesidad y se acepta la pérdida de altitud."
              },
              {
                "t": "Minimizar la pérdida de altitud",
                "fb": "Reducir el ángulo de ataque es la prioridad. El empuje se aplica según necesidad y se acepta la pérdida de altitud."
              },
              {
                "t": "Aplicar empuje máximo",
                "fb": "Reducir el ángulo de ataque es la prioridad. El empuje se aplica según necesidad y se acepta la pérdida de altitud."
              }
            ]
          },
          {
            "q": "Hielo o escarcha en el ala antes del despegue:",
            "opciones": [
              {
                "t": "Aumenta el CLmax por mayor rugosidad",
                "fb": "La contaminación adelanta la separación: el ala entra en pérdida a menor ángulo de ataque y con menor CLmax, y el aviso de pérdida, calibrado para ala limpia, puede no anticiparla."
              },
              {
                "t": "Reduce el ángulo de ataque de pérdida y aumenta la velocidad de pérdida",
                "ok": true,
                "fb": "La contaminación adelanta la separación: el ala entra en pérdida a menor ángulo de ataque y con menor CLmax, y el aviso de pérdida, calibrado para ala limpia, puede no anticiparla."
              },
              {
                "t": "Solo afecta la resistencia parásita",
                "fb": "La contaminación adelanta la separación: el ala entra en pérdida a menor ángulo de ataque y con menor CLmax, y el aviso de pérdida, calibrado para ala limpia, puede no anticiparla."
              },
              {
                "t": "No afecta la pérdida si la velocidad de rotación es correcta",
                "fb": "La contaminación adelanta la separación: el ala entra en pérdida a menor ángulo de ataque y con menor CLmax, y el aviso de pérdida, calibrado para ala limpia, puede no anticiparla."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "n": 5,
    "title": "Resistencia y eficiencia aerodinámica",
    "kicker": "Parásita, inducida y L/D",
    "minutes": 12,
    "blocks": [
      {
        "kind": "p",
        "text": "**Objetivo:** entender la curva de resistencia y su uso operacional."
      },
      {
        "kind": "sub",
        "text": "Tipos de resistencia"
      },
      {
        "kind": "table",
        "head": [
          "Tipo",
          "Qué es",
          "Cómo varía con la velocidad"
        ],
        "rows": [
          [
            "**Resistencia parásita (Parasite Drag)**",
            "Resistencia que no depende de producir sustentación: forma (Form Drag), fricción superficial (Skin Friction) e interferencia entre componentes (Interference Drag)",
            "Aumenta con el cuadrado de la velocidad"
          ],
          [
            "**Resistencia inducida (Induced Drag)**",
            "Consecuencia de producir sustentación: la diferencia de presión genera vórtices de punta y el flujo desviado inclina hacia atrás la fuerza aerodinámica",
            "En vuelo nivelado, disminuye con el cuadrado de la velocidad"
          ],
          [
            "**Resistencia total**",
            "Parásita + inducida",
            "Curva en forma de \"U\" con un mínimo"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "La resistencia inducida es mayor cuando el ala está **pesada y lenta**: más peso o más factor de carga implican más sustentación, más CL y más ángulo de ataque. (La regla \"pesado, limpio y lento\" describe la estela turbulenta más intensa, no la resistencia inducida.) Alas de gran alargamiento (Aspect Ratio) y winglets la reducen; el efecto suelo también (Sección 9)."
      },
      {
        "kind": "code",
        "text": "BAJA VELOCIDAD  →  alto ángulo de ataque  →  RESISTENCIA INDUCIDA DOMINANTE\n                    ↓\n            RESISTENCIA TOTAL MÍNIMA  =  L/D MÁXIMA\n                    ↓\nALTA VELOCIDAD  →  bajo ángulo de ataque  →  RESISTENCIA PARÁSITA DOMINANTE",
        "grande": true,
        "tabular": true
      },
      {
        "kind": "hueco",
        "rotulo": "IMG-05 · CURVA DE RESISTENCIA (DRAG CURVE)",
        "descripcion": "Resistencia parásita (creciente), inducida (decreciente) y total (U). El mínimo de la total marca L/Dmax y la velocidad de mínima resistencia.",
        "alto": 320,
        "ratio": "16 / 9"
      },
      {
        "kind": "sub",
        "text": "Eficiencia aerodinámica: L/D"
      },
      {
        "kind": "vinetas",
        "items": [
          "**L/D** es la relación entre sustentación y resistencia. Indica cuánta sustentación obtiene el ala por cada unidad de resistencia.",
          "**L/Dmax** ocurre a un ángulo de ataque y un CL específicos. Ahí la resistencia total es mínima; en la teoría clásica coincide con el punto donde la resistencia inducida iguala a la parásita.",
          "La **velocidad de máxima eficiencia** (mínima resistencia) no es fija: aumenta con el peso, porque se necesita más presión dinámica para el mismo CL."
        ]
      },
      {
        "kind": "sub",
        "text": "Planeo"
      },
      {
        "kind": "vinetas",
        "items": [
          "La relación de planeo máxima es numéricamente igual a L/Dmax. Volando al ángulo de ataque de L/Dmax se obtiene la máxima distancia recorrida en el aire.",
          "**Un avión más pesado no planea menos distancia:** a L/Dmax recorre la misma distancia, pero a una velocidad mayor y con mayor régimen de descenso.",
          "Volar más lento o más rápido que la velocidad de mejor planeo reduce la distancia."
        ]
      },
      {
        "kind": "enLaOperacion",
        "momento": "Aplicación operacional",
        "texto": "",
        "pasos": [
          "**Por debajo de la velocidad de mínima resistencia** (régimen de mando invertido, Back Side of the Drag Curve) volar más lento exige **más** empuje. Si en la aproximación la velocidad cae y el piloto solo sube la nariz, la resistencia aumenta y la velocidad sigue cayendo. La corrección requiere empuje.",
          "En un jet el consumo depende del empuje. Cerca de la velocidad de mínima resistencia el empuje requerido es mínimo, lo que minimiza el consumo por hora: es la lógica de las velocidades de espera (holding)."
        ]
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Debes recordar",
        "text": "A baja velocidad domina la resistencia inducida; a alta velocidad, la parásita. En L/Dmax la resistencia total es mínima y se obtiene el mejor planeo, sin importar el peso."
      },
      {
        "kind": "ponAPrueba",
        "titulo": "Quiz · Sección 5",
        "preguntas": [
          {
            "q": "Si la velocidad se duplica en vuelo nivelado, la resistencia parásita:",
            "opciones": [
              {
                "t": "Se duplica",
                "fb": "La resistencia parásita es proporcional al cuadrado de la velocidad."
              },
              {
                "t": "No cambia",
                "fb": "La resistencia parásita es proporcional al cuadrado de la velocidad."
              },
              {
                "t": "Se multiplica aproximadamente por cuatro",
                "ok": true,
                "fb": "La resistencia parásita es proporcional al cuadrado de la velocidad."
              },
              {
                "t": "Se reduce a la mitad",
                "fb": "La resistencia parásita es proporcional al cuadrado de la velocidad."
              }
            ]
          },
          {
            "q": "La resistencia inducida es mayor cuando el avión está:",
            "opciones": [
              {
                "t": "En crucero a alta velocidad",
                "fb": "Mucho peso y poca velocidad exigen alto ángulo de ataque y fuerte diferencia de presión: vórtices intensos y más resistencia inducida."
              },
              {
                "t": "En efecto suelo",
                "fb": "Mucho peso y poca velocidad exigen alto ángulo de ataque y fuerte diferencia de presión: vórtices intensos y más resistencia inducida."
              },
              {
                "t": "Liviano y rápido",
                "fb": "Mucho peso y poca velocidad exigen alto ángulo de ataque y fuerte diferencia de presión: vórtices intensos y más resistencia inducida."
              },
              {
                "t": "Pesado y lento",
                "ok": true,
                "fb": "Mucho peso y poca velocidad exigen alto ángulo de ataque y fuerte diferencia de presión: vórtices intensos y más resistencia inducida."
              }
            ]
          },
          {
            "q": "Dos aviones iguales planean desde la misma altitud a su velocidad de L/Dmax; uno pesa 20 % más. El más pesado:",
            "opciones": [
              {
                "t": "Recorre la misma distancia a mayor velocidad",
                "ok": true,
                "fb": "La relación de planeo depende de L/D, no del peso. El peso cambia la velocidad a la que se obtiene L/Dmax."
              },
              {
                "t": "Recorre menos distancia",
                "fb": "La relación de planeo depende de L/D, no del peso. El peso cambia la velocidad a la que se obtiene L/Dmax."
              },
              {
                "t": "Recorre más distancia a menor velocidad",
                "fb": "La relación de planeo depende de L/D, no del peso. El peso cambia la velocidad a la que se obtiene L/Dmax."
              },
              {
                "t": "Debe planear a la misma velocidad que el liviano",
                "fb": "La relación de planeo depende de L/D, no del peso. El peso cambia la velocidad a la que se obtiene L/Dmax."
              }
            ]
          },
          {
            "q": "En el régimen de mando invertido (Back Side of the Drag Curve):",
            "opciones": [
              {
                "t": "La resistencia parásita es dominante",
                "fb": "Por debajo de la velocidad de mínima resistencia, la resistencia inducida crece al frenar; mantener una velocidad menor exige más empuje."
              },
              {
                "t": "Reducir la velocidad requiere más empuje",
                "ok": true,
                "fb": "Por debajo de la velocidad de mínima resistencia, la resistencia inducida crece al frenar; mantener una velocidad menor exige más empuje."
              },
              {
                "t": "Reducir la velocidad requiere menos empuje",
                "fb": "Por debajo de la velocidad de mínima resistencia, la resistencia inducida crece al frenar; mantener una velocidad menor exige más empuje."
              },
              {
                "t": "El avión está siempre en pérdida",
                "fb": "Por debajo de la velocidad de mínima resistencia, la resistencia inducida crece al frenar; mantener una velocidad menor exige más empuje."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "n": 6,
    "title": "Factor de carga, virajes y velocidad de maniobra",
    "kicker": "Lo que cambia al virar",
    "minutes": 12,
    "blocks": [
      {
        "kind": "p",
        "text": "**Objetivo:** calcular mentalmente el efecto del alabeo y explicar correctamente Va."
      },
      {
        "kind": "sub",
        "text": "Factor de carga"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Factor de carga (Load Factor – n):** relación entre la sustentación y el peso (n = L/W). Se expresa en **G**. En vuelo recto y nivelado, n = 1.",
          "En un **viraje nivelado coordinado**, n = 1 / cos(ángulo de alabeo). El factor de carga no depende del tipo de avión ni de la velocidad; solo del alabeo.",
          "La velocidad de pérdida aumenta con la raíz cuadrada del factor de carga: **Vs viraje = Vs × √n**."
        ]
      },
      {
        "kind": "table",
        "head": [
          "Alabeo (Bank Angle)",
          "Factor de carga",
          "Aumento de la velocidad de pérdida",
          "Ejemplo: Vs 1 g = 130 kt"
        ],
        "rows": [
          [
            "0°",
            "1,00 G",
            "0 %",
            "130 kt"
          ],
          [
            "30°",
            "1,15 G",
            "≈ 7,5 %",
            "≈ 140 kt"
          ],
          [
            "45°",
            "1,41 G",
            "≈ 19 %",
            "≈ 155 kt"
          ],
          [
            "60°",
            "2,00 G",
            "≈ 41 %",
            "≈ 184 kt"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "*El valor de 130 kt es ilustrativo.*"
      },
      {
        "kind": "hueco",
        "rotulo": "IMG-06 · BANK ANGLE / LOAD FACTOR",
        "descripcion": "Vector de sustentación inclinado en viraje: componente vertical que equilibra el peso y componente horizontal que produce el viraje. Curva de factor de carga vs alabeo con 30°, 45° y 60° marcados.",
        "alto": 320,
        "ratio": "16 / 9"
      },
      {
        "kind": "sub",
        "text": "Por qué aumenta la velocidad de pérdida en un viraje"
      },
      {
        "kind": "p",
        "text": "Al alabear, la sustentación se inclina. Solo su componente vertical sostiene el peso. Para no descender, la sustentación total debe aumentar, y a la misma velocidad eso solo se logra con más ángulo de ataque. Con más alabeo, el ala llega a su ángulo de ataque crítico a una velocidad mayor."
      },
      {
        "kind": "enLaOperacion",
        "momento": "Aplicación operacional",
        "texto": "",
        "pasos": [
          "Mantener altitud en viraje exige más ángulo de ataque y más empuje, porque aumenta la resistencia inducida.",
          "A gran altitud, el mismo viraje reduce el margen hasta el buffet de baja velocidad (Sección 11).",
          "Un viraje escarpado a baja altura y baja velocidad (circuito, aproximación en circuito, maniobra de escape) combina alto factor de carga con poco margen de altitud para recuperar."
        ]
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Debes recordar",
        "text": "A mayor ángulo de alabeo, mayor factor de carga y, por tanto, mayor velocidad de pérdida. 60° de alabeo = 2 G = +41 % en la velocidad de pérdida."
      },
      {
        "kind": "sub",
        "text": "Pérdida acelerada"
      },
      {
        "kind": "p",
        "text": "Es la pérdida que ocurre con n > 1. En viraje o en un tirón, el ala alcanza el ángulo crítico por encima de la velocidad de pérdida en 1 g (Sección 4)."
      },
      {
        "kind": "sub",
        "text": "Velocidad de maniobra (Va)"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Va (Design Maneuvering Speed):** velocidad máxima a la que se puede aplicar la deflexión completa de **un** mando, en **un** eje, sin exceder la carga límite de diseño. Por debajo de Va, en una maniobra de cabeceo, el ala entra en pérdida antes de alcanzar el factor de carga límite.",
          "**Va disminuye cuando el peso disminuye.** Con menos peso, la misma sustentación produce un factor de carga mayor (n = L/W) y la velocidad de pérdida es menor. La velocidad por debajo de la cual el ala entra en pérdida antes de alcanzar la carga límite es, por tanto, más baja."
        ]
      },
      {
        "kind": "p",
        "text": "**Lo que Va NO protege:** Por regulación (14 CFR 25.1583(a)(3)), el manual de vuelo debe advertir que las entradas de mando **rápidas, grandes y alternadas**, en especial combinadas con grandes cambios de cabeceo, alabeo o guiñada, y las entradas completas **en más de un eje al mismo tiempo**, pueden producir falla estructural **a cualquier velocidad, incluso por debajo de Va**."
      },
      {
        "kind": "enLaOperacion",
        "momento": "Aplicación operacional",
        "texto": "",
        "pasos": [
          "Tras el accidente de American Airlines 587 (2001), la NTSB concluyó que existía un malentendido extendido entre pilotos sobre la protección estructural por debajo de Va. La causa probable fueron entradas de timón innecesarias y excesivas del primer oficial, alternadas, que produjeron cargas superiores a la carga última de diseño del estabilizador vertical; el diseño del sistema de timón y el programa de entrenamiento fueron factores contribuyentes.",
          "En turbulencia, en aviones de transporte, la referencia es la **velocidad y el Mach de penetración en turbulencia (VRA / MRA, Rough Air Speed / Mach)** del AFM/QRH, no Va. A gran altitud, donde el límite es el Mach, MRA puede elegirse para dar el mejor margen entre buffet de baja y alta velocidad (14 CFR 25.1517)."
        ]
      },
      {
        "kind": "p",
        "text": "**Límites de factor de carga (referencia):**"
      },
      {
        "kind": "table",
        "head": [
          "Categoría",
          "Positivo",
          "Negativo"
        ],
        "rows": [
          [
            "Transporte (14 CFR 25.337), flaps arriba",
            "+2,5 G como mínimo (según peso, hasta 3,8)",
            "–1,0 G hasta VC"
          ],
          [
            "Transporte, flaps extendidos (25.345)",
            "+2,0 G",
            "—"
          ],
          [
            "Normal (valores históricos de 14 CFR 23.337)",
            "+3,8 G",
            "–1,52 G"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "La estructura se diseña para soportar 1,5 veces la carga límite (carga última). Ese margen es para lo imprevisto, no para usarlo."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Debes recordar",
        "text": "Va protege contra la deflexión completa de un mando en un eje. No protege contra entradas alternadas ni simultáneas en varios ejes. Y baja con el peso."
      },
      {
        "kind": "ponAPrueba",
        "titulo": "Quiz · Sección 6",
        "preguntas": [
          {
            "q": "En un viraje nivelado coordinado de 60° de alabeo, el factor de carga es:",
            "opciones": [
              {
                "t": "1,15 G",
                "fb": "n = 1/cos 60° = 1/0,5 = 2 G, en cualquier avión y a cualquier velocidad."
              },
              {
                "t": "1,41 G",
                "fb": "n = 1/cos 60° = 1/0,5 = 2 G, en cualquier avión y a cualquier velocidad."
              },
              {
                "t": "2,00 G",
                "ok": true,
                "fb": "n = 1/cos 60° = 1/0,5 = 2 G, en cualquier avión y a cualquier velocidad."
              },
              {
                "t": "3,00 G",
                "fb": "n = 1/cos 60° = 1/0,5 = 2 G, en cualquier avión y a cualquier velocidad."
              }
            ]
          },
          {
            "q": "Un avión tiene Vs = 120 kt en 1 g. En un viraje nivelado de 45°, su velocidad de pérdida es aproximadamente:",
            "opciones": [
              {
                "t": "120 kt",
                "fb": "n = 1,41; √1,41 ≈ 1,19; 120 × 1,19 ≈ 143 kt."
              },
              {
                "t": "128 kt",
                "fb": "n = 1,41; √1,41 ≈ 1,19; 120 × 1,19 ≈ 143 kt."
              },
              {
                "t": "143 kt",
                "ok": true,
                "fb": "n = 1,41; √1,41 ≈ 1,19; 120 × 1,19 ≈ 143 kt."
              },
              {
                "t": "170 kt",
                "fb": "n = 1,41; √1,41 ≈ 1,19; 120 × 1,19 ≈ 143 kt."
              }
            ]
          },
          {
            "q": "¿Cuál afirmación sobre Va es correcta?",
            "opciones": [
              {
                "t": "Va es fija y no depende del peso",
                "fb": "Resume lo que 14 CFR 25.1583(a)(3) exige en el manual: la aplicación completa de mandos se limita a velocidades por debajo de la velocidad de maniobra, y las entradas grandes y alternadas o en varios ejes pueden causar falla a cualquier velocidad. Va disminuye con el peso; en transporte la turbulencia se vuela con VRA/MRA."
              },
              {
                "t": "Va es la velocidad recomendada de penetración de turbulencia en todos los aviones de transporte",
                "fb": "Resume lo que 14 CFR 25.1583(a)(3) exige en el manual: la aplicación completa de mandos se limita a velocidades por debajo de la velocidad de maniobra, y las entradas grandes y alternadas o en varios ejes pueden causar falla a cualquier velocidad. Va disminuye con el peso; en transporte la turbulencia se vuela con VRA/MRA."
              },
              {
                "t": "Por debajo de Va, la deflexión completa de un mando en un eje no debe exceder la carga límite; las entradas alternadas o en varios ejes pueden causar falla incluso por debajo de Va",
                "ok": true,
                "fb": "Resume lo que 14 CFR 25.1583(a)(3) exige en el manual: la aplicación completa de mandos se limita a velocidades por debajo de la velocidad de maniobra, y las entradas grandes y alternadas o en varios ejes pueden causar falla a cualquier velocidad. Va disminuye con el peso; en transporte la turbulencia se vuela con VRA/MRA."
              },
              {
                "t": "Por debajo de Va cualquier combinación de mandos es segura",
                "fb": "Resume lo que 14 CFR 25.1583(a)(3) exige en el manual: la aplicación completa de mandos se limita a velocidades por debajo de la velocidad de maniobra, y las entradas grandes y alternadas o en varios ejes pueden causar falla a cualquier velocidad. Va disminuye con el peso; en transporte la turbulencia se vuela con VRA/MRA."
              }
            ]
          },
          {
            "q": "Si el peso del avión disminuye, Va:",
            "opciones": [
              {
                "t": "Se vuelve igual a VNE",
                "fb": "Con menos peso, la misma sustentación produce más G (n = L/W) y la velocidad de pérdida es menor. La velocidad a la que el ala todavía entra en pérdida antes de alcanzar la carga límite baja con el peso."
              },
              {
                "t": "Aumenta",
                "fb": "Con menos peso, la misma sustentación produce más G (n = L/W) y la velocidad de pérdida es menor. La velocidad a la que el ala todavía entra en pérdida antes de alcanzar la carga límite baja con el peso."
              },
              {
                "t": "No cambia",
                "fb": "Con menos peso, la misma sustentación produce más G (n = L/W) y la velocidad de pérdida es menor. La velocidad a la que el ala todavía entra en pérdida antes de alcanzar la carga límite baja con el peso."
              },
              {
                "t": "Disminuye",
                "ok": true,
                "fb": "Con menos peso, la misma sustentación produce más G (n = L/W) y la velocidad de pérdida es menor. La velocidad a la que el ala todavía entra en pérdida antes de alcanzar la carga límite baja con el peso."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "n": 7,
    "title": "Superficies de control y dispositivos hipersustentadores",
    "kicker": "Qué mueve cada mando",
    "minutes": 10,
    "blocks": [
      {
        "kind": "p",
        "text": "**Objetivo:** identificar cada superficie de un avión de transporte y su efecto aerodinámico."
      },
      {
        "kind": "hueco",
        "rotulo": "IMG-07 · SUPERFICIES DE CONTROL DE UN AVIÓN DE TRANSPORTE",
        "descripcion": "Vista en planta de un jet de transporte: alerones, elevador, timón de dirección, estabilizadores, flaps, slats, spoilers de vuelo y de tierra.",
        "alto": 320,
        "ratio": "16 / 9"
      },
      {
        "kind": "sub",
        "text": "Superficies primarias"
      },
      {
        "kind": "p",
        "text": "**Alerones (Ailerons)**"
      },
      {
        "kind": "vinetas",
        "items": [
          "**QUÉ ES:** superficies móviles en el borde de salida, hacia las puntas del ala.",
          "**QUÉ HACE:** controla el alabeo alrededor del eje longitudinal. El alerón que baja aumenta la sustentación de esa ala; el que sube la reduce.",
          "**CUÁNDO SE UTILIZA:** en todo el vuelo para alabear e iniciar virajes. Algunos jets tienen alerones exteriores de baja velocidad e interiores de alta velocidad; los exteriores pueden quedar inactivos en crucero. Los spoilers de vuelo complementan el alabeo."
        ]
      },
      {
        "kind": "p",
        "text": "**Elevador (Elevator)**"
      },
      {
        "kind": "vinetas",
        "items": [
          "**QUÉ ES:** superficie móvil en el borde de salida del estabilizador horizontal.",
          "**QUÉ HACE:** controla el cabeceo alrededor del eje lateral y, con ello, el ángulo de ataque del ala.",
          "**CUÁNDO SE UTILIZA:** rotación, ascenso, nivelación, flare y cualquier cambio de actitud."
        ]
      },
      {
        "kind": "p",
        "text": "**Timón de dirección (Rudder)**"
      },
      {
        "kind": "vinetas",
        "items": [
          "**QUÉ ES:** superficie móvil en el borde de salida del estabilizador vertical.",
          "**QUÉ HACE:** controla la guiñada alrededor del eje vertical.",
          "**CUÁNDO SE UTILIZA:** coordinación, viento cruzado en despegue y aterrizaje, y control con empuje asimétrico por falla de motor. En muchos aviones de transporte su recorrido se limita automáticamente al aumentar la velocidad. No se usa para alabear ni para \"combatir\" estela o turbulencia a velocidades medias y altas (Sección 6; AA587 ocurrió en el ascenso inicial, en estela turbulenta)."
        ]
      },
      {
        "kind": "sub",
        "text": "Superficies de estabilización"
      },
      {
        "kind": "p",
        "text": "**Estabilizador horizontal (Horizontal Stabilizer)**"
      },
      {
        "kind": "vinetas",
        "items": [
          "**QUÉ ES:** superficie fija o ajustable en la cola.",
          "**QUÉ HACE:** da estabilidad longitudinal. En un avión convencional produce normalmente una fuerza hacia abajo que equilibra el momento de nariz abajo del ala.",
          "**CUÁNDO SE UTILIZA:** siempre. En aviones de transporte suele ser **compensable** (Trimmable Horizontal Stabilizer): se ajusta para el despegue según el CG y se mueve para compensar en vuelo."
        ]
      },
      {
        "kind": "p",
        "text": "**Estabilizador vertical (Vertical Stabilizer)**"
      },
      {
        "kind": "vinetas",
        "items": [
          "**QUÉ ES:** superficie fija vertical en la cola.",
          "**QUÉ HACE:** da estabilidad direccional; tiende a alinear la nariz con el viento relativo.",
          "**CUÁNDO SE UTILIZA:** siempre; es la base de la estabilidad en guiñada."
        ]
      },
      {
        "kind": "sub",
        "text": "Dispositivos hipersustentadores"
      },
      {
        "kind": "p",
        "text": "**Flaps**"
      },
      {
        "kind": "vinetas",
        "items": [
          "**QUÉ ES:** superficies en el borde de salida del ala (sencillos, partidos, ranurados, Fowler).",
          "**QUÉ HACE:** aumentan la curvatura y, en los Fowler, también la superficie alar. Aumentan el CLmax y la resistencia, y reducen la velocidad de pérdida. Permiten volar a menor velocidad con una actitud de cabeceo más baja. Reducen el ángulo de ataque crítico.",
          "**CUÁNDO SE UTILIZA:** despegue con posiciones parciales (más sustentación sin tanta resistencia) y aproximación y aterrizaje con posiciones mayores (velocidad baja y ángulo de descenso más pronunciado)."
        ]
      },
      {
        "kind": "p",
        "text": "**Slats y dispositivos de borde de ataque (Leading Edge Devices)**"
      },
      {
        "kind": "vinetas",
        "items": [
          "**QUÉ ES:** slats (móviles, abren una ranura), slots (ranuras fijas) y flaps Krueger en el borde de ataque.",
          "**QUÉ HACE:** retrasan la separación del flujo. Permiten volar a un ángulo de ataque mayor antes de la pérdida: **aumentan el ángulo de ataque crítico** y el CLmax.",
          "**CUÁNDO SE UTILIZA:** despegue, aproximación y aterrizaje, casi siempre combinados con flaps."
        ]
      },
      {
        "kind": "sub",
        "text": "Otros"
      },
      {
        "kind": "p",
        "text": "**Spoilers**"
      },
      {
        "kind": "vinetas",
        "items": [
          "**QUÉ ES:** paneles en el extradós que se levantan.",
          "**QUÉ HACE:** destruyen sustentación y aumentan resistencia.",
          "**CUÁNDO SE UTILIZA:**"
        ]
      },
      {
        "kind": "p",
        "text": "- **Spoilers de vuelo:** asimétricos para ayudar al alabeo (sin guiñada adversa); simétricos como frenos aerodinámicos.   - **Spoilers de tierra (Ground Spoilers / Lift Dumpers):** tras el toque, eliminan sustentación y transfieren peso a las ruedas para mejorar el frenado."
      },
      {
        "kind": "p",
        "text": "**Frenos aerodinámicos (Speed Brakes)**"
      },
      {
        "kind": "vinetas",
        "items": [
          "**QUÉ ES:** dispositivos de resistencia; en la mayoría de los jets de transporte son los mismos spoilers usados de forma simétrica en vuelo.",
          "**QUÉ HACE:** aumentan la resistencia para descender más rápido sin ganar velocidad, o para reducir velocidad.",
          "**CUÁNDO SE UTILIZA:** descensos, cambios de velocidad ordenados por ATC, gestión de energía. Se retraen en la recuperación de pérdida (AC 120-109A)."
        ]
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Debes recordar",
        "text": "Flaps de borde de salida: más CLmax, menos ángulo crítico. Slats: más CLmax y más ángulo crítico. Spoilers: menos sustentación y más resistencia."
      },
      {
        "kind": "ponAPrueba",
        "titulo": "Quiz · Sección 7",
        "preguntas": [
          {
            "q": "¿Qué dispositivo aumenta el ángulo de ataque crítico del ala?",
            "opciones": [
              {
                "t": "Slats de borde de ataque",
                "ok": true,
                "fb": "Los slats retrasan la separación y permiten un ángulo de ataque mayor antes de la pérdida. Los flaps de borde de salida aumentan el CLmax, pero el ángulo crítico suele disminuir."
              },
              {
                "t": "Spoilers",
                "fb": "Los slats retrasan la separación y permiten un ángulo de ataque mayor antes de la pérdida. Los flaps de borde de salida aumentan el CLmax, pero el ángulo crítico suele disminuir."
              },
              {
                "t": "Flaps de borde de salida",
                "fb": "Los slats retrasan la separación y permiten un ángulo de ataque mayor antes de la pérdida. Los flaps de borde de salida aumentan el CLmax, pero el ángulo crítico suele disminuir."
              },
              {
                "t": "Compensador del elevador",
                "fb": "Los slats retrasan la separación y permiten un ángulo de ataque mayor antes de la pérdida. Los flaps de borde de salida aumentan el CLmax, pero el ángulo crítico suele disminuir."
              }
            ]
          },
          {
            "q": "Tras el toque, los spoilers de tierra mejoran el frenado porque:",
            "opciones": [
              {
                "t": "Aumentan el ángulo de ataque del ala",
                "fb": "Con menos sustentación, el peso carga las ruedas y los frenos son más efectivos; además aportan resistencia."
              },
              {
                "t": "Eliminan sustentación y transfieren peso a las ruedas",
                "ok": true,
                "fb": "Con menos sustentación, el peso carga las ruedas y los frenos son más efectivos; además aportan resistencia."
              },
              {
                "t": "Aumentan el empuje de reversa",
                "fb": "Con menos sustentación, el peso carga las ruedas y los frenos son más efectivos; además aportan resistencia."
              },
              {
                "t": "Reducen la resistencia parásita",
                "fb": "Con menos sustentación, el peso carga las ruedas y los frenos son más efectivos; además aportan resistencia."
              }
            ]
          },
          {
            "q": "En un avión de transporte, el estabilizador horizontal compensable se ajusta antes del despegue principalmente según:",
            "opciones": [
              {
                "t": "La longitud de pista",
                "fb": "El ajuste de compensación de despegue depende sobre todo del CG; así las fuerzas de rotación quedan dentro del rango previsto."
              },
              {
                "t": "La velocidad del viento",
                "fb": "El ajuste de compensación de despegue depende sobre todo del CG; así las fuerzas de rotación quedan dentro del rango previsto."
              },
              {
                "t": "La posición del CG (y el peso/configuración según el tipo)",
                "ok": true,
                "fb": "El ajuste de compensación de despegue depende sobre todo del CG; así las fuerzas de rotación quedan dentro del rango previsto."
              },
              {
                "t": "La temperatura exterior",
                "fb": "El ajuste de compensación de despegue depende sobre todo del CG; así las fuerzas de rotación quedan dentro del rango previsto."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "n": 8,
    "title": "Estabilidad, control y centro de gravedad",
    "kicker": "Dónde va el peso",
    "minutes": 12,
    "blocks": [
      {
        "kind": "p",
        "text": "**Objetivo:** relacionar la posición del CG con estabilidad, control y performance."
      },
      {
        "kind": "sub",
        "text": "Estabilidad y control"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Estabilidad:** tendencia del avión a volver a su condición de equilibrio después de una perturbación, sin intervención del piloto.",
          "**Control:** capacidad del piloto de cambiar esa condición con los mandos.",
          "Son opuestos en el diseño: más estabilidad implica más fuerza y menos respuesta; menos estabilidad, más maniobrabilidad y más carga de trabajo."
        ]
      },
      {
        "kind": "table",
        "head": [
          "Tipo",
          "Pregunta que responde",
          "Positiva",
          "Neutra",
          "Negativa"
        ],
        "rows": [
          [
            "**Estabilidad estática**",
            "¿Cuál es la **tendencia inicial** después de la perturbación?",
            "Tiende a volver",
            "Se queda en la nueva posición",
            "Se aleja más"
          ],
          [
            "**Estabilidad dinámica**",
            "¿Qué pasa **con el tiempo**?",
            "Las oscilaciones se amortiguan",
            "Oscilan sin cambiar amplitud",
            "Las oscilaciones crecen"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "Un avión puede tener estabilidad estática positiva y aun así oscilaciones que no se amortigüen: la estática es condición necesaria, no suficiente."
      },
      {
        "kind": "table",
        "head": [
          "Eje",
          "Tipo de estabilidad",
          "Qué la produce"
        ],
        "rows": [
          [
            "Lateral (cabeceo)",
            "**Longitudinal**",
            "CG por delante del punto neutro (centro aerodinámico del avión completo) y estabilizador horizontal"
          ],
          [
            "Longitudinal (alabeo)",
            "**Lateral**",
            "Diedro, flecha, ala alta (interacción ala–fuselaje en el derrape) y distribución de peso"
          ],
          [
            "Vertical (guiñada)",
            "**Direccional**",
            "Estabilizador vertical, área lateral detrás del CG, flecha"
          ]
        ]
      },
      {
        "kind": "sub",
        "text": "CG, centro de presión y momento"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Centro de gravedad (CG):** punto donde se considera aplicado el peso total. En aviones de transporte se expresa en % de la cuerda aerodinámica media (% MAC).",
          "**Centro de presión (CP):** punto donde se considera aplicada la resultante de la sustentación del ala. Se desplaza con el ángulo de ataque: en un perfil convencional avanza al aumentarlo y retrocede al reducirlo.",
          "**Momento:** fuerza × brazo. En un avión convencional el CG está delante del CP: el ala genera un momento de nariz abajo que el estabilizador horizontal equilibra con una fuerza hacia abajo."
        ]
      },
      {
        "kind": "hueco",
        "rotulo": "IMG-08 · CG Y ESTABILIDAD LONGITUDINAL",
        "descripcion": "Peso en el CG, sustentación en el CP detrás del CG, fuerza hacia abajo en la cola y los brazos de momento. Comparación CG adelantado vs atrasado.",
        "alto": 320,
        "ratio": "16 / 9"
      },
      {
        "kind": "sub",
        "text": "Qué ocurre según la posición del CG"
      },
      {
        "kind": "table",
        "head": [
          "Aspecto",
          "CG demasiado **adelantado**",
          "CG demasiado **atrasado**"
        ],
        "rows": [
          [
            "**Estabilidad**",
            "Más estable",
            "Menos estable; puede volverse inestable"
          ],
          [
            "**Control**",
            "Menos respuesta del elevador",
            "Más sensible; riesgo de sobrecontrol"
          ],
          [
            "**Fuerzas de mando**",
            "Mayores",
            "Menores; es más fácil sobrecargar la estructura"
          ],
          [
            "**Velocidad de pérdida**",
            "Mayor (más carga hacia abajo en la cola)",
            "Menor"
          ],
          [
            "**Performance**",
            "Más resistencia por compensación y más consumo; menor velocidad de crucero",
            "Menos resistencia y consumo"
          ],
          [
            "**Despegue**",
            "Mayor fuerza para rotar; si está fuera de límite puede no rotar a la velocidad prevista",
            "Rotación ligera; riesgo de sobrerrotación y de golpe de cola (Tail Strike)"
          ],
          [
            "**Aterrizaje**",
            "Flare más difícil; puede faltar autoridad de elevador",
            "Flare sensible; menor estabilidad en la aproximación"
          ],
          [
            "**Pérdida y recuperación**",
            "Recuperación más fácil",
            "Recuperación más difícil; más allá del límite trasero puede faltar elevador para bajar la nariz"
          ]
        ]
      },
      {
        "kind": "enLaOperacion",
        "momento": "Aplicación operacional",
        "texto": "",
        "pasos": [
          "La hoja de carga y balance no es un trámite: el CG define la compensación de despegue, las fuerzas de rotación y los márgenes de pérdida.",
          "El consumo de combustible y el movimiento de pasajeros o carga desplazan el CG en vuelo."
        ]
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Debes recordar",
        "text": "CG adelantado: más estable, más pesado de mandos, mayor velocidad de pérdida y más consumo. CG atrasado: menos estable, mandos livianos, peor recuperación de pérdida."
      },
      {
        "kind": "ponAPrueba",
        "titulo": "Quiz · Sección 8",
        "preguntas": [
          {
            "q": "La estabilidad estática positiva describe:",
            "opciones": [
              {
                "t": "Oscilaciones que se amortiguan con el tiempo",
                "fb": "La estática trata la tendencia inicial; la dinámica, el comportamiento en el tiempo."
              },
              {
                "t": "Oscilaciones de amplitud constante",
                "fb": "La estática trata la tendencia inicial; la dinámica, el comportamiento en el tiempo."
              },
              {
                "t": "La capacidad del piloto de cambiar la actitud",
                "fb": "La estática trata la tendencia inicial; la dinámica, el comportamiento en el tiempo."
              },
              {
                "t": "La tendencia inicial a volver a la condición de equilibrio",
                "ok": true,
                "fb": "La estática trata la tendencia inicial; la dinámica, el comportamiento en el tiempo."
              }
            ]
          },
          {
            "q": "Con el CG en el límite delantero, respecto a un CG atrasado, el avión tendrá:",
            "opciones": [
              {
                "t": "Mayor velocidad de pérdida, mayores fuerzas de mando y más consumo",
                "ok": true,
                "fb": "Un CG adelantado exige más fuerza hacia abajo en la cola: el ala sostiene más carga, sube la velocidad de pérdida y la resistencia por compensación."
              },
              {
                "t": "Menor velocidad de pérdida y menor consumo",
                "fb": "Un CG adelantado exige más fuerza hacia abajo en la cola: el ala sostiene más carga, sube la velocidad de pérdida y la resistencia por compensación."
              },
              {
                "t": "Mayor riesgo de golpe de cola en la rotación",
                "fb": "Un CG adelantado exige más fuerza hacia abajo en la cola: el ala sostiene más carga, sube la velocidad de pérdida y la resistencia por compensación."
              },
              {
                "t": "Menor estabilidad longitudinal",
                "fb": "Un CG adelantado exige más fuerza hacia abajo en la cola: el ala sostiene más carga, sube la velocidad de pérdida y la resistencia por compensación."
              }
            ]
          },
          {
            "q": "¿Por qué un CG más atrás del límite trasero es especialmente peligroso?",
            "opciones": [
              {
                "t": "Porque aumenta la velocidad de pérdida",
                "fb": "Con poco brazo de momento de la cola y baja estabilidad, bajar la nariz puede no ser posible."
              },
              {
                "t": "Porque puede faltar autoridad del elevador para reducir el ángulo de ataque y recuperar una pérdida",
                "ok": true,
                "fb": "Con poco brazo de momento de la cola y baja estabilidad, bajar la nariz puede no ser posible."
              },
              {
                "t": "Porque aumenta la resistencia inducida",
                "fb": "Con poco brazo de momento de la cola y baja estabilidad, bajar la nariz puede no ser posible."
              },
              {
                "t": "Porque impide extender los flaps",
                "fb": "Con poco brazo de momento de la cola y baja estabilidad, bajar la nariz puede no ser posible."
              }
            ]
          },
          {
            "q": "En un perfil convencional, al aumentar el ángulo de ataque, el centro de presión:",
            "opciones": [
              {
                "t": "Se desplaza hacia atrás",
                "fb": "Según el PHAK de la FAA, el centro de presión avanza al aumentar el ángulo de ataque y retrocede al reducirlo."
              },
              {
                "t": "Coincide con el CG",
                "fb": "Según el PHAK de la FAA, el centro de presión avanza al aumentar el ángulo de ataque y retrocede al reducirlo."
              },
              {
                "t": "Se desplaza hacia adelante",
                "ok": true,
                "fb": "Según el PHAK de la FAA, el centro de presión avanza al aumentar el ángulo de ataque y retrocede al reducirlo."
              },
              {
                "t": "Permanece fijo",
                "fb": "Según el PHAK de la FAA, el centro de presión avanza al aumentar el ángulo de ataque y retrocede al reducirlo."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "n": 9,
    "title": "Fenómenos aerodinámicos operacionales",
    "kicker": "Lo que se ve en vuelo",
    "minutes": 10,
    "blocks": [
      {
        "kind": "p",
        "text": "**Objetivo:** reconocer cada fenómeno y explicar su efecto básico."
      },
      {
        "kind": "table",
        "head": [
          "Fenómeno",
          "Qué es",
          "Efecto en vuelo"
        ],
        "rows": [
          [
            "**Efecto suelo (Ground Effect)**",
            "Cerca del suelo (dentro de aproximadamente una envergadura) se restringen el upwash, el downwash y los vórtices de punta",
            "Menos resistencia inducida: el ala necesita menos ángulo de ataque para el mismo CL"
          ],
          [
            "**Guiñada adversa (Adverse Yaw)**",
            "Al alabear, el ala que sube genera más sustentación y más resistencia inducida",
            "La nariz guiña hacia el lado contrario al viraje; se corrige con timón coordinado, alerones diferenciales o spoilers de alabeo"
          ],
          [
            "**Factor P (P-Factor)**",
            "Con alto ángulo de ataque, la pala descendente de la hélice tiene mayor ángulo de ataque y más empuje que la ascendente",
            "En hélices que giran a la derecha (vista desde la cabina), guiñada a la izquierda con alta potencia y alto ángulo de ataque"
          ],
          [
            "**Torque**",
            "Reacción del par del motor y la hélice (tercera ley de Newton)",
            "Tendencia a alabear en sentido opuesto al giro de la hélice"
          ],
          [
            "**Estela en espiral (Spiraling Slipstream)**",
            "La hélice imprime rotación a la estela, que golpea un lado del estabilizador vertical",
            "Guiñada con alta potencia y baja velocidad (despegue)"
          ],
          [
            "**Dutch Roll**",
            "Oscilación acoplada de alabeo y guiñada, cuando el efecto diedro domina sobre la estabilidad direccional",
            "La nariz oscila de lado a lado mientras las alas alabean de forma alternada; típica de alas en flecha; la amortigua el Yaw Damper"
          ],
          [
            "**Estabilidad espiral (Spiral Stability)**",
            "Depende de la relación entre estabilidad direccional y efecto diedro; hay inestabilidad espiral cuando la direccional es muy fuerte frente al efecto diedro",
            "Si es negativa, el alabeo aumenta lentamente y la nariz baja en espiral; se corrige con facilidad si se detecta a tiempo"
          ],
          [
            "**Efecto diedro (Dihedral Effect)**",
            "Tendencia a nivelar alas cuando hay derrape; la producen el diedro, la flecha y el ala alta",
            "Estabilidad lateral; demasiado efecto diedro favorece el Dutch Roll"
          ]
        ]
      },
      {
        "kind": "sub",
        "text": "Efecto suelo, con números"
      },
      {
        "kind": "p",
        "text": "Reducción de la resistencia inducida según el PHAK de la FAA:"
      },
      {
        "kind": "table",
        "head": [
          "Altura del ala sobre el suelo",
          "Reducción de resistencia inducida"
        ],
        "rows": [
          [
            "Una envergadura",
            "≈ 1,4 %"
          ],
          [
            "Un cuarto de envergadura",
            "≈ 23,5 %"
          ],
          [
            "Un décimo de envergadura",
            "≈ 47,6 %"
          ]
        ]
      },
      {
        "kind": "enLaOperacion",
        "momento": "Aplicación operacional",
        "texto": "",
        "pasos": [
          "**Aterrizaje:** con exceso de velocidad en el flare, el avión \"flota\" y consume pista.",
          "**Despegue:** el avión puede despegar por debajo de la velocidad recomendada y no sostenerse al salir del efecto suelo. Al salir, necesita más ángulo de ataque para el mismo CL y aumenta la resistencia inducida.",
          "**Instrumentos:** en efecto suelo aumenta la presión local en la toma estática; el anemómetro y el altímetro pueden indicar menos."
        ]
      },
      {
        "kind": "sub",
        "text": "Dutch Roll y estabilidad espiral"
      },
      {
        "kind": "p",
        "text": "Los diseñadores eligen un compromiso: una estabilidad direccional fuerte con efecto diedro débil favorece la inestabilidad espiral; un efecto diedro fuerte con estabilidad direccional débil favorece el Dutch Roll. La FAA indica que la mayoría de los aviones se diseñan con una leve inestabilidad espiral, porque es preferible al Dutch Roll. En jets con ala en flecha, el Yaw Damper corrige el Dutch Roll; si está inoperativo, aplica las limitaciones y el procedimiento del fabricante."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Debes recordar",
        "text": "Efecto suelo = menos resistencia inducida, no un \"colchón de aire\". Dutch Roll = efecto diedro mayor que la estabilidad direccional."
      },
      {
        "kind": "ponAPrueba",
        "titulo": "Quiz · Sección 9",
        "preguntas": [
          {
            "q": "El efecto suelo reduce principalmente:",
            "opciones": [
              {
                "t": "El peso aparente del avión",
                "fb": "La proximidad al suelo restringe el downwash y los vórtices de punta; la resistencia parásita no cambia."
              },
              {
                "t": "La resistencia de onda",
                "fb": "La proximidad al suelo restringe el downwash y los vórtices de punta; la resistencia parásita no cambia."
              },
              {
                "t": "La resistencia parásita",
                "fb": "La proximidad al suelo restringe el downwash y los vórtices de punta; la resistencia parásita no cambia."
              },
              {
                "t": "La resistencia inducida",
                "ok": true,
                "fb": "La proximidad al suelo restringe el downwash y los vórtices de punta; la resistencia parásita no cambia."
              }
            ]
          },
          {
            "q": "La guiñada adversa se produce porque:",
            "opciones": [
              {
                "t": "El ala que sube genera más sustentación y más resistencia inducida",
                "ok": true,
                "fb": "El alerón que baja aumenta la sustentación y la resistencia inducida del ala que sube; la nariz guiña hacia ese lado, contrario al viraje."
              },
              {
                "t": "El timón se deflecta en sentido contrario",
                "fb": "El alerón que baja aumenta la sustentación y la resistencia inducida del ala que sube; la nariz guiña hacia ese lado, contrario al viraje."
              },
              {
                "t": "El ala que baja genera más resistencia inducida",
                "fb": "El alerón que baja aumenta la sustentación y la resistencia inducida del ala que sube; la nariz guiña hacia ese lado, contrario al viraje."
              },
              {
                "t": "La hélice produce factor P",
                "fb": "El alerón que baja aumenta la sustentación y la resistencia inducida del ala que sube; la nariz guiña hacia ese lado, contrario al viraje."
              }
            ]
          },
          {
            "q": "El Dutch Roll aparece cuando:",
            "opciones": [
              {
                "t": "El avión vuela en efecto suelo",
                "fb": "Con efecto diedro fuerte y estabilidad direccional relativamente débil, alabeo y guiñada se acoplan en una oscilación."
              },
              {
                "t": "El efecto diedro domina sobre la estabilidad direccional",
                "ok": true,
                "fb": "Con efecto diedro fuerte y estabilidad direccional relativamente débil, alabeo y guiñada se acoplan en una oscilación."
              },
              {
                "t": "El CG está demasiado adelantado",
                "fb": "Con efecto diedro fuerte y estabilidad direccional relativamente débil, alabeo y guiñada se acoplan en una oscilación."
              },
              {
                "t": "La estabilidad direccional es mucho mayor que el efecto diedro",
                "fb": "Con efecto diedro fuerte y estabilidad direccional relativamente débil, alabeo y guiñada se acoplan en una oscilación."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "n": 10,
    "title": "Aerodinámica de alta velocidad y Mach",
    "kicker": "Compresibilidad y ondas de choque",
    "minutes": 15,
    "blocks": [
      {
        "kind": "p",
        "text": "**Objetivo:** explicar qué ocurre cuando un jet se acerca a velocidades transónicas y por qué usa ala en flecha."
      },
      {
        "kind": "sub",
        "text": "Número de Mach"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Número de Mach (Mach Number):** relación entre la velocidad verdadera (TAS) y la velocidad del sonido en el aire que rodea al avión. Mach 0,80 = 80 % de la velocidad del sonido local.",
          "Como la velocidad del sonido depende solo de la temperatura y la temperatura baja con la altitud, **a igual TAS el Mach aumenta al subir**."
        ]
      },
      {
        "kind": "table",
        "head": [
          "Régimen (referencia del PHAK)",
          "Mach"
        ],
        "rows": [
          [
            "Subsónico",
            "Menor de 0,75"
          ],
          [
            "Transónico",
            "0,75 a 1,20"
          ],
          [
            "Supersónico",
            "1,20 a 5,00"
          ],
          [
            "Hipersónico",
            "Mayor de 5,00"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "Los aviones civiles de transporte cruzan normalmente entre Mach 0,70 y 0,90. En la zona transónica conviven, sobre el mismo avión, zonas de flujo subsónico y supersónico."
      },
      {
        "kind": "sub",
        "text": "Mach crítico y compresibilidad"
      },
      {
        "kind": "vinetas",
        "items": [
          "El ala acelera el aire sobre el extradós: la velocidad local es mayor que la del avión.",
          "**Mach crítico (Critical Mach Number – MCRIT):** Mach de vuelo al que el flujo, en algún punto del avión, alcanza por primera vez Mach 1,0. Marca el límite entre vuelo subsónico y transónico.",
          "**Compresibilidad (Compressibility):** a medida que la velocidad aumenta, el aire deja de comportarse como incompresible: su densidad cambia de forma apreciable al rodear el avión. Por encima del Mach crítico sus efectos aparecen como ondas de choque, aumento de resistencia, buffet y cambios de compensación.",
          "**Mach de divergencia de resistencia (Drag Divergence Mach):** Mach al que la resistencia sube bruscamente. Según el PHAK, suele estar entre 5 % y 10 % por encima del Mach crítico."
        ]
      },
      {
        "kind": "sub",
        "text": "Ondas de choque, resistencia de onda y buffet"
      },
      {
        "kind": "list",
        "items": [
          "Por encima del Mach crítico se forma una zona supersónica sobre el extradós. Donde el flujo vuelve a subsónico aparece una **onda de choque normal (Shock Wave)**: la presión y la densidad suben de golpe y el flujo pierde energía.",
          "Al aumentar la velocidad, la onda se hace más intensa y se desplaza hacia el borde de salida. También puede formarse en el intradós.",
          "Detrás de la onda, la capa límite puede separarse: **separación inducida por onda de choque**.",
          "**Resistencia de onda (Wave Drag):** resistencia producida por las ondas de choque y la separación asociada.",
          "**Buffet:** vibración estructural causada por flujo separado que golpea el ala o la cola.",
          "**Mach Buffet (High-Speed Buffet):** buffet causado por la separación detrás de la onda de choque cuando el avión vuela demasiado rápido, o con demasiado ángulo de ataque cerca de MMO."
        ]
      },
      {
        "kind": "hueco",
        "rotulo": "IMG-09 · ONDA DE CHOQUE Y ALA EN FLECHA",
        "descripcion": "(1) Perfil con zona supersónica sobre el extradós, onda de choque normal y separación detrás. (2) Ala en flecha: descomposición de la velocidad en componente perpendicular al borde de ataque y componente a lo largo de la envergadura.",
        "alto": 320,
        "ratio": "16 / 9"
      },
      {
        "kind": "sub",
        "text": "Qué ocurre al acercarse a velocidades transónicas"
      },
      {
        "kind": "enLaOperacion",
        "momento": "Aplicación operacional",
        "texto": ""
      },
      {
        "kind": "table",
        "head": [
          "Fenómeno",
          "Qué siente o ve el piloto"
        ],
        "rows": [
          [
            "Aumento brusco de resistencia",
            "Se necesita mucho más empuje para ganar poca velocidad"
          ],
          [
            "Mach Buffet",
            "Vibración"
          ],
          [
            "**Mach Tuck**",
            "El centro de presión se desplaza hacia atrás con la onda de choque: tendencia de nariz abajo, que aumenta más la velocidad. El **Mach Trim** la compensa automáticamente; si está inoperativo, el fabricante impone un MMO reducido"
          ],
          [
            "Menor efectividad de mandos",
            "Respuesta reducida; posibles vibraciones de superficies (Aileron Buzz)"
          ],
          [
            "Cambios de estabilidad y compensación",
            "El avión requiere más atención en cabeceo"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "**VMO / MMO:** velocidad máxima operativa. **VMO** en nudos (CAS) domina a baja altitud (cargas estructurales y presión dinámica); **MMO** en Mach domina a gran altitud (compresibilidad y buffet). Ejemplo del PHAK: en los primeros jets civiles, VMO de 306 KCAS equivalía a MMO 0,82 cerca de FL310; a FL380, Mach 0,82 equivale a unos 261 KCAS."
      },
      {
        "kind": "sub",
        "text": "Ala en flecha (Swept Wing)"
      },
      {
        "kind": "p",
        "text": "Solo la componente del flujo **perpendicular al borde de ataque** determina la distribución de presión y la formación de ondas de choque. Al inclinar el ala hacia atrás, esa componente es menor que la velocidad del avión."
      },
      {
        "kind": "p",
        "text": "**Ventajas**"
      },
      {
        "kind": "vinetas",
        "items": [
          "Aumenta el Mach crítico y el Mach de divergencia.",
          "Retrasa y suaviza la aparición de los efectos de compresibilidad.",
          "Permite cruzar a Mach más alto con menos resistencia de onda."
        ]
      },
      {
        "kind": "p",
        "text": "**Desventajas**"
      },
      {
        "kind": "vinetas",
        "items": [
          "Tendencia a la pérdida en las puntas primero. Como las puntas están detrás, la sustentación se desplaza hacia adelante y la nariz sube (Pitch-Up).",
          "Menor efectividad para generar sustentación a baja velocidad: velocidades de aproximación más altas y necesidad de flaps y slats potentes.",
          "La flecha aumenta el efecto diedro: favorece el Dutch Roll (Yaw Damper)."
        ]
      },
      {
        "kind": "p",
        "text": "**Por qué los aviones de transporte la usan:** porque cruzan cerca de Mach 0,8 y necesitan retrasar la divergencia de resistencia para cruzar rápido y con buen consumo. Las desventajas a baja velocidad se compensan con dispositivos hipersustentadores."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Debes recordar",
        "text": "Mach crítico: primer punto del avión con flujo local a Mach 1. Por encima aparecen ondas de choque, resistencia de onda y buffet. La flecha sube el Mach crítico porque el ala \"ve\" solo la componente del flujo perpendicular a su borde de ataque."
      },
      {
        "kind": "ponAPrueba",
        "titulo": "Quiz · Sección 10",
        "preguntas": [
          {
            "q": "El Mach crítico es:",
            "opciones": [
              {
                "t": "El Mach al que el avión alcanza la velocidad del sonido",
                "fb": "El flujo se acelera sobre el ala: localmente llega a Mach 1 aunque el avión vuele por debajo. La subida brusca de resistencia es el Mach de divergencia."
              },
              {
                "t": "El MMO certificado del avión",
                "fb": "El flujo se acelera sobre el ala: localmente llega a Mach 1 aunque el avión vuele por debajo. La subida brusca de resistencia es el Mach de divergencia."
              },
              {
                "t": "El Mach de vuelo al que el flujo local, en algún punto del avión, alcanza Mach 1 por primera vez",
                "ok": true,
                "fb": "El flujo se acelera sobre el ala: localmente llega a Mach 1 aunque el avión vuele por debajo. La subida brusca de resistencia es el Mach de divergencia."
              },
              {
                "t": "El Mach al que la resistencia sube bruscamente",
                "fb": "El flujo se acelera sobre el ala: localmente llega a Mach 1 aunque el avión vuele por debajo. La subida brusca de resistencia es el Mach de divergencia."
              }
            ]
          },
          {
            "q": "A TAS constante, si el avión asciende hacia la tropopausa, el número de Mach:",
            "opciones": [
              {
                "t": "Disminuye",
                "fb": "La velocidad del sonido depende de la temperatura; más frío, menor velocidad del sonido y mayor Mach para la misma TAS."
              },
              {
                "t": "Aumenta, porque aumenta la densidad",
                "fb": "La velocidad del sonido depende de la temperatura; más frío, menor velocidad del sonido y mayor Mach para la misma TAS."
              },
              {
                "t": "No cambia",
                "fb": "La velocidad del sonido depende de la temperatura; más frío, menor velocidad del sonido y mayor Mach para la misma TAS."
              },
              {
                "t": "Aumenta, porque baja la temperatura y con ella la velocidad del sonido",
                "ok": true,
                "fb": "La velocidad del sonido depende de la temperatura; más frío, menor velocidad del sonido y mayor Mach para la misma TAS."
              }
            ]
          },
          {
            "q": "El Mach Tuck se produce porque:",
            "opciones": [
              {
                "t": "La onda de choque se desplaza hacia atrás y con ella el centro de presión, generando nariz abajo",
                "ok": true,
                "fb": "Con la onda de choque y la separación, el centro de presión retrocede y aparece un momento de nariz abajo. Lo compensa el Mach Trim."
              },
              {
                "t": "El timón pierde efectividad",
                "fb": "Con la onda de choque y la separación, el centro de presión retrocede y aparece un momento de nariz abajo. Lo compensa el Mach Trim."
              },
              {
                "t": "El CG se desplaza hacia atrás por consumo de combustible",
                "fb": "Con la onda de choque y la separación, el centro de presión retrocede y aparece un momento de nariz abajo. Lo compensa el Mach Trim."
              },
              {
                "t": "Los slats se extienden automáticamente",
                "fb": "Con la onda de choque y la separación, el centro de presión retrocede y aparece un momento de nariz abajo. Lo compensa el Mach Trim."
              }
            ]
          },
          {
            "q": "¿Cuál es una desventaja del ala en flecha?",
            "opciones": [
              {
                "t": "Menor efecto diedro",
                "fb": "El flujo de la capa límite tiende hacia las puntas; la pérdida en punta desplaza la sustentación hacia adelante y la nariz sube."
              },
              {
                "t": "Tendencia a entrar en pérdida primero en las puntas, con cabeceo hacia arriba",
                "ok": true,
                "fb": "El flujo de la capa límite tiende hacia las puntas; la pérdida en punta desplaza la sustentación hacia adelante y la nariz sube."
              },
              {
                "t": "Mayor resistencia de onda en crucero",
                "fb": "El flujo de la capa límite tiende hacia las puntas; la pérdida en punta desplaza la sustentación hacia adelante y la nariz sube."
              },
              {
                "t": "Menor Mach crítico",
                "fb": "El flujo de la capa límite tiende hacia las puntas; la pérdida en punta desplaza la sustentación hacia adelante y la nariz sube."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "n": 11,
    "title": "Aerodinámica a gran altitud y Coffin Corner",
    "kicker": "El margen que se estrecha",
    "minutes": 15,
    "blocks": [
      {
        "kind": "p",
        "text": "**Objetivo:** explicar Coffin Corner con sus causas físicas y sus consecuencias operacionales."
      },
      {
        "kind": "sub",
        "text": "Los dos límites aerodinámicos"
      },
      {
        "kind": "table",
        "head": [
          "Límite",
          "Qué es",
          "Qué lo produce"
        ],
        "rows": [
          [
            "**Low-Speed Buffet (buffet de baja velocidad)**",
            "Vibración previa a la pérdida por alto ángulo de ataque. A gran altitud el PHAK lo llama \"buffet de Mach de baja velocidad\": el alto ángulo de ataque acelera el flujo sobre el extradós hasta formar ondas de choque",
            "Volar demasiado lento para el peso y la altitud"
          ],
          [
            "**High-Speed Buffet / Mach Buffet**",
            "Vibración por separación detrás de la onda de choque",
            "Volar demasiado rápido, cerca o por encima de MMO"
          ],
          [
            "**Ángulo de ataque crítico**",
            "Límite de la pérdida",
            "A Mach alto el ángulo de ataque de pérdida y el CLmax **disminuyen**"
          ]
        ]
      },
      {
        "kind": "sub",
        "text": "Coffin Corner"
      },
      {
        "kind": "p",
        "text": "**Coffin Corner** es la zona de gran altitud en la que el margen entre el límite de baja velocidad (low-speed buffet / pérdida) y el límite de alta velocidad (MMO / Mach buffet) se reduce al mínimo. La circular AC 61-107B de la FAA la describe como la operación a gran altitud donde velocidades indicadas bajas corresponden a TAS altas (Mach alto) con ángulos de ataque altos."
      },
      {
        "kind": "interactivo",
        "nombre": "aero-margen-velocidad"
      },
      {
        "kind": "hueco",
        "rotulo": "IMG-10 · COFFIN CORNER / HIGH ALTITUDE SPEED MARGIN",
        "descripcion": "Envolvente altitud vs velocidad (Mach). La línea de low-speed buffet sube hacia la derecha y la de high-speed buffet/MMO se mantiene o baja; ambas convergen en el techo aerodinámico. Una tercera curva punteada muestra el efecto de 1,3 G: estrecha aún más el margen.",
        "alto": 320,
        "ratio": "16 / 9"
      },
      {
        "kind": "sub",
        "text": "Por qué disminuye el margen a gran altitud"
      },
      {
        "kind": "list",
        "items": [
          "**El límite de baja velocidad sube en Mach.** A igual CAS, al subir aumenta la TAS y baja la velocidad del sonido. Ejemplo del PHAK: un transporte de 550.000 lb en configuración limpia entra en pérdida cerca de 152 KCAS; a nivel del mar eso es Mach 0,23 y a FL380 es Mach 0,50.",
          "**Además, a Mach alto el ala entra en pérdida antes.** El ángulo de ataque de pérdida y el CLmax disminuyen con el Mach (AUPRTA, Airbus). Por eso la IAS del buffet de baja velocidad a gran altitud es mayor que la velocidad de pérdida a baja altitud.",
          "**El límite de alta velocidad no crece.** MMO es un Mach fijo; a gran altitud equivale a una IAS cada vez menor. Y como el aire es menos denso, el ala vuela con más ángulo de ataque, lo que acelera el flujo sobre el extradós y adelanta el Mach buffet.",
          "**Resultado:** las dos líneas convergen. En el límite, desacelerar produce buffet de baja velocidad y acelerar produce Mach buffet."
        ],
        "ordered": true
      },
      {
        "kind": "sub",
        "text": "Peso, factor de carga y temperatura"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Más peso o más G (viraje, turbulencia, tirón)** aumentan la velocidad del buffet de baja velocidad y reducen la del Mach buffet (PHAK; AC 61-107A, cancelada). El margen se estrecha.",
          "**Margen de maniobra:** la EASA (AMC 25.251(e)) y los fabricantes usan como referencia poder alcanzar **1,3 G** (un incremento de 0,3 G) sin llegar al buffet. 1,3 G equivale a un viraje nivelado de unos 40° de alabeo.",
          "**Altitud máxima (AUPRTA):** es la menor entre la altitud máxima certificada, la limitada por empuje y la limitada por buffet (margen de maniobra). Cuando la temperatura aumenta, los motores entregan menos empuje y la altitud limitada por empuje baja de forma significativa; la limitada por buffet depende del Mach, el peso, el G y la altitud de presión, no de la temperatura."
        ]
      },
      {
        "kind": "sub",
        "text": "Q-Corner"
      },
      {
        "kind": "p",
        "text": "La AC 61-107B de la FAA usa el término **\"Q-Corner or Coffin Corner\"**: son sinónimos. No lo confundas con la **altitud de cruce (Crossover Altitude)**, que es la altitud a la que una CAS dada y un Mach dado representan la misma velocidad; ahí el límite pasa de VMO a MMO (Sección 10). Algunas fuentes secundarias atribuyen la \"Q\" a la presión dinámica (q), pero no hay una fuente primaria que lo confirme: en una entrevista, basta con decir que es otro nombre del Coffin Corner."
      },
      {
        "kind": "sub",
        "text": "Operar cerca del techo máximo"
      },
      {
        "kind": "enLaOperacion",
        "momento": "Aplicación operacional",
        "texto": "",
        "pasos": [
          "**Menos margen de alabeo:** en el techo de buffet los márgenes están en el mínimo; la capacidad de viraje es reducida.",
          "**Poco empuje sobrante:** acelerar o recuperar velocidad es lento; en ocasiones la única forma de recuperar energía es descender.",
          "**Turbulencia:** una ráfaga aumenta el ángulo de ataque y el factor de carga; puede llevar al buffet de baja o de alta velocidad.",
          "**Vuelo manual a gran altitud:** entradas pequeñas y suaves; el avión responde distinto que a baja altitud (Airbus, Safety First).",
          "**Pérdida a gran altitud:** reducir el ángulo de ataque es la prioridad y la recuperación puede requerir varios miles de pies (AC 120-109A, AFH).",
          "**Planificación:** respetar la altitud máxima que calcula el FMS/AFM para el peso y la temperatura del día, y considerar turbulencia pronosticada antes de subir."
        ]
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Debes recordar",
        "text": "Coffin Corner representa una reducción del margen entre los límites aerodinámicos de baja y alta velocidad a gran altitud. Más peso y más G lo reducen aún más."
      },
      {
        "kind": "sub",
        "text": "Preguntas que debes poder responder"
      },
      {
        "kind": "detalleTecnico",
        "etiqueta": "¿Qué es Coffin Corner?",
        "bloques": [
          {
            "kind": "p",
            "text": "Es la región de gran altitud donde el buffet de baja velocidad y el límite de alta velocidad (MMO / Mach buffet) se acercan tanto que el margen de velocidad operacional es mínimo. La FAA también la llama Q-Corner."
          }
        ]
      },
      {
        "kind": "detalleTecnico",
        "etiqueta": "¿Por qué disminuye el margen de velocidad a gran altitud?",
        "bloques": [
          {
            "kind": "p",
            "text": "Porque el límite de baja velocidad, expresado en Mach, sube con la altitud (misma CAS = más TAS y menor velocidad del sonido) y además el Mach alto reduce el ángulo de ataque de pérdida. Al mismo tiempo el límite de alta velocidad es un Mach fijo o incluso menor, porque el ala necesita más ángulo de ataque en aire menos denso. Las dos líneas convergen."
          }
        ]
      },
      {
        "kind": "detalleTecnico",
        "etiqueta": "¿Qué relación existe entre Mach y buffet?",
        "bloques": [
          {
            "kind": "p",
            "text": "El buffet de alta velocidad aparece cuando la onda de choque sobre el extradós produce separación del flujo. A gran altitud, incluso a baja velocidad indicada, el alto ángulo de ataque acelera el flujo local y puede formar ondas de choque: por eso también existe un buffet de Mach de baja velocidad. Y el Mach alto reduce el ángulo de ataque al que el ala entra en pérdida."
          }
        ]
      },
      {
        "kind": "ponAPrueba",
        "titulo": "Quiz · Sección 11",
        "preguntas": [
          {
            "q": "Coffin Corner describe:",
            "opciones": [
              {
                "t": "La altitud máxima certificada",
                "fb": "La igualdad VMO/MMO es la altitud de cruce. Coffin Corner es la convergencia de los límites de baja y alta velocidad."
              },
              {
                "t": "El punto donde el avión alcanza su Mach crítico en el ascenso",
                "fb": "La igualdad VMO/MMO es la altitud de cruce. Coffin Corner es la convergencia de los límites de baja y alta velocidad."
              },
              {
                "t": "La reducción del margen entre el buffet de baja velocidad y el límite de alta velocidad a gran altitud",
                "ok": true,
                "fb": "La igualdad VMO/MMO es la altitud de cruce. Coffin Corner es la convergencia de los límites de baja y alta velocidad."
              },
              {
                "t": "La altitud donde VMO y MMO son iguales",
                "fb": "La igualdad VMO/MMO es la altitud de cruce. Coffin Corner es la convergencia de los límites de baja y alta velocidad."
              }
            ]
          },
          {
            "q": "Cerca del techo máximo, un viraje de 40° de alabeo:",
            "opciones": [
              {
                "t": "Aumenta el MMO",
                "fb": "n = 1/cos 40° ≈ 1,31. Más G tiene el mismo efecto que más peso: estrecha el margen desde ambos lados."
              },
              {
                "t": "Reduce la velocidad de pérdida",
                "fb": "n = 1/cos 40° ≈ 1,31. Más G tiene el mismo efecto que más peso: estrecha el margen desde ambos lados."
              },
              {
                "t": "No cambia los márgenes de buffet",
                "fb": "n = 1/cos 40° ≈ 1,31. Más G tiene el mismo efecto que más peso: estrecha el margen desde ambos lados."
              },
              {
                "t": "Aumenta el factor de carga a cerca de 1,3 G, sube el buffet de baja velocidad y baja el de alta",
                "ok": true,
                "fb": "n = 1/cos 40° ≈ 1,31. Más G tiene el mismo efecto que más peso: estrecha el margen desde ambos lados."
              }
            ]
          },
          {
            "q": "¿Por qué la IAS del buffet de baja velocidad a gran altitud es mayor que la velocidad de pérdida a baja altitud?",
            "opciones": [
              {
                "t": "Porque a Mach alto disminuyen el ángulo de ataque de pérdida y el CLmax",
                "ok": true,
                "fb": "Los efectos de compresibilidad reducen el CLmax y el ángulo de pérdida; el ala necesita más presión dinámica para sostener el mismo peso."
              },
              {
                "t": "Porque el anemómetro no funciona en aire frío",
                "fb": "Los efectos de compresibilidad reducen el CLmax y el ángulo de pérdida; el ala necesita más presión dinámica para sostener el mismo peso."
              },
              {
                "t": "Porque la densidad aumenta",
                "fb": "Los efectos de compresibilidad reducen el CLmax y el ángulo de pérdida; el ala necesita más presión dinámica para sostener el mismo peso."
              },
              {
                "t": "Porque el CG se desplaza hacia adelante",
                "fb": "Los efectos de compresibilidad reducen el CLmax y el ángulo de pérdida; el ala necesita más presión dinámica para sostener el mismo peso."
              }
            ]
          },
          {
            "q": "\"Q-Corner\", según la AC 61-107B de la FAA, es:",
            "opciones": [
              {
                "t": "La velocidad de presión dinámica máxima",
                "fb": "La AC 61-107B lo define como \"Q-Corner or Coffin Corner\"."
              },
              {
                "t": "Otro nombre de Coffin Corner",
                "ok": true,
                "fb": "La AC 61-107B lo define como \"Q-Corner or Coffin Corner\"."
              },
              {
                "t": "La altitud de cruce entre VMO y MMO",
                "fb": "La AC 61-107B lo define como \"Q-Corner or Coffin Corner\"."
              },
              {
                "t": "El límite de carga estructural en turbulencia",
                "fb": "La AC 61-107B lo define como \"Q-Corner or Coffin Corner\"."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "n": 12,
    "title": "Densidad, altitud y performance",
    "kicker": "High, hot y heavy",
    "minutes": 12,
    "blocks": [
      {
        "kind": "p",
        "text": "**Objetivo:** relacionar la atmósfera real con el desempeño en despegue, ascenso y aterrizaje."
      },
      {
        "kind": "sub",
        "text": "Altitudes"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Atmósfera estándar (ISA):** a nivel del mar 15 °C y 1013,25 hPa (29,92 inHg); la temperatura disminuye cerca de 2 °C por cada 1.000 ft hasta la tropopausa.",
          "**Altitud de presión (Pressure Altitude):** la que indica el altímetro con 1013,25 hPa / 29,92 inHg. Es la base de los niveles de vuelo y de las tablas de performance.",
          "**Altitud de densidad (Density Altitude):** altitud de presión corregida por la temperatura no estándar. Es la altitud de la atmósfera estándar que tiene la densidad real del aire. El avión \"rinde\" según la altitud de densidad.",
          "La **humedad** también reduce la densidad: el aire húmedo es menos denso que el seco."
        ]
      },
      {
        "kind": "sub",
        "text": "HIGH + HOT + HEAVY"
      },
      {
        "kind": "code",
        "text": "ALTO (elevación)  +  CALIENTE (temperatura)  +  PESADO (peso)   [+ HÚMEDO]\n            ↓                     ↓                     ↓\n   MENOS DENSIDAD      MENOS DENSIDAD      MÁS SUSTENTACIÓN REQUERIDA\n            ↓\n   MENOS SUSTENTACIÓN, EMPUJE Y POTENCIA A UNA MISMA TAS\n            ↓\n   MÁS TAS Y MÁS GS PARA LA MISMA IAS  →  MÁS DISTANCIA",
        "grande": true,
        "tabular": true
      },
      {
        "kind": "table",
        "head": [
          "Efecto sobre",
          "Alta altitud de densidad",
          "Mayor peso"
        ],
        "rows": [
          [
            "**Distancia de despegue**",
            "Aumenta: la misma IAS de rotación es una TAS y GS mayores, y hay menos empuje",
            "Aumenta. Según el PHAK, +10 % de peso produce ≈ +5 % en velocidad de despegue y al menos +21 % en distancia de despegue"
          ],
          [
            "**Ascenso (gradiente y Rate of Climb)**",
            "Disminuyen: menos exceso de empuje/potencia",
            "Disminuyen"
          ],
          [
            "**Performance del motor**",
            "Menos masa de aire: menos empuje o potencia",
            "—"
          ],
          [
            "**Aterrizaje (Landing Performance)**",
            "Aumenta la distancia: mayor TAS y GS al tocar para la misma IAS",
            "Aumenta: mayor velocidad de aproximación y más energía que disipar"
          ],
          [
            "**Velocidad de pérdida en IAS**",
            "Prácticamente igual a bajo Mach",
            "Aumenta"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "**Viento:** el viento de frente reduce la distancia sobre el terreno y el de cola la aumenta. Para certificación de transporte, los datos de despegue consideran no más del 50 % del viento de frente reportado y no menos del 150 % del viento de cola (14 CFR 25.105(d))."
      },
      {
        "kind": "p",
        "text": "**Configuración:** más flaps acortan la carrera de despegue y aterrizaje, pero reducen el gradiente de ascenso por la mayor resistencia. La selección de flaps en despegue es un compromiso entre pista y obstáculos."
      },
      {
        "kind": "sub",
        "text": "IAS, CAS, EAS, TAS y GS"
      },
      {
        "kind": "table",
        "head": [
          "Velocidad",
          "Definición",
          "Para qué importa"
        ],
        "rows": [
          [
            "**IAS (Indicated Airspeed)**",
            "La que muestra el anemómetro, sin corregir errores",
            "Referencia aerodinámica: pérdida, rotación, límites de flaps"
          ],
          [
            "**CAS (Calibrated Airspeed)**",
            "IAS corregida por error de instrumento y de posición",
            "Base de VMO y de los datos de performance"
          ],
          [
            "**EAS (Equivalent Airspeed)**",
            "CAS corregida por compresibilidad a esa altitud",
            "Presión dinámica real; relevante a alta velocidad y gran altitud"
          ],
          [
            "**TAS (True Airspeed)**",
            "Velocidad real respecto a la masa de aire",
            "Navegación, Mach, planeación"
          ],
          [
            "**GS (Ground Speed)**",
            "TAS corregida por viento",
            "Tiempo en ruta, combustible, distancia de despegue y aterrizaje sobre la pista"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "**Regla práctica (PHAK):** la TAS es aproximadamente la CAS + 2 % por cada 1.000 ft de altitud. Es una estimación."
      },
      {
        "kind": "enLaOperacion",
        "momento": "Aplicación operacional",
        "texto": "",
        "pasos": [
          "A 250 KIAS en FL100 (atmósfera estándar) la TAS es de unos 290 kt; la regla del 2 % da ≈ 300 kt: la IAS define cómo vuela el ala; la TAS y la GS, cuánto terreno recorre.",
          "En un aeródromo alto y caliente la IAS de rotación es prácticamente la misma que en uno a nivel del mar para el mismo peso y configuración (las tablas del tipo pueden aplicar pequeños ajustes por altitud de presión y temperatura), pero la TAS y la GS son mayores: más pista, más energía en un despegue abortado y más carga para los neumáticos y frenos."
        ]
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Debes recordar",
        "text": "El ala vuela con IAS; el avión recorre terreno con GS. High, hot y heavy aumentan la TAS y la GS necesarias y reducen el empuje y el ascenso."
      },
      {
        "kind": "ponAPrueba",
        "titulo": "Quiz · Sección 12",
        "preguntas": [
          {
            "q": "La altitud de densidad es:",
            "opciones": [
              {
                "t": "La altitud indicada con QNH",
                "fb": "Es la altitud en atmósfera estándar que corresponde a la densidad real."
              },
              {
                "t": "La elevación del aeródromo",
                "fb": "Es la altitud en atmósfera estándar que corresponde a la densidad real."
              },
              {
                "t": "La altitud de presión corregida por temperatura no estándar",
                "ok": true,
                "fb": "Es la altitud en atmósfera estándar que corresponde a la densidad real."
              },
              {
                "t": "La altitud sobre el terreno",
                "fb": "Es la altitud en atmósfera estándar que corresponde a la densidad real."
              }
            ]
          },
          {
            "q": "Un avión despega a la misma IAS en un aeródromo alto y caliente que en uno a nivel del mar. En el alto y caliente:",
            "opciones": [
              {
                "t": "La TAS es menor y la carrera más corta",
                "fb": "Con menos densidad, la misma presión dinámica exige más TAS; además hay menos empuje."
              },
              {
                "t": "La velocidad de pérdida en IAS es mucho mayor",
                "fb": "Con menos densidad, la misma presión dinámica exige más TAS; además hay menos empuje."
              },
              {
                "t": "La GS es igual porque la IAS es igual",
                "fb": "Con menos densidad, la misma presión dinámica exige más TAS; además hay menos empuje."
              },
              {
                "t": "La TAS y la GS de rotación son mayores y la carrera es más larga",
                "ok": true,
                "fb": "Con menos densidad, la misma presión dinámica exige más TAS; además hay menos empuje."
              }
            ]
          },
          {
            "q": "Según el PHAK, un aumento de 10 % en el peso de despegue produce:",
            "opciones": [
              {
                "t": "≈ +5 % de velocidad de despegue y al menos +21 % de distancia",
                "ok": true,
                "fb": "La velocidad de despegue aumenta con la raíz del peso y la distancia crece bastante más que proporcionalmente."
              },
              {
                "t": "+10 % de distancia de despegue",
                "fb": "La velocidad de despegue aumenta con la raíz del peso y la distancia crece bastante más que proporcionalmente."
              },
              {
                "t": "Ningún cambio si la pista es larga",
                "fb": "La velocidad de despegue aumenta con la raíz del peso y la distancia crece bastante más que proporcionalmente."
              },
              {
                "t": "Menor velocidad de rotación",
                "fb": "La velocidad de despegue aumenta con la raíz del peso y la distancia crece bastante más que proporcionalmente."
              }
            ]
          },
          {
            "q": "¿Qué velocidad determina el tiempo en ruta y, para un consumo horario dado, el combustible del trayecto?",
            "opciones": [
              {
                "t": "IAS",
                "fb": "La GS es la velocidad sobre el terreno: define tiempo, combustible y distancia real recorrida."
              },
              {
                "t": "GS",
                "ok": true,
                "fb": "La GS es la velocidad sobre el terreno: define tiempo, combustible y distancia real recorrida."
              },
              {
                "t": "CAS",
                "fb": "La GS es la velocidad sobre el terreno: define tiempo, combustible y distancia real recorrida."
              },
              {
                "t": "TAS",
                "fb": "La GS es la velocidad sobre el terreno: define tiempo, combustible y distancia real recorrida."
              }
            ]
          }
        ]
      }
    ]
  }
]

/**
 * Las secciones que el documento marca como prioritarias: las que un
 * entrevistador técnico pregunta primero.
 */
export const AERO_PRIORITARIAS: number[] = [
  4,
  6,
  10,
  11
]

// La numeración es la que se guarda como progreso: si el documento se
// desordena, mejor caerse al arrancar que marcar leída la sección equivocada.
AERO_LECCIONES.forEach((s, i) => {
  if (s.n !== i + 1) throw new Error(`aerodinamicaLeccion: la sección ${s.n} está en la posición ${i + 1}`)
})

export const AERO_LECCION_TOTAL = AERO_LECCIONES.length
export const AERO_MINUTOS = AERO_LECCIONES.reduce((t, s) => t + s.minutes, 0)
