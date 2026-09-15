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
  MONO,
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

// ═══════════════════════════════════════════════════════════════════════════
// 5 · La microrráfaga, paso a paso
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Los cuatro momentos son los del texto de la sección, y el orden importa
 * porque **el primero se siente bien**: el viento de frente sube la velocidad y
 * la performance mejora. Eso es lo que engaña. Después viene la descendente, y
 * al salir por el otro lado el viento se da la vuelta y se convierte en cola: la
 * velocidad se desploma justo cuando ya no queda altura.
 *
 * La trayectoria de despegue se dibuja subiendo, hundiéndose al cruzar el núcleo
 * y sin recuperar: es la forma del accidente, no la del vuelo que sale bien.
 */
const MOMENTOS = [
  { n: "1", rotulo: "VIENTO DE FRENTE" },
  { n: "2", rotulo: "DESCENDENTE" },
  { n: "3", rotulo: "VIENTO DE COLA" },
  { n: "4", rotulo: "EL RESULTADO" },
] as const

export function MeteoMicrorrafaga() {
  const suelo = 470
  const nucleo = 500
  const yNube = 118
  // Los cuatro puntos sobre la trayectoria, de izquierda a derecha.
  const puntos = [
    { x: 300, y: 372 },
    { x: nucleo, y: 336 },
    { x: 668, y: 396 },
    { x: 830, y: 452 },
  ]

  return (
    <Lienzo etiqueta="Corte vertical de una microrráfaga sobre una pista. La columna de aire desciende desde la nube, golpea el suelo y se abre en abanico hacia los dos lados. Sobre ella cruza la trayectoria de un despegue con cuatro momentos numerados: primero viento de frente, que engaña porque la performance mejora; después la corriente descendente; después el viento de cola, con la velocidad desplomándose; y al final el resultado, sin altura para recuperar.">
      {/* La nube de la que sale todo. */}
      <path
        d={`M${nucleo - 210},${yNube + 46}
            C${nucleo - 230},${yNube + 6} ${nucleo - 150},${yNube - 26} ${nucleo - 84},${yNube - 14}
            C${nucleo - 40},${yNube - 48} ${nucleo + 54},${yNube - 44} ${nucleo + 86},${yNube - 6}
            C${nucleo + 168},${yNube - 20} ${nucleo + 228},${yNube + 14} ${nucleo + 208},${yNube + 46} Z`}
        fill="#FFFFFF"
        stroke={LINEA}
        strokeWidth={1.8}
      />

      {/* La columna que baja, y el abanico al llegar al suelo. */}
      <rect x={nucleo - 62} y={yNube + 46} width={124} height={suelo - yNube - 46} fill={ACENTO} opacity={0.14} />
      {[-36, 0, 36].map((dx) => (
        <Flecha
          key={dx}
          x1={nucleo + dx}
          y1={yNube + 58}
          x2={nucleo + dx}
          y2={suelo - 26}
          color={ACENTO}
          grosor={dx === 0 ? 3.4 : 2.4}
          tam={dx === 0 ? 16 : 13}
        />
      ))}
      {[0, 1].map((lado) => {
        const s = lado === 0 ? -1 : 1
        return (
          <g key={lado}>
            <Corriente
              d={`M${nucleo + s * 54},${suelo - 34} Q${nucleo + s * 130},${suelo - 12} ${nucleo + s * 250},${suelo - 22}`}
              color={ACENTO}
              grosor={2.6}
            />
            <Punta x={nucleo + s * 252} y={suelo - 22} ang={lado === 0 ? IZQUIERDA : DERECHA} color={ACENTO} tam={14} />
          </g>
        )
      })}

      {/* La trayectoria de despegue: sube, se hunde al cruzar y no recupera. */}
      <Corriente
        d={`M${IZQ + 40},${suelo - 8} C${210},${suelo - 46} ${268},${396} ${puntos[0].x},${puntos[0].y}
            C${390},${340} ${450},${330} ${puntos[1].x},${puntos[1].y}
            C${570},${346} ${624},${380} ${puntos[2].x},${puntos[2].y}
            C${736},${414} ${790},${442} ${puntos[3].x},${puntos[3].y}`}
        color={SECUNDARIO}
        grosor={2.6}
      />
      <Jet x={IZQ + 6} cy={suelo - 12} ancho={62} color={SECUNDARIO} />

      {puntos.map((p, i) => (
        <g key={MOMENTOS[i].n}>
          <circle cx={p.x} cy={p.y} r={16} fill={PAPEL} stroke={SECUNDARIO} strokeWidth={2} />
          <text
            x={p.x}
            y={p.y + 7}
            textAnchor="middle"
            fontFamily={MONO}
            fontSize={19}
            fontWeight={700}
            fill={TINTA}
          >
            {MOMENTOS[i].n}
          </text>
          <Rotulo
            x={p.x}
            y={p.y - 30}
            ancla="middle"
            color={i === 0 ? ACENTO_CLARO : ACENTO}
            tam={15}
          >
            {MOMENTOS[i].rotulo}
          </Rotulo>
        </g>
      ))}

      {/* La pista. */}
      <rect x={IZQ} y={suelo} width={DER - IZQ} height={26} fill={ACENTO} opacity={0.42} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={IZQ + 60 + i * 140} y={suelo + 11} width={44} height={5} fill={PAPEL} opacity={0.9} />
      ))}
      <line x1={IZQ} y1={suelo} x2={DER} y2={suelo} stroke={TINTA} strokeWidth={2.4} />

      <Rotulo x={IZQ} y={H - 30} color={ACENTO_CLARO} tam={16}>
        EL PRIMER MOMENTO SE SIENTE BIEN: AHÍ ESTÁ LA TRAMPA
      </Rotulo>
    </Lienzo>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 2 · La misma aeronave, el mismo peso, dos altitudes de presión
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Los dos números son los del PHAK tal como los cita la sección: 745 ft de
 * carrera al nivel del mar y **«más del doble»** a 8.000 ft de altitud de
 * presión. El segundo no se convierte en una cifra concreta porque la fuente no
 * la da, y poner un número inventado en una lámina de rendimiento sería
 * exactamente lo que no se hace aquí. La barra de abajo se dibuja al doble justo,
 * que es el mínimo que sostiene «más del doble».
 */
const CARRERA_MAR = 0.3

export function MeteoCarrera() {
  const x0 = IZQ
  const x1 = DER
  const largo = x1 - x0
  const yMar = 196
  const yAlto = 372
  const alto = 46
  const finMar = x0 + largo * CARRERA_MAR
  const finAlto = x0 + largo * (CARRERA_MAR * 2)

  const pista = (y: number, fin: number, rotulo: string) => (
    <g>
      {/* Lo recorrido, más oscuro; lo que queda, claro. */}
      <rect x={x0} y={y} width={largo} height={alto} fill={ACENTO} opacity={0.12} />
      <rect x={x0} y={y} width={fin - x0} height={alto} fill={ACENTO} opacity={0.34} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={x0 + 40 + i * 108} y={y + alto / 2 - 2.5} width={52} height={5} fill={PAPEL} opacity={0.85} />
      ))}
      <g transform={`translate(${fin - 46} ${y + alto / 2}) scale(1)`}>
        <Jet x={0} cy={0} ancho={52} color={TINTA} />
      </g>
      <Rotulo x={x0} y={y + alto + 34} color={SECUNDARIO} tam={17}>{rotulo}</Rotulo>
    </g>
  )

  /** La acotación de la carrera, encima de su pista. */
  const cota = (y: number, fin: number, texto: string, fuerte: boolean) => (
    <g>
      <line x1={x0} y1={y} x2={fin} y2={y} stroke={ACENTO} strokeWidth={2} />
      <line x1={x0} y1={y - 9} x2={x0} y2={y + 9} stroke={ACENTO} strokeWidth={2} />
      <line x1={fin} y1={y - 9} x2={fin} y2={y + 9} stroke={ACENTO} strokeWidth={2} />
      <Rotulo x={x0 + 10} y={y - 18} color={ACENTO} tam={fuerte ? 22 : 20}>{texto}</Rotulo>
    </g>
  )

  return (
    <Lienzo etiqueta="Dos siluetas de pista, una encima de otra, con la misma aeronave y el mismo peso. Arriba, al nivel del mar en día estándar, la carrera de despegue acotada en 745 pies. Abajo, a 8.000 pies de altitud de presión, la carrera es más del doble: menos densidad significa menos sustentación, menos empuje y más pista.">
      {cota(yMar - 34, finMar, "745 ft", false)}
      {pista(yMar, finMar, "NIVEL DEL MAR · DÍA ESTÁNDAR")}

      {cota(yAlto - 34, finAlto, "MÁS DEL DOBLE", true)}
      {pista(yAlto, finAlto, "8.000 ft DE ALTITUD DE PRESIÓN")}

      <Rotulo x={W / 2} y={H - 40} ancla="middle" color={ACENTO} tam={17}>
        MENOS DENSIDAD: MENOS SUSTENTACIÓN, MENOS EMPUJE, MÁS CARRERA
      </Rotulo>
    </Lienzo>
  )
}
