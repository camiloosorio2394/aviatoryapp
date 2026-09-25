/**
 * Nivel 6 · Información en ruta (capítulo 12 del PHAK).
 *
 * Va al final del módulo, detrás del METAR y del TAF, porque el PIREP, los
 * avisos y las cartas los dan por sabidos. Los `n` de este archivo cuentan
 * desde 1; su posición en la lección la calcula metarLesson.ts.
 *
 * Solo lo que NO se solapa con METAR y TAF, que ya están en la parte del
 * código: las observaciones y sus fuentes, los informes de piloto, las
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
    kicker: "Qué avisa cada producto y cómo afecta la ruta",
    minutes: 9,
    blocks: [
      {
        kind: "p",
        text: "**En la portada:** una línea de cumulonimbos y cortinas de precipitación aparece junto a la ruta. **Cómo lo reconoces:** la convección sobresale de las capas vecinas y puede extenderse mucho más allá de lo que muestra una sola ventana. **Qué decides:** revisar los avisos vigentes, la extensión vertical y horizontal del fenómeno, y las opciones de desvío antes de acercarte.",
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Dos avisos que no cumplen la misma función",
        items: [
          {
            titulo: "SIGMET (Significant Meteorological Information)",
            ref: "fenómenos significativos en ruta para las operaciones aéreas",
            puntos: [
              "Puede advertir tormentas oscurecidas, incrustadas, frecuentes o en línea, además de turbulencia o engelamiento severos, onda de montaña severa, ceniza volcánica y otros fenómenos especificados.",
              "Indica región de información de vuelo, fenómeno, ubicación, niveles cuando corresponda, movimiento o evolución, y período de validez.",
              "No equivale por sí solo a una autorización ni a una ruta libre de peligro fuera del polígono.",
            ],
            nota: "Validez máxima usual: 4 horas; para ceniza volcánica y ciclón tropical, hasta 6 horas. Lee siempre las horas impresas en el aviso.",
          },
          {
            titulo: "AIRMET (Airmen's Meteorological Information)",
            ref: "información suplementaria para vuelos a baja altura donde se emite",
            puntos: [
              "Según la OACI, complementa el pronóstico de área para vuelos a baja altura con fenómenos no incluidos allí que pueden afectar su seguridad.",
              "La capa de referencia suele llegar a FL100; en áreas montañosas puede extenderse a FL150 o más, según lo acordado localmente.",
              "Su emisión depende de acuerdos regionales y del tránsito a baja altura: no supongas que estará disponible en cada región de información de vuelo.",
            ],
            nota: "Si se emite, la validez máxima es de 4 horas. Para una aerolínea en crucero, el SIGMET suele ser el aviso más relevante; el AIRMET puede importar en ascenso, descenso o desvío.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "No los ordenes como tres grados de severidad",
        text: "El marco OACI incluye tormentas significativas en SIGMET. Estados Unidos publica además el producto propio «Convective SIGMET» para convección; su clasificación y los designadores Sierra, Tango y Zulu no se trasladan sin más a Colombia o a otro Estado. Comprueba los productos de la región que vas a volar.",
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t28-01-avisos-ruta.webp",
        alt: "Diagrama conceptual que contrasta SIGMET para fenómenos significativos en ruta y AIRMET para vuelos a baja altura donde se emite; ambos llevan a revisar ubicación, tiempo, niveles y alternativas",
        ancho: 1600,
        alto: 720,
        pie: "Esquema didáctico, no carta ni aviso vigente. La disponibilidad del AIRMET y el formato de los mensajes dependen del Estado y del acuerdo regional.",
      },
      {
        kind: "p",
        text: "**Qué ves:** los avisos tienen destinatarios y condiciones de emisión diferentes; el SIGMET cubre fenómenos significativos en ruta y el AIRMET complementa el pronóstico de baja altura donde está previsto. **Cómo lo reconoces:** identifica primero el tipo de mensaje y su región, luego fenómeno, período y niveles. **Qué decides:** si tu trayectoria coincide en espacio y tiempo, prepara con despacho y control de tránsito aéreo una ruta, un nivel o un aeropuerto alterno compatible con combustible, performance y procedimientos.",
      },
      {
        kind: "sub",
        text: "Leer un aviso antes de tomar una decisión",
      },
      {
        kind: "kv",
        items: [
          { k: "Dónde", v: "Región de información de vuelo y extensión horizontal; compara con tu ruta y sus alternativas." },
          { k: "Cuándo", v: "Emisión, inicio y fin de validez en UTC; comprueba actualizaciones y cancelaciones." },
          { k: "Qué y a qué nivel", v: "Fenómeno, intensidad, base/cima o niveles afectados cuando estén indicados; contrasta radar, satélite y reportes." },
          { k: "Cómo cambia", v: "Movimiento, intensidad prevista y tendencia; una posición anterior no asegura un corredor libre." },
          { k: "Con qué margen", v: "Combustible, performance, procedimientos de la empresa, aeropuerto alterno y coordinación con control." },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Un nivel diferente no siempre resuelve el riesgo",
        text: "Una zona convectiva puede crecer, desplazarse y ocupar varios niveles. No deduzcas un paso seguro solo porque el aviso nombra una banda, ni cambies por tu cuenta una ruta o nivel controlado. La tripulación contrasta información actualizada y coordina la alternativa conforme a sus autorizaciones y procedimientos.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Antes de entrar a una región de información de vuelo",
        situacion: "El briefing muestra un SIGMET de tormentas incrustadas con desplazamiento hacia tu ruta y validez durante el tramo previsto. La pantalla de radar aún no define un corredor libre.",
        pregunta: "¿Qué verificas y cómo preparas una alternativa antes de entrar a la zona?",
        claves: [
          "Comparo el período, la ubicación y el movimiento del SIGMET con la hora estimada y la ruta.",
          "Contrasto los avisos con observaciones y reportes recientes; una pantalla sin un corredor definido no demuestra paso seguro.",
          "Evalúo margen lateral, combustible, performance y alternos, y coordino el desvío con despacho y control según el procedimiento.",
        ],
      },
      {
        kind: "sub",
        text: "Comprobación de criterio",
      },
      {
        kind: "check",
        question:
          "Un SIGMET válido describe tormentas incrustadas que se desplazan hacia tu tramo de ruta. ¿Qué haces antes de entrar?",
        options: [
          "Descartarlo porque no hay un SIGMET convectivo separado en el sistema OACI.",
          "Comparar ubicación, validez, movimiento y niveles con la ruta; preparar y coordinar una alternativa segura.",
          "Subir automáticamente sobre la nube sin consultar performance ni autorización.",
        ],
        answer: 1,
        explain:
          "Las tormentas pueden aparecer dentro de un SIGMET OACI. La ruta, el momento y la evolución importan tanto como el nombre del producto; cualquier modificación se coordina y se evalúa con márgenes operacionales.",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Consulta la publicación vigente, no un ejemplo de clase",
        text: "La oficina de vigilancia meteorológica y el servicio de información aeronáutica de cada Estado publican la disponibilidad y distribución de sus productos. Una evaluación regional de OACI registró diferencias en la emisión internacional de AIRMET entre Estados sudamericanos; no conviertas una ficha de Estados Unidos en una regla local. Para un vuelo real, usa el AIP/eAIP y los avisos actuales de las regiones de información de vuelo de tu ruta.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "Diferencie AIRMET y SIGMET.",
            respuesta:
              "SIGMET describe fenómenos significativos en ruta que pueden afectar la seguridad de las operaciones, incluidas tormentas de los tipos previstos por OACI. AIRMET complementa el pronóstico de área para vuelos a baja altura donde un acuerdo regional dispone su emisión; no es una escala menor del mismo aviso. Primero confirmo qué se publica en la región de mi vuelo.",
            claves: ["SIGMET: riesgo significativo en ruta", "AIRMET: baja altura donde se emite", "Confirmar disponibilidad local"],
          },
          {
            nivel: "interpretacion",
            q: "¿Dónde buscarías las tormentas si no hay un producto convectivo separado?",
            respuesta:
              "En el marco OACI, las tormentas significativas pueden formar parte del SIGMET de la región. Estados Unidos maneja un Convective SIGMET separado. Leo el fenómeno y la región del mensaje vigente, no doy por hecho que todos los países usan la misma familia de productos.",
            claves: ["Tormentas en SIGMET OACI", "Producto separado en EE. UU.", "Leer mensaje vigente"],
          },
          {
            nivel: "situacion",
            q: "¿Qué datos del SIGMET te permiten decidir un desvío?",
            respuesta:
              "Identifico región, fenómeno, período de validez, ubicación, niveles y evolución. Comparo esos datos con mi ruta y hora estimada; verifico actualizaciones y contrasto con observaciones. Después evalúo desvíos, combustible, performance y alternos con despacho y control según corresponda. La validez máxima general es de cuatro horas, o seis para ceniza volcánica y ciclón tropical, pero manda el período del aviso concreto.",
            claves: ["Lugar, tiempo y niveles", "Movimiento y actualización", "Alternativa coordinada"],
          },
        ],
      },
    ],
  },

  // ── 16 ──────────────────────────────────────────────────────────────────
  {
    n: 4,
    title: "Pronóstico de área y vientos en altura",
    kicker: "Tiempo en ruta, nivel y combustible",
    minutes: 8,
    blocks: [
      {
        kind: "p",
        text: "**En la portada:** una tripulación contrasta el plan de vuelo con las condiciones visibles en ruta. **Cómo lo reconoces:** una vista por la ventana no representa el tiempo de toda la trayectoria ni el viento a cada nivel. **Qué decides:** comparar pronósticos válidos para la ruta y la hora previstas con el plan operacional, y volver a evaluar si el viento o los fenómenos cambian.",
      },
      {
        kind: "definicion",
        text: "Un pronóstico de área describe condiciones previstas para una región, no para un solo aeródromo. En vuelos de aerolínea se combinan productos de tiempo significativo, viento y temperatura en altura, avisos en ruta y pronósticos de los aeródromos. El sistema de pronósticos de área mundial, WAFS (World Area Forecast System), suministra campos de viento y temperatura en altura y pronósticos de tiempo significativo para la planificación.",
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Dos preguntas distintas para la misma ruta",
        items: [
          {
            titulo: "¿Qué tiempo cruzaremos?",
            ref: "pronóstico de área y tiempo significativo",
            puntos: [
              "Identifica zonas y horas previstas de convección, turbulencia, engelamiento o ceniza según el producto disponible.",
              "Comprueba el nivel o la capa afectada, el movimiento y las actualizaciones; contrasta con SIGMET y observaciones recientes.",
              "No convierte en segura una ruta por el solo hecho de no representar un fenómeno.",
            ],
          },
          {
            titulo: "¿Qué viento tendremos?",
            ref: "viento y temperatura por nivel y hora",
            puntos: [
              "El viento previsto modifica la velocidad sobre el suelo, los tiempos estimados y el combustible calculado.",
              "La temperatura en altura influye en performance y en la selección operacional del nivel.",
              "Compara varios niveles y segmentos; un viento favorable aislado no justifica atravesar tiempo peligroso.",
            ],
          },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "No hay un único «pronóstico de área» universal",
        text: "El formato textual de una sinopsis de Estados Unidos no es el formato obligatorio de Colombia ni del WAFS. Las áreas, niveles, horas válidas y representación dependen del producto y del proveedor. Para una operación real, usa el briefing aprobado por el explotador y la publicación vigente del Estado correspondiente.",
      },
      {
        kind: "sub",
        text: "Cómo leerlo para una decisión de aerolínea",
      },
      {
        kind: "pasos",
        items: [
          { rotulo: "Ubica la trayectoria", texto: "Marca origen, ruta, alternos y las regiones de información de vuelo que atravesarás." },
          { rotulo: "Alinea los tiempos", texto: "Compara hora prevista de paso y período válido de cada pronóstico; no uses una carta de otra hora como si fuera actual." },
          { rotulo: "Separa los niveles", texto: "Distingue fenómenos por capa y viento/temperatura por nivel; confirma la unidad y la referencia del producto." },
          { rotulo: "Contrasta y decide", texto: "Cruza el pronóstico con SIGMET, observaciones y reportes de pilotos. Evalúa ruta, nivel, combustible y alternos con despacho y control.", fuerte: true },
        ],
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t29-01-viento-planificacion.webp",
        alt: "Esquema conceptual que relaciona viento de frente o de cola con velocidad sobre el suelo, tiempo y combustible, y recuerda comprobar nivel, hora y riesgos",
        ancho: 1600,
        alto: 720,
        pie: "Relación cualitativa para estudiar; no es una carta meteorológica ni reemplaza el cálculo del plan de vuelo aprobado.",
      },
      {
        kind: "p",
        text: "**Qué ves:** el viento previsto cambia la velocidad sobre el suelo aunque la velocidad del avión respecto al aire sea la misma. **Cómo lo reconoces:** compara el componente de viento en la dirección de la ruta, no solo la velocidad total del viento. **Qué decides:** revisar tiempos, combustible y reservas en el plan aprobado; antes de elegir otro nivel, considera performance, tiempo significativo, autorizaciones y procedimientos de la empresa.",
      },
      {
        kind: "sub",
        text: "Viento y temperatura en altura",
      },
      {
        kind: "kv",
        items: [
          { k: "Nivel y hora", v: "El pronóstico se refiere a niveles y tiempos válidos definidos; verifica ambos antes de compararlo con tu tramo." },
          { k: "Dirección y velocidad", v: "Lee la convención y unidad del producto. El componente sobre la ruta determina viento de frente, de cola o cruzado." },
          { k: "Temperatura", v: "Contrástala con performance y limitaciones; no es solo un dato de confort." },
          { k: "Plan operacional", v: "La planificación integra vientos a lo largo de la ruta, tiempos y consumo; no se decide con un único punto de la carta." },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Viento favorable no significa nivel favorable",
        text: "Un nivel puede mejorar el viento y a la vez atravesar turbulencia, engelamiento o una capa de convección. Tampoco basta elegir el menor tiempo: comprueba las limitaciones de la aeronave, la autorización, las reservas y el combustible del tramo y de los alternos.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Briefing previo al vuelo",
        situacion: "El plan operacional prevé un fuerte viento de frente en el tramo de regreso. Un pronóstico más reciente indica que el núcleo de viento se desplazó hacia el nivel inicialmente planificado y que un nivel alternativo coincide con una zona de turbulencia prevista.",
        pregunta: "¿Qué revisas antes de aceptar el nivel o la cantidad de combustible del plan?",
        claves: [
          "Compruebo las horas válidas y la trayectoria del viento en los distintos niveles y segmentos, no solo un valor puntual.",
          "Reviso los tiempos, el consumo y las reservas calculadas con despacho conforme al plan y manual aprobados.",
          "Contrasto el nivel alternativo con el pronóstico de turbulencia, SIGMET, performance y autorización disponible.",
          "Si el cambio afecta los márgenes, ajusto la planificación por el procedimiento del explotador antes de salir.",
        ],
      },
      {
        kind: "check",
        question: "El pronóstico actualizado aumenta el viento de frente a tu nivel y el nivel con menos viento coincide con turbulencia significativa. ¿Qué criterio aplicas?",
        options: [
          "Elegir el nivel con menos viento sin revisar el resto, porque así siempre baja el consumo.",
          "Mantener el plan original: el viento previsto no influye en tiempo ni combustible.",
          "Recalcular tiempos y combustible con despacho y comparar niveles con los riesgos, performance y autorizaciones.",
        ],
        answer: 2,
        explain: "El viento modifica la velocidad sobre el suelo y, con ella, tiempo y combustible; pero un nivel más favorable por viento puede no ser aceptable por tiempo significativo u otras limitaciones. La decisión corresponde al plan aprobado y a la coordinación operacional.",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "El producto que recibes puede ser distinto",
        text: "Un pronóstico textual de área, un campo reticulado de viento y una carta de tiempo significativo no se leen con la misma clave. Confirma fuente, hora válida, niveles, unidades y limitaciones en el briefing aprobado; consulta el AIP/eAIP vigente para los servicios del Estado. Esta lección no reproduce una carta ni datos meteorológicos actuales.",
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
