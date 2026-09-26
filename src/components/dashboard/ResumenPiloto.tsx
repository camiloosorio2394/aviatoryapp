import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import type { LicenseRow } from "@/components/dashboard/tipos"
import { daysUntil } from "@/components/dashboard/plan"
import { estadoDeDocumento, grupoDeDocumento, type EstadoDeDocumento, type GrupoDeDocumento } from "@/lib/licencias"
import { ESTADO_VISUAL, horas, textoDeEstado } from "@/components/dashboard/portada"
import { IconoPanel } from "@/components/marca/Icono"
import type { NombreIconoPanel } from "@/components/marca/iconosPanel"

/**
 * Las piezas de la portada: el encabezado de cada sección y las tarjetas de
 * datos del piloto.
 *
 * Camilo las encontró «muy grandes y recargadas» (26-sep-2026): cada tarjeta
 * llevaba su título y su cifra en Playfair seminegrita, a 18 y a 40 px. Ahora
 * la Playfair queda para los títulos de sección, el título de la tarjeta es
 * un rótulo discreto y la cifra va en Manrope de peso medio (`.cifra`).
 */

/** El título de una sección de la portada, con su ícono y una acción opcional. */
export function EncabezadoSeccion({
  icono,
  titulo,
  bajada,
  accion,
}: {
  icono?: NombreIconoPanel
  titulo: string
  bajada?: string
  accion?: { texto: string; to: string }
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
      {icono && <IconoPanel nombre={icono} className="h-11 w-11" />}
      <div className="min-w-[min(100%,15rem)] flex-1">
        <h2 className="titular m-0 text-[22px] font-medium leading-tight text-foreground">{titulo}</h2>
        {bajada && <p className="m-0 mt-0.5 text-[13px] text-muted-foreground">{bajada}</p>}
      </div>
      {accion && (
        <Link
          to={accion.to}
          className="group inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-foreground/80 transition-colors hover:text-foreground"
        >
          {accion.texto}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      )}
    </div>
  )
}

/** Tarjeta de un dato del piloto: ícono, rótulo, la cifra y su detalle. */
export function TarjetaDato({
  icono,
  titulo,
  to,
  children,
  className = "",
}: {
  icono?: NombreIconoPanel
  titulo: string
  to: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`flex min-w-0 flex-col rounded-2xl surface p-5 ${className}`}>
      <header className="flex items-center gap-3">
        {icono && <IconoPanel nombre={icono} className="h-11 w-11" />}
        <h3 className="m-0 min-w-0 flex-1 truncate text-[14px] font-medium text-foreground/80">{titulo}</h3>
        <Link
          to={to}
          aria-label={`Abrir ${titulo.toLowerCase()}`}
          className="-mr-1.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </header>
      <div className="mt-5 flex min-w-0 flex-1 flex-col">{children}</div>
    </section>
  )
}

/** La cifra de una tarjeta, con su unidad en pequeño. */
export function Cifra({ valor, unidad, apagada = false }: { valor: string; unidad?: string; apagada?: boolean }) {
  return (
    <p className={`cifra m-0 text-[30px] leading-none ${apagada ? "text-muted-foreground" : "text-foreground"}`}>
      {valor}
      {unidad && <span className="ml-1 text-[15px] font-normal tracking-normal text-muted-foreground">{unidad}</span>}
    </p>
  )
}

/** Barra fina de avance, en el azul de la marca. */
export function Barra({ pct, etiqueta }: { pct: number; etiqueta: string }) {
  const v = Math.max(0, Math.min(100, Math.round(pct)))
  return (
    <div
      className="h-1 overflow-hidden rounded-full bg-muted"
      role="progressbar"
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={etiqueta}
    >
      <div className="h-full rounded-full bg-[var(--marca-acento)] transition-[width] duration-500" style={{ width: `${v}%` }} />
    </div>
  )
}

/** El renglón de abajo de una tarjeta: un texto a cada lado. */
function Pie({ izquierda, derecha }: { izquierda: ReactNode; derecha?: ReactNode }) {
  return (
    <div className="mt-2.5 flex items-baseline justify-between gap-3 text-[12px] text-muted-foreground">
      <span className="min-w-0 truncate">{izquierda}</span>
      {derecha && <span className="shrink-0">{derecha}</span>}
    </div>
  )
}

function EnlacePie({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-1 font-medium text-foreground">
      {children}
      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
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
    <TarjetaDato icono="horas" titulo="Horas totales" to="/app/logbook">
      {total ? (
        <>
          <Cifra valor={horas.format(total)} unidad="h" />
          <p className="m-0 mt-2 text-[12.5px] text-muted-foreground">{pic ? `${horas.format(pic)} h como PIC` : "PIC sin anotar"}</p>
          <div className="mt-auto pt-5">
            {meta ? (
              <>
                <Barra pct={(total / meta) * 100} etiqueta={`Horas hacia ${horas.format(meta)}`} />
                <Pie izquierda={`Meta ${horas.format(meta)} h`} derecha={<span className="tabular">Faltan {horas.format(Math.ceil(meta - total))} h</span>} />
              </>
            ) : (
              <p className="m-0 text-[12.5px] font-medium" style={{ color: "var(--av-success-fg)" }}>
                Cumples las horas de todas las aerolíneas de la lista
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <Cifra valor="Sin anotar" apagada />
          <p className="m-0 mt-2 text-[12.5px] text-muted-foreground">Con tus horas calculamos qué te falta.</p>
          <div className="mt-auto pt-5 text-[12px]">
            <EnlacePie to="/app/perfil">Anotarlas en mi perfil</EnlacePie>
          </div>
        </>
      )}
    </TarjetaDato>
  )
}

// ─── Inglés ICAO ────────────────────────────────────────────────────────────

const OBJETIVO_ICAO = 4

export function TarjetaIcao({ nivel, medirHref }: { nivel: number | null; medirHref: string }) {
  const medido = nivel !== null && nivel > 0
  return (
    <TarjetaDato icono="ingles-icao" titulo="Inglés ICAO" to="/app/icao">
      {medido ? (
        <>
          <Cifra valor={`Nivel ${nivel}`} />
          <p
            className="m-0 mt-2 text-[12.5px]"
            style={{ color: (nivel ?? 0) >= OBJETIVO_ICAO ? "var(--av-success-fg)" : "var(--av-warn-fg)" }}
          >
            {(nivel ?? 0) >= OBJETIVO_ICAO ? "Cumples el mínimo de aerolínea" : `Te falta llegar a nivel ${OBJETIVO_ICAO}`}
          </p>
          <div className="mt-auto pt-5">
            {/* Los seis niveles en seis tramos: los alcanzados en azul, el mínimo marcado. */}
            <div className="flex gap-1" role="img" aria-label={`Nivel ${nivel} de 6. El mínimo de aerolínea es ${OBJETIVO_ICAO}.`}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <span
                  key={n}
                  className={`h-1 flex-1 rounded-full ${n <= (nivel ?? 0) ? "bg-[var(--marca-acento)]" : n === OBJETIVO_ICAO ? "bg-foreground/25" : "bg-muted"}`}
                />
              ))}
            </div>
            <Pie izquierda={`Mínimo: nivel ${OBJETIVO_ICAO}`} derecha={<EnlacePie to="/app/icao">Practicar</EnlacePie>} />
          </div>
        </>
      ) : (
        <>
          <Cifra valor="Sin medir" apagada />
          <p className="m-0 mt-2 text-[12.5px] text-muted-foreground">Las aerolíneas piden nivel {OBJETIVO_ICAO} o más.</p>
          <div className="mt-auto pt-5 text-[12px]">
            <EnlacePie to={medirHref}>Medir mi nivel</EnlacePie>
          </div>
        </>
      )}
    </TarjetaDato>
  )
}

// ─── Documentación ──────────────────────────────────────────────────────────

const PEOR: EstadoDeDocumento[] = ["vencido", "por-vencer", "vigente", "sin-fecha"]

const GRUPOS: { grupo: GrupoDeDocumento; nombre: string }[] = [
  { grupo: "licencia", nombre: "Licencia" },
  { grupo: "medico", nombre: "Médico" },
  { grupo: "otros", nombre: "Otros" },
]

/** El estado de cada grupo: el documento que peor está manda. */
function estadoDeGrupos(documentos: LicenseRow[]) {
  return GRUPOS.map(({ grupo, nombre }) => {
    const delGrupo = documentos.filter((d) => grupoDeDocumento(d.license_type) === grupo)
    if (delGrupo.length === 0) return { grupo, nombre, estado: null, dias: null }
    const conDias = delGrupo.map((d) => {
      const dias = d.expires_date ? daysUntil(d.expires_date) : null
      return { dias, estado: estadoDeDocumento(dias) }
    })
    conDias.sort((a, b) => PEOR.indexOf(a.estado) - PEOR.indexOf(b.estado) || (a.dias ?? 1e9) - (b.dias ?? 1e9))
    return { grupo, nombre, ...conDias[0] }
  })
}

export function TarjetaDocumentos({ documentos }: { documentos: LicenseRow[] }) {
  const grupos = estadoDeGrupos(documentos)
  const vencidos = grupos.filter((g) => g.estado === "vencido").length
  const porVencer = grupos.filter((g) => g.estado === "por-vencer").length
  // «Otros» es opcional: sin licencia o sin médico la documentación está por completar.
  const faltaLoBasico = grupos.some((g) => g.grupo !== "otros" && g.estado === null)
  const resumen = vencidos
    ? { valor: vencidos === 1 ? "1 vencido" : `${vencidos} vencidos`, color: ESTADO_VISUAL.vencido.color }
    : porVencer
      ? { valor: `${porVencer} por vencer`, color: ESTADO_VISUAL["por-vencer"].color }
      : faltaLoBasico
        ? { valor: "Por completar", color: undefined }
        : { valor: "Al día", color: undefined }
  return (
    <TarjetaDato icono="documentacion" titulo="Documentación" to="/app/vencimientos">
      <p className="cifra m-0 text-[30px] leading-none text-foreground" style={resumen.color ? { color: resumen.color } : undefined}>
        {resumen.valor}
      </p>
      <ul className="m-0 mt-auto flex list-none flex-col gap-1.5 p-0 pt-4">
        {grupos.map(({ grupo, nombre, estado, dias }) => (
          <li key={grupo} className="flex items-center gap-2 text-[12.5px]">
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: estado ? ESTADO_VISUAL[estado].color : "var(--muted-foreground)", opacity: estado ? 1 : 0.4 }}
            />
            <span className="min-w-0 flex-1 truncate text-foreground/85">{nombre}</span>
            <span className="shrink-0" style={{ color: estado ? ESTADO_VISUAL[estado].color : "var(--muted-foreground)" }}>
              {estado ? textoDeEstado(estado, dias) : "Sin registrar"}
            </span>
          </li>
        ))}
      </ul>
    </TarjetaDato>
  )
}

// ─── Progreso general ───────────────────────────────────────────────────────

export function TarjetaProgreso({ pct, completos, total }: { pct: number; completos: number; total: number }) {
  const v = Math.max(0, Math.min(100, Math.round(pct)))
  return (
    <TarjetaDato icono="progreso" titulo="Progreso general" to="/app/aerolinea">
      <Cifra valor={String(v)} unidad="%" />
      <p className="m-0 mt-2 text-[12.5px] text-muted-foreground">
        {completos} de {total} módulos completados
      </p>
      <div className="mt-auto pt-5">
        <Barra pct={v} etiqueta={`Progreso general: ${v} %`} />
        <Pie izquierda="Ingreso a aerolínea" derecha={<EnlacePie to="/app/aerolinea">Ver módulos</EnlacePie>} />
      </div>
    </TarjetaDato>
  )
}
