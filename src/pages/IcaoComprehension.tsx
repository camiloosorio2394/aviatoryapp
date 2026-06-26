import { Headphones } from "lucide-react"
import { IcaoComingSoon } from "./IcaoComingSoon"

/** TEA — Part 2: Interactive Comprehension. */
export function IcaoComprehension() {
  return (
    <IcaoComingSoon
      color="violet"
      badge="TEA · PART 2"
      icon={Headphones}
      title="Interactive Comprehension"
      intro="En esta parte escuchás grabaciones de pilotos y controladores en situaciones no rutinarias y de emergencia. Tenés que entender el mensaje y reaccionar: responder preguntas, relatar lo que pasó o transmitir la información. Es 100% comprensión auditiva bajo presión, con ruido de cabina y acentos variados — sin texto de apoyo."
      whatItIs={[
        "Comprensión de mensajes en audio (no leés, escuchás).",
        "Situaciones no rutinarias: fallas técnicas, weather, emergencias médicas, security.",
        "Capacidad de relatar/parafrasear lo que escuchaste con tus palabras.",
        "Reacción adecuada: qué harías, qué información falta, qué confirmarías.",
        "Resistencia a acentos no nativos y a audio con ruido.",
      ]}
      howToPrepare={[
        "Escuchá ATC en vivo (LiveATC) y tratá de relatar lo que pasó sin mirar transcripción.",
        "Repasá el glosario de emergencias, weather, medical y security del módulo.",
        "Practicá parafrasear: escuchá una frase y decila de nuevo con otras palabras.",
        "Acostumbrate a distintos acentos — buscá audios de pilotos de varias regiones.",
      ]}
    />
  )
}
