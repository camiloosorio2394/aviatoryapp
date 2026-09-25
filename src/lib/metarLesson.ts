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
        text: "**Qué ves en la portada:** una cortina de lluvia afecta un sector del aeródromo mientras otro queda más despejado. **Cómo lo reconoces:** la precipitación forma una franja localizada y el pavimento cercano está mojado; la foto no demuestra que haya tormenta. **Qué decides:** leer el fenómeno reportado con su hora, comprobar su desplazamiento y revisar pista, radar y avisos antes de elegir una ventana de operación.",
      },
      {
        kind: "p",
        text: "Un grupo de tiempo presente puede reunir **intensidad o proximidad + descriptor + fenómeno**, pero no todas las piezas aparecen siempre. En `+TSRA`, `TS` identifica tormenta (thunderstorm), `RA` lluvia (rain) y `+` indica lluvia fuerte: no mide la intensidad de los rayos ni de la turbulencia. Lee el código junto con la visibilidad, las nubes y el viento.",
      },
      { kind: "p", text: "**Calificadores** de intensidad o proximidad:" },
      {
        kind: "kv",
        items: [
          { k: "-", v: "precipitación ligera; sin signo, intensidad moderada cuando corresponde reportarla" },
          { k: "+", v: "precipitación fuerte; en +TSRA califica a la lluvia, no a la tormenta" },
          { k: "VC", v: "fenómeno en la vecindad (vicinity) del aeródromo al observarlo" },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "RE no describe el tiempo actual",
        text: "El prefijo `RE` (recent) pertenece a información suplementaria sobre ciertos fenómenos significativos ocurridos desde el informe anterior o durante la última hora, lo que sea menor, y ausentes al observar. `RERA` no significa que esté lloviendo ahora ni se incluye automáticamente después de cualquier lluvia ligera.",
      },
      { kind: "p", text: "**Descriptores** (cómo se presenta):" },
      {
        kind: "kv",
        items: [
          { k: "TS", v: "tormenta (thunderstorm)" },
          { k: "SH", v: "chubascos (showers)" },
          { k: "FZ", v: "engelante: gotas sobreenfriadas que pueden congelarse al contacto (freezing)" },
          { k: "MI", v: "superficial, por ejemplo niebla de escaso espesor vertical (shallow)" },
          { k: "BC", v: "en bancos (patches)" },
          { k: "PR", v: "parcial (partial)" },
          { k: "DR", v: "levantado a poca altura por el viento (low drifting)" },
          { k: "BL", v: "levantado por el viento a mayor altura (blowing)" },
        ],
      },
      { kind: "p", text: "**Fenómenos** que debes reconocer; su frecuencia depende del lugar:" },
      {
        kind: "kv",
        items: [
          { k: "RA", v: "lluvia · DZ llovizna · GR granizo" },
          { k: "FG", v: "niebla · BR neblina; ambos son oscurecimientos por gotas de agua" },
          { k: "HZ", v: "calima o bruma seca · FU humo" },
          { k: "VA", v: "ceniza volcánica; exige revisar avisos específicos" },
          { k: "SQ", v: "turbonada · FC nube embudo; +FC tornado o tromba marina" },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "FG y BR: observa también la causa",
        text: "Con oscurecimiento por gotas de agua, `FG` suele corresponder a visibilidad inferior a 1.000 m y `BR` a visibilidad desde 1.000 m hasta unos 5.000 m. No basta leer un número para afirmar que hay niebla: polvo, humo o precipitación también reducen la visibilidad. Los mínimos se verifican con los valores y procedimientos aplicables, no con la sigla aislada.",
      },
      {
        kind: "p",
        text: "**Ejemplos de lectura.** La tabla muestra combinaciones posibles y su significado operacional; no todas son frecuentes en el mismo aeródromo:",
      },
      {
        kind: "table",
        head: ["Grupo", "Piezas", "Qué es", "Qué implica"],
        rows: [
          ["`-RA`", "`-` + `RA`", "Lluvia ligera", "Comprueba pista, frenado y evolución; ligera no equivale a pista seca"],
          ["`+TSRA`", "`+` + `TS` + `RA`", "Tormenta con lluvia fuerte", "Evalúa convección, cizalladura, granizo y ruta; + califica la lluvia"],
          ["`SHRA`", "`SH` + `RA`", "Chubascos de lluvia", "Pueden cambiar con rapidez la visibilidad y el estado de pista"],
          ["`VCTS`", "`VC` + `TS`", "Tormenta en la vecindad", "Confirma posición y desplazamiento; no supone ausencia de riesgo en la pista"],
          ["`FZRA`", "`FZ` + `RA`", "Lluvia engelante", "Alerta por engelamiento; verifica limitaciones y evita exposición no autorizada"],
          ["`MIFG`", "`MI` + `FG`", "Niebla superficial", "Revisa visibilidad y RVR; no infieras un techo de nubes"],
          ["`BR`", "`BR`", "Neblina", "Revisa visibilidad y tendencia, no solo la etiqueta"],
          ["`RERA`", "`RE` + `RA`", "Lluvia reciente reportada", "No estaba ocurriendo en la hora de observación"],
          ["`VA`", "`VA`", "Ceniza volcánica", "Revisa avisos de ceniza y restricciones de la operación"],
        ],
      },
      {
        kind: "summary",
        items: [
          "Cuando aparecen, las piezas se leen como **calificador + descriptor + fenómeno**; algunas faltan según el código.",
          "`-` y `+` califican intensidad de precipitación; `VC` indica proximidad. `RE` pertenece a información reciente suplementaria.",
          "`TS`, `FZ` y `VA` exigen revisar amenaza, limitaciones y avisos, no decidir solo por una sigla.",
          "Si no reconoces una combinación, sepárala en piezas y confirma su interpretación en la clave oficial.",
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
          "`VC` significa **en la vecindad** (vicinity): la tormenta se observó cerca del aeródromo, no sobre el punto de observación en ese momento. No fija su trayectoria ni asegura que las pistas estén libres de ráfagas; consulta radar, avisos y reportes recientes antes de decidir.",
      },
      {
        kind: "infografia",
        nombre: "meteo-tiempo-presente",
      },
      {
        kind: "p",
        text: "**Qué ves en el esquema:** `+`, `TS` y `RA` separan intensidad de lluvia, descriptor de tormenta y fenómeno de lluvia. **Cómo lo reconoces:** el signo va antes de las letras y no describe por sí solo la fuerza del viento o de los rayos. **Qué decides:** combinar la clave con evolución, radar, avisos, visibilidad y pista; no convertir una etiqueta meteorológica en autorización operacional.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En ruta, pidiendo el METAR de destino",
        situacion:
          "Te llega **`VCTS`** en el METAR de tu destino. El resto del informe está limpio: visibilidad 9999, BKN025, viento flojo.",
        pregunta: "¿Es un problema o no?",
        claves: [
          "**VC indica vecindad**: aproximadamente entre 8 y 16 km del aeródromo en la observación, no una trayectoria futura ni una distancia a tu aeronave.",
          "Una tormenta cercana puede traer **ráfagas y cizalladura** aun con viento reportado flojo. Confirma ubicación y movimiento con radar, avisos y reportes locales.",
          "El resto del METAR describe condiciones de la observación, no un pronóstico. Contrasta la tendencia y el pronóstico de aeródromo (TAF), pero actualiza con información más reciente.",
          "Revisa combustible, espera y alterno antes de depender de que la celda permanezca fuera del campo.",
        ],
        cierre:
          "Una observación tranquila junto a `VCTS` no garantiza una llegada tranquila: la decisión depende de posición, desplazamiento, condiciones actuales y márgenes de la operación.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Cómo se estructura un grupo de tiempo presente?",
            respuesta:
              "Cuando aparecen las tres piezas, se leen en orden: intensidad o proximidad, descriptor y fenómeno. Menos y más expresan intensidad de precipitación; VC indica vecindad. TS es tormenta, SH chubascos y FZ engelante. `+TSRA` es tormenta con lluvia fuerte: el signo no mide la intensidad de la tormenta. Algunos grupos solo tienen una o dos piezas, y RE es información reciente suplementaria.",
            claves: ["Orden de las piezas presentes", "+ califica la lluvia en +TSRA", "VC proximidad; RE reciente suplementario"],
          },
          {
            nivel: "interpretacion",
            q: "¿Qué diferencia hay entre FG y BR, y por qué importa?",
            respuesta:
              "Con oscurecimiento por gotas de agua, FG identifica niebla con visibilidad inferior a 1.000 m y BR neblina desde 1.000 m, normalmente hasta alrededor de 5.000 m. No deduzco FG solo por la cifra: lluvia, humo o polvo pueden reducir la visibilidad. Para una aproximación comparo el valor y el RVR aplicable con los mínimos publicados; la sigla no cambia por sí sola esos mínimos.",
            claves: ["FG y BR dependen del fenómeno", "Referencia de 1.000 m", "Mínimos: comparar valores, no siglas"],
          },
          {
            nivel: "situacion",
            q: "Ves `FZRA` en el METAR. ¿Qué significa y qué haces?",
            respuesta:
              "Es lluvia de gotas sobreenfriadas que pueden congelarse al tocar la aeronave o el suelo. Trato el reporte como una alerta seria: compruebo aprobación y limitaciones de la aeronave, el plan de protección contra hielo, estado de pista y procedimientos del operador. Si hay encuentro en vuelo, aplico las acciones del manual y coordino una salida segura de la condición; no supongo que basta con cambiar de nivel.",
            claves: ["Gotas sobreenfriadas", "Limitaciones y protección contra hielo", "Salir de la condición según procedimiento"],
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
        text: "**En vuelo:** una capa dispersa, un techo y un cumulonimbo no significan lo mismo. La imagen de portada muestra nubes desde cabina, pero no permite medir octavos, bases ni declarar CAVOK para un aeródromo. Esos datos se obtienen del informe vigente y se contrastan con la operación.",
      },
      {
        kind: "p",
        text: "Las capas de nubes se reportan con una sigla de cobertura, medida en **octavos de cielo**, más la altura de la base en **centenares de pies** sobre la elevación del aeródromo:",
      },
      {
        kind: "kv",
        items: [
          { k: "SKC", v: "despejado (0/8)" },
          { k: "FEW", v: "escasas (1/8 a 2/8): FEW010 = escasas a 1000 ft" },
          { k: "SCT", v: "dispersas (3/8 a 4/8)" },
          { k: "BKN", v: "fragmentadas (5/8 a 7/8): la primera capa BKN u OVC puede definir el techo" },
          { k: "OVC", v: "cubierto (8/8): OVC220 = cubierto a 22 000 ft" },
        ],
      },
      {
        kind: "list",
        items: [
          "**CB** (cumulonimbo) y **TCU** (cúmulo en torre) identifican convección en el grupo de capa, por ejemplo `BKN015CB`. Alertan sobre posibles tormentas, precipitación intensa, granizo, engelamiento y turbulencia; la foto o la sigla solas no ubican cada amenaza.",
          "**`VV002`**: visibilidad vertical de 200 ft cuando el cielo está oscurecido y no se distingue una base. Es un techo indefinido, no una capa `BKN` a 200 ft.",
          "**El techo** es la base de la capa más baja `BKN` u `OVC`; con cielo oscurecido, se usa la visibilidad vertical reportada. Es un dato relevante, pero las reglas de vuelo y la aproximación dependen también de visibilidad, mínimos y procedimientos.",
        ],
      },
      {
        kind: "p",
        text: "**CAVOK** (ceiling and visibility OK) resume tres condiciones simultáneas en el aeródromo: visibilidad de **10 km o más**; ningún fenómeno de tiempo presente significativo para la aviación; y ninguna nube por debajo de **5000 ft sobre el aeródromo o de la altitud mínima de sector, la que sea mayor**, sin `CB` ni `TCU` a ninguna altura. Sustituye a los grupos de visibilidad, tiempo presente y nubes. Puede haber nubes altas: **no significa cielo despejado**.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "CAVOK no es una autorización operacional",
        text: "CAVOK describe lo observado en un lugar y una hora. No elimina el análisis de viento, pista, pronóstico, ruta, mínimos, alternos ni cambios posteriores. Tampoco equivale a ausencia de nubes en todo el cielo.",
      },
      {
        kind: "breakdown",
        caption:
          "En este ejemplo: cobertura, base en centenares de pies y tipo de nube convectiva al final del mismo grupo.",
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
            detail: "Cumulonimbo. `TCU` indica cúmulo en torre. Ambos señalan convección que exige evaluación específica.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Error común: leer la altura como pies directos",
        text: "`FEW010` indica base a 1000 ft sobre la elevación del aeródromo, no a 10 000 ft. Multiplica los tres dígitos por 100 y conserva esa referencia vertical al comparar con altitudes publicadas.",
      },
      {
        kind: "summary",
        items: [
          "Cobertura en octavos: `SKC` 0/8, `FEW` 1 a 2, `SCT` 3 a 4, `BKN` 5 a 7, `OVC` 8/8.",
          "La altura va en **centenares de pies** sobre el aeródromo.",
          "El **techo** es la base de la primera capa `BKN` u `OVC`, o la visibilidad vertical si el cielo está oscurecido.",
          "`CB` y `TCU` señalan convección: evalúa su posición, evolución y riesgos, aunque el techo sea alto.",
          "`VV002` significa cielo oscurecido sin base definida, con 200 ft de visibilidad vertical; CAVOK no exige cielo totalmente despejado.",
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
          "El techo lo da la primera capa que cubre **más de la mitad** del cielo: aquí `BKN025`, 2500 ft sobre el aeródromo. `FEW` y `SCT` no forman el techo, pero `CB` advierte convección que se evalúa por separado; el techo no decide por sí solo la operación.",
      },
      {
        kind: "infografia",
        nombre: "meteo-cobertura",
      },
      {
        kind: "p",
        text: "**Qué ves:** el esquema compara coberturas representativas en octavos. **Cómo lo reconoces:** `FEW` y `SCT` dejan mayor parte del cielo libre, mientras `BKN` y `OVC` cubren más de la mitad o todo. **Qué decides:** identificar el primer `BKN`/`OVC` como techo cuando la base está definida; el dibujo no mide la cobertura real de un aeródromo.",
      },
      {
        kind: "reconoce",
        titulo: "Anatomía visual de un cumulonimbo",
        intro: "Escena ilustrativa de convección desarrollada: su forma ayuda a reconocer el riesgo, pero no proporciona altura, ubicación ni intensidad certificadas para un vuelo.",
        imagen: {
          src: "/modulos/meteorologia/mt-t18-01-cumulonimbo.webp",
          alt: "Cumulonimbo aislado con torre vertical, yunque extendido y cortina de precipitación bajo su base",
          ancho: 1600,
          alto: 800,
        },
        puntos: [
          { x: 29, y: 31, que: "Torre convectiva", significa: "El crecimiento vertical y los bordes definidos muestran una nube en fuerte desarrollo.", piloto: "Busca posición, desplazamiento y separación respecto de la ruta con radar, avisos y reportes disponibles." },
          { x: 74, y: 18, que: "Yunque", significa: "La cima se extiende lateralmente en niveles altos; la amenaza no se limita al núcleo oscuro bajo la nube.", piloto: "No interpretes un corredor visual junto al yunque como distancia segura sin evaluación meteorológica." },
          { x: 46, y: 73, que: "Precipitación bajo la base", significa: "La cortina bajo la nube indica precipitación localizada; la foto no mide su intensidad ni prueba que alcance una pista.", piloto: "Comprueba tiempo presente, viento, radar y tendencia antes de planificar el paso o la aproximación." },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** una torre, un yunque extendido y precipitación bajo la base. **Cómo lo reconoces:** el gran desarrollo vertical y la expansión superior distinguen un cumulonimbo maduro de nubes bajas dispersas. **Qué decides:** evaluar convección con información actual de ruta y aeródromo; ni la foto ni `CB` por sí solos fijan una separación o autorizan atravesarla.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En aproximación, mínimos de 600 pies",
        situacion:
          "El METAR trae **`SCT007 BKN015 OVC030`**. Estás preparando una aproximación con una altura mínima publicada equivalente a 600 pies sobre el aeródromo.",
        pregunta: "¿Qué capa forma el techo y qué más necesitas antes de decidir?",
        claves: [
          "**El techo es BKN015**, 1500 ft sobre el aeródromo: es la primera capa `BKN`/`OVC`. `SCT007` está más baja, pero no forma el techo.",
          "Que el techo reportado esté por encima de 600 ft **no demuestra que la aproximación sea viable**. Faltan visibilidad o RVR, mínimos publicados completos, estado de pista, capacidad de la aeronave y condiciones actuales.",
          "`SCT007` puede afectar las referencias visuales según su posición y evolución; no permite afirmar que la aeronave entrará y saldrá de nube exactamente a 700 ft.",
          "Las bases del METAR están referidas a la elevación del aeródromo. Para compararlas con altitudes sobre el nivel medio del mar, respeta la referencia y el procedimiento publicado.",
        ],
        cierre:
          "Techo y capa más baja no son lo mismo. Ninguno, aislado, sustituye la comparación con los mínimos ni las referencias visuales exigidas para continuar.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué significan FEW, SCT, BKN y OVC y qué es el techo?",
            respuesta:
              "Son coberturas en octavos: FEW de 1 a 2, SCT de 3 a 4, BKN de 5 a 7 y OVC los 8. Con base definida, el techo es la primera capa BKN u OVC; si el cielo está oscurecido, se reporta visibilidad vertical como techo indefinido. Las bases se expresan en centenares de pies sobre la elevación del aeródromo.",
            claves: ["Octavos de cielo", "Techo = primera BKN/OVC o VV", "Centenas de pies sobre el aeródromo"],
          },
          {
            nivel: "interpretacion",
            q: "¿Qué es CAVOK y qué tiene que cumplirse para que aparezca?",
            respuesta:
              "Es la abreviatura de ceiling and visibility OK, y sustituye a los grupos de visibilidad, tiempo presente y nubes. Requiere visibilidad de 10 km o más, ningún fenómeno significativo para la aviación, ninguna nube por debajo de 5000 ft sobre el aeródromo o de la altitud mínima de sector, la que sea mayor, y ningún CB ni TCU a ninguna altura. Puede haber nubes altas.",
            claves: ["Visibilidad 10 km o más", "Sin fenómenos significativos", "Sin nubes bajo 5.000 pies ni CB ni TCU"],
          },
          {
            nivel: "situacion",
            q: "En el METAR ves `BKN018CB`. ¿Qué cambia respecto a un `BKN018` normal?",
            respuesta:
              "La base reportada sigue siendo 1800 ft sobre el aeródromo y forma techo, pero `CB` identifica cumulonimbo. Puede asociarse con turbulencia, cizalladura, granizo, engelamiento y rayos. Evaluaría ubicación y desplazamiento con información actual y evitaría planificar un cruce de esa convección; no asumiría que todos esos fenómenos ocurren a la vez en la pista.",
            claves: ["CB = cumulonimbo", "Amenazas posibles, no todas confirmadas", "Ubicación, evolución y evitación"],
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
        text: "**En la operación:** la portada muestra humedad y neblina localizada al amanecer. No demuestra que el aeródromo tenga niebla generalizada ni un valor concreto de presión. Para decidir, interpreta el METAR vigente y observa cómo cambian visibilidad, viento y nubosidad.",
      },
      {
        kind: "p",
        text: "**`20/12`**: temperatura del aire 20 °C y **punto de rocío** 12 °C. El punto de rocío es la temperatura a la que ese aire se saturaría si se enfría sin cambiar apreciablemente su contenido de vapor de agua. La separación temperatura–rocío es 8 °C. Los valores negativos llevan `M`: `M02/M04` indica −2 °C y −4 °C, respectivamente.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Saturación no significa niebla segura",
        text: "Una separación pequeña aumenta la posibilidad de niebla o nubes bajas si la capa cercana al suelo se enfría y permanece estable. `09/09` indica aire próximo a saturación en el punto de observación; no permite afirmar que haya niebla, precipitación ni visibilidad reducida. Confirma esos fenómenos en sus propios grupos y en las observaciones recientes. Para performance usa temperatura, presión y condiciones del aire según el manual, no solo esta diferencia.",
      },
      {
        kind: "p",
        text: "**`Q1012`**: ajuste altimétrico **QNH** de 1012 hectopascales (hPa). Al colocarlo en un altímetro barométrico, este debe indicar aproximadamente la elevación del aeródromo en tierra; no garantiza por sí solo la altitud verdadera en aire muy frío. En informes con formato estadounidense, `A2980` indica 29,80 pulgadas de mercurio (inches of mercury, inHg). No confundas el valor `Q` con uno `A` ni cambies unidades sin verificar.",
      },
      {
        kind: "table",
        head: ["Grupo", "Lectura", "Decisión"],
        rows: [
          ["`M02/M04`", "Temperatura −2 °C; rocío −4 °C", "Comprueba precipitación, hielo y limitaciones; la temperatura negativa sola no prueba lluvia engelante"],
          ["`Q1012`", "QNH 1012 hPa", "Ajusta y verifica el altímetro según fase, procedimiento y fuente vigente"],
          ["`A2980`", "Ajuste 29,80 inHg", "Reconoce el formato en pulgadas; no lo leas como hPa"],
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "De presión alta a baja, atención a la altitud real",
        text: "Si mantienes un ajuste altimétrico demasiado alto al entrar en una zona de menor presión, el altímetro indicará más altitud de la que realmente tienes. Obtén y ajusta el valor vigente según el procedimiento y la fase de vuelo. Incluso con QNH correcto, el frío puede hacer que la altitud verdadera sea menor que la indicada; aplica las correcciones exigidas por las cartas y normas pertinentes.",
      },
      {
        kind: "reconoce",
        titulo: "Verificación altimétrica en cabina",
        intro: "La fotografía representa una comprobación en cabina; el mando y las pantallas no tienen lecturas legibles ni identifican un QNH real.",
        imagen: {
          src: "/modulos/meteorologia/mt-t19-01-comprobacion-cabina.webp",
          alt: "Piloto realiza una comprobación en el panel de vuelo con pantallas desenfocadas y nubosidad visible fuera de cabina",
          ancho: 1600,
          alto: 800,
        },
        puntos: [
          { x: 59, y: 37, que: "Comprobación en el panel", significa: "La mano representa una acción de verificación; la foto no permite identificar qué mando se manipula ni el ajuste seleccionado.", piloto: "Lee el QNH comunicado, introdúcelo en el equipo correcto y haz la comprobación cruzada que exija el operador." },
          { x: 31, y: 72, que: "Pantallas de vuelo", significa: "Las pantallas no tienen cifras legibles, así que no representan una altitud ni un QNH utilizable.", piloto: "Confirma unidades, valor y referencia altimétrica en ambos puestos de acuerdo con el procedimiento." },
          { x: 23, y: 16, que: "Nubes fuera de cabina", significa: "La nubosidad exterior da contexto meteorológico, pero no permite deducir la presión local.", piloto: "No estimes el QNH por la apariencia del cielo; usa una fuente vigente y verifica la transición de ajustes." },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** una comprobación de panel y nubosidad exterior. **Cómo lo reconoces:** la mano está sobre el panel, pero no hay cifras legibles ni un mando QNH identificable. **Qué decides:** obtener el ajuste vigente, confirmar unidades y comprobar las indicaciones de ambos altímetros conforme a la fase y al procedimiento; la imagen no aporta valores para volar.",
      },
      {
        kind: "check",
        question:
          "Amanece con `06/06` y viento en calma. ¿Qué puedes concluir del grupo temperatura–rocío?",
        options: [
          "La temperatura y el rocío no sirven para evaluar cambios de visibilidad",
          "Hay aire próximo a saturación; debo comprobar visibilidad, nubes y tendencia antes de inferir niebla",
          "La niebla y el cierre de la pista son inevitables en la próxima hora",
        ],
        answer: 1,
        explain:
          "`06/06` indica temperatura y punto de rocío iguales a la precisión reportada: aire cercano a saturación. Puede favorecer niebla bajo condiciones adecuadas, pero no garantiza su formación, ubicación ni momento. Revisa visibilidad, cobertura, TAF y reportes recientes.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Aeródromo de salida, primera hora de la mañana",
        situacion:
          "El METAR trae **`04/04`** y **`Q1024`**, viento en calma y visibilidad de 8000 m. El sol acaba de salir.",
        pregunta: "¿Qué te dicen esos grupos y qué comprobarías antes de salir?",
        claves: [
          "**`04/04`** muestra separación cero a la precisión reportada y posibilidad de condensación; no diagnostica por sí solo niebla futura.",
          "**`Q1024`** es el ajuste altimétrico en hPa. Verifica que se haya seleccionado y cruzado según procedimiento; no es una medida de visibilidad.",
          "**8000 m** es la visibilidad reportada para la observación, no una garantía para la hora prevista de salida. El viento en calma puede favorecer persistencia de humedad cerca del suelo, pero la evolución depende de más factores.",
          "Consultaría METAR/SPECI recientes, pronóstico de aeródromo (TAF), tendencia local, mínimos de salida y alterno antes de decidir.",
        ],
        cierre:
          "La separación temperatura–rocío es una señal de vigilancia, no un pronóstico cronometrado. El QNH es un ajuste instrumental distinto; ambos grupos se interpretan con el resto del informe.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es el punto de rocío y por qué aparece en el METAR?",
            respuesta:
              "Es la temperatura a la que el aire se saturaría al enfriarse sin variar apreciablemente su contenido de vapor. La diferencia entre temperatura y rocío ayuda a reconocer proximidad a la saturación y posibilidad de niebla o nubes bajas bajo condiciones apropiadas; no predice por sí sola que se formen.",
            claves: ["Temperatura de saturación", "Diferencia pequeña = mayor vigilancia", "Confirmar visibilidad y tendencia"],
          },
          {
            nivel: "interpretacion",
            q: "¿Qué es el QNH y qué pasa si vuelas con uno desactualizado?",
            respuesta:
              "Es el ajuste de presión que hace que el altímetro indique aproximadamente la elevación del aeródromo en tierra. Si mantengo un QNH más alto que el vigente, el instrumento puede indicar más altitud de la que realmente tengo; de alta a baja presión sin actualizar, el terreno queda más cerca de lo que indica. Verifico la fuente, unidades y ajuste en la fase de vuelo aplicable, y considero correcciones por frío cuando correspondan.",
            claves: ["Ajuste para elevación aproximada en tierra", "De alta a baja, altitud real menor", "Fuente y ajuste vigentes"],
          },
          {
            nivel: "situacion",
            q: "Ves `M02/M03` en el METAR y llueve. ¿Qué te preocupa?",
            respuesta:
              "La `M` significa menos: −2 °C de temperatura y −3 °C de rocío. La lluvia cerca o por debajo de cero exige investigar si hay gotas sobreenfriadas o lluvia engelante (`FZRA`), además del estado y temperatura de la pista. No puedo declarar `FZRA` solo con ese par de temperaturas. Revisaría el tiempo presente, avisos, protección y limitaciones contra hielo, y los procedimientos de deshielo y frenado aplicables.",
            claves: ["M = valor negativo", "No inferir FZRA solo por temperatura", "Verificar hielo, pista y limitaciones"],
          },
        ],
      },
    ],
  },

  // ── 8 ──────────────────────────────────────────────────────────────────────
  {
    n: 8,
    title: "Tendencias y comentarios",
    kicker: "Pronóstico corto y grupos suplementarios",
    minutes: 3,
    blocks: [
      {
        kind: "p",
        text: "**En la portada:** un banco de nubes se acerca a un sector del aeropuerto, pero una foto no permite saber si el cambio se establecerá o será pasajero. Para eso se consulta el pronóstico de tendencia cuando esté incluido en el METAR y se contrasta con observaciones posteriores.",
      },
      {
        kind: "p",
        text: "La **tendencia** es un pronóstico corto para las **dos horas siguientes a la hora de observación** del METAR o SPECI, cuando el servicio la emite. No todas las estaciones la incluyen. `NOSIG` (no significant change) indica que no se prevé un cambio meteorológico significativo dentro de sus criterios; si se espera uno, la tendencia usa `BECMG` (becoming) o `TEMPO` (temporary):",
      },
      {
        kind: "kv",
        items: [
          { k: "NOSIG", v: "no se prevé cambio significativo en el periodo de tendencia; no equivale a buen tiempo ni sustituye el TAF" },
          { k: "BECMG", v: "cambio gradual o irregular que llega a las condiciones pronosticadas dentro del periodo" },
          { k: "TEMPO", v: "fluctuaciones temporales: cada episodio dura menos de una hora y, sumados, ocupan menos de la mitad del periodo indicado" },
          { k: "FM / TL / AT", v: "from / till / at: en una tendencia delimitan desde, hasta o a una hora concreta, seguidos de hora y minutos UTC: FM1200 TL1300" },
          { k: "NSW", v: "no significant weather: sin tiempo significativo previsto tras el cambio correspondiente; no significa ausencia de todo fenómeno futuro" },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "No mezcles TREND, TAF y comentarios",
        text: "No uses `BECMG 1216` ni `TEMPO 0306` como modelos de tendencia: cuando se delimita el cambio, `FM`/`TL`/`AT` llevan hora y minutos UTC dentro de sus dos horas de validez. `PROB40` (probability 40 percent) y un `FM` usado como grupo de cambio independiente pertenecen al TAF. `RMK` introduce información suplementaria, no una tendencia. `AUTO` y `COR` tampoco son tendencias.",
      },
      {
        kind: "table",
        head: ["Grupo ilustrativo", "Cómo leerlo", "Qué cambia en tu decisión"],
        rows: [
          ["`NOSIG`", "No se prevé cambio significativo en las dos horas posteriores a la observación", "Comprueba hora y vigencia; el tiempo actual puede seguir siendo adverso"],
          ["`BECMG FM1200 TL1300 3000 BR`", "Entre 12:00 y 13:00 UTC se espera que la visibilidad pase a 3000 m con neblina", "Planifica con la condición que se establecerá y confirma observaciones nuevas"],
          ["`TEMPO FM1200 TL1300 3000 BR`", "Dentro de esa hora puede haber episodios temporales de 3000 m con neblina", "La condición puede coincidir con tu llegada aunque entre episodios mejore"],
        ],
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t20-01-tendencias.webp",
        alt: "Línea temporal didáctica de dos horas: BECMG evoluciona hacia una condición que permanece; TEMPO muestra dos episodios breves que vuelven a la condición base",
        ancho: 1600,
        alto: 800,
        pie: "Ejemplo temporal, no pronóstico real: BECMG establece una condición; TEMPO aparece por episodios. Las horas exactas de un vuelo se toman del producto vigente.",
      },
      {
        kind: "p",
        text: "**Qué ves:** dos líneas temporales sobre un mismo periodo de dos horas. **Cómo lo reconoces:** en `BECMG` la condición nueva permanece tras la transición; en `TEMPO` hay episodios con regreso a la condición base. **Qué decides:** situar tu hora de llegada dentro de la ventana, verificar si el grupo es de tendencia o TAF y actualizar el informe; el esquema no es un pronóstico utilizable.",
      },
      {
        kind: "p",
        text: "**Grupos aparte:** `RMK` (remarks) precede comentarios o información suplementaria según el país; interpreta las abreviaturas con la clave del formato local. `AUTO` (automated) indica observación automatizada y `COR` (corrected), un informe corregido. Una estación automática puede tener limitaciones para identificar ciertos fenómenos; revisa el dato publicado y las fuentes complementarias sin suponer que todos los reportes automáticos son iguales.",
      },
      {
        kind: "check",
        question: "¿Qué diferencia hay entre `BECMG FM1200 TL1300 3000 BR` y `TEMPO FM1200 TL1300 3000 BR` en una tendencia válida para esa hora?",
        options: [
          "Ninguna: ambas garantizan 3000 m durante toda la hora",
          "`BECMG` establece la nueva condición; `TEMPO` describe episodios temporales durante la ventana",
          "`BECMG` expresa una probabilidad de 40 % y `TEMPO` de 60 %",
        ],
        answer: 1,
        explain:
          "`BECMG` pronostica una transición hacia la nueva condición; `TEMPO`, fluctuaciones que aparecen por ratos y regresan a la condición base entre episodios. `FM1200 TL1300` delimita de 12:00 a 13:00 UTC dentro de la tendencia. Comprueba siempre la hora de observación y la validez real.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es el grupo de tendencia de un METAR y cuánto cubre?",
            respuesta:
              "Cuando se incluye, es un pronóstico corto asociado al METAR o SPECI y válido para las dos horas siguientes a la hora de observación. `NOSIG` indica que no se prevé un cambio significativo; `BECMG` anuncia una transición hacia otras condiciones y `TEMPO` fluctuaciones temporales. No confundas esta sección con comentarios `RMK` ni con la validez más amplia del TAF.",
            claves: ["Dos horas desde la observación", "NOSIG, BECMG, TEMPO", "No confundir con TAF o RMK"],
          },
          {
            nivel: "interpretacion",
            q: "¿Qué diferencia hay entre BECMG y TEMPO?",
            respuesta:
              "`BECMG` pronostica que las condiciones alcanzarán los valores indicados durante la ventana de cambio. `TEMPO` anuncia episodios de menos de una hora cada uno, que en conjunto ocupan menos de la mitad del periodo indicado; entre ellos se espera la condición base. Un episodio de baja visibilidad puede coincidir con mi llegada, aunque no dure toda la ventana.",
            claves: ["BECMG establece otra condición", "TEMPO va y viene", "Comparar la ventana con la llegada"],
          },
          {
            nivel: "situacion",
            q: "El METAR de tu destino trae `NOSIG` pero llevas dos horas de vuelo por delante. ¿Te sirve?",
            respuesta:
              "Solo si mi llegada aún está dentro de las dos horas posteriores a la observación, y aun así `NOSIG` no dice que el tiempo sea bueno. Si llego fuera de esa ventana, consulto el TAF que cubra mi ETA y obtengo METAR/SPECI nuevos en ruta, además de avisos y mínimos aplicables. No extiendo la vigencia de `NOSIG` desde la hora en que yo lo leí.",
            claves: ["Dos horas desde la observación", "NOSIG no significa buen tiempo", "TAF y observaciones actualizadas"],
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
        text: "**En la portada:** dos pilotos contrastan información durante un briefing. La pantalla está deliberadamente ilegible: no representa un METAR real ni sustituye el informe vigente. **Cómo lo reconoces:** uno revisa la fuente mientras el otro observa el entorno. **Qué decides:** leer fecha, hora, grupos y cambios de forma ordenada, y traducirlos a límites concretos de tu operación.",
      },
      {
        kind: "p",
        text: "Usa siempre el mismo orden para no omitir un grupo. El METAR es una observación con hora concreta; antes de convertirlo en una decisión, verifica su vigencia y completa el panorama con pronóstico y avisos:",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Identidad y hora:** aeródromo, día y hora UTC. Confirma que el reporte corresponde a tu lugar y que sigue siendo pertinente para la hora de operación.",
          "**Viento:** dirección verdadera reportada, velocidad, ráfagas y variación. Para comparar con una pista identificada magnéticamente, usa la referencia apropiada antes de calcular componentes.",
          "**Visibilidad y tiempo:** visibilidad predominante, alcance visual en pista (RVR, runway visual range) cuando se publique y fenómenos presentes. Contrasta los valores exigidos por tu procedimiento.",
          "**Nubes y temperatura:** techo definido por la primera `BKN`/`OVC` o visibilidad vertical; identifica `CB`/`TCU`. Lee temperatura y rocío sin convertir una separación pequeña en niebla segura.",
          "**Ajuste y evolución:** QNH vigente, información suplementaria y tendencia si aparece. Cierra con pronóstico, avisos, estado de pista, mínimos y alternativas; ningún grupo aislado autoriza la operación.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t21-01-cinco-pasos.webp",
        alt: "Cinco tarjetas de lectura en secuencia: lugar y hora, viento, visibilidad, nubes y temperatura, QNH y tendencia; al final se comparan con mínimos y datos actualizados",
        ancho: 1600,
        alto: 700,
        pie: "Secuencia didáctica para no saltar grupos. Las cinco tarjetas ordenan la lectura, pero la decisión depende de la pista, los mínimos, la hora de llegada y las fuentes vigentes.",
      },
      {
        kind: "p",
        text: "**Qué ves:** cinco tarjetas conectadas, una por etapa de lectura. **Cómo lo reconoces:** empiezan con lugar y hora y terminan con QNH y tendencia; la franja inferior exige contrastar el conjunto. **Qué decides:** identificar riesgos y datos faltantes antes de compararlos con mínimos y procedimientos; el gráfico no representa una observación real ni autoriza una operación.",
      },
      {
        kind: "example",
        title: "Ejemplo didáctico ficticio: la rutina de principio a fin",
        code: "METAR SKCL 041200Z 05008KT 020V090 8000 -RA SCT018 BKN025TCU OVC090 24/22 Q1011 BECMG FM1300 TL1400 9999 NSW",
        steps: [
          "**Dónde y cuándo:** `SKCL` identifica el aeródromo que sirve a Cali; día 4 a las 12:00 UTC, 07:00 en Colombia. Es un informe **inventado para practicar**, no una observación consultable. Su actualidad depende de la hora real de la operación.",
          "**Viento:** de 050° verdaderos a 8 kt, variando entre 020° y 090°. No se informa ráfaga. Para una pista concreta verifica referencia magnética y calcula el rango de componentes si hace falta.",
          "**Visibilidad y tiempo:** 8000 m de visibilidad predominante y lluvia ligera (`-RA`). El código no demuestra que la lluvia sea la única causa de la reducción visual.",
          "**Nubes:** `SCT018` a 1800 ft, primer techo `BKN025TCU` a 2500 ft y `OVC090` a 9000 ft, todos sobre la elevación del aeródromo. `TCU` señala convección en desarrollo; no prueba por sí solo una tormenta.",
          "**Temperatura y QNH:** 24/22 °C muestra separación de 2 °C; vigila humedad y tendencia sin diagnosticar niebla. `Q1011` es el ajuste altimétrico en hPa; para performance usa los datos y procedimientos del manual.",
          "**Tendencia:** `BECMG FM1300 TL1400 9999 NSW` pronostica que entre 13:00 y 14:00 UTC la visibilidad llegará a 10 km o más y cesará el tiempo significativo. El periodo se cuenta desde la observación de las 12:00, no desde cuando lees el texto.",
        ],
        answer:
          "En este ejercicio hipotético, hay lluvia ligera, 8 km de visibilidad, techo de 2500 ft con `TCU` y mejora pronosticada dentro de dos horas. Revisaría posición y evolución de la convección, mínimos, pista y pronóstico antes de decidir; ni la tendencia favorable ni un solo grupo garantizan el resultado.",
      },
      { kind: "p", text: "**Errores comunes**, los que caen en entrevista:" },
      {
        kind: "list",
        items: [
          "Leer la hora de observación como local: se reporta en UTC; en Colombia se restan cinco horas para la hora civil.",
          "Comparar directamente la dirección verdadera del viento METAR con el número magnético de pista sin verificar la referencia.",
          "Pasar por alto ráfagas, variación de dirección o RVR requerido; la componente cruzada se calcula con el viento apropiado y los límites del avión.",
          "Leer `FEW010` como 10 000 ft: la base está a 1000 ft sobre la elevación del aeródromo.",
          "Ignorar `CB`/`TCU` asociados a una capa: exigen evaluar convección, no asumir que cada amenaza está sobre la pista.",
          "Interpretar CAVOK como cielo totalmente despejado o como ausencia de convección fuera del área observada.",
        ],
      },
      {
        kind: "check",
        question:
          "En este METAR didáctico ficticio, `VRB03KT 9999 FEW018 BKN030TCU 26/23 Q1010 NOSIG`, ¿qué grupo exige revisar convección por separado?",
        options: [
          "`NOSIG`: asegura que la convección ya terminó",
          "`BKN030TCU`: la capa contiene cúmulos en torre y requiere evaluar posición y evolución",
          "`VRB03KT`: garantiza que no hay componente cruzada",
        ],
        answer: 1,
        explain:
          "`BKN030TCU` reporta una capa fragmentada con cúmulos en torre a 3000 ft sobre el aeródromo. Esa convección merece revisar ubicación y evolución; no implica que se vuelva cumulonimbo ni que todas las amenazas estén sobre la pista. `NOSIG` no elimina una condición ya observada.",
      },
      {
        kind: "summary",
        title: "Lo que te llevas de toda la lección",
        items: [
          "Los grupos METAR mantienen un orden relativo, pero algunos son condicionales; si uno falta, no inventes su valor.",
          "La hora es UTC. Comprueba fecha, aeropuerto y vigencia antes de convertirla a la hora local.",
          "El viento METAR viene **desde donde sopla** y en grados verdaderos; verifica la referencia de la pista y compara viento medio, ráfagas y variación con los límites.",
          "Las bases de nube van en centenares de pies sobre el aeródromo; el techo es la primera `BKN`/`OVC` o visibilidad vertical si el cielo está oscurecido.",
          "`CB`, `TCU`, `WS` y fenómenos engelantes requieren investigación específica, no una decisión automática a partir de una sigla.",
          "Temperatura y rocío próximos alertan sobre saturación posible, pero no diagnostican niebla ni sustituyen la evaluación de performance.",
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Practica con el decodificador",
        text: "Compara tu lectura con la herramienta de práctica y vuelve al informe original para comprobar cada grupo. La rapidez ayuda en una entrevista, pero la exactitud, las referencias y la implicación operacional importan más que ganarle tiempo a una pantalla.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Briefing con llegada prevista a las 13:20 UTC",
        situacion:
          "Ejercicio ficticio, no un informe vigente: tu destino trae **`SKBO 121200Z 09018G32KT 050V130 3000 TSRA BKN008CB OVC020 18/17 Q1012 TEMPO 1500 +TSRA`**. La pista prevista es la 13L y tu llegada estimada es a las 13:20 UTC.",
        pregunta: "Aplica los cinco pasos. ¿Qué decides?",
        claves: [
          "**Identidad y hora:** el informe simulado es del día 12 a las 12:00 UTC. Tu llegada 13:20 queda dentro de sus dos horas de tendencia, pero deberás obtener observaciones nuevas en ruta.",
          "**Viento:** 090° verdaderos a 18 kt con ráfagas a 32 kt, variando 050°–130°. La pista 13L se nombra con referencia magnética; confirma la referencia adecuada antes de calcular componentes y límites.",
          "**Visibilidad y tiempo:** 3000 m con tormenta y lluvia ahora. `TEMPO 1500 +TSRA` advierte episodios de 1500 m con lluvia fuerte y tormenta dentro de la tendencia; podrían coincidir con tu llegada, pero no están ocurriendo necesariamente al observar.",
          "**Nubes y temperatura:** `BKN008CB` da techo a 800 ft con cumulonimbo; no determina por sí solo dónde hay cizalladura o granizo. `18/17` muestra poca separación, no saturación confirmada en toda la ruta.",
          "**Ajuste y decisión:** `Q1012` es el QNH reportado. Compara mínimos completos, RVR si aplica, estado de pista, convección y límites de viento; revisa TAF, avisos, alterno y combustible. Si no se cumplen los requisitos, cambia el plan conforme a los procedimientos del operador.",
        ],
        cierre:
          "La lectura de cinco pasos identifica riesgos y datos faltantes. No convierte un METAR ficticio ni una sola cifra en autorización para continuar una aproximación.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es un METAR y cada cuánto se emite?",
            respuesta:
              "Es un informe meteorológico rutinario de aeródromo: una observación codificada a una hora concreta, no un pronóstico de todo el trayecto. Su frecuencia depende del servicio local, habitualmente cada hora o media hora; un SPECI es un informe especial emitido cuando se cumplen criterios de cambio significativo. Los grupos presentes guardan un orden relativo, pero algunos pueden faltar.",
            claves: ["Observación con hora", "Frecuencia según aeródromo", "SPECI por criterios de cambio"],
          },
          {
            nivel: "interpretacion",
            q: "¿Cuál es la diferencia entre METAR y TAF?",
            respuesta:
              "El METAR informa condiciones observadas en el aeródromo a una hora determinada; el TAF pronostica condiciones en un periodo de validez. Para planificar, comparo el TAF de destino y alternos con METAR/SPECI recientes, avisos, mínimos y procedimientos. Si difieren, investigo la evolución; la observación no describe automáticamente mi hora futura de llegada ni autoriza por sí sola aterrizar.",
            claves: ["METAR observa, TAF pronostica", "Comparar horas de validez", "Ninguno autoriza por sí solo"],
          },
          {
            nivel: "situacion",
            q: "Te dan un METAR y te dicen: interprétalo en voz alta. ¿Por dónde empiezas?",
            respuesta:
              "Confirmo primero aeródromo y día/hora UTC. Sigo el orden de los grupos presentes: viento, visibilidad y RVR si figura, tiempo presente, nubes, temperatura/rocío, QNH y, si existen, suplementarios y tendencia. No invento un grupo ausente. Termino diciendo qué valores debo comparar con la pista, los mínimos y la hora de mi operación, y qué dato actualizado falta.",
            claves: ["Aeródromo y hora UTC", "Orden de grupos presentes", "Cerrar con límites y datos faltantes"],
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
        text: "**En la portada:** un piloto revisa información meteorológica antes del vuelo mientras observa nubosidad y lluvia a distancia. **Cómo lo reconoces:** la pantalla no tiene datos legibles; la escena representa planificación, no un TAF real. **Qué decides:** obtener el pronóstico vigente del destino y del alterno, ubicar tu hora prevista de llegada y contrastar los cambios esperados con los mínimos y procedimientos aplicables.",
      },
      {
        kind: "p",
        text: "El informe meteorológico de aeródromo, METAR, **observa** condiciones a una hora concreta. El pronóstico de aeródromo (TAF, Terminal Aerodrome Forecast) **anticipa** condiciones durante un periodo de validez. Ninguno responde por sí solo si puedes aterrizar: el primero no describe tu hora futura de llegada y el segundo no garantiza que se cumpla lo previsto. Úsalos junto con observaciones nuevas, avisos, mínimos, pista y política de alternos.",
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t22-01-observacion-pronostico.webp",
        alt: "Línea temporal didáctica: un METAR observado a las 12:00 UTC es un punto; un TAF emitido a las 11:00 UTC cubre desde el día 12 a las 12:00 hasta el día 13 a las 18:00, con llegada prevista dentro de ese periodo",
        ancho: 1600,
        alto: 720,
        pie: "Ejemplo de tiempos ficticios: METAR es una observación puntual y TAF un pronóstico para un intervalo. Ni el gráfico ni sus horas son productos meteorológicos vigentes.",
      },
      {
        kind: "p",
        text: "**Qué ves:** un instante de observación y una barra de validez más larga. **Cómo lo reconoces:** el TAF se emite antes de comenzar el periodo mostrado y la llegada prevista cae dentro de la barra, mientras el METAR solo corresponde a las 12:00 UTC. **Qué decides:** usar el tramo del pronóstico que cubra tu llegada y pedir observaciones posteriores en ruta; no prolongar la observación inicial hasta la llegada.",
      },
      { kind: "sub", text: "Cómo empieza un TAF" },
      {
        kind: "code",
        tabular: true,
        text: `Ejemplo ficticio, no es un TAF vigente:
TAF SKBO 121100Z 1212/1318 09008KT 9999 SCT020
    │    │      │        │
    │    │      │        └─ validez: del día 12 a las 12Z al día 13 a las 18Z
    │    │      └────────── emisión: día 12 a las 11:00 UTC
    │    └───────────────── aeródromo
    └────────────────────── tipo de producto`,
      },
      {
        kind: "list",
        items: [
          "**`TAF AMD` (amended):** enmendado por cambios previstos u observados que vuelven inadecuado el pronóstico anterior. El nuevo sustituye al anterior para el resto de su periodo de validez: rehace la parte afectada del briefing.",
          "**`TAF COR` (corrected):** corrige errores del producto emitido. Usa la versión corregida y verifica qué información cambió.",
          "**`CNL` (cancelled):** cancela el TAF publicado; no interpretes las condiciones del texto anterior como un pronóstico todavía válido.",
          "**`NIL`:** indica que falta el TAF para ese aeródromo en el boletín. Es ausencia de pronóstico, no señal de buen tiempo.",
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Comprueba periodo y disponibilidad",
        text: "La validez y frecuencia de emisión dependen del servicio establecido para cada aeródromo; el ejemplo de 30 horas no sirve para deducir la de todos. El TAF se refiere al aeródromo y su entorno pertinente, no a toda la ruta. Consulta el producto vigente y las publicaciones oficiales del Estado y del operador antes de aplicar requisitos de despacho o alternos.",
      },
      {
        kind: "p",
        text: "Tras la cabecera, el TAF utiliza grupos familiares de viento, visibilidad predominante, tiempo significativo y nubes, además de grupos que indican **cuándo** se espera un cambio. La similitud del código no convierte un pronóstico en una observación: relaciona siempre cada condición con su tramo de validez.",
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
          "La enmienda sustituye al TAF previo durante el resto de su periodo de validez. Identifica qué cambió y actualiza la planificación del destino, alterno y combustible según tu operación; no elijas la versión más favorable.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es un TAF?",
            respuesta:
              "Es un pronóstico meteorológico de aeródromo para un periodo de validez definido. Presenta condiciones esperadas de viento, visibilidad predominante, tiempo significativo y nubes, junto con los cambios previstos. Su hora de emisión no es la hora en que comienzan todas las condiciones: hay que ubicar cada tramo de validez.",
            claves: ["Pronóstico, no observación", "Emisión y validez", "Condiciones y grupos de cambio"],
          },
          {
            nivel: "interpretacion",
            q: "¿Para qué usas el TAF y para qué el METAR?",
            respuesta:
              "Uso el TAF para anticipar condiciones durante mi llegada y planificar destino, alternos y combustible conforme a las reglas aplicables. El METAR/SPECI aporta una observación a una hora concreta y sirve para actualizar el panorama. En ruta comparo ambos con avisos y mínimos; el METAR reciente no autoriza por sí solo iniciar o continuar una aproximación.",
            claves: ["TAF para anticipar la llegada", "METAR/SPECI con hora de observación", "Mínimos y procedimientos completan la decisión"],
          },
          {
            nivel: "situacion",
            q: "El TAF de tu destino viene como `NIL`. ¿Qué significa para tu planificación?",
            respuesta:
              "Indica ausencia del TAF en ese boletín, no buen tiempo. Confirmo si existe una versión vigente por otra fuente oficial y qué productos autorizados puedo usar. La falta de TAF puede cambiar la elegibilidad del aeródromo o los requisitos de alterno según norma y manual del operador; no aplico una regla universal sin consultarlos.",
            claves: ["NIL es ausencia de pronóstico", "Confirmar fuentes oficiales", "Aplicar norma y manual del operador"],
          },
        ],
      },
      {
        kind: "summary",
        items: [
          "METAR observa a una hora; TAF pronostica un periodo. Cuando difieren, comprueba horas, cambios y observaciones posteriores.",
          "Cabecera: tipo de producto, aeródromo, hora de emisión y periodo de validez; ubica tu llegada dentro de ese periodo.",
          "AMD sustituye el pronóstico anterior, COR corrige, CNL cancela y NIL señala un TAF faltante en el boletín.",
          "Los grupos meteorológicos son familiares desde METAR, pero en TAF describen condiciones previstas, no constatadas.",
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
        text: "**En la portada:** un piloto observa desde el terminal una franja de lluvia bajo nubes densas, mientras otra zona del aeródromo recibe luz. **Cómo lo reconoces:** la precipitación se concentra en una parte de la escena; la foto no indica cuándo llegará ni cuánto durará. **Qué decides:** ubicar los grupos de cambio del TAF en la hora prevista de llegada y verificar el impacto sobre mínimos, alternos y combustible con las reglas aplicables.",
      },
      {
        kind: "p",
        text: "Un TAF describe condiciones previstas y su evolución durante un periodo. Los grupos de cambio indican cuándo se espera que una condición se establezca o aparezca temporalmente. Léelos en relación con la hora de tu vuelo; ninguna etiqueta por sí sola fija los mínimos ni la elegibilidad de un alterno.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "FM · desde",
            puntos: [
              "**`FM121500` (from):** desde el día 12 a las 15:00 UTC.",
              "Abre un **nuevo tramo predominante** con la serie completa de condiciones previstas que sigue al grupo.",
              "Lo que no se repite del tramo anterior no se arrastra automáticamente; revisa toda la nueva línea.",
            ],
          },
          {
            titulo: "BECMG · llegando a ser",
            puntos: [
              "**`BECMG 1214/1216` (becoming):** transición entre el día 12 a las 14:00 y las 16:00 UTC.",
              "Las condiciones indicadas pasan a ser predominantes **a más tardar al final** de esa ventana; no deduzcas un minuto exacto.",
              "Solo sustituye los elementos nombrados; los demás continúan desde el tramo previo.",
            ],
          },
          {
            titulo: "TEMPO · temporal",
            puntos: [
              "**`TEMPO 1218/1222` (temporary):** fluctuaciones entre el día 12 a las 18:00 y las 22:00 UTC.",
              "Cada episodio dura **menos de una hora** y, en conjunto, menos de **la mitad de la ventana**.",
              "Entre episodios vuelve la condición predominante, salvo otro cambio; el episodio puede coincidir con tu llegada.",
            ],
          },
          {
            titulo: "PROB30 / PROB40 · probabilidad",
            puntos: [
              "**`PROB30` / `PROB40` (probability):** posibilidad del 30 % o 40 % de las condiciones indicadas en la ventana.",
              "El formato TAF usa esos dos valores; no conviertas el porcentaje en una certeza ni en una decisión automática.",
              "Puede combinarse con **`TEMPO`** para condiciones temporales cuya ocurrencia se expresa con esa probabilidad.",
            ],
          },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Distingue un tramo nuevo de un cambio parcial",
        text: "`FM` inicia una nueva descripción completa de condiciones predominantes. `BECMG` cambia los elementos que nombra y mantiene los no mencionados. Durante la transición no supongas que la nueva condición ya se estableció: sitúa tu hora dentro de la ventana y comprueba el pronóstico actualizado.",
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t23-01-grupos-cambio.webp",
        alt: "Cuatro tarjetas didácticas comparan FM como nuevo tramo, BECMG como transición, TEMPO como episodios breves y PROB40 como condición de ocurrencia incierta",
        ancho: 1600,
        alto: 820,
        pie: "Esquema conceptual, no TAF real: FM sustituye el tramo predominante, BECMG modifica grupos, TEMPO describe episodios y PROB expresa posibilidad. Revisa siempre horas y condiciones codificadas.",
      },
      {
        kind: "p",
        text: "**Qué ves:** cuatro formas distintas de cambio en el tiempo. **Cómo lo reconoces:** `FM` abre otro tramo, `BECMG` conecta dos condiciones, `TEMPO` muestra episodios dentro de una ventana y `PROB` marca incertidumbre de ocurrencia. **Qué decides:** localizar tu hora de llegada y aplicar los requisitos de planificación del operador a las condiciones que correspondan, sin tratar los trazos como un pronóstico vigente.",
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
          "Al terminar la ventana `BECMG`, solo se modifican los grupos incluidos: 3000 m de visibilidad y neblina (`BR`). El viento y las nubes previstos se mantienen del tramo anterior. Un `FM`, en cambio, abriría una nueva descripción completa.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Planificando una llegada el día 19 a las 19:30 UTC",
        situacion:
          "Ejemplo ficticio, no pronóstico vigente. El TAF del destino dice: **`... 1912/1922 18012KT 9999 BKN025 TEMPO 1918/1922 3000 TSRA BKN012CB`**.",
        pregunta: "¿Qué información usarías para planificar esa llegada?",
        claves: [
          "La condición predominante prevista incluye viento 180° a 12 kt, visibilidad de 10 km o más y techo `BKN025` a 2500 ft sobre el aeródromo. No la llamo «buena» sin compararla con mis mínimos.",
          "`TEMPO 1918/1922` incluye las 19:30 UTC: podrían presentarse episodios de 3000 m, tormenta con lluvia y techo `BKN012CB` a 1200 ft.",
          "No sé si un episodio coincidirá exactamente con la llegada; comparo tanto la condición predominante como la temporal con los criterios de despacho, aproximación y alterno que apliquen.",
          "Actualizo pronóstico, METAR/SPECI y avisos; evalúo ubicación de la convección, alternos, combustible y margen para esperar o desviar conforme al plan del operador.",
        ],
        cierre:
          "Un `TEMPO` que solapa tu llegada es un escenario posible que debes evaluar; no sustituye toda la condición predominante ni dicta por sí solo una regla universal de alterno.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué diferencia hay entre FM, BECMG y TEMPO?",
            respuesta:
              "FM abre un tramo nuevo con una descripción completa desde el día y hora indicados. BECMG anuncia una transición que modifica solo los grupos nombrados y queda establecida al terminar su ventana. TEMPO prevé fluctuaciones dentro de una ventana: cada episodio dura menos de una hora y, sumados, ocupan menos de la mitad de esa ventana.",
            claves: ["FM abre tramo completo", "BECMG cambia grupos nombrados", "TEMPO son episodios breves"],
          },
          {
            nivel: "interpretacion",
            q: "¿Por qué no existe un PROB50?",
            respuesta:
              "En el formato TAF se codifican los grupos de probabilidad `PROB30` y `PROB40`; no se codifica `PROB50`. Los cambios con mayor certeza se expresan con el grupo apropiado de cambio, según su naturaleza y duración. No traduzco esa regla de codificación a una garantía de que el fenómeno ocurrirá o no ocurrirá.",
            claves: ["PROB30 y PROB40 son los valores codificados", "Elegir grupo según naturaleza del cambio", "Probabilidad no es garantía"],
          },
          {
            nivel: "situacion",
            q: "Tu llegada cae dentro de un `PROB40 TEMPO 1206/1208 0400 FG`. ¿Cómo lo tratas?",
            respuesta:
              "El grupo expresa un 40 % de probabilidad de episodios temporales de 400 m de visibilidad con niebla entre las 06:00 y las 08:00 UTC del día 12. Comparo ese escenario con los mínimos y reglas de despacho y alterno de mi operación; no asumo que 400 m esté necesariamente bajo todos los mínimos ni que el fenómeno vaya a ocurrir. Reviso pronóstico actualizado, alterno y combustible con margen para contingencias.",
            claves: ["Ventana del día 12", "Comparar 400 m con mínimos concretos", "Planificar contingencias"],
          },
        ],
      },
      {
        kind: "summary",
        items: [
          "FM abre un tramo predominante nuevo; BECMG modifica solo los grupos nombrados; TEMPO prevé episodios temporales.",
          "TEMPO: cada episodio dura menos de una hora y el conjunto ocupa menos de la mitad de su ventana.",
          "PROB30 y PROB40 expresan posibilidad codificada, no certeza ni una regla automática de despacho.",
          "Si un TEMPO solapa tu llegada, evalúalo junto con la condición predominante y los mínimos aplicables.",
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
        text: "**En la portada:** desde una aeronave se ven un aeródromo distante, bruma baja y una franja de precipitación en otro sector. **Cómo lo reconoces:** son fenómenos separados en el espacio; la foto no muestra la hora ni los valores del TAF. **Qué decides:** antes de la llegada, leer el pronóstico completo por tramos y actualizarlo con observaciones y avisos; la imagen no sirve para estimar mínimos.",
      },
      {
        kind: "p",
        text: "Ahora une cabecera, condiciones predominantes y cambios para tres horas de llegada distintas. Un TAF se interpreta como una secuencia: primero confirmas emisión y validez, luego ubicas cada ventana de cambio y por último contrastas los escenarios que alcanzan tu vuelo con tus mínimos y el plan del operador.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Escenario de práctica",
        text: "El TAF siguiente está **inventado para practicar**. `YUDO` es un identificador de aeródromo ficticio utilizado en ejemplos de la OACI; el texto no representa una emisión vigente ni puede usarse en una operación.",
      },
      {
        kind: "code",
        tabular: true,
        text: `TAF YUDO 151700Z 1518/1624 20008KT 9999 SCT025
     BECMG 1520/1522 15012G22KT 6000 -RA BKN015
     TEMPO 1522/1602 3000 TSRA BKN010CB
     FM160300 09006KT 1200 BR OVC006
     PROB30 1604/1608 0500 FG
     BECMG 1612/1614 9999 NSW SCT030`,
      },
      {
        kind: "kv",
        items: [
          { k: "Cabecera", v: "Ejemplo ficticio emitido el día 15 a las 17:00 UTC; válido desde el día 15 a las 18:00 hasta el día 16 a las 24:00 UTC, es decir, el inicio del día 17. Son 30 horas." },
          { k: "Predominante inicial", v: "Viento de 200° verdaderos a 8 kt, visibilidad de 10 km o más y `SCT025` a 2500 ft sobre el aeródromo. `SCT` no constituye techo; no juzgues el periodo sin tus mínimos." },
          { k: "BECMG 1520/1522", v: "Entre las 20:00 y las 22:00 UTC del día 15 se establecerán los grupos nuevos: viento 150° a 12 kt con ráfagas de 22 kt, 6000 m, lluvia ligera y techo `BKN015` a 1500 ft." },
          { k: "TEMPO 1522/1602", v: "Entre las 22:00 del día 15 y las 02:00 del 16 podrían darse episodios de 3000 m, tormenta con lluvia y techo `BKN010CB` a 1000 ft. Entre episodios permanece la condición predominante correspondiente." },
          { k: "FM160300", v: "Desde las 03:00 UTC del día 16 comienza un tramo completo: viento 090° a 6 kt, 1200 m con neblina (`BR`) y techo `OVC006` a 600 ft. Sustituye la descripción predominante anterior." },
          { k: "PROB30 1604/1608", v: "Entre las 04:00 y las 08:00 UTC del día 16 existe una probabilidad codificada del 30 % de 500 m con niebla. No es una observación ni certeza; compárala con los requisitos aplicables." },
          { k: "BECMG 1612/1614", v: "Entre las 12:00 y las 14:00 UTC del día 16 se prevé 10 km o más, sin tiempo significativo (`NSW`) y `SCT030` a 3000 ft. El viento no cambia porque este grupo no lo menciona." },
        ],
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t24-01-tres-llegadas.webp",
        alt: "Tres tarjetas muestran cómo el mismo TAF ficticio se interpreta para A el día 15 a las 19:00, B el día 15 a las 23:30 y C el día 16 a las 06:00 UTC",
        ancho: 1600,
        alto: 780,
        pie: "Comparación didáctica del TAF ficticio: A cae en el tramo inicial; B, tras BECMG y dentro de TEMPO; C, tras FM y dentro de PROB30. No indica mínimos ni autoriza un vuelo.",
      },
      {
        kind: "p",
        text: "**Qué ves:** tres llegadas a horas distintas bajo el mismo pronóstico. **Cómo lo reconoces:** cada tarjeta separa la condición predominante de la condición temporal o probable que puede coincidir con esa llegada. **Qué decides:** evaluar ambos escenarios de tu ventana con mínimos, alternos, combustible y productos actualizados; no aplicar a B el tiempo de C ni tratar un PROB como certeza.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Tres llegadas distintas al mismo aeródromo",
        situacion:
          "Con el mismo TAF ficticio, el vuelo **A** llega el día 15 a las 19:00 UTC; **B**, el día 15 a las 23:30; y **C**, el día 16 a las 06:00.",
        pregunta: "¿Qué tramo y qué riesgos debes evaluar para cada llegada?",
        claves: [
          "**A, día 15 a las 19:00:** está antes del primer `BECMG`. Se prevén 10 km o más y `SCT025`, sin techo en el ejemplo; confirma que el TAF esté vigente y compara los demás datos con tu operación.",
          "**B, día 15 a las 23:30:** ya rigen los cambios de `BECMG` y cae dentro de `TEMPO`. Además del techo `BKN015`, 6000 m y lluvia ligera, podría encontrar tormenta, 3000 m y `BKN010CB`. Evalúa convección y opciones de espera o desvío.",
          "**C, día 16 a las 06:00:** rige el tramo `FM160300`: predominan 1200 m y techo `OVC006`; además, `PROB30` contempla 500 m con niebla. Contrasta ambos escenarios con mínimos, alterno y combustible.",
          "Ningún vuelo queda aprobado o descartado por esta lectura sola: faltan mínimos reales, pronóstico actualizado, observaciones, avisos y procedimientos del explotador.",
        ],
        cierre:
          "El mismo TAF orienta tres briefings distintos. La prioridad es colocar la llegada en el tramo correcto, evaluar las condiciones predominantes y temporales pertinentes y actualizar los datos.",
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
          "A las 03:00 UTC del día 16, `FM160300` abre un tramo nuevo con viento, visibilidad, tiempo y nubes completos. El `TEMPO` anterior ya terminó a las 02:00, y su techo de 1000 ft no se arrastra al nuevo tramo. Luego evalúa los grupos posteriores, como `PROB30`.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "situacion",
            q: "Te ponen un TAF delante y te dicen: interprétalo. ¿Cómo lo estructuras?",
            respuesta:
              "Empiezo por aeródromo, hora de emisión y validez. Leo el bloque inicial y recorro los grupos de cambio en orden, distinguiendo tramos nuevos de modificaciones parciales y episodios o probabilidades. Sitúo mi llegada en las ventanas pertinentes y comparo condiciones predominantes y posibles con mínimos, avisos, alternos y el producto actualizado. No elijo solo el mejor ni el peor grupo de todo el periodo.",
            claves: ["Cabecera y validez", "Grupos en orden", "Llegada en su ventana", "Mínimos y datos actualizados"],
          },
          {
            nivel: "interpretacion",
            q: "¿Qué significa NSW y dónde aparece?",
            respuesta:
              "`NSW` (no significant weather) indica que deja de esperarse el tiempo significativo pronosticado previamente, dentro del grupo de cambio donde figura. No significa cielo despejado, visibilidad ilimitada ni ausencia absoluta de todo fenómeno; hay que leer también visibilidad y nubes.",
            claves: ["No significant weather", "Termina el tiempo significativo anterior", "Leer también visibilidad y nubes"],
          },
        ],
      },
      {
        kind: "summary",
        items: [
          "Lee cabecera y periodo de validez antes de asociar grupos con tu hora de llegada.",
          "FM abre un tramo completo; BECMG cambia solo lo indicado; TEMPO describe episodios y PROB una posibilidad codificada.",
          "NSW indica fin del tiempo significativo anterior, no despeje total ni autorización operacional.",
          "El mismo TAF plantea riesgos distintos para llegadas diferentes: comprueba el tramo, los mínimos y la información nueva.",
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
        text: "**En la portada:** una aeronave rueda en un aeródromo de montaña con visibilidad local despejada y nubes bajas sobre parte del valle. **Cómo lo reconoces:** el entorno de la pista y el relieve no tienen las mismas condiciones en la foto; esto no representa un alterno publicado ni demuestra que sea utilizable. **Qué decides:** comprobar pronóstico, observaciones, aproximaciones, servicios y combustible del alterno con los criterios aprobados para tu operación.",
      },
      {
        kind: "p",
        text: "Aquí el TAF ayuda a responder tres preguntas de planificación: **si se requiere un alterno, cuál es elegible y qué combustible exige el plan**. El pronóstico es una fuente esencial, no la única: se cruza con horarios, mínimos, instalaciones, avisos y la política del operador.",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Los números los pone tu operación, no este curso",
        text: "La necesidad de alterno, los mínimos de planificación, los incrementos de visibilidad y base de nube, la ventana temporal de uso y los requisitos de combustible dependen de la **norma aplicable y del manual aprobado del explotador**. No copies una cifra genérica de otro operador ni interpretes un `TEMPO` o `PROB` con una regla universal. Este ejercicio enseña el orden de evaluación; las cifras se consultan en el procedimiento vigente.",
      },
      { kind: "sub", text: "Orden de evaluación para el briefing" },
      {
        kind: "vinetas",
        items: [
          "**Ubica la hora estimada de uso** del destino y del alterno dentro de la validez de cada TAF, con el margen temporal exigido por el operador; revisa enmiendas y observaciones recientes.",
          "**Separa condición predominante, TEMPO y PROB.** Evalúa los escenarios que solapan esa ventana conforme a la regla de despacho aplicable; no conviertas toda probabilidad en certeza ni la ignores.",
          "**Compara con mínimos de planificación y operación**, aproximaciones disponibles, pista, estado del aeródromo y servicios. El TAF no confirma por sí solo que una aproximación sea utilizable.",
          "**Comprueba independencia meteorológica.** La cercanía puede correlacionar riesgos, pero dos aeródromos con niebla no son automáticamente equivalentes: estudia topografía, pronósticos y observaciones de cada uno.",
          "**Cierra el plan de combustible** para ruta, contingencia, espera, desvío, reserva y demás partidas que exija el plan operacional. Revisa el margen disponible si el destino se deteriora en vuelo.",
        ],
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t25-01-seleccion-alterno.webp",
        alt: "Cinco comprobaciones antes de seleccionar un aeródromo de alternativa: ventana temporal, TAF y observaciones, mínimos e instalaciones, independencia meteorológica y combustible",
        ancho: 1600,
        alto: 720,
        pie: "Secuencia didáctica, sin mínimos ni valores de combustible: cada comprobación se resuelve con productos vigentes, norma aplicable y manual aprobado del operador.",
      },
      {
        kind: "p",
        text: "**Qué ves:** cinco comprobaciones enlazadas, desde la hora prevista de uso hasta el combustible. **Cómo lo reconoces:** cada etapa exige un dato externo; ninguna casilla da un número universal ni sustituye el plan del operador. **Qué decides:** aceptar o descartar un alterno solo tras contrastar pronóstico, mínimos, infraestructura, posible meteorología compartida y reservas requeridas.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Despacho ficticio, llegada el día 12 a las 05:00 UTC",
        situacion:
          "Ejercicio ficticio con fragmentos de TAF, no pronósticos vigentes: el destino prevé **`0800 FG BKN003`** en tu ventana de llegada y mejora con **`BECMG 1206/1207 9999 NSW SCT020`**. Un alterno a 35 millas náuticas tiene **`PROB40 TEMPO 1203/1207 0600 FG`**.",
        pregunta: "¿Qué debes comprobar antes de aceptar el alterno o planear una espera?",
        claves: [
          "En el destino, 800 m con niebla y techo `BKN003` a 300 ft requieren comparar mínimos de aproximación y planificación con la aeronave, pista y procedimiento disponibles; no presupongo una prohibición universal.",
          "En el alterno, el `PROB40 TEMPO` cubre las 05:00 UTC y plantea episodios posibles de 600 m con niebla. Compruebo cómo trata ese grupo el manual del operador y si el aeródromo satisface sus mínimos e instalaciones.",
          "La distancia de 35 millas náuticas sugiere investigar si ambos aeródromos comparten el mismo patrón de niebla, pero no lo demuestra. Verifico topografía, TAF, METAR/SPECI y avisos de cada uno.",
          "La mejora `BECMG` del destino se completaría entre las 06:00 y las 07:00 UTC; no la cuento como disponible a las 05:00 ni garantizo que una espera sea viable. Comparo combustible, reserva y alternativas de desvío conforme al plan.",
        ],
        cierre:
          "No acepto ni descarto ese alterno solo por la distancia o por el 40 %. Primero demuestro que cumple los criterios vigentes y que el plan conserva opciones y combustible suficientes.",
      },
      {
        kind: "check",
        question:
          "Un `TEMPO` con visibilidad inferior a los mínimos aplicables solapa tu llegada. ¿Cómo lo consideras para planificar el alterno?",
        options: [
          "Lo ignoro porque el tramo predominante tiene mejor visibilidad",
          "Evalúo su ventana y aplico el criterio de alternos aprobado para mi operación",
          "Cancelo el vuelo automáticamente, sin revisar mínimos ni alternativas",
        ],
        answer: 1,
        explain:
          "El `TEMPO` describe fluctuaciones esperadas en esa ventana y puede coincidir con tu hora de uso. No lo ignores ni inventes una regla universal: compara los valores con tus mínimos y aplica la política de alternos, tiempo de uso y combustible aprobada para el operador.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Para qué sirve el TAF en la planificación de un vuelo?",
            respuesta:
              "El TAF permite anticipar condiciones en destino y alternos durante la hora estimada de uso. Lo comparo con observaciones, avisos, mínimos y disponibilidad del aeródromo para decidir elegibilidad, alternos y combustible conforme a la norma y al manual. No es el único documento que justifica el despacho.",
            claves: ["Hora estimada de uso", "Destino y alternos", "Fuentes y reglas del operador"],
          },
          {
            nivel: "interpretacion",
            q: "¿Qué hace que un alterno sea un buen alterno?",
            respuesta:
              "Que cumpla los mínimos de planificación aprobados en su ventana de uso, disponga de aproximaciones, pista y servicios necesarios y sea alcanzable con el combustible previsto. Investigo si comparte un peligro meteorológico con el destino mediante pronósticos, observaciones y topografía; estar cerca no lo invalida automáticamente, pero una correlación real reduce la independencia del plan.",
            claves: ["Mínimos aprobados", "Infraestructura disponible", "Combustible", "Independencia meteorológica comprobada"],
          },
          {
            nivel: "situacion",
            q: "Vas en ruta y el destino se deteriora por debajo de lo pronosticado. ¿Qué haces?",
            respuesta:
              "Actualizo METAR/SPECI, TAF enmendado y avisos; reviso el estado de destino y alternos. Recalculo opciones de esperar o desviar con combustible utilizable y reservas requeridas, siguiendo los puntos de decisión del operador y coordinando con control y despacho cuando proceda. Actúo antes de perder una alternativa segura.",
            claves: ["Datos meteorológicos nuevos", "Opciones con combustible y reservas", "Decisión oportuna según procedimiento"],
          },
        ],
      },
      {
        kind: "summary",
        items: [
          "Sitúa la hora de uso de destino y alterno dentro de cada TAF y del margen temporal aprobado.",
          "Evalúa grupos TEMPO y PROB que solapen esa ventana según el criterio específico del operador; probabilidad no es certeza.",
          "Comprueba mínimos, infraestructura, independencia meteorológica y combustible antes de aceptar un alterno.",
          "Los valores de planificación se toman de la norma aplicable y del manual aprobado, no de una regla genérica del curso.",
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
  "Para alternos y combustible: OACI, Anexo 6, Parte I (Operación de aeronaves); aplica la norma nacional y el manual aprobado del explotador en su versión vigente.",
  "Para fuentes de observación en altura: OMM, Sistema Mundial de Observación y programa AMDAR (observaciones automáticas de aeronaves).",
  "Para límites de radar y satélite: Servicio Meteorológico Nacional de EE. UU. (NOAA/NWS), guías de radar Doppler; OMM, OSCAR/Space y guía de observaciones satelitales. Comprueba el producto local vigente.",
  "Para informes de piloto: OACI, Doc 8896, capítulo 7 (AIREP SPECIAL); FAA, Aeronautical Information Manual, capítulo 7 (ejemplo y campos del PIREP), y AC 00-45H (RAREP histórico reemplazado por RCM).",
  "Para avisos en ruta: OACI, Anexo 3, capítulo 7 (SIGMET y AIRMET, fenómenos y validez); OACI, informe SAM/RCM/2 de 2023 (disponibilidad regional de AIRMET); FAA, Aeronautical Information Manual, capítulo 7 (productos propios de EE. UU.). Para operar, consulta el aviso y AIP/eAIP vigentes de cada región.",
  "Para pronósticos en ruta: OACI/OMM, Sistema de pronósticos de área mundial (WAFS); OACI, Anexo 3, pronósticos de viento y temperatura en altura y tiempo significativo; OACI, material de instrucción WAFS sobre uso de campos reticulados en la planificación del vuelo.",
]

export type { LessonBlock }
