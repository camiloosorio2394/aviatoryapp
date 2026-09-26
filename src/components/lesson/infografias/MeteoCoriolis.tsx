import { InfografiaCanvas } from "@/components/lesson/InfografiaCanvas"

/**
 * Lámina "Por qué se mueve el aire" (Meteorología, sección 3).
 *
 * SVG escrito a mano, como `MeteoAtmosfera`: los rótulos son datos y el sentido
 * de giro es física, y ninguna de las dos cosas se le confía a un generador de
 * imágenes.
 *
 * **Lo que tiene que quedar de un vistazo:** la diferencia de presión pone el
 * aire en movimiento, la rotación de la Tierra lo desvía, y por eso el mismo
 * sistema gira al revés a cada lado del ecuador.
 *
 * **La física, que es lo que no se puede equivocar:**
 *
 * | | Hemisferio norte | Hemisferio sur |
 * |---|---|---|
 * | Baja (ciclónica) | antihoraria, entrando | horaria, entrando |
 * | Alta (anticiclónica) | horaria, saliendo | antihoraria, saliendo |
 *
 * Y Coriolis desvía a la **derecha** del movimiento en el norte y a la
 * **izquierda** en el sur. El dibujo sale de ahí y no de copiar otra lámina: en
 * `espiral()`, un barrido negativo es antihorario en pantalla (el eje Y va hacia
 * abajo, así que el ángulo creciente gira en sentido horario). La tabla de
 * SISTEMAS de más abajo es la única fuente de verdad de los cuatro sentidos.
 *
 * Comprobación a mano, para que se pueda repetir: en el lado oeste de una baja
 * del norte el aire va hacia el este (cae hacia el centro), Coriolis lo tuerce a
 * su derecha, que mirando al este es el sur, o sea hacia abajo en la lámina. Y
 * bajar por el lado izquierdo de un círculo es girar en antihorario. Cuadra. En
 * el sur, el mismo aire se tuerce a la izquierda, sube, y eso es horario.
 *
 * **La espiral hace dos trabajos con un solo trazo:** el giro y el hecho de que
 * el aire entra a las bajas y sale de las altas. Dibujar el giro con un arco y
 * la convergencia con flechas radiales aparte costaba el doble de tinta para
 * decir lo mismo. El tramo recto discontinuo con el que arranca cada espiral es
 * el empujón de la presión antes de que Coriolis lo tuerza; por eso solo uno de
 * los cuatro lleva el rótulo, y es el que explica los otros tres.
 *
 * **Densidad.** El techo lo marca `MeteoCarrera`. Aquí van
 * ocho rótulos y cuatro letras, y nada más. La lámina que sustituye llevaba un
 * cajón de texto a la derecha con seis líneas de prosa: eso es trabajo del HTML
 * de la sección, que ya lo hace.
 */

// ── Lienzo ───────────────────────────────────────────────────────────────────
const W = 1000
const H = 700

// ── Paleta del módulo, la misma de `.lector-notam.lector-mt` ─────────────────
const PAPEL = "#FBFAF8"
const TINTA = "#16191D"
const SECUNDARIO = "#4A5460"
const LINEA = "#C9C3B7"
const ACENTO = "#1A4A52"

const MONO = '"JetBrains Mono Variable", "JetBrains Mono", ui-monospace, "SF Mono", monospace'

const IZQ = 56
const DER = W - IZQ
/** Y de la línea del ecuador. */
const ECUADOR = 362

const R = 78
const X_BAJA = 330
const X_ALTA = 700
const Y_NORTE = 205
const Y_SUR = 520

const rad = (grados: number) => (grados * Math.PI) / 180

/**
 * Los cuatro sistemas, y esta tabla es la única fuente de los sentidos de giro.
 * `barrido` en radianes con signo: **negativo es antihorario en pantalla**,
 * porque el eje Y va hacia abajo. `entra` distingue baja (converge) de alta
 * (diverge) y es lo que decide si la espiral se cierra o se abre.
 */
const SISTEMAS = [
  { clave: "norte-baja", letra: "B", rotulo: "BAJA PRESIÓN", cx: X_BAJA, cy: Y_NORTE, barrido: -1.6, entra: true },
  { clave: "norte-alta", letra: "A", rotulo: "ALTA PRESIÓN", cx: X_ALTA, cy: Y_NORTE, barrido: 1.6, entra: false },
  { clave: "sur-baja", letra: "B", rotulo: "BAJA PRESIÓN", cx: X_BAJA, cy: Y_SUR, barrido: 1.6, entra: true },
  { clave: "sur-alta", letra: "A", rotulo: "ALTA PRESIÓN", cx: X_ALTA, cy: Y_SUR, barrido: -1.6, entra: false },
] as const

/** Rótulo de la casa: mono, mayúsculas y tracking ancho. */
function Rotulo({
  x,
  y,
  children,
  color = TINTA,
  tam = 22,
  ancla = "start",
}: {
  x: number
  y: number
  children: string
  color?: string
  tam?: number
  ancla?: "start" | "middle"
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={ancla}
      fontFamily={MONO}
      fontSize={tam}
      fontWeight={600}
      letterSpacing={tam * 0.16}
      fill={color}
    >
      {children}
    </text>
  )
}

/** Los puntos de una espiral, del radio `r0` al `r1` barriendo `barrido`. */
function espiral(cx: number, cy: number, r0: number, r1: number, a0: number, barrido: number) {
  const n = 40
  const pts: [number, number][] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const a = a0 + barrido * t
    const r = r0 + (r1 - r0) * t
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)])
  }
  return pts
}

/** Punta de flecha en `p`, apuntando en la dirección que trae `previo → p`. */
function Punta({ p, previo, color }: { p: [number, number]; previo: [number, number]; color: string }) {
  const ang = Math.atan2(p[1] - previo[1], p[0] - previo[0])
  const L = 15
  const abre = 0.42
  return (
    <path
      d={`M${p[0]},${p[1]}
          L${p[0] - L * Math.cos(ang - abre)},${p[1] - L * Math.sin(ang - abre)}
          L${p[0] - L * Math.cos(ang + abre)},${p[1] - L * Math.sin(ang + abre)} Z`}
      fill={color}
    />
  )
}

/**
 * Un sistema de presión: la espiral de tres brazos, su letra y su isobara.
 *
 * El brazo que arranca en el oeste lleva delante un tramo recto discontinuo: es
 * el aire cayendo por la diferencia de presión, antes de que Coriolis lo tuerza.
 * Ahí es donde se ve la desviación, y por eso es el brazo que se rotula.
 */
function Sistema({
  cx,
  cy,
  letra,
  barrido,
  entra,
  color,
}: {
  cx: number
  cy: number
  letra: string
  barrido: number
  entra: boolean
  color: string
}) {
  const RA = 94
  const RB = 52
  const r0 = entra ? RA : RB
  const r1 = entra ? RB : RA
  // Tres brazos a 120°. El primero arranca en el oeste, que es el que se rotula.
  const brazos = [180, 300, 60].map((g) => rad(g))

  return (
    <g>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={LINEA} strokeWidth={1.4} />

      {brazos.map((a0, i) => {
        const pts = espiral(cx, cy, r0, r1, a0, barrido)
        const d = pts.map(([x, yy], j) => `${j === 0 ? "M" : "L"}${x.toFixed(1)},${yy.toFixed(1)}`).join(" ")
        // El empujón de la presión: recto y hacia donde va el aire. En una
        // baja viene de fuera hacia el centro; en una alta sale del centro
        // hacia fuera. Las dos salían de cero: en la alta se quedaba en un
        // segmento de longitud nula y no se veía ninguna.
        const desde = entra ? RA + 40 : 16
        const hasta = entra ? RA : RB
        return (
          <g key={i}>
            {i === 0 && (
              <line
                x1={cx + desde * Math.cos(a0)}
                y1={cy + desde * Math.sin(a0)}
                x2={cx + hasta * Math.cos(a0)}
                y2={cy + hasta * Math.sin(a0)}
                stroke={color}
                strokeWidth={2.2}
                strokeDasharray="7 6"
                opacity={0.75}
              />
            )}
            <path d={d} fill="none" stroke={color} strokeWidth={2.6} strokeLinecap="round" />
            <Punta p={pts[pts.length - 1]} previo={pts[pts.length - 3]} color={color} />
          </g>
        )
      })}

      <text
        x={cx}
        y={cy + 16}
        textAnchor="middle"
        fontFamily={MONO}
        fontSize={44}
        fontWeight={700}
        fill={color}
      >
        {letra}
      </text>
    </g>
  )
}

export function MeteoCoriolis() {
  return (
    <InfografiaCanvas
      width={W}
      height={H}
      label="Esquema simplificado de circulación cerca de la superficie: cuatro sistemas de presión, dos por hemisferio, separados por el ecuador. En el hemisferio norte el aire gira hacia la baja en sentido antihorario y se aleja de la alta en sentido horario. En el hemisferio sur esos giros se invierten. Los trazos discontinuos representan el gradiente de presión; las espirales representan la circulación resultante cerca del suelo."
      vectorial
    >
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: PAPEL, fontFamily: "'Inter Variable', Inter, Helvetica, Arial, sans-serif" }}
      >
        {/* ── Hemisferio norte ───────────────────────────────────────────── */}
        <Rotulo x={IZQ} y={72}>
          HEMISFERIO NORTE
        </Rotulo>

        {/* ── El ecuador ─────────────────────────────────────────────────── */}
        <line
          x1={IZQ}
          y1={ECUADOR}
          x2={DER}
          y2={ECUADOR}
          stroke={SECUNDARIO}
          strokeWidth={2}
          strokeDasharray="14 10"
        />
        <rect x={W / 2 - 78} y={ECUADOR - 17} width={156} height={34} fill={PAPEL} />
        <Rotulo x={W / 2} y={ECUADOR + 8} color={SECUNDARIO} tam={20} ancla="middle">
          ECUADOR
        </Rotulo>

        {/* ── Hemisferio sur ─────────────────────────────────────────────── */}
        <Rotulo x={IZQ} y={ECUADOR + 62}>
          HEMISFERIO SUR
        </Rotulo>

        {/* ── Los cuatro sistemas ────────────────────────────────────────── */}
        {SISTEMAS.map((s) => {
          const color = s.entra ? ACENTO : SECUNDARIO
          return (
            <g key={s.clave}>
              <Sistema
                cx={s.cx}
                cy={s.cy}
                letra={s.letra}
                barrido={s.barrido}
                entra={s.entra}
                color={color}
              />
              <Rotulo x={s.cx} y={s.cy + 128} color={color} tam={20} ancla="middle">
                {s.rotulo}
              </Rotulo>
            </g>
          )
        })}

        {/* ── Coriolis, una sola vez, sobre el tramo que se tuerce ───────── */}
        <Rotulo x={IZQ + 6} y={Y_NORTE + 7} color={ACENTO} tam={20}>
          CORIOLIS
        </Rotulo>
      </svg>
    </InfografiaCanvas>
  )
}
