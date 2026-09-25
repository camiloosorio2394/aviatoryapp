/**
 * Nivel 6 · Data link y operación oceánica (lecciones 41 a 50, capítulos 41 a 50 de la especificación).
 *
 * Lo que no va por voz o no va por VHF: ATIS y VOLMET, CPDLC y DCL, ACARS,
 * ADS-C, HF y SELCAL, y cómo se combinan en la operación oceánica.
 *
 * Fuente: docs/comunicaciones/nivel-6.md, entero. Cada intercambio del
 * Markdown es un bloque `code` con su significado debajo (`ejemplo`); los
 * rótulos (VERIFICAR) y PLAIN LANGUAGE de cada ejemplo se conservan en su
 * título. Lo que el Markdown marca VERIFICAR sale en un callout «Verificar»
 * visible y, completo, en el detalle técnico de FUENTES. Los textos de
 * pantalla CPDLC son ilustrativos y van todos con VERIFICAR: el Doc 4444
 * cap. 14 y el Doc 10037 (GOLD) no están cargados. El formato de los bloques
 * y de los huecos está documentado al inicio de index.ts.
 */

import type { DocBlockData, DocScreen } from "@/lib/docBlocks"

/**
 * Un intercambio: el título en negrita, la transmisión literal (una línea por
 * turno de palabra) y el significado en español.
 */
function ejemplo(titulo: string, turnos: string[], significado: string): DocBlockData[] {
  return [
    { kind: "p", text: `**${titulo}**` },
    { kind: "code", text: turnos.join("\n") },
    { kind: "p", text: significado },
  ]
}

/** Un error frecuente: el nombre del error como título y la explicación. */
function error(titulo: string, text: string): DocBlockData {
  return { kind: "callout", tone: "warn", title: titulo, text }
}

/** El aviso visible de lo que no está en las fuentes cargadas. */
function verificar(text: string): DocBlockData {
  return { kind: "callout", tone: "verificar", title: "Verificar", text }
}

/** Cómo leer los ejemplos: va al empezar la fraseología de cada lección. */
const COMO_LEER: DocBlockData = {
  kind: "callout",
  tone: "info",
  title: "Cómo leer los ejemplos",
  text: "`AVIATORY 452`, «Oceanic Control», «Oceanic Radio», los puntos (GIKOS, ODRAK, PUVEL, TIMSA, BERUX) y las frecuencias HF son **ficticios**. Frase **sin etiqueta**: su estructura está en el Doc 9432 o el Doc 4444 cargados (el párrafo exacto va en Fuentes). **(VERIFICAR)**: no está en las fuentes cargadas. **PLAIN LANGUAGE**: lenguaje claro, no fraseología estandarizada. Los textos de pantalla CPDLC son **ilustrativos**.",
}

/** Las convenciones de los ejemplos de todo el nivel (notas de nivel-6.md). */
const CONVENCIONES: DocBlockData = {
  kind: "list",
  items: [
    "**VERIFICAR ANTES DE PUBLICAR.** Los mensajes CPDLC dependen del Doc 4444 cap. 14 y del Doc 10037 (GOLD), no cargados. No se publica hasta verificar cada línea VERIFICAR.",
    "Fuentes cargadas para este nivel: Doc 4444 PANS-ATM (15.ª ed., Enm. 4, 2012; **no es la edición vigente**, existe la 16.ª de 2016 con enmiendas), cap. 1 a 5; Doc 9432 Manual de radiotelefonía (4.ª ed., 2007), cap. 1 a 7.3; Doc 9835 (2.ª ed., 2010), cap. 1 a 6; presentación de la FAA (Dakar, 2017) sobre el GOLD. Toda numeración de párrafo citada es la de esas ediciones y hay que confirmarla en la vigente.",
    "No están cargados: Doc 4444 cap. 12 (fraseología), 13 (ADS-C), 14 (CPDLC), 15 (contingencias) ni el apéndice 5 (mensajes CPDLC); Doc 10037 (GOLD); Doc 9432 cap. 8 a 11 (control de área, control oceánico, meteorología, SELCAL); Anexo 3; Anexo 10 Vol. II; Anexo 11; NAT Doc 007; documentos regionales del Pacífico.",
    "Por eso este nivel no trae identificadores de mensaje CPDLC (UM/DM) y todo texto de pantalla CPDLC va marcado VERIFICAR.",
    "Distintivo de los ejemplos: `AVIATORY 452`. Las estaciones «Las Guindas» y «Santa Cleta» son las ficticias de la versión en español del Doc 9432. «Oceanic Control» y «Oceanic Radio» son estaciones **ficticias** para este curso. Los puntos GIKOS, ODRAK, PUVEL, TIMSA y BERUX son **ficticios**. Las frecuencias HF de los ejemplos son **ficticias**.",
    "Los formatos oceánicos (informe de posición, autorización oceánica, SELCAL, uso de HF y de CPDLC) **varían por región** (Atlántico Norte, Pacífico, Atlántico Sur, Caribe). Lo que aquí se muestra es la estructura OACI general; el formato de cada región está en su documentación (NAT Doc 007 para el Atlántico Norte, AIP de cada Estado, Doc 7030 procedimientos suplementarios regionales).",
  ],
}

export const NIVEL_6: DocScreen[] = [
  // ── 41 ──────────────────────────────────────────────────────────────────
  {
    n: 41,
    title: "ATIS",
    kicker: "La letra confirma recepción; la cabina verifica el contenido",
    minutes: 18,
    blocks: [
      {
        kind: "p",
        text: "El servicio automático de información terminal (ATIS, Automatic Terminal Information Service) entrega información terminal actualizada para salidas y llegadas, por radiodifusión de voz o por enlace de datos (D-ATIS, Data Link Automatic Terminal Information Service). Reduce repeticiones en la frecuencia, pero no reemplaza las autorizaciones del control de tránsito aéreo (ATC, Air Traffic Control). El identificador alfabético permite comunicar qué edición recibió la tripulación. Decir la letra no demuestra, por sí solo, que ambos pilotos hayan entendido una pista, un cambio de configuración o una limitación de longitud.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-41-01.svg",
        alt: "Secuencia de recepción, comprobación y comunicación de ATIS sin datos meteorológicos inventados.",
        ancho: 1600,
        alto: 900,
        pie: "Esquema basado en la definición de ATIS de OACI y la guía FAA AIM 4-1-13. Reconoce una emisión por su identificador y hora; compara el contenido operacional, y en el primer contacto comunica el identificador vigente. La decisión posterior depende de la autorización de ATC, no de la pista que anuncia el boletín.",
      },
      { kind: "sub", text: "Preparar la salida o la llegada" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Obtener la edición actual.** Voz y D-ATIS son dos vías de recepción; se comprueban identificador, hora y si el mensaje corresponde a salidas o llegadas cuando el aeropuerto las separa. La fuente y disponibilidad locales se consultan en la publicación aeronáutica vigente.",
          "**Extraer los elementos operacionales.** Revisar pista en uso, aproximación anunciada, viento, visibilidad o alcance visual cuando proceda, nubes, temperatura, reglaje altimétrico QNH, nivel de transición si se transmite y avisos que afecten la operación. No todos los mensajes tienen idéntico formato ni contenido en cada Estado.",
          "**Cruzar datos con la preparación.** La tripulación confronta el ATIS con cartas vigentes, avisos a los aviadores (NOTAM, Notice to Airmen), performance y la autorización recibida. Una pista distinta o una restricción de longitud puede obligar a recalcular y rebriefar, no solo a cambiar una casilla.",
          "**Avisar el identificador en el contacto inicial.** El piloto que monitorea (PM, pilot monitoring) transmite la letra que realmente recibió junto con la llamada y solicitud pertinentes. Si no hay recepción, lo informa y pide los datos actuales. No se rellena el vacío suponiendo que la edición anterior sigue vigente.",
          "**Revisar toda actualización.** Si el identificador cambia durante rodaje o descenso, se obtiene el nuevo mensaje y se identifica qué cambió. Una instrucción distinta de ATC se aclara; la pista del ATIS no es por sí misma una autorización para rodar, despegar o aterrizar.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-41-02.webp",
        alt: "Historieta de tres paneles: PM obtiene ATIS, tripulación comprueba cambios y PM informa a ATC.",
        ancho: 1600,
        alto: 900,
        pie: "Historieta didáctica, no un vuelo real: 1) PM obtiene el boletín por enlace de datos; 2) ambos pilotos contrastan la nueva información con la preparación; 3) PM comunica al control la edición recibida y aclara cualquier discrepancia. Las pantallas son deliberadamente ilegibles: no representan meteorología, pistas ni frecuencias reales.",
      },
      { kind: "sub", text: "Qué comunica la letra y qué no" },
      {
        kind: "table",
        head: ["Dato", "Lo que permite hacer", "Lo que no permite asumir"],
        rows: [
          ["Identificador ATIS", "Indicar a ATC qué emisión se recibió.", "Que ambos pilotos leyeron y comprendieron todas las restricciones."],
          ["Pista anunciada", "Preparar una opción y detectar discrepancias.", "Autorización de rodaje, alineación, despegue o aterrizaje."],
          ["QNH o información meteorológica", "Preparar altímetros y performance con verificación cruzada.", "Que nunca cambiará antes de la maniobra."],
          ["D-ATIS recibido", "Conservar texto para revisar y compartir en cabina.", "Que no sea necesario comunicar el identificador o atender una actualización."],
        ],
      },
      {
        kind: "p",
        text: "La FAA Aeronautical Information Manual, apartado 4-1-13, indica que en el contacto inicial se notifique la recepción mediante el código alfabético; ATC puede omitir elementos ya incluidos si continúan vigentes. Esa es una referencia estadounidense que ilustra la lógica, no una fraseología colombiana obligatoria. En cualquier caso, las instrucciones, altitudes, pista asignada y autorizaciones que entregue ATC se escuchan, colacionan y comprueban según los requisitos aplicables; no se sustituye la colación por decir la letra del ATIS.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Caso real: VA942 en Sídney",
        text: "La Australian Transport Safety Bureau investigó el vuelo Virgin Australia VA942, Brisbane–Sídney, del 19 de octubre de 2022. Se asignó una llegada a la pista 34L mientras el ATIS inicial y el actualizado indicaban operación en 16L/16R. La tripulación acusó recepción del ATIS vigente, pero la discrepancia de pista no quedó resuelta en la colación. El informe muestra por qué la letra recibida no sustituye comparar ATIS, autorización y plan de vuelo. Esta síntesis no es una transcripción radiofónica ni una instrucción para operar en Sídney.",
      },
      {
        kind: "escenario",
        titulo: "ATIS actualizado antes de iniciar descenso",
        situacion: "Ejercicio didáctico sin aeropuerto, pista ni valores inventados. La tripulación había preparado la llegada con una edición del ATIS. Antes del descenso se anuncia una nueva letra; PM recibe el texto actualizado y descubre que la pista anunciada difiere de la llegada previamente coordinada. Todavía no hay autorización revisada.",
        preguntas: [
          { q: "¿Basta con comunicar la nueva letra?", a: "No. Hay que revisar el contenido que cambió, reevaluar cartas, performance, configuración y briefing, y comparar la pista anunciada con la autorización vigente. La letra solo identifica la edición recibida." },
          { q: "¿Puede la tripulación reprogramar y empezar otra llegada por lo que dice ATIS?", a: "Puede preparar y evaluar una alternativa, pero no volarla como si estuviera autorizada. Se solicita aclaración a ATC y se confirma cualquier nueva autorización antes de cambiar la trayectoria." },
          { q: "¿Qué se dice si no se consigue recibir la nueva emisión?", a: "Se informa de manera clara que no se pudo recibir el ATIS actualizado y se solicitan la información y las instrucciones vigentes. No se comunica una letra que no se ha recibido ni se asume que el boletín anterior continúa válido." },
        ],
        concepto: "La edición correcta evita omisiones, pero la seguridad exige procesar el contenido y contrastarlo con la autorización.",
      },
      {
        kind: "enLaOperacion",
        momento: "Del briefing a la primera llamada",
        texto: "El procedimiento normalizado de la aerolínea (SOP, Standard Operating Procedure) reparte quién copia ATIS, quién compara la meteorología y quién recalcula performance. El piloto que vuela (PF, pilot flying) conserva la conciencia de la trayectoria; PM confirma la edición en la primera llamada y ambos detectan discrepancias antes de ejecutar. En Colombia, frecuencia, disponibilidad, configuración y publicaciones de cada aeródromo se consultan únicamente en Aerocivil/eAIP vigente; aquí no se fabrican boletines locales.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Letra correcta, contenido no procesado", text: "El caso VA942 muestra que acusar recibo no reemplaza cotejar la pista asignada con la información que la propia tripulación recibió." },
      { kind: "callout", tone: "warn", title: "Tratar ATIS como autorización", text: "Una pista en el boletín es información para planear; la autorización operacional llega de ATC." },
      { kind: "callout", tone: "warn", title: "Ignorar una edición nueva", text: "El cambio puede alterar QNH, meteorología, pista, aproximación o una limitación operacional. Se identifica el cambio antes de continuar." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "ATIS entrega información terminal por voz o por enlace de datos.",
          "El identificador comunica qué edición se recibió, no que todo se comprendió.",
          "La tripulación contrasta contenido, autorización y performance.",
          "Una pista anunciada no autoriza una maniobra.",
          "Si el mensaje cambia o no se recibe, se actualiza o se pide aclaración a ATC.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "OACI Anexo 11 · FAA AIM 4-1-13 · ATSB VA942 · Aerocivil eAIP",
        bloques: [
          { kind: "p", text: "OACI, EUR Doc 013, sexta edición, glosario con definiciones de ATIS, ATIS-voz y D-ATIS tomadas del Anexo 11: https://www.icao.int/EURNAT/EUR%20and%20NAT%20Documents/EUR%20Documents/EUR%20Documents/013%20-%20EUR%20Guidance%20Material%20on%20AWO%20at%20Aerodromes/EUR%20Doc%20013%2C%206th%20Edition%2C%20November%202023.pdf" },
          { kind: "p", text: "FAA, Aeronautical Information Manual 4-1-13, finalidad, actualización y comunicación del identificador ATIS en Estados Unidos: https://www.faa.gov/air_traffic/publications/ATpubs/AIM/aim0401.html" },
          { kind: "p", text: "Australian Transport Safety Bureau, investigación AO-2022-052 sobre VA942, cambio de ATIS y discrepancia de pista en la llegada a Sídney: https://www.atsb.gov.au/investigations/ao-2022-052" },
          { kind: "p", text: "Aerocivil, portal oficial AIP/eAIP para datos terminales, cartas y servicios colombianos vigentes: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "La historieta y el escenario son didácticos. El caso VA942 es real y resumido a partir del informe; no se recrean sus comunicaciones palabra por palabra." },
        ],
      },
    ],
  },
  // ── 42 ──────────────────────────────────────────────────────────────────
  {
    n: 42,
    title: "VOLMET",
    kicker: "Escuchar, identificar y usar meteorología en ruta",
    minutes: 16,
    blocks: [
      {
        kind: "p",
        text: "VOLMET designa información meteorológica para aeronaves en vuelo. Puede llegar por radiodifusión de voz o como D-VOLMET por enlace de datos. A diferencia del servicio automático de información terminal (ATIS, Automatic Terminal Information Service), que informa de un aeródromo terminal, VOLMET agrupa datos meteorológicos útiles para evaluar en vuelo destino, alternos y región. No es un diálogo con un controlador ni concede autorización para cambiar ruta, nivel o destino.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-42-01.svg",
        alt: "Comparación de VOLMET continuo, programado y por enlace de datos, con verificación de lugar y hora.",
        ancho: 1600,
        alto: 900,
        pie: "Esquema basado en OACI Anexo 3: la voz continua, normalmente en frecuencia muy alta (VHF, Very High Frequency), la voz programada, normalmente en frecuencia alta (HF, High Frequency), y D-VOLMET no siempre entregan el mismo conjunto de productos. El piloto identifica aeródromo, hora y validez antes de usar la información; cualquier modificación del vuelo se coordina con ATC.",
      },
      { kind: "sub", text: "Qué entra en la emisión" },
      {
        kind: "p",
        text: "El informe meteorológico rutinario de aeródromo (METAR, Meteorological Aerodrome Report) y el informe especial (SPECI, Special Aerodrome Meteorological Report) describen observaciones. El pronóstico de aeródromo (TAF, Terminal Aerodrome Forecast) apunta a un periodo futuro; SIGMET (Significant Meteorological Information) informa fenómenos significativos en ruta. No son intercambiables: un METAR de la hora de emisión no sustituye un TAF válido para la llegada ni una advertencia SIGMET. El contenido real depende del tipo de servicio y del acuerdo regional.",
      },
      {
        kind: "table",
        head: ["Vía", "Contenido general documentado", "Pregunta de la tripulación"],
        rows: [
          ["VOLMET continuo", "METAR y SPECI actuales, con pronósticos de tendencia cuando estén disponibles.", "¿El informe corresponde al aeródromo y hora que necesitamos?"],
          ["VOLMET programado", "METAR y SPECI; TAF y SIGMET cuando el acuerdo regional los incluya.", "¿Qué bloque horario y qué aeródromos cubre esta emisión?"],
          ["D-VOLMET", "Informes y pronósticos transmitidos por enlace de datos según el servicio disponible.", "¿La marca temporal y la validez del mensaje permiten tomar la decisión?"],
        ],
      },
      {
        kind: "p",
        text: "OACI Anexo 3 distingue expresamente emisiones continuas y programadas; esta distinción evita enseñar que todos los VOLMET siempre incluyen METAR, TAF y SIGMET. Las estaciones, horarios y frecuencias se publican por región y Estado. Este curso no inventa una frecuencia colombiana ni presume que un servicio exista para un aeródromo determinado. Si el mensaje no cubre la necesidad operacional, la tripulación consulta otra fuente autorizada o solicita información pertinente al servicio disponible.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-42-02.webp",
        alt: "Historieta de tres paneles: PM escucha VOLMET, anota el informe pertinente y ambos pilotos evalúan el vuelo.",
        ancho: 1600,
        alto: 900,
        pie: "Historieta didáctica, no un vuelo real: 1) el piloto que monitorea (PM, pilot monitoring) escucha la meteorología en un receptor adecuado mientras el piloto que vuela (PF, pilot flying) conserva la vigilancia del vuelo; 2) PM identifica el aeródromo, la hora y el producto recibido; 3) ambos evalúan destino y alternativa antes de solicitar, si hace falta, un cambio a ATC. Pantallas y papeles no representan datos o cartas válidos.",
      },
      { kind: "sub", text: "Secuencia de uso en una aerolínea" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Planificar la escucha.** Consultar en la publicación aplicable qué estación, horario, cobertura y vía están disponibles. La configuración de radios se coordina en cabina para no perder el canal de comunicaciones del control de tránsito aéreo (ATC, Air Traffic Control).",
          "**Identificar cada dato.** Al recibir una secuencia con varios aeródromos, anotar cuál corresponde al destino o alterno, tipo de producto, hora de observación o periodo de validez y cualquier información incompleta. Una cifra sin aeródromo ni hora puede llevar a una decisión equivocada.",
          "**Comparar con lo que ya se tenía.** Contrastarlo con el despacho meteorológico, avisos de fenómenos significativos y criterios del explotador. Un cambio relevante puede requerir revisar combustible, performance, alternos y la intención operacional, no solo transmitir que 'se recibió el tiempo'.",
          "**Gestionar la decisión por el canal correcto.** Escuchar VOLMET no requiere colación al emisor. Si se necesita desvío, cambio de ruta o prioridad, la tripulación lo solicita a los servicios de tránsito aéreo (ATS, Air Traffic Services) por la comunicación activa; no usa VOLMET como frecuencia de control.",
          "**Conservar conciencia de actualidad.** La hora de emisión y la validez importan. Si un reporte falta, el boletín puede incluir el último disponible con su hora; no se trata como observación nueva.",
        ],
      },
      {
        kind: "escenario",
        titulo: "El alterno no aparece en la emisión",
        situacion: "Ejercicio didáctico sin frecuencia, aeródromo o ruta inventados. En un tramo oceánico, PM escucha una emisión programada para actualizar el tiempo de destino y alternos. Uno de los alternos previstos no aparece en el bloque recibido y el METAR del destino sí está disponible. La comunicación ATC sigue activa por el canal previsto.",
        preguntas: [
          { q: "¿Puede anotarse para el alterno el reporte del destino?", a: "No. Cada producto se asocia a su aeródromo y hora. PM registra que falta el dato del alterno y busca otra fuente autorizada o solicita la información pertinente; no extrapola la observación del destino." },
          { q: "¿Debe responderse al emisor VOLMET para pedir aclaración?", a: "No. Una radiodifusión VOLMET se escucha; no es un interlocutor ATC. Para obtener otro dato se utiliza el servicio o canal apropiado publicado, sin comprometer la escucha del control." },
          { q: "Si el nuevo pronóstico cambia la viabilidad del destino, ¿qué sigue?", a: "PF y PM evalúan combustible y alternativas según el manual del explotador. Si deciden solicitar desvío o nueva ruta, comunican la intención al ATS y esperan una autorización o aplican la contingencia correspondiente; VOLMET no la concede." },
        ],
        concepto: "La utilidad de VOLMET depende de asociar correctamente producto, aeródromo, hora y decisión.",
      },
      {
        kind: "enLaOperacion",
        momento: "Actualización meteorológica lejos del terminal",
        texto: "En una operación de largo alcance se pueden combinar VOLMET, D-VOLMET y mensajes meteorológicos del explotador. La prioridad es que PF mantenga el vuelo y la vigilancia de comunicaciones mientras PM obtiene y analiza el dato; la distribución concreta la fija el procedimiento normalizado del operador (SOP, Standard Operating Procedure). No se supone que los mensajes del explotador, VOLMET y la fuente del ATC sean idénticos o simultáneos. Para Colombia, estaciones y datos publicados se verifican exclusivamente en Aerocivil/eAIP vigente.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Generalizar el contenido", text: "No todos los VOLMET transmiten TAF o SIGMET. Comprueba el tipo de emisión y el acuerdo regional antes de esperar un producto." },
      { kind: "callout", tone: "warn", title: "Copiar el aeródromo equivocado", text: "Varios reportes consecutivos pueden confundirse. Sin identificación y hora correctas, el dato puede ser peligroso para la evaluación." },
      { kind: "callout", tone: "warn", title: "Perder la comunicación ATC", text: "Escuchar meteorología no justifica dejar sin vigilancia el canal operativo asignado. Se coordina la distribución de atención y radios." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "VOLMET suministra meteorología a aeronaves en vuelo, no autorizaciones.",
          "Voz continua, voz programada y D-VOLMET pueden tener contenido distinto.",
          "Relaciona siempre aeródromo, tipo de producto, hora y validez.",
          "Evalúa destino y alternos; comunica a ATS cualquier solicitud operacional.",
          "Frecuencias, horarios y cobertura se consultan en la publicación aplicable.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "OACI Anexo 3 · guía OACI SAM de enlace de datos · Aerocivil eAIP",
        bloques: [
          { kind: "p", text: "OACI, Anexo 3, Meteorological Service for International Air Navigation, capítulo 11 y apéndice 10 de la versión consolidada disponible en su archivo oficial: diferencia entre VOLMET continuo, programado y D-VOLMET, productos y determinación regional: https://www.icao.int/Meetings/METDIV14/Documents/an03_cons_secured.pdf" },
          { kind: "p", text: "OACI SAM, Guidance on the Implementation of Air-Ground Data Link Applications, apartado 4.3, explicación de VOLMET y D-VOLMET: https://www.icao.int/SAM/eDocumentsrestore/Guideline%20Air%20Ground%20Datalink%20.pdf" },
          { kind: "p", text: "Aerocivil, portal oficial AIP/eAIP para servicios y frecuencias colombianos vigentes: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "Las fuentes OACI citadas explican la arquitectura general, no sustituyen la publicación regional actual de horarios, estaciones, frecuencias o cobertura. La historieta y el escenario son didácticos y no reproducen un vuelo real." },
        ],
      },
    ],
  },
  // ── 43 ──────────────────────────────────────────────────────────────────
  {
    n: 43,
    title: "CPDLC",
    kicker: "Del mensaje de datos a una acción segura de la tripulación",
    minutes: 18,
    blocks: [
      {
        kind: "p",
        text: "La comunicación por enlace de datos entre controlador y piloto (CPDLC, Controller–Pilot Data Link Communications) permite intercambiar mensajes normalizados entre una dependencia de control de tránsito aéreo (ATC, Air Traffic Control) y la cabina. No es un chat libre ni elimina la voz. Una solicitud enviada por la aeronave no es autorización; un mensaje recibido debe interpretarse según su tipo, la autoridad que lo envió y las opciones de respuesta que habilita el equipo.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-43-01.svg",
        alt: "Esquema de cuatro etapas para identificar, revisar, responder y actuar ante un mensaje CPDLC.",
        ancho: 1600,
        alto: 900,
        pie: "Primero se confirma la autoridad de datos vigente y el mensaje; luego ambos pilotos revisan su contenido, eligen la respuesta permitida y ejecutan solo una autorización inequívoca. Un inicio de sesión, STANDBY o ROGER no autorizan por sí mismos un cambio de vuelo.",
      },
      { kind: "sub", text: "Conexión y autoridad de datos" },
      {
        kind: "p",
        text: "El inicio de sesión o logon identifica la aeronave ante una dependencia que ofrece el servicio. La conexión puede prepararse antes de entrar en su espacio aéreo, pero no significa que esa dependencia ya sea la autoridad de datos vigente. La tripulación comprueba en el sistema qué dependencia está activa y cuándo termina el servicio o se transfiere a otra. El procedimiento exacto, la dirección de logon, el tiempo previo, la cobertura y el medio de respaldo son propios de cada región; se consultan en la publicación aeronáutica aplicable y en el procedimiento del operador.",
      },
      {
        kind: "p",
        text: "Como caso publicado y real, la información aeronáutica estadounidense identifica a Oakland Oceanic como un área con servicio CPDLC y vigilancia dependiente automática por contrato (ADS-C, Automatic Dependent Surveillance–Contract) para aeronaves FANS 1/A elegibles. Su publicación exige mantener capacidad de voz por frecuencia alta (HF, High Frequency) y verificar el centro activo. Esto documenta cómo conviven conexión de datos y respaldo de voz; **no es un procedimiento para Colombia** ni una ruta de ejemplo inventada.",
      },
      { kind: "sub", text: "Qué significa cada respuesta" },
      {
        kind: "table",
        head: ["Respuesta", "Efecto operacional", "Límite"],
        rows: [
          ["WILCO", "La instrucción se comprendió y se cumplirá.", "Solo cuando el mensaje admite esa respuesta y la tripulación puede cumplir."],
          ["UNABLE", "La instrucción no puede cumplirse.", "Si hace falta explicar el motivo, se usa el medio y el procedimiento disponibles."],
          ["STANDBY", "Se necesita tiempo para responder.", "No es aceptación ni respuesta final; el diálogo sigue abierto."],
          ["ROGER", "Acusa recibo de información.", "No expresa intención de cumplir una autorización."],
          ["AFFIRM / NEGATIVE", "Responde sí o no a una pregunta.", "Una respuesta positiva sobre capacidad no crea por sí sola una autorización."],
        ],
      },
      {
        kind: "p",
        text: "Las opciones dependen del **atributo de respuesta de cada elemento de mensaje** y de la implementación: no todos los uplinks ofrecen WILCO, UNABLE o ROGER. La AIP de la FAA publica atributos W/U, A/N y R para sus operaciones oceánicas y advierte diferencias entre aplicaciones FANS 1/A y red de telecomunicaciones aeronáuticas de base 1 (ATN B1, Aeronautical Telecommunication Network Baseline 1). El piloto no sustituye una opción ausente por otra parecida.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-43-02.webp",
        alt: "Historieta de tres escenas: controlador envía mensaje, pilotos lo verifican juntos y piloto que monitorea responde.",
        ancho: 1600,
        alto: 900,
        pie: "Historieta didáctica, no transcripción real: el controlador envía un mensaje; el piloto que vuela (PF, pilot flying) y el piloto que monitorea (PM, pilot monitoring) comprueban destinatario, contenido y capacidad; PM selecciona la respuesta que el sistema admite. Pantallas ilustrativas, sin datos de una autorización real.",
      },
      { kind: "sub", text: "Secuencia de cabina para un uplink" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Detectar y situar.** Identificar el mensaje nuevo, la aeronave destinataria, la dependencia activa y si es instrucción, pregunta, información o gestión del sistema. Un mensaje de la siguiente autoridad no equivale automáticamente a control vigente.",
          "**Leer completo y compartir.** PF y PM contrastan todos los parámetros pertinentes: ruta, nivel, condición, punto, tiempo y cualquier restricción. Evitan aceptar por el primer renglón o por una expectativa previa.",
          "**Comprobar capacidad y conflicto.** Comparar con la autorización vigente, la trayectoria en el sistema de gestión de vuelo (FMS, Flight Management System), el equipo y la performance. Un cambio recibido no se carga ni ejecuta a ciegas. Si contradice una instrucción de voz reciente o es ambiguo, se aclara antes de actuar.",
          "**Responder según el mensaje.** Seleccionar la respuesta habilitada y confirmar que se transmitió. WILCO implica intención de cumplir; UNABLE comunica imposibilidad; STANDBY concede tiempo, pero obliga a resolver el intercambio después. La distribución de tareas concreta la fija el procedimiento normalizado del operador (SOP, Standard Operating Procedure).",
          "**Ejecutar y vigilar.** Solo una autorización inequívoca y aceptada cambia la trayectoria. Tras introducirla, ambos pilotos vuelven a verificar la ruta o el nivel efectivamente seleccionado y mantienen vigilancia de la comunicación.",
        ],
      },
      {
        kind: "escenario",
        titulo: "Mensaje demorado durante una coordinación oceánica",
        situacion: "Ejercicio didáctico sin indicativo, ruta, frecuencia ni autorización inventados. En un vuelo equipado, el sistema avisa que un uplink llegó con demora de red. Al mismo tiempo, la tripulación conserva una autorización previa clara y tiene voz de respaldo disponible. La AIP de la FAA describe esta contingencia para Oakland, Anchorage y New York Oceanic.",
        preguntas: [
          { q: "¿Se ejecuta el uplink demorado porque aparece en la pantalla?", a: "No. La tripulación no actúa sobre el mensaje demorado hasta aclarar con la dependencia de servicios de tránsito aéreo (ATS, Air Traffic Services) qué pretendía." },
          { q: "¿Cómo se resuelve la incertidumbre?", a: "Se pasa a voz para informar que llegó un uplink demorado y pedir aclaración; después se cierra el mensaje de datos conforme a la indicación del controlador y al equipo." },
          { q: "¿Qué autorización se conserva mientras se aclara?", a: "Se mantiene la última autorización inequívoca aplicable, sin tratar el mensaje demorado como un cambio ya aceptado. Si la seguridad exige otra acción inmediata, se aplican los procedimientos de contingencia pertinentes." },
        ],
        concepto: "La entrega técnica del mensaje no prueba que siga siendo oportuno ni ejecutable.",
      },
      {
        kind: "enLaOperacion",
        momento: "Transición entre dependencias y uso en crucero",
        texto: "Antes del área publicada, la tripulación verifica elegibilidad, conexión, autoridad activa y voz de respaldo. Durante el vuelo lee cada uplink como una instrucción operacional, no como una notificación de aplicación. En una transferencia comprueba qué dependencia quedó activa antes de enviar otra solicitud. Si falla CPDLC, se sigue el procedimiento de voz publicado; la FAA indica que en sus áreas oceánicas el respaldo por voz debe existir y que la pérdida del enlace exige volver a voz hasta restablecerlo.",
        pasos: [
          "No confundir una solicitud de cambio de nivel o ruta con una autorización.",
          "No usar ROGER para prometer cumplimiento ni WILCO para un mensaje todavía no evaluado.",
          "No asumir que logon y transferencia ocurren exactamente al cruzar un límite geográfico: comprobar el estado real del sistema y la publicación aplicable.",
        ],
      },
      { kind: "callout", tone: "warn", title: "Si hay ambigüedad, voz", text: "Un mensaje tardío, incompleto, contradictorio o que requiere coordinación inmediata se aclara por voz usando el medio de respaldo previsto. No se fabrican respuestas libres ni se ejecuta un cambio para 'resolver después'." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Logon, autoridad activa y autorización son tres hechos diferentes.",
          "Leer, contrastar entre pilotos, responder con la opción habilitada y verificar la acción.",
          "WILCO acepta cumplimiento; UNABLE rechaza; STANDBY difiere; ROGER acusa recibo.",
          "Una solicitud, pregunta o aviso informativo no cambia por sí solo la autorización.",
          "Voz resuelve dudas, mensajes demorados y fallas según el procedimiento publicado.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "FAA AIP ENR 7.2 · FAA JO 7110.65, capítulo 14 · Aerocivil eAIP",
        bloques: [
          { kind: "p", text: "FAA, AIP ENR 7.2, Data Link Procedures: servicios oceánicos publicados, respaldo de voz, comprobación de centro activo, monitor de latencia y tabla de atributos/respuestas CPDLC: https://www.faa.gov/air_traffic/publications/atpubs/aip_html/part2_enr_section_7.2.html" },
          { kind: "p", text: "FAA, JO 7110.65, capítulo 14, sección 3: uso de CPDLC oceánico, necesidad de respaldo de voz y actuación ante falla o incertidumbre de entrega: https://www.faa.gov/air_traffic/publications/atpubs/atc_html/chap14_section_3.html" },
          { kind: "p", text: "Aerocivil, portal oficial AIP/eAIP: para verificar implementación, direcciones, frecuencias y procedimientos vigentes de Colombia; esta lección no les atribuye valores: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "La historieta y el escenario son didácticos. No reproducen un vuelo, mensaje, frecuencia o transcripción real. Los detalles de Oakland pertenecen solo a su publicación oficial y no se generalizan a otro espacio aéreo." },
        ],
      },
    ],
  },
  // ── 44 ──────────────────────────────────────────────────────────────────
  {
    n: 44,
    title: "Voz o CPDLC",
    kicker: "Elegir el medio y resolver instrucciones superpuestas",
    minutes: 17,
    blocks: [
      {
        kind: "p",
        text: "La voz y la comunicación por enlace de datos entre controlador y piloto (CPDLC, Controller–Pilot Data Link Communications) son medios de la misma relación operacional, pero no son intercambiables en toda situación. La voz permite aclarar de inmediato y transmitir matices; CPDLC entrega mensajes estructurados que deben leerse, comprobarse y responderse según sus atributos. El medio preferido, la vigilancia de voz y el respaldo dependen del espacio aéreo, el equipo y la publicación aplicable.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-44-01.svg",
        alt: "Dos columnas comparan voz y CPDLC según urgencia, claridad, revisión y respuesta.",
        ancho: 1600,
        alto: 900,
        pie: "La elección no se basa en comodidad. Si el mensaje es tardío, contradictorio o necesita acción inmediata, se usa la voz de respaldo según el procedimiento aplicable. En CPDLC se responde por el enlace cuando corresponde; si la voz cambia la autorización, se debe resolver también el intercambio de datos que quede abierto.",
      },
      { kind: "sub", text: "Ventajas, límites y malentendidos" },
      {
        kind: "table",
        head: ["Aspecto", "Voz", "CPDLC"],
        rows: [
          ["Tiempo y prioridad", "Permite contacto directo y aclaración rápida si el canal está disponible.", "Tiene latencia y requiere leer, responder y cerrar el intercambio; no es ideal para una orden inmediata."],
          ["Comprensión", "Exige escuchar distintivo, instrucción y restricciones, y colacionar lo pertinente.", "Reduce errores de oído, pero introduce riesgos de selección, lectura superficial o aceptación automática."],
          ["Conciencia compartida", "En una misma frecuencia, otras tripulaciones pueden oír parte del tráfico; esto no sustituye la separación ATC.", "El mensaje es individual; no informa a la cabina de las autorizaciones de otros vuelos."],
          ["Registro", "Puede apoyarse en anotación y grabación del servicio; la memoria sola no basta.", "El mensaje puede consultarse en el sistema según equipo y estado de la transacción; no prueba que se haya comprendido."],
          ["Falla o ambigüedad", "Es el respaldo previsto en muchas operaciones, con otro medio si la voz también falla.", "No se ejecuta un uplink incierto por aparecer en pantalla; se aclara por el medio apropiado."],
        ],
      },
      {
        kind: "p",
        text: "La orden FAA JO 7110.65 distingue expresamente entre dominios. En ruta doméstica de Estados Unidos, CPDLC **complementa** la voz y no debería usarse para autorizaciones inmediatas o expeditivas si la voz es factible. En las operaciones oceánicas estadounidenses cubiertas por esa orden, cuando el vuelo está conectado y fuera de cobertura de frecuencia muy alta (VHF, Very High Frequency), CPDLC es el medio principal, pero debe existir respaldo de voz, por ejemplo frecuencia alta (HF, High Frequency), comunicación satelital o un tercero. Ninguna de esas reglas se traslada automáticamente a Colombia.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-44-02.webp",
        alt: "Historieta de tres escenas: la tripulación recibe un mensaje de datos, detecta incertidumbre y consulta a control por voz.",
        ancho: 1600,
        alto: 900,
        pie: "Historieta didáctica, no transcripción: 1) llega una comunicación de datos rutinaria; 2) los pilotos detectan que hace falta aclarar la intención o que el tiempo apremia; 3) el controlador y la cabina hablan por voz antes de actuar. La imagen no presenta una frecuencia, ruta, procedimiento o autorización real.",
      },
      { kind: "sub", text: "Transición de un medio al otro" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Identificar la instrucción que se está sustituyendo.** Un mensaje de datos abierto puede seguir visible aunque control haya dado otra instrucción por voz. No se presume que el sistema lo borre solo.",
          "**Aclarar la intención y colacionar lo oral.** La tripulación escucha la nueva autorización completa, verifica restricciones y colaciona sus elementos obligatorios. Si la instrucción de voz contradice el uplink, no escoge arbitrariamente una de las dos.",
          "**Cerrar la transacción de datos de la forma indicada.** Si control pide responder UNABLE al mensaje anterior, se hace en el enlace para evitar una autorización abierta en cabina. Una cancelación en tierra no necesariamente cierra el uplink mostrado al piloto.",
          "**Actualizar el vuelo.** Solo después de identificar cuál autorización rige, el piloto que vuela (PF, pilot flying) y el piloto que monitorea (PM, pilot monitoring) comprueban lo introducido en el sistema de gestión de vuelo (FMS, Flight Management System) o panel de guiado. La asignación concreta la establece el procedimiento normalizado del operador (SOP, Standard Operating Procedure).",
        ],
      },
      {
        kind: "p",
        text: "La FAA publica un **ejemplo de fraseología**, no una transcripción de vuelo: un controlador deja sin efecto por voz una autorización de ascenso enviada por CPDLC, pide que la tripulación responda UNABLE al mensaje pendiente y asigna otro nivel. La enseñanza no es memorizar el distintivo o el nivel de ese ejemplo, sino reconocer dos trabajos distintos: obedecer y colacionar la instrucción oral vigente, y cerrar el intercambio de datos previo.",
      },
      {
        kind: "escenario",
        titulo: "Dos instrucciones visibles para la misma trayectoria",
        situacion: "Ejercicio didáctico sin indicativo, aeropuerto, ruta, frecuencia o nivel inventados. Una autorización CPDLC de cambio de trayectoria está pendiente de respuesta. Antes de que la tripulación la acepte, el controlador llama por voz con una instrucción distinta y le indica cómo cerrar el mensaje de datos anterior. La cabina dispone de ambos medios.",
        preguntas: [
          { q: "¿Puede enviarse WILCO al uplink previo porque todavía está en pantalla?", a: "No. La instrucción de voz ha cambiado el contexto. Se escucha, confirma y colaciona la nueva autorización, y se cierra el uplink anterior conforme a lo pedido por control, por ejemplo mediante UNABLE si ese es el procedimiento indicado." },
          { q: "Si el controlador cancela el mensaje desde tierra, ¿queda necesariamente cerrado en cabina?", a: "No. La FAA advierte que la cancelación en el sistema de tierra puede dejar el uplink abierto en la pantalla de la aeronave. La tripulación atiende la instrucción de cierre recibida." },
          { q: "¿Cuándo puede modificarse el FMS?", a: "Cuando ambos pilotos tienen inequívoca la autorización vigente y han verificado su contenido. No se cargan simultáneamente dos trayectorias incompatibles para decidir después." },
        ],
        concepto: "Al cambiar de voz a datos o viceversa, la prioridad es conservar una sola autorización entendida y cerrar la transacción anterior.",
      },
      {
        kind: "enLaOperacion",
        momento: "Crucero con voz y enlace activos",
        texto: "PM vigila las comunicaciones conforme al SOP, pero ambos pilotos participan en la comprensión de una instrucción que cambie la trayectoria. En un vuelo oceánico equipado, el uso principal de CPDLC no elimina la necesidad del respaldo de voz publicado. En un sector doméstico que solo lo usa como complemento, una solicitud urgente no se convierte en rutina de datos por ahorro de frecuencia.",
        pasos: [
          "Mantener el medio de voz disponible y la vigilancia exigida para el área, sin suponer que el mismo método aplica a todos los espacios aéreos.",
          "Si una respuesta de CPDLC tarda o el enlace falla, aplicar el paso a voz publicado; no repetir una solicitud como si fuera nueva sin aclarar el estado del intercambio.",
          "En una situación anormal, comunicar condición, intención y necesidad de ayuda con el medio que permita la coordinación segura; declarar urgencia o socorro cuando corresponda.",
        ],
      },
      { kind: "callout", tone: "warn", title: "Un texto escrito no valida su intención", text: "Una lectura nítida puede seguir siendo incorrecta por destinatario, autoridad de datos, demora o conflicto con voz. El mensaje se contrasta antes de aceptarlo." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Voz sirve para aclaración e inmediatez; CPDLC para intercambios estructurados donde esté autorizado.",
          "El medio principal cambia entre entornos domésticos, terminales y oceánicos.",
          "Un cambio oral puede exigir cerrar expresamente el mensaje CPDLC previo.",
          "La colación de una instrucción de voz no desaparece por tener enlace de datos.",
          "Las reglas de cobertura, vigilancia y respaldo se verifican en la publicación aplicable.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "FAA JO 7110.65, capítulo 14 · FAA AIP ENR 7.2 · Aerocivil eAIP",
        bloques: [
          { kind: "p", text: "FAA, JO 7110.65, capítulo 14, sección 2: CPDLC doméstico como complemento de voz, límite para órdenes inmediatas, sustitución por voz y cierre de uplinks abiertos: https://www.faa.gov/air_traffic/publications/atpubs/atc_html/chap14_section_2.html" },
          { kind: "p", text: "FAA, JO 7110.65, capítulo 14, sección 3: CPDLC oceánico como medio principal fuera de VHF cuando está disponible, respaldo de voz obligatorio y paso a voz ante falla: https://www.faa.gov/air_traffic/publications/atpubs/atc_html/chap14_section_3.html" },
          { kind: "p", text: "FAA, AIP ENR 7.2: ejemplos regionales de servicios, medios de respaldo y mensajes demorados: https://www.faa.gov/air_traffic/publications/atpubs/aip_html/part2_enr_section_7.2.html" },
          { kind: "p", text: "Aerocivil, portal AIP/eAIP oficial para comprobar condiciones colombianas vigentes, sin inferirlas de normas FAA: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "La historieta y el escenario son didácticos; el ejemplo de sustitución es un ejemplo normativo FAA, no grabación ni vuelo real." },
        ],
      },
    ],
  },
  // ── 45 ──────────────────────────────────────────────────────────────────
  {
    n: 45,
    title: "Autorización de salida por data link",
    kicker: "PDC, CPDLC-DCL y revisión de una autorización recibida",
    minutes: 17,
    blocks: [
      {
        kind: "p",
        text: "Una autorización de salida por datos sigue siendo una autorización del control de tránsito aéreo (ATC, Air Traffic Control). El medio de entrega no la convierte en copia del plan presentado ni en permiso de puesta en marcha, empuje o rodaje. En el sistema estadounidense de la FAA hay dos vías documentadas: autorización previa a la salida (PDC, Pre-Departure Clearance) y autorización de salida por comunicación de datos entre controlador y piloto (CPDLC-DCL, Controller–Pilot Data Link Communications–Departure Clearance). La forma de obtenerlas, confirmarlas o recibir enmiendas depende del servicio publicado para el aeródromo.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-45-01.svg",
        alt: "PDC llega a través del operador o proveedor; CPDLC-DCL va a la aviónica y requiere respuesta.",
        ancho: 1600,
        alto: 900,
        pie: "Comparación basada en el Manual de Información Aeronáutica de la FAA. En PDC, control transmite al operador o proveedor y este entrega a la tripulación; en CPDLC-DCL, la autorización llega directamente a la aviónica y la tripulación responde por el enlace. Es arquitectura estadounidense, no afirmación de que Bogotá u otro aeródromo colombiano tenga esos servicios.",
      },
      { kind: "sub", text: "Diferencia que cambia el trabajo de cabina" },
      {
        kind: "table",
        head: ["", "PDC en el sistema FAA", "CPDLC-DCL en el sistema FAA"],
        rows: [
          ["Entrega", "ATC envía al centro de operaciones o proveedor, que reenvía por datos o impresión.", "La torre envía a la aviónica mediante la aplicación CPDLC."],
          ["Respuesta de tripulación", "La FAA no exige acuse de recibo ni colación para esa PDC.", "La tripulación debe responder por el enlace."],
          ["Enmienda antes de la salida", "Una autorización enmendada no se entrega por el mismo PDC; pasa a voz.", "El sistema admite autorizaciones revisadas cuando la función y el equipo lo permiten."],
          ["Si falta o genera duda", "Se contacta entrega de autorizaciones por el medio publicado.", "Se aclara con control; no se acepta ni carga una ruta dudosa."],
        ],
      },
      {
        kind: "p",
        text: "La ausencia de colación para una PDC en Estados Unidos **no significa que se lea menos**. La tripulación compara destino, límite de autorización, salida instrumental normalizada (SID, Standard Instrument Departure) si se asignó, ruta, nivel inicial, código de radar secundario (SSR, Secondary Surveillance Radar), instrucciones especiales y frecuencia de salida cuando figuren. El plan presentado es una propuesta; la autorización recibida puede diferir. La lista exacta de campos depende del mensaje y del servicio, por lo que no se rellena con valores inventados.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-45-02.webp",
        alt: "Historieta de tres paneles: revisión en papel, verificación de mensaje digital y comprobación de una enmienda.",
        ancho: 1600,
        alto: 900,
        pie: "Historieta didáctica en un avión estacionado: 1) un piloto lee la autorización recibida en papel; 2) ambos verifican la autorización de datos en cabina; 3) una posible enmienda obliga a repetir el cotejo antes de responder. No representa un aeródromo, mensaje, ruta o vuelo real. El panel de papel ilustra PDC y los siguientes, CPDLC-DCL; no son tres autorizaciones consecutivas del mismo vuelo.",
      },
      { kind: "sub", text: "Secuencia profesional antes de la salida" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Confirmar el origen y el servicio.** Identificar si el documento es una PDC entregada por operador/proveedor, una autorización CPDLC-DCL o un mensaje operacional de la compañía. Una impresión con apariencia similar no confiere autoridad ATC por sí misma.",
          "**Leer todos los campos.** Comparar la autorización con el plan, el despacho y las publicaciones aplicables. Registrar de modo visible cada diferencia: salida, ruta, nivel, código, restricción, frecuencia e instrucciones adicionales.",
          "**Verificar en el sistema de gestión de vuelo.** El piloto que vuela (PF, pilot flying) y el piloto que monitorea (PM, pilot monitoring) cotejan la ruta realmente cargada en el sistema de gestión de vuelo (FMS, Flight Management System), continuidad y restricciones. Una función de carga automática no elimina la comprobación.",
          "**Responder según el tipo de entrega.** En CPDLC-DCL se envía la respuesta exigida por el sistema; en PDC estadounidense no se inventa una colación oral de rutina. Si la publicación local exige otro procedimiento, ese es el aplicable.",
          "**Gestionar una enmienda o ausencia.** Si falta la autorización, llega una revisión o algo no se entiende, se detiene el cierre de la preparación y se aclara con entrega de autorizaciones por el medio publicado. No se asume que lo presentado en el plan fue aceptado.",
        ],
      },
      {
        kind: "escenario",
        titulo: "La ruta entregada no coincide con el FMS",
        situacion: "Ejercicio didáctico sin ruta, salida, frecuencia o indicativo inventados. El avión permanece en el puesto. La tripulación recibe por datos una autorización de salida cuya ruta difiere de la cargada en el FMS. PM ve además una nota del operador que refleja el plan anterior. Todavía no se ha solicitado rodaje.",
        preguntas: [
          { q: "¿Puede prevalecer el plan cargado porque llegó primero?", a: "No. El plan y la nota del operador no sustituyen una autorización ATC. La tripulación identifica la autorización válida, lee la diferencia completa y solicita aclaración si es ambigua." },
          { q: "¿Se responde WILCO a cualquier documento recibido por datos?", a: "No. La respuesta depende del servicio: CPDLC-DCL requiere respuesta por el enlace en el sistema FAA; una PDC entregada por el operador no funciona como ese diálogo. Tampoco se acepta antes de revisar la ruta." },
          { q: "¿Qué se comprueba antes de usar la autorización para salir?", a: "Que ambos pilotos entendieron los campos, que el FMS refleja la ruta autorizada y que cualquier enmienda se resolvió por el canal correcto. La autorización de salida no reemplaza permisos separados de empuje o rodaje." },
        ],
        concepto: "La autorización se valida por su emisor, contenido y procedimiento de respuesta, no por el papel o la pantalla.",
      },
      {
        kind: "enLaOperacion",
        momento: "Preparación en el puesto y cambios tardíos",
        texto: "En un aeropuerto con servicio de datos, la tripulación no empieza la salida con un supuesto de 'cleared as filed'. Si cambia la ruta, repite la revisión de combustible, performance, salida y FMS según el procedimiento normalizado del operador (SOP, Standard Operating Procedure). La FAA indica que una PDC enmendada debe emitirse por voz, mientras CPDLC-DCL puede transmitir revisiones; la habilitación concreta y la respuesta exigida se verifican localmente.",
        pasos: [
          "No llamar PDC a cualquier mensaje que imprima la compañía.",
          "No confundir autorización IFR de salida con permiso de movimiento en superficie.",
          "Para Colombia, comprobar exclusivamente la AIP/eAIP de Aerocivil antes de afirmar que un aeródromo dispone de PDC o DCL.",
        ],
      },
      { kind: "callout", tone: "warn", title: "Sin ruta ficticia", text: "La diferencia entre autorización presentada y recibida se enseña aquí sin inventar una SID, un código SSR o una frecuencia. En operación real se leen las publicaciones vigentes y el mensaje recibido." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "PDC y CPDLC-DCL son vías diferentes de entrega de una autorización ATC.",
          "En el sistema FAA, PDC llega por operador/proveedor; CPDLC-DCL directo a aviónica y exige respuesta.",
          "La autorización completa se compara con el plan y con lo cargado en FMS.",
          "Las enmiendas y la respuesta se gestionan según servicio y publicación local.",
          "La autorización de salida no autoriza automáticamente empuje ni rodaje.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "FAA AIM 5-2-2 · FAA JO 7110.65, 14-1 · Aerocivil eAIP",
        bloques: [
          { kind: "p", text: "FAA, Aeronautical Information Manual, 5-2-2, Automated Pre-Departure Clearance Procedures: entrega PDC y CPDLC-DCL, respuesta, revisiones y aclaración con clearance delivery: https://www.faa.gov/air_traffic/publications/aim_html/chap5_section_2.html" },
          { kind: "p", text: "FAA, JO 7110.65, capítulo 14, sección 1: control de integridad de ruta, enmiendas PDC por voz y revisión por CPDLC-DCL: https://www.faa.gov/air_traffic/publications/atpubs/atc_html/chap14_section_1.html" },
          { kind: "p", text: "FAA, AIP apéndice 4, apartado Automated Departure Clearance Delivery: identifica el flujo indirecto PDC y la entrega directa DCL: https://www.faa.gov/air_traffic/publications/atpubs/aip_html/appendix_4.html" },
          { kind: "p", text: "Aerocivil, AIP/eAIP oficial para servicios, métodos y procedimientos colombianos vigentes: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "Las reglas FAA citadas no son procedimiento colombiano. La historieta y el escenario son didácticos, no transcripciones ni autorizaciones reales." },
        ],
      },
    ],
  },
  // ── 46 ──────────────────────────────────────────────────────────────────
  {
    n: 46,
    title: "ACARS",
    kicker: "Separar transporte, emisor y autoridad del mensaje",
    minutes: 16,
    blocks: [
      {
        kind: "p",
        text: "ACARS (Aircraft Communications Addressing and Reporting System) es un sistema de intercambio de datos entre aeronave y tierra. Puede transportar información operacional de la aerolínea y, en determinadas arquitecturas, datos de aplicaciones de servicios de tránsito aéreo. Por eso la frase «si llegó por ACARS, es de la compañía» es falsa. Lo decisivo para la tripulación es **quién emitió el mensaje, qué servicio lo entregó y qué acción autoriza o solicita**.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-46-01.svg",
        alt: "Esquema de dos flujos: mensaje del operador y autorización ATC pueden usar enlaces de datos, pero tienen distinta autoridad.",
        ancho: 1600,
        alto: 900,
        pie: "El enlace es transporte, no autoridad. Despacho puede proponer un cambio operacional, pero la autorización de tránsito aéreo la emite ATC. Excepción importante: una PDC originada por ATC puede pasar por el centro de operaciones y llegar por ACARS; sigue siendo una autorización ATC que debe verificarse como tal.",
      },
      { kind: "sub", text: "Tres capas que no deben mezclarse" },
      {
        kind: "table",
        head: ["Capa", "Pregunta de cabina", "Consecuencia"],
        rows: [
          ["Origen", "¿Emite despacho, mantenimiento, meteorología o ATC?", "Una recomendación del operador no cambia ruta o nivel autorizados."],
          ["Transporte", "¿Llegó por ACARS, otra red, voz o impresión?", "La misma vía puede presentar categorías distintas; la pantalla no define la autoridad."],
          ["Aplicación", "¿Es información operacional, PDC, CPDLC u otro servicio?", "Cada tipo tiene su procedimiento de revisión y respuesta."],
        ],
      },
      {
        kind: "p",
        text: "La comunicación por enlace de datos entre controlador y piloto (CPDLC, Controller–Pilot Data Link Communications) es una aplicación de control: intercambia instrucciones, solicitudes y respuestas con la dependencia ATC. ACARS es una arquitectura de datos, no sinónimo de CPDLC. La FAA explica que una autorización previa a la salida (PDC, Pre-Departure Clearance) puede originarse en ATC, pasar al ordenador del operador o proveedor y llegar a la aeronave por ACARS o incluso en papel. Un documento del operador y una PDC pueden compartir canal, pero no origen ni efecto.",
      },
      {
        kind: "p",
        text: "La documentación OACI sobre enlaces de datos también muestra que sistemas FANS 1/A (Future Air Navigation System 1/A) pueden transportar aplicaciones CPDLC y vigilancia dependiente automática por contrato (ADS-C, Automatic Dependent Surveillance–Contract) sobre una red ACARS. La comparación útil no es «ACARS versus CPDLC» como si fueran dos radios rivales: es **red y transporte** frente a **servicio y autoridad**.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-46-02.webp",
        alt: "Historieta de tres paneles: despacho envía una sugerencia, pilotos la evalúan y solicitan a control el cambio.",
        ancho: 1600,
        alto: 900,
        pie: "Historieta didáctica, sin mensajes ni vuelo real: 1) despacho envía información operacional; 2) los pilotos comprueban que no es una autorización ATC; 3) si desean modificar la trayectoria, lo solicitan al control por el medio apropiado y esperan la autorización. La imagen no reproduce rutas, frecuencias o textos de ACARS.",
      },
      { kind: "sub", text: "Uso durante una rotación" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Recibir con contexto.** PM identifica la categoría y el origen antes de leer el contenido: despacho, carga, mantenimiento, meteorología, información terminal o autorización de control. La lista real de servicios depende del operador y del aeropuerto.",
          "**Relacionar el dato con su hora.** Un mensaje meteorológico o de información terminal puede quedar desactualizado. El sello temporal y la edición importan tanto como el contenido, especialmente antes de la llegada o de la salida.",
          "**Separar recomendación de permiso.** Si despacho sugiere una ruta o nivel más favorable, PF y PM evalúan combustible, performance y viabilidad. La solicitud a ATC se formula por el medio autorizado; no se modifica la trayectoria por una instrucción de la compañía.",
          "**Reconocer la excepción PDC.** Si un mensaje por ACARS contiene una autorización originada en ATC, se procesa como autorización de salida, con el cotejo completo explicado en la lección anterior. No se descarta como simple nota del operador por haber pasado por su red.",
          "**Resolver la falla por el canal correcto.** Si ACARS no está disponible, se recurre al medio alterno del operador para mensajes operacionales. Para instrucciones ATC se utiliza el medio ATC publicado. No se da por recibida una autorización que nunca llegó.",
        ],
      },
      {
        kind: "escenario",
        titulo: "Despacho propone una ruta distinta",
        situacion: "Ejercicio didáctico sin nombres de ruta ni frecuencia. En crucero, llega un mensaje operacional del despachador que propone un cambio para evitar meteorología. La tripulación conserva una autorización ATC vigente y tiene comunicaciones con la dependencia activa. El mensaje no es una PDC ni un uplink CPDLC del controlador.",
        preguntas: [
          { q: "¿Puede PF cargar y ejecutar la ruta sugerida por el despachador?", a: "No como nuevo trayecto autorizado. Puede evaluarse la propuesta, pero para cambiar la ruta se requiere la autorización ATC o el procedimiento de contingencia aplicable." },
          { q: "¿Qué debe identificarse antes de decidir?", a: "Origen y tipo de mensaje, hora, motivo operacional, efecto en combustible y seguridad, autorización vigente y medio apropiado para solicitar el cambio a control." },
          { q: "Si una autorización ATC llegara por ACARS como PDC, ¿sería solo un consejo de la compañía?", a: "No. Una PDC originada en ATC y entregada por el operador mantiene su condición de autorización; se comprueba su autenticidad, contenido y procedimiento local de uso." },
        ],
        concepto: "La autoridad viene del emisor y del servicio, no del cable, la pantalla ni la impresora.",
      },
      {
        kind: "enLaOperacion",
        momento: "Mensajes de compañía, control y datos terminales",
        texto: "En una operación de aerolínea pueden coexistir mensajes del control operacional de la aerolínea (AOC, Aeronautical Operational Control) y servicios de tránsito aéreo (ATS, Air Traffic Services) en interfaces parecidas. Un SOP (Standard Operating Procedure) define quién revisa y acusa cada clase de mensaje. La tripulación conserva una única imagen de la autorización ATC vigente, mientras usa los datos de la compañía para planificar y tomar decisiones propias de operación.",
        pasos: [
          "Si el contenido altera la ruta o nivel, verificar si es autorización ATC o propuesta del operador.",
          "Si es información meteorológica o terminal, comprobar hora, edición y fuente antes de usarla.",
          "Si hay duda sobre el origen o integridad, resolverla por el medio publicado; no elegir por apariencia gráfica.",
        ],
      },
      { kind: "callout", tone: "warn", title: "La misma red, distintas autoridades", text: "PDC puede pasar por el operador y seguir siendo autorización ATC. Un mensaje de despacho puede llegar a la misma pantalla y seguir siendo solo recomendación operacional. Confundirlos cambia la trayectoria sin permiso o hace ignorar una autorización válida." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "ACARS es un sistema de datos; CPDLC es una aplicación de comunicación ATC.",
          "Un mensaje operacional de compañía no modifica la autorización ATC.",
          "Una PDC originada por ATC puede viajar por ACARS y conservar su autoridad.",
          "Clasifica origen, tipo, hora y respuesta antes de actuar.",
          "Ante duda o falla, usa el medio alterno correspondiente al emisor.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "FAA AIM 5-2-2 · FAA AC 90-117 · OACI A42-WP/106",
        bloques: [
          { kind: "p", text: "FAA, AIM 5-2-2, Automated Pre-Departure Clearance Procedures: PDC originada en ATC, encaminada por aerolínea/proveedor y entregada por ACARS, red similar o impresión; CPDLC-DCL directa a aviónica: https://www.faa.gov/air_traffic/publications/aim_html/chap5_section_2.html" },
          { kind: "p", text: "FAA, AC 90-117, Data Link Communications: define el alcance de ACARS, PDC, CPDLC y ADS-C en la arquitectura de datos: https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.current/documentNumber/90-117" },
          { kind: "p", text: "OACI, A42-WP/106, Introduction of Data Link Services, apartado 2.5: documenta el uso de red ACARS para intercambiar ADS-C, CPDLC y DCL en una implementación concreta; no se generaliza a todos los aviones: https://www.icao.int/sites/default/files/Meetings/a42/Documents/WP/wp_106_en.pdf" },
          { kind: "p", text: "Aerocivil, AIP/eAIP oficial para disponibilidad y procedimientos ATS colombianos; no se atribuye aquí a un aeropuerto un servicio de datos no comprobado: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "La historieta y el escenario son didácticos, no transcripciones. Los ejemplos de transporte de FAA y OACI describen servicios o implementaciones concretas, no una regla universal." },
        ],
      },
    ],
  },
  // ── 47 ──────────────────────────────────────────────────────────────────
  {
    n: 47,
    title: "ADS-C",
    kicker: "Vigilancia automática, informes de posición y límites operacionales",
    minutes: 17,
    blocks: [
      {
        kind: "p",
        text: "La vigilancia dependiente automática por contrato (ADS-C, Automatic Dependent Surveillance–Contract) intercambia, por enlace de datos, las condiciones bajo las cuales la aeronave enviará informes al sistema de tierra. La dependencia de servicios de tránsito aéreo (ATS, Air Traffic Services) establece el contrato; la aviónica genera los informes conforme a sus condiciones. **Automático no significa autónomo para decidir la ruta**: ADS-C informa de la posición y otros datos, pero no emite ni sustituye una autorización de control.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-47-01.svg",
        alt: "Cuatro formas de informe ADS-C: periódico, por suceso, a solicitud y de emergencia; ninguno autoriza por sí mismo un cambio de trayectoria.",
        ancho: 1600,
        alto: 900,
        pie: "El contrato define condiciones de reporte. El sistema envía informes periódicos, por sucesos establecidos o a petición de tierra; el modo de emergencia identifica una situación prioritaria. Ninguno de esos informes da permiso para abandonar la ruta o el nivel autorizados.",
      },
      { kind: "sub", text: "Qué ve control y qué sigue haciendo la tripulación" },
      {
        kind: "p",
        text: "Un informe básico incluye identificación de la aeronave, posición, altitud y hora, entre otros datos de calidad. Según el contrato y el equipo pueden añadirse velocidad, datos meteorológicos y trayectoria prevista. La vigilancia es «dependiente» porque el avión aporta datos calculados por sus propios sistemas; no equivale a una observación radar independiente. Por ello la verificación de la ruta cargada en el sistema de gestión de vuelo (FMS, Flight Management System) sigue siendo crítica: una ruta mal cargada puede contaminar la intención proyectada que recibe tierra.",
      },
      {
        kind: "table",
        head: ["Informe o servicio", "Disparador", "Qué no significa"],
        rows: [
          ["Periódico", "Intervalo definido por el contrato", "No confirma que la tripulación haya leído una instrucción."],
          ["Por suceso", "Evento configurado, como cambio de punto o desviación lateral", "No es una autorización para desviarse."],
          ["A solicitud", "Petición puntual del sistema de tierra", "No cancela automáticamente los demás contratos."],
          ["Emergencia", "Condición de emergencia reconocida por la aplicación", "No reemplaza la coordinación de emergencia por los medios disponibles."],
          ["CPDLC", "Mensaje de comunicación entre controlador y piloto", "No es el informe automático de vigilancia ADS-C."],
        ],
      },
      {
        kind: "p",
        text: "La comunicación por enlace de datos entre controlador y piloto (CPDLC, Controller–Pilot Data Link Communications) es un servicio diferente: transmite solicitudes, instrucciones y respuestas. Puede coexistir con ADS-C en la operación oceánica, pero **ADS-C vigila y CPDLC comunica**. Si aparece una desviación lateral en un informe, el reporte no concede la desviación. La tripulación necesita la autorización o, si la seguridad exige actuar de inmediato, debe aplicar la contingencia publicada y comunicar su situación tan pronto como sea posible.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-47-02.webp",
        alt: "Historieta de tres paneles: pilotos verifican la ruta, revisan un estado de enlace de datos y un controlador observa la trayectoria oceánica.",
        ancho: 1600,
        alto: 900,
        pie: "Historieta didáctica, sin vuelo ni pantalla real: 1) ambos pilotos cotejan la ruta autorizada con la cargada; 2) supervisan el estado del enlace, sin interpretar el informe automático como autorización; 3) control recibe vigilancia y la tripulación conserva un medio de comunicación para instrucciones o contingencias.",
      },
      { kind: "sub", text: "El punto delicado: ¿se mantienen los reportes de posición?" },
      {
        kind: "p",
        text: "No existe una respuesta mundial única. La AIP de Estados Unidos indica que, en su entorno oceánico, las aeronaves con reporte automático mediante conexión ADS-C dejan de enviar reportes de posición por voz; si no existe conexión, los reportes se hacen por CPDLC o voz según la región. La misma publicación prescribe una excepción concreta en la región oceánica de Anchorage: al cruzar el límite de la región de información de vuelo (FIR, Flight Information Region) hacia ella, una aeronave con ADS-C activo debe enviar un reporte CPDLC para comprobar la conectividad. Por tanto, **no memorices «ADS-C elimina todos los reportes»**: verifica AIP, conexión efectiva, instrucciones ATC y procedimiento del operador para cada área.",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Antes del área remota.** Comprobar equipo, aprobaciones y servicios requeridos; cotejar de forma independiente los puntos del FMS con el plan y la autorización vigente. Un enlace disponible no subsana una ruta errónea.",
          "**Durante la conexión.** Confirmar el estado del registro y del servicio con la dependencia correspondiente. No suponer que un intento de logon equivale a un contrato ADS-C establecido ni que la siguiente dependencia ya recibe datos.",
          "**En cada cambio de autorización.** Mantener sincronizados autorización, ruta activa, nivel y plan de vuelo de cabina. Si la modificación afecta la intención enviada, actualizar y verificar el FMS conforme al procedimiento del operador.",
          "**Si se pierde ADS-C.** Avisar a ATS por un medio de comunicación disponible y reanudar o continuar los reportes de posición que correspondan según la región e instrucción recibida. No esperar en silencio a que el sistema se recupere.",
          "**Si se pierde CPDLC pero ADS-C sigue activo.** La vigilancia no sustituye el intercambio de instrucciones. Utilizar el medio de comunicaciones alterno publicado y verificar con control qué servicios siguen disponibles.",
        ],
      },
      {
        kind: "escenario",
        titulo: "Conexión no establecida al entrar en New York Oceanic",
        situacion: "Caso didáctico basado en la regla publicada para la FIR oceánica de New York; no es una transcripción ni un vuelo concreto. La tripulación había previsto ADS-C, pero al entrar no tiene conexión establecida con KZWY. El FMS contiene la ruta autorizada y el equipo de voz o CPDLC sigue disponible.",
        preguntas: [
          { q: "¿Puede dejar de reportar posición porque la aeronave está equipada con ADS-C?", a: "No. Para New York Oceanic, la AIP de Estados Unidos pide continuar los reportes de posición y hacerlos por HF si ADS-C no está disponible, hasta establecer la conexión con KZWY. Capacidad instalada no equivale a servicio activo; otras regiones pueden prescribir CPDLC o voz." },
          { q: "Si el controlador recibe un informe ADS-C por una desviación lateral, ¿queda autorizada la nueva derrota?", a: "No. El informe proporciona vigilancia. Para un cambio deliberado de ruta se requiere autorización ATC o, cuando corresponda, aplicar y comunicar la contingencia de seguridad publicada." },
          { q: "¿Qué se comprueba antes de asumir que la siguiente dependencia recibirá la trayectoria prevista?", a: "Estado de la conexión con esa dependencia, ruta y puntos cargados en FMS, autorización vigente y procedimiento regional de transferencia y reporte." },
        ],
        concepto: "Vigilancia automática, conexión efectiva y autorización son tres estados distintos.",
      },
      {
        kind: "enLaOperacion",
        momento: "Cruce oceánico con enlace de datos",
        texto: "El piloto que monitorea (PM, Pilot Monitoring) contrasta el estado de ADS-C y CPDLC con el plan de comunicaciones de la región; el piloto que vuela (PF, Pilot Flying) conserva el control de la trayectoria autorizada. Las funciones concretas dependen del procedimiento normalizado del operador. Si cambia el nivel, la ruta o la capacidad del sistema, ambos reconstruyen la misma imagen operacional antes de seguir.",
        pasos: [
          "Confirmar qué dependencia tiene conexión ADS-C, no solo que el equipo está instalado.",
          "No omitir informes por voz o CPDLC sin respaldo del procedimiento regional y estado del servicio.",
          "Ante una discrepancia entre autorización y FMS, resolverla antes de confiar en la intención transmitida.",
        ],
      },
      { kind: "callout", tone: "warn", title: "Dos errores opuestos", text: "Enviar reportes duplicados cuando el procedimiento regional los suspende congestiona el sistema; omitirlos cuando ADS-C no está conectado priva a control de la información esperada. La decisión depende de la conexión real y de la publicación aplicable." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "ADS-C transmite informes automáticos bajo contratos establecidos con tierra.",
          "Los contratos pueden ser periódicos, por suceso, a solicitud o de emergencia.",
          "ADS-C no autoriza cambios de ruta o nivel y no sustituye CPDLC o voz.",
          "El FMS debe reflejar la autorización vigente para que la intención proyectada sea útil.",
          "Los reportes alternos dependen de la AIP regional, la conexión y las instrucciones ATC.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "FAA AC 90-117 · FAA AC 91-70D · AIP USA ENR 7.1",
        bloques: [
          { kind: "p", text: "FAA, AC 90-117, Data Link Communications: ADS-C conecta automatización aérea y terrestre para intercambiar estado de vuelo e informes automáticos; CPDLC es comunicación digital ATC: https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.current/documentNumber/90-117" },
          { kind: "p", text: "FAA, AC 91-70D vigente, apéndices A.2.16.2 y D.2.2.12: definición de contratos ADS-C y verificación independiente de ruta FMS; guía estadounidense, no regla colombiana: https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_91-70D.pdf" },
          { kind: "p", text: "FAA, AIP Estados Unidos ENR 7.1 §5: reportes de posición con y sin conexión ADS-C; particularidades New York y Anchorage; verificar versión vigente antes de operar: https://www.faa.gov/air_traffic/publications/atpubs/aip_html/part2_enr_section_7.1.html" },
          { kind: "p", text: "Aerocivil, AIP/eAIP oficial para los procedimientos y servicios colombianos. La regla de New York aquí citada no se extrapola a una FIR colombiana: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "Las ilustraciones y preguntas son didácticas: no muestran una pantalla certificada, un contrato particular ni mensajes ATC reales." },
        ],
      },
    ],
  },
  // ── 48 ──────────────────────────────────────────────────────────────────
  {
    n: 48,
    title: "HF",
    kicker: "Voz de largo alcance: propagación, relevo y disciplina de cabina",
    minutes: 17,
    blocks: [
      {
        kind: "p",
        text: "La radio de alta frecuencia (HF, High Frequency) permite mantener voz a larga distancia cuando ya no hay cobertura terrestre de muy alta frecuencia (VHF, Very High Frequency). En espacio oceánico o remoto no basta con saber pulsar el transmisor: hay que **preparar el contacto, conservar la frecuencia asignada, reconocer al operador de radio y cerrar cada autorización con una colación verificable**. La propagación variable y el relevo hacia el controlador hacen que pedir una maniobra al último instante sea una mala estrategia.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-48-01.svg",
        alt: "Comparación conceptual: VHF se limita por línea de vista y HF puede alcanzar un avión lejano mediante propagación ionosférica.",
        ancho: 1600,
        alto: 900,
        pie: "VHF suele quedar limitado por la línea de vista; HF puede viajar más allá del horizonte por la ionosfera. La calidad de HF cambia con la hora, la actividad solar y la trayectoria. El dibujo no representa un alcance garantizado ni una frecuencia utilizable.",
      },
      { kind: "sub", text: "Qué cambia al dejar VHF" },
      {
        kind: "p",
        text: "La FAA señala que las llamadas HF suelen llegar a un **operador de estación aeronáutica**, quien retransmite electrónicamente la solicitud al centro de control oceánico. Ese operador no tiene autoridad para conceder una autorización por iniciativa propia. Si devuelve una respuesta de control, la tripulación distingue información, expectativa y autorización. La expresión «ATC clears…» es una forma típica de introducir una autorización retransmitida; «expect» no concede el cambio. La tripulación colaciona los elementos pertinentes y comprueba que el operador confirmó exactamente lo recibido.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-48-02.webp",
        alt: "Historieta de tres paneles: piloto llama en HF, operador de estación aeronáutica retransmite y controlador oceánico analiza la solicitud.",
        ancho: 1600,
        alto: 900,
        pie: "Secuencia didáctica, sin diálogo ni vuelo real: 1) la tripulación formula una solicitud HF y anota; 2) una estación aeronáutica costera la retransmite; 3) el controlador decide y su respuesta vuelve por la estación. La antena de hilos del segundo panel ilustra radio terrestre HF, no SATVOICE.",
      },
      {
        kind: "table",
        head: ["Situación", "Qué hace la tripulación", "Riesgo si se omite"],
        rows: [
          ["Antes de entrar en el área remota", "Verifica las radios HF requeridas y hace la comprobación aplicable antes de perder VHF, si es posible.", "Descubrir una falla cuando ya no existe el canal cercano."],
          ["Recepción primaria deficiente", "Prueba la secundaria asignada o el medio alterno publicado; registra con quién puede comunicarse.", "Quedarse en silencio en una frecuencia inservible."],
          ["Mensaje poco inteligible", "Solicita repetición o aclaración y confirma números, nivel y ruta antes de actuar.", "Convertir ruido en una autorización mal entendida."],
          ["Solicitud con tiempo crítico", "La inicia con antelación y considera el relevo por operador de radio.", "Llegar al punto de decisión sin respuesta de control."],
          ["Autorización retransmitida", "Identifica que proviene de ATC, colaciona y escucha la confirmación del operador.", "Tratar una expectativa como permiso o ejecutar un dato incompleto."],
        ],
      },
      {
        kind: "p",
        text: "La HF depende de que la señal alcance y regrese desde la ionosfera. La circular FAA AC 91-70D indica, como orientación general, que las frecuencias más altas suelen rendir mejor de día y las más bajas de noche; también advierte períodos de recepción marginal por actividad espacial. No es una regla para que la tripulación elija cualquier canal por su cuenta: **la frecuencia primaria y la secundaria proceden de la estación o publicación vigente para la ruta**. La AIP estadounidense, por ejemplo, prevé que New York Radio asigne ambas para su área de enlace de datos.",
      },
      { kind: "sub", text: "Secuencia de cabina en una transferencia oceánica" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Preparar antes del límite.** Revisar el plan de comunicaciones de la región, equipo requerido y disponibilidad de voz por satélite (SATVOICE, Satellite Voice) si está aprobado. La circular FAA aconseja comprobar las radios HF primaria y secundaria, cuando hay dos, en tierra o antes de entrar al espacio oceánico si es posible.",
          "**Establecer contacto.** Llamar a la estación correspondiente por el medio publicado, confirmar recepción y registrar la frecuencia primaria y secundaria asignadas. Para New York Oceanic, la AIP estadounidense pide contactar a New York Radio antes del ingreso y realizar una prueba de llamada selectiva (SELCAL, Selective Calling).",
          "**Escuchar con disciplina.** Un tono, ruido o desvanecimiento puede ocultar una cifra. PM anota el mensaje; PF conserva la trayectoria vigente. Si hay duda, pedir repetición o confirmación de la parte crítica antes de cargar o ejecutar un cambio.",
          "**Gestionar la demora.** Una solicitud HF puede pasar por operador y centro de control. No escalar, descender o desviarse por la sola expectativa de que la respuesta llegará. Si aparece una urgencia de seguridad, se aplica la contingencia publicada y se comunica por todos los medios disponibles.",
          "**Mantener alternativas.** El enlace de datos entre controlador y piloto (CPDLC, Controller–Pilot Data Link Communications) y SATVOICE pueden estar disponibles, pero sus condiciones de uso son regionales. En New York Oceanic, la AIP exige mantener capacidad HF con New York Radio incluso cuando se opera con enlace de datos.",
        ],
      },
      {
        kind: "escenario",
        titulo: "La primaria se degrada antes de solicitar un cambio",
        situacion: "Ejercicio didáctico en New York Oceanic basado en la AIP de Estados Unidos, sin vuelo, ruta, nivel ni frecuencia ficticios. New York Radio asignó una HF primaria y una secundaria. La primera se vuelve difícil de entender justo cuando la tripulación prevé solicitar un cambio de nivel; la aeronave mantiene su autorización actual.",
        preguntas: [
          { q: "¿Se inicia el ascenso porque el cambio parece conveniente y la respuesta HF puede tardar?", a: "No. La tripulación conserva el nivel autorizado. Puede iniciar la solicitud con anticipación, pero espera una autorización inequívoca o aplica la contingencia correspondiente si existe una necesidad de seguridad inmediata." },
          { q: "¿Qué alternativa se prueba primero para recuperar voz?", a: "La frecuencia HF secundaria asignada y los medios alternos autorizados para esa región. No se inventa ni se toma una frecuencia de una lista antigua sin verificar la publicación vigente." },
          { q: "Si llega una respuesta retransmitida con un número ininteligible, ¿cómo se cierra?", a: "Se pide repetición o aclaración del elemento dudoso, se colaciona la autorización completa requerida y se confirma que el operador escuchó correctamente la colación. Un dato no entendido no se ejecuta." },
        ],
        concepto: "La propagación difícil exige mejores verificaciones, no menos colación.",
      },
      {
        kind: "enLaOperacion",
        momento: "HF como medio de largo alcance",
        texto: "El piloto que monitorea (PM, Pilot Monitoring) administra radio, copia y confirma la información; el piloto que vuela (PF, Pilot Flying) mantiene la trayectoria autorizada y valida el efecto de cualquier cambio. El reparto específico depende del procedimiento del operador. Una prueba SELCAL eficaz reduce la necesidad de escuchar continuamente el ruido HF, pero no elimina la obligación de conservar la capacidad de comunicación exigida ni de atender una llamada.",
        pasos: [
          "Registrar estación, primaria, secundaria y estado del contacto antes de la transferencia.",
          "Separar solicitud, expectativa y autorización retransmitida; una no sustituye a la otra.",
          "Ante inteligibilidad insuficiente, confirmar antes de cambiar ruta, velocidad o nivel.",
        ],
      },
      { kind: "callout", tone: "warn", title: "El operador de radio no es el controlador", text: "La estación transmite y retransmite mensajes ATS, pero no crea autorizaciones. Una aprobación debe provenir del control competente; su contenido crítico se colaciona aunque haya ruido o demora." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "HF permite voz a larga distancia mediante propagación ionosférica variable.",
          "En muchas operaciones oceánicas, el contacto pasa por un operador de radio sin autoridad ATC propia.",
          "Primaria y secundaria se reciben de la estación o fuente vigente; no se inventan.",
          "Ruido y demora obligan a anticipar solicitudes y confirmar datos críticos.",
          "CPDLC o SATVOICE no eliminan automáticamente las obligaciones HF de cada región.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "FAA AC 91-70D · AIP USA ENR 7.2 · OACI NAT Doc 007",
        bloques: [
          { kind: "p", text: "FAA, AC 91-70D vigente, secciones 4.3.1 y D.2.2.8: propagación y variabilidad HF, papel del operador de radio, colación y comprobación de las radios: https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_91-70D.pdf" },
          { kind: "p", text: "FAA, AIP Estados Unidos ENR 7.2: New York Radio, prueba SELCAL, asignación primaria/secundaria y exigencia de conservar HF en New York Oceanic: https://www.faa.gov/air_traffic/publications/atpubs/aip_html/part2_enr_section_7.2.html" },
          { kind: "p", text: "OACI, NAT Doc 007 edición 2026-1, sección 5.1: comunicaciones HF en el Atlántico Norte y retransmisión por estaciones aeronáuticas. Las instrucciones regionales se contrastan con la AIP del Estado: https://www.icao.int/sites/default/files/EURNAT/Documents/EUR%20and%20Nat%20Docs/NAT%20Documents/NAT%20Documents/NAT%20Doc%20007/NAT-Doc-007-EN-Edition-V.2026-1-Amd-0.pdf" },
          { kind: "p", text: "Aerocivil, AIP/eAIP oficial para estaciones, frecuencias y requisitos colombianos; esta lección no asigna ninguna frecuencia ni procedimiento local: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "La historieta y el escenario son construcciones didácticas, no transcripciones de una comunicación real ni cartas o frecuencias operativas." },
        ],
      },
    ],
  },
  // ── 49 ──────────────────────────────────────────────────────────────────
  {
    n: 49,
    title: "SELCAL",
    kicker: "La llamada selectiva y su comprobación",
    minutes: 6,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "**SELCAL** es un «sistema que permite la llamada selectiva de aeronaves por separado en canales radiotelefónicos que enlazan una estación terrestre con la aeronave» (Doc 9432, cap. 1). La estación transmite un código de tonos asignado al avión; solo ese avión lo decodifica y en la cabina suena un aviso (campanilla y luz).",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**Para qué sirve.** Permite no escuchar la HF todo el tiempo. Con SELCAL comprobado, la tripulación puede bajar el volumen de HF y la estación la llama con el código cuando la necesita. Que esa escucha reducida esté permitida depende del procedimiento de cada región (VERIFICAR).",
          "**El código.** Cada avión tiene un código de cuatro letras, que se declara en el plan de vuelo (VERIFICAR).",
          "**SELCAL check.** Al hacer el primer contacto con una estación HF se pide una prueba: la estación envía el código y la tripulación confirma que sonó. Sin prueba correcta, no se confía en SELCAL.",
          "**Si no funciona**, se vuelve a la escucha continua de la frecuencia HF (VERIFICAR).",
          "**Al responder a una llamada SELCAL** se llama a la estación con el distintivo; ella da el mensaje.",
        ],
      },
      {
        kind: "hueco",
        rotulo: "CM-49-01 · Fotografía · 4:3 · 1200×900 px",
        descripcion:
          "Imagen sugerida: Panel de audio genérico de un avión de transporte con el indicador luminoso de SELCAL encendido y la perilla de volumen HF baja. Si no hay foto con licencia, esquema limpio del panel. Rótulo con recuadro numerado: 1 luz SELCAL, 2 volumen HF. Objetivo: Que el piloto reconozca el aviso SELCAL y relacione el volumen bajo de HF con el SELCAL probado.",
        alto: 340,
        ratio: "4 / 3",
        anchoMax: 480,
      },
      { kind: "sub", text: "Fraseología OACI" },
      {
        kind: "p",
        text: "Todos los ejemplos de este capítulo van con VERIFICAR: el Doc 9432 cap. 11.1 (SELCAL) no está cargado.",
      },
      COMO_LEER,
      verificar(
        "Toda la fraseología de esta lección («request SELCAL check», «SELCAL okay», la respuesta a una llamada SELCAL) está sin verificar: consultar el Doc 9432 cap. 11.1 y el Anexo 10 Vol. II cap. 5. El código de cuatro letras y su declaración en el plan de vuelo (casilla 18, «SEL/»): Doc 4444 apéndice 2. Cuándo SELCAL permite reducir la escucha continua de HF y qué hacer si falla: Anexo 10 Vol. II, NAT Doc 007 y documentación del Pacífico.",
      ),
      ...ejemplo(
        "Ejemplo 1 · Pedir la prueba de SELCAL (VERIFICAR)",
        [
          `PILOT:       "Oceanic Radio, Aviatory 452, request SELCAL check, Alfa Bravo Charlie Delta."`,
          `ATC (radio): "Aviatory 452, Oceanic Radio, SELCAL check."`,
          `PILOT:       "SELCAL okay, Aviatory 452."`,
        ],
        "Significado: la estación transmite el código; el piloto confirma que el aviso sonó.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Prueba fallida (VERIFICAR / PLAIN LANGUAGE)",
        [`PILOT:       "Oceanic Radio, Aviatory 452, negative SELCAL, request check again."`],
        "Significado: no sonó. Se pide repetir; si vuelve a fallar, se informa y se mantiene escucha continua.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Respuesta a una llamada SELCAL (VERIFICAR)",
        [
          `PILOT:       "Oceanic Radio, Aviatory 452."`,
          `ATC (radio): "Aviatory 452, (mensaje)."`,
        ],
        "Significado: el avión responde a la llamada selectiva con los dos distintivos (ver la nota sobre GO AHEAD en el capítulo 48) y queda a la escucha del mensaje.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Informar que el SELCAL no funciona (PLAIN LANGUAGE)",
        [`PILOT:       "Oceanic Radio, Aviatory 452, SELCAL inoperative, maintaining listening watch on eight eight two five."`],
        "Significado: la estación sabe que no puede llamar con código y que la tripulación escucha la frecuencia (ficticia).",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En la entrada oceánica",
        texto: "En la entrada oceánica: contacto inicial HF, SELCAL check, y luego volumen de HF bajo con el SELCAL armado. Cuando suena, un piloto contesta y anota. En la transferencia a la siguiente estación, nuevo contacto y nueva prueba.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Código SELCAL equivocado", "Dar un código SELCAL equivocado (el de otro avión de la flota)."),
      error("Bajar la HF sin prueba", "Bajar el volumen de HF sin haber hecho la prueba."),
      error("Callar un SELCAL que falló", "No informar un SELCAL que falló y quedar ilocalizable."),
      error("Silenciar la campanilla", "Silenciar la campanilla y no llamar a la estación."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "SELCAL = llamada selectiva: la estación llama solo a tu avión.",
          "Permite no escuchar la HF todo el tiempo, según la región.",
          "Código de cuatro letras.",
          "Prueba en cada contacto inicial.",
          "Si falla: informar y escucha continua.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          { kind: "p", text: "Doc 9432 (4.ª ed.) cap. 1 (definición SELCAL)." },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: toda la fraseología de este capítulo («request SELCAL check», «SELCAL okay», respuesta a una llamada SELCAL) contra Doc 9432 cap. 11.1 y Anexo 10 Vol. II cap. 5 (no cargados).",
              "VERIFICAR: código de cuatro letras y su declaración en el plan de vuelo (casilla 18, «SEL/») contra Doc 4444 apéndice 2 (no cargado).",
              "VERIFICAR: cuándo SELCAL permite reducir la escucha continua de HF y qué hacer si falla, contra Anexo 10 Vol. II, NAT Doc 007 y documentación del Pacífico (no cargados).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 50 ──────────────────────────────────────────────────────────────────
  {
    n: 50,
    title: "Comunicaciones oceánicas",
    kicker: "HF, CPDLC, ADS-C y SELCAL juntos",
    minutes: 10,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "La suma de todo este nivel, aplicada al vuelo fuera de la cobertura VHF y radar: **HF** (con SELCAL) para la voz, **CPDLC** para las autorizaciones, **ADS-C** para la posición, **informes de posición** cuando no hay ADS-C, y **contingencias** cuando algo falla.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**Antes de entrar**: logon (Doc 4444, 4.15.1.1), contacto HF, SELCAL check, y la autorización oceánica si la región la exige (VERIFICAR).",
          "**Informes de posición.** En rutas con puntos designados se dan al pasar cada punto de notificación obligatoria (Doc 4444, 4.11.1.1). En rutas sin puntos designados, tan pronto como sea posible después de la primera media hora de vuelo y luego cada hora (4.11.1.2). Con ADS-C u otra fuente puede haber exención (4.11.1.3).",
          "**Contenido del informe** (Doc 4444, 4.11.2.1; Doc 9432, 3.4.1): identificación, posición, hora, nivel, posición siguiente y hora, y punto significativo siguiente. Los tres últimos pueden omitirse por acuerdo regional; el nivel se incluye en la llamada inicial en una frecuencia nueva. Si te asignaron velocidad, va en el informe (4.11.2.2).",
          "**Cambio de FIR.** Cuando la AIP lo prescribe o la dependencia lo pide, el último informe antes del límite se da también a la dependencia siguiente (Doc 4444, 4.11.1.4).",
          "**Informe que no llega.** Si el ATC no recibe un informe a la hora prevista, no supone que la estimada era exacta y busca obtenerlo (Doc 4444, 4.11.1.5). Una estimada que cambia se corrige.",
          "**Aeronotificaciones especiales.** Turbulencia o engelamiento moderado o fuerte, ondas orográficas fuertes, tormentas oscurecidas o en línea, tempestad fuerte de polvo o arena, cenizas volcánicas y actividad volcánica se notifican (Doc 4444, 4.12.3.1). Por voz llevan posición, hora, nivel y la condición (4.12.3.3).",
          "**Contingencias.** Si falla CPDLC: voz (HF o SATCOM). Si falla la HF: CPDLC, SATCOM, relevo por otra aeronave o por la frecuencia aire-aire designada en la región (VERIFICAR). Los procedimientos de contingencia oceánica (desvío, descenso de emergencia, desviación por tiempo sin autorización) están en el Doc 4444, 15.2, no cargado: van con VERIFICAR y se tratan en su capítulo.",
        ],
      },
      {
        kind: "secuencia",
        titulo: "El informe de posición (Doc 4444, 4.11.2.1; Doc 9432, 3.4.1)",
        items: ["Identificación", "Posición", "Hora", "Nivel", "Posición siguiente y hora", "Punto significativo siguiente"],
      },
      {
        kind: "hueco",
        rotulo: "CM-50-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion:
          "Imagen sugerida: Ruta sobre el océano de una costa a otra (costas genéricas, sin nombres reales). En la costa de salida: «VHF / radar». En el tramo oceánico, sobre el avión, tres capas rotuladas: «HF + SELCAL (voz)», «CPDLC (autorizaciones)», «ADS-C (posición automática)». Puntos ficticios GIKOS, ODRAK, PUVEL con un globo «informe de posición» en cada uno. En la costa de llegada: «VHF / radar». Un recuadro lateral: «Si falla: CPDLC ↔ HF ↔ SATCOM». Objetivo: Que el piloto vea cómo se reparten los medios en un cruce oceánico y qué respaldo tiene cada uno.",
        alto: 280,
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "El formato del informe de posición con coordenadas y con Mach («Mach decimal eight two», «five five north two zero west», ejemplos 3 y 4) está sin verificar: NAT Doc 007, documentación del Pacífico y Doc 9432 cap. 8. Las palabras exactas de la aeronotificación especial por voz («special air-report», ejemplo 5): Doc 4444 apéndice 1. El formato y la exigencia de la autorización oceánica (ejemplo 7): NAT Doc 007 y AIP de cada Estado. Los procedimientos de contingencia oceánica y la frecuencia aire-aire regional: Doc 4444 15.2 y Doc 7030.",
      ),
      ...ejemplo(
        "Ejemplo 1 · Informe de posición en el formato del Doc 9432 (3.4.1), con puntos ficticios",
        [
          `PILOT:       "Oceanic Radio, Aviatory 452, GIKOS 47, flight level 330, ODRAK 57, PUVEL next."`,
          `ATC (radio): "Aviatory 452, roger."`,
        ],
        "Significado: sobre GIKOS a los 47, FL330, estima ODRAK a los 57, siguiente PUVEL. Es el mismo orden del ejemplo «FASTAIR 345 WICKEN 47 FL 330 MARLO 57 COLIN NEXT». ROGER aquí basta: es un informe, no una autorización.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Informe con corrección (Doc 9432, 2.8.1.6)",
        [`PILOT:       "Aviatory 452, GIKOS 47, flight level 330, ODRAK 07, correction ODRAK 57."`],
        "Significado: «correction» y se repite el grupo correcto.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Informe con velocidad asignada (Doc 4444, 4.11.2.2; forma de decir el Mach VERIFICAR)",
        [`PILOT:       "Oceanic Radio, Aviatory 452, GIKOS 1235, flight level 350, Mach decimal eight two, ODRAK 1318, PUVEL next."`],
        "Significado: con número de Mach asignado, se incluye en cada informe.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Informe con coordenadas (formato VERIFICAR por región: NAT, Pacífico)",
        [`PILOT:       "Oceanic Radio, Aviatory 452, position five five north two zero west at 1235, flight level 350, estimating five five north three zero west at 1318, next five four north four zero west."`],
        "Significado: en rutas definidas por latitud y longitud, la posición se dice en coordenadas. Cómo se abrevian y en qué orden se dicen cambia entre regiones.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Aeronotificación especial por voz (contenido Doc 4444, 4.12.3.3; forma de las palabras VERIFICAR)",
        [`PILOT:       "Oceanic Radio, Aviatory 452, special air-report, TIMSA 1402, flight level 350, severe turbulence."`],
        "Significado: tipo de mensaje, posición, hora, nivel y la condición. Se transmite tan pronto como sea posible (4.12.1.1).",
      ),
      ...ejemplo(
        "Ejemplo 6 · Instrucciones de informe (Doc 9432, 3.4.2)",
        [
          `ATC (radio): "Aviatory 452, next report BERUX."`,
          `PILOT:       "Wilco, Aviatory 452."`,
        ],
        "Significado: se sabe dónde es el próximo informe.",
      ),
      ...ejemplo(
        "Ejemplo 7 · Autorización oceánica (formato VERIFICAR; el del Atlántico Norte está en NAT Doc 007)",
        [
          `ATC:         "Aviatory 452, cleared to Santa Cleta via GIKOS, (ruta), flight level 350, Mach decimal eight two."`,
          `PILOT:       (colación completa), "Aviatory 452."`,
        ],
        "Significado: ruta, nivel y velocidad de la parte oceánica. Es una autorización de ruta: se colaciona completa (Doc 4444, 4.5.7.5.1 a).",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Un cruce oceánico",
        texto: "Secuencia típica de un cruce, sujeta al procedimiento de cada región y del operador:",
        pasos: [
          "Antes de la costa: autorización oceánica (voz o data link), logon CPDLC/ADS-C, frecuencia HF y SELCAL check.",
          "En la entrada: comprobar que la ruta del FMS es la autorizada, punto por punto.",
          "En crucero: CPDLC para solicitudes y autorizaciones; ADS-C reporta; informes por voz solo si no hay ADS-C o si se piden.",
          "En cada punto: comprobar la estimada al siguiente y corregirla si cambia.",
          "En la salida del espacio oceánico: transferencia de conexión y regreso a VHF.",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error("Entrar sin autorización oceánica", "Entrar al espacio oceánico sin autorización oceánica donde se exige."),
      error("Ruta del FMS distinta de la autorizada", "Ruta del FMS distinta de la autorizada (un punto mal copiado): el ADS-C reporta la ruta equivocada y el avión la vuela."),
      error("Estimada vieja", "Informe de posición con estimada vieja."),
      error("Sin plan para la falla doble", "No saber qué hacer si falla la HF y el CPDLC al mismo tiempo: la contingencia se estudia antes del vuelo."),
      error("Aceptar a medio escuchar", "Aceptar por HF una autorización a medio escuchar porque el relevo tarda."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "En oceánico: HF + SELCAL para voz, CPDLC para control, ADS-C para posición.",
          "Informe: quién, dónde, cuándo, nivel, próximo y hora, siguiente.",
          "Estimada que cambia, estimada que se corrige.",
          "Cada región tiene su formato: se estudia antes de volarla.",
          "Si algo falla, hay otro medio; la contingencia se prepara en tierra.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1, 4.11.1.1 a 4.11.1.5, 4.11.2.1, 4.11.2.2, 4.12.1.1, 4.12.3.1, 4.12.3.3, 4.15.1.1; Doc 9432 (4.ª ed.) 2.8.1.6, 3.4.1, 3.4.2.",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: formato del informe de posición con coordenadas y con Mach («Mach decimal eight two», «five five north two zero west») contra NAT Doc 007, documentación del Pacífico y Doc 9432 cap. 8 (no cargados).",
              "VERIFICAR: palabras exactas de la aeronotificación especial por voz («special air-report») contra Doc 4444 apéndice 1 (no cargado).",
              "VERIFICAR: formato y exigencia de la autorización oceánica contra NAT Doc 007 y AIP de cada Estado (no cargados).",
              "VERIFICAR: procedimientos de contingencia oceánica y frecuencia aire-aire regional contra Doc 4444 15.2 y Doc 7030 (no cargados).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
]
