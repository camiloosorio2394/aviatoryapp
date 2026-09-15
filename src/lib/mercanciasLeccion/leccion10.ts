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
      // MP-IMG-22 · Documento explicado sobre fotografía · 3:2 · 1200×800.
      kind: "figura",
      src: "/modulos/mercancias/img-22-notoc-panorama.webp",
      alt: "Documento de estudio NOTOC sobre una mesa de operaciones. Cuatro zonas grandes identifican los datos del vuelo, la mercancía peligrosa, los bultos con su cantidad y ubicación, y la recepción por el piloto. El vuelo AV 0001, el ULD AKE 12345 y la posición A1 son ficticios.",
      ancho: 1200,
      alto: 800,
      pie: "Primero reconoce las cuatro áreas del documento. El formato es didáctico: los datos del vuelo, ULD y posición no corresponden a una operación real ni constituyen un NOTOC vigente.",
    },
    {
      kind: "p",
      text: "El NOTOC no sustituye la declaración del expedidor. Esta describe el envío para su transporte; el explotador realiza la aceptación y prepara la información que necesita la operación. Al piloto se le debe entregar una información clara y legible, a tiempo antes de la salida y disponible durante el vuelo. El diseño de la hoja puede cambiar entre operadores; su propósito no.",
    },
    { kind: "sub", text: "Una línea representa carga real" },
    {
      kind: "p",
      text: "Piensa en dos bultos cargados en una unidad de carga (ULD). Una línea de información debe permitir reconocer qué mercancía contienen, cuánto hay y dónde quedó esa unidad en la aeronave. La fotografía muestra los tres objetos físicos: bultos, ULD y área de carga. Los bultos de la imagen no son el envío UN 1263 del ejemplo; sirven para visualizar la relación.",
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
      text: "Un ULD reúne y sujeta carga. Su identificación, como AKE 12345 en el ejemplo, señala cuál unidad se utilizó; no dice por sí sola dónde quedó instalada. La posición A1 es un código ficticio de este ejercicio. En un vuelo real, el sistema del operador debe permitir relacionar la unidad con su ubicación exacta.",
    },
    { kind: "sub", text: "Leer una mercancía, dato por dato" },
    {
      // MP-IMG-28 · Fotografía explicada · 16:9 · 1600×900.
      kind: "figura",
      src: "/modulos/mercancias/foto-10-anatomia-notoc.webp",
      alt: "Fotografía realista de un NOTOC de estudio sobre una mesa de operaciones, con flechas que señalan los datos del vuelo, mercancías peligrosas, carga especial, firma y fecha.",
      ancho: 1600,
      alto: 900,
      pie: "La fotografía explica cómo leer los campos del documento. El formato, el vuelo y los datos mostrados son didácticos y no constituyen un NOTOC vigente.",
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
      // MP-IMG-29 · Fotografía explicada · 16:9 · 1600×900.
      kind: "figura",
      src: "/modulos/mercancias/foto-10-ubicacion-uld.webp",
      alt: "Fotografía realista de una plataforma de carga junto a una aeronave. Flechas señalan los bultos, la unidad de carga ULD y la posición de carga en la aeronave.",
      ancho: 1600,
      alto: 900,
      pie: "La ubicación exacta relaciona la información con una zona real de la aeronave. Los códigos de posición y ULD cambian según la flota y el explotador.",
    },
    {
      kind: "p",
      text: "«Bodega delantera» puede orientar, pero no siempre basta para reconocer una posición concreta. En un NOTOC operacional, el código y la identificación del ULD se interpretan con la convención de la aeronave y del explotador. Si la carga terminó en una posición distinta de la informada, debe aclararse y actualizarse la información antes de salir. Durante el vuelo, la posición ayuda a relacionar una anomalía con la mercancía a bordo.",
    },
    { kind: "sub", text: "El grupo de embalaje no aparece en todas las mercancías" },
    {
      // MP-IMG-30 · Dos fotografías explicadas · 16:9 · 1600×900.
      kind: "figura",
      src: "/modulos/mercancias/foto-10-grupo-embalaje.webp",
      alt: "Composición fotográfica de dos bultos: a la izquierda mercancías clase 8 con grupos de embalaje I y III; a la derecha un bulto UN 3480 clase 9 con el rótulo sin grupo. La imagen explica que el grupo depende de la entrada de la mercancía.",
      ancho: 1600,
      alto: 900,
      pie: "Son fotografías de estudio independientes, no dos líneas sugeridas para el mismo vuelo. UN 3480 como batería de ion-litio suelta está sometida a condiciones propias.",
    },
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
      // MP-IMG-31 · Fotografía explicada · 16:9 · 1600×900.
      kind: "figura",
      src: "/modulos/mercancias/foto-10-anormal.webp",
      alt: "Fotografía realista de un NOTOC de estudio con una explicación sobre situación anormal: seguir el procedimiento de la aeronave, consultar el NOTOC e informar al ATS cuando la situación lo permita.",
      ancho: 1600,
      alto: 900,
      pie: "El NOTOC aporta identidad, riesgo y ubicación. No sustituye el QRH, la guía de respuesta ni las prioridades de control de la aeronave.",
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
          text: "El ejemplo visual no es una plantilla reglamentaria. Las Instrucciones Técnicas vigentes establecen qué envíos requieren información al piloto y los datos que deben aparecer. Entre ellos figuran, según corresponda, fecha del vuelo, guía aérea cuando se haya emitido, denominación oficial y número ONU o ID, clase o división, riesgo secundario, grupo de embalaje cuando esté asignado, número de bultos, cantidad y ubicación exacta. Para material radiactivo hay datos particulares como categoría e índice de transporte cuando aplique.",
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
