import { useState } from "react"
import { CLASES, ROMBOS_TOTAL } from "@/lib/mercanciasClases"
import { Aviso, Entradilla, F, P, Subtitulo, Titular } from "../piezas"
import { Rombo } from "./Rombo"

/**
 * 02 · Las nueve clases.
 *
 * La pieza central del módulo. La rejilla muestra las nueve con su etiqueta
 * oficial; al tocar una se abre su ficha con el riesgo, los ejemplos y las
 * divisiones, cada una con su propio rombo.
 *
 * Se entra por la clase 3 porque es la más común en la vida real (pinturas,
 * combustibles, perfumes) y porque abrir en blanco deja la mitad de la pantalla
 * vacía sin enseñar nada.
 */
export function Seccion02() {
  const [claseN, setClaseN] = useState("3")
  const clase = CLASES.find((c) => c.n === claseN) ?? CLASES[0]

  return (
    <>
      <Titular n="02">Las nueve clases</Titular>

      <Entradilla>
        La clase dice cuál es el riesgo principal. Una misma mercancía puede tener riesgos
        secundarios y llevar más de una etiqueta. Toca una clase para abrir su ficha.
      </Entradilla>

      {/* Rejilla de las nueve. A una columna no cabe: en celular van de tres en
          tres, que es lo que deja el rombo legible sin obligar a hacer zoom. */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
        {CLASES.map((c) => {
          const activa = c.n === claseN
          return (
            <button
              key={c.n}
              type="button"
              onClick={() => setClaseN(c.n)}
              aria-pressed={activa}
              className="flex flex-col items-center gap-1.5 rounded-xl px-1 py-2.5 transition-colors"
              style={{
                background: activa ? "var(--mod-panel-2)" : "transparent",
                border: `1px solid ${activa ? c.color : "var(--mod-line)"}`,
              }}
            >
              <Rombo id={c.rombos[0]} tam={44} etiqueta={`Clase ${c.n}, ${c.nombre}`} />
              <span
                className="mono text-[12px] font-semibold leading-none"
                style={{ color: activa ? c.color : "var(--mod-muted)" }}
              >
                {c.n}
              </span>
              <span
                className="text-[10px] leading-tight text-center hyphens-auto"
                style={{ color: "var(--mod-muted)" }}
              >
                {c.corto}
              </span>
            </button>
          )
        })}
      </div>

      {/* Ficha de la clase abierta */}
      <section
        className="rounded-xl p-4 sm:p-5"
        style={{
          background: "var(--mod-panel)",
          border: "1px solid var(--mod-line)",
          borderLeft: `3px solid ${clase.color}`,
        }}
      >
        <div className="flex items-start gap-4">
          <Rombo
            id={clase.rombos[0]}
            tam={64}
            etiqueta={`Clase ${clase.n}, ${clase.nombre}`}
          />
          <div className="min-w-0 flex-1">
            <div className="mod-eyebrow">Clase {clase.n}</div>
            <h3
              className="m-0 mt-0.5 text-[19px] font-bold leading-tight"
              style={{ fontFamily: "var(--mod-display)", color: "var(--mod-title)" }}
            >
              {clase.nombre}
            </h3>
            <p className="m-0 mt-2 text-[14.5px] leading-[1.6]" style={{ color: "var(--mod-text)" }}>
              <F>Riesgo principal.</F> {clase.riesgo}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="mod-eyebrow mb-1.5">Ejemplos</div>
          <ul className="flex flex-wrap gap-1.5">
            {clase.ejemplos.map((e) => (
              <li
                key={e}
                className="rounded-full px-2.5 py-1 text-[12.5px]"
                style={{
                  background: "var(--mod-card)",
                  border: "1px solid var(--mod-line)",
                  color: "var(--mod-text)",
                }}
              >
                {e}
              </li>
            ))}
          </ul>
        </div>

        {clase.divisiones.length > 0 && (
          <div className="mt-4">
            <div className="mod-eyebrow mb-2">Divisiones</div>
            <ul className="flex flex-col gap-1.5">
              {clase.divisiones.map((d) => {
                const tieneRombo = clase.rombos.includes(d.id.replace(".", "-"))
                return (
                  <li key={d.id} className="flex items-center gap-2.5">
                    {tieneRombo ? (
                      <Rombo id={d.id} tam={30} />
                    ) : (
                      // Sin etiqueta propia en el material: va un guion, que es
                      // el marcador de dato que no tenemos. No se inventa un
                      // rombo, y no se repite el número, que ya está al lado.
                      <span
                        className="mono flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-md text-[13px]"
                        style={{
                          border: "1px dashed var(--mod-line)",
                          color: "var(--mod-muted)",
                        }}
                        aria-label="Sin etiqueta en el material del módulo"
                        title="Sin etiqueta en el material del módulo"
                      >
                        {"—"}
                      </span>
                    )}
                    <span className="text-[13.5px] leading-snug" style={{ color: "var(--mod-text)" }}>
                      <F>{d.id}</F> · {d.txt}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        <div
          className="mt-4 pt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px]"
          style={{ borderTop: "1px solid var(--mod-line)", color: "var(--mod-muted)" }}
        >
          <span>
            Grupo de embalaje:{" "}
            <F>{clase.ge ? "aplica" : "no aplica"}</F>
          </span>
          <span>
            Etiquetas de la clase: <F>{clase.rombos.length}</F>
          </span>
        </div>

        {clase.nota && (
          <p className="m-0 mt-3 text-[13.5px] leading-[1.6]" style={{ color: "var(--mod-ink)" }}>
            {clase.nota}
          </p>
        )}
      </section>

      <Subtitulo>Cómo se leen los colores</Subtitulo>

      <P>
        El color del rombo no es decoración: es la primera señal. El rojo es inflamable, el verde
        es gas que no arde, el amarillo alimenta el fuego, el blanco con calavera es tóxico y el
        blanco y negro a rayas es la clase 9. Por eso hay clases que comparten color: la 3 y la 4
        son rojas porque las dos arden, y verlo así es lo correcto.
      </P>

      <Aviso tono="ojo" titulo="Clase y división no son lo mismo">
        La clase es el riesgo principal, del 1 al 9. La división es el subtipo dentro de la clase,
        y se escribe con un punto: <F>2.1</F> es un gas inflamable, dentro de la clase 2. Decir
        &ldquo;clase 2.1&rdquo; es el error más repetido en entrevista.
      </Aviso>

      <Aviso tono="info" titulo="Si te preguntan por las baterías de litio">
        Van en la <F>clase 9</F>, mercancías peligrosas varias. No son clase 3 ni clase 8, que es
        donde las ubica casi todo el mundo. Hay {ROMBOS_TOTAL} etiquetas para las nueve clases
        porque varias tienen división propia.
      </Aviso>
    </>
  )
}
