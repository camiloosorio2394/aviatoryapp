/**
 * Nivel 3 · Situaciones del piloto: de la aceptación a la bodega, el NOTOC,
 * la emergencia en vuelo y la notificación.
 *
 * La lección 9 se revisó con el caso oficial de la FAA sobre SAA 295 y con
 * las reglas ICAO de estiba y segregación. Las lecciones 10–12 se auditan por
 * separado antes de reescribirlas. Los campos del NOTOC requieren contraste
 * con las Instrucciones Técnicas vigentes y el formato del operador.
 */

import type { DocScreen } from "@/lib/docBlocks"
import { LECCION_10 } from "./leccion10"
import { LECCION_11 } from "./leccion11"
import { LECCION_12 } from "./leccion12"

export const NIVEL_3: DocScreen[] = [
  // ── 09 ──────────────────────────────────────────────────────────────────
  {
    n: 9,
    title: "De la aceptación a la bodega",
    kicker: "De la carga física a la información de vuelo",
    minutes: 9,
    blocks: [
      {
        kind: "casoReal",
        titulo: "South African Airways 295",
        fecha: "28 de noviembre de 1987",
        lugar: "Océano Índico, cerca de Mauricio",
        aeronave: "Boeing 747-200 · vuelo de Taipéi a Mauricio",
        mercancia:
          "En la cubierta principal había seis palés con artículos eléctricos (incluidos computadores), ferretería, papel, textiles y otros productos. Los pasajeros viajaban en otro sector de esa cubierta. No se determinó qué inició el incendio ni se identificó una mercancía peligrosa como su causa.",
        queOcurrio: [
          "Durante el vuelo se desarrolló un incendio en la zona de carga. El humo llegó a la zona de pasajeros y la tripulación lo comunicó al control de tránsito aéreo.",
          "La tripulación preparaba un aterrizaje de emergencia en Mauricio. El avión cayó al mar y murieron las 159 personas a bordo.",
        ],
        consecuencia:
          "La investigación señaló limitaciones de detección, contención del humo y lucha manual contra un incendio en un compartimento de carga tan grande. Las medidas posteriores se centraron en la protección contra incendios de esa configuración; no hay base para atribuirle el origen de todas las reglas actuales de estiba de mercancías peligrosas.",
        leccion:
          "La ubicación de la carga y las características de su compartimento importan durante el vuelo. El caso ayuda a comprender ese vínculo, no a deducir que el incendio se debió a una mercancía peligrosa identificada.",
      },
      {
        kind: "p",
        text: "Un bulto no se convierte en una línea del NOTOC por arte de magia. Antes de despegar, personal formado identifica el envío, lo acepta cuando corresponde, lo carga y registra dónde quedó. El piloto no repite esos controles: necesita entender la información operacional que resulta de ellos.",
      },
      {
        // MP-IMG-21 · Fotografía explicativa · 3:2 · 1200×800.
        kind: "figura",
        src: "/modulos/mercancias/img-21-carga-ubicacion.webp",
        alt: "Fotografía explicativa de una operación de carga comercial: cajas sobre una plataforma, un ULD sujeto y la entrada a la bodega. Tres flechas señalan los bultos cargados, el ULD y la posición de carga.",
        ancho: 1200,
        alto: 800,
        pie: "Identifica la caja, la unidad de carga y su posición como tres datos distintos. El NOTOC los relaciona con la mercancía y el riesgo informados al piloto.",
      },
      { kind: "sub", text: "Quién comprueba el envío y qué llega al piloto" },
      {
        kind: "p",
        text: "El expedidor identifica la mercancía y prepara el bulto y su documentación según el régimen aplicable. El personal de aceptación comprueba el envío con los procedimientos del operador; después, el equipo de carga revisa su estado, lo protege frente a daños y movimiento y deja constancia de su ubicación. Los documentos y comprobaciones no son tareas del piloto.",
      },
      {
        kind: "p",
        text: "Lo importante para la tripulación es que los datos no queden separados de la realidad física. Si se informa que dos bultos van en una unidad de carga, debe existir una ubicación que permita reconocer dónde quedaron. Esa relación entre mercancía, riesgo y posición es la que leerás en la siguiente lección.",
      },
      {
        // MP-IMG-26 · Fotografía explicada · 16:9 · 1600×900.
        kind: "figura",
        src: "/modulos/mercancias/foto-09-cadena-del-bulto.webp",
        alt: "Fotografía realista de una operación de carga junto a una aeronave. Flechas señalan la unidad de carga ULD, los bultos y la posición de carga; el texto de la imagen recuerda que el piloto interpreta el resultado operacional.",
        ancho: 1600,
        alto: 900,
        pie: "Del bulto al piloto: la clasificación, el embalaje y la aceptación se verifican en sus procedimientos; el NOTOC lleva a cabina la identidad, el riesgo y la ubicación final.",
      },
      { kind: "sub", text: "Estibar no es solo acomodar" },
      {
        kind: "p",
        text: "La carga se sujeta para que no cambie de posición ni dañe otros bultos durante el vuelo. También se respetan las condiciones de estiba que correspondan a cada mercancía y a la aeronave. Una unidad de carga (ULD) reúne bultos, pero no reemplaza la identificación de la mercancía ni la información de dónde quedó cargada.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "La etiqueta «Exclusivamente en aeronaves de carga»",
        text: "Ese bulto no puede ir como carga en un avión de pasajeros. En una aeronave de carga, su posición debe cumplir las condiciones aplicables; la etiqueta no garantiza que sea accesible desde la cabina. Si ves una discrepancia, aclárala antes de salir.",
      },
      { kind: "sub", text: "Segregación: evitar que una fuga conecte dos riesgos" },
      {
        kind: "p",
        text: "Segregar significa mantener separados los bultos que podrían reaccionar peligrosamente si sus contenidos entraran en contacto. La pregunta no es si dos clases pueden viajar en el mismo avión, sino si su ubicación permitiría esa interacción en caso de una pérdida. El personal de carga aplica las reglas de compatibilidad y separación del envío concreto; el piloto necesita entender por qué su ubicación importa.",
      },
      {
        // MP-IMG-27 · Fotografía explicada · 16:9 · 1600×900.
        kind: "figura",
        src: "/modulos/mercancias/foto-09-segregacion-real.webp",
        alt: "Fotografía realista de dos bultos de mercancías incompatibles en una terminal, con rótulos que señalan una sustancia corrosiva clase 8, un líquido inflamable clase 3 y la separación entre ambos.",
        ancho: 1600,
        alto: 900,
        pie: "La separación evita que una pérdida conecte dos riesgos. Para decidir qué bultos se segregan y a qué distancia, se aplica la tabla y el procedimiento correspondiente.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "La pregunta útil para la tripulación",
        text: "Si la ubicación informada no coincide con la carga, o aparece un bulto dañado, aclara la discrepancia con el personal responsable antes de salir. No recalcules la segregación en cabina. En vuelo, la mercancía y su posición ayudan a interpretar una anomalía junto con la información de emergencia aplicable.",
      },
      {
        kind: "enLaOperacion",
        momento: "Si se detecta una pérdida al descargar",
        texto:
          "Una pérdida no afecta únicamente al bulto averiado: también puede alcanzar otras cargas o la aeronave. El personal responsable inspecciona el área y gestiona la contaminación según la mercancía. Para el piloto, el dato operacional es qué se transportó y dónde estuvo, especialmente si la anomalía se descubre antes de otro vuelo.",
      },
      {
        kind: "detalleTecnico",
        etiqueta: "Consultar los requisitos de estiba y segregación",
        bloques: [
          {
            kind: "p",
            text: "La explicación visual anterior muestra el propósito de las reglas, no una tabla de compatibilidad ni una autorización de carga. La aplicación concreta depende de las Instrucciones Técnicas vigentes y de los procedimientos del explotador.",
          },
          {
            kind: "norma",
            texto: "Salvo en los casos permitidos en las Instrucciones Técnicas, las mercancías peligrosas no se estiban en una cabina ocupada por pasajeros ni en el puesto de pilotaje. Los bultos con la etiqueta «Exclusivamente en aeronaves de carga» no se estiban en una aeronave ocupada por pasajeros.",
          },
          {
            kind: "norma",
            texto: "Los bultos que puedan reaccionar peligrosamente entre sí no se estiban juntos ni en una posición que permita su contacto si se producen pérdidas. Las condiciones de estiba de bultos «Exclusivamente en aeronaves de carga» y los casos especiales se consultan en las Instrucciones Técnicas.",
          },
        ],
      },
    ],
  },

  // ── 10 ──────────────────────────────────────────────────────────────────
  LECCION_10,

  LECCION_11,

  LECCION_12,
]
