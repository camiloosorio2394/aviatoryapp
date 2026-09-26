import { Link } from "react-router-dom"
import { ArrowRight, BarChart3, CalendarDays, CalendarCheck2, Check, Flame } from "lucide-react"
import destinosFoto from "@/assets/photos/wingman-cockpit-dusk.webp"
import type { ActivityDay, LicenseRow } from "@/components/dashboard/tipos"
import { daysUntil } from "@/components/dashboard/plan"
import { TarjetaPanel } from "@/components/dashboard/ResumenPiloto"
import { ESTADO_VISUAL, textoDeEstado } from "@/components/dashboard/portada"
import { estadoDeDocumento, nombreDeDocumento } from "@/lib/licencias"

// ─── Próximos vencimientos ──────────────────────────────────────────────────

export function ProximosVencimientos({ documentos }: { documentos: LicenseRow[] }) {
  const lista = documentos
    .map((d) => {
      const dias = d.expires_date ? daysUntil(d.expires_date) : null
      return { d, dias, estado: estadoDeDocumento(dias) }
    })
    .sort((a, b) => (a.dias ?? 1e9) - (b.dias ?? 1e9))
    .slice(0, 4)
  return (
    <div className="flex min-w-0 flex-col rounded-2xl surface p-5">
      <div className="flex items-center gap-3">
        <CalendarDays className="h-5 w-5 shrink-0 text-foreground" aria-hidden />
        <h2 className="m-0 min-w-0 flex-1 text-[15px] font-semibold tracking-[-0.01em] text-foreground">Próximos vencimientos</h2>
        <Link to="/app/vencimientos" className="inline-flex shrink-0 items-center gap-1 text-[12.5px] font-semibold text-foreground">
          Ver todos <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
      {lista.length === 0 ? (
        <div className="mt-4 text-[13px] text-muted-foreground">
          Aún no registras documentos.{" "}
          <Link to="/app/vencimientos" className="font-semibold text-foreground underline underline-offset-2">
            Agrega tu licencia y tu médico
          </Link>{" "}
          y te avisamos antes de que venzan.
        </div>
      ) : (
        <ul className="m-0 mt-4 flex list-none flex-col gap-2.5 p-0">
          {lista.map(({ d, dias, estado }) => {
            const { icono: Icono, color } = ESTADO_VISUAL[estado]
            return (
              <li key={d.id} className="flex items-center gap-2.5 text-[13px]">
                <Icono className="h-4 w-4 shrink-0" style={{ color }} aria-hidden />
                <span className="min-w-0 flex-1 truncate text-foreground">{nombreDeDocumento(d)}</span>
                <span className="shrink-0 font-medium" style={{ color }}>
                  {textoDeEstado(estado, dias)}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

// ─── Racha ──────────────────────────────────────────────────────────────────

const DIAS = ["L", "M", "M", "J", "V", "S", "D"]

/** Fecha AAAA-MM-DD en Bogotá, que es con lo que la base cierra el día. */
function fechaBogota(d: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota", year: "numeric", month: "2-digit", day: "2-digit" }).format(d)
}

/** Los siete días de esta semana, de lunes a domingo, en Bogotá. */
function semanaActual(hoy = new Date()): string[] {
  const [y, m, d] = fechaBogota(hoy).split("-").map(Number)
  const base = new Date(Date.UTC(y, m - 1, d))
  const lunes = (base.getUTCDay() + 6) % 7
  return Array.from({ length: 7 }, (_, i) => {
    const f = new Date(base)
    f.setUTCDate(base.getUTCDate() - lunes + i)
    return f.toISOString().slice(0, 10)
  })
}

export function RachaDeEstudio({
  dias,
  enRiesgo,
  actividad,
}: {
  dias: number
  enRiesgo: boolean
  actividad: ActivityDay[]
}) {
  const conActividad = new Set(actividad.filter((a) => a.activities_count > 0).map((a) => a.date))
  const hoy = fechaBogota(new Date())
  const semana = semanaActual()
  return (
    <TarjetaPanel icon={Flame} titulo="Tu racha de estudio" to="/app/perfil">
      <div className="nh-display text-[30px] font-bold leading-none tracking-[-0.02em] text-foreground">
        {dias} {dias === 1 ? "día" : "días"}
      </div>
      <p className="m-0 mt-1.5 text-[12.5px]" style={{ color: enRiesgo ? "var(--av-warn-fg)" : "var(--muted-foreground)" }}>
        {dias === 0 ? "Estudia hoy para empezarla." : enRiesgo ? "Estudia hoy para no perderla." : "Sigue así."}
      </p>
      <ol className="m-0 mt-auto grid list-none grid-cols-7 gap-1 p-0 pt-4" aria-label="Días estudiados esta semana">
        {semana.map((f, i) => {
          const hecho = conActividad.has(f)
          const esHoy = f === hoy
          return (
            <li key={f} className="flex flex-col items-center gap-1.5">
              <span className="text-[11px] font-medium text-muted-foreground">{DIAS[i]}</span>
              <span
                className={`grid h-6 w-6 place-items-center rounded-full ${hecho ? "text-white" : esHoy ? "border-2 border-foreground" : "bg-muted"}`}
                style={hecho ? { background: "var(--av-success-fg)" } : undefined}
                aria-label={hecho ? "Estudiado" : esHoy ? "Hoy" : "Sin estudio"}
              >
                {hecho && <Check className="h-3.5 w-3.5" aria-hidden />}
              </span>
            </li>
          )
        })}
      </ol>
    </TarjetaPanel>
  )
}

// ─── Cifras ─────────────────────────────────────────────────────────────────

function Cifra({
  icon: Icon,
  rotulo,
  valor,
  nota,
  to,
}: {
  icon: typeof BarChart3
  rotulo: string
  valor: string
  nota: string
  to: string
}) {
  return (
    <Link to={to} className="group flex min-w-0 flex-1 items-center gap-3.5 rounded-2xl surface surface-lift px-4 py-3.5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-foreground">
        <Icon className="h-[18px] w-[18px]" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] text-muted-foreground">{rotulo}</span>
        <span className="flex items-baseline gap-2">
          <span className="nh-display text-[22px] font-bold leading-tight text-foreground">{valor}</span>
          <span className="truncate text-[12px] text-muted-foreground">{nota}</span>
        </span>
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  )
}

export function CifrasDeEstudio({ quizzes, actividad }: { quizzes: number; actividad: ActivityDay[] }) {
  const mes = fechaBogota(new Date()).slice(0, 7)
  const diasDelMes = actividad.filter((a) => a.date.startsWith(mes) && a.activities_count > 0).length
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <Cifra icon={BarChart3} rotulo="Quizzes respondidos" valor={String(quizzes)} nota="en total" to="/app/pca" />
      <Cifra icon={CalendarCheck2} rotulo="Días de estudio" valor={String(diasDelMes)} nota="este mes" to="/app/perfil" />
    </div>
  )
}

// ─── Grandes destinos ───────────────────────────────────────────────────────

export function TarjetaDestinos() {
  return (
    <div className="relative min-h-[190px] overflow-hidden rounded-2xl">
      <img src={destinosFoto} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(8,20,36,.9) 0%, rgba(8,20,36,.7) 55%, rgba(8,20,36,.35) 100%)" }}
      />
      <div className="relative flex h-full flex-col justify-center p-6">
        <p className="nh-display m-0 max-w-[260px] text-[20px] font-bold leading-snug tracking-[-0.02em] text-white">
          Grandes destinos requieren preparación.
        </p>
        <p className="m-0 mt-2 max-w-[260px] text-[13px] leading-relaxed text-white/78">Sigue construyendo la mejor versión de tu perfil.</p>
        <span aria-hidden className="mt-4 block h-px w-10 bg-white/50" />
      </div>
    </div>
  )
}
