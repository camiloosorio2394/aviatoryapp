import { CLASES } from "@/lib/mercanciasClases"
import { Aviso, Dato, Entradilla, F, P, Subtitulo, Tabla, Titular } from "../piezas"
import { Rombo } from "./Rombo"

/**
 * 04 · Grupos de embalaje.
 *
 * Corto a propósito: el grupo de embalaje es un dato que el piloto lee y
 * verifica, no uno que asigna. Lo que tiene que saber es qué significa, que va
 * en romanos y que hay clases que no lo llevan, que es justo lo que se falla.
 */
export function Seccion04() {
  const sinGE = CLASES.filter((c) => !c.ge)
  const conGE = CLASES.filter((c) => c.ge)

  return (
    <>
      <Titular n="04">Grupos de embalaje</Titular>

      <Entradilla>
        El grupo de embalaje gradúa cuánto peligro tiene la sustancia dentro de su clase. Decide
        qué embalaje exige y cuánta cantidad se admite por bulto. El piloto no lo asigna: lo lee
        y comprueba que coincida entre los documentos.
      </Entradilla>

      <Tabla
        cabeceras={["Grupo", "Grado de peligro", "Qué implica"]}
        filas={[
          [
            <Dato>I</Dato>,
            <F>Alto</F>,
            "El embalaje más exigente y los límites de cantidad más bajos.",
          ],
          [<Dato>II</Dato>, <F>Medio</F>, "Es el más frecuente en la lista."],
          [<Dato>III</Dato>, <F>Menor</F>, "Embalaje menos exigente y límites más holgados."],
        ]}
      />

      <Aviso tono="ojo" titulo="Van en números romanos, y no es un capricho">
        Se escriben <Dato>I</Dato>, <Dato>II</Dato> y <Dato>III</Dato>. En el NOTOC y en la
        declaración del expedidor aparecen así, y confundir el <F>I</F> con un uno o el{" "}
        <F>II</F> con un once es un error que cambia el embalaje exigido.
      </Aviso>

      <Subtitulo>No todas las clases lo llevan</Subtitulo>

      <P>
        Hay clases donde el grupo de embalaje no aplica, porque el riesgo no se gradúa así: los
        explosivos se ordenan por división, los gases por su comportamiento y el material
        radiactivo por su nivel de radiación y su índice de transporte.
      </P>

      <div className="grid gap-3 sm:grid-cols-2">
        <div
          className="rounded-xl p-4"
          style={{ background: "var(--mod-ok-bg)", border: "1px solid var(--mod-ok-line)" }}
        >
          <div className="mod-eyebrow mb-2" style={{ color: "var(--mod-ok-fg)" }}>
            Sí llevan grupo de embalaje
          </div>
          <ul className="flex flex-wrap gap-2">
            {conGE.map((c) => (
              <li key={c.n} className="flex items-center gap-1.5">
                <Rombo id={c.rombos[0]} tam={26} etiqueta={`Clase ${c.n}`} />
                <span className="text-[13px]" style={{ color: "var(--mod-ink)" }}>
                  {c.n}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="rounded-xl p-4"
          style={{ background: "var(--mod-panel)", border: "1px solid var(--mod-line)" }}
        >
          <div className="mod-eyebrow mb-2">No llevan</div>
          <ul className="flex flex-wrap gap-2">
            {sinGE.map((c) => (
              <li key={c.n} className="flex items-center gap-1.5">
                <Rombo id={c.rombos[0]} tam={26} etiqueta={`Clase ${c.n}`} />
                <span className="text-[13px]" style={{ color: "var(--mod-ink)" }}>
                  {c.n}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Aviso tono="info" titulo="El caso que más se pregunta">
        Las <F>baterías de litio</F> son clase 9 y <F>no llevan grupo de embalaje</F>. Lo que
        gobierna su transporte es la instrucción de embalaje, por ejemplo <Dato>PI 965</Dato>, y
        el estado de carga. Si en un NOTOC ves un grupo de embalaje junto a un UN de litio, algo
        no cuadra.
      </Aviso>
    </>
  )
}
