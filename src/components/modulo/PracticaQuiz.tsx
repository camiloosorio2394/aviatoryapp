import { useEffect, useMemo, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, BookOpen, Check, ChevronLeft, ChevronRight, Target, X } from "lucide-react"
import { useSession } from "@/hooks/useSession"
import { registrarEstudioDiario } from "@/lib/activity"
import { accentText } from "@/lib/tileColors"
import type { GrupoPractica, PreguntaPractica } from "@/lib/practicaQuiz"

/**
 * Práctica de opción múltiple por unidad (RAC) o por capítulo (Gestión del
 * combustible).
 *
 * Es donde viven las preguntas del «quiz» de cada unidad del documento: la
 * regla de Camilo es que en la lectura no se pregunta nada. La casa es la de
 * la práctica de Aerodinámica (barra de avance, tira de saltos con lo hecho en
 * verde y el ejercicio debajo), con una diferencia: aquí se responde y la
 * corrección llega en el acto, con su explicación, la norma que la respalda y
 * el enlace para volver a leer la unidad.
 *
 * Responder cuenta como práctica hecha, se acierte o no: lo que se mide es que
 * el piloto pasó por la pregunta y leyó por qué. Los colores de la corrección
 * son los de la evaluación: verde para la correcta y vinotinto para la
 * elegida que no lo era, nunca el rojo de alerta.
 */

export interface PracticaQuizProps {
  /** Nombre corto del módulo: «RAC». */
  titulo: string
  hub: string
  /** Ruta de la lección; la unidad se abre con ?l=n. */
  aprende: string
  /** El escalón de texto del acento del módulo. */
  acento: string
  /** «RAC · Práctica». */
  rotulo: string
  heroTitulo: string
  heroTexto: string
  /** Cómo se llama cada grupo: «unidad» o «capítulo». */
  unidad: { singular: string; plural: string; articulo: "la" | "el" }
  grupos: GrupoPractica[]
  /** La superficie para el registro del día de estudio. */
  actividad: string
  leerHechas: () => string[]
  /** Lo hecho en la base unido con lo local, o null si la consulta falla. */
  hidratar: (uid: string) => Promise<string[] | null>
  marcar: (clave: string) => Promise<void> | void
  /** Algo más que decir debajo de los controles, como dónde están los escenarios. */
  nota?: ReactNode
}

const LETRAS = ["A", "B", "C", "D", "E", "F"]
const CORRECTA = "var(--av-green-400)"
const INCORRECTA = "var(--av-wine-500)"

export function PracticaQuiz(props: PracticaQuizProps) {
  const { acento, grupos, unidad } = props
  const { user } = useSession()
  const [filtro, setFiltro] = useState<string>("todas")
  const [idx, setIdx] = useState(0)
  const [hechas, setHechas] = useState<string[]>(() => props.leerHechas())

  // Progreso en la base: si falla, seguimos con lo local.
  const { hidratar } = props
  useEffect(() => {
    const uid = user?.id
    if (!uid) return
    let cancelado = false
    void (async () => {
      const traidas = await hidratar(uid)
      if (cancelado || !traidas) return
      setHechas((prev) => Array.from(new Set([...prev, ...traidas])))
    })()
    return () => {
      cancelado = true
    }
  }, [user?.id, hidratar])

  const lista = useMemo(() => {
    const visibles = filtro === "todas" ? grupos : grupos.filter((g) => g.tema === filtro)
    return visibles.flatMap((g) => g.preguntas.map((p, i) => ({ grupo: g, pregunta: p, i })))
  }, [filtro, grupos])

  const totalModulo = useMemo(() => grupos.reduce((s, g) => s + g.preguntas.length, 0), [grupos])
  const total = lista.length
  const iSeguro = Math.min(idx, Math.max(0, total - 1))
  const actual = lista[iSeguro]
  const hechasAqui = lista.filter((x) => hechas.includes(x.pregunta.id)).length
  const pct = total > 0 ? Math.round((hechasAqui / total) * 100) : 0

  function marcar(clave: string): void {
    if (hechas.includes(clave)) return
    setHechas((prev) => (prev.includes(clave) ? prev : [...prev, clave]))
    void props.marcar(clave)
    void registrarEstudioDiario(props.actividad)
  }

  return (
    <div className="notam-practica mx-auto max-w-[900px] px-4 py-9 pb-20 sm:px-7 sm:py-11">
      <Link
        to={props.hub}
        className="mb-4 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Volver a {props.titulo}
      </Link>

      {/* Sin foto todavía: el navy liso es la base del hero de todos los módulos. */}
      <header className="relative mb-8 overflow-hidden rounded-[18px] bg-[#0A1524]">
        <div className="relative px-6 py-11 text-center sm:px-10 sm:py-14">
          <div
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <Target className="h-3.5 w-3.5" /> {props.rotulo}
          </div>
          <h1 className="np-display mx-auto mt-4 max-w-[880px] text-[30px] font-semibold leading-[1.1] text-white sm:text-[40px]">
            {props.heroTitulo}
          </h1>
          <p className="mx-auto mt-5 max-w-[720px] text-[15px] leading-[1.7] text-white/80 sm:text-[16px]">
            {props.heroTexto}
          </p>
          <div className="mt-6 text-[13px] text-white/70">
            <strong className="tabular text-white">{totalModulo}</strong> preguntas ·{" "}
            <strong className="tabular text-white">{grupos.length}</strong> {unidad.plural}
          </div>
        </div>
      </header>

      {/* === CONTROLES === */}
      <section className="min-w-0 rounded-2xl surface p-5 sm:p-6">
        <label className="block">
          <span className="rotulo mb-2 block text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Qué practicar
          </span>
          <select
            value={filtro}
            onChange={(e) => {
              setFiltro(e.target.value)
              setIdx(0)
            }}
            className="min-h-[44px] w-full rounded-lg border border-border bg-background px-3 text-[14px] text-foreground"
          >
            <option value="todas">
              Todas las {unidad.plural} ({totalModulo} preguntas)
            </option>
            {grupos.map((g) => {
              const hechasGrupo = g.preguntas.filter((p) => hechas.includes(p.id)).length
              return (
                <option key={g.tema} value={g.tema}>
                  {g.titulo} ({hechasGrupo}/{g.preguntas.length})
                </option>
              )
            })}
          </select>
        </label>

        <div className="mt-5">
          <div className="flex items-end justify-between gap-3">
            <div className="text-[13px] font-semibold text-foreground">
              <span className="tabular">{hechasAqui}</span> de <span className="tabular">{total}</span> respondidas
            </div>
            <div className="tabular text-[12px] text-muted-foreground">{pct}%</div>
          </div>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full"
            style={{ background: "color-mix(in oklab, var(--border) 60%, transparent)" }}
            role="progressbar"
            aria-valuenow={hechasAqui}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label="Preguntas respondidas"
          >
            <div className="h-full rounded-full transition-[width]" style={{ width: `${pct}%`, background: acento }} />
          </div>
        </div>

        <div className="mt-5">
          <div className="rotulo mb-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Salta a la que quieras
          </div>
          <div className="flex flex-wrap gap-1">
            {lista.map((x, i) => {
              const activo = i === iSeguro
              const hecho = hechas.includes(x.pregunta.id)
              const color = hecho ? CORRECTA : acento
              return (
                <button
                  key={x.pregunta.id}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Ir a la ${i + 1} de ${total}${hecho ? ", ya respondida" : ""}`}
                  aria-current={activo ? "true" : undefined}
                  className="tabular relative inline-flex h-9 min-w-9 items-center justify-center rounded-[6px] border px-2 text-[12.5px] transition-colors"
                  style={{
                    color: activo ? "white" : hecho ? accentText(color) : "var(--muted-foreground)",
                    background: activo ? color : hecho ? `color-mix(in oklab, ${color} 12%, transparent)` : "transparent",
                    borderColor: activo
                      ? color
                      : hecho
                        ? `color-mix(in oklab, ${color} 40%, transparent)`
                        : "var(--border)",
                  }}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground">En verde las que ya respondiste.</div>
        </div>

        {props.nota && <div className="mt-5 text-[13px] leading-relaxed text-muted-foreground">{props.nota}</div>}
      </section>

      {/* === PREGUNTA ACTIVA === */}
      <div className="mt-6">
        {actual ? (
          <Pregunta
            key={actual.pregunta.id}
            pregunta={actual.pregunta}
            grupo={actual.grupo}
            n={actual.i + 1}
            acento={acento}
            yaRespondida={hechas.includes(actual.pregunta.id)}
            unidad={unidad}
            aprende={props.aprende}
            onResponder={() => marcar(actual.pregunta.id)}
          />
        ) : (
          <p className="text-[15px] text-muted-foreground">No hay preguntas aquí.</p>
        )}
      </div>

      {/* === NAVEGACIÓN === */}
      {total > 0 && (
        <nav className="mt-5 flex items-center justify-between gap-3" aria-label="Navegación de preguntas">
          <button
            type="button"
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={iSeguro === 0}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[10px] border border-border px-4 text-[14px] font-medium text-foreground transition-colors hover:border-foreground/40 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" /> Anterior
          </button>
          <span className="tabular text-[12.5px] text-muted-foreground">
            {iSeguro + 1} / {total}
          </span>
          <button
            type="button"
            onClick={() => setIdx((i) => Math.min(total - 1, i + 1))}
            disabled={iSeguro >= total - 1}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[10px] border border-border px-4 text-[14px] font-medium text-foreground transition-colors hover:border-foreground/40 disabled:opacity-40"
          >
            Siguiente <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      )}
    </div>
  )
}

function Pregunta({
  pregunta,
  grupo,
  n,
  acento,
  yaRespondida,
  unidad,
  aprende,
  onResponder,
}: {
  pregunta: PreguntaPractica
  grupo: GrupoPractica
  n: number
  acento: string
  yaRespondida: boolean
  unidad: PracticaQuizProps["unidad"]
  aprende: string
  onResponder: () => void
}) {
  const [elegida, setElegida] = useState<number | null>(null)
  const respondida = elegida !== null
  const acerto = elegida === pregunta.correcta

  function elegir(i: number): void {
    if (respondida) return
    setElegida(i)
    onResponder()
  }

  return (
    <article className="rounded-2xl surface p-5 sm:p-7" aria-labelledby={`enunciado-${pregunta.id}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: accentText(acento) }}
        >
          {grupo.titulo} · Pregunta {n} de {grupo.preguntas.length}
        </div>
        {yaRespondida && !respondida && (
          <span className="inline-flex items-center gap-1 text-[11.5px] text-muted-foreground">
            <Check className="h-3.5 w-3.5" aria-hidden /> Ya la respondiste
          </span>
        )}
      </div>

      <p id={`enunciado-${pregunta.id}`} className="mt-3 text-[16.5px] font-medium leading-[1.6] text-foreground">
        {pregunta.enunciado}
      </p>

      <ul className="mt-5 flex list-none flex-col gap-2.5 p-0">
        {pregunta.opciones.map((op, i) => {
          const esLaBuena = i === pregunta.correcta
          const laElegida = elegida === i
          // Al responder se marca la elegida y, si falló, también la correcta.
          const tono = respondida && esLaBuena ? CORRECTA : respondida && laElegida ? INCORRECTA : null
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => elegir(i)}
                disabled={respondida}
                aria-pressed={laElegida}
                className="w-full rounded-xl border px-4 py-3 text-left text-[15px] leading-[1.55] transition-colors enabled:hover:border-foreground/40"
                style={{
                  borderColor: tono ? `color-mix(in oklab, ${tono} 55%, transparent)` : "var(--border)",
                  background: tono ? `color-mix(in oklab, ${tono} 10%, transparent)` : "transparent",
                  color: "var(--foreground)",
                }}
              >
                <span className="flex items-start gap-3">
                  <span
                    className="mono mt-[1px] shrink-0 text-[13px] font-semibold"
                    style={{ color: tono ? accentText(tono) : "var(--muted-foreground)" }}
                  >
                    {LETRAS[i]}
                  </span>
                  <span className="min-w-0 flex-1">{op}</span>
                  {respondida && esLaBuena && <Check className="h-4 w-4 shrink-0" style={{ color: accentText(CORRECTA) }} aria-hidden />}
                  {respondida && laElegida && !esLaBuena && (
                    <X className="h-4 w-4 shrink-0" style={{ color: accentText(INCORRECTA) }} aria-hidden />
                  )}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {respondida && (
        <div
          className="rev-aparece mt-5 border-t border-border pt-4 text-[15px] leading-[1.7]"
          role="status"
          aria-live="polite"
        >
          <span className="font-semibold" style={{ color: accentText(acerto ? CORRECTA : INCORRECTA) }}>
            {acerto ? "Correcto. " : "No es esa. "}
          </span>
          {pregunta.explicacion}
          <div className="mono mt-3 text-[11.5px] text-muted-foreground">Referencia: {pregunta.referencia}</div>
          <Link
            to={`${aprende}?l=${grupo.n}`}
            className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium hover:underline"
            style={{ color: accentText(acento) }}
          >
            <BookOpen className="h-4 w-4" aria-hidden /> Repasar {unidad.articulo} {unidad.singular}
          </Link>
        </div>
      )}
    </article>
  )
}
