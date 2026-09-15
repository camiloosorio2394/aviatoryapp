/** Lección 13 · Lectura crítica de casos y barreras de seguridad. */
import type { DocScreen } from "@/lib/docBlocks"

export const LECCION_13: DocScreen = {
  n: 13,
  title: "Lo que la industria aprendió",
  kicker: "Casos, hechos y barreras de seguridad",
  minutes: 8,
  blocks: [
    { kind: "p", text: "Los informes de accidentes no son una colección de historias para memorizar. Sirven para separar tres cosas: lo que se observó, lo que no pudo establecerse y qué barrera operacional debe estar preparada antes del próximo vuelo. En esta lección los casos se comparan sin convertir una hipótesis en una regla." },
    {
      kind: "figura",
      src: "/modulos/mercancias/img-30-revision-casos.webp",
      alt: "Fotografía didáctica nueva de un equipo de seguridad de carga que revisa documentos y fotografías en un hangar; no representa ninguno de los cuatro accidentes.",
      ancho: 1536,
      alto: 1024,
      pie: "La fotografía muestra una revisión de seguridad, no escenas de los accidentes. Para cada caso, distingue lo probado, lo que la investigación no pudo determinar y la barrera operacional que conviene reforzar.",
    },
    {
      kind: "fichas",
      // Una sola columna mantiene legibles las tres capas (hecho, incertidumbre y barrera)
      // en móvil y evita tarjetas comprimidas cuando el lector ocupa media pantalla.
      columnas: 1,
      items: [
        { titulo: "South African 295 · 1987", puntos: ["Hecho: el fuego se desarrolló en la cubierta principal de un avión de transporte con pasajeros y carga.", "Incertidumbre: la causa de ignición no pudo establecerse de forma concluyente.", "Barrera: conocer la posición de la carga y la respuesta disponible importa cuando el acceso durante el vuelo es limitado."] },
        { titulo: "ValuJet 592 · 1996", puntos: ["Hecho: generadores químicos de oxígeno fueron transportados con una descripción y preparación inadecuadas.", "Incertidumbre: la cadena exacta de ignición se reconstruyó con la investigación, no con una suposición de cabina.", "Barrera: declarar, preparar, aceptar y cargar son controles distintos; ninguno reemplaza a los demás."] },
        { titulo: "UPS 6 · 2010", puntos: ["Hecho: un incendio de carga se propagó rápidamente y la tripulación perdió capacidad de control.", "Incertidumbre: el informe analiza múltiples fuentes de energía y propagación; no se reduce a una frase sobre «autoignición».", "Barrera: información de emergencia, procedimientos, equipo y entrenamiento deben existir antes del vuelo."] },
        { titulo: "Asiana 991 · 2011", puntos: ["Hecho: la ARAIB ubicó el fuego en o cerca de paletas con mercancías peligrosas.", "Incertidumbre: no se encontró evidencia física que determinara qué lo inició.", "Barrera: la composición y posición de la carga ayudan a informar la respuesta, pero no permiten adivinar la causa."] },
      ],
    },
    { kind: "sub", text: "El patrón que sí es útil para un piloto" },
    { kind: "p", text: "Una investigación puede no resolver el primer instante del fuego y aun así mostrar barreras que sí se pueden controlar: descripción fiel, embalaje y marcado correctos, aceptación con procedimiento, segregación, ubicación conocida, información al piloto y guía de respuesta disponible. El piloto no reconstruye el accidente en vuelo; usa esas barreras para reconocer qué información falta y qué procedimiento corresponde." },
    { kind: "callout", tone: "info", title: "Describe la configuración, no solo el nombre", text: "En el caso histórico de South African 295 viajaban pasajeros y carga. Para razonar sobre un riesgo en vuelo, precisa qué carga hay, en qué compartimento está, si la tripulación puede acceder a él y qué información tiene disponible." },
    { kind: "enLaOperacion", momento: "En una entrevista o briefing", texto: "Explica primero el hecho comprobado, después la incertidumbre y al final la barrera. Por ejemplo: «El informe ubicó el fuego en o cerca de paletas con mercancías peligrosas; no estableció la ignición; por eso son esenciales la identificación, la posición, la información al piloto y el procedimiento de emergencia»." },
    { kind: "detalleTecnico", etiqueta: "Cómo leer una conclusión de investigación", bloques: [
      { kind: "p", text: "Una causa publicada por la autoridad investigadora no es una autorización para atribuir el evento a un solo producto. «Causa», «factores contribuyentes» y «recomendaciones» cumplen funciones distintas. La lección operacional debe conservar esa diferencia." },
      { kind: "norma", texto: "La gestión de mercancías peligrosas en RAC 175 se integra con el SMS. Los reportes, hallazgos y eventos que no llegan a accidente aportan datos para prevenir recurrencias; no son una lista de culpables ni un sustituto de la investigación formal." },
    ] },
  ],
}
