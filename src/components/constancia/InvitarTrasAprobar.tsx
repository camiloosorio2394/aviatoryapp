import { useState } from "react"
import { Link } from "react-router-dom"
import { X } from "lucide-react"
import { appButtonClass } from "@/lib/buttonStyles"

const CLAVE = "aviatory.invitacion.pospuesta"
/** Días que se calla después de que el piloto la cierra. */
const DIAS_DE_SILENCIO = 30

/**
 * La invitación a referir, justo después de aprobar.
 *
 * El momento importa más que el texto: pedirle a alguien que recomiende la app
 * mientras estudia es pedirle un favor; pedírselo cuando acaba de pasar una
 * evaluación es ofrecerle compartir algo que le acaba de salir bien. Por eso no
 * es un banner permanente en ninguna pantalla.
 *
 * Se cierra y se calla un mes. Esa preferencia es de este equipo y de nadie
 * más, así que vive en el navegador y no en la base.
 */
export function InvitarTrasAprobar() {
  const [oculta, setOculta] = useState(() => sigueCallada())

  if (oculta) return null

  return (
    <section className="mt-4 rounded-xl surface p-4 flex flex-wrap items-center gap-3">
      <p className="m-0 flex-1 min-w-[220px] text-[13px] text-muted-foreground">
        Acabas de pasarla. Si conoces a otro piloto preparándose, tu enlace le da acceso a él y te
        suma a ti.
      </p>
      <Link to="/app/referidos" className={appButtonClass({ variant: "secondary" })}>
        Ver mi enlace
      </Link>
      <button
        type="button"
        onClick={() => {
          posponer()
          setOculta(true)
        }}
        aria-label="Ahora no"
        className="p-2 -mr-1 rounded-lg text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
      >
        <X className="h-4 w-4" />
      </button>
    </section>
  )
}

/** Un almacenamiento bloqueado no es razón para romper la pantalla del examen. */
function sigueCallada(): boolean {
  try {
    const guardado = localStorage.getItem(CLAVE)
    if (!guardado) return false
    const dias = (Date.now() - Number(guardado)) / 86_400_000
    return Number.isFinite(dias) && dias < DIAS_DE_SILENCIO
  } catch {
    return false
  }
}

function posponer() {
  try {
    localStorage.setItem(CLAVE, String(Date.now()))
  } catch {
    // Sin almacenamiento se vuelve a ofrecer la próxima vez. Es lo peor que pasa.
  }
}
