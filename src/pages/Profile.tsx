import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { toast } from "sonner"
import { AtSign, Camera, Check, Loader2, Save, Trash2, X, Radar, Settings, User as UserIcon } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserAvatar } from "@/components/UserAvatar"
import { PageHeader } from "@/components/ui/page-header"
import { SectionTitle } from "@/components/ui/section-title"

const USERNAME_REGEX = /^[a-z0-9_]{3,30}$/

type UsernameStatus =
  | { state: "idle" }
  | { state: "unchanged" }
  | { state: "invalid"; reason: string }
  | { state: "checking" }
  | { state: "available" }
  | { state: "taken" }

type Stage =
  | "student_ppl"
  | "ppl"
  | "cpl_in_progress"
  | "cpl_ready"
  | "hour_building"
  | "airline_candidate"

const STAGES: { value: Stage; label: string }[] = [
  { value: "student_ppl", label: "Estudiante PPL" },
  { value: "ppl", label: "PPL emitido" },
  { value: "cpl_in_progress", label: "Cursando CPL" },
  { value: "cpl_ready", label: "CPL emitido" },
  { value: "hour_building", label: "Hour building" },
  { value: "airline_candidate", label: "Candidato a aerolínea" },
]

const LICENSES = ["PPL", "CPL", "IFR", "MEP", "ATPL"] as const

export function Profile() {
  const { user } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fullName, setFullName] = useState("")
  const [country, setCountry] = useState("")
  const [username, setUsername] = useState("")
  const [originalUsername, setOriginalUsername] = useState("")
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>({ state: "idle" })
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [stage, setStage] = useState<Stage | "">("")
  const [totalHours, setTotalHours] = useState("")
  const [hoursPic, setHoursPic] = useState("")
  const [icao, setIcao] = useState("")
  const [targetAirline, setTargetAirline] = useState("")
  const [licenses, setLicenses] = useState<string[]>([])

  useEffect(() => {
    if (!user) return
    let cancelled = false
    async function load() {
      try {
        const [profileRes, pilotRes] = await Promise.all([
          supabase.from("profiles").select("full_name, country, username, photo_url").eq("id", user!.id).maybeSingle(),
          supabase.from("pilot_state").select("*").eq("user_id", user!.id).maybeSingle(),
        ])
        if (cancelled) return
        if (profileRes.data) {
          const p = profileRes.data as { full_name?: string; country?: string; username?: string; photo_url?: string }
          setFullName(p.full_name ?? "")
          setCountry(p.country ?? "")
          setUsername(p.username ?? "")
          setOriginalUsername(p.username ?? "")
          setUsernameStatus(p.username ? { state: "unchanged" } : { state: "idle" })
          setPhotoUrl(p.photo_url ?? null)
        }
        if (pilotRes.data) {
          const p = pilotRes.data as { stage?: Stage; total_hours?: number; hours_pic?: number; icao_english_level?: number; target_airline?: string; licenses?: string[] }
          setStage(p.stage ?? "")
          setTotalHours(p.total_hours?.toString() ?? "")
          setHoursPic(p.hours_pic?.toString() ?? "")
          setIcao(p.icao_english_level?.toString() ?? "")
          setTargetAirline(p.target_airline ?? "")
          setLicenses(p.licenses ?? [])
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "No pudimos cargar tu perfil")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [user])

  const checkTimer = useRef<number | undefined>(undefined)
  useEffect(() => {
    if (username === originalUsername) {
      setUsernameStatus({ state: "unchanged" })
      return
    }
    if (!username) {
      setUsernameStatus({ state: "idle" })
      return
    }
    if (!USERNAME_REGEX.test(username)) {
      setUsernameStatus({ state: "invalid", reason: "3–30 caracteres, minúsculas, números o _" })
      return
    }
    setUsernameStatus({ state: "checking" })
    window.clearTimeout(checkTimer.current)
    checkTimer.current = window.setTimeout(async () => {
      const { data } = await supabase.rpc("check_username_available", { p_username: username })
      setUsernameStatus({ state: data ? "available" : "taken" })
    }, 400)
    return () => window.clearTimeout(checkTimer.current)
  }, [username, originalUsername])

  const usernameOK = usernameStatus.state === "unchanged" || usernameStatus.state === "available"

  async function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !user) return
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen es demasiado pesada (máx 5MB)")
      e.target.value = ""
      return
    }
    const ext = (file.name.split(".").pop() ?? "png").toLowerCase()
    if (!["png", "jpg", "jpeg", "webp"].includes(ext)) {
      toast.error("Formato no permitido. Usa PNG, JPG o WebP.")
      e.target.value = ""
      return
    }
    setUploading(true)
    try {
      const path = `${user.id}/avatar.${ext}`
      const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true, cacheControl: "0", contentType: file.type })
      if (upErr) throw upErr
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path)
      const finalUrl = `${urlData.publicUrl}?v=${Date.now()}`
      const { error: dbErr } = await supabase.from("profiles").update({ photo_url: finalUrl }).eq("id", user.id)
      if (dbErr) throw dbErr
      setPhotoUrl(finalUrl)
      toast.success("Tu foto se actualizó ✨")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No pudimos subir tu foto")
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  async function handleAvatarRemove() {
    if (!user || !photoUrl) return
    setUploading(true)
    try {
      for (const ext of ["png", "jpg", "jpeg", "webp"]) {
        await supabase.storage.from("avatars").remove([`${user.id}/avatar.${ext}`])
      }
      const { error } = await supabase.from("profiles").update({ photo_url: null }).eq("id", user.id)
      if (error) throw error
      setPhotoUrl(null)
      toast.success("Foto eliminada")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No pudimos eliminar")
    } finally {
      setUploading(false)
    }
  }

  async function handleSave() {
    if (!user) return
    if (!usernameOK) {
      toast.error("Tu usuario no está disponible o no es válido")
      return
    }
    setSaving(true)
    try {
      const [pRes, sRes] = await Promise.all([
        supabase.from("profiles").update({ full_name: fullName || null, country: country || null, username: username || null }).eq("id", user.id),
        supabase.from("pilot_state").upsert({
          user_id: user.id,
          stage: stage || null,
          total_hours: totalHours ? Number(totalHours) : null,
          hours_pic: hoursPic ? Number(hoursPic) : null,
          icao_english_level: icao ? Number(icao) : null,
          target_airline: targetAirline || null,
          licenses,
          updated_at: new Date().toISOString(),
        }),
      ])
      if (pRes.error) throw pRes.error
      if (sRes.error) throw sRes.error
      setOriginalUsername(username)
      setUsernameStatus({ state: "unchanged" })
      toast.success("Perfil actualizado ✈️")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No pudimos guardar")
    } finally {
      setSaving(false)
    }
  }

  function toggleLicense(lic: string) {
    setLicenses((prev) => (prev.includes(lic) ? prev.filter((l) => l !== lic) : [...prev, lic]))
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="p-8 max-w-2xl mx-auto animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-12 bg-muted rounded-xl" />
          <div className="h-12 bg-muted rounded-xl" />
          <div className="h-12 bg-muted rounded-xl" />
        </div>
      </AppLayout>
    )
  }

  // Build skill radar from pilot_state (very simple: derive from hours, icao, etc — placeholder for real data)
  const totalH = Number(totalHours) || 0
  const picH = Number(hoursPic) || 0
  const icaoLevel = Number(icao) || 0
  const skills = [
    { label: "Horas", value: Math.min(100, (totalH / 1500) * 100) },
    { label: "PIC", value: Math.min(100, (picH / 1000) * 100) },
    { label: "ICAO", value: (icaoLevel / 6) * 100 },
    { label: "Licencias", value: (licenses.length / 5) * 100 },
    { label: "Cross-country", value: Math.min(100, (totalH / 1000) * 50) },
    { label: "Recurrencia", value: 60 },
  ]

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <PageHeader eyebrow="MI PERFIL" title="Tu identidad como piloto" subtitle="Tu data del perfil de piloto. Aviatory la usa para calcular tu progreso y plan." />

        <div className="grid gap-5" style={{ gridTemplateColumns: "360px 1fr" }}>
          {/* Pilot ID card */}
          <PilotIdCard
            photoUrl={photoUrl}
            username={username}
            fullName={fullName}
            email={user?.email}
            totalH={totalH}
            picH={picH}
            icao={icaoLevel}
            targetAirline={targetAirline}
            stage={stage as Stage | ""}
            uploading={uploading}
          />

          {/* Skills radar + Settings */}
          <div className="flex flex-col gap-5">
            <div className="rounded-xl border border-border bg-card p-6">
              <SectionTitle icon={Radar} eyebrow="Tu mapa de habilidades" title="Mastery por dimensión" />
              <div className="grid items-center gap-7 mt-4" style={{ gridTemplateColumns: "auto 1fr" }}>
                <SkillsRadar skills={skills} />
                <div className="flex flex-col gap-2">
                  {skills.map((s) => (
                    <div key={s.label} className="grid items-center gap-3" style={{ gridTemplateColumns: "110px 1fr 40px" }}>
                      <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
                      <div className="relative h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${s.value}%`,
                            background: "linear-gradient(90deg, var(--av-cyan-400), var(--av-cyan-300))",
                          }}
                        />
                      </div>
                      <span className="mono tabular-nums text-[11px] font-semibold text-foreground text-right">
                        {Math.round(s.value)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-5">
              <SectionTitle icon={UserIcon} eyebrow="Identidad" title="Datos públicos y privados" />
              <div className="space-y-4">
                <Field label="Tu foto">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <UserAvatar
                        photoUrl={photoUrl}
                        username={username}
                        fullName={fullName}
                        email={user?.email}
                        size="xl"
                        ring
                        className="!h-20 !w-20 !text-2xl"
                      />
                      {uploading && (
                        <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                          <Loader2 className="h-5 w-5 animate-spin text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-2 flex-wrap">
                        <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="rounded-full h-9">
                          <Camera className="h-3.5 w-3.5" />
                          {photoUrl ? "Cambiar foto" : "Subir foto"}
                        </Button>
                        {photoUrl && (
                          <Button type="button" variant="ghost" size="sm" onClick={handleAvatarRemove} disabled={uploading} className="rounded-full h-9 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30">
                            <Trash2 className="h-3.5 w-3.5" /> Eliminar
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">JPG, PNG o WebP · Máx 5MB · Cuadrada se ve mejor</p>
                      <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={handleAvatarChange} className="hidden" />
                    </div>
                  </div>
                </Field>

                <Field label="Email">
                  <Input value={user?.email ?? ""} disabled className="h-11 rounded-xl" />
                </Field>
                <Field label="Usuario (público en la comunidad)">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <AtSign className="h-4 w-4" />
                    </span>
                    <Input
                      value={username}
                      onChange={(e) =>
                        setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 30))
                      }
                      placeholder="capi_juanma"
                      className="h-11 rounded-xl pl-9 pr-11 mono"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      <UsernameIcon status={usernameStatus} />
                    </span>
                  </div>
                  <UsernameHelp status={usernameStatus} />
                </Field>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Nombre completo (privado)">
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Juan Manuel Pérez" className="h-11 rounded-xl" />
                  </Field>
                  <Field label="País">
                    <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Colombia" className="h-11 rounded-xl" />
                  </Field>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 space-y-5">
              <SectionTitle icon={Settings} eyebrow="Tu carrera" title="Estado de piloto" />
              <div className="space-y-4">
                <Field label="Etapa actual">
                  <Select value={stage} onValueChange={(v) => setStage(v as Stage)}>
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue placeholder="Elige una etapa" />
                    </SelectTrigger>
                    <SelectContent>
                      {STAGES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Horas totales">
                    <Input type="number" value={totalHours} onChange={(e) => setTotalHours(e.target.value)} className="h-11 rounded-xl mono tabular-nums" />
                  </Field>
                  <Field label="Horas PIC">
                    <Input type="number" value={hoursPic} onChange={(e) => setHoursPic(e.target.value)} className="h-11 rounded-xl mono tabular-nums" />
                  </Field>
                </div>
                <Field label="Licencias">
                  <div className="flex flex-wrap gap-2">
                    {LICENSES.map((lic) => {
                      const active = licenses.includes(lic)
                      return (
                        <button
                          key={lic}
                          type="button"
                          onClick={() => toggleLicense(lic)}
                          className="px-4 py-2 rounded-full text-sm font-semibold border transition-all"
                          style={active ? {
                            background: "var(--av-blue-500)",
                            borderColor: "var(--av-blue-500)",
                            color: "white",
                            boxShadow: "0 4px 12px -2px color-mix(in oklab, var(--av-blue-500) 40%, transparent)",
                          } : {
                            borderColor: "var(--border)",
                            background: "var(--card)",
                          }}
                        >
                          {lic}
                        </button>
                      )
                    })}
                  </div>
                </Field>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Inglés ICAO">
                    <Select value={icao} onValueChange={setIcao}>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            Nivel {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Aerolínea objetivo">
                    <Input value={targetAirline} onChange={(e) => setTargetAirline(e.target.value)} placeholder="Avianca, LATAM, Wingo…" className="h-11 rounded-xl" />
                  </Field>
                </div>
              </div>

              <Button
                onClick={handleSave}
                disabled={saving || !usernameOK}
                size="lg"
                className="rounded-full h-12 px-6 border-0 text-white disabled:opacity-50"
                style={{
                  background: "linear-gradient(180deg, var(--av-blue-400) 0%, var(--av-blue-500) 100%)",
                  boxShadow: "0 8px 20px -6px oklch(0.55 0.22 264 / 45%)",
                }}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Guardando…
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" /> Guardar cambios
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

function PilotIdCard({
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
  icao: number
  targetAirline: string
  stage: Stage | ""
  uploading: boolean
}) {
  const stageLabel = stage ? STAGES.find((s) => s.value === stage)?.label ?? "—" : "—"
  return (
    <div
      className="rounded-xl border p-6 relative overflow-hidden text-white"
      style={{
        background: "linear-gradient(160deg, var(--av-navy-900) 0%, var(--av-navy-950) 100%)",
        borderColor: "oklch(0.32 0.04 250 / 0.6)",
        boxShadow: "var(--shadow-navy)",
      }}
    >
      <div className="cockpit-grid absolute inset-0 opacity-30" />
      <div className="relative">
        <div className="mono text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--av-cyan-300)" }}>
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
            <div className="text-xl font-extrabold tracking-[-0.025em]">
              {fullName || username || "Tu nombre"}
            </div>
            <div className="mono text-xs" style={{ color: "oklch(0.78 0.02 250)" }}>
              {username ? `@${username}` : email} · {stageLabel}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <IdField label="Horas totales" value={`${totalH} h`} />
          <IdField label="Horas PIC" value={`${picH} h`} />
          <IdField label="ICAO" value={icao ? `Nivel ${icao}` : "—"} />
          <IdField label="Objetivo" value={targetAirline || "—"} />
        </div>
      </div>
    </div>
  )
}

function IdField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        className="mono text-[9px] uppercase tracking-[0.12em] font-bold"
        style={{ color: "oklch(0.6 0.02 250)" }}
      >
        {label}
      </div>
      <div className="mono tabular-nums mt-0.5 text-sm font-bold text-white tracking-[-0.02em]">
        {value}
      </div>
    </div>
  )
}

function SkillsRadar({ skills }: { skills: { label: string; value: number }[] }) {
  const N = skills.length
  const cx = 100, cy = 100, r = 80
  const polar = (v: number, i: number) => {
    const angle = (i / N) * Math.PI * 2 - Math.PI / 2
    const rr = (v / 100) * r
    return [cx + rr * Math.cos(angle), cy + rr * Math.sin(angle)] as [number, number]
  }
  const pts = skills.map((s, i) => polar(s.value, i))

  return (
    <svg width={200} height={200} viewBox="0 0 200 200">
      {[0.25, 0.5, 0.75, 1].map((rr) => (
        <circle key={rr} cx={cx} cy={cy} r={r * rr} fill="none" stroke="var(--border)" strokeWidth={1} strokeDasharray={rr === 1 ? "0" : "2 4"} />
      ))}
      {skills.map((_, i) => {
        const a = (i / N) * Math.PI * 2 - Math.PI / 2
        return (
          <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} stroke="var(--border)" strokeWidth={1} />
        )
      })}
      <polygon
        points={pts.map((p) => p.join(",")).join(" ")}
        fill="var(--av-cyan-400)"
        fillOpacity={0.18}
        stroke="var(--av-cyan-400)"
        strokeWidth={2}
        style={{ filter: "drop-shadow(0 0 6px var(--av-cyan-400))" }}
      />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={3.5} fill="var(--av-cyan-400)" stroke="var(--background)" strokeWidth={1.5} />
      ))}
      {skills.map((s, i) => {
        const a = (i / N) * Math.PI * 2 - Math.PI / 2
        const lr = 96
        return (
          <text
            key={i}
            x={cx + lr * Math.cos(a)}
            y={cy + lr * Math.sin(a)}
            fontSize={9}
            fontWeight={700}
            fill="var(--muted-foreground)"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}
          >
            {s.label.slice(0, 8)}
          </text>
        )
      })}
    </svg>
  )
}

function UsernameIcon({ status }: { status: UsernameStatus }) {
  switch (status.state) {
    case "checking":
      return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
    case "available":
      return <Check className="h-4 w-4 text-green-600" />
    case "taken":
    case "invalid":
      return <X className="h-4 w-4 text-red-500" />
    default:
      return null
  }
}

function UsernameHelp({ status }: { status: UsernameStatus }) {
  switch (status.state) {
    case "invalid":
      return <p className="text-xs text-muted-foreground mt-1">{status.reason}</p>
    case "checking":
      return <p className="text-xs text-muted-foreground mt-1">Verificando disponibilidad…</p>
    case "available":
      return <p className="text-xs text-green-600 dark:text-green-400 mt-1">Disponible ✓</p>
    case "taken":
      return <p className="text-xs text-red-600 dark:text-red-400 mt-1">Ese usuario ya está tomado</p>
    case "unchanged":
      return null
    default:
      return <p className="text-xs text-muted-foreground mt-1">3–30 caracteres, minúsculas, números o _</p>
  }
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  )
}
