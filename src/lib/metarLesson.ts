/**
 * Contenido de la lección "Qué es un METAR y cómo leerlo".
 *
 * Referencias primarias: Anexo 3 de la OACI (21.ª edición, 2025) y manual de
 * claves para usuarios OMM N.º 782 (edición 2025). Los informes SKBO/SKRG de
 * esta lección son ejemplos didácticos, no observaciones publicadas.
 *
 * Reusa los tipos de bloque de la lección NOTAM para que las dos lecciones se
 * lean idénticas: misma hoja, mismos bloques, mismo registro.
 */

import type { LessonBlock } from "@/lib/notamLesson"
import type { DocScreen } from "@/lib/docBlocks"
import { PARTE_ATMOSFERA } from "@/lib/meteorologiaLeccion/atmosfera"
import { PARTE_AGUA } from "@/lib/meteorologiaLeccion/agua"
import { PARTE_FRENTES } from "@/lib/meteorologiaLeccion/frentes"
import { PARTE_SERVICIOS } from "@/lib/meteorologiaLeccion/servicios"

/**
 * Las lecciones del código: METAR y TAF, grupo por grupo.
 *
 * Dejan de ser la lección entera: son los niveles 4 y 5, entre la teoría y la
 * información en ruta. Los números `n` de aquí siguen contando desde 1 porque
 * son los del archivo; los de la lección se recalculan abajo, al componerla,
 * para que no haya que renumerar trece pantallas a mano cada vez que se mueve
 * una parte.
 */
const CODIGO: DocScreen[] = [
  // ── 1 ──────────────────────────────────────────────────────────────────────
  {
    n: 1,
    title: "¿Qué es un METAR?",
    kicker: "La observación del aeródromo, con hora y alcance definidos",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "**Qué ves en la portada:** un piloto y una observadora comparan el tiempo visible en un aeródromo con la información de trabajo. **Cómo lo reconoces:** hay nubosidad y lluvia a distancia, pero la imagen no proporciona valores de viento, techo ni visibilidad. **Qué decides:** consultar la observación más reciente y su hora, y contrastarla con el pronóstico y las condiciones de la operación.",
      },
      {
        kind: "p",
        text: "El **METAR** (informe meteorológico rutinario de aeródromo; Meteorological Aerodrome Report) resume una observación hecha en una hora concreta. Incluye, según corresponda, viento, visibilidad, tiempo presente, nubosidad, temperatura y presión. Puede reunir sensores automáticos y observación humana, según el aeródromo. **No es una imagen en tiempo real de toda la pista o de la ruta.**",
      },
      {
        kind: "p",
        text: "Un **SPECI** (informe meteorológico especial de aeródromo; Special Aerodrome Meteorological Report) puede emitirse cuando se cumplen criterios establecidos de cambio entre informes rutinarios. No significa por sí solo que el tiempo sea peor ni que el METAR anterior sea erróneo: compara los grupos y la hora de ambos. La frecuencia de emisión y los criterios aplicables dependen del servicio meteorológico local.",
      },
      {
        kind: "p",
        text: "**Para una selección de aerolínea y para el vuelo:** saber leer un grupo como `27010G25KT 4000 +TSRA BKN015CB` ayuda a detectar viento con ráfagas, visibilidad reducida, tormenta con lluvia fuerte y nube convectiva. Son datos de un informe ilustrativo, no una autorización para despegar. La decisión exige además mínimos, pista, procedimientos, pronóstico, avisos y condiciones actualizadas.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Cómo aprovechar esta lección",
        text: "Primero identifica aeródromo y hora de observación; luego lee cada grupo y pregúntate qué cambia en tu operación. Las lecciones siguientes desarman la clave paso a paso. El decodificador ayuda a practicar, pero no sustituye la fuente oficial ni la verificación del informe vigente.",
      },
      {
        kind: "check",
        question: "En despacho aparece un SPECI posterior al METAR de tu destino. ¿Qué haces?",
        options: [
          "Supongo que el tiempo empeoró y cancelo sin leerlo",
          "Comparo su hora y sus grupos con el METAR anterior y reevalúo la operación",
          "Ignoro el SPECI porque solo el informe de rutina sirve para planear",
        ],
        answer: 1,
        explain:
          "Un SPECI refleja una observación especial de acuerdo con criterios del servicio meteorológico. Puede señalar cambios relevantes, no necesariamente un empeoramiento. Lee la hora y los grupos que cambiaron, y revisa sus consecuencias para mínimos, pista y ruta.",
      },
      {
        kind: "reconoce",
        titulo: "De la observación al informe",
        intro: "Los instrumentos aportan parte de las mediciones; la foto no muestra un METAR real ni valores para despegar.",
        imagen: {
          src: "/modulos/meteorologia/mt-t13-01-observacion-aerodromo.webp",
          alt: "Instrumentos meteorológicos junto a un aeródromo al amanecer, con anemómetro, abrigo de sensor y precipitación distante",
          ancho: 1600,
          alto: 800,
        },
        puntos: [
          { x: 18, y: 18, que: "Anemómetro y veleta", significa: "Estos instrumentos registran velocidad y dirección del viento en el punto de medición.", piloto: "Lee el viento reportado y contrástalo con la pista prevista y la información local más reciente." },
          { x: 63, y: 68, que: "Sensor protegido", significa: "El abrigo protege la medición ambiental; la imagen no muestra ninguna temperatura numérica.", piloto: "Usa la temperatura y el punto de rocío del informe para performance y análisis meteorológico." },
          { x: 76, y: 26, que: "Lluvia distante", significa: "Se aprecia precipitación fuera de la zona de los instrumentos; una foto no dice si afecta la pista o la ruta.", piloto: "Comprueba tiempo presente, radar, avisos y tendencia antes de decidir." },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** instrumentos de superficie y lluvia distante. **Cómo lo reconoces:** el anemómetro está sobre el mástil y el sensor protegido cerca de la cerca; la cortina de lluvia queda al fondo. **Qué decides:** leer el METAR o SPECI con su hora, confirmar la evolución y no atribuir al reporte condiciones idénticas en cada punto del aeródromo.",
      },
      {
        kind: "enLaOperacion",
        momento: "Antes de cada vuelo",
        texto:
          "El METAR aporta una observación valiosa, pero tiene una hora y representa una zona limitada. Compárala con el pronóstico de aeródromo (TAF, Terminal Aerodrome Forecast), avisos, radar, información local y reportes más recientes. Si la observación difiere del pronóstico, investiga la tendencia y actualiza el plan; ningún producto, por sí solo, decide el vuelo.",
      },
    ],
  },

  // ── 2 ──────────────────────────────────────────────────────────────────────
  {
    n: 2,
    title: "La plantilla completa",
    kicker: "Lee los grupos en orden, sin inventar los que faltan",
    minutes: 5,
    blocks: [
      {
        kind: "p",
        text: "**Qué ves en la portada:** dos pilotos observan el tiempo del aeródromo antes de salir. **Cómo lo reconoces:** la imagen muestra nubosidad baja y sectores con visibilidad distinta, pero no un reporte codificado. **Qué decides:** leer el informe con su hora y contrastar cada grupo con la operación; la foto no sustituye al METAR.",
      },
      {
        kind: "p",
        text: "Los elementos de un METAR siguen un **orden definido**, pero no todos aparecen siempre. Viento, visibilidad, tiempo presente, nubes, temperatura y presión se leen en su lugar cuando corresponde; algunos grupos son condicionales o regionales. Los dos informes siguientes son **ejemplos didácticos inventados**, no reportes vigentes de Bogotá ni Rionegro.",
      },
      {
        kind: "breakdown",
        caption:
          "Ejemplo didáctico de buen tiempo: sigue el orden tipo, aeródromo, hora, viento, visibilidad, nubes, temperatura, presión y tendencia. El tiempo presente no se incluye si no hay fenómeno que reportar.",
        parts: [
          { token: "METAR", label: "tipo", detail: "Informe rutinario de aeródromo. SPECI identifica uno especial cuando el servicio lo emite." },
          {
            token: "SKBO",
            label: "estación",
            detail: "Indicador de Bogotá asignado por la Organización de Aviación Civil Internacional (OACI, International Civil Aviation Organization). El código es real; el reporte completo es inventado para enseñar.",
          },
          {
            token: "261300Z",
            label: "fecha y hora",
            detail: "Observación del día 26 a las 13:00 de tiempo universal coordinado (UTC, Coordinated Universal Time). En Colombia serían las 08:00 locales; el grupo no indica mes ni año.",
          },
          { token: "09006KT", label: "viento", detail: "Desde 090° verdaderos a 6 nudos (KT, knots). Para la componente en pista hace falta conocer la pista en uso." },
          { token: "9999", label: "visibilidad", detail: "Visibilidad predominante de 10 km o más; no significa exactamente 9.999 m ni visibilidad ilimitada." },
          {
            token: "SCT023 BKN080",
            label: "nubes",
            detail: "Nubes dispersas (SCT, scattered) con base a 2.300 ft y fragmentadas (BKN, broken) a 8.000 ft sobre el aeródromo. La primera capa que constituye techo es BKN080.",
          },
          { token: "14/09", label: "temp / rocío", detail: "Temperatura de 14 °C y punto de rocío de 9 °C; no es un techo ni una visibilidad." },
          { token: "Q1027", label: "QNH", detail: "Ajuste altimétrico QNH de 1.027 hectopascales (hPa, hectopascals). Verifica unidad y procedimiento de tu operación." },
          { token: "NOSIG", label: "tendencia", detail: "Sin cambio significativo previsto (NOSIG, no significant change) en el periodo de tendencia; no garantiza tiempo seguro para el vuelo." },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves en el ejemplo:** un reporte con visibilidad de al menos 10 km y dos capas nubosas. **Cómo lo reconoces:** `SCT` no da techo por sí sola; la primera capa `BKN` sí. **Qué decides:** comparar viento, techo y visibilidad con la pista y los mínimos aplicables, siempre con un informe real y vigente.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "El orden es tu mapa",
        text: "Si un grupo condicional no aparece, los demás conservan su secuencia relativa, pero no un número fijo de casilla. No supongas que toda omisión significa buen tiempo: puede haber datos no disponibles o un informe incompleto. Comprueba la fuente y las convenciones del Estado cuando la clave te resulte extraña.",
      },
      {
        kind: "check",
        question: "En `METAR SKBO 261300Z 09006KT 9999 SCT023 BKN080 14/09 Q1027 NOSIG`, ¿a qué hora local de Colombia se tomó la observación?",
        options: ["A las 13:00", "A las 08:00", "A las 18:00"],
        answer: 1,
        explain:
          "`261300Z` sitúa la observación el día 26 a las 13:00 UTC. Colombia usa UTC menos cinco horas, por lo que corresponde a las 08:00 locales. La `Z` indica la referencia horaria universal del informe.",
      },
      {
        kind: "p",
        text: "**Ahora un caso adverso, también inventado.** Compara su hora, los grupos nuevos y lo que cambia para un vuelo; no lo trates como un reporte actual de Rionegro.",
      },
      {
        kind: "breakdown",
        caption:
          "Segundo ejemplo didáctico: un SPECI con viento racheado, visibilidad reducida, tormenta y cumulonimbos. La tendencia al final es una previsión, no una nueva observación.",
        parts: [
          { token: "SPECI", label: "tipo", detail: "Informe especial emitido conforme a criterios del servicio; no implica por sí solo empeoramiento." },
          { token: "SKRG", label: "estación", detail: "Indicador real de Rionegro, José María Córdova; los demás grupos son simulados." },
          { token: "151740Z", label: "fecha y hora", detail: "Observación del día 15 a las 17:40 UTC; serían las 12:40 en Colombia." },
          {
            token: "27015G28KT",
            label: "viento",
            detail: "Desde 270° a 15 nudos, con ráfagas de 28. Compara viento medio y ráfagas con la pista, límites y desempeño de la aeronave.",
          },
          { token: "3000", label: "visibilidad", detail: "Visibilidad predominante de 3.000 m. No equivale automáticamente al alcance visual en pista." },
          { token: "+TSRA", label: "tiempo presente", detail: "Tormenta (TS, thunderstorm) con lluvia (RA, rain) fuerte, indicada por +. Evalúa la convección, no solo el mínimo de visibilidad." },
          {
            token: "BKN012CB",
            label: "nubes",
            detail: "Capa fragmentada con base a 1.200 ft sobre el aeródromo y cumulonimbos (CB, cumulonimbus). El reporte no delimita toda la extensión de la tormenta.",
          },
          { token: "18/17", label: "temp / rocío", detail: "Temperatura 18 °C y rocío 17 °C: aire cercano a la saturación, no prueba de niebla." },
          { token: "Q1013", label: "QNH", detail: "Ajuste altimétrico QNH de 1.013 hPa en este ejemplo." },
          {
            token: "BECMG FM1800 TL1930 4000 SHRA BKN020",
            label: "tendencia",
            detail: "Cambio gradual previsto (BECMG, becoming) entre las 18:00 (FM, from) y las 19:30 UTC (TL, till): 4 km, chubascos de lluvia y capa fragmentada a 2.000 ft. No es mejora observada.",
          },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves en el segundo ejemplo:** lluvia tormentosa, ráfagas, 3 km de visibilidad y base de cumulonimbos a 1.200 ft. **Cómo lo reconoces:** lee `G28`, `+TSRA` y `BKN012CB` juntos, no por separado. **Qué decides:** no planear la aproximación a partir de la mejora pronosticada en `BECMG`; confirma la evolución real, mínimos, alternos y procedimientos de tormenta.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿En qué orden van los grupos de un METAR?",
            respuesta:
              "Primero tipo de informe, aeródromo y hora; después viento, visibilidad, alcance visual en pista cuando se reporte, tiempo presente, nubes o CAVOK (ceiling and visibility OK), temperatura y rocío, presión y, si aparecen, información suplementaria y tendencia. Algunos grupos son condicionales; conservo el orden relativo sin inventar casillas vacías.",
            claves: ["Orden relativo definido", "Hora, viento, visibilidad y nubes", "Grupos condicionales", "Tendencia no es observación"],
          },
          {
            nivel: "interpretacion",
            q: "Un grupo no aparece en el informe. ¿Qué significa?",
            respuesta:
              "No siempre significa lo mismo. Un fenómeno de tiempo presente puede no existir, pero otros grupos solo se incluyen bajo ciertas condiciones o pueden faltar por disponibilidad de datos o formato local. Si una omisión afecta la decisión, confirmo con la fuente oficial o información local y no infiero que todo está bien.",
            claves: ["Depende del grupo y la fuente", "No rellenar datos ausentes", "Confirmar si afecta la decisión"],
          },
        ],
      },
    ],
  },

  // ── 3 ──────────────────────────────────────────────────────────────────────
  {
    n: 3,
    title: "El viento",
    kicker: "Dirección, ráfagas y cizalladura",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "**Qué ves en la portada:** una manga de viento extendida junto a un aeródromo con lluvia a distancia. **Cómo lo reconoces:** la boca ancha mira hacia el viento y la manga apunta hacia donde se desplaza el aire; su posición no proporciona una velocidad exacta. **Qué decides:** confirmar el viento reportado y el local más reciente, llevar ambos a la misma referencia que el eje de pista y comprobar componentes, ráfagas y límites aplicables.",
      },
      {
        kind: "p",
        text: "**`27010KT`**: los tres primeros dígitos son la dirección **verdadera desde donde sopla**, redondeada a decenas de grados; los siguientes, la velocidad media en nudos. Aquí: viento del oeste a 10 nudos. El grupo resume un periodo de observación: no es una medición instantánea ni asegura el mismo viento en cada punto del aeródromo.",
      },
      {
        kind: "list",
        items: [
          "**`00000KT`**: viento en calma.",
          "**`VRB03KT`**: dirección variable a 3 nudos. La clave `VRB` expresa que no se codifica una dirección única bajo los criterios del informe; no la confundas con calma.",
          "**`27010G25KT`**: la **G** indica ráfaga (gust): media de 10 nudos y valor de ráfaga reportado de 25. Evalúa cómo exige usarlo el manual y el procedimiento de tu operador; no todos los límites se comparan del mismo modo.",
          "**`240V300`**: dirección variable entre 240° y 300° cuando se cumplen los criterios de variación del reporte. Considera todo el sector, no solo la dirección media.",
          "**`WS`**: cizalladura del viento reportada (wind shear), por ejemplo `WS R28` o `WS ALL RWY`. Confirma la vigencia del aviso y los reportes locales.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Cizalladura cerca del suelo: cambia el plan",
        text: "Un cambio rápido de velocidad o dirección puede alterar la velocidad aerodinámica y la trayectoria durante despegue o aproximación. Puede tener distintas causas; `WS` no identifica por sí solo una microrráfaga. Consulta alertas y reportes recientes, evalúa evitar la zona y aplica los procedimientos de prevención y escape de tu aeronave y operador.",
      },
      {
        kind: "check",
        question:
          "En este ejercicio el eje de la pista 09 es 090° verdaderos. El METAR dice `27015G28KT`. ¿Cómo interpretas el viento?",
        options: [
          "Viento de cara de 15 nudos; las ráfagas ayudan a frenar",
          "Viento de cola: media de 15 nudos y ráfaga reportada de 28; verifico límites y procedimiento",
          "Viento cruzado puro de 28 nudos por la derecha",
        ],
        answer: 1,
        explain:
          "El viento viene **desde** 270° y, bajo la referencia verdadera fijada en el ejercicio, la pista 09 apunta a 090°: es viento de cola. El informe aporta media de 15 nudos y ráfaga de 28; comprueba cómo se aplican al límite de cola y al cálculo de aterrizaje según el manual y el operador.",
      },
      {
        kind: "infografia",
        nombre: "meteo-componente",
      },
      {
        kind: "p",
        text: "**Qué ves en el esquema:** un mismo viento favorece la cabecera 27 y perjudica la 09. **Cómo lo reconoces:** las flechas van desde el oeste hacia el este, aunque `270` nombra el lugar de donde viene el viento. **Qué decides:** para calcular componentes reales, usa la dirección exacta de la pista y convierte la referencia verdadera del METAR a la magnética de la pista, o ambas a una referencia común. El dibujo supone ejes exactamente 090°/270° verdaderos; no representa un aeródromo específico.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Aproximándote al aeródromo de destino",
        situacion:
          "El METAR trae **`31018G30KT 280V350`**. Para este ejercicio, los ejes verdaderos disponibles son 040° y 220°. El límite de viento cruzado indicado para pista seca es 33 nudos.",
        pregunta: "¿Basta con observar que 30 es menor que 33 para elegir pista?",
        claves: [
          "La media viene **desde 310°**: forma 90° con ambos ejes. Es cruzado puro por la izquierda para la 04 y por la derecha para la 22, bajo la referencia fijada en el ejercicio.",
          "La ráfaga reportada es de **30 nudos**. Una componente cruzada no puede superar la velocidad total del viento en ese instante, pero el reporte no garantiza que el viento posterior no cambie. Usa media, ráfaga y límites como indiquen el manual y el operador.",
          "Entre **280° y 350°** la componente cruzada cambia y puede aparecer componente de cola: hacia 280° en la 04, hacia 350° en la 22. Calcula ambas componentes para el rango pertinente y confirma el viento local actualizado.",
          "El límite de 33 corresponde a **pista seca en este ejemplo**. Si la pista está mojada o contaminada, consulta los límites y datos de desempeño específicos; no supongas un valor universal.",
        ],
        cierre:
          "Que 30 sea menor que 33 no resuelve la elección: también importan la componente de cola, el estado de pista, la información actual y los criterios de tu operación.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Cómo se lee el grupo de viento de un METAR?",
            respuesta:
              "Los tres primeros dígitos son la dirección verdadera desde la que sopla, redondeada a decenas de grados, y los siguientes la velocidad media en nudos. Si se reportan ráfagas aparece una G con su valor; un grupo adicional con V muestra los extremos de dirección cuando corresponde. 00000KT es calma y VRB indica dirección variable, no necesariamente calma.",
            claves: ["Dirección verdadera, desde donde sopla", "G de ráfaga", "V para el rango de variación", "VRB y calma"],
          },
          {
            nivel: "interpretacion",
            q: "¿Por qué la dirección del METAR es verdadera y no magnética?",
            respuesta:
              "El grupo de viento del METAR se codifica respecto al norte verdadero. El viento que se transmite para despegue o aterrizaje normalmente se da respecto al norte magnético, como la designación aproximada de pista. Para calcular componentes uso referencias iguales y el rumbo real publicado de la pista, no solo su número redondeado; confirmo la convención del servicio local.",
            claves: ["METAR en verdadero", "Torre en magnético", "Los rumbos de pista son magnéticos"],
          },
          {
            nivel: "situacion",
            q: "El METAR trae `WS ALL RWY`. ¿Qué significa y qué cambia?",
            respuesta:
              "Indica cizalladura reportada para todas las pistas, sin identificar por sí sola la causa ni describir exactamente el viento del momento. Reviso su vigencia, alertas y reportes recientes; considero retrasar o evitar la aproximación si la amenaza persiste y preparo las acciones de escape y alternativa según los procedimientos de la aeronave y el operador. No improviso velocidades ni configuración a partir de ese grupo aislado.",
            claves: ["Cizalladura reportada en todas las pistas", "Confirmar vigencia y alertas", "Aplicar procedimientos del operador"],
          },
        ],
      },
    ],
  },

  // ── 4 ──────────────────────────────────────────────────────────────────────
  {
    n: 4,
    title: "Visibilidad y alcance de pista",
    kicker: "Metros, millas y el RVR",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "**Qué ves en la portada:** la plataforma cercana se distingue, mientras una franja de niebla oculta parte del aeródromo. **Cómo lo reconoces:** el contraste y las luces se pierden gradualmente hacia el fondo; la foto no ofrece metros de visibilidad. **Qué decides:** consultar la observación vigente, el alcance visual de la pista prevista y los mínimos de la operación antes de elegir aproximación o alternativa.",
      },
      {
        kind: "list",
        items: [
          "**`9999`**: visibilidad predominante de 10 km o más; no significa exactamente 9.999 m ni visibilidad ilimitada.",
          "**`4000`**: visibilidad predominante de 4.000 m en el formato usado en Colombia. No describe necesariamente cada sector o cabecera.",
          "**`6SM`**: en el formato estadounidense, visibilidad en millas terrestres (SM, statute miles). Una milla terrestre equivale aproximadamente a 1.609 m.",
          "**`R28L/1200`**: alcance visual en pista (RVR, Runway Visual Range) de 1.200 m para la pista 28 izquierda. L, C y R distinguen pistas paralelas; el código no significa que un piloto en final ya ve 1.200 m en línea oblicua.",
          "El RVR puede incluir tendencia: **U** en aumento (up), **D** en disminución (down), **N** sin cambio (no change). No es un pronóstico. En el formato estadounidense puede expresarse en pies, por ejemplo `R28C/3600FT`.",
        ],
      },
      {
        kind: "p",
        text: "El RVR representa el alcance horizontal a lo largo de la pista desde el cual un piloto situado sobre su eje podría distinguir las marcas o las luces que la delimitan o identifican. Se estima con equipos próximos a la pista y considera el contraste y la intensidad luminosa. No es una foto de la aproximación ni una promesa de ver las referencias requeridas al llegar a la altura de decisión.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "El valor no autoriza por sí solo",
        text: "Cuando los mínimos aplicables están expresados en RVR, usa el valor vigente y los puntos de medición requeridos para esa pista conforme a la regulación y a los procedimientos del operador. También cuentan la aproximación publicada, ayudas y luces operativas, autorización, aeronave, tripulación y referencias visuales exigidas. Un RVR por encima del mínimo no garantiza aterrizar.",
      },
      {
        kind: "check",
        question:
          "Ejemplo didáctico: el METAR indica visibilidad predominante `0800` y `R28L/1200`. La aproximación a la 28L tiene un mínimo expresado en RVR. ¿Qué comparas primero con ese mínimo?",
        options: [
          "Los 800 m de visibilidad predominante; el RVR no sirve para la pista",
          "Los 1.200 m de RVR de la 28L; además verifico condiciones y requisitos de la operación",
          "El promedio de ambos valores: 1.000 m",
        ],
        answer: 1,
        explain:
          "Para un mínimo publicado en RVR de la 28L, compara el valor vigente de esa pista y los demás puntos exigidos por el procedimiento. `0800` describe la visibilidad predominante del aeródromo y no se promedia con el RVR. Ninguno de los dos números, aislado, autoriza continuar hasta el aterrizaje.",
      },
      {
        kind: "reconoce",
        titulo: "De la niebla al dato de pista",
        intro: "Esta escena ilustra la medición cerca de una pista; no muestra un RVR numérico ni un aeródromo real.",
        imagen: {
          src: "/modulos/meteorologia/mt-t16-01-sensor-rvr.webp",
          alt: "Representación fotográfica de sensores ópticos junto a una pista con luces y marcas que se desvanecen en la niebla",
          ancho: 1600,
          alto: 800,
        },
        puntos: [
          { x: 20, y: 35, que: "Sensores ópticos", significa: "El equipo situado junto a la pista aporta información para estimar el alcance visual; la foto no enseña una lectura real.", piloto: "Comprueba el RVR publicado para la pista y sus posiciones de medición requeridas." },
          { x: 68, y: 58, que: "Luces y marcas de pista", significa: "Son las referencias que el concepto de RVR representa a lo largo del eje de pista.", piloto: "No confundas alcance horizontal medido con las referencias visuales que debes adquirir durante la aproximación." },
          { x: 74, y: 24, que: "Niebla hacia el fondo", significa: "La pérdida de contraste ilustra visibilidad reducida, pero no permite calcular un número de metros a ojo.", piloto: "Revisa tendencia, observación reciente y alterno si la condición cambia." },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** sensores ópticos, luces de borde y marcas que se atenúan en la niebla. **Cómo lo reconoces:** los equipos están fuera del pavimento y la pista pierde contraste hacia el fondo; ninguna distancia exacta puede medirse en la foto. **Qué decides:** usar el RVR oficial, su tendencia y los requisitos de la aproximación, sin sustituirlos por una impresión visual de la imagen.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es el RVR y en qué se diferencia de la visibilidad del METAR?",
            respuesta:
              "El RVR representa la distancia horizontal a lo largo del eje de una pista a la que pueden distinguirse sus marcas o luces. La visibilidad predominante del METAR describe una zona más amplia del aeródromo. Si los mínimos de la aproximación están expresados en RVR, comparo los valores vigentes de los puntos de medición exigidos para esa pista y sigo el procedimiento aplicable; no equiparo RVR con lo que veré en final.",
            claves: ["Alcance horizontal en una pista concreta", "Visibilidad predominante del aeródromo", "Mínimos y puntos de medición aplicables"],
          },
          {
            nivel: "interpretacion",
            q: "¿Por qué un aeródromo con visibilidad de 600 metros puede seguir operando?",
            respuesta:
              "Porque la visibilidad predominante y el RVR no representan exactamente el mismo fenómeno ni el mismo lugar. Si hay un RVR válido que cumple los mínimos aplicables, y además se satisfacen los requisitos de procedimiento, equipos, tripulación, aeronave y regulación, puede ser posible operar con niebla. El número por sí solo no da autorización ni asegura adquirir las referencias visuales para aterrizar.",
            claves: ["Visibilidad y RVR son distintos", "Se necesitan mínimos y requisitos completos", "RVR no garantiza aterrizaje"],
          },
          {
            nivel: "situacion",
            q: "El RVR viene como `R28L/1200U`. ¿Qué te dice la U?",
            respuesta:
              "La U indica una tendencia observada de aumento del RVR. D señala disminución y N ausencia de cambio apreciable. No predice el valor a la hora de llegada: contrasto la hora del reporte y los valores locales actualizados, y mantengo una alternativa si la operación depende de que mejore.",
            claves: ["U aumento, D disminución, N sin cambio", "No es pronóstico", "Confirmar valor actualizado y alternativa"],
          },
        ],
      },
    ],
  },

  // ── 5 ──────────────────────────────────────────────────────────────────────
  {
    n: 5,
    title: "El tiempo presente",
    kicker: "Calificador, descriptor y fenómeno",
    minutes: 5,
    blocks: [
      {
        kind: "p",
        text: "El grupo de tiempo presente se arma como un lego de tres piezas, siempre en este orden: **calificador + descriptor + fenómeno**. `+TSRA` es fuerte (+) tormenta eléctrica (TS) con lluvia (RA).",
      },
      { kind: "p", text: "**Calificadores** (intensidad o posición):" },
      {
        kind: "kv",
        items: [
          { k: "-", v: "ligero. Sin signo: moderado." },
          { k: "+", v: "fuerte" },
          { k: "VC", v: "en la vecindad del aeródromo, no sobre la estación" },
          { k: "RE", v: "reciente: ocurrió desde la última observación" },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Sobre TS",
        text: "Las tablas del curso no traen TS como descriptor, pero sin él no se lee un `+TSRA` real: viene de la clave estándar del Anexo 3. Valídalo con tu instructor.",
      },
      { kind: "p", text: "**Descriptores** (cómo se presenta):" },
      {
        kind: "kv",
        items: [
          { k: "TS", v: "tormenta eléctrica" },
          { k: "SH", v: "chubascos" },
          { k: "FZ", v: "engelante (sobreenfriado): el que congela la célula" },
          { k: "MI", v: "baja (niebla baja: MIFG)" },
          { k: "BC", v: "bancos" },
          { k: "PR", v: "parcial" },
          { k: "DR", v: "ventisca baja" },
          { k: "BL", v: "levantado por el viento" },
        ],
      },
      { kind: "p", text: "**Fenómenos** más frecuentes en Colombia:" },
      {
        kind: "kv",
        items: [
          { k: "RA", v: "lluvia · DZ llovizna · GR granizo" },
          { k: "FG", v: "niebla (visibilidad bajo 1000 m) · BR neblina" },
          { k: "HZ", v: "bruma o calima · FU humo" },
          { k: "VA", v: "ceniza volcánica: la misma del ASHTAM" },
          { k: "SQ", v: "turbonada · FC nube embudo (+FC tornado)" },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "FG o BR: la frontera es 1000 metros",
        text: "Niebla (FG) cuando la visibilidad cae por debajo de 1000 m; neblina (BR) por encima. El umbral viene de la clave OACI: la leyenda del curso solo da los nombres, así que valídalo con tu instructor.",
      },
      {
        kind: "p",
        text: "**Los grupos armados que más vas a ver.** Esta tabla es la misma que trae el Decodificador, recortada a las combinaciones de todos los días:",
      },
      {
        kind: "table",
        head: ["Grupo", "Piezas", "Qué es", "Qué implica"],
        rows: [
          ["`-RA`", "`-` + `RA`", "Lluvia ligera", "Pista mojada, poco más"],
          ["`+TSRA`", "`+` + `TS` + `RA`", "Tormenta con lluvia fuerte", "Convección encima: cizalladura, granizo, turbulencia"],
          ["`SHRA`", "`SH` + `RA`", "Chubascos de lluvia", "Visibilidad que sube y baja de golpe"],
          ["`VCTS`", "`VC` + `TS`", "Tormenta en la vecindad", "No está sobre la estación, pero está cerca"],
          ["`FZRA`", "`FZ` + `RA`", "Lluvia engelante", "Hielo en la célula: de los peores del catálogo"],
          ["`MIFG`", "`MI` + `FG`", "Niebla baja", "Techo aparente falso desde la cabina"],
          ["`BR`", "`BR`", "Neblina", "Visibilidad reducida, por encima de 1000 m"],
          ["`RERA`", "`RE` + `RA`", "Lluvia reciente", "Ocurrió desde la observación anterior"],
          ["`VA`", "`VA`", "Ceniza volcánica", "La misma del ASHTAM. No se atraviesa"],
        ],
      },
      {
        kind: "summary",
        items: [
          "El grupo se arma siempre igual: **calificador + descriptor + fenómeno**.",
          "El calificador es intensidad (`-`, sin signo, `+`) o posición (`VC`, `RE`).",
          "`TS` y `FZ` son las dos piezas que cambian una decisión de vuelo por sí solas.",
          "Si no reconoces una combinación, sepárala en piezas: casi siempre se entiende sola.",
        ],
      },
      {
        kind: "check",
        question: "¿Qué significa `VCTS` y por qué no es lo mismo que `TS`?",
        options: [
          "Tormenta muy fuerte: la V es de violenta",
          "Tormenta en la vecindad del aeródromo, no sobre la estación",
          "Tormenta con visibilidad reducida",
        ],
        answer: 1,
        explain:
          "`VC` es el calificador de posición: **in the vicinity**, en la vecindad. La tormenta está cerca pero no encima. Cambia la decisión: no es lo mismo despegar con una celda sobre el campo que con una a diez millas moviéndose hacia ti.",
      },
      {
        kind: "infografia",
        nombre: "meteo-tiempo-presente",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En ruta, pidiendo el METAR de destino",
        situacion:
          "Te llega **`VCTS`** en el METAR de tu destino. El resto del informe está limpio: visibilidad 9999, BKN025, viento flojo.",
        pregunta: "¿Es un problema o no?",
        claves: [
          "**VC es «en las proximidades»**: entre 8 y 16 km del aeródromo. La tormenta no está encima, pero está al lado.",
          "Una tormenta cercana significa **cizalladura y ráfagas posibles en el aeródromo** aunque el viento actual esté flojo. El frente de racha llega antes que la lluvia.",
          "El resto del informe limpio describe **ahora**, y una tormenta se mueve. Lo que necesito es la tendencia y el TAF, no la foto.",
          "Lo que hago: preparo la posibilidad de espera o desvío y reviso el combustible antes de que el asunto se decida solo.",
        ],
        cierre:
          "VCTS es de los grupos que más se subestiman porque el informe alrededor parece tranquilo. La tormenta que te afecta no siempre es la que está sobre la pista.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Cómo se estructura un grupo de tiempo presente?",
            respuesta:
              "En tres piezas y siempre en el mismo orden: el calificador de intensidad, el descriptor y el fenómeno. El menos es ligero, sin signo es moderado, el más es fuerte y VC significa en las proximidades. El descriptor matiza, como TS de tormenta, SH de chubascos o FZ de engelante. Y el fenómeno es lo que cae o lo que reduce la visibilidad. Así, +TSRA es tormenta con lluvia fuerte.",
            claves: ["Calificador, descriptor, fenómeno", "− ligero, + fuerte, VC en proximidades", "Se lee como una frase"],
          },
          {
            nivel: "interpretacion",
            q: "¿Qué diferencia hay entre FG y BR, y por qué importa?",
            respuesta:
              "La frontera son los 1.000 metros. Por debajo es FG, niebla; de 1.000 metros en adelante es BR, bruma. Importa porque ese umbral es justo el terreno donde se deciden las aproximaciones de baja visibilidad: un informe que pasa de BR a FG está diciendo que la visibilidad cruzó el número que cambia mis mínimos.",
            claves: ["1.000 m es la frontera", "FG debajo, BR encima", "Marca el umbral de baja visibilidad"],
          },
          {
            nivel: "situacion",
            q: "Ves `FZRA` en el METAR. ¿Qué significa y qué haces?",
            respuesta:
              "Lluvia engelante: agua líquida que se congela al impactar. Es de las condiciones más peligrosas que puede traer un informe, porque el hielo se forma rápido, se acumula en superficies que no siempre protege el sistema antihielo y degrada la sustentación. En tierra significa deshielo obligado y revisar el estado de la pista; en vuelo, salir de esa capa cuanto antes, normalmente cambiando de nivel.",
            claves: ["Lluvia engelante", "Hielo de formación rápida", "Deshielo en tierra, salir de la capa en vuelo"],
          },
        ],
      },
    ],
  },

  // ── 6 ──────────────────────────────────────────────────────────────────────
  {
    n: 6,
    title: "Nubes y CAVOK",
    kicker: "Octavos de cielo y el techo",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "Las capas de nubes se reportan con una sigla de cobertura, medida en **octavos de cielo**, más la altura de la base en **centenares de pies** sobre el aeródromo:",
      },
      {
        kind: "kv",
        items: [
          { k: "SKC", v: "despejado (0/8)" },
          { k: "FEW", v: "escasas (1/8 a 2/8): FEW010 = escasas a 1000 ft" },
          { k: "SCT", v: "dispersas (3/8 a 4/8)" },
          { k: "BKN", v: "fragmentadas (5/8 a 7/8): la primera capa BKN u OVC define el techo" },
          { k: "OVC", v: "cubierto (8/8): OVC220 = cubierto a 22 000 ft" },
        ],
      },
      {
        kind: "list",
        items: [
          "**CB** (cumulonimbos) y **TCU** (torrecúmulos) se anotan pegados a la capa: `BKN015CB`. Son las nubes convectivas: precipitación fuerte, tormenta, granizo y turbulencia severa.",
          "**`VV002`**: visibilidad vertical de 200 ft. El cielo está oscurecido (niebla, humo) y no hay base de nube definida.",
          "**El techo** es la base de la capa más baja que cubra más de la mitad del cielo (BKN u OVC). Es uno de los números que decide si el vuelo puede ser VFR.",
        ],
      },
      {
        kind: "p",
        text: "**CAVOK** (ceiling and visibility OK): techo y visibilidad OK. El briefing del curso lo define como cielo despejado con visibilidad horizontal mayor de 10 000 metros. Cuando aparece, reemplaza a los grupos de visibilidad, tiempo presente y nubes.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "La condición completa",
        text: "La clave OACI exige además que no haya nubes por debajo de 5000 ft ni CB/TCU a ninguna altura. Ese detalle no está en la bibliografía del curso: valídalo con tu instructor antes de la entrevista.",
      },
      {
        kind: "breakdown",
        caption:
          "Tres letras de cobertura, tres dígitos de altura y, si aplica, el tipo de nube pegado al final. Nunca se separan.",
        parts: [
          { token: "BKN", label: "cobertura", detail: "Fragmentadas: de 5/8 a 7/8 del cielo. Cuenta como techo." },
          {
            token: "015",
            label: "altura de la base",
            detail: "En centenares de pies sobre el aeródromo: 1500 ft. No son 15 000.",
          },
          {
            token: "CB",
            label: "tipo de nube",
            detail: "Cumulonimbo. `TCU` es torrecúmulo. Solo se anotan estos dos, y solo porque cambian la decisión.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error común: leer la altura como pies directos",
        text: "`FEW010` no son 10 000 ft, son 1000. Es el error que más se repite y el que más rápido descarta a un candidato en la entrevista técnica.",
      },
      {
        kind: "summary",
        items: [
          "Cobertura en octavos: `SKC` 0/8, `FEW` 1 a 2, `SCT` 3 a 4, `BKN` 5 a 7, `OVC` 8/8.",
          "La altura va en **centenares de pies** sobre el aeródromo.",
          "El **techo** es la base de la primera capa `BKN` u `OVC`.",
          "`CB` y `TCU` pegados a la capa son convección: cambian la decisión aunque el techo sea alto.",
          "`VV002` significa cielo oscurecido sin base definida, con 200 ft de visibilidad vertical.",
        ],
      },
      {
        kind: "check",
        question: "El METAR dice `FEW008 SCT015 BKN025CB OVC090`. ¿Cuál es el techo?",
        options: [
          "800 ft, la capa más baja",
          "2500 ft, la primera capa BKN u OVC",
          "9000 ft, la capa cubierta",
        ],
        answer: 1,
        explain:
          "El techo es la base de la primera capa que cubra **más de la mitad** del cielo, o sea la primera `BKN` u `OVC`: aquí `BKN025`, 2500 ft. Las `FEW` y `SCT` de abajo no cuentan para el techo. Y ojo al `CB` pegado: hay convección, que pesa más que el techo mismo.",
      },
      {
        kind: "infografia",
        nombre: "meteo-cobertura",
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-img-01-cumulonimbo-desde-el-aire.webp",
        alt: "Masa nubosa convectiva vista desde altitud de crucero, con torres de cúmulo de bordes duros en la parte baja y nubosidad extendida por encima.",
        ancho: 1600,
        alto: 900,
        pie: "Así se ve la convección desde crucero: abajo las torres, con relieve y bordes duros, y encima la masa que ya se extendió. Eso es lo que hay detrás de un `CB` en el código.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En aproximación, mínimos de 600 pies",
        situacion:
          "El METAR trae **`SCT007 BKN015 OVC030`**. Vas a una aproximación cuyos mínimos están en 600 pies sobre el aeródromo.",
        pregunta: "¿Cuál de las tres capas decide, y por qué?",
        claves: [
          "**El techo es BKN015**, 1.500 pies: la primera capa de 5 octavos o más. SCT007 no es techo aunque esté más bajo, porque con 3 o 4 octavos todavía se ve el suelo entre nubes.",
          "1.500 pies está por encima de mis 600: **la aproximación es viable** según ese informe.",
          "Pero **SCT007 no se ignora**: a 700 pies voy a entrar y salir de nubes justo en el tramo final, con la referencia visual apareciendo y desapareciendo.",
          "Y las alturas del METAR son **sobre el aeródromo**, no sobre el mar. Sumar la elevación es el error clásico y suele costar una aproximación frustrada.",
        ],
        cierre:
          "Techo y capa más baja no son lo mismo. El techo decide si se puede; la capa más baja decide cómo va a sentirse.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué significan FEW, SCT, BKN y OVC y qué es el techo?",
            respuesta:
              "Son la cobertura del cielo en octavos: FEW de 1 a 2, SCT de 3 a 4, BKN de 5 a 7 y OVC los 8. El techo es la altura de la capa más baja de BKN u OVC, es decir la primera que cubre cinco octavos o más, y se expresa en centenas de pies sobre la elevación del aeródromo.",
            claves: ["Octavos de cielo", "Techo = primera BKN u OVC", "Centenas de pies sobre el aeródromo"],
          },
          {
            nivel: "interpretacion",
            q: "¿Qué es CAVOK y qué tiene que cumplirse para que aparezca?",
            respuesta:
              "Es la abreviatura de ceiling and visibility OK, y sustituye a los grupos de visibilidad, tiempo presente y nubes. Para que aparezca tienen que darse tres cosas a la vez: visibilidad de 10 km o más, ningún fenómeno significativo, y ninguna nube por debajo de 5.000 pies o de la altitud mínima de sector, la que sea mayor, ni cumulonimbos ni cúmulos en torre a ninguna altura.",
            claves: ["Visibilidad 10 km o más", "Sin fenómenos significativos", "Sin nubes bajo 5.000 pies ni CB ni TCU"],
          },
          {
            nivel: "situacion",
            q: "En el METAR ves `BKN018CB`. ¿Qué cambia respecto a un `BKN018` normal?",
            respuesta:
              "Cambia todo menos la altura. Las dos letras finales dicen que esa capa son cumulonimbos, y el CB trae turbulencia severa, cizalladura, granizo, engelamiento y rayos. El techo sigue estando a 1.800 pies, pero ya no es un techo cualquiera: es una nube de la que hay que separarse, no bajo la que se pasa.",
            claves: ["CB = cumulonimbo", "Turbulencia, cizalladura, granizo, engelamiento", "Se evita, no se atraviesa"],
          },
        ],
      },
    ],
  },

  // ── 7 ──────────────────────────────────────────────────────────────────────
  {
    n: 7,
    title: "Temperatura, rocío y QNH",
    kicker: "Los números que ajustan tu altímetro",
    minutes: 3,
    blocks: [
      {
        kind: "p",
        text: "**`20/12`**: temperatura del aire 20 °C, **punto de rocío** 12 °C. El punto de rocío es la temperatura a la que el aire se satura (humedad relativa del 100 por ciento). Los negativos llevan M: `M02/M04` es temperatura de menos 2 y rocío de menos 4.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Cuando se juntan, algo se forma",
        text: "Cuanto más cerca esté el rocío de la temperatura, más probable es la niebla, las nubes bajas y la precipitación. Un 09/09 al amanecer en Bogotá es niebla casi segura. Y la diferencia también te habla del rendimiento: aire húmedo y caliente es menos denso.",
      },
      {
        kind: "p",
        text: "**`Q1012`**: el **QNH** en hectopascales, el valor al que calibras el altímetro para que marque la altitud real del aeródromo sobre el nivel del mar. Estados Unidos lo reporta en pulgadas de mercurio: `A2980` son 29.80 inHg.",
      },
      {
        kind: "list",
        items: [
          "QNH bajo y sin actualizar: el altímetro miente alto. De ahí el clásico: de alta a baja, cuidado abajo.",
          "El cambio de Q a A al volar hacia EE. UU. es un error de lectura clásico en entrevistas.",
        ],
      },
      {
        kind: "check",
        question:
          "Amanece en Bogotá con `06/06` y viento en calma. ¿Qué esperas encontrar en la aproximación?",
        options: [
          "Nada especial: seis grados es una temperatura normal",
          "Niebla, casi seguro: temperatura y rocío iguales significan aire saturado",
          "Turbulencia térmica, porque el aire está frío y estable",
        ],
        answer: 1,
        explain:
          "Cuando la temperatura alcanza al punto de rocío el aire está saturado y el vapor condensa. Sin viento que mezcle la capa baja, eso es niebla de radiación. Es el aviso más barato que da un METAR y el que más se pasa por alto.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Aeródromo de salida, primera hora de la mañana",
        situacion:
          "El METAR trae **`04/04`** y **`Q1024`**, viento en calma y visibilidad 8000. El cielo está despejado y el sol acaba de salir.",
        pregunta: "¿Qué te dice ese 04/04 sobre la próxima hora?",
        claves: [
          "**Spread cero:** temperatura y punto de rocío iguales significa aire saturado. Eso es niebla formándose o a punto de formarse.",
          "Con **viento en calma** no hay mezcla que la disipe, y la niebla de radiación se asienta y se queda.",
          "La visibilidad de 8000 es la de **ahora**. Con spread cero puede irse a 200 m en veinte minutos.",
          "Lo que hago: mirar el TAF, mirar el alterno, y no dar por buena la visibilidad actual para una salida dentro de una hora.",
        ],
        cierre:
          "El spread es el número que más futuro contiene de todo el METAR, y es el que más se pasa por alto porque no parece un fenómeno: son dos cifras separadas por una barra.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es el punto de rocío y por qué aparece en el METAR?",
            respuesta:
              "Es la temperatura a la que el aire tendría que enfriarse para saturarse y condensar. Aparece porque la diferencia con la temperatura, el spread, es el mejor indicador de si se va a formar niebla o nubes bajas: cuanto más pequeño el spread, más cerca está el aire de la saturación.",
            claves: ["Temperatura de saturación", "El spread indica proximidad a la niebla", "Se lee junto a la temperatura"],
          },
          {
            nivel: "interpretacion",
            q: "¿Qué es el QNH y qué pasa si vuelas con uno desactualizado?",
            respuesta:
              "Es la presión al nivel del mar que, puesta en el altímetro, hace que este marque la elevación del aeródromo al tocar tierra. Si vuelo con un QNH más alto que el real, el altímetro me indica más altura de la que tengo: estoy más bajo de lo que creo. Volar de alta a baja presión sin actualizar es la situación clásica de terreno más cerca de lo que marca el instrumento.",
            claves: ["Presión reducida al nivel del mar", "De alta a baja, más bajo de lo que marca", "Se actualiza en descenso"],
          },
          {
            nivel: "situacion",
            q: "Ves `M02/M03` en el METAR y llueve. ¿Qué te preocupa?",
            respuesta:
              "La M es de menos: temperatura de dos bajo cero y rocío de tres bajo cero. Lluvia con temperaturas negativas en superficie es engelamiento: lluvia engelante en el avión y posible hielo en pista. Me preocupan las condiciones de deshielo antes de salir, el estado de la pista y el frenado, y la posibilidad de acumulación en ascenso.",
            claves: ["M = temperatura negativa", "Lluvia bajo cero = engelamiento", "Deshielo, estado de pista, ascenso"],
          },
        ],
      },
    ],
  },

  // ── 8 ──────────────────────────────────────────────────────────────────────
  {
    n: 8,
    title: "Tendencias y comentarios",
    kicker: "Lo que viene en las próximas 2 horas",
    minutes: 3,
    blocks: [
      {
        kind: "p",
        text: "Al final del informe, el observador te dice qué espera para las **próximas dos horas**. Es la miniatura del TAF (el pronóstico de aeródromo, que merece su propia lección):",
      },
      {
        kind: "kv",
        items: [
          { k: "NOSIG", v: "sin cambio significativo. El mejor final posible." },
          { k: "BECMG", v: "cambio esperado: BECMG 1216 = entre las 12:00 y las 16:00 UTC" },
          { k: "TEMPO", v: "fluctuaciones temporales: TEMPO 0306 = ratos con esa condición entre las 03 y las 06" },
          { k: "PROB40", v: "probabilidad del 40 por ciento" },
          { k: "FM", v: "cambio significativo desde una hora dada" },
          { k: "NSW", v: "fin del tiempo significativo" },
          { k: "RMK", v: "comentario libre del observador. Después de RMK, lee con calma" },
        ],
      },
      {
        kind: "list",
        items: [
          "**AUTO**: observación automatizada, sin observador humano. Algunas estaciones no discriminan el tipo de precipitación (reportan UP).",
          "**COR**: corrección a una observación ya publicada.",
        ],
      },
      {
        kind: "check",
        question: "¿Qué diferencia hay entre `BECMG 1216 3000 BR` y `TEMPO 1216 3000 BR`?",
        options: [
          "Ninguna: las dos anuncian 3 km con neblina entre las 12:00 y las 16:00 UTC",
          "`BECMG` es un cambio que se instala y se queda; `TEMPO` son ratos que van y vienen",
          "`BECMG` es más probable que `TEMPO`",
        ],
        answer: 1,
        explain:
          "`BECMG` describe una transición: en algún momento de esa ventana la condición cambia y a partir de ahí se mantiene. `TEMPO` son fluctuaciones temporales dentro de la ventana, y entre ellas se vuelve a lo anterior. Para planear un alterno no da lo mismo.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es el grupo de tendencia de un METAR y cuánto cubre?",
            respuesta:
              "Es el pronóstico corto que va al final del METAR y cubre las dos horas siguientes a la observación. Puede decir NOSIG, que no se esperan cambios significativos, o traer BECMG para un cambio que va a establecerse, o TEMPO para uno temporal que dura menos de una hora cada vez y menos de la mitad del periodo.",
            claves: ["Dos horas", "NOSIG, BECMG, TEMPO", "Va dentro del propio METAR"],
          },
          {
            nivel: "interpretacion",
            q: "¿Qué diferencia hay entre BECMG y TEMPO?",
            respuesta:
              "BECMG es un cambio que llega y se queda: a partir de ese momento las condiciones son las nuevas. TEMPO es un cambio que va y viene: aparece por ratos, cada uno de menos de una hora, sin sumar más de la mitad del periodo. Para planificar, un TEMPO de visibilidad baja significa que puede pillarme justo cuando llegue, aunque el resto del tiempo esté bien.",
            claves: ["BECMG se establece", "TEMPO va y viene", "El TEMPO puede coincidir con mi llegada"],
          },
          {
            nivel: "situacion",
            q: "El METAR de tu destino trae `NOSIG` pero llevas dos horas de vuelo por delante. ¿Te sirve?",
            respuesta:
              "Solo en parte. NOSIG cubre las dos horas siguientes a la observación, no a mi llegada, y esa observación puede tener ya media hora cuando la leo. Si mi llegada cae fuera de esa ventana, el que manda es el TAF, y en ruta pediré el METAR actualizado. NOSIG tranquiliza, no exime de mirar el pronóstico.",
            claves: ["Cubre 2 h desde la observación, no desde ahora", "Fuera de la ventana manda el TAF", "Pedir METAR actualizado en ruta"],
          },
        ],
      },
    ],
  },

  // ── 9 ──────────────────────────────────────────────────────────────────────
  {
    n: 9,
    title: "Método de lectura en 5 pasos",
    kicker: "La rutina y los errores comunes",
    minutes: 3,
    blocks: [
      {
        kind: "p",
        text: "Lee todo METAR en el mismo orden, siempre. La rutina es lo que te salva cuando el informe es feo y el tiempo apremia:",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Dónde y cuándo:** estación y grupo horario. Confirma que el informe sea reciente y pásalo a hora local.",
          "**Viento:** dirección contra la pista en uso, ráfagas y cualquier WS.",
          "**Cuánto ves:** visibilidad y RVR si hay. Compara con tus mínimos.",
          "**Qué cae y qué tapa:** tiempo presente y nubes. CB o TCU cambian la decisión aunque el resto esté limpio.",
          "**Números de máquina:** temperatura y rocío (niebla, rendimiento) y QNH al altímetro. Cierra con la tendencia.",
        ],
      },
      {
        kind: "example",
        title: "Ejemplo resuelto: la rutina aplicada de principio a fin",
        code: "METAR SKCL 041200Z 05008KT 020V090 8000 -RA SCT018 BKN025TCU OVC090 24/22 Q1011 BECMG 1416 9999 NSW",
        steps: [
          "**Dónde y cuándo:** Cali, Alfonso Bonilla Aragón. Día 4 a las 12:00 UTC, o sea las 07:00 hora Colombia. Informe fresco.",
          "**Viento:** del noreste (050°) a 8 nudos, oscilando entre 020° y 090°. Flojo, pero variable: la componente cruzada cambia con la pista en uso.",
          "**Cuánto ves:** 8000 m. No es `9999`, así que algo hay: lo confirma el grupo siguiente.",
          "**Qué cae:** `-RA`, lluvia ligera. Es lo que baja la visibilidad a 8 km.",
          "**Qué tapa:** dispersas a 1800 ft, **fragmentadas a 2500 ft con `TCU`** y cubierto a 9000 ft. El techo son 2500 ft y hay torrecúmulos: convección en desarrollo.",
          "**Números de máquina:** 24 °C con rocío de 22. Dos grados de diferencia, aire muy húmedo y menos denso: la performance de despegue se resiente.",
          "**Tendencia:** `BECMG 1416 9999 NSW`, entre las 14:00 y las 16:00 UTC mejora a 10 km o más y termina el tiempo significativo.",
        ],
        answer:
          "Cali amaneció con lluvia ligera, 8 km de visibilidad y techo de 2500 ft con torrecúmulos, y mejora prevista para media mañana. El dato que manda no es el techo: es el `TCU`. Con convección en desarrollo y aire saturado, lo que hay que mirar es si esos torrecúmulos maduran a cumulonimbos antes de tu hora estimada.",
      },
      { kind: "p", text: "**Errores comunes**, los que caen en entrevista:" },
      {
        kind: "list",
        items: [
          "Leer la hora como local: es UTC, y Colombia va 5 horas detrás.",
          "Confundir la dirección del viento: es **desde donde sopla**, en grados verdaderos, no magnéticos.",
          "Pasar por alto la G de ráfagas o el rango 240V300: el promedio no es el problema, el pico sí.",
          "Leer FEW010 como 10 000 ft: la altura va en centenares, son 1000 ft.",
          "Ignorar el CB pegado a la capa: `BKN015CB` no es solo un techo de 1500 ft, es convección encima del aeródromo.",
          "Olvidar que CAVOK también promete que no hay CB: si hay CAVOK, nadie vio convección.",
        ],
      },
      {
        kind: "check",
        question:
          "Último: `METAR SKCL 041200Z VRB03KT 9999 FEW018 BKN030TCU 26/23 Q1010 NOSIG`. ¿Cuál es el dato que más pesa?",
        options: [
          "El `NOSIG`: no se espera cambio, así que el informe es tranquilizador",
          "El `TCU` de la capa de 3000 ft: hay convección en desarrollo",
          "El `VRB03KT`: viento variable, difícil de elegir pista",
        ],
        answer: 1,
        explain:
          "Todo lo demás está cómodo: 10 km de visibilidad, techo de 3000 ft, viento flojo. Pero `TCU` son torrecúmulos, el paso previo al cumulonimbo, y con 26/23 hay humedad de sobra para que maduren. El `NOSIG` cubre solo dos horas; la convección no pide permiso.",
      },
      {
        kind: "summary",
        title: "Lo que te llevas de toda la lección",
        items: [
          "Todo METAR trae los mismos grupos en el mismo orden. Si uno falta, los demás no se mueven.",
          "La hora es UTC y Colombia va cinco horas atrás, igual que en el NOTAM.",
          "El viento es **desde donde sopla**, en grados verdaderos, y lo que decide es la ráfaga.",
          "La altura de las nubes va en centenares de pies, y el techo es la primera `BKN` u `OVC`.",
          "`CB`, `TCU`, `WS` y `FZ` son las cuatro señales que cambian un briefing por sí solas.",
          "Temperatura y rocío juntos anuncian niebla, y separados te hablan de rendimiento.",
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Tip operacional: sigue con el Decodificador",
        text: "Pega cualquier METAR en el Decodificador de esta sección y compáralo con tu lectura mental. Cuando los decodifiques más rápido que la herramienta, estás listo para la entrevista.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Briefing, 40 minutos antes de salida",
        situacion:
          "Tu destino trae: **`SKBO 121200Z 09018G32KT 050V130 3000 TSRA BKN008CB OVC020 18/17 Q1012 TEMPO 1500 +TSRA`**. La pista en uso es la 13L.",
        pregunta: "Aplica los cinco pasos. ¿Qué decides?",
        claves: [
          "**Viento:** de 090° a 18 nudos con ráfagas de 32, variando entre 050 y 130. Contra la 13L eso es cruzado por la izquierda, y el número que limita es la ráfaga: 32.",
          "**Visibilidad y tiempo:** 3000 m con tormenta y lluvia. El TEMPO lo baja a 1500 con lluvia fuerte: eso es lo que puedo encontrarme al llegar, no lo que hay ahora.",
          "**Nubes:** BKN008**CB**. Techo a 800 pies y cumulonimbos. El CB no es decoración: es la firma de la cizalladura y del granizo.",
          "**Temperatura y rocío:** 18/17. Un grado de spread con tormenta encima: el aire está saturado.",
          "**La decisión:** esto no es un destino, es un destino con alterno sólido y combustible para esperar. Y si la ráfaga cruzada supera el límite del avión, no es una cuestión de pericia.",
        ],
        cierre:
          "Fíjate en que ninguno de los cinco pasos decidió solo. Lo que decide es el conjunto: techo bajo, viento cruzado racheado y una tendencia que empeora.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es un METAR y cada cuánto se emite?",
            respuesta:
              "Es el informe meteorológico rutinario de aeródromo: una observación de las condiciones reales en ese aeródromo, en un momento concreto, codificada siempre en el mismo orden. Se emite normalmente cada hora o cada media hora según el aeródromo, y cuando las condiciones cambian de forma significativa se emite un SPECI, que es el mismo formato pero especial.",
            claves: ["Observación, no pronóstico", "Rutinario, cada hora o media hora", "SPECI cuando cambia"],
          },
          {
            nivel: "interpretacion",
            q: "¿Cuál es la diferencia entre METAR y TAF?",
            respuesta:
              "El METAR dice lo que **hay** ahora en ese aeródromo: es una observación. El TAF dice lo que se **espera** en un periodo de validez: es un pronóstico. Para decidir si salgo miro el TAF del destino y del alterno; para decidir si aterrizo miro el METAR más reciente. Los dos se leen juntos, y cuando no coinciden, el METAR es el hecho.",
            claves: ["METAR observa, TAF pronostica", "El TAF tiene periodo de validez", "El METAR es el hecho"],
          },
          {
            nivel: "situacion",
            q: "Te dan un METAR y te dicen: interprétalo en voz alta. ¿Por dónde empiezas?",
            respuesta:
              "Por el orden, que siempre es el mismo: estación y hora Zulú, viento, visibilidad y RVR, tiempo presente, nubes, temperatura y punto de rocío, QNH, y al final la tendencia y los comentarios. No lo leo salteado buscando lo que me suena: lo leo en orden, porque así no se me olvida un grupo. Y termino con la frase que importa: qué significa esto para mi operación.",
            claves: ["El orden es siempre el mismo", "Estación, viento, visibilidad, tiempo, nubes, T/Td, QNH, tendencia", "Cerrar con la implicación operacional"],
          },
        ],
      },
    ],
  },
  // ── 10 ─────────────────────────────────────────────────────────────────────
  {
    n: 10,
    title: "Qué es un TAF",
    kicker: "El pronóstico, no la observación",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "El METAR te dice lo que **hay**. El TAF te dice lo que se **espera**. Esa es toda la diferencia, y de ella salen las dos preguntas que un piloto responde con cada uno: el METAR contesta «¿puedo aterrizar ahora?» y el TAF, «¿voy a poder aterrizar cuando llegue, y qué llevo de alterno?».",
      },
      {
        kind: "infografia",
        nombre: "meteo-linea-tiempo",
      },
      { kind: "sub", text: "Cómo empieza un TAF" },
      {
        kind: "code",
        tabular: true,
        text: `TAF SKBO 121100Z 1212/1318 09008KT 9999 SCT020 ...
    │    │      │        │
    │    │      │        └─ validez: del día 12 a las 12Z al día 13 a las 18Z
    │    │      └────────── emitido el día 12 a las 11:00 Zulú
    │    └───────────────── estación
    └────────────────────── tipo de informe`,
      },
      {
        kind: "list",
        items: [
          "**`TAF AMD`**: enmendado. El pronóstico anterior dejó de servir y este lo sustituye. Si ves un AMD, lo que tenías en el briefing ya no vale.",
          "**`TAF COR`**: corregido, por un error en el anterior.",
          "**`CNL`**: cancelado. No hay pronóstico para ese periodo.",
          "**`NIL`**: no disponible. No es lo mismo que buen tiempo: es que no hay dato.",
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Dos cifras que cambian según dónde vueles",
        text: "El **periodo de validez** no es universal: los aeródromos internacionales suelen emitir TAF de 24 o 30 horas y otros de 9, y el intervalo de emisión también varía. Lo mismo pasa con el **área que cubre** el pronóstico, que es el entorno del aeródromo y no la región. Confirma los dos valores en la publicación de información aeronáutica del Estado y en el manual de tu explotador antes de citarlos en una entrevista.",
      },
      {
        kind: "p",
        text: "Lo que sí es igual en todas partes: después de la cabecera, el TAF usa **los mismos grupos que ya sabes leer** del METAR. Viento, visibilidad, tiempo presente y nubes se codifican igual. Si sabes leer un METAR, ya sabes leer la mitad de un TAF.",
      },
      {
        kind: "check",
        question:
          "En el briefing tienes un TAF del destino emitido hace tres horas y llega un `TAF AMD`. ¿Qué haces con el primero?",
        options: [
          "Los comparo y me quedo con el que sea más favorable",
          "El AMD sustituye al anterior: el viejo deja de valer",
          "El AMD solo aplica si cambia el periodo de validez",
        ],
        answer: 1,
        explain:
          "Un TAF enmendado reemplaza al anterior para el resto de su validez. No se promedian ni se elige: el briefing que hiciste con el viejo hay que rehacerlo con el nuevo.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es un TAF?",
            respuesta:
              "Es el pronóstico meteorológico de aeródromo: describe las condiciones que se esperan en el entorno de un aeródromo durante un periodo de validez definido. Trae los mismos grupos que el METAR (viento, visibilidad, tiempo presente y nubes) más los grupos de cambio que dicen cuándo y cómo se espera que evolucione.",
            claves: ["Pronóstico, no observación", "Periodo de validez", "Mismos grupos que el METAR más los de cambio"],
          },
          {
            nivel: "interpretacion",
            q: "¿Para qué usas el TAF y para qué el METAR?",
            respuesta:
              "El TAF para planificar: decidir si el destino va a estar utilizable a mi hora de llegada, si necesito alterno y cuál. El METAR para decidir en el momento: si puedo iniciar la aproximación ahora. En ruta pido METAR actualizado, pero la decisión de con cuánto combustible y con qué alterno salí la tomé con el TAF.",
            claves: ["TAF para planificar y elegir alterno", "METAR para decidir ahora", "El METAR es el hecho"],
          },
          {
            nivel: "situacion",
            q: "El TAF de tu destino viene como `NIL`. ¿Qué significa para tu planificación?",
            respuesta:
              "Que no hay pronóstico disponible para ese aeródromo, y eso no es lo mismo que buen tiempo: es ausencia de información. Sin TAF no puedo justificar que el destino vaya a estar utilizable a mi llegada, así que la planificación se apoya en lo que sí tengo (METAR reciente, tendencia, pronósticos de área) y, según el manual del explotador y la norma nacional, normalmente obliga a llevar alterno.",
            claves: ["NIL es ausencia de dato, no buen tiempo", "No se puede justificar el destino", "Consultar manual del explotador"],
          },
        ],
      },
      {
        kind: "summary",
        items: [
          "METAR observa; TAF pronostica. Los dos se leen juntos y, cuando no coinciden, el METAR es el hecho.",
          "Cabecera: tipo, estación, hora de emisión y periodo de validez.",
          "AMD sustituye, COR corrige, CNL cancela y NIL es que no hay dato.",
          "Los grupos de viento, visibilidad, tiempo y nubes se leen igual que en el METAR.",
        ],
      },
    ],
  },

  // ── 11 ─────────────────────────────────────────────────────────────────────
  {
    n: 11,
    title: "Los grupos de cambio",
    kicker: "FM, BECMG, TEMPO y PROB",
    minutes: 5,
    blocks: [
      {
        kind: "p",
        text: "Un TAF no describe un estado: describe una **evolución**. Los grupos de cambio son los que dicen cuándo cambia, cuánto dura y con qué seguridad. Confundirlos es el error que más caro sale en la planificación, porque cada uno significa algo distinto para tu alterno.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "FM · desde",
            puntos: [
              "**`FM121500`**: a partir del día 12 a las 15:00Z.",
              "Cambio **rápido y permanente**: lo que sigue **sustituye por completo** a lo anterior.",
              "Todo lo que no se repite después del FM deja de aplicar. Es una línea nueva, no un matiz.",
            ],
          },
          {
            titulo: "BECMG · llegando a ser",
            puntos: [
              "**`BECMG 1214/1216`**: el cambio se establece en algún momento de esa ventana.",
              "Cambio **gradual y permanente**. Al final de la ventana, las condiciones nuevas están.",
              "Solo cambia lo que nombra: lo demás sigue como estaba.",
            ],
          },
          {
            titulo: "TEMPO · temporal",
            puntos: [
              "**`TEMPO 1218/1222`**: fluctuaciones dentro de esa ventana.",
              "Cada episodio dura **menos de una hora** y en total **menos de la mitad** del periodo.",
              "Va y vuelve. Es lo que puede pillarte justo al llegar aunque el resto del tiempo esté bien.",
            ],
          },
          {
            titulo: "PROB30 / PROB40 · probabilidad",
            puntos: [
              "Probabilidad del 30 % o del 40 % de que ocurra lo que sigue.",
              "**No existe PROB50 ni más**: por encima de eso el pronosticador usa BECMG o TEMPO.",
              "Puede combinarse: **`PROB40 TEMPO`** es un 40 % de probabilidad de fluctuaciones temporales.",
            ],
          },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "La confusión que más cuesta",
        text: "**FM borra; BECMG matiza.** Después de un FM, todo lo anterior deja de valer y hay que leer la línea completa. Después de un BECMG, solo cambia lo que ese grupo nombra. Si lees un BECMG como si fuera un FM, te inventas condiciones que el pronóstico no dijo.",
      },
      {
        kind: "infografia",
        nombre: "meteo-cambios",
      },
      {
        kind: "check",
        question:
          "Un TAF dice `... 25010KT 9999 SCT030 BECMG 1215/1217 3000 BR`. A las 1218Z, ¿qué viento esperas?",
        options: [
          "No se sabe: el BECMG anuló las condiciones anteriores",
          "25010KT, porque el BECMG solo cambió visibilidad y tiempo presente",
          "Calma, porque no se menciona",
        ],
        answer: 1,
        explain:
          "El BECMG **solo modifica lo que nombra**. Aquí nombra visibilidad (3000) y tiempo presente (BR), así que el viento y las nubes siguen siendo los del bloque anterior. Si hubiera sido un FM, habría que leer la línea entera de nuevo.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Planificando, llegada estimada 1930Z",
        situacion:
          "El TAF del destino trae: **`... 1912/1922 18012KT 9999 BKN025 TEMPO 1918/1922 3000 TSRA BKN012CB`**.",
        pregunta: "¿Con qué condiciones planificas la llegada?",
        claves: [
          "Las condiciones **predominantes** a mi hora son buenas: viento moderado, 10 km de visibilidad y techo a 2.500 pies.",
          "Pero el **TEMPO cubre 1918/1922** y yo llego a las 1930: estoy dentro de la ventana. Tengo que planificar **para el TEMPO, no para lo predominante**.",
          "El TEMPO trae tormenta con lluvia y techo a 1.200 pies con CB. Eso es lo que puedo encontrarme.",
          "Consecuencia real: combustible para esperar, alterno que no esté afectado por el mismo sistema, y expectativa de posible espera o desvío.",
        ],
        cierre:
          "Un TEMPO que solapa tu hora de llegada no es un matiz del pronóstico: es el pronóstico, para ti.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué diferencia hay entre FM, BECMG y TEMPO?",
            respuesta:
              "FM marca un cambio rápido y permanente a partir de una hora concreta, y lo que sigue sustituye por completo a lo anterior. BECMG es un cambio gradual y permanente que se establece dentro de la ventana indicada, y solo modifica los elementos que nombra. TEMPO son fluctuaciones temporales dentro de su ventana, cada una de menos de una hora y sin sumar más de la mitad del periodo.",
            claves: ["FM sustituye por completo", "BECMG gradual y solo lo que nombra", "TEMPO va y vuelve"],
          },
          {
            nivel: "interpretacion",
            q: "¿Por qué no existe un PROB50?",
            respuesta:
              "Porque a partir de esa probabilidad el pronosticador ya no está expresando una posibilidad sino una expectativa, y para eso tiene BECMG o TEMPO. PROB30 y PROB40 sirven para avisar de algo que puede pasar sin comprometerse a que pase; por encima del 40 %, la herramienta correcta es el grupo de cambio.",
            claves: ["Solo PROB30 y PROB40", "Por encima se usa BECMG o TEMPO", "PROB expresa posibilidad, no expectativa"],
          },
          {
            nivel: "situacion",
            q: "Tu llegada cae dentro de un `PROB40 TEMPO 0600/0800 0400 FG`. ¿Cómo lo tratas?",
            respuesta:
              "Como una posibilidad real que hay que cubrir. Es un 40 % de probabilidad de fluctuaciones temporales con 400 metros de visibilidad y niebla, y 400 metros está por debajo de casi cualquier mínimo. No planifico contando con que no ocurra: llevo alterno con condiciones holgadas y combustible para esperar, porque si ocurre no voy a tener margen para improvisar.",
            claves: ["40 % es una posibilidad que se cubre", "400 m está bajo mínimos", "Alterno holgado y combustible"],
          },
        ],
      },
      {
        kind: "summary",
        items: [
          "FM borra y sustituye; BECMG matiza solo lo que nombra; TEMPO va y vuelve.",
          "TEMPO: cada episodio menos de una hora, en total menos de la mitad del periodo.",
          "PROB30 y PROB40, nada más. Por encima, el pronosticador usa BECMG o TEMPO.",
          "Un TEMPO que solapa tu hora de llegada es tu pronóstico, no un matiz.",
        ],
      },
    ],
  },

  // ── 12 ─────────────────────────────────────────────────────────────────────
  {
    n: 12,
    title: "Leer un TAF completo",
    kicker: "De la cabecera a la decisión",
    minutes: 5,
    blocks: [
      {
        kind: "p",
        text: "Ya tienes las piezas. Ahora el ejercicio completo, que es el que te van a pedir en una entrevista técnica: te ponen un TAF delante y esperan que hables.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Escenario de práctica",
        text: "El TAF que sigue está construido para este curso. Es un pronóstico realista y bien formado, pero **no es un informe real** de ningún aeródromo.",
      },
      {
        kind: "code",
        tabular: true,
        text: `TAF SKXX 151700Z 1518/1624 20008KT 9999 SCT025
     BECMG 1520/1522 15012G22KT 6000 -RA BKN015
     TEMPO 1522/1602 3000 TSRA BKN010CB
     FM160300 09006KT 1200 BR OVC006
     PROB30 1604/1608 0500 FG
     BECMG 1612/1614 9999 NSW SCT030`,
      },
      {
        kind: "kv",
        items: [
          { k: "Cabecera", v: "Emitido el día 15 a las 17:00Z, válido desde el 15 a las 18Z hasta el 16 a las 24Z. Treinta horas de validez." },
          { k: "Predominante inicial", v: "Viento del 200° a 8 nudos, visibilidad 10 km o más, nubes dispersas a 2.500 pies. Buen tiempo." },
          { k: "BECMG 1520/1522", v: "Entre las 20Z y las 22Z se establece: viento del 150° a 12 con ráfagas de 22, visibilidad 6 km con lluvia ligera y techo a 1.500 pies. Empeora, y se queda." },
          { k: "TEMPO 1522/1602", v: "Desde las 22Z hasta las 02Z puede caer a 3 km con tormenta y techo a 1.000 pies con cumulonimbos. Va y vuelve." },
          { k: "FM160300", v: "A partir de las 03Z, línea nueva: viento flojo del este, 1.200 metros con bruma y cielo cubierto a 600 pies. Esto **sustituye** todo lo anterior." },
          { k: "PROB30 1604/1608", v: "Entre las 04Z y las 08Z, un 30 % de probabilidad de 500 metros con niebla. El peor momento del periodo." },
          { k: "BECMG 1612/1614", v: "Entre las 12Z y las 14Z mejora: 10 km, NSW (ningún fenómeno significativo) y dispersas a 3.000 pies." },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Tres llegadas distintas al mismo aeródromo",
        situacion:
          "El mismo TAF de arriba. Tres vuelos: el **A** llega a las 1900Z, el **B** a las 2330Z y el **C** a las 0600Z.",
        pregunta: "¿Cuál de los tres tiene el problema serio?",
        claves: [
          "**A, 1900Z:** cae en el bloque inicial. 10 km y dispersas a 2.500. Sin novedad, y el BECMG todavía no empezó.",
          "**B, 2330Z:** está dentro del TEMPO 1522/1602. Puede encontrarse tormenta, 3 km y techo de 1.000 pies con CB. Necesita combustible para esperar, pero es manejable.",
          "**C, 0600Z:** el peor. Después del FM160300 lo predominante ya es 1.200 m con techo de 600 pies, **y encima** cae dentro del PROB30 de 500 metros con niebla.",
          "Para C la pregunta no es si aguanta el mínimo: es **qué alterno lleva y si ese alterno está fuera del mismo sistema**, porque la niebla de madrugada no suele ser local.",
        ],
        cierre:
          "El mismo TAF, tres respuestas distintas. Por eso el pronóstico no se lee entero de corrido: se lee buscando tu ventana.",
      },
      {
        kind: "check",
        question:
          "Después del `FM160300 09006KT 1200 BR OVC006`, ¿qué pasa con el techo de 1.000 pies que traía el TEMPO anterior?",
        options: [
          "Sigue vigente hasta que otro grupo lo cambie",
          "Deja de aplicar: el FM sustituye por completo lo anterior",
          "Se promedia con el nuevo OVC006",
        ],
        answer: 1,
        explain:
          "Un FM abre una línea nueva. Todo lo anterior, predominante y temporal, deja de aplicar, y a partir de esa hora las condiciones son exactamente las que el FM enumera hasta que otro grupo las modifique.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "situacion",
            q: "Te ponen un TAF delante y te dicen: interprétalo. ¿Cómo lo estructuras?",
            respuesta:
              "Primero la cabecera: quién lo emite, cuándo y hasta cuándo vale. Después el bloque predominante. Luego recorro los grupos de cambio en orden, diciendo de cada uno si sustituye o si matiza y qué ventana cubre. Y termino por lo que de verdad importa: sitúo mi hora estimada de llegada dentro de esa línea de tiempo y digo qué condiciones me tocan a mí, no las mejores ni las peores del periodo.",
            claves: ["Cabecera y validez", "Predominante", "Grupos de cambio en orden", "Situar la hora de llegada"],
          },
          {
            nivel: "interpretacion",
            q: "¿Qué significa NSW y dónde aparece?",
            respuesta:
              "No significant weather: ningún fenómeno significativo. Aparece en los grupos de cambio para decir que el fenómeno que había antes deja de esperarse. Es la forma que tiene el TAF de cancelar un tiempo presente sin tener que enumerar todo lo que ya no habrá.",
            claves: ["Ningún fenómeno significativo", "Cancela el tiempo presente anterior", "Solo en grupos de cambio"],
          },
        ],
      },
      {
        kind: "summary",
        items: [
          "Se lee en orden: cabecera, predominante, grupos de cambio, y por último tu ventana de llegada.",
          "FM abre línea nueva; BECMG cambia solo lo que nombra; TEMPO y PROB son posibilidades acotadas.",
          "NSW cancela el fenómeno anterior.",
          "El mismo TAF da respuestas distintas según a qué hora llegues.",
        ],
      },
    ],
  },

  // ── 13 ─────────────────────────────────────────────────────────────────────
  {
    n: 13,
    title: "El TAF y tu alterno",
    kicker: "Del pronóstico a la decisión",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "Aquí es donde el TAF deja de ser lectura y se convierte en combustible. Todo lo anterior servía para llegar a esta pregunta: **¿necesito alterno, cuál, y con cuánto combustible salgo?**",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Los números los pone tu operación, no este curso",
        text: "Los mínimos que obligan a llevar alterno, los que hacen que un aeródromo sea utilizable como tal y los márgenes que hay que aplicar sobre el pronóstico **los fija la norma de tu Estado y el manual de operaciones de tu explotador**, y no son iguales en todas partes. Este módulo enseña a leer el pronóstico y a razonar la decisión; **las cifras concretas se buscan en tu manual**, y es exactamente lo que un evaluador espera oír.",
      },
      { kind: "sub", text: "El razonamiento, que sí es universal" },
      {
        kind: "vinetas",
        items: [
          "**Sitúa tu hora estimada de llegada** en la línea de tiempo del TAF, con un margen razonable antes y después. No planificas para el periodo entero: planificas para tu ventana.",
          "**Toma lo peor que el pronóstico admite en esa ventana**, incluidos TEMPO y PROB que la solapen. Si el pronóstico dice que puede ocurrir, para planificar ocurre.",
          "**Compara con los mínimos** de la aproximación disponible y con lo que exija tu manual para prescindir de alterno.",
          "**Elige un alterno que no comparta el problema.** Un alterno a 40 millas del destino con la misma niebla de radiación no es un alterno: es el mismo aeródromo con otro nombre.",
          "**Traduce a combustible.** Espera, desvío y reserva. La decisión termina en un número de kilos, no en una impresión.",
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Despacho, vuelo nocturno",
        situacion:
          "Tu destino trae en la ventana de llegada: **`0800 FG BKN003`**, con **`BECMG`** a mejor una hora después de tu ETA. El alterno que te propone el despacho está a 35 millas y su TAF trae **`PROB40 TEMPO 0300/0700 0600 FG`**.",
        pregunta: "¿Aceptas ese alterno?",
        claves: [
          "El destino está por debajo de casi cualquier mínimo: 800 metros con techo de 300 pies. Voy a necesitar el alterno de verdad, no de trámite.",
          "El alterno trae **la misma niebla**, en la misma franja horaria, y está a 35 millas. La niebla de radiación nocturna es un fenómeno de área: si se forma en uno, es probable que se forme en el otro.",
          "Un 40 % de probabilidad de 600 metros en mi ventana **no es un alterno holgado**. Es un segundo destino con el mismo problema.",
          "Lo que planteo: un alterno más lejos pero fuera del sistema, aunque cueste combustible. Y el BECMG a mejor una hora después de mi ETA abre la otra opción, que es llevar combustible para esperar en vez de desviar.",
        ],
        cierre:
          "La pregunta del evaluador no es si sabes calcular. Es si te das cuenta de que dos aeródromos a 35 millas con la misma niebla son un solo aeródromo.",
      },
      {
        kind: "check",
        question:
          "El TAF del destino da condiciones buenas salvo un `TEMPO` bajo mínimos que solapa tu ETA. ¿Cómo lo tratas para decidir el alterno?",
        options: [
          "Como poco probable: lo predominante es lo que manda",
          "Como condición esperable en mi ventana: planifico con ella",
          "Depende de si el TEMPO trae PROB o no",
        ],
        answer: 1,
        explain:
          "Un TEMPO no es una posibilidad remota: es una fluctuación que el pronosticador espera dentro de esa ventana. Si solapa tu llegada, planificas con ella. Lo predominante describe la mayor parte del periodo, no necesariamente tu minuto.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Para qué sirve el TAF en la planificación de un vuelo?",
            respuesta:
              "Para tres decisiones: si el destino va a estar utilizable a mi hora de llegada, si necesito alterno y cuál, y cuánto combustible llevo. El TAF es el documento con el que se justifica esa planificación, y por eso lo primero que se hace con él es situar la hora estimada de llegada dentro de su línea de tiempo.",
            claves: ["Destino utilizable a la ETA", "Necesidad y elección de alterno", "Combustible"],
          },
          {
            nivel: "interpretacion",
            q: "¿Qué hace que un alterno sea un buen alterno?",
            respuesta:
              "Que su pronóstico esté holgadamente por encima de los mínimos en mi ventana, que tenga la aproximación y los servicios que voy a necesitar, y sobre todo que **no comparta el fenómeno del destino**. Un alterno cercano con el mismo frente o la misma niebla de área no añade seguridad, solo distancia. A veces el alterno correcto es el que está más lejos.",
            claves: ["Holgadamente sobre mínimos", "Aproximación y servicios disponibles", "Fuera del sistema meteorológico del destino"],
          },
          {
            nivel: "situacion",
            q: "Vas en ruta y el destino se deteriora por debajo de lo pronosticado. ¿Qué haces?",
            respuesta:
              "Lo primero, actualizar la información: METAR más reciente y TAF enmendado si lo hay. Después comparar el combustible que me queda con lo que cuesta esperar y con lo que cuesta desviar, y decidir con margen, no en el último momento. Y decidirlo antes de llegar al punto en que el alterno deje de ser alcanzable con reservas: esa es la decisión que no se puede tomar tarde.",
            claves: ["Actualizar METAR y TAF AMD", "Comparar esperar contra desviar", "Decidir antes de perder el alterno"],
          },
        ],
      },
      {
        kind: "summary",
        items: [
          "Sitúa tu ETA en la línea de tiempo y planifica para lo peor que el pronóstico admite en esa ventana.",
          "TEMPO y PROB que solapen tu llegada cuentan como condición esperable.",
          "Un alterno que comparte el fenómeno del destino no es un alterno.",
          "Los mínimos y los márgenes los fija tu norma nacional y tu manual de operaciones: búscalos ahí.",
        ],
      },
    ],
  },

]

/**
 * La lección completa, en seis niveles que se leen en orden.
 *
 * Primero la teoría del clima, después el código del aeródromo y al final la
 * información en ruta. Se puede decodificar `BKN015CB` sin saber qué es un
 * cumulonimbus, pero no se puede **decidir** con él; y el PIREP, los avisos y
 * las cartas dan por sabidos el METAR y el TAF, así que van detrás de ellos.
 *
 * Hasta el 11 de septiembre de 2026 la información en ruta iba delante del
 * código (lecciones 13 a 17) y el índice mezclaba las partes de teoría con
 * «Básico / Intermedio / Avanzado» del METAR. El progreso guardado se movió con
 * la migración 20260911030000_meteorologia_orden_por_niveles.sql.
 *
 * Los `n` del código y de la información en ruta se recalculan aquí en vez de
 * reescribirse a mano en cada pantalla: así mover una parte no obliga a tocar
 * el contenido, que es lo que se acaba desincronizando.
 */
const TEORIA: DocScreen[] = [...PARTE_ATMOSFERA, ...PARTE_AGUA, ...PARTE_FRENTES]

export const METAR_LESSON: DocScreen[] = [
  ...TEORIA,
  ...CODIGO.map((s, i) => ({ ...s, n: TEORIA.length + i + 1 })),
  ...PARTE_SERVICIOS.map((s, i) => ({ ...s, n: TEORIA.length + CODIGO.length + i + 1 })),
]

// La numeración es la que se guarda como progreso: si una parte se desordena,
// mejor caerse al arrancar que marcar leída la lección equivocada.
METAR_LESSON.forEach((s, i) => {
  if (s.n !== i + 1) {
    throw new Error(`metarLesson: la lección ${s.n} está en la posición ${i + 1}`)
  }
})

/** Cuántas lecciones del código son de METAR; las que siguen son de TAF. */
const LECCIONES_METAR = 9

export const METAR_NIVELES = [
  { titulo: "Nivel 1 · La atmósfera y el aire en movimiento", desde: 1 },
  { titulo: "Nivel 2 · Agua, estabilidad y nubes", desde: PARTE_ATMOSFERA.length + 1 },
  {
    titulo: "Nivel 3 · Masas de aire, frentes y tormentas",
    desde: PARTE_ATMOSFERA.length + PARTE_AGUA.length + 1,
  },
  { titulo: "Nivel 4 · El METAR, grupo por grupo", desde: TEORIA.length + 1 },
  { titulo: "Nivel 5 · El TAF", desde: TEORIA.length + LECCIONES_METAR + 1 },
  { titulo: "Nivel 6 · Información en ruta", desde: TEORIA.length + CODIGO.length + 1 },
]

export const METAR_LESSON_TOTAL = METAR_LESSON.length

/** Lectura estimada de la lección entera, en minutos. Ver LESSON_MINUTES. */
export const METAR_LESSON_MINUTES = METAR_LESSON.reduce((t, s) => t + s.minutes, 0)

export const METAR_SOURCES: string[] = [
  "Los puntos sin respaldo en estos manuales van marcados en el propio texto (detalle en src/data/metar/FUENTES.md del repositorio).",
  "Briefing para pilotos: METAR. Erick De Paz, Meteorólogo Clase III OMM (presentación de curso).",
  "Leyenda para lectura de METAR y TAF, Volar3.com (material de curso).",
  "Norma de referencia: OACI, Anexo 3 (Servicio meteorológico para la navegación aérea internacional) y OMM, Manual de claves No. 306. Confirma contra la edición vigente.",
]

export type { LessonBlock }
