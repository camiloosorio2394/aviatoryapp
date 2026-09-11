import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"

export interface ProfileLite {
  id: string
  full_name: string | null
  username: string | null
  photo_url: string | null
}

export function useProfile() {
  const { user } = useSession()
  const [profile, setProfile] = useState<ProfileLite | null>(null)
  const [loading, setLoading] = useState(true)

  /** Trae y devuelve. `sirve` dice si el resultado se puede usar: cuando la
   *  consulta falla, el perfil que ya había no se toca. */
  const traer = useCallback(async () => {
    if (!user) return { sirve: true, perfil: null as ProfileLite | null }
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, username, photo_url")
      .eq("id", user.id)
      .maybeSingle()
    return { sirve: !error, perfil: (data ?? null) as ProfileLite | null }
  }, [user])

  const refresh = useCallback(async () => {
    const r = await traer()
    if (r.sirve) setProfile(r.perfil)
    setLoading(false)
  }, [traer])

  useEffect(() => {
    let vivo = true
    void traer().then((r) => {
      if (!vivo) return
      if (r.sirve) setProfile(r.perfil)
      setLoading(false)
    })
    return () => {
      vivo = false
    }
  }, [traer])

  return { profile, loading, refresh }
}
