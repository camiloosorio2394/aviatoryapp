import { useEffect, useState } from "react"
import { Copy, Check, Gift, Sparkles, Users, MessageCircle, Mail } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { AppLayout } from "@/components/layout/AppLayout"
import { Button } from "@/components/ui/button"

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
    supabase
      .rpc("get_referral_stats")
      .then(({ data }) => {
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
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText + " " + link)}`,
      "_blank"
    )
  }
  function shareEmail() {
    window.location.href = `mailto:?subject=${encodeURIComponent("Aviatory — para tu carrera de piloto")}&body=${encodeURIComponent(shareText + "\n\n" + link)}`
  }

  return (
    <AppLayout>
      <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-4xl mx-auto space-y-8">
        <header>
          <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Gift className="h-4 w-4" />
            Programa de referidos
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-[-0.03em]">
            Invitá pilotos, ganen los dos
          </h1>
          <p className="mt-2 text-muted-foreground leading-relaxed max-w-2xl">
            Por cada piloto que se registre con tu código, los dos reciben{" "}
            <strong className="text-foreground">+7 días extra</strong> de prueba gratis.
            Cuando upgradee a Pro, vos también ganas{" "}
            <strong className="text-foreground">1 mes Pro gratis</strong>.
          </p>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-3 gap-3 sm:gap-4">
          <StatBox label="Pilotos invitados" value={stats?.total_referred ?? 0} icon={<Users className="h-4 w-4" />} />
          <StatBox label="Upgradearon a Pro" value={stats?.active_referred ?? 0} icon={<Sparkles className="h-4 w-4" />} highlight />
          <StatBox label="Meses Pro ganados" value={stats?.active_referred ?? 0} icon={<Gift className="h-4 w-4" />} />
        </section>

        {/* Code + share */}
        <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-50 via-blue-50/40 to-transparent dark:from-blue-950/40 p-6 sm:p-8">
          <div className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-2">
            Tu código personal
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 flex items-center justify-center sm:justify-start gap-3 rounded-2xl bg-card border border-border/60 px-5 py-4">
              <span className="text-2xl sm:text-3xl font-bold tracking-[0.2em] tabular">
                {loading ? "..." : code}
              </span>
            </div>
            <Button
              onClick={copyLink}
              size="lg"
              className="btn-apple rounded-full h-12 px-6 border-0"
              disabled={!stats?.my_code}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" /> Copiado
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" /> Copiar link
                </>
              )}
            </Button>
          </div>

          <div className="mt-4 text-xs text-muted-foreground break-all">
            {link || "Cargando…"}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="lg"
              onClick={shareWhatsApp}
              disabled={!stats?.my_code}
              className="rounded-full h-11"
            >
              <MessageCircle className="h-4 w-4" />
              Compartir por WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={shareEmail}
              disabled={!stats?.my_code}
              className="rounded-full h-11"
            >
              <Mail className="h-4 w-4" />
              Compartir por email
            </Button>
          </div>
        </section>

        {/* How it works */}
        <section className="grid sm:grid-cols-3 gap-4">
          <Step
            n="1"
            title="Compartí tu código"
            body="Mandalo por WhatsApp a pilotos que conozcas, súbelo a tu story, péguenlo donde quieras."
          />
          <Step
            n="2"
            title="Tu amigo se registra"
            body="Con tu código recibe 14 días de prueba (7 normales + 7 extra) sin tarjeta."
          />
          <Step
            n="3"
            title="Ambos ganan"
            body="Cuando upgradee a Pro, te llega 1 mes gratis. Cuantos más invites, más Pro acumulás."
          />
        </section>

        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Tip:</strong> los códigos funcionan
            mejor cuando los compartís con piloto-amigos de tu cohorte, escuela o
            grupo de WhatsApp. La invitación de alguien que ya está dentro convierte
            mucho mejor que un anuncio frío.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}

function StatBox({
  label,
  value,
  icon,
  highlight = false,
}: {
  label: string
  value: number
  icon: React.ReactNode
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 ${
        highlight
          ? "border-blue-500/30 bg-gradient-to-br from-blue-50 via-blue-50/40 to-transparent dark:from-blue-950/40"
          : "border-border/60 bg-card"
      }`}
    >
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <span className={highlight ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"}>
          {icon}
        </span>
        {label}
      </div>
      <div
        className={`mt-2 text-3xl sm:text-4xl font-bold tracking-[-0.03em] tabular ${
          highlight ? "text-blue-600 dark:text-blue-400" : ""
        }`}
      >
        {value}
      </div>
    </div>
  )
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5">
      <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/30">
        {n}
      </div>
      <h3 className="mt-3 font-semibold text-sm">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{body}</p>
    </div>
  )
}
