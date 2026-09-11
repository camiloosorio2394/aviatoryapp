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
        text: "Todo lo que lees en el briefing (cada pronóstico, cada aviso, cada informe) sale de observaciones. Saber de cuál sale cada cosa te dice de antemano qué puede y qué no puede decirte. El ejemplo que más cuesta caro: el radar no ve nubes.",
      },
      {
        kind: "definicion",
        text: "Los datos de observaciones en superficie y en altura son la base de todos los pronósticos, avisos e informes. Hay cuatro tipos de observación: en superficie, en altitud, radar y satélite.",
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Las cuatro fuentes",
        items: [
          {
            titulo: "En superficie",
            ref: "es el METAR",
            puntos: [
              "Compilación de los elementos del tiempo en una estación de tierra concreta.",
              "Cubren un radio de unas cinco millas del aeropuerto.",
              "Las hace una persona, una estación automática, o una automática mejorada por un observador.",
              "Cubren poco radio cada una, pero mirando muchas estaciones a la vez se arma la imagen de una zona amplia.",
            ],
          },
          {
            titulo: "En altitud",
            ref: "radiosonda y PIREP, y no hay más",
            puntos: [
              "Solo hay dos métodos de observar el tiempo en altura: la radiosonda y el informe del piloto.",
              "La radiosonda es una caja de instrumentos colgada de un globo de dos metros lleno de helio o hidrógeno.",
              "Sube a unos 1.000 ft por minuto, puede volar más de dos horas, llegar a 115.000 ft y derivar hasta 200 km.",
              "Mide temperatura, presión, velocidad y dirección del viento y lo transmite a tierra.",
            ],
            nota: "Cuando el globo se estira más de 6 metros de diámetro, estalla, y la radiosonda baja en paracaídas.",
          },
          {
            titulo: "Radar",
            puntos: [
              "Informa de precipitación, viento y sistemas.",
              "Detecta solo objetos lo bastante grandes como para considerarse precipitación.",
            ],
            nota: "Y aquí está lo que hay que retener: las bases y topes de nubes, los techos y la visibilidad NO los detecta el radar.",
          },
          {
            titulo: "Satélite",
            puntos: [
              "Da tiempo actualizado de forma continua a cualquier altitud, sin depender del alcance de la radio ni de la geografía.",
              "Rompe el cuello de botella de la radio: cuando el tiempo se pone dudoso, la frecuencia se congestiona y el personal solo puede hablar con un piloto a la vez.",
              "Se recibe en dispositivos certificados o en receptores portátiles.",
            ],
          },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Lo que el radar no ve",
        text: "El radar detecta precipitación. No detecta bases ni topes de nubes, ni techos, ni visibilidad. Una pantalla limpia no significa cielo limpio: significa que no hay precipitación con eco suficiente. Toda la información de nubes y techos tiene que venir de otra fuente.",
      },
      {
        kind: "sub",
        text: "El piloto como fuente, que no es una metáfora",
      },
      {
        kind: "p",
        text: "El capítulo lo dice sin adornos: los pilotos **siguen siendo la única fuente de información en tiempo real sobre turbulencia, engelamiento y altura de nubes**. Juntas, las radiosondas y los informes de pilotos son lo que hay sobre el aire en altura.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Y en una aerolínea, además, automático",
        text: "Muchas líneas aéreas tienen aeronaves equipadas con instrumentos que transmiten observaciones meteorológicas en vuelo por DataLink al despachador, que las difunde a las autoridades de pronóstico. Es decir: si vuelas para una compañía así, tu avión ya está reportando. Eso no sustituye tu PIREP de turbulencia o de engelamiento, que es un juicio y no una medición.",
      },
      {
        kind: "hueco",
        rotulo: "MT-S13-01 · Diagrama · 16:9 · 1600×900 · SVG",
        descripcion:
          "Las cuatro fuentes de observación en un solo corte: la estación de superficie en un aeródromo, el globo de radiosonda subiendo con su escala de altura, el haz de radar barriendo una zona de precipitación y el satélite arriba. Sobre cada una, en una línea, qué mide y qué NO mide. En la del radar, destacado: «no ve nubes, ni techos, ni visibilidad».",
        alto: 340,
        pie: "Cada fuente ve una cosa distinta, y ninguna lo ve todo.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En ruta, mirando la pantalla",
        situacion:
          "El radar meteorológico está limpio en los próximos 80 NM. El PIREP más reciente de un tráfico que va veinte minutos por delante reporta engelamiento moderado en el ascenso a tu nivel.",
        pregunta: "¿Cuál de los dos datos pesa más y por qué?",
        claves: [
          "El radar detecta precipitación. El engelamiento se da en agua superenfriada dentro de nube, que puede no dar eco.",
          "Una pantalla limpia no dice nada sobre nubes ni sobre hielo.",
          "El PIREP es la única fuente en tiempo real de engelamiento, y viene de una aeronave que acaba de pasar por donde vas.",
          "Los dos datos no se contradicen: están midiendo cosas distintas, y el que responde a tu pregunta es el PIREP.",
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Qué radar tienes tú",
        text: "El capítulo describe el radar NEXRAD (WSR-88D) de los Estados Unidos, con sus modos de aire claro y precipitación. La red de radares meteorológicos de tu país, su cobertura y qué productos publica los define el servicio meteorológico de ese Estado. Lo general es lo de arriba: qué puede ver un radar y qué no. Lo particular, en la publicación de información aeronáutica de tu país.",
      },
    ],
  },

  // ── 14 ──────────────────────────────────────────────────────────────────
  {
    n: 2,
    title: "El PIREP y el RAREP",
    kicker: "El único informe que escribes tú",
    minutes: 9,
    blocks: [
      {
        kind: "p",
        text: "De todos los productos del briefing, el PIREP es el único que también se emite en la otra dirección. Todo lo demás lo lees; este lo escribes. Y como es la única fuente en tiempo real de turbulencia, engelamiento y altura de nubes, el que tú mandes es literalmente el dato que el siguiente va a usar para decidir.",
      },
      {
        kind: "sub",
        text: "Qué aporta, y cuándo te lo van a pedir",
      },
      {
        kind: "vinetas",
        items: [
          "Confirma la altura de techos y de topes de nubes.",
          "Ubica la cizalladura del viento y la turbulencia.",
          "Ubica el engelamiento.",
          "Con techo por debajo de 5.000 ft o visibilidad de cinco millas o menos, los controladores piden PIREP a los pilotos de la zona.",
          "Y cuando encuentras condiciones inesperadas, se espera que informes aunque nadie te lo pida.",
        ],
      },
      {
        kind: "p",
        text: "Cuando presentas uno, el ATC o la dependencia correspondiente lo mete en la red: sirve para informar a otros pilotos y para emitir avisos en vuelo.",
      },
      {
        kind: "sub",
        text: "Interpretar: uno real, desarmado",
      },
      {
        kind: "code",
        grande: true,
        text: "UA/OV GGG 090025/TM 1450/FL 060/TP C182/\nSK 080 OVC/WX FV 04R/TA 05/WV 270030/TB GT/RM HVY RAIN",
      },
      {
        kind: "kv",
        items: [
          { k: "UA", v: "Informe de piloto de rutina" },
          { k: "OV GGG 090025", v: "Ubicación: 25 NM en el radial 090 del VOR Gregg County" },
          { k: "TM 1450", v: "Hora: 1450 Zulú" },
          { k: "FL 060", v: "Altitud o nivel: 6.000 ft" },
          { k: "TP C182", v: "Tipo de aeronave: Cessna 182" },
          { k: "SK 080 OVC", v: "Cielo: cubierto a 8.000" },
          { k: "WX FV 04R", v: "Visibilidad y tiempo: 4 millas en lluvia" },
          { k: "TA 05", v: "Temperatura: 5 °C" },
          { k: "WV 270030", v: "Viento: 270° a 30 kt" },
          { k: "TB GT", v: "Turbulencia: ligera" },
          { k: "RM HVY RAIN", v: "Observaciones: la lluvia es fuerte" },
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Los cinco primeros son obligatorios",
        text: "En el formulario, los elementos 1 a 5 son información requerida, más al menos un fenómeno meteorológico encontrado. O sea: dónde, cuándo, a qué nivel, con qué avión, y qué te pasó. Lo demás suma. Un PIREP no se deja de mandar por no acordarse del formato completo.",
      },
      {
        kind: "hueco",
        rotulo: "MT-S14-01 · Tabla ilustrada · 3:4 · 1200×1600 · SVG",
        descripcion:
          "El formulario de PIREP con sus campos numerados en columna, y al lado de cada uno el trozo correspondiente del ejemplo real resaltado, para que se lea de arriba abajo como se rellena. Los cinco primeros campos marcados como obligatorios con un distintivo claro. Sustituye a la figura 12-8 del PHAK.",
        alto: 460,
        ratio: "3 / 4",
        anchoMax: 420,
        pie: "El formulario y un informe real, uno al lado del otro.",
      },
      {
        kind: "sub",
        text: "El RAREP, que es lo que ve el radar",
      },
      {
        kind: "p",
        text: "Los informes meteorológicos de radar (RAREP, o detecciones de tormenta) los emiten las estaciones de radar **a los 35 minutos después de la hora**, con informes especiales cuando hacen falta. Dan tipo, intensidad y localización del eco de la parte superior de la precipitación, y pueden incluir dirección y velocidad de la zona de precipitación y la altura de la base y del tope, en cientos de pies sobre el nivel del mar.",
      },
      {
        kind: "fichas",
        columnas: 3,
        titulo: "Los tres patrones de eco",
        items: [
          {
            titulo: "Línea (LN)",
            puntos: [
              "Línea de ecos de al menos 30 km de largo.",
              "Al menos cuatro veces más larga que ancha.",
              "Con al menos un 25 % de cobertura dentro de la línea.",
            ],
          },
          {
            titulo: "Área (AREA)",
            puntos: ["Un grupo de ecos del mismo tipo que no llega a clasificarse como línea."],
          },
          {
            titulo: "Célula (CELL)",
            puntos: ["Un único eco convectivo aislado, como un chubasco."],
          },
        ],
      },
      {
        kind: "vinetas",
        items: [
          "El azimut va referido al norte verdadero y la distancia en millas náuticas desde el radar.",
          "Para líneas y áreas hay dos pares de azimut y distancia; para células, uno solo.",
          "El movimiento se codifica solo para células: no se codifica para líneas ni para áreas.",
          "El tope máximo de la precipitación va con «MT», o con «MTS» si además se usaron datos de satélite.",
          "Si aparece «AUTO», el informe está automatizado con datos de radar WSR-88D.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Y otra vez la misma advertencia",
        text: "El RAREP es especialmente valioso para planificar evitando zonas de tiempo severo. Pero sale del radar, así que arrastra su límite: bases y topes de nubes, techos y visibilidad no aparecen ahí. Un RAREP no sustituye a un METAR ni a un PIREP; los complementa.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué información aporta un PIREP que no se puede obtener de otra fuente?",
            respuesta:
              "Las condiciones que realmente existen en el aire: confirmación de techos y de topes de nubes, ubicación de cizalladura y turbulencia, y ubicación de engelamiento. Junto con la radiosonda es una de las dos únicas formas de observar el tiempo en altura, y es la única fuente en tiempo real de turbulencia, engelamiento y altura de nubes.",
            claves: ["Condiciones reales en el aire", "Turbulencia, engelamiento y altura de nubes", "Única en tiempo real"],
          },
          {
            nivel: "interpretacion",
            q: "¿Cuándo le van a pedir un PIREP, y cuándo debería mandarlo sin que se lo pidan?",
            respuesta:
              "Los controladores los solicitan cuando el techo está por debajo de 5.000 ft o la visibilidad es de cinco millas o menos. Y sin que lo pidan, siempre que encuentre condiciones inesperadas, porque ese informe se incorpora a la red y sirve para avisar a otros pilotos.",
            claves: ["Techo bajo 5.000 ft", "Visibilidad 5 millas o menos", "Condiciones inesperadas"],
          },
          {
            nivel: "situacion",
            q: "¿Qué NO le va a decir un informe de radar?",
            respuesta:
              "Bases y topes de nubes, techos y visibilidad. El radar solo detecta objetos lo bastante grandes como para considerarse precipitación, así que un eco limpio no significa cielo despejado ni condiciones VFR.",
            claves: ["Solo detecta precipitación", "No ve nubes, techos ni visibilidad"],
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
        kind: "hueco",
        rotulo: "MT-S17-01 · Diagrama anotado · 4:3 · 1600×1200 · SVG",
        descripcion:
          "Un modelo de estación grande, dibujado con todos sus campos, y llamadas numeradas alrededor explicando cada uno: forma del modelo, cobertura del cielo, símbolos de nubes arriba y abajo, flecha de viento con púas y banderín, presión en tres dígitos y tendencia. Al lado, una miniatura de carta de superficie con isobaras juntas y separadas rotuladas «viento fuerte» y «viento suave». Sustituye a la figura 12-13 del PHAK.",
        alto: 440,
        ratio: "4 / 3",
        anchoMax: 620,
        pie: "Todo lo que dice un solo punto de la carta.",
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
