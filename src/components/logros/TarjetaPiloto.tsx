import { useId } from "react"
import { InsigniaLogro } from "@/components/logros/InsigniaLogro"
import { useAlMontar } from "@/components/logros/useAlMontar"
import { METAL_DE_NIVEL, NOMBRE_DEL_NIVEL, XP_POR_RANGO, estiloDeMetal, type NivelDeLogro, type Rango } from "@/lib/logros"

export interface ConteoDeMetal {
  nivel: NivelDeLogro
  ganados: number
  total: number
}

/**
 * La tarjeta del piloto, arriba de la sala de trofeos: su nivel con la XP que
 * le falta para el siguiente, el anillo de la colección y cuántos trofeos
 * lleva de cada metal. Oscura en los dos temas: es la pieza que se mira.
 */
export function TarjetaPiloto({
  cargando,
  usuario,
  rango,
  ganados,
  total,
  metales,
}: {
  cargando: boolean
  usuario: string | null
  rango: Rango
  ganados: number
  total: number
  metales: ConteoDeMetal[]
}) {
  const montado = useAlMontar()
  const pct = total ? Math.round((ganados / total) * 100) : 0
  const avance = cargando ? 0 : rango.xpEnRango / XP_POR_RANGO

  return (
    <section className="logros-hero rounded-[28px] p-6 sm:p-8 @4xl:p-10" aria-labelledby="logros-titulo">
      <div className="grid gap-9 @4xl:grid-cols-[minmax(0,1fr)_auto] @4xl:items-center @4xl:gap-10">
        <div className="min-w-0">
          <p className="logros-rotulo m-0 text-[11px] text-white/55">Sala de trofeos</p>
          <h1 id="logros-titulo" className="logros-display m-0 mt-2 text-[44px] font-extrabold leading-[0.95] sm:text-[58px]">
            Logros
          </h1>

          <div className="mt-7 flex items-center gap-4">
            <EmblemaDeRango numero={cargando ? null : rango.numero} metal={rango.metal} />
            <div className="min-w-0">
              {usuario && <p className="logros-rotulo m-0 truncate text-[10.5px] text-white/55">@{usuario}</p>}
              <p className="logros-display m-0 mt-1 text-[28px] font-bold leading-none sm:text-[32px]">
                Nivel {cargando ? "…" : rango.numero}
              </p>
              <p className="m-0 mt-1.5 text-[13.5px] text-white/65">{cargando ? "Cargando tu colección" : rango.fase}</p>
            </div>
          </div>

          <div className="mt-6 max-w-[520px]">
            <div className="flex items-baseline justify-between gap-3 text-[12.5px]">
              <span className="logros-display text-white/75">
                <span className="text-[18px] font-bold text-white">{cargando ? "…" : rango.xpEnRango}</span> / {XP_POR_RANGO} XP
              </span>
              {!cargando && (
                <span className="text-right text-white/55">
                  {rango.xpParaSubir} XP para el nivel {rango.numero + 1}
                </span>
              )}
            </div>
            <div
              className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-label={`XP del nivel ${rango.numero}`}
              aria-valuenow={rango.xpEnRango}
              aria-valuemin={0}
              aria-valuemax={XP_POR_RANGO}
            >
              <div
                className="logros-llenado h-full rounded-full"
                style={{
                  width: `${montado ? avance * 100 : 0}%`,
                  background: "linear-gradient(90deg, #3a6ea5, #8fb6e3 70%, #e8f0f9)",
                  boxShadow: "0 0 14px rgb(143 182 227 / 55%)",
                }}
              />
            </div>
            <p className="m-0 mt-2.5 text-[12px] text-white/45">
              {cargando ? "" : `${rango.xp} XP en total. Bronce 15, plata 30, oro 90 y platino 180.`}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 @xl:flex-row @xl:justify-center @4xl:justify-end">
          <Anillo pct={pct} ganados={ganados} total={total} montado={montado} cargando={cargando} />
          <ul className="m-0 grid w-full list-none grid-cols-4 gap-2 p-0 @xl:w-auto @xl:grid-cols-2 @xl:gap-2.5" aria-label="Trofeos por metal">
            {metales.map(({ nivel, ganados: suyos, total: delNivel }) => (
              <li
                key={nivel}
                data-metal
                style={estiloDeMetal(nivel)}
                className={`flex min-w-0 flex-col items-center gap-1.5 rounded-2xl bg-white/[0.06] px-1 py-2.5 text-center ring-1 ring-inset ring-white/10 @xl:flex-row @xl:gap-3 @xl:pl-2.5 @xl:pr-4 @xl:text-left ${
                  suyos === 0 ? "opacity-55" : ""
                }`}
              >
                <InsigniaLogro code="nivel" nivel={nivel} conseguido tamano={40} />
                <div className="min-w-0">
                  <p className="logros-display m-0 text-[22px] font-bold leading-none">
                    {cargando ? "…" : suyos}
                    <span className="text-[13px] font-medium text-white/45">/{delNivel}</span>
                  </p>
                  <p className="logros-rotulo m-0 mt-1 text-[9.5px]" style={{ color: "var(--metal-brillo)" }}>
                    {NOMBRE_DEL_NIVEL[nivel]}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/** El anillo de la colección: champán, como el reflejo de la tarjeta. */
function Anillo({
  pct,
  ganados,
  total,
  montado,
  cargando,
}: {
  pct: number
  ganados: number
  total: number
  montado: boolean
  cargando: boolean
}) {
  const id = useId().replace(/:/g, "")
  const radio = 60
  const vuelta = 2 * Math.PI * radio
  return (
    <div
      className="relative grid h-[152px] w-[152px] shrink-0 place-items-center"
      role="img"
      aria-label={cargando ? "Cargando la colección" : `${ganados} de ${total} trofeos, ${pct} %`}
    >
      <svg viewBox="0 0 140 140" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden focusable="false">
        <defs>
          <linearGradient id={`${id}-anillo`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F2E2B1" />
            <stop offset="1" stopColor="#CFAE5F" />
          </linearGradient>
        </defs>
        <circle cx="70" cy="70" r={radio} fill="none" stroke="rgb(255 255 255 / 10%)" strokeWidth="9" />
        {pct > 0 && (
          <circle
            className="logros-llenado"
            cx="70"
            cy="70"
            r={radio}
            fill="none"
            stroke={`url(#${id}-anillo)`}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={vuelta}
            strokeDashoffset={montado ? vuelta * (1 - pct / 100) : vuelta}
          />
        )}
      </svg>
      <div className="text-center" aria-hidden>
        <p className="logros-display m-0 text-[36px] font-extrabold leading-none">
          {cargando ? "…" : pct}
          <span className="text-[16px] font-bold text-white/55">%</span>
        </p>
        <p className="m-0 mt-1.5 text-[11.5px] text-white/60">{cargando ? "de la colección" : `${ganados} de ${total} trofeos`}</p>
      </div>
    </div>
  )
}

const HEXAGONO = "M50 3 L90.7 26.5 L90.7 73.5 L50 97 L9.3 73.5 L9.3 26.5 Z"

/**
 * El emblema del nivel: el mismo dibujo que las insignias (filo de metal y
 * centro navy), con la cifra del nivel en vez del glifo. El metal sube con
 * las fases (ver rangoDePiloto).
 */
function EmblemaDeRango({ numero, metal }: { numero: number | null; metal: NivelDeLogro }) {
  const id = useId().replace(/:/g, "")
  const [sombra, cuerpo, brillo] = METAL_DE_NIVEL[metal]
  const escala = "translate(50 50) scale(0.84) translate(-50 -50)"
  return (
    <svg
      viewBox="0 0 100 100"
      width={78}
      height={78}
      className="shrink-0 drop-shadow-[0_10px_18px_rgb(0_0_0_/_35%)]"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-metal`} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor={brillo} />
          <stop offset="0.45" stopColor={cuerpo} />
          <stop offset="1" stopColor={sombra} />
        </linearGradient>
        <linearGradient id={`${id}-centro`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#1B3358" />
          <stop offset="1" stopColor="#0B1E3A" />
        </linearGradient>
      </defs>
      <path d={HEXAGONO} fill={`url(#${id}-metal)`} />
      <path d={HEXAGONO} fill={`url(#${id}-centro)`} transform={escala} />
      <path d={HEXAGONO} fill="none" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="1.2" transform={escala} />
      <text
        x="50"
        y="51"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontFamily="'Archivo Variable', 'Archivo', sans-serif"
        fontWeight="800"
        fontSize={numero !== null && numero >= 10 ? 34 : 40}
      >
        {numero ?? "·"}
      </text>
    </svg>
  )
}
