import { MP_SECCIONES } from "@/lib/mercancias"
import { PREGUNTAS } from "@/lib/mercanciasPractica"
import { Aviso, Banda, Entradilla, F, Tabla, Titular } from "../piezas"

/**
 * 10 · Chequeo final.
 *
 * Cinco preguntas que cierran el módulo. Cada una dice de qué sección sale, y
 * al calificar se puede volver ahí de un toque: el valor de fallar es saber
 * adónde regresar, no ver un número.
 *
 * No es una evaluación con nota mínima: es el cierre de la lectura. La
 * evaluación con puntaje que viaja entre dispositivos entra con la migración.
 */

interface Seccion10Props {
  quiz: Record<string, number>
  onQuiz: (id: string, i: number) => void
  calificado: boolean
  onCalificar: () => void
  onReiniciar: () => void
  onIrASeccion: (n: string) => void
}

export function Seccion10({
  quiz,
  onQuiz,
  calificado,
  onCalificar,
  onReiniciar,
  onIrASeccion,
}: Seccion10Props) {
  const respondidas = PREGUNTAS.filter((p) => quiz[p.id] !== undefined).length
  const aciertos = PREGUNTAS.filter((p) => quiz[p.id] === p.ok).length
  const todas = respondidas === PREGUNTAS.length

  return (
    <>
      <Titular n="10">Chequeo final</Titular>

      <Entradilla>
        Cinco preguntas sobre lo que de verdad se pregunta en una entrevista técnica. Cada una dice
        de qué sección sale, para que al fallar sepas exactamente adónde volver.
      </Entradilla>

      <ol className="flex flex-col gap-5 m-0 p-0 list-none">
        {PREGUNTAS.map((p, i) => {
          const mia = quiz[p.id]
          const seccion = MP_SECCIONES.find((s) => s.n === p.ref)
          return (
            <li key={p.id} className="flex flex-col gap-2.5">
              <div className="flex items-baseline gap-2.5">
                <span
                  className="mono text-[12px] font-semibold tabular-nums"
                  style={{ color: "var(--mod-muted)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="m-0 text-[15.5px] font-semibold leading-snug" style={{ color: "var(--mod-ink)" }}>
                  {p.texto}
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                {p.ops.map((op, j) => {
                  const elegida = mia === j
                  const esLaBuena = calificado && j === p.ok
                  const falloAqui = calificado && elegida && j !== p.ok
                  return (
                    <button
                      key={j}
                      type="button"
                      disabled={calificado}
                      onClick={() => onQuiz(p.id, j)}
                      aria-pressed={elegida}
                      className="text-left rounded-xl px-4 py-2.5 text-[14px] leading-snug transition-colors disabled:cursor-default"
                      style={{
                        background: esLaBuena
                          ? "var(--mod-ok-bg)"
                          : falloAqui
                            ? "var(--mod-no-bg)"
                            : elegida
                              ? "var(--mod-panel-2)"
                              : "var(--mod-card)",
                        border: `1px solid ${
                          esLaBuena
                            ? "var(--mod-ok-line)"
                            : falloAqui
                              ? "var(--mod-no-fg)"
                              : elegida
                                ? "var(--mod-border-b)"
                                : "var(--mod-line)"
                        }`,
                        color: esLaBuena
                          ? "var(--mod-ok-fg)"
                          : falloAqui
                            ? "var(--mod-no-fg)"
                            : "var(--mod-text)",
                      }}
                    >
                      {op}
                    </button>
                  )
                })}
              </div>

              {calificado && (
                <div
                  className="rounded-lg px-3.5 py-2.5 text-[13.5px] leading-[1.6]"
                  style={{ background: "var(--mod-panel)", color: "var(--mod-ink)" }}
                >
                  {p.explica}
                  {seccion && (
                    <button
                      type="button"
                      onClick={() => onIrASeccion(p.ref)}
                      className="mt-1.5 block text-[13px] font-semibold underline underline-offset-2"
                      style={{ color: "var(--mod-link)" }}
                    >
                      Repasar la sección {p.ref}, {seccion.titulo}
                    </button>
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ol>

      {!calificado ? (
        <button
          type="button"
          disabled={!todas}
          onClick={onCalificar}
          className="self-start rounded-xl px-5 py-3 text-[14.5px] font-semibold transition-opacity disabled:opacity-45 disabled:cursor-not-allowed"
          style={{ background: "var(--mod-band)", color: "#FFFFFF" }}
        >
          {todas ? "Calificar" : `Te faltan ${PREGUNTAS.length - respondidas}`}
        </button>
      ) : (
        <>
          <Aviso
            tono={aciertos === PREGUNTAS.length ? "permitido" : "info"}
            titulo={`${aciertos} de ${PREGUNTAS.length}`}
          >
            {aciertos === PREGUNTAS.length
              ? "Las cinco. Ya puedes hablar del tema en una entrevista sin dudar."
              : "Mira las explicaciones y vuelve a la sección de las que fallaste. Es más útil releer esas dos páginas que repetir el chequeo de memoria."}
          </Aviso>

          <button
            type="button"
            onClick={onReiniciar}
            className="self-start rounded-xl px-5 py-3 text-[14.5px] font-semibold"
            style={{ background: "var(--mod-card)", border: "1px solid var(--mod-line)", color: "var(--mod-ink)" }}
          >
            Volver a intentarlo
          </button>
        </>
      )}

      <Tabla
        cabeceras={["Concepto", "Para recordar"]}
        filas={[
          [
            <F>Nueve clases</F>,
            "1 explosivos, 2 gases, 3 líquidos inflamables, 4 sólidos inflamables, 5 oxidantes y peróxidos, 6 tóxicas e infecciosas, 7 radiactivo, 8 corrosivas, 9 varias.",
          ],
          [
            <F>Litio</F>,
            "Clase 9, sin grupo de embalaje. Repuestos solo en cabina. Fuga térmica: enfriar con agua.",
          ],
          [<F>NOTOC</F>, "Se revisa, se firma y se mantiene accesible en cabina."],
          [
            <F>Documentos</F>,
            "NOTOC y declaración del expedidor, y que coincidan en UN, clase, grupo de embalaje y cantidad.",
          ],
          [<F>Comandante</F>, "Última barrera: verifica, informa al ATC y decide en emergencia."],
          [<F>Norma</F>, "RAC 175, Doc 9284 y Anexo 18 de OACI, y la IATA DGR. Manda la edición vigente."],
        ]}
      />

      <Banda>
        En la entrevista no buscan un experto en embalaje: buscan un piloto que entienda el riesgo,
        conozca sus responsabilidades y sepa reaccionar. Domina el NOTOC, las nueve clases y el
        litio, y hablarás con seguridad.
      </Banda>
    </>
  )
}
