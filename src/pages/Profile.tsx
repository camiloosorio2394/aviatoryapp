import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react"
import { toast } from "sonner"
import { AtSign, Camera, FileText, Loader2, Save, Trash2, Radar, Settings, User as UserIcon } from "lucide-react"
import {
  borrarFotoDePerfil,
  comprobarUsuarioLibre,
  guardarPerfil,
  subirFotoDePerfil,
  traerPerfil,
} from "@/services/perfil"
import { useSession } from "@/hooks/useSession"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { validarHorasDeVuelo } from "@/lib/validacionPiloto"
import { Field } from "@/components/perfil/Field"
import { IcaoStatusField } from "@/components/perfil/IcaoStatusField"
import { PermisoDictado } from "@/components/perfil/PermisoDictado"
import { PilotCv } from "@/components/perfil/PilotCv"
import { PilotIdCard } from "@/components/perfil/PilotIdCard"
import { SkillsRadar } from "@/components/perfil/SkillsRadar"
import { StrengthsSummary } from "@/components/perfil/StrengthsSummary"
import { UsernameHelp } from "@/components/perfil/UsernameHelp"
import { UsernameIcon } from "@/components/perfil/UsernameIcon"
import { VerificacionHoras } from "@/components/perfil/VerificacionHoras"
import { LICENSES, STAGES, USERNAME_REGEX } from "@/components/perfil/datos"
import type { CertRow, Skill, Stage, UsernameStatus } from "@/components/perfil/tipos"
import { traerVerificacion, type VerificacionDeHoras } from "@/services/verificacionHoras"

const totalHoras = (minutos: number) => (minutos / 60).toFixed(1)

export function Profile() {
  const { user } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fullName, setFullName] = useState("")
  const [country, setCountry] = useState("")
  const [username, setUsername] = useState("")
  const [originalUsername, setOriginalUsername] = useState("")
  /** Igual que en Login: del servidor solo se guarda su respuesta y a qué
   *  nombre contesta. Lo demás se deduce de lo que hay escrito. */
  const [respuesta, setRespuesta] = useState<{ nombre: string; libre: boolean | null; fallo?: boolean } | null>(
    null
  )
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
  const [certs, setCerts] = useState<CertRow[]>([])
  const [achCount, setAchCount] = useState<{ unlocked: number; total: number }>({ unlocked: 0, total: 0 })
  const [studyStats, setStudyStats] = useState<{ pcaBest: number | null; quizzes: number; longestStreak: number }>({ pcaBest: null, quizzes: 0, longestStreak: 0 })
  const [lastFlight, setLastFlight] = useState<string | null>(null)
  /** La carrera completa que calcula la base: previas más bitácora. */
  const [totalCarrera, setTotalCarrera] = useState<number | null>(null)
  const [picCarrera, setPicCarrera] = useState<number | null>(null)
  const [verificacion, setVerificacion] = useState<VerificacionDeHoras | null>(null)

  /**
   * El sello de verificación se relee aparte del perfil: cambia cuando el
   * piloto pide o retira la revisión, y no hay por qué recargar todo el perfil
   * para eso.
   */
  const releerVerificacion = useCallback(() => {
    if (!user) return
    traerVerificacion(user.id).then(setVerificacion)
  }, [user])

  useEffect(() => {
    releerVerificacion()
  }, [releerVerificacion])

  useEffect(() => {
    if (!user) return
    let cancelled = false
    async function load() {
      try {
        const datos = await traerPerfil(user!.id)
        if (cancelled) return
        setFullName(datos.fullName)
        setCountry(datos.country)
        setUsername(datos.username)
        setOriginalUsername(datos.username)
        setPhotoUrl(datos.photoUrl)
        setStage(datos.stage)
        setTotalHours(datos.horasPreviasTotal)
        setHoursPic(datos.horasPreviasPic)
        setTotalCarrera(datos.totalCarrera)
        setPicCarrera(datos.picCarrera)
        setTargetAirline(datos.targetAirline)
        setLicenses(datos.licenses)
        setFlightAgg(datos.vuelos)
        setLastFlight(datos.ultimoVuelo)
        setStudyStats(datos.estudio)
        setCerts(datos.certs)
        setCurrency(datos.recurrencia)
        setAchCount(datos.logros)
        setIcaoLevelState(datos.icao.level)
        setIcaoTakenAt(datos.icao.takenAt)
        setIcaoSource(datos.icao.source)
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

  /** Si hace falta preguntarle al servidor por este nombre. */
  const hayQuePreguntar =
    username !== originalUsername && username.length > 0 && USERNAME_REGEX.test(username)

  const usernameStatus: UsernameStatus =
    username === originalUsername
      ? { state: "unchanged" }
      : !username
        ? { state: "idle" }
        : !USERNAME_REGEX.test(username)
          ? { state: "invalid", reason: "3–30 caracteres, minúsculas, números o _" }
          : respuesta?.nombre !== username
            ? { state: "checking" }
            : respuesta.fallo
              ? { state: "error" }
              : respuesta.libre === null
                ? { state: "idle" }
              : { state: respuesta.libre ? "available" : "taken" }

  // El estado se fija dentro del callback del temporizador, no en el cuerpo del
  // efecto.
  const checkTimer = useRef<number | undefined>(undefined)
  useEffect(() => {
    if (!hayQuePreguntar) return
    window.clearTimeout(checkTimer.current)
    checkTimer.current = window.setTimeout(async () => {
      const { libre, fallo } = await comprobarUsuarioLibre(username)
      setRespuesta({ nombre: username, libre, fallo })
    }, 400)
    return () => window.clearTimeout(checkTimer.current)
  }, [username, hayQuePreguntar])

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
      setPhotoUrl(await subirFotoDePerfil(user.id, file, ext))
      toast.success("Tu foto se actualizó")
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
      await borrarFotoDePerfil(user.id)
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
    const errorHoras = validarHorasDeVuelo(totalHours, hoursPic)
    if (errorHoras) {
      toast.error(errorHoras)
      return
    }
    setSaving(true)
    try {
      await guardarPerfil(user.id, { fullName, country, username, stage, horasPreviasTotal: totalHours, horasPreviasPic: hoursPic, targetAirline, licenses })
      setOriginalUsername(username)
      toast.success("Perfil actualizado")
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
      <>
        <div className="px-7 py-9 sm:py-11 pb-20 max-w-[1480px] mx-auto animate-pulse">
          <div className="mb-6 space-y-2.5">
            <div className="h-3 w-24 bg-muted rounded" />
            <div className="h-8 w-72 max-w-full bg-muted rounded" />
            <div className="h-4 w-full max-w-[520px] bg-muted rounded" />
          </div>
          <div className="grid gap-5 grid-cols-1 lg:grid-cols-[360px_1fr]">
            <div className="h-[260px] rounded-2xl bg-muted" />
            <div className="flex flex-col gap-5">
              <div className="h-[280px] rounded-2xl bg-muted" />
              <div className="h-[180px] rounded-2xl bg-muted" />
              <div className="h-[420px] rounded-2xl bg-muted" />
            </div>
          </div>
        </div>
      </>
    )
  }

  // === Mapa de habilidades — TODO sale de datos reales, nada hardcodeado ===
  // Horas para llegar al 100% de cada barra (referencias de carrera a aerolínea).
  const BENCH = { totalH: 1500, picH: 1000, xcH: 200 }
  const fmtH = (h: number) => (h % 1 === 0 ? String(h) : h.toFixed(1))
  const hasFlights = flightAgg.count > 0
  // Horas/PIC: la carrera completa que calcula la base (previas más bitácora).
  // Antes se escogía entre una cosa y la otra, y con un vuelo registrado aquí
  // el Pilot ID mostraba las horas de ese vuelo y no las de la carrera.
  const totalH = totalCarrera ?? 0
  const picH = picCarrera ?? 0
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
    <>
      <div className="px-7 py-9 sm:py-11 pb-20 max-w-[1480px] mx-auto">
        <PageHeader eyebrow="Mi perfil" title="Tu identidad como piloto" subtitle="Tu mapa de habilidades sale de datos reales: Logbook, Vencimientos y tus simulacros TEA. Aviatory lo usa para calcular tu progreso y plan." />

        <div className="grid gap-5 grid-cols-1 lg:grid-cols-[360px_1fr]">
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
            <div className="rounded-2xl surface p-6">
              <SectionTitle icon={Radar} eyebrow="Tu mapa de habilidades" title="Mastery por dimensión" />
              <div className="grid items-center gap-7 mt-4 grid-cols-1 justify-items-center sm:grid-cols-[auto_1fr] sm:justify-items-stretch">
                <SkillsRadar skills={skills} />
                <div className="flex flex-col gap-2.5 w-full">
                  {skills.map((s) => (
                    <div key={s.label} className="grid items-center gap-3 grid-cols-[88px_1fr_auto] sm:grid-cols-[104px_1fr_auto]">
                      <span className="text-[13px] leading-tight text-foreground font-medium">{s.label}</span>
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
                        <span className="tabular-nums text-[12px] font-semibold text-foreground">{Math.round(s.value)}%</span>
                        <span className="ml-1.5 text-[12px] text-muted-foreground">{s.raw}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumen: fortalezas y debilidades (generado de tus datos reales) */}
            <StrengthsSummary strengths={strengths} gaps={gaps} />

            {/* Form */}
            <div className="rounded-2xl surface p-6 space-y-5">
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
                        className="!h-20 !w-20 !text-[24px]"
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
                          <Button type="button" variant="ghost" size="sm" onClick={handleAvatarRemove} disabled={uploading} className="rounded-full h-9 text-[color:var(--av-red-400)] hover:text-[color:var(--av-red-400)] hover:bg-muted">
                            <Trash2 className="h-3.5 w-3.5" /> Eliminar
                          </Button>
                        )}
                      </div>
                      <p className="text-[12px] text-muted-foreground">JPG, PNG o WebP · Máx 5MB · Cuadrada se ve mejor</p>
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

            <div className="rounded-2xl surface p-6 space-y-5">
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
                  <Field label="Horas antes de Aviatory">
                    <Input type="number" value={totalHours} onChange={(e) => setTotalHours(e.target.value)} className="h-11 rounded-xl tabular-nums" />
                  </Field>
                  <Field label="De esas, PIC">
                    <Input type="number" value={hoursPic} onChange={(e) => setHoursPic(e.target.value)} className="h-11 rounded-xl tabular-nums" />
                  </Field>
                </div>
                {/* El total no se escribe: lo calcula la base sumando lo de
                    arriba y la bitácora. Se muestra para que el piloto vea que
                    registrar vuelos aquí suma y no reemplaza. */}
                <div className="rounded-xl surface px-4 py-3 flex items-baseline justify-between gap-3">
                  <span className="text-[13px] text-muted-foreground">
                    Total de carrera
                    {flightAgg.count > 0 && ` · ${totalHoras(flightAgg.totalMin)} h de ${flightAgg.count} ${flightAgg.count === 1 ? "vuelo" : "vuelos"} en Aviatory`}
                  </span>
                  <span className="tabular-nums text-[17px] font-semibold text-foreground">
                    {totalCarrera != null ? `${totalCarrera.toFixed(1)} h` : "—"}
                    {picCarrera != null && <span className="ml-2 text-[13px] font-normal text-muted-foreground">PIC {picCarrera.toFixed(1)}</span>}
                  </span>
                </div>
                {user && (
                  <VerificacionHoras
                    userId={user.id}
                    totalCarrera={totalCarrera}
                    picCarrera={picCarrera}
                    verificacion={verificacion}
                    alCambiar={releerVerificacion}
                  />
                )}
                <Field label="Licencias">
                  <div className="flex flex-wrap gap-2">
                    {LICENSES.map((lic) => {
                      const active = licenses.includes(lic)
                      return (
                        <button
                          key={lic}
                          type="button"
                          onClick={() => toggleLicense(lic)}
                          className="px-4 py-2 rounded-full text-[15px] font-semibold border transition-[color,background-color,border-color,box-shadow]"
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

        {/* Hoja de vida del piloto. Compone lo que la app ya sabe con datos
            reales: identidad, carrera, certificados de Vencimientos, ICAO
            medido y logros. Hoy es privada; compartirla en comunidad llega
            cuando la migracion de visibilidad este aplicada. */}
        <section className="mt-6">
          <SectionTitle
            icon={FileText}
            eyebrow="Hoja de vida"
            title="Tu hoja de vida de piloto"
            hint="Se arma sola con tus datos reales. Solo tú la ves por ahora."
          />
          <PilotCv
            photoUrl={photoUrl}
            fullName={fullName}
            username={username}
            country={country}
            stage={stage}
            stageLabel={STAGES.find((s) => s.value === stage)?.label ?? null}
            totalHours={totalCarrera}
            hoursPic={picCarrera}
            horasVerificadas={verificacion?.estado === "verificada" && verificacion.cubreLoDeclarado}
            horasVerificadasEn={verificacion?.revisadoEn ?? null}
            flightCount={flightAgg.count}
            licenses={licenses}
            targetAirline={targetAirline}
            icaoLevel={icaoLevel}
            icaoSource={icaoSource}
            icaoTakenAt={icaoTakenAt}
            certs={certs}
            achUnlocked={achCount.unlocked}
            achTotal={achCount.total}
            lastFlight={lastFlight}
            pcaBest={studyStats.pcaBest}
            quizzes={studyStats.quizzes}
            longestStreak={studyStats.longestStreak}
          />
        </section>

        <PermisoDictado />
      </div>
    </>
  )
}
