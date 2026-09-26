import { useState } from "react"
import { CalendarClock, Check, X } from "lucide-react"

/**
 * El panel de cristal del hero del PCA: cuánto falta para el examen.
 *
 * Es el dato que organiza el estudio: no es lo mismo presentar en tres semanas
 * que en un año. El campo `target_date` existía en la base desde el principio,
 * pero solo se pedía en el onboarding y casi nadie lo llenaba; por eso se fija
 * aquí mismo, que es donde el piloto tiene la fecha en la cabeza.
 *
 * La cifra es la protagonista del hero, como el avance en el panel, y pasa a
 * ámbar a dos semanas o menos: ahí sí es un aviso. El mismo umbral usa el panel.
 *
 * Va sobre la foto, así que usa blancos translúcidos y no los tokens de tarjeta,
 * que sobre el velo desaparecen.
 */
const fecha = new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "short", year: "numeric" })

export interface CifraDelPanel {
  rotulo: string
  /** `null` = no hay dato todavía: va un guion, nunca un cero. */
  valor: string | null
  /** Por debajo de un mínimo: la cifra va en ámbar, que aquí sí es aviso. */
  aviso?: boolean
}

export function PanelDelExamen({
  dias,
  fechaExamen,
  onGuardar,
  cifras,
}: {
  /** Días que faltan; negativo si ya pasó; null si no hay fecha. */
  dias: number | null
  fechaExamen: string | null
  onGuardar: (fecha: string) => Promise<boolean>
  /**
   * Las cifras del piloto en filas pequeñas bajo la fecha: cobertura, dominio,
   * simulacros y racha. Ocupaban una sección entera («Tus números») debajo del
   * hero; Camilo pidió tenerlas aquí, reducidas, que es donde ya mira la fecha.
   */
  cifras?: CifraDelPanel[]
}) {
  const [editando, setEditando] = useState(false)
  const [valor, setValor] = useState("")
  const [guardando, setGuardando] = useState(false)
  const [fallo, setFallo] = useState(false)

  const boton =
    "inline-flex h-9 items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/20 disabled:opacity-50"

  async function guardar() {
    setGuardando(true)
    setFallo(false)
    const ok = await onGuardar(valor)
    setGuardando(false)
    if (ok) setEditando(false)
    else setFallo(true)
  }

  // La fecha llega como "AAAA-MM-DD": sin hora, new Date() la leería como
  // medianoche UTC, que en Colombia es el día anterior.
  const fechaLegible = fechaExamen ? fecha.format(new Date(fechaExamen + "T00:00:00")) : null
  const mostrarFecha = fechaLegible !== null && dias !== null && dias >= 0

  return (
    <div className="self-start overflow-hidden rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.62)] backdrop-blur-[6px] @4xl:self-center">
      <div className="px-4 pb-4 pt-4">
        <div className="nh-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/72">
          Tu examen
        </div>

        {editando ? (
          <div className="mt-3 flex flex-col gap-2">
            <input
              type="date"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              min={new Date().toISOString().slice(0, 10)}
              className="h-10 w-full rounded-lg border border-white/25 bg-white/10 px-3 text-[14px] text-white [color-scheme:dark]"
              aria-label="Fecha de tu examen"
            />
            <div className="flex gap-2">
              <button type="button" disabled={!valor || guardando} onClick={() => void guardar()} className={boton}>
                <Check className="h-3.5 w-3.5" aria-hidden /> {guardando ? "Guardando" : "Guardar"}
              </button>
              <button type="button" onClick={() => setEditando(false)} className={boton}>
                <X className="h-3.5 w-3.5" aria-hidden /> Cancelar
              </button>
            </div>
            {fallo && (
              <p className="m-0 text-[12px] text-white/70" role="alert">
                No se pudo guardar. Revisa tu conexión y vuelve a intentarlo.
              </p>
            )}
          </div>
        ) : dias === null ? (
          <>
            <p className="m-0 mt-2 text-[14px] leading-snug text-white/80">
              Fíjala y te contamos los días que faltan.
            </p>
            <button type="button" onClick={() => setEditando(true)} className={`${boton} mt-3`}>
              <CalendarClock className="h-3.5 w-3.5" aria-hidden /> ¿Cuándo presentas?
            </button>
          </>
        ) : dias < 0 ? (
          // No se borra sola, pero deja de contar hacia adelante.
          <>
            <p className="m-0 mt-2 text-[14px] leading-snug text-white/80">Tu fecha ya pasó.</p>
            <button type="button" onClick={() => setEditando(true)} className={`${boton} mt-3`}>
              <CalendarClock className="h-3.5 w-3.5" aria-hidden /> Fijar una nueva
            </button>
          </>
        ) : (
          <>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span
                className="nh-display text-[52px] font-bold leading-none tracking-[-0.04em]"
                style={{ color: dias <= 14 ? "var(--av-amber-400)" : "#fff" }}
              >
                {dias}
              </span>
              <span className="nh-display text-[20px] font-bold leading-none text-white/70">
                {dias === 1 ? "día" : "días"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setEditando(true)}
              className="mt-2 text-[12.5px] font-semibold text-white/70 underline decoration-white/30 underline-offset-2 transition-colors hover:text-white"
            >
              {dias === 0 ? "Es hoy · cambiar la fecha" : "Cambiar la fecha"}
            </button>
          </>
        )}
      </div>

      {!editando && (mostrarFecha || (cifras && cifras.length > 0)) && (
        <dl className="m-0 border-t border-white/10 px-4 py-3 text-[12px] leading-[1.5]">
          {mostrarFecha && (
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-white/72">Fecha</dt>
              <dd className="m-0 font-semibold text-white/85">{fechaLegible}</dd>
            </div>
          )}
          {cifras?.map((c, i) => (
            <div
              key={c.rotulo}
              className={`flex items-baseline justify-between gap-3${i > 0 || mostrarFecha ? " mt-1" : ""}`}
            >
              <dt className="text-white/72">{c.rotulo}</dt>
              <dd
                className="tabular m-0 font-semibold"
                style={{ color: c.aviso ? "var(--av-amber-400)" : "rgb(255 255 255 / 0.9)" }}
              >
                {c.valor ?? "—"}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
