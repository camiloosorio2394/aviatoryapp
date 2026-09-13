import { Check, Loader2, X } from "lucide-react"
import type { UsernameStatus } from "@/components/perfil/tipos"

export function UsernameIcon({ status }: { status: UsernameStatus }) {
  switch (status.state) {
    case "checking":
      return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
    case "available":
      return <Check className="h-4 w-4" style={{ color: "var(--av-green-400)" }} />
    case "taken":
    case "invalid":
      return <X className="h-4 w-4" style={{ color: "var(--av-red-400)" }} />
    default:
      return null
  }
}
