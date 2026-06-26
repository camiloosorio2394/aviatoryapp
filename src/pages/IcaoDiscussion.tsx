import { MessagesSquare } from "lucide-react"
import { IcaoComingSoon } from "./IcaoComingSoon"

/** TEA — Part 3b: Discussion. */
export function IcaoDiscussion() {
  return (
    <IcaoComingSoon
      color="amber"
      badge="TEA · PART 3"
      icon={MessagesSquare}
      title="Discussion"
      intro="A partir de las imágenes y de temas generales de aviación, el examinador abre una conversación más abierta: te pide opinión, te hace especular sobre causas y consecuencias, y te lleva a temas como seguridad, tecnología, futuro de la profesión o factores humanos. Evalúa tu capacidad de argumentar, dar opiniones fundamentadas y manejar temas abstractos en inglés."
      whatItIs={[
        "Conversación abierta sobre temas de aviación (no solo tu trabajo).",
        "Dar opiniones y justificarlas: 'In my opinion… because…'.",
        "Especular sobre causas, consecuencias y escenarios hipotéticos.",
        "Temas típicos: safety, automation, fatigue, training, future of aviation.",
        "Manejo de lenguaje abstracto y de seguir el hilo de un tema cambiante.",
      ]}
      howToPrepare={[
        "Practicá responder 'why' preguntas: no solo qué pensás, sino por qué.",
        "Armá opinión sobre 4–5 temas calientes de aviación (automation, fatigue, etc.).",
        "Usá conectores: 'on the other hand', 'as a result', 'that said', 'in addition'.",
        "Grabate hablando 1–2 min sobre un tema y revisá si argumentás o solo describís.",
      ]}
    />
  )
}
