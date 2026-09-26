import { InfografiaCanvas } from "@/components/lesson/InfografiaCanvas"
import { Corriente, Flecha, Jet, Rotulo } from "@/components/lesson/infografias/laminaMeteo"
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
 * Las láminas del nivel 6, "Información en ruta" (secciones 26, 27 y 30).
 *
 * Mismo criterio que en el METAR y el TAF: estas secciones ya explican sus
 * claves en HTML, así que una figura que repita la lista sobra. Cada una de
 * aquí hace lo que el texto no puede.
 *
 * La del modelo de estación se cambió de asunto a propósito. Su versión anterior
 * dibujaba el modelo con una llamada a cada campo, que es exactamente lo que el
 * texto de la sección ya explica campo por campo. Lo que un dibujo sí aporta es
 * **el espaciado de las isobaras**: que juntas significan viento fuerte y
 * separadas viento suave es una imagen, no una frase.
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

// ═══════════════════════════════════════════════════════════════════════════
// 26 · Cuatro formas de mirar la atmósfera, y lo que cada una no ve
// ═══════════════════════════════════════════════════════════════════════════

/**
 * El rótulo del radar es el que lleva la carga. El texto de la sección lo dice
 * así: «el ejemplo que más cuesta caro: el radar no ve nubes». Ve la
 * precipitación, que no es lo mismo, y confundirlo es lo que mete a alguien
 * dentro de una nube que el radar pintaba limpia.
 */
export function MeteoFuentes() {
  const suelo = 470
  const cielo = 86
  return (
    <Lienzo etiqueta="Corte vertical con las cuatro fuentes de observación: la estación de superficie en el suelo, la radiosonda subiendo en globo y el PIREP desde la aeronave en altitud, el radar barriendo desde tierra y el satélite mirando desde arriba. El radar va rotulado con lo que no ve: nubes. Ve precipitación.">
      <rect x={IZQ} y={cielo} width={DER - IZQ} height={suelo - cielo} fill={RESALTADO} opacity={0.4} />

      {/* Satélite, arriba del todo, mirando hacia abajo. */}
      <g>
        <rect x={758} y={cielo + 10} width={46} height={30} rx={4} fill={SECUNDARIO} />
        <rect x={734} y={cielo + 16} width={20} height={18} fill={SECUNDARIO} opacity={0.6} />
        <rect x={808} y={cielo + 16} width={20} height={18} fill={SECUNDARIO} opacity={0.6} />
        <path
          d={`M${781},${cielo + 42} L${700},${suelo - 96} L${862},${suelo - 96} Z`}
          fill={SECUNDARIO}
          opacity={0.12}
        />
        <Rotulo x={DER - 20} y={cielo + 78} ancla="end" color={SECUNDARIO} tam={18}>SATÉLITE</Rotulo>
      </g>

      {/* Las nubes que hay ahí en medio. */}
      {[[240, 260, 34], [470, 200, 26], [700, 288, 30]].map(([cx, cy, r]) => (
        <g key={cx}>
          {[-1, 0, 1].map((k) => (
            <circle
              key={k}
              cx={cx + k * r * 1.1}
              cy={cy - (k === 0 ? r * 0.3 : 0)}
              r={k === 0 ? r : r * 0.76}
              fill="#FFFFFF"
              stroke={LINEA}
              strokeWidth={1.4}
            />
          ))}
        </g>
      ))}

      {/* Radiosonda: globo que sube, y el PIREP, que lo escribe el piloto. */}
      <g>
        <circle cx={392} cy={cielo + 72} r={17} fill="none" stroke={ACENTO} strokeWidth={2.2} />
        <line x1={392} y1={cielo + 89} x2={392} y2={cielo + 118} stroke={ACENTO} strokeWidth={1.6} />
        <Flecha x1={392} y1={suelo - 30} x2={392} y2={cielo + 130} color={ACENTO} grosor={2} tam={11} discontinua />
        <Jet x={520} cy={190} ancho={58} color={ACENTO} />
        <Rotulo x={352} y={cielo + 44} ancla="end" color={ACENTO} tam={18}>EN ALTITUD</Rotulo>
      </g>

      {/* Radar: barre desde el suelo y solo le devuelve eco lo que precipita. */}
      <g>
        <path d={`M${170},${suelo} L${170},${suelo - 34}`} stroke={TINTA} strokeWidth={3} />
        <path d={`M${152},${suelo - 34} a 18,18 0 0,1 36,0 Z`} fill={ACENTO} opacity={0.6} />
        {[0, 1, 2].map((i) => (
          <Corriente
            key={i}
            d={`M${186},${suelo - 44 - i * 6} q 130,-${40 + i * 30} 300,-${58 + i * 44}`}
            color={ACENTO_CLARO}
            grosor={1.8}
            opacidad={0.75 - i * 0.18}
          />
        ))}
        <Rotulo x={IZQ + 30} y={suelo - 82} color={ACENTO} tam={18}>RADAR</Rotulo>
        <Rotulo x={IZQ + 30} y={suelo - 58} color={ACENTO_CLARO} tam={16}>NO VE NUBES</Rotulo>
      </g>

      {/* Estación de superficie: el METAR. */}
      <g>
        <rect x={840} y={suelo - 46} width={10} height={46} fill={TINTA} />
        <rect x={826} y={suelo - 60} width={38} height={16} rx={2} fill={ACENTO} opacity={0.7} />
        <Rotulo x={DER - 20} y={suelo + 34} ancla="end" color={ACENTO} tam={18}>EN SUPERFICIE</Rotulo>
      </g>

      <line x1={IZQ} y1={suelo} x2={DER} y2={suelo} stroke={TINTA} strokeWidth={2.4} />
    </Lienzo>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 27 · La forma de un PIREP: cinco campos que no se negocian
// ═══════════════════════════════════════════════════════════════════════════

/**
 * La lista de campos con su significado ya está en el `kv` de la sección. Lo que
 * un listado no enseña es **la forma del mensaje**: que es una tira de campos
 * seguidos y que los cinco primeros son los que no se pueden omitir. Puestos en
 * dos bloques se ve de un vistazo dónde acaba lo obligatorio.
 */
const PIREP_OBLIGATORIO = ["UA", "OV GGG 090025", "TM 1450", "FL 060", "TP C182"]
const PIREP_OPCIONAL = ["SK 080 OVC", "WX FV 04R", "TA 05", "WV 270030", "TB GT", "RM HVY RAIN"]

function Campos({
  campos,
  y,
  obligatorio,
}: {
  campos: string[]
  y: number
  obligatorio: boolean
}) {
  const alto = 52
  const separacion = 10
  // Cada campo es tan ancho como su texto: mono, así que sale de contar letras.
  const anchos = campos.map((c) => c.length * 12.6 + 26)
  const total = anchos.reduce((a, b) => a + b, 0) + separacion * (campos.length - 1)
  const inicio = (W - total) / 2
  return (
    <g>
      {campos.map((c, i) => {
        const x = inicio + anchos.slice(0, i).reduce((a, b) => a + b, 0) + separacion * i
        return (
          <g key={c}>
            <rect
              x={x}
              y={y}
              width={anchos[i]}
              height={alto}
              fill={ACENTO}
              opacity={obligatorio ? 0.28 : 0.1}
              stroke={obligatorio ? ACENTO : LINEA}
              strokeWidth={1.4}
            />
            <text
              x={x + anchos[i] / 2}
              y={y + 34}
              textAnchor="middle"
              fontFamily={MONO}
              fontSize={21}
              fontWeight={obligatorio ? 700 : 500}
              fill={obligatorio ? ACENTO : SECUNDARIO}
            >
              {c}
            </text>
          </g>
        )
      })}
    </g>
  )
}

export function MeteoPirep() {
  return (
    <Lienzo etiqueta="Un PIREP real partido en sus campos, en dos bloques. Arriba los cinco primeros, marcados como obligatorios: tipo de informe, ubicación, hora, nivel y tipo de aeronave. Abajo los opcionales, más tenues: cielo, tiempo y visibilidad, temperatura, viento, turbulencia y observaciones.">
      <Rotulo x={IZQ} y={150} color={ACENTO} tam={19}>LOS CINCO OBLIGATORIOS</Rotulo>
      <Campos campos={PIREP_OBLIGATORIO} y={176} obligatorio />

      <Rotulo x={IZQ} y={324} color={SECUNDARIO} tam={19}>Y LOS QUE AÑADES SI LOS TIENES</Rotulo>
      <Campos campos={PIREP_OPCIONAL} y={350} obligatorio={false} />

      <Rotulo x={W / 2} y={470} ancla="middle" color={SECUNDARIO} tam={16}>
        SIN UNO DE LOS CINCO, EL INFORME NO SIRVE
      </Rotulo>
    </Lienzo>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 30 · Las isobaras son el mapa del viento
// ═══════════════════════════════════════════════════════════════════════════

export function MeteoIsobaras() {
  const w = (DER - IZQ - 64) / 2
  const y0 = 140
  const h = 240

  const panel = (x: number, juntas: boolean) => {
    const n = juntas ? 7 : 3
    const paso = w / (n + 1)
    return (
      <g>
        <rect x={x} y={y0} width={w} height={h} fill={RESALTADO} opacity={0.45} stroke={LINEA} strokeWidth={1.4} />
        {Array.from({ length: n }, (_, i) => (
          <path
            key={i}
            d={`M${x + paso * (i + 1)},${y0} C${x + paso * (i + 1) + 22},${y0 + h * 0.34} ${x + paso * (i + 1) - 22},${y0 + h * 0.66} ${x + paso * (i + 1)},${y0 + h}`}
            fill="none"
            stroke={ACENTO}
            strokeWidth={1.8}
            opacity={0.8}
          />
        ))}
        {/* El viento sopla a lo largo de las isobaras, y con más fuerza cuanto
            más juntas estén: eso es todo lo que enseña la lámina. */}
        {(juntas ? [0.3, 0.52, 0.74] : [0.42, 0.64]).map((f) => (
          <Flecha
            key={f}
            x1={x + 22}
            y1={y0 + h * f}
            x2={x + w - 22}
            y2={y0 + h * f}
            color={ACENTO}
            grosor={juntas ? 4 : 2}
            tam={juntas ? 18 : 12}
          />
        ))}
      </g>
    )
  }

  return (
    <Lienzo etiqueta="Dos recuadros de isobaras uno al lado del otro. A la izquierda muy juntas, con flechas de viento gruesas: gradiente fuerte y viento fuerte. A la derecha muy separadas, con flechas finas: gradiente pequeño y viento suave.">
      {panel(IZQ, true)}
      {panel(IZQ + w + 64, false)}

      <Rotulo x={IZQ} y={y0 - 22} color={ACENTO} tam={19}>ISOBARAS JUNTAS</Rotulo>
      <Rotulo x={IZQ} y={y0 + h + 44} color={ACENTO} tam={18}>VIENTO FUERTE</Rotulo>

      <Rotulo x={IZQ + w + 64} y={y0 - 22} color={SECUNDARIO} tam={19}>ISOBARAS SEPARADAS</Rotulo>
      <Rotulo x={IZQ + w + 64} y={y0 + h + 44} color={SECUNDARIO} tam={18}>VIENTO SUAVE</Rotulo>

      <Rotulo x={W / 2} y={H - 46} ancla="middle" color={SECUNDARIO} tam={16}>
        COMO LAS CURVAS DE NIVEL DE UN MAPA
      </Rotulo>
    </Lienzo>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 28 · A quién le afecta cada aviso, que es en lo que se diferencian
// ═══════════════════════════════════════════════════════════════════════════

/**
 * La sección lo dice sin rodeos: «si en la entrevista te preguntan la diferencia
 * y contestas solo *uno es más fuerte que el otro*, no has contestado». La
 * diferencia de la OACI es de altura y de alcance, y eso es un corte vertical,
 * no una lista: el AIRMET ocupa una franja baja **dentro** del alcance del
 * SIGMET, y el techo de esa franja sube en zona montañosa porque el terreno
 * sube con ella.
 *
 * Los dos aviones no son adorno. Son la pregunta de la sección dibujada: el de
 * abajo recibe los dos avisos, el de arriba solo uno.
 */
const FL0 = 466
const POR_FL = 1.78
/** Altura del nivel de vuelo en el lienzo. */
function nivel(fl: number) {
  return FL0 - fl * POR_FL
}

const MONTE_IZQ_X = 580
const COL_IZQ = 150
const COL_DER = 930

export function MeteoAvisos() {
  const techoLlano = nivel(100)
  const techoMonte = nivel(150)
  const cima = 118
  return (
    <Lienzo etiqueta="Corte vertical del espacio aéreo. Una franja alta y ancha marcada SIGMET cubre toda la columna y sigue por encima del borde superior, con la nota de que alcanza a todas las aeronaves en ruta. Dentro de ella, pegada al suelo, una franja más marcada de AIRMET llega hasta el nivel de vuelo 100 sobre terreno llano y sube al nivel 150 sobre una montaña. Un avión vuela bajo, dentro de las dos franjas; otro vuela alto, solo dentro de la del SIGMET.">
      {/* El alcance del SIGMET: toda la columna, y sigue hacia arriba. */}
      <rect
        x={COL_IZQ}
        y={cima}
        width={COL_DER - COL_IZQ}
        height={FL0 - cima}
        fill={RESALTADO}
        stroke={ACENTO}
        strokeWidth={1.4}
      />
      <line
        x1={COL_IZQ}
        y1={cima}
        x2={COL_DER}
        y2={cima}
        stroke={PAPEL}
        strokeWidth={4}
      />
      <line
        x1={COL_IZQ}
        y1={cima}
        x2={COL_DER}
        y2={cima}
        stroke={ACENTO}
        strokeWidth={1.6}
        strokeDasharray="9 8"
      />
      <Flecha x1={COL_DER - 70} y1={cima + 4} x2={COL_DER - 70} y2={cima - 34} color={ACENTO} grosor={1.8} />
      <Rotulo x={COL_DER - 92} y={cima - 42} ancla="end" color={ACENTO} tam={16}>Y POR ENCIMA</Rotulo>

      {/* La montaña es la razón del escalón: el terreno sube y el techo con él. */}
      <path
        d={`M${MONTE_IZQ_X},${FL0} L648,372 L692,316 L726,266 L756,280 L800,336 L852,392 L${COL_DER},${FL0} Z`}
        fill={SECUNDARIO}
        opacity={0.42}
      />

      {/* La franja del AIRMET, por delante del terreno y con su escalón. */}
      <path
        d={`M${COL_IZQ},${FL0} L${COL_IZQ},${techoLlano} L${MONTE_IZQ_X},${techoLlano}
            L${MONTE_IZQ_X},${techoMonte} L${COL_DER},${techoMonte} L${COL_DER},${FL0} Z`}
        fill={ACENTO}
        opacity={0.22}
      />
      <path
        d={`M${COL_IZQ},${techoLlano} L${MONTE_IZQ_X},${techoLlano}
            L${MONTE_IZQ_X},${techoMonte} L${COL_DER},${techoMonte}`}
        fill="none"
        stroke={ACENTO}
        strokeWidth={2}
      />

      <line x1={COL_IZQ} y1={FL0} x2={COL_DER} y2={FL0} stroke={TINTA} strokeWidth={2.4} />

      <Rotulo x={COL_IZQ + 22} y={158} color={ACENTO} tam={25}>SIGMET</Rotulo>
      <Rotulo x={COL_IZQ + 22} y={186} color={SECUNDARIO} tam={16}>TODAS LAS AERONAVES EN RUTA</Rotulo>

      <Rotulo x={COL_IZQ + 22} y={338} color={ACENTO} tam={25}>AIRMET</Rotulo>
      <Rotulo x={COL_IZQ + 22} y={366} color={SECUNDARIO} tam={16}>VUELOS A BAJA ALTURA</Rotulo>

      <Rotulo x={COL_IZQ - 12} y={techoLlano + 6} ancla="end" color={ACENTO} tam={18}>FL100</Rotulo>
      <Rotulo x={COL_DER - 12} y={techoMonte - 16} ancla="end" color={ACENTO_CLARO} tam={18}>
        FL150 EN ZONA MONTAÑOSA
      </Rotulo>

      <Jet x={398} cy={238} ancho={64} color={SECUNDARIO} />
      <Jet x={398} cy={404} ancho={64} color={ACENTO} />
    </Lienzo>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 29 · Deshacer un grupo de viento codificado
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Seis dígitos que se leen en tres pasos distintos. En texto son cuatro
 * renglones que hay que sostener en la cabeza a la vez; aquí cada par se queda
 * en su columna y la operación va escrita en la flecha, que es donde ocurre.
 */
const PARES = [
  { crudo: "73", que: "DIRECCIÓN", op: "-50", sale: "230°", cambia: true },
  { crudo: "19", que: "VELOCIDAD", op: "+100", sale: "119 kt", cambia: true },
  { crudo: "60", que: "TEMPERATURA", op: "SIGNO OMITIDO", sale: "-60 °C", cambia: false },
]

const CAJA_W = 186
const CAJA_SEP = 22

export function MeteoComponenteViento() {
  const total = PARES.length * CAJA_W + (PARES.length - 1) * CAJA_SEP
  const inicio = (W - total) / 2
  return (
    <Lienzo etiqueta="El grupo 731960 partido en tres pares de dígitos, cada uno en su columna. El primer par, 73, con una flecha que resta 50 y da dirección 230 grados. El segundo, 19, con una flecha que suma 100 y da 119 nudos. El tercero, 60, que pasa tal cual con el signo omitido y da 60 grados bajo cero.">
      {PARES.map((p, i) => {
        const x = inicio + i * (CAJA_W + CAJA_SEP)
        const cx = x + CAJA_W / 2
        return (
          <g key={p.crudo}>
            <Rotulo x={cx} y={128} ancla="middle" color={SECUNDARIO} tam={16}>{p.que}</Rotulo>

            <rect
              x={x}
              y={150}
              width={CAJA_W}
              height={104}
              fill={RESALTADO}
              stroke={LINEA}
              strokeWidth={1.4}
            />
            <text
              x={cx}
              y={224}
              textAnchor="middle"
              fontFamily={MONO}
              fontSize={72}
              fontWeight={700}
              fill={TINTA}
            >
              {p.crudo}
            </text>

            <Flecha
              x1={cx}
              y1={268}
              x2={cx}
              y2={344}
              color={p.cambia ? ACENTO : SECUNDARIO}
              grosor={p.cambia ? 2.4 : 1.6}
              discontinua={!p.cambia}
            />
            <rect
              x={cx - (p.op.length * 9.4 + 22) / 2}
              y={290}
              width={p.op.length * 9.4 + 22}
              height={30}
              fill={PAPEL}
            />
            <Rotulo
              x={cx}
              y={311}
              ancla="middle"
              color={p.cambia ? ACENTO : SECUNDARIO}
              tam={p.cambia ? 19 : 14}
            >
              {p.op}
            </Rotulo>

            <rect
              x={x}
              y={358}
              width={CAJA_W}
              height={86}
              fill={p.cambia ? ACENTO : PAPEL}
              opacity={p.cambia ? 0.22 : 1}
              stroke={p.cambia ? ACENTO : LINEA}
              strokeWidth={1.6}
            />
            <text
              x={cx}
              y={414}
              textAnchor="middle"
              fontFamily={MONO}
              fontSize={40}
              fontWeight={700}
              fill={p.cambia ? ACENTO : SECUNDARIO}
            >
              {p.sale}
            </text>
          </g>
        )
      })}

      <Rotulo x={W / 2} y={490} ancla="middle" color={SECUNDARIO} tam={16}>
        731960 ES VIENTO DEL 230 A 119 KT CON -60 °C
      </Rotulo>
    </Lienzo>
  )
}
