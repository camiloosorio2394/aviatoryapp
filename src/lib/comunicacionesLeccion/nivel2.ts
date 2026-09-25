/**
 * Nivel 2 · El idioma (lecciones 08 a 11, capítulos 8 a 11 de la especificación).
 *
 * El inglés de la radio no es el inglés académico: aquí se separan el inglés
 * general, el Aviation English, la fraseología y el plain language, y se
 * repasan las palabras estándar que no admiten sinónimos.
 *
 * Fuente: docs/comunicaciones/nivel-2.md, entero. Cada intercambio del
 * Markdown es un bloque `code` con su significado debajo; lo que el Markdown
 * marca VERIFICAR sale en un callout «Verificar» visible antes de la
 * fraseología y, completo, en el detalle técnico de FUENTES. El formato de
 * los bloques y de los huecos está documentado al inicio de index.ts.
 */

import type { DocBlockData, DocScreen } from "@/lib/docBlocks"

/**
 * Un intercambio o una entrada de vocabulario: el título en negrita y, en
 * orden, sus piezas. Un texto es un párrafo en español; una lista de líneas es
 * la transmisión literal, una línea por turno de palabra.
 */
function entrada(titulo: string, ...partes: (string | string[])[]): DocBlockData[] {
  return [
    { kind: "p", text: `**${titulo}**` },
    ...partes.map((parte): DocBlockData =>
      typeof parte === "string" ? { kind: "p", text: parte } : { kind: "code", text: parte.join("\n") },
    ),
  ]
}

/** Un error frecuente: el nombre del error como título y la explicación. */
function error(titulo: string, text: string): DocBlockData {
  return { kind: "callout", tone: "warn", title: titulo, text }
}

/** Las convenciones de los ejemplos de todo el nivel (cabecera de nivel-2.md). */
const CONVENCIONES: DocBlockData = {
  kind: "list",
  items: [
    "Distintivo de ejemplo: `AVIATORY 452` (y `AVIATORY 425`, `AVIATORY 542` cuando hace falta un distintivo parecido). Estaciones («Bogota Ground», «Bogota Approach», «Bogota Control»), frecuencias, códigos y waypoints son **ficticios y educativos**. GIKOS es ficticio.",
    "Los números van en cifras, como en el Doc 9432. Se pronuncian según el capítulo 5.",
    "Cuando un intercambio sale de un ejemplo del Doc 9432, se indica «adaptado de Doc 9432 x.x»: se cambió `FASTAIR 345` o `G-CD` por `AVIATORY 452` y las estaciones del manual (que también son ficticias) por estaciones de ejemplo.",
    "Lo rotulado **PLAIN LANGUAGE** no es fraseología normalizada: es lenguaje común.",
    "Lo rotulado **(ejemplo construido)** no aparece en las fuentes cargadas y está listado en la línea VERIFICAR del capítulo.",
  ],
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
    minutes: 9,
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
        text: "**1. La fraseología va siempre primero.** El Doc 9835 (4.3.3) es explícito: que el Anexo 10 reconozca el lenguaje común «no significa que el lenguaje común se considere un sustituto suficiente de la fraseología normalizada de la OACI. La fraseología de la OACI debería utilizarse siempre en primera instancia».",
      },
      {
        kind: "p",
        text: "**2. La fraseología no cubre todo.** El Doc 4444 cap. 12 (12.2, citado en Doc 9835 4.7.2) aclara que su lista no es exhaustiva ni elimina la necesidad del lenguaje común. El Doc 9835 (3.3.13) enumera casos típicos: un piloto que se pierde, un problema técnico, un pasajero que se indispone, una amenaza de bomba, una falla del equipo de ATC. Y no solo emergencias: también rutinas sin frase hecha, como preguntar quién va adelante en la secuencia (3.3.18) o pedir mantener alta velocidad (3.3.17).",
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
        text: "**6. Los dos registros se combinan.** Un mensaje en lenguaje común sigue empezando con el distintivo y usa las palabras normalizadas donde existan (REQUEST, UNABLE, CONFIRM, niveles en FL, rumbos en tres dígitos). Lo que cambia es la parte que no tiene fórmula.",
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
        kind: "hueco",
        rotulo: "CM-10-01 · Diagrama · 4:5 · 1080×1350 px",
        descripcion:
          "Imagen sugerida: dos columnas sobre fondo papel. Izquierda, encabezado «FRASEOLOGÍA NORMALIZADA» con seis tarjetas cortas: solicitar descenso, colacionar pista, UNABLE + motivo, SAY AGAIN / CONFIRM, cambio de frecuencia, transpondedor. Derecha, encabezado «PLAIN ENGLISH» con seis tarjetas: falla técnica, pasajero enfermo, humo u olor, pregunta sin fórmula (secuencia), negociar alternativa, aclarar una instrucción. Una flecha de izquierda a derecha rotulada «solo cuando la fraseología no alcanza». Al pie, franja: «Plain English ≠ charla, jerga ni fraseología inventada». Objetivo: que el piloto decida en un segundo qué registro corresponde a cada situación.",
        alto: 520,
        ratio: "4 / 5",
        anchoMax: 420,
      },

      { kind: "sub", text: "Fraseología OACI" },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "«request descent due turbulence», «request progressive taxi», «request medical services on arrival» y «request priority for landing» se presentan como construcciones o PLAIN LANGUAGE, y la respuesta ATC «Aviatory 452, roger, maintain FL 150, report when ready to proceed» es construida: consultar Doc 4444 cap. 12. La fraseología de la señal de urgencia se consulta en el Anexo 10 Vol. II cap. 5 y el Doc 4444 cap. 15 (capítulo 35).",
      },
      ...entrada(
        "Falla técnica compleja explicada en plain English (PLAIN LANGUAGE)",
        [
          `PILOT: "Bogota Control, Aviatory 452, we have a problem with the flaps. They are stuck at position 1 and will not retract. Our maximum speed is now 230 knots. We are able to maintain FL 150. Request to hold at present position for about fifteen minutes to run the checklist. Will advise intentions."`,
          `ATC:   "Aviatory 452, roger, maintain FL 150, report when ready to proceed."`,
          `PILOT: "Maintaining FL 150, wilco, Aviatory 452."`,
        ],
        "Significado: problema (flaps trabados), límite (230 nudos), capacidad (mantiene FL 150), necesidad (tiempo y espacio), intención (informará). El controlador no tiene que hacer preguntas para entender. MAINTAIN, REPORT y WILCO son palabras normalizadas dentro de un intercambio de lenguaje común. La respuesta ATC es (ejemplo construido).",
      ),
      ...entrada(
        "El mismo caso mal dicho (PLAIN LANGUAGE incorrecto)",
        [
          `PILOT: "Bogota, 452, uh, we got a little issue here with the flaps, they're kinda stuck, so we'd like to just hang around for a bit if that's okay with you guys."`,
        ],
        "Significado: distintivo abreviado sin autorización, modismos («hang around», «kinda»), no dice velocidad límite ni nivel ni tiempo. El controlador tendrá que preguntar tres o cuatro cosas.",
      ),
      ...entrada(
        "Pasajero enfermo (PLAIN LANGUAGE)",
        [
          `PILOT: "Bogota Approach, Aviatory 452, we have a passenger with severe chest pain. Request priority for landing. Request medical services on arrival."`,
          `ATC:   "Aviatory 452, roger, (instrucciones de secuencia)."`,
        ],
        "Significado: tres frases: qué pasa, qué se necesita en el aire, qué se necesita en tierra. Si el caso amerita la señal de urgencia PAN PAN, se trabaja en el capítulo 35; aquí solo interesa el lenguaje.",
      ),
      ...entrada(
        "Fraseología cuando existe: no reemplazarla por lenguaje común",
        [
          `PILOT (incorrecto): "Aviatory 452, we would like to go down to a lower altitude if possible, because of the turbulence."`,
          `PILOT: "Aviatory 452, request descent due turbulence."`,
        ],
        "Significado: existía fraseología (REQUEST DESCENT) y el motivo cabe en dos palabras. Adaptado de Doc 9432 3.3.3.1. «Due turbulence» sigue el patrón «due weight» del Doc 9432 2.8.3.10; ver VERIFICAR.",
      ),
      ...entrada(
        "Rutina sin fórmula: pedir mantener velocidad (PLAIN LANGUAGE)",
        [
          `ATC:   "Aviatory 452, radar contact, proceed direct GIKOS."`,
          `PILOT: "Direct GIKOS, Aviatory 452. Request to maintain high speed on descent."`,
          `ATC:   "Aviatory 452, for now, affirm."`,
        ],
        "Significado: basado en el intercambio real que cita el Doc 9835 3.3.17 («¿Podemos mantener alta velocidad?» / «Por el momento, sí»), donde el Doc señala que no hay fraseología OACI para esa solicitud. La redacción en inglés es (ejemplo construido).",
      ),
      ...entrada(
        "Negociar cuando la instrucción no sirve (fraseología + PLAIN LANGUAGE)",
        [
          `ATC:   "Aviatory 452, climb to FL 370."`,
          `PILOT: "Unable FL 370 due weight, Aviatory 452. We can accept FL 350."`,
          `ATC:   "Aviatory 452, climb to FL 350."`,
          `PILOT: "Climbing to FL 350, Aviatory 452."`,
        ],
        "Significado: UNABLE con motivo (normalizado) y una alternativa (lenguaje común). El controlador recibe lo que necesita para reorganizar. Patrón de UNABLE adaptado de Doc 9432 2.8.3.10.",
      ),
      ...entrada(
        "Aclarar una instrucción (PLAIN LANGUAGE)",
        [
          `ATC:   "Aviatory 452, taxi to holding point runway 13 via A, B."`,
          `PILOT: "Aviatory 452, confirm via A then B. We are not familiar with the airport, request progressive taxi."`,
        ],
        "Significado: CONFIRM normalizado para verificar la ruta y lenguaje común para explicar el motivo. La fraseología de rodaje progresivo y la colación completa de rodaje van en el capítulo 16.",
      ),

      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En la aerolínea",
        texto:
          "En un vuelo normal de aerolínea, la mayor parte de lo que se dice es fraseología: autorizaciones, colaciones, cambios de frecuencia. El lenguaje común aparece en lo imprevisto, y ahí es donde se nota el nivel real. Pero el Doc 9835 (3.3.17) advierte que también hace falta en situaciones ordinarias.\n\nEl Doc 9835 (3.3.19) cita el análisis de un diálogo con un avión liviano que no podía bajar el tren: el 60 % del diálogo fue en lenguaje común. En una falla real el piloto habla más lenguaje común de lo que espera.\n\nCon CPDLC existe la opción de texto libre; la disciplina es la misma (capítulo 43).\n\nEn la entrevista de aerolínea es frecuente el ejercicio «explíquele esta falla al controlador». Se evalúa exactamente lo de este capítulo: estructura, brevedad y que no invente fraseología.",
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
        cita: "Doc 9835 · Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 9835 (2.ª ed.) glosario «Lenguaje común» y Nota 1 (Anexo 10 Vol. II 5.1.1.1), 3.3.8, 3.3.13, 3.3.15 a 3.3.21, 4.3.3, 4.3.4, 4.7.2, 5.3.3.3, 5.3.3.4, 6.2.8.4; Doc 9432 (4.ª ed.) Preámbulo, 2.6 (MAINTAIN, REPORT, WILCO, CONFIRM, UNABLE), 2.8.3.10, 3.3.3.1.",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: «request descent due turbulence», «request progressive taxi», «request medical services on arrival», «request priority for landing» contra Doc 4444 cap. 12 (no cargado). Se presentan como construcciones o PLAIN LANGUAGE.",
              "VERIFICAR: «Aviatory 452, roger, maintain FL 150, report when ready to proceed» (respuesta ATC construida) contra Doc 4444 cap. 12 (no cargado).",
              "VERIFICAR: la fraseología de la señal de urgencia contra Anexo 10 Vol. II cap. 5 y Doc 4444 cap. 15 (no cargados; capítulo 35).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },

  // ── 11 ──────────────────────────────────────────────────────────────────
  {
    n: 11,
    title: "Palabras y expresiones estándar",
    kicker: "ROGER no es WILCO, STANDBY no es aprobación",
    minutes: 16,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Son las palabras y frases normalizadas de la radiotelefonía, cada una con un significado fijo. El Doc 9432 2.6 dice que «deberán utilizarse» con el significado que les da su tabla (español, inglés, significado). Ese significado es el que se cita aquí, entre comillas, tal cual.",
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
            "Información que no pide acción (tránsito, meteorología, una notificación que ATC recibe).",
            "Una instrucción que no requiere colación (por ejemplo, «report passing FL 80»).",
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
        text: "El Doc 9432 2.8.2.2 lo aplica así: se ordena «haga escucha» (MONITOR) de una frecuencia donde se radiodifunde información (el ejemplo es ATIS), y «quede en escucha» (STAND BY FOR…) de una dependencia que tiene intención de llamarlo pronto. En los dos casos, el que llama es el otro.",
      },
      {
        kind: "hueco",
        rotulo: "CM-11-01 · Esquema · 16:9 · 1600×900 px",
        descripcion:
          "Imagen sugerida: tres tarjetas lado a lado, cada una dividida en dos mitades enfrentadas. Tarjeta 1: «ROGER» (icono de oído, «recibido») frente a «WILCO» (oído + mano en acción, «entendido y cumpliré»). Tarjeta 2: «STANDBY» (reloj de arena, «espere, lo llamo») frente a «APPROVED» (visto bueno, «concedido»), con una banda que dice «STANDBY ≠ sí». Tarjeta 3: «CONTACT» (radio con flecha saliente, «cambie y llame») frente a «MONITOR» (radio con auricular, «cambie y escuche»). Debajo de cada tarjeta, la cita corta del significado oficial del Doc 9432 2.6. Objetivo: fijar visualmente los tres pares que más se confunden y el compromiso que implica cada palabra.",
        alto: 300,
        ratio: "16 / 9",
      },

      { kind: "sub", text: "Fraseología OACI" },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "GO AHEAD y VERIFY no están confirmados como palabras normalizadas vigentes: consultar el Anexo 10 Vol. II cap. 5 (tabla de palabras y frases normalizadas, edición vigente) y, para VERIFY, también el Doc 4444 cap. 12. El uso actual de MONITOR para transferencias se confirma en el Doc 4444 cap. 12 y la AIP de cada Estado. Los ejemplos rotulados (ejemplo construido) (ACKNOWLEDGE, BREAK, BREAK BREAK, CONFIRM del piloto, CORRECT, DISREGARD, HOW DO YOU READ, READ BACK, SAY AGAIN ALL BEFORE, STANDBY a una solicitud de directo, VERIFY LEVEL y «are you able to accept runway 31») y la redacción del cruce de pista con número de pista se confirman contra el Doc 4444 cap. 12 y el Anexo 10 Vol. II cap. 5.",
      },
      {
        kind: "p",
        text: "Orden alfabético en inglés. Cada entrada: significado oficial, uso y ejemplo.",
      },
      ...entrada(
        "ACKNOWLEDGE · «Comuníqueme si ha recibido y comprendido este mensaje».",
        "ATC pide una confirmación explícita de recepción y comprensión.",
        [
          `ATC:   "Aviatory 452, birds reported in the vicinity of the airport, acknowledge."`,
          `PILOT: "Roger, Aviatory 452."`,
        ],
        "(ejemplo construido) Si el mensaje contuviera algo que se colaciona (pista, nivel, QNH), la respuesta es la colación, no ROGER.",
      ),
      ...entrada(
        "AFFIRM · «Sí».",
        "La palabra normalizada es AFFIRM, no «affirmative» ni «yes».",
        [
          `ATC:   "Aviatory 452, are you ready for immediate departure?"`,
          `PILOT: "Aviatory 452, affirm."`,
          `ATC:   "Aviatory 452, line up. Be ready for immediate departure."`,
          `PILOT: "Lining up, Aviatory 452."`,
        ],
        "Adaptado de Doc 9432 4.5.5. Nótese que LINE UP no es autorización de despegue (capítulo 17).",
      ),
      ...entrada(
        "APPROVED · «Autorización concedida para la medida propuesta».",
        "Responde a algo que el piloto pidió.",
        [
          `PILOT: "Bogota Ground, Aviatory 452, stand 27, request push-back."`,
          `ATC:   "Aviatory 452, push-back approved."`,
        ],
        "Adaptado de Doc 9432 4.3.1. También «start up approved» (4.2.2). En el Doc 9432 la solicitud va a «Apron»: según el procedimiento local, el retroceso se pide al ATC o al servicio de dirección en la plataforma (4.3.1).",
      ),
      ...entrada(
        "BREAK · «Por medio de esta palabra le indico la separación entre las partes del mensaje».",
        "Se usa cuando no hay distinción clara entre el texto y las otras partes del mensaje.",
        [
          `ATC:   "Aviatory 452, descend to FL 180, break, traffic 12 o'clock, 10 miles, opposite direction, FL 190."`,
        ],
        "(ejemplo construido) El piloto colaciona la instrucción de nivel y responde a la información de tránsito.",
      ),
      ...entrada(
        "BREAK BREAK · «Por medio de estas palabras se indica la separación entre los mensajes transmitidos a distintas aeronaves en un ambiente atareado».",
        [
          `ATC:   "Aviatory 452, contact Bogota Control 128.7, break break, Aviatory 425, descend to FL 200."`,
          `PILOT: "128.7, Aviatory 452."`,
          `PILOT: "Descending to FL 200, Aviatory 425."`,
        ],
        "(ejemplo construido) Con distintivos parecidos (452 / 425), escuchar hasta el final: la segunda instrucción es para otro.",
      ),
      ...entrada(
        "CANCEL · «Anular la autorización transmitida anteriormente».",
        [
          `ATC:   "Aviatory 452, hold position, cancel take-off, I say again, cancel take-off, vehicle on runway."`,
          `PILOT: "Holding, Aviatory 452."`,
        ],
        "Adaptado de Doc 9432 4.5.10. Es uno de los dos únicos usos permitidos de la palabra TAKE-OFF (Doc 9432 2.8.3.3).",
      ),
      ...entrada(
        "CHECK · «Examine un sistema o procedimiento».",
        "Nota: «No debe utilizarse en ningún otro contexto. Normalmente no se espera respuesta».",
        [
          `ATC:   "Aviatory 452, check altimeter setting and confirm level."`,
          `PILOT: "Aviatory 452, altimeter 1013, FL 80."`,
        ],
        "Adaptado de Doc 9432 6.5.2. Aquí sí hay respuesta porque la instrucción incluye CONFIRM.",
      ),
      ...entrada(
        "CLEARED · «Autorización para seguir en las condiciones determinadas».",
        "Lo emite ATC. Diferencia con APPROVED: CLEARED fija condiciones (límite, ruta, nivel); APPROVED concede algo pedido.",
        [
          `ATC:   "Aviatory 452, cleared to GIKOS via A1, FL 280, Delta departure, squawk 5501."`,
          `PILOT: "Cleared to GIKOS via A1, FL 280, Delta departure, squawk 5501, Aviatory 452."`,
        ],
        "Adaptado de Doc 9432 2.8.3.6. Una autorización de ruta no es autorización de despegue (2.8.3.3).",
      ),
      ...entrada(
        "CONFIRM · «Solicito verificación de: (autorización, instrucciones, medidas, información)».",
        "La usan los dos lados.",
        [`ATC:   "Aviatory 452, confirm squawk."`, `PILOT: "Aviatory 452, squawking 6411."`],
        "Adaptado de Doc 9432 6.5.2.",
        [
          `ATC:   "Aviatory 452, descend to FL 240."`,
          `PILOT: "Aviatory 452, confirm descend to FL 240?"`,
          `ATC:   "Aviatory 452, affirm, descend to FL 240."`,
          `PILOT: "Descending to FL 240, Aviatory 452."`,
        ],
        "(ejemplo construido) El piloto duda del nivel (esperaba otro) y verifica antes de ejecutar.",
      ),
      ...entrada(
        "CONTACT · «Establezca comunicaciones con…».",
        [`ATC:   "Aviatory 452, contact Bogota Control 129.1."`, `PILOT: "129.1, Aviatory 452."`],
        "Adaptado de Doc 9432 2.8.2.1. Después del cambio, el piloto **llama** a Bogota Control.",
        [
          `ATC:   "Aviatory 452, when passing FL 80 contact Bogota Control 129.1."`,
          `PILOT: "When passing FL 80, 129.1, Aviatory 452."`,
        ],
        "Adaptado de Doc 9432 2.8.2.1: el cambio es condicional y se colaciona con la condición.",
      ),
      ...entrada(
        "CORRECT · «Cierto» o «Exacto».",
        [`PILOT: "Aviatory 452, confirm we are number two?"`, `ATC:   "Aviatory 452, correct, number two."`],
        "(ejemplo construido) No confundir con CORRECTION.",
      ),
      ...entrada(
        "CORRECTION · «Ha habido un error en esta transmisión (o mensaje indicado). La versión correcta es…».",
        [`PILOT: "Aviatory 452, GIKOS 47, FL 330, TOLKO 07, correction, TOLKO 57."`, `ATC:   "Aviatory 452, roger."`],
        "Adaptado de Doc 9432 2.8.1.6 (puntos ficticios). Se repite el último grupo correcto y luego la versión corregida. Si conviene repetir todo: «correction, I say again» (Doc 9432 2.8.1.7, en español «CORRECCIÓN, REPITO»).",
      ),
      ...entrada(
        "DISREGARD · «Haga caso omiso de esto».",
        [
          `ATC:   "Aviatory 452, turn left heading 270... disregard. Aviatory 452, continue present heading."`,
          `PILOT: "Continuing present heading, Aviatory 452."`,
        ],
        "(ejemplo construido) El piloto no ejecuta la instrucción anulada.",
      ),
      ...entrada(
        "GO AHEAD · Estado a verificar.",
        "El Doc 9432 (4.ª ed.) 2.6 dice: «Se ha omitido el término \"PROSIGA\" (GO AHEAD) y, en su lugar, el distintivo de llamada de la estación aeronáutica que llama seguido del distintivo de llamada de la estación aeronáutica que contesta se considerará como invitación para proseguir».",
        [`PILOT: "Bogota Tower, Aviatory 452."`, `ATC:   "Aviatory 452, Bogota Tower."`, `PILOT: "Aviatory 452, (mensaje)."`],
        "Significado: según el Doc 9432 cargado, la respuesta con los dos distintivos ya es la invitación a continuar. Adaptado de Doc 9432 2.8.1.1. Si GO AHEAD figura hoy en la lista vigente del Anexo 10 y con qué restricciones: VERIFICAR.",
      ),
      ...entrada(
        "HOW DO YOU READ · «¿Cuál es la inteligibilidad de mi transmisión?».",
        "La respuesta usa la escala de 1 (ininteligible) a 5 (perfectamente inteligible) del Doc 9432 2.8.4.3.",
        [`PILOT: "Bogota Tower, Aviatory 452, radio check 118.7."`, `ATC:   "Aviatory 452, Bogota Tower, reading you five."`],
        "Adaptado de Doc 9432 2.8.4.3 (prueba de radio).",
        [`PILOT: "Bogota Tower, Aviatory 452, how do you read?"`, `ATC:   "Aviatory 452, reading you three, loud background whistle."`],
        "(ejemplo construido con la respuesta del Doc 9432 2.8.4.3.)",
      ),
      ...entrada(
        "I SAY AGAIN · «Repito para aclarar o recalcar».",
        [
          `ATC:   "Aviatory 452, QNH 1003."`,
          `PILOT: "QNH 1013, Aviatory 452."`,
          `ATC:   "Aviatory 452, negative, I say again, QNH 1003."`,
          `PILOT: "QNH 1003, Aviatory 452."`,
        ],
        "Adaptado de Doc 9432 2.8.3.9. No confundir con SAY AGAIN (que pide al otro que repita).",
      ),
      ...entrada(
        "MAINTAIN · «Continúe según las condiciones especificadas» o en sentido literal, p. ej., «mantenga VFR».",
        [`ATC:   "Aviatory 452, maintain 2 500 feet."`, `PILOT: "Maintaining 2 500 feet, Aviatory 452."`],
        "Adaptado de Doc 9432 3.3.3.1.",
      ),
      ...entrada(
        "MONITOR · «Escuchar en (frecuencia)».",
        [`ATC:   "Aviatory 452, monitor ATIS 123.25."`, `PILOT: "Monitoring 123.25, Aviatory 452."`],
        "Adaptado de Doc 9432 2.8.2.2. El piloto escucha; no transmite en esa frecuencia.",
        "Comparación con «quede en escucha»:",
        [`ATC:   "Aviatory 452, stand by for Bogota Tower 118.9."`, `PILOT: "118.9, Aviatory 452."`],
        "Adaptado de Doc 9432 2.8.2.2. El piloto cambia y espera a que la torre lo llame.",
      ),
      ...entrada(
        "NEGATIVE · «No» o «Permiso no concedido», o «Es incorrecto» o «No se puede».",
        [
          `ATC:   "Aviatory 452, confirm transponder operating."`,
          `PILOT: "Aviatory 452, negative, transponder unserviceable."`,
        ],
        "Adaptado de Doc 9432 6.5.2.",
      ),
      ...entrada(
        "READ BACK · «Repítame todo este mensaje, o la parte especificada del mismo, exactamente como la haya recibido».",
        [
          `ATC:   "Aviatory 452, runway 13, QNH 1021, squawk 4127."`,
          `PILOT: "Roger, Aviatory 452."`,
          `ATC:   "Aviatory 452, read back."`,
          `PILOT: "Runway 13, QNH 1021, squawk 4127, Aviatory 452."`,
        ],
        "(ejemplo construido) ROGER no bastaba: pista, reglaje de altímetro y código SSR siempre se colacionan (Doc 4444 4.5.7.5.1 c).",
      ),
      ...entrada(
        "RECLEARED · «Se efectúa una modificación en su última autorización y esta nueva autorización invalida la anterior o parte de ella».",
        [`ATC:   "Aviatory 452, recleared FL 330."`, `PILOT: "Recleared FL 330, Aviatory 452."`],
        "Adaptado de Doc 9432 3.3.3.2. La autorización anterior (o la parte modificada) deja de valer.",
      ),
      ...entrada(
        "REPORT · «Páseme la siguiente información…».",
        [
          `ATC:   "Aviatory 452, report passing FL 80."`,
          `PILOT: "Aviatory 452, wilco."`,
          `PILOT: "Aviatory 452, passing FL 80."`,
        ],
        "Adaptado de Doc 9432 3.3.3.1.",
      ),
      ...entrada(
        "REQUEST · «Desearía saber…» o «Deseo obtener…».",
        [
          `PILOT: "Aviatory 452, request descent."`,
          `ATC:   "Aviatory 452, descend to FL 60."`,
          `PILOT: "Leaving FL 90, descending to FL 60, Aviatory 452."`,
        ],
        "Adaptado de Doc 9432 3.3.3.1. También «request time check» (2.5.2).",
      ),
      ...entrada(
        "ROGER · «He recibido toda su transmisión anterior».",
        "Nota: «En ningún caso debe utilizarse como contestación a una pregunta que exija que se \"COLACIONE\" una respuesta directa afirmativa (AFIRMATIVO) o negativa (NEGATIVO)».",
        [`PILOT: "Aviatory 452, GIKOS 47, FL 330, TOLKO 57, RUMIK next."`, `ATC:   "Aviatory 452, roger."`],
        "Adaptado de Doc 9432 3.4.1: el controlador recibe una notificación de posición.",
        [
          `ATC:   "Aviatory 452, traffic 2 o'clock, 5 miles, northbound, Cessna at 2 000 feet."`,
          `PILOT: "Looking out, Aviatory 452."`,
        ],
        "Adaptado de Doc 9432 6.4.2 (información de tránsito). ROGER también sería aceptable aquí porque no hay instrucción.",
      ),
      ...entrada(
        "ROGER mal usado",
        [
          `ATC:   "Aviatory 452, are you able to accept runway 31?"`,
          `PILOT (incorrecto): "Roger, Aviatory 452."`,
          `PILOT: "Aviatory 452, affirm."   (o "negative")`,
        ],
        "(ejemplo construido) Una pregunta pide AFFIRM o NEGATIVE; ROGER no dice ni sí ni no.",
      ),
      ...entrada(
        "SAY AGAIN · «Repítame todo, o la siguiente parte, de su última transmisión».",
        [
          `ATC:   "Aviatory 452, (transmisión cortada) ...ading 250, descend to FL 180."`,
          `PILOT: "Aviatory 452, say again all before descend."`,
          `ATC:   "Aviatory 452, turn right heading 250, descend to FL 180."`,
          `PILOT: "Right heading 250, descending to FL 180, Aviatory 452."`,
        ],
        "Formas del Doc 9432 2.8.1.4: «say again», «say again (elemento)», «say again all before…», «say again all after…», «say again all between… and…». Diálogo (ejemplo construido).",
        [`ATC:   "Station calling Bogota Ground, say again your call sign."`, `PILOT: "Bogota Ground, Aviatory 452."`],
        "Adaptado de Doc 9432 2.8.1.5.",
      ),
      ...entrada(
        "STANDBY · «Espere y le llamaré».",
        "Nota: «\"ESPERE\" no es ni una aprobación ni una denegación».",
        [
          `PILOT: "Bogota Ground, Aviatory 452, stand 27, request push-back."`,
          `ATC:   "Aviatory 452, stand by. Expect one minute delay due B747 taxiing behind."`,
          `PILOT: "Aviatory 452."   (y NO inicia el retroceso)`,
        ],
        "Adaptado de Doc 9432 4.3.1. El piloto no pide al tractor que empuje: espera la llamada. Si pasa un tiempo considerable, vuelve a llamar.",
        [`PILOT: "Bogota Approach, Aviatory 452, request direct GIKOS."`, `ATC:   "Aviatory 452, standby."`],
        "(ejemplo construido) El avión sigue en su ruta o rumbo actual. «Standby» no es «direct GIKOS».",
      ),
      ...entrada(
        "UNABLE · «No puedo cumplir su solicitud, instrucciones o autorización».",
        "Nota: normalmente va seguida de algún motivo.",
        [`ATC:   "Aviatory 452, climb to FL 240, expedite until passing FL 180."`, `PILOT: "Unable to expedite, Aviatory 452."`],
        "Adaptado de Doc 9432 3.3.3.3. Con motivo: «unable to cross TOLKO FL 150 due weight, maintaining FL 130» (2.8.3.10). UNABLE es una respuesta profesional, no una falta.",
      ),
      ...entrada(
        "VERIFY · Estado a verificar.",
        "No aparece en la tabla del Doc 9432 2.6 cargado. En la tabla de instrucciones SSR (Doc 9432 6.5.1) aparece en español «VERIFIQUE NIVEL: Compruebe y confirme su nivel», usada para verificar el nivel que presenta el Modo C, sin la columna en inglés.",
        [`ATC:   "Aviatory 452, verify level."`, `PILOT: "Aviatory 452, maintaining FL 240."`],
        "(ejemplo construido) Si VERIFY es palabra normalizada vigente y con qué significado exacto: VERIFICAR.",
      ),
      ...entrada(
        "WILCO · «He comprendido su mensaje y procederé de acuerdo».",
        [`ATC:   "Aviatory 452, next report RUMIK."`, `PILOT: "Aviatory 452, wilco."`],
        "Adaptado de Doc 9432 3.4.2.",
        [`ATC:   "Aviatory 452, cross runway 24, report vacated."`, `PILOT: "Crossing, wilco, Aviatory 452."`],
        "Adaptado de Doc 9432 4.4.2 (en el ejemplo original, «CROSSING, WILCO G-CD»): la parte de pista se colaciona (CROSSING) y WILCO cubre «report vacated». En la práctica actual el cruce de pista se colaciona con el número de pista (Doc 4444 4.5.7.5.1 b; capítulo 16).",
      ),
      ...entrada(
        "ROGER frente a WILCO, en la misma situación",
        [
          `ATC:   "Aviatory 452, report when ready for departure."`,
          `PILOT: "Aviatory 452, wilco."          (correcto: entendió y va a notificar)`,
          `PILOT: "Roger, Aviatory 452."          (incompleto: solo dice que lo escuchó)`,
        ],
        "Adaptado de Doc 9432 4.5.3 («G-CD WILCO»).",
      ),
      { kind: "p", text: "**Otras palabras de la tabla del Doc 9432 2.6** que conviene reconocer:" },
      {
        kind: "table",
        head: ["Palabra", "Significado oficial", "Nota"],
        rows: [
          ["OVER", "«Mi transmisión ha terminado y espero su respuesta».", "No se utiliza normalmente en VHF."],
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
          "Después del despegue, la torre suele pasar a salida con CONTACT: se cambia y se llama. En algunos aeropuertos la torre pide MONITOR y la salida llama primero. Cuál se usa depende del procedimiento local publicado; lo que no cambia es qué exige cada palabra.",
      },
      {
        kind: "enLaOperacion",
        momento: "Pushback con STANDBY",
        texto:
          "El PM responde a Ground y avisa al personal de tierra que no hay autorización todavía. Un «standby» mal oído como «approved» termina en un retroceso sin autorización.",
      },
      {
        kind: "enLaOperacion",
        momento: "WILCO en crucero",
        texto:
          "Instrucciones de notificar un punto o una hora se contestan con WILCO; las de nivel, rumbo, velocidad, SSR y QNH se colacionan (Doc 4444 4.5.7.5.1 c).",
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
      error("ROGER a una pregunta", "La nota del Doc 9432 2.6 lo prohíbe: una pregunta pide AFFIRM o NEGATIVE."),
      error("«Affirmative» en vez de AFFIRM", "La palabra de la tabla es AFFIRM."),
      error(
        "Tomar STANDBY como «sí»",
        "Empezar un rodaje, un pushback o un viraje porque ATC dijo «standby».",
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
        kind: "hueco",
        rotulo: "CM-11-02 · Diagrama · 9:16 · 1080×1920 px",
        descripcion:
          "Imagen sugerida: árbol de decisión vertical para responder a una transmisión de ATC. Pregunta 1: «¿Es una pregunta?» → sí: AFFIRM / NEGATIVE (nunca ROGER). Pregunta 2: «¿Contiene pista, nivel, rumbo, velocidad, SSR, QNH, nivel de transición o autorización de ruta?» → sí: colación completa + distintivo. Pregunta 3: «¿Es una instrucción que no se colaciona?» → sí: WILCO (o colación). Pregunta 4: «¿Es solo información?» → ROGER. En cualquier punto: «¿No entendió?» → SAY AGAIN / CONFIRM. «¿No puede?» → UNABLE + motivo. Objetivo: que el piloto elija la respuesta correcta según el tipo de transmisión y no use ROGER como respuesta universal.",
        alto: 560,
        ratio: "9 / 16",
        anchoMax: 340,
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "ROGER = recibido. WILCO = entendido y voy a cumplir. Ninguno reemplaza la colación.",
          "STANDBY = espere; no es aprobación ni denegación.",
          "CONTACT = cambie y llame. MONITOR = cambie y escuche.",
          "AFFIRM y NEGATIVE para preguntas; nunca ROGER.",
          "UNABLE + motivo es una respuesta profesional.",
          "GO AHEAD y VERIFY: verificar su estado en la norma vigente antes de enseñarlos como normalizados.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 9432 2.6 · Doc 4444",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 9432 (4.ª ed.) 2.6 (tabla completa de palabras y frases normalizadas con sus notas, incluida la nota de omisión de GO AHEAD), 2.5.2, 2.8.1.1, 2.8.1.4 a 2.8.1.7, 2.8.2.1, 2.8.2.2, 2.8.3.3, 2.8.3.6, 2.8.3.9, 2.8.3.10, 2.8.4.3, 3.3.3.1 a 3.3.3.3, 3.4.1, 3.4.2, 4.3.1, 4.5.3, 4.5.5, 4.5.10, 4.2.2, 4.4.2, 6.4.2, 6.5.1, 6.5.2; Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1.",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: estado vigente de GO AHEAD («proceed with your message») contra Anexo 10 Vol. II cap. 5, tabla de palabras y frases normalizadas, edición vigente (no cargado).",
              "VERIFICAR: VERIFY como palabra normalizada en inglés y su significado, contra Anexo 10 Vol. II cap. 5 y Doc 4444 cap. 12 (no cargados). El Doc 9432 6.5.1 solo trae «VERIFIQUE NIVEL» en español.",
              "VERIFICAR: uso actual de MONITOR para transferencias (p. ej. «monitor (dependencia) (frecuencia)») contra Doc 4444 cap. 12 y la AIP de cada Estado (no cargados).",
              "VERIFICAR: ejemplos construidos de ACKNOWLEDGE, BREAK, BREAK BREAK, CONFIRM (pregunta del piloto), CORRECT, DISREGARD, HOW DO YOU READ, READ BACK, SAY AGAIN ALL BEFORE, STANDBY a solicitud de directo, VERIFY LEVEL y la pregunta «are you able to accept runway 31» contra Doc 4444 cap. 12 y Anexo 10 Vol. II cap. 5 (no cargados).",
              "VERIFICAR: redacción actual de la autorización de cruce de pista con número de pista contra Doc 4444 cap. 12 (no cargado; capítulo 16).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
]
