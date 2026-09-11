/**
 * Bloques de la lección-documento que ordenan una idea: flujos, pasos,
 * secuencias, transiciones, la etapa de la ruta, cadenas, encabezados,
 * tarjetas y referencias. Los usa DocBlock (DocLessonBlocks.tsx).
 */

import { Fragment, type ReactNode, useState } from "react"
import {
  AlertTriangle,
  ArrowUpDown,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  Info,
  KeyRound,
  MapPin,
  Plane,
  Smartphone,
} from "lucide-react"
import { useInView } from "@/hooks/useInView"
import type { PasoIcono, TarjetaIcono } from "@/lib/notamLesson"
import { docAccent, docTint } from "@/lib/docSheet"
import { renderInline } from "@/components/lesson/inline"
import { ACENTO, breakdownColor } from "@/components/lesson/bloquesComun"

// ─── Piezas que se pulsan ────────────────────────────────────────────────────

/**
 * Panel de lectura de las piezas seleccionables.
 *
 * Reserva su alto y muestra la pista mientras no hay nada elegido: sin eso la
 * página salta cada vez que el alumno cambia de selección, que es justo lo que
 * hace que una pieza interactiva se sienta barata.
 */
function PanelLectura({ pista, children }: { pista?: string; children?: ReactNode }) {
  return (
    <div className="mt-3 flex min-h-[78px] items-center rounded-lg border doc-rule doc-soft px-4 py-3.5">
      {/* `||` y no `??`: quien llama pasa `false` cuando no hay seleccion,
          y `??` solo cae al respaldo con null o undefined. */}
      {children || <p className="m-0 text-[13.5px] leading-[1.55] doc-muted">{pista}</p>}
    </div>
  )
}

/** La flecha entre eslabones: a la derecha en escritorio, hacia abajo en móvil. */
function FlechaFlujo() {
  return (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center self-center"
      style={{ color: docAccent(ACENTO, 40) }}
    >
      <ChevronRight className="hidden lg:block h-4 w-4" />
      <ChevronDown className="lg:hidden h-4 w-4" />
    </span>
  )
}

interface FlujoPaso {
  clave: string
  etiqueta: string
  sub?: string
  texto: string
}

/**
 * La cadena de la información, recorrible eslabón por eslabón.
 *
 * Se ilumina solo el elegido y los demás se quedan a la vista: la pieza enseña
 * la relación entre ellos, y atenuar el resto la rompería.
 */
export function Flujo({ pasos, pista }: { pasos: FlujoPaso[]; pista?: string }) {
  const [activo, setActivo] = useState<string | null>(null)
  const elegido = pasos.find((p) => p.clave === activo)

  return (
    <section aria-label="Cadena de la información aeronáutica">
      <div className="flex flex-col lg:flex-row lg:items-stretch gap-2">
        {pasos.map((paso, i) => {
          const on = paso.clave === activo
          return (
            <Fragment key={paso.clave}>
              {i > 0 && <FlechaFlujo />}
              <button
                type="button"
                onClick={() => setActivo(on ? null : paso.clave)}
                aria-pressed={on}
                className="flex-1 min-w-0 rounded-lg border px-3 py-3 text-center transition-colors"
                style={{
                  borderColor: on ? docAccent(ACENTO, 55) : "var(--doc-border)",
                  background: on ? docTint(ACENTO, 12) : "var(--doc-bg)",
                }}
              >
                <span
                  className="block text-[15px] font-semibold tracking-[-0.01em]"
                  style={{ color: on ? docAccent(ACENTO, 75) : "var(--doc-fg)" }}
                >
                  {paso.etiqueta}
                </span>
                {paso.sub && (
                  <span className="mt-0.5 block text-[12px] leading-[1.35] doc-muted">
                    {paso.sub}
                  </span>
                )}
              </button>
            </Fragment>
          )
        })}
      </div>
      <PanelLectura pista={pista}>
        {elegido && (
          <p className="m-0 text-[15px] leading-[1.6]">
            <strong className="font-semibold" style={{ color: docAccent(ACENTO, 75) }}>
              {elegido.etiqueta}.
            </strong>{" "}
            {elegido.texto}
          </p>
        )}
      </PanelLectura>
    </section>
  )
}

const TARJETA_ICONO: Record<TarjetaIcono, typeof Info> = {
  documento: FileText,
  movil: Smartphone,
  avion: Plane,
}

interface TarjetaItem {
  icono: TarjetaIcono
  titulo: string
  resumen: string
  detalle: string
}

/** Vías en fichas: cerradas dicen de qué van, abiertas lo desarrollan. */
export function Tarjetas({ items, pista }: { items: TarjetaItem[]; pista?: string }) {
  const [abierta, setAbierta] = useState<number | null>(null)

  return (
    <section>
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((it, i) => {
          const on = abierta === i
          const Icono = TARJETA_ICONO[it.icono]
          return (
            <button
              key={i}
              type="button"
              onClick={() => setAbierta(on ? null : i)}
              aria-pressed={on}
              className="h-full rounded-lg border p-4 text-left transition-colors"
              style={{
                borderColor: on ? docAccent(ACENTO, 55) : "var(--doc-border)",
                background: on ? docTint(ACENTO, 10) : "var(--doc-bg)",
              }}
            >
              <Icono
                className="h-5 w-5"
                style={{ color: docAccent(ACENTO, on ? 75 : 55) }}
                aria-hidden
              />
              <span
                className="mt-2.5 block text-[15px] font-semibold tracking-[-0.01em]"
                style={{ color: "var(--doc-fg)" }}
              >
                {it.titulo}
              </span>
              <span className="mt-1 block text-[13.5px] leading-[1.5] doc-muted">{it.resumen}</span>
            </button>
          )
        })}
      </div>
      <PanelLectura pista={pista}>
        {abierta !== null && (
          <p className="m-0 text-[15px] leading-[1.6]">
            <strong className="font-semibold" style={{ color: docAccent(ACENTO, 75) }}>
              {items[abierta].titulo}.
            </strong>{" "}
            {items[abierta].detalle}
          </p>
        )}
      </PanelLectura>
    </section>
  )
}

interface ReferenciaItem {
  codigo: string
  nombre: string
  detalle: string
}

/** La norma que respalda, en fichas: presente sin ocupar media pantalla. */
export function Referencias({
  rotulo,
  pista,
  items,
}: {
  rotulo?: string
  pista?: string
  items: ReferenciaItem[]
}) {
  const [activa, setActiva] = useState<number | null>(null)

  return (
    <section>
      {rotulo && (
        <div
          className="mono mb-2 text-[11px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: docAccent(ACENTO, 60) }}
        >
          {rotulo}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {items.map((it, i) => {
          const on = activa === i
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActiva(on ? null : i)}
              aria-pressed={on}
              className="mono rounded-md border px-3 py-2 text-[12.5px] font-semibold transition-colors"
              style={{
                borderColor: on ? docAccent(ACENTO, 55) : "var(--doc-border)",
                background: on ? docTint(ACENTO, 12) : "var(--doc-bg)",
                color: on ? docAccent(ACENTO, 75) : "var(--doc-fg)",
              }}
            >
              {it.codigo}
            </button>
          )
        })}
      </div>
      <PanelLectura pista={pista}>
        {activa !== null && (
          <p className="m-0 text-[15px] leading-[1.6]">
            <strong className="font-semibold" style={{ color: docAccent(ACENTO, 75) }}>
              {items[activa].nombre}.
            </strong>{" "}
            {items[activa].detalle}
          </p>
        )}
      </PanelLectura>
    </section>
  )
}

const PASO_ICONO: Record<PasoIcono, typeof Info> = {
  documento: FileText,
  codigo: KeyRound,
  ubicacion: MapPin,
  reloj: Clock,
  calendario: CalendarDays,
  alerta: AlertTriangle,
  vertical: ArrowUpDown,
}

interface PasoItem {
  rotulo: string
  codigo?: string
  texto: string
  icono?: PasoIcono
  etiqueta?: string
  completo?: boolean
  fuerte?: boolean
  interpretacion?: { texto: string; enOtrasPalabras?: string }
}

/** Un paso de lectura: el código real arriba y qué dice debajo. */
function Paso({ paso, n }: { paso: PasoItem; n: number }) {
  const [abierto, setAbierto] = useState(false)
  const Icono = paso.icono ? PASO_ICONO[paso.icono] : null

  return (
    <div
      className="h-full rounded-lg border p-4 sm:p-5"
      style={{
        borderColor: paso.fuerte ? docAccent(ACENTO, 40) : "var(--doc-border)",
        background: paso.fuerte ? docTint(ACENTO, 6) : "var(--doc-bg)",
      }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="mono text-[12px] font-semibold tabular"
          style={{ color: docAccent(ACENTO, 60) }}
        >
          {String(n).padStart(2, "0")}
        </span>
        {Icono && (
          <Icono className="h-4 w-4 shrink-0" style={{ color: docAccent(ACENTO, 55) }} aria-hidden />
        )}
        <span
          className="text-[14.5px] font-semibold tracking-[-0.01em]"
          style={{ color: "var(--doc-fg)" }}
        >
          {paso.rotulo}
        </span>
      </div>

      {paso.codigo && (
        <pre className="doc-soft mt-3 mb-0 overflow-x-auto rounded-md border doc-rule px-3.5 py-2.5">
          <code
            className="mono block whitespace-pre-wrap break-words text-[13px] leading-[1.7]"
            style={{ color: "var(--doc-fg)", fontWeight: paso.fuerte ? 600 : 400 }}
          >
            {paso.codigo}
          </code>
        </pre>
      )}

      <p className="m-0 mt-3 text-[14.5px] leading-[1.6]">{renderInline(paso.texto)}</p>

      {paso.etiqueta && (
        <span
          className="mt-3 inline-block rounded-md border px-2.5 py-1 text-[12px]"
          style={{
            borderColor: docAccent(ACENTO, 28),
            color: docAccent(ACENTO, 65),
            background: docTint(ACENTO, 7),
          }}
        >
          {paso.etiqueta}
        </span>
      )}

      {paso.interpretacion && (
        <div className="mt-3.5">
          {!abierto ? (
            <button
              type="button"
              onClick={() => setAbierto(true)}
              className="mono rounded-md border px-3 py-2 text-[11.5px] font-semibold uppercase tracking-[0.09em] transition-colors"
              style={{
                borderColor: docAccent(ACENTO, 40),
                color: docAccent(ACENTO, 70),
                background: "var(--doc-bg)",
              }}
            >
              Ver interpretación
            </button>
          ) : (
            <div className="rounded-md border doc-rule doc-soft px-4 py-3.5">
              <p className="m-0 text-[14.5px] leading-[1.6]">
                {renderInline(paso.interpretacion.texto)}
              </p>
              {paso.interpretacion.enOtrasPalabras && (
                <p
                  className="m-0 mt-3 border-l-[3px] pl-3.5 text-[14.5px] leading-[1.6]"
                  style={{ borderLeftColor: docAccent(ACENTO, 60) }}
                >
                  <strong className="font-semibold" style={{ color: docAccent(ACENTO, 75) }}>
                    En otras palabras:
                  </strong>{" "}
                  {renderInline(paso.interpretacion.enOtrasPalabras)}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function Pasos({ items, columnas }: { items: PasoItem[]; columnas?: 2 }) {
  return (
    <div className={columnas === 2 ? "grid gap-3 sm:grid-cols-2" : "flex flex-col gap-3"}>
      {items.map((paso, i) => (
        <div key={i} className={columnas === 2 && paso.completo ? "sm:col-span-2" : undefined}>
          <Paso paso={paso} n={i + 1} />
        </div>
      ))}
    </div>
  )
}

/**
 * Una regla mental, no un ejercicio: se mira y se recuerda.
 *
 * Por eso no se pulsa nada. En vertical van las preguntas que uno se hace al
 * leer; en horizontal, el recorrido entero resumido en una línea.
 */
export function Secuencia({
  titulo,
  intro,
  items,
  numerada,
  orientacion = "vertical",
  centrada,
  nota,
}: {
  titulo?: string
  intro?: string
  items: string[]
  numerada?: boolean
  orientacion?: "vertical" | "horizontal"
  centrada?: boolean
  nota?: string
}) {
  const conCaja = Boolean(titulo)
  const horizontal = orientacion === "horizontal"

  const cadena = horizontal ? (
    <div
      className={`flex flex-wrap items-center gap-x-2 gap-y-2${
        centrada ? " justify-center" : ""
      }`}
    >
      {/* La flecha viaja pegada a su ficha: suelta, al saltar de linea deja
          un signo colgando al final de la anterior. */}
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-2">
          {i > 0 && (
            <ChevronRight
              className="h-3.5 w-3.5 shrink-0"
              style={{ color: docAccent(ACENTO, 40) }}
              aria-hidden
            />
          )}
          <span
            className="rounded-md border px-3 py-1.5 text-[13.5px] font-semibold"
            style={{
              borderColor: docAccent(ACENTO, 28),
              color: docAccent(ACENTO, 72),
              background: "var(--doc-bg)",
            }}
          >
            {it}
          </span>
        </span>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-stretch gap-1.5">
      {items.map((it, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <ChevronDown
              className="h-4 w-4 self-center"
              style={{ color: docAccent(ACENTO, 40) }}
              aria-hidden
            />
          )}
          <div
            className="flex items-center gap-3 rounded-md border px-4 py-3"
            style={{ borderColor: docAccent(ACENTO, 26), background: "var(--doc-bg)" }}
          >
            {numerada && (
              <span
                className="mono text-[12px] font-semibold tabular"
                style={{ color: docAccent(ACENTO, 58) }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
            <span className="text-[15px] font-semibold" style={{ color: "var(--doc-fg)" }}>
              {it}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  )

  const contenido = (
    <>
      {titulo && (
        <div
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
          style={{ color: docAccent(ACENTO, 65) }}
        >
          <Plane className="h-3.5 w-3.5" aria-hidden /> {titulo}
        </div>
      )}
      {intro && (
        <p className={titulo ? "m-0 mt-2 text-[15px] leading-[1.6]" : "m-0 text-[15px] leading-[1.6]"}>
          {renderInline(intro)}
        </p>
      )}
      <div className={titulo || intro ? "mt-4" : ""}>{cadena}</div>
      {nota && <p className="m-0 mt-4 text-[14px] leading-[1.6] doc-muted">{renderInline(nota)}</p>}
    </>
  )

  if (!conCaja) return <section>{contenido}</section>
  return (
    <section
      className="rounded-lg border p-4 sm:p-5"
      style={{ borderColor: docAccent(ACENTO, 26), background: docTint(ACENTO, 5) }}
    >
      {contenido}
    </section>
  )
}

/**
 * Puente entre dos ejemplos. Entra al llegar a pantalla, una vez y suave: la
 * animación está para decir "seguimos, ahora en otro país", no para lucirse.
 * `useInView` ya respeta a quien pide menos movimiento.
 */
export function Transicion({ de, a, nota }: { de: string; a: string; nota?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 })

  const ficha = (texto: string, entra: boolean) => (
    <span
      className="rounded-md border px-4 py-2.5 text-[15px] font-semibold transition-[color,background-color,border-color,box-shadow] duration-500"
      style={{
        borderColor: docAccent(ACENTO, 32),
        color: docAccent(ACENTO, 75),
        background: "var(--doc-bg)",
        opacity: entra ? 1 : 0,
        transform: entra ? "none" : "translateX(-8px)",
      }}
    >
      {texto}
    </span>
  )

  return (
    <section ref={ref}>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {ficha(de, true)}
        <ChevronRight
          className="h-5 w-5 transition-opacity duration-500"
          style={{ color: docAccent(ACENTO, 45), opacity: inView ? 1 : 0 }}
          aria-hidden
        />
        {ficha(a, inView)}
      </div>
      {nota && (
        <p className="m-0 mt-4 text-center text-[15px] leading-[1.6]">{renderInline(nota)}</p>
      )}
    </section>
  )
}

/**
 * El carril de etapas del vuelo: salida, ruta y destino.
 *
 * Las tres paradas caen en el centro de tres columnas iguales, y el carril,
 * el avion y los puntos se posicionan en esos mismos tercios. Asi el rotulo
 * de los extremos no se sale de la caja, que es lo que pasaria centrando
 * cada rotulo sobre un punto en el 0 y en el 100 por ciento.
 */
export function EtapaRuta({
  etapa,
  de,
  a,
}: {
  etapa: "salida" | "ruta" | "destino" | "aproximacion"
  de: string
  a: string
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.45 })

  const paradas = [
    { clave: "salida", rotulo: "Salida", codigo: de },
    { clave: "ruta", rotulo: "En ruta", codigo: "FIR" },
    { clave: "destino", rotulo: "Destino", codigo: a },
    { clave: "aproximacion", rotulo: "Aproximación", codigo: a },
  ]
  const indice = paradas.findIndex((p) => p.clave === etapa)
  // El centro de cada columna, en tantos por ciento del ancho del carril.
  const centro = (i: number) => ((i * 2 + 1) / (paradas.length * 2)) * 100
  const pct = centro(indice)

  return (
    <div
      ref={ref}
      className={`ln-aparece rounded-lg border doc-rule doc-soft px-4 pb-4 pt-7 sm:px-6${inView ? " ln-visible" : ""}`}
      aria-label={`Etapa del vuelo: ${paradas[indice].rotulo}`}
    >
      <div className="relative mx-auto max-w-[520px]">
        {/* El carril, sus paradas y el avion posado en la de esta etapa */}
        <div className="relative h-px w-full" style={{ background: docAccent(ACENTO, 16) }}>
          <div
            className="absolute bottom-[7px] -translate-x-1/2"
            style={{ left: `${pct}%` }}
          >
            <Plane
              className="ln-avion h-[17px] w-[17px]"
              style={{ color: docAccent(ACENTO, 74) }}
              aria-hidden
            />
          </div>
          <div
            className="ln-carril absolute inset-y-0 left-0"
            style={{ width: `${pct}%`, background: docAccent(ACENTO, 52) }}
            aria-hidden
          />
          {paradas.map((p, i) => {
            const hecha = i <= indice
            return (
              <span
                key={p.clave}
                className="absolute top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px]"
                style={{
                  left: `${centro(i)}%`,
                  borderColor: hecha ? docAccent(ACENTO, 62) : docAccent(ACENTO, 24),
                  background: i === indice ? docAccent(ACENTO, 62) : "var(--doc-bg)",
                }}
                aria-hidden
              />
            )
          })}
        </div>

        {/* Los rotulos, uno por columna. Mismo orden que la infografia:
            la etapa arriba y el indicador debajo. */}
        <div
          className="mt-3 grid"
          style={{ gridTemplateColumns: `repeat(${paradas.length}, minmax(0, 1fr))` }}
        >
          {paradas.map((p, i) => (
            <div key={p.clave} className="min-w-0 px-1 text-center">
              <div
                className="text-[10px] font-semibold uppercase leading-tight tracking-[0.1em] sm:text-[10.5px]"
                style={{ color: i === indice ? docAccent(ACENTO, 74) : "var(--doc-muted-fg)" }}
              >
                {p.rotulo}
              </div>
              <div
                className="mono mt-1 text-[12px] font-semibold"
                style={{ color: i === indice ? docAccent(ACENTO, 60) : "var(--doc-muted-fg)" }}
              >
                {p.codigo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface CadenaItem {
  token: string
  rotulo: string
  color?: string
}

/**
 * El mapa completo de una línea: tokens en fila con una palabra debajo.
 *
 * Va en su propio carril horizontal, igual que la línea Q de la infografía,
 * para que siempre se lea de una sola vez; en móvil se desplaza en vez de
 * partirse en dos filas con una flecha colgando. Cada token lleva el color de
 * su pieza, que es lo que hace que el alumno lo reconozca como el mismo.
 */
export function Cadena({ items }: { items: CadenaItem[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border doc-rule doc-soft px-4 py-5 sm:px-5">
      {/* Medidas apretadas a proposito: siete tokens con sus flechas tienen
          que caber enteros en los 716 px de la columna, que es el sentido de
          un mapa completo. En movil el carril se desplaza. */}
      <div className="flex min-w-max items-start justify-center gap-1.5">
        {items.map((it, i) => {
          const color = it.color ?? ACENTO
          return (
            <div key={i} className="flex items-start gap-1.5">
              {i > 0 && (
                <ChevronRight
                  className="mt-2 h-3.5 w-3.5 shrink-0"
                  style={{ color: docAccent(ACENTO, 35) }}
                  aria-hidden
                />
              )}
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className="mono rounded-md px-2 py-1 text-[13px] font-semibold"
                  style={{
                    color,
                    background: "var(--doc-bg)",
                    border: `1.5px solid ${color}`,
                  }}
                >
                  {it.token}
                </span>
                <span
                  className="mono text-[10.5px] font-semibold uppercase tracking-[0.08em]"
                  style={{ color: docAccent(color, 70) }}
                >
                  {it.rotulo}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface EncabezadoItem {
  partes: { token: string; label: string }[]
}

/**
 * Encabezados de NOTAM que se abren para enseñar sus piezas.
 *
 * Cerrados son las líneas tal cual las ve el piloto. Al abrir uno, cada pieza
 * recibe su filete de color y su rótulo debajo, con la misma gramática visual
 * del bloque `breakdown`, para que el alumno no tenga que aprender dos formas
 * de leer lo mismo.
 */
export function Encabezados({ items, pista }: { items: EncabezadoItem[]; pista?: string }) {
  const [abierto, setAbierto] = useState<number | null>(null)

  return (
    <section>
      {pista && <p className="m-0 mb-3 text-[13px] doc-muted">{pista}</p>}
      <div className="flex flex-col gap-2">
        {items.map((it, i) => {
          const on = abierto === i
          return (
            <button
              key={i}
              type="button"
              onClick={() => setAbierto(on ? null : i)}
              aria-pressed={on}
              className="w-full rounded-lg border px-4 py-3.5 text-left transition-colors"
              style={{
                borderColor: on ? docAccent(ACENTO, 55) : "var(--doc-border)",
                background: on ? docTint(ACENTO, 8) : "var(--doc-soft)",
              }}
            >
              <span className="mono flex flex-wrap items-start gap-x-5 gap-y-2.5 text-[14px] sm:text-[15px]">
                {it.partes.map((p, j) => (
                  <span key={j} className="inline-flex flex-col gap-1">
                    <span className="font-semibold whitespace-pre" style={{ color: "var(--doc-fg)" }}>
                      {p.token}
                    </span>
                    {on && (
                      <>
                        <span
                          className="h-[3px] w-full rounded-full"
                          style={{ background: docAccent(breakdownColor(j), 62) }}
                          aria-hidden
                        />
                        <span
                          className="max-w-[16ch] text-[11px] font-semibold leading-[1.35]"
                          style={{ color: docAccent(breakdownColor(j), 62) }}
                        >
                          {p.label}
                        </span>
                      </>
                    )}
                  </span>
                ))}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
