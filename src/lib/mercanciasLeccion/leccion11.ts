/**
 * Lección 11 · Emergencia en vuelo con mercancías peligrosas.
 *
 * Hechos de OZ991 contrastados con el informe final ARAIB/AAR1105
 * (24 julio 2015), alojado por la OACI. El origen de la ignición no se
 * estableció; la ilustración del caso no es evidencia del accidente.
 * La respuesta operacional se basa en los procedimientos del explotador,
 * el QRH y la edición 2025–2026 de la guía OACI Doc 9481.
 */

import type { DocScreen } from "@/lib/docBlocks"

export const LECCION_11: DocScreen = {
  n: 11,
  title: "Emergencia en vuelo",
  kicker: "Controlar el avión e interpretar la carga",
  minutes: 9,
  blocks: [
    {
      kind: "p",
      text: "Una alerta de humo o fuego exige actuar según los procedimientos de la aeronave y del explotador. Si hay mercancías peligrosas a bordo, el NOTOC agrega algo que una alarma no suele mostrar: qué envíos se transportan, qué riesgos presentan y dónde están. Esa información ayuda a la tripulación y a los servicios que recibirán el avión; no reemplaza el QRH ni convierte al piloto en especialista en extinción de sustancias.",
    },
    {
      kind: "casoReal",
      titulo: "Asiana Cargo 991",
      fecha: "28 de julio de 2011",
      lugar: "Mar, unos 130 km al oeste del aeropuerto de Jeju",
      aeronave: "Boeing 747-400F · HL7604 · Incheon a Shanghái",
      mercancia: "En la cubierta principal había paletas que incluían líquidos inflamables, como pintura y fotorresistentes, líquido corrosivo y baterías de ion-litio. El informe identificó posiciones concretas de esas paletas; no atribuyó el inicio del fuego a un producto individual.",
      queOcurrio: [
        "La tripulación informó de fuego en la carga al control de Shanghái alrededor de las 03:54 y trató de desviarse a Jeju.",
        "La aeronave cayó al mar alrededor de las 04:11. Murieron sus dos pilotos. Parte del fuselaje se separó en vuelo durante la propagación del incendio.",
      ],
      consecuencia: "La ARAIB concluyó que el fuego se desarrolló en o cerca de paletas con mercancías peligrosas y creció hasta quedar fuera de control. No encontró evidencia física que permitiera determinar qué lo inició; los registradores no fueron recuperados.",
      leccion: "La ubicación y la composición de la carga importan para interpretar una emergencia. Pero una ubicación conocida no permite deducir la causa de ignición ni sustituye las acciones previstas para la aeronave.",
      fuente: "ARAIB/AAR1105, informe final (2015), secciones 3.2–3.3 · OACI",
      imagen: {
        src: "/modulos/mercancias/img-33-asiana-carga-y-cronologia.webp",
        alt: "Paletas sujetas en la cubierta principal de un carguero. La franja superior enumera pintura, fotorresistentes, líquido corrosivo y baterías de ion-litio; la inferior señala el aviso de fuego a las 03:54 y la caída al mar a las 04:11.",
      },
    },
    {
      kind: "p",
      text: "Fíjate en dos datos distintos: el informe ubicó el fuego en o cerca de paletas con mercancías peligrosas, pero no pudo identificar qué lo inició. La composición y la posición de la carga orientan la respuesta; no bastan para señalar una causa.",
    },
    {
      kind: "p",
      text: "El informe citó como factores contribuyentes la presencia de materiales inflamables en posiciones de la cubierta principal y la dificultad de contener un incendio grande en una bodega de clase E sin supresión activa. Es una conclusión sobre ese accidente, no una regla para diagnosticar cualquier alarma de bodega.",
    },
    { kind: "sub", text: "Dos escenarios que no se atienden igual" },
    {
      kind: "p",
      text: "En una bodega de carga, la tripulación puede tener una indicación de sistema, pero no acceso directo al bulto. En la cabina de pasajeros, un miembro de la tripulación puede observar un dispositivo caliente, humo o una fuga y comunicarlo al piloto. Son escenarios distintos: la actuación física de la tripulación de cabina no se traslada a una bodega inaccesible, y un NOTOC de carga no describe necesariamente los objetos personales de los pasajeros.",
    },
    { kind: "sub", text: "Qué aporta el NOTOC mientras se controla el vuelo" },
    {
      kind: "p",
      text: "La prioridad es gestionar la aeronave y seguir el QRH y el manual aplicables. Cuando la carga puede estar involucrada, el NOTOC permite leer identidad, clase o riesgos y ubicación de los envíos informados. Una indicación en la bodega delantera, por ejemplo, solo se relaciona con una línea del NOTOC si la posición registrada corresponde a esa zona. Si el dato es incompleto o la relación no es segura, no se inventa una causa.",
    },
    {
      kind: "enLaOperacion",
      momento: "Durante una indicación de humo en la bodega",
      texto: "Se ejecutan los procedimientos de humo o fuego y se gestiona el vuelo. Cuando la carga de trabajo lo permite, la tripulación consulta el NOTOC para identificar las mercancías informadas y su ubicación. Si debe comunicarlas, transmite datos comprobados; una alarma no autoriza a afirmar qué bulto inició el incendio.",
    },
    { kind: "sub", text: "Comunicar cuando la situación lo permita" },
    {
      kind: "p",
      text: "Si ocurre una emergencia en vuelo, el piloto informa a la dependencia ATS apropiada de las mercancías peligrosas a bordo tan pronto como la situación lo permita, para que la información llegue a la autoridad aeroportuaria. La OACI deja margen a la tripulación para no apartarse de las tareas críticas de control. Identidad, riesgos y posición tomados del NOTOC ayudan a preparar la respuesta en tierra; el aviso no prescribe por sí solo un agente extintor ni una maniobra de evacuación.",
    },
    {
      kind: "p",
      text: "Tras un accidente o incidente grave relacionado con la carga, el explotador también tiene obligaciones de entregar a los servicios de emergencia la información que se proporcionó al piloto, sin demora. El piloto y el explotador no son el mismo actor: el primero comunica desde el vuelo cuando puede; el segundo conserva y transmite información operacional a quienes responden en tierra.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Una idea útil para recordar",
      text: "Procedimiento para actuar; NOTOC para saber qué hay y dónde; ATS para llevar esa información a tierra cuando sea posible. Ninguno de los tres reemplaza a los otros.",
    },
    {
      kind: "detalleTecnico",
      etiqueta: "Consultar guía y responsabilidades",
      bloques: [
        {
          kind: "p",
          text: "La guía OACI Doc 9481, edición 2025–2026, ofrece factores generales y códigos de respuesta de emergencia para incidentes con mercancías peligrosas. El explotador desarrolla instrucciones y procedimientos para su flota y tripulaciones. Un código de guía no es una orden universal para aplicar una acción física en cualquier compartimento.",
        },
        {
          kind: "p",
          text: "En la cabina de pasajeros puede haber un incidente con un dispositivo electrónico o una sustancia que el pasajero lleva legítimamente o que introdujo sin conocer la restricción. La tripulación de cabina sigue su procedimiento de incidente, informa al piloto y coordina con él. No se equipara esta respuesta con el manejo de paletas de carga en una bodega.",
        },
        {
          kind: "norma",
          texto: "La OACI explica que el piloto debe conocer las mercancías peligrosas y su ubicación para informar al ATS en una emergencia si la situación lo permite. La información al ATS sirve para que las autoridades aeroportuarias y los servicios de emergencia preparen su respuesta. La aplicación concreta corresponde a las Instrucciones Técnicas vigentes y a los procedimientos del explotador.",
        },
      ],
    },
  ],
}
