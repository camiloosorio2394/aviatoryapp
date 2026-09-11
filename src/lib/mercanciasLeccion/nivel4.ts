/**
 * Nivel 4 · Situaciones del piloto: de la aceptación a la bodega, el NOTOC,
 * la emergencia en vuelo y la notificación.
 *
 * Artículos contrastados con el RAC 175 (Edición original, marzo 2016). Los
 * casos reales salen de los informes oficiales que cada uno cita. Los campos
 * del NOTOC están en la Parte 7 de las Instrucciones Técnicas, que no está
 * cargada: se enseñan los requisitos del 175.515 y las columnas habituales
 * con su aviso.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const NIVEL_4: DocScreen[] = [
  // ── 13 ──────────────────────────────────────────────────────────────────
  {
    n: 13,
    title: "De la aceptación a la bodega",
    kicker: "South African 295 y la estiba",
    minutes: 8,
    blocks: [
      {
        kind: "casoReal",
        titulo: "South African Airways 295",
        fecha: "28 de noviembre de 1987",
        lugar: "Océano Índico, cerca de Mauricio",
        aeronave: "Boeing 747-244B Combi · ZS-SAS «Helderberg» · Taipéi a Mauricio",
        mercancia:
          "Carga en la cubierta principal de un avión combi, con pasajeros y carga en el mismo piso. El origen de la ignición nunca se determinó.",
        queOcurrio: [
          "En crucero nocturno la tripulación reportó humo. El incendio se originó en la posición delantera derecha del compartimento de carga de la cubierta principal, con material de embalaje de plástico y cartón involucrado. El humo llegó a la zona ocupada.",
          "La tripulación intentó combatir el fuego y desviarse a Mauricio. El avión cayó al mar. Murieron las 159 personas a bordo.",
        ],
        consecuencia:
          "La investigación no pudo determinar qué encendió el fuego. Sí mostró que en un compartimento de carga de clase B grande la extinción manual no funciona, que la detección era tardía, que el humo pasaba a la zona de pasajeros y que los extintores de mano no alcanzaban. La industria endureció los requisitos de los combi y de la accesibilidad de la carga en vuelo.",
        leccion:
          "Por qué existen las restricciones de estiba de los bultos «Exclusivamente en aeronaves de carga» y por qué el reglamento insiste en que se carguen de modo que un tripulante pueda verlos, manipularlos y separarlos en vuelo. Un bulto al que no se puede llegar es un bulto sobre el que no se puede hacer nada.",
        hueco: {
          id: "MP-IMG-04",
          medida: "16:9 · 1600×900 · JPG o WebP",
          descripcion:
            "Foto de referencia del 747 Combi ZS-SAS o de una cubierta principal de un combi con la red de separación entre carga y pasajeros. Con crédito.",
        },
      },
      {
        kind: "p",
        text: "Cuando un bulto llega a tu avión ya pasó por seis pasos. Ninguno es tuyo, pero todos existen para que tu firma sea sobre algo verdadero. Toca cada uno.",
      },
      {
        kind: "flujo",
        pista: "Elige un paso para leer qué exige.",
        pasos: [
          {
            clave: "doc",
            etiqueta: "1 · Documento",
            texto:
              "Ningún explotador acepta mercancías peligrosas si no van acompañadas de un documento de transporte debidamente diligenciado, salvo cuando las Instrucciones Técnicas indiquen que no se requiere. El documento va con la declaración firmada del expedidor.",
          },
          {
            clave: "insp",
            etiqueta: "2 · Inspección",
            texto:
              "No se acepta hasta haber inspeccionado el bulto, sobre-embalaje o contenedor de carga conforme a los procedimientos de aceptación de las Instrucciones Técnicas.",
          },
          {
            clave: "lista",
            etiqueta: "3 · Lista de verificación",
            texto:
              "El personal de aceptación usa una lista de verificación que incluye la inspección del bulto y de la documentación. El envío se acepta únicamente si se cumplieron todos los requisitos.",
          },
          {
            clave: "antes",
            etiqueta: "4 · Antes de estibar",
            texto:
              "Los bultos se inspeccionan para verificar pérdidas o averías antes de estibarlos en la bodega o de meterlos en un ULD. No se estiba ningún bulto ni ULD sin esa comprobación.",
          },
          {
            clave: "estiba",
            etiqueta: "5 · Estiba y sujeción",
            texto:
              "Se estiban en un área a la que solo tenga acceso la tripulación de vuelo o las personas autorizadas para acompañar el envío. El explotador las protege de averías y las sujeta de modo que no puedan inclinarse en vuelo ni cambiar la posición relativa de los bultos.",
          },
          {
            clave: "segr",
            etiqueta: "6 · Segregación",
            texto:
              "Los bultos capaces de reaccionar peligrosamente entre sí no se estiban juntos ni donde puedan entrar en contacto si hay pérdidas. Las Instrucciones Técnicas tienen una tabla de segregación general y otra para explosivos.",
          },
        ],
      },
      {
        kind: "norma",
        texto:
          "Salvo en los casos permitidos en este Reglamento y en las Instrucciones Técnicas, no se estibarán mercancías peligrosas en la cabina de ninguna aeronave ocupada por pasajeros ni tampoco en el puesto de pilotaje. No se estibarán en una aeronave ocupada por pasajeros los bultos de mercancías peligrosas que lleven la etiqueta «Exclusivamente en aeronaves de carga».",
      },
      {
        kind: "norma",
        texto:
          "A reserva de lo previsto en las Instrucciones Técnicas, los bultos de mercancías peligrosas que lleven la etiqueta «Exclusivamente en aeronaves de carga» se cargarán de modo tal que algún miembro de la tripulación o persona autorizada pueda verlos, manipularlos y, cuando su tamaño y peso lo permitan, separarlos en vuelo de las otras mercancías estibadas a bordo.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Tres prohibiciones de estiba que te preguntan",
        text: "Nada de mercancías peligrosas en la cabina de pasajeros ni en el puesto de pilotaje. Ningún bulto «Exclusivamente en aeronaves de carga» en un avión con pasajeros. Y en el carguero, esos bultos donde un tripulante pueda verlos, manipularlos y separarlos en vuelo. Las tres salen del Helderberg y de lo que vino después.",
      },
      {
        kind: "hueco",
        rotulo: "MP-DIA-01 · Diagrama · 16:9 · 1800×1000 · SVG",
        descripcion:
          "Corte lateral y planta de la bodega de un narrow-body: posiciones de ULD, bultos CAO accesibles, separación del material radiactivo respecto de personas, animales vivos y películas no reveladas, y un ejemplo de segregación entre incompatibles. Referencia visual; no sustituye la tabla de segregación.",
        alto: 320,
      },
      { kind: "sub", text: "Segregación: no sentar juntos a los que se pelean" },
      {
        kind: "p",
        text: "Hay clases que no pueden viajar juntas. Un comburente junto a un inflamable es el ejemplo clásico: el comburente no arde, pero si hay una fuga alimenta el fuego del otro. La segregación evita que una fuga ponga en contacto sustancias incompatibles.",
      },
      {
        kind: "norma",
        texto:
          "El explotador de aeronave se cerciorará que los bultos que contengan mercancías peligrosas capaces de reaccionar peligrosamente entre sí, no se estiben en una aeronave unos juntos a otros de tal manera que puedan entrar en contacto en caso de que se produzcan pérdidas.",
      },
      {
        kind: "kv",
        items: [
          { k: "Regla general", v: "La tabla de segregación de las Instrucciones Técnicas. La aplican el explotador y el operador de terminal de carga." },
          { k: "Explosivos", v: "Tienen su propia tabla. Si van con dispensa, se aplica la del Suplemento de las Instrucciones." },
          { k: "Radiactivo", v: "Separado de las personas, los animales vivos y las películas no reveladas. Y afianzado para mantener esa separación todo el vuelo." },
          { k: "4.1 y 5.2", v: "Las sustancias de reacción espontánea y los peróxidos orgánicos se cubren del sol y van en un lugar ventilado, lejos de toda fuente de calor." },
          { k: "Tóxicas e infecciosas", v: "Se estiban según las disposiciones de las Instrucciones Técnicas." },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Radiactivo: la aeronave contaminada sale de servicio",
        text: "Toda aeronave que quede contaminada por materiales radiactivos se retira inmediatamente de servicio y no se reintegra hasta que el nivel de radiación de toda superficie accesible y la contaminación transitoria estén por debajo de los valores de las Instrucciones.",
      },
      {
        kind: "enLaOperacion",
        momento: "En la rampa, al descargar",
        texto:
          "La inspección no termina al cerrar la bodega. Al descargar, los bultos se revisan otra vez; si hay pérdidas o averías, se inspecciona la zona donde iban para ver si hubo daño o contaminación. Un bulto averiado se descarga y el explotador comprueba que el resto del envío está bien y que ningún otro bulto quedó contaminado. Si en el turnaround te dicen «un bulto venía mojado», la pregunta es qué era y qué había al lado.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es la segregación y por qué existe?",
            respuesta:
              "Es mantener separadas las mercancías que son incompatibles entre sí, es decir, las que al mezclarse podrían generar calor peligrosamente, gases o una sustancia corrosiva. Se aplica a la estiba: hay una tabla en las Instrucciones Técnicas que dice qué clases no pueden ir juntas y a qué distancia. Existe porque una fuga de dos bultos que por separado son manejables puede dar una reacción que no lo es.",
            claves: ["Mercancías incompatibles", "Tabla de segregación de las Instrucciones", "Se aplica en la estiba"],
          },
          {
            nivel: "interpretacion",
            q: "Tú no estibas la carga. ¿Por qué te enseñan segregación?",
            respuesta:
              "Por dos razones. Una, porque la posición de cada mercancía aparece en la información que firmo, y si dos incompatibles figuran en la misma posición eso es una pregunta que tengo que hacer. Y dos, porque si hay una fuga en vuelo, saber qué había cerca de qué cambia lo que espero encontrar y lo que comunico en tierra.",
            claves: ["La posición está en el NOTOC", "Detectar incompatibles en la misma posición", "Cambia la respuesta en emergencia"],
          },
          {
            nivel: "situacion",
            q: "Un bulto llega dañado a la aceptación. ¿Qué debería pasar?",
            respuesta:
              "No se acepta. La inspección previa a la aceptación busca exactamente eso: que el bulto, el sobre-embalaje o el contenedor no tengan fugas ni daños. Y si el daño se descubre después, cuando ya está a bordo, deja de ser un problema de aceptación y pasa a ser un suceso: se aplica el procedimiento de emergencia y se notifica.",
            claves: ["No se acepta un bulto dañado", "La inspección es previa", "Si ya está a bordo, es un suceso"],
          },
        ],
      },
    ],
  },

  // ── 14 ──────────────────────────────────────────────────────────────────
  {
    n: 14,
    title: "El NOTOC",
    kicker: "La información al piloto al mando",
    minutes: 8,
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
      { kind: "sub", text: "Léelo tú antes de que te lo expliquen" },
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
      {
        kind: "piensaComoPiloto",
        momento: "Antes de firmar",
        situacion:
          "Ese es el papel que te acaban de pasar. Tienes treinta segundos antes de que el despachador se vaya.",
        pregunta: "¿Qué cuatro cosas miras, y qué te chirría?",
        claves: [
          "**Qué hay:** tres mercancías. Pintura y ácido sulfúrico en bodega delantera, baterías de litio en la trasera.",
          "**Dónde:** las dos primeras comparten ULD. Clase 3 y clase 8 juntas es una combinación que la tabla de segregación regula: es una pregunta legítima.",
          "**La marca CAO** bajo las baterías: ese bulto solo puede ir en aeronave de carga. Si este vuelo lleva pasajeros, ahí hay un problema serio.",
          "**Lo que chirría:** las baterías de litio traen columna GE vacía, correcto. Si trajeran «II», el documento estaría mal.",
          "Y falta lo más importante: **tu firma**. Sin ella la mercancía no se transporta.",
        ],
        cierre:
          "No hace falta ser experto en embalaje para leer eso. Hace falta saber qué columna es cuál y qué combinaciones no cuadran.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es el NOTOC y qué exige la norma sobre él?",
            respuesta:
              "Es la información escrita al piloto al mando sobre las mercancías peligrosas que van a bordo. La norma exige que el explotador se la proporcione por escrito y lo antes posible antes de la salida, que el piloto al mando la firme antes de que las mercancías se transporten, que esté a su alcance durante todo el vuelo, que esté a disposición del aeródromo de última salida y del de próxima llegada, que quede una copia en tierra y que en transporte internacional se use el inglés además de los idiomas del Estado de origen.",
            claves: ["Por escrito antes de la salida", "Firmado antes del transporte", "Al alcance en vuelo", "Copia en tierra", "Inglés en internacional"],
          },
          {
            nivel: "interpretacion",
            q: "¿Por qué tiene que estar al alcance del piloto durante el vuelo y no basta con haberlo leído?",
            respuesta:
              "Porque el momento en que hace falta es una emergencia, y en una emergencia nadie recuerda un número ONU ni una posición de bodega. Si hay humo o un olor, lo que quiero es poder decir por radio qué llevo, cuánto y dónde, y eso solo funciona si el papel está en la cabina y no en la oficina de despacho.",
            claves: ["Se usa en emergencia", "Qué, cuánto y dónde", "Se comunica a tierra"],
          },
          {
            nivel: "situacion",
            q: "En el NOTOC aparece una posición de bodega que en ese avión no existe. ¿Qué haces?",
            respuesta:
              "Lo pregunto antes de firmar. Puede ser una errata de transcripción o puede ser que el documento corresponda a otro vuelo o a otra matrícula. En cualquiera de los dos casos, el dato que usaría en una emergencia sería falso, y ese es justo el dato que no puede estar mal. Firmar un documento que sé que no cuadra es peor que no tenerlo.",
            claves: ["Preguntar antes de firmar", "El dato se usa en emergencia", "Puede ser de otro vuelo"],
          },
        ],
      },
    ],
  },

  // ── 15 ──────────────────────────────────────────────────────────────────
  {
    n: 15,
    title: "Emergencia en vuelo",
    kicker: "Asiana 991 y el orden de las decisiones",
    minutes: 8,
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
          "**Informar.** Pasar los datos de la mercancía a los servicios de emergencia y notificar el suceso (lección 16).",
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
      {
        kind: "escenario",
        titulo: "Olor químico y humo en crucero",
        situacion:
          "En crucero, la tripulación de cabina reporta olor químico y humo tenue procedente de la zona del galley trasero. El NOTOC declara un envío de la clase 8 en la bodega posterior y un envío de la división 6.1 en la bodega delantera. Decide qué miras primero, qué consultas, qué usas y a quién informas.",
        preguntas: [
          {
            q: "¿Qué hace la cabina de mando primero?",
            a: "Volar. Máscaras y oxígeno según el QRH de humo, control de la aeronave y de la ventilación. Solo después, identificar: el NOTOC ya está al alcance del comandante y dice que en la bodega posterior, la más cercana al galley trasero, va un envío de clase 8, corrosivo.",
          },
          {
            q: "¿Qué consultas para saber cómo responder?",
            a: "La información de respuesta de emergencia, que debe estar disponible de inmediato: la guía de la OACI (o el documento equivalente del explotador) con el código ERG que trae el NOTOC para ese envío.",
          },
          {
            q: "¿Qué hace la tripulación de cabina con lo que tiene?",
            a: "Lo que su procedimiento indique para humo de origen desconocido, y el equipo de respuesta si hay algo que contener: bolsas grandes de polietileno, ligaduras y guantes largos de goma como mínimo. Con un corrosivo, los guantes no son opcionales.",
          },
          {
            q: "¿A quién informa el comandante y cuándo?",
            a: "A la dependencia ATS, tan pronto la situación lo permita, para que esta informe a la administración aeroportuaria de la presencia de mercancías peligrosas a bordo. Con el desvío decidido, ese aviso es lo que hace que los bomberos lleguen sabiendo que hay un corrosivo.",
          },
          {
            q: "¿Qué pasa después de aterrizar?",
            a: "El explotador facilita sin dilación la información de las mercancías a los servicios de emergencia. Y es un incidente imputable a mercancías peligrosas: una ocurrencia relacionada con el transporte que vulneró la integridad de un embalaje o pudo poner en peligro a la aeronave. Se notifica.",
          },
        ],
        concepto: "El orden de las decisiones (volar, identificar, contener, declarar, desviar, informar) y las cuatro cosas que el reglamento exige que existan antes de que algo pase.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "FL330, 40 minutos de destino",
        situacion:
          "Salta la alarma de humo de la bodega delantera. Es la bodega donde, según el papel que firmaste, van dos bultos de clase 3 y uno de clase 8 en el mismo ULD. La tripulación de cabina no reporta nada raro arriba.",
        pregunta: "¿En qué orden haces las cosas?",
        claves: [
          "**Primero el avión.** Procedimiento de humo o incendio en bodega del fabricante, y descenso o desvío si el procedimiento lo pide. Nada de esto empieza consultando papeles.",
          "**Después el papel.** El NOTOC me dice qué hay, cuánto y en qué posición. Clase 3 en el ULD que arde cambia lo que espero: líquido inflamable.",
          "**Después tierra.** El piloto al mando informa a la dependencia de tránsito aéreo, y esa es la vía por la que el aeródromo prepara los medios. Doy qué llevo, cuánto y dónde.",
          "**Y la información de emergencia**, que tiene que estar disponible de inmediato: el código de intervención de la guía de la OACI me dice cómo se comporta esa mercancía.",
        ],
        cierre:
          "El orden importa: volar, luego identificar, luego comunicar. Invertirlo es el error clásico, y consume el único recurso que no se recupera, que es el tiempo.",
      },
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué equipo de respuesta de emergencia para mercancías peligrosas debe haber a bordo?",
            respuesta:
              "Como mínimo, bolsas grandes de polietileno, ligaduras para cerrarlas y guantes largos de goma. Es un equipo modesto a propósito: sirve para contener y aislar un derrame o un objeto caliente, no para apagar un incendio. Eso, con los extintores de mano y el procedimiento del explotador, es lo que hay hasta aterrizar.",
            claves: ["Bolsas de polietileno", "Ligaduras", "Guantes largos de goma"],
          },
          {
            nivel: "interpretacion",
            q: "¿A quién informa el piloto al mando de una emergencia con mercancías peligrosas y por qué a esa dependencia?",
            respuesta:
              "A la dependencia de servicios de tránsito aéreo. No porque el controlador vaya a resolver nada, sino porque es la vía más rápida para que el aeródromo de destino movilice a los bomberos y los servicios que hagan falta, y para que sepan qué van a encontrarse. La información que doy es la del NOTOC: qué mercancía, cuánta y dónde va.",
            claves: ["A la dependencia ATS", "Para que tierra prepare los medios", "Qué, cuánto y dónde"],
          },
          {
            nivel: "situacion",
            q: "Terminas el vuelo sin novedad, pero en el descenso notaste un olor químico que luego no se repitió. ¿Haces algo?",
            respuesta:
              "Sí, lo reporto. Puede no ser nada, pero también puede ser una fuga incipiente en un bulto, y eso es un incidente imputable a mercancías peligrosas: la norma incluye expresamente las fugas y cualquier manifestación de que se ha vulnerado la integridad de un embalaje. Además, si no pasó nada, sigue siendo el dato más útil que puede recibir el sistema de seguridad operacional: un fallo que todavía no ha costado nada.",
            claves: ["Se reporta aunque no haya consecuencias", "Incidente imputable", "Alimenta el SMS"],
          },
        ],
      },
    ],
  },

  // ── 16 ──────────────────────────────────────────────────────────────────
  {
    n: 16,
    title: "Notificar: qué, a quién y por qué",
    kicker: "Sucesos y SMS",
    minutes: 6,
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
      {
        kind: "entrevista",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué diferencia hay entre accidente, incidente e incumplimiento imputable a mercancías peligrosas?",
            respuesta:
              "El accidente ocasiona lesiones mortales o graves a alguna persona, o daños de consideración a los bienes o al medio ambiente. El incidente no llega a accidente pero produce lesiones, daños, incendio, ruptura, derrame, fuga o cualquier manifestación de que se ha vulnerado la integridad de un embalaje, y no tiene que ocurrir necesariamente a bordo. El incumplimiento es la ocurrencia atribuible al transporte que no llega a ninguno de los dos.",
            claves: ["Accidente: lesiones graves o mortales, daños de consideración", "Incidente: daño, fuga, integridad vulnerada", "Incumplimiento: sin ninguna de las dos"],
          },
          {
            nivel: "interpretacion",
            q: "¿Por qué se notifica algo que no causó ningún daño?",
            respuesta:
              "Porque es el dato más barato del sistema. Un incumplimiento es un fallo de la cadena que todavía no ha costado nada, y sirve para corregir antes de que cueste. Por eso el transporte de mercancías peligrosas está dentro del alcance del SMS del explotador y por eso las autoridades recopilan también lo que no llega a incidente: para trabajar de forma predictiva y proactiva en vez de reactiva.",
            claves: ["Fallo que aún no ha costado nada", "Entra en el SMS", "Predictivo y proactivo, no reactivo"],
          },
          {
            nivel: "situacion",
            q: "En destino, al descargar, aparece un bulto con una fuga que en vuelo nadie detectó. ¿Qué es y qué se hace?",
            respuesta:
              "Es un incidente imputable a mercancías peligrosas: hay una manifestación de que se ha vulnerado la integridad de un embalaje, aunque nadie se diera cuenta durante el vuelo y no haya lesionados. Se notifica a las autoridades que corresponda del Estado del explotador y del Estado donde ocurrió. Y, operacionalmente, hay que ver qué había cerca de ese bulto, porque una fuga junto a algo incompatible es otro problema distinto.",
            claves: ["Es un incidente, no un incumplimiento", "Se notifica a las dos autoridades", "Revisar qué había cerca"],
          },
        ],
      },
      {
        kind: "ponAPrueba",
        titulo: "Control del nivel 4",
        preguntas: [
          {
            q: "Durante la descarga se detecta una avería en un bulto con mercancías peligrosas. ¿Qué exige el reglamento además de retirarlo?",
            opciones: [
              {
                t: "Inspeccionar la zona en que iba estibado para averiguar si hay daños o contaminación, y eliminar sin demora toda contaminación peligrosa.",
                ok: true,
                fb: "La avería no se cierra retirando el bulto: hay que revisar la zona de estiba y descontaminar. El explotador comprueba además que el resto del envío está en condiciones y que no quedó contaminado ningún otro bulto.",
              },
              {
                t: "Solo anotarlo en la bitácora y continuar.",
                fb: "La norma impone acciones materiales: descargar, verificar el resto del envío, comprobar la contaminación de otros bultos y eliminar sin demora la contaminación peligrosa.",
              },
              {
                t: "Esperar instrucciones del expedidor.",
                fb: "La obligación de actuar es del explotador; el expedidor responde por la preparación del envío, no por la respuesta en plataforma.",
              },
            ],
          },
          {
            q: "En un carguero, ¿dónde va un bulto con la etiqueta «Exclusivamente en aeronaves de carga»?",
            opciones: [
              {
                t: "En cualquier posición: en carguero no hay restricción.",
                fb: "Sí la hay. Se cargan de modo que un tripulante o persona autorizada pueda verlos, manipularlos y, si su tamaño y peso lo permiten, separarlos en vuelo de las otras mercancías.",
              },
              {
                t: "Donde un tripulante pueda verlo, manipularlo y separarlo en vuelo.",
                ok: true,
                fb: "Es la lección del Helderberg: un bulto al que no se puede llegar es un bulto sobre el que no se puede hacer nada. La accesibilidad es la condición para que existan los CAO.",
              },
              {
                t: "Lo más lejos posible de la cabina de mando.",
                fb: "La distancia no es el criterio; el acceso sí. Un bulto CAO al fondo de la bodega inferior, inaccesible en vuelo, incumple el (d) y el (e).",
              },
            ],
          },
          {
            q: "Un agente quiere aceptar un envío de mercancías peligrosas «porque el expedidor es de confianza», sin documento de transporte. ¿Puede?",
            opciones: [
              {
                t: "Sí, si inspecciona bien el bulto.",
                fb: "La inspección es la segunda condición, no un sustituto de la primera. Sin documento de transporte debidamente diligenciado no se acepta, salvo que las Instrucciones digan que no se requiere.",
              },
              {
                t: "No: sin documento de transporte diligenciado y sin inspeccionar el bulto no se acepta.",
                ok: true,
                fb: "Las dos condiciones son acumulativas. Y el personal usa una lista de verificación para no saltarse ninguna.",
              },
              {
                t: "Sí, si el comandante lo autoriza.",
                fb: "El comandante no puede autorizar lo que la norma prohíbe al explotador. Un envío sin documento no debería llegar nunca a tu firma.",
              },
            ],
          },
          {
            q: "Se descubre que un vuelo transportó mercancías peligrosas sin que se hubiera proporcionado la información al piloto al mando. ¿Qué obligación nace?",
            opciones: [
              {
                t: "Notificar el suceso a las autoridades del Estado del explotador y del Estado de origen.",
                ok: true,
                fb: "El reglamento obliga a notificar todo suceso en el que se descubra que se transportaron mercancías peligrosas mal cargadas, segregadas, separadas o afianzadas, o respecto de las cuales no se proporcionó información al piloto al mando.",
              },
              {
                t: "Ninguna, si el vuelo terminó sin novedad.",
                fb: "La obligación de notificar no depende de que haya habido consecuencias: es el hallazgo lo que la activa.",
              },
              {
                t: "Solo registrarlo internamente en el SMS del explotador.",
                fb: "Se integra al SMS y además se notifica a las autoridades que correspondan.",
              },
            ],
          },
          {
            q: "¿Cuándo debe firmar el piloto al mando la información sobre mercancías peligrosas?",
            opciones: [
              {
                t: "Antes de que las mercancías sean transportadas.",
                ok: true,
                fb: "Es literal. Además la información debe estar a su alcance durante el vuelo y el explotador conserva copia en tierra.",
              },
              {
                t: "Al cierre de puertas.",
                fb: "No es el criterio de la norma. La información se proporciona lo antes posible antes de la salida y se firma antes del transporte.",
              },
              {
                t: "Al llegar al destino, junto con el resto de la documentación.",
                fb: "Sería demasiado tarde para cumplir su función: saber qué llevas y dónde antes de despegar.",
              },
            ],
          },
          {
            q: "Vuelas Bogotá a Madrid con mercancías peligrosas. ¿En qué idioma va la información al piloto al mando?",
            opciones: [
              {
                t: "Solo en el idioma que exija el Estado de origen.",
                fb: "El español va, pero no basta: en transporte internacional, además de los idiomas exigidos por el Estado de origen, debe utilizarse el inglés.",
              },
              {
                t: "En español y además en inglés.",
                ok: true,
                fb: "Es la misma regla que para las marcas: en transporte internacional, inglés además de los idiomas del Estado de origen.",
              },
              {
                t: "Solo en inglés, como toda la documentación internacional.",
                fb: "El inglés se añade a los idiomas exigidos por el Estado de origen, no los reemplaza.",
              },
            ],
          },
          {
            q: "¿Cuál es el contenido mínimo del equipo de respuesta de emergencia para mercancías peligrosas a bordo?",
            opciones: [
              {
                t: "Bolsas grandes de polietileno de buena calidad, ligaduras para las bolsas y guantes largos de goma.",
                ok: true,
                fb: "Es literal, y es dato de examen. El reglamento fija ese contenido como mínimo y exige instrucción a los tripulantes sobre su uso.",
              },
              {
                t: "Extintor de halón, máscara antihumo y guantes ignífugos.",
                fb: "Ese es equipamiento contra incendios exigido por otras partes de la reglamentación. El equipo de respuesta de mercancías peligrosas es de contención.",
              },
              {
                t: "La guía de respuesta de emergencia impresa y el NOTOC.",
                fb: "Esos son información, no equipo. El reglamento separa la información de respuesta del equipo.",
              },
            ],
          },
          {
            q: "Hay humo en cabina y sospechas de la carga peligrosa. ¿Qué va primero?",
            opciones: [
              {
                t: "Informar al ATC qué mercancía llevas.",
                fb: "Viene enseguida, pero después. El propio reglamento dice «tan pronto la situación lo permita»: primero se controla la aeronave.",
              },
              {
                t: "Volar la aeronave y gestionar el humo.",
                ok: true,
                fb: "Primero se vuela: control de la aeronave, oxígeno y máscaras, gestión del humo. Identificar con el NOTOC y avisar al ATS vienen inmediatamente después.",
              },
              {
                t: "Consultar el NOTOC para identificar la sustancia.",
                fb: "Es el segundo paso. Identificar sin haber asegurado el control de la aeronave es empezar por el final.",
              },
            ],
          },
          {
            q: "En la emergencia, ¿a quién informa el piloto al mando de que lleva mercancías peligrosas, y para qué?",
            opciones: [
              {
                t: "Al expedidor, para que confirme el contenido.",
                fb: "El expedidor no está en la cadena de respuesta en vuelo. La información ya está a bordo, en el NOTOC.",
              },
              {
                t: "A la dependencia ATS, para que esta informe a la administración aeroportuaria.",
                ok: true,
                fb: "Es la cadena que fija el reglamento: comandante → ATS → administración aeroportuaria. Así los bomberos saben qué van a encontrar antes de que el avión toque pista.",
              },
              {
                t: "Directamente a los bomberos del aeródromo de destino.",
                fb: "El comandante no tiene ese canal. Habla con el ATS, y el ATS con el aeródromo. Después del aterrizaje, es el explotador quien entrega la información a los servicios de emergencia.",
              },
            ],
          },
          {
            q: "Un pasajero es sorprendido en el filtro con un artículo de la clase 2 no permitido. ¿Quién notifica y a quién?",
            opciones: [
              {
                t: "El explotador notifica a las autoridades del Estado en el cual ocurrió; y las entidades distintas del explotador que descubren el hallazgo deberían cumplir los mismos requisitos.",
                ok: true,
                fb: "El reglamento obliga al explotador a notificar cuando se descubren mercancías no permitidas en el equipaje o en la persona, y extiende el deber a entidades como las autoridades aduaneras y los proveedores de inspección de seguridad.",
              },
              {
                t: "Nadie: como no llegó a bordo, no hubo suceso.",
                fb: "El descubrimiento de una mercancía peligrosa oculta es, por definición, un suceso con mercancías peligrosas.",
              },
              {
                t: "Solo la autoridad aeroportuaria, en su informe interno.",
                fb: "La obligación primaria recae en el explotador, y la norma extiende expresamente el deber de notificación a otras entidades.",
              },
            ],
          },
          {
            q: "Un bulto de mercancías peligrosas voló sin la segregación exigida. Nadie resultó afectado y nada se derramó. ¿Qué es?",
            opciones: [
              {
                t: "Nada: sin daño no hay suceso.",
                fb: "Sí hay suceso. Una ocurrencia atribuible al transporte que no produce incidente ni accidente es un incumplimiento imputable, y el reglamento obliga a notificar lo transportado sin segregar correctamente.",
              },
              {
                t: "Un incumplimiento imputable a mercancías peligrosas, que se notifica.",
                ok: true,
                fb: "Es el nivel más bajo de la escala y el que más datos aporta al sistema. Se notifica a las autoridades del Estado del explotador y del Estado de origen.",
              },
              {
                t: "Un incidente imputable.",
                fb: "El incidente exige una manifestación: lesiones, daños, incendio, fuga, o haber puesto en peligro a la aeronave. Sin nada de eso, es incumplimiento, y se notifica igual.",
              },
            ],
          },
          {
            q: "La autoridad recopila datos sobre eventos con mercancías peligrosas que no constituyen accidente ni incidente. ¿Para qué?",
            opciones: [
              {
                t: "Para alimentar los sistemas de recopilación y procesamiento de datos e implementar procesos predictivos y proactivos.",
                ok: true,
                fb: "Es la conexión directa entre mercancías peligrosas y el SMS: prevenir la ocurrencia de accidentes e incidentes con lo que el sistema aprende de lo que casi pasa.",
              },
              {
                t: "Para calcular sanciones.",
                fb: "El régimen sancionatorio existe, pero la finalidad declarada de esta recopilación es preventiva, no punitiva.",
              },
              {
                t: "Para publicar estadísticas ante la OACI.",
                fb: "La cooperación y el intercambio de información existen, pero el objeto de esta recopilación es el proceso predictivo y proactivo.",
              },
            ],
          }
        ],
      },
    ],
  },
]
