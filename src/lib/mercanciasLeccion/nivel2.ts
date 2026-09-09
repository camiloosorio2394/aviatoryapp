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
        ref: "RAC 175.1010 (a)",
        texto:
          "Las sustancias (incluyendo mezclas y soluciones) y los objetos que se someten a lo establecido en las Instrucciones Técnicas se incluyen en una de las nueve clases siguientes según el peligro o el más importante de los peligros que representen.",
      },
      {
        kind: "p",
        text: "Léelo dos veces: **una** clase, la del peligro **más importante**. Una sustancia inflamable y corrosiva no va en dos clases: va en una, y el otro peligro se trata como riesgo secundario y aparece en el etiquetado. La clasificación la recomienda el Comité de expertos de las Naciones Unidas (175.1005), y por eso es la misma en aire, mar y tierra.",
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
        text: "La clase 1 no es «más peligrosa» que la clase 9: son familias de riesgo distintas. Dentro de una clase, lo que gradúa el peligro es el grupo de embalaje (I gran peligro, II intermedio, III escaso), que no se asigna a las clases 1, 2 y 7 ni a las divisiones 5.2 y 6.2 (175.426 (a)). Eso lo ves en la lección 07.",
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
        kind: "ponAPrueba",
        preguntas: [
          {
            q: "Una sustancia presenta a la vez riesgo de inflamabilidad y de corrosión. ¿En qué clase se incluye?",
            ref: "RAC 175.1010 (a)",
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
                fb: "«Incompatible» describe mercancías que al mezclarse generarían calor, gases o una sustancia corrosiva (175.001 (a) (26)). Es un criterio de segregación entre bultos, no de clasificación de una sustancia.",
              },
            ],
          },
          {
            q: "Una caja de muestras médicas viaja con hielo seco para mantenerlas frías. ¿De qué clase es el hielo seco?",
            ref: "RAC 175.1010 (a) (9)",
            opciones: [
              {
                t: "De ninguna: es solo agua congelada.",
                fb: "El hielo seco no es agua: es dióxido de carbono sólido. Sublima y desplaza el oxígeno en un espacio cerrado, y por eso el RAC lo cita expresamente como ejemplo de sustancia de la clase 9.",
              },
              {
                t: "Clase 2, porque se convierte en gas.",
                fb: "La clase 2 son gases a presión: comprimidos, licuados, disueltos, refrigerados o en aerosol. El hielo seco es un sólido que sublima, y su riesgo (desplazar el oxígeno) es el que el RAC ubica en la clase 9.",
              },
              {
                t: "Clase 9, mercancías peligrosas varias.",
                ok: true,
                fb: "El dióxido de carbono sólido figura como ejemplo de sustancia de la clase 9 en el 175.1010 (a) (9). Es el caso típico de artículo que parece inocuo y no lo es.",
              },
            ],
          },
          {
            q: "Un compañero dice «esa carga es clase 2.1». ¿Qué corrección le harías?",
            ref: "Tabla E.2 del RAC 175",
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
        ],
      },
      {
        kind: "summary",
        items: [
          "Nueve clases, una por mercancía: la del peligro más importante (175.1010 (a)). El resto es riesgo secundario.",
          "Clase (1 a 9) y división (2.1, 4.3, 6.2) no son lo mismo. La división cambia la respuesta ante una emergencia.",
          "El color del rombo es la primera señal: rojo arde, verde no arde, amarillo alimenta el fuego, calavera es tóxico, franjas negras es clase 9.",
          "Las baterías de litio y el hielo seco son clase 9.",
        ],
      },
    ],
  },

  // ── 06 ──────────────────────────────────────────────────────────────────
  {
    n: 6,
    title: "Etiquetas: de riesgo y de manipulación",
    kicker: "Qué es y cómo se trata",
    minutes: 8,
    blocks: [
      {
        kind: "p",
        text: "Un bulto no habla. Lo que dice, lo dice con lo que lleva pegado: las marcas, que son texto, y las etiquetas, que son los rombos y las señales de manipulación. Aprender a leerlas es lo que te permite mirar un bulto en rampa y saber qué es antes de que nadie te lo explique.",
      },
      { kind: "sub", text: "Las marcas: lo que va escrito" },
      {
        kind: "norma",
        ref: "RAC 175.430 (a)",
        texto:
          "A menos que en las Instrucciones Técnicas se indique de otro modo, todo bulto de mercancías peligrosas irá marcado con la denominación del artículo expedido que contenga y con el número de la ONU, así como con toda otra marca que puedan especificar aquellas Instrucciones.",
      },
      {
        kind: "kv",
        items: [
          {
            k: "UN 1263",
            v: "El número de la ONU: cuatro dígitos que identifican la sustancia o un grupo de ellas (175.001 (a) (35)). Es lo primero que se busca en la lista.",
          },
          {
            k: "PAINT",
            v: "La denominación del artículo expedido: el nombre oficial de transporte, no el comercial. Una lata de «Aviatory Gloss» va marcada como pintura.",
          },
          {
            k: "Idioma",
            v: "Cuando Colombia es origen y destino, las marcas van en español. En transporte internacional, además de los idiomas del Estado de origen, en inglés (175.430 (c) a (e)).",
          },
          {
            k: "Especificación",
            v: "La marca de especificación solo la lleva el embalaje que de verdad cumple la especificación de las Instrucciones (175.430 (b)). Un embalaje marcado como homologado sin serlo es una infracción.",
          },
        ],
      },
      { kind: "sub", text: "Dos familias de etiquetas" },
      {
        kind: "norma",
        ref: "RAC 175.436",
        texto:
          "(a) Etiquetas de riesgo: se requieren para la mayoría de las mercancías peligrosas de todas clases. (b) Etiquetas de manipulación: son requeridas para algunas mercancías peligrosas.",
      },
      {
        kind: "definicion",
        text: "La etiqueta de riesgo dice **qué es**. La etiqueta de manipulación dice **cómo se trata**. Un bulto puede llevar las dos: el rombo de clase 9 dice que es una batería de litio; la etiqueta de «exclusivamente en aeronaves de carga» dice que en tu vuelo de pasajeros no sube.",
      },
      { kind: "sub", text: "Etiquetas de riesgo" },
      {
        kind: "p",
        text: "Las especificaciones son las del Apéndice 1 del RAC 175: símbolo, fondo, franjas. Donde el Apéndice solo trae la figura, la ficha lo dice. Las que no tienen rombo en el módulo muestran su hueco, con el identificador y la medida para producirlas.",
      },
      { kind: "etiquetasMP", grupo: "riesgo" },
      { kind: "sub", text: "Etiquetas de manipulación" },
      { kind: "etiquetasMP", grupo: "manipulacion" },
      {
        kind: "callout",
        tone: "warn",
        title: "Reglas de fijación que se preguntan",
        text: "Las etiquetas se fijan o imprimen con seguridad, de forma que sean fácilmente visibles y legibles; no se doblan ni se fijan ocupando dos lados del bulto; si el bulto es irregular se acepta colocarlas en un talón o dispositivo rígido (175.438 (b) a (d)). Si el explotador descubre que se extraviaron, se desprendieron o son ilegibles, debe reemplazarlas conforme al documento de transporte (175.438 (e)).",
      },
      {
        kind: "norma",
        ref: "RAC 175.435 (b)",
        texto:
          "El explotador que cuente con la autorización para transportar mercancías peligrosas deberá poseer etiquetas adecuadas para su reposición, en los casos de desprendimiento o deterioro de la etiqueta; sin embargo, si no se tiene la certeza de cuál etiqueta corresponde, no se transportará la mercancía.",
      },
      {
        kind: "enLaOperacion",
        momento: "En la rampa",
        texto:
          "Un bulto con la etiqueta despegada no es un problema del expedidor: es del explotador que lo va a subir. La regla tiene dos mitades: se repone con la etiqueta que diga el documento de transporte, y si no hay certeza, no vuela. Tú no pegas etiquetas, pero sí puedes negarte a firmar por un bulto que nadie sabe qué es.",
      },
      {
        kind: "ponAPrueba",
        preguntas: [
          {
            q: "Un bulto llega con la etiqueta de riesgo despegada. ¿Qué corresponde hacer?",
            ref: "RAC 175.435 (b) y 175.438 (e)",
            opciones: [
              {
                t: "Reemplazarla con la etiqueta apropiada según el documento de transporte; si no hay certeza de cuál es, no se transporta.",
                ok: true,
                fb: "El explotador autorizado debe tener etiquetas de reposición y el 175.438 (e) le exige reemplazarlas conforme al documento de transporte. La segunda mitad de la regla es la que se olvida: sin certeza, no vuela.",
              },
              {
                t: "Aceptarlo, porque la etiqueta es informativa y el documento ya identifica la mercancía.",
                fb: "La etiqueta es parte del acondicionamiento exigido: nadie puede aceptar mercancías peligrosas que no vayan debidamente marcadas y etiquetadas (175.220 (b)).",
              },
              {
                t: "Rechazarlo siempre y devolverlo al expedidor.",
                fb: "No siempre. La norma permite reponer la etiqueta cuando hay certeza de cuál corresponde; el rechazo procede cuando no la hay.",
              },
            ],
          },
          {
            q: "¿Cuál es la diferencia entre una etiqueta de riesgo y una de manipulación?",
            ref: "RAC 175.436",
            opciones: [
              {
                t: "La de riesgo es obligatoria y la de manipulación es opcional.",
                fb: "Las dos son obligatorias cuando aplican. La diferencia no es la obligación: es lo que comunican. La de riesgo se requiere para la mayoría de las mercancías; la de manipulación, para algunas.",
              },
              {
                t: "La de riesgo dice qué es la mercancía; la de manipulación, cómo debe tratarse el bulto.",
                ok: true,
                fb: "Esa es la lectura del 175.436. El rombo de clase 3 dice «líquido inflamable»; las flechas de posición dicen «este lado arriba»; la de solo carga dice «no en pasajeros».",
              },
              {
                t: "La de riesgo la pone el expedidor y la de manipulación el explotador.",
                fb: "Las dos las pone el expedidor, que entrega el bulto marcado y etiquetado (175.215 (a)). El explotador solo repone las que se pierden o dañan (175.438 (e)).",
              },
            ],
          },
          {
            q: "En tu vuelo de pasajeros aparece un bulto con la etiqueta «Exclusivamente en aeronaves de carga». ¿Qué haces?",
            ref: "RAC 175, Capítulo F, Carga y estiba",
            opciones: [
              {
                t: "Lo acepto si va estibado lejos de la cabina.",
                fb: "La posición no lo arregla. Los bultos con esa etiqueta no se estiban en una aeronave ocupada por pasajeros, y punto.",
              },
              {
                t: "Lo acepto si el expedidor lo autoriza por escrito.",
                fb: "El expedidor no puede autorizar lo que la norma prohíbe. La etiqueta existe justamente porque esa mercancía, en esa cantidad o embalaje, solo puede ir en carguero.",
              },
              {
                t: "No sale: ese bulto no puede ir en una aeronave con pasajeros.",
                ok: true,
                fb: "La etiqueta de manipulación «Exclusivamente en aeronaves de carga» (Apéndice 1, Figura 1.23) es la orden de no estibarlo en un avión con pasajeros. Comprobarlo antes de firmar es parte de tu trabajo.",
              },
            ],
          },
        ],
      },
      {
        kind: "summary",
        items: [
          "Marcas: denominación del artículo y número ONU en cada bulto (175.430 (a)); en Colombia, en español; en vuelo internacional, además en inglés.",
          "Etiqueta de riesgo = qué es; etiqueta de manipulación = cómo se trata (175.436).",
          "Etiqueta despegada: se repone según el documento de transporte; sin certeza, no vuela (175.435 (b) y 175.438 (e)).",
          "«Exclusivamente en aeronaves de carga» significa exactamente eso.",
        ],
      },
    ],
  },

  // ── 07 ──────────────────────────────────────────────────────────────────
  {
    n: 7,
    title: "Grupos de embalaje y cantidades",
    kicker: "Cuánto cuidado exige",
    minutes: 6,
    blocks: [
      {
        kind: "p",
        text: "La clase dice qué peligro tiene una sustancia. El grupo de embalaje dice cuánto, dentro de su clase. Y las cantidades exceptuadas y limitadas dicen cuándo ese peligro es tan pequeño que la norma afloja. Tres escalas, tres preguntas distintas.",
      },
      {
        kind: "norma",
        ref: "RAC 175.426 (a)",
        texto:
          "Para los fines de embalaje las sustancias que no sean de las clases 1, 2 y 7, divisiones 5.2 y 6.2 y otras sustancias de reacción espontánea de la división 4.1, se asignan a los tres grupos de embalaje de acuerdo con el grado de peligro que representan: grupo de embalaje I, sustancias que presentan gran peligro; grupo de embalaje II, sustancias que presentan peligro intermedio; grupo de embalaje III, sustancias que presentan escaso peligro.",
      },
      {
        kind: "kv",
        items: [
          { k: "I", v: "Gran peligro. El embalaje más exigente y los límites de cantidad por bulto más bajos." },
          { k: "II", v: "Peligro intermedio." },
          { k: "III", v: "Escaso peligro. Embalaje menos exigente y límites más holgados." },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Van en números romanos, y no es un capricho",
        text: "Se escriben `I`, `II` y `III`. En el NOTOC y en la declaración del expedidor aparecen así, y confundir el I con un uno o el II con un once es un error que cambia el embalaje exigido y la cantidad admitida.",
      },
      { kind: "sub", text: "No todas las clases lo llevan" },
      {
        kind: "p",
        text: "Hay clases donde el grupo de embalaje no aplica porque el riesgo no se gradúa así: los explosivos se ordenan por división, los gases por su comportamiento y el material radiactivo por su nivel de radiación. El 175.426 (a) excluye las clases 1, 2 y 7, las divisiones 5.2 y 6.2 y las sustancias de reacción espontánea de la 4.1.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Sí llevan grupo de embalaje",
            ref: "175.426 (a)",
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
            ref: "175.426 (a)",
            puntos: [
              "Clase 1, explosivos: se ordenan por división.",
              "Clase 2, gases.",
              "Clase 7, material radiactivo: se categoriza por radiación.",
              "División 5.2, peróxidos orgánicos.",
              "División 6.2, infecciosas.",
              "Sustancias de reacción espontánea de la 4.1.",
            ],
          },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "El caso que más se pregunta",
        text: "Las **baterías de litio** son clase 9 y **no llevan grupo de embalaje**. Lo que gobierna su transporte es la instrucción de embalaje de las Instrucciones Técnicas y el estado de carga. Si en un NOTOC ves un grupo de embalaje junto a un UN de litio, algo no cuadra.",
      },
      { kind: "sub", text: "Cantidades exceptuadas y cantidades limitadas" },
      {
        kind: "p",
        text: "Cuando la cantidad es pequeña, el peligro también, y la norma lo reconoce con dos regímenes. No son lo mismo y se confunden siempre.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Cantidades exceptuadas",
            ref: "175.130",
            puntos: [
              "Cantidades pequeñas definidas en la Parte 3, Capítulo 5 de las Instrucciones Técnicas.",
              "Si la lista trae «E0» en la columna 9, ese artículo **no** puede ir en cantidades exceptuadas (175.130 (b)).",
              "Solo mercancías permitidas en aeronaves de pasajeros, y solo de ciertas clases y divisiones (175.130 (c)).",
              "Cada bulto lleva una etiqueta de al menos 100 × 100 mm (175.130 (d)).",
              "No van en equipaje ni en correo (175.136).",
            ],
          },
          {
            titulo: "Cantidades limitadas",
            ref: "175.135",
            puntos: [
              "Presentan un peligro menor y viajan en embalajes de buena calidad, probados a apilamiento y caída, con la marca de la Figura 3-1 de las Instrucciones.",
              "Se identifican por la instrucción de embalaje «Y» en la columna 10 de la lista (175.135 (c)).",
              "Quedan exceptuadas de algunas disposiciones, según la Parte 3, Capítulo 4 de las Instrucciones.",
            ],
          },
        ],
      },
      {
        kind: "table",
        head: ["Admitidas en cantidades exceptuadas (175.130 (c))", "Condición"],
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
        kind: "callout",
        tone: "warn",
        title: "Trampa frecuente",
        text: "Las mercancías peligrosas en cantidades exceptuadas no están permitidas ni como equipaje de mano o facturado, ni como correo (175.136 (a)). «Exceptuada» no quiere decir «puede ir en la maleta».",
      },
      {
        kind: "enLaOperacion",
        momento: "Al leer el NOTOC",
        texto:
          "Junto a cada UN puede venir un grupo de embalaje en romanos. Compruébalo dos veces: que sea coherente con la clase (un gas no debería traer grupo) y que coincida entre la declaración del expedidor y la información que firmas. Un «I» donde debía ir «II» cambia el embalaje exigido y los límites de cantidad.",
      },
      {
        kind: "ponAPrueba",
        preguntas: [
          {
            q: "La columna 9 de la lista de mercancías peligrosas trae «E0» para un artículo. ¿Qué significa?",
            ref: "RAC 175.130 (b)",
            opciones: [
              {
                t: "Que ese artículo no puede transportarse en cantidades exceptuadas.",
                ok: true,
                fb: "Salvo disposición contraria en las Instrucciones Técnicas, las mercancías con la sigla E0 en la columna 9 no pueden ir bajo el régimen de cantidades exceptuadas.",
              },
              {
                t: "Que está exento de todas las disposiciones del reglamento.",
                fb: "Al revés. E0 es la marca de que el régimen de cantidades exceptuadas no aplica para ese artículo.",
              },
              {
                t: "Que solo puede ir en aeronave de carga.",
                fb: "Esa restricción se lee en las columnas de la lista referidas a aeronaves de pasajeros y de carga, y se materializa en la etiqueta «Exclusivamente en aeronaves de carga».",
              },
            ],
          },
          {
            q: "En un NOTOC aparece un cilindro de gas de la división 2.2 con «grupo de embalaje II». ¿Qué piensas?",
            ref: "RAC 175.426 (a)",
            opciones: [
              {
                t: "Es normal: todas las mercancías llevan grupo de embalaje.",
                fb: "No todas. El 175.426 (a) excluye las clases 1, 2 y 7, las divisiones 5.2 y 6.2 y las sustancias de reacción espontánea de la 4.1.",
              },
              {
                t: "Algo no cuadra: los gases no llevan grupo de embalaje.",
                ok: true,
                fb: "La clase 2 no se gradúa por grupo de embalaje. Un grupo junto a un gas es un dato que no debería estar ahí, y merece una pregunta antes de firmar.",
              },
              {
                t: "Que es un gas de peligro intermedio.",
                fb: "Los gases no se gradúan así: se dividen por comportamiento (inflamable, no inflamable, tóxico), no por grupo de embalaje.",
              },
            ],
          },
          {
            q: "Un pasajero quiere llevar en su maleta un frasco de reactivo marcado como «cantidad exceptuada». ¿Puede?",
            ref: "RAC 175.136 (a)",
            opciones: [
              {
                t: "Sí, porque está exceptuado.",
                fb: "«Exceptuado» se refiere a algunas disposiciones del transporte como carga, no al equipaje. El 175.136 (a) es explícito: ni como equipaje de mano o facturado, ni como correo.",
              },
              {
                t: "No: las cantidades exceptuadas no van en equipaje ni en correo.",
                ok: true,
                fb: "Es la trampa del régimen. Lo que puede llevar un pasajero lo fija el Capítulo H y las Instrucciones Técnicas (lección 11), no el régimen de cantidades exceptuadas.",
              },
              {
                t: "Solo si lo declara en el mostrador.",
                fb: "Declararlo no lo habilita. Lo que un pasajero puede llevar está en la Parte 8 de las Instrucciones Técnicas; las cantidades exceptuadas son un régimen de carga.",
              },
            ],
          },
        ],
      },
      {
        kind: "summary",
        items: [
          "Grupo de embalaje: I gran peligro, II intermedio, III escaso (175.426 (a)). En romanos.",
          "No llevan grupo: clases 1, 2 y 7, divisiones 5.2 y 6.2, reacción espontánea de la 4.1. Las baterías de litio tampoco.",
          "Cantidades exceptuadas (E0 = no), limitadas (instrucción «Y»). Las exceptuadas no van en equipaje ni correo (175.136).",
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
          "Cuando el humo llena la cabina, lo único que queda es lo que ya estaba a bordo y lo que la tripulación ya sabía. Por eso el 175.515 exige que la información de las mercancías esté al alcance del comandante durante el vuelo y el 175.620 que la información de emergencia esté disponible de inmediato. Una batería de litio en fuga térmica no es un incendio más: produce su propio calor, se reaviva y llena de humo un espacio del que no se puede salir.",
        fuente: "GCAA (Emiratos Árabes Unidos), informe final del accidente del N571UP, julio de 2013.",
        hueco: {
          id: "MP-IMG-03",
          medida: "16:9 · 1600×900 · JPG o WebP",
          descripcion:
            "Foto de referencia del 747 de UPS o de una paleta de carga con baterías de litio marcada. Con crédito.",
        },
      },
      { kind: "sub", text: "Qué es la fuga térmica" },
      {
        kind: "definicion",
        text: "Una celda de litio dañada, sobrecargada o en cortocircuito se calienta. El calor descompone los materiales de dentro, que producen más calor y gases inflamables, y el calor pasa a la celda de al lado. Es una reacción que se alimenta sola: produce fuego que se reaviva y no se apaga quitándole el oxígeno, porque el oxígeno lo pone la propia celda.",
      },
      {
        kind: "hueco",
        rotulo: "MP-ILU-02 · Ilustración · 16:9 · 1600×900 · SVG",
        descripcion:
          "Diagrama de la fuga térmica en tres pasos: una celda se calienta, sus materiales se descomponen y sueltan gas, el calor pasa a la celda vecina. Flechas de calor, sin texto pequeño.",
        alto: 280,
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Ion litio (recargable)",
            ref: "UN 3480 sueltas · UN 3481 en o con un equipo",
            puntos: [
              "Teléfonos, portátiles, power banks, cámaras, herramientas, vehículos eléctricos.",
              "Su tamaño se mide en vatios-hora (Wh). Es la cifra que fija qué puede llevar un pasajero.",
              "Los números ONU salen de la Tabla 3-1 de las Instrucciones Técnicas.",
            ],
          },
          {
            titulo: "Litio metálico (no recargable)",
            ref: "UN 3090 sueltas · UN 3091 en o con un equipo",
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
        ref: "RAC 175.020 (c)",
        titulo: "La Sección II, en la norma colombiana",
        texto:
          "La UAEAC podrá emitir una autorización especial a un explotador no autorizado a transportar mercancías peligrosas, para el transporte de algunas mercancías peligrosas consideradas de riesgo menor (sustancias biológicas, Categoría B, baterías de litio embaladas según la Sección II de las instrucciones de embalaje, COMAT peligroso, mercancías peligrosas permitidas por correo).",
      },
      {
        kind: "p",
        text: "Ese «Sección II» es la clave para leer un envío de baterías. Las instrucciones de embalaje del litio tienen secciones: las baterías pequeñas, bien embaladas, van por la Sección II con menos exigencias; las grandes o en cantidad van por la Sección I con toda la norma. El RAC las considera de riesgo menor justamente por eso.",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Lo que dicen las Instrucciones Técnicas vigentes",
        text: "Desde el 1 de abril de 2016 las baterías de ion litio sueltas (UN 3480) están **prohibidas como carga en aeronaves de pasajeros** y solo van en carguero, con un estado de carga que no supere el 30 %. Los bultos llevan la etiqueta de clase 9 para litio (9A) y la marca de batería de litio. Estas reglas salen del Doc 9284, Partes 3 y 4, y de la IATA DGR, que cambian con cada edición: antes de aplicarlas, verifícalas contra la edición en vigor y el manual de tu explotador.",
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
        text: "Los vatios-hora, los gramos y el número de unidades salen del Doc 9284, Parte 8 (Tabla 8-1), y de la sección 2.3 de la IATA DGR en su edición vigente, y de la política de tu explotador. Aquí están redondeados para aprender la regla. El RAC 175 remite a esa tabla en el 175.715.",
      },
      {
        kind: "norma",
        ref: "RAC 175.610 (b)",
        texto:
          "El explotador o el agente de despacho del explotador deberá asegurar el suministro de información sobre transporte de mercancías peligrosas instalando de manera destacada y en lugares visibles el número suficiente de letreros informativos en los puntos de aceptación de la carga, para así alertar a los expedidores y agentes respecto de las mercancías peligrosas que pueda haber en sus envíos de carga. Estos avisos deben incluir ejemplos visuales de las mercancías peligrosas, comprendidas las baterías.",
      },
      {
        kind: "p",
        text: "Ese «comprendidas las baterías» está en la norma colombiana. Dice bastante sobre cuál es la mercancía peligrosa que más se cuela sin declarar.",
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
        kind: "ponAPrueba",
        preguntas: [
          {
            q: "Un pasajero quiere llevar un power bank en su maleta facturada. ¿Puede?",
            ref: "Doc 9284, Parte 8 (Tabla 8-1) · IATA DGR 2.3",
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
            ref: "RAC 175.1010 (a) (9) y 175.426 (a)",
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
            ref: "Práctica de la industria y manual del explotador",
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
          },
        ],
      },
      {
        kind: "summary",
        items: [
          "Clase 9, sin grupo de embalaje. Lo que manda es la instrucción de embalaje y el estado de carga.",
          "Fuga térmica: reacción que se alimenta sola y se propaga por calor. Se enfría; no se cubre.",
          "Repuestos y power banks solo en cabina. Las cifras (100/160 Wh) se verifican en la edición vigente de las Instrucciones.",
          "UPS 6: cuando el humo llena la cabina, solo queda lo que ya estaba a bordo y lo que ya sabías.",
        ],
      },
    ],
  },
]
