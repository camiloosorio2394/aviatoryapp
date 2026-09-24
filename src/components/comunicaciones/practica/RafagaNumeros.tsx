import { useEffect, useId, useRef, useState } from "react"
import { Radio, Timer } from "lucide-react"
import { calificarDictado, type Dictado, type EjRafaga, type TipoDictado } from "@/lib/comunicacionesPractica"
import { useRadio } from "@/hooks/useRadio"
import { NOMBRE_PERFIL } from "@/lib/radio"
import { Anuncio, Explicacion, TarjetaEjercicio, Transcripcion, Veredicto } from "./piezas"
import { ACENTO, ALERTA, BOTON_PRIMARIO, BOTON_SECUNDARIO, FOCO, borde } from "./tokens"
import type { PropsEjercicio } from "./tipos"

/**
 * 8. Ráfaga de números: dictados cortos (squawk, frecuencia, QNH, matrícula
 * deletreada, rumbo) contra reloj. El reloj arranca cuando termina de sonar
 * cada dictado; al vencer, lo escrito se da por respuesta.
 */

const QUE_ES: Record<TipoDictado, string> = {
  squawk: "Squawk",
  frecuencia: "Frecuencia",
  qnh: "QNH",
  matricula: "Matrícula",
  rumbo: "Rumbo",
  pista: "Pista",
  nivel: "Nivel",
}

interface Respuesta {
  texto: string
  segundos: number
  ok: boolean
  aTiempo: boolean
}

export function RafagaNumeros({ item, perfil, modoExamen = false, onResultado, reproductor }: PropsEjercicio<EjRafaga>) {
  const radio = useRadio({ limiteRepeticiones: item.repeticiones ?? 0, modoExamen, perfil, reproductor })
  const [idx, setIdx] = useState(0)
  const [fase, setFase] = useState<"espera" | "sonando" | "escribiendo" | "fin">("espera")
  const [texto, setTexto] = useState("")
  const [restante, setRestante] = useState(item.segundos)
  const [respuestas, setRespuestas] = useState<Respuesta[]>([])
  const entrada = useRef<HTMLInputElement>(null)
  const reloj = useRef<ReturnType<typeof setInterval> | null>(null)
  const desde = useRef(0)
  const textoActual = useRef("")
  const idEntrada = useId()

  const dictado: Dictado | undefined = item.dictados[idx]
  const perfilActivo = perfil ?? dictado?.transmision.perfil ?? "normal"

  useEffect(
    () => () => {
      if (reloj.current) clearInterval(reloj.current)
    },
    [],
  )

  function pararReloj() {
    if (reloj.current) clearInterval(reloj.current)
    reloj.current = null
  }

  function registrar() {
    if (!dictado) return
    pararReloj()
    const segundos = (Date.now() - desde.current) / 1000
    const r = calificarDictado(dictado, textoActual.current, segundos, item.segundos)
    const nuevas = [...respuestas, { texto: textoActual.current, segundos, ...r }]
    setRespuestas(nuevas)
    setTexto("")
    textoActual.current = ""
    if (idx + 1 >= item.dictados.length) {
      setFase("fin")
      onResultado?.({ aciertos: nuevas.filter((x) => x.ok).length, total: item.dictados.length })
    } else {
      setIdx(idx + 1)
      setFase("espera")
    }
  }

  async function sonar() {
    if (!dictado) return
    setFase("sonando")
    await radio.escuchar(dictado.transmision)
    setFase("escribiendo")
    desde.current = Date.now()
    setRestante(item.segundos)
    entrada.current?.focus()
    pararReloj()
    reloj.current = setInterval(() => {
      const quedan = Math.max(0, item.segundos - (Date.now() - desde.current) / 1000)
      setRestante(Math.ceil(quedan))
      if (quedan <= 0) registrar()
    }, 250)
  }

  function reiniciar() {
    pararReloj()
    setIdx(0)
    setFase("espera")
    setRespuestas([])
    setTexto("")
    textoActual.current = ""
    radio.reiniciar()
  }

  const correctas = respuestas.filter((r) => r.ok).length

  return (
    <TarjetaEjercicio rotulo="Ráfaga de números" titulo={`${item.dictados.length} dictados, ${item.segundos} segundos cada uno`} fuente={item.fuente}>
      {fase !== "fin" && dictado && (
        <div className="grid gap-3 rounded-xl border p-4" style={{ borderColor: borde(ACENTO, 30) }}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[13px] font-semibold text-foreground">
              {idx + 1} de {item.dictados.length} · {QUE_ES[dictado.tipo]}
            </span>
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{NOMBRE_PERFIL[perfilActivo]}</span>
          </div>

          {fase === "espera" && (
            <button type="button" onClick={() => void sonar()} className={`${BOTON_PRIMARIO} justify-self-start`} style={{ background: ACENTO }}>
              <Radio className="h-4 w-4" aria-hidden="true" /> {idx === 0 ? "Empezar" : "Siguiente dictado"}
            </button>
          )}
          {fase === "sonando" && <p className="m-0 text-[13px] text-muted-foreground">En frecuencia…</p>}

          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (fase === "escribiendo") registrar()
            }}
            className="flex flex-wrap items-end gap-2"
          >
            <div className="grid min-w-[180px] flex-1 gap-1.5">
              <label htmlFor={idEntrada} className="text-[12.5px] font-semibold text-foreground">
                {QUE_ES[dictado.tipo]}
              </label>
              <input
                ref={entrada}
                id={idEntrada}
                type="text"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                disabled={fase !== "escribiendo"}
                value={texto}
                onChange={(e) => {
                  setTexto(e.target.value)
                  textoActual.current = e.target.value
                }}
                className={`min-h-[48px] rounded-lg border bg-transparent px-3 font-mono text-[20px] uppercase tabular-nums text-foreground disabled:opacity-50 ${FOCO}`}
                style={{ borderColor: "var(--border)" }}
              />
            </div>
            <button type="submit" disabled={fase !== "escribiendo"} className={BOTON_SECUNDARIO}>
              Listo
            </button>
          </form>

          {fase === "escribiendo" && (
            <div
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold tabular-nums"
              style={{ color: restante <= 3 ? `color-mix(in oklab, ${ALERTA} 70%, var(--foreground))` : "var(--muted-foreground)" }}
              aria-live={restante <= 3 ? "assertive" : "off"}
            >
              <Timer className="h-4 w-4" aria-hidden="true" /> {restante} s
            </div>
          )}
        </div>
      )}

      <Anuncio>
        {fase === "fin" && (
          <div className="grid gap-3">
            <ul className="m-0 grid list-none gap-1.5 p-0">
              {item.dictados.map((d, i) => {
                const r = respuestas[i]
                return (
                  <li key={d.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2" style={{ borderColor: "var(--border)" }}>
                    <span className="text-[13.5px] text-foreground">
                      {QUE_ES[d.tipo]}: <span className="font-mono">{r?.texto || "(vacío)"}</span>
                    </span>
                    <Veredicto
                      ok={!!r?.ok}
                      texto={r?.ok ? "Bien" : r && !r.aTiempo ? `Fuera de tiempo. Era ${d.esperado}` : `Era ${d.esperado}`}
                    />
                  </li>
                )
              })}
            </ul>
            <Explicacion puntaje={`${correctas} de ${item.dictados.length} a tiempo y bien`}>{item.explicacion}</Explicacion>
            {!modoExamen && (
              <button type="button" onClick={reiniciar} className={`${BOTON_SECUNDARIO} justify-self-start`}>
                Volver a intentarlo
              </button>
            )}
          </div>
        )}
      </Anuncio>
      <Transcripcion
        transmisiones={fase === "fin" ? item.dictados.map((d) => d.transmision) : dictado ? [dictado.transmision] : []}
        visible={fase === "fin" || (radio.fuente === "texto" && fase === "escribiendo")}
      />
    </TarjetaEjercicio>
  )
}
