/**
 * Nivel 5 · Operar (lecciones 18 a 22).
 *
 * Es el nivel donde el módulo deja de describir el aeropuerto y empieza a
 * operarlo: dónde nace una incursión, qué manda cuando baja la visibilidad,
 * cómo se describe una pista contaminada, qué dos números deciden si puedes ir
 * y cómo se termina el vuelo, de la salida rápida al puesto. Va al final
 * porque cada lección usa las señales, las luces y los letreros que los cuatro
 * niveles anteriores enseñaron a reconocer.
 *
 * La norma es el Anexo 14, Volumen I, novena edición (2022) con la Enmienda 18,
 * aplicable desde el 27 de noviembre de 2025. Solo OACI: no hay comparaciones
 * con la FAA ni elementos que solo existan allá. Todos los puntos de espera de
 * estas cinco lecciones van en patrón A2 o B2, nunca A1 ni B1, y las dos líneas
 * continuas del patrón A van siempre del lado de espera.
 *
 * Ninguna lección lleva preguntas: las quince van en la entrevista del nivel,
 * que escribe otra sesión. El bloque «piensa como piloto» sí se queda dentro.
 *
 * Los huecos llevan su código (AP-LL-NN) porque es el que Camilo usa para
 * nombrar la imagen cuando la genera. La ficha completa de cada uno está en
 * docs/BRIEF_AEROPUERTOS.md.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const NIVEL_5: DocScreen[] = [
  // ── 18 ──────────────────────────────────────────────────────────────────
  {
    n: 18,
    title: "Incursión en pista",
    kicker: "Donde se pierden los aviones en tierra",
    minutes: 9,
    blocks: [
      {
        kind: "hueco",
        rotulo: "AP-18-01 · Fotografía real · 16:9 · 1600×900",
        descripcion:
          "Desde la cabina, al atardecer, pavimento húmedo, el cruce de la calle con la pista a unos 60 m. Punto de espera patrón A2 de lado a lado: cuatro líneas de 0,30 m con tres espacios de 0,30 m, 2,10 m en total. Letrero rojo con inscripción blanca, dos pares de luces amarillas destellantes y el eje con señal mejorada. Ojo: las dos continuas van del lado de espera, nunca miran a la pista.",
        alto: 320,
      },
      {
        kind: "p",
        text: "Una incursión suele empezar antes de llegar a la pista: una ruta distinta de la preparada, un letrero que no se verbaliza o una autorización que la tripulación cree haber entendido. Con poca visibilidad hay menos tiempo para detectar el error, pero la defensa es la misma: briefing de rodaje, carta abierta, verificación cruzada y detención inmediata cuando la posición real no coincide con la autorización.",
      },
      {
        kind: "hueco",
        rotulo: "AP-18-02 · Fotografía real · 16:9 · 1600×900",
        descripcion:
          "Vista aérea oblicua con sol alto: dos calles de rodaje que convergen sobre una misma entrada a pista, con ángulos cerrados y una isla de pavimento en medio. Cada calle con su punto de espera patrón A2 y su letrero rojo. Al fondo, la pista con su eje de trazos blancos y su designador. Ojo: las continuas de cada A2 van del lado de espera, y no aparece ningún rótulo de aeropuerto reconocible.",
        alto: 320,
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Punto crítico",
            hueco: {
              id: "AP-18-03",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Planta esquemática propia de un aeródromo: pista con designadores «09» y «27», calle paralela y tres de conexión con sus letras. Dos círculos de trazo negro grueso rodean dos ubicaciones, rotuladas «HS 1» y «HS 2», y un recuadro al costado, «PUNTOS CRÍTICOS», explica cada una en una línea. Ojo: no puede parecerse a una carta comercial ni copiar figuras de la OACI.",
            },
            puntos: [
              "Sitio con riesgo de colisión o incursión.",
              "En la carta va rodeado, rotulado «HS».",
            ],
          },
          {
            titulo: "Briefing de rodaje",
            hueco: {
              id: "AP-18-04",
              medida: "Fotografía de escena · 3:2 · 1200×800",
              descripcion:
                "Desde atrás y arriba, entre los dos asientos: el avión detenido en plataforma, motores apagados, y los dos pilotos señalando a la vez la misma carta de aeródromo sobre la consola o en una tableta. La carta es un dibujo propio en planta, legible pero no identificable. Ojo: el briefing se hace con el avión detenido, nunca rodando, y sin cartas comerciales a la vista.",
            },
            puntos: [
              "Antes de arrancar y en el descenso, con la carta.",
              "Sigue lo autorizado.",
            ],
          },
        ],
      },
      {
        kind: "casoReal",
        titulo: "Los Rodeos, 1977",
        fecha: "27 de marzo de 1977",
        aeronave: "Dos Boeing 747",
        queOcurrio: [
          "Dos Boeing 747 coincidieron en Los Rodeos con niebla. La niebla impedía que las tripulaciones se vieran entre sí y que la torre viera la pista.",
          "Uno rodaba sobre la pista y tenía que abandonarla por una de las salidas, numeradas C-1, C-2, C-3 y C-4; se le indicó la C-3. El otro esperaba al inicio de la pista para despegar.",
          "Ese inició el despegue sin autorización. Chocaron cerca de la C-4, con el primero todavía sobre la pista.",
        ],
        consecuencia:
          "Murieron 583 personas, 248 en un avión y 335 en el otro, y hubo 61 supervivientes. El informe concluye que la causa fundamental fue iniciar el despegue sin autorización.",
        leccion:
          "Dos Boeing 747 en niebla. Uno despegó sin autorización con el otro en pista. La incursión se decide antes, en el cruce anterior, cuando ya no ves y crees que vas bien.",
        fuente:
          "Informe oficial de la Subsecretaría de Aviación Civil de España sobre el accidente del 27 de marzo de 1977.",
        hueco: {
          id: "AP-18-05",
          medida: "Ilustración técnica · 3:2 · 1200×800",
          descripcion:
            "Planta esquemática: una pista única, su calle paralela y cuatro conexiones rotuladas «C-1» a «C-4». Una silueta gris de cuadrimotor al inicio, alineada para despegar, «Inicia el despegue sin autorización»; otra igual sobre la pista, entre la tercera y la cuarta conexión, «Todavía en la pista», y una banda de niebla entre las dos. Ojo: sin libreas, sin matrículas y sin una sola cifra de distancia o de velocidad, que el informe no las da.",
        },
      },
      /* La nota de verificación de este hueco no es decorativa: la versión
         anterior de la ficha dibujaba una barra de parada de la OACI, una
         separación de 3 m entre luces y una señal de punto de espera B2 que no
         están en el informe final de la ANSV. El informe dice justamente lo
         contrario, que las marcas presentes no podían llamarse barra de parada
         porque no cumplían el Anexo 14. Si alguien reescribe la ficha, mantiene
         la nota o vuelve a verificar contra el informe. */
      {
        kind: "casoReal",
        titulo: "Linate, 2001",
        fecha: "8 de octubre de 2001",
        aeronave: "Un bimotor ejecutivo y un avión comercial",
        queOcurrio: [
          "Con niebla, y un alcance visual en la pista de unos 200 m, un bimotor ejecutivo salió de la plataforma de aviación general.",
          "La línea de guía se bifurcaba allí en dos: una curva amplia hacia el norte, que era la ruta autorizada, y otra más cerrada hacia el sureste. El avión tomó la del sureste.",
          "Antes de la pista cruzó una fila de luces rojas encendidas. En ese aeródromo no eran gobernables desde el control desde 1998 y quedaban encendidas de forma permanente, así que a las tripulaciones se les instruía cruzarlas encendidas. Salió a la pista activa, por la que un avión comercial ya estaba en carrera de despegue.",
        ],
        consecuencia:
          "Murieron 118 personas: 110 y 4 a bordo de las dos aeronaves y 4 en tierra. El aeródromo no tenía luces de protección de pista ni radar de movimiento en superficie.",
        leccion:
          "Un bimotor ejecutivo tomó la calle equivocada y entró a la pista activa. Cuando la ruta que estás recorriendo no coincide con la autorizada, se para antes de la pista y se pregunta.",
        fuente:
          "Informe final de la ANSV sobre el accidente del 8 de octubre de 2001, aprobado el 20 de enero de 2004.",
        hueco: {
          id: "AP-18-06",
          medida: "Ilustración técnica · 3:2 · 1200×800",
          descripcion:
            "Planta esquemática con niebla: la línea de guía se parte en dos, la ruta autorizada hacia el norte en trazos tenues y la recorrida hacia el sureste en trazo grueso, con la silueta de un bimotor ejecutivo. Al final, la pista activa con un avión en carrera y, antes, una fila de luces rojas encendidas. Ojo: esa fila no es una barra de parada de la OACI y no se rotula como tal; no se dibuja ninguna señal de punto de espera, ninguna luz de protección de pista ni ninguna cota de separación, porque nada de eso está en el informe.",
        },
      },
      {
        kind: "reconoce",
        titulo: "La última línea antes de la pista",
        hueco: {
          id: "AP-18-07",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "Desde el pavimento, a unos 25 m del punto de espera y mirando a la pista, con día claro. Patrón A2 completo de lado a lado, el eje con señal mejorada hasta 47 m, letrero rojo, un par de luces amarillas del lado de espera y la pista con su designador legible. Cuatro chinchetas numeradas, sin texto. Ojo: las dos continuas van del lado de espera; nada de patrón A1.",
        },
        puntos: [
          {
            x: 0,
            y: 0,
            que: "Doble línea continua de tu lado",
            significa: "Patrón A2: el punto de espera de la pista.",
            piloto: "Paras.",
          },
          {
            x: 0,
            y: 0,
            que: "Eje con trazos al lado",
            significa: "Señal mejorada de eje: viene el punto de espera.",
            piloto: "Frena.",
          },
          {
            x: 0,
            y: 0,
            que: "Luces amarillas destellantes",
            significa: "Luces de protección de pista: hay un cruce con la pista.",
            piloto: "También de día.",
          },
          {
            x: 0,
            y: 0,
            que: "Letrero rojo con la pista",
            significa: "La pista que nombra está detrás del letrero.",
            piloto: "No entras sin permiso.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Rodando de noche",
        situacion:
          "Ruedas de noche. Te autorizan una ruta distinta a la que preparaste y ya entras al cruce.",
        pregunta: "¿Qué haces?",
        respuesta: "Paras en un lugar seguro, releen la ruta sobre la carta y siguen.",
        claves: ["Parar cuesta un minuto.", "Manda lo autorizado, no lo que preparaste."],
      },
    ],
  },

  // ── 19 ──────────────────────────────────────────────────────────────────
  {
    n: 19,
    title: "Baja visibilidad",
    kicker: "Cuando el aeropuerto se encoge",
    minutes: 9,
    blocks: [
      {
        kind: "hueco",
        rotulo: "AP-19-01 · Fotografía real · 16:9 · 1600×900",
        descripcion:
          "Desde la cabina, de noche y con niebla densa: apenas 100 m de calle por delante. Al fondo, la fila de luces rojas de la barra de parada cruzando la calle entera, separadas 3 m como máximo. Las luces verdes de eje llegan hasta ella y quedan apagadas al menos 90 m más allá. Un par de luces amarillas destellantes a los lados. Ojo: ninguna luz de eje encendida detrás de la barra.",
        alto: 320,
      },
      {
        kind: "p",
        text: "Con baja visibilidad no solo se ve menos: cambia la forma de usar el aeropuerto. Se activan procedimientos LVP, se protegen áreas del ILS, pueden aumentar las separaciones y se restringen rutas o cruces. El piloto debe saber qué punto de espera está activo y seguir la autorización y las luces; una RVR concreta no permite escoger por cuenta propia la ruta ni el punto de detención.",
      },
      {
        kind: "hueco",
        rotulo: "AP-19-02 · Fotografía real · 16:9 · 1600×900",
        descripcion:
          "Desde el pavimento, al amanecer con niebla, a unos 40 m de un punto de espera de categoría: la pista se pierde y solo se ve lo cercano. La escalera del patrón B2 completa, dos continuas de 0,30 m separadas 1,5 m con travesaños de 0,9 m cada 3,0 m, el letrero rojo y la barra de parada encendida en el punto de espera. Ojo: el patrón B no lleva líneas de trazos, y el B1 no se dibuja.",
        alto: 320,
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Barra de parada",
            hueco: {
              id: "AP-19-03",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "De noche, desde el pavimento, a unos 15 m y sin niebla, para que las luces se cuenten. La fila completa de luces rojas empotradas de borde a borde, separadas 3 m como máximo, un par de rojas elevadas en los extremos y el eje verde apagado más allá. Delante, el punto de espera patrón A2. Ojo: las dos continuas del A2 van del lado de espera.",
            },
            puntos: [
              "Luces rojas cruzando la calle.",
              "Se exige en puntos de espera que sirven pistas previstas para operar con RVR inferior a 550 m; el aeropuerto puede activarla también en otras condiciones.",
            ],
          },
          {
            titulo: "La regla dura",
            puntos: [
              "Una barra roja encendida no se cruza, aunque te autoricen.",
              "Si se apaga sola, avisa.",
            ],
          },
          {
            titulo: "Áreas del ILS",
            hueco: {
              id: "AP-19-05",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Planta esquemática propia: pista, antena de localizador más allá del extremo y antena de senda de planeo al costado. Un área interior sombreada, «Área crítica», dentro de otra más suave, «Área sensible». El punto de espera patrón A2 cerca de la pista y el B2 más atrás, justo fuera del área exterior, con una silueta esperando detrás. Ojo: sin cotas ni metros, que el tamaño de las áreas lo publica cada aeródromo.",
            },
            puntos: [
              "La crítica se despeja siempre; la sensible se controla.",
              "Un avión dentro deforma la señal.",
            ],
          },
          {
            titulo: "Punto de espera CAT II/III",
            hueco: {
              id: "AP-19-04",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "Desde el pavimento, a unos 20 m y en tres cuartos, con luz pareja: la escalera del patrón B2 completa, el letrero rojo que dice «25 CAT II/III» y la inscripción «CAT III» pintada en un extremo, con letras de 1,8 m de alto como mínimo. Al fondo y borroso, un segundo punto de espera patrón A2. Ojo: nada de B1 ni de líneas de trazos dentro de la escalera.",
            },
            puntos: ["El de más atrás: escalera B2 y letrero rojo con la categoría."],
          },
        ],
      },
      {
        kind: "hueco",
        rotulo: "AP-19-06 · Ilustración técnica · 3:2 · 1200×800",
        ratio: "3 / 2",
        descripcion:
          "Planta esquemática de una calle de salida que arranca del eje de la pista y se aleja en curva, con sus luces de eje dibujadas una por una: el tramo inicial alterna verde y amarillo, el final va todo verde. Una línea de trazos marca el perímetro del área crítica o sensible, donde cambia el patrón. La primera luz es verde y la más cercana al perímetro, amarilla. Ojo: ninguna luz amarilla después del perímetro.",
        alto: 320,
      },
      {
        kind: "reconoce",
        titulo: "El punto de espera de categoría, completo",
        hueco: {
          id: "AP-19-07",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "Desde el pavimento, al anochecer, a unos 30 m y mirando a la pista, con las luces ya encendidas. Se ven la escalera del patrón B2, el letrero rojo, la barra de parada encendida, tres luces amarillas de un punto de espera intermedio a un costado y el eje verde con un tramo de verde y amarillo. Cinco chinchetas numeradas, sin texto. Ojo: ninguna luz de eje encendida más allá de la barra.",
        },
        puntos: [
          {
            x: 0,
            y: 0,
            que: "Escalera amarilla",
            significa: "Patrón B2: el punto de espera de categoría.",
            piloto: "Esperas en operación de categoría.",
          },
          {
            x: 0,
            y: 0,
            que: "Letrero rojo con «CAT II/III»",
            significa: "Dice qué pista y qué categoría protege.",
            piloto: "Es un letrero obligatorio.",
          },
          {
            x: 0,
            y: 0,
            que: "Fila de luces rojas",
            significa: "Barra de parada encendida.",
            piloto: "Pare.",
          },
          {
            x: 0,
            y: 0,
            que: "Tres luces amarillas",
            significa: "Punto de espera intermedio.",
            piloto: "No es de pista.",
          },
          {
            x: 0,
            y: 0,
            que: "Eje verde y amarillo",
            significa: "Sigues dentro del área del ILS.",
            piloto: "Todo verde, saliste.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Rodando con niebla",
        situacion: "Ruedas con niebla. Te autorizan a cruzar y la barra sigue roja delante.",
        pregunta: "¿Cruzas?",
        respuesta: "No. Paras antes de la barra y avisas.",
        claves: [
          "La barra manda sobre la autorización.",
          "Le dices al control que sigue encendida.",
        ],
      },
    ],
  },

  // ── 20 ──────────────────────────────────────────────────────────────────
  {
    n: 20,
    title: "Estado de la superficie",
    kicker: "La pista, en un código de tres cifras",
    minutes: 8,
    blocks: [
      {
        kind: "hueco",
        rotulo: "AP-20-01 · Fotografía real · 16:9 · 1600×900",
        descripcion:
          "Desde la cabina, en corta final, con la pista mojada y agua visible sobre el pavimento, luz de tarde y cielo cargado. Se ven el designador y el umbral, las señales blancas de umbral, la referencia de apuntado y la zona de toma de contacto, y las franjas más limpias que deja el paso de las ruedas. Ojo: nada de logos, matrículas ni pantallas de cabina con datos legibles.",
        alto: 320,
      },
      {
        kind: "p",
        text: "El formato global de OACI describe la superficie por tercios y asigna un código que la tripulación lleva al cálculo de performance. No basta con escuchar una cifra suelta: el informe se lee en el sentido de la pista de designador menor, y al operar en el sentido contrario se invierte el orden. Así, un 5/3/2 puede comenzar para ti por el 2 y condicionar desde el toque la distancia de aterrizaje disponible.",
      },
      {
        kind: "hueco",
        rotulo: "AP-20-02 · Fotografía real · 16:9 · 1600×900",
        descripcion:
          "Desde el pavimento, cámara casi a ras y mirando a lo largo de la pista, en día gris. En primer plano, la textura de la superficie con un contaminante identificable, agua estancada o nieve fundente, y la diferencia de cobertura entre el centro y los costados, con el eje blanco parcialmente tapado. El agua estancada se notifica desde 4 mm; mojada es humedad o agua hasta 3 mm inclusive. Ojo: sin vehículos con logotipos ni personas identificables.",
        alto: 320,
      },
      {
        kind: "p",
        text: "La tabla va de 6 a 0. El 6 es pista seca; el 0 es lo peor.",
      },
      {
        kind: "table",
        head: ["Clave", "Estado de la superficie", "Eficacia de frenado"],
        rows: [
          ["6", "SECA", "no aplica"],
          [
            "5",
            "ESCARCHA · MOJADA, hasta 3 mm inclusive · NIEVE FUNDENTE, NIEVE SECA o NIEVE MOJADA hasta 3 mm",
            "BUENA",
          ],
          ["4", "NIEVE COMPACTADA con temperatura exterior de −15 °C o inferior", "BUENA A MEDIA"],
          [
            "3",
            "MOJADA RESBALADIZA · NIEVE SECA o MOJADA de más de 3 mm · NIEVE SECA o MOJADA sobre NIEVE COMPACTADA · NIEVE COMPACTADA con temperatura superior a −15 °C",
            "MEDIA",
          ],
          ["2", "AGUA ESTANCADA de más de 3 mm · NIEVE FUNDENTE de más de 3 mm", "MEDIA A POBRE"],
          ["1", "HIELO", "POBRE"],
          [
            "0",
            "HIELO MOJADO · AGUA SOBRE NIEVE COMPACTADA · NIEVE SECA O MOJADA SOBRE HIELO",
            "PEOR QUE POBRE",
          ],
        ],
      },
      {
        kind: "hueco",
        rotulo: "AP-20-03 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "La tabla de arriba dibujada a todo el ancho, con tipografía grande para un teléfono: siete filas de 6 a 0, la clave en número grande a la izquierda, los criterios de superficie en el centro y la eficacia de frenado a la derecha, con un degradado suave de verde a rojo. El contenido va literal. Ojo: no se copia ninguna figura de la OACI y la columna de frenado no dice «NIL».",
        alto: 340,
        pie: "Si el 25 % o menos del tercio está mojado o cubierto, se notifica 6.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Tres tercios, tres cifras",
            hueco: {
              id: "AP-20-04",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Planta esquemática de una pista completa dividida en tres partes iguales por dos líneas de trazos, con «09» y «27» en los extremos y «5», «3» y «2» en los tercios. Una flecha inferior, «Así se publica: desde el designador más bajo»; otra superior en sentido contrario, «Así lo usas: en tu sentido de aterrizaje», con una silueta aterrizando. Al costado, «5/3/2» en grande. Ojo: ninguna carta real ni figura copiada de la OACI.",
            },
            puntos: [
              "La clave se da por tercio, desde el designador más bajo.",
              "En vuelo, en tu sentido.",
            ],
          },
          {
            titulo: "El informe y el SNOWTAM",
            hueco: {
              id: "AP-20-05",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "Una columna tipo documento sobre fondo claro. Arriba, en monoespaciada, «EADD 02170135 09R 5/4/3 100/50/75 NR/06/06 WET/SLUSH/SLUSH», y debajo «RWY 09R ADJ SNOWBANKS. TWY B POOR. APRON NORTH POOR.». Una llave separa las dos partes, rotuladas «Para calcular tu performance» y «Para tu conciencia situacional». Al pie, «Se difunde como SNOWTAM». Ojo: ningún indicador de lugar de un aeropuerto real.",
            },
            puntos: [
              "Trae una parte para calcular performance y otra de conciencia situacional.",
              "Se difunde en el SNOWTAM.",
            ],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Leer la pista con los ojos",
        hueco: {
          id: "AP-20-06",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "Desde el pavimento, en diagonal hacia el centro de la pista, con luz plana y sin brillos falsos. En unos 60 m se reparten agua encharcada que hace espejo, una franja lateral sucia con el centro limpio, huellas de neumático sobre el contaminante y una zona que parece seca pero con brillo mate. Cuatro chinchetas numeradas, sin texto. Ojo: sin equipos de medición de rozamiento, que solo se usan sobre nieve compactada o hielo.",
        },
        puntos: [
          {
            x: 0,
            y: 0,
            que: "Agua y espejo",
            significa: "Más de 3 mm es agua estancada.",
            piloto: "La clave cae.",
          },
          {
            x: 0,
            y: 0,
            que: "Franja lateral sucia y centro limpio",
            significa: "Cada tercio se evalúa solo.",
          },
          {
            x: 0,
            y: 0,
            que: "Marcas de neumático sin dibujo",
            significa: "Frenado degradado.",
            piloto: "Tu reporte baja la clave.",
          },
          {
            x: 0,
            y: 0,
            que: "Se ve seca pero brilla",
            significa: "Escarcha o hielo mojado.",
            piloto: "Desconfía.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Preparando la aproximación",
        situacion: "Te dan la pista en 5/3/2 y vas a aterrizar por el otro lado.",
        pregunta: "¿En qué orden lo lees?",
        respuesta: "Al revés: tu primer tercio es el 2.",
        claves: ["Tomas contacto sobre lo peor.", "Revisa performance."],
      },
    ],
  },

  // ── 21 ──────────────────────────────────────────────────────────────────
  {
    n: 21,
    title: "Los datos del aeródromo",
    kicker: "Lo que aguanta y lo que te protege",
    minutes: 10,
    blocks: [
      {
        kind: "hueco",
        rotulo: "AP-21-01 · Fotografía real · 16:9 · 1600×900",
        descripcion:
          "Desde el pavimento, gran angular bajo y luz de mañana: el tren principal completo de un avión de fuselaje ancho en primer plano a la izquierda, apoyado sobre un pavimento con junta o sello visible, y al fondo a la derecha, desenfocado, un vehículo de salvamento y extinción de incendios, reconocible por su silueta y su color. Ojo: sin logos de aerolínea, matrículas ni nombres de fabricante en el vehículo.",
        alto: 320,
      },
      {
        kind: "p",
        text: "La compatibilidad del pavimento y la categoría de salvamento son dos comprobaciones que pueden limitar una operación aun cuando la pista sea suficientemente larga. El ACR del avión se compara con el PCR publicado para las condiciones previstas, y la categoría de bomberos se contrasta con el tamaño del avión y la disponibilidad informada. Ninguna de las dos reemplaza el resto del despacho: obstáculos, dimensiones, performance, meteorología y avisos vigentes siguen formando parte de la decisión.",
      },
      {
        kind: "hueco",
        rotulo: "AP-21-02 · Fotografía real · 16:9 · 1600×900",
        descripcion:
          "Vista cenital de una plataforma a media mañana, con al menos tres aviones de tamaños claramente distintos en sus puestos. Se ven las señales amarillas de puesto de estacionamiento y las líneas de seguridad de plataforma, continuas, de 10 cm de ancho como mínimo y en un color que contrasta con el amarillo. Ojo: sin logos de aerolínea, matrículas ni nombres de terminal.",
        alto: 320,
      },
      {
        kind: "p",
        text: "Desde el 28 de noviembre de 2024 el pavimento se publica en **ACR-PCR**: cinco elementos, siempre en el mismo orden.",
      },
      {
        kind: "breakdown",
        caption: "Un PCR publicado, elemento por elemento: PCR 980 / F / C / X / T.",
        parts: [
          { token: "980", label: "Valor del índice", detail: "Un número." },
          { token: "F", label: "Tipo de pavimento", detail: "R, rígido. F, flexible." },
          {
            token: "C",
            label: "Resistencia de la subrasante",
            detail: "A, alta, 200 MPa. B, media, 120 MPa. C, baja, 80 MPa. D, muy baja, 50 MPa.",
          },
          {
            token: "X",
            label: "Presión máxima de neumáticos",
            detail: "W, sin límite. X, hasta 1,75 MPa. Y, hasta 1,25 MPa. Z, hasta 0,50 MPa.",
          },
          {
            token: "T",
            label: "Método de evaluación",
            detail: "T, técnica. U, por experiencia.",
          },
        ],
      },
      {
        kind: "hueco",
        rotulo: "AP-21-03 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "A todo el ancho: arriba «PCR 980 / F / C / X / T» en monoespaciada grande, con cada elemento separado, y debajo cinco columnas unidas al código por una línea guía, una por elemento, con todos sus códigos posibles listados. Abajo, un recuadro: «Tu ACR debe ser igual o menor que el PCR», y la sobrecarga admisible. Ojo: ninguna referencia al ACN-PCN como si siguiera vigente.",
        alto: 340,
        pie: "Vigente desde el 28 de noviembre de 2024.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "La regla",
            puntos: [
              "Tu ACR debe ser igual o menor que el PCR.",
              "Por encima, hasta 10 % si no pasan del 5 % anual.",
            ],
          },
          {
            titulo: "Categoría de bomberos",
            hueco: {
              id: "AP-21-04",
              medida: "Ilustración técnica · 3:2 · 1200×800",
              descripcion:
                "La tabla de abajo, vertical y con tipografía grande: diez filas, de la categoría 1 a la 10, con la longitud total del avión y la anchura máxima de fuselaje. Al pie, la corrección por anchura y la regla de remisión por poco tráfico. El contenido va literal, sin redondear ni resumir. Ojo: nada del sistema de índices por letra de la FAA ni figuras copiadas de la OACI.",
            },
            puntos: [
              "Se elige por la longitud total del avión y se comprueba el fuselaje.",
              "Si se pasa, sube un nivel.",
            ],
          },
        ],
      },
      {
        kind: "table",
        head: ["Categoría", "Longitud total del avión", "Anchura máxima de fuselaje"],
        rows: [
          ["1", "de 0 a menos de 9 m", "2 m"],
          ["2", "de 9 a menos de 12 m", "2 m"],
          ["3", "de 12 a menos de 18 m", "3 m"],
          ["4", "de 18 a menos de 24 m", "4 m"],
          ["5", "de 24 a menos de 28 m", "4 m"],
          ["6", "de 28 a menos de 39 m", "5 m"],
          ["7", "de 39 a menos de 49 m", "5 m"],
          ["8", "de 49 a menos de 61 m", "7 m"],
          ["9", "de 61 a menos de 76 m", "7 m"],
          ["10", "de 76 a menos de 90 m", "8 m"],
        ],
      },
      {
        kind: "callout",
        tone: "info",
        text: "Si el fuselaje excede la anchura de su fila, la categoría sube un nivel. Con menos de 700 movimientos en los tres meses consecutivos de mayor actividad, el nivel puede bajar una sola categoría.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Fauna",
            hueco: {
              id: "AP-21-05",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "Desde el borde de la pista, con teleobjetivo y luz de amanecer: un grupo de aves posadas sobre la franja de hierba, al lado del pavimento, con el borde del pavimento en primer plano y la pista al fondo, reconocible por sus señales o por sus luces de borde blancas. Ojo: nada morboso, ni animales heridos, ni restos de impacto, ni personas identificables.",
            },
            puntos: [
              "El peligro se evalúa siempre, se notifica cada choque y se eliminan los focos que atraen animales.",
            ],
          },
          {
            titulo: "Objetos y chorro",
            hueco: {
              id: "AP-21-06",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "Cámara a ras del pavimento y muy cerca, con poca profundidad de campo: un objeto metálico pequeño, nítido y claramente ajeno al pavimento, la textura de la superficie y una junta a su lado; al fondo, desenfocada, una señal blanca de pista. Ojo: el objeto no puede llevar marca de fabricante ni número de parte legible.",
            },
            puntos: [
              "La pista se inspecciona para retirar objetos extraños.",
              "El chorro levanta todo lo que encuentra.",
            ],
          },
        ],
      },
      {
        kind: "hueco",
        rotulo: "AP-21-07 · Fotografía real · 3:2 · 1200×800",
        ratio: "3 / 2",
        descripcion:
          "Desde atrás y a un costado, a unos 60 m y con teleobjetivo comprimido: un bimotor de fuselaje estrecho arrancando el rodaje, con el aire distorsionado por el calor detrás de los motores, polvo y hierba levantándose en la estela y la superficie no pavimentada justo detrás de la pavimentada. Ojo: nadie dentro de la estela, ni personas ni vehículos.",
        alto: 320,
      },
      {
        kind: "piensaComoPiloto",
        momento: "Planificando el vuelo",
        situacion: "Vas a un aeropuerto cuyo PCR es menor que tu ACR de hoy.",
        pregunta: "¿Puedes ir igual?",
        respuesta: "Solo si el aeródromo lo autoriza.",
        claves: [
          "Hasta un 10 % por encima es excepcional, nunca rutina.",
          "Más, hace falta análisis.",
        ],
      },
    ],
  },

  // ── 22 ──────────────────────────────────────────────────────────────────
  {
    n: 22,
    title: "Del aterrizaje al puesto",
    kicker: "Los últimos mil metros",
    minutes: 9,
    blocks: [
      {
        kind: "hueco",
        rotulo: "AP-22-01 · Fotografía real · 16:9 · 1600×900",
        descripcion:
          "Desde la cabina, en el rollout al atardecer y con pavimento seco: la boca de la calle de salida rápida abriéndose a la derecha en ángulo agudo, entre 25° y 45° y de preferencia 30°, con su eje amarillo continuo arrancando del eje blanco de trazos de la pista y las luces de borde blancas a los lados. Ojo: sin logos, matrículas ni pantallas de cabina con datos legibles.",
        alto: 320,
      },
      {
        kind: "p",
        text: "Después del toque todavía queda una fase de alta carga de trabajo: desacelerar, identificar la salida autorizada, confirmar que todo el avión libró la pista y entrar al puesto sin perder separación. Una salida rápida ayuda a abandonar antes, pero no obliga a forzar el frenado ni sustituye la autorización. Si se pierde la guía de atraque o la imagen no coincide con el puesto asignado, se detiene el avión antes de improvisar.",
      },
      {
        kind: "hueco",
        rotulo: "AP-22-02 · Fotografía real · 16:9 · 1600×900",
        descripcion:
          "Vista aérea oblicua desde unos 200 m, a mediodía, con la pista en diagonal y una salida rápida completa dentro del encuadre, desde la pista hasta la calle paralela: la curva entera, la recta que viene después y el punto donde se une a la paralela. Eje de salida amarillo continuo, eje de pista blanco de trazos. Ojo: sin nombres de aeropuerto, logos ni matrículas legibles.",
        alto: 320,
      },
      {
        kind: "p",
        text: "La salida rápida te saca de la pista antes: curva ancha, ángulo agudo, recta.",
      },
      {
        kind: "hueco",
        rotulo: "AP-22-03 · Ilustración técnica · 16:9 · 1600×900",
        descripcion:
          "Planta esquemática a todo el ancho: la pista abajo y la salida rápida arriba a la derecha, con su punto de tangencia marcado. Tres juegos de luces amarillas sobre la pista, del mismo lado que la salida, de tres, dos y una luz, acotados «100 m» entre juegos y «100 m» del de una luz al punto de tangencia. El eje de la salida, con sus luces verdes y su tramo de verde y amarillo. Ojo: ninguna luz amarilla después del perímetro del área crítica o sensible.",
        alto: 340,
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Luces indicadoras de salida",
            puntos: [
              "Amarillas, en la pista, del lado de la salida.",
              "Cuentan la distancia.",
            ],
          },
          {
            titulo: "Guía visual de atraque",
            hueco: {
              id: "AP-22-04",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "Desde la posición del piloto izquierdo, con el sistema de atraque justo delante y la pasarela entrando por el borde derecho. Se ven la unidad de azimut sobre la prolongación del eje del puesto, el indicador de parada junto a ella y en el mismo campo visual, y la barra de alineación amarilla, de 15 cm de ancho como mínimo. Ojo: sin marca del fabricante, sin número de puesto real y sin logos.",
            },
            puntos: ["Rumbo y punto de parada.", "Verde es siga; rojo, desviación y alto."],
          },
          {
            titulo: "Versión avanzada",
            hueco: {
              id: "AP-22-05",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "Frontal desde la cabina, al anochecer, con la pantalla del sistema avanzado llenando el centro del encuadre: una sola pantalla sin obstrucciones que muestra «A320», «12.5 m» y una flecha con la palabra «AZIMUTH», nada más. Rojo es peligro, amarillo precaución, verde correcto. Ojo: ni marca del fabricante, ni nombre de aeropuerto, ni número de puesto real.",
            },
            puntos: [
              "Una pantalla confirma tipo de avión, desvío y distancia, y avisa si te pasaste.",
            ],
          },
          {
            titulo: "El señalero",
            hueco: {
              id: "AP-22-06",
              medida: "Fotografía real · 3:2 · 1200×800",
              descripcion:
                "Desde la posición del piloto, al anochecer: el señalero de frente al avión y a la izquierda del eje, en plano entero, con chaleco reflectante, protección auditiva y los dos bastones iluminados. Los brazos hacen la parada normal, extendidos a 90° y subiendo despacio hasta cruzar los bastones sobre la cabeza. Ojo: nadie cerca del avión con las anticolisión encendidas y los motores en marcha.",
            },
            puntos: ["Manda en el puesto.", "La parada normal es lenta; la de emergencia, brusca."],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Las señales del puesto",
        hueco: {
          id: "AP-22-08",
          medida: "Fotografía real · 16:9 · 1600×900",
          descripcion:
            "Vista aérea oblicua de un puesto vacío desde unos 25 m, con señales recién pintadas: la línea de entrada continua con sus flechas y la identificación «2A», la barra de viraje con su punta de flecha, la línea de viraje curva, la barra de alineación larga, la línea de parada y una línea de seguridad contrastante. Cinco chinchetas numeradas, sin texto. Ojo: ningún número de puesto real ni marcas repintadas a medias.",
        },
        puntos: [
          {
            x: 0,
            y: 0,
            que: "Línea amarilla con flecha",
            significa: "Entrada al puesto.",
            piloto: "Síguela.",
          },
          {
            x: 0,
            y: 0,
            que: "Barra perpendicular",
            significa: "Barra de viraje.",
            piloto: "Aquí giras.",
          },
          {
            x: 0,
            y: 0,
            que: "Barra larga en tu eje",
            significa: "Barra de alineación.",
            piloto: "Tu referencia.",
          },
          {
            x: 0,
            y: 0,
            que: "Barra corta al final",
            significa: "Línea de parada.",
            piloto: "A la altura del piloto.",
          },
          {
            x: 0,
            y: 0,
            que: "Línea de otro color",
            significa: "Línea de seguridad.",
            piloto: "Afuera, el equipo.",
          },
        ],
      },
      {
        kind: "piensaComoPiloto",
        momento: "Entrando al puesto",
        situacion: "Entrando al puesto, la pantalla de atraque se apaga de golpe.",
        pregunta: "¿Qué haces?",
        respuesta: "Frenas y esperas.",
        claves: ["Sin guía válida no entras.", "El sistema debe avisar cuando falla."],
        hueco: {
          id: "AP-22-07",
          medida: "Fotografía real · 3:2 · 1200×800",
          descripcion:
            "Desde arriba y a un costado, a unos 15 m de altura, con el puesto completo en el encuadre: el avión ya detenido y calzado, las líneas de seguridad de plataforma en color contrastante, continuas y de 10 cm de ancho como mínimo, la línea de límite de vía de servicio, y el equipo de tierra todavía por fuera de esas líneas. Ojo: nadie dentro del área del avión con las anticolisión encendidas.",
        },
      },
    ],
  },
]
