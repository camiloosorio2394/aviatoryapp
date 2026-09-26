import type { ComponentType, ReactNode } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, AudioLines, BarChart3, ChevronRight, Circle, FileText } from "lucide-react"
import type { LicenseRow } from "@/components/dashboard/tipos"
import { daysUntil } from "@/components/dashboard/plan"
import { estadoDeDocumento, grupoDeDocumento, type EstadoDeDocumento, type GrupoDeDocumento } from "@/lib/licencias"
import { ESTADO_VISUAL, horas, textoDeEstado } from "@/components/dashboard/portada"

/** Tarjeta del panel: icono en su recuadro, título y el enlace a la pantalla del dato. */
export function TarjetaPanel({
  icon: Icon,
  titulo,
  to,
  children,
  className = "",
}: {
  icon: ComponentType<{ className?: string }>
  titulo: string
  to: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex min-w-0 flex-col rounded-2xl surface p-5 ${className}`}>
      <div className="flex items-start gap-3.5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-muted text-foreground">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <h2 className="m-0 mt-2.5 min-w-0 flex-1 truncate text-[15px] font-semibold tracking-[-0.01em] text-foreground">
          {titulo}
        </h2>
        <Link
          to={to}
          aria-label={`Ver ${titulo.toLowerCase()}`}
          className="-mr-1 mt-1.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      <div className="mt-3 flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  )
}

/** Barra fina de avance, del color de la tinta. */
export function Barra({ pct, etiqueta }: { pct: number; etiqueta: string }) {
  const v = Math.max(0, Math.min(100, Math.round(pct)))
  return (
    <div
      className="h-1.5 overflow-hidden rounded-full bg-muted"
      role="progressbar"
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={etiqueta}
    >
      <div className="h-full rounded-full bg-foreground transition-[width] duration-500" style={{ width: `${v}%` }} />
    </div>
  )
}

// ─── Horas ──────────────────────────────────────────────────────────────────

export function TarjetaHoras({
  total,
  pic,
  meta,
}: {
  total: number | null
  pic: number | null
  /** El siguiente mínimo de horas de las aerolíneas; `null` si ya cumple todos o no hay datos. */
  meta: number | null
}) {
  return (
    <TarjetaPanel icon={BarChart3} titulo="Horas totales" to="/app/logbook">
      {total ? (
        <>
          <div className="nh-display text-[34px] font-bold leading-none tracking-[-0.03em] text-foreground">
            {horas.format(total)}
          </div>
          <div className="mt-1 text-[12.5px] text-muted-foreground">{pic ? `PIC ${horas.format(pic)}` : "PIC sin anotar"}</div>
          <div className="mt-auto pt-4">
            {meta ? (
              <>
                <Barra pct={(total / meta) * 100} etiqueta={`Horas hacia ${horas.format(meta)}`} />
                <div className="mt-2 flex items-baseline justify-between gap-2 text-[12px] text-muted-foreground">
                  <span className="tabular">
                    {Math.floor((total / meta) * 100)} % para {horas.format(meta)} h
                  </span>
                  <span className="tabular">Faltan {horas.format(Math.ceil(meta - total))} h</span>
                </div>
              </>
            ) : (
              <p className="m-0 text-[12.5px] font-semibold" style={{ color: "var(--av-success-fg)" }}>
                Cumples las horas de todas las aerolíneas de la lista
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="nh-display text-[34px] font-bold leading-none text-muted-foreground">—</div>
          <Link to="/app/perfil" className="mt-auto inline-flex items-center gap-1 pt-4 text-[13px] font-semibold text-foreground">
            Anótalas en tu perfil <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </>
      )}
    </TarjetaPanel>
  )
}

// ─── Inglés ICAO ────────────────────────────────────────────────────────────

const OBJETIVO_ICAO = 4

export function TarjetaIcao({ nivel, medirHref }: { nivel: number | null; medirHref: string }) {
  const medido = nivel !== null && nivel > 0
  return (
    <TarjetaPanel icon={AudioLines} titulo="Inglés ICAO" to="/app/icao">
      <div className="nh-display text-[30px] font-bold leading-none tracking-[-0.02em] text-foreground">
        {medido ? `Nivel ${nivel}` : <span className="text-muted-foreground">Sin medir</span>}
      </div>
      {/* Los seis niveles en una regla: el actual relleno, el objetivo marcado. */}
      <ol className="relative m-0 mt-4 flex list-none items-center justify-between p-0" aria-label="Niveles ICAO del 1 al 6">
        <span aria-hidden className="absolute left-1.5 right-1.5 top-[7px] h-0.5 bg-muted" />
        {medido && (
          <span
            aria-hidden
            className="absolute left-1.5 top-[7px] h-0.5 bg-foreground"
            style={{ width: `calc((100% - 12px) * ${((nivel ?? 1) - 1) / 5})` }}
          />
        )}
        {[1, 2, 3, 4, 5, 6].map((n) => {
          const alcanzado = medido && n <= (nivel ?? 0)
          const actual = medido && n === nivel
          return (
            <li key={n} className="relative flex flex-col items-center gap-1.5">
              <span
                className={`block rounded-full border-2 ${actual ? "h-4 w-4 border-foreground bg-foreground" : alcanzado ? "h-3 w-3 border-foreground bg-foreground" : n === OBJETIVO_ICAO ? "h-3 w-3 border-foreground bg-card" : "h-3 w-3 border-muted-foreground/40 bg-card"}`}
              />
              <span className={`tabular text-[11px] ${actual || n === OBJETIVO_ICAO ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{n}</span>
            </li>
          )
        })}
      </ol>
      <div className="mt-auto flex items-baseline justify-between gap-2 pt-3 text-[12px]">
        <span className="text-muted-foreground">Objetivo: Nivel {OBJETIVO_ICAO}</span>
        <Link to={medido ? "/app/icao" : medirHref} className="inline-flex items-center gap-1 font-semibold text-foreground">
          {medido ? "Practicar ahora" : "Medir mi nivel"} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </TarjetaPanel>
  )
}

// ─── Documentación ──────────────────────────────────────────────────────────

const PEOR: EstadoDeDocumento[] = ["vencido", "por-vencer", "vigente", "sin-fecha"]

const GRUPOS: { grupo: GrupoDeDocumento; nombre: string }[] = [
  { grupo: "licencia", nombre: "Licencia de piloto" },
  { grupo: "medico", nombre: "Certificado médico" },
  { grupo: "otros", nombre: "Otros certificados" },
]

export function TarjetaDocumentos({ documentos }: { documentos: LicenseRow[] }) {
  return (
    <TarjetaPanel icon={FileText} titulo="Documentación" to="/app/vencimientos">
      <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
        {GRUPOS.map(({ grupo, nombre }) => {
          const delGrupo = documentos.filter((d) => grupoDeDocumento(d.license_type) === grupo)
          if (delGrupo.length === 0) {
            return (
              <li key={grupo} className="flex items-center gap-2.5 text-[13px]">
                <Circle className="h-4 w-4 shrink-0 text-muted-foreground/50" aria-hidden />
                <span className="min-w-0 flex-1 truncate text-foreground">{nombre}</span>
                <span className="shrink-0 text-muted-foreground">Sin registrar</span>
              </li>
            )
          }
          // El que peor está manda: un médico vigente y otro vencido es «vencido».
          const conDias = delGrupo.map((d) => {
            const dias = d.expires_date ? daysUntil(d.expires_date) : null
            return { dias, estado: estadoDeDocumento(dias) }
          })
          conDias.sort((a, b) => PEOR.indexOf(a.estado) - PEOR.indexOf(b.estado) || (a.dias ?? 1e9) - (b.dias ?? 1e9))
          const { estado, dias } = conDias[0]
          const { icono: Icono, color } = ESTADO_VISUAL[estado]
          return (
            <li key={grupo} className="flex items-center gap-2.5 text-[13px]">
              <Icono className="h-4 w-4 shrink-0" style={{ color }} aria-hidden />
              <span className="min-w-0 flex-1 truncate text-foreground">{nombre}</span>
              <span className="shrink-0 font-medium" style={{ color }}>
                {textoDeEstado(estado, dias)}
              </span>
            </li>
          )
        })}
      </ul>
    </TarjetaPanel>
  )
}

// ─── Progreso general ───────────────────────────────────────────────────────

export function TarjetaProgreso({ pct, completos, total }: { pct: number; completos: number; total: number }) {
  const r = 34
  const c = 2 * Math.PI * r
  const v = Math.max(0, Math.min(100, Math.round(pct)))
  return (
    <div className="flex min-w-0 items-center gap-5 rounded-2xl surface p-5">
      <svg viewBox="0 0 84 84" className="h-[92px] w-[92px] shrink-0" role="img" aria-label={`Progreso general: ${v} %`}>
        <circle cx="42" cy="42" r={r} fill="none" stroke="var(--muted)" strokeWidth="7" />
        <circle
          cx="42"
          cy="42"
          r={r}
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${(c * v) / 100} ${c}`}
          transform="rotate(-90 42 42)"
        />
        <text x="42" y="47.5" textAnchor="middle" className="nh-display" fontSize="17" fontWeight="700" fill="var(--foreground)">
          {v} %
        </text>
      </svg>
      <div className="min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h2 className="m-0 text-[15px] font-semibold tracking-[-0.01em] text-foreground">Progreso general</h2>
        </div>
        <p className="m-0 mt-1.5 text-[13px] text-muted-foreground">
          {completos} de {total} módulos completados
        </p>
        <Link to="/app/aerolinea" className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-foreground">
          Ver todos los módulos <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  )
}
