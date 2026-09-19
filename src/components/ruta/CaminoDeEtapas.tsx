import { Check } from "lucide-react"
import { STAGE_LABEL } from "@/components/dashboard/plan"
import { ORDEN_DE_ETAPAS } from "@/lib/miRuta"
import type { PilotStage } from "@/services/ruta"

/**
 * Las siete etapas de la carrera, con la del piloto marcada.
 *
 * Antes era un carril de círculos de 50 px con las etapas pasadas en verde y
 * un ancho mínimo de 640 px que en el teléfono obligaba a desplazarse de lado.
 * El verde en esta app es acierto, y haber pasado una etapa no es acertar
 * nada: lo recorrido va en tinta con su marca, la etapa actual en el azul de
 * la app y lo que viene en contorno.
 *
 * En el teléfono no caben siete nombres: quedan los siete nudos, y debajo, en
 * una línea, dónde estás y qué viene después. Los nombres siguen ahí para los
 * lectores de pantalla.
 */
export function CaminoDeEtapas({ etapa }: { etapa: PilotStage }) {
  const actual = ORDEN_DE_ETAPAS.indexOf(etapa)
  const despues = ORDEN_DE_ETAPAS[actual + 1]

  return (
    <div className="rounded-2xl surface px-4 py-5 sm:px-6 [--ruta-acento:var(--av-blue-500)] dark:[--ruta-acento:var(--av-blue-400)]">
      <ol className="m-0 grid list-none grid-cols-7 p-0">
        {ORDEN_DE_ETAPAS.map((s, i) => {
          const recorrida = i < actual
          const aqui = i === actual
          return (
            <li
              key={s}
              aria-current={aqui ? "step" : undefined}
              className="relative flex min-w-0 flex-col items-center text-center"
            >
              {/* El tramo hasta la etapa siguiente: de centro a centro, sin
                  pisar los nudos. */}
              {i < ORDEN_DE_ETAPAS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[calc(50%+17px)] right-[calc(-50%+17px)] top-[13px] h-0.5 rounded-full"
                  style={{
                    background: recorrida
                      ? "var(--foreground)"
                      : "color-mix(in oklab, var(--foreground) 16%, transparent)",
                  }}
                />
              )}
              <span
                aria-hidden
                className="tabular relative grid h-7 w-7 place-items-center rounded-full text-[12px] font-semibold"
                style={
                  recorrida
                    ? { background: "var(--foreground)", color: "var(--background)" }
                    : aqui
                      ? {
                          background: "var(--ruta-acento)",
                          color: "#fff",
                          boxShadow: "0 0 0 4px color-mix(in oklab, var(--ruta-acento) 22%, transparent)",
                        }
                      : {
                          border: "1.5px solid color-mix(in oklab, var(--foreground) 45%, transparent)",
                          color: "var(--muted-foreground)",
                        }
                }
              >
                {recorrida ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
              </span>
              <span
                className={`sr-only mt-2.5 px-1 text-[12.5px] leading-snug @2xl:not-sr-only @2xl:block ${
                  aqui ? "font-semibold text-foreground" : recorrida ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {STAGE_LABEL[s]}
                <span className="sr-only">
                  {recorrida ? ", recorrida" : aqui ? ", estás aquí" : ", por delante"}
                </span>
              </span>
              {aqui && (
                <span
                  aria-hidden
                  className="nh-display mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.14em] @2xl:block"
                  style={{ color: "color-mix(in oklab, var(--ruta-acento) 70%, var(--foreground))" }}
                >
                  Estás aquí
                </span>
              )}
            </li>
          )
        })}
      </ol>

      <p aria-hidden className="m-0 mt-4 text-center text-[13px] leading-snug text-muted-foreground @2xl:hidden">
        Estás en <strong className="font-semibold text-foreground">{STAGE_LABEL[etapa]}</strong>
        {despues && <> · Después: {STAGE_LABEL[despues]}</>}
      </p>
    </div>
  )
}
