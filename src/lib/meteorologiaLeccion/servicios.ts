/**
 * Nivel 6 · Información en ruta (capítulo 12 del PHAK).
 *
 * Va al final del módulo, detrás del METAR y del TAF, porque el PIREP, los
 * avisos y las cartas los dan por sabidos. Los `n` de este archivo cuentan
 * desde 1; su posición en la lección la calcula metarLesson.ts.
 *
 * Solo lo que NO se solapa con METAR y TAF, que ya están en la parte del
 * código: las observaciones y sus fuentes, el PIREP y el RAREP, las
 * advertencias en vuelo (AIRMET, SIGMET, SIGMET convectivo), los pronósticos
 * de área y de viento en altura, y las cartas.
 *
 * Aviso que atraviesa toda esta parte y por eso va aquí arriba: el capítulo 12
 * describe el sistema de los Estados Unidos. Los designadores de AIRMET, el
 * radar NEXRAD, la FSS y las regiones de pronóstico de área son suyos. El
 * concepto (que existe un aviso en vuelo de fenómenos peligrosos, que hay
 * pronósticos de viento por nivel, que las cartas se leen así) es general y el
 * OACI lo estandariza; el producto concreto lo publica el servicio
 * meteorológico de cada Estado. Cada lección que toca uno de esos productos
 * lleva su callout de verificar diciendo dónde mirar. No se inventa la versión
 * local de nada.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const PARTE_SERVICIOS: DocScreen[] = [
  // ── 13 ──────────────────────────────────────────────────────────────────
  {
    n: 1,
    title: "De dónde sale el dato",
    kicker: "Cuatro formas de mirar la atmósfera",
    minutes: 8,
    blocks: [
      {
        kind: "p",
        text: "**En la portada:** una estación meteorológica de superficie registra condiciones cerca de un aeródromo; al fondo se ve un radomo de radar. **Cómo lo reconoces:** los sensores están expuestos al aire y el radar observa a distancia. **Qué decides:** antes de usar un dato, comprueba qué mide, dónde, cuándo y con qué limitaciones. Una pantalla de radar sin ecos no demuestra que el cielo esté libre de nubes o engelamiento.",
      },
      {
        kind: "definicion",
        text: "El briefing combina observaciones locales, perfiles en altura, teledetección por radar y satélite, informes de aeronaves y pronósticos. Estas cuatro familias son una guía de lectura, no un inventario exhaustivo: cada producto tiene alcance, hora de emisión y límites propios.",
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Las cuatro fuentes",
        items: [
          {
            titulo: "En superficie",
            ref: "estación y METAR",
            puntos: [
              "Los sensores y observadores del aeródromo miden viento, visibilidad, nubes, temperatura y presión conforme al producto publicado.",
              "El METAR (Meteorological Aerodrome Report) resume condiciones representativas del aeródromo; no garantiza lo mismo en toda la ruta ni en cada punto de la pista.",
              "Compara la hora de observación y los informes especiales con la tendencia y el pronóstico; una estación sola no describe una región completa.",
            ],
          },
          {
            titulo: "En altitud",
            ref: "sondeos y aeronaves",
            puntos: [
              "Una radiosonda suspendida de un globo mide perfiles de temperatura, humedad y presión; su posición permite calcular el viento.",
              "Las aeronaves aportan observaciones automáticas de viento y temperatura mediante AMDAR (Aircraft Meteorological Data Relay), cuando están equipadas y el sistema está disponible.",
              "Un PIREP (Pilot Report), informe de piloto, añade lo que la tripulación encontró en un lugar, nivel y momento: por ejemplo turbulencia o engelamiento.",
            ],
            nota: "No extrapoles un sondeo o informe puntual a toda la ruta ni lo trates como una garantía futura.",
          },
          {
            titulo: "Radar",
            puntos: [
              "Los productos de reflectividad muestran principalmente ecos de precipitación y ayudan a ubicar su intensidad y evolución.",
              "Según el equipo y producto, el Doppler aporta movimiento de blancos; ecos débiles también pueden provenir de insectos, polvo u otros blancos no precipitantes.",
              "Cobertura, altura del haz, bloqueo por terreno, atenuación, actualización y ajuste de antena limitan la interpretación.",
            ],
            nota: "El radar meteorológico de precipitación no determina por sí solo base de nube, techo, visibilidad ni engelamiento a tu nivel.",
          },
          {
            titulo: "Satélite",
            puntos: [
              "Las imágenes visible e infrarroja muestran extensión y evolución de nubosidad; otras bandas ayudan a seguir vapor de agua y estimar propiedades de topes.",
              "La imagen visible depende de la luz solar y ningún canal muestra por sí solo el techo o la visibilidad en una aproximación.",
              "Comprueba hora de adquisición, resolución, cobertura y demora de distribución antes de usarla en vuelo.",
            ],
          },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Una pantalla sin ecos no despeja la ruta",
        text: "Los radares de precipitación pueden mostrar retornos no precipitantes en ciertos modos, pero su pantalla no certifica ausencia de nube, techo bajo, visibilidad reducida, engelamiento o turbulencia. Incluso la precipitación puede pasar inadvertida por geometría, bloqueo, atenuación o configuración. Cruza el radar con informes, pronósticos y observación directa.",
      },
      {
        kind: "sub",
        text: "El piloto como fuente, que no es una metáfora",
      },
      {
        kind: "p",
        text: "El informe de piloto aporta una observación directa de turbulencia, engelamiento o nubes en un lugar y momento concretos. También existen datos automáticos de aeronaves, sondeos, sensores remotos y productos de pronóstico; ninguno sustituye por sí solo el reporte cualitativo de una tripulación que acaba de encontrar el fenómeno.",
      },
      {
        kind: "check",
        question:
          "El radar de precipitación no muestra ecos cerca de tu ruta, pero un piloto reportó engelamiento moderado a tu nivel hace veinte minutos. ¿Qué concluyes?",
        options: [
          "No hay riesgo: el radar sin ecos descarta engelamiento",
          "El informe es relevante; compruebo ubicación, hora, nivel, pronóstico y procedimientos de mi aeronave",
          "La radiosonda demuestra que ya terminó el engelamiento",
        ],
        answer: 1,
        explain:
          "Un radar sin ecos no descarta nubes con gotas superenfriadas ni prueba condiciones seguras a tu nivel. El informe de piloto es evidencia reciente del fenómeno, pero hay que cotejar su posición y nivel con las condiciones y procedimientos de la ruta.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "También hay observaciones automáticas en aerolínea",
        text: "En aeronaves participantes, AMDAR transmite datos medidos por sensores de a bordo, sobre todo temperatura y viento, hacia los servicios meteorológicos a través de enlaces de datos. Algunas flotas aportan otras variables. Eso no implica que toda aeronave reporte ni reemplaza un informe especial de turbulencia o engelamiento cuando corresponde.",
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t26-01-cuatro-fuentes.webp",
        alt: "Montaje didáctico de cuatro fuentes meteorológicas: estación de superficie, globo con radiosonda, radomo de radar y satélite",
        ancho: 1600,
        alto: 800,
        pie: "Montaje fotográfico conceptual: la estación aporta condiciones locales; el sondeo perfila la atmósfera; el radar observa ecos; el satélite sigue nubosidad a escala amplia. No representa datos meteorológicos vigentes.",
      },
      {
        kind: "p",
        text: "**Qué ves:** cuatro fuentes con alcances distintos. **Cómo lo reconoces:** el sensor de superficie está en el aeródromo, el globo asciende, el radar barre a distancia y el satélite observa desde órbita. **Qué decides:** seleccionar y contrastar la fuente que realmente responde a la pregunta operacional, con su hora, ubicación y limitaciones.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En ruta, mirando la pantalla",
        situacion:
          "El radar meteorológico de a bordo no muestra ecos significativos en la zona que exploras. Un PIREP reciente de otra aeronave reporta engelamiento moderado a un nivel cercano al tuyo, veinte minutos antes y por delante de tu posición.",
        pregunta: "¿Qué información cambia tu decisión y qué verificas antes de continuar?",
        claves: [
          "El informe aporta evidencia directa de engelamiento reciente; ubico su posición, hora, altitud, intensidad y tipo de aeronave si se indican.",
          "Reviso pronósticos y avisos de engelamiento, temperatura y nubes; el radar sin ecos no invalida el reporte.",
          "Compruebo capacidades y limitaciones antihielo de mi aeronave y coordino una ruta o nivel alternativo conforme a los procedimientos de la tripulación y del operador.",
          "Si encuentro el fenómeno, aplico el procedimiento y reporto lo observado para quienes vuelan detrás.",
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Comprueba la fuente y la cobertura aplicables",
        text: "El radar de a bordo y una red terrestre no son intercambiables: difieren en barrido, actualización y cobertura. Consulta los productos oficiales vigentes del Estado y el manual de tu equipo; no supongas que un mapa estadounidense o una imagen recibida con demora representa las condiciones actuales en tu ruta.",
      },
    ],
  },

  // ── 14 ──────────────────────────────────────────────────────────────────
  {
    n: 2,
    title: "El informe del piloto en ruta",
    kicker: "PIREP y AIREP SPECIAL: observaciones en vuelo",
    minutes: 9,
    blocks: [
      {
        kind: "p",
        text: "**En la portada:** una tripulación observa nubes en ruta mientras un piloto transmite por radio. **Cómo lo reconoces:** el informe nace de una condición encontrada en vuelo, no de un pronóstico ni de la pantalla de radar. **Qué decides:** comunicar a la dependencia correspondiente ubicación, hora, nivel, tipo de aeronave y fenómeno con la precisión disponible, siguiendo el procedimiento del operador y del espacio aéreo.",
      },
      {
        kind: "sub",
        text: "Qué aporta un informe de aeronave",
      },
      {
        kind: "vinetas",
        items: [
          "Describe lo que **realmente encontró esa aeronave**: turbulencia, engelamiento, cizalladura, topes o bases de nube, visibilidad en vuelo u otro peligro observado.",
          "Incluye **posición, hora y nivel**; el tipo de aeronave ayuda a interpretar intensidad de turbulencia o engelamiento. Un reporte antiguo o lejano no equivale a tu trayectoria actual.",
          "En el sistema de EE. UU., el PIREP (Pilot Report) puede ser rutinario `UA` o urgente `UUA`. La Organización de Aviación Civil Internacional (OACI; International Civil Aviation Organization, ICAO) contempla el informe especial de aeronave, **AIREP SPECIAL (Air Report Special)**.",
          "Si encuentras un fenómeno peligroso, aplica el procedimiento de la tripulación y repórtalo sin esperar a que te lo soliciten. El canal y la prioridad se verifican en la norma y el manual aplicables.",
        ],
      },
      {
        kind: "p",
        text: "La dependencia de servicios de tránsito aéreo puede retransmitir el informe para que otras aeronaves y la oficina meteorológica lo usen. Un reporte no sustituye los avisos vigentes ni promete que el fenómeno conserve igual intensidad o ubicación.",
      },
      {
        kind: "sub",
        text: "Leer un ejemplo publicado por la Administración Federal de Aviación (Federal Aviation Administration, FAA)",
      },
      {
        kind: "code",
        grande: true,
        text: "KCMH UA /OV APE 230010/TM 1516/FL085/TP BE20/\nSK BKN065/WX FV03SM HZ FU/TA 20/TB LGT",
      },
      {
        kind: "kv",
        items: [
          { k: "KCMH UA", v: "Estación de referencia y PIREP rutinario en el formato estadounidense" },
          { k: "/OV APE 230010", v: "Posición: a 10 millas náuticas en el radial 230 del radiofaro APE" },
          { k: "/TM 1516", v: "Hora de observación: 15:16 UTC" },
          { k: "/FL085", v: "Altitud reportada: 8.500 ft" },
          { k: "/TP BE20", v: "Tipo de aeronave: Beechcraft BE200" },
          { k: "/SK BKN065", v: "Base de nubes fragmentadas a 6.500 ft, según el ejemplo FAA" },
          { k: "/WX FV03SM HZ FU", v: "Visibilidad en vuelo de 3 millas terrestres, calima y humo" },
          { k: "/TA 20 /TB LGT", v: "Temperatura de 20 °C y turbulencia ligera" },
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Formato de muestra, no mensaje vigente",
        text: "El mensaje anterior procede de un ejemplo educativo del Manual de Información Aeronáutica de la FAA; no describe tiempo actual ni un aeródromo colombiano. El formulario estadounidense solicita tipo, posición, hora, nivel y aeronave, además del fenómeno. Si debes reportar de inmediato, comunica lo esencial en lenguaje claro por el canal disponible y sigue el formato local.",
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t27-01-reporte-piloto.webp",
        alt: "Secuencia de un informe de piloto en ruta: observar fenómeno, situarlo en posición hora y nivel, transmitirlo y contrastarlo con otros productos",
        ancho: 1600,
        alto: 720,
        pie: "La secuencia vale para el briefing y el reporte oral; los códigos PIREP de la FAA y AIREP SPECIAL de OACI tienen formatos propios.",
      },
      {
        kind: "p",
        text: "**Qué ves:** un reporte útil conecta fenómeno con posición, hora, nivel y tipo de aeronave antes de circular a otros pilotos. **Cómo lo reconoces:** cada campo responde dónde, cuándo y en qué condiciones se encontró. **Qué decides:** emitirlo con prontitud y evaluar los reportes recibidos según cercanía, antigüedad y compatibilidad con el resto del briefing.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En ruta, después de una zona de turbulencia no pronosticada",
        situacion:
          "Tu tripulación encuentra turbulencia moderada durante varios minutos a nivel de vuelo 220. La aeronave está bajo control y el fenómeno no figura en el briefing disponible.",
        pregunta: "¿Qué haces en la cabina y qué información transmites para que el reporte sirva a otros?",
        claves: [
          "Primero sigo los procedimientos de turbulencia y coordino a la tripulación; el reporte no sustituye la gestión inmediata del vuelo.",
          "Comunico posición, hora UTC del encuentro, nivel, tipo de aeronave, intensidad, duración y evolución observadas, sin atribuir una causa que no comprobé.",
          "Reviso avisos y reportes nuevos y considero un cambio de nivel o ruta con control y despacho según el combustible y las limitaciones de la operación.",
          "El formato final y el canal dependen de los servicios de tránsito aéreo y del procedimiento aprobado para la ruta.",
        ],
      },
      {
        kind: "check",
        question:
          "En el ejemplo de la FAA, ¿qué datos permiten situar una condición encontrada antes de compararla con tu ruta?",
        options: [
          "Solo `UA`: indica que el tiempo sigue igual",
          "`/OV`, `/TM` y `/FL`: posición, hora y nivel del encuentro",
          "Solo `/TA`: la temperatura determina el lugar",
        ],
        answer: 1,
        explain:
          "La ubicación `/OV`, la hora `/TM` y la altitud `/FL` anclan el informe en el espacio y el tiempo. El fenómeno y tipo de aeronave completan el contexto. No proyectes ese dato puntual a toda la ruta sin revisar evolución y otras fuentes.",
      },
      {
        kind: "sub",
        text: "La forma OACI: AIREP SPECIAL",
      },
      {
        kind: "p",
        text: "OACI usa el informe especial de aeronave para fenómenos relevantes como turbulencia o engelamiento moderado o severo, onda de montaña severa, tormentas, ceniza volcánica y otros peligros definidos. La tripulación comunica la observación a servicios de tránsito aéreo; la dependencia meteorológica la distribuye según el procedimiento aplicable. La prioridad es una posición, hora, nivel y descripción inequívocos, no memorizar un formulario extranjero.",
      },
      {
        kind: "code",
        text: "ARS VA812 SEV MTW OBS AT 1215Z N2020W07005 FL180",
      },
      {
        kind: "p",
        text: "Este es el **ejemplo publicado por OACI en el Doc 8896**, con operador ficticio identificado por la propia fuente: un informe especial (`ARS`) de onda de montaña severa (`SEV MTW`), observada a las 12:15 UTC en la posición indicada y a nivel de vuelo 180. Es un ejemplo de formato, no un aviso vigente ni una carta de navegación.",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "RAREP es histórico, no el producto que debes esperar hoy",
        text: "RAREP (Radar Report) era un informe manual de radar del sistema estadounidense. La FAA documenta que lo reemplazó el mensaje codificado de radar RCM (Radar Coded Message) con la red NEXRAD (Next Generation Weather Radar); no enseñamos sus horarios ni códigos como si fueran un producto vigente en Latinoamérica. Para desviar alrededor de convección, usa el radar y los avisos oficiales disponibles para tu ruta y revisa su hora y cobertura.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué aporta un informe de piloto frente a un pronóstico?",
            respuesta:
              "Aporta una observación directa de la condición encontrada por una aeronave, con posición, hora, nivel y tipo de aeronave. Puede confirmar o matizar turbulencia, engelamiento o nubes pronosticadas, pero sigue siendo una muestra puntual que debo contrastar con otros reportes y avisos.",
            claves: ["Observación directa", "Posición, hora y nivel", "Muestra puntual"],
          },
          {
            nivel: "interpretacion",
            q: "¿Cuándo comunicas un fenómeno sin esperar que control lo solicite?",
            respuesta:
              "Cuando observo un fenómeno peligroso o inesperado que puede afectar a otras aeronaves, después de atender primero la seguridad del vuelo. Transmito condición, posición, hora, nivel y aeronave por el canal y con la prioridad previstos en el procedimiento local; no espero un umbral estadounidense de techo o visibilidad.",
            claves: ["Peligro observado", "Seguridad primero", "Reporte oportuno por canal local"],
          },
          {
            nivel: "situacion",
            q: "Un radar no muestra ecos y otro piloto reporta engelamiento a tu nivel. ¿Qué haces?",
            respuesta:
              "No descarto el reporte por la pantalla limpia. Reviso su ubicación, hora y nivel, lo comparo con pronósticos y avisos, y considero una ruta o nivel alternativo dentro de las limitaciones de la aeronave y los procedimientos de la tripulación.",
            claves: ["Radar sin ecos no descarta hielo", "Contexto del informe", "Opciones seguras"],
          },
        ],
      },
    ],
  },

  // ── 15 ──────────────────────────────────────────────────────────────────
  {
    n: 3,
    title: "Los avisos en vuelo",
    kicker: "AIRMET, SIGMET y el convectivo",
    minutes: 9,
    blocks: [
      {
        kind: "p",
        text: "Las advertencias meteorológicas en vuelo son pronósticos que detallan tiempo potencialmente peligroso. Se dan a las aeronaves en ruta y también están disponibles antes de salir, para planificar. Hay tres niveles y la diferencia entre ellos no es de tono: es de a quién le afecta.",
      },
      {
        kind: "fichas",
        columnas: 3,
        titulo: "Los tres del capítulo, que son los de Estados Unidos",
        items: [
          {
            titulo: "AIRMET (WA)",
            ref: "en EE. UU., para aeronaves ligeras y de capacidad operativa limitada",
            puntos: [
              "Engelamiento moderado.",
              "Turbulencia moderada.",
              "Vientos de superficie sostenidos de 30 kt o más.",
              "Grandes zonas con techos por debajo de 1.000 ft y/o visibilidad menor de tres millas.",
              "Oscurecimiento de montaña extenso.",
            ],
          },
          {
            titulo: "SIGMET (WS)",
            ref: "para TODAS las aeronaves; en EE. UU., solo tiempo no convectivo",
            puntos: [
              "Engelamiento severo no asociado a tormentas.",
              "Turbulencia severa o extrema, o turbulencia en aire claro, no asociadas a tormentas.",
              "Tormentas de polvo o de arena que bajan la visibilidad a menos de tres millas.",
              "Ceniza volcánica.",
            ],
            nota: "Válido 4 horas. Si se refiere a huracanes, 6 horas.",
          },
          {
            titulo: "SIGMET convectivo (WST)",
            ref: "solo existe en EE. UU.: allí la convección va aparte",
            puntos: [
              "Tormentas fuertes con viento en superficie de más de 50 kt.",
              "Granizo en superficie de ¾ de pulgada de diámetro o más.",
              "Tornados.",
              "También para tormentas mezcladas, líneas de tormentas o tormentas con precipitación fuerte o mayor.",
            ],
          },
        ],
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Y como los define la OACI (Anexo 3), que es lo que usa la región",
        items: [
          {
            titulo: "SIGMET",
            ref: "para todas las aeronaves en ruta",
            puntos: [
              "Tormentas, dentro del mismo SIGMET: oscurecidas (OBSC), incrustadas (EMBD), frecuentes (FRQ) o en línea (SQL), con GR si traen granizo.",
              "Turbulencia severa, engelamiento severo (también por lluvia engelante) y onda de montaña severa.",
              "Tempestad fuerte de polvo o de arena, y nube radiactiva.",
              "La ceniza volcánica y los ciclones tropicales tienen su propio SIGMET.",
            ],
            nota: "Válido hasta 4 horas; los de ceniza volcánica y ciclón tropical, hasta 6. No existe un SIGMET convectivo aparte.",
          },
          {
            titulo: "AIRMET",
            ref: "para los vuelos a baja altura",
            puntos: [
              "Por debajo de FL100, o de FL150 en zonas montañosas.",
              "Fenómenos que afectan a esos vuelos y no estaban ya en su pronóstico: engelamiento o turbulencia moderados, tormentas aisladas u ocasionales, montañas oscurecidas, techos bajos o visibilidad reducida en zonas amplias.",
            ],
          },
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "La distinción que hay que tener clara",
        text: "En la OACI, que es lo que usa la región, la diferencia es de altura y de alcance: el SIGMET avisa de lo peligroso para todas las aeronaves en ruta, y el AIRMET, de lo que afecta a los vuelos a baja altura. La definición «para aviones ligeros» es la de Estados Unidos. Si en la entrevista te preguntan la diferencia y contestas solo «uno es más fuerte que el otro», no has contestado.",
      },
      {
        kind: "sub",
        text: "Cómo se nombran",
      },
      {
        kind: "kv",
        items: [
          { k: "AIRMET Sierra", v: "condiciones IFR y oscurecimiento de montaña" },
          { k: "AIRMET Tango", v: "turbulencia, vientos fuertes de superficie y cizalladura a bajo nivel" },
          { k: "AIRMET Zulu", v: "engelamiento y niveles de congelación" },
          { k: "SIGMET", v: "letra de November a Yankee, saltando Sierra y Tango" },
          { k: "Primera emisión de un SIGMET", v: "se designa como SIGMET de Clima Urgente (UWS)" },
        ],
      },
      {
        kind: "p",
        text: "Los SIGMET que se vuelven a publicar por el mismo fenómeno se numeran de forma consecutiva hasta que el fenómeno termina. Los AIRMET llevan designador alfanumérico fijo, numerado secuencialmente desde la primera emisión del día.",
      },
      {
        kind: "sub",
        text: "Uno real, desarmado",
      },
      {
        kind: "code",
        grande: true,
        text: "SFOR WS 100130\nSIGMET ROME02 VALID UNTIL 100530\nOR WA\nFROM SEA TO PDT TO EUG TO SEA\nOCNL MOGR CAT BTN 280 AND 350 EXPCD DUE TO JTSTR.\nCONDS BGNG AFT 0200Z CONTG BYD 0530Z.",
      },
      {
        kind: "p",
        text: "Es el SIGMET Romeo 2, segunda emisión para este fenómeno, válido hasta el día 10 a las 0530Z. Cubre Oregón y Washington, en un área definida por Seattle, Portland, Eugene y Seattle. Anuncia **turbulencia en aire claro ocasional moderada o mayor entre 28.000 y 35.000 ft por la corriente en chorro**, empezando después de las 0200Z y continuando más allá del final de este pronóstico.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Fíjate en lo que hace útil ese mensaje",
        text: "Te da el fenómeno, la banda de niveles exacta, la causa y la ventana de tiempo. Con eso se decide un nivel de crucero distinto sin llamar a nadie. Un aviso que solo dijera «turbulencia en la zona» no serviría para nada operativo.",
      },
      {
        kind: "check",
        question:
          "Un SIGMET anuncia turbulencia en aire claro ocasional moderada o mayor entre 28.000 y 35.000 ft por la corriente en chorro, con las condiciones empezando después de las 0200Z. Vas a cruzar la zona a FL310. ¿Qué haces?",
        options: [
          "Nada: el aviso es de turbulencia en aire claro, y el aire claro no se ve ni se esquiva",
          "Pides un nivel fuera de la banda de 28.000 a 35.000 ft, que es donde el aviso la sitúa",
          "Esperas a las 0200Z, porque hasta esa hora el aviso todavía no está en vigor",
        ],
        answer: 1,
        explain:
          "El valor del aviso está en que da la banda exacta, la causa y la ventana de tiempo. FL310 cae dentro de la banda, así que el nivel es lo primero que se mueve, y eso se decide sin llamar a nadie. Ojo con la hora: las condiciones empiezan después de las 0200Z, no terminan, así que esperar a esa hora es entrar en ellas.",
      },
      {
        kind: "sub",
        text: "Y uno convectivo",
      },
      {
        kind: "code",
        grande: true,
        text: "MKCC WST 221855\nCONVECTIVE SIGMET 21C\nVALID UNTIL 2055\nKS OK TX\nVCNTY GLD-CDS LINE\nNO SGFNT TSTMS RPRTD\nLINE TSTMS DVLPG BY 1955Z WILL MOV EWD 30-35 KT THRU 2055Z\nHAIL TO 2 IN PSBL",
      },
      {
        kind: "p",
        text: "SIGMET convectivo número 21C (el 21 consecutivo de la región central), emitido el día 22 a las 1855Z y válido dos horas, hasta las 2055Z. Cubre de Kansas a Oklahoma y Texas, cerca de la línea Goodland a Childress. No hay tormentas significativas reportadas todavía, pero **se va a desarrollar una línea de tormentas a las 1955Z que se moverá al este a 30 a 35 kt**, con granizo posible de hasta 2 pulgadas.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Dos pulgadas de granizo",
        text: "En la lección de tormentas quedó dicho que piedras de más de media pulgada dañan una aeronave en pocos segundos. Este aviso anuncia cuatro veces ese tamaño, con hora y con dirección de movimiento. No es información de contexto: es una zona y una ventana horaria que no se cruzan.",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Los nombres son de allá; el concepto es de todos",
        text: "Sierra, Tango y Zulu son los designadores del sistema estadounidense, igual que la codificación de las regiones. La OACI estandariza que exista el aviso SIGMET y su contenido, y cada Estado publica los suyos a través de su servicio meteorológico y su oficina de vigilancia. Antes de volar en un espacio aéreo, mira en la publicación de información aeronáutica de ese país qué productos se emiten, quién los emite y por qué canal llegan.",
      },
      {
        kind: "infografia",
        nombre: "meteo-avisos",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "Diferencie AIRMET y SIGMET.",
            respuesta:
              "Según la OACI, en el Anexo 3, el SIGMET avisa de fenómenos en ruta peligrosos para todas las aeronaves: tormentas oscurecidas, incrustadas, frecuentes o en línea, con o sin granizo; turbulencia severa; engelamiento severo; onda de montaña severa; tempestades fuertes de polvo o de arena; y nube radiactiva. La ceniza volcánica y los ciclones tropicales tienen su propio SIGMET. El AIRMET es para los vuelos a baja altura, por debajo de FL100 o de FL150 en zonas montañosas, con los fenómenos que no estaban ya en su pronóstico. En Estados Unidos, que es el sistema del capítulo, el AIRMET se define para aeronaves ligeras y el SIGMET convectivo va aparte.",
            claves: ["SIGMET: todas las aeronaves, tormentas incluidas", "AIRMET: vuelos por debajo de FL100", "En EE. UU. el convectivo va aparte"],
          },
          {
            nivel: "interpretacion",
            q: "¿Existe el SIGMET convectivo en la región?",
            respuesta:
              "Como producto aparte, no. El SIGMET convectivo es del sistema de Estados Unidos, donde el SIGMET normal cubre solo lo no convectivo. Con la OACI las tormentas van dentro del SIGMET normal, codificadas como OBSC, EMBD, FRQ o SQL TS, y con GR si hay granizo. Leer un aviso de la región buscando un «convectivo» aparte es perderse las tormentas.",
            claves: ["El convectivo aparte es de EE. UU.", "OACI: las tormentas van dentro del SIGMET", "OBSC, EMBD, FRQ o SQL TS"],
          },
          {
            nivel: "situacion",
            q: "¿Cuánto tiempo es válido un SIGMET?",
            respuesta:
              "Hasta cuatro horas. Los de ceniza volcánica y los de ciclón tropical, hasta seis. Los SIGMET convectivos de Estados Unidos, como el del ejemplo del capítulo, valen dos horas.",
            claves: ["Hasta 4 horas", "6 si es ceniza volcánica o ciclón tropical"],
          },
        ],
      },
    ],
  },

  // ── 16 ──────────────────────────────────────────────────────────────────
  {
    n: 4,
    title: "Pronóstico de área y vientos en altura",
    kicker: "Lo que va a pasar en una región, y qué viento hay en tu nivel",
    minutes: 8,
    blocks: [
      {
        kind: "p",
        text: "El METAR y el TAF hablan de un aeródromo. El pronóstico de área habla de una región entera, que es lo que necesitas para la parte de la ruta que no tiene aeropuerto debajo. Y el pronóstico de vientos en altura es lo que convierte un plan de vuelo en un cálculo de combustible.",
      },
      {
        kind: "sub",
        text: "El pronóstico de área",
      },
      {
        kind: "p",
        text: "Trae una **sinopsis**, que es un resumen breve con la localización y el movimiento de los sistemas de presión, los frentes y los patrones de circulación, y después el tiempo y las nubes por zonas. Las ubicaciones pueden darse por estados, por regiones o por accidentes geográficos como cadenas montañosas.",
      },
      {
        kind: "code",
        text: "SYNOPSIS...LOW PRES TROF 10Z OK/TX PNHDL AREA FCST MOV EWD\nINTO CNTRL-SWRN OK BY 04Z. WRMFNT 10Z CNTRL OK-SRN AR-NRN MS\nFCST LIFT NWD INTO NERN OK-NRN AR EXTRM NRN MS BY 04Z.",
      },
      {
        kind: "p",
        text: "Traducido: a las 1000Z hay un centro de baja presión sobre Oklahoma y Texas que se prevé que se mueva al este hasta el centro suroeste de Oklahoma a las 0400Z. Y un frente cálido situado a las 1000Z sobre el centro de Oklahoma, sur de Arkansas y norte de Mississippi, que se prevé que se levante hacia el noroeste hasta el noreste de Oklahoma a las 0400Z.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Lo que hay que sacar de una sinopsis",
        text: "Dos cosas y en este orden: dónde están los sistemas ahora, y hacia dónde y a qué hora se mueven. Con eso ya sabes si tu ruta va a cruzarlos y aproximadamente cuándo, antes de mirar ningún aeródromo.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "La declaración de precaución no es letra pequeña",
        text: "El pronóstico de área cubre nubes y tiempo VFR, así que trae una advertencia diciendo que hay que consultar además el AIRMET correspondiente para condiciones IFR y oscurecimiento de montaña. Y otra: cuando aparece el código TS, implica que puede haber turbulencia severa o mayor, engelamiento severo, cizalladura a bajo nivel y condiciones IFR. Una sola sigla arrastra cuatro peligros.",
      },
      {
        kind: "check",
        question:
          "En el pronóstico de área de tu zona aparece el código TS. ¿Qué tienes que dar por incluido?",
        options: [
          "Solo tormentas: si hubiera turbulencia o engelamiento severos irían codificados aparte",
          "Tormentas y granizo, que es lo que define la sigla",
          "Turbulencia severa o mayor, engelamiento severo, cizalladura a bajo nivel y condiciones IFR",
        ],
        answer: 2,
        explain:
          "Cuando aparece TS en un pronóstico de área, esa sola sigla implica que puede haber turbulencia severa o mayor, engelamiento severo, cizalladura a bajo nivel y condiciones IFR. No hace falta que los escriban: van dentro. Y como el pronóstico de área cubre nubes y tiempo VFR, trae además la advertencia de consultar el AIRMET correspondiente para condiciones IFR y oscurecimiento de montaña.",
      },
      {
        kind: "sub",
        text: "Vientos y temperaturas en altura",
      },
      {
        kind: "kv",
        items: [
          { k: "Hasta 12.000 ft", v: "son alturas verdaderas" },
          { k: "Por encima de 18.000 ft", v: "son altitudes de presión" },
          { k: "Dirección", v: "siempre referida al norte verdadero" },
          { k: "Velocidad", v: "en nudos" },
          { k: "Temperatura", v: "en grados Celsius" },
          { k: "No se pronostica viento", v: "si el nivel está dentro de 1.500 ft de la elevación de la estación" },
          { k: "No se pronostica temperatura", v: "para estaciones dentro de 2.500 ft del nivel" },
        ],
      },
      {
        kind: "sub",
        text: "La codificación que se pregunta en las entrevistas",
      },
      {
        kind: "p",
        text: "Un grupo normal de cuatro dígitos es dirección y velocidad. Pero cuando la velocidad pronosticada pasa de 100 kt no cabe, así que se codifica: **se suman 50 a la dirección y se restan 100 a la velocidad.** Para leerlo, se hace al revés.",
      },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "El grupo llega así",
            texto: "731960. Si los dos primeros dígitos pasan de 36, es que está codificado: no existe un rumbo 73.",
          },
          {
            rotulo: "Deshaz la dirección",
            texto: "73 menos 50 son 23, o sea 230 grados.",
          },
          {
            rotulo: "Deshaz la velocidad",
            texto: "19 más 100 son 119 nudos.",
            fuerte: true,
          },
          {
            rotulo: "Y lo que queda",
            texto: "60 es la temperatura: -60 °C. Resultado: viento 230 a 119 kt con -60 °C.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "El tope de la escala",
        text: "Si el viento pronosticado es de 200 kt o más, se codifica como 99. Un «7799» son 270 grados a 199 kt o más. Y por encima de 24.000 ft las temperaturas son siempre negativas, así que el signo menos se omite.",
      },
      {
        kind: "infografia",
        nombre: "meteo-viento-codificado",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Planificando el nivel de crucero",
        situacion:
          "Tienes el pronóstico de viento para tres niveles y en el del medio aparece el grupo 731960. El copiloto lo lee como «viento del 073 a 19 nudos» y dice que ese nivel es el mejor porque casi no hay viento.",
        pregunta: "¿Qué le corriges?",
        claves: [
          "No existe un rumbo 073 en una codificación de dos dígitos que va de 01 a 36: el 73 ya avisa de que el grupo está codificado.",
          "Restando 50 a la dirección y sumando 100 a la velocidad, es viento del 230 a 119 nudos.",
          "De «casi no hay viento» a 119 nudos hay toda la planificación de combustible de diferencia, y además el signo cambia: ese nivel puede ser el mejor o el peor según el rumbo.",
          "Y los 60 finales son -60 °C, que también importa.",
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "El formato local",
        text: "Cómo se llama el pronóstico de área en tu país, qué regiones cubre y en qué formato publica los vientos en altura lo define su servicio meteorológico. La codificación de arriba es la del capítulo. Antes de usarla en una operación real, confirma el formato del producto que vas a recibir.",
      },
    ],
  },

  // ── 17 ──────────────────────────────────────────────────────────────────
  {
    n: 5,
    title: "Las cartas del tiempo",
    kicker: "La imagen global, antes de mirar ningún aeródromo",
    minutes: 7,
    blocks: [
      {
        kind: "p",
        text: "Las cartas se miran **al principio** de la planificación, no al final. Dan la imagen global: dónde están los frentes y los sistemas, y hacia dónde van. Después se baja al detalle del aeródromo con el METAR y el TAF. Al revés no funciona, porque un METAR bueno no te dice que dentro de dos horas te va a cruzar un frente.",
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Cuatro cartas y para qué sirve cada una",
        items: [
          {
            titulo: "Análisis de superficie",
            ref: "tiempo actual",
            puntos: [
              "Muestra altas y bajas, frentes, temperaturas, punto de rocío, dirección y velocidad del viento, tiempo local y obstrucciones a la visión.",
              "Es un informe preparado por computadora, transmitido cada 3 horas.",
              "Trae además las observaciones de superficie en cada punto de notificación, con su modelo de estación.",
            ],
          },
          {
            titulo: "Representación del tiempo",
            ref: "tiempo actual",
            puntos: ["Fuente de información meteorológica actual para hacerse la imagen de conjunto."],
          },
          {
            titulo: "Resumen de radar",
            ref: "tiempo actual",
            puntos: ["La imagen de la precipitación, con los límites del radar que ya conoces."],
          },
          {
            titulo: "Tiempo significativo",
            ref: "pronóstico",
            puntos: ["Da la imagen general del tiempo pronosticado."],
          },
        ],
      },
      {
        kind: "sub",
        text: "Leer un modelo de estación",
      },
      {
        kind: "vinetas",
        items: [
          "La forma dice quién observó: un modelo redondeado es un observador oficial; uno cuadrado, una estación automática. Las de mar adentro vienen de buques, boyas o plataformas.",
          "La cobertura del cielo se muestra como despejado, dispersas, fragmentado, cubierto u oscurecido.",
          "Los símbolos de nubes bajas van debajo del modelo, y los de medias y altas encima. Normalmente solo se representa un tipo.",
          "El viento va con una flecha unida al círculo de la estación: la flecha apunta desde donde sopla el viento.",
          "Cada púa de la flecha son 10 kt, media púa son 5 kt, y un banderín son 50 kt.",
        ],
      },
      {
        kind: "check",
        question:
          "En un modelo de estación, la flecha del viento lleva un banderín y dos púas enteras. ¿Qué viento hay, y de dónde?",
        options: [
          "52 kt, y la flecha apunta hacia donde va el viento",
          "70 kt, y la flecha apunta desde donde sopla el viento",
          "20 kt: las púas son las que cuentan, y el banderín solo marca que el dato es medido",
        ],
        answer: 1,
        explain:
          "Un banderín son 50 kt, cada púa entera 10 kt y media púa 5 kt: 50 más 10 más 10 son 70 kt. Y la otra mitad del símbolo es la dirección: la flecha apunta desde donde sopla el viento, igual que los 270 de un METAR son de dónde viene y no hacia dónde va.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "La presión a nivel del mar, en tres dígitos",
        text: "Viene en tres dígitos a la décima de milibar más cercana. Si es 1.000 mb o más, se antepone un 10; si es menos de 1.000, se antepone un 9. Y debajo va el cambio de presión en décimas de milibar en las últimas tres horas, que es la tendencia.",
      },
      {
        kind: "sub",
        text: "Las isobaras, que son el mapa del viento",
      },
      {
        kind: "p",
        text: "Las isobaras unen puntos de igual presión, como las curvas de nivel de un mapa topográfico. Lo que dibujan es el **gradiente de presión**, y de ahí sale el viento:",
      },
      {
        kind: "kv",
        items: [
          { k: "Isobaras muy juntas", v: "gradiente fuerte: predominan vientos fuertes" },
          { k: "Isobaras muy separadas", v: "gradiente pequeño: vientos suaves" },
        ],
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Y el vocabulario de la carta",
        items: [
          {
            titulo: "Alta y baja",
            puntos: [
              "Una alta es un área de alta presión rodeada de presiones menores.",
              "Una baja es un área de baja presión rodeada de presiones mayores.",
            ],
          },
          {
            titulo: "Lomada, surco y collado",
            puntos: [
              "Una lomada es un área alargada de alta presión.",
              "Un surco es un área alargada de baja presión.",
              "Un collado es la intersección entre una lomada y un surco, o la zona neutra entre dos altas o dos bajas.",
            ],
          },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Lo que la carta te dice del viento que vas a encontrar arriba",
        text: "Las isobaras informan sobre el viento en los primeros miles de pies. Cerca del suelo la fricción cambia la dirección y frena la velocidad, pero entre 2.000 y 3.000 ft la velocidad es mayor y la dirección se vuelve más paralela a las isobaras. La regla práctica del capítulo, que está escrita para el hemisferio norte: el viento a 2.000 ft AGL está de 20° a 40° **a la derecha** del de superficie, es decir, girado en el sentido de las agujas del reloj, y es más fuerte, con más giro sobre terreno rugoso y menos sobre agua abierta. **En el hemisferio sur el giro es al revés: a la izquierda.** Con viento de superficie del 180, a 2.000 ft esperas del 200 al 220 en el norte y del 140 al 160 en el sur. Sin información de vientos en altura, esa estimación te saca del apuro.",
      },
      {
        kind: "infografia",
        nombre: "meteo-isobaras",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿En qué momento de la planificación se usan las cartas del tiempo y por qué?",
            respuesta:
              "En las etapas iniciales, porque dan la imagen global: el movimiento de los frentes y de los sistemas importantes. Con esa imagen ya sabes si tu ruta va a cruzarlos y cuándo, y después se baja al detalle de cada aeródromo con el METAR y el TAF.",
            claves: ["Etapas iniciales", "Imagen global", "Movimiento de frentes y sistemas"],
          },
          {
            nivel: "interpretacion",
            q: "En una carta de superficie ve isobaras muy juntas. ¿Qué espera?",
            respuesta:
              "Un gradiente de presión fuerte y, por tanto, vientos fuertes en esa zona. Las isobaras muy separadas indican gradiente pequeño y vientos suaves.",
            claves: ["Gradiente fuerte", "Vientos fuertes", "Separadas: vientos suaves"],
          },
          {
            nivel: "situacion",
            q: "No tiene información de vientos en altura. ¿Cómo estima el viento a 2.000 ft AGL?",
            respuesta:
              "A partir del viento de superficie: a 2.000 ft AGL suele estar de 20° a 40° a la derecha del de superficie en el hemisferio norte, y a la izquierda en el hemisferio sur, y con más velocidad, porque arriba la fricción ya no lo frena ni reduce el efecto de Coriolis. El cambio de dirección es mayor sobre terreno rugoso y menor sobre superficies planas como agua abierta.",
            claves: ["20° a 40°: a la derecha en el norte, a la izquierda en el sur", "Más velocidad", "Menos fricción", "Más giro en terreno rugoso"],
          },
        ],
      },
    ],
  },
]
