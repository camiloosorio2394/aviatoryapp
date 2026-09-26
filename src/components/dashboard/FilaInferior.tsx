import { Link } from "react-router-dom"
import { ArrowRight, Check } from "lucide-react"
import destinosFoto from "@/assets/photos/wingman-cockpit-dusk.webp"
import type { ActivityDay } from "@/components/dashboard/tipos"
import { Cifra, TarjetaDato } from "@/components/dashboard/ResumenPiloto"

/**
 * La constancia: la racha de la semana, dos cifras de estudio y la tarjeta de
 * cierre. «Próximos vencimientos» salió de aquí (26-sep-2026): repetía lo que
 * ya dice la tarjeta de Documentación, que lleva a la misma pantalla.
 */

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
    <TarjetaDato titulo="Tu racha de estudio" to="/app/logros">
      <Cifra valor={String(dias)} unidad={dias === 1 ? "día" : "días"} />
      <p className="m-0 mt-2 text-[12.5px]" style={{ color: enRiesgo ? "var(--av-warn-fg)" : "var(--muted-foreground)" }}>
        {dias === 0 ? "Estudia hoy para empezarla." : enRiesgo ? "Estudia hoy para no perderla." : "Sigue así."}
      </p>
      <ol className="m-0 mt-auto grid list-none grid-cols-7 gap-1 p-0 pt-5" aria-label="Días estudiados esta semana">
        {semana.map((f, i) => {
          const hecho = conActividad.has(f)
          const esHoy = f === hoy
          return (
            <li key={f} className="flex flex-col items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground">{DIAS[i]}</span>
              <span
                className={`grid h-6 w-6 place-items-center rounded-full ${hecho ? "text-white" : esHoy ? "border border-foreground/60" : "bg-muted"}`}
                style={hecho ? { background: "var(--av-success-fg)" } : undefined}
                aria-label={hecho ? "Estudiado" : esHoy ? "Hoy" : "Sin estudio"}
              >
                {hecho && <Check className="h-3.5 w-3.5" aria-hidden />}
              </span>
            </li>
          )
        })}
      </ol>
    </TarjetaDato>
  )
}

// ─── Cifras ─────────────────────────────────────────────────────────────────

function CifraEnlace({ rotulo, valor, nota, to }: { rotulo: string; valor: string; nota: string; to: string }) {
  return (
    <Link to={to} className="group surface surface-lift flex min-w-0 flex-1 items-center gap-4 rounded-2xl px-5 py-4">
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] text-foreground/80">{rotulo}</span>
        <span className="mt-1.5 flex items-baseline gap-2">
          <span className="cifra text-[24px] leading-none text-foreground">{valor}</span>
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
    <div className="flex min-w-0 flex-col gap-4">
      <CifraEnlace rotulo="Quizzes respondidos" valor={String(quizzes)} nota="en total" to="/app/pca" />
      <CifraEnlace rotulo="Días de estudio" valor={String(diasDelMes)} nota="este mes" to="/app/logros" />
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
        <p className="titular m-0 max-w-[280px] text-[22px] font-medium leading-snug text-white">
          Grandes destinos requieren preparación.
        </p>
        <p className="m-0 mt-2 max-w-[260px] text-[13px] leading-relaxed text-white/78">Sigue construyendo la mejor versión de tu perfil.</p>
        <span aria-hidden className="mt-4 block h-px w-10 bg-white/50" />
      </div>
    </div>
  )
}
