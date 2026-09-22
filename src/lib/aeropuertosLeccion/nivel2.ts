/**
 * Nivel 2 · Lo pintado en el suelo (lecciones 5 a 8).
 *
 * Es el nivel del suelo, en el orden en que un vuelo se encuentra las señales:
 * primero lo que se lee en la pista, luego el pavimento que hay delante y no
 * siempre es tuyo, después dónde se para antes de entrar y, al final, cómo se
 * llega al puesto. Norma OACI, Anexo 14 Volumen I, 9.ª edición con la Enmienda
 * 18, aplicable desde el 27 de noviembre de 2025; los puntos de espera se
 * dibujan siempre con los patrones anchos A2 y B2, nunca con A1 ni B1.
 *
 * Los huecos llevan su código (AP-LL-NN) porque es el que Camilo usa para
 * nombrar la imagen cuando la genera. La ficha completa de cada uno está en
 * docs/BRIEF_AEROPUERTOS.md.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const NIVEL_2: DocScreen[] = [
  // ── 05 ──────────────────────────────────────────────────────────────────
  {
    n: 5,
    title: "Señales de pista",
    kicker: "Todo lo blanco te está diciendo algo",
    minutes: 7,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-05-01-senales-pista.webp",
        alt: "Vista aérea de la cabecera de la pista 27 con umbral, designador, eje, referencia de apuntado y zona de toma señalados",
        ancho: 1600,
        alto: 900,
        pie: "En corta final, las fajas de umbral confirman dónde comienza la superficie disponible para aterrizar y el designador identifica la orientación de la pista. Después, el eje mantiene la alineación. Las dos barras largas son la referencia de apuntado (su nombre técnico es señal de punto de visada), no el lugar exacto donde deben tocar las ruedas; las barras posteriores delimitan la zona prevista para la toma de contacto. Todas estas señales son blancas: una línea amarilla pertenece al sistema de rodaje, no a la pista.",
      },
      {
        kind: "p",
        text: "Las señales blancas identifican la pista y organizan la alineación, el umbral, la referencia de apuntado y la zona de toma de contacto. En publicaciones técnicas, esa referencia aparece como «señal de punto de visada»: son las dos barras largas hacia las que diriges visualmente la trayectoria, no una orden de posar allí las ruedas. En corta final permiten confirmar que miras la superficie correcta; después del toque, las marcas siguientes ayudan a reconocer cuánto te has alejado del umbral.",
      },
      {
        kind: "p",
        text: "La identidad de la pista es blanca; el amarillo pertenece a calles, puntos de espera, márgenes o superficies que no se usan como pista. Al abandonar después del aterrizaje puede aparecer una guía amarilla de salida sobre el pavimento, así que el color por sí solo no confirma que estés libre: todo el avión debe cruzar el punto de espera aplicable.",
      },
      {
        kind: "hueco",
        rotulo: "AP-05-02 · Fotografía real · 16:9 · 1600×900",
        descripcion:
          "Fotografía aérea cenital del tercio de aproximación de una pista de precisión de 45 o 60 m, con el umbral entrando por abajo. Los seis elementos tienen que ser contables a ojo: designadora, fajas de umbral, eje en trazos, referencia de apuntado (señal de punto de visada en la publicación), los primeros pares de toma de contacto y la faja lateral. Ojo: nada de umbral desplazado ni de galones, que son de otra lección.",
        alto: 340,
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Señal designadora",
            hueco: {
              id: "AP-05-03",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "Designadora vista desde unos 60 m, casi en el eje de aproximación, para que los dígitos se lean derechos. Dos cifras blancas de 9 m de alto, la décima parte del rumbo magnético del eje, redondeada, vista desde la aproximación, con la letra de paralela al lado. Dice «13L». Ojo: nunca una sola cifra sin cero delante, ni dígitos amarillos.",
            },
            puntos: ["La décima parte del rumbo magnético, redondeada, desde la aproximación."],
          },
          {
            titulo: "Señal de eje",
            hueco: {
              id: "AP-05-04",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Tres franjas de pavimento apiladas, cenital pura, cada una con su eje a escala: 0,90 m para CAT II y CAT III, 0,45 m para CAT I y no precisión clave 3 o 4, y 0,30 m para visual y no precisión clave 1 o 2. En las tres, trazo más espacio entre 50 y 75 m, acotado arriba. Ojo: el eje va siempre en trazos, nunca continuo y nunca amarillo.",
            },
            puntos: ["Su ancho delata la pista: 0,90, 0,45 o 0,30 m."],
          },
          {
            titulo: "Señal de umbral",
            hueco: {
              id: "AP-05-05",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Cinco umbrales en fila, cenital pura y a la misma escala, con 4, 6, 8, 12 y 16 fajas para pistas de 18, 23, 30, 45 y 60 m. Faja de 30 m de largo por 1,80 m de ancho, separadas 1,80 m, con el grupo arrancando a 6 m del umbral y simétrico respecto del eje. Ojo: nunca un número impar de fajas a un lado del eje.",
            },
            puntos: ["Cuenta las fajas y sabes el ancho."],
          },
          {
            titulo: "Faja lateral",
            hueco: {
              id: "AP-05-06",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "Faja lateral vista desde el borde de la pista a 1,6 m del suelo, mirando a lo largo hasta el punto de fuga, con luz rasante de atardecer. Faja blanca continua de 0,90 m o más, con su borde exterior sobre el borde del pavimento; detrás, el margen y el pasto. Ojo: si la faja sale amarilla o doble ya es calle de rodaje, no pista.",
            },
            puntos: ["Hasta ahí llega el pavimento de pista."],
          },
          {
            titulo: "Referencia de apuntado y zona de toma",
            hueco: {
              id: "AP-05-07",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Los primeros 900 m de una pista de precisión de 45 m, cenital y tumbada en horizontal, con la escala en metros abajo. Referencia de apuntado a 400 m del umbral, formada por las dos barras largas de la señal de punto de visada; seis pares de la zona de toma de contacto cada 150 m, de 22,5 por 3 m. Ojo: ningún par pegado a la referencia de apuntado; los que caigan a 50 m o menos se borran, y ese hueco tiene que verse.",
            },
            puntos: ["Ahí apuntas; los grupos de barras dan referencias de distancia desde el umbral."],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "La pista desde corta final",
        hueco: {
          id: "AP-05-08",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "Desde la cabina, en corta final a 60 m sobre el umbral y en el eje, con un pedazo de glareshield abajo. Pista de precisión de 45 m: doce fajas de umbral contables, designadora, eje en trazos, referencia de apuntado y al menos dos pares de toma de contacto, con faja lateral a los dos lados. Ojo: ninguna señal amarilla sobre la pista y ninguna otra aeronave.",
        },
        // Sin foto todavía: los puntos van en 0 y el bloque los pinta como
        // lista numerada. Cuando exista AP-05-08 se les pone la posición.
        puntos: [
          {
            x: 0,
            y: 0,
            que: "Fajas de umbral",
            significa: "Dan el ancho de la pista.",
          },
          {
            x: 0,
            y: 0,
            que: "Designadora",
            significa: "Rumbo de aproximación.",
            piloto: "No es la paralela.",
          },
          {
            x: 0,
            y: 0,
            que: "Referencia de apuntado",
            significa: "Dos fajas gruesas.",
            piloto: "Ahí apuntas.",
          },
          {
            x: 0,
            y: 0,
            que: "Zona de toma de contacto",
            significa: "Un par cada 150 m.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Antes de despegar",
        situacion:
          "Despegas de una pista nueva. Cuentas doce fajas de umbral y el eje se ve angosto.",
        pregunta: "¿Qué pista tienes debajo?",
        respuesta:
          "Doce fajas corresponden a una pista de 45 m de ancho. Un eje angosto permite descartar visualmente el ancho de 0,90 m previsto para CAT II o III, pero no demuestra por sí solo que la pista sea CAT I.",
        claves: [
          "La categoría y el sistema disponible se confirman en la carta y en la información vigente; no se deducen de una sola señal.",
        ],
        // Reutiliza la lámina de la ficha «Señal de umbral».
        hueco: {
          id: "AP-05-05",
          medida: "Ilustración técnica · 3:2 · 1200×800",
          descripcion:
            "Se reutiliza la lámina de los cinco umbrales, con 4, 6, 8, 12 y 16 fajas para pistas de 18, 23, 30, 45 y 60 m. Ojo: nunca un número impar de fajas a un lado del eje.",
        },
      },
    ],
  },

  // ── 06 ──────────────────────────────────────────────────────────────────
  {
    n: 6,
    title: "Umbral desplazado y zonas cerradas",
    kicker: "Pavimento que no siempre puedes usar",
    minutes: 7,
    blocks: [
      {
        kind: "figura",
        src: "/modulos/aeropuertos/ap-06-01-umbral-desplazado.webp",
        alt: "Vista aérea de una pista con galones amarillos, flechas blancas y un umbral desplazado, señalados con rótulos didácticos",
        ancho: 1600,
        alto: 900,
        pie: "Los galones amarillos delimitan pavimento que no se usa para rodar, despegar ni aterrizar. Las flechas blancas identifican el tramo anterior al umbral: en esta dirección puede utilizarse para rodaje y despegue, pero no para iniciar el aterrizaje; desde el sentido contrario puede formar parte del recorrido de aterrizaje. La faja transversal y las fajas de umbral marcan dónde comienza la LDA para la aproximación mostrada. Antes de operar, confirma las distancias publicadas y cualquier restricción vigente.",
      },
      {
        kind: "p",
        text: "No todo el pavimento alineado con una pista tiene el mismo uso. Las flechas blancas antes de un umbral desplazado permiten rodar y despegar en esa dirección, y también forman parte del recorrido de aterrizaje desde el sentido contrario; los galones amarillos identifican una zona que no se usa para rodar, despegar ni aterrizar. La diferencia cambia la TORA, la LDA y la decisión de continuar una aproximación.",
      },
      {
        kind: "p",
        text: "Te lo dicen las flechas, los galones y las cruces.",
      },
      {
        kind: "hueco",
        rotulo: "AP-06-02 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "Anatomía completa del umbral desplazado permanente, cenital pura y de izquierda a derecha: galones amarillos, tramo de flechas, puntas de flecha, faja transversal de 1,80 m y fajas de umbral arrancando a 6 m. Los galones solo se pintan si el pavimento previo está pavimentado, mide más de 60 m y no sirve para uso normal. Ojo: nada de barra de demarcación amarilla de 1 m, que es de la FAA.",
        alto: 340,
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Umbral desplazado temporal",
            hueco: {
              id: "AP-06-03",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Tramo de 400 m con umbral desplazado temporal, cenital pura. Las señales anteriores van tapadas, apenas un fantasma gris; el eje se convierte en flechas blancas; un galón grande en punta de flecha, de altura 10 m o más y trazo de 1,2 m o más, cruza al final del tramo; a un costado, una baliza portátil para los desplazamientos cortos. Ojo: nada de galones amarillos aquí, que son del caso permanente.",
            },
            puntos: ["Se tapan las señales viejas; el eje se vuelve flechas."],
          },
          {
            titulo: "Pista cerrada y calle cerrada",
            hueco: {
              id: "AP-06-06",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Cenital pura y a la misma escala: arriba, un tramo de pista cerrada con dos cruces blancas de 36 m de brazo, 14,5 m de travesaño y faja de 1,80 m, separadas 300 m como máximo; abajo, una calle de rodaje cerrada con una cruz amarilla de 9 m, travesaño de 3,75 m y faja de 1,50 m. Ojo: la cruz de la pista es blanca y la de la calle amarilla, nunca al revés.",
            },
            puntos: ["Cruz blanca en la pista; amarilla en la calle."],
          },
          {
            titulo: "Cruz de luces",
            hueco: {
              id: "AP-06-05",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "Cruz de luces de pista cerrada en aproximación nocturna, desde 150 m de altura y a 1 km del umbral. Blanca variable y destellante, un segundo encendida y un segundo apagada, montada sobre el eje, con 5 luces por brazo como mínimo separadas 1,5 m, y la pista a oscuras alrededor. Si todavía no hay foto de una instalada, se hace como ilustración técnica con el mismo encuadre. Ojo: nunca amarilla, que esa es la de la FAA.",
            },
            puntos: ["Nueva: destella un segundo sí y un segundo no."],
          },
          {
            titulo: "Área fuera de servicio",
            hueco: {
              id: "AP-06-04",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Calle de rodaje vista a 20° de la vertical, como la ve quien llega rodando. Señal pintada con inscripción negra sobre fondo naranja que dice «FUERA DE SERVICIO», con el fondo sobresaliendo 0,50 m o más del texto, y al fondo el letrero del mismo color con contorno negro de 10 mm en clave 1 o 2 y de 20 mm en clave 3 o 4. Ojo: el fondo nunca rojo ni amarillo, que son otras dos señales.",
            },
            puntos: ["También nueva: negro sobre naranja."],
          },
        ],
      },
      {
        // La comparación de la lección: dos mitades que se superponen, con un
        // hueco en cada una. Van juntas o no comparan nada.
        kind: "fichas",
        titulo: "Lado a lado: flechas contra galones",
        columnas: 2,
        items: [
          {
            titulo: "Flechas de umbral desplazado",
            hueco: {
              id: "AP-06-07",
              medida: "Ilustración técnica · 4:3 · 1200×900",
              descripcion:
                "Mitad izquierda de la comparación, cenital pura: 250 m de pista de 45 m con el eje de abajo arriba. Flechas blancas sobre el eje apuntando al umbral, la fila de puntas de flecha, la faja transversal blanca de 1,80 m y las fajas de umbral arrancando a 6 m. Una silueta gris de avión despegando sobre el tramo, porque ahí se rueda, se despega y se termina el aterrizaje. Ojo: en esta mitad no entra ni un galón amarillo.",
            },
            puntos: ["Sobre las flechas despegas y ruedas."],
          },
          {
            titulo: "Galones",
            hueco: {
              id: "AP-06-08",
              medida: "Ilustración técnica · 4:3 · 1200×900",
              descripcion:
                "Mitad derecha, con el encuadre, la escala y la faja transversal exactamente donde están en la izquierda. El tramo previo, lleno de galones amarillos a 45° apuntando a la pista, de trazo 0,90 m y separados 30 m; y la misma silueta de avión, esta vez tachada, porque ahí no se aterriza, no se despega y no se rueda. Ojo: en esta mitad no va ninguna flecha ni punta de flecha.",
            },
            puntos: ["Sobre los galones, nada."],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Cabecera con umbral desplazado",
        hueco: {
          id: "AP-06-09",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "Fotografía aérea oblicua desde 200 m de altura y 800 m de la cabecera, en el eje de aproximación, con la secuencia entera de abajo arriba: galones amarillos contables, flechas sobre el eje, puntas de flecha, faja transversal de borde a borde, primera fila de fajas de umbral y la designadora. Ojo: ninguna cruz de cierre ni barra de demarcación amarilla de 1 m, que es de la FAA.",
        },
        puntos: [
          {
            x: 0,
            y: 0,
            que: "Galones amarillos",
            significa: "No apto para uso normal.",
            piloto: "Ni aterrizas ni ruedas.",
          },
          {
            x: 0,
            y: 0,
            que: "Faja transversal",
            significa: "El umbral real.",
            piloto: "Desde aquí cuenta tu aterrizaje.",
          },
          {
            x: 0,
            y: 0,
            que: "Flechas sobre el eje",
            significa: "Tramo previo.",
            piloto: "Sirve para despegar.",
          },
          {
            x: 0,
            y: 0,
            que: "Primera faja de umbral",
            significa: "Aquí empieza lo que puedes tocar.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Alineado para despegar",
        situacion:
          "Estás alineado para despegar. Delante ves flechas blancas y, más allá, la faja transversal.",
        pregunta: "¿Puedes usar ese tramo para despegar?",
        respuesta:
          "Sí. El tramo previo al umbral desplazado sirve para rodar y despegar; no para tomar contacto.",
        claves: ["Sobre galones, nada."],
        // Reutiliza la fotografía del «Reconoce».
        hueco: {
          id: "AP-06-09",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "Se reutiliza la aérea oblicua del «Reconoce», con la secuencia entera: galones, flechas, puntas de flecha, faja transversal y fajas de umbral. Ojo: ninguna cruz de cierre ni barra de demarcación amarilla de 1 m, que es de la FAA.",
        },
      },
    ],
  },

  // ── 07 ──────────────────────────────────────────────────────────────────
  {
    n: 7,
    title: "Dónde se espera",
    kicker: "Las cuatro líneas que evitan una incursión",
    minutes: 8,
    blocks: [
      {
        kind: "hueco",
        rotulo: "AP-07-01 · Ilustración de escena · 16:9 · 1600×900",
        descripcion:
          "Desde la cabina de un avión que rueda, a 5 m sobre el pavimento y con luz de amanecer sobre asfalto húmedo. El eje amarillo continuo bajo el morro, el eje mejorado con doble línea de trazos a cada lado y, a 60 m, el punto de espera patrón A2 de cuatro líneas y 2,10 m de ancho total, con la pista al fondo. Ojo: nada de patrón A1, y las continuas van del lado de espera y nunca miran a la pista.",
        alto: 340,
      },
      {
        kind: "p",
        text: "Rodar no es seguir una línea amarilla de forma automática: es comparar continuamente la autorización, la carta, los letreros y lo que aparece delante. Al acercarte a una pista, el eje mejorado anticipa el punto de espera; allí las líneas continuas quedan del lado donde debes detener todo el avión hasta recibir y entender la autorización correspondiente.",
      },
      {
        kind: "p",
        text: "Las continuas siempre miran al lado donde esperas.",
      },
      {
        kind: "hueco",
        rotulo: "AP-07-02 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "Cenital pura, el recorrido entero de izquierda a derecha en el orden en que lo encuentra el avión: punto de espera intermedio de una sola línea de trazos, patrón B2 con «CAT III» al lado, eje mejorado acotado a 47 m, patrón A2 de 2,10 m y señal de instrucción obligatoria blanca sobre rojo. Todo lo de calle en amarillo, todo lo de pista en blanco. Ojo: nada de patrón A1 ni B1, y las continuas van del lado de espera y nunca miran a la pista.",
        alto: 340,
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Eje mejorado",
            hueco: {
              id: "AP-07-03",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Setenta metros de calle de rodaje, cenital pura, con la pista entrando por la derecha. Eje continuo amarillo de 0,15 m con la doble línea de trazos a cada lado, acotada a 47 m desde el patrón A2 y alejándose de la pista; un B2 dentro de esos 47 m interrumpe el realce 0,90 m antes y 0,90 m después. El tramo entre el punto de espera y la pista va sin realzar. Ojo: las continuas van del lado de espera y nunca miran a la pista.",
            },
            puntos: ["Trazos a los lados del eje: pista adelante, prepárate."],
          },
          {
            titulo: "Instrucción obligatoria",
            hueco: {
              id: "AP-07-04",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Cenital pura, partida en dos. A la izquierda, la instrucción obligatoria «13L-31R» blanca sobre rojo, centrada sobre el eje, en un solo bloque, porque la anchura exterior entre ruedas del tren principal es menor de 9 m; a la derecha, «NO ENTRY». Fondo sobresaliendo 0,50 m del texto, carácter de 4 m y 1 m hasta el punto de espera insinuado al borde. Ojo: nunca a la izquierda del eje, que eso es FAA, y las continuas van del lado de espera y nunca miran a la pista.",
            },
            puntos: ["Blanco sobre rojo: no pasas sin autorización."],
          },
          {
            titulo: "Punto de verificación del VOR",
            hueco: {
              id: "AP-07-05",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Rincón de plataforma de hormigón claro, cenital pura, con el punto de verificación en el centro: círculo de 6 m de diámetro y línea de 0,15 m de ancho, bordeado de negro para contrastar. La línea de azimut sale del centro, sobresale 6 m del círculo y termina en punta de flecha; es opcional. Una flecha de norte al margen. Ojo: blanco, nunca amarillo, que el amarillo es de calle de rodaje.",
            },
            puntos: ["Círculo blanco de 6 m en la plataforma."],
          },
        ],
      },
      {
        // La comparación de la lección: A2 y B2 miden lo mismo de ancho, así
        // que solo se distinguen puestas una al lado de la otra.
        kind: "fichas",
        titulo: "Lado a lado: patrón A2 contra patrón B2",
        columnas: 2,
        items: [
          {
            titulo: "Punto de espera patrón A2",
            hueco: {
              id: "AP-07-06",
              medida: "Ilustración técnica · 4:3 · 1200×900",
              descripcion:
                "Mitad izquierda de la comparación, primer plano cenital de 25 m de calle con el patrón A2 cruzándola de arriba abajo, la pista a la derecha y el lado de espera a la izquierda. Cuatro líneas de 0,30 m y tres espacios de 0,30 m, ancho total 2,10 m, y el eje amarillo cortándose en la señal. Es siempre la señal más cercana a la pista. Ojo: nada de patrón A1, y las continuas van del lado de espera y nunca miran a la pista.",
            },
            puntos: ["Cuatro líneas, el más cercano a la pista."],
          },
          {
            titulo: "Punto de espera patrón B2",
            hueco: {
              id: "AP-07-07",
              medida: "Ilustración técnica · 4:3 · 1200×900",
              descripcion:
                "Mitad derecha, con la misma escala y el mismo encuadre que la izquierda. Patrón B2: dos líneas continuas de 0,30 m separadas 1,50 m, ancho total 2,10 m, unidas por travesaños de 0,90 m cada 3,0 m. La inscripción «CAT III», de letras de 1,80 m o más, va a 0,90 m o menos de la señal y se repite cada 45 m; un A2 se insinúa al fondo. Ojo: nada de patrón B1, y las continuas van del lado de espera y nunca miran a la pista.",
            },
            puntos: ["La escalera, siempre detrás."],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Una intersección de calle de rodaje y pista de precisión",
        hueco: {
          id: "AP-07-08",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "Aérea oblicua desde 120 m, a lo largo de una calle ancha que llega a una pista CAT III, con el recorrido completo: punto de espera intermedio al fondo, patrón B2 con «CAT III», eje mejorado y patrón A2 junto a la pista. Si no se consigue una foto con A2 y B2, se hace como ilustración técnica con el mismo encuadre: mejor una ilustración correcta que una foto con patrones vencidos. Ojo: nada de patrón A1 ni B1, y las continuas van del lado de espera y nunca miran a la pista.",
        },
        puntos: [
          {
            x: 0,
            y: 0,
            que: "Eje mejorado",
            significa: "Trazos a los lados.",
            piloto: "El punto de espera, a 47 m o menos.",
          },
          {
            x: 0,
            y: 0,
            que: "Patrón A2",
            significa: "Las continuas de tu lado.",
            piloto: "Aquí paras.",
          },
          {
            x: 0,
            y: 0,
            que: "Patrón B2",
            significa: "La escalera.",
            piloto: "Protege el área crítica del ILS.",
          },
          {
            x: 0,
            y: 0,
            que: "Punto de espera intermedio",
            significa: "Una sola línea de trazos.",
            piloto: "No es pista.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Rodando hacia la pista",
        situacion:
          "Ruedas hacia la 13L. Cuatro líneas cruzan la calle: las continuas de tu lado. Sin autorización.",
        pregunta: "¿Dónde paras exactamente?",
        respuesta: "Antes de las continuas, con todo el avión de tu lado.",
        claves: [
          "Las de trazos miran a la pista.",
          "No estás libre hasta cruzarla entera.",
        ],
        // Reutiliza la mitad izquierda de la comparación.
        hueco: {
          id: "AP-07-06",
          medida: "Ilustración técnica · 4:3 · 1200×900",
          descripcion:
            "Se reutiliza la lámina del patrón A2: cuatro líneas de 0,30 m y tres espacios de 0,30 m, ancho total 2,10 m, con la pista a la derecha y el lado de espera a la izquierda. Ojo: nada de patrón A1, y las continuas van del lado de espera y nunca miran a la pista.",
        },
      },
    ],
  },

  // ── 08 ──────────────────────────────────────────────────────────────────
  {
    n: 8,
    title: "Plataforma y puesto",
    kicker: "Las líneas que te llevan hasta el puesto",
    minutes: 7,
    blocks: [
      {
        kind: "hueco",
        rotulo: "AP-08-01 · Ilustración de escena · 16:9 · 1600×900",
        descripcion:
          "Aérea oblicua desde 80 m de un puesto de estacionamiento con el avión entrando, de tres cuartos por delante y con luz de atardecer sobre hormigón claro. Delante del avión se ven completas la línea de entrada, la barra de viraje con su punta de flecha, la línea de viraje, la barra de alineación y la línea de parada, amarillas y de 0,15 m o más, con las líneas de seguridad de otro color alrededor. Ojo: ninguna señal blanca de pista en la plataforma.",
        alto: 340,
      },
      {
        kind: "p",
        text: "En plataforma la línea amarilla guía el eje del avión, pero la geometría se interpreta desde la posición del piloto. La barra de viraje aparece a la altura de la cabina para iniciar el giro y la línea de parada indica dónde detenerte según el tipo de avión o el sistema de atraque. Seguir el eje no garantiza por sí solo separación de punta de ala: también mandan el puesto asignado, la guía visual y el personal de tierra.",
      },
      {
        kind: "p",
        text: "El puesto se lee en siete partes, de la identificación a la salida.",
      },
      {
        kind: "hueco",
        rotulo: "AP-08-02 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "Cenital pura de un puesto completo, con los siete elementos rotulados: identificación «2A-B747» dentro de la línea de entrada, línea de entrada, barra de viraje, línea de viraje, barra de alineación, línea de parada y línea de salida. Todo amarillo y de 0,15 m o más; la barra de viraje y la línea de parada, de 6 m o más y en ángulo recto. Una silueta gris marca dónde cae el puesto del piloto izquierdo. Ojo: ninguna línea del puesto en blanco, que eso sería pista.",
        alto: 340,
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Barra de viraje y línea de parada",
            hueco: {
              id: "AP-08-03",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Dos mitades. A la izquierda, cenital de la silueta del avión sobre el puesto, con dos líneas de mira punteadas que salen del puesto del piloto izquierdo y caen sobre la barra de viraje y sobre la línea de parada, las dos de 6 m o más y en ángulo recto. A la derecha, la misma barra vista desde la ventanilla izquierda a 5 m del suelo, a la altura del hombro. Ojo: nunca alineada con el morro, ni sin punta de flecha.",
            },
            puntos: ["Van a la altura de tu ventanilla, no del morro."],
          },
          {
            titulo: "Líneas de seguridad",
            hueco: {
              id: "AP-08-04",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "Desde el suelo, a 1,6 m de altura, en el borde de un puesto ocupado, mirando a lo largo de la línea de seguridad que corre por delante del ala. Se ven la línea de separación de punta de plano y la de límite de vía de servicio, continuas y de 0,10 m o más, en un color que contrasta con el amarillo del puesto, y un equipo de tierra del lado correcto. Ojo: si salen amarillas se pierde justo lo que la ficha enseña.",
            },
            puntos: ["De otro color: hasta ahí llega el ala."],
          },
          {
            titulo: "Espera en la vía de vehículos",
            hueco: {
              id: "AP-08-05",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "Desde dentro de un vehículo de rampa, a 1,3 m de altura, mirando hacia la entrada de la vía a la pista. La línea de detención cruza el primer tercio del encuadre con la forma que le da el código de tránsito local, con su señal vial al lado, que dice «PARE»; al fondo, el borde de la pista. Ojo: aquí no se pinta el punto de espera patrón A ni B, que es el error que esta ficha existe para evitar.",
            },
            puntos: ["La dibuja el código de tránsito local."],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Entrando al puesto",
        hueco: {
          id: "AP-08-06",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "Desde la cabina, por la ventanilla izquierda y el parabrisas, a 5 m del pavimento, con el avión entrando al puesto y la línea de entrada pasando bajo el morro. Se ven la identificación pintada dentro de la línea, la barra de viraje con su punta de flecha entrando por la izquierda, la línea de parada al fondo y al menos una línea de seguridad de color contrastante. Ojo: nada de las dos líneas amarillas de límite de área de no movimiento, que no son de la OACI.",
        },
        puntos: [
          {
            x: 0,
            y: 0,
            que: "Identificación",
            significa: "Dentro de la línea de entrada.",
            piloto: "Confirma el puesto.",
          },
          {
            x: 0,
            y: 0,
            que: "Barra de viraje",
            significa: "A tu ventanilla.",
            piloto: "Aquí empieza el giro.",
          },
          {
            x: 0,
            y: 0,
            que: "Línea de parada",
            significa: "En ángulo recto.",
            piloto: "Cuando la ves, frenas.",
          },
          {
            x: 0,
            y: 0,
            que: "Línea de seguridad",
            significa: "De otro color.",
            piloto: "Ahí mandan los equipos de tierra.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Entrando al puesto",
        situacion:
          "Entras al puesto. Por tu ventanilla izquierda aparece una barra corta con punta de flecha.",
        pregunta: "¿Qué acabas de pasar y qué haces?",
        respuesta: "Es la barra de viraje.",
        claves: [
          "Va a la altura del piloto izquierdo: ahí empieza el giro.",
          "La flecha dice hacia dónde.",
        ],
        // Reutiliza la fotografía del «Reconoce».
        hueco: {
          id: "AP-08-06",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "Se reutiliza la vista desde la cabina del «Reconoce», con la identificación del puesto, la barra de viraje, la línea de parada al fondo y una línea de seguridad de color contrastante. Ojo: nada de las dos líneas amarillas de límite de área de no movimiento, que no son de la OACI.",
        },
      },
    ],
  },
]
