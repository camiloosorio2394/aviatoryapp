import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, LogOut, User } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"
import { UserAvatar } from "@/components/UserAvatar"

interface Props {
  onMenuClick: () => void
}

export function AppTopbar({ onMenuClick }: Props) {
  const { user } = useSession()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    let cancelled = false
    supabase
      .from("profiles")
      .select("username, photo_url")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return
        const p = data as { username?: string; photo_url?: string } | null
        setUsername(p?.username ?? null)
        setPhotoUrl(p?.photo_url ?? null)
      })
    return () => {
      cancelled = true
    }
  }, [user])

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener("click", close)
    return () => window.removeEventListener("click", close)
  }, [open])

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error(error.message)
      return
    }
    navigate("/", { replace: true })
  }

  const email = user?.email ?? ""
  const handle = username ? `@${username}` : email

  return (
    <header className="sticky top-0 z-20 h-16 bg-background/70 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground"
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1" />

      <div className="relative">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setOpen((v) => !v)
          }}
          className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-muted transition-colors"
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <UserAvatar
            photoUrl={photoUrl}
            username={username}
            email={email}
            size="sm"
            className="shadow-md shadow-blue-500/30"
          />
          <span className="hidden sm:block text-sm text-muted-foreground max-w-[200px] truncate">
            {handle}
          </span>
        </button>

        {open && (
          <div
            className="absolute right-0 mt-2 w-64 rounded-xl border border-border/60 bg-card shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-border/40">
              {username && (
                <p className="text-sm font-semibold">@{username}</p>
              )}
              <p className="text-xs text-muted-foreground truncate">{email}</p>
            </div>
            <Link
              to="/app/perfil"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
            >
              <User className="h-4 w-4" />
              Mi perfil
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
