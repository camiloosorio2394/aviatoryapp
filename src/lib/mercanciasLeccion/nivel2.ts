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
      { kind: "p", text: "Hay tres conceptos que debes aprender a diferenciar." },
      {
        kind: "kv",
        items: [
          { k: "Clase", v: "Indica qué tipo de riesgo presenta la mercancía." },
          {
            k: "Grupo de embalaje",
            v: "Cuando aplica, indica el grado de riesgo de la sustancia dentro de su clasificación.",
          },
          {
            k: "Cantidades limitadas y exceptuadas",
            v: "Establecen condiciones específicas de transporte para determinadas mercancías cuando se encuentran en cantidades pequeñas.",
          },
        ],
      },
      { kind: "definicion", text: "No son tres niveles de una misma escala. Son conceptos diferentes." },
      {
        kind: "callout",
        tone: "tip",
        title: "Seamos honestos con lo que te toca a ti",
        text: "Como piloto, tú no asignas el grupo de embalaje ni decides si una mercancía puede transportarse como cantidad limitada o exceptuada. Estas determinaciones corresponden a las etapas de clasificación, preparación y aceptación de la mercancía. Lo que sí necesitas saber es qué significa la información que recibes y reconocer cuándo algo necesita ser verificado.",
      },

      { kind: "sub", text: "Grupo de embalaje" },
      {
        kind: "p",
        text: "El grupo de embalaje se utiliza para indicar el grado de riesgo de determinadas sustancias peligrosas. Cuando aplica, se identifica con números romanos:",
      },
      { kind: "code", text: "I · II · III", grande: true },
      {
        kind: "p",
        text: "El Grupo I corresponde al mayor grado de riesgo, el Grupo II a un grado intermedio y el Grupo III al menor grado de riesgo dentro de los criterios establecidos.",
      },
      {
        kind: "p",
        text: "El grupo de embalaje no indica cuánto se transporta. La cantidad permitida depende de otros factores establecidos para cada mercancía, como su número ONU, instrucción de embalaje, tipo de aeronave y régimen de transporte.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Importante",
        text: "No todas las mercancías peligrosas tienen grupo de embalaje.",
      },
      {
        kind: "hueco",
        rotulo: "MP-DIA-04 · Diagrama · 16:9 · 1600×900 · SVG",
        descripcion:
          "Tres conceptos en paralelo, en tres columnas separadas y sin flechas que las encadenen. La primera, la clase (1 a 9): qué tipo de riesgo presenta la mercancía. La segunda, el grupo de embalaje (I, II, III), cuando aplica: el grado de riesgo dentro de su clasificación. La tercera, el régimen de cantidad (limitada, exceptuada): las condiciones específicas de transporte cuando la cantidad es pequeña. Lo que debe quedar claro al verlo es que responden preguntas distintas, no que sean tres peldaños de una escala.",
        alto: 300,
      },

      { kind: "sub", text: "¿Por qué existen tres grupos?" },
      {
        kind: "p",
        text: "Dos sustancias pueden pertenecer a la misma clase y, aun así, tener diferentes grados de riesgo.",
      },
      {
        kind: "p",
        text: "Por ejemplo, dos sustancias pueden ser Clase 8, corrosivas, pero una puede cumplir los criterios para Grupo I y otra para Grupo III.",
      },
      {
        kind: "p",
        text: "Por eso, conocer solamente la clase no siempre es suficiente para conocer las condiciones de embalaje aplicables.",
      },
      {
        kind: "p",
        text: "La clase te dice qué tipo de riesgo presenta la mercancía. El grupo de embalaje añade información sobre el grado de riesgo cuando este criterio aplica.",
      },
      {
        kind: "hueco",
        rotulo: "MP-IMG-14 · Fotografía · 3:2 · 1200×800",
        descripcion:
          "Dos bultos juntos en una terminal de carga, los dos con el rombo blanco y negro de la clase 8. En las marcas se distingue que uno declara grupo de embalaje I y el otro III: misma clase, distinto grado de riesgo y, por eso, distinto embalaje.",
        alto: 320,
        ratio: "3 / 2",
      },

      { kind: "sub", text: "No todas las mercancías tienen grupo de embalaje" },
      {
        kind: "p",
        text: "El grupo de embalaje no se asigna a todas las mercancías peligrosas. Se utiliza únicamente cuando las características de la sustancia y las reglas de clasificación de esa mercancía establecen un grado de peligro mediante Grupo de Embalaje I, II o III.",
      },
      {
        kind: "p",
        text: "Hay mercancías cuya clasificación utiliza otros criterios y, por eso, no tienen Grupo de Embalaje. Esto no significa que sean menos peligrosas ni que tengan un tratamiento más flexible. Simplemente, el sistema de clasificación aplicable a esa mercancía no utiliza los grupos I, II y III.",
      },
      {
        kind: "p",
        text: "Un ejemplo muy importante en aviación son las baterías de ion-litio UN 3480. Se clasifican como Clase 9, pero no tienen Grupo de Embalaje asignado. Su transporte se controla mediante requisitos específicos relacionados con las características de la batería, su estado de carga, embalaje, cantidades y demás condiciones establecidas en las Instrucciones Técnicas.",
      },
      { kind: "p", text: "Por eso:" },
      { kind: "code", text: "UN 3480 — LITHIUM ION BATTERIES — Clase 9 — GE II", grande: true },
      {
        kind: "p",
        text: "sería una información que debe verificarse, porque UN 3480 no utiliza GE I, II o III.",
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Ver qué clases llevan grupo de embalaje y cuáles no",
        bloques: [
          {
            kind: "p",
            text: "El grupo de embalaje solo aplica donde el riesgo se gradúa así. Hay clases que se ordenan de otra manera: los explosivos por división, los gases por su comportamiento y el material radiactivo por su nivel de radiación.",
          },
          {
            kind: "fichas",
            columnas: 2,
            items: [
              {
                titulo: "Sí llevan grupo de embalaje",
                puntos: [
                  "Clase 3, líquidos inflamables.",
                  "Clase 4, salvo las sustancias de reacción espontánea de la 4.1.",
                  "División 5.1, comburentes.",
                  "División 6.1, tóxicas.",
                  "Clase 8, corrosivas.",
                  "Clase 9, según la sustancia.",
                ],
              },
              {
                titulo: "No llevan",
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
      {
        kind: "hueco",
        rotulo: "MP-IMG-15 · Fotografía · 3:2 · 1200×800",
        descripcion:
          "Una batería de ion-litio de equipo, con su marcado UN 3480 y la etiqueta de clase 9 de litio a la vista. La foto tiene que dejar leer el marcado completo y que ahí no hay ningún número romano: es el ejemplo del texto.",
        alto: 320,
        ratio: "3 / 2",
      },

      { kind: "sub", text: "Cantidades limitadas y exceptuadas" },
      { kind: "p", text: "Ahora pasamos a otro concepto diferente." },
      {
        kind: "p",
        text: "Una mercancía peligrosa puede transportarse bajo diferentes regímenes de cantidad cuando las Instrucciones Técnicas establecen condiciones específicas para ello.",
      },
      {
        kind: "p",
        text: "Las dos categorías que debes diferenciar son cantidad limitada y cantidad exceptuada.",
      },
      { kind: "definicion", text: "No significan que la mercancía deje de ser peligrosa." },

      { kind: "sub", text: "Cantidad limitada" },
      {
        kind: "p",
        text: "Una cantidad limitada corresponde a una cantidad pequeña de una determinada mercancía peligrosa que puede transportarse bajo las condiciones específicas establecidas para este régimen.",
      },
      {
        kind: "p",
        text: "La mercancía continúa estando sujeta a requisitos de transporte y debe cumplir las condiciones de embalaje, marcado y demás requisitos que correspondan.",
      },
      {
        kind: "hueco",
        rotulo: "MP-IMG-16 · Fotografía · 3:2 · 1200×800",
        descripcion:
          "Un bulto pequeño con la marca de cantidad limitada: el cuadrado apoyado sobre una punta, con las mitades de arriba y de abajo negras y el centro en blanco. Lo que debe verse es que la marca va impresa en el bulto, porque un envío en cantidad limitada sigue siendo un envío declarado.",
        alto: 320,
        ratio: "3 / 2",
      },

      { kind: "sub", text: "Cantidad exceptuada" },
      {
        kind: "p",
        text: "Una cantidad exceptuada corresponde a cantidades muy pequeñas de determinadas mercancías peligrosas que, cuando cumplen las condiciones establecidas, pueden acogerse a determinadas excepciones del régimen general.",
      },
      { kind: "definicion", text: "Exceptuada no significa inofensiva." },
      {
        kind: "p",
        text: "Significa que la normativa establece un tratamiento específico para esa pequeña cantidad.",
      },
      {
        kind: "hueco",
        rotulo: "MP-IMG-17 · Fotografía · 3:2 · 1200×800",
        descripcion:
          "Una caja de laboratorio con la etiqueta de cantidad exceptuada: el rectángulo con las franjas en diagonal, el número de la clase arriba y el espacio para el nombre del expedidor. Al lado, para dar escala, los frascos pequeños que van dentro.",
        alto: 320,
        ratio: "3 / 2",
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Ver qué se admite en cantidades exceptuadas",
        bloques: [
          {
            kind: "p",
            text: "Esta tabla es del expedidor y de quien acepta. Está aquí para consulta, y porque en una entrevista técnica puede caer la pregunta de si una clase concreta admite cantidades exceptuadas.",
          },
          {
            kind: "table",
            head: ["Admitidas en cantidades exceptuadas", "Condición"],
            rows: [
              ["División 2.2", "Sin riesgos secundarios"],
              ["Clase 3", "Todas"],
              ["Clase 4", "Grupos de embalaje II y III"],
              ["División 5.1", "Grupos de embalaje II y III"],
              ["División 5.2", "Todas"],
              ["División 6.1", "Todas"],
              ["Clase 8", "Grupos de embalaje II y III"],
              ["Clase 9", "Solo sustancias; no hielo seco ni organismos modificados; ningún artículo"],
            ],
          },
          {
            kind: "vinetas",
            items: [
              "Si la lista de mercancías peligrosas trae «E0» para un artículo, ese artículo **no** puede ir en cantidades exceptuadas.",
              "Cada bulto en cantidad exceptuada lleva una etiqueta de al menos 100 × 100 mm.",
              "Las mercancías que en la lista traen la instrucción de embalaje «Y» son las que pueden ir en cantidades limitadas.",
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
