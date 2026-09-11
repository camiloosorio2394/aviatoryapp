/**
 * La entrevista de aerolínea que cierra cada nivel de Mercancías peligrosas:
 * quince preguntas por nivel, como las hace el evaluador en la entrevista
 * técnica, con la respuesta esperada y lo que había que mencionar.
 *
 * Antes iban repartidas en cada lección, dos o tres al final. Camilo pidió
 * juntarlas al cierre de cada nivel para que la sección no se repitiera
 * dieciocho veces. Las que ya existían se conservaron (estaban verificadas)
 * y se completaron hasta quince con lo que las aerolíneas de la región
 * preguntan de verdad: qué es el NOTOC, qué haces con humo en bodega, qué
 * puede llevar un pasajero.
 *
 * Sin citas, como el resto del módulo: cada respuesta se comprobó contra las
 * lecciones y el LAR 175, y donde una cifra depende de la edición vigente de
 * las Instrucciones Técnicas, la respuesta lo dice.
 *
 * Se pintan en el lector (EntrevistaNivel.tsx) entre la última lección del
 * nivel y la primera del siguiente. No son lecciones: no cuentan para el
 * progreso ni para el logro de lectura.
 */

import type { LectorEntrevista } from "@/components/lesson/EntrevistaNivel"

export const MP_ENTREVISTAS: LectorEntrevista[] = [
  {
    nivel: 1,
    titulo: "Introducción",
    tras: 4,
    minutes: 12,
    preguntas: [
    {
      nivel: "concepto",
      q: "¿Qué son las mercancías peligrosas?",
      respuesta:
        "Todo objeto o sustancia que pueda constituir un riesgo para la salud, la seguridad, los bienes o el medio ambiente y que figure en la lista de mercancías peligrosas de las Instrucciones Técnicas o esté clasificado conforme a ellas. Son dos mitades: el **riesgo** y estar en la lista o ser clasificable. Un artículo no es mercancía peligrosa porque lo parezca, sino porque encaja en los criterios de clasificación de las Instrucciones.",
      claves: ["Constituye un riesgo", "Lista o clasificable", "Instrucciones Técnicas"],
    },
    {
      nivel: "interpretacion",
      q: "Si el expedidor no declara un envío como mercancía peligrosa, ¿deja de serlo?",
      respuesta:
        "No. Lo que clasifica es lo que la sustancia es y lo que puede hacer, no lo que dice el papel. Si va sin declarar sigue siendo mercancía peligrosa y además pasa a ser una **mercancía peligrosa oculta**: carga declarada con una descripción general que debió declararse como peligrosa. Descubrirla es un suceso con mercancías peligrosas, y el explotador tiene que notificarlo a la autoridad.",
      claves: ["No cambia la naturaleza", "Mercancía peligrosa oculta", "Suceso notificable"],
    },
    {
      nivel: "situacion",
      q: "¿Qué te enseña a ti, como piloto, el accidente de ValuJet 592?",
      respuesta:
        "Que la cadena tiene varios eslabones y que el último es la firma del comandante. Los generadores químicos de oxígeno iban mal clasificados, mal embalados, sin las tapas de seguridad y declarados como material de la compañía marcado «vacío», en una bodega de clase D que no avisaba de un incendio. Ninguno de esos errores era mío, pero el avión era mío. Por eso la información que firmo antes de salir no es un trámite: es el único punto donde la cadena todavía se puede parar.",
      claves: ["Cadena de eslabones", "La firma es un control", "COMAT no exime"],
    },
    {
      nivel: "interpretacion",
      q: "Tu aerolínea solo vuela rutas nacionales. ¿Te aplican las Instrucciones Técnicas de la OACI?",
      respuesta:
        "Sí. La obligación viene en cuatro capas: el Anexo 18 del Convenio de Chicago, las Instrucciones Técnicas que lo detallan, el LAR 175 que armoniza la región y el reglamento de cada país, que adopta las Instrucciones y las hace exigibles. Ese reglamento aplica a cualquier aeronave civil con origen, destino, tránsito o sobrevuelo en el territorio nacional, sin distinguir vuelo interno de internacional. En Colombia, además, el reglamento lo dice expresamente: matrícula y operador nacional o extranjero, por igual.",
      claves: ["Anexo 18 e Instrucciones Técnicas", "LAR 175 y reglamento nacional", "Vuelos internos e internacionales"],
    },
    {
      nivel: "concepto",
      q: "¿Por qué una mercancía peligrosa es más peligrosa en un avión que en un camión?",
      respuesta:
        "Por cuatro cosas que actúan a la vez y no paran en todo el vuelo: la presión ambiente baja y un recipiente cerrado en tierra queda con presión hacia afuera; la temperatura cambia decenas de grados entre la plataforma y el crucero; la vibración es sostenida y afloja tapas y rompe frascos; y no hay a quién llamar. En tierra un derrame lo atienden los bomberos en minutos; en crucero lo resuelve la tripulación con lo que ya está a bordo, y el aeródromo más cercano puede estar a más de una hora.",
      claves: ["Presión hacia afuera", "Cambios de temperatura", "Vibración sostenida", "Lejos de ayuda"],
    },
    {
      nivel: "situacion",
      q: "Estás en crucero y hay un suceso con un bulto de mercancías peligrosas. ¿Con qué cuentas a bordo para responder?",
      respuesta:
        "Con poco, y por eso hay que conocerlo: el equipo de respuesta de emergencia que el reglamento exige al explotador (como mínimo bolsas grandes de polietileno, ligaduras y guantes largos de goma), los extintores de mano, el procedimiento de emergencia en vuelo del explotador y la información de mercancías peligrosas que firmé, que me dice qué llevo y dónde va. Con eso se contiene hasta aterrizar. No hay bomberos, ni ducha de emergencia, ni forma de aislar un bulto.",
      claves: ["Equipo de respuesta de emergencia", "Extintores de mano", "Procedimiento del explotador"],
    },
    {
      nivel: "concepto",
      q: "¿Qué es el NOTOC?",
      respuesta:
        "Es la información escrita sobre las mercancías peligrosas a bordo que el explotador debe entregarme lo antes posible antes de la salida: qué llevo, cuánto y dónde va cada bulto. La norma exige que la firme antes de que se transporten y que la tenga al alcance durante todo el vuelo. Y si se presenta una emergencia en vuelo, con ella a mano informo a la dependencia de tránsito aéreo, tan pronto la situación lo permita, para que avise en tierra qué hay a bordo.",
      claves: ["Por escrito, antes de salir", "Qué, cuánto y dónde", "Firmar y tener al alcance", "Informar a ATC"],
    },
    {
      nivel: "interpretacion",
      q: "¿Qué diferencia hay entre la declaración del expedidor y el NOTOC?",
      respuesta:
        "La declaración del expedidor es el documento con el que quien envía declara qué mercancía peligrosa entrega y certifica que la preparó conforme a las Instrucciones Técnicas. La prepara y la firma el expedidor, y la revisa el explotador en la aceptación: yo no la reviso, solo compruebo que viaja con la carga. El NOTOC es el resumen que el explotador me entrega a mí con lo que ya aceptó: qué va a bordo, cuánto y dónde. Uno certifica el envío; el otro informa al piloto, y ese es el que firmo yo.",
      claves: ["La firma el expedidor", "Certifica el envío", "El NOTOC informa al piloto"],
    },
    {
      nivel: "concepto",
      q: "¿Qué diferencia hay entre un bulto, un sobre-embalaje y un ULD?",
      respuesta:
        "El bulto es la unidad: el embalaje y su contenido, listo para el transporte. El sobre-embalaje son varios bultos de un mismo expedidor agrupados, con film o una caja por fuera, para manipularlos y estibarlos juntos. El ULD es el contenedor o la paleta con red de la aeronave, y no cuenta como sobre-embalaje. En el NOTOC el bulto me dice cuánto hay y el ULD dónde está.",
      claves: ["Bulto = unidad", "Sobre-embalaje = varios bultos", "ULD = contenedor o paleta"],
    },
    {
      nivel: "situacion",
      q: "En la información del vuelo lees «UN 1263 PAINT · Clase 3 · PG II · 2 bultos · ULD AKE 12345 AV» y un compañero comenta que son unas latas de pintura, nada del otro mundo. ¿Qué acabas de leer realmente?",
      respuesta:
        "Una mercancía identificada, clasificada y localizada dentro del avión, no «dos cajas de pintura». UN 1263 es el número ONU que identifica la sustancia y PAINT es su denominación oficial de transporte, no la marca. Clase 3 me dice líquido inflamable, o sea vapores inflamables en un espacio cerrado durante horas, y PG II es su grupo de embalaje según el grado de peligro. Dos bultos son dos unidades de transporte, no dos litros. Y el ULD AKE 12345 AV es dónde están: la casilla que miro si hay humo.",
      claves: ["Número ONU y denominación", "Clase 3 = líquido inflamable", "Bultos = unidades, ULD = dónde"],
    },
    {
      nivel: "interpretacion",
      q: "¿Qué diferencia hay entre aprobación, dispensa y excepción?",
      respuesta:
        "La aprobación existe cuando las Instrucciones Técnicas ya previeron que ese caso puede ir con aprobación: la norma lo permite, pero el explotador la pide a la autoridad. La dispensa es la salida cuando no lo previeron: procede por extrema urgencia, porque otro modo de transporte no sea apropiado o porque cumplirlo todo sea contrario al interés público, y siempre con un nivel de seguridad equivalente. Las dos las otorga la autoridad, no el explotador: él las pide. La excepción no se pide a nadie: es la propia norma la que excluye a ese artículo de un requisito que normalmente le aplicaría.",
      claves: ["La norma lo previó = aprobación", "No lo previó = dispensa", "Las otorga la autoridad", "Excepción: no se pide"],
    },
    {
      nivel: "situacion",
      q: "En el NOTOC ves un repuesto de la propia aerolínea. ¿Cambia algo por ser material de la compañía?",
      respuesta:
        "No cambia nada. Es COMAT, material del propio explotador, y si está clasificado como mercancía peligrosa es COMAT peligroso: cumple las mismas reglas de clasificación, embalaje, marcado, etiquetado y documentación que cualquier envío de un tercero, y va en el NOTOC igual. De hecho es la trampa clásica, y es exactamente lo que falló en ValuJet 592.",
      claves: ["COMAT peligroso", "No exime de nada", "ValuJet 592"],
    },
    {
      nivel: "concepto",
      q: "¿Quién responde de qué en la cadena, desde el expedidor hasta tu cabina?",
      respuesta:
        "El expedidor clasifica, embala, marca, etiqueta y declara: de él depende que el UN y la clase del NOTOC sean verdad. El explotador solo acepta si tiene la autorización en sus OpSpecs, inspecciona con lista de verificación y responde de sus agentes acreditados: subcontratar no diluye la responsabilidad. La terminal de carga almacena en un área especial, con la tabla de segregación a la vista, para que dos incompatibles no vayan juntas. La autoridad vigila y otorga aprobaciones y dispensas. Y yo recibo la información, la firmo y la tengo a mano: soy el último control de una cadena que no vi.",
      claves: ["Expedidor clasifica y declara", "Explotador acepta con OpSpecs", "Terminal segrega incompatibles", "Piloto: último control"],
    },
    {
      nivel: "interpretacion",
      q: "Si el expedidor declaró mal un envío y ya está en tu avión, ¿qué responsabilidad tienes tú como comandante?",
      respuesta:
        "La clasificación no es mía y no puedo verificarla desde la cabina: eso corresponde al expedidor y a la aceptación del explotador. Lo que sí me corresponde es no volar sin la información escrita, conocerla y actuar si algo en ella no cuadra: un grupo de embalaje en un UN de litio, una posición que no existe en ese avión. Mi responsabilidad está en el eslabón de información, no en el de clasificación.",
      claves: ["El expedidor clasifica", "Yo recibo y conozco", "Actuar si algo no cuadra"],
    },
    {
      nivel: "situacion",
      q: "Vas a salir, sabes que llevas carga declarada como mercancía peligrosa y nadie te ha entregado la información escrita. ¿Qué haces?",
      respuesta:
        "No salgo así. La norma exige que el explotador me la proporcione por escrito y lo antes posible antes de la salida, y que yo la firme antes de que las mercancías se transporten. Sin ese documento no sé qué hay, cuánto ni dónde, que es justo lo que necesitaría si algo pasa en vuelo. La pido y, si no aparece, se resuelve antes de mover el avión.",
      claves: ["Por escrito antes de salir", "Firmada por el comandante", "Qué, cuánto y dónde"],
    },
    ],
  },
  {
    nivel: 2,
    titulo: "Identificación",
    tras: 8,
    minutes: 12,
    preguntas: [
    {
      nivel: "concepto",
      q: "¿Cuáles son las nueve clases de mercancías peligrosas y cómo se asigna una sustancia a la suya?",
      respuesta:
        "Explosivos (1), gases (2), líquidos inflamables (3), sólidos inflamables (4), comburentes y peróxidos orgánicos (5), tóxicas e infecciosas (6), material radiactivo (7), corrosivas (8) y peligrosas varias (9). No son un ranking: son nueve tipos de peligro. Cada mercancía va en **una sola clase**, la del peligro que representa o, si tiene varios, la del más importante. Los demás no desaparecen: se declaran como riesgos secundarios y se ven en el etiquetado.",
      claves: ["Nueve tipos de peligro", "Una sola clase por mercancía", "El resto va como riesgo secundario"],
    },
    {
      nivel: "interpretacion",
      q: "¿Qué diferencia hay entre clase y división?",
      respuesta:
        "La clase es el grupo grande, del 1 al 9. La división es la subdivisión dentro de algunas clases, como 2.1, 4.3 o 6.2, y se escribe con punto. Importa porque cambia la respuesta: un gas inflamable (2.1) no se trata igual que un gas tóxico (2.3), y una sustancia que reacciona con el agua (4.3) no se apaga como un sólido inflamable normal. Decir «clase 2.1» delata que no se entendió la diferencia: es la división 2.1 de la clase 2.",
      claves: ["Clase = grupo del 1 al 9", "División = subdivisión", "Cambia la respuesta de emergencia"],
    },
    {
      nivel: "situacion",
      q: "En la rampa ves dos bultos con rombos amarillos. ¿Son lo mismo?",
      respuesta:
        "No. El amarillo lo comparten la división 5.1, comburentes, y la clase 7, material radiactivo. Pasa lo mismo con el rojo: la 3 y la 4 lo comparten porque las dos arden. El color es la primera señal, pero no identifica: lo que identifica es el **símbolo y el número** de la esquina inferior del rombo. Por eso nunca se decide nada mirando solo el color.",
      claves: ["El color se repite entre clases", "Identifican el símbolo y el número", "5.1 y 7 comparten amarillo"],
    },
    {
      nivel: "concepto",
      q: "¿Qué diferencia hay entre una etiqueta de riesgo y una de manipulación?",
      respuesta:
        "La de riesgo dice **qué hay dentro**: es un rombo con un símbolo y el número de la clase en la esquina inferior. La de manipulación dice **cómo se trata** el bulto y no lleva número de clase: las flechas de orientación, «exclusivamente en aeronaves de carga», material magnetizado, líquidos criogénicos. Un mismo bulto suele llevar de las dos, y las dos las pone el expedidor: entrega el bulto clasificado, embalado, marcado y etiquetado.",
      claves: ["Riesgo = qué es, rombo con número", "Manipulación = cómo se trata, sin número", "Conviven en el mismo bulto"],
    },
    {
      nivel: "interpretacion",
      q: "Un bulto lleva dos rombos. ¿Qué te dice eso?",
      respuesta:
        "Que la sustancia tiene un riesgo principal y al menos uno secundario. El principal es el que determina la clase con la que viaja y el que manda en la documentación; el secundario avisa de algo que también hay que tener en cuenta, por ejemplo que además de corrosiva es tóxica. Lo declara el expedidor y se ve como segunda etiqueta. Si solo leo el primero me pierdo la mitad del problema: ante una fuga, los dos condicionan la respuesta.",
      claves: ["Riesgo principal y secundario", "El principal determina la clase", "Los dos condicionan la respuesta"],
    },
    {
      nivel: "concepto",
      q: "¿Qué significa la etiqueta «Exclusivamente en aeronaves de carga» y qué implica para ti?",
      respuesta:
        "Es una etiqueta de manipulación: un rectángulo naranja con la silueta de un avión de carga, no un rombo. Significa que esa mercancía, en esa cantidad, **no puede ir en una aeronave que lleve pasajeros**, y el reglamento no lo matiza. Es la única etiqueta que decide si un bulto puede estar en mi vuelo, y la prohibición es por tipo de aeronave, no por posición: estibarlo lejos de la cabina no lo arregla. Si opero pasajeros y aparece, lo paro antes de que se cargue y lo hablo con el despachador.",
      claves: ["De manipulación, no de riesgo", "Solo aeronave de carga", "No se resuelve con la posición", "Se para antes de cargar"],
    },
    {
      nivel: "situacion",
      q: "En plataforma ves un bulto con la etiqueta de riesgo despegada a medias y nadie te sabe decir cuál era. ¿Qué pasa con ese bulto?",
      respuesta:
        "No vuela. El reglamento exige que el explotador autorizado tenga etiquetas para reponer las que se desprenden o deterioran, pero cierra diciendo que si **no hay certeza** de cuál corresponde, la mercancía no se transporta. Es una de las pocas veces que la norma dice «no se transporta» sin condiciones. Pegar la más probable es peor que no etiquetar: quien la lea después va a actuar según ella. Preguntar no me hace quisquilloso, me hace el último filtro que funcionó.",
      claves: ["Se repone si se sabe cuál es", "Sin certeza no se transporta", "Nunca se adivina la etiqueta"],
    },
    {
      nivel: "concepto",
      q: "¿Qué es el grupo de embalaje y qué indica?",
      respuesta:
        "Es el grado de peligro que una sustancia presenta dentro de su clase, a efectos de embalaje. Son tres y van en romanos: el I para las de gran peligro, el II para peligro intermedio y el III para escaso peligro. A más peligro, embalaje más exigente y límites de cantidad por bulto más bajos. No aplica a todas las clases: los explosivos se ordenan por división, los gases por su comportamiento y el radiactivo por su nivel de radiación; tampoco lo llevan las divisiones 5.2 y 6.2 ni las baterías de litio.",
      claves: ["Grado de peligro dentro de la clase", "I, II y III en romanos", "No aplica a clases 1, 2 y 7"],
    },
    {
      nivel: "interpretacion",
      q: "¿Qué diferencia hay entre cantidad exceptuada y cantidad limitada?",
      respuesta:
        "La exceptuada es una cantidad muy pequeña que queda fuera de casi todo el régimen y normalmente ni siquiera genera la documentación de mercancías peligrosas. La limitada sigue dentro del régimen: es un peligro menor en embalajes probados a apilamiento y caída, con su marca propia, y se identifica por la instrucción de embalaje «Y». Para un piloto la diferencia práctica es que la limitada la ve en el papel y la exceptuada, normalmente, no. Y «exceptuada» no autoriza a un pasajero a llevarla en la maleta: en Colombia el reglamento lo prohíbe expresamente, ni en equipaje ni por correo.",
      claves: ["Exceptuada = fuera de casi todo el régimen", "Limitada = dentro, con marca propia", "La limitada aparece en la documentación"],
    },
    {
      nivel: "interpretacion",
      q: "Tu NOTOC no lista ninguna mercancía peligrosa. ¿Eso garantiza que no hay ninguna en la bodega?",
      respuesta:
        "No. Las cantidades exceptuadas no generan la documentación de mercancías peligrosas y normalmente no aparecen en lo que firmo: van a bordo y yo no lo sé. Y «exceptuado» **no quiere decir inofensivo**: quiere decir que la norma lo dejó fuera de algunas obligaciones porque la cantidad es mínima. Por eso, si en vuelo aparece un olor o un humo que no corresponde a nada del NOTOC, lo trato como incendio de origen desconocido hasta que se demuestre lo contrario. El NOTOC no lo lista todo.",
      claves: ["Las exceptuadas no van en el NOTOC", "Exceptuado no es inofensivo", "Humo sin explicación: origen desconocido"],
    },
    {
      nivel: "situacion",
      q: "Repasas el NOTOC y lees «UN 3480 LITHIUM ION BATTERIES, clase 9, GE II». ¿Firmas?",
      respuesta:
        "Todavía no: pregunto antes de firmar. Las baterías de litio son clase 9 pero **no llevan grupo de embalaje**: su transporte lo gobierna la instrucción de embalaje de las Instrucciones Técnicas, que fija cuántas van por bulto, con qué estado de carga y en qué tipo de aeronave. Un grupo de embalaje junto a un UN 3480 o 3481 es un dato inventado, y un dato inventado en el papel rara vez viene solo. No corrijo la clasificación, que no es mía, ni rechazo el envío, que tampoco es mi papel: pregunto, para que alguien con la competencia lo mire.",
      claves: ["Clase 9 sin grupo de embalaje", "Manda la instrucción de embalaje", "Preguntar antes de firmar", "No corrijo ni rechazo: pregunto"],
    },
    {
      nivel: "concepto",
      q: "¿Qué es una fuga térmica y por qué se combate con agua?",
      respuesta:
        "Es la reacción de una celda de litio dañada, sobrecargada o en cortocircuito: se calienta, sus materiales se descomponen y generan más calor y gases inflamables, y ese calor alcanza a la celda vecina. Se alimenta sola y se reaviva. Quitarle el aire no la para, porque el oxígeno lo pone la propia celda: hay que **quitarle el calor**. Por eso se echa agua u otro líquido no inflamable, en abundancia: no para apagar la llama, sino para enfriar y que las celdas que aún no han reaccionado no lo hagan. El agua no neutraliza el litio, baja la temperatura.",
      claves: ["Reacción que se autoalimenta", "El oxígeno lo pone la celda", "Se enfría, no se sofoca", "El agua no neutraliza el litio"],
    },
    {
      nivel: "interpretacion",
      q: "¿Por qué las baterías de litio son clase 9 y qué gobierna su transporte como carga?",
      respuesta:
        "Porque su riesgo es eléctrico y térmico y no encaja en ninguna de las otras ocho clases. Su transporte no lo gobierna un grupo de embalaje sino la instrucción de embalaje de las Instrucciones Técnicas, que tiene secciones: las pequeñas y bien embaladas van por la Sección II, con menos exigencias; las grandes o en cantidad, por la Sección I con toda la norma. Y las Instrucciones vigentes fijan que las de ion litio sueltas no van como carga en aeronaves de pasajeros: solo en carguero y con estado de carga que no supere el 30 %. Confírmalo en la edición en vigor y en el manual de tu explotador.",
      claves: ["Riesgo eléctrico y térmico", "Manda la instrucción de embalaje", "Sección II = riesgo menor", "UN 3480 solo en carguero (verificar)"],
    },
    {
      nivel: "situacion",
      q: "Un pasajero quiere facturar un power bank en su maleta. ¿Qué le dices?",
      respuesta:
        "Que no va en bodega. Los power banks y las baterías de repuesto van **solo en cabina**, con los terminales protegidos contra cortocircuito: en la bodega nadie ve ni atiende una fuga térmica. Los vatios-hora dicen si necesita aprobación, no dónde va. Las Instrucciones vigentes fijan los límites: hasta 100 Wh sin aprobación del explotador; de 100 a 160 Wh con aprobación y máximo dos repuestos por persona; más de 160 Wh no va como equipaje, solo como carga. Son cifras para estudiar la regla: confírmalas en la edición en vigor y en el manual de tu explotador.",
      claves: ["Repuestos solo en cabina", "Terminales protegidos", "100 y 160 Wh (verificar)", "Los Wh no cambian dónde va"],
    },
    {
      nivel: "situacion",
      q: "En crucero te avisan: un pasajero quiere guardar en el compartimento superior un power bank que se está calentando. ¿Qué haces?",
      respuesta:
        "No va al compartimento. Un dispositivo que ya está calentando tiene que quedar **a la vista y accesible**, no encerrado donde nadie vea el humo hasta que sea grande. Se vigila, se tiene agua a mano y se aplica el procedimiento del explotador: si hay llama, el extintor la apaga, pero no apaga la reacción; detrás tiene que ir el agua, en abundancia, para enfriar. No se cubre ni se mueve sin protección hasta que esté frío, se vigila hasta aterrizar y después se notifica el suceso, aunque el aparato fuera de un pasajero.",
      claves: ["Nunca encerrarlo", "A la vista y accesible", "Extintor y luego agua", "Se notifica"],
    },
    ],
  },
  {
    nivel: 3,
    titulo: "Transporte aéreo",
    tras: 12,
    minutes: 12,
    preguntas: [
    {
      nivel: "concepto",
      q: "¿Qué mercancías peligrosas están prohibidas en el transporte aéreo?",
      respuesta:
        "Hay dos niveles de prohibición. Primero, un **criterio material**: lo que al presentarse para el transporte pueda explotar, reaccionar peligrosamente, producir llamas o desprender de manera peligrosa calor o gases tóxicos, corrosivos o inflamables en las condiciones normales de transporte no vuela, esté o no en la lista. Segundo, lo que las Instrucciones Técnicas nombran como prohibido, en todas las circunstancias o solo en circunstancias normales, donde cabe dispensa. Y la lista no es exhaustiva: no estar en ella no es un salvoconducto.",
      claves: ["Criterio material ante todo", "Prohibido en todas las circunstancias", "Prohibido salvo dispensa", "La lista no es exhaustiva"],
    },
    {
      nivel: "interpretacion",
      q: "Te preguntan si una mercancía peligrosa puede volar. ¿Por qué no basta con sí o no?",
      respuesta:
        "Porque hay cuatro niveles. **Prohibido en todos los casos**: lo que las Instrucciones nombran como prohibido cualesquiera que sean las circunstancias; no vuela ni con dispensa. Prohibido salvo dispensa: lo prohibido en circunstancias normales y los animales vivos infectados. Permitido con aprobación, cuando las Instrucciones lo prevén. Y permitido cumpliendo las Instrucciones, el caso normal. Cada línea del NOTOC cae en uno y me dice qué papel tiene que traer. Si aparece algo prohibido en todos los casos, alguien se equivocó antes que yo.",
      claves: ["Prohibido en todos los casos", "Prohibido salvo dispensa", "Permitido con aprobación", "Permitido cumpliendo las Instrucciones"],
    },
    {
      nivel: "situacion",
      q: "Operaciones te llama: un cliente quiere mandar en tu vuelo un artículo que figura como «Prohibido» en la columna de aeronave de pasajeros, y van a pedir «un permiso especial». ¿Qué respondes?",
      respuesta:
        "Que «permiso especial» no es una categoría. Si figura como prohibido en circunstancias normales, cabe una **dispensa**; si fuera prohibido en todos los casos, no vuela. Aprobación solo hay si las Instrucciones previeron ese caso; si no, es dispensa, y tiene motivos tasados. Las dos las da la autoridad, no el explotador ni el cliente. Y si sale, espero ver la mercancía en mi información escrita y las condiciones de la dispensa en los procedimientos del vuelo: no quita el riesgo, lo autoriza con un nivel de seguridad equivalente.",
      claves: ["«Permiso especial» no es categoría", "Aprobación prevista, si no dispensa", "La otorga la autoridad", "Condiciones en la información escrita"],
    },
    {
      nivel: "concepto",
      q: "¿Qué son las discrepancias notificadas y dónde se publican?",
      respuesta:
        "Son las diferencias que un Estado o un explotador aplica respecto de las Instrucciones Técnicas. Se notifican a la OACI y se publican en las propias Instrucciones. Tocan cosas concretas: el idioma de marcas y documentos, los plazos para pedir aprobaciones, los permisos de organismos que no son la autoridad aeronáutica. Y cambian con cada edición: no se estudian de memoria, se buscan en la edición en vigor y en el manual del explotador.",
      claves: ["Diferencias de Estados y explotadores", "Se notifican a la OACI", "Publicadas en las Instrucciones", "Cambian con cada edición"],
    },
    {
      nivel: "interpretacion",
      q: "¿Por qué una aerolínea tendría reglas más restrictivas que la norma?",
      respuesta:
        "Casi siempre porque le pasó algo. Las discrepancias de explotador nacen de la experiencia propia: LAN, por ejemplo, solo acepta generadores químicos de oxígeno si consta que no están vencidos ni usados, que es la lección de ValuJet convertida en regla de empresa. Un explotador puede ser más restrictivo que la norma; nunca menos. Sus condiciones propias las identifica en su manual de operaciones, y la autoridad las notifica a la OACI para que se publiquen.",
      claves: ["Nacen de la experiencia propia", "Más restrictivas, nunca más permisivas", "Se identifican en el manual"],
    },
    {
      nivel: "situacion",
      q: "Vuelas a un país cuyo reglamento no conoces y llevas mercancías peligrosas. ¿De qué te tienes que preocupar?",
      respuesta:
        "De que alguien haya mirado las **discrepancias** de ese Estado antes de que saliera la carga. El explotador cumple las de los Estados en los que opera o sobrevuela, y el expedidor mira las de todos los Estados involucrados y las del explotador antes de entregar. Yo no las reviso bulto a bulto, pero no supongo que cumplir la norma de casa basta en toda la ruta. Brasil, por ejemplo, exige portugués en su transporte interior, inglés en los envíos internacionales que salen de allí y aprobación de su comisión nuclear para el radiactivo que sale de Brasil o circula dentro.",
      claves: ["Explotador: Estados de la ruta", "Expedidor: antes de entregar", "Lo de casa no basta"],
    },
    {
      nivel: "interpretacion",
      q: "¿Qué añade Colombia para monomotores y aviación privada, y por qué no vale para toda la región?",
      respuesta:
        "En Colombia, además, el reglamento prohíbe por seguridad todo tipo de mercancías peligrosas en la **aviación civil privada**, y la clase 3 combustibles en **monomotores**, salvo lo que se permite llevar a pasajeros y tripulantes. Otras clases en monomotor requieren aprobación de la autoridad, que antes verifica las condiciones de seguridad del explotador y determina en qué aeródromos no la aprueba. No vale para la región porque es una limitación nacional: no está en el Anexo 18 ni en el LAR. Cada país añade las suyas.",
      claves: ["Privada: ninguna mercancía peligrosa", "Monomotor: sin clase 3 combustibles", "Otras clases con aprobación", "Limitación nacional, no regional"],
    },
    {
      nivel: "concepto",
      q: "¿Qué puede llevar un pasajero en materia de mercancías peligrosas?",
      respuesta:
        "La regla general es la **prohibición**: ni en equipaje facturado, ni de mano, ni en la persona. La única excepción es lo que las Instrucciones Técnicas permiten expresamente, y siempre con todas las condiciones que imponen: cantidades, si va en cabina o facturado, y si hace falta aprobación del explotador. Los valores exactos (vatios-hora, litros, unidades) están en la edición vigente de las Instrucciones y en la política del explotador. De memoria tengo que saber la regla y dónde va cada cosa.",
      claves: ["Prohibición general", "Solo lo expresamente permitido", "Con todas sus condiciones", "Cifras en la edición vigente"],
    },
    {
      nivel: "situacion",
      q: "En el embarque, la maleta de mano de un pasajero tiene que ir a bodega. Lleva dentro un power bank y un portátil, y discute con la auxiliar. ¿Qué se hace?",
      respuesta:
        "El **power bank** sale de la maleta y sube a cabina; el portátil puede seguir dentro, apagado y protegido contra activación accidental. No es una opinión mía ni de la auxiliar: lo dicen las Instrucciones Técnicas y el procedimiento del explotador. Si no lo acepta, la maleta no baja. La razón es la **fuga térmica**: hay que enfriar la batería, y para eso hay que llegar a ella. En cabina alguien lo ve y actúa en segundos; en bodega, hasta que salta un detector la reacción puede haber pasado a las celdas vecinas.",
      claves: ["Power bank a cabina", "Portátil apagado y protegido", "Fuga térmica: hay que alcanzarla", "Si no acepta, no baja"],
    },
    {
      nivel: "concepto",
      q: "Dime dónde va cada uno: vapeador, encendedor, munición, oxígeno medicinal y una botella de ron.",
      respuesta:
        "El **vapeador**, solo en cabina o en la persona, y no se puede cargar a bordo. El encendedor, uno y en la persona, nunca en el equipaje. La **munición**, al revés: solo facturada, limitada, bien embalada y con aprobación del explotador. El oxígeno medicinal, con aprobación del explotador. Y el licor de 24 a 70 %, en su envase de venta y hasta 5 litros por persona; por encima del 70 % no vuela. Son cifras para estudiar la regla: confírmalas en las Instrucciones vigentes y en la política del explotador.",
      claves: ["Vapeador: cabina, sin cargar", "Encendedor: uno, en la persona", "Munición: facturada, con aprobación", "Licor: 5 litros (verificar)"],
    },
    {
      nivel: "interpretacion",
      q: "¿Por qué no basta con avisarle al pasajero en el mostrador lo que no puede llevar?",
      respuesta:
        "Porque el reglamento no confía en que el pasajero sepa: obliga a decírselo en **seis momentos**. En la compra del pasaje; en el aeropuerto, con avisos y ejemplos visuales donde se venden pasajes, en el despacho y en el embarque; en el despacho a distancia; en el autoservicio; en la recepción del equipaje, con confirmación de que no lleva nada prohibido; y en el equipaje excedente que va como carga. En la compra por internet, el despacho a distancia y el autoservicio, el trámite no se completa sin que el pasajero **confirme**.",
      claves: ["Seis momentos, desde la compra", "Avisos con ejemplos visuales", "Sin confirmación no se completa"],
    },
    {
      nivel: "situacion",
      q: "Vas de uniforme a recoger un avión en otra base y facturas una maleta con pilas de litio de repuesto y un encendedor. Un compañero te dice que a la tripulación eso no le aplica. ¿Qué le respondes?",
      respuesta:
        "Que se equivoca. La norma prohíbe las mercancías peligrosas a bordo tanto a pasajeros como a tripulantes, en equipaje facturado, de mano o en la persona, y la excepción es la misma para los dos. Las pilas de repuesto salen de la maleta y van en cabina, con los terminales protegidos: en bodega, si entran en fuga térmica, nadie interviene. El encendedor, uno y en la persona. Ir de uniforme no cambia nada: lo que la tripulación tiene es **formación** para saberlo, y por eso se le exige más, no menos.",
      claves: ["La tripulación no tiene fuero", "Misma excepción que el pasajero", "Repuestos de litio en cabina", "Encendedor en la persona"],
    },
    {
      nivel: "concepto",
      q: "¿Qué es una mercancía peligrosa oculta?",
      respuesta:
        "Carga declarada con una **descripción general** que debería haberse declarado como mercancía peligrosa, o mercancías peligrosas prohibidas o en cantidad superior a la permitida presentes en el equipaje o junto al cuerpo de un pasajero o tripulante, o en un envío postal. El ejemplo clásico es «Oxy Canisters, Empty» en ValuJet: generadores de oxígeno que viajaron como vacíos y no lo estaban. El riesgo del sistema no es la carga declarada, que llega con papeles y etiquetas, sino la que nadie declaró.",
      claves: ["Descripción general que oculta", "También equipaje o persona", "También en el correo"],
    },
    {
      nivel: "interpretacion",
      q: "¿Por qué el reglamento obliga a que el personal de reservas y de recepción tenga a mano una lista de descripciones generales?",
      respuesta:
        "Porque las mercancías ocultas no se reconocen por su aspecto sino por cómo se describen. «Material de la compañía», «muestras» o «equipo de campamento» pueden esconder generadores de oxígeno, hielo seco, aerosoles o baterías. La lista sirve para que quien recibe la carga o al pasajero sepa cuándo pedir **confirmación del contenido** en vez de dar por buena la descripción. Y aplica también al explotador que no transporta mercancías peligrosas: debe tener procedimientos para que no entren sin declarar.",
      claves: ["Se reconocen por la descripción", "Confirmar el contenido", "Aplica a todo explotador"],
    },
    {
      nivel: "situacion",
      q: "En tierra descubren una mercancía peligrosa no declarada en la carga de tu vuelo y la retiran antes de embarcarla. No pasó nada. ¿Hay que notificar?",
      respuesta:
        "Sí. Descubrir una mercancía peligrosa oculta ya es un **suceso** con mercancías peligrosas, aunque no haya daños ni llegue a bordo, y el reglamento exige al explotador notificar cada vez que aparezcan en la carga o en el correo mercancías no declaradas o mal declaradas. Bajarla resuelve el vuelo, no el sistema. Es el nivel que más información aporta, porque señala un fallo de la cadena que todavía no ha costado nada. Notificarlo hoy es el accidente que no ocurre el año que viene.",
      claves: ["Sí se notifica", "Suceso aunque no haya daño", "Bajarla no basta", "Alimenta el SMS"],
    },
    ],
  },
  {
    nivel: 4,
    titulo: "Situaciones del piloto",
    tras: 16,
    minutes: 12,
    preguntas: [
    {
      nivel: "concepto",
      q: "¿Dónde no se puede estibar una mercancía peligrosa a bordo?",
      respuesta:
        "Nunca en la cabina de pasajeros ni en el puesto de pilotaje, salvo los casos que permitan el reglamento y las Instrucciones Técnicas. Un bulto «Exclusivamente en aeronaves de carga» no va en un avión con pasajeros, y en el carguero se carga donde un tripulante pueda **verlo, manipularlo** y, si el tamaño y el peso lo permiten, separarlo en vuelo. El material radiactivo va separado de las personas, los animales vivos y las películas no reveladas, y afianzado para mantener esa separación todo el vuelo.",
      claves: ["Nada en ninguna cabina", "CAO nunca con pasajeros", "CAO accesible en vuelo", "Radiactivo separado de personas"],
    },
    {
      nivel: "situacion",
      q: "En la aceptación aparece un bulto de mercancías peligrosas dañado. ¿Qué pasa con él?",
      respuesta:
        "No se acepta. En la aceptación se inspeccionan el bulto, el sobre-embalaje o el contenedor y la documentación con una lista de verificación, y el envío se acepta solo si cumple todos los requisitos; antes de estibar se revisa otra vez, y ningún bulto ni ULD va a bordo con trazas de pérdidas o averías. Si el daño se descubre cuando ya está a bordo, deja de ser un problema de aceptación y pasa a ser un **suceso**: se aplica el procedimiento de emergencia y se notifica.",
      claves: ["No se acepta", "Lista de verificación", "Se revisa antes de estibar", "A bordo ya es suceso"],
    },
    {
      nivel: "interpretacion",
      q: "Tú no estibas la carga. ¿Qué es la segregación y por qué tienes que conocerla?",
      respuesta:
        "Es mantener separadas las mercancías **incompatibles**, las que al mezclarse podrían generar calor peligrosamente, gases o una sustancia corrosiva, para que una fuga no las ponga en contacto; la aplican el explotador y el operador de terminal con la tabla de segregación de las Instrucciones Técnicas. A mí me importa por dos razones. La posición de cada mercancía aparece en el NOTOC que firmo, y si dos incompatibles figuran en la misma posición, lo pregunto antes de firmar. Y si hay una fuga en vuelo, saber qué había cerca de qué cambia lo que espero encontrar y lo que comunico a tierra.",
      claves: ["Mercancías incompatibles", "Posición visible en el NOTOC", "Cambia la respuesta en emergencia"],
    },
    {
      nivel: "concepto",
      q: "¿Qué exige el reglamento sobre el NOTOC?",
      respuesta:
        "El NOTOC es la información escrita al piloto al mando sobre las mercancías peligrosas a bordo, y de la norma salen siete requisitos. El explotador me la entrega **por escrito** y lo antes posible antes de la salida; la firmo antes de que las mercancías se transporten; la tengo al alcance durante todo el vuelo; queda a disposición del aeródromo de última salida y del de próxima llegada; el explotador conserva en tierra una copia firmada, y en transporte internacional va en inglés, además de los idiomas del Estado de origen.",
      claves: ["Por escrito, antes de salir", "Firmado antes del transporte", "Al alcance en vuelo", "Inglés en vuelos internacionales"],
    },
    {
      nivel: "interpretacion",
      q: "¿Por qué el NOTOC tiene que ir contigo en la cabina? ¿No basta con haberlo leído?",
      respuesta:
        "Porque el momento en que hace falta es una emergencia, y en una emergencia nadie recuerda un número ONU ni una posición de bodega. Si hay humo o un olor, necesito poder decir por radio qué llevo, cuánto y dónde, y eso solo funciona si el papel está en la cabina y no en la oficina de despacho. El comandante es la **última barrera** del sistema: la mercancía ya fue clasificada, embalada y documentada, pero yo verifico el NOTOC, decido si acepto el vuelo y gestiono cualquier emergencia.",
      claves: ["Se usa en emergencia", "Qué, cuánto y dónde", "Última barrera del sistema"],
    },
    {
      nivel: "concepto",
      q: "Te entregan el NOTOC. ¿Qué revisas antes de firmarlo?",
      respuesta:
        "Que estén el NOTOC y la declaración del expedidor, presentes y firmados, y que cada envío esté permitido en esa aeronave: ningún bulto «Exclusivamente en aeronaves de carga» si llevo pasajeros, nada en cabina ni en el puesto de pilotaje. Que los datos **coincidan** con la declaración, que es la fuente: número ONU, designación, clase, grupo de embalaje y cantidad. Después, dónde va cada bulto y qué tiene al lado. Y lo firmo antes de que la mercancía se transporte, no en crucero cuando haya tiempo.",
      claves: ["Documentos presentes y firmados", "Permitido en esa aeronave", "Datos coherentes con la declaración", "Posición y segregación"],
    },
    {
      nivel: "situacion",
      q: "El NOTOC dice UN 1263, clase 3, grupo de embalaje II, y la declaración del expedidor dice grupo III. ¿Firmas?",
      respuesta:
        "No firmo: pregunto. Si no coinciden, uno de los dos está mal, y si la discrepancia no se resuelve el envío no sale; lo mismo si el NOTOC trae una posición de bodega que en ese avión no existe, que puede ser una errata o un documento de otro vuelo o de otra matrícula. El dato que firmo es el que usaría en una emergencia, y ese es justo el que no puede estar mal: firmar un documento que sé que no cuadra es peor que no tenerlo.",
      claves: ["No firmo: pregunto", "Sin resolver, no sale", "Dato para la emergencia"],
    },
    {
      nivel: "concepto",
      q: "¿Qué exige el reglamento que esté listo antes de una emergencia con mercancías peligrosas en vuelo?",
      respuesta:
        "Un procedimiento de emergencia en vuelo del explotador, con sus instrucciones en el manual de operaciones, y tripulantes al corriente de las medidas que hay que tomar. Información de respuesta de emergencia disponible de inmediato para el piloto al mando: la guía de la OACI o un documento equivalente, con el código ERG que trae el NOTOC. Y el equipo de respuesta a bordo, con instrucción sobre su uso: como mínimo **bolsas grandes de polietileno**, ligaduras y guantes largos de goma, pensado para contener y aislar, no para apagar un incendio.",
      claves: ["Procedimiento del explotador", "Guía de respuesta OACI", "Tripulación al corriente", "Bolsas, ligaduras y guantes"],
    },
    {
      nivel: "situacion",
      q: "En crucero salta la alarma de humo de la bodega delantera. Según el NOTOC, ahí van dos bultos de clase 3 y uno de clase 8. ¿Qué haces y en qué orden?",
      respuesta:
        "Primero, volar: procedimiento del fabricante para humo o incendio en bodega, y descenso o desvío si el procedimiento lo pide, sin empezar por los papeles. Después identifico con el NOTOC: clase 3 es líquido inflamable y clase 8, corrosivo, y la guía de respuesta con su código me dice cómo se comporta cada uno. Declaro emergencia, informo al ATS qué llevo, cuánto y dónde, tan pronto la situación lo permita, y desvío al aeródromo adecuado más cercano, porque con fuego a bordo **el tiempo** manda. En tierra, esa información pasa a los servicios de emergencia y el suceso se notifica.",
      claves: ["Volar primero", "Identificar con el NOTOC", "Informar al ATS", "Desviar: el tiempo manda"],
    },
    {
      nivel: "interpretacion",
      q: "En una emergencia con mercancías peligrosas, ¿a quién informas y por qué a esa dependencia?",
      respuesta:
        "A la dependencia de servicios de tránsito aéreo, tan pronto la situación lo permita. No porque el controlador vaya a resolver nada, sino porque es la cadena que fija el reglamento: el ATS informa a la administración aeroportuaria, y así los bomberos llegan sabiendo qué agente extintor traer y con qué protección acercarse. Doy lo que dice el NOTOC: qué mercancía, cuánta y dónde va. La norma dice «tan pronto la situación lo permita» y no «de inmediato»: primero se controla el avión, pero la información tiene que llegar.",
      claves: ["Dependencia ATS", "El ATS avisa al aeródromo", "Qué, cuánto y dónde", "Primero se controla el avión"],
    },
    {
      nivel: "situacion",
      q: "Terminas el vuelo sin novedad, pero en el descenso notaste un olor químico que no se repitió. ¿Haces algo?",
      respuesta:
        "Sí, lo reporto. Puede no ser nada, pero también puede ser una fuga incipiente en un bulto, y eso es un **incidente** imputable a mercancías peligrosas: la definición incluye expresamente las fugas y cualquier manifestación de que se vulneró la integridad de un embalaje, aunque nadie salga lesionado. Y si al final no era nada, el reporte igual entra al sistema de gestión de la seguridad operacional del explotador.",
      claves: ["Se reporta igual", "Una fuga es incidente", "Alimenta el SMS"],
    },
    {
      nivel: "concepto",
      q: "¿Qué diferencia hay entre accidente, incidente e incumplimiento imputable a mercancías peligrosas?",
      respuesta:
        "El accidente ocasiona lesiones mortales o graves a alguna persona, o daños de consideración a los bienes o al medio ambiente. El incidente no llega a accidente, pero produce lesiones, daños, incendio, ruptura, derrame, fuga, radiación o cualquier manifestación de que se vulneró un embalaje, o pudo poner en peligro a la aeronave o a sus ocupantes, y no tiene que ocurrir a bordo. El incumplimiento es la ocurrencia atribuible al transporte que no llega a ninguno de los dos; y los tres, junto con el hallazgo de una mercancía peligrosa oculta, son **sucesos**.",
      claves: ["Accidente: lesiones graves o mortales", "Incidente: embalaje vulnerado o peligro", "Incumplimiento: ninguno de los dos", "Mercancía oculta también es suceso"],
    },
    {
      nivel: "situacion",
      q: "Después del vuelo se descubre que un envío declarado de mercancías peligrosas viajó sin figurar en el NOTOC. No pasó nada. ¿Se notifica? ¿A quién?",
      respuesta:
        "Sí. El reglamento obliga a notificar cuando se transportaron mercancías peligrosas sin información al piloto al mando, o mal cargadas, segregadas, separadas o afianzadas, y esa notificación va a las autoridades del Estado del explotador y del **Estado de origen**. El destinatario cambia con el suceso: un accidente, un incidente o mercancías no declaradas o mal declaradas en la carga van al Estado del explotador y al Estado donde ocurrió, y lo que aparece en el equipaje o en la persona, al Estado donde ocurrió.",
      claves: ["Se notifica igual", "Estado del explotador y origen", "El destinatario cambia"],
    },
    {
      nivel: "interpretacion",
      q: "¿Por qué se notifica algo que no causó ningún daño?",
      respuesta:
        "Porque es el dato más barato del sistema: un fallo de la cadena que todavía no ha costado nada y que sirve para corregir antes de que cueste. Por eso el transporte de mercancías peligrosas entra en el alcance del **SMS** del explotador: no es un trámite aparte, es parte del sistema con el que la empresa gestiona su seguridad. En Colombia, además, la autoridad recopila los eventos que no llegan a incidente ni accidente para trabajar de forma predictiva y proactiva, no reactiva.",
      claves: ["Aún no ha costado nada", "Entra en el SMS", "Corregir antes de que cueste"],
    },
    {
      nivel: "situacion",
      q: "En destino, al descargar, aparece un bulto con una fuga que en vuelo nadie detectó. ¿Qué es y qué se hace?",
      respuesta:
        "Es un **incidente** imputable a mercancías peligrosas, aunque nadie lo notara en vuelo y no haya lesionados, y se notifica a las autoridades del Estado del explotador y del Estado donde ocurrió. En rampa se inspecciona la zona donde iba por daños o contaminación, se comprueba que ningún otro bulto quedó contaminado y se elimina sin demora la contaminación peligrosa; si es radiactiva, la aeronave sale de servicio hasta que la radiación y la contaminación bajen de los valores de las Instrucciones. Y hay que ver qué había cerca, porque una fuga junto a algo incompatible es otro problema.",
      claves: ["Incidente, no incumplimiento", "Se notifica a dos Estados", "Zona inspeccionada y descontaminada", "Radiactivo: avión fuera de servicio"],
    },
    ],
  },
  {
    nivel: 5,
    titulo: "Casos reales y repaso",
    tras: 18,
    minutes: 12,
    preguntas: [
    {
      nivel: "concepto",
      q: "Cuéntame un accidente relacionado con mercancías peligrosas y qué cambió después.",
      respuesta:
        "ValuJet 592. Llevaba generadores químicos de oxígeno sin las tapas de seguridad, despachados como material de la compañía y declarados como «vacíos». No estaban vacíos: en la bodega produjeron oxígeno y calor, y el incendio hizo caer el avión. Fallaron tres eslabones: el expedidor, el explotador y una regla de diseño de la autoridad. Lo que cambió después fue la **detección y supresión** de incendios obligatorias en las bodegas de clase D.",
      claves: ["Generadores de oxígeno sin tapa", "COMAT declarado «vacío»", "Tres eslabones fallaron", "Supresión en bodegas clase D"],
    },
    {
      nivel: "interpretacion",
      q: "¿Y qué aprendió la industria de ValuJet?",
      respuesta:
        "Que ser material de la propia compañía no exime de nada: si está clasificado como mercancía peligrosa es **COMAT peligroso** y cumple todas las reglas. Que escribir «vacío» no clasifica nada: clasifica lo que hay dentro. Y que el último control de la cadena era la firma del comandante sobre un documento que decía otra cosa. De ahí viene la insistencia actual en la información escrita al piloto al mando y en la instrucción periódica de todo el personal, acepte o no la empresa mercancías peligrosas.",
      claves: ["COMAT peligroso no exime", "«Vacío» no clasifica nada", "La firma, último control", "Instrucción aunque no acepte"],
    },
    {
      nivel: "interpretacion",
      q: "¿Por qué un bulto «Exclusivamente en aeronaves de carga» tiene que ir donde un tripulante pueda llegar? ¿Qué accidente hay detrás?",
      respuesta:
        "South African 295. El incendio fue en la cubierta principal de un combi, en una zona a la que la tripulación no podía llegar, y la causa de la ignición nunca se determinó. Después cambiaron los requisitos de los combi y se exigió que la carga sea **accesible y separable** en vuelo. Por eso los bultos CAO se cargan de modo que un tripulante pueda verlos, manipularlos y, si su tamaño y peso lo permiten, separarlos de las otras mercancías. Sobre un bulto al que no se llega no se puede hacer nada.",
      claves: ["Fuego inalcanzable en un combi", "Carga accesible y separable", "CAO: verlo y manipularlo"],
    },
    {
      nivel: "concepto",
      q: "¿Qué pasó en UPS 6 y qué cambió después?",
      respuesta:
        "Se autoencendió una paleta con más de 81.000 baterías de litio. El humo llenó la cabina en minutos y el capitán quedó incapacitado al fallar su oxígeno. Después la OACI endureció las baterías de litio como carga: desde 2016 las de ion litio sueltas no van en aeronaves de pasajeros. Y para la cabina deja una lección: la información tiene que estar **al alcance** del comandante y la de respuesta de emergencia disponible de inmediato, porque cuando el humo no deja ver el panel no hay tiempo de buscar.",
      claves: ["Paleta de baterías de litio", "Humo en cabina en minutos", "Ion litio fuera de pasajeros", "Información al alcance en vuelo"],
    },
    {
      nivel: "interpretacion",
      q: "En Asiana 991 nunca se determinó qué encendió el fuego. ¿Qué se aprende de un accidente sin causa conocida?",
      respuesta:
        "Que la lección no depende de la causa. El fuego empezó en o cerca de una paleta con mercancías peligrosas en el fuselaje trasero y fue más rápido que el descenso; los registradores se perdieron. Si no se puede saber qué lo encendió, lo que sí se controla es qué había en la bodega, cómo estaba estibado y qué tan rápido lo supo la tripulación. Lo que vino después fue más presión sobre la **estiba y la segregación** en cargueros y sobre la respuesta al humo en cabina.",
      claves: ["Sin causa, igual hay lección", "Lo controlable: carga y estiba", "Estiba y segregación en cargueros"],
    },
    {
      nivel: "interpretacion",
      q: "¿Qué tienen en común los grandes accidentes con mercancías peligrosas y con qué lección te quedas?",
      respuesta:
        "En los cuatro que conozco el fuego empezó en la carga, no en cabina, y cuando la tripulación se enteró ya llevaba minutos y no podía llegar hasta él. Lo primero que falló fue la **información**: una clasificación que no se hizo, una declaración que no se comprobó o una descripción genérica que nadie cuestionó. Me quedo con esto: el fuego en bodega no se apaga, se gestiona hasta el suelo, con el tiempo hasta un aeródromo utilizable y lo que ya estaba a bordo. Por eso todo se juega antes de salir.",
      claves: ["Empezaron en la carga", "Falla primero la información", "Se gestiona hasta el suelo", "Se decide antes de salir"],
    },
    {
      nivel: "situacion",
      q: "Vuelo con pasajeros, veinte minutos para salir. El NOTOC trae pintura y hielo seco. En la bodega ves seis cajas marcadas «AOG PARTS, COMPANY MATERIAL» que no están en el NOTOC. ¿Firmas?",
      respuesta:
        "No hasta aclararlo. Esa marca es **COMAT**, propiedad del explotador que viaja en su propio provecho, y unos repuestos pueden incluir generadores de oxígeno, extintores, baterías o aerosoles. Si algo está clasificado como mercancía peligrosa es COMAT peligroso y va en la información que firmo. Pregunto qué contienen y quién las aceptó. Si el explotador confirma que no llevan mercancías peligrosas y queda registrado, firmo; si llevan, entran al NOTOC o no salen. Así, como material de la compañía, viajaron los generadores de ValuJet.",
      claves: ["COMAT peligroso cumple todo", "Qué contienen y quién aceptó", "Al NOTOC o no sale"],
    },
    {
      nivel: "situacion",
      q: "Un vuelo sale con cajas de repuestos de la compañía que no estaban en el NOTOC y en destino aparecen generadores de oxígeno. No pasó nada. ¿Hay algo que hacer?",
      respuesta:
        "Sí: se notifica. Es un **suceso** con mercancías peligrosas por dos vías: mercancía no declarada o mal declarada descubierta en la carga, y mercancía transportada sin información al piloto al mando. Lo sería aunque la hubieran descubierto en tierra, antes de subir. La no declarada se notifica a las autoridades del Estado del explotador y del Estado donde ocurrió. Y como no pasó nada, es un incumplimiento imputable a mercancías peligrosas: el nivel que más aporta al SMS, porque señala un fallo de la cadena que todavía no ha costado nada.",
      claves: ["Suceso por dos vías", "Notificar aunque no haya daño", "Incumplimiento que alimenta el SMS"],
    },
    {
      nivel: "concepto",
      q: "¿Cuáles son los tres componentes de la instrucción en mercancías peligrosas?",
      respuesta:
        "Uno, la instrucción general de familiarización, con las disposiciones generales. Dos, la instrucción específica según la función, con el detalle de los requisitos que se aplican a lo que hace cada persona. Tres, la instrucción sobre **seguridad operacional**: los peligros de las mercancías peligrosas, la manipulación sin riesgos y los procedimientos de respuesta de emergencia. Además, cada uno recibe instrucción sobre las políticas y procedimientos de mercancías peligrosas del manual de operaciones de su empresa.",
      claves: ["General de familiarización", "Específica según la función", "Seguridad operacional", "Procedimientos del manual propio"],
    },
    {
      nivel: "situacion",
      q: "Revisas tus cursos: el último de mercancías peligrosas fue hace 25 meses y tus próximos vuelos no llevan carga peligrosa. ¿Qué corresponde?",
      respuesta:
        "Estoy fuera del mínimo: el reglamento exige la instrucción **como mínimo cada 24 meses** a todo el que realice o supervise funciones relacionadas con pasajeros, equipajes, carga o correo. Que mis vuelos no lleven mercancías peligrosas no cambia nada. El LAR admite hacer el recurrente dentro de los 30 días siguientes al vencimiento; si ya pasé ese plazo, toca instrucción inicial otra vez. En Colombia, además, el curso va dentro de los entrenamientos periódicos del piloto, con frecuencia no mayor a dos años.",
      claves: ["Mínimo cada 24 meses", "No depende del vuelo", "Ventana de 30 días", "Después, inicial otra vez"],
    },
    {
      nivel: "concepto",
      q: "Tu aerolínea no transporta mercancías peligrosas. ¿Qué le exige igual el reglamento?",
      respuesta:
        "Dos cosas. Mantener programas de **instrucción** inicial y de repaso para su personal, tenga o no autorización para transportarlas: el curso me lo exigen igual. Y especificar en su manual los procedimientos que adoptará para evitar que se introduzcan mercancías peligrosas no declaradas en sus aeronaves. Que no las acepte no significa que no le lleguen: pueden venir en una maleta, en un envío con una descripción general o como material de la propia compañía, y el personal tiene que saber reconocerlas.",
      claves: ["Instrucción inicial y de repaso", "Procedimientos contra no declaradas", "Llegan aunque no acepte"],
    },
    {
      nivel: "concepto",
      q: "En treinta segundos: ¿qué son las mercancías peligrosas y por qué existe una norma específica para el transporte aéreo?",
      respuesta:
        "Son objetos o sustancias que pueden constituir un riesgo para la salud, la seguridad, los bienes o el medio ambiente, y que están en la lista de las Instrucciones Técnicas o son clasificables conforme a ellas. Existe una norma específica para el aire porque **el avión cambia el riesgo**: la presión ambiente baja, la temperatura varía, la vibración es sostenida y no hay a quién llamar. Lo que en tierra se resuelve en minutos, en crucero lo resuelve la tripulación con lo que ya está a bordo.",
      claves: ["Riesgo y lista o clasificable", "Presión, temperatura, vibración", "Aislamiento y tiempo"],
    },
    {
      nivel: "interpretacion",
      q: "¿Cuál es tu responsabilidad como comandante frente a las mercancías peligrosas? ¿Dónde empieza y dónde termina?",
      respuesta:
        "Empieza cuando recibo la información escrita de las mercancías peligrosas del vuelo, que el explotador debe darme lo antes posible antes de la salida. La **firmo** antes de que se transporten, la mantengo al alcance durante todo el vuelo y conozco los procedimientos de emergencia. No me corresponde clasificar ni verificar embalajes: eso es del expedidor y de la aceptación. Lo que sí me corresponde es no salir sin esa información y actuar si algo en ella no cuadra.",
      claves: ["Recibir, firmar, tener al alcance", "No clasifico ni verifico embalajes", "Actuar si algo no cuadra"],
    },
    {
      nivel: "situacion",
      q: "Preparas el vuelo y en el NOTOC lees «UN 3480, clase 9, GE II, CAO». Llevas pasajeros. ¿Qué ves ahí?",
      respuesta:
        "Dos cosas, y una es grave. La primera: las baterías de litio no llevan grupo de embalaje, así que ese «GE II» es un error de documentación. La segunda, y la que para el vuelo: la marca CAO significa **exclusivamente en aeronave de carga**, y este vuelo lleva pasajeros. Ese bulto no puede ir, y no se arregla cambiándolo de posición. Lo hablo con el despachador antes de que se cargue.",
      claves: ["Litio sin grupo de embalaje", "CAO: nunca con pasajeros", "La estiba no lo arregla"],
    },
    {
      nivel: "situacion",
      q: "En crucero salta la alarma de humo de la bodega donde llevas mercancías declaradas. ¿En qué orden actúas?",
      respuesta:
        "Volar, identificar, comunicar. Primero el procedimiento del fabricante para humo o incendio en bodega, y el desvío si corresponde. Después la información escrita, que me dice qué hay, cuánto y en qué posición, y la información de respuesta de emergencia, que me dice cómo se comporta esa mercancía. Y después informo a la dependencia de tránsito aéreo, para que el aeródromo prepare los medios sabiendo qué va a encontrarse. Invertir ese orden consume el único recurso que no se recupera: el tiempo.",
      claves: ["Volar primero", "Identificar con el NOTOC", "Informar al ATS", "Guía de respuesta de emergencia"],
    },
    ],
  },
]
