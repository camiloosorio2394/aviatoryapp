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
    minutes: 9,
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
        text: "Léelo dos veces: **una** clase, la del peligro **más importante**. Una sustancia inflamable y corrosiva no va en dos clases: va en una, y el otro peligro se trata como riesgo secundario y aparece en el etiquetado. La clasificación la recomienda el Comité de expertos de las Naciones Unidas, y por eso es la misma en aire, mar y tierra.",
      },
      {
        kind: "definicion",
        text: "Riesgo secundario: el peligro adicional que una sustancia tiene además del principal. Lo declara el expedidor y se ve como segunda etiqueta en el bulto. Un líquido inflamable que además es tóxico lleva la etiqueta de clase 3 y la de 6.1.",
      },
      { kind: "sub", text: "Toca cada clase" },
      { kind: "clasesMP" },
      {
        kind: "callout",
        tone: "warn",
        title: "Clase y división no son lo mismo",
        text: "La clase es el riesgo principal, del 1 al 9. La división es el subtipo dentro de la clase, y se escribe con un punto: `2.1` es un gas inflamable, dentro de la clase 2. Decir «clase 2.1» en una entrevista delata que no se entendió la diferencia.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "La numeración no es un ranking",
        text: "La clase 1 no es «más peligrosa» que la clase 9: son familias de riesgo distintas. Dentro de una clase, lo que gradúa el peligro es el grupo de embalaje (I gran peligro, II intermedio, III escaso), que no se asigna a las clases 1, 2 y 7 ni a las divisiones 5.2 y 6.2. Eso lo ves en la lección 07.",
      },
      { kind: "sub", text: "Cómo se leen los colores" },
      {
        kind: "p",
        text: "El color del rombo no es decoración: es la primera señal. El rojo es inflamable, el verde es gas que no arde, el amarillo es comburente, el blanco con calavera es tóxico y las siete franjas negras son la clase 9. Por eso hay clases que comparten color: la 3 y la 4 son rojas porque las dos arden, y verlo así es lo correcto. Y ojo con la 5: la 5.1 es amarilla, pero la 5.2 va roja arriba y amarilla abajo.",
      },
      {
        kind: "enLaOperacion",
        momento: "En el NOTOC",
        texto:
          "En la información al piloto al mando la clase aparece como una cifra: «3», «4.3», «9». Esa cifra te dice qué hace la mercancía si algo sale mal. Con una 4.3 en la bodega, el agua no es la respuesta; con una 5.1, lo que hay que alejar es cualquier cosa que arda. La clase es la primera lectura de emergencia, antes de abrir cualquier guía.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En plataforma, mientras haces la vuelta al avión",
        situacion:
          "Ves una paleta esperando a subir. Encima, un bulto con un **rombo rojo y una llama negra**, con un 3 en la esquina de abajo. Nadie te ha dicho nada todavía y el NOTOC aún no te ha llegado.",
        pregunta: "¿Qué sabes ya, solo con eso, y qué te falta por saber?",
        claves: [
          "**Ya sé:** rojo con llama es inflamable, y el 3 lo sitúa en líquidos inflamables. Arde, y arde con facilidad.",
          "**Ya sé:** eso va a aparecer en mi información escrita. Si luego no aparece, tengo un problema que resolver antes de salir.",
          "**Me falta:** cuánto hay, en qué bulto y **dónde va estibado**. Un litro y doscientos litros arden igual, pero se responden distinto.",
          "**Me falta:** si lleva riesgo secundario. Un segundo rombo cambiaría la respuesta ante una fuga.",
        ],
        cierre:
          "El rombo te da la mitad de la respuesta en dos segundos y desde diez metros. La otra mitad está en el papel que vas a firmar.",
      },
    ],
  },

  // ── 06 ──────────────────────────────────────────────────────────────────
  {
    n: 6,
    title: "Etiquetas: de riesgo y de manipulación",
    kicker: "Leer un bulto sin preguntarle a nadie",
    minutes: 9,
    blocks: [
      {
        kind: "p",
        text: "Un bulto no habla. Dice lo que dice con lo que lleva pegado. Y aquí no vamos a listarte veinticinco etiquetas para que las memorices: vamos a ponerte delante un bulto real y a que lo leas tú.",
      },
      {
        kind: "reconoce",
        titulo: "Un bulto real, en la cinta",
        intro:
          "Esta caja está bien preparada. Todo lo que ves lo puso el expedidor antes de que saliera de su bodega. Pulsa cada número y averigua qué es y por qué te importa a ti.",
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
              "Etiqueta de manipulación «posición del bulto». Dos flechas que indican hacia dónde va «arriba». Van en dos caras opuestas del bulto.",
            piloto:
              "Te dice que dentro hay líquido y que el cierre solo sella en esa posición. Si alguien lo estiba de lado o boca abajo, el contenido busca la tapa. Es la etiqueta más fácil de ignorar y la que más derrames evita.",
          },
          {
            x: 37,
            y: 30,
            que: "Etiqueta de expedición",
            significa:
              "Los datos del envío: expedidor, destinatario, número de guía. Es lo que permite rastrear el bulto y llegar a la declaración del expedidor.",
            piloto:
              "Tú no la usas en vuelo. Pero es el hilo que conecta esa caja con el papel que tú firmaste: si en el NOTOC hay un UN y nadie encuentra a qué bulto corresponde, se tira de aquí.",
          },
          {
            x: 22,
            y: 75,
            que: "Marca de especificación",
            significa:
              "«4GV/X17.3/S/18» con el símbolo de la ONU. Certifica que ese embalaje superó los ensayos de las Instrucciones Técnicas: caída, apilamiento, presión.",
            piloto:
              "Es la prueba de que la caja está diseñada para aguantar tu vuelo, no un camión. Marcar un embalaje como homologado sin serlo es una infracción, y es exactamente el tipo de fallo que no se ve hasta que hay humo.",
          },
          {
            x: 48,
            y: 44,
            que: "Contaminante del medio ambiente",
            significa:
              "El pez y el árbol muertos. Indica que la sustancia daña el medio ambiente acuático. Acompaña al riesgo principal, no lo sustituye.",
            piloto:
              "Cambia lo que se hace **después**: un derrame de esto no se barre y ya está. Si ocurre en tu avión, el aeródromo de destino tiene que saberlo para tratar el residuo.",
          },
          {
            x: 40,
            y: 60,
            que: "Corrosivo, clase 8",
            significa:
              "Rombo mitad blanco arriba, mitad negro abajo, con dos chorros que corroen una mano y una placa. Es el riesgo principal de este bulto.",
            piloto:
              "Ataca metal y piel. En una fuga te importa dónde está estibado (¿cerca de mandos, de cables?) y que nadie lo manipule sin los guantes largos de goma del equipo de emergencia.",
          },
          {
            x: 49,
            y: 70,
            que: "Tóxico, clase 6",
            significa:
              "Calavera y tibias cruzadas sobre fondo blanco. Aquí va como **riesgo secundario**: por eso la esquina inferior lleva el 6 pero el bulto es principalmente de clase 8.",
            piloto:
              "Una sola caja puede llevar dos rombos. Uno manda y el otro avisa. Si solo lees el primero, te pierdes la mitad del problema: esto además es tóxico.",
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
        kind: "figura",
        src: "/modulos/mercancias/img-05-panel-etiquetas.webp",
        alt: "Panel con las etiquetas de riesgo de las nueve clases: explosivos, gases, líquidos inflamables, sólidos inflamables, comburentes, tóxicos, infecciosos, radiactivo, corrosivos y riesgos varios.",
        ancho: 608,
        alto: 331,
        pie: "Todas las de riesgo juntas, como las verías en el cuadro que la terminal de carga tiene a la vista por obligación. Fíjate en que el color se repite entre clases: lo que identifica no es el color, es el símbolo con el número de la esquina.",
      },
      {
        kind: "definicion",
        text: "**De riesgo** responden a «¿qué es?». **De manipulación** responden a «¿cómo se trata?». Un bulto puede llevar varias de las dos, y llevarlas todas es lo normal, no lo raro.",
      },
      { kind: "sub", text: "Tres etiquetas a fondo" },
      {
        kind: "p",
        text: "De las veinticinco, estas tres son las que más te van a cambiar el día. Las otras están completas en el detalle del final.",
      },
      {
        kind: "fichas",
        columnas: 1,
        items: [
          {
            titulo: "① Líquido inflamable · clase 3",
            puntos: [
              "**Qué ves:** rombo rojo con una llama negra o blanca y un 3 en la esquina inferior.",
              "**Qué significa:** líquido que arde. El criterio son 60,5 °C en vaso cerrado o 65,6 °C en vaso abierto.",
              "**Qué te importa:** es la clase que más vas a ver, y la que más restricciones de flota arrastra. Pinturas, thinner, perfumes, adhesivos, combustible de muestra.",
              "**Ejemplo:** UN 1263 PAINT. Suena inofensivo hasta que recuerdas que es un líquido inflamable en una bodega presurizada.",
            ],
          },
          {
            titulo: "② Exclusivamente en aeronaves de carga · CAO",
            puntos: [
              "**Qué ves:** un rectángulo naranja con texto negro y la silueta de un avión de carga. No es un rombo: es de manipulación.",
              "**Qué significa:** esa cantidad de esa mercancía **no puede ir en una aeronave que lleve pasajeros**. Punto.",
              "**Qué te importa:** es la única etiqueta que puede sacar un bulto de tu vuelo. Si operas pasajeros y ese bulto aparece en tu bodega, no es un problema de estiba: no sube.",
              "**Ojo:** estibarlo lejos de la cabina no lo arregla. La prohibición es por tipo de aeronave, no por posición.",
            ],
            nota: "La norma no la matiza: no se estiban en aeronave ocupada por pasajeros los bultos que lleven esta etiqueta.",
          },
          {
            titulo: "③ Posición del bulto · flechas de orientación",
            puntos: [
              "**Qué ves:** dos flechas negras o rojas apuntando arriba, sobre fondo contrastado, en dos caras opuestas.",
              "**Qué significa:** ese bulto tiene un arriba y un abajo. Casi siempre es porque contiene líquido y el cierre solo sella en esa posición.",
              "**Qué te importa:** un bulto tumbado con líquido dentro es un derrame esperando. Es el fallo más frecuente y el más barato de evitar.",
              "**Ejemplo:** una batería de plomo-ácido de una unidad de tierra, tumbada en la paleta. El electrolito es corrosivo y busca la tapa.",
            ],
          },
        ],
      },
      {
        kind: "hueco",
        rotulo: "MP-ETQ-20 · Etiqueta CAO · 400×400 · PNG con fondo transparente",
        descripcion:
          "La etiqueta «Cargo Aircraft Only»: rectángulo naranja, texto negro, silueta de avión de carga. 120 × 110 mm en la realidad. Es la única etiqueta que puede sacar un bulto de un vuelo de pasajeros, así que merece verse grande.",
        alto: 220,
        ratio: "1 / 1",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En plataforma, vuelo de pasajeros",
        situacion:
          "Bajas a hacer la inspección exterior y ves, en el carro que espera junto a la bodega delantera, un bulto con un rectángulo naranja y la silueta de un avión. Tu vuelo lleva 148 pasajeros.",
        pregunta: "¿Qué acabas de ver y qué haces?",
        claves: [
          "Es una etiqueta **CAO**, «exclusivamente en aeronaves de carga». Es de manipulación, no de riesgo: no me dice qué hay dentro, me dice dónde no puede ir.",
          "En un vuelo con pasajeros ese bulto **no sube**. No es cuestión de estibarlo lejos ni de avisar a la tripulación.",
          "Lo hablo con el despachador o el agente de rampa antes de que se cargue, no después. Una vez a bordo, resolverlo cuesta una descarga.",
          "Y me pregunto por qué llegó hasta ahí: si el filtro de aceptación lo dejó pasar, puede que no sea el único.",
        ],
        cierre:
          "Reconocer esa etiqueta en dos segundos desde diez metros es, literalmente, lo que separa un vuelo normal de un incumplimiento notificable.",
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
    kicker: "Cuánto cuidado exige",
    minutes: 7,
    blocks: [
      {
        kind: "p",
        text: "Esta lección va de tres escalas que se confunden todo el rato. La clase dice **qué** peligro hay. El grupo de embalaje dice **cuánto**, dentro de esa clase. Y las cantidades exceptuadas y limitadas dicen **cuándo** el peligro es tan pequeño que la norma afloja.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Seamos honestos con lo que te toca a ti",
        text: "Tú no asignas grupos de embalaje ni decides si algo va en cantidad limitada: eso lo hace el expedidor y lo verifica la aceptación. Lo que sí haces es **leer un NOTOC y detectar cuando algo no cuadra**. Esta lección va de eso, y de las dos preguntas que caen en entrevista.",
      },
      {
        kind: "hueco",
        rotulo: "MP-DIA-04 · Diagrama · 16:9 · 1600×900 · SVG",
        descripcion:
          "Tres escalas en paralelo, como tres reglas verticales. La primera, la clase (1 a 9): qué peligro. La segunda, el grupo de embalaje (I, II, III): cuánto peligro dentro de esa clase. La tercera, el régimen de cantidad (plena, limitada, exceptuada): cuándo la norma afloja. Una flecha que cruza las tres mostrando que son preguntas distintas, no niveles de lo mismo.",
        alto: 300,
      },
      { kind: "sub", text: "Lo que ves escrito y qué significa" },
      {
        kind: "p",
        text: "En la información que te entregan, junto al número ONU y la clase, puede aparecer un número romano. Es el grupo de embalaje.",
      },
      {
        kind: "kv",
        items: [
          { k: "I", v: "Gran peligro. El embalaje más exigente y los límites de cantidad por bulto más bajos." },
          { k: "II", v: "Peligro intermedio. Es el que más vas a ver." },
          { k: "III", v: "Escaso peligro. Embalaje menos exigente y límites más holgados." },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Van en romanos, y no es un capricho",
        text: "Se escriben `I`, `II` y `III`. Confundir el I con un uno o el II con un once cambia el embalaje exigido y la cantidad admitida. Si en un documento ves «GE 2» en arábigos, alguien lo transcribió a mano y puede haber transcrito más cosas.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Repasando el NOTOC",
        situacion:
          "Lees tres líneas: «UN 1263 PAINT, clase 3, **GE II**», «UN 1830 SULPHURIC ACID, clase 8, **GE II**» y «UN 3480 LITHIUM ION BATTERIES, clase 9, **GE II**».",
        pregunta: "Una de las tres no puede estar bien. ¿Cuál y por qué?",
        claves: [
          "La tercera. Las **baterías de litio son clase 9 y no llevan grupo de embalaje**: lo que gobierna su transporte es la instrucción de embalaje y el estado de carga, no un grado de peligro.",
          "No es una errata inocente. Si quien preparó ese documento se inventó un GE, ¿qué más rellenó de memoria?",
          "Lo que haces con eso: preguntar antes de firmar. No para corregir la clasificación, que no es tuya, sino porque una incoherencia en el papel suele venir acompañada.",
          "Las otras dos están bien: pintura clase 3 y ácido sulfúrico clase 8 sí llevan grupo de embalaje, y el II es el más frecuente.",
        ],
        cierre:
          "Este es exactamente el nivel al que un piloto usa el grupo de embalaje: no para decidir nada, sino para detectar que el papel no cuadra.",
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
      { kind: "sub", text: "Exceptuadas y limitadas: por qué te importa la diferencia" },
      {
        kind: "p",
        text: "Las dos suenan a «esto es poca cosa», y las dos significan cosas distintas. La diferencia que te afecta es **cuál de las dos te llega a ti por escrito**.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Cantidades exceptuadas",
            puntos: [
              "Cantidades muy pequeñas, definidas en las Instrucciones Técnicas.",
              "Quedan fuera de casi todo el régimen: no generan la documentación de mercancías peligrosas.",
              "**Qué significa para ti:** normalmente **no aparecen en la información que firmas**. Van a bordo y tú no lo sabes.",
              "Y no pueden ir en equipaje ni en correo.",
            ],
          },
          {
            titulo: "Cantidades limitadas",
            puntos: [
              "Peligro menor, en embalajes de buena calidad probados a apilamiento y caída, con la marca impresa de cantidad limitada.",
              "Se identifican por la instrucción de embalaje «Y» en la lista.",
              "**Qué significa para ti:** siguen siendo mercancías peligrosas declaradas. Están en el régimen, con marca propia.",
              "Un envío en cantidad limitada es un envío que ves.",
            ],
          },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "La consecuencia que sí es tuya",
        text: "«Exceptuado» **no quiere decir inofensivo**: quiere decir que la norma lo dejó fuera de algunas obligaciones porque la cantidad es mínima. Si en vuelo aparece un olor o un humo que no corresponde a nada de tu NOTOC, recuerda que el NOTOC no lo lista todo. Es una de las razones por las que un incendio en bodega se trata como incendio de origen desconocido hasta que se demuestre lo contrario.",
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
    minutes: 8,
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
          "Vigilarla hasta aterrizar, informar al comandante y, después, notificar el suceso (lección 16).",
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Un registro público que vale la pena conocer",
        text: "La FAA mantiene un registro público de incidentes con baterías de litio en aeronaves y aeropuertos de Estados Unidos, actualizado cada mes, con el tipo de dispositivo y dónde ocurrió. No hace falta memorizar cifras: basta saber que existe y que la mayoría de los eventos son power banks, teléfonos y vapeadores en cabina, no carga.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En crucero, aviso de la tripulación de cabina",
        situacion:
          "Te llaman por el interfono: un pasajero de la fila 22 dice que su teléfono «se está calentando muchísimo» y sale un olor raro. Cuando la sobrecargo llega, el aparato está hinchado y empieza a echar humo.",
        pregunta: "¿Qué tiene que ver esto con lo que acabas de estudiar, y qué es lo primero que importa?",
        claves: [
          "Es una **fuga térmica**: la celda se calienta, sus materiales se descomponen y el calor pasa a la celda de al lado. Se alimenta sola.",
          "Lo primero es **enfriar**, con agua o cualquier líquido no alcohólico, y en cantidad. No es para apagar la llama: es para impedir que la siguiente celda entre en reacción.",
          "**No se cubre ni se mete en un compartimento cerrado.** Tapar el calor es exactamente lo contrario de lo que hace falta, y aislarlo en un armario te quita el control.",
          "El halón apaga la llama pero **no enfría**. Sirve, y no basta: detrás tiene que ir el agua.",
          "Y sí, esto es un suceso con mercancías peligrosas aunque el aparato fuera de un pasajero: se notifica.",
        ],
        cierre:
          "Esta es la razón por la que las baterías de litio tienen lección propia. No es la carga declarada la que más veces arde en un avión de pasajeros: es la que va en el bolsillo de la fila 22.",
      },
      {
        kind: "ponAPrueba",
        titulo: "Control del nivel 2",
        preguntas: [
          {
            q: "Una sustancia presenta a la vez riesgo de inflamabilidad y de corrosión. ¿En qué clase se incluye?",
            opciones: [
              {
                t: "En una sola clase: la del peligro más importante que representa.",
                ok: true,
                fb: "El texto es literal: «se incluyen en una de las nueve clases siguientes según el peligro o el más importante de los peligros que representen». El riesgo restante se trata como secundario y se refleja en el etiquetado.",
              },
              {
                t: "En las dos clases, con dos números ONU distintos.",
                fb: "El número ONU identifica la sustancia, no el riesgo, y la clasificación principal es única. Los riesgos adicionales se manejan como secundarios.",
              },
              {
                t: "Se prohíbe por incompatible.",
                fb: "«Incompatible» describe mercancías que al mezclarse generarían calor, gases o una sustancia corrosiva. Es un criterio de segregación entre bultos, no de clasificación de una sustancia.",
              },
            ],
          },
          {
            q: "Una caja de muestras médicas viaja con hielo seco para mantenerlas frías. ¿De qué clase es el hielo seco?",
            opciones: [
              {
                t: "De ninguna: es solo agua congelada.",
                fb: "El hielo seco no es agua: es dióxido de carbono sólido. Sublima y desplaza el oxígeno en un espacio cerrado, y por eso se cita expresamente como ejemplo de sustancia de la clase 9.",
              },
              {
                t: "Clase 2, porque se convierte en gas.",
                fb: "La clase 2 son gases a presión: comprimidos, licuados, disueltos, refrigerados o en aerosol. El hielo seco es un sólido que sublima, y su riesgo (desplazar el oxígeno) es lo que lo ubica en la clase 9.",
              },
              {
                t: "Clase 9, mercancías peligrosas varias.",
                ok: true,
                fb: "El dióxido de carbono sólido (hielo seco) figura entre los artículos de la clase 9 que las reglas para pasajeros y tripulantes admiten con condiciones. Es el caso típico de artículo que parece inocuo y no lo es.",
              },
            ],
          },
          {
            q: "Un compañero dice «esa carga es clase 2.1». ¿Qué corrección le harías?",
            opciones: [
              {
                t: "Ninguna: 2.1 es una clase.",
                fb: "No lo es. Las clases van del 1 al 9. El «2.1» es una división de la clase 2: gases inflamables.",
              },
              {
                t: "Que es la división 2.1, de la clase 2 (gases inflamables).",
                ok: true,
                fb: "La clase es el 2; la división, el 2.1. La diferencia importa porque las reglas de embalaje, segregación y emergencia cambian con la división, no solo con la clase.",
              },
              {
                t: "Que se dice «grupo 2.1».",
                fb: "El grupo es otra cosa: el grupo de embalaje va en romanos (I, II, III) y gradúa el peligro dentro de la clase. Y los gases ni siquiera lo llevan.",
              },
            ],
          },
          {
            q: "En tu vuelo de pasajeros aparece un bulto con la etiqueta «Exclusivamente en aeronaves de carga». ¿Qué haces?",
            opciones: [
              {
                t: "Lo acepto si va estibado lejos de la cabina.",
                fb: "La posición no lo arregla. Los bultos con esa etiqueta no se estiban en una aeronave ocupada por pasajeros, y punto.",
              },
              {
                t: "No sube: esa etiqueta prohíbe el transporte en aeronave con pasajeros.",
                ok: true,
                fb: "Es la única etiqueta que decide en qué tipo de avión puede ir un bulto. Y decide antes de que se cargue, no después.",
              },
              {
                t: "Lo acepto avisando a la tripulación de cabina.",
                fb: "Avisar es siempre buena idea, pero no convierte en admisible lo que la norma prohíbe.",
              },
            ],
          },
          {
            q: "Un bulto llega con la etiqueta de riesgo despegada y nadie sabe cuál era. ¿Qué dice la norma?",
            opciones: [
              {
                t: "Va sin etiqueta y se anota la novedad.",
                fb: "No hay margen para eso: la misma norma que obliga a tener etiquetas de reposición cierra diciendo que sin certeza no se transporta.",
              },
              {
                t: "Se pega la de la clase más probable según el aspecto.",
                fb: "Adivinar es peor que no etiquetar: quien lea esa etiqueta después va a actuar según ella.",
              },
              {
                t: "No se transporta hasta saber cuál corresponde.",
                ok: true,
                fb: "El explotador tiene que poseer etiquetas para reponer las que se desprenden o deterioran, pero si no hay certeza de cuál es, la mercancía no viaja.",
              },
            ],
          },
          {
            q: "¿Quién pone las etiquetas de riesgo y quién las de manipulación?",
            opciones: [
              {
                t: "Las dos las pone el expedidor.",
                ok: true,
                fb: "Entrega el bulto clasificado, documentado, embalado, marcado y etiquetado. El explotador solo repone las que se desprenden o deterioran.",
              },
              {
                t: "La de riesgo el expedidor y la de manipulación el explotador.",
                fb: "Las dos las pone el expedidor, que entrega el bulto marcado y etiquetado. El explotador solo repone las que se pierden o dañan, y si no tiene certeza de cuál corresponde, no transporta la mercancía.",
              },
              {
                t: "El operador de terminal de carga, al almacenarlas.",
                fb: "La terminal almacena y segrega; no etiqueta. Tiene los cuadros de etiquetas a la vista justamente para reconocer las que ya vienen puestas.",
              },
            ],
          },
          {
            q: "En el NOTOC aparece «UN 3480, clase 9, grupo de embalaje II». ¿Qué haces?",
            opciones: [
              {
                t: "Nada: la clase 9 lleva grupo de embalaje según la sustancia.",
                fb: "Algunas sustancias de la clase 9 sí lo llevan, pero las baterías de litio no. Su transporte lo gobierna la instrucción de embalaje y el estado de carga.",
              },
              {
                t: "Lo pregunto antes de firmar: las baterías de litio no llevan grupo de embalaje.",
                ok: true,
                fb: "Es el chequeo de coherencia. No corriges la clasificación, que no es tuya, pero un dato inventado en el papel rara vez viene solo.",
              },
              {
                t: "Rechazo el envío por documentación incorrecta.",
                fb: "Rechazar no es tu decisión ni tu papel. Preguntar sí, y es lo que hace que alguien con la competencia para corregirlo lo mire.",
              },
            ],
          },
          {
            q: "Un pasajero quiere llevar en su maleta un frasco marcado como «cantidad exceptuada». ¿Puede?",
            opciones: [
              {
                t: "Sí, porque está exceptuado.",
                fb: "«Exceptuado» se refiere a algunas disposiciones del transporte como carga, no al equipaje. En Colombia la norma es explícita: ni como equipaje de mano o facturado, ni como correo. El LAR no lo recoge, así que revisa cómo lo resuelve tu reglamento; lo que sí manda en todo caso son las reglas para pasajeros y tripulantes de las Instrucciones Técnicas.",
              },
              {
                t: "No: las cantidades exceptuadas no van en equipaje ni en correo.",
                ok: true,
                fb: "Es la trampa del régimen. Lo que puede llevar un pasajero lo fijan las reglas para pasajeros y tripulantes de las Instrucciones Técnicas (lección 11), no el régimen de cantidades exceptuadas.",
              },
              {
                t: "Solo si el explotador lo autoriza en su manual.",
                fb: "El manual del explotador puede ser más restrictivo, nunca más permisivo que la norma.",
              },
            ],
          },
          {
            q: "Un pasajero quiere llevar un power bank en su maleta facturada. ¿Puede?",
            opciones: [
              {
                t: "Sí, si va apagado y protegido.",
                fb: "Eso vale para un dispositivo con batería instalada que baja a bodega, no para un repuesto. Un power bank es una batería de repuesto: solo en cabina.",
              },
              {
                t: "No: las baterías de repuesto van solo en cabina.",
                ok: true,
                fb: "Las baterías de repuesto y los power banks van únicamente en cabina, con los terminales protegidos contra cortocircuito. En bodega nadie ve ni atiende una fuga térmica.",
              },
              {
                t: "Sí, si no pasa de 100 Wh.",
                fb: "Los 100 Wh dicen si necesita aprobación, no dónde va. Un power bank de 50 Wh sigue siendo un repuesto y sigue yendo en cabina.",
              },
            ],
          },
          {
            q: "¿En qué clase están las baterías de litio y qué grupo de embalaje llevan?",
            opciones: [
              {
                t: "Clase 3, grupo de embalaje II.",
                fb: "La clase 3 son líquidos inflamables con punto de inflamación. Una batería no es un líquido y su riesgo es eléctrico y térmico.",
              },
              {
                t: "Clase 8, sin grupo de embalaje.",
                fb: "La 8 son corrosivas: ácidos, baterías húmedas. Las de litio no corroen; se calientan. Y sí aciertas en que no llevan grupo.",
              },
              {
                t: "Clase 9, sin grupo de embalaje.",
                ok: true,
                fb: "Riesgo que no cubre ninguna otra clase, y transporte gobernado por la instrucción de embalaje y el estado de carga, no por el grupo. Es la respuesta que más se falla en entrevista.",
              },
            ],
          },
          {
            q: "Un teléfono en fuga térmica ya no tiene llama. ¿Por qué se sigue echando agua?",
            opciones: [
              {
                t: "Para limpiar el humo.",
                fb: "El agua no es por el humo. Es por el calor: la reacción sigue dentro de las celdas aunque no se vea llama, y se va a reavivar.",
              },
              {
                t: "Porque lo que hay que frenar es el calor que pasa a las celdas vecinas.",
                ok: true,
                fb: "La fuga térmica se alimenta sola y se propaga por calor. Apagar la llama no la detiene; enfriar sí. Por eso no se cubre ni se mueve hasta que esté fría.",
              },
              {
                t: "Porque el agua apaga cualquier incendio de clase 9.",
                fb: "La clase 9 no dice cómo se apaga nada: junta riesgos distintos. Con el litio se enfría con agua; con otras mercancías de la misma clase la respuesta puede ser otra.",
              },
            ],
          }
        ],
      },
    ],
  },
]
