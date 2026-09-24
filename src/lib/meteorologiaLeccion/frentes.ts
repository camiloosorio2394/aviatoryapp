/**
 * Nivel 3 · Masas de aire, frentes y tormentas.
 *
 * Cierra el capítulo 11 del PHAK. Los dos vuelos de ejemplo (Junín a Formosa
 * cruzando un frente cálido y el mismo tramo cruzando uno frío) son los del
 * propio capítulo, que en su edición en español está localizado a ciudades
 * argentinas: no hay que inventar ningún escenario, ya viene situado.
 *
 * Las cifras de peligros de tormenta (200 kt en el vórtice de un tornado, 30 km
 * de turbulencia lateral, 25 km de frente de ráfaga por delante, media pulgada
 * de granizo, 100 ft de error de altímetro, 20 NM de separación) son del
 * capítulo y se citan como suyas. Ninguna se redondea ni se adorna.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const PARTE_FRENTES: DocScreen[] = [
  // ── 10 ──────────────────────────────────────────────────────────────────
  {
    n: 10,
    title: "Masas de aire y frentes",
    kicker: "Origen del aire, límites y cambios posibles",
    minutes: 9,
    blocks: [
      {
        kind: "p",
        text: "**Qué ves en la portada:** nubosidad extensa y precipitación distante sobre un aeródromo. **Cómo lo reconoces:** hay sectores con condiciones distintas, pero una sola imagen no demuestra la presencia ni el tipo de frente. **Qué decides:** ubicar el sistema en un análisis meteorológico vigente y contrastar pronóstico, observaciones, radar y avisos antes de planear la ruta o la llegada.",
      },
      {
        kind: "sub",
        text: "Ver: la región de origen influye en el aire",
      },
      {
        kind: "definicion",
        text: "Una masa de aire es un cuerpo extenso con temperatura y humedad relativamente uniformes, adquiridas en buena parte durante su permanencia sobre una región de origen. Sus propiedades cambian al desplazarse.",
      },
      {
        kind: "p",
        text: "Una clasificación frecuente combina origen térmico (**polar** o **tropical**) y superficie de origen (**marítima** o **continental**). Por ejemplo, el aire polar continental suele ser frío y seco respecto de su entorno; el tropical marítimo suele ser cálido y húmedo. Son características relativas, no un pronóstico de nubes o visibilidad en cualquier lugar.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "La superficie modifica la masa de aire",
        text: "Sobre una superficie más cálida, el calentamiento desde abajo puede favorecer mezcla y convección; con humedad suficiente podrían aparecer cúmulos y chubascos. Sobre una superficie más fría, el enfriamiento de las capas bajas puede favorecer estabilidad, estratos o niebla si hay humedad. Ninguno de esos resultados, incluida la visibilidad, está garantizado por la etiqueta de la masa: comprueba el perfil, la humedad y los reportes actuales.",
      },
      {
        kind: "infografia",
        nombre: "meteo-masas",
      },
      {
        kind: "p",
        text: "**Qué ves en la matriz:** dos criterios de origen, temperatura y superficie marítima o continental. **Cómo la reconoces:** cruza la fila térmica con la columna de humedad; es una clasificación general. **Qué decides:** úsala para formular hipótesis, no para sustituir el pronóstico de la ruta ni las observaciones del aeródromo.",
      },
      {
        kind: "check",
        question:
          "Una masa polar continental se desplaza sobre una superficie mucho más cálida. ¿Cuál es la interpretación más prudente?",
        options: [
          "Siempre habrá estratos y niebla por su origen polar",
          "El calentamiento desde abajo puede aumentar la mezcla y la convección; compruebo humedad y condiciones observadas antes de esperar chubascos o buena visibilidad",
          "La masa conservará exactamente sus propiedades de origen durante todo el trayecto",
        ],
        answer: 1,
        explain:
          "El calentamiento desde abajo puede desestabilizar las capas bajas. Para anticipar nubes o precipitación también importan la humedad, el ascenso y el perfil térmico. La mezcla puede mejorar la visibilidad, pero no la garantiza: usa observaciones y pronóstico vigentes.",
      },
      {
        kind: "sub",
        text: "Entender: el frente es la frontera",
      },
      {
        kind: "definicion",
        text: "Un frente es una zona de transición entre masas de aire con propiedades distintas, sobre todo temperatura y densidad. Su desplazamiento puede cambiar viento, nubosidad, precipitación y visibilidad, pero la intensidad y el momento dependen del sistema concreto.",
      },
      {
        kind: "p",
        text: "Los frentes frío y cálido se nombran por la masa que avanza. Los símbolos en la carta muestran tipo y dirección de avance; las nubes y el tiempo asociados son patrones posibles, no una secuencia obligatoria. Confirma posición y movimiento en productos vigentes.",
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Los cuatro tipos",
        items: [
          {
            titulo: "Cálido",
            ref: "el aire cálido avanza y sustituye al frío",
            puntos: [
              "El aire cálido tiende a ascender gradualmente sobre aire más frío cerca de la superficie.",
              "Con humedad y ascenso suficientes puede producir nubosidad estratiforme extensa y precipitación continua por delante del límite en superficie.",
              "No todos se mueven a la misma velocidad ni traen niebla; comprueba posición, tendencia y cambios de techo y visibilidad.",
            ],
          },
          {
            titulo: "Frío",
            ref: "el aire frío avanza y sustituye al cálido",
            puntos: [
              "El aire más frío y denso avanza bajo el cálido y favorece su ascenso.",
              "Si el aire cálido es húmedo e inestable, pueden aparecer chubascos o tormentas cerca del límite o delante de él.",
              "La velocidad, la pendiente y el tiempo asociado varían: un frente frío puede pronosticarse y no implica tormentas en todos los casos.",
            ],
          },
          {
            titulo: "Estacionario",
            ref: "el límite se desplaza poco",
            puntos: [
              "Las masas pueden moverse a lo largo del límite aunque este apenas avance.",
              "Con humedad y ascenso puede mantener nubes o precipitación durante un período prolongado; no siempre tiene tiempo severo.",
            ],
          },
          {
            titulo: "Ocluido",
            ref: "un frente frío alcanza a uno cálido",
            puntos: [
              "Se forma cuando un frente frío alcanza uno cálido y el aire cálido queda elevado sobre la superficie.",
              "En una oclusión fría, el aire que llega detrás es el más frío; en una cálida, el aire que está delante es el más frío.",
              "Puede combinar nubes y precipitación extensas con zonas convectivas; el tipo de oclusión no fija por sí solo la severidad.",
            ],
          },
        ],
      },
      {
        kind: "infografia",
        nombre: "meteo-simbolos",
      },
      {
        kind: "p",
        text: "**Qué ves en el esquema:** cuatro símbolos de carta y cortes verticales simplificados. **Cómo los reconoces:** triángulos para el frío, semicírculos para el cálido, símbolos en lados opuestos para el estacionario y en el mismo lado para el ocluido. **Qué decides:** ubicar la posición real en el análisis vigente; el corte conceptual no indica nubes, intensidad ni mínimos en tu ruta.",
      },
      {
        kind: "reconoce",
        titulo: "Banda extensa de nubes y lluvia",
        intro: "Una vista lateral permite reconocer la extensión de una capa y la precipitación distante. Es compatible con una zona frontal, pero también puede tener otras causas.",
        imagen: {
          src: "/modulos/meteorologia/mt-t10-01-banda-nubosa.webp",
          alt: "Vista aérea oblicua de una extensa capa nubosa con una banda distante de precipitación sobre el terreno",
          ancho: 1600,
          alto: 800,
        },
        puntos: [
          { x: 64, y: 30, que: "Capa extensa", significa: "La nubosidad ocupa un área amplia; una foto no identifica por sí sola el frente ni su altitud.", piloto: "Contrasta el análisis y las bases y coberturas reportadas a lo largo de la ruta." },
          { x: 74, y: 46, que: "Precipitación distante", significa: "La cortina sugiere caída de precipitación, pero no muestra intensidad medida ni lo que ocurre dentro de la nube.", piloto: "Revisa radar, observaciones y avisos antes de planear un cruce o una llegada." },
          { x: 22, y: 37, que: "Sector más abierto", significa: "Una zona menos cubierta en este encuadre no asegura que el resto de la ruta esté despejado.", piloto: "Considera toda la trayectoria, el alterno y la evolución prevista, no solo el claro visible." },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** una capa amplia y una banda de precipitación en el horizonte. **Cómo la reconoces:** la lluvia se distingue como una cortina bajo las nubes. **Qué decides:** integrar análisis frontal, radar y reportes de ruta; la fotografía no demuestra si el frente es cálido, frío o incluso si hay uno.",
      },
      {
        kind: "sub",
        text: "Interpretar: el viento puede cambiar al cruzar una zona frontal",
      },
      {
        kind: "p",
        text: "El gradiente de presión, la circulación del sistema, la fricción y el relieve influyen en el viento. Al atravesar una zona frontal puede cambiar su dirección o intensidad, a veces de manera marcada; no ocurre igual en todos los frentes. Revisa el viento actual y previsto a las altitudes y horas relevantes, especialmente cerca del suelo.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Esto conecta con la lección 5",
        text: "Un cambio rápido del viento con la altura o en una distancia corta cerca del suelo puede ser cizalladura a bajo nivel. Un sistema frontal puede favorecerla, pero su presencia e intensidad se evalúan con avisos, reportes, observaciones y procedimientos de la operación; el símbolo de la carta no la confirma.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Cómo se clasifican las masas de aire?",
            respuesta:
              "Por propiedades adquiridas en su región de origen: una clasificación frecuente distingue origen térmico polar o tropical y superficie marítima o continental. El aire polar continental suele ser relativamente frío y seco, y el tropical marítimo, relativamente cálido y húmedo. Al desplazarse, sus propiedades se modifican; para el vuelo consulto condiciones actuales y pronóstico.",
            claves: ["Región de origen", "Polar o tropical", "Marítima o continental", "La masa cambia al desplazarse"],
          },
          {
            nivel: "interpretacion",
            q: "Una masa de aire se mueve sobre una superficie más fría que ella. ¿Qué tiempo espera?",
            respuesta:
              "El enfriamiento desde abajo tiende a estabilizar las capas bajas y, si hay humedad suficiente, puede favorecer estratos o niebla. No deduzco automáticamente mala visibilidad: la compruebo en observaciones y pronóstico, junto con la temperatura, la humedad y el viento.",
            claves: ["Enfriamiento desde abajo", "Posible estabilidad", "La humedad condiciona nubes y niebla", "Confirmar visibilidad"],
          },
          {
            nivel: "situacion",
            q: "¿Qué diferencia hay entre una oclusión de frente frío y una de frente cálido?",
            respuesta:
              "En una oclusión fría, la masa que avanza por detrás del frente frío es la más fría y se mete por debajo de la que está delante. En una oclusión cálida, la masa situada por delante es la más fría y el aire que llega asciende sobre ella. En ambos casos el aire cálido queda elevado; la severidad depende también de humedad, estabilidad y dinámica, no solo del nombre de la oclusión.",
            claves: [
              "Depende de cuál de los dos aires es más frío",
              "Oclusión fría: el más frío llega detrás",
              "Oclusión cálida: el más frío está delante",
              "La severidad no es automática",
            ],
          },
        ],
      },
    ],
  },

  // ── 11 ──────────────────────────────────────────────────────────────────
  {
    n: 11,
    title: "Cruzar un frente",
    kicker: "Evalúa el trayecto completo, no solo el destino",
    minutes: 10,
    blocks: [
      {
        kind: "p",
        text: "**Qué ves en la portada:** una banda de células y cortinas de lluvia vista desde una aeronave a distancia. **Cómo la reconoces:** los núcleos convectivos ocupan una franja amplia, con sectores de distinta intensidad. **Qué decides:** no elegir un hueco solo por la foto; comprueba radar, avisos, movimiento del sistema, combustible y ruta alternativa con la tripulación y control. Una imagen no demuestra que la banda sea frontal ni que un costado sea seguro.",
      },
      {
        kind: "p",
        text: "Los dos recorridos siguientes son **escenarios didácticos**, no meteorología vigente ni autorizaciones para volar. Sirven para comparar cómo un frente cálido o uno frío puede afectar puntos distintos de una misma ruta entre Junín y Formosa. Para una operación de aerolínea, la decisión se prepara con despacho, mínimos, ruta, alternos y combustible; no se traslada literalmente la decisión de un vuelo visual de escuela.",
      },
      {
        kind: "titulo",
        text: "Escenario 1: frente cálido en la ruta",
        sub: "Condiciones hipotéticas que empeoran hacia Formosa",
      },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Salida de Junín",
            texto: "Cielo con algunos cirros; la salida no revela por sí sola las condiciones más adelante.",
          },
          {
            rotulo: "Hacia Paraná",
            texto: "Aumentan las capas de nubes. El escenario informa techo de 6.000 ft, visibilidad de 10 km con neblina y presión en descenso.",
          },
          {
            rotulo: "Acercándose a Reconquista",
            texto: "Techo cercano a 2.000 ft, visibilidad de 5 km y lluvia. Una temperatura próxima al punto de rocío favorece saturación, pero no demuestra por sí sola niebla.",
            fuerte: true,
          },
          {
            rotulo: "Formosa",
            texto: "Cielo cubierto con nube baja, llovizna y visibilidad de 1 km en el ejercicio; compara esos datos con los mínimos aplicables y el pronóstico para la hora de llegada.",
          },
        ],
      },
      {
        kind: "p",
        text: "En el ejemplo, techo y visibilidad se deterioran hacia el destino. Antes de salir, la tripulación y el despacho deben evaluar mínimos, pronóstico a la hora de llegada, alternos y combustible. En vuelo, si las condiciones no cumplen el plan autorizado, se reconsideran espera o desvío a un aeródromo adecuado; el ejercicio no fija un lugar ni una hora de mejora.",
      },
      {
        kind: "reconoce",
        titulo: "Lluvia y capa baja en un aeródromo",
        intro: "La escena ayuda a reconocer precipitación y horizonte degradado en un punto de la ruta. No identifica qué frente hay ni ofrece un techo medido.",
        imagen: {
          src: "/modulos/meteorologia/mt-t11-01-techo-lluvia-ruta.webp",
          alt: "Aeronave estacionada en un aeródromo bajo una capa extensa de nubes bajas y lluvia que reduce la nitidez de los hangares distantes",
          ancho: 1600,
          alto: 800,
        },
        puntos: [
          { x: 55, y: 24, que: "Capa extensa", significa: "La nube cubre gran parte del cielo, pero la fotografía no permite determinar su base en pies.", piloto: "Consulta techo y cobertura informados, pronóstico y mínimos del aeródromo." },
          { x: 72, y: 49, que: "Fondo poco nítido", significa: "Lluvia y bruma reducen el contraste a distancia; no se puede estimar la visibilidad en metros con esta imagen.", piloto: "Revisa visibilidad o alcance visual en pista reportados y su tendencia." },
          { x: 36, y: 76, que: "Plataforma mojada", significa: "La superficie refleja lluvia reciente o en curso; no revela por sí sola el estado de la pista operativa.", piloto: "Solicita información vigente de condición de pista y aplica los cálculos de performance del operador." },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** lluvia, plataforma mojada y nube extendida. **Cómo lo reconoces:** el fondo pierde contraste y la cubierta nubosa domina el cielo. **Qué decides:** comprobar techo, visibilidad, condición de pista, tendencia y mínimos; la foto no permite asignar el fenómeno a un frente cálido ni calcular los valores operativos.",
      },
      {
        kind: "sub",
        text: "Un patrón posible de frente cálido",
      },
      {
        kind: "fichas",
        columnas: 3,
        items: [
          {
            titulo: "Antes de que pase",
            puntos: [
              "El ascenso gradual del aire cálido puede extender capas de nubes por delante del frente en superficie.",
              "Con humedad suficiente puede aparecer precipitación extensa; su fase e intensidad dependen del perfil térmico.",
              "Vigila tendencias de techo, visibilidad, temperatura, punto de rocío y presión, sin asumir una secuencia fija.",
            ],
          },
          {
            titulo: "Durante el paso",
            puntos: [
              "Pueden cambiar viento, temperatura y punto de rocío cerca del límite en superficie.",
              "La lluvia o llovizna y el techo bajo pueden continuar; un cambio de viento no garantiza visibilidad suficiente.",
              "Compara observaciones sucesivas con el pronóstico a la hora de llegada.",
            ],
          },
          {
            titulo: "Después",
            puntos: [
              "El aire cálido ocupa la superficie, pero puede conservar humedad, nube baja o precipitación.",
              "La mejora no es automática ni inmediata; revisa condiciones reales del destino y alterno.",
            ],
          },
        ],
      },
      {
        kind: "titulo",
        text: "Escenario 2: frente frío en el mismo tramo",
      },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Salida de Junín",
            texto: "El ejercicio parte con 5 km de visibilidad por humo y nubosidad dispersa a 3.500 ft; el dato exige análisis aunque no haya tormenta local.",
          },
          {
            rotulo: "Hacia Paraná",
            texto: "Aparece mayor desarrollo vertical y la presión desciende. El escenario informa nubes a 2.500 ft y visibilidad de 10 km.",
          },
          {
            rotulo: "Aproximándose a Paraná",
            texto: "El caso sitúa tormentas y chubascos fuertes cerca del punto medio, con techo de 1.000 ft y visibilidad de 5 km. La ruta, no solo el destino, requiere una decisión.",
            fuerte: true,
          },
          {
            rotulo: "Formosa",
            texto: "El ejercicio plantea 15 km de visibilidad y nubes dispersas en el destino, pero eso no convierte en seguro el tramo convectivo intermedio.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "El destino favorable no borra el peligro en ruta",
        text: "En este caso la zona convectiva queda antes del destino. No se planea atravesar la célula ni pasar bajo ella para alcanzar tiempo mejor del otro lado. Para una operación de aerolínea se evalúan cambios de ruta o nivel cuando sean seguros y estén autorizados, demora, alternos y combustible, con radar y avisos vigentes. Si no hay trayectoria segura, se retrasa la salida o se desvía según corresponda.",
      },
      {
        kind: "sub",
        text: "Comparar patrones, sin convertirlos en reglas fijas",
      },
      {
        kind: "table",
        head: ["", "Frente cálido", "Frente frío"],
        rows: [
          ["Estructura habitual", "Ascenso más gradual del aire cálido", "Aire frío avanza bajo el cálido; ascenso a veces más concentrado"],
          ["Nubosidad posible", "Capas extensas con humedad suficiente", "Nubosidad convectiva si hay humedad e inestabilidad"],
          ["Precipitación posible", "Puede extenderse por delante del frente en superficie", "Puede concentrarse cerca del límite o aparecer delante en una línea prefrontal"],
          ["Riesgos para el vuelo", "Techo, visibilidad, hielo o precipitación según el perfil", "Convección, ráfagas, cizalladura o granizo cuando se desarrollan tormentas"],
          ["Después del paso", "Puede seguir nuboso o húmedo", "Puede mejorar, pero no se garantiza cielo despejado ni visibilidad ilimitada"],
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "La convección también puede estar delante",
        text: "Una línea de turbonada o convección prefrontal puede formarse por delante de un frente frío. No hay una distancia universal que la descarte. El análisis de superficie localiza el frente; radar, imágenes, pronóstico y avisos muestran dónde está la amenaza para la ruta y la hora del vuelo.",
      },
      {
        kind: "check",
        question:
          "El análisis sitúa un frente frío lejos de tu ruta. ¿Puedes concluir que también están lejos las tormentas?",
        options: [
          "Sí: toda tormenta coincide exactamente con la línea frontal de la carta",
          "No: puede haber convección prefrontal; verifico radar, avisos y tendencia para mi ruta y hora",
          "Sí, si el pronóstico del destino muestra buena visibilidad",
        ],
        answer: 1,
        explain:
          "La convección puede desarrollarse delante del frente frío. La línea frontal no es el borde de todos sus peligros y no existe una distancia fija que garantice seguridad. Comprueba información vigente para toda la ruta.",
      },
      {
        kind: "sub",
        text: "Cuando el frente frío tiene convección activa",
      },
      {
        kind: "vinetas",
        items: [
          "El contraste térmico, la humedad, la inestabilidad y el ascenso determinan dónde se desarrollan nubes y precipitación.",
          "Las células pueden organizarse en líneas cerca del frente o por delante de él; un claro visual no valida por sí solo un corredor.",
          "La precipitación intensa puede atenuar el radar de a bordo y ocultar actividad detrás de los ecos fuertes.",
          "La salida de aire de una tormenta puede producir ráfagas y cizalladura fuera de la cortina de lluvia visible.",
          "Después del paso puede mejorar el tiempo o persistir nubosidad, viento fuerte y precipitación; confirma la tendencia observada.",
        ],
      },
      {
        kind: "infografia",
        nombre: "meteo-ruta",
      },
      {
        kind: "p",
        text: "**Qué ves en el esquema:** dos cortes verticales idealizados: ascenso gradual del aire cálido y ascenso más concentrado ante aire frío. **Cómo los reconoces:** compara la pendiente y la distribución ilustrativa de nubes, no una posición real de tormentas. **Qué decides:** usar análisis y avisos vigentes para el trayecto; el dibujo no garantiza precipitación ni una zona segura de cruce.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En el despacho y luego en ruta",
        situacion:
          "El pronóstico del destino es favorable, pero una línea de tormentas afecta el tramo medio de la ruta prevista. El combustible calculado alcanza para llegar por la ruta original; todavía no has confirmado margen para rodear el sistema ni un alterno adecuado.",
        pregunta: "¿Qué revisarías antes de salir y qué harías si la línea bloquea el trayecto en vuelo?",
        claves: [
          "Antes de salir, analiza radar, avisos, movimiento de células y pronóstico para toda la ruta, no solo el destino.",
          "No planees penetrar tormentas ni pasar por debajo de ellas. Un cambio de nivel o un rodeo solo sirve si permite margen seguro y está autorizado según el operador.",
          "Calcula combustible para la ruta revisada, contingencias y alterno; poder llegar por la ruta original no prueba que puedas desviarte con seguridad.",
          "En vuelo, coordina temprano con control y la tripulación. Si no existe ruta segura dentro de las limitaciones, espera o desvía conforme al plan y procedimientos.",
        ],
        cierre:
          "Un destino despejado no compensa una ruta bloqueada. La decisión segura depende de información actualizada, márgenes de separación, combustible y opciones viables, no de alcanzar a toda costa el lado de buen tiempo.",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Aplica los procedimientos de tu operación",
        text: "Los márgenes frente a células, el empleo del radar, los desvíos y las reservas de combustible se rigen por normativa y procedimientos del explotador para el avión y la ruta. Coordina con despacho y control según corresponda. Reconocer un patrón frontal ayuda a anticipar amenazas; no reemplaza esos requisitos.",
      },
    ],
  },

  // ── 12 ──────────────────────────────────────────────────────────────────
  {
    n: 12,
    title: "Tormentas y sus peligros",
    kicker: "Reconoce la convección y conserva una salida segura",
    minutes: 11,
    blocks: [
      {
        kind: "p",
        text: "**Qué ves en la portada:** un cumulonimbo distante con yunque, cortina de lluvia y descarga eléctrica, observado desde un aeródromo. **Cómo lo reconoces:** el desarrollo vertical contrasta con la nube extendida en la cima y la precipitación bajo la base. **Qué decides:** consultar radar, avisos y evolución antes de planear salida o aproximación; la foto no permite medir la distancia ni delimitar una zona segura.",
      },
      {
        kind: "p",
        text: "Una tormenta puede combinar turbulencia, granizo, cizalladura, hielo, rayos y baja visibilidad. **No todas presentan todos esos peligros ni al mismo tiempo**, y la ausencia de un indicio visible no descarta los demás. Para una tripulación de aerolínea, identificar la célula es el comienzo: hay que evaluar su movimiento, su organización y las opciones de ruta, combustible y alternos.",
      },
      {
        kind: "sub",
        text: "Ver: qué hace falta para que nazca una",
      },
      {
        kind: "secuencia",
        titulo: "Tres condiciones que favorecen su formación",
        numerada: true,
        items: [
          "Humedad suficiente para alimentar la nube.",
          "Aire inestable que pueda seguir ascendiendo.",
          "Un mecanismo de ascenso inicial, como calentamiento, convergencia, relieve o un frente.",
        ],
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Célula aislada",
            puntos: [
              "Puede desarrollarse por calentamiento de superficie en aire húmedo e inestable, sin coincidir con un frente.",
              "Una célula suele evolucionar en menos tiempo que un sistema multicelular; su duración e intensidad no se deducen solo de su apariencia.",
              "También puede producir rayos, lluvia intensa, granizo o corrientes descendentes peligrosas.",
            ],
          },
          {
            titulo: "Convección organizada",
            puntos: [
              "Varias células pueden agruparse o alinearse por convergencia, frentes y cizalladura del viento con la altura.",
              "Algunas tormentas con corrientes ascendentes persistentes duran mucho más que una célula aislada.",
              "Una línea puede bloquear una ruta extensa y regenerar células aunque otras se debiliten.",
            ],
          },
        ],
      },
      {
        kind: "sub",
        text: "Entender: tres etapas de una célula, no de todo un sistema",
      },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Cúmulo",
            texto: "Predomina la corriente ascendente y la nube crece en forma de torre. La precipitación todavía no domina la célula, pero su evolución puede ser rápida y no se interpreta como un corredor seguro.",
          },
          {
            rotulo: "Madurez",
            texto: "Cuando comienza la precipitación y coexisten ascendentes y descendentes, la célula alcanza su fase madura, habitualmente la más peligrosa. La lluvia o el granizo arrastran aire hacia abajo; al extenderse cerca del suelo, ese aire puede crear ráfagas y cizalladura antes de que llegue la lluvia. No hay un minuto fijo para este cambio.",
            fuerte: true,
          },
          {
            rotulo: "Disipación",
            texto: "La descendente domina y la ascendente que alimentaba esa célula se debilita. Pueden persistir precipitación, rayos o salida de aire; en una línea o grupo, otras células pueden seguir intensas o nacer de nuevo.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "El yunque no marca el final",
        text: "La cima puede extenderse en forma de yunque ya durante la madurez. **Ver el yunque no demuestra que la célula se disipe.** Puede haber granizo y turbulencia lejos de la cortina de lluvia, incluso bajo el yunque. La secuencia siguiente simplifica una célula individual; un sistema multicelular contiene etapas distintas a la vez.",
      },
      {
        kind: "infografia",
        nombre: "meteo-etapas",
      },
      {
        kind: "p",
        text: "**Qué ves en el esquema:** el predominio de ascensos, la coexistencia de corrientes y, luego, el dominio de descensos en una célula idealizada. **Cómo lo reconoces:** compara flechas y precipitación; el yunque puede aparecer antes de la disipación. **Qué decides:** no usar esta secuencia para calcular cuándo será seguro pasar cerca de un sistema real.",
      },
      {
        kind: "reconoce",
        titulo: "El frente de ráfaga puede adelantarse a la lluvia",
        intro: "La nube de borde y la manga de viento muestran indicios visibles de salida de aire; la fotografía no mide la cizalladura.",
        imagen: {
          src: "/modulos/meteorologia/mt-t12-02-frente-rafaga.webp",
          alt: "Desde el borde de un aeródromo, nube baja horizontal delante de la cortina de lluvia de una tormenta y manga de viento extendida",
          ancho: 1600,
          alto: 800,
        },
        puntos: [
          { x: 54, y: 32, que: "Nube de borde", significa: "Una nube horizontal puede acompañar el frente de ráfaga; por sí sola no cuantifica el viento.", piloto: "Revisa avisos, viento observado y alertas de cizalladura antes de operar cerca del aeródromo." },
          { x: 85, y: 48, que: "Lluvia detrás", significa: "La precipitación intensa queda más atrás que parte del borde nuboso; la salida de aire puede precederla.", piloto: "No esperes a que la lluvia alcance la pista para considerar el riesgo." },
          { x: 9, y: 42, que: "Manga extendida", significa: "Indica viento local en ese instante, sin describir todo el campo de viento de la pista.", piloto: "Confirma dirección, intensidad y variaciones con reportes y procedimientos vigentes." },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** una nube baja de borde, una cortina de lluvia más atrás y una manga extendida. **Cómo lo reconoces:** el borde de la nube precede a parte de la precipitación. **Qué decides:** tratar la posible ráfaga y cizalladura como amenaza para despegue o aterrizaje, consultar alertas y no inferir una distancia segura de la foto.",
      },
      {
        kind: "sub",
        text: "Interpretar: los peligros, uno a uno",
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Lo que hay dentro del paquete",
        items: [
          {
            titulo: "Turbulencia",
            puntos: [
              "Las ascendentes, descendentes y su cizalladura pueden generar turbulencia severa dentro y fuera de la nube.",
              "Un eco libre de precipitación no garantiza aire libre de turbulencia: el radar meteorológico detecta hidrometeoros, no turbulencia directamente.",
              "La salida de aire puede avanzar delante de la lluvia y cambiar el viento con rapidez cerca del suelo.",
            ],
            nota: "Una nube de borde puede alertar sobre la salida de aire, pero la cizalladura también puede existir sin una señal visual nítida.",
          },
          {
            titulo: "Granizo",
            puntos: [
              "Se forma al crecer partículas de hielo en regiones de fuertes ascendentes con agua sobreenfriada.",
              "Puede ser pequeño o grande; incluso granizo no observado desde cabina puede dañar parabrisas, radomo, bordes de ataque o motores.",
              "Puede caer fuera de la nube visible o bajo el yunque, por lo que evitar solo la cortina de lluvia no basta.",
            ],
          },
          {
            titulo: "Engelamiento",
            puntos: [
              "Las ascendentes pueden mantener gotas de agua sobreenfriada a temperaturas inferiores a 0 °C.",
              "Al impactar en el avión, esas gotas pueden formar hielo; también existen riesgos asociados a cristales de hielo en ciertas zonas convectivas.",
              "La intensidad y el tipo de acumulación dependen del contenido de agua, tamaño de gota, temperatura y aeronave; no se predicen con una sola temperatura.",
            ],
            nota: "Aplica las limitaciones y procedimientos de protección contra hielo del avión; la presencia de nube y frío requiere evaluación, no una regla automática.",
          },
          {
            titulo: "Tornados",
            puntos: [
              "Algunas tormentas severas con rotación pueden producir tornados o mangas marinas; no toda tormenta los genera.",
              "Un embudo visible que no alcanza la superficie no demuestra que el resto de la célula sea seguro.",
              "El vórtice y la convección asociada pueden quedar ocultos por nube o lluvia: evita la zona, no intentes identificar un pasillo desde cabina.",
            ],
          },
          {
            titulo: "Rayos",
            puntos: [
              "Puede ocurrir dentro o cerca de la tormenta, incluso fuera de la lluvia intensa.",
              "Una descarga puede afectar temporal o permanentemente sistemas y estructura; se aplican las listas y revisiones del avión tras un impacto sospechado.",
              "El resplandor también puede perjudicar momentáneamente la visión nocturna de la tripulación.",
            ],
          },
          {
            titulo: "Visibilidad y presión",
            puntos: [
              "La lluvia intensa y el polvo levantado por la salida de aire pueden degradar con rapidez la visibilidad en aproximación o superficie.",
              "La presión local puede variar al paso de una tormenta; comprueba los ajustes de altímetro y la información actual del aeródromo.",
              "Una lectura de presión actualizada no elimina cizalladura, turbulencia ni mínimos meteorológicos insuficientes.",
            ],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Granizo en plataforma: el peligro no termina en la nube",
        intro: "La escena muestra granizo después de un chubasco convectivo. Su tamaño visible no permite calcular el que pudo existir en vuelo.",
        imagen: {
          src: "/modulos/meteorologia/mt-t12-01-granizo-plataforma.webp",
          alt: "Granizos esparcidos sobre plataforma mojada de aeropuerto observados desde un edificio, con aeronave estacionada y lluvia al fondo",
          ancho: 1600,
          alto: 800,
        },
        puntos: [
          { x: 53, y: 84, que: "Granizos en el suelo", significa: "Las piedras de hielo confirman precipitación sólida reciente en este lugar, pero no revelan la distribución en altura.", piloto: "Valora el reporte meteorológico y la inspección requerida antes de reanudar la operación." },
          { x: 84, y: 22, que: "Cortina al fondo", significa: "La precipitación activa se concentra más lejos; el granizo puede caer separado del núcleo de lluvia más visible.", piloto: "Mantén separación de toda la célula y considera el yunque, no solo el borde de la lluvia." },
          { x: 48, y: 30, que: "Aeronave estacionada", significa: "La foto no demuestra daño ni aptitud para salir después del evento.", piloto: "Sigue las verificaciones de mantenimiento y operación aplicables si se sospecha impacto." },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** granizos sobre una plataforma mojada, lluvia al fondo y una aeronave inmóvil. **Cómo lo reconoces:** las partículas de hielo resaltan sobre el pavimento. **Qué decides:** no deducir del tamaño en tierra el riesgo en altura ni declarar apta la aeronave; evalúa la célula y aplica las inspecciones que correspondan.",
      },
      {
        kind: "sub",
        text: "La línea de turbonada",
      },
      {
        kind: "definicion",
        text: "Una línea de turbonada (squall line) es una banda estrecha de tormentas activas. Suele desarrollarse en o delante de un frente frío con aire húmedo e inestable, pero puede aparecer en aire inestable lejos de cualquier frente.",
      },
      {
        kind: "vinetas",
        items: [
          "Puede abarcar una extensión que obligue a replantear la ruta completa, los alternos y el combustible.",
          "Sus células no tienen por qué madurar o disiparse juntas; una aparente abertura puede cerrarse con nuevos desarrollos.",
          "Su intensidad y horario dependen del sistema y la región. No existe una hora del día que autorice cruzarla.",
        ],
      },
      {
        kind: "check",
        question:
          "El radar muestra una línea de tormentas sobre la ruta prevista y un hueco estrecho entre ecos intensos. ¿Qué haces antes de aceptar ese paso?",
        options: [
          "Cruzo por el hueco: donde el radar no muestra lluvia tampoco hay turbulencia",
          "Evalúo separación, tendencia, atenuación del radar y ruta alternativa con tripulación y control; si no hay corredor seguro, no lo cruzo",
          "Espero a que anochezca, porque la convección deja de ser peligrosa al perder calentamiento solar",
        ],
        answer: 1,
        explain:
          "Un hueco visual o en la presentación del radar no garantiza separación de turbulencia, granizo ni nuevas células. Verifica la evolución y los límites del radar, coordina una alternativa viable y conserva combustible y alternos. Si no hay paso seguro, cambia la ruta o demora la operación.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Referencia de separación, no garantía",
        text: "La guía de la Administración Federal de Aviación (FAA, Federal Aviation Administration) recomienda evitar por al menos 20 millas náuticas (NM, nautical miles) las tormentas identificadas como severas o con eco de radar intenso, especialmente bajo el yunque. No es un límite universal de seguridad: una situación concreta o el procedimiento del explotador pueden exigir más distancia. Si no existe un rodeo seguro, cambia la ruta, demora la salida o desvía el vuelo según la fase de operación.",
        sellos: ["20 NM: referencia FAA", "No pasar bajo el yunque", "Conservar alternativa"],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Radar y vista exterior se complementan",
        text: "El radar de a bordo muestra principalmente precipitación y puede atenuarse detrás de ecos fuertes; no mide directamente la turbulencia ni revela todo el granizo. Usa además avisos, observaciones, reportes de otras aeronaves y la evolución del sistema. Nunca trates un sector sin eco o sin relámpagos visibles como autorización automática para entrar.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Antes de salir y durante el vuelo",
        situacion: "Una línea convectiva se desplaza hacia tu ruta. El destino tiene buen tiempo, pero el rodeo previsto aumentaría tiempo y consumo; el alterno y la reserva se calcularon para el trayecto original.",
        pregunta: "¿Qué debe resolver la tripulación con despacho y control antes de comprometerse con el cruce o el rodeo?",
        claves: [
          "Actualiza radar, avisos, movimiento de las células, condiciones de salida, ruta y destino; no uses una sola imagen retrasada.",
          "Comprueba un rodeo con separación y autorización adecuadas, sin penetrar ecos intensos ni pasar bajo el yunque.",
          "Recalcula combustible, contingencias y alternos para la ruta viable; un destino despejado no compensa una ruta bloqueada.",
          "Si no hay solución segura, demora la salida o coordina espera o desvío en vuelo conforme a los procedimientos de la operación.",
        ],
        cierre: "La decisión se toma antes de perder opciones de combustible o ruta. Una línea de tormentas no se atraviesa por cumplir el horario.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué hace falta para que se forme una tormenta y cuáles son sus etapas?",
            respuesta:
              "Se necesitan humedad, inestabilidad y un mecanismo de ascenso. En una célula individual, el cúmulo crece con ascendentes predominantes; la fase madura combina ascendentes, descendentes y precipitación; en la disipación domina la descendente. No existe un tiempo fijo para el cambio ni el yunque indica por sí solo disipación. En un sistema multicelular pueden coexistir células en fases distintas.",
            claves: ["Humedad, inestabilidad y ascenso", "Cúmulo, madurez y disipación", "El yunque no prueba disipación"],
          },
          {
            nivel: "interpretacion",
            q: "¿A qué distancia rodearía una tormenta severa y por qué?",
            respuesta:
              "La FAA da como referencia al menos 20 millas náuticas para una tormenta severa o un eco intenso, especialmente bajo el yunque. Es un mínimo orientativo de esa guía, no una distancia universalmente segura: granizo y turbulencia pueden extenderse fuera de la nube. Aplico las separaciones y procedimientos de mi operador y, si no hay rodeo seguro, busco otra ruta o demoro el vuelo.",
            claves: ["20 NM como referencia FAA", "No garantiza seguridad", "Procedimiento del operador y alternativa"],
          },
          {
            nivel: "situacion",
            q: "El destino está despejado pero una línea convectiva bloquea la ruta. ¿Qué decide?",
            respuesta:
              "No intento cruzar por horario ni por un hueco sin eco. Actualizo radar y avisos, evalúo movimiento y separación, y coordino con la tripulación, despacho y control una ruta viable. Compruebo combustible y alternos para esa opción; si no existe margen seguro, demoro o desvío según la fase del vuelo.",
            claves: ["La ruta importa aunque el destino esté bien", "Rodeo y combustible viables", "Demora o desvío si no hay opción segura"],
          },
        ],
      },
    ],
  },
]
