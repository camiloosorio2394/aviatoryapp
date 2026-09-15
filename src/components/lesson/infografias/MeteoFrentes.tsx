import { InfografiaCanvas } from "@/components/lesson/InfografiaCanvas"
import { Flecha, Rotulo } from "@/components/lesson/infografias/laminaMeteo"
import {
  ACENTO,
  ACENTO_CLARO,
  LINEA,
  PAPEL,
  RESALTADO,
  SECUNDARIO,
  TINTA,
} from "@/components/lesson/infografias/laminaMeteoTokens"

/**
 * Las cuatro láminas del nivel 3, "Masas de aire, frentes y tormentas"
 * (secciones 10 a 12).
 *
 * **Los símbolos frontales van en la paleta del módulo, no en el rojo y azul de
 * una carta de superficie.** En esta app el rojo significa error y el verde
 * correcto, y gastar el rojo en un frente cálido lo rompería en las treinta
 * secciones. No se pierde nada: lo que identifica un frente en una carta es la
 * **forma** (triángulos contra semicírculos) y de qué lado del trazo van, no el
 * color, y las cartas de fax llevan décadas imprimiéndose en negro. Lo que sí
 * hay que respetar y se respeta es que los símbolos apunten hacia donde avanza
 * el frente.
 */

const W = 1000
const H = 560
const IZQ = 48
const DER = W - IZQ

function Lienzo({ etiqueta, children }: { etiqueta: string; children: React.ReactNode }) {
  return (
    <InfografiaCanvas width={W} height={H} label={etiqueta}>
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: PAPEL, fontFamily: "Inter, Helvetica, Arial, sans-serif" }}
      >
        {children}
      </svg>
    </InfografiaCanvas>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 10a · Las masas se apellidan dos veces: temperatura y humedad
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Una rejilla de dos por dos, porque el nombre de una masa es exactamente eso:
 * un cruce de dos ejes. Las celdas no llevan rótulo; lo que hay dentro es de
 * dónde viene el aire, que es lo que le da el apellido. Rotular también las
 * cuatro combinaciones sería escribir cuatro veces lo que los ejes ya dicen.
 */
export function MeteoMasas() {
  const x0 = IZQ + 150
  const y0 = 128
  const cw = (DER - x0) / 2
  const ch = 152

  /** El suelo de una celda: mar si es marítima, terreno si es continental. */
  const suelo = (cx: number, cy: number, maritima: boolean) => {
    const yb = cy + ch - 26
    return maritima ? (
      <g>
        <rect x={cx + 10} y={yb} width={cw - 20} height={26} fill={ACENTO} opacity={0.3} />
        {[0, 1].map((i) => (
          <path
            key={i}
            d={`M${cx + 20},${yb + 9 + i * 9} q 18,-7 36,0 t 36,0 t 36,0 t 36,0`}
            fill="none"
            stroke={PAPEL}
            strokeWidth={1.6}
            opacity={0.8}
          />
        ))}
      </g>
    ) : (
      <path
        d={`M${cx + 10},${cy + ch} L${cx + 10},${yb + 8} L${cx + 70},${yb - 10} L${cx + 130},${yb + 6}
            L${cx + 190},${yb - 12} L${cx + cw - 10},${yb + 4} L${cx + cw - 10},${cy + ch} Z`}
        fill={ACENTO}
        opacity={0.26}
      />
    )
  }

  return (
    <Lienzo etiqueta="Rejilla de dos por dos con el doble apellido de una masa de aire. Las filas son la temperatura, tropical arriba y polar abajo; las columnas son la humedad, marítima a la izquierda sobre el mar y continental a la derecha sobre tierra. Cada celda muestra la superficie sobre la que la masa estuvo quieta y que le dio su carácter.">
      {/* Cabeceras de columna: la humedad. */}
      <Rotulo x={x0 + cw / 2} y={y0 - 24} ancla="middle" color={ACENTO} tam={19}>MARÍTIMA</Rotulo>
      <Rotulo x={x0 + cw + cw / 2} y={y0 - 24} ancla="middle" color={ACENTO} tam={19}>CONTINENTAL</Rotulo>

      {[0, 1].map((fila) => {
        const cy = y0 + fila * (ch + 46)
        const tropical = fila === 0
        return (
          <g key={fila}>
            {/* Cabecera de fila: la temperatura. */}
            <Rotulo x={x0 - 26} y={cy + ch / 2 + 6} ancla="end" color={ACENTO} tam={19}>
              {tropical ? "TROPICAL" : "POLAR"}
            </Rotulo>
            {[0, 1].map((col) => {
              const cx = x0 + col * cw
              return (
                <g key={col}>
                  <rect
                    x={cx}
                    y={cy}
                    width={cw}
                    height={ch}
                    fill={RESALTADO}
                    opacity={tropical ? 0.6 : 0.28}
                    stroke={LINEA}
                    strokeWidth={1.4}
                  />
                  {suelo(cx, cy, col === 0)}
                </g>
              )
            })}
          </g>
        )
      })}

      <Rotulo x={IZQ} y={H - 44} color={SECUNDARIO} tam={16}>
        EL AIRE SE PARECE A DONDE ESTUVO QUIETO
      </Rotulo>
    </Lienzo>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 10b · Los cuatro símbolos, y lo que significan en vertical
// ═══════════════════════════════════════════════════════════════════════════

const FRENTES = [
  { clave: "frio", rotulo: "FRÍO" },
  { clave: "calido", rotulo: "CÁLIDO" },
  { clave: "estacionario", rotulo: "ESTACIONARIO" },
  { clave: "ocluido", rotulo: "OCLUIDO" },
] as const

/** Triángulo del símbolo de frente frío. Apunta hacia donde avanza. */
function Diente({ x, y, arriba }: { x: number; y: number; arriba: boolean }) {
  const h = arriba ? -13 : 13
  return <path d={`M${x - 8},${y} L${x + 8},${y} L${x},${y + h} Z`} fill={ACENTO} />
}

/** Semicírculo del símbolo de frente cálido. */
function Bulbo({ x, y, arriba }: { x: number; y: number; arriba: boolean }) {
  return (
    <path
      d={`M${x - 8},${y} A 8,8 0 0,${arriba ? 1 : 0} ${x + 8},${y} Z`}
      fill={ACENTO}
    />
  )
}

function Simbolo({ clave, x, y, w }: { clave: string; x: number; y: number; w: number }) {
  const pos = [x + w * 0.2, x + w * 0.5, x + w * 0.8]
  return (
    <g>
      <line x1={x + 6} y1={y} x2={x + w - 6} y2={y} stroke={ACENTO} strokeWidth={2.6} />
      {clave === "frio" && pos.map((px) => <Diente key={px} x={px} y={y} arriba />)}
      {clave === "calido" && pos.map((px) => <Bulbo key={px} x={px} y={y} arriba />)}
      {clave === "estacionario" && (
        <>
          <Diente x={pos[0]} y={y} arriba />
          <Bulbo x={pos[1]} y={y} arriba={false} />
          <Diente x={pos[2]} y={y} arriba />
        </>
      )}
      {clave === "ocluido" && (
        <>
          <Diente x={pos[0]} y={y} arriba />
          <Bulbo x={pos[1]} y={y} arriba />
          <Diente x={pos[2]} y={y} arriba />
        </>
      )}
    </g>
  )
}

/** El corte vertical: quién se monta sobre quién. */
function Corte({ clave, x, y, w, h }: { clave: string; x: number; y: number; w: number; h: number }) {
  const suelo = y + h
  const frio = (d: string) => <path d={d} fill={ACENTO} opacity={0.3} stroke={TINTA} strokeWidth={1.4} />
  if (clave === "frio") {
    // Denso, se mete por debajo y fuerza el ascenso: pendiente marcada.
    return (
      <g>
        {frio(`M${x},${suelo} L${x},${y + 14} L${x + w * 0.34},${suelo} Z`)}
        <Flecha x1={x + w * 0.42} y1={suelo - 12} x2={x + w * 0.56} y2={y + 22} color={ACENTO} grosor={2} tam={11} />
      </g>
    )
  }
  if (clave === "calido") {
    // Se desliza por encima del frío: pendiente tendida y larga.
    return (
      <g>
        {frio(`M${x + w},${suelo} L${x + w},${y + 58} L${x},${suelo} Z`)}
        <Flecha x1={x + w * 0.16} y1={suelo - 26} x2={x + w * 0.86} y2={y + 44} color={ACENTO} grosor={2} tam={11} />
      </g>
    )
  }
  if (clave === "estacionario") {
    // Las dos empujan parecido y el límite se queda quieto.
    return (
      <g>
        {frio(`M${x},${suelo} L${x},${y + 34} L${x + w * 0.5},${suelo} Z`)}
        <path
          d={`M${x + w},${suelo} L${x + w},${y + 34} L${x + w * 0.5},${suelo} Z`}
          fill={SECUNDARIO}
          opacity={0.2}
          stroke={TINTA}
          strokeWidth={1.4}
        />
        <Flecha x1={x + w * 0.3} y1={y + 26} x2={x + w * 0.46} y2={y + 26} color={ACENTO} grosor={2} tam={11} />
        <Flecha x1={x + w * 0.7} y1={y + 26} x2={x + w * 0.54} y2={y + 26} color={SECUNDARIO} grosor={2} tam={11} />
      </g>
    )
  }
  // Ocluido: el frío alcanza al cálido y lo levanta del suelo.
  return (
    <g>
      {frio(`M${x},${suelo} L${x},${y + 26} L${x + w * 0.46},${suelo} Z`)}
      {frio(`M${x + w},${suelo} L${x + w},${y + 40} L${x + w * 0.5},${suelo} Z`)}
      <path
        d={`M${x + w * 0.3},${y + 30} Q${x + w * 0.5},${y + 6} ${x + w * 0.7},${y + 34} Q${x + w * 0.5},${y + 46} ${x + w * 0.3},${y + 30} Z`}
        fill="#FFFFFF"
        stroke={LINEA}
        strokeWidth={1.5}
      />
    </g>
  )
}

export function MeteoSimbolos() {
  const w = (DER - IZQ - 3 * 22) / 4
  return (
    <Lienzo etiqueta="Los cuatro símbolos frontales de carta, en fila: frío con triángulos, cálido con semicírculos, estacionario alternando triángulos y semicírculos a lados opuestos del trazo, y ocluido con los dos al mismo lado. Debajo de cada símbolo, el corte vertical de cómo se monta una masa sobre la otra.">
      {FRENTES.map((f, i) => {
        const x = IZQ + i * (w + 22)
        return (
          <g key={f.clave}>
            <Rotulo x={x + w / 2} y={96} ancla="middle" tam={17}>{f.rotulo}</Rotulo>
            <Simbolo clave={f.clave} x={x} y={150} w={w} />
            <rect x={x} y={244} width={w} height={172} fill={RESALTADO} opacity={0.45} />
            <Corte clave={f.clave} x={x} y={244} w={w} h={172} />
            <line x1={x} y1={416} x2={x + w} y2={416} stroke={TINTA} strokeWidth={2} />
          </g>
        )
      })}
      <Rotulo x={IZQ} y={196} color={SECUNDARIO} tam={15}>EN LA CARTA</Rotulo>
      <Rotulo x={IZQ} y={462} color={SECUNDARIO} tam={15}>EN VERTICAL</Rotulo>
    </Lienzo>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 11 · El mismo tramo, dos frentes, dos nubosidades
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Los dos cortes, sin nombres de aeródromo.
 *
 * El caso concreto del capítulo (Junín a Formosa, con el techo y la visibilidad
 * de cada parada) vive en el bloque de etapas de la sección, justo debajo, y lo
 * cuenta mejor de lo que lo contaría un dibujo con ocho cifras dentro. Lo que la
 * lámina aporta es lo que el texto no puede: **la pendiente tendida de un frente
 * cálido al lado de la pared de uno frío**, que es de donde sale todo lo demás.
 *
 * Se quitaron los rótulos de los dos extremos a propósito. Ponerlos obliga a
 * decidir de qué lado cae la cuña fría en ese vuelo concreto, y eso el texto no
 * lo fija: dibujarlo al revés enseñaría lo contrario de lo que pasa. Genérico y
 * correcto vale más que concreto y dudoso.
 */
function Tramo({
  y,
  h,
  rotulo,
  calido,
}: {
  y: number
  h: number
  rotulo: string
  calido: boolean
}) {
  const suelo = y + h
  const x0 = IZQ
  const x1 = DER
  return (
    <g>
      <Rotulo x={x0} y={y - 14} color={ACENTO} tam={18}>{rotulo}</Rotulo>
      <rect x={x0} y={y} width={x1 - x0} height={h} fill={RESALTADO} opacity={0.4} />

      {calido ? (
        <>
          {/* La cuña fría va DELANTE del frente y el aire cálido se desliza por
              encima: pendiente larga y tendida. La nubosidad va justo encima de
              esa superficie, así que baja al acercarse al frente. */}
          <path d={`M${x0},${suelo} L${x0},${y + 104} L${x1 - 30},${suelo} Z`} fill={ACENTO} opacity={0.26} />
          <path d={`M${x0},${y + 104} L${x1 - 30},${suelo}`} fill="none" stroke={TINTA} strokeWidth={1.6} />
          {[0, 1, 2, 3].map((i) => (
            <ellipse
              key={i}
              cx={x0 + 110 + i * 190}
              cy={y + 62 + i * 24}
              rx={78 - i * 6}
              ry={15 + i * 5}
              fill="#FFFFFF"
              stroke={LINEA}
              strokeWidth={1.4}
            />
          ))}
        </>
      ) : (
        <>
          {/* La cuña fría se mete por debajo: pared, y el aire cálido sube de
              golpe. De ahí la tormenta pegada al frente. */}
          <path d={`M${x1},${suelo} L${x1},${y + 26} L${x1 - 210},${suelo} Z`} fill={ACENTO} opacity={0.26} />
          <path d={`M${x1},${y + 26} L${x1 - 210},${suelo}`} fill="none" stroke={TINTA} strokeWidth={1.6} />
          <path
            d={`M${x1 - 300},${suelo - 14}
                C${x1 - 330},${y + 118} ${x1 - 306},${y + 58} ${x1 - 282},${y + 40}
                C${x1 - 258},${y + 22} ${x1 - 218},${y + 14} ${x1 - 202},${y + 34}
                C${x1 - 180},${y + 26} ${x1 - 150},${y + 44} ${x1 - 156},${y + 76}
                C${x1 - 146},${y + 112} ${x1 - 168},${suelo - 14} ${x1 - 186},${suelo - 14} Z`}
            fill="#FFFFFF"
            stroke={LINEA}
            strokeWidth={1.6}
            strokeLinejoin="round"
          />
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1={x1 - 290 + i * 24}
              y1={suelo - 12}
              x2={x1 - 300 + i * 24}
              y2={suelo - 1}
              stroke={ACENTO_CLARO}
              strokeWidth={1.6}
            />
          ))}
        </>
      )}
      <line x1={x0} y1={suelo} x2={x1} y2={suelo} stroke={TINTA} strokeWidth={2} />
    </g>
  )
}

export function MeteoRuta() {
  return (
    <Lienzo etiqueta="Dos cortes verticales apilados. Arriba, un frente cálido: la pendiente es larga y tendida, el aire cálido se desliza por encima del frío y la nubosidad estratiforme va bajando al acercarse al frente. Abajo, un frente frío: la pendiente es una pared, el aire cálido sube de golpe y se forma una tormenta pegada al frente, con chaparrones.">
      <Tramo y={82} h={172} rotulo="FRENTE CÁLIDO" calido />
      <Tramo y={344} h={172} rotulo="FRENTE FRÍO" calido={false} />
    </Lienzo>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 12 · El ciclo entero, y dónde está el punto violento
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Las corrientes de cada etapa salen del texto de la sección: en la de cúmulo
 * **solo ascendentes**, en la madura **las dos a la vez**, y en la de disipación
 * **solo descendentes** con el yunque ya abierto. Que las dos convivan es lo que
 * hace violenta la etapa madura, así que es la única con las dos.
 */
const ETAPAS = [
  { clave: "cumulo", rotulo: "CÚMULO", sube: true, baja: false },
  { clave: "madurez", rotulo: "MADUREZ", sube: true, baja: true },
  { clave: "disipacion", rotulo: "DISIPACIÓN", sube: false, baja: true },
] as const

export function MeteoEtapas() {
  const w = (DER - IZQ - 2 * 30) / 3
  const suelo = 440
  const cima = 130

  return (
    <Lienzo etiqueta="Las tres etapas de una tormenta en fila. En la de cúmulo la nube crece y dentro solo hay corrientes ascendentes. En la madura conviven ascendentes y descendentes a la vez, con precipitación: es la etapa violenta. En la de disipación solo quedan descendentes y el yunque ya está abierto.">
      {ETAPAS.map((e, i) => {
        const x = IZQ + i * (w + 30)
        const cx = x + w / 2
        const alto = e.clave === "cumulo" ? 0.52 : 1
        const techo = suelo - (suelo - cima) * alto
        return (
          <g key={e.clave}>
            <Rotulo x={cx} y={98} ancla="middle" color={ACENTO} tam={18}>{e.rotulo}</Rotulo>
            <rect x={x} y={cima - 18} width={w} height={suelo - cima + 18} fill={RESALTADO} opacity={0.35} />

            {/* La nube. En disipación pierde la torre y se queda el yunque. */}
            {e.clave !== "disipacion" ? (
              <path
                d={`M${cx - 54},${suelo - 18}
                    Q${cx - 82},${suelo - 70} ${cx - 50},${suelo - 112}
                    Q${cx - 78},${suelo - 160} ${cx - 44},${techo + 52}
                    Q${cx - 60},${techo + 16} ${cx - 16},${techo + 8}
                    Q${cx + 24},${techo - 4} ${cx + 44},${techo + 34}
                    Q${cx + 76},${techo + 62} ${cx + 50},${suelo - 110}
                    Q${cx + 80},${suelo - 66} ${cx + 52},${suelo - 18} Z`}
                fill="#FFFFFF"
                stroke={LINEA}
                strokeWidth={1.6}
                strokeLinejoin="round"
              />
            ) : (
              <path
                d={`M${cx - 30},${suelo - 18} C${cx - 48},${techo + 130} ${cx - 40},${techo + 70} ${cx - 28},${techo + 44}
                    C${cx - 14},${techo + 24} ${cx + 16},${techo + 24} ${cx + 28},${techo + 46}
                    C${cx + 40},${techo + 72} ${cx + 46},${techo + 132} ${cx + 30},${suelo - 18} Z`}
                fill="#FFFFFF"
                stroke={LINEA}
                strokeWidth={1.6}
                strokeDasharray="14 7"
                opacity={0.8}
              />
            )}
            {e.clave !== "cumulo" && (
              <path
                d={`M${cx - 96},${techo + 32} C${cx - 72},${techo + 10} ${cx - 26},${techo - 2} ${cx + 6},${techo - 2}
                    C${cx + 44},${techo - 2} ${cx + 88},${techo + 12} ${cx + 116},${techo + 34}
                    C${cx + 84},${techo + 50} ${cx + 38},${techo + 58} ${cx},${techo + 58}
                    C${cx - 40},${techo + 58} ${cx - 76},${techo + 48} ${cx - 96},${techo + 32} Z`}
                fill="#FFFFFF"
                stroke={LINEA}
                strokeWidth={1.6}
              />
            )}

            {/* Las corrientes. Solo la madura tiene las dos. */}
            {e.sube && (
              <Flecha x1={cx - 26} y1={suelo - 34} x2={cx - 26} y2={techo + 66} color={ACENTO} grosor={2.4} tam={12} />
            )}
            {e.baja && (
              <Flecha
                x1={e.sube ? cx + 26 : cx}
                y1={techo + 76}
                x2={e.sube ? cx + 26 : cx}
                y2={suelo - 30}
                color={ACENTO_CLARO}
                grosor={2.4}
                tam={12}
              />
            )}
            {e.baja &&
              [0, 1, 2, 3].map((j) => (
                <line
                  key={j}
                  x1={cx - 34 + j * 22}
                  y1={suelo - 24}
                  x2={cx - 42 + j * 22}
                  y2={suelo - 2}
                  stroke={ACENTO_CLARO}
                  strokeWidth={1.6}
                  opacity={0.7}
                />
              ))}

            <line x1={x} y1={suelo} x2={x + w} y2={suelo} stroke={TINTA} strokeWidth={2} />
          </g>
        )
      })}
      <Rotulo x={IZQ} y={H - 42} color={ACENTO} tam={16}>ASCENDENTE</Rotulo>
      <Rotulo x={IZQ + 190} y={H - 42} color={ACENTO_CLARO} tam={16}>DESCENDENTE</Rotulo>
      <Flecha x1={IZQ - 18} y1={H - 30} x2={IZQ - 18} y2={H - 56} color={ACENTO} grosor={2} tam={10} />
      <Flecha x1={IZQ + 168} y1={H - 56} x2={IZQ + 168} y2={H - 30} color={ACENTO_CLARO} grosor={2} tam={10} />
    </Lienzo>
  )
}
