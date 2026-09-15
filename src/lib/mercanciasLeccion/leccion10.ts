/**
 * Lección 10 · NOTOC, lectura e interpretación operacional para pilotos.
 *
 * Contrastada con la edición 2025–2026 de las Instrucciones Técnicas OACI
 * (parte 7, cap. 4), la presentación oficial ICAO/EASA de 2025 sobre
 * responsabilidades del explotador y el RAC 175 de Colombia, 175.515.
 * El ejemplo UN 1263 / PAINT / clase 3 / PG II está documentado en un
 * documento de trabajo de la OACI; vuelo, ULD y posición son ficticios.
 * No enseña a elaborar ni aprobar un NOTOC de un operador real.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const LECCION_10: DocScreen = {
  n: 10,
  title: "El NOTOC",
  kicker: "La información al piloto al mando",
  minutes: 12,
  blocks: [
    {
      kind: "p",
      text: "El NOTOC es la información sobre mercancías peligrosas que el explotador entrega al piloto al mando para ese vuelo. Relaciona lo que se cargó con sus riesgos y su ubicación. No es una lista de todo lo que podría transportarse: describe los envíos pertinentes que van a bordo. Si aparece humo o una indicación anormal, esa relación deja de ser administrativa y se vuelve operacional.",
    },
    {
      // Reconstrucción nítida del formulario y sus quince campos.
      kind: "figura",
      src: "/modulos/mercancias/img-32-notoc-lectura-hd.webp",
      alt: "NOTOC de lectura en alta resolución. Flechas señalan datos del vuelo, preparación, envío, riesgos, cantidad, condiciones, posición y respuesta de emergencia. Una fila de PAINT clase 3 muestra la relación entre los campos y plantea una pregunta en la columna 15.",
      ancho: 2400,
      alto: 1500,
      pie: "Sigue las flechas de izquierda a derecha: identifica el envío y su riesgo, comprueba bultos y cantidad, ubícalo en la aeronave y revisa el código de respuesta. En la fila de estudio, la columna 15 plantea una discrepancia para el briefing.",
    },
    {
      kind: "p",
      text: "El NOTOC no sustituye la declaración del expedidor. Esta describe el envío para su transporte; el explotador realiza la aceptación y prepara la información que necesita la operación. La lámina separa los datos del vuelo, quién preparó la información y la tabla de carga: cada fila se relaciona con un envío y su ubicación. El piloto la recibe de forma legible antes de la salida y la tiene disponible durante el vuelo.",
    },
    { kind: "sub", text: "Una línea representa carga real" },
    {
      kind: "p",
      text: "Piensa en dos bultos cargados en una unidad de carga (ULD). Una línea de información debe permitir reconocer qué mercancía contienen, cuánto hay y dónde quedó esa unidad en la aeronave. La fotografía muestra los tres objetos físicos que debes relacionar con la línea del NOTOC: bultos, ULD y área de carga.",
    },
    {
      // MP-IMG-23 · Fotografía explicativa · 3:2 · 1200×800.
      kind: "figura",
      src: "/modulos/mercancias/img-23-bulto-uld-posicion.webp",
      alt: "Fotografía realista de plataforma de carga comercial: dos cajas junto a una unidad de carga y la puerta de la bodega. Tres flechas grandes señalan bultos reales, unidad de carga ULD y área de carga en la aeronave.",
      ancho: 1200,
      alto: 800,
      pie: "Los bultos no se convierten en «papel» al cargar. La identificación del envío y la posición registrada son las que hacen útil la línea del NOTOC para la tripulación.",
    },
    {
      kind: "p",
      text: "Un ULD reúne y sujeta carga. Su identificación, como AKE 12345 en el ejercicio, señala cuál unidad se utilizó; no dice por sí sola dónde quedó instalada. A1 identifica la posición asignada a esa unidad en la fila. La tripulación debe poder relacionar ambos datos con la ubicación exacta en la aeronave.",
    },
    { kind: "sub", text: "Cómo leer el formulario: del vuelo a cada fila" },
    {
      kind: "p",
      text: "Empieza por el encabezado: lugar de carga, vuelo, fecha y matrícula deben corresponder a la operación que se va a realizar. Después verifica quién preparó la información. En la tabla, no leas una columna aislada: une denominación, peligros, cantidad y posición de una misma fila. Las quince columnas del ejemplo agrupan estos datos:",
    },
    {
      kind: "kv",
      items: [
        { k: "1–3 · Envío", v: "Destino, referencia de guía aérea o nota de consignación y denominación oficial de transporte. La denominación no es una marca comercial." },
        { k: "4–6 · Identidad y riesgos", v: "Clase o división, número ONU o ID y riesgo secundario cuando corresponda. El número identifica la entrada; la clase y el riesgo secundario describen peligros distintos." },
        { k: "7–8 · Bultos y cantidad", v: "Número de bultos y cantidad neta de material no radiactivo, con su unidad. Dos cajas no equivalen automáticamente a dos litros." },
        { k: "9–10 · Material radiactivo", v: "Índice de transporte y categoría del bulto radiactivo cuando aplican. No rellenes esos campos por analogía para una mercancía de otra clase." },
        { k: "11–13 · Condiciones", v: "Grupo de embalaje si la entrada lo tiene asignado; el campo «Code» se interpreta con el formato del explotador. CAO indica «Cargo Aircraft Only» cuando corresponde. Un campo vacío no autoriza a inferir una excepción." },
        { k: "14 · Ubicación", v: "Unidad de carga y posición donde quedó instalado el envío. Un ULD identifica la unidad; la posición ubica esa unidad en la aeronave." },
        { k: "15 · Respuesta de emergencia", v: "El formulario aportado reserva una columna para el código de respuesta de emergencia. Ese código remite a la información aplicable; por sí solo no es una maniobra ni sustituye los procedimientos de la aeronave." },
      ],
    },
    {
      kind: "p",
      text: "UN 1263 identifica la entrada de mercancía; PAINT es su denominación oficial de transporte. La clase 3 describe el peligro principal: líquido inflamable. El grupo de embalaje II, cuando está asignado a ese producto, expresa su grado de peligro para los requisitos de embalaje. Ninguno de esos datos indica dónde está cargado el envío.",
    },
    {
      kind: "p",
      text: "«2 bultos» cuenta embalajes exteriores, no litros ni kilogramos. «1 L por bulto» expresa la cantidad de producto en cada uno en este ejemplo. Si leyeras «2 bultos» como «2 L», perderías una distinción importante. Para otros envíos la cantidad puede expresarse de otra forma, y existen reglas especiales; por eso se lee la unidad y el criterio del campo, no solo la cifra.",
    },
    {
      kind: "p",
      text: "La clase y el número ONU no sustituyen una evaluación de emergencia. Si aparece un riesgo secundario, se muestra además del principal: informa de otro peligro relevante del mismo envío. En el ejemplo PAINT no hay un riesgo secundario indicado; un guion en un campo opcional no debe interpretarse como «no existe ningún riesgo». La información adicional depende de la mercancía.",
    },
    { kind: "sub", text: "Por qué importa la posición" },
    {
      kind: "p",
      text: "«Bodega delantera» puede orientar, pero no siempre basta para reconocer una posición concreta. En un NOTOC operacional, el código y la identificación del ULD se interpretan con la convención de la aeronave y del explotador. Si la carga terminó en una posición distinta de la informada, debe aclararse y actualizarse la información antes de salir. Durante el vuelo, la posición ayuda a relacionar una anomalía con la mercancía a bordo.",
    },
    { kind: "sub", text: "El grupo de embalaje no aparece en todas las mercancías" },
    {
      kind: "p",
      text: "UN 3480 — LITHIUM ION BATTERIES pertenece a la clase 9, pero no tiene grupo de embalaje asignado. Las baterías se rigen por criterios y requisitos específicos; no se les asigna automáticamente I, II o III como ocurre con determinadas sustancias. «Sin grupo de embalaje» no significa «sin riesgo», ni vuelve permitido un envío que tenga otras restricciones.",
    },
    { kind: "sub", text: "Recibir, comprender y conservar la información" },
    {
      kind: "p",
      text: "El explotador entrega al piloto la información de mercancías peligrosas a tiempo antes de la salida. El piloto confirma su recepción y, cuando la norma o el procedimiento aplicable exige firma, la firma antes del transporte. La información debe quedar a su alcance durante el vuelo. Esta secuencia existe para que la tripulación sepa qué lleva el avión sin tener que reconstruirlo en una emergencia.",
    },
    {
      kind: "callout",
      tone: "info",
      title: "Qué no certifica esa firma",
      text: "Recibir y firmar el NOTOC no significa que el piloto clasificó la mercancía, preparó el embalaje o inspeccionó físicamente cada bulto. Esos controles tienen responsables y procedimientos propios. Si la información presenta una discrepancia operacional, el piloto pide aclaración antes de la salida.",
    },
    {
      kind: "p",
      text: "Una fecha o vuelo que no corresponden, una ubicación incompleta, una cantidad sin unidad o un grupo de embalaje atribuido a una mercancía que no lo utiliza son señales para preguntar. La tripulación no corrige la clasificación por intuición ni elabora el documento por su cuenta; solicita que el responsable contraste el envío y proporcione información coherente.",
    },
    { kind: "sub", text: "Usarlo ante una situación anormal" },
    {
      // Fotografía original del briefing; no reproduce el formulario aportado.
      kind: "figura",
      src: "/modulos/mercancias/img-27-briefing-notoc.webp",
      alt: "Dos pilotos revisan una hoja tabulada durante el briefing antes de la salida, mientras se carga la aeronave.",
      ancho: 1536,
      alto: 1024,
      pie: "En el briefing, contrasta la información recibida con la carga final. Si un campo está pendiente o la posición cambió, solicita la aclaración antes de salir.",
    },
    {
      kind: "p",
      text: "En una anomalía, la tripulación sigue primero los procedimientos aplicables. El NOTOC ayuda a interpretar qué mercancías están a bordo y dónde, y a comunicar datos útiles cuando la situación lo permite. La respuesta concreta no se improvisa a partir de una etiqueta o de un número de clase: se usa la información de emergencia y el procedimiento del operador.",
    },
    {
      kind: "enLaOperacion",
      momento: "En el briefing previo a la salida",
      texto: "El NOTOC de estudio indica dos bultos UN 1263 PAINT en el ULD AKE 12345, posición A1. El equipo de carga informa que la unidad terminó en otra posición. No basta con recordar el cambio: antes de salir, se aclara la discrepancia y se recibe la información actualizada según el procedimiento del operador.",
    },
    {
      kind: "detalleTecnico",
      etiqueta: "Consultar los campos y las excepciones aplicables",
      bloques: [
        {
          kind: "p",
          text: "El formato del NOTOC puede variar entre explotadores. Las Instrucciones Técnicas vigentes establecen qué envíos requieren información al piloto y qué datos debe incluir. Entre ellos figuran, según corresponda, fecha del vuelo, guía aérea cuando se haya emitido, denominación oficial y número ONU o ID, clase o división, riesgo secundario, grupo de embalaje cuando esté asignado, número de bultos, cantidad y ubicación exacta. Para material radiactivo hay datos particulares como categoría e índice de transporte cuando aplique.",
        },
        {
          kind: "p",
          text: "No todos los envíos de mercancías peligrosas siguen el mismo régimen de notificación; algunas excepciones están previstas expresamente. También pueden existir indicaciones adicionales o información de respuesta en el formato del operador. No conviertas el guion de un campo en una regla general.",
        },
        {
          kind: "norma",
          texto: "En Colombia, la sección 175.515 del RAC 175 exige que la información escrita al piloto se entregue antes de la salida, que el piloto al mando la firme antes del transporte y que permanezca a su alcance durante el vuelo. La aplicación concreta se lee junto con las Instrucciones Técnicas vigentes y los procedimientos del explotador.",
        },
      ],
    },
  ],
}
