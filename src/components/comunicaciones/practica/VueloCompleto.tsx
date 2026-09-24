import { useState } from "react"
import { ChevronRight, Plane } from "lucide-react"
import { accentText } from "@/lib/tileColors"
import { NOMBRE_PERFIL } from "@/lib/radio"
import {
  puntajeVuelo,
  transmisionesDe,
  type EjVueloCompleto,
  type ResultadoEjercicio,
} from "@/lib/comunicacionesPractica"
import { EjercicioCm } from "./EjercicioCm"
import { Anuncio, Explicacion } from "./piezas"
import { ACENTO, BOTON_PRIMARIO, BOTON_SECUNDARIO, tinte } from "./tokens"
import type { PropsEjercicio } from "./tipos"

/**
 * 10. Vuelo completo: encadena pasos de los otros nueve tipos en un vuelo de
 * 15 a 20 transmisiones, de la autorización a la plataforma. La radio empeora
 * por tramos (cada paso trae su perfil) y al final hay un puntaje único.
 *
 * Cada paso se monta de nuevo (key por índice): su contador de repeticiones y
 * su estado empiezan en cero.
 */
export function VueloCompleto({ item, modoExamen = false, onResultado, reproductor }: PropsEjercicio<EjVueloCompleto>) {
  const [paso, setPaso] = useState(0)
  const [resultados, setResultados] = useState<(ResultadoEjercicio | undefined)[]>([])
  const [fin, setFin] = useState(false)

  const total = item.pasos.length
  const actual = item.pasos[paso]
  const transmisiones = item.pasos.reduce((n, p) => n + transmisionesDe(p.ejercicio).length, 0)
  const resuelto = resultados[paso] !== undefined
  const puntaje = puntajeVuelo(resultados)

  function guardar(r: ResultadoEjercicio) {
    // Cuenta el primer intento: en el vuelo no se vuelve atrás.
    setResultados((prev) => {
      if (prev[paso] !== undefined) return prev
      const nuevo = [...prev]
      nuevo[paso] = r
      return nuevo
    })
  }

  function siguiente() {
    if (paso + 1 < total) {
      setPaso(paso + 1)
      return
    }
    setFin(true)
    onResultado?.({ aciertos: puntaje.aciertos, total: puntaje.total })
  }

  function reiniciar() {
    setPaso(0)
    setResultados([])
    setFin(false)
  }

  const pct = Math.round(((fin ? total : paso) / total) * 100)

  return (
    <div className="grid gap-5">
      <section className="surface rounded-2xl p-5 sm:p-6" aria-label="Vuelo completo">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: accentText(ACENTO) }}>
          <Plane className="h-3.5 w-3.5" aria-hidden="true" /> Vuelo completo · {transmisiones} transmisiones
        </div>
        <h2 className="mt-1.5 text-[20px] font-semibold leading-[1.25] text-foreground sm:text-[22px]">{item.titulo}</h2>
        <p className="m-0 mt-2 text-[14px] text-muted-foreground">{item.explicacion}</p>

        <div className="mt-4 flex items-end justify-between gap-3 text-[13px]">
          <span className="font-semibold text-foreground">
            {fin ? "Vuelo terminado" : `Paso ${paso + 1} de ${total} · ${actual?.fase ?? ""}`}
          </span>
          {!fin && actual && <span className="text-muted-foreground">{NOMBRE_PERFIL[actual.perfil]}</span>}
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full"
          style={{ background: tinte("var(--border)", 60) }}
          role="progressbar"
          aria-valuenow={fin ? total : paso}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label="Avance del vuelo"
        >
          <div className="h-full rounded-full transition-[width]" style={{ width: `${pct}%`, background: ACENTO }} />
        </div>
      </section>

      {!fin && actual && (
        <EjercicioCm
          key={paso}
          item={actual.ejercicio}
          perfil={actual.perfil}
          modoExamen={modoExamen}
          onResultado={guardar}
          reproductor={reproductor}
        />
      )}

      {!fin && (
        <div className="flex justify-end">
          <button type="button" onClick={siguiente} disabled={!resuelto} className={BOTON_PRIMARIO} style={{ background: ACENTO }}>
            {paso + 1 < total ? "Siguiente paso" : "Terminar el vuelo"} <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      <Anuncio>
        {fin && (
          <section className="surface grid gap-3 rounded-2xl p-5 sm:p-6" aria-label="Resultado del vuelo">
            <div className="text-[28px] font-semibold tabular-nums text-foreground">{puntaje.porcentaje}%</div>
            <Explicacion puntaje={`${puntaje.aciertos} de ${puntaje.total} elementos bien en ${total} pasos`}>
              Cada paso cuenta lo que tiene: campos copiados, elementos de la colación, transmisiones bien decididas.
            </Explicacion>
            <ol className="m-0 grid list-none gap-1 p-0 text-[13.5px]">
              {item.pasos.map((p, i) => {
                const r = resultados[i]
                return (
                  <li key={i} className="flex justify-between gap-3">
                    <span className="text-foreground">
                      {i + 1}. {p.fase}
                    </span>
                    <span className="tabular-nums text-muted-foreground">{r ? `${r.aciertos}/${r.total}` : "sin responder"}</span>
                  </li>
                )
              })}
            </ol>
            <button type="button" onClick={reiniciar} className={`${BOTON_SECUNDARIO} justify-self-start`}>
              Volar otra vez
            </button>
          </section>
        )}
      </Anuncio>
    </div>
  )
}
