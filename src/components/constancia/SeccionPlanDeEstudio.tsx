import { useEffect, useState } from "react"
import { CalendarClock } from "lucide-react"
import { toast } from "sonner"
import { SectionTitle } from "@/components/ui/section-title"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import { PlanDeEstudioCampos } from "@/components/constancia/PlanDeEstudioCampos"
import {
  guardarPlanDeEstudio,
  resumirPlan,
  traerPlanDeEstudio,
  zonaDelEquipo,
  type PlanDeEstudio,
} from "@/services/planDeEstudio"
import { traerEstadoDeRacha, type EstadoDeRacha } from "@/services/racha"

/** Lo que se ofrece a quien no tiene plan: tres días entre semana, después del trabajo. */
function planSugerido(): PlanDeEstudio {
  return { dias: [1, 3, 5], hora: "20:00", zona: zonaDelEquipo(), minutosMeta: 20 }
}

/**
 * El plan de estudio dentro del perfil.
 *
 * Se trae y se guarda solo, sin pasar por la pantalla, para que agregarlo al
 * perfil sean dos líneas: así se puede mover a otra pantalla sin arrastrar
 * estado detrás.
 */
export function SeccionPlanDeEstudio({ userId }: { userId: string }) {
  const [plan, setPlan] = useState<PlanDeEstudio | null>(null)
  const [editando, setEditando] = useState(false)
  const [borrador, setBorrador] = useState<PlanDeEstudio>(planSugerido)
  const [guardando, setGuardando] = useState(false)
  const [racha, setRacha] = useState<EstadoDeRacha | null>(null)

  useEffect(() => {
    let cancelado = false
    traerPlanDeEstudio(userId).then((p) => {
      if (cancelado) return
      setPlan(p)
      if (p) setBorrador(p)
    })
    traerEstadoDeRacha(userId).then((r) => {
      if (!cancelado) setRacha(r)
    })
    return () => {
      cancelado = true
    }
  }, [userId])

  async function guardar() {
    setGuardando(true)
    try {
      // La zona se toma del equipo al guardar, no al cargar: si el piloto se
      // muda de país, el recordatorio se muda con él.
      const aGuardar = { ...borrador, zona: zonaDelEquipo() }
      await guardarPlanDeEstudio(userId, aGuardar)
      setPlan(aGuardar)
      setBorrador(aGuardar)
      setEditando(false)
      toast.success("Plan guardado. Te avisamos esos días.")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No pudimos guardar tu plan.")
    } finally {
      setGuardando(false)
    }
  }

  return (
    <section className="mt-6">
      <SectionTitle
        icon={CalendarClock}
        eyebrow="Constancia"
        title="Cuándo vas a estudiar"
        hint="Te avisamos esos días, a esa hora. Solo eso."
      />
      <div className="surface rounded-xl p-5">
        {editando ? (
          <>
            <PlanDeEstudioCampos plan={borrador} alCambiar={setBorrador} />
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={guardar}
                disabled={guardando || borrador.dias.length === 0}
                className={appButtonClass({}, "cursor-pointer")}
                style={appButtonStyle()}
              >
                Guardar plan
              </button>
              <button
                type="button"
                onClick={() => {
                  setBorrador(plan ?? planSugerido())
                  setEditando(false)
                }}
                disabled={guardando}
                className={appButtonClass({ variant: "secondary" }, "cursor-pointer")}
              >
                Cancelar
              </button>
            </div>
            {borrador.dias.length === 0 && (
              <p className="mt-3 m-0 text-[13px] text-muted-foreground">Elige al menos un día.</p>
            )}
          </>
        ) : (
          <>
            <p className="m-0 text-[15px] leading-relaxed text-muted-foreground max-w-[680px]">
              {plan
                ? `Te lo pusiste tú: ${resumirPlan(plan)}, ${plan.minutosMeta} minutos.`
                : "Elegir el día y la hora funciona mucho mejor que prometerse estudiar más. Pon los tuyos y te lo recordamos ahí, no a cualquier hora."}
            </p>
            <button
              type="button"
              onClick={() => setEditando(true)}
              className={appButtonClass({ variant: plan ? "secondary" : "primary" }, "mt-4 cursor-pointer")}
              style={plan ? undefined : appButtonStyle()}
            >
              {plan ? "Cambiar el plan" : "Poner mi plan"}
            </button>
            {/* El día de gracia se dice aquí y no se esconde: saber que existe
                es justo lo que evita que un día malo se convierta en dejarlo. */}
            {racha !== null && racha.dias > 0 && (
              <p className="mt-3 m-0 text-[13px] text-muted-foreground">
                {racha.tieneGracia
                  ? `Llevas ${racha.dias} ${racha.dias === 1 ? "día" : "días"} seguidos. Este mes puedes faltar uno sin perder la racha.`
                  : `Llevas ${racha.dias} ${racha.dias === 1 ? "día" : "días"} seguidos. Ya usaste el día que podías faltar este mes; el siguiente sí la rompe.`}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
