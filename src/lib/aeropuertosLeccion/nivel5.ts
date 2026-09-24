/**
 * Nivel 5 · Operar (lecciones 18 a 22).
 *
 * Es el nivel donde el módulo deja de describir el aeropuerto y empieza a
 * operarlo: dónde nace una incursión, qué manda cuando baja la visibilidad,
 * cómo se describe una pista contaminada, qué dos números deciden si puedes ir
 * y cómo se termina el vuelo, de la salida rápida al puesto. Va al final
 * porque cada lección usa las señales, las luces y los letreros que los cuatro
 * niveles anteriores enseñaron a reconocer.
 *
 * La norma es el Anexo 14, Volumen I, novena edición (2022) con la Enmienda 18,
 * aplicable desde el 27 de noviembre de 2025. Solo OACI: no hay comparaciones
 * con la FAA ni elementos que solo existan allá. Todos los puntos de espera de
 * estas cinco lecciones van en patrón A2 o B2, nunca A1 ni B1, y las dos líneas
 * continuas del patrón A van siempre del lado de espera.
 *
 * Ninguna lección lleva preguntas: las quince van en la entrevista del nivel,
 * que escribe otra sesión. El bloque «piensa como piloto» sí se queda dentro.
 *
 * Los huecos llevan su código (AP-LL-NN) porque es el que Camilo usa para
 * nombrar la imagen cuando la genera. La ficha completa de cada uno está en
 * docs/BRIEF_AEROPUERTOS.md.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const NIVEL_5: DocScreen[] = [
  // ── 18 ──────────────────────────────────────────────────────────────────
  {
    n: 18,
    title: "Incursión en pista",
    kicker: "Donde se pierden los aviones en tierra",
    minutes: 9,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-18-01-incursion-pista.webp",
        alt: "Vista desde cabina de un punto de espera A2 con letrero 18-36, eje mejorado y luces amarillas de protección",
        ancho: 1600,
        alto: 900,
        pie: "Las dos líneas continuas del patrón A2 quedan del lado desde el que llega la aeronave: sin autorización, todo el avión debe permanecer antes de ellas. Las dos líneas discontinuas miran hacia la pista. El letrero rojo «18-36» confirma qué pista proteges y las luces amarillas refuerzan la advertencia. Si posición, carta, señalización y autorización no coinciden, la defensa correcta contra una incursión es detenerse y aclarar, no continuar mientras se interpreta.",
      },
      {
        kind: "p",
        text: "Una incursión suele empezar antes de llegar a la pista: una ruta distinta de la preparada, un letrero que no se verbaliza o una autorización que la tripulación cree haber entendido. Con poca visibilidad hay menos tiempo para detectar el error, pero la defensa es la misma: briefing de rodaje, carta abierta, verificación cruzada y detención inmediata cuando la posición real no coincide con la autorización.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-18-02-convergencia.webp",
        alt: "Vista aérea oblicua de dos calles de rodaje que convergen en una sola entrada a pista, señaladas con líneas menta",
        ancho: 1600,
        alto: 900,
        pie: "Las dos calles convergen antes de una entrada compartida a la pista. Se reconocen por sus ejes amarillos que se unen; esta foto no permite ubicar un punto de espera ni leer un letrero. Antes de rodar, confirma en la carta oficial vigente qué ramal y qué punto de espera corresponden a tu autorización. Si tomas el ramal equivocado, detente en un lugar seguro y consulta al control; no supongas que ambos llevan a la misma autorización.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Punto crítico",
            imagen: {
              src: "/modulos/aeropuertos/ap-18-03-puntos-criticos.webp",
              alt: "Plano didáctico ficticio con una pista, calles de rodaje y dos puntos críticos HS señalados; no es una carta AIP",
            },
            puntos: [
              "HS (Hot Spot) señala un punto publicado donde hay mayor riesgo de incursión o colisión. En este esquema ficticio se reconocen por los círculos; para una operación real localízalos en la carta oficial vigente, porque su posición y representación dependen del aeródromo.",
              "Antes de rodar, identifica la secuencia de calles y el punto crítico que cruzarás. Si la posición no coincide con la ruta autorizada, detente y pide aclaración.",
            ],
          },
          {
            titulo: "Briefing de rodaje",
            imagen: {
              src: "/modulos/aeropuertos/ap-18-04-briefing.webp",
              alt: "Dos pilotos en cabina consultan juntos una tableta antes del rodaje; la pantalla es ilustrativa y no representa una carta oficial",
            },
            puntos: [
              "La foto muestra la verificación compartida antes de rodar, con el avión detenido; no reproduce una carta AIP. El briefing real se hace con la carta oficial vigente: ruta prevista, cruces de pista y puntos críticos.",
              "Al recibir la autorización, ambos pilotos comparan la ruta con la carta y verbalizan cada cruce. Si cambia la ruta, se detienen en un lugar seguro para volver a revisarla.",
            ],
          },
        ],
      },
      {
        kind: "casoReal",
        titulo: "Los Rodeos, 1977",
        fecha: "27 de marzo de 1977",
        aeronave: "Dos Boeing 747",
        queOcurrio: [
          "Dos Boeing 747 coincidieron en Los Rodeos con niebla. La niebla impedía que las tripulaciones se vieran entre sí y que la torre viera la pista.",
          "Uno rodaba sobre la pista y tenía que abandonarla por una de las salidas, numeradas C-1, C-2, C-3 y C-4; se le indicó la C-3. El otro esperaba al inicio de la pista para despegar.",
          "Ese inició el despegue sin autorización. Chocaron cerca de la C-4, con el primero todavía sobre la pista.",
        ],
        consecuencia:
          "Murieron 583 personas, 248 en un avión y 335 en el otro, y hubo 61 supervivientes. El informe concluye que la causa fundamental fue iniciar el despegue sin autorización.",
        leccion:
          "El esquema muestra dos aviones en la misma pista y poca visibilidad; las posiciones y distancias son ilustrativas. El hecho decisivo fue iniciar el despegue sin autorización mientras el otro avión todavía ocupaba la pista. Si no hay una autorización inequívoca o existe duda sobre la pista libre, no se inicia la carrera y se aclara con control.",
        fuente:
          "Informe oficial de la Subsecretaría de Aviación Civil de España sobre el accidente del 27 de marzo de 1977.",
        imagen: {
          src: "/modulos/aeropuertos/ap-18-05-los-rodeos.webp",
          alt: "Esquema didáctico no a escala de Los Rodeos con dos aviones sobre la pista y salidas C-1 a C-4",
        },
      },
      /* La nota de verificación de este hueco no es decorativa: la versión
         anterior de la ficha dibujaba una barra de parada de la OACI, una
         separación de 3 m entre luces y una señal de punto de espera B2 que no
         están en el informe final de la ANSV. El informe dice justamente lo
         contrario, que las marcas presentes no podían llamarse barra de parada
         porque no cumplían el Anexo 14. Si alguien reescribe la ficha, mantiene
         la nota o vuelve a verificar contra el informe. */
      {
        kind: "casoReal",
        titulo: "Linate, 2001",
        fecha: "8 de octubre de 2001",
        aeronave: "Un bimotor ejecutivo y un avión comercial",
        queOcurrio: [
          "Con niebla, y un alcance visual en la pista de unos 200 m, un bimotor ejecutivo salió de la plataforma de aviación general.",
          "La línea de guía se bifurcaba allí en dos: una curva amplia hacia el norte, que era la ruta autorizada, y otra más cerrada hacia el sureste. El avión tomó la del sureste.",
          "Antes de la pista cruzó una fila de luces rojas encendidas. En ese aeródromo no eran gobernables desde el control desde 1998 y quedaban encendidas de forma permanente, así que a las tripulaciones se les instruía cruzarlas encendidas. Salió a la pista activa, por la que un avión comercial ya estaba en carrera de despegue.",
        ],
        consecuencia:
          "Murieron 118 personas: 110 y 4 a bordo de las dos aeronaves y 4 en tierra. El aeródromo no tenía luces de protección de pista ni radar de movimiento en superficie.",
        leccion:
          "El esquema distingue la ruta R5 autorizada de la R6 recorrida. La fila roja del caso no era una barra de parada estándar de la OACI: su presencia por sí sola no aclara la autorización. Cuando la ruta real no coincide con la autorizada, hay que detenerse antes de la pista y pedir aclaración al control.",
        fuente:
          "Informe final de la ANSV sobre el accidente del 8 de octubre de 2001, aprobado el 20 de enero de 2004.",
        imagen: {
          src: "/modulos/aeropuertos/ap-18-06-linate.webp",
          alt: "Esquema didáctico no a escala de Linate: bifurcación entre R5 autorizada y R6 recorrida, luces rojas no estándar y pista activa",
        },
      },
      {
        kind: "reconoce",
        titulo: "La última línea antes de la pista",
        imagen: {
          src: "/modulos/aeropuertos/ap-18-07-reconoce.webp",
          alt: "Fotografía didáctica de entrada a pista con patrón A2, eje mejorado y letrero rojo 09-27 superpuestos con precisión; las marcas son ilustrativas",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 55,
            y: 57,
            que: "Doble línea continua de tu lado",
            significa: "Patrón A2: el punto de espera de la pista.",
            piloto: "Detén todo el avión antes de las líneas continuas hasta recibir autorización expresa para entrar a la pista.",
          },
          {
            x: 50,
            y: 77,
            que: "Eje con trazos al lado",
            significa: "Señal mejorada de eje: viene el punto de espera.",
            piloto: "Reduce la velocidad y verifica el punto de espera, el letrero y la autorización antes de seguir.",
          },
          {
            x: 60,
            y: 51,
            que: "Doble línea discontinua hacia la pista",
            significa: "Es el lado del patrón A2 que mira a la pista; la pareja continua queda de tu lado.",
            piloto: "Mantén todo el avión antes de las continuas si no hay autorización de ingreso.",
          },
          {
            x: 8,
            y: 45,
            que: "Letrero rojo con la pista",
            significa: "La pista que nombra está detrás del letrero.",
            piloto: "Confirma que esa es la pista autorizada y no ingreses sin autorización expresa.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Rodando de noche",
        situacion:
          "Ruedas de noche. Te autorizan una ruta distinta a la que preparaste y ya entras al cruce.",
        pregunta: "¿Qué haces?",
        respuesta: "Paras en un lugar seguro, releen la ruta sobre la carta y siguen.",
        claves: ["Parar cuesta un minuto.", "Manda lo autorizado, no lo que preparaste."],
      },
    ],
  },

  // ── 19 ──────────────────────────────────────────────────────────────────
  {
    n: 19,
    title: "Baja visibilidad",
    kicker: "Cuando el aeropuerto se encoge",
    minutes: 9,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-19-01-baja-visibilidad.webp",
        alt: "Rodaje nocturno con niebla, barra de parada roja y eje verde apagado más allá del punto de espera",
        ancho: 1600,
        alto: 900,
        pie: "En baja visibilidad, la barra roja encendida es el límite visual que no se cruza. El eje verde guía hasta la barra y queda apagado más allá para evitar que una ruta iluminada parezca autorizar el movimiento. Las luces amarillas llaman la atención sobre el punto protegido. La tripulación continúa solo cuando la autorización es clara, la barra se apaga y la guía luminosa corresponde con la ruta asignada.",
      },
      {
        kind: "p",
        text: "Con baja visibilidad no solo se ve menos: cambia la forma de usar el aeropuerto. Se activan procedimientos de baja visibilidad (Low Visibility Procedures, LVP), se protegen áreas del sistema de aterrizaje por instrumentos (Instrument Landing System, ILS) para operaciones de categoría II/III (Category II/III, CAT II/III), pueden aumentar las separaciones y se restringen rutas o cruces. El piloto debe saber qué punto de espera está activo y seguir la autorización y las luces; un alcance visual en pista (Runway Visual Range, RVR) concreto no permite escoger por cuenta propia la ruta ni el punto de detención.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-19-02-visibilidad-reducida.webp",
        alt: "Punto de espera de categoría con escalera amarilla B2, letrero rojo y barra de parada encendida entre la niebla",
        ancho: 1600,
        alto: 900,
        pie: "La niebla oculta la pista, pero cerca se reconocen la escalera amarilla B2, el letrero rojo de instrucción obligatoria y la fila roja de la barra de parada. El eje verde termina antes de ella. Identifica en la publicación vigente qué punto de espera corresponde a tu ruta; si la barra está encendida, detente aunque tengas autorización verbal y notifícalo al control.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Barra de parada",
            imagen: {
              src: "/modulos/aeropuertos/ap-19-03-barra-parada.webp",
              alt: "Barra roja de parada completa con luces elevadas rojas a ambos lados y eje verde que termina antes de la barra",
            },
            puntos: [
              "Se reconoce por la fila de luces rojas que cruza toda la calle y las luces rojas elevadas en sus extremos; el eje verde no continúa encendido detrás. Si está roja, no cruces, incluso con autorización verbal.",
              "En los puntos que sirven pistas previstas para operar con RVR inferior a 550 m se exige esta protección; el aeropuerto puede usarla también en otras condiciones. Confirma su estado con control.",
            ],
          },
          {
            titulo: "La regla dura",
            puntos: [
              "Una barra roja encendida no se cruza, aunque te autoricen.",
              "Que se apague no equivale a autorización. Si el estado de la barra no coincide con la instrucción recibida, detente en un lugar seguro y avisa al control.",
            ],
          },
          {
            titulo: "Áreas del ILS",
            imagen: {
              src: "/modulos/aeropuertos/ap-19-05-areas-ils.webp",
              alt: "Esquema didáctico no a escala de pista, antenas del ILS, áreas crítica y sensible, y puntos de espera A2 y B2",
            },
            puntos: [
              "El esquema distingue el entorno cercano a las antenas (área crítica) del área sensible exterior. Sus límites reales no se deducen del dibujo: consulta los procedimientos vigentes del aeródromo.",
              "Una aeronave o vehículo puede perturbar la señal. Durante LVP, mantén el punto de espera asignado y no avances por interpretar visualmente el límite del área.",
            ],
          },
          {
            titulo: "Punto de espera CAT II/III",
            imagen: {
              src: "/modulos/aeropuertos/ap-19-04-espera-categoria.webp",
              alt: "Fotografía diurna de punto de espera de categoría: escalera amarilla B2 y letrero rojo 25 CAT II/III",
            },
            puntos: ["Reconócelo por la escalera amarilla de dos líneas continuas unidas por travesaños y el letrero rojo con la pista y categoría. Espera antes de la marca que corresponda a la autorización y al procedimiento activo; su ubicación se confirma en la publicación vigente."],
          },
        ],
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-19-06-eje-salida.webp",
        alt: "Esquema de salida de pista con luces de eje verde y amarillo alternadas hasta el perímetro protegido, y solo verdes después",
        ancho: 1200,
        alto: 800,
        pie: "En una calle de salida, las luces de eje alternan verde y amarillo desde la pista hasta el límite protegido aplicable; después quedan solo verdes. El esquema muestra la secuencia, no el perímetro real de un aeródromo. Sigue la ruta autorizada y comunica pista libre únicamente cuando toda la aeronave haya rebasado el punto de espera correspondiente, no por el color de una luz aislada.",
      },
      {
        kind: "reconoce",
        titulo: "El punto de espera de categoría, completo",
        imagen: {
          src: "/modulos/aeropuertos/ap-19-07-reconoce.webp",
          alt: "Comparación fotográfica: punto de espera CAT II/III con escalera, letrero y barra roja; dos recuadros separados muestran espera intermedia y luces de eje de salida",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 42,
            y: 33,
            que: "Escalera amarilla",
            significa: "Patrón B2: el punto de espera de categoría.",
            piloto: "Detén todo el avión antes de este punto cuando sea el asignado para la operación.",
          },
          {
            x: 10,
            y: 14,
            que: "Letrero rojo con «CAT II/III»",
            significa: "Es una instrucción obligatoria: identifica la pista y la categoría protegida.",
            piloto: "Confirma que coincide con el punto de espera asignado y no avances sin autorización.",
          },
          {
            x: 70,
            y: 25,
            que: "Fila de luces rojas",
            significa: "Barra de parada encendida.",
            piloto: "Detente y avisa al control si la autorización parece contradecirla.",
          },
          {
            x: 25,
            y: 88,
            que: "Tres luces amarillas",
            significa: "En el recuadro B se reconoce un punto de espera intermedio, distinto del punto de espera de pista.",
            piloto: "Respeta la instrucción de detención que corresponda a ese punto; no lo confundas con la barra roja del recuadro A.",
          },
          {
            x: 71,
            y: 87,
            que: "Eje verde y amarillo",
            significa: "En el recuadro C, la alternancia identifica el tramo de salida próximo a la pista; luego aparecen solo luces verdes.",
            piloto: "Sigue la ruta autorizada. Confirma que todo el avión esté fuera de la pista antes de reportarla libre.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Rodando con niebla",
        situacion: "Ruedas con niebla. Te autorizan a cruzar y la barra sigue roja delante.",
        pregunta: "¿Cruzas?",
        respuesta: "No. Paras antes de la barra y avisas.",
        claves: [
          "La barra manda sobre la autorización.",
          "Le dices al control que sigue encendida.",
        ],
      },
    ],
  },

  // ── 20 ──────────────────────────────────────────────────────────────────
  {
    n: 20,
    title: "Estado de la superficie",
    kicker: "La pista, en un código de tres cifras",
    minutes: 8,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-20-01-pista-mojada.webp",
        alt: "Pista mojada vista desde corta final con agua, huellas de ruedas y sus tres tercios longitudinales señalados",
        ancho: 1600,
        alto: 900,
        pie: "El brillo y el agua visible permiten reconocer una superficie mojada, pero una huella más limpia no demuestra que ese tramo esté seco ni permite asignar un código desde la cabina. El informe divide la pista en tres tercios longitudinales y publica un código de condición de pista (Runway Condition Code, RWYCC) para cada uno. Como el orden se informa desde el designador menor, al operar en el sentido contrario debes invertir la secuencia antes de llevarla al cálculo de performance.",
      },
      {
        kind: "p",
        text: "El formato mundial de notificación (Global Reporting Format, GRF) de la OACI describe la superficie por tercios y asigna un código que la tripulación lleva al cálculo de performance. No basta con escuchar una cifra suelta: el informe se lee en el sentido del designador menor, y al operar en el sentido contrario se invierte el orden. Así, un 5/3/2 puede comenzar para ti por el 2 y condicionar desde el toque la distancia de aterrizaje necesaria.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-20-02-agua-superficie.webp",
        alt: "Vista rasante de pista mojada con acumulaciones reflectantes a un lado y zona central con menor cobertura visible",
        ancho: 1600,
        alto: 900,
        pie: "A un lado se ve agua con reflejos y, cerca del eje blanco, una cobertura distinta. La foto permite reconocer que la condición no es uniforme, pero no medir la profundidad ni concluir que el centro está seco. Agua estancada significa más de 3 mm medidos; para performance usa el informe de condición de pista vigente, no una estimación visual.",
      },
      {
        kind: "p",
        text: "La tabla va de 6 a 0. El 6 es pista seca; el 0 es lo peor.",
      },
      {
        kind: "table",
        head: ["Clave", "Estado de la superficie", "Eficacia de frenado"],
        rows: [
          ["6", "SECA", "no aplica"],
          [
            "5",
            "ESCARCHA · MOJADA, hasta 3 mm inclusive · NIEVE FUNDENTE, NIEVE SECA o NIEVE MOJADA hasta 3 mm",
            "BUENA",
          ],
          ["4", "NIEVE COMPACTADA con temperatura exterior de −15 °C o inferior", "BUENA A MEDIA"],
          [
            "3",
            "MOJADA RESBALADIZA · NIEVE SECA o MOJADA de más de 3 mm · NIEVE SECA o MOJADA sobre NIEVE COMPACTADA · NIEVE COMPACTADA con temperatura superior a −15 °C",
            "MEDIA",
          ],
          ["2", "AGUA ESTANCADA de más de 3 mm · NIEVE FUNDENTE de más de 3 mm", "MEDIA A POBRE"],
          ["1", "HIELO", "POBRE"],
          [
            "0",
            "HIELO MOJADO · AGUA SOBRE NIEVE COMPACTADA · NIEVE SECA O MOJADA SOBRE HIELO",
            "PEOR QUE POBRE",
          ],
        ],
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-20-03-escala-rwycc.webp",
        alt: "Guía visual de códigos de condición de pista del 6 al 0, con ejemplos típicos de superficie y frenado",
        ancho: 1600,
        alto: 900,
        pie: "La escala baja de 6 (seca) a 0 (frenado peor que pobre). El dibujo resume ejemplos; la tabla anterior contiene los criterios completos. Si el 25 % o menos de un tercio está mojado o cubierto, ese tercio puede notificarse con código 6 según la evaluación del aeródromo. No deduzcas el RWYCC a partir del color de una foto: verifica el informe vigente antes de calcular la performance.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Tres tercios, tres cifras",
            imagen: {
              src: "/modulos/aeropuertos/ap-20-04-tercios.webp",
              alt: "Esquema ficticio de pista 09/27 dividida en tercios 5, 3 y 2: publicación desde 09 y lectura inversa para aterrizar por 27",
            },
            puntos: [
              "En este ejemplo ficticio, el informe se publica 5/3/2 desde el designador menor, 09. Se reconoce por los tres segmentos longitudinales separados en el dibujo.",
              "Para aterrizar por 27, tu secuencia es 2/3/5. Introduce los códigos en el sentido de aterrizaje al calcular performance; no confundas orden publicado con orden de recorrido.",
            ],
          },
          {
            titulo: "El informe y el SNOWTAM",
            imagen: {
              src: "/modulos/aeropuertos/ap-20-05-informe-rcr.webp",
              alt: "Esquema conceptual, sin datos ni código de aeródromo, de las secciones de performance y conciencia situacional de un informe de condición de pista",
            },
            puntos: [
              "El informe de condición de pista (Runway Condition Report, RCR) separa los datos para calcular performance de la información que sostiene la conciencia situacional. Reconoce el código por tercio junto a cobertura, profundidad y contaminante.",
              "La información llega por servicios de tránsito aéreo y, cuando corresponde, por SNOWTAM (Snow Notice to Airmen). Una pista solo mojada puede comunicarse sin emitir SNOWTAM; consulta siempre la información vigente para tu operación.",
            ],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Leer la pista con los ojos",
        imagen: {
          src: "/modulos/aeropuertos/ap-20-06-reconoce.webp",
          alt: "Fotografía de pista tras lluvia con cuatro zonas señaladas: reflejo de agua, cobertura lateral desigual, huellas de neumáticos y brillo distante",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 18,
            y: 68,
            que: "Agua con reflejo",
            significa: "Se ve agua sobre la superficie; su profundidad no se puede medir en la fotografía.",
            piloto: "Busca el contaminante y el RWYCC comunicados antes de calcular la performance.",
          },
          {
            x: 22,
            y: 33,
            que: "Cobertura lateral desigual",
            significa: "La zona cercana al borde tiene una apariencia distinta de la franja central; no es una prueba de que una de ellas esté seca.",
            piloto: "No extrapoles la condición de una franja al ancho entero: usa la cobertura evaluada en el informe.",
          },
          {
            x: 59,
            y: 47,
            que: "Huellas de neumáticos",
            significa: "Las marcas muestran el paso de aeronaves, no la eficacia de frenado ni el espesor del agua.",
            piloto: "Si el frenado real resulta peor que el reportado, notifícalo al control; el operador del aeródromo reevalúa el código.",
          },
          {
            x: 81,
            y: 19,
            que: "Brillo distante",
            significa: "El reflejo no distingue por sí solo entre una película de agua y otros estados de superficie.",
            piloto: "No infieras hielo ni ausencia de contaminación solo por el aspecto; confirma el informe y las condiciones observadas.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Preparando la aproximación",
        situacion: "Te dan la pista en 5/3/2 y vas a aterrizar por el otro lado.",
        pregunta: "¿En qué orden lo lees?",
        respuesta: "Al revés: tu primer tercio es el 2.",
        claves: ["Tomas contacto sobre lo peor.", "Revisa performance."],
      },
    ],
  },

  // ── 21 ──────────────────────────────────────────────────────────────────
  {
    n: 21,
    title: "Los datos del aeródromo",
    kicker: "Lo que aguanta y lo que te protege",
    minutes: 10,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-21-01-acr-pcr-rff.webp",
        alt: "Tren principal de un avión sobre pavimento aeroportuario y un vehículo de salvamento al fondo, con ACR, PCR y categoría RFF señalados",
        ancho: 1600,
        alto: 900,
        pie: "El índice de clasificación de aeronaves (Aircraft Classification Rating, ACR) expresa la exigencia que el avión impone al pavimento; se compara con el índice de clasificación de pavimentos (Pavement Classification Rating, PCR) publicado para la superficie y las condiciones aplicables. La categoría de salvamento y extinción de incendios (Rescue and Fire Fighting, RFF) describe la protección disponible para el tamaño de aeronave previsto. La foto no reemplaza estas comprobaciones documentales: una pista larga puede seguir siendo incompatible.",
      },
      {
        kind: "p",
        text: "La compatibilidad del pavimento y la categoría de salvamento son dos comprobaciones que pueden limitar una operación aun cuando la pista sea suficientemente larga. El ACR del avión se compara con el PCR publicado para las condiciones previstas, y la categoría de bomberos se contrasta con el tamaño del avión y la disponibilidad informada. Ninguna de las dos reemplaza el resto del despacho: obstáculos, dimensiones, performance, meteorología y avisos vigentes siguen formando parte de la decisión.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-21-02-plataforma.webp",
        alt: "Tres aeronaves de distinto tamaño estacionadas en puestos separados de plataforma, con líneas amarillas de guía y límites de seguridad rojos",
        ancho: 1600,
        alto: 900,
        pie: "Reconoce las líneas amarillas que guían cada avión a su puesto y los límites de seguridad de color contrastante. Los tamaños distintos recuerdan que la compatibilidad se comprueba para la aeronave y las superficies que realmente usará, no mirando el avión vecino. Antes de planificar o aceptar un puesto, verifica dimensiones, resistencia publicada y servicios disponibles; la fotografía no demuestra el PCR de la plataforma.",
      },
      {
        kind: "p",
        text: "Desde el 28 de noviembre de 2024, el método de la OACI usa **ACR-PCR**. El código PCR tiene cinco elementos, siempre en el mismo orden.",
      },
      {
        kind: "breakdown",
        caption: "Ejemplo didáctico ficticio, no publicado para ningún aeródromo: PCR 980 / F / C / X / T.",
        parts: [
          { token: "980", label: "Valor del índice", detail: "Un número." },
          { token: "F", label: "Tipo de pavimento", detail: "R, rígido. F, flexible." },
          {
            token: "C",
            label: "Resistencia de la subrasante",
            detail: "A, alta, 200 MPa. B, media, 120 MPa. C, baja, 80 MPa. D, muy baja, 50 MPa.",
          },
          {
            token: "X",
            label: "Presión máxima de neumáticos",
            detail: "W, sin límite. X, hasta 1,75 MPa. Y, hasta 1,25 MPa. Z, hasta 0,50 MPa.",
          },
          {
            token: "T",
            label: "Método de evaluación",
            detail: "T, técnica. U, por experiencia.",
          },
        ],
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-21-03-codigo-pcr.webp",
        alt: "Esquema didáctico ficticio de cinco elementos del código PCR: valor, pavimento, subrasante, presión de neumáticos y método de evaluación",
        ancho: 1600,
        alto: 900,
        pie: "Lee el ejemplo ficticio de izquierda a derecha: 980 es el valor, F el pavimento flexible, C la subrasante baja, X el límite de presión de neumáticos de 1,75 MPa y T una evaluación técnica. No es una ficha de un aeropuerto ni sustituye el dato vigente. Para operación normal compara el ACR calculado para tu avión con el PCR aplicable, incluida la presión; una sobrecarga ocasional exige evaluación y autorización del operador, no una decisión unilateral de la tripulación.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "La regla",
            puntos: [
              "Para operación normal, tu ACR debe ser igual o menor que el PCR aplicable; comprueba también presión de neumáticos y estado del pavimento.",
              "Una sobrecarga ocasional de hasta 10 % y aproximadamente 5 % de movimientos anuales, excluidos los aviones ligeros, es un criterio orientativo de evaluación, no un permiso automático. Consulta al operador del aeródromo.",
            ],
          },
          {
            titulo: "Categoría de bomberos",
            imagen: {
              src: "/modulos/aeropuertos/ap-21-04-categorias-rff.webp",
              alt: "Tabla visual de categorías de salvamento y extinción 1 a 10 según longitud total y anchura máxima del fuselaje",
            },
            puntos: [
              "Reconoce primero la fila que corresponde a la longitud total del avión y comprueba el límite de anchura del fuselaje. Si lo supera, se eleva una categoría.",
              "Contrasta la categoría resultante con el servicio RFF efectivamente disponible y publicado para la operación; no asumas el nivel por ver un vehículo de bomberos.",
            ],
          },
        ],
      },
      {
        kind: "table",
        head: ["Categoría", "Longitud total del avión", "Anchura máxima de fuselaje"],
        rows: [
          ["1", "de 0 a menos de 9 m", "2 m"],
          ["2", "de 9 a menos de 12 m", "2 m"],
          ["3", "de 12 a menos de 18 m", "3 m"],
          ["4", "de 18 a menos de 24 m", "4 m"],
          ["5", "de 24 a menos de 28 m", "4 m"],
          ["6", "de 28 a menos de 39 m", "5 m"],
          ["7", "de 39 a menos de 49 m", "5 m"],
          ["8", "de 49 a menos de 61 m", "7 m"],
          ["9", "de 61 a menos de 76 m", "7 m"],
          ["10", "de 76 a menos de 90 m", "8 m"],
        ],
      },
      {
        kind: "callout",
        tone: "info",
        text: "Si el fuselaje excede la anchura de su fila, la categoría sube un nivel. Si las aeronaves de la categoría más alta que normalmente usan el aeródromo realizan menos de 700 movimientos en los tres meses consecutivos de mayor actividad, el nivel de protección puede ser una categoría menor. No es una rebaja que la tripulación decida: verifica el servicio publicado y disponible.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Fauna",
            imagen: {
              src: "/modulos/aeropuertos/ap-21-05-fauna.webp",
              alt: "Grupo de aves en la franja de hierba junto a la pista al amanecer, con el pavimento visible",
            },
            puntos: [
              "Las aves posadas en la franja junto a la pista son un peligro de fauna aunque no estén sobre el pavimento. Reconoce su cercanía a la trayectoria y comunica el avistamiento según los procedimientos locales antes de operar.",
              "El aeródromo evalúa y mitiga los focos que atraen animales; cada choque se notifica. No supongas que una pista despejada está libre de riesgo de fauna.",
            ],
          },
          {
            titulo: "Objetos y chorro",
            imagen: {
              src: "/modulos/aeropuertos/ap-21-06-objeto-extrano.webp",
              alt: "Tornillo suelto señalado sobre el pavimento aeroportuario, con señal blanca desenfocada al fondo",
            },
            puntos: [
              "El tornillo resaltado es un objeto extraño (Foreign Object Debris, FOD), no parte de la superficie. Puede dañar neumáticos o ser ingerido por un motor: notifica su posición para que personal autorizado lo retire.",
              "La inspección debe identificar y retirar estos objetos antes de seguir usando el área afectada. El chorro de reacción también puede desplazarlos y aumentar el riesgo.",
            ],
          },
        ],
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-21-07-chorro.webp",
        alt: "Avión bimotor iniciando el rodaje, con polvo tenue detrás de un motor y sin personas en la zona posterior",
        ancho: 1200,
        alto: 800,
        pie: "La aeronave está iniciando el rodaje y detrás del motor cercano se distingue algo de polvo junto al pavimento: esa zona posterior puede quedar expuesta al chorro de reacción, incluso si la estela no se ve claramente. La foto no permite calcular una distancia segura. Antes de iniciar potencia o pasar por detrás de otro avión, respeta las separaciones y procedimientos locales; mantén personas, equipos y objetos fuera de la estela.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Planificando el vuelo",
        situacion: "Vas a un aeropuerto cuyo PCR es menor que tu ACR de hoy.",
        pregunta: "¿Puedes ir igual?",
        respuesta: "No como operación normal. Solo si el operador del aeródromo evalúa y autoriza la sobrecarga aplicable.",
        claves: [
          "Hasta un 10 % por encima es un criterio para sobrecargas ocasionales, no una autorización automática.",
          "Un exceso mayor o pavimento debilitado exige análisis específico; confirma siempre con el operador.",
        ],
      },
    ],
  },

  // ── 22 ──────────────────────────────────────────────────────────────────
  {
    n: 22,
    title: "Del aterrizaje al puesto",
    kicker: "Los últimos mil metros",
    minutes: 9,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-22-01-salida-rapida.webp",
        alt: "Salida rápida a la derecha durante el rollout, con su ángulo aproximado y el punto para confirmar pista libre señalados",
        ancho: 1600,
        alto: 900,
        pie: "La salida rápida se abre en un ángulo agudo, cercano a 30 grados, para abandonar la pista con menor desaceleración que en una salida perpendicular. Es una opción, no una orden de forzar el frenado: si la velocidad o la autorización no permiten tomarla con seguridad, continúa hasta otra salida. Solo informa pista libre cuando toda la aeronave haya cruzado el límite protegido y la tripulación haya confirmado visualmente su posición.",
      },
      {
        kind: "p",
        text: "Después del toque todavía queda una fase de alta carga de trabajo: desacelerar, identificar la salida autorizada, confirmar que todo el avión libró la pista y entrar al puesto sin perder separación. Una salida rápida ayuda a abandonar antes, pero no obliga a forzar el frenado ni sustituye la autorización. Si se pierde la guía de atraque o la imagen no coincide con el puesto asignado, se detiene el avión antes de improvisar.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-22-02-salida-aerea.webp",
        alt: "Vista aérea de salida rápida de ángulo agudo que se separa de la pista y conecta con una calle paralela",
        ancho: 1600,
        alto: 900,
        pie: "El eje blanco discontinuo identifica la pista; la línea amarilla continua se desprende de él, describe una curva amplia y lleva a la calle paralela. Reconoce la geometría de salida de ángulo agudo, pero no deduzcas de una fotografía la velocidad que tu avión puede mantener. Elige la salida autorizada solo si puedes alcanzarla y girar con seguridad; si no, continúa a la siguiente.",
      },
      {
        kind: "p",
        text: "La salida rápida facilita abandonar la pista mediante una curva amplia y un ángulo agudo. Las luces indicadoras de salida rápida, cuando están instaladas, te anuncian la distancia al punto de salida; no sustituyen la velocidad de giro segura ni la autorización de rodaje.",
      },
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-22-03-retills.webp",
        alt: "Esquema conceptual de luces indicadoras de salida rápida amarillas en secuencia tres, dos y una antes del punto de tangencia, con luces de eje verde y amarillo en la salida",
        ancho: 1600,
        alto: 900,
        pie: "En este dibujo, no a escala, los tres grupos de luces amarillas de la pista se reducen 3–2–1 a intervalos de 100 m antes del punto de tangencia, siempre del lado de la salida. Son luces indicadoras de salida rápida (Rapid Exit Taxiway Indicator Lights, RETIL): informan distancia, no ordenan tomar la salida. En la calle, el primer foco del eje próximo a pista es verde, se alterna con amarillo hasta el límite protegido aplicable y después queda verde; sigue únicamente la ruta autorizada y no informes pista libre hasta que todo el avión esté fuera.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Luces indicadoras de salida",
            puntos: [
              "Cuando existen, son grupos amarillos de tres, dos y una luz sobre la pista, del lado de la salida, separados 100 m. Reconócelos como anticipación del punto de tangencia.",
              "Sirven para preparar la desaceleración. Si la salida no es segura para tu velocidad o no está autorizada, continúa por la pista.",
            ],
          },
          {
            titulo: "Guía visual de atraque",
            imagen: {
              src: "/modulos/aeropuertos/ap-22-04-guia-atraque.webp",
              alt: "Vista desde cabina de unidad genérica de guía visual de atraque al frente del puesto y pasarela a la derecha",
            },
            puntos: [
              "Reconoce el eje amarillo del puesto y la unidad de guía al frente, dentro del campo visual del piloto. La fotografía por sí sola no confirma que el sistema esté activo ni calibrado para tu avión.",
              "Contrasta la guía lateral y la indicación de parada con el puesto y tipo asignados. Si la señal falta, es contradictoria o no coincide, detente y solicita una guía alternativa válida.",
            ],
          },
          {
            titulo: "Versión avanzada",
            imagen: {
              src: "/modulos/aeropuertos/ap-22-05-atraque-avanzado.webp",
              alt: "Fotografía de unidad genérica con pantalla didáctica superpuesta que indica A320, corrección lateral y 12,5 m restantes",
            },
            puntos: [
              "La pantalla superpuesta es un ejemplo didáctico, no una interfaz operacional: ilustra tipo de avión, guía lateral y distancia restante. Reconoce esos datos juntos; no uses el dibujo como referencia de un fabricante.",
              "Un sistema avanzado también debe indicar parada, sobrepaso y parada de emergencia. Si se apaga, muestra un tipo equivocado o deja de guiar, detén la aeronave y coordina asistencia.",
            ],
          },
          {
            titulo: "El señalero",
            imagen: {
              src: "/modulos/aeropuertos/ap-22-06-senalero.webp",
              alt: "Señalero con chaleco y protección auditiva frente al puesto, con dos bastones iluminados cruzados sobre la cabeza en señal de parada normal",
            },
            puntos: [
              "Reconoce los dos bastones cruzados sobre la cabeza: es la posición final de una señal de parada normal. La fotografía fija no muestra la velocidad del movimiento de los brazos.",
              "Detente siguiendo la señal válida y mantén la posición hasta coordinar el aseguramiento del avión. La parada de emergencia se indica con movimiento brusco y exige detenerse de inmediato.",
            ],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Las señales del puesto",
        intro: "La foto muestra un puesto sin aeronave. Toca las cinco zonas señaladas y distingue la guía amarilla de los límites rojos; algunas barras cortas sirven a posiciones de parada distintas, no a un avión genérico.",
        imagen: {
          src: "/modulos/aeropuertos/ap-22-08-reconoce-puesto.webp",
          alt: "Puesto vacío visto en oblicuo con línea amarilla de entrada y giro, eje de alineación, barras transversales y límites de seguridad rojos señalados",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 39,
            y: 87,
            que: "Línea amarilla de entrada",
            significa: "Es la guía que llega desde la calle a la zona del puesto; aquí no se ve una flecha ni un número de puesto legible.",
            piloto: "Sigue solo la línea correspondiente al puesto asignado y confirma que el área delante está libre.",
          },
          {
            x: 47,
            y: 68,
            que: "Curva de entrada",
            significa: "La línea de guía cambia de dirección y lleva al eje recto del puesto; no se distingue una barra de viraje independiente en esta foto.",
            piloto: "Haz el giro siguiendo el trazado y la guía autorizada, sin improvisar un punto de viraje a partir de otra marca.",
          },
          {
            x: 50,
            y: 44,
            que: "Eje amarillo recto",
            significa: "Es la prolongación de la guía que centra el avión en el puesto; la foto no demuestra por sí sola la compatibilidad del puesto.",
            piloto: "Mantén la alineación mientras contrastas la guía visual de atraque o las señales del señalero.",
          },
          {
            x: 50,
            y: 18,
            que: "Barras transversales",
            significa: "Se aprecian varias marcas amarillas que cruzan el eje, incluida una barra más larga al fondo; pueden corresponder a posiciones de parada distintas.",
            piloto: "Detente solo en la referencia válida para tu tipo de aeronave y la guía del puesto, no en la primera barra que veas.",
          },
          {
            x: 22,
            y: 43,
            que: "Límite rojo del puesto",
            significa: "La línea de color contrastante delimita el área de seguridad alrededor de la posición de estacionamiento.",
            piloto: "Comprueba el espacio libre y respeta las restricciones de movimiento del equipo de tierra durante la llegada.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Entrando al puesto",
        situacion: "Entrando al puesto, la pantalla de atraque se apaga de golpe.",
        pregunta: "¿Qué haces?",
        respuesta: "Detén el avión y pide una guía alternativa válida antes de continuar.",
        claves: ["Una pantalla apagada no confirma eje ni punto de parada.", "Coordina con el personal de tierra; no avances por intuición."],
        imagen: {
          src: "/modulos/aeropuertos/ap-22-07-avion-calzado.webp",
          alt: "Avión estacionado con calzos en el tren delantero y personal y equipos de apoyo alrededor del puesto",
        },
        ves: ["La foto representa una fase posterior: el avión está detenido y calzado. Reconoce los calzos frente a las ruedas y el límite rojo del puesto.", "Antes de que entren los equipos, confirma la parada y el aseguramiento según el procedimiento local; los calzos visibles no prueban por sí solos que los motores estén apagados."],
      },
    ],
  },
]
