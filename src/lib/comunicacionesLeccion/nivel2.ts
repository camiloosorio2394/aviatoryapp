/**
 * Nivel 2 · El idioma (lecciones 08 a 11, capítulos 8 a 11 de la especificación).
 *
 * El inglés de la radio no es el inglés académico: aquí se separan el inglés
 * general, el Aviation English, la fraseología y el plain language, y se
 * repasan las palabras estándar que no admiten sinónimos.
 *
 * Fuente editorial inicial: docs/comunicaciones/nivel-2.md. Las lecciones
 * revisadas distinguen formulaciones publicadas de análisis didácticos,
 * señalan lo pendiente de verificar y evitan intercambios locales inventados.
 * El formato de los bloques está documentado al inicio de index.ts.
 */

import type { DocBlockData, DocScreen } from "@/lib/docBlocks"

/** Un error frecuente: el nombre del error como título y la explicación. */
function error(titulo: string, text: string): DocBlockData {
  return { kind: "callout", tone: "warn", title: titulo, text }
}

export const NIVEL_2: DocScreen[] = [
  // ── 08 ──────────────────────────────────────────────────────────────────
  {
    n: 8,
    title: "Aviation English",
    kicker: "Comunicar con eficacia, no con sofisticación",
    minutes: 13,
    blocks: [
      {
        kind: "p",
        text: "El nivel 1 enseñó el mecanismo (servicios, principios, alfabeto, números, distintivos y estructura de una transmisión). Este nivel trata el idioma con el que se usa ese mecanismo: qué inglés se habla en frecuencia, qué exige la Organización de Aviación Civil Internacional (OACI; International Civil Aviation Organization, ICAO), cuándo se usa fraseología y cuándo lenguaje común, y por qué la tripulación debe verificar que su mensaje produjo la comprensión y la acción correctas.",
      },
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "«Aviation English» es el nombre con el que la instrucción conoce el inglés que se usa en la radiotelefonía aeronáutica. La OACI no lo mide por lo culto o lo correcto que suene, sino por si funciona: un mensaje claro, preciso, comprensible, conciso, sin ambigüedad y que produce la acción correcta en la cabina y en la consola.",
      },
      {
        kind: "p",
        text: "El Doc 9835 ordena el terreno en capas que conviene tener claras (3.2.6 y 3.2.7):",
      },
      {
        kind: "table",
        head: ["Capa", "Qué es", "Quién la usa", "Ejemplo"],
        rows: [
          [
            "**General English**",
            "El idioma de todos los días: conversación, prensa, cine.",
            "Cualquiera",
            "«Could you possibly let us go a bit lower?»",
          ],
          [
            "**Lenguaje aeronáutico** (lo que en instrucción se llama Aviation English en sentido amplio)",
            "Todo el uso del idioma en la aviación: ingeniería, mantenimiento, despacho, operaciones, servicio al pasajero.",
            "Toda la industria",
            "Un manual de mantenimiento, un briefing de despacho",
          ],
          [
            "**Radiotelefonía aeronáutica**",
            "La subcategoría que miden los requisitos de competencia lingüística de la OACI. Solo pilotos y controladores. Comprende **fraseología normalizada + lenguaje común**.",
            "Pilotos y ATC",
            "Todo lo que se dice en la frecuencia",
          ],
          [
            "**Fraseología normalizada (RT phraseology)**",
            "Un «sublenguaje» restringido y codificado: cada palabra tiene un significado fijo.",
            "Pilotos y ATC",
            "«REQUEST DESCENT» (fragmento del Doc 9432; la llamada completa incluye distintivo)",
          ],
          [
            "**Lenguaje común (plain language)**",
            "«Uso espontáneo, creativo y no codificado de un idioma natural dado» (Doc 9835, glosario), dentro de los temas de la radiotelefonía y con inteligibilidad, precisión, propiedad, univocidad y concisión (3.3.14).",
            "Pilotos y ATC, cuando la fraseología no alcanza",
            "«We have a passenger with severe chest pain»",
          ],
        ],
      },
      {
        kind: "p",
        text: "Las tres últimas capas son las que importan al piloto en la frecuencia. El capítulo 10 trabaja la frontera entre fraseología y lenguaje común.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-08-01.svg",
        alt: "Conjuntos anidados: inglés general, inglés aeronáutico y radiotelefonía; dentro de la radiotelefonía aparecen fraseología normalizada y lenguaje común.",
        ancho: 1200,
        alto: 900,
        pie: "Reconoce qué registro exige la situación: use fraseología para lo previsto y lenguaje común directo cuando aquella no alcance. En ambos casos, confirme que el otro comprendió la condición y la acción necesaria. Amplía la lámina para seguir los niveles. Esquema basado en el Doc 9835, 3.2.6–3.3.14.",
      },

      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "p",
        text: "**1. La fraseología es un idioma reducido a propósito.** El Doc 9835 (3.3.10) describe sus rasgos: vocabulario de unas 400 palabras con significado preciso, oraciones cortas sin artículos, sin pronombres, sin verbos auxiliares y con pocas preposiciones; cerca de la mitad de las oraciones son imperativas o pasivas. Por eso «Cleared to land» y no «You are now cleared to land on the runway». Quitar palabras no es pobreza del idioma: es lo que reduce la ambigüedad.",
      },
      {
        kind: "p",
        text: "**2. Lo que se mide no es el acento, es la inteligibilidad.** El nivel operacional de la OACI «no apunta a un alto grado de corrección gramatical ni una pronunciación de hablante nativo» (Doc 9835 4.5.5 c). La escala no toma al hablante nativo como modelo (4.5.10), y a los hablantes nativos también se les exige modular su inglés para ser entendidos (3.3.3 b; 5.3.1.4 d).",
      },
      {
        kind: "p",
        text: "**3. El inglés informal es un riesgo operacional.** El Doc 9835 pide evitar la jerga de la calle, las jergas de otras disciplinas (por ejemplo la militar) y todo lo que dificulte la comprensión (3.3.9); y recuerda que los modismos «atentan contra la inteligibilidad» (4.6.4, nivel experto). El Preámbulo del Doc 9432 lo resume: las declaraciones directas sin expresiones idiomáticas se entienden mejor que las indirectas, coloquiales o informales.",
      },
      {
        kind: "p",
        text: "**4. El idioma de la frecuencia.** Según el Anexo 10, Vol. II, 5.2.1.2, citado en el Doc 9835 4.3.5, la radiotelefonía se hace en el idioma de la estación terrestre o en inglés, y el inglés debe estar disponible en las estaciones que atienden rutas y aeropuertos de servicios internacionales. El Doc 9835 menciona operaciones de México, Centroamérica y parte de Sudamérica en las que puede escucharse español e inglés en una misma frecuencia. Eso no permite afirmar que **todas** las frecuencias de la región sean bilingües: el idioma disponible y las condiciones de uso se confirman en la publicación del Estado. Cuando dos idiomas coexisten, el piloto que no entiende uno de ellos pierde parte de la conciencia del tránsito, riesgo señalado en el Doc 9835, 3.3.22.",
      },
      {
        kind: "p",
        text: "**5. Por qué la OACI insiste tanto.** El Doc 9835 (3.3.7) trae dos malentendidos por errores de expresión:",
      },
      {
        kind: "list",
        items: [
          "«Descend two four zero zero feet»: la similitud entre «two» y «to» hizo que el piloto entendiera 400 pies en lugar de 2 400. La aeronave se estrelló contra el suelo. (Por eso el Doc 9432 2.4.3 manda transmitir las altitudes en millares y centenas enteros como «two thousand four hundred».)",
          "«We are at take-off»: el controlador entendió que la aeronave esperaba en posición; en realidad ya estaba acelerando. Con neblina, chocó con otra aeronave. (Por eso el Doc 9432 2.8.3.3 reserva la palabra TAKE-OFF para la autorización de despegue o su anulación.)",
        ],
      },
      { kind: "p", text: "El documento no nombra los sucesos; aquí tampoco." },

      { kind: "sub", text: "De la fraseología al lenguaje común" },
      {
        kind: "p",
        text: "**En operación no se elige entre hablar bonito y hablar corto.** Primero se decide si la situación tiene fraseología publicada. Si la tiene, se usa completa y en el orden que corresponde; el resto del mensaje se adapta a la fase y a la autorización vigente. Si una falla, una persona enferma o una limitación de la aeronave no caben en esa fraseología, se pasa a lenguaje común directo: condición, capacidad, intención y ayuda solicitada. La tripulación comprueba después qué entendió la dependencia. El análisis del vuelo Avianca 052 en la lección anterior muestra por qué una expresión verdadera pero ambigua no basta para comunicar una emergencia.",
      },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Solicitud normal: fraseología disponible",
            codigo: "DOC 9432, 3.3.3.1 · REQUEST DESCENT / LEAVING FL 90 DESCENDING TO FL 60",
            texto: "Estos son **fragmentos de ejemplo del Manual de Radiotelefonía**, no el diálogo completo de un vuelo ni una autorización local. El primero expresa la solicitud sin rodeos; el segundo informa tanto el nivel que se abandona como el autorizado. Un piloto de aerolínea no comunica solo la palabra DESCENT ni mueve el selector antes de escuchar una autorización: integra distintivo, límite vertical, restricciones asociadas y colación que permita al controlador comprobar la interpretación. En una entrevista, el evaluador escucha si usted separa la solicitud de la autorización recibida y no confunde la frase corta del manual con una licencia para omitir contexto.",
          },
          {
            rotulo: "La palabra normalizada no se sustituye por una paráfrasis",
            texto: "El Doc 9835, 3.3.11, explica el riesgo de pronunciar una pista como «ten» cuando «one zero» diferencia los dígitos y evita confusión con «turn». El Doc 9432, 2.4.2, prescribe la pronunciación separada de las cifras de pista. Es una regla de identificación, no de estilo. Después de una autorización de aterrizaje, la tripulación comprueba el número y lado de pista contra la carta, las indicaciones de cabina y el entorno visual; una sílaba no entendida se aclara antes de interpretar la autorización como propia.",
          },
          {
            rotulo: "Situación no prevista: lenguaje común explícito",
            texto: "Si hay una falla hidráulica y la tripulación necesita tiempo para una lista de comprobación, el mensaje útil identifica el problema, lo que puede mantener la aeronave y la ayuda requerida. No hace falta fingir un rumbo, punto de espera o frecuencia para practicar esa decisión. Decir «tenemos un problema» sin explicar la consecuencia deja al controlador sin una imagen operativa; prometer una maniobra todavía no evaluada es igualmente deficiente. El Doc 9835, 5.3.3.4–5.3.3.7, insiste en declaraciones directas y en limitar la carga informativa por transmisión.",
          },
          {
            rotulo: "Caso documentado: US Airways 1549",
            texto: "El 15 de enero de 2009 el vuelo US Airways 1549 salió de LaGuardia hacia Charlotte. Tras el impacto con aves y la pérdida de empuje de ambos motores, la tripulación comunicó la condición a control de salida. El controlador ofreció opciones; cuando una pista no era alcanzable, el comandante expresó la imposibilidad y la posibilidad de amerizar en el Hudson. El informe de la Junta Nacional de Seguridad del Transporte de Estados Unidos (NTSB, National Transportation Safety Board) AAR-10/03, §1.1 y apéndice B, permite distinguir lo grabado de cualquier reconstrucción pedagógica. La lección lingüística es que «no podemos» y la alternativa prevista transmitieron una capacidad real que una colación cortés de una pista inviable habría ocultado. No se reutiliza aquí la historieta de la lección 1 ni se presenta esta síntesis como transcripción literal.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Antes de usarlo en una frecuencia real",
        text: "La fraseología concreta de motor y al aire, desvío por meteorología, espera y emergencia debe comprobarse en el **Doc 4444 y el Anexo 10 vigentes**, además de los procedimientos de la dependencia y del explotador. El idioma disponible en cada dependencia de Colombia se consulta en el **AIP/eAIP Colombia vigente, GEN 3.4**. Esta lección evita publicar rumbos, frecuencias o rutas supuestos como si fueran actuales.",
      },

      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Frecuencia bilingüe en Latinoamérica",
        texto:
          "Las autorizaciones a vuelos nacionales pueden salir en español y las de vuelos extranjeros en inglés. Un piloto de aerolínea escucha las dos: una instrucción en español a otro tráfico puede afectar su propia secuencia. Qué idioma se usa en cada dependencia lo publica el Estado (en Colombia, AIP GEN 3.4; VERIFICAR la versión vigente).",
      },
      {
        kind: "enLaOperacion",
        momento: "Cabina multicultural",
        texto:
          "En una aerolínea con tripulaciones de varios países, la fraseología es el idioma común de los dos pilotos, no solo del piloto con ATC. El Doc 9835 (5.3.3.5) usa un ejemplo de cabina: «¿Qué pasa con los flaps?» es peor que «Es preciso desplegar más los flaps».",
      },
      {
        kind: "enLaOperacion",
        momento: "Controladores anglófonos rápidos",
        texto:
          "En aeropuertos de alta densidad el controlador puede hablar rápido o con modismos. El Doc 9835 (3.3.3 b y 5.3.1.4 d) pone la carga también en el hablante experto, pero en la cabina la herramienta del piloto es pedir que se repita: SAY AGAIN o SPEAK SLOWER (capítulo 11).",
      },
      {
        kind: "enLaOperacion",
        momento: "Entrevista",
        texto:
          "Un evaluador de aerolínea que oye a un candidato decir «affirmative», «okay» o «we're gonna» en un ejercicio de radio no está evaluando su inglés: está evaluando su disciplina de fraseología.",
      },

      { kind: "sub", text: "Error frecuente" },
      error(
        "Traducir mentalmente del español",
        "«We are at take-off» (estamos en el despegue) reproduce el error que documenta el Doc 9835, 3.3.7 b).",
      ),
      error(
        "Adornar la fraseología",
        "Con cortesías y rellenos («please», «thank you very much», «uh», «okay»). El Doc 9432 2.2.1 g) pide evitar los sonidos de duda («humm», «este»).",
      ),
      error(
        "Salto de código",
        "El Doc 9835 (3.3.21) describe la mezcla de registros: meter palabras que no son normalizadas dentro de una frase normalizada, o alargar la frase normalizada con gramática común. El resultado ya no es ni fraseología ni lenguaje común claro.",
      ),
      error(
        "Creer que hablar rápido es hablar bien",
        "El Doc 9432 2.2.1 d) fija una velocidad que no exceda 100 palabras por minuto, y más lenta cuando el destinatario debe anotar.",
      ),
      error(
        "Suponer que el hablante nativo siempre tiene razón",
        "Si el mensaje no fue claro, el problema es del mensaje, no del oyente. Se pide repetición.",
      ),

      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "La radiotelefonía tiene dos registros: fraseología normalizada y lenguaje común. Los dos cuentan.",
          "Aviation English busca efectividad, no sofisticación: claro, preciso, conciso, sin ambigüedad.",
          "La fraseología es corta a propósito: sin artículos, sin pronombres, sin rellenos.",
          "Nada de jerga, modismos ni coloquialismos, aunque el otro los use.",
          "En algunas dependencias pueden coexistir español e inglés; confirme lo publicado y escuche al resto del tránsito.",
          "Una transmisión, una idea: problema, necesidad, intención.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 9835 · Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 9835 (2.ª ed.) glosario «Lenguaje común», 3.2.6, 3.2.7, 3.3.3, 3.3.7, 3.3.9, 3.3.10, 3.3.11, 3.3.14, 3.3.21, 3.3.22, 4.3.5, 4.5.5 c), 4.5.10, 4.6.4, 5.3.1.4 d), 5.3.2.2 y 5.3.3.4–5.3.3.7; Doc 9432 (4.ª ed.) Preámbulo, 2.2.1 d) y g), 2.4.2, 2.4.3, 2.8.3.3 y 3.3.3.1; NTSB AAR-10/03, §1.1 y apéndice B (https://www.ntsb.gov/investigations/accidentreports/reports/aar1003.pdf).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "Idioma de cada dependencia ATS en Colombia contra AIP/eAIP Colombia GEN 3.4 vigente.",
              "Fraseología concreta de motor y al aire, desvío por meteorología, espera y emergencia contra Doc 4444 y Anexo 10, Vol. II, vigentes antes de usarla en operación.",
            ],
          },
        ],
      },
    ],
  },

  // ── 09 ──────────────────────────────────────────────────────────────────
  {
    n: 9,
    title: "Competencia lingüística OACI",
    kicker: "Los seis niveles y qué exige el nivel 4",
    minutes: 14,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Son los requisitos de competencia lingüística de la Organización de Aviación Civil Internacional (OACI, International Civil Aviation Organization): el nivel de comprensión y expresión oral que deben acreditar quienes usan la radiotelefonía en operaciones internacionales. Están en el Anexo 1 (normas 1.2.9, descriptores integrales del Apéndice 1 y escala de calificación del Adjunto A) y los explica el Doc 9835. No se trata de sonar como hablante nativo, sino de transmitir y entender información operacional, incluso cuando la situación cambia.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Esto no es la preparación del examen",
        text: "La app tiene un módulo de Inglés OACI que entrena para la evaluación. **Este capítulo no prepara el examen**: explica qué significa, en la frecuencia, comunicarse al nivel que la OACI considera operacional.",
      },

      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "**La escala tiene seis niveles** (Doc 9835 4.5.6):" },
      {
        kind: "table",
        head: ["Nivel", "Nombre (Doc 9835, español)", "Nombre en inglés"],
        rows: [
          ["1", "Preelemental", "Pre-elementary"],
          ["2", "Elemental", "Elementary"],
          ["3", "Preoperacional", "Pre-operational"],
          ["4", "**Operacional**", "**Operational**"],
          ["5", "Avanzado", "Extended"],
          ["6", "Experto", "Expert"],
        ],
      },
      {
        kind: "p",
        text: "Los niveles 1 y 2 no cumplen el mínimo operacional. Esta lección se concentra en el umbral del 4 y sus diferencias con 3, 5 y 6; para usar la escala completa en una evaluación formal hay que consultar el Adjunto A del Anexo 1 vigente, no inferir descriptores a partir de los nombres de la tabla.",
      },
      {
        kind: "p",
        text: "**El nivel 4 es el mínimo operacional.** Desde el 5 de marzo de 2008 los pilotos de aviones, dirigibles, helicópteros y aeronaves de despegue vertical, los controladores y los operadores de estaciones aeronáuticas deben acreditar el nivel de comprensión y expresión oral del Apéndice 1 del Anexo 1 (Doc 9835 4.4.4 y 4.4.11). El nivel 4 es «el nivel mínimo de dominio considerado seguro para las comunicaciones de control del tránsito aéreo» (4.6.2). Cómo se acredita y se anota en la licencia lo decide la autoridad que otorga licencias (4.4.9); en Colombia, VERIFICAR contra el RAC 61.",
      },
      {
        kind: "p",
        text: "**Se califica en seis habilidades**: pronunciación, estructura, vocabulario, fluidez, comprensión e interacción (Pronunciation, Structure, Vocabulary, Fluency, Comprehension, Interactions) (Doc 9835 4.5.6).",
      },
      {
        kind: "p",
        text: "**La nota final es la más baja de las seis, no el promedio** (4.5.5 d y 4.5.11). En la lámina, una comprensión de 3 hace que el resultado global sea 3, aunque las otras habilidades estén en 4 o 5. El Doc 9835 ilustra la misma lógica con la pronunciación: una debilidad ahí puede impedir que el controlador comprenda al piloto.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-09-01.svg",
        alt: "Seis niveles de competencia lingüística OACI; el mínimo operacional empieza en cuatro. Ejemplo de seis habilidades: 5, 5, 4, 5, 3 y 5; la comprensión en tres fija el resultado global en tres.",
        ancho: 1600,
        alto: 900,
        pie: "Reconoce el nivel 4 como piso operacional. Si una sola habilidad queda en 3, el resultado global es 3 aunque las demás sean mayores; no promedies. Los valores son didácticos, no una evaluación real. Amplía la lámina para leer las seis habilidades. Basado en el Doc 9835, 4.5.5 y 4.5.11.",
      },
      { kind: "p", text: "**Nivel 4, descriptores textuales** (Doc 9835 4.6.2 a 4.6.7):" },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Pronunciación",
            tecnica: {
              rotulo: "Nivel 4, Operacional (texto del Doc 9835)",
              texto: "«La pronunciación, acentuación, ritmo y entonación tienen la influencia de la lengua primaria o de la variante regional pero sólo en algunas ocasiones interfieren en la facilidad de comprensión.»",
            },
            puntosRotulo: "Qué significa en la frecuencia",
            puntos: [
              "Se le nota el acento colombiano y está bien. Lo que no puede pasar es que el controlador tenga que pedir repetición a menudo.",
            ],
          },
          {
            titulo: "Estructura",
            tecnica: {
              rotulo: "Nivel 4, Operacional (texto del Doc 9835)",
              texto: "«Utiliza las estructuras gramaticales y sintácticas básicas creativamente, y por lo general con buen dominio. Puede cometer errores, especialmente en circunstancias inusuales o imprevistas, pero los errores rara vez interfieren con el significado.»",
            },
            puntosRotulo: "Qué significa en la frecuencia",
            puntos: [
              "Arma frases simples nuevas, no solo frases memorizadas. Un error de gramática que no cambia el sentido no es el problema.",
            ],
          },
          {
            titulo: "Vocabulario",
            tecnica: {
              rotulo: "Nivel 4, Operacional (texto del Doc 9835)",
              texto: "«La amplitud y precisión del vocabulario son por lo general suficientes para comunicarse eficazmente sobre temas comunes, concretos y relacionados con el trabajo. Con frecuencia puede parafrasear satisfactoriamente aunque carece del vocabulario necesario para desenvolverse en circunstancias extraordinarias o imprevistas.»",
            },
            puntosRotulo: "Qué significa en la frecuencia",
            puntos: ["Si no sabe la palabra técnica, la describe con palabras simples (capítulo 52)."],
          },
          {
            titulo: "Fluidez",
            tecnica: {
              rotulo: "Nivel 4, Operacional (texto del Doc 9835)",
              texto: "«Capaz de expresarse con frases largas a un ritmo apropiado. Ocasionalmente puede perder fluidez durante la transición entre un discurso practicado o formulado y la interacción espontánea pero sin impedir una comunicación eficaz. En su discurso emplea limitadamente acentuaciones o conjunciones. Las palabras superfluas no lo confunden.»",
            },
            puntosRotulo: "Qué significa en la frecuencia",
            puntos: ["Puede salir de la fraseología al lenguaje común sin quedarse mudo."],
          },
          {
            titulo: "Comprensión",
            tecnica: {
              rotulo: "Nivel 4, Operacional (texto del Doc 9835)",
              texto: "«Comprende con bastante exactitud temas comunes, concretos y relacionados con el trabajo, cuando el acento o las variantes utilizadas son suficientemente inteligibles para la comunidad internacional de usuarios. Cuando enfrenta complicaciones de carácter lingüístico o circunstancial o acontecimientos imprevistos su comprensión es más lenta o requiere estrategias de aclaración.»",
            },
            puntosRotulo: "Qué significa en la frecuencia",
            puntos: [
              "Entiende la rutina y, cuando algo se sale de lo esperado, pide aclaración en vez de suponer.",
            ],
          },
          {
            titulo: "Interacciones",
            tecnica: {
              rotulo: "Nivel 4, Operacional (texto del Doc 9835)",
              texto: "«Por lo general las respuestas son inmediatas, apropiadas e informativas. Inicia y sostiene intercambios verbales aun cuando trate sobre situaciones imprevistas. Ante posibles malentendidos verifica, confirma o clarifica adecuadamente.»",
            },
            puntosRotulo: "Qué significa en la frecuencia",
            puntos: ["Responde sin demora, inicia la conversación cuando la necesita y verifica lo dudoso."],
          },
        ],
      },
      { kind: "p", text: "**Lo que separa al 4 de sus vecinos**, según el mismo Doc 9835:" },
      {
        kind: "list",
        items: [
          "**Nivel 3**: la comprensión «se limita a las comunicaciones de rutina en condiciones óptimas»; no alcanza para sucesos imprevistos ni mala recepción (4.6.6). La respuesta suele ser inadecuada ante lo imprevisto (4.6.7).",
          "**Nivel 5**: parafrasea de forma coherente, comprende con exactitud incluso con complicaciones y entiende gran diversidad de acentos (4.6.4, 4.6.6).",
          "**Nivel 6**: excede lo que requieren las comunicaciones radiotelefónicas y «no es un requisito indispensable para una buena comunicación aeronáutica» (4.5.9).",
        ],
      },
      {
        kind: "p",
        text: "**Reevaluación.** Quien no alcanza el nivel 6 debe reevaluarse a intervalos (Anexo 1, 1.2.9.6, citado en Doc 9835 4.4.8 y 4.4.9); quien acredita el nivel 6 no necesita reevaluación periódica (Nota 1 de 1.2.9.7). La razón es la **pérdida del idioma** que puede darse en los niveles inferiores (4.4.7). La OACI recomienda tres años para el nivel 4 y seis para el 5, pero la autoridad aeronáutica de cada Estado establece el intervalo aplicable; hay que comprobar el de la licencia propia, sin convertir una recomendación en regla colombiana.",
      },
      {
        kind: "p",
        text: "**Fraseología y lenguaje común.** Los requisitos se aplican a los dos (Doc 9835 4.5.2), pero el dominio de la fraseología es una competencia operacional que se enseña y evalúa como tal; la evaluación lingüística se concentra en el lenguaje común (6.2.8.6). En palabras simples: saber de memoria «cleared for take-off» no demuestra nivel 4. Explicar en inglés simple un problema que no tiene frase hecha, sí.",
      },
      {
        kind: "p",
        text: "**El silencio no es comprensión.** El Doc 9835 (4.5.3 c y 4.6.7) insiste:",
      },
      {
        kind: "quote",
        text: "Es mucho más seguro repreguntar o pedir aclaración, incluso reconocer sencillamente que uno no ha entendido, que dejar que el silencio se interprete erróneamente como comprensión del mensaje.",
        source: "Doc 9835 4.5.3 c) y 4.6.7",
      },
      {
        kind: "p",
        text: "Y SAY AGAIN a veces debe entenderse como un pedido de aclaración, no de repetición literal: el controlador puede reformular.",
      },

      { kind: "sub", text: "Cómo se reconoce el nivel operacional en la frecuencia" },
      {
        kind: "p",
        text: "**Una calificación no sustituye el juicio en cabina.** El descriptor de comprensión del nivel 4 acepta que lo imprevisto tome más tiempo, pero exige una estrategia para aclararlo. Si la transmisión llega rápida, distorsionada o contiene un término desconocido, la acción competente es solicitar repetición o confirmación antes de ejecutar; asentir sin entender no demuestra fluidez. El Anexo 10, volumen II, 5.2.1.8, define **SAY AGAIN** para pedir repetición y **SPEAK SLOWER** para reducir la velocidad de habla. No hay que combinar palabras para inventar una frase que parezca normalizada.",
      },
      {
        kind: "p",
        text: "**Interacción y escucha son una sola barrera.** El Doc 9432, 2.8.3.9, ilustra la corrección de una colación errónea mediante **NEGATIVE, I SAY AGAIN**. El aprendizaje no es memorizar un número de presión: es notar la discrepancia, detener la cadena de supuestos y volver a confirmar el dato crítico. Para un piloto de aerolínea, esto abarca también autorizaciones, restricciones y pista asignada; la habilidad lingüística se vuelve útil cuando protege una decisión operacional concreta.",
      },
      {
        kind: "p",
        text: "**Parafrasear no es improvisar una autorización.** El descriptor de vocabulario permite describir con palabras simples un problema cuando falta el término exacto. El piloto puede explicar qué sistema falla, qué capacidad conserva y qué necesita, manteniendo las palabras normalizadas que sí correspondan. El controlador no debe tener que inferir si la aeronave puede aceptar descenso, mantener nivel o continuar la aproximación. Los procedimientos de emergencia y la coordinación con control de tránsito aéreo (ATC, air traffic control) se estudian aparte; aquí se evalúa si el mensaje es inteligible y permite una respuesta útil.",
      },
      {
        kind: "p",
        text: "**El caso que cita el propio manual.** El Doc 9835, 3.3.18, recoge una pregunta espontánea sobre quién precedía a una aeronave en la secuencia, mencionando a Air Europe. No ofrece una plantilla universal de respuesta para cada dependencia. Enseña que una duda operacional sin frase hecha exige lenguaje común claro y una respuesta que cierre la duda. Por eso no se recrea aquí un diálogo, una frecuencia, un rumbo o una matrícula no publicados.",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Antes de aplicar una regla de licencia",
        text: "La OACI recomienda reevaluar el nivel 4 cada tres años y el 5 cada seis; **cada autoridad fija el intervalo aplicable**. Confirma requisitos, anotación y vigencia en la regulación colombiana y en el Estado que expidió tu licencia antes de usar esta lección como guía de cumplimiento. La fuente abierta de OACI sobre licencias distingue recomendación internacional de obligación nacional.",
      },

      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Requisito de contratación",
        texto:
          "Para una operación internacional, la tripulación debe cumplir los requisitos lingüísticos aplicables y acreditar el nivel conforme a su licencia y al Estado que la expide. Las condiciones de selección de una aerolínea pueden ser adicionales; no se deducen de la escala OACI. En Colombia, confirma la anotación y vigencia contra la regulación aeronáutica vigente.",
      },
      {
        kind: "enLaOperacion",
        momento: "El nivel es un piso, no una meta",
        texto:
          "El Doc 9835 (4.4.7) explica que el nivel 4 está lejos del 6 y que puede haber pérdida de competencia lingüística; por eso existe la reevaluación periódica. Mantener práctica de escucha, aclaración y lenguaje común importa entre evaluaciones, no solo antes de presentar una prueba.",
      },
      {
        kind: "enLaOperacion",
        momento: "Nivel 4 no es lo que se ve en la entrevista",
        texto:
          "Una entrevista de selección no reemplaza una evaluación formal de competencia lingüística. Sí permite observar si el candidato comprende el escenario, responde con claridad y solicita aclaración cuando no entiende: conductas de «interacciones» y «comprensión» que también importan en operación.",
      },
      {
        kind: "enLaOperacion",
        momento: "Cabina con dos niveles distintos",
        texto:
          "Si uno de los pilotos tiene nivel 6 y el otro 4, repartir las comunicaciones por costumbre no exime al otro de comprender las autorizaciones. La asignación de funciones sigue los procedimientos operativos estandarizados (SOP, Standard Operating Procedures) del explotador, y ambos verifican los elementos críticos (capítulo 59).",
      },

      { kind: "sub", text: "Error frecuente" },
      error(
        "Callar por no quedar mal",
        "Aceptar una instrucción que no se entendió es exactamente lo que el Doc 9835 señala como más peligroso que preguntar (4.6.7).",
      ),
      error(
        "Leer ROGER como comprensión",
        "Del otro lado pasa igual: un «roger» sin colación no le dice al controlador que el piloto entendió (capítulo 11).",
      ),
      error(
        "Usar modismos para «subir de nivel»",
        "Los descriptores de los niveles altos mencionan estructuras complejas y modismos, pero el Doc 9835 (4.5.12 y 4.6.4) advierte que eso no autoriza a dejar la fraseología ni a usar modismos en la frecuencia.",
      ),
      error(
        "Confundir el examen con la operación",
        "Tener el nivel no garantiza entender a un controlador rápido con mala recepción. La estrategia sigue siendo: SAY AGAIN, CONFIRM, SPEAK SLOWER.",
      ),

      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Seis niveles: preelemental, elemental, preoperacional, operacional, avanzado, experto.",
          "El nivel 4 (operacional) es el mínimo para operar donde aplican los requisitos.",
          "Seis habilidades, y la nota final es la más baja de todas.",
          "El acento no es el problema; que interfiera con la comprensión, sí.",
          "Quien no es nivel 6 se reevalúa periódicamente: la OACI recomienda intervalos y cada autoridad fija los aplicables.",
          "El nivel 4 se nota en la frecuencia: responde rápido, parafrasea y verifica lo dudoso.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 9835 · Anexo 10 · Preguntas frecuentes OACI",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 9835 (2.ª ed.) 4.4.4, 4.4.7–4.4.11, 4.5.2, 4.5.3 c), 4.5.5 c) y d), 4.5.6, 4.5.9, 4.5.11, 4.5.12, 4.6.1–4.6.7, 3.3.18 y 6.2.8.6 (https://www4.icao.int/aelts/uploads/icao%20doc9835%202nd%20edition.pdf); Doc 9432 (4.ª ed.) 2.8.3.9; Anexo 10, Vol. II, 5.2.1.8 (https://www.icao.int/Meetings/anconf12/Document%20Archive/AN10_V2_cons%5B1%5D.pdf); preguntas frecuentes OACI sobre licencias e intervalos (https://www.icao.int/personnel-licensing-faq).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: descriptores de los niveles 1 (preelemental) y 2 (elemental) contra Doc 9835 Apéndice A y Anexo 1 Adjunto A (no cargados).",
              "VERIFICAR: nombres en inglés de los niveles (Pre-elementary, Elementary, Pre-operational, Operational, Extended, Expert) y de las habilidades (Pronunciation, Structure, Vocabulary, Fluency, Comprehension, Interactions) contra la versión en inglés del Anexo 1 Adjunto A (no cargada; el Doc 9835 cargado está en español).",
              "VERIFICAR: intervalo obligatorio y modo de acreditación en Colombia contra la normativa nacional vigente; la recomendación OACI no lo reemplaza.",
              "VERIFICAR: cómo se acredita y anota la competencia en Colombia, y su vigencia, contra RAC 61 (no cargado).",
              "VERIFICAR: cualquier fraseología adicional de secuencia, emergencia o autorizaciones contra el Doc 4444 y el Anexo 10 vigentes antes de emplearla en operación.",
            ],
          },
        ],
      },
    ],
  },

  // ── 10 ──────────────────────────────────────────────────────────────────
  {
    n: 10,
    title: "Fraseología estándar y plain English",
    kicker: "Cuándo alcanza la frase estándar y cuándo no",
    minutes: 13,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      { kind: "p", text: "Dos registros que conviven en la frecuencia:" },
      {
        kind: "list",
        items: [
          "**Fraseología normalizada**: la formulación codificada de palabras con un significado preciso y unívoco (Doc 9835 6.2.8.4). Está en el Anexo 10, Vol. II y en el Doc 4444 cap. 12; el Doc 9432 la ilustra (Doc 9835 3.3.8).",
          "**Lenguaje común (plain language, plain English)**: el uso espontáneo, creativo y no codificado del idioma, al que se recurre para situaciones que la fraseología no prevé (Doc 9835 glosario y 6.2.8.4).",
        ],
      },
      {
        kind: "norma",
        titulo: "La regla de uso",
        ref: "Anexo 10, Vol. II, 5.1.1.1 (citado en la Nota 1 del glosario del Doc 9835)",
        texto: "Se empleará el lenguaje común **«sólo cuando la fraseología normalizada no sea útil para la transmisión prevista»**.",
        naturaleza: "requisito",
      },

      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "p",
        text: "**1. La fraseología va siempre primero.** El Doc 9835 (4.3.3) es explícito: que el Anexo 10 reconozca el lenguaje común no lo convierte en sustituto de la fraseología normalizada de la Organización de Aviación Civil Internacional (OACI, International Civil Aviation Organization). Esta debe emplearse en primera instancia cuando cubra el mensaje previsto.",
      },
      {
        kind: "p",
        text: "**2. La fraseología no cubre todo.** El Doc 4444 cap. 12 (12.2, citado en Doc 9835 4.7.2) aclara que su lista no es exhaustiva ni elimina la necesidad del lenguaje común. El Doc 9835 (3.3.13) enumera casos típicos: un piloto que se pierde, un problema técnico, un pasajero que se indispone, una amenaza de bomba, una falla del equipo de control de tránsito aéreo (ATC, air traffic control). Y no solo emergencias: también rutinas sin frase hecha, como preguntar quién va adelante en la secuencia (3.3.18) o pedir mantener alta velocidad (3.3.17).",
      },
      { kind: "p", text: "**3. Cuándo usar lenguaje común** (Doc 9835 4.3.4):" },
      {
        kind: "list",
        items: [
          "en emergencias y situaciones imprevistas;",
          "para aclarar o explicar mejor una instrucción;",
          "para negociar información o instrucciones cuando haga falta.",
        ],
      },
      { kind: "p", text: "**4. Plain English NO es:**" },
      {
        kind: "list",
        items: [
          "hablar informal;",
          "hablar de más o «charlar» (el Doc 9835 4.3.4 dice que la norma «no debe interpretarse como licencia para charlar»);",
          "slang, modismos o coloquialismos (5.3.3.3);",
          "inventar fraseología que suena oficial pero no existe;",
          "abandonar la fraseología a mitad de frase cuando sí había una (salto de código, 3.3.21).",
        ],
      },
      {
        kind: "p",
        text: "**5. Plain English SÍ es** hablar «con claridad y concisión y evitando toda ambigüedad, como si se tratara de la fraseología normalizada» (4.3.4): fluidez, claridad, concisión y términos inequívocos (3.3.20). Frases cortas, directas, una idea por frase.",
      },
      {
        kind: "p",
        text: "**6. Los dos registros se combinan.** Un mensaje en lenguaje común sigue empezando con el distintivo y usa las palabras normalizadas donde existan (REQUEST, UNABLE, CONFIRM, niveles de vuelo —FL, flight level— y rumbos en tres dígitos). Lo que cambia es la parte que no tiene fórmula.",
      },
      {
        kind: "secuencia",
        titulo: "Estructura útil para el lenguaje común",
        items: ["Problema", "Qué puedo y qué no puedo hacer", "Qué necesito", "Intenciones"],
        orientacion: "horizontal",
        nota: "Herramienta didáctica, no norma OACI; se desarrolla en el capítulo 52.",
      },
      {
        kind: "table",
        head: ["Use fraseología normalizada", "Use lenguaje común (plain English)"],
        rows: [
          ["Solicitar descenso, ascenso, rumbo", "Describir una falla técnica y sus consecuencias"],
          ["Colacionar autorizaciones y pistas", "Explicar un problema médico a bordo"],
          ["Informar que no puede cumplir (UNABLE + motivo)", "Explicar el motivo cuando no es simple"],
          ["Pedir repetición o confirmación", "Preguntar algo sin fórmula (secuencia, estado de un aeropuerto)"],
          ["Cambios de frecuencia, transpondedor, QNH", "Negociar una alternativa con ATC"],
          ["Notificaciones de posición", "Informar humo, olor, pasajero disruptivo, daño sospechado"],
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-10-01.svg",
        alt: "Dos columnas: cuando existe fraseología normalizada, se usa para solicitudes y colaciones previstas; cuando no cubre la situación, se explica la falla, limitación o necesidad en lenguaje común claro.",
        ancho: 1080,
        alto: 1350,
        anchoMax: 540,
        pie: "Reconoce primero si hay una frase normalizada. Si no cubre la información que necesitas transmitir, describe condición, capacidad, necesidad e intención en lenguaje común directo; confirma qué entendió la otra parte. Amplía la lámina para comparar los dos registros. Síntesis didáctica de Anexo 10, Vol. II, 5.1.1.1 y Doc 9835, 4.3.3–4.3.4.",
      },

      { kind: "sub", text: "Decidir el registro antes de transmitir" },
      {
        kind: "p",
        text: "**Solicitud prevista: fraseología primero.** El Doc 9432, 3.3.3.1, incluye la formulación **REQUEST DESCENT**. Es un fragmento de su modelo, no una transmisión completa ni permiso para abandonar un nivel. En la operación se añade el distintivo y el contexto necesario, se espera la autorización y se colacionan sus elementos pertinentes. La razón para conservar una frase conocida es que reduce el tiempo de decodificación del controlador; una paráfrasis larga sobre querer ir más abajo no mejora la solicitud.",
      },
      {
        kind: "p",
        text: "**Falla no cubierta: condición, consecuencia y necesidad.** Imagina una indicación anormal de flaps durante el ascenso, sin asignar a esta situación un vuelo, nivel, velocidad o aeropuerto ficticios. Mientras la tripulación aplica el procedimiento correspondiente, el mensaje a ATC debe separar tres hechos: qué ocurre, cómo limita la operación y qué apoyo se solicita ahora. Si todavía no está claro cuánto tardará la lista o cuál será el destino, se comunica esa incertidumbre y se actualiza después. Llamarlo «un pequeño problema» o pedir «dar vueltas un rato» no le permite al controlador proteger espacio ni ordenar el tráfico.",
      },
      {
        kind: "p",
        text: "**Situación médica: una necesidad operativa, no una historia clínica.** Cuando una persona a bordo requiere atención, la tripulación transmite el hecho pertinente para la coordinación, la prioridad que necesita y la asistencia en tierra, siguiendo el procedimiento del explotador y la gravedad evaluada. No inventamos una respuesta ATC ni declaramos que toda urgencia médica sea automáticamente PAN PAN: la clasificación, la señal y la acción dependen del caso. El capítulo 35 aborda la comunicación de urgencia y socorro.",
      },
      {
        kind: "p",
        text: "**Rutina sin fórmula suficiente.** El Doc 9835, 3.3.17, cita un intercambio sobre mantener alta velocidad y explica que no existía fraseología OACI para formular esa solicitud concreta. Ese caso muestra por qué el lenguaje común también aparece fuera de las emergencias. Lo decisivo no es repetir una traducción inventada del intercambio, sino expresar la capacidad o preferencia real de la aeronave, escuchar la respuesta y no tratar una aceptación provisional como autorización ilimitada para continuar a cualquier velocidad.",
      },
      {
        kind: "p",
        text: "**Instrucción que no puede cumplirse.** **UNABLE** indica que no se puede acatar una solicitud, instrucción o autorización y normalmente va seguido de un motivo (Anexo 10, Vol. II, 5.2.1.8). Cuando sea oportuno, se comunica una alternativa que la aeronave sí pueda aceptar; luego se espera una nueva autorización. El piloto no cambia por cuenta propia al nivel o ruta que propone. Así se combinan una palabra normalizada y lenguaje común sin presentar una autorización ATC inventada como ejemplo de operación real.",
      },
      {
        kind: "p",
        text: "**Duda sobre el rodaje: aclarar antes de moverse.** La tripulación identifica exactamente qué tramo de la instrucción no entendió y pide confirmación o asistencia conforme a la fraseología vigente. No se avanza sobre la base de una ruta que «parece» correcta ni se improvisa aquí el trazado de calles de rodaje de un aeropuerto. La ruta publicada, la señalización y la autorización efectiva deben coincidir; el capítulo 16 desarrolla la colación y las situaciones de rodaje.",
      },

      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En la aerolínea",
        texto:
          "En un vuelo normal de aerolínea, la mayor parte de lo que se dice es fraseología: autorizaciones, colaciones y cambios de frecuencia. El lenguaje común se vuelve imprescindible para explicar lo que la fórmula no contempla, y el Doc 9835 (3.3.17) recuerda que también puede hacer falta en situaciones ordinarias.\n\nEl Doc 9835 (3.3.19) analiza un intercambio sobre un avión liviano cuyo tren no extendía y señala que gran parte de ese diálogo fue lenguaje común. La enseñanza para una tripulación de aerolínea no es copiar aquel caso, sino preparar mensajes breves y actualizables cuando la condición técnica todavía evoluciona.\n\nEl enlace de datos controlador-piloto (CPDLC, Controller–Pilot Data Link Communications) permite también mensajes de texto libre; la disciplina de claridad permanece (capítulo 43).\n\nEn un ejercicio de selección que pida explicar una falla al controlador, muestra primero la consecuencia operacional, luego la ayuda necesaria y evita fingir una autorización que no has recibido.",
      },

      { kind: "sub", text: "Error frecuente" },
      error(
        "Contar la historia",
        "El Doc 9835 (3.3.15 y 3.3.16) trae un ejemplo real de un piloto que explica un traslado médico en un solo bloque largo, con hipótesis y rodeos, y concluye que ese lenguaje común «puede ser bien poco claro». Frases cortas, en orden.",
      ),
      error(
        "Inventar fraseología",
        "«Request lower», «we're on the go», «say intentions please» dichas como si fueran normalizadas. Si no está seguro de que existe, dígalo en lenguaje común claro.",
      ),
      error(
        "Pasarse al lenguaje común cuando había fraseología",
        "«We would like to go down» en vez de REQUEST DESCENT.",
      ),
      error(
        "Suavizar el problema",
        "«Little issue», «kind of» restan urgencia a algo que puede ser serio. El Doc 9835 (5.3.3.4) vincula el lenguaje poco directo con incidentes y accidentes.",
      ),
      error(
        "Olvidar el distintivo y los números normalizados",
        "En el lenguaje común también. Los niveles siguen siendo FL, los rumbos siguen en tres dígitos, las pistas dígito por dígito.",
      ),

      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Fraseología siempre primero; lenguaje común solo cuando la fraseología no sirve.",
          "El lenguaje común también es claro, conciso, sin ambigüedad: no es charla ni jerga.",
          "Emergencias, aclaraciones y negociaciones son el terreno del lenguaje común.",
          "Combine: distintivo y palabras normalizadas + frases simples para lo que no tiene fórmula.",
          "Estructura: problema, qué puede y no puede, qué necesita, intenciones.",
          "Si no está seguro de que una frase es normalizada, no la invente: dígala en inglés simple.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Anexo 10 · Doc 9835 · Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Anexo 10, Vol. II, 5.1.1.1 y 5.2.1.8 (https://www.icao.int/Meetings/anconf12/Document%20Archive/AN10_V2_cons%5B1%5D.pdf); Doc 9835 (2.ª ed.) glosario «Lenguaje común», 3.3.8, 3.3.13, 3.3.15–3.3.21, 4.3.3–4.3.4, 4.7.2, 5.3.3.3–5.3.3.4 y 6.2.8.4 (https://www4.icao.int/aelts/uploads/icao%20doc9835%202nd%20edition.pdf); Doc 9432 (4.ª ed.) 2.6 y 3.3.3.1.",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: la fraseología concreta para rodaje, asistencia, secuencia y autorizaciones en el Doc 4444 y las publicaciones vigentes del Estado antes de usarla en vuelo.",
              "VERIFICAR: la señal y fraseología de urgencia o socorro contra el Anexo 10, Vol. II, cap. 5, y el Doc 4444, cap. 15 (capítulo 35).",
            ],
          },
        ],
      },
    ],
  },

  // ── 11 ──────────────────────────────────────────────────────────────────
  {
    n: 11,
    title: "Palabras y expresiones estándar",
    kicker: "ROGER no es WILCO, STANDBY no es aprobación",
    minutes: 18,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Son palabras y frases normalizadas de la radiotelefonía de la Organización de Aviación Civil Internacional (OACI, International Civil Aviation Organization): cada una indica al otro extremo qué se recibió, qué se hará o qué debe aclararse. La tabla del Doc 9432, 2.6, fija sus significados. Esta lección los explica en español aplicado a la operación; no presenta diálogos inventados como si fueran fraseología publicada.",
      },
      {
        kind: "definicion",
        text: "La idea central: **cada palabra tiene un solo significado y compromete a algo concreto**. Decir ROGER cuando correspondía WILCO, o tomar STANDBY como una aprobación, cambia lo que el otro cree que usted va a hacer.",
      },

      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "Tres pares que se confunden y que hay que dominar antes que el resto:" },
      { kind: "p", text: "**ROGER ≠ WILCO**" },
      {
        kind: "table",
        head: ["", "ROGER", "WILCO"],
        rows: [
          [
            "Significado oficial (Doc 9432 2.6)",
            "«He recibido toda su transmisión anterior».",
            "«He comprendido su mensaje y procederé de acuerdo». (WILCO abrevia «will comply».)",
          ],
          ["Qué compromete", "Solo que la transmisión llegó.", "Que entendió **y** que va a cumplir."],
          [
            "Cuándo",
            "Información que no pide acción (tránsito, meteorología, una notificación que control recibe).",
            "Una instrucción que no requiere colación (por ejemplo, notificar al pasar un nivel de vuelo).",
          ],
          [
            "Nunca",
            "Como respuesta a una pregunta que exige AFFIRM o NEGATIVE, ni en lugar de una colación (nota del Doc 9432 2.6).",
            "En lugar de la colación de los elementos que siempre se colacionan (Doc 4444 4.5.7.5.1).",
          ],
        ],
      },
      {
        kind: "p",
        text: "**STANDBY ≠ aprobación.** Significado: «Espere y le llamaré». La nota del Doc 9432 2.6 lo dice sin matices: «\"ESPERE\" no es ni una aprobación ni una denegación». Quien la recibe no hace nada nuevo y espera la llamada; si la demora es considerable, quien llamó normalmente vuelve a llamar.",
      },
      { kind: "p", text: "**MONITOR ≠ CONTACT.**" },
      {
        kind: "kv",
        items: [
          { k: "CONTACT", v: "«Establezca comunicaciones con…». Usted cambia de frecuencia **y llama**." },
          { k: "MONITOR", v: "«Escuchar en (frecuencia)». Usted cambia (o sintoniza) **y escucha, sin llamar**." },
        ],
      },
      {
        kind: "p",
        text: "El Doc 9432 2.8.2.2 lo aplica así: se ordena «haga escucha» (MONITOR) de una frecuencia donde se radiodifunde información (el ejemplo es el servicio automático de información terminal, ATIS, Automatic Terminal Information Service), y «quede en escucha» (STAND BY FOR…) de una dependencia que tiene intención de llamarlo pronto. En los dos casos, el que llama es el otro.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-11-01.svg",
        alt: "Tres comparaciones: ROGER no compromete cumplimiento como WILCO; STANDBY no concede la medida como APPROVED; CONTACT requiere establecer comunicación, MONITOR solo escuchar.",
        ancho: 1600,
        alto: 900,
        pie: "Reconoce qué compromiso crea cada palabra antes de responder. ROGER y WILCO tampoco sustituyen una colación exigida; STANDBY no autoriza a moverse. Amplía para comparar los tres pares. Significados basados en el Doc 9432, 2.6.",
      },

      { kind: "sub", text: "Qué cambia con cada palabra" },
      {
        kind: "callout",
        tone: "verificar",
        title: "No enseñamos como verificado lo que falta contrastar",
        text: "La edición consultada del Doc 9432 indica que GO AHEAD se omitió de su tabla y no confirma VERIFY como palabra general. Antes de enseñar cualquiera de las dos como fraseología vigente, hay que contrastar la edición aplicable del Anexo 10, Vol. II, y el Doc 4444. Tampoco se publican aquí frecuencias, pistas, puntos de ruta ni autorizaciones construidas.",
      },
      {
        kind: "p",
        text: "**ACKNOWLEDGE, AFFIRM y NEGATIVE responden a necesidades distintas.** ACKNOWLEDGE pide comunicar si el mensaje se recibió y comprendió; no sustituye la colación de elementos que la requieren. AFFIRM expresa una respuesta afirmativa directa y NEGATIVE una negativa o rechazo, según el contexto. ROGER solo confirma recepción. Si el controlador pregunta si la tripulación puede aceptar una instrucción o una pista, el piloto responde la pregunta y no deja la decisión implícita en ROGER. Significados del Doc 9432, 2.6.",
      },
      {
        kind: "p",
        text: "**APPROVED, CLEARED y RECLEARED no son sinónimos.** APPROVED concede la medida propuesta; CLEARED autoriza a proceder bajo condiciones determinadas; RECLEARED modifica la autorización anterior y la reemplaza en todo o en la parte indicada. El piloto identifica qué cambió y colaciona lo que exige la norma: no asume que una autorización de ruta implique autorización de despegue. Los ejemplos del Doc 9432, 2.8.3.6 y 3.3.3.2, ilustran la diferencia sin que esta lección invente una ruta o un nivel.",
      },
      {
        kind: "p",
        text: "**CANCEL y DISREGARD afectan mensajes anteriores de forma diferente.** CANCEL anula una autorización previa; DISREGARD pide no tener en cuenta el mensaje al que se refiere. Si cualquiera aparece durante una maniobra, la tripulación determina exactamente qué elemento quedó sin efecto, verifica la instrucción que sí permanece vigente y detiene una acción que ya no esté autorizada. No basta con escuchar la palabra aislada: el alcance de la cancelación importa.",
      },
      {
        kind: "p",
        text: "**CHECK, CONFIRM y READ BACK tampoco equivalen.** CHECK ordena examinar un sistema o procedimiento y, por sí sola, normalmente no exige respuesta. CONFIRM solicita verificar una autorización, medida o información concreta. READ BACK pide repetir el mensaje, o la parte señalada, como se recibió. Si la instrucción incluye un elemento crítico sujeto a colación, se colaciona aunque el piloto crea que ROGER comunica comprensión. La tabla de Doc 9432, 2.6, define las palabras; los requisitos de colación se confirman en Doc 4444, 4.5.7.5.1.",
      },
      {
        kind: "p",
        text: "**CONTACT y MONITOR determinan quién inicia la conversación.** CONTACT exige establecer comunicación con la dependencia indicada; MONITOR pide escuchar en una frecuencia. El Doc 9432, 2.8.2.1–2.8.2.2, diferencia los dos usos y muestra la escucha de información radiodifundida. Si una transferencia queda condicionada a un punto o nivel, esa condición forma parte del mensaje que debe conservarse. Antes de aplicar MONITOR a la transferencia entre dependencias, consulta el procedimiento local vigente; no lo equipares automáticamente con CONTACT.",
      },
      {
        kind: "p",
        text: "**REPORT, REQUEST y MAINTAIN cumplen funciones separadas.** REPORT pide transmitir un dato específico cuando corresponda; REQUEST introduce una solicitud; MAINTAIN ordena continuar bajo las condiciones especificadas. Pedir un descenso no es obtenerlo, y recibir la instrucción de notificar un punto no cambia la ruta autorizada. WILCO puede cerrar una instrucción de notificar que no exija colación, pero no sustituye la colación obligatoria de niveles o autorizaciones.",
      },
      {
        kind: "p",
        text: "**SAY AGAIN, I SAY AGAIN y CORRECTION reparan problemas distintos.** SAY AGAIN pide al otro repetir todo o una parte de su última transmisión; el Doc 9432, 2.8.1.4, describe cómo delimitar la parte faltante. I SAY AGAIN anuncia que el hablante mismo repite para aclarar o enfatizar. CORRECTION anuncia que el hablante corrige un error en su propia transmisión. CORRECT, en cambio, confirma que lo dicho por la otra parte es exacto. En una cabina ocupada, saber quién debe repetir evita que una corrección termine pareciendo una instrucción nueva.",
      },
      {
        kind: "p",
        text: "**BREAK y BREAK BREAK son señales de estructura, no autorizaciones.** BREAK separa partes de un mensaje cuando la división no es evidente. BREAK BREAK separa mensajes dirigidos a distintas aeronaves en un entorno ocupado. Ante indicativos parecidos, escuchar la separación y el distintivo siguiente protege de ejecutar una instrucción destinada a otro tráfico. No se añade aquí una frecuencia ni un intercambio ficticio para ilustrarlo: el punto es identificar el límite entre mensajes.",
      },
      {
        kind: "p",
        text: "**HOW DO YOU READ y la prueba de radio.** El Doc 9432, 2.8.4.3, describe una escala de inteligibilidad de uno a cinco. La cifra califica la recepción, no la competencia lingüística OACI del hablante ni la calidad de la decisión operacional. Si la comunicación resulta difícil, SPEAK SLOWER y WORDS TWICE tienen significados definidos; no conviertas una mala recepción en una colación adivinada.",
      },
      {
        kind: "p",
        text: "**STANDBY, UNABLE y WILCO comprometen acciones opuestas.** STANDBY significa esperar y que la estación volverá a llamar; no es aprobación ni denegación. UNABLE comunica que no se puede cumplir y normalmente se acompaña de motivo. WILCO comunica que el mensaje se entendió y se cumplirá. La tripulación no inicia un retroceso ni cambia de nivel después de STANDBY; tampoco dice WILCO a algo que sabe que no puede cumplir. Se ajusta al procedimiento local y espera la autorización efectiva.",
      },
      { kind: "p", text: "**Otras palabras de la tabla del Doc 9432 2.6** que conviene reconocer:" },
      {
        kind: "table",
        head: ["Palabra", "Significado oficial", "Nota"],
        rows: [
          ["OVER", "«Mi transmisión ha terminado y espero su respuesta».", "No se utiliza normalmente en muy alta frecuencia (VHF, very high frequency)."],
          [
            "OUT",
            "«Este intercambio de transmisiones ha terminado y no se espera respuesta».",
            "No se utiliza normalmente en VHF.",
          ],
          ["SPEAK SLOWER", "«Disminuya la velocidad al hablar».", "Útil con controladores rápidos."],
          [
            "WORDS TWICE",
            "Como solicitud: «La comunicación es difícil. Ruego transmita cada palabra o grupo de palabras dos veces». Como información: cada palabra o grupo se transmitirá dos veces.",
            "Comunicaciones difíciles.",
          ],
        ],
      },

      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Cambio de frecuencia en salida",
        texto:
          "En una transferencia con CONTACT, la tripulación sintoniza la frecuencia indicada y establece la comunicación; con MONITOR, sintoniza y escucha. En qué fase y con qué dependencia se usan depende del procedimiento local publicado y de la instrucción recibida. Si la llamada esperada no llega o la comunicación falla, se sigue el procedimiento aplicable: MONITOR nunca convierte el silencio en una nueva autorización.",
      },
      {
        kind: "enLaOperacion",
        momento: "Pushback con STANDBY",
        texto:
          "El piloto que monitorea (PM, pilot monitoring) confirma con la tripulación y el personal de tierra que todavía no hay aprobación para retroceder. STANDBY solo pide esperar; confundirlo con APPROVED podría iniciar un movimiento sin la autorización requerida.",
      },
      {
        kind: "enLaOperacion",
        momento: "WILCO en crucero",
        texto:
          "Una instrucción de notificar que no exija colación puede reconocerse con WILCO. Los elementos sujetos a colación, como nivel, rumbo, velocidad, pista y código del radar secundario de vigilancia (SSR, secondary surveillance radar), se repiten según Doc 4444, 4.5.7.5.1; WILCO no los sustituye.",
      },
      {
        kind: "enLaOperacion",
        momento: "CONFIRM antes de ejecutar",
        texto:
          "Si el nivel o el rumbo no coincide con lo esperado, se confirma antes de mover el selector. Es la defensa contra el sesgo de expectativa (capítulo 55).",
      },

      { kind: "sub", text: "Error frecuente" },
      error(
        "ROGER en lugar de colación",
        "El error más común. ROGER no le permite al controlador verificar que el piloto entendió el nivel, la pista o el QNH.",
      ),
      error("ROGER a una pregunta de sí o no", "Si la pregunta requiere una respuesta afirmativa o negativa directa, ROGER no comunica cuál de las dos corresponde. Use AFFIRM o NEGATIVE; si pide un dato, responda el dato solicitado."),
      error("«Affirmative» en vez de AFFIRM", "La palabra de la tabla es AFFIRM."),
      error(
        "Tomar STANDBY como «sí»",
        "Empezar un rodaje, un retroceso o un viraje porque control de tránsito aéreo (ATC, air traffic control) dijo STANDBY.",
      ),
      error(
        "MONITOR tratado como CONTACT",
        "Llamar en una frecuencia de monitoreo congestiona o interrumpe a la dependencia; y tratar CONTACT como MONITOR deja a la aeronave sin contacto establecido.",
      ),
      error(
        "CORRECTION vs CORRECT",
        "CORRECTION anuncia un error propio; CORRECT confirma que lo dicho está bien.",
      ),
      error(
        "CHECK usado como «confirme»",
        "El Doc 9432 2.6 limita CHECK a examinar un sistema o procedimiento, «en ningún otro contexto».",
      ),
      error("SAY AGAIN vs I SAY AGAIN", "Uno pide repetición; el otro la anuncia."),

      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-11-02.svg",
        alt: "Secuencia para responder a control: aclarar lo no entendido, informar si no puede cumplir, colacionar lo requerido, responder preguntas y distinguir WILCO de ROGER.",
        ancho: 1080,
        alto: 1740,
        anchoMax: 520,
        pie: "Elige la respuesta por la acción solicitada: primero aclara o declara UNABLE si corresponde, luego colaciona los elementos exigidos. WILCO comunica cumplimiento; ROGER solo recepción cuando procede. Amplía para seguir la secuencia. Herramienta didáctica basada en Doc 9432, 2.6 y requisitos de colación del Doc 4444.",
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "ROGER = recibido. WILCO = entendido y voy a cumplir. Ninguno reemplaza la colación.",
          "STANDBY = espere; no es aprobación ni denegación.",
          "CONTACT = cambie y llame. MONITOR = cambie y escuche.",
          "AFFIRM y NEGATIVE para respuestas directas de sí o no; ROGER no responde la pregunta.",
          "UNABLE + motivo es una respuesta profesional.",
          "GO AHEAD y VERIFY: verificar su estado en la norma vigente antes de enseñarlos como normalizados.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 9432 · Doc 4444 · Anexo 10",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 9432 (4.ª ed.) 2.6 (significados y notas), 2.8.1.4–2.8.1.7 (repetición y corrección), 2.8.2.1–2.8.2.2 (CONTACT y MONITOR), 2.8.3.6 (autorizaciones), 2.8.4.3 (inteligibilidad), 3.3.3.2 (RECLEARED); Doc 4444, 4.5.7.5.1 (colaciones); Anexo 10, Vol. II, 5.2.1.8 (palabras normalizadas, https://www.icao.int/Meetings/anconf12/Document%20Archive/AN10_V2_cons%5B1%5D.pdf).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: estado vigente de GO AHEAD («proceed with your message») contra Anexo 10 Vol. II cap. 5, tabla de palabras y frases normalizadas, edición vigente (no cargado).",
              "VERIFICAR: VERIFY como palabra normalizada en inglés y su significado, contra Anexo 10 Vol. II cap. 5 y Doc 4444 cap. 12 (no cargados). El Doc 9432 6.5.1 solo trae «VERIFIQUE NIVEL» en español.",
              "VERIFICAR: uso actual de MONITOR para transferencias (p. ej. «monitor (dependencia) (frecuencia)») contra Doc 4444 cap. 12 y la AIP de cada Estado (no cargados).",
              "VERIFICAR: fraseología operativa de ejemplos concretos, transferencias y cruces de pista contra Doc 4444, Anexo 10 y la publicación de información aeronáutica (AIP, Aeronautical Information Publication) vigente del Estado antes de llevarla al vuelo; por eso no se construyeron diálogos locales en esta lección.",
            ],
          },
        ],
      },
    ],
  },
]
