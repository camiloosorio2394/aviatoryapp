import { Loader2 } from "lucide-react"
import { UserAvatar } from "@/components/UserAvatar"
import { IdField } from "@/components/perfil/IdField"
import { STAGES } from "@/components/perfil/datos"
import type { Stage } from "@/components/perfil/tipos"

export function PilotIdCard({
  photoUrl,
  username,
  fullName,
  email,
  totalH,
  picH,
  icao,
  targetAirline,
  stage,
  uploading,
}: {
  photoUrl: string | null
  username: string
  fullName: string
  email?: string
  totalH: number
  picH: number
  icao: number | null
  targetAirline: string
  stage: Stage | ""
  uploading: boolean
}) {
  const stageLabel = stage ? STAGES.find((s) => s.value === stage)?.label ?? "—" : "—"
  const fmt = (h: number) => (h % 1 === 0 ? String(h) : h.toFixed(1))
  return (
    <div className="rounded-2xl surface p-6 overflow-hidden h-fit">
      <div className="text-[13px] font-semibold" style={{ color: "var(--av-blue-500)" }}>
        Aviatory · Pilot ID
      </div>
      <div className="mt-4 flex items-center gap-3.5">
        <div className="relative">
          <UserAvatar
            photoUrl={photoUrl}
            username={username}
            fullName={fullName}
            email={email}
            size="xl"
            ring
            className="!h-16 !w-16 !text-xl"
          />
          {uploading && (
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            </div>
          )}
        </div>
        <div>
          <div className="text-xl font-semibold tracking-[-0.025em] text-foreground">
            {fullName || username || "Tu nombre"}
          </div>
          <div className="text-[12px] text-muted-foreground">
            {username ? `@${username}` : email} · {stageLabel}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-4">
        <IdField label="Horas totales" value={`${fmt(totalH)} h`} />
        <IdField label="Horas PIC" value={`${fmt(picH)} h`} />
        <IdField label="ICAO" value={icao != null ? `Nivel ${icao}` : "Sin evaluar"} />
        <IdField label="Objetivo" value={targetAirline || "—"} />
      </div>
    </div>
  )
}
