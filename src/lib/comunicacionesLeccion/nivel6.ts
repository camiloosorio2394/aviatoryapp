/**
 * Nivel 6 · Data link y operación oceánica (lecciones 41 a 50, capítulos 41 a 50 de la especificación).
 *
 * Lo que no va por voz o no va por VHF: ATIS y VOLMET, CPDLC y DCL, ACARS,
 * ADS-C, HF y SELCAL, y cómo se combinan en la operación oceánica.
 *
 * Cada lección revisada cita fuentes oficiales en su detalle técnico y
 * distingue escenarios didácticos de comunicaciones reales. El formato
 * de los bloques está documentado al inicio de index.ts.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const NIVEL_6: DocScreen[] = [
  // ── 41 ──────────────────────────────────────────────────────────────────
  {
    n: 41,
    title: "ATIS",
    kicker: "La letra confirma recepción; la cabina verifica el contenido",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "El servicio automático de información terminal (ATIS, Automatic Terminal Information Service) da la información de salida y llegada por voz o por enlace de datos (D-ATIS). Descongestiona la frecuencia, pero no reemplaza las autorizaciones del control de tránsito aéreo (ATC, Air Traffic Control). La letra dice qué edición recibiste, no que la cabina entendió su contenido.",
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
          "**Obtener la edición actual:** letra, hora y si es de salidas o de llegadas.",
          "**Extraer lo operacional:** pista, aproximación, viento, visibilidad, nubes, temperatura, QNH, nivel de transición y avisos.",
          "**Cruzarlo con la preparación:** cartas, NOTAM, performance y autorización. Una pista distinta obliga a recalcular y rebriefar.",
          "**Decir la letra en el primer contacto:** la que realmente recibiste. Si no la tienes, pide los datos actuales.",
          "**Revisar cada actualización:** si cambia la letra, se identifica qué cambió.",
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
      {
        kind: "callout",
        tone: "info",
        title: "Caso real: VA942 en Sídney",
        text: "La Australian Transport Safety Bureau investigó el vuelo Virgin Australia VA942, Brisbane-Sídney, del 19 de octubre de 2022. Se asignó una llegada a la pista 34L mientras el ATIS inicial y el actualizado indicaban operación en 16L/16R. La tripulación acusó recepción del ATIS vigente, pero la discrepancia de pista no quedó resuelta en la colación. El informe muestra por qué la letra recibida no sustituye comparar ATIS, autorización y plan de vuelo. Esta síntesis no es una transcripción radiofónica ni una instrucción para operar en Sídney.",
      },
      {
        kind: "escenario",
        titulo: "ATIS actualizado antes de iniciar descenso",
        situacion: "Ejercicio didáctico. Antes del descenso sale una nueva letra y el piloto que monitorea (PM, pilot monitoring) ve que la pista anunciada no es la de la llegada coordinada. Aún no hay autorización revisada.",
        preguntas: [
          { q: "¿Basta con comunicar la nueva letra?", a: "No. Hay que revisar qué cambió, reevaluar cartas, performance, configuración y briefing, y comparar la pista anunciada con la autorización vigente." },
          { q: "¿Puede la tripulación empezar otra llegada por lo que dice el ATIS?", a: "Puede preparar la alternativa, pero no volarla como si estuviera autorizada. Se pide aclaración a ATC y se confirma la nueva autorización antes de cambiar la trayectoria." },
        ],
        concepto: "La edición correcta evita omisiones; la seguridad exige contrastar el contenido con la autorización.",
      },
      {
        kind: "enLaOperacion",
        momento: "Del briefing a la primera llamada",
        texto: "El SOP reparte quién copia el ATIS, quién compara la meteorología y quién recalcula performance. El piloto que vuela (PF, pilot flying) conserva la trayectoria; PM confirma la letra en la primera llamada. En Colombia, frecuencias y servicios de cada aeródromo salen de la eAIP de Aerocivil.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Letra correcta, contenido no procesado", text: "Acusar recibo no reemplaza cotejar la pista asignada con la información recibida (caso VA942)." },
      { kind: "callout", tone: "warn", title: "Tratar ATIS como autorización", text: "La pista del boletín es información para planear; la autorización llega de ATC." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "ATIS entrega información terminal por voz o por datos.",
          "La letra dice qué edición recibiste, no que todo se comprendió.",
          "Contenido, autorización y performance se contrastan.",
          "Una pista anunciada no autoriza una maniobra.",
          "Si el ATIS cambia o no se recibe, se actualiza o se pregunta a ATC.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
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
          { kind: "p", text: "La FAA (AIM 4-1-13) pide notificar en el contacto inicial la recepción con el código alfabético; ATC puede omitir lo que ya está en el ATIS vigente. Es una referencia estadounidense que ilustra la lógica, no una fraseología colombiana obligatoria. Las instrucciones y autorizaciones de ATC se siguen colacionando: decir la letra no sustituye la colación." },
          { kind: "p", text: "Si no se consigue la nueva emisión, se dice claramente y se piden la información y las instrucciones vigentes. No se comunica una letra no recibida ni se asume que el boletín anterior sigue válido." },
          { kind: "callout", tone: "warn", title: "Ignorar una edición nueva", text: "El cambio puede alterar QNH, meteorología, pista, aproximación o una limitación operacional. Se identifica el cambio antes de continuar." },
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
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "VOLMET es meteorología para aeronaves en vuelo, por voz o por enlace de datos (D-VOLMET). A diferencia del ATIS, que habla de un aeródromo, VOLMET agrupa datos útiles para decidir sobre destino, alternos y región. No es un diálogo con un controlador ni autoriza a cambiar ruta, nivel o destino.",
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
        kind: "table",
        head: ["Vía", "Contenido general", "Pregunta de la tripulación"],
        rows: [
          ["VOLMET continuo", "METAR y SPECI actuales, con tendencia si la hay.", "¿Es el aeródromo y la hora que necesito?"],
          ["VOLMET programado", "METAR y SPECI; TAF y SIGMET si el acuerdo regional los incluye.", "¿Qué horario y qué aeródromos cubre?"],
          ["D-VOLMET", "Informes y pronósticos por enlace de datos, según el servicio.", "¿La hora y la validez sirven para decidir?"],
        ],
      },
      {
        kind: "p",
        text: "METAR y SPECI son observaciones; TAF es pronóstico; SIGMET avisa fenómenos significativos en ruta. No son intercambiables, y no todo VOLMET los trae todos. Estaciones, horarios y frecuencias se publican por región: aquí no se inventa ninguno.",
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
          "**Planificar la escucha** sin perder el canal del control de tránsito aéreo (ATC, Air Traffic Control).",
          "**Identificar cada dato:** aeródromo, producto, hora o validez.",
          "**Comparar** con el despacho y los criterios del explotador.",
          "**Pedir por el canal correcto:** un desvío se solicita a ATS; VOLMET no se contesta.",
        ],
      },
      {
        kind: "escenario",
        titulo: "El alterno no aparece en la emisión",
        situacion: "Ejercicio didáctico. En un tramo oceánico, PM escucha una emisión programada. Uno de los alternos no aparece; el METAR del destino sí.",
        preguntas: [
          { q: "¿Puede anotarse para el alterno el reporte del destino?", a: "No. Cada producto va con su aeródromo y su hora. PM registra que falta el dato del alterno y busca otra fuente autorizada." },
          { q: "¿Debe responderse al emisor VOLMET para pedir aclaración?", a: "No. VOLMET se escucha; no es un interlocutor. Otro dato se pide por el servicio o canal apropiado, sin comprometer la escucha del control." },
        ],
        concepto: "VOLMET sirve si se asocian bien producto, aeródromo, hora y decisión.",
      },
      {
        kind: "enLaOperacion",
        momento: "Actualización meteorológica lejos del terminal",
        texto: "En largo alcance se combinan VOLMET, D-VOLMET y mensajes del explotador. PF mantiene el vuelo y la escucha de ATC mientras PM obtiene y analiza el dato, según el SOP. Para Colombia, estaciones y datos salen de la eAIP de Aerocivil.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Copiar el aeródromo equivocado", text: "Varios reportes seguidos se confunden. Sin aeródromo y hora, el dato es peligroso." },
      { kind: "callout", tone: "warn", title: "Perder la comunicación ATC", text: "Escuchar meteorología no justifica dejar sin vigilancia el canal asignado." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "VOLMET da meteorología en vuelo, no autorizaciones.",
          "Voz continua, voz programada y D-VOLMET pueden traer contenido distinto.",
          "Aeródromo, producto, hora y validez, siempre juntos.",
          "Cualquier solicitud operacional va a ATS.",
          "Frecuencias y horarios salen de la publicación aplicable.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
          { kind: "p", text: "El informe meteorológico rutinario de aeródromo (METAR, Meteorological Aerodrome Report) y el especial (SPECI) describen observaciones. El pronóstico de aeródromo (TAF, Terminal Aerodrome Forecast) apunta a un periodo futuro; SIGMET (Significant Meteorological Information) informa fenómenos significativos en ruta. Un METAR de la hora de emisión no sustituye un TAF válido para la llegada ni un SIGMET." },
          { kind: "p", text: "OACI Anexo 3 distingue emisiones continuas y programadas; por eso no se enseña que todo VOLMET incluye METAR, TAF y SIGMET. Si el mensaje no cubre la necesidad, se consulta otra fuente autorizada." },
          { kind: "p", text: "Un cambio relevante puede exigir revisar combustible, performance, alternos e intención, no solo decir que se recibió el tiempo. Si falta un reporte, el boletín puede incluir el último disponible con su hora: no se trata como observación nueva. Si el pronóstico cambia la viabilidad del destino, la tripulación comunica su intención a ATS y espera la autorización." },
          { kind: "callout", tone: "warn", title: "Generalizar el contenido", text: "No todos los VOLMET transmiten TAF o SIGMET. Comprueba el tipo de emisión y el acuerdo regional antes de esperar un producto." },
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
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "La comunicación por enlace de datos entre controlador y piloto (CPDLC, Controller-Pilot Data Link Communications) intercambia mensajes normalizados entre el control de tránsito aéreo (ATC, Air Traffic Control) y la cabina. No es un chat ni elimina la voz. Una solicitud enviada no es una autorización, y cada mensaje recibido se lee según su tipo, quién lo envió y las respuestas que permite.",
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
        text: "El logon registra la aeronave ante la dependencia, antes de entrar en su espacio aéreo, pero no la convierte todavía en la autoridad de datos vigente. La tripulación comprueba qué dependencia está activa. Dirección de logon, cobertura y respaldo de voz se publican por región.",
      },
      { kind: "sub", text: "Qué significa cada respuesta" },
      {
        kind: "table",
        head: ["Respuesta", "Efecto", "Límite"],
        rows: [
          ["WILCO", "Entendido y se cumplirá.", "Solo si se puede cumplir."],
          ["UNABLE", "No se puede cumplir.", "El motivo, por el medio disponible."],
          ["STANDBY", "Se necesita tiempo.", "No es aceptación: el diálogo sigue abierto."],
          ["ROGER", "Acusa recibo de información.", "No promete cumplir una autorización."],
          ["AFFIRM / NEGATIVE", "Sí o no a una pregunta.", "No crea una autorización."],
        ],
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
          "**Situar:** mensaje nuevo, destinatario, dependencia activa y tipo de mensaje.",
          "**Leer completo entre los dos:** ruta, nivel, condición, punto, hora y restricciones.",
          "**Comprobar:** contra la autorización vigente, el FMS y la performance. Si es ambiguo, se aclara antes.",
          "**Responder** con la opción que el sistema habilita.",
          "**Ejecutar y verificar** solo una autorización inequívoca y aceptada.",
        ],
      },
      {
        kind: "escenario",
        titulo: "Mensaje demorado durante una coordinación oceánica",
        situacion: "Ejercicio didáctico basado en la AIP de la FAA para Oakland, Anchorage y New York Oceanic. El sistema avisa que un uplink llegó con demora de red. La tripulación tiene una autorización previa clara y voz de respaldo.",
        preguntas: [
          { q: "¿Se ejecuta el uplink demorado porque aparece en la pantalla?", a: "No. La tripulación no actúa sobre el mensaje demorado hasta aclarar con la dependencia de servicios de tránsito aéreo (ATS, Air Traffic Services) qué pretendía." },
          { q: "¿Cómo se resuelve la incertidumbre?", a: "Se pasa a voz para informar que llegó un uplink demorado y pedir aclaración; después se cierra el mensaje de datos como indique el controlador. Mientras tanto rige la última autorización inequívoca." },
        ],
        concepto: "Que el mensaje llegue no prueba que siga siendo oportuno ni ejecutable.",
      },
      {
        kind: "enLaOperacion",
        momento: "Transición entre dependencias y uso en crucero",
        texto: "Antes del área, la tripulación verifica elegibilidad, conexión, autoridad activa y voz de respaldo. En una transferencia comprueba qué dependencia quedó activa antes de enviar otra solicitud. Si falla CPDLC, se vuelve a la voz según el procedimiento publicado.",
      },
      { kind: "callout", tone: "warn", title: "Si hay ambigüedad, voz", text: "Un mensaje tardío, incompleto o contradictorio se aclara por voz. No se ejecuta un cambio para «resolver después»." },
      { kind: "callout", tone: "warn", title: "Confundir ROGER con WILCO", text: "ROGER no promete cumplir, y WILCO no se envía a un mensaje todavía no evaluado." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Logon, autoridad activa y autorización son tres cosas distintas.",
          "Leer, contrastar entre pilotos, responder con la opción habilitada y verificar.",
          "WILCO cumple; UNABLE rechaza; STANDBY difiere; ROGER acusa recibo.",
          "Una solicitud o un aviso no cambian la autorización.",
          "Las dudas, los mensajes demorados y las fallas se resuelven por voz.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
          { kind: "p", text: "**Atributos de respuesta.** Las opciones dependen del atributo de cada elemento de mensaje y de la implementación: no todos los uplinks ofrecen WILCO, UNABLE o ROGER. La AIP de la FAA publica atributos W/U, A/N y R para sus operaciones oceánicas y advierte diferencias entre FANS 1/A y ATN B1 (Aeronautical Telecommunication Network Baseline 1). El piloto no sustituye una opción ausente por otra parecida." },
          { kind: "p", text: "**Caso publicado.** La información aeronáutica estadounidense identifica a Oakland Oceanic como área con CPDLC y vigilancia dependiente automática por contrato (ADS-C, Automatic Dependent Surveillance-Contract) para aeronaves FANS 1/A elegibles, con capacidad de voz HF obligatoria. No es un procedimiento para Colombia." },
          { kind: "p", text: "**Detalle de la secuencia.** Un mensaje de la siguiente autoridad no equivale a control vigente. No se acepta por el primer renglón ni por expectativa. Un cambio no se carga a ciegas en el sistema de gestión de vuelo (FMS, Flight Management System). STANDBY concede tiempo, pero obliga a cerrar el intercambio después. No se asume que logon y transferencia ocurren exactamente al cruzar un límite: se comprueba el estado real." },
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
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "La voz y la comunicación por enlace de datos entre controlador y piloto (CPDLC, Controller-Pilot Data Link Communications) sirven a la misma relación, pero no son intercambiables. La voz aclara de inmediato; CPDLC entrega mensajes estructurados que se leen, se comprueban y se responden. Cuál es el medio principal depende del espacio aéreo y de la publicación aplicable.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-44-01.svg",
        alt: "Dos columnas comparan voz y CPDLC según urgencia, claridad, revisión y respuesta.",
        ancho: 1600,
        alto: 900,
        pie: "La elección no se basa en comodidad. Si el mensaje es tardío, contradictorio o necesita acción inmediata, se usa la voz de respaldo según el procedimiento aplicable. En CPDLC se responde por el enlace cuando corresponde; si la voz cambia la autorización, se debe resolver también el intercambio de datos que quede abierto.",
      },
      { kind: "sub", text: "Ventajas y límites" },
      {
        kind: "table",
        head: ["Aspecto", "Voz", "CPDLC"],
        rows: [
          ["Tiempo", "Contacto directo y aclaración rápida.", "Latencia; no sirve para una orden inmediata."],
          ["Comprensión", "Se escucha y se colaciona.", "Menos errores de oído, más riesgo de lectura superficial."],
          ["Falla o duda", "Es el respaldo habitual.", "Un uplink dudoso no se ejecuta: se aclara."],
        ],
      },
      {
        kind: "p",
        text: "La FAA (JO 7110.65) distingue dominios: en ruta doméstica de Estados Unidos, CPDLC complementa la voz y no se usa para órdenes inmediatas; en sus áreas oceánicas, fuera de VHF, es el medio principal, con respaldo de voz obligatorio. Nada de eso se traslada solo a Colombia.",
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
          "**Identificar la instrucción que se reemplaza:** un uplink abierto puede seguir en pantalla aunque ATC haya dicho otra cosa por voz.",
          "**Colacionar lo oral:** si la voz contradice el uplink, no se elige uno al azar.",
          "**Cerrar la transacción de datos** como lo indique ATC (por ejemplo, con UNABLE).",
          "**Actualizar el vuelo** solo cuando está claro qué autorización rige.",
        ],
      },
      {
        kind: "escenario",
        titulo: "Dos instrucciones visibles para la misma trayectoria",
        situacion: "Ejercicio didáctico. Una autorización CPDLC está pendiente de respuesta. Antes de aceptarla, el controlador llama por voz con otra instrucción y dice cómo cerrar el mensaje anterior.",
        preguntas: [
          { q: "¿Puede enviarse WILCO al uplink previo porque todavía está en pantalla?", a: "No. Se escucha, confirma y colaciona la nueva autorización oral, y se cierra el uplink anterior como pidió control, por ejemplo con UNABLE." },
          { q: "Si el controlador cancela el mensaje desde tierra, ¿queda necesariamente cerrado en cabina?", a: "No. La FAA advierte que la cancelación en tierra puede dejar el uplink abierto en la aeronave. La tripulación sigue la instrucción de cierre recibida." },
        ],
        concepto: "Al cambiar de medio, se conserva una sola autorización entendida y se cierra la anterior.",
      },
      {
        kind: "enLaOperacion",
        momento: "Crucero con voz y enlace activos",
        texto: "Ambos pilotos participan en cualquier instrucción que cambie la trayectoria. En oceánico, CPDLC principal no elimina el respaldo de voz. En un sector que solo lo usa como complemento, una solicitud urgente va por voz.",
      },
      { kind: "callout", tone: "warn", title: "Un texto escrito no valida su intención", text: "Un mensaje nítido puede ser incorrecto por destinatario, autoridad, demora o conflicto con la voz." },
      { kind: "callout", tone: "warn", title: "Dejar abierto el mensaje anterior", text: "Si la voz cambió la autorización, el uplink previo se cierra como indique ATC." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Voz para aclarar y para lo inmediato; CPDLC para intercambios estructurados.",
          "El medio principal cambia entre doméstico, terminal y oceánico.",
          "Un cambio oral puede exigir cerrar el mensaje CPDLC previo.",
          "La colación de una instrucción de voz sigue igual.",
          "Cobertura y respaldo se verifican en la publicación aplicable.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
          {
            kind: "table",
            head: ["Aspecto", "Voz", "CPDLC"],
            rows: [
              ["Conciencia compartida", "En una misma frecuencia, otras tripulaciones pueden oír parte del tráfico; esto no sustituye la separación ATC.", "El mensaje es individual; no informa a la cabina de las autorizaciones de otros vuelos."],
              ["Registro", "Puede apoyarse en anotación y grabación del servicio; la memoria sola no basta.", "El mensaje puede consultarse en el sistema según equipo y estado de la transacción; no prueba que se haya comprendido."],
            ],
          },
          { kind: "p", text: "La FAA publica un ejemplo de fraseología, no una transcripción: un controlador deja sin efecto por voz una autorización de ascenso enviada por CPDLC, pide responder UNABLE al mensaje pendiente y asigna otro nivel. Lo que se aprende son dos trabajos distintos: colacionar la instrucción oral vigente y cerrar el intercambio de datos previo." },
          { kind: "p", text: "El FMS se modifica solo cuando ambos pilotos tienen clara la autorización vigente; no se cargan dos trayectorias incompatibles para decidir después. Si una respuesta CPDLC tarda o el enlace falla, se aplica el paso a voz publicado. En una situación anormal se usa el medio que permita coordinar con seguridad y se declara urgencia o socorro cuando corresponde." },
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
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "Una autorización de salida por datos sigue siendo una autorización del control de tránsito aéreo (ATC, Air Traffic Control): no es copia del plan presentado ni permiso para rodar. La FAA documenta dos vías: la autorización previa a la salida (PDC, Pre-Departure Clearance) y la autorización de salida por CPDLC (CPDLC-DCL, Departure Clearance). Cómo se obtienen y se confirman depende del aeródromo.",
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
        head: ["", "PDC (FAA)", "CPDLC-DCL (FAA)"],
        rows: [
          ["Entrega", "Vía el operador o proveedor, por datos o impresa.", "Directa a la aviónica."],
          ["Respuesta", "No exige acuse ni colación.", "Se responde por el enlace."],
          ["Enmienda", "Pasa a voz.", "El sistema admite revisiones."],
        ],
      },
      {
        kind: "p",
        text: "Que una PDC no se colacione no significa leerla menos. Se comparan destino, límite de autorización, salida (SID), ruta, nivel inicial, código SSR, instrucciones y frecuencia de salida. El plan presentado es una propuesta; la autorización puede ser distinta.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-45-02.webp",
        alt: "Historieta de tres paneles: revisión en papel, verificación de mensaje digital y comprobación de una enmienda.",
        ancho: 1600,
        alto: 900,
        pie: "Historieta didáctica en un avión estacionado: 1) un piloto lee la autorización recibida en papel; 2) ambos verifican la autorización de datos en cabina; 3) una posible enmienda obliga a repetir el cotejo antes de responder. No representa un aeródromo, mensaje, ruta o vuelo real. El panel de papel ilustra PDC y los siguientes, CPDLC-DCL; no son tres autorizaciones consecutivas del mismo vuelo.",
      },
      { kind: "sub", text: "Secuencia antes de la salida" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Confirmar el origen:** PDC, CPDLC-DCL o mensaje de la compañía.",
          "**Leer todos los campos** y anotar cada diferencia con el plan.",
          "**Verificar el FMS:** los dos pilotos cotejan la ruta cargada, su continuidad y las restricciones.",
          "**Responder según la vía:** por el enlace en DCL; en una PDC de la FAA no se inventa una colación.",
          "**Si falta o hay duda,** se aclara con entrega de autorizaciones antes de seguir.",
        ],
      },
      {
        kind: "escenario",
        titulo: "La ruta entregada no coincide con el FMS",
        situacion: "Ejercicio didáctico. En el puesto llega por datos una autorización cuya ruta difiere de la cargada en el FMS; además hay una nota del operador con el plan anterior. Aún no se pide rodaje.",
        preguntas: [
          { q: "¿Puede prevalecer el plan cargado porque llegó primero?", a: "No. El plan y la nota del operador no sustituyen una autorización ATC. Se identifica la autorización válida, se lee la diferencia y se pide aclaración si es ambigua." },
          { q: "¿Se responde WILCO a cualquier documento recibido por datos?", a: "No. CPDLC-DCL requiere respuesta por el enlace en el sistema FAA; una PDC del operador no funciona como ese diálogo. Y nunca antes de revisar la ruta." },
        ],
        concepto: "La autorización se valida por su emisor, su contenido y su respuesta, no por el papel o la pantalla.",
      },
      {
        kind: "enLaOperacion",
        momento: "Preparación en el puesto y cambios tardíos",
        texto: "La salida no empieza con un supuesto «cleared as filed». Si cambia la ruta, se repite la revisión de combustible, performance, salida y FMS según el SOP. Para Colombia, se comprueba en la eAIP de Aerocivil si un aeródromo tiene PDC o DCL antes de afirmarlo.",
      },
      { kind: "callout", tone: "warn", title: "Llamar PDC a cualquier mensaje de la compañía", text: "Una impresión parecida no tiene autoridad ATC por sí misma." },
      { kind: "callout", tone: "warn", title: "Confundir autorización con permiso de movimiento", text: "La autorización IFR de salida no autoriza empuje ni rodaje." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "PDC y CPDLC-DCL son dos vías de entrega de una autorización ATC.",
          "En la FAA, PDC llega por el operador; DCL, directo a la aviónica y exige respuesta.",
          "La autorización completa se compara con el plan y con el FMS.",
          "Enmiendas y respuesta dependen del servicio y de la publicación local.",
          "La autorización de salida no autoriza empuje ni rodaje.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
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
          { kind: "p", text: "La lista exacta de campos depende del mensaje y del servicio, por lo que no se rellena con valores inventados. Una función de carga automática no elimina la comprobación en el sistema de gestión de vuelo (FMS, Flight Management System). Si la publicación local exige otro procedimiento de respuesta, ese es el aplicable." },
          { kind: "p", text: "Antes de usar la autorización para salir: ambos pilotos entendieron los campos, el FMS refleja la ruta autorizada y cualquier enmienda se resolvió por el canal correcto. La enseñanza se hace sin inventar una SID, un código SSR o una frecuencia." },
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
    minutes: 3,
    blocks: [
      {
        kind: "p",
        text: "ACARS (Aircraft Communications Addressing and Reporting System) intercambia datos entre la aeronave y tierra. Transporta mensajes de la aerolínea y, en algunas arquitecturas, también de servicios de tránsito aéreo. Por eso «si llegó por ACARS, es de la compañía» es falso. Lo que decide es **quién emitió el mensaje y qué autoriza o pide**.",
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
          ["Origen", "¿Despacho, mantenimiento, meteorología o ATC?", "Una recomendación del operador no cambia la autorización."],
          ["Transporte", "¿ACARS, otra red, voz o impresión?", "La pantalla no define la autoridad."],
          ["Aplicación", "¿Información, PDC o CPDLC?", "Cada una tiene su revisión y su respuesta."],
        ],
      },
      {
        kind: "p",
        text: "CPDLC es una aplicación de control; ACARS es una red de datos que puede transportarla (sistemas FANS 1/A). Una PDC originada en ATC puede llegar por ACARS o impresa, y sigue siendo autorización ATC. Un mensaje de despacho puede llegar a la misma pantalla y seguir siendo solo una recomendación.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-46-02.webp",
        alt: "Historieta de tres paneles: despacho envía una sugerencia, pilotos la evalúan y solicitan a control el cambio.",
        ancho: 1600,
        alto: 900,
        pie: "Historieta didáctica, sin mensajes ni vuelo real: 1) despacho envía información operacional; 2) los pilotos comprueban que no es una autorización ATC; 3) si desean modificar la trayectoria, lo solicitan al control por el medio apropiado y esperan la autorización. La imagen no reproduce rutas, frecuencias o textos de ACARS.",
      },
      {
        kind: "escenario",
        titulo: "Despacho propone una ruta distinta",
        situacion: "Ejercicio didáctico. En crucero, el despachador propone por datos un cambio de ruta para evitar meteorología. La tripulación tiene una autorización ATC vigente. El mensaje no es PDC ni CPDLC.",
        preguntas: [
          { q: "¿Puede el piloto que vuela cargar y ejecutar la ruta sugerida?", a: "No como trayecto autorizado. La propuesta se evalúa, pero para cambiar la ruta hace falta la autorización ATC o la contingencia aplicable." },
          { q: "Si una autorización ATC llegara por ACARS como PDC, ¿sería solo un consejo de la compañía?", a: "No. Una PDC originada en ATC mantiene su condición de autorización; se comprueba su contenido y el procedimiento local de uso." },
        ],
        concepto: "La autoridad viene del emisor y del servicio, no de la pantalla ni la impresora.",
      },
      {
        kind: "enLaOperacion",
        momento: "Mensajes de compañía, control y datos terminales",
        texto: "Mensajes del control operacional de la aerolínea (AOC, Aeronautical Operational Control) y de servicios de tránsito aéreo (ATS, Air Traffic Services) pueden verse parecidos. El SOP dice quién revisa y acusa cada clase. La cabina conserva una sola imagen de la autorización ATC vigente.",
      },
      { kind: "callout", tone: "warn", title: "La misma red, distintas autoridades", text: "Confundir PDC con mensaje de despacho cambia la trayectoria sin permiso, o hace ignorar una autorización válida." },
      { kind: "callout", tone: "warn", title: "Usar un dato viejo", text: "Un mensaje meteorológico o terminal puede quedar desactualizado: hora y edición importan tanto como el contenido." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "ACARS es una red de datos; CPDLC es una aplicación ATC.",
          "Un mensaje de la compañía no modifica la autorización ATC.",
          "Una PDC originada por ATC puede viajar por ACARS y conserva su autoridad.",
          "Origen, tipo, hora y respuesta antes de actuar.",
          "Ante duda o falla, el medio alterno que corresponde al emisor.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
          { kind: "p", text: "La comunicación por enlace de datos entre controlador y piloto (CPDLC, Controller-Pilot Data Link Communications) intercambia instrucciones, solicitudes y respuestas con la dependencia ATC. La documentación OACI sobre enlaces de datos muestra que FANS 1/A puede transportar CPDLC y vigilancia dependiente automática por contrato (ADS-C, Automatic Dependent Surveillance-Contract) sobre ACARS. La comparación útil no es «ACARS contra CPDLC»: es red y transporte frente a servicio y autoridad." },
          { kind: "p", text: "**Durante una rotación.** PM identifica categoría y origen antes de leer. Si despacho sugiere una ruta o nivel más favorable, PF y PM evalúan combustible, performance y viabilidad, y la solicitud a ATC va por el medio autorizado. Un mensaje por ACARS con una autorización originada en ATC se procesa con el cotejo de la lección 45. Si ACARS falla, los mensajes operacionales van por el medio alterno del operador y las instrucciones ATC, por el medio ATC publicado; no se da por recibida una autorización que nunca llegó." },
          { kind: "p", text: "Si el contenido altera la ruta o el nivel, se verifica si es autorización ATC o propuesta del operador. Si hay duda sobre el origen o la integridad, se resuelve por el medio publicado, no por la apariencia gráfica." },
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
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "La vigilancia dependiente automática por contrato (ADS-C, Automatic Dependent Surveillance-Contract) fija, por enlace de datos, cuándo la aeronave envía informes a tierra. El servicio de tránsito aéreo (ATS, Air Traffic Services) establece el contrato y la aviónica genera los informes. **Automático no es autónomo**: ADS-C informa posición y otros datos, pero no emite ni reemplaza una autorización.",
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
        text: "El informe básico lleva identificación, posición, altitud y hora; según el contrato, también velocidad, meteorología y trayectoria prevista. Es «dependiente» porque los datos los calcula el avión: si la ruta del FMS está mal cargada, tierra recibe una intención equivocada.",
      },
      {
        kind: "table",
        head: ["Informe", "Disparador", "Qué no significa"],
        rows: [
          ["Periódico", "Intervalo del contrato", "Que la tripulación leyó una instrucción."],
          ["Por suceso", "Evento, como una desviación lateral", "Una autorización para desviarse."],
          ["A solicitud", "Petición de tierra", "Que se cancelan los demás contratos."],
          ["Emergencia", "Condición de emergencia", "Que ya no hay que coordinar por voz."],
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-47-02.webp",
        alt: "Historieta de tres paneles: pilotos verifican la ruta, revisan un estado de enlace de datos y un controlador observa la trayectoria oceánica.",
        ancho: 1600,
        alto: 900,
        pie: "Historieta didáctica, sin vuelo ni pantalla real: 1) ambos pilotos cotejan la ruta autorizada con la cargada; 2) supervisan el estado del enlace, sin interpretar el informe automático como autorización; 3) control recibe vigilancia y la tripulación conserva un medio de comunicación para instrucciones o contingencias.",
      },
      { kind: "sub", text: "¿Se mantienen los reportes de posición?" },
      {
        kind: "p",
        text: "Depende de la región. En el oceánico de Estados Unidos, con ADS-C conectado ya no se reporta posición por voz; sin conexión, se reporta por CPDLC o voz. Pero en New York Oceanic, sin conexión con KZWY, se sigue reportando por HF, y al entrar en Anchorage Oceanic se envía un reporte CPDLC para probar la conectividad. No memorices «ADS-C elimina los reportes»: verifica AIP, conexión e instrucciones.",
      },
      {
        kind: "escenario",
        titulo: "Conexión no establecida al entrar en New York Oceanic",
        situacion: "Caso didáctico basado en la regla publicada para New York Oceanic. La tripulación había previsto ADS-C, pero al entrar no tiene conexión con KZWY. Voz y CPDLC siguen disponibles.",
        preguntas: [
          { q: "¿Puede dejar de reportar posición porque el avión tiene ADS-C?", a: "No. La AIP de Estados Unidos pide seguir reportando, por HF si ADS-C no está disponible, hasta establecer la conexión con KZWY. Tener el equipo no es tener el servicio." },
          { q: "Si control recibe un informe ADS-C por una desviación lateral, ¿queda autorizada la nueva derrota?", a: "No. El informe es vigilancia. Un cambio deliberado de ruta necesita autorización ATC o, si corresponde, la contingencia publicada." },
        ],
        concepto: "Vigilancia automática, conexión efectiva y autorización son tres estados distintos.",
      },
      {
        kind: "enLaOperacion",
        momento: "Cruce oceánico con enlace de datos",
        texto: "El piloto que monitorea (PM, Pilot Monitoring) contrasta el estado de ADS-C y CPDLC con el plan de comunicaciones de la región; el piloto que vuela (PF, Pilot Flying) conserva la trayectoria. Se confirma qué dependencia tiene conexión, no solo que el equipo está instalado.",
      },
      { kind: "callout", tone: "warn", title: "Dos errores opuestos", text: "Duplicar reportes que la región suspende congestiona el sistema; omitirlos sin ADS-C conectado deja a control sin información." },
      { kind: "callout", tone: "warn", title: "Confundir vigilancia con comunicación", text: "ADS-C vigila; CPDLC comunica. Si se pierde CPDLC, la vigilancia no sustituye las instrucciones." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "ADS-C envía informes automáticos según contratos con tierra.",
          "Periódicos, por suceso, a solicitud o de emergencia.",
          "No autoriza cambios de ruta o nivel ni sustituye CPDLC o voz.",
          "El FMS debe reflejar la autorización vigente.",
          "Los reportes dependen de la AIP regional, la conexión y ATC.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
          { kind: "p", text: "La vigilancia dependiente no equivale a una observación radar independiente. La comunicación por enlace de datos entre controlador y piloto (CPDLC, Controller-Pilot Data Link Communications) es otro servicio: transmite solicitudes, instrucciones y respuestas. Si la seguridad exige actuar de inmediato, se aplica la contingencia publicada y se comunica tan pronto como sea posible." },
          { kind: "list", ordered: true, items: [
            "**Antes del área remota.** Comprobar equipo, aprobaciones y servicios; cotejar los puntos del sistema de gestión de vuelo (FMS, Flight Management System) con el plan y la autorización.",
            "**Durante la conexión.** Un intento de logon no equivale a un contrato ADS-C establecido, ni la siguiente dependencia recibe datos por sí sola.",
            "**En cada cambio de autorización.** Mantener sincronizados autorización, ruta activa, nivel y plan de cabina.",
            "**Si se pierde ADS-C.** Avisar a ATS por un medio disponible y reanudar los reportes que correspondan. No esperar en silencio.",
            "**Si se pierde CPDLC pero ADS-C sigue.** Usar el medio alterno publicado y verificar con control qué servicios siguen disponibles.",
          ] },
          { kind: "p", text: "Antes de asumir que la siguiente dependencia recibirá la trayectoria prevista se comprueban el estado de la conexión, la ruta cargada, la autorización vigente y el procedimiento regional de transferencia y reporte." },
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
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "La radio de alta frecuencia (HF, High Frequency) da voz a larga distancia cuando ya no hay cobertura de muy alta frecuencia (VHF, Very High Frequency). En oceánico hay que **preparar el contacto, conservar la frecuencia asignada, reconocer al operador de radio y cerrar cada autorización con una colación verificable**. Con propagación variable y relevo, pedir algo a última hora es mala estrategia.",
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
        text: "En HF casi siempre hablas con un **operador de estación aeronáutica** que retransmite al centro oceánico y no puede autorizar nada por sí mismo. «ATC clears…» introduce una autorización retransmitida; «expect» no concede el cambio. Se colaciona y se escucha que el operador confirme lo colacionado.",
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
        head: ["Situación", "Qué hace la tripulación"],
        rows: [
          ["Antes del área remota", "Prueba las radios HF antes de perder VHF, si es posible."],
          ["Mala recepción en la primaria", "Prueba la secundaria asignada o el medio alterno publicado."],
          ["Mensaje poco inteligible", "Pide repetición y confirma números, nivel y ruta antes de actuar."],
          ["Solicitud con tiempo crítico", "La inicia con antelación, contando con el relevo."],
        ],
      },
      {
        kind: "p",
        text: "Primaria y secundaria las asigna la estación o la publicación vigente para la ruta; la tripulación no elige cualquier canal. Como orientación general de la FAA, las frecuencias altas rinden mejor de día y las bajas de noche.",
      },
      {
        kind: "escenario",
        titulo: "La primaria se degrada antes de solicitar un cambio",
        situacion: "Ejercicio didáctico en New York Oceanic, basado en la AIP de Estados Unidos. New York Radio asignó primaria y secundaria. La primaria se vuelve difícil de entender justo cuando la tripulación quiere pedir otro nivel.",
        preguntas: [
          { q: "¿Se inicia el ascenso porque la respuesta HF puede tardar?", a: "No. Se conserva el nivel autorizado. La solicitud puede hacerse con anticipación, pero se espera una autorización inequívoca, salvo una contingencia por seguridad." },
          { q: "Si llega una respuesta retransmitida con un número ininteligible, ¿cómo se cierra?", a: "Se pide repetición del elemento dudoso, se colaciona la autorización completa y se confirma que el operador escuchó bien la colación. Un dato no entendido no se ejecuta." },
        ],
        concepto: "La propagación difícil exige más verificación, no menos colación.",
      },
      {
        kind: "enLaOperacion",
        momento: "HF como medio de largo alcance",
        texto: "El piloto que monitorea (PM, Pilot Monitoring) administra la radio, copia y confirma; el piloto que vuela (PF, Pilot Flying) mantiene la trayectoria y valida el efecto de cada cambio. Se registran estación, primaria, secundaria y estado del contacto antes de la transferencia.",
      },
      { kind: "callout", tone: "warn", title: "El operador de radio no es el controlador", text: "La estación retransmite, pero no crea autorizaciones. Lo crítico se colaciona aunque haya ruido." },
      { kind: "callout", tone: "warn", title: "Tomar una expectativa como permiso", text: "«Expect» no autoriza. Solicitud, expectativa y autorización retransmitida son tres cosas distintas." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "HF da voz a larga distancia con propagación variable.",
          "En oceánico, sueles hablar con un operador de radio sin autoridad ATC.",
          "Primaria y secundaria las asigna la estación; no se inventan.",
          "Ruido y demora: anticipar solicitudes y confirmar datos críticos.",
          "CPDLC o SATVOICE no eliminan las obligaciones HF de cada región.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
          { kind: "p", text: "La circular FAA AC 91-70D advierte periodos de recepción marginal por actividad espacial y aconseja comprobar las radios HF primaria y secundaria, cuando hay dos, en tierra o antes de entrar al espacio oceánico. La AIP estadounidense prevé que New York Radio asigne primaria y secundaria, pide contactarla antes del ingreso con una prueba de llamada selectiva (SELCAL, Selective Calling) y exige mantener capacidad HF incluso con enlace de datos." },
          { kind: "p", text: "Una solicitud HF puede pasar por operador y centro de control. No se asciende, desciende ni desvía por la sola expectativa de respuesta. Si hay una urgencia de seguridad, se aplica la contingencia publicada y se comunica por todos los medios disponibles. CPDLC y la voz por satélite (SATVOICE, Satellite Voice) pueden estar disponibles, con condiciones regionales." },
          { kind: "p", text: "Una prueba SELCAL eficaz reduce la necesidad de escuchar el ruido HF de forma continua, pero no elimina la capacidad de comunicación exigida ni la obligación de atender una llamada." },
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
    kicker: "La alerta selectiva, su comprobación y la escucha oceánica",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "La llamada selectiva (SELCAL, Selective Calling) permite que una estación aeronáutica alerte a una aeronave concreta con una señal por radio. La cabina oye un aviso y **vuelve a establecer contacto de voz**. SELCAL no es una autorización ni trae el mensaje: en oceánico, sirve para no escuchar todo el tiempo el ruido de la radio de alta frecuencia (HF, High Frequency).",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-49-01.webp",
        alt: "Secuencia didáctica de tres escenas: operador de estación aeronáutica activa la llamada selectiva, cabina percibe la alerta y piloto responde por voz.",
        ancho: 1600,
        alto: 900,
        pie: "1) La estación llama selectivamente por el canal asignado. 2) La cabina reconoce el aviso, que por sí mismo no autoriza ninguna maniobra. 3) El piloto responde por voz con su indicativo y espera el mensaje. Es una recreación didáctica: el panel y la ubicación exacta del aviso dependen de la aeronave.",
      },
      { kind: "sub", text: "Una alerta no identifica por sí sola al vuelo" },
      {
        kind: "p",
        text: "Los códigos SELCAL pueden repetirse entre aeronaves, así que al contestar **se comprueba que la estación usa el distintivo correcto**. El código es de la aeronave y va en el plan de vuelo: si cambia el avión en la rotación, se actualiza.",
      },
      {
        kind: "table",
        head: ["Estado", "Qué puede concluir", "Qué no"],
        rows: [
          ["Aviso recibido", "La estación quiere contacto.", "Que ya hay un mensaje o una autorización."],
          ["Prueba correcta", "El enlace funcionó en la prueba.", "Que seguirá sin comprobarlo."],
          ["CPDLC activo", "Hay un canal digital adicional.", "Que se puede omitir la prueba SELCAL."],
        ],
      },
      { kind: "sub", text: "Antes del límite oceánico: prueba y transferencia" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Preparar la aeronave real:** código SELCAL, matrícula, distintivo y plan de vuelo deben coincidir.",
          "**Contactar la estación** y pedir la prueba SELCAL; la estación asigna primaria y secundaria.",
          "**Observar la prueba:** si no suena, se informa el resultado real; nunca se da por buena una prueba fallida.",
          "**Pasar a vigilancia SELCAL** solo tras una prueba satisfactoria.",
          "**Ante un aviso,** se contesta con el distintivo, se confirma el destinatario y se colaciona lo que corresponda.",
        ],
      },
      {
        kind: "p",
        text: "El NAT Doc 007 (2026-1) exige incluir el código en el plan y probarlo con la estación a más tardar al entrar al espacio oceánico, aun con CPDLC o voz satelital. La FAA aconseja repetir la prueba en cada límite de área de control (CTA, Control Area). Son reglas del Atlántico Norte y de la FAA, no de Colombia.",
      },
      {
        kind: "escenario",
        titulo: "Una alerta durante el cruce, con enlace de datos activo",
        situacion: "Caso didáctico en el Atlántico Norte. La tripulación hizo una prueba SELCAL satisfactoria, mantiene CPDLC y recibe ahora un aviso acústico.",
        preguntas: [
          { q: "¿Puede suponerse que el tono anuncia una autorización de cambio de nivel?", a: "No. El tono solo pide establecer contacto. El contenido llega por el medio correspondiente y un cambio de nivel requiere una autorización explícita." },
          { q: "Al transferirse a la siguiente área, ¿basta con la prueba anterior?", a: "No se presupone. La FAA pide repetir la prueba en los límites de CTA y el NAT Doc 007 exige el contacto y la comprobación con la estación siguiente." },
        ],
        concepto: "SELCAL reduce el ruido de escucha, no las verificaciones.",
      },
      {
        kind: "enLaOperacion",
        momento: "Cuando la alerta no se recibe o hay duda",
        texto: "Si la prueba falla, se informa a la estación, se mantiene la escucha de voz y se coordina otra prueba o el medio alterno. Si un aviso parece para otro vuelo, se aclara el distintivo antes de actuar.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Confundir aviso con autorización",
        text: "La señal no trae nivel, ruta ni separación. Solo invita a establecer contacto.",
      },
      { kind: "callout", tone: "warn", title: "Contestar un código repetido", text: "El tono puede ser para otro avión con el mismo código: se confirma el distintivo." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "SELCAL alerta para que la tripulación contacte a la estación.",
          "La prueba precede a la vigilancia SELCAL y se repite en cada transferencia.",
          "CPDLC o la voz satelital no eliminan el requisito NAT de SELCAL.",
          "Un código puede repetirse: siempre se verifica el distintivo.",
          "Si la prueba falla, se informa y se conserva la escucha.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
          { kind: "p", text: "La FAA advierte que los códigos de 16 tonos pueden repetirse entre aeronaves de una misma región; la evolución a 32 tonos amplía los códigos disponibles, pero no cambia la disciplina de cabina. Aquí no se enseña un código inventado como si fuera una asignación real." },
          { kind: "p", text: "En la operación NAT con enlace de datos, el contacto inicial incluye pedir la comprobación SELCAL y declarar el área oceánica siguiente cuando corresponde. En la transferencia entre áreas se establece el contacto prescrito con la nueva estación y se obtiene su asignación de primaria y secundaria. Tras la prueba, equipo y radio quedan configurados para recibir la alerta y responder. El piloto que vuela mantiene la autorización vigente hasta recibir otra." },
          { kind: "p", text: "Se registran estación, radio asignada, resultado de la prueba y cambio de área. No se silencia la HF ni se asume que CPDLC cubre todas las obligaciones de voz." },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "FAA AC 91-70D §4.3.2 · OACI NAT Doc 007 §5.1",
        bloques: [
          { kind: "p", text: "FAA, AC 91-70D vigente, §4.3.2: funcionamiento SELCAL, posibles códigos duplicados, comprobación antes de la entrada oceánica y en cada límite CTA aun con CPDLC: https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_91-70D.pdf" },
          { kind: "p", text: "OACI, NAT Doc 007, edición 2026-1, §§5.1.13 y 5.1.22 a 5.1.23: contacto con estación, primaria/secundaria, código en plan de vuelo, prueba previa a la vigilancia y obligación también con CPDLC o voz satelital: https://www.icao.int/sites/default/files/EURNAT/Documents/EUR%20and%20Nat%20Docs/NAT%20Documents/NAT%20Documents/NAT%20Doc%20007/NAT-Doc-007-EN-Edition-V.2026-1-Amd-0.pdf" },
          { kind: "p", text: "Para operaciones colombianas, consultar exclusivamente la AIP/eAIP oficial de Aerocivil y el procedimiento vigente del operador. Esta lección no establece estación, frecuencia ni autorización colombiana: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "Las escenas son recreaciones didácticas; no representan una transcripción ATC ni una pantalla de avión específica." },
        ],
      },
    ],
  },
  // ── 50 ──────────────────────────────────────────────────────────────────
  {
    n: 50,
    title: "Comunicaciones oceánicas",
    kicker: "Integrar voz, enlace de datos, vigilancia y transferencias",
    minutes: 5,
    blocks: [
      {
        kind: "p",
        text: "Cruzar un océano no es solo «pasar de VHF a HF». Se coordinan **varios servicios distintos**, cada uno con su pregunta: ¿cómo llega una instrucción?, ¿quién puede darla?, ¿cómo sabe tierra dónde estás?, ¿cómo te despierta la estación? Que un canal funcione no garantiza los otros ni cambia la autorización vigente.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-50-01.svg",
        alt: "Diagrama de tres capas: CPDLC para mensajes ATC, ADS-C para informes automáticos y HF con SELCAL para voz y alerta, entre cabina y servicios de tierra.",
        ancho: 1600,
        alto: 900,
        pie: "Diagrama conceptual, no una carta ni una configuración de avión. CPDLC cursa mensajes ATC; ADS-C informa a los sistemas de tierra bajo contratos; HF permite voz mediante una estación aeronáutica, y SELCAL puede alertar a la cabina. La distribución efectiva y las alternativas se verifican en la publicación del Estado y el manual del operador.",
      },
      { kind: "sub", text: "Qué hace cada sistema y qué no hace" },
      {
        kind: "table",
        head: ["Medio", "Función", "Límite"],
        rows: [
          ["CPDLC", "Mensajes de control.", "Una solicitud enviada no es una autorización."],
          ["ADS-C", "Informes automáticos de posición e intención.", "No es un canal de autorización."],
          ["HF", "Voz de largo alcance, vía estación aeronáutica.", "El operador de radio no autoriza."],
          ["SELCAL", "Avisa que la estación quiere contacto.", "El tono no trae el mensaje; confirmar distintivo."],
          ["SATVOICE", "Voz satelital, si está aprobada.", "No elimina HF ni SELCAL."],
        ],
      },
      {
        kind: "p",
        text: "En el Atlántico Norte (NAT, North Atlantic), según el NAT Doc 007 (2026-1), fuera de VHF y con CPDLC disponible, **CPDLC es el medio primario y la voz el alterno**, y hay que mantener SELCAL o escucha continua en la HF asignada. Si el enlace de datos se degrada, se avisa a tiempo por el medio disponible.",
      },
      { kind: "sub", text: "Preparar la entrada sin repetir reglas antiguas" },
      {
        kind: "p",
        text: "El NAT Doc 007 vigente dice que se entra al espacio oceánico **con la autorización ATC existente**, sin una autorización oceánica aparte. Cualquier cambio de ruta, nivel o velocidad sigue necesitando autorización explícita.",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Antes de perder VHF:** comunicaciones de largo alcance, frecuencias, estación y enlace de datos; ruta del FMS contra la autorización.",
          "**Antes del punto de entrada:** logon CPDLC/ADS-C entre 10 y 25 minutos antes del límite si aún no hay conexión (NAT), y pruebas HF y SELCAL si no se hicieron en tierra.",
          "**Contacto con la estación:** primaria, secundaria y SELCAL; la autorización viene del centro de control.",
          "**Durante el cruce:** con ADS-C no se duplican por voz los reportes rutinarios salvo que la estación lo pida, pero la turbulencia severa se sigue notificando por voz.",
          "**Al cambiar de área:** nueva estación, nueva prueba SELCAL y confirmación de la conexión.",
        ],
      },
      {
        kind: "p",
        text: "Sin ADS-C, el NAT Doc 007 pide reportar en los puntos significativos del plan cuando la ruta no tiene puntos de notificación designados, salvo otra instrucción. Si la estimada del próximo punto cambia en **tres minutos o más**, se envía una revisada. Otras regiones tienen sus propias reglas.",
      },
      {
        kind: "escenario",
        titulo: "Enlace de datos degradado durante un cruce NAT",
        situacion: "Ejercicio didáctico basado en NAT Doc 007. CPDLC era el medio primario y ADS-C enviaba informes, pero el sistema indica pérdida de conectividad. La HF asignada y la prueba SELCAL están registradas como operativas.",
        preguntas: [
          { q: "¿Se continúa como si ADS-C siguiera informando?", a: "No. Se verifica el estado real de las conexiones y se notifica la falla cuanto antes. Los reportes por voz dependen de la instrucción recibida y del procedimiento regional." },
          { q: "¿Se ejecuta un cambio de nivel solicitado por CPDLC antes de perder conexión?", a: "No por haber enviado la solicitud. Se mantiene el nivel vigente hasta recibir una autorización inequívoca, o se aplica una contingencia publicada si la seguridad lo exige." },
        ],
        concepto: "La falla de un canal cambia el plan de comunicación, no autoriza a cambiar la trayectoria.",
      },
      {
        kind: "enLaOperacion",
        momento: "Transferencia a la siguiente área oceánica",
        texto: "El piloto que monitorea (PM, Pilot Monitoring) confirma la estación siguiente, las frecuencias y la sesión de datos; el piloto que vuela (PF, Pilot Flying) verifica ruta, nivel y velocidad autorizados. Una discrepancia entre el FMS y la autorización se resuelve antes de que sea una desviación.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "La antigua «autorización oceánica» no es una regla universal",
        text: "En NAT se entra con la autorización existente, pero eso no permite cambiar la ruta ni extrapolar la regla a otro espacio aéreo.",
      },
      { kind: "callout", tone: "warn", title: "Dar por hecho un canal que falló", text: "Si cae el enlace de datos, se notifica y se pasa a la alternativa publicada, sin asumir permiso para maniobrar." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "CPDLC comunica; ADS-C informa; HF da voz; SELCAL alerta.",
          "La estación retransmite, pero la autorización es del controlador.",
          "En NAT no hace falta una autorización oceánica aparte para entrar en ruta.",
          "Si el enlace de datos falla, se notifica y se usa la alternativa publicada.",
          "Reportes, estimadas y pruebas siguen las reglas de cada región.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
          {
            kind: "table",
            head: ["Medio", "Función operacional", "Límite importante"],
            rows: [
              ["CPDLC (Controller-Pilot Data Link Communications)", "Intercambia mensajes digitales de control, solicitudes, respuestas y acuses cuando la dependencia admite el servicio.", "Un fallo de conexión exige notificar y pasar al medio previsto."],
              ["ADS-C (Automatic Dependent Surveillance-Contract)", "Entrega informes automáticos de estado, posición o intención bajo contratos con tierra.", "No dispensa por sí mismo todos los reportes especiales ni las instrucciones de voz."],
              ["HF (High Frequency)", "Voz de largo alcance, con frecuencia por estación aeronáutica que retransmite al controlador.", "Propagación variable y posible demora."],
              ["SELCAL (Selective Calling)", "Avisa que una estación quiere establecer contacto con una aeronave cuya prueba fue satisfactoria.", "Un código puede compartirse."],
              ["SATVOICE (Satellite Voice)", "Voz satelital cuando el equipo, la aprobación y el procedimiento regional lo permiten.", "No se utiliza igual en todas las regiones."],
            ],
          },
          { kind: "p", text: "Cuando se degrada el enlace de datos, el controlador puede tener que revisar la separación aplicada. La regla NAT de entrada con la autorización existente corrige la antigua instrucción de obtener siempre una «oceanic clearance» adicional; los requisitos de notificación, conexión y transferencia son propios de cada área y se consultan en el NAT Doc 007 y las AIP estatales vigentes." },
          { kind: "p", text: "Los tiempos de las estimadas van con cuatro cifras en UTC. La AIP del Estado y la instrucción de la dependencia determinan formato y frecuencia de los informes en cada región." },
          { kind: "p", text: "Con la estación aeronáutica se usa la primaria o la secundaria según la recepción; se anota cualquier mensaje retransmitido, su colación y la confirmación. El reparto de tareas y el uso de voz satelital corresponden al procedimiento aprobado del operador." },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "OACI NAT Doc 007 2026-1 · FAA AC 91-70D",
        bloques: [
          { kind: "p", text: "OACI, NAT Doc 007 edición 2026-1, §§5.1, 5.3 y 6.3.31 a 6.3.41: medios de comunicación, informes/estimadas, entrada con autorización vigente, pruebas HF/SELCAL y logon 10 a 25 minutos antes si corresponde: https://www.icao.int/sites/default/files/EURNAT/Documents/EUR%20and%20Nat%20Docs/NAT%20Documents/NAT%20Documents/NAT%20Doc%20007/NAT-Doc-007-EN-Edition-V.2026-1-Amd-0.pdf" },
          { kind: "p", text: "FAA, AC 91-70D vigente, §4.3: operador de radio HF, colación, SELCAL, datos y alternativas; orientación estadounidense que no reemplaza la AIP del área: https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_91-70D.pdf" },
          { kind: "p", text: "Para servicios, estaciones, frecuencias y procedimientos colombianos, consultar exclusivamente la AIP/eAIP de Aerocivil. No se dibujó una carta ni una ruta colombiana: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "El diagrama y el escenario son didácticos; no son transcripciones reales, publicaciones de ruta ni sustitutos del manual operacional." },
        ],
      },
    ],
  },
]
