/**
 * Nivel 4 · Casos reales y repaso: los cuatro accidentes juntos, con su patrón,
 * y lo que el reglamento te exige como piloto con las veinte respuestas que
 * hay que tener listas.
 *
 * Los casos remiten a sus lecciones (01, 08, 09 y 11), donde están contados
 * con su fuente. La Tabla C.1 se transcribió del PDF del RAC 175, cuya
 * maquetación desalinea las columnas al extraer el texto: las horas van con
 * su aviso de verificación.
 */

import type { DocScreen } from "@/lib/docBlocks"

/**
 * La ruta de la práctica va escrita aquí y no importada de lib/mercancias:
 * ese archivo importa el total de lecciones de este índice, y el ciclo dejaba
 * la constante sin inicializar al evaluar el módulo.
 */
const MP_PRACTICA = "/app/aerolinea/mercancias/practica"

export const NIVEL_4: DocScreen[] = [
  // ── 13 ──────────────────────────────────────────────────────────────────
  {
    n: 13,
    title: "Lo que la industria aprendió",
    kicker: "Cuatro accidentes, cuatro lecciones",
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "Cuatro accidentes, cuatro lecciones. Los cuatro tienen informe oficial y ninguno se cuenta de memoria: ya los leíste en las lecciones 01, 08, 09 y 11. Aquí van juntos, en orden, para ver el patrón.",
      },
      {
        kind: "hueco",
        rotulo: "MP-ILU-05 · Ilustración · 21:9 · 2000×860 · SVG",
        descripcion:
          "Línea de tiempo 1987 → 2011 con los cuatro accidentes (South African 295, ValuJet 592, UPS 6, Asiana 991) y, debajo de cada uno, la regla que cambió después. Estilo Aviatory, sin texto pequeño.",
        alto: 240,
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "South African 295 · 1987",
            puntos: [
              "**Qué falló:** un incendio en la cubierta principal de un combi, en una zona a la que la tripulación no podía llegar. La causa de la ignición nunca se determinó.",
              "**Qué cambió:** los requisitos de los combi y la exigencia de que la carga sea accesible y separable en vuelo.",
              "**Lo que reconoces:** por qué los bultos «Exclusivamente en aeronaves de carga» se estiban donde un tripulante pueda verlos y manipularlos.",
            ],
          },
          {
            titulo: "ValuJet 592 · 1996",
            puntos: [
              "**Qué falló:** generadores de oxígeno sin tapas, declarados como «vacíos» y despachados como material de la compañía. Tres eslabones: expedidor, explotador y una regla de diseño de la autoridad.",
              "**Qué cambió:** detección y supresión de incendios obligatorias en las bodegas de clase D.",
              "**Lo que reconoces:** la descripción general que esconde una mercancía peligrosa y el peso de la firma del comandante.",
            ],
          },
          {
            titulo: "UPS 6 · 2010",
            puntos: [
              "**Qué falló:** autoignición de una paleta con más de 81.000 baterías de litio. El humo llenó la cabina en minutos; el capitán quedó incapacitado al fallar su oxígeno.",
              "**Qué cambió:** la OACI endureció las baterías de litio como carga; desde 2016 las de ion litio sueltas no van en aeronaves de pasajeros.",
              "**Lo que reconoces:** por qué la información tiene que estar al alcance del comandante en vuelo y disponible de inmediato para la emergencia.",
            ],
          },
          {
            titulo: "Asiana 991 · 2011",
            puntos: [
              "**Qué falló:** un incendio en o cerca de una paleta con mercancías peligrosas en el fuselaje trasero, más rápido que el descenso. Los registradores se perdieron y la causa exacta no se determinó.",
              "**Qué cambió:** más presión sobre la estiba y la segregación de las mercancías peligrosas en cargueros y sobre la respuesta al humo en cabina.",
              "**Lo que reconoces:** el fuego empieza en un sitio concreto (por eso la estiba y la segregación) y la respuesta se da con lo que ya estaba a bordo.",
            ],
          },
        ],
      },
      { kind: "sub", text: "El patrón" },
      {
        kind: "p",
        text: "Ninguno de los cuatro empezó en cabina. Los cuatro empezaron en una bodega, con algo que no debía estar ahí, o que estaba mal preparado, o a lo que no se podía llegar. Y en los cuatro, cuando la tripulación se enteró, el fuego ya llevaba minutos.",
      },
      {
        kind: "vinetas",
        items: [
          "**El papel y la caja no coincidían.** ValuJet es el caso puro: lo que decía el manifiesto no era lo que iba en la bodega. Toda la cadena de la lección 04 existe para que coincidan, y tu firma es el último punto donde alguien lo comprueba.",
          "**El fuego fue más rápido que la respuesta.** En UPS 6, Asiana 991 y el Helderberg la tripulación hizo lo que pudo con lo que tenía. Por eso el reglamento exige que la información, el conocimiento y el equipo existan antes de que algo pase.",
          "**La información que salva es la que ya estaba a bordo.** Cuando el humo no deja ver el panel, no hay tiempo de buscar. El NOTOC al alcance y la guía de respuesta de emergencia disponible de inmediato no son trámite: son lo único que queda.",
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Lo que no se sabe también enseña",
        text: "En South African 295 y en Asiana 991 la causa exacta de la ignición nunca se determinó. Eso no debilita la lección: la refuerza. Si no se puede saber qué encendió el fuego, lo que se puede controlar es qué había en la bodega, cómo estaba estibado y qué tan rápido lo supo la tripulación. Ahí es donde actúa el reglamento, y ahí es donde actúas tú.",
      },
    ],
  },

  // ── 14 ──────────────────────────────────────────────────────────────────
  {
    n: 14,
    title: "Lo que te exigen y veinte respuestas listas",
    kicker: "Instrucción y repaso",
    minutes: 5,
    blocks: [
      {
        kind: "p",
        text: "El curso de mercancías peligrosas no es un requisito de la aerolínea: es del reglamento, y en Colombia aparece en tres reglamentos distintos. Esta lección te dice cuánto, cada cuánto y dónde está escrito, y cierra con las veinte respuestas que no puedes dudar en una entrevista.",
      },
      {
        kind: "norma",
        titulo: "Los tres componentes de la instrucción",
        texto:
          "(1) Instrucción general de familiarización: debe tener como objetivo la familiarización con las disposiciones generales; (2) instrucción específica según la función: debe proporcionar formación detallada sobre los requisitos que se aplican a la función de la cual se encarga esa persona; y (3) instrucción sobre seguridad operacional: debe abarcar los peligros que suponen las mercancías peligrosas, la manipulación sin riesgos y los procedimientos de respuesta de emergencia.",
      },
      { kind: "sub", text: "Cuánto y cada cuánto" },
      {
        kind: "table",
        head: ["Cargo", "Inicial (h)", "Recurrente (h)"],
        rows: [
          ["Expedidores y quienes asumen sus responsabilidades", "40", "8"],
          ["Personal de aceptación de mercancías peligrosas", "40", "8"],
          ["Personal de aceptación de mercancías no peligrosas", "4", "4"],
          ["Personal de pasajeros: tiquetes, chequeo, salas, desembarque", "8", "4"],
          ["Tripulación de vuelo", "16", "8"],
          ["Tripulación de cabina u otros tripulantes", "8", "4"],
          ["Seguridad aeroportuaria: gerentes, coordinadores, supervisores, guardas", "8", "4"],
          ["Manipulación, almacenamiento y estiba de carga", "8", "4"],
          ["Trámite de carga, correo y suministros", "8", "4"],
          ["Administrativos, mantenimiento aeronáutico y almacenistas", "4", "4"],
          ["Cualquier otro personal con contacto frecuente", "4", "4"],
        ],
      },
      {
        kind: "callout",
        tone: "verificar",
        title: "Las horas, contra el original",
        text: "Las horas por cargo son un añadido nacional: el LAR fija el currículo y la periodicidad, pero no una tabla de horas, así que cada país publica la suya y la autoridad aprueba en definitiva cada programa. Las de arriba son las de Colombia, transcritas de un PDF cuya maquetación desalinea las columnas: la fila de tripulación de vuelo (16 y 8) coincide con la transcripción de referencia, pero confírmala contra la tabla original de tu reglamento antes de citarla en una entrevista.",
      },
      {
        kind: "fichas",
        columnas: 3,
        items: [
          {
            titulo: "Cada 24 meses como mínimo",
            puntos: ["Todas las personas que realicen o supervisen funciones relacionadas con pasajeros, equipajes, carga o correo."],
          },
          {
            titulo: "Al contratar",
            puntos: ["La instrucción se imparte o se verifica en el momento de la contratación."],
          },
          {
            titulo: "Registro para la autoridad",
            puntos: ["Cada organización mantiene el registro de la instrucción de sus empleados, disponible para la AAC."],
          },
          {
            titulo: "Ventana de 30 días",
            puntos: ["El LAR permite hacer el recurrente dentro de los 30 días siguientes al vencimiento. Después de ese plazo, toca instrucción inicial otra vez."],
          },
          {
            titulo: "Instructores de Categoría 6",
            puntos: ["Competencia pedagógica, programa de Categoría 6 completado y los requisitos de instructor que fije tu reglamento."],
          },
          {
            titulo: "Aunque no acepte mercancías peligrosas",
            puntos: ["El explotador que decide no transportarlas cumple igual los programas de capacitación."],
          },
        ],
      },
      { kind: "sub", text: "Dónde más aparece: en tu licencia" },
      {
        kind: "p",
        text: "El reglamento de mercancías peligrosas no es el único sitio donde te exigen esto. El reglamento de licencias de cada país repite el requisito, porque el conocimiento de mercancías peligrosas se pide para la licencia, no solo para la operación. Abajo va Colombia como ejemplo, con el RAC 2 y el RAC 61; busca el artículo equivalente en el reglamento de licencias del tuyo, porque en una entrevista te lo pueden preguntar con el número.",
      },
      {
        kind: "fichas",
        columnas: 2,
        items: [
          {
            titulo: "Entrenamientos periódicos del piloto",
            puntos: [
              "Curso de Transporte de Mercancías Peligrosas conforme al Anexo 18 y a los documentos vigentes de la OACI (las Instrucciones Técnicas, la guía de respuesta de emergencia y el programa de instrucción), con una frecuencia no mayor a dos años, dentro del programa de entrenamiento del operador.",
            ],
          },
          {
            titulo: "Tripulantes que no son pilotos",
            puntos: ["El mismo curso cada dos años para los demás miembros de la tripulación."],
          },
          {
            titulo: "Licencia de piloto comercial",
            puntos: ["Conocimientos: «los procedimientos operacionales para el transporte de carga, los posibles riesgos en relación con el transporte de mercancías peligrosas»."],
          },
          {
            titulo: "Licencia de piloto de transporte de línea aérea",
            puntos: ["Conocimientos: «los procedimientos operacionales para el transporte de carga y de mercancías peligrosas»."],
          },
          {
            titulo: "Auxiliar de servicios a bordo",
            puntos: [
              "Transporte de mercancías peligrosas: conceptos generales, sus posibles riesgos, identificación de etiquetas, mercancías prohibidas, excepciones y procedimientos de emergencia. Es el temario más detallado de los cinco, y describe bien lo que un piloto debe dominar.",
            ],
          },
        ],
      },
      {
        kind: "hueco",
        rotulo: "MP-POR-04 · Fotografía · 16:9 · 1600×900 · JPG o WebP",
        descripcion:
          "Una sala de entrevista o una mesa de selección de aerolínea, sobria, con un piloto de uniforme respondiendo. Sin caras reconocibles ni marcas de aerolínea. Es la imagen que le pone escenario al simulador: recuerda que esto se responde hablando, no marcando una opción.",
        alto: 300,
      },
      { kind: "sub", text: "Simulador: respóndelas en voz alta" },
      {
        kind: "p",
        text: "Antes del repaso, seis preguntas como te las van a hacer: sin opciones y esperando que hables treinta segundos. Léelas, respóndelas **en voz alta** y solo después abre la respuesta esperada. Si te saltas la parte de hablar, esto no sirve de nada.",
      },
      { kind: "sub", text: "Veinte respuestas que debes tener listas" },
      {
        kind: "p",
        text: "El repaso de última hora antes de una entrevista. Veinte respuestas cortas, para que la respuesta no sea «creo que» sino «el reglamento dice que».",
      },
      {
        kind: "kv",
        items: [
          { k: "1 · Definición", v: "Objeto o sustancia que pueda constituir un riesgo para la salud, la seguridad, los bienes o el medio ambiente y que figure en la lista de las Instrucciones Técnicas o esté clasificado conforme a ellas." },
          { k: "2 · Marco", v: "Anexo 18 → Doc 9284 (Instrucciones Técnicas) → LAR 175 del SRVSOP → el reglamento de tu país. En Colombia, el RAC 175." },
          { k: "3 · Alcance", v: "Cualquier aeronave civil con origen, destino, tránsito o sobrevuelo en el territorio nacional: vuelos internos e internacionales por igual, matrícula y operador nacionales o extranjeros." },
          { k: "4 · Nueve clases", v: "Una sola clase por mercancía, según el peligro o el más importante de los peligros que represente." },
          { k: "5 · Grupos de embalaje", v: "I gran peligro, II intermedio, III escaso. No aplican a las clases 1, 2 y 7, ni a 5.2 y 6.2." },
          { k: "6 · Dos tipos de etiqueta", v: "De riesgo, para la mayoría de las mercancías de todas las clases; de manipulación, para algunas." },
          { k: "7 · Etiqueta ilegible", v: "Se repone conforme al documento de transporte; sin certeza de cuál corresponde, no se transporta." },
          { k: "8 · Cuatro niveles", v: "Prohibido siempre; prohibido salvo dispensa; permitido con aprobación cuando las Instrucciones lo prevén; permitido cumpliendo las Instrucciones." },
          { k: "9 · Aviación civil privada", v: "En Colombia, prohibido todo tipo de mercancías peligrosas." },
          { k: "10 · Monomotores", v: "Es un añadido nacional, no del Anexo: en Colombia, clase 3 combustibles prohibida salvo las excepciones para pasajeros y tripulantes, y las demás clases solo con aprobación de la autoridad. Mira qué añade el tuyo." },
          { k: "11 · Pasajeros y tripulantes", v: "Prohibido en equipaje facturado, de mano o consigo, salvo las excepciones que las Instrucciones Técnicas prevén para pasajeros y tripulantes, y cumpliendo todos sus requisitos." },
          { k: "12 · Cantidades exceptuadas", v: "No van como equipaje ni como correo. E0 en la lista de las Instrucciones significa que no admiten ese régimen." },
          { k: "13 · Aceptación", v: "No se acepta sin documento de transporte diligenciado y sin haber inspeccionado el bulto. Con lista de verificación." },
          { k: "14 · Estiba", v: "Nunca en cabina ocupada por pasajeros ni en el puesto de pilotaje. Los CAO no van en aeronave de pasajeros y en carguero deben ser accesibles en vuelo." },
          { k: "15 · Segregación", v: "Los incompatibles no se estiban juntos ni donde puedan entrar en contacto si hay pérdidas. Las Instrucciones Técnicas traen una tabla de segregación general y otra para explosivos." },
          { k: "16 · Radiactivo", v: "Separado de personas, animales vivos y películas no reveladas. Aeronave contaminada, fuera de servicio de inmediato. Y encima del permiso aeronáutico, el del organismo nuclear del país: Servicio Geológico en Colombia, CNEN en Brasil." },
          { k: "17 · Información al piloto al mando", v: "Por escrito, lo antes posible antes de la salida, firmada antes del transporte, al alcance en vuelo, a disposición de los aeródromos de salida y llegada, copia en tierra, y en inglés en transporte internacional." },
          { k: "18 · Emergencia en vuelo", v: "Información de respuesta disponible de inmediato (la guía de la OACI), tripulación al corriente, equipo a bordo, e informar al ATS tan pronto la situación lo permita." },
          { k: "19 · Equipo mínimo de respuesta", v: "Bolsas grandes de polietileno de buena calidad, ligaduras para las bolsas y guantes largos de goma." },
          { k: "20 · Instrucción de la tripulación de vuelo", v: "Como mínimo cada 24 meses; en Colombia, además, como curso dentro de los entrenamientos periódicos con frecuencia no mayor a dos años; la intensidad en horas, según la tabla nacional (verificar)." },
        ],
      },
      {
        kind: "cta",
        texto: "Con las catorce lecciones leídas, lo que sigue es usarlas: reconocer etiquetas, clasificar envíos, resolver escenarios y ensayar las preguntas de una entrevista.",
        destino: MP_PRACTICA,
        rotulo: "Ir a la práctica",
      },
    ],
  },
]
