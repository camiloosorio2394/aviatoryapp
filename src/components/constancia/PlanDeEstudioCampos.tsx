import { Input } from "@/components/ui/input"
import { DIAS_DE_LA_SEMANA, MINUTOS_SUGERIDOS, type PlanDeEstudio } from "@/services/planDeEstudio"

/**
 * Los campos del plan de estudio: qué días, a qué hora y cuántos minutos.
 *
 * Van en un componente y no en cada pantalla porque el onboarding y el perfil
 * preguntan lo mismo, y si se separan empiezan a ofrecer cosas distintas.
 *
 * La pregunta no es «¿vas a estudiar?», que no compromete a nada, sino «¿qué
 * días y a qué hora?». Esa es la que después le devuelve el recordatorio.
 */
export function PlanDeEstudioCampos({
  plan,
  alCambiar,
}: {
  plan: PlanDeEstudio
  alCambiar: (plan: PlanDeEstudio) => void
}) {
  function alternarDia(valor: number) {
    alCambiar({
      ...plan,
      dias: plan.dias.includes(valor)
        ? plan.dias.filter((d) => d !== valor)
        : [...plan.dias, valor],
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="text-[13px] font-medium text-muted-foreground mb-2">Días</div>
        <div className="flex flex-wrap gap-2">
          {DIAS_DE_LA_SEMANA.map((dia) => {
            const activo = plan.dias.includes(dia.valor)
            return (
              <button
                key={dia.valor}
                type="button"
                onClick={() => alternarDia(dia.valor)}
                aria-pressed={activo}
                aria-label={dia.largo}
                className="h-11 w-11 rounded-full text-[15px] font-semibold border transition-[color,background-color,border-color,box-shadow] cursor-pointer"
                style={
                  activo
                    ? { background: "var(--av-blue-500)", borderColor: "var(--av-blue-500)", color: "white" }
                    : { borderColor: "var(--border)", color: "var(--muted-foreground)" }
                }
              >
                {dia.corto}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <div className="text-[13px] font-medium text-muted-foreground mb-2">Hora</div>
          <Input
            type="time"
            value={plan.hora}
            onChange={(e) => alCambiar({ ...plan, hora: e.target.value })}
            className="h-11 rounded-xl tabular-nums"
          />
        </div>
        <div>
          <div className="text-[13px] font-medium text-muted-foreground mb-2">Cuánto rato</div>
          <div className="flex flex-wrap gap-2">
            {MINUTOS_SUGERIDOS.map((minutos) => {
              const activo = plan.minutosMeta === minutos
              return (
                <button
                  key={minutos}
                  type="button"
                  onClick={() => alCambiar({ ...plan, minutosMeta: minutos })}
                  aria-pressed={activo}
                  className="h-11 px-3.5 rounded-full text-[15px] font-semibold border transition-[color,background-color,border-color,box-shadow] cursor-pointer tabular-nums"
                  style={
                    activo
                      ? { background: "var(--av-blue-500)", borderColor: "var(--av-blue-500)", color: "white" }
                      : { borderColor: "var(--border)", color: "var(--muted-foreground)" }
                  }
                >
                  {minutos} min
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
