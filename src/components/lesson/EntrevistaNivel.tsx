import { useEffect, useId, useMemo, useState, type CSSProperties } from "react"
import { BookOpen, Check, ChevronDown, MessageSquareQuote, MessagesSquare, Plane, Scale } from "lucide-react"
import { renderInline } from "@/components/lesson/inline"
import type { EntrevistaBlock } from "@/lib/docBlocks"

/**
 * La entrevista de aerolínea que cierra cada nivel.
 *
 * Antes cada lección traía dos o tres preguntas al final, y Camilo pidió
 * sacarlas de ahí: «ponla al final de cada nivel, unas 15 preguntas, para que
 * no se repita esa sección en cada lección». Ahora es una pantalla propia
 * entre la última lección del nivel y la primera del siguiente, con portada,
 * como una lección más pero sin número: las lecciones siguen siendo las que
 * eran y el progreso no se entera.
 *
 * La pantalla se usa como un ensayo: se lee la pregunta, se responde en voz
 * alta, y solo después se abre la respuesta esperada. Las que ya se dominan se
 * marcan, y la marca se guarda en este navegador para volver solo a las que
 * faltan. No sube a la base: es una herramienta de estudio, no progreso.
 */

export type PreguntaAerolinea = EntrevistaBlock["preguntas"][number]

export interface LectorEntrevista {
  /** Número del nivel: rotula la portada y va en la URL (?e=1). */
  nivel: number
  /** El nombre del nivel sin el ordinal: «Introducción». */
  titulo: string
  /** La última lección del nivel: la entrevista va justo después. */
  tras: number
  minutes: number
  preguntas: PreguntaAerolinea[]
}

type Tipo = PreguntaAerolinea["nivel"]

const TIPOS: { id: Tipo; label: string; pista: string }[] = [
  { id: "concepto", label: "Concepto", pista: "Qué es, cuáles son" },
  { id: "interpretacion", label: "Interpretación", pista: "Por qué, qué diferencia hay" },
  { id: "situacion", label: "Situación", pista: "Te ponen en el avión" },
]

const dosCifras = (n: number) => String(n).padStart(2, "0")

// ─── Portada ─────────────────────────────────────────────────────────────────

/** Los números del 10 al 20 en letra, para la frase de la portada y la entrada. */
function enLetra(n: number): string {
  const L: Record<number, string> = {
    10: "Diez", 11: "Once", 12: "Doce", 13: "Trece", 14: "Catorce", 15: "Quince",
    16: "Dieciséis", 17: "Diecisiete", 18: "Dieciocho", 19: "Diecinueve", 20: "Veinte",
  }
  return L[n] ?? String(n)
}

const ICONO: Record<Tipo, typeof BookOpen> = { concepto: BookOpen, interpretacion: Scale, situacion: Plane }

/**
 * La portada, dibujada con el lenguaje de las portadas de lección de Camilo:
 * fondo navy con cuadrícula fina, barra dorada y rótulo arriba a la izquierda,
 * el titular en dos tonos (blanco y el acento del módulo), un subtítulo en mono
 * espaciado, una frase, la fila de fichas con icono al pie y la marca AVIATORY.
 * El dorado es `--ln-bright` del tema: en Meteorología saldría turquesa.
 *
 * Si algún día hay una imagen diseñada, se guarda como
 * public/modulos/<modulo>/entrevista-0N.webp y tapa a esta al cargar; mientras
 * no exista, ni se nota que se intentó.
 *
 * Los tamaños van en `cqw` (ancho del contenedor): la portada mide 16:9 tanto a
 * 720 px como a 340 px en un teléfono, y todo se escala con ella.
 */
function PortadaEntrevista({
  dir,
  entrevista,
  ratio,
  cuentas,
}: {
  dir: string
  entrevista: LectorEntrevista
  ratio: string
  cuentas: Record<Tipo, number>
}) {
  const [conImagen, setConImagen] = useState(false)
  const src = `${dir}/entrevista-${dosCifras(entrevista.nivel)}.webp`
  const total = entrevista.preguntas.length

  return (
    <figure
      className="@container relative m-0 w-full overflow-hidden"
      style={{
        aspectRatio: ratio,
        background: "var(--ln-navy)",
        backgroundImage:
          "radial-gradient(70% 90% at 88% 30%, color-mix(in oklab, var(--ln-bright) 22%, transparent), transparent 62%), linear-gradient(rgb(255 255 255 / 4%) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 4%) 1px, transparent 1px)",
        backgroundSize: "auto, 6cqw 6cqw, 6cqw 6cqw",
      }}
    >
      {/* Textura: el ordinal del nivel, en fantasma, y el globo de diálogo a
          contraluz. No son datos: el dato está en el rótulo. */}
      <span
        aria-hidden
        className="ln-display absolute font-bold leading-none"
        style={{ right: "3cqw", top: "2cqw", fontSize: "30cqw", color: "rgb(255 255 255 / 4.5%)", letterSpacing: "-0.05em" }}
      >
        {dosCifras(entrevista.nivel)}
      </span>
      <MessagesSquare
        aria-hidden
        className="absolute"
        strokeWidth={1}
        style={{ right: "6cqw", top: "21cqw", width: "21cqw", height: "21cqw", color: "color-mix(in oklab, var(--ln-bright) 50%, transparent)" }}
      />

      <div className="absolute inset-0 flex flex-col" style={{ padding: "5.2cqw 6cqw 4.6cqw" }}>
        <div className="flex items-center" style={{ gap: "1.8cqw" }}>
          <span aria-hidden className="block" style={{ width: "6cqw", height: "1.1cqw", background: "var(--ln-bright)" }} />
          <span className="mono font-semibold uppercase text-white" style={{ fontSize: "max(2.1cqw, 9px)", letterSpacing: "0.22em" }}>
            Nivel <span style={{ color: "var(--ln-bright)" }}>{entrevista.nivel}</span>
          </span>
        </div>

        <h2 className="ln-display m-0 font-bold" style={{ marginTop: "2.6cqw", fontSize: "7.1cqw", lineHeight: 0.98, letterSpacing: "-0.025em" }}>
          <span className="text-white">Lo que te pueden</span>
          <br />
          <span style={{ color: "var(--ln-bright)" }}>preguntar</span>
        </h2>

        <div className="mono flex items-center font-semibold uppercase" style={{ marginTop: "2.2cqw", gap: "1.6cqw", fontSize: "max(1.7cqw, 7.5px)", letterSpacing: "0.24em", color: "var(--ln-navy-text)" }}>
          <span aria-hidden className="block h-px" style={{ width: "5cqw", background: "var(--ln-bright)" }} />
          <span className="@max-[520px]:hidden">Entrevista de aerolínea · </span>
          {entrevista.titulo}
        </div>

        <p className="m-0 @max-[520px]:hidden" style={{ marginTop: "1.8cqw", maxWidth: "56%", fontSize: "2.35cqw", lineHeight: 1.35, color: "var(--ln-item)" }}>
          {enLetra(total)} preguntas como las hace el evaluador, con la respuesta que espera oír.
        </p>

        <div className="mt-auto flex items-end justify-between" style={{ gap: "2cqw" }}>
          <div className="flex" style={{ gap: "1.4cqw" }}>
            {TIPOS.map((tipo) => {
              const Icono = ICONO[tipo.id]
              return (
                <div
                  key={tipo.id}
                  className="flex flex-col items-center justify-center border text-center"
                  style={{
                    width: "12cqw",
                    height: "11cqw",
                    gap: "0.7cqw",
                    borderRadius: "1.4cqw",
                    borderColor: "rgb(255 255 255 / 16%)",
                    background: "rgb(255 255 255 / 5%)",
                  }}
                >
                  <Icono style={{ width: "3cqw", height: "3cqw", color: "var(--ln-bright)" }} strokeWidth={1.8} aria-hidden />
                  <span className="ln-display font-bold leading-none text-white" style={{ fontSize: "max(3cqw, 12px)" }}>
                    {cuentas[tipo.id]}
                  </span>
                  <span className="mono font-semibold uppercase leading-none @max-[520px]:hidden" style={{ fontSize: "1.2cqw", letterSpacing: "0.08em", color: "var(--ln-navy-text)" }}>
                    {tipo.label}
                  </span>
                </div>
              )
            })}
          </div>
          <span className="mono font-semibold text-white" style={{ fontSize: "max(2cqw, 8.5px)", letterSpacing: "0.24em" }}>
            AVIATORY
          </span>
        </div>
      </div>

      <img
        src={src}
        alt=""
        decoding="async"
        onLoad={() => setConImagen(true)}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: conImagen ? 1 : 0, transition: "opacity 300ms ease-out" }}
        aria-hidden={!conImagen}
      />
    </figure>
  )
}

// ─── La pantalla ─────────────────────────────────────────────────────────────

function leerDominadas(clave: string): number[] {
  try {
    const raw = localStorage.getItem(clave)
    const v: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(v) ? v.filter((x): x is number => typeof x === "number") : []
  } catch {
    return []
  }
}

export function PantallaEntrevista({
  dir,
  ratio,
  entrevista,
  clave,
}: {
  dir: string
  ratio: string
  entrevista: LectorEntrevista
  /** Prefijo del almacenamiento local: "aviatory.mercancias-leccion". */
  clave: string
}) {
  const claveDominadas = `${clave}.entrevista.${entrevista.nivel}.dominadas`
  const [filtro, setFiltro] = useState<Tipo | "todas">("todas")
  // Al pasar de un nivel a otro no hace falta releer nada: el lector monta
  // esta pantalla con key por nivel, así que el estado nace de cero cada vez.
  const [dominadas, setDominadas] = useState<number[]>(() => leerDominadas(claveDominadas))

  useEffect(() => {
    try {
      localStorage.setItem(claveDominadas, JSON.stringify(dominadas))
    } catch {
      // Sin almacenamiento (modo privado, cuota): la marca dura lo que dure la página.
    }
  }, [claveDominadas, dominadas])

  const cuentas = useMemo(() => {
    const c: Record<Tipo, number> = { concepto: 0, interpretacion: 0, situacion: 0 }
    for (const p of entrevista.preguntas) c[p.nivel]++
    return c
  }, [entrevista.preguntas])

  const visibles = entrevista.preguntas
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => filtro === "todas" || p.nivel === filtro)

  const total = entrevista.preguntas.length
  const hechas = dominadas.filter((i) => i < total).length

  const alternarDominada = (i: number) =>
    setDominadas((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i].sort((a, b) => a - b)))

  return (
    <div className="flex flex-col" style={{ rowGap: 34 }}>
      <PortadaEntrevista dir={dir} entrevista={entrevista} ratio={ratio} cuentas={cuentas} />

      <div>
        {/* Sin doc-prose a propósito: justificada, en un teléfono abría huecos. */}
        <p className="m-0 text-[16px] leading-[1.7] sm:text-[17px]" style={{ color: "var(--ln-body)" }}>
          {enLetra(entrevista.preguntas.length)} preguntas como las hace el evaluador de una aerolínea
          sobre lo que viste en este nivel. En la entrevista nadie te da opciones: aquí tampoco. Respóndelas en voz alta, como
          si lo tuvieras enfrente, y solo después abre la respuesta esperada.
        </p>
      </div>

      {/* Cómo se usa, en tres pasos. Va antes de la baraja porque la baraja no
          se lee: se ensaya. */}
      <ol className="m-0 grid list-none gap-3 p-0 sm:grid-cols-3">
        {[
          ["Lee la pregunta", "Como te la haría el evaluador: corta y sin pistas."],
          ["Respóndela en voz alta", "Lo que se piensa y no se dice no cuenta en una entrevista."],
          ["Compara y marca", "Abre la respuesta, revisa qué tenías que mencionar y marca la que ya dominas."],
        ].map(([t, d], i) => (
          <li
            key={t}
            className="flex gap-3 rounded-[12px] border px-4 py-3.5"
            style={{ borderColor: "var(--ln-hair)", background: "var(--ln-paper)" }}
          >
            <span
              className="ln-display flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
              style={{ background: "var(--ln-primary)" }}
              aria-hidden
            >
              {i + 1}
            </span>
            <span className="min-w-0">
              <span className="block text-[14.5px] font-semibold leading-[1.3]" style={{ color: "var(--ln-ink)" }}>
                {t}
              </span>
              <span className="mt-1 block text-[13px] leading-[1.5]" style={{ color: "var(--ln-soft)" }}>
                {d}
              </span>
            </span>
          </li>
        ))}
      </ol>

      {/* Filtro y avance. El filtro existe porque el que ya sabe los conceptos
          quiere ensayar solo las situaciones la noche antes. */}
      <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "var(--ln-hair)" }}>
        <div className="flex flex-wrap gap-1 rounded-[10px] border p-1" style={{ borderColor: "var(--ln-hair)", background: "var(--ln-sunk)" }} role="group" aria-label="Filtrar por tipo de pregunta">
          {[{ id: "todas" as const, label: "Todas", n: total }, ...TIPOS.map((t) => ({ id: t.id, label: t.label, n: cuentas[t.id] }))].map((f) => {
            const activo = filtro === f.id
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFiltro(f.id)}
                aria-pressed={activo}
                className="inline-flex h-8 items-center gap-1.5 rounded-[7px] px-3 text-[13px] font-semibold transition-colors duration-150"
                style={activo ? { background: "var(--ln-primary)", color: "#fff" } : { color: "var(--ln-body)" }}
              >
                {f.label}
                <span className="mono tabular text-[11px]" style={{ opacity: activo ? 0.85 : 0.6 }}>
                  {f.n}
                </span>
              </button>
            )
          })}
        </div>

        <div className="min-w-[180px]" aria-live="polite">
          <div className="flex items-baseline justify-between gap-3">
            <span className="mono text-[10.5px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--ln-faint)" }}>
              Dominadas
            </span>
            <span className="mono tabular text-[12px] font-semibold" style={{ color: "var(--ln-primary)" }}>
              {hechas} / {total}
            </span>
          </div>
          <div className="mt-1.5 h-[5px] w-full overflow-hidden rounded-full" style={{ background: "var(--ln-hair-strong)" }}>
            <div
              className="h-full rounded-full transition-[width] duration-300 ease-out"
              style={{ width: `${total ? (hechas / total) * 100 : 0}%`, background: "var(--ln-primary)" }}
            />
          </div>
        </div>
      </div>

      <ol className="m-0 flex list-none flex-col gap-3.5 p-0">
        {visibles.map(({ p, i }) => (
          <TarjetaPregunta
            key={i}
            numero={i + 1}
            pregunta={p}
            dominada={dominadas.includes(i)}
            onDominada={() => alternarDominada(i)}
          />
        ))}
      </ol>

      {hechas === total && total > 0 && (
        <p
          className="m-0 flex items-center gap-2.5 rounded-[12px] px-4 py-3.5 text-[15px] leading-[1.55]"
          style={{ background: "var(--ln-tint)", color: "var(--ln-ink-strong)" }}
        >
          <Check className="h-4 w-4 shrink-0" strokeWidth={3} style={{ color: "var(--ln-primary)" }} aria-hidden />
          Las {total} dominadas. Vuelve la víspera de la entrevista y ensáyalas otra vez en voz alta.
        </p>
      )}
    </div>
  )
}

// ─── Una pregunta ────────────────────────────────────────────────────────────

function TarjetaPregunta({
  numero,
  pregunta,
  dominada,
  onDominada,
}: {
  numero: number
  pregunta: PreguntaAerolinea
  dominada: boolean
  onDominada: () => void
}) {
  const [abierta, setAbierta] = useState(false)
  const base = useId()
  const tipo = TIPOS.find((t) => t.id === pregunta.nivel) ?? TIPOS[0]

  return (
    <li
      className="overflow-hidden rounded-[14px] border transition-colors duration-200"
      style={
        {
          borderColor: dominada ? "var(--ln-primary)" : "var(--ln-hair)",
          background: "var(--ln-paper)",
          boxShadow: "0 1px 2px rgb(22 25 29 / 5%), 0 10px 28px -20px rgb(22 25 29 / 22%)",
        } as CSSProperties
      }
    >
      <div className="grid sm:grid-cols-[64px_minmax(0,1fr)]">
        {/* El número, grande y en Archivo: es lo que se ve al pasar la lista
            buscando «la doce, la que no me salió». */}
        <div
          className="hidden flex-col items-center gap-2 border-r pt-[18px] sm:flex"
          style={{ borderColor: "var(--ln-hair)", background: dominada ? "var(--ln-tint)" : "var(--ln-sunk)" }}
        >
          <span className="ln-display text-[22px] font-bold leading-none tabular sm:text-[26px]" style={{ color: "var(--ln-primary)" }}>
            {dosCifras(numero)}
          </span>
          {dominada && <Check className="h-4 w-4" strokeWidth={3} style={{ color: "var(--ln-primary)" }} aria-label="Dominada" />}
        </div>

        <div className="min-w-0 px-4 pb-4 pt-4 sm:px-5">
          <div className="flex items-center gap-2.5">
            <span className="ln-display text-[20px] font-bold leading-none tabular sm:hidden" style={{ color: "var(--ln-primary)" }}>
              {dosCifras(numero)}
            </span>
            <span
              className="mono inline-flex items-center gap-1.5 rounded-[4px] px-1.5 py-[3px] text-[9.5px] font-semibold uppercase tracking-[0.12em]"
              style={{ background: "var(--ln-tint)", color: "var(--ln-primary)" }}
              title={tipo.pista}
            >
              <MessageSquareQuote className="h-3 w-3" aria-hidden />
              {tipo.label}
            </span>
            {dominada && (
              <Check className="ml-auto h-4 w-4 sm:hidden" strokeWidth={3} style={{ color: "var(--ln-primary)" }} aria-label="Dominada" />
            )}
          </div>
          <h3 className="ln-display m-0 mt-2 text-[17.5px] font-semibold sm:text-[19px]" style={{ lineHeight: 1.3, color: "var(--ln-ink)" }}>
            {renderInline(pregunta.q)}
          </h3>

          <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <button
              type="button"
              onClick={() => setAbierta((v) => !v)}
              aria-expanded={abierta}
              aria-controls={`${base}-r`}
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold transition-colors duration-150"
              style={{ color: "var(--ln-primary)" }}
            >
              {abierta ? "Ocultar la respuesta" : "Ver la respuesta esperada"}
              <ChevronDown className="h-4 w-4 transition-transform duration-200" style={{ transform: abierta ? "rotate(180deg)" : undefined }} aria-hidden />
            </button>
            <button
              type="button"
              onClick={onDominada}
              aria-pressed={dominada}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[13px] font-medium transition-colors duration-150"
              style={
                dominada
                  ? { borderColor: "var(--ln-primary)", background: "var(--ln-primary)", color: "#fff" }
                  : { borderColor: "var(--ln-hair-strong)", color: "var(--ln-body)" }
              }
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
              {dominada ? "La domino" : "Ya la domino"}
            </button>
          </div>

          {abierta && (
            <div id={`${base}-r`} className="rev-aparece mt-4 border-t pt-4" style={{ borderColor: "var(--ln-hair)" }}>
              <div className="mono text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--ln-faint)" }}>
                Respuesta esperada
              </div>
              <p className="m-0 mt-1.5 text-[15.5px] leading-[1.7]" style={{ color: "var(--ln-body)" }}>
                {renderInline(pregunta.respuesta)}
              </p>
              {pregunta.claves && pregunta.claves.length > 0 && (
                <div className="mt-3.5">
                  <div className="mono text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--ln-faint)" }}>
                    Tenías que mencionar
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {pregunta.claves.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border px-2.5 py-[3px] text-[12.5px] font-medium"
                        style={{ borderColor: "var(--ln-primary)", color: "var(--ln-primary)" }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  )
}
