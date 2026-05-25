import { useEffect, useState } from "react"
import { Copy, Check, Gift, Sparkles, Users, MessageSquare, Mail, Trophy } from "lucide-react"
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
    window.location.href = `mailto:?subject=${encodeURIComponent("Aviatory — para tu carrera de piloto")}&body=${encodeURIComponent(
      shareText + "\n\n" + link
    )}`
  }

  return (
    <AppLayout>
      <div className="px-7 py-7 pb-20 max-w-[1480px] mx-auto">
        <PageHeader
          eyebrow="REFERIDOS · GANÁ MESES GRATIS"
          title="Compartí Aviatory, ganen los dos"
          subtitle="Por cada piloto que se registre con tu código, los dos reciben +7 días extra. Cuando upgradee a Pro, sumás 1 mes gratis."
        />

        {/* Hero referral code (cockpit) */}
        <div
          className="cockpit anim-fade-up relative overflow-hidden rounded-3xl border p-8 mb-6"
          style={{ borderColor: "oklch(0.32 0.04 250 / 0.6)" }}
        >
          <div className="cockpit-grid absolute inset-0 opacity-45" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(at 90% 50%, oklch(0.78 0.16 215 / 30%) 0%, transparent 60%)",
            }}
          />

          <div className="relative grid items-center gap-8" style={{ gridTemplateColumns: "1fr auto" }}>
            <div>
              <div
                className="mono text-[11px] font-bold tracking-[0.16em] uppercase"
                style={{ color: "var(--av-cyan-300)" }}
              >
                Tu código de invitación
              </div>
              <div
                className="mono tabular-nums mt-2.5 text-5xl font-extrabold text-white tracking-[0.04em] inline-block px-6 py-3 rounded-2xl"
                style={{
                  background: "oklch(0.22 0.035 250 / 0.6)",
                  border: "1px dashed oklch(0.78 0.16 215 / 50%)",
                }}
              >
                {loading ? "..." : code}
              </div>
              <div className="mt-4 flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={copyLink}
                  disabled={!stats?.my_code}
                  className="av-shine inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-semibold disabled:opacity-50"
                  style={{
                    background: "linear-gradient(180deg, var(--av-cyan-300) 0%, var(--av-cyan-400) 100%)",
                    color: "var(--av-navy-950)",
                    boxShadow:
                      "0 1px 0 rgb(255 255 255 / 30%) inset, var(--shadow-cyan)",
                  }}
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copiado" : "Copiar link"}
                </button>
                <button
                  type="button"
                  onClick={shareWhatsApp}
                  disabled={!stats?.my_code}
                  className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
                  style={{
                    background: "oklch(0.22 0.035 250 / 0.5)",
                    border: "1px solid oklch(0.4 0.04 250)",
                  }}
                >
                  <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
                </button>
                <button
                  type="button"
                  onClick={shareEmail}
                  disabled={!stats?.my_code}
                  className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
                  style={{
                    background: "oklch(0.22 0.035 250 / 0.5)",
                    border: "1px solid oklch(0.4 0.04 250)",
                  }}
                >
                  <Mail className="h-3.5 w-3.5" /> Email
                </button>
              </div>
              <div className="mt-3 mono text-[11px] text-white/50 break-all max-w-[600px]">
                {link || "Cargando…"}
              </div>
            </div>
            <div className="flex flex-col gap-3.5 min-w-[200px]">
              <RewardStat label="Pilotos invitados" value={stats?.total_referred ?? 0} icon={Users} />
              <RewardStat label="Upgradearon a Pro" value={stats?.active_referred ?? 0} icon={Sparkles} />
              <RewardStat label="Meses Pro ganados" value={stats?.active_referred ?? 0} icon={Trophy} />
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <Step n="1" title="Compartí tu código" body="WhatsApp, story, grupos. Donde tengas piloto-amigos." />
          <Step n="2" title="Tu amigo se registra" body="Con tu código recibe 14 días de prueba (7 + 7 extra) sin tarjeta." />
          <Step n="3" title="Ambos ganan" body="Cuando upgradee a Pro, te llega 1 mes gratis." />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-start gap-3">
            <Gift className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "var(--av-cyan-400)" }} />
            <p className="text-sm text-muted-foreground leading-relaxed m-0">
              <strong className="text-foreground">Tip:</strong> los códigos funcionan mejor cuando los compartís con piloto-amigos de tu cohorte, escuela o grupo de WhatsApp. La invitación de alguien que ya está dentro convierte mucho mejor que un anuncio frío.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

function RewardStat({ label, value, icon: Ic }: { label: string; value: number; icon: typeof Users }) {
  return (
    <div
      className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg"
      style={{
        background: "oklch(0.22 0.035 250 / 0.5)",
        border: "1px solid oklch(0.4 0.04 250 / 0.5)",
      }}
    >
      <Ic className="h-3.5 w-3.5" style={{ color: "var(--av-cyan-300)" }} />
      <div className="flex-1 min-w-0">
        <div
          className="mono tabular-nums text-lg font-bold leading-none tracking-[-0.02em] text-white"
        >
          <CountUp to={value} />
        </div>
        <div
          className="mono text-[9px] uppercase tracking-[0.1em] mt-0.5"
          style={{ color: "oklch(0.7 0.02 250)" }}
        >
          {label}
        </div>
      </div>
    </div>
  )
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div
        className="flex items-center justify-center h-9 w-9 rounded-full text-white text-sm font-bold mb-3"
        style={{
          background: "linear-gradient(135deg, var(--av-cyan-400), var(--av-blue-500))",
          boxShadow: "0 4px 12px -4px oklch(0.55 0.22 264 / 40%)",
        }}
      >
        {n}
      </div>
      <h3 className="mt-3 font-bold text-sm text-foreground">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{body}</p>
    </div>
  )
}
