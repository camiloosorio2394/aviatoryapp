import { useRef, useState } from "react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { appButtonClass, appButtonStyle } from "@/lib/buttonStyles"
import {
  pedirVerificacion,
  retirarVerificacion,
  TIPOS_DE_EVIDENCIA,
  type VerificacionDeHoras,
} from "@/services/verificacionHoras"

/**
 * Pedir que Aviatory verifique las horas de carrera.
 *
 * El piloto sube la página de totales de su bitácora (foto o PDF) y alguien de
 * Aviatory la revisa. Él no puede darse por verificado: la base solo le deja
 * crear la solicitud y retirarla mientras siga pendiente.
 *
 * El sello guarda las horas del día en que se revisó. Si el piloto sigue
 * volando, el sello deja de cubrir su total y aquí se dice, en vez de mostrar
 * un «verificado» que ya no es cierto: ese es todo el valor del sello frente a
 * una aerolínea.
 */
export function VerificacionHoras({
  userId,
  totalCarrera,
  picCarrera,
  verificacion,
  alCambiar,
}: {
  userId: string
  totalCarrera: number | null
  picCarrera: number | null
  verificacion: VerificacionDeHoras | null
  alCambiar: () => void
}) {
  const entrada = useRef<HTMLInputElement>(null)
  const [archivo, setArchivo] = useState<File | null>(null)
  const [nota, setNota] = useState("")
  const [enviando, setEnviando] = useState(false)

  const pendiente = verificacion?.estado === "pendiente"
  const sellada = verificacion?.estado === "verificada"
  const alDia = sellada && verificacion.cubreLoDeclarado
  const sinHoras = totalCarrera === null || totalCarrera <= 0

  async function enviar() {
    if (!archivo || totalCarrera === null) return
    setEnviando(true)
    try {
      await pedirVerificacion(userId, archivo, { total: totalCarrera, pic: picCarrera ?? 0 }, nota.trim() || null)
      setArchivo(null)
      setNota("")
      toast.success("Solicitud enviada. Te avisamos cuando la revisemos.")
      alCambiar()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No pudimos enviar la solicitud.")
    } finally {
      setEnviando(false)
    }
  }

  async function retirar() {
    setEnviando(true)
    try {
      await retirarVerificacion()
      toast.success("Solicitud retirada.")
      alCambiar()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No pudimos retirar la solicitud.")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="rounded-xl surface px-4 py-4 space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-semibold text-foreground">Verificación de horas</span>
        <span className="text-[13px] text-muted-foreground">{rotulo(verificacion)}</span>
      </div>

      {alDia && (
        <p className="m-0 text-[13px] text-muted-foreground">
          Tus {verificacion.horasTotal.toFixed(1)} h quedaron verificadas el {fecha(verificacion.revisadoEn)}. Tu hoja
          de vida lo muestra.
        </p>
      )}

      {sellada && !verificacion.cubreLoDeclarado && (
        <p className="m-0 text-[13px] text-muted-foreground">
          Verificamos {verificacion.horasTotal.toFixed(1)} h el {fecha(verificacion.revisadoEn)}. Desde entonces
          sumaste horas, así que tu hoja de vida vuelve a decir «declarado». Puedes pedir que verifiquemos el total
          nuevo.
        </p>
      )}

      {verificacion?.estado === "rechazada" && (
        <p className="m-0 text-[13px] text-muted-foreground">
          No pudimos verificar la última solicitud. Puedes volver a intentarlo con una foto donde se lea la página de
          totales completa.
        </p>
      )}

      {pendiente ? (
        <>
          <p className="m-0 text-[13px] text-muted-foreground">
            Estamos revisando las {verificacion.horasTotal.toFixed(1)} h que enviaste.
          </p>
          <button
            type="button"
            onClick={retirar}
            disabled={enviando}
            className={appButtonClass({ variant: "secondary" }, "cursor-pointer")}
          >
            Retirar solicitud
          </button>
        </>
      ) : (
        <>
          {/* La invitación solo cuando no hay nada sellado: con el sello puesto
              ya lo explica el párrafo de arriba. */}
          {!archivo && !sellada && (
            <p className="m-0 text-[13px] text-muted-foreground">
              Sube una foto o un PDF de la página de totales de tu bitácora y alguien de Aviatory la revisa.
            </p>
          )}
          <input
            ref={entrada}
            type="file"
            accept={TIPOS_DE_EVIDENCIA.join(",")}
            className="hidden"
            onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
          />
          {archivo ? (
            <div className="space-y-3">
              <p className="m-0 text-[13px] text-muted-foreground break-all">
                {archivo.name} · verificaremos {totalCarrera?.toFixed(1)} h
              </p>
              <Input
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                placeholder="Algo que debamos saber (opcional)"
                className="h-11 rounded-xl"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={enviar}
                  disabled={enviando}
                  className={appButtonClass({}, "cursor-pointer")}
                  style={appButtonStyle()}
                >
                  Enviar a revisión
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setArchivo(null)
                    setNota("")
                    if (entrada.current) entrada.current.value = ""
                  }}
                  disabled={enviando}
                  className={appButtonClass({ variant: "secondary" }, "cursor-pointer")}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => entrada.current?.click()}
              disabled={sinHoras}
              className={appButtonClass({ variant: "secondary" }, "cursor-pointer")}
            >
              {sellada ? "Verificar el total nuevo" : "Verificar mis horas"}
            </button>
          )}
          {sinHoras && (
            <p className="m-0 text-[13px] text-muted-foreground">
              Primero anota tus horas o registra vuelos en la bitácora.
            </p>
          )}
        </>
      )}
    </div>
  )
}

/** El rótulo corto de la derecha: el estado en una palabra. */
function rotulo(v: VerificacionDeHoras | null): string {
  if (!v) return "Sin verificar"
  if (v.estado === "pendiente") return "En revisión"
  if (v.estado === "verificada") return v.cubreLoDeclarado ? "Verificado" : "Verificado en parte"
  if (v.estado === "rechazada") return "No verificada"
  return "Sin verificar"
}

/** Día y mes de un instante del servidor, para leerlo en una línea. */
function fecha(iso: string | null): string {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })
}
