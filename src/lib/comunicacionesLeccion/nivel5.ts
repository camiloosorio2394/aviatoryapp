/** Nivel 5 · Vigilancia, contingencias y emergencias (lecciones 31 a 40). */
import type { DocScreen } from "@/lib/docBlocks"

/** La nota única de las lecciones que traen un intercambio con distintivo real. */
const NOTA_EJEMPLO = "Ejemplo educativo. El distintivo de llamada de la aerolínea es real; el número de vuelo es ficticio. Lo que va entre paréntesis se completa con los datos reales del vuelo."

export const NIVEL_5: DocScreen[] = [
  // ── 31 ──────────────────────────────────────────────────────────────────
  {
    n: 31,
    title: "Transpondedor y SSR",
    kicker: "Código, altitud, IDENT y vigilancia",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "El radar secundario de vigilancia (SSR, Secondary Surveillance Radar) interroga el transpondedor, y su respuesta le permite al servicio de tránsito aéreo (ATS, Air Traffic Services) asociar la traza con un código, una altitud de presión y una identificación. Repetir bien el código por radio no basta: hay que seleccionarlo, comprobarlo y avisar cualquier discrepancia.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-31-01.svg",
        alt: "Esquema de instrucción ATS, selección y verificación del transpondedor en cabina, y comprobación por el controlador.",
        ancho: 1600,
        alto: 900,
        pie: "Esquema didáctico: la instrucción SQUAWK se escucha y colaciona, se selecciona y comprueba en cabina, y ATS observa la respuesta. Modo A aporta el código; Modo C, altitud de presión; Modo S, identificación entre otros datos. La figura no reproduce una pantalla, código asignado ni procedimiento local.",
      },
      { kind: "sub", text: "Qué distingue la tripulación" },
      {
        kind: "glosario",
        items: [
          { k: "Modo A", v: "Código de cuatro dígitos octales que asigna ATS o que corresponde a una situación especial." },
          { k: "Modo C", v: "Altitud de presión. Si no concuerda con el nivel comunicado, se investiga; no se «corrige» el nivel para que calce." },
          { k: "Modo S", v: "Interrogación selectiva e identificación de la aeronave, que debe concordar con el plan de vuelo." },
          { k: "IDENT", v: "Destaca un momento la respuesta para que ATS identifique la traza. Se opera solo a solicitud." },
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-31-02.webp",
        alt: "Historieta de tres paneles: tripulación coteja el ajuste, controlador solicita identificación y piloto actúa sobre el transpondedor.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no transcripción: 1) ambos pilotos cotejan la instrucción y el ajuste; 2) el controlador observa una traza y solicita IDENT; 3) la tripulación opera IDENT tras la solicitud. Los paneles no muestran datos de vigilancia reales ni una frecuencia.",
      },
      { kind: "sub", text: "Secuencia de una asignación normal" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Colacionar:** el piloto que monitorea (PM, pilot monitoring) lee el código dígito por dígito con su distintivo.",
          "**Seleccionar y comprobar:** un piloto lo introduce y el otro verifica el ajuste. Un readback perfecto no detecta una cifra mal seleccionada.",
          "**Confirmar una duda:** ante CONFIRM SQUAWK se mira lo que indica el equipo y se responde SQUAWKING (código). Si no coincide con lo asignado, se corrige y se avisa.",
          "**IDENT solo a solicitud:** SQUAWK IDENT pide accionar el control; decir la palabra por radio no produce la señal.",
        ],
      },
      {
        kind: "table",
        head: ["Código", "Situación", "Lectura operacional"],
        rows: [
          ["7700", "Emergencia", "Si ATS ya asignó un código, puede mantenerse salvo otra instrucción; 7700 se elige si hay motivo para considerarlo mejor."],
          ["7600", "Falla de radiocomunicaciones", "Luego rigen los procedimientos de comunicaciones perdidas del espacio aéreo."],
          ["7500", "Interferencia ilícita", "Implicaciones de seguridad: nunca para ensayos."],
        ],
      },
      {
        kind: "escenario",
        titulo: "Código colacionado, indicación distinta",
        situacion: "Caso didáctico. ATS asigna un código y PM lo colaciona bien, pero el piloto que vuela (PF, pilot flying) ve en el panel una cifra distinta. Tras corregirla, ATS pregunta por la altitud que recibe.",
        preguntas: [
          {
            q: "¿Qué hace la tripulación antes de continuar?",
            a: "Coteja la autorización con el código real, corrige el ajuste y vuelve a verificarlo en el equipo. Si la discrepancia generó una respuesta incorrecta, la aclara con ATS. El readback inicial no prueba que el panel estuviera bien."
          },
          {
            q: "¿Cómo responde a la pregunta sobre altitud?",
            a: "Revisa reglaje y nivel efectivo, confirma el nivel que vuela y comunica cualquier discrepancia de transmisión. No altera una altitud autorizada ni desactiva una función sin identificar el problema y cumplir la instrucción aplicable."
          },
        ],
        concepto: "Colación, ajuste, comprobación y aviso de fallas son controles distintos.",
      },
      {
        kind: "enLaOperacion",
        momento: "De la autorización a la transferencia",
        texto: "PM colaciona el código; la tripulación lo ajusta y lo coteja según el procedimiento normalizado de operación (SOP, Standard Operating Procedures). Una transferencia puede traer un código nuevo: se repite el ciclo completo. El momento de activación en tierra depende del procedimiento local y del equipo.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Colacionar bien y seleccionar mal", text: "El código dicho por radio y el mostrado en el equipo se cotejan por separado." },
      { kind: "callout", tone: "warn", title: "Activar IDENT sin solicitud", text: "IDENT no se pulsa por rutina ni para probar el equipo: se opera cuando ATS lo pide." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Readback y ajuste del transpondedor se verifican por separado.",
          "Modo A es código; Modo C, altitud de presión; Modo S, identificación.",
          "IDENT solo cuando ATS lo solicita.",
          "Una discrepancia de altitud o identidad se comprueba y se comunica.",
          "7700, 7600 y 7500 tienen fines reservados.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
          { kind: "p", text: "**Plantillas oficiales.** SQUAWK (code), CONFIRM SQUAWK (code), SQUAWKING (code), RESET SQUAWK [(mode)] (code), SQUAWK [(code)] [AND] IDENT y SQUAWK CHARLIE proceden de EASA AMC1 SERA.14001, sección 2.3. Son plantillas para aprender la estructura, no un código utilizable." },
          { kind: "p", text: "**RESET SQUAWK** pide volver a seleccionar modo y código. Si el equipo no responde, se comunica la falla de forma explícita." },
          { kind: "p", text: "**Altitud:** CHECK ALTIMETER SETTING AND CONFIRM (level) exige revisar el reglaje y confirmar el nivel real. STOP SQUAWK CHARLIE WRONG INDICATION es otra instrucción: detiene la transmisión de una altitud defectuosa." },
          { kind: "p", text: "**Identificación Modo S:** si ATS detecta otra identidad, puede pedir RE-ENTER [ADS-B or MODE S] AIRCRAFT IDENTIFICATION. Se coteja con el plan de vuelo antes de cambiarla." },
          { kind: "p", text: "**Equipo inoperativo:** se informa sin rodeos. La continuidad del vuelo depende de los requisitos del espacio aéreo, no de una llamada de radio." },
          { kind: "p", text: "**Códigos reservados:** la OACI los reserva en el Anexo 10, Vol. IV. El extracto oficial del Doc 8168 aclara que en emergencia se conserva el código especificado por ATS salvo nueva instrucción, aunque el piloto puede seleccionar 7700 si cree que es la mejor medida." },
          { kind: "callout", tone: "warn", title: "Tratar 7500, 7600 o 7700 como códigos ordinarios", text: "Sus significados son reservados. Un ajuste accidental puede desencadenar una respuesta operacional o de seguridad no deseada." },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "EASA SERA · OACI Anexo 10 Vol. IV · OACI Doc 8168",
        bloques: [
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, revisión agosto de 2025, AMC1 SERA.14001 sección 2.3 (fraseología SSR, IDENT, altitud e identificación): https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299" },
          { kind: "p", text: "OACI, Anexo 10, Vol. IV, 2.1.4.2: reserva 7700, 7600 y 7500: https://applications.icao.int/tools/ATMiKIT/story_content/external_files/story_content/external_files/Annex10_Volume%204_cons.pdf" },
          { kind: "p", text: "OACI, extracto del Doc 8168 Vol. I en el anexo de Anexo 17: operación del transpondedor en emergencia y 7500: https://www.icao.int/casp-ap/Test%20Document/an17_cons.pdf" },
          { kind: "p", text: "Los ejemplos y la historieta son didácticos, no transcripciones. La tabla EASA es una referencia de fraseología, no reemplaza las instrucciones de la autoridad o explotador aplicables al vuelo. No se indican códigos discretos, aeródromos, frecuencias, rutas ni requisitos locales colombianos; para estos últimos se consulta únicamente la eAIP vigente de Aerocivil." },
        ],
      },
    ],
  },
  // ── 32 ──────────────────────────────────────────────────────────────────
  {
    n: 32,
    title: "Falla de comunicaciones",
    kicker: "Diagnóstico, recuperación y procedimiento aplicable",
    minutes: 5,
    blocks: [
      {
        kind: "p",
        text: "Una frecuencia en silencio no prueba que fallaron todas las radios: puede ser un canal mal seleccionado, un transmisor inoperativo o una transferencia incompleta. Primero se vuela el avión y se averigua qué funciona; solo después se entra en el procedimiento de comunicaciones perdidas, que en vuelo IFR sale de la regla del Estado y de la carta vigente.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-32-01.svg",
        alt: "Flujo de cuatro etapas ante silencio de radio: volar, revisar cabina, buscar contacto y aplicar el procedimiento vigente si persiste la falla.",
        ancho: 1600,
        alto: 900,
        pie: "Esquema conceptual: se conserva el vuelo seguro y se comprueban los canales antes de concluir una falla. Si no se recupera el contacto, la señalización y el perfil se rigen por la norma y la carta aplicables al espacio aéreo. No fija tiempos, rutas ni autorizaciones colombianas.",
      },
      { kind: "sub", text: "Diagnóstico sin dejar de volar" },
      {
        kind: "glosario",
        items: [
          { k: "No recibe", v: "El transmisor puede funcionar aunque no oiga a ATS. Se sigue escuchando y no se asume que tampoco lo reciben." },
          { k: "No transmite", v: "Puede oír instrucciones aunque ATS no reciba su voz. Una respuesta visible, como IDENT, confirma la recepción." },
          { k: "Sin enlace bilateral", v: "Revisados equipo y canales, no hay intercambio en ningún sentido: se aplica el procedimiento publicado." },
        ],
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Volar:** el piloto que vuela (PF, pilot flying) controla el avión y conserva la última autorización colacionada. El piloto que monitorea (PM, pilot monitoring) organiza el diagnóstico.",
          "**Revisar selección:** canal activo, panel de audio, volumen, micrófono y botón de transmisión; la otra radio según el SOP.",
          "**Reintentar:** canal anterior, otro canal adecuado a la ruta, otra dependencia u otra aeronave (secuencia de EASA SERA.14083, que ilustra el diagnóstico).",
        ],
      },
      {
        kind: "p",
        text: "**Prueba de radio (RADIO CHECK).** Llamas a la estación con tu distintivo, «RADIO CHECK» y la frecuencia que usas. Te responde con una cifra de legibilidad: 1 ininteligible, 2 inteligible por momentos, 3 inteligible con dificultad, 4 inteligible y 5 perfectamente inteligible; «reading you five» es la señal limpia.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-32-02.webp",
        alt: "Historieta fotográfica de tres paneles: pilotos observan silencio, comprueban el audio y prueban otro medio mientras ATS intenta restablecer contacto.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no registro de un incidente: 1) PF mantiene el vuelo mientras PM detecta que la frecuencia quedó sin respuesta; 2) la tripulación coteja audio, radio y canal anterior; 3) ATS busca restablecer contacto. Las pantallas son genéricas y no contienen datos operacionales reales.",
      },
      { kind: "sub", text: "Si ATS sospecha que la tripulación aún recibe" },
      {
        kind: "p",
        text: "ATS puede pedir una maniobra, un cambio del transpondedor o IDENT y observar el resultado, con una instrucción condicional que empieza por IF YOU READ. Se ejecuta solo si es segura. La respuesta observada prueba que el receptor funciona, no que la falla esté resuelta.",
      },
      {
        kind: "list",
        items: [
          "**Señalización:** el código 7600 indica falla de radiocomunicaciones, una vez fallan los intentos de restablecer el enlace. No sustituye revisar el panel de audio.",
          "**Perfil IFR:** nivel, ruta, espera y aproximación salen de la regla y la carta vigentes del espacio aéreo, no de tiempos de otro Estado.",
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "Para Colombia, el procedimiento de falla de comunicaciones sale de la eAIP de Aerocivil (ENR y cartas del aeródromo) vigente; esta lección no fija ninguno.",
      },
      {
        kind: "escenario",
        titulo: "Silencio tras una transferencia",
        situacion: "Caso didáctico. Una aeronave IFR colaciona una transferencia y no obtiene respuesta en el nuevo canal. PM ve que el canal activo no coincide con el anotado; lo corrige y sigue sin respuesta.",
        preguntas: [
          {
            q: "¿Qué comprueban antes de declarar una falla?",
            a: "PM verifica selección activa, panel de audio, volumen, transmisor y micrófono; usa la otra radio o puesto conforme al SOP. Reintenta el canal anterior y otro canal apropiado a la ruta, y coordina con ATS u otra aeronave por los medios disponibles. PF conserva el control y la navegación."
          },
          {
            q: "Si ATS les da una instrucción observable y no pueden contestar, ¿qué demuestra la respuesta?",
            a: "Que la tripulación recibió esa instrucción y puede actuar. No prueba que el transmisor de voz se haya recuperado. Se sigue escuchando y se aplica la regla de falla completa si no se restablece la comunicación bilateral."
          },
        ],
        concepto: "Diagnosticar, recuperar y solo entonces aplicar el procedimiento del lugar; el silencio no es una autorización nueva.",
      },
      {
        kind: "enLaOperacion",
        momento: "PF mantiene el vuelo; PM busca el enlace",
        texto: "PM anota los intentos y el último permiso recibido. Si recupera el contacto en otro canal, informa que no pudo comunicarse por el asignado y confirma la autorización vigente. Si la falla persiste, ambos consultan el procedimiento del espacio aéreo y la carta, sin mezclar una regla europea o estadounidense con una operación colombiana.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Pasar a 7600 antes de revisar el audio", text: "Una selección o un volumen errados pueden explicar el silencio." },
      { kind: "callout", tone: "warn", title: "Copiar el cronómetro de otro Estado", text: "Los tiempos y perfiles de comunicaciones perdidas son normativos y cambian según el espacio aéreo." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "PF vuela; PM diagnostica las comunicaciones.",
          "Canal anterior, otro canal y otros medios antes de asumir pérdida total.",
          "Una respuesta observable confirma recepción, no transmisión de voz.",
          "7600 señala la falla; el perfil IFR sale de la norma y la carta vigentes.",
          "En Colombia, los datos locales salen de la eAIP de Aerocivil.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
          { kind: "p", text: "**Voz y enlace de datos.** Una conexión de comunicaciones por enlace de datos controlador-piloto (CPDLC, Controller-Pilot Data Link Communications) podría seguir disponible mientras falla la voz, pero no sustituye por sí sola la escucha de voz; se sigue el procedimiento del espacio aéreo y del equipo." },
          { kind: "p", text: "**Condicionales.** Si la tripulación oye una instrucción condicional, la comprende y la ejecuta solo si es segura y compatible con lo recibido. IDENT no se activa espontáneamente. El rumbo, el punto y el distintivo reales se reciben en vuelo: la lección no inventa una transmisión." },
          { kind: "p", text: "**Perfil IFR en Europa.** La revisión de EASA de 2025 trae un procedimiento europeo específico, distinto de versiones antiguas que citaban combinaciones de 7 y 20 minutos; esa regla no se enseña como norma colombiana." },
          { kind: "p", text: "**SID y STAR.** Una carta de salida o de llegada puede incluir instrucciones de falla de comunicaciones: se consulta la publicación vigente. Tampoco se asume que cualquier campo cercano es utilizable para la aeronave, el combustible y la meteorología." },
          { kind: "callout", tone: "warn", title: "Tratar CPDLC como solución automática", text: "Un enlace de datos disponible no suspende la coordinación ni la obligación de escucha de voz. Se comprueba qué capacidad queda y qué regla rige." },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "EASA SERA.14083 · Aerocivil AIP · OACI Anexo 10 · OACI Doc 9432",
        bloques: [
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, revisión agosto de 2025, SERA.14083 y AMC1 SERA.14083(b)(1), recuperación de contacto, pruebas observables y procedimiento europeo: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9832" },
          { kind: "p", text: "EASA SERA.8035, obligación de escucha de voz aun con CPDLC establecida: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9888" },
          { kind: "p", text: "OACI, Doc 9432, Manual de radiotelefonía, 4.ª ed. (2007), 2.8.4: forma de la transmisión de prueba, contenido de la respuesta y escala de legibilidad de 1 a 5." },
          { kind: "p", text: "OACI, Anexo 10 Vol. IV, código 7600 reservado para falla de radiocomunicaciones: https://applications.icao.int/tools/ATMiKIT/story_content/external_files/story_content/external_files/Annex10_Volume%204_cons.pdf" },
          { kind: "p", text: "UK CAA, CAP 413 Radiotelephony Manual, edición 24 (vigente desde el 1 de julio de 2026), 5.36: con la aeronave que recibe pero no transmite, el controlador usa la vigilancia para confirmar la recepción («reply not received, if you read…»). Fuente oficial del Reino Unido que sigue la OACI." },
          { kind: "p", text: "Aerocivil, portal oficial de la AIP Colombia y acceso a eAIP: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip. El AD 2 SKBO no se pudo descargar para este módulo (la eAIP respondió con una cadena de certificados incompleta): por eso no se cita ningún procedimiento local." },
          { kind: "p", text: "La secuencia de recuperación EASA es fuente comparativa, no un procedimiento colombiano. Esta lección no reproduce la carta ni declara vigentes los tiempos o rutas de ningún aeródromo. La historieta y el escenario son didácticos, no transcripciones de un vuelo." },
        ],
      },
    ],
  },
  // ── 33 ──────────────────────────────────────────────────────────────────
  {
    n: 33,
    title: "La frecuencia de emergencia 121,5 MHz",
    kicker: "Canal de socorro, recuperación y escucha",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "121,5 megahercios (MHz) es la frecuencia aeronáutica de emergencia en muy alta frecuencia (VHF, Very High Frequency). No es un canal de trabajo. Si ya hay contacto con el servicio de tránsito aéreo (ATS, Air Traffic Services), la emergencia se declara en la frecuencia en uso: ese controlador ya conoce el vuelo y actúa sin perder tiempo.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-33-01.svg",
        alt: "Comparación entre comunicar socorro o urgencia en el canal ATS en uso y usar 121,5 MHz cuando el contacto normal no está disponible.",
        ancho: 1600,
        alto: 900,
        pie: "Esquema didáctico: si el enlace con ATS funciona, el mensaje de socorro o urgencia va por el canal en uso. Si no hay contacto tras revisar radios y canales, 121,5 MHz puede ayudar a recuperarlo o pedir asistencia. La obligación de escucha depende de la normativa y del equipo; no se fija una regla universal para todo vuelo.",
      },
      { kind: "sub", text: "Tres usos que no deben confundirse" },
      {
        kind: "list",
        items: [
          "**Socorro o urgencia:** el primer mensaje va por el canal en uso; 121,5 MHz u otro canal si es necesario o conveniente (EASA SERA.14095). Lo que importa es que el mensaje llegue.",
          "**Recuperar contacto:** si la frecuencia asignada no responde, se revisa la cabina y se intentan otros medios (lección 32). 121,5 puede servir para contactar una estación o contestar un llamado de búsqueda.",
          "**Escucha preventiva:** algunas rutas o áreas la exigen; otras operaciones la mantienen por SOP del explotador. No todos los vuelos deben dedicarle siempre la segunda radio.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-33-02.webp",
        alt: "Historieta de tres paneles: tripulación revisa la radio, controlador intenta contactar por el canal de emergencia y pilotos recuperan el enlace.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no transcripción: 1) la tripulación comprueba la pérdida de contacto en el canal asignado; 2) ATS intenta localizarla por un canal de emergencia; 3) los pilotos reciben la llamada y coordinan el regreso al canal correcto. No se representan frecuencias operacionales adicionales, distintivos ni aeropuertos.",
      },
      { kind: "sub", text: "Escuchar no equivale a haber comunicado" },
      {
        kind: "p",
        text: "Tener 121,5 sintonizada o transmitir una vez sin respuesta no prueba que alguien recibió el mensaje. Si oyes un llamado para tu aeronave, confirma el distintivo, escucha la instrucción completa y responde breve. Una transmisión rutinaria puede ocupar el canal justo cuando alguien lo necesita.",
      },
      {
        kind: "escenario",
        titulo: "Sin respuesta en el canal asignado; un llamado en 121,5",
        situacion: "Caso didáctico. En crucero IFR, tras una transferencia, no hay contacto en el canal asignado. El piloto que vuela (PF, pilot flying) mantiene la autorización; el piloto que monitorea (PM, pilot monitoring) revisa radio y audio y oye en 121,5 un llamado que podría ser suyo.",
        preguntas: [
          {
            q: "¿Cómo identifica si el llamado es suyo y qué responde?",
            a: "PM escucha el distintivo completo y la instrucción. Si corresponde a su aeronave, contesta con su identificación y colaciona lo que lo requiera; si el distintivo no es claro, pide aclaración. Luego confirma con ATS el canal y la autorización efectivos."
          },
          {
            q: "¿Qué no prueba una llamada sin respuesta por 121,5?",
            a: "Que ATS la haya recibido o que haya una autorización nueva. Se sigue buscando contacto y, si no se recupera, se aplica la norma de comunicaciones perdidas del espacio aéreo."
          },
        ],
        concepto: "121,5 MHz es un recurso de seguridad, no un atajo para omitir el canal asignado.",
      },
      {
        kind: "enLaOperacion",
        momento: "Monitoreo en crucero y llamada inesperada",
        texto: "PM sabe qué radio lleva el canal ATS y cuál, si el SOP lo pide, escucha 121,5. Ante una llamada de emergencia comprueba el destinatario y coordina con PF. Puede retransmitir con precisión el mensaje de otra aeronave en peligro si ayuda y la carga de trabajo lo permite.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Cambiar primero a 121,5 con contacto ATS", text: "Si el controlador del canal en uso ya te recibe, declarar allí acelera la respuesta." },
      { kind: "callout", tone: "warn", title: "Tratar la escucha como transmisión confirmada", text: "Sin acuse de recibo o acción comprobable, se siguen los procedimientos de recuperación." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "121,5 MHz es la frecuencia aeronáutica de emergencia, no un canal rutinario.",
          "El primer mensaje de socorro o urgencia va por el canal en uso cuando es posible.",
          "Ayuda a recuperar contacto cuando fallan los canales normales.",
          "La escucha depende de norma, área, equipo y SOP.",
          "Sintonizar o transmitir sin respuesta no equivale a haber informado a ATS.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
          { kind: "p", text: "**La escucha tiene condiciones concretas.** EASA SERA.14080 exige escucha continua en vuelos largos sobre agua y en determinadas áreas, con excepciones por otros canales, equipo o tareas de cabina; también en rutas de posible interceptación cuando la autoridad lo establece. Es norma europea, no una obligación colombiana: para Colombia se verifica la eAIP de Aerocivil, el equipo y el SOP." },
          { kind: "p", text: "**Radiobalizas e interceptación.** El transmisor localizador de emergencia (ELT, Emergency Locator Transmitter) y la voz en 121,5 MHz cumplen funciones distintas. El manual de espectro de la OACI señala que 121,5 se usa también para localizar ELT y que COSPAS-SARSAT ya no vigila esa frecuencia como canal de alerta. Oír una portadora no autoriza a improvisar una posición o instrucción." },
          { kind: "p", text: "**Retransmisión.** Quien retransmite para otra aeronave dice qué parte del mensaje viene de ella y qué recibió de ATS." },
          { kind: "callout", tone: "warn", title: "Ocupar el canal para coordinación rutinaria", text: "Una conversación no esencial puede interferir con comunicaciones de socorro, urgencia o recuperación de contacto." },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "OACI Doc 9718 · EASA SERA.14080 y SERA.14095 · Aerocivil eAIP",
        bloques: [
          { kind: "p", text: "OACI, Handbook on Radio Frequency Spectrum Requirements for Civil Aviation, Doc 9718, Vol. I, edición anticipada 2026: 121,5 MHz como frecuencia aeronáutica de emergencia y su relación con ELT; la versión anticipada no sustituye el Anexo 10 vigente: https://www.icao.int/sites/default/files/FSMP/Doc9718_VolI_4th_Edition_2026_Advance_Unedited_Version.pdf" },
          { kind: "p", text: "EASA, Easy Access Rules for SERA, revisión agosto de 2025, SERA.14080 (escucha) y SERA.14083 (recuperación de contacto): https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9832" },
          { kind: "p", text: "EASA SERA.14095 (socorro y urgencia en el canal en uso y alternativas): https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9854" },
          { kind: "p", text: "Aerocivil, portal oficial de la AIP Colombia y acceso a eAIP para requisitos y datos locales vigentes: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "La historieta y el escenario son didácticos, no transcripciones. No se inventan distintivos, sectores, frecuencias ATS, rutas ni un mandato de escucha colombiano." },
        ],
      },
    ],
  },
  // ── 34 ──────────────────────────────────────────────────────────────────
  {
    n: 34,
    title: "Socorro: MAYDAY",
    kicker: "Prioridad, mensaje inicial y coordinación",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "Socorro es un peligro grave o inminente que exige ayuda inmediata. La señal es MAYDAY, preferiblemente tres veces al comienzo de la primera llamada, y da a esas comunicaciones prioridad absoluta. No reemplaza el control del avión ni la lista de verificación: se comunica en cuanto la carga de trabajo lo permite.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-34-01.svg",
        alt: "Estructura de un mensaje MAYDAY: señal de socorro, estación, identificación, naturaleza, intención, posición y datos adicionales.",
        ancho: 1600,
        alto: 900,
        pie: "Ficha didáctica basada en EASA SERA.14095: la señal MAYDAY abre el mensaje; siguen, cuando sea posible, estación, identificación, naturaleza del peligro, intención y posición/nivel/rumbo. La información adicional se entrega después si ayuda. No se retrasa una acción urgente para completar una plantilla.",
      },
      { kind: "sub", text: "Dos tareas simultáneas, no una llamada perfecta" },
      {
        kind: "list",
        items: [
          "**Piloto que vuela (PF, pilot flying):** mantiene la trayectoria, ejecuta las acciones inmediatas y usa la lista aplicable.",
          "**Piloto que monitorea (PM, pilot monitoring):** apoya la cabina y transmite cuando puede, según el SOP.",
          "**Primer mensaje:** tantos elementos como sea posible, no necesariamente todos. Señal, distintivo y naturaleza primero; el resto después.",
          "**Canal:** con contacto establecido, la frecuencia en uso (lección 33).",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-34-02.webp",
        alt: "Historieta de tres paneles: PF mantiene el avión, PM comunica MAYDAY y ATS coordina ayuda.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no una transmisión real: 1) PF sostiene el control y PM reconoce la necesidad de ayuda inmediata; 2) PM comunica MAYDAY con la información disponible; 3) ATS acusa recibo y coordina la asistencia. No representa una falla específica, un aeródromo ni datos de vuelo.",
      },
      { kind: "sub", text: "Así suena" },
      {
        kind: "code",
        text: [
          "PILOT: MAYDAY, MAYDAY, MAYDAY, (dependencia), AVIANCA 452, (naturaleza), (intención), (posición, nivel, rumbo)",
          "ATC:   AVIANCA 452, (dependencia), ROGER MAYDAY",
          "ATC:   ALL STATIONS, (dependencia), STOP TRANSMITTING. MAYDAY",
          "PILOT: (dependencia), AVIANCA 452, CANCEL MAYDAY, (motivo)",
        ].join("\n"),
      },
      { kind: "p", text: NOTA_EJEMPLO },
      {
        kind: "p",
        text: "El orden es el de la OACI que reproduce el CAP 413 (8.3 y 8.13): señal, dependencia, distintivo, naturaleza, intención y posición, nivel y rumbo; la autonomía y las personas a bordo van después. ATS acusa, coordina y puede imponer silencio. La tripulación cancela su socorro cuando termina; el fin del tráfico de socorro lo anuncia ATS.",
      },
      {
        kind: "escenario",
        titulo: "Primero el control, después el mensaje completo",
        situacion: "Caso didáctico. En crucero aparece un peligro grave e inmediato. PF estabiliza el avión. PM ya sabe la naturaleza del problema y la intención inmediata, pero no tiene posición confirmada ni autonomía actualizada.",
        preguntas: [
          {
            q: "¿Se espera a tener todos los campos antes de decir MAYDAY?",
            a: "No. Cuando la cabina lo permita, PM transmite MAYDAY con los datos seguros que ya tiene: identificación, naturaleza e intención, con la dependencia si hay tiempo. La posición, nivel, rumbo y otros datos se completan a continuación. PF sigue controlando el vuelo."
          },
          {
            q: "ATS da una instrucción que el avión no puede cumplir mientras ejecuta la lista. ¿Qué hace PM?",
            a: "La contrasta con el estado del avión. Si no es posible cumplirla, dice UNABLE y la razón o intención de forma breve. No colaciona una autorización imposible como si fuera aceptada."
          },
        ],
        concepto: "MAYDAY activa ayuda inmediata, pero la prioridad sigue siendo el control del avión y una comunicación cierta, por etapas.",
      },
      {
        kind: "enLaOperacion",
        momento: "Primera llamada y seguimiento",
        texto: "El briefing se reduce a quién vuela, quién comunica, qué se necesita de ATS y qué falta confirmar. PM empieza con un mensaje breve y después da autonomía, personas a bordo e intención revisada. Antes de dejar una frecuencia que funciona, se confirma el cambio.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Demorar la llamada por completar la plantilla", text: "Una declaración temprana y cierta permite a ATS empezar a ayudar mientras llegan los detalles." },
      { kind: "callout", tone: "warn", title: "Aceptar una instrucción imposible", text: "En emergencia, una orden incompatible con el estado del avión se contesta con UNABLE y la intención real." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "MAYDAY: peligro grave o inminente con necesidad de ayuda inmediata.",
          "El primer mensaje va en la frecuencia en uso cuando hay contacto.",
          "Lo esencial primero; el resto cuando la cabina pueda.",
          "ATS acusa con ROGER MAYDAY, coordina y protege la frecuencia.",
          "Cancelar el socorro y terminar el tráfico de socorro son actos distintos.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
          { kind: "p", text: "**La estructura, punto por punto.** Señal MAYDAY al comienzo, no al final de un relato. Dependencia si hay tiempo y distintivo completo. Naturaleza del peligro, comprensible para que ATS elija la ayuda, sin diagnosticar por radio la causa técnica. Intención actual con datos reales. Posición, nivel y rumbo; si alguno es incierto, se dice. Autonomía, personas a bordo, mercancías peligrosas o asistencia requerida, cuando la cabina esté estabilizada." },
          { kind: "p", text: "**Lo que hace ATS.** Acusa de inmediato, asume el control de esas comunicaciones o transfiere explícitamente esa responsabilidad, y coordina con otras dependencias y el explotador. Puede mantener el tráfico de socorro en la frecuencia inicial o transferirlo. Una nueva instrucción de rumbo, nivel o pista se escucha, se evalúa y se colaciona si la carga de trabajo lo permite." },
          { kind: "p", text: "**Silencio.** La aeronave en socorro o ATS pueden imponer silencio con STOP TRANSMITTING y MAYDAY. Las demás aeronaves no ocupan la frecuencia salvo para prestar ayuda." },
          { kind: "p", text: "**Una mejora no es el fin.** Una mejora temporal no se confunde con el fin del peligro." },
          { kind: "callout", tone: "warn", title: "Llamar antes de controlar el avión", text: "PF no abandona una acción inmediata de seguridad para construir un mensaje largo. PM transmite cuando la carga de trabajo lo permite." },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "EASA SERA.14095 · CAP 413 Ed. 24 · Aerocivil eAIP",
        bloques: [
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, revisión agosto de 2025, SERA.14095 (definición, señal, contenido, prioridad, ATS, silencio y fin de las comunicaciones): https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9854" },
          { kind: "p", text: "UK CAA, CAP 413 Radiotelephony Manual, edición 24 (vigente desde el 1 de julio de 2026), 8.3, 8.13, 8.26 y 8.33: «MAYDAY, MAYDAY, MAYDAY», orden del mensaje, acuse «Roger MAYDAY», «stop transmitting. MAYDAY» y «cancel MAYDAY». Fuente oficial del Reino Unido que reproduce la fraseología OACI; el punto 8 del orden (títulos del piloto) es solo del Reino Unido y no se enseña aquí: https://www.caa.co.uk/media/km2juvmx/cap413-edition-24-radio-telephony.pdf" },
          { kind: "p", text: "EASA, misma publicación de SERA, AMC1 SERA.14001, fraseología estándar de imposibilidad de cumplimiento: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299" },
          { kind: "p", text: "FAA JO 7340.2P, cambio 3 (vigente desde el 9 de julio de 2026), sección 3-3: AVA, AEROVIAS DEL CONTINENTE AMERICANO, distintivo radiotelefónico AVIANCA." },
          { kind: "p", text: "Aerocivil, portal oficial de la AIP Colombia y eAIP para información local vigente: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "La historieta, el intercambio y el escenario son didácticos, no transcripciones. No se asigna una condición real a una aeronave ni se inventa posición, ruta, frecuencia o autorización." },
        ],
      },
    ],
  },
  // ── 35 ──────────────────────────────────────────────────────────────────
  {
    n: 35,
    title: "Urgencia: PAN PAN",
    kicker: "Seguridad afectada sin ayuda inmediata",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "Urgencia es una condición que afecta la seguridad de la aeronave o de alguien a bordo, pero que no exige ayuda inmediata. La señal es PAN PAN, preferiblemente tres veces al inicio. Tiene prioridad sobre el tráfico normal, nunca sobre el socorro. Se elige por el efecto real y la ayuda que se necesita, no por el nombre de la falla.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-35-01.svg",
        alt: "Comparación entre PAN PAN para urgencia sin ayuda inmediata y MAYDAY para peligro grave o inminente que requiere asistencia inmediata.",
        ancho: 1600,
        alto: 900,
        pie: "Comparación conceptual basada en EASA SERA.14095: PAN PAN identifica seguridad afectada sin necesidad de ayuda inmediata; MAYDAY, peligro grave o inminente que sí la requiere. La situación puede evolucionar y la tripulación debe actualizar su declaración. No clasifica automáticamente una falla concreta.",
      },
      { kind: "sub", text: "Cómo decide una tripulación de aerolínea" },
      {
        kind: "list",
        items: [
          "**Qué cambió:** si el avión sigue controlable, qué capacidades se perdieron y qué exige la lista.",
          "**Qué asistencia se necesita:** prioridad para desviarse, tiempo para la lista, servicios médicos o una pista adecuada.",
          "**Qué se sabe:** se comunica el efecto observable y la intención; no un diagnóstico sin confirmar.",
          "**Cómo evoluciona:** si aparece peligro grave o inminente, MAYDAY; si la urgencia termina, se avisa.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-35-02.webp",
        alt: "Historieta de tres paneles: cabina de pasajeros informa necesidad médica, pilotos comunican la urgencia y controladores coordinan asistencia.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no caso real: 1) la tripulación de cabina comunica una necesidad médica; 2) PF mantiene el vuelo y PM informa a ATS la condición y la intención; 3) ATS coordina la prioridad y asistencia solicitadas. Las pantallas no muestran una carta, ruta ni aeropuerto.",
      },
      { kind: "sub", text: "Así suena" },
      {
        kind: "code",
        text: "PILOT: PAN PAN, PAN PAN, PAN PAN, (dependencia), AVIANCA 452, (naturaleza y efecto), (intención y solicitud), (posición, nivel, rumbo)",
      },
      { kind: "p", text: NOTA_EJEMPLO },
      {
        kind: "p",
        text: "El mensaje sigue el mismo orden que MAYDAY (lección 34). Cada grupo PAN se pronuncia como la palabra francesa panne. Después se añade lo útil y confiable: autonomía, personas a bordo, mercancías peligrosas o recursos que se necesitan en tierra.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "PAN PAN MEDICAL tiene otro significado",
        text: "Identifica un transporte sanitario protegido por los Convenios de Ginebra. No se usa por llevar a un pasajero enfermo.",
      },
      {
        kind: "escenario",
        titulo: "Necesidad médica con decisión de desvío pendiente",
        situacion: "Caso didáctico. Cabina reporta una condición médica seria. El avión está controlable y sin limitaciones técnicas; aún no se ha decidido si el destino o un alterno permitirá recibir asistencia a tiempo.",
        preguntas: [
          {
            q: "¿Qué se informa primero y qué no se inventa?",
            a: "PM puede declarar PAN PAN si la condición requiere prioridad o coordinación, e informar que hay una urgencia médica a bordo, la intención provisional y la asistencia requerida. No da un diagnóstico como hecho si no está confirmado ni anuncia un destino que aún no se decidió."
          },
          {
            q: "Si el peligro se vuelve grave e inmediato, ¿se mantiene PAN PAN?",
            a: "No por inercia. La tripulación actualiza a MAYDAY si ahora se necesita ayuda inmediata, dice qué cambió y qué requiere. Una urgencia médica puede llegar a justificar MAYDAY."
          },
        ],
        concepto: "La señal ayuda a ATS a priorizar; la decisión se actualiza con la evolución del riesgo.",
      },
      {
        kind: "enLaOperacion",
        momento: "Coordinar la prioridad sin ceder el control",
        texto: "PF conserva control y navegación; PM comunica la urgencia, registra lo que ATS autoriza y coordina con cabina. Si necesita tiempo para una lista técnica, lo pide sin aceptar una aproximación precipitada. PAN PAN no concede por sí solo una ruta ni una prioridad de aterrizaje: todo cambio se colaciona.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "No actualizar la declaración", text: "Si el riesgo o la ayuda necesaria cambian, ATS debe saberlo." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "PAN PAN: seguridad afectada sin necesidad de ayuda inmediata.",
          "MAYDAY prevalece cuando hay peligro grave o inminente.",
          "Condición, intención, posición y apoyo requerido, con datos ciertos.",
          "Una urgencia médica puede requerir PAN PAN o incluso MAYDAY.",
          "PAN PAN MEDICAL no es la señal para un pasajero enfermo.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
          { kind: "p", text: "**Sin señal.** Una condición sin efecto de seguridad ni necesidad de prioridad puede comunicarse en lenguaje claro, sin PAN PAN." },
          { kind: "p", text: "**Respuesta de ATS.** Acusa la urgencia, avisa a las dependencias y al explotador y puede controlar la frecuencia para evitar interferencias. La tripulación sigue escuchando y colaciona lo crítico. El SOP determina el reparto de tareas, no la definición de urgencia." },
          { kind: "p", text: "**Urgencia médica.** Puede justificar prioridad y coordinación mientras el vuelo sigue controlado; si hay peligro grave o inminente que requiere ayuda inmediata, la evaluación puede llevar a MAYDAY. Se comunica qué se necesita: desvío, atención al llegar, tiempo estimado o limitaciones, sin prometer una pista que no está autorizada." },
          { kind: "callout", tone: "warn", title: "Clasificar solo por el nombre de la falla", text: "Una etiqueta técnica no define por sí sola PAN PAN o MAYDAY. Se evalúa amenaza, control del avión, margen y necesidad de ayuda." },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "EASA SERA.14095 · CAP 413 Ed. 24 · Aerocivil eAIP",
        bloques: [
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, revisión agosto de 2025, SERA.14095: definiciones, señal PAN PAN, mensaje, prioridad, respuesta ATS y transporte sanitario protegido: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9854" },
          { kind: "p", text: "UK CAA, CAP 413 Radiotelephony Manual, edición 24, 8.2, 8.3, 8.13 y 8.14: definición de urgencia, «PAN PAN, PAN PAN, PAN PAN», orden del mensaje y PAN PAN MEDICAL. Fuente oficial del Reino Unido que reproduce la fraseología OACI: https://www.caa.co.uk/media/km2juvmx/cap413-edition-24-radio-telephony.pdf" },
          { kind: "p", text: "Aerocivil, portal oficial de la AIP Colombia y acceso a la eAIP vigente para datos locales: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "La historieta, el intercambio y el escenario son didácticos; no representan una transmisión real ni establecen que una condición médica o técnica específica pertenezca siempre a una categoría. No se inventan rutas, frecuencias, pistas o autorizaciones." },
        ],
      },
    ],
  },
  // ── 36 ──────────────────────────────────────────────────────────────────
  {
    n: 36,
    title: "MAYDAY o PAN PAN",
    kicker: "Clasificar el riesgo y actualizar a ATS",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "«Motor», «humo» o «pasajero enfermo» no deciden la señal. MAYDAY es peligro grave o inminente con necesidad de ayuda inmediata; PAN PAN, seguridad afectada sin esa necesidad. Si no hay ninguna de las dos, la limitación se informa en lenguaje claro. Lo decisivo es el riesgo real y la ayuda que se necesita ahora.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-36-01.svg",
        alt: "Tres estados de comunicación: informar sin señal, urgencia PAN PAN y socorro MAYDAY, según gravedad y ayuda necesaria.",
        ancho: 1600,
        alto: 900,
        pie: "Mapa de decisión basado en EASA SERA.14095. Se reconoce por dos criterios: peligro grave o inminente y necesidad de ayuda inmediata. Si la condición cambia, la tripulación actualiza a la dependencia del servicio de tránsito aéreo (ATS, Air Traffic Services); el nombre de una falla no decide por sí solo.",
      },
      { kind: "sub", text: "Una comparación que sí sirve en cabina" },
      {
        kind: "table",
        head: ["Criterio", "MAYDAY · socorro", "PAN PAN · urgencia"],
        rows: [
          ["Condición", "Peligro grave o inminente; ayuda inmediata.", "Seguridad afectada; sin ayuda inmediata."],
          ["Prioridad", "Absoluta.", "Sobre el tráfico normal, nunca sobre el socorro."],
          ["Respuesta ATS", "Acusa, coordina y puede imponer silencio.", "Acusa, coordina y puede controlar la frecuencia."],
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-36-02.webp",
        alt: "Historieta de tres paneles: tripulación evalúa una condición, comunica cuando se agrava y ATS coordina ayuda.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no transcripción real: 1) PF y PM evalúan una anomalía sin asignarle todavía una señal; 2) aparece humo y PM comunica la gravedad mientras PF mantiene el control; 3) ATS acusa y coordina. El humo visible obliga a reevaluar el riesgo; no toda anomalía debe etiquetarse de antemano.",
      },
      { kind: "sub", text: "Proceso en cuatro movimientos" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Aviate:** el piloto que vuela (PF, pilot flying) mantiene el avión; el piloto que monitorea (PM, pilot monitoring) reúne hechos y prepara la llamada.",
          "**Clasificar y transmitir:** MAYDAY o PAN PAN al inicio, con el mensaje de la lección 34.",
          "**Coordinar:** se dice qué ayuda o margen se necesita; cada autorización nueva se confirma, o se contesta UNABLE.",
          "**Reevaluar:** una urgencia que empeora pasa a MAYDAY; un socorro que termina se cancela.",
        ],
      },
      {
        kind: "escenario",
        titulo: "Del aviso inicial al socorro",
        situacion: "Caso didáctico. En crucero aparece un olor anormal y una indicación que exige revisar un sistema. El avión es controlable. Minutos después hay humo persistente en cabina y la fuente no se identifica.",
        preguntas: [
          {
            q: "¿Se declara MAYDAY automáticamente por el primer olor?",
            a: "No se decide solo por el nombre del indicio. PF mantiene el vuelo y PM comunica a ATS la limitación y la necesidad de tiempo o prioridad. PAN PAN puede corresponder si la seguridad está afectada sin requerir aún ayuda inmediata."
          },
          {
            q: "Con humo persistente no controlado, ¿qué cambia?",
            a: "Se reevalúa como peligro grave o inminente con necesidad de ayuda inmediata. PM inicia un MAYDAY con el efecto observable, la intención y la asistencia necesaria. ATS coordina, sin que la señal equivalga a una autorización concreta."
          },
          {
            q: "Si desaparece el humo, ¿basta con callar?",
            a: "No. La tripulación informa el cambio y, solo si el socorro realmente terminó, lo cancela. Si queda una limitación, la comunica. ATS gestiona el fin formal del tráfico de socorro."
          },
        ],
        concepto: "La señal se actualiza con el riesgo y la ayuda requerida, no con una lista de fallas prefijada.",
      },
      {
        kind: "enLaOperacion",
        momento: "Decisión compartida, responsabilidad clara",
        texto: "El comandante integra evaluación técnica, tiempo, terreno, combustible y SOP. PM no reduce esa decisión a una palabra: transmite qué ocurre, cómo afecta al vuelo, qué hará la tripulación y qué necesita de ATS.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "No actualizar a ATS", text: "Seguir en PAN PAN cuando ya se necesita ayuda inmediata retrasa la respuesta; dejar un MAYDAY sin cancelar también distorsiona la frecuencia." },
      { kind: "callout", tone: "warn", title: "Confundir prioridad con autorización", text: "La prioridad organiza la ayuda; no aprueba desvíos, niveles ni pistas. Eso se coordina y se colaciona." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "MAYDAY: peligro grave o inminente y ayuda inmediata necesaria.",
          "PAN PAN: seguridad afectada sin esa necesidad inmediata.",
          "El socorro prevalece sobre la urgencia y el tráfico normal.",
          "Se declara con datos ciertos y se amplía cuando la cabina puede.",
          "La señal se actualiza si el riesgo cambia; no otorga autorizaciones.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
          {
            kind: "table",
            head: ["Criterio", "MAYDAY · socorro", "PAN PAN · urgencia"],
            rows: [
              ["Primera llamada", "Señal MAYDAY al inicio; preferiblemente tres veces.", "Señal PAN PAN al inicio; preferiblemente tres veces."],
              ["Contenido", "Dependencia, identificación, naturaleza, intención, posición/nivel/rumbo y otros datos útiles, según sea posible.", "Los mismos campos, tantos como haga falta y pueda transmitirse."],
            ],
          },
          { kind: "p", text: "La tabla resume EASA SERA.14095, no una clasificación de fallas del manual de un explotador. Tampoco prescribe un código de transpondedor para cada columna. Declarar la señal no concede por sí mismo una ruta, una altitud o una pista." },
          { kind: "p", text: "La cabina puede enviar primero un mensaje breve y completar después personas a bordo, autonomía y asistencia en tierra. Una declaración no traslada a ATC el control de la aeronave." },
          { kind: "callout", tone: "warn", title: "Un diagnóstico no es una señal", text: "Una falla de motor, una situación médica o el humo tienen efectos variables. La gravedad y la ayuda necesaria determinan la declaración; el manual de operaciones aporta procedimientos específicos del explotador." },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "EASA SERA.14095 · CAP 413 Ed. 24 · Aerocivil eAIP",
        bloques: [
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, revisión agosto de 2025, SERA.14095: definiciones, prioridad, contenido de las primeras transmisiones, respuesta ATS y cancelación: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9854" },
          { kind: "p", text: "UK CAA, CAP 413 Radiotelephony Manual, edición 24, 8.2, 8.3 y 8.8: definiciones de socorro y urgencia, las dos señales, y la recomendación de declarar temprano y cancelar después si el problema resulta menor. Fuente oficial del Reino Unido que reproduce la fraseología OACI." },
          { kind: "p", text: "Aerocivil, portal oficial AIP Colombia y eAIP para verificar datos y procedimientos locales vigentes: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "El escenario y la historieta son didácticos, no transcripciones. No se inventan distintivos, posiciones, frecuencias, pistas ni autorizaciones. Las normas europeas citadas ilustran la estructura y la prioridad; no sustituyen la publicación colombiana aplicable." },
        ],
      },
    ],
  },
  // ── 37 ──────────────────────────────────────────────────────────────────
  {
    n: 37,
    title: "MINIMUM FUEL y emergencia de combustible",
    kicker: "Del aviso preventivo al socorro",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "MINIMUM FUEL dice que la tripulación ya se comprometió con un aeródromo y que cualquier cambio a la autorización puede hacerla aterrizar con menos de la reserva final. No es una emergencia ni da prioridad. Si el combustible calculado al aterrizar en el aeródromo seguro más cercano queda por debajo de la reserva final, la llamada es MAYDAY, MAYDAY, MAYDAY, FUEL.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-37-01.svg",
        alt: "Comparación de MINIMUM FUEL con MAYDAY FUEL según la reserva final calculada al aterrizar.",
        ancho: 1600,
        alto: 900,
        pie: "Comparación basada en EASA CAT.OP.MPA.185 y SERA.11012. MINIMUM FUEL advierte que un cambio o demora puede comprometer la reserva final; MAYDAY FUEL se declara al calcular menos reserva final en el aeródromo seguro más cercano. La tripulación usa sus datos reales y recalcula tras cualquier demora.",
      },
      { kind: "sub", text: "La secuencia antes de hablar" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Actualizar el cálculo:** combustible utilizable, consumo real, demoras, meteorología y reservas. Importa el pronóstico al aterrizar, no una cifra aislada.",
          "**Pedir la demora:** si el margen se reduce, se pregunta a ATS la demora esperada. «Sin demora prevista» es un pronóstico, no una garantía.",
          "**Emitir la señal correcta:** MINIMUM FUEL o MAYDAY FUEL, según el criterio de arriba.",
          "**Seguir coordinando:** intención y asistencia con datos reales; se recalcula tras cada cambio.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-37-02.webp",
        alt: "Historieta de tres paneles: pilotos verifican cálculo de combustible, PM informa por radio y ATS coordina.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no una transmisión real: 1) el piloto que vuela (PF, pilot flying) y el piloto que monitorea (PM, pilot monitoring) comparan opciones y reserva; 2) PM informa mientras PF sigue volando; 3) ATS comunica demora y coordina. Ninguna pantalla, hoja o imagen contiene una cifra, ruta, frecuencia o autorización para uso operacional.",
      },
      { kind: "sub", text: "Así suena" },
      {
        kind: "code",
        text: [
          "PILOT: AVIANCA 452, MINIMUM FUEL",
          "PILOT: MAYDAY, MAYDAY, MAYDAY, FUEL, (dependencia), AVIANCA 452, (situación, intención, posición, nivel, rumbo)",
        ].join("\n"),
      },
      { kind: "p", text: NOTA_EJEMPLO },
      {
        kind: "p",
        text: "Las dos declaraciones vienen del Anexo 6 de la OACI, Parte I, 4.3.7.2.2 y 4.3.7.2.3. Según EASA SERA.11012, ante MINIMUM FUEL el controlador informa la demora prevista o que no la espera; con eso la tripulación recalcula. Si la demora no es aceptable, lo dice y transmite su intención.",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "Cómo responde el ATC a MINIMUM FUEL según la OACI (Doc 4444, PANS-ATM, 15.5.4): texto no disponible en las fuentes de este módulo.",
      },
      {
        kind: "escenario",
        titulo: "Una demora cambia el pronóstico de llegada",
        situacion: "Caso didáctico. En la llegada, la tripulación ya se comprometió con un aeródromo y PM declaró MINIMUM FUEL. ATS informa ahora una demora, y el nuevo cálculo deja incluso al aeródromo seguro más cercano por debajo de la reserva final.",
        preguntas: [
          {
            q: "¿Qué aportó la primera llamada y qué no obtuvo?",
            a: "MINIMUM FUEL hizo explícitos el compromiso y la vulnerabilidad ante una demora; ATS debía informar la demora prevista. No equivale a socorro ni da prioridad automática."
          },
          {
            q: "Con el cálculo bajo la reserva final, ¿basta con repetir MINIMUM FUEL?",
            a: "No. El comandante declara MAYDAY, MAYDAY, MAYDAY, FUEL y PM comunica condición, intención y ayuda requerida. ATS puede dar prioridad, pero cada autorización se recibe y se verifica."
          },
        ],
        concepto: "El umbral es prospectivo: el pronóstico al aterrizar, no el momento en que el indicador llega a la reserva final.",
      },
      {
        kind: "enLaOperacion",
        momento: "PF vuela; PM informa con cálculo trazable",
        texto: "PM registra combustible y pronóstico, escucha la demora, compara opciones seguras y comunica la decisión del comandante. El SOP define las comprobaciones. En Colombia se verifican los procedimientos locales en la publicación vigente de Aerocivil.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Esperar prioridad automática", text: "MINIMUM FUEL no es socorro. Una frase ambigua como «low fuel» no expresa el umbral." },
      { kind: "callout", tone: "warn", title: "Esperar al indicador de reserva", text: "Se compara con lo previsto al aterrizar en el aeródromo seguro más cercano, no con lo que quedará cuando ya sea tarde." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "MINIMUM FUEL: compromiso con un aeródromo y vulnerabilidad a cambios; sin prioridad.",
          "ATS informa la demora esperada o que no la prevé.",
          "MAYDAY, MAYDAY, MAYDAY, FUEL: bajo la reserva final en el aeródromo seguro más cercano.",
          "No se espera a consumir la reserva final para declarar.",
          "Tras cada demora se recalcula y se informa la intención.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
          { kind: "p", text: "**Opciones seguras.** Antes de comprometerse con un aeródromo se comprueba que sigue siendo una opción segura. Un desvío no se anuncia como decidido si aún no lo está; una opción que desaparece exige recalcular." },
          { kind: "p", text: "**El criterio de socorro.** EASA CAT.OP.MPA.185(d) usa el combustible utilizable calculado al aterrizar en el aeródromo seguro más cercano, comparado con la reserva final prevista. MAYDAY va al comienzo de la primera llamada y FUEL identifica la naturaleza. La autonomía, si se pide, se da con unidades claras." },
          { kind: "p", text: "**Una ruta imposible.** Si ATS ofrece una ruta que el avión no puede cumplir, PM dice UNABLE, explica la limitación y propone una intención ejecutable." },
          { kind: "p", text: "**Otras formas que vas a oír.** En el Reino Unido (CAP 413, 8.30) el controlador responde a MINIMUM FUEL con la demora en minutos o las millas que faltan hasta la toma. En Estados Unidos (FAA JO 7110.65BB, 2-1-8) «minimum fuel» tiene otra definición y no implica prioridad; si hace falta prioridad, se declara emergencia. El manual académico de Aerocivil de 2019 da de ejemplo «MAYDAY DUE TO FUEL», que no es la forma OACI." },
          { kind: "callout", tone: "warn", title: "Tomar una demora estimada como compromiso", text: "La demora comunicada por ATS es información para recalcular. Las condiciones pueden cambiar; se monitorea y se actualiza la declaración si el margen desaparece." },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "OACI Anexo 6 · EASA CAT.OP.MPA.185 · SERA.11012 · CAP 413",
        bloques: [
          { kind: "p", text: "OACI, Anexo 6, Parte I, 4.3.7.2.2 (MINIMUM FUEL: «This is not an emergency situation but an indication that an emergency situation is possible should any additional delay occur») y 4.3.7.2.3 («MAYDAY, MAYDAY, MAYDAY, FUEL»). Fuente secundaria: texto de la Enmienda 36 citado por EASA SIB 2013-12 (23 de julio de 2013) y el boletín IFALPA 13ATSBL01; la numeración del Anexo pudo cambiar después." },
          { kind: "p", text: "UK CAA, CAP 413 Radiotelephony Manual, edición 24, 8.29 a 8.32: «MINIMUM FUEL», respuesta del controlador del Reino Unido y «MAYDAY, MAYDAY, MAYDAY FUEL». Fuente oficial del Reino Unido; la respuesta del controlador es procedimiento británico: https://www.caa.co.uk/media/km2juvmx/cap413-edition-24-radio-telephony.pdf" },
          { kind: "p", text: "EASA, Easy Access Rules for Air Operations, revisión marzo de 2026, CAT.OP.MPA.185(c) y (d): criterios de MINIMUM FUEL y MAYDAY FUEL para aviones de transporte comercial: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-air-operations?erules-id=ERULES-1963177438-12803" },
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, revisión agosto de 2025, SERA.11012 y GM1: información de demora del controlador y naturaleza no urgente de MINIMUM FUEL: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9921" },
          { kind: "p", text: "FAA JO 7110.65BB, cambio 3, 2-1-8: definición estadounidense de «minimum fuel». Es norma de la FAA, no de la OACI." },
          { kind: "p", text: "OACI, Doc 4444 PANS-ATM, sección 15.5.4 (respuesta del ATC): no se obtuvo el texto en fuente oficial para este módulo; edición alojada en ATMiKIT: https://applications.icao.int/tools/ATMiKIT/story_content/external_files/story_content/external_files/DOC%204444_PANS%20ATM_en.pdf" },
          { kind: "p", text: "Aerocivil, portal oficial de AIP Colombia y eAIP para datos y procedimientos colombianos vigentes: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "El intercambio, el escenario y la historieta son didácticos, no transcripciones. Los criterios europeos citados no sustituyen RAC, AIP ni manual del explotador aplicables al vuelo real." },
        ],
      },
    ],
  },
  // ── 38 ──────────────────────────────────────────────────────────────────
  {
    n: 38,
    title: "TCAS/ACAS RA",
    kicker: "Responder, informar y recuperar la autorización",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "El sistema anticolisión de a bordo (ACAS, Airborne Collision Avoidance System), que en los equipos se llama TCAS, detecta encuentros con otras aeronaves con transpondedor. Un aviso de tránsito (TA, Traffic Advisory) sirve para buscar el tránsito y no ordena maniobrar. Un aviso de resolución (RA, Resolution Advisory) se sigue aunque contradiga al control de tránsito aéreo (ATC, Air Traffic Control), salvo que seguirlo comprometa la seguridad del avión.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-38-01.svg",
        alt: "Secuencia TA, respuesta a RA, aviso a ATC, libre de conflicto y regreso a la autorización.",
        ancho: 1600,
        alto: 900,
        pie: "Secuencia basada en EASA SERA.11014 y AMC1 SERA.14001. TA permite observar, no maniobrar por sí solo; ante RA se responde primero y se informa cuando la carga lo permite. Tras CLEAR OF CONFLICT se inicia el retorno y se confirma cuando la autorización está reanudada.",
      },
      { kind: "sub", text: "Primero la maniobra, después la radio" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**RA:** el piloto que vuela (PF, pilot flying) sigue de inmediato la guía del equipo y sus cambios, y nunca maniobra en sentido contrario.",
          "**Aviso:** el piloto que monitorea (PM, pilot monitoring) dice TCAS RA en cuanto la carga lo permite.",
          "**Orden contraria:** se sigue el RA y se contesta UNABLE, TCAS RA.",
          "**Recuperación:** RETURNING TO al iniciar el regreso; RESUMED cuando ya se reanudó la autorización.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-38-02.webp",
        alt: "Historieta de tres paneles: tripulación observa tráfico, responde a RA y controlador coordina tras el aviso.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no un caso ni una transcripción real: 1) la tripulación observa un aviso de tránsito sin maniobrar solo por él; 2) PF responde al RA y PM avisa cuando la carga lo permite; 3) ATC coordina hasta recibir CLEAR OF CONFLICT. Las pantallas son ilustrativas y no muestran un RA, nivel ni ruta para uso operacional.",
      },
      { kind: "sub", text: "Así suena" },
      {
        kind: "code",
        text: [
          "PILOT: AVIANCA 452, TCAS RA",
          "ATC:   AVIANCA 452, ROGER",
          "PILOT: AVIANCA 452, CLEAR OF CONFLICT, RETURNING TO (assigned clearance)",
          "ATC:   AVIANCA 452, ROGER",
          "PILOT: AVIANCA 452, CLEAR OF CONFLICT, (assigned clearance) RESUMED",
        ].join("\n"),
      },
      { kind: "p", text: NOTA_EJEMPLO },
      {
        kind: "p",
        text: "Con el aviso TCAS RA, el controlador deja de ser responsable de separar a esa aeronave de las afectadas por la maniobra y no intenta cambiar su trayectoria hasta CLEAR OF CONFLICT. La recupera cuando la tripulación informa RESUMED, o cuando emite otra autorización y la tripulación la acusa. Por eso RETURNING TO y RESUMED no son sinónimos.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "En Colombia puedes oír otra forma",
        text: "El manual académico de fraseología de Aerocivil (2019) usa «T-CAS descent» o «T-CAS climb». No es la fraseología OACI vigente: se dice TCAS RA.",
      },
      {
        kind: "escenario",
        titulo: "RA durante un cambio de nivel autorizado",
        situacion: "Caso didáctico. La aeronave cambia de nivel con autorización. Aparece un TA y luego un RA cuya guía contradice la instrucción vigente. PF responde al equipo; PM está ocupado verificando la trayectoria.",
        preguntas: [
          {
            q: "¿Se llama antes de ejecutar el RA?",
            a: "No. PF responde de inmediato al RA, salvo que hacerlo comprometiera la seguridad del avión. PM informa TCAS RA en cuanto la carga de trabajo lo permite. No se espera permiso de ATC para obedecer el RA."
          },
          {
            q: "ATC repite una instrucción incompatible, ¿cómo contesta PM?",
            a: "UNABLE, TCAS RA. La tripulación sigue la indicación del RA y sus modificaciones; ATC acusa y no intenta modificar la trayectoria hasta recibir CLEAR OF CONFLICT."
          },
        ],
        concepto: "Responder al RA, informar cuando se pueda y distinguir retorno iniciado de autorización recuperada.",
      },
      {
        kind: "enLaOperacion",
        momento: "Durante el encuentro y después",
        texto: "PF controla la trayectoria con la guía aprobada; PM vigila tránsito, autorización y transmisiones. El SOP fija el reparto y el uso de automatismos. Ver un avión cerca no prueba que sea el que causó el RA. Después se revisan autorización, altitud real y reportes que exijan el explotador y el Estado.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Dar preferencia a una orden contraria", text: "Se sigue el RA pese a la instrucción ATC incompatible, salvo riesgo mayor para el propio avión. PM informa UNABLE, TCAS RA." },
      { kind: "callout", tone: "warn", title: "Confundir RETURNING TO con RESUMED", text: "Una anuncia el retorno en curso; la otra, que ya se reanudó lo autorizado." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "TA: observar y prepararse; no maniobrar solo por el aviso.",
          "RA: responder de inmediato, salvo riesgo mayor para el propio avión.",
          "TCAS RA cuando la carga lo permita; UNABLE, TCAS RA ante orden contraria.",
          "CLEAR OF CONFLICT, RETURNING TO inicia la recuperación; RESUMED la confirma.",
          "Automatismos y reportes dependen del avión, el explotador y el Estado.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
          {
            kind: "table",
            head: ["Momento", "Mensaje de la tripulación", "Qué significa para ATC"],
            rows: [
              ["RA con desviación", "TCAS RA", "La tripulación responde a un RA; ATC acusa y no intenta modificar su trayectoria hasta CLEAR OF CONFLICT."],
              ["Orden contraria al RA", "UNABLE, TCAS RA", "No puede cumplirse la instrucción; se sigue el RA."],
              ["Conflicto resuelto; retorno iniciado", "CLEAR OF CONFLICT, RETURNING TO [autorización vigente]", "La respuesta al RA terminó y la aeronave está regresando; aún no dice que ya alcanzó lo asignado."],
              ["Autorización recuperada", "CLEAR OF CONFLICT, [autorización vigente] RESUMED", "La aeronave volvió a la autorización; ATC acusa o emite y coordina una alternativa."],
            ],
          },
          { kind: "p", text: "**TA.** Ambos pilotos buscan el tránsito sin crear una desviación vertical por el TA ni por una interpretación visual incierta." },
          { kind: "p", text: "**Durante el RA.** La desviación se limita a lo necesario y el RA puede modificarse durante el encuentro. Las acciones del piloto automático y del director de vuelo dependen del tipo de aeronave y del procedimiento del fabricante." },
          { kind: "p", text: "**Pronunciación.** La guía de EUROCONTROL indica que TCAS RA se dice «TEE-CAS-AR-AY». En el Reino Unido «ACAS» es una alternativa aceptada. Si no se pudo avisar el RA durante la maniobra, se informa igual después (CAP 413, 5.35)." },
          { kind: "callout", tone: "warn", title: "Maniobrar por TA", text: "TA alerta y favorece la búsqueda de tránsito; no ordena por sí solo una maniobra. Una reacción vertical innecesaria puede crear otro conflicto." },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "EASA SERA.11014 · AMC1 SERA.14001 · CAP 413 Ed. 24 · Aerocivil eAIP",
        bloques: [
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, revisión agosto de 2025, SERA.11014 y GM3 a GM6: prioridad del RA, aviso, recuperación, responsabilidad de separación y limitación de TA: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9921" },
          { kind: "p", text: "EASA, misma publicación, AMC1 SERA.14001: TCAS RA, UNABLE, TCAS RA y las dos llamadas CLEAR OF CONFLICT: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299" },
          { kind: "p", text: "UK CAA, CAP 413 Radiotelephony Manual, edición 24, 5.31 a 5.35: «BIGJET 347, TCAS RA» / «BIGJET 347, Roger», las dos llamadas «clear of conflict» y «unable TCAS RA». Fuente oficial del Reino Unido que reproduce la fraseología OACI: https://www.caa.co.uk/media/km2juvmx/cap413-edition-24-radio-telephony.pdf" },
          { kind: "p", text: "EUROCONTROL, ICAO Phraseology Reference Guide (iniciativa ALL CLEAR): las mismas cuatro frases y la pronunciación «TEE-CAS-AR-AY». Fuente secundaria: https://skybrary.aero/sites/default/files/bookshelf/115.pdf" },
          { kind: "p", text: "Aerocivil, Manual Guía de Fraseología Aeronáutica, versión académica, tercera edición (mayo de 2019), 5.11.4 y 7.1, con la AIC A04/2015: forma «T-CAS descent / T-CAS climb». Copia alojada en un sitio académico, no en aerocivil.gov.co: secundaria y posiblemente desactualizada." },
          { kind: "p", text: "OACI, Airborne Collision Avoidance System Manual Doc 9863, copia oficial de referencia, secciones 5.2.1.15 a 5.2.1.18: https://www.icao.int/meetings/anconf12/document%20archive/9863_cons_en.pdf" },
          { kind: "p", text: "Aerocivil, portal oficial AIP Colombia y eAIP para datos y procedimientos colombianos vigentes: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "La historieta, el intercambio y el escenario son didácticos, no transcripciones. Las fuentes europeas ilustran el marco y la fraseología, sin sustituir las reglas locales ni el manual del avión y del explotador." },
        ],
      },
    ],
  },
  // ── 39 ──────────────────────────────────────────────────────────────────
  {
    n: 39,
    title: "RVSM",
    kicker: "Avisar la pérdida de capacidad sin demora",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "La separación vertical mínima reducida (RVSM, Reduced Vertical Separation Minimum) aplica 1 000 ft entre los niveles de vuelo (FL, Flight Level) 290 y 410 inclusive, entre aeronaves aprobadas. La aprobación no garantiza la capacidad todo el vuelo: si una falla o la turbulencia impiden mantener la altura, se avisa sin demora al control de tránsito aéreo (ATC, Air Traffic Control).",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-39-01.svg",
        alt: "Banda RVSM de FL 290 a FL 410 y mensajes ante incapacidad por equipo o turbulencia.",
        ancho: 1600,
        alto: 900,
        pie: "Esquema basado en EASA SERA.11013 y AMC1 SERA.14001. Se reconoce una pérdida de capacidad porque el equipo o la turbulencia ya no permiten mantener la performance vertical requerida. La decisión de cabina es avisar sin demora y obtener una autorización revisada o aplicar la contingencia pertinente si no puede esperar.",
      },
      { kind: "sub", text: "Detectar, comunicar y coordinar" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Comprobar el efecto:** altímetros, mantenimiento de nivel, automatismos y la lista del avión.",
          "**Avisar sin demora:** UNABLE RVSM DUE EQUIPMENT o DUE TURBULENCE, con lo que el avión puede hacer y lo que necesita.",
          "**No cambiar de nivel por decirlo:** se sigue la autorización hasta recibir otra, salvo una contingencia que exija actuar antes.",
          "**Confirmar la recuperación:** READY TO RESUME RVSM informa, no autoriza.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-39-02.webp",
        alt: "Historieta de tres paneles: pilotos comprueban altimetría, PM informa incapacidad RVSM y ATS coordina.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no un vuelo real: 1) ambos pilotos comparan indicaciones y comprueban la capacidad; 2) el piloto que vuela (PF, pilot flying) conserva el control y el piloto que monitorea (PM, pilot monitoring) avisa a ATC; 3) los controladores coordinan separación o una alternativa. Las pantallas no representan valores ni rutas válidos.",
      },
      { kind: "sub", text: "Fraseología con contexto" },
      {
        kind: "table",
        head: ["Situación", "Frase", "Decisión que implica"],
        rows: [
          ["ATC comprueba aprobación", "CONFIRM RVSM APPROVED / AFFIRM RVSM", "No usar AFFIRM si se perdió la capacidad."],
          ["Aeronave no aprobada", "NEGATIVE RVSM", "Estado de aprobación, no una falla en vuelo."],
          ["Falla de equipo", "UNABLE RVSM DUE EQUIPMENT", "Avisar y pedir coordinación."],
          ["Turbulencia", "UNABLE RVSM DUE TURBULENCE", "Solo si impide mantener la altura."],
          ["Capacidad recuperada", "READY TO RESUME RVSM", "Esperar coordinación."],
        ],
      },
      {
        kind: "escenario",
        titulo: "Desacuerdo altimétrico en crucero",
        situacion: "Caso didáctico. En espacio RVSM hay indicaciones altimétricas discrepantes y la tripulación concluye que ya no puede demostrar la performance vertical requerida. Aún no hay autorización nueva.",
        preguntas: [
          {
            q: "¿Qué mensaje debe salir y cuándo?",
            a: "Sin demora, PM transmite el distintivo y UNABLE RVSM DUE EQUIPMENT, seguido de la capacidad actual de mantener nivel y una solicitud concreta si hace falta."
          },
          {
            q: "¿Se desciende automáticamente fuera de RVSM después de la llamada?",
            a: "No. La frase no autoriza a dejar el nivel. Si el vuelo puede seguir seguro, se espera la instrucción revisada; si la seguridad exige actuar ya, se aplica la contingencia y se comunica."
          },
        ],
        concepto: "La capacidad de mantener altura se comprueba, se comunica y se vuelve a confirmar cuando cambia.",
      },
      {
        kind: "enLaOperacion",
        momento: "No perder de vista autorización y contingencia",
        texto: "El manual del avión, la lista de equipo mínimo (MEL, Minimum Equipment List) y la aprobación del explotador definen qué sistemas sostienen RVSM. PF mantiene el control; PM documenta la discrepancia, avisa y confirma la nueva autorización. Para Colombia, la referencia local sale de la eAIP de Aerocivil.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Seguir sin avisar", text: "Perder la performance vertical afecta la separación que usa ATC. El aviso no espera al próximo cambio de frecuencia." },
      { kind: "callout", tone: "warn", title: "Asumir un descenso autorizado", text: "UNABLE RVSM informa una limitación; no permite elegir otro nivel por cuenta propia." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "RVSM: 1 000 ft entre FL 290 y FL 410 inclusive.",
          "La performance degradada se informa sin demora.",
          "UNABLE RVSM DUE EQUIPMENT o DUE TURBULENCE dice la causa.",
          "READY TO RESUME RVSM informa la recuperación, no autoriza.",
          "La maniobra siguiente se coordina con ATC o sale de una contingencia publicada.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
          { kind: "p", text: "**Qué necesita saber ATC:** distintivo, estado RVSM, causa observable, si se puede mantener el nivel actual e intención o solicitud. Una indicación anómala no basta para diagnosticar una causa por radio: se determina si la performance requerida puede sostenerse." },
          { kind: "p", text: "Estas expresiones constan en EASA AMC1 SERA.14001. La fraseología exacta y las condiciones de entrada de aeronaves no aprobadas pueden variar por región y Estado; esta lección no inventa una exención ni una autorización colombiana." },
          { kind: "p", text: "Tras resolver la discrepancia, se verifica que la capacidad se recuperó y se informa READY TO RESUME RVSM. Un simple cese de la alarma no demuestra la recuperación. Las contingencias difieren entre espacios continentales y oceánicos." },
          { kind: "callout", tone: "warn", title: "Confundir aprobación con capacidad actual", text: "Un avión aprobado puede quedar temporalmente incapaz. NEGATIVE RVSM no reemplaza la frase de degradación por equipo o turbulencia." },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "EASA SERA.11013 · AMC1 SERA.14001 · Aerocivil eAIP",
        bloques: [
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, revisión agosto de 2025, SERA.11013 y GM1, notificación de performance degradada en espacio RVSM: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9921" },
          { kind: "p", text: "EASA, misma publicación, AMC1 SERA.14001, fraseología RVSM de aprobación, degradación y recuperación: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299" },
          { kind: "p", text: "EASA, Easy Access Rules for Air Operations, revisión marzo de 2026, orientación de operación RVSM y contingencias de equipo/meteorología: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-air-operations?erules-id=ERULES-1963177438-13098" },
          { kind: "p", text: "Aerocivil, portal oficial AIP Colombia y eAIP para espacios, procedimientos y publicaciones locales vigentes: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "La historieta y el escenario son didácticos. La aplicación local y las contingencias particulares se verifican en la publicación vigente y en el manual del explotador; no se han inventado niveles, rutas ni autorizaciones." },
        ],
      },
    ],
  },
  // ── 40 ──────────────────────────────────────────────────────────────────
  {
    n: 40,
    title: "PBN, RNAV y RNP",
    kicker: "Declarar una capacidad que cambió en vuelo",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "La navegación basada en la performance (PBN, Performance-Based Navigation) fija requisitos para una ruta o procedimiento. RNAV (Area Navigation) permite volar trayectorias definidas; RNP (Required Navigation Performance) añade vigilancia y alerta a bordo. En la radio la pregunta es una: ¿el avión, el explotador y la tripulación cumplen ahora la especificación? Una autorización no arregla una degradación.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-40-01.svg",
        alt: "Comparación conceptual RNAV y RNP y secuencia de aviso ante performance degradada.",
        ancho: 1600,
        alto: 900,
        pie: "Esquema conceptual basado en OACI Doc 9613 y EASA AMC1 SERA.14001. RNAV y RNP no son nombres intercambiables de una aproximación: la especificación publicada determina los requisitos. Si la capacidad efectiva deja de cumplirla, la decisión es comprobar el efecto, informar a ATC y coordinar una alternativa.",
      },
      { kind: "sub", text: "Antes de aceptar un procedimiento" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Lee la especificación exacta:** RNAV 1, RNP 1 y RNP APCH no son equivalentes.",
          "**Comprueba aprobación y equipo:** la documentación, la lista de equipo mínimo (MEL, Minimum Equipment List) y la habilitación deciden si puedes aceptarlo.",
          "**Contrasta la base de datos:** si la ruta cargada no coincide con la publicación, se aclara antes de aceptarla.",
          "**Separa sensor de capacidad:** perder GNSS no siempre es perder toda la función RNAV; se verifica con el procedimiento del avión.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-40-02.webp",
        alt: "Historieta de tres paneles: tripulación identifica limitación de navegación, PM informa a ATC y el controlador coordina alternativa.",
        ancho: 1600,
        alto: 900,
        pie: "Historieta didáctica, no un vuelo real: 1) los pilotos verifican la alerta y la especificación que afecta; 2) el piloto que vuela (PF, pilot flying) conserva el control y el piloto que monitorea (PM, pilot monitoring) informa la incapacidad y solicita una opción viable; 3) ATC coordina una autorización alternativa. Las pantallas son ilustrativas y no contienen rutas, cartas o valores utilizables.",
      },
      { kind: "sub", text: "Cuando se degrada la navegación" },
      {
        kind: "p",
        text: "El aviso es temprano y concreto: distintivo, especificación afectada, causa conocida, qué parte de la autorización no se puede cumplir y qué alternativa sí se puede volar. Pedir vectores u otra aproximación no es permiso para iniciarla.",
      },
      {
        kind: "table",
        head: ["Situación", "Expresión documentada"],
        rows: [
          ["Falla RNAV por equipo", "UNABLE RNAV DUE EQUIPMENT"],
          ["Pérdida de una especificación", "UNABLE RNP (tipo) o RNAV, DUE TO (razón)"],
          ["Salida o llegada no aceptable", "UNABLE (designador) DEPARTURE / ARRIVAL DUE RNAV TYPE"],
          ["ATC pregunta por GNSS", "CONFIRM GNSS NAVIGATION / AFFIRM GNSS NAVIGATION"],
          ["Sin capacidad RNAV", "NEGATIVE RNAV"],
        ],
      },
      {
        kind: "escenario",
        titulo: "Alerta de navegación antes de una llegada PBN",
        situacion: "Caso didáctico. Antes de una llegada publicada que exige RNP aparece una alerta de integridad y la tripulación confirma que ya no puede demostrar la performance requerida. Una aproximación convencional podría estar disponible, pero no está comprobada ni autorizada.",
        preguntas: [
          { q: "¿Qué se informa primero al control?", a: "PM comunica sin demora la incapacidad para la especificación afectada, con la causa conocida y la parte de la llegada que ya no puede aceptarse. Puede solicitar tiempo, vectores o una alternativa publicada viable. No afirma que falló toda la navegación." },
          { q: "¿Puede la tripulación cambiar por sí sola a la aproximación convencional?", a: "No. Primero verifica que exista, esté vigente y sea compatible; luego la solicita y espera una autorización clara." },
        ],
        concepto: "Especificación publicada, aprobación y capacidad actual deben coincidir antes de aceptar o seguir una ruta PBN.",
      },
      {
        kind: "enLaOperacion",
        momento: "Preparación, vuelo y reprogramación",
        texto: "Si hay degradación, PF conserva el control; PM revisa qué funciones quedan, informa a ATC y confirma la nueva autorización antes de que ambos actualicen el sistema de gestión de vuelo (FMS, Flight Management System). En Colombia, cartas y procedimientos salen de la eAIP de Aerocivil.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Confundir ruta publicada con aprobación", text: "Que el procedimiento esté cargado en el FMS no prueba que avión, explotador y tripulación estén habilitados." },
      { kind: "callout", tone: "warn", title: "Seguir o improvisar una trayectoria", text: "No se vuela una especificación que ya no se cumple ni se inventa un punto: se informa y se coordina." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "PBN fija requisitos; RNP añade vigilancia y alerta a bordo.",
          "Especificación, aprobación, equipo y base de datos antes de aceptar.",
          "Si la capacidad baja del requisito, se avisa sin demora.",
          "UNABLE dice qué no se puede cumplir; la alternativa se pide.",
          "La recuperación se confirma y se comunica antes de replanear.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        bloques: [
          {
            kind: "table",
            head: ["Situación", "Uso prudente"],
            rows: [
              ["Falla RNAV por equipo", "Comunicar una degradación RNAV confirmada, no cualquier aviso aislado."],
              ["Pérdida de una especificación", "Precisar qué especificación se perdió y una razón comprobada; EASA incluye LOSS OF RAIM o RAIM ALERT como ejemplos."],
              ["Salida o llegada no aceptable", "Usar solo con el designador real publicado y cuando el tipo RNAV sea la limitación."],
              ["ATC pregunta por GNSS", "Afirmar únicamente si la capacidad necesaria sigue disponible después de la comprobación."],
              ["Sin capacidad RNAV", "No confundir ausencia de capacidad con una restricción de un solo procedimiento."],
            ],
          },
          { kind: "p", text: "Las expresiones aparecen en EASA AMC1 SERA.14001, apartados de estado GNSS, RNAV y degradación de performance. La vigilancia autónoma de integridad del receptor (RAIM, Receiver Autonomous Integrity Monitoring) es un ejemplo de causa, no prueba de que toda aeronave con una alerta RAIM haya perdido toda navegación. La fraseología local vigente se verifica antes de usarla como procedimiento colombiano." },
          { kind: "p", text: "Si la alerta desaparece, se sigue el procedimiento del avión para confirmar la recuperación. PM informa la capacidad actualizada, pero la llegada original no queda restituida sin una autorización nueva." },
          { kind: "callout", tone: "warn", title: "Convertir una alerta en diagnóstico absoluto", text: "La falla de un sensor no prueba que todas las capacidades RNAV/RNP hayan desaparecido. Se comprueba el efecto conforme al avión y se comunica lo que se sabe." },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "OACI Doc 9613 · EASA AMC1 SERA.14001 · Aerocivil eAIP",
        bloques: [
          { kind: "p", text: "OACI, Performance-Based Navigation Manual (Doc 9613), quinta edición de 2023, descripción oficial de RNAV y RNP: https://store.icao.int/en/performance-based-navigation-pbn-manual-doc-9613" },
          { kind: "p", text: "OACI, material de referencia PBN: una especificación RNP añade vigilancia y alerta a bordo frente a RNAV: https://www.icao.int/sites/default/files/safety/pbn/PBNStatePlans/China-PBN-implementation-plan.pdf" },
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, AMC1 SERA.14001, apartados 1.1.14 a 1.1.16 de estado GNSS, RNAV y degradación de performance: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299" },
          { kind: "p", text: "EASA, Easy Access Rules for Air Operations, orientación de aprobaciones y procedimientos PBN: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-air-operations?erules-id=ERULES-1963177438-13098" },
          { kind: "p", text: "Aerocivil, portal oficial de la AIP/eAIP colombiana para cartas, rutas y procedimientos vigentes: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "El escenario y la historieta son didácticos; ninguna imagen representa una carta o ruta real. La aplicación local se verifica en la publicación vigente y en el manual del explotador." },
        ],
      },
    ],
  },
]
