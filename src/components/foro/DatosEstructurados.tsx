import { useEffect } from "react"
import { jsonEnScript } from "@/lib/foroSeo"

/**
 * Los datos estructurados de la página (schema.org), en un
 * <script type="application/ld+json"> del head. No se ejecuta, así que la CSP
 * no lo bloquea. El middleware ya los escribe en el HTML para quien no
 * ejecuta JavaScript; este los deja al día cuando se navega dentro de la app.
 */
export function DatosEstructurados({ datos }: { datos: unknown }) {
  const json = jsonEnScript(datos)
  useEffect(() => {
    // El que escribió el middleware se reemplaza: una página, un bloque.
    document.head.querySelectorAll('script[type="application/ld+json"][data-foro]').forEach((s) => s.remove())
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.dataset.foro = ""
    script.text = json
    document.head.appendChild(script)
    return () => script.remove()
  }, [json])
  return null
}
