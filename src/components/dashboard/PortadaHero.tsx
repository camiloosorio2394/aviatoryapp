import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import heroFoto from "@/assets/photos/cta-cockpit-dawn.jpg"
import { greetingTime } from "@/components/dashboard/plan"

/** Lo que el panel le propone como siguiente paso. Sale de sus datos, no de una lista fija. */
export interface ProximoObjetivo {
  titulo: string
  detalle: string
  to: string
}

/** «Jueves, 25 de septiembre de 2026», en la hora de Bogotá. */
function fechaDeHoy(): string {
  const f = new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date())
  return f.charAt(0).toUpperCase() + f.slice(1)
}

/**
 * La portada del panel: el saludo, la frase de la casa y el próximo objetivo.
 *
 * La foto va a sangre bajo un velo navy que oscurece la izquierda, donde va el
 * texto, y deja respirar la derecha. El objetivo va en la tarjeta de cristal
 * de las portadas de módulo, con una sola acción.
 */
export function PortadaHero({
  nombre,
  objetivo,
  avisos = [],
}: {
  nombre: string
  objetivo: ProximoObjetivo
  /** Lo que tiene fecha (el examen, la prueba gratuita). `aviso` lo pone en ámbar. */
  avisos?: { texto: string; aviso: boolean }[]
}) {
  return (
    <section className="relative overflow-hidden rounded-[18px] shadow-[0_1px_2px_rgba(11,27,48,0.08)]">
      <img
        src={heroFoto}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center 30%" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(8,20,36,.92) 0%, rgba(8,20,36,.78) 45%, rgba(8,20,36,.45) 75%, rgba(8,20,36,.35) 100%)",
        }}
      />
      <div className="relative grid gap-6 px-6 py-7 sm:px-10 sm:py-9 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,400px)] @4xl:items-end">
        <div className="min-w-0">
          <h1 className="titular m-0 text-[34px] font-semibold leading-[1.05] text-white sm:text-[44px] @5xl:text-[54px]">
            {greetingTime()}, {nombre}.
          </h1>
          <p className="m-0 mt-3 text-[16px] font-medium text-white/88 sm:text-[17px]">Disciplina hoy, cabina mañana.</p>
          <span aria-hidden className="mt-5 block h-px w-14 bg-white/45" />
          <p className="titular m-0 mt-4 text-[17px] italic text-white/80">“A higher standard, a safer sky.”</p>
        </div>

        <div className="flex min-w-0 flex-col gap-3 @4xl:items-end">
          <span className="text-[13px] font-medium text-white/80 @4xl:text-right">{fechaDeHoy()}</span>
          {avisos.length > 0 && (
            <span className="flex flex-wrap gap-2 @4xl:justify-end">
              {avisos.map((a) => (
                <span
                  key={a.texto}
                  className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[11.5px] font-semibold"
                  style={{ color: a.aviso ? "var(--av-amber-400)" : "rgb(255 255 255 / 85%)" }}
                >
                  {a.texto}
                </span>
              ))}
            </span>
          )}
          <Link
            to={objetivo.to}
            className="group flex w-full items-center justify-between gap-4 rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.58)] p-4 backdrop-blur-[6px] transition-colors hover:bg-[rgba(6,17,31,0.7)] sm:p-5"
          >
            <span className="min-w-0">
              <span className="versalitas block text-[10px] text-white/70">
                Tu próximo objetivo
              </span>
              <span className="titular mt-1.5 block text-[21px] font-semibold leading-snug text-white">{objetivo.titulo}</span>
              <span className="mt-1 block text-[13px] text-white/75">{objetivo.detalle}</span>
            </span>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/12 text-white transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
