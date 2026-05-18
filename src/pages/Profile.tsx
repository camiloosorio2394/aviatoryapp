import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { toast } from "sonner"
import { AtSign, Camera, Check, Loader2, Save, Trash2, X } from "lucide-react"
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
          supabase
            .from("profiles")
            .select("full_name, country, username, photo_url")
            .eq("id", user!.id)
            .maybeSingle(),
          supabase.from("pilot_state").select("*").eq("user_id", user!.id).maybeSingle(),
        ])
        if (cancelled) return
        if (profileRes.data) {
          const p = profileRes.data as {
            full_name?: string
            country?: string
            username?: string
            photo_url?: string
          }
          setFullName(p.full_name ?? "")
          setCountry(p.country ?? "")
          setUsername(p.username ?? "")
          setOriginalUsername(p.username ?? "")
          setUsernameStatus(p.username ? { state: "unchanged" } : { state: "idle" })
          setPhotoUrl(p.photo_url ?? null)
        }
        if (pilotRes.data) {
          const p = pilotRes.data as {
            stage?: Stage
            total_hours?: number
            hours_pic?: number
            icao_english_level?: number
            target_airline?: string
            licenses?: string[]
          }
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

  // Username availability check (debounced) — only when changed
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
      setUsernameStatus({
        state: "invalid",
        reason: "3–30 caracteres, minúsculas, números o _",
      })
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

  const usernameOK =
    usernameStatus.state === "unchanged" || usernameStatus.state === "available"

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
      const { error: upErr } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true, cacheControl: "0", contentType: file.type })
      if (upErr) throw upErr
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path)
      const finalUrl = `${urlData.publicUrl}?v=${Date.now()}`  // cache-bust
      const { error: dbErr } = await supabase
        .from("profiles")
        .update({ photo_url: finalUrl })
        .eq("id", user.id)
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
      // Try common extensions (we don't know which one was uploaded)
      for (const ext of ["png", "jpg", "jpeg", "webp"]) {
        await supabase.storage.from("avatars").remove([`${user.id}/avatar.${ext}`])
      }
      const { error } = await supabase
        .from("profiles")
        .update({ photo_url: null })
        .eq("id", user.id)
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
        supabase
          .from("profiles")
          .update({
            full_name: fullName || null,
            country: country || null,
            username: username || null,
          })
          .eq("id", user.id),
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

  return (
    <AppLayout>
      <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Mi perfil</h1>
          <p className="mt-2 text-muted-foreground">
            Tu data del perfil de piloto. Aviatory la usa para calcular tu progreso y plan.
          </p>
        </header>

        <div className="space-y-6">
          <Section title="Tu foto">
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
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="rounded-full h-9"
                  >
                    <Camera className="h-3.5 w-3.5" />
                    {photoUrl ? "Cambiar foto" : "Subir foto"}
                  </Button>
                  {photoUrl && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleAvatarRemove}
                      disabled={uploading}
                      className="rounded-full h-9 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Eliminar
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG o WebP · Máx 5MB · Cuadrada se ve mejor
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
            </div>
          </Section>

          <Section title="Identidad">
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
                    setUsername(
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9_]/g, "")
                        .slice(0, 30)
                    )
                  }
                  placeholder="capi_juanma"
                  className="h-11 rounded-xl pl-9 pr-11"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  <UsernameIcon status={usernameStatus} />
                </span>
              </div>
              <UsernameHelp status={usernameStatus} />
            </Field>
            <Field label="Nombre completo (privado)">
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Juan Manuel Pérez"
                className="h-11 rounded-xl"
              />
            </Field>
            <Field label="País">
              <Input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Colombia"
                className="h-11 rounded-xl"
              />
            </Field>
          </Section>

          <Section title="Tu carrera">
            <Field label="Etapa actual">
              <Select value={stage} onValueChange={(v) => setStage(v as Stage)}>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="Elegí una etapa" />
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
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Horas totales">
                <Input
                  type="number"
                  value={totalHours}
                  onChange={(e) => setTotalHours(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </Field>
              <Field label="Horas PIC">
                <Input
                  type="number"
                  value={hoursPic}
                  onChange={(e) => setHoursPic(e.target.value)}
                  className="h-11 rounded-xl"
                />
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
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                        active
                          ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/30"
                          : "border-border bg-card hover:border-blue-500/40"
                      }`}
                    >
                      {lic}
                    </button>
                  )
                })}
              </div>
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
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
                <Input
                  value={targetAirline}
                  onChange={(e) => setTargetAirline(e.target.value)}
                  placeholder="Avianca, LATAM, Wingo…"
                  className="h-11 rounded-xl"
                />
              </Field>
            </div>
          </Section>

          <Button
            onClick={handleSave}
            disabled={saving || !usernameOK}
            size="lg"
            className="btn-apple shine-on-hover rounded-full h-12 px-6 border-0 disabled:opacity-50"
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
    </AppLayout>
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  )
}
