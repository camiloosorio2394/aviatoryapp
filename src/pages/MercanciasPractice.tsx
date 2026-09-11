import { useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  BookMarked,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  ListChecks,
  Loader2,
  MessageSquareText,
  PencilLine,
  RotateCcw,
  ShieldAlert,
  Tags,
  Target,
  ClipboardList,
} from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"
import { useSession } from "@/hooks/useSession"
import { accentText } from "@/lib/notam"
import { MP_HUB, MP_TITULO } from "@/lib/mercancias"
import { CLASES, rombo } from "@/lib/mercanciasClases"
import {
  CASOS,
  EJERCICIOS_ETIQUETAS,
  ENTREVISTA,
  ESCENARIOS,
  PRACTICA_TOTALES,
  claveCaso,
  claveEntrevista,
  claveEscenario,
  claveEtiquetas,
  type CasoMP,
  type EjercicioEtiquetas,
  type EscenarioMP,
  type PreguntaEntrevista,
} from "@/lib/mercanciasPractica"
import {
  fetchMercanciasProgress,
  markMercanciasProgress,
  pushPendingMercancias,
  readMercanciasLocal,
} from "@/lib/mercanciasProgress"
import { registrarEstudioDiario } from "@/lib/activity"

/**
 * Práctica de Mercancías peligrosas (ruta /app/aerolinea/mercancias/practica).
 *
 * La misma casa que la práctica de NOTAM (cabecera sobre foto, pestañas,
 * selector numerado, la respuesta a la derecha) con cuatro modos:
 *
 *   Etiquetas   → ejercicios visuales por rondas con los rombos de las etiquetas
 *   Clasifica   → un envío; el piloto elige clase y si lleva grupo de embalaje
 *   Escenarios  → situaciones que se resuelven con las palabras propias y
 *                 después se comparan con la respuesta modelo
 *   Entrevista  → lo que podrían preguntarte, con respuesta modelo y qué evalúan
 *
 * El acento es el amarillo del módulo (--av-dg-*); el verde sigue marcando lo
 * resuelto, como en NOTAM.
 */

type Mode = "etiquetas" | "clasifica" | "escenarios" | "entrevista"

const ACENTO = "var(--av-dg-700)"
const HERO = "/infografias/mercancias/portada.webp"

const AVISO =
  "Ejercicios construidos con fines formativos a partir del LAR 175, del Anexo 18 y de las Instrucciones Técnicas, con el RAC 175 de Colombia como ejemplo de adopción nacional. Los escenarios no son documentos reales ni sustituyen el manual de operaciones del explotador; las cifras de las Instrucciones y los artículos de tu reglamento nacional se verifican en la edición vigente."

const MODOS: { key: Mode; label: string; icon: ReactNode; total: number }[] = [
  { key: "etiquetas", label: "Etiquetas", icon: <Tags className="h-4 w-4" />, total: PRACTICA_TOTALES.etiquetas },
  { key: "clasifica", label: "Clasifica", icon: <Target className="h-4 w-4" />, total: PRACTICA_TOTALES.casos },
  { key: "escenarios", label: "Escenarios", icon: <ClipboardList className="h-4 w-4" />, total: PRACTICA_TOTALES.escenarios },
  { key: "entrevista", label: "Entrevista", icon: <MessageSquareText className="h-4 w-4" />, total: PRACTICA_TOTALES.entrevista },
]

function clavesDe(mode: Mode): string[] {
  switch (mode) {
    case "etiquetas":
      return EJERCICIOS_ETIQUETAS.map((e) => claveEtiquetas(e.id))
    case "clasifica":
      return CASOS.map((c) => claveCaso(c.id))
    case "escenarios":
      return ESCENARIOS.map((e) => claveEscenario(e.id))
    case "entrevista":
      return ENTREVISTA.map((p) => claveEntrevista(p.n))
  }
}

export function MercanciasPractice() {
  const { user } = useSession()
  const [mode, setMode] = useState<Mode>("etiquetas")
  const [idx, setIdx] = useState(0)
  const [doneKeys, setDoneKeys] = useState<string[]>(() => readMercanciasLocal().practiceDone)
  const [saving, setSaving] = useState(false)

  // Progreso en Supabase: si falla, seguimos con el local. De paso sube lo que
  // se resolvió sin sesión.
  useEffect(() => {
    const uid = user?.id
    if (!uid) return
    let cancelled = false
    void (async () => {
      const fetched = await fetchMercanciasProgress(uid)
      if (cancelled || !fetched) return
      const remote = await pushPendingMercancias(fetched)
      if (cancelled || remote.practiceDone.length === 0) return
      setDoneKeys((prev) => Array.from(new Set([...prev, ...remote.practiceDone])))
    })()
    return () => {
      cancelled = true
    }
  }, [user?.id])

  const claves = useMemo(() => clavesDe(mode), [mode])
  const total = claves.length
  const safeIdx = Math.min(idx, total - 1)
  const doneInMode = claves.filter((k) => doneKeys.includes(k)).length
  const pct = total > 0 ? Math.round((doneInMode / total) * 100) : 0

  async function markDone(key: string): Promise<void> {
    if (doneKeys.includes(key)) return
    setSaving(true)
    setDoneKeys((prev) => (prev.includes(key) ? prev : [...prev, key]))
    try {
      await markMercanciasProgress({ practiceId: key })
      void registrarEstudioDiario("mercancias-practica")
    } finally {
      setSaving(false)
    }
  }

  function changeMode(m: Mode): void {
    setMode(m)
    setIdx(0)
  }

  const clave = claves[safeIdx]
  const isDone = doneKeys.includes(clave)

  return (
    <>
      <div className="notam-practica px-4 sm:px-7 py-9 sm:py-11 pb-20 max-w-[1560px] mx-auto">
        <Link
          to={MP_HUB}
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a {MP_TITULO}
        </Link>

        <header className="np-hero relative mb-8 overflow-hidden rounded-[18px]">
          <img src={HERO} alt="" aria-hidden="true" className="np-hero-foto" />
          <div className="np-hero-velo" />
          <div className="relative px-6 py-11 text-center sm:px-10 sm:py-14">
            <div className="np-hero-rotulo">
              <Target className="h-3.5 w-3.5" /> Mercancías peligrosas · Práctica
            </div>
            <h1 className="np-display mx-auto mt-4 max-w-[880px] text-[30px] font-semibold leading-[1.1] text-white sm:text-[40px]">
              Practica lo que te van a preguntar
            </h1>
            <p className="mx-auto mt-5 max-w-[720px] text-[15px] leading-[1.7] text-white/80 sm:text-[16px]">
              Reconoce etiquetas, clasifica envíos, resuelve escenarios operacionales con tus
              palabras y ensaya las preguntas de una entrevista técnica. Cada respuesta trae su
              artículo de la norma.
            </p>
            <div className="np-hero-cifras">
              {MODOS.map((m, i) => (
                <span key={m.key} className="contents">
                  {i > 0 && <span aria-hidden="true" className="np-hero-punto" />}
                  <span>
                    <strong className="tabular">{m.total}</strong> {m.label.toLowerCase()}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* === CONTROLES === */}
        <section className="min-w-0 rounded-2xl surface p-5 sm:p-6">
          <div
            className="grid gap-2 sm:grid-cols-4 p-1 rounded-xl"
            style={{ background: "color-mix(in oklab, var(--border) 35%, transparent)" }}
            role="group"
            aria-label="Modo de práctica"
          >
            {MODOS.map((m) => (
              <ModeButton
                key={m.key}
                active={mode === m.key}
                onClick={() => changeMode(m.key)}
                icon={m.icon}
                label={`${m.label} (${m.total})`}
              />
            ))}
          </div>

          <div className="mt-5">
            <div className="flex items-end justify-between gap-3">
              <div className="text-[13px] font-semibold text-foreground">
                <span className="tabular">{doneInMode}</span> de <span className="tabular">{total}</span>{" "}
                {mode === "entrevista" ? "ensayadas" : "resueltos"}
              </div>
              <div className="text-[12px] text-muted-foreground tabular">{pct}%</div>
            </div>
            <div
              className="mt-2 h-2 rounded-full overflow-hidden"
              style={{ background: "color-mix(in oklab, var(--border) 60%, transparent)" }}
              role="progressbar"
              aria-valuenow={doneInMode}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-label="Progreso del modo activo"
            >
              <div className="h-full rounded-full transition-[width]" style={{ width: `${pct}%`, background: ACENTO }} />
            </div>
          </div>

          <div className="mt-5">
            <div className="np-rotulo mb-2">Salta al que quieras</div>
            <div className="flex flex-wrap gap-1">
              {claves.map((k, i) => {
                const active = i === safeIdx
                const done = doneKeys.includes(k)
                const color = done ? "var(--av-green-400)" : ACENTO
                return (
                  <button
                    key={k}
                    onClick={() => setIdx(i)}
                    aria-label={`Ir al ${i + 1} de ${total}${done ? ", ya resuelto" : ""}`}
                    aria-current={active ? "true" : undefined}
                    className="np-salto relative inline-flex items-center justify-center rounded-[6px] border tabular transition-colors"
                    style={{
                      color: active ? "white" : done ? accentText(color) : "var(--muted-foreground)",
                      background: active ? color : done ? `color-mix(in oklab, ${color} 12%, transparent)` : "transparent",
                      borderColor: active ? color : done ? `color-mix(in oklab, ${color} 40%, transparent)` : "var(--border)",
                    }}
                  >
                    {i + 1}
                  </button>
                )
              })}
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground">En verde los que ya marcaste como resueltos.</div>
          </div>
        </section>

        {/* === EJERCICIO ACTIVO === */}
        <div className="mt-6">
          {mode === "etiquetas" && (
            <Etiquetas
              key={clave}
              ejercicio={EJERCICIOS_ETIQUETAS[safeIdx]}
              n={safeIdx + 1}
              total={total}
              isDone={isDone}
              onFinish={() => void markDone(clave)}
            />
          )}
          {mode === "clasifica" && (
            <Clasifica
              key={clave}
              caso={CASOS[safeIdx]}
              n={safeIdx + 1}
              total={total}
              isDone={isDone}
              saving={saving}
              onDone={() => void markDone(clave)}
            />
          )}
          {mode === "escenarios" && (
            <Escenario
              key={clave}
              escenario={ESCENARIOS[safeIdx]}
              n={safeIdx + 1}
              total={total}
              isDone={isDone}
              saving={saving}
              onDone={() => void markDone(clave)}
            />
          )}
          {mode === "entrevista" && (
            <Entrevista
              key={clave}
              pregunta={ENTREVISTA[safeIdx]}
              n={safeIdx + 1}
              total={total}
              isDone={isDone}
              saving={saving}
              onDone={() => void markDone(clave)}
            />
          )}
        </div>

        {/* === NAVEGACION === */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={() => setIdx(Math.max(0, safeIdx - 1))}
            disabled={safeIdx === 0}
            className="inline-flex items-center gap-1.5 h-11 px-4 rounded-xl text-[13px] font-semibold border border-border text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" /> Anterior
          </button>
          <div className="text-[13px] text-muted-foreground tabular">
            {safeIdx + 1} de {total}
          </div>
          <button
            onClick={() => setIdx(Math.min(total - 1, safeIdx + 1))}
            disabled={safeIdx >= total - 1}
            className="inline-flex items-center gap-1.5 h-11 px-4 rounded-xl text-[13px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
            style={{ background: ACENTO }}
          >
            Siguiente <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <p className="np-aviso mt-8">
          <ShieldAlert className="h-3 w-3 shrink-0" aria-hidden="true" />
          <span>{AVISO}</span>
        </p>
      </div>
    </>
  )
}

// ─── Etiquetas: ejercicio por rondas ─────────────────────────────────────────

/**
 * Un ejercicio de etiquetas: una ronda a la vez, se responde, se ve la
 * explicación y se pasa a la siguiente. Al terminar, el marcador y el ejercicio
 * queda resuelto. Las opciones pueden ser rombos o texto; el enunciado también
 * puede traer su rombo.
 */
function Etiquetas({
  ejercicio,
  n,
  total,
  isDone,
  onFinish,
}: {
  ejercicio: EjercicioEtiquetas
  n: number
  total: number
  isDone: boolean
  onFinish: () => void
}) {
  const [ronda, setRonda] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [aciertos, setAciertos] = useState(0)
  const [fin, setFin] = useState(false)
  const r = ejercicio.rondas[ronda]
  const rondas = ejercicio.rondas.length

  function elegir(i: number) {
    if (picked !== null) return
    setPicked(i)
    if (i === r.correcta) setAciertos((a) => a + 1)
  }

  function siguiente() {
    if (ronda >= rondas - 1) {
      setFin(true)
      onFinish()
      return
    }
    setRonda((x) => x + 1)
    setPicked(null)
  }

  function repetir() {
    setRonda(0)
    setPicked(null)
    setAciertos(0)
    setFin(false)
  }

  return (
    <section className="min-w-0 rounded-2xl surface p-5 sm:p-6">
      <header>
        <div className="np-rotulo">
          Etiquetas · ejercicio {n} de {total}
        </div>
        <h2 className="np-display mt-1.5 text-[26px] sm:text-[30px] font-semibold leading-none">{ejercicio.titulo}</h2>
        <p className="mt-2.5 text-[14px] text-muted-foreground leading-relaxed max-w-[720px]">{ejercicio.descripcion}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="np-badge tabular">
            Ronda {Math.min(ronda + 1, rondas)} de {rondas}
          </span>
          <span className="np-badge tabular">Aciertos: {aciertos}</span>
          {isDone && (
            <span className="np-badge np-badge-on">
              <CheckCircle2 className="h-3.5 w-3.5" /> Resuelto
            </span>
          )}
        </div>
      </header>

      {fin ? (
        <div className="mt-6 rounded-xl border p-5 text-center" style={{ borderColor: "var(--border)" }}>
          <div className="np-rotulo">Marcador</div>
          <div className="tabular mt-1 text-[40px] font-semibold leading-none" style={{ color: ACENTO }}>
            {aciertos} / {rondas}
          </div>
          <p className="mt-3 text-[13.5px] text-muted-foreground max-w-[520px] mx-auto leading-relaxed">
            {aciertos === rondas
              ? "Todas. Ya reconoces estas etiquetas sin pensarlo."
              : aciertos >= Math.ceil(rondas * 0.7)
                ? "Bien. Repite el ejercicio hasta que las falladas salgan solas."
                : "Vuelve a la lección 06 y repite: reconocer un rombo tiene que ser automático."}
          </p>
          <button
            onClick={repetir}
            className="mt-4 inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[14px] font-semibold text-white border-0"
            style={{ background: ACENTO }}
          >
            <RotateCcw className="h-4 w-4" /> Repetir el ejercicio
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] items-start">
          <div className="min-w-0">
            <div className="np-rotulo mb-2.5">Enunciado</div>
            <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
              {r.imagen && (
                <img
                  src={rombo(r.imagen)}
                  alt="Etiqueta a reconocer"
                  width={160}
                  height={160}
                  className="mx-auto block h-[160px] w-[160px] object-contain"
                />
              )}
              <p className={`m-0 text-[16px] font-medium leading-[1.55] ${r.imagen ? "mt-4 text-center" : ""}`}>{r.enunciado}</p>
            </div>
          </div>

          <div className="min-w-0">
            <div className="np-rotulo mb-2.5">Elige</div>
            <div className={`grid gap-2.5 ${r.opciones[0]?.imagen ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1"}`}>
              {r.opciones.map((op, i) => {
                const elegida = picked === i
                const esLaBuena = i === r.correcta
                const revelada = picked !== null && (elegida || esLaBuena)
                const tono = esLaBuena ? "var(--av-green-400)" : "var(--av-red-400)"
                return (
                  <button
                    key={i}
                    onClick={() => elegir(i)}
                    aria-pressed={elegida}
                    disabled={picked !== null}
                    className="rounded-xl border p-3 text-left transition-colors disabled:cursor-default"
                    style={{
                      borderColor: revelada ? `color-mix(in oklab, ${tono} 45%, transparent)` : "var(--border)",
                      background: revelada ? `color-mix(in oklab, ${tono} 10%, transparent)` : "transparent",
                    }}
                  >
                    {op.imagen ? (
                      <img src={rombo(op.imagen)} alt={`Opción ${i + 1}`} width={96} height={96} className="mx-auto block h-[96px] w-[96px] object-contain" />
                    ) : (
                      <span className="flex items-start gap-2.5 text-[14.5px] leading-[1.5]">
                        <span className="mono shrink-0 text-[12px] font-semibold text-muted-foreground">{String.fromCharCode(97 + i)}</span>
                        <span>{op.texto}</span>
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {picked !== null && (
              <div className="rev-aparece mt-4 rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
                <div
                  className="text-[13px] font-semibold"
                  style={{ color: accentText(picked === r.correcta ? "var(--av-green-400)" : "var(--av-amber-400)") }}
                >
                  {picked === r.correcta ? "Correcto." : "No es esa."}
                </div>
                <p className="m-0 mt-1 text-[14px] leading-relaxed text-foreground/90">{r.explicacion}</p>
                {r.ref && <div className="mono mt-2 text-[11px] text-muted-foreground">Referencia: {r.ref}</div>}
                <button
                  onClick={siguiente}
                  className="mt-4 inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[14px] font-semibold text-white border-0"
                  style={{ background: ACENTO }}
                >
                  {ronda >= rondas - 1 ? "Ver el marcador" : "Siguiente ronda"} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

// ─── Clasifica ───────────────────────────────────────────────────────────────

function Clasifica({
  caso,
  n,
  total,
  isDone,
  saving,
  onDone,
}: {
  caso: CasoMP
  n: number
  total: number
  isDone: boolean
  saving: boolean
  onDone: () => void
}) {
  const [clase, setClase] = useState<string | null>(null)
  const [ge, setGe] = useState<boolean | null>(null)
  const [revelado, setRevelado] = useState(false)
  const claseOk = clase === caso.clase
  const geOk = ge === caso.ge
  const listo = clase !== null && ge !== null

  return (
    <div className="grid gap-5 xl:gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
      <section className="min-w-0 rounded-2xl surface p-5 sm:p-6">
        <header>
          <div className="np-rotulo">
            Clasifica · caso {n} de {total}
          </div>
          <h2 className="np-display mt-1.5 text-[26px] sm:text-[30px] font-semibold leading-none">Caso {n}</h2>
          {isDone && (
            <div className="mt-3">
              <span className="np-badge np-badge-on">
                <CheckCircle2 className="h-3.5 w-3.5" /> Resuelto
              </span>
            </div>
          )}
        </header>
        <div className="mt-6">
          <div className="np-rotulo mb-2.5">El envío</div>
          <div className="np-tecnico">
            <p className="m-0 text-[15px] leading-[1.7] text-foreground">{caso.texto}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="np-rotulo mb-2.5">¿Qué clase es?</div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
            {CLASES.map((c) => {
              const activa = clase === c.n
              const revelaOk = revelado && c.n === caso.clase
              const revelaMal = revelado && activa && !claseOk
              const borde = revelaOk ? "var(--av-green-400)" : revelaMal ? "var(--av-red-400)" : activa ? ACENTO : "var(--border)"
              return (
                <button
                  key={c.n}
                  onClick={() => !revelado && setClase(c.n)}
                  aria-pressed={activa}
                  disabled={revelado}
                  className="flex flex-col items-center gap-1 rounded-[10px] border px-1 py-2 transition-colors disabled:cursor-default"
                  style={{
                    borderColor: borde,
                    background: revelaOk || activa ? `color-mix(in oklab, ${borde} 10%, transparent)` : "transparent",
                  }}
                >
                  <img src={rombo(c.rombos[0])} alt={`Clase ${c.n}`} width={40} height={40} className="block h-10 w-10 object-contain" />
                  <span className="mono text-[11px] font-semibold">{c.n}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-5">
          <div className="np-rotulo mb-2.5">¿Lleva grupo de embalaje?</div>
          <div className="flex gap-2">
            {[true, false].map((v) => {
              const activa = ge === v
              const revelaOk = revelado && v === caso.ge
              const revelaMal = revelado && activa && !geOk
              const borde = revelaOk ? "var(--av-green-400)" : revelaMal ? "var(--av-red-400)" : activa ? ACENTO : "var(--border)"
              return (
                <button
                  key={String(v)}
                  onClick={() => !revelado && setGe(v)}
                  aria-pressed={activa}
                  disabled={revelado}
                  className="h-10 px-5 rounded-xl border text-[14px] font-semibold transition-colors disabled:cursor-default"
                  style={{ borderColor: borde, background: activa || revelaOk ? `color-mix(in oklab, ${borde} 10%, transparent)` : "transparent" }}
                >
                  {v ? "Sí" : "No"}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="min-w-0 rounded-2xl surface p-5 sm:p-6">
        <SectionTitle icon={PencilLine} eyebrow="Tu clasificación" title="Decide y comprueba" hint="Elige la clase y si lleva grupo de embalaje. Después compara." />
        {!revelado ? (
          <button
            onClick={() => setRevelado(true)}
            disabled={!listo}
            className="w-full inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
            style={{ background: ACENTO }}
          >
            <Eye className="h-4 w-4" /> Comprobar
          </button>
        ) : (
          <div className="rev-aparece">
            <div
              className="rounded-xl border p-3.5 text-[14px] leading-relaxed"
              style={{
                borderColor: `color-mix(in oklab, ${claseOk && geOk ? "var(--av-green-400)" : "var(--av-amber-400)"} 32%, transparent)`,
                background: `color-mix(in oklab, ${claseOk && geOk ? "var(--av-green-400)" : "var(--av-amber-400)"} 8%, transparent)`,
              }}
            >
              <span className="font-semibold">{claseOk && geOk ? "Correcto. " : claseOk ? "La clase sí; el grupo de embalaje no. " : "La clase no era esa. "}</span>
              {caso.respuesta}
            </div>
            <p className="mt-3 mb-0 text-[13.5px] text-foreground/90 leading-relaxed">{caso.explicacion}</p>
            {caso.embalaje && (
              <p className="mt-2 mb-0 text-[12.5px] text-muted-foreground leading-relaxed">
                <span className="font-semibold">Embalaje y transporte:</span> {caso.embalaje}
              </p>
            )}
            <MarcarResuelto isDone={isDone} saving={saving} onDone={onDone} />
          </div>
        )}
      </section>
    </div>
  )
}

// ─── Escenarios ──────────────────────────────────────────────────────────────

function Escenario({
  escenario,
  n,
  total,
  isDone,
  saving,
  onDone,
}: {
  escenario: EscenarioMP
  n: number
  total: number
  isDone: boolean
  saving: boolean
  onDone: () => void
}) {
  const [answer, setAnswer] = useState("")
  const [revealed, setRevealed] = useState(false)
  const [ticked, setTicked] = useState<number[]>([])

  return (
    <div className="grid gap-5 xl:gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
      <section className="min-w-0 rounded-2xl surface p-5 sm:p-6">
        <header>
          <div className="np-rotulo">
            Escenario de práctica · {n} de {total}
          </div>
          <h2 className="np-display mt-1.5 text-[26px] sm:text-[30px] font-semibold leading-[1.05]">{escenario.titulo}</h2>
          {isDone && (
            <div className="mt-3">
              <span className="np-badge np-badge-on">
                <CheckCircle2 className="h-3.5 w-3.5" /> Resuelto
              </span>
            </div>
          )}
        </header>
        <div className="mt-6">
          <div className="np-rotulo mb-2.5">La situación</div>
          <div className="np-tecnico">
            <p className="m-0 text-[15px] leading-[1.7] text-foreground">{escenario.situacion}</p>
          </div>
        </div>
        <div className="mt-5">
          <div className="np-rotulo mb-2.5">Lo que tienes que decidir</div>
          <ol className="m-0 list-none p-0 flex flex-col gap-2">
            {escenario.preguntas.map((q, i) => (
              <li key={i} className="grid grid-cols-[26px_1fr] gap-2.5 text-[14.5px] leading-[1.55]">
                <span
                  className="mono mt-[2px] flex h-[22px] w-[22px] items-center justify-center rounded-[5px] text-[11px] font-semibold"
                  style={{ background: `color-mix(in oklab, ${ACENTO} 14%, transparent)`, color: accentText(ACENTO) }}
                >
                  {i + 1}
                </span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="min-w-0 rounded-2xl surface p-5 sm:p-6">
        <SectionTitle icon={PencilLine} eyebrow="Tu respuesta" title="Resuélvelo con tus palabras" hint="Escribe primero, compara después. Como en un briefing real." />
        <label htmlFor={`esc-${escenario.id}`} className="sr-only">
          Tu respuesta al escenario
        </label>
        <textarea
          id={`esc-${escenario.id}`}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Qué haces, en qué orden, con qué respaldo del reglamento y qué queda después."
          className="w-full min-h-[180px] rounded-xl border border-border bg-background p-3.5 text-[13px] leading-relaxed text-foreground placeholder:text-muted-foreground/70 resize-y focus:outline-none focus:border-foreground/30 transition-colors"
        />
        {!revealed ? (
          <div className="mt-4">
            <button
              onClick={() => setRevealed(true)}
              className="w-full inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
              style={{ background: ACENTO }}
            >
              <Eye className="h-4 w-4" /> Comparar con la respuesta modelo
            </button>
            <p className="mt-2 mb-0 text-[12px] text-muted-foreground leading-relaxed">
              {answer.trim().length < 20 ? "Intenta escribir tu versión completa antes de comparar: es la parte que de verdad te entrena." : "La respuesta modelo aparece solo cuando tú lo pides."}
            </p>
          </div>
        ) : (
          <div className="mt-5 rev-aparece">
            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: accentText("var(--av-green-400)") }}>
              <CheckCircle2 className="h-3.5 w-3.5" /> Respuesta modelo
            </div>
            <p className="mt-2 mb-0 text-[13px] text-foreground/90 leading-relaxed">{escenario.modelo}</p>
            <PuntosClave puntos={escenario.puntos} ticked={ticked} onToggle={(i) => setTicked((t) => (t.includes(i) ? t.filter((x) => x !== i) : [...t, i]))} />
            <MarcarResuelto isDone={isDone} saving={saving} onDone={onDone} />
          </div>
        )}
      </section>
    </div>
  )
}

// ─── Entrevista ──────────────────────────────────────────────────────────────

function Entrevista({
  pregunta,
  n,
  total,
  isDone,
  saving,
  onDone,
}: {
  pregunta: PreguntaEntrevista
  n: number
  total: number
  isDone: boolean
  saving: boolean
  onDone: () => void
}) {
  const [answer, setAnswer] = useState("")
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="grid gap-5 xl:gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
      <section className="min-w-0 rounded-2xl surface p-5 sm:p-6">
        <header>
          <div className="np-rotulo">
            Lo que podrían preguntarte · {n} de {total}
          </div>
          <h2 className="np-display mt-1.5 text-[24px] sm:text-[28px] font-semibold leading-[1.15]">{pregunta.pregunta}</h2>
          {isDone && (
            <div className="mt-3">
              <span className="np-badge np-badge-on">
                <CheckCircle2 className="h-3.5 w-3.5" /> Ensayada
              </span>
            </div>
          )}
        </header>
        <p className="mt-5 mb-0 text-[13.5px] text-muted-foreground leading-relaxed">
          Respóndela en voz alta como si estuvieras frente al panel, y escribe lo esencial. Después compara: no se
          trata de recitar, sino de decir lo correcto con el artículo que lo respalda.
        </p>
        <label htmlFor={`ent-${pregunta.n}`} className="sr-only">
          Tu respuesta
        </label>
        <textarea
          id={`ent-${pregunta.n}`}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Lo esencial de tu respuesta, con el artículo si lo recuerdas."
          className="mt-4 w-full min-h-[140px] rounded-xl border border-border bg-background p-3.5 text-[13px] leading-relaxed text-foreground placeholder:text-muted-foreground/70 resize-y focus:outline-none focus:border-foreground/30 transition-colors"
        />
      </section>

      <section className="min-w-0 rounded-2xl surface p-5 sm:p-6">
        <SectionTitle icon={MessageSquareText} eyebrow="Respuesta modelo" title="Compara" hint="Y fíjate en qué está evaluando el entrevistador con esa pregunta." />
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="w-full inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5"
            style={{ background: ACENTO }}
          >
            <Eye className="h-4 w-4" /> Ver la respuesta modelo
          </button>
        ) : (
          <div className="rev-aparece">
            <p className="m-0 text-[13.5px] text-foreground/90 leading-relaxed">{pregunta.respuesta}</p>
            <div className="mt-4 rounded-xl border p-3.5" style={{ borderColor: `color-mix(in oklab, ${ACENTO} 30%, transparent)`, background: `color-mix(in oklab, ${ACENTO} 6%, transparent)` }}>
              <div className="np-rotulo">Qué evalúan</div>
              <p className="m-0 mt-1 text-[13px] leading-relaxed text-foreground/90">{pregunta.evaluan}</p>
            </div>
            <MarcarResuelto isDone={isDone} saving={saving} onDone={onDone} label="Marcar como ensayada" done="Ya la ensayaste" />
          </div>
        )}
      </section>
    </div>
  )
}

// ─── Piezas ──────────────────────────────────────────────────────────────────

function PuntosClave({ puntos, ticked, onToggle }: { puntos: string[]; ticked: number[]; onToggle: (i: number) => void }) {
  const ratio = puntos.length > 0 ? ticked.length / puntos.length : 0
  const color = ratio >= 0.8 ? "var(--av-green-400)" : ratio >= 0.5 ? "var(--av-amber-400)" : "var(--av-red-400)"
  return (
    <div className="mt-5">
      <div className="flex items-center gap-1.5 text-[13px] font-semibold">
        <ListChecks className="h-4 w-4" style={{ color: ACENTO }} />
        Puntos clave
      </div>
      <p className="mt-1 mb-2.5 text-[12px] text-muted-foreground leading-relaxed">Tilda los que sí mencionaste. El conteo es orientativo, para que veas qué se te escapó.</p>
      <ul className="m-0 p-0 list-none space-y-1.5">
        {puntos.map((p, i) => {
          const on = ticked.includes(i)
          return (
            <li key={i}>
              <label
                className="flex items-start gap-2.5 rounded-lg border p-2.5 cursor-pointer transition-colors"
                style={{
                  borderColor: on ? "color-mix(in oklab, var(--av-green-400) 38%, transparent)" : "var(--border)",
                  background: on ? "color-mix(in oklab, var(--av-green-400) 9%, transparent)" : "transparent",
                }}
              >
                <input type="checkbox" checked={on} onChange={() => onToggle(i)} className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ accentColor: "var(--av-green-400)" }} />
                <span className="text-[13px] leading-snug text-foreground/90">{p}</span>
              </label>
            </li>
          )
        })}
      </ul>
      {ticked.length > 0 && (
        <div
          className="mt-3 rounded-lg p-3 text-[13px] leading-relaxed"
          style={{ color: accentText(color), background: `color-mix(in oklab, ${color} 10%, transparent)`, border: `1px solid color-mix(in oklab, ${color} 28%, transparent)` }}
        >
          <span className="font-semibold tabular">
            Mencionaste {ticked.length} de {puntos.length} puntos clave.
          </span>
        </div>
      )}
    </div>
  )
}

function MarcarResuelto({
  isDone,
  saving,
  onDone,
  label = "Marcar como resuelto",
  done = "Ya lo marcaste como resuelto",
}: {
  isDone: boolean
  saving: boolean
  onDone: () => void
  label?: string
  done?: string
}) {
  return (
    <div className="mt-5 pt-4 border-t border-border">
      <div className="flex items-start gap-2 text-[12px] text-muted-foreground leading-relaxed">
        <BookMarked className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
        <span>Fuente: LAR 175 (Enmienda 4), Instrucciones Técnicas y las lecciones del módulo.</span>
      </div>
      {isDone ? (
        <div
          className="mt-3 inline-flex items-center gap-1.5 h-11 px-4 rounded-xl text-[13px] font-semibold w-full justify-center"
          style={{
            color: accentText("var(--av-green-400)"),
            background: "color-mix(in oklab, var(--av-green-400) 10%, transparent)",
            border: "1px solid color-mix(in oklab, var(--av-green-400) 32%, transparent)",
          }}
        >
          <CheckCircle2 className="h-4 w-4" /> {done}
        </div>
      ) : (
        <button
          onClick={onDone}
          disabled={saving}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl text-[15px] font-semibold text-white border-0 transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
          style={{ background: "var(--av-green-400)" }}
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Guardando
            </>
          ) : (
            <>
              <Check className="h-4 w-4" strokeWidth={3} /> {label}
            </>
          )}
        </button>
      )}
    </div>
  )
}

function ModeButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className="inline-flex items-center justify-center gap-2 h-11 px-3 rounded-lg text-[13px] font-semibold transition-colors text-center"
      style={{ background: active ? ACENTO : "transparent", color: active ? "white" : "var(--muted-foreground)" }}
    >
      {icon}
      <span className="truncate">{label}</span>
    </button>
  )
}
