import { InfografiaCanvas } from "@/components/lesson/InfografiaCanvas"
import { Flecha, Rotulo } from "@/components/lesson/infografias/laminaMeteo"
import {
  ACENTO,
  ACENTO_CLARO,
  LINEA,
  MONO,
  PAPEL,
  RESALTADO,
  SECUNDARIO,
  TINTA,
} from "@/components/lesson/infografias/laminaMeteoTokens"

/**
 * Las láminas de los niveles 4 y 5, el METAR y el TAF.
 *
 * Aquí el criterio para que una figura exista es más estricto que en los niveles
 * de teoría, porque **estas secciones ya explican su contenido en HTML, con
 * bloques que lo hacen mejor que un dibujo**: `breakdown` parte un METAR en sus
 * grupos con su explicación, y los `kv` listan las claves. Una figura que repita
 * esas listas es tinta gastada.
 *
 * Así que cada una de las de aquí hace lo que el texto no puede:
 *
 *  · **Tiempo presente:** cómo se *arma* un código juntando uno de cada columna.
 *    Los tres listados de claves ya están arriba; lo que no está es el montaje.
 *  · **Componente de viento:** geometría. Qué cabecera tiene cara y cuál cola
 *    con el mismo viento.
 *  · **Cobertura:** cuánto cielo es realmente un tercio o siete octavos, que en
 *    una tabla es un número y mirando es una imagen.
 *  · **METAR y TAF:** que uno es un instante y el otro un periodo, en una línea
 *    de tiempo.
 *  · **Grupos de cambio:** la forma que tiene cada uno en el tiempo, que es lo
 *    que los distingue.
 *
 * Por el mismo criterio se quitó la figura del METAR grupo a grupo: repetía el
 * `breakdown` que tiene justo encima.
 */

const W = 1000
const H = 560
const IZQ = 48
const DER = W - IZQ

function Lienzo({ etiqueta, children }: { etiqueta: string; children: React.ReactNode }) {
  return (
    <InfografiaCanvas width={W} height={H} label={etiqueta} vectorial>
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: PAPEL, fontFamily: "'Inter Variable', Inter, Helvetica, Arial, sans-serif" }}
      >
        {children}
      </svg>
    </InfografiaCanvas>
  )
}

/** Clave de METAR, en mono y a tamaño de lectura. */
function Clave({
  x,
  y,
  children,
  tam = 46,
  color = ACENTO,
  ancla = "middle",
}: {
  x: number
  y: number
  children: string
  tam?: number
  color?: string
  ancla?: "middle" | "start"
}) {
  return (
    <text x={x} y={y} textAnchor={ancla} fontFamily={MONO} fontSize={tam} fontWeight={700} fill={color}>
      {children}
    </text>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 17 · Un código de tiempo presente se arma por piezas
// ═══════════════════════════════════════════════════════════════════════════

const PIEZAS = [
  { clave: "+", columna: "INTENSIDAD", significa: "LLUVIA FUERTE" },
  { clave: "TS", columna: "DESCRIPTOR", significa: "TORMENTA" },
  { clave: "RA", columna: "FENÓMENO", significa: "LLUVIA" },
] as const

export function MeteoTiempoPresente() {
  const anchos = [70, 116, 116]
  const total = anchos.reduce((a, b) => a + b, 0)
  const inicio = (W - total) / 2
  // El desplazamiento de cada caja sale de sumar las anteriores, sin mutar nada
  // durante el render: la regla de React lo prohíbe y tiene razón.
  const cajas = PIEZAS.map((p, i) => ({
    ...p,
    x: inicio + anchos.slice(0, i).reduce((a, b) => a + b, 0),
    w: anchos[i],
  }))

  return (
    <Lienzo etiqueta="El código de tiempo presente del ejemplo +TSRA se parte en tres piezas presentes: el signo más indica intensidad fuerte de la lluvia, TS es el descriptor de tormenta y RA es el fenómeno de lluvia. Otros códigos pueden omitir alguna pieza.">
      <Rotulo x={W / 2} y={104} ancla="middle" color={SECUNDARIO} tam={17}>
        EJEMPLO · ORDEN DE LAS PIEZAS PRESENTES
      </Rotulo>

      {/* El código entero, partido en sus tres piezas. */}
      {cajas.map((c) => (
        <g key={c.clave}>
          <rect x={c.x} y={150} width={c.w} height={86} fill={RESALTADO} stroke={LINEA} strokeWidth={1.4} />
          <Clave x={c.x + c.w / 2} y={212}>{c.clave}</Clave>
        </g>
      ))}

      {/* De cada pieza, a qué columna pertenece y qué significa. */}
      {cajas.map((c, i) => {
        const cx = c.x + c.w / 2
        const yCol = 300 + i * 74
        return (
          <g key={c.columna}>
            <Flecha x1={cx} y1={244} x2={cx} y2={yCol - 26} color={LINEA} grosor={1.6} tam={10} />
            <Rotulo x={cx} y={yCol} ancla="middle" color={ACENTO} tam={18}>
              {c.columna}
            </Rotulo>
            <Rotulo x={cx} y={yCol + 26} ancla="middle" color={SECUNDARIO} tam={16}>
              {c.significa}
            </Rotulo>
          </g>
        )
      })}
    </Lienzo>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 15 · El mismo viento, cara por una cabecera y cola por la otra
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Ejemplo idealizado: ejes 090°/270° verdaderos, de modo que la dirección del
 * METAR y la de la pista comparten referencia. Viento de 270 grados: **sopla
 * desde** el oeste, así que va hacia el este. Por
 * eso aterrizando en la 27 (rumbo 270, hacia el oeste) se le vuela de cara, y en
 * la 09 (rumbo 090, hacia el este) se le lleva de cola. El error clásico es leer
 * «270» como la dirección a la que va el viento; en meteorología es siempre de
 * dónde viene.
 */
export function MeteoComponente() {
  const cy = 268
  const px = 210
  const pw = DER - px - 40
  return (
    <Lienzo etiqueta="Ejemplo idealizado con ejes de pista 090 y 270 grados verdaderos, la misma referencia que el viento del METAR. Una pista 09 barra 27 vista desde arriba, con viento de 270 grados a 15 nudos soplando desde el oeste. Aterrizando por la cabecera 27 se vuela contra ese viento, así que es viento de cara; aterrizando por la 09 se vuela con él detrás, así que es de cola.">
      <Rotulo x={IZQ} y={86} color={SECUNDARIO} tam={17}>EJEMPLO · EJES 090° / 270° VERDADEROS</Rotulo>
      {/* La pista, de canto. */}
      <rect x={px} y={cy - 34} width={pw} height={68} fill={ACENTO} opacity={0.42} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={px + 78 + i * 96} y={cy - 3} width={46} height={6} fill={PAPEL} opacity={0.9} />
      ))}
      <Clave x={px + 34} y={cy + 13} tam={30} color={PAPEL}>09</Clave>
      <Clave x={px + pw - 34} y={cy + 13} tam={30} color={PAPEL}>27</Clave>

      {/* El viento. «270» es de DÓNDE viene, no a dónde va: viene del oeste, así
          que las flechas apuntan al este. Dibujarlas al revés contradice los
          rótulos de cara y cola que hay debajo. */}
      {[-96, -48, 48, 96].map((dy) => (
        <Flecha
          key={dy}
          x1={px - 24}
          y1={cy + dy}
          x2={px + pw + 14}
          y2={cy + dy}
          color={ACENTO}
          grosor={2}
          tam={12}
        />
      ))}
      <Rotulo x={DER} y={cy - 130} ancla="end" color={ACENTO} tam={19}>
        VIENTO 270°/15 KT
      </Rotulo>

      {/* Qué es para cada cabecera. */}
      <Rotulo x={px - 24} y={cy + 156} color={ACENTO_CLARO} tam={19}>ATERRIZANDO 09: COLA</Rotulo>
      <Rotulo x={DER} y={cy + 156} ancla="end" color={ACENTO} tam={19}>ATERRIZANDO 27: CARA</Rotulo>
      <g>
        <Flecha x1={IZQ + 22} y1={cy + 30} x2={IZQ + 22} y2={cy - 24} color={SECUNDARIO} grosor={1.8} tam={11} />
        <Rotulo x={IZQ + 22} y={cy + 54} ancla="middle" color={SECUNDARIO} tam={16}>N</Rotulo>
      </g>
    </Lienzo>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 18 · Cuánto cielo es cada cobertura
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Las claves están en el `kv` de la sección. Lo que un listado no da es **cuánto
 * cielo es realmente eso**: cinco octavos es un número hasta que se ve. Y de ahí
 * sale la decisión, porque la primera capa BKN u OVC es la que define el techo.
 */
const COBERTURAS = [
  { clave: "SKC", octavos: "0/8", n: 0, techo: false },
  { clave: "FEW", octavos: "1-2/8", n: 2, techo: false },
  { clave: "SCT", octavos: "3-4/8", n: 4, techo: false },
  { clave: "BKN", octavos: "5-7/8", n: 6, techo: true },
  { clave: "OVC", octavos: "8/8", n: 8, techo: true },
] as const

export function MeteoCobertura() {
  const w = (DER - IZQ - 4 * 24) / 5
  const y0 = 160
  const h = 150
  return (
    <Lienzo etiqueta="Las cinco coberturas de cielo del METAR, una al lado de otra, con la porción de cielo que cubre cada una en octavos: despejado, escasas, dispersas, fragmentadas y cubierto. Las dos últimas, fragmentadas y cubierto, van marcadas porque son las que definen el techo.">
      {COBERTURAS.map((c, i) => {
        const x = IZQ + i * (w + 24)
        return (
          <g key={c.clave}>
            <rect x={x} y={y0} width={w} height={h} fill={ACENTO} opacity={0.34} stroke={LINEA} strokeWidth={1.4} />
            {/* Los octavos, como octavos: ocho casillas y las cubiertas rellenas. */}
            {Array.from({ length: 8 }, (_, j) => (
              <rect
                key={j}
                x={x + 10 + (j % 4) * ((w - 20) / 4)}
                y={y0 + 14 + Math.floor(j / 4) * 58}
                width={(w - 20) / 4 - 5}
                height={52}
                fill={j < c.n ? "#FFFFFF" : "none"}
                stroke={j < c.n ? LINEA : PAPEL}
                strokeWidth={1.3}
                opacity={j < c.n ? 1 : 0.35}
              />
            ))}
            <Clave x={x + w / 2} y={y0 + h + 48} tam={26} color={c.techo ? ACENTO : SECUNDARIO}>
              {c.clave}
            </Clave>
            <Rotulo x={x + w / 2} y={y0 + h + 76} ancla="middle" color={SECUNDARIO} tam={16}>
              {c.octavos}
            </Rotulo>
            {c.techo && (
              <rect x={x} y={y0 + h + 92} width={w} height={3} fill={ACENTO} />
            )}
          </g>
        )
      })}
      <Rotulo x={IZQ} y={H - 46} color={ACENTO} tam={17}>
        LA PRIMERA BKN U OVC DEFINE EL TECHO
      </Rotulo>
    </Lienzo>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 22 · El METAR es un instante; el TAF, un periodo
// ═══════════════════════════════════════════════════════════════════════════

export function MeteoLineaTiempo() {
  const x0 = IZQ + 40
  const x1 = DER - 40
  const yM = 210
  const yT = 330
  const xEta = x0 + (x1 - x0) * 0.62
  return (
    <Lienzo etiqueta="Una línea de tiempo con los dos productos encima. El METAR es un punto: describe un instante que ya pasó. El TAF es una banda que cubre todo un periodo por delante, y dentro de esa banda se sitúa la hora estimada de llegada.">
      {/* El METAR: un punto. */}
      <Rotulo x={x0} y={yM - 44} color={ACENTO} tam={19}>METAR</Rotulo>
      <Rotulo x={x0} y={yM - 20} color={SECUNDARIO} tam={16}>UN INSTANTE</Rotulo>
      <line x1={x0} y1={yM} x2={x0} y2={yM + 40} stroke={ACENTO} strokeWidth={3} />
      <circle cx={x0} cy={yM} r={11} fill={ACENTO} />

      {/* El TAF: una banda. */}
      <Rotulo x={x0} y={yT - 42} color={ACENTO} tam={19}>TAF</Rotulo>
      <Rotulo x={x0} y={yT - 18} color={SECUNDARIO} tam={16}>UN PERIODO POR DELANTE</Rotulo>
      <rect x={x0} y={yT} width={x1 - x0} height={62} fill={ACENTO} opacity={0.26} />
      <rect x={x0} y={yT} width={4} height={62} fill={ACENTO} />
      <rect x={x1 - 4} y={yT} width={4} height={62} fill={ACENTO} />

      {/* La llegada, dentro de la banda: ahí es donde se decide. */}
      <line x1={xEta} y1={yT - 6} x2={xEta} y2={yT + 92} stroke={ACENTO_CLARO} strokeWidth={2.6} strokeDasharray="8 6" />
      <circle cx={xEta} cy={yT + 31} r={9} fill={ACENTO_CLARO} />
      <Rotulo x={xEta} y={yT + 120} ancla="middle" color={ACENTO_CLARO} tam={18}>
        TU LLEGADA
      </Rotulo>

      {/* El eje del tiempo. */}
      <line x1={IZQ} y1={462} x2={DER} y2={462} stroke={TINTA} strokeWidth={2} />
      <Flecha x1={DER - 90} y1={462} x2={DER} y2={462} color={TINTA} grosor={2} tam={12} />
      <Rotulo x={IZQ} y={492} color={SECUNDARIO} tam={16}>TIEMPO</Rotulo>
    </Lienzo>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 23 · Cada grupo de cambio tiene su forma en el tiempo
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Lo que distingue a los cuatro no es lo que significan (eso está en el `kv` de
 * la sección) sino **la forma que dibujan en el tiempo**: un corte, una rampa,
 * unos bloques que van y vienen, y esos mismos bloques con una probabilidad
 * encima. Puestos en cuatro carriles sobre la misma línea, se distinguen sin
 * leer nada.
 */
const CAMBIOS = [
  { clave: "FM", forma: "corte" },
  { clave: "BECMG", forma: "rampa" },
  { clave: "TEMPO", forma: "bloques" },
  { clave: "PROB40", forma: "probable" },
] as const

export function MeteoCambios() {
  const x0 = IZQ + 150
  const x1 = DER - 20
  const alto = 56
  const hueco = 34
  const y0 = 128

  return (
    <Lienzo etiqueta="Cuatro carriles sobre la misma línea de tiempo, uno por grupo de cambio. FM es un corte limpio: antes una cosa y después otra. BECMG es una transición gradual. TEMPO son bloques intermitentes que van y vienen. PROB40 son esos mismos bloques, dibujados más tenues porque solo son probables.">
      {CAMBIOS.map((c, i) => {
        const y = y0 + i * (alto + hueco)
        const corte = x0 + (x1 - x0) * 0.42
        return (
          <g key={c.clave}>
            <Rotulo x={x0 - 26} y={y + alto / 2 + 7} ancla="end" color={ACENTO} tam={19}>
              {c.clave}
            </Rotulo>
            <line x1={x0} y1={y + alto} x2={x1} y2={y + alto} stroke={LINEA} strokeWidth={1.4} />

            {c.forma === "corte" && (
              <>
                <rect x={x0} y={y + 22} width={corte - x0} height={alto - 22} fill={ACENTO} opacity={0.18} />
                <rect x={corte} y={y} width={x1 - corte} height={alto} fill={ACENTO} opacity={0.42} />
                <line x1={corte} y1={y - 8} x2={corte} y2={y + alto + 8} stroke={ACENTO} strokeWidth={2.6} />
              </>
            )}
            {c.forma === "rampa" && (
              <>
                <rect x={x0} y={y + 22} width={corte - x0 - 50} height={alto - 22} fill={ACENTO} opacity={0.18} />
                <path
                  d={`M${corte - 50},${y + alto} L${corte - 50},${y + 22} L${corte + 50},${y} L${x1},${y} L${x1},${y + alto} Z`}
                  fill={ACENTO}
                  opacity={0.34}
                />
                <path
                  d={`M${corte - 50},${y + 22} L${corte + 50},${y}`}
                  fill="none"
                  stroke={ACENTO}
                  strokeWidth={2.4}
                />
              </>
            )}
            {(c.forma === "bloques" || c.forma === "probable") && (
              <>
                <rect x={x0} y={y + 26} width={x1 - x0} height={alto - 26} fill={ACENTO} opacity={0.14} />
                {[0, 1, 2].map((j) => (
                  <rect
                    key={j}
                    x={x0 + 60 + j * 176}
                    y={y}
                    width={96}
                    height={alto}
                    fill={ACENTO}
                    opacity={c.forma === "probable" ? 0.2 : 0.44}
                    stroke={c.forma === "probable" ? ACENTO : "none"}
                    strokeWidth={c.forma === "probable" ? 2 : 0}
                    strokeDasharray={c.forma === "probable" ? "8 6" : undefined}
                  />
                ))}
              </>
            )}
          </g>
        )
      })}
      <Flecha x1={DER - 100} y1={H - 52} x2={DER} y2={H - 52} color={TINTA} grosor={2} tam={12} />
      <Rotulo x={x0 - 26} y={H - 46} ancla="end" color={SECUNDARIO} tam={16}>TIEMPO</Rotulo>
    </Lienzo>
  )
}
