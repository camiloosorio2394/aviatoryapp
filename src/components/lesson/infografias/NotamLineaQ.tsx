import { useState } from "react"

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
 * llave que ata el token de arriba con su explicación de abajo.
 *
 * El ejemplo es el del curso (pág. 22), no uno inventado.
 */

interface Campo {
  n: number
  token: string
  etiqueta: string
  significa: string
  detalle: string
  /** Valores que puede tomar, cuando son un conjunto cerrado y corto. */
  valores?: [string, string][]
  color: string
}

const CAMPOS: Campo[] = [
  {
    n: 1,
    token: "SEFG",
    etiqueta: "FIR",
    significa: "Dónde aplica",
    detalle:
      "Región de información de vuelo afectada. Es el primer filtro: si no es tu FIR, el aviso casi nunca es tuyo.",
    color: "var(--av-blue-500)",
  },
  {
    n: 2,
    token: "QRALW",
    etiqueta: "Código NOTAM",
    significa: "Qué cosa y qué le pasa",
    detalle:
      "Cinco letras. La Q es fija, las dos siguientes dicen de qué se trata y las dos últimas en qué estado está. Es la sección que viene después.",
    color: "var(--av-green-400)",
  },
  {
    n: 3,
    token: "IV",
    etiqueta: "Tránsito",
    significa: "A qué tipo de vuelo afecta",
    detalle: "Curso, pág. 24.",
    valores: [
      ["I", "IFR"],
      ["V", "VFR"],
      ["IV", "los dos"],
      ["K", "checklist"],
    ],
    color: "var(--av-violet-400)",
  },
  {
    n: 4,
    token: "NBO",
    etiqueta: "Objetivo",
    significa: "Qué hacer con el aviso",
    detalle: "Curso, pág. 24.",
    valores: [
      ["N", "atención inmediata de la tripulación"],
      ["B", "entra al boletín previo al vuelo (PIB)"],
      ["O", "concierne a operaciones de vuelo"],
      ["M", "misceláneo, no va a briefing"],
      ["K", "checklist"],
    ],
    color: "var(--av-amber-400)",
  },
  {
    n: 5,
    token: "AW",
    etiqueta: "Alcance",
    significa: "Sobre qué recae",
    detalle: "Se combinan entre sí: `AE`, `AW`.",
    valores: [
      ["A", "aeródromo"],
      ["E", "en ruta"],
      ["W", "advertencia de navegación"],
    ],
    color: "var(--av-cyan-400)",
  },
  {
    n: 6,
    token: "000/001",
    etiqueta: "Límites",
    significa: "Entre qué alturas",
    detalle:
      "Inferior y superior en niveles de vuelo. `000/999` es el valor por defecto y quiere decir toda altura.",
    color: "#D22B45",
  },
  {
    n: 7,
    token: "0202S07956W001",
    etiqueta: "Área",
    significa: "Centro y radio",
    detalle: "El punto que ancla el aviso y hasta dónde llega en millas náuticas. Aquí, 1 NM.",
    color: "#0C8E9B",
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
          className="text-[12px] font-semibold uppercase"
          style={{ letterSpacing: ".1em", color: "var(--av-amber-400)" }}
        >
          Desglose del calificativo
        </div>
        <div className="mt-1 text-[17px] font-semibold text-white">
          Siete piezas, siempre en este orden
        </div>
        <p className="mt-1 max-w-[62ch] text-[13px]" style={{ color: "rgb(255 255 255 / 65%)" }}>
          Separadas por barras. Si una falta, las demás conservan su posición. Toca cualquier pieza
          para verla por dentro.
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
          {CAMPOS.map((c, i) => (
            <div key={c.n} className="flex items-start">
              {i > 0 && (
                <span className="mono pt-2 text-[18px]" style={{ color: "var(--doc-muted)", opacity: 0.5 }}>
                  /
                </span>
              )}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setActivo(activo === c.n ? null : c.n)}
                  onMouseEnter={() => setActivo(c.n)}
                  aria-pressed={activo === c.n}
                  aria-label={`Campo ${c.n}: ${c.token}, ${c.etiqueta}`}
                  className="mono cursor-pointer rounded-lg px-2.5 py-1.5 text-[15px] font-semibold transition-transform hover:-translate-y-0.5 sm:text-[17px]"
                  style={{
                    color: c.color,
                    background: "#fff",
                    border: `1.5px solid ${c.color}`,
                    boxShadow: activo === c.n ? `0 4px 14px color-mix(in oklab, ${c.color} 30%, transparent)` : undefined,
                  }}
                >
                  {c.token}
                </button>
                <span style={{ width: 2, height: 12, background: c.color, opacity: 0.45 }} />
                <span
                  className="mono grid h-[22px] w-[22px] place-items-center rounded-full text-[12px] font-semibold text-white"
                  style={{ background: c.color }}
                >
                  {c.n}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Las siete fichas */}
      <div
        className="grid gap-3 rounded-b-xl border-x border-b p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3"
        style={{ borderColor: "var(--doc-rule, rgb(0 0 0 / 10%))" }}
      >
        {CAMPOS.map((c) => (
          <div
            key={c.n}
            onMouseEnter={() => setActivo(c.n)}
            className="rounded-lg p-3.5 transition-transform"
            style={{
              background: "#fff",
              border: "1px solid var(--doc-rule, rgb(0 0 0 / 10%))",
              borderTop: `3px solid ${c.color}`,
              transform: activo === c.n ? "translateY(-2px)" : undefined,
              boxShadow: activo === c.n ? "0 8px 22px rgb(20 32 58 / 12%)" : undefined,
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
              className="mt-2.5 text-[12px] font-semibold uppercase"
              style={{ letterSpacing: ".09em", color: "var(--doc-muted)" }}
            >
              {c.etiqueta}
            </div>
            <div className="mt-0.5 text-[15px] font-semibold" style={{ color: "var(--doc-fg)" }}>
              {c.significa}
            </div>
            <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "var(--doc-muted)" }}>
              {conCodigo(c.detalle)}
            </p>
            {c.valores && (
              <ul className="mt-2.5 flex flex-col gap-1.5">
                {c.valores.map(([k, v]) => (
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
          </div>
        ))}
      </div>

      {/* El consejo operacional que antes era un párrafo suelto al final */}
      <div
        className="mt-3 flex items-start gap-3 rounded-xl p-4"
        style={{
          background: "color-mix(in oklab, var(--av-amber-400) 10%, transparent)",
          border: "1px solid color-mix(in oklab, var(--av-amber-400) 28%, transparent)",
        }}
      >
        <span
          className="mono mt-0.5 flex-none rounded px-1.5 py-0.5 text-[12px] font-semibold"
          style={{ background: "var(--av-amber-400)", color: "var(--doc-fg)" }}
        >
          3 · 5
        </span>
        <div>
          <div className="text-[15px] font-semibold" style={{ color: "var(--doc-fg)" }}>
            El tránsito y el alcance son tu primer filtro
          </div>
          <p className="mt-1 max-w-[58ch] text-[13px] leading-relaxed" style={{ color: "var(--doc-muted)" }}>
            {conCodigo(
              "Cuando revisas un paquete de 40 NOTAM, empieza por ahí. Si vuelas IFR a un aeródromo, un aviso `V` de alcance `W` en otra FIR no te aplica. Míralo, pero decide rápido.",
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
