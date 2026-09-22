/**
 * Nivel 3 · Letreros y balizas (lecciones 09 a 12).
 *
 * Primero los que obligan, que son los únicos que te frenan, y después los que
 * informan; luego lo que no es letrero y sigue hablándote desde el suelo, y al
 * final un rodaje entero leído letrero por letrero, que es donde todo lo
 * anterior se usa junto y de corrido.
 *
 * La norma que se enseña es la OACI: Anexo 14 Vol. I, 9.ª edición, Enmienda 18,
 * aplicable desde el 27 de noviembre de 2025. Los puntos de espera se dibujan
 * siempre con los patrones anchos A2 y B2, y en el patrón A las dos líneas
 * continuas van del lado en que la aeronave espera y las de trazos miran a la
 * pista: esa guarda está repetida hueco por hueco a propósito.
 *
 * Los huecos llevan su código (AP-LL-NN) porque es el que Camilo usa para
 * nombrar la imagen cuando la genera. La ficha completa de cada uno está en
 * docs/BRIEF_AEROPUERTOS.md.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const NIVEL_3: DocScreen[] = [
  // ── 09 ──────────────────────────────────────────────────────────────────
  {
    n: 9,
    title: "Los que obligan",
    kicker: "Blanco sobre rojo. Los nueve letreros que no se negocian.",
    minutes: 7,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-09-01-letrero-obligatorio.webp",
        alt: "Vista desde cabina de un letrero obligatorio de pista 25-07, un letrero de emplazamiento E y un punto de espera A2",
        ancho: 1600,
        alto: 900,
        pie: "Blanco sobre rojo identifica una instrucción obligatoria: el «25-07» confirma que la calle llega al punto protegido de esa pista y no debes cruzarlo sin la autorización correspondiente. Amarillo sobre negro informa tu emplazamiento actual: estás en la calle E. Las dos líneas continuas quedan de tu lado y las dos discontinuas miran hacia la pista; ante cualquier contradicción entre autorización, carta y señalización, detente antes de las continuas y aclara.",
      },
      {
        kind: "hueco",
        rotulo: "AP-09-02 · Fotografía real · 16:9 · 1600×900",
        descripcion:
          "Avión detenido en el punto de espera, mediodía sin contraluz. Cruzando la calle, la A2 de cuatro líneas de 0,30 m y 2,10 m de ancho total; un letrero rojo «25-07» a cada lado y el emplazamiento «E» por fuera. Detrás, la B2 en escalera con «25 CAT II/III», y el eje mejorado, que llega hasta 47 m. Ojo: las continuas de la A2 van del lado de espera, nunca mirando a la pista.",
        alto: 320,
        ratio: "16 / 9",
      },
      {
        kind: "p",
        text: "En los letreros, el fondo rojo identifica una instrucción obligatoria: designa una pista, un punto de espera o un acceso prohibido y exige que la autorización coincida con lo que ves. No se interpreta aislado. Si la ruta autorizada parece llevarte más allá de un letrero rojo que no esperabas, el piloto se detiene antes del punto protegido y aclara la instrucción; no intenta resolver la contradicción mientras sigue rodando.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Designación de pista",
            hueco: {
              id: "AP-09-04",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Vista cenital: la pista con «25» a la izquierda y «07» a la derecha, la calle «E» llegando por abajo y la A2 cruzándola. Un letrero rojo «25-07» a cada lado y el emplazamiento «E» en la posición exterior. Flechas finas van del ojo del piloto a cada cabecera. Cotas de 0,30 m y 2,10 m. Ojo: nada de flechas dentro de la cara roja ni de A2 invertida.",
            },
            puntos: ["Si lees `25-07`, la 25 queda a tu izquierda."],
          },
          {
            titulo: "Punto de espera de la pista",
            hueco: {
              id: "AP-09-02",
              medida: "Fotografía real · 16:9 · 1600×900",
              descripcion:
                "La misma foto de la apertura: la A2 cruzando la calle con sus cuatro líneas de 0,30 m, el letrero rojo «25-07» a cada lado y el emplazamiento «E» por fuera. Detrás, la B2 y el letrero «25 CAT II/III». Ojo: las continuas de la A2 van del lado de espera, nunca mirando a la pista.",
            },
            puntos: ["Calle más número, `E2`. Protege el área crítica."],
          },
          {
            titulo: "Los CAT",
            hueco: {
              id: "AP-09-03",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Lámina plana con los nueve letreros obligatorios en tres filas de tres, blanco sobre rojo con contorno negro de 20 mm: «25-07», «E2», los cinco de categoría hasta «25 CAT I/II/III», el disco rojo con barra blanca sin texto y el de vía de vehículos, «PARE · NO CONTINUAR SIN AUTORIZACIÓN ATC · E1». Debajo de cada uno, su nombre en español. Ojo: no existe «25-07 CAT II», el de categoría lleva una sola cabecera.",
            },
            puntos: ["Pista más categoría, `25 CAT II/III`: dice qué operación protege ese punto."],
          },
          {
            titulo: "Prohibida la entrada",
            hueco: {
              id: "AP-09-05",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "De noche, rodando despacio hacia una unión, pavimento húmedo con reflejos. Letrero iluminado de cara roja con un disco rojo y una barra blanca horizontal, sin ninguna letra, y otro igual al otro lado de la calle prohibida. El eje amarillo continuo de la calle por la que sí se sigue. Ojo: el letrero no lleva texto y va a cada lado, nunca uno solo a la izquierda.",
            },
            puntos: ["Disco rojo con barra blanca, sin texto, a cada lado."],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "En el punto de espera",
        hueco: {
          id: "AP-09-02",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "La foto de referencia del nivel: el punto de espera completo visto desde cabina, con la A2 cruzando la calle, los dos letreros rojos «25-07», el emplazamiento «E», la B2 en escalera con «25 CAT II/III» y el eje mejorado acercándose. Ojo: las continuas de la A2 van del lado de espera, nunca mirando a la pista.",
        },
        puntos: [
          { x: 0, y: 0, que: "Cuatro líneas anchas", significa: "Patrón A2.", piloto: "Ahí paras." },
          {
            x: 0,
            y: 0,
            que: "Letrero rojo `25-07`",
            significa: "Designación de pista.",
            piloto: "Esa pista tienes enfrente.",
          },
          { x: 0, y: 0, que: "Escalera amarilla atrás", significa: "Patrón B2.", piloto: "Punto de baja visibilidad." },
          { x: 0, y: 0, que: "Trazos dobles en el eje", significa: "Eje mejorado.", piloto: "Punto de espera a 47 m o menos." },
        ],
      },
      // La comparación de dos imágenes 4:3 y un renglón: dos fichas iguales en
      // ancho, el mismo dibujo y el mismo ángulo, y la frase debajo.
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Patrón A2",
            hueco: {
              id: "AP-09-06",
              medida: "Ilustración técnica · 4:3 · 1200×900",
              descripcion:
                "Vista cenital del punto de espera, con un recuadro de la misma señal vista desde cabina. Cuatro líneas amarillas de 0,30 m con tres espacios de 0,30 m, 2,10 m de ancho total: las dos continuas del lado de espera y las dos de trazos del lado de la pista. Rótulo «A2», cotas y un letrero rojo «25-07» a cada lado. Ojo: ni A1 ni travesaños, y jamás la A2 invertida.",
            },
          },
          {
            titulo: "Patrón B2",
            hueco: {
              id: "AP-09-07",
              medida: "Ilustración técnica · 4:3 · 1200×900",
              descripcion:
                "El mismo dibujo, la misma escala y el mismo ángulo que AP-09-06, para comparar sin mover los ojos. Dos líneas amarillas continuas de 0,30 m separadas 1,5 m, 2,10 m de ancho total, unidas por travesaños de 0,9 m cada 3,0 m: la escalera. Letrero rojo «25 CAT II/III» a cada lado y rótulo «B2». Ojo: nada de patrón B1 ni de cuatro líneas sin travesaños.",
            },
          },
        ],
      },
      {
        kind: "p",
        text: "Cuatro líneas es A2, el primer punto de espera; la escalera es B2, más atrás.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En una unión de calles",
        situacion: "De noche, hacia la 25, ves un disco rojo con barra blanca.",
        pregunta: "¿Qué haces?",
        respuesta:
          "No entras. Es «prohibida la entrada»: por ahí no pasa nadie. Detente y pide encaminamiento.",
        claves: ["No entras aunque la autorización apunte hacia allá.", "No es un «hold short»."],
        hueco: {
          id: "AP-09-05",
          medida: "Fotografía real · 3:2 · 1200×800",
          descripcion:
            "La escena de noche: el letrero iluminado de cara roja con el disco rojo y la barra blanca horizontal, sin ninguna letra, y otro igual al otro lado de la calle prohibida, con el pavimento húmedo y las luces de eje verdes. Ojo: el letrero no lleva texto y va a cada lado, nunca uno solo a la izquierda.",
        },
      },
    ],
  },

  // ── 10 ──────────────────────────────────────────────────────────────────
  {
    n: 10,
    title: "Los que informan",
    kicker: "Amarillo, negro y ahora naranja: los letreros que te orientan en el área de movimiento.",
    minutes: 8,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-10-01-letreros-informativos.webp",
        alt: "Vista desde cabina de una intersección con letreros de dirección hacia N y E, emplazamiento M y una espera intermedia",
        ancho: 1600,
        alto: 900,
        pie: "Los paneles amarillos con caracteres negros y flechas anuncian hacia dónde conducen las calles N y E; el panel negro con la letra amarilla confirma que la aeronave está en M y, por eso, no lleva flecha. La línea amarilla discontinua que cruza la calle marca una espera intermedia: si la autorización exige detenerte allí, espera antes de la línea y confirma la ruta antes de escoger una bifurcación.",
      },
      {
        kind: "hueco",
        rotulo: "AP-10-02 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "Lámina de cuatro columnas con las familias de color del área de movimiento: blanco sobre rojo «25-07», negro sobre amarillo «← E» junto al amarillo sobre negro «M», blanco sobre negro para la distancia de pista restante y negro sobre naranja «CONSTRUCTION AHEAD». Contorno negro de 20 mm en clave 3 o 4. Ojo: no hay un quinto color, y el numeral de distancia va sin unidades escritas.",
        alto: 320,
        ratio: "16 / 9",
      },
      {
        kind: "p",
        text: "Los letreros amarillos y negros permiten confirmar dónde estás y hacia dónde conduce cada salida; el naranja identifica información temporal asociada con un área fuera de servicio. En una intersección, el fondo negro con caracteres amarillos confirma la calle actual, mientras el fondo amarillo con caracteres negros y flecha anuncia la dirección. Leer ambos evita girar hacia una calle correcta desde una posición equivocada.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Dirección y destino",
            hueco: {
              id: "AP-10-03",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Arriba, vista cenital de una unión en cruz con el conjunto de letreros antes de la intersección y a la izquierda; abajo, los tres dibujados de frente. Combinado «← N», «M» y «E →» con línea negra separadora; dirección suelta «↖ F» y «G ↗»; destino «CARGA →». Acotación de 60 m mínimo desde el eje de la calle intersecada. Ojo: el emplazamiento va sin flechas.",
            },
            puntos: ["Negro sobre amarillo, con flecha. El destino manda a un sitio."],
          },
          {
            titulo: "Salida de pista y pista libre",
            hueco: {
              id: "AP-10-04",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Vista cenital de una salida de pista en ángulo, con dos globos que amplían los letreros. El de salida, «E4 →», del mismo lado de la salida y a 60 m o más del punto de tangencia; el de pista libre con la configuración A dibujada dentro y, en el pavimento, la A2 con esa misma orientación. Los dos negro sobre amarillo, carácter de 400 mm. Ojo: nunca la A2 invertida ni la configuración B dentro del letrero.",
            },
            puntos: ["Detrás del segundo ya libraste la pista."],
          },
          {
            titulo: "Distancia de pista restante",
            hueco: {
              id: "AP-10-05",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Arriba, una pista con sus letreros blanco sobre negro a los dos lados, acotados cada 300 m con tolerancia de ±30 m. Abajo, cuatro viñetas negro sobre amarillo: despegue desde intersección «2 150 m →», verificación de VOR «VOR 116.3 · 147° 4.3NM», identificación del aeródromo «AEROPUERTO DEL NORTE» con caracteres de 3 m y puesto «K14». Ojo: el de despegue desde intersección va en metros, nunca en pies, y el de distancia restante lleva una sola cifra, sin unidades.",
            },
            puntos: ["Blanco sobre negro, cada 300 metros. Y cuatro que casi no verás."],
          },
          {
            titulo: "Área fuera de servicio",
            hueco: {
              id: "AP-10-06",
              medida: "Fotografía real · 16:9 · 1600×900",
              descripcion:
                "Rodando despacio hacia un tramo de calle en obra, día claro y luz lateral. Letrero rectangular de cara naranja con inscripción negra «CONSTRUCTION AHEAD» y contorno de 20 mm, reforzado con dos luces destellantes que destellan a la vez. Cerca, un letrero amarillo cubierto con una funda, conos de 0,5 m y un tablero de fajas rojas y blancas de 0,5 por 0,9 m. Ojo: ningún texto inventado en la cara naranja.",
            },
            puntos: ["Negro sobre naranja. Avisa de obras o de distancias reducidas."],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "El tramo en obra",
        hueco: {
          id: "AP-10-06",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "La misma escena de la obra vista desde cabina: el letrero naranja «CONSTRUCTION AHEAD» con sus dos luces destellantes, el letrero amarillo tapado con una funda, los conos y el tablero de fajas rojas y blancas, y el eje de calle amarillo continuo entrando al cuadro. Ojo: ningún texto inventado en la cara naranja.",
        },
        puntos: [
          { x: 0, y: 0, que: "Cara naranja", significa: "Área fuera de servicio.", piloto: "Hay obra adelante." },
          { x: 0, y: 0, que: "Dos luces destellando", significa: "Refuerzo.", piloto: "Te obligan a mirarlo." },
          {
            x: 0,
            y: 0,
            que: "Texto corto en mayúsculas",
            significa: "Mensaje operacional.",
            piloto: "Tu cálculo cambia.",
          },
          { x: 0, y: 0, que: "Letrero amarillo tapado", significa: "Ayuda retirada.", piloto: "Ya no aplica." },
        ],
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Emplazamiento",
            hueco: {
              id: "AP-10-07",
              medida: "Fotografía real · 4:3 · 1200×900",
              descripcion:
                "A ras de pavimento, desde unos 15 m, día nublado de luz plana. Un letrero solo, aislado, cara negra con la inscripción amarilla «M2» y el borde amarillo corrido de 0,5 veces el ancho de trazo, porque va solo. Carácter de 300 mm, cara de 450 mm, altura instalada máxima de 900 mm, soporte frangible bajo. Rótulo «Emplazamiento» arriba a la izquierda. Ojo: sin flechas y sin fondo amarillo.",
            },
          },
          {
            titulo: "Dirección",
            hueco: {
              id: "AP-10-08",
              medida: "Fotografía real · 4:3 · 1200×900",
              descripcion:
                "El mismo punto de vista, la misma luz y el mismo tamaño de letrero que AP-10-07: solo cambia el letrero. Cara amarilla con la inscripción negra «E →», la flecha dentro de la cara y a la derecha de la letra, sin borde. Carácter de 300 mm, altura instalada máxima de 900 mm, el mismo soporte frangible. Rótulo «Dirección» arriba a la izquierda. Ojo: un letrero de dirección sin flecha no existe.",
            },
          },
        ],
      },
      {
        kind: "p",
        text: "Emplazamiento: amarillo sobre negro, sin flecha. Dirección: negro sobre amarillo, siempre con flecha.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Después de aterrizar",
        situacion: "Aterrizaste y saliste por la calle E. El controlador pregunta si libraste.",
        pregunta: "¿Ya libraste?",
        respuesta:
          "Solo si el avión entero pasó el letrero de pista libre. Ese marca el área crítica.",
        claves: ["El avión entero tiene que haberlo pasado.", "Lleva dibujada dentro la configuración A."],
        hueco: {
          id: "AP-10-04",
          medida: "Ilustración técnica · 3:2 · 1200×800",
          descripcion:
            "La salida de pista en ángulo con sus dos letreros ampliados: «E4 →» antes de la salida y, más adelante, el de pista libre con la configuración A dibujada dentro, junto a la A2 pintada en el pavimento con la misma orientación. Ojo: nunca la A2 invertida ni la configuración B dentro del letrero.",
        },
      },
    ],
  },

  // ── 11 ──────────────────────────────────────────────────────────────────
  {
    n: 11,
    title: "Balizas, paneles e indicadores",
    kicker: "Lo que no es letrero y sigue hablándote desde el suelo.",
    minutes: 8,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-11-01-manga-viento.webp",
        alt: "Manga de viento de cinco bandas junto a una pista, con su boca, dirección y círculo de visibilidad señalados",
        ancho: 1600,
        alto: 900,
        pie: "La boca ancha de la manga queda hacia el lugar del que viene el viento y la punta se extiende hacia sotavento. Las cinco bandas alternas ayudan a reconocerla desde lejos, mientras el círculo blanco hace visible su emplazamiento desde el aire. La manga aporta una indicación visual inmediata, no una lectura exacta: la tripulación la contrasta con ATIS, torre y los datos de viento disponibles.",
      },
      {
        kind: "hueco",
        rotulo: "AP-11-02 · Fotografía real · 16:9 · 1600×900",
        descripcion:
          "Desde unos 25 m, a la altura del pecho, la manga de perfil y extendida al mediodía. Se cuentan las cinco bandas alternas, con la primera y la última anaranjadas; se ven la boca grande y la pequeña, esta hacia sotavento, y la banda circular blanca de 15 m de diámetro y 1,2 m de ancho alrededor del soporte, con su luz. Ojo: la manga a medio inflar no sirve, hay que poder contar las bandas.",
        alto: 320,
        ratio: "16 / 9",
      },
      {
        kind: "p",
        text: "No toda la información llega en un letrero. La manga muestra dirección y una estimación visual del viento en la superficie; las balizas delimitan bordes cuando no hay una señal pintada suficiente; el área de señales y la lámpara de la torre ofrecen indicaciones que todavía importan si falla la radio. El piloto usa estas ayudas para confirmar la situación, no para reemplazar el ATIS, la carta o una autorización recibida.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "El indicador de dirección del viento",
            hueco: {
              id: "AP-11-03",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Lámina plana con la manga de perfil y en horizontal, cotada: longitud de 3,6 m como mínimo, diámetro de la base mayor de 0,9 m como mínimo, legible desde 300 m de altura. Las cinco bandas numeradas, con la 1 y la 5 del color oscuro. A la derecha, el círculo de emplazamiento con sus cotas de 15 m y 1,2 m. Al pie, en gris, «Colombia exige el color anaranjado». Ojo: nada de medidas en pies.",
            },
            puntos: ["Cono de tela de 3,6 metros como mínimo."],
          },
          {
            titulo: "Las balizas",
            hueco: {
              id: "AP-11-04",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Ocho viñetas en dos filas con las familias de balizas: borde de pista sin pavimentar de 1 por 3 m mínimo, borde de zona de parada, coníferas cada 100 m en nieve, borde de calle de rodaje azul retrorreflectante de 150 cm² de área visible, eje verde de 20 cm², cono de borde sin pavimentar, delimitadora de 3 por 1 m con recorte de 0,5 m y área fuera de servicio. Ojo: ninguna baliza alta junto a pista o calle.",
            },
            puntos: ["Ocho familias, frangibles y bajas. Azul el borde, verde el eje."],
          },
          {
            titulo: "La lámpara de señales",
            hueco: {
              id: "AP-11-05",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "Interior de una torre al anochecer, desde detrás del controlador, que aparece de espaldas y sin rasgos. La lámpara montada y apuntada al ventanal, con su empuñadura y su mira, y el haz verde saliendo hacia la pista, que se adivina al fondo con sus luces. Da rojo, verde y blanco, haz de 1° a 3°, 6 000 cd o más de día. Ojo: ninguna cara identificable ni pantallas con datos reales.",
            },
            puntos: ["Rojo, verde y blanco. Te aterriza sin radio."],
          },
          {
            titulo: "El área de señales",
            hueco: {
              id: "AP-11-06",
              medida: "Ilustración técnica · 16:9 · 1600×900",
              descripcion:
                "A la izquierda, el área de señales cenital: cuadrada, de 9 m de lado como mínimo, con borde blanco de 0,3 m. A la derecha, los paneles a la misma escala: cuadrado rojo con dos diagonales amarillas y con una sola, haltera blanca, haltera con barras negras, cruz de cerrado, la «T» de aterrizaje con brazo de 4 por 0,4 m, las cifras de despegue, la flecha de circuito, la «C» de ARO y la doble cruz de planeadores. Ojo: nada de tetraedro ni de círculo segmentado.",
            },
            puntos: ["Nueve metros de lado, con paneles que ves desde arriba."],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "La manga y su círculo",
        hueco: {
          id: "AP-11-02",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "La manga de perfil y extendida al mediodía, con las cinco bandas alternas contables, la primera y la última anaranjadas, la boca pequeña hacia sotavento y la banda circular blanca de 15 m de diámetro y 1,2 m de ancho alrededor del soporte. Ojo: la manga a medio inflar no sirve, hay que poder contar las bandas.",
        },
        puntos: [
          { x: 0, y: 0, que: "Cono de tela", significa: "El viento real.", piloto: "Sale por la boca chica." },
          { x: 0, y: 0, que: "Cinco bandas", significa: "Dos colores.", piloto: "Primera y última, oscuras." },
          { x: 0, y: 0, que: "Cono horizontal", significa: "Intensidad.", piloto: "Cuanto más horizontal, más viento." },
          { x: 0, y: 0, que: "Círculo blanco en el suelo", significa: "Emplazamiento.", piloto: "15 metros." },
        ],
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Haltera sola",
            hueco: {
              id: "AP-11-07",
              medida: "Ilustración técnica · 4:3 · 1200×900",
              descripcion:
                "Vista cenital del panel solo y centrado sobre el área de señales, fondo gris claro sin sombras. Una haltera blanca, dos discos unidos por una barra, sin ninguna barra negra encima, y un fragmento del borde blanco de 0,3 m para dar escala. Rótulo «Haltera sola» y, debajo en gris, «Todo limitado a pistas y calles de rodaje». Ojo: sin cotas del panel, que no están verificadas.",
            },
          },
          {
            titulo: "Haltera con barras",
            hueco: {
              id: "AP-11-08",
              medida: "Ilustración técnica · 4:3 · 1200×900",
              descripcion:
                "El mismo dibujo, la misma escala y el mismo ángulo que AP-11-07: solo cambian las barras. La misma haltera blanca con una barra negra perpendicular al eje sobre cada uno de los dos discos, y el mismo fragmento de borde blanco. Rótulo «Haltera con barras» y, debajo en gris, «Solo aterrizaje y despegue limitados a pistas». Ojo: ni una sola barra ni barras paralelas al eje.",
            },
          },
        ],
      },
      {
        kind: "p",
        text: "La haltera sola limita todo a pistas y calles; con barras, solo aterrizaje y despegue.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Sin radio, en circuito",
        situacion: "Te quedas sin radio en circuito. La torre te apunta y ves verde fija.",
        pregunta: "¿Qué contestas?",
        respuesta:
          "Verde fija en vuelo: autorizado a aterrizar. Contestas balanceando las alas o con las luces.",
        claves: ["El mismo verde en tierra es despegue.", "La lámpara da rojo, verde y blanco."],
        hueco: {
          id: "AP-11-05",
          medida: "Fotografía real · 3:2 · 1200×800",
          descripcion:
            "La lámpara de señales de la torre al anochecer, apuntada al ventanal y con el haz verde saliendo hacia la pista, con el controlador de espaldas y sin rasgos reconocibles. Ojo: ninguna cara identificable ni pantallas con datos reales.",
        },
      },
    ],
  },

  // ── 12 ──────────────────────────────────────────────────────────────────
  // La lección práctica: seis fotos del mismo rodaje, en orden, con una línea
  // de texto cada una. Van como hueco y párrafo alternados, no como fichas, para
  // que se lea como una secuencia y no como un catálogo. No lleva comparación:
  // una secuencia no compara nada.
  {
    n: 12,
    title: "Un rodaje leído letrero por letrero",
    kicker: "De la puerta a la pista, seis fotos y seis decisiones.",
    minutes: 9,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-12-01-rodaje-secuencia.webp",
        alt: "Rodaje desde cabina con una secuencia de letreros de emplazamiento, dirección y pista explicados paso a paso",
        ancho: 1600,
        alto: 900,
        pie: "Un rodaje seguro se confirma por etapas. Primero, el panel negro «M» fija tu posición; después, los paneles amarillos con flecha permiten comparar cada giro con la ruta autorizada; finalmente, el letrero rojo «13-31» anuncia el límite protegido de la pista. Si cualquiera de esas tres lecturas no coincide con la carta o la autorización, detén la aeronave antes de improvisar el siguiente movimiento.",
      },
      {
        kind: "hueco",
        rotulo: "AP-12-02 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "Plano cenital esquemático: la plataforma abajo con el puesto «K14», las calles «M», «E» y «F» en el centro, la pista «07-25» arriba y la paralela más allá. La ruta va marcada con línea gruesa y seis círculos numerados del 1 al 6, uno por foto. Se ven el punto de espera intermedio, la calle prohibida, la A2 con la B2 detrás y la vía de vehículos. Ojo: ni A1 ni B1, ni la A2 invertida.",
        alto: 320,
        ratio: "16 / 9",
      },
      {
        kind: "p",
        text: "Ahora se integra todo en un rodaje desde la puerta hasta la pista. Antes de mover el avión, la tripulación traza la autorización en la carta e identifica puntos críticos; durante el rodaje confirma cada letrero y cada cruce en voz alta. Si la secuencia real deja de coincidir con la preparada, la decisión correcta es detenerse en un lugar seguro y preguntar, no seguir hasta encontrar una señal conocida.",
      },
      {
        kind: "hueco",
        rotulo: "AP-12-03 · Fotografía real · 3:2 · 1200×800",
        descripcion:
          "Foto 1 de 6, misma cámara y misma luz que las cinco siguientes. Avión detenido en el puesto de un aeropuerto latinoamericano grande, mañana de luz lateral. Letrero de identificación de puesto, negro sobre amarillo, con la inscripción «K14», legible sin esfuerzo; las señales pintadas de entrada y de parada del puesto, y el eje de rodaje arrancando por delante. Ojo: ningún logo, matrícula ni rotulación en otro idioma.",
        alto: 300,
        ratio: "3 / 2",
      },
      {
        kind: "p",
        text: "**1. En el puesto.** Letrero amarillo `K14`. Lo lees antes de entrar.",
      },
      {
        kind: "hueco",
        rotulo: "AP-12-04 · Fotografía real · 3:2 · 1200×800",
        descripcion:
          "Foto 2 de 6, misma cámara, mismo avión, misma luz. Ya en movimiento, llegando al límite de la plataforma. A la izquierda del eje, el letrero combinado en este orden: «← N», «M» en cara negra con borde amarillo y «E →», con líneas negras verticales separando cada elemento. El eje de calle amarillo continuo entra al cuadro. Ojo: ninguna flecha dentro del letrero de emplazamiento.",
        alto: 300,
        ratio: "3 / 2",
      },
      {
        kind: "p",
        text: "**2. Saliendo de plataforma.** Combinado `← N`, `M`, `E →`. Estás en la M.",
      },
      {
        kind: "hueco",
        rotulo: "AP-12-05 · Fotografía real · 3:2 · 1200×800",
        descripcion:
          "Foto 3 de 6, misma cámara y misma luz, el avión frenando. Una sola línea amarilla de trazos cruza la calle de lado a lado en el tercio inferior, y el eje de calle se interrumpe al cruzarla. A la izquierda, un letrero de emplazamiento aislado, cara negra con la inscripción amarilla «M2» y su borde amarillo. Ojo: cuatro líneas serían un punto de espera de pista, y aquí no hay ninguno.",
        alto: 300,
        ratio: "3 / 2",
      },
      {
        kind: "p",
        text: "**3. Punto de espera intermedio.** Línea de trazos y letrero `M2`. Paras ahí si te lo indican.",
      },
      {
        kind: "hueco",
        rotulo: "AP-12-06 · Fotografía real · 3:2 · 1200×800",
        descripcion:
          "Foto 4 de 6, misma cámara y misma luz, llegando a una unión en cruz. A la izquierda, el letrero de dirección «↖ F» y «G ↗», separados por una línea negra vertical. Al fondo a la derecha, la calle prohibida con su disco rojo y barra blanca, sin texto. Al fondo a la izquierda, el letrero de vía de vehículos, «PARE · NO CONTINUAR SIN AUTORIZACIÓN ATC», en español. Ojo: nada de «NO ENTRY» dentro del disco.",
        alto: 300,
        ratio: "3 / 2",
      },
      {
        kind: "p",
        text: "**4. Unión con la F.** Dirección `↖ F` y `G ↗`. Y un disco rojo.",
      },
      {
        kind: "hueco",
        rotulo: "AP-12-07 · Fotografía real · 3:2 · 1200×800",
        descripcion:
          "Foto 5 de 6, misma cámara y misma luz, acercándose despacio al punto de espera. El eje mejorado arranca en el primer tercio, con doble línea de trazos a cada lado del eje continuo, y llega hasta 47 m desde la A2. Cruzando al fondo, la A2 de cuatro líneas de 0,30 m con las continuas del lado de espera, sus letreros rojos «25-07» y el emplazamiento «E» por fuera; antes de ella, más cerca de la cámara, la B2 con «25 CAT II/III». Ojo: nunca la A2 invertida.",
        alto: 300,
        ratio: "3 / 2",
      },
      {
        kind: "p",
        text: "**5. Acercándote a la pista.** El eje mejorado arranca a 47 m o menos. Frenas antes.",
      },
      {
        kind: "hueco",
        rotulo: "AP-12-08 · Fotografía real · 3:2 · 1200×800",
        descripcion:
          "Foto 6 de 6, misma cámara y misma luz, girando para alinearse y entrando a la pista por una intersección. A la izquierda, el letrero de despegue desde intersección, negro sobre amarillo, con «2 150 m →», a 60 m o más del eje de pista. Al fondo, la señal de eje de pista y un letrero blanco sobre negro de distancia restante. Ojo: la cifra del letrero de intersección va en metros, nunca en pies.",
        alto: 300,
        ratio: "3 / 2",
      },
      {
        kind: "p",
        text: "**6. Autorizado a entrar.** `2 150 m →` es el TORA que te queda.",
      },
      {
        kind: "reconoce",
        titulo: "El plano de la ruta",
        hueco: {
          id: "AP-12-02",
          medida: "Ilustración técnica · 16:9 · 1600×900",
          descripcion:
            "El mismo plano cenital de la apertura: la ruta desde el puesto «K14» hasta el punto de espera de la 25, con los seis círculos numerados donde se tomó cada foto, el punto de espera intermedio de la «M», la calle prohibida, la A2 con la B2 detrás y la entrada de la vía de vehículos. Ojo: ni A1 ni B1, ni la A2 invertida.",
        },
        puntos: [
          { x: 0, y: 0, que: "Línea amarilla continua", significa: "Eje de rodaje.", piloto: "Tu carril." },
          { x: 0, y: 0, que: "Seis puntos", significa: "La secuencia.", piloto: "Cada uno con su letrero." },
          { x: 0, y: 0, que: "Rojo en el punto 5", significa: "Obligatoria.", piloto: "Único freno." },
          { x: 0, y: 0, que: "Vía de vehículos", significa: "Tránsito de tierra.", piloto: "Espera lo mismo." },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "En el punto 5",
        situacion: "Estás en el punto 5, de noche y con RVR de 400 metros.",
        pregunta: "¿A2 o escalera?",
        respuesta:
          "En el punto que indiquen el procedimiento de baja visibilidad vigente y la autorización. Si la operación protege el área sensible del ILS, será el punto de categoría más alejado, identificado por el patrón B2 y su letrero; la RVR por sí sola no autoriza a escogerlo ni a cruzarlo.",
        claves: [
          "Se verifica el procedimiento LVP y el punto asignado antes de llegar al cruce.",
          "Pasarse del punto activo puede contaminar el área sensible del ILS.",
        ],
        hueco: {
          id: "AP-12-07",
          medida: "Fotografía real · 3:2 · 1200×800",
          descripcion:
            "La foto 5 de la secuencia: el eje mejorado arrancando a 47 m, la A2 cruzando al fondo con las continuas del lado de espera y los letreros rojos «25-07», y antes de ella, más cerca de la cámara, la B2 en escalera con «25 CAT II/III». Ojo: nunca la A2 invertida.",
        },
      },
    ],
  },
]
