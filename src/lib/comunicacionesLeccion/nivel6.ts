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
    kicker: "Ventajas y límites de cada uno",
    minutes: 8,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Dos medios para la misma relación piloto-controlador. La voz es inmediata y todos en la frecuencia la escuchan. El CPDLC deja texto escrito, no se bloquea con otras transmisiones y no depende de la pronunciación. Ninguno reemplaza del todo al otro: el CPDLC complementa la voz y, si el data link falla, todo vuelve a la voz.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "table",
        head: ["", "Voz (VHF / HF)", "CPDLC"],
        rows: [
          ["Rapidez", "Inmediata en VHF; en HF puede ir por un operador de radio", "Depende del tiempo de transacción (RCP)"],
          ["Lo tácticamente urgente", "Es el medio para lo inmediato", "No es el medio para lo inmediato (VERIFICAR)"],
          ["Colación", "Obligatoria en lo del Doc 4444, 4.5.7.5.1", "**No se requiere colación oral**, salvo que la autoridad ATS lo prescriba (Doc 4444, 4.5.7.5.2.1). La respuesta es WILCO/UNABLE en pantalla"],
          ["Errores de oído", "Números mal escuchados, distintivos parecidos, transmisiones bloqueadas", "Se eliminan casi todos, pero aparecen los de **lectura**: leer rápido, aceptar sin cruzar"],
          ["Registro", "Queda solo en la memoria y en lo anotado", "Queda escrito en pantalla"],
          ["Conciencia de tráfico", "Escuchas lo que se les dice a los demás", "Se pierde: no ves las autorizaciones de otros"],
          ["Idioma", "Pronunciación y comprensión oral", "Comprensión escrita; mensajes preformateados"],
          ["Situación no normal", "Plain language, matices, intenciones", "Limitado a mensajes y texto libre"],
        ],
      },
      { kind: "p", text: "Tres ideas que se deducen de las fuentes:" },
      {
        kind: "list",
        items: [
          "**La colación oral no aplica a CPDLC** (Doc 4444, 4.5.7.5.2.1). Pero la instrucción que llega por voz se colaciona siempre, aunque estés conectado por CPDLC.",
          "**El data link no elimina la necesidad del idioma.** El Doc 9835 (1.4.5) lo explica: la tecnología no se usa en todas partes, exige comprensión escrita y, si falla el equipo, piloto y controlador vuelven al lenguaje natural.",
          "**Depende del entorno.** En oceánico, donde la voz es HF y a veces por operador de radio, el CPDLC suele ser el medio principal. En terminal y aproximación la voz VHF manda.",
        ],
      },
      {
        kind: "hueco",
        rotulo: "CM-44-01 · Esquema · 1:1 · 1080×1080 px",
        descripcion:
          "Imagen sugerida: Dos columnas. Izquierda «VOZ»: micrófono, ondas, textos cortos «inmediata», «todos la escuchan», «se colaciona». Derecha «CPDLC»: pantalla con mensaje, textos «escrita», «sin colación oral», «se lee y se cruza». Abajo, a lo ancho, una franja: «Si hay duda o urgencia: voz». Objetivo: Que el piloto elija el medio según la situación y recuerde que la voz es el respaldo.",
        alto: 420,
        ratio: "1 / 1",
        anchoMax: 420,
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "Que el CPDLC no debe usarse para instrucciones que exigen acción inmediata y las reglas de paso a voz no están en las fuentes cargadas: consultar el Doc 4444 cap. 14 y el Doc 10037 cap. 3 y 4. La obligación de mantener escucha de voz (o SELCAL) con CPDLC activo: Doc 10037 cap. 4 y documentación regional. El texto «CLIMB TO FL350»: Doc 4444 apéndice 5 y Doc 10037 apéndice A. Si alguna región exige colación oral de algún mensaje CPDLC: AIP y Doc 7030.",
      ),
      { kind: "p", text: "La misma instrucción, por voz y por CPDLC:" },
      ...ejemplo(
        "Ejemplo 1 · La instrucción por voz",
        [
          `ATC (voz):   "Aviatory 452, climb to flight level three five zero."`,
          `PILOT (voz): "Climb to flight level three five zero, Aviatory 452."`,
        ],
        "Significado: por voz se colaciona el nivel (Doc 4444, 4.5.7.5.1 c).",
      ),
      ...ejemplo(
        "Ejemplo 2 · La misma instrucción por CPDLC (VERIFICAR texto)",
        [
          `UPLINK:            "CLIMB TO FL350"`,
          `PILOT (downlink):  "WILCO"`,
        ],
        "Significado: por CPDLC no hay colación oral; WILCO es el compromiso de cumplir (Doc 4444, 4.5.7.5.2.1; Doc 9432, 2.6).",
      ),
      ...ejemplo(
        "Ejemplo 3 · Voz con UNABLE y motivo (Doc 9432, 2.8.3.10, adaptado)",
        [
          `ATC:   "Aviatory 452, climb to flight level three nine zero."`,
          `PILOT: "Unable flight level three nine zero due weight, Aviatory 452."`,
        ],
        "Significado: igual que el ejemplo del manual («UNABLE TO CROSS WICKEN FL 150 DUE WEIGHT»), la negativa va con motivo.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Pasar de CPDLC a voz ante un mensaje ambiguo (PLAIN LANGUAGE con palabras normalizadas)",
        [
          `PILOT: "Oceanic Control, Aviatory 452, CPDLC route clearance not clear, request voice clearance."`,
          `ATC:   "Aviatory 452, standby."`,
        ],
        "Significado: la tripulación no ejecuta una ruta que no entiende; la pide por voz. STANDBY no es autorización (Doc 9432, 2.6).",
      ),
      ...ejemplo(
        "Ejemplo 5 · Situación no normal: la voz es mejor (PLAIN LANGUAGE)",
        [`PILOT: "Oceanic Control, Aviatory 452, we have a pressurization problem, request descent to flight level two five zero."`],
        "Significado: una situación que exige matices, intenciones o acción inmediata va por voz. Declarar urgencia o socorro sigue las reglas de los capítulos 34 a 36.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En crucero con CPDLC",
        texto: "En cabina se define quién gestiona la pantalla CPDLC y quién la frecuencia de voz, para que ninguna de las dos quede sin atención. Lo fija el SOP.",
        pasos: [
          "Con CPDLC en crucero se sigue escuchando la frecuencia de voz asignada (o SELCAL en HF) porque el controlador puede llamar.",
          "Si un uplink y una instrucción de voz se contradicen, no se ejecuta ninguno hasta aclararlo por voz.",
        ],
      },
      { kind: "sub", text: "Error frecuente" },
      error("Dejar de escuchar la frecuencia", "Pensar que con CPDLC ya no hace falta escuchar la frecuencia."),
      error("Colacionar por voz lo que llegó por CPDLC", "Colacionar por voz lo que llegó por CPDLC sin que la autoridad lo pida: ocupa la frecuencia sin necesidad."),
      error("No colacionar lo que llegó por voz", "No colacionar por voz lo que llegó por voz porque «estamos en CPDLC»."),
      error("Texto libre largo en una situación no normal", "Usar texto libre largo para una situación no normal en vez de llamar."),
      error("Perder la conciencia de tráfico", "Perder la conciencia de tráfico: sin voz, no escuchas que otro avión fue autorizado a tu nivel."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Voz: inmediata y compartida. CPDLC: escrita, sin errores de oído, sin colación oral.",
          "CPDLC no se colaciona por voz salvo que la autoridad ATS lo exija (Doc 4444, 4.5.7.5.2.1).",
          "Lo urgente y lo no normal van por voz.",
          "El data link no reemplaza el idioma (Doc 9835, 1.4.5).",
          "Aunque haya CPDLC, se escucha la voz.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432 · Doc 9835",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1, 4.5.7.5.2.1, cap. 1 (RCP); Doc 9432 (4.ª ed.) 2.6, 2.8.3.10; Doc 9835 (2.ª ed.) 1.4.5.",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: que el CPDLC no debe usarse para instrucciones que exigen acción inmediata y las reglas de paso a voz, contra Doc 4444 cap. 14 y Doc 10037 cap. 3 y 4 (no cargados).",
              "VERIFICAR: obligación de mantener escucha de voz (o SELCAL) con CPDLC activo, contra Doc 10037 cap. 4 y documentación regional (no cargados).",
              "VERIFICAR: texto «CLIMB TO FL350» contra Doc 4444 apéndice 5 / Doc 10037 apéndice A.",
              "VERIFICAR: si la autoridad ATS de cada región exige colación oral de algún mensaje CPDLC, contra AIP y Doc 7030.",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 45 ──────────────────────────────────────────────────────────────────
  {
    n: 45,
    title: "Autorización de salida por data link",
    kicker: "DCL y PDC",
    minutes: 5,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "La autorización de salida (ruta, SID, nivel inicial, código SSR, frecuencia de salida) entregada por data link en vez de por voz en la frecuencia de entrega de autorizaciones. Existen dos familias:",
      },
      {
        kind: "glosario",
        items: [
          {
            k: "DCL (departure clearance)",
            v: "servicio ATS de data link. La segunda edición del GOLD tenía en su alcance el **CPDLC-DCL**, la autorización de salida por CPDLC (presentación FAA 2017).",
          },
          {
            k: "PDC (pre-departure clearance)",
            v: "en algunos Estados la autorización se entrega a través de la red de datos de la compañía (ACARS) o de una impresora, no como diálogo CPDLC (VERIFICAR).",
          },
        ],
      },
      { kind: "p", text: "Cuál se usa, cómo se pide y cómo se confirma depende de cada aeropuerto." },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**Es una autorización ATC completa.** Se lee con la misma atención que una por voz: límite, ruta, SID, nivel, código SSR, frecuencia.",
          "**La confirmación varía.** En unos sistemas se acepta en pantalla; en otros hay que llamar por voz a entrega o a superficie para confirmar que se recibió. Lo dice la AIP del aeródromo (VERIFICAR).",
          "**Si no llega o no coincide con lo planificado**, se pide por voz. No se sale con una autorización dudosa.",
          "Una PDC que llega por el canal de la compañía **es una autorización ATC**, aunque llegue por la misma impresora que el mensaje de la compañía.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "La definición de DCL y de PDC, y dónde se usa cada una, no están en las fuentes cargadas: consultar el Doc 10037 (2.ª ed.), el Doc 4444 16.ª ed. cap. 14 y la AIP de los Estados de operación. El procedimiento de confirmación por voz de DCL/PDC es de cada aeródromo: AIP (AD 2.20 o equivalente); en Colombia, AIP Colombia. Las llamadas de esta lección son PLAIN LANGUAGE y su forma exacta depende del aeródromo.",
      ),
      ...ejemplo(
        "Ejemplo 1 · Autorización por voz como respaldo cuando la DCL no llega (PLAIN LANGUAGE en la primera línea)",
        [
          `PILOT: "Bogota Delivery, Aviatory 452, departure clearance by data link not received, request clearance by voice."`,
          `ATC:   "Aviatory 452, cleared to Santa Cleta, (SID), flight level (nivel), squawk (código)."`,
          `PILOT: (colación completa de la autorización), "Aviatory 452."`,
        ],
        "Significado: la ruta y el código se colacionan siempre (Doc 4444, 4.5.7.5.1 a y c). El formato de la autorización se ve en el capítulo 14.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Confirmar por voz la recepción de una DCL (PLAIN LANGUAGE; la forma exacta depende del aeródromo)",
        [`PILOT: "Bogota Ground, Aviatory 452, stand 24, departure clearance received by data link, squawk (código), information Bravo, request start up."`],
        "Significado: dice qué recibió, el código asignado y el ATIS, y pide lo siguiente.",
      ),
      ...ejemplo(
        "Ejemplo 3 · La DCL no coincide con el plan (PLAIN LANGUAGE)",
        [`PILOT: "Bogota Delivery, Aviatory 452, data link clearance shows different SID from flight plan, confirm SID."`],
        "Significado: una discrepancia se aclara por voz antes de cargarla en el FMS. «Confirm» es palabra normalizada (Doc 9432, 2.6).",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En el puesto de estacionamiento",
        texto: "La autorización llega a la cabina, un piloto la carga o la revisa contra el FMS y el otro la cruza. Si el sistema es DCL por CPDLC, se responde en pantalla; si es PDC, se sigue el procedimiento de confirmación del aeropuerto.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Leer solo la SID", "Leer solo la SID y no ver que cambió el nivel inicial o el código."),
      error("Suponer que la PDC es el plan", "Suponer que la PDC impresa es igual al plan de vuelo presentado."),
      error("Olvidar la confirmación por voz", "Olvidar la confirmación por voz que exige el aeropuerto."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "DCL/PDC = autorización de salida por data link.",
          "DCL (servicio ATS, CPDLC-DCL) no es lo mismo que PDC (por red de la compañía en algunos Estados).",
          "Se lee y se cruza completa.",
          "La confirmación la fija cada aeropuerto.",
          "Si falta o no cuadra: voz.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432 · FAA 2017 (GOLD)",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Presentación FAA 2017 sobre el GOLD (CPDLC-DCL en el alcance de la 2.ª ed. del Doc 10037); Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1; Doc 9432 (4.ª ed.) 2.6.",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: definición de DCL y de PDC, y dónde se usa cada una, contra Doc 10037 (2.ª ed.), Doc 4444 16.ª ed. cap. 14 y AIP de los Estados de operación (no cargados).",
              "VERIFICAR: procedimiento de confirmación por voz de DCL/PDC en cada aeródromo, contra la AIP (AD 2.20 o equivalente). En Colombia, AIP Colombia.",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 46 ──────────────────────────────────────────────────────────────────
  {
    n: 46,
    title: "ACARS",
    kicker: "Comunicaciones con la compañía, y por qué no es CPDLC",
    minutes: 5,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "**ACARS** es un sistema de enlace de datos entre la aeronave y tierra que las aerolíneas usan para su comunicación operacional. No es un término definido en los documentos OACI cargados; sus normas son de la industria (VERIFICAR).",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**Por ACARS pasan**, según el operador: mensajes con despacho y mantenimiento, horas de salida y llegada, meteorología, D-ATIS, datos de carga y, en ciertos sistemas, autorizaciones de salida (PDC) (VERIFICAR).",
          "**ACARS y CPDLC no son sinónimos.** CPDLC es un servicio ATC (control). ACARS es un medio de datos, sobre todo de la compañía. En FANS 1/A, los mensajes CPDLC pueden viajar por la red ACARS, pero siguen siendo mensajes ATC con sus propias reglas (VERIFICAR).",
          "**La prueba práctica**: si el mensaje es del controlador y te autoriza o te instruye, es ATC. Si es de tu compañía, no autoriza nada ante el ATC.",
          "Para hablar por voz con la compañía existe el sufijo **DISPATCH** (despacho de la compañía, Doc 9432, 2.7.1.1).",
        ],
      },
      verificar(
        "La definición y el alcance de ACARS (normas ARINC de la industria) y los mensajes que maneja no están en las fuentes cargadas: consultar la documentación del operador (FCOM / manual de operaciones). Que los mensajes CPDLC FANS 1/A viajan sobre la red ACARS: Doc 10037 cap. 1. El uso de ACARS para PDC y D-ATIS en los aeropuertos de operación: la AIP respectiva.",
      ),
      { kind: "sub", text: "Fraseología OACI" },
      { kind: "p", text: "ACARS no tiene fraseología ATC. Los ejemplos muestran dónde se cruza con la voz." },
      COMO_LEER,
      ...ejemplo(
        "Ejemplo 1 · Llamada de voz a la compañía (sufijo del Doc 9432, 2.7.1.1; resto PLAIN LANGUAGE)",
        [`PILOT: "Aviatory Dispatch, Aviatory 452, ACARS inoperative, request updated weather for Santa Cleta."`],
        "Significado: si el ACARS falla, la compañía se contacta por voz.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Un mensaje de la compañía no reemplaza al ATC (PLAIN LANGUAGE)",
        [`PILOT: "Oceanic Control, Aviatory 452, company requests flight level three seven zero, request climb flight level three seven zero."`],
        "Significado: la compañía sugiere; el ATC autoriza. Solo cuenta la autorización del ATC.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Pedir la frecuencia de voz porque no llega el D-ATIS (PLAIN LANGUAGE)",
        [`PILOT: "Las Guindas Approach, Aviatory 452, data link ATIS not available, request ATIS frequency."`],
        "Significado: sin data link, el ATIS se escucha por voz.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Toda la rotación",
        texto: "En una cabina de aerolínea ACARS es rutina: se reciben el plan, la carga, el tiempo y los mensajes del despacho. La tripulación separa siempre lo que es de la compañía de lo que es del ATC, aunque salga por la misma impresora o la misma pantalla.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Llamar «ACARS» a la pantalla de CPDLC", "Llamar «ACARS» a la pantalla de CPDLC y tratar un uplink ATC como mensaje de la compañía, o al revés."),
      error("Cumplir lo que pidió la compañía sin autorización", "Ejecutar un cambio de nivel o de ruta que pidió la compañía sin autorización del ATC."),
      error("D-ATIS con la letra vieja", "Confiar en un D-ATIS por ACARS con la letra vieja."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "ACARS = data link de la aerolínea: despacho, tiempo, D-ATIS, datos operacionales.",
          "CPDLC = control ATC por data link.",
          "Pueden compartir medio, no función.",
          "La compañía sugiere; el ATC autoriza.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 9432",
        bloques: [
          { kind: "sub", text: "Verificado" },
          { kind: "p", text: "Doc 9432 (4.ª ed.) 2.7.1.1 (sufijo DISPATCH / DESPACHO)." },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: definición y alcance de ACARS (normas ARINC de la industria) y los mensajes que maneja, contra la documentación del operador (FCOM / manual de operaciones) (no cargados).",
              "VERIFICAR: que los mensajes CPDLC FANS 1/A viajan sobre la red ACARS, contra Doc 10037 cap. 1 (no cargado).",
              "VERIFICAR: uso de ACARS para PDC y D-ATIS en los aeropuertos de operación, contra la AIP respectiva.",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 47 ──────────────────────────────────────────────────────────────────
  {
    n: 47,
    title: "ADS-C",
    kicker: "Contratos de reporte en espacio oceánico y remoto",
    minutes: 7,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "La **vigilancia dependiente automática, contrato (ADS-C)** es el medio que permite al sistema de tierra y a la aeronave establecer, por enlace de datos, las condiciones de un **acuerdo ADS-C**: cuándo se envían los informes y qué datos llevan (Doc 4444, cap. 1). La aeronave calcula su posición y la reporta sola, sin que la tripulación hable.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**Contratos.** El acuerdo se establece con uno o varios contratos (Doc 4444, cap. 1, nota a «Acuerdo ADS-C»). El Doc 4444 menciona los tipos: **periódico**, **relacionado con un suceso**, **de solicitud** y **modo de emergencia** (cap. 1, nota a ADS-C).",
          "**Qué se reporta.** Bloques de datos (Doc 4444, 4.11.5.1): identificación, ADS-C básica (latitud, longitud, altitud, hora, factor de calidad), vector terrestre, vector aéreo, perfil proyectado (punto siguiente y siguiente+1 con altitud y hora), información meteorológica, intención prevista y perfil ampliado. El bloque básico es obligatorio; en un informe de emergencia o urgencia va la situación (4.11.5.2).",
          "**Quién lo fija.** La dependencia ATC define qué y cada cuánto se reporta y lo comunica por el acuerdo ADS-C (Doc 4444, 4.11.4).",
          "**Reemplaza informes de voz.** Con datos de otras fuentes, como ADS-C, la autoridad puede eximir de los informes de posición obligatorios (Doc 4444, 4.11.1.3 y nota).",
          "**Separación.** Las aplicaciones de la separación lateral de 30 NM requieren comunicación oral directa controlador-piloto o CPDLC, más ADS-C con contrato periódico y contratos de suceso de cambio de punto de recorrido y de desviación lateral (Doc 4444, 5.4.1.2.1.6, nota 3).",
          "**Relación con CPDLC.** Los dos arrancan con el mismo logon (DLIC) y el GOLD los trata juntos (presentación FAA 2017). Son servicios distintos: ADS-C vigila, CPDLC comunica. Puede haber uno sin el otro.",
          "**Meteorología.** La dependencia ATS reenvía a los centros mundiales de pronósticos de área los informes ADS-C con bloque meteorológico (Doc 4444, 4.12.6.1).",
        ],
      },
      { kind: "definicion", text: "ADS-C vigila. CPDLC comunica." },
      {
        kind: "hueco",
        rotulo: "CM-47-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion:
          "Imagen sugerida: Aeronave sobre el océano con tres flechas hacia un centro de control ficticio: «periódico: cada X minutos» (reloj), «suceso: cambio de punto de recorrido» (bandera en un punto), «suceso: desviación lateral» (desplazamiento de la derrota). Un cuarto recuadro «solicitud: el controlador pide un informe ya». Rótulo inferior: «ADS-C vigila. CPDLC comunica.» Objetivo: Que el piloto entienda qué dispara un informe ADS-C y que no lo tiene que enviar a mano.",
        alto: 280,
      },
      { kind: "sub", text: "Fraseología OACI" },
      {
        kind: "p",
        text: "ADS-C casi no genera voz: su objetivo es evitarla. Los intercambios aparecen cuando cambia la necesidad de informes de voz.",
      },
      COMO_LEER,
      verificar(
        "«ADS-C OUT OF SERVICE» (ejemplo 4) y el resto de la fraseología ADS-C no están en las fuentes cargadas: consultar el Doc 4444 16.ª ed., 12.5. Los procedimientos ADS-C de la tripulación (activación, cancelación, informe de emergencia): Doc 4444 cap. 13 y Doc 10037 cap. 4. En qué regiones ADS-C exime de informes de voz: NAT Doc 007, documentación del Pacífico y AIP.",
      ),
      ...ejemplo(
        "Ejemplo 1 · Eximir de informes de voz (Doc 9432, 3.4.2)",
        [
          `ATC:   "Aviatory 452, omit position reports until FIR boundary, next report GIKOS."`,
          `PILOT: "Wilco, Aviatory 452."`,
        ],
        "Significado: el controlador tiene la posición por otra fuente y libera la frecuencia. WILCO: entendido y se cumplirá.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Reanudar informes de voz (Doc 9432, 3.4.2)",
        [
          `ATC:   "Aviatory 452, resume position reporting."`,
          `PILOT: "Wilco, Aviatory 452."`,
        ],
        "Significado: por ejemplo, el ATC perdió los datos ADS-C; la tripulación vuelve a dar informes por voz en cada punto.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Próximo informe (Doc 9432, 3.4.2)",
        [
          `ATC:   "Aviatory 452, next report ODRAK."`,
          `PILOT: "Wilco, Aviatory 452."`,
        ],
        "Significado: el siguiente informe de voz es en ODRAK.",
      ),
      ...ejemplo(
        "Ejemplo 4 · ADS-C fuera de servicio (VERIFICAR)",
        [
          `ATC:   "Aviatory 452, ADS-C out of service, resume position reporting."`,
          `PILOT: "Wilco, Aviatory 452."`,
        ],
        "Significado: sin ADS-C, los informes vuelven a la voz o al CPDLC.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En un cruce oceánico con FANS",
        texto: "En un cruce oceánico con FANS la tripulación hace el logon y, desde ahí, el avión reporta solo. El trabajo de la tripulación es mantener el plan del FMS correcto: si la ruta del FMS no coincide con la autorizada, el perfil que ve el controlador también está mal.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Creer que ya no hay informes de voz", "Suponer que con ADS-C no hay que dar ningún informe de voz. Depende de la región y de lo que diga el controlador."),
      error("Un punto de más en el FMS", "Dejar en el FMS un punto que no está en la autorización: el perfil proyectado sale errado."),
      error("Confundir ADS-C con ADS-B", "Confundir ADS-C (contrato con una dependencia, por data link) con ADS-B (radiodifusión, Doc 4444, cap. 1)."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "ADS-C = la aeronave reporta sola según un contrato con la dependencia ATC.",
          "Contratos: periódico, de suceso, de solicitud, emergencia.",
          "Puede eximir de informes de posición por voz.",
          "Mismo logon que CPDLC; servicios distintos.",
          "Si se cae, vuelven los informes de voz.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432 · FAA 2017 (GOLD)",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 4444 (15.ª ed., Enm. 4) cap. 1 (ADS-C, acuerdo ADS-C, ADS-B), 4.11.1.3, 4.11.4, 4.11.5.1, 4.11.5.2, 4.12.6.1, 5.4.1.2.1.6 nota 3; Doc 9432 (4.ª ed.) 3.4.2; presentación FAA 2017 (DLIC, ADS-C y CPDLC en el GOLD).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: «ADS-C OUT OF SERVICE» y demás fraseología ADS-C contra Doc 4444 16.ª ed., 12.5 (no cargado).",
              "VERIFICAR: procedimientos ADS-C para la tripulación (activación, cancelación, informe de emergencia) contra Doc 4444 cap. 13 y Doc 10037 cap. 4 (no cargados).",
              "VERIFICAR: en qué regiones ADS-C exime de informes de voz, contra NAT Doc 007, documentación del Pacífico y AIP.",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
        ],
      },
    ],
  },
  // ── 48 ──────────────────────────────────────────────────────────────────
  {
    n: 48,
    title: "HF",
    kicker: "Propagación, calidad y reportes en largo alcance",
    minutes: 9,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "**HF** es alta frecuencia: 3 a 30 MHz (Doc 9432, cap. 1). **VHF** es muy alta frecuencia: 30 a 300 MHz (misma fuente). La VHF es la radio de todos los días, cercana y clara. La HF llega mucho más lejos y por eso es la voz de las rutas oceánicas y remotas, pero con peor calidad.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**Alcance.** La VHF es de línea de vista: su alcance depende de la altura y se acaba lejos de la costa. La HF se propaga reflejándose en la ionosfera y cubre miles de kilómetros; su calidad cambia con la hora, la estación del año y la actividad solar, y la mejor frecuencia de día no es la de la noche (VERIFICAR).",
          "**Ruido.** En HF son normales el ruido de fondo, el desvanecimiento y los cortes. La escala de inteligibilidad (Doc 9432, 2.8.4.3) es de 1 (ininteligible) a 5 (perfectamente inteligible).",
          "**Mismos procedimientos.** El Doc 9432 (preámbulo) dice que sus procedimientos, pensados para VHF, se aplican igual donde se usa HF.",
          "**Palabras que en HF sí se usan.** OVER y OUT «no se utilizan normalmente en comunicaciones VHF» (Doc 9432, 2.6). En HF, con retardo y ruido, marcan el fin de la transmisión y del intercambio. WORDS TWICE sirve cuando la comunicación es difícil (Doc 9432, 2.6). Si se prevé mala recepción, los elementos importantes se repiten (Doc 9432, 2.8.1.8).",
          "**Operadores de radio.** En muchas zonas oceánicas el piloto habla con una **estación aeronáutica** (sufijo RADIO, Doc 9432, 2.7.1.1), cuyo operador pasa los mensajes al controlador y devuelve las autorizaciones. No es comunicación directa controlador-piloto; el Doc 4444 las distingue (5.4.1.2.1.6, nota 3). Eso agrega tiempo: una solicitud puede tardar minutos.",
          "**Frecuencias primaria y secundaria.** Se asignan en pares o familias; si la primaria es mala, se prueba la secundaria (VERIFICAR).",
          "**SATCOM voz.** En aviones equipados existe voz por satélite; la OACI trabaja en su uso operacional (presentación FAA 2017, grupo OPDLWG). Cuándo reemplaza a la HF lo fija cada región (VERIFICAR).",
        ],
      },
      {
        kind: "hueco",
        rotulo: "CM-48-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion:
          "Imagen sugerida: Corte lateral de la Tierra con la costa a la izquierda. Una antena VHF con un haz recto que toca al avión cercano y pasa por encima del lejano (rótulo «VHF: línea de vista»). Una antena HF con un haz que sube, rebota en una capa rotulada «ionosfera» y baja hasta el avión sobre el océano (rótulo «HF: reflejo ionosférico, calidad variable»). Sin cifras de alcance. Objetivo: Que el piloto entienda por qué en oceánico la voz es HF y por qué su calidad cambia.",
        alto: 280,
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "Propagación HF y alcance VHF (línea de vista, variación día/noche): Anexo 10 Vol. III y el manual de la aeronave. Frecuencias primaria y secundaria y formato de la transferencia HF (ejemplo 5): Anexo 10 Vol. II cap. 5, Doc 9432 cap. 8 (8.10 control oceánico) y NAT Doc 007. Relevo de autorizaciones por operador de radio, «(unidad) clears (distintivo)…» (ejemplo 4): Doc 9432 cap. 8 y NAT Doc 007. Pronunciación de frecuencias HF en kHz: Anexo 10 Vol. II, 5.2.1.4. Estado de «GO AHEAD» (el Doc 9432 4.ª ed., nota a 2.6, lo da por omitido): Anexo 10 Vol. II vigente. SATCOM voz por región: Doc 10037 y documentación regional. Nada de esto está cargado.",
      ),
      ...ejemplo(
        "Ejemplo 1 · Contacto inicial en HF con una estación aeronáutica (estructura del Doc 9432 2.7 y 3.4.1; frecuencias ficticias)",
        [
          `PILOT:       "Oceanic Radio, Aviatory 452, on eight eight two five."`,
          `ATC (radio): "Aviatory 452, Oceanic Radio."`,
        ],
        "Significado: llamada inicial indicando la frecuencia. La estación contesta con los dos distintivos, que ya es la invitación a transmitir: el Doc 9432 (nota a 2.6) dice que se omitió «GO AHEAD» y que el distintivo de la estación que llama seguido del de la que contesta basta. En HF se sigue oyendo «go ahead» (VERIFICAR su estado en la fraseología vigente).",
      ),
      ...ejemplo(
        "Ejemplo 2 · Informe de inteligibilidad (Doc 9432, 2.8.4.3)",
        [
          `PILOT:       "Oceanic Radio, Aviatory 452, radio check eight eight two five."`,
          `ATC (radio): "Aviatory 452, Oceanic Radio, reading you three, loud background noise."`,
        ],
        "Significado: se entiende con dificultad. Con 3 conviene hablar más lento y repetir números.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Comunicación difícil (Doc 9432, 2.6 y 2.8.1.8)",
        [
          `ATC (radio): "Aviatory 452, words twice."`,
          `PILOT:       "Flight level three five zero, flight level three five zero, GIKOS one two three five, GIKOS one two three five, Aviatory 452."`,
        ],
        "Significado: «words twice» pide repetir cada grupo dos veces. Se hace con lo esencial.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Autorización por operador de radio (formato de relevo VERIFICAR)",
        [
          `ATC (radio): "Aviatory 452, Oceanic Control clears Aviatory 452 climb to flight level three seven zero, report reaching."`,
          `PILOT:       "Oceanic Control clears Aviatory 452 climb to flight level three seven zero, report reaching, Aviatory 452."`,
        ],
        "Significado: el operador de radio transmite la autorización del controlador. Se colaciona igual que una del ATC (Doc 4444, 4.5.7.5.1 c).",
      ),
      ...ejemplo(
        "Ejemplo 5 · Cambio de frecuencia HF (frecuencias ficticias, formato VERIFICAR)",
        [
          `ATC (radio): "Aviatory 452, contact Oceanic Radio, primary eight eight two five, secondary one three three one zero."`,
          `PILOT:       "Primary eight eight two five, secondary one three three one zero, Aviatory 452."`,
        ],
        "Significado: se anotan ambas; si la primaria no sirve, se llama en la secundaria.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Antes de perder la cobertura VHF",
        texto: "Antes de perder la cobertura VHF, la tripulación sintoniza la HF asignada, hace el contacto inicial y la prueba de SELCAL (capítulo 49). En crucero, con SELCAL, no se escucha la HF todo el tiempo. Las solicitudes se piden con tiempo porque la respuesta tarda. Muchos operadores usan CPDLC como medio principal y HF como respaldo.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Hablar rápido y largo", "Hablar rápido y largo en HF: se pierde la mitad."),
      error("No anotar la secundaria", "No anotar la frecuencia secundaria y quedarse sin contacto si la primaria se degrada."),
      error("Pedir en el último minuto", "Pedir un cambio de nivel en el último minuto, sin tener en cuenta la demora del relevo por operador de radio."),
      error("Colacionar a medias", "Colacionar a medias porque «la HF está mala»: con mala calidad, la colación importa más."),
      error("El volumen de HF sin SELCAL", "Dejar el volumen de HF alto sin SELCAL y cansar a la tripulación con el ruido, o bajarlo del todo sin SELCAL y perder llamadas."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "HF 3 a 30 MHz, largo alcance, calidad variable. VHF 30 a 300 MHz, corto alcance, clara.",
          "Mismos procedimientos que en VHF; OVER, OUT y WORDS TWICE tienen sentido en HF.",
          "Muchas veces hablas con un operador de radio, no con el controlador.",
          "Siempre primaria y secundaria.",
          "Hablar lento, repetir lo importante, colacionar completo.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 9432 · Doc 4444 · FAA 2017 (GOLD)",
        bloques: [
          { kind: "sub", text: "Verificado" },
          {
            kind: "p",
            text: "Doc 9432 (4.ª ed.) preámbulo (procedimientos aplicables en HF), cap. 1 (HF, VHF), 2.6 (OVER, OUT, WORDS TWICE, nota sobre GO AHEAD), 2.7.1.1 (sufijo RADIO), 2.8.1.8, 2.8.4.3, 3.4.1; Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1, 5.4.1.2.1.6 nota 3; presentación FAA 2017 (OPDLWG, voz por satélite).",
          },
          { kind: "sub", text: "Por verificar" },
          {
            kind: "list",
            items: [
              "VERIFICAR: propagación HF y alcance VHF (línea de vista, variación día/noche) contra Anexo 10 Vol. III y el manual de la aeronave (no cargados).",
              "VERIFICAR: uso de frecuencias primaria y secundaria y formato de la transferencia HF contra Anexo 10 Vol. II cap. 5, Doc 9432 cap. 8 (8.10 control oceánico) y NAT Doc 007 (no cargados).",
              "VERIFICAR: formato de relevo de autorizaciones por operador de radio («(unidad) clears (distintivo)…») contra Doc 9432 cap. 8 y NAT Doc 007 (no cargados).",
              "VERIFICAR: pronunciación de frecuencias HF en kHz contra Anexo 10 Vol. II, 5.2.1.4 (no cargado).",
              "VERIFICAR: estado de «GO AHEAD» en la fraseología vigente (Doc 9432 4.ª ed., nota a 2.6, lo da por omitido) contra Anexo 10 Vol. II vigente.",
              "VERIFICAR: uso de SATCOM voz por región contra Doc 10037 y documentación regional (no cargados).",
            ],
          },
          { kind: "sub", text: "Convenciones de los ejemplos" },
          CONVENCIONES,
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
