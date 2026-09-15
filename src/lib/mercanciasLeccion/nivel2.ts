/**
 * Nivel 2 · Identificación: las nueve clases, las etiquetas, los grupos de
 * embalaje y las cantidades, y las baterías de litio.
 *
 * Artículos contrastados con el RAC 175 (Edición original, marzo 2016). Las
 * cifras de pasajeros (vatios-hora, estado de carga) salen del Doc 9284,
 * Parte 8, y de la IATA DGR, que no están cargados en el proyecto: van con su
 * aviso de verificación, no como norma citada.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const NIVEL_2: DocScreen[] = [
  // ── 05 ──────────────────────────────────────────────────────────────────
  {
    n: 5,
    title: "Las nueve clases",
    kicker: "El sistema de clasificación",
    minutes: 6,
    blocks: [
      {
        kind: "p",
        text: "Todo lo que sube a un avión como mercancía peligrosa cabe en una de nueve clases. No son una lista de sustancias: son nueve tipos de peligro. Aprender las clases es aprender a preguntarse «¿qué hace esto si se rompe?».",
      },
      {
        kind: "norma",
        texto:
          "Las sustancias (incluyendo mezclas y soluciones) y los objetos que se someten a lo establecido en las Instrucciones Técnicas se incluyen en una de las nueve clases siguientes según el peligro o el más importante de los peligros que representen.",
      },
      {
        kind: "p",
        text: "Léelo dos veces: **una clase principal**, la del peligro que determina su clasificación. Una sustancia puede presentar además otros peligros, que se consideran riesgos secundarios y pueden aparecer en el etiquetado.",
      },
      {
        kind: "p",
        text: "Por ejemplo: recibes un envío identificado como **UN 1263 PAINT, Clase 3**. Aunque se trate simplemente de pintura, su clasificación te indica que el peligro principal es el de un líquido inflamable. Si además presenta un riesgo secundario, este deberá reflejarse de acuerdo con las reglas de etiquetado aplicables.",
      },
      {
        kind: "p",
        text: "La clasificación la recomienda el Comité de expertos de las Naciones Unidas, y constituye una base común para identificar los peligros en los diferentes modos de transporte.",
      },
      {
        kind: "definicion",
        text: "Riesgo secundario: el peligro adicional que una sustancia tiene además del principal. Lo declara el expedidor y se ve como segunda etiqueta en el bulto. Un líquido inflamable que además es tóxico lleva la etiqueta de clase 3 y la de 6.1.",
      },
      { kind: "sub", text: "Toca cada clase" },
      { kind: "clasesMP" },
      {
        kind: "enLaOperacion",
        momento: "En el NOTOC",
        texto:
          "En la información entregada al piloto al mando, la mercancía peligrosa aparece identificada, entre otros datos, por su clase o división: «3», «4.3», «5.1», «9». Esa cifra te da una primera indicación del peligro principal que presenta la mercancía y te permite interpretar rápidamente el riesgo asociado.\n\nPor ejemplo, si en el NOTOC encuentras UN 3480 — LITHIUM ION BATTERIES — Clase 9 — ULD AKE 12345, sabes que llevas baterías de ion-litio y, además, dónde están ubicadas. Si durante el vuelo se presenta humo, olor extraño o indicios de sobrecalentamiento, esta información permite identificar la mercancía involucrada y su ubicación para aplicar el procedimiento de emergencia establecido por el operador.\n\nLa clase te orienta sobre el peligro; la respuesta concreta depende de la mercancía, la información disponible y los procedimientos de emergencia aplicables.",
      },
    ],
  },

  // ── 06 ──────────────────────────────────────────────────────────────────
  {
    n: 6,
    title: "Etiquetas: de riesgo y de manipulación",
    kicker: "Leer un bulto sin preguntarle a nadie",
    minutes: 8,
    blocks: [
      {
        kind: "p",
        text: "Un bulto no habla. Dice lo que dice con lo que lleva pegado. Y aquí no vamos a listarte veinticinco etiquetas para que las memorices: vamos a ponerte delante un bulto real y a que lo leas tú.",
      },
      {
        kind: "reconoce",
        titulo: "Un bulto real, en la cinta",
        intro:
          "Esta caja está bien preparada. Todo lo que ves lo puso el expedidor antes de que saliera de su bodega. Pulsa cada número y averigua qué es cada cosa.",
        imagen: {
          src: "/modulos/mercancias/img-04-bulto-marcado.webp",
          alt: "Caja de cartón en una cinta transportadora con flechas de orientación, una etiqueta de expedición, la marca de especificación del embalaje y tres rombos de riesgo.",
          ancho: 727,
          alto: 463,
        },
        puntos: [
          {
            x: 20,
            y: 34,
            que: "Flechas de orientación",
            significa:
              "Etiqueta de manipulación que indica la posición correcta del bulto durante el transporte. Las dos flechas apuntan hacia arriba y se colocan en dos caras verticales opuestas del bulto.",
          },
          {
            x: 37,
            y: 30,
            que: "Etiqueta de expedición",
            significa:
              "Contiene los datos que permiten identificar y rastrear el envío, como el expedidor, el destinatario y el número de guía aérea (AWB). Forma parte de la trazabilidad del bulto desde su origen hasta su destino.",
          },
          {
            x: 22,
            y: 75,
            que: "Marca de especificación",
            significa:
              "`4GV/X17.3/S/18` junto al símbolo de la ONU. Esta marca identifica un embalaje certificado según una especificación de diseño y proporciona información sobre el tipo de embalaje, el grupo de embalaje que puede admitir, el estado de la materia y la masa máxima permitida, según corresponda. Su diseño ha sido sometido a los ensayos de desempeño exigidos, como caída, apilamiento y presión interna, de acuerdo con las especificaciones aplicables.",
          },
          {
            x: 48,
            y: 44,
            que: "Contaminante del medio ambiente",
            significa:
              "El símbolo del pez y el árbol muertos indica que la sustancia presenta un peligro para el medio ambiente, especialmente para el medio acuático. Esta marca puede acompañar al riesgo principal de la mercancía y no lo sustituye.",
          },
          {
            x: 40,
            y: 60,
            que: "Corrosivo · Clase 8",
            significa:
              "Rombo dividido en blanco y negro, con dos tubos de ensayo que muestran el líquido corrosivo atacando una mano y una superficie metálica. Identifica una sustancia corrosiva y señala que este es el riesgo principal del bulto.",
          },
          {
            x: 49,
            y: 70,
            que: "Tóxico · Clase 6",
            significa:
              "Calavera y tibias cruzadas sobre fondo blanco. Aquí aparece como **riesgo secundario**: por eso la esquina inferior lleva el 6 aunque el riesgo principal del bulto sea el de clase 8.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "La regla que resume el ejercicio",
        text: "Un rombo con número en la esquina inferior es **riesgo**. Un rectángulo o un dibujo sin número es **manipulación**. Los dos importan, pero solo uno te dice qué hay dentro.",
      },
      { kind: "sub", text: "Dos familias, dos preguntas distintas" },
      {
        kind: "p",
        text: "Cuando observas un bulto de mercancías peligrosas, puedes encontrar diferentes tipos de etiquetas y marcas. No todas cumplen la misma función: unas identifican qué riesgo presenta la mercancía, mientras que otras indican cómo debe manipularse, transportarse o mantenerse el bulto. Por eso es importante aprender a distinguirlas.",
      },
      {
        kind: "p",
        text: "Las **etiquetas de riesgo** permiten identificar el riesgo mediante el símbolo y el número de clase o división. Las **marcas y etiquetas de manipulación** proporcionan indicaciones específicas sobre el tratamiento del bulto, como mantenerlo en una determinada posición o protegerlo de ciertas condiciones. Un mismo bulto puede llevar varias indicaciones de ambas familias, dependiendo de las características de la mercancía y de las condiciones de transporte.",
      },
      {
        kind: "figura",
        src: "/infografias/mercancias/dos-familias.webp",
        alt: "Un bulto en una paleta con sus etiquetas señaladas. A la izquierda, las etiquetas de riesgo: clase 3 líquido inflamable como riesgo principal, y clase 8 corrosivo y clase 6 tóxico como riesgos secundarios. A la derecha, las marcas y etiquetas de manipulación: flechas de orientación, frágil y mantener alejado del calor.",
        ancho: 1536,
        alto: 1024,
        pie: "Toca la imagen para verla en grande. A la izquierda, qué es: identifica qué puede ocurrir con la mercancía. A la derecha, cómo se trata: indica cómo debe manejarse o transportarse.",
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Ver las 25 etiquetas con su especificación completa",
        bloques: [
          {
            kind: "p",
            text: "Las de riesgo, por clase. Cada ficha trae el símbolo, el fondo y las franjas tal como los describe la norma. Donde solo hay figura, sin colores descritos, la ficha lo dice.",
          },
          { kind: "etiquetasMP", grupo: "riesgo" },
          {
            kind: "p",
            text: "Y las de manipulación, que no llevan número de clase porque no describen un riesgo sino un cuidado.",
          },
          { kind: "etiquetasMP", grupo: "manipulacion" },
        ],
      },
      {
        kind: "norma",
        titulo: "Si no hay certeza de cuál es, no vuela",
        texto:
          "El explotador que cuente con la autorización para transportar mercancías peligrosas deberá poseer etiquetas adecuadas para su reposición, en los casos de desprendimiento o deterioro de la etiqueta; sin embargo, si no se tiene la certeza de cuál etiqueta corresponde, no se transportará la mercancía.",
      },
      {
        kind: "p",
        text: "Léelo despacio, porque es una de las pocas veces que la norma dice «no se transporta» sin condiciones. Una etiqueta que se cayó se repone. Una etiqueta que **nadie sabe cuál era** deja el bulto en tierra.",
      },
      {
        kind: "enLaOperacion",
        momento: "Cuando algo no cuadra",
        texto:
          "Ves un bulto con una etiqueta despegada a medias y nadie te sabe decir cuál era. No es un detalle administrativo: es el caso exacto que la norma resuelve dejándolo en tierra. Preguntar no te hace quisquilloso, te hace el último filtro que funcionó.",
      },
    ],
  },

  // ── 07 ──────────────────────────────────────────────────────────────────
  {
    n: 7,
    title: "Grupos de embalaje y cantidades",
    kicker: "Tres conceptos distintos",
    minutes: 7,
    blocks: [
      { kind: "p", text: "Al leer una mercancía peligrosa, responde tres preguntas distintas:" },
      {
        kind: "kv",
        items: [
          { k: "Clase", v: "¿Qué tipo de peligro presenta? Por ejemplo, clase 8: corrosivo." },
          {
            k: "Grupo de embalaje",
            v: "¿Qué grado de peligro tiene la sustancia? Solo existe si su entrada lo asigna.",
          },
          {
            k: "Cantidades limitadas y exceptuadas",
            v: "¿Puede usarse un régimen para cantidades pequeñas? Depende de la entrada y de sus condiciones.",
          },
        ],
      },
      {
        kind: "figura",
        src: "/modulos/mercancias/dia-04-tres-conceptos.webp",
        alt: "Tres ejemplos en una terminal de carga: la etiqueta de clase 8 señala el tipo de peligro; una tarjeta con grupo II señala el grado cuando aplica; y otro bulto con marca Y señala un régimen de cantidad limitada. Flechas y textos explican cada concepto.",
        ancho: 1200,
        alto: 800,
        pie: "Son ejemplos distintos. La clase se reconoce en la etiqueta; el grupo se confirma en la información del envío; la marca Y solo corresponde si la entrada permite cantidad limitada y se cumplen sus condiciones.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Qué te corresponde como piloto",
        text: "No asignas el grupo ni autorizas cantidades limitadas o exceptuadas: eso se determina en clasificación, preparación y aceptación. Tu tarea es interpretar la información que recibes y pedir verificación si un dato no cuadra.",
      },

      { kind: "sub", text: "Grupo de embalaje" },
      {
        kind: "p",
        text: "Cuando la entrada de la mercancía lo asigna, el grupo de embalaje (GE) indica el grado de peligro de la sustancia. Se escribe con números romanos:",
      },
      {
        kind: "fichas",
        columnas: 3,
        items: [
          { titulo: "GE I", puntos: ["Peligro elevado dentro de los criterios de clasificación que aplican a esa sustancia."] },
          { titulo: "GE II", puntos: ["Peligro intermedio. No significa que el envío pueda ir en cantidad limitada."] },
          { titulo: "GE III", puntos: ["Peligro menor dentro de esos criterios; no significa que sea inocuo."] },
        ],
      },
      {
        kind: "p",
        text: "El GE no es una cantidad ni autoriza un régimen de envío. Los límites por bulto y la instrucción de embalaje se consultan para la entrada concreta y el tipo de aeronave.",
      },
      { kind: "sub", text: "Misma clase, diferente grupo" },
      {
        kind: "p",
        text: "Dos sustancias corrosivas pueden ser clase 8 y, aun así, tener distinto grado de peligro: una puede ser GE I y otra GE III. Por eso, el rombo de clase no basta para conocer el grupo ni las condiciones de embalaje.",
      },
      {
        kind: "figura",
        src: "/modulos/mercancias/img-14-grupos-embalaje.webp",
        alt: "Dos bultos corrosivos de clase 8 señalados con flechas. Uno indica grupo de embalaje I, mayor grado de riesgo, y el otro grupo III, menor grado de riesgo.",
        ancho: 1200,
        alto: 800,
        pie: "El rombo indica la clase, no el grupo de embalaje. Confirma el GE I o III de cada entrada en la información del envío y aplica sus requisitos de embalaje.",
      },
      {
        kind: "enLaOperacion",
        momento: "Al contrastar la información",
        texto: "Si el bulto muestra clase 8 y la información del envío indica un GE, no lo infieras solo de la etiqueta: verifica que corresponda a la entrada de la mercancía. Si algo difiere, pide aclaración a aceptación antes de operar con ese dato.",
      },

      { kind: "sub", text: "No todas las mercancías tienen grupo de embalaje" },
      {
        kind: "p",
        text: "Algunas entradas no tienen GE, pero eso no significa menor peligro ni menos requisitos. Por ejemplo, las baterías de ion-litio UN 3480 son clase 9 y no tienen grupo asignado; sus condiciones se consultan en la instrucción de embalaje aplicable, que contempla aspectos como el estado de carga y el tipo de aeronave.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Ejemplo de dato que no cuadra",
        text: "Si lees «UN 3480, baterías de ion-litio, clase 9, GE II», no lo des por válido: UN 3480 no tiene GE. Solicita que se verifique la información; no asignes tú un grupo ni corrijas el documento por cuenta propia.",
      },
      {
        kind: "figura",
        src: "/modulos/mercancias/img-15-un3480-sin-grupo.webp",
        alt: "Bulto de baterías de ion-litio con el número UN 3480 y la etiqueta de clase 9 señalados. Un tercer aviso muestra que no aparece grupo de embalaje I, II ni III.",
        ancho: 1200,
        alto: 800,
        pie: "UN 3480 pertenece a la clase 9, pero no tiene grupo de embalaje asignado.",
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Qué entradas pueden llevar grupo de embalaje",
        bloques: [
          {
            kind: "p",
            text: "El GE se asigna a determinadas sustancias, no a una clase entera por defecto. Otras mercancías se clasifican con criterios diferentes: los explosivos por división, los gases por su comportamiento y el material radiactivo por su nivel de radiación.",
          },
          {
            kind: "fichas",
            columnas: 2,
            items: [
              {
                titulo: "Pueden llevar GE según la entrada",
                puntos: [
                  "Sustancias de clase 3 (líquidos inflamables).",
                  "Sustancias de clase 4, salvo las de reacción espontánea de la 4.1.",
                  "Sustancias de división 5.1 (comburentes).",
                  "Sustancias de división 6.1 (tóxicas).",
                  "Sustancias de clase 8 (corrosivas).",
                  "Algunas sustancias de clase 9.",
                ],
              },
              {
                titulo: "No se les asigna GE",
                puntos: [
                  "Clase 1, explosivos: se ordenan por división.",
                  "Clase 2, gases.",
                  "Clase 7, material radiactivo: se categoriza por radiación.",
                  "División 5.2, peróxidos orgánicos.",
                  "División 6.2, infecciosas.",
                  "Sustancias de reacción espontánea de la 4.1.",
                  "**Baterías de litio**, aunque sean clase 9.",
                ],
              },
            ],
          },
          {
            kind: "norma",
            texto:
              "Para los fines de embalaje las sustancias que no sean de las clases 1, 2 y 7, divisiones 5.2 y 6.2 y otras sustancias de reacción espontánea de la división 4.1, se asignan a los tres grupos de embalaje de acuerdo con el grado de peligro que representan: grupo de embalaje I, sustancias que presentan gran peligro; grupo de embalaje II, sustancias que presentan peligro intermedio; grupo de embalaje III, sustancias que presentan escaso peligro.",
          },
        ],
      },
      { kind: "sub", text: "Cantidades limitadas y exceptuadas" },
      {
        kind: "p",
        text: "Un bulto pequeño sigue pudiendo contener mercancía peligrosa. Cantidad limitada y cantidad exceptuada son dos regímenes distintos que solo se usan si la entrada concreta los permite y el envío cumple sus límites, embalaje y marcas. El tamaño del bulto, por sí solo, no autoriza ninguno de los dos; tampoco cambia la clase ni el grupo de embalaje.",
      },

      { kind: "sub", text: "Cantidad limitada" },
      {
        kind: "p",
        text: "En transporte aéreo, la cantidad limitada requiere que la entrada permita una instrucción de embalaje «Y» y que el bulto cumpla los límites y requisitos correspondientes. La marca Y identifica este régimen; no autoriza por sí sola el envío.",
      },
      {
        kind: "figura",
        src: "/modulos/mercancias/img-16-cantidad-limitada.webp",
        alt: "Bulto pequeño con la marca aérea de cantidad limitada impresa. Las flechas señalan el rombo y la letra Y en su centro.",
        ancho: 1200,
        alto: 800,
        pie: "La Y señala cantidad limitada por vía aérea. Aun con esa marca, deben cumplirse la instrucción, los límites y la documentación que correspondan.",
      },

      { kind: "sub", text: "Cantidad exceptuada" },
      {
        kind: "p",
        text: "La cantidad exceptuada se reserva para cantidades muy pequeñas de entradas que tengan un código E que la permita. Ese código fija límites por envase interior y bulto exterior, además de reglas propias de embalaje y marcado; E0 significa que no se admite este régimen. «Exceptuada» no quiere decir que la sustancia sea inofensiva, sino que el envío cumple condiciones específicas para esa pequeña cantidad.",
      },
      {
        kind: "figura",
        src: "/modulos/mercancias/img-17-cantidad-exceptuada.webp",
        alt: "Caja de laboratorio con marca de cantidad exceptuada. Las flechas señalan la clase en la parte superior, el expedidor en la parte inferior y tres frascos interiores pequeños junto al bulto.",
        ancho: 1200,
        alto: 800,
        pie: "La marca de cantidad exceptuada no indica ausencia de peligro: señala un régimen específico cuando la entrada y el bulto cumplen sus condiciones.",
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Cómo comprobar los regímenes por entrada",
        bloques: [
          {
            kind: "p",
            text: "La clase por sí sola no autoriza cantidades exceptuadas o limitadas. El expedidor y aceptación consultan la entrada de la mercancía en las Instrucciones Técnicas vigentes, junto con las variaciones de Estado y explotador que correspondan.",
          },
          {
            kind: "kv",
            items: [
              { k: "Código E0", v: "La entrada no admite cantidades exceptuadas." },
              { k: "Códigos E1 a E5", v: "Consulta los límites por envase interior y bulto exterior, además de las condiciones de embalaje y marcado." },
              { k: "Instrucción Y", v: "Indica la opción de cantidad limitada por vía aérea, con límites y requisitos propios." },
            ],
          },
          {
            kind: "vinetas",
            items: [
              "Un código E distinto de E0 no basta por sí solo: el bulto debe cumplir los límites, el embalaje y la marca de cantidad exceptuada.",
              "Una instrucción Y tampoco basta por sí sola: hay que cumplir sus cantidades máximas, embalaje, marca y documentación aplicable.",
              "En entrevista, responde **qué entrada y qué régimen verificas**, no «toda la clase está admitida».",
            ],
          },
        ],
      },
    ],
  },

  // ── 08 ──────────────────────────────────────────────────────────────────
  {
    n: 8,
    title: "Baterías de litio",
    kicker: "El artículo más frecuente",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "Están en el bolsillo de cada pasajero, en la bodega como carga y en la silla de ruedas del que embarca de último. Ninguna otra mercancía peligrosa sube tantas veces al día a un avión. Por eso tiene lección propia, y por eso empieza con un accidente.",
      },
      {
        kind: "casoReal",
        titulo: "UPS Airlines 6",
        fecha: "3 de septiembre de 2010",
        lugar: "Dubái, Emiratos Árabes Unidos",
        aeronave: "Boeing 747-44AF · N571UP · Dubái a Colonia",
        mercancia: "Carga con más de 81.000 baterías de litio y otros materiales combustibles en una paleta de la cubierta principal.",
        queOcurrio: [
          "Veintidós minutos después del despegue la tripulación recibió la alarma de incendio en la cubierta principal. El humo entró a la cabina de mando en pocos minutos: el primer oficial no alcanzaba a ver el panel de radio y el capitán quedó incapacitado cuando falló su suministro de oxígeno.",
          "El avión no consiguió volver a Dubái. Murieron los dos pilotos.",
        ],
        consecuencia:
          "La GCAA de los Emiratos concluyó que el incendio se originó por autoignición del contenido de una paleta que llevaba baterías de litio y otros materiales combustibles. Después del accidente la OACI endureció las condiciones de las baterías de litio como carga y varias autoridades revisaron la protección contra el humo en cabina.",
        leccion:
          "Cuando el humo llena la cabina, lo único que queda es lo que ya estaba a bordo y lo que la tripulación ya sabía. Por eso la norma exige que la información de las mercancías esté al alcance del comandante durante el vuelo y que la de emergencia esté disponible de inmediato. Una batería de litio en fuga térmica no es un incendio más: produce su propio calor, se reaviva y llena de humo un espacio del que no se puede salir.",
        imagen: {
          src: "/modulos/mercancias/img-03-ups-six.webp",
          alt: "Imagen de referencia del accidente del Boeing 747 de carga de UPS, cuyo incendio se originó en una carga de baterías de litio.",
        },
      },
      { kind: "sub", text: "Qué es la fuga térmica" },
      {
        kind: "definicion",
        text: "Una celda de litio dañada, sobrecargada o en cortocircuito se calienta. El calor descompone los materiales de dentro, que producen más calor y gases inflamables, y el calor pasa a la celda de al lado. Es una reacción que se alimenta sola: produce fuego que se reaviva y no se apaga quitándole el oxígeno, porque el oxígeno lo pone la propia celda.",
      },
      {
        kind: "figura",
        src: "/modulos/mercancias/ilu-02-fuga-termica.webp",
        alt: "La fuga térmica paso a paso: una celda de litio se calienta, sus materiales se descomponen y liberan gas, y el calor alcanza a la celda vecina.",
        ancho: 1400,
        alto: 788,
        pie: "La reacción se alimenta sola: cada celda que entra calienta a la siguiente.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Ion litio (recargable)",
            puntos: [
              "Teléfonos, portátiles, power banks, cámaras, herramientas, vehículos eléctricos.",
              "Su tamaño se mide en vatios-hora (Wh). Es la cifra que fija qué puede llevar un pasajero.",
              "Los números ONU salen de la lista de mercancías peligrosas de las Instrucciones Técnicas.",
            ],
          },
          {
            titulo: "Litio metálico (no recargable)",
            puntos: [
              "Pilas de cámaras, relojes, dispositivos médicos, sensores.",
              "Su tamaño se mide en gramos de litio.",
              "Menos frecuentes, pero con las mismas reglas de fondo: clase 9 y sin grupo de embalaje.",
            ],
          },
        ],
      },
      { kind: "sub", text: "Por qué son clase 9 y no llevan grupo de embalaje" },
      {
        kind: "p",
        text: "Una batería no arde como un líquido ni corroe como un ácido. Su riesgo es eléctrico y térmico, y no encaja en ninguna de las otras ocho clases: por eso es clase 9. Y lo que gobierna su transporte no es el grupo de embalaje, sino la instrucción de embalaje de las Instrucciones Técnicas, que fija cuántas van por bulto, con qué estado de carga y en qué tipo de aeronave.",
      },
      {
        kind: "norma",
        titulo: "La Sección II, nombrada en la norma",
        texto:
          "En caso que lo considere pertinente, la AAC podrá emitir una aprobación específica a un explotador no autorizado a transportar mercancías peligrosas, para el transporte de algunas mercancías peligrosas consideradas de riesgo menor (sustancias biológicas, Categoría B, baterías de litio embaladas según la Sección II de las instrucciones de embalaje, COMAT peligroso, mercancías peligrosas permitidas por correo).",
      },
      {
        kind: "p",
        text: "Ese «Sección II» es la clave para leer un envío de baterías. Las instrucciones de embalaje del litio tienen secciones: las baterías pequeñas, bien embaladas, van por la Sección II con menos exigencias; las grandes o en cantidad van por la Sección I con toda la norma. La norma regional las considera de riesgo menor justamente por eso, y tu reglamento nacional repite la lista casi palabra por palabra.",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Lo que dicen las Instrucciones Técnicas vigentes",
        text: "Desde el 1 de abril de 2016 las baterías de ion litio sueltas (UN 3480) están **prohibidas como carga en aeronaves de pasajeros** y solo van en carguero, con un estado de carga que no supere el 30 %. Los bultos llevan la etiqueta de clase 9 para litio (9A) y la marca de batería de litio. Estas reglas salen de las Instrucciones Técnicas y de la IATA DGR, que cambian con cada edición: antes de aplicarlas, verifícalas contra la edición en vigor y el manual de tu explotador.",
      },
      { kind: "sub", text: "Lo que puede llevar un pasajero" },
      {
        kind: "kv",
        items: [
          {
            k: "Repuestos y power banks",
            v: "Solo en cabina, nunca en bodega, con los terminales protegidos contra cortocircuito. En la bodega nadie ve ni atiende una fuga térmica.",
          },
          {
            k: "Hasta 100 Wh",
            v: "Sin aprobación del explotador. Es el caso de teléfonos, portátiles y la mayoría de los power banks.",
          },
          {
            k: "De 100 a 160 Wh",
            v: "Con aprobación del explotador y un máximo de dos repuestos por persona.",
          },
          {
            k: "Más de 160 Wh",
            v: "No como equipaje: solo como carga, bajo la norma completa.",
          },
          {
            k: "Equipo que baja a bodega",
            v: "Si un equipaje de mano con un dispositivo se baja a bodega en la puerta, el dispositivo va apagado y protegido.",
          },
          {
            k: "Vapeadores",
            v: "Solo en cabina y prohibido cargarlos a bordo.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Cifras para estudiar, no para el mostrador",
        text: "Los vatios-hora, los gramos y el número de unidades salen de las Instrucciones Técnicas y de la IATA DGR en su edición vigente, y de la política de tu explotador. Aquí están redondeados para aprender la regla.",
      },
      {
        kind: "norma",
        texto:
          "El explotador o el agente de despacho del explotador deberá asegurar el suministro de información sobre transporte de mercancías peligrosas instalando de manera destacada y en lugares visibles el número suficiente de letreros informativos en los puntos de aceptación de la carga, para así alertar a los expedidores y agentes respecto de las mercancías peligrosas que pueda haber en sus envíos de carga. Estos avisos deben incluir ejemplos visuales de las mercancías peligrosas, comprendidas las baterías.",
      },
      {
        kind: "p",
        text: "Ese «comprendidas las baterías» está en la norma regional y en la de cada país, con las mismas palabras. Dice bastante sobre cuál es la mercancía peligrosa que más se cuela sin declarar.",
      },
      { kind: "sub", text: "Cuando una batería falla en cabina" },
      {
        kind: "enLaOperacion",
        momento: "En vuelo",
        texto:
          "Las señales son olor, humo, chisporroteo, un dispositivo muy caliente o hinchado. Lo que sigue es la práctica que enseñan los explotadores y las guías de la industria; el procedimiento exacto es el de tu manual de operaciones y el del kit de contención de a bordo.",
        pasos: [
          "Avisar de inmediato a la cabina de mando (o a la de pasajeros, según dónde ocurra) y localizar el extintor y el kit.",
          "Si hay llama, el extintor de a bordo la apaga. Pero no apaga la reacción: la batería se va a volver a calentar.",
          "**Enfriar** con agua u otro líquido no inflamable, en abundancia: lo que hay que frenar es el calor que pasa a las celdas vecinas.",
          "No cubrirla y no moverla sin protección hasta que esté fría. Cubrirla no le quita el oxígeno, porque lo produce ella.",
          "Vigilarla hasta aterrizar, informar al comandante y, después, notificar el suceso (lección 12).",
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Un registro público que vale la pena conocer",
        text: "La FAA mantiene un registro público de incidentes con baterías de litio en aeronaves y aeropuertos de Estados Unidos, actualizado cada mes, con el tipo de dispositivo y dónde ocurrió. No hace falta memorizar cifras: basta saber que existe y que la mayoría de los eventos son power banks, teléfonos y vapeadores en cabina, no carga.",
      },
    ],
  },
]
