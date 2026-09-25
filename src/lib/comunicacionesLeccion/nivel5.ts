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
    title: "La frecuencia de emergencia 121.5 MHz",
    kicker: "Para qué es y para qué no",
    minutes: 8,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "121,5 MHz es el canal VHF de emergencia aeronáutico. Existe para que haya una frecuencia común, escuchada por dependencias ATS designadas y por muchas aeronaves, cuando los canales normales no sirven o no están disponibles. El Doc 9432 menciona que dentro del servicio móvil aeronáutico entran las radiobalizas de localización de siniestros que operan en las frecuencias de socorro y de urgencia designadas.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "**Para qué sirve (según el Anexo 10, VERIFICAR la lista exacta):**" },
      {
        kind: "list",
        items: [
          "Dar un canal libre entre una aeronave en socorro o urgencia y una estación en tierra cuando los canales normales están ocupados.",
          "Comunicación con aeródromos que normalmente no usan los servicios internacionales, en caso de emergencia.",
          "Canal común entre aeronaves civiles y militares, y con buques, en búsqueda y salvamento.",
          "Comunicación con una aeronave cuando una falla de equipo le impide usar los canales normales.",
          "Interceptación: el interceptor intenta comunicarse en 121,5 (Anexo 2, Apéndice 2; VERIFICAR).",
          "Radiobalizas de emergencia (ELT): las modernas transmiten en 406 MHz y usan 121,5 como señal de localización (VERIFICAR).",
        ],
      },
      { kind: "p", text: "**Lo que 121,5 NO es:**" },
      {
        kind: "list",
        items: [
          "No es «la frecuencia para cualquier cosa». No se usa para charla, para preguntar la frecuencia del siguiente sector por comodidad ni como canal aire-aire.",
          "**No es el primer lugar donde se declara una emergencia.** El mensaje de socorro o urgencia va, en principio, en la frecuencia aire-tierra en uso, donde el controlador que ya lo tiene identificado puede actuar (VERIFICAR, Anexo 10 Vol. II cap. 5). 121,5 es la opción cuando esa frecuencia no funciona o usted no tiene contacto.",
          "No reemplaza la revisión de cabina en una pérdida de comunicaciones (cap. 32).",
        ],
      },
      {
        kind: "p",
        text: "**Escucha de 121,5.** El Anexo 10 y el Anexo 6 piden que ciertas aeronaves mantengan escucha continua de 121,5 en determinadas zonas o vuelos (por ejemplo, largos trayectos sobre el agua o áreas designadas), en la medida de lo posible (VERIFICAR alcance exacto). Muchas aerolíneas la dejan en la segunda radio durante el crucero; es práctica del explotador, no regla universal. En pilotos de habla inglesa se escucha llamar a esta frecuencia «guard»; es jerga, no fraseología.",
      },
      {
        kind: "p",
        text: "**Por qué importa escucharla:** por ahí puede llegarle un llamado del ATC que lo perdió en su frecuencia, una aeronave en problemas que necesita retransmisión o un interceptor.",
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "Esta lección tiene reglas que no están en las fuentes cargadas. Los usos del canal de emergencia 121,5 MHz: **Anexo 10 Vol. V** (asignación de frecuencias; canal de emergencia) y **Vol. II cap. 5**. Que el mensaje de socorro o urgencia vaya en principio en la frecuencia en uso: **Anexo 10 Vol. II cap. 5**. Requisitos de escucha de 121,5: **Anexo 10 Vol. II cap. 5 y Anexo 6 Parte I**. Interceptores en 121,5: **Anexo 2, Apéndice 2**; ELT 406 / 121,5: **Anexo 10 Vol. III y Anexo 6**. Cómo notificar una señal de ELT escuchada: **AIP de cada Estado**.",
      ),
      ...ejemplo(
        "Ejemplo 1 · El ATC lo busca por 121,5 (PLAIN LANGUAGE en la forma de la llamada)",
        [
          `ATC (en 121,5):   "AVIATORY 452, BOGOTA CONTROL ON 121.5, CONTACT BOGOTA CONTROL 128.7."`,
          `PILOT (en 121,5): "128.7, AVIATORY 452."`,
        ],
        "Significado: la instrucción CONTACT es normalizada (Doc 9432 2.8.2.1); la forma de la llamada en 121,5 es **PLAIN LANGUAGE**. El ATC lo perdió en la frecuencia asignada y lo busca por 121,5. Usted responde corto y cambia. No se discute en 121,5 por qué se perdió el contacto.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Usted pide frecuencia por 121,5 (PLAIN LANGUAGE)",
        [
          `PILOT (en 121,5): "BOGOTA CONTROL, AVIATORY 452 ON 121.5, UNABLE CONTACT ON 128.7, REQUEST FREQUENCY."`,
          `ATC:              "AVIATORY 452, CONTACT BOGOTA CONTROL 126.3."`,
          `PILOT:            "126.3, AVIATORY 452."`,
        ],
        "Significado: **PLAIN LANGUAGE**. Pérdida de contacto que no es emergencia: se usa 121,5 como último recurso, se resuelve en una o dos transmisiones y se sale.",
      ),
      ...ejemplo(
        "Ejemplo 3 · MAYDAY en 121,5",
        [`PILOT (en 121,5): "MAYDAY, MAYDAY, MAYDAY, BOGOTA CONTROL, AVIATORY 452, ..."`],
        "Significado: solo cuando la frecuencia en uso no le sirve. La estructura del mensaje está en el cap. 34.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Lo que no se hace (PLAIN LANGUAGE)",
        [`PILOT (en 121,5): "AVIATORY 425, AVIATORY 452 ON 121.5, CONFIRM YOU ARE ON THIS FREQUENCY."`],
        "Significado: **PLAIN LANGUAGE**. Evite usar 121,5 para coordinar entre aeronaves de la misma empresa: cada transmisión que no es necesaria tapa una que sí podría serlo. Este ejemplo está aquí como lo que **no** se hace.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En crucero, con la segunda radio en 121,5",
        texto: "En crucero, la segunda radio suele quedar en 121,5 (según SOP). Cuando se escucha un llamado ahí, primero se comprueba si es para usted. Si otra aeronave pide ayuda y no tiene contacto con el ATC, usted puede servirle de relay en la frecuencia del ATC. Se escuchan portadoras de ELT activados sin intención: si lo nota, puede informarlo al ATC con el lugar y la hora aproximados (procedimiento local; VERIFICAR).",
      },
      { kind: "sub", text: "Error frecuente" },
      error(
        "Declarar primero en 121,5",
        "Declarar primero en 121,5 cuando tenía contacto con el controlador en su frecuencia.",
      ),
      error("121,5 como canal de charla", "Usar 121,5 como canal de charla o de coordinación entre compañeros."),
      error(
        "El volumen de 121,5 abajo",
        "Olvidar que el volumen de la radio en 121,5 está abajo y perder un llamado de interceptación o del ATC.",
      ),
      error(
        "Creer que estar en 121,5 es haber avisado",
        "Confundir «estar en 121,5» con «haber avisado al ATC»: si nadie responde, nadie lo escuchó.",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "121,5 es el canal VHF de emergencia, con usos definidos por el Anexo 10.",
          "El mensaje de socorro o urgencia va primero en la frecuencia en uso.",
          "Sirve también para recuperar contacto, interceptación, búsqueda y salvamento y ELT.",
          "No es canal aire-aire ni de charla.",
          "Escúchela cuando la norma o el SOP lo pidan: por ahí pueden estar buscándolo.",
        ],
      },
      fuentes(
        "Doc 9432 · Doc 9835 · Anexo 10",
        "Doc 9432 (4.ª ed.) cap. 1, definición «Servicio móvil aeronáutico» (radiobalizas en frecuencias de socorro y urgencia); 2.8.2.1 (CONTACT). Doc 9835 (2.ª ed.) 4.3.4 (el lenguaje común en emergencias, claro y conciso).",
        [
          "VERIFICAR: usos del canal de emergencia 121,5 MHz contra Anexo 10 Vol. V (asignación de frecuencias; canal de emergencia) y Vol. II cap. 5 (no cargados).",
          "VERIFICAR: que el mensaje de socorro o urgencia se transmita en principio en la frecuencia en uso, contra Anexo 10 Vol. II cap. 5 (no cargado).",
          "VERIFICAR: requisitos de escucha de 121,5 contra Anexo 10 Vol. II cap. 5 y Anexo 6 Parte I (no cargados).",
          "VERIFICAR: comunicación con interceptores en 121,5 contra Anexo 2, Apéndice 2 (no cargado); ELT 406 / 121,5 contra Anexo 10 Vol. III y Anexo 6 (no cargados).",
          "VERIFICAR: cómo notificar una señal de ELT escuchada, según AIP de cada Estado.",
        ],
      ),
    ],
  },
  // ── 34 ──────────────────────────────────────────────────────────────────
  {
    n: 34,
    title: "Socorro: MAYDAY",
    kicker: "Qué es una situación de socorro y qué se informa",
    minutes: 10,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "**Socorro** (distress) es la condición de estar amenazado por un peligro grave o inminente y necesitar ayuda inmediata (VERIFICAR la redacción exacta, Anexo 10 Vol. II cap. 5). La señal radiotelefónica es **MAYDAY**, dicha preferiblemente tres veces al comienzo del primer mensaje. Una llamada de socorro tiene prioridad absoluta sobre cualquier otra comunicación.",
      },
      {
        kind: "p",
        text: "No confundir con las **fases de emergencia** del Doc 4444 (incertidumbre, alerta, peligro). Esas fases las declara el ATS para activar el servicio de alerta y búsqueda y salvamento. La «fase de peligro» se define como la situación en que hay motivos justificados para creer que la aeronave y sus ocupantes están amenazados por un peligro grave e inminente y necesitan auxilio inmediato. Se parece a la definición de socorro, pero no es lo que el piloto dice por radio: es la clasificación que hace el sistema.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "secuencia",
        titulo: "Contenido del mensaje de socorro (orden según Anexo 10 Vol. II y Doc 9432 cap. 9; VERIFICAR)",
        numerada: true,
        items: [
          "MAYDAY, MAYDAY, MAYDAY.",
          "Estación a la que se dirige (cuando el tiempo y las circunstancias lo permitan).",
          "Identificación de la aeronave.",
          "Naturaleza de la condición de socorro.",
          "Intenciones del piloto al mando.",
          "Posición actual, nivel y rumbo.",
          "Cualquier otra información útil.",
        ],
      },
      { kind: "p", text: "**Reglas que acompañan esa secuencia (VERIFICAR):**" },
      {
        kind: "list",
        items: [
          "Se transmite en la frecuencia en uso, con el controlador que ya lo tiene.",
          "Es una guía, no un formulario: si no tiene tiempo, diga lo esencial (MAYDAY, quién es, qué pasa) y complete después.",
          "El transpondedor puede ir a 7700 (cap. 31, con su precaución).",
          "El ATC puede imponer silencio a las demás estaciones y, al terminar, anunciar que el tráfico de socorro ha terminado.",
        ],
      },
      {
        kind: "p",
        text: "**Aviate, navigate, communicate.** El mensaje de socorro no va antes de controlar el avión. En una despresurización, primero máscaras y descenso; la llamada viene cuando la cabina lo permite.",
      },
      {
        kind: "p",
        text: "**MAYDAY no es un castigo ni un trámite.** Declarar socorro da prioridad y moviliza ayuda. Si la situación mejora, se puede cancelar. Pero tampoco se usa para cualquier falla (ver cap. 35 y 36).",
      },
      {
        kind: "hueco",
        rotulo: "CM-34-01 · Esquema · 4:5 · 1080×1350 px",
        descripcion: "Imagen sugerida: Tarjeta vertical tipo «ficha de bolsillo» con los siete elementos del mensaje de socorro, numerados, cada uno con un ícono simple (radio, avión, advertencia, flecha, mapa con nivel y rumbo, signo más). Debajo, el ejemplo de la despresurización de este capítulo con cada parte subrayada en el color del elemento que le corresponde. Rótulo en la esquina: «VERIFICAR contra Anexo 10 Vol. II cap. 5 antes de publicar». Objetivo: Que el piloto memorice el orden del mensaje y lo reconozca en un ejemplo real de cabina.",
        alto: 420,
        ratio: "4 / 5",
        anchoMax: 420,
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "Esta lección tiene fraseología que no está en las fuentes cargadas. La definición de socorro, la señal MAYDAY dicha tres veces y el orden del mensaje: **Anexo 10 Vol. II cap. 5** y **Doc 9432 9.2.1**. «ROGER MAYDAY», «STOP TRANSMITTING, MAYDAY» y «DISTRESS TRAFFIC ENDED»: **Doc 9432 9.2.2 y 9.2.3** y **Anexo 10 Vol. II cap. 5**. «SQUAWK MAYDAY» en inglés: **Doc 4444 cap. 12**. Fraseología de descenso de emergencia: **Doc 9432 9.4** y **Doc 4444 cap. 15**. Aceptación de «declare emergency» sin señal: la norma de cada Estado.",
      ),
      ...ejemplo(
        "Ejemplo 1 · Despresurización (VERIFICAR «ROGER MAYDAY»)",
        [
          `PILOT: "MAYDAY, MAYDAY, MAYDAY, BOGOTA CONTROL, AVIATORY 452, RAPID DECOMPRESSION, EMERGENCY DESCENT TO FLIGHT LEVEL 100, POSITION 20 MILES NORTH OF GIKOS, PASSING FLIGHT LEVEL 330, HEADING 180."`,
          `ATC:   "AVIATORY 452, ROGER MAYDAY."`,
        ],
        "Significado: socorro por despresurización. Naturaleza, intención (descenso de emergencia a FL 100), posición, nivel y rumbo. El ATC acusa recibo y luego despeja el espacio debajo.",
      ),
      ...ejemplo(
        "Ejemplo 2 · Fuego de motor después del despegue (VERIFICAR «ROGER MAYDAY»)",
        [
          `PILOT: "MAYDAY, MAYDAY, MAYDAY, BOGOTA APPROACH, AVIATORY 452, ENGINE FIRE LEFT ENGINE, REQUEST IMMEDIATE RETURN RUNWAY 13, 15 MILES SOUTH, CLIMBING THROUGH 9000 FEET, HEADING 160."`,
          `ATC:   "AVIATORY 452, ROGER MAYDAY, TURN LEFT HEADING 340, DESCEND TO 8000 FEET, QNH 1026."`,
          `PILOT: "LEFT HEADING 340, DESCENDING 8000 FEET, QNH 1026, AVIATORY 452."`,
        ],
        "Significado: fuego de motor después del despegue. Aun en socorro, las instrucciones de rumbo, nivel y reglaje se colacionan.",
      ),
      ...ejemplo(
        "Ejemplo 3 · El código de emergencia (VERIFICAR)",
        [`ATC:   "AVIATORY 452, SQUAWK MAYDAY."`, `PILOT: "SQUAWKING 7700, AVIATORY 452."`],
        "Significado: el ATC pide el código de emergencia (instrucción de Doc 9432 6.5.1; forma inglesa VERIFICAR). Normalmente el ATC ya sabe de la emergencia si usted está en contacto.",
      ),
      ...ejemplo(
        "Ejemplo 4 · Imposición de silencio (VERIFICAR)",
        [`ATC:   "ALL STATIONS, BOGOTA CONTROL, STOP TRANSMITTING, MAYDAY."`],
        "Significado: imposición de silencio: nadie transmite en esa frecuencia salvo la aeronave en socorro y el ATC, hasta que se anuncie el fin. VERIFICAR la forma exacta.",
      ),
      ...ejemplo(
        "Ejemplo 5 · Completar la información (PLAIN LANGUAGE)",
        [
          `PILOT: "BOGOTA CONTROL, AVIATORY 452, FLIGHT LEVEL 100, CABIN ALTITUDE UNDER CONTROL, NO INJURIES REPORTED, REQUEST DIVERSION TO BOGOTA, 1 HOUR 10 MINUTES FUEL."`,
        ],
        "Significado: **PLAIN LANGUAGE**. Después del primer mensaje se completa «cualquier otra información útil»: estado, personas, combustible en tiempo, lo que necesita.",
      ),
      ...ejemplo(
        "Ejemplo 6 · Personas a bordo y autonomía (PLAIN LANGUAGE)",
        [
          `ATC:   "AVIATORY 452, REPORT PERSONS ON BOARD AND FUEL ENDURANCE."`,
          `PILOT: "AVIATORY 452, 146 PERSONS ON BOARD, ENDURANCE 1 HOUR 10 MINUTES."`,
        ],
        "Significado: **PLAIN LANGUAGE** (la forma de esta pregunta varía por Estado y controlador). Número de personas y autonomía en tiempo, no en kilos.",
      ),
      ...ejemplo(
        "Ejemplo 7 · Fin del tráfico de socorro (VERIFICAR)",
        [`ATC:   "ALL STATIONS, BOGOTA CONTROL, DISTRESS TRAFFIC ENDED."`],
        "Significado: fin del tráfico de socorro y del silencio. VERIFICAR la forma exacta.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Con el avión controlado y la lista en marcha",
        texto: "En línea aérea, la llamada la hace normalmente el piloto que no vuela (PM) cuando el PF tiene el avión y la lista de verificación está en marcha; el reparto exacto lo fija el SOP. Se declara MAYDAY en situaciones como fuego que no se extingue, humo que no se controla, despresurización, pérdida de varios sistemas críticos o combustible por debajo de la reserva final (cap. 37). La información se da en capas: primero lo esencial, después lo demás cuando la cabina está estable. El explotador suele definir qué situaciones son MAYDAY en sus listas; esas decisiones se entrenan en simulador.",
      },
      { kind: "sub", text: "Error frecuente" },
      error("Llamar antes de estabilizar", "Hacer la llamada antes de estabilizar el avión."),
      error(
        "Mensaje largo y desordenado",
        "Mensaje de socorro largo y desordenado: el controlador tiene que buscar la naturaleza del problema entre frases (Doc 9835 3.4.14 muestra ese problema con un mensaje de «poco combustible»).",
      ),
      error("Omitir la intención", "Omitir la intención: el ATC no sabe si regresa, desvía o sigue."),
      error(
        "«Emergency» sin señal",
        "Decir «emergency» sin MAYDAY ni PAN PAN: el controlador puede no saber el grado de prioridad (VERIFICAR la aceptación de «declare emergency» sin señal en cada Estado).",
      ),
      error("Dejar de colacionar", "Dejar de colacionar rumbos y niveles por estar en emergencia."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "MAYDAY = peligro grave o inminente y necesidad de ayuda inmediata.",
          "Tres veces MAYDAY, estación, distintivo, naturaleza, intención, posición/nivel/rumbo, lo demás.",
          "Primero se vuela el avión; la llamada viene después.",
          "Frecuencia en uso primero; 121,5 si no hay contacto.",
          "En socorro también se colaciona lo crítico.",
        ],
      },
      fuentes(
        "Doc 4444 · Doc 9432 · Doc 9835",
        "Doc 4444 (15.ª ed., Enm. 4) cap. 1, definiciones «Fase de emergencia», «Fase de incertidumbre», «Fase de alerta», «Fase de peligro», «Servicio de alerta». Doc 9432 (4.ª ed.) 6.5.1 («TRANSPONDEDOR MAYDAY: seleccione código de emergencia», en español); 2.8.1.8 (repetir elementos importantes cuando la recepción es difícil). Doc 9835 (2.ª ed.) 3.3.13, 3.4.14, 4.3.4.",
        [
          "VERIFICAR: definición de socorro y de urgencia, señal MAYDAY dicha tres veces y orden del mensaje (estación, identificación, naturaleza, intenciones, posición/nivel/rumbo, otra información) contra Anexo 10 Vol. II cap. 5 y Doc 9432 9.2.1 (no cargados).",
          "VERIFICAR: «ROGER MAYDAY», «STOP TRANSMITTING, MAYDAY» y «DISTRESS TRAFFIC ENDED» contra Doc 9432 9.2.2 y 9.2.3 y Anexo 10 Vol. II cap. 5 (no cargados).",
          "VERIFICAR: «SQUAWK MAYDAY» en inglés contra Doc 4444 cap. 12 (no cargado).",
          "VERIFICAR: fraseología de descenso de emergencia contra Doc 9432 9.4 y Doc 4444 cap. 15 (no cargados).",
        ],
      ),
    ],
  },
  // ── 35 ──────────────────────────────────────────────────────────────────
  {
    n: 35,
    title: "Urgencia: PAN PAN",
    kicker: "Cuándo una situación es urgente sin ser socorro",
    minutes: 10,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "**Urgencia** es una condición que afecta la seguridad de la aeronave o de alguien a bordo o a la vista, pero que **no requiere ayuda inmediata** (VERIFICAR la redacción exacta, Anexo 10 Vol. II cap. 5). La señal es **PAN PAN**, dicha preferiblemente tres veces. Tiene prioridad sobre todo el tráfico, excepto el de socorro.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "secuencia",
        titulo: "Contenido del mensaje de urgencia (VERIFICAR): igual al de socorro, cambiando la señal y la naturaleza",
        numerada: true,
        items: [
          "PAN PAN, PAN PAN, PAN PAN.",
          "Estación a la que se dirige.",
          "Identificación de la aeronave.",
          "Naturaleza de la condición de urgencia.",
          "Intenciones del piloto al mando.",
          "Posición actual, nivel y rumbo.",
          "Cualquier otra información útil.",
        ],
      },
      { kind: "p", text: "**Cuándo suele encajar PAN PAN (escenarios de práctica, no lista oficial):**" },
      {
        kind: "list",
        items: [
          "Pasajero con una emergencia médica que obliga a desviar, sin amenaza para el vuelo.",
          "Falla técnica que degrada el avión y pide prioridad, pero el avión sigue controlable y con margen (por ejemplo, una falla hidráulica con sistemas de respaldo funcionando).",
          "Tripulante incapacitado, cuando el vuelo sigue controlado.",
          "Una situación que puede empeorar y en la que usted quiere que el ATC esté prevenido.",
        ],
      },
      { kind: "p", text: "**Cuándo NO hace falta ninguna de las dos señales:**" },
      {
        kind: "p",
        text: "Muchas fallas no requieren declarar nada: una falla de un sistema redundante, un generador perdido con los demás funcionando, una indicación que la lista resuelve. Se informa en lenguaje claro si afecta la operación (Doc 4444 5.2.2 pide notificar sin demora cuando una falla degrada la performance por debajo de lo requerido en ese espacio aéreo) y se pide lo que haga falta. **No se convierte automáticamente cada falla en PAN PAN o MAYDAY.**",
      },
      {
        kind: "p",
        text: "**PAN PAN MEDICAL no es «pasajero enfermo».** Esa variante se reserva para transportes sanitarios protegidos por los Convenios de Ginebra (VERIFICAR). Para un pasajero enfermo se usa PAN PAN, o ni siquiera eso si no necesita prioridad.",
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      verificar(
        "Esta lección tiene fraseología que no está en las fuentes cargadas. La definición de urgencia, la señal PAN PAN dicha tres veces, su prioridad y el orden del mensaje: **Anexo 10 Vol. II cap. 5** y **Doc 9432 9.3**. «ROGER PAN PAN» y la forma de cancelar la urgencia: **Doc 9432 9.3**. «PAN PAN MEDICAL» reservado a transportes sanitarios: **Anexo 10 Vol. II cap. 5**. «HOLD AT (fix) AS PUBLISHED»: **Doc 4444 cap. 12** (espera; ver Nivel 4, cap. 28).",
      ),
      ...ejemplo(
        "Ejemplo 1 · Urgencia médica (VERIFICAR «ROGER PAN PAN»)",
        [
          `PILOT: "PAN PAN, PAN PAN, PAN PAN, BOGOTA CONTROL, AVIATORY 452, MEDICAL EMERGENCY ON BOARD, PASSENGER WITH SUSPECTED HEART ATTACK, REQUEST DIVERSION TO BOGOTA, POSITION TOLMA, FLIGHT LEVEL 350, HEADING 020."`,
          `ATC:   "AVIATORY 452, ROGER PAN PAN. CLEARED DIRECT BOGOTA, DESCEND TO FLIGHT LEVEL 200."`,
          `PILOT: "DIRECT BOGOTA, DESCENDING FLIGHT LEVEL 200, AVIATORY 452."`,
        ],
        "Significado: urgencia médica. El avión no está en peligro; un pasajero sí, y necesita prioridad. VERIFICAR «ROGER PAN PAN».",
      ),
      ...ejemplo(
        "Ejemplo 2 · Falla hidráulica con avión controlable (PLAIN LANGUAGE en la parte del ATC; VERIFICAR «HOLD AT … AS PUBLISHED»)",
        [
          `PILOT: "PAN PAN, PAN PAN, PAN PAN, BOGOTA APPROACH, AVIATORY 452, HYDRAULIC SYSTEM FAILURE, REQUEST HOLDING TO COMPLETE CHECKLIST, THEN ILS RUNWAY 13, POSITION 25 MILES EAST, 12000 FEET, HEADING 270."`,
          `ATC:   "AVIATORY 452, ROGER. HOLD AT GIKOS AS PUBLISHED, MAINTAIN 12000 FEET, ADVISE WHEN READY FOR APPROACH."`,
        ],
        "Significado: falla técnica con avión controlable: se pide espacio y tiempo, no una aproximación inmediata. La parte del ATC tiene elementos **PLAIN LANGUAGE** («advise when ready»).",
      ),
      ...ejemplo(
        "Ejemplo 3 · Falla sin urgencia (PLAIN LANGUAGE)",
        [
          `PILOT: "BOGOTA CONTROL, AVIATORY 452, WE HAVE LOST ONE GENERATOR, NO IMPACT ON OUR OPERATION, FOR YOUR INFORMATION."`,
          `ATC:   "AVIATORY 452, ROGER."`,
        ],
        "Significado: **PLAIN LANGUAGE**. Falla sin urgencia: se informa porque puede ser útil, sin declarar nada.",
      ),
      ...ejemplo(
        "Ejemplo 4 · El ATC pregunta si necesita ayuda (PLAIN LANGUAGE)",
        [`ATC:   "AVIATORY 452, DO YOU REQUIRE ANY ASSISTANCE?"`, `PILOT: "NEGATIVE, AVIATORY 452. WE WILL ADVISE."`],
        "Significado: **PLAIN LANGUAGE**. El ATC pregunta si necesita ayuda; usted contesta con verdad y deja abierta la puerta.",
      ),
      ...ejemplo(
        "Ejemplo 5 · La urgencia empeora y se eleva a socorro",
        [
          `PILOT: "BOGOTA APPROACH, AVIATORY 452, SITUATION DETERIORATING, MAYDAY, MAYDAY, MAYDAY, AVIATORY 452, SMOKE IN THE CABIN NOT CONTROLLED, REQUEST IMMEDIATE LANDING RUNWAY 13."`,
        ],
        "Significado: una urgencia que empeora se eleva a socorro con la señal completa. No hace falta «cancelar» la urgencia antes.",
      ),
      ...ejemplo(
        "Ejemplo 6 · La situación se resuelve (PLAIN LANGUAGE; VERIFICAR)",
        [`PILOT: "BOGOTA APPROACH, AVIATORY 452, PASSENGER CONDITION STABLE, NO LONGER REQUIRE PRIORITY."`],
        "Significado: **PLAIN LANGUAGE**. Si la situación se resuelve, se informa para que el ATC libere la prioridad. VERIFICAR si existe forma estándar de cancelar la urgencia.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Emergencia médica o falla con limitaciones",
        texto: "PAN PAN es la llamada más común en línea aérea para emergencias médicas que llevan a desviar. También se usa cuando una falla técnica da un avión controlable pero con limitaciones que el ATC debe conocer (distancia de aterrizaje mayor, menos maniobrabilidad, pista específica). En ambos casos lo que el ATC necesita es: qué pasa, qué quiere hacer y qué necesita de él. Si la situación no pide prioridad, se informa en lenguaje claro. Cada explotador fija en su manual cuándo se declara y quién lo hace.",
      },
      { kind: "sub", text: "Error frecuente" },
      error(
        "MAYDAY por un pasajero enfermo",
        "Declarar MAYDAY por un pasajero enfermo con el avión sin problemas: moviliza recursos que no hacen falta y no mejora su atención.",
      ),
      error(
        "No declarar cuando sí hacía falta",
        "No declarar nada cuando sí necesitaba prioridad, y quedar en secuencia normal con un pasajero grave.",
      ),
      error("«PAN PAN MEDICAL» mal usado", "Usar «PAN PAN MEDICAL» para un pasajero enfermo."),
      error(
        "Un solo «pan pan» a media frase",
        "Anunciar «pan pan» una sola vez y en medio de la frase: el controlador puede no escucharlo.",
      ),
      error(
        "El relato en lugar del problema",
        "Mezclar el problema con la historia: el controlador necesita naturaleza, intención y necesidad, no el relato completo.",
      ),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "PAN PAN = urgencia: la seguridad está afectada, pero no se necesita ayuda inmediata.",
          "Mismo orden de mensaje que el socorro.",
          "Emergencia médica que obliga a desviar: el caso más común.",
          "No toda falla es PAN PAN; muchas se informan en lenguaje claro.",
          "Si empeora, se eleva a MAYDAY.",
        ],
      },
      fuentes(
        "Doc 4444 · Doc 9835 · Anexo 10",
        "Doc 4444 (15.ª ed., Enm. 4) 5.2.2 (deterioro de la performance: la tripulación notifica sin demora). Doc 9835 (2.ª ed.) 3.3.13 (problema técnico, pasajero indispuesto como casos de lenguaje común), 4.3.4.",
        [
          "VERIFICAR: definición de urgencia, señal PAN PAN dicha tres veces, prioridad y orden del mensaje contra Anexo 10 Vol. II cap. 5 y Doc 9432 9.3 (no cargados).",
          "VERIFICAR: «ROGER PAN PAN» y forma de cancelar la urgencia contra Doc 9432 9.3 (no cargado).",
          "VERIFICAR: uso de «PAN PAN MEDICAL» reservado a transportes sanitarios, contra Anexo 10 Vol. II cap. 5 (no cargado).",
          "VERIFICAR: «HOLD AT (fix) AS PUBLISHED» contra Doc 4444 cap. 12 (espera) (no cargado; ver Nivel 4, cap. 28).",
        ],
      ),
    ],
  },
  // ── 36 ──────────────────────────────────────────────────────────────────
  {
    n: 36,
    title: "MAYDAY o PAN PAN",
    kicker: "La diferencia, lado a lado",
    minutes: 8,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Una comparación para decidir rápido. La diferencia no está en qué sistema falló, sino en **si usted necesita ayuda inmediata**.",
      },
      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "table",
        head: ["", "MAYDAY (socorro)", "PAN PAN (urgencia)"],
        rows: [
          ["Condición", "Peligro grave o inminente; necesita ayuda inmediata", "Seguridad afectada; no necesita ayuda inmediata"],
          ["Prioridad", "Sobre todo el tráfico", "Sobre todo, excepto socorro"],
          ["Señal", "MAYDAY, tres veces", "PAN PAN, tres veces"],
          [
            "Mensaje",
            "Estación, distintivo, naturaleza, intenciones, posición/nivel/rumbo, otra información",
            "El mismo orden",
          ],
          [
            "Transpondedor",
            "7700 posible (con la precaución del cap. 31)",
            "7700 posible según el caso y lo que pida el ATC",
          ],
          ["Silencio de frecuencia", "El ATC puede imponerlo", "No es lo habitual"],
          [
            "Ejemplos de práctica",
            "Fuego no extinguido, humo no controlado, despresurización, combustible bajo la reserva final",
            "Emergencia médica, falla técnica con avión controlable, situación que puede empeorar",
          ],
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "Todas las filas de la tabla (definiciones, prioridades, señal, mensaje, silencio): VERIFICAR contra **Anexo 10 Vol. II cap. 5** y **Doc 9432 cap. 9**. Que la clasificación de la falla de motor dependa del explotador: **manual de operaciones del explotador** (no es norma OACI).",
      },
      { kind: "p", text: "**Tres preguntas para decidir:**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "¿Hay peligro grave o inminente para el avión o sus ocupantes y necesito ayuda ya? MAYDAY.",
          "¿La seguridad está afectada y necesito prioridad, pero no ayuda inmediata? PAN PAN.",
          "¿El avión sigue normal y solo debo informar? Lenguaje claro, sin señal.",
        ],
      },
      {
        kind: "p",
        text: "**La escala se puede subir y bajar.** Una urgencia puede volverse socorro; un socorro controlado se puede reducir. Lo importante es que el ATC sepa en qué nivel está usted en cada momento.",
      },
      {
        kind: "hueco",
        rotulo: "CM-36-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion: "Imagen sugerida: Escala horizontal de tres escalones: NORMAL (informar en lenguaje claro) → URGENCIA (PAN PAN) → SOCORRO (MAYDAY). Colores neutros del módulo: el ámbar y el rojo solo como semántica en los dos últimos escalones, con poca saturación. Bajo cada escalón, una pregunta corta («¿Solo informar?», «¿Necesito prioridad?», «¿Necesito ayuda inmediata?») y dos ejemplos de práctica. Flechas en ambos sentidos entre escalones con el rótulo «la situación puede subir o bajar». Objetivo: Que el piloto ubique una situación en la escala por la necesidad de ayuda, no por el nombre del sistema que falló.",
        alto: 280,
      },
      { kind: "sub", text: "Fraseología OACI" },
      COMO_LEER,
      {
        kind: "escenario",
        titulo: "Escenario de práctica 1: pasajero inconsciente, avión normal",
        situacion: "Un pasajero está inconsciente. El avión funciona con normalidad. Usted va en GIKOS, FL 360, rumbo 210, con Bogota Control.",
        preguntas: [
          {
            q: "¿Qué señal usa y cómo suena el mensaje?",
            a: "PILOT: «PAN PAN, PAN PAN, PAN PAN, BOGOTA CONTROL, AVIATORY 452, MEDICAL EMERGENCY, UNCONSCIOUS PASSENGER, REQUEST DIVERSION TO CALI, POSITION GIKOS, FLIGHT LEVEL 360, HEADING 210.» Urgencia: no hay peligro para el avión.",
          },
        ],
        concepto: "La señal sale de la necesidad de ayuda, no del nombre del problema.",
      },
      {
        kind: "escenario",
        titulo: "Escenario de práctica 2: humo en cabina que no se controla",
        situacion: "Hay humo en la cabina y no se logra controlar. Usted va 30 millas al sur de TOLMA, FL 340, rumbo 190, con Bogota Control.",
        preguntas: [
          {
            q: "¿Qué señal usa y cómo suena el mensaje?",
            a: "PILOT: «MAYDAY, MAYDAY, MAYDAY, BOGOTA CONTROL, AVIATORY 452, SMOKE IN THE CABIN, UNABLE TO CONTROL, REQUEST IMMEDIATE DESCENT AND LANDING NEAREST SUITABLE AIRPORT, POSITION 30 MILES SOUTH OF TOLMA, FLIGHT LEVEL 340, HEADING 190.» Socorro: amenaza inmediata al avión.",
          },
        ],
        concepto: "La señal sale de la necesidad de ayuda, no del nombre del problema.",
      },
      {
        kind: "escenario",
        titulo: "Escenario de práctica 3: un piloto automático inoperativo, otro funcionando",
        situacion: "El piloto automático 1 queda inoperativo; el 2 funciona. Usted va con Bogota Control.",
        preguntas: [
          {
            q: "¿Declara algo? ¿Qué transmite?",
            a: "PILOT: «BOGOTA CONTROL, AVIATORY 452, AUTOPILOT 1 INOPERATIVE, AUTOPILOT 2 AVAILABLE, NO ASSISTANCE REQUIRED.» **PLAIN LANGUAGE**. Ninguna señal: se informa porque puede afectar ciertas operaciones (por ejemplo, RVSM; ver cap. 39).",
          },
        ],
        concepto: "Informar sin señal es válido cuando no hay urgencia.",
      },
      {
        kind: "escenario",
        titulo: "Escenario de práctica 4: falla de motor en crucero en un bimotor",
        situacion: "En un bimotor, falla un motor en crucero y no puede mantener FL 370. Usted va en GIKOS, rumbo 040, con Bogota Control.",
        preguntas: [
          {
            q: "¿Qué transmite y de qué depende la señal?",
            a: "PILOT: «MAYDAY, MAYDAY, MAYDAY, BOGOTA CONTROL, AVIATORY 452, ENGINE FAILURE, UNABLE TO MAINTAIN FLIGHT LEVEL 370, DESCENDING TO FLIGHT LEVEL 250, REQUEST DIVERSION TO BOGOTA, POSITION GIKOS, HEADING 040.» Varios explotadores clasifican la falla de motor en bimotor como socorro; otros usan urgencia según el caso. Lo decide el SOP y el comandante. Lo que no cambia es que el ATC debe saber que usted no puede mantener el nivel y qué va a hacer.",
          },
        ],
        concepto: "El criterio final es del comandante, según SOP.",
      },
      ...ejemplo(
        "Ejemplo · El ATC pregunta el nivel de la emergencia (PLAIN LANGUAGE del ATC)",
        [`ATC:   "AVIATORY 452, CONFIRM YOU ARE DECLARING AN EMERGENCY?"`, `PILOT: "AFFIRM, MAYDAY, AVIATORY 452."`],
        "Significado: **PLAIN LANGUAGE** del ATC. Si su mensaje no dejó claro el nivel, el controlador preguntará. Conteste con la señal.",
      ),
      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "En cabina y en la entrevista",
        texto: "La decisión la toma el comandante con apoyo de las listas y del SOP. En entrevista de aerolínea suele preguntarse con casos: «pasajero enfermo», «humo», «falla de motor», «falla hidráulica». La respuesta que se espera no es solo «MAYDAY» o «PAN PAN», sino el criterio: necesidad de ayuda inmediata, prioridad o solo información.",
      },
      { kind: "sub", text: "Error frecuente" },
      error(
        "Elegir la señal por el nombre del problema",
        "Elegir la señal por el nombre del problema («motor = MAYDAY siempre») sin pensar en la necesidad.",
      ),
      error("Subestimar", "Subestimar: decir «minor problem» cuando la situación pide prioridad."),
      error("Sobrestimar", "Sobrestimar sin necesidad y saturar la frecuencia."),
      error("No actualizar al ATC", "No actualizar al ATC cuando la situación cambia de nivel."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "La diferencia es la necesidad de ayuda inmediata.",
          "Mismo orden de mensaje para ambas.",
          "Informar sin señal es válido cuando no hay urgencia.",
          "La situación puede subir o bajar de nivel; el ATC debe saberlo.",
          "El criterio final es del comandante, según SOP.",
        ],
      },
      fuentes(
        "Doc 4444 · Doc 9432 · Anexo 10",
        "Doc 4444 (15.ª ed., Enm. 4) cap. 1, definición «Fase de peligro» (como contraste de la clasificación ATS); 5.2.2. Doc 9432 (4.ª ed.) 2.6 (AFFIRM, UNABLE).",
        [
          "VERIFICAR: todas las filas de la tabla comparativa (definiciones, prioridades, señal, mensaje, silencio) contra Anexo 10 Vol. II cap. 5 y Doc 9432 cap. 9 (no cargados).",
          "VERIFICAR: que la clasificación de la falla de motor dependa del explotador, contra el manual de operaciones del explotador (no es norma OACI).",
        ],
      ),
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
