/**
 * Lección 12 · Reportes de sucesos de mercancías peligrosas.
 *
 * Fuentes: RAC 175 (175.001, 175.028, 175.625, 175.630–632),
 * Instrucciones Técnicas OACI vigentes y formulario IRIS de Aerocivil:
 * https://iris.aerocivil.gov.co/Iris/MercanciasPeligrosas
 * El ejemplo fotográfico es una recreación, no un envío real.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const LECCION_12: DocScreen = {
  n: 12,
  title: "Notificar un suceso",
  kicker: "Hallazgos, obligaciones y SMS",
  minutes: 8,
  blocks: [
    {
      kind: "p",
      text: "Un vuelo puede terminar sin daño y, aun así, dejar un hallazgo importante: carga no declarada, un embalaje averiado o información incorrecta al piloto. No se espera a que haya un accidente para comunicarlo. Primero se registran los hechos por el canal del explotador; después, el responsable los clasifica y realiza las notificaciones que correspondan.",
    },
    {
      // Fotografía completa: se evita la conversión 16:9 que cortaba los rótulos.
      kind: "figura",
      src: "/modulos/mercancias/img-25-hallazgo-documentado.webp",
      alt: "Bulto con humedad visible en una terminal de carga. Una persona registra los hechos por escrito y otra documenta el embalaje con una tableta; los rótulos señalan la avería y el registro.",
      ancho: 1200,
      alto: 800,
      pie: "Observa la humedad, documenta el estado del bulto y contrasta el contenido con la declaración. Con esos hechos, el responsable determina qué ocurrió y cómo debe notificarse.",
    },
    {
      kind: "p",
      text: "El reporte útil distingue lo observado de lo supuesto: dónde y cuándo apareció el bulto, cómo estaba el embalaje, qué decía la documentación y qué se comprobó. En Colombia, el formulario IRIS de mercancías peligrosas recoge datos del vuelo, lugar, fecha, mercancía cuando se conoce y una breve narración. No se inventa un número ONU para completar un campo; si se desconoce, se declara como desconocido y se sigue el procedimiento del operador.",
    },
    { kind: "sub", text: "No todo hallazgo tiene la misma gravedad" },
    {
      kind: "p",
      text: "El RAC 175 distingue accidente, incidente e incumplimiento atribuibles a mercancías peligrosas. Un accidente implica lesión mortal o grave, o daño de consideración a bienes o ambiente. Un incidente puede incluir fuga, incendio, daño o una situación que pudo poner en peligro al avión o a sus ocupantes, incluso sin daño consumado. Un incumplimiento vulnera un requisito sin convertirse en incidente ni accidente.",
    },
    {
      // Segunda fotografía nueva: distinta de la escena anterior.
      kind: "figura",
      src: "/modulos/mercancias/img-29-hallazgo-evidencia.webp",
      alt: "Caja con una esquina golpeada. Una persona registra los hechos con cámara y ficha; flechas señalan la avería y el registro fotográfico.",
      ancho: 1536,
      alto: 1024,
      pie: "Otro hallazgo: una esquina golpeada. Primero se registran los hechos; descubrir mercancías no declaradas o mal declaradas requiere notificación por los canales aplicables, pero la clasificación depende de la evidencia.",
    },
    {
      kind: "p",
      text: "Una mercancía oculta se reporta por el hallazgo, aunque no haya fuga. Si además dañó un embalaje o puso en peligro la aeronave, puede haber un incidente; si causó lesiones graves o daño considerable, puede ser un accidente. El hallazgo no se fuerza en un supuesto cuarto grado: se documenta el hecho y se usa la clasificación que corresponda.",
    },
    { kind: "sub", text: "Quién notifica y a qué Estado" },
    {
      kind: "p",
      text: "La obligación formal recae en el explotador. La tripulación comunica internamente el suceso por el canal previsto y conserva los datos útiles; no tiene que improvisar destinatarios internacionales desde la cabina. El Estado del explotador, el Estado donde ocurrió el hecho y el Estado de origen del envío no son sinónimos. El destinatario depende del tipo de suceso.",
    },
    {
      kind: "fichas",
      columnas: 1,
      items: [
        {
          titulo: "Accidente o incidente",
          puntos: ["El explotador notifica a las autoridades del Estado del explotador y del Estado donde ocurrió."],
        },
        {
          titulo: "No declarada en carga o correo",
          puntos: ["El explotador notifica al Estado del explotador y al Estado donde se descubrió. Incluye la mercancía mal declarada."],
        },
        {
          titulo: "No permitida en equipaje",
          puntos: ["Si se encuentra en el equipaje o en la persona de pasajeros o tripulantes, se notifica a la autoridad del Estado donde ocurrió."],
        },
        {
          titulo: "Estiba o NOTOC tras transporte",
          puntos: ["Si se descubre que se transportó carga mal estibada, segregada, separada o afianzada, o sin información al piloto, se notifica al Estado del explotador y al Estado de origen."],
        },
      ],
    },
    {
      kind: "p",
      text: "Las entidades que no son explotadores —por ejemplo, aduanas o servicios de inspección— también pueden descubrir mercancías ocultas. El RAC 175 indica que deberían cumplir las exigencias de notificación pertinentes; no las confunde con la obligación específica del explotador. Los plazos, canales y detalles se verifican en la norma del Estado y en el manual aplicable, no se adivinan a partir de una tabla de estudio.",
    },
    { kind: "sub", text: "Por qué el dato entra en el SMS" },
    {
      kind: "p",
      text: "El sistema de gestión de seguridad operacional (SMS) usa los reportes para detectar patrones y corregir barreras débiles. Si varios envíos llegan mal declarados, el análisis puede revisar el proceso de recepción, la instrucción o la comunicación con expedidores. Una narración precisa permite aprender; frases como «no pasó nada» borran el riesgo que se quiere prevenir.",
    },
    {
      kind: "enLaOperacion",
      momento: "Al cierre de un turno de carga",
      texto: "Aparece un bulto con la esquina húmeda, como en la fotografía. El equipo registra el estado, conserva la documentación y comunica el hallazgo según el procedimiento. No presupone que es una mercancía peligrosa ni lo llama «accidente» solo por la mancha. Si se confirma contenido peligroso, daño o incumplimiento, el responsable ajusta la clasificación y notifica a quienes corresponda.",
    },
    {
      kind: "detalleTecnico",
      etiqueta: "Consultar RAC 175 e IRIS",
      bloques: [
        {
          kind: "norma",
          texto: "RAC 175.625 diferencia destinatarios: accidentes e incidentes y hallazgos de carga o correo no declarados, Estado del explotador y Estado donde ocurrió; hallazgos no permitidos en equipaje o en la persona, Estado donde ocurrió; carga transportada con fallos de estiba o sin información al piloto, Estado del explotador y Estado de origen.",
        },
        {
          kind: "p",
          text: "RAC 175.001 define accidente, incidente e incumplimiento atribuibles a mercancías peligrosas. RAC 175.028 integra su manejo en el SMS y promueve el procesamiento de datos. RAC 175.630–632 contempla investigar hallazgos no declarados y recopilar eventos que no constituyen accidente ni incidente.",
        },
        {
          kind: "p",
          text: "Aerocivil dispone el formulario IRIS «Notificación de sucesos — Discrepancias, Incidentes y Accidentes — con Mercancías Peligrosas» para pasajeros, carga aérea, COMAT y correo. El formulario no sustituye la coordinación ni el procedimiento interno del explotador. Un reporte de estudio no establece por sí mismo el plazo aplicable a todos los Estados.",
        },
      ],
    },
  ],
}
