import { Link } from "react-router-dom"
import { ArrowRight, Check } from "lucide-react"
import { InsigniaLogro } from "@/components/logros/InsigniaLogro"
import type { Achievement } from "@/components/dashboard/tipos"
import { NOMBRE_DEL_NIVEL, NOMBRE_DEL_TIPO, XP_DE_NIVEL, estiloDeMetal, tipoDeLogro, type MODULOS_DE_LOGROS } from "@/lib/logros"

/** «12 sep 2026», en la hora de Bogotá. */
const fecha = new Intl.DateTimeFormat("es-CO", { timeZone: "America/Bogota", day: "numeric", month: "short", year: "numeric" })

/**
 * Un trofeo de la vitrina: la insignia sobre su pedestal, lo que vale y cuándo
 * se ganó. Sin ganar se ve igual de entero, en grafito y con su candado: la
 * pastilla de metal dice lo que va a valer.
 */
export function Trofeo({
  logro,
  ganado,
  ganadoEl,
  nuevo,
}: {
  logro: Achievement
  ganado: boolean
  ganadoEl: string | undefined
  nuevo: boolean
}) {
  return (
    <li
      data-metal
      data-ganado={ganado}
      style={estiloDeMetal(logro.tier)}
      className="logros-trofeo relative flex min-h-[262px] min-w-0 flex-col items-center rounded-3xl surface px-4 pb-4 pt-7 text-center"
    >
      {nuevo && (
        <span
          className="rotulo-mono absolute left-3 top-3 rounded-full px-2 py-[3px] text-[9px] text-white"
          style={{ background: "var(--marca-acento)" }}
        >
          Nuevo
        </span>
      )}
      <span className="logros-pedestal">
        <span className="logros-insignia">
          <InsigniaLogro code={logro.code} nivel={logro.tier} conseguido={ganado} tamano={84} />
        </span>
      </span>
      <p className={`m-0 mt-5 text-[14px] font-semibold leading-snug ${ganado ? "text-foreground" : "text-foreground/80"}`}>{logro.name}</p>
      <p className="m-0 mt-1 line-clamp-2 text-[12px] leading-snug text-muted-foreground">{logro.description}</p>
      <div className="mt-auto flex flex-col items-center gap-2 pt-4">
        <span className="logros-pastilla rotulo-mono rounded-full px-2.5 py-1 text-[9.5px]">
          {NOMBRE_DEL_NIVEL[logro.tier]} · {XP_DE_NIVEL[logro.tier]} XP
        </span>
        {ganado ? (
          <span className="inline-flex items-center gap-1 text-[11.5px] font-medium" style={{ color: "var(--av-success-fg)" }}>
            <Check className="h-3.5 w-3.5" aria-hidden />
            {ganadoEl ? fecha.format(new Date(ganadoEl)) : "Ganado"}
          </span>
        ) : (
          <span className="text-[11.5px] text-muted-foreground">Por ganar</span>
        )}
      </div>
    </li>
  )
}

/**
 * El recorrido de un módulo: lección, práctica, evaluación y dominio en una
 * línea que se va llenando con el acento del módulo, como un mapa de niveles.
 * La tarjeta entera lleva al módulo.
 */
export function RutaDeModulo({
  modulo,
  porCodigo,
  ganado,
}: {
  modulo: (typeof MODULOS_DE_LOGROS)[number]
  porCodigo: Map<string, Achievement>
  ganado: (code: string) => boolean
}) {
  const suyos = modulo.codigos.filter((c) => porCodigo.has(c))
  const hechos = suyos.filter(ganado).length
  const ultimo = suyos.reduce((u, c, i) => (ganado(c) ? i : u), -1)
  const avance = suyos.length > 1 && ultimo > 0 ? ultimo / (suyos.length - 1) : 0
  const completo = hechos === suyos.length

  const accion = completo ? "Repasar el módulo" : hechos === 0 ? "Empezar" : "Continuar"
  const pasos = suyos.filter(ganado).map((c) => NOMBRE_DEL_TIPO[tipoDeLogro(c)].toLowerCase())
  const etiqueta = `${modulo.titulo}: ${hechos} de ${suyos.length}${pasos.length ? ` (${pasos.join(", ")})` : ""}. ${accion}`

  return (
    <li className="min-w-0">
      <Link
        to={modulo.hub}
        className="group flex h-full min-w-0 flex-col rounded-3xl surface surface-lift p-5"
        aria-label={etiqueta}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="flex min-w-0 items-center gap-2.5">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: modulo.acento }} aria-hidden />
            <span className="display-archivo truncate text-[17px] font-bold text-foreground">{modulo.titulo}</span>
          </span>
          <span className="flex shrink-0 items-center gap-2.5">
            <span
              className="rotulo-mono text-[10.5px]"
              style={{ color: completo ? "var(--av-success-fg)" : "var(--muted-foreground)" }}
            >
              {hechos}/{suyos.length}
            </span>
            {/* El acento en la flecha y no en un texto: el mostaza o el
                turquesa de algunos módulos no se leen como texto sobre blanco. */}
            <span className="grid h-7 w-7 place-items-center rounded-full bg-muted transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5" style={{ color: modulo.acento }} aria-hidden />
            </span>
          </span>
        </div>

        {/* La pista va detrás de las insignias, de centro a centro. */}
        <div className="relative mt-5" aria-hidden>
          <span className="absolute left-8 right-8 top-[26px] h-[3px] -translate-y-1/2 rounded-full bg-muted" />
          <span
            className="absolute left-8 top-[26px] h-[3px] -translate-y-1/2 rounded-full transition-[width] duration-700"
            style={{ width: `calc((100% - 4rem) * ${avance})`, background: modulo.acento }}
          />
          <ol className="relative m-0 flex list-none justify-between p-0">
            {suyos.map((c) => {
              const logro = porCodigo.get(c)!
              const suyo = ganado(c)
              return (
                <li key={c} className="flex w-16 flex-col items-center gap-2 text-center" title={`${logro.name}: ${logro.description}`}>
                  <InsigniaLogro code={c} nivel={logro.tier} conseguido={suyo} tamano={52} />
                  <span className={`text-[11px] leading-tight ${suyo ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                    {NOMBRE_DEL_TIPO[tipoDeLogro(c)]}
                  </span>
                </li>
              )
            })}
          </ol>
        </div>
      </Link>
    </li>
  )
}

/** Cómo se lee una insignia: la forma dice qué fue y el metal, cuánto vale. */
export function ComoSeGana() {
  const formas: { code: string; tipo: string; que: string }[] = [
    { code: "notam_lesson", tipo: "Medallón", que: "Leer la lección" },
    { code: "notam_practice", tipo: "Hexágono", que: "Hacer la práctica" },
    { code: "notam_exam", tipo: "Escudo", que: "Aprobar la evaluación" },
    { code: "notam_master", tipo: "Alas", que: "Dominar el módulo" },
    { code: "first_step", tipo: "Octágono", que: "Un hito" },
  ]
  return (
    <section className="min-w-0 rounded-3xl surface p-5 sm:p-6" aria-labelledby="logros-como">
      <h2 id="logros-como" className="rotulo-mono m-0 text-[11px] text-muted-foreground">
        Cómo se lee un trofeo
      </h2>
      <ul className="m-0 mt-4 grid list-none grid-cols-5 gap-2 p-0">
        {formas.map((f) => (
          <li key={f.code} className="flex min-w-0 flex-col items-center gap-1.5 text-center">
            <InsigniaLogro code={f.code} nivel="silver" conseguido tamano={46} />
            <span className="text-[11.5px] font-semibold leading-tight text-foreground">{f.tipo}</span>
            <span className="text-[10.5px] leading-tight text-muted-foreground">{f.que}</span>
          </li>
        ))}
      </ul>
      <ul className="m-0 mt-5 grid list-none grid-cols-2 gap-2 border-t border-border p-0 pt-4 @xl:grid-cols-4">
        {(["bronze", "silver", "gold", "platinum"] as const).map((nivel) => (
          <li key={nivel} data-metal style={estiloDeMetal(nivel)} className="flex items-center gap-2">
            <InsigniaLogro code="nivel" nivel={nivel} conseguido tamano={28} />
            <span className="min-w-0">
              <span className="block text-[12px] font-semibold text-foreground">{NOMBRE_DEL_NIVEL[nivel]}</span>
              <span className="rotulo-mono block text-[9.5px]" style={{ color: "var(--metal-texto)" }}>
                {XP_DE_NIVEL[nivel]} XP
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
