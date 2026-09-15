import { InfografiaCanvas } from "@/components/lesson/InfografiaCanvas"
import {
  Corriente,
  Flecha,
  Jet,
  Punta,
  Remolino,
  Rotulo,
} from "@/components/lesson/infografias/laminaMeteo"
import {
  ABAJO,
  ACENTO,
  ACENTO_CLARO,
  ARRIBA,
  DERECHA,
  IZQUIERDA,
  LINEA,
  PAPEL,
  RESALTADO,
  SECUNDARIO,
  TINTA,
} from "@/components/lesson/infografias/laminaMeteoTokens"

/**
 * Las cuatro láminas de "El viento cerca del suelo" (Meteorología, sección 4).
 *
 * Van juntas en un archivo porque son las cuatro de la misma sección: quien abre
 * esa lección las descarga todas de una y comparten las piezas de `laminaMeteo`.
 *
 * Son SVG escrito a mano y no imágenes generadas, y aquí la razón no es solo la
 * ortografía: **es que las flechas de estas cuatro son física, y una invertida
 * enseña lo contrario de lo que dice la lección.** Pasó de verdad: en una tanda
 * generada, la brisa de tierra traía el aire bajando sobre el mar, cuando de
 * noche el mar es lo caliente y ahí el aire sube. La propia ficha de la sección
 * lo dice bien («ahora el aire más caliente está sobre el agua, y es el que
 * sube») y la imagen la contradecía.
 *
 * Aquí eso no puede pasar por cómo está montado: cada punta de flecha declara su
 * dirección con una constante con nombre (`ARRIBA`, `ABAJO`, `IZQUIERDA`,
 * `DERECHA`), y las circulaciones cerradas se dibujan como **un solo bucle** con
 * sus cuatro puntas encima, nunca como flechas sueltas que puedan contradecir al
 * bucle que las rodea.
 *
 * **Sin verde ni marrón.** Las cuatro superficies y la montaña se distinguen por
 * silueta y por valor, no por color: el verde de esta app significa «correcto» y
 * no se gasta en pintar un bosque.
 */

const W = 1000
const H = 560
const IZQ = 48
const DER = W - IZQ

/** Cabecera común de las cuatro: mismo lienzo, mismo papel, misma tipografía. */
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
// 1 · Cada superficie devuelve el calor a su manera
// ═══════════════════════════════════════════════════════════════════════════

/**
 * El reparto sale del `kv` de la sección, que es específico: el terreno arado y
 * la roca **emiten** calor y el aire sube; el agua y la vegetación lo
 * **retienen** y el aire baja. Varias versiones generadas ponían el bosque con
 * flechas hacia arriba, que es justo lo contrario de lo que enseña la lección.
 */
const SUPERFICIES = [
  { clave: "asfalto", rotulo: "ASFALTO", sube: true, tinte: 0.5 },
  { clave: "campo", rotulo: "CAMPO", sube: true, tinte: 0.2 },
  { clave: "bosque", rotulo: "BOSQUE", sube: false, tinte: 0.34 },
  { clave: "agua", rotulo: "AGUA", sube: false, tinte: 0.26 },
] as const

const SUELO = 404
const BANDA = 62
const ANCHO_ZONA = (DER - IZQ) / 4

function Textura({ clave, x }: { clave: string; x: number }) {
  if (clave === "asfalto") {
    return (
      <g>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={x + 26 + i * 48} y={SUELO + 26} width={26} height={4} fill={PAPEL} opacity={0.85} />
        ))}
      </g>
    )
  }
  if (clave === "campo") {
    return (
      <g>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line
            key={i}
            x1={x + 10 + i * 30}
            y1={SUELO + BANDA}
            x2={x + 30 + i * 30}
            y2={SUELO + 4}
            stroke={ACENTO}
            strokeWidth={1.4}
            opacity={0.45}
          />
        ))}
      </g>
    )
  }
  if (clave === "bosque") {
    return (
      <g>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const cx = x + 22 + i * 36
          const alto = i % 2 === 0 ? 40 : 32
          return (
            <path
              key={i}
              d={`M${cx},${SUELO - alto} L${cx + 15},${SUELO + 2} L${cx - 15},${SUELO + 2} Z`}
              fill={ACENTO}
              opacity={0.55}
            />
          )
        })}
      </g>
    )
  }
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${x + 12},${SUELO + 20 + i * 16} q 22,-9 44,0 t 44,0 t 44,0 t 44,0 t 44,0`}
          fill="none"
          stroke={PAPEL}
          strokeWidth={2}
          opacity={0.7}
        />
      ))}
    </g>
  )
}

export function MeteoSuperficies() {
  return (
    <Lienzo etiqueta="Un mismo tramo de vuelo bajo sobre cuatro superficies seguidas: asfalto, campo, bosque y agua. Sobre el asfalto y el campo, que emiten calor, el aire sube; sobre el bosque y el agua, que lo retienen, el aire baja. Arriba, la trayectoria de la aeronave ondula al cruzarlas.">
      {/* Trayectoria de vuelo bajo: ondula porque el aire la mueve. */}
      <path
        d={`M${IZQ + 78},128 C${IZQ + 190},92 ${IZQ + 280},92 ${IZQ + 366},128
            C${IZQ + 452},164 ${IZQ + 560},170 ${IZQ + 660},142
            C${IZQ + 740},120 ${IZQ + 800},150 ${DER - 20},146`}
        fill="none"
        stroke={SECUNDARIO}
        strokeWidth={2}
        strokeDasharray="8 7"
      />
      <Jet x={IZQ} cy={128} ancho={70} color={SECUNDARIO} />

      {SUPERFICIES.map((s, i) => {
        const x = IZQ + i * ANCHO_ZONA
        const cx = x + ANCHO_ZONA / 2
        const color = s.sube ? ACENTO : ACENTO_CLARO
        return (
          <g key={s.clave}>
            <rect x={x} y={SUELO} width={ANCHO_ZONA} height={BANDA} fill={ACENTO} opacity={s.tinte} />
            <Textura clave={s.clave} x={x} />
            {/* Las flechas: arriba donde la superficie emite, abajo donde retiene. */}
            {[-58, 0, 58].map((dx, j) => {
              const fx = cx + dx
              const alto = j === 1 ? 168 : 128
              const desde = s.sube ? SUELO - 16 : SUELO - 16 - alto
              const hasta = s.sube ? SUELO - 16 - alto : SUELO - 22
              return (
                <Flecha
                  key={dx}
                  x1={fx}
                  y1={desde}
                  x2={fx}
                  y2={hasta}
                  color={color}
                  grosor={2.2}
                />
              )
            })}
            <Rotulo x={cx} y={SUELO + BANDA + 38} ancla="middle" color={color} tam={19}>
              {s.rotulo}
            </Rotulo>
          </g>
        )
      })}
      <line x1={IZQ} y1={SUELO} x2={DER} y2={SUELO} stroke={TINTA} strokeWidth={2} />
    </Lienzo>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 2 · Brisa de mar y brisa de tierra
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Una circulación cerrada, dibujada como **un solo bucle** con sus cuatro puntas
 * encima. No hay ni una flecha suelta: así el dibujo no puede contradecirse a sí
 * mismo, que es exactamente lo que le pasaba a la versión generada.
 *
 * `sentido` -1 es antihorario en pantalla. De día sube sobre la tierra (derecha)
 * y baja sobre el mar (izquierda): antihorario. De noche, al revés.
 */
function Celda({
  cx,
  cy,
  rx,
  ry,
  sentido,
}: {
  cx: number
  cy: number
  rx: number
  ry: number
  sentido: 1 | -1
}) {
  const antihorario = sentido === -1
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={ACENTO} strokeWidth={2.6} />
      <Punta x={cx} y={cy - ry} ang={antihorario ? IZQUIERDA : DERECHA} color={ACENTO} tam={15} />
      <Punta x={cx} y={cy + ry} ang={antihorario ? DERECHA : IZQUIERDA} color={ACENTO} tam={15} />
      <Punta x={cx - rx} y={cy} ang={antihorario ? ABAJO : ARRIBA} color={ACENTO} tam={15} />
      <Punta x={cx + rx} y={cy} ang={antihorario ? ARRIBA : ABAJO} color={ACENTO} tam={15} />
    </g>
  )
}

const COSTA_Y = 404

/**
 * Mitad de la lámina de brisas: mar a la izquierda, tierra a la derecha, y la
 * orilla justo debajo del centro de la celda, para que se vea que el aire sube
 * de un lado y baja del otro de esa misma orilla.
 */
function Costa({ x, w }: { x: number; w: number }) {
  const orilla = x + w * 0.5
  return (
    <g>
      <rect x={x} y={COSTA_Y} width={orilla - x} height={H - COSTA_Y - 46} fill={ACENTO} opacity={0.34} />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${x + 10},${COSTA_Y + 22 + i * 20} q 20,-8 40,0 t 40,0 t 40,0 t 40,0 t 40,0`}
          fill="none"
          stroke={PAPEL}
          strokeWidth={1.8}
          opacity={0.75}
        />
      ))}
      <rect x={orilla} y={COSTA_Y} width={x + w - orilla} height={H - COSTA_Y - 46} fill={ACENTO} opacity={0.12} />
      {/* Torre y pista, para que la tierra se lea como el aeródromo. */}
      <g fill={SECUNDARIO} opacity={0.8}>
        <rect x={x + w * 0.82} y={COSTA_Y - 44} width={8} height={44} />
        <rect x={x + w * 0.795} y={COSTA_Y - 56} width={17} height={14} rx={2} />
      </g>
      <rect x={orilla + 26} y={COSTA_Y + 30} width={w * 0.34} height={12} fill={PAPEL} opacity={0.65} />
      <line x1={x} y1={COSTA_Y} x2={x + w} y2={COSTA_Y} stroke={TINTA} strokeWidth={1.8} />
    </g>
  )
}

export function MeteoBrisas() {
  const w = (DER - IZQ - 46) / 2
  const dx = IZQ
  const nx = IZQ + w + 46
  // La celda baja hasta casi tocar la orilla: así su rama inferior se lee como
  // lo que es, el viento que notas en superficie.
  const cy = 296
  const rx = w * 0.32
  const ry = 100
  return (
    <Lienzo etiqueta="Brisa de mar y brisa de tierra, una al lado de la otra, con el mar a la izquierda y la tierra a la derecha en las dos. De día el aire sube sobre la tierra, viaja en altura hacia el mar, baja sobre el mar y vuelve por la superficie hacia la tierra. De noche el ciclo se invierte: sube sobre el mar y en superficie sale de la tierra hacia el mar.">
      <line x1={W / 2} y1={70} x2={W / 2} y2={H - 40} stroke={LINEA} strokeWidth={1.4} />

      {/* ── De día: brisa de mar ─────────────────────────────────────────── */}
      <Rotulo x={dx} y={88}>DÍA</Rotulo>
      <Rotulo x={dx} y={114} color={ACENTO} tam={17}>BRISA DE MAR</Rotulo>
      <circle cx={dx + w - 26} cy={92} r={16} fill={LINEA} opacity={0.8} />
      <Costa x={dx} w={w} />
      <Celda cx={dx + w * 0.5} cy={cy} rx={rx} ry={ry} sentido={-1} />

      {/* ── De noche: brisa de tierra ────────────────────────────────────── */}
      <Rotulo x={nx} y={88}>NOCHE</Rotulo>
      <Rotulo x={nx} y={114} color={ACENTO} tam={17}>BRISA DE TIERRA</Rotulo>
      <path
        d={`M${nx + w - 18},76 a 16,16 0 1,0 0,32 a 12,12 0 1,1 0,-32 Z`}
        fill={SECUNDARIO}
        opacity={0.75}
      />
      <Costa x={nx} w={w} />
      <Celda cx={nx + w * 0.5} cy={cy} rx={rx} ry={ry} sentido={1} />
    </Lienzo>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 3 · Un obstáculo rompe el viento justo donde se toma
// ═══════════════════════════════════════════════════════════════════════════

const PISTA_Y = 448

/**
 * El viento entra por la izquierda, así que se aterriza **hacia la izquierda**:
 * en final se vuela contra el viento. Por eso la aeronave mira a la izquierda y
 * baja hacia una zona de toma que queda a sotavento del hangar, justo debajo del
 * aire roto. Una primera versión la puso mirando a la derecha con la senda
 * bajando a la izquierda, que es una contradicción que se ve a la primera.
 */
export function MeteoObstaculo() {
  const hx = 268
  const hw = 126
  const techo = PISTA_Y - 104
  const tomaX = 452
  const tomaW = 300
  return (
    <Lienzo etiqueta="Viento uniforme llegando por la izquierda a un hangar grande. Delante del hangar las líneas de corriente son paralelas y limpias; detrás se separan y se rompen en remolinos, y esa zona rota cae sobre la zona de toma de la pista, hacia la que desciende una aeronave en final, volando contra el viento.">
      <Rotulo x={IZQ} y={150} color={ACENTO} tam={19}>VIENTO</Rotulo>
      {[178, 228, 278, 328, 378].map((y) => (
        <Flecha key={y} x1={IZQ} y1={y} x2={hx - 30} y2={y} color={ACENTO} grosor={2.2} />
      ))}

      {/* El hangar: grande, pero no una pared. El aire lo remonta. */}
      <path
        d={`M${hx},${PISTA_Y} L${hx},${techo + 16} L${hx + hw / 2},${techo} L${hx + hw},${techo + 16} L${hx + hw},${PISTA_Y} Z`}
        fill={ACENTO}
        opacity={0.32}
      />
      <path
        d={`M${hx},${PISTA_Y} L${hx},${techo + 16} L${hx + hw / 2},${techo} L${hx + hw},${techo + 16} L${hx + hw},${PISTA_Y}`}
        fill="none"
        stroke={TINTA}
        strokeWidth={1.8}
      />
      <rect x={hx + 42} y={PISTA_Y - 44} width={42} height={44} fill={PAPEL} opacity={0.55} stroke={TINTA} strokeWidth={1.4} />
      <Rotulo x={hx + hw / 2} y={techo - 16} ancla="middle" tam={17}>OBSTÁCULO</Rotulo>

      {/* Las corrientes remontan el techo y se deshacen detrás. */}
      {[
        { y: 178, cae: 214 },
        { y: 228, cae: 258 },
        { y: 278, cae: 300 },
      ].map((c, i) => (
        <Corriente
          key={c.y}
          d={`M${hx - 26},${c.y} C${hx + 24},${c.y - 24} ${hx + 92},${c.y - 30} ${hx + hw + 24},${c.cae}
              C${hx + hw + 76},${c.cae + 34} ${hx + hw + 120},${c.cae + 4} ${hx + hw + 168},${c.cae + 26}`}
          color={ACENTO}
          grosor={2.2}
          opacidad={1 - i * 0.18}
        />
      ))}

      {/* Remolinos a sotavento, encima de donde se toma. */}
      <Remolino cx={hx + hw + 34} cy={356} r={25} sentido={1} color={ACENTO_CLARO} />
      <Remolino cx={hx + hw + 104} cy={396} r={21} sentido={-1} color={ACENTO_CLARO} />
      <Remolino cx={hx + hw + 168} cy={352} r={18} sentido={1} color={ACENTO_CLARO} />
      <Remolino cx={hx + hw + 52} cy={414} r={16} sentido={-1} color={ACENTO_CLARO} />
      <Rotulo x={hx + hw + 12} y={322} color={ACENTO_CLARO} tam={17}>TURBULENCIA</Rotulo>

      {/* La aeronave baja contra el viento: viene de la derecha. */}
      <path
        d={`M${DER - 6},188 L${tomaX + 60},${PISTA_Y - 10}`}
        fill="none"
        stroke={SECUNDARIO}
        strokeWidth={1.6}
        strokeDasharray="7 7"
      />
      <g transform={`translate(${DER - 96} 268) scale(-1 1)`}>
        <Jet x={0} cy={0} ancho={64} color={SECUNDARIO} />
      </g>

      <rect x={tomaX} y={PISTA_Y} width={tomaW} height={32} fill={ACENTO} opacity={0.48} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={tomaX + 20 + i * 58} y={PISTA_Y + 14} width={30} height={4} fill={PAPEL} opacity={0.9} />
      ))}
      <Rotulo x={tomaX + tomaW / 2} y={PISTA_Y + 58} ancla="middle" tam={17} color={SECUNDARIO}>
        ZONA DE TOMA
      </Rotulo>
      <line x1={IZQ} y1={PISTA_Y} x2={DER} y2={PISTA_Y} stroke={TINTA} strokeWidth={2} />
    </Lienzo>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 4 · Los dos lados de una montaña no son el mismo vuelo
// ═══════════════════════════════════════════════════════════════════════════

const BASE_M = 472
const CIMA_X = 430
const CIMA_Y = 150
const PIE_IZQ = 150
const PIE_DER = 720

/** Altura del terreno en una x. Fuera de la montaña, el suelo. */
function perfil(x: number) {
  if (x <= PIE_IZQ || x >= PIE_DER) return BASE_M
  if (x < CIMA_X) return BASE_M - ((BASE_M - CIMA_Y) * (x - PIE_IZQ)) / (CIMA_X - PIE_IZQ)
  return BASE_M - ((BASE_M - CIMA_Y) * (PIE_DER - x)) / (PIE_DER - CIMA_X)
}

/**
 * Una línea de corriente, muestreada.
 *
 * **No puede cortar el relieve, y eso está demostrado, no comprobado a ojo.** La
 * altura sale de interpolar entre dos valores: el de campo libre (`y0`, lejos de
 * la montaña) y el de la cima (`yCima`), con el mismo factor `s` con el que sube
 * el terreno, que vale 0 al pie y 1 en la cima. Como el terreno también es lineal
 * en `s`, si la línea va por encima en los dos extremos va por encima en todo el
 * tramo. La primera versión las trazaba con Béziers a ojo y dos de las cuatro
 * atravesaban la roca.
 *
 * Y de ahí sale gratis lo otro que tenía que enseñar: **las de abajo se desvían
 * mucho más que las de arriba**, porque su `y0` está lejos de su `yCima` y la de
 * arriba casi no se mueve. A sotavento se les suma la onda, que crece hacia
 * abajo: ahí el aire sigue el contorno y se vuelve turbulento.
 */
function lineaCorriente(y0: number, yCima: number, onda: number) {
  const pts: string[] = []
  for (let x = IZQ; x <= DER - 12; x += 5) {
    const s = (BASE_M - perfil(x)) / (BASE_M - CIMA_Y)
    let y = y0 - (y0 - yCima) * s
    if (x > CIMA_X) {
      const t = Math.min(1, (x - CIMA_X) / (DER - CIMA_X))
      y += onda * Math.sin(t * 6.6) * t
    }
    pts.push(`${x},${y.toFixed(1)}`)
  }
  return `M${pts.join(" L")}`
}

/** Dónde acaba cada línea, para poner ahí su punta. */
function finCorriente(y0: number, yCima: number, onda: number) {
  const x = DER - 12
  const s = (BASE_M - perfil(x)) / (BASE_M - CIMA_Y)
  const t = Math.min(1, (x - CIMA_X) / (DER - CIMA_X))
  return y0 - (y0 - yCima) * s + onda * Math.sin(t * 6.6) * t
}

export function MeteoMontana() {
  const monte = `M${PIE_IZQ},${BASE_M} L${CIMA_X - 70},${CIMA_Y + 96} L${CIMA_X - 26},${CIMA_Y + 44}
                 L${CIMA_X},${CIMA_Y} L${CIMA_X + 56},${CIMA_Y + 82} L${CIMA_X + 132},${CIMA_Y + 168}
                 L${PIE_DER},${BASE_M} Z`
  // De arriba abajo. La de más abajo es la que más se desvía.
  const corrientes = [
    { y0: 118, yCima: 74, onda: 10 },
    { y0: 196, yCima: 96, onda: 24 },
    { y0: 278, yCima: 118, onda: 40 },
    { y0: 364, yCima: 140, onda: 58 },
  ]
  return (
    <Lienzo etiqueta="Corte de una montaña con el viento llegando por la izquierda. En barlovento las líneas de corriente suben la ladera de forma ordenada y paralela; al pasar la cima descienden por sotavento y se rompen en ondas cada vez más marcadas, con remolinos cerca del suelo, donde vuela una aeronave pequeña.">
      <rect x={IZQ} y={BASE_M} width={DER - IZQ} height={H - BASE_M - 30} fill={RESALTADO} />
      <path d={monte} fill={ACENTO} opacity={0.3} />
      <path d={monte} fill="none" stroke={TINTA} strokeWidth={1.8} />

      {corrientes.map((c, i) => (
        <g key={i}>
          <Corriente d={lineaCorriente(c.y0, c.yCima, c.onda)} color={ACENTO} grosor={2.2} />
          <Punta x={DER - 10} y={finCorriente(c.y0, c.yCima, c.onda)} ang={DERECHA} color={ACENTO} tam={13} />
          <Punta x={IZQ + 118} y={c.y0} ang={DERECHA} color={ACENTO} tam={13} />
        </g>
      ))}

      {/* Rotores a sotavento, pegados al suelo. */}
      <Remolino cx={PIE_DER + 68} cy={420} r={26} sentido={-1} color={ACENTO_CLARO} />
      <Remolino cx={PIE_DER + 152} cy={444} r={20} sentido={1} color={ACENTO_CLARO} />
      <Rotulo x={PIE_DER + 40} y={382} color={ACENTO_CLARO} tam={17}>TURBULENCIA</Rotulo>

      <Jet x={PIE_DER + 96} cy={232} ancho={60} color={SECUNDARIO} />

      <Rotulo x={IZQ} y={62} color={ACENTO} tam={19}>BARLOVENTO</Rotulo>
      <Rotulo x={DER} y={62} ancla="end" color={ACENTO} tam={19}>SOTAVENTO</Rotulo>

      <line x1={IZQ} y1={BASE_M} x2={DER} y2={BASE_M} stroke={TINTA} strokeWidth={2} />
    </Lienzo>
  )
}
