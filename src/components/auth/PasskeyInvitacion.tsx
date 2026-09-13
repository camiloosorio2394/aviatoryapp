/**
 * Ofrece activar Face ID, Touch ID o huella, una vez que hay sesión.
 *
 * Es una oferta, no una puerta: quien diga «Ahora no» entra igual. La
 * contraseña sigue siendo el camino principal, y el passkey es el atajo para
 * no teclearla. Aviatory se paga, así que nada de esto puede dejar a un piloto
 * mirando un botón de «Salir».
 *
 * No se muestra si el navegador no trae WebAuthn, si no se puede saber si ya
 * hay un passkey (servidor sin la función, consulta caída) o si ya lo activó.
 * En cualquiera de esos casos pasa de largo sin pintar nada.
 */

import { useEffect, useState, type ReactNode } from "react"
import { Fingerprint, Loader2, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { registrarPasskey, soportaPasskeys, tienePasskey } from "@/services/passkeys"

/** Un «ahora no» dura una semana: se vuelve a ofrecer, sin insistir cada vez. */
const CLAVE_POSPUESTO = "aviatory.passkey.pospuesto"
const UNA_SEMANA = 7 * 24 * 60 * 60 * 1000

function estaPospuesto(): boolean {
  try {
    const guardado = localStorage.getItem(CLAVE_POSPUESTO)
    if (!guardado) return false
    const cuando = Number(guardado)
    return Number.isFinite(cuando) && Date.now() - cuando < UNA_SEMANA
  } catch {
    // Modo privado o almacenamiento lleno: mejor no ofrecer que ofrecer siempre.
    return true
  }
}

function posponer(): void {
  try {
    localStorage.setItem(CLAVE_POSPUESTO, String(Date.now()))
  } catch {
    /* sin almacenamiento, la oferta reaparece en el siguiente ingreso */
  }
}

export function PasskeyInvitacion({ children }: { children: ReactNode }) {
  // `null` mientras no se sabe: hasta entonces no se pinta la oferta, para que
  // la app no parpadee al entrar. Sin WebAuthn o con un «ahora no» reciente se
  // descarta de entrada, sin preguntarle nada al servidor.
  const [ofrecer, setOfrecer] = useState<boolean | null>(() =>
    soportaPasskeys() && !estaPospuesto() ? null : false,
  )
  const [activando, setActivando] = useState(false)

  useEffect(() => {
    if (ofrecer !== null) return
    let vigente = true
    void tienePasskey().then((tiene) => {
      // `null` es «no se sabe»: se pasa de largo. Es la parte de fallar abierto.
      if (vigente) setOfrecer(tiene === false)
    })
    return () => {
      vigente = false
    }
  }, [ofrecer])

  async function activar() {
    setActivando(true)
    const resultado = await registrarPasskey()
    if (resultado.ok) {
      toast.success("Listo: la próxima vez entras con Face ID o huella")
      setOfrecer(false)
    } else if (resultado.mensaje) {
      toast.error(resultado.mensaje)
    }
    setActivando(false)
  }

  function ahoraNo() {
    posponer()
    setOfrecer(false)
  }

  if (ofrecer !== true) return <>{children}</>

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm space-y-5 text-center">
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ background: "color-mix(in oklab, var(--av-blue-500) 12%, transparent)" }}
        >
          <Fingerprint className="h-8 w-8" style={{ color: "var(--av-blue-500)" }} />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-[22px] font-semibold tracking-[-0.02em]">Entra sin escribir la clave</h1>
          <p className="text-[15px] leading-[1.55] text-muted-foreground">
            Activa Face ID o tu huella y la próxima vez entras de un toque. Tu contraseña sigue
            funcionando igual, por si cambias de teléfono.
          </p>
        </div>

        <Button
          size="lg"
          className="h-12 w-full rounded-full text-[15px] font-medium"
          onClick={activar}
          disabled={activando}
        >
          {activando ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <ShieldCheck className="h-5 w-5" />
          )}
          Activar Face ID o huella
        </Button>

        <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={ahoraNo}>
          Ahora no
        </Button>
      </div>
    </main>
  )
}
