/**
 * Nivel 1 · Fundamentos (lecciones 01 a 07, capítulos 1 a 7 de la especificación).
 *
 * Antes de la primera frase: para qué se habla por radio, con quién, con qué
 * disciplina, y cómo se deletrean letras, números y distintivos. Todo lo que
 * viene después se apoya en esto.
 *
 * Fuente: docs/comunicaciones/nivel-1.md, capítulo por capítulo, sin resumir.
 * Cada lección sigue el mismo orden: ¿qué es?, lo que debe saber un piloto,
 * el hueco de la imagen, la fraseología (un paso por ejemplo, con lo que dice
 * cada estación y su significado), el aviso «Verificar», la aplicación en
 * aerolínea, el error frecuente, «En pocas palabras» y las fuentes plegadas.
 *
 * Lo que el documento marca VERIFICAR sale dos veces: en un callout visible
 * de tono `verificar` (qué documento consultar) y en la lista de fuentes del
 * detalle técnico. Los ejemplos afectados llevan además su etiqueta. Nada que
 * no esté confirmado se presenta como confirmado.
 *
 * El formato de los bloques y de los huecos está documentado al inicio de
 * index.ts.
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

/** Etiqueta de un ejemplo cuya frase todavía no está confirmada en la edición vigente. */
const POR_VERIFICAR = "por verificar (ver el aviso «Verificar»)"

export const NIVEL_1: DocScreen[] = [
  // ── 01 ──────────────────────────────────────────────────────────────────
  {
    n: 1,
    title: "Para qué sirven las comunicaciones",
    kicker: "Claridad, brevedad y precisión entre piloto y ATC",
    minutes: 8,
    blocks: [
      {
        kind: "callout",
        tone: "info",
        title: "Sobre los ejemplos de este módulo",
        text: "El Doc 9432 combina fraseología con ejemplos ficticios. Las transmisiones de práctica de esta lección que usan `AVIATORY 452` también son **simulaciones**, no grabaciones ni autorizaciones vigentes: sus frecuencias, puntos y procedimientos deben contrastarse con la publicación de información aeronáutica (AIP, Aeronautical Information Publication) actual antes de cualquier uso operacional. La historieta de abajo es distinta: reconstruye, sin atribuir diálogos inventados a los protagonistas, la secuencia documentada del vuelo US Airways 1549 entre LaGuardia y Charlotte. La fraseología de ejemplo se muestra en inglés; `PLAIN LANGUAGE` identifica el lenguaje no normalizado. La lección 5 explica cómo pronunciar los números.",
      },
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "La radiotelefonía es el medio con el que pilotos y personal de tierra se comunican. Lo que se transmite (información e instrucciones) es de importancia fundamental para la seguridad operacional y para que el tránsito se mueva con agilidad (Doc 9432, 2.1). El mismo párrafo lo dice sin rodeos: se han producido incidentes y accidentes en los que el uso de procedimientos y fraseología no normalizados fue factor contribuyente.",
      },
      {
        kind: "p",
        text: "El servicio de control de tránsito aéreo (ATC, Air Traffic Control) existe para prevenir colisiones entre aeronaves y, en el área de maniobras, entre aeronaves y obstáculos, y para acelerar y mantener ordenado el movimiento del tránsito (Doc 4444, cap. 1, definición de «Servicio de control de tránsito aéreo»). La radio es la herramienta con la que eso ocurre.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "p",
        text: "**La relación piloto-ATC es de responsabilidad compartida.** El controlador emite, el piloto colaciona (readback), el controlador escucha esa colación y corrige de inmediato cualquier discrepancia (Doc 9432, 2.8.3.8; Doc 4444, 4.5.7.5.2). Si una de las dos partes no cumple su paso, el sistema pierde su red de seguridad.",
      },
      {
        kind: "p",
        text: "**El ATC no le cuida el terreno.** Entre los objetivos del control de tránsito aéreo no está prevenir colisiones con el terreno. El piloto sigue siendo responsable de verificar que la autorización que recibe es segura en ese aspecto (Doc 4444, 4.10.3.2, Nota 3, y Prólogo, «Alcance y finalidad del documento», 2.1, Nota 2).",
      },
      {
        kind: "p",
        text: "**Las cinco cualidades que busca la Organización de Aviación Civil Internacional (OACI; International Civil Aviation Organization, ICAO).** La fraseología se concibió para que las comunicaciones sean **eficientes, claras, concisas e inequívocas** (Doc 9432, Preámbulo; 3.2.2). A eso se suma:",
      },
      {
        kind: "table",
        head: ["Cualidad", "Qué significa en la cabina"],
        rows: [
          ["Claridad", "Se entiende a la primera, con ruido de fondo y por alguien cuyo primer idioma no es el suyo."],
          ["Brevedad", "Solo lo necesario. La frecuencia es compartida."],
          ["Precisión", "Números, pistas, niveles y puntos exactos, con sus unidades."],
          ["Estandarización", "La misma palabra significa lo mismo para todos (Doc 9432, 2.6)."],
          ["Disciplina de radio", "Escuchar antes de hablar, no bloquear la frecuencia, colacionar lo que corresponde."],
        ],
      },
      {
        kind: "p",
        text: "**Una transmisión puede ser técnicamente correcta y operacionalmente deficiente.** Contener el dato correcto no basta. Una transmisión falla si:",
      },
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
        text: "El Preámbulo del Doc 9432 añade un punto que un piloto latinoamericano vive todos los días: a menudo ni quien transmite ni quien recibe habla en su primer idioma. Por eso las transmisiones deben ser lentas y claras, y las frases directas, sin modismos, se entienden mejor que las indirectas o coloquiales.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-01-01.webp",
        alt: "Historieta de cuatro escenas: tripulación del vuelo 1549 en ascenso, encuentro con aves, controlador de salida de Nueva York y decisión de amaraje en el río Hudson.",
        ancho: 1600,
        alto: 900,
        pie: "Caso real, ilustración interpretativa: US Airways 1549, LaGuardia–Charlotte, 15 de enero de 2009. Amplía la imagen para examinar las escenas; lee debajo la secuencia operacional. Fuente: Junta Nacional de Seguridad del Transporte de EE. UU. (NTSB, National Transportation Safety Board), informe AAR-10/03, sección 1.1.",
      },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "1 · Salida: transmitir posición y autorización completa",
            texto: "Tras despegar de LaGuardia, la tripulación contactó a la dependencia de salida e informó su altitud y el ascenso autorizado. El controlador emitió una nueva instrucción de ascenso. **Para el piloto de aerolínea, la tarea no es repetir un dato aislado:** hay que identificar el vuelo, entender el nuevo límite vertical, compararlo con la autorización anterior y confirmar lo que efectivamente se va a cumplir. La ruta prevista era LaGuardia–Charlotte; el informe del NTSB documenta esa secuencia antes del encuentro con aves.",
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
            texto: "Cuando el controlador planteó la pista 13 de LaGuardia, el comandante respondió que no podían alcanzarla y que quizá terminarían en el Hudson. Esa respuesta puso una limitación operacional explícita sobre la mesa y permitió a ATC ajustar su apoyo a la decisión de la tripulación. El caso enseña a **decir lo que la aeronave puede o no puede hacer**, sostener la prioridad de volar el avión y mantener la información esencial circulando aun bajo carga de trabajo extrema. La ilustración resume hechos del informe; no pretende reproducir la cabina ni el radar con exactitud histórica.",
          },
        ],
      },
      { kind: "sub", text: "Fraseología y secuencia de radio" },
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
              "**Qué debe detectar un piloto de aerolínea:** la comunicación cambió de una autorización de ascenso con límite vertical a una emergencia con capacidad de maniobra degradada. El controlador propuso opciones, pero la tripulación evaluó si realmente podía cumplirlas y comunicó la imposibilidad. No es un ejercicio de colacionar un número aislado. Los hechos y los tiempos proceden del informe NTSB AAR-10/03, §1.1; para estudiar las palabras exactas hay que acudir al registro del apéndice B. El primer MAYDAY se superpuso con otra transmisión y no llegó al controlador.",
          },
          {
            rotulo: "Un número ambiguo y su forma correcta",
            codigo: tx(
              "ATC (forma deficiente citada por el Doc 9835, 3.3.7): Descend two four zero zero feet.",
              "",
              "ATC (forma normalizada): AVIATORY 452, DESCEND TO 2 400 FEET, QNH 1012.",
              "PILOT: DESCENDING TO 2 400 FEET, QNH 1012, AVIATORY 452.",
            ),
            texto:
              "**Significado:** el Doc 9835 cita el primer mensaje como ejemplo de malentendido. «Two» y «to» suenan igual: el piloto entendió «descienda a cuatrocientos pies» en vez de 2 400 pies, y la aeronave se estrelló contra el suelo. El Doc 9835 no identifica el accidente. En la forma normalizada, las altitudes en miles y centenas enteras se dicen con THOUSAND y HUNDRED («two thousand four hundred»), no dígito por dígito (Doc 9432, 2.4.3), y la cifra va con su unidad (Doc 4444, 4.5.7.5.1, Nota). La colación da al controlador la oportunidad de oír el error.",
            etiqueta: "«DESCEND TO» con TO para altitudes: " + POR_VERIFICAR,
          },
          {
            rotulo: "La palabra TAKE-OFF solo cuando corresponde",
            codigo: tx(
              "PILOT (forma deficiente citada por el Doc 9835, 3.3.7): We are at take-off.",
              "",
              "ATC:   AVIATORY 452, REPORT WHEN READY FOR DEPARTURE.",
              "PILOT: WILCO, AVIATORY 452.",
              "PILOT: AVIATORY 452, READY.",
              "ATC:   AVIATORY 452, LINE UP AND WAIT.",
              "PILOT: LINING UP, AVIATORY 452.",
            ),
            texto:
              "**Significado:** en el primer mensaje, el controlador entendió que la aeronave esperaba en posición; en realidad ya había iniciado la carrera de despegue. Con niebla, chocó con otra aeronave (Doc 9835, 3.3.7 b). En la secuencia normalizada, la palabra TAKE-OFF solo se usa cuando se autoriza el despegue o cuando se anula esa autorización; en los demás casos se dice DEPARTURE o AIRBORNE (Doc 9432, 2.8.3.3; secuencia de 4.5.3).",
          },
          {
            rotulo: "Cuando no se puede cumplir",
            codigo: tx(
              "ATC:   AVIATORY 452, CLEARED TO CALI FL 290, CROSS GIKOS FL 150 OR ABOVE, IF UNABLE, MAINTAIN FL 130.",
              "PILOT: UNABLE TO CROSS GIKOS FL 150 DUE WEIGHT, MAINTAINING FL 130, AVIATORY 452.",
            ),
            texto:
              "**Significado:** el controlador previó que quizá el avión no podía y dio una alternativa. El piloto dijo UNABLE con el motivo y confirmó lo que sí hará (Doc 9432, 2.8.3.10, adaptado). Aceptar algo que no se puede cumplir es peor que decir UNABLE.",
          },
          {
            rotulo: "Corta, clara y sin cortesías",
            codigo: tx(
              "PILOT (forma deficiente, PLAIN LANGUAGE): Good morning Bogota Approach, how are you today, this is Aviatory four five two, we are now at flight level eight zero and we are estimating GIKOS at around four six, and we have information Delta, thank you very much.",
              "",
              "PILOT (forma recomendada): BOGOTA APPROACH, AVIATORY 452, FL 80, ESTIMATING GIKOS 46, INFORMATION DELTA.",
              "ATC:   AVIATORY 452, DESCEND TO 4 000 FEET, QNH 1005, TRANSITION LEVEL 50, EXPECT ILS APPROACH RUNWAY 13R.",
              "PILOT: DESCENDING TO 4 000 FEET, QNH 1005, TRANSITION LEVEL 50, EXPECTING ILS APPROACH RUNWAY 13R, AVIATORY 452.",
            ),
            texto:
              "**Significado:** el mismo contenido en la mitad del tiempo. Debería evitarse el uso de expresiones de cortesía (Doc 9432, 3.1.4). El contacto inicial y la respuesta siguen el modelo del Doc 9432, 7.3.1 (pista y QNH de ejemplo).",
            etiqueta: "«DESCEND TO» con TO para altitudes: " + POR_VERIFICAR,
          },
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "Estos puntos salen de la 15.ª edición del Doc 4444, que no es la vigente. Confirmar en el **Doc 4444 vigente (16.ª ed. y enmiendas), cap. 4 (4.5.7.5)** que se mantengan la Nota sobre prevención de colisiones con el terreno y el texto de colación; y en el **Doc 4444 vigente, cap. 12 (instrucciones de nivel)**, si se mantiene «DESCEND TO (nivel)» con la palabra TO para altitudes, como en los ejemplos de descenso de esta lección.",
      },
      {
        kind: "enLaOperacion",
        momento: "En la línea",
        texto:
          "En un vuelo de línea la tripulación cambia de frecuencia muchas veces y cada autorización toca algo crítico: pista, nivel, rumbo, velocidad, código SSR. La radio compite con listas de chequeo, con el manejo del automatismo y con la coordinación entre pilotos. Una transmisión corta y estándar libera tiempo para lo demás y reduce la probabilidad de que el otro piloto, el controlador u otra tripulación la entienda mal.",
      },
      {
        kind: "enLaOperacion",
        momento: "En la entrevista",
        texto:
          "En la entrevista de aerolínea suelen evaluar exactamente esto: si usted habla como un piloto disciplinado en la frecuencia (breve, estándar, con readback correcto) y si sabe decir UNABLE o pedir confirmación sin dudar.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error frecuente",
        text: "Los errores que más se repiten con lo de esta lección:",
      },
      {
        kind: "list",
        items: [
          "**Creer que «se entendió» porque el controlador no dijo nada.** El silencio no es confirmación; la colación y el hearback sí.",
          "**Rellenar**: saludos, «please», «we would like to», «this is». Alargan la frecuencia y esconden el dato.",
          "**Números sin unidad** («descend four thousand» sin decir pies ni QNH, o «three five zero» sin decir nivel de vuelo).",
          "**Usar TAKE-OFF fuera de su contexto** («ready for take-off» dicho de forma que suene a autorización). Ver capítulo 18.",
          "**Hablar rápido para «no ocupar la frecuencia»**: si el otro pide repetición, se ocupó el doble.",
        ],
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "La radiotelefonía es una herramienta de seguridad operacional, no un trámite.",
          "Claro, breve, preciso, estándar y con disciplina.",
          "Correcto no es suficiente: tiene que ser inequívoco para alguien que quizá no habla su idioma.",
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
            text: "Doc 9432 «Manual de radiotelefonía» (4.ª ed., 2007, edición en español), Doc 4444 PANS-ATM (15.ª ed., Enm. 4, 2012, edición en español, parcial), Doc 9835 (2.ª ed., 2010) y NTSB AAR-10/03, §1.1 y apéndice B (https://www.ntsb.gov/investigations/accidentreports/reports/aar1003.pdf). La 15.ª edición del Doc 4444 no es la vigente; cada lección marca con «Verificar» lo que hay que confirmar en la edición en vigor.",
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
    minutes: 10,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Los servicios de tránsito aéreo (ATS, Air Traffic Services) abarcan información de vuelo, alerta, asesoramiento de tránsito aéreo y control de tránsito aéreo (ATC, Air Traffic Control). Este último se divide en control de área, de aproximación y de aeródromo (Doc 4444, cap. 1; Doc 9432, 1.1). Cada servicio lo presta una dependencia, y cada dependencia tiene su distintivo de llamada en la radio.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
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
      {
        kind: "p",
        text: "**Cómo se llama cada dependencia en la radio.** Nombre del lugar más un sufijo que dice el tipo de servicio (Doc 9432, 2.7.1.1):",
      },
      {
        kind: "table",
        head: ["Dependencia o servicio", "Sufijo en inglés", "Qué hace por usted"],
        rows: [
          ["Entrega de la autorización", "DELIVERY", "Le entrega la autorización de ruta antes de salir."],
          ["Control de la plataforma", "APRON", "Movimientos en plataforma, según el aeropuerto."],
          ["Control del movimiento en la superficie", "GROUND", "Puesta en marcha (en muchos aeropuertos), rodaje."],
          ["Control de aeródromo", "TOWER", "Pista: entrar, cruzar, despegar, aterrizar; tránsito del circuito."],
          ["Salidas con radar de control de aproximación", "DEPARTURE", "Ascenso inicial y salida del área terminal."],
          ["Control de aproximación", "APPROACH", "Llegadas y salidas en el área terminal."],
          ["Llegadas con radar de control de aproximación", "ARRIVAL", "Llegadas, donde está separado de APPROACH."],
          ["Centro de control de área", "CONTROL", "En ruta."],
          ["Servicio de información de vuelo", "INFORMATION", "Información y alerta, sin control."],
          ["Estación aeronáutica", "RADIO", "Estación aeronáutica (por ejemplo, HF en ruta)."],
          ["Despacho de la compañía", "DISPATCH", "Comunicación con su operador."],
          ["Radar de aproximación de precisión", "PRECISION", "Aproximación PAR."],
          ["Radar (en general)", "RADAR", "Servicio radar genérico."],
          ["Estación radiogoniométrica", "HOMER", "Radiogoniometría."],
        ],
      },
      {
        kind: "p",
        text: "En la carta usted puede ver otros nombres (por ejemplo, «Center» en algunos Estados). El sufijo OACI para el centro de control de área es CONTROL; el nombre real de cada estación sale del AIP.",
      },
      {
        kind: "p",
        text: "**Una vez establecida la comunicación**, puede omitirse el nombre del lugar o el sufijo si no genera confusión (Doc 9432, 2.7.1.2): «Tower» en vez de «Bogota Tower».",
      },
      {
        kind: "p",
        text: "**Cómo se transfiere la aeronave.** Transferir el control y transferir la comunicación son cosas relacionadas pero distintas:",
      },
      {
        kind: "list",
        items: [
          "La estación le dice cuándo cambiar de frecuencia. Si no se lo dice, usted informa antes de cambiar (Doc 9432, 2.8.2.1).",
          "La transferencia puede ser inmediata o condicionada («when passing FL 80») (Doc 9432, 2.8.2.1).",
          "En la llegada, el control pasa de aproximación a torre según cartas de acuerdo (por ejemplo, en un punto o nivel prescritos), y la transferencia de comunicaciones a torre debe darse a tiempo para la autorización de aterrizaje y la información de tránsito esencial (Doc 4444, 4.3.2.1.1 y 4.3.2.1.2).",
          "En la salida, torre transfiere a aproximación antes de salir de las proximidades del aeródromo, antes de entrar en IMC o en un punto o nivel prescritos (Doc 4444, 4.3.2.1.3).",
          "En aeródromos con tierra y torre separados, lo normal es pasar a torre al acercarse al punto de espera (Doc 9432, 4.5.1).",
          "Después de aterrizar, salvo instrucción en contrario, siga en la frecuencia de torre hasta dejar libre la pista (Doc 9432, 4.9).",
        ],
      },
      { kind: "p", text: "**Tres verbos que no son iguales** (Doc 9432, 2.6 y 2.8.2.2):" },
      {
        kind: "kv",
        items: [
          { k: "CONTACT", v: "Establezca comunicación con esa estación. Usted cambia y llama." },
          { k: "MONITOR", v: "Escuche esa frecuencia. Usted cambia y **no** llama (por ejemplo, el ATIS)." },
          { k: "STAND BY FOR (estación)", v: "Quede en escucha; la dependencia lo llamará pronto." },
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-02-01.svg",
        alt: "Flujo orientativo de ocho fases: Delivery, Ground, Tower, Departure, Control, Approach, Tower y Ground; el servicio disponible y cada transferencia dependen del aeropuerto y de ATC.",
        ancho: 1600,
        alto: 760,
        pie: "Secuencia de referencia, no carta ni procedimiento de un aeropuerto concreto. La disponibilidad de cada dependencia y la frecuencia aplicable se consultan en el AIP vigente y en las instrucciones de ATC. Amplía el esquema para leer cada fase.",
      },
      { kind: "sub", text: "Fraseología OACI" },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Delivery entrega la autorización de ruta",
            codigo: tx(
              "PILOT: BOGOTA DELIVERY, AVIATORY 452, STAND 12, INFORMATION ALFA, REQUEST CLEARANCE TO CALI.",
              "ATC:   AVIATORY 452, CLEARED TO CALI VIA GIKOS 1A DEPARTURE, FL 280, SQUAWK 5501.",
              "PILOT: CLEARED TO CALI VIA GIKOS 1A DEPARTURE, FL 280, SQUAWK 5501, AVIATORY 452.",
            ),
            texto:
              "**Significado:** autorización hasta Cali por la salida GIKOS 1A (ficticia), nivel de vuelo 280, código 5501. Las autorizaciones de ruta se colacionan siempre y la colación termina con el distintivo (Doc 9432, 2.8.3.5 a), 2.8.3.6, 2.8.3.7). El contenido real de una autorización de salida cambia según el aeropuerto.",
            etiqueta: "«REQUEST CLEARANCE TO…»: " + POR_VERIFICAR,
          },
          {
            rotulo: "Ground a torre",
            codigo: tx("ATC:   AVIATORY 452, CONTACT TOWER 118.1.", "PILOT: 118.1, AVIATORY 452."),
            texto:
              "**Significado:** cambie a torre en 118.1 y llame. La respuesta mínima es la frecuencia y el distintivo (modelo del Doc 9432, 2.8.3.7 y 2.8.2.1).",
          },
          {
            rotulo: "Torre a Departure después del despegue",
            codigo: tx(
              "ATC:   AVIATORY 452, RUNWAY 13L, CLEARED FOR TAKE-OFF, REPORT AIRBORNE.",
              "PILOT: RUNWAY 13L, CLEARED FOR TAKE-OFF, WILCO, AVIATORY 452.",
              "PILOT: AVIATORY 452, AIRBORNE 57.",
              "ATC:   AVIATORY 452, CONTACT DEPARTURE 121.75.",
              "PILOT: 121.75, AVIATORY 452.",
            ),
            texto:
              "**Significado:** en visibilidad reducida, torre puede pedir que notifique cuando despegó. Luego lo pasa a Departure (Doc 9432, 4.5.6).",
            etiqueta: "Pista 13L de ejemplo; pronunciación de paralelas: " + POR_VERIFICAR,
          },
          {
            rotulo: "Departure a Control, con condición",
            codigo: tx(
              "ATC:   AVIATORY 452, WHEN PASSING FL 80 CONTACT BOGOTA CONTROL 129.1.",
              "PILOT: WHEN PASSING FL 80, 129.1, AVIATORY 452.",
            ),
            texto:
              "**Significado:** no cambie todavía. Cambie cuando pase el nivel 80. La condición se colaciona (Doc 9432, 2.8.2.1).",
          },
          {
            rotulo: "Primer contacto con Approach",
            codigo: tx(
              "PILOT: BOGOTA APPROACH, AVIATORY 452, FL 80, ESTIMATING GIKOS 46, INFORMATION DELTA.",
              "ATC:   AVIATORY 452, EXPECT ILS APPROACH RUNWAY 13R, QNH 1014.",
              "PILOT: RUNWAY 13R, QNH 1014, AVIATORY 452.",
            ),
            texto:
              "**Significado:** en el contacto inicial, aproximación normalmente informa el tipo de aproximación prevista (Doc 9432, 7.3.1). Pista y QNH se colacionan (Doc 9432, 2.8.3.5 c).",
            etiqueta: "Pista 13R de ejemplo; pronunciación de paralelas: " + POR_VERIFICAR,
          },
          {
            rotulo: "Approach a torre y torre a tierra",
            codigo: tx(
              "ATC:   AVIATORY 452, CONTACT TOWER 118.1.",
              "PILOT: 118.1, AVIATORY 452.",
              "ATC (torre, después del aterrizaje): AVIATORY 452, TAKE FIRST RIGHT, WHEN VACATED CONTACT GROUND 121.9.",
              "PILOT: FIRST RIGHT, WILCO, 121.9, AVIATORY 452.",
            ),
            texto:
              "**Significado:** la instrucción de contactar tierra aplica solo cuando haya dejado libre la pista (Doc 9432, 4.9).",
            etiqueta: "Orden de «TAKE FIRST RIGHT, WHEN VACATED…»: " + POR_VERIFICAR,
          },
          {
            rotulo: "MONITOR y STAND BY FOR",
            codigo: tx(
              "ATC:   AVIATORY 452, MONITOR ATIS 127.25.",
              "PILOT: MONITORING 127.25, AVIATORY 452.",
              "ATC:   AVIATORY 452, STAND BY FOR TOWER 118.1.",
              "PILOT: 118.1, AVIATORY 452.",
            ),
            texto:
              "**Significado:** con MONITOR escucha sin llamar; con STAND BY FOR pasa a la frecuencia y espera a que torre lo llame (Doc 9432, 2.8.2.2).",
          },
          {
            rotulo: "De control a información de vuelo",
            codigo: tx("ATC:   AVIATORY 452, CONTACT BOGOTA INFORMATION 125.75.", "PILOT: 125.75, AVIATORY 452."),
            texto:
              "**Significado:** pasa a una dependencia que da información y alerta, no control (Doc 9432, 7.2.1, adaptado; Doc 4444, 4.2).",
          },
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "Tres frases de esta lección no están confirmadas en la edición vigente. La forma de pedir la autorización a Delivery («REQUEST CLEARANCE TO…»): consultar el **Doc 4444 vigente, cap. 12**, y el **AIP del aeródromo (AD 2.18 / AD 2.22)**; algunos aeropuertos piden datos adicionales o usan DCL. El orden de «TAKE FIRST RIGHT, WHEN VACATED CONTACT GROUND» (tomado del ejemplo del Doc 9432, 4.9): **Doc 4444 vigente, cap. 12**. La pronunciación de pistas paralelas («RUNWAY 13L» como «runway one three left»): **Doc 4444 vigente, cap. 12, y Anexo 10 Vol. II, cap. 5**; aquí las pistas con L y R son de ejemplo. Las dependencias y frecuencias reales de Colombia: **AIP Colombia GEN 3.4 y AD 2**.",
      },
      {
        kind: "enLaOperacion",
        momento: "En la línea",
        texto:
          "En un aeropuerto grande de la región usted puede hablar con Delivery, Ground, Tower, Departure, varios sectores de Control, Approach, Tower y Ground en un mismo vuelo. Cada cambio de frecuencia es un punto débil: frecuencia mal seleccionada, cambio olvidado, llamada al sector equivocado. Por eso la tripulación confirma la frecuencia en voz alta al colacionar y verifica en el panel de radio antes de llamar.\n\nQué dependencias existen y cómo se llaman varía según el aeropuerto y el Estado: hay aeropuertos sin Delivery (la autorización la da Ground o Tower) y otros donde la puesta en marcha se pide a Apron. La lista de frecuencias y distintivos está en el AIP (en Colombia, AIP Colombia, secciones AD 2 de cada aeródromo y GEN 3.4).",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error frecuente",
        text: "Los errores que más se repiten con lo de esta lección:",
      },
      {
        kind: "list",
        items: [
          "**Confundir CONTACT con MONITOR**: llamar en la frecuencia del ATIS, o quedarse callado en una frecuencia donde había que llamar.",
          "**Cambiar de frecuencia sin que se lo digan** y sin informar (Doc 9432, 2.8.2.1).",
          "**Llamar a la estación equivocada** por costumbre («Bogota Approach» cuando ya lo pasaron a Departure).",
          "**Irse de la frecuencia de torre antes de dejar libre la pista.**",
          "**Colacionar la frecuencia sin mirarla**: se dice «118.1» y se selecciona 118.7.",
        ],
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "ATS agrupa información de vuelo, alerta, asesoramiento y control (área, aproximación, aeródromo).",
          "El distintivo de una estación es lugar más sufijo: DELIVERY, GROUND, TOWER, DEPARTURE, APPROACH, CONTROL, INFORMATION.",
          "CONTACT: cambie y llame. MONITOR: cambie y escuche. STAND BY FOR: cambie y espere.",
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
    minutes: 9,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Son las técnicas de transmisión y los hábitos que hacen que un mensaje llegue completo y se entienda a la primera. El Doc 9432, 2.2, las enumera como «técnicas de transmisión».",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "**Antes de transmitir** (Doc 9432, 2.2.1):" },
      {
        kind: "list",
        items: [
          "**Escuche antes de hablar.** Haga escucha en la frecuencia para no pisar otra transmisión.",
          "**Piense antes de oprimir el pulsador de transmisión (PTT, push-to-talk).** Tenga armado el mensaje (a quién, quién es, qué quiere) antes de hablar. Evite «humm», «este…» (2.2.1 g).",
          "**Oprima a fondo el PTT antes de empezar a hablar** y no lo suelte hasta terminar (2.2.1 j). Si habla antes o suelta antes, se corta la primera o la última palabra, que suele ser el distintivo.",
        ],
      },
      { kind: "p", text: "**Mientras transmite** (Doc 9432, 2.2.1):" },
      {
        kind: "list",
        items: [
          "Tono normal de conversación, claro e inteligible (c).",
          "**Velocidad constante, no más de 100 palabras por minuto**; más lento si el otro tiene que anotar (d).",
          "Volumen constante (e).",
          "**Una ligera pausa antes y después de los números** los hace más fáciles de entender (f).",
          "Micrófono a distancia constante; si tiene que girar la cabeza, deje de hablar (h, i).",
          "En mensajes largos, pause de vez en cuando para que el otro pueda pedir lo que no recibió (k).",
        ],
      },
      {
        kind: "p",
        text: "**Micrófono trabado** (Doc 9432, 2.2.2): un PTT que se queda oprimido bloquea la frecuencia para todos. Después de cada transmisión, verifique que quedó libre y que el micrófono no está donde pueda activarse solo.",
      },
      { kind: "p", text: "**Brevedad y palabras innecesarias.**" },
      {
        kind: "list",
        items: [
          "Evite expresiones de cortesía (Doc 9432, 3.1.4).",
          "Puede omitir, si no causa confusión: «SURFACE» en el viento de superficie, «DEGREES» en rumbos radar, «VISIBILITY», «CLOUD» y «HEIGHT» en informes meteorológicos, «HECTOPASCALS» en reglajes de presión (Doc 9432, 3.1.3).",
          "**IMMEDIATELY** solo cuando la seguridad exige una acción inmediata (Doc 9432, 3.1.5). Si lo oye, es en serio.",
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
      {
        kind: "p",
        text: "**AVIATE, NAVIGATE, COMMUNICATE.** Es un principio de instrucción muy difundido en la formación de pilotos (no aparece en los documentos cargados de la Organización de Aviación Civil Internacional —OACI; International Civil Aviation Organization, ICAO—): primero controlar la aeronave, luego saber dónde está y hacia dónde va, luego comunicar. La comunicación es fundamental, pero **no desplaza el control de la aeronave**. Los propios documentos OACI reconocen la carga de trabajo: los controladores deberían evitar transmitir durante el despegue, el ascenso inicial, la última etapa de la aproximación final o el recorrido de aterrizaje, salvo por seguridad (Doc 9432, 4.1.2), y no deben dar autorizaciones a un piloto que está alineándose o despegando (Doc 9432, 2.8.3.2). Del lado del piloto, un «STANDBY» a tiempo es mejor que una colación hecha a medias mientras se pilota.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-03-01.svg",
        alt: "Pirámide de prioridades de vuelo: controlar la aeronave, asegurar posición y trayectoria, y después comunicar; cuatro hábitos para transmitir sin cortar ni bloquear la frecuencia.",
        ancho: 1080,
        alto: 1350,
        pie: "La base de la pirámide es controlar la aeronave; comunicar no sustituye esa tarea. Al transmitir, escuche, prepare el mensaje, oprima el PTT antes de hablar y suéltelo al terminar. Amplíe el esquema para leer cada paso. «Aviate, navigate, communicate» es un principio de instrucción, no una autorización para omitir una llamada de seguridad ni una cita normativa de la OACI.",
      },
      { kind: "sub", text: "Aplicación en una cabina de línea" },
      {
        kind: "p",
        text: "**La prioridad no es «contestar rápido», sino que la tripulación conserve una imagen correcta de lo que el avión está haciendo.** Cuando llega una llamada mientras se configura un cambio de trayectoria, el piloto que vuela mantiene el control y la conciencia de posición; el piloto que comunica escucha el distintivo, identifica qué cambió y contrasta la instrucción con el plan y las limitaciones del momento. Si no oyó el nivel, el rumbo o el punto completo, no lo reconstruye por expectativa: pide la parte que falta. Si necesita unos segundos para coordinar en cabina, lo comunica y vuelve a llamar. Una colación pronunciada con fluidez, pero basada en un dato incompleto, no aporta seguridad.",
      },
      {
        kind: "p",
        text: "**El vuelo US Airways 1549, presentado en la lección anterior, muestra por qué esta jerarquía importa de verdad.** Tras el impacto con aves y la pérdida de empuje, la tripulación tuvo que controlar una aeronave con energía limitada, valorar si alguna pista era alcanzable, trabajar en cabina y mantener informado al controlador. La primera transmisión de emergencia se superpuso con otra llamada y no llegó a salida, según el informe AAR-10/03, §1.1, de la Junta Nacional de Seguridad del Transporte de Estados Unidos (NTSB, National Transportation Safety Board). La lección para un aspirante no es memorizar una frase corta: es reconocer que la frecuencia es compartida, comprobar si el mensaje esencial llegó y expresar con claridad la capacidad real de la aeronave. Cuando una opción de retorno dejó de ser viable, comunicar «unable» permitió que control de tránsito aéreo entendiera el límite operacional en vez de interpretar una colación como aceptación.",
      },
      {
        kind: "p",
        text: "**Después de cada transmisión sigue habiendo trabajo.** El piloto que habló suelta el PTT, escucha la respuesta y verifica si el controlador corrigió un dato o transfirió la aeronave. El otro piloto coteja lo oído con la trayectoria y los selectores que correspondan; quién ejecuta cada acción depende de los procedimientos de la compañía. Si la frecuencia quedó bloqueada por un micrófono trabado, o si se perdió el inicio de la llamada, la solución no es seguir adelante suponiendo que ATC comprendió: hay que restablecer la comunicación por el medio disponible y dejar explícito qué autorización se recibió realmente. Esa disciplina conecta técnica de transmisión, gestión de carga de trabajo y toma de decisiones.",
      },
      { kind: "sub", text: "Fraseología OACI" },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Pedir repetición de una parte",
            codigo: tx(
              "ATC:   AVIATORY 452, DESCEND TO FL 240, [ininteligible] GIKOS.",
              "PILOT: AVIATORY 452, SAY AGAIN ALL AFTER FL 240.",
              "ATC:   AVIATORY 452, DESCEND TO FL 240, BE LEVEL BY GIKOS.",
            ),
            texto:
              "**Significado:** el piloto recibió bien hasta FL 240 y pide solo lo que siguió (Doc 9432, 2.8.1.4: SAY AGAIN, SAY AGAIN (item), SAY AGAIN ALL BEFORE, SAY AGAIN ALL AFTER, SAY AGAIN ALL BETWEEN … AND …).",
          },
          {
            rotulo: "Corrección durante la propia transmisión",
            codigo: tx(
              "PILOT: AVIATORY 452, GIKOS 47, FL 330, RUTAM 07 CORRECTION RUTAM 57.",
              "ATC:   AVIATORY 452, ROGER.",
            ),
            texto:
              "**Significado:** el piloto dijo mal el estimado del siguiente punto (RUTAM, ficticio), dijo CORRECTION, repitió el último grupo correcto y dio el valor bueno (Doc 9432, 2.8.1.6).",
          },
          {
            rotulo: "Verificación de radio",
            codigo: tx(
              "PILOT: BOGOTA TOWER, AVIATORY 452, RADIO CHECK 118.1.",
              "ATC:   AVIATORY 452, TOWER, READING YOU FIVE.",
              "",
              "o bien:",
              "",
              "ATC:   AVIATORY 452, TOWER, READING YOU THREE, LOUD BACKGROUND WHISTLE.",
            ),
            texto:
              "**Significado:** una prueba de radio dice a quién llama, quién es, «RADIO CHECK» y la frecuencia (Doc 9432, 2.8.4.1). La respuesta usa la escala 1 a 5 (2.8.4.3).",
          },
          {
            rotulo: "STANDBY cuando está volando la aeronave",
            codigo: tx(
              "ATC:   AVIATORY 452, REPORT HEADING.",
              "PILOT: AVIATORY 452, STANDBY.",
              "PILOT (segundos después, ya estabilizado): AVIATORY 452, HEADING 050.",
              "ATC:   AVIATORY 452, ROGER, CONTINUE HEADING 050.",
            ),
            texto:
              "**Significado:** STANDBY significa «espere y le llamaré»; no aprueba ni niega nada (Doc 9432, 2.6). Se usa cuando la cabina está ocupada volando; hay que volver a llamar (secuencia de reporte de rumbo del Doc 9432, 6.3.2, adaptada).",
            etiqueta: "«STANDBY» dicho por el piloto: " + POR_VERIFICAR,
          },
          {
            rotulo: "Repetir lo importante con mala recepción",
            codigo: tx(
              "PILOT: BOGOTA APPROACH, AVIATORY 452, GIKOS 2 500 FEET, I SAY AGAIN 2 500 FEET, ENGINE LOSING POWER, ENGINE LOSING POWER.",
            ),
            texto:
              "**Significado:** el piloto prevé mala recepción y repite los elementos críticos (Doc 9432, 2.8.1.8, adaptado). Lo que corresponde a una situación de urgencia o socorro se ve en el Nivel 5.",
          },
          {
            rotulo: "La estación no sabe quién llamó",
            codigo: tx(
              "PILOT: BOGOTA GROUND, 452. (llamada recortada)",
              "ATC:   STATION CALLING BOGOTA GROUND, SAY AGAIN YOUR CALL SIGN.",
              "PILOT: BOGOTA GROUND, AVIATORY 452.",
            ),
            texto:
              "**Significado:** si la estación no tiene certeza de quién llamó, pide el distintivo hasta establecerlo (Doc 9432, 2.8.1.5). El error de origen fue omitir el designador telefónico.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "«AVIATE, NAVIGATE, COMMUNICATE» no está en los documentos OACI cargados: su fuente hay que buscarla en el **manual de operaciones o el FCTM del operador**, o en material de instrucción de la autoridad. No es norma OACI. Y que el piloto responda «STANDBY» a una solicitud del ATC como uso aceptado se confirma en el **Anexo 10 Vol. II, cap. 5**; el Doc 9432, 2.6, define la palabra sin limitar quién la usa.",
      },
      {
        kind: "enLaOperacion",
        momento: "En la línea",
        texto:
          "En un vuelo de línea normalmente un piloto se ocupa de la trayectoria y el otro de gran parte de las comunicaciones, según los SOP del operador (se desarrolla en el capítulo 59). Aun así, ambos escuchan. Cuando una llamada llega en un momento crítico (rotación, falla en el despegue, flare), lo profesional es volar primero y responder después. La frecuencia puede esperar unos segundos; la aeronave no.\n\nEn frecuencias congestionadas (áreas terminales grandes) la disciplina de escuchar antes de transmitir evita las transmisiones bloqueadas, que se ven en el capítulo 57.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error frecuente",
        text: "Los errores que más se repiten con lo de esta lección:",
      },
      {
        kind: "list",
        items: [
          "**Transmitir sin escuchar** y pisar la colación de otra aeronave o la instrucción del controlador.",
          "**Hablar antes de oprimir del todo el PTT** o soltarlo antes de terminar: se pierde el distintivo.",
          "**Pensar en voz alta en la frecuencia** («eh… Bogota… eh… Aviatory…»).",
          "**Tomar STANDBY como aprobación** y seguir con lo que se había pedido.",
          "**Responder a una llamada mientras se pierde el control de la trayectoria.**",
          "**No pedir repetición por vergüenza** y completar el mensaje con lo que «debió haber dicho».",
        ],
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Escuche, piense, oprima a fondo, hable, suelte y verifique.",
          "Menos de 100 palabras por minuto, pausa antes y después de los números.",
          "Sin cortesías, sin relleno, sin «humm».",
          "Si duda: SAY AGAIN (todo o la parte que falta). Si se equivoca: CORRECTION.",
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
    minutes: 10,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "El alfabeto de la Organización de Aviación Civil Internacional (OACI; International Civil Aviation Organization, ICAO) es el conjunto de 26 palabras con las que se deletrea por radio, una por letra, para que una letra no se confunda con otra de sonido parecido (B, D, E, G, P, T, V suenan casi igual en una radio con ruido). Para un piloto de aerolínea, el objetivo no es recitarlo como una lista: es **reconocer una secuencia al oído, asociarla con la autorización y verificar lo que entró en el sistema de navegación** antes de colacionar.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "**Cuándo se usa:**" },
      {
        kind: "list",
        items: [
          "**Cada letra del distintivo de llamada** de la aeronave se dice por separado con el alfabeto, **excepto el designador telefónico y el tipo de aeronave** (Doc 9432, 2.3.2). Es decir: «AVIATORY» se dice como palabra; la matrícula G-ABCD se dice «Golf Alfa Bravo Charlie Delta».",
          "**Cuando hay riesgo de que el mensaje no se reciba bien.** Para agilizar las comunicaciones no hay que deletrear palabras salvo ese riesgo (Doc 9432, 2.3.1). Ejemplos: un nombre de punto de notificación poco conocido, el nombre de un pasajero o de un hotel en plain language.",
          "Designadores de calles de rodaje, letras de ATIS, rutas y puntos: «taxiway Charlie», «information Bravo», «route Echo» (Doc 9432, 4.4.2, 4.4.3, 2.8.3.6).",
        ],
      },
      { kind: "p", text: "**Cuándo no:**" },
      {
        kind: "list",
        items: [
          "**Abreviaturas que se dicen letra por letra, sin alfabeto**: ILS, QNH, RVR, VOR, ATC (Doc 9432, 1.2, nota; 3.1.2). No se dice «India Lima Sierra».",
          "**Abreviaturas que se dicen como palabra** (marcadas con asterisco en el Doc 9432, 1.2): ATIS, NOTAM, SID, STAR, SIGMET, CAVOK, VOLMET, SELCAL, TAF, PAPI, RNAV, entre otras.",
        ],
      },
      {
        kind: "p",
        text: "**La tabla (Doc 9432, 2.3.3, edición en español).** La columna «Pronunciación» es la que publica la edición en español: está escrita para que un hispanohablante la lea en voz alta. En el original, la sílaba que lleva el énfasis va **subrayada**; ese subrayado **se perdió en el texto extraído** que se usó aquí, así que la tabla no marca el énfasis. Hay que tomarlo del PDF original.",
      },
      {
        kind: "table",
        head: ["Letra", "Palabra (como la escribe la edición en español)", "Pronunciación (Doc 9432, 2.3.3)"],
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
        text: "Tres detalles que la tabla deja ver y que un hispanohablante suele pasar por alto:",
      },
      {
        kind: "list",
        items: [
          "**H es «O TEL»**: la H no suena.",
          "**J es «TSHU LI ET»**: no «Julieta» a la española con jota.",
          "**Z es «TSU LU»** y **W es «UIS QUI»**.",
        ],
      },
      {
        kind: "p",
        text: "La edición en español escribe algunas palabras con grafía española (Julieta, Papá, Québec, Víctor). La lámina ampliable muestra la grafía internacional que presenta la OACI, incluida «Juliett» con doble t. Para la pronunciación aproximada en inglés usa la tabla oficial de la FAA; esta escribe «Whiskey», mientras la grafía que aparece en la referencia OACI es «Whisky». Las diferencias de grafía no autorizan a cambiar la palabra que se transmite.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-04-01.svg",
        alt: "Tabla ampliable de las veintiséis letras del alfabeto de deletreo, de Alfa a Zulu, con palabra internacional y guía aproximada de pronunciación en inglés.",
        ancho: 1200,
        alto: 1600,
        pie: "Referencia para escuchar y transcribir, no sustituto de la colación de una autorización completa. La grafía internacional sigue a la OACI; la guía aproximada de pronunciación inglesa sigue la tabla 2-3-2, §2-3-3, de la Administración Federal de Aviación de Estados Unidos (FAA, Federal Aviation Administration). La FAA escribe «Whiskey»; la grafía OACI es «Whisky». Amplíe la tabla para leer cada fila. Fuentes: https://www.icao.int/sites/default/files/postalhistory/annex_10_aeronautical_telecommunications.htm y https://www.faa.gov/air_traffic/publications/atpubs/fs_html/chap2_section_3.html.",
      },
      { kind: "sub", text: "Del deletreo a una decisión de cabina" },
      {
        kind: "p",
        text: "**Escuchar una palabra deletreada no termina el trabajo.** Si una dependencia transmite o aclara un punto de ruta, el piloto que comunica debe distinguir primero si se trata de una instrucción dirigida a su vuelo. Luego retiene o anota la secuencia de letras completa, verifica que el punto seleccionado en el sistema de gestión de vuelo coincide con lo recibido y confirma que ese cambio encaja con la autorización vigente. El otro piloto comprueba la modificación según el procedimiento del operador. Solo entonces la colación expresa lo que la tripulación entendió y está preparada para ejecutar. Recitar «Golf India Kilo…» perfectamente mientras se selecciona otro punto no evita una desviación de trayectoria.",
      },
      {
        kind: "p",
        text: "**Si falta una letra, se detiene la suposición.** Una frecuencia ocupada, un acento desconocido o un nombre muy parecido a otro punto pueden dejar la secuencia incompleta. En ese momento corresponde pedir repetición o deletreo de la parte dudosa, escuchar la respuesta y verificar de nuevo el dato antes de modificar la ruta. No basta con reconocer las primeras sílabas ni con aceptar la opción que aparece primero en la pantalla. El mismo criterio se aplica a calles de rodaje, letras de la información automática y matrículas de otras aeronaves: el alfabeto es una herramienta para eliminar una ambigüedad operacional, no una prueba de memoria desconectada de la tarea.",
      },
      { kind: "sub", text: "Fraseología OACI" },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Matrícula completa en el primer contacto",
            codigo: tx(
              "PILOT: BOGOTA TOWER, GOLF ALFA BRAVO CHARLIE DELTA. (G-ABCD)",
              "ATC:   GOLF ALFA BRAVO CHARLIE DELTA, BOGOTA TOWER.",
            ),
            texto:
              "**Significado:** primer contacto con distintivos completos, la estación llamada primero (Doc 9432, 2.8.1.1). Cada letra de la matrícula va con el alfabeto (2.3.2).",
          },
          {
            rotulo: "Designador telefónico más letras",
            codigo: tx("PILOT: BOGOTA GROUND, AVIATORY DELTA CHARLIE ALFA BRAVO. (AVIATORY DCAB)"),
            texto:
              "**Significado:** distintivo tipo b): designador telefónico seguido de los cuatro últimos caracteres de la matrícula (Doc 9432, 2.7.2.1 b). «AVIATORY» no se deletrea; las letras sí.",
          },
          {
            rotulo: "Calle de rodaje e información ATIS",
            codigo: tx(
              "PILOT: BOGOTA GROUND, AVIATORY 452 HEAVY, REQUEST TAXI, INFORMATION CHARLIE.",
              "ATC:   AVIATORY 452, TAXI TO HOLDING POINT RUNWAY 13L VIA TAXIWAY ALFA, QNH 1019.",
              "PILOT: HOLDING POINT RUNWAY 13L VIA ALFA, QNH 1019, AVIATORY 452.",
            ),
            texto:
              "**Significado:** la letra del ATIS y de la calle de rodaje van con el alfabeto (modelo del Doc 9432, 4.4.3 y 4.4.2).",
          },
          {
            rotulo: "Deletrear un punto poco conocido",
            codigo: tx(
              "ATC:   AVIATORY 452, CLEARED DIRECT GIKOS.",
              "PILOT: AVIATORY 452, SAY AGAIN WAYPOINT, SPELL IT.",
              "ATC:   GIKOS, I SAY AGAIN, GOLF INDIA KILO OSCAR SIERRA.",
              "PILOT: DIRECT GIKOS, AVIATORY 452.",
            ),
            texto:
              "**Significado:** el piloto no está seguro del nombre y pide que se lo deletreen. **PLAIN LANGUAGE**: «SAY AGAIN» e «I SAY AGAIN» son normalizadas (Doc 9432, 2.6); «spell it» no está en la lista normalizada cargada y es lenguaje claro. El deletreo se justifica por riesgo de mala recepción (2.3.1).",
            etiqueta: "PLAIN LANGUAGE: «spell it»",
          },
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "La tabla de la edición española todavía no marca la sílaba de énfasis de cada palabra (subrayada en el original, perdida en la extracción): tomarla del **PDF del Doc 9432 (4.ª ed.), 2.3.3**. La lámina no inventa ese énfasis: ofrece la palabra internacional y una guía aproximada de pronunciación de la tabla FAA 2-3-2. Para una referencia normativa de pronunciación en un Estado concreto, comprobar el **Anexo 10, Vol. II, cap. 5**, la edición vigente del manual aplicable y la publicación de su autoridad. Las matrículas colombianas (HK-) y mexicanas (XA-) de los ejercicios son ficticias: su formato real lo fija la **autoridad de cada Estado**.",
      },
      {
        kind: "enLaOperacion",
        momento: "En la línea",
        texto:
          "En la línea usted deletrea poco pero escucha mucho: letras de ATIS, calles de rodaje, puntos de espera, nombres de puntos y de SID/STAR, matrículas en frecuencias con aviación general. Lo que más cuesta en la práctica es la **velocidad de reconocimiento**: oír «Sierra Papa Tango» y ver SPT sin traducir mentalmente. Eso se entrena.\n\nAl introducir un punto en el FMS a partir de lo que dijo el controlador, el deletreo evita cargar un punto con nombre parecido.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error frecuente",
        text: "Los errores que más se repiten con lo de esta lección:",
      },
      {
        kind: "list",
        items: [
          "**Inventar palabras** («Beta», «Pedro», «Dog») o usar la de otro alfabeto.",
          "**Pronunciar a la española**: «Hotel» con H aspirada, «Julieta» con jota, «Whiskey» como «güisqui».",
          "**Deletrear lo que se dice como palabra o letra**: «India Lima Sierra» por ILS, «November Oscar Tango…» por NOTAM.",
          "**Deletrear el designador telefónico** («Alfa Victor India…» en vez de «AVIATORY»).",
          "**Confundir letras al oído** cuando no se usa el alfabeto: B/D/E/G/P/T/V, M/N.",
        ],
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "26 palabras, una por letra, pronunciación de la tabla del Doc 9432 2.3.3.",
          "Siempre para las letras del distintivo (menos el designador telefónico y el tipo de aeronave).",
          "Para el resto, solo si hay riesgo de que no se entienda.",
          "ILS, QNH, RVR: letras sueltas. ATIS, NOTAM, SID, STAR: palabra.",
          "H muda, J con «tsh», W como «uis».",
        ],
      },
      { kind: "sub", text: "Ejercicios" },
      {
        kind: "p",
        text: "**A. Diga en voz alta.** Dígalo antes de abrir la solución.",
      },
      {
        kind: "pasos",
        columnas: 2,
        items: [
          { rotulo: "Matrícula", codigo: "G-ABCD", texto: "Diga en voz alta.", interpretacion: { texto: "Golf Alfa Bravo Charlie Delta." } },
          {
            rotulo: "Matrícula ficticia",
            codigo: "HK-5241",
            texto: "Diga en voz alta (los dígitos se dicen como números; ver lección 5).",
            interpretacion: { texto: "Hotel Kilo, five two four one (con la pronunciación de números del Doc 9432 2.4.1)." },
          },
          { rotulo: "Waypoint", codigo: "GIKOS", texto: "Diga en voz alta.", interpretacion: { texto: "Golf India Kilo Oscar Sierra." } },
          { rotulo: "Waypoint ficticio", codigo: "RUTAM", texto: "Diga en voz alta.", interpretacion: { texto: "Romeo Uniform Tango Alfa Mike." } },
          {
            rotulo: "Distintivo",
            codigo: "AVIATORY DCAB",
            texto: "Diga en voz alta.",
            interpretacion: { texto: "AVIATORY Delta Charlie Alfa Bravo (el designador se dice como palabra)." },
          },
          { rotulo: "Letra del ATIS", codigo: "Information Q", texto: "Diga en voz alta.", interpretacion: { texto: "«Information Quebec»." } },
          { rotulo: "Calle de rodaje", codigo: "B2", texto: "Diga en voz alta.", interpretacion: { texto: "«Taxiway Bravo two»." } },
          { rotulo: "Matrícula ficticia", codigo: "XA-UJK", texto: "Diga en voz alta.", interpretacion: { texto: "X-ray Alfa Uniform Juliett Kilo." } },
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
      { kind: "p", text: "**C. ¿Alfabeto, letras sueltas o palabra?**" },
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
      { kind: "p", text: "Casos de la parte C: Doc 9432, 1.2, nota, y 3.1.2." },
      fuentes(
        "Doc 9432 (4.ª ed.) 1.2 (nota y asteriscos), 2.3.1, 2.3.2, 2.3.3, 2.7.2.1 b), 2.8.1.1, 3.1.2, 4.4.2, 4.4.3, 2.6 (SAY AGAIN, I SAY AGAIN). Grafía internacional: OACI (https://www.icao.int/sites/default/files/postalhistory/annex_10_aeronautical_telecommunications.htm). Guía aproximada inglesa: FAA, §2-3-3, tabla 2-3-2 (https://www.faa.gov/air_traffic/publications/atpubs/fs_html/chap2_section_3.html).",
        [
          "La sílaba de énfasis de cada palabra (subrayada en el original; perdida en la extracción) contra el PDF del Doc 9432 (4.ª ed.) 2.3.3.",
          "La pronunciación normativa y el énfasis de cada palabra contra Anexo 10 Vol. II cap. 5 y Doc 9432 edición inglesa 2.3.3 (no cargados); la lámina solo usa una guía aproximada publicada por la FAA.",
          "Formato real de matrículas colombianas (HK-) y mexicanas (XA-) contra la autoridad de cada Estado; en los ejercicios son ficticias.",
        ],
      ),
    ],
  },
  // ── 05 ──────────────────────────────────────────────────────────────────
  {
    n: 5,
    title: "Números en la radio",
    kicker: "Niveles, rumbos, frecuencias, códigos y QNH",
    minutes: 14,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Es la forma normalizada de pronunciar y agrupar números en radiotelefonía: niveles, rumbos, pistas, frecuencias, códigos del radar secundario de vigilancia (SSR, Secondary Surveillance Radar), viento, reglaje QNH, hora y altitudes. Casi todo lo que se colaciona tiene un número. **El objetivo para una tripulación de línea no es repetir cifras aisladas:** es recibir una autorización completa, distinguir qué elementos cambian, colacionar los que corresponden y comprobar que la aeronave quedó configurada de acuerdo con lo recibido.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "p",
        text: "**La pronunciación (Doc 9432, 2.4.1, edición en español).** Cuando se usa inglés, los números se pronuncian así. Se acentúan las sílabas en MAYÚSCULAS: en SI-RO las dos por igual; en FO-ar, más la primera.",
      },
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
      { kind: "p", text: "**Lo que muestra la transcripción, sin inventar reglas:**" },
      {
        kind: "list",
        items: [
          "**3 es TRI**: sin el sonido «th».",
          "**5 es FA-IF**: termina en «f», no en «v».",
          "**9 es NAI-na**: dos sílabas, con una vocal al final.",
          "**4 es FO-ar**: dos sílabas, énfasis en la primera.",
        ],
      },
      { kind: "p", text: "El Doc 9432 cargado no explica el porqué de cada forma; solo da la tabla." },
      {
        kind: "p",
        text: "Esas tres formas corresponden a lo que en la edición inglesa se escribe con grafías especiales (TREE, FIFE, NINER). La edición en español cargada no trae esas grafías; se confirman en el aviso «Verificar». Ningún documento cargado dice que se deban usar solo en ciertas fases, ni que sean opcionales: la tabla se aplica «cuando se use el idioma inglés». En la práctica se oyen pilotos y controladores que dicen «three», «five», «nine»; su tarea es entenderlos y, al hablar usted, seguir la tabla.",
      },
      {
        kind: "p",
        text: "**Regla general: dígito por dígito** (Doc 9432, 2.4.2). Todos los números se dicen separando cada dígito, salvo la excepción siguiente. El Doc 9432 da estos ejemplos:",
      },
      {
        kind: "table",
        head: ["Qué", "Escrito", "Se transmite"],
        rows: [
          ["Distintivo", "CCA 238", "AIR CHINA two three eight"],
          ["Nivel de vuelo", "FL 180 / FL 200", "flight level one eight zero / flight level two zero zero"],
          ["Rumbo", "100° / 080°", "heading one zero zero / heading zero eight zero"],
          ["Viento", "200° 25 kt", "wind two zero zero degrees two five knots"],
          ["Viento con ráfagas", "160° 18 kt ráf. 30", "wind one six zero degrees one eight knots, gusting three zero knots"],
          ["Código SSR", "2400 / 4203", "squawk two four zero zero / squawk four two zero three"],
          ["Pista", "27 / 30", "runway two seven / runway three zero"],
          ["QNH", "1010 / 1000", "QNH one zero one zero / QNH one zero zero zero"],
        ],
      },
      {
        kind: "p",
        text: "(Las palabras en inglés de la tercera columna son la traducción de los ejemplos en español del Doc 9432 2.4.2; la palabra «gusting» va en el aviso «Verificar».)",
      },
      {
        kind: "p",
        text: "**Excepción: centenas y millares enteros** (Doc 9432, 2.4.3). En **altitud, altura de nubes, visibilidad y RVR**, si el número está hecho de centenas o millares enteros, se dicen los dígitos seguidos de HUNDRED o THOUSAND. Si combina millares y centenas enteros, primero los millares con THOUSAND y luego la centena con HUNDRED.",
      },
      {
        kind: "table",
        head: ["Qué", "Escrito", "Se transmite"],
        rows: [
          ["Altitud", "800 ft", "eight hundred"],
          ["Altitud", "3 400 ft", "three thousand four hundred"],
          ["Altitud", "12 000 ft", "one two thousand"],
          ["Altura de nubes", "2 200 ft", "two thousand two hundred"],
          ["Visibilidad", "1 000 / 700", "visibility one thousand / visibility seven hundred"],
          ["RVR", "600 / 1 700", "RVR six hundred / RVR one thousand seven hundred"],
        ],
      },
      { kind: "p", text: "Fíjese en **12 000: «one two thousand»**, no «twelve thousand»." },
      {
        kind: "p",
        text: "**Niveles de vuelo y altitudes no se mezclan.** Si la posición vertical se refiere a 1013,2 hPa, las cifras van precedidas de FLIGHT LEVEL; si se refiere a QNH o QFE, van seguidas de FEET o METRES (Doc 4444, 4.5.7.5.1, Nota).",
      },
      { kind: "p", text: "**Frecuencias** (Doc 9432, 2.4.4 y 2.4.5):" },
      {
        kind: "list",
        items: [
          "Se dicen dígito por dígito, con DECIMAL en la coma.",
          "**Seis dígitos** donde hay canales de 8,33 kHz, **excepto** si el quinto y el sexto son ambos cero: entonces solo cuatro. 118.000 → «one one eight decimal zero»; 118.005 → «one one eight decimal zero zero five»; 118.025 → «one one eight decimal zero two five»; 118.100 → «one one eight decimal one».",
          "**Cinco dígitos** donde todos los canales están separados 25 kHz o más y la autoridad no exige seis, con la misma excepción: 118.025 → «one one eight decimal zero two»; 118.075 → «one one eight decimal zero seven»; 118.050 → «one one eight decimal zero five».",
          "Precaución: con radios de 25 kHz solo se pueden seleccionar cinco dígitos; con radios de 8,33 kHz, al recibir cinco dígitos, el quinto y sexto seleccionados deben ser los del canal de 25 kHz (notas de 2.4.4 y 2.4.5).",
        ],
      },
      {
        kind: "p",
        text: "**Hora** (Doc 9432, 2.5.1). Normalmente bastan los minutos, dígito por dígito; si hay riesgo de confusión, se incluye la hora. 0920 → «two zero» o «zero nine two zero»; 1643 → «four three» o «one six four three». La dependencia ATS da la verificación de hora redondeada al medio minuto más próximo (2.5.2).",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-05-01.svg",
        alt: "Guía ampliable de pronunciación de los diez dígitos, distinción entre cifras dígito por dígito y millares, y tres pasos de comprobación tras una autorización.",
        ancho: 1080,
        alto: 1920,
        pie: "La lámina es una referencia de pronunciación, no un ejercicio de colacionar solo el QNH. En una autorización, escuche todos los elementos modificados; colacione lo exigido, atienda la respuesta del controlador y coteje selectores y trayectoria en cabina. Amplíe para leer las formas del Doc 9432, §§2.4.1–2.4.3. «RVR» significa alcance visual en pista (Runway Visual Range).",
      },
      { kind: "sub", text: "Una autorización se procesa como conjunto" },
      {
        kind: "p",
        text: "**Piense en una llegada, no en una ficha de vocabulario.** Aproximación puede cambiar el límite vertical, el rumbo o la velocidad y, además, transmitir el reglaje QNH o información sobre la pista prevista. El piloto que comunica escucha primero el distintivo y la instrucción entera; si una parte se superpone con otra transmisión, solicita repetición de esa parte. El piloto que vuela conserva la trayectoria mientras ambos identifican qué cambió respecto de la autorización anterior. La colación de nivel o altitud, rumbo, velocidad, pista y reglaje se hace según corresponda al mensaje recibido; no se extrae el QNH y se repite como si eso, por sí solo, demostrara comprensión de la autorización.",
      },
      {
        kind: "p",
        text: "**El número se verifica en dos lugares: en la radio y en el avión.** Al pronunciar la colación, la tripulación distingue «FLIGHT LEVEL» de una altitud en pies, dice las cifras con la agrupación correcta y permite que el controlador detecte una discrepancia. Después confirma que el selector de altitud, rumbo, velocidad o radio que corresponda coincide con lo autorizado y que el modo de guiado hará lo esperado. El reparto exacto de tareas depende de los procedimientos del operador. Un «four thousand feet» correcto, mientras queda seleccionado otro límite vertical, no es una buena comunicación operacional. Tampoco lo es seleccionar el valor que uno esperaba oír antes de confirmar la instrucción.",
      },
      {
        kind: "p",
        text: "**Si la nueva instrucción parece incompatible con una restricción, una carta o el rendimiento disponible, no se resuelve adivinando.** Se solicita aclaración, se declara que no se puede cumplir cuando corresponda y se mantiene explícita la última autorización comprendida. En entrevista o simulador, esa secuencia —escucha, colación, hearback, configuración y cotejo cruzado— muestra más competencia que recitar «QNH one zero one two» sin contexto. Los microejercicios numéricos de abajo sirven para automatizar la pronunciación; no sustituyen el manejo completo de una autorización.",
      },
      { kind: "sub", text: "Fraseología OACI" },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Nivel de vuelo",
            codigo: tx("ATC:   AVIATORY 452, CLIMB TO FL 350.", "PILOT: CLIMBING TO FL 350, AVIATORY 452."),
            texto: "**Se dice:** «flight level three five zero» (TRI FA-IF SI-RO).",
          },
          {
            rotulo: "Altitud con QNH",
            codigo: tx(
              "ATC:   AVIATORY 452, DESCEND TO 4 000 FEET, QNH 1005.",
              "PILOT: DESCENDING TO 4 000 FEET, QNH 1005, AVIATORY 452.",
            ),
            texto:
              "**Se dice:** «four thousand feet, QNH one zero zero five». Altitud en millares enteros (2.4.3); QNH dígito por dígito (2.4.2). Modelo del Doc 9432, 7.3.1.",
          },
          {
            rotulo: "Rumbo",
            codigo: tx("ATC:   AVIATORY 452, TURN LEFT HEADING 050.", "PILOT: LEFT HEADING 050, AVIATORY 452."),
            texto: "**Se dice:** «heading zero five zero» (SI-RO FA-IF SI-RO). Modelo del Doc 9432, 6.3.1.",
          },
          {
            rotulo: "Código SSR",
            codigo: tx("ATC:   AVIATORY 452, SQUAWK 6402.", "PILOT: 6402, AVIATORY 452."),
            texto:
              "**Se dice:** «six four zero two». Modelo del Doc 9432, 2.8.3.7. Los códigos SSR se colacionan siempre (2.8.3.5 c).",
          },
          {
            rotulo: "Frecuencia de 8,33 kHz",
            codigo: tx("ATC:   AVIATORY 452, CONTACT BOGOTA CONTROL 128.905.", "PILOT: 128.905, AVIATORY 452."),
            texto:
              "**Se dice:** «one two eight decimal nine zero five» (seis dígitos: el quinto y el sexto no son ambos cero). Frecuencia ficticia.",
            etiqueta: "«DECIMAL»: " + POR_VERIFICAR,
          },
          {
            rotulo: "Frecuencia con cinco dígitos (espacio de 25 kHz)",
            codigo: tx("ATC:   AVIATORY 452, CONTACT DEPARTURE 121.75.", "PILOT: 121.75, AVIATORY 452."),
            texto:
              "**Se dice:** «one two one decimal seven five». El canal es 121.750; en espacio de 25 kHz se dicen cinco dígitos (2.4.5).",
            etiqueta: "«DECIMAL»: " + POR_VERIFICAR,
          },
          {
            rotulo: "Pista, viento y QNH en el rodaje",
            codigo: tx(
              "ATC:   AVIATORY 452, RUNWAY 06, WIND 080 DEGREES 10 KNOTS, QNH 1012, TAXI TO HOLDING POINT RUNWAY 06 VIA TAXIWAY ALFA.",
              "PILOT: RUNWAY 06, QNH 1012, HOLDING POINT RUNWAY 06 VIA ALFA, AVIATORY 452.",
            ),
            texto:
              "**Se dice:** «runway zero six, wind zero eight zero degrees one zero knots, QNH one zero one two». Modelo del Doc 9432, 4.4.2. El piloto colaciona pista y QNH (2.8.3.5 c); el viento no está en la lista de lo que siempre se colaciona.",
          },
          {
            rotulo: "Hora",
            codigo: tx("PILOT: AVIATORY 452, REQUEST TIME CHECK.", "ATC:   AVIATORY 452, TIME 0611."),
            texto:
              "**Se dice:** «time zero six one one» (o «one one» si no hay riesgo de confusión). Doc 9432, 2.5.2.",
          },
          {
            rotulo: "Visibilidad y RVR",
            codigo: tx("ATC:   AVIATORY 452, RVR 600 METRES."),
            texto:
              "**Se dice:** «RVR six hundred metres» (2.4.3). Si el valor no es de centenas enteras, se aplica la regla general dígito por dígito: RVR 550 → «five five zero» (2.4.2; el Doc 9432 4.2.1 trae el ejemplo «RVR 550 METRES» escrito en cifras).",
          },
          {
            rotulo: "Ascenso con condición y velocidad vertical",
            codigo: tx(
              "ATC:   AVIATORY 452, CLIMB TO FL 240, EXPEDITE UNTIL PASSING FL 180.",
              "PILOT: CLIMBING TO FL 240, EXPEDITING UNTIL PASSING FL 180, AVIATORY 452.",
            ),
            texto:
              "**Se dice:** «flight level two four zero … flight level one eight zero». Dos niveles en la misma instrucción: el riesgo es poner el segundo en el selector de altitud. Doc 9432, 3.3.3.3.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "Esta lección sale de la edición en español del Doc 9432. Falta confirmar en el **Anexo 10 Vol. II, cap. 5 (transmisión de números)** y en la **edición inglesa del Doc 9432, 2.4.1**, las grafías inglesas TREE, FIFE, NINER (y ZE-RO, WUN, TOO, FOW-er, SIX, SEV-en, AIT, DAY-SEE-MAL, HUN-dred, TOU-SAND). La palabra «GUSTING» para las ráfagas (la edición en español solo dice «ráfagas»): **Doc 9432 edición inglesa, 2.4.2, y Doc 4444 vigente, cap. 12**. La palabra «DECIMAL» en frecuencias (la edición en español da «COMA» en los ejemplos de 2.4.4 y «Decimal DE-si-mal» en la tabla de 2.4.1): **Anexo 10 Vol. II, cap. 5**. Y si la 5.ª edición o una enmienda del Doc 9432 o el Anexo 10 vigente cambiaron alguna de estas reglas de agrupación.",
      },
      {
        kind: "enLaOperacion",
        momento: "En la línea",
        texto:
          "Los números son el corazón de la colación: nivel, rumbo, velocidad, pista, QNH, código SSR y frecuencia. En la cabina, el piloto que colaciona habla el número y el otro lo verifica contra lo que quedó seleccionado (selector de altitud, rumbo, radio, transponder). Un número bien dicho y mal seleccionado sigue siendo un error.\n\nTres trampas típicas en la región:",
        pasos: [
          "**QNH 1013 frente a 1003** (Doc 9432, 2.8.3.9 usa ese mismo ejemplo).",
          "**FL 100 y 10 000 pies** cerca del nivel de transición: uno va con FLIGHT LEVEL y dígitos, el otro con THOUSAND y FEET.",
          "**Frecuencias de cinco y seis dígitos** entre espacios con y sin canales de 8,33 kHz.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error frecuente",
        text: "Los errores que más se repiten con lo de esta lección:",
      },
      {
        kind: "list",
        items: [
          "**Decir los números en español** o mezclar idiomas en la misma transmisión.",
          "**«Twelve thousand», «one hundred eighty»**: agrupar donde la regla pide dígitos (niveles, rumbos, QNH) o decir mal los millares («one two thousand»).",
          "**Omitir FLIGHT LEVEL o FEET**: «descend one zero zero» no dice si es nivel o altitud.",
          "**No hacer pausa antes y después del número** (Doc 9432, 2.2.1 f).",
          "**Colacionar la frecuencia sin el sexto dígito** en espacio de 8,33 kHz.",
          "**Confundir «to» y «two»** en instrucciones de nivel (Doc 9835, 3.3.7 a).",
        ],
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Pronunciación del Doc 9432 2.4.1: TRI, FA-IF, NAI-na, FO-ar, SI-RO.",
          "Regla general: dígito por dígito (FL, rumbo, pista, SSR, QNH, viento, frecuencia, hora).",
          "Excepción: HUNDRED y THOUSAND solo en altitud, nubes, visibilidad y RVR con centenas o millares enteros.",
          "FLIGHT LEVEL antes de la cifra; FEET o METRES después.",
          "Frecuencias: seis dígitos en 8,33 kHz, cinco en 25 kHz, cuatro si terminan en dos ceros.",
          "La hora: minutos; hora completa si hay riesgo de confusión.",
        ],
      },
      { kind: "sub", text: "Ejercicios" },
      {
        kind: "p",
        text: "**A. ¿Cómo se transmite?** (en inglés, con las palabras de la regla). Dígalo antes de abrir la solución.",
      },
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
            codigo: tx("ATC:   AVIATORY 452, DESCEND TO FL 120.", "PILOT: DESCENDING TO 12 000 FEET, AVIATORY 452."),
            texto: "¿Qué está mal en la colación?",
            interpretacion: {
              texto:
                "Nivel de vuelo colacionado como altitud: son referencias de presión distintas. Correcto: «DESCENDING TO FL 120, AVIATORY 452.»",
            },
          },
          {
            rotulo: "Frecuencia",
            codigo: tx("ATC:   AVIATORY 452, CONTACT BOGOTA CONTROL 128.905.", "PILOT: 128.9, AVIATORY 452."),
            texto: "¿Qué está mal en la colación?",
            interpretacion: {
              texto: "Faltan dígitos: en espacio de 8,33 kHz se dicen seis. Correcto: «128.905, AVIATORY 452.»",
            },
          },
          {
            rotulo: "Código SSR",
            codigo: tx("ATC:   AVIATORY 452, SQUAWK 5501.", "PILOT: ROGER, AVIATORY 452."),
            texto: "¿Qué está mal en la colación?",
            interpretacion: {
              texto:
                "ROGER no es colación. El código SSR se colaciona siempre (Doc 9432, 2.8.3.5 c) y ROGER no sirve donde se exige colación (nota de ROGER en 2.6). Correcto: «5501, AVIATORY 452.»",
            },
          },
        ],
      },
      fuentes(
        "Doc 9432 (4.ª ed.) 2.2.1 f), 2.4.1 (tabla y nota de énfasis), 2.4.2, 2.4.3, 2.4.4 y 2.4.5 (con sus notas), 2.5.1, 2.5.2, 2.6 (ROGER), 2.8.3.5 c), 2.8.3.7, 2.8.3.9, 3.3.3.3, 4.2.1, 4.4.2, 6.3.1, 7.3.1; Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1, Nota; Doc 9835 (2.ª ed.) 3.3.7 a).",
        [
          "Grafías inglesas TREE, FIFE, NINER (y ZE-RO, WUN, TOO, FOW-er, SIX, SEV-en, AIT, DAY-SEE-MAL, HUN-dred, TOU-SAND) contra Anexo 10 Vol. II cap. 5 (transmisión de números) y Doc 9432 edición inglesa 2.4.1 (no cargados).",
          "La palabra inglesa para ráfagas en el viento («GUSTING») contra Doc 9432 edición inglesa 2.4.2 y Doc 4444 vigente cap. 12 (no cargados); la edición en español solo dice «ráfagas».",
          "La palabra inglesa «DECIMAL» en frecuencias (la edición en español da «COMA» en los ejemplos de 2.4.4 y «Decimal DE-si-mal» en la tabla de 2.4.1) contra Anexo 10 Vol. II cap. 5 (no cargado).",
          "Si la 5.ª edición o una enmienda del Doc 9432 o el Anexo 10 vigente cambiaron alguna de estas reglas de agrupación (no cargado).",
        ],
      ),
    ],
  },
  // ── 06 ──────────────────────────────────────────────────────────────────
  {
    n: 6,
    title: "Distintivos de llamada",
    kicker: "Matrículas, designadores y distintivos parecidos",
    minutes: 13,
    blocks: [
      {
        kind: "callout",
        tone: "info",
        title: "Caso documentado y práctica, sin mezclarlos",
        text: "El episodio de TWA 843, TWA 834 y Pan Am 537 que aparece abajo procede de las recomendaciones A-89-83 a A-89-90 de la Junta Nacional de Seguridad del Transporte de Estados Unidos (NTSB, National Transportation Safety Board). La lámina y el relato resumen hechos; no son una transcripción de radio. AIR CHINA 238 y FASTAIR 345 son ejemplos impresos en el Manual de Radiotelefonía OACI, Doc 9432; FASTAIR es un designador didáctico del manual, no una aerolínea ni una ruta operativa. Los intercambios de práctica marcados como simulados enseñan una decisión, no representan un vuelo o una autorización vigente.",
      },
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "El distintivo de llamada (call sign) identifica a qué aeronave se dirige una transmisión y cuál responde. No basta con reconocer la cifra que uno espera oír: en una frecuencia compartida, dos vuelos pueden tener números casi iguales, una sílaba puede perderse por interferencia y el controlador también puede equivocarse al decir el indicativo. La tripulación debe escuchar la identificación completa antes de actuar, leer de vuelta el contenido que corresponde con su propio distintivo y dar tiempo al controlador para detectar una respuesta del avión equivocado. El riesgo no es lingüístico en abstracto: una autorización de viraje, ascenso, descenso o ingreso a pista ejecutada por otra aeronave cambia la separación del tránsito.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "**Tres tipos de distintivo de aeronave** (Doc 9432, 2.7.2.1):" },
      {
        kind: "table",
        head: ["Tipo", "Qué es", "Ejemplo", "Abreviado (2.7.2.2)"],
        rows: [
          [
            "a)",
            "Los caracteres de la matrícula (puede ir precedido del fabricante o modelo)",
            "G-ABCD o CESSNA G-ABCD",
            "El primero y al menos los dos últimos: G-CD o CESSNA CD",
          ],
          [
            "b)",
            "Designador telefónico del explotador + los cuatro últimos caracteres de la matrícula",
            "FASTAIR DCAB (ejemplo didáctico)",
            "Designador + al menos los dos últimos: FASTAIR AB",
          ],
          ["c)", "Designador telefónico del explotador + identificación del vuelo", "AIR CHINA 238 (ejemplo del Doc 9432)", "**No se abrevia**"],
        ],
      },
      {
        kind: "p",
        text: "Los vuelos de aerolínea casi siempre usan el **tipo c)**. Por eso, en la línea, su distintivo **no se abrevia nunca**.",
      },
      { kind: "p", text: "**Términos que conviene distinguir:**" },
      {
        kind: "kv",
        items: [
          {
            k: "Designador telefónico",
            v: "La palabra autorizada para nombrar al explotador por radio. El Doc 9432 muestra AIR CHINA 238 frente a CCA238, su forma en el plan de vuelo. FASTAIR 345 es otro ejemplo del manual, expresamente didáctico.",
          },
          {
            k: "Designador de la empresa",
            v: "El código de tres letras que va en el plan de vuelo (en el ejemplo del Doc 9432, «CCA»). No se dice en la radio.",
          },
          {
            k: "Número de vuelo",
            v: "La identificación del vuelo que sigue al designador. Se transmite dígito por dígito (Doc 9432, 2.4.2).",
          },
          { k: "Matrícula", v: "Las marcas de nacionalidad y matrícula de la aeronave." },
        ],
      },
      { kind: "p", text: "**Reglas de uso:**" },
      {
        kind: "list",
        items: [
          "**Primer contacto: distintivos completos**, el de la estación y el propio (Doc 9432, 2.8.1.1).",
          "**Abreviar solo después de que la estación lo haga primero** (2.7.2.2.1), y solo si no hay riesgo de confusión (2.7.2.2). El tipo c) no se abrevia.",
          "**No cambiar el tipo de distintivo en vuelo**, salvo que el ATC lo indique por riesgo de confusión con distintivos similares (2.7.2.3).",
          "**HEAVY en el primer contacto**: las aeronaves de estela turbulenta pesada dicen HEAVY justo después del distintivo en el primer contacto con cada dependencia ATS (Doc 9432, 2.7.2.4; Doc 4444, 4.9.2). En el Doc 4444 cargado, la categoría pesada es de 136 000 kg o más de masa máxima certificada de despegue (4.9.1.1).",
          "**La colación termina con el distintivo** (Doc 9432, 2.8.3.7). Así el controlador sabe quién colacionó.",
        ],
      },
      {
        kind: "p",
        text: "**Distintivos similares (SIMILAR CALL SIGNS).** El 9 de agosto de 1987, TWA 843 y TWA 834 llegaron a la misma área de control de Nueva York con distintivos fácilmente confundibles. El controlador pretendía dar un viraje a TWA 843, pero dijo TWA 834; la tripulación de TWA 834 ejecutó el viraje. TWA 843 continuó recto y se perdió la separación estándar con Pan Am 537. Minutos después, el mismo controlador confundió Clipper 568 y Clipper 558, sin pérdida de separación en ese segundo episodio. Son hechos del informe del NTSB, no un diálogo reconstruido. El caso muestra que la colación con distintivo completo permite detectar algunas equivocaciones, pero **no corrige por sí sola que ATC haya dicho el indicativo erróneo y ese avión haya obedecido**. La defensa exige atención de cabina al contexto y a la compatibilidad de la instrucción con la propia trayectoria; ante duda, confirmar antes de actuar. El tema se amplía en el capítulo 56.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-06-01.svg",
        alt: "Lámina ampliable: AIR CHINA 238 muestra las partes del distintivo; debajo, secuencia factual de la confusión entre TWA 843 y TWA 834 descrita por el NTSB.",
        ancho: 1080,
        alto: 1560,
        pie: "Arriba: el designador radiotelefónico se dice por radio; CCA238 es la identificación del plan de vuelo del ejemplo del Doc 9432, no la frase que pronuncia la tripulación. Abajo: hechos del informe NTSB A-89-83 a A-89-90, pp. 1–2, sin diálogo inventado. Amplíe para seguir a qué avión iba dirigido el viraje, cuál lo ejecutó y por qué la tripulación debe confirmar ante una duda de identidad.",
      },
      { kind: "sub", text: "Qué comprueba una tripulación de aerolínea" },
      {
        kind: "p",
        text: "**Antes de transmitir**, quien lleva la radio verifica que el indicativo usado coincide con la identificación de vuelo prevista para ese tramo y escucha la frecuencia antes de ocuparla. Al hacer contacto inicial dice completo el indicativo de la estación y el propio. Si otro vuelo con cifras parecidas está en la frecuencia, ambos pilotos mantienen esa diferencia en mente: se escucha la palabra del explotador y todas las cifras, no solo la terminación. La comunicación de control debe evaluarse contra la fase del vuelo, el nivel autorizado y la situación de tránsito. Esa evaluación no autoriza a ignorar una instrucción válida porque sorprenda, pero sí obliga a pedir aclaración cuando la identidad o el contenido no son inequívocos.",
      },
      {
        kind: "p",
        text: "**Al recibir una autorización**, el piloto que comunica no empieza a mover selectores por haber oído un número familiar. Espera el mensaje entero, identifica el destinatario, separa los elementos que cambian la trayectoria y hace la colación con su indicativo completo al final. El piloto que vuela conserva la trayectoria autorizada mientras se resuelve una incertidumbre, según los procedimientos de la compañía. Si la respuesta de ATC corrige el indicativo o el contenido, la tripulación actualiza la autorización y coteja los selectores. Si la frecuencia se bloqueó o se cortó una sílaba crítica, la acción segura es confirmar la autorización para el propio vuelo; el manual de la FAA propone expresamente «VERIFY CLEARANCE FOR [indicativo completo]» como defensa ante duda de identidad en su espacio aéreo, no como sustituto universal de la fraseología OACI.",
      },
      {
        kind: "p",
        text: "**Después de la colación**, el controlador debe escuchar qué aeronave respondió y corregir discrepancias. La tripulación, por su parte, escucha el hearback; no trata el silencio como garantía de que se leyó bien. En el caso de 1987, el error nació también en la emisión del controlador: pronunció TWA 834 para una instrucción pensada para TWA 843. Por eso la barrera no puede reducirse a «colacionar bien». La gestión de distintivos similares empieza además antes del vuelo: EUROCONTROL mantiene un servicio para detectar y reducir coincidencias de indicativos en los horarios de las aerolíneas, pero en la frecuencia cada autorización sigue exigiendo atención individual.",
      },
      { kind: "sub", text: "Fraseología OACI" },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Primer contacto con HEAVY: ejemplo del Doc 9432",
            codigo: tx(
              "PILOT: STEPHENVILLE TOWER, FASTAIR 345 HEAVY.",
              "ATC:   FASTAIR 345, REPORT OUTER MARKER.",
              "PILOT: WILCO, FASTAIR 345.",
            ),
            texto:
              "**Significado:** la categoría HEAVY acompaña el primer contacto con la dependencia. El ejemplo de STEPHENVILLE y FASTAIR está impreso en el Doc 9432, cap. 7; es una escena normativa didáctica, no un aeropuerto o vuelo operativo que deba buscarse en una carta vigente. En esta lección importa que el indicativo sea íntegro y que el controlador sepa qué aeronave responde.",
          },
          {
            rotulo: "Distintivo tipo a) abreviado por la estación · simulación",
            codigo: tx(
              "PILOT: TOWER, GOLF ALFA BRAVO CHARLIE DELTA.",
              "ATC:   GOLF CHARLIE DELTA, TOWER.",
              "PILOT: GOLF CHARLIE DELTA, …",
            ),
            texto:
              "**Significado:** la estación abrevió primero; desde entonces la aeronave puede abreviar si no existe riesgo de confusión (Doc 9432, 2.7.2.2 a) y 2.7.2.2.1). Con un distintivo tipo c) de aerolínea esto no aplica. «TOWER» reemplaza el nombre de una dependencia concreta para no fingir una autorización local.",
          },
          {
            rotulo: "Llamada con el distintivo incompleto · simulación",
            codigo: tx(
              "PILOT: GROUND, 345, REQUEST PUSH-BACK.",
              "ATC:   STATION CALLING GROUND, SAY AGAIN YOUR CALL SIGN.",
              "PILOT: GROUND, FASTAIR 345, REQUEST PUSH-BACK.",
            ),
            texto: "**Significado:** «345» solo no identifica a nadie. El intercambio es una simulación de la corrección, no una transcripción del Doc 9432; la regla de iniciar con identificaciones completas está en 2.8.1.1 y la petición de repetir un indicativo poco claro, en 2.8.1.5.",
          },
        ],
      },
      {
        kind: "escenario",
        titulo: "Distintivo similar: la colación revela quién contestó · simulación",
        situacion:
          "En una frecuencia de práctica están FASTAIR 345 y FASTAIR 354. El controlador transmite: «FASTAIR 354, CLIMB TO FL 350.» El piloto de FASTAIR 345, por error, colaciona: «CLIMBING TO FL 350, FASTAIR 345.» No son vuelos reales ni una autorización histórica.",
        preguntas: [
          {
            q: "¿Qué hace el controlador y qué le permitió detectar el error?",
            a: "ATC puede detener la ejecución y aclarar que la instrucción era para FASTAIR 354; la tripulación de FASTAIR 345 conserva el nivel que tenía autorizado y lo confirma. El indicativo completo al final de la colación permite identificar quién respondió (Doc 9432, 2.8.3.7–2.8.3.8). La cifra del nivel anterior se omite deliberadamente: no se ha establecido una autorización previa para estos vuelos simulados. **La limitación:** si ATC pronuncia de entrada el distintivo incorrecto, como ocurrió en el caso TWA de 1987, una colación perfecta de ese mismo indicativo no revela por sí sola la intención original del controlador.",
          },
        ],
        concepto: "Colacionar con el distintivo completo y contrastar la instrucción con el contexto de vuelo.",
      },
      {
        kind: "escenario",
        titulo: "Duda sobre a quién iba la instrucción · simulación",
        situacion:
          "Usted es FASTAIR 345 y en la misma frecuencia también está FASTAIR 354. Una transmisión se corta justo en las cifras del indicativo y solo alcanza a oír «FASTAIR …, TURN RIGHT HEADING…». Tampoco se recibe completo el rumbo.",
        preguntas: [
          {
            q: "¿Ejecuta el viraje?",
            a: "No se adivina el destinatario ni el rumbo. Se conserva la autorización vigente y se pide a ATC que confirme si la instrucción era para FASTAIR 345 y que repita el rumbo completo. «CONFIRM» figura en el Doc 9432, 2.6; la frase completa con esos números es lenguaje claro de un escenario educativo, no una cita del manual. Solo después de una aclaración inequívoca se modifica la trayectoria.",
          },
        ],
        concepto: "Si duda de a quién iba la instrucción: no ejecute, confirme.",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "Las frases «CHANGE YOUR CALL SIGN TO … [UNTIL FURTHER ADVISED]» y «REVERT TO FLIGHT PLAN CALL SIGN» se confirman en el **Doc 4444 vigente, cap. 12 (cambio de distintivo de llamada)**. Las categorías de estela turbulenta vigentes (la 16.ª ed. del Doc 4444 añadió la categoría SUPER y su palabra en radio): **Doc 4444 vigente, 4.9**. Designadores de tres letras y designadores telefónicos de explotadores: **Doc 8585**. Cómo pide cada Estado pronunciar el número de vuelo (dígito por dígito o agrupado): **Anexo 10 Vol. II, cap. 5, y el AIP del Estado** (en Colombia, AIP Colombia GEN 3.4).",
      },
      {
        kind: "enLaOperacion",
        momento: "En la línea",
        texto:
          "Las aerolíneas de la región suelen tener números de vuelo parecidos en la misma franja (idas y regresos, vuelos con numeración consecutiva). En la cabina, la práctica de muchas tripulaciones es que ambos pilotos escuchen el distintivo y, ante la mínima duda, confirmen antes de mover un selector. En la entrevista puede aparecer la pregunta «¿qué hace si cree que la instrucción era para otro avión?»: la respuesta es no ejecutar y confirmar con el distintivo completo.\n\nLa forma de decir el número de vuelo puede variar según el Estado y el operador (en algunos lugares se oyen agrupaciones como «four fifty-two»). El Doc 9432 cargado lo muestra dígito por dígito; siga lo que publique su AIP y su operador.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error frecuente",
        text: "Los errores que más se repiten con lo de esta lección:",
      },
      {
        kind: "list",
        items: [
          "**Recortar el distintivo** a unas cifras sueltas en una frecuencia con varios vuelos de la misma empresa.",
          "**Abreviar un distintivo tipo c)** o abreviar antes de que lo haga la estación.",
          "**Colacionar sin distintivo** o poniéndolo al principio y omitiéndolo al final: el controlador no sabe quién respondió.",
          "**Aceptar una autorización pensada para el otro** porque «era la que esperaba» (expectation bias, capítulo 55).",
          "**Olvidar HEAVY** en el primer contacto, o repetirlo en cada transmisión.",
        ],
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Tres tipos: matrícula; designador + cuatro últimas de la matrícula; designador + número de vuelo.",
          "El de aerolínea (designador + número de vuelo) no se abrevia.",
          "Primer contacto con distintivos completos; abreviar solo si la estación abrevió primero.",
          "HEAVY solo en el primer contacto con cada dependencia.",
          "Toda colación termina con el distintivo completo.",
          "Si duda de a quién iba la instrucción: no ejecute, confirme.",
        ],
      },
      fuentes(
        "Doc 9432 (4.ª ed.) 2.3.2, 2.4.2, 2.6 (CONFIRM), 2.7.2.1, 2.7.2.2, 2.7.2.2.1, 2.7.2.3, 2.7.2.4, 2.8.1.1, 2.8.1.5, 2.8.3.4, 2.8.3.7, 2.8.3.8 y ejemplo FASTAIR 345 HEAVY del cap. 7; Doc 4444 (15.ª ed., Enm. 4) 4.9.1.1, 4.9.2. Caso real: NTSB, recomendaciones A-89-83 a A-89-90, 11 de agosto de 1989, pp. 1–2, https://www.ntsb.gov/safety/safety-recs/recletters/A89_83_90.pdf. Defensa ante duda: FAA AIM 4-2-4, https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_2.html. Gestión preventiva de indicativos: EUROCONTROL Call Sign Similarity Service, https://www.eurocontrol.int/service/call-sign-similarity-service.",
        [
          "«CHANGE YOUR CALL SIGN TO … [UNTIL FURTHER ADVISED]» y «REVERT TO FLIGHT PLAN CALL SIGN» contra Doc 4444 vigente cap. 12 (cambio de distintivo de llamada) (no cargado).",
          "Categorías de estela turbulenta vigentes (la 16.ª ed. del Doc 4444 añadió la categoría SUPER y su palabra en radio) contra Doc 4444 vigente 4.9 (no cargado).",
          "Designadores de tres letras y designadores telefónicos de explotadores contra Doc 8585 (no cargado).",
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
    minutes: 9,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Es el orden en que se arma un mensaje para que el receptor sepa en el primer segundo si es para él, de quién viene y qué se le pide. Una forma práctica de recordarla son tres preguntas:",
      },
      {
        kind: "secuencia",
        numerada: true,
        items: [
          "**WHO ARE YOU CALLING?** ¿A quién llama? (la estación)",
          "**WHO ARE YOU?** ¿Quién es? (su distintivo)",
          "**WHAT DO YOU WANT or REPORT?** ¿Qué quiere o qué informa? (dónde está, lo que tiene y lo que pide)",
        ],
      },
      {
        kind: "p",
        text: "Las tres preguntas son una ayuda didáctica, no un texto OACI. Lo que sí es OACI es el orden: al iniciar la comunicación, la aeronave usa los distintivos completos de la estación y el propio (Doc 9432, 2.8.1.1), y en el ejemplo del manual la estación llamada va primero.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "**Quién va primero depende de quién llama:**" },
      {
        kind: "kv",
        items: [
          { k: "Piloto que llama", v: "Estación, distintivo propio, mensaje. `BOGOTA GROUND, AVIATORY 452, …`" },
          {
            k: "ATC que llama o instruye",
            v: "Distintivo de la aeronave, (estación, si hace falta), mensaje. `AVIATORY 452, CLIMB TO FL 240.`",
          },
          { k: "Colación", v: "El contenido primero y **el distintivo al final** (Doc 9432, 2.8.3.7)." },
        ],
      },
      { kind: "p", text: "**Llamada en uno o dos pasos.**" },
      {
        kind: "list",
        items: [
          "En dos pasos: el piloto llama con los distintivos y espera. Que la estación conteste con los distintivos ya es la invitación a seguir: el Doc 9432 omitió «GO AHEAD» por esa razón (nota al final de 2.6). Se usa cuando la estación puede no estar lista para anotar o en un primer contacto con una dependencia que necesita prepararse (por ejemplo, para presentar un plan de vuelo: Doc 9432, 3.5.1, «READY TO COPY»).",
          "En un paso: estación, distintivo y mensaje de corrido. Es lo normal en frecuencias VHF ocupadas y en mensajes cortos y esperados.",
        ],
      },
      { kind: "p", text: "**Qué va en el mensaje, según la situación** (ejemplos del Doc 9432):" },
      {
        kind: "list",
        items: [
          "**Puesta en marcha**: ubicación (puesto) y acuse del ATIS junto con la solicitud (Doc 9432, 4.2.2).",
          "**Rodaje**: con el acuse del ATIS, el controlador no necesita repetir la información de salida (Doc 9432, 4.4.3).",
          "**Contacto inicial con aproximación**: nivel, estimado a un punto e información ATIS (Doc 9432, 7.3.1).",
          "**Notificación de posición**: identificación, posición, hora, nivel, próxima posición y hora, punto significativo siguiente (Doc 9432, 3.4.1).",
        ],
      },
      {
        kind: "p",
        text: "Algunos Estados fijan en su AIP qué debe incluir el primer contacto al entrar o salir de su espacio aéreo (Doc 9432, Preámbulo). **La estructura de esta lección es educativa; lo que manda en cada aeropuerto es el procedimiento local publicado.**",
      },
      {
        kind: "hueco",
        rotulo: "CM-07-01 · Diagrama · 16:9 · 1600×900",
        descripcion:
          "Una transmisión escrita en una sola línea y dividida en bloques de colores del módulo: [BOGOTA GROUND] [AVIATORY 452] [STAND 12] [INFORMATION ALFA] [REQUEST START-UP AND PUSH-BACK]. Encima de cada bloque, la pregunta que responde: WHO ARE YOU CALLING? · WHO ARE YOU? · WHERE ARE YOU? · WHAT DO YOU HAVE? · WHAT DO YOU WANT? Debajo, en una segunda línea, la respuesta del ATC y la colación, con el distintivo resaltado al principio (ATC) y al final (colación). Rótulo al pie: «Ejemplo educativo, se ajusta al procedimiento local». Objetivo: que el piloto vea el orden de los bloques y dónde va el distintivo en cada tipo de transmisión.",
        alto: 320,
        ratio: "16 / 9",
      },
      { kind: "sub", text: "Fraseología OACI" },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "Puesta en marcha y retroceso",
            codigo: tx(
              "PILOT: BOGOTA GROUND, AVIATORY 452, STAND 12, INFORMATION ALFA, REQUEST START-UP AND PUSH-BACK.",
              "ATC:   AVIATORY 452, START-UP AND PUSH-BACK APPROVED, QNH 1019.",
              "PILOT: START-UP AND PUSH-BACK APPROVED, QNH 1019, AVIATORY 452.",
            ),
            texto:
              "**Significado:** a quién (Bogota Ground), quién (Aviatory 452), dónde (puesto 12), qué tiene (ATIS Alfa), qué quiere (puesta en marcha y retroceso). El Doc 9432 muestra la puesta en marcha («STAND 24 REQUEST START UP, INFORMATION BRAVO» / «START UP APPROVED QNH 1009», 4.2.2) y el retroceso («STAND 27 REQUEST PUSH-BACK» / «PUSH-BACK APPROVED», 4.3.1) como solicitudes separadas; en muchos aeropuertos se piden juntas y en otros el retroceso se pide a APRON. **Ejemplo educativo**: siga el procedimiento local.",
            etiqueta: "Forma combinada «START-UP AND PUSH-BACK»: " + POR_VERIFICAR,
          },
          {
            rotulo: "Puesta en marcha con demora",
            codigo: tx(
              "PILOT: BOGOTA GROUND, AVIATORY 452, STAND 12, REQUEST START-UP, INFORMATION ALFA.",
              "ATC:   AVIATORY 452, EXPECT START-UP AT 35, QNH 1019.",
              "PILOT: EXPECT START-UP AT 35, QNH 1019, AVIATORY 452.",
            ),
            texto:
              "**Significado:** todavía no está aprobada; prevea encender a los 35 (minutos de la hora). Doc 9432, 4.2.2. «EXPECT» no es una aprobación.",
          },
          {
            rotulo: "Llamada en dos pasos",
            codigo: tx(
              "PILOT: BOGOTA INFORMATION, AVIATORY 452.",
              "ATC:   AVIATORY 452, BOGOTA INFORMATION.",
              "PILOT: AVIATORY 452, … (mensaje)",
            ),
            texto:
              "**Significado:** el piloto llamó y esperó; la estación contestó con los distintivos, que es la invitación a seguir (Doc 9432, 2.6, nota sobre GO AHEAD; 2.8.1.1).",
            etiqueta: "Vigencia de «GO AHEAD»: " + POR_VERIFICAR,
          },
          {
            rotulo: "Primer contacto con aproximación",
            codigo: tx(
              "PILOT: BOGOTA APPROACH, AVIATORY 452 HEAVY, FL 80, ESTIMATING GIKOS 46, INFORMATION DELTA.",
              "ATC:   AVIATORY 452, DESCEND TO 4 000 FEET, QNH 1005, TRANSITION LEVEL 50, EXPECT ILS APPROACH RUNWAY 13R.",
              "PILOT: DESCENDING TO 4 000 FEET, QNH 1005, TRANSITION LEVEL 50, EXPECTING ILS APPROACH RUNWAY 13R, AVIATORY 452.",
            ),
            texto:
              "**Significado:** quién, a quién, nivel, estimado e información ATIS. Modelo del Doc 9432, 7.3.1.",
          },
          {
            rotulo: "Notificación de posición",
            codigo: tx(
              "PILOT: BOGOTA CONTROL, AVIATORY 452, GIKOS 47, FL 330, RUTAM 57, KOLOX NEXT.",
              "ATC:   AVIATORY 452, ROGER.",
            ),
            texto:
              "**Significado:** identificación, posición (GIKOS), hora (47), nivel (FL 330), próxima posición y hora (RUTAM a los 57), punto siguiente (KOLOX). Puntos ficticios. Doc 9432, 3.4.1.",
          },
          {
            rotulo: "Listo en el punto de espera",
            codigo: tx(
              "ATC:   AVIATORY 452, REPORT WHEN READY FOR DEPARTURE.",
              "PILOT: WILCO, AVIATORY 452.",
              "PILOT: AVIATORY 452, READY.",
            ),
            texto:
              "**Significado:** con torre ya en contacto, basta el distintivo y «READY». No se dice «ready for take-off» de forma que suene a autorización (Doc 9432, 4.5.3 y 2.8.3.3).",
          },
          {
            rotulo: "Colación que termina con el distintivo",
            codigo: tx("ATC:   AVIATORY 452, CROSS GIKOS FL 70.", "PILOT: CROSS GIKOS FL 70, AVIATORY 452."),
            texto: "**Significado:** contenido primero, distintivo al final (Doc 9432, 2.8.3.7, adaptado).",
          },
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "La forma combinada «REQUEST START-UP AND PUSH-BACK» / «START-UP AND PUSH-BACK APPROVED» se confirma en el **Doc 4444 vigente, cap. 12 (puesta en marcha y retroceso)** y en el **AIP del aeródromo (AD 2.20, reglamentos locales de tránsito)**; el Doc 9432 cargado las muestra por separado. La vigencia de «GO AHEAD» (el Doc 9432, 4.ª ed., nota en 2.6, dice que se omitió): **Anexo 10 Vol. II, cap. 5, y Doc 4444 vigente, cap. 12**. Los requisitos de primer contacto en Colombia: **AIP Colombia (ENR 1.1 / GEN 3.4)**.",
      },
      {
        kind: "enLaOperacion",
        momento: "En la preparación de salida",
        texto:
          "Antes de oprimir el PTT, el piloto que comunica arma el mensaje en la cabeza (o lo lee de lo que ya tiene anotado: puesto, ATIS, lo que va a pedir). En la preparación de salida muchas tripulaciones anotan el puesto, la letra del ATIS y el QNH antes de llamar a Delivery o a Ground, para que la primera llamada salga completa y sin pausas. Qué se anota y quién llama lo define el SOP del operador.\n\nLlamar con toda la información de una vez evita que el controlador tenga que preguntar «say position» o «confirm information». Cada pregunta evitada es tiempo de frecuencia para otros.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error frecuente",
        text: "Los errores que más se repiten con lo de esta lección:",
      },
      {
        kind: "list",
        items: [
          "**Empezar por el mensaje** y decir la estación y el distintivo al final: el controlador ya no sabe a quién estaba escuchando.",
          "**Omitir la letra del ATIS** o decir una que ya cambió.",
          "**Colacionar sin distintivo al final.**",
          "**Pedir cosas que no van con esa dependencia** (pedir rodaje a Delivery, pedir nivel a Ground).",
          "**Meter todo en una sola transmisión larga** cuando la estación no está lista para anotar: mejor en dos pasos.",
        ],
      },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Piloto que llama: estación, distintivo, mensaje.",
          "ATC: distintivo de la aeronave primero.",
          "Colación: contenido primero, distintivo al final.",
          "En el mensaje: dónde está, qué tiene (ATIS), qué quiere o qué informa.",
          "La respuesta de la estación con los distintivos es la invitación a hablar.",
          "El ejemplo es educativo: manda el procedimiento local publicado en el AIP.",
        ],
      },
      fuentes(
        "Doc 9432 (4.ª ed.) Preámbulo, 2.6 (nota sobre GO AHEAD), 2.8.1.1, 2.8.3.3, 2.8.3.7, 3.4.1, 3.5.1, 4.2.2, 4.3.1, 4.4.3, 4.5.3, 7.3.1.",
        [
          "La forma combinada «REQUEST START-UP AND PUSH-BACK» / «START-UP AND PUSH-BACK APPROVED» contra Doc 4444 vigente cap. 12 (puesta en marcha y retroceso) y el AIP del aeródromo (AD 2.20, reglamentos locales de tránsito) (no cargados); el Doc 9432 cargado las muestra por separado.",
          "La vigencia de «GO AHEAD» (el Doc 9432 4.ª ed., nota en 2.6, dice que se omitió) contra Anexo 10 Vol. II cap. 5 y Doc 4444 vigente cap. 12 (no cargados).",
          "Requisitos de primer contacto en Colombia contra AIP Colombia (ENR 1.1 / GEN 3.4) (no cargado).",
        ],
      ),
    ],
  },
]
