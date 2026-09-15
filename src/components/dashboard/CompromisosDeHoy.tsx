import { Link } from "react-router-dom"
import { CalendarCheck, CalendarClock, Mail } from "lucide-react"
import { DIAS_DE_LA_SEMANA, hoyTocaEstudiar, type PlanDeEstudio } from "@/services/planDeEstudio"
import type { PostulacionAbierta } from "@/services/panel"

/**
 * Lo que el piloto se comprometió a hacer, en la pantalla donde entra.
 *
 * El panel sabía cuántas horas lleva y para cuál califica, pero no sabía nada
 * de lo que él mismo se puso: ni qué días dijo que iba a estudiar, ni que lleva
 * tres semanas esperando respuesta de una aerolínea. Eso vive en el perfil y en
 * el match, o sea en pantallas a las que hay que acordarse de ir.
 *
 * Es una tira y no tarjetas: son recordatorios de algo que ya decidió, no
 * cosas nuevas que ofrecerle. Y no aparece si no hay nada que recordar.
 */
export function CompromisosDeHoy({
  plan,
  estudioHoy,
  postulaciones,
}: {
  plan: PlanDeEstudio | null
  /** Si ya marcó actividad hoy. Decide entre «hoy toca» y «hecho». */
  estudioHoy: boolean
  postulaciones: PostulacionAbierta[]
}) {
  const esperando = postulaciones[0]
  if (!plan && !esperando) return null

  return (
    <div className="rounded-xl border border-border px-4 py-3 mb-6 flex flex-wrap items-center gap-x-7 gap-y-2.5"
      style={{ background: "var(--card)" }}>
      {plan && <Estudio plan={plan} hecho={estudioHoy} />}
      {esperando && (
        <Compromiso
          icono={Mail}
          to="/app/match"
          texto={
            <>
              {esperando.aerolinea}
              <span className="text-muted-foreground">
                {" · "}
                {esperando.estado === "en_proceso" ? "en proceso" : "postulada"} hace {esperando.dias}{" "}
                {esperando.dias === 1 ? "día" : "días"}
              </span>
              {postulaciones.length > 1 && (
                <span className="text-muted-foreground"> · y {postulaciones.length - 1} más</span>
              )}
            </>
          }
        />
      )}
    </div>
  )
}

/** «Hoy toca», «hecho», o cuándo es el próximo día que él eligió. */
function Estudio({ plan, hecho }: { plan: PlanDeEstudio; hecho: boolean }) {
  const toca = hoyTocaEstudiar(plan)

  if (toca && !hecho) {
    return (
      <Compromiso
        icono={CalendarClock}
        to="/app/pca"
        texto={
          <>
            Hoy toca
            <span className="text-muted-foreground"> · te pusiste {plan.minutosMeta} minutos</span>
          </>
        }
      />
    )
  }

  if (toca && hecho) {
    return (
      <Compromiso
        icono={CalendarCheck}
        to="/app/perfil"
        texto={
          <>
            Hoy ya estudiaste
            <span className="text-muted-foreground"> · cumpliste tu plan</span>
          </>
        }
      />
    )
  }

  return (
    <Compromiso
      icono={CalendarClock}
      to="/app/perfil"
      texto={
        <>
          Hoy no toca
          <span className="text-muted-foreground"> · el próximo, {proximoDia(plan)}</span>
        </>
      }
    />
  )
}

function Compromiso({
  icono: Ic,
  to,
  texto,
}: {
  icono: typeof CalendarClock
  to: string
  texto: React.ReactNode
}) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-[13px] font-semibold text-foreground hover:opacity-80 transition-opacity"
    >
      <Ic className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
      <span>{texto}</span>
    </Link>
  )
}

/**
 * El próximo día del plan, dicho por su nombre. Se cuenta desde mañana y se da
 * la vuelta a la semana: con un plan de solo lunes, un martes contesta «lunes».
 */
function proximoDia(plan: PlanDeEstudio, ahora = new Date()): string {
  const hoy = new Date(ahora.toLocaleString("en-US", { timeZone: plan.zona })).getDay()
  for (let salto = 1; salto <= 7; salto++) {
    const dia = (hoy + salto) % 7
    if (plan.dias.includes(dia)) {
      const nombre = DIAS_DE_LA_SEMANA.find((d) => d.valor === dia)?.largo ?? ""
      return salto === 1 ? `mañana (${nombre})` : `el ${nombre}`
    }
  }
  return "—"
}
