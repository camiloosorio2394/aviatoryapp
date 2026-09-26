/**
 * Nivel 2 · El idioma (lecciones 08 a 11, capítulos 8 a 11 de la especificación).
 *
 * El inglés de la radio no es el inglés académico: aquí se separan el inglés
 * general, el Aviation English, la fraseología y el plain language, y se
 * repasan las palabras estándar que no admiten sinónimos. La lección 11 es la
 * de referencia de las palabras normalizadas: las demás remiten a ella.
 *
 * Fuente editorial inicial: docs/comunicaciones/nivel-2.md. A la vista queda
 * lo esencial (máximo dos errores y un aviso «Verificar» de una línea); el
 * análisis largo baja a «Para profundizar» y el detalle de lo pendiente, a
 * «Fuentes». «Cómo leer los ejemplos» está en la lección 1.
 * El formato de los bloques está documentado al inicio de index.ts.
 */

import type { DocBlockData, DocScreen } from "@/lib/docBlocks"

/** Un error frecuente: el nombre del error como título y la explicación. */
function error(titulo: string, text: string): DocBlockData {
  return { kind: "callout", tone: "warn", title: titulo, text }
}

/** La explicación larga o la norma completa, plegada. */
const profundizar = (bloques: DocBlockData[]): DocBlockData => ({ kind: "detalleTecnico", etiqueta: "Para profundizar", bloques })

/** El único aviso «Verificar» visible de la lección: una línea, qué documento consultar. */
const verificar = (text: string): DocBlockData => ({ kind: "callout", tone: "verificar", title: "Verificar", text })

export const NIVEL_2: DocScreen[] = [
  // ── 08 ──────────────────────────────────────────────────────────────────
  {
    n: 8,
    title: "Aviation English",
    kicker: "Comunicar con eficacia, no con sofisticación",
    minutes: 4,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "«Aviation English» es el nombre que la instrucción da al inglés de la radiotelefonía. La Organización de Aviación Civil Internacional (OACI; ICAO) no lo mide por lo culto que suene, sino por si funciona: claro, preciso, conciso, sin ambigüedad y que produce la acción correcta en la cabina y en la consola.",
      },
      {
        kind: "table",
        head: ["Capa (Doc 9835, 3.2.6 y 3.2.7)", "Qué es", "Ejemplo"],
        rows: [
          ["**General English**", "El idioma de todos los días.", "«Could you possibly let us go a bit lower?»"],
          ["**Lenguaje aeronáutico**", "Todo el idioma de la industria: mantenimiento, despacho, operaciones.", "Un manual de mantenimiento"],
          ["**Radiotelefonía**", "Lo que miden los requisitos OACI: fraseología + lenguaje común. Solo pilotos y ATC.", "Todo lo que se dice en la frecuencia"],
          ["**Fraseología normalizada**", "Un sublenguaje codificado: cada palabra tiene un significado fijo.", "«REQUEST DESCENT»"],
          ["**Lenguaje común (plain language)**", "Uso espontáneo del idioma cuando la fraseología no alcanza, con claridad y concisión (3.3.14).", "«We have a passenger with severe chest pain»"],
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-08-01.svg",
        alt: "Conjuntos anidados: inglés general, inglés aeronáutico y radiotelefonía; dentro de la radiotelefonía aparecen fraseología normalizada y lenguaje común.",
        ancho: 1200,
        alto: 900,
        pie: "Reconoce qué registro exige la situación: use fraseología para lo previsto y lenguaje común directo cuando aquella no alcance. En ambos casos, confirme que el otro comprendió la condición y la acción necesaria. Amplía la lámina para seguir los niveles. Esquema basado en el Doc 9835, 3.2.6 a 3.3.14.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**La fraseología es un idioma reducido a propósito**: unas 400 palabras, oraciones cortas sin artículos ni pronombres (Doc 9835, 3.3.10). «Cleared to land», no «You are now cleared to land on the runway».",
          "**Se mide la inteligibilidad, no el acento**: el nivel operacional no pide pronunciación de nativo (4.5.5 c), y al nativo también se le exige hacerse entender (3.3.3 b).",
          "**El inglés informal es un riesgo operacional**: nada de jerga ni modismos (3.3.9; 4.6.4).",
          "**El idioma de la frecuencia** es el de la estación terrestre o el inglés, que debe estar disponible en rutas y aeropuertos internacionales (Anexo 10, Vol. II, 5.2.1.2, citado en Doc 9835, 4.3.5). Donde coexisten español e inglés, quien no entiende uno pierde parte de la conciencia del tránsito (3.3.22).",
        ],
      },
      {
        kind: "p",
        text: "Los dos malentendidos que cita el Doc 9835, 3.3.7 («two» por «to» y «We are at take-off») están en la lección 1. Cómo se decide entre fraseología y lenguaje común, en la lección 10.",
      },
      profundizar([
        {
          kind: "p",
          text: "La fraseología tiene cerca de la mitad de sus oraciones imperativas o pasivas, sin verbos auxiliares y con pocas preposiciones (Doc 9835, 3.3.10). Quitar palabras no es pobreza del idioma: es lo que reduce la ambigüedad. La escala OACI no toma al hablante nativo como modelo (4.5.10), y a los nativos se les exige modular su inglés (5.3.1.4 d). El Preámbulo del Doc 9432 lo resume: las declaraciones directas sin expresiones idiomáticas se entienden mejor que las indirectas, coloquiales o informales. El Doc 9835 menciona operaciones de México, Centroamérica y parte de Sudamérica en las que puede escucharse español e inglés en una misma frecuencia; eso no permite afirmar que todas las frecuencias de la región sean bilingües.",
        },
        { kind: "sub", text: "De la fraseología al lenguaje común" },
        {
          kind: "pasos",
          items: [
            {
              rotulo: "Solicitud normal: fraseología disponible",
              codigo: "DOC 9432, 3.3.3.1 · REQUEST DESCENT / LEAVING FL 90 DESCENDING TO FL 60",
              texto: "Estos son **fragmentos de ejemplo del Manual de Radiotelefonía**, no el diálogo completo de un vuelo ni una autorización local. El primero expresa la solicitud sin rodeos; el segundo informa tanto el nivel que se abandona como el autorizado. Un piloto de aerolínea no comunica solo la palabra DESCENT ni mueve el selector antes de escuchar una autorización: integra distintivo, límite vertical, restricciones asociadas y colación que permita al controlador comprobar la interpretación.",
            },
            {
              rotulo: "La palabra normalizada no se sustituye por una paráfrasis",
              texto: "El Doc 9835, 3.3.11, explica el riesgo de pronunciar una pista como «ten» cuando «one zero» diferencia los dígitos y evita confusión con «turn». El Doc 9432, 2.4.2, prescribe la pronunciación separada de las cifras de pista. Es una regla de identificación, no de estilo.",
            },
            {
              rotulo: "Situación no prevista: lenguaje común explícito",
              texto: "Si hay una falla hidráulica y la tripulación necesita tiempo para una lista de comprobación, el mensaje útil identifica el problema, lo que puede mantener la aeronave y la ayuda requerida. Decir «tenemos un problema» sin explicar la consecuencia deja al controlador sin una imagen operativa; prometer una maniobra todavía no evaluada es igualmente deficiente. El Doc 9835, 5.3.3.4 a 5.3.3.7, insiste en declaraciones directas y en limitar la carga informativa por transmisión.",
            },
            {
              rotulo: "Caso documentado: US Airways 1549",
              texto: "El caso de la lección 1 (NTSB AAR-10/03, §1.1 y apéndice B) muestra la lección lingüística: «no podemos» y la alternativa prevista transmitieron una capacidad real que una colación cortés de una pista inviable habría ocultado.",
            },
          ],
        },
        {
          kind: "enLaOperacion",
          momento: "Cabina multicultural",
          texto:
            "En una aerolínea con tripulaciones de varios países, la fraseología es el idioma común de los dos pilotos, no solo del piloto con ATC. El Doc 9835 (5.3.3.5) usa un ejemplo de cabina: «¿Qué pasa con los flaps?» es peor que «Es preciso desplegar más los flaps».",
        },
        { kind: "sub", text: "Más errores frecuentes" },
        {
          kind: "list",
          items: [
            "**Adornar la fraseología** con cortesías y rellenos («please», «thank you very much», «uh», «okay»). El Doc 9432 2.2.1 g) pide evitar los sonidos de duda.",
            "**Creer que hablar rápido es hablar bien.** El Doc 9432 2.2.1 d) fija no más de 100 palabras por minuto.",
            "**Suponer que el hablante nativo siempre tiene razón.** Si el mensaje no fue claro, el problema es del mensaje: se pide repetición.",
          ],
        },
        {
          kind: "p",
          text: "Los errores de idioma propios de hispanohablantes se trabajan en la lección 66.",
        },
      ]),
      verificar("Idioma de cada dependencia en Colombia: AIP/eAIP Colombia vigente, GEN 3.4."),
      {
        kind: "enLaOperacion",
        momento: "En la línea y en la entrevista",
        texto:
          "Las autorizaciones a vuelos nacionales pueden salir en español y las de vuelos extranjeros en inglés: escuche las dos, porque una instrucción a otro tráfico puede afectar su secuencia. Si el controlador habla rápido, la herramienta es SAY AGAIN o SPEAK SLOWER (lecciones 11 y 53). Y un evaluador que oye «affirmative», «okay» o «we're gonna» no evalúa su inglés: evalúa su disciplina de fraseología.",
      },
      error("Traducir mentalmente del español", "«We are at take-off» (estamos en el despegue) reproduce el error que documenta el Doc 9835, 3.3.7 b)."),
      error(
        "Salto de código",
        "Meter palabras no normalizadas en una frase normalizada, o alargarla con gramática común (Doc 9835, 3.3.21): ya no es ni fraseología ni lenguaje claro.",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "La radiotelefonía tiene dos registros: fraseología normalizada y lenguaje común.",
          "Aviation English busca efectividad, no sofisticación.",
          "La fraseología es corta a propósito: sin artículos, sin pronombres, sin rellenos.",
          "Nada de jerga ni modismos, aunque el otro los use.",
          "Donde coexisten español e inglés, escuche al resto del tránsito.",
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
            text: "Doc 9835 (2.ª ed.) glosario «Lenguaje común», 3.2.6, 3.2.7, 3.3.3, 3.3.7, 3.3.9, 3.3.10, 3.3.11, 3.3.14, 3.3.21, 3.3.22, 4.3.5, 4.5.5 c), 4.5.10, 4.6.4, 5.3.1.4 d), 5.3.2.2 y 5.3.3.4 a 5.3.3.7; Doc 9432 (4.ª ed.) Preámbulo, 2.2.1 d) y g), 2.4.2, 2.4.3, 2.8.3.3 y 3.3.3.1; NTSB AAR-10/03, §1.1 y apéndice B (https://www.ntsb.gov/investigations/accidentreports/reports/aar1003.pdf). Idioma en Colombia: RAC 211 (Enm. 6, nov. 2025), 211.400, pide que los controladores hablen y comprendan el inglés en las comunicaciones radiotelefónicas.",
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
    minutes: 4,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "El nivel de comprensión y expresión oral que deben acreditar quienes usan la radiotelefonía en operaciones internacionales (Anexo 1, 1.2.9, Apéndice 1 y Adjunto A; lo explica el Doc 9835). No se trata de sonar como nativo, sino de transmitir y entender información operacional, incluso cuando la situación cambia. Esta lección no prepara el examen: para eso está el módulo de Inglés OACI.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "table",
        head: ["Nivel", "Nombre (Doc 9835, 4.5.6)", "En inglés"],
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
        kind: "list",
        items: [
          "**El nivel 4 es el mínimo operacional** desde el 5 de marzo de 2008 para pilotos, controladores y operadores de estaciones aeronáuticas (Doc 9835, 4.4.4 y 4.6.2).",
          "**Se califica en seis habilidades**: pronunciación, estructura, vocabulario, fluidez, comprensión e interacción (4.5.6).",
          "**La nota final es la más baja de las seis, no el promedio** (4.5.5 d y 4.5.11).",
          "**Quien no tiene nivel 6 se reevalúa** por la posible pérdida del idioma (4.4.7 a 4.4.9). La OACI recomienda tres años para el 4 y seis para el 5; el intervalo lo fija la autoridad de cada Estado.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-09-01.svg",
        alt: "Seis niveles de competencia lingüística OACI; el mínimo operacional empieza en cuatro. Ejemplo de seis habilidades: 5, 5, 4, 5, 3 y 5; la comprensión en tres fija el resultado global en tres.",
        ancho: 1600,
        alto: 900,
        pie: "Reconoce el nivel 4 como piso operacional. Si una sola habilidad queda en 3, el resultado global es 3 aunque las demás sean mayores; no promedies. Los valores son didácticos, no una evaluación real. Amplía la lámina para leer las seis habilidades. Basado en el Doc 9835, 4.5.5 y 4.5.11.",
      },
      { kind: "p", text: "**El nivel 4 en la frecuencia** (descriptores del Doc 9835, 4.6.2 a 4.6.7, en palabras simples):" },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          { titulo: "Pronunciación", puntos: ["Se le nota el acento y está bien; lo que no puede pasar es que el controlador pida repetición a menudo."] },
          { titulo: "Estructura", puntos: ["Arma frases simples nuevas, no solo memorizadas. Un error que no cambia el sentido no es el problema."] },
          { titulo: "Vocabulario", puntos: ["Si no sabe la palabra técnica, la describe con palabras simples (lección 52)."] },
          { titulo: "Fluidez", puntos: ["Sale de la fraseología al lenguaje común sin quedarse mudo."] },
          { titulo: "Comprensión", puntos: ["Entiende la rutina y, ante lo inesperado, pide aclaración en vez de suponer."] },
          { titulo: "Interacciones", puntos: ["Responde sin demora, inicia la conversación cuando la necesita y verifica lo dudoso."] },
        ],
      },
      {
        kind: "p",
        text: "**El 3 y el 5.** En el nivel 3 la comprensión «se limita a las comunicaciones de rutina en condiciones óptimas» (4.6.6); el 5 comprende con exactitud aun con complicaciones y gran diversidad de acentos. El 6 «no es un requisito indispensable» (4.5.9).",
      },
      {
        kind: "p",
        text: "**Saber de memoria «cleared for take-off» no demuestra nivel 4**: la evaluación se concentra en el lenguaje común (Doc 9835, 6.2.8.6). Explicar en inglés simple un problema sin frase hecha, sí.",
      },
      {
        kind: "quote",
        text: "Es mucho más seguro repreguntar o pedir aclaración, incluso reconocer sencillamente que uno no ha entendido, que dejar que el silencio se interprete erróneamente como comprensión del mensaje.",
        source: "Doc 9835 4.5.3 c) y 4.6.7",
      },
      profundizar([
        { kind: "sub", text: "Descriptores textuales del nivel 4 (Doc 9835, 4.6.2 a 4.6.7)" },
        {
          kind: "kv",
          items: [
            { k: "Pronunciación", v: "«La pronunciación, acentuación, ritmo y entonación tienen la influencia de la lengua primaria o de la variante regional pero sólo en algunas ocasiones interfieren en la facilidad de comprensión.»" },
            { k: "Estructura", v: "«Utiliza las estructuras gramaticales y sintácticas básicas creativamente, y por lo general con buen dominio. Puede cometer errores, especialmente en circunstancias inusuales o imprevistas, pero los errores rara vez interfieren con el significado.»" },
            { k: "Vocabulario", v: "«La amplitud y precisión del vocabulario son por lo general suficientes para comunicarse eficazmente sobre temas comunes, concretos y relacionados con el trabajo. Con frecuencia puede parafrasear satisfactoriamente aunque carece del vocabulario necesario para desenvolverse en circunstancias extraordinarias o imprevistas.»" },
            { k: "Fluidez", v: "«Capaz de expresarse con frases largas a un ritmo apropiado. Ocasionalmente puede perder fluidez durante la transición entre un discurso practicado o formulado y la interacción espontánea pero sin impedir una comunicación eficaz. En su discurso emplea limitadamente acentuaciones o conjunciones. Las palabras superfluas no lo confunden.»" },
            { k: "Comprensión", v: "«Comprende con bastante exactitud temas comunes, concretos y relacionados con el trabajo, cuando el acento o las variantes utilizadas son suficientemente inteligibles para la comunidad internacional de usuarios. Cuando enfrenta complicaciones de carácter lingüístico o circunstancial o acontecimientos imprevistos su comprensión es más lenta o requiere estrategias de aclaración.»" },
            { k: "Interacciones", v: "«Por lo general las respuestas son inmediatas, apropiadas e informativas. Inicia y sostiene intercambios verbales aun cuando trate sobre situaciones imprevistas. Ante posibles malentendidos verifica, confirma o clarifica adecuadamente.»" },
          ],
        },
        {
          kind: "p",
          text: "Los niveles 1 y 2 no cumplen el mínimo operacional; para usar la escala completa en una evaluación formal hay que consultar el Adjunto A del Anexo 1 vigente. En el nivel 3 la respuesta suele ser inadecuada ante lo imprevisto (4.6.7); el 5 parafrasea de forma coherente (4.6.4). En la lámina, una comprensión de 3 hace que el resultado global sea 3 aunque las otras habilidades estén en 4 o 5; el Doc 9835 ilustra la misma lógica con la pronunciación. Cómo se acredita y se anota en la licencia lo decide la autoridad que otorga licencias (4.4.9). Quien acredita el nivel 6 no necesita reevaluación periódica (Anexo 1, 1.2.9.7, Nota 1). Los requisitos se aplican a fraseología y lenguaje común (4.5.2), pero la fraseología se enseña y evalúa como competencia operacional.",
        },
        { kind: "sub", text: "Cómo se reconoce el nivel operacional en la frecuencia" },
        {
          kind: "p",
          text: "**Una calificación no sustituye el juicio en cabina.** El descriptor de comprensión del nivel 4 acepta que lo imprevisto tome más tiempo, pero exige una estrategia para aclararlo. Si la transmisión llega rápida, distorsionada o contiene un término desconocido, la acción competente es solicitar repetición o confirmación antes de ejecutar. El Anexo 10, volumen II, 5.2.1.8, define **SAY AGAIN** y **SPEAK SLOWER**; SAY AGAIN a veces debe entenderse como un pedido de aclaración, y el controlador puede reformular. Se trabaja en la lección 53.",
        },
        {
          kind: "p",
          text: "**Parafrasear no es improvisar una autorización.** El piloto puede explicar qué sistema falla, qué capacidad conserva y qué necesita, manteniendo las palabras normalizadas que sí correspondan. El controlador no debe tener que inferir si la aeronave puede aceptar descenso, mantener nivel o continuar la aproximación. El Doc 9835, 3.3.18, recoge una pregunta espontánea sobre quién precedía a una aeronave en la secuencia: una duda operacional sin frase hecha exige lenguaje común claro y una respuesta que cierre la duda.",
        },
        {
          kind: "enLaOperacion",
          momento: "Requisito de contratación",
          texto:
            "Para una operación internacional, la tripulación debe cumplir los requisitos lingüísticos aplicables y acreditar el nivel conforme a su licencia y al Estado que la expide. Las condiciones de selección de una aerolínea pueden ser adicionales; no se deducen de la escala OACI.",
        },
        {
          kind: "enLaOperacion",
          momento: "Cabina con dos niveles distintos",
          texto:
            "Si uno de los pilotos tiene nivel 6 y el otro 4, repartir las comunicaciones por costumbre no exime al otro de comprender las autorizaciones. La asignación de funciones sigue los SOP del explotador, y ambos verifican los elementos críticos (lección 59).",
        },
        { kind: "sub", text: "Más errores frecuentes" },
        {
          kind: "list",
          items: [
            "**Leer ROGER como comprensión**: un «roger» sin colación no le dice al controlador que el piloto entendió (lección 11).",
            "**Usar modismos para «subir de nivel»**: el Doc 9835 (4.5.12 y 4.6.4) advierte que eso no autoriza a dejar la fraseología.",
          ],
        },
      ]),
      verificar("Intervalo de reevaluación, acreditación y anotación en Colombia: RAC 61 vigente y autoridad que expidió la licencia."),
      {
        kind: "enLaOperacion",
        momento: "En la línea y en la entrevista",
        texto:
          "El nivel 4 es un piso, no una meta: mantenga la práctica de escucha, aclaración y lenguaje común entre evaluaciones (Doc 9835, 4.4.7). La entrevista no reemplaza la evaluación formal, pero sí muestra si comprende el escenario, responde con claridad y pide aclaración cuando no entiende.",
      },
      error("Callar por no quedar mal", "Aceptar una instrucción que no se entendió es lo que el Doc 9835 señala como más peligroso que preguntar (4.6.7)."),
      error(
        "Confundir el examen con la operación",
        "Tener el nivel no garantiza entender a un controlador rápido con mala recepción. La estrategia sigue siendo SAY AGAIN, CONFIRM, SPEAK SLOWER.",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Seis niveles; el 4 (operacional) es el mínimo.",
          "Seis habilidades, y la nota final es la más baja de todas.",
          "El acento no es el problema; que interfiera con la comprensión, sí.",
          "Quien no es nivel 6 se reevalúa; cada autoridad fija el intervalo.",
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
            text: "Doc 9835 (2.ª ed.) 4.4.4, 4.4.7 a 4.4.11, 4.5.2, 4.5.3 c), 4.5.5 c) y d), 4.5.6, 4.5.9, 4.5.11, 4.5.12, 4.6.1 a 4.6.7, 3.3.18 y 6.2.8.6 (https://www4.icao.int/aelts/uploads/icao%20doc9835%202nd%20edition.pdf); Doc 9432 (4.ª ed.) 2.8.3.9; Anexo 10, Vol. II, 5.2.1.8 (https://www.icao.int/Meetings/anconf12/Document%20Archive/AN10_V2_cons%5B1%5D.pdf); preguntas frecuentes OACI sobre licencias e intervalos (https://www.icao.int/personnel-licensing-faq).",
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
    minutes: 4,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "list",
        items: [
          "**Fraseología normalizada**: palabras codificadas con un significado preciso y unívoco (Doc 9835, 6.2.8.4), en el Anexo 10, Vol. II, y el Doc 4444, cap. 12.",
          "**Lenguaje común (plain English)**: el uso espontáneo del idioma para lo que la fraseología no prevé (Doc 9835, glosario).",
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
        kind: "list",
        items: [
          "**La fraseología va primero** cuando cubre el mensaje (Doc 9835, 4.3.3).",
          "**No lo cubre todo**: su lista no es exhaustiva (Doc 4444, 12.2). Un problema técnico, un pasajero enfermo, una amenaza de bomba o una duda de secuencia piden lenguaje común (Doc 9835, 3.3.13 y 3.3.18).",
          "**Cuándo usarlo**: emergencias e imprevistos, aclarar una instrucción, negociar información (4.3.4).",
          "**Plain English no es** hablar informal, charlar, usar modismos ni inventar frases que suenan oficiales (4.3.4; 5.3.3.3). **Sí es** hablar con claridad y concisión, «como si se tratara de la fraseología normalizada».",
          "**Los dos se combinan**: el mensaje sigue empezando con el distintivo y usa REQUEST, UNABLE, CONFIRM, niveles y rumbos normalizados donde existan.",
        ],
      },
      {
        kind: "secuencia",
        titulo: "Estructura útil para el lenguaje común",
        items: ["Problema", "Qué puedo y qué no puedo hacer", "Qué necesito", "Intenciones"],
        orientacion: "horizontal",
        nota: "Herramienta didáctica, no norma OACI; se desarrolla en la lección 52.",
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
        pie: "Reconoce primero si hay una frase normalizada. Si no cubre la información que necesitas transmitir, describe condición, capacidad, necesidad e intención en lenguaje común directo; confirma qué entendió la otra parte. Amplía la lámina para comparar los dos registros. Síntesis didáctica de Anexo 10, Vol. II, 5.1.1.1 y Doc 9835, 4.3.3 a 4.3.4.",
      },
      {
        kind: "p",
        text: "Cómo se declara una urgencia o un socorro está en las lecciones 34 a 37; el inglés para lo no normal, en la 52.",
      },
      profundizar([
        { kind: "sub", text: "Decidir el registro antes de transmitir" },
        {
          kind: "p",
          text: "**Solicitud prevista: fraseología primero.** El Doc 9432, 3.3.3.1, incluye la formulación **REQUEST DESCENT**. Es un fragmento de su modelo, no una transmisión completa ni permiso para abandonar un nivel. En la operación se añade el distintivo, se espera la autorización y se colacionan sus elementos. Una paráfrasis larga sobre querer ir más abajo no mejora la solicitud.",
        },
        {
          kind: "p",
          text: "**Falla no cubierta: condición, consecuencia y necesidad.** Ante una indicación anormal de flaps durante el ascenso, mientras la tripulación aplica el procedimiento, el mensaje a ATC separa tres hechos: qué ocurre, cómo limita la operación y qué apoyo se solicita ahora. Si todavía no está claro cuánto tardará la lista o cuál será el destino, se comunica esa incertidumbre y se actualiza después. Llamarlo «un pequeño problema» no le permite al controlador proteger espacio ni ordenar el tráfico.",
        },
        {
          kind: "p",
          text: "**Situación médica: una necesidad operativa, no una historia clínica.** La tripulación transmite el hecho pertinente, la prioridad que necesita y la asistencia en tierra, según el procedimiento del explotador y la gravedad evaluada. No toda urgencia médica es automáticamente PAN PAN: la clasificación depende del caso (lección 35).",
        },
        {
          kind: "p",
          text: "**Rutina sin fórmula suficiente.** El Doc 9835, 3.3.17, cita un intercambio sobre mantener alta velocidad y explica que no existía fraseología OACI para esa solicitud concreta. El lenguaje común también aparece fuera de las emergencias; lo decisivo es expresar la capacidad o preferencia real de la aeronave y no tratar una aceptación provisional como autorización ilimitada.",
        },
        {
          kind: "p",
          text: "**Instrucción que no puede cumplirse.** **UNABLE** indica que no se puede acatar una solicitud, instrucción o autorización y normalmente va seguido de un motivo (Anexo 10, Vol. II, 5.2.1.8). Cuando sea oportuno, se comunica una alternativa y se espera una nueva autorización; el piloto no cambia por cuenta propia al nivel o ruta que propone.",
        },
        {
          kind: "p",
          text: "**Duda sobre el rodaje: aclarar antes de moverse.** La tripulación identifica qué tramo de la instrucción no entendió y pide confirmación. No se avanza sobre una ruta que «parece» correcta (lección 16).",
        },
        {
          kind: "p",
          text: "El Doc 9835 (3.3.19) analiza un intercambio sobre un avión liviano cuyo tren no extendía, en gran parte en lenguaje común: la enseñanza es preparar mensajes breves y actualizables cuando la condición técnica todavía evoluciona. El CPDLC permite también mensajes de texto libre, con la misma disciplina de claridad (lección 43).",
        },
        { kind: "sub", text: "Más errores frecuentes" },
        {
          kind: "list",
          items: [
            "**Pasarse al lenguaje común cuando había fraseología**: «We would like to go down» en vez de REQUEST DESCENT.",
            "**Suavizar el problema**: «little issue», «kind of» restan urgencia. El Doc 9835 (5.3.3.4) vincula el lenguaje poco directo con incidentes y accidentes.",
            "**Olvidar el distintivo y los números normalizados** también en lenguaje común: niveles con FL, rumbos en tres dígitos, pistas dígito por dígito.",
          ],
        },
      ]),
      verificar("Señal y fraseología de urgencia o socorro: Anexo 10, Vol. II, cap. 5, y Doc 4444 vigente, cap. 15."),
      {
        kind: "enLaOperacion",
        momento: "En la aerolínea",
        texto:
          "En un vuelo normal casi todo es fraseología: autorizaciones, colaciones y cambios de frecuencia. El lenguaje común se vuelve imprescindible para lo que la fórmula no contempla. En un ejercicio de selección que pida explicar una falla, diga primero la consecuencia operacional y luego la ayuda que necesita.",
      },
      error(
        "Contar la historia",
        "El Doc 9835 (3.3.15 y 3.3.16) trae un piloto que explica un traslado médico en un bloque largo, con hipótesis y rodeos: ese lenguaje común «puede ser bien poco claro». Frases cortas, en orden.",
      ),
      error(
        "Inventar fraseología",
        "«Request lower», «we're on the go», «say intentions please» dichas como si fueran normalizadas. Si no está seguro de que existe, dígalo en lenguaje común claro.",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Fraseología siempre primero; lenguaje común solo cuando la fraseología no sirve.",
          "El lenguaje común también es claro, conciso y sin ambigüedad: no es charla ni jerga.",
          "Combine: distintivo y palabras normalizadas más frases simples para lo que no tiene fórmula.",
          "Estructura: problema, qué puede y no puede, qué necesita, intenciones.",
          "Si no está seguro de que una frase es normalizada, no la invente.",
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
            text: "Anexo 10, Vol. II, 5.1.1.1 y 5.2.1.8 (https://www.icao.int/Meetings/anconf12/Document%20Archive/AN10_V2_cons%5B1%5D.pdf); Doc 9835 (2.ª ed.) glosario «Lenguaje común», 3.3.8, 3.3.13, 3.3.15 a 3.3.21, 4.3.3 y 4.3.4, 4.7.2, 5.3.3.3, 5.3.3.4 y 6.2.8.4 (https://www4.icao.int/aelts/uploads/icao%20doc9835%202nd%20edition.pdf); Doc 9432 (4.ª ed.) 2.6 y 3.3.3.1.",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: la fraseología concreta para rodaje, asistencia, secuencia y autorizaciones en el Doc 4444 y las publicaciones vigentes del Estado antes de usarla en vuelo.",
              "VERIFICAR: la señal y fraseología de urgencia o socorro contra el Anexo 10, Vol. II, cap. 5, y el Doc 4444, cap. 15 (lecciones 34 a 37).",
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
    minutes: 4,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Las palabras normalizadas de la radiotelefonía OACI: cada una dice al otro qué se recibió, qué se hará o qué hay que aclarar. Sus significados los fija el Doc 9432, 2.6. Esta es la lección de referencia del módulo: las demás remiten aquí.",
      },
      {
        kind: "definicion",
        text: "La idea central: **cada palabra tiene un solo significado y compromete a algo concreto**. Decir ROGER cuando correspondía WILCO, o tomar STANDBY como una aprobación, cambia lo que el otro cree que usted va a hacer.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "**ROGER ≠ WILCO**" },
      {
        kind: "table",
        head: ["", "ROGER", "WILCO"],
        rows: [
          ["Significado (Doc 9432, 2.6)", "«He recibido toda su transmisión anterior».", "«He comprendido su mensaje y procederé de acuerdo» (will comply)."],
          ["Qué compromete", "Solo que la transmisión llegó.", "Que entendió **y** que va a cumplir."],
          ["Cuándo", "Información que no pide acción.", "Una instrucción que no requiere colación (notificar al pasar un nivel)."],
          ["Nunca", "Ante una pregunta de sí o no, ni en lugar de una colación.", "En lugar de la colación de lo que siempre se colaciona (Doc 4444, 4.5.7.5.1)."],
        ],
      },
      {
        kind: "p",
        text: "**STANDBY ≠ aprobación.** «Espere y le llamaré»; la nota del Doc 9432, 2.6, lo dice sin matices: no es ni una aprobación ni una denegación. Quien la recibe no hace nada nuevo y espera la llamada.",
      },
      {
        kind: "kv",
        items: [
          { k: "CONTACT", v: "«Establezca comunicaciones con…». Usted cambia de frecuencia **y llama**." },
          { k: "MONITOR", v: "«Escuchar en (frecuencia)». Usted cambia **y escucha, sin llamar** (por ejemplo, el ATIS; Doc 9432, 2.8.2.2)." },
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-11-01.svg",
        alt: "Tres comparaciones: ROGER no compromete cumplimiento como WILCO; STANDBY no concede la medida como APPROVED; CONTACT requiere establecer comunicación, MONITOR solo escuchar.",
        ancho: 1600,
        alto: 900,
        pie: "Reconoce qué compromiso crea cada palabra antes de responder. ROGER y WILCO tampoco sustituyen una colación exigida; STANDBY no autoriza a moverse. Amplía para comparar los tres pares. Significados basados en el Doc 9432, 2.6.",
      },
      { kind: "sub", text: "Las demás, por lo que piden al piloto" },
      {
        kind: "table",
        head: ["Palabras", "Qué significan (Doc 9432, 2.6)"],
        rows: [
          ["AFFIRM / NEGATIVE", "Sí / no (o rechazo). La respuesta a una pregunta directa, no ROGER."],
          ["ACKNOWLEDGE", "Diga si recibió y comprendió. No sustituye la colación."],
          ["APPROVED / CLEARED / RECLEARED", "Concede lo pedido / autoriza bajo condiciones / modifica la autorización anterior."],
          ["CANCEL / DISREGARD", "Anula una autorización / no tenga en cuenta ese mensaje."],
          ["CHECK / CONFIRM / READ BACK", "Examine un sistema / verifique un dato / repita lo recibido."],
          ["REPORT / REQUEST / MAINTAIN", "Informe un dato / solicito / continúe en esas condiciones."],
          ["SAY AGAIN / I SAY AGAIN", "Repita / repito yo."],
          ["CORRECTION / CORRECT", "Me equivoqué y corrijo / lo que dijo es exacto."],
          ["BREAK / BREAK BREAK", "Separa partes de un mensaje / separa mensajes a aeronaves distintas."],
          ["UNABLE", "No puedo cumplir; normalmente con el motivo."],
          ["SPEAK SLOWER / WORDS TWICE", "Hable más lento / la comunicación es difícil: cada palabra dos veces."],
        ],
      },
      profundizar([
        {
          kind: "p",
          text: "**ACKNOWLEDGE, AFFIRM y NEGATIVE responden a necesidades distintas.** ACKNOWLEDGE pide comunicar si el mensaje se recibió y comprendió; no sustituye la colación. AFFIRM expresa una respuesta afirmativa directa y NEGATIVE una negativa o rechazo. Si el controlador pregunta si la tripulación puede aceptar una instrucción o una pista, el piloto responde la pregunta y no deja la decisión implícita en ROGER.",
        },
        {
          kind: "p",
          text: "**APPROVED, CLEARED y RECLEARED no son sinónimos.** APPROVED concede la medida propuesta; CLEARED autoriza a proceder bajo condiciones determinadas; RECLEARED modifica la autorización anterior y la reemplaza en todo o en la parte indicada. El piloto identifica qué cambió y colaciona lo que exige la norma: una autorización de ruta no implica autorización de despegue (Doc 9432, 2.8.3.6 y 3.3.3.2).",
        },
        {
          kind: "p",
          text: "**CANCEL y DISREGARD.** CANCEL anula una autorización previa; DISREGARD pide no tener en cuenta el mensaje al que se refiere. Si cualquiera aparece durante una maniobra, la tripulación determina qué elemento quedó sin efecto, verifica la instrucción que sí permanece vigente y detiene una acción que ya no esté autorizada.",
        },
        {
          kind: "p",
          text: "**CHECK, CONFIRM y READ BACK.** CHECK ordena examinar un sistema o procedimiento, «en ningún otro contexto», y por sí sola normalmente no exige respuesta. CONFIRM solicita verificar una autorización, medida o información concreta. READ BACK pide repetir el mensaje, o la parte señalada, como se recibió. Los requisitos de colación están en el Doc 4444, 4.5.7.5.1 (lección 12).",
        },
        {
          kind: "p",
          text: "**CONTACT y MONITOR determinan quién inicia la conversación** (Doc 9432, 2.8.2.1 y 2.8.2.2). «Quede en escucha» (STAND BY FOR…) se usa cuando la dependencia tiene intención de llamarlo pronto: en los dos casos llama el otro. Si una transferencia queda condicionada a un punto o nivel, esa condición forma parte del mensaje. Antes de aplicar MONITOR a la transferencia entre dependencias, consulte el procedimiento local vigente.",
        },
        {
          kind: "p",
          text: "**REPORT, REQUEST y MAINTAIN.** Pedir un descenso no es obtenerlo, y recibir la instrucción de notificar un punto no cambia la ruta autorizada. WILCO puede cerrar una instrucción de notificar que no exija colación, pero no sustituye la colación obligatoria de niveles o autorizaciones.",
        },
        {
          kind: "p",
          text: "**SAY AGAIN, I SAY AGAIN y CORRECTION reparan problemas distintos.** SAY AGAIN pide al otro repetir todo o una parte (Doc 9432, 2.8.1.4 describe cómo delimitarla); I SAY AGAIN anuncia que el hablante repite para aclarar o enfatizar; CORRECTION anuncia que corrige un error propio. Cómo pedir aclaración se trabaja en la lección 53.",
        },
        {
          kind: "p",
          text: "**BREAK y BREAK BREAK son señales de estructura, no autorizaciones.** Ante distintivos parecidos, escuchar la separación y el distintivo siguiente protege de ejecutar una instrucción destinada a otro tráfico (lección 56).",
        },
        {
          kind: "p",
          text: "**HOW DO YOU READ y la prueba de radio.** La escala de uno a cinco (Doc 9432, 2.8.4.3) califica la recepción, no la competencia lingüística del hablante (lección 3).",
        },
        {
          kind: "p",
          text: "**STANDBY, UNABLE y WILCO comprometen acciones opuestas.** La tripulación no inicia un retroceso ni cambia de nivel después de STANDBY; tampoco dice WILCO a algo que sabe que no puede cumplir.",
        },
        {
          kind: "table",
          head: ["Palabra", "Significado oficial", "Nota"],
          rows: [
            ["OVER", "«Mi transmisión ha terminado y espero su respuesta».", "No se utiliza normalmente en VHF."],
            ["OUT", "«Este intercambio de transmisiones ha terminado y no se espera respuesta».", "No se utiliza normalmente en VHF."],
          ],
        },
        {
          kind: "enLaOperacion",
          momento: "Cambio de frecuencia en salida",
          texto:
            "Con CONTACT, la tripulación sintoniza y establece la comunicación; con MONITOR, sintoniza y escucha. En qué fase se usa cada una depende del procedimiento local publicado y de la instrucción recibida. MONITOR nunca convierte el silencio en una nueva autorización.",
        },
        {
          kind: "enLaOperacion",
          momento: "CONFIRM antes de ejecutar",
          texto: "Si el nivel o el rumbo no coincide con lo esperado, se confirma antes de mover el selector. Es la defensa contra el sesgo de expectativa (lección 55).",
        },
        { kind: "sub", text: "Más errores frecuentes" },
        {
          kind: "list",
          items: [
            "**ROGER a una pregunta de sí o no**: no comunica cuál de las dos corresponde. Use AFFIRM o NEGATIVE.",
            "**«Affirmative» en vez de AFFIRM**: la palabra de la tabla es AFFIRM.",
            "**MONITOR tratado como CONTACT**: llamar en una frecuencia de monitoreo congestiona; tratar CONTACT como MONITOR deja a la aeronave sin contacto.",
            "**CORRECTION por CORRECT**: una anuncia un error propio; la otra confirma que lo dicho está bien.",
            "**CHECK usado como «confirme»**: el Doc 9432 2.6 lo limita a examinar un sistema o procedimiento.",
            "**SAY AGAIN por I SAY AGAIN**: uno pide repetición; el otro la anuncia.",
          ],
        },
      ]),
      verificar("GO AHEAD y VERIFY no están confirmadas como normalizadas: Anexo 10, Vol. II, cap. 5, y Doc 4444 vigente, cap. 12."),
      {
        kind: "enLaOperacion",
        momento: "En la línea",
        texto:
          "Pushback con STANDBY: el piloto que monitorea confirma con la tripulación y el personal de tierra que todavía no hay aprobación para retroceder. Y WILCO en crucero cierra una instrucción de notificar, pero nivel, rumbo, velocidad, pista y código SSR se colacionan (lección 12).",
      },
      error("ROGER en lugar de colación", "El error más común. ROGER no le permite al controlador verificar que entendió el nivel, la pista o el QNH."),
      error("Tomar STANDBY como «sí»", "Empezar un rodaje, un retroceso o un viraje porque ATC dijo STANDBY."),
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
          "AFFIRM y NEGATIVE para sí o no; ROGER no responde la pregunta.",
          "UNABLE + motivo es una respuesta profesional.",
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
            text: "Doc 9432 (4.ª ed.) 2.6 (significados y notas), 2.8.1.4 a 2.8.1.7 (repetición y corrección), 2.8.2.1 y 2.8.2.2 (CONTACT y MONITOR), 2.8.3.6 (autorizaciones), 2.8.4.3 (inteligibilidad), 3.3.3.2 (RECLEARED); Doc 4444, 4.5.7.5.1 (colaciones); Anexo 10, Vol. II, 5.2.1.8 (palabras normalizadas, https://www.icao.int/Meetings/anconf12/Document%20Archive/AN10_V2_cons%5B1%5D.pdf).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: estado vigente de GO AHEAD («proceed with your message») contra Anexo 10 Vol. II cap. 5, tabla de palabras y frases normalizadas, edición vigente (no cargado). La edición consultada del Doc 9432 indica que GO AHEAD se omitió de su tabla.",
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
