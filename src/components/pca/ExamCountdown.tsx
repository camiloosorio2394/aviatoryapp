import { useState } from "react"
import { CalendarClock, Check } from "lucide-react"

/**
 * Cuenta atrás al examen.
 *
 * Es el dato que organiza el estudio: no es lo mismo presentar en tres semanas
 * que en un año, y hasta ahora la app trataba los dos casos igual. El campo
 * `target_date` existía en la base desde el principio, pero solo se pedía en el
 * onboarding y ninguno de los pilotos lo había llenado.
 *
 * Por eso se puede fijar aquí mismo, que es donde el piloto tiene la fecha en
 * la cabeza: al entrar a estudiar.
 *
 * Va sobre la foto del hero, así que usa superficies claras translúcidas y no
 * los tokens de tarjeta, que ahí desaparecen.
 */
export function ExamCountdown({
  days,
  onSave,
}: {
  days: number | null
  onSave: (date: string) => Promise<boolean>
}) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState("")
  const [saving, setSaving] = useState(false)

  const chip =
    "inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-white/25 bg-white/10 backdrop-blur-sm text-white text-[13px]"

  if (days === null || editing) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {editing ? (
          <>
            <input
              type="date"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              min={new Date().toISOString().slice(0, 10)}
              className={`${chip} [color-scheme:dark]`}
              aria-label="Fecha de tu examen"
            />
            <button
              type="button"
              disabled={!value || saving}
              onClick={async () => {
                setSaving(true)
                const ok = await onSave(value)
                setSaving(false)
                if (ok) setEditing(false)
              }}
              className={`${chip} font-medium cursor-pointer disabled:opacity-50`}
            >
              <Check className="h-4 w-4" /> Guardar
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className={`${chip} cursor-pointer transition-colors hover:bg-white/20`}
          >
            <CalendarClock className="h-4 w-4" />
            ¿Cuándo presentas el examen?
          </button>
        )}
      </div>
    )
  }

  // Fecha pasada: no se borra sola, pero deja de contar hacia adelante.
  if (days < 0) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className={`${chip} cursor-pointer transition-colors hover:bg-white/20`}
      >
        <CalendarClock className="h-4 w-4" />
        Tu fecha de examen ya pasó. Fija una nueva
      </button>
    )
  }

  const urgente = days <= 14

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className="inline-flex items-center gap-3 h-11 pl-3 pr-4 rounded-lg border border-white/25 bg-white/10 backdrop-blur-sm cursor-pointer transition-colors hover:bg-white/20"
      title="Cambiar la fecha"
    >
      <CalendarClock
        className="h-5 w-5"
        style={{ color: urgente ? "var(--av-amber-400)" : "rgb(255 255 255 / 70%)" }}
      />
      <span className="flex items-baseline gap-1.5">
        <span
          className="tabular-nums text-[24px] font-semibold leading-none tracking-[-0.02em]"
          style={{ color: urgente ? "var(--av-amber-400)" : "#fff" }}
        >
          {days}
        </span>
        <span className="text-[13px] text-white/70">
          {days === 1 ? "día para tu examen" : "días para tu examen"}
        </span>
      </span>
    </button>
  )
}
