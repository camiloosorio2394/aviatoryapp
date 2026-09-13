import type { UsernameStatus } from "@/components/perfil/tipos"

export function UsernameHelp({ status }: { status: UsernameStatus }) {
  switch (status.state) {
    case "invalid":
      return <p className="text-[12px] text-muted-foreground mt-1">{status.reason}</p>
    case "checking":
      return <p className="text-[12px] text-muted-foreground mt-1">Verificando disponibilidad…</p>
    case "available":
      return <p className="mt-1"><span className="chip chip-green">Disponible</span></p>
    case "taken":
      return <p className="mt-1"><span className="chip chip-red">Ese usuario ya está tomado</span></p>
    case "error":
      return (
        <p className="text-[12px] mt-1" style={{ color: "var(--av-danger-fg)" }}>
          No pudimos comprobar si está libre. Revisa tu conexión y vuelve a escribirlo.
        </p>
      )
    case "unchanged":
      return null
    default:
      return <p className="text-[12px] text-muted-foreground mt-1">3–30 caracteres, minúsculas, números o _</p>
  }
}
