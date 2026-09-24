import { useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  History,
  RotateCcw,
  Signpost,
} from "lucide-react"
import { useSession } from "@/hooks/useSession"
import { accentText } from "@/lib/tileColors"
import { registrarEstudioDiario } from "@/lib/activity"
import { AP_ACENTO, AP_HUB, AP_TITULO, readAeropuertosLocal } from "@/lib/aeropuertos"
import { fetchAeropuertosProgress, markAeropuertosProgress, pushPendingAeropuertos } from "@/lib/aeropuertosProgress"
import {
  AP_CAMBIO,
  AP_DECIDE,
  AP_PRACTICA_AVISO,
  AP_PRACTICA_TOTALES,
  AP_RECONOCE,
  claveCambio,
  claveDecide,
  claveReconoce,
  type ApHueco,
} from "@/lib/aeropuertosPractica"

/**
 * Práctica de Aeropuertos (ruta /app/aerolinea/aeropuertos/practica).
 *
 * La casa es la de la práctica de Mercancías: cabecera, pestañas de modo,
 * barra de avance, tira de saltos con lo resuelto en verde y el ejercicio
 * debajo. Cambia lo que practica, porque este módulo es visual:
 *
 *   Reconoce  → se muestra la imagen y se dice qué es
 *   Decide    → una situación corta con cuatro salidas y una sola buena
 *   Cambió    → lo que trajo la Enmienda 18 y lo que vence en 2026
 *
 * Se responde tocando: al elegir, la tarjeta se abre con la explicación y el
 * ejercicio queda marcado. El avance vive en este navegador, con la misma
 * clave del módulo, porque Aeropuertos todavía no tiene tabla propia.
 *
 * El acento es el violeta del módulo, el mismo que usan la tarjeta del hub y
 * el lector. Va como variable en la raíz de la pantalla para que el día que el
 * módulo tenga sus tokens --av-ap-* solo cambie esta línea.
 */

const ACENTO = "var(--ap-acento)"

type Modo = "reconoce" | "decide" | "cambio"

const MODOS: { key: Modo; label: string; icono: ReactNode; total: number; verbo: string }[] = [
  {
    key: "reconoce",
    label: "Qué estás viendo",
    icono: <Eye className="h-4 w-4" />,
    total: AP_PRACTICA_TOTALES.reconoce,
    verbo: "reconocidos",
  },
  {
    key: "decide",
    label: "Dónde paras",
    icono: <Signpost className="h-4 w-4" />,
    total: AP_PRACTICA_TOTALES.decide,
    verbo: "resueltos",
  },
  {
    key: "cambio",
    label: "Lo que cambió",
    icono: <History className="h-4 w-4" />,
    total: AP_PRACTICA_TOTALES.cambio,
    verbo: "resueltos",
  },
]

function clavesDe(modo: Modo): string[] {
  switch (modo) {
    case "reconoce":
      return AP_RECONOCE.map((e) => claveReconoce(e.id))
    case "decide":
      return AP_DECIDE.map((e) => claveDecide(e.id))
    case "cambio":
      return AP_CAMBIO.map((e) => claveCambio(e.id))
  }
}

export function AeropuertosPractice() {
  const [modo, setModo] = useState<Modo>("reconoce")
  const [idx, setIdx] = useState(0)
  const [hechos, setHechos] = useState<string[]>(() => readAeropuertosLocal().practiceDone)
  const { user } = useSession()

  // Lo resuelto en la base, y de paso sube lo que se resolvió sin sesión. Si
  // falla (o la tabla todavía no existe), se sigue con lo del navegador.
  useEffect(() => {
    const uid = user?.id
    if (!uid) return
    let cancelado = false
    void (async () => {
      const traido = await fetchAeropuertosProgress(uid)
      if (cancelado || !traido) return
      const remoto = await pushPendingAeropuertos(traido)
      if (cancelado || remoto.practiceDone.length === 0) return
      setHechos((prev) => Array.from(new Set([...prev, ...remoto.practiceDone])))
    })()
    return () => {
      cancelado = true
    }
  }, [user?.id])

  const claves = useMemo(() => clavesDe(modo), [modo])
  const total = claves.length
  const iSeguro = Math.min(idx, Math.max(0, total - 1))
  const clave = claves[iSeguro]
  const yaEsta = hechos.includes(clave)
  const hechosAqui = claves.filter((k) => hechos.includes(k)).length
  const pct = total > 0 ? Math.round((hechosAqui / total) * 100) : 0
  const activo = MODOS.find((m) => m.key === modo)

  function marcar(k: string): void {
    if (hechos.includes(k)) return
    setHechos((prev) => (prev.includes(k) ? prev : [...prev, k]))
    void markAeropuertosProgress({ practiceId: k })
    void registrarEstudioDiario("aeropuertos-practica")
  }

  function cambiarModo(m: Modo): void {
    setModo(m)
    setIdx(0)
  }

  const reconoce = AP_RECONOCE[iSeguro]
  const decide = AP_DECIDE[iSeguro]
  const cambio = AP_CAMBIO[iSeguro]

  return (
    <div
      className="notam-practica mx-auto max-w-[1100px] px-4 py-9 pb-20 sm:px-7 sm:py-11"
      style={{ "--ap-acento": AP_ACENTO } as React.CSSProperties}
    >
      <Link
        to={AP_HUB}
        className="mb-4 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Volver a {AP_TITULO}
      </Link>

      <header className="np-hero relative mb-8 overflow-hidden rounded-[18px] bg-[#1B1430]">
        <img
          className="np-hero-foto"
          src="/modulos/aeropuertos/ap-pra-01-practica.webp"
          alt="Vista al atardecer de calles de rodaje iluminadas junto a una pista y la torre de control"
        />
        <div className="np-hero-velo" />
        <div className="relative px-6 py-11 text-center sm:px-10 sm:py-14">
          <div className="np-hero-rotulo">
            <Eye className="h-3.5 w-3.5" /> Aeropuertos · Práctica
          </div>
          <h1 className="np-display mx-auto mt-4 max-w-[880px] text-[30px] font-semibold leading-[1.1] text-white sm:text-[40px]">
            Practica lo que tienes que reconocer
          </h1>
          <p className="mx-auto mt-5 max-w-[720px] text-[15px] leading-[1.7] text-white/80 sm:text-[16px]">
            Di qué señal, letrero, luz o baliza estás viendo; resuelve situaciones de rodaje, de
            aproximación y de plataforma; y ponte al día con lo que cambió en la norma y todavía
            no está en casi ningún material. Cada respuesta trae su explicación.
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
      <section className="surface min-w-0 rounded-2xl p-5 sm:p-6">
        <div
          className="grid gap-2 rounded-xl p-1 sm:grid-cols-3"
          style={{ background: "color-mix(in oklab, var(--border) 35%, transparent)" }}
          role="group"
          aria-label="Tipo de ejercicio"
        >
          {MODOS.map((m) => {
            const on = modo === m.key
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => cambiarModo(m.key)}
                aria-pressed={on}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-3 text-center text-[13px] font-semibold transition-colors"
                style={{ background: on ? ACENTO : "transparent", color: on ? "white" : "var(--muted-foreground)" }}
              >
                {m.icono}
                <span className="truncate">
                  {m.label} ({m.total})
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-5">
          <div className="flex items-end justify-between gap-3">
            <div className="text-[13px] font-semibold text-foreground">
              <span className="tabular">{hechosAqui}</span> de <span className="tabular">{total}</span>{" "}
              {activo?.verbo}
            </div>
            <div className="tabular text-[12px] text-muted-foreground">{pct}%</div>
          </div>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full"
            style={{ background: "color-mix(in oklab, var(--border) 60%, transparent)" }}
            role="progressbar"
            aria-valuenow={hechosAqui}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label="Progreso del tipo activo"
          >
            <div className="h-full rounded-full transition-[width]" style={{ width: `${pct}%`, background: ACENTO }} />
          </div>
        </div>

        <div className="mt-5">
          <div className="np-rotulo mb-2">Salta al que quieras</div>
          <div className="flex flex-wrap gap-1">
            {claves.map((k, i) => {
              const on = i === iSeguro
              const hecho = hechos.includes(k)
              const color = hecho ? "var(--av-green-400)" : ACENTO
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Ir al ${i + 1} de ${total}${hecho ? ", ya resuelto" : ""}`}
                  aria-current={on ? "true" : undefined}
                  className="np-salto tabular relative inline-flex items-center justify-center rounded-[6px] border transition-colors"
                  style={{
                    color: on ? "white" : hecho ? accentText(color) : "var(--muted-foreground)",
                    background: on ? color : hecho ? `color-mix(in oklab, ${color} 12%, transparent)` : "transparent",
                    borderColor: on ? color : hecho ? `color-mix(in oklab, ${color} 40%, transparent)` : "var(--border)",
                  }}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground">
            En verde los que ya resolviste.
          </div>
        </div>
      </section>

      {/* === EJERCICIO ACTIVO === */}
      <div className="mt-6">
        {modo === "reconoce" && reconoce && (
          <Ejercicio
            key={clave}
            rotulo={`Qué estás viendo · ${iSeguro + 1} de ${total}`}
            titulo={reconoce.pregunta}
            pastillas={[`Nivel ${reconoce.nivel}`, `Lección ${pad(reconoce.leccion)}`, reconoce.familia]}
            hecho={yaEsta}
            opciones={reconoce.opciones}
            correcta={reconoce.correcta}
            explicacion={reconoce.explicacion}
            onResponder={() => marcar(clave)}
          >
            {reconoce.imagen ? (
              <figure className="m-0">
                <img
                  src={reconoce.imagen.src}
                  alt={reconoce.imagen.alt}
                  className="block w-full rounded-xl object-cover"
                  loading="lazy"
                />
                <figcaption className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                  {reconoce.imagen.pie}
                  {reconoce.imagen.fuente && (
                    <a
                      href={reconoce.imagen.fuente}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 underline underline-offset-2 hover:text-foreground"
                    >
                      Abrir carta oficial en PDF
                    </a>
                  )}
                </figcaption>
              </figure>
            ) : reconoce.hueco ? (
              <Hueco hueco={reconoce.hueco} />
            ) : null}
          </Ejercicio>
        )}

        {modo === "decide" && decide && (
          <Ejercicio
            key={clave}
            rotulo={`Dónde paras · ${iSeguro + 1} de ${total}`}
            titulo={decide.pregunta}
            pastillas={[`Nivel ${decide.nivel}`, `Lección ${pad(decide.leccion)}`, decide.momento]}
            hecho={yaEsta}
            opciones={decide.opciones}
            correcta={decide.correcta}
            explicacion={decide.explicacion}
            onResponder={() => marcar(clave)}
          >
            <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
              <div className="np-rotulo mb-2">La situación</div>
              <p className="m-0 text-[15.5px] leading-[1.6] text-foreground">{decide.situacion}</p>
            </div>
          </Ejercicio>
        )}

        {modo === "cambio" && cambio && (
          <Ejercicio
            key={clave}
            rotulo={`Lo que cambió · ${iSeguro + 1} de ${total}`}
            titulo={cambio.pregunta}
            pastillas={[`Nivel ${cambio.nivel}`, `Lección ${pad(cambio.leccion)}`]}
            fecha={cambio.fecha}
            hecho={yaEsta}
            opciones={cambio.opciones}
            correcta={cambio.correcta}
            explicacion={cambio.explicacion}
            extra={{ titulo: "Lo que dice el material viejo", texto: cambio.antes }}
            onResponder={() => marcar(clave)}
          />
        )}
      </div>

      {/* === NAVEGACIÓN === */}
      <nav className="mt-6 flex items-center justify-between gap-3" aria-label="Navegación de ejercicios">
        <button
          type="button"
          onClick={() => setIdx(Math.max(0, iSeguro - 1))}
          disabled={iSeguro === 0}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-border px-4 text-[13px] font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" /> Anterior
        </button>
        <span className="tabular text-[13px] text-muted-foreground">
          {iSeguro + 1} de {total}
        </span>
        <button
          type="button"
          onClick={() => setIdx(Math.min(total - 1, iSeguro + 1))}
          disabled={iSeguro >= total - 1}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border-0 px-4 text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
          style={{ background: ACENTO }}
        >
          Siguiente <ChevronRight className="h-4 w-4" />
        </button>
      </nav>

      <p className="np-aviso mt-8">
        <CalendarClock className="h-3 w-3 shrink-0" aria-hidden="true" />
        <span>{AP_PRACTICA_AVISO}</span>
      </p>
    </div>
  )
}

/** Las lecciones se nombran con dos cifras en todo el módulo. */
function pad(n: number): string {
  return String(n).padStart(2, "0")
}

// ─── Piezas ──────────────────────────────────────────────────────────────────

/**
 * Reserva visible de un material oficial pendiente de verificar, rotulada con
 * su código y medida. No se sustituye una carta aeronáutica por una inventada.
 */
function Hueco({ hueco }: { hueco: ApHueco }) {
  return (
    <figure className="m-0">
      <div
        className="flex min-h-[210px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-7 text-center"
        style={{
          background: "color-mix(in oklab, var(--border) 22%, transparent)",
          borderColor: `color-mix(in oklab, ${ACENTO} 35%, var(--border))`,
        }}
      >
        <span
          className="rotulo text-[11px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: accentText(ACENTO) }}
        >
          {hueco.codigo} · {hueco.medida}
        </span>
        <span className="max-w-[560px] text-[13.5px] leading-[1.55] text-muted-foreground">
          {hueco.descripcion}
        </span>
      </div>
      <figcaption className="mt-2 text-[12px] text-muted-foreground">
        La imagen todavía no existe. Lee el hueco como si fuera la foto y responde con eso.
      </figcaption>
    </figure>
  )
}

/**
 * Un ejercicio, el mismo para los tres tipos: enunciado a la izquierda (una
 * imagen, una situación o nada), cuatro opciones a la derecha y la explicación
 * al responder. Se responde tocando y con eso queda resuelto.
 */
function Ejercicio({
  rotulo,
  titulo,
  pastillas,
  fecha,
  hecho,
  opciones,
  correcta,
  explicacion,
  extra,
  children,
  onResponder,
}: {
  rotulo: string
  titulo: string
  pastillas: string[]
  fecha?: string
  hecho: boolean
  opciones: string[]
  correcta: number
  explicacion: string
  extra?: { titulo: string; texto: string }
  children?: ReactNode
  onResponder: () => void
}) {
  const [elegida, setElegida] = useState<number | null>(null)
  const respondida = elegida !== null

  function elegir(i: number): void {
    if (respondida) return
    setElegida(i)
    onResponder()
  }

  return (
    <section className="surface min-w-0 rounded-2xl p-5 sm:p-6">
      <header>
        <div className="np-rotulo">{rotulo}</div>
        <h2 className="np-display mt-1.5 text-[21px] font-semibold leading-[1.25] sm:text-[24px]">{titulo}</h2>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {pastillas.map((p) => (
            <span key={p} className="np-badge">
              {p}
            </span>
          ))}
          {fecha && (
            <span className="np-badge">
              <CalendarClock className="h-3.5 w-3.5" /> {fecha}
            </span>
          )}
          {hecho && (
            <span className="np-badge np-badge-on">
              <CheckCircle2 className="h-3.5 w-3.5" /> Resuelto
            </span>
          )}
        </div>
      </header>

      <div
        className={`mt-5 grid items-start gap-5 ${children ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" : ""}`}
      >
        {children && <div className="min-w-0">{children}</div>}

        <div className="min-w-0">
          <div className="np-rotulo mb-2.5">Elige</div>
          <div className="grid gap-2.5">
            {opciones.map((op, i) => {
              const esta = elegida === i
              const buena = i === correcta
              const revelada = respondida && (esta || buena)
              const tono = buena ? "var(--av-green-400)" : "var(--av-red-400)"
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => elegir(i)}
                  aria-pressed={esta}
                  disabled={respondida}
                  className="rounded-xl border p-3.5 text-left transition-colors disabled:cursor-default"
                  style={{
                    borderColor: revelada ? `color-mix(in oklab, ${tono} 45%, transparent)` : "var(--border)",
                    background: revelada ? `color-mix(in oklab, ${tono} 10%, transparent)` : "transparent",
                  }}
                >
                  <span className="flex items-start gap-2.5 text-[14.5px] leading-[1.5]">
                    <span className="mono shrink-0 text-[12px] font-semibold text-muted-foreground">
                      {String.fromCharCode(97 + i)}
                    </span>
                    <span>{op}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {respondida && (
            <div className="rev-aparece mt-4 rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
              <div
                className="text-[13px] font-semibold"
                style={{
                  color: accentText(elegida === correcta ? "var(--av-green-400)" : "var(--av-amber-400)"),
                }}
              >
                {elegida === correcta ? "Correcto." : "No es esa."}
              </div>
              <p className="m-0 mt-1.5 text-[14px] leading-relaxed text-foreground/90">{explicacion}</p>

              {extra && (
                <div
                  className="mt-3.5 rounded-lg border p-3"
                  style={{
                    borderColor: `color-mix(in oklab, ${ACENTO} 30%, transparent)`,
                    background: `color-mix(in oklab, ${ACENTO} 7%, transparent)`,
                  }}
                >
                  <div
                    className="rotulo text-[10.5px] font-semibold uppercase tracking-[0.12em]"
                    style={{ color: accentText(ACENTO) }}
                  >
                    {extra.titulo}
                  </div>
                  <p className="m-0 mt-1 text-[13.5px] leading-[1.55] text-foreground/85">{extra.texto}</p>
                </div>
              )}

              <button
                type="button"
                onClick={() => setElegida(null)}
                className="mt-4 inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-border px-4 text-[13px] font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Volver a intentarlo
              </button>
            </div>
          )}

          {!respondida && hecho && (
            <div className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <Check className="h-3.5 w-3.5" strokeWidth={3} style={{ color: "var(--av-green-400)" }} />
              Ya lo habías resuelto. Vuelve a responder para repasarlo.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
