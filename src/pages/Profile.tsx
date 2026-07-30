import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { AtSign, Camera, Check, Loader2, Save, Trash2, X, Radar, Settings, User as UserIcon, TrendingUp, ArrowRight, Headphones } from "lucide-react"
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

interface Skill {
  key: string
  label: string
  value: number
  hasData: boolean
  raw: string
}

/** Próximo paso accionable por dimensión (a qué módulo ir para mejorarla). */
const DIM_ADVICE: Record<string, { cta: string; href: string }> = {
  horas: { cta: "Registra tus vuelos en el Logbook", href: "/app/logbook" },
  pic: { cta: "Sumá horas como PIC en el Logbook", href: "/app/logbook" },
  icao: { cta: "Hacé el simulacro TEA", href: "/app/icao/simulacro" },
  licencias: { cta: "Carga tus licencias en Vencimientos", href: "/app/vencimientos" },
  xc: { cta: "Registra vuelos cross-country", href: "/app/logbook" },
  recurrencia: { cta: "Revisa tus vencimientos", href: "/app/vencimientos" },
}

function icaoLevelLabel(n: number): string {
  if (n <= 3) return "Pre-operacional"
  if (n === 4) return "Operacional"
  if (n === 5) return "Extendido"
  return "Experto"
}

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
  const [targetAirline, setTargetAirline] = useState("")
  const [licenses, setLicenses] = useState<string[]>([])
  // Datos reales para el mapa de habilidades (no auto-declarados)
  const [icaoLevel, setIcaoLevelState] = useState<number | null>(null) // del módulo: último simulacro TEA
  const [icaoTakenAt, setIcaoTakenAt] = useState<string | null>(null)
  const [icaoSource, setIcaoSource] = useState<"mock" | "estimate" | null>(null)
  const [flightAgg, setFlightAgg] = useState<{ totalMin: number; picMin: number; xcMin: number; count: number }>({ totalMin: 0, picMin: 0, xcMin: 0, count: 0 })
  const [currency, setCurrency] = useState<{ valid: number; total: number }>({ valid: 0, total: 0 })

  useEffect(() => {
    if (!user) return
    let cancelled = false
    async function load() {
      try {
        const [profileRes, pilotRes, flightsRes, licRes, mockRes] = await Promise.all([
          supabase.from("profiles").select("full_name, country, username, photo_url").eq("id", user!.id).maybeSingle(),
          supabase.from("pilot_state").select("*").eq("user_id", user!.id).maybeSingle(),
          supabase.from("flights").select("total_minutes, pic_minutes, cross_country_minutes").eq("user_id", user!.id),
          supabase.from("licenses_held").select("expires_date").eq("user_id", user!.id).not("expires_date", "is", null),
          supabase.from("user_icao_mock_results").select("final_level, taken_at").eq("user_id", user!.id).order("taken_at", { ascending: false }).limit(1).maybeSingle(),
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
        const pilot = pilotRes.data as { stage?: Stage; total_hours?: number; hours_pic?: number; icao_english_level?: number; target_airline?: string; licenses?: string[] } | null
        if (pilot) {
          setStage(pilot.stage ?? "")
          setTotalHours(pilot.total_hours?.toString() ?? "")
          setHoursPic(pilot.hours_pic?.toString() ?? "")
          setTargetAirline(pilot.target_airline ?? "")
          setLicenses(pilot.licenses ?? [])
        }

        // Agregado del logbook (fuente real de horas)
        const flights = (flightsRes.data ?? []) as { total_minutes: number; pic_minutes: number; cross_country_minutes: number }[]
        setFlightAgg({
          totalMin: flights.reduce((a, f) => a + (f.total_minutes ?? 0), 0),
          picMin: flights.reduce((a, f) => a + (f.pic_minutes ?? 0), 0),
          xcMin: flights.reduce((a, f) => a + (f.cross_country_minutes ?? 0), 0),
          count: flights.length,
        })

        // Recurrencia: % de vigencias al día (licenses_held con vencimiento)
        const lic = (licRes.data ?? []) as { expires_date: string }[]
        const today = new Date().toISOString().slice(0, 10)
        setCurrency({ valid: lic.filter((l) => l.expires_date >= today).length, total: lic.length })

        // Nivel ICAO: el oficial es el simulacro TEA (mock). Si no hay simulacro,
        // se usa la estimación del test inicial (pilot_state.icao_english_level),
        // marcada como "estimado". Nunca auto-declarado a mano.
        const mock = mockRes.data as { final_level?: number; taken_at?: string } | null
        const estimate = pilot?.icao_english_level ?? null
        setIcaoLevelState(mock?.final_level ?? estimate)
        setIcaoTakenAt(mock?.taken_at ?? null)
        setIcaoSource(mock?.final_level != null ? "mock" : estimate != null ? "estimate" : null)
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
          // icao_english_level NO se setea acá: el nivel oficial sale del simulacro TEA.
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

  // === Mapa de habilidades — TODO sale de datos reales, nada hardcodeado ===
  // Horas para llegar al 100% de cada barra (referencias de carrera a aerolínea).
  const BENCH = { totalH: 1500, picH: 1000, xcH: 200 }
  const fmtH = (h: number) => (h % 1 === 0 ? String(h) : h.toFixed(1))
  const hasFlights = flightAgg.count > 0
  // Horas/PIC: del Logbook si hay vuelos; si no, del valor en pilot_state.
  const totalH = hasFlights ? flightAgg.totalMin / 60 : Number(totalHours) || 0
  const picH = hasFlights ? flightAgg.picMin / 60 : Number(hoursPic) || 0
  const xcH = flightAgg.xcMin / 60
  const recurPct = currency.total > 0 ? (currency.valid / currency.total) * 100 : null
  const icaoPct = icaoLevel != null ? (icaoLevel / 6) * 100 : null

  const skills: Skill[] = [
    { key: "horas", label: "Horas", value: Math.min(100, (totalH / BENCH.totalH) * 100), hasData: totalH > 0, raw: `${fmtH(totalH)} h` },
    { key: "pic", label: "PIC", value: Math.min(100, (picH / BENCH.picH) * 100), hasData: picH > 0, raw: `${fmtH(picH)} h` },
    { key: "icao", label: "ICAO", value: icaoPct ?? 0, hasData: icaoLevel != null, raw: icaoLevel != null ? `Nivel ${icaoLevel}` : "Sin evaluar" },
    { key: "licencias", label: "Licencias", value: (licenses.length / 5) * 100, hasData: licenses.length > 0, raw: `${licenses.length} de 5` },
    { key: "xc", label: "Cross-country", value: Math.min(100, (xcH / BENCH.xcH) * 100), hasData: hasFlights, raw: hasFlights ? `${fmtH(xcH)} h` : "Sin vuelos" },
    { key: "recurrencia", label: "Recurrencia", value: recurPct ?? 0, hasData: currency.total > 0, raw: currency.total > 0 ? `${currency.valid}/${currency.total} al día` : "Sin datos" },
  ]

  // Resumen de fortalezas y debilidades, derivado de las dimensiones reales.
  const strengths = skills.filter((s) => s.hasData && s.value >= 60).sort((a, b) => b.value - a.value).slice(0, 3)
  const gaps = skills
    .filter((s) => !s.hasData || s.value < 45)
    .sort((a, b) => (a.hasData ? a.value : -1) - (b.hasData ? b.value : -1))
    .slice(0, 3)

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <PageHeader eyebrow="Mi perfil" title="Tu identidad como piloto" subtitle="Tu mapa de habilidades sale de datos reales: Logbook, Vencimientos y tus simulacros TEA. Aviatory lo usa para calcular tu progreso y plan." />

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
            <div className="rounded-2xl border border-border bg-card p-6">
              <SectionTitle icon={Radar} eyebrow="Tu mapa de habilidades" title="Mastery por dimensión" />
              <div className="grid items-center gap-7 mt-4" style={{ gridTemplateColumns: "auto 1fr" }}>
                <SkillsRadar skills={skills} />
                <div className="flex flex-col gap-2.5">
                  {skills.map((s) => (
                    <div key={s.label} className="grid items-center gap-3" style={{ gridTemplateColumns: "104px 1fr auto" }}>
                      <span className="text-[13px] text-foreground font-medium">{s.label}</span>
                      <div className="relative h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${s.value}%`,
                            background: s.hasData ? "var(--av-blue-500)" : "var(--muted-foreground)",
                            opacity: s.hasData ? 1 : 0.4,
                          }}
                        />
                      </div>
                      <span className="text-right whitespace-nowrap">
                        <span className="tabular-nums text-[12.5px] font-bold text-foreground">{Math.round(s.value)}%</span>
                        <span className="ml-1.5 text-[11px] text-muted-foreground">{s.raw}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumen: fortalezas y debilidades (generado de tus datos reales) */}
            <StrengthsSummary strengths={strengths} gaps={gaps} />

            {/* Form */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
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

            <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
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
                    <Input type="number" value={totalHours} onChange={(e) => setTotalHours(e.target.value)} className="h-11 rounded-xl tabular-nums" />
                  </Field>
                  <Field label="Horas PIC">
                    <Input type="number" value={hoursPic} onChange={(e) => setHoursPic(e.target.value)} className="h-11 rounded-xl tabular-nums" />
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
                <Field label="Aerolínea objetivo">
                  <Input value={targetAirline} onChange={(e) => setTargetAirline(e.target.value)} placeholder="Avianca, LATAM, Wingo…" className="h-11 rounded-xl" />
                </Field>
                <Field label="Inglés ICAO">
                  <IcaoStatusField level={icaoLevel} takenAt={icaoTakenAt} source={icaoSource} />
                </Field>
              </div>

              <Button
                onClick={handleSave}
                disabled={saving || !usernameOK}
                size="lg"
                className="rounded-xl h-12 px-6 border-0 text-white disabled:opacity-50 transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--av-blue-500)" }}
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
  icao: number | null
  targetAirline: string
  stage: Stage | ""
  uploading: boolean
}) {
  const stageLabel = stage ? STAGES.find((s) => s.value === stage)?.label ?? "—" : "—"
  const fmt = (h: number) => (h % 1 === 0 ? String(h) : h.toFixed(1))
  return (
    <div className="rounded-2xl border border-border bg-card p-6 overflow-hidden h-fit">
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
          <div className="text-xl font-extrabold tracking-[-0.025em] text-foreground">
            {fullName || username || "Tu nombre"}
          </div>
          <div className="text-xs text-muted-foreground">
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

function IdField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.06em] font-semibold text-muted-foreground">
        {label}
      </div>
      <div className="tabular-nums mt-0.5 text-sm font-bold text-foreground tracking-[-0.02em]">
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
        fill="var(--av-blue-500)"
        fillOpacity={0.15}
        stroke="var(--av-blue-500)"
        strokeWidth={2}
      />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={3.5} fill="var(--av-blue-500)" stroke="var(--background)" strokeWidth={1.5} />
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
            fontWeight={600}
            fill="var(--muted-foreground)"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ letterSpacing: "0.02em" }}
          >
            {s.label.slice(0, 8)}
          </text>
        )
      })}
    </svg>
  )
}

function StrengthsSummary({ strengths, gaps }: { strengths: Skill[]; gaps: Skill[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <SectionTitle icon={TrendingUp} eyebrow="Resumen" title="Fortalezas y debilidades" />
      <div className="grid gap-6 sm:grid-cols-2 mt-1">
        <div>
          <div className="text-[13px] font-semibold mb-2.5" style={{ color: "#047857" }}>
            Tus fortalezas
          </div>
          {strengths.length === 0 ? (
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Todavía no hay datos suficientes para destacar fortalezas. Empieza por los próximos
              pasos →
            </p>
          ) : (
            <ul className="space-y-2">
              {strengths.map((s) => (
                <li key={s.key} className="flex items-start gap-2 text-[13.5px]">
                  <Check className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#047857" }} strokeWidth={3} />
                  <span>
                    <span className="font-semibold text-foreground">{s.label}</span>
                    <span className="text-muted-foreground"> · {s.raw} ({Math.round(s.value)}%)</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <div className="text-[13px] font-semibold mb-2.5" style={{ color: "#B45309" }}>
            Próximos pasos
          </div>
          {gaps.length === 0 ? (
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              ¡Vas muy bien! No hay debilidades marcadas ahora mismo.
            </p>
          ) : (
            <ul className="space-y-3">
              {gaps.map((s) => {
                const adv = DIM_ADVICE[s.key]
                return (
                  <li key={s.key} className="text-[13.5px]">
                    <div>
                      <span className="font-semibold text-foreground">{s.label}</span>
                      <span className="text-muted-foreground"> · {s.raw}</span>
                    </div>
                    {adv && (
                      <Link
                        to={adv.href}
                        className="inline-flex items-center gap-1 text-[13px] font-semibold mt-0.5"
                        style={{ color: "var(--av-blue-500)" }}
                      >
                        {adv.cta} <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

function IcaoStatusField({ level, takenAt, source }: { level: number | null; takenAt: string | null; source: "mock" | "estimate" | null }) {
  if (level == null) {
    return (
      <>
        <Link
          to="/app/test-inicial"
          className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-border bg-muted/30 px-4 h-11 hover:bg-muted/50 transition-colors"
        >
          <span className="inline-flex items-center gap-2 text-[14px] text-muted-foreground">
            <Headphones className="h-4 w-4" /> Sin evaluar: hacé el test inicial
          </span>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </Link>
        <p className="text-[11px] text-muted-foreground mt-1">
          Tu nivel ICAO sale del módulo, no se declara a mano.
        </p>
      </>
    )
  }
  const dateStr = takenAt
    ? new Date(takenAt).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })
    : null
  const isEstimate = source === "estimate"
  return (
    <>
      <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 h-11">
        <span className="inline-flex items-baseline gap-2">
          <span className="text-[15px] font-bold text-foreground tabular-nums">Nivel {level}</span>
          <span className="text-[13px] text-muted-foreground">
            {icaoLevelLabel(level)}{isEstimate ? " · estimado" : ""}
          </span>
        </span>
        <Link
          to="/app/icao/simulacro"
          className="text-[12.5px] font-semibold inline-flex items-center gap-1"
          style={{ color: "var(--av-blue-500)" }}
        >
          {isEstimate ? "Confirmar" : "Repetir"} <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <p className="text-[11px] text-muted-foreground mt-1">
        {isEstimate
          ? "Estimado del test inicial. Confirmá tu nivel oficial con el simulacro TEA."
          : `${dateStr ? `Evaluado el ${dateStr} · ` : ""}sale de tu simulacro TEA, no se declara a mano.`}
      </p>
    </>
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
