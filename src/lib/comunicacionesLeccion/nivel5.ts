/**
 * Nivel 5 · Vigilancia, contingencias y emergencias (lecciones 31 a 40, capítulos 31 a 40 de la especificación).
 *
 * Transpondedor, falla de comunicaciones, socorro y urgencia, combustible,
 * TCAS/ACAS y las capacidades que el ATC da por hechas (RVSM, PBN) hasta que
 * dejan de estar.
 *
 * Fuente: docs/comunicaciones/nivel-5.md, entero. Cada intercambio del
 * Markdown es un bloque `code` con su significado debajo (`ejemplo`); los
 * rótulos (VERIFICAR) y PLAIN LANGUAGE de cada ejemplo se conservan en su
 * título y en su significado. Lo que el Markdown marca VERIFICAR sale en un
 * callout «Verificar» visible al empezar la fraseología y, completo, en el
 * detalle técnico de FUENTES. Los «Escenario de práctica» del capítulo 36 van
 * como `escenario`. El formato de los bloques y de los huecos está documentado
 * al inicio de index.ts.
 *
 * Ojo: la cabecera de nivel-5.md trae un VERIFICAR de bloqueo de publicación
 * (el nivel depende del Doc 4444 cap. 12 y 15, del Doc 9432 cap. 9 y del
 * Anexo 10 Vol. II cap. 5, no cargados). Va en las convenciones de cada
 * detalle técnico y en el callout de cada lección.
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

/** El aviso visible de lo que no está verificado en la lección. */
function verificar(text: string): DocBlockData {
  return { kind: "callout", tone: "verificar", title: "Verificar", text }
}

/** Cómo leer los ejemplos: va al empezar la fraseología de cada lección. */
const COMO_LEER: DocBlockData = {
  kind: "callout",
  tone: "info",
  title: "Cómo leer los ejemplos",
  text: "`AVIATORY 452` (y AVIATORY 425 o 542), las estaciones, frecuencias, códigos SSR, niveles y waypoints (GIKOS, TOLMA) son **ficticios**. Frase **sin etiqueta**: su estructura está en el Doc 9432 o el Doc 4444 cargados (el párrafo exacto va en Fuentes). **VERIFICAR**: no está en las fuentes cargadas y se confirma en el documento indicado. **PLAIN LANGUAGE**: lenguaje claro, no fraseología normalizada.",
}

/** Las convenciones de los ejemplos de todo el nivel (cabecera de nivel-5.md). */
const CONVENCIONES: DocBlockData = {
  kind: "list",
  items: [
    "**VERIFICAR (bloqueo de publicación).** Este nivel depende de capítulos no cargados (Doc 4444 cap. 12 y 15, Doc 9432 cap. 9, Anexo 10 Vol. II cap. 5). No se publica hasta verificar cada línea VERIFICAR.",
    "Distintivo ficticio en todos los ejemplos: `AVIATORY 452` (y AVIATORY 425 o 542 cuando se necesitan distintivos parecidos).",
    "«Bogota Control», «Bogota Approach» y «Bogota Tower» son estaciones de ejemplo educativo. Frecuencias, códigos SSR, niveles y waypoints (GIKOS, TOLMA, ficticios) son didácticos, no datos del AIP.",
    "Fuentes cargadas: Doc 9432 (4.ª ed., 2007, ES), Doc 4444 (15.ª ed., Enm. 4, 2012, ES) cap. 1 a 5, Doc 9835 (2.ª ed., 2010, ES). La 15.ª edición del Doc 4444 no es la vigente: toda cita suya se revisa contra la edición en vigor antes de publicar.",
    "Cuando una línea en inglés no es fraseología normalizada, va rotulada **PLAIN LANGUAGE**.",
  ],
}

/** El bloque FUENTES de cada capítulo, plegado. */
function fuentes(cita: string, verificado: string, porVerificar: string[]): DocBlockData {
  return {
    kind: "detalleTecnico",
    etiqueta: "Fuentes",
    cita,
    bloques: [
      { kind: "sub", text: "Verificado" },
      { kind: "p", text: verificado },
      { kind: "sub", text: "Por verificar" },
      { kind: "list", items: porVerificar },
      { kind: "sub", text: "Convenciones de los ejemplos" },
      CONVENCIONES,
    ],
  }
}

export const NIVEL_5: DocScreen[] = [
  // ── 31 ──────────────────────────────────────────────────────────────────
  {
    n: 31,
    title: "Transpondedor y SSR",
    kicker: "Código, altitud, IDENT y vigilancia",
    minutes: 18,
    blocks: [
      {
        kind: "p",
        text: "El radar secundario de vigilancia (SSR, Secondary Surveillance Radar) interroga el transpondedor de la aeronave. Su respuesta permite al servicio de tránsito aéreo (ATS, Air Traffic Services) asociar una traza con un código y, según el equipo, con altitud de presión e identificación. En una operación de aerolínea no basta repetir un código por radio: hay que seleccionarlo correctamente, verificar la transmisión y detectar cualquier discrepancia que comunique el controlador.",
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
          { k: "Modo A", v: "Código de cuatro dígitos octales que ATS asigna o que corresponde a una situación especial. El código concreto de un vuelo sale de la autorización real, no de esta lección." },
          { k: "Modo C", v: "Transmite altitud de presión. Un valor que no concuerde con el nivel comunicado debe investigarse; no se corrige inventando un nivel para que coincida con la pantalla del controlador." },
          { k: "Modo S", v: "Permite interrogación selectiva y transmite, entre otros datos, la identificación de la aeronave. Debe concordar con la identificación del plan de vuelo según las reglas aplicables." },
          { k: "IDENT", v: "Función que destaca temporalmente la respuesta de la aeronave para que ATS la identifique. No es un código ni reemplaza una colación verbal." },
        ],
      },
      {
        kind: "p",
        text: "La vigilancia secundaria no convierte automáticamente al controlador en responsable de verificar cada ajuste de cabina. La tripulación mantiene su comprobación independiente del código, modo y estado conforme al equipo y al procedimiento normalizado de operación (SOP, Standard Operating Procedures) del explotador.",
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
          "**Recibir y colacionar:** cuando ATS asigna un código, el piloto que monitorea (PM, pilot monitoring) lo lee dígito por dígito con su distintivo. La fraseología SQUAWK (code) está en la tabla oficial de EASA; el número entre paréntesis es un campo variable, no un código de ejemplo.",
          "**Seleccionar y comprobar:** el piloto designado introduce el código recibido y el otro verifica visualmente el ajuste y el estado de transmisión según el SOP. Un readback perfecto no detecta por sí solo una cifra mal seleccionada.",
          "**Confirmar una duda:** si ATS pide CONFIRM SQUAWK (code), se comprueba lo que realmente indica el equipo y se responde SQUAWKING (code). Si lo seleccionado no coincide con lo asignado, se corrige y se informa; no se confirma de memoria.",
          "**Reajustar cuando proceda:** RESET SQUAWK [(mode)] (code) pide volver a seleccionar modo y código. La tripulación comprueba la configuración y sigue cualquier instrucción adicional; si el equipo no responde, comunica la falla de forma explícita.",
          "**IDENT solo a solicitud:** SQUAWK [(code)] [AND] IDENT solicita operar la función de identificación. Se acciona el control una vez solicitado por ATS; decir la palabra por radio sin activarlo no produce la señal de identificación.",
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Plantillas oficiales, no una conversación grabada",
        text: "SQUAWK (code), CONFIRM SQUAWK (code), SQUAWKING (code), RESET SQUAWK [(mode)] (code), SQUAWK [(code)] [AND] IDENT y SQUAWK CHARLIE proceden de la tabla de fraseología de EASA AMC1 SERA.14001, sección 2.3. Se muestran como plantillas para aprender la estructura; no representan una transmisión de un vuelo ni asignan un código utilizable.",
      },
      { kind: "sub", text: "Cuando la indicación no concuerda" },
      {
        kind: "list",
        items: [
          "**Altitud:** CHECK ALTIMETER SETTING AND CONFIRM (level) exige revisar el reglaje y confirmar el nivel real. Si la indicación transmitida sigue siendo errónea, se informa la discrepancia y se cumplen las instrucciones; STOP SQUAWK CHARLIE WRONG INDICATION es una instrucción distinta que detiene la transmisión de altitud defectuosa.",
          "**Identificación Modo S:** si ATS detecta una identidad diferente, la tabla oficial contempla RE-ENTER [ADS-B or MODE S] AIRCRAFT IDENTIFICATION. Antes de cambiarla se coteja con el plan de vuelo y el procedimiento del equipo; no se reemplaza el distintivo por uno supuesto.",
          "**Equipo inoperativo:** se informa sin rodeos si el transpondedor deja de funcionar. La continuidad del vuelo y el acceso al espacio aéreo dependen de los requisitos y autorizaciones aplicables; no se presume que basta con una llamada de radio.",
        ],
      },
      { kind: "sub", text: "Códigos reservados y decisión" },
      {
        kind: "table",
        head: ["Código", "Situación reconocida", "Lectura operacional"],
        rows: [
          ["7700", "Emergencia", "Se usa de acuerdo con la situación y el procedimiento aplicable. Si ATS ya asignó un código, la regla OACI citada permite mantenerlo salvo otra instrucción; 7700 puede elegirse si hay motivo específico para considerarlo mejor."],
          ["7600", "Falla de radiocomunicaciones", "Señaliza la falla; luego rigen los procedimientos de comunicaciones perdidas para el vuelo y espacio aéreo concretos, no una ruta dibujada aquí."],
          ["7500", "Interferencia ilícita", "Tiene implicaciones de seguridad. No se selecciona para ensayos ni se da por hecho que la tripulación pueda explicar la situación por radio."],
        ],
      },
      {
        kind: "p",
        text: "La OACI reserva estos tres códigos en el Anexo 10, Volumen IV. La fuente oficial de la OACI que reproduce el Doc 8168 aclara que en emergencia se conserva el código previamente especificado por ATS salvo nueva instrucción, aunque el piloto puede seleccionar 7700 si cree que es la mejor medida. La falla de comunicaciones y la interferencia ilícita requieren sus propios procedimientos; no son variaciones de una simple asignación de código.",
      },
      {
        kind: "escenario",
        titulo: "Código colacionado, indicación distinta",
        situacion: "Caso didáctico sin aeródromo, ruta, distintivo, frecuencia ni código discreto inventados. Durante preparación de salida, ATS asigna un código. PM lo colaciona correctamente; al verificar el panel, el piloto que vuela (PF, pilot flying) detecta una cifra distinta. Después de corregirla, ATS pregunta por la indicación de altitud recibida.",
        preguntas: [
          {
            q: "¿Qué hace la tripulación antes de continuar?",
            a: "Detiene la aceptación tácita de la configuración, coteja la autorización y el código real, corrige el ajuste y vuelve a verificarlo en el equipo. Si la discrepancia generó una respuesta incorrecta, la aclara con ATS. El readback inicial no prueba que el panel estuviera bien."
          },
          {
            q: "¿Cómo responde a la pregunta sobre altitud?",
            a: "Revisa reglaje y nivel efectivo, confirma el nivel que vuela y comunica cualquier discrepancia de transmisión. No altera una altitud autorizada ni desactiva por iniciativa propia una función sin identificar el problema y cumplir la instrucción aplicable."
          },
        ],
        concepto: "La vigilancia fiable exige colación, ajuste, comprobación y comunicación de fallas; son controles distintos.",
      },
      {
        kind: "enLaOperacion",
        momento: "De la autorización a la transferencia",
        texto: "PM registra y colaciona el código asignado; la tripulación lo ajusta y lo coteja con el equipo antes de continuar, según el SOP. Una transferencia puede traer un código nuevo, por lo que se vuelve a hacer el ciclo completo. Si ATS solicita IDENT o verifica un nivel discrepante, la tripulación actúa solo tras entender la instrucción y describe el estado real del avión y del transpondedor. El modo y momento de activación en tierra dependen del procedimiento local y del equipo: no se enseña aquí una regla universal de pushback.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Colacionar bien y seleccionar mal", text: "El código dicho por radio y el mostrado en el equipo deben cotejarse por separado; el error de selección puede sobrevivir a un readback correcto." },
      { kind: "callout", tone: "warn", title: "Activar IDENT sin solicitud", text: "IDENT no se pulsa por rutina, al cambiar de frecuencia ni para probar el equipo: se opera cuando ATS lo solicita." },
      { kind: "callout", tone: "warn", title: "Tratar 7500, 7600 o 7700 como códigos ordinarios", text: "Sus significados son reservados. Un ajuste accidental puede desencadenar una respuesta operacional o de seguridad no deseada." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "La respuesta del transpondedor y el readback verbal se verifican por separado.",
          "Modo A es código; Modo C añade altitud de presión; Modo S puede transmitir identificación.",
          "IDENT solo se opera cuando ATS lo solicita.",
          "Una discrepancia de altitud o identidad se comprueba y comunica, no se maquilla.",
          "7700, 7600 y 7500 tienen fines reservados diferentes.",
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
    minutes: 20,
    blocks: [
      {
        kind: "p",
        text: "Una frecuencia inesperadamente silenciosa no demuestra que hayan fallado todas las radios. Puede existir una selección equivocada, una recepción defectuosa, un transmisor inoperativo, una transferencia incompleta o una interrupción en tierra. La tripulación debe mantener el control del avión y distinguir lo que todavía funciona antes de entrar en un procedimiento de comunicaciones perdidas. En vuelo por instrumentos (IFR, Instrument Flight Rules), el perfil posterior depende de la regla del Estado, la autorización y la carta vigentes; una tabla genérica no reemplaza esas fuentes.",
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
          { k: "No recibe", v: "El transmisor puede funcionar, pero la tripulación no oye al servicio de tránsito aéreo (ATS, Air Traffic Services). Debe seguir escuchando por todos los medios disponibles y no asumir que tampoco la reciben." },
          { k: "No transmite", v: "Puede escuchar instrucciones aunque ATS no reciba su voz. Una respuesta visible solicitada por el controlador, como IDENT, puede ayudar a confirmar la recepción." },
          { k: "No hay enlace bilateral", v: "Después de revisar equipo y canales, no se logra intercambio en ambos sentidos. La tripulación aplica las acciones y el procedimiento publicados para ese vuelo." },
        ],
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Mantener la trayectoria segura:** el piloto que vuela (PF, pilot flying) controla el avión, observa el tránsito y conserva la última autorización recibida y colacionada hasta que una regla o instrucción aplicable indique otra cosa. El piloto que monitorea (PM, pilot monitoring) organiza el diagnóstico.",
          "**Revisar selección:** ambos confirman canal activo, panel de audio, recepción, volumen, selector de transmisión, micrófono, auriculares y botón de transmisión. Usan la otra radio o el otro puesto según el procedimiento normalizado de operación (SOP, Standard Operating Procedures), sin alterar inadvertidamente el canal que todavía permite escuchar.",
          "**Reintentar por medios apropiados:** la regla europea SERA.14083 documenta volver al canal anterior, probar otro adecuado a la ruta y luego ATS, otra dependencia u otras aeronaves, mediante medios disponibles como enlace de datos o voz satelital. Esta secuencia ilustra el diagnóstico; no establece una frecuencia ni sustituye la normativa del Estado donde se vuela.",
          "**Separar falla de voz y de enlace:** una conexión de comunicaciones por enlace de datos controlador–piloto (CPDLC, Controller–Pilot Data Link Communications) podría estar disponible mientras falla la voz, pero no debe suponerse que sustituye por sí sola la escucha de voz; se sigue el procedimiento del espacio aéreo y del equipo.",
        ],
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
        text: "La norma EASA SERA.14083 y su material explicativo describen una prueba observable: ATS puede pedir una maniobra especificada, una modificación de respuesta del transpondedor o IDENT y observar el resultado. Si la tripulación oye una instrucción condicional, debe comprenderla y ejecutarla solo si es segura y compatible con las instrucciones recibidas. IDENT no se activa espontáneamente. La prueba puede demostrar que el receptor funciona aunque la voz de respuesta no llegue; no demuestra por sí sola que toda la falla esté resuelta.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Sin indicativos, rumbos ni frecuencias de utilería",
        text: "La expresión condicional IF YOU READ… pertenece a un intercambio en que ATS busca una respuesta observable. El rumbo, el punto y el distintivo de una instrucción real se reciben en vuelo: esta lección no inventa una transmisión ni una ruta. La figura muestra el razonamiento, no una autorización.",
      },
      { kind: "sub", text: "Cuando la pérdida de contacto se confirma" },
      {
        kind: "list",
        items: [
          "**Señalización:** el código reservado 7600 indica falla de radiocomunicaciones. Su selección forma parte del procedimiento aplicable una vez fallan los intentos de restablecer el enlace; no se usa como sustituto de revisar un panel de audio mal configurado.",
          "**Perfil IFR:** nivel, velocidad, trayectoria, regreso desde un vector, espera, hora de descenso y aproximación se determinan con la regla y la carta vigentes del espacio aéreo. No se extrapolan tiempos de otro Estado. La revisión de EASA de 2025 contiene un procedimiento europeo específico, distinto de versiones antiguas que citaban combinaciones de 7 y 20 minutos; esa regla europea no se enseña como norma colombiana.",
          "**Salida o llegada instrumental:** una carta de salida normalizada por instrumentos (SID, Standard Instrument Departure) o de llegada normalizada por instrumentos (STAR, Standard Terminal Arrival Route) puede incluir instrucciones de falla de comunicaciones. Se consulta la publicación actual de la autoridad; esta página no dibuja una SID, STAR o aproximación ficticia.",
          "**Condiciones visuales y aeródromo adecuado:** las alternativas posibles se valoran conforme a la norma aplicable y al vuelo real; no basta con asumir que cualquier campo cercano es utilizable para la aeronave, combustible y meteorología.",
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Colombia: fuente obligatoria antes de volar",
        text: "Para un vuelo en Colombia, la Publicación de Información Aeronáutica (AIP, Aeronautical Information Publication) electrónica —eAIP— de Aerocivil, las cartas vigentes, diferencias publicadas y los Reglamentos Aeronáuticos de Colombia aplicables determinan el procedimiento. Aquí no se fija cronómetro, frecuencia, ruta, nivel ni pista. El portal oficial de Aerocivil enlaza la AIP y las secciones ENR; se verifica allí la revisión efectiva para el aeródromo y espacio aéreo concretos.",
      },
      {
        kind: "escenario",
        titulo: "Silencio tras una transferencia",
        situacion: "Caso didáctico sin espacio aéreo, ruta, distintivo o frecuencia inventados. Una aeronave IFR recibe y colaciona una transferencia, pero no obtiene respuesta en el nuevo canal. PF mantiene el vuelo autorizado. PM detecta que el canal activo no coincide con el recién anotado; después de corregirlo, todavía no recibe respuesta.",
        preguntas: [
          {
            q: "¿Qué comprueban antes de declarar una falla?",
            a: "PM verifica selección activa, panel de audio, volumen, transmisor y micrófono; usa la otra radio o puesto conforme al SOP. Reintenta el canal anterior y otro canal apropiado a la ruta, y coordina con ATS u otra aeronave por los medios disponibles. PF conserva el control y la navegación; ambos vigilan que el diagnóstico no cree otra desviación."
          },
          {
            q: "Si ATS les da una instrucción observable y no pueden contestar, ¿qué demuestra la respuesta?",
            a: "Una maniobra o IDENT solicitados y observados indican que la tripulación recibió esa instrucción y puede actuar. No prueban que el transmisor de voz se haya recuperado. Se sigue escuchando y usando los medios que funcionen, y se aplica la regla de falla completa si no se restablece la comunicación bilateral."
          },
          {
            q: "¿Qué dato falta para planear el vuelo sin radio?",
            a: "Faltan la norma del Estado, la carta vigente, la última autorización colacionada, el estado meteorológico, el combustible y la condición real de la aeronave. No puede reemplazarse esa evaluación por un número de minutos extraído de una regla extranjera."
          },
        ],
        concepto: "Diagnosticar, recuperar y solo entonces aplicar el procedimiento normativo del lugar; el silencio de una frecuencia no es una autorización nueva.",
      },
      {
        kind: "enLaOperacion",
        momento: "PF mantiene el vuelo; PM busca el enlace",
        texto: "La tripulación comunica internamente quién mantiene el control y quién revisa audio y radios. PM anota los intentos y el último permiso recibido, pues la secuencia puede afectar decisiones posteriores. Si se restablece el contacto en otro canal, informa que no pudo comunicarse por el asignado y confirma con ATS el estado de la autorización. Si persiste la falla, PF y PM consultan el procedimiento correspondiente al espacio aéreo y la carta vigente; señalizan la falla como corresponde y evitan mezclar una regla europea o estadounidense con una operación colombiana.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Pasar a 7600 antes de revisar el audio", text: "Una selección o volumen errados pueden explicar el silencio. El diagnóstico tiene pasos concretos y no se resuelve aumentando la potencia de la voz o repitiendo llamadas sin pausa." },
      { kind: "callout", tone: "warn", title: "Tratar CPDLC como solución automática", text: "Un enlace de datos disponible no implica que toda la coordinación ni la obligación de escucha de voz queden suspendidas. Se comprueba qué capacidad queda y qué regla rige." },
      { kind: "callout", tone: "warn", title: "Copiar el cronómetro de otro Estado", text: "Los tiempos, perfiles y condiciones del procedimiento de pérdida de comunicaciones son normativos. Un valor de una edición antigua o jurisdicción distinta puede llevar a una trayectoria incorrecta." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "PF mantiene vuelo y navegación; PM diagnostica los sistemas de comunicación.",
          "Canal anterior, otro apropiado y otros medios se intentan antes de asumir pérdida total.",
          "Una respuesta observable puede confirmar recepción sin confirmar transmisión de voz.",
          "7600 identifica la falla cuando procede; el perfil IFR sale de la norma y carta vigentes.",
          "Para Colombia se consulta únicamente Aerocivil/eAIP oficial para datos locales.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "EASA SERA.14083 · Aerocivil AIP · OACI Anexo 10",
        bloques: [
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, revisión agosto de 2025, SERA.14083 y AMC1 SERA.14083(b)(1), recuperación de contacto, pruebas observables y procedimiento europeo: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9832" },
          { kind: "p", text: "EASA SERA.8035, obligación de escucha de voz aun con CPDLC establecida: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9888" },
          { kind: "p", text: "OACI, Anexo 10 Vol. IV, código 7600 reservado para falla de radiocomunicaciones: https://applications.icao.int/tools/ATMiKIT/story_content/external_files/story_content/external_files/Annex10_Volume%204_cons.pdf" },
          { kind: "p", text: "Aerocivil, portal oficial de la AIP Colombia y acceso a eAIP: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
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
    minutes: 17,
    blocks: [
      {
        kind: "p",
        text: "121,5 megahercios (MHz) es la frecuencia aeronáutica de emergencia en muy alta frecuencia (VHF, Very High Frequency). Es un canal común para comunicaciones de seguridad cuando el canal habitual no sirve o cuando las circunstancias requieren llegar a otras estaciones. No es una frecuencia de trabajo ordinaria. En una emergencia con contacto establecido, el primer mensaje se transmite normalmente en el canal aire–tierra en uso: el servicio de tránsito aéreo (ATS, Air Traffic Services) que ya conoce el vuelo puede actuar sin perder tiempo en una búsqueda de frecuencia.",
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
          "**Mensaje de socorro o urgencia:** EASA SERA.14095 especifica el canal aire–tierra en uso para el mensaje inicial; su material explicativo permite usar 121,5 MHz u otro canal si es necesario o deseable. La prioridad es que el mensaje llegue, no completar una secuencia mecánica de sintonización.",
          "**Recuperar contacto:** si la frecuencia asignada no responde, la tripulación revisa la cabina e intenta el canal anterior y otros medios apropiados, como se explica en la lección 32. El canal de emergencia puede servir para contactar una estación o responder a un llamado de búsqueda. Tras recuperar el enlace, se confirma con ATS la frecuencia y autorización vigentes.",
          "**Escucha preventiva:** determinadas rutas o áreas exigen mantener escucha de 121,5 MHz en la medida permitida por el equipo y la carga de trabajo; otras operaciones la mantienen por procedimiento normalizado de operación (SOP, Standard Operating Procedures) del explotador. No se afirma que todos los vuelos deban dedicar siempre la segunda radio al canal de emergencia.",
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
        text: "Tener 121,5 MHz sintonizada, escuchar una portadora o transmitir una vez sin respuesta no prueba que una estación haya recibido el mensaje. Si una tripulación oye un llamado dirigido a su aeronave, confirma la identidad, escucha la instrucción completa y responde de forma breve. Si sirve de retransmisor para otra aeronave, identifica claramente qué parte del mensaje procede de ella y qué información ha recibido de ATS. Una transmisión rutinaria innecesaria puede ocupar el canal cuando se necesita para socorro.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "La escucha tiene condiciones concretas",
        text: "La regla europea SERA.14080 exige escucha continua en vuelos largos sobre agua y determinadas áreas, con excepciones por otros canales, equipo o tareas de cabina; también en rutas o áreas de posible interceptación cuando la autoridad competente lo haya establecido. Su material de orientación recomienda escucha en otros vuelos cuando sea posible. Esto describe Europa, no asigna una obligación colombiana. Para Colombia se verifica la eAIP de Aerocivil, el equipo y el SOP aplicable.",
      },
      { kind: "sub", text: "Radiobalizas e interceptación: vínculo, no equivalencia" },
      {
        kind: "p",
        text: "El transmisor localizador de emergencia (ELT, Emergency Locator Transmitter) y la comunicación de voz en 121,5 MHz cumplen funciones distintas. El manual de espectro de la Organización de Aviación Civil Internacional (OACI, International Civil Aviation Organization) señala que 121,5 MHz se usa también para localización de ELT y que el sistema satelital COSPAS–SARSAT ya no vigila esa frecuencia como canal de alerta. Una señal de baliza o un llamado de interceptación merecen atención, pero la respuesta se rige por los procedimientos aplicables; no se improvisa una posición o instrucción por oír una portadora.",
      },
      {
        kind: "escenario",
        titulo: "Sin respuesta en el canal asignado; un llamado en 121,5",
        situacion: "Caso didáctico sin ruta, distintivo, frecuencia ATS, altitud ni aeródromo inventados. En crucero IFR, después de una transferencia, la tripulación no logra contacto en el canal asignado. El piloto que vuela (PF, pilot flying) mantiene la autorización colacionada; el piloto que monitorea (PM, pilot monitoring) revisa radio y audio. Tras reintentar el canal anterior, escucha en 121,5 MHz un llamado que podría ser para su aeronave.",
        preguntas: [
          {
            q: "¿Cómo identifica si el llamado es suyo y qué responde?",
            a: "PM escucha el distintivo completo y la instrucción. Si corresponde a su aeronave, contesta con su identificación y colaciona los datos que lo requieran; si el distintivo no es claro, pide aclaración en vez de asumirlo. Luego confirma con ATS el canal y la autorización efectivos."
          },
          {
            q: "¿Qué cambia si, antes de perder contacto, aparece una condición de socorro?",
            a: "Si el enlace asignado todavía funciona, la declaración de socorro se transmite allí, con la información esencial, para que ATS actúe. Si ese enlace falla o la situación hace preferible otro medio, 121,5 MHz está disponible. No se retrasa el mensaje urgente por una regla rígida de sintonización."
          },
          {
            q: "¿Qué no prueba una llamada sin respuesta por 121,5?",
            a: "No demuestra que ATS la haya recibido ni que haya una autorización nueva. La tripulación sigue buscando contacto por medios apropiados y, si no se recupera, aplica la norma de comunicaciones perdidas del espacio aéreo concreto."
          },
        ],
        concepto: "121,5 MHz es un recurso de seguridad, no un atajo para omitir el canal asignado ni una autorización implícita.",
      },
      {
        kind: "enLaOperacion",
        momento: "Monitoreo en crucero y llamada inesperada",
        texto: "PM conoce qué radio está dedicada al canal ATS y cuál, si el SOP lo indica, escucha 121,5 MHz. Cuando aparece una llamada en el canal de emergencia, no silencia sin más la escucha de control: comprueba el destinatario y coordina con PF la prioridad. Si la llamada permite restablecer el contacto, informa a ATS que el canal asignado no funcionó y confirma el permiso vigente. Ante un mensaje de otra aeronave en peligro, puede retransmitirlo con precisión si ayuda y si la carga de trabajo lo permite. Se evita usar el canal para comprobaciones o charla no esenciales.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Cambiar primero a 121,5 durante una emergencia con contacto ATS", text: "Si el controlador en el canal en uso ya recibe a la aeronave, declarar allí normalmente acelera la respuesta. Se usa el canal de emergencia cuando las circunstancias lo hagan necesario o deseable." },
      { kind: "callout", tone: "warn", title: "Tratar la escucha como una transmisión confirmada", text: "La radio puede estar sintonizada y nadie haber recibido un mensaje. Se necesita acuse de recibo o acción comprobable y, si no lo hay, se siguen los procedimientos de recuperación." },
      { kind: "callout", tone: "warn", title: "Ocupar el canal para coordinación rutinaria", text: "Una conversación no esencial puede interferir con comunicaciones de socorro, urgencia o recuperación de contacto." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "121,5 MHz es una frecuencia aeronáutica de emergencia, no un canal rutinario.",
          "El mensaje inicial de socorro o urgencia se transmite en el canal en uso cuando es posible.",
          "Ayuda a recuperar contacto cuando fallan los canales normales.",
          "La escucha depende de norma, área, equipo y SOP; no es idéntica en todos los vuelos.",
          "Sintonizar o transmitir sin respuesta no equivale a haber informado a ATS.",
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
    minutes: 19,
    blocks: [
      {
        kind: "p",
        text: "Socorro es una condición de peligro grave o inminente que exige ayuda inmediata. La señal radiotelefónica es MAYDAY, preferiblemente pronunciada tres veces al iniciar la primera comunicación. La declaración da a las comunicaciones de socorro prioridad absoluta: permite que el servicio de tránsito aéreo (ATS, Air Traffic Services) organice la frecuencia, el tránsito y la asistencia. No sustituye las acciones de control del avión ni una lista de verificación; la tripulación comunica en cuanto la carga de trabajo lo permite.",
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
          "**Piloto que vuela:** el piloto que vuela (PF, pilot flying) mantiene trayectoria segura, ejecuta acciones inmediatas y usa la lista aplicable. No se desvía de una situación crítica solo para narrar todos los detalles a ATS.",
          "**Piloto que monitorea:** el piloto que monitorea (PM, pilot monitoring) apoya la cabina y transmite la declaración cuando puede. El reparto real depende del procedimiento normalizado de operación (SOP, Standard Operating Procedures) y del estado de la aeronave.",
          "**Primer mensaje:** incluye tanto como sea posible, no necesariamente todos los elementos. Si solo hay tiempo para la señal, la identificación y la naturaleza del peligro, se transmite eso y se completa luego. EASA SERA.14095 pide hablar despacio y con claridad cuando la situación lo permite.",
          "**Canal:** con contacto establecido, se usa el canal aire–tierra en uso. La frecuencia de emergencia 121,5 MHz u otro canal puede usarse si las circunstancias hacen necesario o deseable llegar a otras estaciones; no se impone un cambio de canal antes de declarar.",
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
      { kind: "sub", text: "La estructura que debe poder construir" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Señal:** MAYDAY al comienzo de la primera comunicación, preferiblemente tres veces. No es un saludo ni una etiqueta tardía después de un relato largo.",
          "**A quién y quién:** dependencia ATS si hay tiempo, seguida de la identificación completa de la aeronave.",
          "**Naturaleza:** qué peligro grave o inminente afecta al vuelo. Debe ser comprensible para que ATS elija la ayuda adecuada; no se requiere diagnosticar por radio la causa técnica exacta antes de declarar.",
          "**Intención:** qué planea hacer la tripulación ahora: por ejemplo, mantener el vuelo, iniciar una acción necesaria o solicitar prioridad. La intención se expresa con datos reales del momento, no con una pista o altitud inventada.",
          "**Ubicación y movimiento:** posición, nivel y rumbo actuales cuando puedan transmitirse. Si alguno es incierto, se aclara; no se improvisa una coordenada.",
          "**Información complementaria:** combustible o autonomía, personas a bordo, material peligroso o asistencia requerida se puede dar después, cuando la cabina esté estabilizada y ATS lo solicite o resulte útil.",
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Plantilla de aprendizaje, no conversación de un vuelo",
        text: "MAYDAY × 3 — [dependencia] — [identificación real] — [naturaleza] — [intención] — [posición, nivel, rumbo]. Los corchetes son campos por completar con información cierta del vuelo; no asignan indicativo, ruta, pista, frecuencia o nivel. La estructura se apoya en EASA SERA.14095 y se adapta a la capacidad de comunicación disponible.",
      },
      { kind: "sub", text: "Qué hace ATS y qué sigue haciendo la tripulación" },
      {
        kind: "p",
        text: "ATS acusa inmediatamente el mensaje, asume el control de esas comunicaciones o transfiere explícitamente esa responsabilidad y coordina con otras dependencias y el explotador. Puede mantener el tráfico de socorro en la frecuencia inicial o transferirlo si otra ofrece mejor asistencia. La aeronave continúa volando y ejecutando su procedimiento; una nueva instrucción de rumbo, nivel o pista se escucha, evalúa y colaciona si la carga de trabajo lo permite. Si no puede cumplir, lo dice; la declaración no convierte cualquier instrucción en automáticamente ejecutable.",
      },
      {
        kind: "p",
        text: "La aeronave en socorro o ATS puede imponer silencio a estaciones que interfieran usando STOP TRANSMITTING y MAYDAY. Las demás aeronaves no ocupan la frecuencia salvo condiciones previstas, incluida la prestación de ayuda. Cuando termina la condición de socorro, la tripulación la cancela por radio; ATS comunica el fin del tráfico de socorro y del silencio de acuerdo con su procedimiento. La tripulación no declara por sí sola terminadas las comunicaciones de todas las estaciones.",
      },
      {
        kind: "escenario",
        titulo: "Primero el control, después el mensaje completo",
        situacion: "Caso didáctico sin aeronave, posición, frecuencia ni falla técnica específica inventadas. Durante una situación de peligro grave e inmediato en crucero, PF se concentra en estabilizar el avión y PM prepara la llamada. Al principio PM conoce la naturaleza del problema y la intención inmediata, pero todavía no tiene una posición confirmada ni el cálculo actualizado de autonomía.",
        preguntas: [
          {
            q: "¿Se espera a tener todos los campos antes de decir MAYDAY?",
            a: "No. Cuando la cabina lo permita, PM transmite MAYDAY y los datos seguros que ya tiene: identificación, naturaleza e intención, con la dependencia si hay tiempo. La posición, nivel, rumbo y otros datos se completan a continuación. PF sigue controlando el vuelo."
          },
          {
            q: "ATS da una nueva instrucción que la aeronave no puede cumplir mientras ejecuta la lista. ¿Qué hace PM?",
            a: "La escucha y la contrasta con el estado del avión y la carga de trabajo. Si no es posible cumplirla, informa UNABLE y la razón o intención de forma breve cuando puede transmitir. No colaciona una autorización imposible como si fuera aceptada."
          },
          {
            q: "Al resolverse la condición grave, ¿qué se comunica?",
            a: "La tripulación informa y cancela su condición de socorro cuando realmente terminó. ATS decide y comunica el fin del tráfico de socorro y del silencio conforme a su autoridad y al estado de la frecuencia."
          },
        ],
        concepto: "MAYDAY activa ayuda inmediata, pero la prioridad de cabina sigue siendo el control de la aeronave y una comunicación cierta, por etapas.",
      },
      {
        kind: "enLaOperacion",
        momento: "Primera llamada y seguimiento",
        texto: "El briefing de cabina se reduce a quién vuela, quién comunica, qué se necesita de ATS y qué información falta confirmar. PM puede empezar con un mensaje breve y más tarde proporcionar autonomía, personas a bordo, asistencia en tierra e intención revisada. PF y PM conservan conciencia de la ruta y de cualquier instrucción nueva. Si se requiere cambio de frecuencia, se confirma antes de dejar una comunicación que funciona, salvo que la situación imponga otra acción. Una mejora temporal no se confunde automáticamente con el fin del peligro.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Demorar la llamada por completar la plantilla", text: "La norma dice tantos elementos como sea posible. Una declaración temprana, clara y cierta permite a ATS comenzar la ayuda mientras llegan más detalles." },
      { kind: "callout", tone: "warn", title: "Llamar antes de controlar el avión", text: "PF no abandona una acción inmediata de seguridad para construir un mensaje largo. PM transmite cuando la carga de trabajo lo permite." },
      { kind: "callout", tone: "warn", title: "Aceptar una instrucción imposible", text: "En emergencia se siguen colacionando los datos críticos cuando es posible, pero una orden incompatible con el estado del avión requiere comunicar UNABLE y la intención real." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "MAYDAY señala peligro grave o inminente con necesidad de ayuda inmediata.",
          "El primer mensaje va en la frecuencia en uso cuando hay contacto.",
          "Se transmite lo esencial cuanto antes; el resto llega cuando la cabina puede.",
          "ATS acusa, coordina y protege las comunicaciones de socorro.",
          "La cancelación de la condición y el fin del tráfico son actos distintos.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "EASA SERA.14095 · EASA AMC1 SERA.14001 · Aerocivil eAIP",
        bloques: [
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, revisión agosto de 2025, SERA.14095 (definición, señal, contenido, prioridad, ATS, silencio y fin de las comunicaciones): https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9854" },
          { kind: "p", text: "EASA, misma publicación, AMC1 SERA.14001, fraseología estándar de imposibilidad de cumplimiento: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299" },
          { kind: "p", text: "Aerocivil, portal oficial de la AIP Colombia y eAIP para información local vigente: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "La historieta y el escenario son didácticos, no transcripciones. No se asigna una condición real a una aeronave, ni se inventa posición, ruta, frecuencia o autorización." },
        ],
      },
    ],
  },
  // ── 35 ──────────────────────────────────────────────────────────────────
  {
    n: 35,
    title: "Urgencia: PAN PAN",
    kicker: "Seguridad afectada sin ayuda inmediata",
    minutes: 18,
    blocks: [
      {
        kind: "p",
        text: "Urgencia describe una condición que afecta la seguridad de una aeronave, otro vehículo o una persona a bordo o a la vista, pero que no exige ayuda inmediata. Su señal radiotelefónica es PAN PAN, preferiblemente repetida tres veces al comienzo del primer mensaje. Tiene prioridad sobre el tráfico normal, aunque no sobre las comunicaciones de socorro MAYDAY. La elección no depende únicamente del nombre de la falla o del diagnóstico de un pasajero: depende de su efecto actual, el margen operativo y la ayuda necesaria.",
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
          "**Qué ha cambiado:** el piloto que vuela (PF, pilot flying) y el piloto que monitorea (PM, pilot monitoring) determinan si la aeronave permanece controlable, qué sistemas o capacidades se redujeron y qué tareas impone la lista de verificación aplicable.",
          "**Qué asistencia se necesita:** prioridad para desviarse, tiempo para completar una lista, coordinación de servicios médicos o una pista adecuada pueden hacer necesario informar una urgencia. Una condición grave que requiere ayuda inmediata se declara como socorro; una condición sin efecto de seguridad ni necesidad de prioridad puede comunicarse en lenguaje claro sin señal.",
          "**Qué se sabe y qué falta:** no se declara un diagnóstico médico no confirmado ni se afirma que un sistema de respaldo funciona sin comprobarlo. Se comunica el efecto observable y la intención actual; luego se amplía.",
          "**Cómo evoluciona:** PAN PAN no encierra al vuelo en una categoría permanente. Si aparece peligro grave o inminente, se usa MAYDAY. Si la urgencia termina, se informa a ATS de que ya no se requiere prioridad.",
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
      { kind: "sub", text: "Mensaje útil, no relato clínico o técnico" },
      {
        kind: "p",
        text: "EASA SERA.14095 establece el canal aire–tierra en uso y, en lo posible, el orden: dependencia del servicio de tránsito aéreo (ATS, Air Traffic Services), identificación, naturaleza de la urgencia, intención del piloto al mando, posición/nivel/rumbo y otra información útil. PAN PAN inicia la primera comunicación; se pronuncia preferiblemente tres veces, cada grupo como la palabra francesa panne. La información adicional puede incluir autonomía, personas a bordo, materiales peligrosos y recursos necesarios, cuando sea pertinente y confiable.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Plantilla oficial sin datos ficticios",
        text: "PAN PAN × 3 — [ATS] — [identificación real] — [naturaleza y efecto] — [intención y solicitud] — [posición, nivel, rumbo] — [otros datos útiles]. Es una plantilla de aprendizaje, no una transcripción. Los campos variables se completan únicamente con la situación real; no hay ruta, frecuencia, pista, código ni autorización de ejemplo.",
      },
      { kind: "sub", text: "Una urgencia médica exige juicio, no una etiqueta automática" },
      {
        kind: "p",
        text: "La enfermedad de un pasajero puede justificar prioridad y coordinación médica mientras el vuelo se mantiene controlado. En ese caso PAN PAN puede ser apropiado. Si la condición implica peligro grave o inminente y requiere ayuda inmediata, la evaluación puede llevar a MAYDAY; no es correcto enseñar que un pasajero enfermo nunca lo justifica. La tripulación comunica qué necesita: desvío, atención al llegar, tiempo estimado o cualquier limitación del vuelo, sin inventar diagnóstico ni prometer una pista que aún no está autorizada.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "PAN PAN MEDICAL tiene otro significado",
        text: "La señal específica PAN PAN seguida de MAY-DEE-CAL está prevista en EASA SERA.14095(c)(4) para identificar un transporte sanitario protegido por los Convenios de Ginebra. No se usa por el solo hecho de llevar a un pasajero que necesita asistencia médica.",
      },
      { kind: "sub", text: "Respuesta de ATS y actualización" },
      {
        kind: "p",
        text: "ATS acusa la urgencia y comunica lo necesario a las dependencias y al explotador; puede controlar la frecuencia para evitar interferencias. La tripulación sigue escuchando autorizaciones y colaciona lo crítico. Si necesita tiempo para la lista o una opción de desvío, lo solicita con claridad; no supone que PAN PAN ya concedió una ruta o prioridad de aterrizaje específica. Una mejora o deterioro se comunica. El procedimiento normalizado de operación (SOP, Standard Operating Procedures) determina el reparto de tareas, no la definición reglamentaria de urgencia.",
      },
      {
        kind: "escenario",
        titulo: "Necesidad médica con decisión de desvío pendiente",
        situacion: "Caso didáctico sin pasajero identificable, aeródromo, ruta, distintivo o frecuencia inventados. La tripulación de cabina comunica una condición médica seria. La aeronave continúa controlable y sin limitaciones técnicas; PF mantiene el vuelo mientras PM recopila información útil. Aún no se ha decidido si el aeródromo previsto o un alterno permitirá recibir asistencia a tiempo.",
        preguntas: [
          {
            q: "¿Qué se informa primero y qué no se inventa?",
            a: "PM puede declarar PAN PAN si la condición requiere prioridad o coordinación, e informar que hay una urgencia médica a bordo, la intención provisional y la asistencia requerida. No da un diagnóstico como hecho si no está confirmado ni anuncia un destino que aún no se decidió."
          },
          {
            q: "¿Qué más necesita la tripulación para decidir?",
            a: "Evalúa el estado comunicado por cabina, tiempo a aeródromos adecuados, combustible, meteorología, capacidad de recibir asistencia y autorizaciones disponibles. Comunica a ATS su opción cuando la elige y colaciona cualquier cambio de ruta o nivel."
          },
          {
            q: "Si el peligro se vuelve grave e inmediato, ¿se mantiene PAN PAN?",
            a: "No por inercia. La tripulación actualiza a MAYDAY si ahora se necesita ayuda inmediata, dice qué cambió y qué requiere. La prioridad debe reflejar la condición actual, no la primera clasificación."
          },
        ],
        concepto: "La señal ayuda a ATS a priorizar, pero la decisión operativa se actualiza con información real y la evolución del riesgo.",
      },
      {
        kind: "enLaOperacion",
        momento: "Coordinar la prioridad sin ceder el control",
        texto: "PF conserva control y navegación; PM comunica la urgencia, registra lo que ATS autoriza y coordina con cabina. El primer mensaje puede ser breve, seguido de autonomía, asistencia requerida y destino elegido cuando estén confirmados. Si se necesita tiempo para una lista técnica, PM solicita margen sin aceptar una aproximación precipitada. Si la condición se estabiliza y deja de requerir prioridad, se informa; si empeora, se eleva la señal. Todo desvío, rumbo o nivel nuevo se verifica y colaciona conforme a la carga de trabajo.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Clasificar solo por el nombre de la falla", text: "Una etiqueta técnica no define por sí sola PAN PAN o MAYDAY. Se evalúa amenaza, control del avión, margen y necesidad de ayuda." },
      { kind: "callout", tone: "warn", title: "Declarar PAN PAN MEDICAL para un pasajero", text: "Esa señal especial identifica transporte sanitario protegido; no es la forma estándar de anunciar a un pasajero enfermo." },
      { kind: "callout", tone: "warn", title: "No actualizar la declaración", text: "Si el riesgo o la ayuda necesaria cambian, ATS debe saberlo. Una clasificación inicial no debe ocultar un deterioro posterior." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "PAN PAN indica seguridad afectada sin necesidad de ayuda inmediata.",
          "MAYDAY prevalece cuando hay peligro grave o inminente que exige ayuda inmediata.",
          "Se comunica condición, intención, posición y apoyo requerido con datos ciertos.",
          "Una urgencia médica puede requerir PAN PAN o incluso MAYDAY según su gravedad.",
          "PAN PAN MEDICAL no es la señal para un pasajero enfermo común.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "EASA SERA.14095 · Aerocivil eAIP",
        bloques: [
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, revisión agosto de 2025, SERA.14095: definiciones, señal PAN PAN, mensaje, prioridad, respuesta ATS y transporte sanitario protegido: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9854" },
          { kind: "p", text: "Aerocivil, portal oficial de la AIP Colombia y acceso a la eAIP vigente para datos locales: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "La historieta y el escenario son didácticos; no representan una transmisión real ni establecen que una condición médica o técnica específica pertenezca siempre a una categoría. No se inventan rutas, frecuencias, pistas o autorizaciones." },
        ],
      },
    ],
  },
  // ── 36 ──────────────────────────────────────────────────────────────────
  {
    n: 36,
    title: "MAYDAY o PAN PAN",
    kicker: "Clasificar el riesgo y actualizar a ATS",
    minutes: 19,
    blocks: [
      {
        kind: "p",
        text: "Una señal de emergencia no es una etiqueta automática para «motor», «humo» o «pasajero enfermo». En radiotelefonía, MAYDAY corresponde a peligro grave o inminente con necesidad de ayuda inmediata; PAN PAN, a una condición que afecta la seguridad sin requerir esa ayuda inmediata. Si no existe ninguna de esas condiciones, la tripulación puede informar una limitación relevante en lenguaje claro, sin convertirla artificialmente en urgencia. Lo decisivo es el riesgo real y qué asistencia se necesita ahora.",
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
          ["Condición", "Peligro grave o inminente; se necesita ayuda inmediata.", "Seguridad afectada; no se necesita ayuda inmediata."],
          ["Prioridad", "Absoluta sobre otras comunicaciones.", "Sobre el tráfico normal, nunca sobre el socorro."],
          ["Primera llamada", "Señal MAYDAY al inicio; preferiblemente tres veces.", "Señal PAN PAN al inicio; preferiblemente tres veces."],
          ["Contenido", "Dependencia, identificación, naturaleza, intención, posición/nivel/rumbo y otros datos útiles, según sea posible.", "Los mismos campos, tantos como haga falta y pueda transmitirse."],
          ["Respuesta ATS", "Acusa, coordina asistencia y puede imponer silencio a otras estaciones.", "Acusa y coordina; puede controlar las comunicaciones si hace falta."],
        ],
      },
      {
        kind: "p",
        text: "La tabla resume EASA SERA.14095, no una autorización local ni una clasificación de fallas del manual de un explotador. Tampoco prescribe un código de transpondedor para cada columna: el uso del equipo de vigilancia se decide conforme a la situación, la instrucción recibida y las reglas aplicables. Declarar la señal no concede por sí mismo una ruta, una altitud o una pista.",
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
          "**Aviate:** el piloto que vuela (PF, pilot flying) mantiene el avión dentro de sus límites. El piloto que monitorea (PM, pilot monitoring) reúne hechos observables y prepara la comunicación; una llamada no desplaza acciones inmediatas de control.",
          "**Clasificar y transmitir:** si se necesita ayuda inmediata ante peligro grave o inminente, MAYDAY; si la seguridad está afectada sin ese requisito, PAN PAN. La primera transmisión empieza con la señal y aporta dependencia, identificación, naturaleza, intención y posición/nivel/rumbo cuando se pueda.",
          "**Coordinar:** se indica qué asistencia o margen se requiere. ATS puede ofrecer prioridad, vectores u opciones, pero la tripulación confirma cada autorización nueva y dice UNABLE si no puede cumplirla. No improvisa una posición ni acepta una pista no autorizada.",
          "**Reevaluar:** si una urgencia se convierte en socorro, se transmite MAYDAY con la nueva condición. Si el peligro grave termina, la tripulación cancela la condición de socorro; ATS gestiona el fin del tráfico y el silencio. Una mejora no borra automáticamente todas las limitaciones restantes.",
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Plantillas sin vuelo ni ruta inventados",
        text: "MAYDAY × 3 o PAN PAN × 3 — [dependencia ATS] — [identificación real] — [condición y efecto] — [intención y ayuda requerida] — [posición, nivel, rumbo] — [información útil]. Son campos de aprendizaje, no frases de un vuelo real. Se completan únicamente con datos confirmados y se amplían por etapas si la carga de trabajo lo exige.",
      },
      {
        kind: "escenario",
        titulo: "Del aviso inicial al socorro",
        situacion: "Caso didáctico sin aeródromo, ruta, distintivo o frecuencia inventados. En crucero aparece olor anormal y una indicación que exige comprobar el sistema. El avión es controlable y la tripulación necesita tiempo para la lista. Minutos después se observa humo persistente en la cabina y la fuente no se identifica ni controla.",
        preguntas: [
          {
            q: "¿Se declara MAYDAY automáticamente por el primer olor?",
            a: "No se decide solo por el nombre del indicio. PF mantiene el vuelo y PM comunica a ATS la limitación y la necesidad de tiempo o prioridad. PAN PAN puede corresponder si la seguridad está afectada sin requerir aún ayuda inmediata. La tripulación aplica su procedimiento y no espera a conocer la causa para informar un deterioro."
          },
          {
            q: "Con humo persistente no controlado, ¿qué cambia?",
            a: "Se reevalúa como peligro grave o inminente y necesidad de ayuda inmediata. PM inicia un mensaje MAYDAY, dice el efecto observable, la intención y la asistencia necesaria con datos reales. PF prioriza control, procedimiento y una opción de aterrizaje adecuada; ATS coordina, sin que la señal equivalga a una autorización concreta."
          },
          {
            q: "Si desaparece el humo, ¿basta con callar?",
            a: "No. La tripulación informa el cambio y, solo si la condición de socorro realmente terminó, la cancela. Si queda una limitación de seguridad, la comunica y acuerda con ATS cómo continuar. ATS gestiona el fin formal del tráfico de socorro y de cualquier silencio impuesto."
          },
        ],
        concepto: "La misma secuencia puede cruzar más de un estado. La señal se actualiza con el riesgo y la ayuda requerida, no con una lista de fallas prefijada.",
      },
      {
        kind: "enLaOperacion",
        momento: "Decisión compartida, responsabilidad clara",
        texto: "El comandante integra la evaluación técnica, el tiempo disponible, el terreno, el combustible y los procedimientos normalizados de operación (SOP, Standard Operating Procedures). PM no reduce esa decisión a una palabra aislada: transmite qué ocurre, cómo afecta al vuelo, qué hará la tripulación y qué necesita de ATS. La cabina puede enviar primero un mensaje breve y completar después personas a bordo, autonomía y asistencia en tierra. Toda instrucción nueva se verifica; una declaración no traslada a ATC el control de la aeronave.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Un diagnóstico no es una señal", text: "Una falla de motor, una situación médica o el humo tienen efectos variables. La gravedad y la ayuda necesaria determinan la declaración; el manual de operaciones aporta procedimientos específicos del explotador." },
      { kind: "callout", tone: "warn", title: "No actualizar a ATS", text: "Mantener PAN PAN cuando ya se necesita ayuda inmediata retrasa la respuesta. Dejar MAYDAY sin cancelar cuando el peligro terminó también distorsiona la gestión de la frecuencia." },
      { kind: "callout", tone: "warn", title: "Confundir prioridad con autorización", text: "La prioridad permite organizar ayuda; no aprueba automáticamente desvíos, niveles, pistas ni procedimientos. Esos elementos se coordinan y colacionan." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "MAYDAY: peligro grave o inminente y ayuda inmediata necesaria.",
          "PAN PAN: seguridad afectada sin esa necesidad inmediata.",
          "El tráfico de socorro prevalece sobre la urgencia y sobre el tráfico normal.",
          "Se declara con datos ciertos y se amplía cuando la cabina puede.",
          "La señal se actualiza si evoluciona el riesgo; no otorga autorizaciones por sí sola.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "EASA SERA.14095 · Aerocivil eAIP",
        bloques: [
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, revisión agosto de 2025, SERA.14095: definiciones, prioridad, contenido de las primeras transmisiones, respuesta ATS y cancelación: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9854" },
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
    minutes: 20,
    blocks: [
      {
        kind: "p",
        text: "La gestión del combustible se decide con pronósticos de llegada, opciones de aterrizaje y la reserva final planificada; la radio comunica esa decisión a tiempo al servicio de tránsito aéreo (ATS, Air Traffic Services). MINIMUM FUEL informa que la tripulación ya se comprometió con un aeródromo específico y que un cambio a la autorización vigente puede hacer que aterrice por debajo de la reserva final. No es una declaración de emergencia y no concede prioridad automática. Si el combustible utilizable calculado al aterrizar en el aeródromo más cercano donde pueda aterrizarse con seguridad es menor que la reserva final planificada, la llamada de socorro es MAYDAY MAYDAY MAYDAY FUEL.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-37-01.svg",
        alt: "Comparación de MINIMUM FUEL con MAYDAY FUEL según la reserva final calculada al aterrizar.",
        ancho: 1600,
        alto: 900,
        pie: "Comparación basada en EASA CAT.OP.MPA.185 y SERA.11012. MINIMUM FUEL advierte que un cambio o demora puede comprometer la reserva final; MAYDAY FUEL se declara al calcular menos reserva final en el aeródromo seguro más cercano. La tripulación usa sus datos reales y recalcula tras cualquier demora.",
      },
      { kind: "sub", text: "La secuencia operacional antes de hablar" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Actualizar el cálculo:** contrastar combustible utilizable a bordo con consumo real, tiempo de vuelo, demoras conocidas, meteorología, condiciones de llegada y reservas del plan. El pronóstico al aterrizaje importa más que una cifra de combustible aislada.",
          "**Revisar opciones seguras:** antes de comprometerse con un aeródromo, comprobar que sigue siendo una opción de aterrizaje segura según los datos disponibles. Un desvío no se anuncia como decidido si aún no lo está; una opción que desaparece exige recalcular.",
          "**Solicitar información de demora:** si circunstancias no previstas pueden reducir el margen, pedir a ATS demora esperada y vigilar el combustible durante todo el proceso. La respuesta «sin demora prevista» describe un pronóstico, no una garantía.",
          "**Emitir la señal correcta:** MINIMUM FUEL cuando se cumplen el compromiso con aeródromo y el riesgo de comprometer la reserva por un cambio de autorización; MAYDAY MAYDAY MAYDAY FUEL cuando el cálculo en el aeródromo seguro más cercano cae por debajo de la reserva final.",
          "**Continuar la coordinación:** tras la declaración, comunicar intención, restricciones y asistencia requerida con datos reales; colacionar autorizaciones nuevas, recalcular y actualizar a ATS si cambia la condición.",
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
      { kind: "sub", text: "Qué oye ATS y qué devuelve" },
      {
        kind: "p",
        text: "Según EASA SERA.11012, al recibir MINIMUM FUEL el controlador informa tan pronto como sea practicable si se prevé demora o si no se espera ninguna. Esa respuesta permite a la tripulación revisar su cálculo, pero no le asigna prioridad. Si la espera propuesta no es aceptable, la tripulación debe decirlo claramente y transmitir su intención; repetir MINIMUM FUEL sin analizar el efecto de la demora no protege el combustible.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Plantillas, no autorizaciones ni un vuelo ficticio",
        text: "[Dependencia ATS] — [identificación real] — MINIMUM FUEL. ATS informa [demora prevista o ninguna]; la tripulación recalcula. Para socorro: MAYDAY × 3 — FUEL — [dependencia e identificación reales] — [situación, intención, posición/nivel/rumbo y ayuda necesaria]. Los corchetes solo indican campos; no son una transcripción ni contienen una ruta, pista, frecuencia o demora inventada.",
      },
      {
        kind: "p",
        text: "En una emergencia de combustible no se espera a consumir físicamente la reserva final para transmitir. El criterio de EASA CAT.OP.MPA.185(d) es el combustible utilizable calculado al aterrizar en el aeródromo seguro más cercano, comparado con la reserva final prevista. La señal MAYDAY va al comienzo de la primera llamada y FUEL identifica la naturaleza del socorro. La información complementaria, incluida la autonomía si se solicita, se comunica con unidades y referencia claras; no se enseña que siempre deba darse solo en tiempo o solo en masa.",
      },
      {
        kind: "escenario",
        titulo: "Una demora cambia el pronóstico de llegada",
        situacion: "Caso didáctico sin aeródromo, indicativo, ruta, tiempo ni cantidad inventados. Durante la llegada, la tripulación ya se comprometió con un aeródromo porque las demás opciones planificadas dejaron de ser viables. El pronóstico protege la reserva final solo si no cambia la autorización. PM declara MINIMUM FUEL. ATS informa que ahora se prevé una demora, y el nuevo cálculo muestra que incluso el aeródromo seguro más cercano quedaría por debajo de la reserva final planificada.",
        preguntas: [
          {
            q: "¿Qué aporta la primera llamada y qué no obtiene?",
            a: "MINIMUM FUEL hace explícitos el compromiso y la vulnerabilidad ante un cambio o demora. ATS debe informar la demora prevista o su ausencia. No equivale a socorro ni concede prioridad automática; PF y PM mantienen el monitoreo y preparan una nueva decisión."
          },
          {
            q: "Con el cálculo revisado bajo la reserva final, ¿basta con repetir MINIMUM FUEL?",
            a: "No. El comandante declara MAYDAY MAYDAY MAYDAY FUEL y PM comunica la condición, intención y ayuda requerida con la información disponible. ATS puede coordinar prioridad y opciones, pero cada autorización concreta se recibe y verifica."
          },
          {
            q: "ATS ofrece una ruta que el avión no puede cumplir; ¿qué se transmite?",
            a: "PM dice UNABLE, explica brevemente la limitación y propone una intención ejecutable. No colaciona como aceptada una autorización incompatible con combustible, rendimiento u otra restricción. El cálculo se actualiza otra vez si ATS ofrece una alternativa."
          },
        ],
        concepto: "El umbral es prospectivo: el pronóstico en una opción segura de aterrizaje, no el instante en que el indicador alcanza la reserva final.",
      },
      {
        kind: "enLaOperacion",
        momento: "PF vuela; PM informa con cálculo trazable",
        texto: "PF mantiene trayectoria y conciencia de energía; PM registra combustible y pronóstico, escucha información de demora, compara opciones seguras y comunica la decisión del comandante. El procedimiento normalizado de operación (SOP, Standard Operating Procedures) del explotador define comprobaciones y reparto de tareas. Una llamada temprana y precisa ayuda a ATS a coordinar, pero la gestión de combustible y la elección de una opción segura continúan en la cabina. En Colombia se deben verificar procedimientos locales en la publicación oficial vigente de Aerocivil antes de aplicarlos.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Esperar prioridad automática", text: "MINIMUM FUEL no es socorro. Si el combustible calculado exige ayuda inmediata, debe declararse MAYDAY FUEL; una frase ambigua como «low fuel» no expresa el umbral reglamentario." },
      { kind: "callout", tone: "warn", title: "Esperar al indicador de reserva", text: "La comparación se hace con el combustible utilizable previsto al aterrizar en el aeródromo seguro más cercano, no con lo que quedará cuando sea demasiado tarde para cambiar el plan." },
      { kind: "callout", tone: "warn", title: "Tomar una demora estimada como compromiso", text: "La demora comunicada por ATS es información para recalcular. Las condiciones pueden cambiar; se monitorea y se actualiza la declaración si el margen desaparece." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "MINIMUM FUEL informa compromiso con un aeródromo y vulnerabilidad a cambios; no da prioridad automática.",
          "ATS comunica demora esperada o que no la prevé.",
          "MAYDAY MAYDAY MAYDAY FUEL es socorro cuando el cálculo al aterrizaje seguro más cercano cae bajo la reserva final.",
          "No se espera a consumir la reserva final para declarar.",
          "Después de cada demora o nueva opción se recalcula y se informa la intención real.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "EASA CAT.OP.MPA.185 · SERA.11012 · Aerocivil eAIP",
        bloques: [
          { kind: "p", text: "EASA, Easy Access Rules for Air Operations, revisión marzo de 2026, CAT.OP.MPA.185(c)–(d): criterios de MINIMUM FUEL y MAYDAY FUEL para aviones de transporte comercial: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-air-operations?erules-id=ERULES-1963177438-12803" },
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, revisión agosto de 2025, SERA.11012 y GM1: información de demora del controlador y naturaleza no urgente de MINIMUM FUEL: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9921" },
          { kind: "p", text: "OACI, Doc 4444 PANS-ATM, edición alojada en ATMiKIT, sección 15.5.4; verificar siempre la edición operativamente aplicable: https://applications.icao.int/tools/ATMiKIT/story_content/external_files/story_content/external_files/DOC%204444_PANS%20ATM_en.pdf" },
          { kind: "p", text: "Aerocivil, portal oficial de AIP Colombia y eAIP para datos y procedimientos colombianos vigentes: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "El escenario y la historieta son didácticos, no transcripciones. Los criterios europeos citados no sustituyen RAC, AIP ni manual del explotador aplicables al vuelo real." },
        ],
      },
    ],
  },
  // ── 38 ──────────────────────────────────────────────────────────────────
  {
    n: 38,
    title: "TCAS/ACAS RA",
    kicker: "Responder, informar y recuperar la autorización",
    minutes: 20,
    blocks: [
      {
        kind: "p",
        text: "El sistema anticolisión de a bordo (ACAS, Airborne Collision Avoidance System) detecta encuentros con aeronaves dotadas de transpondedor sin depender del control terrestre. TCAS (Traffic Alert and Collision Avoidance System) es una familia de equipos que implementa esa función. Un aviso de tránsito (TA, Traffic Advisory) ayuda a buscarlo y prepararse; por sí solo no ordena una maniobra. Un aviso de resolución (RA, Resolution Advisory) exige la respuesta indicada, incluso si entra en conflicto con una instrucción del control de tránsito aéreo (ATC, Air Traffic Control), salvo que seguirlo comprometa la seguridad de la aeronave.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-38-01.svg",
        alt: "Secuencia TA, respuesta a RA, aviso a ATC, libre de conflicto y regreso a la autorización.",
        ancho: 1600,
        alto: 900,
        pie: "Secuencia basada en EASA SERA.11014 y AMC1 SERA.14001. TA permite observar, no maniobrar por sí solo; ante RA se responde primero y se informa cuando la carga lo permite. Tras CLEAR OF CONFLICT se inicia el retorno y se confirma cuando la autorización está reanudada.",
      },
      { kind: "sub", text: "Prioridad de cabina y de radio" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**TA:** ambos pilotos buscan tránsito y mantienen conciencia situacional. No crean una desviación vertical solo por la indicación TA ni por una interpretación visual incierta del tráfico.",
          "**RA:** el piloto que vuela (PF, pilot flying) sigue de inmediato la guía del equipo, incluida cualquier modificación posterior, y limita la desviación a lo necesario. Nunca maniobra en el sentido contrario al RA. La excepción reglamentaria es que seguirlo comprometa la seguridad del avión.",
          "**Notificación:** el piloto que monitorea (PM, pilot monitoring) avisa a ATC tan pronto como la carga de trabajo lo permita cuando el RA exige desviarse de la autorización o instrucción vigente. La frase prevista es TCAS RA; no se retrasa la respuesta para formular una llamada larga.",
          "**Conflicto con instrucción:** si ATC transmite una orden contraria, la tripulación sigue el RA y responde UNABLE, TCAS RA tan pronto como pueda. Un reconocimiento de ATC no sustituye la maniobra indicada.",
          "**Recuperación:** al resolverse el conflicto, se vuelve prontamente a los términos de la autorización o se cumple una alternativa emitida por ATC. Se informa que se está regresando y, después, que ya se reanudó la autorización. Son dos estados distintos.",
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
      { kind: "sub", text: "Fraseología en su momento exacto" },
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
      {
        kind: "p",
        text: "Los corchetes son campos que la tripulación completa con la autorización real. La fraseología anterior figura en EASA AMC1 SERA.14001. No se inserta un nivel ficticio para simular exactitud. Una RA puede modificarse durante el encuentro; el aviso a ATC no convierte la primera indicación en inmutable. Las acciones del piloto automático y del director de vuelo dependen del tipo de aeronave y del procedimiento del fabricante, no de una regla universal de esta lección.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Separación: dos hitos diferentes",
        text: "Bajo EASA SERA.11014, cuando un RA induce desviación o se notifica, el controlador deja de ser responsable de separar a esa aeronave de las afectadas directamente por la maniobra. No intenta cambiar su trayectoria hasta CLEAR OF CONFLICT. Recupera esa responsabilidad cuando acusa que la aeronave ya reanudó la autorización, o cuando acusa que la está reanudando, emite otra autorización y la tripulación la acusa. Por eso RETURNING TO y RESUMED no son sinónimos.",
      },
      {
        kind: "escenario",
        titulo: "RA durante un cambio de nivel autorizado",
        situacion: "Caso didáctico sin aeródromo, ruta, indicativo ni nivel inventados. Una aeronave está cambiando de nivel por autorización de ATC. Aparece un TA; la tripulación busca tránsito sin iniciar una maniobra adicional. Luego surge un RA cuya guía entra en conflicto con la instrucción vigente. PF responde al equipo y PM está ocupado verificando el cambio de trayectoria.",
        preguntas: [
          {
            q: "¿Se llama antes de ejecutar el RA?",
            a: "No. PF responde de inmediato al RA conforme al procedimiento del avión, salvo que hacerlo comprometiera su seguridad. PM informa TCAS RA en cuanto la carga de trabajo lo permite porque la respuesta implica apartarse de lo autorizado. No se maniobra en sentido contrario ni se espera permiso de ATC para obedecer el RA."
          },
          {
            q: "ATC repite una instrucción incompatible, ¿cómo contesta PM?",
            a: "UNABLE, TCAS RA. La tripulación continúa siguiendo la indicación vigente del RA y las modificaciones posteriores; ATC acusa y no intenta modificar la trayectoria hasta recibir CLEAR OF CONFLICT."
          },
          {
            q: "Al anunciar el equipo fin del conflicto, ¿qué se comunica?",
            a: "Se inicia el regreso oportuno a la autorización actual, si es ejecutable, y PM comunica CLEAR OF CONFLICT, RETURNING TO [autorización]. Cuando efectivamente se reanuda, comunica CLEAR OF CONFLICT, [autorización] RESUMED. Si ATC asigna una alternativa, la tripulación la verifica y acusa en vez de suponer que persiste un nivel anterior."
          },
        ],
        concepto: "La secuencia es responder al RA, informar cuando se pueda y distinguir retorno iniciado de autorización ya recuperada.",
      },
      {
        kind: "enLaOperacion",
        momento: "Durante el encuentro y después",
        texto: "PF controla la trayectoria con la guía aprobada para el avión; PM mantiene conciencia del tráfico, de la autorización y de las transmisiones. El procedimiento normalizado de operación (SOP, Standard Operating Procedures) especifica el reparto de tareas y el uso de automatismos. El conocimiento visual de un avión cercano no demuestra que sea el intruso causante del RA. Tras el encuentro se revisan la autorización vigente, la altitud real, cualquier modificación de ATC y los requisitos de notificación del explotador y del Estado aplicable; esta lección no inventa un reporte local obligatorio.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Maniobrar por TA", text: "TA alerta y favorece la búsqueda de tránsito; no ordena por sí solo una maniobra. Una reacción vertical innecesaria puede crear otro conflicto." },
      { kind: "callout", tone: "warn", title: "Dar preferencia a una orden contraria", text: "EASA SERA.11014 exige seguir el RA pese a una instrucción ATC incompatible, excepto si seguirlo compromete la seguridad del avión. PM informa UNABLE, TCAS RA cuando puede." },
      { kind: "callout", tone: "warn", title: "Confundir RETURNING TO con RESUMED", text: "Una frase anuncia el retorno en curso; la otra confirma que ya se reanudó lo autorizado. ATC necesita el estado correcto para gestionar separación." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "TA: observar y prepararse; no maniobrar solo por el aviso.",
          "RA: responder de inmediato, salvo riesgo mayor para la seguridad del propio avión.",
          "Avisar TCAS RA cuando la carga lo permita y UNABLE, TCAS RA ante instrucción contraria.",
          "CLEAR OF CONFLICT inicia la recuperación; RESUMED confirma que se volvió a lo autorizado.",
          "Las pantallas, automatismos y reportes concretos dependen del avión, explotador y Estado.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y límites",
        cita: "EASA SERA.11014 · AMC1 SERA.14001 · Aerocivil eAIP",
        bloques: [
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, revisión agosto de 2025, SERA.11014 y GM3–GM6: prioridad del RA, aviso, recuperación, responsabilidad de separación y limitación de TA: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9921" },
          { kind: "p", text: "EASA, misma publicación, AMC1 SERA.14001: TCAS RA, UNABLE, TCAS RA y las dos llamadas CLEAR OF CONFLICT: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299" },
          { kind: "p", text: "OACI, Airborne Collision Avoidance System Manual Doc 9863, copia oficial de referencia, secciones 5.2.1.15–18: https://www.icao.int/meetings/anconf12/document%20archive/9863_cons_en.pdf" },
          { kind: "p", text: "Aerocivil, portal oficial AIP Colombia y eAIP para datos y procedimientos colombianos vigentes: https://www.aerocivil.gov.co/servicios-a-la-navegacion/servicio-de-informacion-aeronautica-ais/aip" },
          { kind: "p", text: "La historieta y el escenario son didácticos, no transcripciones. Las fuentes europeas ilustran el marco y la fraseología, sin sustituir las reglas locales ni el manual del avión y del explotador." },
        ],
      },
    ],
  },
  // ── 39 ──────────────────────────────────────────────────────────────────
  {
    n: 39,
    title: "RVSM",
    kicker: "Avisar la pérdida de capacidad sin demora",
    minutes: 19,
    blocks: [
      {
        kind: "p",
        text: "La separación vertical mínima reducida (RVSM, Reduced Vertical Separation Minimum) permite aplicar 1 000 ft entre niveles de vuelo (FL, Flight Level) 290 y 410 inclusive, entre aeronaves aprobadas en el espacio donde está implantada. La autorización de la aeronave y el explotador no garantiza que la capacidad permanezca durante todo el vuelo. Una falla de equipo o turbulencia que impida mantener la precisión exigida cambia la situación operacional: la tripulación debe informar sin demora al control de tránsito aéreo (ATC, Air Traffic Control), describir la limitación y coordinar la continuación.",
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
          "**Comprobar el efecto:** contrastar indicaciones altimétricas, capacidad de mantenimiento de nivel, automatismos y la lista aplicable al avión. Una indicación anómala no basta para diagnosticar una causa por radio; se determina si la performance requerida puede sostenerse.",
          "**Avisar sin demora:** cuando la degradación cae por debajo del requisito del espacio aéreo, ATC necesita conocerlo para establecer otra separación. La expresión UNABLE RVSM DUE EQUIPMENT corresponde a degradación de equipo; UNABLE RVSM DUE TURBULENCE, a turbulencia intensa que impide cumplir el mantenimiento de altura.",
          "**Explicar qué puede hacer:** junto a la frase normalizada, transmitir de forma breve el efecto real, si puede mantener el nivel actual y qué necesita: tiempo, un nivel alternativo o una autorización revisada. La solicitud no equivale a aprobación.",
          "**Mantener o actuar según contingencia:** no iniciar un cambio de nivel por el solo hecho de pronunciar UNABLE RVSM. Seguir la autorización hasta recibir otra si es seguro; cuando la condición exige desviarse antes, aplicar el procedimiento de contingencia vigente del espacio aéreo y comunicar la acción tan pronto como sea posible.",
          "**Confirmar recuperación:** READY TO RESUME RVSM informa que vuelve a estar disponible la capacidad después de una contingencia de equipo o tiempo atmosférico. ATC debe conocerlo y coordinar el tratamiento subsiguiente; la frase no otorga una autorización nueva.",
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
        head: ["Situación", "Frase normalizada", "Decisión que implica"],
        rows: [
          ["ATC comprueba aprobación", "CONFIRM RVSM APPROVED / AFFIRM RVSM", "Confirmar la aprobación real; no usar AFFIRM si se perdió la capacidad."],
          ["Aeronave no aprobada", "NEGATIVE RVSM", "Identificar estado de aprobación distinto de una falla sobrevenida."],
          ["Capacidad degradada por equipo", "UNABLE RVSM DUE EQUIPMENT", "Avisar el efecto y solicitar coordinación sin demora."],
          ["Turbulencia que impide mantener altura", "UNABLE RVSM DUE TURBULENCE", "Avisar la incapacidad efectiva, no toda turbulencia leve."],
          ["Capacidad recuperada", "READY TO RESUME RVSM", "Informar la recuperación; esperar coordinación antes de asumir otra separación."],
        ],
      },
      {
        kind: "p",
        text: "Estas expresiones constan en EASA AMC1 SERA.14001. NEGATIVE RVSM comunica que la aeronave no está aprobada; UNABLE RVSM DUE EQUIPMENT o DUE TURBULENCE comunica una incapacidad concreta en vuelo. La fraseología exacta y las condiciones de entrada de aeronaves no aprobadas pueden variar por región y Estado; esta lección no inventa una exención ni una autorización colombiana.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Lo que ATC necesita saber",
        text: "Identificación real — estado RVSM — causa observable o tipo de limitación — posibilidad de mantener el nivel actual — intención o solicitud. Es una estructura de comunicación didáctica, no una transcripción. No asigna nivel, ruta, frecuencia ni descenso ficticios. Si una acción inmediata de seguridad obliga a apartarse de la autorización, se aplican las contingencias publicadas y se informa tan pronto como se pueda.",
      },
      {
        kind: "escenario",
        titulo: "Desacuerdo altimétrico en crucero",
        situacion: "Caso didáctico sin vuelo, nivel, ruta o frecuencia inventados. En espacio RVSM aparecen indicaciones altimétricas discrepantes. La tripulación comprueba según el procedimiento del avión y concluye que ya no puede demostrar la performance vertical requerida. PF mantiene el avión controlado; PM informa a ATC. No hay autorización nueva todavía.",
        preguntas: [
          {
            q: "¿Qué mensaje debe salir y cuándo?",
            a: "Sin demora, PM transmite la identificación real y UNABLE RVSM DUE EQUIPMENT, seguido de la capacidad actual de mantener nivel y una solicitud concreta si se necesita. La noticia permite que ATC revise la separación. No se sustituye con un relato largo sin la frase clave."
          },
          {
            q: "¿Se desciende automáticamente fuera de RVSM después de la llamada?",
            a: "No. La frase no es autorización para abandonar el nivel. Si puede mantenerse el vuelo seguro se espera la instrucción revisada. Si no puede mantenerse y la seguridad exige acción inmediata, se aplica la contingencia pertinente y se comunica la desviación tan pronto como sea posible."
          },
          {
            q: "Tras resolver la discrepancia, ¿basta con volver a operar en RVSM sin avisar?",
            a: "No. Se verifica que la capacidad realmente se recuperó y PM informa READY TO RESUME RVSM. ATC coordina la situación y cualquier autorización posterior. Un simple cese de la alarma no demuestra por sí solo la recuperación."
          },
        ],
        concepto: "La capacidad de mantener altura es una condición presente que se comprueba, se comunica y se vuelve a confirmar cuando cambia.",
      },
      {
        kind: "enLaOperacion",
        momento: "No perder de vista autorización y contingencia",
        texto: "El manual y la lista del avión, junto con la lista de equipo mínimo (MEL, Minimum Equipment List) y la aprobación del explotador, determinan qué sistemas sustentan la operación RVSM. PF mantiene el control; PM documenta qué indicaciones discrepan, avisa a ATC y confirma cualquier autorización nueva. Las prácticas de contingencia difieren entre espacios continentales y oceánicos: se revisan las publicaciones de la región que realmente se está sobrevolando. Para Colombia, la referencia local debe salir de Aerocivil/eAIP vigente, no de los niveles o frases de un ejemplo inventado.",
      },
      { kind: "sub", text: "Errores que importan" },
      { kind: "callout", tone: "warn", title: "Seguir sin avisar", text: "Una discrepancia que elimina la performance vertical exigida afecta la separación utilizada por ATC. La comunicación no espera al próximo cambio de frecuencia." },
      { kind: "callout", tone: "warn", title: "Confundir aprobación con capacidad actual", text: "Un avión aprobado puede quedar temporalmente incapaz. NEGATIVE RVSM no reemplaza la frase de degradación por equipo o turbulencia." },
      { kind: "callout", tone: "warn", title: "Asumir un descenso autorizado", text: "UNABLE RVSM informa una limitación; no permite seleccionar por cuenta propia otro FL, salvo una contingencia que exija acción inmediata." },
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "RVSM aplica 1 000 ft entre FL 290 y FL 410 inclusive donde está implantado.",
          "La performance degradada se informa a ATC sin demora.",
          "UNABLE RVSM DUE EQUIPMENT o DUE TURBULENCE describe la causa pertinente.",
          "READY TO RESUME RVSM informa recuperación, no una autorización nueva.",
          "La maniobra y separación subsiguientes se coordinan con ATC o se rigen por una contingencia publicada.",
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
    kicker: "Decir que no se puede cumplir un procedimiento",
    minutes: 8,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "PBN (navegación basada en la performance) agrupa las especificaciones RNAV y RNP. El Doc 4444 define **RNAV** como el método de navegación que permite operar en cualquier trayectoria deseada dentro de la cobertura de las ayudas o de los límites de las ayudas autónomas, y **RNP** como la declaración de la performance de navegación necesaria para operar en un espacio aéreo definido. Este capítulo no enseña PBN: enseña **qué decir cuando no puede cumplir** un procedimiento o ruta PBN.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**Aprobación antes de salir.** El explotador se asegura de que la aeronave tenga la aprobación para el tipo de RNP que exige la ruta o el área (Doc 4444 4.4.1.4 a). La orientación sobre especificaciones está en el Doc 9613 (Manual PBN), citado en el Doc 4444.",
          "**Degradación en vuelo.** Si una falla de navegación (por ejemplo, pérdida de GNSS o una alerta de integridad) deja la performance por debajo de lo que exige el espacio aéreo o el procedimiento, se notifica **sin demora** al ATC (Doc 4444 5.2.2).",
          "**Lo que el ATC necesita saber:** qué no puede cumplir (la ruta, la SID, la STAR, la aproximación RNP), por qué (en pocas palabras) y qué necesita (vectores, una aproximación convencional, otra ruta).",
          "**Frases:** UNABLE (Doc 9432 2.6) más el procedimiento y la razón. El Doc 4444 cap. 12 vigente tiene fraseología PBN y de estado GNSS; no está cargada, así que aquí va solo lo que se puede decir con certeza y el resto en PLAIN LANGUAGE.",
          "**Si el ATC pregunta capacidad**, conteste con verdad y con precisión: no todas las aeronaves ni todas las tripulaciones están aprobadas para todas las especificaciones.",
        ],
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "Esta lección tiene fraseología que no está en las fuentes cargadas. La fraseología PBN y de estado GNSS (incapacidad para una especificación RNP o RNAV, pregunta de capacidad del ATC): **Doc 4444 cap. 12 de la edición vigente**. «DESCEND VIA STAR»: **Doc 4444 cap. 12 vigente** (ver Nivel 4, cap. 26). La regla sobre puntos creados manualmente en procedimientos PBN: **Doc 9613**, **Doc 8168** y el **manual del explotador**.",
      ),
      ...ejemplo(
        "Ejemplo 1 · No puede la aproximación RNP (VERIFICAR la forma PBN)",
        [
          `ATC:   "AVIATORY 452, CLEARED RNP APPROACH RUNWAY 13."`,
          `PILOT: "AVIATORY 452, UNABLE RNP APPROACH DUE GPS FAILURE, REQUEST ILS RUNWAY 13."`,
        ],
        "Significado: UNABLE es palabra normalizada; la combinación con el procedimiento y la razón sigue el modelo «UNABLE TO CROSS … DUE WEIGHT» del Doc 9432 2.8.3. La forma específica PBN: VERIFICAR.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Pérdida de GPS en ruta (PLAIN LANGUAGE)",
        [
          `PILOT: "BOGOTA CONTROL, AVIATORY 452, LOSS OF GPS, NAVIGATION DEGRADED, UNABLE RNAV ROUTE, REQUEST VECTORS TO TOLMA VOR."`,
          `ATC:   "AVIATORY 452, TURN RIGHT HEADING 090, VECTORS TO TOLMA."`,
          `PILOT: "RIGHT HEADING 090, AVIATORY 452."`,
        ],
        "Significado: **PLAIN LANGUAGE** para la descripción. El rumbo se colaciona como siempre.",
      ),
      ...ejemplo(
        "Ejemplo 3 · El ATC pregunta la capacidad (PLAIN LANGUAGE del ATC; VERIFICAR)",
        [
          `ATC:   "AVIATORY 452, CONFIRM ABLE RNP APPROACH RUNWAY 31."`,
          `PILOT: "NEGATIVE, AVIATORY 452. REQUEST VOR APPROACH RUNWAY 31."`,
        ],
        "Significado: **PLAIN LANGUAGE** del ATC (la forma estándar de esta pregunta: VERIFICAR). Usted no tiene la aprobación o el equipo para esa aproximación: NEGATIVE y lo que sí puede hacer.",
      ),
      ...ejemplo(
        "Ejemplo 4 · El punto no está en la base de datos (PLAIN LANGUAGE; VERIFICAR «DESCEND VIA STAR»)",
        [
          `ATC:   "AVIATORY 452, CLEARED DIRECT GIKOS, DESCEND VIA STAR."`,
          `PILOT: "AVIATORY 452, UNABLE DIRECT GIKOS, GIKOS NOT IN OUR DATABASE, REQUEST HEADING."`,
        ],
        "Significado: **PLAIN LANGUAGE**. Un punto que no está en la base de datos no se construye a mano en un procedimiento PBN sin que el manual lo permita; se dice y se pide alternativa. VERIFICAR «DESCEND VIA STAR» (Nivel 4, cap. 26).",
      ),
      ...ejemplo(
        "Ejemplo 5 · Recuperó la capacidad (PLAIN LANGUAGE)",
        [
          `PILOT: "BOGOTA APPROACH, AVIATORY 452, GPS RESTORED, ABLE RNP APPROACH RUNWAY 13."`,
          `ATC:   "AVIATORY 452, ROGER, EXPECT RNP APPROACH RUNWAY 13."`,
        ],
        "Significado: **PLAIN LANGUAGE**. Recuperó la capacidad: se informa para que el ATC la tenga en cuenta.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "SID, STAR y aproximaciones PBN",
        texto: "Cada vez más SID, STAR y aproximaciones en la región son RNAV o RNP. En la práctica, las situaciones de comunicación son tres: una falla o degradación en vuelo (GNSS, FMS), un procedimiento para el que la aeronave o la tripulación no está aprobada y un cambio del ATC que la base de datos no permite volar. En los tres casos se usa UNABLE con la razón y una alternativa concreta. Lo que la aeronave necesita para cada especificación lo dicen el AFM, la MEL y el manual del explotador; en Colombia, las aprobaciones PBN y los procedimientos publicados están en el AIP y el RAC.",
      },
      { kind: "sub", text: "Error frecuente" },
      error(
        "Aceptar un RNP sin aprobación",
        "Aceptar un procedimiento RNP sin tener la aprobación o el equipo, por no decir UNABLE.",
      ),
      error(
        "Describir el problema sin decir qué necesita",
        "Decir «we have a problem with the navigation» sin decir qué no puede hacer ni qué necesita.",
      ),
      error(
        "Seguir con una alerta de integridad",
        "Seguir un procedimiento RNP con una alerta de integridad activa sin informar.",
      ),
      error(
        "Construir un punto a mano",
        "Construir a mano un punto que no está en la base de datos para cumplir una autorización.",
      ),
      error("No avisar la recuperación", "No informar cuando se recupera la capacidad."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "La aprobación PBN es de la aeronave, del explotador y de la tripulación; se revisa antes de salir.",
          "La degradación se notifica sin demora (Doc 4444 5.2.2).",
          "UNABLE + procedimiento + razón + alternativa.",
          "Conteste con precisión cuando el ATC pregunte capacidad.",
          "Si recupera la capacidad, avise.",
        ],
      },
      fuentes(
        "Doc 4444 · Doc 9432 · Doc 9613",
        "Doc 4444 (15.ª ed., Enm. 4) cap. 1, definiciones «Navegación de área (RNAV)» y «Performance de navegación requerida (RNP)»; 4.4.1.4 a) (aprobación RNP antes de la salida); 5.2.2 (deterioro de la performance); cap. 5, nota 4 tras 5.4.1.2 (orientación sobre especificaciones de navegación en el Doc 9613, Manual PBN). Doc 9432 (4.ª ed.) 2.6 (UNABLE, NEGATIVE); 2.8.3 (ejemplo «UNABLE TO CROSS WICKEN FL 150 DUE WEIGHT»).",
        [
          "VERIFICAR: fraseología PBN y de estado GNSS (incapacidad para una especificación RNP o RNAV, pregunta de capacidad del ATC) contra Doc 4444 cap. 12 de la edición vigente (no cargado).",
          "VERIFICAR: «DESCEND VIA STAR» contra Doc 4444 cap. 12 de la edición vigente (no cargado).",
          "VERIFICAR: regla sobre puntos creados manualmente en procedimientos PBN contra Doc 9613 y Doc 8168 (no cargados) y el manual del explotador.",
        ],
      ),
    ],
  },
]
