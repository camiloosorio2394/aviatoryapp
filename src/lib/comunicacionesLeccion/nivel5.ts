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
    kicker: "Qué comunica cada una y qué no",
    minutes: 9,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Dos comunicaciones distintas sobre combustible. Este capítulo trata solo cómo se comunican; el cálculo y la gestión del combustible están en otro módulo.",
      },
      {
        kind: "glosario",
        items: [
          {
            k: "MINIMUM FUEL",
            v: "El Doc 4444 (15.ª ed., Enm. 4) lo define como «situación en que el combustible restante de la aeronave es tal que el vuelo debe aterrizar en un aeródromo específico y no puede aceptarse ninguna demora adicional».",
          },
          { k: "MAYDAY FUEL", v: "Declaración de socorro por combustible." },
        ],
      },
      {
        kind: "p",
        text: "La Enmienda 4 de la 15.ª edición del Doc 4444 (aplicable desde el 15 de noviembre de 2012) armonizó la fraseología y los procedimientos ATC de combustible con el Anexo 6 (Tabla A del preámbulo). Por eso lo que aprendió antes de 2012 puede estar desactualizado.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "**Qué comunica MINIMUM FUEL:**" },
      {
        kind: "list",
        items: [
          "Que usted está comprometido a aterrizar en un aeródromo específico.",
          "Que cualquier demora adicional puede llevarlo a aterrizar con menos de la reserva final.",
          "Según el Anexo 6, se informa cuando un cambio en la autorización vigente puede hacer que aterrice con menos que la reserva final de combustible prevista (VERIFICAR).",
        ],
      },
      { kind: "p", text: "**Qué NO significa MINIMUM FUEL:**" },
      {
        kind: "list",
        items: [
          "**No es una emergencia** ni da prioridad automática. Es un aviso de que una emergencia es posible si hay más demora (VERIFICAR la nota a la definición en la edición vigente del Doc 4444).",
          "No se usa para «combustible más bajo de lo que me gustaría».",
        ],
      },
      {
        kind: "p",
        text: "**Cuándo evoluciona a emergencia:** según el Anexo 6, el piloto al mando declara emergencia de combustible cuando el combustible utilizable que calcula tener al aterrizar en el aeródromo más cercano donde puede aterrizar con seguridad es menor que la reserva final prevista (VERIFICAR). Se dice **MAYDAY, MAYDAY, MAYDAY, FUEL**.",
      },
      {
        kind: "p",
        text: "**Lo que hace el ATC con MINIMUM FUEL (VERIFICAR):** acusa recibo e informa la demora prevista, o que no hay demora. Usted usa esa información para decidir.",
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "Esta lección tiene fraseología y criterios que no están en las fuentes cargadas. Criterios de MINIMUM FUEL y de emergencia de combustible: **Anexo 6 Parte I**, gestión del combustible en vuelo. «MAYDAY, MAYDAY, MAYDAY, FUEL»: **Anexo 6 Parte I** y **Doc 4444 cap. 15**. Las respuestas ATC «ROGER, NO DELAY EXPECTED» / «EXPECT (delay information)» y «HOLD AT (fix) AS PUBLISHED, EXPECT APPROACH CLEARANCE AT (time)»: **Doc 4444 cap. 12**. La nota de la definición («no es una situación de emergencia…»): **Doc 4444 cap. 1 vigente**. Diferencias de Estados Unidos: **AIM / FAA Order JO 7110.65**.",
      ),
      ...ejemplo(
        "Ejemplo 1 · MINIMUM FUEL sin demora (VERIFICAR la respuesta del ATC)",
        [`PILOT: "BOGOTA APPROACH, AVIATORY 452, MINIMUM FUEL."`, `ATC:   "AVIATORY 452, ROGER, NO DELAY EXPECTED."`],
        "Significado: usted avisa que ya no acepta más demora. El ATC confirma que no se espera ninguna.",
      ),
      ...ejemplo(
        "Ejemplo 2 · MINIMUM FUEL con demora (VERIFICAR la respuesta del ATC)",
        [`PILOT: "BOGOTA APPROACH, AVIATORY 452, MINIMUM FUEL."`, `ATC:   "AVIATORY 452, ROGER, EXPECT 10 MINUTES DELAY."`],
        "Significado: el ATC informa demora. Usted calcula: si con 10 minutos aterriza por encima de la reserva final, continúa; si no, declara.",
      ),
      ...ejemplo(
        "Ejemplo 3 · No acepta la espera (PLAIN LANGUAGE; VERIFICAR «HOLD AT … AS PUBLISHED»)",
        [
          `ATC:   "AVIATORY 452, HOLD AT GIKOS AS PUBLISHED, EXPECT APPROACH CLEARANCE AT 1545."`,
          `PILOT: "AVIATORY 452, UNABLE TO ACCEPT DELAY, MINIMUM FUEL."`,
        ],
        "Significado: usted ya no puede aceptar la espera. UNABLE es palabra normalizada; la combinación con la razón es **PLAIN LANGUAGE**.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Emergencia de combustible (VERIFICAR)",
        [
          `PILOT: "MAYDAY, MAYDAY, MAYDAY, FUEL, BOGOTA APPROACH, AVIATORY 452, CALCULATED FUEL AT LANDING BELOW FINAL RESERVE, REQUEST PRIORITY APPROACH RUNWAY 13, POSITION GIKOS, 9000 FEET, HEADING 310."`,
          `ATC:   "AVIATORY 452, ROGER MAYDAY, CLEARED DIRECT TO ILS RUNWAY 13, DESCEND TO 7000 FEET, QNH 1026."`,
        ],
        "Significado: emergencia de combustible: señal de socorro con la palabra FUEL, y el mismo orden de mensaje del cap. 34.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Autonomía en tiempo (PLAIN LANGUAGE en la forma)",
        [`ATC:   "AVIATORY 452, REPORT FUEL ENDURANCE."`, `PILOT: "AVIATORY 452, ENDURANCE 35 MINUTES."`],
        "Significado: **PLAIN LANGUAGE** en la forma. El combustible se da en tiempo: el controlador piensa en minutos, no en kilos ni libras.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Esperas largas cerca del destino",
        texto: "En línea aérea, MINIMUM FUEL aparece con esperas largas, cambios de pista o cierres de aeródromo cerca del destino y alterno. La tripulación ya lleva cálculos de combustible al aterrizaje (en el FMS y a mano); la comunicación con el ATC sale de esos números. Informar con tiempo ayuda al controlador a planificar; no hacerlo lo deja sin información. Varios Estados tienen procedimientos propios (por ejemplo, los Estados Unidos no usan la definición OACI de la misma forma; VERIFICAR). En Colombia: AIP y RAC.",
      },
      { kind: "sub", text: "Error frecuente" },
      error(
        "Creer que MINIMUM FUEL da prioridad",
        "Decir MINIMUM FUEL creyendo que da prioridad y quedarse esperando.",
      ),
      error(
        "MINIMUM FUEL cuando es MAYDAY FUEL",
        "Declarar MINIMUM FUEL cuando lo que corresponde es MAYDAY FUEL.",
      ),
      error(
        "«Low fuel» y parecidos",
        "Decir «low fuel», «fuel critical» o «short of fuel»: no son la fraseología; el controlador puede no entender el grado (Doc 9835 3.4.14 muestra un mensaje de «poco combustible» mezclado con otra información).",
      ),
      error(
        "Combustible en masa",
        "Dar combustible en kilos o libras cuando el ATC lo necesita en tiempo.",
      ),
      error(
        "Avisar tarde",
        "Esperar a estar por debajo de la reserva final para decir algo.",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "MINIMUM FUEL: comprometido a un aeródromo, sin aceptar más demora. No es emergencia.",
          "El ATC responde con la demora prevista o «no delay expected».",
          "MAYDAY, MAYDAY, MAYDAY, FUEL: combustible al aterrizar por debajo de la reserva final.",
          "Combustible en tiempo, no en masa.",
          "Desde 2012 la fraseología está armonizada con el Anexo 6.",
        ],
      },
      fuentes(
        "Doc 4444 · Doc 9432 · Doc 9835 · Anexo 6",
        "Doc 4444 (15.ª ed., Enm. 4) cap. 1, definición «Combustible mínimo»; preámbulo, Tabla A, Enmienda 4 de la 15.ª edición (fraseología y procedimientos ATC de combustible armonizados con el Anexo 6; aprobada el 16 de marzo de 2012, aplicable el 15 de noviembre de 2012). Doc 9432 (4.ª ed.) 2.6 (UNABLE). Doc 9835 (2.ª ed.) 3.4.14.",
        [
          "VERIFICAR: criterios de MINIMUM FUEL y de emergencia de combustible contra Anexo 6 Parte I, sección de gestión del combustible en vuelo (no cargado).",
          "VERIFICAR: «MAYDAY, MAYDAY, MAYDAY, FUEL» contra Anexo 6 Parte I y Doc 4444 cap. 15 (no cargados).",
          "VERIFICAR: respuestas ATC «ROGER, NO DELAY EXPECTED» / «EXPECT (delay information)» contra Doc 4444 cap. 12 (no cargado).",
          "VERIFICAR: nota de la definición («no es una situación de emergencia…») en la edición vigente del Doc 4444 cap. 1.",
          "VERIFICAR: diferencias de Estados Unidos (FAA) sobre minimum fuel, contra AIM/FAA Order JO 7110.65.",
          "VERIFICAR: «HOLD AT (fix) AS PUBLISHED, EXPECT APPROACH CLEARANCE AT (time)» contra Doc 4444 cap. 12 (espera) (no cargado; ver Nivel 4, cap. 28).",
        ],
      ),
    ],
  },
  // ── 38 ──────────────────────────────────────────────────────────────────
  {
    n: 38,
    title: "TCAS/ACAS RA",
    kicker: "Cumplir, informar y volver a la autorización",
    minutes: 9,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "El ACAS es un «sistema de aeronave basado en señales de transpondedor del SSR que funciona independientemente del equipo instalado en tierra para proporcionar aviso al piloto sobre posibles conflictos entre aeronaves dotadas de transpondedores SSR» (Doc 4444 cap. 1). TCAS es el nombre del equipo que lo implementa en la mayoría de los aviones de transporte.",
      },
      { kind: "p", text: "Da dos tipos de aviso (VERIFICAR definiciones, Doc 4444 cap. 1 edición vigente y Doc 8168 Vol. I):" },
      {
        kind: "glosario",
        items: [
          { k: "TA (traffic advisory)", v: "aviso de tránsito. Alerta; no pide maniobra." },
          {
            k: "RA (resolution advisory)",
            v: "aviso de resolución. Pide una maniobra vertical (o limitarla) para aumentar la separación.",
          },
        ],
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**Con un RA se sigue el RA**, incluso si contradice una instrucción del ATC, y se maniobra con prontitud (VERIFICAR, Doc 8168 Vol. I).",
          "**No se maniobra con un TA solo.** El TA sirve para buscar el tránsito y prepararse.",
          "**Se avisa al ATC en cuanto se pueda**, con la fraseología prevista. Primero el avión, luego la radio.",
          "Mientras usted responde a un RA, el ATC no intenta cambiarle la trayectoria (VERIFICAR, Doc 4444 cap. 15).",
          "**Al terminar** («clear of conflict»), se regresa con prontitud a la autorización y se le dice al ATC.",
          "El ACAS depende del transpondedor de los dos aviones: un transpondedor en STBY o sin Modo C deja al otro sin RA (cap. 31).",
          "La Tabla A del Doc 4444 registra que la 15.ª edición incorporó «procedimientos y fraseología relativos al ACAS». La fraseología exacta está en el cap. 12, que no está cargado.",
        ],
      },
      {
        kind: "hueco",
        rotulo: "CM-38-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion: "Imagen sugerida: Vista lateral de dos aeronaves en niveles cercanos con trayectorias convergentes. La de arriba recibe «DESCEND» y la de abajo «CLIMB» (flechas verticales con el texto del RA en mono). Una línea de tiempo abajo con cuatro momentos numerados: 1) TA: buscar tránsito; 2) RA: maniobra; 3) llamada «TCAS RA»; 4) «CLEAR OF CONFLICT, RETURNING TO…» y 5) «CLEAR OF CONFLICT, … RESUMED». Globos de diálogo cortos con el texto de cada llamada. Objetivo: Que el piloto vea el orden: maniobrar primero, informar después, y los dos avisos distintos al terminar.",
        alto: 280,
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "Esta lección tiene fraseología y procedimientos que no están en las fuentes cargadas. «TCAS RA», «CLEAR OF CONFLICT, RETURNING TO (assigned clearance)», «CLEAR OF CONFLICT (assigned clearance) RESUMED», «UNABLE, TCAS RA» y la respuesta ATC «ROGER»: **Doc 4444 cap. 12** (maniobras ACAS) y **Doc 9432 11.6**. Seguir el RA aunque contradiga al ATC, no maniobrar por un TA y regresar pronto a la autorización: **Doc 8168 (PANS-OPS) Vol. I**. Que el ATC no modifique la trayectoria durante un RA: **Doc 4444 cap. 15**. Definiciones de TA y RA: **Doc 4444 cap. 1 vigente**. Piloto automático con RA: **manual del fabricante** del tipo.",
      ),
      ...ejemplo(
        "Ejemplo 1 · Aviso de RA (VERIFICAR)",
        [`PILOT: "BOGOTA CONTROL, AVIATORY 452, TCAS RA."`, `ATC:   "AVIATORY 452, ROGER."`],
        "Significado: usted inició la maniobra por un RA y se aparta de la autorización. El ATC acusa recibo; no le da instrucciones de trayectoria mientras dura el RA.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Terminó el RA y vuelve al nivel (VERIFICAR)",
        [
          `PILOT: "BOGOTA CONTROL, AVIATORY 452, CLEAR OF CONFLICT, RETURNING TO FLIGHT LEVEL 350."`,
          `ATC:   "AVIATORY 452, ROGER."`,
        ],
        "Significado: terminó el RA y está volviendo al nivel autorizado. (El ATC puede, en lugar de ROGER, dar otra instrucción.)",
      ),
      ...ejemplo(
        "Ejemplo 3 · De nuevo en la autorización (VERIFICAR)",
        [
          `PILOT: "BOGOTA CONTROL, AVIATORY 452, CLEAR OF CONFLICT, FLIGHT LEVEL 350 RESUMED."`,
          `ATC:   "AVIATORY 452, ROGER."`,
        ],
        "Significado: ya está de nuevo en la autorización.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Una instrucción que el RA no deja cumplir (VERIFICAR)",
        [
          `ATC:   "AVIATORY 452, CLIMB TO FLIGHT LEVEL 360."`,
          `PILOT: "AVIATORY 452, UNABLE, TCAS RA."`,
          `ATC:   "AVIATORY 452, ROGER."`,
        ],
        "Significado: recibió una instrucción que el RA no le deja cumplir. Se dice UNABLE, TCAS RA, y se sigue el RA.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Información de tránsito",
        [
          `ATC:   "AVIATORY 452, TRAFFIC 12 O'CLOCK 5 MILES OPPOSITE DIRECTION, 1000 FEET BELOW."`,
          `PILOT: "AVIATORY 452, LOOKING OUT."`,
        ],
        "Significado: información de tránsito (Doc 9432 6.4). Si usted tiene un TA de ese tránsito, no maniobra por el TA: lo busca y espera.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Maniobra de evitación ordenada por el ATC",
        [
          `ATC:   "AVIATORY 452, TURN RIGHT IMMEDIATELY HEADING 110 TO AVOID TRAFFIC 12 O'CLOCK 4 MILES."`,
          `PILOT: "RIGHT HEADING 110, AVIATORY 452."`,
        ],
        "Significado: maniobra de evitación ordenada por el ATC (Doc 9432 6.7.2). Si durante esa maniobra aparece un RA, manda el RA.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Durante y después de un RA",
        texto: "En cabina, el PF sigue el RA con las guías del PFD y el PM hace la llamada cuando la maniobra está en curso y el avión controlado; el reparto exacto lo fija el SOP del explotador. El piloto automático y el director de vuelo se manejan según el procedimiento del fabricante (en algunos aviones el piloto automático puede volar el RA; VERIFICAR según tipo). Después de un RA hay reporte obligatorio según el sistema de notificación del explotador y del Estado.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Seguir al ATC en contra del RA", "Seguir la instrucción del ATC en contra del RA."),
      error("Maniobrar con un TA", "Maniobrar con un TA."),
      error("Llamar antes de maniobrar", "Llamar al ATC antes de iniciar la maniobra."),
      error(
        "Olvidar CLEAR OF CONFLICT",
        "Olvidar la segunda llamada (CLEAR OF CONFLICT): el ATC no sabe cuándo recupera la responsabilidad de separación.",
      ),
      error("Frases no estándar", "Usar frases no estándar («we had a TCAS», «traffic alert, climbing»)."),
      error(
        "Invertir el sentido del RA",
        "Invertir el sentido del RA (subir cuando pide bajar) por una mala lectura bajo estrés.",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "TA: buscar y prepararse. RA: maniobrar.",
          "El RA manda sobre la instrucción del ATC.",
          "Primero se maniobra; después «TCAS RA».",
          "Al terminar: «CLEAR OF CONFLICT, RETURNING TO…» y luego «… RESUMED».",
          "Si no puede cumplir una instrucción por un RA: «UNABLE, TCAS RA».",
        ],
      },
      fuentes(
        "Doc 4444 · Doc 9432 · Doc 8168",
        "Doc 4444 (15.ª ed., Enm. 4) cap. 1, definición «Sistema anticolisión de a bordo (ACAS)»; preámbulo, Tabla A (15.ª edición: procedimientos y fraseología relativos al ACAS; 12.ª ed., Enm. 4: prestación de servicios ATS independientemente de la utilización del ACAS). Doc 9432 (4.ª ed.) 6.4 (información de tránsito, LOOKING OUT); 6.7.2 (maniobra de evitación ordenada por el ATC).",
        [
          "VERIFICAR: «TCAS RA», «CLEAR OF CONFLICT, RETURNING TO (assigned clearance)», «CLEAR OF CONFLICT (assigned clearance) RESUMED», «UNABLE, TCAS RA» y la respuesta ATC «ROGER» contra Doc 4444 cap. 12 (maniobras ACAS) y Doc 9432 11.6 (no cargados).",
          "VERIFICAR: seguir el RA aunque contradiga al ATC, no maniobrar por un TA y regresar pronto a la autorización, contra Doc 8168 (PANS-OPS) Vol. I, procedimientos ACAS (no cargado).",
          "VERIFICAR: el ATC no modifica la trayectoria de una aeronave que responde a un RA, contra Doc 4444 cap. 15 (no cargado).",
          "VERIFICAR: definiciones de TA y RA contra Doc 4444 cap. 1 de la edición vigente.",
          "VERIFICAR: modo de piloto automático con RA según tipo de aeronave (manual del fabricante).",
        ],
      ),
    ],
  },
  // ── 39 ──────────────────────────────────────────────────────────────────
  {
    n: 39,
    title: "RVSM",
    kicker: "Cuándo se pierde la capacidad y cómo se dice",
    minutes: 9,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "RVSM (separación vertical mínima reducida) es la aplicación de 1000 ft de separación vertical entre el FL 290 y el FL 410 inclusive, cuando fuera de ese espacio designado se aplican nominalmente 2000 ft desde el FL 290 (Doc 4444 2.6.1.1 nota 1 y 5.3.2). Solo pueden operar ahí aeronaves con aprobación RVSM.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "list",
        items: [
          "**Aprobación.** El explotador se asegura antes de la salida de que la aeronave tiene la aprobación RVSM requerida cuando va a operar en ese espacio aéreo (Doc 4444 4.4.1.4 b). En el plan de vuelo se indica esa capacidad (VERIFICAR la casilla y la letra en el Apéndice 2 vigente).",
          "**Pérdida de capacidad.** Cuando una falla de altimetría, del piloto automático u otro sistema degrada la performance por debajo de lo requerido para ese espacio aéreo, la tripulación lo notifica **sin demora** al ATC (Doc 4444 5.2.2). El ATC entonces aplica otra separación.",
          "**Turbulencia.** Turbulencia que no deja mantener el nivel con la precisión requerida también es motivo para informar que no puede seguir en RVSM (VERIFICAR).",
          "**Aeronave sin aprobación.** Si una aeronave no aprobada es autorizada a entrar o cruzar el espacio RVSM (por ejemplo, en vuelos especiales), lo informa en la comunicación, con la frase NEGATIVE RVSM (VERIFICAR).",
          "**Frases cortas.** El ATC necesita saber tres cosas: que usted no puede operar en RVSM, por qué y qué va a hacer o pedir.",
        ],
      },
      {
        kind: "hueco",
        rotulo: "CM-39-01 · Esquema · 4:5 · 1080×1350 px",
        descripcion: "Imagen sugerida: Columna vertical de niveles de vuelo del FL 280 al FL 420. Entre FL 290 y FL 410, banda sombreada con el rótulo «RVSM: 1000 ft» y niveles cada 1000 ft. Fuera de la banda, rótulos de separación nominal según Doc 4444 5.3.2. A un lado, tres fichas de fallas: «altímetro», «piloto automático / mantenimiento de nivel», «turbulencia fuerte», cada una con una flecha hacia «Notificar al ATC sin demora (Doc 4444 5.2.2)». Objetivo: Que el piloto entienda dónde aplica RVSM y qué fallas le quitan la capacidad y obligan a avisar.",
        alto: 420,
        ratio: "4 / 5",
        anchoMax: 420,
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "Toda la fraseología RVSM de esta lección está sin verificar: «CONFIRM RVSM APPROVED», «AFFIRM RVSM», «NEGATIVE RVSM», «UNABLE RVSM DUE EQUIPMENT», «UNABLE RVSM DUE TURBULENCE», «READY TO RESUME RVSM», «UNABLE ISSUE CLEARANCE INTO RVSM AIRSPACE, MAINTAIN (level)» y en qué transmisiones se incluye NEGATIVE RVSM: **Doc 4444 cap. 12** (fraseología RVSM). La indicación RVSM en el plan de vuelo: **Doc 4444 Apéndice 2 vigente**. La turbulencia como causa de pérdida de capacidad y los procedimientos de contingencia: **Doc 9574** y **Doc 4444 cap. 15**.",
      ),
      ...ejemplo(
        "Ejemplo 1 · El ATC pregunta la aprobación (VERIFICAR)",
        [`ATC:   "AVIATORY 452, CONFIRM RVSM APPROVED."`, `PILOT: "AFFIRM RVSM, AVIATORY 452."`],
        "Significado: el ATC pregunta si la aeronave tiene aprobación RVSM.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Pérdida de capacidad por equipo (VERIFICAR)",
        [
          `PILOT: "BOGOTA CONTROL, AVIATORY 452, UNABLE RVSM DUE EQUIPMENT."`,
          `ATC:   "AVIATORY 452, ROGER, DESCEND TO FLIGHT LEVEL 280."`,
          `PILOT: "DESCENDING FLIGHT LEVEL 280, AVIATORY 452."`,
        ],
        "Significado: perdió la capacidad RVSM por una falla (por ejemplo, un altímetro principal). El ATC lo saca del espacio RVSM o aplica otra separación. La respuesta del ATC es un ejemplo: puede ser otra.",
      ),
      ...ejemplo(
        "Ejemplo 3 · Pérdida de capacidad por turbulencia (VERIFICAR)",
        [`PILOT: "BOGOTA CONTROL, AVIATORY 452, UNABLE RVSM DUE TURBULENCE."`, `ATC:   "AVIATORY 452, ROGER."`],
        "Significado: turbulencia que no deja mantener el nivel dentro de la precisión requerida.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Listo para volver a RVSM (VERIFICAR)",
        [`PILOT: "BOGOTA CONTROL, AVIATORY 452, READY TO RESUME RVSM."`, `ATC:   "AVIATORY 452, ROGER."`],
        "Significado: terminó la turbulencia o se recuperó el sistema; el ATC decide cuándo lo vuelve a tratar como RVSM.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Aeronave sin aprobación (VERIFICAR)",
        [`PILOT: "BOGOTA CONTROL, AVIATORY 452, FLIGHT LEVEL 370, NEGATIVE RVSM."`, `ATC:   "AVIATORY 452, ROGER."`],
        "Significado: primer contacto de una aeronave sin aprobación RVSM (o que la perdió) dentro de ese espacio aéreo. VERIFICAR en qué transmisiones se exige incluir NEGATIVE RVSM.",
      ),
      ...ejemplo(
        "Ejemplo 6 · El ATC no puede autorizar el ascenso (VERIFICAR)",
        [
          `ATC:   "AVIATORY 452, UNABLE ISSUE CLEARANCE INTO RVSM AIRSPACE, MAINTAIN FLIGHT LEVEL 280."`,
          `PILOT: "MAINTAINING FLIGHT LEVEL 280, AVIATORY 452."`,
        ],
        "Significado: el ATC no puede autorizar a una aeronave no aprobada a subir al espacio RVSM.",
      ),
      ...ejemplo(
        "Ejemplo 7 · Qué pasó, qué significa y qué pide (PLAIN LANGUAGE con la frase RVSM)",
        [`PILOT: "BOGOTA CONTROL, AVIATORY 452, ALTIMETER DISAGREE, UNABLE RVSM DUE EQUIPMENT, REQUEST FLIGHT LEVEL 280."`],
        "Significado: **PLAIN LANGUAGE** para la descripción («altimeter disagree») y la solicitud, junto con la frase RVSM. Así el ATC sabe qué pasó, qué significa y qué pide usted.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En crucero, entre FL 290 y FL 410",
        texto: "Casi toda la operación de jet de línea en crucero ocurre en espacio RVSM. La MEL del explotador dice qué equipos se necesitan para operar en RVSM; si uno falla en vuelo, la lista anormal del avión y el manual del explotador indican cuándo se pierde la capacidad. En ese momento se avisa al ATC con la frase corta y se espera su instrucción; no se cambia de nivel por cuenta propia salvo contingencia. Algunas regiones tienen procedimientos de contingencia particulares (por ejemplo, oceánicas; ver Nivel 6).",
      },
      { kind: "sub", text: "Error frecuente" },
      error(
        "Seguir en RVSM con altímetros en desacuerdo",
        "Seguir en RVSM con un altímetro en desacuerdo sin decir nada.",
      ),
      error(
        "El relato sin la frase clave",
        "Explicar la falla con un relato largo y no decir la frase clave («UNABLE RVSM DUE EQUIPMENT»).",
      ),
      error(
        "Cambiar de nivel sin autorización",
        "Cambiar de nivel sin autorización por una falla que no lo exige.",
      ),
      error(
        "No avisar la recuperación",
        "Olvidar informar cuando la capacidad se recupera y seguir con restricciones que ya no aplican.",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "RVSM: 1000 ft entre FL 290 y FL 410 inclusive, solo con aprobación.",
          "La pérdida de capacidad se notifica sin demora (Doc 4444 5.2.2).",
          "«UNABLE RVSM DUE EQUIPMENT» / «DUE TURBULENCE»; «READY TO RESUME RVSM».",
          "Aeronave no aprobada: «NEGATIVE RVSM».",
          "El ATC decide el nivel; usted informa y pide.",
        ],
      },
      fuentes(
        "Doc 4444 · Doc 9432 · Doc 9574",
        "Doc 4444 (15.ª ed., Enm. 4) 2.6.1.1 nota 1 (RVSM, 300 m / 1000 ft entre FL 290 y FL 410 inclusive); 4.4.1.4 b) (aprobación RVSM antes de la salida); 5.2.2 (deterioro de la performance: notificar sin demora); 5.3.2 (separación vertical mínima; nota sobre Doc 9574); preámbulo, Tabla A (14.ª ed., Enm. 3: fraseología relativa a RVSM). Doc 9432 (4.ª ed.) 2.6 (AFFIRM, UNABLE).",
        [
          "VERIFICAR: «CONFIRM RVSM APPROVED», «AFFIRM RVSM», «NEGATIVE RVSM», «UNABLE RVSM DUE EQUIPMENT», «UNABLE RVSM DUE TURBULENCE», «READY TO RESUME RVSM», «UNABLE ISSUE CLEARANCE INTO RVSM AIRSPACE, MAINTAIN (level)» y en qué transmisiones se incluye NEGATIVE RVSM, contra Doc 4444 cap. 12 (fraseología RVSM) (no cargado).",
          "VERIFICAR: indicación de la aprobación RVSM en el plan de vuelo contra Doc 4444 Apéndice 2 vigente (no cargado).",
          "VERIFICAR: turbulencia como causa de pérdida de capacidad y procedimientos de contingencia contra Doc 9574 y Doc 4444 cap. 15 (no cargados).",
        ],
      ),
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
