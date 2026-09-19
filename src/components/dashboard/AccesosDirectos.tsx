import type { ComponentType } from "react"
import { Link } from "react-router-dom"
import { ArrowUpRight, Brain, Calendar, ClipboardCheck, Clock, Plane, Radar } from "lucide-react"
import { PSICO_HUB } from "@/lib/psicotecnicas"

/**
 * Una herramienta a un toque: icono, nombre y la frase de lo que hace. Es la
 * misma fila en el panel y en las portadas de curso, para que un enlace se
 * reconozca igual en cualquier pantalla.
 */
export function FilaDeAcceso({
  to,
  titulo,
  detalle,
  icon: Icon,
}: {
  to: string
  titulo: string
  detalle: string
  icon: ComponentType<{ className?: string }>
}) {
  return (
    <Link
      to={to}
      className="group flex h-full items-center gap-3.5 rounded-2xl surface surface-lift px-4 py-3.5"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
        <Icon className="h-[18px] w-[18px]" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold tracking-[-0.01em] text-foreground">
          {titulo}
        </span>
        <span className="mt-0.5 line-clamp-2 block text-[12.5px] leading-snug text-muted-foreground">
          {detalle}
        </span>
      </span>
      <ArrowUpRight
        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </Link>
  )
}

/**
 * Las herramientas a un toque.
 *
 * Aquí había «3 acciones cortas, además del quiz»: tres filas genéricas
 * (pregúntale a Wingman, inglés ICAO, revisa tu match) iguales para todo el
 * mundo y todos los días. Un piloto no vuelve al panel a que le sugieran; vuelve
 * a ir a algún sitio. Estas son las seis que no tienen tarjeta propia más arriba.
 *
 * Los iconos son los de la barra lateral, o los de la portada de Ingreso a
 * aerolínea donde la barra no los tiene: una herramienta se reconoce igual en
 * los dos sitios. Las frases salen de la propia pantalla a la que llevan, para
 * no prometer lo que no hace.
 *
 * Entrevistas va al simulacro de la portada del módulo y no a /app/entrevistas,
 * que la barra lateral todavía marca «Próximamente».
 */
const ACCESOS = [
  {
    to: "/app/aerolinea/simulacro",
    titulo: "Simulacro de entrevista",
    detalle: "Preguntas de todos los temas, como en la prueba",
    icon: ClipboardCheck,
  },
  {
    to: PSICO_HUB,
    titulo: "Psicotécnicas",
    detalle: "Razonamiento abstracto, espacial y numérico, con reloj",
    icon: Brain,
  },
  {
    to: "/app/match",
    titulo: "Para cuál calificas",
    detalle: "Tus horas, licencias e inglés frente a cada aerolínea",
    icon: Plane,
  },
  {
    to: "/app/logbook",
    titulo: "Logbook",
    detalle: "Registra cada vuelo apenas aterrices",
    icon: Clock,
  },
  {
    to: "/app/vencimientos",
    titulo: "Vencimientos",
    detalle: "Licencias y certificado médico, con aviso",
    icon: Calendar,
  },
  {
    to: "/app/examenes",
    titulo: "Qué cayó en el examen",
    detalle: "Lo que cuentan quienes ya lo presentaron",
    icon: Radar,
  },
] as const

export function AccesosDirectos() {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 @xl:grid-cols-2 @4xl:grid-cols-3">
      {ACCESOS.map((a) => (
        <li key={a.to} className="min-w-0">
          <FilaDeAcceso {...a} />
        </li>
      ))}
    </ul>
  )
}
