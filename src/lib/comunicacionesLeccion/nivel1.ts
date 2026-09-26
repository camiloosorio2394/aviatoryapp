/**
 * Nivel 1 · Fundamentos (lecciones 01 a 07, capítulos 1 a 7 de la especificación).
 *
 * Antes de la primera frase: para qué se habla por radio, con quién, con qué
 * disciplina, y cómo se deletrean letras, números y distintivos. Todo lo que
 * viene después se apoya en esto.
 *
 * Fuente: docs/comunicaciones/nivel-1.md. A la vista queda lo que un piloto
 * necesita ver (máximo cinco ejemplos y dos errores por lección, un solo aviso
 * «Verificar» de una línea); lo demás baja a plegables: «Más ejemplos»,
 * «Para profundizar», «Ejercicios» y «Ver fuentes», que guarda el detalle de
 * lo que falta verificar. «Cómo leer los ejemplos» va una sola vez en todo el
 * módulo: en la lección 1.
 *
 * Distintivos: los de aerolínea son reales (FAA JO 7340.2P Change 3, que
 * publica la asignación del Doc 8585 de la OACI); el principal es AVIANCA 452
 * y los parecidos, AVIANCA 425 y AVIANCA 542. El número de vuelo es ficticio.
 *
 * El formato de los bloques está documentado al inicio de index.ts.
 */

import type { DocBlockData, DocScreen } from "@/lib/docBlocks"

/** Una transmisión por renglón: «ATC: …» y «PILOT: …». */
const tx = (...lineas: string[]) => lineas.join("\n")

/** Las fuentes del capítulo, plegadas: lo verificado y lo que falta verificar. */
function fuentes(verificado: string, porVerificar: string[]): DocBlockData {
  return {
    kind: "detalleTecnico",
    etiqueta: "Ver fuentes",
    bloques: [
      { kind: "sub", text: "Verificado" },
      { kind: "p", text: verificado },
      { kind: "sub", text: "Por verificar" },
      { kind: "list", items: porVerificar },
    ],
  }
}

/** Lo que no cabe a la vista (ejemplos y errores de más), plegado. */
const masEjemplos = (bloques: DocBlockData[]): DocBlockData => ({ kind: "detalleTecnico", etiqueta: "Más ejemplos", bloques })

/** La explicación larga o la norma completa, plegada. */
const profundizar = (bloques: DocBlockData[]): DocBlockData => ({ kind: "detalleTecnico", etiqueta: "Para profundizar", bloques })

/** El único aviso «Verificar» visible de la lección: una línea, qué documento consultar. */
const verificar = (text: string): DocBlockData => ({ kind: "callout", tone: "verificar", title: "Verificar", text })

/** Un error frecuente a la vista (máximo dos por lección). */
const error = (title: string, text: string): DocBlockData => ({ kind: "callout", tone: "warn", title, text })

/** La nota única de cada lección con ejemplos. */
const NOTA_EJEMPLOS: DocBlockData = {
  kind: "callout",
  tone: "info",
  text: "Ejemplo educativo. El distintivo de llamada de la aerolínea es real; el número de vuelo es ficticio.",
}

/** Etiqueta de un ejemplo cuya frase todavía no está confirmada en la edición vigente. */
const POR_VERIFICAR = "por verificar (ver el aviso «Verificar»)"

export const NIVEL_1: DocScreen[] = [
  // ── 01 ──────────────────────────────────────────────────────────────────
  {
    n: 1,
    title: "Para qué sirven las comunicaciones",
    kicker: "Claridad, brevedad y precisión entre piloto y ATC",
    minutes: 6,
    blocks: [
      {
        kind: "callout",
        tone: "info",
        title: "Cómo leer los ejemplos",
        text: "Ejemplo educativo. El distintivo de llamada de la aerolínea es real; el número de vuelo es ficticio. Los diálogos del módulo no son transcripciones de vuelos reales. El distintivo principal es **AVIANCA 452** (se dice «a-vi-AN-ka four five two»); AVIANCA 425 y AVIANCA 542 aparecen cuando hacen falta distintivos parecidos. Si el distintivo no coincide con el nombre de la aerolínea, va una línea debajo: «Air France · por radio: AIRFRANS (se dice «er-FRANS»)». Matrículas (HK- y cuatro cifras), frecuencias, pistas y puntos como GIKOS son de ejemplo: lo real está en el AIP vigente. Un ejemplo sin etiqueta sigue la fuente citada; «por verificar» indica que falta confirmarlo en la edición vigente (detalle en «Ver fuentes»); `PLAIN LANGUAGE` marca lenguaje no normalizado. Los casos reales citan su informe y conservan su distintivo histórico.",
      },
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "La radiotelefonía es la herramienta con la que el control de tránsito aéreo (ATC, Air Traffic Control) previene colisiones y ordena el tránsito (Doc 4444, cap. 1). Lo que transmite es de importancia fundamental para la seguridad, y hay accidentes en los que la fraseología no normalizada fue factor contribuyente (Doc 9432, 2.1).",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "p",
        text: "**La relación piloto-ATC es de responsabilidad compartida.** El controlador emite, el piloto colaciona y el controlador escucha esa colación y corrige cualquier discrepancia (Doc 9432, 2.8.3.8). Readback y hearback se estudian en la lección 12.",
      },
      {
        kind: "p",
        text: "**El ATC no le cuida el terreno.** Prevenir colisiones con el terreno no está entre sus objetivos: el piloto verifica que la autorización sea segura en ese aspecto (Doc 4444, 4.10.3.2, Nota 3).",
      },
      {
        kind: "table",
        head: ["Cualidad", "Qué significa en la cabina"],
        rows: [
          ["Claridad", "Se entiende a la primera, con ruido y por alguien que no habla su idioma."],
          ["Brevedad", "Solo lo necesario. La frecuencia es compartida."],
          ["Precisión", "Números, pistas, niveles y puntos exactos, con sus unidades."],
          ["Estandarización", "La misma palabra significa lo mismo para todos (Doc 9432, 2.6)."],
          ["Disciplina de radio", "Escuchar antes de hablar y colacionar lo que corresponde."],
        ],
      },
      {
        kind: "p",
        text: "**Correcto no basta.** Una transmisión con el dato correcto falla si es ambigua, larga, incompleta (sin unidad ni distintivo), rápida (más de 100 palabras por minuto, Doc 9432, 2.2.1 d) o no estándar. A menudo ninguno de los dos habla en su primer idioma: frases directas y lentas.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-01-01.webp",
        alt: "Historieta de cuatro escenas: tripulación del vuelo 1549 en ascenso, encuentro con aves, controlador de salida de Nueva York y decisión de amaraje en el río Hudson.",
        ancho: 1600,
        alto: 900,
        pie: "Caso real, ilustración interpretativa: US Airways 1549, LaGuardia-Charlotte, 15 de enero de 2009. Amplía la imagen para examinar las escenas; lee debajo la secuencia operacional. Fuente: Junta Nacional de Seguridad del Transporte de EE. UU. (NTSB, National Transportation Safety Board), informe AAR-10/03, sección 1.1.",
      },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Vuelo 1549: del ascenso normal a una emergencia real",
            codigo: tx(
              "SECUENCIA DOCUMENTADA POR NTSB · RESUMEN, NO TRANSCRIPCIÓN LITERAL",
              "15:25:51 · CABINA → SALIDA: 700 ft, en ascenso a 5 000 ft.",
              "           SALIDA → CABINA: continuar ascenso hasta 15 000 ft; la tripulación acusa recibo.",
              "15:27:33 · CABINA → SALIDA: impacto de aves, pérdida de empuje en ambos motores, intención de regresar a LaGuardia.",
              "           SALIDA → CABINA: ofrece viraje izquierdo rumbo 220°; la tripulación confirma el rumbo.",
              "15:28:05 · SALIDA → CABINA: pregunta si pueden usar la pista 13.",
              "           CABINA → SALIDA: no pueden; quizá deban amarar en el Hudson.",
            ),
            texto:
              "**Qué debe detectar un piloto:** el primer MAYDAY se superpuso con otra transmisión y no llegó; emitir no es comunicar. Y ante una opción inviable, la tripulación dijo que no podía. Fuente: NTSB AAR-10/03, §1.1.",
          },
        ],
      },
      profundizar([
        {
          kind: "pasos",
          items: [
            {
              rotulo: "1 · Salida: transmitir posición y autorización completa",
              texto: "Tras despegar de LaGuardia, la tripulación contactó a la dependencia de salida e informó su altitud y el ascenso autorizado. El controlador emitió una nueva instrucción de ascenso. **Para el piloto de aerolínea, la tarea no es repetir un dato aislado:** hay que identificar el vuelo, entender el nuevo límite vertical, compararlo con la autorización anterior y confirmar lo que efectivamente se va a cumplir. La ruta prevista era LaGuardia-Charlotte; el informe del NTSB documenta esa secuencia antes del encuentro con aves.",
            },
            {
              rotulo: "2 · Emergencia: prioridad, condición y capacidad",
              texto: "Aproximadamente dos minutos después del despegue, la aeronave encontró aves y perdió casi todo el empuje de ambos motores. El comandante asumió el control, pidió al primer oficial la lista de doble falla de motor y comunicó la emergencia a salida: impacto con aves, pérdida de empuje en ambos motores e intención inicial de regresar a LaGuardia. El informe señala un detalle crucial de disciplina de frecuencia: las primeras palabras de emergencia coincidieron con otra transmisión y **no llegaron al controlador**. La cabina debe transmitir la condición y verificar que ATC la haya recibido; emitir una frase no equivale a haber establecido comunicación.",
            },
            {
              rotulo: "3 · ATC responde; la tripulación evalúa, no acepta por reflejo",
              texto: "El controlador acusó recibo y ofreció un rumbo y opciones de aterrizaje. La tripulación, mientras ejecutaba tareas de cabina y evaluaba la energía disponible, no trató la propuesta como una orden que pudiera cumplirse automáticamente. En una comunicación real, el piloto debe comunicar con claridad si una autorización es inviable y evitar una colación que sugiera una capacidad inexistente. Aquí el valor de la radio es crear una imagen compartida de la situación entre cabina y control, no solo mantener frases breves.",
            },
            {
              rotulo: "4 · Decisión: «unable» y alternativa comunicada",
              texto: "Cuando el controlador planteó la pista 13 de LaGuardia, el comandante respondió que no podían alcanzarla y que quizá terminarían en el Hudson. Esa respuesta puso una limitación operacional explícita sobre la mesa y permitió a ATC ajustar su apoyo a la decisión de la tripulación. El caso enseña a **decir lo que la aeronave puede o no puede hacer**, sostener la prioridad de volar el avión y mantener la información esencial circulando aun bajo carga de trabajo extrema. La ilustración resume hechos del informe; no pretende reproducir la cabina ni el radar con exactitud histórica. Para estudiar las palabras exactas hay que acudir al registro del apéndice B del informe.",
            },
          ],
        },
        { kind: "sub", text: "Cuándo una transmisión falla" },
        {
          kind: "list",
          items: [
            "**es ambigua**: el mismo sonido admite dos lecturas (un número que se confunde con una preposición);",
            "**es larga**: el controlador tiene que buscar el dato entre palabras de relleno, y la frecuencia queda ocupada;",
            "**está incompleta**: falta la unidad (pies o nivel de vuelo), el distintivo o la pista;",
            "**va muy rápida**: el Doc 9432, 2.2.1 d), pide no pasar de 100 palabras por minuto y hablar más lento cuando el otro tiene que anotar;",
            "**no es estándar**: usa palabras que el otro no espera, o expresiones coloquiales.",
          ],
        },
        {
          kind: "p",
          text: "La fraseología se concibió para que las comunicaciones sean eficientes, claras, concisas e inequívocas (Doc 9432, Preámbulo; 3.2.2). El Preámbulo añade que las frases directas, sin modismos, se entienden mejor que las indirectas o coloquiales. La responsabilidad compartida de la colación está también en el Doc 4444, 4.5.7.5.2, y la del terreno en su Prólogo, 2.1, Nota 2.",
        },
      ]),
      { kind: "sub", text: "Fraseología y secuencia de radio" },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Un número ambiguo y su forma correcta",
            codigo: tx(
              "ATC (forma deficiente citada por el Doc 9835, 3.3.7): Descend two four zero zero feet.",
              "",
              "ATC (forma normalizada): AVIANCA 452, DESCEND TO 2 400 FEET, QNH 1012.",
              "PILOT: DESCENDING TO 2 400 FEET, QNH 1012, AVIANCA 452.",
            ),
            texto:
              "**Significado:** «two» y «to» suenan igual; el piloto entendió 400 pies y la aeronave chocó contra el suelo (Doc 9835). La forma normalizada usa THOUSAND y HUNDRED (Doc 9432, 2.4.3) y la unidad.",
            etiqueta: "«DESCEND TO» con TO para altitudes: " + POR_VERIFICAR,
          },
          {
            rotulo: "Cuando no se puede cumplir",
            codigo: tx(
              "ATC:   AVIANCA 452, CLEARED TO CALI FL 290, CROSS GIKOS FL 150 OR ABOVE, IF UNABLE, MAINTAIN FL 130.",
              "PILOT: UNABLE TO CROSS GIKOS FL 150 DUE WEIGHT, MAINTAINING FL 130, AVIANCA 452.",
            ),
            texto:
              "**Significado:** UNABLE con el motivo y lo que sí hará (Doc 9432, 2.8.3.10, adaptado). Aceptar algo que no se puede cumplir es peor que decir UNABLE.",
          },
          {
            rotulo: "Corta, clara y sin cortesías",
            codigo: tx(
              "PILOT (forma deficiente, PLAIN LANGUAGE): Good morning Bogota Approach, how are you today, this is Avianca four five two, we are now at flight level eight zero and we are estimating GIKOS at around four six, and we have information Delta, thank you very much.",
              "",
              "PILOT (forma recomendada): BOGOTA APPROACH, AVIANCA 452, FL 80, ESTIMATING GIKOS 46, INFORMATION DELTA.",
            ),
            texto:
              "**Significado:** lo mismo en la mitad del tiempo, sin cortesías (Doc 9432, 3.1.4 y 7.3.1).",
          },
        ],
      },
      masEjemplos([
        {
          kind: "pasos",
          items: [
            {
              rotulo: "La palabra TAKE-OFF solo cuando corresponde",
              codigo: tx(
                "PILOT (forma deficiente citada por el Doc 9835, 3.3.7): We are at take-off.",
                "",
                "ATC:   AVIANCA 452, REPORT WHEN READY FOR DEPARTURE.",
                "PILOT: WILCO, AVIANCA 452.",
                "PILOT: AVIANCA 452, READY.",
                "ATC:   AVIANCA 452, LINE UP AND WAIT.",
                "PILOT: LINING UP, AVIANCA 452.",
              ),
              texto:
                "**Significado:** en el primer mensaje, el controlador entendió que la aeronave esperaba en posición; en realidad ya había iniciado la carrera de despegue. Con niebla, chocó con otra aeronave (Doc 9835, 3.3.7 b). TAKE-OFF solo se usa al autorizar el despegue o anular esa autorización; en los demás casos se dice DEPARTURE o AIRBORNE (Doc 9432, 2.8.3.3; secuencia de 4.5.3). Se amplía en la lección 18.",
            },
            {
              rotulo: "La respuesta de Approach al contacto inicial",
              codigo: tx(
                "ATC:   AVIANCA 452, DESCEND TO 4 000 FEET, QNH 1005, TRANSITION LEVEL 50, EXPECT ILS APPROACH RUNWAY 13R.",
                "PILOT: DESCENDING TO 4 000 FEET, QNH 1005, TRANSITION LEVEL 50, EXPECTING ILS APPROACH RUNWAY 13R, AVIANCA 452.",
              ),
              texto: "**Significado:** continuación del contacto inicial de arriba, según el modelo del Doc 9432, 7.3.1 (pista y QNH de ejemplo).",
              etiqueta: "«DESCEND TO» con TO para altitudes: " + POR_VERIFICAR,
            },
          ],
        },
        { kind: "sub", text: "Más errores frecuentes" },
        {
          kind: "list",
          items: [
            "**Números sin unidad** («descend four thousand» sin decir pies ni QNH, o «three five zero» sin decir nivel de vuelo). Ver la lección 5.",
            "**Usar TAKE-OFF fuera de su contexto** («ready for take-off» dicho de forma que suene a autorización). Ver la lección 18.",
            "**Hablar rápido para «no ocupar la frecuencia»**: si el otro pide repetición, se ocupó el doble.",
          ],
        },
      ]),
      verificar("Estas lecciones citan el Doc 4444 de 15.ª ed.: confirmar la colación y «DESCEND TO» en el Doc 4444 vigente, cap. 4 y 12."),
      {
        kind: "enLaOperacion",
        momento: "En la línea y en la entrevista",
        texto:
          "La radio compite con listas de chequeo, automatismo y coordinación entre pilotos. Una transmisión corta y estándar libera tiempo y reduce malentendidos. En la entrevista evalúan exactamente eso: si habla breve y estándar, colaciona bien y sabe decir UNABLE o pedir confirmación sin dudar.",
      },
      error("Creer que «se entendió» porque el controlador no dijo nada", "El silencio no es confirmación; la colación y el hearback sí."),
      error("Rellenar", "Saludos, «please», «we would like to», «this is»: alargan la frecuencia y esconden el dato."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Claro, breve, preciso y estándar: correcto no es suficiente.",
          "Readback y hearback son una red compartida entre piloto y controlador.",
          "El ATC no lo protege del terreno: una autorización se verifica antes de ejecutarla.",
          "Si no puede cumplir, UNABLE y el motivo.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Ver fuentes",
        bloques: [
          { kind: "sub", text: "Fuentes cargadas en este nivel" },
          {
            kind: "p",
            text: "Doc 9432 «Manual de radiotelefonía» (4.ª ed., 2007, edición en español), Doc 4444 PANS-ATM (15.ª ed., Enm. 4, 2012, edición en español, parcial), Doc 9835 (2.ª ed., 2010) y NTSB AAR-10/03, §1.1 y apéndice B (https://www.ntsb.gov/investigations/accidentreports/reports/aar1003.pdf). La 15.ª edición del Doc 4444 no es la vigente; cada lección marca con «Verificar» lo que hay que confirmar en la edición en vigor. Distintivos de aerolínea: FAA JO 7340.2P Change 3 (efectiva 7/9/2026), cap. 3, secc. 3, que publica la asignación OACI del Doc 8585 (https://www.faa.gov/air_traffic/publications/atpubs/cnt_html/chap3_section_3.html). Matrículas colombianas: RAC 45 (Enm. 1, 2021), 45.200(d) y 45.230(b).",
          },
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 9432 (4.ª ed.) Preámbulo, 2.1, 2.2.1 d), 2.4.3, 2.8.3.3, 2.8.3.8, 2.8.3.9, 2.8.3.10, 3.1.4, 3.2.2, 4.5.3, 7.3.1; Doc 4444 (15.ª ed., Enm. 4) cap. 1 definición de «Servicio de control de tránsito aéreo», 4.10.3.2 Nota 3 y Prólogo 2.1 Nota 2 (colisiones con el terreno), 4.5.7.5.1 (Nota) y 4.5.7.5.2; Doc 9835 (2.ª ed.) 1.2.2, 3.3.7.",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "Que la Nota sobre prevención de colisiones con el terreno y el texto de colación se mantengan en la edición vigente del Doc 4444 (16.ª ed. y enmiendas), cap. 4 (4.5.7.5) (no cargada).",
              "Si el Doc 4444 vigente mantiene «DESCEND TO (nivel)» con la palabra TO para altitudes, contra Doc 4444 vigente cap. 12 (instrucciones de nivel) (no cargado).",
              "La FAA anuncia la JO 7340.2R, efectiva el 29/10/2026: a partir de esa fecha, volver a comprobar los distintivos.",
            ],
          },
        ],
      },
    ],
  },
  // ── 02 ──────────────────────────────────────────────────────────────────
  {
    n: 2,
    title: "Servicios y dependencias ATC",
    kicker: "De Delivery a Ground: quién te habla en cada fase",
    minutes: 5,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Los servicios de tránsito aéreo (ATS, Air Traffic Services) abarcan información de vuelo, alerta, asesoramiento y control de tránsito aéreo, que se divide en control de área, de aproximación y de aeródromo (Doc 4444, cap. 1; Doc 9432, 1.1). Cada servicio lo presta una dependencia con su propio distintivo en la radio.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "p",
        text: "**Cómo se llama cada dependencia:** nombre del lugar más un sufijo que dice el servicio (Doc 9432, 2.7.1.1).",
      },
      {
        kind: "table",
        head: ["Sufijo", "Qué hace por usted"],
        rows: [
          ["DELIVERY", "Entrega la autorización de ruta antes de salir."],
          ["GROUND", "Puesta en marcha (en muchos aeropuertos) y rodaje."],
          ["TOWER", "Pista: entrar, cruzar, despegar, aterrizar."],
          ["DEPARTURE", "Ascenso inicial y salida del área terminal."],
          ["APPROACH", "Llegadas y salidas en el área terminal."],
          ["CONTROL", "Centro de control de área, en ruta."],
          ["INFORMATION", "Información y alerta, sin control."],
        ],
      },
      {
        kind: "list",
        items: [
          "Una vez establecida la comunicación puede omitirse el lugar si no genera confusión: «Tower» por «Bogota Tower» (Doc 9432, 2.7.1.2).",
          "La estación le dice cuándo cambiar de frecuencia; si no, usted informa antes de cambiar. La transferencia puede ser inmediata o condicionada («when passing FL 80») (Doc 9432, 2.8.2.1).",
          "Después de aterrizar, siga en torre hasta dejar libre la pista, salvo instrucción en contrario (Doc 9432, 4.9).",
        ],
      },
      {
        kind: "p",
        text: "CONTACT: cambie y llame. MONITOR: cambie y escuche. STAND BY FOR: cambie y espere a que lo llamen. Las tres se definen en la lección 11.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-02-01.svg",
        alt: "Flujo orientativo de ocho fases: Delivery, Ground, Tower, Departure, Control, Approach, Tower y Ground; el servicio disponible y cada transferencia dependen del aeropuerto y de ATC.",
        ancho: 1600,
        alto: 760,
        pie: "Secuencia de referencia, no carta ni procedimiento de un aeropuerto concreto. La disponibilidad de cada dependencia y la frecuencia aplicable se consultan en el AIP vigente y en las instrucciones de ATC. Amplía el esquema para leer cada fase.",
      },
      profundizar([
        { kind: "p", text: "**Quién presta cada servicio** (Doc 4444, 4.1 y 4.2):" },
        {
          kind: "list",
          items: [
            "**Control de aeródromo**: la torre de control de aeródromo.",
            "**Control de aproximación**: una dependencia de aproximación, o la torre o el ACC cuando conviene combinar funciones. Puede estar en el mismo lugar que el ACC o ser un sector de él.",
            "**Control de área**: el centro de control de área (ACC); si no hay ACC, la dependencia de aproximación en espacios de extensión limitada.",
            "**Información de vuelo y alerta**: dentro de una FIR, un centro de información de vuelo (FIC), salvo que se asigne a una dependencia ATC; en espacio aéreo controlado, la dependencia ATC que corresponda.",
          ],
        },
        { kind: "p", text: "**Otros sufijos del Doc 9432, 2.7.1.1:**" },
        {
          kind: "table",
          head: ["Dependencia o servicio", "Sufijo", "Qué hace"],
          rows: [
            ["Control de la plataforma", "APRON", "Movimientos en plataforma, según el aeropuerto."],
            ["Llegadas con radar de control de aproximación", "ARRIVAL", "Llegadas, donde está separado de APPROACH."],
            ["Estación aeronáutica", "RADIO", "Estación aeronáutica (por ejemplo, HF en ruta)."],
            ["Despacho de la compañía", "DISPATCH", "Comunicación con su operador."],
            ["Radar de aproximación de precisión", "PRECISION", "Aproximación PAR."],
            ["Radar (en general)", "RADAR", "Servicio radar genérico."],
            ["Estación radiogoniométrica", "HOMER", "Radiogoniometría."],
          ],
        },
        {
          kind: "p",
          text: "En la carta puede ver otros nombres (por ejemplo, «Center» en algunos Estados). El sufijo OACI para el centro de control de área es CONTROL; el nombre real de cada estación sale del AIP.",
        },
        { kind: "p", text: "**Transferencias de control y de comunicación:**" },
        {
          kind: "list",
          items: [
            "En la llegada, el control pasa de aproximación a torre según cartas de acuerdo, y la transferencia de comunicaciones a torre debe darse a tiempo para la autorización de aterrizaje y la información de tránsito esencial (Doc 4444, 4.3.2.1.1 y 4.3.2.1.2).",
            "En la salida, torre transfiere a aproximación antes de salir de las proximidades del aeródromo, antes de entrar en IMC o en un punto o nivel prescritos (Doc 4444, 4.3.2.1.3).",
            "En aeródromos con tierra y torre separados, lo normal es pasar a torre al acercarse al punto de espera (Doc 9432, 4.5.1).",
          ],
        },
      ]),
      { kind: "sub", text: "Fraseología OACI" },
      NOTA_EJEMPLOS,
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Delivery entrega la autorización de ruta",
            codigo: tx(
              "PILOT: BOGOTA DELIVERY, AVIANCA 452, STAND 12, INFORMATION ALFA, REQUEST CLEARANCE TO CALI.",
              "ATC:   AVIANCA 452, CLEARED TO CALI VIA GIKOS 1A DEPARTURE, FL 280, SQUAWK 5501.",
              "PILOT: CLEARED TO CALI VIA GIKOS 1A DEPARTURE, FL 280, SQUAWK 5501, AVIANCA 452.",
            ),
            texto:
              "**Significado:** autorización hasta Cali por la salida GIKOS 1A (ficticia), FL 280, código 5501. Se colaciona siempre y termina con el distintivo (Doc 9432, 2.8.3.5 a y 2.8.3.7).",
            etiqueta: "«REQUEST CLEARANCE TO…»: " + POR_VERIFICAR,
          },
          {
            rotulo: "Ground a torre",
            codigo: tx("ATC:   AVIANCA 452, CONTACT TOWER 118.1.", "PILOT: 118.1, AVIANCA 452."),
            texto: "**Significado:** cambie a torre en 118.1 y llame. Basta la frecuencia y el distintivo (Doc 9432, 2.8.2.1).",
          },
          {
            rotulo: "Torre a Departure después del despegue",
            codigo: tx(
              "ATC:   AVIANCA 452, RUNWAY 13L, CLEARED FOR TAKE-OFF, REPORT AIRBORNE.",
              "PILOT: RUNWAY 13L, CLEARED FOR TAKE-OFF, WILCO, AVIANCA 452.",
              "PILOT: AVIANCA 452, AIRBORNE 57.",
              "ATC:   AVIANCA 452, CONTACT DEPARTURE 121.75.",
              "PILOT: 121.75, AVIANCA 452.",
            ),
            texto: "**Significado:** en visibilidad reducida, torre puede pedir que notifique el despegue; luego lo pasa a Departure (Doc 9432, 4.5.6).",
            etiqueta: "Pista 13L de ejemplo; pronunciación de paralelas: " + POR_VERIFICAR,
          },
          {
            rotulo: "Departure a Control, con condición",
            codigo: tx(
              "ATC:   AVIANCA 452, WHEN PASSING FL 80 CONTACT BOGOTA CONTROL 129.1.",
              "PILOT: WHEN PASSING FL 80, 129.1, AVIANCA 452.",
            ),
            texto: "**Significado:** no cambie todavía; cambie al pasar el nivel 80. La condición se colaciona (Doc 9432, 2.8.2.1).",
          },
          {
            rotulo: "Torre a tierra después del aterrizaje",
            codigo: tx(
              "ATC:   AVIANCA 452, TAKE FIRST RIGHT, WHEN VACATED CONTACT GROUND 121.9.",
              "PILOT: FIRST RIGHT, WILCO, 121.9, AVIANCA 452.",
            ),
            texto: "**Significado:** el cambio a tierra aplica solo cuando haya dejado libre la pista (Doc 9432, 4.9).",
            etiqueta: "Orden de «TAKE FIRST RIGHT, WHEN VACATED…»: " + POR_VERIFICAR,
          },
        ],
      },
      masEjemplos([
        {
          kind: "pasos",
          items: [
            {
              rotulo: "Primer contacto con Approach",
              codigo: tx(
                "PILOT: BOGOTA APPROACH, AVIANCA 452, FL 80, ESTIMATING GIKOS 46, INFORMATION DELTA.",
                "ATC:   AVIANCA 452, EXPECT ILS APPROACH RUNWAY 13R, QNH 1014.",
                "PILOT: RUNWAY 13R, QNH 1014, AVIANCA 452.",
              ),
              texto:
                "**Significado:** en el contacto inicial, aproximación normalmente informa el tipo de aproximación prevista (Doc 9432, 7.3.1). Pista y QNH se colacionan (Doc 9432, 2.8.3.5 c).",
              etiqueta: "Pista 13R de ejemplo; pronunciación de paralelas: " + POR_VERIFICAR,
            },
            {
              rotulo: "Approach a torre",
              codigo: tx("ATC:   AVIANCA 452, CONTACT TOWER 118.1.", "PILOT: 118.1, AVIANCA 452."),
              texto: "**Significado:** igual que en la salida: frecuencia y distintivo.",
            },
            {
              rotulo: "MONITOR y STAND BY FOR",
              codigo: tx(
                "ATC:   AVIANCA 452, MONITOR ATIS 127.25.",
                "PILOT: MONITORING 127.25, AVIANCA 452.",
                "ATC:   AVIANCA 452, STAND BY FOR TOWER 118.1.",
                "PILOT: 118.1, AVIANCA 452.",
              ),
              texto:
                "**Significado:** con MONITOR escucha sin llamar; con STAND BY FOR pasa a la frecuencia y espera a que torre lo llame (Doc 9432, 2.8.2.2).",
            },
            {
              rotulo: "De control a información de vuelo",
              codigo: tx("ATC:   AVIANCA 452, CONTACT BOGOTA INFORMATION 125.75.", "PILOT: 125.75, AVIANCA 452."),
              texto: "**Significado:** pasa a una dependencia que da información y alerta, no control (Doc 9432, 7.2.1, adaptado; Doc 4444, 4.2).",
            },
          ],
        },
        { kind: "sub", text: "Más errores frecuentes" },
        {
          kind: "list",
          items: [
            "**Cambiar de frecuencia sin que se lo digan** y sin informar (Doc 9432, 2.8.2.1).",
            "**Llamar a la estación equivocada** por costumbre («Bogota Approach» cuando ya lo pasaron a Departure).",
            "**Irse de la frecuencia de torre antes de dejar libre la pista.**",
          ],
        },
      ]),
      verificar("Pedido a Delivery, orden de «TAKE FIRST RIGHT…» y pistas paralelas: Doc 4444 vigente, cap. 12; dependencias reales: AIP Colombia GEN 3.4 y AD 2."),
      {
        kind: "enLaOperacion",
        momento: "En la línea",
        texto:
          "En un aeropuerto grande puede hablar con siete u ocho dependencias en un vuelo. Cada cambio de frecuencia es un punto débil: frecuencia mal seleccionada, cambio olvidado, llamada al sector equivocado. Por eso se colaciona la frecuencia en voz alta y se verifica en el panel antes de llamar. Qué dependencias existen varía por aeropuerto: hay algunos sin Delivery y otros donde la puesta en marcha se pide a Apron (AIP, AD 2).",
      },
      error("Confundir CONTACT con MONITOR", "Llamar en la frecuencia del ATIS, o quedarse callado donde había que llamar."),
      error("Colacionar la frecuencia sin mirarla", "Se dice «118.1» y queda seleccionado 118.7."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "ATS: información de vuelo, alerta, asesoramiento y control (área, aproximación, aeródromo).",
          "Distintivo de estación: lugar más sufijo (DELIVERY, GROUND, TOWER, DEPARTURE, APPROACH, CONTROL).",
          "Nadie cambia de frecuencia por su cuenta sin informar.",
          "Después del aterrizaje, en torre hasta dejar la pista libre.",
          "Nombres y frecuencias reales: AIP del Estado.",
        ],
      },
      fuentes(
        "Doc 9432 (4.ª ed.) 1.1, 2.7.1.1, 2.7.1.2, 2.8.2.1, 2.8.2.2, 2.8.3.5 a 2.8.3.7, 4.5.1, 4.5.6, 4.9, 7.2.1, 7.3.1; Doc 4444 (15.ª ed., Enm. 4) cap. 1 definiciones de ATS y de cada dependencia, 4.1, 4.2, 4.3.2.1.1 a 4.3.2.1.3.",
        [
          "La forma de solicitar la autorización a Delivery («REQUEST CLEARANCE TO…») contra Doc 4444 vigente cap. 12 y el AIP del aeródromo (AD 2.18 / AD 2.22) (no cargados); algunos aeropuertos piden datos adicionales o usan DCL.",
          "La frase «TAKE FIRST RIGHT, WHEN VACATED CONTACT GROUND» usa el orden del ejemplo del Doc 9432 4.9; confirmar el orden vigente contra Doc 4444 vigente cap. 12 (no cargado).",
          "Pronunciación de pistas paralelas («RUNWAY 13L» como «runway one three left») contra Doc 4444 vigente cap. 12 y Anexo 10 Vol. II cap. 5 (no cargados); en este nivel las pistas con L/R son de ejemplo.",
          "Estructura de dependencias y frecuencias reales de Colombia contra AIP Colombia GEN 3.4 y AD 2 (no cargado).",
        ],
      ),
    ],
  },
  // ── 03 ──────────────────────────────────────────────────────────────────
  {
    n: 3,
    title: "Principios de radiotelefonía",
    kicker: "Escuchar, pensar y después transmitir",
    minutes: 4,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Son las técnicas de transmisión y los hábitos que hacen que un mensaje llegue completo y se entienda a la primera (Doc 9432, 2.2).",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**Escuche antes de hablar** para no pisar otra transmisión.",
          "**Piense antes de oprimir el PTT** (push-to-talk): a quién, quién es, qué quiere. Sin «humm» ni «este…» (Doc 9432, 2.2.1 g).",
          "**Oprima a fondo antes de hablar y suelte al terminar** (2.2.1 j): si no, se corta el distintivo.",
          "**Tono normal, menos de 100 palabras por minuto y una pausa antes y después de los números** (2.2.1 c, d, f).",
          "**Sin cortesías** (3.1.4). **IMMEDIATELY** solo cuando la seguridad exige acción inmediata (3.1.5): si lo oye, es en serio.",
        ],
      },
      {
        kind: "p",
        text: "**Micrófono trabado** (Doc 9432, 2.2.2): un PTT que se queda oprimido bloquea la frecuencia para todos. Después de cada transmisión, verifique que quedó libre.",
      },
      {
        kind: "p",
        text: "**AVIATE, NAVIGATE, COMMUNICATE.** Principio de instrucción muy difundido (no está en los documentos OACI cargados): primero controlar la aeronave, luego saber dónde está, luego comunicar. Los documentos OACI sí reconocen la carga de trabajo: el controlador debería evitar transmitir en el despegue, el ascenso inicial, la final o el aterrizaje (Doc 9432, 4.1.2). Un «STANDBY» a tiempo es mejor que una colación a medias mientras se pilota.",
      },
      {
        kind: "p",
        text: "SAY AGAIN, CORRECTION, I SAY AGAIN y STANDBY se definen en la lección 11; cómo pedir aclaración, en la 53.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-03-01.svg",
        alt: "Pirámide de prioridades de vuelo: controlar la aeronave, asegurar posición y trayectoria, y después comunicar; cuatro hábitos para transmitir sin cortar ni bloquear la frecuencia.",
        ancho: 1080,
        alto: 1350,
        pie: "La base de la pirámide es controlar la aeronave; comunicar no sustituye esa tarea. Al transmitir, escuche, prepare el mensaje, oprima el PTT antes de hablar y suéltelo al terminar. Amplíe el esquema para leer cada paso. «Aviate, navigate, communicate» es un principio de instrucción, no una autorización para omitir una llamada de seguridad ni una cita normativa de la OACI.",
      },
      profundizar([
        { kind: "p", text: "**Mientras transmite** (Doc 9432, 2.2.1):" },
        {
          kind: "list",
          items: [
            "Volumen constante (e).",
            "Micrófono a distancia constante; si tiene que girar la cabeza, deje de hablar (h, i).",
            "En mensajes largos, pause de vez en cuando para que el otro pueda pedir lo que no recibió (k).",
          ],
        },
        { kind: "p", text: "**Brevedad y palabras innecesarias.**" },
        {
          kind: "list",
          items: [
            "Puede omitir, si no causa confusión: «SURFACE» en el viento de superficie, «DEGREES» en rumbos radar, «VISIBILITY», «CLOUD» y «HEIGHT» en informes meteorológicos, «HECTOPASCALS» en reglajes de presión (Doc 9432, 3.1.3).",
            "El lenguaje claro, cuando no hay fraseología, **no es permiso para charlar ni bromear** (Doc 9432, 3.2.4).",
          ],
        },
        { kind: "p", text: "**Escucha activa y confirmar lo dudoso.**" },
        {
          kind: "list",
          items: [
            "Si hay duda de que un mensaje se recibió bien, se pide repetición total o parcial (Doc 9432, 2.8.1.4).",
            "Si comete un error, dígalo con CORRECTION, repita el último grupo correcto y dé la versión corregida (Doc 9432, 2.8.1.6).",
            "Si espera mala recepción, repita los elementos importantes con I SAY AGAIN (Doc 9432, 2.8.1.8).",
            "STANDBY significa «espere y le llamaré»; **no es aprobación ni denegación** (Doc 9432, 2.6).",
          ],
        },
        {
          kind: "p",
          text: "Los controladores no deben dar autorizaciones a un piloto que está alineándose o despegando (Doc 9432, 2.8.3.2).",
        },
        { kind: "p", text: "**Escala de inteligibilidad** (Doc 9432, 2.8.4.3):" },
        {
          kind: "kv",
          items: [
            { k: "1", v: "Ininteligible." },
            { k: "2", v: "Inteligible por momentos." },
            { k: "3", v: "Inteligible pero con dificultad." },
            { k: "4", v: "Inteligible." },
            { k: "5", v: "Perfectamente inteligible." },
          ],
        },
        { kind: "sub", text: "Aplicación en una cabina de línea" },
        {
          kind: "p",
          text: "**La prioridad no es «contestar rápido», sino que la tripulación conserve una imagen correcta de lo que el avión está haciendo.** Cuando llega una llamada mientras se configura un cambio de trayectoria, el piloto que vuela mantiene el control y la conciencia de posición; el piloto que comunica escucha el distintivo, identifica qué cambió y contrasta la instrucción con el plan y las limitaciones del momento. Si no oyó el nivel, el rumbo o el punto completo, no lo reconstruye por expectativa: pide la parte que falta. Si necesita unos segundos para coordinar en cabina, lo comunica y vuelve a llamar. Una colación pronunciada con fluidez, pero basada en un dato incompleto, no aporta seguridad.",
        },
        {
          kind: "p",
          text: "**El vuelo US Airways 1549, presentado en la lección 1, muestra por qué esta jerarquía importa de verdad.** Tras el impacto con aves y la pérdida de empuje, la tripulación tuvo que controlar una aeronave con energía limitada, valorar si alguna pista era alcanzable, trabajar en cabina y mantener informado al controlador. La primera transmisión de emergencia se superpuso con otra llamada y no llegó a salida, según el informe AAR-10/03, §1.1, del NTSB. La lección es reconocer que la frecuencia es compartida, comprobar si el mensaje esencial llegó y expresar con claridad la capacidad real de la aeronave. Cuando una opción de retorno dejó de ser viable, comunicar «unable» permitió que ATC entendiera el límite operacional en vez de interpretar una colación como aceptación.",
        },
        {
          kind: "p",
          text: "**Después de cada transmisión sigue habiendo trabajo.** El piloto que habló suelta el PTT, escucha la respuesta y verifica si el controlador corrigió un dato o transfirió la aeronave. El otro piloto coteja lo oído con la trayectoria y los selectores que correspondan; quién ejecuta cada acción depende de los procedimientos de la compañía. Si la frecuencia quedó bloqueada por un micrófono trabado, o si se perdió el inicio de la llamada, hay que restablecer la comunicación por el medio disponible y dejar explícito qué autorización se recibió realmente.",
        },
      ]),
      { kind: "sub", text: "Fraseología OACI" },
      NOTA_EJEMPLOS,
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Pedir repetición de una parte",
            codigo: tx(
              "ATC:   AVIANCA 452, DESCEND TO FL 240, [ininteligible] GIKOS.",
              "PILOT: AVIANCA 452, SAY AGAIN ALL AFTER FL 240.",
              "ATC:   AVIANCA 452, DESCEND TO FL 240, BE LEVEL BY GIKOS.",
            ),
            texto: "**Significado:** recibió bien hasta FL 240 y pide solo lo que siguió (Doc 9432, 2.8.1.4).",
          },
          {
            rotulo: "Corrección durante la propia transmisión",
            codigo: tx("PILOT: AVIANCA 452, GIKOS 47, FL 330, RUTAM 07 CORRECTION RUTAM 57.", "ATC:   AVIANCA 452, ROGER."),
            texto: "**Significado:** CORRECTION, último grupo correcto y el valor bueno (Doc 9432, 2.8.1.6). RUTAM es ficticio.",
          },
          {
            rotulo: "Verificación de radio",
            codigo: tx(
              "PILOT: BOGOTA TOWER, AVIANCA 452, RADIO CHECK 118.1.",
              "ATC:   AVIANCA 452, TOWER, READING YOU FIVE.",
            ),
            texto:
              "**Significado:** a quién llama, quién es, «RADIO CHECK» y la frecuencia (Doc 9432, 2.8.4.1). La respuesta usa la escala 1 (ininteligible) a 5 (perfectamente inteligible) (2.8.4.3).",
          },
          {
            rotulo: "STANDBY cuando está volando la aeronave",
            codigo: tx(
              "ATC:   AVIANCA 452, REPORT HEADING.",
              "PILOT: AVIANCA 452, STANDBY.",
              "PILOT (segundos después, ya estabilizado): AVIANCA 452, HEADING 050.",
              "ATC:   AVIANCA 452, ROGER, CONTINUE HEADING 050.",
            ),
            texto: "**Significado:** STANDBY no aprueba ni niega nada (Doc 9432, 2.6); hay que volver a llamar (secuencia del Doc 9432, 6.3.2, adaptada).",
            etiqueta: "«STANDBY» dicho por el piloto: " + POR_VERIFICAR,
          },
        ],
      },
      masEjemplos([
        {
          kind: "pasos",
          items: [
            {
              rotulo: "Verificación de radio con mala recepción",
              codigo: tx("ATC:   AVIANCA 452, TOWER, READING YOU THREE, LOUD BACKGROUND WHISTLE."),
              texto: "**Significado:** inteligible con dificultad, y el motivo (Doc 9432, 2.8.4.3).",
            },
            {
              rotulo: "Repetir lo importante con mala recepción",
              codigo: tx(
                "PILOT: BOGOTA APPROACH, AVIANCA 452, GIKOS 2 500 FEET, I SAY AGAIN 2 500 FEET, ENGINE LOSING POWER, ENGINE LOSING POWER.",
              ),
              texto:
                "**Significado:** el piloto prevé mala recepción y repite los elementos críticos (Doc 9432, 2.8.1.8, adaptado). Urgencia y socorro se ven en las lecciones 34 a 37.",
            },
            {
              rotulo: "La estación no sabe quién llamó",
              codigo: tx(
                "PILOT: BOGOTA GROUND, 452. (llamada recortada)",
                "ATC:   STATION CALLING BOGOTA GROUND, SAY AGAIN YOUR CALL SIGN.",
                "PILOT: BOGOTA GROUND, AVIANCA 452.",
              ),
              texto:
                "**Significado:** si la estación no tiene certeza de quién llamó, pide el distintivo (Doc 9432, 2.8.1.5). Se trabaja en la lección 6.",
            },
          ],
        },
        { kind: "sub", text: "Más errores frecuentes" },
        {
          kind: "list",
          items: [
            "**Hablar antes de oprimir del todo el PTT** o soltarlo antes de terminar: se pierde el distintivo.",
            "**Pensar en voz alta en la frecuencia** («eh… Bogota… eh… Avianca…»).",
            "**Tomar STANDBY como aprobación** y seguir con lo que se había pedido.",
            "**No pedir repetición por vergüenza** y completar el mensaje con lo que «debió haber dicho».",
          ],
        },
      ]),
      verificar("«Aviate, navigate, communicate» no es norma OACI (ver manual del operador); «STANDBY» dicho por el piloto: Anexo 10 Vol. II, cap. 5."),
      {
        kind: "enLaOperacion",
        momento: "En la línea",
        texto:
          "Normalmente un piloto vuela y el otro lleva las comunicaciones, según los SOP (lección 59), pero ambos escuchan. Si la llamada llega en rotación, falla en el despegue o flare, primero se vuela: la frecuencia puede esperar unos segundos, la aeronave no. En frecuencias congestionadas, escuchar antes de transmitir evita las transmisiones bloqueadas (lección 57).",
      },
      error("Transmitir sin escuchar", "Pisa la colación de otra aeronave o la instrucción del controlador."),
      error("Responder mientras se pierde la trayectoria", "Primero se vuela; la respuesta puede esperar a un STANDBY."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Escuche, piense, oprima a fondo, hable, suelte y verifique.",
          "Menos de 100 palabras por minuto, pausa antes y después de los números.",
          "Sin cortesías, sin relleno, sin «humm».",
          "STANDBY no es aprobación.",
          "Primero volar, luego navegar, luego comunicar.",
        ],
      },
      fuentes(
        "Doc 9432 (4.ª ed.) 2.2.1 a) a k), 2.2.2, 2.6 (STANDBY), 2.8.1.4 a 2.8.1.8, 2.8.3.2, 2.8.4.1 a 2.8.4.3, 3.1.3, 3.1.4, 3.1.5, 3.2.4, 4.1.2, 6.3.2 (REPORT HEADING / HEADING 050 / ROGER CONTINUE HEADING 050). Caso US Airways 1549: NTSB AAR-10/03, §1.1 (https://www.ntsb.gov/investigations/accidentreports/reports/aar1003.pdf).",
        [
          "«AVIATE, NAVIGATE, COMMUNICATE» no está en los documentos cargados; citar su fuente en el manual de operaciones o FCTM del operador, o en material de instrucción de la autoridad (no cargado). No presentarlo como norma OACI.",
          "Que el piloto responda «STANDBY» a una solicitud del ATC como uso aceptado, contra Anexo 10 Vol. II cap. 5 (no cargado); el Doc 9432 2.6 define la palabra sin limitar quién la usa.",
        ],
      ),
    ],
  },
  // ── 04 ──────────────────────────────────────────────────────────────────
  {
    n: 4,
    title: "El alfabeto fonético OACI",
    kicker: "De Alfa a Zulu, y cuándo se usa",
    minutes: 5,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Son 26 palabras, una por letra, para que una letra no se confunda con otra de sonido parecido (B, D, E, G, P, T y V suenan casi igual con ruido). Para un piloto el objetivo no es recitarlo: es **reconocer una secuencia al oído y verificar lo que entró en el sistema de navegación** antes de colacionar.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**Cada letra del distintivo va con el alfabeto, excepto el designador telefónico y el tipo de aeronave** (Doc 9432, 2.3.2): «AVIANCA» se dice como palabra; la matrícula HK-5021, «Hotel Kilo five zero two one».",
          "**El resto, solo si hay riesgo de que no se reciba bien** (2.3.1): un punto poco conocido, un nombre en plain language.",
          "**Calles de rodaje, letras de ATIS, rutas y puntos**: «taxiway Charlie», «information Bravo» (4.4.2, 4.4.3).",
          "**Sin alfabeto**: ILS, QNH, RVR, VOR, ATC van letra por letra; ATIS, NOTAM, SID, STAR, CAVOK se dicen como palabra (1.2, nota; 3.1.2).",
        ],
      },
      {
        kind: "table",
        head: ["Letra", "Palabra (edición en español)", "Pronunciación (Doc 9432, 2.3.3)"],
        rows: [
          ["A", "Alfa", "AL FA"],
          ["B", "Bravo", "BRA VO"],
          ["C", "Charlie", "CHAR LI o SHAR LI"],
          ["D", "Delta", "DEL TA"],
          ["E", "Echo", "E CO"],
          ["F", "Foxtrot", "FOX TROT"],
          ["G", "Golf", "GOLF"],
          ["H", "Hotel", "O TEL"],
          ["I", "India", "IN DI A"],
          ["J", "Julieta", "TSHU LI ET"],
          ["K", "Kilo", "KI LO"],
          ["L", "Lima", "LI MA"],
          ["M", "Mike", "MÁIK"],
          ["N", "November", "NO VEM BER"],
          ["O", "Oscar", "OS CAR"],
          ["P", "Papá", "PA PA"],
          ["Q", "Québec", "QUE BEC"],
          ["R", "Romeo", "RO ME O"],
          ["S", "Sierra", "SI E RRA"],
          ["T", "Tango", "TAN GO"],
          ["U", "Uniform", "IU NI FORM o U NI FORM"],
          ["V", "Víctor", "VIC TOR"],
          ["W", "Whiskey", "UIS QUI"],
          ["X", "X-ray", "EX REY"],
          ["Y", "Yankee", "IAN QUI"],
          ["Z", "Zulu", "TSU LU"],
        ],
      },
      {
        kind: "p",
        text: "Lo que un hispanohablante suele pasar por alto: **H es «O TEL»** (la H no suena), **J es «TSHU LI ET»**, **Z es «TSU LU»** y **W es «UIS QUI»**. La tabla no marca la sílaba de énfasis (ver «Verificar»).",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-04-01.svg",
        alt: "Tabla ampliable de las veintiséis letras del alfabeto de deletreo, de Alfa a Zulu, con palabra internacional y guía aproximada de pronunciación en inglés.",
        ancho: 1200,
        alto: 1600,
        pie: "Referencia para escuchar y transcribir, no sustituto de la colación de una autorización completa. La grafía internacional sigue a la OACI; la guía aproximada de pronunciación inglesa sigue la tabla 2-3-2, §2-3-3, de la Administración Federal de Aviación de Estados Unidos (FAA, Federal Aviation Administration). La FAA escribe «Whiskey»; la grafía OACI es «Whisky». Amplíe la tabla para leer cada fila. Fuentes: https://www.icao.int/sites/default/files/postalhistory/annex_10_aeronautical_telecommunications.htm y https://www.faa.gov/air_traffic/publications/atpubs/fs_html/chap2_section_3.html.",
      },
      {
        kind: "p",
        text: "**Del deletreo a la cabina.** Oír «Golf India Kilo…» no termina el trabajo: se retiene la secuencia completa, se comprueba que el punto seleccionado en el FMS coincide y que encaja con la autorización vigente. Si falta una letra, no se supone: se pide el deletreo de la parte dudosa.",
      },
      profundizar([
        {
          kind: "p",
          text: "**La tabla (Doc 9432, 2.3.3, edición en español).** La columna «Pronunciación» es la que publica la edición en español: está escrita para que un hispanohablante la lea en voz alta. En el original, la sílaba que lleva el énfasis va **subrayada**; ese subrayado **se perdió en el texto extraído** que se usó aquí, así que la tabla no marca el énfasis. Hay que tomarlo del PDF original.",
        },
        {
          kind: "p",
          text: "La edición en español escribe algunas palabras con grafía española (Julieta, Papá, Québec, Víctor). La lámina ampliable muestra la grafía internacional que presenta la OACI, incluida «Juliett» con doble t. Para la pronunciación aproximada en inglés usa la tabla oficial de la FAA; esta escribe «Whiskey», mientras la grafía que aparece en la referencia OACI es «Whisky». Las diferencias de grafía no autorizan a cambiar la palabra que se transmite.",
        },
        {
          kind: "p",
          text: "Otras abreviaturas que se dicen como palabra (marcadas con asterisco en el Doc 9432, 1.2): SIGMET, VOLMET, SELCAL, TAF, PAPI, RNAV, entre otras.",
        },
        {
          kind: "p",
          text: "**Escuchar una palabra deletreada no termina el trabajo.** Si una dependencia transmite o aclara un punto de ruta, el piloto que comunica debe distinguir primero si se trata de una instrucción dirigida a su vuelo. Luego retiene o anota la secuencia de letras completa, verifica que el punto seleccionado en el sistema de gestión de vuelo coincide con lo recibido y confirma que ese cambio encaja con la autorización vigente. El otro piloto comprueba la modificación según el procedimiento del operador. Recitar «Golf India Kilo…» perfectamente mientras se selecciona otro punto no evita una desviación de trayectoria.",
        },
        {
          kind: "p",
          text: "**Si falta una letra, se detiene la suposición.** Una frecuencia ocupada, un acento desconocido o un nombre muy parecido a otro punto pueden dejar la secuencia incompleta. Corresponde pedir repetición o deletreo de la parte dudosa y verificar de nuevo el dato antes de modificar la ruta. No basta con reconocer las primeras sílabas ni con aceptar la opción que aparece primero en la pantalla. El mismo criterio se aplica a calles de rodaje, letras de la información automática y matrículas de otras aeronaves.",
        },
      ]),
      { kind: "sub", text: "Fraseología OACI" },
      NOTA_EJEMPLOS,
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Matrícula completa en el primer contacto",
            codigo: tx(
              "PILOT: BOGOTA TOWER, HOTEL KILO FIVE ZERO TWO ONE. (HK-5021)",
              "ATC:   HOTEL KILO FIVE ZERO TWO ONE, BOGOTA TOWER.",
            ),
            texto:
              "**Significado:** primer contacto con distintivos completos, la estación llamada primero (Doc 9432, 2.8.1.1). Las letras de la matrícula van con el alfabeto y las cifras como números (2.3.2; lección 5). Matrícula de ejemplo, con el formato del RAC 45.",
          },
          {
            rotulo: "Calle de rodaje e información ATIS",
            codigo: tx(
              "PILOT: BOGOTA GROUND, AVIANCA 452, REQUEST TAXI, INFORMATION CHARLIE.",
              "ATC:   AVIANCA 452, TAXI TO HOLDING POINT RUNWAY 13L VIA TAXIWAY ALFA, QNH 1019.",
              "PILOT: HOLDING POINT RUNWAY 13L VIA ALFA, QNH 1019, AVIANCA 452.",
            ),
            texto: "**Significado:** la letra del ATIS y la de la calle de rodaje van con el alfabeto (modelo del Doc 9432, 4.4.3 y 4.4.2).",
          },
          {
            rotulo: "Deletrear un punto poco conocido",
            codigo: tx(
              "ATC:   AVIANCA 452, CLEARED DIRECT GIKOS.",
              "PILOT: AVIANCA 452, SAY AGAIN WAYPOINT, SPELL IT.",
              "ATC:   GIKOS, I SAY AGAIN, GOLF INDIA KILO OSCAR SIERRA.",
              "PILOT: DIRECT GIKOS, AVIANCA 452.",
            ),
            texto:
              "**Significado:** el deletreo se justifica por riesgo de mala recepción (2.3.1). SAY AGAIN e I SAY AGAIN son normalizadas (2.6); «spell it» es lenguaje claro.",
            etiqueta: "PLAIN LANGUAGE: «spell it»",
          },
        ],
      },
      masEjemplos([
        {
          kind: "pasos",
          items: [
            {
              rotulo: "Designador telefónico más letras (ejemplo del Doc 9432)",
              codigo: tx("PILOT: STEPHENVILLE GROUND, FASTAIR DELTA CHARLIE ALFA BRAVO. (FASTAIR DCAB)"),
              texto:
                "**Significado:** distintivo tipo b): designador telefónico seguido de los cuatro últimos caracteres de la matrícula (Doc 9432, 2.7.2.1 b). El designador no se deletrea; las letras sí. FASTAIR es un designador didáctico del manual, no una aerolínea.",
            },
          ],
        },
        { kind: "sub", text: "Más errores frecuentes" },
        {
          kind: "list",
          items: [
            "**Deletrear lo que se dice como palabra o letra**: «India Lima Sierra» por ILS, «November Oscar Tango…» por NOTAM.",
            "**Deletrear el designador telefónico** («Alfa Victor India…» en vez de «AVIANCA»).",
            "**Confundir letras al oído** cuando no se usa el alfabeto: B/D/E/G/P/T/V, M/N.",
          ],
        },
      ]),
      verificar("Sílaba de énfasis de cada palabra: tomarla del PDF del Doc 9432, 2.3.3, o del Anexo 10 Vol. II, cap. 5."),
      {
        kind: "enLaOperacion",
        momento: "En la línea",
        texto:
          "Se deletrea poco pero se escucha mucho: letras de ATIS, calles de rodaje, puntos, SID y STAR. Lo que cuesta es la **velocidad de reconocimiento**: oír «Sierra Papa Tango» y ver SPT sin traducir mentalmente. Eso se entrena.",
      },
      error("Inventar palabras", "«Beta», «Pedro», «Dog», o la palabra de otro alfabeto."),
      error("Pronunciar a la española", "«Hotel» con H aspirada, «Julieta» con jota, «Whiskey» como «güisqui»."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "26 palabras, una por letra (Doc 9432, 2.3.3).",
          "Siempre para las letras del distintivo, menos el designador telefónico y el tipo de aeronave.",
          "Para el resto, solo si hay riesgo de que no se entienda.",
          "ILS, QNH, RVR: letras sueltas. ATIS, NOTAM, SID, STAR: palabra.",
          "H muda, J con «tsh», W como «uis».",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Ejercicios",
        bloques: [
          { kind: "p", text: "**A. Diga en voz alta.** Dígalo antes de abrir la solución." },
          {
            kind: "pasos",
            columnas: 2,
            items: [
              { rotulo: "Matrícula (ejemplo del Doc 9432)", codigo: "G-ABCD", texto: "Diga en voz alta.", interpretacion: { texto: "Golf Alfa Bravo Charlie Delta." } },
              {
                rotulo: "Matrícula de ejemplo",
                codigo: "HK-5021",
                texto: "Diga en voz alta (los dígitos se dicen como números; ver lección 5).",
                interpretacion: { texto: "Hotel Kilo, five zero two one (con la pronunciación de números del Doc 9432 2.4.1)." },
              },
              { rotulo: "Waypoint", codigo: "GIKOS", texto: "Diga en voz alta.", interpretacion: { texto: "Golf India Kilo Oscar Sierra." } },
              { rotulo: "Waypoint ficticio", codigo: "RUTAM", texto: "Diga en voz alta.", interpretacion: { texto: "Romeo Uniform Tango Alfa Mike." } },
              { rotulo: "Letra del ATIS", codigo: "Information Q", texto: "Diga en voz alta.", interpretacion: { texto: "«Information Quebec»." } },
              { rotulo: "Calle de rodaje", codigo: "B2", texto: "Diga en voz alta.", interpretacion: { texto: "«Taxiway Bravo two»." } },
            ],
          },
          { kind: "p", text: "**B. Escriba lo que oyó.**" },
          {
            kind: "pasos",
            columnas: 2,
            items: [
              { rotulo: "Lo que oyó", codigo: "Papa Uniform Mike Alfa Sierra", texto: "Escríbalo.", interpretacion: { texto: "PUMAS." } },
              { rotulo: "Lo que oyó", codigo: "Kilo Oscar Lima Oscar X-ray", texto: "Escríbalo.", interpretacion: { texto: "KOLOX." } },
              { rotulo: "Lo que oyó", codigo: "Whiskey Yankee Zulu", texto: "Escríbalo.", interpretacion: { texto: "WYZ." } },
              { rotulo: "Lo que oyó", codigo: "Juliett Echo Tango", texto: "Escríbalo.", interpretacion: { texto: "JET." } },
            ],
          },
          { kind: "p", text: "**C. ¿Alfabeto, letras sueltas o palabra?** (Doc 9432, 1.2, nota, y 3.1.2)" },
          {
            kind: "pasos",
            columnas: 2,
            items: [
              { rotulo: "Abreviatura", codigo: "ILS", texto: "¿Alfabeto, letras sueltas o palabra?", interpretacion: { texto: "Letras sueltas: I-L-S (sin alfabeto)." } },
              { rotulo: "Abreviatura", codigo: "NOTAM", texto: "¿Alfabeto, letras sueltas o palabra?", interpretacion: { texto: "Palabra: «NOTAM»." } },
              { rotulo: "Abreviatura", codigo: "QNH", texto: "¿Alfabeto, letras sueltas o palabra?", interpretacion: { texto: "Letras sueltas: Q-N-H." } },
              { rotulo: "Abreviatura", codigo: "SID", texto: "¿Alfabeto, letras sueltas o palabra?", interpretacion: { texto: "Palabra: «SID»." } },
              { rotulo: "Abreviatura", codigo: "VOR", texto: "¿Alfabeto, letras sueltas o palabra?", interpretacion: { texto: "Letras sueltas: V-O-R." } },
              { rotulo: "Abreviatura", codigo: "ATIS", texto: "¿Alfabeto, letras sueltas o palabra?", interpretacion: { texto: "Palabra: «ATIS»." } },
            ],
          },
        ],
      },
      fuentes(
        "Doc 9432 (4.ª ed.) 1.2 (nota y asteriscos), 2.3.1, 2.3.2, 2.3.3, 2.7.2.1 b), 2.8.1.1, 3.1.2, 4.4.2, 4.4.3, 2.6 (SAY AGAIN, I SAY AGAIN). Grafía internacional: OACI (https://www.icao.int/sites/default/files/postalhistory/annex_10_aeronautical_telecommunications.htm). Guía aproximada inglesa: FAA, §2-3-3, tabla 2-3-2 (https://www.faa.gov/air_traffic/publications/atpubs/fs_html/chap2_section_3.html). Matrícula colombiana: RAC 45 (Enm. 1, 2021), 45.200(d) (marca de nacionalidad, guion y número), 45.230(b) (HK para aeronaves convencionales) y 45.235(a) (número de orden desde 0001). HK-5021 es de ejemplo y no corresponde a un avión concreto.",
        [
          "La sílaba de énfasis de cada palabra (subrayada en el original; perdida en la extracción) contra el PDF del Doc 9432 (4.ª ed.) 2.3.3.",
          "La pronunciación normativa y el énfasis de cada palabra contra Anexo 10 Vol. II cap. 5 y Doc 9432 edición inglesa 2.3.3 (no cargados); la lámina solo usa una guía aproximada publicada por la FAA.",
          "Si la letra de utilización que el RAC 45 añade a la matrícula en aviación general («G») se pronuncia en el distintivo, contra el AIP Colombia y la fraseología de la Aerocivil (no cargados).",
        ],
      ),
    ],
  },
  // ── 05 ──────────────────────────────────────────────────────────────────
  {
    n: 5,
    title: "Números en la radio",
    kicker: "Niveles, rumbos, frecuencias, códigos y QNH",
    minutes: 5,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "La forma normalizada de pronunciar y agrupar números: niveles, rumbos, pistas, frecuencias, códigos SSR, QNH, hora y altitudes. Casi todo lo que se colaciona tiene un número, y el objetivo no es repetir cifras: es colacionar lo que corresponde y comprobar que el avión quedó configurado con lo recibido.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "table",
        head: ["Número", "Pronunciación (Doc 9432, 2.4.1)"],
        rows: [
          ["0", "SI-RO"],
          ["1", "UAN"],
          ["2", "TU"],
          ["3", "TRI"],
          ["4", "FO-ar"],
          ["5", "FA-IF"],
          ["6", "SIKS"],
          ["7", "SEV'N"],
          ["8", "EIT"],
          ["9", "NAI-na"],
          ["Decimal", "DE-si-mal"],
          ["Cien", "JAN-dred"],
          ["Mil", "ZAU-SAND"],
        ],
      },
      {
        kind: "p",
        text: "Se acentúan las sílabas en MAYÚSCULAS. **3 es TRI** (sin «th»), **5 es FA-IF** (termina en «f»), **9 es NAI-na** (dos sílabas). En la grafía inglesa de la tabla OACI se escriben TREE, FIFE y NINER. Oirá «three» o «nine»: entiéndalos, y al hablar siga la tabla.",
      },
      {
        kind: "p",
        text: "**Regla general: dígito por dígito** (Doc 9432, 2.4.2): AVIANCA 452 es «Avianca four five two»; FL 180, «flight level one eight zero»; rumbo 080, «heading zero eight zero»; código 4203, «squawk four two zero three»; QNH 1010, «QNH one zero one zero».",
      },
      {
        kind: "p",
        text: "**Excepción: centenas y millares enteros** en altitud, altura de nubes, visibilidad y RVR (Doc 9432, 2.4.3): 800 ft, «eight hundred»; 3 400 ft, «three thousand four hundred»; 12 000 ft, **«one two thousand»**, no «twelve thousand».",
      },
      {
        kind: "p",
        text: "**Nivel y altitud no se mezclan**: FLIGHT LEVEL antes de la cifra si va referida a 1013,2 hPa; FEET o METRES después si va con QNH (Doc 4444, 4.5.7.5.1, Nota).",
      },
      {
        kind: "p",
        text: "**Frecuencias** (Doc 9432, 2.4.4 y 2.4.5): dígito por dígito con DECIMAL; seis dígitos donde hay canales de 8,33 kHz, cinco donde todos van a 25 kHz, y solo cuatro si el quinto y el sexto son cero (118.000, «one one eight decimal zero»).",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-05-01.svg",
        alt: "Guía ampliable de pronunciación de los diez dígitos, distinción entre cifras dígito por dígito y millares, y tres pasos de comprobación tras una autorización.",
        ancho: 1080,
        alto: 1920,
        pie: "La lámina es una referencia de pronunciación, no un ejercicio de colacionar solo el QNH. En una autorización, escuche todos los elementos modificados; colacione lo exigido, atienda la respuesta del controlador y coteje selectores y trayectoria en cabina. Amplíe para leer las formas del Doc 9432, §§2.4.1 a 2.4.3. «RVR» significa alcance visual en pista (Runway Visual Range).",
      },
      profundizar([
        {
          kind: "table",
          head: ["Qué", "Escrito", "Se transmite (Doc 9432, 2.4.2 y 2.4.3)"],
          rows: [
            ["Nivel de vuelo", "FL 200", "flight level two zero zero"],
            ["Rumbo", "100°", "heading one zero zero"],
            ["Viento", "200° 25 kt", "wind two zero zero degrees two five knots"],
            ["Viento con ráfagas", "160° 18 kt ráf. 30", "wind one six zero degrees one eight knots, gusting three zero knots"],
            ["Pista", "27 / 30", "runway two seven / runway three zero"],
            ["Altura de nubes", "2 200 ft", "two thousand two hundred"],
            ["Visibilidad", "1 000 / 700", "visibility one thousand / visibility seven hundred"],
            ["RVR", "600 / 1 700", "RVR six hundred / RVR one thousand seven hundred"],
          ],
        },
        {
          kind: "p",
          text: "Las palabras en inglés son la traducción de los ejemplos en español del Doc 9432; «gusting» está por verificar. El Doc 9432 cargado no explica el porqué de cada forma de pronunciación; solo da la tabla, que se aplica «cuando se use el idioma inglés». Ningún documento cargado dice que TREE, FIFE o NINER sean opcionales o solo para ciertas fases.",
        },
        { kind: "p", text: "**Frecuencias, con detalle** (Doc 9432, 2.4.4 y 2.4.5):" },
        {
          kind: "list",
          items: [
            "Seis dígitos donde hay canales de 8,33 kHz, excepto si el quinto y el sexto son ambos cero: 118.005 → «one one eight decimal zero zero five»; 118.025 → «one one eight decimal zero two five»; 118.100 → «one one eight decimal one».",
            "Cinco dígitos donde todos los canales están separados 25 kHz o más y la autoridad no exige seis: 118.025 → «one one eight decimal zero two»; 118.075 → «one one eight decimal zero seven»; 118.050 → «one one eight decimal zero five».",
            "Precaución: con radios de 25 kHz solo se pueden seleccionar cinco dígitos; con radios de 8,33 kHz, al recibir cinco dígitos, el quinto y sexto seleccionados deben ser los del canal de 25 kHz (notas de 2.4.4 y 2.4.5).",
          ],
        },
        {
          kind: "p",
          text: "**Hora** (Doc 9432, 2.5.1). Normalmente bastan los minutos, dígito por dígito; si hay riesgo de confusión, se incluye la hora. 0920 → «two zero» o «zero nine two zero». La dependencia ATS da la verificación de hora redondeada al medio minuto más próximo (2.5.2).",
        },
        { kind: "sub", text: "Una autorización se procesa como conjunto" },
        {
          kind: "p",
          text: "**Piense en una llegada, no en una ficha de vocabulario.** Aproximación puede cambiar el límite vertical, el rumbo o la velocidad y, además, transmitir el reglaje QNH o la pista prevista. El piloto que comunica escucha primero el distintivo y la instrucción entera; si una parte se superpone con otra transmisión, solicita repetición de esa parte. El piloto que vuela conserva la trayectoria mientras ambos identifican qué cambió respecto de la autorización anterior.",
        },
        {
          kind: "p",
          text: "**El número se verifica en dos lugares: en la radio y en el avión.** Al colacionar, la tripulación distingue «FLIGHT LEVEL» de una altitud en pies y dice las cifras con la agrupación correcta. Después confirma que el selector de altitud, rumbo, velocidad o radio coincide con lo autorizado y que el modo de guiado hará lo esperado. Un «four thousand feet» correcto, mientras queda seleccionado otro límite vertical, no es una buena comunicación operacional. Tampoco lo es seleccionar el valor que uno esperaba oír antes de confirmar la instrucción.",
        },
        {
          kind: "p",
          text: "**Si la nueva instrucción parece incompatible con una restricción, una carta o el rendimiento disponible, no se resuelve adivinando.** Se solicita aclaración, se declara que no se puede cumplir cuando corresponda y se mantiene explícita la última autorización comprendida.",
        },
      ]),
      { kind: "sub", text: "Fraseología OACI" },
      NOTA_EJEMPLOS,
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Nivel de vuelo",
            codigo: tx("ATC:   AVIANCA 452, CLIMB TO FL 350.", "PILOT: CLIMBING TO FL 350, AVIANCA 452."),
            texto: "**Se dice:** «flight level three five zero» (TRI FA-IF SI-RO).",
          },
          {
            rotulo: "Altitud con QNH",
            codigo: tx("ATC:   AVIANCA 452, DESCEND TO 4 000 FEET, QNH 1005.", "PILOT: DESCENDING TO 4 000 FEET, QNH 1005, AVIANCA 452."),
            texto: "**Se dice:** «four thousand feet, QNH one zero zero five»: millares enteros (2.4.3) y QNH dígito por dígito (2.4.2).",
          },
          {
            rotulo: "Rumbo",
            codigo: tx("ATC:   AVIANCA 452, TURN LEFT HEADING 050.", "PILOT: LEFT HEADING 050, AVIANCA 452."),
            texto: "**Se dice:** «heading zero five zero» (modelo del Doc 9432, 6.3.1).",
          },
          {
            rotulo: "Código SSR",
            codigo: tx("ATC:   AVIANCA 452, SQUAWK 6402.", "PILOT: 6402, AVIANCA 452."),
            texto: "**Se dice:** «six four zero two». Los códigos SSR se colacionan siempre (2.8.3.5 c).",
          },
          {
            rotulo: "Frecuencia de 8,33 kHz",
            codigo: tx("ATC:   AVIANCA 452, CONTACT BOGOTA CONTROL 128.905.", "PILOT: 128.905, AVIANCA 452."),
            texto: "**Se dice:** «one two eight decimal nine zero five»: seis dígitos. Frecuencia ficticia.",
            etiqueta: "«DECIMAL»: " + POR_VERIFICAR,
          },
        ],
      },
      masEjemplos([
        {
          kind: "pasos",
          items: [
            {
              rotulo: "Frecuencia con cinco dígitos (espacio de 25 kHz)",
              codigo: tx("ATC:   AVIANCA 452, CONTACT DEPARTURE 121.75.", "PILOT: 121.75, AVIANCA 452."),
              texto: "**Se dice:** «one two one decimal seven five». El canal es 121.750; en espacio de 25 kHz se dicen cinco dígitos (2.4.5).",
              etiqueta: "«DECIMAL»: " + POR_VERIFICAR,
            },
            {
              rotulo: "Pista, viento y QNH en el rodaje",
              codigo: tx(
                "ATC:   AVIANCA 452, RUNWAY 06, WIND 080 DEGREES 10 KNOTS, QNH 1012, TAXI TO HOLDING POINT RUNWAY 06 VIA TAXIWAY ALFA.",
                "PILOT: RUNWAY 06, QNH 1012, HOLDING POINT RUNWAY 06 VIA ALFA, AVIANCA 452.",
              ),
              texto:
                "**Se dice:** «runway zero six, wind zero eight zero degrees one zero knots, QNH one zero one two». Modelo del Doc 9432, 4.4.2. Pista y QNH se colacionan (2.8.3.5 c); el viento no está en la lista de lo que siempre se colaciona.",
            },
            {
              rotulo: "Hora",
              codigo: tx("PILOT: AVIANCA 452, REQUEST TIME CHECK.", "ATC:   AVIANCA 452, TIME 0611."),
              texto: "**Se dice:** «time zero six one one» (o «one one» si no hay riesgo de confusión). Doc 9432, 2.5.2.",
            },
            {
              rotulo: "Visibilidad y RVR",
              codigo: tx("ATC:   AVIANCA 452, RVR 600 METRES."),
              texto:
                "**Se dice:** «RVR six hundred metres» (2.4.3). Si el valor no es de centenas enteras, dígito por dígito: RVR 550 → «five five zero» (2.4.2; el Doc 9432 4.2.1 trae el ejemplo «RVR 550 METRES» escrito en cifras).",
            },
            {
              rotulo: "Ascenso con condición",
              codigo: tx(
                "ATC:   AVIANCA 452, CLIMB TO FL 240, EXPEDITE UNTIL PASSING FL 180.",
                "PILOT: CLIMBING TO FL 240, EXPEDITING UNTIL PASSING FL 180, AVIANCA 452.",
              ),
              texto:
                "**Se dice:** «flight level two four zero … flight level one eight zero». Dos niveles en la misma instrucción: el riesgo es poner el segundo en el selector de altitud. Doc 9432, 3.3.3.3.",
            },
          ],
        },
        { kind: "sub", text: "Más errores frecuentes" },
        {
          kind: "list",
          items: [
            "**Decir los números en español** o mezclar idiomas en la misma transmisión.",
            "**«Twelve thousand», «one hundred eighty»**: agrupar donde la regla pide dígitos (niveles, rumbos, QNH) o decir mal los millares.",
            "**No hacer pausa antes y después del número** (Doc 9432, 2.2.1 f).",
            "**Colacionar la frecuencia sin el sexto dígito** en espacio de 8,33 kHz.",
          ],
        },
      ]),
      verificar("Grafías TREE, FIFE, NINER, «GUSTING» y «DECIMAL»: Anexo 10 Vol. II, cap. 5, y Doc 9432 en inglés, 2.4."),
      {
        kind: "enLaOperacion",
        momento: "En la línea",
        texto: "Un piloto dice el número y el otro lo verifica contra lo seleccionado: un número bien dicho y mal seleccionado sigue siendo un error. Tres trampas típicas:",
        pasos: [
          "**QNH 1013 frente a 1003** (el mismo ejemplo del Doc 9432, 2.8.3.9).",
          "**FL 100 y 10 000 pies** cerca del nivel de transición.",
          "**Frecuencias de cinco y seis dígitos** entre espacios con y sin canales de 8,33 kHz.",
        ],
      },
      error("Omitir FLIGHT LEVEL o FEET", "«Descend one zero zero» no dice si es nivel o altitud."),
      error("Confundir «to» y «two»", "En instrucciones de nivel (Doc 9835, 3.3.7 a; lección 1)."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "TRI, FA-IF, NAI-na, FO-ar, SI-RO (Doc 9432, 2.4.1).",
          "Regla general: dígito por dígito.",
          "HUNDRED y THOUSAND solo en altitud, nubes, visibilidad y RVR con centenas o millares enteros.",
          "FLIGHT LEVEL antes de la cifra; FEET o METRES después.",
          "Frecuencias: seis dígitos en 8,33 kHz, cinco en 25 kHz, cuatro si terminan en dos ceros.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Ejercicios",
        bloques: [
          { kind: "p", text: "**A. ¿Cómo se transmite?** (en inglés, con las palabras de la regla). Dígalo antes de abrir la solución." },
          {
            kind: "pasos",
            columnas: 2,
            items: [
              { rotulo: "Nivel de vuelo", codigo: "FL 350", texto: "¿Cómo se transmite?", interpretacion: { texto: "Flight level three five zero." } },
              { rotulo: "Nivel de vuelo", codigo: "FL 100", texto: "¿Cómo se transmite?", interpretacion: { texto: "Flight level one zero zero." } },
              {
                rotulo: "Altitud",
                codigo: "10 000 ft",
                texto: "¿Cómo se transmite?",
                interpretacion: { texto: "One zero thousand feet (millares enteros: dígitos de los millares y THOUSAND)." },
              },
              { rotulo: "Altitud", codigo: "5 500 ft", texto: "¿Cómo se transmite?", interpretacion: { texto: "Five thousand five hundred feet." } },
              { rotulo: "Altitud", codigo: "11 000 ft", texto: "¿Cómo se transmite?", interpretacion: { texto: "One one thousand feet." } },
              { rotulo: "Rumbo", codigo: "095", texto: "¿Cómo se transmite?", interpretacion: { texto: "Heading zero nine five." } },
              { rotulo: "Pista", codigo: "13", texto: "¿Cómo se transmite?", interpretacion: { texto: "Runway one three." } },
              { rotulo: "Código SSR", codigo: "4271", texto: "¿Cómo se transmite?", interpretacion: { texto: "Squawk four two seven one." } },
              { rotulo: "QNH", codigo: "1003", texto: "¿Cómo se transmite?", interpretacion: { texto: "QNH one zero zero three." } },
              {
                rotulo: "Viento",
                codigo: "240° 15 kt, ráfagas de 28 kt",
                texto: "¿Cómo se transmite?",
                interpretacion: { texto: "Wind two four zero degrees one five knots, gusting two eight knots («gusting»: ver el aviso «Verificar»)." },
              },
              {
                rotulo: "Frecuencia, espacio con canales de 8,33 kHz",
                codigo: "118.075",
                texto: "¿Cómo se transmite?",
                interpretacion: { texto: "One one eight decimal zero seven five." },
              },
              {
                rotulo: "La misma frecuencia, espacio de 25 kHz",
                codigo: "118.075",
                texto: "¿Cómo se transmite?",
                interpretacion: { texto: "One one eight decimal zero seven." },
              },
              {
                rotulo: "Frecuencia, espacio con canales de 8,33 kHz",
                codigo: "125.750",
                texto: "¿Cómo se transmite?",
                interpretacion: { texto: "One two five decimal seven five zero (el quinto y el sexto no son ambos cero)." },
              },
              {
                rotulo: "Frecuencia",
                codigo: "119.000",
                texto: "¿Cómo se transmite?",
                interpretacion: { texto: "One one nine decimal zero (quinto y sexto son cero: solo cuatro dígitos)." },
              },
              {
                rotulo: "Hora, sin riesgo de confusión y con riesgo",
                codigo: "1407",
                texto: "¿Cómo se transmite?",
                interpretacion: { texto: "«Zero seven»; con riesgo de confusión, «one four zero seven»." },
              },
              { rotulo: "Visibilidad", codigo: "800 m", texto: "¿Cómo se transmite?", interpretacion: { texto: "Visibility eight hundred metres." } },
              {
                rotulo: "RVR",
                codigo: "550 m",
                texto: "¿Cómo se transmite?",
                interpretacion: { texto: "RVR five five zero metres (no es centena entera: dígito por dígito)." },
              },
              {
                rotulo: "Altura de nubes",
                codigo: "1 500 ft",
                texto: "¿Cómo se transmite?",
                interpretacion: { texto: "One thousand five hundred feet." },
              },
            ],
          },
          { kind: "p", text: "**B. Detecte el error en la colación.**" },
          {
            kind: "pasos",
            items: [
              {
                rotulo: "Nivel de vuelo",
                codigo: tx("ATC:   AVIANCA 452, DESCEND TO FL 120.", "PILOT: DESCENDING TO 12 000 FEET, AVIANCA 452."),
                texto: "¿Qué está mal en la colación?",
                interpretacion: {
                  texto: "Nivel de vuelo colacionado como altitud: son referencias de presión distintas. Correcto: «DESCENDING TO FL 120, AVIANCA 452.»",
                },
              },
              {
                rotulo: "Frecuencia",
                codigo: tx("ATC:   AVIANCA 452, CONTACT BOGOTA CONTROL 128.905.", "PILOT: 128.9, AVIANCA 452."),
                texto: "¿Qué está mal en la colación?",
                interpretacion: {
                  texto: "Faltan dígitos: en espacio de 8,33 kHz se dicen seis. Correcto: «128.905, AVIANCA 452.»",
                },
              },
              {
                rotulo: "Código SSR",
                codigo: tx("ATC:   AVIANCA 452, SQUAWK 5501.", "PILOT: ROGER, AVIANCA 452."),
                texto: "¿Qué está mal en la colación?",
                interpretacion: {
                  texto:
                    "ROGER no es colación. El código SSR se colaciona siempre (Doc 9432, 2.8.3.5 c) y ROGER no sirve donde se exige colación (nota de ROGER en 2.6). Correcto: «5501, AVIANCA 452.»",
                },
              },
            ],
          },
        ],
      },
      fuentes(
        "Doc 9432 (4.ª ed.) 2.2.1 f), 2.4.1 (tabla y nota de énfasis), 2.4.2, 2.4.3, 2.4.4 y 2.4.5 (con sus notas), 2.5.1, 2.5.2, 2.6 (ROGER), 2.8.3.5 c), 2.8.3.7, 2.8.3.9, 3.3.3.3, 4.2.1, 4.4.2, 6.3.1, 7.3.1; Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1, Nota; Doc 9835 (2.ª ed.) 3.3.7 a). Fuente secundaria: CAA del Reino Unido, CAP 413 ed. 24 (efectiva el 1/7/2026), tabla 3 y 2.13 a 2.15, que reproduce la tabla OACI con la grafía inglesa (ZERO, WUN, TOO, TREE, FOWER, FIFE, SIX, SEVEN, AIT, NINER, DAYSEEMAL, HUN DRED, TOUSAND) y usa «decimal» en las frecuencias.",
        [
          "Grafías inglesas TREE, FIFE, NINER y demás contra Anexo 10 Vol. II cap. 5 (transmisión de números) y Doc 9432 edición inglesa 2.4.1 (no cargados); hoy solo las confirma la reproducción del CAP 413.",
          "La palabra inglesa para ráfagas en el viento («GUSTING») contra Doc 9432 edición inglesa 2.4.2 y Doc 4444 vigente cap. 12 (no cargados); la edición en español solo dice «ráfagas».",
          "La palabra inglesa «DECIMAL» en frecuencias (la edición en español da «COMA» en los ejemplos de 2.4.4 y «Decimal DE-si-mal» en la tabla de 2.4.1) contra Anexo 10 Vol. II cap. 5 (no cargado).",
          "Si la 5.ª edición o una enmienda del Doc 9432 o el Anexo 10 vigente cambiaron alguna de estas reglas de agrupación (no cargado). El CAP 413 del Reino Unido pide seis cifras en toda frecuencia, con o sin canales de 8,33 kHz: comprobar qué exige el AIP de cada Estado.",
        ],
      ),
    ],
  },
  // ── 06 ──────────────────────────────────────────────────────────────────
  {
    n: 6,
    title: "Distintivos de llamada",
    kicker: "Matrículas, designadores y distintivos parecidos",
    minutes: 6,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "El distintivo de llamada (call sign) identifica a qué aeronave va una transmisión y cuál responde. En una frecuencia compartida dos vuelos pueden tener números casi iguales: una autorización ejecutada por el avión equivocado cambia la separación del tránsito. Por eso se escucha el distintivo completo antes de actuar.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "**Tres tipos de distintivo de aeronave** (Doc 9432, 2.7.2.1):" },
      {
        kind: "table",
        head: ["Tipo", "Qué es", "Ejemplo", "Abreviado (2.7.2.2)"],
        rows: [
          ["a)", "Los caracteres de la matrícula", "G-ABCD (ejemplo del Doc 9432)", "El primero y al menos los dos últimos: G-CD"],
          ["b)", "Designador telefónico + los cuatro últimos caracteres de la matrícula", "FASTAIR DCAB (ejemplo del Doc 9432)", "FASTAIR AB"],
          ["c)", "Designador telefónico + identificación del vuelo", "AVIANCA 452", "**No se abrevia**"],
        ],
      },
      {
        kind: "p",
        text: "Los vuelos de aerolínea usan el **tipo c)**: su distintivo **no se abrevia nunca**. El código de tres letras (AVA en el plan de vuelo de Avianca) no se dice en la radio; el número de vuelo va dígito por dígito (Doc 9432, 2.4.2).",
      },
      {
        kind: "p",
        text: "**El designador telefónico no siempre es el nombre de la aerolínea.** Algunos reales (FAA JO 7340.2P, que publica la asignación OACI del Doc 8585):",
      },
      {
        kind: "table",
        head: ["Aerolínea", "Por radio", "Se dice", "OACI"],
        rows: [
          ["Avianca", "AVIANCA", "a-vi-AN-ka", "AVA"],
          ["LATAM Airlines Colombia", "LAN COLOMBIA", "", "ARE"],
          ["JetSMART Colombia", "JETROCK", "yet-rok", "JEC"],
          ["British Airways", "SPEEDBIRD", "SPIID-berd", "BAW"],
          ["Air France", "AIRFRANS", "er-FRANS", "AFR"],
          ["Copa Airlines", "COPA", "", "CMP"],
        ],
      },
      {
        kind: "list",
        items: [
          "**Primer contacto con distintivos completos** (Doc 9432, 2.8.1.1); abreviar solo después de que la estación lo haga, y nunca el tipo c) (2.7.2.2.1).",
          "**No cambiar el tipo de distintivo en vuelo**, salvo que el ATC lo indique por riesgo de confusión (2.7.2.3).",
          "**HEAVY solo en el primer contacto** con cada dependencia (Doc 9432, 2.7.2.4; Doc 4444, 4.9.2).",
          "**La colación termina con el distintivo** (2.8.3.7): así el controlador sabe quién colacionó.",
        ],
      },
      {
        kind: "p",
        text: "**Caso real.** El 9 de agosto de 1987, TWA 843 y TWA 834 estaban en la misma área de control de Nueva York. El controlador quería dar un viraje a TWA 843, pero dijo TWA 834; esa tripulación lo ejecutó, TWA 843 siguió recto y se perdió la separación con Pan Am 537 (NTSB, recomendaciones A-89-83 a A-89-90). La colación **no corrige por sí sola que ATC haya dicho el distintivo equivocado**: ante la duda, se confirma antes de actuar. Se amplía en la lección 56.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-06-01.svg",
        alt: "Lámina ampliable: AIR CHINA 238 muestra las partes del distintivo; debajo, secuencia factual de la confusión entre TWA 843 y TWA 834 descrita por el NTSB.",
        ancho: 1080,
        alto: 1560,
        pie: "Arriba: el designador radiotelefónico se dice por radio; CCA238 es la identificación del plan de vuelo del ejemplo del Doc 9432, no la frase que pronuncia la tripulación. Abajo: hechos del informe NTSB A-89-83 a A-89-90, pp. 1 a 2, sin diálogo inventado. Amplíe para seguir a qué avión iba dirigido el viraje, cuál lo ejecutó y por qué la tripulación debe confirmar ante una duda de identidad.",
      },
      profundizar([
        {
          kind: "p",
          text: "**El caso completo.** El 9 de agosto de 1987, TWA 843 y TWA 834 llegaron a la misma área de control de Nueva York con distintivos fácilmente confundibles. El controlador pretendía dar un viraje a TWA 843, pero dijo TWA 834; la tripulación de TWA 834 ejecutó el viraje. TWA 843 continuó recto y se perdió la separación estándar con Pan Am 537. Minutos después, el mismo controlador confundió Clipper 568 y Clipper 558, sin pérdida de separación en ese segundo episodio. Son hechos del informe del NTSB, no un diálogo reconstruido. La defensa exige atención de cabina al contexto y a la compatibilidad de la instrucción con la propia trayectoria.",
        },
        {
          kind: "kv",
          items: [
            {
              k: "Designador telefónico",
              v: "La palabra autorizada para nombrar al explotador por radio. El Doc 9432 muestra AIR CHINA 238 frente a CCA238, su forma en el plan de vuelo; FASTAIR 345 es otro ejemplo del manual, expresamente didáctico.",
            },
            { k: "Designador de la empresa", v: "El código de tres letras que va en el plan de vuelo. No se dice en la radio." },
            { k: "Matrícula", v: "Las marcas de nacionalidad y matrícula de la aeronave. En Colombia, HK- y un número de orden (RAC 45)." },
          ],
        },
        {
          kind: "p",
          text: "Otros designadores telefónicos de la misma fuente: American Airlines, AMERICAN (AAL); United Airlines, UNITED (UAL); Lufthansa, LUFTHANSA (DLH); Iberia, IBERIA (IBE); KLM, KLM (se dice «kei-el-em»); Delta Air Lines, DELTA (DAL); Satena, SATENA (NSE).",
        },
        {
          kind: "p",
          text: "HEAVY: en el Doc 4444 cargado, la categoría pesada es de 136 000 kg o más de masa máxima certificada de despegue (4.9.1.1).",
        },
        { kind: "sub", text: "Qué comprueba una tripulación de aerolínea" },
        {
          kind: "p",
          text: "**Antes de transmitir**, quien lleva la radio verifica que el distintivo coincide con la identificación de vuelo prevista para ese tramo y escucha la frecuencia antes de ocuparla. Si otro vuelo con cifras parecidas está en la frecuencia, ambos pilotos mantienen esa diferencia en mente: se escucha la palabra del explotador y todas las cifras, no solo la terminación.",
        },
        {
          kind: "p",
          text: "**Al recibir una autorización**, el piloto que comunica no empieza a mover selectores por haber oído un número familiar. Espera el mensaje entero, identifica el destinatario, separa los elementos que cambian la trayectoria y colaciona con su distintivo completo al final. Si la frecuencia se bloqueó o se cortó una sílaba crítica, la acción segura es confirmar la autorización para el propio vuelo; el manual de la FAA propone «VERIFY CLEARANCE FOR [distintivo completo]» en su espacio aéreo (AIM 4-2-4), no como sustituto universal de la fraseología OACI.",
        },
        {
          kind: "p",
          text: "**Después de la colación**, el controlador debe escuchar qué aeronave respondió y corregir discrepancias; la tripulación escucha el hearback y no trata el silencio como garantía. La gestión de distintivos similares empieza antes del vuelo: EUROCONTROL mantiene un servicio para detectar coincidencias de distintivos en los horarios de las aerolíneas, pero en la frecuencia cada autorización exige atención individual.",
        },
      ]),
      { kind: "sub", text: "Fraseología OACI" },
      NOTA_EJEMPLOS,
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Primer contacto con HEAVY",
            codigo: tx("PILOT: BOGOTA TOWER, AVIANCA 452 HEAVY.", "ATC:   AVIANCA 452, REPORT OUTER MARKER.", "PILOT: WILCO, AVIANCA 452."),
            texto: "**Significado:** HEAVY acompaña solo el primer contacto con la dependencia (adaptado del ejemplo del Doc 9432, cap. 7).",
          },
          {
            rotulo: "Llamada con el distintivo incompleto",
            codigo: tx(
              "PILOT: GROUND, 452, REQUEST PUSH-BACK.",
              "ATC:   STATION CALLING GROUND, SAY AGAIN YOUR CALL SIGN.",
              "PILOT: GROUND, AVIANCA 452, REQUEST PUSH-BACK.",
            ),
            texto: "**Significado:** «452» solo no identifica a nadie. La estación pide el distintivo (Doc 9432, 2.8.1.1 y 2.8.1.5).",
          },
        ],
      },
      {
        kind: "escenario",
        titulo: "Distintivo parecido: la colación revela quién contestó",
        situacion:
          "En la frecuencia están AVIANCA 452 y AVIANCA 425. El controlador transmite: «AVIANCA 425, CLIMB TO FL 350.» El piloto de AVIANCA 452, por error, colaciona: «CLIMBING TO FL 350, AVIANCA 452.»",
        preguntas: [
          {
            q: "¿Qué hace el controlador y qué le permitió detectar el error?",
            a: "ATC detiene la ejecución y aclara que la instrucción era para AVIANCA 425; AVIANCA 452 conserva el nivel que tenía autorizado y lo confirma. El distintivo completo al final de la colación permite identificar quién respondió (Doc 9432, 2.8.3.7 y 2.8.3.8). **La limitación:** si ATC dice de entrada el distintivo equivocado, como en el caso TWA de 1987, una colación perfecta de ese distintivo no revela la intención original del controlador.",
          },
        ],
        concepto: "Colacionar con el distintivo completo y contrastar la instrucción con el contexto de vuelo.",
      },
      {
        kind: "escenario",
        titulo: "Duda sobre a quién iba la instrucción",
        situacion:
          "Usted es AVIANCA 452 y en la frecuencia también está AVIANCA 425. Una transmisión se corta justo en las cifras y solo alcanza a oír «AVIANCA …, TURN RIGHT HEADING…». Tampoco se recibe completo el rumbo.",
        preguntas: [
          {
            q: "¿Ejecuta el viraje?",
            a: "No se adivina el destinatario ni el rumbo. Se conserva la autorización vigente y se pide a ATC que confirme si la instrucción era para AVIANCA 452 y que repita el rumbo. «CONFIRM» figura en el Doc 9432, 2.6; la frase completa es lenguaje claro de un escenario educativo. Solo después de una aclaración inequívoca se modifica la trayectoria.",
          },
        ],
        concepto: "Si duda de a quién iba la instrucción: no ejecute, confirme.",
      },
      masEjemplos([
        {
          kind: "pasos",
          items: [
            {
              rotulo: "Distintivo tipo a) abreviado por la estación (ejemplo del Doc 9432)",
              codigo: tx("PILOT: TOWER, GOLF ALFA BRAVO CHARLIE DELTA.", "ATC:   GOLF CHARLIE DELTA, TOWER.", "PILOT: GOLF CHARLIE DELTA, …"),
              texto:
                "**Significado:** la estación abrevió primero; desde entonces la aeronave puede abreviar si no existe riesgo de confusión (Doc 9432, 2.7.2.2 a) y 2.7.2.2.1). Con un distintivo tipo c) de aerolínea esto no aplica.",
            },
          ],
        },
        { kind: "sub", text: "Más errores frecuentes" },
        {
          kind: "list",
          items: [
            "**Abreviar un distintivo tipo c)** o abreviar antes de que lo haga la estación.",
            "**Colacionar sin distintivo** o poniéndolo al principio y omitiéndolo al final: el controlador no sabe quién respondió.",
            "**Olvidar HEAVY** en el primer contacto, o repetirlo en cada transmisión.",
            "**Decir el nombre comercial en vez del designador** («Air France» por AIRFRANS, «LATAM» por LAN COLOMBIA).",
          ],
        },
      ]),
      verificar("Cambio de distintivo y categorías de estela vigentes: Doc 4444 vigente, cap. 12 y 4.9; designadores: Doc 8585."),
      {
        kind: "enLaOperacion",
        momento: "En la línea y en la entrevista",
        texto:
          "Las aerolíneas de la región tienen números de vuelo parecidos en la misma franja (idas y regresos, numeración consecutiva). Ambos pilotos escuchan el distintivo y, ante la mínima duda, confirman antes de mover un selector. Si en la entrevista le preguntan «¿qué hace si cree que la instrucción era para otro avión?»: no ejecutar y confirmar con el distintivo completo.",
      },
      error("Recortar el distintivo", "Decir unas cifras sueltas en una frecuencia con varios vuelos de la misma empresa."),
      error("Aceptar la autorización del otro", "Porque «era la que esperaba»: es el sesgo de expectativa (lección 55)."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Tres tipos: matrícula; designador + cuatro últimos caracteres; designador + número de vuelo.",
          "El de aerolínea no se abrevia, y el designador puede no ser el nombre comercial (SPEEDBIRD, AIRFRANS).",
          "HEAVY solo en el primer contacto con cada dependencia.",
          "Toda colación termina con el distintivo completo.",
          "Si duda de a quién iba la instrucción: no ejecute, confirme.",
        ],
      },
      fuentes(
        "Doc 9432 (4.ª ed.) 2.3.2, 2.4.2, 2.6 (CONFIRM), 2.7.2.1, 2.7.2.2, 2.7.2.2.1, 2.7.2.3, 2.7.2.4, 2.8.1.1, 2.8.1.5, 2.8.3.4, 2.8.3.7, 2.8.3.8 y ejemplo FASTAIR 345 HEAVY del cap. 7; Doc 4444 (15.ª ed., Enm. 4) 4.9.1.1, 4.9.2. Designadores telefónicos: FAA JO 7340.2P Change 3 (efectiva 7/9/2026), cap. 3, secc. 3, que publica la asignación OACI del Doc 8585 (https://www.faa.gov/air_traffic/publications/atpubs/cnt_html/chap3_section_3.html). Caso real: NTSB, recomendaciones A-89-83 a A-89-90, 11 de agosto de 1989, pp. 1-2, https://www.ntsb.gov/safety/safety-recs/recletters/A89_83_90.pdf. Defensa ante duda: FAA AIM 4-2-4, https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_2.html. Gestión preventiva de distintivos: EUROCONTROL Call Sign Similarity Service, https://www.eurocontrol.int/service/call-sign-similarity-service.",
        [
          "«CHANGE YOUR CALL SIGN TO … [UNTIL FURTHER ADVISED]» y «REVERT TO FLIGHT PLAN CALL SIGN» contra Doc 4444 vigente cap. 12 (cambio de distintivo de llamada) (no cargado).",
          "Categorías de estela turbulenta vigentes (la 16.ª ed. del Doc 4444 añadió la categoría SUPER y su palabra en radio) contra Doc 4444 vigente 4.9 (no cargado).",
          "Designadores telefónicos contra el Doc 8585 original (no se encontró un extracto público y oficial); la FAA anuncia la JO 7340.2R efectiva el 29/10/2026, y desde esa fecha hay que volver a comprobarlos. La pronunciación «se dice» es una guía para hispanohablantes, no una transcripción oficial.",
          "Forma en que cada Estado pide pronunciar el número de vuelo (dígito por dígito o agrupado) contra Anexo 10 Vol. II cap. 5 y el AIP del Estado (en Colombia, AIP Colombia GEN 3.4) (no cargados).",
        ],
      ),
    ],
  },
  // ── 07 ──────────────────────────────────────────────────────────────────
  {
    n: 7,
    title: "Cómo se arma una transmisión",
    kicker: "A quién llamas, quién eres y qué quieres",
    minutes: 6,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "El orden en que se arma un mensaje para que el receptor sepa en el primer segundo si es para él, de quién viene y qué se le pide. Una ayuda didáctica (no un texto OACI) son tres preguntas:",
      },
      {
        kind: "secuencia",
        numerada: true,
        items: [
          "**WHO ARE YOU CALLING?** ¿A quién llama? (la estación)",
          "**WHO ARE YOU?** ¿Quién es? (su distintivo)",
          "**WHAT DO YOU WANT or REPORT?** ¿Qué quiere o qué informa?",
        ],
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "kv",
        items: [
          { k: "Piloto que llama", v: "Estación, distintivo propio completo y mensaje; en superficie, la posición antes de la solicitud (Doc 9432, 2.8.1.1; AIM de la FAA, 4-2-3)." },
          { k: "ATC que llama o instruye", v: "Distintivo de la aeronave primero. La tripulación comprueba que el mensaje es para su vuelo antes de actuar." },
          { k: "Colación", v: "El contenido primero y **el distintivo al final** (Doc 9432, 2.8.3.7)." },
        ],
      },
      {
        kind: "list",
        items: [
          "**Puesta en marcha**: puesto y acuse del ATIS con la solicitud (Doc 9432, 4.2.2).",
          "**Contacto inicial con aproximación**: nivel, estimado a un punto e información ATIS (7.3.1).",
          "**Notificación de posición**: posición, hora, nivel, próxima posición y hora (3.4.1).",
        ],
      },
      {
        kind: "p",
        text: "Algunos Estados fijan en su AIP qué debe incluir el primer contacto (Doc 9432, Preámbulo): **lo que manda es el procedimiento local publicado.**",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-07-01.svg",
        alt: "Diagrama de tres transmisiones: llamada inicial del piloto con estación, distintivo y posición o solicitud; respuesta de control con distintivo al principio; colación del piloto con distintivo al final.",
        ancho: 1600,
        alto: 900,
        pie: "Identifica a quién se llama y quién habla antes de transmitir el mensaje; en la respuesta, verifica que el distintivo sea el tuyo y colaciona los elementos obligatorios con tu distintivo al final. Amplía la lámina para seguir las tres bandas. Esquema basado en Doc 9432, 2.8.1 y 2.8.3, y AIM FAA, 4-2-3; no representa una autorización real.",
      },
      { kind: "sub", text: "Las tres bandas en una llamada" },
      NOTA_EJEMPLOS,
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Llamada, respuesta y colación",
            codigo: tx(
              "PILOT: BOGOTA GROUND, AVIANCA 452, STAND 12, REQUEST TAXI, INFORMATION CHARLIE.",
              "ATC:   AVIANCA 452, TAXI TO HOLDING POINT RUNWAY 13L VIA TAXIWAY ALFA, QNH 1019.",
              "PILOT: HOLDING POINT RUNWAY 13L VIA ALFA, QNH 1019, AVIANCA 452.",
            ),
            texto:
              "**Significado:** el piloto dice estación, distintivo, posición, solicitud y ATIS; el controlador empieza por el distintivo; la colación termina con él (modelo del Doc 9432, 4.4.3 y 2.8.3.7).",
          },
          {
            rotulo: "El orden en un modelo publicado",
            codigo: "FAA AIM 4-2-3 (ejemplo publicado): Columbia Ground, Cessna Three One Six Zero Foxtrot, south ramp, I-F-R Memphis.",
            texto:
              "Estación, distintivo completo, posición en superficie y solicitud IFR hacia Memphis. Es un ejemplo del manual estadounidense, no un procedimiento de Colombia.",
          },
        ],
      },
      profundizar([
        { kind: "p", text: "**Llamada en uno o dos pasos.**" },
        {
          kind: "list",
          items: [
            "En dos pasos: el piloto llama con los distintivos y espera una respuesta antes de dar un mensaje extenso. El Doc 9432, edición de 2007, explica que la respuesta de la estación permite continuar sin añadir una invitación verbal; antes de usar esa práctica en un Estado concreto hay que comprobar la fraseología vigente y las instrucciones locales.",
            "En un paso: estación, distintivo y mensaje de corrido. Puede reducir ocupación de una frecuencia de muy alta frecuencia (VHF, Very High Frequency) cuando la recepción es fiable y la solicitud es corta y esperada; no es excusa para omitir datos críticos.",
          ],
        },
        {
          kind: "p",
          text: "**Rodaje**: con el acuse del ATIS, el controlador no necesita repetir la información de salida (Doc 9432, 4.4.3). **Notificación de posición completa**: identificación, posición, hora, nivel, próxima posición y hora, punto significativo siguiente (Doc 9432, 3.4.1).",
        },
        {
          kind: "p",
          text: "**La situación determina cuánto hay que decir.** El AIM 4-2-3 permite incluir la solicitud, posición o altitud y la información ATIS recibida si la recepción es fiable y eso reduce congestión, y advierte que no se debe saturar al controlador con datos superfluos. En superficie importan ubicación y petición; tras una transferencia, la altitud y el contexto de la autorización; ante una condición anormal, la naturaleza de la situación y lo que la aeronave puede hacer. No existe una frase universal que sirva igual en todas las fases.",
        },
        {
          kind: "p",
          text: "**Respuesta y colación: cerrar el ciclo.** Al oír el distintivo en la respuesta, el piloto verifica que la instrucción es para su vuelo, identifica qué partes requieren colación, las contrasta con el plan y cierra con su distintivo. El controlador escucha esa respuesta y corrige una discrepancia. Una autorización entendida pero incompatible con el estado de la aeronave exige aclaración o UNABLE, no aceptación automática (Doc 9432, 2.8.3).",
        },
      ]),
      {
        kind: "casoReal",
        titulo: "Avianca 052: un mensaje de combustible no establece por sí solo una emergencia compartida",
        fecha: "25 de enero de 1990",
        lugar: "Aproximación al aeropuerto John F. Kennedy, Nueva York",
        aeronave: "Boeing 707-321B, matrícula HK 2016",
        queOcurrio: [
          "El vuelo regular Avianca 052 salió de Bogotá, hizo escala en el aeropuerto José María Córdova cerca de Medellín y continuó a Nueva York. El informe NTSB AAR-91/04 documenta esperas, una aproximación frustrada y el agotamiento de combustible antes de llegar a JFK.",
          "Tras la aproximación frustrada, la tripulación contactó de nuevo a aproximación. El primer oficial informó sobre el combustible con la expresión «we're running out of fuel sir». El informe recoge que en cabina se hablaba de la urgencia, pero el mensaje radiado no declaró inequívocamente una emergencia. El controlador preguntó después si el tramo adicional era aceptable dadas las condiciones de combustible, y la respuesta no transmitió una imposibilidad clara.",
          "La lección de estructura no consiste en memorizar una línea de ese accidente ni en reconstruir una autorización nueva. Consiste en separar destinatario, identidad, condición, intención y necesidad de asistencia, y comprobar que el controlador entendió la gravedad. Si la seguridad exige prioridad de emergencia, se comunica como tal mediante la fraseología aplicable; una expresión vaga no sustituye esa declaración.",
        ],
        consecuencia: "La aeronave se accidentó por agotamiento de combustible. La NTSB identificó tanto la gestión de combustible como la falta de comunicación oportuna de la emergencia entre las causas probables; no atribuyó el resultado a una sola frase aislada.",
        leccion: "En un vuelo de línea, una comunicación eficaz no solo contiene datos verdaderos: deja explícitos la gravedad, la capacidad de la aeronave y la respuesta que se necesita de ATC. El piloto verifica la comprensión recibida y, si la situación evoluciona, actualiza el mensaje sin esperar a la siguiente fase de vuelo.",
        fuente: "NTSB, AAR-91/04, §§1.1 y 2.6: https://www.ntsb.gov/investigations/AccidentReports/Reports/AAR9104.pdf",
      },
      verificar("Dependencia, frecuencia y contenido del primer contacto: AIP/eAIP vigente del aeródromo; emergencias: lecciones 34 a 37."),
      {
        kind: "enLaOperacion",
        momento: "En la preparación de salida",
        texto:
          "Antes de oprimir el PTT, el piloto que comunica arma el mensaje con lo que ya anotó: puesto, letra del ATIS, QNH y solicitud (qué se anota y quién llama lo definen los SOP). Una llamada completa evita preguntas; completa no significa saturada: ante una condición crítica, esta va primero, como enseña Avianca 052.",
      },
      error("Empezar por el mensaje", "Y decir la estación y el distintivo al final: el controlador ya no sabe a quién estaba escuchando."),
      error("Esconder la condición crítica", "Entre datos secundarios. La gravedad y la ayuda requerida tienen que quedar inequívocas para ATC."),
      masEjemplos([
        { kind: "sub", text: "Más errores frecuentes" },
        {
          kind: "list",
          items: [
            "**Omitir la letra del ATIS** o decir una que ya cambió.",
            "**Colacionar sin distintivo al final.**",
            "**Pedir cosas que no van con esa dependencia** (pedir rodaje a Delivery, pedir nivel a Ground).",
          ],
        },
      ]),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Piloto que llama: estación, distintivo, mensaje.",
          "ATC: distintivo de la aeronave primero.",
          "Colación: contenido primero, distintivo al final.",
          "Avianca 052: decir algo sobre combustible no garantiza que ATC entienda una emergencia.",
          "Manda el procedimiento local publicado en el AIP vigente.",
        ],
      },
      fuentes(
        "Doc 9432 (4.ª ed.) Preámbulo, 2.8.1.1, 2.8.3, 2.8.3.7, 3.4.1, 4.2.2, 4.4.3 y 7.3.1. FAA AIM vigente, 4-2-1 a 4-2-3 (https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap4_section_2.html). NTSB AAR-91/04, §§1.1 y 2.6 (https://www.ntsb.gov/investigations/AccidentReports/Reports/AAR9104.pdf).",
        [
          "Dependencia, frecuencia y contenido exigido en el primer contacto para un vuelo colombiano concreto contra el AIP/eAIP vigente del Estado y aeródromo. Esta lección no publica valores locales.",
          "Comparar la edición vigente del Doc 4444 y el Anexo 10, Vol. II con el Doc 9432 de 2007 antes de trasladar una frase del manual a la operación.",
          "La condición de emergencia se rige por la fraseología vigente y la situación real de la aeronave; el caso histórico de Avianca 052 no es una plantilla de radio.",
        ],
      ),
    ],
  },
]
