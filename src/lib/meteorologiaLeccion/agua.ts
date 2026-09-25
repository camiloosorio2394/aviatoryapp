/**
 * Nivel 2 · Agua, estabilidad y nubes.
 *
 * Sigue con el capítulo 12 del PHAK. Aquí está la lección que más se usa en
 * cabina de todo el módulo: reconocer una nube por su forma y saber qué trae
 * dentro. Y la cuenta de la separación temperatura/punto de rocío, que es la
 * pregunta de entrevista más repetida de meteorología.
 *
 * Las fotografías de reconocimiento se incorporan lección por lección y se
 * acompañan de una decisión operativa; una imagen nunca sustituye un reporte.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const PARTE_AGUA: DocScreen[] = [
  // ── 06 ──────────────────────────────────────────────────────────────────
  {
    n: 6,
    title: "Estabilidad: cuándo el aire sube solo",
    kicker: "Movimiento vertical, nubes e inversiones",
    minutes: 7,
    blocks: [
      {
        kind: "p",
        text: "Dos reportes de aeródromo (Meteorological Aerodrome Report, METAR) pueden mostrar una nubosidad parecida, pero no describir por sí solos toda la estabilidad de la columna de aire. La distribución de temperatura y humedad con la altura ayuda a explicar por qué unas capas favorecen ascensos y otras los frenan. Para volar, interesa relacionar ese perfil con nubes, turbulencia, techo y visibilidad, no adivinarlo por una sola foto.",
      },
      {
        kind: "definicion",
        text: "La estabilidad atmosférica describe cómo responde una parcela de aire al desplazarse verticalmente. Si queda más fría y densa que el entorno, tiende a volver; si queda más cálida y menos densa, puede continuar ascendiendo. La respuesta depende de la capa y de si la parcela está saturada.",
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Qué te da cada una",
        items: [
          {
            titulo: "Aire estable",
            puntos: [
              "El ascenso espontáneo se frena; predominan nubes en capas cuando hay humedad y ascenso forzado.",
              "Puede favorecer estratos, niebla o visibilidad reducida cerca de una inversión.",
              "Estable no significa automáticamente cielo despejado ni ausencia de otros peligros.",
            ],
          },
          {
            titulo: "Aire inestable",
            puntos: [
              "Una parcela levantada puede seguir ascendiendo si queda más cálida que el entorno.",
              "Favorece desarrollo de cúmulos y turbulencia convectiva si hay humedad y otros ingredientes.",
              "No toda inestabilidad produce tormenta; también influyen humedad, ascenso inicial y cizalladura.",
            ],
          },
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "El trópico no garantiza tormenta diaria",
        text: "El calentamiento y la humedad pueden favorecer convección profunda, pero hacen falta un perfil atmosférico favorable y, normalmente, un mecanismo de ascenso. La frecuencia y hora de las tormentas varían con relieve, circulación y temporada. Antes de operar, revisa observaciones, pronósticos y avisos vigentes.",
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
          "Al expandirse sin intercambiar mucho calor con el entorno, su temperatura baja.",
          "Al bajar, todo al revés: se comprime y se calienta.",
        ],
      },
      {
        kind: "p",
        text: "Ese enfriamiento o calentamiento aproximado se llama **adiabático**. No confundas el gradiente observado del ambiente con el ritmo de enfriamiento de una parcela que asciende. Este último cambia cuando la parcela alcanza la saturación y libera calor latente por condensación.",
      },
      {
        kind: "kv",
        items: [
          { k: "Atmósfera estándar internacional (International Standard Atmosphere, ISA)", v: "aprox. 2 °C menos por cada 1.000 ft en la troposfera; es una referencia, no el perfil real del día" },
          { k: "Parcela no saturada", v: "se enfría aprox. 3 °C por cada 1.000 ft al ascender" },
          { k: "Parcela saturada", v: "se enfría más lentamente, a una tasa variable por la liberación de calor latente" },
        ],
      },
      {
        kind: "p",
        text: "Una parcela **no saturada** se enfría aproximadamente al ritmo adiabático seco aunque contenga vapor de agua. **Después de saturarse**, la condensación libera calor y su enfriamiento al ascender suele ser menor. Por eso la humedad puede favorecer inestabilidad condicional, pero no determina por sí sola que una capa sea inestable: compárala con el perfil real de temperatura del ambiente.",
      },
      {
        kind: "p",
        text: "Para una capa determinada, compara cuánto baja la temperatura **ambiental** con la altura y cuánto se enfría una **parcela desplazada**. Si al elevarla queda más cálida que el ambiente, tiene flotabilidad positiva; si queda más fría, el ascenso libre se frena. Es una explicación simplificada: en la atmósfera real también cuentan mezcla, humedad y el impulso inicial.",
      },
      {
        kind: "kv",
        items: [
          { k: "Gradiente ambiental mayor que el seco", v: "capa absolutamente inestable en la comparación ideal" },
          { k: "Gradiente ambiental menor que el saturado", v: "capa absolutamente estable en la comparación ideal" },
          { k: "Entre ambos gradientes", v: "inestabilidad condicional: la parcela puede volverse flotante tras elevarse y saturarse suficientemente" },
        ],
      },
      {
        kind: "check",
        question:
          "En una capa, el sondeo indica que la temperatura ambiental baja 3,5 °C por cada 1.000 ft. ¿Qué indica la comparación ideal con una parcela no saturada?",
        options: [
          "La capa es absolutamente inestable en esa comparación: el ambiente se enfría más rápido que la parcela",
          "Es estable porque 3,5 °C es mayor que el valor de la atmósfera estándar",
          "Solo puede haber ascenso si la parcela se satura, porque 3,5 °C es menor que el gradiente seco",
        ],
        answer: 0,
        explain:
          "En la comparación ideal, la parcela no saturada pierde cerca de 3 °C por 1.000 ft y el ambiente 3,5 °C: la parcela elevada queda relativamente más cálida y tiende a continuar ascendiendo. Esto describe esa capa, no garantiza tormentas ni clasifica todo el día; el perfil real puede variar con la altura.",
      },
      {
        kind: "sub",
        text: "La inversión: una capa estable que hay que reconocer",
      },
      {
        kind: "definicion",
        text: "Inversión de temperatura: capa en la que la temperatura aumenta con la altura. Es una configuración estable, pero puede darse cerca del suelo o en niveles superiores y no garantiza aire suave en sus bordes.",
      },
      {
        kind: "p",
        text: "Una inversión puede limitar la mezcla vertical y favorecer la acumulación de humedad o contaminantes debajo. Si el aire cercano al suelo alcanza la saturación, puede formarse niebla o nube baja; la visibilidad puede reducirse, pero la inversión sola no crea niebla ni predice su duración.",
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "Dos mecanismos frecuentes",
        items: [
          {
            titulo: "Inversión de superficie",
            puntos: [
              "Noches despejadas y con poco viento favorecen el enfriamiento del suelo.",
              "El suelo se enfría y enfría el aire pegado a él.",
              "En una capa baja, el aire de abajo puede quedar más frío que el situado encima.",
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
        kind: "infografia",
        nombre: "meteo-inversion",
      },
      {
        kind: "p",
        text: "**Qué muestra el esquema:** una capa donde la temperatura sube con la altura. **Cómo leerlo:** ubica el aire frío abajo y el relativamente cálido encima; esto limita la mezcla vertical. **Qué decides:** comprobar techo, visibilidad y tendencia antes de una salida o llegada; el dibujo no permite pronosticar una hora de disipación.",
      },
      {
        kind: "reconoce",
        titulo: "Niebla baja sobre un aeródromo de valle",
        intro: "La imagen permite reconocer visibilidad limitada cerca del suelo y aire claro por encima; no mide la temperatura vertical ni confirma por sí sola una inversión.",
        imagen: {
          src: "/modulos/meteorologia/mt-l06-inversion.webp",
          alt: "Banco de niebla al amanecer en un valle con terminal y torre de aeródromo parcialmente visibles",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 38,
            y: 52,
            que: "Terminal y torre entre niebla",
            significa: "La capa baja puede reducir la visibilidad en el aeródromo aunque arriba el cielo esté despejado.",
            piloto: "Consulta la observación y la tendencia vigentes; verifica mínimos y opciones operativas.",
          },
          {
            x: 62,
            y: 42,
            que: "Tope de niebla",
            significa: "La parte superior visible delimita la capa en esta fotografía, no la altura exacta de una inversión térmica.",
            piloto: "No deduzcas una hora de mejora solo por ver sol sobre la capa.",
          },
          {
            x: 74,
            y: 18,
            que: "Aire claro por encima",
            significa: "Una condición favorable en altura puede coexistir con mínimos restrictivos en superficie.",
            piloto: "Planifica despegue, llegada y alternos con datos del aeródromo, no con la vista desde arriba.",
          },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** niebla baja sobre el aeródromo y cielo claro por encima. **Cómo lo reconoces:** la torre y la terminal asoman parcialmente entre la capa. **Qué decides:** confirmar visibilidad, techo, tendencias y mínimos aplicables; la imagen no demuestra una inversión ni indica cuándo se disipará.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "Antes del vuelo, primera hora",
        situacion:
          "Amanece tras una noche despejada y de poco viento. El METAR de tu aeródromo da visibilidad reducida y una capa baja, pero la carta no muestra ningún frente cerca y el destino tiene condiciones favorables.",
        pregunta: "¿Qué está pasando y qué esperas que ocurra en las próximas horas?",
        claves: [
          "Una noche despejada, con poco viento y suelo que se enfría por radiación favorece una inversión de superficie; el perfil debe confirmarse.",
          "Si el aire bajo se satura, puede formarse niebla o nube baja y reducir techo y visibilidad.",
          "No hace falta un frente para explicar una niebla local, pero hay que revisar la situación completa y los reportes vigentes.",
          "El sol y la mezcla pueden disipar la niebla, pero no es seguro ni se deduce una hora fija: consulta tendencia, pronóstico, mínimos y alternos.",
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
              "Describe si una parcela desplazada verticalmente tiende a volver o a seguir ascendiendo. Una capa estable puede presentar estratos o niebla; una inestable puede favorecer cúmulos y turbulencia convectiva. Ninguna etiqueta por sí sola determina todo el tiempo del vuelo.",
            claves: ["Respuesta de una parcela desplazada", "Estable también puede traer estratos o niebla", "Inestable favorece convección"],
          },
          {
            nivel: "interpretacion",
            q: "¿Cuándo se enfría más lentamente al ascender una parcela húmeda?",
            respuesta:
              "Mientras no esté saturada, se enfría aproximadamente al gradiente adiabático seco. Tras alcanzar la saturación, la condensación libera calor latente y el enfriamiento al ascender se reduce a una tasa variable. Para saber si seguirá subiendo hay que compararla con la temperatura del ambiente en esa capa.",
            claves: ["No saturada: gradiente seco", "Saturada: calor latente", "Comparar con ambiente"],
          },
          {
            nivel: "situacion",
            q: "¿Qué es una inversión y qué problema operativo trae?",
            respuesta:
              "Es una capa en la que la temperatura aumenta con la altura. Puede limitar la mezcla y favorecer acumulación de humedad o contaminantes. Si se forma niebla o nube baja, el techo y la visibilidad pueden restringir la operación; no debes suponer que el sol la disipará a una hora fija.",
            claves: ["Temperatura sube con altura", "Limita mezcla", "Niebla posible si hay saturación", "Confirmar mínimos y tendencia"],
          },
        ],
      },
    ],
  },

  // ── 07 ──────────────────────────────────────────────────────────────────
  {
    n: 7,
    title: "Humedad y punto de rocío",
    kicker: "De la saturación a una estimación de la base convectiva",
    minutes: 8,
    blocks: [
      {
        kind: "p",
        text: "El reporte meteorológico rutinario de aeródromo, METAR (Meteorological Aerodrome Report), incluye temperatura y punto de rocío. Su diferencia ayuda a estimar cuán cerca está el aire de la saturación y, bajo supuestos concretos, la altura aproximada a la que una parcela ascendente podría condensarse. **No calcula el techo observado ni reemplaza el METAR, el pronóstico o la información en ruta.**",
      },
      {
        kind: "sub",
        text: "Ver: qué significa acercarse a la saturación",
      },
      {
        kind: "p",
        text: "La presión de vapor de saturación aumenta con la temperatura. Si el contenido de vapor cambia poco durante la noche, el enfriamiento acerca el aire a la saturación; pueden aparecer rocío o niebla si se cumplen las demás condiciones. No existe una regla exacta de «mitad de capacidad cada 11 °C» aplicable a cualquier temperatura.",
      },
      {
        kind: "check",
        question:
          "El aire de la madrugada tiene la misma cantidad de vapor de agua que tenía por la tarde, y sin embargo ahora hay niebla. ¿Por qué?",
        options: [
          "Porque el METAR siempre reporta 100 % de humedad al amanecer",
          "Porque al enfriarse aumenta la presión de vapor de saturación",
          "Porque al enfriarse disminuye la presión de vapor de saturación y el aire puede saturarse",
        ],
        answer: 2,
        explain:
          "Al bajar la temperatura disminuye la presión de vapor de saturación. Con contenido de vapor casi constante, la humedad relativa aumenta y puede llegar al 100 %. La niebla requiere además condensación en una capa próxima al suelo; no surge automáticamente de cualquier enfriamiento.",
      },
      {
        kind: "kv",
        items: [
          {
            k: "Humedad relativa",
            v: "relación entre el vapor de agua presente y el de saturación a la misma temperatura, expresada en porcentaje",
          },
          {
            k: "Punto de rocío",
            v: "temperatura a la que el aire se saturaría si se enfría sin cambiar mucho su presión ni su contenido de vapor",
          },
        ],
      },
      {
        kind: "p",
        text: "Cuando una parcela se enfría hasta su punto de rocío, alcanza la saturación. Según dónde ocurra y cómo siga evolucionando, puede haber rocío sobre superficies, niebla cerca del suelo o nubes en altura. **La saturación por sí sola no implica lluvia, granizo ni nieve.**",
      },
      {
        kind: "sub",
        text: "Entender: una estimación del nivel de condensación por ascenso",
      },
      {
        kind: "p",
        text: "Si una parcela superficial no saturada asciende sin mezclarse demasiado con el entorno, su temperatura y su punto de rocío disminuyen aproximadamente a ritmos distintos:",
      },
      {
        kind: "kv",
        items: [
          { k: "Temperatura de la parcela", v: "baja cerca de 3 °C por cada 1.000 ft" },
          { k: "Punto de rocío de la parcela", v: "baja cerca de 0,55 °C por cada 1.000 ft" },
          { k: "Convergencia aproximada", v: "2,45 °C por cada 1.000 ft" },
        ],
      },
      {
        kind: "p",
        text: "La separación inicial permite estimar el **nivel de condensación por ascenso** de esa parcela. Si hay ascenso suficiente y las condiciones son favorables, suele aproximar la base de los cúmulos alimentados desde superficie. No predice la base de todos los tipos de nube ni el techo reportado en el aeródromo.",
      },
      {
        kind: "pasos",
        items: [
          {
            rotulo: "La separación",
            texto: "Resta el punto de rocío a la temperatura de superficie, ambos en °C.",
          },
          {
            rotulo: "Divide",
            texto: "Divide la separación entre 2,45 °C por cada 1.000 ft.",
          },
          {
            rotulo: "Multiplica",
            texto: "Multiplica por 1.000 para obtener una altura aproximada sobre el terreno, AGL (Above Ground Level), del nivel de condensación de esa parcela.",
            fuerte: true,
          },
        ],
      },
      {
        kind: "code",
        grande: true,
        text: "T = 29 °C   PR = 21 °C\n29 - 21 = 8 °C\n8 / 2,45 ≈ 3,27\n3,27 x 1.000 ≈ 3.270 ft AGL",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Esto se responde de cabeza en una entrevista",
        text: "Como aproximación de entrevista, divide la separación en °C entre 2,45 y multiplica por 1.000 ft; un atajo es unos 400 ft por grado. Con 8 °C, cerca de 3.200 ft AGL. **Di qué estimaste:** el nivel de condensación por ascenso, no el techo ni una autorización para operar.",
      },
      {
        kind: "infografia",
        nombre: "meteo-base-nube",
      },
      {
        kind: "p",
        text: "**Qué muestra el esquema:** dos valores de una misma parcela que convergen al ascender. **Cómo lo lees:** la intersección aproxima su nivel de condensación, no mide la altura de la nubosidad existente. **Qué decides:** contrastar la estimación con bases, techo y tendencia observados antes de planificar una salida o llegada.",
      },
      {
        kind: "reconoce",
        titulo: "Bases planas de cúmulos sobre el aeródromo",
        intro: "La fotografía muestra bases de cúmulos a una altura parecida. No permite medirla ni sustituye las bases informadas.",
        imagen: {
          src: "/modulos/meteorologia/mt-l07-bases-cumulos.webp",
          alt: "Cúmulos con bases visualmente planas y cielo despejado entre ellos sobre un aeropuerto",
          ancho: 1600,
          alto: 800,
        },
        puntos: [
          {
            x: 49,
            y: 38,
            que: "Base del cúmulo central",
            significa: "El vapor de la parcela ascendente se hizo visible al condensarse; la foto no cuantifica su altura.",
            piloto: "Compara la observación de nubes vigente con los mínimos y la ruta previstos.",
          },
          {
            x: 75,
            y: 40,
            que: "Otra base de cúmulo",
            significa: "Bases parecidas pueden sugerir una capa de humedad compartida, pero no son un techo uniforme.",
            piloto: "No conviertas la fórmula de punto de rocío en una base exacta para todas las nubes.",
          },
          {
            x: 55,
            y: 57,
            que: "Espacio despejado entre nubes",
            significa: "La cobertura nubosa también importa: algunas nubes dispersas no equivalen a un techo.",
            piloto: "Verifica cobertura y altura informadas en METAR y pronóstico.",
          },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** cúmulos separados con bases parecidas. **Cómo lo reconoces:** la condensación comienza donde el aire ascendente alcanza la saturación. **Qué decides:** usar la cuenta solo como orientación y consultar bases, cobertura y tendencia observadas para la operación.",
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
        text: "La saturación puede producir condensación visible; sus efectos operativos dependen de la altura, la cobertura, la temperatura y los procesos posteriores. No toda nube precipita ni toda saturación implica una condición crítica.",
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
              "El agua líquida no es lo mismo que escarcha, pero una superficie fría puede congelarla; verifica el estado real del avión.",
            ],
          },
          {
            titulo: "Escarcha",
            ref: "cuando la superficie del avión está a 0 °C o menos",
            puntos: [
              "El vapor puede depositarse como hielo o el agua condensada puede congelarse sobre una superficie suficientemente fría, incluso si el aire está por encima de 0 °C.",
              "Interrumpe el flujo de aire sobre el ala y puede reducir drásticamente la sustentación.",
              "Además aumenta la resistencia, y las dos cosas juntas afectan a la capacidad de despegue.",
              "Las superficies críticas deben cumplir la condición de limpieza exigida por los procedimientos aprobados antes del despegue.",
            ],
            nota: "No se despega con contaminación en superficies críticas fuera de las excepciones expresamente aprobadas para ese tipo y operación.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "El error de bulto",
        text: "No presupongas que la escarcha se irá durante el rodaje o la carrera de despegue. Incluso una capa delgada puede degradar sustentación y aumentar resistencia. Inspecciona y aplica el procedimiento de deshielo/antihielo y la comprobación de superficies críticas correspondientes al avión y a la operación.",
      },
      {
        kind: "reconoce",
        titulo: "Escarcha visible en el extradós antes de salir",
        intro: "Una superficie contaminada requiere evaluación y tratamiento conforme a los procedimientos aprobados; el grosor no se puede certificar a partir de una fotografía.",
        imagen: {
          src: "/modulos/meteorologia/mt-l07-escarcha-ala.webp",
          alt: "Escarcha blanca irregular sobre la parte superior de un ala de avión comercial estacionado al amanecer",
          ancho: 1600,
          alto: 800,
        },
        puntos: [
          {
            x: 62,
            y: 56,
            que: "Escarcha sobre el extradós",
            significa: "La rugosidad altera el flujo y puede reducir el margen de sustentación en el despegue.",
            piloto: "Detén la salida hasta resolver la contaminación conforme al procedimiento aprobado.",
          },
          {
            x: 32,
            y: 52,
            que: "Superficie de control próxima",
            significa: "La inspección no se limita a la zona con escarcha más evidente.",
            piloto: "Comprueba todas las superficies críticas según el tipo de aeronave.",
          },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** escarcha irregular sobre la parte superior del ala. **Cómo la reconoces:** por su textura blanca adherida, distinta de una película de agua. **Qué decides:** no iniciar el despegue hasta verificar y restablecer la condición exigida para las superficies críticas, según los procedimientos aprobados.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es el punto de rocío y qué relación tiene con la humedad relativa?",
            respuesta:
              "El punto de rocío es la temperatura a la que una parcela llegaría a saturarse si se enfría sin cambiar mucho su presión ni su contenido de vapor. La humedad relativa compara el vapor presente con el de saturación a la temperatura actual. Cuando temperatura y punto de rocío se igualan, la humedad relativa llega al 100 %; la condensación visible depende también de núcleos y del entorno.",
            claves: ["Temperatura de saturación", "Relativa: vapor presente frente al de saturación", "Igualarse no implica lluvia"],
          },
          {
            nivel: "interpretacion",
            q: "Temperatura 24 °C, punto de rocío 12 °C. ¿Qué altura aproximada puedes estimar y qué no puedes deducir?",
            respuesta:
              "La separación es de 12 °C. Dividida entre 2,45 °C por cada 1.000 ft da unos 4.900 ft AGL para el nivel de condensación por ascenso de una parcela superficial. Puede orientar sobre la base de cúmulos alimentados desde superficie, pero no determina el techo ni la altura de otros estratos: compruebo el reporte y el pronóstico vigentes.",
            claves: ["Separación 12 °C", "Unos 4.900 ft AGL", "No sustituye techo observado"],
          },
          {
            nivel: "situacion",
            q: "Llega al avión al amanecer y hay escarcha en el extradós. ¿Qué hace y por qué?",
            respuesta:
              "No inicio el despegue con esa contaminación. La escarcha puede reducir la sustentación y aumentar la resistencia. Hago evaluar y tratar el avión conforme al programa de deshielo/antihielo y verifico las superficies críticas según los procedimientos aprobados para el tipo y la operación.",
            claves: ["No despegar contaminado", "Menos sustentación y más resistencia", "Procedimiento aprobado y verificación"],
          },
        ],
      },
    ],
  },

  // ── 08 ──────────────────────────────────────────────────────────────────
  {
    n: 8,
    title: "Nubes: reconocer lo que tienes delante",
    kicker: "Su forma orienta; los reportes completan la decisión",
    minutes: 10,
    blocks: [
      {
        kind: "p",
        text: "**Qué ves en la portada:** filamentos altos, una capa extensa y una torre convectiva lejana. **Cómo lo reconoces:** sus formas son distintas, pero la foto no mide alturas, crecimiento ni intensidad. **Qué decides:** identificar qué sector requiere más información y contrastarlo con radar y reportes antes de coordinar la ruta con la tripulación y el control. Más adelante verás un cumulonimbo con yunque y las precauciones específicas que exige.",
      },
      {
        kind: "definicion",
        text: "Las nubes son agua líquida, cristales de hielo o ambos, visibles cuando el vapor condensa o se deposita en aire que alcanza la saturación. Su formación suele requerir humedad, núcleos adecuados y enfriamiento por ascenso, contacto con una superficie fría u otro mecanismo. Su aspecto es una pista, no un diagnóstico completo de los peligros en vuelo.",
      },
      {
        kind: "p",
        text: "Para reconocerlas observa **altura aproximada de la base**, **forma** y **desarrollo vertical**. Las bandas baja, media y alta se superponen y cambian con la latitud; las cifras siguientes son referencias de estudio para latitudes tropicales, no límites rígidos que puedas medir a simple vista.",
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
            ref: "base aproximadamente entre la superficie y 6.500 ft AGL",
            puntos: [
              "Estratos y estratocúmulos; la base de un nimboestrato también puede descender a este nivel. La niebla es una nube en contacto con el suelo.",
              "Pueden contener gotas superenfriadas y producir engelamiento si coinciden temperatura y humedad apropiadas.",
              "Una capa rota o cubierta baja puede limitar el techo; la visibilidad depende además de precipitación y fenómenos próximos al suelo.",
              "Confirma cobertura, base y visibilidad reportadas antes de aplicar mínimos de tu operación.",
            ],
          },
          {
            titulo: "Medias",
            ref: "base desde unos 6.500 ft; puede llegar a 25.000 ft en trópicos",
            puntos: [
              "Altoestratos y altocúmulos.",
              "Según la temperatura pueden contener agua líquida, cristales de hielo o gotas superenfriadas.",
              "El riesgo de turbulencia y engelamiento depende de la estructura, la temperatura y los reportes; no se asigna una intensidad fija por el nombre de la nube.",
              "Los altocúmulos no son simplemente altoestratos que se rompen: tienen elementos con forma de banco o copos.",
            ],
          },
          {
            titulo: "Altas",
            ref: "base normalmente superior a 20.000 ft AGL en trópicos",
            puntos: [
              "Cirros, cirroestratos y cirrocúmulos.",
              "Están compuestas principalmente de cristales de hielo; los cirros suelen verse como filamentos.",
              "Pueden anunciar un frente, una corriente en chorro o ser restos de un yunque convectivo.",
              "No permiten descartar turbulencia en aire claro ni actividad convectiva cercana.",
            ],
          },
          {
            titulo: "Desarrollo vertical",
            ref: "base variable, cima que puede atravesar varias capas",
            puntos: [
              "Cúmulos, cúmulos en torre y cumulonimbos (cumulonimbus).",
              "El crecimiento vertical sostenido señala convección; puede haber turbulencia y, en nubes suficientemente desarrolladas, engelamiento o precipitación.",
              "No todos los cúmulos en torre llegan a tormenta, pero exigen vigilancia y margen para desviarse.",
            ],
          },
        ],
      },
      {
        kind: "infografia",
        nombre: "meteo-familias",
      },
      {
        kind: "p",
        text: "**Qué muestra el esquema:** alturas típicas de base en regiones tropicales y una nube de desarrollo vertical que atraviesa varios niveles. **Cómo lo lees:** clasifica por forma y nivel aproximado; no supongas una frontera exacta. **Qué decides:** contrastar tu observación con bases, temperatura, radar y reportes antes de cruzar una capa o desviarte de convección.",
      },
            {
        kind: "reconoce",
        titulo: "Cumulonimbo con yunque",
        intro: "El yunque y el gran desarrollo vertical sugieren convección profunda. La imagen no mide distancias, intensidad ni dirección futura del sistema.",
        imagen: {
          src: "/modulos/meteorologia/mt-t08-02-cumulonimbus-yunque.webp",
          alt: "Cumulonimbo al atardecer sobre una sierra, con yunque extendido hacia la izquierda y nubes convectivas cercanas al lado derecho",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 20,
            y: 12,
            que: "El yunque",
            significa: "La parte superior se extendió lateralmente al encontrar una capa estable, a menudo cerca de la tropopausa.",
            piloto: "No interpretes el yunque como fin de la tormenta ni intentes pasar por debajo: consulta la posición y evolución de la célula.",
          },
          {
            x: 45,
            y: 34,
            que: "La torre",
            significa: "El contorno abultado muestra desarrollo vertical, pero una sola foto no permite medir la velocidad de ascenso.",
            piloto: "Evita penetrar la nube; el margen lateral se establece con radar, información vigente y procedimientos de tu operador.",
          },
          {
            x: 52,
            y: 76,
            que: "La base",
            significa: "La base visible no delimita toda la zona de peligro; lluvia, ráfagas y cizalladura pueden extenderse fuera de ella.",
            piloto: "No planees un paso bajo la nube; evalúa efectos cerca del aeródromo y una ruta de escape.",
          },
          {
            x: 79,
            y: 74,
            que: "Nubosidad convectiva próxima",
            significa: "Hay cúmulos cerca de la nube principal, pero una imagen fija no demuestra si son células nuevas ni hacia dónde se moverán.",
            piloto: "Revisa radar y tendencia antes de elegir el lado de desvío; no deduzcas la ruta segura solo de esta foto.",
          },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** gran torre y yunque extendido. **Cómo lo reconoces:** desarrollo vertical profundo y expansión lateral del tope. **Qué decides:** evitar la convección con margen conforme al manual de operaciones; para tormentas severas o ecos intensos, la guía FAA recomienda al menos 20 millas, especialmente bajo el yunque. No conviertas esa cifra en permiso para acercarte si las condiciones exigen más.",
      },
      {
        kind: "reconoce",
        titulo: "Capa baja extensa",
        intro: "Un cielo casi cubierto orienta sobre posible techo bajo; la imagen sola no determina si son estratos o estratocúmulos ni qué condiciones hay dentro.",
        imagen: {
          src: "/modulos/meteorologia/mt-t08-03-estratos-base-uniforme.webp",
          alt: "Capa baja gris extensa sobre un aeropuerto, con un hangar a la izquierda y un avión en rodaje a la derecha",
          ancho: 1600,
          alto: 800,
        },
        puntos: [
          {
            x: 55,
            y: 54,
            que: "Capa baja extensa",
            significa: "Ocupa gran parte del cielo; una foto no distingue con certeza todos los géneros ni la altura exacta de la base.",
            piloto: "Consulta base y cobertura informadas; una capa rota o cubierta puede constituir techo.",
          },
          {
            x: 17,
            y: 61,
            que: "Hangar bajo la capa",
            significa: "Da contexto visual, pero sin su altura y distancia no permite calcular el techo.",
            piloto: "No sustituyas por una apreciación visual el METAR y los mínimos de la operación.",
          },
          {
            x: 80,
            y: 44,
            que: "Sin torres visibles",
            significa: "En el encuadre no aparece desarrollo vertical marcado; eso no garantiza aire liso ni ausencia de amenazas fuera de la foto.",
            piloto: "Revisa reportes de turbulencia, precipitación y tendencia además del techo.",
          },
          {
            x: 33,
            y: 37,
            que: "Composición invisible",
            significa: "La foto no revela si hay gotas superenfriadas dentro de la capa.",
            piloto: "Comprueba temperatura en la capa, pronósticos y avisos de engelamiento antes de atravesarla.",
          },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** nubosidad baja extendida sobre el aeródromo. **Cómo la reconoces:** aspecto de capa, no una torre convectiva aislada. **Qué decides:** verificar techo, visibilidad, temperatura y avisos de hielo; la aparente uniformidad no garantiza ausencia de turbulencia ni permite estimar los mínimos a ojo.",
      },
      {
        kind: "reconoce",
        titulo: "Cúmulos en torre",
        intro: "Otra escena de convección: un cúmulo de gran desarrollo exige seguimiento, pero no conocemos su edad ni su evolución a partir de esta foto.",
        imagen: {
          src: "/modulos/meteorologia/mt-t08-04-cumulos-en-torre.webp",
          alt: "Cúmulos en torre de contorno abultado contra un cielo azul profundo, con el tope redondeado y otras nubes próximas",
          ancho: 1600,
          alto: 900,
        },
        puntos: [
          {
            x: 38,
            y: 24,
            que: "Bordes definidos y abultados",
            significa: "Contorno de coliflor, nítido contra el azul.",
            piloto: "La forma sugiere convección; confirma crecimiento y movimiento con observaciones sucesivas y radar.",
          },
          {
            x: 20,
            y: 83,
            que: "Frente a lo plano de alrededor",
            significa: "La nubosidad baja de al lado no crece; esta sí.",
            piloto: "Prioriza la evaluación de la torre, sin asumir que las otras nubes o el aire entre ellas están libres de riesgo.",
          },
          {
            x: 44,
            y: 17,
            que: "Tope sin yunque visible",
            significa: "No se observa expansión lateral en este encuadre; un cumulonimbo también puede existir sin un yunque claramente visible.",
            piloto: "No esperes a ver yunque para tratar la convección como posible amenaza.",
          },
          {
            x: 72,
            y: 52,
            que: "Nubosidad próxima a la torre",
            significa: "Hay otras nubes en el mismo sector; la foto no informa su crecimiento ni el movimiento del conjunto.",
            piloto: "Confirma la evolución con datos actuales antes de elegir un corredor de desvío.",
          },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** una nube de gran crecimiento vertical y tope redondeado. **Cómo la reconoces:** contorno abultado y altura mayor que los cúmulos cercanos. **Qué decides:** vigilar su evolución, evitar atravesarla y coordinar un desvío temprano si afecta la ruta; la ausencia de yunque no certifica seguridad.",
      },
      {
        kind: "check",
        question:
          "Por delante ves una torre de contorno abultado y tope redondeado, sin yunque visible. Afecta tu ruta. ¿Qué haces?",
        options: [
          "Revisas su evolución con radar y reportes, y coordinas una desviación con margen según los procedimientos",
          "Esperas a ver un yunque: sin él la nube no puede ser peligrosa",
          "Mantienes rumbo y asciendes: un tope redondeado no alcanza niveles de crucero",
        ],
        answer: 0,
        explain:
          "Una torre de gran desarrollo puede traer turbulencia y evolucionar rápidamente, pero una imagen fija no da su intensidad ni asegura que se convertirá en cumulonimbo. Tampoco se necesita un yunque visible para que haya peligro. Contrasta radar y reportes, y toma la decisión de desvío con el margen exigido por tu operación.",
      },
      {
        kind: "sub",
        text: "Interpretar: el cumulonimbus, aparte de todos",
      },
      {
        kind: "p",
        text: "El cumulonimbo se asocia con **rayos, turbulencia intensa, granizo, ráfagas y cizalladura**; algunos sistemas producen tornados, pero no todos. Puede originarse por calentamiento superficial, ascenso frontal u orográfico, entre otros mecanismos. La amenaza puede extenderse fuera del contorno visible, especialmente bajo el yunque y cerca de las corrientes descendentes.",
      },
      {
        kind: "kv",
        items: [
          { k: "Corrientes dentro de una tormenta", v: "pueden ser muy intensas; la foto no permite cuantificarlas" },
          { k: "Tope que sobresale del yunque", v: "sugiere una corriente ascendente vigorosa; no indica una altitud segura de sobrevuelo" },
          { k: "Tormentas organizadas en línea", v: "pueden formar una línea de turbonada (squall line), asociada o no a un frente" },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Tormentas incrustadas",
        text: "Un cumulonimbo puede quedar oculto dentro de otra nubosidad: es una **tormenta incrustada**. No basta con buscar una torre por la ventanilla. Usa radar meteorológico, reportes y avisos disponibles según el equipamiento y el procedimiento; recuerda que el radar puede atenuarse tras precipitación intensa y que un mosaico enlazado puede llevar retraso. Si no puedes confirmar una ruta libre de convección, no penetres la masa nubosa.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En crucero, ruta larga",
        situacion:
          "En crucero sobre el mar ves cirros, luego una capa más extensa de aspecto medio y, hacia un sector de la ruta, cúmulos en torre. El radar de a bordo aún no muestra un eco intenso en ese sector.",
        pregunta: "¿Qué puedes inferir y qué debes comprobar antes de decidir la ruta?",
        claves: [
          "Los cirros pueden acompañar un frente, un chorro en altura o restos de convección; no certifican aire estable ni ausencia de turbulencia.",
          "La capa media exige revisar altura, temperatura y reportes de engelamiento o turbulencia; su apariencia no fija la intensidad del peligro.",
          "Los cúmulos en torre justifican seguimiento de convección y una alternativa temprana si invaden la ruta; un eco débil no descarta todos los riesgos.",
          "Integra radar, imágenes y avisos vigentes, observaciones de otros pilotos y procedimientos de separación; no conviertas una secuencia visual en un pronóstico temporal seguro.",
        ],
        cierre:
          "La lectura visual te avisa dónde investigar. La decisión de ruta se apoya en información actual y en los márgenes operativos, no solo en la forma de una nube.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Cómo se clasifican las nubes y qué hace falta para que se formen?",
            respuesta:
              "Se agrupan en bajas, medias, altas y de desarrollo vertical según la altura habitual de la base y la forma. Unas referencias útiles en latitudes tropicales son hasta unos 6.500 ft AGL para bases bajas y por encima de unos 20.000 ft para altas; las bandas se superponen y cambian con la latitud. Para formarse se requiere humedad suficiente, saturación por enfriamiento o ascenso, y núcleos adecuados.",
            claves: ["Cuatro familias", "Alturas aproximadas que cambian con latitud", "Humedad, saturación y núcleos"],
          },
          {
            nivel: "interpretacion",
            q: "¿Cómo evalúa el riesgo de engelamiento al entrar en una capa de nubes?",
            respuesta:
              "Busco temperatura dentro de la capa, humedad líquida superenfriada y avisos o reportes de engelamiento. Puede darse en capas bajas o medias, pero el nombre de la nube no fija por sí solo una intensidad. Reviso la capacidad certificada del avión, el pronóstico y la ruta de salida de la condición, sin asumir que una nube alta o una foto descartan otros peligros.",
            claves: ["Gotas superenfriadas", "Temperatura y reportes", "Limitaciones del avión y salida"],
          },
          {
            nivel: "situacion",
            q: "¿Qué es una tormenta incrustada y qué implica para usted?",
            respuesta:
              "Es convección oculta dentro de una masa nubosa más extensa. No puedo fiarme solo de la vista: integro radar de a bordo, avisos y reportes actuales, teniendo presentes la atenuación del radar y el retraso posible de datos enlazados. Si no puedo verificar una trayectoria segura, evito penetrarla.",
            claves: ["Convección oculta", "Radar con limitaciones", "Información vigente y evitación"],
          },
        ],
      },
    ],
  },

  // ── 09 ──────────────────────────────────────────────────────────────────
  {
    n: 9,
    title: "Niebla, techo y visibilidad",
    kicker: "Reconocer el fenómeno y comprobar los mínimos",
    minutes: 9,
    blocks: [
      {
        kind: "p",
        text: "**Qué ves en la portada:** una capa de niebla reduce la visibilidad alrededor de la torre y la plataforma. **Cómo la reconoces:** algunas estructuras sobresalen, pero otras desaparecen dentro de la capa. **Qué decides:** comprobar el informe actual, la tendencia, los mínimos aplicables, el combustible y el alterno. Una foto no identifica por sí sola el tipo de niebla ni su hora de disipación.",
      },
      {
        kind: "definicion",
        text: "La niebla es una nube en contacto con la superficie que reduce la visibilidad horizontal. Sus gotas pueden aparecer por enfriamiento del aire hasta la saturación o por aporte de humedad; el mecanismo importa para interpretar su evolución, pero no sustituye la observación ni el pronóstico.",
      },
      {
        kind: "sub",
        text: "Ver: mecanismos de formación y evolución posible",
      },
      {
        kind: "reconoce",
        titulo: "Niebla baja sobre el aeródromo",
        intro: "La capa superficial limita la vista a través del campo. La escena orienta sobre la extensión vertical, no sobre una visibilidad medida ni sobre su causa.",
        imagen: {
          src: "/modulos/meteorologia/mt-t09-01-niebla-baja-aerodromo.webp",
          alt: "Niebla somera al amanecer sobre un aeródromo; la torre y la parte superior de edificios permanecen visibles por encima de la capa",
          ancho: 1600,
          alto: 800,
        },
        puntos: [
          { x: 82, y: 30, que: "Torre visible arriba", significa: "Su parte superior sobresale de la capa; eso no mide la visibilidad horizontal a nivel de pista.", piloto: "Usa la visibilidad informada y, cuando corresponda, el alcance visual en pista para compararlos con los mínimos." },
          { x: 55, y: 45, que: "Capa pegada al suelo", significa: "La niebla ocupa el sector bajo del aeródromo mientras el cielo superior puede seguir despejado.", piloto: "Consulta reportes sucesivos y pronóstico; no supongas que el amanecer la disipará pronto." },
          { x: 24, y: 77, que: "Plataforma cercana", significa: "Las aeronaves próximas se ven mejor que edificios más lejanos; la foto no ofrece una distancia calibrada.", piloto: "No conviertas esta percepción en metros de visibilidad ni en autorización operacional." },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** niebla somera sobre parte del aeródromo. **Cómo la reconoces:** la base toca el suelo y oculta infraestructura distante, mientras la torre sobresale. **Qué decides:** seguir la visibilidad y el alcance visual en pista informados, junto con su tendencia; la imagen no permite calcularlos ni confirmar niebla de radiación.",
      },
      {
        kind: "fichas",
        columnas: 2,
        titulo: "La formación orienta; la duración no se deduce de una etiqueta",
        items: [
          {
            titulo: "De radiación",
            ref: "enfriamiento nocturno del suelo, a menudo con viento flojo",
            puntos: [
              "El suelo pierde calor y enfría el aire húmedo cercano hasta la saturación.",
              "Es frecuente en valles y zonas bajas, especialmente con cielo despejado.",
              "Puede aclarar con el calentamiento y la mezcla tras el amanecer; una inversión persistente o una capa extensa puede retrasarlo.",
              "El viento puede mezclar y disipar la niebla, pero también modificar o mantener una capa baja según el entorno.",
            ],
            nota: "Comprueba la tendencia observada: el amanecer no garantiza la mejora a una hora determinada.",
          },
          {
            titulo: "De advección",
            ref: "aire húmedo en movimiento sobre una superficie más fría",
            puntos: [
              "El viento transporta aire húmedo sobre agua o terreno más frío, donde el aire próximo a la superficie se satura.",
              "Puede aparecer en zonas costeras y extenderse hacia el aeródromo.",
              "El viento y la mezcla pueden cambiar su espesor o levantarla a estratos; no existe un umbral único de 15 kt válido para todos los casos.",
              "Puede persistir aun después del amanecer, pero también disiparse si cambian el flujo, la temperatura o la mezcla.",
            ],
          },
          {
            titulo: "De ladera",
            ref: "aire húmedo que asciende por una pendiente",
            puntos: [
              "El flujo asciende por el relieve, se enfría y puede alcanzar la saturación.",
              "La persistencia depende de que continúen el flujo y la humedad; el sol por sí solo no permite fijar una hora de mejora.",
              "En terreno elevado puede afectar un aeródromo aunque el valle cercano tenga otras condiciones.",
            ],
          },
          {
            titulo: "De vapor (o humo de mar)",
            ref: "aire frío sobre agua relativamente cálida",
            puntos: [
              "El agua aporta vapor al aire frío; la mezcla puede condensarse en columnas que parecen humo.",
              "Se observa sobre cuerpos de agua en condiciones frías.",
              "Puede asociarse con turbulencia baja y, si hay gotas superenfriadas, con engelamiento.",
            ],
            nota: "El riesgo de hielo no es exclusivo de esta niebla: cualquier niebla engelante con gotas superenfriadas requiere atención.",
          },
          {
            titulo: "De hielo",
            ref: "cristales en aire extremadamente frío, por lo general cerca de -30 °C o menos",
            puntos: [
              "Está compuesta por cristales de hielo suspendidos, no por las gotas líquidas de la niebla común.",
              "Es típica de regiones muy frías; no basta con que el termómetro marque algunos grados bajo cero.",
              "No debe confundirse con niebla engelante, formada por gotas superenfriadas capaces de congelarse al contacto.",
            ],
          },
        ],
      },
      {
        kind: "reconoce",
        titulo: "Banco de niebla junto a la costa",
        intro: "El banco alcanza la infraestructura aeroportuaria desde el sector marítimo. Es compatible con advección, pero para determinar su mecanismo hacen falta viento y temperaturas del aire y de la superficie.",
        imagen: {
          src: "/modulos/meteorologia/mt-t09-02-niebla-costera.webp",
          alt: "Vista aérea de un aeropuerto costero junto al mar, con un banco de niebla bajo que alcanza la terminal y reduce la visibilidad sobre el campo",
          ancho: 1600,
          alto: 800,
        },
        puntos: [
          { x: 31, y: 43, que: "Borde del banco", significa: "El límite entre sectores más despejados y cubiertos permite ver que las condiciones no son uniformes.", piloto: "Consulta observaciones y tendencias del aeródromo, no la mejor visibilidad de la zona despejada." },
          { x: 63, y: 45, que: "Infraestructura parcialmente oculta", significa: "El banco afecta directamente el entorno aeroportuario; no indica una hora cierta de apertura.", piloto: "Revisa el pronóstico, la reserva de combustible y el alterno antes de decidir esperar o desviar." },
          { x: 18, y: 82, que: "Superficie marina", significa: "El mar aporta contexto para investigar advección, pero la foto no muestra temperatura del agua ni del aire.", piloto: "Confirma el mecanismo con datos meteorológicos, no solo con la dirección aparente del banco." },
        ],
      },
      {
        kind: "p",
        text: "**Qué ves:** un banco de niebla alcanza el litoral y el campo. **Cómo lo reconoces:** cambia la visibilidad entre el mar y la infraestructura del aeropuerto. **Qué decides:** contrastar viento, temperaturas, observaciones sucesivas y pronóstico; la escena es compatible con advección, pero no la demuestra ni fija cuándo mejorará.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "La pregunta que hay que hacerse en el despacho",
        text: "Pregunta qué mecanismo es probable y qué tendencia muestran las observaciones y el pronóstico. Ningún tipo de niebla garantiza una mejora a cierta hora. Compara los mínimos de la operación y planifica combustible, espera y alterno sin depender de que el sol la disipe.",
      },
      {
        kind: "infografia",
        nombre: "meteo-nieblas",
      },
      {
        kind: "p",
        text: "**Qué ves en el esquema:** cuatro mecanismos de formación, no cuatro pronósticos de duración. **Cómo los reconoces:** identifica enfriamiento nocturno, transporte sobre una superficie fría, ascenso por ladera o aporte de vapor desde agua templada. **Qué decides:** contrastar esa hipótesis con datos actuales y tendencia; el mecanismo por sí solo no autoriza una salida ni una aproximación.",
      },
      {
        kind: "sub",
        text: "Interpretar: techo y visibilidad no son lo mismo",
      },
      {
        kind: "p",
        text: "El **techo** es la altura de la base de la capa más baja informada como rota o cubierta, o la visibilidad vertical cuando el cielo está oscurecido. La **visibilidad** describe cuánto se puede ver horizontalmente; el alcance visual en pista, **RVR (runway visual range)**, es una medición específica a lo largo de la pista. No son intercambiables. En una aproximación instrumental tridimensional, por ejemplo con sistema de aterrizaje por instrumentos, **ILS (instrument landing system)**, suelen aplicarse una altitud o altura de decisión, **DA/H (decision altitude/height)**, y mínimos de visibilidad o RVR. En una bidimensional se usa una altitud o altura mínima de descenso, **MDA/H (minimum descent altitude/height)**, junto con visibilidad o RVR. Las condiciones de nubosidad pueden intervenir según el procedimiento, la norma y la operación; el techo también importa al planear alternos.",
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Los mínimos son de la carta, no del curso",
        text: "Los mínimos concretos se obtienen de la carta vigente, la normativa aplicable y el manual de operaciones del explotador, incluidos los ajustes autorizados para la tripulación, aeronave y pista. Este curso no proporciona valores para volar. No decidas iniciar o continuar una aproximación con una sola cifra ni por lo que parezca mostrar una fotografía.",
      },
      {
        kind: "check",
        question:
          "En una aproximación instrumental tridimensional, ¿qué dato meteorológico suele figurar entre los mínimos publicados, además de la DA/H?",
        options: [
          "Solo el techo estimado a simple vista desde la aeronave",
          "La visibilidad o el RVR, según el procedimiento y las reglas aplicables",
          "La temperatura de la superficie, sin consultar visibilidad ni RVR",
        ],
        answer: 1,
        explain:
          "La visibilidad o el RVR suelen formar parte de los mínimos de una aproximación tridimensional junto con la DA/H. Consulta la carta vigente y las reglas de tu operación: también pueden importar condiciones de nubosidad y restricciones adicionales. El techo y la visibilidad no son la misma medida.",
      },
      {
        kind: "sub",
        text: "Y la precipitación, que cae desde las nubes",
      },
      {
        kind: "p",
        text: "La precipitación consiste en gotas o cristales que caen desde una nube tras crecer lo suficiente; pueden llegar al suelo o evaporarse antes, como sucede con la virga. Su intensidad y tipo aportan pistas sobre la nube y las condiciones, pero no sustituyen los reportes ni el radar.",
      },
      {
        kind: "piensaComoPiloto",
        momento: "En el despacho, madrugada",
        situacion:
          "Tu destino costero lleva seis horas con niebla y viento de 10 kt desde el mar. El informe meteorológico de rutina para la aviación, METAR (meteorological aerodrome report), indica visibilidad por debajo de los mínimos aplicables. El comandante propone salir y esperar en el aire a que el sol la levante, como a veces ocurre en un aeropuerto de montaña que conoce.",
        pregunta: "¿Qué le dirías?",
        claves: [
          "El viento desde el mar hace plausible la advección, pero no la confirma: compara temperaturas, humedad, observaciones sucesivas y pronóstico.",
          "Diez nudos no permite calcular cuándo se levantará la niebla. Tampoco hay un corte universal a 15 kt que convierta niebla en estratos.",
          "La mejora tras el amanecer es posible en algunos casos, no una garantía. Una niebla costera puede persistir mientras se mantenga el flujo húmedo.",
          "Revisa mínimos aplicables, hora de llegada, combustible para espera y alterno viable. No traslades sin más una experiencia de valle al destino costero.",
        ],
        cierre:
          "No bases la salida en esperar una disipación incierta en el aire. Formula un plan con observaciones y pronóstico vigentes, combustible suficiente y un alterno que cumpla los requisitos; aplica los procedimientos del operador.",
      },
      {
        kind: "entrevista",
        titulo: "Cómo te lo pueden preguntar",
        preguntas: [
          {
            nivel: "concepto",
            q: "¿Qué es la niebla y en qué se diferencia de una nube baja?",
            respuesta:
              "Es una nube en contacto con la superficie que reduce la visibilidad horizontal. Puede resultar del enfriamiento del aire hasta la saturación o del aporte de humedad. Una nube baja cuya base no toca el suelo puede limitar el techo sin ser niebla en el aeródromo.",
            claves: ["Nube en contacto con el suelo", "Reduce visibilidad", "No toda nube baja es niebla"],
          },
          {
            nivel: "interpretacion",
            q: "Diferencie niebla de radiación y niebla de advección.",
            respuesta:
              "La de radiación suele formarse de noche con cielo claro y viento flojo cuando el suelo enfría el aire cercano; puede aclarar tras el amanecer, pero no siempre a una hora predecible. La de advección aparece cuando aire húmedo se desplaza sobre una superficie más fría; puede persistir mientras continúe el flujo. Confirmo la tendencia con observaciones y pronóstico, sin aplicar un umbral fijo de viento.",
            claves: [
              "Radiación: enfriamiento del suelo y viento flojo",
              "Advección: transporte de aire húmedo sobre superficie fría",
              "La tendencia exige datos, no una hora garantizada",
            ],
          },
          {
            nivel: "situacion",
            q: "¿Cuándo puede haber engelamiento en presencia de niebla?",
            respuesta:
              "Cuando hay gotas líquidas superenfriadas, la niebla engelante puede depositar hielo sobre la aeronave independientemente de si se originó por radiación, advección u otro mecanismo. Distingo este riesgo de la niebla de hielo, compuesta por cristales en aire extremadamente frío, y aplico la evaluación y los procedimientos de protección aprobados para el avión.",
            claves: ["Gotas superenfriadas", "No depende de un único mecanismo", "Procedimientos aprobados"],
          },
        ],
      },
    ],
  },
]
