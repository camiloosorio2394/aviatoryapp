import type { ReactNode } from "react"
import { Check, CheckCircle2, XCircle } from "lucide-react"
import { accentText } from "@/lib/tileColors"
import type { EstadoOpcion } from "./opciones"
import { ACENTO, BOTON_PRIMARIO, BOTON_SECUNDARIO, ERROR, FOCO, MONO, OK, borde, tinte } from "./tokens"

/**
 * Piezas comunes de los seis ejercicios: la tarjeta, la ficha del caso, las
 * opciones, el anuncio del resultado y los botones de comprobar y reintentar.
 */

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
    <section className="surface min-w-0 rounded-2xl p-4 sm:p-6" aria-label={rotulo}>
      <header>
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: accentText(ACENTO), fontFamily: MONO }}>
          {rotulo}
        </div>
        <h2 className="mt-1.5 text-[19px] font-semibold leading-[1.3] text-foreground sm:text-[21px]">{titulo}</h2>
      </header>
      <div className="mt-5 grid min-w-0 gap-5">{children}</div>
      <p className="m-0 mt-5 text-[11.5px] leading-snug text-muted-foreground">Fuente: {fuente}</p>
    </section>
  )
}

/** Un bloque rotulado del caso (DEFECTO, ESTADO, VUELO) con una línea por dato. */
export function FichaCaso({ rotulo, lineas }: { rotulo: string; lineas: string[] }) {
  if (!lineas.length) return null
  return (
    <div className="min-w-0">
      <div className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground" style={{ fontFamily: MONO }}>
        {rotulo}
      </div>
      <ul className="m-0 grid list-none gap-1 p-0">
        {lineas.map((l, i) => (
          <li key={i} className="text-[14px] leading-[1.5] text-foreground">
            {l}
          </li>
        ))}
      </ul>
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
      <div className="mt-1 text-[14px] leading-relaxed text-foreground/90">{children}</div>
    </div>
  )
}

/**
 * Una opción que se toca. `multiple` la pinta como casilla (varias correctas);
 * si no, como botón de una sola respuesta. Tras corregir, el estado lleva
 * color, icono y texto para lector de pantalla.
 */
export function Opcion({
  texto,
  estado,
  multiple = false,
  marcada,
  deshabilitada,
  onClick,
  indice,
  lang,
}: {
  texto: string
  estado: EstadoOpcion
  multiple?: boolean
  marcada: boolean
  deshabilitada?: boolean
  onClick: () => void
  indice?: number
  lang?: string
}) {
  const color = estado === "correcta" ? OK : estado === "error" || estado === "faltó" ? ERROR : ACENTO
  const pintada = estado !== "neutra"
  const sufijo = estado === "correcta" ? "Correcta" : estado === "error" ? "Incorrecta" : estado === "faltó" ? "Faltó marcarla" : null
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={marcada}
      disabled={deshabilitada}
      className={`flex min-h-[44px] w-full items-start gap-2.5 rounded-xl border p-3 text-left transition-colors disabled:cursor-default ${FOCO}`}
      style={{
        borderColor: pintada ? borde(color) : "var(--border)",
        background: pintada ? tinte(color, estado === "elegida" ? 12 : 10) : "transparent",
      }}
    >
      {multiple ? (
        <span
          aria-hidden="true"
          className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border"
          style={{ borderColor: marcada ? color : "var(--border)", background: marcada ? color : "transparent" }}
        >
          {marcada && <Check className="h-3 w-3 text-white" />}
        </span>
      ) : (
        indice !== undefined && (
          <span aria-hidden="true" className="shrink-0 text-[12px] font-semibold text-muted-foreground" style={{ fontFamily: MONO }}>
            {String.fromCharCode(97 + indice)}
          </span>
        )
      )}
      <span className="min-w-0 flex-1 text-[14px] leading-[1.45] text-foreground" lang={lang}>
        {texto}
      </span>
      {sufijo && (
        <span className="shrink-0 self-center text-[11.5px] font-semibold" style={{ color: accentText(color) }}>
          {sufijo}
        </span>
      )}
    </button>
  )
}

export function BotonComprobar({ onClick, disabled, children = "Comprobar" }: { onClick: () => void; disabled?: boolean; children?: ReactNode }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={`${BOTON_PRIMARIO} justify-self-start`} style={{ background: ACENTO }}>
      {children}
    </button>
  )
}

export function BotonReintentar({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className={`${BOTON_SECUNDARIO} justify-self-start`} onClick={onClick}>
      Volver a intentarlo
    </button>
  )
}

/** Rótulo de una pregunta dentro del ejercicio. */
export function Pregunta({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="m-0 text-[15px] font-semibold leading-[1.4] text-foreground">
      {children}
    </p>
  )
}
