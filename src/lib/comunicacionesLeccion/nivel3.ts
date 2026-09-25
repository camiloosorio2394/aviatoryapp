/**
 * Nivel 3 · Autorizaciones y superficie (lecciones 12 a 18, capítulos 12 a 18 de la especificación).
 *
 * La autorización: cómo se colaciona, qué es y qué no es una autorización, y
 * el recorrido en tierra hasta el despegue, con la pista como el lugar donde un
 * malentendido cuesta más.
 *
 * Redacción editorial contrastada con documentos oficiales. Los casos de
 * entrenamiento se identifican como construcciones didácticas y las frases
 * extranjeras no se presentan como procedimientos colombianos vigentes.
 */

import type { DocBlockData, DocScreen } from "@/lib/docBlocks"

/** Un error frecuente, con la semántica de alerta. */
function error(text: string): DocBlockData {
  return { kind: "callout", tone: "warn", text }
}

export const NIVEL_3: DocScreen[] = [
  // ── 12 ──────────────────────────────────────────────────────────────────
  {
    n: 12,
    title: "Readback y hearback",
    kicker: "Lo que se colaciona y quién lo verifica",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "Esta es la lección de referencia de la colación en todo el módulo: las demás remiten aquí. Cada instrucción crítica se cierra en un circuito: control transmite, la tripulación repite y el controlador comprueba. Si se pierde una condición o responde otra aeronave, la colación permite detectarlo antes de actuar.",
      },
      { kind: "sub", text: "¿Qué es?" },
      {
        kind: "p",
        text: "**Readback (colación)**: la tripulación repite al controlador los elementos críticos de la autorización o instrucción que recibió (Doc 9432, 2.6; la lista de elementos está en el Doc 4444, 4.5.7.5.1).",
      },
      {
        kind: "p",
        text: "**Hearback**: el controlador escucha la colación, la compara con lo que transmitió y corrige de inmediato cualquier diferencia (Doc 4444, 4.5.7.5.2). Es una función del controlador, no una frase que diga el piloto.",
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

      { kind: "sub", text: "Qué se colaciona siempre" },
      {
        kind: "list",
        items: [
          "Autorizaciones de ruta del control de tránsito aéreo.",
          "Autorizaciones e instrucciones para entrar, aterrizar, despegar, mantenerse fuera, cruzar, rodar o retroceder en una pista.",
          "Pista en uso, reglajes de altímetro, códigos del radar secundario de vigilancia (SSR, secondary surveillance radar), niveles, rumbos, velocidades y niveles de transición; la disposición consultada también menciona los datos difundidos por el servicio automático de información terminal (ATIS, Automatic Terminal Information Service).",
        ],
      },
      { kind: "sub", text: "Cómo se colaciona" },
      {
        kind: "list",
        items: [
          "Termine la colación con su distintivo (Doc 9432, 2.8.3.7): el controlador sabe quién respondió, y eso protege contra distintivos parecidos.",
          "Repita valores y condiciones («hasta pasar», «después de»). Omitir una condición convierte una autorización condicionada en una acción prematura.",
          "ROGER no es colación: significa «recibí toda su transmisión» y no sirve cuando se exige colacionar (Doc 9432, 2.6). WILCO tampoco.",
          "Si el controlador corrige (NEGATIVE, I SAY AGAIN), se colaciona otra vez la versión válida antes de actuar.",
        ],
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
        text: "La lista de colación sale de una edición anterior del Doc 4444: confírmala en la edición vigente, en la eAIP de Aerocivil y en el SOP del operador.",
      },

      { kind: "sub", text: "Aplicación en aerolínea" },
      {
        kind: "enLaOperacion",
        momento: "Quién colaciona y qué se colaciona",
        texto: "El PM (pilot monitoring) maneja la radio; el PF (pilot flying) también escucha y comprueba lo que afecta a la trayectoria. Ambos contrastan nivel, rumbo, velocidad, pista y código con lo seleccionado o anotado. Se colaciona lo oído, no lo que se esperaba oír.",
      },

      { kind: "sub", text: "Error frecuente" },
      error("Responder ROGER o WILCO a una instrucción relativa a pista, nivel o rumbo que requiere colación: ninguna de esas palabras permite comparar el dato crítico."),
      error("Colacionar el valor esperado en vez del oído: la tripulación quizá cambie el altímetro, el nivel o la pista a algo que control nunca transmitió."),

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
        etiqueta: "Más detalle",
        cita: "Doc 4444 4.5.7.5 · Doc 9432 2.8.3",
        bloques: [
          {
            kind: "p",
            text: "**Readback (colación)**: la tripulación repite al controlador los elementos críticos de una autorización o instrucción que recibió. La palabra normalizada READ BACK pide repetir el mensaje, o la parte indicada, tal como se recibió (Manual de radiotelefonía de la Organización de Aviación Civil Internacional, OACI, International Civil Aviation Organization, Doc 9432, 2.6). La lista de elementos de seguridad está en el Doc 4444, 4.5.7.5.1, de la edición consultada; antes de usarla en vuelo se confirma la edición y publicación aplicables.",
          },
          {
            kind: "p",
            text: "**Hearback (verificación de la colación)**: el controlador escucha lo que repitió la tripulación, lo compara con lo transmitido y corrige de inmediato cualquier discrepancia (Doc 4444, 4.5.7.5.2; Doc 9432, 2.8.3.8). Es una función del controlador, no una frase que el piloto pronuncia. El nombre inglés es corriente en la industria; los textos de la OACI consultados describen la acción sin depender de ese nombre.",
          },
          { kind: "p", text: "**Qué se colaciona siempre.** La edición consultada del Doc 4444, 4.5.7.5.1, agrupa los elementos críticos así:" },
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
                "La acción exacta (entrar, despegar, aterrizar, mantenerse fuera, cruzar, rodar o retroceder) y el identificador de pista recibido.",
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
              "**Enlace de datos.** La comunicación controlador-piloto por enlace de datos (CPDLC, Controller-Pilot Data Link Communications) sigue reglas distintas de la radiotelefonía. La edición consultada del Doc 4444, 4.5.7.5.2.1, no exige colación oral de sus mensajes salvo prescripción de la autoridad de servicios de tránsito aéreo (ATS, air traffic services). El Nivel 6 estudia sus respuestas y límites.",
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
            text: "**Espere la corrección y resuelva discrepancias.** El Doc 9432, 2.8.3.8 a 2.8.3.9, presenta la responsabilidad del controlador de escuchar la colación y corregir si no coincide. No se publica aquí un intercambio «Bogotá-Cali» con ruta, punto, pista o código fabricados: una transmisión que parece real debe salir de una grabación o publicación auténtica y comprobada, no de una composición editorial.",
          },
          {
            kind: "enLaOperacion",
            momento: "Quién colaciona y qué se colaciona",
            texto:
              "En una cabina de dos pilotos, el piloto que monitorea (PM, pilot monitoring) normalmente maneja la radio mientras el piloto que vuela (PF, pilot flying) también escucha y comprueba la instrucción que afecta a la trayectoria. Ambos contrastan nivel, rumbo, velocidad, pista y código con lo seleccionado o anotado. El reparto exacto y los llamados cruzados dependen de los procedimientos operacionales estándar (SOP, standard operating procedures) del explotador. Una defensa útil es anotar o seleccionar el dato realmente oído y comprobarlo antes de transmitir, sin colacionar desde el recuerdo de lo que se esperaba escuchar.",
          },
          { kind: "sub", text: "Otros errores frecuentes" },
          { kind: "list", items: [
            "Omitir una condición temporal o espacial; la acción puede ejecutarse antes del punto autorizado.",
            "Omitir el distintivo propio: con dos aeronaves de llamadas similares, el controlador pierde una defensa para saber quién respondió.",
            "Pasar a la siguiente tarea inmediatamente después de colacionar e ignorar una corrección posterior.",
          ] },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes",
        cita: "Doc 4444 · Doc 9432 · FAA AIM 4-4-7",
        bloques: [
          { kind: "sub", text: "Base contrastada" },
          { kind: "p", text: "Doc 4444, 15.ª edición con Enmienda 4, apartados 4.5.7.5.1 a 4.5.7.5.2.1 (edición histórica consultada); Doc 9432, 4.ª edición, apartados 2.6 y 2.8.3.4 a 2.8.3.9. Guía de la FAA, Aeronautical Information Manual, 4-4-7, para responsabilidad del piloto en la colación, inclusión del distintivo y repetición de pista, altitudes y restricciones. Esta guía es estadounidense; no sustituye el procedimiento colombiano." },
          { kind: "sub", text: "Pendiente antes de uso operacional" },
          { kind: "list", items: [
            "Confirmar la lista de colación y cualquier cambio de redacción en la edición vigente del Doc 4444 y en las disposiciones del Estado de operación.",
            "Comprobar en la AIP vigente de Aerocivil y el procedimiento del operador cómo se transmite o confirma cada dato de ATIS, sin inventar frases o frecuencias.",
            "Para ejemplos concretos de rutas, salidas, cruces o pistas colombianas, usar únicamente una carta vigente y una transmisión auténtica verificada; esta lección no las incluye.",
          ] },
          {
            kind: "callout",
            tone: "verificar",
            title: "Aplicación local y edición vigente",
            text: "La lista detallada citada procede de una edición consultada del Doc 4444, no se presenta como actualización automática de todas las jurisdicciones. Antes de enseñar una frase concreta de salida, pista o frecuencia en Colombia, contrástala con el Doc 4444 vigente, la publicación de información aeronáutica (AIP, Aeronautical Information Publication) de Aerocivil y el procedimiento del operador. La colación oral de datos difundidos por ATIS también depende del procedimiento local.",
          },
        ],
      },
    ],
  },

  // ── 13 ──────────────────────────────────────────────────────────────────
  {
    n: 13,
    title: "Qué es una autorización ATC",
    kicker: "Autorización, instrucción, información y solicitud",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "Una tripulación no decide por la palabra aislada que oyó. Antes de mover el avión identifica destinatario, acción, límite y condiciones. Una **autorización ATC** permite proceder en las condiciones que fija la dependencia de control; no es una licencia genérica para toda la fase (Doc 4444, cap. 1).",
      },
      { kind: "sub", text: "Cuatro mensajes con efectos distintos" },
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
        text: "STANDBY no aprueba ni niega; RECLEARED reemplaza la parte que cambia y hay que identificar cuál. El glosario de estas palabras está en la lección 11, y cómo colacionar, en la lección 12.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-13-01.svg",
        alt: "Árbol de decisión: identificar destinatario; pedir repetición si el mensaje está incompleto, confirmar si hay duda, decir unable si no puede cumplirse, o colacionar, verificar y actuar solo dentro de lo autorizado.",
        ancho: 1200,
        alto: 1500,
        pie: "Primero entiende y verifica; luego actúa dentro de lo autorizado. SAY AGAIN pide repetir, CONFIRM aclara un dato y UNABLE comunica que no puede cumplir. STANDBY no concede permiso. Amplía el diagrama para seguir cada salida.",
      },
      { kind: "sub", text: "De la transmisión a la acción" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Escuchar sin completar huecos.** Distintivo propio; acción, valor, límite y condición anotados.",
          "**Resolver la duda antes de actuar.** SAY AGAIN si faltó un tramo; CONFIRM si duda de un valor.",
          "**Evaluar si se puede cumplir.** Si no, UNABLE con un motivo breve.",
          "**Colacionar y contrastar** con lo anotado (lección 12).",
          "**Configurar y ejecutar** solo dentro de lo autorizado. La colación no amplía la autorización.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-13-02.webp",
        alt: "Historieta de cuatro viñetas: el controlador transmite desde la torre, la tripulación anota, detecta que no puede cumplir y verifica en cabina una alternativa antes de actuar.",
        ancho: 1536,
        alto: 1024,
        pie: "Situación didáctica, no una transcripción: 1) el controlador transmite; 2) la tripulación anota y coteja; 3) detecta una limitación y comunica UNABLE, sin mover el avión; 4) verifica la alternativa recibida antes de configurar. Amplía la historieta para distinguir el papel de cada persona.",
      },
      {
        kind: "enLaOperacion",
        momento: "Una autorización que no era la esperada",
        texto: "Quien recibe la autorización registra límite y restricciones; el otro piloto compara con la preparación. Si hay duda, se confirma **antes** de colacionar el dato como cierto; si hay imposibilidad, UNABLE y el motivo. Mientras llega la alternativa, el avión sigue detenido.",
      },
      {
        kind: "callout",
        tone: "verificar",
        text: "Fraseología y alcance tomados de ediciones anteriores del Doc 4444 y el Doc 9432: confirma la edición vigente y la eAIP de Aerocivil.",
      },
      { kind: "sub", text: "Errores que cambian el resultado" },
      error("Empezar un movimiento tras STANDBY o tras transmitir una solicitud todavía no aprobada."),
      error("Colacionar un valor dudoso para «salir del paso» y pedir confirmación solo después de seleccionarlo."),
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
        etiqueta: "Más detalle",
        cita: "Doc 4444 4.5.1 · Doc 9432 2.6",
        bloques: [
          {
            kind: "p",
            text: "Una **autorización del control de tránsito aéreo** (ATC, air traffic control; en inglés, ATC clearance) permite que una aeronave proceda en las condiciones especificadas por una dependencia de control. El término puede calificarse según la fase: autorización de rodaje, despegue, salida, ruta, aproximación o aterrizaje. No es una licencia genérica para hacer cualquier cosa durante esa fase (Doc 4444, capítulo 1, y Doc 9432, 1.1, ediciones consultadas).",
          },
          {
            kind: "p",
            text: "En una misma frecuencia se mezclan mensajes con efectos distintos. La pregunta útil no es solo «¿qué palabra usó el controlador?», sino «¿qué acción concreta quedó autorizada, ordenada o todavía pendiente?». Las respuestas de la tabla no reemplazan los requisitos de colación de la lección 12.",
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
          { kind: "sub", text: "Otros errores frecuentes" },
          { kind: "list", items: [
            "Tratar información de tránsito o meteorología como si concediera un nuevo permiso.",
            "Aceptar una restricción que el avión no puede cumplir y avisar cuando ya no hay margen.",
            "Seguir hacia el límite anterior después de una modificación de la autorización.",
          ] },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "OACI Doc 4444 · Doc 9432 · FAA AIM 4-4",
        bloques: [
          { kind: "sub", text: "Base consultada" },
          { kind: "p", text: "Doc 4444, 15.ª edición con Enmienda 4, capítulo 1 y apartados 4.5.1.2 a 4.5.1.3, 4.5.7.4.2 y 4.5.7.5 (edición histórica consultada); Doc 9432, 4.ª edición, apartados 1.1, 2.6 y 2.8.3. Como contraste, la guía estadounidense vigente FAA Aeronautical Information Manual, sección 4-4, explica alcance de autorizaciones y responsabilidad del piloto; no sustituye reglas colombianas." },
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
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "La autorización IFR (Instrument Flight Rules) es el punto de partida del recorrido autorizado: límite, ruta, salida y niveles, más las restricciones que se transmitan. No termina al colacionarla: los dos pilotos la confrontan con el plan, el desempeño y la preparación antes de moverse.",
      },
      { kind: "sub", text: "Qué recibe realmente la tripulación" },
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
        text: "**Un nivel previsto no es un nivel autorizado.** El nivel de crucero del plan sirve para planear, pero no habilita a abandonar el nivel inicial asignado. Y el límite de autorización puede estar antes del destino.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-14-01.svg",
        alt: "Hoja de copiado de autorización IFR sin datos inventados: límite, ruta y salida, nivel y restricciones, datos adicionales; al lado, preguntas de verificación de los dos pilotos.",
        ancho: 1600,
        alto: 1100,
        pie: "Esta plantilla didáctica no es un formato obligatorio ni contiene una autorización real. Registra solo lo que ATC transmitió y deja visible lo pendiente; después comprueba límite, ruta, nivel y restricciones con el otro piloto antes de configurar o moverte. Amplíala para leer las preguntas de cada casilla.",
      },
      { kind: "sub", text: "Copiar, colacionar y verificar" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Preparar** hoja y documentación antes de llamar.",
          "**Escribir** en el orden real en que llega. Una casilla vacía es «no anotado», no «usar lo esperado».",
          "**Aclarar** antes de colacionar como cierto; luego **colacionar** con el distintivo (lección 12).",
          "**Verificar** con el otro piloto contra ruta presentada, publicación vigente y FMS. Se configura el FMS según la autorización, no al revés.",
        ],
      },
      {
        kind: "p",
        text: "CRAFT (clearance limit, route, altitude, frequency, transponder) es una ayuda de copiado, no una lista OACI: una restricción o condición no desaparece porque no encaje en cinco letras.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-14-02.webp",
        alt: "Historieta de cuatro viñetas: control transmite desde la torre, un piloto copia la autorización, ambos comparan con el plan y se pide aclaración antes de la salida.",
        ancho: 1536,
        alto: 1024,
        pie: "Secuencia didáctica, no transcripción real: 1) control transmite; 2) un piloto anota; 3) ambos detectan una diferencia frente a lo preparado; 4) piden aclaración antes de seleccionar valores o mover el avión. Los papeles están deliberadamente en blanco: no representan una carta, ruta, nivel o frecuencia vigentes. Amplía la historieta.",
      },
      {
        kind: "enLaOperacion",
        momento: "Antes de solicitar puesta en marcha",
        texto: "Quien copió lee límite, ruta, salida, nivel y restricciones; el otro los confronta con la documentación y el FMS. Lo que no se entiende o no se puede cumplir se resuelve con ATC antes de moverse. La autorización de ruta no concede retroceso, rodaje, entrada en pista ni despegue.",
      },
      {
        kind: "callout",
        tone: "verificar",
        text: "El caso «as filed» es de la FAA (AIM 5-2-6): en Colombia, confirma ruta, salida y niveles en la eAIP de Aerocivil y el SOP del operador.",
      },
      { kind: "sub", text: "Errores que cambian la salida" },
      error("Programar el nivel de crucero solicitado como si fuera el nivel inicial autorizado."),
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
        etiqueta: "Más detalle",
        cita: "Doc 9432 2.8.3 · FAA AIM 5-2-6",
        bloques: [
          {
            kind: "p",
            text: "La autorización de ruta puede ser extensa o abreviada según el procedimiento aplicable y lo que control necesite modificar. El Manual de radiotelefonía de la Organización de Aviación Civil Internacional (OACI, International Civil Aviation Organization), Doc 9432, 2.8.3.1, muestra esa variación. El límite de autorización no siempre coincide con el destino: puede ser un punto intermedio. Si lo es, la tripulación identifica dónde termina el permiso actual y no presupone que puede continuar por el resto del plan presentado.",
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
            text: "El Doc 9432, 2.8.3.2 a 2.8.3.3, de la edición consultada recomienda transmitir la autorización con tiempo para copiarla y no durante la alineación o el despegue; además distingue una autorización de ruta del permiso para entrar en una pista o despegar. Por eso se prepara la hoja antes de llamar, se copia sin improvisar y se resuelven dudas antes de que la carga de trabajo crezca en superficie.",
          },
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
          { kind: "sub", text: "Otros errores frecuentes" },
          { kind: "list", items: [
            "Cargar la salida del briefing sin confirmar que coincide con la autorización y la publicación vigente.",
            "Colacionar de memoria, ocultando una cifra o condición que se anotó mal.",
            "Rellenar una casilla vacía con el plan presentado en vez de confirmar qué transmitió control.",
          ] },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "OACI Doc 4444 · Doc 9432 · FAA AIM 5-2-6",
        bloques: [
          { kind: "sub", text: "Base consultada" },
          { kind: "p", text: "Doc 4444, 15.ª edición con Enmienda 4, apartados 4.5.3.1, 4.5.4.2 y 4.5.7.1 a 4.5.7.5 (edición histórica consultada); Doc 9432, 4.ª edición, apartados 2.8.3.1 a 2.8.3.3. Como contraste, FAA Aeronautical Information Manual vigente, sección 5-2-6 (https://www.faa.gov/air_traffic/publications/aim_html/chap5_section_2.html), sobre autorización abreviada, ruta presentada y nivel; es guía estadounidense, no regla colombiana." },
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
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "Puesta en marcha, empuje y rodaje son permisos distintos. Antes de encender o mover el avión, la tripulación sabe qué dependencia gestiona cada paso en ese aeropuerto (ATC o plataforma), qué respuesta recibió exactamente y si el personal de tierra está listo. La aprobación de encendido no aprueba el empuje, y la de empuje no reemplaza la coordinación por interfono.",
      },
      { kind: "sub", text: "Lo que se recibió y lo que permite" },
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
        kind: "callout",
        tone: "verificar",
        text: "Estas frases son de la fraseología EASA (AMC1 SERA.14001, 1.4.3 y 1.4.4): en Colombia, confirma dependencia y procedimiento en la eAIP de Aerocivil y el SOP.",
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
          "**Preparar** autorización de ruta, información de salida y configuración; confirmar con tierra que el equipo está listo.",
          "**Llamar a la dependencia correcta** según la AIP del aeródromo y el briefing, e **identificar el estado recibido**: aprobación, hora, hora prevista, discreción o espera.",
          "**Coordinar con tierra** área, tractor, frenos e inicio real de la maniobra. Ante una duda, no iniciar o detener.",
          "**Cerrar** con frenos puestos, desconexión y señal de libre. El rodaje necesita su propia autorización.",
        ],
      },
      {
        kind: "p",
        text: "Radio con ATC, interfono con tierra y conversación entre pilotos no se sustituyen: el controlador no da las órdenes internas al tractor, y una aprobación no garantiza que el área esté físicamente libre.",
      },
      {
        kind: "enLaOperacion",
        momento: "Antes de liberar frenos",
        texto: "El piloto que atiende la radio confirma el estado de la aprobación y el otro vigila configuración y entorno. Ambos acuerdan con el jefe de empuje quién da cada aviso y cómo se detiene la maniobra. Si algo no se entendió, se pregunta antes de mover.",
      },
      { kind: "sub", text: "Errores que importan" },
      error("Interpretar una hora prevista de puesta en marcha como aprobación automática al llegar ese minuto."),
      error("Mover el avión con STAND BY o con una demora prevista."),
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
        etiqueta: "Más detalle",
        cita: "EASA AMC1 SERA.14001 1.4.3 a 1.4.4 y 5.1",
        bloques: [
          {
            kind: "p",
            text: "La solicitud de puesta en marcha puede incluir el puesto y el acuse del servicio automático de información terminal (ATIS, Automatic Terminal Information Service), si existe. La solicitud de empuje identifica la posición de la aeronave. La dependencia que atiende cada llamada puede ser control de tránsito aéreo (ATC, air traffic control) o gestión de plataforma, según el aeródromo; no se deduce de una historieta ni se reutiliza de otro aeropuerto. La aprobación de encendido no constituye por sí sola aprobación de empuje, y la aprobación de empuje tampoco reemplaza la coordinación por interfono con el equipo que conduce el tractor.",
          },
          {
            kind: "p",
            text: "Las expresiones de la tabla aparecen en la fraseología publicada por la Agencia de la Unión Europea para la Seguridad Aérea (EASA, European Union Aviation Safety Agency), en el apéndice de medios aceptables de cumplimiento (AMC, Acceptable Means of Compliance) de las Reglas Europeas Estandarizadas del Aire (SERA, Standardised European Rules of the Air), apartados 1.4.3 y 1.4.4, revisión de agosto de 2025. Son una referencia documental para reconocer el cambio de estado, no una instrucción para operar en Colombia. Aquí, quién emite la aprobación, a quién se llama y qué dirección de empuje procede se confirma en la publicación local y en los procedimientos operacionales normalizados (SOP, standard operating procedures) del operador.",
          },
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
          { kind: "sub", text: "Otros errores frecuentes" },
          { kind: "list", items: [
            "Tratar la aprobación de empuje como autorización simultánea de rodaje o como confirmación de frenos liberados.",
            "Suponer que control de plataforma, control terrestre y personal de tierra tienen la misma función en todos los aeródromos.",
            "Iniciar el empuje sin confirmar la comunicación con el equipo que opera el tractor.",
          ] },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "EASA SERA.14001 · OACI Doc 9432 · FAA AIM 5-2-3",
        bloques: [
          { kind: "sub", text: "Documentos consultados" },
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, revisión de agosto de 2025, Appendix 1 to AMC1 SERA.14001, apartados 1.4.3 a 1.4.4 y 5.1.1 a 5.1.2 (https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299). OACI Doc 9432, 4.ª edición, apartados 4.2 a 4.3, como referencia histórica consultada. FAA Aeronautical Information Manual vigente, 5-2-3 (https://www.faa.gov/air_traffic/publications/aim_html/chap5_section_2.html), sobre contacto previo al encendido en operaciones estadounidenses." },
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
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "Una autorización de rodaje es una ruta y una sucesión de límites: por dónde avanzar, dónde detenerse y qué pista no se puede ocupar sin una instrucción propia. Antes de mover, los dos pilotos ubican todo eso en la carta vigente.",
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
        kind: "figura",
        src: "/modulos/comunicaciones/CM-16-02.webp",
        alt: "Historieta fotográfica en cuatro paneles: tripulación escucha, controlador responde, aeronave permanece detenida y los pilotos contrastan la carta.",
        ancho: 1672,
        alto: 941,
        pie: "Secuencia didáctica, no transcripción ni representación de un aeropuerto real: 1) un piloto atiende la radio mientras el otro sigue la ruta; 2) control emite o aclara la instrucción; 3) ante el límite o una duda, la aeronave permanece detenida; 4) ambos pilotos verifican la instrucción contra la carta antes de continuar. La carta dibujada en la imagen no es utilizable para navegar. Amplía la imagen para leer la secuencia visual.",
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
      {
        kind: "enLaOperacion",
        momento: "Antes de cada cruce de pista",
        texto: "El PF mantiene la trayectoria y no rebasa el límite; el PM confirma que la pista que nombró ATC coincide con la señalización y la carta. Si cualquiera duda de la posición o de la autorización, se detienen y preguntan: la duda se resuelve con el avión quieto.",
      },
      {
        kind: "callout",
        tone: "verificar",
        text: "Frases EASA y guía FAA citadas como referencia: el rodaje de un aeropuerto colombiano se confirma en la eAIP de Aerocivil, la instrucción de ATC y el SOP.",
      },
      { kind: "sub", text: "Errores que importan" },
      error("Tratar el punto de espera final como permiso para cruzar una pista intermedia."),
      error("Seguir al avión precedente a la pista sin una autorización propia."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "La ruta de rodaje no concede entrada ni cruce de pista.",
          "Cada cruce exige instrucción explícita con la pista y su colación (lección 12).",
          "La pista queda libre cuando todo el avión pasó la marca de espera.",
          "Una duda de posición se resuelve con el avión detenido.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        cita: "EASA AMC1 SERA.14001 · FAA AIM 4-3-18",
        bloques: [
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
            kind: "p",
            text: "La fraseología publicada por la Agencia de la Unión Europea para la Seguridad Aérea (EASA, European Union Aviation Safety Agency) diferencia TAXI TO HOLDING POINT, HOLD SHORT OF RUNWAY, CROSS RUNWAY y HOLD POSITION. Su apéndice de fraseología es una referencia verificable para estudiar el significado de estas instrucciones, no una publicación local colombiana. La publicación de información aeronáutica (AIP, Aeronautical Information Publication) vigente, el procedimiento del operador y la autorización recibida determinan el rodaje de un aeropuerto concreto.",
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
          { kind: "sub", text: "Otros errores frecuentes" },
          { kind: "list", items: [
            "Omitir el HOLD SHORT en la colación y confiar en que el controlador detectará el error.",
            "Informar pista libre mientras parte de la aeronave permanece en el área protegida.",
            "Seguir rodando mientras se intenta resolver una duda de posición o de ruta.",
          ] },
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
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "Proteger una pista es distinguir cuatro estados: esperar fuera, alinearse, permanecer alineado y despegar. Ninguno nace del anterior. Empezar la carrera tras LINE UP AND WAIT, por expectativa, es un error documentado (FAA, AIM 5-2-5).",
      },
      { kind: "sub", text: "Cada frase cambia un permiso distinto" },
      {
        kind: "table",
        head: ["Frase recibida", "Estado autorizado", "Límite que permanece"],
        rows: [
          ["HOLD SHORT OF RUNWAY", "Esperar antes del punto de espera de la pista identificada.", "No entrar ni cruzar la pista."],
          ["CROSS RUNWAY", "Cruzar la pista identificada y salir de ella.", "No alinearse para despegar ni cruzar otra pista."],
          ["LINE UP AND WAIT", "Entrar en la pista asignada, alinearse y esperar.", "No iniciar la carrera de despegue."],
          ["CLEARED FOR TAKE-OFF", "Iniciar el despegue en la pista autorizada, si el avión y la tripulación están listos.", "No sustituye la evaluación de seguridad, configuración ni pista correcta."],
          ["CONTINUE APPROACH", "Continuar la aproximación mientras se espera la decisión posterior.", "No aterrizar sin autorización de aterrizaje."],
          ["CLEARED TO LAND", "Aterrizar en la pista autorizada, si sigue siendo seguro.", "No obliga a aterrizar si la pista está ocupada o el aterrizaje deja de ser seguro."],
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-17-01.svg",
        alt: "Tres estados de seguridad de pista: esperar fuera, alinearse y esperar, despegar solo después de una autorización separada.",
        ancho: 1600,
        alto: 850,
        pie: "Modelo de estados, no una carta de aeródromo: HOLD SHORT conserva el avión fuera; LINE UP AND WAIT autoriza a alinearse, pero no a iniciar la carrera; CLEARED FOR TAKE-OFF es una autorización posterior que debe corresponder al indicativo y a la pista correctos. La secuencia visual no representa un procedimiento local colombiano.",
      },
      {
        kind: "p",
        text: "**Condicionales.** OACI y EASA admiten «alinearse detrás del tránsito en final», con la condición colacionada; la FAA no las usa para LINE UP AND WAIT. Si no identificas ese tránsito, pide aclaración.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-17-02.webp",
        alt: "Historieta de cuatro paneles con dos pilotos y un controlador: escuchar, emitir instrucción, contrastar y pedir aclaración antes de actuar.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no transcripción: 1) la tripulación registra la instrucción; 2) torre responde; 3) ambos pilotos comparan lo escuchado con el estado del avión; 4) ante una duda, el piloto confirma por radio mientras el otro sigue verificando. No hay pista, carta, frecuencia ni procedimiento local representado en las viñetas. Amplía la imagen para ver cada interlocutor.",
      },
      { kind: "sub", text: "Caso de entrenamiento: la autorización que se esperaba oír" },
      {
        kind: "escenario",
        titulo: "Alineados, pero sin autorización de despegue",
        situacion: "Simulación didáctica sin indicativo ni aeropuerto inventados: la tripulación recibió y colacionó LINE UP AND WAIT para la pista asignada. El avión precedente despega. Uno de los pilotos dice que «ya nos toca» mientras el otro no recuerda haber escuchado CLEARED FOR TAKE-OFF para su indicativo.",
        preguntas: [
          {
            q: "¿Cuál es la decisión correcta antes de aplicar potencia?",
            a: "Mantener la aeronave alineada y en espera. El piloto que atiende la radio solicita confirmación de la autorización para su indicativo y pista; ambos verifican la respuesta completa. La salida del tráfico anterior no modifica por sí sola el permiso.",
          },
          {
            q: "¿Qué cambia si se oye un indicativo casi igual al propio?",
            a: "No se actúa por parecido. Se confirma el destinatario de la transmisión con torre y se colaciona el indicativo propio. El AIM de la FAA recomienda pedir confirmación antes de iniciar la carrera cuando existe incertidumbre sobre a quién iba dirigida la autorización.",
          },
        ],
        concepto: "La expectativa de salida nunca reemplaza una autorización explícita y verificada.",
      },
      {
        kind: "enLaOperacion",
        momento: "Antes de entrar, despegar o aterrizar",
        texto: "El PF vigila trayectoria y pista; el PM escucha el distintivo y la autorización. Ambos confirman el cambio de estado; una orden para otro avión o una frase cortada es motivo para esperar y preguntar. La llegada (CONTINUE APPROACH) está en la lección 29.",
      },
      {
        kind: "callout",
        tone: "verificar",
        text: "Las condicionales cambian entre Estados: en Colombia, confirma en la eAIP de Aerocivil y el SOP.",
      },
      { kind: "sub", text: "Errores que importan" },
      error("Iniciar la carrera tras LINE UP AND WAIT porque la pista parece libre."),
      error("Reaccionar a una autorización emitida para un indicativo parecido."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "HOLD SHORT mantiene fuera; LINE UP AND WAIT permite alinearse y esperar.",
          "Solo CLEARED FOR TAKE-OFF, con tu distintivo y tu pista, autoriza la carrera.",
          "Una condición sobre tránsito se identifica y se colaciona donde esté permitida.",
          "La seguridad observada puede exigir detenerse aunque haya autorización.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        cita: "OACI Doc 9870 · EASA SERA.8015 · FAA AIM 5-2-5",
        bloques: [
          { kind: "sub", text: "Del punto de espera a la carrera" },
          {
            kind: "list",
            ordered: true,
            items: [
              "**Antes de entrar.** Ambos pilotos comprueban el indicativo llamado, el número de pista, la entrada o intersección si aplica y el tipo exacto de instrucción. La señalización exterior y la carta vigente deben concordar con la autorización; la duda se aclara con el avión detenido.",
              "**Al recibir LINE UP AND WAIT.** Se colaciona la instrucción conforme a la fraseología aplicable, se verifica el entorno y se entra solo a la pista autorizada. La aeronave queda alineada y esperando. Que el tráfico anterior haya salido, o que la tripulación esté lista, no genera un permiso de despegue.",
              "**Durante la espera.** Se mantiene escucha de torre y vigilancia de la pista y las aproximaciones. Una transmisión para un indicativo parecido no se acepta como propia. Si la espera, el tráfico o una instrucción no concuerdan con lo previsto, se consulta a control de tránsito aéreo (ATC, air traffic control).",
              "**Al recibir CLEARED FOR TAKE-OFF.** Ambos pilotos comprueban indicativo, pista e instrucción; solo entonces, y si la operación es segura, inician la secuencia de despegue según los procedimientos operacionales normalizados (SOP, standard operating procedures) del operador. Si la autorización no se oyó completa, no se completa por expectativa: se pide confirmación.",
              "**Si cambia el estado.** HOLD POSITION, CANCEL TAKE-OFF u otra instrucción urgente exige atención inmediata, pero la respuesta física de la tripulación durante una carrera ya iniciada se rige por el estado del avión, la velocidad y el SOP. La radio avisa del peligro; no sustituye el juicio operacional ni una maniobra de rechazo bien entrenada.",
            ],
          },
          { kind: "sub", text: "Dos referencias oficiales que no son idénticas" },
          {
            kind: "p",
            text: "El Manual sobre la Prevención de Incursiones en la Pista de la Organización de Aviación Civil Internacional (OACI, International Civil Aviation Organization), Doc 9870, incluye un ejemplo **publicado con fines de fraseología**: un indicativo SAS 941 recibe una instrucción de alinearse detrás de un DC-9 en final corta; la condición se repite en la colación. No es una grabación ni prueba de que ese vuelo haya ocurrido. La guía de la Agencia de la Unión Europea para la Seguridad Aérea (EASA, European Union Aviation Safety Agency) conserva un ejemplo de esa estructura y exige reconocer el tránsito que condiciona la autorización. Si no se identifica con certeza, el piloto no declara que lo tiene a la vista y solicita aclaración.",
          },
          {
            kind: "p",
            text: "La FAA, en cambio, instruye a sus controladores a **no usar** frases condicionales del tipo «detrás del tráfico que aterriza» para LINE UP AND WAIT. Por eso sería incorrecto enseñar una única frase condicional como válida en todos los Estados. Para una operación concreta, la tripulación consulta la publicación de información aeronáutica (AIP, Aeronautical Information Publication) vigente, los procedimientos locales y la frase efectivamente recibida; para Colombia, solo la eAIP de Aerocivil sirve para afirmar datos o requisitos locales actuales.",
          },
          {
            kind: "table",
            head: ["Documento", "Lo que muestra", "Cómo se usa en esta lección"],
            rows: [
              ["OACI Doc 9870, apéndice A", "Ejemplo editorial de autorización condicional y colación de la condición.", "Analizar orden e identificación; no presentarlo como audio real ni como regla colombiana vigente."],
              ["EASA SERA.8015, material guía", "Ejemplo europeo de condición antes de alinearse detrás de tráfico identificado.", "Comparar el papel de la condición; verificar aplicabilidad local antes de usarla."],
              ["FAA AIM 5-2-5 y orden JO 7110.65", "LINE UP AND WAIT no autoriza despegue; en Estados Unidos se prohíben esas frases condicionales para esa instrucción.", "Evitar trasladar automáticamente una práctica de una jurisdicción a otra."],
            ],
          },
          { kind: "sub", text: "La misma disciplina al llegar" },
          {
            kind: "p",
            text: "CONTINUE APPROACH y CLEARED TO LAND figuran como instrucciones distintas en la fraseología EASA. La primera mantiene la aproximación; no autoriza tocar la pista. Si la autorización de aterrizaje no llega a tiempo para una continuación segura, la tripulación solicita aclaración y ejecuta la maniobra correspondiente conforme a sus mínimos, condiciones y SOP. Además, el AIM de la FAA recuerda que una autorización de aterrizaje no obliga a aterrizar sobre una pista ocupada: la vigilancia visual y la decisión de seguridad siguen en la cabina.",
          },
          { kind: "sub", text: "Otros errores frecuentes" },
          { kind: "list", items: [
            "Aceptar una condición sobre tráfico que no se ha identificado con certeza.",
            "Suponer que una autorización condicional publicada por OACI/EASA se usa igual en Estados Unidos o Colombia.",
            "Aterrizar solo con CONTINUE APPROACH o continuar pese a una pista ocupada.",
          ] },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "OACI Doc 9870 · EASA SERA · FAA AIM y JO 7110.65",
        bloques: [
          { kind: "sub", text: "Documentos consultados" },
          { kind: "p", text: "OACI, Manual on the Prevention of Runway Incursions, Doc 9870, apéndice A, apartados 2.5 a 2.7 y 3.1 a 3.2 (https://www.icao.int/sites/default/files/Aerodromes/RunwaySafety/ICAO_manual_prev_RI.pdf). Es un documento histórico oficial para entender la estructura de la fraseología, no una actualización local. EASA, Easy Access Rules for Standardised European Rules of the Air, GM1 SERA.8015(ec) y Appendix 1 to AMC1 SERA.14001 (https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9888 y https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299). FAA, AIM 5-2-5 (https://www.faa.gov/air_traffic/publications/aim_html/chap5_section_2.html), Pilot Best Practices for Airfield Safety (https://www.faa.gov/airports/runway_safety/pilots/best_practices) y orden JO 7110.65, 3-9-4 (https://www.faa.gov/air_traffic/publications/atpubs/atc_html/chap3_section_9.html)." },
          { kind: "sub", text: "Límite de aplicación" },
          { kind: "list", items: [
            "El ejemplo SAS 941 / DC-9 es un ejemplo publicado por OACI para enseñar la estructura; no una transcripción verificada de un vuelo real.",
            "Los procedimientos de Estados Unidos y Europa se contrastan expresamente y no se atribuyen a la reglamentación colombiana.",
            "Antes de una operación en Colombia, consultar eAIP de Aerocivil, SOP del operador y autorización real de ATC. Ninguna imagen de esta lección equivale a una carta ni a una orden de control.",
          ] },
        ],
      },
    ],
  },

  // ── 18 ──────────────────────────────────────────────────────────────────
  {
    n: 18,
    title: "Despegue",
    kicker: "De READY a CLEARED FOR TAKE-OFF y al primer contacto en el aire",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "El despegue es una transición: avión preparado, pista protegida, autorización explícita y una tripulación que puede rechazar la salida si deja de ser segura. La diferencia entre LINE UP AND WAIT y CLEARED FOR TAKE-OFF la viste en la lección 17; aquí va el resto de la secuencia.",
      },
      { kind: "sub", text: "La palabra decisiva" },
      {
        kind: "p",
        text: "TAKE-OFF se reserva para la autorización de despegue o su cancelación. Para decir que el avión está listo se usa READY. Así, una transmisión cortada que contenga TAKE-OFF no puede parecer una autorización.",
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-18-01.svg",
        alt: "Secuencia conceptual de cuatro estados desde READY hasta contacto con salida, con una autorización de despegue explícita antes de la carrera.",
        ancho: 1600,
        alto: 850,
        pie: "Mapa de permisos, no carta ni autorización: READY informa preparación; LINE UP AND WAIT permite entrar y esperar; solo CLEARED FOR TAKE-OFF cambia el estado a salida autorizada. El contacto posterior con Salida depende de la instrucción recibida y del procedimiento publicado; no se presupone una frecuencia.",
      },
      { kind: "sub", text: "Leer la frase, no completar lo que falta" },
      {
        kind: "kv",
        items: [
          { k: "READY", v: "Informa que el avión está listo. No autoriza entrar ni despegar." },
          { k: "LINE UP. BE READY FOR IMMEDIATE DEPARTURE", v: "Alinearse y estar listo para salir sin demora. No es despegue." },
          { k: "RUNWAY (number) CLEARED FOR TAKE-OFF", v: "Comenzar la salida si es seguro. Se colaciona pista y autorización." },
          { k: "HOLD POSITION, CANCEL TAKE-OFF", v: "Retira la autorización antes de la carrera." },
          { k: "STOP IMMEDIATELY", v: "Detener una carrera ya iniciada, según el estado del avión y el SOP." },
        ],
      },
      {
        kind: "figura",
        src: "/modulos/comunicaciones/CM-18-02.webp",
        alt: "Historieta fotográfica de cuatro paneles: tripulación preparada, controlador en torre, verificación cruzada y carrera de despegue.",
        ancho: 1672,
        alto: 941,
        pie: "Historieta didáctica, no registro de un vuelo: 1) PF y PM terminan la preparación; 2) torre coordina el tránsito; 3) la tripulación confirma indicativo, pista e instrucción antes de actuar; 4) solo después de una autorización entendida se inicia la carrera. La imagen no representa una pista, señal, frecuencia ni procedimiento colombiano concreto.",
      },
      { kind: "sub", text: "Caso de entrenamiento: un minuto que no obliga a salir" },
      {
        kind: "escenario",
        titulo: "Listos en secuencia, pero la configuración cambia",
        situacion: "Simulación didáctica sin indicativo, ruta, pista ni frecuencia inventados. La tripulación había informado READY y recibió LINE UP AND WAIT. Mientras espera, aparece una indicación que obliga a repetir una lista antes de poder despegar. La torre pregunta si puede aceptar salida inmediata.",
        preguntas: [
          {
            q: "¿Qué debe comunicar la tripulación y qué permiso tiene mientras tanto?",
            a: "Comunica que no puede aceptar la salida inmediata y que necesita tiempo; mantiene el avión en espera dentro del límite de la instrucción vigente. No afirma estar listo ni inicia la carrera. Si no puede permanecer en pista, coordina con torre la acción siguiente; la tripulación no se autoriza por sí misma a rodar o despegar.",
          },
          {
            q: "¿Qué cambia si después oye la autorización de despegue, pero no entendió una restricción de salida?",
            a: "No completa de memoria la restricción ni aplica potencia. El PM pide repetición o aclaración y ambos pilotos verifican la autorización completa frente a la ruta, la pista y la capacidad del avión. La autorización de despegue no convierte una restricción inaudible o imposible en ejecutable.",
          },
        ],
        concepto: "Preparación, alineación y autorización de despegue son estados distintos; una discrepancia exige comunicarla antes de actuar.",
      },
      {
        kind: "enLaOperacion",
        momento: "Antes de aplicar potencia",
        texto: "El PM comprueba distintivo, pista e instrucciones de salida frente a lo seleccionado; el PF confirma pista y configuración. Tras despegar, primero se vuela el avión; el cambio a Salida se hace cuando lo instruye ATC o lo fija el procedimiento publicado.",
      },
      {
        kind: "callout",
        tone: "verificar",
        text: "Frases de la fraseología EASA (AMC1 SERA.14001, 1.4.10 a 1.4.12): pista, reportes y transferencia en Colombia se confirman en la eAIP de Aerocivil y el SOP.",
      },
      { kind: "sub", text: "Errores que importan" },
      error("Informar READY antes de completar listas, configuración o verificación de pista."),
      error("Priorizar una respuesta por radio sobre el control del avión durante un rechazo o una anomalía en carrera."),
      {
        kind: "summary",
        title: "En pocas palabras",
        items: [
          "READY informa preparación; no autoriza movimiento.",
          "TAKE-OFF solo se oye en la autorización o en su cancelación.",
          "Pista, distintivo y restricciones se verifican antes de la carrera.",
          "Tras despegar, la transferencia sigue la instrucción y el procedimiento vigentes.",
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Más detalle",
        cita: "EASA AMC1 SERA.14001 · FAA AIM 5-2-5",
        bloques: [
          {
            kind: "p",
            text: "El despegue no es una sola llamada: es una transición entre una aeronave preparada, una pista protegida, una autorización explícita y una tripulación que conserva la capacidad de rechazar la salida si deja de ser segura. Aquí se sigue esa secuencia desde el punto de espera hasta el contacto con la dependencia de salida. Las frases publicadas por la Agencia de la Unión Europea para la Seguridad Aérea (EASA, European Union Aviation Safety Agency) se usan como **referencia documental de fraseología europea**, no como transcripciones ni como procedimiento colombiano.",
          },
          {
            kind: "p",
            text: "En radiotelefonía, TAKE-OFF se reserva para la autorización de despegue o su cancelación. Para avisar que el avión está preparado, la tabla de fraseología EASA muestra READY; el controlador puede preguntar ARE YOU READY FOR DEPARTURE? o REPORT WHEN READY FOR DEPARTURE. Así se evita que una transmisión incompleta que contiene TAKE-OFF parezca una autorización. LINE UP AND WAIT y LINE UP. BE READY FOR IMMEDIATE DEPARTURE permiten alinearse o prepararse, pero **no** iniciar la carrera. La diferencia debe escucharse y confirmarse en cabina antes de aplicar potencia.",
          },
          { kind: "sub", text: "Secuencia operacional completa" },
          {
            kind: "list",
            ordered: true,
            items: [
              "**Preparación en el punto de espera.** El piloto que opera los mandos (PF, pilot flying) y el piloto que atiende y supervisa (PM, pilot monitoring) comprueban listas, configuración, performance, pista asignada, entrada prevista, autorización de ruta y restricciones iniciales. El PM informa READY solo cuando la tripulación está realmente preparada. Si hace falta tiempo, lo comunica; no responde AFFIRM por presión de secuencia.",
              "**Alineación, si se instruye.** Se identifica el indicativo y la pista, se colaciona LINE UP AND WAIT y se verifica la pista física con la documentación vigente. La salida de una aeronave precedente no convierte la espera en autorización de despegue. Una instrucción de salida inmediata exige capacidad real de ejecutarla sin demora, según el procedimiento aplicable.",
              "**Autorización específica.** La fraseología EASA publica RUNWAY (number) CLEARED FOR TAKE-OFF, opcionalmente con REPORT AIRBORNE. El PM escucha la pista y cualquier instrucción adicional, colaciona los datos críticos y ambos pilotos confrontan la autorización con la pista, el plan lateral/vertical y el estado del avión. Una frase incompleta, un indicativo parecido o una restricción imposible se aclaran antes de actuar.",
              "**Carrera y ascenso inicial.** Después de confirmar la autorización y la seguridad de la operación, la tripulación ejecuta su procedimiento operacional normalizado (SOP, standard operating procedure). El PF mantiene el control del avión y el PM supervisa las llamadas y la radio. Una instrucción ATC urgente se escucha, pero la decisión física de continuar o rechazar una carrera ya iniciada depende de velocidad, performance, situación y SOP; no se improvisa a partir de una frase genérica.",
              "**Después de estar en el aire.** Si se solicitó REPORT AIRBORNE, se notifica según corresponda. El cambio de torre a Salida se hace cuando lo instruye control o cuando el procedimiento local aplicable lo establece; ni el tiempo ni la frecuencia se infieren de esta lección. Antes de transferirse, el PM confirma a quién se llama y cuál autorización inicial permanece vigente.",
            ],
          },
          {
            kind: "table",
            head: ["Frase publicada por EASA", "Qué autoriza", "Qué debe hacer la tripulación"],
            rows: [
              ["REPORT WHEN READY [FOR DEPARTURE] / READY", "Intercambiar estado de preparación.", "Informar solo al terminar la preparación. READY no permite entrar ni despegar."],
              ["LINE UP [AND WAIT]", "Entrar en la pista y esperar.", "Confirmar indicativo y pista; no aplicar potencia de despegue."],
              ["LINE UP. BE READY FOR IMMEDIATE DEPARTURE", "Alinearse y estar preparado para una salida inmediata posterior.", "No interpretarlo como CLEARED FOR TAKE-OFF."],
              ["RUNWAY (number) CLEARED FOR TAKE-OFF", "Comenzar la salida en la pista indicada, si es seguro.", "Colacionar pista y autorización; contrastar restricciones adicionales."],
              ["HOLD POSITION, CANCEL TAKE-OFF", "Retirar una autorización antes de iniciar la carrera.", "Mantener posición y reconocer la instrucción; no continuar por haber recibido la autorización anterior."],
              ["STOP IMMEDIATELY", "Alerta para detener una carrera iniciada.", "Escucharla y ejecutar la respuesta segura conforme al estado real del avión y al SOP."],
            ],
          },
          {
            kind: "p",
            text: "EASA distingue expresamente entre cancelar una autorización cuando el avión todavía no inicia la carrera y ordenar STOP IMMEDIATELY cuando ya la inició. En un despegue rechazado por decisión propia, primero se controla y detiene el avión; después, cuando sea posible, se informa a torre el estado, posición, necesidad de asistencia y cualquier imposibilidad de liberar la pista. La tabla de fraseología contiene STOPPING como respuesta publicada, pero no prescribe por sí sola la maniobra ni reemplaza el entrenamiento de rechazo.",
          },
          { kind: "sub", text: "Transferencia a Salida sin inventar una regla universal" },
          {
            kind: "p",
            text: "Una instrucción de despegue puede ir acompañada de información o instrucciones de salida; otras llegan por separado. La tabla EASA contempla REPORT AIRBORNE y AIRBORNE (time), pero no significa que todo vuelo deba notificar hora de despegue. La Administración Federal de Aviación de Estados Unidos (FAA, Federal Aviation Administration) publica prácticas propias para el cambio de dependencia. Ninguna de esas fuentes permite afirmar que, en Colombia, un avión cambie automáticamente a una frecuencia determinada tras rotar. Se sigue la autorización real, la publicación de información aeronáutica (AIP, Aeronautical Information Publication) vigente de Aerocivil y el SOP del operador.",
          },
          {
            kind: "enLaOperacion",
            momento: "Antes de aplicar potencia y al recibir cualquier cambio",
            texto: "El PM no se limita a repetir CLEARED FOR TAKE-OFF: comprueba el indicativo, la pista, la intersección si aplica, las instrucciones de salida y la coincidencia con lo seleccionado en cabina. El PF confirma que la pista y la configuración son correctas. Si el viento o una instrucción hacen insegura la salida, la tripulación comunica la imposibilidad; una autorización ATC no elimina los límites del avión. Si la torre cancela la autorización, se detiene la secuencia y se espera una nueva instrucción. Tras despegar, la prioridad sigue siendo volar el avión y mantener la trayectoria autorizada mientras el PM gestiona la siguiente comunicación.",
          },
          { kind: "sub", text: "Otros errores frecuentes" },
          { kind: "list", items: [
            "Interpretar LINE UP AND WAIT o BE READY FOR IMMEDIATE DEPARTURE como autorización para aplicar potencia.",
            "Colacionar CLEARED FOR TAKE-OFF sin una restricción adicional recibida en la misma transmisión.",
            "Aplicar una regla de cambio automático a Salida o una frecuencia no verificada para el aeropuerto.",
          ] },
        ],
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Fuentes y alcance",
        cita: "EASA SERA.14001 · FAA AIM · ICAO Doc 9432",
        bloques: [
          { kind: "sub", text: "Documentos consultados" },
          { kind: "p", text: "EASA, Easy Access Rules for Standardised European Rules of the Air, SERA.14045(c) (https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9832), y Appendix 1 to AMC1 SERA.14001, apartados 1.4.10 a 1.4.12 (https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-10299). FAA, AIM 5-2-5 (https://www.faa.gov/air_traffic/publications/aim_html/chap5_section_2.html). Organización de Aviación Civil Internacional (OACI, International Civil Aviation Organization), Manual of Radiotelephony, Doc 9432, 4.ª edición, como referencia histórica de estructura de fraseología; no se usa aquí para afirmar que una frase esté vigente en Colombia." },
          { kind: "sub", text: "Límite de aplicación" },
          { kind: "list", items: [
            "Las frases citadas corresponden a una publicación europea; no se presentan como llamadas reales ni como regla colombiana.",
            "El escenario y la historieta son construcciones didácticas, sin pistas, rutas, aeronaves o frecuencias ficticias.",
            "La pista, el viento, la hora de reporte y el momento de transferencia solo se establecen con la autorización real, eAIP de Aerocivil y SOP aplicable.",
          ] },
        ],
      },
    ],
  },
]
