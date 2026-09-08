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
 * La lectura operacional NO va dentro de la ficha sino en el panel de abajo, y
 * por dos razones: la ficha se queda corta y comparable con las otras seis, y
 * el panel tiene alto reservado, así que la retícula no salta al recorrerla.
 * La cadena que enseña la sección es siempre la misma: código, qué significa,
 * qué opciones tiene, cómo se lee de verdad y qué hace el piloto con eso.
 *
 * El ejemplo es el del curso (pág. 22), no uno inventado. Los significados de
 * `RA`, `LW`, `MR` y `LC` salen de la tabla del Doc 8400 que vive en
 * src/data/notam/notam_codes.json.
 */

/**
 * La paleta: navy, azul aeronáutico, violeta sobrio, ámbar, cyan, verde
 * azulado y pizarra. Ningún color al máximo de saturación y ningún rojo: en
 * esta app el rojo queda reservado para lo que restringe o alerta, y aquí
 * ninguno de los siete campos lo hace por sí mismo. El color es la llave que
 * ata cada token de la línea con su ficha, así que se repite sin excepción en
 * el token, en el filete, en el número y en el panel.
 */
const COLOR = {
  fir: "#1E3A5F",
  codigo: "#2E6FB7",
  transito: "#6B5AA6",
  objetivo: "#A8762A",
  alcance: "#227D93",
  limites: "#3D7A63",
  area: "#5A6B80",
} as const

interface Campo {
  n: number
  token: string
  /** El nombre del componente: FIR, Tránsito, Alcance. */
  nombre: string
  /** La pregunta que responde, en tres o cuatro palabras. */
  significa: string
  /** Qué es, en una línea. Va en la ficha. */
  resumen: string
  /** Valores que puede tomar, cuando son un conjunto cerrado y corto. */
  opciones?: [string, string][]
  /** Cómo se lee de verdad. Va en el panel. */
  practica: string
  /** Qué hace el piloto con eso. Va en el panel. */
  piloto: string
  /** Pieza visual propia del campo, dentro del panel. */
  extra?: "anatomia" | "limites" | "area"
  color: string
}

const CAMPOS: Campo[] = [
  {
    n: 1,
    token: "SEFG",
    nombre: "FIR",
    significa: "Dónde aplica",
    resumen: "Indicador OACI de la región de información de vuelo a la que pertenece el aviso.",
    practica:
      "Las dos primeras letras son el Estado y las dos siguientes identifican la región. En `SEFG`, `SE` es Ecuador.",
    piloto:
      "Identifica la FIR asociada al NOTAM y verifica si corresponde al espacio aéreo relacionado con tu operación.",
    color: COLOR.fir,
  },
  {
    n: 2,
    token: "QRALW",
    nombre: "Código NOTAM",
    significa: "Qué cosa y qué le pasa",
    resumen:
      "Cinco letras. La `Q` es fija, las dos siguientes dicen de qué se trata y las dos últimas en qué estado está.",
    extra: "anatomia",
    practica:
      "El significado no se memoriza entero: se arma. Con el asunto y la condición ya sabes de qué habla el aviso antes de leer la casilla E).",
    piloto:
      "Aprende a partir el código en tres. Es lo que te deja leer uno que no habías visto nunca, en vez de buscarlo en una tabla.",
    color: COLOR.codigo,
  },
  {
    n: 3,
    token: "IV",
    nombre: "Tránsito",
    significa: "A qué tipo de vuelo afecta",
    resumen: "El tipo de tránsito al que va dirigido el aviso.",
    opciones: [
      ["I", "IFR"],
      ["V", "VFR"],
      ["IV", "IFR y VFR"],
      ["K", "lista de verificación"],
    ],
    practica:
      "`IV` quiere decir que el aviso va dirigido a los dos, IFR y VFR. Si dijera solo `V`, sería para tránsito visual.",
    piloto:
      "Pregúntate si el NOTAM está dirigido a tu tipo de operación. Es el primer corte cuando revisas un paquete grande.",
    color: COLOR.transito,
  },
  {
    n: 4,
    token: "NBO",
    nombre: "Objetivo",
    significa: "Qué hacer con el aviso",
    resumen: "Para qué se distribuye y en qué producto debe aparecer.",
    opciones: [
      ["N", "atención inmediata de la tripulación"],
      ["B", "entra en el boletín previo al vuelo (PIB)"],
      ["O", "concierne a las operaciones de vuelo"],
      ["M", "misceláneo, no va a briefing"],
      ["K", "lista de verificación"],
    ],
    practica:
      "Las letras se combinan. `NBO` es la combinación más frecuente: atención inmediata, entra al PIB y concierne a las operaciones.",
    piloto:
      "Te dice el peso que le dio quien lo emitió. Una `N` es una señal de que quiere que lo veas antes de volar.",
    color: COLOR.objetivo,
  },
  {
    n: 5,
    token: "AW",
    nombre: "Alcance",
    significa: "Sobre qué recae",
    resumen: "El ámbito sobre el que aplica la información.",
    opciones: [
      ["A", "aeródromo"],
      ["E", "en ruta"],
      ["W", "advertencia de navegación"],
      ["K", "lista de verificación"],
    ],
    practica:
      "Se combinan entre sí: `AE` es aeródromo y ruta, `AW` es aeródromo y advertencia de navegación.",
    piloto:
      "Identifica sobre qué elemento recae el aviso antes de leer el texto. Uno de ruta no se lee igual que uno de aeródromo.",
    color: COLOR.alcance,
  },
  {
    n: 6,
    token: "000/001",
    nombre: "Límites",
    significa: "Entre qué alturas",
    resumen: "Límite inferior y superior del área afectada, en niveles de vuelo de tres cifras.",
    extra: "limites",
    practica:
      "`000` es la superficie y `999` el máximo. `000/999` es el valor por defecto y quiere decir toda altura. Aquí el aviso va desde la superficie hasta el nivel 001.",
    piloto:
      "Comprueba si tu perfil de vuelo cruza esa franja. Un aviso entre `000` y `001` no afecta a quien pasa por encima en ruta.",
    color: COLOR.limites,
  },
  {
    n: 7,
    token: "0202S07956W001",
    nombre: "Área",
    significa: "Centro y radio",
    resumen: "El punto que ancla el aviso y hasta dónde llega alrededor.",
    extra: "area",
    practica:
      "Latitud y longitud en grados y minutos, y el radio en millas náuticas. Aquí, 1 NM alrededor del punto.",
    piloto:
      "Sitúa el punto respecto a tu ruta. Un radio de 1 NM afecta a muy poco; uno de 999 cubre prácticamente la FIR.",
    color: COLOR.area,
  },
]

/** Las tres piezas de un código NOTAM, con un segundo ejemplo para comparar. */
const ANATOMIA = [
  { pieza: "Q", rotulo: "Código NOTAM", texto: "Siempre la misma. Marca que lo que sigue es un código NOTAM." },
  { pieza: "RA", rotulo: "Asunto", texto: "Reserva de espacio aéreo. De qué trata el aviso." },
  { pieza: "LW", rotulo: "Condición", texto: "Se realizará. En qué estado está eso que dice el asunto." },
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
  const campo = CAMPOS.find((c) => c.n === activo) ?? null

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
          si una falta, las demás conservan su posición. Toca cualquier pieza para verla por dentro.
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

      {/* Las siete fichas: qué es y qué opciones tiene. La lectura operacional
          va en el panel de abajo, para que las siete midan parecido. */}
      <div
        className="grid gap-3 border-x p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3"
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
              // el contenido de un boton estirado por la reticula, tambien con
              // display block, y las fichas cortas quedaban con el titulo a
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
                {c.significa}
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

      {/* El panel: cómo se lee de verdad y qué hace el piloto con eso. Tiene
          alto reservado a propósito, así la retícula no salta al recorrerla. */}
      <div
        className="rounded-b-xl border-x border-b px-4 py-4 sm:px-5 sm:py-5"
        style={{
          borderColor: "var(--doc-rule, rgb(0 0 0 / 10%))",
          borderTop: campo ? `3px solid ${campo.color}` : "1px solid var(--doc-rule, rgb(0 0 0 / 10%))",
          background: campo
            ? `color-mix(in oklab, ${campo.color} 5%, transparent)`
            : "var(--doc-soft, #F7F8FA)",
          minHeight: 168,
        }}
      >
        {!campo ? (
          <p className="m-0 text-[13.5px] leading-relaxed" style={{ color: "var(--doc-muted)" }}>
            Selecciona una pieza de la línea Q, arriba o en su ficha, para ver cómo se lee en la
            operación real y qué debes tener en cuenta.
          </p>
        ) : (
          <div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="mono text-[16px] font-semibold" style={{ color: campo.color }}>
                {campo.token}
              </span>
              <span
                className="mono text-[12px] font-semibold uppercase"
                style={{ letterSpacing: ".09em", color: "var(--doc-muted)" }}
              >
                {campo.nombre}
              </span>
            </div>

            {campo.extra === "anatomia" && <Anatomia color={campo.color} />}
            {campo.extra === "limites" && <Limites color={campo.color} />}
            {campo.extra === "area" && <Area color={campo.color} />}

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <div
                  className="mono text-[11px] font-semibold uppercase"
                  style={{ letterSpacing: ".1em", color: campo.color }}
                >
                  En la práctica
                </div>
                <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: "var(--doc-fg)" }}>
                  {conCodigo(campo.practica)}
                </p>
              </div>
              <div>
                <div
                  className="mono text-[11px] font-semibold uppercase"
                  style={{ letterSpacing: ".1em", color: campo.color }}
                >
                  Qué debes tener en cuenta
                </div>
                <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: "var(--doc-fg)" }}>
                  {conCodigo(campo.piloto)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* El filtro operacional, que además es la transición a la sección
          siguiente: antes de decodificar nada, mira a quién afecta. */}
      <div
        className="mt-3 rounded-xl p-4 sm:p-5"
        style={{
          background: "color-mix(in oklab, var(--av-amber-400) 8%, transparent)",
          border: "1px solid color-mix(in oklab, var(--av-amber-400) 26%, transparent)",
        }}
      >
        <div className="ln-display text-[16px] font-semibold" style={{ color: "var(--doc-fg)" }}>
          El tránsito y el alcance son tu primer filtro
        </div>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {[
            { token: "IV", pregunta: "¿A qué tipo de tránsito afecta?", color: COLOR.transito },
            { token: "AW", pregunta: "¿Sobre qué recae?", color: COLOR.alcance },
          ].map((f) => (
            <div
              key={f.token}
              className="flex items-center gap-3 rounded-lg px-3.5 py-2.5"
              style={{ background: "#fff", border: `1px solid color-mix(in oklab, ${f.color} 28%, transparent)` }}
            >
              <code
                className="mono flex-none rounded px-2 py-1 text-[13px] font-semibold"
                style={{ color: f.color, background: `color-mix(in oklab, ${f.color} 12%, transparent)` }}
              >
                {f.token}
              </code>
              <span className="text-[13.5px] font-semibold" style={{ color: "var(--doc-fg)" }}>
                {f.pregunta}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 max-w-[62ch] text-[13.5px] leading-relaxed" style={{ color: "var(--doc-muted)" }}>
          Antes de continuar, identifica quién puede verse afectado y sobre qué elemento aplica la
          información.
        </p>
      </div>
    </div>
  )
}

/** `Q | RA | LW`: de dónde sale el significado de un código NOTAM. */
function Anatomia({ color }: { color: string }) {
  return (
    <div className="mt-3.5">
      {/* Retícula de tres y sin barras separadoras: al envolver, la barra
          quedaba colgando al principio de la segunda línea. */}
      <div className="grid gap-2 sm:grid-cols-3">
        {ANATOMIA.map((a) => (
          <div key={a.pieza}>
            <div
              className="h-full rounded-lg px-3 py-2.5"
              style={{ background: "#fff", border: `1px solid color-mix(in oklab, ${color} 30%, transparent)` }}
            >
              <div className="mono text-[15px] font-semibold" style={{ color }}>
                {a.pieza}
              </div>
              <div
                className="mono mt-1 text-[10.5px] font-semibold uppercase"
                style={{ letterSpacing: ".09em", color: "var(--doc-muted)" }}
              >
                {a.rotulo}
              </div>
              <p className="mt-1 text-[12.5px] leading-relaxed" style={{ color: "var(--doc-muted)" }}>
                {a.texto}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2.5 text-[13.5px] leading-relaxed" style={{ color: "var(--doc-fg)" }}>
        {conCodigo(
          "Resultado: `QRALW` es una reserva de espacio aéreo que se realizará. Con el mismo método, `QMRLC` es `MR` pista más `LC` cerrado, es decir, pista cerrada.",
        )}
      </p>
    </div>
  )
}

/** El sándwich vertical: qué franja de altura delimita el aviso. */
function Limites({ color }: { color: string }) {
  const fila = (valor: string, rotulo: string) => (
    <div className="flex items-baseline gap-3">
      <code
        className="mono flex-none rounded px-2 py-0.5 text-[13px] font-semibold"
        style={{ color, background: `color-mix(in oklab, ${color} 12%, transparent)` }}
      >
        {valor}
      </code>
      <span className="text-[12.5px]" style={{ color: "var(--doc-muted)" }}>
        {rotulo}
      </span>
    </div>
  )

  return (
    <div
      className="mt-3.5 max-w-[380px] rounded-lg px-4 py-3.5"
      style={{ background: "#fff", border: `1px solid color-mix(in oklab, ${color} 28%, transparent)` }}
    >
      {fila("001", "límite superior")}
      <div className="my-2 flex items-center gap-3">
        <span className="flex-none" style={{ width: 46, height: 26, background: `color-mix(in oklab, ${color} 14%, transparent)`, borderTop: `2px solid ${color}`, borderBottom: `2px solid ${color}` }} />
        <span className="text-[12.5px] font-semibold" style={{ color: "var(--doc-fg)" }}>
          área afectada
        </span>
      </div>
      {fila("000", "límite inferior, la superficie")}
    </div>
  )
}

/** Latitud, longitud y radio, con el círculo que dibujan. */
function Area({ color }: { color: string }) {
  return (
    <div className="mt-3.5 flex flex-wrap items-center gap-4">
      <div className="flex flex-wrap gap-2">
        {[
          ["0202S", "latitud"],
          ["07956W", "longitud"],
          ["001", "radio, en NM"],
        ].map(([v, r]) => (
          <div
            key={v}
            className="rounded-lg px-3 py-2"
            style={{ background: "#fff", border: `1px solid color-mix(in oklab, ${color} 30%, transparent)` }}
          >
            <div className="mono text-[14px] font-semibold" style={{ color }}>
              {v}
            </div>
            <div
              className="mono mt-0.5 text-[10.5px] font-semibold uppercase"
              style={{ letterSpacing: ".09em", color: "var(--doc-muted)" }}
            >
              {r}
            </div>
          </div>
        ))}
      </div>
      <svg width="92" height="92" viewBox="0 0 92 92" aria-hidden className="flex-none">
        <circle cx="46" cy="46" r="34" fill={`color-mix(in oklab, ${color} 10%, transparent)`} stroke={color} strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="46" y1="46" x2="80" y2="46" stroke={color} strokeWidth="1.5" />
        <circle cx="46" cy="46" r="4" fill={color} />
        <text x="60" y="40" fontSize="10" fill={color} fontWeight="600">1 NM</text>
      </svg>
    </div>
  )
}
