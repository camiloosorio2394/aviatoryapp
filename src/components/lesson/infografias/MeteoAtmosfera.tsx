import { InfografiaCanvas } from "@/components/lesson/InfografiaCanvas"

/**
 * Lámina "Qué hay ahí afuera" (Meteorología, sección 1).
 *
 * Es SVG escrito a mano, no una imagen generada, y esa es la decisión de fondo:
 * los rótulos de esta lámina son datos («Tropopausa», «FL380») y un generador de
 * imágenes los escribe mal. Aquí el texto es texto: sale nítido a cualquier zoom
 * del visor, se corrige una palabra sin rehacer nada y no hay forma de que
 * aparezca una tilde inventada. Es el mismo criterio de `NotamQueEs`, que
 * también lleva su texto en el producto y no en el píxel.
 *
 * **Seis rótulos y ni uno más.** El techo de densidad del módulo lo marca
 * `MeteoCarrera`: dos barras, media docena de rótulos en mono
 * y mayúsculas, y aire por todas partes. Una primera versión de esta lámina
 * llevaba treinta elementos de texto (columna de capas con descripciones, escala
 * numérica, título y pie) y pasaba de largo ese techo. Lo que se cayó:
 *
 *  · La escala de alturas. Las cifras ya están en las fichas de la sección, que
 *    van justo debajo, y repetirlas aquí era pagar densidad por nada.
 *  · La mesosfera y la termosfera. No se vuelan y no cambian ninguna decisión.
 *  · La columna de descripciones de la derecha, que era prosa dentro de un
 *    dibujo. Eso es trabajo del texto de la sección.
 *
 * **La tropopausa va inclinada a propósito.** Es una línea discontinua, no una
 * banda ni una pared: sube hacia el ecuador y baja hacia los polos, y dibujarla
 * torcida dice que su altura cambia sin gastar un solo rótulo en explicarlo. El
 * yunque de la tormenta la roza y la pasa un poco, porque no es una barrera
 * física: es la frontera donde se acaba la mezcla vertical.
 *
 * **Grafía.** «Troposfera» y «Estratosfera» sin tilde, que es la forma que fijó
 * Camilo y la que usan las fichas de la sección. Si un día cambia, cambian las
 * dos cosas a la vez o la lámina contradice al texto que tiene debajo.
 */

// ── Lienzo ───────────────────────────────────────────────────────────────────
const W = 1000
const H = 664

// ── Paleta del módulo, la misma de `.lector-notam.lector-mt` ─────────────────
const PAPEL = "#FBFAF8"
const TINTA = "#16191D"
const SECUNDARIO = "#4A5460"
const LINEA = "#C9C3B7"
const ACENTO = "#1A4A52"
const RESALTADO = "#E4EFF1"

const MONO = '"JetBrains Mono Variable", "JetBrains Mono", ui-monospace, "SF Mono", monospace'

// ── La escena ────────────────────────────────────────────────────────────────
const IZQ = 56
const DER = W - 56
/** Suelo: nivel del mar. */
const SUELO = 604
/** Techo del dibujo. */
const CIELO = 56

/** La tropopausa, inclinada: más baja hacia los polos, más alta hacia el ecuador. */
const TROPO_IZQ = 314
const TROPO_DER = 282
/** Y de la tropopausa en una x dada. */
const tropo = (x: number) => TROPO_IZQ + ((TROPO_DER - TROPO_IZQ) * (x - IZQ)) / (DER - IZQ)

/** Rótulo de la casa: mono, mayúsculas y tracking ancho. */
function Rotulo({
  x,
  y,
  children,
  color = TINTA,
  tam = 27,
  ancla = "start",
}: {
  x: number
  y: number
  children: string
  color?: string
  tam?: number
  ancla?: "start" | "end"
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

/**
 * Llamada: un punto sobre lo que se señala y una línea fina hasta el rótulo.
 * `hacia` dice de qué lado queda el texto.
 */
function Llamada({
  x,
  yy,
  hasta,
  texto,
  hacia,
}: {
  x: number
  yy: number
  hasta: number
  texto: string
  hacia: "izquierda" | "derecha"
}) {
  const alaIzquierda = hacia === "izquierda"
  return (
    <g>
      <circle cx={x} cy={yy} r={4} fill={SECUNDARIO} />
      <line x1={x} y1={yy} x2={hasta} y2={yy} stroke={LINEA} strokeWidth={1.4} />
      <Rotulo
        x={alaIzquierda ? hasta - 12 : hasta + 12}
        y={yy + 7}
        tam={20}
        color={SECUNDARIO}
        ancla={alaIzquierda ? "end" : "start"}
      >
        {texto}
      </Rotulo>
    </g>
  )
}

/** Un cúmulo: bultos redondos sobre una base plana. */
function Cumulo({
  x,
  base,
  ancho,
  alto,
  opacidad = 1,
}: {
  x: number
  base: number
  ancho: number
  alto: number
  opacidad?: number
}) {
  const r = alto / 2
  const bultos = Math.max(2, Math.round(ancho / (r * 1.15)))
  const paso = (ancho - r * 2) / (bultos - 1)
  return (
    <g opacity={opacidad}>
      {Array.from({ length: bultos }, (_, i) => {
        // Los de en medio suben más, que es como crece un cúmulo.
        const centro = (bultos - 1) / 2
        const caida = Math.abs(i - centro) / (centro || 1)
        const rr = r * (1 - caida * 0.34)
        return (
          <circle
            key={i}
            cx={x + r + paso * i}
            cy={base - rr}
            r={rr}
            fill="#FFFFFF"
            stroke={LINEA}
            strokeWidth={1.4}
          />
        )
      })}
      <rect x={x} y={base - 2.4} width={ancho} height={2.4} fill="#FFFFFF" />
      <line x1={x + 2} y1={base} x2={x + ancho - 2} y2={base} stroke={LINEA} strokeWidth={1.4} />
    </g>
  )
}

/**
 * El cumulonimbo. La silueta va de un solo trazo, con Béziers cuyo punto de
 * control sale hacia fuera: eso da los bultos de coliflor sin dejar costuras
 * dentro, que es lo que pasaba apilando círculos.
 *
 * El yunque se extiende al llegar arriba y **pasa un poco** de la tropopausa: la
 * frontera no es una pared, y una tormenta profunda la alcanza y la rebasa un
 * trecho.
 */
function Cumulonimbo({ cx, base, cima }: { cx: number; base: number; cima: number }) {
  /** Media anchura de la torre, de la base a la cima. */
  const ancho = (t: number) => 46 + t * 36
  const pasos = 6
  const bultos = [17, 8, 14, 7, 16, 9]
  const yEn = (t: number) => base - (base - cima) * t

  let d = `M${cx - ancho(0) - 14},${base}`
  for (let i = 1; i <= pasos; i++) {
    const x0 = cx - ancho((i - 1) / pasos)
    const x1 = cx - ancho(i / pasos)
    d += ` Q${Math.min(x0, x1) - bultos[i - 1]},${(yEn((i - 1) / pasos) + yEn(i / pasos)) / 2} ${x1},${yEn(i / pasos)}`
  }
  d += ` Q${cx},${cima - 30} ${cx + ancho(1)},${cima}`
  for (let i = pasos - 1; i >= 0; i--) {
    const x0 = cx + ancho((i + 1) / pasos)
    const x1 = cx + ancho(i / pasos)
    d += ` Q${Math.max(x0, x1) + bultos[i]},${(yEn((i + 1) / pasos) + yEn(i / pasos)) / 2} ${x1},${yEn(i / pasos)}`
  }
  d += ` L${cx + ancho(0) + 16},${base} Z`

  // El yunque se alarga a favor del viento en altura: por eso no es simétrico.
  const ay = cima + 6
  const yunque = `M${cx - 150},${ay + 20}
    C${cx - 118},${ay - 10} ${cx - 62},${ay - 30} ${cx - 16},${ay - 34}
    C${cx + 38},${ay - 36} ${cx + 112},${ay - 24} ${cx + 186},${ay - 2}
    C${cx + 142},${ay + 24} ${cx + 62},${ay + 40} ${cx - 4},${ay + 41}
    C${cx - 60},${ay + 41} ${cx - 120},${ay + 34} ${cx - 150},${ay + 20} Z`

  return (
    <g>
      {/* Precipitación bajo la base. */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line
          key={i}
          x1={cx - 40 + i * 16}
          y1={base - 4}
          x2={cx - 52 + i * 16}
          y2={base + 46}
          stroke={ACENTO}
          strokeWidth={1.6}
          opacity={0.45}
        />
      ))}
      <path d={d} fill="#FFFFFF" stroke={LINEA} strokeWidth={1.6} strokeLinejoin="round" />
      <path d={yunque} fill="#FFFFFF" stroke={LINEA} strokeWidth={1.6} />
    </g>
  )
}

/** Jet de línea de perfil, mirando a la derecha. */
function Jet({ x, cy, ancho = 92 }: { x: number; cy: number; ancho?: number }) {
  const k = ancho / 104
  return (
    <g transform={`translate(${x} ${cy}) scale(${k})`} fill={ACENTO}>
      <path d="M2,0 L13,-25 L21,-25 L26,0 Z" />
      <path d="M4,0.5 L-5,-8 L3,-8 L18,0.5 Z" />
      <path d="M6,-6 L74,-6 C88,-6 98,-2.6 103,0 C98,2.6 88,6 74,6 L6,6 C0,6 -2,3 -2,0 C-2,-3 0,-6 6,-6 Z" />
      <path d="M52,4 L33,23 L46,23 L70,5 Z" />
      <ellipse cx={45} cy={10.5} rx={9} ry={4.4} />
    </g>
  )
}

export function MeteoAtmosfera() {
  const CB_X = 664
  const CB_CIMA = tropo(CB_X) + 10

  return (
    <InfografiaCanvas
      width={W}
      height={H}
      label="Corte vertical de la atmósfera. Abajo, la troposfera sobre montañas y mar, con nubes bajas y una tormenta cuyo yunque se extiende al llegar arriba. Una línea discontinua inclinada marca la tropopausa, más baja hacia los polos y más alta hacia el ecuador. Encima, la estratosfera, vacía y estable. Un avión de línea vuela en FL380, dentro de la troposfera y cerca de la tropopausa."
      vectorial
    >
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: PAPEL, fontFamily: "'Inter Variable', Inter, Helvetica, Arial, sans-serif" }}
      >
        <defs>
          {/* Ni las nubes ni el suelo se salen de la escena. */}
          <clipPath id="mt-escena">
            <rect x={IZQ} y={CIELO} width={DER - IZQ} height={SUELO - CIELO} />
          </clipPath>
        </defs>

        {/* ── La troposfera: todo lo que hay por debajo de la tropopausa ── */}
        <path
          d={`M${IZQ},${tropo(IZQ)} L${DER},${tropo(DER)} L${DER},${SUELO} L${IZQ},${SUELO} Z`}
          fill={RESALTADO}
        />

        <g clipPath="url(#mt-escena)">
          {/* Suelo: montañas a la izquierda, mar a la derecha. */}
          <path
            d={`M${IZQ},${SUELO} L${IZQ},${SUELO - 26}
                L${IZQ + 78},${SUELO - 72} L${IZQ + 132},${SUELO - 34}
                L${IZQ + 196},${SUELO - 88} L${IZQ + 268},${SUELO - 30}
                L${IZQ + 330},${SUELO - 54} L${IZQ + 404},${SUELO - 16}
                L${DER},${SUELO - 12} L${DER},${SUELO} Z`}
            fill={ACENTO}
            opacity={0.2}
          />

          {/* Nubes bajas y la tormenta. */}
          <Cumulo x={IZQ + 244} base={SUELO - 56} ancho={112} alto={42} />
          <Cumulo x={IZQ + 430} base={SUELO - 30} ancho={78} alto={28} opacidad={0.85} />
          <Cumulo x={IZQ + 748} base={SUELO - 74} ancho={96} alto={34} opacidad={0.9} />
          <Cumulonimbo cx={CB_X} base={SUELO - 52} cima={CB_CIMA} />
        </g>

        {/* ── La tropopausa ──────────────────────────────────────────────── */}
        <line
          x1={IZQ}
          y1={tropo(IZQ)}
          x2={DER}
          y2={tropo(DER)}
          stroke={ACENTO}
          strokeWidth={2.4}
          strokeDasharray="14 10"
        />

        {/* ── El horizonte ───────────────────────────────────────────────── */}
        <line x1={IZQ} y1={SUELO} x2={DER} y2={SUELO} stroke={LINEA} strokeWidth={1.6} />

        {/* ── El crucero ─────────────────────────────────────────────────── */}
        <Jet x={IZQ + 150} cy={388} />
        <Llamada x={IZQ + 254} yy={388} hasta={IZQ + 336} texto="FL380" hacia="derecha" />

        {/* ── Los seis rótulos ───────────────────────────────────────────── */}
        <Rotulo x={IZQ + 36} y={CIELO + 86}>
          ESTRATOSFERA
        </Rotulo>
        <Rotulo x={IZQ + 36} y={tropo(IZQ + 36) - 22} color={ACENTO}>
          TROPOPAUSA
        </Rotulo>
        <Rotulo x={IZQ + 36} y={SUELO - 148}>
          TROPOSFERA
        </Rotulo>
        <Llamada x={IZQ + 296} yy={SUELO - 76} hasta={IZQ + 214} texto="NUBES" hacia="izquierda" />
        <Llamada x={CB_X - 48} yy={SUELO - 148} hasta={CB_X - 152} texto="TORMENTAS" hacia="izquierda" />
      </svg>
    </InfografiaCanvas>
  )
}
