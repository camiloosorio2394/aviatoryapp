import { useEffect, useState } from "react"
import { Copy, Check, Gift, Sparkles, Users, MessageSquare, Mail } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import { PageHeader } from "@/components/ui/page-header"
import { CountUp } from "@/components/ui/count-up"

interface Stats {
  my_code: string | null
  total_referred: number
  active_referred: number
}

export function Referrals() {
  const { user } = useSession()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!user) return
    let cancelled = false
    supabase.rpc("get_referral_stats").then(({ data }) => {
      if (cancelled) return
      const row = Array.isArray(data) ? data[0] : data
      setStats((row as Stats) ?? null)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [user])

  const code = stats?.my_code ?? "—"
  const referred = stats?.total_referred ?? 0
  const upgraded = stats?.active_referred ?? 0
  const link = stats?.my_code
    ? `https://aviatoryapp-mu.vercel.app/login?mode=signup&ref=${stats.my_code}`
    : ""

  async function copyLink() {
    if (!link) return
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      toast.success("Link copiado")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("No pudimos copiar")
    }
  }

  const shareText = `Estoy usando Aviatory para preparar mis exámenes Aerocivil y avanzar a aerolínea. Si te registras con mi código, los dos ganamos 7 días extra de prueba 🛫`

  function shareWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + link)}`, "_blank")
  }
  function shareEmail() {
    window.location.href = `mailto:?subject=${encodeURIComponent("Aviatory: para tu carrera de piloto")}&body=${encodeURIComponent(
      shareText + "\n\n" + link
    )}`
  }

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <PageHeader
          eyebrow="REFERIDOS · GANA MESES GRATIS"
          title="Comparte Aviatory, ganen los dos"
          subtitle="Por cada piloto que se registre con tu código, los dos reciben +7 días extra. Cuando upgradee a Pro, sumas 1 mes gratis."
        />

        {/* Hero referral code */}
        <section className="anim-fade-up relative overflow-hidden rounded-2xl border border-border bg-card p-7 sm:p-8 mb-6">
          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8">
            <div>
              <div
                className="text-[13px] font-semibold"
                style={{ color: "var(--av-blue-500)" }}
              >
                Tu código de invitación
              </div>
              <div
                className="tabular-nums mt-2.5 text-5xl font-extrabold text-foreground tracking-[0.04em] inline-block px-6 py-3 rounded-2xl"
                style={{
                  background: "color-mix(in oklch, var(--av-blue-500) 8%, var(--card))",
                  border: "1px dashed color-mix(in oklch, var(--av-blue-500) 50%, transparent)",
                }}
              >
                {loading ? "..." : code}
              </div>
              <div className="mt-4 flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={copyLink}
                  disabled={!stats?.my_code}
                  className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                  style={{
                    background: "var(--av-blue-500)",
                  }}
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copiado" : "Copiar link"}
                </button>
                <button
                  type="button"
                  onClick={shareWhatsApp}
                  disabled={!stats?.my_code}
                  className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold text-foreground border border-border bg-card transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
                </button>
                <button
                  type="button"
                  onClick={shareEmail}
                  disabled={!stats?.my_code}
                  className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold text-foreground border border-border bg-card transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  <Mail className="h-3.5 w-3.5" /> Email
                </button>
              </div>
              <div className="mt-3 text-[12.5px] text-muted-foreground break-all max-w-[600px]">
                {link || "Cargando…"}
              </div>
            </div>
            <div className="flex flex-col gap-3.5 w-full md:w-auto md:min-w-[220px]">
              {loading ? (
                <div className="h-[68px] rounded-2xl border border-border bg-muted/40 animate-pulse" />
              ) : referred === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-4 md:max-w-[260px]">
                  <div
                    className="inline-flex items-center justify-center h-8 w-8 rounded-xl mb-2"
                    style={{
                      background: "color-mix(in oklab, var(--av-blue-500) 14%, transparent)",
                      color: "var(--av-blue-500)",
                    }}
                  >
                    <Users className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">Todavía no has invitado a nadie</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Comparte tu código y aquí verás cuántos pilotos entraron con él y cuántos pasaron a Pro.
                  </p>
                </div>
              ) : (
                <>
                  <RewardStat label="Pilotos invitados" value={referred} icon={Users} />
                  <RewardStat label="Upgradearon a Pro" value={upgraded} icon={Sparkles} />
                </>
              )}
            </div>
          </div>
        </section>

        {/* How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Step n="1" title="Comparte tu código" body="WhatsApp, story, grupos. Donde tengas piloto-amigos." />
          <Step n="2" title="Tu amigo se registra" body="Con tu código recibe 14 días de prueba (7 + 7 extra) sin tarjeta." />
          <Step n="3" title="Ambos ganan" body="Cuando upgradee a Pro, te llega 1 mes gratis." />
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-start gap-3">
            <Gift className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "var(--av-blue-500)" }} />
            <p className="text-sm text-muted-foreground leading-relaxed m-0">
              <strong className="text-foreground">Tip:</strong> los códigos funcionan mejor cuando los compartes con piloto-amigos de tu cohorte, escuela o grupo de WhatsApp. La invitación de alguien que ya está dentro convierte mucho mejor que un anuncio frío.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

function RewardStat({ label, value, icon: Ic }: { label: string; value: number; icon: typeof Users }) {
  return (
    <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl border border-border bg-card">
      <Ic className="h-3.5 w-3.5" style={{ color: "var(--av-blue-500)" }} />
      <div className="flex-1 min-w-0">
        <div
          className="tabular-nums text-lg font-bold leading-none tracking-[-0.02em] text-foreground"
        >
          <CountUp to={value} />
        </div>
        <div className="text-[11px] font-semibold mt-0.5 text-muted-foreground">
          {label}
        </div>
      </div>
    </div>
  )
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div
        className="flex items-center justify-center h-9 w-9 rounded-full text-white text-sm font-bold mb-3"
        style={{
          background: "linear-gradient(135deg, var(--av-blue-400), var(--av-blue-500))",
        }}
      >
        {n}
      </div>
      <h3 className="mt-3 font-bold text-sm text-foreground">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{body}</p>
    </div>
  )
}
