import { Image } from "lucide-react"
import { IcaoComingSoon } from "./IcaoComingSoon"

/** TEA — Part 3a: Picture Description. */
export function IcaoPictureDescription() {
  return (
    <IcaoComingSoon
      color="green"
      badge="TEA · PART 3"
      icon={Image}
      title="Picture Description"
      intro="Te muestran una o dos fotos (normalmente de un entorno aeronáutico o una situación operacional) y tenés que describirlas en detalle durante un tiempo determinado, y luego compararlas. Evalúa tu vocabulario descriptivo, el uso de preposiciones de lugar, y tu capacidad de hablar de corrido sin quedarte en silencio."
      whatItIs={[
        "Descripción detallada de una imagen durante ~30 segundos sin parar.",
        "Vocabulario de posición: in the foreground/background, on the left, next to…",
        "Comparación entre dos imágenes (similitudes y diferencias).",
        "Especulación: qué podría estar pasando, qué pasó antes/después.",
        "Fluidez sostenida — el silencio prolongado penaliza.",
      ]}
      howToPrepare={[
        "Agarrá cualquier foto de un aeropuerto y describila en voz alta 30s sin parar.",
        "Repasá vocabulario de posición y de partes del avión/aeródromo en el glosario.",
        "Practicá especular con 'might/could/may be': 'The crew might be dealing with…'.",
        "Cronometrate: que no haya huecos de silencio largos mientras pensás.",
      ]}
    />
  )
}
