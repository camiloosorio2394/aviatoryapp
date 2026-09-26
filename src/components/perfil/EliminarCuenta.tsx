import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"
import { appButtonClass } from "@/lib/buttonStyles"
import { borrarDatosDelPiloto } from "@/lib/datosLocales"
import { eliminarMiCuenta } from "@/services/cuenta"
import { cerrarSesionLocal } from "@/services/sesion"

const PALABRA = "ELIMINAR"

/**
 * Eliminar la cuenta desde el perfil.
 *
 * La política lo promete y la ley lo exige (supresión, Ley 1581, art. 8). Se
 * pide escribir la palabra para que no pase por un toque sin querer, y se dice
 * antes exactamente qué se borra. Al terminar se cierra la sesión en este
 * equipo y se vacía lo que quedó guardado en él.
 */
export function EliminarCuenta({ userId }: { userId: string }) {
  const navigate = useNavigate()
  const [abierto, setAbierto] = useState(false)
  const [palabra, setPalabra] = useState("")
  const [trabajando, setTrabajando] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)

  async function eliminar() {
    setTrabajando(true)
    setMensaje(null)
    const resultado = await eliminarMiCuenta(userId)
    if (resultado.estado === "eliminada") {
      await cerrarSesionLocal()
      borrarDatosDelPiloto()
      toast.success("Tu cuenta y tus datos se eliminaron.")
      navigate("/", { replace: true })
      return
    }
    setTrabajando(false)
    setMensaje(
      resultado.estado === "no_disponible"
        ? "Eliminar la cuenta desde aquí todavía no está activo. Escríbenos desde Contacto y la eliminamos en menos de 30 días."
        : resultado.mensaje,
    )
  }

  return (
    <section className="mt-6">
      <SectionTitle
        icon={Trash2}
        eyebrow="Tu cuenta"
        title="Eliminar mi cuenta"
        hint="Borra tu cuenta y todo lo tuyo. No se puede deshacer."
      />
      <div className="surface rounded-xl p-5">
        <p className="text-[15px] leading-relaxed text-muted-foreground max-w-[680px]">
          Se borran tu perfil, tu bitácora y sus respaldos, tus licencias y el certificado médico,
          tu progreso, tus intentos, tus mensajes en la comunidad, tus conversaciones con Wingman y
          tu foto. No se puede recuperar.
        </p>

        {!abierto ? (
          <button
            type="button"
            onClick={() => setAbierto(true)}
            className={appButtonClass({ variant: "secondary" }, "mt-4 cursor-pointer")}
          >
            Quiero eliminar mi cuenta
          </button>
        ) : (
          <div className="mt-4 max-w-[420px] space-y-3">
            <label className="block text-[14px] font-medium" htmlFor="confirmar-eliminacion">
              Escribe {PALABRA} para confirmar
            </label>
            <input
              id="confirmar-eliminacion"
              value={palabra}
              onChange={(e) => setPalabra(e.target.value)}
              autoComplete="off"
              className="h-11 w-full rounded-xl border border-input bg-transparent px-3 text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setAbierto(false)
                  setPalabra("")
                  setMensaje(null)
                }}
                disabled={trabajando}
                className={appButtonClass({ variant: "secondary" }, "cursor-pointer")}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => void eliminar()}
                disabled={palabra !== PALABRA || trabajando}
                className="inline-flex min-h-[40px] items-center rounded-xl bg-destructive px-4 text-[15px] font-semibold text-white disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                {trabajando ? "Eliminando…" : "Eliminar definitivamente"}
              </button>
            </div>
            {mensaje && (
              <p role="alert" className="text-[14px] text-foreground">
                {mensaje}{" "}
                {mensaje.includes("Contacto") && (
                  <Link to="/contact" className="underline">
                    Ir a Contacto
                  </Link>
                )}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
