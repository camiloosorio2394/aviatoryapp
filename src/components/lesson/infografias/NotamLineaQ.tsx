import { useState } from "react"
import { LINEA_Q_COLOR as COLOR } from "@/lib/lineaQ"

/**
 * Sección 5 de la lección de NOTAM: la línea Q, pieza por pieza.
 *
 * Es la primera sección convertida al formato de infografía interactiva, que
 * sustituye al documento corrido. Antes eran 7 bloques y 181 palabras de prosa
 * con un desglose en medio; ahora el desglose ES la sección y el texto que
 * queda son etiquetas y explicaciones cortas dentro de cada ficha.
 *
 * A diferencia de una infografía de imagen, esta reflowea: en escritorio la
 * línea Q va entera y las fichas en tres columnas; en celular la línea se
 * desplaza en su propio carril y las fichas caen a una columna. Nada de zoom
 * para poder leer.
 *
 * La interacción es la que una imagen no puede dar: tocas un campo de la línea
 * y su ficha se resalta, y al revés. El color de cada campo no decora, es la
 * llave que ata el token de arriba con su explicación de abajo. Y ahí termina:
 * la pieza presenta las siete partes con la pregunta que responde cada una, y
 * la decodificación parte por parte viene después en la lección, de corrido,
 * sin tener que seleccionar nada.
 *
 * El ejemplo es el del curso (pág. 22), no uno inventado.
 */

// La paleta vive en src/lib/lineaQ.ts, compartida con el mapa que la lección
// pinta después de esta pieza. El color es la llave que ata cada token de la
// línea con su ficha, así que se repite sin excepción en el token, en el
// filete y en el número.

interface Campo {
  n: number
  token: string
  /** El nombre del componente: FIR, Tránsito, Alcance. */
  nombre: string
  /** La pregunta que responde. Las siete al mismo nivel, todas con signos. */
  pregunta: string
  /** Qué es, en una o dos líneas. */
  resumen: string
  /** Valores que puede tomar, cuando son un conjunto cerrado y corto. */
  opciones?: [string, string][]
  color: string
}

const CAMPOS: Campo[] = [
  {
    n: 1,
    token: "SEFG",
    nombre: "FIR",
    pregunta: "¿Dónde aplica?",
    resumen:
      "Indicador OACI de la región de información de vuelo a la que pertenece el aviso. En este caso indica la FIR que afecta.",
    color: COLOR.fir,
  },
  {
    n: 2,
    token: "QRALW",
    nombre: "Código NOTAM",
    pregunta: "¿Qué información describe?",
    resumen: "El código identifica el asunto de la información y la condición que presenta.",
    color: COLOR.codigo,
  },
  {
    n: 3,
    token: "IV",
    nombre: "Tránsito",
    pregunta: "¿A qué tránsito aplica?",
    resumen: "El tipo de tránsito al que va dirigido el aviso.",
    opciones: [
      ["I", "IFR"],
      ["V", "VFR"],
      ["IV", "IFR y VFR"],
      ["K", "lista de verificación"],
    ],
    color: COLOR.transito,
  },
  {
    n: 4,
    token: "NBO",
    nombre: "Objetivo",
    pregunta: "¿Cuál es su propósito?",
    resumen: "Para qué se distribuye y en qué producto debe aparecer.",
    opciones: [
      ["N", "atención inmediata de la tripulación"],
      ["B", "entra en el boletín previo al vuelo (PIB)"],
      ["O", "concierne a las operaciones de vuelo"],
      ["M", "misceláneo, no va a briefing"],
      ["K", "lista de verificación"],
    ],
    color: COLOR.objetivo,
  },
  {
    n: 5,
    token: "AW",
    nombre: "Alcance",
    pregunta: "¿Sobre qué aplica?",
    resumen: "El ámbito sobre el que aplica la información.",
    opciones: [
      ["A", "aeródromo"],
      ["E", "en ruta"],
      ["W", "advertencia de navegación"],
      ["K", "lista de verificación"],
    ],
    color: COLOR.alcance,
  },
  {
    n: 6,
    token: "000/001",
    nombre: "Límites",
    pregunta: "¿Qué límites verticales establece?",
    resumen: "Límite inferior y superior del área afectada, en niveles de vuelo de tres cifras.",
    color: COLOR.limites,
  },
  {
    n: 7,
    token: "0202S07956W001",
    nombre: "Área",
    pregunta: "¿Qué área define?",
    resumen: "El punto que ancla el aviso y hasta dónde llega alrededor.",
    color: COLOR.area,
  },
]

/** Pinta `código` entre acentos graves como monoespaciada, igual que el resto de la lección. */
function conCodigo(t: string) {
  return t.split(/`([^`]+)`/g).map((trozo, i) =>
    i % 2 === 1 ? (
      <code
        key={i}
        className="mono"
        style={{
          fontSize: "0.92em",
          padding: "1px 4px",
          borderRadius: 4,
          background: "var(--doc-soft, rgb(0 0 0 / 5%))",
        }}
      >
        {trozo}
      </code>
    ) : (
      <span key={i}>{trozo}</span>
    ),
  )
}

export function NotamLineaQ() {
  const [activo, setActivo] = useState<number | null>(null)

  return (
    <div className="not-prose my-6">
      {/* Banda de título, el recurso que ordena toda la infografía */}
      <div
        className="rounded-t-xl px-4 py-3 sm:px-5"
        style={{ background: "var(--doc-fg, #14203A)" }}
      >
        <div
          className="mono text-[12px] font-semibold uppercase"
          style={{ letterSpacing: ".1em", color: "var(--av-amber-400)" }}
        >
          Desglose de la línea Q
        </div>
        <div className="ln-display mt-1 text-[18px] font-semibold text-white">
          Siete piezas, siempre en este orden
        </div>
        <p className="mt-1.5 max-w-[62ch] text-[13px] leading-relaxed" style={{ color: "rgb(255 255 255 / 68%)" }}>
          Cada componente responde una pregunta diferente sobre el NOTAM. Van separadas por barras y,
          si una falta, las demás conservan su posición. Toca una pieza para señalar su ficha.
        </p>
      </div>

      {/* La línea Q. En celular se desplaza en su propio carril, no rompe la página. */}
      <div
        className="overflow-x-auto border-x px-4 py-5 sm:px-5"
        style={{ borderColor: "var(--doc-rule, rgb(0 0 0 / 10%))", background: "var(--doc-soft, #F7F8FA)" }}
      >
        <div className="flex min-w-max items-start justify-center gap-1">
          <div className="mono pt-2 pr-2 text-[20px] font-semibold" style={{ color: "var(--doc-muted)" }}>
            Q)
          </div>
          {CAMPOS.map((c, i) => {
            const on = activo === c.n
            return (
              <div key={c.n} className="flex items-start">
                {i > 0 && (
                  <span className="mono pt-2 text-[18px]" style={{ color: "var(--doc-muted)", opacity: 0.5 }}>
                    /
                  </span>
                )}
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => setActivo(on ? null : c.n)}
                    onMouseEnter={() => setActivo(c.n)}
                    aria-pressed={on}
                    aria-label={`Campo ${c.n}: ${c.token}, ${c.nombre}`}
                    className="mono cursor-pointer rounded-lg px-2.5 py-1.5 text-[15px] font-semibold transition-transform hover:-translate-y-0.5 sm:text-[17px]"
                    style={{
                      color: on ? "#fff" : c.color,
                      background: on ? c.color : "#fff",
                      border: `1.5px solid ${c.color}`,
                      boxShadow: on ? `0 4px 14px color-mix(in oklab, ${c.color} 28%, transparent)` : undefined,
                    }}
                  >
                    {c.token}
                  </button>
                  <span style={{ width: 2, height: 12, background: c.color, opacity: on ? 0.9 : 0.4 }} />
                  <span
                    className="mono grid h-[22px] w-[22px] place-items-center rounded-full text-[12px] font-semibold text-white"
                    style={{ background: c.color, opacity: on ? 1 : 0.85 }}
                  >
                    {c.n}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Las siete fichas: la pregunta que responde cada pieza, qué es y qué
          opciones tiene. Cierran la infografía; la decodificación parte por
          parte va después, en la lección. */}
      <div
        className="grid gap-3 rounded-b-xl border-x border-b p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3"
        style={{ borderColor: "var(--doc-rule, rgb(0 0 0 / 10%))" }}
      >
        {CAMPOS.map((c) => {
          const on = activo === c.n
          return (
            <button
              key={c.n}
              type="button"
              onMouseEnter={() => setActivo(c.n)}
              onClick={() => setActivo(on ? null : c.n)}
              aria-pressed={on}
              // Flex en columna y anclado arriba: el navegador centra en vertical
              // el contenido de un botón estirado por la retícula, también con
              // display block, y las fichas cortas quedaban con el título a
              // media altura mientras las largas empezaban arriba.
              className="flex w-full flex-col items-stretch justify-start rounded-lg p-3.5 text-left transition-transform"
              style={{
                background: "#fff",
                border: "1px solid var(--doc-rule, rgb(0 0 0 / 10%))",
                borderTop: `3px solid ${c.color}`,
                transform: on ? "translateY(-2px)" : undefined,
                boxShadow: on ? "0 8px 22px rgb(20 32 58 / 12%)" : undefined,
              }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="mono grid h-[22px] w-[22px] flex-none place-items-center rounded-full text-[12px] font-semibold text-white"
                  style={{ background: c.color }}
                >
                  {c.n}
                </span>
                <span className="mono text-[15px] font-semibold" style={{ color: c.color }}>
                  {c.token}
                </span>
              </div>
              <div
                className="mono mt-2.5 text-[12px] font-semibold uppercase"
                style={{ letterSpacing: ".09em", color: "var(--doc-muted)" }}
              >
                {c.nombre}
              </div>
              <div className="ln-display mt-0.5 text-[15.5px] font-semibold" style={{ color: "var(--doc-fg)" }}>
                {c.pregunta}
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "var(--doc-muted)" }}>
                {conCodigo(c.resumen)}
              </p>
              {c.opciones && (
                <ul className="mt-2.5 flex flex-col gap-1.5">
                  {c.opciones.map(([k, v]) => (
                    <li key={k} className="flex items-baseline gap-2.5 text-[13px]">
                      <code
                        className="mono flex-none rounded px-1.5 py-0.5 text-[12px] font-semibold"
                        style={{
                          color: c.color,
                          background: `color-mix(in oklab, ${c.color} 12%, transparent)`,
                        }}
                      >
                        {k}
                      </code>
                      <span style={{ color: "var(--doc-muted)" }}>{v}</span>
                    </li>
                  ))}
                </ul>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
