/**
 * Nivel 3 · Situaciones del piloto: de la aceptación a la bodega, el NOTOC,
 * la emergencia en vuelo y la notificación.
 *
 * La lección 9 se revisó con el caso oficial de la FAA sobre SAA 295 y con
 * las reglas ICAO de estiba y segregación. Las lecciones 10–12 se auditan por
 * separado antes de reescribirlas. Los campos del NOTOC requieren contraste
 * con las Instrucciones Técnicas vigentes y el formato del operador.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const NIVEL_3: DocScreen[] = [
  // ── 09 ──────────────────────────────────────────────────────────────────
  {
    n: 9,
    title: "De la aceptación a la bodega",
    kicker: "De la carga física a la información de vuelo",
    minutes: 9,
    blocks: [
      {
        kind: "casoReal",
        titulo: "South African Airways 295",
        fecha: "28 de noviembre de 1987",
        lugar: "Océano Índico, cerca de Mauricio",
        aeronave: "Boeing 747-200 · vuelo de Taipéi a Mauricio",
        mercancia:
          "En la cubierta principal había seis palés con artículos eléctricos (incluidos computadores), ferretería, papel, textiles y otros productos. Los pasajeros viajaban en otro sector de esa cubierta. No se determinó qué inició el incendio ni se identificó una mercancía peligrosa como su causa.",
        queOcurrio: [
          "Durante el vuelo se desarrolló un incendio en la zona de carga. El humo llegó a la zona de pasajeros y la tripulación lo comunicó al control de tránsito aéreo.",
          "La tripulación preparaba un aterrizaje de emergencia en Mauricio. El avión cayó al mar y murieron las 159 personas a bordo.",
        ],
        consecuencia:
          "La investigación señaló limitaciones de detección, contención del humo y lucha manual contra un incendio en un compartimento de carga tan grande. Las medidas posteriores se centraron en la protección contra incendios de esa configuración; no hay base para atribuirle el origen de todas las reglas actuales de estiba de mercancías peligrosas.",
        leccion:
          "La ubicación de la carga y las características de su compartimento importan durante el vuelo. El caso ayuda a comprender ese vínculo, no a deducir que el incendio se debió a una mercancía peligrosa identificada.",
      },
      {
        kind: "p",
        text: "Un bulto no se convierte en una línea del NOTOC por arte de magia. Antes de despegar, personal formado identifica el envío, lo acepta cuando corresponde, lo carga y registra dónde quedó. El piloto no repite esos controles: necesita entender la información operacional que resulta de ellos.",
      },
      {
        // MP-IMG-21 · Fotografía explicativa · 3:2 · 1200×800.
        kind: "figura",
        src: "/modulos/mercancias/img-21-carga-ubicacion.webp",
        alt: "Fotografía explicativa de una operación de carga comercial: cajas sobre una plataforma, un ULD sujeto y la entrada a la bodega. Tres flechas señalan los bultos cargados, el ULD y la posición de carga.",
        ancho: 1200,
        alto: 800,
        pie: "La caja, la unidad de carga y su posición son cosas distintas. El NOTOC relaciona la mercancía identificada con la ubicación informada al piloto; esta escena ilustra la cadena, no un envío reglamentario concreto.",
      },
      { kind: "sub", text: "Quién comprueba el envío y qué llega al piloto" },
      {
        kind: "p",
        text: "El expedidor identifica la mercancía y prepara el bulto y su documentación según el régimen aplicable. El personal de aceptación comprueba el envío con los procedimientos del operador; después, el equipo de carga revisa su estado, lo protege frente a daños y movimiento y deja constancia de su ubicación. Los documentos y comprobaciones no son tareas del piloto.",
      },
      {
        kind: "p",
        text: "Lo importante para la tripulación es que los datos no queden separados de la realidad física. Si se informa que dos bultos van en una unidad de carga, debe existir una ubicación que permita reconocer dónde quedaron. Esa relación entre mercancía, riesgo y posición es la que leerás en la siguiente lección.",
      },
      {
        // MP-DIA-05 · Secuencia visual · 16:9 · 1600×900.
        kind: "figura",
        src: "/modulos/mercancias/dia-05-del-bulto-al-piloto.svg",
        alt: "Secuencia visual de tres momentos: identificar y aceptar el envío, cargarlo y registrar su posición, e informar al piloto mediante el NOTOC. El piloto interpreta la información; no realiza los controles de tierra.",
        ancho: 1600,
        alto: 900,
        pie: "El piloto recibe el resultado operacional de la cadena. No certifica la clasificación, el embalaje ni la aceptación del envío por el hecho de recibir la información.",
      },
      { kind: "sub", text: "Estibar no es solo acomodar" },
      {
        kind: "p",
        text: "La carga se sujeta para que no cambie de posición ni dañe otros bultos durante el vuelo. También se respetan las condiciones de estiba que correspondan a cada mercancía y a la aeronave. Una unidad de carga (ULD) reúne bultos, pero no reemplaza la identificación de la mercancía ni la información de dónde quedó cargada.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "La etiqueta «Exclusivamente en aeronaves de carga»",
        text: "Ese bulto no puede ir como carga en un avión de pasajeros. En una aeronave de carga, su posición debe cumplir las condiciones aplicables; la etiqueta no garantiza que sea accesible desde la cabina. Si ves una discrepancia, aclárala antes de salir.",
      },
      { kind: "sub", text: "Segregación: evitar que una fuga conecte dos riesgos" },
      {
        kind: "p",
        text: "Segregar significa mantener separados los bultos que podrían reaccionar peligrosamente si sus contenidos entraran en contacto. La pregunta no es si dos clases pueden viajar en el mismo avión, sino si su ubicación permitiría esa interacción en caso de una pérdida. El personal de carga aplica las reglas de compatibilidad y separación del envío concreto; el piloto necesita entender por qué su ubicación importa.",
      },
      {
        // MP-DIA-06 · Comparación conceptual · 16:9 · 1600×900.
        kind: "figura",
        src: "/modulos/mercancias/dia-06-segregacion-conceptual.svg",
        alt: "Comparación de dos estibas: a la izquierda una pérdida puede alcanzar otro bulto; a la derecha la separación impide el contacto. No se indican clases concretas ni distancias normativas.",
        ancho: 1600,
        alto: 900,
        pie: "La comparación explica el propósito de la segregación. No permite decidir por sí sola qué mercancías deben separarse ni qué distancia utilizar.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "La pregunta útil para la tripulación",
        text: "Si la ubicación informada no coincide con la carga, o aparece un bulto dañado, aclara la discrepancia con el personal responsable antes de salir. No recalcules la segregación en cabina. En vuelo, la mercancía y su posición ayudan a interpretar una anomalía junto con la información de emergencia aplicable.",
      },
      {
        kind: "enLaOperacion",
        momento: "Si se detecta una pérdida al descargar",
        texto:
          "Una pérdida no afecta únicamente al bulto averiado: también puede alcanzar otras cargas o la aeronave. El personal responsable inspecciona el área y gestiona la contaminación según la mercancía. Para el piloto, el dato operacional es qué se transportó y dónde estuvo, especialmente si la anomalía se descubre antes de otro vuelo.",
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Consultar los requisitos de estiba y segregación",
        bloques: [
          {
            kind: "p",
            text: "La explicación visual anterior muestra el propósito de las reglas, no una tabla de compatibilidad ni una autorización de carga. La aplicación concreta depende de las Instrucciones Técnicas vigentes y de los procedimientos del explotador.",
          },
          {
            kind: "norma",
            texto: "Salvo en los casos permitidos en las Instrucciones Técnicas, las mercancías peligrosas no se estiban en una cabina ocupada por pasajeros ni en el puesto de pilotaje. Los bultos con la etiqueta «Exclusivamente en aeronaves de carga» no se estiban en una aeronave ocupada por pasajeros.",
          },
          {
            kind: "norma",
            texto: "Los bultos que puedan reaccionar peligrosamente entre sí no se estiban juntos ni en una posición que permita su contacto si se producen pérdidas. Las condiciones de estiba de bultos «Exclusivamente en aeronaves de carga» y los casos especiales se consultan en las Instrucciones Técnicas.",
          },
        ],
      },
    ],
  },

  // ── 10 ──────────────────────────────────────────────────────────────────
  {
    n: 10,
    title: "El NOTOC",
    kicker: "La información al piloto al mando",
    minutes: 7,
    blocks: [
      {
        kind: "p",
        text: "El comandante no clasifica ni embala. Pero responde por la operación segura del vuelo, y para eso el reglamento le exige al explotador entregarle, por escrito y antes de la salida, qué mercancías peligrosas lleva y dónde. Ese papel es el que la operación llama NOTOC, Notification to Captain. Es la sección que más rinde en entrevista: casi todas las preguntas del tema terminan aquí.",
      },
      {
        kind: "norma",
        texto:
          "Salvo en los casos en que las Instrucciones Técnicas indiquen lo contrario, el explotador de toda aeronave en la cual haya que transportar mercancías peligrosas, deberá proporcionar al piloto al mando, lo antes posible antes de la salida de la aeronave y por escrito, la información prevista en las Instrucciones Técnicas.",
      },
      { kind: "p", text: "Siete requisitos salen de ese texto y de lo que le sigue en el reglamento. Toca cada uno." },
      {
        kind: "flujo",
        pista: "Elige un requisito para leer el texto del reglamento.",
        pasos: [
          {
            clave: "momento",
            etiqueta: "Momento",
            texto: "Lo antes posible antes de la salida de la aeronave. No al cerrar puertas, no en crucero.",
          },
          {
            clave: "forma",
            etiqueta: "Forma",
            texto: "Por escrito. La información no puede ser verbal. El contenido concreto lo fijan las Instrucciones Técnicas.",
          },
          {
            clave: "firma",
            etiqueta: "Firma",
            texto:
              "«La información por escrito sobre las mercancías peligrosas embarcadas en un vuelo deberá ser firmada por el piloto al mando antes que sean transportadas.» La firma es previa al transporte, no posterior al despegue.",
          },
          {
            clave: "vuelo",
            etiqueta: "En vuelo",
            texto:
              "«La información prevista deberá estar al alcance del piloto al mando de la aeronave durante el vuelo.» Es lo que te permite responder al ATS y a los servicios de emergencia si algo ocurre.",
          },
          {
            clave: "tierra",
            etiqueta: "En tierra",
            texto:
              "A disposición del aeródromo de la última salida y del de la próxima llegada prevista, para cada vuelo en el que se transporten mercancías peligrosas.",
          },
          {
            clave: "copia",
            etiqueta: "Copia",
            texto:
              "El explotador conserva en tierra, para fines de control, una copia de cada información firmada por el piloto al mando de cada vuelo despachado con mercancías peligrosas.",
          },
          {
            clave: "idioma",
            etiqueta: "Idioma",
            texto:
              "«En el transporte internacional, en la información de mercancías peligrosas al piloto al mando, además de los idiomas exigidos por el Estado de origen, deberá utilizarse el inglés.» La misma regla aplica a las marcas.",
          },
        ],
      },
      {
        kind: "definicion",
        text: "La frase que suma puntos en una entrevista: «El comandante es la última barrera del sistema. La mercancía ya fue clasificada, embalada y documentada, pero yo verifico el NOTOC, decido si acepto el vuelo y gestiono cualquier emergencia».",
      },
      { kind: "sub", text: "Qué revisas antes de firmar" },
      {
        kind: "vinetas",
        items: [
          "**Documentos a bordo**: NOTOC y declaración del expedidor, presentes y firmados. La declaración es la fuente; el NOTOC se arma a partir de ella.",
          "**Clase y aeronave**: a qué clase pertenece cada envío y si está permitido en ese tipo de aeronave. Ningún CAO en un vuelo con pasajeros; nada en cabina ni en el puesto de pilotaje.",
          "**Coherencia de datos**: que el UN, la designación, la clase, el grupo de embalaje y la cantidad coincidan entre la declaración, el NOTOC y la lista. Un grupo de embalaje junto a un UN de litio, o junto a un gas, es una alarma.",
          "**Posición y segregación**: dónde va cada bulto y qué tiene al lado.",
        ],
      },
      { kind: "sub", text: "El NOTOC, columna por columna" },
      {
        kind: "p",
        text: "El formato es horizontal y cada explotador usa el suyo, pero el bloque de mercancías peligrosas trae en general estas columnas. Los campos concretos los fija una parte de las Instrucciones Técnicas que no está cargada en el proyecto: esto es lo que vas a encontrar en la práctica.",
      },
      {
        kind: "kv",
        items: [
          { k: "Station of Unloading", v: "Aeropuerto de descarga." },
          { k: "AWB No.", v: "Número de guía aérea (Air Waybill)." },
          { k: "No. of Packages", v: "Número de bultos." },
          { k: "Proper Shipping Name", v: "La designación oficial de transporte." },
          { k: "Class / Division", v: "Clase y división de riesgo." },
          { k: "UN Number", v: "El número ONU de la sustancia." },
          { k: "Subsidiary Hazard", v: "Los riesgos secundarios, si los hay." },
          { k: "Net Quantity", v: "Cantidad neta por bulto, si no es radiactivo." },
          { k: "Transport Index", v: "El índice de transporte, si es material radiactivo." },
          { k: "Packing Group", v: "Grupo de embalaje: I, II o III." },
          { k: "Loading position", v: "La posición de estiba a bordo." },
          { k: "ERG code", v: "El código de la guía de respuesta de emergencia." },
        ],
      },
      {
        kind: "hueco",
        rotulo: "MP-IMG-02 · Imagen real · 4:3 · 2000×1500 · JPG o WebP",
        descripcion:
          "Un NOTOC diligenciado y anotado por campo, con permiso del explotador y anonimizado (matrícula, número de vuelo, nombres). Con el aviso: «Documento de estudio; datos operacionales no vigentes».",
        alto: 360,
      },
      {
        kind: "callout",
        tone: "info",
        title: "El bloque de carga especial",
        text: "El NOTOC suele traer además un bloque de **Special Cargo** que no es mercancía peligrosa pero también requiere aviso al comandante: animales vivos, restos humanos o carga con requisitos particulares. Lo firma el agente de rampa y también lo lees.",
      },
      {
        kind: "fichas",
        columnas: 3,
        items: [
          {
            titulo: "«Firmo el NOTOC en crucero, cuando hay tiempo»",
            puntos: ["La información se firma antes de que las mercancías sean transportadas. Firmar después no cumple la norma."],
          },
          {
            titulo: "«El NOTOC se queda con el despachador»",
            puntos: ["Debe estar al alcance del piloto al mando durante el vuelo, y además a disposición del aeródromo de última salida y del de próxima llegada."],
          },
          {
            titulo: "«Si el vuelo es internacional, basta con el idioma del Estado de origen»",
            puntos: ["En transporte internacional debe utilizarse además el inglés, tanto en la información al piloto al mando como en las marcas y los documentos."],
          },
        ],
      },
      {
        kind: "enLaOperacion",
        momento: "En el briefing",
        texto:
          "El NOTOC dice UN 1263, clase 3, grupo II, dos bultos en la bodega trasera. La declaración del expedidor dice grupo III. No firmas: preguntas. Si la discrepancia no se resuelve, el envío no sale. Y si alguien descubre después del vuelo que se transportaron mercancías sin información al piloto al mando, eso es un suceso que se notifica.",
      },
      { kind: "sub", text: "Cómo se ve en la práctica" },
      {
        kind: "callout",
        tone: "info",
        title: "Escenario de práctica",
        text: "Lo que sigue **no es un documento real**: es un NOTOC de ejemplo construido para este curso, con el formato y los campos que vas a encontrar. Los datos operacionales son inventados.",
      },
      {
        kind: "code",
        tabular: true,
        text: `NOTIFICATION TO CAPTAIN          FLT AV0000 / 00MMM / HK-XXXX
STA: SKBO   DEST: SBGR   CPT: ______________________

POS  UN     PROPER SHIPPING NAME        CL  GE  PKG  ULD
---  -----  --------------------------  --  --  ---  ------------
1FL  1263   PAINT                       3   II   2   AKE 12345 AV
1FL  1830   SULPHURIC ACID              8   II   1   AKE 12345 AV
5AR  3480   LITHIUM ION BATTERIES       9   --   4   PMC 67890 AV
                                             CAO

DRILL CODE: 3L / 8L / 9FZ        EMERGENCY RESPONSE: DOC 9481`,
      },
    ],
  },

  // ── 11 ──────────────────────────────────────────────────────────────────
  {
    n: 11,
    title: "Emergencia en vuelo",
    kicker: "Asiana 991 y el orden de las decisiones",
    minutes: 5,
    blocks: [
      {
        kind: "casoReal",
        titulo: "Asiana Cargo 991",
        fecha: "28 de julio de 2011",
        lugar: "Mar de China Oriental, cerca de la isla de Jeju",
        aeronave: "Boeing 747-48EF · HL7604 · Incheon a Shanghái",
        mercancia:
          "Unos 400 kg de mercancías peligrosas, entre ellas baterías de litio, pinturas y líquidos fotorresistentes, en paletas de la parte trasera del fuselaje.",
        queOcurrio: [
          "Menos de una hora después del despegue la tripulación recibió la alarma de incendio en la bodega de carga. Declaró emergencia e intentó desviarse a Jeju.",
          "El fuego avanzó más rápido que el descenso. La tripulación perdió el control y el avión cayó al mar. Murieron los dos pilotos.",
        ],
        consecuencia:
          "La ARAIB de Corea concluyó que el fuego se inició en o cerca de una de las paletas que contenían mercancías peligrosas en el fuselaje trasero. La causa exacta no se pudo determinar porque los registradores de vuelo se perdieron.",
        leccion:
          "La segregación y la posición de estiba no son burocracia: el fuego empieza en un sitio concreto. Y cuando la respuesta tiene que darse en minutos, lo que cuenta es lo que la tripulación ya sabía y ya tenía a mano: la información de emergencia disponible de inmediato, la tripulación al corriente de las medidas y el equipo a bordo.",
        hueco: {
          id: "MP-IMG-05",
          medida: "16:9 · 1600×900 · JPG o WebP",
          descripcion: "Foto de referencia del 747-400F de Asiana Cargo o de una paleta con mercancías peligrosas etiquetadas. Con crédito.",
        },
      },
      {
        kind: "p",
        text: "La respuesta exacta está en el QRH y en la guía de respuesta a emergencias de tu explotador. Lo que sigue es lo que el reglamento exige que exista antes, durante y después, y el orden de las decisiones, que es lo que se pregunta en entrevista y lo que hay que tener claro antes de necesitarlo.",
      },
      {
        kind: "norma",
        texto:
          "El explotador debe asegurar que para envíos con respecto a los cuales las Instrucciones Técnicas requieren un documento de transporte de mercancías peligrosas, se disponga en todo momento y de inmediato de la información apropiada para utilizar en la respuesta de emergencia en caso de accidentes e incidentes relacionados con mercancías peligrosas transportadas por vía aérea. (1) Esta información debe estar a disposición del piloto al mando y puede obtenerse del Documento OACI 9481, Orientación sobre respuesta de emergencia para afrontar incidentes aéreos relacionados con mercancías peligrosas. (2) Los tripulantes de la aeronave deberán estar al corriente de las medidas que haya que tomar en caso de emergencia.",
      },
      {
        kind: "flujo",
        pista: "Elige un momento para leer qué exige la norma.",
        pasos: [
          {
            clave: "info",
            etiqueta: "Antes · Información",
            texto:
              "La información de respuesta de emergencia existe y está disponible de inmediato para el piloto al mando. La fuente que nombra el reglamento es la guía de la OACI para estas emergencias, cuyo código ERG aparece en el NOTOC.",
          },
          {
            clave: "trip",
            etiqueta: "Antes · Tripulación",
            texto:
              "Los tripulantes están al corriente de las medidas que hay que tomar. El explotador las pone en su manual de operaciones.",
          },
          {
            clave: "equipo",
            etiqueta: "Antes · Equipo",
            texto:
              "El equipo de respuesta de emergencia para mercancías peligrosas va a bordo, con instrucción a los tripulantes sobre su uso. Contenido mínimo: bolsas grandes de polietileno de buena calidad, ligaduras para las bolsas y guantes largos de goma.",
          },
          {
            clave: "ats",
            etiqueta: "Durante · ATS",
            texto:
              "De presentarse en vuelo una emergencia, el piloto al mando informa a la dependencia de los servicios de tránsito aéreo, tan pronto la situación lo permita, para que esta informe a la administración aeroportuaria de la presencia de mercancías peligrosas a bordo.",
          },
          {
            clave: "despues",
            etiqueta: "Después · Servicios de emergencia",
            texto:
              "En accidente o incidente grave, el explotador facilita sin dilación al personal de emergencia la información de las mercancías a bordo, conforme a lo proporcionado por escrito al piloto al mando. En incidente, a los servicios de emergencia y a las autoridades del Estado donde ocurrió, si lo piden.",
          },
        ],
      },
      { kind: "sub", text: "El orden de las decisiones" },
      {
        kind: "secuencia",
        numerada: true,
        orientacion: "vertical",
        items: [
          "**Volar primero.** Control de la aeronave, oxígeno y máscaras, gestión del humo. El orden de prioridades del vuelo no cambia por llevar mercancías peligrosas.",
          "**Identificar.** El NOTOC dice qué sustancia es, de qué clase y dónde está. Por eso va al alcance del comandante durante el vuelo.",
          "**Contener.** Aplicar el QRH: fuego y humo, ventilación, y el equipo de respuesta para aislar lo que se pueda.",
          "**Declarar.** MAYDAY o PAN PAN, e informar al ATS qué mercancía peligrosa hay a bordo, tan pronto la situación lo permita.",
          "**Desviar.** Al aeródromo adecuado más cercano. Con un incendio a bordo, el tiempo es la variable.",
          "**Informar.** Pasar los datos de la mercancía a los servicios de emergencia y notificar el suceso (lección 12).",
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Una forma de recordarlo",
        text: "Volar, identificar, contener, declarar, desviar, informar. Primero se vuela; el NOTOC es la fuente de información inmediata para todo lo demás.",
      },
      {
        kind: "p",
        text: "Informar la naturaleza de la mercancía cambia lo que encuentra el avión en tierra: qué agente extintor traen los bomberos, con qué protección se acercan y cómo evacúan. Un aviso tardío convierte una emergencia gestionable en una que se gestiona a ciegas. Por eso el reglamento dice «tan pronto la situación lo permita» y no «de inmediato»: reconoce que primero se controla la aeronave, pero no admite que la información no llegue.",
      },
      {
        kind: "hueco",
        rotulo: "MP-FLJ-03 · Flujograma · 16:9 · 2000×1125 · SVG",
        descripcion:
          "Dos carriles, cabina de mando y cabina de pasajeros, con los hitos: identificación del bulto o dispositivo, consulta del NOTOC y de la guía de respuesta de emergencia, uso del equipo de respuesta, notificación al ATS, coordinación con el aeródromo de destino y entrega de información a los servicios de emergencia.",
        alto: 320,
      },
    ],
  },

  // ── 12 ──────────────────────────────────────────────────────────────────
  {
    n: 12,
    title: "Notificar: qué, a quién y por qué",
    kicker: "Sucesos y SMS",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "Lo que pasó se notifica, aunque haya terminado bien. Y también lo que no pasó: el hallazgo de una mercancía no declarada, mal declarada o no permitida es un suceso, con o sin consecuencias. Ese reporte es el que hace que el sistema encuentre al expedidor que no declaró, y es la parte que más se olvida.",
      },
      {
        kind: "table",
        head: ["Qué ocurre", "A quién se notifica", "Tipo"],
        rows: [
          ["Accidente o incidente relacionado con mercancías peligrosas", "Autoridades del Estado del explotador y del Estado donde ocurrió", "Daño o peligro"],
          ["Se descubren en la carga o el correo mercancías no declaradas o mal declaradas", "Autoridades del Estado del explotador y del Estado donde ocurrió", "Hallazgo en carga"],
          ["Se descubren mercancías no permitidas en el equipaje o en la persona de pasajeros o tripulantes", "Autoridades del Estado donde ocurrió", "Hallazgo en equipaje"],
          ["Se transportaron mercancías mal cargadas, segregadas, separadas o afianzadas, o sin información al piloto al mando", "Autoridades del Estado del explotador y del Estado de origen", "Fallo de estiba o de NOTOC"],
          ["Entidades distintas del explotador que poseen mercancías al ocurrir un accidente o incidente", "Los mismos que el explotador", "Daño o peligro (terceros)"],
          ["Entidades distintas del explotador que descubren mercancías no declaradas o mal declaradas (aduanas, inspección de seguridad)", "Los mismos que el explotador", "Hallazgo (terceros)"],
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "¿A quién se notifica?",
        text: "A las autoridades que corresponda del Estado del explotador y del Estado donde ocurrió el suceso. En un vuelo internacional pueden ser dos autoridades distintas, y las dos esperan el aviso. Los plazos y el formulario los fija cada una: búscalos en el manual de tu explotador antes de necesitarlos, no el día del suceso.",
      },
      { kind: "sub", text: "Los tres niveles de suceso" },
      {
        kind: "fichas",
        columnas: 3,
        items: [
          {
            titulo: "Accidente imputable",
            puntos: [
              "Suceso atribuible al transporte aéreo de mercancías peligrosas o relacionado con él.",
              "Ocasiona lesiones mortales o graves a alguna persona, o daños de consideración a los bienes o al medio ambiente.",
            ],
          },
          {
            titulo: "Incidente imputable",
            puntos: [
              "Ocurrencia atribuible al transporte y relacionada con él que no constituye accidente. No tiene que producirse a bordo.",
              "Ocasiona lesiones, daños, incendio, ruptura, derramamiento, fugas, radiación o cualquier manifestación de que se vulneró un embalaje.",
              "También, toda ocurrencia que pueda haber puesto en peligro a la aeronave o a sus ocupantes.",
            ],
          },
          {
            titulo: "Incumplimiento imputable",
            puntos: [
              "Ocurrencia atribuible al transporte de mercancías peligrosas que no tiene como resultado un incidente ni un accidente.",
              "El nivel más bajo de la escala, y el que más datos aporta al sistema.",
            ],
          },
        ],
      },
      {
        kind: "definicion",
        text: "Suceso con mercancías peligrosas: cualquier ocurrencia de incumplimiento, incidente o accidente imputable a mercancías peligrosas, incluyendo el descubrimiento de una mercancía peligrosa oculta. Los tres niveles más el hallazgo.",
      },
      {
        kind: "norma",
        texto:
          "Las Organizaciones Aeronáuticas deben integrar los programas de manejo de mercancías peligrosas a sus propios sistemas de gestión, SMS, con el fin de mantener en esta área los niveles aceptables de seguridad que prevengan la ocurrencia de accidentes e incidentes.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Por qué esto es SMS y no papeleo",
        text: "El transporte de mercancías peligrosas entra en el alcance del SMS del explotador: no es un trámite aparte, es parte del sistema con el que la empresa gestiona su seguridad. Y las autoridades recopilan además los incumplimientos que no llegan a incidente ni accidente, para trabajar de forma predictiva y proactiva. Un incumplimiento reportado hoy es el accidente que no ocurre el año que viene.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Consecuencia del incumplimiento",
        text: "El incumplimiento da lugar a acciones administrativas, sin perjuicio de las penales, conforme a la legislación de cada país. Qué norma sanciona y con cuánto cambia según el Estado: en Colombia es el RAC 13, Régimen Sancionatorio. Y alcanza también al caso en que otro Estado notifica la infracción de un explotador extranjero, o el envío llega sin cumplir las Instrucciones.",
      },
      {
        kind: "enLaOperacion",
        momento: "Después del vuelo",
        texto:
          "Se notifica todo suceso o accidente con mercancías peligrosas, y también el hallazgo de mercancías no declaradas o mal declaradas, aunque no haya pasado nada. Si en el turnaround aparece una batería suelta en una maleta facturada, si un bulto llegó mojado, si el NOTOC no traía un envío que sí iba: los tres se reportan por el canal de tu explotador. Primero se vuela; después, lo que pasó se cuenta.",
      },
      {
        kind: "hueco",
        rotulo: "MP-DIA-03 · Diagrama · 16:9 · 1600×900 · SVG",
        descripcion:
          "Los cuatro niveles de suceso como una escalera ascendente: incumplimiento (sin daño), incidente (daño, fuga, lesión), accidente (lesiones graves o mortales, daños de consideración) y, cruzando los tres, el descubrimiento de una mercancía oculta. La flecha del valor para el SMS apunta al revés que la de la gravedad: el escalón más bajo es el que más enseña.",
        alto: 300,
      },
    ],
  },
]
