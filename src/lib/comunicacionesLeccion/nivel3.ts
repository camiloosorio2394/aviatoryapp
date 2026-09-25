/**
 * Nivel 3 · Autorizaciones y superficie (lecciones 12 a 18, capítulos 12 a 18 de la especificación).
 *
 * La autorización: cómo se colaciona, qué es y qué no es una autorización, y
 * el recorrido en tierra hasta el despegue, con la pista como el lugar donde un
 * malentendido cuesta más.
 *
 * Fuente: docs/comunicaciones/nivel-3.md, entero. Cada intercambio del
 * Markdown es un bloque `code` con su significado debajo; los que el Markdown
 * rotula como escenario de práctica y ponen a prueba una colación van como
 * `escenario`. Lo que el Markdown marca VERIFICAR sale en un callout
 * «Verificar» visible antes de la fraseología y, completo, en el detalle
 * técnico de FUENTES. El formato de los bloques y de los huecos está
 * documentado al inicio de index.ts.
 */

import type { DocBlockData, DocScreen } from "@/lib/docBlocks"

/**
 * Un intercambio: el título en negrita y, en orden, sus piezas. Un texto es un
 * párrafo en español; una lista de líneas es la transmisión literal, una línea
 * por turno de palabra.
 */
function entrada(titulo: string, ...partes: (string | string[])[]): DocBlockData[] {
  return [
    { kind: "p", text: `**${titulo}**` },
    ...partes.map((parte): DocBlockData =>
      typeof parte === "string" ? { kind: "p", text: parte } : { kind: "code", text: parte.join("\n") },
    ),
  ]
}

/** Un error frecuente, con la semántica de alerta. */
function error(text: string): DocBlockData {
  return { kind: "callout", tone: "warn", text }
}

/** Las fuentes del capítulo, plegadas: lo verificado y lo que falta verificar. */
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

/** Las convenciones de los ejemplos de todo el nivel (cabecera de nivel-3.md). */
const CONVENCIONES: DocBlockData = {
  kind: "list",
  items: [
    "**Sobre los ejemplos.** Son educativos. El distintivo es `AVIATORY 452` (y `AVIATORY 425` o `AVIATORY 542` cuando hace falta un distintivo parecido). Las estaciones se llaman «Bogota Delivery», «Bogota Ground», «Bogota Tower» y «Bogota Departure» solo como ambientación: las pistas, calles de rodaje, puestos, frecuencias, rutas y puntos (GIKOS y los demás) son **ficticios** y no describen el aeropuerto real.",
    "Cuando un ejemplo en inglés se adapta de uno del Doc 9432, se indica el párrafo; el original usa el distintivo FASTAIR 345 y otros nombres de lugar.",
    "Los números se escriben en cifras para leer más rápido; se pronuncian como enseña el capítulo 5 (Nivel 1).",
    "Fuentes cargadas para este nivel: Doc 4444 PANS-ATM (15.ª ed., Enm. 4, 2012) cap. 1 y 4; Doc 9432 Manual de radiotelefonía (4.ª ed., 2007) cap. 1 a 5 y 7.1. El Doc 4444 cargado **no es la edición vigente** (existe la 16.ª ed. de 2016 con enmiendas) y su capítulo 12 de fraseología no está cargado: por eso varias frases llevan VERIFICAR.",
  ],
}

export const NIVEL_3: DocScreen[] = [
  // ── 12 ──────────────────────────────────────────────────────────────────
  {
    n: 12,
    title: "Readback y hearback",
    kicker: "Lo que se colaciona y quién lo verifica",
    minutes: 18,
    blocks: [
      {
        kind: "p",
        text: "Antes de hablar de autorizaciones o movimientos en superficie, la tripulación debe cerrar el circuito de cada instrucción crítica. Escuchar, repetir y comprobar no son tres formalidades independientes: si se pierde una condición o responde otra aeronave, la colación debe permitir detectarlo antes de actuar. Esta lección explica cómo proteger esa secuencia sin inventar pistas, rutas ni autorizaciones locales.",
      },
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "**Readback (colación)**: la tripulación repite al controlador los elementos críticos de una autorización o instrucción que recibió. La palabra normalizada READ BACK pide repetir el mensaje, o la parte indicada, tal como se recibió (Manual de radiotelefonía de la Organización de Aviación Civil Internacional, OACI, International Civil Aviation Organization, Doc 9432, 2.6). La lista de elementos de seguridad está en el Doc 4444, 4.5.7.5.1, de la edición consultada; antes de usarla en vuelo se confirma la edición y publicación aplicables.",
      },
      {
        kind: "p",
        text: "**Hearback (verificación de la colación)**: el controlador escucha lo que repitió la tripulación, lo compara con lo transmitido y corrige de inmediato cualquier discrepancia (Doc 4444, 4.5.7.5.2; Doc 9432, 2.8.3.8). Es una función del controlador, no una frase que el piloto pronuncia. El nombre inglés es corriente en la industria; los textos de la OACI consultados describen la acción sin depender de ese nombre.",
      },
      {
        kind: "definicion",
        text: "Circuito cerrado: control de tránsito aéreo (ATC, air traffic control) transmite; el piloto colaciona con su distintivo; el controlador verifica; si hay discrepancia, la corrige y el piloto vuelve a colacionar. El silencio después de la primera colación no es una autorización nueva ni prueba absoluta de que alguien la oyó.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-12-01.svg",
        alt: "Circuito de cuatro pasos: control transmite, cabina colaciona con distintivo, control compara, y una discrepancia exige corrección y nueva colación.",
        ancho: 1600,
        alto: 900,
        pie: "La colación solo cierra el circuito si el controlador escucha y compara. Si corrige un dato, la tripulación lo repite otra vez antes de actuar. Amplía el diagrama para seguir el ciclo; no representa una autorización real.",
      },

      { kind: "sub", text: "Lo que debe saber un piloto" },
      { kind: "p", text: "**Qué se colaciona siempre.** La edición consultada del Doc 4444, 4.5.7.5.1, agrupa los elementos críticos así:" },
      {
        kind: "list",
        items: [
          "Autorizaciones de ruta del control de tránsito aéreo.",
          "Autorizaciones e instrucciones para entrar, aterrizar, despegar, mantenerse fuera, cruzar, rodar o retroceder en una pista.",
          "Pista en uso, reglajes de altímetro, códigos del radar secundario de vigilancia (SSR, secondary surveillance radar), niveles, rumbos, velocidades y niveles de transición; la disposición consultada también menciona los datos difundidos por el servicio automático de información terminal (ATIS, Automatic Terminal Information Service).",
        ],
      },
      { kind: "p", text: "En cabina, la verificación no se hace por el número de palabras repetidas sino por la información que permite detectar un cambio de instrucción. Esta tabla reúne los grupos de la edición consultada del Doc 4444, sin construir una autorización local:" },
      {
        kind: "table",
        head: ["Grupo", "Qué debe conservar la colación", "Qué se pierde si se omite"],
        rows: [
          [
            "Autorización de ruta",
            "El límite de autorización, los tramos e instrucciones efectivamente transmitidos y cualquier condición asociada.",
            "El controlador no puede comprobar si la tripulación entendió la ruta autorizada, y una salida publicada no reemplaza el texto realmente emitido.",
          ],
          [
            "Instrucción relativa a una pista",
            "La acción exacta —entrar, despegar, aterrizar, mantenerse fuera, cruzar, rodar o retroceder— y el identificador de pista recibido.",
            "Una autorización de rodaje puede confundirse con permiso para cruzar o entrar en pista; son decisiones diferentes.",
          ],
          [
            "Valores y restricciones",
            "Pista en uso, reglaje altimétrico, código SSR, nivel, rumbo, velocidad, nivel de transición y condiciones explícitas.",
            "Una cifra aparentemente menor puede cambiar la altitud indicada, el perfil, la separación o la identificación radar.",
          ],
        ],
      },
      { kind: "p", text: "Tres detalles:" },
      {
        kind: "list",
        items: [
          "El Doc 9432, 2.8.3.5 b), y la edición consultada del Doc 4444 no enumeran exactamente igual las acciones sobre una pista. No resuelvas una diferencia documental suponiendo que una frase es opcional: colaciona la instrucción relativa a pista y confirma la norma vigente de la jurisdicción.",
          "**Lo demás también requiere respuesta inteligible.** Las demás autorizaciones e instrucciones, incluidas las condicionales, se colacionan o se acusan de forma que quede claro que se entendieron y se cumplirán (Doc 4444, 4.5.7.5.1.1, edición consultada).",
          "**Enlace de datos.** La comunicación controlador-piloto por enlace de datos (CPDLC, Controller–Pilot Data Link Communications) sigue reglas distintas de la radiotelefonía. La edición consultada del Doc 4444, 4.5.7.5.2.1, no exige colación oral de sus mensajes salvo prescripción de la autoridad de servicios de tránsito aéreo (ATS, air traffic services). El Nivel 6 estudia sus respuestas y límites.",
        ],
      },
      { kind: "p", text: "**Cómo se colaciona.**" },
      {
        kind: "list",
        items: [
          "Termine la colación con su distintivo de llamada (Doc 9432, 2.8.3.7). Así el controlador sabe quién colacionó, y eso protege contra distintivos parecidos.",
          "Repita los valores y las condiciones que gobiernan cuándo o dónde actuar. Una condición como «hasta pasar» o «después de» no es decoración: omitirla convierte una autorización condicionada en una acción prematura. La frase concreta depende de lo que realmente transmitió control.",
          "ROGER no sirve como colación. ROGER significa «he recibido toda su transmisión anterior» y la OACI aclara que no se usa para responder cuando se exige colacionar o dar una respuesta directa AFFIRM o NEGATIVE (Doc 9432, 2.6).",
          "Cuando el controlador detecta una discrepancia, la corrige y solicita o espera una nueva colación; el Doc 9432, 2.8.3.9, ilustra la corrección con NEGATIVE e I SAY AGAIN. La tripulación no actúa sobre la cifra anterior mientras se aclara cuál es válida.",
        ],
      },
      {
        kind: "p",
        text: "**Por qué existe.** El grado de necesidad de colacionar está ligado a la posibilidad real de un malentendido, y la colación sirve además para comprobar que solo la aeronave a la que iba dirigida actúe según la autorización (Doc 9432, 2.8.3.4).",
      },
      {
        kind: "p",
        text: "**Hearback desde cabina.** La comparación formal corresponde al controlador, pero la tripulación también permanece en la frecuencia para oír una corrección y resolver cualquier duda. Si la transmisión quedó bloqueada, no hubo respuesta cuando era necesaria o la instrucción parece incompatible con la posición o autorización anterior, se solicita aclaración antes de ejecutar. Esta cautela operacional no convierte el silencio del controlador en una nueva autorización. La guía vigente de la Administración Federal de Aviación de Estados Unidos (FAA, Federal Aviation Administration), AIM 4-4-7, insiste en incluir el distintivo y colacionar valores, restricciones y pista para permitir la verificación mutua; sus ejemplos pertenecen al entorno estadounidense, no a un aeropuerto colombiano.",
      },

      { kind: "sub", text: "Cómo se verifica sin inventar una autorización" },
      {
        kind: "p",
        text: "**Escuche la instrucción completa.** Antes de transmitir, el piloto que monitorea identifica destinatario, acción, límite, valores y condiciones. El otro piloto comprueba qué se seleccionará o anotará. Si la instrucción altera lo esperado, esa diferencia se discute en cabina, no se borra mentalmente para acomodarla al plan.",
      },
      {
        kind: "p",
        text: "**Colacione lo que recibió, no lo que esperaba.** Una autorización de ruta no se reduce al destino; una instrucción que toca una pista no se reduce a «rodar»; y un nivel condicionado no autoriza a iniciar un descenso antes de que se cumpla la condición. En cada caso se repite lo exigido por la regla aplicable con el distintivo propio. Así el controlador puede detectar una pista, valor o restricción distintos de los que emitió.",
      },
      {
        kind: "p",
        text: "**Espere la corrección y resuelva discrepancias.** El Doc 9432, 2.8.3.8–2.8.3.9, presenta la responsabilidad del controlador de escuchar la colación y corregir si no coincide. No se publica aquí un intercambio «Bogotá–Cali» con ruta, punto, pista o código fabricados: una transmisión que parece real debe salir de una grabación o publicación auténtica y comprobada, no de una composición editorial.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-12-02.svg",
        alt: "Comparación entre colación íntegra y colación incompleta: se conservan destinatario, acción, valor y condición; omitir la condición cambia cuándo es segura la acción.",
        ancho: 1600,
        alto: 900,
        pie: "Antes de mover la aeronave o ajustar un selector, verifica que la colación preserve la condición y el identificador. La matriz es una herramienta didáctica: no muestra una autorización ATC real ni reemplaza la fraseología vigente.",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Aplicación local y edición vigente",
        text: "La lista detallada citada procede de una edición consultada del Doc 4444, no se presenta como actualización automática de todas las jurisdicciones. Antes de enseñar una frase concreta de salida, pista o frecuencia en Colombia, contrástala con el Doc 4444 vigente, la publicación de información aeronáutica (AIP, Aeronautical Information Publication) de Aerocivil y el procedimiento del operador. La colación oral de datos difundidos por ATIS también depende del procedimiento local.",
      },

      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Quién colaciona y qué se colaciona",
        texto:
          "En una cabina de dos pilotos, el piloto que monitorea (PM, pilot monitoring) normalmente maneja la radio mientras el piloto que vuela (PF, pilot flying) también escucha y comprueba la instrucción que afecta a la trayectoria. Ambos contrastan nivel, rumbo, velocidad, pista y código con lo seleccionado o anotado. El reparto exacto y los llamados cruzados dependen de los procedimientos operacionales estándar (SOP, standard operating procedures) del explotador. Una defensa útil es anotar o seleccionar el dato realmente oído y comprobarlo antes de transmitir, sin colacionar desde el recuerdo de lo que se esperaba escuchar.",
      },

      { kind: "sub", text: "Error frecuente" },
      error("Responder ROGER o WILCO a una instrucción relativa a pista, nivel o rumbo que requiere colación: ninguna de esas palabras permite comparar el dato crítico."),
      error("Colacionar el valor esperado en vez del oído: la tripulación quizá cambie el altímetro, el nivel o la pista a algo que control nunca transmitió."),
      error("Omitir una condición temporal o espacial; la acción puede ejecutarse antes del punto autorizado."),
      error("Omitir el distintivo propio: con dos aeronaves de llamadas similares, el controlador pierde una defensa para saber quién respondió."),
      error("Pasar a la siguiente tarea inmediatamente después de colacionar e ignorar una corrección posterior."),

      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Readback: la tripulación repite lo crítico. Hearback: el controlador verifica esa repetición.",
          "La edición consultada del Doc 4444 exige colación de ruta, instrucciones relativas a pista y valores como reglaje, código SSR, nivel, rumbo y velocidad; confirma la edición local vigente.",
          "Lo demás se colaciona o se acusa de forma que se vea que se entendió y se cumplirá.",
          "ROGER no es colación.",
          "Si control corrige una discrepancia, escucha la versión válida y vuelve a colacionarla antes de actuar.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432 · FAA AIM 4-4-7",
        bloques: [
          { kind: "sub", text: "Base contrastada" },
          { kind: "p", text: "Doc 4444, 15.ª edición con Enmienda 4, apartados 4.5.7.5.1–4.5.7.5.2.1 (edición histórica consultada); Doc 9432, 4.ª edición, apartados 2.6 y 2.8.3.4–2.8.3.9. Guía de la FAA, Aeronautical Information Manual, 4-4-7, para responsabilidad del piloto en la colación, inclusión del distintivo y repetición de pista, altitudes y restricciones. Esta guía es estadounidense; no sustituye el procedimiento colombiano." },
          { kind: "sub", text: "Pendiente antes de uso operacional" },
          { kind: "list", items: [
            "Confirmar la lista de colación y cualquier cambio de redacción en la edición vigente del Doc 4444 y en las disposiciones del Estado de operación.",
            "Comprobar en la AIP vigente de Aerocivil y el procedimiento del operador cómo se transmite o confirma cada dato de ATIS, sin inventar frases o frecuencias.",
            "Para ejemplos concretos de rutas, salidas, cruces o pistas colombianas, usar únicamente una carta vigente y una transmisión auténtica verificada; esta lección no las incluye.",
          ] },
        ],
      },
    ],
  },

  // ── 13 ──────────────────────────────────────────────────────────────────
  {
    n: 13,
    title: "Qué es una autorización ATC",
    kicker: "Autorización, instrucción, información y solicitud",
    minutes: 16,
    blocks: [
      {
        kind: "p",
        text: "Una tripulación de aerolínea no decide por la palabra aislada que oyó en frecuencia. Antes de mover el avión o cambiar su trayectoria identifica el destinatario, la acción, el límite y las condiciones que siguen vigentes. Esta lección separa autorización, instrucción, información y solicitud, y muestra qué hacer cuando una autorización cambia o no puede cumplirse. Las situaciones descritas son didácticas, no transcripciones de vuelos reales.",
      },
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "Una **autorización del control de tránsito aéreo** (ATC, air traffic control; en inglés, ATC clearance) permite que una aeronave proceda en las condiciones especificadas por una dependencia de control. El término puede calificarse según la fase: autorización de rodaje, despegue, salida, ruta, aproximación o aterrizaje. No es una licencia genérica para hacer cualquier cosa durante esa fase (Doc 4444, capítulo 1, y Doc 9432, 1.1, ediciones consultadas).",
      },
      {
        kind: "p",
        text: "En una misma frecuencia se mezclan mensajes con efectos distintos. La pregunta útil no es solo «¿qué palabra usó el controlador?», sino «¿qué acción concreta quedó autorizada, ordenada o todavía pendiente?». Las respuestas de la tabla no reemplazan los requisitos de colación de la lección 12.",
      },
      {
        kind: "table",
        head: ["Mensaje", "Efecto operacional", "Respuesta de la tripulación"],
        rows: [
          ["**Autorización** (clearance)", "Permite proceder dentro de condiciones y límites expresos; puede contener restricciones.", "Escucha completa, colación de los elementos exigidos y comprobación de que se puede cumplir antes de actuar."],
          ["**Instrucción** (instruction)", "Ordena una medida específica: mantener posición, virar, cambiar nivel o contactar otra dependencia, por ejemplo.", "Colación cuando el dato o la acción lo exigen; en otros casos, acuse inequívoco conforme a la regla aplicable. Una instrucción también puede ser crítica."],
          ["**Información** (information)", "Aporta datos para decidir, como tránsito, meteorología o una condición de superficie; por sí sola no concede un movimiento nuevo.", "Acusa recibo o responde según corresponda y adapta la operación. No interpreta el dato como un permiso implícito."],
          ["**Solicitud** (request)", "Propone una acción o pide una autorización; la transmisión de la solicitud no la concede.", "Espera una respuesta inequívoca antes de la acción solicitada y confirma sus condiciones."],
        ],
      },
      {
        kind: "p",
        text: "La diferencia entre autorización e instrucción no permite reducir una orden de seguridad a un simple ROGER. Una instrucción para mantenerse fuera de una pista, un nivel o un rumbo exige la colación que corresponda a su contenido. A la inversa, el aviso de tránsito puede exigir un cambio de plan de la tripulación, pero no autoriza por sí mismo a invadir una pista ni a abandonar una restricción.",
      },
      { kind: "sub", text: "Las palabras no sustituyen las condiciones" },
      {
        kind: "kv",
        items: [
          { k: "CLEARED", v: "Autorizado a proceder en las condiciones indicadas; el límite y las restricciones importan tanto como la acción." },
          { k: "APPROVED", v: "Aprobación de la medida propuesta, no de otras medidas que la tripulación no solicitó." },
          { k: "RECLEARED", v: "La nueva autorización invalida la anterior o la parte que modifica. Hay que identificar exactamente qué cambió." },
          { k: "STANDBY", v: "Espere y le llamaré. **No es aprobación ni denegación** de lo solicitado." },
          { k: "UNABLE", v: "No puedo cumplir la solicitud, instrucción o autorización; comunique el motivo útil para que control pueda considerar una alternativa." },
        ],
      },
      {
        kind: "p",
        text: "Estas acepciones proceden del Manual de radiotelefonía de la Organización de Aviación Civil Internacional (OACI, International Civil Aviation Organization), Doc 9432, 2.6, en la edición consultada. Por ejemplo, una tripulación que solicita retroceso y recibe STANDBY permanece detenida: ni la solicitud ni la espera son una autorización de movimiento. Si control después aprueba solo el retroceso, esa respuesta no concede por sí sola rodaje ni entrada a una pista.",
      },
      { kind: "sub", text: "Qué cubre una autorización y qué no" },
      {
        kind: "p",
        text: "El Doc 4444, 4.5.1.3, de la edición consultada limita el alcance de una autorización a las consideraciones de tránsito conocido para el control. No exime al piloto al mando de respetar las reglas aplicables ni de operar con seguridad. Antes de aceptarla, la tripulación contrasta la trayectoria o el movimiento con las limitaciones del avión, el desempeño, el terreno, la meteorología y las instrucciones que ya tiene. Si no puede cumplir, lo comunica; no intenta «alcanzar» después una restricción imposible.",
      },
      {
        kind: "p",
        text: "Una autorización de ruta tampoco autoriza a poner el avión en movimiento, entrar a una pista, despegar o aterrizar por inferencia. Cada permiso tiene su alcance. Una modificación posterior puede sustituir solo una parte: si cambia el límite de rodaje, no se conservan de memoria el límite anterior y el nuevo a la vez. El piloto que monitorea identifica el segmento reemplazado, conserva las condiciones no modificadas y confronta esa lectura con el piloto que opera.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-13-01.svg",
        alt: "Árbol de decisión: identificar destinatario; pedir repetición si el mensaje está incompleto, confirmar si hay duda, decir unable si no puede cumplirse, o colacionar, verificar y actuar solo dentro de lo autorizado.",
        ancho: 1200,
        alto: 1500,
        pie: "Primero entiende y verifica; luego actúa dentro de lo autorizado. SAY AGAIN pide repetir, CONFIRM aclara un dato y UNABLE comunica que no puede cumplir. STANDBY no concede permiso. Amplía el diagrama para seguir cada salida.",
      },
      { kind: "sub", text: "De la transmisión a la acción: secuencia de cabina" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Escuchar sin completar huecos.** Verifique que el distintivo es el propio. Anote acción, valor, límite y condición; no rellene con lo que esperaba del plan o de la pantalla.",
          "**Resolver la incertidumbre antes de actuar.** Si perdió parte del mensaje, pida SAY AGAIN de ese tramo. Si oyó las palabras pero duda de un valor, use CONFIRM para pedir verificación. No colacione como cierto un dato que aún cuestiona.",
          "**Evaluar cumplimiento.** Compare la instrucción con desempeño, situación de la aeronave, terreno, meteorología y procedimiento del operador. Si no puede cumplir, diga UNABLE y un motivo breve y relevante; solicite o espere una alternativa clara.",
          "**Colacionar y contrastar.** Repita los elementos que la regla aplicable exige con su distintivo. La tripulación compara la colación con lo anotado y atiende cualquier corrección del controlador; una corrección exige nueva colación del dato corregido.",
          "**Configurar, verificar y ejecutar.** Solo después de entender el alcance, coordinar en cabina y resolver discrepancias se seleccionan valores y se actúa. La colación no amplía la autorización ni convierte una solicitud en permiso.",
        ],
      },
      {
        kind: "p",
        text: "Pedir una autorización enmendada no es discutir con control. El Doc 4444, 4.5.1.2, de la edición consultada permite solicitar un cambio cuando la autorización recibida no es conveniente; el controlador puede no conceder lo pedido y, cuando corresponda, ofrecer otra opción. La tripulación debe saber cuál es la autorización vigente mientras espera: una solicitud pendiente no borra automáticamente lo ya autorizado, pero tampoco justifica continuar una acción que no es segura.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-13-02.webp",
        alt: "Historieta de cuatro viñetas: el controlador transmite desde la torre, la tripulación anota, detecta que no puede cumplir y verifica en cabina una alternativa antes de actuar.",
        ancho: 1536,
        alto: 1024,
        pie: "Situación didáctica, no una transcripción: 1) el controlador transmite; 2) la tripulación anota y coteja; 3) detecta una limitación y comunica UNABLE, sin mover el avión; 4) verifica la alternativa recibida antes de configurar. Amplía la historieta para distinguir el papel de cada persona.",
      },
      { kind: "sub", text: "Caso de entrenamiento: cambio inesperado antes de salir" },
      {
        kind: "p",
        text: "La tripulación ha preparado una salida conforme a su documentación. Antes de abandonar el puesto recibe una autorización distinta de la esperada. El piloto que monitorea no limita su colación a «autorizado»: registra el nuevo límite y las restricciones; el otro compara lo anotado con la preparación y con el desempeño disponible. Si un nivel o una condición no puede cumplirse, lo dice antes de aceptar el cambio. Mientras llega otra autorización, ambos mantienen el avión detenido y la autorización anterior identificada; no comienzan un retroceso ni cambian un selector por anticipación.",
      },
      {
        kind: "p",
        text: "Cuando control aclara o enmienda la autorización, los pilotos indican qué parte quedó sustituida y vuelven a cotejar el plan, el sistema de gestión de vuelo y las listas del operador. Si el mensaje incluyera una instrucción de superficie, distinguen la autorización de rodaje de cualquier permiso futuro para entrar o cruzar una pista. El ejemplo no atribuye un vuelo, una ruta, una pista o una frecuencia a un aeropuerto real: esos datos solo deben enseñarse a partir de una publicación vigente o una transmisión auténtica comprobada.",
      },
      {
        kind: "enLaOperacion",
        momento: "Una autorización que no era la esperada",
        texto: "En una cabina de dos pilotos, el que recibe la autorización registra su límite y restricciones; el otro compara con la preparación. Si hay duda, se pide repetición o confirmación **antes** de colacionar el dato como cierto. Si hay una imposibilidad, se comunica UNABLE y el motivo útil. La tripulación coordina la alternativa conforme a sus procedimientos normales antes de seleccionar o mover el avión; una frecuencia ocupada no convierte una suposición en autorización.",
      },
      { kind: "sub", text: "Errores que cambian el resultado" },
      error("Empezar un movimiento tras STANDBY o tras transmitir una solicitud todavía no aprobada."),
      error("Tratar información de tránsito o meteorología como si concediera un nuevo permiso."),
      error("Colacionar un valor dudoso para «salir del paso» y pedir confirmación solo después de seleccionarlo."),
      error("Aceptar una restricción que el avión no puede cumplir y avisar cuando ya no hay margen."),
      error("Seguir hacia el límite anterior después de una modificación de la autorización."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Autorización: permiso con límites. Instrucción: medida exigida. Información: dato para decidir. Solicitud: aún no es permiso.",
          "STANDBY no aprueba; RECLEARED obliga a identificar qué parte fue reemplazada.",
          "Si falta mensaje: SAY AGAIN. Si un dato es dudoso: CONFIRM. Si no puede cumplir: UNABLE y motivo relevante.",
          "La tripulación colaciona lo exigido, coteja el cambio y solo actúa dentro de lo autorizado y de lo que puede cumplir.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "OACI Doc 4444 · Doc 9432 · FAA AIM 4-4",
        bloques: [
          { kind: "sub", text: "Base consultada" },
          { kind: "p", text: "Doc 4444, 15.ª edición con Enmienda 4, capítulo 1 y apartados 4.5.1.2–4.5.1.3, 4.5.7.4.2 y 4.5.7.5 (edición histórica consultada); Doc 9432, 4.ª edición, apartados 1.1, 2.6 y 2.8.3. Como contraste, la guía estadounidense vigente FAA Aeronautical Information Manual, sección 4-4, explica alcance de autorizaciones y responsabilidad del piloto; no sustituye reglas colombianas." },
          { kind: "sub", text: "Antes del uso operacional" },
          { kind: "list", items: [
            "Confirmar fraseología y obligaciones de colación en las ediciones vigentes de OACI, el Estado y el operador.",
            "Para un ejemplo localizado en Colombia, verificar previamente la publicación de información aeronáutica (AIP, Aeronautical Information Publication) vigente de Aerocivil y, si se presenta como diálogo real, la transmisión auténtica.",
            "La historieta y el caso son didácticos: no representan una autorización, aeropuerto, ruta ni vuelo real.",
          ] },
        ],
      },
    ],
  },
  // ── 14 ──────────────────────────────────────────────────────────────────
  {
    n: 14,
    title: "La autorización IFR",
    kicker: "Sus componentes y cómo copiarla",
    minutes: 18,
    blocks: [
      {
        kind: "p",
        text: "La autorización para un vuelo bajo las reglas de vuelo por instrumentos (IFR, Instrument Flight Rules) no es una frase que se repite de memoria. Es el punto de partida del recorrido autorizado: límite, ruta, salida y niveles, más cualquier restricción o dato adicional transmitido. Para una tripulación de aerolínea, el trabajo no termina al colacionarla; ambos pilotos deben confrontarla con el plan, el desempeño y la preparación de la salida antes de moverse.",
      },
      { kind: "sub", text: "Qué recibe realmente la tripulación" },
      {
        kind: "p",
        text: "La autorización de ruta puede ser extensa o abreviada según el procedimiento aplicable y lo que control necesite modificar. El Manual de radiotelefonía de la Organización de Aviación Civil Internacional (OACI, International Civil Aviation Organization), Doc 9432, 2.8.3.1, muestra esa variación. El límite de autorización no siempre coincide con el destino: puede ser un punto intermedio. Si lo es, la tripulación identifica dónde termina el permiso actual y no presupone que puede continuar por el resto del plan presentado.",
      },
      {
        kind: "table",
        head: ["Componente", "Qué registrar", "Qué verificar antes de aceptar"],
        rows: [
          ["Límite", "Aeródromo, punto significativo o límite indicado por control.", "No confundir el destino del plan con el último punto hasta el cual se autorizó."],
          ["Ruta y salida", "Trayecto autorizado, salida normalizada si se asigna, transición y cualquier cambio explícito.", "Comparar con la ruta efectivamente presentada y la publicación vigente; no usar una salida solo porque estaba preparada."],
          ["Nivel y restricciones", "Nivel o altitud asignados, condición de ascenso y restricciones expresas.", "Separar lo asignado de lo solicitado o previsto; evaluar si el avión puede cumplir cada restricción."],
          ["Datos adicionales", "Código del radar secundario de vigilancia (SSR, secondary surveillance radar), dependencia o frecuencia y otras instrucciones, solo si se transmiten.", "Cotejar exactamente lo recibido. No completar un dato ausente con una cifra recordada o una plantilla."],
        ],
      },
      {
        kind: "p",
        text: "Una salida normalizada por instrumentos (SID, Standard Instrument Departure) no es solo un nombre en la hoja de copiado: su designación, transición y restricciones deben coincidir con la autorización y con la publicación aplicable. Si el control de tránsito aéreo (ATC, air traffic control) cambia el procedimiento o la ruta, los pilotos verifican que el sistema de gestión de vuelo (FMS, Flight Management System) y el briefing representen la nueva autorización. Si la documentación vigente no está disponible o hay una discrepancia, no se inventa una equivalencia entre nombres parecidos.",
      },
      {
        kind: "p",
        text: "**Un nivel previsto no es un nivel autorizado.** La guía de la Administración Federal de Aviación de Estados Unidos (FAA, Federal Aviation Administration), Aeronautical Information Manual, 5-2-6, advierte que «as filed» no incorpora por sí sola el nivel en ruta presentado en el plan: el nivel autorizado se comunica aparte o se indica cuándo esperarlo. Es una regla estadounidense citada para enseñar la distinción, no un procedimiento colombiano. En la cabina, una expectativa de ascenso sirve para planificar, pero no habilita a abandonar el nivel inicial asignado.",
      },
      {
        kind: "p",
        text: "El Doc 9432, 2.8.3.2–2.8.3.3, de la edición consultada recomienda transmitir la autorización con tiempo para copiarla y no durante la alineación o el despegue; además distingue una autorización de ruta del permiso para entrar en una pista o despegar. Por eso se prepara la hoja antes de llamar, se copia sin improvisar y se resuelven dudas antes de que la carga de trabajo crezca en superficie.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-14-01.svg",
        alt: "Hoja de copiado de autorización IFR sin datos inventados: límite, ruta y salida, nivel y restricciones, datos adicionales; al lado, preguntas de verificación de los dos pilotos.",
        ancho: 1600,
        alto: 1100,
        pie: "Esta plantilla didáctica no es un formato obligatorio ni contiene una autorización real. Registra solo lo que ATC transmitió y deja visible lo pendiente; después comprueba límite, ruta, nivel y restricciones con el otro piloto antes de configurar o moverte. Amplíala para leer las preguntas de cada casilla.",
      },
      { kind: "sub", text: "Cómo copiar, colacionar y verificar" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Preparar la recepción.** Antes de llamar, disponga de un medio de anotación y la documentación de vuelo vigente. Ambos pilotos conocen la ruta presentada y las limitaciones relevantes, pero no la confunden con la futura autorización.",
          "**Escuchar y escribir la transmisión completa.** El piloto que atiende la radio anota límite, ruta, salida, nivel y restricciones en el orden real en que llegan. Añade frecuencia o código solo cuando se transmiten. Una casilla vacía indica «no anotado», no «usar lo esperado».",
          "**Aclarar antes de colacionar como cierto.** Si se perdió un tramo, pida repetición. Si oyó un dato pero no está seguro, confirme ese dato. No improvise una designación o cifra para ver si el controlador la corrige.",
          "**Colacionar los elementos exigidos con el distintivo propio.** La autorización de ruta requiere colación según el Doc 4444, 4.5.7.5.1, de la edición consultada. El controlador compara esa lectura; cualquier corrección se registra y se vuelve a colacionar. La guía local vigente y los procedimientos del operador determinan la aplicación concreta.",
          "**Verificar como tripulación.** El segundo piloto compara lo anotado con la ruta presentada y la publicación vigente; juntos revisan cambios en salida, transición, nivel inicial y restricciones, además de la capacidad de cumplir. La configuración del FMS y del panel se coteja con la autorización, no al revés.",
          "**Conservar el límite del permiso.** Si la autorización termina antes del destino, se planifica cómo obtener la siguiente sin tratar el tramo restante del plan como autorizado. Si llega una enmienda, se identifica qué parte reemplaza y qué condiciones permanecen.",
        ],
      },
      {
        kind: "p",
        text: "La mnemotecnia CRAFT (clearance limit, route, altitude, frequency, transponder) puede servir como ayuda de copiado, pero no es una lista normativa OACI ni garantiza que contenga toda la autorización. Una restricción de cruce, una condición temporal o una modificación de salida no deben desaparecer porque no encajan en cinco letras. Tampoco debe convertirse en una excusa para atribuir frecuencia y código a toda autorización.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-14-02.webp",
        alt: "Historieta de cuatro viñetas: control transmite desde la torre, un piloto copia la autorización, ambos comparan con el plan y se pide aclaración antes de la salida.",
        ancho: 1536,
        alto: 1024,
        pie: "Secuencia didáctica, no transcripción real: 1) control transmite; 2) un piloto anota; 3) ambos detectan una diferencia frente a lo preparado; 4) piden aclaración antes de seleccionar valores o mover el avión. Los papeles están deliberadamente en blanco: no representan una carta, ruta, nivel o frecuencia vigentes. Amplía la historieta.",
      },
      { kind: "sub", text: "Caso de lectura documental: «as filed»" },
      {
        kind: "p",
        text: "El FAA AIM vigente, 5-2-6, describe una autorización abreviada que remite a la ruta presentada. La publicación aclara que esa fórmula no añade automáticamente el nivel en ruta presentado. La decisión de cabina es concreta: registrar por separado el nivel asignado o la condición que indica cuándo se espera otro, y no programar un ascenso al crucero solo porque ese valor figura en el plan. Se trata de un ejemplo documental estadounidense, no de una grabación ATC ni de una autorización colombiana.",
      },
      {
        kind: "p",
        text: "Otro control útil surge cuando la ruta presentada cambió antes de la salida. La misma publicación estadounidense indica que, en ese supuesto, no se debe aceptar mecánicamente una autorización abreviada como si la ruta siguiera igual; se comunica la modificación y se solicita una autorización de ruta completa. La enseñanza transferible es detectar cuál versión del plan conocen la tripulación y control. La fraseología exacta, los requisitos y la publicación aplicable en Colombia se verifican por separado en Aerocivil y el procedimiento del operador.",
      },
      {
        kind: "enLaOperacion",
        momento: "Antes de solicitar puesta en marcha",
        texto: "El piloto que copió la autorización lee su límite, ruta, salida, nivel y restricciones; el otro los confronta con la documentación y el FMS. Si una diferencia modifica el desempeño o la trayectoria, se actualizan briefing y configuración de acuerdo con el procedimiento del operador. Si algo no se entiende o no se puede cumplir, se resuelve con ATC antes de usarlo como base para el movimiento. Una autorización de ruta no concede por sí misma retroceso, rodaje, entrada en pista ni despegue.",
      },
      { kind: "sub", text: "Errores que cambian la salida" },
      error("Programar el nivel de crucero solicitado como si fuera el nivel inicial autorizado."),
      error("Cargar la salida del briefing sin confirmar que coincide con la autorización y la publicación vigente."),
      error("Colacionar de memoria, ocultando una cifra o condición que se anotó mal."),
      error("Rellenar una casilla vacía con el plan presentado en vez de confirmar qué transmitió control."),
      error("Tratar la autorización IFR de ruta como permiso para mover el avión o ingresar a la pista."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Copia el límite, la ruta/salida, el nivel y las restricciones; añade otros datos solo si se transmiten.",
          "El nivel previsto y el solicitado no reemplazan al nivel asignado.",
          "Colaciona lo exigido, registra correcciones y contrasta la autorización con documentación y FMS.",
          "CRAFT es una ayuda de memoria, no norma OACI ni lista exhaustiva.",
          "La autorización de ruta no concede retroceso, rodaje, entrada en pista ni despegue.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "OACI Doc 4444 · Doc 9432 · FAA AIM 5-2-6",
        bloques: [
          { kind: "sub", text: "Base consultada" },
          { kind: "p", text: "Doc 4444, 15.ª edición con Enmienda 4, apartados 4.5.3.1, 4.5.4.2 y 4.5.7.1–4.5.7.5 (edición histórica consultada); Doc 9432, 4.ª edición, apartados 2.8.3.1–2.8.3.3. Como contraste, FAA Aeronautical Information Manual vigente, sección 5-2-6 (https://www.faa.gov/air_traffic/publications/aim_html/chap5_section_2.html), sobre autorización abreviada, ruta presentada y nivel; es guía estadounidense, no regla colombiana." },
          { kind: "sub", text: "Antes de uso operacional" },
          { kind: "list", items: [
            "Confirmar los componentes y la fraseología en las ediciones vigentes de los documentos OACI y en los procedimientos del Estado y del operador.",
            "Para cualquier salida, ruta, nivel, frecuencia, código o carta de un aeródromo colombiano, usar exclusivamente la publicación de información aeronáutica (AIP, Aeronautical Information Publication) vigente de Aerocivil y la autorización efectivamente recibida.",
            "La hoja y la historieta son didácticas; ningún papel ilustrado es una carta ni una transcripción. No se ha atribuido una autorización concreta a un vuelo real.",
          ] },
        ],
      },
    ],
  },
  // ── 15 ──────────────────────────────────────────────────────────────────
  {
    n: 15,
    title: "Puesta en marcha y pushback",
    kicker: "Start-up, pushback y sus restricciones",
    minutes: 18,
    blocks: [
      {
        kind: "p",
        text: "La salida del puesto no comienza cuando se recibe la autorización de ruta. La puesta en marcha, el empuje y el rodaje son decisiones y coordinaciones diferentes. Antes de encender motores o mover la aeronave, la tripulación debe saber quién gestiona cada paso en ese aeropuerto, qué respuesta recibió exactamente y si el personal de tierra puede ejecutar la maniobra con seguridad. Una frase de planificación, una aprobación y una orden de esperar no son equivalentes.",
      },
      { kind: "sub", text: "Dos permisos y una coordinación física" },
      {
        kind: "p",
        text: "La solicitud de puesta en marcha puede incluir el puesto y el acuse del servicio automático de información terminal (ATIS, Automatic Terminal Information Service), si existe. La solicitud de empuje identifica la posición de la aeronave. La dependencia que atiende cada llamada puede ser control de tránsito aéreo (ATC, air traffic control) o gestión de plataforma, según el aeródromo; no se deduce de una historieta ni se reutiliza de otro aeropuerto. La aprobación de encendido no constituye por sí sola aprobación de empuje, y la aprobación de empuje tampoco reemplaza la coordinación por interfono con el equipo que conduce el tractor.",
      },
      {
        kind: "table",
        head: ["Lo que se recibió", "Lectura operacional", "Decisión de la tripulación"],
        rows: [
          ["START-UP APPROVED", "Puesta en marcha aprobada, sujeta a la coordinación segura con el personal de tierra.", "Confirmar condiciones y secuencia de encendido del operador. No inferir permiso de empuje."],
          ["START-UP AT (time)", "Hora asignada para comenzar; no significa «ahora».", "Registrar la hora recibida y aclarar cualquier discrepancia temporal."],
          ["EXPECT START-UP AT (time)", "Hora prevista, no aprobación de puesta en marcha.", "Esperar la autorización posterior o consultar si no llega; no iniciar solo por alcanzar la hora prevista."],
          ["START-UP AT OWN DISCRETION", "La elección del momento de encender queda a la tripulación dentro de las condiciones aplicables.", "Coordinar la secuencia con tierra y el procedimiento del operador; no inferir permiso de movimiento."],
          ["PUSHBACK APPROVED", "Empuje aprobado por la dependencia competente.", "Antes de mover, confirmar equipo, área, frenos e interfono según el procedimiento local."],
          ["STAND BY o EXPECT (number) MINUTES DELAY", "Espera o demora prevista; no autoriza movimiento.", "Permanecer en posición y mantener la comunicación pertinente."],
        ],
      },
      {
        kind: "p",
        text: "Las expresiones de la tabla aparecen en la fraseología publicada por la Agencia de la Unión Europea para la Seguridad Aérea (EASA, European Union Aviation Safety Agency), en el apéndice de medios aceptables de cumplimiento (AMC, Acceptable Means of Compliance) de las Reglas Europeas Estandarizadas del Aire (SERA, Standardised European Rules of the Air), apartados 1.4.3 y 1.4.4, revisión de agosto de 2025. Son una referencia documental para reconocer el cambio de estado, no una instrucción para operar en Colombia. Aquí, quién emite la aprobación, a quién se llama y qué dirección de empuje procede se confirma en la publicación local y en los procedimientos operacionales normalizados (SOP, standard operating procedures) del operador.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-15-01.webp",
        alt: "Historieta de cuatro viñetas: la cabina solicita, control de plataforma responde, el avión espera estacionado y el jefe de empuje coordina por interfono con la tripulación.",
        ancho: 1536,
        alto: 1024,
        pie: "Secuencia didáctica, no transcripción real ni aeropuerto identificado: 1) la cabina confirma que está lista para solicitar; 2) escucha la respuesta de la dependencia competente; 3) con una espera o demora prevista, avión y tractor permanecen detenidos; 4) con la aprobación aplicable, el equipo de empuje coordina frenos y zona despejada antes de mover. La imagen no sustituye la autorización ni el procedimiento del operador. Amplíala para distinguir a los interlocutores.",
      },
      { kind: "sub", text: "Del puesto al fin del empuje" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Preparación en cabina.** Verificar autorización de ruta, información de salida y configuración pertinente antes de elevar la carga de trabajo. Confirmar con tierra que el personal y los equipos están listos para la puesta en marcha prevista.",
          "**Contacto con la dependencia correcta.** Consultar la publicación de información aeronáutica (AIP, Aeronautical Information Publication) vigente del aeródromo y el briefing del operador para saber quién gestiona el encendido y el empuje. Transmitir posición y acuse ATIS cuando correspondan, sin inventar una frecuencia o un puesto de ejemplo.",
          "**Identificar el estado recibido.** Anotar si hay aprobación inmediata, hora asignada, hora solo prevista, discreción o espera. Ante una condición que no se entendió, pedir aclaración antes de encender o mover.",
          "**Separar autorización de ejecución.** Aun con aprobación de empuje, confirmar con el equipo de tierra el área, el tractor, la secuencia de frenos y el inicio real de la maniobra. El conductor y la tripulación deben identificar sin ambigüedad quién habla por el interfono.",
          "**Mantener la opción de detener.** Si aparece tráfico, se pierde la comunicación o surge una duda sobre la trayectoria, detener o no iniciar y resolverla con los interlocutores pertinentes. El procedimiento del operador gobierna las acciones concretas de frenos y motor.",
          "**Cerrar la maniobra.** Tras completar el empuje, confirmar frenos puestos, desconexión del equipo y señal visual de libre según el procedimiento aplicable. Solo entonces preparar el rodaje; su autorización es un paso distinto.",
        ],
      },
      { kind: "sub", text: "Las tres comunicaciones no se mezclan" },
      {
        kind: "table",
        head: ["Canal", "Para qué sirve", "Lo que no reemplaza"],
        rows: [
          ["Cabina con ATC o plataforma", "Gestionar aprobación de encendido, empuje o demora de acuerdo con la competencia local.", "No confirma por sí sola que tractor, personal y espacio estén listos."],
          ["Cabina con equipo de tierra", "Confirmar preparación, frenos, inicio, interrupción y final de la maniobra por interfono o señal definida.", "No crea una aprobación de la dependencia que la exige."],
          ["Cabina entre pilotos", "Verificar qué se recibió, repartir tareas, vigilar el entorno y actualizar el plan si cambia el estado.", "No convierte una expectativa o un STAND BY en permiso."],
        ],
      },
      {
        kind: "p",
        text: "La fraseología europea publicada separa explícitamente las expresiones de aeronave con ATC de las de personal de tierra con cabina. En esta última interacción figuran la confirmación de frenos liberados, el aviso de inicio de empuje, la confirmación de frenos puestos, la desconexión y una señal visual final. No se debe representar al controlador dando esas órdenes internas al tractor ni asumir que su aprobación garantiza que el área está físicamente libre.",
      },
      { kind: "sub", text: "Caso de lectura documental: una espera no es un permiso" },
      {
        kind: "p",
        text: "En la lista de fraseología de EASA, el apartado 1.4.4 distingue la aprobación de empuje de STAND BY y de la información de demora prevista. Esa separación importa en una rampa congestionada: si la tripulación esperaba comenzar, la respuesta de espera cambia la decisión a permanecer inmóvil. El piloto que atiende la radio comunica el estado al otro piloto y al equipo de tierra; cuando cambie la situación, se requiere la indicación aplicable antes de iniciar. Este análisis de un documento no pretende reproducir un incidente ni una comunicación grabada.",
      },
      {
        kind: "enLaOperacion",
        momento: "Antes de liberar frenos",
        texto: "El piloto que atiende la radio confirma el estado de la aprobación y el otro vigila la configuración y el entorno. Ambos acuerdan con el jefe de empuje quién dará cada aviso y cómo se detendrá la maniobra. Si el puesto, la dirección o el límite del empuje no se entendieron, la tripulación pregunta antes de mover; no usa el plano imaginario de una lección. Después del empuje, la señal de desconexión y libre no sustituye la autorización de rodaje.",
      },
      { kind: "sub", text: "Errores que importan" },
      error("Interpretar una hora prevista de puesta en marcha como aprobación automática al llegar ese minuto."),
      error("Mover el avión con STAND BY o con una demora prevista."),
      error("Tratar la aprobación de empuje como autorización simultánea de rodaje o como confirmación de frenos liberados."),
      error("Suponer que control de plataforma, control terrestre y personal de tierra tienen la misma función en todos los aeródromos."),
      error("Iniciar el empuje sin confirmar la comunicación con el equipo que opera el tractor."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Puesta en marcha, empuje y rodaje son pasos distintos.",
          "EXPECT informa una previsión; STAND BY ordena esperar; ninguno autoriza a moverse.",
          "Una aprobación de empuje requiere todavía coordinación física segura con el equipo de tierra.",
          "La dependencia, la dirección y los límites del empuje se verifican en la AIP local y en el SOP.",
          "La maniobra termina con frenos, desconexión y señal de libre; el rodaje necesita su propia autorización.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "EASA SERA.14001 · OACI Doc 9432 · FAA AIM 5-2-3",
        bloques: [
          { kind: "sub", text: "Documentos consultados" },
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, revisión de agosto de 2025, Appendix 1 to AMC1 SERA.14001, apartados 1.4.3–1.4.4 y 5.1.1–5.1.2 (https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299). OACI Doc 9432, 4.ª edición, apartados 4.2–4.3, como referencia histórica consultada. FAA Aeronautical Information Manual vigente, 5-2-3 (https://www.faa.gov/air_traffic/publications/aim_html/chap5_section_2.html), sobre contacto previo al encendido en operaciones estadounidenses." },
          { kind: "sub", text: "Límite de aplicación" },
          { kind: "list", items: [
            "Las frases europeas y la guía estadounidense se citan como documentos oficiales de sus jurisdicciones; no se presentan como publicación ni autorización colombiana.",
            "Para un aeropuerto colombiano, comprobar la AIP/eAIP vigente de Aerocivil, especialmente datos del aeródromo y procedimientos locales, además del manual del operador y la instrucción efectivamente recibida.",
            "La historieta no contiene puesto, frecuencia, ruta, pista ni carta, y no es evidencia de un caso real.",
          ] },
        ],
      },
    ],
  },

  // ── 16 ──────────────────────────────────────────────────────────────────
  {
    n: 16,
    title: "Rodaje",
    kicker: "Límites, puntos de espera y cruces de pista",
    minutes: 18,
    blocks: [
      {
        kind: "p",
        text: "El rodaje no es solo seguir una línea amarilla hasta la cabecera. La autorización debe interpretarse como una ruta y una sucesión de límites: por dónde puede avanzar la aeronave, en qué punto debe detenerse y qué pista no puede ocupar sin una instrucción específica. En una tripulación de aerolínea, ambos pilotos deben compartir ese modelo antes de iniciar el movimiento; una colación correcta que nadie contrasta con la posición real no evita por sí sola una incursión.",
      },
      { kind: "sub", text: "Preparación antes de mover" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Ubicación confirmada.** Identificar el puesto o la posición actual en la carta vigente del aeródromo, no en un dibujo de clase. Si la posición es incierta, se resuelve antes de solicitar o ejecutar el rodaje.",
          "**Ruta y límites.** Trazar mentalmente las calles recibidas, el punto de espera final y cada pista intermedia. Un límite situado más allá de una pista no convierte el cruce en implícito.",
          "**Puntos críticos y cargas de trabajo.** Revisar los puntos críticos publicados y repartir radio, vigilancia exterior y seguimiento de la carta. Las listas o cambios de programación que distraigan se administran según el procedimiento operacional normalizado (SOP, standard operating procedures) del operador.",
          "**Condiciones cambiantes.** Una ruta modificada, un desvío por obras o una instrucción que contradiga la carta exige reconstruir el plan. No se rueda por memoria hacia la pista.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-16-01.svg",
        alt: "Diagrama de decisión de rodaje: identificar el límite, detenerse en el punto de espera y cruzar una pista solo con instrucción explícita.",
        ancho: 1600,
        alto: 760,
        pie: "Esquema conceptual, no carta de aeródromo ni ruta operativa: una autorización de rodaje lleva hasta su límite; ante una pista intermedia, se mantiene la espera hasta recibir y colacionar una autorización específica de cruce. Para un vuelo real, prevalecen la carta vigente, la instrucción de control de tránsito aéreo (ATC, air traffic control) y el SOP.",
      },
      { kind: "sub", text: "Qué significa cada límite" },
      {
        kind: "table",
        head: ["Instrucción o situación", "Qué permite", "Qué no permite"],
        rows: [
          ["TAXI TO HOLDING POINT", "Rodar por la ruta indicada hasta el punto de espera designado.", "Entrar en la pista, alinearse o despegar."],
          ["HOLD SHORT OF RUNWAY", "Acercarse sin rebasar el punto de espera de esa pista.", "Suponer que el límite desaparece porque el destino de rodaje está más adelante."],
          ["CROSS RUNWAY", "Cruzar la pista identificada en la autorización, después de verificar que se entendió y es seguro ejecutar.", "Cruzar otra pista o alinearse en esta."],
          ["HOLD POSITION", "Detener la aeronave en la posición actual y esperar instrucciones.", "Continuar lentamente mientras se consulta."],
          ["FOLLOW o GIVE WAY", "Ordenar la interacción con otro tránsito dentro del límite propio.", "Heredar la autorización de pista del tránsito que va delante."],
        ],
      },
      {
        kind: "p",
        text: "La fraseología publicada por la Agencia de la Unión Europea para la Seguridad Aérea (EASA, European Union Aviation Safety Agency) diferencia TAXI TO HOLDING POINT, HOLD SHORT OF RUNWAY, CROSS RUNWAY y HOLD POSITION. Su apéndice de fraseología es una referencia verificable para estudiar el significado de estas instrucciones, no una publicación local colombiana. La publicación de información aeronáutica (AIP, Aeronautical Information Publication) vigente, el procedimiento del operador y la autorización recibida determinan el rodaje de un aeropuerto concreto.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-16-02.webp",
        alt: "Historieta fotográfica en cuatro paneles: tripulación escucha, controlador responde, aeronave permanece detenida y los pilotos contrastan la carta.",
        ancho: 1672,
        alto: 941,
        pie: "Secuencia didáctica, no transcripción ni representación de un aeropuerto real: 1) un piloto atiende la radio mientras el otro sigue la ruta; 2) control emite o aclara la instrucción; 3) ante el límite o una duda, la aeronave permanece detenida; 4) ambos pilotos verifican la instrucción contra la carta antes de continuar. La carta dibujada en la imagen no es utilizable para navegar. Amplía la imagen para leer la secuencia visual.",
      },
      { kind: "sub", text: "Secuencia operacional completa: una pista intermedia" },
      {
        kind: "p",
        text: "El siguiente caso es **una simulación didáctica**, no una transcripción. No fija indicativo, frecuencia, calles ni pista de un aeródromo. La tripulación acaba de recibir una autorización de rodaje cuyo límite final está más allá de una pista intermedia; la autorización incluye una instrucción de mantener corto antes de esa pista. El piloto que lleva la radio colaciona el límite, la ruta y la restricción de pista; el otro piloto los señala en la carta y confirma que el punto de espera corresponde a la pista mencionada.",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Aproximación al punto de espera.** La tripulación reduce la carga de trabajo, localiza la señalización y detiene el avión antes del límite. No anticipa el cruce porque el control haya indicado un punto final más lejano.",
          "**Comprobación de la instrucción.** Si la autorización de rodaje no incluyó ni cruce explícito ni espera antes de la pista intermedia, el piloto detiene la aeronave y solicita aclaración. La redacción ambigua no se interpreta a favor de avanzar.",
          "**Cruce autorizado.** Cuando ATC identifica expresamente la pista que puede cruzarse, la tripulación colaciona ese número, confirma que corresponde a la pista situada delante, vigila la superficie y cruza sin detenerse sobre ella salvo necesidad de seguridad.",
          "**Salida de la zona protegida.** La tripulación no comunica pista libre solo porque el tren de nariz haya pasado el borde. Comprueba que la aeronave completa está más allá de la marca de espera del lado de salida y comunica el estado si se le pidió.",
          "**Continuación.** Se retoma el resto de la autorización de rodaje únicamente dentro de sus límites. Si hay otra pista más adelante, se necesita su instrucción específica; el cruce anterior no se extiende a ella.",
        ],
      },
      {
        kind: "p",
        text: "La Administración Federal de Aviación de Estados Unidos (FAA, Federal Aviation Administration) documenta que cada cruce de pista requiere autorización explícita y que una pista solo se considera libre cuando todas las partes de la aeronave han pasado la marca del punto de espera correspondiente. Es una referencia de seguridad de esa jurisdicción, no una autorización aplicable por sí misma en Colombia. El criterio local se consulta en la eAIP de Aerocivil y en las instrucciones de la dependencia competente.",
      },
      { kind: "sub", text: "Colación y corrección del error" },
      {
        kind: "escenario",
        titulo: "La restricción quedó fuera de la colación",
        situacion: "Simulación didáctica sin aeropuerto asignado: el controlador da una ruta hasta un punto final y añade HOLD SHORT OF RUNWAY con la pista intermedia identificada. La tripulación colaciona la ruta y el punto final, pero omite la restricción. El otro piloto observa la omisión antes de mover el avión.",
        preguntas: [
          {
            q: "¿Qué debe cambiar antes de continuar?",
            a: "La tripulación corrige inmediatamente la colación, menciona la pista y confirma el límite entre ambos pilotos. Si no está segura del contenido exacto, permanece detenida y pide que se repita la instrucción. No se toma el silencio del controlador como autorización de cruce.",
          },
          {
            q: "¿Qué ocurre si el avión precedente entra en la pista?",
            a: "Nada cambia para la autorización propia. Seguir a otro tránsito o cederle el paso regula separación durante el rodaje, pero no concede entrada ni cruce de pista.",
          },
        ],
        concepto: "Un límite de rodaje y una autorización de cruce son decisiones distintas que ambos pilotos deben haber escuchado y verificado.",
      },
      { kind: "sub", text: "Cuando la posición o la ruta se vuelven inciertas" },
      {
        kind: "p",
        text: "Una instrucción rápida, un desvío no previsto, el brillo nocturno o varias calles convergentes pueden hacer que una tripulación pierda certeza sobre su posición. La acción profesional es detenerse en un lugar seguro, declarar la incertidumbre a ATC y solicitar instrucciones detalladas o confirmación de posición. Nunca se debe usar una historieta o un plano genérico para decidir el siguiente giro. Si ya hay proximidad a una pista, la prioridad es no franquear su punto de espera hasta resolver la situación.",
      },
      {
        kind: "enLaOperacion",
        momento: "Antes de cada cruce de pista",
        texto: "El piloto a los mandos mantiene la trayectoria y verifica que la aeronave no rebase el límite prematuramente; el piloto que atiende la radio confirma que la pista nombrada por ATC coincide con la señalización y la carta. Ambos verbalizan la autorización aplicable conforme al SOP del operador. Si cualquiera detecta una discrepancia, se detienen y consultan. Una autorización para despegar, una autorización de rodaje y una autorización de cruce no son intercambiables.",
      },
      { kind: "sub", text: "Errores que importan" },
      error("Tratar el punto de espera final como permiso para cruzar una pista intermedia."),
      error("Omitir el HOLD SHORT en la colación y confiar en que el controlador detectará el error."),
      error("Seguir al avión precedente a la pista sin una autorización propia."),
      error("Informar pista libre mientras parte de la aeronave permanece en el área protegida."),
      error("Seguir rodando mientras se intenta resolver una duda de posición o de ruta."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Antes de mover, ambos pilotos identifican ruta, límite, pistas intermedias y puntos críticos en la carta vigente.",
          "La ruta de rodaje no concede por sí sola entrada ni cruce de pista.",
          "Cada cruce requiere una instrucción explícita que identifique la pista y una colación completa.",
          "Una duda de posición o de autorización se resuelve con la aeronave detenida.",
          "El aviso de pista libre exige que todo el avión haya salido del área protegida.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "EASA SERA.14001 · FAA AIM 4-3-18 y 2-3-5",
        bloques: [
          { kind: "sub", text: "Documentos oficiales consultados" },
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, Appendix 1 to AMC1 SERA.14001, fraseología de rodaje (https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299). FAA, Aeronautical Information Manual, 4-3-18 Taxiing (https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap4_section_3.html) y 2-3-5 Holding Position Markings (https://www.faa.gov/air_traffic/publications/aim_html/chap2_section_3.html). FAA, guía de cruce explícito de pista (https://www.faa.gov/airports/runway_safety/resources/taxi_to)." },
          { kind: "sub", text: "Límite de aplicación" },
          { kind: "list", items: [
            "Las fuentes europeas y estadounidenses se presentan como material documental de estudio, no como reglamentación colombiana.",
            "El esquema no es una carta de aeropuerto. Para un aeródromo colombiano se comprueban la eAIP vigente de Aerocivil, las instrucciones de ATC y el SOP del operador.",
            "La historieta y el escenario son didácticos; no reproducen una grabación ni afirman la existencia de una ruta real.",
          ] },
        ],
      },
    ],
  },

  // ── 17 ──────────────────────────────────────────────────────────────────
  {
    n: 17,
    title: "Seguridad en la pista",
    kicker: "HOLD SHORT, LINE UP AND WAIT y la autorización de despegue",
    minutes: 13,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "El conjunto de autorizaciones y hábitos que protegen la pista. Una pista es el único lugar del aeródromo donde un avión a 140 nudos y uno detenido pueden estar en el mismo punto. Las autorizaciones que la tocan son pocas y todas se colacionan (Doc 4444, 4.5.7.5.1 b):",
      },
      {
        kind: "table",
        head: ["Autorización", "Qué permite", "Qué NO permite"],
        rows: [
          ["HOLD SHORT OF RUNWAY", "Nada: detenerse antes del punto de espera", "Entrar"],
          ["LINE UP AND WAIT", "Entrar, alinearse y **esperar**", "Despegar"],
          ["LINE UP (be ready for immediate departure)", "Entrar y alinearse, listo para salir ya", "Despegar sin la autorización"],
          ["CROSS RUNWAY", "Cruzar esa pista y salir de ella", "Detenerse en ella, cruzar otra"],
          ["CLEARED FOR TAKE-OFF", "Despegar", ""],
          ["CONTINUE APPROACH", "Seguir la aproximación", "Aterrizar"],
          ["CLEARED TO LAND", "Aterrizar", ""],
          ["VACATE / TAKE FIRST RIGHT", "Salir de la pista por donde indican", ""],
        ],
      },

      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "definicion",
        text: "**LINE UP AND WAIT no es CLEARED FOR TAKE-OFF.** Es la confusión más peligrosa de este nivel: en la pista, con motores listos y la lista de antes del despegue hecha, la mente espera oír «take-off». Por eso la OACI reserva la palabra TAKE-OFF solo para cuando se autoriza el despegue o se cancela (Doc 9432, 2.8.3.3); en los demás casos se usa DEPARTURE o AIRBORNE. **Si no oyó «take-off», no despega.**",
      },
      {
        kind: "p",
        text: "**Varias pistas en uso.** Cuando el piloto podría confundirse de pista, la autorización de despegue debe incluir el número de pista (Doc 9432, 4.5.8). Colacione siempre el número y verifique que la pista donde está alineado es esa (rumbo de pista, letreros, pantalla de navegación).",
      },
      { kind: "p", text: "**Autorizaciones condicionales** (Doc 9432, 4.5.7):" },
      {
        kind: "list",
        items: [
          "**No se usan** para movimientos en pistas en actividad salvo que el controlador **y** el piloto vean la aeronave o vehículo en cuestión.",
          "Si la condición es un avión que aterriza, el que sale debe identificarlo bien: a veces no basta con el tipo, hace falta el color o la compañía.",
          "Orden: 1) distintivo, 2) condición, 3) autorización, 4) breve repetición de la condición.",
          "Se colacionan o se acusan de modo que quede claro que se entendieron y se cumplirán (Doc 4444, 4.5.7.5.1.1). En la práctica, la colación repite la condición: «behind the landing Airbus, line up and wait behind».",
        ],
      },
      {
        kind: "p",
        text: "**CONTINUE APPROACH no es CLEARED TO LAND** (Doc 9432, 4.7.1). Si en final corta no tiene autorización de aterrizaje, pídala; si no la obtiene, se hace motor y al aire según el procedimiento (Nivel 4).",
      },
      {
        kind: "p",
        text: "**Salir de la pista.** Salvo instrucción en contrario, se sigue en frecuencia de torre hasta dejar libre la pista (Doc 9432, 4.9). Libre significa: todo el avión pasó el punto de espera.",
      },
      {
        kind: "p",
        text: "**Qué hace el controlador cuando algo sale mal** (Doc 9432, 4.5.10 y 4.5.11): «take off immediately or hold short of runway», «take off immediately or vacate runway», «hold position, cancel take-off», y si ya inició la carrera, «stop immediately» repetido con el distintivo.",
      },
      {
        kind: "hueco",
        rotulo: "CM-17-01 · Diagrama · 16:9 · 1600×900 px",
        descripcion:
          "Imagen sugerida: dos paneles lado a lado con el mismo avión sobre el eje de la pista 13, vista en planta. Panel izquierdo, rótulo «LINE UP AND WAIT»: avión alineado, frenos (icono de freno), flecha de avance tachada, texto «Entrar y esperar. No despegar». Panel derecho, rótulo «RUNWAY 13 CLEARED FOR TAKE-OFF»: el mismo avión con flecha de avance larga, texto «Solo con la palabra TAKE-OFF y el número de pista». Entre los dos, una franja ámbar: «Si no oyó TAKE-OFF, no despega». Objetivo: fijar de vista la diferencia entre entrar a la pista y estar autorizado a despegar.",
        alto: 300,
        ratio: "16 / 9",
      },
      {
        kind: "hueco",
        rotulo: "CM-17-02 · Esquema · 16:9 · 1600×900 px",
        descripcion:
          "Imagen sugerida: vista oblicua desde atrás y arriba de un avión en el punto de espera de la pista 13. En la final de la misma pista, un Airbus con tren abajo, marcado con un recuadro «¿es ESTE?». Un segundo avión más lejos, en final larga, marcado «no confundir». Globo de torre: «AVIATORY 452, behind the landing Airbus, line up and wait behind». Numeración 1 a 4 en el globo sobre las partes: distintivo, condición, autorización, repetición de la condición. Objetivo: que el piloto entienda la estructura de la autorización condicional y que la condición depende de identificar al avión correcto.",
        alto: 300,
        ratio: "16 / 9",
      },

      { kind: "sub", text: "Fraseología OACI" },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "La colación completa de «line up and wait runway (number)» y la variante «line up and wait runway (number) intersection (name)» no están comprobadas: consultar Doc 4444 cap. 12 (fraseología de despegue), no cargado. El formato vigente de la autorización condicional (por ejemplo «behind (aircraft) on short final, line up and wait behind») y si se admite condicional de cruce de pista: Doc 4444 cap. 12 y cap. 7, no cargados. El uso de luces exteriores como indicación de autorización y la verificación de pista correcta: SOP del operador y reglamentación del Estado (en Colombia, RAC).",
      },
      ...entrada(
        "Ejemplo 1. Line up and wait (Doc 9432, 4.5.3)",
        [
          `ATC:   "AVIATORY 452, report when ready for departure."`,
          `PILOT: "Wilco, AVIATORY 452."`,
          `PILOT: "AVIATORY 452, ready."`,
          `ATC:   "AVIATORY 452, line up and wait."`,
          `PILOT: "Lining up, AVIATORY 452."`,
        ],
        "Significado: en el Doc 9432 (4.ª ed.) la colación es «lining up». Como entrar a la pista siempre se colaciona (Doc 4444, 4.5.7.5.1 b), muchos Estados piden repetir la instrucción completa con el número de pista: «Line up and wait runway 13, AVIATORY 452». Ver VERIFICAR.",
      ),
      ...entrada(
        "Ejemplo 2. Autorización condicional (Doc 9432, 4.5.7)",
        [
          `ATC:   "AVIATORY 452, report the Airbus on final in sight."`,
          `PILOT: "AVIATORY 452, Airbus in sight."`,
          `ATC:   "AVIATORY 452, behind the landing Airbus, line up and wait behind."`,
          `PILOT: "Behind the Airbus, line up and wait behind, AVIATORY 452."`,
        ],
        "Significado: primero se asegura que el piloto ve el tránsito; luego viene la condición. Si usted no está seguro de cuál es el Airbus, **no diga «in sight»**.",
      ),
      ...entrada(
        "Ejemplo 3. Cruce de pista (Doc 9432, 4.4, ejemplo tras 4.4.2)",
        [
          `PILOT: "AVIATORY 452, approaching holding point, request cross runway 18."`,
          `ATC:   "AVIATORY 452, hold short runway 18."`,
          `PILOT: "AVIATORY 452, holding short."`,
          `ATC:   "AVIATORY 452, cross runway 18, report vacated."`,
          `PILOT: "Crossing, wilco, AVIATORY 452."`,
          `PILOT: "AVIATORY 452, runway vacated."`,
        ],
        "Significado: pedir el cruce no es tener el cruce. La autorización llega sola y con número de pista.",
      ),
      ...entrada(
        "Ejemplo 4. Despegue inmediato o esperar fuera (Doc 9432, 4.5.10)",
        [`ATC:   "AVIATORY 452, take off immediately or hold short of runway."`, `PILOT: "Holding short, AVIATORY 452."`],
        "Significado: si la tripulación no puede despegar ya (lista incompleta, carga de trabajo), la respuesta correcta es quedarse fuera. La otra opción del Doc 9432 es «take off immediately or vacate runway».",
      ),
      ...entrada("Ejemplo 5. Cancelación del despegue (Doc 9432, 4.5.10)", [
        `ATC:   "AVIATORY 452, hold position, cancel take-off, I say again, cancel take-off, vehicle on runway."`,
        `PILOT: "Holding, AVIATORY 452."`,
      ]),
      ...entrada(
        "Ejemplo 6. Detenerse en plena carrera (Doc 9432, 4.5.11 y 4.5.12)",
        [
          `ATC:   "AVIATORY 452, stop immediately, AVIATORY 452, stop immediately."`,
          `PILOT: "Stopping, AVIATORY 452."`,
        ],
        "Significado: el controlador repite la instrucción y el distintivo. La decisión de abortar a alta velocidad sigue siendo de la tripulación según sus procedimientos de performance; la frase le avisa del peligro.",
      ),
      {
        kind: "escenario",
        titulo: "Ejemplo 7. Distintivo parecido en la pista",
        situacion:
          "Escenario de práctica; palabras de Doc 9432, 2.6 y 2.8.3.7. ATC: `AVIATORY 452, line up and wait runway 13.` PILOT (AVIATORY 425): `Line up and wait runway 13, AVIATORY 425.`",
        preguntas: [
          {
            q: "¿Qué detecta el controlador y qué hace?",
            a: "ATC: `AVIATORY 425, negative, hold position. AVIATORY 452, line up and wait runway 13.` PILOT (AVIATORY 452): `Line up and wait runway 13, AVIATORY 452.` El distintivo al final de la colación permitió detectar que respondió el avión equivocado. Si el 425 hubiera colacionado sin distintivo, dos aviones habrían podido entrar a la misma pista.",
          },
        ],
        concepto: "Todo lo que toca una pista se colaciona, con número de pista y distintivo.",
      },
      ...entrada(
        "Ejemplo 8. Continue approach vs cleared to land (Doc 9432, 4.7.1)",
        [
          `PILOT: "AVIATORY 452, long final."`,
          `ATC:   "AVIATORY 452, continue approach, wind 260 degrees 18 knots."`,
          `PILOT: "AVIATORY 452."`,
          `PILOT: "AVIATORY 452, final."`,
          `ATC:   "AVIATORY 452, runway 27, cleared to land, wind 270 degrees 20 knots."`,
          `PILOT: "Runway 27, cleared to land, AVIATORY 452."`,
        ],
        "Significado: solo la segunda transmisión autoriza el aterrizaje. En el Doc 9432 el acuse de «continue approach» es solo el distintivo.",
      ),
      ...entrada(
        "Ejemplo 9. Salida de pista y cambio a Ground (Doc 9432, 4.9)",
        [
          `ATC:   "AVIATORY 452, take first right, when vacated contact Ground 118.350."`,
          `PILOT: "First right, wilco, 118.350, AVIATORY 452."`,
        ],
        "Significado: no cambia de frecuencia hasta dejar libre la pista. Si cambia antes y la torre necesita detenerlo, no lo escuchará.",
      ),
      ...entrada(
        "Ejemplo 10. Duda en la pista (construido con CONFIRM, Doc 9432, 2.6)",
        [
          `PILOT: "AVIATORY 452, confirm cleared for take-off runway 13."`,
          `ATC:   "AVIATORY 452, negative, line up and wait runway 13."`,
          `PILOT: "Line up and wait runway 13, AVIATORY 452."`,
        ],
        "Significado: preguntar cuesta segundos. Despegar con una duda puede costar la pista.",
      ),

      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Antes de cruzar o entrar a una pista",
        texto:
          "Los operadores suelen fijar en su SOP: confirmación cruzada entre pilotos antes de cruzar o entrar a una pista; luces exteriores que indican la fase (por ejemplo, encender ciertas luces al recibir la autorización de despegue) y verificación de pista correcta antes de aplicar potencia. Los detalles varían por operador y por Estado; el principio común es que **ambos pilotos oyen y entienden cada autorización que toca una pista**.",
      },

      { kind: "sub", text: "Error frecuente" },
      error("Despegar con LINE UP AND WAIT (expectation bias: «ya nos tocaba»)."),
      error("Aceptar una condicional sin ver el avión de la condición, o viendo otro."),
      error("Colacionar una autorización para otra pista o para otro distintivo."),
      error("Cruzar porque «el de adelante cruzó»."),
      error("Cambiar a Ground antes de dejar libre la pista."),
      error("Aterrizar con «continue approach»."),

      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "Todo lo que toca una pista se colaciona, con número de pista y distintivo.",
          "LINE UP AND WAIT: entra y espera. Solo TAKE-OFF autoriza a despegar.",
          "Condicional: solo si ambos ven el tránsito; se repite la condición.",
          "CONTINUE APPROACH no es CLEARED TO LAND.",
          "La pista está libre cuando todo el avión pasó el punto de espera.",
        ],
      },
      fuentes(
        "Doc 4444 · Doc 9432",
        "Doc 4444 (15.ª ed., Enm. 4) cap. 1 (Incursión en la pista, Punto de espera de la pista), 4.5.7.5.1 b), 4.5.7.5.1.1; Doc 9432 (4.ª ed.) 2.6, 2.8.3.3, 2.8.3.7, 2.8.3.9, 4.4 y Nota, 4.5.3, 4.5.5, 4.5.7, 4.5.8, 4.5.10, 4.5.11, 4.5.12, 4.7.1, 4.9.",
        [
          "VERIFICAR: colación completa de «line up and wait runway (number)» y la variante «line up and wait runway (number) intersection (name)» contra Doc 4444 cap. 12 (fraseología de despegue), no cargado.",
          "VERIFICAR: formato vigente de la autorización condicional (por ejemplo «behind (aircraft) on short final, line up and wait behind») y si se admite condicional de cruce de pista, contra Doc 4444 cap. 12 y cap. 7, no cargados.",
          "VERIFICAR: uso de luces exteriores como indicación de autorización y verificación de pista correcta: SOP del operador y reglamentación del Estado (en Colombia, RAC).",
        ],
      ),
    ],
  },

  // ── 18 ──────────────────────────────────────────────────────────────────
  {
    n: 18,
    title: "Despegue",
    kicker: "De la solicitud a la primera instrucción en el aire",
    minutes: 12,
    blocks: [
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "La secuencia desde el punto de espera hasta el cambio a Salida: informar listo, alinearse, recibir la autorización de despegue (con viento e instrucciones de salida cuando las hay), despegar y cambiar de frecuencia.",
      },

      { kind: "sub", text: "Lo que debe saber un piloto" },
      {
        kind: "p",
        text: "**La palabra TAKE-OFF tiene dueño.** Solo se usa cuando la aeronave está autorizada a despegar o cuando se cancela esa autorización; en los demás casos se dice DEPARTURE o AIRBORNE (Doc 9432, 2.8.3.3). Consecuencia práctica para el piloto: al informar que está listo se dice «ready» o «ready for departure», no «ready for take-off». Así, la única vez que se oye TAKE-OFF en la frecuencia es cuando hay una autorización (o su cancelación), y nadie puede tomar una frase del piloto como si fuera la autorización.",
      },
      { kind: "p", text: "**Paso a paso** (Doc 9432, 4.5):" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**En el punto de espera.** En aeropuertos con Ground y Tower separados, lo transfieren a torre al acercarse al punto de espera (4.5.1). Algunas aeronaves necesitan verificaciones y no están listas al llegar: por eso ATC puede pedir «report when ready for departure» (4.5.3).",
          "**Listo.** Informe cuando de verdad lo esté (listas completas, cabina preparada).",
          "**Alineación.** «Line up and wait» (entra y espera) o, si el tránsito lo exige, «line up, be ready for immediate departure» (4.5.5).",
          "**Autorización de despegue.** Con número de pista, siempre que pueda haber confusión (4.5.8), y eventualmente con instrucciones de salida para separación (4.5.9).",
          "**Despegue.** Los controladores deben evitar transmitirle durante el despegue y el ascenso inicial salvo emergencia (4.1.2 y 4.5.4). Si le hablan en ese momento, es importante.",
          "**Airborne y cambio a Salida.** Con visibilidad reducida pueden pedir «report airborne» (4.5.6); luego lo transfieren a Salida.",
        ],
      },
      {
        kind: "p",
        text: "**Si no está listo, dígalo.** «¿Listo para salida inmediata?» exige una respuesta honesta: AFFIRM solo si puede rodar a la pista y despegar sin demora.",
      },
      {
        kind: "p",
        text: "**Si abandona el despegue**, informe a la torre lo antes posible que lo suspende y pida ayuda o instrucciones de rodaje (4.5.12).",
      },
      {
        kind: "p",
        text: "**Ascenso inicial**: las instrucciones de salida (rumbo, altitud antes de virar, SID) se colacionan junto con la autorización de despegue. El detalle de SID y ascenso es del Nivel 4.",
      },
      {
        kind: "hueco",
        rotulo: "CM-18-01 · Diagrama · 21:9 · 2100×900 px",
        descripcion:
          "Imagen sugerida: línea de tiempo horizontal sobre un perfil lateral de pista: 1) avión en el punto de espera, globo «READY»; 2) avión entrando, globo «LINE UP AND WAIT»; 3) avión alineado, globo «RUNWAY 13 CLEARED FOR TAKE-OFF» con la palabra TAKE-OFF resaltada; 4) avión rotando, franja gris «ATC evita transmitir» sobre el despegue y el ascenso inicial; 5) avión en ascenso, globo «CONTACT DEPARTURE 119.1». Debajo de cada paso, en mono, qué se colaciona. Objetivo: que el piloto tenga el mapa completo del despegue y vea en qué punto aparece por primera vez la palabra TAKE-OFF.",
        alto: 240,
        ratio: "21 / 9",
      },

      { kind: "sub", text: "Fraseología OACI" },
      {
        kind: "callout",
        tone: "verificar",
        title: "Verificar",
        text: "Tres puntos de esta lección no están comprobados. La inclusión y el orden del viento en la autorización de despegue («wind (direction/speed), runway (number), cleared for take-off», Ejemplo 7): Doc 4444 cap. 7 y cap. 12, no cargados. «Ready for departure» como notificación del piloto (el Doc 9432 muestra «ready» tras «report when ready for departure»): Doc 4444 cap. 12, no cargado. El momento del cambio a Salida (transferencia por torre o automática): AIP del aeropuerto (AD 2.22, procedimientos de vuelo).",
      },
      ...entrada(
        "Ejemplo 1. Listo, alineación y despegue (Doc 9432, 4.5.3 y 4.5.4)",
        [
          `ATC:   "AVIATORY 452, report when ready for departure."`,
          `PILOT: "Wilco, AVIATORY 452."`,
          `PILOT: "AVIATORY 452, ready."`,
          `ATC:   "AVIATORY 452, line up and wait."`,
          `PILOT: "Lining up, AVIATORY 452."`,
          `ATC:   "AVIATORY 452, runway 13, cleared for take-off."`,
          `PILOT: "Runway 13, cleared for take-off, AVIATORY 452."`,
        ],
        "Significado: dos autorizaciones distintas. La palabra TAKE-OFF aparece solo en la segunda.",
      ),
      ...entrada(
        "Ejemplo 2. Salida inmediata (Doc 9432, 4.5.5)",
        [
          `ATC:   "AVIATORY 452, are you ready for immediate departure?"`,
          `PILOT: "AVIATORY 452, affirm."`,
          `ATC:   "AVIATORY 452, line up, be ready for immediate departure."`,
          `PILOT: "Lining up, AVIATORY 452."`,
          `ATC:   "AVIATORY 452, runway 13, cleared for take-off."`,
          `PILOT: "Runway 13, cleared for take-off, AVIATORY 452."`,
        ],
        "Significado: «Line up, be ready for immediate departure» sigue sin ser autorización de despegue. Se espera el «cleared for take-off».",
      ),
      {
        kind: "escenario",
        titulo: "Ejemplo 3. No está listo para salida inmediata",
        situacion:
          "Escenario de práctica; NEGATIVE de Doc 9432, 2.6. ATC: `AVIATORY 452, are you ready for immediate departure?` La tripulación no está lista para salida inmediata.",
        preguntas: [
          {
            q: "¿Qué responde el piloto y qué hace el controlador?",
            a: "PILOT: `AVIATORY 452, negative, ready in two minutes.` ATC: `AVIATORY 452, hold short runway 13.` PILOT: `Holding short runway 13, AVIATORY 452.` «Ready in two minutes» es lenguaje claro y útil: le permite al controlador planear. Mejor un NEGATIVE que una salida apresurada con la cabina a medio preparar.",
          },
        ],
        concepto: "Si no está listo, NEGATIVE. AFFIRM solo si puede rodar a la pista y despegar sin demora.",
      },
      ...entrada(
        "Ejemplo 4. Instrucción de salida con la autorización (Doc 9432, 4.5.9)",
        [
          `ATC:   "AVIATORY 452, climb straight ahead until 2500 feet before turning right, runway 24, cleared for take-off."`,
          `PILOT: "Straight ahead 2500 feet, right turn, cleared for take-off runway 24, AVIATORY 452."`,
        ],
        "Significado: la instrucción de salida y la autorización se colacionan juntas. Virar antes de 2500 ft rompe la separación que el controlador planeó.",
      ),
      ...entrada("Ejemplo 5. Solicitud de viraje después del despegue (Doc 9432, 4.5.9)", [
        `PILOT: "AVIATORY 452, request right turn when airborne."`,
        `ATC:   "AVIATORY 452, right turn approved, runway 06, cleared for take-off."`,
        `PILOT: "Runway 06, cleared for take-off, right turn, AVIATORY 452."`,
      ]),
      ...entrada(
        "Ejemplo 6. Notificar en el aire y pasar a Salida (Doc 9432, 4.5.6)",
        [
          `ATC:   "AVIATORY 452, runway 24, cleared for take-off, report airborne."`,
          `PILOT: "Runway 24, cleared for take-off, wilco, AVIATORY 452."`,
          `PILOT: "AVIATORY 452, airborne 57."`,
          `ATC:   "AVIATORY 452, contact Departure 121.750."`,
          `PILOT: "121.750, AVIATORY 452."`,
        ],
        "Significado: «Airborne 57» es «en el aire a los 57». Note que en la notificación se dice AIRBORNE, no TAKE-OFF.",
      ),
      ...entrada(
        "Ejemplo 7. Autorización con viento (escenario de práctica; ver VERIFICAR)",
        [
          `ATC:   "AVIATORY 452, wind 150 degrees 8 knots, runway 13, cleared for take-off."`,
          `PILOT: "Runway 13, cleared for take-off, AVIATORY 452."`,
        ],
        "Significado: el viento es información: no se colaciona, pero se compara con los límites del avión. Si excede un límite, la respuesta es UNABLE, no un despegue «a ver si baja».",
      ),
      ...entrada(
        "Ejemplo 8. Despegue abandonado (Doc 9432, 4.5.12)",
        [
          `PILOT: "AVIATORY 452, stopping."`,
          `ATC:   "AVIATORY 452, roger."`,
          `PILOT: "AVIATORY 452, request return to ramp."`,
          `ATC:   "AVIATORY 452, take next right, return to ramp, contact Ground 118.350."`,
          `PILOT: "Next right, return to ramp, 118.350, AVIATORY 452."`,
        ],
        "Significado: primero se vuela (se detiene) el avión; la llamada viene «tan pronto como sea posible». Si hay emergencia, la comunicación cambia (Nivel 5).",
      ),
      ...entrada(
        "Ejemplo 9. Error: «ready for take-off» (escenario de práctica, contraste con Doc 9432, 2.8.3.3)",
        [
          `PILOT (incorrecto): "AVIATORY 452, ready for take-off."`,
          `PILOT (correcto):   "AVIATORY 452, ready." o "AVIATORY 452, ready for departure."`,
        ],
        "Significado: si en una frecuencia congestionada se bloquea parte de la transmisión, «…for take-off» puede sonar a autorización para otro avión. Reservar la palabra elimina ese riesgo.",
      ),

      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Antes de aplicar potencia",
        texto:
          "Antes del despegue, la tripulación confirma que la pista en la que está alineada es la autorizada y que la autorización fue de despegue, no de alineación. Muchos operadores exigen que ambos pilotos verbalicen «cleared for take-off» y verifiquen la pista antes de aplicar potencia. La frecuencia de Salida y la altitud inicial se tienen preseleccionadas desde el briefing. Los detalles son del SOP de cada operador.",
      },

      { kind: "sub", text: "Error frecuente" },
      error("Despegar con «line up and wait» o con «line up, be ready for immediate departure»."),
      error("Decir «ready for take-off»."),
      error("Aceptar una salida inmediata sin estar listo."),
      error("Colacionar la autorización de despegue sin la instrucción de salida que venía con ella."),
      error("Cambiar a Salida antes de que la torre lo transfiera (salvo que el procedimiento local lo indique)."),

      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "TAKE-OFF solo lo dice la torre, para autorizar o cancelar.",
          "El piloto informa «ready» o «ready for departure».",
          "Line up and wait y line up (be ready for immediate departure) no autorizan a despegar.",
          "Autorización de despegue: se colaciona con el número de pista y con las instrucciones de salida.",
          "Si no está listo, NEGATIVE. Si no puede cumplir, UNABLE.",
        ],
      },
      fuentes(
        "Doc 9432 · Doc 4444",
        "Doc 9432 (4.ª ed.) 2.6 (AFFIRM, NEGATIVE, WILCO), 2.8.3.3, 4.1.2, 4.5.1, 4.5.3, 4.5.4, 4.5.5, 4.5.6, 4.5.8, 4.5.9, 4.5.12; Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1 b).",
        [
          "VERIFICAR: inclusión y orden del viento en la autorización de despegue («wind (direction/speed), runway (number), cleared for take-off») contra Doc 4444 cap. 7 y cap. 12, no cargados.",
          "VERIFICAR: «ready for departure» como notificación del piloto (el Doc 9432 muestra «ready» tras «report when ready for departure») contra Doc 4444 cap. 12, no cargado.",
          "VERIFICAR: momento del cambio a Salida (transferencia por torre o automática) en la AIP del aeropuerto (AD 2.22, procedimientos de vuelo).",
        ],
      ),
    ],
  },
]
