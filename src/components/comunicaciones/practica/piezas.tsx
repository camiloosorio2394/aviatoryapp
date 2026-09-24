import type { ReactNode } from "react"
import { CheckCircle2, Radio, RotateCcw, Square, XCircle } from "lucide-react"
import { accentText } from "@/lib/tileColors"
import { NOMBRE_PERFIL, VELOCIDADES, type FuenteAudio, type PerfilRadio, type Transmision, type VozRadio } from "@/lib/radio"
import type { EstadoRadio } from "@/hooks/useRadio"
import { ACENTO, BOTON_PRIMARIO, BOTON_SECUNDARIO, ERROR, FOCO, OK, borde, tinte } from "./tokens"

/**
 * Piezas comunes de los diez ejercicios: la tarjeta, el control de radio, la
 * transcripción que aparece al responder y el anuncio de resultado.
 */

const QUIEN: Record<VozRadio, string> = {
  atc_latam: "ATC",
  atc_uk: "ATC",
  atc_us: "ATC",
  piloto: "Piloto",
  piloto_pm: "PM",
}

export function TarjetaEjercicio({
  rotulo,
  titulo,
  fuente,
  children,
}: {
  rotulo: string
  titulo: string
  fuente: string
  children: ReactNode
}) {
  return (
    <section className="surface min-w-0 rounded-2xl p-5 sm:p-6" aria-label={rotulo}>
      <header>
        <div
          className="text-[11px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: accentText(ACENTO), fontFamily: "var(--font-mono, ui-monospace, monospace)" }}
        >
          {rotulo}
        </div>
        <h2 className="mt-1.5 text-[20px] font-semibold leading-[1.25] text-foreground sm:text-[22px]">{titulo}</h2>
      </header>
      <div className="mt-5 grid gap-5">{children}</div>
      <p className="m-0 mt-5 text-[11.5px] text-muted-foreground">Fuente: {fuente}</p>
    </section>
  )
}

function textoFuente(fuente: FuenteAudio | null): string | null {
  if (fuente === "sintesis") return "Voz sintética del navegador: el audio grabado de esta transmisión todavía no está."
  if (fuente === "texto") return "Este navegador no puede reproducir la transmisión. Léela abajo."
  return null
}

/**
 * Escuchar, «say again» (que cuenta como repetición), detener y velocidad.
 * La velocidad no aparece en modo examen.
 */
export function ControlRadio({
  radio,
  transmisiones,
  perfil,
  bloqueado = false,
  etiqueta = "Escuchar",
  alTerminar,
}: {
  radio: EstadoRadio
  transmisiones: Transmision | Transmision[]
  perfil: PerfilRadio
  /** Ya no se puede escuchar (ejercicio resuelto en examen, por ejemplo). */
  bloqueado?: boolean
  etiqueta?: string
  alTerminar?: (fuente: FuenteAudio | null) => void
}) {
  const lista = Array.isArray(transmisiones) ? transmisiones : [transmisiones]
  const yaSono = radio.yaSono(lista)
  const sinRepeticiones = yaSono && !radio.puedeRepetir
  const aviso = textoFuente(radio.fuente)

  async function escuchar() {
    const f = await radio.escuchar(lista)
    alTerminar?.(f)
  }

  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: borde(ACENTO, 30), background: tinte(ACENTO, 6) }}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        {radio.sonando ? (
          <button type="button" onClick={radio.detener} className={BOTON_SECUNDARIO}>
            <Square className="h-4 w-4" aria-hidden="true" /> Detener
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void escuchar()}
            disabled={bloqueado || sinRepeticiones}
            className={BOTON_PRIMARIO}
            style={{ background: ACENTO }}
          >
            {yaSono ? <RotateCcw className="h-4 w-4" aria-hidden="true" /> : <Radio className="h-4 w-4" aria-hidden="true" />}
            {yaSono ? "Say again" : etiqueta}
          </button>
        )}

        <span className="text-[12.5px] text-muted-foreground" aria-live="polite">
          {radio.sonando
            ? lista.length > 1 && radio.sonandoIndice !== null
              ? `Transmisión ${radio.sonandoIndice + 1} de ${lista.length}…`
              : "En frecuencia…"
            : radio.repeticionesRestantes === null
              ? "Repeticiones sin límite"
              : radio.repeticionesRestantes === 0
                ? "Sin repeticiones"
                : `${radio.repeticionesRestantes} ${radio.repeticionesRestantes === 1 ? "repetición" : "repeticiones"}`}
        </span>

        <span className="ml-auto text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {NOMBRE_PERFIL[perfil]}
        </span>
      </div>

      {!radio.velocidadBloqueada && (
        <fieldset className="mt-3 flex flex-wrap items-center gap-1.5 border-0 p-0">
          <legend className="sr-only">Velocidad</legend>
          <span className="mr-1 text-[12px] text-muted-foreground" aria-hidden="true">
            Velocidad
          </span>
          {VELOCIDADES.map((v) => {
            const on = radio.velocidad === v
            return (
              <button
                key={v}
                type="button"
                aria-pressed={on}
                onClick={() => radio.setVelocidad(v)}
                className={`min-h-[32px] rounded-lg border px-2.5 text-[12px] font-semibold tabular-nums ${FOCO}`}
                style={{
                  borderColor: on ? ACENTO : "var(--border)",
                  background: on ? tinte(ACENTO, 14) : "transparent",
                  color: on ? accentText(ACENTO) : "var(--muted-foreground)",
                }}
              >
                {v === 1 ? "Normal" : `${v}x`}
              </button>
            )
          })}
        </fieldset>
      )}

      {aviso && <p className="m-0 mt-3 text-[12px] leading-snug text-muted-foreground">{aviso}</p>}
    </div>
  )
}

/**
 * El texto de lo que sonó. Aparece al responder (o antes, si no hay forma de
 * oírlo), para quien no oye o no alcanzó a entender.
 */
export function Transcripcion({ transmisiones, visible }: { transmisiones: Transmision[]; visible: boolean }) {
  if (!visible) return null
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Lo que se transmitió</div>
      <ol className="m-0 grid list-none gap-1.5 p-0">
        {transmisiones.map((t, i) => (
          <li key={`${t.id}-${i}`} className="text-[14px] leading-[1.55] text-foreground">
            <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: accentText(ACENTO) }}>
              {QUIEN[t.voz]}
            </span>
            <span lang="en">{t.texto}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** Región viva para el resultado: los lectores de pantalla lo anuncian al aparecer. */
export function Anuncio({ children }: { children: ReactNode }) {
  return (
    <div role="status" aria-live="polite" aria-atomic="true">
      {children}
    </div>
  )
}

/** Veredicto con icono y color semántico. Nunca solo color: siempre lleva texto. */
export function Veredicto({ ok, texto }: { ok: boolean; texto?: string }) {
  const color = ok ? OK : ERROR
  const Icono = ok ? CheckCircle2 : XCircle
  return (
    <span className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold" style={{ color: accentText(color) }}>
      <Icono className="h-4 w-4 shrink-0" aria-hidden="true" />
      {texto ?? (ok ? "Correcto" : "No")}
    </span>
  )
}

/** Caja de explicación tras responder. */
export function Explicacion({ children, puntaje }: { children: ReactNode; puntaje?: string }) {
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
      {puntaje && <div className="text-[14px] font-semibold text-foreground">{puntaje}</div>}
      <p className="m-0 mt-1 text-[14px] leading-relaxed text-foreground/90">{children}</p>
    </div>
  )
}
