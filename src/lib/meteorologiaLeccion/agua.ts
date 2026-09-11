/**
 * Nivel 2 · Agua, estabilidad y nubes.
 *
 * Sigue con el capítulo 11 del PHAK. Aquí está la lección que más se usa en
 * cabina de todo el módulo: reconocer una nube por su forma y saber qué trae
 * dentro. Y la cuenta de la separación temperatura/punto de rocío, que es la
 * pregunta de entrevista más repetida de meteorología.
 *
 * Los bloques `reconoce` (imagen real con puntos numerados) son los que esta
 * parte pide a gritos y todavía no se pueden escribir: no hay fotografías. En
 * su sitio queda el hueco rotulado con los puntos que llevará, para que el día
 * que lleguen las fotos el bloque se escriba encima sin rehacer la lección.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const PARTE_AGUA: DocScreen[] = [
  // ── 06 ──────────────────────────────────────────────────────────────────
  {
    n: 6,
    title: "Estabilidad: cuándo el aire sube solo",
    kicker: "Lo que decide si el día trae baches o calma",
    minutes: 7,
    blocks: [
      {
        kind: "p",
        text: "Dos días con la misma nubosidad en el METAR y uno te da un vuelo liso y el otro te tiene con el cinturón puesto toda la subida. La diferencia no está en las nubes: está en si el aire de ese día resiste el movimiento vertical o lo amplifica. Eso es la estabilidad, y es el concepto que ordena casi todo lo que viene después.",
      },
      {
        kind: "definicion",
        text: "La estabilidad de la atmósfera es su capacidad de resistir el movimiento vertical. En una atmósfera estable las perturbaciones verticales pequeñas se amortiguan y desaparecen. En una inestable, esos mismos movimientos crecen.",
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Qué te da cada una",
        items: [
          {
            titulo: "Aire estable",
            puntos: [
              "El movimiento vertical cuesta y las perturbaciones se apagan solas.",
              "Aire seco y frío es muy estable.",
              "Tiempo bueno y claro en general.",
            ],
          },
          {
            titulo: "Aire inestable",
            puntos: [
              "Los movimientos verticales pequeños se hacen grandes.",
              "Flujo turbulento y actividad convectiva.",
              "Puede llevar a turbulencia fuerte, nubes de gran desarrollo vertical y tiempo severo.",
              "La mayor inestabilidad se da con aire húmedo y caliente, como el trópico en verano.",
            ],
          },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Por qué en el trópico truena todos los días",
        text: "Aire húmedo y caliente es la combinación más inestable que hay. Por eso en las regiones tropicales aparecen tormentas a diario, no por casualidad ni por la estación: es el estado normal de esa atmósfera. Si vuelas la región, esa es tu meteorología de base y no la excepción.",
      },
      {
        kind: "sub",
        text: "Entender: por qué el aire que sube se enfría",
      },
      {
        kind: "secuencia",
        numerada: true,
        items: [
          "El aire sube hacia una zona de menor presión.",
          "Al haber menos presión encima, se expande y ocupa más volumen.",
          "Expandirse le cuesta energía, así que su temperatura baja.",
          "Al bajar, todo al revés: se comprime y se calienta.",
        ],
      },
      {
        kind: "p",
        text: "A eso se le llama enfriamiento y calentamiento **adiabáticos**, y ocurre en todo movimiento vertical del aire. La velocidad a la que la temperatura cambia con la altura es el **gradiente**.",
      },
      {
        kind: "kv",
        items: [
          { k: "Gradiente medio de la atmósfera (el de la ISA)", v: "2 °C (3,5 °F) por cada 1.000 ft" },
          { k: "Gradiente adiabático seco (aire no saturado)", v: "3 °C (5,4 °F) por cada 1.000 ft" },
          { k: "Gradiente adiabático húmedo", v: "de 1,1 °C a 2,8 °C por cada 1.000 ft" },
        ],
      },
      {
        kind: "p",
        text: "Fíjate en la consecuencia, que es lo que importa: **el aire húmedo se enfría más despacio**, así que tiene que subir más antes de igualar la temperatura del aire que lo rodea. Por eso el aire húmedo es generalmente menos estable que el seco. Y como el vapor de agua es más liviano que el aire, la humedad además baja la densidad y lo ayuda a ascender.",
      },
      {
        kind: "p",
        text: "Con esos números se decide si el aire de un día es estable: **se compara lo que se enfría la atmósfera de ese día con lo que se enfría la burbuja que sube**. La burbuja se enfría a su ritmo adiabático; el aire que la rodea, al ritmo que tenga ese día. Mientras la burbuja quede más caliente que su entorno, sigue subiendo.",
      },
      {
        kind: "kv",
        items: [
          { k: "La atmósfera se enfría más de 3 °C por cada 1.000 ft", v: "absolutamente inestable: la burbuja sube siempre, seca o saturada" },
          { k: "Se enfría menos que el gradiente húmedo", v: "absolutamente estable: la burbuja se frena siempre" },
          { k: "Entre los dos", v: "condicionalmente inestable: estable mientras el aire siga seco, inestable en cuanto se satura" },
        ],
      },
      {
        kind: "sub",
        text: "La inversión, que es la excepción que hay que reconocer",
      },
      {
        kind: "definicion",
        text: "Inversión de temperatura: cuando la temperatura del aire aumenta con la altitud en vez de bajar. La capa suele ser fina, de aire suave y estable, cerca del suelo.",
      },
      {
        kind: "p",
        text: "El aire del techo de la inversión actúa como tapa y deja debajo el tiempo y la contaminación. Si además la humedad relativa es alta, ahí se te forman nubes, niebla, neblina o humo, y **la visibilidad se cae dentro de la capa**.",
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Las dos que vas a encontrar",
        items: [
          {
            titulo: "Inversión de superficie",
            puntos: [
              "Noches claras y frías.",
              "El suelo se enfría y enfría el aire pegado a él.",
              "En unos pocos cientos de pies, el aire de abajo queda más frío que el de encima.",
            ],
          },
          {
            titulo: "Inversión frontal",
            puntos: [
              "El aire cálido se extiende sobre una capa de aire más frío.",
              "O el aire frío es forzado por debajo de una capa más cálida.",
            ],
          },
        ],
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t06-01-inversion-de-superficie.webp",
        alt: "Dos perfiles verticales de temperatura lado a lado: a la izquierda una atmósfera normal, con la temperatura bajando con la altura; a la derecha una con inversión de superficie, con la capa sombreada y niebla atrapada debajo.",
        ancho: 1600,
        alto: 900,
        pie: "La misma altura, dos comportamientos de la temperatura.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Antes del vuelo, primera hora",
        situacion:
          "Amanece despejado y sin viento tras una noche fría y clara. El METAR de tu aeródromo da visibilidad reducida y una capa baja, pero la carta no muestra ningún frente cerca y el destino está limpio.",
        pregunta: "¿Qué está pasando y qué esperas que ocurra en las próximas horas?",
        claves: [
          "Noche clara, fría y en calma es la receta exacta de una inversión de superficie: el suelo se enfría por radiación y enfría el aire pegado a él.",
          "El techo de la inversión hace de tapa y deja debajo la humedad, así que la visibilidad se cae dentro de esa capa.",
          "No hace falta un frente para explicarlo: es un fenómeno local y de las primeras horas.",
          "Con el sol la temperatura sube, la inversión se rompe y lo de debajo se disipa. Lo que hay que estimar es cuándo, no si va a pasar.",
        ],
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es la estabilidad atmosférica y qué tiempo trae cada caso?",
            respuesta:
              "Es la capacidad de la atmósfera de resistir el movimiento vertical. En una atmósfera estable las perturbaciones verticales se amortiguan y el tiempo suele ser bueno y claro. En una inestable los movimientos verticales crecen, y eso da flujo turbulento, actividad convectiva, nubes de gran desarrollo vertical y posible tiempo severo.",
            claves: ["Resistir el movimiento vertical", "Estable: bueno y claro", "Inestable: turbulencia y convección"],
          },
          {
            nivel: "interpretacion",
            q: "¿Por qué el aire húmedo es menos estable que el seco?",
            respuesta:
              "Porque se enfría a menor velocidad al ascender: el gradiente adiabático húmedo va de 1,1 a 2,8 °C por cada 1.000 ft, contra 3 °C del seco. Al enfriarse más despacio tiene que subir más antes de igualar la temperatura del aire circundante, así que sigue ascendiendo. Además el vapor de agua es más liviano que el aire, con lo que baja la densidad y favorece el ascenso.",
            claves: ["Se enfría más despacio", "Gradiente húmedo 1,1 a 2,8 °C", "Gradiente seco 3 °C", "Vapor más liviano"],
          },
          {
            nivel: "situacion",
            q: "¿Qué es una inversión y qué problema operativo trae?",
            respuesta:
              "Es una capa en la que la temperatura aumenta con la altitud en lugar de bajar. Es aire suave y estable, normalmente fino y cerca del suelo. El problema es que su techo actúa como tapa: atrapa debajo el tiempo y la contaminación, y con humedad relativa alta forma nubes, niebla, neblina o humo, con la visibilidad reducida dentro de la capa.",
            claves: ["Temperatura sube con la altura", "Capa estable cerca del suelo", "Tapa: atrapa humedad y contaminación", "Visibilidad reducida"],
          },
        ],
      },
    ],
  },

  // ── 07 ──────────────────────────────────────────────────────────────────
  {
    n: 7,
    title: "Humedad y punto de rocío",
    kicker: "La cuenta que te dice a qué altura está la base",
    minutes: 8,
    blocks: [
      {
        kind: "p",
        text: "El METAR te da dos números pegados, temperatura y punto de rocío, y casi todo el mundo los lee como dos datos sueltos. No lo son: lo que informa es la **distancia entre ellos**, y de esa distancia sale a qué altura vas a encontrar la base de las nubes. Esta es la lección que convierte dos cifras en una altura.",
      },
      {
        kind: "sub",
        text: "Ver: cuánta agua cabe en el aire",
      },
      {
        kind: "p",
        text: "La cantidad de humedad que la atmósfera puede contener depende de su temperatura. **Cada 11 °C (20 °F) de aumento, la capacidad se duplica.** Cada 11 °C de bajada, se reduce a la mitad. Por eso el mismo vapor de agua que de tarde no era nada, de madrugada es niebla.",
      },
      {
        kind: "kv",
        items: [
          {
            k: "Humedad relativa",
            v: "la humedad que hay comparada con la que cabría a esa temperatura y presión",
          },
          {
            k: "Punto de rocío",
            v: "la temperatura a la que el aire ya no puede contener más humedad",
          },
        ],
      },
      {
        kind: "p",
        text: "Cuando la temperatura del aire baja hasta el punto de rocío, el aire queda saturado y la humedad empieza a condensarse: niebla, rocío, escarcha, nubes, lluvia, granizo o nieve. Todo lo que te cambia el plan sale de ese momento.",
      },
      {
        kind: "sub",
        text: "Entender: la tasa de convergencia",
      },
      {
        kind: "p",
        text: "Al ascender, la temperatura y el punto de rocío no bajan al mismo ritmo, y ahí está el truco:",
      },
      {
        kind: "kv",
        items: [
          { k: "El aire no saturado se enfría", v: "3 °C por cada 1.000 ft" },
          { k: "El punto de rocío baja", v: "0,55 °C por cada 1.000 ft" },
          { k: "Se acercan entre sí a razón de", v: "2,45 °C por cada 1.000 ft" },
        ],
      },
      {
        kind: "p",
        text: "Como se acercan a un ritmo conocido, sabiendo cuánto los separa en superficie sabes cuántos miles de pies tardan en encontrarse. Y donde se encuentran, se forma la base de la nube.",
      },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "La separación",
            texto: "Resta el punto de rocío a la temperatura, los dos en superficie. Ese es tu margen en grados.",
          },
          {
            rotulo: "Divide",
            texto: "Divide esa separación entre la tasa de convergencia, 2,45 °C.",
          },
          {
            rotulo: "Multiplica",
            texto: "Multiplica el resultado por 1.000. Eso son pies sobre el terreno (AGL): la altura aproximada de la base de las nubes.",
            fuerte: true,
          },
        ],
      },
      {
        kind: "code",
        grande: true,
        text: "T = 29 °C   PR = 21 °C\n29 - 21 = 8 °C\n8 / 2,45 = 3,26\n3,26 x 1.000 = 3.260 ft AGL",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Esto se responde de cabeza en una entrevista",
        text: "La separación dividida entre 2,45, por mil. Y si quieres el atajo mental, cada grado de separación son unos 400 ft de base. Con 8 grados, unos 3.200 ft, que es la cuenta de arriba con un error de sesenta pies.",
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t07-01-base-de-la-nube.webp",
        alt: "Gráfico de temperatura contra altura con dos rectas que salen del suelo, la de temperatura desde 29 grados y la de punto de rocío desde 21, y se cortan a 3.260 ft, donde está la base de la nube.",
        ancho: 1200,
        alto: 900,
        anchoMax: 520,
        pie: "Dos rectas que se acercan 2,45 °C cada mil pies.",
      },
      {
        kind: "sub",
        text: "Cómo llega el aire a saturarse",
      },
      {
        kind: "vinetas",
        items: [
          "Aire cálido que se mueve sobre una superficie fría: su temperatura cae hasta el punto de saturación.",
          "Aire frío que se mezcla con aire cálido.",
          "Aire que se enfría de noche por contacto con el suelo más frío.",
          "Aire que asciende o es forzado a ascender, y se enfría al expandirse.",
        ],
      },
      {
        kind: "p",
        text: "Sea cual sea el camino, el destino es el mismo: **aire saturado significa nubes, lluvia y situaciones meteorológicas críticas.**",
      },
      {
        kind: "sub",
        text: "Aplicar: rocío y escarcha no son lo mismo",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Rocío",
            puntos: [
              "En noches frías y en calma, la temperatura de los objetos hace bajar la del aire que los rodea por debajo del punto de rocío.",
              "La humedad se condensa sobre el terreno, los edificios, los autos y los aviones.",
              "No representa una amenaza para la aeronave.",
            ],
          },
          {
            titulo: "Escarcha",
            ref: "cuando la temperatura está bajo cero",
            puntos: [
              "La humedad se deposita congelada.",
              "Interrumpe el flujo de aire sobre el ala y puede reducir drásticamente la sustentación.",
              "Además aumenta la resistencia, y las dos cosas juntas afectan a la capacidad de despegue.",
              "La aeronave debe limpiarse completamente de escarcha antes de iniciar el vuelo.",
            ],
            nota: "No es una recomendación de manual: es la diferencia entre despegar y no despegar.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "El error de bulto",
        text: "La escarcha no «se va con el rodaje» ni «se derrite con el sol en la carrera». Una capa que a la vista parece un velo basta para romper el flujo sobre el ala justo cuando más falta hace. El capítulo lo dice sin matices: completamente limpia antes de iniciar vuelo.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es el punto de rocío y qué relación tiene con la humedad relativa?",
            respuesta:
              "El punto de rocío es la temperatura a la que el aire ya no puede contener más humedad. La humedad relativa es la humedad que hay comparada con la que ese aire podría contener a esa temperatura y presión. Cuando la temperatura baja hasta el punto de rocío el aire está saturado, la humedad relativa es del 100 % y empieza la condensación.",
            claves: ["Temperatura de saturación", "Relativa: real frente a capacidad", "Al igualarse, condensa"],
          },
          {
            nivel: "interpretacion",
            q: "Temperatura 24 °C, punto de rocío 12 °C. ¿A qué altura espera la base de las nubes?",
            respuesta:
              "La separación es de 12 °C. Dividida entre la tasa de convergencia de 2,45 °C da 4,9, y por mil, unos 4.900 ft AGL.",
            claves: ["Separación 12 °C", "Dividir entre 2,45", "Unos 4.900 ft AGL"],
          },
          {
            nivel: "situacion",
            q: "Llega al avión al amanecer y hay escarcha en el extradós. ¿Qué hace y por qué?",
            respuesta:
              "No se despega. La escarcha interrumpe el flujo de aire sobre el ala, reduce drásticamente la sustentación y además aumenta la resistencia, y las dos cosas juntas afectan a la capacidad de despegue. La aeronave tiene que limpiarse completamente antes de iniciar el vuelo.",
            claves: ["Rompe el flujo sobre el ala", "Menos sustentación y más resistencia", "Limpieza completa antes de volar"],
          },
        ],
      },
    ],
  },

  // ── 08 ──────────────────────────────────────────────────────────────────
  {
    n: 8,
    title: "Nubes: reconocer lo que tienes delante",
    kicker: "Por altura, por forma y por lo que traen dentro",
    minutes: 10,
    blocks: [
      {
        kind: "p",
        text: "Vas en un México a París. A dos horas de la costa ves delante una formación que crece vertical y que arriba se abre en yunque. Antes de llamar a nadie ya sabes tres cosas: que ahí dentro hay corrientes que superan los 3.000 ft por minuto, que ese yunque significa que la corriente ascendente ya llegó hasta arriba y se extendió, y que no la vas a sobrevolar. Esta lección es la que te da esas tres cosas de un vistazo.",
      },
      {
        kind: "definicion",
        text: "Las nubes son indicadores visibles y suelen anticipar el tiempo que viene. Para que se formen hacen falta tres cosas: vapor de agua suficiente, núcleos de condensación (polvo, sal, humo) y algún método por el que el aire se enfríe.",
      },
      {
        kind: "p",
        text: "El tipo de nube lo determinan su **altura**, su **forma** y su **comportamiento**. Se clasifican por la altura de sus bases en bajas, medias y altas, más una familia aparte: las de desarrollo vertical.",
      },
      {
        kind: "sub",
        text: "Ver: las cuatro familias",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Bajas",
            ref: "de la superficie a 6.500 ft AGL",
            puntos: [
              "Estratos, estratocúmulos y nimboestratos. La niebla también entra en esta familia.",
              "Sobre todo gotitas de agua, pero pueden traer agua superenfriada: formación de hielo peligrosa.",
              "Crean techos bajos, dificultan la visibilidad y cambian rápido.",
              "Son las que deciden si un vuelo VFR es posible o no.",
            ],
          },
          {
            titulo: "Medias",
            ref: "de 6.500 a 20.000 ft AGL",
            puntos: [
              "Altoestratos y altocúmulos.",
              "Agua, cristales de hielo y gotas superenfriadas.",
              "Los altoestratos pueden dar turbulencia y engelamiento moderado.",
              "Los altocúmulos, que suelen aparecer cuando los altoestratos se rompen, dan turbulencia y engelamiento ligero.",
            ],
          },
          {
            titulo: "Altas",
            ref: "por encima de 20.000 ft AGL",
            puntos: [
              "Cirros, cirroestratos y cirrocúmulos.",
              "Se forman solo en aire estable y son de cristales de hielo.",
              "No suponen amenaza real de turbulencia ni de engelamiento.",
            ],
          },
          {
            titulo: "Desarrollo vertical",
            ref: "base entre las bajas y las medias, cima hasta las altas",
            puntos: [
              "Cúmulos, cúmulos en torre y cumulonimbus.",
              "Los cúmulos en torre marcan inestabilidad: dentro y alrededor el aire es turbulento.",
              "A menudo acaban convirtiéndose en cumulonimbus.",
            ],
          },
        ],
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t08-01-familias-por-altura.webp",
        alt: "Corte vertical con las cuatro familias de nubes a su altura real, con la escala de pies marcando 6.500 y 20.000, y la columna del cumulonimbus atravesándolas todas hasta el yunque.",
        ancho: 1800,
        alto: 1200,
        pie: "Las cuatro familias, cada una a su altura.",
      },
            {
        kind: "reconoce",
        titulo: "Reconoce: cumulonimbus maduro",
        intro: "La nube que más decisiones cambia. Estos cuatro rasgos se ven a cincuenta millas y son los que deciden si sigues o te desvías.",
        imagen: {
          src: "/modulos/meteorologia/mt-t08-02-cumulonimbus-yunque.webp",
          alt: "Cumulonimbus maduro al atardecer sobre una sierra, con el yunque extendido hacia la izquierda y células nuevas en el flanco derecho.",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 20,
            y: 12,
            que: "El yunque",
            significa: "La corriente ascendente llegó arriba del todo y se extendió de lado, contra la tropopausa.",
            piloto: "Que haya yunque no quiere decir que la tormenta se esté acabando: quiere decir que está madura, que es cuando peor se porta.",
          },
          {
            x: 45,
            y: 34,
            que: "La torre",
            significa: "Contorno duro y abultado, recortado: ahí dentro sigue subiendo aire deprisa.",
            piloto: "Es la parte que no se cruza. Ni por arriba ni por el lado a menos de veinte millas, y por debajo nunca.",
          },
          {
            x: 52,
            y: 76,
            que: "La base",
            significa: "Donde la nube se apoya, por debajo de toda la parte iluminada.",
            piloto: "Debajo de esa base viven la cizalladura y la ráfaga de frente, que es lo que te tumba en aproximación.",
          },
          {
            x: 79,
            y: 74,
            que: "Los cúmulos del flanco",
            significa: "Células nuevas creciendo al costado de la principal.",
            piloto: "Dicen por dónde va a crecer el sistema, y por tanto hacia qué lado NO conviene desviarse.",
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Reconoce: capa de estratos",
        intro: "Lo contrario del cumulonimbus, y por eso se estudia al lado. Aquí no hay nada que esquivar: hay un techo que decide si entras.",
        imagen: {
          src: "/modulos/meteorologia/mt-t08-03-estratos-base-uniforme.webp",
          alt: "Capa de estratos baja y uniforme cubriendo todo el cielo, con la parte alta de una estructura recortada abajo a la izquierda.",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 55,
            y: 33,
            que: "Base uniforme",
            significa: "Una capa lisa, sin bultos ni relieve en toda su extensión.",
            piloto: "Eso es un estrato y no un cúmulo. Dice que el aire está estable y que no vas a encontrar baches.",
          },
          {
            x: 17,
            y: 92,
            que: "El techo, contra algo conocido",
            significa: "La estructura recortada abajo da la única referencia de altura que hay en la escena.",
            piloto: "Es así como se estima un techo mirando por la ventanilla, cuando no tienes el METAR delante.",
          },
          {
            x: 80,
            y: 60,
            que: "Sin desarrollo vertical",
            significa: "La capa no crece hacia arriba en ningún punto: no hay torres.",
            piloto: "Sin convección no hay turbulencia ni granizo. El problema de esta nube es otro: el techo y la visibilidad.",
          },
          {
            x: 33,
            y: 74,
            que: "Si la temperatura ronda cero",
            significa: "Una capa así puede llevar agua líquida superenfriada.",
            piloto: "Engelamiento en el ascenso o en la aproximación. Es la amenaza real de un estrato, y no se ve en la foto: se deduce de la temperatura.",
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Reconoce: cúmulos en torre",
        intro: "La misma nube de arriba, media hora antes. Saberla ver a tiempo es lo que te deja decidir el desvío con margen.",
        imagen: {
          src: "/modulos/meteorologia/mt-t08-04-cumulos-en-torre.webp",
          alt: "Cúmulos en torre creciendo contra un cielo azul profundo, con el tope todavía redondeado y nubosidad plana por debajo.",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 38,
            y: 24,
            que: "Bordes definidos y abultados",
            significa: "Contorno de coliflor, nítido contra el azul.",
            piloto: "Corriente ascendente activa: la célula está creciendo ahora mismo, mientras la miras.",
          },
          {
            x: 20,
            y: 83,
            que: "Frente a lo plano de alrededor",
            significa: "La nubosidad baja de al lado no crece; esta sí.",
            piloto: "El contraste es lo que te dice cuál de todas las nubes del cielo te va a dar problemas.",
          },
          {
            x: 44,
            y: 17,
            que: "Todavía sin yunque",
            significa: "El tope sigue redondeado y no se ha extendido de lado.",
            piloto: "Está en etapa cúmulo: aún no es un cumulonimbus, pero va camino de serlo.",
          },
          {
            x: 72,
            y: 52,
            que: "Qué significa para la ruta",
            significa: "Una torre con este ritmo de crecimiento madura en cuestión de minutos.",
            piloto: "Si tu ruta va hacia allá, el desvío se pide ahora. Cuando ya sea CB, el rodeo cuesta el triple.",
          },
        ],
      },
      {
        kind: "sub",
        text: "Interpretar: el cumulonimbus, aparte de todos",
      },
      {
        kind: "p",
        text: "Para un piloto es probablemente el tipo de nube más peligroso que existe. Contiene mucha humedad y aire inestable, y produce **rayos, granizo, tornados, ráfagas y cizalladura**. Aparece sola o en grupos: la que nace del calentamiento del aire cerca de la superficie es una tormenta de masa de aire, y la que nace del ascenso forzado en zonas montañosas es una tormenta orográfica.",
      },
      {
        kind: "kv",
        items: [
          { k: "Corrientes dentro de una tormenta", v: "pueden superar los 3.000 ft por minuto" },
          { k: "Cima de una tormenta severa", v: "puede atravesar la tropopausa y llegar a 50.000 a 60.000 ft" },
          { k: "Línea continua no frontal de cumulonimbus", v: "línea de turbonada (squall line)" },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Tormentas incrustadas",
        text: "Estas nubes de gran desarrollo vertical pueden quedar ocultas dentro de otras formaciones y no verse ni desde tierra ni en vuelo. Cuando pasa eso se llaman tormentas incrustadas, y son el argumento de por qué el radar meteorológico no es opcional: lo que no ves puede estar ahí igual.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En crucero, ruta larga",
        situacion:
          "Llevas dos horas sobre el mar con cirros muy altos y aire liso. A la altura del punto de decisión ves que por delante los cirros dan paso a una capa de altoestratos que va bajando, y más allá se adivinan cúmulos en torre.",
        pregunta: "¿Qué te está contando esa secuencia de nubes?",
        claves: [
          "Los cirros son de cristales de hielo y se forman solo en aire estable: donde estabas, el aire estaba estable.",
          "El paso a altoestratos que bajan dice que la nubosidad se está espesando y organizando por debajo, y esa familia ya trae turbulencia y engelamiento moderado.",
          "Los cúmulos en torre son la señal de inestabilidad y de que el aire alrededor y dentro es turbulento: a menudo acaban en cumulonimbus.",
          "La secuencia entera es el aviso de que vas hacia aire cada vez más inestable, y todo eso lo leíste mirando por la ventana antes de que el radar lo pintara.",
        ],
        cierre:
          "Las nubes son indicadores visibles y suelen anticipar el tiempo que viene. Esa frase del capítulo es literalmente una herramienta de trabajo.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Cómo se clasifican las nubes y qué hace falta para que se formen?",
            respuesta:
              "Por la altura de sus bases: bajas hasta 6.500 ft AGL, medias de 6.500 a 20.000 y altas por encima de 20.000, más la familia de desarrollo vertical. El tipo lo determinan la altura, la forma y el comportamiento. Para que se formen hacen falta vapor de agua suficiente, núcleos de condensación y un método por el que el aire se enfríe hasta saturarse.",
            claves: ["Bajas, medias, altas y de desarrollo vertical", "6.500 y 20.000 ft AGL", "Vapor, núcleos y enfriamiento"],
          },
          {
            nivel: "interpretacion",
            q: "¿Qué familia le preocupa más por engelamiento y por qué?",
            respuesta:
              "Las bajas y las medias. Las bajas son sobre todo gotitas de agua pero pueden traer agua superenfriada, que induce formación de hielo peligrosa. Las medias llevan agua, cristales de hielo y gotas superenfriadas, con engelamiento moderado en altoestratos y ligero en altocúmulos. Las altas, al ser de cristales de hielo, no suponen amenaza real.",
            claves: ["Agua superenfriada", "Bajas y medias", "Altas: cristales de hielo, sin amenaza real"],
          },
          {
            nivel: "situacion",
            q: "¿Qué es una tormenta incrustada y qué implica para usted?",
            respuesta:
              "Es un cumulonimbus oculto dentro de otras formaciones de nubes, que no se ve ni desde tierra ni en vuelo. Implica que no puedo fiarme solo de lo que veo por la ventana: la evitación tiene que apoyarse en el radar meteorológico y en la información meteorológica en vuelo, porque la célula puede estar ahí sin ser visible.",
            claves: ["Cumulonimbus oculto en otra nubosidad", "No visible", "Radar e información en vuelo"],
          },
        ],
      },
    ],
  },

  // ── 09 ──────────────────────────────────────────────────────────────────
  {
    n: 9,
    title: "Niebla, techo y visibilidad",
    kicker: "Los tres números que deciden si entras",
    minutes: 9,
    blocks: [
      {
        kind: "p",
        text: "La niebla es lo que más vuelos cancela, y no porque sea violenta: porque llega despacio, se queda y a veces no se va en todo el día. Saber **qué tipo** de niebla tienes delante es lo que te dice si conviene esperar cuarenta minutos o si el destino está perdido hasta mañana.",
      },
      {
        kind: "definicion",
        text: "La niebla es una nube que empieza dentro de los primeros 50 ft de la superficie. Se forma cuando la temperatura del aire cerca del suelo se enfría hasta el punto de rocío y el vapor se hace visible.",
      },
      {
        kind: "sub",
        text: "Ver: cinco nieblas y cinco comportamientos distintos",
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Se clasifica por cómo se forma, y de ahí sale cuánto dura",
        items: [
          {
            titulo: "De radiación",
            ref: "noches claras, viento nulo o muy flojo",
            puntos: [
              "El suelo se enfría rápido por radiación y el aire de alrededor llega a su punto de rocío.",
              "Típica de zonas bajas, como los valles de montaña.",
              "Con el sol y el aumento de temperatura asciende y se quema. El viento también acelera su disipación.",
              "Si tiene menos de 20 ft de espesor se llama niebla baja.",
            ],
            nota: "Es la buena noticia de las cinco: se va sola en la mañana.",
          },
          {
            titulo: "De advección",
            ref: "aire cálido y húmedo sobre una superficie fría",
            puntos: [
              "Necesita viento para formarse, al revés que la de radiación.",
              "Hasta unos 15 kt se forma y se intensifica; por encima de 15 kt suele elevarse y formar estratos bajos.",
              "Común en zonas costeras, donde la brisa mete el aire sobre tierra más fría.",
              "No se quema con el sol de la mañana: puede persistir días.",
            ],
          },
          {
            titulo: "De ladera",
            ref: "aire húmedo y estable forzado a subir una ladera",
            puntos: [
              "También necesita viento para formarse y para existir.",
              "Como la de advección, no se quema con el sol y puede durar días.",
              "Puede alcanzar más altura que la de radiación.",
            ],
          },
          {
            titulo: "De vapor (o humo de mar)",
            ref: "aire frío y seco sobre agua cálida",
            puntos: [
              "El agua se evapora, asciende y parece humo.",
              "Común sobre cuerpos de agua en las épocas frías del año.",
              "Se le asocian turbulencia de bajo nivel y engelamiento.",
            ],
            nota: "Es la única de la lista que además te trae hielo.",
          },
          {
            titulo: "De hielo",
            ref: "temperatura muy bajo cero, normalmente -25 °C o menos",
            puntos: [
              "El vapor de agua forma cristales de hielo directamente.",
              "Mismas condiciones que la de radiación salvo la temperatura.",
              "Sobre todo en regiones árticas, pero se da en latitudes medias en la estación fría.",
            ],
          },
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "La pregunta que hay que hacerse en el despacho",
        text: "No es «¿hay niebla?», es «¿qué niebla es?». Si es de radiación, el sol y el viento la levantan y la espera tiene sentido. Si es de advección o de ladera, no se quema con el sol y puede durar días: ahí la decisión es el alterno, no el retraso.",
      },
      {
        kind: "figura",
        src: "/modulos/meteorologia/mt-t09-01-cuatro-nieblas.webp",
        alt: "Cuatro viñetas con el mecanismo de cada tipo de niebla, radiación, advección, ladera y vapor, y debajo de cada una si se quema con el sol o no.",
        ancho: 1600,
        alto: 900,
        pie: "Cuatro mecanismos distintos, cuatro decisiones distintas.",
      },
      {
        kind: "sub",
        text: "Interpretar: techo y visibilidad no son lo mismo",
      },
      {
        kind: "p",
        text: "El **techo** es la altura de la base de la capa de nubes más baja que se informa como rota o cubierta, o la visibilidad vertical hacia arriba. La **visibilidad** es hasta dónde ves en horizontal. Son dos límites distintos, y **no pesan igual en todas las aproximaciones**. En una aproximación 3D, como un ILS, los mínimos se dan en DA/H y en visibilidad o RVR: el techo no es uno de ellos. En una 2D se dan en MDA/H y en visibilidad o RVR, y las condiciones de nubes solo cuando hace falta (OACI, Anexo 6). Donde el techo vuelve a contar es al planear alternos, según la norma de tu operación.",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Los mínimos son de la carta, no del curso",
        text: "Qué techo y qué visibilidad necesitas para una aproximación concreta está en la carta de aproximación de ese aeropuerto y en el manual de operaciones de tu explotador, con los ajustes que le correspondan a tu operación. Ningún curso general puede darte ese número. Lo que sí es general es lo de arriba: techo y visibilidad son dos límites distintos, y en una aproximación de precisión el que decide es la visibilidad o el RVR, no el techo.",
      },
      {
        kind: "sub",
        text: "Y la precipitación, que es lo que ya cayó",
      },
      {
        kind: "p",
        text: "La precipitación se forma cuando las gotas o los cristales crecen tanto que la nube ya no puede sostenerlos. Que caiga te dice algo de la nube que la produce, y saber leerlo ahorra sorpresas.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En el despacho, madrugada",
        situacion:
          "Tu destino costero tiene niebla desde hace seis horas con viento de 10 kt del mar. El METAR trae visibilidad por debajo de mínimos. El comandante propone salir igual y esperar en el aire a que el sol la levante, como suele pasar en el aeropuerto de montaña al que vuelan habitualmente.",
        pregunta: "¿Qué le dirías?",
        claves: [
          "En un aeropuerto costero con viento del mar, lo que hay es niebla de advección: aire cálido y húmedo sobre superficie fría, y necesita viento para formarse.",
          "Con 10 kt está justo en el rango en el que se forma y se intensifica, no en el que se eleva. Por encima de 15 kt sí tendería a subir y formar estratos bajos.",
          "La de advección no se quema con el sol de la mañana. Puede persistir días.",
          "La niebla de valle de montaña que ellos conocen es de radiación, y esa sí se levanta con el sol y el viento. Estar aplicando la experiencia de un tipo de niebla a otro es exactamente el error.",
        ],
        cierre:
          "Aquí la decisión no es esperar en el aire: es combustible y alterno. La diferencia entre las dos decisiones es una sola palabra en la clasificación de la niebla.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es la niebla y en qué se diferencia de una nube baja?",
            respuesta:
              "Es una nube que empieza dentro de los primeros 50 ft de la superficie. Se forma cuando la temperatura del aire cerca del suelo se enfría hasta el punto de rocío y el vapor de agua se condensa y se hace visible. La diferencia con una nube baja es exactamente esa: dónde empieza su base.",
            claves: ["Nube dentro de 50 ft del suelo", "Enfriamiento hasta el punto de rocío"],
          },
          {
            nivel: "interpretacion",
            q: "Diferencie niebla de radiación y niebla de advección.",
            respuesta:
              "La de radiación se forma en noches claras con poco o ningún viento, cuando el suelo se enfría rápido; es típica de zonas bajas y valles, y se disipa con el sol o con el aumento del viento. La de advección se forma cuando aire cálido y húmedo se mueve sobre una superficie fría y necesita viento: hasta unos 15 kt se forma e intensifica, por encima suele elevarse formando estratos bajos. No se quema con el sol y puede persistir días.",
            claves: [
              "Radiación: noche clara, sin viento, se quema con el sol",
              "Advección: necesita viento, superficie fría, persiste días",
              "El umbral de 15 kt",
            ],
          },
          {
            nivel: "situacion",
            q: "¿Qué tipo de niebla le preocupa además por engelamiento?",
            respuesta:
              "La niebla de vapor o humo de mar, la que se forma cuando aire frío y seco se mueve sobre aguas cálidas. Se le asocian turbulencia de bajo nivel y engelamiento, así que no es solo un problema de visibilidad.",
            claves: ["Niebla de vapor o humo de mar", "Aire frío sobre agua cálida", "Turbulencia baja y engelamiento"],
          },
        ],
      },
    ],
  },
]
