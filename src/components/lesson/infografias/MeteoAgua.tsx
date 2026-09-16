import { InfografiaCanvas } from "@/components/lesson/InfografiaCanvas"
import { Corriente, Flecha, Punta, Rotulo } from "@/components/lesson/infografias/laminaMeteo"
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
 * Las cuatro láminas del nivel 2, "Agua, estabilidad y nubes" (secciones 6 a 9).
 *
 * SVG escrito a mano, como las de las secciones 1, 3 y 4. Aquí lo que no se
 * puede confiar a un generador son las **cifras**: la base de la nube sale de
 * una cuenta que el piloto va a repetir de cabeza, y las alturas de las familias
 * son las que el módulo cita del capítulo. Un 6.500 mal puesto o dos rectas que
 * se cortan donde no toca enseñan mal una cuenta que después se usa.
 *
 * Todas las cifras salen del texto de su propia sección y de ningún otro sitio:
 * 29 y 21 °C de separación, 2,45 °C por cada 1.000 ft, 3.260 ft de base, y
 * 6.500 y 20.000 ft de frontera entre familias.
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
        style={{ background: PAPEL, fontFamily: "Inter, Helvetica, Arial, sans-serif" }}
      >
        {children}
      </svg>
    </InfografiaCanvas>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 6 · La inversión: la misma altura, dos comportamientos de la temperatura
// ═══════════════════════════════════════════════════════════════════════════

const PERFIL_SUELO = 432
const PERFIL_CIMA = 112

/** Un perfil de temperatura: eje de altura a la izquierda, temperatura abajo. */
function Perfil({
  x,
  w,
  titulo,
  invertido,
}: {
  x: number
  w: number
  titulo: string
  invertido?: boolean
}) {
  // La temperatura crece hacia la derecha. En un perfil normal la línea sube
  // hacia la izquierda: más alto, más frío. En uno con inversión, los primeros
  // cientos de pies van al revés y por eso la línea sale hacia la derecha antes
  // de enderezarse.
  const tibio = x + w * 0.74
  const frio = x + w * 0.2
  const yInv = PERFIL_SUELO - 68
  const linea = invertido
    ? `M${x + w * 0.44},${PERFIL_SUELO} L${tibio},${yInv} L${frio},${PERFIL_CIMA}`
    : `M${tibio},${PERFIL_SUELO} L${frio},${PERFIL_CIMA}`

  return (
    <g>
      {invertido && (
        <>
          {/* La capa de inversión, y debajo lo que deja atrapado. */}
          <rect x={x} y={yInv} width={w} height={PERFIL_SUELO - yInv} fill={ACENTO} opacity={0.14} />
          <line x1={x} y1={yInv} x2={x + w} y2={yInv} stroke={ACENTO} strokeWidth={2} strokeDasharray="9 7" />
          <rect x={x + 2} y={PERFIL_SUELO - 26} width={w - 4} height={26} fill={ACENTO} opacity={0.3} />
        </>
      )}
      <Corriente d={linea} color={invertido ? ACENTO : SECUNDARIO} grosor={3} />
      {/* Ejes. */}
      <line x1={x} y1={PERFIL_CIMA} x2={x} y2={PERFIL_SUELO} stroke={LINEA} strokeWidth={1.6} />
      <line x1={x} y1={PERFIL_SUELO} x2={x + w} y2={PERFIL_SUELO} stroke={TINTA} strokeWidth={2} />
      <Rotulo x={x} y={PERFIL_CIMA - 22} color={invertido ? ACENTO : TINTA} tam={19}>
        {titulo}
      </Rotulo>
      {invertido && (
        <Rotulo x={x + w - 6} y={yInv - 12} ancla="end" color={ACENTO} tam={16}>
          INVERSIÓN
        </Rotulo>
      )}
    </g>
  )
}

export function MeteoInversion() {
  const w = (DER - IZQ - 74) / 2
  return (
    <Lienzo etiqueta="Dos perfiles verticales de temperatura, uno al lado del otro. En el normal la temperatura baja de forma continua con la altura. En el de inversión, los primeros cientos de pies se calientan con la altura en lugar de enfriarse, y esa capa deja atrapado debajo el tiempo y la mala visibilidad.">
      <Perfil x={IZQ} w={w} titulo="SIN INVERSIÓN" />
      <Perfil x={IZQ + w + 74} w={w} titulo="CON INVERSIÓN" invertido />

      {/* Los dos ejes, rotulados una sola vez. */}
      <Rotulo x={IZQ} y={PERFIL_SUELO + 40} color={SECUNDARIO} tam={16}>
        TEMPERATURA
      </Rotulo>
      <Flecha
        x1={IZQ + 148}
        y1={PERFIL_SUELO + 34}
        x2={IZQ + 210}
        y2={PERFIL_SUELO + 34}
        color={SECUNDARIO}
        grosor={1.8}
        tam={11}
      />
      <g transform={`translate(${IZQ - 20} ${(PERFIL_CIMA + PERFIL_SUELO) / 2}) rotate(-90)`}>
        <Rotulo x={0} y={0} ancla="middle" color={SECUNDARIO} tam={16}>
          ALTURA
        </Rotulo>
      </g>
      <Rotulo x={DER} y={H - 42} ancla="end" color={SECUNDARIO} tam={16}>
        DEBAJO QUEDA ATRAPADO EL TIEMPO
      </Rotulo>
    </Lienzo>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 7 · Dónde se cortan las dos rectas está la base de la nube
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Las cifras son las del ejemplo de la sección y no otras: 29 °C de temperatura,
 * 21 °C de punto de rocío, y la base a 3.260 ft porque los 8 °C de separación se
 * cierran a 2,45 °C por cada 1.000 ft. Si el ejemplo del texto cambia, cambian
 * aquí: la lámina no puede enseñar una cuenta distinta de la que está escrita.
 */
const T_SUELO = 29
const PR_SUELO = 21
const BASE_KFT = (T_SUELO - PR_SUELO) / 2.45

export function MeteoBaseNube() {
  const x0 = IZQ + 96
  const x1 = DER - 150
  const ySuelo = 452
  const yCima = 120
  /** Y de una altura en miles de pies, con 4.000 ft arriba del todo. */
  const y = (kft: number) => ySuelo - (kft / 4) * (ySuelo - yCima)
  const yBase = y(BASE_KFT)
  // En superficie, el punto de rocío queda a la izquierda de la temperatura.
  const xPR = x0 + 300
  const xT = x0 + 520
  const xCorte = x0 + 96

  return (
    <Lienzo etiqueta="Gráfico de temperatura contra altura. Dos rectas salen del suelo, la de temperatura desde 29 grados y la de punto de rocío desde 21, y se acercan 2,45 grados por cada mil pies hasta cortarse a 3.260 pies. Ahí está la base de la nube.">
      {/* Rejilla de alturas. */}
      {[1, 2, 3, 4].map((k) => (
        <g key={k}>
          <line x1={x0} y1={y(k)} x2={x1} y2={y(k)} stroke={LINEA} strokeWidth={1.2} opacity={0.7} />
          <Rotulo x={x0 - 14} y={y(k) + 6} ancla="end" color={SECUNDARIO} tam={15}>
            {`${k}.000 ft`}
          </Rotulo>
        </g>
      ))}

      {/* Las dos rectas. Las dos se enfrían al subir, así que las dos van hacia
          la izquierda; el punto de rocío arranca a la izquierda porque 21 °C es
          más frío que 29. Convergen porque la temperatura cae más deprisa: los
          8 °C de separación se cierran a 2,45 °C por cada 1.000 ft. */}
      <Corriente d={`M${xT},${ySuelo} L${xCorte},${yBase}`} color={ACENTO} grosor={3} />
      <Corriente d={`M${xPR},${ySuelo} L${xCorte},${yBase}`} color={ACENTO_CLARO} grosor={3} />

      {/* La nube donde se encuentran. */}
      <g>
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            cx={xCorte - 44 + i * 30}
            cy={yBase - 20 - (i === 1 || i === 2 ? 12 : 0)}
            r={i === 1 || i === 2 ? 30 : 23}
            fill="#FFFFFF"
            stroke={LINEA}
            strokeWidth={1.5}
          />
        ))}
        <rect x={xCorte - 68} y={yBase - 3} width={140} height={4} fill="#FFFFFF" />
        <line x1={xCorte - 68} y1={yBase} x2={xCorte + 72} y2={yBase} stroke={ACENTO} strokeWidth={2.4} />
      </g>

      <Rotulo x={xCorte + 92} y={yBase - 6} color={ACENTO} tam={19}>
        BASE DE LA NUBE
      </Rotulo>
      <Rotulo x={xCorte + 92} y={yBase + 20} color={SECUNDARIO} tam={17}>
        3.260 ft
      </Rotulo>

      <Rotulo x={xPR - 4} y={ySuelo + 34} color={ACENTO_CLARO} tam={17}>
        {`${PR_SUELO} °C`}
      </Rotulo>
      <Rotulo x={xPR - 4} y={ySuelo + 58} color={ACENTO_CLARO} tam={15}>
        PUNTO DE ROCÍO
      </Rotulo>
      <Rotulo x={xT - 4} y={ySuelo + 34} color={ACENTO} tam={17}>
        {`${T_SUELO} °C`}
      </Rotulo>
      <Rotulo x={xT - 4} y={ySuelo + 58} color={ACENTO} tam={15}>
        TEMPERATURA
      </Rotulo>

      <line x1={x0} y1={ySuelo} x2={x1} y2={ySuelo} stroke={TINTA} strokeWidth={2.4} />
      <line x1={x0} y1={ySuelo} x2={x0} y2={yCima} stroke={LINEA} strokeWidth={1.6} />
    </Lienzo>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 8 · Las cuatro familias, cada una a su altura
// ═══════════════════════════════════════════════════════════════════════════

/** Fronteras del capítulo: bases de 6.500 y 20.000 ft AGL. */
const FRONTERA_BAJA = 6.5
const FRONTERA_ALTA = 20
const TECHO_KFT = 30

export function MeteoFamilias() {
  const ySuelo = 470
  const yCima = 76
  const y = (kft: number) => ySuelo - (kft / TECHO_KFT) * (ySuelo - yCima)
  const xEje = IZQ + 104
  const cbx = 730

  /** Un grupo de bultos redondos, para las nubes de cada familia. */
  const nube = (cx: number, cy: number, r: number, n: number, k: string) => (
    <g key={k}>
      {Array.from({ length: n }, (_, i) => (
        <circle
          key={i}
          cx={cx + (i - (n - 1) / 2) * r * 1.25}
          cy={cy - (i === Math.floor(n / 2) ? r * 0.3 : 0)}
          r={r * (i === Math.floor(n / 2) ? 1 : 0.78)}
          fill="#FFFFFF"
          stroke={LINEA}
          strokeWidth={1.4}
        />
      ))}
    </g>
  )

  return (
    <Lienzo etiqueta="Corte vertical con las cuatro familias de nubes a su altura. Las bajas van de la superficie a 6.500 pies, las medias de 6.500 a 20.000, y las altas por encima de 20.000. A la derecha, una nube de desarrollo vertical con la base entre las bajas y la cima arriba del todo, atravesándolas todas.">
      {/* Bandas de cada familia, cada vez más tenues al subir. */}
      <rect x={xEje} y={y(FRONTERA_BAJA)} width={DER - xEje} height={ySuelo - y(FRONTERA_BAJA)} fill={RESALTADO} />
      <rect
        x={xEje}
        y={y(FRONTERA_ALTA)}
        width={DER - xEje}
        height={y(FRONTERA_BAJA) - y(FRONTERA_ALTA)}
        fill={RESALTADO}
        opacity={0.55}
      />
      <rect x={xEje} y={yCima} width={DER - xEje} height={y(FRONTERA_ALTA) - yCima} fill={RESALTADO} opacity={0.25} />

      {[FRONTERA_BAJA, FRONTERA_ALTA].map((k) => (
        <g key={k}>
          <line x1={xEje} y1={y(k)} x2={DER} y2={y(k)} stroke={ACENTO} strokeWidth={1.8} strokeDasharray="9 7" />
          <Rotulo x={xEje - 14} y={y(k) + 6} ancla="end" color={SECUNDARIO} tam={16}>
            {`${k === FRONTERA_BAJA ? "6.500" : "20.000"} ft`}
          </Rotulo>
        </g>
      ))}

      {/* Una muestra por familia, a su altura. */}
      {nube(300, y(3.2), 22, 3, "bajas")}
      {nube(300, y(13), 18, 4, "medias")}
      <g>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${250 + i * 58},${y(24.5) + i * 9} q 30,-12 62,-4 q 22,5 44,-2`}
            fill="none"
            stroke={LINEA}
            strokeWidth={2.4}
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* Desarrollo vertical: base abajo, cima arriba del todo. La silueta va
          con bultos porque una columna lisa con una lente encima se lee como un
          hongo y no como una nube. */}
      <path
        d={(() => {
          const base = 2.2
          const cima = 25.2
          const pasos = 6
          const ancho = (v: number) => 40 + v * 26
          const bultos = [17, 9, 15, 8, 16]
          const kEn = (i: number) => base + ((cima - base) * i) / pasos
          let d = `M${cbx - ancho(0) - 12},${y(base)} L${cbx - ancho(0)},${y(base + 0.6)}`
          for (let i = 1; i <= pasos; i++) {
            const x0b = cbx - ancho((i - 1) / pasos)
            const x1b = cbx - ancho(i / pasos)
            d += ` Q${Math.min(x0b, x1b) - (bultos[i - 1] ?? 12)},${(y(kEn(i - 1)) + y(kEn(i))) / 2} ${x1b},${y(kEn(i))}`
          }
          d += ` Q${cbx},${y(cima) - 28} ${cbx + ancho(1)},${y(cima)}`
          for (let i = pasos - 1; i >= 0; i--) {
            const x0b = cbx + ancho((i + 1) / pasos)
            const x1b = cbx + ancho(i / pasos)
            d += ` Q${Math.max(x0b, x1b) + (bultos[i] ?? 12)},${(y(kEn(i + 1)) + y(kEn(i))) / 2} ${x1b},${y(kEn(i))}`
          }
          return `${d} L${cbx + ancho(0) + 14},${y(base)} Z`
        })()}
        fill="#FFFFFF"
        stroke={LINEA}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      {/* El yunque, en cuña y a favor del viento en altura. */}
      <path
        d={`M${cbx - 140},${y(26)}
            C${cbx - 108},${y(28.4)} ${cbx - 52},${y(29.6)} ${cbx - 10},${y(29.7)}
            C${cbx + 38},${y(29.8)} ${cbx + 108},${y(28.6)} ${cbx + 168},${y(26.2)}
            C${cbx + 124},${y(23.9)} ${cbx + 52},${y(23)} ${cbx},${y(23.1)}
            C${cbx - 54},${y(23.2)} ${cbx - 112},${y(24.2)} ${cbx - 140},${y(26)} Z`}
        fill="#FFFFFF"
        stroke={LINEA}
        strokeWidth={1.6}
      />

      <Rotulo x={xEje + 18} y={ySuelo - 22} color={ACENTO} tam={18}>BAJAS</Rotulo>
      <Rotulo x={xEje + 18} y={y(13) + 54} color={ACENTO} tam={18}>MEDIAS</Rotulo>
      <Rotulo x={xEje + 18} y={y(24) + 8} color={ACENTO} tam={18}>ALTAS</Rotulo>
      <Rotulo x={DER} y={yCima - 18} ancla="end" color={ACENTO} tam={18}>DESARROLLO VERTICAL</Rotulo>

      <line x1={xEje} y1={ySuelo} x2={DER} y2={ySuelo} stroke={TINTA} strokeWidth={2.4} />
      <line x1={xEje} y1={ySuelo} x2={xEje} y2={yCima} stroke={LINEA} strokeWidth={1.6} />
    </Lienzo>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 9 · Cuatro nieblas, cuatro decisiones
// ═══════════════════════════════════════════════════════════════════════════

/**
 * El veredicto de cada una sale del texto de la sección, que es donde está la
 * decisión del despacho: la de radiación **se quema con el sol y el viento**, la
 * de advección y la de ladera **no**, y pueden durar días. La de vapor es la
 * única a la que el módulo le asocia hielo, así que ese es su rótulo.
 *
 * Son cuatro y no cinco a propósito: la de hielo la llevan las fichas de arriba,
 * es de regiones árticas y meter una quinta viñeta solo añadiría densidad.
 */
const NIEBLAS = [
  { clave: "radiacion", nombre: "DE RADIACIÓN", veredicto: "SE QUEMA CON EL SOL", bueno: true },
  { clave: "adveccion", nombre: "DE ADVECCIÓN", veredicto: "NO SE QUEMA", bueno: false },
  { clave: "ladera", nombre: "DE LADERA", veredicto: "NO SE QUEMA", bueno: false },
  { clave: "vapor", nombre: "DE VAPOR", veredicto: "ADEMÁS TRAE HIELO", bueno: false },
] as const

/** El mecanismo de cada niebla, dibujado dentro de su viñeta. */
function Mecanismo({ clave, x, y: yy, w, h }: { clave: string; x: number; y: number; w: number; h: number }) {
  const suelo = yy + h
  const banda = (
    <rect x={x} y={suelo - 22} width={w} height={22} fill={ACENTO} opacity={0.28} />
  )
  if (clave === "radiacion") {
    return (
      <g>
        {banda}
        {/* El suelo se enfría de noche y el sol la levanta por la mañana. */}
        {[0, 1, 2].map((i) => (
          <Flecha key={i} x1={x + 40 + i * 46} y1={suelo - 34} x2={x + 40 + i * 46} y2={suelo - 74} color={SECUNDARIO} grosor={1.8} tam={10} />
        ))}
        <circle cx={x + w - 46} cy={yy + 34} r={15} fill={LINEA} opacity={0.9} />
      </g>
    )
  }
  if (clave === "adveccion") {
    return (
      <g>
        {banda}
        {/* Aire cálido y húmedo que llega de lado sobre una superficie fría. */}
        {[0, 1, 2].map((i) => (
          <Flecha key={i} x1={x + 16} y1={suelo - 40 - i * 22} x2={x + w - 40} y2={suelo - 40 - i * 22} color={ACENTO} grosor={2} tam={11} />
        ))}
        <rect x={x + w * 0.5} y={suelo - 8} width={w * 0.5} height={8} fill={ACENTO} opacity={0.55} />
      </g>
    )
  }
  if (clave === "ladera") {
    // La ladera, y las corrientes por encima de ella. Se muestrean y en cada
    // punto se quedan en el menor de su altura libre y la del terreno menos un
    // despeje: así ninguna entra en la roca, que es lo que pasaba trazándolas a
    // ojo con curvas.
    const cimaX = x + w * 0.62
    const cimaY = yy + 26
    const relieve = (px: number) =>
      px >= cimaX ? cimaY : suelo - (suelo - cimaY) * ((px - x) / (cimaX - x))
    const traza = (libre: number, despeje: number) => {
      const pts: string[] = []
      for (let px = x + 8; px <= cimaX; px += 5) {
        // Nunca dentro de la roca, y nunca fuera del recuadro por arriba.
        const v = Math.max(yy + 10, Math.min(libre, relieve(px) - despeje))
        pts.push(`${px},${v.toFixed(1)}`)
      }
      return `M${pts.join(" L")}`
    }
    return (
      <g>
        <path d={`M${x},${suelo} L${cimaX},${cimaY} L${x + w},${suelo} Z`} fill={ACENTO} opacity={0.26} />
        <path d={`M${x},${suelo} L${cimaX},${cimaY}`} fill="none" stroke={TINTA} strokeWidth={1.6} />
        {[
          { libre: suelo - 26, despeje: 10 },
          { libre: suelo - 60, despeje: 30 },
          { libre: suelo - 94, despeje: 50 },
        ].map((c, i) => (
          <g key={i}>
            <Corriente d={traza(c.libre, c.despeje)} color={ACENTO} grosor={2} />
            <Punta x={cimaX} y={Math.max(yy + 10, cimaY - c.despeje)} ang={-0.72} color={ACENTO} tam={10} />
          </g>
        ))}
        <rect x={x} y={suelo - 18} width={w * 0.3} height={18} fill={ACENTO} opacity={0.3} />
      </g>
    )
  }
  return (
    <g>
      {/* Agua cálida debajo, aire frío encima: el vapor sube como humo. */}
      <rect x={x} y={suelo - 26} width={w} height={26} fill={ACENTO} opacity={0.42} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Corriente
          key={i}
          d={`M${x + 34 + i * 40},${suelo - 30} q 10,-18 -2,-32 q -10,-14 2,-28`}
          color={ACENTO_CLARO}
          grosor={2}
        />
      ))}
      <Flecha x1={x + w - 30} y1={yy + 26} x2={x + 36} y2={yy + 26} color={SECUNDARIO} grosor={1.8} tam={11} />
    </g>
  )
}

export function MeteoNieblas() {
  const w = (DER - IZQ - 36) / 2
  const h = 176
  return (
    <Lienzo etiqueta="Cuatro viñetas con el mecanismo de cada tipo de niebla: de radiación, de advección, de ladera y de vapor. Debajo de cada una, si se quema con el sol o no. La de radiación se quema; la de advección y la de ladera no; la de vapor además trae hielo.">
      {NIEBLAS.map((n, i) => {
        const x = IZQ + (i % 2) * (w + 36)
        const yy = 78 + Math.floor(i / 2) * (h + 92)
        return (
          <g key={n.clave}>
            <Rotulo x={x} y={yy - 14} color={TINTA} tam={18}>
              {n.nombre}
            </Rotulo>
            <rect x={x} y={yy} width={w} height={h} fill="none" stroke={LINEA} strokeWidth={1.4} />
            <Mecanismo clave={n.clave} x={x} y={yy} w={w} h={h} />
            <line x1={x} y1={yy + h} x2={x + w} y2={yy + h} stroke={TINTA} strokeWidth={2} />
            <Rotulo x={x} y={yy + h + 32} color={n.bueno ? ACENTO_CLARO : ACENTO} tam={16}>
              {n.veredicto}
            </Rotulo>
          </g>
        )
      })}
    </Lienzo>
  )
}
