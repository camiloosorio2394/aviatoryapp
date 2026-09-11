/**
 * Contenido de la lección "Qué es un METAR y cómo leerlo".
 *
 * Fuentes: briefing para pilotos METAR (Erick De Paz, Meteorólogo Clase III
 * OMM), leyenda de lectura METAR y TAF (Volar3.com, material de curso). La
 * norma de referencia es el Anexo 3 de la OACI y el Manual de claves No. 306
 * de la OMM: confirma siempre contra la edición vigente.
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
    kicker: "El estado del cielo, en una línea",
    minutes: 2,
    blocks: [
      {
        kind: "p",
        text: "El **METAR** (informe meteorológico aeronáutico de rutina) te dice la meteorología reinante en un aeródromo en un momento dado. Los datos salen de la estación meteorológica del propio aeropuerto y se publican a intervalos regulares.",
      },
      {
        kind: "p",
        text: "Cuando algo cambia fuerte antes de la siguiente observación (una tormenta que llega, la visibilidad que se desploma), se emite un **SPECI**: un informe especial fuera de horario. Si ves SPECI en vez de METAR, alguien decidió que no podía esperar.",
      },
      {
        kind: "p",
        text: "**Por qué importa en la entrevista y en cabina:** junto con el NOTAM, el METAR es la lectura obligada del briefing. Un piloto que no decodifica `27010G25KT 4000 +TSRA BKN015CB` de memoria no puede decidir si despega.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Cómo aprovechar esta lección",
        text: "Léela de corrido: cada sección usa lo de la anterior, y va con comprobaciones intercaladas para que uses lo que acabas de leer. Después abre el Decodificador: pegas cualquier METAR y te lo desarma grupo por grupo.",
      },
      {
        kind: "check",
        question: "Estás en la sala de despacho y sale un `SPECI` de tu destino. ¿Qué significa?",
        options: [
          "Que el informe de rutina se retrasó y este lo sustituye",
          "Que algo cambió lo bastante como para no esperar a la siguiente observación",
          "Que es un informe de aeródromo militar, con clave distinta",
        ],
        answer: 1,
        explain:
          "El `SPECI` es un informe **especial**, fuera de horario. Se emite justo porque la condición cambió fuerte antes de la observación siguiente. Si ves uno, mira qué grupo se movió: alguien decidió que no podía esperar.",
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-por-01-preparacion-vuelo.webp",
        alt: "Piloto en cabina durante la preparación del vuelo, con la carta aeronáutica desplegada sobre las piernas, una tablilla con el plan y el teléfono encima.",
        ancho: 1600,
        alto: 900,
        pie: "El dato meteorológico se consulta aquí, antes de soltar frenos: no es teoría, es parte del briefing.",
      },
      {
        kind: "enLaOperacion",
        momento: "Antes de cada vuelo",
        texto:
          "El METAR no es un trámite del briefing: es el único dato que te dice qué hay de verdad ahora mismo en ese aeródromo. Todo lo demás que miras (el TAF, las cartas, el pronóstico de ruta) es previsión. Cuando el pronóstico y la observación no coinciden, el que manda es el METAR.",
      },
    ],
  },

  // ── 2 ──────────────────────────────────────────────────────────────────────
  {
    n: 2,
    title: "La plantilla completa",
    kicker: "Todo METAR sigue el mismo orden",
    minutes: 3,
    blocks: [
      {
        kind: "p",
        text: "El informe siempre trae los mismos grupos en el mismo orden. Esta es la plantilla de la OMM, simplificada a lo que ves a diario:",
      },
      {
        kind: "breakdown",
        caption:
          "Nueve grupos separados por espacios. Cada uno responde una pregunta, y siempre en el mismo orden: qué informe, dónde, cuándo, cómo sopla, cuánto ves, qué tapa, qué números y qué viene.",
        parts: [
          { token: "METAR", label: "tipo", detail: "Informe de rutina. `SPECI` si es especial." },
          {
            token: "SKBO",
            label: "estación",
            detail: "Indicador OACI del aeródromo, el mismo de la casilla A) del NOTAM.",
          },
          {
            token: "261300Z",
            label: "fecha y hora",
            detail: "Día 26 a las 13:00 **UTC**. La `Z` es zulu: en Colombia resta 5 horas, son las 08:00.",
          },
          { token: "09006KT", label: "viento", detail: "Del este (090°) a 6 nudos." },
          { token: "9999", label: "visibilidad", detail: "10 km o más, el mejor valor de la clave." },
          {
            token: "SCT023 BKN080",
            label: "nubes",
            detail: "Dispersas a 2300 ft y fragmentadas a 8000 ft. El techo es la BKN: 8000 ft.",
          },
          { token: "14/09", label: "temp / rocío", detail: "14 °C de temperatura y 9 °C de punto de rocío." },
          { token: "Q1027", label: "QNH", detail: "1027 hectopascales al altímetro." },
          { token: "NOSIG", label: "tendencia", detail: "Sin cambio significativo previsto." },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "El orden es tu mapa",
        text: "Si un grupo falta, el resto conserva su posición. Con el orden en la cabeza puedes leer cualquier METAR del mundo aunque tenga grupos que nunca hayas visto: sabes qué debería ir ahí.",
      },
      {
        kind: "check",
        question: "En `METAR SKBO 261300Z 09006KT 9999 SCT023 BKN080 14/09 Q1027 NOSIG`, ¿a qué hora local de Colombia se tomó la observación?",
        options: ["A las 13:00", "A las 08:00", "A las 18:00"],
        answer: 1,
        explain:
          "`261300Z` es el día 26 a las 13:00 **UTC**. Colombia va en UTC menos 5, así que son las 08:00 locales. La `Z` de zulu es el aviso: en el METAR nunca hay hora local.",
      },
      {
        kind: "p",
        text: "**Uno más, y feo.** El de arriba era un día tranquilo en Bogotá. Este es el que te van a poner en la entrevista:",
      },
      {
        kind: "breakdown",
        caption:
          "Mismo orden, mismas posiciones. Lo único que cambia es que ahora casi todos los grupos traen malas noticias.",
        parts: [
          { token: "SPECI", label: "tipo", detail: "Informe especial: alguien decidió que no podía esperar." },
          { token: "SKRG", label: "estación", detail: "Rionegro, José María Córdova." },
          { token: "151740Z", label: "fecha y hora", detail: "Día 15 a las 17:40 UTC, 12:40 en Colombia." },
          {
            token: "27015G28KT",
            label: "viento",
            detail: "Del oeste a 15 nudos con ráfagas de 28. El pico es el problema, no el promedio.",
          },
          { token: "3000", label: "visibilidad", detail: "3 km. Muy lejos de los 9999 del ejemplo anterior." },
          { token: "+TSRA", label: "tiempo presente", detail: "Tormenta eléctrica (`TS`) con lluvia (`RA`) fuerte (`+`)." },
          {
            token: "BKN012CB",
            label: "nubes",
            detail: "Fragmentadas a 1200 ft, y el `CB` dice que son cumulonimbos: convección sobre el aeródromo.",
          },
          { token: "18/17", label: "temp / rocío", detail: "Un grado de diferencia: aire saturado." },
          { token: "Q1013", label: "QNH", detail: "1013 hectopascales." },
          {
            token: "TEMPO 1820 4000 SHRA",
            label: "tendencia",
            detail: "Entre las 18:00 y las 20:00 UTC, ratos con 4 km y chubascos de lluvia.",
          },
        ],
      },
      {
        kind: "hueco",
        rotulo: "MT-ILU-02 · Ilustración · 21:9 · 2000×860 · SVG",
        descripcion:
          "Un METAR real escrito grande en monoespaciada, con cada grupo señalado por una llave o una línea guía hacia su nombre: estación, día y hora Zulú, viento, visibilidad, RVR, tiempo presente, nubes, temperatura y rocío, QNH, tendencia. Es el mapa de la lección y debería poder mirarse una sola vez y volver a él siempre.",
        alto: 260,
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿En qué orden van los grupos de un METAR?",
            respuesta:
              "Siempre el mismo: identificador de la estación, día y hora en Zulú, viento, visibilidad, alcance visual en pista si lo hay, tiempo presente, nubes o CAVOK, temperatura y punto de rocío, QNH, y al final la información suplementaria y la tendencia. Ese orden fijo es lo que permite leerlo rápido: no busco un dato, voy a su posición.",
            claves: ["Orden fijo", "Estación, hora Z, viento, visibilidad, RVR, tiempo, nubes, T/Td, QNH, tendencia"],
          },
          {
            nivel: "interpretacion",
            q: "Un grupo no aparece en el informe. ¿Qué significa?",
            respuesta:
              "Que no procede. La clave omite lo que no hay: si no se reporta tiempo presente es que no hay fenómeno significativo, y si no hay RVR es que la visibilidad no lo exige. La ausencia es información, no un olvido. Lo que sí obliga a preguntar es un informe que llegue truncado o con grupos ilegibles.",
            claves: ["La ausencia significa que no procede", "La clave omite lo que no hay", "Distinto de un informe truncado"],
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
        text: "**`27010KT`**: los tres primeros dígitos son la dirección **verdadera desde donde sopla**, redondeada a decenas de grado; los siguientes, la velocidad en nudos. Aquí: viento del oeste a 10 nudos.",
      },
      {
        kind: "list",
        items: [
          "**`00000KT`**: viento en calma.",
          "**`VRB03KT`**: dirección variable, 3 nudos. Típico de vientos muy flojos.",
          "**`27010G25KT`**: la **G** es ráfaga (gust): viento de 10 nudos con ráfagas de 25.",
          "**`240V300`**: si la dirección varía 60° o más, se agrega el rango entre el que oscila.",
          "**`WS`**: cizalladura del viento reportada (wind shear), por ejemplo `WS R28` o `WS ALL RWY`.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "La cizalladura es la que mata",
        text: "Un cambio súbito de dirección o velocidad del viento, asociado a microrráfagas descendentes o inversiones térmicas bajas, puede variar de golpe tu velocidad aerodinámica y empujarte hacia el suelo. Es especialmente peligrosa en despegue y aterrizaje: si el METAR trae WS, el briefing cambia.",
      },
      {
        kind: "check",
        question:
          "La pista en uso es la 09 y el METAR dice `27015G28KT`. ¿Qué tienes de frente y qué te preocupa?",
        options: [
          "Viento de cara de 15 nudos; las ráfagas ayudan a frenar",
          "Viento de cola de 15 nudos con ráfagas de 28, que es el número que manda",
          "Viento cruzado puro de 28 nudos por la derecha",
        ],
        answer: 1,
        explain:
          "El viento sopla **desde** 270°, y la 09 apunta a 090°: lo tienes justo por la cola. Y el número que limita no es el promedio sino la ráfaga, 28 nudos, que es contra la que se compara el límite de viento de cola del avión.",
      },
      {
        kind: "hueco",
        rotulo: "MT-DIA-02 · Diagrama · 4:3 · 1200×900 · SVG",
        descripcion:
          "Una pista vista desde arriba con su rumbo marcado y una rosa de vientos superpuesta, mostrando cómo se descompone un viento de 270° a 15 nudos en componente de cara y componente cruzada sobre la pista 09 y sobre la 27. Con las dos flechas y los dos números. Es lo que convierte «27015KT» en una decisión.",
        alto: 340,
      },
      {
        kind: "piensaComoPiloto",
        momento: "Aproximándote al aeródromo de destino",
        situacion:
          "El METAR trae **`31018G30KT 280V350`**. Las pistas disponibles son la 04 y la 22, y el límite de viento cruzado de tu avión con pista seca es de 33 nudos.",
        pregunta: "¿Qué tienes y con qué número comparas?",
        claves: [
          "El viento sopla **desde 310°**. Contra la 04 (040°) hay 90° de diferencia menos un poco: es prácticamente **cruzado puro por la izquierda**.",
          "**El número que manda es la ráfaga, 30 nudos**, no los 18 de promedio. Es contra la ráfaga contra lo que se compara el límite.",
          "30 contra un límite de 33 **no deja margen**, y el 280V350 dice que la dirección oscila 70°: puede irse a más cruzado en cualquier momento.",
          "Y ese límite de 33 es **con pista seca**. Si está mojada o contaminada, el límite del manual baja.",
        ],
        cierre:
          "«Está dentro de límites» y «tengo margen» no son lo mismo. La variación de dirección es la parte del informe que convierte lo primero en lo segundo, o al revés.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Cómo se lee el grupo de viento de un METAR?",
            respuesta:
              "Los tres primeros dígitos son la dirección verdadera desde la que sopla, redondeada a decenas de grado, y los siguientes la velocidad en nudos. Si hay ráfagas aparece una G con el valor máximo. Si la dirección varía 60 grados o más se añade el rango con una V en medio. Y 00000KT es calma, mientras que VRB es dirección variable, típico de vientos muy flojos.",
            claves: ["Dirección verdadera, desde donde sopla", "G de ráfaga", "V para el rango de variación", "VRB y calma"],
          },
          {
            nivel: "interpretacion",
            q: "¿Por qué la dirección del METAR es verdadera y no magnética?",
            respuesta:
              "Porque el METAR es un informe meteorológico y se codifica en referencia verdadera, igual que el resto de la información meteorológica. En cambio la torre da el viento en magnético, que es la misma referencia de los rumbos de pista. Es una diferencia que hay que tener presente al comparar el viento del informe con el de la pista, sobre todo donde la declinación magnética es grande.",
            claves: ["METAR en verdadero", "Torre en magnético", "Los rumbos de pista son magnéticos"],
          },
          {
            nivel: "situacion",
            q: "El METAR trae `WS ALL RWY`. ¿Qué significa y qué cambia?",
            respuesta:
              "Que hay cizalladura reportada en todas las pistas: cambios súbitos de dirección o velocidad del viento, típicamente asociados a microrráfagas descendentes o a inversiones térmicas bajas. Cambia el briefing entero: velocidades de aproximación, configuración, criterios de aproximación frustrada y la disposición a irse al alterno. Es de los pocos grupos del METAR que por sí solos justifican no intentarlo.",
            claves: ["Cizalladura en todas las pistas", "Microrráfagas o inversión baja", "Cambia el briefing completo"],
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
    minutes: 3,
    blocks: [
      {
        kind: "list",
        items: [
          "**`9999`**: visibilidad de 10 km o más. Es el mejor valor que reporta la clave.",
          "**`4000`**: visibilidad horizontal en metros (4 km). Colombia y casi todo el mundo reportan en metros.",
          "**`6SM`**: Estados Unidos reporta en millas terrestres (statute miles). 1 SM = 1609 m.",
          "**`R28L/1200`**: el **RVR** (alcance visual en pista): desde la aproximación a la pista 28 izquierda se ven 1200 metros. L, C y R distinguen pistas paralelas (izquierda, central, derecha).",
          "El RVR puede traer tendencia: **U** mejorando (up), **D** empeorando (down), **N** sin cambio. En EE. UU. va en pies: `R28C/3600FT`.",
        ],
      },
      {
        kind: "p",
        text: "El RVR se mide con las luces de alta intensidad de la pista o el contraste con otros objetos, y es el número que define si puedes iniciar una aproximación con niebla. Cuando la visibilidad general y el RVR difieren, el RVR manda para esa pista.",
      },
      {
        kind: "check",
        question:
          "El METAR trae visibilidad `0800` y además `R28L/1200`. Vas a la 28 izquierda. ¿Con qué número decides?",
        options: [
          "Con los 800 m: es la visibilidad oficial del aeródromo",
          "Con los 1200 m del RVR, que es el que manda para esa pista",
          "Con el promedio de los dos",
        ],
        answer: 1,
        explain:
          "El RVR es el alcance visual medido **en esa pista**, y cuando difiere de la visibilidad general es el que manda para la aproximación. Por eso un aeródromo con niebla puede seguir operando: la visibilidad general está peor que lo que se ve desde la senda.",
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-img-02-pista-baja-visibilidad.webp",
        alt: "Cabecera de pista en baja visibilidad, con las barras rojas de umbral y las luces de aproximación perdiéndose en la bruma, y una aeronave en la toma.",
        ancho: 1600,
        alto: 900,
        pie: "Esto es el RVR hecho imagen: se ve exactamente hasta dónde llega la vista, y dónde deja de llegar.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es el RVR y en qué se diferencia de la visibilidad del METAR?",
            respuesta:
              "El RVR es el alcance visual en pista: la distancia a la que se ven las luces de alta intensidad o el contraste de los objetos desde la senda de aproximación de una pista concreta. La visibilidad del METAR es la visibilidad horizontal general del aeródromo. Se diferencian en que el RVR es de esa pista y de ese momento, y por eso es el número con el que se decide una aproximación de baja visibilidad.",
            claves: ["Alcance visual en una pista concreta", "La visibilidad es general del aeródromo", "El RVR manda para la aproximación"],
          },
          {
            nivel: "interpretacion",
            q: "¿Por qué un aeródromo con visibilidad de 600 metros puede seguir operando?",
            respuesta:
              "Porque la visibilidad general y el RVR miden cosas distintas. La niebla puede estar cerrando el campo mientras las luces de alta intensidad de la pista siguen siendo visibles desde mucho más lejos. Si el RVR de esa pista está por encima del mínimo de la aproximación, se puede operar aunque la visibilidad general esté por debajo.",
            claves: ["Miden cosas distintas", "Las luces de alta intensidad se ven más lejos", "Decide el RVR de esa pista"],
          },
          {
            nivel: "situacion",
            q: "El RVR viene como `R28L/1200U`. ¿Qué te dice la U?",
            respuesta:
              "Que la tendencia es de mejora, up. La D sería empeorando, down, y la N sin cambio. Es un dato pequeño y muy útil: con 1200 metros y tendencia a mejorar puedo plantearme esperar; con los mismos 1200 y una D, lo que toca es contar con que al llegar habrá menos y tener el alterno listo.",
            claves: ["U mejora, D empeora, N sin cambio", "Cambia la decisión de esperar o desviar"],
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
        kind: "hueco",
        rotulo: "MT-DIA-01 · Diagrama · 16:9 · 1600×900 · SVG",
        descripcion:
          "La estructura de un grupo de tiempo presente desmontada en tres piezas, con `+TSRA` de ejemplo: el calificador de intensidad (− ligero, sin signo moderado, + fuerte, VC en las proximidades), el descriptor (TS tormenta, SH chubascos, FZ engelante, BC bancos, MI baja, DR arrastre, BL ventisca, SG, PR) y el fenómeno (RA lluvia, SN nieve, FG niebla, BR bruma, HZ calima, GR granizo…). Tres columnas y una flecha que las une para que se lea como una frase.",
        alto: 300,
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
        kind: "hueco",
        rotulo: "MT-ILU-01 · Ilustración · 16:9 · 1600×900 · SVG o PNG",
        descripcion:
          "Corte vertical del cielo con las nubes ordenadas por altura y nombradas: estratos y cúmulos abajo, altocúmulos y altostratos en el medio, cirros arriba, y un cumulonimbo atravesándolo todo desde la base hasta el yunque. Con la escala de pies a la izquierda. Es la imagen que convierte FEW, SCT, BKN y OVC en algo que se reconoce mirando por la ventanilla.",
        alto: 320,
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-img-01-cumulonimbo-desde-el-aire.webp",
        alt: "Cumulonimbo maduro visto desde altitud de crucero, con el yunque extendiéndose por encima de las torres convectivas.",
        ancho: 1600,
        alto: 900,
        pie: "Desde crucero, el yunque se ve extendido por encima de todo lo demás. La escala se entiende sola.",
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
        kind: "hueco",
        rotulo: "MT-ILU-03 · Ilustración · 21:9 · 2000×860 · SVG",
        descripcion:
          "Una línea de tiempo horizontal. A la izquierda, un punto marcado METAR con la etiqueta «lo que hay, ahora». A la derecha, una banda que cubre todo el resto rotulada TAF con «lo que se espera, durante este periodo», y dentro de ella la hora estimada de llegada del vuelo marcada con un avión. Es la imagen que explica por qué se leen los dos y no uno.",
        alto: 260,
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
        kind: "hueco",
        rotulo: "MT-DIA-03 · Diagrama · 21:9 · 2000×860 · SVG",
        descripcion:
          "Cuatro carriles horizontales sobre la misma línea de tiempo, uno por grupo. FM: un corte vertical limpio y todo lo de la derecha en color nuevo. BECMG: una transición en degradado dentro de su ventana. TEMPO: bloques cortos intermitentes. PROB40: los mismos bloques pero al 40 % de opacidad. La imagen tiene que dejar ver de un vistazo que FM es un corte y TEMPO un parpadeo.",
        alto: 260,
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
