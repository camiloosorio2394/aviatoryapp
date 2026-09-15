/** Lección 14 · Instrucción, repaso y respuestas de entrevista. */
import type { DocScreen } from "@/lib/docBlocks"
const MP_PRACTICA = "/app/aerolinea/mercancias/practica"

export const LECCION_14: DocScreen = {
  n: 14,
  title: "Lo que te exigen y cómo responder",
  kicker: "Instrucción, actualización y repaso",
  minutes: 10,
  blocks: [
    { kind: "p", text: "La instrucción de mercancías peligrosas depende de la función que desempeña cada persona. No existe una respuesta universal de horas para todos los países ni para todos los cargos: el programa aprobado por la autoridad y el explotador fija el contenido y la intensidad aplicables. Lo que sí debes poder explicar es qué estudias, cuándo se actualiza y dónde verificas la regla." },
    { kind: "figura", src: "/modulos/mercancias/img-16-expedidor.webp", alt: "Fotografía didáctica de preparación de un bulto de pintura con documentación. Se usa como recordatorio de que expedidor, aceptación y tripulación tienen responsabilidades distintas; los datos visibles son de estudio.", ancho: 1536, alto: 1024, pie: "La imagen pertenece a una explicación anterior y es una escena didáctica: no es un documento real de un envío ni sustituye el programa aprobado." },
    { kind: "norma", titulo: "Tres componentes de la instrucción", texto: "La instrucción combina familiarización general, formación específica según la función y seguridad operacional. La persona debe reconocer los peligros de las mercancías, manipularlas según su responsabilidad y saber qué procedimiento de emergencia le corresponde. Un piloto no necesita ejecutar la tarea del expedidor; sí necesita entender qué información debe recibir y cómo usarla." },
    { kind: "sub", text: "Periodicidad: la regla se verifica, no se adivina" },
    { kind: "p", text: "La OACI explica que la formación de quienes participan en consignación, manipulación y transporte tiene actualización recurrente, y el RAC 175 remite a las Instrucciones Técnicas y al programa aprobado. Para la tripulación de vuelo, la respuesta segura en Colombia es: curso de mercancías peligrosas dentro del programa de entrenamiento del operador, con una frecuencia no mayor a dos años. Las horas exactas por función deben confirmarse en la tabla nacional y en el programa vigente; no las presentes como una cifra universal." },
    { kind: "fichas", columnas: 1, items: [
      { titulo: "Antes de asumir la función", puntos: ["Familiarización general y contenido específico del puesto.", "Procedimientos de emergencia y límites de responsabilidad."] },
      { titulo: "Durante la operación", puntos: ["Aplicar el manual del explotador y usar información vigente.", "Escalar una discrepancia; no corregir clasificación por intuición."] },
      { titulo: "Actualización recurrente", puntos: ["Mantener la periodicidad que exigen el Estado y el programa aprobado.", "Conservar registros de instrucción disponibles para la autoridad."] },
      { titulo: "Si cambia la norma", puntos: ["Revisar la edición vigente de las Instrucciones Técnicas y la guía de respuesta.", "No citar una tabla antigua sin comprobar su vigencia."] },
    ] },
    { kind: "sub", text: "Respuestas breves para una entrevista" },
    { kind: "kv", items: [
      { k: "1 · Qué es mercancía peligrosa", v: "Artículo o sustancia capaz de representar un riesgo y que figura en las Instrucciones Técnicas o está clasificada conforme a ellas." },
      { k: "2 · Marco", v: "Anexo 18 y Doc 9284 de OACI; en Colombia, RAC 175 y el programa aprobado del operador." },
      { k: "3 · Quién clasifica", v: "La clasificación y preparación pertenecen a las responsabilidades previstas para expedidor y participantes; el piloto no las improvisa." },
      { k: "4 · Qué revisa el piloto", v: "Información escrita, coherencia del vuelo, mercancía, cantidad, riesgos y ubicación; pregunta ante una discrepancia." },
      { k: "5 · Grupo de embalaje", v: "I, II o III cuando la entrada de la mercancía lo asigna; no se inventa para sustancias que no lo usan." },
      { k: "6 · NOTOC", v: "Información escrita al piloto sobre mercancías peligrosas pertinentes y su ubicación, disponible para la operación." },
      { k: "7 · Emergencia", v: "Se vuela y se sigue el QRH; el NOTOC y la guía de respuesta identifican la carga; se informa al ATS cuando la situación lo permite." },
      { k: "8 · Carga no declarada", v: "Se detiene el proceso según procedimiento, se conserva evidencia y se notifica por el canal del explotador." },
      { k: "9 · Incidente", v: "Ocurrencia con daño, fuga, fuego, ruptura o peligro para la aeronave u ocupantes, aunque no sea accidente." },
      { k: "10 · Incumplimiento", v: "Vulneración atribuible al transporte que no alcanza la definición de incidente ni accidente." },
      { k: "11 · SMS", v: "Los datos de reportes y hallazgos permiten detectar patrones y fortalecer barreras de seguridad." },
      { k: "12 · Accesibilidad", v: "La ubicación y el compartimento se interpretan con la aeronave y el procedimiento del operador; no se generaliza con una palabra informal." },
      { k: "13 · Segregación", v: "Incompatibles se separan conforme a la tabla y a las Instrucciones Técnicas; no se decide por el color de una etiqueta." },
      { k: "14 · Baterías", v: "Se aplican requisitos específicos de entrada, embalaje, cantidad, estado de carga y aeronave; UN3480 no lleva grupo de embalaje automáticamente." },
      { k: "15 · Cantidades limitadas", v: "Siguen siendo mercancías declaradas y deben cumplir el régimen y marcado que corresponda." },
      { k: "16 · Cantidades exceptuadas", v: "Es un régimen específico con límites y marcado propio; no significa que el contenido deje de ser peligroso." },
      { k: "17 · Radiactivos", v: "Tienen controles de categoría, índice, separación y autorización conforme al régimen aplicable." },
      { k: "18 · Equipaje", v: "Pasajeros y tripulantes cumplen excepciones y prohibiciones de las Instrucciones Técnicas; se consulta la versión vigente." },
      { k: "19 · Reportar", v: "Se registran hechos verificables, destinatario y plazo según el Estado y el manual; no se adivinan." },
      { k: "20 · Fuente", v: "Para una duda operacional: manual del operador, Instrucciones Técnicas vigentes, guía de respuesta y autoridad competente." },
    ] },
    { kind: "callout", tone: "tip", title: "Una respuesta sólida", text: "Hecho comprobado → riesgo relevante → procedimiento aplicable → fuente vigente. Esa estructura demuestra criterio sin atribuirte funciones que no te corresponden." },
    { kind: "cta", texto: "Con las catorce lecciones leídas, practica ahora clasificación, lectura del NOTOC, emergencias y reportes.", destino: MP_PRACTICA, rotulo: "Ir a la práctica" },
  ],
}
