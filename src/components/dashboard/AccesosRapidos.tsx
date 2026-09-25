import { Brain, ClipboardCheck, Clock, FileText, Home } from "lucide-react"
import { FilaDeAcceso } from "@/components/dashboard/AccesosDirectos"
import { PSICO_HUB } from "@/lib/psicotecnicas"

/**
 * Los cuatro accesos de la portada. Las frases salen de la pantalla a la que
 * llevan; el resto de herramientas está en la barra lateral.
 */
const ACCESOS = [
  { to: "/app/logbook", titulo: "Registrar vuelo", detalle: "Actualiza tu logbook", icon: Clock },
  { to: "/app/aerolinea/simulacro", titulo: "Simulacro de entrevista", detalle: "Preguntas de todos los temas, como en la prueba", icon: ClipboardCheck },
  { to: PSICO_HUB, titulo: "Psicotécnicas", detalle: "Razonamiento y lógica, con reloj", icon: Brain },
  { to: "/app/examenes", titulo: "Qué cayó en el examen", detalle: "Lo que cuentan quienes ya lo presentaron", icon: FileText },
] as const

export function AccesosRapidos() {
  return (
    <section className="rounded-2xl surface p-5" aria-labelledby="panel-accesos">
      <div className="flex items-center gap-3">
        <Home className="h-5 w-5 text-foreground" aria-hidden />
        <h2 id="panel-accesos" className="m-0 text-[15px] font-semibold tracking-[-0.01em] text-foreground">
          Accesos rápidos
        </h2>
      </div>
      <ul className="m-0 mt-4 grid list-none grid-cols-1 gap-3 p-0 @xl:grid-cols-2 @5xl:grid-cols-4">
        {ACCESOS.map((a) => (
          <li key={a.to} className="min-w-0">
            <FilaDeAcceso {...a} />
          </li>
        ))}
      </ul>
    </section>
  )
}
