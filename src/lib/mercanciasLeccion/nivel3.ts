/**
 * Nivel 3 · Situaciones del piloto: de la aceptación a la bodega, el NOTOC,
 * la emergencia en vuelo y la notificación.
 *
 * Artículos contrastados con el RAC 175 (Edición original, marzo 2016). Los
 * casos reales salen de los informes oficiales que cada uno cita. Los campos
 * del NOTOC están en la Parte 7 de las Instrucciones Técnicas, que no está
 * cargada: se enseñan los requisitos del 175.515 y las columnas habituales
 * con su aviso.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const NIVEL_3: DocScreen[] = [
  // ── 09 ──────────────────────────────────────────────────────────────────
  {
    n: 9,
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
